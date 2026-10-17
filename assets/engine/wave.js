/* 基础引擎层 · wave.js
 * 波动原语 Eng.Wave（波动真值，2026-10-17 · 物理推广批3）。
 * 解析式：y = A·sin(2πf·t − k·x + φ)，k = 2π/λ = 2πf/v，ω = 2πf，T = 1/f。
 * 真值口径：~/workspace/phy-audit/wave-truth-criteria.md（WV-01…WV-27）。
 *
 * 设计要点（纯函数 + 渲染分离，确定性可断言）：
 *  - 原语只给真值：valueAt(x,t) 为物理解析式（x 米，t 秒）；displayPhase(u)/
 *    valueAtDisp(u, driftPhase) 给渲染采样；driftRateHz/audible 为静态门；
 *    superpose 做双波逐点合成。课页渲染层（modules/physics/js/physics.js
 *    widgetWaveTune）只消费读回，不重算真值。
 *  - 频率/波长/振幅/相位全部参数化读回（getState/state），杜绝旧组件
 *    f 硬编码类问题（WV-06）。
 *  - 演示漂移为慢放：画布波形以 driftRateHz(f)=clamp(f,0,3) 演示性漂移，
 *    非真实 2πf 时间演化（防频闪，光敏安全 W-P8；WV-15/16）。
 *  - 发声门 audible(f, audibleMax)：<20Hz 或 >audibleMax 只画不发（听力保护；WV-11~13）。
 *  - 方向约定：−kx 使相位滑块右拖（φ↑）波形右移、漂移右移，与 p17.1.3 文案
 *    "波形向右'走'"一致（旧实现 +kx 左移，与文案矛盾，本批修正，文案不动）。
 *  - 非法输入抛错（ENG-66）；state()/snapshot() 防御性拷贝（ENG-10）；
 *    确定性同输入逐位一致（ENG-70）。
 *  - AX01：构造器必填 assumptions/approximations/errorEstimate
 *    （Eng.checkAx01；缺省用 AX_DEFAULTS），state().ax 读回；
 *    approxTag = "理想正弦波近似"（YP-25/27）。
 *  - PRIMITIVE_IFACE 子集：实现 snapshot/restore/state；step/reset/
 *    simTimeSec/stepCountN 为驱动步进概念，解析式原语无积分步进，不实现
 *    （ENG-69：不给假数）。
 * 代码风格：经典 script、无构建、file:// 可跑、'use strict'、防御性拷贝。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.checkAx01) throw new Error('wave.js 需要先加载 core.js（Eng.checkAx01）');

  var VERSION = '2026.10.17.4';

  var D2R = Math.PI / 180;

  /* ================= AX01 默认文本（YP-27：课页可直接引用原文） ================= */
  var AX_DEFAULTS = {
    assumptions: [
      '理想正弦波近似：波形严格按正弦规律，忽略谐波成分',
      '均匀介质：波速 v 处处相同，不随位置变化',
      '无衰减：振幅不随传播距离减小（忽略阻尼与扩散）',
      '一维行波：只沿 +x 方向传播，不计反射与驻波'
    ],
    approximations: [
      '演示漂移为慢放：画布波形以 driftRateHz（≤3Hz）演示性漂移，非真实 2πf 时间演化（防频闪）',
      '显示窗为示意窗口：xSpan/tSpan 按初值频率取整周期数 NP=3，非真实空间/时间尺度',
      'e–t 页（axis="time"）横轴为时间，纵轴为位移/电动势，读数行 λ=v/f 沿用旧口径展示'
    ],
    errorEstimate: '纯解析闭式计算，无数值积分误差；浮点舍入 ~1e-15 量级；读数行 λ 保留 2 位小数（fmtN 口径）'
  };

  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function reqPos(o, k, what) {
    var v = o ? o[k] : undefined;
    if (!isNum(v) || v <= 0) throw new Error('Eng.Wave: ' + what + '."' + k + '" 非法（须为有限正数）');
    return v;
  }

  /* o: { A>0, f>0(Hz), phiDeg(°,默认0), v(默认340 m/s), axis:'space'|'time'(默认space),
   *      NP(默认3), fRef(默认=f), audibleMax(默认2000), ax(AX01三字段，可省用默认) } */
  function Wave(o) {
    o = o || {};
    this._ax = Eng.checkAx01(o.ax || AX_DEFAULTS, 'Wave');
    this._A = reqPos(o, 'A', '构造');
    this._f = reqPos(o, 'f', '构造');
    this._v = (o.v == null) ? 340 : reqPos(o, 'v', '构造');
    if (o.phiDeg != null && !isNum(o.phiDeg)) throw new Error('Eng.Wave: 构造."phiDeg" 非法（须为有限数）');
    this._phiDeg = (o.phiDeg == null) ? 0 : o.phiDeg;
    var axis = o.axis || 'space';
    if (axis !== 'space' && axis !== 'time') throw new Error('Eng.Wave: 构造."axis" 非法（只许 space/time）');
    this._axis = axis;
    this._NP = (o.NP == null) ? 3 : reqPos(o, 'NP', '构造');
    this._fRef = (o.fRef == null) ? this._f : reqPos(o, 'fRef', '构造');
    this._audibleMax = (o.audibleMax == null) ? 2000 : reqPos(o, 'audibleMax', '构造');
    this._derive();
  }

  Wave.prototype._derive = function () {
    this._lambda = this._v / this._f;
    this._k = 2 * Math.PI * this._f / this._v;
    this._omega = 2 * Math.PI * this._f;
    this._T = 1 / this._f;
    this._phi = this._phiDeg * D2R;
    this._xSpan = this._NP * this._v / this._fRef; /* space 模式显示窗宽（米） */
    this._tSpan = this._NP / this._fRef;          /* time 模式显示窗宽（秒） */
  };

  /* 纯真值：y = A·sin(2πft − kx + φ)（x 米，t 秒） */
  Wave.prototype.valueAt = function (x, t) {
    if (!isNum(x) || !isNum(t)) throw new Error('Eng.Wave.valueAt: x/t 非法（须为有限数）');
    return this._A * Math.sin(this._omega * t - this._k * x + this._phi);
  };

  /* 显示分率 u∈[0,1] 处的基准相位（不含演示漂移）：
   * space：−k·(u·xSpan)+φ；time：2πf·(u·tSpan)+φ */
  Wave.prototype.displayPhase = function (u) {
    if (!isNum(u)) throw new Error('Eng.Wave.displayPhase: u 非法（须为有限数）');
    if (this._axis === 'time') return this._omega * (u * this._tSpan) + this._phi;
    return -this._k * (u * this._xSpan) + this._phi;
  };

  /* 渲染采样：基准相位 + 演示漂移相位（driftPhaseRad = demoPhase(driftHz, tDemo)） */
  Wave.prototype.valueAtDisp = function (u, driftPhaseRad) {
    if (!isNum(driftPhaseRad)) throw new Error('Eng.Wave.valueAtDisp: driftPhaseRad 非法（须为有限数）');
    return this._A * Math.sin(this.displayPhase(u) + driftPhaseRad);
  };

  Wave.prototype.set = function (p) {
    p = p || {};
    if (p.A != null) this._A = reqPos(p, 'A', 'set');
    if (p.f != null) this._f = reqPos(p, 'f', 'set');
    if (p.phiDeg != null) {
      if (!isNum(p.phiDeg)) throw new Error('Eng.Wave.set: "phiDeg" 非法（须为有限数）');
      this._phiDeg = p.phiDeg;
    }
    if (p.v != null) this._v = reqPos(p, 'v', 'set');
    this._derive();
    return this;
  };

  /* 全参数读回（防御性拷贝，ENG-10） */
  Wave.prototype.getState = function () {
    return {
      A: this._A,
      f: this._f,
      phiDeg: Wave.phaseWrap(this._phiDeg),
      lambda: this._lambda,
      k: this._k,
      omega: this._omega,
      T: this._T,
      v: this._v,
      axis: this._axis,
      NP: this._NP,
      fRef: this._fRef,
      xSpanM: this._xSpan,
      tSpanS: this._tSpan,
      audibleMax: this._audibleMax,
      model: 'ideal-sinusoid',
      approxTag: '理想正弦波近似',
      ax: Eng.deepCopy(this._ax)
    };
  };
  Wave.prototype.state = Wave.prototype.getState;

  Wave.prototype.snapshot = function () {
    return { A: this._A, f: this._f, phiDeg: this._phiDeg, v: this._v };
  };
  Wave.prototype.restore = function (s) {
    if (!s) throw new Error('Eng.Wave.restore: 快照非法');
    this.set({ A: s.A, f: s.f, phiDeg: s.phiDeg, v: s.v });
    return this;
  };

  /* ---------- 静态：相位回绕到 [0,360)（0°=360°） ---------- */
  Wave.phaseWrap = function (deg) {
    if (!isNum(deg)) throw new Error('Eng.Wave.phaseWrap: 输入非法（须为有限数）');
    return ((deg % 360) + 360) % 360;
  };

  /* ---------- 静态：演示漂移率（频闪 ≤3Hz，光敏安全 W-P8） ---------- */
  Wave.driftRateHz = function (f) {
    if (!isNum(f) || f < 0) throw new Error('Eng.Wave.driftRateHz: f 非法（须为有限非负数）');
    return Math.min(Math.max(f, 0), 3);
  };
  Wave.demoPhase = function (driftHz, tSec) {
    if (!isNum(driftHz) || !isNum(tSec)) throw new Error('Eng.Wave.demoPhase: 输入非法（须为有限数）');
    return 2 * Math.PI * driftHz * tSec;
  };

  /* ---------- 静态：发声门（听力保护；§P5：<20Hz 或 >audibleMax 只画不发） ---------- */
  Wave.audible = function (f, audibleMax) {
    if (!isNum(f) || !isNum(audibleMax)) throw new Error('Eng.Wave.audible: 输入非法（须为有限数）');
    if (f < 20) return { ok: false, key: 'too-low' };
    if (f > audibleMax) return { ok: false, key: 'too-high' };
    return { ok: true, key: 'ok' };
  };

  /* ---------- 静态：双波合成（逐点相加；showSum） ---------- */
  Wave.superpose = function (waves, u, driftPhaseRad) {
    if (!Array.isArray(waves) || waves.length === 0) throw new Error('Eng.Wave.superpose: waves 非法（须为非空数组）');
    var s = 0;
    for (var i = 0; i < waves.length; i++) s += waves[i].valueAtDisp(u, driftPhaseRad);
    return s;
  };

  Wave.VERSION = VERSION;
  Wave.AX_DEFAULTS = Eng.deepCopy(AX_DEFAULTS);

  Eng.Wave = Wave;
})();
