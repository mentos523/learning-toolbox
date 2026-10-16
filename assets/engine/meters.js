/* 基础引擎层 · meters.js（上）
 * 仪表原语（ENG-35 ~ ENG-48）。
 * 硬口径：读数必须由被测对象状态驱动（传入 getValue 回调），不许写死（ENG-35）。
 * 估读总规则 ENG-38（细化替代 PHY-R03）：分度值首位 1→估读到下一位；2/5→估读到本位；
 *   托盘天平 0.1g 不估读、机械停表 0.1s 不估读（特例）。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.ViewportMapper) throw new Error('meters.js 必须在 core.js/coords.js 之后加载');

  /* ---------- ENG-38 估读核心 ---------- */

  function decimalsOf(d) {
    var s = Number(d.toPrecision(12)).toString();
    var i = s.indexOf('.');
    if (i < 0) return 0;
    var frac = s.slice(i + 1).replace(/0+$/, '');
    return frac.length;
  }

  function firstSigDigit(d) {
    d = Math.abs(d);
    while (d >= 10) d /= 10;
    while (d < 1 && d > 0) d *= 10;
    return Math.floor(d + 1e-9);
  }

  // ENG-38：返回 {value（估读后数值）, text, decimals, estimated}
  // YP-12：估读目标小数位（供 estimateDigit 字段）
  Eng.estimateDecimals = function (division, noEstimate) {
    var dec = decimalsOf(division);
    if (noEstimate) return dec; // 天平/停表特例：不估读
    var f = firstSigDigit(division);
    if (f === 1) return dec + 1; // 首位为 1 → 估读到下一位
    return dec; // 首位为 2/5（或其他）→ 估读到本位
  };

  Eng.estimateReading = function (value, division, opt) {
    opt = opt || {};
    if (!Eng.isFiniteNumber(value)) throw new Error('estimateReading: value 非法（ENG-66 不许静默画错）');
    if (!(division > 0)) throw new Error('estimateReading: division 必须为正');
    var targetDec = Eng.estimateDecimals(division, !!opt.noEstimate);
    var estimated = !opt.noEstimate;
    var m = Math.pow(10, targetDec);
    var rounded = Math.round((value + 1e-12) * m) / m; // +eps 抑制定点表示抖动
    return { value: rounded, text: rounded.toFixed(targetDec), decimals: targetDec, estimated: estimated };
  };

  /* ---------- 仪表基类 ---------- */

  Eng.Meter = function (opt) {
    opt = opt || {};
    this.name = opt.name || 'meter';
    this.kind = opt.kind || 'meter';
    this.unit = opt.unit || '';
    this.division = opt.division; // 制式分度值（制式单位）
    if (typeof opt.getValue !== 'function') throw new Error('Meter[' + this.name + ']: 必须传入 getValue（被测对象状态驱动，ENG-35）');
    this._getValue = opt.getValue;
    // ENG-65：数据源可追溯声明
    this.dataSource = opt.dataSource || { kind: '仿真读回', ref: this.name };
    if (!this.dataSource.kind || !this.dataSource.ref) throw new Error('Meter: dataSource.kind/ref 缺一不可（ENG-65）');
    var ax = Eng.checkAx01(opt, 'Meter:' + this.name);
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
    this.dock = opt.dataDock || new Eng.DataDock();
    // YP-01/02/06：默认引导文案（动词开头、步骤嵌入），可覆盖、不可清空
    this.guide = null;
    this.setGuide(opt.guide);
  };

  // YP-06：允许覆盖，禁止清空为静默（空字符串/空白 → 回退默认）
  Eng.Meter.prototype.setGuide = function (text) {
    var dflt = (Eng.guides && Eng.guides.meter) ? Eng.guides.meter(this.kind, this) : null;
    if (typeof text === 'string' && text.trim().length > 0) this.guide = text;
    else this.guide = dflt || ('看 ' + this.kind + '：读数随被测对象变化，点"记录数据"记下读数。');
    return this.guide;
  };

  // ENG-35：读数由状态驱动
  Eng.Meter.prototype.readValue = function () {
    var v = this._getValue();
    if (!Eng.isFiniteNumber(v)) throw new Error('Meter[' + this.name + ']: 被测状态非法（ENG-66）');
    return v;
  };
  Eng.Meter.prototype.readEstimated = function () {
    return Eng.estimateReading(this.readValue(), this.division, { noEstimate: !!this.noEstimate });
  };
  Eng.Meter.prototype.readText = function () {
    return this.readEstimated().text + (this.unit ? ' ' + this.unit : '');
  };
  // YP-16：数值宣称机制（课页文案引用的真值）
  Eng.Meter.prototype.claimValue = function () { return this.readEstimated().value; };
  // YP-17：记录数据
  Eng.Meter.prototype.recordData = function (label) {
    var r = this.readEstimated();
    return this.dock.record(label || this.name, r.value, this.unit);
  };
  // ENG-47：指针角度→读数一致性（子类实现映射；基类提供校验）
  Eng.Meter.prototype.pointerAngleDeg = function (value) {
    throw new Error('Meter[' + this.name + ']: 未实现 pointerAngleDeg');
  };
  Eng.Meter.prototype.valueFromPointerDeg = function (angleDeg) {
    throw new Error('Meter[' + this.name + ']: 未实现 valueFromPointerDeg');
  };
  Eng.Meter.prototype.pointerConsistencyDev = function (value) {
    var back = this.valueFromPointerDeg(this.pointerAngleDeg(value));
    return Math.abs(back - value) / this.division; // 单位：分度值（ENG-47 ≤ 0.5）
  };

  // YP-12：graduation（分度值）、estimateDigit（估读位小数位数）字段
  Object.defineProperty(Eng.Meter.prototype, 'graduation', {
    get: function () { return this.division; }
  });
  Object.defineProperty(Eng.Meter.prototype, 'estimateDigit', {
    get: function () { return Eng.estimateDecimals(this.division, !!this.noEstimate); }
  });

  /* ---------- 圆形表盘基类（电流表/电压表/量角器） ---------- */
  Eng.DialMeter = function (opt) {
    Eng.Meter.call(this, opt);
    this.rangeMax = opt.rangeMax; // 量程上限（制式单位）
    this.rangeMin = opt.rangeMin || 0;
    // Konva y 向下：0°=右、90°=下、180°=左、270°=上。默认 210°（左上）→ 330°（右上）经顶部 120° 扫掠。
    this.dialStartDeg = opt.dialStartDeg !== undefined ? opt.dialStartDeg : 210;
    this.dialSweepDeg = opt.dialSweepDeg !== undefined ? opt.dialSweepDeg : 120;
  };
  Eng.DialMeter.prototype = Object.create(Eng.Meter.prototype);
  Eng.DialMeter.prototype.constructor = Eng.DialMeter;
  Eng.DialMeter.prototype.pointerAngleDeg = function (value) {
    var f = (value - this.rangeMin) / (this.rangeMax - this.rangeMin);
    return this.dialStartDeg + f * this.dialSweepDeg;
  };
  Eng.DialMeter.prototype.valueFromPointerDeg = function (angleDeg) {
    var f = (angleDeg - this.dialStartDeg) / this.dialSweepDeg;
    return this.rangeMin + f * (this.rangeMax - this.rangeMin);
  };

  /* ---------- 电流表（ENG-40） ---------- */
  Eng.Ammeter = function (opt) {
    opt = opt || {};
    var rangeMaxA = opt.rangeMaxA !== undefined ? opt.rangeMaxA : 0.6; // YP-31 课堂常见 0.6A 档
    if (rangeMaxA !== 0.6 && rangeMaxA !== 3) throw new Error('Ammeter: rangeMaxA 仅支持 0.6 / 3（ENG-38 表）');
    var division = rangeMaxA === 0.6 ? 0.02 : 0.1; // ENG-38：0.6A 档分度 0.02→估读 0.01；3A 档 0.1→0.01
    Eng.DialMeter.call(this, {
      name: opt.name || 'ammeter', kind: 'ammeter', unit: 'A',
      division: division, rangeMax: rangeMaxA, getValue: opt.getValue,
      dataSource: opt.dataSource, dataDock: opt.dataDock, guide: opt.guide,
      assumptions: opt.assumptions || ['电流表内阻视为 0（理想电流表）', '电路稳态直流'],
      approximations: opt.approximations || ['指针式仪表线性刻度'],
      errorEstimate: opt.errorEstimate || '估读位 ±1（' + (rangeMaxA === 0.6 ? '0.01' : '0.01') + ' A）；接入不改变电路（理想假设）'
    });
    this.rangeMaxA = rangeMaxA;
    this.terminalLabel = rangeMaxA + ' A'; // ENG-40：接线柱标注须与量程一致
  };
  Eng.Ammeter.prototype = Object.create(Eng.DialMeter.prototype);
  Eng.Ammeter.prototype.constructor = Eng.Ammeter;

  /* ---------- 电压表（ENG-39） ---------- */
  Eng.Voltmeter = function (opt) {
    opt = opt || {};
    var rangeMaxV = opt.rangeMaxV !== undefined ? opt.rangeMaxV : 3; // YP-31 课堂常见 3V 档
    if (rangeMaxV !== 3 && rangeMaxV !== 15) throw new Error('Voltmeter: rangeMaxV 仅支持 3 / 15（ENG-38 表）');
    var division = rangeMaxV === 3 ? 0.1 : 0.5; // ENG-38：3V 档 0.1→0.01；15V 档 0.5→0.1
    Eng.DialMeter.call(this, {
      name: opt.name || 'voltmeter', kind: 'voltmeter', unit: 'V',
      division: division, rangeMax: rangeMaxV, getValue: opt.getValue,
      dataSource: opt.dataSource, dataDock: opt.dataDock, guide: opt.guide,
      assumptions: opt.assumptions || ['电压表内阻视为无穷大（理想电压表）', '电路稳态直流'],
      approximations: opt.approximations || ['指针式仪表线性刻度'],
      errorEstimate: opt.errorEstimate || '估读位 ±1（' + (rangeMaxV === 3 ? '0.01' : '0.1') + ' V）；接入不分流（理想假设）'
    });
    this.rangeMaxV = rangeMaxV;
    this.terminalLabel = rangeMaxV + ' V'; // ENG-39：接线柱标注须与量程一致
  };
  Eng.Voltmeter.prototype = Object.create(Eng.DialMeter.prototype);
  Eng.Voltmeter.prototype.constructor = Eng.Voltmeter;
})();
/* 基础引擎层 · meters.js（下）
 * 刻度尺 / 量角器 / 温度计 / 天平 / 停表 / 量筒 / 滴定管 + Konva 统一渲染。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.Meter) throw new Error('meters.js（下）必须在 meters.js（上）之后加载');

  /* ---------- 刻度尺（ENG-36） ---------- */
  Eng.Ruler = function (opt) {
    opt = opt || {};
    var divisionMm = opt.divisionMm !== undefined ? opt.divisionMm : 1;
    Eng.Meter.call(this, {
      name: opt.name || 'ruler', kind: 'ruler', unit: 'mm',
      division: divisionMm, getValue: opt.getValue,
      dataSource: opt.dataSource, dataDock: opt.dataDock, guide: opt.guide,
      assumptions: opt.assumptions || ['被测物边缘与刻度线对齐', '刻度均匀（ENG-46）'],
      approximations: opt.approximations || ['估读按 ENG-38 口径'],
      errorEstimate: opt.errorEstimate || '估读位 ±1（0.1 mm）；磨损尺用两端读数法（PHY-R05）'
    });
    this.divisionMm = divisionMm;
    this.lengthMm = opt.lengthMm || 150;
    this.wornZero = !!opt.wornZero; // 零刻度磨损 → 两端读数法（PHY-R05）
    this.sight = opt.sight || 'level'; // level / over（俯视）/ under（仰视），PHY-R04
  };
  Eng.Ruler.prototype = Object.create(Eng.Meter.prototype);
  Eng.Ruler.prototype.constructor = Eng.Ruler;
  // 读被测长度：wornZero 时传两端对齐刻度 (x1Mm, x2Mm)；否则直接传长度
  Eng.Ruler.prototype.readLengthMm = function (x1Mm, x2Mm) {
    var raw = this.wornZero ? x2Mm - x1Mm : (x1Mm !== undefined && x2Mm === undefined ? x1Mm : this.readValue());
    // YP-14：错误姿势读数真实反映偏差（俯视偏大 +0.2·分度，仰视偏小 −0.2·分度），并标注
    var biased = raw, tag = '';
    if (this.sight === 'over') { biased = raw + 0.2 * this.divisionMm; tag = '（俯视偏大示意）'; }
    else if (this.sight === 'under') { biased = raw - 0.2 * this.divisionMm; tag = '（仰视偏小示意）'; }
    var r = Eng.estimateReading(biased, this.divisionMm, {});
    return { value: r.value, text: r.text + ' mm' + tag, sight: this.sight };
  };
  Eng.Ruler.prototype.readText = function () {
    return this.readLengthMm().text;
  };
  // 刻度尺为线式仪表：指针映射 = 位置映射（ENG-47 用位置一致性）
  Eng.Ruler.prototype.pointerAngleDeg = function () { return 0; };
  Eng.Ruler.prototype.valueFromPointerDeg = function () { return this.readValue(); };
  Eng.Ruler.prototype.pointerConsistencyDev = function () { return 0; };
  Eng.Ruler.prototype.tickPositionMm = function (k) { return k * this.divisionMm; }; // ENG-46 均匀性

  /* ---------- 量角器（ENG-37） ---------- */
  Eng.Protractor = function (opt) {
    opt = opt || {};
    var divisionDeg = opt.divisionDeg !== undefined ? opt.divisionDeg : 1;
    Eng.DialMeter.call(this, {
      name: opt.name || 'protractor', kind: 'protractor', unit: '°',
      division: divisionDeg, rangeMin: 0, rangeMax: 180,
      dialStartDeg: 0, dialSweepDeg: -180, // 半圆：读数 0° 在右、90° 在上、180° 在左（Konva y 向下，-90° 为上）
      getValue: opt.getValue,
      dataSource: opt.dataSource, dataDock: opt.dataDock, guide: opt.guide,
      assumptions: opt.assumptions || ['量角器中心与角顶点重合', '0° 线与角一边重合'],
      approximations: opt.approximations || ['估读按 ENG-38 口径'],
      errorEstimate: opt.errorEstimate || '估读位 ±1（0.1°）'
    });
    this.divisionDeg = divisionDeg;
    this.clockwise = !!opt.clockwise; // 内外圈方向声明（ENG-37：读反 = FAIL）
  };
  Eng.Protractor.prototype = Object.create(Eng.DialMeter.prototype);
  Eng.Protractor.prototype.constructor = Eng.Protractor;
  Eng.Protractor.prototype.readAngleDeg = function () {
    var v = this.readValue();
    var r = Eng.estimateReading(v, this.divisionDeg, {});
    var tag = this.clockwise ? '（内圈顺时针读数）' : '（外圈逆时针读数）';
    return { value: r.value, text: r.text + '°' + tag };
  };
  Eng.Protractor.prototype.readText = function () { return this.readAngleDeg().text; };

  /* ---------- 温度计（ENG-41） ---------- */
  Eng.Thermometer = function (opt) {
    opt = opt || {};
    var divisionC = opt.divisionC !== undefined ? opt.divisionC : 1;
    Eng.Meter.call(this, {
      name: opt.name || 'thermometer', kind: 'thermometer', unit: '℃',
      division: divisionC, getValue: opt.getValue,
      dataSource: opt.dataSource, dataDock: opt.dataDock, guide: opt.guide,
      assumptions: opt.assumptions || ['液柱与被测物充分热平衡', '刻度均匀（ENG-46）'],
      approximations: opt.approximations || ['估读按 ENG-38 口径'],
      errorEstimate: opt.errorEstimate || '估读位 ±1（0.1 ℃）'
    });
    this.divisionC = divisionC;
    this.rangeMinC = opt.rangeMinC !== undefined ? opt.rangeMinC : -20;
    this.rangeMaxC = opt.rangeMaxC !== undefined ? opt.rangeMaxC : 110;
  };
  Eng.Thermometer.prototype = Object.create(Eng.Meter.prototype);
  Eng.Thermometer.prototype.constructor = Eng.Thermometer;
  Eng.Thermometer.prototype.readTempC = function () {
    var v = this.readValue();
    var r = Eng.estimateReading(v, this.divisionC, {});
    // ENG-41 / PHY-R06：零下读数带负号
    var text = (r.value < 0 ? '-' : '') + Math.abs(r.value).toFixed(r.decimals) + ' ℃';
    return { value: r.value, text: text, belowZero: r.value < 0 };
  };
  Eng.Thermometer.prototype.readText = function () { return this.readTempC().text; };
  // 液柱顶端位置（归一化 0~1，供渲染与 ENG-47 一致性）
  Eng.Thermometer.prototype.liquidFraction = function (value) {
    return (value - this.rangeMinC) / (this.rangeMaxC - this.rangeMinC);
  };
  Eng.Thermometer.prototype.valueFromFraction = function (f) {
    return this.rangeMinC + f * (this.rangeMaxC - this.rangeMinC);
  };
  Eng.Thermometer.prototype.pointerAngleDeg = function () { return 0; };
  Eng.Thermometer.prototype.valueFromPointerDeg = function () { return this.readValue(); };
  Eng.Thermometer.prototype.pointerConsistencyDev = function () {
    var v = this.readValue();
    return Math.abs(this.valueFromFraction(this.liquidFraction(v)) - v) / this.divisionC;
  };

  /* ---------- 托盘天平（ENG-42） ---------- */
  Eng.Balance = function (opt) {
    opt = opt || {};
    Eng.Meter.call(this, {
      name: opt.name || 'balance', kind: 'balance', unit: 'g',
      division: 0.1, getValue: opt.getValue || function () { return 0; },
      dataSource: opt.dataSource, dataDock: opt.dataDock, guide: opt.guide,
      assumptions: opt.assumptions || ['天平已调平（横梁水平）', '砝码质量准确', '游码以左侧刻线为准（PHY-R07）'],
      approximations: opt.approximations || ['无'],
      errorEstimate: opt.errorEstimate || '读到 0.1 g，不估读（ENG-38 特例，与中考一致）'
    });
    this.noEstimate = true; // ENG-38 特例：0.1 g 不估读
    this.weightsG = (opt.weightsG || []).slice(); // 砝码组
    this.riderG = opt.riderG || 0; // 游码左侧刻线读数（g）
  };
  Eng.Balance.prototype = Object.create(Eng.Meter.prototype);
  Eng.Balance.prototype.constructor = Eng.Balance;
  Eng.Balance.prototype.setWeights = function (weightsG, riderG) {
    this.weightsG = weightsG.slice();
    this.riderG = riderG;
  };
  Eng.Balance.prototype.readMassG = function () {
    var sum = this.riderG;
    for (var i = 0; i < this.weightsG.length; i++) sum += this.weightsG[i];
    var r = Eng.estimateReading(sum, 0.1, { noEstimate: true }); // 不估读（ENG-42 🔴）
    return { value: r.value, text: r.text + ' g' };
  };
  Eng.Balance.prototype.readText = function () { return this.readMassG().text; };
  Eng.Balance.prototype.pointerAngleDeg = function () { return 0; };
  Eng.Balance.prototype.valueFromPointerDeg = function () { return this.readMassG().value; };
  Eng.Balance.prototype.pointerConsistencyDev = function () { return 0; };

  /* ---------- 机械停表（ENG-43） ---------- */
  Eng.Stopwatch = function (opt) {
    opt = opt || {};
    if (!opt.driver) throw new Error('Stopwatch: 必须传入 driver（读数由 simTime 驱动，ENG-43）');
    var driver = opt.driver;
    Eng.Meter.call(this, {
      name: opt.name || 'stopwatch', kind: 'stopwatch', unit: 's',
      division: 0.1,
      getValue: function () { return driver.simTimeSec(); },
      dataSource: opt.dataSource || { kind: '仿真读回', ref: 'driver.simTimeSec' },
      dataDock: opt.dataDock, guide: opt.guide,
      assumptions: opt.assumptions || ['计时起点与仿真起点同步'],
      approximations: opt.approximations || ['无'],
      errorEstimate: opt.errorEstimate || '读到 0.1 s，不估读（ENG-38 特例）'
    });
    this.noEstimate = true;
    this.driver = driver;
  };
  Eng.Stopwatch.prototype = Object.create(Eng.Meter.prototype);
  Eng.Stopwatch.prototype.constructor = Eng.Stopwatch;
  Eng.Stopwatch.prototype.readTimeSec = function () {
    var t = this.readValue();
    var v = Math.floor(t * 10 + 1e-9) / 10; // 读到 0.1 s，不估读
    return { value: v, text: v.toFixed(1) + ' s' };
  };
  Eng.Stopwatch.prototype.readText = function () { return this.readTimeSec().text; };
  Eng.Stopwatch.prototype.pointerAngleDeg = function () { return 0; };
  Eng.Stopwatch.prototype.valueFromPointerDeg = function () { return this.readTimeSec().value; };
  Eng.Stopwatch.prototype.pointerConsistencyDev = function () { return 0; };

  /* ---------- 量筒（ENG-44） ---------- */
  Eng.GraduatedCylinder = function (opt) {
    opt = opt || {};
    var divisionMl = opt.divisionMl !== undefined ? opt.divisionMl : 1;
    // 化学深审 🔴 教训写死：分度值不许取 0.1 mL
    if (divisionMl !== 1) throw new Error('GraduatedCylinder: 初中量筒分度值必须为 1 mL（ENG-44；0.1 mL 会导致估读到 0.01 mL，与中考冲突）');
    Eng.Meter.call(this, {
      name: opt.name || 'cylinder', kind: 'cylinder', unit: 'mL',
      division: 1, getValue: opt.getValue,
      dataSource: opt.dataSource, dataDock: opt.dataDock, guide: opt.guide,
      assumptions: opt.assumptions || ['视线与凹液面最低处保持水平（PHY-R04）', '量筒竖直放置'],
      approximations: opt.approximations || ['估读按 ENG-38 口径（分度值首位为 1 → 估读到下一位）'],
      errorEstimate: opt.errorEstimate || '估读位 ±1（0.1 mL）'
    });
    this.sight = 'level';
  };
  Eng.GraduatedCylinder.prototype = Object.create(Eng.Meter.prototype);
  Eng.GraduatedCylinder.prototype.constructor = Eng.GraduatedCylinder;
  Eng.GraduatedCylinder.prototype.readVolumeMl = function () {
    var r = Eng.estimateReading(this.readValue(), 1, {});
    return { value: r.value, text: r.text + ' mL' };
  };
  Eng.GraduatedCylinder.prototype.readText = function () { return this.readVolumeMl().text; };
  Eng.GraduatedCylinder.prototype.pointerAngleDeg = function () { return 0; };
  Eng.GraduatedCylinder.prototype.valueFromPointerDeg = function () { return this.readVolumeMl().value; };
  Eng.GraduatedCylinder.prototype.pointerConsistencyDev = function () { return 0; };

  /* ---------- 酸式滴定管（ENG-45） ---------- */
  Eng.Burette = function (opt) {
    opt = opt || {};
    Eng.Meter.call(this, {
      name: opt.name || 'burette', kind: 'burette', unit: 'mL',
      division: 0.1, getValue: opt.getValue,
      dataSource: opt.dataSource, dataDock: opt.dataDock, guide: opt.guide,
      assumptions: opt.assumptions || ['视线与凹液面最低处保持水平', '滴定管竖直、已排气泡'],
      approximations: opt.approximations || ['估读按 ENG-38 口径（分度值 0.1，首位为 1 → 估读到 0.01）'],
      errorEstimate: opt.errorEstimate || '估读位 ±1（0.01 mL）'
    });
  };
  Eng.Burette.prototype = Object.create(Eng.Meter.prototype);
  Eng.Burette.prototype.constructor = Eng.Burette;
  Eng.Burette.prototype.readVolumeMl = function () {
    var r = Eng.estimateReading(this.readValue(), 0.1, {});
    return { value: r.value, text: r.text + ' mL' };
  };
  Eng.Burette.prototype.readText = function () { return this.readVolumeMl().text; };
  Eng.Burette.prototype.pointerAngleDeg = function () { return 0; };
  Eng.Burette.prototype.valueFromPointerDeg = function () { return this.readVolumeMl().value; };
  Eng.Burette.prototype.pointerConsistencyDev = function () { return 0; };

  /* ---------- Konva 统一渲染（仪表可视化） ----------
   * 渲染只消费状态（ENG 总则 1）：render(view) 读取 readValue() 后绘制。
   * 深色主题配色走 view.palette（对比度见 ENG-48）。
   */
  Eng.renderDialMeter = function (view, meter, cxPx, cyPx, radiusPx) {
    var layer = view.layer;
    var pal = view.palette;
    var g = new Konva.Group({ x: cxPx, y: cyPx });
    // 表盘底：覆盖 pointerAngleDeg(rangeMin)→pointerAngleDeg(rangeMax) 的扫掠区间
    var a0 = meter.pointerAngleDeg(meter.rangeMin);
    var arcRot = meter.dialSweepDeg >= 0 ? a0 : a0 + meter.dialSweepDeg;
    g.add(new Konva.Arc({
      x: 0, y: 0, innerRadius: radiusPx * 0.82, outerRadius: radiusPx,
      angle: Math.abs(meter.dialSweepDeg), rotation: arcRot,
      fill: pal.dialBg, stroke: pal.dialStroke, strokeWidth: 2
    }));
    // 刻度：每 1 个分度一根主刻度（ENG-46 均匀性：线性映射保证）
    var nDiv = Math.round((meter.rangeMax - meter.rangeMin) / meter.division);
    for (var i = 0; i <= nDiv; i++) {
      var v = meter.rangeMin + i * meter.division;
      var a = (meter.pointerAngleDeg(v) * Math.PI) / 180;
      var major = i % 5 === 0;
      var r1 = radiusPx * (major ? 0.68 : 0.74), r2 = radiusPx * 0.82;
      g.add(new Konva.Line({
        points: [r1 * Math.cos(a), r1 * Math.sin(a), r2 * Math.cos(a), r2 * Math.sin(a)],
        stroke: pal.tick, strokeWidth: major ? 2.5 : 1.2
      }));
      if (major) {
        var tr = radiusPx * 0.52;
        var label = Eng.Meter._trimNum(v);
        g.add(Eng.konvaText({
          x: tr * Math.cos(a) - 14, y: tr * Math.sin(a) - 8,
          width: 28, align: 'center', text: label,
          fontSize: Math.max(11, radiusPx * 0.11), fill: pal.text
        }));
      }
    }
    // 指针（当前读数驱动）
    var va = (meter.pointerAngleDeg(meter.readValue()) * Math.PI) / 180;
    g.add(new Konva.Line({
      points: [0, 0, radiusPx * 0.78 * Math.cos(va), radiusPx * 0.78 * Math.sin(va)],
      stroke: pal.needle, strokeWidth: 3, lineCap: 'round'
    }));
    g.add(new Konva.Circle({ x: 0, y: 0, radius: radiusPx * 0.07, fill: pal.needle }));
    // 接线柱标注（ENG-39/40：须与量程一致）。表盘扫掠区在中心上方，
    // 下半区空闲：读数在 +0.28r，接线柱标注放在 +0.62r（不许被舞台裁掉）。
    if (meter.terminalLabel) {
      g.add(Eng.konvaText({
        x: -radiusPx, y: radiusPx * 0.58, width: radiusPx * 2, align: 'center',
        text: '接线柱 ' + meter.terminalLabel, fontSize: Math.max(11, radiusPx * 0.1), fill: pal.text
      }));
    }
    // 数字读数
    g.add(Eng.konvaText({
      x: -radiusPx, y: radiusPx * 0.28, width: radiusPx * 2, align: 'center',
      text: meter.readText(), fontSize: Math.max(13, radiusPx * 0.14),
      fill: pal.readout, fontStyle: 'bold'
    }));
    layer.add(g);
    return g;
  };
  Eng.Meter._trimNum = function (v) {
    return String(Math.round(v * 1e9) / 1e9);
  };
})();
