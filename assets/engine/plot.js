/* 基础引擎层 · plot.js
 * 作图原语（ENG-49 ~ ENG-54）：JSXGraph 封装。
 *  - 函数图像 / 几何构造 / 滑杆绑定 / 坐标读回（1e-9）
 *  - glider 按最近点投影语义断言（ENG-53，原型坑 4），不是自由拖拽
 *  - 与 Konva 层共用 Eng.ViewportMapper，同源换算（ENG-05）
 * 作图数据驱动：DataChart（ENG-64/65/66）也在此文件。
 */
(function () {
  'use strict';
  var Eng = window.Eng;
  if (!Eng || !Eng.ViewportMapper) throw new Error('plot.js 需要 core.js/coords.js');
  if (!window.JXG) throw new Error('plot.js 需要先加载 assets/vendor/jsxgraphcore.js');

  /* V-02（白队 2026-10-16）：JSXGraph 文字统一走设计字体栈。
   * JXG.Options.text.cssDefaultStyle 是内联样式（覆盖 jsxgraph.css），
   * 只替换其中的 font-family，其余声明保留。 */
  (function () {
    try {
      var t = JXG.Options && JXG.Options.text;
      if (t && typeof t.cssDefaultStyle === 'string' &&
          t.cssDefaultStyle.indexOf('PingFang SC') < 0) {
        t.cssDefaultStyle = 'font-family: ' + Eng.FONT_STACK + '; ' +
          t.cssDefaultStyle.replace(/font-family\s*:[^;]+;?/i, '');
      }
    } catch (e) {}
  })();

  // V-04：作图板主题色（与 --phy-* 语义令牌对齐；板背景另由模块 CSS
  // 覆盖 vendor jsxgraph.css 的 .jxgbox #fff 写死，见 physics.css V-04）
  var PLOT_THEME = {
    light: { axis: '#333333', tick: '#333333' },
    dark: { axis: '#E8E8E8', tick: '#E8E8E8' }
  };

  Eng.PlotBoard = function (opt) {
    opt = opt || {};
    if (!opt.containerId) throw new Error('PlotBoard: 必须传入 containerId');
    this.containerId = opt.containerId;
    var b = opt.bounds || { xMin: -5, xMax: 5, yMin: -5, yMax: 5 };
    this.bounds = { xMin: b.xMin, xMax: b.xMax, yMin: b.yMin, yMax: b.yMax };
    this.theme = opt.theme === 'dark' ? 'dark' : 'light';
    // V-05：函数图像场景取数据范围（允许 x/y 不等比，旧 graph-reader 即如此）；
    // ENG-05 等比换算保留给读回/几何场景（默认 fitData=false 时行为不变）。
    this.fitData = opt.fitData === true;
    var vw = opt.viewportWPx || 520;
    var vh = opt.viewportHPx || Math.round(vw * 0.75);
    // ENG-05：作图层换算与渲染层同源（同一 ViewportMapper 类）
    this.mapper = new Eng.ViewportMapper({ bounds: this.bounds, viewport: { w: vw, h: vh } });
    var el = document.getElementById(opt.containerId);
    if (!el) throw new Error('PlotBoard: 找不到容器 #' + opt.containerId);
    el.style.width = vw + 'px';
    el.style.height = vh + 'px';
    var bbox;
    if (this.fitData) {
      // V-05：板范围 = 数据范围（x/y 可不等比），不再做等比 letterbox 反推。
      bbox = [this.bounds.xMin, this.bounds.yMax, this.bounds.xMax, this.bounds.yMin];
    } else {
      // ENG-05 同源换算：JSXGraph 内部按 boundingbox 独立拉伸 x/y（unitX≠unitY 会变形），
      // 与"等比 sx=sy"的场景要求冲突。此处按 mapper 的等比参数反推"有效逻辑视口"，
      // 再喂给 JSXGraph，使其内部换算与 mapper 逐位一致（unitX = unitY = s）。
      var prm = this.mapper.params();
      var xL = (0 - prm.offset.x) / prm.scale;
      var xR = (vw - prm.offset.x) / prm.scale;
      var yTop = (prm.offset.y - 0) / prm.scale;
      var yBottom = (prm.offset.y - vh) / prm.scale;
      bbox = [xL, yTop, xR, yBottom]; // [左, 上, 右, 下]
    }
    // V-04：轴线/刻度颜色随主题（JXG.Options 为全局，按本次构造的主题设置）
    var tc = PLOT_THEME[this.theme];
    try {
      if (JXG.Options.axis) {
        JXG.Options.axis.strokeColor = tc.axis;
        if (JXG.Options.axis.ticks) JXG.Options.axis.ticks.strokeColor = tc.tick;
      }
    } catch (e) {}
    this.board = JXG.JSXGraph.initBoard(opt.containerId, {
      boundingbox: bbox, // [左, 上, 右, 下]
      axis: opt.axis !== false,
      showCopyright: false,
      showNavigation: false,
      keepaspectratio: false
    });
    this._curves = [];
    var ax = Eng.checkAx01(opt, 'PlotBoard');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };

  // V-04：主题切换（与 KonvaView.setTheme 同路，由课页层 MutationObserver 驱动）
  Eng.PlotBoard.prototype.setTheme = function (theme) {
    this.theme = theme === 'dark' ? 'dark' : 'light';
    var tc = PLOT_THEME[this.theme];
    try {
      var axes = this.board && this.board.defaultAxes;
      if (axes) {
        ['x', 'y'].forEach(function (k) {
          var a = axes[k];
          if (!a) return;
          if (a.setAttribute) a.setAttribute({ strokeColor: tc.axis });
          var ticks = a.defaultTicks || a.ticks;
          if (ticks && ticks.setAttribute) ticks.setAttribute({ strokeColor: tc.tick });
        });
        if (this.board.update) this.board.update();
      }
    } catch (e) {}
  };

  // ENG-05 断言用：JSXGraph 内部换算 vs 同源 mapper，同一逻辑点偏差 ≤0.5px。
  // 注意：fitData=true 时板内 x/y 不等比，此断言不适用（函数图像场景）。
  Eng.PlotBoard.prototype.jsxPixelOf = function (x, y) {
    // 经由真实 point 的屏幕坐标（JSXGraph 内部换算结果）
    var p = this.board.create('point', [x, y], { visible: false, fixed: true });
    var s = { x: p.coords.scrCoords[1], y: p.coords.scrCoords[2] };
    this.board.removeObject(p);
    return s;
  };
  Eng.PlotBoard.prototype.mapperPixelOf = function (x, y) {
    return this.mapper.logicalToPixel(x, y);
  };

  /* ---------- ENG-49 函数图像 ---------- */
  Eng.PlotBoard.prototype.functionGraph = function (opt) {
    if (typeof opt.fn !== 'function') throw new Error('functionGraph: fn 必须为函数');
    var curve = this.board.create('functiongraph', [opt.fn, opt.domain[0], opt.domain[1]], {
      name: opt.name || '', strokeWidth: 2.5
    });
    var rec = { curve: curve, fn: opt.fn, domain: opt.domain.slice(), name: opt.name || 'f' };
    this._curves.push(rec);
    return rec;
  };
  // ENG-49：定义域内采样 ≥21 点，|y渲染 − f(x)| ≤ 1e-9
  Eng.PlotBoard.prototype.checkFunctionSamples = function (rec, n) {
    n = n || 21;
    var maxErr = 0;
    for (var i = 0; i < n; i++) {
      var x = rec.domain[0] + ((rec.domain[1] - rec.domain[0]) * i) / (n - 1);
      var yTrue = rec.fn(x);
      var yGot = rec.curve.Y(x);
      maxErr = Math.max(maxErr, Math.abs(yGot - yTrue));
    }
    return maxErr;
  };

  /* ---------- ENG-50 几何构造 ---------- */
  Eng.PlotBoard.prototype.point = function (x, y, opt) {
    return this.board.create('point', [x, y], opt || {});
  };
  Eng.PlotBoard.prototype.line = function (p1, p2, opt) {
    return this.board.create('line', [p1, p2], opt || {});
  };
  Eng.PlotBoard.prototype.circle = function (center, radiusPtOrNum, opt) {
    return this.board.create('circle', [center, radiusPtOrNum], opt || {});
  };
  Eng.PlotBoard.prototype.polygon = function (pts, opt) {
    return this.board.create('polygon', pts, opt || {});
  };
  Eng.PlotBoard.prototype.angle = function (p1, p2, p3, opt) {
    return this.board.create('angle', [p1, p2, p3], opt || {});
  };
  // ENG-52：坐标读回（1e-9）
  Eng.PlotBoard.prototype.readPoint = function (p) {
    return { x: p.X(), y: p.Y() };
  };

  /* ---------- ENG-51 滑杆绑定 ---------- */
  Eng.PlotBoard.prototype.slider = function (opt) {
    var s = this.board.create(
      'slider',
      [
        [opt.pos[0][0], opt.pos[0][1]],
        [opt.pos[1][0], opt.pos[1][1]],
        [opt.min, opt.initial, opt.max]
      ],
      { name: opt.name || 's', snapWidth: opt.step || 0 }
    );
    var self = this;
    return {
      el: s,
      setValue: function (v) { s.setValue(v); },
      value: function () { return s.Value(); }
    };
  };

  /* ---------- ENG-53 glider（最近点投影语义） ---------- */
  Eng.PlotBoard.prototype.gliderOnCurve = function (curveRec, x0, y0Hint) {
    var g = this.board.create('glider', [x0, y0Hint, curveRec.curve], {});
    return g;
  };
  // ENG-53 断言：|Qy − f(Qx)| ≤ 1e-9；Q 为落点到曲线的最近点（±1e-9）
  Eng.PlotBoard.prototype.checkGliderProjection = function (glider, curveRec, dropLogical) {
    var qx = glider.X(), qy = glider.Y();
    var onCurveDev = Math.abs(qy - curveRec.fn(qx));
    // 密集采样 + 三分精化，求落点到曲线的最小距离，与 |drop − Q| 对比
    var fn = curveRec.fn, dx = dropLogical.x, dy = dropLogical.y;
    function dist(x) { return Math.hypot(x - dx, fn(x) - dy); }
    var lo = curveRec.domain[0], hi = curveRec.domain[1];
    var best = 1e9, n = 2001, bx = lo;
    for (var i = 0; i < n; i++) {
      var x = lo + ((hi - lo) * i) / (n - 1);
      var d = dist(x);
      if (d < best) { best = d; bx = x; }
    }
    // 三分精化（距离函数在极小值附近光滑）
    var a = Math.max(lo, bx - (hi - lo) / n), b = Math.min(hi, bx + (hi - lo) / n);
    for (var k = 0; k < 80; k++) {
      var m1 = a + (b - a) / 3, m2 = b - (b - a) / 3;
      if (dist(m1) < dist(m2)) b = m2; else a = m1;
    }
    best = Math.min(best, dist((a + b) / 2));
    var qDist = Math.hypot(qx - dx, qy - dy);
    return { onCurveDev: onCurveDev, nearestDistDev: Math.abs(qDist - best) };
  };

  /* ============ 数据驱动制图（ENG-64/65/66） ============ */
  // DataChart：Konva 柱状/折线图 = render(数据集) 纯函数；非法输入拒绝渲染并给出错误态
  Eng.DataChart = function (view, opt) {
    opt = opt || {};
    if (!view || !view.layer) throw new Error('DataChart: 需要 Eng.KonvaView');
    this.view = view;
    this.kind = opt.chartKind || 'bar'; // bar | line
    this.valueMin = opt.valueMin !== undefined ? opt.valueMin : 0;
    this.valueMax = opt.valueMax; // 必须声明（非法输入判定上界）
    if (!Eng.isFiniteNumber(this.valueMax) || this.valueMax <= this.valueMin) {
      throw new Error('DataChart: 必须声明有限的 valueMax > valueMin（ENG-66 越界判定）');
    }
    this.dataSource = opt.dataSource; // ENG-65：构造时必须声明
    if (!this.dataSource || !this.dataSource.kind || !this.dataSource.ref) {
      throw new Error('DataChart: 构造参数必须声明 dataSource{kind, ref}（ENG-65）');
    }
    this._error = null;
    this._bars = [];
    var ax = Eng.checkAx01(opt, 'DataChart');
    this.assumptions = ax.assumptions;
    this.approximations = ax.approximations;
    this.errorEstimate = ax.errorEstimate;
  };
  // 校验数据集；非法 → 错误态（ENG-66：不许静默画错图）
  Eng.DataChart.prototype.validate = function (dataset) {
    if (!dataset || !Array.isArray(dataset.values)) return '数据集必须为 {values:[...]}';
    for (var i = 0; i < dataset.values.length; i++) {
      var v = dataset.values[i];
      if (!Eng.isFiniteNumber(v)) return '第 ' + i + ' 个值非法（NaN/非数值），拒绝渲染';
      if (v < this.valueMin || v > this.valueMax) {
        return '第 ' + i + ' 个值 ' + v + ' 越界 [' + this.valueMin + ',' + this.valueMax + ']，拒绝渲染';
      }
    }
    if (dataset.values.length === 0) return '数据集为空（空态应显示引导，YP-03）';
    return null;
  };
  Eng.DataChart.prototype.setData = function (dataset) {
    var err = this.validate(dataset);
    var view = this.view, pal = view.palette;
    // 清旧图
    for (var i = 0; i < this._bars.length; i++) this._bars[i].destroy();
    this._bars = [];
    if (this._errNode) { this._errNode.destroy(); this._errNode = null; }
    if (err) {
      this._error = err;
      var w = view.stage.width();
      this._errNode = Eng.konvaText({
        x: 8, y: 8, width: w - 16,
        text: '数据有误，未绘图：' + err, fontSize: 14, fill: pal.error
      });
      view.layer.add(this._errNode);
      view.layer.draw();
      return { ok: false, error: err };
    }
    this._error = null;
    var self = this;
    // ENG-64：render(数据集) 纯函数
    view.renderDataset(
      dataset,
      function (ds, v) { self._draw(ds, v); },
      this.dataSource
    );
    return { ok: true };
  };
  Eng.DataChart.prototype._draw = function (dataset, view) {
    var pal = view.palette;
    var vals = dataset.values;
    var W = view.stage.width(), H = view.stage.height();
    var padL = 44, padB = 30, padT = 16, padR = 12;
    var cw = (W - padL - padR) / vals.length;
    var ch = H - padT - padB;
    // 坐标轴
    var axis = new Konva.Line({ points: [padL, padT, padL, padT + ch, W - padR, padT + ch], stroke: pal.tick, strokeWidth: 1.5 });
    view.layer.add(axis); this._bars.push(axis);
    var pts = [];
    for (var i = 0; i < vals.length; i++) {
      var f = (vals[i] - this.valueMin) / (this.valueMax - this.valueMin);
      var bh = f * ch;
      var bx = padL + i * cw + cw * 0.18, bw = cw * 0.64;
      var by = padT + ch - bh;
      if (this.kind === 'bar') {
        var bar = new Konva.Rect({
          x: bx, y: by, width: bw, height: bh,
          fill: pal.readout, opacity: 0.75, name: 'eng-bar',
          id: 'eng-bar-' + i
        });
        bar.setAttr('data-value', vals[i]); // 数据可追溯到图形
        view.layer.add(bar); this._bars.push(bar);
        var lab = Eng.konvaText({
          x: padL + i * cw, y: padT + ch + 4, width: cw, align: 'center',
          text: dataset.labels ? dataset.labels[i] : String(i + 1),
          fontSize: 12, fill: pal.subtext
        });
        view.layer.add(lab); this._bars.push(lab);
      } else {
        pts.push(padL + i * cw + cw / 2, by);
      }
    }
    if (this.kind === 'line' && pts.length >= 4) {
      var line = new Konva.Line({ points: pts, stroke: pal.readout, strokeWidth: 2.5 });
      line.setAttr('data-values', vals.slice());
      view.layer.add(line); this._bars.push(line);
    }
    // 数据源声明（图上可见，ENG-65）
    var src = Eng.konvaText({
      x: padL, y: 4, text: '数据源：' + (this.dataSource ? this.dataSource.kind + ' / ' + this.dataSource.ref : '未声明'),
      fontSize: 11, fill: pal.subtext
    });
    view.layer.add(src); this._bars.push(src);
  };
  Eng.DataChart.prototype.barValue = function (i) {
    var node = this.view.stage.findOne('#eng-bar-' + i);
    return node ? node.getAttr('data-value') : null;
  };
  Eng.DataChart.prototype.error = function () { return this._error; };
})();
