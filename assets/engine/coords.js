/* 基础引擎层 · coords.js
 * 统一坐标系（ENG-01 ~ ENG-05）。
 * 逻辑坐标：x 向右、y 向上（与 Planck 原生一致）；像素坐标 y 向下（Konva/Canvas 约定）。
 * 翻转只发生在映射层。Konva 渲染层与 JSXGraph 作图层共用同一换算（ENG-05 同源）。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng) throw new Error('coords.js 必须在 core.js 之后加载');

  /* 视口映射器
   * opt: { bounds:{xMin,xMax,yMin,yMax}（逻辑单位；力学场景 1 逻辑单位 = 1 m）,
   *        viewport:{w,h}（像素） }
   * 换算（ENG-02）：
   *   s = min(W/(xMax-xMin), H/(yMax-yMin))            （等比，px/逻辑单位）
   *   逻辑→像素：Px = ox + s*x,  Py = oy - s*y
   *   像素→逻辑：x = (Px-ox)/s,  y = (oy-Py)/s
   * 中心对齐：场景逻辑中心对准视口中心。
   */
  Eng.ViewportMapper = function (opt) {
    opt = opt || {};
    var b = opt.bounds || { xMin: 0, xMax: 10, yMin: 0, yMax: 10 };
    var v = opt.viewport || { w: 390, h: 244 };
    this.bounds = { xMin: b.xMin, xMax: b.xMax, yMin: b.yMin, yMax: b.yMax };
    this.viewport = { w: v.w, h: v.h };
    this._recalc();
  };

  Eng.ViewportMapper.prototype._recalc = function () {
    var b = this.bounds, v = this.viewport;
    var xr = b.xMax - b.xMin, yr = b.yMax - b.yMin;
    if (!(xr > 0 && yr > 0)) throw new Error('ViewportMapper: bounds 范围必须为正');
    this.scale = Math.min(v.w / xr, v.h / yr); // s（ENG-02，等比：sx = sy）
    // 逻辑中心 (cx,cy) → 像素中心 (w/2, h/2)：
    //   w/2 = ox + s*cx  => ox = w/2 - s*cx
    //   h/2 = oy - s*cy  => oy = h/2 + s*cy
    var cx = (b.xMin + b.xMax) / 2, cy = (b.yMin + b.yMax) / 2;
    this.ox = v.w / 2 - this.scale * cx;
    this.oy = v.h / 2 + this.scale * cy;
  };

  Eng.ViewportMapper.prototype.resize = function (w, h) {
    this.viewport = { w: w, h: h };
    this._recalc();
  };

  Eng.ViewportMapper.prototype.logicalToPixel = function (x, y) {
    return { x: this.ox + this.scale * x, y: this.oy - this.scale * y };
  };

  Eng.ViewportMapper.prototype.pixelToLogical = function (px, py) {
    return { x: (px - this.ox) / this.scale, y: (this.oy - py) / this.scale };
  };

  // 读回（ENG-02）：scale（px/逻辑单位）、offset（px）
  Eng.ViewportMapper.prototype.params = function () {
    return Eng.deepCopy({ scale: this.scale, offset: { x: this.ox, y: this.oy } });
  };

  // ENG-03 往返可逆性自检：返回两向最大偏差
  Eng.ViewportMapper.prototype.roundtripCheck = function () {
    var b = this.bounds;
    var pts = [
      { x: b.xMin, y: b.yMin }, { x: b.xMax, y: b.yMin },
      { x: b.xMin, y: b.yMax }, { x: b.xMax, y: b.yMax },
      { x: (b.xMin + b.xMax) / 2, y: (b.yMin + b.yMax) / 2 }
    ];
    var maxPx = 0, maxLog = 0;
    for (var i = 0; i < pts.length; i++) {
      var p = pts[i];
      var q = this.logicalToPixel(p.x, p.y);
      var r = this.pixelToLogical(q.x, q.y);
      var q2 = this.logicalToPixel(r.x, r.y);
      maxPx = Math.max(maxPx, Math.hypot(q2.x - q.x, q2.y - q.y));
      maxLog = Math.max(maxLog, Math.hypot(r.x - p.x, r.y - p.y));
    }
    return { maxPixelDevPx: maxPx, maxLogicalDev: maxLog };
  };

  // ENG-04 三视口：同一逻辑点在不同视口下的像素期望（用各自 s,o 代入 ENG-02 公式）
  Eng.ViewportMapper.viewportSet = function (bounds) {
    // H 按 16:10 取整（ENG-04）
    return [390, 820, 1366].map(function (w) {
      return new Eng.ViewportMapper({ bounds: bounds, viewport: { w: w, h: Math.round((w * 10) / 16) } });
    });
  };
})();
