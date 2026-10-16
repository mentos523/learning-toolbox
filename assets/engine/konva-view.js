/* 基础引擎层 · konva-view.js
 * Konva 渲染基座：Stage/Layer、DPR、三视口 390/820/1366 缩放适配、深色模式。
 * 与作图层（plot.js）共用 Eng.ViewportMapper（ENG-05 同源换算）。
 * 图形 = render(数据集) 纯函数模式（ENG-64）；数据源声明（ENG-65）。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.ViewportMapper) throw new Error('konva-view.js 需要 core.js/coords.js');
  if (!window.Konva) throw new Error('konva-view.js 需要先加载 assets/vendor/konva.min.js');

  /* V-03（白队 2026-10-16）：色板从 --phy-* 语义令牌读取（与课页层
   * cssVar("--phy-*") 同路），带回退。
   * 解析 physics.css 的两条规则——`#physics-app`（浅）与
   * `body[data-theme="dark"] #physics-app`（深），与当前 DOM 主题无关，
   * 故 KonvaView 构造时传入 theme 即能拿到对应主题色；
   * 样式表不可读时（独立验证页等）回退为令牌字面值（ENG-48 断言仍过）。
   * 映射逐项核对：readout/guide→--phy-known；needle/error→--phy-target；
   * subtext→--phy-ink-soft；dialBg→--phy-panel；dialStroke/tick→--phy-body；
   * bg→--phy-bg；text→--phy-ink；guideBg 无令牌对应，保留原值。 */
  var PALETTE_TOKEN_KEYS = {
    bg: '--phy-bg', text: '--phy-ink', subtext: '--phy-ink-soft',
    dialBg: '--phy-panel', dialStroke: '--phy-body', tick: '--phy-body',
    needle: '--phy-target', readout: '--phy-known',
    guide: '--phy-known', guideBg: null, error: '--phy-target'
  };
  var PALETTE_FALLBACK = {
    light: { bg: '#FFFFFF', text: '#1A1A1A', subtext: '#7A7A7A',
      dialBg: '#F7F7F7', dialStroke: '#000000', tick: '#000000',
      needle: '#D55E00', readout: '#0072B2',
      guide: '#0072B2', guideBg: '#eaf3fd', error: '#D55E00' },
    dark: { bg: '#121212', text: '#F5F5F5', subtext: '#9E9E9E',
      dialBg: '#1E1E1E', dialStroke: '#F5F5F5', tick: '#F5F5F5',
      needle: '#FF7043', readout: '#56B4E9',
      guide: '#56B4E9', guideBg: '#0d2b45', error: '#FF7043' }
  };
  var _palCache = null;
  function _readTokenRules() {
    // 返回 {light: {token: value}, dark: {...}}；读不到则空对象
    var out = { light: {}, dark: {} };
    var sheets = [];
    try { sheets = document.styleSheets ? Array.prototype.slice.call(document.styleSheets) : []; }
    catch (e) { return out; }
    sheets.forEach(function (sh) {
      var rules = null;
      try { rules = sh.cssRules ? Array.prototype.slice.call(sh.cssRules) : null; }
      catch (e) { return; } // 跨域样式表不可读，跳过
      if (!rules) return;
      rules.forEach(function (r) {
        try {
          var sel = r.selectorText || '';
          if (sel.indexOf('#physics-app') < 0 || !r.style) return;
          var isDark = sel.indexOf('dark') >= 0;
          var bucket = out[isDark ? 'dark' : 'light'];
          for (var i = 0; i < r.style.length; i++) {
            var pn = r.style[i];
            if (pn && pn.indexOf('--') === 0 && !(pn in bucket)) {
              var vv = r.style.getPropertyValue(pn);
              if (vv) bucket[pn] = String(vv).trim();
            }
          }
        } catch (e) {}
      });
    });
    return out;
  }
  function _resolveVar(bucket, value, depth) {
    // 解析一层 var(--x) 链（--phy-bg: var(--geo-bg) 情形）
    var s = String(value || ''), d = depth || 0;
    if (d > 4) return s;
    return s.replace(/var\(\s*(--[\w-]+)\s*\)/g, function (m, name) {
      var inner = bucket[name];
      return inner != null ? _resolveVar(bucket, inner, d + 1) : m;
    });
  }
  function _buildPalettes() {
    if (_palCache) return _palCache;
    var buckets = _readTokenRules();
    var pals = { light: {}, dark: {} };
    ['light', 'dark'].forEach(function (theme) {
      var bucket = buckets[theme] || {}, fb = PALETTE_FALLBACK[theme];
      Object.keys(PALETTE_TOKEN_KEYS).forEach(function (key) {
        var token = PALETTE_TOKEN_KEYS[key];
        var v = null;
        if (token && bucket[token]) {
          v = _resolveVar(bucket, bucket[token]).trim();
          if (/var\(/.test(v)) v = null; // 未解析干净则回退
        }
        pals[theme][key] = v || fb[key];
      });
    });
    _palCache = pals;
    return pals;
  }
  Eng.PALETTES = {};
  ['light', 'dark'].forEach(function (theme) {
    Object.defineProperty(Eng.PALETTES, theme, {
      enumerable: true, configurable: true,
      get: function () { return _buildPalettes()[theme]; }
    });
  });
  // 主题令牌源（测试/复验用：强制重读样式表）
  Eng.refreshPalettes = function () { _palCache = null; return _buildPalettes(); };

  // V-02（白队 2026-10-16）：Konva 文字统一走设计字体栈。
  // 调用方一律用 Eng.konvaText(cfg) 代替 new Konva.Text(cfg)；
  // cfg.fontFamily 显式传入时以传入值为准（允许特例覆盖）。
  Eng.konvaText = function (cfg) {
    cfg = cfg || {};
    if (cfg.fontFamily == null) cfg.fontFamily = Eng.FONT_STACK;
    return new Konva.Text(cfg);
  };

  Eng.KonvaView = function (opt) {
    opt = opt || {};
    if (!opt.containerId) throw new Error('KonvaView: 必须传入 containerId');
    this.containerId = opt.containerId;
    this.theme = opt.theme === 'dark' ? 'dark' : 'light';
    this.palette = Eng.PALETTES[this.theme];
    var vw = opt.viewportWPx || 390;
    var vh = opt.viewportHPx || Math.round((vw * 10) / 16); // ENG-04：H 按 16:10 取整
    this.mapper = new Eng.ViewportMapper({
      bounds: opt.bounds || { xMin: 0, xMax: 10, yMin: 0, yMax: 10 },
      viewport: { w: vw, h: vh }
    });
    var container = document.getElementById(opt.containerId);
    if (!container) throw new Error('KonvaView: 找不到容器 #' + opt.containerId);
    container.style.width = vw + 'px';
    container.style.height = vh + 'px';
    this.stage = new Konva.Stage({
      container: opt.containerId, width: vw, height: vh
    });
    // DPR：高分屏清晰度。Konva Stage 的 pixelRatio 为配置属性，默认即取
    // window.devicePixelRatio；此处显式声明以文档化（file:// 与 http 一致）。
    if (typeof window.devicePixelRatio === 'number' && window.devicePixelRatio > 0) {
      this.stage.setAttr('pixelRatio', window.devicePixelRatio);
    }
    this.layer = new Konva.Layer();
    this.stage.add(this.layer);
    this._bg = new Konva.Rect({ x: 0, y: 0, width: vw, height: vh, fill: this.palette.bg, listening: false });
    this.layer.add(this._bg);
    var ax = Eng.checkAx01(opt, 'KonvaView');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };

  Eng.KonvaView.prototype.logicalToPixel = function (x, y) {
    return this.mapper.logicalToPixel(x, y);
  };
  Eng.KonvaView.prototype.pixelToLogical = function (px, py) {
    return this.mapper.pixelToLogical(px, py);
  };

  // ENG-04：切换三视口之一（390/820/1366），逻辑读回必须逐位一致
  Eng.KonvaView.prototype.setViewportW = function (w) {
    var h = Math.round((w * 10) / 16);
    this.mapper.resize(w, h);
    this.stage.width(w);
    this.stage.height(h);
    this._bg.width(w);
    this._bg.height(h);
    var c = document.getElementById(this.containerId);
    c.style.width = w + 'px';
    c.style.height = h + 'px';
  };

  Eng.KonvaView.prototype.setTheme = function (theme) {
    this.theme = theme === 'dark' ? 'dark' : 'light';
    this.palette = Eng.PALETTES[this.theme];
    this._bg.fill(this.palette.bg);
    this.layer.draw();
  };

  // ENG-64：图由数据驱动 —— renderFn(dataset, view) 纯函数重绘
  Eng.KonvaView.prototype.renderDataset = function (dataset, renderFn, dataSource) {
    if (!dataSource || !dataSource.kind || !dataSource.ref) {
      throw new Error('renderDataset: 必须声明 dataSource{kind, ref}（ENG-65）');
    }
    this._lastDataset = Eng.deepCopy(dataset);
    this._lastDataSource = Eng.deepCopy(dataSource);
    this._lastRenderFn = renderFn;
    this.clearDynamic();
    renderFn(dataset, this);
    this.layer.draw();
  };
  Eng.KonvaView.prototype.clearDynamic = function () {
    var children = this.layer.children.slice();
    for (var i = 0; i < children.length; i++) {
      if (children[i] !== this._bg && children[i] !== this._guideLayer) children[i].destroy();
    }
  };
  Eng.KonvaView.prototype.redraw = function () {
    if (this._lastRenderFn) {
      this.clearDynamic();
      this._lastRenderFn(this._lastDataset, this);
      this.layer.draw();
    }
  };
  Eng.KonvaView.prototype.dataSource = function () {
    return Eng.deepCopy(this._lastDataSource || null);
  };

  // YP-01/02：引导层（动词开头、步骤嵌入；可覆盖、不可清空 YP-06）
  Eng.KonvaView.prototype.showGuide = function (text) {
    if (this._guideLayer) this._guideLayer.destroy();
    var pal = this.palette;
    var w = this.stage.width();
    var useText = typeof text === 'string' && text.trim().length > 0 ? text : '看：先读引导，再动手试。';
    var label = new Konva.Label({ x: 8, y: 8, listening: false });
    label.add(new Konva.Tag({ fill: pal.guideBg, stroke: pal.guide, strokeWidth: 1, cornerRadius: 6 }));
    label.add(Eng.konvaText({
      text: useText, fontSize: 14, fill: pal.guide, padding: 8, width: w - 16
    }));
    this._guideLayer = new Konva.Layer();
    this._guideLayer.add(label);
    this.stage.add(this._guideLayer);
    this._guideLayer.draw();
    return useText;
  };
  Eng.KonvaView.prototype.hideGuide = function () {
    if (this._guideLayer) { this._guideLayer.destroy(); this._guideLayer = null; }
  };

  // YP-03：空态占位引导（不许空白画布）
  Eng.KonvaView.prototype.showEmpty = function (hintText) {
    var pal = this.palette;
    var w = this.stage.width(), h = this.stage.height();
    var t = Eng.konvaText({
      x: 0, y: h / 2 - 20, width: w, align: 'center',
      text: hintText || '这里还没有数据：先按上面的引导动手做一步。',
      fontSize: 14, fill: pal.subtext, listening: false
    });
    this._emptyNode = t;
    this.layer.add(t);
    this.layer.draw();
  };
  Eng.KonvaView.prototype.hideEmpty = function () {
    if (this._emptyNode) { this._emptyNode.destroy(); this._emptyNode = null; }
  };

  Eng.KonvaView.prototype.draw = function () { this.layer.draw(); };
})();
