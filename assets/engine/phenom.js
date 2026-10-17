/* 基础引擎层 · phenom.js
 * Eng.Phenom —— 现象演示类小原语（物理推广批1附带，2026-10-17）。
 *
 * 地位：docs/ENGINE.md §2.9。定性/半定量演示，没有解析对账可做
 * （无真实测量语义），因此按"确定性 + 状态机真值"口径实现：
 *   - 一律由 Eng.Driver 固定步进驱动（默认 dt=1/60），不读墙钟；
 *   - 教学随机一律走 Eng.SeededRNG（禁用 Math.random）；
 *   - state()/snapshot()/restore() 读回防御性拷贝（ENG-10）；
 *   - 实现 Eng.PRIMITIVE_IFACE（step/reset/snapshot/restore/
 *     simTimeSec/stepCountN/state）。
 * 渲染（SVG/Konva/DOM）由课页层负责，本层只给"状态机真值"。
 *
 * 口径：ENG-NC01/NC02（不可对账：定性演示只验确定性；教学故意
 * 反例/示意须配说明）+ YP-26（不宣称精确值）+ YP-28（失效边界
 * 写不出时声明"仅用于定性理解"）。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.Driver || !Eng.SeededRNG || !Eng.checkAx01 || !Eng.deepCopy)
    throw new Error('phenom.js 需要先加载 core.js/driver.js');

  var P = {};
  Eng.Phenom = P;

  function isNum(v) { return typeof v === 'number' && isFinite(v); }

  /* ============================================================
   * 1. 音叉溅水花（对应组件 tuning-fork，p01.1.1）
   * 真值（旧实现口径，原样搬迁）：
   *   - 振幅包络 A(t) = 3.4·e^(−1.8t)（示意单位）；5Hz 示意（非真实频率，
   *     文案显性化"示意"）；
   *   - 两臂反向振动：dx = A·sin(2π·5·t)；
   *   - 水花 16 滴，初速由种子 RNG 给出，抛物线：x=x0+vx·t，
   *     y=y0+vy0·t+30·t²（重力 60 u/s² 示意）；2.5s 自停；
   *   - 状态：A>0.15 或仍有水滴 → 'ringing'，否则 'rest'。
   * ============================================================ */
  P.TuningFork = function (opt) {
    opt = opt || {};
    var ax = Eng.checkAx01(opt, 'Phenom.TuningFork');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
    this.seed = opt.seed === undefined ? 11 : (opt.seed >>> 0);
    this.amp0 = 3.4; this.decay = 1.8; this.freqHz = 5;
    this.dropCount = opt.dropCount === undefined ? 16 : opt.dropCount;
    this.cutoffSec = 2.5;
    this._drops = [];
    var self = this;
    this.driver = new Eng.Driver({ dt: 1 / 60, gravityMps2: 0,
      assumptions: ax.assumptions, approximations: ax.approximations,
      errorEstimate: ax.errorEstimate });
    /* strike() 记录 driver 步数，供 restore 后继续 */
    this._struckStep = -1;
  };
  /* PH-TF01：振幅包络纯函数（断言入口） */
  P.TuningFork.prototype.ampAt = function (tSec) {
    return this.amp0 * Math.exp(-this.decay * tSec);
  };
  P.TuningFork.prototype.strike = function () {
    var rng = new Eng.SeededRNG(this.seed);
    this._drops = [];
    for (var i = 0; i < this.dropCount; i++) {
      this._drops.push({
        x0: 40 + rng.next() * 20, y0: 66,
        vx: (rng.next() - 0.5) * 26,
        vy: -(28 + rng.next() * 30)
      });
    }
    this.driver.reset();
    this._struckStep = this.driver.stepCountN();
    return this.state();
  };
  /* PH-TF02：水滴位置是 t 的纯函数（确定性；60u/s²→30t² 项） */
  P.TuningFork.prototype.dropsAt = function (tSec) {
    var out = [], self = this;
    this._drops.forEach(function (d) {
      var x = d.x0 + d.vx * tSec;
      var y = d.y0 + d.vy * tSec + 30 * tSec * tSec;
      if (y < 70 && tSec < self.cutoffSec) out.push({ x: x, y: y });
    });
    return out;
  };
  P.TuningFork.prototype.state = function () {
    var t = this._struckStep < 0 ? -1 : this.driver.simTimeSec();
    var amp = t < 0 ? 0 : this.ampAt(t);
    var drops = t < 0 ? [] : this.dropsAt(t);
    var active = t >= 0 && (amp > 0.15 || drops.length > 0);
    return Eng.deepCopy({
      tSec: t < 0 ? 0 : t,
      amp: amp,
      armDx: t < 0 ? 0 : amp * Math.sin(t * 2 * Math.PI * this.freqHz),
      dropCount: drops.length,
      active: active,
      statusKey: t < 0 ? 'rest' : (active ? 'ringing' : 'rest')
    });
  };
  P.TuningFork.prototype.step = function (n) { this.driver.step(n || 1); return this.state(); };
  P.TuningFork.prototype.reset = function () {
    this.driver.reset(); this._drops = []; this._struckStep = -1; return this.state();
  };
  P.TuningFork.prototype.snapshot = function () {
    return Eng.deepCopy({ stepN: this.driver.stepCountN(), simTimeSec: this.driver.simTimeSec(),
      drops: this._drops, struckStep: this._struckStep });
  };
  P.TuningFork.prototype.restore = function (s) {
    if (!s) throw new Error('TuningFork.restore: 快照非法');
    this._drops = Eng.deepCopy(s.drops || []);
    this._struckStep = s.struckStep;
    /* driver 步数对齐（ENG-59/60 后退语义） */
    this.driver.reset();
    var target = s.stepN || 0;
    if (target > 0) this.driver.step(target);
    return this.state();
  };
  P.TuningFork.prototype.simTimeSec = function () { return this.driver.simTimeSec(); };
  P.TuningFork.prototype.stepCountN = function () { return this.driver.stepCountN(); };

  /* ============================================================
   * 2. 真空罩抽气（对应组件 vacuum-chamber，p01.1.2）
   * 真值（旧实现口径）：波纹数 = round(air/100·4)；分子点数 =
   * round(air/100·40)；三档状态 0% → 'vacuum'，<40% → 'low'，
   * 否则 'clear'。
   * ============================================================ */
  P.VacuumChamber = function (opt) {
    opt = opt || {};
    var ax = Eng.checkAx01(opt, 'Phenom.VacuumChamber');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
    this.airPct = opt.airInit === undefined ? 100 : opt.airInit;
  };
  P.VacuumChamber.prototype.setAir = function (v) {
    if (!isNum(v)) throw new Error('VacuumChamber.setAir: 非法');
    this.airPct = Math.max(0, Math.min(100, v));
    return this.state();
  };
  /* PH-VC01：波纹/分子点数为 airPct 纯函数 */
  P.VacuumChamber.prototype.state = function () {
    var a = this.airPct;
    var key = a <= 0 ? 'vacuum' : (a < 40 ? 'low' : 'clear');
    return { airPct: a, waveCount: Math.round(a / 100 * 4),
      dotCount: Math.round(a / 100 * 40), statusKey: key };
  };
  P.VacuumChamber.prototype.step = function () { return this.state(); };
  P.VacuumChamber.prototype.reset = function () { return this.state(); };
  P.VacuumChamber.prototype.snapshot = function () { return { airPct: this.airPct }; };
  P.VacuumChamber.prototype.restore = function (s) {
    if (!s || !isNum(s.airPct)) throw new Error('VacuumChamber.restore: 快照非法');
    this.airPct = s.airPct; return this.state();
  };
  P.VacuumChamber.prototype.simTimeSec = function () { return 0; };
  P.VacuumChamber.prototype.stepCountN = function () { return 0; };

  /* ============================================================
   * 3. 海绵凹陷（对应组件 sponge-dent，p06.1.1）
   * 真值：dent = F/pMax·12（示意单位，禁止当真实长度抄——
   * 黄队口径：读数只给三档文字 + 3 格条形）；
   * 档位：dent<2 → 'shallow'(1格)，<6 → 'mid'(2格)，否则 'deep'(3格)。
   * ============================================================ */
  P.SpongeDent = function (opt) {
    opt = opt || {};
    var ax = Eng.checkAx01(opt, 'Phenom.SpongeDent');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
    this.pressureMax = opt.pressureMax || 20;
    this.pressure = opt.pressureInit === undefined ? 8 : opt.pressureInit;
  };
  P.SpongeDent.prototype.setPressure = function (v) {
    if (!isNum(v)) throw new Error('SpongeDent.setPressure: 非法');
    this.pressure = Math.max(0, Math.min(this.pressureMax, v));
    return this.state();
  };
  /* PH-SD01：dent/tier/cells 为 pressure 纯函数 */
  P.SpongeDent.prototype.state = function () {
    var dent = this.pressure / this.pressureMax * 12;
    var tier = dent < 2 ? 'shallow' : (dent < 6 ? 'mid' : 'deep');
    var cells = dent < 2 ? 1 : (dent < 6 ? 2 : 3);
    return { pressure: this.pressure, dentUnits: dent, tier: tier, cells: cells };
  };
  P.SpongeDent.prototype.step = function () { return this.state(); };
  P.SpongeDent.prototype.reset = function () { return this.state(); };
  P.SpongeDent.prototype.snapshot = function () { return { pressure: this.pressure }; };
  P.SpongeDent.prototype.restore = function (s) {
    if (!s || !isNum(s.pressure)) throw new Error('SpongeDent.restore: 快照非法');
    this.pressure = s.pressure; return this.state();
  };
  P.SpongeDent.prototype.simTimeSec = function () { return 0; };
  P.SpongeDent.prototype.stepCountN = function () { return 0; };

  /* ============================================================
   * 4. 吹纸/机翼流线（对应组件 paper-blow，p06.1.4）
   * 真值：paper：纸条上飘角 = b/bMax·50°；
   * wing：升力箭头高 = b/bMax·18，上方流线粗 = 0.8+b·0.14
   * （b=强度档，bMax 默认 10）。
   * ============================================================ */
  P.PaperBlow = function (opt) {
    opt = opt || {};
    var ax = Eng.checkAx01(opt, 'Phenom.PaperBlow');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
    this.mode = opt.mode === 'wing' ? 'wing' : 'paper';
    this.blowMax = opt.blowMax || 10;
    this.blow = opt.blowInit === undefined ? 4 : opt.blowInit;
  };
  P.PaperBlow.prototype.setBlow = function (v) {
    if (!isNum(v)) throw new Error('PaperBlow.setBlow: 非法');
    this.blow = Math.max(0, Math.min(this.blowMax, v));
    return this.state();
  };
  /* PH-PB01：paper 角 / wing 升力高为 blow 纯函数 */
  P.PaperBlow.prototype.state = function () {
    var b = this.blow, k = b / this.blowMax;
    var s = { mode: this.mode, blow: b };
    if (this.mode === 'wing') {
      s.liftH = k * 18;
      s.upperLineWidth = 0.8 + b * 0.14;
      s.liftVisible = s.liftH > 1;
    } else {
      s.angleDeg = k * 50;
      s.gasLineWidth = 0.8 + b * 0.16;
      s.floating = s.angleDeg >= 5;
    }
    return s;
  };
  P.PaperBlow.prototype.step = function () { return this.state(); };
  P.PaperBlow.prototype.reset = function () { return this.state(); };
  P.PaperBlow.prototype.snapshot = function () { return { blow: this.blow }; };
  P.PaperBlow.prototype.restore = function (s) {
    if (!s || !isNum(s.blow)) throw new Error('PaperBlow.restore: 快照非法');
    this.blow = s.blow; return this.state();
  };
  P.PaperBlow.prototype.simTimeSec = function () { return 0; };
  P.PaperBlow.prototype.stepCountN = function () { return 0; };

  /* ============================================================
   * 5. 溢水杯（对应组件 overflow-cup，p06.2.2）
   * 真值：frac = min(1, V/Vmax)；小烧杯水位 = frac·44；
   * 物体下压深度 = 3+frac·26；V溢 = V（恒等，F1 证据链）。
   * ============================================================ */
  P.OverflowCup = function (opt) {
    opt = opt || {};
    var ax = Eng.checkAx01(opt, 'Phenom.OverflowCup');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
    this.volumeMax = opt.volumeMax || 200;
    this.volume = opt.volumeInit === undefined ? 0 : opt.volumeInit;
  };
  P.OverflowCup.prototype.setVolume = function (v) {
    if (!isNum(v)) throw new Error('OverflowCup.setVolume: 非法');
    this.volume = Math.max(0, Math.min(this.volumeMax, v));
    return this.state();
  };
  /* PH-OC01：frac/fillH/depth 为 volume 纯函数 */
  P.OverflowCup.prototype.state = function () {
    var frac = Math.min(1, this.volume / this.volumeMax);
    return { volume: this.volume, frac: frac, fillH: frac * 44, depth: 3 + frac * 26,
      poured: this.volume > 0 };
  };
  P.OverflowCup.prototype.step = function () { return this.state(); };
  P.OverflowCup.prototype.reset = function () { return this.state(); };
  P.OverflowCup.prototype.snapshot = function () { return { volume: this.volume }; };
  P.OverflowCup.prototype.restore = function (s) {
    if (!s || !isNum(s.volume)) throw new Error('OverflowCup.restore: 快照非法');
    this.volume = s.volume; return this.state();
  };
  P.OverflowCup.prototype.simTimeSec = function () { return 0; };
  P.OverflowCup.prototype.stepCountN = function () { return 0; };

  /* ============================================================
   * 6. 真空管（对应组件 vacuum-tube，p11.2.3）
   * 真值（旧实现口径）：y = 18+54·min(1,t/d)²；
   * 硬币 d=1.2s；羽毛有空气 d=3.6s + 左右飘摆
   * xf = 43+sin(9t)·3·max(0,1−t/dF)，真空 d=1.2s。
   * ============================================================ */
  P.VacuumTube = function (opt) {
    opt = opt || {};
    var ax = Eng.checkAx01(opt, 'Phenom.VacuumTube');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
    this.coinDurSec = 1.2;
    this.featherAirDurSec = 3.6;
    this.vacuum = false;
    this.driver = new Eng.Driver({ dt: 1 / 60, gravityMps2: 0,
      assumptions: ax.assumptions, approximations: ax.approximations,
      errorEstimate: ax.errorEstimate });
  };
  P.VacuumTube.prototype.setMode = function (vacuum) {
    this.vacuum = !!vacuum;
    this.driver.reset();
    return this.state();
  };
  P.VacuumTube.prototype.drop = function () {
    this.driver.reset();
    return this.state();
  };
  /* PH-VT01：y 位置为 (t, mode) 纯函数；真空两球同落 */
  P.VacuumTube.prototype.state = function () {
    var t = this.driver.simTimeSec();
    var dC = this.coinDurSec, dF = this.vacuum ? dC : this.featherAirDurSec;
    var tc = Math.min(1, t / dC), tf = Math.min(1, t / dF);
    var sway = this.vacuum ? 0 : Math.sin(t * 9) * 3 * Math.max(0, 1 - t / dF);
    return {
      tSec: t, vacuum: this.vacuum,
      coinY: 18 + 54 * tc * tc,
      featherY: 18 + 54 * tf * tf,
      featherX: 43 + sway,
      coinDone: t >= dC, featherDone: t >= dF,
      done: t >= Math.max(dC, dF)
    };
  };
  P.VacuumTube.prototype.step = function (n) { this.driver.step(n || 1); return this.state(); };
  P.VacuumTube.prototype.reset = function () { this.driver.reset(); return this.state(); };
  P.VacuumTube.prototype.snapshot = function () {
    return { stepN: this.driver.stepCountN(), vacuum: this.vacuum };
  };
  P.VacuumTube.prototype.restore = function (s) {
    if (!s || typeof s.vacuum !== 'boolean')
      throw new Error('VacuumTube.restore: 快照非法');
    this.vacuum = s.vacuum;
    this.driver.reset();
    if (s.stepN > 0) this.driver.step(s.stepN);
    return this.state();
  };
  P.VacuumTube.prototype.simTimeSec = function () { return this.driver.simTimeSec(); };
  P.VacuumTube.prototype.stepCountN = function () { return this.driver.stepCountN(); };

})();
