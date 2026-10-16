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

  Eng.PALETTES = {
    light: {
      bg: '#ffffff', text: '#1a1a1a', subtext: '#555555',
      dialBg: '#f4f4f4', dialStroke: '#333333', tick: '#222222',
      needle: '#c0392b', readout: '#0b5cad',
      guide: '#0b5cad', guideBg: '#eaf3fd', error: '#c0392b'
    },
    dark: {
      bg: '#121212', text: '#f5f5f5', subtext: '#bdbdbd',
      dialBg: '#1e1e1e', dialStroke: '#e0e0e0', tick: '#f0f0f0',
      needle: '#ff6b5e', readout: '#7ec8ff',
      guide: '#9fd6ff', guideBg: '#0d2b45', error: '#ff8a7a'
    }
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
    label.add(new Konva.Text({
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
    var t = new Konva.Text({
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
