/* ============================================================
* 学习工具箱 · 地理 · 批 6 新增渲染器（dg11/dg12/dg13 用）
*
* 本文件在 js/geography.js、data/geo-schematic-paths.js 之后引入，
* 经 window.GEO.registerWidget 注册 5 个新类型：
* thematic-map C 级剪影底图上的专题示意（农业/工业/铁路/秦岭—淮河/港澳台）
* region-compare 地区对照表（点行看详解）
* geo-schematic 城市/区域职能示意（节点/区域/连线，点读）
* process-stages 分阶段过程动画（黄土高原沟壑演变）
* scale-switcher 多尺度地图切换（街区→城市→城市群，大详小略回填）
*
* 图件定级（GEO-RULING-2026-10-17-08 §四.3 过渡带类页面先例）：
* thematic-map 全部 theme 的底图均为 C 级剪影（中国全境轮廓，
* 不叠加省界/国界线/十段线；台湾岛、海南岛单独绘制不可缺），
* 角落冻结文案 E.3「示意｜非精确比例｜方向仅供参考」。
* 本文件不新增任何涉国界/省界矢量几何——全部复用
* geo-schematic-paths.js 已签发资产（CN-PROV-v1，expert-signed），
* 故不触发 -08 审定签发流程（无新图件资产）。
* geo-schematic 的 4 块板子为城市/区域内部职能示意（非政区图），
* 不涉国界/省界绘制，仅配 GEO-R24 示意声明。
*
* 真值：window.GeoBatch6.*（场层，渲染与断言共用）；
* view.state() 为 UI 可达值；view.truth() 为场层真值
* （GEO-RULING-2026-10-17-03 分场层/UI 两类）。
* 零外部请求；深浅双色走 --geog-*；触摸热区 ≥44px；
* HTML 文字只用 V8 阶梯类（.fs-078…）；SVG 文本元素 ≥12.5px
* （RENDERERS.md 冻结口径：SVG 矢量文字随视口缩放）。
* 记录键经本地 store() 写 "ltb-geo-" + recordKey。
* ============================================================ */
(function () {
"use strict";
if (!window.GEO ||!window.GEO.registerWidget) return;

/* ---------------- 小工具 ---------------- */
function esc(s) {
return String(s == null? "": s).replace(/[&<>"']/g, function (c) {
return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;"}[c];
});
}
function el(tag, cls, html) {
var n = document.createElement(tag);
if (cls) n.className = cls;
if (html!= null) n.innerHTML = html;
return n;
}
function store(k, v) {
try { localStorage.setItem("ltb-geo-" + k, JSON.stringify(v));} catch (e) {}
}
var NS = "http://www.w3.org/2000/svg";
function svgEl(tag, attrs) {
var n = document.createElementNS(NS, tag);
for (var k in attrs) n.setAttribute(k, attrs[k]);
return n;
}
function cssVar(name, fb) {
try { var v = getComputedStyle(document.body).getPropertyValue(name).trim(); return v || fb;}
catch (e) { return fb;}
}
var _live = [];
function track(v) { _live.push(v); return v;}
function untrack(v) {
var i = _live.indexOf(v); if (i >= 0) _live.splice(i, 1);
try { if (window.GEO && window.GEO.unregisterView) window.GEO.unregisterView(v);} catch (e) {}
}
/* SVG 文字（≥12.5px，冻结口径：随视口缩放非 px 固定） */
function svgText(x, y, s, fill, anchor) {
var t = svgEl("text", { x: x, y: y, "text-anchor": anchor || "middle", fill: fill, "font-size": "12.5"});
t.textContent = s; return t;
}
/* 角落声明（不可关闭） */
function cornerDeclare(svg, text, vbH) {
var t = svgEl("text", { x: 794, y: (vbH || 640) - 8, "text-anchor": "end", fill: cssVar("--geog-ink-soft", "#4a4a4a"), "font-size": "12.5"});
t.textContent = text; svg.appendChild(t);
}

/* ============================================================
* C 级剪影底图（复用已签发几何：nationalLand + coast 围合大陆，
* 台湾岛、海南岛单独绘制；不画国界线/省界/十段线）
* ============================================================ */
var DECLARE_C = "示意｜非精确比例｜方向仅供参考";
function drawSilhouetteBase(svg) {
var meta = window.GEOGRAPHY_DATA.schematicPathsMeta;
var asset = meta.byAssetId("cn-silhouette");
var paths = asset.paths;
var ink = cssVar("--geog-ink", "#1a1a1a");
var soft = cssVar("--geog-ink-soft", "#4a4a4a");
var landFill = cssVar("--geog-land", "#f3e9d2");
var seaFill = cssVar("--geog-sea", "#dcebf7");
svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 800, height: 640, fill: seaFill, opacity: 0.55}));
var g = svgEl("g", { "class": "geog-base"});
svg.appendChild(g);
/* 注意：coast 必须按原顺序拼接；逆序会把渤海/黄海/东海围进陆地
* （2026-10-17 批 5 已修，见 geo-batch5-widgets.js drawBaseMap）。 */
var cpts = paths.coast.replace(/^M/, "").split(/ L/).map(function (s) { return s.trim();});
g.appendChild(svgEl("path", {
d: paths.nationalLand + " L" + cpts.join(" L") + " Z",
fill: landFill, stroke: soft, "stroke-width": 1.2, opacity: 0.9
}));
var tw = meta.provinceById("tw"), hi = meta.provinceById("hi");
g.appendChild(svgEl("path", { d: tw.path, fill: landFill, stroke: soft, "stroke-width": 1.2}));
g.appendChild(svgEl("path", { d: hi.path, fill: landFill, stroke: soft, "stroke-width": 1.2}));
g.appendChild(svgText(tw.labelPt[0], tw.labelPt[1], "台湾岛", soft));
return { g: g, ink: ink, soft: soft, landFill: landFill, seaFill: seaFill, tw: tw, hi: hi};
}

/* ============================================================
* 场层真值（window.GeoBatch6）：人教版八下口径的教学示意数据
* ============================================================ */
/* 农业类型分区（示意分区，界线非精确；坐标为 800x640 示意坐标） */
var AGRI_ZONES = [
{ id: "paddy", name: "水田农业区", shape: "M440,300 L520,295 L585,310 L592,360 L560,402 L478,412 L438,368 Z",
agri: "水田（水稻、油菜）",
cause: "自然条件→农业类型：秦岭—淮河以南热量充足、降水丰沛 → 适合水田；水稻喜温好湿。"},
{ id: "dry", name: "旱地农业区", shape: "M438,188 L520,183 L592,190 L600,242 L560,272 L468,272 L428,240 Z",
agri: "旱地（小麦、玉米、大豆）",
cause: "自然条件→农业类型：秦岭—淮河以北降水较少、光照充足 → 适合旱地；小麦耐旱。"},
{ id: "pasture", name: "畜牧业区", shape: "M178,218 L300,208 L402,220 L410,300 L348,342 L218,330 L168,278 Z",
agri: "畜牧业（四大牧区）",
cause: "自然条件→农业类型：西部、北部降水少、草原广布 → 适合畜牧业。四大牧区：内蒙古牧区、新疆牧区、青海牧区、西藏牧区。"},
{ id: "forest", name: "林业区", shape: "M560,80 L642,90 L662,150 L620,182 L568,160 Z",
shape2: "M368,330 L432,335 L442,375 L390,392 L358,365 Z",
agri: "林业（东北林区、西南林区）",
cause: "自然条件→农业类型：东北（大兴安岭、小兴安岭、长白山）与西南（横断山区）山地气候湿润 → 适合林业；另有东南人工林区。"},
{ id: "fishery", name: "渔业区", dots: [[602,248],[611,290],[606,330],[596,372]],
agri: "渔业（海洋渔业、淡水渔业）",
cause: "自然条件→农业类型：东部临海、河湖密布 → 海洋渔业（舟山渔场是我国最大的渔场，人教版口径）与淡水渔业（长江中下游、珠江三角洲）。"}
];
/* 四大工业基地（点位为示意坐标，取自省会锚点） */
var INDUSTRY_BASES = [
{ id: "liaozhongnan", name: "辽中南工业基地", pt: [594, 183],
feature: "以重工业为主（钢铁、机械）",
factor: "主导区位因素：煤、铁资源丰富（鞍山铁矿、抚顺煤矿）——“先问这个产业最怕缺什么”（G13 口诀）。"},
{ id: "jingjintang", name: "京津唐工业基地", pt: [533, 208],
feature: "北方最大的综合性工业基地（人教版口径）",
factor: "主导区位因素：煤铁资源丰富，科技力量雄厚、人才集中。"},
{ id: "huninghang", name: "沪宁杭工业基地", pt: [570, 298],
feature: "全国最大的综合性工业基地（人教版口径）",
factor: "主导区位因素：市场广阔、交通便利、技术力量强。"},
{ id: "zhusanjiao", name: "珠江三角洲工业基地", pt: [515, 388],
feature: "以轻工业为主，外向型经济",
factor: "主导区位因素：临近港澳、著名侨乡、政策优惠、劳动力丰富。"}
];
var INDUSTRY_PATTERN = "分布规律：工业多沿海、沿江、沿交通线分布——靠近市场与交通（区位因素综合，dg15.2.1 预告）。";
/* 铁路干线五纵三横（示意折线，城市锚点为示意坐标） */
var RAIL_CITY = {
北京: [533,204], 哈尔滨: [623,139], 沈阳: [594,183], 天津: [540,215],
石家庄: [515,225], 郑州: [507,261], 武汉: [513,307], 长沙: [501,333],
广州: [503,390], 济南: [538,240], 南京: [553,291], 上海: [577,301],
南昌: [527,328], 深圳: [516,396], 太原: [497,227], 焦作: [508,258],
柳州: [468,372], 宝鸡: [448,272], 成都: [420,307], 昆明: [409,368],
呼和浩特: [490,194], 包头: [468,190], 兰州: [418,247], 乌鲁木齐: [272,161],
连云港: [578,268], 杭州: [566,310], 贵阳: [444,350]
};
var RAILWAYS = [
{ id: "jh-jg", name: "京哈—京广线", dir: "纵", cities: ["哈尔滨","沈阳","北京","石家庄","郑州","武汉","长沙","广州"]},
{ id: "jh2", name: "京沪线", dir: "纵", cities: ["北京","天津","济南","南京","上海"]},
{ id: "jjiu", name: "京九线", dir: "纵", cities: ["北京","南昌","深圳"]},
{ id: "tj-jl", name: "太焦—焦柳线", dir: "纵", cities: ["太原","焦作","柳州"]},
{ id: "bc-ck", name: "宝成—成昆线", dir: "纵", cities: ["宝鸡","成都","昆明"]},
{ id: "jb-bl", name: "京包—包兰线", dir: "横", cities: ["北京","呼和浩特","包头","兰州"]},
{ id: "lh-lx", name: "陇海—兰新线", dir: "横", cities: ["连云港","郑州","兰州","乌鲁木齐"]},
{ id: "hz-xg-qk", name: "沪杭—浙赣—湘黔—贵昆线", dir: "横", cities: ["上海","杭州","南昌","贵阳","昆明"]}
];
RAILWAYS.forEach(function (r) {
r.pts = r.cities.map(function (c) { return RAIL_CITY[c];});
});
var RAIL_COLORS = ["#c0392b","#1a7f37","#2a7de1","#8e44ad","#d4850f","#0e7c66","#b03060","#5a5a5a"];
/* 秦岭—淮河线（示意走廊：青藏高原东南边缘→秦岭→淮河→苏北一线） */
var QINLING_LINE = "M411,280 L456,275 L519,286 L564,275";
var QINLING_MEANINGS = [
{ id: "m1", name: "1月0℃等温线", text: "1月0℃等温线经过的地方：以南冬季温和（1月均温>0℃），以北冬季寒冷（1月均温<0℃）。", dy: -18},
{ id: "m2", name: "800毫米年等降水量线", text: "800毫米年等降水量线经过的地方：以南年降水多于800毫米，以北少于800毫米。", dy: -11},
{ id: "m3", name: "暖温带与亚热带的分界线", text: "暖温带与亚热带的分界线：以南是亚热带，以北是暖温带（以温定带，红线辨析③）。", dy: -4},
{ id: "m4", name: "湿润地区与半湿润地区的分界线", text: "湿润地区与半湿润地区的分界线：以南湿润，以北半湿润（以水定型，红线辨析③）。", dy: 4},
{ id: "m5", name: "旱地与水田的分界线", text: "旱地与水田的分界线：以南水田（水稻）、以北旱地（小麦）——但两侧有过渡带，不是一刀切。", dy: 11},
{ id: "m6", name: "小麦与水稻集中产区的分界线", text: "小麦与水稻集中产区的分界线：以北小麦集中产区，以南水稻集中产区（因地制宜，dg11.1.1回填）。", dy: 18}
];
var QINLING_NOTE = "一线六义：六条线大致吻合。注意——分界线是渐变带的中心线，南北两侧存在过渡带（GEO-AX01；pedagogy T10）。";
/* 港澳台（点位取自已签发资产；台湾岛高亮与大陆同色，只加轮廓与注记） */
var HMT = [
{ id: "hk", name: "香港", pt: [516, 392], lab: [554, 378],
text: "香港特别行政区。实行“一国两制”；转口贸易发达，是国际金融、贸易、航运中心之一；位于珠江口东侧。"},
{ id: "mo", name: "澳门", pt: [502, 404], lab: [462, 420],
text: "澳门特别行政区。实行“一国两制”；博彩旅游业是重要经济支柱；位于珠江口西侧。"},
{ id: "tw", name: "台湾",
text: "台湾省。宝岛台湾：物产丰富（稻米、甘蔗、茶叶、樟脑、水果）；外向型经济；台湾是中国不可分割的一部分，祖国统一是历史必然。"}
];
var HMT_REDLINE = "表述红线：香港、澳门、台湾都是中国不可分割的一部分——港澳是特别行政区，台湾是省份；不说“国家”（审计清单第9条）。";

window.GeoBatch6 = {
AGRI_ZONES: AGRI_ZONES, INDUSTRY_BASES: INDUSTRY_BASES, INDUSTRY_PATTERN: INDUSTRY_PATTERN,
RAILWAYS: RAILWAYS, RAIL_CITY: RAIL_CITY,
QINLING_LINE: QINLING_LINE, QINLING_MEANINGS: QINLING_MEANINGS, QINLING_NOTE: QINLING_NOTE,
HMT: HMT, HMT_REDLINE: HMT_REDLINE
};

/* ---------------- 读数面板 ---------------- */
function readoutPanel() {
var p = el("div", "geog-readout fs-095");
p.style.cssText = "margin-top:8px;padding:10px 12px;border:1px solid var(--geog-border);border-radius:8px;background:var(--geog-card);min-height:44px";
p.textContent = "点一点图上的要素，看解读。";
return p;
}
function svgRoot(vb) {
var svg = svgEl("svg", { viewBox: vb || "0 0 800 640", role: "img"});
svg.style.cssText = "width:100%;height:auto;display:block;touch-action:manipulation";
return svg;
}
/* ============================================================
* 视觉最近归属（FAIL-6a 返工，2026-10-18）
* 枢纽/并行段多条线路的透明命中区互相重叠时，归属不再按命中区 DOM
* 叠放顺序（谁后画谁赢），而按"点到各目标几何距离最近者"判定。
* F2 口径：以 390px 视口为基准（有效缩放约 0.43），命中层逻辑尺寸
* ≥100（100×0.43≈43px）即保证有效尺寸 ≥40px。
* ============================================================ */
var HIT_MIN = 100; /* 命中层最小逻辑尺寸（直径/带宽） */
var HIT_R = HIT_MIN / 2; /* 命中半径 */
function ptSegDist(p, a, b) {
var vx = b[0] - a[0], vy = b[1] - a[1];
var c = vx * vx + vy * vy;
var t = c? ((p[0] - a[0]) * vx + (p[1] - a[1]) * vy) / c: 0;
t = Math.max(0, Math.min(1, t));
var dx = p[0] - (a[0] + t * vx), dy = p[1] - (a[1] + t * vy);
return Math.sqrt(dx * dx + dy * dy);
}
/* 点击事件 client 坐标 → svg viewBox 坐标 */
function svgViewPoint(svg, ev) {
try {
var m = svg.getScreenCTM(); if (!m) return null;
var pt = svg.createSVGPoint(); pt.x = ev.clientX; pt.y = ev.clientY;
var lp = pt.matrixTransform(m.inverse());
return [lp.x, lp.y];
} catch (e) { return null;}
}

/* ============================================================
* 1. thematic-map（C 级剪影底图专题示意）
* params: {theme:"agri"|"industry"|"railway"|"qinling"|"hmt",
* intro?, recordKey?}
* ============================================================ */
window.GEO.registerWidget("thematic-map", function (box, params) {
var theme = params.theme || "agri";
var recordKey = params.recordKey || ("geog_thematic-map_" + theme);
var wrap = el("div", "geog-thematic");
if (params.intro) { var it = el("div", "fs-095"); it.style.marginBottom = "8px"; it.textContent = params.intro; wrap.appendChild(it);}
var svg = svgRoot("0 0 800 640");
wrap.appendChild(svg);
var base = drawSilhouetteBase(svg);
var readout = readoutPanel();
wrap.appendChild(readout);
cornerDeclare(svg, DECLARE_C);
var state = { theme: theme, selected: null, round: 0, score: 0, done: false};
var truth = { theme: theme, assetId: "cn-silhouette", grade: "C", declare: DECLARE_C,
signoff: "CN-PROV-v1", signoffStatus: "expert-signed",
ruling: "GEO-RULING-2026-10-17-08",
note: "底图复用已签发 C 级剪影几何，无新增涉界矢量；专题叠加为教学示意（非精确界线/走向）。"};
var accent = cssVar("--geog-accent", "#0e7c66");
var correctC = cssVar("--geog-correct", "#1a7f37");
var wrongC = cssVar("--geog-wrong", "#c0392b");

function say(t) { readout.textContent = t;}
function persist() { store(recordKey, state);}

if (theme === "agri") {
truth.zones = AGRI_ZONES.map(function (z) { return { id: z.id, name: z.name, agri: z.agri};});
var fills = ["rgba(42,125,225,0.28)", "rgba(212,133,15,0.28)", "rgba(26,127,55,0.28)",
"rgba(14,124,102,0.28)", "rgba(142,68,173,0.28)"];
/* F2-R（2026-10-18）：林业/旱地分区形 390px 下有效短边 26.5/38px（<40px 门禁），
* 分区形是"点分区看因果解读"的唯一操作通道。透明 HIT 兜底（渔业 dots 模式类比，
* 命中形放大：与可见形同 d 的透明路径，stroke-width=HIT_MIN，round join/cap
* 防尖角外溢，390px 下有效约 42.7px≥40px）——绘于最下层（先于渔业 dots 命中圆与
* 所有可见分区形），重叠处上层（dots 命中圆/可见分区形）按既有 DOM 顺序优先，
* 不抢归属。命中形只承接指针（无 tabindex，aria-hidden），键盘可达仍走可见分区形。 */
["forest", "dry"].forEach(function (zid) {
var z = null, k;
for (k = 0; k < AGRI_ZONES.length; k++) if (AGRI_ZONES[k].id === zid) z = AGRI_ZONES[k];
if (!z) return;
[z.shape, z.shape2].forEach(function (d) {
if (!d) return;
var h = svgEl("path", { d: d, fill: "transparent", stroke: "transparent",
"stroke-width": HIT_MIN, "stroke-linejoin": "round", "stroke-linecap": "round",
"data-zone": z.id, "aria-hidden": "true"});
h.style.cursor = "pointer";
h.addEventListener("click", function () { selectZone(z);});
svg.appendChild(h);
});
});
/* F2（2026-10-18）：渔业点位命中圆 r=HIT_R（390px 下有效直径约 43px ≥40px）；
* 先于分区形绘制（处下层），与分区形重叠处以上层分区形为准，不抢归属。 */
AGRI_ZONES.forEach(function (z) {
if (z.dots) z.dots.forEach(function (pt) {
var dh = svgEl("circle", { cx: pt[0], cy: pt[1], r: HIT_R, fill: "transparent", "data-zone": z.id});
dh.style.cursor = "pointer";
dh.addEventListener("click", function () { selectZone(z);});
svg.appendChild(dh);
});
});
AGRI_ZONES.forEach(function (z, i) {
var shapes = []; if (z.shape) shapes.push(z.shape); if (z.shape2) shapes.push(z.shape2);
shapes.forEach(function (d) {
var p = svgEl("path", { d: d, fill: fills[i % fills.length],
stroke: accent, "stroke-width": 2, "stroke-dasharray": "7,4", "data-zone": z.id});
p.style.cursor = "pointer";
p.setAttribute("tabindex", "0"); p.setAttribute("role", "button");
p.setAttribute("aria-label", z.name);
p.addEventListener("click", function () { selectZone(z);});
p.addEventListener("keydown", function (e) {
if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectZone(z);}
});
svg.appendChild(p);
});
if (z.dots) z.dots.forEach(function (pt) {
var c = svgEl("circle", { cx: pt[0], cy: pt[1], r: 7, fill: fills[i % fills.length],
stroke: accent, "stroke-width": 2, "data-zone": z.id});
c.style.cursor = "pointer";
c.setAttribute("tabindex", "0"); c.setAttribute("role", "button");
c.setAttribute("aria-label", z.name);
c.addEventListener("click", function () { selectZone(z);});
svg.appendChild(c);
});
var lp = labelPtOf(z);
svg.appendChild(svgText(lp[0], lp[1], z.name, base.ink));
});
var note = el("div", "fs-078"); note.style.cssText = "margin-top:6px;color:var(--geog-ink-soft)";
note.textContent = "分区为教学示意分区，界线非精确；点击分区看“自然条件→农业类型”因果解读（GEO-R40）。";
wrap.appendChild(note);
say("点一个农业类型分区，看它“为什么在这里”（自然条件→农业类型）。");
}

function labelPtOf(z) {
if (z.id === "paddy") return [515, 355];
if (z.id === "dry") return [515, 230];
if (z.id === "pasture") return [290, 275];
if (z.id === "forest") return [612, 135];
return [648, 310];
}
function selectZone(z) {
state.selected = z.id; persist();
say(z.name + "：" + z.agri + "。" + z.cause);
}

if (theme === "industry") {
truth.bases = INDUSTRY_BASES.map(function (b) { return { id: b.id, name: b.name};});
INDUSTRY_BASES.forEach(function (b) {
var c = svgEl("circle", { cx: b.pt[0], cy: b.pt[1], r: 13, fill: accent, opacity: 0.85,
stroke: "#fff", "stroke-width": 2});
c.style.cursor = "pointer";
c.setAttribute("tabindex", "0"); c.setAttribute("role", "button");
c.setAttribute("aria-label", b.name);
c.addEventListener("click", function () {
state.selected = b.id; persist();
say(b.name + "：" + b.feature + b.factor);
});
c.addEventListener("keydown", function (e) {
if (e.key === "Enter" || e.key === " ") { e.preventDefault(); c.dispatchEvent(new Event("click"));}
});
svg.appendChild(c);
/* F2（2026-10-18）：命中圆 r=HIT_R（390px 下有效直径约 43px ≥40px） */
var hit = svgEl("circle", { cx: b.pt[0], cy: b.pt[1], r: HIT_R, fill: "transparent"});
hit.style.cursor = "pointer";
hit.addEventListener("click", function () { c.dispatchEvent(new Event("click"));});
svg.appendChild(hit);
svg.appendChild(svgText(b.pt[0], b.pt[1] - 20, b.name, base.ink));
});
var pn = el("div", "fs-085"); pn.style.cssText = "margin-top:6px;color:var(--geog-ink-soft)";
pn.textContent = INDUSTRY_PATTERN;
wrap.appendChild(pn);
say("点一个工业基地，看它的特点与主导区位因素。");
}

if (theme === "railway") {
truth.railways = RAILWAYS.map(function (r) { return { id: r.id, name: r.name, dir: r.dir, cities: r.cities};});
var order = RAILWAYS.map(function (_, i) { return i;});
/* 固定伪随机打乱（可复现，供程序断言） */
for (var si = order.length - 1; si > 0; si--) {
var sj = (si * 37 + 11) % (si + 1); var tmp = order[si]; order[si] = order[sj]; order[sj] = tmp;
}
var prompt = el("div", "fs-105"); prompt.style.cssText = "margin:8px 0;font-weight:bold";
wrap.insertBefore(prompt, svg);
var drawn = [];
RAILWAYS.forEach(function (r, i) {
var d = "M" + r.pts.map(function (p) { return p[0] + "," + p[1];}).join(" L");
var line = svgEl("path", { d: d, fill: "none", stroke: RAIL_COLORS[i % RAIL_COLORS.length],
"stroke-width": 3.5, "stroke-linejoin": "round", "stroke-linecap": "round", "data-rail": r.id});
svg.appendChild(line);
var hit = svgEl("path", { d: d, fill: "none", stroke: "transparent",
"stroke-width": HIT_MIN, "pointer-events": "none", "data-rail": r.id});
/* FAIL-6a+F2（2026-10-18）：命中带宽 30→HIT_MIN（390px 下有效约 43px ≥40px）；
* 命中层不再承接点击（pointer-events:none，只做命中区占位），归属统一由
* svg 级"视觉最近线路"判定——放大命中区与最近线判分共存不冲突。 */
svg.appendChild(hit);
r.pts.forEach(function (p) {
svg.appendChild(svgEl("circle", { cx: p[0], cy: p[1], r: 4, fill: base.ink}));
});
drawn.push({ r: r, line: line});
});
/* 端点城市注记（首尾站名） */
var placedLabs = [];
function labPos(x, y) {
var yy = y, guard = 0;
while (guard++ < 4 && placedLabs.some(function (q) { return Math.abs(q[0] - x) < 30 && Math.abs(q[1] - yy) < 20; })) yy -= 20;
placedLabs.push([x, yy]); return yy;
}
RAILWAYS.forEach(function (r) {
var a = r.pts[0], b = r.pts[r.pts.length - 1];
svg.appendChild(svgText(a[0], labPos(a[0], a[1] - 10), r.cities[0], base.soft));
svg.appendChild(svgText(b[0], labPos(b[0], b[1] + 20), r.cities[r.cities.length - 1], base.soft));
});
var rn = el("div", "fs-078"); rn.style.cssText = "margin-top:6px;color:var(--geog-ink-soft)";
rn.textContent = "线路走向为教学示意折线，非精确走向；五纵三横口径见人教版八下。点线路作答（8 条全对过关）。";
wrap.appendChild(rn);
function ask() {
var r = RAILWAYS[order[state.round]];
prompt.textContent = "第 " + (state.round + 1) + "/8 \u9898\uff1a\u8bf7\u5728\u56fe\u4e0a\u70b9\u51fa\u3010" + r.name + "\u3011\uff08" + r.dir + "\u7ebf\uff09";
say("点图中对应的一条铁路线。");
}
function guessRail(r) {
if (state.done) return;
var target = RAILWAYS[order[state.round]];
if (r.id === target.id) {
state.score++;
drawn.forEach(function (o) {
if (o.r.id === r.id) { o.line.setAttribute("stroke", correctC); o.line.setAttribute("stroke-width", "6");}
});
say("✓ 答对！" + r.name + "：" + r.cities.join("—") + "。");
state.round++;
if (state.round >= order.length) {
state.done = true; prompt.textContent = "闯关完成：8 条全对 ✓（得分 " + state.score + "/8）";
say("五纵三横全部点对！记住口诀：五纵（京哈—京广/京沪/京九/太焦—焦柳/宝成—成昆）、三横（京包—包兰/陇海—兰新/沪杭—浙赣—湘黔—贵昆）。");
} else ask();
} else {
say("✗ 不是这一条。再想想：" + target.name + " 经过哪些城市？（" + target.cities.join("、") + "）");
}
persist();
}
/* FAIL-6a（2026-10-18）：svg 级点击 → 换算 viewBox 坐标 → 点到各线路折线段
* 距离最近者判分（不再依赖命中区 DOM 叠放顺序；证伪点 (536.5,209.5) 距京沪线
* 为 0，判京沪线）。≤HIT_R 才受理，空白处点击沿用旧行为（无响应）。 */
svg.addEventListener("click", function (ev) {
var lp = svgViewPoint(svg, ev); if (!lp) return;
var best = null, bestD = Infinity;
RAILWAYS.forEach(function (r) {
var d = Infinity;
for (var i = 0; i < r.pts.length - 1; i++) d = Math.min(d, ptSegDist(lp, r.pts[i], r.pts[i + 1]));
if (d < bestD) { bestD = d; best = r;}
});
if (best && bestD <= HIT_R) guessRail(best);
});
truth.quizOrder = order.map(function (i) { return RAILWAYS[i].id;});
ask();
}

if (theme === "qinling") {
truth.line = QINLING_LINE; truth.meanings = QINLING_MEANINGS.map(function (m) { return m.text;});
var baseLine = svgEl("path", { d: QINLING_LINE, fill: "none", stroke: accent, "stroke-width": 4,
"stroke-linejoin": "round"});
svg.appendChild(baseLine);
svg.appendChild(svgText(487, 262, "秦岭—淮河线（示意）", accent));
var btnBar = el("div", ""); btnBar.style.cssText = "display:flex;flex-wrap:wrap;gap:8px;margin:8px 0";
wrap.insertBefore(btnBar, svg);
var vis = {};
var meaningLines = {};
QINLING_MEANINGS.forEach(function (m, i) {
vis[m.id] = true;
var d = QINLING_LINE.replace(/(\d+),(\d+)/g, function (_, x, y) { return x + "," + (parseInt(y, 10) + m.dy);});
var ln = svgEl("path", { d: d, fill: "none", stroke: RAIL_COLORS[i % RAIL_COLORS.length],
"stroke-width": 2.5, "stroke-dasharray": "8,5", "data-meaning": m.id});
ln.style.cursor = "pointer";
ln.addEventListener("click", function () { toggle(m);});
svg.appendChild(ln); meaningLines[m.id] = ln;
var b = el("button", "geog-btn fs-085", (i + 1) + " " + m.name);
b.style.minHeight = "44px";
b.setAttribute("aria-pressed", "true");
b.addEventListener("click", function () { toggle(m);});
btnBar.appendChild(b); m._btn = b;
});
function toggle(m) {
vis[m.id] =!vis[m.id];
meaningLines[m.id].style.display = vis[m.id]? "": "none";
m._btn.setAttribute("aria-pressed", String(vis[m.id]));
state.selected = m.id; persist();
say((vis[m.id]? "显示：": "隐藏：") + m.text);
}
var badge = el("div", "fs-085");
badge.style.cssText = "margin-top:6px;padding:8px 10px;border-left:4px solid var(--geog-accent);background:var(--geog-bg-soft)";
badge.textContent = QINLING_NOTE;
wrap.appendChild(badge);
state.meaningVisible = vis;
say("六条线的开关都在上面：逐条看各是什么意思，全开看它们“大致吻合”。");
}

if (theme === "hmt") {
/* W4 返工（2026-10-18 专家裁决）：hmt 主题隐藏底图「台湾岛」注记，仅保留「台湾省」高亮注记 */
var _baseLabels = base.g.querySelectorAll("text");
for (var _li = 0; _li < _baseLabels.length; _li++) {
if (_baseLabels[_li].textContent === "台湾岛") _baseLabels[_li].style.display = "none";
}
truth.places = HMT.map(function (h) { return { id: h.id, name: h.name};});
truth.redline = HMT_REDLINE;
function selectH(h) { state.selected = h.id; persist(); say(h.text);}
/* 台湾先画（高亮＋命中区在下层），港澳后画：命中区互有重叠时上层优先，
* 港澳点位是主要点选目标，须在上层。 */
var twH = null;
HMT.forEach(function (h) { if (h.id === "tw") twH = h;});
var twCenter = null;
if (twH) {
var twp = base.tw;
var hl = svgEl("path", { d: twp.path, fill: base.landFill,
stroke: accent, "stroke-width": 3});
hl.style.cursor = "pointer";
hl.setAttribute("tabindex", "0"); hl.setAttribute("role", "button");
hl.setAttribute("aria-label", "台湾省");
hl.addEventListener("click", function () { selectH(twH);});
hl.addEventListener("keydown", function (e) {
if (e.key === "Enter" || e.key === " ") { e.preventDefault(); hl.dispatchEvent(new Event("click"));}
});
svg.appendChild(hl);
/* F2（2026-10-18）：台湾岛形过小（约 19×36 逻辑单位，390px 下有效仅约 8px），
* 加透明命中矩形（≥HIT_MIN，有效约 43px ≥40px），以岛形 bbox 中心为准；
* pointer-events:none，只做命中区占位，归属由 svg 级最近点判定。 */
var tbb = hl.getBBox();
twCenter = [tbb.x + tbb.width / 2, tbb.y + tbb.height / 2];
var thw = Math.max(tbb.width, HIT_MIN), thh = Math.max(tbb.height, HIT_MIN);
svg.appendChild(svgEl("rect", { x: twCenter[0] - thw / 2, y: twCenter[1] - thh / 2,
width: thw, height: thh, fill: "transparent", "pointer-events": "none"}));
svg.appendChild(svgText(614, 382, "台湾省", accent));
}
HMT.forEach(function (h) {
if (h.id === "tw") return;
var c = svgEl("circle", { cx: h.pt[0], cy: h.pt[1], r: 11, fill: accent, opacity: 0.9,
stroke: "#fff", "stroke-width": 2});
c.style.cursor = "pointer";
c.setAttribute("tabindex", "0"); c.setAttribute("role", "button");
c.setAttribute("aria-label", h.name);
c.addEventListener("click", function () { selectH(h);});
c.addEventListener("keydown", function (e) {
if (e.key === "Enter" || e.key === " ") { e.preventDefault(); c.dispatchEvent(new Event("click"));}
});
svg.appendChild(c);
/* F2（2026-10-18）：命中圆 r=HIT_R（390px 下有效直径约 43px ≥40px）；
* pointer-events:none 穿透，归属由 svg 级最近点判定（港澳两点仅距约 18 逻辑
* 单位，命中圆重叠，按 DOM 叠放会误判——FAIL-6a 同类机理）。键盘可达不变。 */
svg.appendChild(svgEl("circle", { cx: h.pt[0], cy: h.pt[1], r: HIT_R,
fill: "transparent", "pointer-events": "none"}));
svg.appendChild(svgText(h.lab[0], h.lab[1], h.name, base.ink));
});
/* FAIL-6a 同理（2026-10-18）：svg 级点击 → 视觉最近点位归属（≤HIT_R 受理）。 */
svg.addEventListener("click", function (ev) {
var lp = svgViewPoint(svg, ev); if (!lp) return;
var best = null, bestD = Infinity;
HMT.forEach(function (h) {
var tp = (h.id === "tw")? twCenter: h.pt;
if (!tp) return;
var d = Math.hypot(lp[0] - tp[0], lp[1] - tp[1]);
if (d < bestD) { bestD = d; best = h;}
});
if (best && bestD <= HIT_R) selectH(best);
});
var rl = el("div", "fs-085");
rl.style.cssText = "margin-top:6px;padding:8px 10px;border-left:4px solid var(--geog-wrong);background:var(--geog-bg-soft)";
rl.textContent = HMT_REDLINE;
wrap.appendChild(rl);
say("点香港、澳门、台湾，看各自的定位——先记住红线：都是中国不可分割的一部分。");
}

box.appendChild(wrap);
var view = {
state: function () { return JSON.parse(JSON.stringify(state));},
truth: function () { return JSON.parse(JSON.stringify(truth));},
resize: function () {},
destroy: function () { untrack(view);},
labelFonts: function () { return [];}
};
return track(view);
});

/* ============================================================
* 2. region-compare（地区对照表）
* params: {title?, intro?, columns:[..], rows:[{label, cells:[], detail}],
* recordKey?}
* ============================================================ */
window.GEO.registerWidget("region-compare", function (box, params) {
var recordKey = params.recordKey || "geog_region-compare";
var wrap = el("div", "geog-region-compare");
if (params.title) { var t = el("div", "fs-105"); t.style.fontWeight = "bold"; t.style.marginBottom = "6px"; t.textContent = params.title; wrap.appendChild(t);}
if (params.intro) { var it = el("div", "fs-095"); it.style.marginBottom = "8px"; it.textContent = params.intro; wrap.appendChild(it);}
var scroller = el("div", ""); scroller.style.overflowX = "auto";
var table = el("table", "fs-085");
table.style.cssText = "border-collapse:collapse;width:100%;min-width:340px";
var thead = el("thead", ""); var hr = el("tr", "");
var th0 = el("th", "fs-085", esc(params.rowHead || "方面"));
hr.appendChild(th0);
(params.columns || []).forEach(function (c) { hr.appendChild(el("th", "fs-085", esc(c)));});
thead.appendChild(hr); table.appendChild(thead);
var tbody = el("tbody", "");
var detailBar = el("div", "fs-095");
detailBar.style.cssText = "margin-top:8px;padding:10px 12px;border:1px solid var(--geog-border);border-radius:8px;background:var(--geog-card);min-height:44px";
detailBar.textContent = "点表格的一行，看详细解读。";
var state = { selectedRow: null};
function styleCell(n, isHead) {
n.style.cssText = "border:1px solid var(--geog-border);padding:10px 8px;text-align:left;vertical-align:top;" +
(isHead? "background:var(--geog-bg-soft);font-weight:bold;": "");
}
styleCell(th0, true);
Array.prototype.forEach.call(hr.querySelectorAll("th"), function (n, i) { if (i > 0) styleCell(n, true);});
(params.rows || []).forEach(function (row, i) {
var tr = el("tr", "");
var lab = el("td", "fs-085"); lab.textContent = row.label; styleCell(lab, true);
tr.appendChild(lab);
(row.cells || []).forEach(function (c) {
var td = el("td", "fs-085"); td.textContent = c; styleCell(td, false); tr.appendChild(td);
});
tr.style.cursor = "pointer";
tr.setAttribute("tabindex", "0"); tr.setAttribute("role", "button");
tr.setAttribute("aria-label", row.label + "（点看详解）");
tr.addEventListener("click", function () {
state.selectedRow = i;
try { localStorage.setItem("ltb-geo-" + recordKey, JSON.stringify(state));} catch (e) {}
detailBar.textContent = row.label + "：" + (row.detail || row.cells.join("；"));
Array.prototype.forEach.call(tbody.querySelectorAll("tr"), function (r2) { r2.style.background = "";});
tr.style.background = "var(--geog-bg-soft)";
});
tr.addEventListener("keydown", function (e) {
if (e.key === "Enter" || e.key === " ") { e.preventDefault(); tr.dispatchEvent(new Event("click"));}
});
tbody.appendChild(tr);
});
table.appendChild(tbody);
scroller.appendChild(table);
wrap.appendChild(scroller);
wrap.appendChild(detailBar);
box.appendChild(wrap);
var truth = { columns: params.columns, rows: (params.rows || []).map(function (r) { return { label: r.label, cells: r.cells};})};
var view = {
state: function () { return JSON.parse(JSON.stringify(state));},
truth: function () { return JSON.parse(JSON.stringify(truth));},
resize: function () {},
destroy: function () { untrack(view);},
labelFonts: function () { return [];}
};
return track(view);
});

/* ============================================================
* 3. geo-schematic（城市/区域职能示意：节点/区域/连线）
* params: {board:"beijing"|"yrd"|"prd"|"sjy", recordKey?}
* 板子几何为教学示意（非精确比例），不涉国界/省界绘制。
* ============================================================ */
var BOARDS = {
beijing: {
title: "北京城市职能示意", vb: "0 0 800 560",
intro: "示意图：中轴线纵贯南北，各功能区点读。",
declare: "示意｜非精确比例｜功能区位置为示意",
axis: { x1: 400, y1: 60, x2: 400, y2: 500, label: "中轴线（南北纵贯）"},
areas: [
{ id: "palace", label: "故宫·天安门", x: 350, y: 200, w: 100, h: 70,
desc: "明清皇宫与开国大典之地：历史文化与政治象征的双重地标（世界遗产）。"},
{ id: "politics", label: "政治中心区", x: 180, y: 200, w: 120, h: 90,
desc: "政治中心：党中央、全国人大、国务院所在地——首都的首要职能。"},
{ id: "culture", label: "文化中心区", x: 200, y: 80, w: 140, h: 80,
desc: "文化中心：高校、博物馆、国家图书馆云集；历史文化名城底蕴。"},
{ id: "intl", label: "国际交往中心区", x: 560, y: 200, w: 130, h: 90,
desc: "国际交往中心：使馆区、国际会议与对外交流窗口。"},
{ id: "hutong", label: "历史文化街区", x: 300, y: 320, w: 130, h: 80,
desc: "胡同、四合院：老北京的城市肌理，历史文化名城的活态见证。"},
{ id: "zhongguancun", label: "中关村科技园区", x: 170, y: 330, w: 120, h: 70,
desc: "中关村：高新技术产业发源地之一（dg11.1.2回填）——但北京的经济功能正在疏解，首都是政治文化中心。"},
{ id: "tiantan", label: "天坛", x: 370, y: 430, w: 90, h: 60,
desc: "天坛：明清祭天之地（世界遗产），中轴线南端的礼制地标。"}
],
nodes: [
{ id: "traffic", label: "交通拥堵", x: 640, y: 352, warn: true,
desc: "城市问题①交通：人口与车辆高度集中，早晚高峰拥堵——城市规划要职住平衡、发展公共交通。"},
{ id: "water", label: "水资源短缺", x: 620, y: 420, warn: true,
desc: "城市问题②水资源：北京人均水资源少，南水北调中线缓解供水（dg10.2.1回填）——节约用水人人有责。"}
],
links: []
},
yrd: {
title: "长江三角洲城市群格局示意", vb: "0 0 800 560",
intro: "核心—边缘结构：以上海为核心，多中心、网络化。点击城市看定位。",
declare: "示意｜非精确比例｜城市位置为示意",
areas: [],
nodes: [
{ id: "sh", label: "上海（核心）", x: 400, y: 280, r: 46, core: true,
desc: "核心：上海。长江三角洲城市群的核心城市；国际经济、金融、贸易、航运、科技创新中心。"},
{ id: "nj", label: "南京", x: 230, y: 170, r: 30, desc: "南京：江苏省会，长三角西北翼中心城市，历史文化名城。"},
{ id: "hz", label: "杭州", x: 250, y: 400, r: 30, desc: "杭州：浙江省会，数字经济与创新高地，西湖（世界遗产）。"},
{ id: "sz", label: "苏州", x: 330, y: 300, r: 26, desc: "苏州：制造业重镇，苏州园林（世界遗产），水乡文化代表。"},
{ id: "nb", label: "宁波", x: 500, y: 410, r: 26, desc: "宁波：重要港口城市，宁波舟山港货物吞吐量大。"},
{ id: "hf", label: "合肥", x: 150, y: 270, r: 26, desc: "合肥：安徽省会，长三角西翼，承东启西的节点。"},
{ id: "wx", label: "无锡", x: 370, y: 210, r: 22, desc: "无锡：太湖之滨，物联网与制造业名城。"}
],
links: [
{ id: "l1", from: [400, 280], to: [230, 170], label: "一体化"},
{ id: "l2", from: [400, 280], to: [250, 400], label: "一体化"},
{ id: "l3", from: [400, 280], to: [330, 300], label: "一体化"},
{ id: "l4", from: [400, 280], to: [500, 410], label: "一体化"},
{ id: "l5", from: [400, 280], to: [150, 270], label: "一体化"}
],
foot: "长江三角洲城市群：以上海为核心，包括江苏、浙江、安徽多市——是我国最大的城市群（人教版口径）。一体化：交通互联、产业协同、生态共治。"
},
prd: {
title: "珠江三角洲与港澳合作示意", vb: "0 0 800 560",
intro: "“前店后厂”：港澳的资金、技术、管理 + 珠三角的土地、劳动力。点击看合作链。",
declare: "示意｜非精确比例｜城市位置为示意",
areas: [],
nodes: [
{ id: "gz", label: "广州", x: 400, y: 120, r: 30, desc: "广州：广东省会，国家中心城市，商贸与交通枢纽。"},
{ id: "fs", label: "佛山", x: 330, y: 200, r: 24, desc: "佛山：制造业名城（家电、陶瓷），广佛同城。"},
{ id: "dg", label: "东莞", x: 470, y: 230, r: 24, desc: "东莞：“世界工厂”起步之地，现处产业升级进行中（截至2024年）。"},
{ id: "sz", label: "深圳", x: 540, y: 300, r: 30, desc: "深圳：经济特区，科技创新之城；毗邻香港，“前店后厂”的“厂”."},
{ id: "zh", label: "珠海", x: 380, y: 390, r: 24, desc: "珠海：经济特区，毗邻澳门；港珠澳大桥西端。"},
{ id: "hk", label: "香港", x: 540, y: 430, r: 26, desc: "香港：特别行政区，“前店”——资金、技术、管理、国际市场。"},
{ id: "mo", label: "澳门", x: 440, y: 450, r: 22, desc: "澳门：特别行政区，博彩旅游业，与珠海合作紧密。"}
],
links: [
{ id: "c1", from: [540, 430], to: [540, 300], label: "前店→后厂", desc: "香港（店：资金技术管理）→深圳、东莞（厂：土地劳动力）。"},
{ id: "c2", from: [540, 430], to: [470, 230], label: "前店→后厂", desc: "香港→东莞：加工制造合作链。"},
{ id: "c3", from: [440, 450], to: [380, 390], label: "港珠澳大桥", desc: "港珠澳大桥：连接香港、珠海、澳门的跨海通道（示意）。"},
{ id: "c4", from: [400, 120], to: [330, 200], label: "广佛同城", desc: "广佛同城：交通与产业一体化。"}
],
foot: "珠江三角洲：外向型经济起家，“前店后厂”与港澳深度合作；现处产业升级进行中（本课表述截至2024年，数据看年份，GEO-R52）。"
},
sjy: {
title: "三江源水系示意", vb: "0 0 800 560",
intro: "中华水塔：长江、黄河、澜沧江都发源于这里——是发源地，不是交汇处！",
declare: "示意｜非精确比例｜河流走向为示意",
areas: [
{ id: "source", label: "三江源", x: 330, y: 150, w: 150, h: 90,
desc: "三江源：长江、黄河、澜沧江的发源地；高原湿地涵养水源，被誉为“中华水塔”。"}
],
nodes: [],
links: [
{ id: "cj", from: [480, 195], to: [680, 260], label: "长江→东", river: true,
desc: "长江：发源于唐古拉山，向东奔流入海（示意流向）。"},
{ id: "hh", from: [450, 150], to: [580, 90], label: "黄河→东北", river: true,
desc: "黄河：发源于巴颜喀拉山，先向东北再折向东（示意流向）。"},
{ id: "lcj", from: [405, 240], to: [430, 470], label: "澜沧江→南", river: true,
desc: "澜沧江：向南流出国境，境外称湄公河（示意流向）。"}
],
foot: "注意：三江源是三条大江的发源地，不是交汇处（审计清单第9条）！生态保护：三江源国家公园（2021年正式设立）、生态移民。"
},
whc: {
title: "武汉城市圈“1+8”示意", vb: "0 0 800 560",
intro: "三步法实战：定位（点武汉）→描述（点 8 城与产业）→解释（为什么是武汉当核心）。",
declare: "示意｜非精确比例｜城市位置为示意",
areas: [],
nodes: [
{ id: "wh", label: "武汉（核心）", x: 400, y: 280, r: 46, core: true,
desc: "核心：武汉。九省通衢——长江黄金水道＋京广线交汇；国家中心城市、长江经济带脊梁。" },
{ id: "hs", label: "黄石", x: 480, y: 340, r: 26, desc: "黄石：矿冶名城，长江沿岸重要节点。" },
{ id: "ez", label: "鄂州", x: 450, y: 300, r: 24, desc: "鄂州：紧邻武汉，武鄂同城化前锋。" },
{ id: "xg", label: "孝感", x: 330, y: 200, r: 26, desc: "孝感：武汉北大门，承接产业转移。" },
{ id: "hg", label: "黄冈", x: 540, y: 220, r: 26, desc: "黄冈：大别山南麓，生态与红色资源富集。" },
{ id: "xn", label: "咸宁", x: 400, y: 400, r: 26, desc: "咸宁：武汉“南大门”，温泉与楠竹之乡。" },
{ id: "xt", label: "仙桃", x: 260, y: 320, r: 22, desc: "仙桃：江汉平原腹地，体操之乡。" },
{ id: "qj", label: "潜江", x: 200, y: 380, r: 22, desc: "潜江：江汉油田所在地，小龙虾名城。" },
{ id: "tm", label: "天门", x: 280, y: 250, r: 22, desc: "天门：江汉平原北部，侨乡。" },
{ id: "guanggu", label: "光谷", x: 470, y: 240, r: 24,
desc: "光谷（东湖高新技术开发区）：光电子信息产业高地，“光芯屏端网”代表。" },
{ id: "auto", label: "汽车", x: 320, y: 340, r: 24,
desc: "汽车：东风汽车总部，武汉支柱产业之一。" },
{ id: "steel", label: "钢铁", x: 430, y: 330, r: 24,
desc: "钢铁：武钢，传统重工业代表（青山）。" },
{ id: "prob", label: "产业偏重", x: 620, y: 400, warn: true,
desc: "城市问题：产业偏重、创新转化待加强——对策：光谷创新引领、长江大保护、城市圈一体化。" }
],
links: [
{ id: "w1", from: [400, 280], to: [470, 240], label: "创新", desc: "武汉→光谷：创新引领。" },
{ id: "w2", from: [400, 280], to: [320, 340], label: "制造", desc: "武汉→汽车/钢铁：制造基地。" },
{ id: "w3", from: [400, 280], to: [450, 300], label: "同城", desc: "武汉→鄂州：武鄂同城化。" },
{ id: "w4", from: [400, 280], to: [330, 200], label: "辐射", desc: "武汉→孝感：产业辐射。" }
],
foot: "武汉城市圈“1+8”：武汉＋黄石、鄂州、孝感、黄冈、咸宁、仙桃、潜江、天门——长江中游城市群的核心。三步法：定位→描述→解释，顺序不许颠倒。"
}
};
window.GeoBatch6.BOARDS = BOARDS;

window.GEO.registerWidget("geo-schematic", function (box, params) {
var board = BOARDS[params.board];
var recordKey = params.recordKey || ("geog_geo-schematic_" + params.board);
var wrap = el("div", "geog-schematic");
if (!board) {
wrap.appendChild(el("div", "geog-block trap", "⚠️ 未知示意板：" + esc(params.board)));
box.appendChild(wrap);
return { state: function () { return {};}, resize: function () {}, destroy: function () {}, labelFonts: function () { return [];}};
}
var t = el("div", "fs-105"); t.style.fontWeight = "bold"; t.style.marginBottom = "6px";
t.textContent = board.title; wrap.appendChild(t);
var it = el("div", "fs-095"); it.style.marginBottom = "8px"; it.textContent = board.intro;
wrap.appendChild(it);
var svg = svgRoot(board.vb); wrap.appendChild(svg);
var ink = cssVar("--geog-ink", "#1a1a1a");
var soft = cssVar("--geog-ink-soft", "#4a4a4a");
var accent = cssVar("--geog-accent", "#0e7c66");
var warn = cssVar("--geog-wrong", "#c0392b");
var card = cssVar("--geog-card", "#ffffff");
var readout = readoutPanel(); wrap.appendChild(readout);
cornerDeclare(svg, board.declare, 560);
var state = { selected: null};
function say(x) { readout.textContent = x;}
function persist() { store(recordKey, state);}

/* 中轴线（北京板） */
if (board.axis) {
var a = board.axis;
svg.appendChild(svgEl("line", { x1: a.x1, y1: a.y1, x2: a.x2, y2: a.y2,
stroke: accent, "stroke-width": 4, "stroke-dasharray": "10,6"}));
svg.appendChild(svgText((a.x1 + a.x2) / 2 + 96, (a.y1 + a.y2) / 2, a.label, accent));
}
/* 连线（动画虚线） */
(board.links || []).forEach(function (L) {
var ln = svgEl("line", { x1: L.from[0], y1: L.from[1], x2: L.to[0], y2: L.to[1],
stroke: L.river? cssVar("--geog-river", "#2a7de1"): accent,
"stroke-width": L.river? 5: 3, "stroke-dasharray": L.river? "12,8": "8,6"});
ln.style.cursor = "pointer";
if (L.river) {
var ar = svgEl("polygon", { points: arrowHead(L.from, L.to), fill: cssVar("--geog-river", "#2a7de1")});
svg.appendChild(ar);
}
var mx = (L.from[0] + L.to[0]) / 2, my = (L.from[1] + L.to[1]) / 2;
var lt = svgText(mx, my - 8, L.label, soft); svg.appendChild(ln); svg.appendChild(lt);
var hit = svgEl("line", { x1: L.from[0], y1: L.from[1], x2: L.to[0], y2: L.to[1],
stroke: "transparent", "stroke-width": HIT_MIN});
/* F2（2026-10-18）：命中带宽 44→HIT_MIN（390px 下有效约 43px ≥40px） */
hit.style.cursor = "pointer";
var fire = function () { state.selected = L.id; persist(); say((L.desc || L.label));};
ln.addEventListener("click", fire); hit.addEventListener("click", fire);
svg.appendChild(hit);
});
function arrowHead(from, to) {
var ang = Math.atan2(to[1] - from[1], to[0] - from[0]);
var s = 14, x = to[0], y = to[1];
var p1 = [x - s * Math.cos(ang - 0.42), y - s * Math.sin(ang - 0.42)];
var p2 = [x - s * Math.cos(ang + 0.42), y - s * Math.sin(ang + 0.42)];
return x + "," + y + " " + p1[0] + "," + p1[1] + " " + p2[0] + "," + p2[1];
}
/* 区域 */
(board.areas || []).forEach(function (A) {
var r = svgEl("rect", { x: A.x, y: A.y, width: A.w, height: A.h, rx: 10,
fill: accent, opacity: 0.18, stroke: accent, "stroke-width": 2});
r.style.cursor = "pointer";
r.setAttribute("tabindex", "0"); r.setAttribute("role", "button");
r.setAttribute("aria-label", A.label);
var fire = function () { state.selected = A.id; persist(); say(A.label + "：" + A.desc);};
r.addEventListener("click", fire);
r.addEventListener("keydown", function (e) {
if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fire();}
});
svg.appendChild(r);
svg.appendChild(svgText(A.x + A.w / 2, A.y + A.h / 2, A.label, ink));
/* F2（2026-10-18）：功能区过小（如 90×60 → 390px 下有效仅 39×26px）时加透明
* 命中矩形，居中展开到 ≥HIT_MIN（有效约 43px ≥40px）；点击转发 fire，键盘可达不变。 */
var ahw = Math.max(A.w, HIT_MIN), ahh = Math.max(A.h, HIT_MIN);
var ahit = svgEl("rect", { x: A.x + A.w / 2 - ahw / 2, y: A.y + A.h / 2 - ahh / 2,
width: ahw, height: ahh, rx: 10, fill: "transparent"});
ahit.style.cursor = "pointer";
ahit.addEventListener("click", fire);
svg.appendChild(ahit);
});
/* 节点 */
(board.nodes || []).forEach(function (N) {
var rr = N.r || 24;
var c = svgEl("circle", { cx: N.x, cy: N.y, r: rr,
fill: N.warn? warn: (N.core? accent: card),
opacity: N.core? 0.9: 1,
stroke: N.warn? warn: accent, "stroke-width": 2.5});
if (!N.core &&!N.warn) c.setAttribute("fill", card);
if (N.core) { var ct = svgText(N.x, N.y, N.label.split("（")[0], "#fff"); svg.appendChild(c); svg.appendChild(ct);}
else svg.appendChild(c);
c.style.cursor = "pointer";
c.setAttribute("tabindex", "0"); c.setAttribute("role", "button");
c.setAttribute("aria-label", N.label);
var fire = function () { state.selected = N.id; persist(); say(N.label + "：" + N.desc);};
c.addEventListener("click", fire);
c.addEventListener("keydown", function (e) {
if (e.key === "Enter" || e.key === " ") { e.preventDefault(); fire();}
});
/* F2（2026-10-18）：命中圆 r≥HIT_R（390px 下有效直径约 43px ≥40px） */
var hit = svgEl("circle", { cx: N.x, cy: N.y, r: Math.max(rr, HIT_R), fill: "transparent"});
hit.style.cursor = "pointer"; hit.addEventListener("click", fire);
svg.appendChild(hit);
if (!N.core) svg.appendChild(svgText(N.x, N.y - rr - 8, N.label, N.warn? warn: ink));
});
if (board.foot) {
var f = el("div", "fs-085"); f.style.cssText = "margin-top:6px;color:var(--geog-ink-soft)";
f.textContent = board.foot; wrap.appendChild(f);
}
say("点图上的要素，看解读。");
box.appendChild(wrap);
var truth = { board: params.board, title: board.title, declare: board.declare,
areas: (board.areas || []).map(function (x) { return x.id;}),
nodes: (board.nodes || []).map(function (x) { return x.id;}),
links: (board.links || []).map(function (x) { return x.id;})};
var view = {
state: function () { return JSON.parse(JSON.stringify(state));},
truth: function () { return JSON.parse(JSON.stringify(truth));},
resize: function () {},
destroy: function () { untrack(view);},
labelFonts: function () { return [];}
};
return track(view);
});

/* ============================================================
* 4. process-stages（分阶段过程动画）
* params: {process:"loess", recordKey?}
* ============================================================ */
var LOESS_STAGES = [
{ id: "s1", title: "① 平坦的黄土塬",
caption: "最初：厚厚的黄土平坦地铺展（黄土塬）。黄土土质疏松、垂直节理发育——这是“容易被侵蚀”的内因。",
draw: "s1"},
{ id: "s2", title: "② 暴雨＋植被破坏",
caption: "夏季暴雨集中，人类过度开垦、破坏植被（人为因素！审计清单第8条）→ 地表径流冲刷出细沟。",
draw: "s2"},
{ id: "s3", title: "③ 沟壑下切加深",
caption: "流水不断下切、溯源侵蚀：细沟→切沟→冲沟。沟壑就是密集的山谷——沟壁等高线密集=坡陡（红线辨析①回填）。",
draw: "s3"},
{ id: "s4", title: "④ 支离破碎＋治理",
caption: "切割成梁（长条形黄土高地）、峁（孤立的黄土小丘），支离破碎。治理：生物措施（植树种草）＋工程措施（打坝淤地、修梯田）——保塬、护坡、固沟。",
draw: "s4"}
];
window.GeoBatch6.LOESS_STAGES = LOESS_STAGES;

window.GEO.registerWidget("process-stages", function (box, params) {
var recordKey = params.recordKey || "geog_process-stages";
var stages = (params.process === "loess")? LOESS_STAGES: LOESS_STAGES;
var wrap = el("div", "geog-process");
var t = el("div", "fs-105"); t.style.fontWeight = "bold"; t.style.marginBottom = "6px";
t.textContent = "黄土高原沟壑演变（示意）"; wrap.appendChild(t);
var svg = svgRoot("0 0 800 400"); wrap.appendChild(svg);
var caption = el("div", "fs-095");
caption.style.cssText = "margin-top:8px;padding:10px 12px;border:1px solid var(--geog-border);border-radius:8px;background:var(--geog-card);min-height:44px";
wrap.appendChild(caption);
var bar = el("div", ""); bar.style.cssText = "display:flex;gap:8px;margin-top:8px;flex-wrap:wrap";
var prevB = el("button", "geog-btn fs-085", "← 上一步"); prevB.style.minHeight = "44px";
var playB = el("button", "geog-btn fs-085", "▶ 播放"); playB.style.minHeight = "44px";
var nextB = el("button", "geog-btn fs-085", "下一步 →"); nextB.style.minHeight = "44px";
bar.appendChild(prevB); bar.appendChild(playB); bar.appendChild(nextB);
wrap.appendChild(bar);
cornerDeclare(svg, "示意｜非精确比例｜过程为示意分期", 400);
var state = { stage: 0, playing: false};
var timer = null;
var soil = cssVar("--geog-land", "#f3e9d2");
var ink = cssVar("--geog-ink", "#1a1a1a");
var soft = cssVar("--geog-ink-soft", "#4a4a4a");
var accent = cssVar("--geog-accent", "#0e7c66");
var water = cssVar("--geog-river", "#2a7de1");
var green = cssVar("--geog-correct", "#1a7f37");

function drawStage(i) {
while (svg.firstChild) svg.removeChild(svg.firstChild);
var st = stages[i];
/* 天空与黄土层底 */
svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 800, height: 400, fill: cssVar("--geog-sea", "#dcebf7"), opacity: 0.35}));
svg.appendChild(svgEl("rect", { x: 0, y: 300, width: 800, height: 100, fill: soil, opacity: 0.6}));
svg.appendChild(svgText(400, 30, st.title, ink));
if (st.draw === "s1") {
svg.appendChild(svgEl("rect", { x: 60, y: 180, width: 680, height: 120, fill: soil, stroke: soft, "stroke-width": 2}));
svg.appendChild(svgText(400, 245, "平坦的黄土塬（土质疏松）", soft));
} else if (st.draw === "s2") {
svg.appendChild(svgEl("rect", { x: 60, y: 180, width: 680, height: 120, fill: soil, stroke: soft, "stroke-width": 2}));
for (var r = 0; r < 8; r++) {
var x = 120 + r * 80;
svg.appendChild(svgEl("line", { x1: x, y1: 60, x2: x - 20, y2: 150, stroke: water, "stroke-width": 3}));
}
svg.appendChild(svgText(400, 100, "夏季暴雨", water));
[[250, 180], [420, 180], [580, 180]].forEach(function (p) {
svg.appendChild(svgEl("path", { d: "M" + p[0] + "," + p[1] + " l-12,40 l24,0 Z",
fill: "none", stroke: warn(), "stroke-width": 3}));
});
svg.appendChild(svgText(400, 330, "细沟出现（植被破坏＋暴雨冲刷）", warn()));
} else if (st.draw === "s3") {
var d = "M60,180 L200,180 L240,300 L280,180 L400,180 L450,300 L500,180 L620,180 L660,300 L700,180 L740,180 L740,300 L60,300 Z";
svg.appendChild(svgEl("path", { d: d, fill: soil, stroke: soft, "stroke-width": 2}));
/* 沟壁等高线密集示意 */
[[228, 220], [234, 250], [240, 278], [462, 220], [468, 250], [474, 278]].forEach(function (p) {
svg.appendChild(svgEl("line", { x1: p[0] - 14, y1: p[1], x2: p[0] + 14, y2: p[1],
stroke: accent, "stroke-width": 2}));
});
svg.appendChild(svgText(400, 100, "沟壑 = 密集的山谷", ink));
svg.appendChild(svgText(400, 340, "沟壁等高线密集 → 坡陡（红线辨析①）", accent));
} else {
/* 梁峁 + 治理 */
svg.appendChild(svgEl("ellipse", { cx: 220, cy: 240, rx: 120, ry: 60, fill: soil, stroke: soft, "stroke-width": 2}));
svg.appendChild(svgEl("ellipse", { cx: 560, cy: 250, rx: 100, ry: 50, fill: soil, stroke: soft, "stroke-width": 2}));
svg.appendChild(svgText(220, 200, "黄土梁", soft));
svg.appendChild(svgText(560, 215, "黄土峁", soft));
/* 植树种草（生物措施） */
[[150, 220], [200, 215], [520, 230], [600, 235]].forEach(function (p) {
svg.appendChild(svgEl("circle", { cx: p[0], cy: p[1], r: 10, fill: green, opacity: 0.8}));
svg.appendChild(svgEl("rect", { x: p[0] - 2, y: p[1], width: 4, height: 16, fill: soft}));
});
/* 打坝淤地（工程措施） */
svg.appendChild(svgEl("rect", { x: 340, y: 260, width: 120, height: 24, fill: soft, opacity: 0.7}));
svg.appendChild(svgText(400, 278, "淤地坝", "#fff"));
svg.appendChild(svgText(400, 340, "生物措施（植树种草）＋工程措施（打坝淤地、修梯田）", green));
}
cornerDeclare(svg, "示意｜非精确比例｜过程为示意分期", 400);
caption.textContent = st.caption;
try { localStorage.setItem("ltb-geo-" + recordKey, JSON.stringify(state));} catch (e) {}
}
function warn() { return cssVar("--geog-wrong", "#c0392b");}
function go(i) {
state.stage = Math.max(0, Math.min(stages.length - 1, i));
stop(); drawStage(state.stage);
}
function stop() { state.playing = false; playB.textContent = "▶ 播放"; if (timer) { clearInterval(timer); timer = null;}}
prevB.addEventListener("click", function () { go(state.stage - 1);});
nextB.addEventListener("click", function () { go(state.stage + 1);});
playB.addEventListener("click", function () {
if (state.playing) { stop(); return;}
state.playing = true; playB.textContent = "⏸ 暂停";
timer = setInterval(function () {
if (state.stage >= stages.length - 1) { go(0);}
else { state.stage++; drawStage(state.stage);}
}, 2200);
});
drawStage(0);
box.appendChild(wrap);
var truth = { process: params.process, stages: stages.map(function (s) { return { id: s.id, title: s.title};})};
var view = {
state: function () { return { stage: state.stage, playing: state.playing};},
truth: function () { return JSON.parse(JSON.stringify(truth));},
resize: function () {},
destroy: function () { stop(); untrack(view);},
labelFonts: function () { return [];}
};
return track(view);
});

/* ============================================================
* 5. scale-switcher（多尺度地图切换）
* params: {recordKey?}（三档冻结：街区/城市/城市群）
* ============================================================ */
var SCALE_LEVELS = [
{ id: "block", label: "街区尺度", scaleRep: "1:10000（示意）", denom: 10000,
blurb: "看一条街、一所学校：比例尺大（分母小）、范围小、内容详细。",
draw: "block"},
{ id: "city", label: "城市尺度", scaleRep: "1:500000（示意）", denom: 500000,
blurb: "看一座城市（如武汉）：三镇格局、长江汉江交汇看得清。",
draw: "city"},
{ id: "metro", label: "城市群尺度", scaleRep: "1:2000000（示意）", denom: 2000000,
blurb: "看城市群（如长江中游城市群）：只见城市点位与网络，不见街道。",
draw: "metro"}
];
window.GeoBatch6.SCALE_LEVELS = SCALE_LEVELS;

window.GEO.registerWidget("scale-switcher", function (box, params) {
var recordKey = params.recordKey || "geog_scale-switcher";
var wrap = el("div", "geog-scale-switcher");
var t = el("div", "fs-105"); t.style.fontWeight = "bold"; t.style.marginBottom = "6px";
t.textContent = "多尺度地图切换（红线辨析④回填）"; wrap.appendChild(t);
var bar = el("div", ""); bar.style.cssText = "display:flex;gap:8px;margin-bottom:8px;flex-wrap:wrap";
var svg = svgRoot("0 0 800 400"); wrap.appendChild(svg);
var info = el("div", "fs-095");
info.style.cssText = "margin-top:8px;padding:10px 12px;border:1px solid var(--geog-border);border-radius:8px;background:var(--geog-card);min-height:44px";
wrap.appendChild(info);
cornerDeclare(svg, "示意｜非精确比例｜三档均为示意", 400);
var state = { level: 0};
var ink = cssVar("--geog-ink", "#1a1a1a");
var soft = cssVar("--geog-ink-soft", "#4a4a4a");
var accent = cssVar("--geog-accent", "#0e7c66");
var water = cssVar("--geog-river", "#2a7de1");
var card = cssVar("--geog-card", "#ffffff");

function draw(i) {
while (svg.firstChild) svg.removeChild(svg.firstChild);
var L = SCALE_LEVELS[i];
svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 800, height: 400, fill: card, opacity: 0.4}));
if (L.draw === "block") {
for (var gx = 100; gx <= 700; gx += 100)
svg.appendChild(svgEl("line", { x1: gx, y1: 40, x2: gx, y2: 360, stroke: soft, "stroke-width": 3}));
for (var gy = 40; gy <= 360; gy += 80)
svg.appendChild(svgEl("line", { x1: 100, y1: gy, x2: 700, y2: gy, stroke: soft, "stroke-width": 3}));
svg.appendChild(svgEl("rect", { x: 280, y: 140, width: 120, height: 80, fill: accent, opacity: 0.5}));
svg.appendChild(svgText(340, 185, "学校", ink));
svg.appendChild(svgText(400, 30, "街区：连每条小巷都看得清", ink));
} else if (L.draw === "city") {
svg.appendChild(svgEl("path", { d: "M120,200 C300,180 500,220 700,160", fill: "none", stroke: water, "stroke-width": 14}));
svg.appendChild(svgEl("path", { d: "M350,60 C370,160 360,260 380,360", fill: "none", stroke: water, "stroke-width": 8}));
svg.appendChild(svgText(400, 140, "长江", water));
svg.appendChild(svgText(300, 300, "汉江", water));
[[250, 250], [480, 230], [420, 300]].forEach(function (p) {
svg.appendChild(svgEl("rect", { x: p[0] - 40, y: p[1] - 25, width: 80, height: 50, fill: accent, opacity: 0.4, stroke: accent}));
});
svg.appendChild(svgText(400, 30, "城市：三镇与江河看得清，不见小巷", ink));
} else {
var cities = [[200, 150], [350, 120], [500, 160], [300, 250], [480, 260], [620, 220], [400, 320]];
cities.forEach(function (p, ci) {
if (ci > 0) svg.appendChild(svgEl("line", { x1: cities[0][0], y1: cities[0][1], x2: p[0], y2: p[1],
stroke: accent, "stroke-width": 2, "stroke-dasharray": "6,5"}));
});
cities.forEach(function (p) {
svg.appendChild(svgEl("circle", { cx: p[0], cy: p[1], r: 12, fill: accent, opacity: 0.8}));
});
svg.appendChild(svgText(400, 30, "城市群：只见城市点位与网络", ink));
}
cornerDeclare(svg, "示意｜非精确比例｜三档均为示意", 400);
info.textContent = L.label + " · 比例尺" + L.scaleRep + "——" + L.blurb +
"口诀：分母越小、比例尺越大、越详细（大详小略，GEO-R18/19）。";
try { localStorage.setItem("ltb-geo-" + recordKey, JSON.stringify(state));} catch (e) {}
}
SCALE_LEVELS.forEach(function (L, i) {
var b = el("button", "geog-btn fs-085", L.label);
b.style.minHeight = "44px";
b.setAttribute("aria-pressed", i === 0? "true": "false");
b.addEventListener("click", function () {
state.level = i; draw(i);
Array.prototype.forEach.call(bar.querySelectorAll("button"), function (x, xi) {
x.setAttribute("aria-pressed", String(xi === i));
});
});
bar.appendChild(b);
});
wrap.insertBefore(bar, svg);
draw(0);
box.appendChild(wrap);
var truth = { levels: SCALE_LEVELS.map(function (L) { return { id: L.id, label: L.label, denom: L.denom};})};
var view = {
state: function () { return JSON.parse(JSON.stringify(state));},
truth: function () { return JSON.parse(JSON.stringify(truth));},
resize: function () {},
destroy: function () { untrack(view);},
labelFonts: function () { return [];}
};
return track(view);
});

})();
