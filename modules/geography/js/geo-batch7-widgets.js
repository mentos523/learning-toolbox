/* ============================================================
 * 学习工具箱 · 地理 · 批 7 新增渲染器（dg14 地球运动与自然环境用）
 *
 * 本文件在 js/geography.js 之后引入，经 window.GEO.registerWidget
 * 注册 11 个新类型（RENDERERS.md §17–§27）：
 *  §17 solar-system    太阳系八大行星示意（点选读数＋公转演示）
 *  §18 solar-input     太阳辐射纬度差异＋太阳活动（黑子/耀斑/日珥）
 *  §19 earth-rotation  地球自转昼夜交替＋地转偏向力；terminator 模式供 dg14.2.3
 *  §20 orbit-seasons   地球公转＋太阳直射点回归运动（二分二至）
 *  §21 daylength-curve 昼长年变化曲线（武汉；直观版周期，不讲正弦定义）
 *  §22 circulation-3d  三圈环流 3D 示意＋七压六带分布（气压梯度力＋地转偏向力推出风向）
 *  §23 monsoon-sim     G11 季风环流模拟（冬夏切换＋海陆热力实验＋武汉联动）
 *  §24 ocean-current   世界洋流（8 大洋环流＋暖寒流＋渔场＋北印度洋季风洋流例外）
 *  §25 water-cycle     水循环（海陆间/海上内/陆地内三种循环＋环节水量）
 *  §26 landform-sculpt 内外力雕塑地貌（生长/消亡边界严格化＋红线①回填挑战）
 *  §27 vegetation-zones 植被—气候对应（水平地带性＋秦岭南北对比＋垂直地带性＋土壤）
 *
 * 复用既有渲染器：timezone-calc（G6，dg14.2.4）、climate-chart（G4，dg14.3.3 ③回填）、
 * cause-chain（dg14.3.3 归因闯关）、guess-verify（各课收官小测）、globe-spin（dg14.2.1 备选）。
 *
 * 图件定级（GEO-RULING-2026-10-17-08）：本批新增图件全部为自然地理示意图，
 * 无国界/省界/行政区划矢量几何（洋流图用抽象海盆示意，不画海岸线国界），
 * 故不触发 -08 审定签发流程；逐页核实结论见 dg14.js 文件头。
 * 诚实口径：全部示意页角落常驻「示意」声明（GEO-R24）；三圈环流注「纬向平均示意」；
 * 太阳系图注「距离非等比」；动画角注「示意，非真实比例/速度」（GEO-AX01）。
 *
 * 真值：window.GeoBatch7.*（场层纯函数/数据表，渲染与断言共用）；
 * view.state() 为 UI 可达值；view.truth() 为场层真值
 * （GEO-RULING-2026-10-17-03 分场层/UI 两类）。
 * 零外部请求；深浅双色走 --geog-*；触摸热区 ≥44px；
 * HTML 文字只用 V8 阶梯类（.fs-078…）；SVG 文字 12.5px（批 6 冻结口径）。
 * 记录键经本地 store() 写 "ltb-geo-" + recordKey。
 * ============================================================ */
(function () {
"use strict";
if (!window.GEO || !window.GEO.registerWidget) return;

/* ---------------- 小工具 ---------------- */
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
function store(k, v) {
  try { localStorage.setItem("ltb-geo-" + k, JSON.stringify(v)); } catch (e) {}
}
var NS = "http://www.w3.org/2000/svg";
function svgEl(tag, attrs) {
  var n = document.createElementNS(NS, tag);
  for (var k in attrs) n.setAttribute(k, attrs[k]);
  return n;
}
function cssVar(name, fb) {
  try { var v = getComputedStyle(document.body).getPropertyValue(name).trim(); return v || fb; }
  catch (e) { return fb; }
}
var _live = [];
function track(v) { _live.push(v); return v; }
function untrack(v) {
  var i = _live.indexOf(v); if (i >= 0) _live.splice(i, 1);
  try { if (window.GEO && window.GEO.unregisterView) window.GEO.unregisterView(v); } catch (e) {}
}
/* SVG 文字（12.5px，批 6 冻结口径；落 V8 阶梯 12.48±0.5） */
function svgText(x, y, s, fill, anchor, size) {
  var t = svgEl("text", { x: x, y: y, "text-anchor": anchor || "middle", fill: fill, "font-size": size || "12.5" });
  t.textContent = s; return t;
}
/* 角落示意声明（不可关闭，GEO-R24） */
function cornerNote(svg, text, vbW, vbH) {
  var t = svgEl("text", { x: (vbW || 800) - 10, y: (vbH || 500) - 10, "text-anchor": "end",
    fill: cssVar("--geog-ink-soft", "#4a4a4a"), "font-size": "12.5" });
  t.textContent = text; svg.appendChild(t);
}
function head(box, title) {
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
function honestyBadge(parent, text) {
  parent.appendChild(el("div", "geog-w2-badge fs-078", esc(text || "示意｜非精确比例")));
}
function tabRow(parent, tabs, onPick) {
  var row = el("div", "geog-w2-tabs");
  var btns = [];
  tabs.forEach(function (t, i) {
    var b = el("button", "geog-btn fs-095" + (i === 0 ? " on" : ""), esc(t));
    b.type = "button";
    b.addEventListener("click", function () {
      btns.forEach(function (x) { x.classList.remove("on"); });
      b.classList.add("on"); onPick(i);
    });
    row.appendChild(b); btns.push(b);
  });
  parent.appendChild(row);
  return btns;
}

/* ============================================================
 * 场层真值（window.GeoBatch7）：教学常量与纯函数
 * ============================================================ */
var PLANETS = [
  { name: "水星", distAU: 0.39, periodYr: 0.24, color: "#9c8e82", note: "离太阳最近；昼夜温差最大（约 600℃）。" },
  { name: "金星", distAU: 0.72, periodYr: 0.62, color: "#e0b96a", note: "逆行自转；浓厚二氧化碳大气，表面最热（约 460℃）。" },
  { name: "地球", distAU: 1.00, periodYr: 1.00, color: "#3f8fd2", note: "目前已知唯一存在生命的行星——日地距离、体积质量、自转公转都刚刚好。" },
  { name: "火星", distAU: 1.52, periodYr: 1.88, color: "#d4694e", note: "红色星球；太阳系最高火山奥林帕斯山。" },
  { name: "木星", distAU: 5.20, periodYr: 11.86, color: "#d8a06a", note: "体积质量最大；大红斑是持续数百年的风暴。" },
  { name: "土星", distAU: 9.58, periodYr: 29.45, color: "#e3cf9a", note: "光环最显著；平均密度比水还小。" },
  { name: "天王星", distAU: 19.19, periodYr: 84.0, color: "#8fd0d8", note: "几乎“躺着”自转（自转轴倾角约 98°）。" },
  { name: "海王星", distAU: 30.07, periodYr: 164.8, color: "#4a6fd2", note: "笔尖上算出来的行星；风速太阳系最快。" }
];
var SOLAR_TERMS = [
  { key: "vernal", name: "春分", date: "3月21日前后", decl: 0, dayNight: "全球昼夜平分", seasonN: "北半球春季" },
  { key: "summer", name: "夏至", date: "6月22日前后", decl: 23.5, dayNight: "北半球昼最长、夜最短（北极圈内极昼）", seasonN: "北半球夏季" },
  { key: "autumn", name: "秋分", date: "9月23日前后", decl: 0, dayNight: "全球昼夜平分", seasonN: "北半球秋季" },
  { key: "winter", name: "冬至", date: "12月22日前后", decl: -23.5, dayNight: "北半球昼最短、夜最长（北极圈内极夜）", seasonN: "北半球冬季" }
];
/* 昼长（小时）：天文公式 cosH = −tanφ·tanδ；δ 用 Cooper 近似。场层真值。 */
function solarDecl(dayOfYear) {
  return -23.45 * Math.cos(2 * Math.PI * (dayOfYear + 10) / 365);
}
function dayLengthHours(latDeg, dayOfYear) {
  var phi = latDeg * Math.PI / 180, d = solarDecl(dayOfYear) * Math.PI / 180;
  var c = -Math.tan(phi) * Math.tan(d);
  if (c <= -1) return 24; if (c >= 1) return 0;
  return 2 * Math.acos(c) * 180 / Math.PI / 15;
}
var PRESSURE_BELTS = [
  { name: "赤道低气压带", lat: "0°附近", kind: "低", cause: "赤道受热多，空气膨胀上升" },
  { name: "副热带高气压带", lat: "南北纬 30°附近", kind: "高", cause: "上升到高空的气流向两侧辐散、下沉" },
  { name: "副极地低气压带", lat: "南北纬 60°附近", kind: "低", cause: "来自低纬的暖气流与极地冷气流相遇，暖气流爬升" },
  { name: "极地高气压带", lat: "南北纬 90°附近", kind: "高", cause: "极地严寒，空气收缩下沉" }
];
var WIND_BELTS = [
  { name: "东北信风带", lat: "0°–30°N", dir: "东北风", from: "副热带高气压带", to: "赤道低气压带" },
  { name: "东南信风带", lat: "0°–30°S", dir: "东南风", from: "副热带高气压带", to: "赤道低气压带" },
  { name: "盛行西风带（北）", lat: "30°–60°N", dir: "西南风", from: "副热带高气压带", to: "副极地低气压带" },
  { name: "盛行西风带（南）", lat: "30°–60°S", dir: "西北风", from: "副热带高气压带", to: "副极地低气压带" },
  { name: "极地东风带（北）", lat: "60°–90°N", dir: "东北风", from: "极地高气压带", to: "副极地低气压带" },
  { name: "极地东风带（南）", lat: "60°–90°S", dir: "东南风", from: "极地高气压带", to: "副极地低气压带" }
];
var GYRES = [
  { id: "npac", name: "北太平洋副热带环流", kind: "副热带", hemi: "北", spin: "顺时针", note: "北赤道暖流＋日本暖流＋北太平洋暖流＋加利福尼亚寒流" },
  { id: "spac", name: "南太平洋副热带环流", kind: "副热带", hemi: "南", spin: "逆时针", note: "南赤道暖流＋东澳大利亚暖流＋西风漂流＋秘鲁寒流" },
  { id: "natl", name: "北大西洋副热带环流", kind: "副热带", hemi: "北", spin: "顺时针", note: "北赤道暖流＋墨西哥湾暖流＋北大西洋暖流＋加那利寒流" },
  { id: "satl", name: "南大西洋副热带环流", kind: "副热带", hemi: "南", spin: "逆时针", note: "南赤道暖流＋巴西暖流＋西风漂流＋本格拉寒流" },
  { id: "sind", name: "南印度洋副热带环流", kind: "副热带", hemi: "南", spin: "逆时针", note: "南赤道暖流＋厄加勒斯暖流＋西风漂流＋西澳大利亚寒流" },
  { id: "npsub", name: "北太平洋副极地环流", kind: "副极地", hemi: "北", spin: "逆时针", note: "阿拉斯加暖流＋千岛寒流" },
  { id: "nasub", name: "北大西洋副极地环流", kind: "副极地", hemi: "北", spin: "逆时针", note: "挪威暖流＋东格陵兰寒流" },
  { id: "acc", name: "南极绕极流", kind: "绕极流", hemi: "南", spin: "自西向东", note: "环南极大陆，全球最强洋流；寒流性质" }
];
window.GeoBatch7 = {
  PLANETS: PLANETS, SOLAR_TERMS: SOLAR_TERMS,
  solarDecl: solarDecl, dayLengthHours: dayLengthHours,
  PRESSURE_BELTS: PRESSURE_BELTS, WIND_BELTS: WIND_BELTS, GYRES: GYRES
};

/* ============================================================
 * §17 solar-system · 太阳系八大行星示意
 * params: {recordKey}
 * ============================================================ */
function SolarSystemView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "太阳系：八大行星");
  honestyBadge(wrap, "示意｜行星距离非等比｜公转速度非真实");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var sunC = cssVar("--geog-temp", "#d4694e");
  var svg = svgEl("svg", { viewBox: "0 0 800 460", role: "img", "aria-label": "太阳系八大行星轨道示意" });
  stage.appendChild(svg);
  /* 轨道半径：示意（非等比），内密外疏 */
  var radii = [70, 100, 135, 170, 235, 300, 350, 390];
  var cx = 400, cy = 230;
  var sun = svgEl("circle", { cx: cx, cy: cy, r: 34, fill: sunC, opacity: 0.9 });
  svg.appendChild(sun);
  svg.appendChild(svgText(cx, cy + 5, "太阳", "#fff", "middle"));
  var planetGs = [];
  PLANETS.forEach(function (p, i) {
    svg.appendChild(svgEl("ellipse", { cx: cx, cy: cy, rx: radii[i], ry: radii[i] * 0.62,
      fill: "none", stroke: cssVar("--geog-graticule", "#9AA5B1"), "stroke-width": 1, "stroke-dasharray": "5,4", opacity: 0.7 }));
    var g = svgEl("g", {});
    var r = 8 + i * 1.6;
    var c = svgEl("circle", { cx: 0, cy: 0, r: r, fill: p.color, stroke: ink, "stroke-width": 1 });
    g.appendChild(c);
    var lb = svgText(0, -r - 8, p.name, ink, "middle");
    g.appendChild(lb);
    /* 透明命中圆 ≥44px（390px 下按比例亦可用标签按钮备选） */
    var hit = svgEl("circle", { cx: 0, cy: 0, r: Math.max(26, r + 14), fill: "transparent" });
    g.appendChild(hit);
    svg.appendChild(g);
    planetGs.push({ g: g, p: p, i: i });
    hit.addEventListener("click", function () { select(i); });
    c.addEventListener("click", function () { select(i); });
  });
  cornerNote(svg, "示意｜距离非等比｜方向仅供参考", 800, 460);
  var ang = [0.3, 1.2, 2.2, 3.0, 4.1, 5.0, 5.8, 0.9];
  var sel = 2, playing = false, timer = null;
  function place() {
    planetGs.forEach(function (o) {
      var a = ang[o.i];
      o.g.setAttribute("transform", "translate(" + (cx + Math.cos(a) * radii[o.i]) + "," + (cy + Math.sin(a) * radii[o.i] * 0.62) + ")");
    });
  }
  function select(i) {
    sel = i; var p = PLANETS[i];
    ro.innerHTML = "<strong>" + esc(p.name) + "</strong>：距日约 " + p.distAU + " 天文单位，公转约 " +
      p.periodYr + " 年。<br>" + esc(p.note);
    store(params.recordKey || "geog_solar-system", { planet: p.name, ts: Date.now() });
  }
  place(); select(2);
  var row = el("div", "geog-w2-row");
  var playBtn = el("button", "geog-btn fs-095", "▶ 公转演示（示意速度）");
  playBtn.type = "button";
  playBtn.addEventListener("click", function () {
    playing = !playing;
    playBtn.textContent = playing ? "⏸ 暂停" : "▶ 公转演示（示意速度）";
    if (playing) {
      timer = setInterval(function () {
        for (var i = 0; i < ang.length; i++) ang[i] += 0.02 / Math.sqrt(PLANETS[i].distAU);
        place();
      }, 60);
    } else if (timer) { clearInterval(timer); timer = null; }
  });
  row.appendChild(playBtn);
  /* 390px 备选：行星名按钮列表（热区 ≥44px） */
  var list = el("div", "geog-w2-tabs");
  PLANETS.forEach(function (p, i) {
    var b = el("button", "geog-btn fs-085", esc(p.name));
    b.type = "button";
    b.addEventListener("click", function () { select(i); });
    list.appendChild(b);
  });
  wrap.appendChild(row); wrap.appendChild(list);
  axNote(wrap, "八大行星按<strong>距日由近到远</strong>：水星、金星、地球、火星、木星、土星、天王星、海王星（“水金地火木土天海”）。小行星带在火星与木星轨道之间。");
  var view = {
    resize: function () {}, destroy: function () { if (timer) clearInterval(timer); untrack(view); },
    state: function () { return { selected: PLANETS[sel].name, playing: playing }; },
    truth: function () { return { planets: PLANETS }; },
    _select: select
  };
  track(view); return view;
}
window.GEO.registerWidget("solar-system", function (box, params, pg) { return SolarSystemView(box, params, pg); });

/* ============================================================
 * §18 solar-input · 太阳辐射纬度差异＋太阳活动
 * params: {recordKey}
 * ============================================================ */
function SolarInputView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "太阳辐射：纬度差异与太阳活动");
  honestyBadge(wrap, "示意｜非精确比例");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var mode = 0;
  function drawLat() {
    stage.innerHTML = "";
    var svg = svgEl("svg", { viewBox: "0 0 800 420", role: "img", "aria-label": "太阳辐射纬度差异示意" });
    stage.appendChild(svg);
    var cx = 400, cy = 210, R = 150;
    /* 平行太阳光（自左） */
    for (var i = -2; i <= 2; i++) {
      svg.appendChild(svgEl("line", { x1: 40, y1: cy + i * 44, x2: cx - R - 8, y2: cy + i * 44,
        stroke: "#e0a93e", "stroke-width": 3, opacity: 0.85 }));
    }
    svg.appendChild(svgText(70, cy - 120, "平行太阳光", "#b07a1e", "middle"));
    var earth = svgEl("circle", { cx: cx, cy: cy, r: R, fill: cssVar("--geog-sea", "#dcebf7"), stroke: ink, "stroke-width": 2 });
    svg.appendChild(earth);
    /* 纬度带：赤道/回归线/极圈示意线 */
    [[0, "赤道"], [23.5, "北回归线"], [-23.5, "南回归线"], [66.5, "北极圈"]].forEach(function (L) {
      var y = cy - Math.sin(L[0] * Math.PI / 180) * R;
      var w = Math.cos(L[0] * Math.PI / 180) * R;
      svg.appendChild(svgEl("line", { x1: cx - w, y1: y, x2: cx + w, y2: y,
        stroke: cssVar("--geog-graticule", "#9AA5B1"), "stroke-width": 1.5, "stroke-dasharray": "6,4" }));
      svg.appendChild(svgText(cx + w + 8, y + 4, L[1], soft, "start"));
    });
    /* 三个光斑：同样宽的光束，在不同纬度铺开的面积不同 */
    function spot(latDeg, label) {
      var y = cy - Math.sin(latDeg * Math.PI / 180) * R;
      var stretch = 1 / Math.max(0.25, Math.cos(latDeg * Math.PI / 180));
      var wdt = 44 * stretch;
      var e = svgEl("ellipse", { cx: cx - R * 0.55, cy: y, rx: Math.min(120, wdt), ry: 20,
        fill: "#e0a93e", opacity: 0.35, stroke: "#b07a1e", "stroke-width": 1.5 });
      svg.appendChild(e);
      svg.appendChild(svgText(cx - R * 0.55, y - 30, label, ink, "middle"));
    }
    spot(0, "赤道：光斑小，能量集中");
    spot(45, "45°N：光斑拉长，能量分散");
    spot(70, "70°N：光斑很长，能量很散");
    cornerNote(svg, "示意｜非精确比例", 800, 420);
    ro.innerHTML = "同一束阳光：<strong>纬度越低</strong>（越接近直射），单位面积分到的太阳辐射越<strong>多</strong>；" +
      "纬度越高，光束被“摊”得越开，单位面积分到的越少——<strong>太阳辐射的纬度差异，是各地冷热不同的根本原因</strong>（dg14.3.3 回填：以温定带的成因）。";
  }
  function drawAct() {
    stage.innerHTML = "";
    var svg = svgEl("svg", { viewBox: "0 0 800 420", role: "img", "aria-label": "太阳活动示意" });
    stage.appendChild(svg);
    var cx = 400, cy = 190, R = 130;
    svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: R, fill: "#f5b942", stroke: "#b07a1e", "stroke-width": 3 }));
    /* 黑子 */
    [[-40, -30], [30, 20], [10, -50]].forEach(function (pt) {
      svg.appendChild(svgEl("circle", { cx: cx + pt[0], cy: cy + pt[1], r: 16, fill: "#5a3a10", opacity: 0.85 }));
    });
    svg.appendChild(svgText(cx - 150, cy - 100, "黑子：光球暗斑", ink, "middle"));
    /* 耀斑 */
    svg.appendChild(svgEl("path", { d: "M" + (cx + 90) + "," + (cy - 90) + " l26,-34 l8,30 l22,-20",
      fill: "none", stroke: "#d43c2a", "stroke-width": 5, "stroke-linecap": "round" }));
    svg.appendChild(svgText(cx + 200, cy - 130, "耀斑：突然增亮", ink, "middle"));
    /* 日珥 */
    svg.appendChild(svgEl("path", { d: "M" + (cx - 110) + "," + (cy + 60) + " q-50,30 -70,90 q30,-8 44,-30 q10,40 40,52",
      fill: "none", stroke: "#d4694e", "stroke-width": 5, "stroke-linecap": "round" }));
    svg.appendChild(svgText(cx - 210, cy + 130, "日珥：边缘喷发", ink, "middle"));
    /* 11 年周期示意曲线 */
    var baseY = 380;
    svg.appendChild(svgText(60, baseY - 60, "黑子数", soft, "middle"));
    var pts = [];
    for (var x = 120; x <= 720; x += 12) {
      var y = baseY - 40 - 34 * Math.abs(Math.sin((x - 120) / 600 * Math.PI * 2));
      pts.push(x + "," + y.toFixed(1));
    }
    svg.appendChild(svgEl("polyline", { points: pts.join(" "), fill: "none", stroke: "#7a4fd2", "stroke-width": 3 }));
    svg.appendChild(svgText(420, baseY + 18, "太阳活动约 11 年一个周期（示意曲线）", soft, "middle"));
    cornerNote(svg, "示意｜曲线为教学示意", 800, 420);
    ro.innerHTML = "<strong>黑子</strong>（光球上的暗斑）、<strong>耀斑</strong>（突然增亮的爆发）、" +
      "<strong>日珥</strong>（边缘喷出的火焰状物质）——太阳活动有<strong>约 11 年</strong>的周期。" +
      "剧烈时扰动电离层（影响无线电通信）、产生磁暴（影响卫星、电力系统），还与地球气候变化有关。";
  }
  drawLat();
  tabRow(wrap, ["纬度差异", "太阳活动"], function (i) {
    mode = i; if (i === 0) drawLat(); else drawAct();
    store(params.recordKey || "geog_solar-input", { tab: i, ts: Date.now() });
  });
  axNote(wrap, "太阳常数：日地平均距离处，垂直于太阳光的单位面积、单位时间获得的太阳辐射能，约 1361 瓦/平方米（数值前要写“约”）。");
  var view = {
    resize: function () {}, destroy: function () { untrack(view); },
    state: function () { return { tab: mode }; },
    truth: function () { return { solarCycleYears: 11, solarConstant: "约 1361 W/m²" }; }
  };
  track(view); return view;
}
window.GEO.registerWidget("solar-input", function (box, params, pg) { return SolarInputView(box, params, pg); });

/* ============================================================
 * §19 earth-rotation · 地球自转（昼夜交替＋地转偏向力）
 * params: {mode:"spin"|"terminator", recordKey}
 *   spin：自转昼夜交替动画＋地转偏向力演示（dg14.2.1）
 *   terminator：晨昏线＋日期滑块→武汉昼长读数（dg14.2.3；二分二至快捷）
 * ============================================================ */
function EarthRotationView(box, params, pg) {
  params = params || {};
  var mode = params.mode === "terminator" ? "terminator" : "spin";
  var wrap = head(box, mode === "spin" ? "地球自转：昼夜交替" : "晨昏线与昼夜长短");
  honestyBadge(wrap, "示意｜非真实比例/速度");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var svg = svgEl("svg", { viewBox: "0 0 800 480", role: "img",
    "aria-label": mode === "spin" ? "地球自转昼夜交替示意" : "晨昏线与昼夜长短示意" });
  stage.appendChild(svg);
  var cx = 300, cy = 240, R = 170;
  var playing = false, timer = null, ang = 0.6, dayN = 172, hemi = "N";
  function drawBase() {
    svg.innerHTML = "";
    /* 太阳光自左 */
    for (var i = -2; i <= 2; i++)
      svg.appendChild(svgEl("line", { x1: 20, y1: cy + i * 52, x2: cx - R - 10, y2: cy + i * 52,
        stroke: "#e0a93e", "stroke-width": 4, opacity: 0.8 }));
    svg.appendChild(svgText(70, cy - 150, "太阳光", "#b07a1e", "middle"));
    /* 地球：昼半球亮、夜半球暗（晨昏线可动） */
    var day = svgEl("g", {}); svg.appendChild(day);
    var night = svgEl("g", {}); svg.appendChild(night);
    return { day: day, night: night };
  }
  function drawSpin() {
    var g = drawBase();
    /* 夜半球：右半圆暗色罩 */
    g.night.appendChild(svgEl("path", {
      d: "M" + cx + "," + (cy - R) + " A" + R + "," + R + " 0 0 1 " + cx + "," + (cy + R) + " Z",
      fill: "#1c2a4a", opacity: 0.55 }));
    /* 昼半球底 */
    g.day.appendChild(svgEl("circle", { cx: cx, cy: cy, r: R, fill: cssVar("--geog-sea", "#dcebf7"), opacity: 0.5 }));
    /* 自转：经线网＋武汉标记，随 ang 转动（示意） */
    var spin = svgEl("g", {}); g.day.appendChild(spin);
    for (var k = 0; k < 6; k++) {
      var a = ang + k * Math.PI / 3;
      var x = Math.cos(a) * R;
      spin.appendChild(svgEl("ellipse", { cx: cx, cy: cy, rx: Math.abs(x), ry: R,
        fill: "none", stroke: cssVar("--geog-graticule", "#9AA5B1"), "stroke-width": 1.2 }));
    }
    /* 武汉标记（约 30.6°N，114.3°E）：随自转进出昼夜 */
    var wa = ang * 2;
    var wx = cx + Math.cos(wa) * R * 0.82, wy = cy - Math.sin(wa) * R * 0.5;
    var inDay = Math.cos(wa) < 0;
    spin.appendChild(svgEl("circle", { cx: wx, cy: wy, r: 10, fill: inDay ? "#e0a93e" : "#1c2a4a",
      stroke: ink, "stroke-width": 2 }));
    spin.appendChild(svgText(wx, wy - 18, "武汉", ink, "middle"));
    /* 自转方向箭头（北极上空看逆时针；侧视画弧形箭头表自西向东） */
    svg.appendChild(svgEl("path", {
      d: "M" + (cx - R - 46) + "," + (cy + 60) + " A" + (R + 40) + "," + (R + 40) + " 0 0 1 " + (cx - R - 46) + "," + (cy - 60),
      fill: "none", stroke: cssVar("--geog-accent", "#2a7de1"), "stroke-width": 4 }));
    svg.appendChild(svgText(cx - R - 62, cy, "自西向东", cssVar("--geog-accent", "#2a7de1"), "middle"));
    /* 晨昏线标注 */
    svg.appendChild(svgText(cx + 8, cy - R - 16, "晨昏线（昼夜分界线）", soft, "middle"));
    svg.appendChild(svgEl("line", { x1: cx, y1: cy - R, x2: cx, y2: cy + R,
      stroke: "#d43c2a", "stroke-width": 3, "stroke-dasharray": "8,5" }));
    cornerNote(svg, "示意｜非真实比例/速度", 800, 480);
    ro.innerHTML = "地球自西向东自转。太阳只照亮一半：<strong>亮的半球是白天，暗的半球是黑夜</strong>。" +
      "武汉跟着地球转进昼半球→天亮，转进夜半球→天黑——<strong>昼夜交替，是地球自转的结果</strong>。" +
      "晨昏线是昼夜的分界线，它跟着地球一起转，不是钉在地图上的。";
  }
  function drawTerminator() {
    var g = drawBase();
    var decl = solarDecl(dayN);
    g.day.appendChild(svgEl("circle", { cx: cx, cy: cy, r: R, fill: cssVar("--geog-sea", "#dcebf7"), opacity: 0.5 }));
    /* 晨昏线倾斜：倾角 ≈ 太阳赤纬（示意） */
    var tilt = decl * Math.PI / 180 * 2.2;
    var dx = Math.sin(tilt) * R, dy = Math.cos(tilt) * R;
    g.night.appendChild(svgEl("path", {
      d: "M" + (cx - dx) + "," + (cy - dy) + " A" + R + "," + R + " 0 0 1 " + (cx + dx) + "," + (cy + dy) + " Z",
      fill: "#1c2a4a", opacity: 0.55 }));
    svg.appendChild(svgEl("line", { x1: cx - dx, y1: cy - dy, x2: cx + dx, y2: cy + dy,
      stroke: "#d43c2a", "stroke-width": 3, "stroke-dasharray": "8,5" }));
    svg.appendChild(svgText(cx, cy - R - 16, "晨昏线（倾斜" + Math.abs(decl).toFixed(1) + "°示意）", soft, "middle"));
    /* 武汉昼长读数（场层真值函数） */
    var dl = dayLengthHours(30.6, dayN);
    var dstr = dayN === 80 ? "春分（约 3 月 21 日）" : dayN === 172 ? "夏至（约 6 月 22 日）" :
      dayN === 266 ? "秋分（约 9 月 23 日）" : dayN === 356 ? "冬至（约 12 月 22 日）" : "一年中的第 " + dayN + " 天";
    ro.innerHTML = "<strong>" + dstr + "</strong>：太阳直射点纬度约 " + decl.toFixed(1) + "°，" +
      "武汉（约 30.6°N）昼长约 <strong>" + dl.toFixed(1) + " 小时</strong>。" +
      "<br>看懂两句话：<strong>直射点在哪个半球，哪个半球就昼长夜短</strong>（位置→状况）；" +
      "<strong>直射点向哪个半球移动，哪个半球的昼就变长</strong>（移动→变化）。";
    cornerNote(svg, "示意｜昼夜分界简化（不做曙暮光）", 800, 480);
  }
  if (mode === "spin") {
    drawSpin();
    var row = el("div", "geog-w2-row");
    var playBtn = el("button", "geog-btn fs-095", "▶ 自转演示");
    playBtn.type = "button";
    playBtn.addEventListener("click", function () {
      playing = !playing;
      playBtn.textContent = playing ? "⏸ 暂停" : "▶ 自转演示";
      if (playing) timer = setInterval(function () { ang += 0.05; drawSpin(); }, 80);
      else if (timer) { clearInterval(timer); timer = null; }
    });
    row.appendChild(playBtn);
    wrap.appendChild(row);
    /* 地转偏向力演示 */
    var hz = el("div", "geog-w2-head fs-105", "地转偏向力：转着的地球会“拐”风向");
    wrap.appendChild(hz);
    var prow = el("div", "geog-w2-tabs");
    var pro = readout(wrap);
    [["N", "北半球"], ["S", "南半球"]].forEach(function (H, i) {
      var b = el("button", "geog-btn fs-095" + (i === 0 ? " on" : ""), esc(H[1]));
      b.type = "button";
      b.addEventListener("click", function () {
        Array.prototype.forEach.call(prow.querySelectorAll("button"), function (x) { x.classList.remove("on"); });
        b.classList.add("on"); hemi = H[0];
        pro.innerHTML = hemi === "N"
          ? "北半球：沿经线向北运动的物体，向<strong>右</strong>偏（面向运动方向）。——记住“<strong>北右南左</strong>”。"
          : "南半球：沿经线向南运动的物体，向<strong>左</strong>偏（面向运动方向）。——记住“<strong>北右南左</strong>”。" +
            "<br>它只改变运动方向，不改变速度；赤道上不偏，纬度越高偏得越明显（dg14.3.1 回填：风带风向就是这么推出来的）。";
        store(params.recordKey || "geog_earth-rotation", { hemi: hemi, ts: Date.now() });
      });
      prow.appendChild(b);
    });
    wrap.appendChild(prow);
    axNote(wrap, "周期辨析：<strong>太阳日 24 小时</strong>（日常用的“一天”）vs <strong>恒星日 23 小时 56 分 4 秒</strong>（地球自转 360° 的真正周期）——差的约 4 分钟，是因为地球在自转的同时还在公转。");
  } else {
    drawTerminator();
    var srow = el("div", "geog-w2-row");
    srow.appendChild(el("span", "fs-095", "拖日期："));
    var slider = el("input"); slider.type = "range"; slider.min = "1"; slider.max = "365"; slider.value = "172";
    slider.style.flex = "1"; slider.setAttribute("aria-label", "日期滑块");
    slider.addEventListener("input", function () { dayN = Number(slider.value); drawTerminator(); });
    srow.appendChild(slider); wrap.appendChild(srow);
    var trow = el("div", "geog-w2-tabs");
    [["春分", 80], ["夏至", 172], ["秋分", 266], ["冬至", 356]].forEach(function (T) {
      var b = el("button", "geog-btn fs-095", esc(T[0]));
      b.type = "button";
      b.addEventListener("click", function () {
        dayN = T[1]; slider.value = String(T[1]); drawTerminator();
        store(params.recordKey || "geog_earth-rotation", { term: T[0], dayN: dayN, ts: Date.now() });
      });
      trow.appendChild(b);
    });
    wrap.appendChild(trow);
  }
  var view = {
    resize: function () {},
    destroy: function () { if (timer) clearInterval(timer); untrack(view); },
    state: function () { return { mode: mode, dayN: dayN, playing: playing }; },
    truth: function () { return { dayLengthHours: function (d) { return dayLengthHours(30.6, d); } }; },
    _setDay: function (d) { dayN = d; if (mode === "terminator") drawTerminator(); }
  };
  track(view); return view;
}
window.GEO.registerWidget("earth-rotation", function (box, params, pg) { return EarthRotationView(box, params, pg); });

/* ============================================================
 * §20 orbit-seasons · 地球公转＋太阳直射点回归运动
 * params: {recordKey}
 * ============================================================ */
function OrbitSeasonsView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "地球公转：太阳直射点的回归运动");
  honestyBadge(wrap, "示意｜轨道近似正圆｜非真实比例/速度");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var svg = svgEl("svg", { viewBox: "0 0 800 520", role: "img", "aria-label": "地球公转与太阳直射点回归运动示意" });
  stage.appendChild(svg);
  var cx = 400, cy = 260, RX = 300, RY = 200;
  svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: 40, fill: "#f5b942", stroke: "#b07a1e", "stroke-width": 3 }));
  svg.appendChild(svgText(cx, cy + 6, "太阳", "#fff", "middle"));
  svg.appendChild(svgEl("ellipse", { cx: cx, cy: cy, rx: RX, ry: RY, fill: "none",
    stroke: cssVar("--geog-graticule", "#9AA5B1"), "stroke-width": 2, "stroke-dasharray": "8,6" }));
  svg.appendChild(svgText(cx, cy + RY + 28, "公转轨道（近似正圆，示意）", soft, "middle"));
  /* 近日点/远日点 */
  var peri = svgEl("circle", { cx: cx - RX, cy: cy, r: 7, fill: "#d43c2a" }); svg.appendChild(peri);
  svg.appendChild(svgText(cx - RX, cy + 26, "近日点（1月初）", soft, "middle"));
  var aph = svgEl("circle", { cx: cx + RX, cy: cy, r: 7, fill: "#3f8fd2" }); svg.appendChild(aph);
  svg.appendChild(svgText(cx + RX, cy + 26, "远日点（7月初）", soft, "middle"));
  /* 四个位置：左=冬至？按地轴倾斜画。采用：右=夏至（地轴北端倾向太阳）… */
  var pos = [
    { t: SOLAR_TERMS[1], x: cx + RX, y: cy },            /* 夏至 */
    { t: SOLAR_TERMS[2], x: cx, y: cy + RY },            /* 秋分 */
    { t: SOLAR_TERMS[3], x: cx - RX, y: cy },            /* 冬至 */
    { t: SOLAR_TERMS[0], x: cx, y: cy - RY }             /* 春分 */
  ];
  var sel = 0;
  var egs = [];
  pos.forEach(function (o, i) {
    var g = svgEl("g", {});
    /* 地球小圆＋倾斜地轴（23.5°） */
    g.appendChild(svgEl("circle", { cx: 0, cy: 0, r: 26, fill: cssVar("--geog-sea", "#dcebf7"), stroke: ink, "stroke-width": 2 }));
    var tilt = 23.5 * Math.PI / 180;
    var ax = svgEl("line", { x1: -Math.sin(tilt) * 36, y1: -Math.cos(tilt) * 36,
      x2: Math.sin(tilt) * 36, y2: Math.cos(tilt) * 36, stroke: "#d43c2a", "stroke-width": 3 });
    g.appendChild(ax);
    /* 直射点纬度标记 */
    var dy = -Math.sin(o.t.decl * Math.PI / 180) * 26;
    g.appendChild(svgEl("line", { x1: -20, y1: dy, x2: 20, y2: dy, stroke: "#e0a93e", "stroke-width": 3 }));
    var lb = svgText(0, 46, o.t.name, ink, "middle");
    g.appendChild(lb);
    var hit = svgEl("circle", { cx: 0, cy: 0, r: 44, fill: "transparent" });
    g.appendChild(hit);
    g.setAttribute("transform", "translate(" + o.x + "," + o.y + ")");
    svg.appendChild(g);
    egs.push(g);
    hit.addEventListener("click", function () { select(i); });
  });
  cornerNote(svg, "示意｜非真实比例/速度", 800, 520);
  function select(i) {
    sel = i; var t = pos[i].t;
    egs.forEach(function (g, j) { g.setAttribute("opacity", j === i ? "1" : "0.55"); });
    var declTxt = t.decl === 0 ? "赤道（0°）" : (t.decl > 0 ? "北回归线（23.5°N）" : "南回归线（23.5°S）");
    ro.innerHTML = "<strong>" + esc(t.name) + "</strong>（" + esc(t.date) + "）：太阳直射" + declTxt + "；" +
      esc(t.dayNight) + "；" + esc(t.seasonN) + "。" +
      (i === 3 ? "<br>⚠️ 反例专治“四季＝距日远近”：近日点在 <strong>1 月初</strong>，离太阳最近时北半球却是<strong>冬季</strong>——四季的主因是<strong>黄赤交角（23.5°）＋太阳直射点的回归运动</strong>，不是距日远近！" : "");
    store(params.recordKey || "geog_orbit-seasons", { term: t.name, ts: Date.now() });
  }
  select(0);
  var trow = el("div", "geog-w2-tabs");
  pos.forEach(function (o, i) {
    var b = el("button", "geog-btn fs-095", esc(o.t.name));
    b.type = "button";
    b.addEventListener("click", function () { select(i); });
    trow.appendChild(b);
  });
  wrap.appendChild(trow);
  axNote(wrap, "黄赤交角 <strong>23.5°</strong>；五带界线：回归线 23.5°、极圈 66.5°。地轴倾斜＋地球公转＝太阳直射点在南北回归线之间来回移动＝四季。");
  var view = {
    resize: function () {}, destroy: function () { untrack(view); },
    state: function () { return { term: pos[sel].t.name }; },
    truth: function () { return { terms: SOLAR_TERMS }; },
    _select: select
  };
  track(view); return view;
}
window.GEO.registerWidget("orbit-seasons", function (box, params, pg) { return OrbitSeasonsView(box, params, pg); });

/* ============================================================
 * §21 daylength-curve · 昼长年变化曲线（直观版周期）
 * params: {recordKey}  注：只做直观版（一年一周期、对称美），不讲正弦定义，
 *         不挂“奠基”、不深链（GEO-R51）；预告登记见 dg14.js（学完代数 8.3 后回填）。
 * ============================================================ */
function DaylengthCurveView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "武汉昼长的年变化：一年一个周期");
  honestyBadge(wrap, "示意｜曲线由天文公式计算，非实测逐日记录");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var svg = svgEl("svg", { viewBox: "0 0 800 460", role: "img", "aria-label": "武汉昼长年变化曲线" });
  stage.appendChild(svg);
  var L = 70, Tp = 40, W = 800 - L - 30, H = 460 - Tp - 70;
  function X(d) { return L + (d - 1) / 364 * W; }
  function Y(h) { return Tp + H - (h - 8) / 8 * H; }  /* 8–16h */
  /* 坐标轴 */
  svg.appendChild(svgEl("line", { x1: L, y1: Tp, x2: L, y2: Tp + H, stroke: ink, "stroke-width": 2 }));
  svg.appendChild(svgEl("line", { x1: L, y1: Tp + H, x2: L + W, y2: Tp + H, stroke: ink, "stroke-width": 2 }));
  for (var h = 8; h <= 16; h += 2) {
    svg.appendChild(svgEl("line", { x1: L, y1: Y(h), x2: L + W, y2: Y(h),
      stroke: cssVar("--geog-graticule", "#9AA5B1"), "stroke-width": 1, "stroke-dasharray": "5,4" }));
    svg.appendChild(svgText(L - 10, Y(h) + 4, h + "h", soft, "end"));
  }
  svg.appendChild(svgText(30, Tp + H / 2, "昼长（小时）", soft, "middle"));
  var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
  var mdays = [1, 32, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
  months.forEach(function (m, i) {
    svg.appendChild(svgText(X(mdays[i]), Tp + H + 22, m, soft, "middle"));
  });
  svg.appendChild(svgText(L + W / 2, Tp + H + 44, "日期（月份）", soft, "middle"));
  /* 武汉曲线（30.6°N）＋赤道对照线（约 12h） */
  function pathOf(lat) {
    var pts = [];
    for (var d = 1; d <= 365; d += 3) pts.push(X(d).toFixed(1) + "," + Y(dayLengthHours(lat, d)).toFixed(1));
    return pts.join(" ");
  }
  svg.appendChild(svgEl("polyline", { points: pathOf(0), fill: "none",
    stroke: soft, "stroke-width": 2, "stroke-dasharray": "8,5", opacity: 0.8 }));
  svg.appendChild(svgText(L + W - 4, Y(12) - 10, "赤道：约 12h，全年不变", soft, "end"));
  var curve = svgEl("polyline", { points: pathOf(30.6), fill: "none",
    stroke: cssVar("--geog-accent", "#2a7de1"), "stroke-width": 3.5 });
  svg.appendChild(curve);
  svg.appendChild(svgText(L + W - 4, Y(dayLengthHours(30.6, 172)) - 12, "武汉（约 30.6°N）", cssVar("--geog-accent", "#2a7de1"), "end"));
  /* 可拖动探针 */
  var probe = svgEl("g", {});
  probe.appendChild(svgEl("line", { x1: 0, y1: Tp, x2: 0, y2: Tp + H, stroke: "#d43c2a", "stroke-width": 2 }));
  probe.appendChild(svgEl("circle", { cx: 0, cy: 0, r: 26, fill: "transparent" }));
  var pdot = svgEl("circle", { cx: 0, cy: 0, r: 8, fill: "#d43c2a", stroke: "#fff", "stroke-width": 2 });
  probe.appendChild(pdot);
  svg.appendChild(probe);
  var curD = 172;
  function moveProbe(d) {
    curD = Math.max(1, Math.min(365, Math.round(d)));
    var h = dayLengthHours(30.6, curD);
    probe.setAttribute("transform", "translate(" + X(curD) + "," + Y(h) + ")");
    var mn = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"][Math.min(11, Math.floor((curD - 1) / 30.4))];
    ro.innerHTML = "约 <strong>" + mn + " 月</strong>：武汉昼长约 <strong>" + h.toFixed(1) + " 小时</strong>。" +
      "拖一整年看：曲线<strong>一年一个周期</strong>，夏至最高、冬至最低，二分日约 12 小时——形状对称，像波浪。";
    store(params.recordKey || "geog_daylength-curve", { day: curD, hours: +h.toFixed(2), ts: Date.now() });
  }
  /* 探针拖动：整条曲线热区 */
  var hit = svgEl("rect", { x: L, y: Tp, width: W, height: H, fill: "transparent" });
  svg.insertBefore(hit, probe);
  function evtX(e) {
    var r = svg.getBoundingClientRect();
    var cxp = (e.touches && e.touches[0] ? e.touches[0].clientX : e.clientX);
    return (cxp - r.left) / r.width * 800;
  }
  var dragging = false;
  hit.addEventListener("pointerdown", function (e) { dragging = true; moveProbe(1 + (evtX(e) - L) / W * 364); });
  window.addEventListener("pointermove", function (e) { if (dragging) moveProbe(1 + (evtX(e) - L) / W * 364); });
  window.addEventListener("pointerup", function () { dragging = false; });
  cornerNote(svg, "示意｜公式计算值", 800, 460);
  moveProbe(172);
  axNote(wrap, "先看形状：这条曲线<strong>一年一周期、对称</strong>，这里不讲正弦的定义。预告：学完代数 8.3（正弦的周期）后，会回来认出这条曲线。");
  var view = {
    resize: function () {}, destroy: function () { untrack(view); },
    state: function () { return { day: curD, hours: +dayLengthHours(30.6, curD).toFixed(2) }; },
    truth: function () { return { dayLengthHours: function (d) { return dayLengthHours(30.6, d); } }; },
    _setDay: moveProbe
  };
  track(view); return view;
}
window.GEO.registerWidget("daylength-curve", function (box, params, pg) { return DaylengthCurveView(box, params, pg); });

/* ============================================================
 * §22 circulation-3d · 三圈环流 3D 示意＋七压六带
 * params: {recordKey}
 * ============================================================ */
function Circulation3DView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "三圈环流与气压带风带");
  honestyBadge(wrap, "示意｜纬向平均｜非真实比例");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var accent = cssVar("--geog-accent", "#2a7de1");
  var mode = 0, playing = false, timer = null, ph = 0;
  var svg = svgEl("svg", { viewBox: "0 0 800 500", role: "img", "aria-label": "三圈环流与气压带风带示意" });
  stage.appendChild(svg);
  function drawCells() {
    svg.innerHTML = "";
    var cx = 400, cy = 250, R = 180;
    /* 地球圆盘（侧视） */
    svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: R, fill: cssVar("--geog-sea", "#dcebf7"), stroke: ink, "stroke-width": 2 }));
    /* 纬度线：0/30/60/90 */
    [[0, "赤道"], [30, "30°"], [60, "60°"], [90, "极点"]].forEach(function (L) {
      var yN = cy - Math.sin(L[0] * Math.PI / 180) * R, yS = cy + Math.sin(L[0] * Math.PI / 180) * R;
      var w = Math.cos(L[0] * Math.PI / 180) * R;
      [yN, yS].forEach(function (y, k) {
        if (L[0] === 0 && k === 1) return;
        if (L[0] === 90 && k === 1) return;
        svg.appendChild(svgEl("line", { x1: cx - w, y1: y, x2: cx + w, y2: y,
          stroke: cssVar("--geog-graticule", "#9AA5B1"), "stroke-width": 1.2, "stroke-dasharray": "6,4" }));
      });
      if (L[0] !== 0) svg.appendChild(svgText(cx + R + 12, yN, (L[0] === 90 ? "" : "北纬 ") + L[1], soft, "start"));
    });
    svg.appendChild(svgText(cx, cy - R - 16, "北极", soft, "middle"));
    svg.appendChild(svgText(cx, cy + R + 22, "南极", soft, "middle"));
    /* 三圈环流（北半球示意，南半球对称）：低纬/中纬/高纬圈 */
    var cells = [
      { lat0: 0, lat1: 30, name: "低纬环流圈" },
      { lat0: 30, lat1: 60, name: "中纬环流圈" },
      { lat0: 60, lat1: 90, name: "高纬环流圈" }
    ];
    cells.forEach(function (c, ci) {
      var y0 = cy - Math.sin(c.lat0 * Math.PI / 180) * R;
      var y1 = cy - Math.sin(c.lat1 * Math.PI / 180) * R;
      var x0 = cx - R * 0.45, x1 = cx + R * 0.45;
      /* 环流圈示意椭圆（箭头随 ph 转动） */
      var ex = cx, ey = (y0 + y1) / 2, erx = (x1 - x0) / 2, ery = Math.abs(y1 - y0) / 2 + 6;
      svg.appendChild(svgEl("ellipse", { cx: ex, cy: ey, rx: erx, ry: ery, fill: "none",
        stroke: accent, "stroke-width": 2.5, opacity: 0.75 }));
      for (var k = 0; k < 3; k++) {
        var a = ph + k * 2.094 + ci * 0.7;
        var px = ex + Math.cos(a) * erx, py = ey + Math.sin(a) * ery;
        var ta = a + Math.PI / 2 * (ci === 1 ? -1 : 1);
        svg.appendChild(svgEl("polygon", {
          points: px + "," + py + " " + (px - 13 * Math.cos(ta - 0.45)) + "," + (py - 13 * Math.sin(ta - 0.45)) +
            " " + (px - 13 * Math.cos(ta + 0.45)) + "," + (py - 13 * Math.sin(ta + 0.45)),
          fill: accent, opacity: 0.9 }));
      }
      svg.appendChild(svgText(cx - R - 14, ey + 4, c.name, soft, "end"));
    });
    /* 近地面气压带标注（H/L） */
    [["赤道低气压带", 0, "L"], ["副热带高气压带", 30, "H"], ["副极地低气压带", 60, "L"], ["极地高气压带", 90, "H"]].forEach(function (B) {
      var y = cy - Math.sin(B[1] * Math.PI / 180) * R;
      svg.appendChild(svgText(cx - R * 0.72, y - 12, B[0], ink, "middle"));
      var badge = svgEl("circle", { cx: cx - R * 0.72, cy: y + 8, r: 15,
        fill: B[2] === "H" ? "#d43c2a" : "#2a7de1", opacity: 0.85 });
      svg.appendChild(badge);
      svg.appendChild(svgText(cx - R * 0.72, y + 13, B[2], "#fff", "middle"));
    });
    svg.appendChild(svgText(cx, 478, "气流：赤道上升→高空向两极→30°下沉→一部分回流赤道（低纬圈）；30°→60°→极地，依此类推", soft, "middle"));
    cornerNote(svg, "示意｜纬向平均｜非真实比例", 800, 500);
    ro.innerHTML = "三圈环流：<strong>低纬环流圈</strong>（0°–30°）、<strong>中纬环流圈</strong>（30°–60°）、" +
      "<strong>高纬环流圈</strong>（60°–90°），南北半球各三圈。近地面形成<strong>七个气压带</strong>（H 高/L 低）。" +
      "这是“理想化”的纬向平均——真实大陆上海陆分布会打乱它（注意：这说的是理想情况，真实大陆上并不完全这样）。";
  }
  function drawBelts() {
    svg.innerHTML = "";
    var L = 90, W = 620, top = 60, rowH = 52;
    svg.appendChild(svgText(L + W / 2, 30, "气压带与风带分布（北半球→南半球）", ink, "middle"));
    var rows = [
      { t: "极地高气压带", k: "H", sub: "" },
      { t: "极地东风带", k: "W", sub: "东北风：极地高压→副极地低压＋地转偏向" },
      { t: "副极地低气压带", k: "L", sub: "" },
      { t: "盛行西风带", k: "W", sub: "西南风：副热带高压→副极地低压＋地转偏向" },
      { t: "副热带高气压带", k: "H", sub: "" },
      { t: "东北信风带", k: "W", sub: "东北风：副热带高压→赤道低压＋地转偏向" },
      { t: "赤道低气压带", k: "L", sub: "" },
      { t: "东南信风带", k: "W", sub: "东南风：副热带高压→赤道低压＋地转偏向" },
      { t: "副热带高气压带", k: "H", sub: "" },
      { t: "盛行西风带", k: "W", sub: "西北风：副热带高压→副极地低压＋地转偏向" },
      { t: "副极地低气压带", k: "L", sub: "" },
      { t: "极地东风带", k: "W", sub: "东南风：极地高压→副极地低压＋地转偏向" },
      { t: "极地高气压带", k: "H", sub: "" }
    ];
    var sel = -1;
    rows.forEach(function (r, i) {
      var y = top + i * rowH;
      var bg = svgEl("rect", { x: L, y: y, width: W, height: rowH - 6, rx: 6,
        fill: r.k === "H" ? "#f6d9d4" : (r.k === "L" ? "#d4e6f6" : cssVar("--geog-bg-soft", "#f6f4ee")),
        stroke: cssVar("--geog-border", "#e2ddd2"), "stroke-width": 1 });
      svg.appendChild(bg);
      svg.appendChild(svgText(L + 24, y + (rowH - 6) / 2 + 4, r.t, ink, "start"));
      if (r.k !== "W") {
        var badge = svgEl("circle", { cx: L + W - 40, cy: y + (rowH - 6) / 2, r: 15,
          fill: r.k === "H" ? "#d43c2a" : "#2a7de1", opacity: 0.85 });
        svg.appendChild(badge);
        svg.appendChild(svgText(L + W - 40, y + (rowH - 6) / 2 + 5, r.k, "#fff", "middle"));
      }
      var hit = svgEl("rect", { x: L, y: y, width: W, height: rowH - 6, fill: "transparent" });
      svg.appendChild(hit);
      (function (idx) {
        hit.addEventListener("click", function () {
          sel = idx; var rr = rows[idx];
          ro.innerHTML = "<strong>" + esc(rr.t) + "</strong>" +
            (rr.sub ? "——" + esc(rr.sub) : "（气压带：空气下沉/上升形成）") +
            "<br>图例：<strong>红色 H＝高气压，蓝色 L＝低气压——颜色表气压高低，不表冷暖</strong>。";
          store(params.recordKey || "geog_circulation-3d", { row: rr.t, ts: Date.now() });
        });
      })(i);
    });
    cornerNote(svg, "示意｜纬向平均", 800, 500);
    ro.innerHTML = "点每一行：看它是气压带（H/L）还是风带。<strong>风带风向不是背的，是推的</strong>：" +
      "风从高压吹向低压（气压梯度力），再被地转偏向力拐一下——北半球右偏，就得到了东北信风、西南西风（dg14.2.1 回填：地转偏向力）。";
  }
  drawCells();
  tabRow(wrap, ["三圈环流（3D 示意）", "七压六带（点读）"], function (i) {
    mode = i; if (timer) { clearInterval(timer); timer = null; playing = false; }
    if (i === 0) drawCells(); else drawBelts();
    store(params.recordKey || "geog_circulation-3d", { tab: i, ts: Date.now() });
  });
  var prow = el("div", "geog-w2-row");
  var playBtn = el("button", "geog-btn fs-095", "▶ 环流动画");
  playBtn.type = "button";
  playBtn.addEventListener("click", function () {
    if (mode !== 0) return;
    playing = !playing;
    playBtn.textContent = playing ? "⏸ 暂停" : "▶ 环流动画";
    if (playing) timer = setInterval(function () { ph += 0.08; drawCells(); }, 90);
    else if (timer) { clearInterval(timer); timer = null; }
  });
  prow.appendChild(playBtn);
  wrap.appendChild(prow);
  axNote(wrap, "预告：dg14.3.2 会讲季风——到时候你会发现，气压带风带的<strong>季节移动</strong>（随太阳直射点南北移，夏季北移、冬季南移）是它的“第二成因”。");
  var view = {
    resize: function () {},
    destroy: function () { if (timer) clearInterval(timer); untrack(view); },
    state: function () { return { tab: mode }; },
    truth: function () { return { belts: PRESSURE_BELTS, winds: WIND_BELTS }; }
  };
  track(view); return view;
}
window.GEO.registerWidget("circulation-3d", function (box, params, pg) { return Circulation3DView(box, params, pg); });

/* ============================================================
 * §23 monsoon-sim · G11 季风环流模拟（冬夏切换＋海陆热力实验）
 * params: {recordKey}
 * 冻结（§15 B7 类比/G11 spec）：冬/夏两季切换（陆地/海洋气压高低着色 H/L；
 * 海陆间风向箭头动画）；武汉冬夏风向/降水联动读数；沙子 vs 水热力实验；
 * 防混淆句常驻：“季风是海陆热力差异叠加在行星风系上的季节反转”。
 * ============================================================ */
function MonsoonSimView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "季风环流：会“掉头”的风");
  honestyBadge(wrap, "示意｜冬/夏两帧对比，非逐月连续模拟");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var mode = 0, season = "summer", heatT = 0, heatTimer = null;
  var svg = svgEl("svg", { viewBox: "0 0 800 480", role: "img", "aria-label": "季风环流冬夏切换示意" });
  stage.appendChild(svg);
  function drawSeason() {
    svg.innerHTML = "";
    var summer = season === "summer";
    /* 左：海洋；右：陆地 */
    svg.appendChild(svgEl("rect", { x: 40, y: 60, width: 330, height: 340, fill: "#bcd8f5", opacity: 0.8, rx: 10 }));
    svg.appendChild(svgEl("rect", { x: 430, y: 60, width: 330, height: 340, fill: "#cfe6c0", opacity: 0.9, rx: 10 }));
    svg.appendChild(svgText(205, 100, "海洋", ink, "middle"));
    svg.appendChild(svgText(595, 100, "陆地（亚欧大陆）", ink, "middle"));
    /* 气压着色：夏季陆热低压/海高压；冬季反之 */
    function badge(x, y, hl, label) {
      svg.appendChild(svgEl("circle", { cx: x, cy: y, r: 34,
        fill: hl === "H" ? "#d43c2a" : "#2a7de1", opacity: 0.85 }));
      svg.appendChild(svgText(x, y + 6, hl, "#fff", "middle"));
      svg.appendChild(svgText(x, y + 58, label, ink, "middle"));
    }
    if (summer) {
      badge(205, 220, "H", "海洋：高压（凉）");
      badge(595, 220, "L", "陆地：低压（热）");
    } else {
      badge(205, 220, "L", "海洋：低压（暖）");
      badge(595, 220, "H", "陆地：高压（冷）");
    }
    /* 风向箭头：风从高压流向低压 */
    var x1 = summer ? 300 : 500, x2 = summer ? 500 : 300;
    for (var i = 0; i < 3; i++) {
      var y = 300 + i * 36;
      svg.appendChild(svgEl("line", { x1: x1, y1: y, x2: x2, y2: y, stroke: accent2(), "stroke-width": 6, "stroke-linecap": "round" }));
      var dir = x2 > x1 ? 1 : -1;
      svg.appendChild(svgEl("polygon", {
        points: x2 + "," + y + " " + (x2 - dir * 26) + "," + (y - 13) + " " + (x2 - dir * 26) + "," + (y + 13),
        fill: accent2() }));
    }
    function accent2() { return cssVar("--geog-accent", "#2a7de1"); }
    svg.appendChild(svgText(400, 440, summer ? "夏季：风从海洋吹向陆地（偏南风，暖湿多雨）"
      : "冬季：风从陆地吹向海洋（偏北风，干冷少雨）", ink, "middle"));
    cornerNote(svg, "示意｜两帧对比，非连续模拟", 800, 480);
    ro.innerHTML = summer
      ? "<strong>夏季</strong>：陆地“脾气急”被晒得滚烫→<strong>低压</strong>；海洋升温慢→<strong>高压</strong>。" +
        "风从高压流向低压→<strong>偏南风</strong>从海洋吹来，暖湿多雨。武汉：高温多雨，有梅雨、伏旱。"
      : "<strong>冬季</strong>：陆地降温快→<strong>高压</strong>；海洋降温慢→<strong>低压</strong>。" +
        "风从高压流向低压→<strong>偏北风</strong>从陆地吹来，干冷少雨。武汉：湿冷（约 0–5℃），无集中供暖的“魔法攻击”。";
  }
  function drawHeat() {
    svg.innerHTML = "";
    svg.appendChild(svgText(400, 40, "海陆热力差异实验：沙子 vs 水，谁升温快？", ink, "middle"));
    /* 两杯：沙 / 水，加热动画 */
    [["沙子（代指陆地）", 200, "#e3c98f"], ["水（代指海洋）", 600, "#7fb3e8"]].forEach(function (C) {
      svg.appendChild(svgEl("rect", { x: C[1] - 90, y: 120, width: 180, height: 220, rx: 8,
        fill: C[2], opacity: 0.55, stroke: ink, "stroke-width": 2 }));
      svg.appendChild(svgText(C[1], 110, C[0], ink, "middle"));
    });
    /* 温度计条 */
    var tSand = 20 + heatT * 0.9, tWater = 20 + heatT * 0.35;
    [["沙", 200, tSand, "#d43c2a"], ["水", 600, tWater, "#2a7de1"]].forEach(function (T) {
      var h = Math.min(200, (T[2] - 15) * 4);
      svg.appendChild(svgEl("rect", { x: T[1] + 110, y: 340 - h, width: 34, height: h, fill: T[3], rx: 6 }));
      svg.appendChild(svgText(T[1] + 127, 362, "约 " + Math.round(T[2]) + "℃", ink, "middle"));
    });
    svg.appendChild(svgText(400, 420, "同样加热：沙子升温快、降温也快——陆地“脾气急”", soft, "middle"));
    cornerNote(svg, "示意｜定性对比，非实测", 800, 480);
    ro.innerHTML = "点“加热”：同样晒，<strong>沙子（陆地）升温快</strong>，水（海洋）升温慢。" +
      "所以夏天陆地先热成低压、冬天陆地先冷成高压——<strong>海陆热力差异，是季风“掉头”的第一成因</strong>。";
  }
  function drawBg() {
    svg.innerHTML = "";
    svg.appendChild(svgText(400, 60, "大背景：气压带风带的季节移动", ink, "middle"));
    /* 简化的气压带移动示意：夏季北移 */
    [0, 1].forEach(function (s) {
      var yb = 140 + s * 170;
      var lbl = s === 0 ? "夏季（北移）" : "冬季（南移）";
      svg.appendChild(svgText(110, yb, lbl, ink, "middle"));
      var bands = [["副热带高压", 300], ["赤道低压", 470], ["副热带高压", 640]];
      bands.forEach(function (B, bi) {
        var x = B[1] + (s === 0 ? 40 : -40);
        svg.appendChild(svgEl("rect", { x: x - 70, y: yb - 26, width: 140, height: 52, rx: 8,
          fill: bi === 1 ? "#d4e6f6" : "#f6d9d4", stroke: ink, "stroke-width": 1.5 }));
        svg.appendChild(svgText(x, yb + 5, B[0], ink, "middle"));
      });
    });
    svg.appendChild(svgText(400, 400, "南亚夏季风：东南信风越过赤道，受地转偏向力右偏→西南季风", ink, "middle"));
    svg.appendChild(svgText(400, 428, "这就是季风的第二成因：行星风系的季节移动（dg14.3.1 回填）", soft, "middle"));
    cornerNote(svg, "示意", 800, 480);
    ro.innerHTML = "<strong>季风是海陆热力差异叠加在行星风系上的季节反转</strong>（防混淆冻结句）。" +
      "东亚季风以海陆热力差异为主；南亚夏季风还叠加了气压带风带的季节移动——东南信风越赤道偏成西南风，带来丰沛降水（dg07.1.3 印度旱涝的成因，就是它）。";
  }
  drawSeason();
  tabRow(wrap, ["冬夏切换", "热力实验", "大背景回填"], function (i) {
    mode = i;
    if (heatTimer) { clearInterval(heatTimer); heatTimer = null; }
    if (i === 0) drawSeason(); else if (i === 1) { heatT = 0; drawHeat(); } else drawBg();
    store(params.recordKey || "geog_monsoon-sim", { tab: i, ts: Date.now() });
  });
  var srow = el("div", "geog-w2-tabs");
  [["夏季", "summer"], ["冬季", "winter"]].forEach(function (S, i) {
    var b = el("button", "geog-btn fs-095" + (i === 0 ? " on" : ""), esc(S[0]));
    b.type = "button";
    b.addEventListener("click", function () {
      Array.prototype.forEach.call(srow.querySelectorAll("button"), function (x) { x.classList.remove("on"); });
      b.classList.add("on"); season = S[1];
      if (mode === 0) drawSeason();
      store(params.recordKey || "geog_monsoon-sim", { season: season, ts: Date.now() });
    });
    srow.appendChild(b);
  });
  wrap.appendChild(srow);
  var hrow = el("div", "geog-w2-row");
  var heatBtn = el("button", "geog-btn fs-095", "☀ 加热（看谁升温快）");
  heatBtn.type = "button";
  heatBtn.addEventListener("click", function () {
    if (mode !== 1) return;
    if (heatTimer) { clearInterval(heatTimer); heatTimer = null; }
    heatT = 0;
    heatTimer = setInterval(function () {
      heatT += 2; if (heatT >= 60) { clearInterval(heatTimer); heatTimer = null; }
      drawHeat();
    }, 120);
  });
  hrow.appendChild(heatBtn);
  wrap.appendChild(hrow);
  axNote(wrap, "两句话记季风：<strong>陆地脾气急，冬夏压力反；风从高压流向低压，冬夏方向掉个头。</strong>（T8 口径）");
  var view = {
    resize: function () {},
    destroy: function () { if (heatTimer) clearInterval(heatTimer); untrack(view); },
    state: function () { return { tab: mode, season: season }; },
    truth: function () { return { motto: "季风是海陆热力差异叠加在行星风系上的季节反转" }; }
  };
  track(view); return view;
}
window.GEO.registerWidget("monsoon-sim", function (box, params, pg) { return MonsoonSimView(box, params, pg); });

/* ============================================================
 * §24 ocean-current · 世界洋流（8 大洋环流＋暖寒流＋渔场）
 * params: {recordKey}
 * 图件口径：抽象海盆示意（圆角海区＋洋流箭头），不画海岸线/国界
 * （GEO-R23 一票否决规避设计）；角落示意声明常驻。
 * ============================================================ */
function OceanCurrentView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "世界洋流：8 个大洋环流");
  honestyBadge(wrap, "示意｜海盆为抽象示意，不反映真实海岸线");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var svg = svgEl("svg", { viewBox: "0 0 800 500", role: "img", "aria-label": "世界洋流分布示意" });
  stage.appendChild(svg);
  /* 抽象海盆：太平洋（左大）/大西洋（中）/印度洋（右） */
  var basins = [
    { id: "pac", name: "太平洋", x: 40, y: 60, w: 300, h: 380 },
    { id: "atl", name: "大西洋", x: 370, y: 60, w: 170, h: 380 },
    { id: "ind", name: "印度洋", x: 570, y: 140, w: 190, h: 300 }
  ];
  basins.forEach(function (B) {
    svg.appendChild(svgEl("rect", { x: B.x, y: B.y, width: B.w, height: B.h, rx: 26,
      fill: cssVar("--geog-sea", "#dcebf7"), opacity: 0.6, stroke: soft, "stroke-width": 1.5, "stroke-dasharray": "7,5" }));
    svg.appendChild(svgText(B.x + B.w / 2, B.y + 26, B.name + "（示意）", soft, "middle"));
  });
  /* 赤道示意线 */
  svg.appendChild(svgEl("line", { x1: 20, y1: 250, x2: 780, y2: 250,
    stroke: soft, "stroke-width": 1.5, "stroke-dasharray": "8,6", opacity: 0.7 }));
  svg.appendChild(svgText(786, 254, "赤道", soft, "start"));
  function arrow(x1, y1, x2, y2, warm) {
    var c = warm ? "#d43c2a" : "#2a7de1";
    svg.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: c, "stroke-width": 5, "stroke-linecap": "round", opacity: 0.9 }));
    var a = Math.atan2(y2 - y1, x2 - x1);
    svg.appendChild(svgEl("polygon", {
      points: x2 + "," + y2 + " " + (x2 - 20 * Math.cos(a - 0.42)) + "," + (y2 - 20 * Math.sin(a - 0.42)) +
        " " + (x2 - 20 * Math.cos(a + 0.42)) + "," + (y2 - 20 * Math.sin(a + 0.42)), fill: c, opacity: 0.9 }));
  }
  /* 各环流示意箭头（暖流红/寒流蓝；图例常驻） */
  /* 北太平洋副热带（顺时针）：北赤道暖流→日本暖流→北太平洋暖流→加利福尼亚寒流（示意位置） */
  arrow(90, 300, 250, 300, true); arrow(290, 280, 290, 140, true);
  arrow(270, 110, 120, 110, true); arrow(80, 130, 80, 270, false);
  /* 南太平洋副热带（逆时针） */
  arrow(120, 400, 260, 400, false); arrow(290, 380, 290, 300, true);
  /* 北大西洋副热带（顺时针） */
  arrow(390, 300, 500, 300, true); arrow(515, 280, 515, 150, true);
  arrow(495, 120, 405, 120, true); arrow(385, 140, 385, 280, false);
  /* 南大西洋副热带（逆时针） */
  arrow(400, 390, 500, 390, false); arrow(520, 370, 520, 320, true);
  /* 南印度洋副热带（逆时针） */
  arrow(600, 380, 720, 380, false); arrow(735, 360, 735, 280, true);
  /* 副极地两环流（逆时针，北半球） */
  arrow(150, 90, 260, 90, false); arrow(420, 95, 500, 95, false);
  /* 南极绕极流（自西向东） */
  arrow(60, 465, 740, 465, false);
  svg.appendChild(svgText(400, 488, "南极绕极流（自西向东，寒流）", soft, "middle"));
  /* 北印度洋季风洋流（冬夏反向）：画在印度洋北部 */
  var monsoonWinter = true;
  var mg = svgEl("g", {}); svg.appendChild(mg);
  function drawMonsoon() {
    mg.innerHTML = "";
    var y = 200;
    if (monsoonWinter) { arrow2(mg, 600, y, 730, y, true); }
    else { arrow2(mg, 730, y, 600, y, true); }
    var t = svgText(665, y - 18, monsoonWinter ? "冬季：逆时针" : "夏季：顺时针", ink, "middle");
    mg.appendChild(t);
  }
  function arrow2(g, x1, y1, x2, y2, warm) {
    var c = warm ? "#d43c2a" : "#2a7de1";
    g.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: c, "stroke-width": 5,
      "stroke-linecap": "round", "stroke-dasharray": "12,7" }));
    var a = Math.atan2(y2 - y1, x2 - x1);
    g.appendChild(svgEl("polygon", {
      points: x2 + "," + y2 + " " + (x2 - 20 * Math.cos(a - 0.42)) + "," + (y2 - 20 * Math.sin(a - 0.42)) +
        " " + (x2 - 20 * Math.cos(a + 0.42)) + "," + (y2 - 20 * Math.sin(a + 0.42)), fill: c }));
  }
  drawMonsoon();
  /* 渔场标记（可点） */
  var grounds = [
    { n: "北海道渔场", x: 300, y: 120, why: "日本暖流＋千岛寒流交汇" },
    { n: "纽芬兰渔场", x: 525, y: 120, why: "墨西哥湾暖流＋拉布拉多寒流交汇" },
    { n: "北海渔场", x: 480, y: 90, why: "北大西洋暖流＋东格陵兰寒流交汇" },
    { n: "秘鲁渔场", x: 120, y: 360, why: "秘鲁寒流上升流带来营养盐" }
  ];
  grounds.forEach(function (G) {
    var c = svgEl("circle", { cx: G.x, cy: G.y, r: 13, fill: "#2e9e5b", stroke: "#fff", "stroke-width": 2.5 });
    svg.appendChild(c);
    var hit = svgEl("circle", { cx: G.x, cy: G.y, r: 24, fill: "transparent" });
    svg.appendChild(hit);
    function show() {
      ro.innerHTML = "<strong>" + esc(G.n) + "</strong>：成因——" + esc(G.why) + "。" +
        "世界大渔场多在<strong>寒暖流交汇处</strong>或<strong>上升流</strong>海区（饵料丰富）。";
      store(params.recordKey || "geog_ocean-current", { ground: G.n, ts: Date.now() });
    }
    c.addEventListener("click", show); hit.addEventListener("click", show);
  });
  cornerNote(svg, "示意｜不反映真实海岸线", 800, 500);
  /* 图例 */
  var lg = el("div", "geog-w2-legend fs-085");
  lg.innerHTML = '<span><span class="sw" style="border-top-color:#d43c2a"></span>暖流（比流经海区水温高）</span> ' +
    '<span><span class="sw blue"></span>寒流（比流经海区水温低）</span> ' +
    '<span><span class="sw" style="border-top-color:#2e9e5b"></span>大渔场（点开看成因）</span>';
  wrap.appendChild(lg);
  ro.innerHTML = "8 个大洋环流：<strong>5 个副热带环流＋2 个副极地环流＋南极绕极流</strong>。" +
    "规律：副热带环流北顺南逆（北半球顺时针、南半球逆时针），都是<strong>风海流</strong>——信风、西风吹出来的（dg14.3.1 回填）。" +
    "<strong>北印度洋是例外</strong>：季风洋流，冬夏反向（点下面按钮切换）。";
  var mrow = el("div", "geog-w2-tabs");
  [["冬季", true], ["夏季", false]].forEach(function (M, i) {
    var b = el("button", "geog-btn fs-095" + (i === 0 ? " on" : ""), "北印度洋" + esc(M[0]));
    b.type = "button";
    b.addEventListener("click", function () {
      Array.prototype.forEach.call(mrow.querySelectorAll("button"), function (x) { x.classList.remove("on"); });
      b.classList.add("on"); monsoonWinter = M[1]; drawMonsoon();
      ro.innerHTML = monsoonWinter
        ? "<strong>北印度洋冬季</strong>：东北季风驱动，洋流呈<strong>逆时针</strong>。"
        : "<strong>北印度洋夏季</strong>：西南季风驱动，洋流呈<strong>顺时针</strong>——随季风“掉头”而反向（dg14.3.2 回填）。";
      store(params.recordKey || "geog_ocean-current", { monsoon: M[0], ts: Date.now() });
    });
    mrow.appendChild(b);
  });
  wrap.appendChild(mrow);
  /* 环流点读 */
  var grow = el("div", "geog-w2-tabs");
  GYRES.forEach(function (G) {
    var b = el("button", "geog-btn fs-085", esc(G.name));
    b.type = "button";
    b.addEventListener("click", function () {
      ro.innerHTML = "<strong>" + esc(G.name) + "</strong>（" + esc(G.kind) + "，" + esc(G.hemi) + "半球" +
        (G.spin ? "，" + esc(G.spin) : "") + "）：<br>" + esc(G.note) + "。";
      store(params.recordKey || "geog_ocean-current", { gyre: G.name, ts: Date.now() });
    });
    grow.appendChild(b);
  });
  wrap.appendChild(grow);
  axNote(wrap, "<strong>暖流是相对概念</strong>：暖流指比流经海区水温<strong>高</strong>的洋流，不是“热水”。对气候：暖流增温增湿、寒流降温减湿。");
  var view = {
    resize: function () {}, destroy: function () { untrack(view); },
    state: function () { return { monsoonWinter: monsoonWinter }; },
    truth: function () { return { gyres: GYRES }; }
  };
  track(view); return view;
}
window.GEO.registerWidget("ocean-current", function (box, params, pg) { return OceanCurrentView(box, params, pg); });

/* ============================================================
 * §25 water-cycle · 水循环（三种循环＋环节水量）
 * params: {recordKey}
 * ============================================================ */
function WaterCycleView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "水循环：三种循环");
  honestyBadge(wrap, "示意｜水量为教学示意数据，非实测");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var svg = svgEl("svg", { viewBox: "0 0 800 480", role: "img", "aria-label": "水循环示意" });
  stage.appendChild(svg);
  var mode = 0;
  var LINKS = [
    { id: "evap", name: "蒸发", d: "水面/地面水分变成水汽升空", vol: "★★★★★" },
    { id: "trans", name: "水汽输送", d: "水汽随大气环流输送", vol: "★★★★" },
    { id: "prec", name: "降水", d: "水汽凝结以降雨/降雪落下", vol: "★★★★★" },
    { id: "runoff", name: "地表径流", d: "降水沿地表汇入江河", vol: "★★★" },
    { id: "infil", name: "下渗", d: "水分渗入地下成地下水", vol: "★★" },
    { id: "gw", name: "地下径流", d: "地下水缓慢流动，补给江河湖海", vol: "★★" }
  ];
  function arrow(x1, y1, x2, y2, label, linkId, dashed) {
    var c = cssVar("--geog-accent", "#2a7de1");
    svg.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: c, "stroke-width": 5,
      "stroke-linecap": "round", opacity: 0.9, "stroke-dasharray": dashed ? "10,7" : "none" }));
    var a = Math.atan2(y2 - y1, x2 - x1);
    svg.appendChild(svgEl("polygon", {
      points: x2 + "," + y2 + " " + (x2 - 20 * Math.cos(a - 0.42)) + "," + (y2 - 20 * Math.sin(a - 0.42)) +
        " " + (x2 - 20 * Math.cos(a + 0.42)) + "," + (y2 - 20 * Math.sin(a + 0.42)), fill: c, opacity: 0.9 }));
    var mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
    var t = svgText(mx, my - 12, label, ink, "middle");
    svg.appendChild(t);
    var hit = svgEl("circle", { cx: mx, cy: my, r: 30, fill: "transparent" });
    svg.appendChild(hit);
    hit.addEventListener("click", function () { showLink(linkId); });
    t.addEventListener("click", function () { showLink(linkId); });
  }
  function showLink(id) {
    var L = null;
    LINKS.forEach(function (x) { if (x.id === id) L = x; });
    if (!L) return;
    ro.innerHTML = "<strong>" + esc(L.name) + "</strong>：" + esc(L.d) + "（水量示意：" + esc(L.vol) + "）。";
    store(params.recordKey || "geog_water-cycle", { link: L.name, ts: Date.now() });
  }
  function draw() {
    svg.innerHTML = "";
    /* 海洋（左）/陆地（右） */
    svg.appendChild(svgEl("rect", { x: 30, y: 300, width: 330, height: 130, rx: 12, fill: "#bcd8f5", opacity: 0.8 }));
    svg.appendChild(svgText(195, 372, "海洋", ink, "middle"));
    svg.appendChild(svgEl("rect", { x: 440, y: 300, width: 330, height: 130, rx: 12, fill: "#cfe6c0", opacity: 0.9 }));
    svg.appendChild(svgText(605, 372, "陆地", ink, "middle"));
    /* 云 */
    svg.appendChild(svgEl("ellipse", { cx: 400, cy: 110, rx: 150, ry: 46, fill: "#ffffff", stroke: soft, "stroke-width": 2 }));
    svg.appendChild(svgText(400, 116, "云（水汽）", soft, "middle"));
    if (mode === 0) {
      arrow(195, 300, 330, 160, "蒸发", "evap");
      arrow(400, 110, 560, 110, "水汽输送", "trans", true);
      arrow(560, 160, 605, 300, "降水", "prec");
      arrow(605, 430, 400, 430, "地表径流", "runoff");
      arrow(660, 400, 660, 340, "", "infil");
      svg.appendChild(svgText(700, 380, "下渗", ink, "middle"));
      arrow(500, 445, 250, 445, "地下径流", "gw", true);
      ro.innerHTML = "<strong>海陆间循环</strong>：海洋蒸发→水汽输送到陆地上空→降水→地表径流/下渗→回归海洋。" +
        "这是与人类关系最密切的循环——陆地水资源就靠它补给。点箭头看每个环节。";
    } else if (mode === 1) {
      arrow(120, 300, 220, 160, "蒸发", "evap");
      arrow(280, 160, 195, 300, "降水", "prec");
      ro.innerHTML = "<strong>海上内循环</strong>：海洋上空蒸发→降水又落回海洋。" +
        "<strong>它的水量是三种循环中最大的</strong>——海洋占地球表面约 71%，蒸发量最大（dg14.4.1 重点：水循环≠只有“海到陆”）。";
    } else {
      arrow(530, 300, 600, 160, "蒸发", "evap");
      arrow(680, 160, 605, 300, "降水", "prec");
      arrow(605, 430, 520, 430, "地表径流", "runoff");
      ro.innerHTML = "<strong>陆地内循环</strong>：陆地蒸发（含植物蒸腾）→降水又落回陆地。" +
        "内流河（如塔里木河）的水，大多在这里循环——<strong>dg09.3.1 的预告兑现</strong>：内流河不入海，" +
        "它的水或蒸发、或渗入地下，仍在陆地水循环里（滋养绿洲农业，不是“无用”）。";
    }
    cornerNote(svg, "示意｜水量为教学示意", 800, 480);
  }
  draw();
  tabRow(wrap, ["海陆间循环", "海上内循环", "陆地内循环"], function (i) {
    mode = i; draw();
    store(params.recordKey || "geog_water-cycle", { cycle: i, ts: Date.now() });
  });
  axNote(wrap, "水量平衡：全球水量守恒——水不会“用完”，只是在循环（海洋/陆地/大气之间转移）。人类活动（修水库、跨流域调水）能影响循环的环节与速度。");
  var view = {
    resize: function () {}, destroy: function () { untrack(view); },
    state: function () { return { cycle: mode }; },
    truth: function () { return { links: LINKS, biggest: "海上内循环" }; }
  };
  track(view); return view;
}
window.GEO.registerWidget("water-cycle", function (box, params, pg) { return WaterCycleView(box, params, pg); });

/* ============================================================
 * §26 landform-sculpt · 内外力雕塑地貌
 * params: {recordKey}
 * 术语严格化（本课首次，超纲词清单）：生长边界＝张裂处（新地壳诞生）；
 * 消亡边界＝挤压碰撞处（地壳俯冲消亡）。此前章节只用“挤压/张裂”人话。
 * 第 4 tab 为红线辨析①回填挑战（凸高为谷、凸低为脊）。
 * ============================================================ */
function LandformSculptView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "内外力雕塑地貌");
  honestyBadge(wrap, "示意｜时间加速演示，非真实速度");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var accent = cssVar("--geog-accent", "#2a7de1");
  var mode = 0, step = 0, timer = null;
  var svg = svgEl("svg", { viewBox: "0 0 800 480", role: "img", "aria-label": "内外力雕塑地貌示意" });
  stage.appendChild(svg);
  function ground(y) {
    svg.appendChild(svgEl("rect", { x: 60, y: y, width: 680, height: 480 - y, fill: "#d9c49a", opacity: 0.5 }));
  }
  function drawInner() {
    svg.innerHTML = "";
    ground(300);
    svg.appendChild(svgText(400, 60, "内力作用：地壳运动、岩浆活动、变质作用", ink, "middle"));
    /* 挤压→褶皱山（左）；张裂→裂谷（右） */
    svg.appendChild(svgEl("path", { d: "M80,300 Q160,220 240,300 Q320,220 400,300 L400,340 L80,340 Z",
      fill: "#b09a7a", stroke: ink, "stroke-width": 2 }));
    svg.appendChild(svgText(240, 200, "挤压→褶皱山（如喜马拉雅山）", ink, "middle"));
    arrowH(100, 260, 200, 260); arrowH(380, 260, 280, 260);
    svg.appendChild(svgEl("path", { d: "M460,300 L540,380 L640,380 L720,300 L700,300 L620,360 L560,360 L500,300 Z",
      fill: "#8a7a5e", stroke: ink, "stroke-width": 2 }));
    svg.appendChild(svgText(590, 200, "张裂→裂谷（如东非大裂谷）", ink, "middle"));
    arrowH(480, 260, 440, 260); arrowH(700, 260, 740, 260);
    /* 火山 */
    svg.appendChild(svgEl("path", { d: "M120,460 L180,360 L240,360 L300,460 Z", fill: "#a08060", stroke: ink, "stroke-width": 2 }));
    svg.appendChild(svgEl("path", { d: "M210,360 q-30,-60 10,-90 q30,30 10,90", fill: "none", stroke: "#d43c2a", "stroke-width": 5 }));
    svg.appendChild(svgText(210, 440, "火山喷发", ink, "middle"));
    cornerNote(svg, "示意", 800, 480);
    ro.innerHTML = "<strong>内力</strong>塑造地表的“骨架”：板块<strong>挤压</strong>→褶皱成山、" +
      "板块<strong>张裂</strong>→裂谷/海洋。术语严格化（本课首次）：" +
      "<strong>生长边界</strong>＝张裂处，新地壳不断诞生（如大西洋中脊）；" +
      "<strong>消亡边界</strong>＝挤压碰撞处，地壳俯冲消亡（如喜马拉雅山还在长高、海沟）。" +
      "（dg02.2.2 回填登记：以前只说“挤压/张裂”，现在有了严格名。）";
  }
  function arrowH(x1, y1, x2, y2) {
    svg.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2, stroke: "#d43c2a", "stroke-width": 5, "stroke-linecap": "round" }));
    var a = Math.atan2(y2 - y1, x2 - x1);
    svg.appendChild(svgEl("polygon", {
      points: x2 + "," + y2 + " " + (x2 - 18 * Math.cos(a - 0.42)) + "," + (y2 - 18 * Math.sin(a - 0.42)) +
        " " + (x2 - 18 * Math.cos(a + 0.42)) + "," + (y2 - 18 * Math.sin(a + 0.42)), fill: "#d43c2a" }));
  }
  function drawOuter() {
    svg.innerHTML = "";
    ground(320);
    svg.appendChild(svgText(400, 60, "外力作用：风化→侵蚀→搬运→堆积", ink, "middle"));
    var items = [
      ["流水侵蚀", "长江三峡、黄土高原千沟万壑", 170],
      ["流水堆积", "长江三角洲、华北平原", 400],
      ["风力作用", "雅丹地貌（侵蚀）、沙丘（堆积）", 630]
    ];
    items.forEach(function (It) {
      svg.appendChild(svgEl("rect", { x: It[2] - 100, y: 120, width: 200, height: 150, rx: 10,
        fill: cssVar("--geog-bg-soft", "#f6f4ee"), stroke: ink, "stroke-width": 1.5 }));
      svg.appendChild(svgText(It[2], 160, It[0], ink, "middle"));
      var words = It[1].split("、");
      words.forEach(function (w, wi) { svg.appendChild(svgText(It[2], 195 + wi * 26, w, soft, "middle")); });
      var hit = svgEl("rect", { x: It[2] - 100, y: 120, width: 200, height: 150, fill: "transparent" });
      svg.appendChild(hit);
      (function (t, d) {
        hit.addEventListener("click", function () {
          ro.innerHTML = "<strong>" + esc(t) + "</strong>：" + esc(d) + "。" +
            "外力像雕刻刀，削高填低——地表趋于平坦。";
          store(params.recordKey || "geog_landform-sculpt", { outer: t, ts: Date.now() });
        });
      })(It[0], It[1]);
    });
    svg.appendChild(svgText(400, 420, "海浪侵蚀海岸、冰川刨蚀山谷——外力无处不在", soft, "middle"));
    cornerNote(svg, "示意", 800, 480);
    ro.innerHTML = "点三张卡片：<strong>流水</strong>下切成谷、搬运泥沙堆成平原；<strong>风力</strong>在干旱区雕出雅丹、堆出沙丘。" +
      "记住链条：<strong>风化（碎）→侵蚀（搬走）→搬运（带着走）→堆积（放下）</strong>。";
  }
  function drawRace() {
    svg.innerHTML = "";
    var stages = [
      ["① 内力抬升", "地壳挤压，山地隆起", "M60,340 L200,200 L340,340 Z"],
      ["② 流水下切", "河流切出 V 形谷", "M60,340 L200,200 L260,300 L340,340 Z"],
      ["③  valley 展宽", "谷坡崩塌，谷地展宽", "M60,340 L200,240 L300,340 Z"],
      ["④ 堆积成平原", "泥沙堆积，地表趋平", "M60,340 L740,340 L740,360 L60,360 Z"]
    ];
    /* 修正第 3 步标题（不用英文） */
    stages[2][0] = "③ 河谷展宽";
    var s = stages[Math.min(step, 3)];
    svg.appendChild(svgText(400, 60, "时间加速：内力 vs 外力的“较量”", ink, "middle"));
    ground(340);
    svg.appendChild(svgEl("path", { d: s[2], fill: "#b09a7a", stroke: ink, "stroke-width": 2 }));
    if (step === 1 || step === 2) {
      svg.appendChild(svgEl("path", { d: "M200,200 q30,60 0,140", fill: "none", stroke: "#2a7de1", "stroke-width": 6 }));
      svg.appendChild(svgText(280, 280, "河流", "#2a7de1", "middle"));
    }
    svg.appendChild(svgText(400, 420, s[0] + "：" + s[1], ink, "middle"));
    var dots = "";
    for (var i = 0; i < 4; i++) dots += (i === step ? "● " : "○ ");
    svg.appendChild(svgText(400, 100, dots, soft, "middle"));
    cornerNote(svg, "示意｜时间加速，非真实速度", 800, 480);
    ro.innerHTML = "<strong>" + esc(s[0]) + "</strong>——" + esc(s[1]) + "。" +
      "结论：<strong>地貌是内外力共同作用、漫长过程的结果</strong>，不是一次成型的（dg14.4.2 重点纠偏）。";
  }
  function drawQuiz() {
    svg.innerHTML = "";
    svg.appendChild(svgText(400, 50, "回填挑战：等高线“凸高为谷、凸低为脊”（dg01.3.3 立靶）", ink, "middle"));
    /* 左图：等高线向高处凸（山谷）；右图：向低处凸（山脊） */
    function contour(cx, bulgeHigh) {
      for (var i = 0; i < 5; i++) {
        var v = 100 + i * 60, off = i * 26;
        var d;
        if (bulgeHigh) d = "M" + (cx - 110) + "," + (300 + off) + " Q" + cx + "," + (300 + off - 70) + " " + (cx + 110) + "," + (300 + off);
        else d = "M" + (cx - 110) + "," + (300 - off) + " Q" + cx + "," + (300 - off + 70) + " " + (cx + 110) + "," + (300 - off);
        svg.appendChild(svgEl("path", { d: d, fill: "none", stroke: "#8a6f4d", "stroke-width": 2.5 }));
      }
      svg.appendChild(svgText(cx, 120, "高程" + (bulgeHigh ? "↑（向高处凸）" : "↓（向低处凸）"), soft, "middle"));
      /* 河流：只画在山谷里 */
      if (bulgeHigh) {
        svg.appendChild(svgEl("path", { d: "M" + cx + ",180 Q" + (cx - 14) + ",280 " + cx + ",380",
          fill: "none", stroke: "#2a7de1", "stroke-width": 5 }));
        svg.appendChild(svgText(cx + 44, 300, "河流", "#2a7de1", "middle"));
      }
    }
    contour(210, true); contour(590, false);
    svg.appendChild(svgText(210, 440, "左图：判读？", ink, "middle"));
    svg.appendChild(svgText(590, 440, "右图：判读？", ink, "middle"));
    cornerNote(svg, "示意", 800, 480);
    ro.innerHTML = "点下面的按钮作答：左图等高线向<strong>高处</strong>凸→？右图向<strong>低处</strong>凸→？" +
      "（流水侵蚀形成山谷——“谷”字有了成因，不再是口诀；dg02.2.2 回填：挤压/张裂有了地貌后果。）";
  }
  drawInner();
  tabRow(wrap, ["内力", "外力", "较量（时间加速）", "回填挑战①"], function (i) {
    mode = i; step = 0;
    if (timer) { clearInterval(timer); timer = null; }
    if (i === 0) drawInner(); else if (i === 1) drawOuter(); else if (i === 2) drawRace(); else drawQuiz();
    store(params.recordKey || "geog_landform-sculpt", { tab: i, ts: Date.now() });
  });
  var qrow = el("div", "geog-w2-tabs");
  [["左图是山谷", true], ["左图是山脊", false]].forEach(function (O) {
    var b = el("button", "geog-btn fs-095", esc(O[0]));
    b.type = "button";
    b.addEventListener("click", function () {
      if (mode !== 3) { ro.innerHTML = "先切到“回填挑战①”页再作答。"; return; }
      var ok = O[1] === true;
      ro.innerHTML = ok
        ? "<strong>✓ 答对了。</strong>左图等高线向高处凸＝<strong>山谷</strong>（河流发育在山谷里）；右图向低处凸＝<strong>山脊</strong>（分水岭）。口诀：<strong>凸高为谷、凸低为脊</strong>。"
        : "<strong>✗ 再想想。</strong>看凸起指向的是高程变大还是变小的方向——向高处凸的是山谷。";
      store(params.recordKey || "geog_landform-sculpt", { quiz: O[0], ok: ok, ts: Date.now() });
    });
    qrow.appendChild(b);
  });
  wrap.appendChild(qrow);
  var srow = el("div", "geog-w2-row");
  var nextBtn = el("button", "geog-btn fs-095", "下一步（时间加速）");
  nextBtn.type = "button";
  nextBtn.addEventListener("click", function () {
    if (mode !== 2) return;
    step = (step + 1) % 4; drawRace();
  });
  srow.appendChild(nextBtn);
  wrap.appendChild(srow);
  var view = {
    resize: function () {}, destroy: function () { if (timer) clearInterval(timer); untrack(view); },
    state: function () { return { tab: mode, step: step }; },
    truth: function () { return { terms: ["生长边界", "消亡边界"], firstAt: "dg14.4.2" }; }
  };
  track(view); return view;
}
window.GEO.registerWidget("landform-sculpt", function (box, params, pg) { return LandformSculptView(box, params, pg); });

/* ============================================================
 * §27 vegetation-zones · 植被—气候对应（水平/垂直地带性＋土壤）
 * params: {recordKey}
 * ============================================================ */
function VegetationZonesView(box, params, pg) {
  params = params || {};
  var wrap = head(box, "植被与土壤：跟着气候走");
  honestyBadge(wrap, "示意｜植被带界线为渐变带中心线");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
  var mode = 0;
  var svg = svgEl("svg", { viewBox: "0 0 800 480", role: "img", "aria-label": "植被地带性示意" });
  stage.appendChild(svg);
  var ZONES = [
    ["热带雨林", "全年高温多雨", "#1e7a3c"],
    ["热带草原", "干湿季分明", "#a8b545"],
    ["热带荒漠", "全年高温少雨", "#e0c060"],
    ["亚热带常绿阔叶林", "夏季高温多雨，冬季温和", "#3f9e4d"],
    ["温带落叶阔叶林", "四季分明", "#7ab648"],
    ["温带草原", "降水较少", "#c0c060"],
    ["亚寒带针叶林", "冬季严寒漫长", "#2e6e46"],
    ["苔原", "最热月不足 10℃", "#8fa88f"]
  ];
  function drawH() {
    svg.innerHTML = "";
    svg.appendChild(svgText(400, 40, "水平地带性：从赤道到两极", ink, "middle"));
    var bw = 700 / ZONES.length;
    ZONES.forEach(function (Z, i) {
      var x = 50 + i * bw;
      svg.appendChild(svgEl("rect", { x: x, y: 90, width: bw - 6, height: 200, rx: 8, fill: Z[2], opacity: 0.85, stroke: ink, "stroke-width": 1.5 }));
      var t = svgEl("text", { x: x + (bw - 6) / 2, y: 195, "text-anchor": "middle", fill: "#fff", "font-size": "12.5" });
      t.textContent = Z[0];
      svg.appendChild(t);
      var hit = svgEl("rect", { x: x, y: 90, width: bw - 6, height: 200, fill: "transparent" });
      svg.appendChild(hit);
      (function (zz) {
        function show() {
          ro.innerHTML = "<strong>" + esc(zz[0]) + "</strong>：对应<strong>" + esc(zz[1]) + "</strong>的气候。" +
            "植被分布不是随机的——<strong>随气候呈带状</strong>（dg03.2 回填：气候类型决定植被类型）。";
          store(params.recordKey || "geog_vegetation-zones", { zone: zz[0], ts: Date.now() });
        }
        hit.addEventListener("click", show); t.addEventListener("click", show);
      })(Z);
    });
    svg.appendChild(svgText(50, 330, "赤道", soft, "start"));
    svg.appendChild(svgText(750, 330, "极地", soft, "end"));
    svg.appendChild(svgText(400, 380, "秦岭—淮河线以南：亚热带常绿阔叶林；以北：温带落叶阔叶林（点“秦岭南北对比”）", ink, "middle"));
    cornerNote(svg, "示意｜界线为渐变带中心线", 800, 480);
    ro.innerHTML = "点每个植被带：看它对应的气候。规律：<strong>以热量为驱动的纬度地带性</strong>——" +
      "赤道热、极地冷，植被跟着热量走（dg14.3.3 回填：太阳辐射是第一成因）。";
  }
  function drawQinling() {
    svg.innerHTML = "";
    svg.appendChild(svgText(400, 40, "秦岭南北对比：同一条山脉，两副面孔", ink, "middle"));
    /* 山体 */
    svg.appendChild(svgEl("path", { d: "M150,380 L400,140 L650,380 Z", fill: "#a8b48f", stroke: ink, "stroke-width": 2 }));
    svg.appendChild(svgText(400, 130, "秦岭", ink, "middle"));
    /* 南坡 */
    svg.appendChild(svgEl("rect", { x: 150, y: 400, width: 220, height: 60, rx: 8, fill: "#3f9e4d", opacity: 0.9 }));
    svg.appendChild(svgText(260, 436, "南坡：亚热带常绿阔叶林", "#fff", "middle"));
    /* 北坡 */
    svg.appendChild(svgEl("rect", { x: 430, y: 400, width: 220, height: 60, rx: 8, fill: "#7ab648", opacity: 0.9 }));
    svg.appendChild(svgText(540, 436, "北坡：温带落叶阔叶林", "#fff", "middle"));
    svg.appendChild(svgText(400, 300, "← 南：暖湿", ink, "middle"));
    svg.appendChild(svgText(400, 330, "北：较干冷 →", ink, "middle"));
    cornerNote(svg, "示意", 800, 480);
    ro.innerHTML = "<strong>秦岭—淮河线</strong>是我国重要的地理分界线：以南亚热带（常绿阔叶林）、" +
      "以北暖温带（落叶阔叶林）。记住：<strong>分界线是渐变带的中心线</strong>，不是刀切的。";
  }
  function drawV() {
    svg.innerHTML = "";
    svg.appendChild(svgText(400, 40, "垂直地带性：高山上的“立体气候”", ink, "middle"));
    svg.appendChild(svgEl("path", { d: "M250,420 L400,120 L550,420 Z", fill: "#b0a080", stroke: ink, "stroke-width": 2 }));
    var vz = [
      ["高山灌丛草甸", 200],
      ["针叶林", 260],
      ["落叶阔叶林", 320],
      ["常绿阔叶林（山麓）", 380]
    ];
    vz.forEach(function (V) {
      svg.appendChild(svgEl("line", { x1: 250, y1: V[1], x2: 550, y2: V[1], stroke: "#fff", "stroke-width": 2, "stroke-dasharray": "6,4" }));
      svg.appendChild(svgText(600, V[1] + 4, V[0], ink, "start"));
    });
    svg.appendChild(svgText(400, 452, "海拔升高≈纬度升高：山脚到山顶，植被像从赤道走到极地", soft, "middle"));
    cornerNote(svg, "示意", 800, 480);
    ro.innerHTML = "<strong>垂直地带性</strong>：海拔每升高，气温下降（约 0.6℃/100m），" +
      "植被随之成带变化——山脚到山顶，仿佛从低纬走到了高纬。";
  }
  function drawSoil() {
    svg.innerHTML = "";
    svg.appendChild(svgText(400, 40, "土壤：气候＋生物＋时间共同的作品", ink, "middle"));
    var soils = [
      ["黑土", "东北平原", "冷湿气候＋草原植被，腐殖质厚，最肥沃", "#3a2e22"],
      ["红壤", "南方丘陵", "高温多雨，铁铝氧化，酸性", "#b0502e"]
    ];
    soils.forEach(function (S, i) {
      var x = 120 + i * 320;
      for (var l = 0; l < 4; l++) {
        svg.appendChild(svgEl("rect", { x: x, y: 120 + l * 60, width: 200, height: 56,
          fill: S[3], opacity: 0.9 - l * 0.18, stroke: ink, "stroke-width": 1.5 }));
      }
      svg.appendChild(svgText(x + 100, 100, S[0] + "（" + S[1] + "）", ink, "middle"));
      svg.appendChild(svgText(x + 100, 400, S[2], soft, "middle"));
    });
    cornerNote(svg, "示意", 800, 480);
    ro.innerHTML = "<strong>黑土</strong>（东北）：腐殖质层厚，最肥沃——冷湿＋草原＋时间；" +
      "<strong>红壤</strong>（南方）：高温多雨淋溶，偏酸性。土壤是成土母质、气候、生物、地形、时间五因素的孩子（缺一不可，不能只归因于一个因素）。";
  }
  drawH();
  tabRow(wrap, ["水平地带性", "秦岭南北对比", "垂直地带性", "土壤"], function (i) {
    mode = i;
    if (i === 0) drawH(); else if (i === 1) drawQinling(); else if (i === 2) drawV(); else drawSoil();
    store(params.recordKey || "geog_vegetation-zones", { tab: i, ts: Date.now() });
  });
  var view = {
    resize: function () {}, destroy: function () { untrack(view); },
    state: function () { return { tab: mode }; },
    truth: function () { return { zones: ZONES.map(function (z) { return z[0]; }) }; }
  };
  track(view); return view;
}
window.GEO.registerWidget("vegetation-zones", function (box, params, pg) { return VegetationZonesView(box, params, pg); });

})();
