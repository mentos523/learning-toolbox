/* 基础引擎层 · em.js
 * 电磁原语 Eng.EM（电磁真值，2026-10-17 · 物理推广批4）。
 * 三组原语：ElectricField（静电场）/ DipoleField（静磁场）/
 * Commutator（换向器状态机）/ Induction（电磁感应）。
 * 真值口径：~/workspace/phy-audit/em-truth-criteria.md（EM-01…EM-30）。
 *
 * 设计要点（纯函数 + 渲染分离，确定性可断言）：
 *  - 原语只给真值：Efield/Bdip 为旧渲染器同公式族（叠加原理 /
 *    偶极子解析式），probe/needleAngle/currentDir/lenzDir 为纯函数；
 *    课页渲染层（modules/physics/js/physics.js 的 widgetFieldViz /
 *    widgetMotorCommutator / widgetEmInduction）只消费读回，不重算真值。
 *  - 场线追踪与旧实现同口径：efield 为欧拉步进（旧 traceFieldDir；
 *    WIDGETS.md §P8 称 RK2，核对实现实为欧拉——口径从实现，§P8 不改），
 *    bfield 为中点法（旧 traceField）。终止规则：电场终止于异号电荷/
 *    边界、不穿电荷；磁场终止于边界。
 *  - 放置规则（≤4、中心距<8 拒）、探测 8 宫格方向文字 + 强/中/弱
 *    （不给 E 绝对数值，§P8 坑）、楞次方向口径（N 极插入≡S 极拔出→in/
 *    上⊗下⊙；S 极插入≡N 极拔出→out；不动→无电流）、换向器电流每半圈
 *    翻转、慢放 ×0.2 注明非真实转速——全部旧实现逐字搬迁为读回。
 *  - 非法输入抛错（ENG-66）；state()/snapshot() 防御性拷贝（ENG-10）；
 *    确定性同输入逐位一致（ENG-74）。
 *  - AX01：构造器必填 assumptions/approximations/errorEstimate
 *    （Eng.checkAx01；缺省用 AX_DEFAULTS），state().ax 读回；
 *    approxTag 就位："点电荷模型·q=±1示意单位" / "静磁场示意·偶极子近似" /
 *    "慢放示意·非真实转速" / "Φ∝1/距离·示意模型"。
 *  - PRIMITIVE_IFACE 子集：实现 snapshot/restore/state；解析/状态机
 *    原语无积分步进，不实现 step/reset/simTimeSec（ENG-69：不给假数）；
 *    Commutator.advance 为墙钟驱动的状态推进（慢放 ×0.2），非物理积分。
 * 代码风格：经典 script、无构建、file:// 可跑、'use strict'、防御性拷贝。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.checkAx01) throw new Error('em.js 需要先加载 core.js（Eng.checkAx01）');

  var VERSION = '2026.10.17.6';

  /* ---------- 通用 ---------- */
  function isNum(v) { return typeof v === 'number' && isFinite(v); }
  function reqNum(o, k, what) {
    var v = o ? o[k] : undefined;
    if (!isNum(v)) throw new Error('Eng.EM: ' + what + '."' + k + '" 非法（须为有限数）');
    return v;
  }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }
  function normDeg(d) { return ((d % 360) + 360) % 360; }

  /* ---------- AX01 默认文本（课页可直接引用原文） ---------- */
  var AX_EFIELD = {
    assumptions: [
      '点电荷模型：电荷视为无大小的点，忽略带电体尺寸',
      '真空静电场叠加原理：各电荷场矢量相加',
      'q=±1 为示意单位：非真实库仑值，只表征正负与相对量级'
    ],
    approximations: [
      '场线为欧拉步进追踪采样（h=1.1 逻辑单位），非解析场线',
      '显示窗为 100×100 逻辑单位示意窗口，非真实空间尺度',
      '探测手柄只给方向文字 + 相对强弱，不给 E 绝对数值'
    ],
    errorEstimate: '纯代数闭式叠加，浮点舍入 ~1e-15；场线为一阶欧拉近似，步长 1.1'
  };
  var AX_BFIELD = {
    assumptions: [
      '静磁场示意：条形磁铁按理想磁偶极子近似（远场公式近场外推）',
      '真空静磁场：忽略磁介质，磁针为无扰动试探'
    ],
    approximations: [
      '偶极子解析式为近似：近场区（r²<4 逻辑单位）置零',
      '磁感线为中点法追踪采样，铁屑为沿磁感线的静态纹理（非真实随机模拟）',
      '显示窗为 100×100 逻辑单位示意窗口'
    ],
    errorEstimate: '纯解析闭式，浮点舍入 ~1e-15；中点法二阶，步长 1.1'
  };
  var AX_COMM = {
    assumptions: ['通电线圈在匀强磁场中受力转动（定性模型）', '换向器在过平衡位置瞬间切换'],
    approximations: ['慢放 ×0.2：角速度 72°/s 为演示性慢放，非真实转速', '四步状态为离散相位划分'],
    errorEstimate: '状态机无数值积分；角度浮点舍入 ~1e-15'
  };
  var AX_INDUC = {
    assumptions: ['闭合线圈匝数/面积不变', '磁铁沿轴线平动，无偏转'],
    approximations: ['Φ∝1/距离 为示意模型（非真实磁通量积分）', '电流阈值 |dΦ|>0.02 为演示性阈值'],
    errorEstimate: '纯代数闭式，浮点舍入 ~1e-15'
  };

  /* 探测方向 8 宫格（旧 dirText 同口径） */
  var DIR8 = ['向右', '向右偏上', '向上', '向左偏上', '向左', '向左偏下', '向下', '向右偏下'];

  var EM = { VERSION: VERSION };

  /* ============================================================
   * 一、静电场 ElectricField
   * o: { charges:[{x,y,q}], lineBudget(默认32), maxCharges(默认4),
   *      minDist(默认8), ax }
   * ============================================================ */
  function ElectricField(o) {
    o = o || {};
    this._ax = Eng.checkAx01(o.ax || AX_EFIELD, 'EM.ElectricField');
    this._lineBudget = (o.lineBudget == null) ? 32 : reqNum(o, 'lineBudget', '构造');
    this._maxCharges = (o.maxCharges == null) ? 4 : reqNum(o, 'maxCharges', '构造');
    this._minDist = (o.minDist == null) ? 8 : reqNum(o, 'minDist', '构造');
    this._charges = [];
    this._seq = 0;
    var cs = o.charges || [];
    if (!Array.isArray(cs)) throw new Error('Eng.EM.ElectricField: 构造."charges" 非法（须为数组）');
    for (var i = 0; i < cs.length; i++) this._pushCharge(cs[i]);
  }
  ElectricField.prototype._pushCharge = function (c) {
    var x = reqNum(c, 'x', '电荷'), y = reqNum(c, 'y', '电荷');
    if (c.q !== 1 && c.q !== -1) throw new Error('Eng.EM.ElectricField: 电荷."q" 非法（只许 ±1 示意单位）');
    this._charges.push({ id: 'q' + (++this._seq), x: x, y: y, q: c.q });
  };
  /* 叠加：E = Σ q·dr/r³；r²<0.5 奇点跳过（旧 Efield 同口径） */
  ElectricField.prototype.fieldAt = function (x, y) {
    if (!isNum(x) || !isNum(y)) throw new Error('Eng.EM.ElectricField.fieldAt: x/y 非法（须为有限数）');
    var ex = 0, ey = 0;
    for (var i = 0; i < this._charges.length; i++) {
      var c = this._charges[i];
      var dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy;
      if (r2 < 0.5) continue;
      var r = Math.sqrt(r2), k = c.q / (r2 * r);
      ex += k * dx; ey += k * dy;
    }
    return { x: ex, y: ey };
  };
  /* 放置：≤maxCharges；中心距<minDist 拒（旧 svg.click 同口径） */
  ElectricField.prototype.addCharge = function (c) {
    if (this._charges.length >= this._maxCharges) return { ok: false, key: 'limit' };
    var x = reqNum(c, 'x', 'addCharge'), y = reqNum(c, 'y', 'addCharge');
    if (c.q !== 1 && c.q !== -1) throw new Error('Eng.EM.ElectricField.addCharge: "q" 非法（只许 ±1）');
    for (var i = 0; i < this._charges.length; i++) {
      var o = this._charges[i];
      if (Math.hypot(o.x - x, o.y - y) < this._minDist) return { ok: false, key: 'overlap' };
    }
    var nc = { id: 'q' + (++this._seq), x: x, y: y, q: c.q };
    this._charges.push(nc);
    return { ok: true, key: 'ok', id: nc.id };
  };
  ElectricField.prototype.removeCharge = function (id) {
    var n0 = this._charges.length;
    this._charges = this._charges.filter(function (c) { return c.id !== id; });
    return this._charges.length < n0;
  };
  ElectricField.prototype.setCharges = function (cs) {
    if (!Array.isArray(cs)) throw new Error('Eng.EM.ElectricField.setCharges: 输入非法（须为数组）');
    this._charges = [];
    for (var i = 0; i < cs.length; i++) this._pushCharge(cs[i]);
    return this;
  };
  /* 场线追踪：欧拉步进（旧 traceFieldDir 同口径）；
   * dir=+1 沿场方向，−1 逆场；终止于异号电荷（<3）/边界，不穿电荷 */
  ElectricField.prototype.traceLine = function (sx, sy, dir) {
    if (!isNum(sx) || !isNum(sy)) throw new Error('Eng.EM.ElectricField.traceLine: 起点非法（须为有限数）');
    if (dir !== 1 && dir !== -1) throw new Error('Eng.EM.ElectricField.traceLine: dir 非法（只许 ±1）');
    var pts = [{ x: sx, y: sy }], h = 1.1;
    for (var i = 0; i < 200; i++) {
      var q = pts[pts.length - 1];
      var f = this.fieldAt(q.x, q.y), n = Math.hypot(f.x, f.y);
      if (n < 1e-9) break;
      var nx = q.x + dir * f.x / n * h, ny = q.y + dir * f.y / n * h;
      var hit = false;
      for (var j = 0; j < this._charges.length; j++) {
        var c = this._charges[j];
        if (Math.hypot(nx - c.x, ny - c.y) < 3) { hit = true; break; }
      }
      if (hit || nx < 2 || nx > 98 || ny < 2 || ny > 98) break;
      pts.push({ x: nx, y: ny });
    }
    return pts;
  };
  /* 全部场线：每电荷 n=max(4,round(lineBudget·|q|/Σ|q|))，种子距 3.2；
   * 负电荷点列反转使箭头指向电荷（旧 drawE 同口径） */
  ElectricField.prototype.fieldLines = function () {
    var totQ = 0, i, c;
    for (i = 0; i < this._charges.length; i++) totQ += Math.abs(this._charges[i].q);
    totQ = totQ || 1;
    var out = [];
    for (i = 0; i < this._charges.length; i++) {
      c = this._charges[i];
      var n = Math.max(4, Math.round(this._lineBudget * Math.abs(c.q) / totQ));
      var dir = c.q > 0 ? 1 : -1;
      for (var k = 0; k < n; k++) {
        var a = k / n * 2 * Math.PI;
        var pts = this.traceLine(c.x + Math.cos(a) * 3.2, c.y + Math.sin(a) * 3.2, dir);
        if (c.q < 0) pts = pts.slice().reverse();
        out.push({ chargeId: c.id, q: c.q, pts: pts });
      }
    }
    return out;
  };
  /* 探测：方向文字 + 强/中/弱（不给 E 绝对数值） */
  ElectricField.prototype.probe = function (x, y) {
    var E = this.fieldAt(x, y), em = Math.hypot(E.x, E.y);
    var deg = normDeg(Math.atan2(E.y, E.x) * 180 / Math.PI);
    var ref = 0;
    for (var i = 0; i < this._charges.length; i++) ref = Math.max(ref, 1 / 25);
    ref = Math.max(ref, 0.02);
    return {
      angleDeg: deg,
      dirText: DIR8[Math.round(deg / 45) % 8],
      strength: em > ref * 8 ? '强' : em > ref * 2 ? '中' : '弱',
      mag: em
    };
  };
  ElectricField.prototype.count = function () { return this._charges.length; };
  ElectricField.prototype.getState = function () {
    return {
      charges: Eng.deepCopy(this._charges),
      count: this._charges.length,
      lineBudget: this._lineBudget,
      maxCharges: this._maxCharges,
      minDist: this._minDist,
      model: 'point-charge',
      approxTag: '点电荷模型·q=±1示意单位',
      ax: Eng.deepCopy(this._ax)
    };
  };
  ElectricField.prototype.state = ElectricField.prototype.getState;
  ElectricField.prototype.snapshot = function () {
    return { charges: Eng.deepCopy(this._charges) };
  };
  ElectricField.prototype.restore = function (s) {
    if (!s || !Array.isArray(s.charges)) throw new Error('Eng.EM.ElectricField.restore: 快照非法');
    this.setCharges(s.charges);
    return this;
  };
  EM.ElectricField = ElectricField;

  /* ============================================================
   * 二、静磁场 DipoleField
   * o: { magnet:{x,y,angleDeg}, strengthK(默认2000), minR2(默认4),
   *      magLen(默认13), ax }
   * ============================================================ */
  function DipoleField(o) {
    o = o || {};
    this._ax = Eng.checkAx01(o.ax || AX_BFIELD, 'EM.DipoleField');
    this._K = (o.strengthK == null) ? 2000 : reqNum(o, 'strengthK', '构造');
    this._minR2 = (o.minR2 == null) ? 4 : reqNum(o, 'minR2', '构造');
    this._magLen = (o.magLen == null) ? 13 : reqNum(o, 'magLen', '构造');
    var m = o.magnet || {};
    this._mag = {
      x: (m.x == null) ? 50 : reqNum(m, 'x', '磁铁'),
      y: (m.y == null) ? 50 : reqNum(m, 'y', '磁铁'),
      angleDeg: (m.angleDeg == null && m.angle == null) ? 0 : reqNum({ angleDeg: m.angleDeg != null ? m.angleDeg : m.angle }, 'angleDeg', '磁铁')
    };
  }
  /* 偶极子解析式（物理帧 y 向上；旧 Bdip 同口径） */
  DipoleField.prototype.fieldAt = function (x, y) {
    if (!isNum(x) || !isNum(y)) throw new Error('Eng.EM.DipoleField.fieldAt: x/y 非法（须为有限数）');
    var dx = x - this._mag.x, dy = -(y - this._mag.y), r2 = dx * dx + dy * dy;
    if (r2 < this._minR2) return { x: 0, y: 0 };
    var r = Math.sqrt(r2), nx = dx / r, ny = dy / r;
    var ma = this._mag.angleDeg * Math.PI / 180, mx = Math.cos(ma), my = Math.sin(ma);
    var dot = mx * nx + my * ny;
    var k = this._K / (r2 * r);
    return { x: k * (3 * dot * nx - mx), y: k * (3 * dot * ny - my) };
  };
  /* 小磁针 N 极指向角（屏帧，归一 [0,360)；旧 ba=atan2(−B.y,B.x) 同口径） */
  DipoleField.prototype.needleAngle = function (x, y) {
    var B = this.fieldAt(x, y);
    return normDeg(Math.atan2(-B.y, B.x) * 180 / Math.PI);
  };
  DipoleField.prototype.setMagnet = function (m) {
    m = m || {};
    if (m.x != null) this._mag.x = reqNum(m, 'x', 'setMagnet');
    if (m.y != null) this._mag.y = reqNum(m, 'y', 'setMagnet');
    if (m.angleDeg != null) this._mag.angleDeg = reqNum(m, 'angleDeg', 'setMagnet');
    if (m.angle != null) this._mag.angleDeg = reqNum(m, 'angle', 'setMagnet');
    return this;
  };
  /* 磁感线追踪：中点法（旧 traceField 同口径；bfield 无电荷命中项） */
  DipoleField.prototype.traceLine = function (sx, sy, maxPts) {
    if (!isNum(sx) || !isNum(sy)) throw new Error('Eng.EM.DipoleField.traceLine: 起点非法（须为有限数）');
    var pts = [{ x: sx, y: sy }], h = 1.1, n = maxPts || 160;
    for (var i = 0; i < n; i++) {
      var q = pts[pts.length - 1];
      var f1 = this.fieldAt(q.x, q.y), n1 = Math.hypot(f1.x, f1.y);
      if (n1 < 1e-9) break;
      var f2 = this.fieldAt(q.x + f1.x / n1 * h / 2, q.y + f1.y / n1 * h / 2);
      var n2 = Math.hypot(f2.x, f2.y) || 1;
      var nx = q.x + f2.x / n2 * h, ny = q.y + f2.y / n2 * h;
      if (nx < 2 || nx > 98 || ny < 2 || ny > 98) break;
      pts.push({ x: nx, y: ny });
    }
    return pts;
  };
  /* 磁感线种子（N 端出发，旧 drawB 10 种子同口径） */
  DipoleField.prototype.fieldLines = function () {
    var out = [], L = this._magLen, ma = this._mag.angleDeg * Math.PI / 180;
    for (var k = 0; k < 10; k++) {
      var sa = ma + (k / 10 - 0.5) * 2.4;
      out.push(this.traceLine(this._mag.x + Math.cos(sa) * (L + 2),
        this._mag.y + Math.sin(sa) * (L + 2), 160));
    }
    return out;
  };
  /* 铁屑：沿磁感线排布的静态纹理（旧 fCk 分支同口径：10 种子 × 每 6 点取 1） */
  DipoleField.prototype.filingsDots = function () {
    var lines = this.fieldLines(), dots = [];
    for (var j = 0; j < lines.length; j++) {
      var pts = lines[j];
      for (var m = 0; m < pts.length; m += 6) dots.push({ x: pts[m].x, y: pts[m].y });
    }
    return dots;
  };
  DipoleField.prototype.getState = function () {
    return {
      magnet: Eng.deepCopy(this._mag),
      strengthK: this._K,
      minR2: this._minR2,
      magLen: this._magLen,
      model: 'dipole-static',
      approxTag: '静磁场示意·偶极子近似',
      ax: Eng.deepCopy(this._ax)
    };
  };
  DipoleField.prototype.state = DipoleField.prototype.getState;
  DipoleField.prototype.snapshot = function () { return { magnet: Eng.deepCopy(this._mag) }; };
  DipoleField.prototype.restore = function (s) {
    if (!s || !s.magnet) throw new Error('Eng.EM.DipoleField.restore: 快照非法');
    this.setMagnet(s.magnet);
    return this;
  };
  EM.DipoleField = DipoleField;

  /* ============================================================
   * 三、换向器 Commutator（状态机）
   * o: { angleDeg(默认0), slowFactor(默认0.2), rateDegPerSec(默认72), ax }
   * ============================================================ */
  var COMM_PHASES = ['① 通电线圈在磁场中受力，开始转动',
    '② 靠惯性转过平衡位置', '③ 换向器切换：线圈里的电流反向', '④ 受力方向不变，继续朝同一方向转'];
  function Commutator(o) {
    o = o || {};
    this._ax = Eng.checkAx01(o.ax || AX_COMM, 'EM.Commutator');
    this._ang = (o.angleDeg == null) ? 0 : reqNum(o, 'angleDeg', '构造');
    this._slow = (o.slowFactor == null) ? 0.2 : reqNum(o, 'slowFactor', '构造');
    this._rate = (o.rateDegPerSec == null) ? 72 : reqNum(o, 'rateDegPerSec', '构造');
  }
  Commutator.prototype.setAngle = function (deg) {
    if (!isNum(deg)) throw new Error('Eng.EM.Commutator.setAngle: 输入非法（须为有限数）');
    this._ang = deg;
    return this;
  };
  /* 慢放推进：angle += dt·rate（rate=72°/s ↔ ×0.2 慢放） */
  Commutator.prototype.advance = function (dtSec) {
    if (!isNum(dtSec)) throw new Error('Eng.EM.Commutator.advance: 输入非法（须为有限数）');
    this._ang += dtSec * this._rate;
    return this;
  };
  Commutator.prototype.phase = function () { return Math.floor(this._ang / 90) % 4; };
  Commutator.prototype.half = function () { return Math.floor(this._ang / 180) % 2; };
  /* 电流方向每半圈翻转（旧 edgeArrow 口径） */
  Commutator.prototype.currentLabel = function () {
    return this.half() === 0 ? '电流：上→右' : '电流：上→左';
  };
  Commutator.prototype.phaseText = function () { return COMM_PHASES[this.phase()]; };
  Commutator.prototype.getState = function () {
    return {
      angleDeg: this._ang,
      phase: this.phase(),
      half: this.half(),
      currentLabel: this.currentLabel(),
      phaseText: this.phaseText(),
      slowFactor: this._slow,
      rateDegPerSec: this._rate,
      turns: this._ang / 360,
      approxTag: '慢放示意·非真实转速',
      ax: Eng.deepCopy(this._ax)
    };
  };
  Commutator.prototype.state = Commutator.prototype.getState;
  Commutator.prototype.snapshot = function () { return { angleDeg: this._ang }; };
  Commutator.prototype.restore = function (s) {
    if (!s) throw new Error('Eng.EM.Commutator.restore: 快照非法');
    this.setAngle(s.angleDeg);
    return this;
  };
  Commutator.PHASES = COMM_PHASES.slice();
  EM.Commutator = Commutator;

  /* ============================================================
   * 四、电磁感应 Induction
   * o: { pole:'N'|'S'(默认'N'), coilX(默认60), magnetX(默认28),
   *      magnetMin(默认14), magnetMax(默认50), phiK(默认100), ax }
   * 口径（楞次定律）：N 极插入 ≡ S 极拔出 → in（上⊗下⊙，从磁铁一侧看逆时针）；
   *   S 极插入 ≡ N 极拔出 → out（上⊙下⊗，顺时针）；不动 → 无感应电流。
   * ============================================================ */
  function Induction(o) {
    o = o || {};
    this._ax = Eng.checkAx01(o.ax || AX_INDUC, 'EM.Induction');
    var pole = o.pole || 'N';
    if (pole !== 'N' && pole !== 'S') throw new Error('Eng.EM.Induction: 构造."pole" 非法（只许 N/S）');
    this._pole = pole;
    this._coilX = (o.coilX == null) ? 60 : reqNum(o, 'coilX', '构造');
    this._mn = (o.magnetMin == null) ? 14 : reqNum(o, 'magnetMin', '构造');
    this._mx = (o.magnetMax == null) ? 50 : reqNum(o, 'magnetMax', '构造');
    this._phiK = (o.phiK == null) ? 100 : reqNum(o, 'phiK', '构造');
    this._x = clamp((o.magnetX == null) ? 28 : reqNum(o, 'magnetX', '构造'), this._mn, this._mx);
    this._prevPhi = null;
  }
  Induction.prototype.setPole = function (pole) {
    if (pole !== 'N' && pole !== 'S') throw new Error('Eng.EM.Induction.setPole: 输入非法（只许 N/S）');
    this._pole = pole;
    return this;
  };
  Induction.prototype.setMagnetX = function (x) {
    if (!isNum(x)) throw new Error('Eng.EM.Induction.setMagnetX: 输入非法（须为有限数）');
    this._x = clamp(x, this._mn, this._mx);
    return this;
  };
  /* Φ ∝ 1/距离（示意模型；旧 d=max(4,60−(mx+9)) 同口径） */
  Induction.prototype.phi = function () {
    var d = Math.max(4, this._coilX - (this._x + 9));
    return this._phiK / d;
  };
  /* 更新并判向：返回 {dPhi, dir:'in'|'out'|'none', top, bot, statusText, readoutText} */
  Induction.prototype.update = function (x) {
    if (x != null) this.setMagnetX(x);
    var phi = this.phi();
    var dPhi = this._prevPhi == null ? 0 : phi - this._prevPhi;
    this._prevPhi = phi;
    var nPoleIn = (this._pole === 'N') === (dPhi > 0);
    var dir = Math.abs(dPhi) > 0.02 ? (nPoleIn ? 'in' : 'out') : 'none';
    var top = dir === 'in' ? '⊗' : dir === 'out' ? '⊙' : null;
    var bot = dir === 'in' ? '⊙' : dir === 'out' ? '⊗' : null;
    var motion = dPhi > 0 ? '插入' : '拔出';
    var phiWord = dPhi > 0 ? '增大' : '减小';
    var statusText, readoutText;
    if (dir === 'in') {
      statusText = motion + '：Φ ' + phiWord + ' → 感应电流（从左看逆时针），磁场阻碍' + phiWord;
      readoutText = 'Φ ' + phiWord + ' → 感应电流：上 ⊗ 下 ⊙（从磁铁一侧看：逆时针）';
    } else if (dir === 'out') {
      statusText = motion + '：Φ ' + phiWord + ' → 感应电流反向（从左看顺时针），磁场阻碍' + phiWord;
      readoutText = 'Φ ' + phiWord + ' → 感应电流：上 ⊙ 下 ⊗（从磁铁一侧看：顺时针）';
    } else {
      statusText = '磁铁不动：Φ 不变 → 无感应电流';
      readoutText = 'Φ 不变 → 无感应电流（“变”才是条件）';
    }
    return { dPhi: dPhi, dir: dir, top: top, bot: bot,
      statusText: statusText, readoutText: readoutText };
  };
  Induction.prototype.getState = function () {
    return {
      pole: this._pole,
      magnetX: this._x,
      phi: this.phi(),
      magnetMin: this._mn,
      magnetMax: this._mx,
      approxTag: 'Φ∝1/距离·示意模型',
      ax: Eng.deepCopy(this._ax)
    };
  };
  Induction.prototype.state = Induction.prototype.getState;
  Induction.prototype.snapshot = function () {
    return { pole: this._pole, magnetX: this._x, prevPhi: this._prevPhi };
  };
  Induction.prototype.restore = function (s) {
    if (!s) throw new Error('Eng.EM.Induction.restore: 快照非法');
    this.setPole(s.pole);
    this._x = clamp(s.magnetX, this._mn, this._mx);
    this._prevPhi = s.prevPhi;
    return this;
  };
  EM.Induction = Induction;

  /* ---------- 静态：方向文字（8 宫格） ---------- */
  EM.dirText = function (angleRad) {
    if (!isNum(angleRad)) throw new Error('Eng.EM.dirText: 输入非法（须为有限数）');
    var deg = normDeg(angleRad * 180 / Math.PI);
    return DIR8[Math.round(deg / 45) % 8];
  };
  /* ---------- 静态：强弱三档（旧 strengthText 同口径） ---------- */
  EM.strengthTier = function (em, ref) {
    if (!isNum(em) || !isNum(ref)) throw new Error('Eng.EM.strengthTier: 输入非法（须为有限数）');
    return em > ref * 8 ? '强' : em > ref * 2 ? '中' : '弱';
  };
  EM.normDeg = normDeg;
  EM.AX = {
    efield: Eng.deepCopy(AX_EFIELD),
    bfield: Eng.deepCopy(AX_BFIELD),
    commutator: Eng.deepCopy(AX_COMM),
    induction: Eng.deepCopy(AX_INDUC)
  };

  Eng.EM = EM;
})();
