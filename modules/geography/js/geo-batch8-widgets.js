/* ============================================================
 * 学习工具箱 · 地理 · 批 8 新增渲染器（dg15 区域发展与人地关系用）
 *
 * 本文件在 js/geography.js 之后引入，经 window.GEO.registerWidget
 * 注册 6 个新类型（RENDERERS.md §28–§33）：
 *  §28 pop-pyramid      人口增长三模式曲线＋三国人口金字塔（Y23）
 *  §29 site-select      产业区位权衡器：三城参数卡＋权重排序（Y22）
 *  §30 route-planner    交通选线沙盘：三线权衡（自然＋经济综合）
 *  §31 overlay-map      C 级剪影叠加图：strategy（区域战略）/resources（资源调配三线）
 *  §32 sustain-balance  可持续发展三支柱权重拖拽
 *  §33 monsoon-timeline 梅雨/伏旱时间轴（dg09.2.2 回填③落点）
 *
 * 复用既有渲染器：cause-chain（dg15.1.2 城市化问题↔对策配对；
 *   dg15.3.2 环境因果链 sequence）、timezone-calc（G6，dg15.2.2-p3
 *   航班时刻换算）、geo-schematic（dg15.2.4 武汉城市圈 whc 板，
 *   板定义见 geo-batch6-widgets.js BOARDS.whc）、guess-verify（各课收官小测）。
 *
 * 图件定级（GEO-RULING-2026-10-17-08）：本批新增图件全部为人文地理
 * 过程/结构示意（人口曲线/金字塔/区位参数卡/选线/叠加/权重/时间轴），
 * overlay-map 复用已签发 C 级剪影几何（cn-silhouette，expert-signed），
 * 叠加层只画示意点位/示意折线/文字标签，不画任何省界/板块分界线/
 * 国界线，不新增涉界几何，故不触发 -08/-09 审定签发流程；
 * 逐页核实结论见 dg15.js 文件头。
 * 诚实口径：全部示意页角落常驻「示意」声明（GEO-R24）；
 * 教学示意数据页配「教学示意数据」声明（GEO-AX01）；曲线/动画角注
 * 「示意，非精确比例/速度」。
 *
 * 真值：window.GeoBatch8.*（场层纯函数/数据表，渲染与断言共用）；
 * view.state() 为 UI 可达值；view.truth() 为场层真值
 * （GEO-RULING-2026-10-17-03 分场层/UI 两类）。
 * 零外部请求；深浅双色走 --geog-*（绘制函数内实时读 CSS 变量，
 * 主题切换后 resize 即跟随）；触摸热区 ≥44px；
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
/* C 级剪影底图（复用已签发几何 cn-silhouette，expert-signed；
 * 画法仿 geo-batch6-widgets.js drawSilhouetteBase：大陆围合＋台湾岛/海南岛
 * 单独绘制；不画国界线/省界/十段线） */
function drawSilhouetteBase(svg) {
  var meta = window.GEOGRAPHY_DATA.schematicPathsMeta;
  var asset = meta.byAssetId("cn-silhouette");
  var paths = asset.paths;
  var landFill = cssVar("--geog-land", "#f3e9d2");
  var seaFill = cssVar("--geog-sea", "#dcebf7");
  var soft = cssVar("--geog-ink-soft", "#4a4a4a");
  svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 800, height: 640, fill: seaFill, opacity: 0.55 }));
  var g = svgEl("g", { "class": "geog-base" });
  svg.appendChild(g);
  var cpts = paths.coast.replace(/^M/, "").split(/ L/).map(function (s) { return s.trim(); });
  g.appendChild(svgEl("path", {
    d: paths.nationalLand + " L" + cpts.join(" L") + " Z",
    fill: landFill, stroke: soft, "stroke-width": 1.2, opacity: 0.9
  }));
  var tw = meta.provinceById("tw"), hi = meta.provinceById("hi");
  g.appendChild(svgEl("path", { d: tw.path, fill: landFill, stroke: soft, "stroke-width": 1.2 }));
  g.appendChild(svgEl("path", { d: hi.path, fill: landFill, stroke: soft, "stroke-width": 1.2 }));
  g.appendChild(svgText(tw.labelPt[0], tw.labelPt[1], "台湾岛", soft));
  return { g: g, tw: tw, hi: hi };
}
function provinceCapital(id) {
  try { return window.GEOGRAPHY_DATA.schematicPathsMeta.provinceById(id).capitalPt; }
  catch (e) { return [400, 320]; }
}

/* ============================================================
 * 场层真值（window.GeoBatch8）：教学示意数据与纯函数
 * ============================================================ */
/* 人口增长三模式（人教版口径；"高高低/高低高/低低低"为出生率-死亡率-自然增长率） */
var POP_MODES = [
  { id: "primitive", name: "原始型", pattern: "高—高—低",
    birth: "高出生率", death: "高死亡率", growth: "低自然增长率",
    note: "生产力水平低，医疗卫生条件差：生得多，夭折也多，人口增长缓慢。" },
  { id: "traditional", name: "传统型", pattern: "高—低—高",
    birth: "高出生率", death: "低死亡率", growth: "高自然增长率",
    note: "医疗卫生改善，死亡率先降下来：生得还是多，人口快速增长。" },
  { id: "modern", name: "现代型", pattern: "低—低—低",
    birth: "低出生率", death: "低死亡率", growth: "低自然增长率",
    note: "生育观念转变：生得少，活得长，人口增长缓慢甚至负增长。我国已进入现代型（2020 年七普口径）。" }
];
/* 三国人口金字塔（定性形态；初中只给定性，Y23 口径） */
var POP_PYRAMIDS = [
  { id: "nga", name: "尼日利亚", shape: "扩张型", shapeNote: "上尖下宽：少年儿童比重大，人口增长快",
    oldShare: "低", story: "高出生率，人口年龄结构年轻。" },
  { id: "chn", name: "中国", shape: "稳定型", shapeNote: "上下较匀：人口增长趋缓（2020 年七普口径）",
    oldShare: "较高", story: "已进入现代型增长模式，老龄化进程加快。" },
  { id: "jpn", name: "日本", shape: "收缩型", shapeNote: "上宽下窄：老年人口比重大，人口负增长",
    oldShare: "高", story: "低出生率＋长寿：典型的老龄化社会。" }
];
/* 产业区位：三候选城参数卡（教学示意数据）＋三产业主导因素 */
var SITE_CANDIDATES = [
  { id: "a", name: "临江市", params: { "原料": 5, "市场": 2, "交通": 3, "劳动力": 4, "政策": 2 },
    note: "铁矿丰富，临江但港口小；市场腹地小，政策一般。" },
  { id: "b", name: "海港市", params: { "原料": 1, "市场": 5, "交通": 5, "劳动力": 4, "政策": 4 },
    note: "大港口、市场广、政策优惠；本地无矿产，原料全靠运入。" },
  { id: "c", name: "科技城", params: { "原料": 1, "市场": 3, "交通": 4, "劳动力": 3, "政策": 5 },
    note: "高校云集、技术人才多、政策最优惠；原料、市场都一般。" }
];
var SITE_INDUSTRIES = [
  { id: "steel", name: "钢铁厂", keyFactor: "原料", best: "a",
    why: "钢铁厂最怕缺原料和燃料：铁矿＋焦炭运量大、运费贵，临矿布局最划算。" },
  { id: "software", name: "软件园", keyFactor: "政策", best: "c",
    why: "软件园最怕缺人才和政策：技术人才＋优惠政策是命根子，原料无所谓。" },
  { id: "garment", name: "服装厂", keyFactor: "劳动力", best: "b",
    why: "服装厂最怕缺劳动力和市场：工人多、离市场近，原料（布料）轻便好运。" }
];
/* 交通选线：三线权衡（教学示意数据） */
var ROUTE_SCENARIO = {
  from: "山北市", to: "海港市",
  obstacle: "横断山脉（示意）", town: "粮仓镇（平原农业区，示意）",
  routes: [
    { id: "A", name: "A 线：直线穿山", dist: "最短", cost: "最高（隧道＋桥梁多）", benefit: "不经过粮仓镇",
      verdict: "距离最短，但建设成本最高、地质风险大，且带动不了沿线经济。" },
    { id: "B", name: "B 线：绕山经粮仓镇", dist: "中等", cost: "中等", benefit: "带动粮仓镇农产品外运",
      verdict: "最优：避开高山深谷（自然），又带动沿线据点（经济）——自然＋经济综合。" },
    { id: "C", name: "C 线：平原大迂回", dist: "最长", cost: "较低", benefit: "绕远，时效差",
      verdict: "建设便宜但绕远太多，运输时效差——“最便宜”不等于“最合适”。" }
  ],
  best: "B"
};
/* 可持续发展情景（定性反馈） */
var SUSTAIN_CASES = [
  { id: "weihu", name: "围湖造田（历史）",
    story: "上世纪，为多种粮食，湖区大规模围湖造田：耕地一时增加了。",
    hint: "想一想：湖泊的调蓄洪水、净化水质功能被谁接管了？（呼应 dg09.2.2）" },
  { id: "tuitian", name: "退田还湖（今)",
    story: "退田还湖、退耕还林：把湖还给湖，洪水有了“缓冲垫”。",
    hint: "发展没停：生态旅游、绿色农业接上了——“既发展又保护”。" },
  { id: "guangfu", name: "光伏治沙",
    story: "沙漠里铺光伏板：发电卖钱，板下还能种草固沙。",
    hint: "经济、生态双收：这就是“绿水青山就是金山银山”的样子。" }
];
/* 梅雨/伏旱时间轴：月份→阶段（场层纯函数；m 为月份，支持 .5） */
function monsoonPhase(m) {
  if (m < 6) return { key: "pre", name: "华南前汛期", rain: "雨带在华南",
    note: "4–5 月：南海夏季风先到华南，华南先进入雨季。" };
  if (m < 6.5) return { key: "mei", name: "梅雨", rain: "雨带在长江中下游",
    note: "6 月中下旬–7 月上旬：江淮准静止锋在长江中下游摆动→阴雨连绵（“黄梅时节家家雨”）。" };
  if (m < 7.5) return { key: "mei", name: "梅雨", rain: "雨带在长江中下游",
    note: "6 月中下旬–7 月上旬：江淮准静止锋在长江中下游摆动→阴雨连绵（“黄梅时节家家雨”）。" };
  if (m <= 8.5) return { key: "fuhan", name: "伏旱", rain: "副高控制长江中下游",
    note: "7 月中下旬–8 月：副热带高压控制→晴热少雨，“火炉”发威。" };
  return { key: "north", name: "雨带北移", rain: "雨带到华北、东北",
    note: "8 月下旬–9 月：雨带北移至华北、东北，长江中下游雨季结束。" };
}
window.GeoBatch8 = {
  POP_MODES: POP_MODES, POP_PYRAMIDS: POP_PYRAMIDS,
  SITE_CANDIDATES: SITE_CANDIDATES, SITE_INDUSTRIES: SITE_INDUSTRIES,
  ROUTE_SCENARIO: ROUTE_SCENARIO, SUSTAIN_CASES: SUSTAIN_CASES,
  monsoonPhase: monsoonPhase
};

/* ============================================================
 * §28 pop-pyramid · 人口增长三模式曲线＋三国人口金字塔（Y23）
 * params: {recordKey}
 * ============================================================ */
function PopPyramidView(box, params) {
  params = params || {};
  var wrap = head(box, "人口增长：三模式＋金字塔");
  honestyBadge(wrap, "示意｜非精确比例｜教学示意数据");
  tabRow(wrap, ["三模式曲线", "人口金字塔"], function (i) { show(i); });
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  axNote(wrap, "数据年份：我国模式判定为 2020 年第七次人口普查口径；三国金字塔为教学示意形态（初中只看定性：扩张/稳定/收缩）。");
  var recordKey = params.recordKey || "geog_pop-pyramid";
  var tab = 0, modeIdx = 2, pyrIdx = 1;

  function drawCurve() {
    stage.innerHTML = "";
    var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
    var birthC = cssVar("--geog-temp", "#d4694e"), deathC = cssVar("--geog-cold", "#3f8fd2");
    var growC = cssVar("--geog-correct", "#2e9e6b");
    var svg = svgEl("svg", { viewBox: "0 0 800 480", role: "img", "aria-label": "人口增长三模式曲线示意" });
    stage.appendChild(svg);
    /* 坐标轴 */
    svg.appendChild(svgEl("line", { x1: 90, y1: 400, x2: 740, y2: 400, stroke: soft, "stroke-width": 2 }));
    svg.appendChild(svgEl("line", { x1: 90, y1: 400, x2: 90, y2: 40, stroke: soft, "stroke-width": 2 }));
    svg.appendChild(svgText(415, 440, "时间 →（原始 → 传统 → 现代）", soft));
    svg.appendChild(svgText(40, 220, "比率", soft, "middle"));
    /* 三阶段背景 */
    var zones = [[90, 306, "原始型"], [306, 523, "传统型"], [523, 740, "现代型"]];
    zones.forEach(function (z, i) {
      svg.appendChild(svgEl("rect", { x: z[0], y: 40, width: z[1] - z[0], height: 360,
        fill: i === modeIdx ? cssVar("--geog-highlight", "#ffd54a") : "none", opacity: i === modeIdx ? 0.25 : 0 }));
      svg.appendChild(svgText((z[0] + z[1]) / 2, 64, z[2], soft));
    });
    /* 三条曲线（示意）：出生率先高后低；死亡率先降；自然增长率先升后降 */
    function path(pts, color, dash) {
      var d = pts.map(function (p, i) { return (i ? " L" : "M") + p[0] + "," + p[1]; }).join("");
      svg.appendChild(svgEl("path", { d: d, fill: "none", stroke: color, "stroke-width": 5,
        "stroke-dasharray": dash || "none", "stroke-linecap": "round" }));
    }
    path([[90, 120], [306, 120], [523, 300], [740, 330]], birthC);
    path([[90, 130], [200, 260], [306, 320], [523, 340], [740, 345]], deathC, "10,6");
    path([[90, 360], [200, 250], [306, 160], [523, 250], [740, 330]], growC);
    /* 图例 */
    var lg = [[110, birthC, "出生率（实线）"], [300, deathC, "死亡率（虚线）"], [490, growC, "自然增长率（粗线）"]];
    lg.forEach(function (L) {
      svg.appendChild(svgEl("line", { x1: L[0], y1: 30, x2: L[0] + 36, y2: 30, stroke: L[1], "stroke-width": 5 }));
      svg.appendChild(svgText(L[0] + 44, 34, L[2], ink, "start"));
    });
    /* 模式按钮 */
    var btnRow = el("div", "geog-w2-btnrow");
    POP_MODES.forEach(function (m, i) {
      var b = el("button", "geog-btn fs-095" + (i === modeIdx ? " on" : ""), esc(m.name));
      b.type = "button";
      b.addEventListener("click", function () { modeIdx = i; drawCurve(); });
      btnRow.appendChild(b);
    });
    stage.appendChild(btnRow);
    var m = POP_MODES[modeIdx];
    ro.innerHTML = "<strong>" + esc(m.name) + "（" + esc(m.pattern) + "）</strong>：" +
      esc(m.birth) + "、" + esc(m.death) + "、" + esc(m.growth) + "。<br>" + esc(m.note);
    cornerNote(svg, "示意｜非精确比例", 800, 480);
  }

  function drawPyramid() {
    stage.innerHTML = "";
    /* 清掉 drawCurve 加的按钮行（stage.innerHTML 已清） */
    var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
    var svg = svgEl("svg", { viewBox: "0 0 800 420", role: "img", "aria-label": "三国人口金字塔形态示意" });
    stage.appendChild(svg);
    var btnRow = el("div", "geog-w2-btnrow");
    POP_PYRAMIDS.forEach(function (p, i) {
      var b = el("button", "geog-btn fs-095" + (i === pyrIdx ? " on" : ""), esc(p.name));
      b.type = "button";
      b.addEventListener("click", function () { pyrIdx = i; drawPyramid(); });
      btnRow.appendChild(b);
    });
    stage.appendChild(btnRow);
    var p = POP_PYRAMIDS[pyrIdx];
    /* 金字塔形态（示意）：扩张型下宽上窄 / 稳定型上下较匀 / 收缩型下窄上宽 */
    var cx = 400, top = 60, bot = 360;
    var widths;
    if (p.id === "nga") widths = [300, 250, 200, 140, 80];
    else if (p.id === "chn") widths = [200, 210, 200, 180, 140];
    else widths = [120, 150, 180, 190, 180];
    var labels = ["0–14 岁", "15–29 岁", "30–44 岁", "45–59 岁", "60 岁以上"];
    var h = (bot - top) / 5;
    widths.forEach(function (w, i) {
      var y = top + i * h;
      svg.appendChild(svgEl("rect", { x: cx - w / 2, y: y + 4, width: w, height: h - 8,
        fill: cssVar("--geog-pop-dense", "#d4694e"), opacity: 0.75, stroke: ink, "stroke-width": 1 }));
      svg.appendChild(svgText(cx + w / 2 + 12, y + h / 2 + 4, labels[i], soft, "start"));
    });
    svg.appendChild(svgText(cx, 34, p.name + "：人口金字塔（示意）", ink));
    ro.innerHTML = "<strong>" + esc(p.name) + "（" + esc(p.shape) + "）</strong>：" + esc(p.shapeNote) +
      "；老年人口比重" + esc(p.oldShare) + "。<br>" + esc(p.story);
    cornerNote(svg, "示意｜非精确比例｜初中只看定性", 800, 420);
  }

  function show(i) {
    tab = i;
    if (i === 0) drawCurve(); else drawPyramid();
    store(recordKey, { tab: tab, mode: POP_MODES[modeIdx].id, pyramid: POP_PYRAMIDS[pyrIdx].id, ts: Date.now() });
  }
  show(0);
  var view = {
    state: function () { return { tab: tab, mode: POP_MODES[modeIdx].id, pyramid: POP_PYRAMIDS[pyrIdx].id }; },
    truth: function () { return { modes: POP_MODES, pyramids: POP_PYRAMIDS }; },
    resize: function () { show(tab); },
    destroy: function () { untrack(view); },
    _setTab: function (i) { show(i); }, _setMode: function (i) { modeIdx = i; if (tab === 0) drawCurve(); },
    _setPyramid: function (i) { pyrIdx = i; if (tab === 1) drawPyramid(); }
  };
  return track(view);
}
window.GEO.registerWidget("pop-pyramid", function (box, params) { return PopPyramidView(box, params || {}); });

/* ============================================================
 * §29 site-select · 产业区位权衡器（Y22，跃升 10）
 * params: {recordKey}
 * 口诀 T12："称权重"——先问这个产业最怕缺什么
 * ============================================================ */
function SiteSelectView(box, params) {
  params = params || {};
  var wrap = head(box, "产业区位：称权重");
  honestyBadge(wrap, "示意｜教学示意数据");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  axNote(wrap, "三城市为教学示意数据（虚构城市，只看区位逻辑）；“称权重”口诀：先问这个产业最怕缺什么，主导因素排第一。");
  var recordKey = params.recordKey || "geog_site-select";
  var indIdx = 0, cityIdx = -1;
  var order = ["原料", "市场", "交通", "劳动力", "政策"];

  function draw() {
    stage.innerHTML = "";
    var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
    /* 产业选择 */
    var indRow = el("div", "geog-w2-btnrow");
    SITE_INDUSTRIES.forEach(function (s, i) {
      var b = el("button", "geog-btn fs-095" + (i === indIdx ? " on" : ""), esc(s.name));
      b.type = "button";
      b.addEventListener("click", function () { indIdx = i; cityIdx = -1; draw(); });
      indRow.appendChild(b);
    });
    stage.appendChild(el("div", "fs-085", "第一步：选产业——" + esc(SITE_INDUSTRIES[indIdx].name)));
    stage.appendChild(indRow);
    /* 候选城市参数卡 */
    stage.appendChild(el("div", "fs-085", "第二步：看三城参数卡，选一个城"));
    var cards = el("div", "geog-w2-cards");
    SITE_CANDIDATES.forEach(function (c, i) {
      var card = el("button", "geog-card fs-085" + (i === cityIdx ? " on" : ""));
      card.type = "button";
      var bars = order.map(function (f) {
        var v = c.params[f];
        return "<div>" + esc(f) + " " + "●".repeat(v) + "○".repeat(5 - v) + "</div>";
      }).join("");
      card.innerHTML = "<strong>" + esc(c.name) + "</strong><br>" + bars +
        "<div class='fs-078'>" + esc(c.note) + "</div>";
      card.addEventListener("click", function () { cityIdx = i; draw(); });
      cards.appendChild(card);
    });
    stage.appendChild(cards);
    /* 权重排序 */
    stage.appendChild(el("div", "fs-085", "第三步：给“" + esc(SITE_INDUSTRIES[indIdx].name) + "”称权重——最怕缺的排第一"));
    var ol = el("ol", "geog-w2-order fs-095");
    order.forEach(function (f, i) {
      var li = el("li", "", "");
      li.appendChild(el("span", "", (i + 1) + ". " + esc(f)));
      var up = el("button", "geog-mini", "↑");
      up.type = "button"; up.style.minWidth = "44px"; up.style.minHeight = "44px";
      up.setAttribute("aria-label", esc(f) + "上移");
      up.addEventListener("click", function () {
        if (i > 0) { order.splice(i - 1, 0, order.splice(i, 1)[0]); draw(); }
      });
      var dn = el("button", "geog-mini", "↓");
      dn.type = "button"; dn.style.minWidth = "44px"; dn.style.minHeight = "44px";
      dn.setAttribute("aria-label", esc(f) + "下移");
      dn.addEventListener("click", function () {
        if (i < order.length - 1) { order.splice(i + 1, 0, order.splice(i, 1)[0]); draw(); }
      });
      li.appendChild(up); li.appendChild(dn);
      ol.appendChild(li);
    });
    stage.appendChild(ol);
    var sub = el("button", "geog-btn fs-095", "提交选址");
    sub.type = "button";
    sub.addEventListener("click", submit);
    stage.appendChild(sub);
    ro.innerHTML = "口诀“<strong>称权重</strong>”：先问这个产业<strong>最怕缺什么</strong>——" +
      "那个因素就是主导因素，排第一。";
  }

  function submit() {
    var s = SITE_INDUSTRIES[indIdx];
    var cityOk = cityIdx >= 0 && SITE_CANDIDATES[cityIdx].id === s.best;
    var orderOk = order[0] === s.keyFactor;
    var fb = el("div", "geog-w2-feedback fs-095");
    var html = "";
    if (cityIdx < 0) html += "先选一个城。<br>";
    else html += (cityOk ? "✓ 选址正确：" : "✗ 选址再想想：") + esc(s.why) + "<br>";
    html += (orderOk ? "✓ 主导因素排第一：称对了权重。" : "✗ 权重第一位应该是“" + esc(s.keyFactor) + "”——最怕缺什么，什么排第一。") + "<br>";
    html += "记住：<strong>不同产业答案不同</strong>——钢铁厂奔原料，软件园奔人才政策，服装厂奔劳动力市场。模板是脚手架，不是标准答案。";
    fb.innerHTML = html;
    stage.appendChild(fb);
    ro.innerHTML = html;
    store(recordKey, { industry: s.id, city: cityIdx >= 0 ? SITE_CANDIDATES[cityIdx].id : null,
      order: order.slice(), cityOk: cityOk, orderOk: orderOk, ts: Date.now() });
  }

  draw();
  var view = {
    state: function () {
      return { industry: SITE_INDUSTRIES[indIdx].id, city: cityIdx >= 0 ? SITE_CANDIDATES[cityIdx].id : null, order: order.slice() };
    },
    truth: function () { return { candidates: SITE_CANDIDATES, industries: SITE_INDUSTRIES }; },
    resize: function () { draw(); },
    destroy: function () { untrack(view); },
    _pick: function (ii, ci) { indIdx = ii; cityIdx = ci; draw(); },
    _setOrder: function (o) { order = o.slice(); draw(); }, _submit: submit
  };
  return track(view);
}
window.GEO.registerWidget("site-select", function (box, params) { return SiteSelectView(box, params || {}); });

/* ============================================================
 * §30 route-planner · 交通选线沙盘（三线权衡）
 * params: {recordKey}
 * ============================================================ */
function RoutePlannerView(box, params) {
  params = params || {};
  var S = ROUTE_SCENARIO;
  var wrap = head(box, "交通选线沙盘");
  honestyBadge(wrap, "示意｜非精确比例｜教学示意数据");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  axNote(wrap, "三条线路为教学示意（虚构地名，只看选线逻辑）；真实选线还要做地质勘察、环评——本沙盘只练“自然＋经济综合权衡”。");
  var recordKey = params.recordKey || "geog_route-planner";
  var picked = -1, submitted = false;

  function draw() {
    stage.innerHTML = "";
    var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
    var accent = cssVar("--geog-accent", "#2a7de1");
    var svg = svgEl("svg", { viewBox: "0 0 800 460", role: "img", "aria-label": "交通选线沙盘示意" });
    stage.appendChild(svg);
    /* 背景：西山（左）/东平原（右） */
    svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 800, height: 460, fill: cssVar("--geog-land", "#f3e9d2"), opacity: 0.4 }));
    svg.appendChild(svgEl("path", { d: "M0,460 L0,180 L120,120 L240,200 L360,140 L480,220 L480,460 Z",
      fill: "#c9b78f", opacity: 0.55 }));
    svg.appendChild(svgText(240, 300, "横断山脉（示意）", soft));
    /* 起点/终点/粮仓镇 */
    function dot(x, y, label, fill) {
      svg.appendChild(svgEl("circle", { cx: x, cy: y, r: 22, fill: fill, stroke: ink, "stroke-width": 2 }));
      svg.appendChild(svgText(x, y + 44, label, ink));
    }
    dot(80, 380, "山北市（起点）", accent);
    dot(720, 380, "海港市（终点）", accent);
    dot(560, 330, "粮仓镇", cssVar("--geog-correct", "#2e9e6b"));
    /* 三条候选线 */
    var lines = [
      "M80,380 L240,260 L400,240 L560,300 L720,380",
      "M80,380 L200,400 L360,420 L560,330 L720,380",
      "M80,380 L120,430 L400,440 L650,430 L720,380"
    ];
    var colors = ["#d4694e", "#2e9e6b", "#9a7bd0"];
    lines.forEach(function (d, i) {
      var g = svgEl("g", {});
      var p = svgEl("path", { d: d, fill: "none", stroke: colors[i], "stroke-width": picked === i ? 10 : 5,
        "stroke-dasharray": "12,6", "stroke-linecap": "round", opacity: picked === i ? 1 : 0.65 });
      g.appendChild(p);
      var hit = svgEl("path", { d: d, fill: "none", stroke: "#000", "stroke-width": 112, opacity: 0 });
      hit.style.cursor = "pointer";
      hit.addEventListener("click", function () { picked = i; submitted = false; draw(); });
      g.appendChild(hit);
      svg.appendChild(g);
      svg.appendChild(svgText(400, 60 + i * 28, S.routes[i].name, picked === i ? ink : soft));
    });
    cornerNote(svg, "示意｜非精确比例", 800, 460);
    /* 对比表 */
    var tbl = el("div", "geog-w2-table fs-085");
    var html = "<table><tr><th>线路</th><th>距离</th><th>建设成本</th><th>经济带动</th></tr>";
    S.routes.forEach(function (r, i) {
      html += "<tr" + (picked === i ? " class='on'" : "") + "><td>" + esc(r.name) + "</td><td>" +
        esc(r.dist) + "</td><td>" + esc(r.cost) + "</td><td>" + esc(r.benefit) + "</td></tr>";
    });
    tbl.innerHTML = html + "</table>";
    stage.appendChild(tbl);
    var sub = el("button", "geog-btn fs-095", "提交选线");
    sub.type = "button";
    sub.addEventListener("click", submit);
    stage.appendChild(sub);
    if (picked < 0 && !submitted) ro.innerHTML = "点一条线，再看对比表：距离、成本、带动效应，三者一起称。";
  }

  function submit() {
    if (picked < 0) { ro.innerHTML = "先点选一条线路。"; return; }
    submitted = true;
    var r = S.routes[picked];
    var ok = r.id === S.best;
    var html = (ok ? "✓ 选对了：" : "✗ 再想想：") + esc(r.verdict) + "<br>" +
      "记住：交通线<strong>不走直线最短</strong>——山区迂回是常态，<strong>自然＋经济</strong>综合权衡。";
    ro.innerHTML = html;
    store(recordKey, { picked: r.id, ok: ok, ts: Date.now() });
    draw._fb = html;
  }

  draw();
  var view = {
    state: function () { return { picked: picked >= 0 ? S.routes[picked].id : null, submitted: submitted }; },
    truth: function () { return { scenario: S }; },
    resize: function () { draw(); },
    destroy: function () { untrack(view); },
    _pick: function (i) { picked = i; draw(); }, _submit: submit
  };
  return track(view);
}
window.GEO.registerWidget("route-planner", function (box, params) { return RoutePlannerView(box, params || {}); });

/* ============================================================
 * §31 overlay-map · C 级剪影叠加图
 * params: {mode:"strategy"|"resources", recordKey}
 * 底图复用已签发 C 级剪影（cn-silhouette，expert-signed）；
 * 叠加层只画示意点位/示意折线/文字标签，不画任何省界/板块分界线/
 * 国界线——不新增涉界几何（GEO-R23）。
 * ============================================================ */
var OVERLAY_LAYERS = {
  strategy: [
    { id: "plates", name: "四大板块", desc: "东部/中部/西部/东北：按经济发展水平划分的四大区域（示意标签，不画分界线）。" },
    { id: "belt", name: "长江经济带", desc: "依托长江黄金水道：上游成渝、中游长江中游城市群、下游长三角——梯度开发、优势互补。" },
    { id: "clusters", name: "城市群节点", desc: "京津冀/长三角/粤港澳大湾区/长江中游城市群：城市群是区域发展的增长极。" }
  ],
  resources: [
    { id: "gas", name: "西气东输", desc: "新疆轮南→上海（约 4200 公里，人教版口径）：把西部的天然气送往东部。" },
    { id: "power", name: "西电东送", desc: "南/中/北三通道：南部（云贵水电→广东）、中部（三峡→华东）、北部（晋蒙火电→京津冀）。" },
    { id: "water", name: "南水北调", desc: "东/中/西三线：东线一期 2013 年 11 月通水、中线一期 2014 年 12 月通水、西线规划中（dg10.2.1 回填）。" }
  ]
};
function OverlayMapView(box, params) {
  params = params || {};
  var mode = params.mode === "resources" ? "resources" : "strategy";
  var layers = OVERLAY_LAYERS[mode];
  var wrap = head(box, mode === "strategy" ? "区域战略叠加图" : "资源调配三线图");
  honestyBadge(wrap, mode === "strategy" ? "示意｜非精确比例｜方向仅供参考" : "示意｜非精确比例｜线路走向为示意");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  if (mode === "resources") axNote(wrap, "三线走向为教学示意折线（非精确走向）；通水年份见 dg10.2.1。");
  else axNote(wrap, "板块标签为示意点位，不画分界线；城市群节点位置为示意。");
  var recordKey = params.recordKey || ("geog_overlay-map_" + mode);
  var on = {}; layers.forEach(function (L) { on[L.id] = true; });
  var selected = null;

  function pt(id) { return provinceCapital(id); }

  function draw() {
    stage.innerHTML = "";
    var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
    var svg = svgEl("svg", { viewBox: "0 0 800 640", role: "img",
      "aria-label": mode === "strategy" ? "区域战略叠加示意" : "资源调配三线示意" });
    stage.appendChild(svg);
    var base = drawSilhouetteBase(svg);
    var g = svgEl("g", { "class": "geog-overlay" }); svg.appendChild(g);

    function line(pts, color, dash, w) {
      var d = pts.map(function (p, i) { return (i ? " L" : "M") + p[0] + "," + p[1]; }).join("");
      g.appendChild(svgEl("path", { d: d, fill: "none", stroke: color, "stroke-width": w || 5,
        "stroke-dasharray": dash || "none", "stroke-linecap": "round", opacity: 0.9 }));
    }
    function node(x, y, label, color, r) {
      var c = svgEl("circle", { cx: x, cy: y, r: r || 16, fill: color, stroke: ink, "stroke-width": 2, opacity: 0.9 });
      g.appendChild(c);
      var hit = svgEl("circle", { cx: x, cy: y, r: 30, fill: "#000", opacity: 0 });
      hit.style.cursor = "pointer";
      hit.addEventListener("click", function () { selected = label; draw(); });
      g.appendChild(hit);
      g.appendChild(svgText(x, y - (r || 16) - 8, label, ink));
    }
    function tag(x, y, label) {
      g.appendChild(svgText(x, y, label, soft));
    }

    if (mode === "strategy") {
      if (on.plates) {
        /* 四大板块：只放示意标签，不画分界线（GEO-R23 规避） */
        tag(600, 200, "东部"); tag(500, 300, "中部"); tag(330, 280, "西部"); tag(600, 120, "东北");
      }
      if (on.belt) {
        /* 长江干流示意折线（自然地理要素，非行政界线） */
        line([[300, 300], [420, 330], [pt("hb")[0], pt("hb")[1]], [560, 350], [650, 360]],
          cssVar("--geog-cold", "#3f8fd2"), "none", 8);
        tag(470, 300, "长江经济带（示意）");
      }
      if (on.clusters) {
        var sh = pt("sh"), gd = pt("gd"), bj = pt("bj"), hb = pt("hb");
        node(bj[0], bj[1], "京津冀", cssVar("--geog-target", "#d4694e"), 20);
        node(sh[0], sh[1], "长三角", cssVar("--geog-target", "#d4694e"), 20);
        node(gd[0], gd[1], "粤港澳大湾区", cssVar("--geog-target", "#d4694e"), 20);
        node(hb[0], hb[1], "长江中游城市群", cssVar("--geog-highlight", "#ffd54a"), 22);
      }
    } else {
      if (on.gas) {
        /* 西气东输：西（新疆）→东（上海）示意折线 */
        var xj = pt("xj"), sh2 = pt("sh");
        line([[xj[0] + 60, xj[1] + 40], [380, 300], [480, 320], [sh2[0] - 20, sh2[1]]],
          cssVar("--geog-warm", "#d4694e"), "none", 7);
        node(xj[0] + 60, xj[1] + 40, "轮南（起点）", cssVar("--geog-warm", "#d4694e"), 14);
        node(sh2[0] - 20, sh2[1], "上海（终点）", cssVar("--geog-warm", "#d4694e"), 14);
      }
      if (on.power) {
        /* 西电东送三通道示意 */
        var yn = pt("yn"), gz = pt("gd"), hb2 = pt("hb"), sh3 = pt("sh"), sx = pt("sx"), bj2 = pt("bj");
        line([[yn[0], yn[1]], [gz[0] - 40, gz[1] - 40]], cssVar("--geog-correct", "#2e9e6b"), "10,6", 5);
        line([[hb2[0] - 60, hb2[1] + 20], [sh3[0] - 40, sh3[1] - 20]], cssVar("--geog-correct", "#2e9e6b"), "10,6", 5);
        line([[sx[0], sx[1] - 20], [bj2[0] - 20, bj2[1] + 10]], cssVar("--geog-correct", "#2e9e6b"), "10,6", 5);
        tag(450, 560, "西电东送南/中/北三通道（示意）");
      }
      if (on.water) {
        /* 南水北调三线示意（dg10.2.1 回填；西线虚线=规划中） */
        var js = pt("js"), bj3 = pt("bj"), hb3 = pt("hb");
        line([[js[0] + 30, js[1]], [js[0] + 30, js[1] - 120], [bj3[0] - 30, bj3[1] + 20]],
          cssVar("--geog-cold", "#3f8fd2"), "none", 6);
        line([[hb3[0] + 20, hb3[1] - 30], [hb3[0] + 40, hb3[1] - 120], [bj3[0] - 10, bj3[1] + 20]],
          cssVar("--geog-cold", "#3f8fd2"), "none", 6);
        line([[hb3[0] - 120, hb3[1] - 60], [hb3[0] - 60, hb3[1] - 40]],
          cssVar("--geog-cold", "#3f8fd2"), "10,6", 6);
        tag(620, 480, "东/中线已通水，西线规划中");
      }
    }
    cornerNote(svg, mode === "strategy" ? "示意｜非精确比例｜方向仅供参考" : "示意｜非精确比例｜线路走向为示意", 800, 640);
    /* 图层开关 */
    var swRow = el("div", "geog-w2-btnrow");
    layers.forEach(function (L) {
      var b = el("button", "geog-btn fs-085" + (on[L.id] ? " on" : ""), (on[L.id] ? "◉ " : "○ ") + esc(L.name));
      b.type = "button"; b.setAttribute("aria-pressed", on[L.id] ? "true" : "false");
      b.addEventListener("click", function () { on[L.id] = !on[L.id]; draw(); });
      swRow.appendChild(b);
    });
    stage.appendChild(swRow);
    /* 图层说明 */
    var info = el("div", "fs-085");
    info.innerHTML = layers.map(function (L) {
      return "<div><strong>" + esc(L.name) + "</strong>：" + esc(L.desc) + "</div>";
    }).join("");
    stage.appendChild(info);
    if (selected) ro.innerHTML = "选中：" + esc(selected) + "。";
    else ro.innerHTML = mode === "strategy"
      ? "开关图层：四大板块＋长江经济带＋城市群节点——看“协调”是怎么叠出来的。"
      : "点三线看走向：西气东输、西电东送、南水北调——资源跨区域调配，各有分工。";
    store(recordKey, { mode: mode, on: on, selected: selected, ts: Date.now() });
  }

  draw();
  var view = {
    state: function () { return { mode: mode, on: on, selected: selected }; },
    truth: function () { return { mode: mode, layers: layers }; },
    resize: function () { draw(); },
    destroy: function () { untrack(view); },
    _toggle: function (id) { on[id] = !on[id]; draw(); }
  };
  return track(view);
}
window.GEO.registerWidget("overlay-map", function (box, params) { return OverlayMapView(box, params || {}); });

/* ============================================================
 * §32 sustain-balance · 可持续发展三支柱权重拖拽
 * params: {recordKey}
 * 口诀 T13："不吃子孙饭"——当代人要发展，子孙的"本钱"不能动
 * ============================================================ */
function SustainBalanceView(box, params) {
  params = params || {};
  var wrap = head(box, "可持续发展：三支柱称一称");
  honestyBadge(wrap, "示意｜教学演示，非经济预测");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  axNote(wrap, "权重为教学演示（拖动看思想），不是经济预测；初中只看定性：三支柱缺一不可。");
  var recordKey = params.recordKey || "geog_sustain-balance";
  var caseIdx = 0, w = { eco: 50, econ: 60, soc: 40 };
  var NAMES = { eco: "生态", econ: "经济", soc: "社会" };
  var COLORS = { eco: "#2e9e6b", econ: "#d4694e", soc: "#3f8fd2" };

  function draw() {
    stage.innerHTML = "";
    var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
    /* 情景选择 */
    var cRow = el("div", "geog-w2-btnrow");
    SUSTAIN_CASES.forEach(function (c, i) {
      var b = el("button", "geog-btn fs-085" + (i === caseIdx ? " on" : ""), esc(c.name));
      b.type = "button";
      b.addEventListener("click", function () { caseIdx = i; draw(); });
      cRow.appendChild(b);
    });
    stage.appendChild(cRow);
    var c = SUSTAIN_CASES[caseIdx];
    stage.appendChild(el("div", "fs-095", "<strong>情景</strong>：" + esc(c.story)));
    stage.appendChild(el("div", "fs-085", esc(c.hint)));
    /* 三支柱滑块 */
    var svg = svgEl("svg", { viewBox: "0 0 800 300", role: "img", "aria-label": "三支柱权重示意" });
    stage.appendChild(svg);
    var keys = ["eco", "econ", "soc"];
    var maxW = 100;
    keys.forEach(function (k, i) {
      var x = 120 + i * 240;
      var h = w[k] / maxW * 220;
      svg.appendChild(svgEl("rect", { x: x - 50, y: 250 - h, width: 100, height: h,
        fill: COLORS[k], opacity: 0.8, stroke: ink, "stroke-width": 1 }));
      svg.appendChild(svgText(x, 275, NAMES[k] + " " + w[k], ink));
    });
    svg.appendChild(svgEl("line", { x1: 40, y1: 250, x2: 760, y2: 250, stroke: soft, "stroke-width": 2 }));
    cornerNote(svg, "示意｜教学演示", 800, 300);
    keys.forEach(function (k) {
      var row = el("div", "geog-w2-sliderow fs-095");
      row.appendChild(el("span", "", esc(NAMES[k]) + "权重"));
      var slider = document.createElement("input");
      slider.type = "range"; slider.min = "0"; slider.max = "100"; slider.step = "5";
      slider.value = String(w[k]);
      slider.setAttribute("aria-label", esc(NAMES[k]) + "权重滑块");
      slider.addEventListener("input", function () { w[k] = Number(slider.value); draw(); });
      row.appendChild(slider);
      row.appendChild(el("span", "", String(w[k])));
      stage.appendChild(row);
    });
    var sub = el("button", "geog-btn fs-095", "提交配比");
    sub.type = "button";
    sub.addEventListener("click", submit);
    stage.appendChild(sub);
    ro.innerHTML = "拖三个滑块，给“" + esc(c.name) + "”配权重——想想：哪个支柱一低就“吃子孙饭”？";
  }

  function submit() {
    var fb;
    if (w.eco < 20) fb = "✗ 生态权重太低：湖泊的调蓄、净化功能没人接管——这是“吃子孙饭”。";
    else if (w.econ < 20) fb = "✗ 经济权重太低：发展仍是第一要义——可持续发展不是“不发展”。";
    else if (w.soc < 20) fb = "✗ 社会权重太低：人的公平、当代人的民生，也是支柱之一。";
    else fb = "✓ 三支柱都在 20 以上：记住“<strong>不吃子孙饭</strong>”——当代人要发展，子孙的“本钱”不能动。";
    fb += "<br>循环经济：减量化、再利用、资源化——“既发展又保护”，这就是生态文明的样子。";
    ro.innerHTML = fb;
    store(recordKey, { case: SUSTAIN_CASES[caseIdx].id, weights: { eco: w.eco, econ: w.econ, soc: w.soc }, ts: Date.now() });
  }

  draw();
  var view = {
    state: function () { return { case: SUSTAIN_CASES[caseIdx].id, weights: { eco: w.eco, econ: w.econ, soc: w.soc } }; },
    truth: function () { return { cases: SUSTAIN_CASES }; },
    resize: function () { draw(); },
    destroy: function () { untrack(view); },
    _set: function (ci, ww) { caseIdx = ci; w = ww; draw(); }, _submit: submit
  };
  return track(view);
}
window.GEO.registerWidget("sustain-balance", function (box, params) { return SustainBalanceView(box, params || {}); });

/* ============================================================
 * §33 monsoon-timeline · 梅雨/伏旱时间轴（回填③）
 * 落点：dg09.2.2-p2（小手术追加 widget）
 * params: {recordKey}
 * 冻结句（pedagogy 324/325）：6月中下旬–7月上旬江淮准静止锋→梅雨；
 * 7月中下旬–8月副高控制→伏旱。回填链措辞：季风"掉头"闹的。
 * ============================================================ */
function MonsoonTimelineView(box, params) {
  params = params || {};
  var wrap = head(box, "时间轴：梅雨与伏旱");
  honestyBadge(wrap, "示意｜月份为示意分期");
  var stage = el("div", "geog-w2-stage"); wrap.appendChild(stage);
  var ro = readout(wrap);
  axNote(wrap, "月份分期为教学示意（梅雨 6 月中下旬–7 月上旬、伏旱 7 月中下旬–8 月）；具体起止年份有早晚，年际变化大。");
  var recordKey = params.recordKey || "geog_monsoon-timeline";
  var m = 7.0;

  function draw() {
    stage.innerHTML = "";
    var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#4a4a4a");
    var ph = monsoonPhase(m);
    var svg = svgEl("svg", { viewBox: "0 0 800 420", role: "img", "aria-label": "梅雨伏旱时间轴示意" });
    stage.appendChild(svg);
    /* 南北示意条：南（下）→北（上） */
    svg.appendChild(svgEl("rect", { x: 330, y: 40, width: 140, height: 300, fill: cssVar("--geog-land", "#f3e9d2"), opacity: 0.5, stroke: soft }));
    svg.appendChild(svgText(250, 120, "北", soft));
    svg.appendChild(svgText(250, 300, "南", soft));
    svg.appendChild(svgText(400, 360, "长江中下游", soft));
    /* 雨带位置（示意 y） */
    var ry;
    if (ph.key === "pre") ry = 290;
    else if (ph.key === "mei") ry = 220;
    else if (ph.key === "fuhan") ry = 220;
    else ry = 120;
    var rainColor = ph.key === "fuhan" ? cssVar("--geog-warm", "#d4694e") : cssVar("--geog-cold", "#3f8fd2");
    svg.appendChild(svgEl("rect", { x: 330, y: ry - 28, width: 140, height: 56, fill: rainColor, opacity: 0.55 }));
    if (ph.key === "mei") {
      svg.appendChild(svgText(560, ry + 5, "江淮准静止锋摆动", ink, "start"));
      svg.appendChild(svgEl("line", { x1: 470, y1: ry, x2: 550, y2: ry, stroke: ink, "stroke-width": 3 }));
    } else if (ph.key === "fuhan") {
      svg.appendChild(svgText(560, ry + 5, "副热带高压控制", ink, "start"));
      svg.appendChild(svgText(560, ry + 28, "晴热少雨", soft, "start"));
    }
    /* 月份滑块 */
    var row = el("div", "geog-w2-sliderow fs-095");
    row.appendChild(el("span", "", "月份"));
    var slider = document.createElement("input");
    slider.type = "range"; slider.min = "5"; slider.max = "9"; slider.step = "0.5";
    slider.value = String(m);
    slider.setAttribute("aria-label", "月份滑块（5 月到 9 月）");
    slider.addEventListener("input", function () { m = Number(slider.value); draw(); });
    row.appendChild(slider);
    var mLabel = m % 1 === 0 ? m + " 月" : Math.floor(m) + " 月中下旬";
    row.appendChild(el("span", "", mLabel));
    stage.appendChild(row);
    /* 阶段徽章 */
    var badge = el("div", "geog-w2-badge fs-095",
      esc(ph.name) + "｜" + esc(ph.rain));
    stage.appendChild(badge);
    ro.innerHTML = "<strong>" + esc(ph.name) + "</strong>：" + esc(ph.note) +
      "<br>记住：梅雨、伏旱都是季风“<strong>掉头</strong>”闹的（dg14.3.2 讲过）——夏季风进退，雨带跟着走。";
    cornerNote(svg, "示意｜月份为示意分期", 800, 420);
    store(recordKey, { month: m, phase: ph.key, ts: Date.now() });
  }

  draw();
  var view = {
    state: function () { return { month: m, phase: monsoonPhase(m).key }; },
    truth: function () { return { monsoonPhase: monsoonPhase }; },
    resize: function () { draw(); },
    destroy: function () { untrack(view); },
    _setMonth: function (mm) { m = mm; draw(); }
  };
  return track(view);
}
window.GEO.registerWidget("monsoon-timeline", function (box, params) { return MonsoonTimelineView(box, params || {}); });

})();
