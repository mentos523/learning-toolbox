/* ============================================================
 * 学习工具箱 · 地理 · 批 3 新增渲染器（P2：dg06 认识大洲）
 *
 * 本文件在 js/geography.js、js/geo-batch2-widgets.js 之后引入，
 * 经 window.GEO.registerWidget 注册。批 3 各生产工人（P1/P2）
 * 在此文件末尾追加、独立命名空间，互不覆盖。
 *
 * 渲染器：
 *  - americas-profile：美洲西—中—东三段式示意剖面（dg06.2.2）
 *    真值 = 本文件 americasElev(x)（教学示意高程函数，非真实 DEM；
 *    保证西高—中低—东中的三段式趋势）；view.truth() 与 view.state()
 *    分开上报（场层真值 / UI 可达，GEO-RULING-2026-10-17-03）。
 *    零外部请求；深浅双色走 --geog-*；触摸热区 ≥44px；
 *    canvas 文字只用 V8 阶梯 {12.48, 13.6, 15.2, 16, 16.8, 20, 24}px；
 *    HTML 文字用 .fs-078… 工具类。
 * ============================================================ */
(function () {
  "use strict";
  if (!window.GEO || !window.GEO.registerWidget) return;

  /* ---------- 本文件独立小工具（与批 2 文件同名但作用域隔离） ---------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function cssVar(name) {
    try { return getComputedStyle(document.body).getPropertyValue(name).trim(); }
    catch (e) { return ""; }
  }
  function cssColor(name, fb) { var v = cssVar(name); return v || fb; }
  function store(k, v) {
    try { localStorage.setItem("ltb-geo-" + k, JSON.stringify(v)); } catch (e) {}
  }
  /* V8 字号阶梯（px，canvas 文本只用这 7 档） */
  var FS = { s78: "12.48px", s85: "13.6px", s95: "15.2px", s100: "16px", s105: "16.8px", s125: "20px", s150: "24px" };
  function canvasFont(pxKey) { return FS[pxKey] + " system-ui, sans-serif"; }

  function makeStage(parent, aspect, ariaLabel) {
    var stage = el("div", "geog-w2-stage");
    var cv = el("canvas");
    if (ariaLabel) cv.setAttribute("aria-label", ariaLabel);
    stage.appendChild(cv);
    parent.appendChild(stage);
    var st = {
      el: stage, cv: cv, w: 0, dpr: 1, draw: null,
      resize: function () {
        var w = stage.clientWidth;
        if (!w) return;
        var dpr = Math.min(2, window.devicePixelRatio || 1);
        cv.width = Math.round(w * dpr);
        cv.height = Math.round(w * dpr / aspect);
        st.w = w; st.dpr = dpr;
        if (st.draw) st.draw();
      }
    };
    return st;
  }
  function w2wrap(box, title) {
    var wrap = el("div", "geog-w2");
    wrap.appendChild(el("div", "geog-w2-head fs-105", esc(title)));
    box.appendChild(wrap);
    return wrap;
  }
  function readout(parent) {
    var d = el("div", "geog-w2-readout fs-095");
    parent.appendChild(d);
    return d;
  }
  function axNote(parent, html) {
    parent.appendChild(el("div", "geog-w2-ax fs-078", html));
  }
  function honestyBadge(stage, text) {
    stage.el.appendChild(el("div", "geog-w2-badge fs-078", esc(text || "示意｜非精确比例")));
  }
  var _live = [];
  function track(v) { _live.push(v); return v; }
  /* 批 3 P1 修复（同步 batch2 F2 教训，见 geography.js:489-492）：
   * destroy 必须经 window.GEO.unregisterView 从 activeViews 摘除自身，
   * 否则翻页时 renderPage 包装的 while (activeViews.length)
   * activeViews[0].destroy() 永真 → 主线程死循环卡死。
   * 本文件此前只清自有 _live（P2 americas-profile 与 P1 schematic-toggle
   * 均受影响），现集中修复一处。 */
  function untrack(v) {
    var i = _live.indexOf(v); if (i >= 0) _live.splice(i, 1);
    try { if (window.GEO && window.GEO.unregisterView) window.GEO.unregisterView(v); } catch (e) {}
  }
  /* 2026-10-18 批 7 FAIL-1 修复（白队 QA）：深色切换 canvas 不重绘。
     body[data-theme] 变化时对挂载视图执行 resize()（即重排＋draw 重绘；
     try/catch 保护单视图异常不影响其余）。 */
  if (window.MutationObserver && document.body) {
    var _themeObserver = new MutationObserver(function (muts) {
      for (var i = 0; i < muts.length; i++) {
        if (muts[i].type === "attributes" && muts[i].attributeName === "data-theme") {
          _live.forEach(function (v) { try { v.resize(); } catch (e) {} });
          break;
        }
      }
    });
    _themeObserver.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
  }

  /* ============================================================
   * americas-profile · 美洲西—中—东三段式示意剖面
   *
   * 真值函数 americasElev(x)：x ∈ [0,100]（西→东示意距离），
   * 返回示意高程（米）。教学示意模型，非真实 DEM——
   *   西部高山系（示意主峰 ~3200m @x=14）、
   *   中部平原（示意 ~150m）、
   *   东部高原山地（示意 ~1100m @x=82）。
   * 趋势保证西高—中低—东中（供课页教"三段式"规律用）；
   * 数值是示意数，不许当真实高程引用（课页文案已显性化）。
   * 纯函数暴露为 window.GeoBatch3.americasElev，供白队/QA
   * 程序断言（场层真值）与课页渲染共用同一函数（GEO-R30 类比）。
   * ============================================================ */
  function americasElev(x) {
    var west  = 3000 * Math.exp(-Math.pow((x - 14) / 11, 2)); /* 西部高山系示意主峰 */
    var west2 = 1500 * Math.exp(-Math.pow((x - 27) / 7, 2));  /* 西部山前余脉 */
    var east  =  950 * Math.exp(-Math.pow((x - 82) / 13, 2)); /* 东部高原山地 */
    var east2 =  450 * Math.exp(-Math.pow((x - 97) / 6, 2));  /* 东部边缘渐低 */
    var plain = 150;                                          /* 中部平原基底 */
    return Math.round(plain + west + west2 + east + east2);
  }
  window.GeoBatch3 = window.GeoBatch3 || {};
  window.GeoBatch3.americasElev = americasElev;

  function AmericasProfileView(box, params, pg) {
    params = params || {};
    var N = params.samples || 7;
    var VEX = params.verticalExaggeration || 2;
    var TOL = params.toleranceM != null ? params.toleranceM : 400; /* 示意数，容差放宽 */
    var P = { recordKey: params.recordKey || ("geog_americas-profile_" + (pg && pg.id || "na")) };
    var SEG = params.segments || [
      { from: 0, to: 30, label: "西部高山系", sub: "落基山脉—安第斯山脉（示意）" },
      { from: 30, to: 70, label: "中部平原", sub: "大平原（示意）" },
      { from: 70, to: 100, label: "东部高原山地", sub: "阿巴拉契亚—巴西高原（示意）" }
    ];

    var wrap = w2wrap(box, "美洲地形剖面：西—中—东三段式（示意练习）");
    var flex = el("div", "geog-map-flex");
    wrap.appendChild(flex);
    var leftBox = el("div", ""); var rightBox = el("div", "");
    flex.appendChild(leftBox); flex.appendChild(rightBox);
    var mapStage = makeStage(leftBox, 2.6, "三段式示意条带：西—中—东");
    var proStage = makeStage(rightBox, 1, "剖面坐标纸：拖动采样点描绘三段起伏");
    honestyBadge(mapStage, "示意｜非精确比例｜示意高程");
    var ro = readout(wrap);

    /* 采样点：沿西→东等距，x 为示意距离 0–100，真值由示意函数给出 */
    var pts = [];
    for (var i = 0; i < N; i++) {
      var x = N === 1 ? 50 : (i / (N - 1)) * 100;
      pts.push({ x: x, truth: americasElev(x), v: 0 });
    }
    var zMin = 0, zMax = 3500;
    var submitted = false, score = 0;

    function truth() {
      return pts.map(function (p) { return { x: Math.round(p.x * 10) / 10, elev: p.truth }; });
    }

    function segOf(x) {
      for (var k = 0; k < SEG.length; k++) {
        if (x >= SEG[k].from && x <= SEG[k].to) return SEG[k];
      }
      return SEG[SEG.length - 1];
    }

    function mapDraw() {
      var cv = mapStage.cv, ctx = cv.getContext("2d");
      var W = mapStage.w, dpr = mapStage.dpr, H = W / 2.6;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var ink = cssColor("--geog-ink", "#1a1a1a");
      var soft = cssColor("--geog-ink-soft", "#4a4a4a");
      var cols = ["#C97B2D", "#7FB069", "#D9B44A"]; /* 西山地/中平原/东高原（示意色） */
      function X(x) { return (x / 100) * W; }
      /* 三段条带 */
      SEG.forEach(function (s, k) {
        ctx.fillStyle = cols[k % cols.length];
        ctx.globalAlpha = 0.55;
        ctx.fillRect(X(s.from), H * 0.18, X(s.to) - X(s.from), H * 0.5);
        ctx.globalAlpha = 1;
        ctx.fillStyle = ink; ctx.font = canvasFont("s85"); ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(s.label, (X(s.from) + X(s.to)) / 2, H * 0.34);
        ctx.font = canvasFont("s78"); ctx.fillStyle = soft;
        ctx.fillText(s.sub, (X(s.from) + X(s.to)) / 2, H * 0.52);
      });
      /* 方向标 */
      ctx.fillStyle = soft; ctx.font = canvasFont("s78"); ctx.textAlign = "left";
      ctx.fillText("西 ←", 6, H * 0.12);
      ctx.textAlign = "right";
      ctx.fillText("→ 东", W - 6, H * 0.12);
      /* 采样点 */
      pts.forEach(function (p, k) {
        ctx.fillStyle = cssColor("--geog-contour-hi", "#E69F00");
        ctx.beginPath(); ctx.arc(X(p.x), H * 0.78, 7, 0, 7); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = ink; ctx.font = canvasFont("s78"); ctx.textAlign = "center"; ctx.textBaseline = "bottom";
        ctx.fillText(String(k + 1), X(p.x), H * 0.78 - 10);
      });
      ctx.fillStyle = soft; ctx.font = canvasFont("s78"); ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText("剖面线：西 → 东（示意距离）", W / 2, H * 0.86);
    }

    function proDraw() {
      var cv = proStage.cv, ctx = cv.getContext("2d");
      var W = proStage.w, dpr = proStage.dpr, H = W;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, H);
      var ink = cssColor("--geog-ink", "#1a1a1a");
      var soft = cssColor("--geog-ink-soft", "#4a4a4a");
      var hiC = cssColor("--geog-contour-hi", "#E69F00");
      var okC = cssColor("--geog-correct", "#009E73");
      var L = 52, Rr = 12, T = 26, B = 44;
      function PX(x) { return L + (W - L - Rr) * (x / 100); }
      function PY(z) { return T + (H - T - B) * (1 - (z - zMin) / (zMax - zMin)); }
      /* 坐标纸 */
      ctx.strokeStyle = cssColor("--geog-graticule", "#9AA5B1"); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, H - B); ctx.lineTo(W - Rr, H - B); ctx.stroke();
      ctx.font = canvasFont("s78"); ctx.fillStyle = soft;
      ctx.textAlign = "right"; ctx.textBaseline = "middle";
      for (var z = 0; z <= zMax; z += 500) {
        ctx.fillText(String(z) + "m", L - 4, PY(z));
        ctx.beginPath(); ctx.moveTo(L, PY(z)); ctx.lineTo(W - Rr, PY(z)); ctx.stroke();
      }
      /* 三段底色带（与左图呼应） */
      var cols = ["#C97B2D", "#7FB069", "#D9B44A"];
      SEG.forEach(function (s, k) {
        ctx.fillStyle = cols[k % cols.length]; ctx.globalAlpha = 0.14;
        ctx.fillRect(PX(s.from), T, PX(s.to) - PX(s.from), H - T - B);
        ctx.globalAlpha = 1;
      });
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillStyle = soft; ctx.font = canvasFont("s78");
      SEG.forEach(function (s) { ctx.fillText(s.label, (PX(s.from) + PX(s.to)) / 2, H - B + 6); });
      ctx.textAlign = "left"; ctx.textBaseline = "bottom";
      ctx.fillText("垂直夸大 ×" + VEX + "（示意）·只看三段趋势，不记数值", L, H - 4);
      /* 真值虚线（提交后对照） */
      if (submitted) {
        ctx.strokeStyle = okC; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
        ctx.beginPath();
        pts.forEach(function (p, k) {
          if (k === 0) ctx.moveTo(PX(p.x), PY(p.truth)); else ctx.lineTo(PX(p.x), PY(p.truth));
        });
        ctx.stroke(); ctx.setLineDash([]);
        ctx.font = canvasFont("s78"); ctx.fillStyle = okC;
        ctx.fillText("真值（示意函数）", L + 4, T + 12);
      }
      /* 学生描绘线 */
      ctx.strokeStyle = hiC; ctx.lineWidth = 2.6;
      ctx.beginPath();
      pts.forEach(function (p, k) {
        if (k === 0) ctx.moveTo(PX(p.x), PY(p.v)); else ctx.lineTo(PX(p.x), PY(p.v));
      });
      ctx.stroke();
      pts.forEach(function (p, k) {
        var ok = submitted && Math.abs(p.v - p.truth) <= TOL;
        ctx.fillStyle = submitted ? (ok ? okC : cssColor("--geog-wrong", "#D55E00")) : hiC;
        ctx.beginPath(); ctx.arc(PX(p.x), PY(p.v), 10, 0, 7); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = ink; ctx.font = canvasFont("s78");
        ctx.textAlign = "center"; ctx.textBaseline = "bottom";
        ctx.fillText(String(k + 1), PX(p.x), PY(p.v) - 13);
      });
    }
    mapStage.draw = mapDraw; proStage.draw = proDraw;

    /* 拖采样点（纵向） */
    var dragI = -1;
    function proPos(e) {
      var r = proStage.cv.getBoundingClientRect();
      var t = e.touches ? e.touches[0] : (e.changedTouches ? e.changedTouches[0] : e);
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    }
    proStage.cv.style.touchAction = "none";
    proStage.cv.addEventListener("pointerdown", function (e) {
      if (submitted) return;
      var p = proPos(e), W = proStage.w, H = W;
      var L = 52, Rr = 12, T = 26, B = 44;
      function PX(x) { return L + (W - L - Rr) * (x / 100); }
      function PYof(v) { return T + (H - T - B) * (1 - (v - zMin) / (zMax - zMin)); }
      for (var k = 0; k < pts.length; k++) {
        if (Math.hypot(p.x - PX(pts[k].x), p.y - PYof(pts[k].v)) < 22) { dragI = k; break; }
      }
      try { proStage.cv.setPointerCapture(e.pointerId); } catch (err) {}
    });
    proStage.cv.addEventListener("pointermove", function (e) {
      if (dragI < 0 || submitted) return;
      var p = proPos(e), W = proStage.w, H = W;
      var T = 26, B = 44;
      var frac = 1 - (p.y - T) / (H - T - B);
      frac = Math.max(0, Math.min(1, frac));
      pts[dragI].v = Math.round((zMin + frac * (zMax - zMin)) / 50) * 50;
      proDraw();
    });
    proStage.cv.addEventListener("pointerup", function () { dragI = -1; });
    proStage.cv.addEventListener("pointercancel", function () { dragI = -1; });

    var row = el("div", "geog-w2-row");
    var subBtn = el("button", "geog-btn geog-btn-primary fs-095", "提交判分");
    subBtn.addEventListener("click", function () {
      submitted = true; score = 0;
      var lines = [];
      pts.forEach(function (p, k) {
        var err = Math.abs(p.v - p.truth);
        var ok = err <= TOL;
        if (ok) score++;
        lines.push("点" + (k + 1) + "（" + segOf(p.x).label + "）：你描 " + p.v + "m，真值 " + p.truth + "m（示意），差 " + err + "m " + (ok ? "✓" : "✗"));
      });
      proDraw();
      ro.innerHTML = (score === N ? '<span class="ok-t">✓ 全对！</span>' : '<span class="no-t">' + score + "/" + N + " 点在容差内。</span>") +
        "判分口径：每点 |你的高程 − 示意真值| ≤ " + TOL + "m。<br>" + esc(lines.join("；")) +
        "<br>绿色虚线是示意函数的真值——对照看：西部高、中部低、东部起伏，三段趋势画对了没有？记住：数值是示意的，趋势才是要带走的。";
      store(P.recordKey, { score: score, total: N, ts: Date.now() });
    });
    var resetBtn = el("button", "geog-btn fs-095", "重描");
    resetBtn.addEventListener("click", function () {
      submitted = false; score = 0;
      pts.forEach(function (p) { p.v = 0; });
      proDraw(); ro.textContent = "把每个采样点拖到你觉得对的高度，再提交。先想：西段该最高，中段该最低，东段居中起伏。";
    });
    row.appendChild(subBtn); row.appendChild(resetBtn);
    wrap.appendChild(row);
    axNote(wrap, "诚实清单：地形为<strong>教学示意模型（非真实美洲 DEM）</strong>；高程数为示意数，只看西—中—东三段趋势，不记具体数值、不查真实高程；横轴为示意距离（非精确比例）；剖面图垂直夸大 ×" + VEX + "（示意）。");

    var view = {
      root: wrap,
      resize: function () { mapStage.resize(); proStage.resize(); },
      destroy: function () { untrack(view); },
      truth: truth,
      state: function () {
        return {
          submitted: submitted, score: score, total: N, toleranceM: TOL,
          points: pts.map(function (p) {
            return { x: Math.round(p.x * 10) / 10, segment: segOf(p.x).label,
              yours: p.v, truth: p.truth, err: Math.abs(p.v - p.truth) };
          })
        };
      },
      labelFonts: function () { return [12.48, 13.6]; },
      _setPoint: function (i, v) { pts[i].v = v; proDraw(); },
      _submit: function () { subBtn.click(); return view.state(); }
    };
    track(view);
    view.resize();
    return view;
  }
  window.GEO.registerWidget("americas-profile", AmericasProfileView);

  /* 批3 · P2（dg06）追加区结束 —— P1 请在此行之后追加（独立命名空间，勿改上文） */

  /* ============================================================
   * 批 3 · P1（dg04/dg05）追加区 —— schematic-toggle
   *
   * schematic-toggle（G-示意 · 世界政区示意多版着色切换）：
   * 自绘示意世界（大洲示意色块 + 国家示意圆点，不画国界线），
   * 顶部视图切换按钮（如「按面积看 / 按人口看」），圆点可点读数。
   * params:
   *   title: string（标题）; blurb: string（说明）;
   *   views: [{id, label}] —— "area"（按面积分档着色）/
   *            "pop"（按人口分档着色）/ "dev"（发达/发展中二分着色）;
   *   regions: [{name, x, y, area?, pop?, dev?, note?, lab?}]
   *     x/y: 0–100 逻辑坐标（示意位置）; area: 万平方千米（约）;
   *     pop: 亿（约，2024）; dev: "developed"|"developing";
   *     note: 读数补充（允许 <strong>）; lab: [dx,dy] 标签防撞偏移;
   *   valueNote: string（数据年份/来源声明）;
   *   mapNote: string（示意声明，默认 B14 变体）;
   *   recordKey: string（默认 geog_schematic-toggle_<view>）。
   * 真值 = params（区域数据见 ledger-dg05.json）；无场层函数，
   * GEO-RULING-2026-10-17-03（truth/state 分报）不适用。
   * 零外部请求；触摸热区 ≥44px（透明命中圆 + 按钮列表）；
   * HTML 文字只用 .fs-078… 工具类；SVG 文字 12.5/16px 落 V8 阶梯
   *（2026-10-18 批 7 修复：内部坐标 ×8，旧 3.4/3.6 逻辑单位字无书面豁免）；
   * 示意声明常驻（mapNote + valueNote）。
   * ============================================================ */
  var P1_CONTINENTS = [
    { x: 6, y: 8, w: 24, h: 22 },   /* 北美洲（示意） */
    { x: 20, y: 54, w: 14, h: 30 }, /* 南美洲（示意） */
    { x: 42, y: 12, w: 14, h: 12 }, /* 欧洲（示意） */
    { x: 44, y: 30, w: 14, h: 26 }, /* 非洲（示意） */
    { x: 58, y: 10, w: 34, h: 26 }, /* 亚洲（示意） */
    { x: 78, y: 66, w: 14, h: 14 }  /* 大洋洲（示意） */
  ];
  var P1_TIER_FILL = ["#dbe7f5", "#9dbdea", "#2f6fd0"];
  var P1_DEV_FILL = { developed: "#2f6fd0", developing: "#e08a1e" };
  function p1Tier(view, r) {
    if (view === "area") { var a = r.area || 0; return a >= 900 ? 2 : (a >= 100 ? 1 : 0); }
    if (view === "pop") { var p = r.pop || 0; return p >= 10 ? 2 : (p >= 1 ? 1 : 0); }
    return 0;
  }
  function p1Rich(s) { return esc(s).replace(/&lt;(\/?strong)&gt;/g, "<$1>"); }

  function P1SchematicToggle(box, P) {
    P = P || {};
    var views = (P.views && P.views.length) ? P.views : [{ id: "area", label: "按面积看" }];
    var regions = P.regions || [];
    var curView = views[0].id;
    var sel = -1;

    var wrap = el("div", "geog-w3-schematic");
    wrap.appendChild(el("div", "geog-w3-title fs-105", esc(P.title || "世界政区示意")));
    if (P.blurb) wrap.appendChild(el("div", "geog-w3-blurb fs-095", esc(P.blurb)));

    var tabRow = el("div", "geog-w3-tabs");
    var tabBtns = [];
    views.forEach(function (v, i) {
      var b = el("button", "geog-btn fs-095" + (i === 0 ? " geog-btn-primary" : ""), esc(v.label));
      b.setAttribute("aria-pressed", i === 0 ? "true" : "false");
      (function (id) { b.addEventListener("click", function () { p1SetView(id); }); })(v.id);
      tabRow.appendChild(b); tabBtns.push(b);
    });
    wrap.appendChild(tabRow);

    var NS = "http://www.w3.org/2000/svg";
    function sEl(tag, attrs) {
      var n = document.createElementNS(NS, tag);
      for (var k in attrs) n.setAttribute(k, attrs[k]);
      return n;
    }
    var svg = sEl("svg", {
      viewBox: "0 0 800 800", width: "100%",
      role: "img", "aria-label": (P.title || "世界政区示意图") + "（示意，无国界线）"
    });
    /* V8 字号阶梯修复（2026-10-18 批 7）：内部坐标 ×8（S），SVG 文字取
     * 阶梯字号（12.5/16px），替代旧“3.4/3.6 逻辑单位字豁免”（无书面裁决，
     * 按门禁⑲无效）。data 仍用 0–100 逻辑单位，此处统一换算，data 文件不动。 */
    var S = 8;
    svg.appendChild(sEl("rect", { x: 0, y: 0, width: 800, height: 800, rx: 32, fill: cssVar("--geog-bg-soft") || "#f6f4ee" }));
    P1_CONTINENTS.forEach(function (c) {
      svg.appendChild(sEl("rect", {
        x: c.x * S, y: c.y * S, width: c.w * S, height: c.h * S, rx: 24,
        fill: "none", stroke: cssVar("--geog-border") || "#e2ddd2",
        "stroke-width": 6.4, "stroke-dasharray": "16,9.6"
      }));
    });
    svg.appendChild(sEl("line", {
      x1: 0, y1: 400, x2: 800, y2: 400,
      stroke: cssVar("--geog-border") || "#e2ddd2", "stroke-width": 4, "stroke-dasharray": "24,16"
    }));
    var eqT = sEl("text", { x: 24, y: 776, "font-size": 12.5, "text-anchor": "start", fill: cssVar("--geog-ink-soft") || "#4a4a4a" });
    eqT.textContent = "赤道（示意）";
    svg.appendChild(eqT);

    var dots = [];
    regions.forEach(function (r, i) {
      var g = sEl("g", {});
      var dot = sEl("circle", { cx: r.x * S, cy: r.y * S, r: 20.8, stroke: "#fff", "stroke-width": 6.4 });
      g.appendChild(dot);
      /* 标签防撞：region 可带 lab:[dx,dy] 偏移（如南亚三国扎堆）；0–100 单位，×S 换算 */
      var lab = r.lab || [0, -4.4];
      var lb = sEl("text", {
        x: (r.x + lab[0]) * S, y: (r.y + lab[1]) * S, "font-size": 16, "text-anchor": "middle",
        fill: cssVar("--geog-ink") || "#1a1a1a"
      });
      lb.textContent = r.name;
      g.appendChild(lb);
      var hit = sEl("circle", { cx: r.x * S, cy: r.y * S, r: 52, fill: "transparent" });
      hit.style.cursor = "pointer";
      (function (idx) { hit.addEventListener("click", function () { p1Select(idx); }); })(i);
      g.appendChild(hit);
      svg.appendChild(g);
      dots.push({ dot: dot });
    });
    wrap.appendChild(svg);

    var legend = el("div", "geog-w3-legend fs-078");
    wrap.appendChild(legend);
    var readoutEl = el("div", "geog-w3-readout fs-095", "点上面的圆点，看它的数。");
    wrap.appendChild(readoutEl);

    var listRow = el("div", "geog-w3-list");
    var listBtns = [];
    regions.forEach(function (r, i) {
      var b = el("button", "geog-btn fs-085", esc(r.name));
      (function (idx) { b.addEventListener("click", function () { p1Select(idx); }); })(i);
      listRow.appendChild(b); listBtns.push(b);
    });
    wrap.appendChild(listRow);

    axNote(wrap, esc(P.mapNote || "示意｜非精确比例｜方向仅供参考（无国界线；圆点位置仅为示意）") +
      (P.valueNote ? "<br>" + esc(P.valueNote) : ""));
    box.appendChild(wrap);

    function p1Paint() {
      regions.forEach(function (r, i) {
        var fill = (curView === "dev") ? (P1_DEV_FILL[r.dev] || "#b9c2d0") : P1_TIER_FILL[p1Tier(curView, r)];
        dots[i].dot.setAttribute("fill", fill);
        dots[i].dot.setAttribute("stroke", i === sel ? (cssVar("--geog-accent") || "#0e7c66") : "#fff");
        dots[i].dot.setAttribute("stroke-width", i === sel ? 12.8 : 6.4);
      });
      legend.innerHTML = "";
      function sw(color, text) {
        var s = el("span", "", "");
        var box2 = el("span", "geog-w3-sw", "");
        box2.style.background = color;
        s.appendChild(box2); s.appendChild(document.createTextNode(text));
        legend.appendChild(s);
      }
      if (curView === "dev") {
        sw(P1_DEV_FILL.developed, "发达国家"); sw(P1_DEV_FILL.developing, "发展中国家");
      } else if (curView === "area") {
        sw(P1_TIER_FILL[0], "面积<100 万 km²"); sw(P1_TIER_FILL[1], "面积 100–900 万 km²"); sw(P1_TIER_FILL[2], "面积≥900 万 km²");
      } else {
        sw(P1_TIER_FILL[0], "人口<1 亿"); sw(P1_TIER_FILL[1], "人口 1–10 亿"); sw(P1_TIER_FILL[2], "人口≥10 亿");
      }
      tabBtns.forEach(function (b, i) {
        var on = views[i].id === curView;
        b.setAttribute("aria-pressed", on ? "true" : "false");
        if (on) b.classList.add("geog-btn-primary"); else b.classList.remove("geog-btn-primary");
      });
    }
    function p1Fmt(r) {
      if (curView === "area") return "面积约 " + r.area + " 万平方千米";
      if (curView === "pop") return "人口约 " + r.pop + " 亿（2024 年约值）";
      return r.dev === "developed" ? "发达国家" : "发展中国家";
    }
    function p1Select(i) {
      sel = i;
      var r = regions[i];
      readoutEl.innerHTML = "<strong>" + esc(r.name) + "</strong>：" + esc(p1Fmt(r)) +
        (r.note ? "<br>" + p1Rich(r.note) : "");
      listBtns.forEach(function (b, j) {
        if (j === i) b.classList.add("geog-btn-primary"); else b.classList.remove("geog-btn-primary");
      });
      p1Paint();
      store(P.recordKey || ("geog_schematic-toggle_" + curView), { view: curView, region: r.name, ts: Date.now() });
    }
    function p1SetView(id) {
      curView = id; sel = -1;
      readoutEl.textContent = "点上面的圆点，看它的数。";
      listBtns.forEach(function (b) { b.classList.remove("geog-btn-primary"); });
      p1Paint();
    }
    p1Paint();

    var view = {
      resize: function () {}, destroy: function () { untrack(view); },
      state: function () {
        return { view: curView, region: sel >= 0 ? regions[sel].name : null, regions: regions.length };
      },
      labelFonts: function () { return []; },
      _select: p1Select, _setView: p1SetView
    };
    track(view);
    return view;
  }
  window.GEO.registerWidget("schematic-toggle", function (box, params) {
    return P1SchematicToggle(box, params || {});
  });
  /* ==== P1 追加区结束 ==== */
})();
