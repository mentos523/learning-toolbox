/* ============================================================
 * 学习工具箱 · 地理 · 批 2 交互组件（蓝队 · 线 B）
 *
 * 模块层渲染器（对标批 1 geography.js 内 WIDGETS 注册表；
 * 未达到引擎层通用原语标准，故不注册 window.Eng.*——
 * 「模块层即可，不要为了引擎而引擎」）。
 * 本文件在 js/geography.js 之后引入，经 window.GEO.registerWidget
 * 注册 6 个类型；渲染器返回视图对象 {state, truth?, resize, destroy}，
 * geography.js 将其挂载为 box._geoView 供白队/QA 程序断言。
 *
 * 真值纪律：
 *  - globe-spin: 示意地球仪（零外部瓦片/零二进制资源）；陆地为示意
 *    多边形（不画国界线，GEO-R23）；「示意｜非精确比例」常驻。
 *  - scale-calc: 换算判分容差 ±1%（GEO-R21）；口诀「大详小略」+
 *    换算句「分母越小、比例尺越大」逐字（GEO-R18/19）。
 *  - profile-draw: 剖面高程真值取自 Eng.ContourField.elevationAt——
 *    与 contour-3d 同一数据源/函数（GEO-R30）；判分按场层真值，
 *    view.truth() 与 view.state() 分开上报（场层真值 vs UI 可达分开断言）。
 *  - climate-chart: 判定逻辑与 geo-climate-types.js 类型库 /
 *    geo-climate-stations.js 站点表共用同一数据源；GEO-R14 阈值逐字；
 *    seasonEnum 五选一（GEO-RULING-2026-10-17-07）；伦敦站走
 *    needsRuling 例外路径（GEO-RULING-2026-10-17-04）；guided 模式
 *    第②步在第①步完成前锁定（GEO-R13）。
 *  - timezone-calc: 四步顺序冻结「定时区→定东西→加减小时→看日期」
 *    （GEO-R09）；方向基准为经度增大方向、箭头画在时区盘上
 *    （GEO-R08）；跨 180° 警示不可关（GEO-R10）；北京时间口径
 *    （GEO-R11）；整小时教学口径（GEO-R12 初中默认）。
 *  - plate-puzzle: 示意轮廓无国界线（GEO-R23）；「板块一年移动
 *    几厘米——指甲长的速度」冻结（GEO-R55/B9）；dg02 语境不用
 *    「消亡/生长边界」（超纲词清单）；漂移动画「示意，非真实速度」。
 *
 * 通用铁律：零外部请求；深浅双色走 --geog-* 变量；触摸热区 ≥44px；
 * 逻辑单位 0–100（y 向上）用于 SVG/示意坐标；canvas 文字字号只用
 * V8 阶梯 {12.48, 13.6, 15.2, 16, 16.8, 20, 24}px；HTML 文字用
 * .fs-078… 工具类；记录键 `geog_<类型>_<课号>`（B1）。
 *
 * params Schema（各类型必填/默认见 RENDERERS.md）：
 *  globe-spin:    {mode, targets[], graticuleStep, showGraticule, showLabels,
 *                  polarView, tolerance, spinHint, labels[], recordKey}
 *  scale-calc:    {mode(convert|calc|compare), scales[], problem{}, compareMaps[],
 *                  tolerance, recordKey}
 *  profile-draw:  {line{from,to}, samples, verticalExaggeration, toleranceM, recordKey}
 *  climate-chart: {stations[]（无则用气候站点表）, mode(guided|free),
 *                  compareMode, climateLib, recordKey}
 *  timezone-calc: {cities[]（无则用时区城市表）, knownCity, knownTime{hour,minute},
 *                  knownDate{month,day}?, recordKey}
 *  plate-puzzle:  {mode(drift|plates), pieces[], evidences[], boundaries[],
 *                  driftAnim, recordKey}
 * ============================================================ */
(function () {
  "use strict";
  if (!window.GEO || !window.GEO.registerWidget) return;

  /* ---------------- 通用工具 ---------------- */
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
  function $(sel, root) { return (root || document).querySelector(sel); }
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
  var reducedMotion = (window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches);

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
  function legend(parent, items) {
    var lg = el("div", "geog-w2-legend fs-085");
    items.forEach(function (it) {
      lg.appendChild(el("span", "", '<span class="sw' + (it.cls ? " " + it.cls : "") + '"></span>' + esc(it.text)));
    });
    parent.appendChild(lg);
  }
  function fmtLatLon(lat, lon) {
    function f(v, p, n) {
      var a = Math.abs(v);
      return a.toFixed(0) + "°" + (v >= 0 ? p : n);
    }
    return f(lat, "N", "S") + ", " + f(lon, "E", "W");
  }
  function liveViews() { return _live; }
  var _live = [];
  function track(v) { _live.push(v); return v; }
  /* 2026-10-17 修复 F2（白队 QA 首轮）：批 2 各组件 destroy 在此
     按批 1 MapView 约定（geography.js:611-612）从 activeViews 摘除自身。
     跨文件无闭包访问，经 window.GEO.unregisterView 桥接。
     此前只清自有 _live → 翻页/主题切换时 renderPage 包装的
     while (activeViews.length) activeViews[0].destroy() 永真，主线程死循环卡死。
     （批 2 全部 10 处 destroy 均经此函数，故集中修复一处即可。） */
  function untrack(v) {
    var i = _live.indexOf(v); if (i >= 0) _live.splice(i, 1);
    try { if (window.GEO && window.GEO.unregisterView) window.GEO.unregisterView(v); } catch (e) {}
  }
  if (window.addEventListener) window.addEventListener("resize", function () {
    _live.forEach(function (v) { try { v.resize(); } catch (e) {} });
  });
  /* 2026-10-18 批 7 FAIL-1 修复（白队 QA）：深色切换 canvas 不重绘。
     body[data-theme] 变化时对挂载视图执行 resize()（即重排＋draw 重绘，
     与 window.resize 监听同机制；try/catch 保护单视图异常不影响其余）。 */
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
   * 纯函数真值层（渲染与断言共用；window.GeoBatch2 暴露给白队）
   * ============================================================ */
  /* GEO-R14 以温定带（阈值逐字） */
  function judgeZone(temp) {
    var cold = Math.min.apply(null, temp), hot = Math.max.apply(null, temp);
    if (cold > 15) return { zone: "热带", rule: "最冷月均温 > 15℃", cold: cold, hot: hot };
    if (cold >= 0) return { zone: "亚热带", rule: "0℃ ≤ 最冷月均温 ≤ 15℃", cold: cold, hot: hot };
    if (hot > 10) return { zone: "温带", rule: "最冷月均温 < 0℃ 且 最热月均温 > 10℃", cold: cold, hot: hot };
    return { zone: "寒带", rule: "最热月均温 ≤ 10℃", cold: cold, hot: hot };
  }
  /* 季节分配五选一（GEO-RULING-2026-10-17-07；顺序即判定优先级） */
  var SEASON_ENUM = ["全年多雨", "夏季多雨", "冬季多雨", "全年少雨", "全年较均匀"];
  function classifySeason(precip) {
    var annual = precip.reduce(function (a, b) { return a + b; }, 0);
    var min = Math.min.apply(null, precip), max = Math.max.apply(null, precip);
    var djf = precip[11] + precip[0] + precip[1];   // 北半球冬季（12/1/2月）
    var jja = precip[5] + precip[6] + precip[7];    // 北半球夏季（6/7/8月）
    if (annual < 250) return { season: "全年少雨", annual: annual };
    if (min >= 60) return { season: "全年多雨", annual: annual };
    if (djf > 2 * jja && jja < 150) return { season: "冬季多雨", annual: annual };
    if (max / Math.max(min, 0.01) <= 2) return { season: "全年较均匀", annual: annual };
    if (annual < 400) return { season: "全年少雨", annual: annual };
    return { season: "夏季多雨", annual: annual };
  }
  function typeLib() {
    var lib = (window.GEOGRAPHY_DATA && window.GEOGRAPHY_DATA.climateTypes) || {};
    var map = {};
    (lib.types || []).forEach(function (t) { map[t.id] = t; });
    return { lib: lib, map: map };
  }
  /* 输入站点 12 月数据 → 输出类型判读（含伦敦 needsRuling 例外路径） */
  function judgeClimate(st) {
    var T = typeLib();
    if (st.isPlateau) {
      return { zone: "高原山地", season: null, typeId: "plateau-mountain",
        typeName: "高原山地气候", via: "plateau",
        note: "高原山地气候看海拔，口诀之外（T5 / GEO-R14）。" };
    }
    var zr = judgeZone(st.temp);
    var sc = classifySeason(st.precip);
    if (st.needsRuling) {
      /* GEO-RULING-2026-10-17-04：口诀例外——看分布（40°–60° 大陆西岸）
         与成因（西风 + 暖流）定为温带；阈值不动。 */
      var t = T.map[st.climateTypeId] || {};
      return { zone: t.zone || "温带", season: sc.season, typeId: st.climateTypeId,
        typeName: t.name || "", via: "exception",
        mottoRead: zr.zone, rule: zr.rule,
        note: st.boundaryNote || t.boundaryNote || "" };
    }
    var typeId = null, typeName = "";
    var z = zr.zone, s = sc.season, an = sc.annual, hot = zr.hot;
    if (z === "热带" && s === "全年多雨") typeId = "tropical-rainforest";
    else if (z === "热带" && s === "夏季多雨") typeId = an >= 1500 ? "tropical-monsoon" : "tropical-savanna";
    else if (z === "热带" && s === "全年少雨") typeId = "tropical-desert";
    else if (z === "亚热带" && s === "夏季多雨") typeId = "subtropical-monsoon";
    else if (z === "亚热带" && s === "冬季多雨") typeId = "mediterranean";
    else if (z === "温带" && s === "全年较均匀") typeId = "temperate-oceanic";
    else if (z === "温带" && s === "夏季多雨") typeId = an >= 400 ? "temperate-monsoon" : "temperate-continental";
    else if (z === "温带" && s === "全年少雨") typeId = "temperate-continental";
    else if (z === "寒带") typeId = hot > 0 ? "tundra" : "icecap";
    var tt = T.map[typeId] || {};
    typeName = tt.name || "";
    return { zone: z, season: s, typeId: typeId, typeName: typeName, via: "motto",
      rule: zr.rule, annual: an, cold: zr.cold, hot: zr.hot };
  }
  /* G6 纯计算：已知地 knownTime（分钟）→ 目标地时间（整小时教学口径） */
  function calcTimezone(knownZone, knownMin, targetZone) {
    var diffMin = (targetZone - knownZone) * 60;      // 东加西减：目标在东（时区大）则加
    var total = knownMin + diffMin;
    var dayOffset = Math.floor(total / 1440);
    var t = ((total % 1440) + 1440) % 1440;
    var hh = Math.floor(t / 60), mm = t % 60;
    return {
      diffHours: (targetZone - knownZone),
      east: targetZone > knownZone,
      west: targetZone < knownZone,
      same: targetZone === knownZone,
      dayOffset: dayOffset,
      timeStr: (hh < 10 ? "0" + hh : "" + hh) + ":" + (mm < 10 ? "0" + mm : "" + mm),
      crossed180: Math.abs(targetZone - knownZone) > 12   // 时区差 >12h 即越过日界线
    };
  }
  /* G8 纯换算：图上距离(cm) × 分母 → 实地 */
  function calcScale(mapDistCm, denom) {
    var cm = mapDistCm * denom;
    var km = cm / 100000, m = cm / 100;
    return { cm: cm, m: m, km: km };
  }
  function scaleTextOf(denom) {
    if (denom >= 100000 && denom % 100000 === 0)
      return "图上1厘米代表实地" + (denom / 100000) + "千米";
    return "图上1厘米代表实地" + (denom / 100) + "米";
  }
  window.GeoBatch2 = {
    judgeZone: judgeZone, classifySeason: classifySeason, judgeClimate: judgeClimate,
    calcTimezone: calcTimezone, calcScale: calcScale, scaleTextOf: scaleTextOf,
    SEASON_ENUM: SEASON_ENUM
  };

  /* ============================================================
   * 1) globe-spin · 自绘示意地球仪（正射投影，零外部瓦片）
   * ============================================================ */
  /* 示意大陆轮廓（[经度, 纬度]，东正北正；简化多边形，非精确海岸线；
     大洲相对位置/方位与真实一致（GEO-R26）；不画国界线（GEO-R23）；
     格陵兰岛标注属北美洲（GEO-R46）。 */
  var CONTINENTS = [
    { name: "北美洲", pts: [[-168,66],[-158,71],[-140,70],[-125,71],[-110,72],[-95,71],[-85,70],[-80,73],[-70,63],[-64,60],[-55,52],[-59,46],[-65,44],[-70,42],[-74,39],[-76,35],[-80,32],[-81,26],[-84,30],[-89,29],[-94,29],[-97,26],[-97,21],[-93,17],[-87,14],[-83,9],[-78,8],[-81,12],[-87,15],[-93,16],[-99,18],[-106,22],[-111,25],[-114,29],[-117,33],[-122,38],[-124,43],[-124,48],[-128,52],[-132,56],[-137,59],[-145,60],[-152,59],[-158,57],[-163,60]], labelAt: [-105,50] },
    { name: "格陵兰岛", pts: [[-57,64],[-52,60],[-44,60],[-41,64],[-46,69],[-54,71],[-59,69]], labelAt: null, sub: "（属北美洲）" },
    { name: "南美洲", pts: [[-79,9],[-74,11],[-68,11],[-61,9],[-53,5],[-50,0],[-44,-3],[-39,-5],[-35,-8],[-37,-13],[-39,-18],[-42,-23],[-48,-27],[-52,-33],[-57,-37],[-61,-40],[-64,-44],[-66,-48],[-68,-52],[-70,-54],[-73,-52],[-73,-46],[-72,-40],[-71,-34],[-70,-28],[-70,-22],[-73,-16],[-77,-10],[-80,-5],[-81,0]], labelAt: [-60,-18] },
    { name: "亚欧大陆", pts: [[-9,43],[-9,37],[-6,36],[-2,37],[0,39],[3,42],[7,44],[12,44],[15,40],[18,40],[22,37],[26,38],[30,36],[35,36],[39,36],[43,33],[46,29],[47,24],[50,20],[54,20],[57,23],[58,25],[64,25],[68,23],[72,19],[74,13],[77,8],[80,13],[82,16],[86,20],[89,22],[93,20],[96,16],[98,12],[100,8],[103,6],[106,9],[108,14],[110,20],[116,23],[121,28],[120,32],[122,37],[126,35],[129,33],[135,34],[140,38],[142,42],[150,45],[156,51],[162,57],[170,60],[178,62],[170,64],[160,66],[150,68],[140,70],[130,72],[120,73],[110,74],[100,76],[90,74],[80,73],[72,72],[66,70],[60,68],[56,66],[52,64],[48,62],[42,60],[38,58],[40,56],[44,54],[48,52],[52,48],[50,44],[46,42],[42,44],[38,46],[40,48],[44,48],[48,46],[45,44],[42,40],[36,40],[32,38],[28,36],[24,36],[20,38],[16,40],[12,42],[8,44],[4,43],[0,43],[-4,44]], labelAt: null },
    { name: "日本列岛", pts: [[130,31],[132,33],[135,34],[138,35],[140,36],[141,39],[141,42],[140,44],[138,43],[136,40],[134,37],[132,35],[130,33]], labelAt: null },
    { name: "不列颠群岛", pts: [[-5,50],[-3,52],[-5,54],[-7,56],[-9,54],[-7,52]], labelAt: null },
    { name: "亚洲", pts: null, labelAt: [100,50] },
    { name: "欧洲", pts: null, labelAt: [20,52] },
    { name: "非洲", pts: [[-6,35],[0,36],[10,37],[11,34],[15,32],[20,32],[25,32],[30,31],[34,28],[35,24],[37,20],[40,16],[43,12],[48,11],[51,11],[51,9],[46,4],[42,-2],[40,-8],[37,-14],[35,-20],[33,-25],[30,-30],[26,-34],[20,-35],[18,-32],[15,-28],[13,-22],[12,-16],[13,-10],[10,-4],[9,1],[6,4],[0,5],[-6,4],[-11,6],[-14,9],[-17,13],[-17,18],[-16,23],[-13,28],[-10,31]], labelAt: [20,5] },
    { name: "大洋洲", pts: [[113,-22],[114,-26],[116,-30],[118,-34],[122,-34],[126,-33],[130,-32],[134,-34],[138,-36],[141,-38],[145,-38],[149,-37],[152,-34],[153,-30],[151,-26],[148,-22],[145,-19],[142,-16],[139,-13],[136,-12],[132,-11],[128,-13],[124,-15],[120,-18],[116,-21]], labelAt: [134,-27] },
    { name: "南极洲", pts: "pole-south", labelAt: [0,-80] }
  ];
  var D2R = Math.PI / 180, R2D = 180 / Math.PI;
  function globeProject(lon, lat, rot) {
    var lam = (lon - rot.lon) * D2R, phi = lat * D2R, phi1 = rot.lat * D2R;
    var cosc = Math.sin(phi1) * Math.sin(phi) + Math.cos(phi1) * Math.cos(phi) * Math.cos(lam);
    if (cosc <= 0.02) return null;
    return {
      x: Math.cos(phi) * Math.sin(lam),
      y: Math.cos(phi1) * Math.sin(phi) - Math.sin(phi1) * Math.cos(phi) * Math.cos(lam),
      cosc: cosc
    };
  }
  function globeInverse(sx, sy, rot) {
    /* sx,sy 为单位圆坐标（x 右，y 上）；返回 {lat, lon} 或 null（球外） */
    var rho = Math.hypot(sx, sy);
    if (rho > 1) return null;
    var phi1 = rot.lat * D2R;
    var c = Math.asin(Math.min(1, rho));
    var lat = Math.asin(Math.cos(c) * Math.sin(phi1) +
      (rho < 1e-9 ? 0 : sy * Math.sin(c) * Math.cos(phi1) / rho)) * R2D;
    var lon = rot.lon + Math.atan2(sx * Math.sin(c),
      rho * Math.cos(c) * Math.cos(phi1) - sy * Math.sin(c) * Math.sin(phi1)) * R2D;
    lon = ((lon + 540) % 360) - 180;
    return { lat: lat, lon: lon };
  }
  function greatCircle(a, b) {
    var p1 = a.lat * D2R, p2 = b.lat * D2R, dl = (a.lon - b.lon) * D2R;
    var c = Math.sin(p1) * Math.sin(p2) + Math.cos(p1) * Math.cos(p2) * Math.cos(dl);
    return Math.acos(Math.max(-1, Math.min(1, c))) * R2D;
  }

  function GlobeView(box, params, pg) {
    params = params || {};
    var P = {
      mode: params.mode === "find" ? "find" : "explore",
      targets: params.targets || [],
      graticuleStep: params.graticuleStep === 15 ? 15 : 30,
      showGraticule: params.showGraticule !== false,
      showLabels: params.showLabels !== false,
      polarView: !!params.polarView,
      tolerance: params.tolerance != null ? params.tolerance : 5,
      spinHint: params.spinHint !== false,
      labels: params.labels || null,
      recordKey: params.recordKey || ("geog_globe-spin_" + (pg && pg.id || "na"))
    };
    var wrap = w2wrap(box, "地球仪：拖一拖，转一转");
    var stage = makeStage(wrap, 1, "示意地球仪：拖拽旋转，点击球面读经纬度");
    honestyBadge(stage, "示意｜非精确比例｜方向仅供参考");
    var ro = readout(wrap);
    var self = this;
    var rot = { lon: 110, lat: 18 };   // 初始朝向亚洲东部
    var tap = null;                    // {lat, lon}
    var findIdx = 0, findDone = 0;
    var vel = 0, raf = 0, dragging = false, moved = 0, downT = 0, lastX = 0, lastY = 0;
    var hintEl = null;

    function drawPolyline(ctx, pts, S, cx, cy, close) {
      var pen = false;
      for (var i = 0; i < pts.length; i++) {
        var q = globeProject(pts[i][0], pts[i][1], rot);
        if (!q) { pen = false; continue; }
        var X = cx + q.x * S, Y = cy - q.y * S;
        if (!pen) { ctx.moveTo(X, Y); pen = true; }
        else ctx.lineTo(X, Y);
      }
      if (close && pen) ctx.closePath();
    }
    function draw() {
      var cv = stage.cv, ctx = cv.getContext("2d");
      var W = stage.w, dpr = stage.dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, W);
      var cx = W / 2, cy = W / 2, S = W * 0.44;
      var ocean = cssColor("--geog-ocean", "#DCEFFB");
      var landC = cssColor("--geog-land", "#BFD9A8");
      var gratC = cssColor("--geog-graticule", "#9AA5B1");
      var ink = cssColor("--geog-ink", "#1a1a1a");
      var soft = cssColor("--geog-ink-soft", "#4a4a4a");
      /* 海洋球体 */
      var g = ctx.createRadialGradient(cx - S * 0.35, cy - S * 0.35, S * 0.1, cx, cy, S);
      g.addColorStop(0, ocean); g.addColorStop(1, ocean);
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.arc(cx, cy, S, 0, 7); ctx.fill();
      ctx.strokeStyle = gratC; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.arc(cx, cy, S, 0, 7); ctx.stroke();
      /* 陆地示意多边形 */
      ctx.fillStyle = landC;
      CONTINENTS.forEach(function (c) {
        if (!c.pts) return;
        ctx.beginPath();
        if (c.pts === "pole-south") {
          for (var a = 0; a <= 360; a += 8) drawPolyline(ctx, [[a, -72]], S, cx, cy, false);
        } else drawPolyline(ctx, c.pts, S, cx, cy, true);
        ctx.fill();
      });
      /* 经纬网 */
      if (P.showGraticule) {
        ctx.strokeStyle = gratC; ctx.lineWidth = 1;
        var step = P.graticuleStep, i, pts;
        for (var lo = -180; lo < 180; lo += step) {
          pts = [];
          for (var la = -90; la <= 90; la += 3) pts.push([lo, la]);
          ctx.beginPath(); drawPolyline(ctx, pts, S, cx, cy, false); ctx.stroke();
        }
        for (la = -90 + step; la < 90; la += step) {
          pts = [];
          for (lo = -180; lo <= 180; lo += 3) pts.push([lo, la]);
          ctx.beginPath(); drawPolyline(ctx, pts, S, cx, cy, false); ctx.stroke();
        }
        /* 赤道加粗 */
        pts = [];
        for (lo = -180; lo <= 180; lo += 3) pts.push([lo, 0]);
        ctx.strokeStyle = cssColor("--geog-contour-hi", "#E69F00"); ctx.lineWidth = 2.2;
        ctx.beginPath(); drawPolyline(ctx, pts, S, cx, cy, false); ctx.stroke();
      }
      /* 标注：赤道/本初子午线/回归线/极圈（showLabels） */
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      function labelAt(lon, lat, text, color) {
        var q = globeProject(lon, lat, rot);
        if (!q || q.cosc < 0.25) return;   /* 临边不标，避免标签浮在球边上 */
        ctx.font = canvasFont("s78");
        ctx.fillStyle = color || soft;
        ctx.fillText(text, cx + q.x * S, cy - q.y * S);
      }
      if (P.showLabels) {
        labelAt(rot.lon, 4.5, "赤道 0°", cssColor("--geog-contour-hi", "#E69F00"));
        labelAt(3, -34, "本初子午线 0°", soft);
        labelAt(rot.lon - 62, 25.5, "回归线 23.5°", soft);
        labelAt(rot.lon + 62, -68.5, "极圈 66.5°", soft);
      }
      /* 大洲名（示意） */
      ctx.font = canvasFont("s78");
      ctx.fillStyle = soft;
      CONTINENTS.forEach(function (c) {
        if (!c.labelAt) return;
        if (P.labels && P.labels.indexOf(c.name) < 0) return;
        var q = globeProject(c.labelAt[0], c.labelAt[1], rot);
        if (!q || q.cosc < 0.25) return;   /* 临边不标 */
        ctx.fillText(c.name + (c.sub || ""), cx + q.x * S, cy - q.y * S);
      });
      /* 极点视角：自转方向箭头（北逆南顺，GEO-R37） */
      if (Math.abs(rot.lat) > 80) {
        var north = rot.lat > 0;
        ctx.strokeStyle = cssColor("--geog-highlight", "#F0E442"); ctx.lineWidth = 3;
        ctx.beginPath();
        var first = null, last = null;
        for (var k = -70; k <= 70; k += 4) {
          var qq = globeProject(rot.lon + k, north ? 52 : -52, rot);
          if (!qq) continue;
          var X = cx + qq.x * S, Y = cy - qq.y * S;
          if (!first) { ctx.moveTo(X, Y); first = { x: X, y: Y }; }
          else ctx.lineTo(X, Y);
          last = { x: X, y: Y, k: k };
        }
        ctx.stroke();
        if (last && first) { /* 箭头（沿经度增大方向 = 自转方向） */
          var q2 = globeProject(rot.lon + last.k - 6, north ? 52 : -52, rot);
          var ax = cx + q2.x * S, ay = cy - q2.y * S;
          var ang = Math.atan2(last.y - ay, last.x - ax);
          ctx.fillStyle = cssColor("--geog-highlight", "#F0E442");
          ctx.beginPath();
          ctx.moveTo(last.x, last.y);
          ctx.lineTo(last.x - 12 * Math.cos(ang - 0.42), last.y - 12 * Math.sin(ang - 0.42));
          ctx.lineTo(last.x - 12 * Math.cos(ang + 0.42), last.y - 12 * Math.sin(ang + 0.42));
          ctx.closePath(); ctx.fill();
        }
        ctx.font = canvasFont("s85");
        ctx.fillStyle = ink;
        ctx.fillText(north ? "北逆南顺：北极看，逆时针转" : "北逆南顺：南极看，顺时针转", cx, cy + S * 0.72);
      }
      /* 点选标记 */
      if (tap) {
        var tq = globeProject(tap.lon, tap.lat, rot);
        if (tq) {
          ctx.fillStyle = cssColor("--geog-target", "#D55E00");
          ctx.beginPath(); ctx.arc(cx + tq.x * S, cy - tq.y * S, 7, 0, 7); ctx.fill();
          ctx.strokeStyle = "#ffffff"; ctx.lineWidth = 2;
          ctx.beginPath(); ctx.arc(cx + tq.x * S, cy - tq.y * S, 10, 0, 7); ctx.stroke();
        }
      }
      /* find 模式：当前目标提示 */
      if (P.mode === "find" && P.targets.length) {
        ctx.font = canvasFont("s85"); ctx.textAlign = "left";
        ctx.fillStyle = ink;
        var t0 = P.targets[Math.min(findIdx, P.targets.length - 1)];
        ctx.fillText("找一找：" + t0.name + "（" + (findDone) + "/" + P.targets.length + "）", 10, 20);
      }
    }
    stage.draw = draw;

    function toUnit(e, cv) {
      var r = cv.getBoundingClientRect();
      var t = e.touches ? e.touches[0] : (e.changedTouches ? e.changedTouches[0] : e);
      var W = stage.w, cx = W / 2, cy = W / 2, S = W * 0.44;
      return { x: (t.clientX - r.left - cx) / S, y: (cy - (t.clientY - r.top)) / S, px: t.clientX - r.left, py: t.clientY - r.top };
    }
    var cv = stage.cv;
    cv.style.touchAction = "none";
    cv.addEventListener("pointerdown", function (e) {
      dragging = true; moved = 0; downT = Date.now();
      lastX = e.clientX; lastY = e.clientY; vel = 0;
      if (raf) { cancelAnimationFrame(raf); raf = 0; }
      try { cv.setPointerCapture(e.pointerId); } catch (err) {}
      if (hintEl) { hintEl.style.display = "none"; }
    });
    cv.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var dx = e.clientX - lastX, dy = e.clientY - lastY;
      lastX = e.clientX; lastY = e.clientY;
      moved += Math.abs(dx) + Math.abs(dy);
      var k = 180 / (Math.PI * stage.w * 0.44);
      rot.lon -= dx * k;
      rot.lon = ((rot.lon + 540) % 360) - 180;
      rot.lat = Math.max(-85, Math.min(85, rot.lat - dy * k));
      vel = -dx * k;
      draw();
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      if (moved < 6 && Date.now() - downT < 500) { handleTap(e); return; }
      /* 惯性缓动（≤600ms；reduced-motion 下跳过） */
      if (!reducedMotion && Math.abs(vel) > 0.05) {
        var t0 = Date.now();
        (function spin() {
          var dt = Date.now() - t0;
          if (dt > 600 || Math.abs(vel) < 0.03) { raf = 0; return; }
          rot.lon -= vel;
          rot.lon = ((rot.lon + 540) % 360) - 180;
          vel *= 0.93;
          draw();
          raf = requestAnimationFrame(spin);
        })();
      }
    }
    cv.addEventListener("pointerup", endDrag);
    cv.addEventListener("pointercancel", endDrag);
    function handleTap(e) {
      var u = toUnit(e, cv);
      var ll = globeInverse(u.x, u.y, rot);
      if (!ll) return;
      tap = { lat: Math.round(ll.lat), lon: Math.round(ll.lon) };
      draw();
      var badge = fmtLatLon(tap.lat, tap.lon);
      if (P.mode === "find" && P.targets.length && findIdx < P.targets.length) {
        var t = P.targets[findIdx];
        var d = greatCircle(tap, t);
        if (d <= P.tolerance) {
          findDone++; findIdx++;
          ro.innerHTML = '<span class="ok-t">✓ 找对了！</span>' + esc(t.name) + " ≈ " + esc(badge) +
            "（先纬后经）。";
          store(P.recordKey, { done: findDone, total: P.targets.length, ts: Date.now() });
          if (findIdx >= P.targets.length) {
            ro.innerHTML += " 全部找齐——经纬网是地球的“地址本”。";
          }
        } else {
          ro.innerHTML = '<span class="no-t">再转转，</span>从经纬网想想：' + esc(t.name) +
            "的地址是 " + esc(fmtLatLon(t.lat, t.lon)) + "（不扣分）。你点到了 " + esc(badge) + "。";
        }
        draw();
        return;
      }
      ro.textContent = "读数：" + badge + "（先纬后经）｜经线指示南北 · 纬线指示东西";
    }
    /* 工具行：经纬线开关 / 极点视角 */
    var tools = el("div", "geog-w2-row");
    var gBtn = el("button", "geog-btn" + (P.showGraticule ? " geog-btn-primary" : ""), "经纬线");
    gBtn.setAttribute("aria-label", "经纬线开关");
    gBtn.addEventListener("click", function () {
      P.showGraticule = !P.showGraticule;
      gBtn.classList.toggle("geog-btn-primary", P.showGraticule);
      draw();
    });
    tools.appendChild(gBtn);
    if (P.polarView) {
      [["北极俯视", 90], ["南极俯视", -90], ["复原", 18]].forEach(function (pv) {
        var b = el("button", "geog-btn", pv[0]);
        b.addEventListener("click", function () {
          rot.lat = pv[1]; draw();
          ro.textContent = pv[0] + "：经线汇到一点、纬线变成一圈圈——极点处方向按自转方向想，地图的右边会骗人。";
        });
        tools.appendChild(b);
      });
    }
    wrap.appendChild(tools);
    legend(wrap, [
      { text: "赤道 0°", cls: "" },
      { text: "经纬网", cls: "grat" }
    ]);
    axNote(wrap, "诚实清单：地球仪为教学示意图（示意｜非精确比例｜方向仅供参考）；陆地为示意色块，不画国界线；只看规律（纬线圈越往两极越小 / 经线都一样大），不量长度。");
    if (P.spinHint) {
      hintEl = el("div", "geog-w2-badge fs-078", "拖一拖，转地球");
      hintEl.style.left = "50%"; hintEl.style.transform = "translateX(-50%)";
      hintEl.style.top = "auto"; hintEl.style.bottom = "10px";
      stage.el.appendChild(hintEl);
      setTimeout(function () { if (hintEl) hintEl.style.display = "none"; }, 3000);
    }
    var view = {
      root: wrap,
      resize: function () { stage.resize(); },
      destroy: function () { untrack(view); if (raf) cancelAnimationFrame(raf); },
      state: function () {
        return {
          rotation: { lon: Math.round(rot.lon * 10) / 10, lat: Math.round(rot.lat * 10) / 10 },
          tap: tap ? { lat: tap.lat, lon: tap.lon } : null,
          find: P.mode === "find" ? { idx: findIdx, done: findDone, total: P.targets.length } : null
        };
      },
      labelFonts: function () { return [12.48, 13.6]; },
      _setRotation: function (lon, lat) {
        rot.lon = lon; rot.lat = lat; vel = 0;
        if (raf) { cancelAnimationFrame(raf); raf = 0; }
        draw();
      },
      _tapAt: function (lat, lon) { tap = { lat: Math.round(lat), lon: Math.round(lon) }; draw(); return tap; }
    };
    track(view);
    stage.resize();
    return view;
  }
  window.GEO.registerWidget("globe-spin", GlobeView);

  /* （文件继续：后续渲染器追加在本 IIFE 内，共享上方工具函数） */

  /* ============================================================
   * 2) scale-calc · 比例尺换算（convert / calc / compare）
   * ============================================================ */
  function denomOf(rep) {
    var m = String(rep).match(/1\s*:\s*(\d+)/);
    return m ? parseInt(m[1], 10) : null;
  }
  function ScaleView(box, params, pg) {
    params = params || {};
    var mode = params.mode || "calc";
    var scales = params.scales || [];
    var P = {
      tolerance: params.tolerance || "1%",
      recordKey: params.recordKey || ("geog_scale-calc_" + (pg && pg.id || "na"))
    };
    var wrap = w2wrap(box, mode === "compare" ? "比例尺：大详小略" :
      mode === "convert" ? "比例尺：三种表示，一回事" : "比例尺：图上 ↔ 实地换算");
    var ro = readout(wrap);
    var view;
    var MOTTO = "大详小略：分母越小、比例尺越大。";

    function checkTol(input, expected) {
      if (!(expected > 0)) return Math.abs(input - expected) < 1e-9;
      return Math.abs(input - expected) / expected <= 0.01 + 1e-9;
    }
    function fb(ok, right, extra) {
      return (ok ? '<span class="ok-t">✓ 对了。</span>' : '<span class="no-t">✗ 再算算。</span>') +
        (right ? esc(right) : "") + (extra ? " " + esc(extra) : "");
    }

    if (mode === "calc") {
      /* 分步：公式 → 代入 → 换算单位，每步可验证（GEO-R20 一步一示） */
      var sc = scales[0] || {};
      var denom = denomOf(sc.rep || "1:50000");
      var prob = params.problem || {};
      var mapCm = prob.mapDistCm != null ? prob.mapDistCm : 2;
      var want = calcScale(mapCm, denom);
      var unit = want.cm >= 100000 ? "km" : "m";
      var expectFinal = unit === "km" ? want.km : want.m;
      var steps = [];
      function mkStep(n, title, bodyHTML) {
        var s = el("div", "geog-w2-step" + (n > 1 ? " locked" : ""));
        s.appendChild(el("div", "st fs-100", esc(title)));
        var bd = el("div", "fs-095", bodyHTML);
        s.appendChild(bd);
        wrap.appendChild(s);
        steps.push(s);
        return { box: s, body: bd, unlock: function () { s.classList.remove("locked"); } };
      }
      var s1 = mkStep(1, "第①步 · 公式", "比例尺 = 图上距离 ÷ 实地距离。求实地距离，公式变形为：<br><strong>实地距离 = 图上距离 × 比例尺分母</strong>");
      var q1 = el("div", "geog-w2-row");
      ["图上距离 × 分母", "图上距离 ÷ 分母"].forEach(function (op, i) {
        var b = el("button", "geog-btn fs-095", esc(op));
        b.addEventListener("click", function () {
          var ok = i === 0;
          ro.innerHTML = fb(ok, ok ? "实地距离 = 图上距离 × " + denom + "。" : "", ok ? "" : "公式是“图上 ÷ 实地”，反过来求实地就用乘。");
          if (ok) { s2.unlock(); store(P.recordKey + "-s1", { ok: true, ts: Date.now() }); }
        });
        q1.appendChild(b);
      });
      s1.body.appendChild(el("div", "fs-095", "验一验：求实地距离用哪个？"));
      s1.body.appendChild(q1);
      var s2 = mkStep(2, "第②步 · 代入", "图上 " + mapCm + " 厘米，比例尺 " + esc(sc.rep || "1:50000") + "：<br>实地距离 = " + mapCm + " × " + denom + " = <strong>？</strong> 厘米");
      var in2 = el("input"); in2.type = "text"; in2.setAttribute("inputmode", "decimal");
      in2.setAttribute("aria-label", "代入计算结果（厘米）");
      var b2 = el("button", "geog-btn fs-095", "核对");
      b2.addEventListener("click", function () {
        var v = parseFloat(in2.value);
        var ok = isFinite(v) && checkTol(v, want.cm);
        ro.innerHTML = fb(ok, ok ? (mapCm + " × " + denom + " = " + want.cm + " 厘米。") : "", ok ? "" : "再乘一次：" + mapCm + " × " + denom + "。");
        if (ok) { s3.unlock(); store(P.recordKey + "-s2", { ok: true, ts: Date.now() }); }
      });
      var r2 = el("div", "geog-w2-row"); r2.appendChild(in2); r2.appendChild(b2);
      r2.appendChild(el("span", "fs-095", "厘米"));
      s2.body.appendChild(r2);
      var s3 = mkStep(3, "第③步 · 换算单位", "桥梁句：<strong>1 千米 = 100000 厘米</strong>（一步一示，不许跳步）。<br>" + want.cm + " 厘米 = <strong>？</strong> " + (unit === "km" ? "千米" : "米"));
      var in3 = el("input"); in3.type = "text"; in3.setAttribute("inputmode", "decimal");
      in3.setAttribute("aria-label", "换算结果");
      var b3 = el("button", "geog-btn fs-095", "核对");
      b3.addEventListener("click", function () {
        var v = parseFloat(in3.value);
        var ok = isFinite(v) && checkTol(v, expectFinal);
        ro.innerHTML = fb(ok,
          ok ? ("完整算式：图上 " + mapCm + "cm × " + denom + " = " + want.cm + "cm = " + expectFinal + (unit === "km" ? "千米" : "米") + "。") : "",
          ok ? "比例尺是比值，不是纸的大小。" : "桥梁句：1千米=100000厘米，再除一次。");
        if (ok) store(P.recordKey, { ok: true, ts: Date.now() });
      });
      var r3 = el("div", "geog-w2-row"); r3.appendChild(in3); r3.appendChild(b3);
      r3.appendChild(el("span", "fs-095", unit === "km" ? "千米" : "米"));
      s3.body.appendChild(r3);
      axNote(wrap, "口诀：" + MOTTO + "换算容差 ±1%（GEO-R21）。");
      view = {
        root: wrap, resize: function () {}, destroy: function () { untrack(view); },
        state: function () {
          return { mode: mode, denom: denom, mapDistCm: mapCm,
            expected: { cm: want.cm, final: expectFinal, unit: unit } };
        },
        labelFonts: function () { return []; },
        _answer: function (v) { in3.value = String(v); b3.click(); return ro.innerHTML; }
      };
    } else if (mode === "convert") {
      /* 三种表示互换：数字式 → 文字式填空 + 线段式读数 */
      var sc0 = scales[0] || {};
      var d0 = denomOf(sc0.rep || "1:50000");
      var expectText = scaleTextOf(d0);
      wrap.appendChild(el("div", "geog-w2-step",
        '<div class="st fs-100">数字式</div><div class="fs-125" style="font-weight:700">' +
        esc(sc0.rep || "1:50000") + "</div>"));
      var st2 = el("div", "geog-w2-step");
      st2.appendChild(el("div", "st fs-100", "写出文字式"));
      var inc = el("input"); inc.type = "text"; inc.style.width = "100%";
      inc.setAttribute("aria-label", "文字式");
      inc.setAttribute("placeholder", "图上 1 厘米代表实地……");
      var bc = el("button", "geog-btn fs-095", "核对");
      bc.addEventListener("click", function () {
        var norm = function (s) { return String(s).replace(/[\s　，,。；;：:]/g, ""); };
        var ok = norm(inc.value) === norm(expectText);
        ro.innerHTML = fb(ok, ok ? ("三式等价 ✓：" + expectText + "。") : "",
          ok ? "" : "提示：" + d0 + " 厘米 = " + (d0 / 100) + " 米。");
        if (ok) store(P.recordKey, { ok: true, ts: Date.now() });
      });
      var rc = el("div", "geog-w2-row"); rc.appendChild(inc); rc.appendChild(bc);
      st2.appendChild(rc);
      wrap.appendChild(st2);
      /* 线段式：4 段刻度，读第 2 刻度 */
      var st3 = el("div", "geog-w2-step");
      st3.appendChild(el("div", "st fs-100", "线段式读数"));
      var stage = makeStage(wrap, 5, "线段式比例尺：4 段刻度");
      stage.draw = function () {
        var cv = stage.cv, ctx = cv.getContext("2d");
        var W = stage.w, dpr = stage.dpr;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, W / 5);
        var y = W / 10, x0 = W * 0.08, x1 = W * 0.92;
        var segM = d0 / 100; /* 每段实地米数 */
        ctx.strokeStyle = cssColor("--geog-ink", "#1a1a1a"); ctx.lineWidth = 3;
        ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke();
        ctx.font = canvasFont("s85"); ctx.fillStyle = cssColor("--geog-ink", "#1a1a1a");
        ctx.textAlign = "center"; ctx.textBaseline = "top";
        for (var i = 0; i <= 4; i++) {
          var x = x0 + (x1 - x0) * i / 4;
          ctx.beginPath(); ctx.moveTo(x, y - 8); ctx.lineTo(x, y + 8); ctx.stroke();
          ctx.fillText(String(i * segM), x, y + 12);
        }
        ctx.fillText("米", x1 + 18, y + 12);
      };
      st3.appendChild(stage.el);
      var inb = el("input"); inb.type = "text"; inb.setAttribute("inputmode", "decimal");
      inb.setAttribute("aria-label", "第2刻度代表的实地距离（米）");
      var bb = el("button", "geog-btn fs-095", "核对");
      bb.addEventListener("click", function () {
        var v = parseFloat(inb.value);
        var ok = isFinite(v) && checkTol(v, 2 * d0 / 100);
        ro.innerHTML = fb(ok, ok ? "线段式第 2 刻度 = " + (2 * d0 / 100) + " 米——三种说法，一回事 ✓。" : "");
        if (ok) store(P.recordKey + "-bar", { ok: true, ts: Date.now() });
      });
      var rb = el("div", "geog-w2-row");
      rb.appendChild(el("span", "fs-095", "第 2 刻度代表实地"));
      rb.appendChild(inb); rb.appendChild(el("span", "fs-095", "米")); rb.appendChild(bb);
      st3.appendChild(rb);
      wrap.appendChild(st3);
      axNote(wrap, "三种表示等价（GEO-R20）：数字式 / 线段式 / 文字式说的是同一个比。");
      view = {
        root: wrap, resize: function () { stage.resize(); }, destroy: function () { untrack(view); },
        state: function () { return { mode: mode, denom: d0, expectText: expectText }; },
        labelFonts: function () { return [13.6]; },
        _answer: function (v) { inc.value = v; bc.click(); return ro.innerHTML; }
      };
    } else {
      /* compare：大详小略对比演示（示意） */
      var maps = params.compareMaps || [];
      var mA = maps[0] || { denom: 50000, label: "大比例尺：看得细、范围小" };
      var mB = maps[1] || { denom: 5000000, label: "小比例尺：看得略、范围大" };
      var loD = Math.min(mA.denom, mB.denom), hiD = Math.max(mA.denom, mB.denom);
      var cur = { denom: hiD };
      wrap.appendChild(el("div", "geog-w2-step",
        '<div class="st fs-100">' + esc(MOTTO) + "</div>" +
        '<div class="fs-095">拨滑块：分母变小 → 比例尺变大 → 范围框缩小、街道变多。</div>'));
      var cstage = makeStage(wrap, 1.15, "大详小略对比示意图");
      var sld = el("input"); sld.type = "range";
      sld.min = "0"; sld.max = "100"; sld.value = "100";
      sld.setAttribute("aria-label", "比例尺分母滑块：左小右大");
      var curLab = el("div", "fs-105", "");
      cstage.draw = function () {
        var cv = cstage.cv, ctx = cv.getContext("2d");
        var W = cstage.w, dpr = cstage.dpr, H = W / 1.15;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        var ink = cssColor("--geog-ink", "#1a1a1a");
        var soft = cssColor("--geog-ink-soft", "#4a4a4a");
        var hi = cssColor("--geog-highlight", "#F0E442");
        /* 城市底（示意）：街道网格，详细程度随分母 */
        ctx.fillStyle = cssColor("--geog-bg-soft", "#f6f4ee");
        ctx.fillRect(0, 0, W, H);
        var detail = 1 - (Math.log(cur.denom / loD) / Math.log(hiD / loD)); /* 0..1 */
        var n = 3 + Math.round(detail * 9);
        ctx.strokeStyle = soft; ctx.lineWidth = 1;
        for (var i = 1; i < n; i++) {
          var x = W * i / n;
          ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, H); ctx.stroke();
          var y = H * i / n;
          ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
        }
        /* 范围框：与分母成反比（示意） */
        var f = Math.pow(loD / cur.denom, 0.5);
        var bw = W * 0.92 * f, bh = H * 0.92 * f;
        ctx.strokeStyle = cssColor("--geog-target", "#D55E00"); ctx.lineWidth = 3;
        ctx.strokeRect((W - bw) / 2, (H - bh) / 2, bw, bh);
        ctx.font = canvasFont("s85"); ctx.fillStyle = ink;
        ctx.textAlign = "center"; ctx.textBaseline = "bottom";
        ctx.fillText("当前：1:" + cur.denom, W / 2, H - 8);
      };
      function syncCompare() {
        var t = parseInt(sld.value, 10) / 100;
        cur.denom = Math.round(loD * Math.pow(hiD / loD, t));
        var detail = 1 - t;
        curLab.innerHTML = "比例尺 <strong>1:" + cur.denom + "</strong> ｜ " +
          (cur.denom <= Math.sqrt(loD * hiD)
            ? "范围<strong>小</strong>、内容<strong>详细</strong>（大比例尺）"
            : "范围<strong>大</strong>、内容<strong>简略</strong>（小比例尺）");
        cstage.draw();
        ro.textContent = detail > 0.5
          ? "分母越小、比例尺越大 → 看得细，但范围小。"
          : "分母越大、比例尺越小 → 看得全，但内容略。";
      }
      sld.addEventListener("input", syncCompare);
      wrap.appendChild(sld); wrap.appendChild(curLab);
      honestyBadge(cstage, "示意｜非精确比例");
      axNote(wrap, "诚实清单：两幅对比为教学示意图（示意｜非精确比例）；只看“大详小略”的方向，不拿数字换算。" + MOTTO);
      syncCompare();
      view = {
        root: wrap, resize: function () { cstage.resize(); }, destroy: function () { untrack(view); },
        state: function () { return { mode: mode, denom: cur.denom }; },
        labelFonts: function () { return [13.6]; },
        _setDenom: function (d) {
          var t = Math.log(d / loD) / Math.log(hiD / loD);
          sld.value = String(Math.round(t * 100)); syncCompare();
        }
      };
    }
    track(view);
    return view;
  }
  window.GEO.registerWidget("scale-calc", ScaleView);

  /* ============================================================
   * 3) profile-draw · 地形剖面绘制（沿剖面线取样 → 描绘剖面）
   *
   * 真值：Eng.ContourField.elevationAt（与 contour-3d 同一数据源，
   * GEO-R30）；判分按场层真值；view.truth() 与 view.state() 分开上报。
   * ============================================================ */
  function ProfileView(box, params, pg) {
    params = params || {};
    var line = params.line || { from: [8, 52], to: [92, 52] };
    var N = params.samples || 7;
    var VEX = params.verticalExaggeration || 2;
    var TOL = params.toleranceM != null ? params.toleranceM : 40;
    var P = { recordKey: params.recordKey || ("geog_profile-draw_" + (pg && pg.id || "na")) };
    var field = new Eng.ContourField({
      interval: 50, waterLevel: 650,
      assumptions: Eng.ContourField.AX_DEFAULTS().assumptions,
      approximations: Eng.ContourField.AX_DEFAULTS().approximations,
      errorEstimate: Eng.ContourField.AX_DEFAULTS().errorEstimate
    });
    var wrap = w2wrap(box, "地形剖面：沿线取点，描出起伏");
    var flex = el("div", "geog-map-flex");
    wrap.appendChild(flex);
    var leftBox = el("div", ""); var rightBox = el("div", "");
    flex.appendChild(leftBox); flex.appendChild(rightBox);
    var mapStage = makeStage(leftBox, 1, "等高线图与剖面线（示意）");
    var proStage = makeStage(rightBox, 1, "剖面坐标纸：拖动采样点描绘起伏");
    honestyBadge(mapStage, "示意｜非精确比例");
    var ro = readout(wrap);

    /* 采样点：沿线等距 d（逻辑单位），真值高程由场函数给出 */
    var ax = line.from[0], ay = line.from[1], bx = line.to[0], by = line.to[1];
    var lineLen = Math.hypot(bx - ax, by - ay);
    var pts = [];
    for (var i = 0; i < N; i++) {
      var t = i / (N - 1);
      var x = ax + (bx - ax) * t, y = ay + (by - ay) * t;
      pts.push({ d: t * lineLen, x: x, y: y, truth: field.elevationAt(x, y), v: 0, locked: false });
    }
    var zMin = Math.min.apply(null, pts.map(function (p) { return p.truth; }));
    var zMax = Math.max.apply(null, pts.map(function (p) { return p.truth; }));
    zMin = Math.floor(zMin / 50) * 50 - 50; zMax = Math.ceil(zMax / 50) * 50 + 50;
    var submitted = false, score = 0;

    function truth() {
      return pts.map(function (p) { return { d: Math.round(p.d * 10) / 10, elev: Math.round(p.truth) }; });
    }
    function mapDraw() {
      var cv = mapStage.cv, ctx = cv.getContext("2d");
      var W = mapStage.w, dpr = mapStage.dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, W);
      var pad = 7, S = W / (100 + 2 * pad);
      function X(x) { return (x + pad) * S; }
      function Y(y) { return W - (y + pad) * S; }
      var contourC = cssColor("--geog-contour", "#1a1a1a");
      var hiC = cssColor("--geog-contour-hi", "#E69F00");
      var ink = cssColor("--geog-ink", "#1a1a1a");
      ctx.strokeStyle = contourC; ctx.lineWidth = 1.1;
      field.contoursForWater(650).forEach(function (cl) {
        ctx.beginPath();
        cl.paths.forEach(function (p) {
          p.pts.forEach(function (pt, k) {
            if (k === 0) ctx.moveTo(X(pt.x), Y(pt.y)); else ctx.lineTo(X(pt.x), Y(pt.y));
          });
        });
        ctx.stroke();
      });
      /* 剖面线 AB */
      ctx.strokeStyle = cssColor("--geog-target", "#D55E00"); ctx.lineWidth = 3;
      ctx.beginPath(); ctx.moveTo(X(ax), Y(ay)); ctx.lineTo(X(bx), Y(by)); ctx.stroke();
      ctx.font = canvasFont("s85"); ctx.fillStyle = ink;
      ctx.textAlign = "center";
      ctx.fillText("A", X(ax) - 12, Y(ay)); ctx.fillText("B", X(bx) + 12, Y(by));
      /* 采样点 */
      pts.forEach(function (p, k) {
        ctx.fillStyle = hiC;
        ctx.beginPath(); ctx.arc(X(p.x), Y(p.y), 6, 0, 7); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = ink; ctx.font = canvasFont("s78");
        ctx.fillText(String(k + 1), X(p.x), Y(p.y) - 11);
      });
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
      var L = 44, Rr = 12, T = 26, B = 40;
      function PX(d) { return L + (W - L - Rr) * (d / lineLen); }
      function PY(z) { return T + (H - T - B) * (1 - (z - zMin) / (zMax - zMin)); }
      /* 坐标纸 */
      ctx.strokeStyle = cssColor("--geog-graticule", "#9AA5B1"); ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(L, T); ctx.lineTo(L, H - B); ctx.lineTo(W - Rr, H - B); ctx.stroke();
      ctx.font = canvasFont("s78"); ctx.fillStyle = soft;
      ctx.textAlign = "right"; ctx.textBaseline = "middle";
      for (var z = zMin; z <= zMax; z += 100) {
        ctx.fillText(String(z) + "m", L - 4, PY(z));
        ctx.beginPath(); ctx.moveTo(L, PY(z)); ctx.lineTo(W - Rr, PY(z)); ctx.stroke();
      }
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillText("A", PX(0), H - B + 6); ctx.fillText("B", PX(lineLen), H - B + 6);
      ctx.textAlign = "left"; ctx.textBaseline = "bottom";
      ctx.fillText("垂直夸大 ×" + VEX + "（示意）·看趋势，不量高度", L, H - 4);
      /* 真值虚线（提交后对照） */
      if (submitted) {
        ctx.strokeStyle = okC; ctx.lineWidth = 2; ctx.setLineDash([6, 4]);
        ctx.beginPath();
        pts.forEach(function (p, k) {
          if (k === 0) ctx.moveTo(PX(p.d), PY(p.truth)); else ctx.lineTo(PX(p.d), PY(p.truth));
        });
        ctx.stroke(); ctx.setLineDash([]);
        ctx.font = canvasFont("s78"); ctx.fillStyle = okC;
        ctx.fillText("真值（场函数）", L + 4, T + 12);
      }
      /* 学生描绘线 */
      ctx.strokeStyle = hiC; ctx.lineWidth = 2.6;
      ctx.beginPath();
      pts.forEach(function (p, k) {
        if (k === 0) ctx.moveTo(PX(p.d), PY(p.v)); else ctx.lineTo(PX(p.d), PY(p.v));
      });
      ctx.stroke();
      pts.forEach(function (p, k) {
        var ok = submitted && Math.abs(p.v - p.truth) <= TOL;
        ctx.fillStyle = submitted ? (ok ? okC : cssColor("--geog-wrong", "#D55E00")) : hiC;
        ctx.beginPath(); ctx.arc(PX(p.d), PY(p.v), 9, 0, 7); ctx.fill();
        ctx.strokeStyle = "#fff"; ctx.lineWidth = 2; ctx.stroke();
        ctx.fillStyle = ink; ctx.font = canvasFont("s78");
        ctx.textAlign = "center"; ctx.textBaseline = "bottom";
        ctx.fillText(String(k + 1), PX(p.d), PY(p.v) - 12);
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
    function PYof(v, W, H) {
      var L = 44, Rr = 12, T = 26, B = 40;
      return T + (H - T - B) * (1 - (v - zMin) / (zMax - zMin));
    }
    proStage.cv.style.touchAction = "none";
    proStage.cv.addEventListener("pointerdown", function (e) {
      if (submitted) return;
      var p = proPos(e), W = proStage.w, H = W;
      var L = 44, Rr = 12;
      function PX(d) { return L + (W - L - Rr) * (d / lineLen); }
      for (var k = 0; k < pts.length; k++) {
        if (Math.hypot(p.x - PX(pts[k].d), p.y - PYof(pts[k].v, W, H)) < 20) { dragI = k; break; }
      }
      try { proStage.cv.setPointerCapture(e.pointerId); } catch (err) {}
    });
    proStage.cv.addEventListener("pointermove", function (e) {
      if (dragI < 0 || submitted) return;
      var p = proPos(e), W = proStage.w, H = W;
      var T = 26, B = 40;
      var frac = 1 - (p.y - T) / (H - T - B);
      frac = Math.max(0, Math.min(1, frac));
      pts[dragI].v = Math.round((zMin + frac * (zMax - zMin)) / 10) * 10;
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
        lines.push("点" + (k + 1) + "：你描 " + p.v + "m，真值 " + Math.round(p.truth) + "m，差 " + Math.round(err) + "m " + (ok ? "✓" : "✗"));
      });
      proDraw();
      ro.innerHTML = (score === N ? '<span class="ok-t">✓ 全对！</span>' : '<span class="no-t">' + score + "/" + N + " 点在容差内。</span>") +
        "判分口径：每点 |你的高程 − 场函数真值| ≤ " + TOL + "m。<br>" + esc(lines.join("；")) +
        "<br>绿色虚线是场函数真值——对照看：剖面线的起点终点、经过的山峰山谷，两张图是同一个地形（俯视图 ↔ 切面图）。";
      store(P.recordKey, { score: score, total: N, ts: Date.now() });
    });
    var resetBtn = el("button", "geog-btn fs-095", "重描");
    resetBtn.addEventListener("click", function () {
      submitted = false; score = 0;
      pts.forEach(function (p) { p.v = 0; });
      proDraw(); ro.textContent = "把每个采样点拖到你觉得对的高度，再提交。";
    });
    row.appendChild(subBtn); row.appendChild(resetBtn);
    wrap.appendChild(row);
    legend(wrap, [{ text: "等高线（等高距 50m）" }, { text: "剖面线 A→B" }]);
    axNote(wrap, "诚实清单：地形为教学示意模型（非真实 DEM）；剖面图<strong>垂直夸大 ×" + VEX + "（示意）</strong>——只看起伏趋势，不量高度；等高线与剖面高程由同一场函数生成（GEO-R30）。");
    var view = {
      root: wrap,
      resize: function () { mapStage.resize(); proStage.resize(); },
      destroy: function () { untrack(view); },
      truth: truth,
      state: function () {
        return {
          submitted: submitted, score: score, total: N, toleranceM: TOL,
          points: pts.map(function (p) {
            return { d: Math.round(p.d * 10) / 10, yours: p.v,
              truth: Math.round(p.truth), err: Math.round(Math.abs(p.v - p.truth)) };
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
  window.GEO.registerWidget("profile-draw", ProfileView);

  /* ============================================================
   * 4) climate-chart · 气候资料图判读器（以温定带 → 以水定型）
   * ============================================================ */
  function matchTypeId(zone, season, annual, hot) {
    if (zone === "热带" && season === "全年多雨") return "tropical-rainforest";
    if (zone === "热带" && season === "夏季多雨") return annual >= 1500 ? "tropical-monsoon" : "tropical-savanna";
    if (zone === "热带" && season === "全年少雨") return "tropical-desert";
    if (zone === "亚热带" && season === "夏季多雨") return "subtropical-monsoon";
    if (zone === "亚热带" && season === "冬季多雨") return "mediterranean";
    if (zone === "温带" && season === "全年较均匀") return "temperate-oceanic";
    if (zone === "温带" && season === "夏季多雨") return annual >= 400 ? "temperate-monsoon" : "temperate-continental";
    if (zone === "温带" && season === "全年少雨") return "temperate-continental";
    if (zone === "寒带") return hot > 0 ? "tundra" : "icecap";
    return null;
  }
  function typeNameOf(id) {
    var T = typeLib();
    return (T.map[id] && T.map[id].name) || "";
  }
  function ClimateView(box, params, pg) {
    params = params || {};
    var stations = params.stations ||
      ((window.GEOGRAPHY_DATA && window.GEOGRAPHY_DATA.climateStations || {}).stations) || [];
    var P = {
      mode: params.mode === "free" ? "free" : "guided",
      compareMode: !!params.compareMode,
      recordKey: params.recordKey || ("geog_climate-chart_" + (pg && pg.id || "na"))
    };
    var wrap = w2wrap(box, "气候判读：以温定带、以水定型");
    var ro = readout(wrap);
    var view;

    function yearLabel(st) {
      return st.name + " · " + (st.year || "年份缺失") + "（" + (st.dataKind || "") + "）";
    }
    function drawChart(stage, st) {
      stage.draw = function () {
        var cv = stage.cv, ctx = cv.getContext("2d");
        var W = stage.w, dpr = stage.dpr, H = W / 1.55;
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        ctx.clearRect(0, 0, W, H);
        var tempC = cssColor("--geog-temp", "#C0392B");
        var precC = cssColor("--geog-precip", "#0072B2");
        var ink = cssColor("--geog-ink", "#1a1a1a");
        var soft = cssColor("--geog-ink-soft", "#4a4a4a");
        var gridC = cssColor("--geog-graticule", "#9AA5B1");
        var L = 40, Rr = 44, T = 30, B = 34;
        var tMin = Math.min.apply(null, st.temp), tMax = Math.max.apply(null, st.temp);
        var pad = Math.max(4, (tMax - tMin) * 0.2);
        var pMax = Math.max.apply(null, st.precip) * 1.15;
        function TX(i) { return L + (W - L - Rr) * (i / 11); }
        function TY(t) { return T + (H - T - B) * (1 - (t - (tMin - pad)) / ((tMax + pad) - (tMin - pad))); }
        function PY(p) { return H - B - (H - T - B) * (p / pMax); }
        /* 降水柱 */
        var bw = (W - L - Rr) / 12 * 0.62;
        for (var i = 0; i < 12; i++) {
          ctx.fillStyle = precC;
          var bh = (H - T - B) * (st.precip[i] / pMax);
          ctx.fillRect(TX(i) - bw / 2, H - B - bh, bw, bh);
        }
        /* 气温曲线 */
        ctx.strokeStyle = tempC; ctx.lineWidth = 2.6;
        ctx.beginPath();
        for (i = 0; i < 12; i++) {
          if (i === 0) ctx.moveTo(TX(i), TY(st.temp[i])); else ctx.lineTo(TX(i), TY(st.temp[i]));
        }
        ctx.stroke();
        ctx.fillStyle = tempC;
        for (i = 0; i < 12; i++) { ctx.beginPath(); ctx.arc(TX(i), TY(st.temp[i]), 4.5, 0, 7); ctx.fill(); }
        /* 坐标轴与标签 */
        ctx.font = canvasFont("s78"); ctx.fillStyle = soft;
        ctx.textAlign = "center"; ctx.textBaseline = "top";
        for (i = 0; i < 12; i++) ctx.fillText(String(i + 1), TX(i), H - B + 6);
        ctx.textAlign = "right"; ctx.textBaseline = "middle";
        ctx.fillText(Math.round(tMax) + "℃", L - 4, TY(tMax));
        ctx.fillText(Math.round(tMin) + "℃", L - 4, TY(tMin));
        ctx.textAlign = "left";
        ctx.fillText(Math.round(pMax / 1.15) + "mm", W - Rr + 4, PY(pMax / 1.15));
        ctx.font = canvasFont("s85"); ctx.fillStyle = ink; ctx.textAlign = "left"; ctx.textBaseline = "bottom";
        ctx.fillText(yearLabel(st), L, 18);
        /* 几何信息存 stage 供点选 */
        stage._geom = { TX: TX, TY: TY, PY: PY, L: L, Rr: Rr, T: T, B: B, W: W, H: H, bw: bw };
      };
    }

    if (P.compareMode) {
      /* 三地对比：紧凑图 + 自动判读徽章（同一 judgeClimate 函数） */
      stations.forEach(function (st) {
        var card = el("div", "geog-w2-step");
        card.appendChild(el("div", "st fs-100", esc(st.name)));
        var stage = makeStage(card, 1.55, esc(st.name) + "气候资料图");
        drawChart(stage, st); stage.resize();
        var j = judgeClimate(st);
        card.appendChild(el("div", "fs-095",
          "判读：<strong>" + esc(j.zone) + "</strong> → <strong>" + esc(j.typeName) + "</strong>" +
          (j.via === "exception" ? "（口诀例外：看分布与成因）" : "") +
          (j.via === "plateau" ? "（看海拔，口诀之外）" : "")));
        wrap.appendChild(card);
        view = view || {};
        (view._stages = view._stages || []).push(stage);
      });
      legend(wrap, [{ text: "红=气温" }, { text: "蓝=降水", cls: "blue" }]);
      axNote(wrap, "多年平均数据读数写“约”（GEO-R54）；站点年份见图题（GEO-R16）。");
      view = {
        root: wrap,
        resize: function () { (view._stages || []).forEach(function (s) { s.resize(); }); },
        destroy: function () { untrack(view); },
        state: function () {
          return { mode: "compare", results: stations.map(function (st) { var j = judgeClimate(st); return { name: st.name, zone: j.zone, typeId: j.typeId }; }) };
        },
        labelFonts: function () { return [12.48, 13.6]; }
      };
      track(view);
      return view;
    }

    /* ---- 单站 guided / free ---- */
    var cur = 0;
    var tabs = el("div", "geog-w2-tabs");
    stations.forEach(function (st, i) {
      var b = el("button", "geog-btn fs-095" + (i === 0 ? " on" : ""), esc(st.name));
      b.addEventListener("click", function () { cur = i; resetSteps();
        Array.prototype.forEach.call(tabs.querySelectorAll("button"), function (x) { x.classList.remove("on"); });
        b.classList.add("on"); stage.resize(); });
      tabs.appendChild(b);
    });
    wrap.appendChild(tabs);
    var stage = makeStage(wrap, 1.55, "气候资料图：点气温曲线最低点");
    legend(wrap, [{ text: "红=气温" }, { text: "蓝=降水", cls: "blue" }]);
    var step1 = el("div", "geog-w2-step");
    step1.appendChild(el("div", "st fs-100", "第①步 · 以温定带"));
    step1.appendChild(el("div", "fs-095", "点气温曲线的<strong>最低点</strong>（最冷月）。"));
    var s1out = el("div", "fs-095"); step1.appendChild(s1out);
    var step2 = el("div", "geog-w2-step" + (P.mode === "guided" ? " locked" : ""));
    step2.appendChild(el("div", "st fs-100", "第②步 · 以水定型"));
    var s2hint = el("div", "fs-095", P.mode === "guided" ? "先完成第①步（灰化锁定中）。" : "点一根降水柱看年总量，再选季节分配（五选一）。");
    step2.appendChild(s2hint);
    var s2out = el("div", "fs-095"); step2.appendChild(s2out);
    var seasonRow = el("div", "geog-w2-row");
    SEASON_ENUM.forEach(function (s) {
      var b = el("button", "geog-btn fs-095", esc(s));
      b.addEventListener("click", function () { pickSeason(s); });
      seasonRow.appendChild(b);
    });
    step2.appendChild(seasonRow);
    wrap.appendChild(step1); wrap.appendChild(step2);
    axNote(wrap, "口诀「<strong>以温定带、以水定型</strong>」逐字；顺序不可反（GEO-R13）；年降水读数写“约”（GEO-R54）；站点年份见图题（GEO-R16）。");

    var done1 = null, done2 = null; /* {month,temp,zone} / {annual,season,typeId} */
    function st() { return stations[cur]; }
    function resetSteps() {
      done1 = null; done2 = null;
      s1out.textContent = ""; s2out.textContent = "";
      if (P.mode === "guided") step2.classList.add("locked");
      drawChart(stage, st()); stage.resize();
      ro.textContent = "先看温度带（第①步）。";
    }
    function coldestIdx() {
      var t = st().temp, m = 0;
      for (var i = 1; i < 12; i++) if (t[i] < t[m]) m = i;
      return m;
    }
    function clickStep1(i) {
      var s = st(), ci = coldestIdx();
      if (i !== ci) {
        ro.innerHTML = '<span class="no-t">再找找——</span>曲线的最低点（最冷月）在第几月？（不扣分）';
        return false;
      }
      var zr = judgeZone(s.temp);
      var zone = zr.zone, extra = "";
      if (s.needsRuling) {
        /* GEO-RULING-2026-10-17-04：口诀直读展示 + 例外路径 */
        var jx = judgeClimate(s);
        extra = "<br>口诀直读：" + esc(zr.zone) + "（最冷月 " + zr.cold + "℃，" + esc(zr.rule) + "）——" +
          "但这是<strong>口诀已知例外</strong>：看分布（40°–60° 大陆西岸）与成因（西风 + 暖流），定为<strong>温带</strong>。" +
          "<br><span class='fs-078'>" + esc(jx.note) + "</span>";
        zone = jx.zone;
      }
      done1 = { month: i, temp: s.temp[i], zone: zone, rule: zr.rule };
      s1out.innerHTML = "最冷月：<strong>" + (i + 1) + "月，" + s.temp[i] + "℃</strong> → 温度带徽章：<span class='geog-w2-badge2'>" +
        esc(zone) + "</span><span class='fs-078'>" + esc(zr.rule) + "</span>" + extra;
      step2.classList.remove("locked");
      s2hint.textContent = "点一根降水柱看年总量，再选季节分配（五选一）。";
      ro.innerHTML = '<span class="ok-t">✓ 定带完成：' + esc(zone) + "。</span>进第②步：点降水柱看年总量。";
      return true;
    }
    function clickStep2() {
      if (P.mode === "guided" && !done1) {
        ro.textContent = "先定带，再定型（第①步还没完成）。";
        return null;
      }
      var s = st();
      var annual = Math.round(s.precip.reduce(function (a, b) { return a + b; }, 0));
      s2out.innerHTML = "年降水 <strong>约 " + annual + "mm</strong>。再选季节分配（五选一）：";
      return annual;
    }
    function pickSeason(season) {
      if (P.mode === "guided" && !done1) {
        ro.innerHTML = '<span class="no-t">红线③：先看温度带</span>（第①步还没完成，不判错）。';
        return false;
      }
      var s = st();
      var annual = Math.round(s.precip.reduce(function (a, b) { return a + b; }, 0));
      var zone = done1 ? done1.zone : judgeClimate(s).zone;
      var hot = Math.max.apply(null, s.temp);
      var typeId, via = "motto";
      if (s.isPlateau) { typeId = "plateau-mountain"; }
      else if (s.needsRuling) { typeId = s.climateTypeId; via = "exception"; }
      else typeId = matchTypeId(zone, season, annual, hot);
      var tname = typeNameOf(typeId);
      if (!typeId) {
        ro.innerHTML = '<span class="no-t">这个组合在类型库里没有——</span>再想想季节分配（或回头检查温度带）。';
        return false;
      }
      var auto = judgeClimate(s);
      var match = (auto.typeId === typeId);
      done2 = { annual: annual, season: season, typeId: typeId, typeName: tname };
      s2out.innerHTML += "<br>类型徽章：<span class='geog-w2-badge2 ok'>" + esc(tname) + "</span>" +
        (via === "exception" ? "<span class='geog-w2-badge2 warn'>口诀例外</span>" : "") +
        (s.isPlateau ? "<span class='fs-078'>高原山地气候看海拔，口诀之外</span>" : "") +
        (match ? "" : "<br><span class='no-t'>与自动判读不一致（自动：" + esc(auto.typeName) + "）——再想想季节分配。</span>");
      ro.innerHTML = (match ? '<span class="ok-t">✓ 判读完成：</span>' : "已选：") +
        esc(zone) + " → " + esc(tname) + "（年降水约 " + annual + "mm，" + esc(season) + "）。";
      if (match) store(P.recordKey, { station: s.name, zone: zone, type: typeId, ts: Date.now() });
      return match;
    }
    /* canvas 点选 */
    stage.cv.style.touchAction = "manipulation";
    stage.cv.addEventListener("click", function (e) {
      var g = stage._geom;
      if (!g) return;
      var r = stage.cv.getBoundingClientRect();
      var px = e.clientX - r.left, py = e.clientY - r.top;
      var best = -1, bd = 1e9;
      for (var i = 0; i < 12; i++) {
        var d = Math.hypot(px - g.TX(i), py - g.TY(st().temp[i]));
        if (d < bd) { bd = d; best = i; }
      }
      if (bd < 30) { /* 点气温曲线 → 第①步 */
        if (!done1) { clickStep1(best); return; }
      }
      /* 点降水柱 → 第②步读数 */
      var bw = g.bw;
      for (var k = 0; k < 12; k++) {
        if (Math.abs(px - g.TX(k)) < bw) { clickStep2(); return; }
      }
    });
    view = {
      root: wrap,
      resize: function () { drawChart(stage, st()); stage.resize(); },
      destroy: function () { untrack(view); },
      state: function () {
        var s = st();
        return {
          station: s.name, mode: P.mode,
          step1: done1, step2: done2,
          auto: (function () { var j = judgeClimate(s); return { zone: j.zone, season: j.season, typeId: j.typeId, typeName: j.typeName, via: j.via }; })()
        };
      },
      labelFonts: function () { return [12.48, 13.6]; },
      _coldest: coldestIdx,
      _clickMonth: function (i) { return clickStep1(i); },
      _readAnnual: function () { return clickStep2(); },
      _pickSeason: function (s) { return pickSeason(s); },
      _switch: function (i) { cur = i; resetSteps(); }
    };
    track(view);
    resetSteps();
    return view;
  }
  window.GEO.registerWidget("climate-chart", ClimateView);

  /* ============================================================
   * 5) timezone-calc · 区时计算（四步冻结：定时区→定东西→加减→看日期）
   * ============================================================ */
  var TZ_DIRECTION_RULE = "东加西减的“东”，指东经度增大方向（地球自转方向），不是地图右边。";
  function TimezoneView(box, params, pg) {
    params = params || {};
    var cities = params.cities ||
      ((window.GEOGRAPHY_DATA && window.GEOGRAPHY_DATA.timezoneCities || {}).cities) || [];
    var P = {
      knownCity: params.knownCity || (cities[0] && cities[0].name) || "北京",
      knownTime: params.knownTime || { hour: 20, minute: 0 },
      knownDate: params.knownDate || null,   /* {month, day} 可选；无则用 当日/次日 */
      recordKey: params.recordKey || ("geog_timezone-calc_" + (pg && pg.id || "na"))
    };
    function cityOf(name) {
      for (var i = 0; i < cities.length; i++) if (cities[i].name === name) return cities[i];
      return null;
    }
    var wrap = w2wrap(box, "区时计算：定时区 → 定东西 → 加减 → 看日期");
    /* 已知时间输入 */
    var kr = el("div", "geog-w2-row fs-095");
    kr.appendChild(el("span", "", "已知：" + esc(P.knownCity)));
    var inH = el("input"); inH.type = "text"; inH.setAttribute("inputmode", "numeric");
    inH.value = P.knownTime.hour; inH.style.width = "64px"; inH.setAttribute("aria-label", "已知小时");
    var inM = el("input"); inM.type = "text"; inM.setAttribute("inputmode", "numeric");
    inM.value = P.knownTime.minute || 0; inM.style.width = "64px"; inM.setAttribute("aria-label", "已知分钟");
    kr.appendChild(inH); kr.appendChild(el("span", "", ":")); kr.appendChild(inM);
    wrap.appendChild(kr);
    /* 时区盘（canvas）+ 城市列表备选点选（390px 补偿，GEO-R 类 WARN 口径） */
    var dial = makeStage(wrap, 1, "时区盘：24 个时区，方向箭头按经度增大方向");
    var cityRow = el("div", "geog-w2-tabs");
    var target = null;
    function znorm(v) { return v === 12 ? -12 : v; }  /* ＋12 与 −12 为同一时区 */
    function pickCity(name) {
      target = name;
      Array.prototype.forEach.call(cityRow.querySelectorAll("button"), function (x) {
        x.classList.toggle("on", x.textContent === name);
      });
      resetSteps(); dial.draw();
    }
    cities.forEach(function (c) {
      if (c.name === P.knownCity) return;
      var b = el("button", "geog-btn fs-085", esc(c.name));
      b.addEventListener("click", function () { pickCity(c.name); });
      cityRow.appendChild(b);
    });
    wrap.appendChild(cityRow);
    /* 时区盘扇形点选（G6 spec：24 时区盘可点选；城市列表为备选）：
     * 点某扇形 → 选中该时区城市（多城则轮选）；命中圈 R*0.15–R*1.3。 */
    dial.cv.addEventListener("click", function (e) {
      var r = dial.cv.getBoundingClientRect();
      if (!r.width) return;
      var px = e.clientX - r.left, py = e.clientY - r.top;
      var c0 = r.width / 2, R = r.width * 0.42;
      var dx = px - c0, dy = py - c0;
      var dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < R * 0.15 || dist > R * 1.3) return;
      var ang = Math.atan2(dy, dx);  /* canvas 坐标系（y 向下），与绘制一致 */
      var t = (ang + Math.PI / 2) / (Math.PI * 2) * 24;
      var z = Math.floor(t) - 12;
      z = ((z + 12) % 24 + 24) % 24 - 12;
      var cands = cities.filter(function (c) { return c.name !== P.knownCity && znorm(c.zone) === z; });
      if (!cands.length) return;
      var idx = 0;
      for (var i = 0; i < cands.length; i++) if (cands[i].name === target) { idx = (i + 1) % cands.length; break; }
      pickCity(cands[idx].name);
    });
    var ro = readout(wrap);

    function knownMin() {
      var h = parseInt(inH.value, 10), m = parseInt(inM.value, 10);
      if (!isFinite(h) || h < 0 || h > 23) h = P.knownTime.hour;
      if (!isFinite(m) || m < 0 || m > 59) m = 0;
      return h * 60 + m;
    }
    dial.draw = function () {
      var cv = dial.cv, ctx = cv.getContext("2d");
      var W = dial.w, dpr = dial.dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, W, W);
      var cx = W / 2, cy = W / 2, R = W * 0.42;
      var known = cityOf(P.knownCity), tgt = target ? cityOf(target) : null;
      var gratC = cssColor("--geog-graticule", "#9AA5B1");
      var ink = cssColor("--geog-ink", "#1a1a1a");
      var soft = cssColor("--geog-ink-soft", "#4a4a4a");
      /* 24 扇形（+12 与 −12 为同一时区，统一画在顶部扇形） */
      function zn(v) { return v === 12 ? -12 : v; }
      for (var z = -12; z < 12; z++) {
        var a0 = (z + 12) / 24 * Math.PI * 2 - Math.PI / 2;
        var a1 = (z + 13) / 24 * Math.PI * 2 - Math.PI / 2;
        var isK = known && zn(known.zone) === z;
        var isT = tgt && zn(tgt.zone) === z;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        ctx.arc(cx, cy, R, a0, a1); ctx.closePath();
        ctx.fillStyle = isK ? cssColor("--geog-precip", "#0072B2") :
          isT ? cssColor("--geog-target", "#D55E00") : cssColor("--geog-bg-soft", "#f6f4ee");
        ctx.globalAlpha = (isK || isT) ? 0.85 : 1;
        ctx.fill(); ctx.globalAlpha = 1;
        ctx.strokeStyle = gratC; ctx.lineWidth = 1; ctx.stroke();
        if (z % 3 === 0) {
          var am = (a0 + a1) / 2;
          ctx.font = canvasFont("s78"); ctx.fillStyle = soft;
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          var zl = z === -12 ? "±12" : (z === 0 ? "0" : (z > 0 ? "+" + z : "" + z));
          ctx.fillText(zl, cx + Math.cos(am) * R * 0.72, cy + Math.sin(am) * R * 0.72);
        }
      }
      ctx.font = canvasFont("s85"); ctx.fillStyle = ink; ctx.textAlign = "center";
      ctx.fillText("时区盘（整小时）", cx, cy - 6);
      ctx.font = canvasFont("s78"); ctx.fillStyle = soft;
      ctx.fillText("已知：" + P.knownCity, cx, cy + 14);
      if (tgt) ctx.fillText("目标：" + tgt.name, cx, cy + 32);
      /* 方向箭头：沿经度增大方向（自转方向），画在盘上（GEO-R08） */
      if (known && tgt) {
        var r = calcTimezone(known.zone, 0, tgt.zone);
        var dirEast = r.east;
        /* 已知时区角 → 目标时区角，沿选定方向画弧 */
        function angOf(z) { return ((z + 12) % 24) / 24 * Math.PI * 2 - Math.PI / 2; }
        var aK = angOf(known.zone), aT = angOf(tgt.zone);
        var sweep = dirEast ? 1 : -1;
        var da = aT - aK;
        if (sweep > 0 && da < 0) da += Math.PI * 2;
        if (sweep < 0 && da > 0) da -= Math.PI * 2;
        ctx.strokeStyle = cssColor("--geog-highlight", "#F0E442"); ctx.lineWidth = 4;
        ctx.beginPath(); ctx.arc(cx, cy, R * 1.06, aK, aK + da, sweep < 0); ctx.stroke();
        var ea = aK + da;
        var ex = cx + Math.cos(ea) * R * 1.06, ey = cy + Math.sin(ea) * R * 1.06;
        var tang = ea + (sweep > 0 ? Math.PI / 2 : -Math.PI / 2);
        ctx.fillStyle = cssColor("--geog-highlight", "#F0E442");
        ctx.beginPath();
        ctx.moveTo(ex, ey);
        ctx.lineTo(ex - 14 * Math.cos(tang - 0.4), ey - 14 * Math.sin(tang - 0.4));
        ctx.lineTo(ex - 14 * Math.cos(tang + 0.4), ey - 14 * Math.sin(tang + 0.4));
        ctx.closePath(); ctx.fill();
        ctx.font = canvasFont("s85"); ctx.fillStyle = ink;
        var ma = aK + da / 2;
        var dh = tgt.zone - known.zone;
        ctx.fillText((dirEast ? "东" : "西") + " " + (dh >= 0 ? "+" : "−") + Math.abs(dh) + "h",
          cx + Math.cos(ma) * R * 1.24, cy + Math.sin(ma) * R * 1.24);
      }
    };
    /* 四步卡 */
    var steps = [];
    function mkStep(n, title) {
      var s = el("div", "geog-w2-step" + (n > 1 ? " locked" : ""));
      s.appendChild(el("div", "st fs-100", esc(title)));
      var bd = el("div", "fs-095"); s.appendChild(bd);
      wrap.appendChild(s); steps.push(s);
      return { box: s, body: bd, unlock: function () { s.classList.remove("locked"); } };
    }
    var s1 = mkStep(1, "第①步 · 定时区");
    var s2 = mkStep(2, "第②步 · 定东西");
    var s3 = mkStep(3, "第③步 · 加减小时");
    var s4 = mkStep(4, "第④步 · 看日期");
    var calc = null;
    function resetSteps() {
      calc = null;
      [s2, s3, s4].forEach(function (s) { s.box.classList.add("locked"); s.body.innerHTML = ""; });
      s1.body.innerHTML = "";
      ro.textContent = target ? "点第①步开始。" : "先选一个目标城市。";
      if (target) buildS1();
    }
    function fmtHM(min) {
      var h = Math.floor(min / 60), m = min % 60;
      return (h < 10 ? "0" + h : "" + h) + ":" + (m < 10 ? "0" + m : "" + m);
    }
    /* 目标时间读数 MathML（G6 任务书要求）：20:00 + 1h = 21:00 */
    function mathMLReadout(knownHM, east, dh, resultHM) {
      return '<math xmlns="http://www.w3.org/1998/Math/MathML" style="font-size:1.05rem">' +
        '<mrow><mtext>' + esc(knownHM) + '</mtext><mo>' + (east ? "+" : "\u2212") + '</mo>' +
        '<mtext>' + Math.abs(dh) + 'h</mtext><mo>=</mo><mtext>' + esc(resultHM) + '</mtext></mrow></math>';
    }
    function buildS1() {
      var known = cityOf(P.knownCity), tgt = cityOf(target);
      if (!known || !tgt) return;
      s1.body.innerHTML = esc(P.knownCity) + "：<strong>" + (known.zone >= 0 ? "东" : "西") +
        Math.abs(known.zone) + "区</strong>；" + esc(target) + "：<strong>" +
        (tgt.zone >= 0 ? "东" : "西") + Math.abs(tgt.zone) + "区</strong>。";
      var row = el("div", "geog-w2-row");
      row.appendChild(el("span", "", "两地时区差 = "));
      var inp = el("input"); inp.type = "text"; inp.setAttribute("inputmode", "numeric");
      inp.style.width = "72px"; inp.setAttribute("aria-label", "时区差（小时）");
      var btn = el("button", "geog-btn fs-095", "核对");
      btn.addEventListener("click", function () {
        var v = parseFloat(inp.value);
        var exp = Math.abs(tgt.zone - known.zone);
        var ok = isFinite(v) && Math.abs(v - exp) < 1e-9;
        ro.innerHTML = ok
          ? '<span class="ok-t">✓ </span>时区差 ' + exp + " 小时。进第②步。"
          : '<span class="no-t">✗ 再算算：</span>|' + tgt.zone + " − (" + known.zone + ")| = ？";
        if (ok) { calc = calcTimezone(known.zone, knownMin(), tgt.zone); s2.unlock(); buildS2(); }
      });
      row.appendChild(inp); row.appendChild(el("span", "", "小时")); row.appendChild(btn);
      s1.body.appendChild(row);
    }
    function buildS2() {
      var known = cityOf(P.knownCity), tgt = cityOf(target);
      s2.body.innerHTML = "<span class='fs-078'>" + esc(TZ_DIRECTION_RULE) + "</span><br>" +
        esc(target) + " 在 " + esc(P.knownCity) + " 的 <strong>？</strong> 边（看时区盘上的箭头）：";
      var row = el("div", "geog-w2-row");
      ["东", "西"].forEach(function (d) {
        var b = el("button", "geog-btn fs-095", d + "边");
        b.addEventListener("click", function () {
          var exp = calc.east ? "东" : (calc.west ? "西" : "同");
          var ok = d === exp;
          ro.innerHTML = ok
            ? '<span class="ok-t">✓ ' + esc(target) + "在" + exp + "边</span>——时区 " + (tgt.zone >= 0 ? "+" : "") + tgt.zone + " 比 " + (known.zone >= 0 ? "+" : "") + known.zone + " " + (calc.east ? "大" : "小") + "，沿经度" + (calc.east ? "增大" : "减小") + "方向（自转方向）在" + exp + "。进第③步。"
            : '<span class="no-t">✗ 看箭头：</span>箭头画在时区盘上，沿经度增大方向走——不是看地图左右。';
          if (ok) { s3.unlock(); buildS3(); dial.draw(); }
        });
        row.appendChild(b);
      });
      s2.body.appendChild(row);
    }
    function buildS3() {
      var op = calc.east ? "＋" : "－";
      s3.body.innerHTML = "东加西减：" + esc(fmtHM(knownMin())) + " " + op + " " + Math.abs(calc.diffHours) +
        "h = <strong>？</strong>";
      var row = el("div", "geog-w2-row");
      var inp = el("input"); inp.type = "text"; inp.style.width = "96px";
      inp.setAttribute("placeholder", "HH:MM"); inp.setAttribute("aria-label", "计算结果时间");
      var btn = el("button", "geog-btn fs-095", "核对");
      btn.addEventListener("click", function () {
        var ok = String(inp.value).replace(/\s/g, "") === calc.timeStr;
        ro.innerHTML = ok
          ? '<span class="ok-t">✓ </span>' + mathMLReadout(fmtHM(knownMin()), calc.east, calc.diffHours, calc.timeStr) + "。进第④步看日期。"
          : '<span class="no-t">✗ 再算算：</span>“东加”还是“西减”，看第②步的结论。';
        if (ok) { s4.unlock(); buildS4(); }
      });
      row.appendChild(inp); row.appendChild(btn);
      s3.body.appendChild(row);
    }
    function buildS4() {
      var dateStr;
      if (P.knownDate) {
        var dd = P.knownDate.day + calc.dayOffset;
        dateStr = P.knownDate.month + "月" + dd + "日";
      } else {
        dateStr = calc.dayOffset > 0 ? "次日" : (calc.dayOffset < 0 ? "前日" : "当日");
      }
      s4.body.innerHTML = "答案：<strong>" + esc(dateStr) + "</strong> " +
        mathMLReadout(fmtHM(knownMin()), calc.east, calc.diffHours, calc.timeStr) +
        "（" + esc(target) + " 区时）。";
      if (calc.crossed180) {
        /* GEO-R10：警示不可关 */
        var al = el("div", "geog-w2-alert fs-095");
        al.innerHTML = "⚠ <strong>跨 180° 经线（日界线）提示：</strong>两地时区差 " +
          Math.abs(calc.diffHours) + " 小时（> 12 小时），计算路径越过了日界线。<br>" +
          "记住：自西向东越过日界线，日期<strong>减</strong>一天；自东向西越过，日期<strong>加</strong>一天。" +
          "本题用“加减小时”直接算出日期——两种算法结果一致。";
        s4.body.appendChild(al);
      }
      ro.innerHTML = '<span class="ok-t">✓ 四步走完。</span>';
      store(P.recordKey, { target: target, result: dateStr + " " + calc.timeStr, ts: Date.now() });
    }
    axNote(wrap, "北京时间 = <strong>东八区区时</strong>，不是北京的地方时（GEO-R11）。初中默认只算区时（整小时）；地方时精确到分是高中扩展（GEO-R12）。");
    dial.resize();
    var view = {
      root: wrap,
      resize: function () { dial.resize(); },
      destroy: function () { untrack(view); },
      state: function () {
        return {
          known: { city: P.knownCity, time: fmtHM(knownMin()) },
          target: target,
          steps: steps.map(function (d, i) { return { n: i + 1, unlocked: !d.classList.contains("locked") }; }),
          result: calc ? { timeStr: calc.timeStr, dayOffset: calc.dayOffset, crossed180: calc.crossed180 } : null
        };
      },
      labelFonts: function () { return [12.48, 13.6]; },
      _pick: function (name) {
        var btns = cityRow.querySelectorAll("button");
        for (var i = 0; i < btns.length; i++) {
          if (btns[i].textContent === name) { btns[i].click(); return true; }
        }
        return false;
      },
      _calc: function () {
        var known = cityOf(P.knownCity), tgt = cityOf(target);
        return calcTimezone(known.zone, knownMin(), tgt.zone);
      }
    };
    track(view);
    return view;
  }
  window.GEO.registerWidget("timezone-calc", TimezoneView);

  /* ============================================================
   * 6) plate-puzzle · 板块拼图（drift 拼合 / plates 六大板块）
   * ============================================================ */
  var SVGNS = "http://www.w3.org/2000/svg";
  function svgEl(tag, attrs) {
    var n = document.createElementNS(SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  /* 示意大陆拼块（局部坐标，y 向上；简化轮廓，无国界线 GEO-R23） */
  var DRIFT_PIECES = {
    sa: { name: "南美洲", color: "var(--geog-plate-america)",
      pts: [[-8,18],[-2,20],[6,18],[10,12],[12,4],[10,-4],[6,-10],[2,-14],[-2,-16],[-6,-12],[-8,-6],[-10,2],[-9,10]] },
    af: { name: "非洲", color: "var(--geog-plate-africa)",
      pts: [[-10,14],[-2,16],[6,15],[10,10],[11,2],[8,-6],[4,-12],[-2,-15],[-8,-12],[-11,-4],[-12,4],[-11,10]] }
  };
  var PLATES = [
    { id: "asia", name: "亚欧板块", color: "var(--geog-plate-asia)", x: 38, y: 40, w: 26, h: 13 },
    { id: "africa", name: "非洲板块", color: "var(--geog-plate-africa)", x: 34, y: 22, w: 20, h: 15 },
    { id: "indian", name: "印度洋板块", color: "var(--geog-plate-indian)", x: 56, y: 15, w: 17, h: 11 },
    { id: "pacific", name: "太平洋板块", color: "var(--geog-plate-pacific)", x: 72, y: 24, w: 22, h: 28 },
    { id: "america", name: "美洲板块", color: "var(--geog-plate-america)", x: 6, y: 18, w: 24, h: 26 },
    { id: "antarctica", name: "南极洲板块", color: "var(--geog-plate-antarctica)", x: 20, y: 4, w: 60, h: 9 }
  ];
  function PlateView(box, params, pg) {
    params = params || {};
    var mode = params.mode === "plates" ? "plates" : "drift";
    var P = {
      pieces: params.pieces || [{ id: "sa" }, { id: "af" }],
      evidences: params.evidences || [
        { kind: "fossil", label: "中龙化石：两岸都有", at: [48, 42] },
        { kind: "strata", label: "岩层：拼合处连续", at: [48, 31] },
        { kind: "glacier", label: "冰川痕迹：都在南半球", at: [48, 20] }
      ],
      boundaries: params.boundaries || [
        { kind: "convergent", label: "喜马拉雅山：碰撞挤压", at: [58, 38] },
        { kind: "divergent", label: "大西洋中脊：张裂", at: [32, 30] },
        { kind: "convergent", label: "环太平洋西缘：挤压", at: [70, 42] }
      ],
      driftAnim: params.driftAnim !== false,
      rateNote: "板块一年移动几厘米——指甲长的速度",   /* 冻结（GEO-R55/B9） */
      recordKey: params.recordKey || ("geog_plate-puzzle_" + (pg && pg.id || "na"))
    };
    var wrap = w2wrap(box, mode === "drift" ? "大陆漂移：把两块大陆拼回去" : "六大板块：看边界在“挤”还是“裂”");
    var stage = el("div", "geog-w2-stage");
    wrap.appendChild(stage);
    var svg = svgEl("svg", { viewBox: "0 0 100 62", role: "img" });
    svg.setAttribute("aria-label", mode === "drift" ? "大陆拼图：拖动南美洲、非洲拼块" : "六大板块示意图");
    stage.appendChild(svg);
    svg.style.touchAction = "none";
    honestyBadge({ el: stage }, "示意｜非精确比例");
    var ro = readout(wrap);
    var view;
    var W2Y = function (y) { return 62 - y; };   /* y向上 → SVG y向下 */

    if (mode === "drift") {
      var world = svgEl("g", { transform: "translate(0,62) scale(1,-1)" });
      svg.appendChild(world);
      var labG = svgEl("g", {}); svg.appendChild(labG);
      var HOME = { sa: { x: 15, y: 31 }, af: { x: 83, y: 31 } };
      var SLOT = { sa: { x: 37, y: 31 }, af: { x: 61, y: 31 } };
      var pieces = {}, evG = null, evLit = [false, false, false], bothDone = false;
      function pathOf(pts) {
        return "M" + pts.map(function (p) { return p[0] + "," + p[1]; }).join("L") + "Z";
      }
      P.pieces.forEach(function (pc) {
        var def = DRIFT_PIECES[pc.id];
        if (!def) return;
        var slot = svgEl("path", { d: pathOf(def.pts), fill: "none",
          stroke: cssColor("--geog-graticule", "#9AA5B1"), "stroke-width": 1.2, "stroke-dasharray": "4,3" });
        var sg = svgEl("g", { transform: "translate(" + SLOT[pc.id].x + "," + SLOT[pc.id].y + ")" });
        sg.appendChild(slot); world.appendChild(sg);
        var g = svgEl("g", {});
        var path = svgEl("path", { d: pathOf(def.pts), fill: def.color,
          stroke: cssColor("--geog-ink", "#1a1a1a"), "stroke-width": 1.4, opacity: 0.92 });
        g.appendChild(path);
        var label = svgEl("text", { x: 0, y: W2Y(0), "text-anchor": "middle", "font-size": 4.4,
          fill: cssColor("--geog-ink", "#1a1a1a") });
        label.textContent = def.name;
        labG.appendChild(label);
        world.appendChild(g);
        pieces[pc.id] = { id: pc.id, g: g, label: label, x: HOME[pc.id].x, y: HOME[pc.id].y, snapped: false };
        syncPiece(pc.id);
      });
      function syncPiece(id) {
        var p = pieces[id];
        var inner = p.g.firstChild;
        p.g.setAttribute("transform", "translate(" + p.x + "," + p.y + ")");
        /* 标签放在非翻转组：手动换算 y */
        p.label.setAttribute("x", p.x);
        p.label.setAttribute("y", W2Y(p.y - 21));   /* 标签放拼块下方，避开左上示意徽章 */
        if (p.snapped) inner.setAttribute("stroke", cssColor("--geog-correct", "#009E73"));
      }
      /* 拖拽 */
      var dragId = null, dOff = null;
      function svgPos(e) {
        var r = svg.getBoundingClientRect();
        var t = e.touches ? e.touches[0] : (e.changedTouches ? e.changedTouches[0] : e);
        return { x: (t.clientX - r.left) / r.width * 100, y: 62 - (t.clientY - r.top) / r.height * 62 };
      }
      Object.keys(pieces).forEach(function (id) {
        var p = pieces[id];
        p.g.addEventListener("pointerdown", function (e) {
          if (p.snapped) return;
          var s = svgPos(e);
          dragId = id; dOff = { x: s.x - p.x, y: s.y - p.y };
          try { e.target.setPointerCapture(e.pointerId); } catch (err) {}
          e.preventDefault();
        });
      });
      svg.addEventListener("pointermove", function (e) {
        if (!dragId) return;
        var s = svgPos(e), p = pieces[dragId];
        p.x = Math.max(8, Math.min(92, s.x - dOff.x));
        p.y = Math.max(8, Math.min(54, s.y - dOff.y));
        syncPiece(dragId);
      });
      function endDrag() {
        if (!dragId) return;
        var p = pieces[dragId], id = dragId; dragId = null;
        var d = Math.hypot(p.x - SLOT[id].x, p.y - SLOT[id].y);
        if (d <= 8) {
          p.x = SLOT[id].x; p.y = SLOT[id].y; p.snapped = true;
          syncPiece(id);
          ro.innerHTML = '<span class="ok-t">严丝合缝 ✓ </span>' +
            esc(DRIFT_PIECES[id].name) + "拼好了。";
          checkBoth();
        } else {
          ro.textContent = "再挪挪——让两块大陆的海岸线对齐（靠近虚线框会自动吸附）。";
        }
      }
      svg.addEventListener("pointerup", endDrag);
      svg.addEventListener("pointercancel", endDrag);
      function checkBoth() {
        if (bothDone) return;
        var all = Object.keys(pieces).every(function (id) { return pieces[id].snapped; });
        if (!all) return;
        bothDone = true;
        evG = svgEl("g", { transform: "translate(0,62) scale(1,-1)" });
        svg.appendChild(evG);
        P.evidences.forEach(function (ev, i) {
          var c = svgEl("circle", { cx: ev.at[0], cy: ev.at[1], r: 3,
            fill: cssColor("--geog-highlight", "#F0E442"),
            stroke: cssColor("--geog-ink", "#1a1a1a"), "stroke-width": 1 });
          c.style.cursor = "pointer";
          c.addEventListener("click", function () {
            evLit[i] = true;
            ro.innerHTML = "证据" + (i + 1) + "：" + esc(ev.label) + "。";
            c.setAttribute("stroke", cssColor("--geog-correct", "#009E73"));
            c.setAttribute("stroke-width", 2.5);
          });
          /* 热区外扩 */
          var hit = svgEl("circle", { cx: ev.at[0], cy: ev.at[1], r: 6.5, fill: "transparent" });
          hit.style.cursor = "pointer";
          hit.addEventListener("click", function () { c.dispatchEvent(new Event("click")); });
          evG.appendChild(hit); evG.appendChild(c);
        });
        ro.innerHTML = '<span class="ok-t">✓ 拼合完成！</span>三处证据点亮了——点一点，看它们说什么。';
        store(P.recordKey, { done: true, ts: Date.now() });
      }
      if (P.driftAnim) {
        var row = el("div", "geog-w2-row");
        var bA = el("button", "geog-btn fs-095", "漂移示意：分开");
        var bB = el("button", "geog-btn fs-095", "拼合");
        bA.addEventListener("click", function () {
          Object.keys(pieces).forEach(function (id) {
            pieces[id].x = HOME[id].x; pieces[id].y = HOME[id].y; pieces[id].snapped = false;
            syncPiece(id);
          });
          bothDone = false; evLit = [false, false, false];
          if (evG) { svg.removeChild(evG); evG = null; }
          ro.textContent = "两亿年前，它们是一整块——现在分开了（示意，非真实速度）。";
        });
        bB.addEventListener("click", function () {
          Object.keys(pieces).forEach(function (id) {
            pieces[id].x = SLOT[id].x; pieces[id].y = SLOT[id].y; pieces[id].snapped = true;
            syncPiece(id);
          });
          checkBoth();
        });
        row.appendChild(bA); row.appendChild(bB);
        row.appendChild(el("span", "fs-078", "示意，非真实速度"));
        wrap.appendChild(row);
      }
      axNote(wrap, "拼图能拼上不是巧合——化石、岩层、冰川三处证据都对上了，大陆真的在动。" + P.rateNote + "。");
      view = {
        root: wrap,
        resize: function () {}, destroy: function () { untrack(view); },
        state: function () {
          var o = { mode: mode, bothSnapped: bothDone, evidencesLit: evLit.slice(), pieces: {} };
          Object.keys(pieces).forEach(function (id) {
            o.pieces[id] = { x: Math.round(pieces[id].x * 10) / 10, y: Math.round(pieces[id].y * 10) / 10, snapped: pieces[id].snapped };
          });
          return o;
        },
        labelFonts: function () { return []; },
        _move: function (id, x, y) { var p = pieces[id]; p.x = x; p.y = y; syncPiece(id); },
        _snap: function (id) {
          var p = pieces[id]; p.x = SLOT[id].x; p.y = SLOT[id].y; p.snapped = true;
          syncPiece(id); checkBoth();
        }
      };
    } else {
      /* plates：六大板块着色 + 边界箭头 */
      var wg = svgEl("g", { transform: "translate(0,62) scale(1,-1)" });
      svg.appendChild(wg);
      var lg2 = svgEl("g", {}); svg.appendChild(lg2);
      PLATES.forEach(function (pl) {
        var r = svgEl("rect", { x: pl.x, y: pl.y, width: pl.w, height: pl.h, rx: 3,
          fill: pl.color, stroke: cssColor("--geog-ink", "#1a1a1a"), "stroke-width": 1.2, opacity: 0.9 });
        wg.appendChild(r);
        var t = svgEl("text", { x: pl.x + pl.w / 2, y: W2Y(pl.y + pl.h / 2),
          "text-anchor": "middle", "dominant-baseline": "middle", "font-size": 4.2,
          fill: cssColor("--geog-ink", "#1a1a1a") });
        t.textContent = pl.name;
        lg2.appendChild(t);
      });
      var selB = -1;
      /* 边界图例（HTML，避免 SVG 内文字与板块名重叠；点图例=点标记） */
      var bLegend = el("div", "geog-w2-tabs");
      function selectB(i) {
        selB = i;
        var bd = P.boundaries[i], conv = bd.kind === "convergent";
        ro.innerHTML = "边界" + (i + 1) + "：" + esc(bd.label) + "——" +
          (conv ? "两块板块<strong>挤压</strong>（相向箭头）" : "两块板块<strong>张裂</strong>（相背箭头）") + "。";
        Array.prototype.forEach.call(bLegend.querySelectorAll("button"), function (x, k) {
          x.classList.toggle("on", k === i);
        });
      }
      P.boundaries.forEach(function (bd, i) {
        var g = svgEl("g", { transform: "translate(" + bd.at[0] + "," + bd.at[1] + ")" });
        var conv = bd.kind === "convergent";
        /* 相向/相背箭头 + 文字（双编码；不用消亡/生长边界） */
        [[-1, conv ? 1 : -1], [1, conv ? -1 : 1]].forEach(function (s) {
          var dir = s[1];
          var tri = svgEl("path", {
            d: dir > 0 ? "M-5.5,-2.4 L-1.5,0 L-5.5,2.4 Z" : "M5.5,-2.4 L1.5,0 L5.5,2.4 Z",
            fill: cssColor("--geog-target", "#D55E00") });
          var gg = svgEl("g", { transform: "translate(" + (s[0] * 6) + ",0)" });
          gg.appendChild(tri); g.appendChild(gg);
        });
        var dot = svgEl("circle", { r: 2.2, fill: cssColor("--geog-target", "#D55E00") });
        g.appendChild(dot);
        var hit = svgEl("circle", { r: 7, fill: "transparent" });
        hit.style.cursor = "pointer";
        hit.addEventListener("click", function () { selectB(i); });
        g.appendChild(hit);
        wg.appendChild(g);
        var lb = el("button", "geog-btn fs-085",
          "边界" + (i + 1) + "：" + bd.label + "（" + (conv ? "挤压" : "张裂") + "）");
        lb.addEventListener("click", function () { selectB(i); });
        bLegend.appendChild(lb);
      });
      wrap.appendChild(bLegend);
      var badge = el("div", "geog-w2-row");
      badge.appendChild(el("span", "geog-w2-badge2 fs-085", esc(P.rateNote)));
      wrap.appendChild(badge);
      axNote(wrap, "诚实清单：板块为示意色块（示意｜非精确比例），不画国界线；软流层是塑性固体，板块在缓慢移动——不是船浮在水面。" + P.rateNote + "。");
      view = {
        root: wrap,
        resize: function () {}, destroy: function () { untrack(view); },
        state: function () { return { mode: mode, selectedBoundary: selB, boundaries: P.boundaries.length }; },
        labelFonts: function () { return []; },
        _select: function (i) { selB = i; }
      };
    }
    track(view);
    return view;
  }
  window.GEO.registerWidget("plate-puzzle", PlateView);

})();
