/* 基础引擎层 · core.js
 * 全局命名空间 window.Eng（经典 <script>，零构建，file:// 可跑）。
 * 内容：版本、深拷贝、播种随机数、AX01 三字段校验、DataDock、误差预算公式、对比度工具。
 * 口径：ENG-10（防御性拷贝）、ENG-11（教学随机走可播种 RNG）、ENG-13/14（误差预算）、YP-25（AX01 字段）。
 */
(function () {
  'use strict';

  var Eng = (window.Eng = window.Eng || {});
  Eng.VERSION = '2026.10.16.1'; // 目标升版 2026.10.16.1

  /* V-02（白队 2026-10-16）：画布文字统一字体栈。
   * 与 assets/css/style.css 的 body 字体栈逐字一致；Konva.Text / JSXGraph
   * 文字一律经此常量设置，不再各自默认（Arial）或继承 body 误伤。 */
  Eng.FONT_STACK = '-apple-system, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "Noto Sans SC", sans-serif';

  /* P-05（2026-10-16）：2D canvas 文字字体走设计令牌。
   * 口径：优先从 body 计算样式解析 font-family（设计令牌的运行时真相，
   * 物理/化学/数学/英语四科 body 均已声明设计栈）；读不到时回退
   * Eng.FONT_STACK（与设计栈同值的单源常量）。调用方一律用
   * Eng.canvasFont(px) 代替 "Npx sans-serif" 等字面量——新画布不许
   * 硬编码字体（见 docs/white-team-lessons.md 第十一节第 5 条）。 */
  Eng.canvasFont = function (px) {
    var stack = null;
    try {
      if (window.getComputedStyle && document.body) {
        var ff = window.getComputedStyle(document.body).fontFamily;
        if (ff && ff.replace(/["'\s]/g, "").length > 0) stack = ff;
      }
    } catch (e) { stack = null; }
    if (!stack) stack = Eng.FONT_STACK;
    return Math.round(px) + 'px ' + stack;
  };

  /* ---------- 基础工具 ---------- */

  Eng.isFiniteNumber = function (v) {
    return typeof v === 'number' && isFinite(v);
  };

  Eng.clamp = function (v, lo, hi) {
    return Math.min(hi, Math.max(lo, v));
  };

  // ENG-10：防御性深拷贝。只处理 JSON 型数据（number/string/boolean/null/数组/纯对象），
  // 快照里不许出现函数、DOM、Planck 内部引用。
  Eng.deepCopy = function (v) {
    if (v === null || v === undefined) return v;
    if (typeof v === 'number' || typeof v === 'string' || typeof v === 'boolean') return v;
    if (Array.isArray(v)) {
      var a = new Array(v.length);
      for (var i = 0; i < v.length; i++) a[i] = Eng.deepCopy(v[i]);
      return a;
    }
    if (typeof v === 'object') {
      var o = {};
      for (var k in v) {
        if (Object.prototype.hasOwnProperty.call(v, k)) o[k] = Eng.deepCopy(v[k]);
      }
      return o;
    }
    throw new Error('Eng.deepCopy: 快照中不允许出现 ' + typeof v + ' 类型（ENG-10 防御性拷贝）');
  };

  // 逐位一致比较（ENG-09）：数值用 Object.is，结构递归。
  Eng.bitwiseEqual = function (a, b) {
    if (Object.is(a, b)) return true;
    if (typeof a !== typeof b) return false;
    if (a === null || b === null) return a === b;
    if (typeof a !== 'object') return false;
    var ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (var i = 0; i < ka.length; i++) {
      var k = ka[i];
      if (!Object.prototype.hasOwnProperty.call(b, k)) return false;
      if (!Eng.bitwiseEqual(a[k], b[k])) return false;
    }
    return true;
  };

  Eng.fmt = function (x, d) {
    return Number(x).toFixed(d === undefined ? 6 : d);
  };

  /* ---------- 可播种 RNG（ENG-11：教学随机必须可播种，seed 可读回） ---------- */
  // mulberry32，确定性强；物理路径不许用 Math.random()/Date.now()。
  Eng.SeededRNG = function (seed) {
    this.seed = (seed === undefined ? 1 : seed) >>> 0;
    this._s = this.seed;
  };
  Eng.SeededRNG.prototype.next = function () {
    var s = (this._s + 0x6d2b79f5) >>> 0;
    this._s = s;
    var t = s;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
  Eng.SeededRNG.prototype.reset = function () {
    this._s = this.seed;
  };

  /* ---------- AX01 三字段校验（YP-25 / ENG-15） ----------
   * 每个原语构造参数必须自带 assumptions / approximations / errorEstimate，
   * 缺任一字段即抛错（不许静默）。
   */
  Eng.checkAx01 = function (opt, primitiveName) {
    var missing = [];
    if (!opt || !Array.isArray(opt.assumptions) || opt.assumptions.length === 0) missing.push('assumptions');
    if (!opt || !Array.isArray(opt.approximations) || opt.approximations.length === 0) missing.push('approximations');
    if (!opt || typeof opt.errorEstimate !== 'string' || opt.errorEstimate.length === 0) missing.push('errorEstimate');
    if (missing.length) {
      throw new Error(
        'Eng[' + primitiveName + ']: 缺少 AX01 显性化字段: ' + missing.join(', ') +
        '（YP-25：assumptions / approximations / errorEstimate 缺一不可）'
      );
    }
    return {
      assumptions: Eng.deepCopy(opt.assumptions),
      approximations: Eng.deepCopy(opt.approximations),
      errorEstimate: opt.errorEstimate
    };
  };

  /* ---------- 积分误差预算（ENG-13 / ENG-14） ----------
   * 半隐式欧拉匀加速闭式：相对误差恒为 1/N（N = 步数）。
   * 容差三项和：解析容差 + 1/N + 0.05% 浮点余量。
   */
  Eng.eulerRelErr1overN = function (stepCountN) {
    return 1 / stepCountN;
  };
  Eng.tolerance3 = function (analyticTol, stepCountN) {
    return analyticTol + 1 / stepCountN + 0.0005;
  };
  // dt ↔ N 对应表（ENG-14 实现文档必须附；ENGINE.md 引用本表）
  Eng.DT_BUDGET_TABLE = [
    { dt: 1 / 240, timeSec: 1, stepsN: 240, budget1overN: 0.0042 },
    { dt: 1 / 240, timeSec: 2, stepsN: 480, budget1overN: 0.0021 },
    { dt: 1 / 120, timeSec: 2, stepsN: 240, budget1overN: 0.0042 },
    { dt: 1 / 60, timeSec: 1, stepsN: 60, budget1overN: 0.0167 }
  ];

  /* ---------- 数据坞（YP-17：记录数据 → 数据驱动图表） ---------- */
  Eng.DataDock = function () {
    this._entries = [];
  };
  Eng.DataDock.prototype.record = function (label, value, unit) {
    if (typeof label !== 'string' || label.length === 0) throw new Error('DataDock.record: label 必须为非空字符串');
    if (!Eng.isFiniteNumber(value)) throw new Error('DataDock.record: value 必须为有限数值');
    this._entries.push({ label: label, value: value, unit: unit || '', at: this._entries.length });
    return this._entries.length;
  };
  Eng.DataDock.prototype.entries = function () {
    return Eng.deepCopy(this._entries);
  };
  Eng.DataDock.prototype.clear = function () {
    this._entries = [];
  };
  Eng.DataDock.prototype.toCSV = function () {
    var lines = ['label,value,unit'];
    for (var i = 0; i < this._entries.length; i++) {
      var e = this._entries[i];
      lines.push('"' + e.label.replace(/"/g, '""') + '",' + e.value + ',' + e.unit);
    }
    return lines.join('\n');
  };

  /* ---------- 对比度（ENG-48 / YP-10 深色可读） ---------- */
  function lum(hex) {
    var c = hex.replace('#', '');
    if (c.length === 3) c = c[0] + c[0] + c[1] + c[1] + c[2] + c[2];
    var r = parseInt(c.slice(0, 2), 16) / 255,
      g = parseInt(c.slice(2, 4), 16) / 255,
      b = parseInt(c.slice(4, 6), 16) / 255;
    function ch(x) { return x <= 0.03928 ? x / 12.92 : Math.pow((x + 0.055) / 1.055, 2.4); }
    return 0.2126 * ch(r) + 0.7152 * ch(g) + 0.0722 * ch(b);
  }
  Eng.contrastRatio = function (hexA, hexB) {
    var l1 = lum(hexA), l2 = lum(hexB);
    if (l1 < l2) { var t = l1; l1 = l2; l2 = t; }
    return (l1 + 0.05) / (l2 + 0.05);
  };

  /* ---------- reduced-motion（YP-09 / ENG-48） ---------- */
  Eng.prefersReducedMotion = function () {
    return (
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    );
  };

  /* ---------- 原语接口约定（文档用，见 docs/ENGINE.md §架构） ----------
   * 力学/理想模型原语统一实现以下方法（鸭子类型）：
   *   step(stepCountN) / reset() / snapshot() / restore(snap) /
   *   simTimeSec() / stepCountN() / state()
   * snapshot()/state() 必须返回深拷贝（ENG-10）。
   */
  Eng.PRIMITIVE_IFACE = ['step', 'reset', 'snapshot', 'restore', 'simTimeSec', 'stepCountN', 'state'];
})();
