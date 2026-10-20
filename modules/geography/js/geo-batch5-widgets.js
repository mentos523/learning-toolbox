/* ============================================================
 * 学习工具箱 · 地理 · 批 5 新增渲染器：geo-map（13 modes）
 *
 * 本文件在 js/geography.js、data/geo-schematic-paths.js 之后引入，
 * 经 window.GEO.registerWidget("geo-map", …) 注册。
 *
 * params 契约（与内容子任务 A 约定，字段名冻结）：
 *   { assetId, mode, declare }
 *   assetId：geo-schematic-paths.js 中的资产 id（缺省按 mode 取默认映射）；
 *   mode：13 种之一（见下）；declare：课页附加声明（渲染为角落小字）。
 *
 * mode 清单（落点）：
 *   position-switch（dg08.1.1 半球/纬度/海陆三切换）
 *   four-points（dg08.1.2 四至点点击）
 *   admin-puzzle（dg08.1.3 34 省三配对闯关）
 *   huhuan-yong（dg08.2.1 胡焕庸线两侧对比）
 *   ethnic-match（dg08.2.2 五大自治区对号入座）
 *   terrain-3d（dg09.1.1 三级阶梯剖面动画+山脉走向）
 *   precip（dg09.2.2 年降水量分布判读）
 *   disaster-path（dg09.2.3 台风/寒潮路径）
 *   river-profile（dg09.3.2 长江干流剖面）
 *   yellow-river（dg09.3.3 地上河剖面泥沙淤积动画）
 *   landuse（dg10.1.2 土地利用类型判读）
 *   water-transfer（dg10.2.1 南水北调东中西三线示意）
 *   marine（dg10.2.2 领海/专属经济区示意）
 *
 * 审定口径（GEO-RULING-2026-10-17-08）：
 *   每个 mode 的底图按资产 grade 定级渲染；角落小字不可关闭：
 *   A/B 级冻结文案「示意｜非精确比例｜界线画法依据人教版地理教材插图，非标准地图」；
 *   C 级冻结文案「示意｜非精确比例｜方向仅供参考」。
 *   严禁虚构审图号、严禁自称「标准地图」。
 *
 * 真值：window.GeoBatch5.*（场层，渲染与断言共用）；
 *   view.state() 为 UI 可达值；view.truth() 为场层真值
 *   （GEO-RULING-2026-10-17-03 分场层/UI 两类）。
 * 零外部请求；深浅双色走 --geog-*；触摸热区 ≥44px；
 * HTML 文字只用 V8 阶梯类（.fs-078…）；SVG 文本元素 ≥12.5px，
 *   豁免口径见 geo-audit/batch5-maps/ 卷宗。
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

  /* ============================================================
   * 场层真值（window.GeoBatch5）：人教版八上口径的教学示意数据
   * ============================================================ */
  var FOUR_POINTS = [
    { id: "north", label: "最北端", name: "漠河以北的黑龙江主航道中心线上",
      coord: "53°N以北", pt: [587, 57],
      near: "北邻俄罗斯" },
    { id: "south", label: "最南端", name: "南沙群岛中的曾母暗沙",
      coord: "4°N附近", pt: [498, 598],
      near: "南临南海，与菲律宾、马来西亚、文莱等国隔海相望" },
    { id: "east", label: "最东端", name: "黑龙江与乌苏里江主航道中心线的相交处",
      coord: "135°E以东", pt: [698, 112],
      near: "东北邻俄罗斯，东南邻朝鲜" },
    { id: "west", label: "最西端", name: "帕米尔高原上",
      coord: "73°E以西", pt: [146, 205],
      near: "西邻哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、巴基斯坦等国" }
  ];
  var FOUR_POINTS_SPAN = "南北跨纬度约 49°，东西跨经度约 62°；陆地面积约 960 万平方千米，居世界第三位。";

  var HU_HUAN_YONG = {
    line: [[632, 91], [370, 368]],
    from: "黑河（瑷珲）", to: "腾冲",
    se: { label: "东南部", area: "面积约占 36%", pop: "人口约占 94%", note: "人口稠密" },
    nw: { label: "西北部", area: "面积约占 64%", pop: "人口约占 6%", note: "人口稀疏" }
  };

  var FIVE_AUTONOMOUS = [
    { id: "nm",  name: "内蒙古自治区", ethnic: "蒙古族" },
    { id: "xj",  name: "新疆维吾尔自治区", ethnic: "维吾尔族" },
    { id: "gx",  name: "广西壮族自治区", ethnic: "壮族" },
    { id: "nx",  name: "宁夏回族自治区", ethnic: "回族" },
    { id: "xz",  name: "西藏自治区", ethnic: "藏族" }
  ];

  var TERRAIN_STEPS = [
    { step: "第一级阶梯", landform: "青藏高原", elev: "平均海拔 4000 米以上" },
    { step: "第二级阶梯", landform: "高原、盆地为主", elev: "海拔 1000～2000 米" },
    { step: "第三级阶梯", landform: "平原、丘陵为主", elev: "海拔 500 米以下" }
  ];
  var TERRAIN_BOUNDS = [
    { line: "昆仑山脉—祁连山脉—横断山脉", between: "第一级阶梯与第二级阶梯的分界线" },
    { line: "大兴安岭—太行山—巫山—雪峰山", between: "第二级阶梯与第三级阶梯的分界线" }
  ];
  var MOUNTAINS = [
    { name: "天山山脉", dir: "东西走向" }, { name: "阴山山脉", dir: "东西走向" },
    { name: "昆仑山脉", dir: "东西走向" }, { name: "秦岭", dir: "东西走向" },
    { name: "南岭", dir: "东西走向" },
    { name: "大兴安岭", dir: "东北—西南走向" }, { name: "太行山脉", dir: "东北—西南走向" },
    { name: "巫山", dir: "东北—西南走向" }, { name: "雪峰山", dir: "东北—西南走向" },
    { name: "长白山脉", dir: "东北—西南走向" }, { name: "武夷山脉", dir: "东北—西南走向" },
    { name: "台湾山脉", dir: "东北—西南走向" },
    { name: "横断山脉", dir: "南北走向" },
    { name: "贺兰山", dir: "南北走向" }, { name: "六盘山", dir: "南北走向" },
    { name: "阿尔泰山脉", dir: "西北—东南走向" }, { name: "祁连山脉", dir: "西北—东南走向" },
    { name: "喜马拉雅山脉", dir: "弧形走向" }
  ];

  var PRECIP_STATIONS = [
    { name: "广州", pt: [503, 390], band: "1600 毫米以上", note: "东南沿海，降水丰沛" },
    { name: "武汉", pt: [513, 307], band: "约 1200 毫米", note: "长江中下游，降水较多" },
    { name: "北京", pt: [533, 204], band: "约 600 毫米", note: "华北平原，降水偏少" },
    { name: "兰州", pt: [418, 247], band: "约 300 毫米", note: "内陆，降水稀少" },
    { name: "乌鲁木齐", pt: [272, 161], band: "约 150 毫米", note: "深居内陆，降水很少" },
    { name: "吐鲁番", pt: [300, 200], band: "50 毫米以下", note: "塔里木盆地东缘，降水极少" }
  ];
  var PRECIP_LAW = "我国年降水量空间分布：从东南沿海向西北内陆递减；800 毫米等降水量线大致沿秦岭—淮河一线。";

  var DISASTERS = {
    typhoon: {
      name: "台风", path: [[660, 470], [630, 430], [600, 395], [570, 368], [548, 378]],
      from: "西北太平洋", when: "夏秋季节",
      note: "台风多生成于西北太平洋，夏秋季节登陆我国东南沿海，带来狂风暴雨。"
    },
    coldwave: {
      name: "寒潮", path: [[474, 93], [490, 160], [505, 230], [512, 300]],
      from: "蒙古—西伯利亚", when: "冬季",
      note: "寒潮源地为蒙古—西伯利亚，冬季南下影响我国大部，带来急剧降温、大风。"
    }
  };

  var YANGTZE = {
    name: "长江", source: "唐古拉山", mouth: "东海", length: "6300 余千米",
    bounds: [{ at: "宜昌", seg: "上游/中游分界" }, { at: "湖口", seg: "中游/下游分界" }],
    segs: [
      { id: "up", label: "上游（源头—宜昌）", feat: "落差大、峡谷多、水能资源丰富" },
      { id: "mid", label: "中游（宜昌—湖口）", feat: "支流多、曲流发育（荆江）、湖泊多" },
      { id: "low", label: "下游（湖口—入海口）", feat: "江阔水深、水流平稳" }
    ]
  };

  var YELLOW_RIVER = {
    name: "黄河", source: "巴颜喀拉山", mouth: "渤海", length: "5464 千米",
    segs: [
      { id: "up", label: "上游", feat: "落差大，水能资源丰富" },
      { id: "mid", label: "中游", feat: "流经黄土高原，水土流失严重，泥沙大增" },
      { id: "low", label: "下游", feat: "泥沙淤积，河床抬高，形成“地上河”" }
    ],
    aboveGround: "开封以下河段：泥沙淤积→河床不断抬高→河床高出两岸地面，形成“地上河”。"
  };

  var LANDUSE = [
    { id: "farm", name: "耕地", where: "东部季风区的平原地区",
      note: "东部平原：水田（南方）/旱地（北方），以秦岭—淮河为界",
      poly: [[500, 232], [560, 240], [580, 280], [570, 320], [545, 360], [515, 380], [495, 350], [488, 300], [492, 260]] },
    { id: "forest", name: "林地", where: "东北山区、西南横断山区",
      note: "大兴安岭、长白山、横断山区：森林集中分布",
      poly: [[575, 75], [650, 105], [645, 160], [595, 175], [568, 135]] },
    { id: "forest2", name: "林地", where: "横断山区", note: "西南林区",
      poly: [[350, 330], [410, 335], [405, 375], [355, 372]] },
    { id: "grass", name: "草地", where: "内蒙古高原、青藏高原",
      note: "内蒙古高原东部、青藏高原：草地广布",
      poly: [[380, 135], [480, 145], [475, 200], [385, 195]] },
    { id: "grass2", name: "草地", where: "青藏高原", note: "高寒草地",
      poly: [[220, 280], [330, 290], [325, 340], [230, 330]] },
    { id: "desert", name: "荒漠", where: "西北内陆盆地",
      note: "塔里木盆地、准噶尔盆地：降水稀少，多荒漠",
      poly: [[180, 240], [300, 240], [295, 295], [185, 295]] }
  ];

  var WATER_TRANSFER = [
    { id: "east", name: "东线", from: "长江下游扬州", to: "天津",
      status: "已建成通水", path: [[578, 300], [570, 270], [566, 250], [572, 235], [560, 225], [548, 218]],
      note: "东线：从长江下游扬州引水，沿京杭运河向北送水到天津。" },
    { id: "mid", name: "中线", from: "丹江口水库", to: "北京",
      status: "已建成通水", path: [[500, 300], [505, 275], [508, 250], [520, 230], [533, 210]],
      note: "中线：从丹江口水库引水，经河南、河北送水到北京。" },
    { id: "west", name: "西线", from: "长江上游", to: "黄河上游",
      status: "规划中（虚线表示）", dashed: true, path: [[400, 330], [408, 300], [415, 275], [418, 255]],
      note: "西线：从长江上游引水到黄河上游，目前处于规划论证阶段（图中用虚线表示，区别于已建成的东/中线）。" }
  ];

  var MARINE = [
    { id: "territorial", name: "领海", width: "12 海里",
      note: "领海：从领海基线量起 12 海里，国家主权及于其上空、海床和底土。" },
    { id: "contiguous", name: "毗连区", width: "24 海里",
      note: "毗连区：从领海基线量起 24 海里，可行使管制权。" },
    { id: "eez", name: "专属经济区", width: "200 海里",
      note: "专属经济区：从领海基线量起 200 海里，享有勘探开发自然资源的主权权利。" },
    { id: "shelf", name: "大陆架",
      note: "大陆架：陆地领土向海的自然延伸，我国主张 200 海里大陆架。" }
  ];

  window.GeoBatch5 = {
    FOUR_POINTS: FOUR_POINTS, FOUR_POINTS_SPAN: FOUR_POINTS_SPAN,
    HU_HUAN_YONG: HU_HUAN_YONG, FIVE_AUTONOMOUS: FIVE_AUTONOMOUS,
    TERRAIN_STEPS: TERRAIN_STEPS, TERRAIN_BOUNDS: TERRAIN_BOUNDS, MOUNTAINS: MOUNTAINS,
    PRECIP_STATIONS: PRECIP_STATIONS, PRECIP_LAW: PRECIP_LAW,
    DISASTERS: DISASTERS, YANGTZE: YANGTZE, YELLOW_RIVER: YELLOW_RIVER,
    LANDUSE: LANDUSE, WATER_TRANSFER: WATER_TRANSFER, MARINE: MARINE
  };

  /* ============================================================
   * 底图构建器：按资产 grade 渲染涉界要素
   * ============================================================ */
  var DECLARE_AB = "示意｜非精确比例｜界线画法依据人教版地理教材插图，非标准地图";
  var DECLARE_C = "示意｜非精确比例｜方向仅供参考";
  var DEFAULT_ASSET = {
    "position-switch": "cn-territory", "four-points": "cn-territory",
    "admin-puzzle": "cn-admin", "huhuan-yong": "cn-silhouette",
    "ethnic-match": "cn-admin", "terrain-3d": "cn-terrain",
    "precip": "cn-precip", "disaster-path": "cn-silhouette",
    "river-profile": "cn-silhouette", "yellow-river": "cn-silhouette",
    "landuse": "cn-landuse", "water-transfer": "cn-watertransfer",
    "marine": "cn-marine"
  };

  function resolveAsset(P) {
    var meta = (window.GEOGRAPHY_DATA || {}).schematicPathsMeta;
    if (!meta) return null;
    var a = (P && P.assetId && meta.byAssetId(P.assetId)) || null;
    if (!a && P && P.mode && DEFAULT_ASSET[P.mode]) a = meta.byAssetId(DEFAULT_ASSET[P.mode]);
    if (!a) a = meta.byAssetId("cn-territory");
    return a;
  }
  function declareText(P, asset) {
    var extra = (P && P.declare) ? String(P.declare) : "";
    /* admin-puzzle 缺省 shapeNote：各省形状经教学简化，相邻关系不变
     * （数据侧不再写 declare，由 widget 按资产 grade 自动渲染冻结文案） */
    if (!extra && P && P.mode === "admin-puzzle") extra = "各省形状经教学简化，相邻关系不变";
    var frozen = (asset && asset.grade === "C") ? DECLARE_C : DECLARE_AB;
    return (extra ? extra + "｜" : "") + frozen;
  }

  /* 视图外壳：标题 + 地图舞台 + 工具区 + readout + 角落小字 */
  function makeShell(box, P, asset, title) {
    var wrap = el("div", "geog-w2");
    wrap.appendChild(el("div", "geog-w2-head fs-105", esc(title || "地图")));
    var stage = el("div", "geog-w2-stage");
    stage.style.position = "relative";
    var svg = svgEl("svg", { viewBox: "0 0 800 640", width: "100%", role: "img",
      "aria-label": (asset ? asset.mapTitle : "地图") + "（教学示意图）" });
    stage.appendChild(svg);
    /* 角落小字：不可关闭（无关闭控件，pointer-events:none）；
       定位用内联样式，不依赖外部 CSS 新增类 */
    var dc = el("div", "geog-map-declare fs-078", esc(declareText(P, asset)));
    dc.setAttribute("aria-label", "图例声明");
    dc.style.cssText = "position:absolute;right:8px;bottom:8px;max-width:72%;" +
      "text-align:right;pointer-events:none;opacity:0.85;" +
      "background:rgba(255,255,255,0.72);padding:2px 6px;border-radius:4px;";
    stage.appendChild(dc);
    wrap.appendChild(stage);
    var tools = el("div", "geog-w2-row");
    wrap.appendChild(tools);
    var readout = el("div", "geog-w2-readout fs-095");
    wrap.appendChild(readout);
    box.appendChild(wrap);
    return { wrap: wrap, stage: stage, svg: svg, tools: tools, readout: readout,
      say: function (t) { readout.textContent = t; } };
  }

  function polyPath(pts) {
    return "M" + pts.map(function (p) { return p[0] + "," + p[1]; }).join(" L") + " Z";
  }

  /* 底图绘制
   * opts: {provinces:'all'|'none', provinceFill(fn)->color|string,
   *   onProvinceClick(id, evt), labels:'all'|'none'|ids[],
   *   highlight:[ids], dimOthers:bool, noBoundary:bool(内部用) } */
  function drawBaseMap(svg, asset, opts) {
    opts = opts || {};
    var paths = asset.paths, meta = window.GEOGRAPHY_DATA.schematicPathsMeta;
    var ink = cssVar("--geog-ink", "#1a1a1a");
    var soft = cssVar("--geog-ink-soft", "#5a5a5a");
    var accent = cssVar("--geog-accent", "#2a7de1");
    var landFill = cssVar("--geog-land", "#f3e9d2");
    var seaFill = cssVar("--geog-sea", "#dcebf7");
    var grade = asset.grade;
    var isC = (grade === "C");

    /* 海洋底 */
    svg.appendChild(svgEl("rect", { x: 0, y: 0, width: 800, height: 640, fill: seaFill, opacity: 0.55 }));
    /* 底层叠加（如 marine 的海域带）：画在海底之上、陆地之下 */
    if (typeof opts.underlay === "function") opts.underlay(svg, { ink: ink, soft: soft, accent: accent });

    var g = svgEl("g", { "class": "geog-base" });
    svg.appendChild(g);

    /* GEO-RULING-2026-10-20-11 裁定 3 S2/S4/S5 + -12 返工 R1/R2/R5：受裁注记共用校准函数
       （由基线钓鱼岛单注记 IIFE 泛化，钓鱼岛行为逐项等价）：
       cssPx = Math.max(12.5, Math.min(36, 12.48/s))，s=svg.getScreenCTM().a，
       结果保留两位小数，回退 12.5；rAF + resize 重算，CTM 无效保持回退，
       节点脱离文档后监听自解绑。S4：下方注记 dy=max(0, 1.0*cssPx-净空)
       （k=1.0；桌面 cssPx=12.5 时 dy 为中沙/南沙/曾母 +1.5、海南省 +0.5、
       台湾省 0，即 -12 裁决 5 接受的桌面回归基线）。曾母一注 dy 另封顶 12.4
       （-12 裁决 2 定点例外）。S5：簇避让落点偏移 dx/dy5 随
       f=(cssPx-12.5)/19.09 同步伸缩（桌面 f=0 落点与基线一致、引线隐形）。 */
    var adaptiveEntries = [], adaptiveLeaders = [];
    function regAdaptive(el, baseX, baseY, dx, dy5, clearance, dyCap) {
      var en = { el: el, baseX: baseX, baseY: baseY, dx: dx, dy5: dy5,
        clearance: (clearance == null ? null : clearance),
        dyCap: (dyCap == null ? null : dyCap), curX: baseX, curY: baseY };
      adaptiveEntries.push(en); return en;
    }
    function regLeader(x1, y1, entry, relX, relY, bends) {
      /* bends（可选，逻辑坐标折点列）：仅西沙引线按 GEO-RULING-2026-10-20-12c
         改多折点折线时传入，元素改用 polyline；其余引线行为不变。 */
      var ln;
      if (bends && bends.length) {
        ln = svgEl("polyline", { points: "", fill: "none",
          stroke: soft, "stroke-width": 1, opacity: 0 });
      } else {
        ln = svgEl("line", { x1: x1, y1: y1, x2: x1, y2: y1,
          stroke: soft, "stroke-width": 1, opacity: 0 });
      }
      g.insertBefore(ln, entry.el);
      adaptiveLeaders.push({ line: ln, x1: x1, y1: y1, entry: entry, relX: relX, relY: relY,
        bends: (bends && bends.length) ? bends : null });
    }
    function calibrateAdaptive() {
      if (!svg.isConnected) { window.removeEventListener("resize", calibrateAdaptive); return; }
      var ctm = null;
      try { ctm = svg.getScreenCTM(); } catch (e) { ctm = null; }
      var s = ctm && ctm.a > 0 ? ctm.a : 0;
      if (!(s > 0)) return; /* 尚未入 DOM：保持回退值，待 rAF/resize 重算 */
      var cssPx = Math.max(12.5, Math.min(36, 12.48 / s));
      var fs = String(Math.round(cssPx * 100) / 100);
      var f = Math.max(0, Math.min(1, (cssPx - 12.5) / 19.09));
      adaptiveEntries.forEach(function (en) {
        en.el.setAttribute("font-size", fs);
        var dy4 = en.clearance != null ? Math.max(0, cssPx - en.clearance) : 0;
        if (en.dyCap != null) dy4 = Math.min(dy4, en.dyCap);
        en.curX = en.baseX + en.dx * f;
        en.curY = en.baseY + dy4 + en.dy5 * f;
        en.el.setAttribute("x", String(Math.round(en.curX * 100) / 100));
        en.el.setAttribute("y", String(Math.round(en.curY * 100) / 100));
      });
      adaptiveLeaders.forEach(function (L) {
        var ex = Math.round((L.entry.curX + L.relX) * 100) / 100;
        var ey = Math.round((L.entry.curY + L.relY) * 100) / 100;
        if (L.bends) {
          var pts = [[L.x1, L.y1]].concat(L.bends, [[ex, ey]]);
          L.line.setAttribute("points", pts.map(function (p) { return p[0] + "," + p[1]; }).join(" "));
        } else {
          L.line.setAttribute("x2", String(ex));
          L.line.setAttribute("y2", String(ey));
        }
        L.line.setAttribute("opacity", f > 0.02 ? "1" : "0");
      });
    }
    function armAdaptive() {
      calibrateAdaptive();
      if (typeof requestAnimationFrame === "function") requestAnimationFrame(calibrateAdaptive);
      window.addEventListener("resize", calibrateAdaptive);
    }

    if (isC) {
      /* C 级剪影：装饰性轮廓，不画国界线/省界/十段线；台湾岛不可缺。
       * 剪影 = 陆上边境线（丹东→东兴） + 海岸线（顺序：东兴→丹东）
       * 围合的大陆部分，南海海域保持海色，不作陆地染色。
       * 注意：coast 必须按原顺序拼接；若逆序会从丹东直线切回东兴，
       * 把渤海/黄海/东海围进陆地多边形（2026-10-17 修）。 */
      var cpts = paths.coast.replace(/^M/, "").split(/ L/).map(function (s) { return s.trim(); });
      var sil = svgEl("path", {
        d: paths.nationalLand + " L" + cpts.join(" L") + " Z",
        fill: landFill, stroke: soft, "stroke-width": 1.2, opacity: 0.9
      });
      g.appendChild(sil);
      var tw = meta.provinceById("tw"), hi = meta.provinceById("hi");
      g.appendChild(svgEl("path", { d: tw.path, fill: landFill, stroke: soft, "stroke-width": 1.2 }));
      g.appendChild(svgEl("path", { d: hi.path, fill: landFill, stroke: soft, "stroke-width": 1.2 }));
      var twt = svgEl("text", { x: tw.labelPt[0], y: tw.labelPt[1], "text-anchor": "middle",
        fill: soft, "font-size": "12.5", "data-adaptive-label": "tw-island" });
      twt.textContent = "台湾岛"; g.appendChild(twt);
      regAdaptive(twt, tw.labelPt[0], tw.labelPt[1], 0, 0, null);
      armAdaptive();
      return { g: g, ink: ink, soft: soft, accent: accent, landFill: landFill, seaFill: seaFill };
    }

    /* A/B 级：固线国界（陆上段 + 东海段） */
    g.appendChild(svgEl("path", { d: paths.nationalLand, fill: "none",
      stroke: "#c0392b", "stroke-width": 2.2, "stroke-linejoin": "round" }));
    g.appendChild(svgEl("path", { d: paths.nationalSeaEast, fill: "none",
      stroke: "#c0392b", "stroke-width": 2.2, "stroke-linejoin": "round" }));
    /* 海岸线（装饰细线） */
    g.appendChild(svgEl("path", { d: paths.coast, fill: "none",
      stroke: soft, "stroke-width": 1, opacity: 0.6 }));
    /* 十段线（断续，加粗，10 段） */
    var dg = svgEl("g", { stroke: "#c0392b", "stroke-width": 3.4, "stroke-linecap": "round" });
    paths.tenDash.forEach(function (d) {
      dg.appendChild(svgEl("path", { d: d, fill: "none" }));
    });
    g.appendChild(dg);

    /* 省级单元 */
    var showProv = opts.provinces !== "none";
    var hl = {}; (opts.highlight || []).forEach(function (id) { hl[id] = true; });
    if (showProv) {
      var pg = svgEl("g", { "class": "geog-provinces" });
      meta.provinces.forEach(function (p) {
        if (p.shapeKind === "point") return; /* 港澳为符号点，另行绘制 */
        var fill = landFill;
        if (typeof opts.provinceFill === "function") fill = opts.provinceFill(p) || landFill;
        else if (typeof opts.provinceFill === "string") fill = opts.provinceFill;
        /* 台湾岛与大陆同色系（B.4）：不单独变色 */
        var elp = svgEl("path", { d: p.path, fill: fill,
          stroke: soft, "stroke-width": 1,
          opacity: (opts.dimOthers && opts.highlight && opts.highlight.length && !hl[p.id]) ? 0.35 : 1,
          "data-prov": p.id });
        if (hl[p.id]) { elp.setAttribute("stroke", accent); elp.setAttribute("stroke-width", "2.6"); }
        if (opts.onProvinceClick) {
          elp.style.cursor = "pointer";
          elp.setAttribute("tabindex", "0");
          elp.setAttribute("role", "button");
          elp.setAttribute("aria-label", p.name);
          (function (id) {
            elp.addEventListener("click", function (e) { opts.onProvinceClick(id, e); });
            elp.addEventListener("keydown", function (e) {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); opts.onProvinceClick(id, e); }
            });
          })(p.id);
        }
        pg.appendChild(elp);
      });
      g.appendChild(pg);
    }

    /* 南海四群岛符号（缺一不可，B.2） */
    var isl = paths.islands;
    /* -12 R3/R4：东沙北移脱固线；西沙/中沙/南沙扇出至东侧空水面列（x=720）
       整体北移退出声明框覆盖带（390px 最严页 dg08.1.3 声明顶边 y≈448.5）。 */
    var ISL_ADAPT = {
      dongsha:  { dx: -130.4, dy5: -105,   clr: null, leader: [532, 413, 0.4, 10.1] },
      /* 西沙引线按 GEO-RULING-2026-10-20-12c 改两折点折线（中通道）：
         (493,461)→(588,424)→(620,304)→注记端，两端点不变。 */
      xisha:    { dx: 222,    dy5: -152,   clr: null, leader: [493, 461, -71, 10.1],
                  leaderBends: [[588, 424], [620, 304]] },
      zhongsha: { dx: 208,    dy5: -280.6, clr: 11,   leader: [515, 487, -71, 10.1] },
      nansha:   { dx: 218,    dy5: -228.6, clr: 11,   leader: [502, 535, -71, 10.1] }
    };
    ["dongsha", "xisha", "zhongsha", "nansha"].forEach(function (k) {
      var o = isl[k], ad = ISL_ADAPT[k];
      g.appendChild(svgEl("circle", { cx: o.point[0], cy: o.point[1], r: 5,
        fill: "#ffffff", stroke: "#c0392b", "stroke-width": 1.8 }));
      var t = svgEl("text", { x: o.labelPt[0], y: o.labelPt[1], "text-anchor": "middle",
        fill: ink, "font-size": "12.5", "data-adaptive-label": k });
      t.textContent = o.label; g.appendChild(t);
      var en = regAdaptive(t, o.labelPt[0], o.labelPt[1], ad.dx, ad.dy5, ad.clr);
      if (ad.leader) regLeader(ad.leader[0], ad.leader[1], en, ad.leader[2], ad.leader[3], ad.leaderBends);
    });
    /* 曾母暗沙（环礁符号） */
    var zm = isl.zengmu;
    g.appendChild(svgEl("circle", { cx: zm.point[0], cy: zm.point[1], r: 7,
      fill: "none", stroke: "#c0392b", "stroke-width": 1.8, "stroke-dasharray": "3,2" }));
    /* -12 裁决 4 桌面定点例外（S7 例外仅此一处）：曾母基线落点北移 16
       （labelPt y 616→600），使桌面渲染框与声明框交叠归零；390px 再经
       dx/dy5 扇出至东侧水面列，dy 封顶 12.4（-12 裁决 2）。 */
    var zmBaseY = zm.labelPt[1] - 16;
    var zmt = svgEl("text", { x: zm.labelPt[0], y: zmBaseY, "text-anchor": "middle",
      fill: ink, "font-size": "12.5", "data-adaptive-label": "zengmu" });
    zmt.textContent = zm.label; g.appendChild(zmt);
    var zmen = regAdaptive(zmt, zm.labelPt[0], zmBaseY, 222, -222.4, 11, 12.4);
    regLeader(505, 598, zmen, 0, 10);

    /* 钓鱼岛点位 + 注记（B.5，小比例尺圆点+引线注记） */
    var dy = paths.diaoyu;
    g.appendChild(svgEl("circle", { cx: dy.point[0], cy: dy.point[1], r: 4.5, fill: "#c0392b" }));
    g.appendChild(svgEl("line", { x1: dy.point[0] - 3, y1: dy.point[1] - 3,
      x2: dy.labelPt[0] + 34, y2: dy.labelPt[1] + 4, stroke: soft, "stroke-width": 1 }));
    var dyt = svgEl("text", { x: dy.labelPt[0], y: dy.labelPt[1], "text-anchor": "end",
      fill: ink, "font-size": "12.5", "data-diaoyu-label": "1" });
    dyt.textContent = dy.label; g.appendChild(dyt);
    regAdaptive(dyt, dy.labelPt[0], dy.labelPt[1], 0, 0, null);
    /* 钓鱼岛校准已并入上方共用校准函数（GEO-RULING-2026-10-20-11 裁定 3 S2 泛化，行为等价）。 */

    /* 港澳符号点 + 注记（B.7） */
    paths.hkmo.forEach(function (o) {
      g.appendChild(svgEl("circle", { cx: o.point[0], cy: o.point[1], r: 4,
        fill: accent, stroke: "#ffffff", "stroke-width": 1.4 }));
      /* 澳门注记与东沙群岛注记避让：labelPt 微移（F7 只移了香港）；
       * 派生表文件不在本批修改范围内，故偏移落在渲染器 */
      var lx = o.labelPt[0], ly = o.labelPt[1];
      if (o.label === "澳门") { lx -= 20; ly += 6; }
      var isHK = (o.label === "香港");
      var t = svgEl("text", { x: lx, y: ly,
        "text-anchor": isHK ? "start" : "end", fill: ink, "font-size": "12.5",
        "data-adaptive-label": isHK ? "hk" : "mo" });
      t.textContent = o.label; g.appendChild(t);
      if (isHK) {
        var hken = regAdaptive(t, lx, ly, -247, -4, null);
        regLeader(507, 396, hken, 64.5, -5);
      } else {
        var moen = regAdaptive(t, lx, ly, -173, -36, null);
        regLeader(502, 402, moen, 2, 9);
      }
    });

    /* 台湾省 / 海南省注记：A/B 级常驻（B.4 台湾岛注记不可缺） */
    [["tw", "台湾省"], ["hi", "海南省"]].forEach(function (ll) {
      var pp = meta.provinceById(ll[0]);
      var isTW = (ll[0] === "tw");
      var t = svgEl("text", { x: pp.labelPt[0], y: pp.labelPt[1], "text-anchor": "middle",
        fill: ink, "font-size": "12.5", "font-weight": "bold",
        "data-adaptive-label": isTW ? "tw-province" : "hi-province" });
      t.textContent = ll[1]; g.appendChild(t);
      if (isTW) {
        var twen = regAdaptive(t, pp.labelPt[0], pp.labelPt[1], -182, 0, 14);
        regLeader(461, 432, twen, 49.5, -5.59);
      } else {
        var hien = regAdaptive(t, pp.labelPt[0], pp.labelPt[1], -218, -36.6, 12);
        regLeader(460, 449, hien, 47.4, 13.6);
      }
    });

    /* 省名注记 */
    var labelMode = opts.labels || "none";
    if (labelMode !== "none") {
      meta.provinces.forEach(function (p) {
        if (p.shapeKind === "point") return;
        var show = (labelMode === "all") ||
          (Object.prototype.toString.call(labelMode) === "[object Array]" && labelMode.indexOf(p.id) >= 0);
        if (!show) return;
        var t = svgEl("text", { x: p.labelPt[0], y: p.labelPt[1], "text-anchor": "middle",
          fill: soft, "font-size": "12.5", "data-label-prov": p.id });
        t.textContent = p.name.replace(/省|自治区|特别行政区|市/g, "") || p.name;
        g.appendChild(t);
      });
    }
    armAdaptive();
    return { g: g, ink: ink, soft: soft, accent: accent, landFill: landFill, seaFill: seaFill };
  }

  /* 视图收尾：挂载 truth/state/destroy */
  function finishView(shell, P, asset, extra) {
    var view = {
      resize: function () {},
      destroy: function () { untrack(view); },
      truth: function () {
        return { assetId: asset.assetId, grade: asset.grade, mapTitle: asset.mapTitle,
          mode: P.mode, declare: declareText(P, asset),
          signoff: asset.signoff, ruling: "GEO-RULING-2026-10-17-08" };
      },
      state: function () { return extra && extra.state ? extra.state() : { mode: P.mode }; },
      labelFonts: function () { return []; },
      _extra: extra || {}
    };
    if (extra && extra.setState) view._setState = extra.setState;
    track(view);
    return view;
  }

  /* ============================================================
   * mode 1：position-switch（dg08.1.1 半球/纬度/海陆三模式切换）
   * ============================================================ */
  function PositionSwitchView(box, P, asset) {
    var shell = makeShell(box, P, asset, "中国的地理位置");
    var ctx = drawBaseMap(shell.svg, asset, { provinces: "all", labels: ["bj", "gd", "xj", "hl"] });
    var overlay = svgEl("g", {}); shell.svg.appendChild(overlay);
    var tab = "hemisphere";
    var TRUTH = {
      hemisphere: { text: "从东西半球看，我国位于东半球；从南北半球看，位于北半球。" },
      latitude: { text: "我国南北跨纬度约 49°，大部分位于北温带，南部少数地区位于热带，没有寒带。" },
      maritime: { text: "我国海陆兼备：东部濒临太平洋，西部深入亚欧大陆内部。" }
    };
    function yOfLat(lat) { return 60 + (53 - lat) * 11.02; }
    function render() {
      overlay.innerHTML = "";
      if (tab === "hemisphere") {
        /* 赤道（南）与本初子午线（西）参照线 */
        overlay.appendChild(svgEl("line", { x1: 60, y1: yOfLat(0), x2: 740, y2: yOfLat(0),
          stroke: ctx.soft, "stroke-width": 1.4, "stroke-dasharray": "8,5" }));
        var t1 = svgEl("text", { x: 730, y: yOfLat(0) - 8, "text-anchor": "end", fill: ctx.soft, "font-size": "12.5" });
        t1.textContent = "赤道（0°）"; overlay.appendChild(t1);
        overlay.appendChild(svgEl("line", { x1: 90, y1: 40, x2: 90, y2: 620,
          stroke: ctx.soft, "stroke-width": 1.4, "stroke-dasharray": "8,5" }));
        var t2 = svgEl("text", { x: 96, y: 56, fill: ctx.soft, "font-size": "12.5" });
        t2.textContent = "本初子午线（0°）"; overlay.appendChild(t2);
        var b = svgEl("text", { x: 400, y: 620, "text-anchor": "middle", fill: ctx.accent, "font-size": "15.2", "font-weight": "bold" });
        b.textContent = "北半球 · 东半球"; overlay.appendChild(b);
        shell.say(TRUTH.hemisphere.text);
      } else if (tab === "latitude") {
        /* 北回归线 + 五带 shading */
        var yTropic = yOfLat(23.5);
        var band = svgEl("rect", { x: 60, y: yTropic, width: 680, height: 620 - yTropic,
          fill: "#f2b134", opacity: 0.18 });
        overlay.appendChild(band);
        overlay.appendChild(svgEl("line", { x1: 60, y1: yTropic, x2: 740, y2: yTropic,
          stroke: "#c0392b", "stroke-width": 1.6, "stroke-dasharray": "8,5" }));
        var t = svgEl("text", { x: 730, y: yTropic - 8, "text-anchor": "end", fill: "#c0392b", "font-size": "12.5" });
        t.textContent = "北回归线（23.5°N）"; overlay.appendChild(t);
        var b2 = svgEl("text", { x: 400, y: 620, "text-anchor": "middle", fill: ctx.accent, "font-size": "15.2", "font-weight": "bold" });
        b2.textContent = "大部分属北温带 · 南部少数地区属热带 · 无寒带"; overlay.appendChild(b2);
        shell.say(TRUTH.latitude.text);
      } else {
        /* 海陆：海岸线加粗 + 方位注记 */
        overlay.appendChild(svgEl("path", { d: asset.paths.coast, fill: "none",
          stroke: ctx.accent, "stroke-width": 4, opacity: 0.7 }));
        var e = svgEl("text", { x: 700, y: 300, "text-anchor": "middle", fill: ctx.accent, "font-size": "15.2", "font-weight": "bold" });
        e.textContent = "东临太平洋 →"; overlay.appendChild(e);
        var w = svgEl("text", { x: 120, y: 300, "text-anchor": "middle", fill: ctx.accent, "font-size": "15.2", "font-weight": "bold" });
        w.textContent = "← 西部深入亚欧大陆内部"; overlay.appendChild(w);
        shell.say(TRUTH.maritime.text);
      }
    }
    [["hemisphere", "半球位置"], ["latitude", "纬度位置"], ["maritime", "海陆位置"]].forEach(function (tb) {
      var b = el("button", "geog-btn fs-085", tb[1]);
      b.style.minHeight = "44px";
      b.addEventListener("click", function () {
        tab = tb[0];
        Array.prototype.forEach.call(shell.tools.querySelectorAll("button"), function (x) {
          x.classList.remove("geog-btn-primary");
        });
        b.classList.add("geog-btn-primary");
        render();
        store(P.recordKey || "geog_position-switch", { tab: tab, ts: Date.now() });
      });
      if (tb[0] === tab) b.classList.add("geog-btn-primary");
      shell.tools.appendChild(b);
    });
    render();
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, tab: tab }; },
      setState: function (s) { if (s && s.tab) { tab = s.tab; render(); } }
    });
  }

  /* ============================================================
   * mode 2：four-points（dg08.1.2 四至点点击）
   * ============================================================ */
  function FourPointsView(box, P, asset) {
    var shell = makeShell(box, P, asset, "中国的疆域四至");
    var ctx = drawBaseMap(shell.svg, asset, { provinces: "all", labels: "none" });
    var selected = null;
    FOUR_POINTS.forEach(function (fp) {
      var c = svgEl("circle", { cx: fp.pt[0], cy: fp.pt[1], r: 14,
        fill: ctx.accent, opacity: 0.25, "data-fp": fp.id,
        style: "cursor:pointer" });
      var dot = svgEl("circle", { cx: fp.pt[0], cy: fp.pt[1], r: 5.5, fill: "#c0392b",
        style: "cursor:pointer", "data-fp": fp.id });
      var t = svgEl("text", { x: fp.pt[0], y: fp.pt[1] - 20, "text-anchor": "middle",
        fill: ctx.ink, "font-size": "13.6", "font-weight": "bold", style: "cursor:pointer",
        "data-fp": fp.id });
      t.textContent = fp.label;
      [c, dot, t].forEach(function (n) {
        n.addEventListener("click", function () {
          selected = fp.id;
          shell.say(fp.label + "：" + fp.name + "（" + fp.coord + "）。" + fp.near + "。" + FOUR_POINTS_SPAN);
          store(P.recordKey || "geog_four-points", { selected: fp.id, ts: Date.now() });
        });
        shell.svg.appendChild(n);
      });
    });
    shell.say("点一点四个端点，看看我国疆域的四至点在哪里、经纬度是多少。");
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, selected: selected }; }
    });
  }

  /* ============================================================
   * mode 3：admin-puzzle（dg08.1.3 34 省三配对闯关）
   * 形状+简称+行政中心三配对；declare 缺省「形状经简化，相邻关系不变」
   * ============================================================ */
  function AdminPuzzleView(box, P, asset) {
    var shell = makeShell(box, P, asset, "省级行政区拼图闯关");
    var meta = window.GEOGRAPHY_DATA.schematicPathsMeta;
    var labelsOn = false;
    var labelG = null;
    var ctx = drawBaseMap(shell.svg, asset, {
      provinces: "all", labels: "none",
      onProvinceClick: function (id) { answer(id); }
    });
    /* 省名注记层（默认隐藏，闯关用；可手动打开对照） */
    function paintLabels() {
      if (labelG) labelG.parentNode.removeChild(labelG);
      labelG = svgEl("g", {});
      if (labelsOn) {
        meta.provinces.forEach(function (p) {
          if (p.shapeKind === "point") return;
          var t = svgEl("text", { x: p.labelPt[0], y: p.labelPt[1], "text-anchor": "middle",
            fill: ctx.soft, "font-size": "12.5" });
          t.textContent = p.name.replace(/省|自治区|特别行政区|市/g, "");
          labelG.appendChild(t);
        });
      }
      shell.svg.appendChild(labelG);
    }
    paintLabels();
    var tg = el("button", "geog-btn fs-085", "显示省名");
    tg.style.minHeight = "44px";
    tg.addEventListener("click", function () {
      labelsOn = !labelsOn;
      tg.textContent = labelsOn ? "隐藏省名" : "显示省名";
      paintLabels();
    });
    shell.tools.appendChild(tg);

    var ROUNDS = 8, qi = 0, score = 0, order = [], cur = null;
    function pickOrder() {
      var pool = meta.provinces.filter(function (p) { return p.shapeKind !== "point"; })
        .map(function (p) { return p.id; });
      /* 确定性洗牌（避免每次进页题目乱跳；不依赖外部随机源） */
      var seed = 20261017;
      for (var i = pool.length - 1; i > 0; i--) {
        seed = (seed * 1103515245 + 12345) & 0x7fffffff;
        var j = seed % (i + 1);
        var tmp = pool[i]; pool[i] = pool[j]; pool[j] = tmp;
      }
      return pool.slice(0, ROUNDS);
    }
    function promptFor(p, k) {
      if (k % 3 === 0) return { text: "第 " + (qi + 1) + " 题：点出简称是「" + p.abbr + "」的省级行政区", want: p.id };
      if (k % 3 === 1) return { text: "第 " + (qi + 1) + " 题：「" + p.capital + "」是哪个省级行政区的行政中心？点出来", want: p.id };
      return { text: "第 " + (qi + 1) + " 题：点出「" + p.name + "」", want: p.id };
    }
    function nextQ() {
      if (qi >= ROUNDS) {
        shell.say("🎉 闯关完成！答对 " + score + " / " + ROUNDS + " 题。" +
          (score === ROUNDS ? "34 个省级行政区全部拿下！" : "再对照省名看看错在哪，下次一定行。"));
        store((P.recordKey || "geog_admin-puzzle"), { score: score, total: ROUNDS, ts: Date.now() });
        return;
      }
      if (!order.length) order = pickOrder();
      var p = meta.provinceById(order[qi]);
      cur = promptFor(p, qi);
      shell.say(cur.text + "（已答对 " + score + " 题）");
    }
    function answer(id) {
      if (qi >= ROUNDS || !cur) return;
      var p = meta.provinceById(id);
      if (id === cur.want) {
        score++;
        shell.say("✓ 答对！" + p.name + "（简称" + p.abbr + "，行政中心" + p.capital + "）。");
      } else {
        shell.say("✗ 点到的是" + p.name + "，再想想——看看简称和行政中心对不对得上。（不扣分）");
        return; /* 答错不推进，可继续点 */
      }
      qi++;
      store((P.recordKey || "geog_admin-puzzle") + "-r" + qi, { want: cur.want, ok: true, ts: Date.now() });
      nextQ();
    }
    nextQ();
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, round: qi, score: score, total: ROUNDS }; }
    });
  }

  /* ============================================================
   * mode 4：huhuan-yong（dg08.2.1 胡焕庸线两侧对比，C 级剪影）
   * ============================================================ */
  function HuhuanYongView(box, P, asset) {
    var shell = makeShell(box, P, asset, "胡焕庸线：人口分布的分界线");
    var ctx = drawBaseMap(shell.svg, asset, {});
    var H = HU_HUAN_YONG;
    /* 两侧可点区域（示意多边形） */
    var sePoly = [[632, 91], [370, 368], [430, 430], [560, 430], [650, 380], [660, 250], [660, 120]];
    var nwPoly = [[632, 91], [370, 368], [300, 400], [180, 380], [140, 300], [200, 200], [350, 120], [550, 80]];
    function sidePoly(pts, fill, key) {
      var pg = svgEl("polygon", { points: pts.map(function (p) { return p.join(","); }).join(" "),
        fill: fill, opacity: 0.22, style: "cursor:pointer" });
      pg.addEventListener("click", function () {
        var s = H[key];
        shell.say(s.label + "（胡焕庸线" + (key === "se" ? "东南" : "西北") + "侧）：" +
          s.area + "，" + s.pop + "——" + s.note + "。");
        store(P.recordKey || "geog_huhuan-yong", { side: key, ts: Date.now() });
      });
      shell.svg.appendChild(pg);
    }
    sidePoly(nwPoly, ctx.accent, "nw");
    sidePoly(sePoly, "#e67e22", "se");
    /* 胡焕庸线 */
    shell.svg.appendChild(svgEl("line", { x1: H.line[0][0], y1: H.line[0][1], x2: H.line[1][0], y2: H.line[1][1],
      stroke: "#c0392b", "stroke-width": 3, "stroke-dasharray": "10,6" }));
    var t1 = svgEl("text", { x: H.line[0][0] + 8, y: H.line[0][1] - 8, fill: "#c0392b", "font-size": "13.6", "font-weight": "bold" });
    t1.textContent = H.from; shell.svg.appendChild(t1);
    var t2 = svgEl("text", { x: H.line[1][0] - 52, y: H.line[1][1] + 20, fill: "#c0392b", "font-size": "13.6", "font-weight": "bold" });
    t2.textContent = H.to; shell.svg.appendChild(t2);
    var tl = svgEl("text", { x: 500, y: 220, "text-anchor": "middle", fill: "#c0392b", "font-size": "13.6", "font-weight": "bold" });
    tl.textContent = "胡焕庸线"; shell.svg.appendChild(tl);
    shell.say("点一点线的两侧：同样是中国，人口密度为什么差这么多？");
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode }; }
    });
  }

  /* ============================================================
   * mode 5：ethnic-match（dg08.2.2 五大自治区对号入座）
   * ============================================================ */
  function EthnicMatchView(box, P, asset) {
    var shell = makeShell(box, P, asset, "五大自治区对号入座");
    var meta = window.GEOGRAPHY_DATA.schematicPathsMeta;
    var ctx = drawBaseMap(shell.svg, asset, {
      provinces: "all", labels: "none",
      onProvinceClick: function (id) { answer(id); }
    });
    var qi = 0, score = 0, cur = null;
    function nextQ() {
      if (qi >= FIVE_AUTONOMOUS.length) {
        shell.say("🎉 对号入座完成！答对 " + score + " / " + FIVE_AUTONOMOUS.length + "。" +
          "我国共有 5 个自治区，实行民族区域自治。");
        store((P.recordKey || "geog_ethnic-match"), { score: score, total: FIVE_AUTONOMOUS.length, ts: Date.now() });
        return;
      }
      cur = FIVE_AUTONOMOUS[qi];
      var prov = meta.provinceById(cur.id);
      shell.say("第 " + (qi + 1) + " 题：「" + cur.name + "」的主要少数民族是" + cur.ethnic +
        "，行政中心是" + prov.capital + "——在图上点出它。");
    }
    function answer(id) {
      if (qi >= FIVE_AUTONOMOUS.length || !cur) return;
      var prov = meta.provinceById(id);
      if (id === cur.id) {
        score++;
        shell.say("✓ 答对！" + cur.name + "（" + cur.ethnic + "聚居，行政中心" + prov.capital + "）。");
        qi++; nextQ();
      } else {
        shell.say("✗ 这是" + prov.name + "。想想" + cur.ethnic + "主要分布在祖国的哪一方？（不扣分）");
      }
    }
    nextQ();
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, round: qi, score: score, total: FIVE_AUTONOMOUS.length }; }
    });
  }

  /* ============================================================
   * mode 6：terrain-3d（dg09.1.1 三级阶梯剖面动画 + 山脉走向）
   * B 级底图 + 西→东示意剖面；山脉点可点读走向
   * ============================================================ */
  function Terrain3DView(box, P, asset) {
    var wrap = el("div", "geog-w2");
    wrap.appendChild(el("div", "geog-w2-head fs-105", esc("三级阶梯与山脉走向")));
    box.appendChild(wrap);
    /* 上：B 级底图（小）——挂载进 wrap，位于标题之后 */
    var shell = makeShell(wrap, P, asset, "");
    shell.wrap.querySelector(".geog-w2-head").style.display = "none";
    drawBaseMap(shell.svg, asset, { provinces: "all", labels: "none" });
    /* 下：剖面 SVG */
    var prof = el("div", "geog-w2-stage");
    var svg = svgEl("svg", { viewBox: "0 0 420 240", width: "100%", role: "img",
      "aria-label": "中国地形三级阶梯西—东示意剖面" });
    prof.appendChild(svg);
    var dc = el("div", "geog-map-declare fs-078",
      esc("剖面为教学示意，高程只看趋势不记数值｜" + declareText(P, asset)));
    dc.style.cssText = "position:absolute;right:8px;bottom:8px;max-width:72%;" +
      "text-align:right;pointer-events:none;opacity:0.85;" +
      "background:rgba(255,255,255,0.72);padding:2px 6px;border-radius:4px;";
    prof.style.position = "relative";
    prof.appendChild(dc);
    wrap.appendChild(prof);
    var readout = el("div", "geog-w2-readout fs-095");
    wrap.appendChild(readout);
    function say(t) { readout.textContent = t; }

    var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#5a5a5a"),
        accent = cssVar("--geog-accent", "#2a7de1");
    /* 阶梯色带 */
    [["第一级阶梯", 0, 130, "#c98a4b"], ["第二级阶梯", 130, 250, "#e8d44f"], ["第三级阶梯", 250, 420, "#8fce6e"]]
      .forEach(function (b) {
        svg.appendChild(svgEl("rect", { x: b[1], y: 30, width: b[2] - b[1], height: 170, fill: b[3], opacity: 0.35 }));
        var t = svgEl("text", { x: (b[1] + b[2]) / 2, y: 24, "text-anchor": "middle", fill: soft, "font-size": "12.5" });
        t.textContent = b[0]; svg.appendChild(t);
      });
    /* 剖面线（西→东）：青藏高原→横断山→四川盆地→巫山→长江中下游平原→东海 */
    var line = svgEl("polyline", {
      points: "0,70 60,66 95,95 120,120 150,150 175,148 195,120 215,128 250,155 300,162 360,168 420,172",
      fill: "none", stroke: ink, "stroke-width": 3, "stroke-linejoin": "round" });
    svg.appendChild(line);
    var sea = svgEl("rect", { x: 392, y: 172, width: 28, height: 28, fill: "#9fc5e8", opacity: 0.7 });
    svg.appendChild(sea);
    var st = svgEl("text", { x: 406, y: 216, "text-anchor": "middle", fill: soft, "font-size": "12.5" });
    st.textContent = "东海"; svg.appendChild(st);
    [["青藏高原\n4000m+", 45, 56], ["四川盆地", 162, 140], ["长江中下游平原", 305, 152]].forEach(function (lb) {
      lb[0].split("\n").forEach(function (ln, i) {
        var t = svgEl("text", { x: lb[1], y: lb[2] + i * 14, "text-anchor": "middle", fill: soft, "font-size": "12.5" });
        t.textContent = ln; svg.appendChild(t);
      });
    });
    /* 山脉描画点（可点读走向） */
    var played = false, selMountain = null;
    var mpts = [
      { x: 95, y: 95, name: "横断山脉", dir: "南北走向", note: "第一、二级阶梯分界线之一" },
      { x: 60, y: 66, name: "昆仑山脉", dir: "东西走向", note: "第一、二级阶梯分界线之一" },
      { x: 195, y: 120, name: "巫山", dir: "东北—西南走向", note: "第二、三级阶梯分界线之一" }
    ];
    mpts.forEach(function (m) {
      var c = svgEl("circle", { cx: m.x, cy: m.y, r: 12, fill: accent, opacity: 0.25, style: "cursor:pointer" });
      var d = svgEl("circle", { cx: m.x, cy: m.y, r: 5, fill: "#c0392b", style: "cursor:pointer" });
      var t = svgEl("text", { x: m.x, y: m.y - 16, "text-anchor": "middle", fill: ink,
        "font-size": "12.5", "font-weight": "bold", style: "cursor:pointer" });
      t.textContent = m.name;
      [c, d, t].forEach(function (n) {
        n.addEventListener("click", function () {
          selMountain = m.name;
          say(m.name + "：" + m.dir + "。" + m.note + "。");
          store(P.recordKey || "geog_terrain-3d", { mountain: m.name, ts: Date.now() });
        });
        svg.appendChild(n);
      });
    });
    /* 播放剖面描画动画 */
    var playBtn = el("button", "geog-btn fs-085", "▶ 播放剖面描画");
    playBtn.style.minHeight = "44px";
    playBtn.addEventListener("click", function () {
      played = true;
      var len = 600, t0 = null;
      line.style.strokeDasharray = String(len);
      line.style.strokeDashoffset = String(len);
      function step(ts) {
        if (!t0) t0 = ts;
        var k = Math.min(1, (ts - t0) / 2400);
        line.style.strokeDashoffset = String(len * (1 - k));
        if (k < 1) requestAnimationFrame(step);
        else { line.style.strokeDasharray = ""; line.style.strokeDashoffset = ""; }
      }
      var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { line.style.strokeDasharray = ""; }
      else requestAnimationFrame(step);
      say("西高东低，呈三级阶梯状：点一点山脉，看它的走向和它是第几级阶梯的分界。");
      store(P.recordKey || "geog_terrain-3d", { played: true, ts: Date.now() });
    });
    wrap.appendChild(playBtn);
    /* 山脉走向速查 */
    var dirBtn = el("button", "geog-btn fs-085", "山脉走向速查");
    dirBtn.style.minHeight = "44px";
    dirBtn.addEventListener("click", function () {
      var groups = {};
      MOUNTAINS.forEach(function (m) { (groups[m.dir] = groups[m.dir] || []).push(m.name); });
      say(Object.keys(groups).map(function (d) { return d + "：" + groups[d].join("、"); }).join("；") + "。");
    });
    wrap.appendChild(dirBtn);
    say("先播放剖面描画，再点山脉看走向。");
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, played: played, mountain: selMountain }; }
    });
  }

  /* ============================================================
   * mode 7：precip（dg09.2.2 年降水量分布判读，B 级）
   * ============================================================ */
  function PrecipView(box, P, asset) {
    var shell = makeShell(box, P, asset, "我国年降水量的空间分布");
    var ctx = drawBaseMap(shell.svg, asset, { provinces: "all", labels: "none" });
    /* 等降水量线（示意） */
    var iso = [
      { d: "M430,268 L470,278 L510,284 L550,288 L582,292", label: "800mm", lx: 596, ly: 292,
        note: "800 毫米等降水量线：大致沿秦岭—淮河一线" },
      { d: "M500,150 L485,195 L460,235 L435,265 L415,295 L405,325", label: "400mm", lx: 512, ly: 150,
        note: "400 毫米等降水量线：大致沿大兴安岭—张家口—兰州—拉萨—喜马拉雅山东段一线" },
      { d: "M300,175 L325,215 L350,255 L370,295", label: "200mm", lx: 310, ly: 172,
        note: "200 毫米等降水量线：西北内陆" }
    ];
    iso.forEach(function (o) {
      shell.svg.appendChild(svgEl("path", { d: o.d, fill: "none", stroke: "#0072B2",
        "stroke-width": 2, "stroke-dasharray": "7,4" }));
      var t = svgEl("text", { x: o.lx, y: o.ly, fill: "#0072B2", "font-size": "12.5", "font-weight": "bold" });
      t.textContent = o.label; shell.svg.appendChild(t);
    });
    var sel = null;
    PRECIP_STATIONS.forEach(function (s) {
      var c = svgEl("circle", { cx: s.pt[0], cy: s.pt[1], r: 12, fill: "#0072B2", opacity: 0.2, style: "cursor:pointer" });
      var d = svgEl("circle", { cx: s.pt[0], cy: s.pt[1], r: 5, fill: "#0072B2", style: "cursor:pointer" });
      var t = svgEl("text", { x: s.pt[0] + 14, y: s.pt[1] + 4, fill: ctx.ink, "font-size": "12.5", style: "cursor:pointer" });
      t.textContent = s.name;
      [c, d, t].forEach(function (n) {
        n.addEventListener("click", function () {
          sel = s.name;
          shell.say(s.name + "：年降水量" + s.band + "——" + s.note + "。" + PRECIP_LAW);
          store(P.recordKey || "geog_precip", { station: s.name, ts: Date.now() });
        });
        shell.svg.appendChild(n);
      });
    });
    var lawBtn = el("button", "geog-btn fs-085", "分布规律");
    lawBtn.style.minHeight = "44px";
    lawBtn.addEventListener("click", function () { shell.say(PRECIP_LAW); });
    shell.tools.appendChild(lawBtn);
    shell.say("点一点 6 个站点，对比它们的年降水量，找找分布规律。");
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, station: sel }; }
    });
  }

  /* ============================================================
   * mode 8：disaster-path（dg09.2.3 台风/寒潮路径，C 级剪影）
   * ============================================================ */
  function DisasterPathView(box, P, asset) {
    var shell = makeShell(box, P, asset, "气象灾害的路径");
    var ctx = drawBaseMap(shell.svg, asset, {});
    var cur = "typhoon", played = false;
    var layer = svgEl("g", {}); shell.svg.appendChild(layer);
    function draw(animate) {
      layer.innerHTML = "";
      var D = DISASTERS[cur];
      var p = svgEl("path", { d: "M" + D.path.map(function (q) { return q.join(","); }).join(" L"),
        fill: "none", stroke: cur === "typhoon" ? "#e67e22" : "#2a7de1",
        "stroke-width": 4, "stroke-linecap": "round", "stroke-dasharray": "12,7" });
      layer.appendChild(p);
      D.path.forEach(function (q, i) {
        if (i === 0 || i === D.path.length - 1) {
          layer.appendChild(svgEl("circle", { cx: q[0], cy: q[1], r: 6,
            fill: cur === "typhoon" ? "#e67e22" : "#2a7de1" }));
        }
      });
      var t = svgEl("text", { x: D.path[0][0] - 10, y: D.path[0][1] - 12, "text-anchor": "end",
        fill: ctx.ink, "font-size": "12.5", "font-weight": "bold" });
      t.textContent = "源地：" + D.from; layer.appendChild(t);
      if (animate) {
        var len = 500, t0 = null;
        p.style.strokeDasharray = "12,7";
        function step(ts) {
          if (!t0) t0 = ts;
          var k = ((ts - t0) / 60) % 19;
          p.style.strokeDashoffset = String(-k);
          if (played) requestAnimationFrame(step);
        }
        var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (!reduced) requestAnimationFrame(step);
      }
      shell.say(D.name + "：源地" + D.from + "，多发于" + D.when + "。" + D.note);
    }
    [["typhoon", "台风路径"], ["coldwave", "寒潮路径"]].forEach(function (tb) {
      var b = el("button", "geog-btn fs-085", tb[1]);
      b.style.minHeight = "44px";
      if (tb[0] === cur) b.classList.add("geog-btn-primary");
      b.addEventListener("click", function () {
        cur = tb[0]; played = true;
        Array.prototype.forEach.call(shell.tools.querySelectorAll("button"), function (x) {
          x.classList.remove("geog-btn-primary");
        });
        b.classList.add("geog-btn-primary");
        draw(true);
        store(P.recordKey || "geog_disaster-path", { disaster: cur, ts: Date.now() });
      });
      shell.tools.appendChild(b);
    });
    draw(false);
    shell.say("切换看看：台风从海上吹来，寒潮从北方南下——源地不同，影响也不同。");
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, disaster: cur, played: played }; }
    });
  }

  /* ============================================================
   * mode 9：river-profile（dg09.3.2 长江干流剖面，C 级）
   * ============================================================ */
  function RiverProfileView(box, P, asset) {
    var wrap = el("div", "geog-w2");
    wrap.appendChild(el("div", "geog-w2-head fs-105", esc("长江干流剖面：上、中、下游")));
    box.appendChild(wrap);
    var shell = makeShell(wrap, P, asset, "");
    shell.wrap.querySelector(".geog-w2-head").style.display = "none";
    /* 示意底图：C 级中国轮廓剪影（长江剖面的地理方位参照） */
    drawBaseMap(shell.svg, asset, {});
    var prof = el("div", "geog-w2-stage");
    prof.style.position = "relative";
    var svg = svgEl("svg", { viewBox: "0 0 420 230", width: "100%", role: "img",
      "aria-label": "长江干流示意剖面（源头—入海口）" });
    prof.appendChild(svg);
    var dc = el("div", "geog-map-declare fs-078",
      esc("剖面为教学示意，高程只看趋势不记数值｜" + declareText(P, asset)));
    dc.style.cssText = "position:absolute;right:8px;bottom:8px;max-width:72%;" +
      "text-align:right;pointer-events:none;opacity:0.85;" +
      "background:rgba(255,255,255,0.72);padding:2px 6px;border-radius:4px;";
    prof.appendChild(dc);
    wrap.appendChild(prof);
    var readout = el("div", "geog-w2-readout fs-095");
    wrap.appendChild(readout);
    function say(t) { readout.textContent = t; }

    var ink = cssVar("--geog-ink", "#1a1a1a"), soft = cssVar("--geog-ink-soft", "#5a5a5a"),
        river = cssVar("--geog-river", "#0072B2");
    /* 地形基底 + 长江示意线（源头高→入海口低） */
    svg.appendChild(svgEl("polyline", {
      points: "0,60 50,58 90,80 130,105 170,130 210,148 260,160 310,168 360,174 420,178",
      fill: "none", stroke: soft, "stroke-width": 10, opacity: 0.25, "stroke-linecap": "round" }));
    var segs = [
      { id: "up", x0: 0, x1: 170, pts: "0,60 50,58 90,80 130,105 170,130" },
      { id: "mid", x0: 170, x1: 280, pts: "170,130 210,148 260,160 280,163" },
      { id: "low", x0: 280, x1: 420, pts: "280,163 310,168 360,174 420,178" }
    ];
    var sel = null;
    segs.forEach(function (sg) {
      var info = YANGTZE.segs.filter(function (s) { return s.id === sg.id; })[0];
      var pl = svgEl("polyline", { points: sg.pts, fill: "none", stroke: river,
        "stroke-width": 14, opacity: 0.35, "stroke-linecap": "round", style: "cursor:pointer" });
      pl.addEventListener("click", function () {
        sel = sg.id;
        say(info.label + "：" + info.feat + "。");
        store(P.recordKey || "geog_river-profile", { seg: sg.id, ts: Date.now() });
      });
      svg.appendChild(pl);
    });
    /* 分界点 */
    [["宜昌\n上/中游分界", 170, 118], ["湖口\n中/下游分界", 280, 150]].forEach(function (m) {
      svgEl("line", {});
      svg.appendChild(svgEl("line", { x1: m[1], y1: m[2] + 14, x2: m[1], y2: 200,
        stroke: "#c0392b", "stroke-width": 1.6, "stroke-dasharray": "6,4" }));
      m[0].split("\n").forEach(function (ln, i) {
        var t = svgEl("text", { x: m[1], y: m[2] + i * 14, "text-anchor": "middle",
          fill: "#c0392b", "font-size": "12.5", "font-weight": "bold" });
        t.textContent = ln; svg.appendChild(t);
      });
    });
    var s0 = svgEl("text", { x: 8, y: 46, fill: soft, "font-size": "12.5" });
    s0.textContent = "源头：" + YANGTZE.source; svg.appendChild(s0);
    var s1 = svgEl("text", { x: 412, y: 196, "text-anchor": "end", fill: soft, "font-size": "12.5" });
    s1.textContent = "注入" + YANGTZE.mouth; svg.appendChild(s1);
    var s2 = svgEl("text", { x: 210, y: 222, "text-anchor": "middle", fill: soft, "font-size": "12.5" });
    s2.textContent = "长江全长" + YANGTZE.length + "（剖面高程为示意，只看趋势）"; svg.appendChild(s2);
    say("点一点上/中/下游三段：落差、流速、河道形态有什么不一样？");
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, seg: sel }; }
    });
  }

  /* ============================================================
   * mode 10：yellow-river（dg09.3.3 地上河剖面泥沙淤积动画，C 级）
   * ============================================================ */
  function YellowRiverView(box, P, asset) {
    var wrap = el("div", "geog-w2");
    wrap.appendChild(el("div", "geog-w2-head fs-105", esc("黄河：为什么下游会成为“地上河”？")));
    box.appendChild(wrap);
    var shell = makeShell(wrap, P, asset, "");
    shell.wrap.querySelector(".geog-w2-head").style.display = "none";
    /* 示意底图：C 级中国轮廓剪影（黄河位置的地理方位参照） */
    drawBaseMap(shell.svg, asset, {});
    var prof = el("div", "geog-w2-stage");
    prof.style.position = "relative";
    var svg = svgEl("svg", { viewBox: "0 0 420 230", width: "100%", role: "img",
      "aria-label": "黄河下游地上河横剖面示意（泥沙淤积）" });
    prof.appendChild(svg);
    var dc = el("div", "geog-map-declare fs-078",
      esc("剖面为教学示意，只看“淤积→抬高”趋势｜" + declareText(P, asset)));
    dc.style.cssText = "position:absolute;right:8px;bottom:8px;max-width:72%;" +
      "text-align:right;pointer-events:none;opacity:0.85;" +
      "background:rgba(255,255,255,0.72);padding:2px 6px;border-radius:4px;";
    prof.appendChild(dc);
    wrap.appendChild(prof);
    var readout = el("div", "geog-w2-readout fs-095");
    wrap.appendChild(readout);
    function say(t) { readout.textContent = t; }

    var soft = cssVar("--geog-ink-soft", "#5a5a5a"),
        river = cssVar("--geog-river", "#0072B2");
    /* 地面 + 初始河床 */
    svg.appendChild(svgEl("rect", { x: 0, y: 150, width: 420, height: 80, fill: "#e8dcc0", opacity: 0.8 }));
    var gl = svgEl("text", { x: 12, y: 170, fill: soft, "font-size": "12.5" });
    gl.textContent = "两岸地面"; svg.appendChild(gl);
    var bed = svgEl("rect", { x: 150, y: 120, width: 120, height: 30, fill: river, opacity: 0.75 });
    svg.appendChild(bed);
    var sediment = svgEl("rect", { x: 150, y: 148, width: 120, height: 2, fill: "#c98a4b", opacity: 0.9 });
    svg.appendChild(sediment);
    var bl = svgEl("text", { x: 210, y: 112, "text-anchor": "middle", fill: river, "font-size": "12.5", "font-weight": "bold" });
    bl.textContent = "河床"; svg.appendChild(bl);
    var lvl = 0, animating = false, rafId = 0;
    function drawLvl() {
      /* 泥沙淤积：沉积层增厚，把河床顶托高 */
      sediment.setAttribute("y", String(148 - lvl));
      sediment.setAttribute("height", String(2 + lvl));
      bed.setAttribute("y", String(120 - lvl));
      bl.setAttribute("y", String(112 - lvl));
    }
    var playBtn = el("button", "geog-btn fs-085", "▶ 播放泥沙淤积");
    playBtn.style.minHeight = "44px";
    playBtn.addEventListener("click", function () {
      if (animating) return;
      animating = true; lvl = 0;
      var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduced) { lvl = 46; drawLvl(); animating = false; }
      else {
        (function step() {
          lvl += 1.2; drawLvl();
          if (lvl < 46) rafId = requestAnimationFrame(step);
          else animating = false;
        })();
      }
      say(YELLOW_RIVER.aboveGround);
      store(P.recordKey || "geog_yellow-river", { played: true, ts: Date.now() });
    });
    wrap.appendChild(playBtn);
    /* 上/中/下游切换 */
    var segRow = el("div", "geog-w2-row");
    var segSel = null;
    YELLOW_RIVER.segs.forEach(function (sg) {
      var b = el("button", "geog-btn fs-085", sg.label);
      b.style.minHeight = "44px";
      b.addEventListener("click", function () {
        segSel = sg.id;
        Array.prototype.forEach.call(segRow.querySelectorAll("button"), function (x) {
          x.classList.remove("geog-btn-primary");
        });
        b.classList.add("geog-btn-primary");
        say("黄河" + sg.label + "：" + sg.feat + "。");
        store(P.recordKey || "geog_yellow-river", { seg: sg.id, ts: Date.now() });
      });
      segRow.appendChild(b);
    });
    wrap.appendChild(segRow);
    say("黄河源头" + YELLOW_RIVER.source + "，注入" + YELLOW_RIVER.mouth + "，全长" +
      YELLOW_RIVER.length + "。先播放淤积动画，再看看上/中/下游各有什么特点。");
    var view = finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, seg: segSel }; }
    });
    var _destroy = view.destroy;
    view.destroy = function () { if (rafId) cancelAnimationFrame(rafId); _destroy(); };
    return view;
  }

  /* ============================================================
   * mode 11：landuse（dg10.1.2 土地利用类型判读，B 级）
   * ============================================================ */
  function LanduseView(box, P, asset) {
    var shell = makeShell(box, P, asset, "我国土地利用类型的分布");
    var ctx = drawBaseMap(shell.svg, asset, { provinces: "all", labels: "none" });
    var colors = { farm: "#8fce6e", forest: "#3f8f4f", grass: "#e8d44f", desert: "#e0c98f" };
    var sel = null;
    LANDUSE.forEach(function (lu) {
      var key = lu.id.replace(/2$/, "");
      var pg = svgEl("polygon", {
        points: lu.poly.map(function (p) { return p.join(","); }).join(" "),
        fill: colors[key] || "#cccccc", opacity: 0.55,
        stroke: ctx.soft, "stroke-width": 1, style: "cursor:pointer" });
      function pick() {
        sel = lu.id;
        shell.say(lu.name + "：主要分布在" + lu.where + "。" + lu.note + "。");
        store(P.recordKey || "geog_landuse", { type: lu.id, ts: Date.now() });
      }
      pg.addEventListener("click", pick);
      shell.svg.appendChild(pg);
      var cx = lu.poly.reduce(function (a, p) { return a + p[0]; }, 0) / lu.poly.length;
      var cy = lu.poly.reduce(function (a, p) { return a + p[1]; }, 0) / lu.poly.length;
      var t = svgEl("text", { x: cx, y: cy, "text-anchor": "middle", fill: ctx.ink,
        "font-size": "12.5", "font-weight": "bold", style: "cursor:pointer" });
      t.textContent = lu.name;
      t.addEventListener("click", pick);
      shell.svg.appendChild(t);
    });
    shell.say("点一点色块：耕地、林地、草地、荒漠各分布在哪里？想想为什么这样分布。");
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, type: sel }; }
    });
  }

  /* ============================================================
   * mode 12：water-transfer（dg10.2.1 南水北调三线示意，B 级）
   * ============================================================ */
  function WaterTransferView(box, P, asset) {
    var shell = makeShell(box, P, asset, "南水北调：东、中、西三线");
    var ctx = drawBaseMap(shell.svg, asset, {
      provinces: "all", labels: ["js", "he", "hub", "bj", "tj", "sc", "qh"] });
    var sel = null;
    WATER_TRANSFER.forEach(function (ln, i) {
      var col = ["#0072B2", "#2a7de1", "#9b59b6"][i % 3];
      var d = "M" + ln.path.map(function (q) { return q.join(","); }).join(" L");
      var hit = svgEl("path", { d: d, fill: "none", stroke: "rgba(0,0,0,0)",
        "stroke-width": 30, style: "cursor:pointer" });
      var vis = svgEl("path", { d: d, fill: "none", stroke: col, "stroke-width": 5,
        "stroke-linecap": "round", "pointer-events": "none" });
      if (ln.dashed) vis.setAttribute("stroke-dasharray", "10,7");
      else {
        /* 水流方向动画（虚线流动） */
        vis.setAttribute("stroke-dasharray", "10,7");
        (function (vv) {
          var off = 0, raf = 0;
          var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
          if (!reduced) {
            (function step() {
              off -= 0.4; vv.style.strokeDashoffset = String(off);
              raf = requestAnimationFrame(step);
            })();
          }
          vv._stop = function () { if (raf) cancelAnimationFrame(raf); };
        })(vis);
      }
      var mx = ln.path[Math.floor(ln.path.length / 2)];
      var t = svgEl("text", { x: mx[0] + 10, y: mx[1] - 10, fill: col,
        "font-size": "13.6", "font-weight": "bold", style: "cursor:pointer" });
      t.textContent = ln.name + "线";
      function pick() {
        sel = ln.id;
        shell.say(ln.name + "线（" + ln.status + "）：" + ln.note);
        store(P.recordKey || "geog_water-transfer", { line: ln.id, ts: Date.now() });
      }
      hit.addEventListener("click", pick);
      t.addEventListener("click", pick);
      shell.svg.appendChild(hit); shell.svg.appendChild(vis); shell.svg.appendChild(t);
      /* 起终点 */
      var s = ln.path[0], e2 = ln.path[ln.path.length - 1];
      shell.svg.appendChild(svgEl("circle", { cx: s[0], cy: s[1], r: 6, fill: col }));
      shell.svg.appendChild(svgEl("circle", { cx: e2[0], cy: e2[1], r: 6, fill: "#ffffff",
        stroke: col, "stroke-width": 3 }));
    });
    var lg = svgEl("text", { x: 60, y: 600, fill: ctx.soft, "font-size": "12.5" });
    lg.textContent = "● 起点　○ 终点　虚线=规划中";
    shell.svg.appendChild(lg);
    shell.say("点一点三条线：东线、中线已经通水，西线还在规划——为什么是“南水北调”？");
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, line: sel }; }
    });
  }

  /* ============================================================
   * mode 13：marine（dg10.2.2 领海/专属经济区示意，A 级）
   * 海域带为示意带、非精确比例，不表达实际划界
   * ============================================================ */
  function MarineView(box, P, asset) {
    var sel = null;
    /* 海域带：沿海岸线的示意带（半透明叠层，外→内：EEZ/毗连区/领海），
     * 经 underlay 画在海底之上、陆地之下，色带不压陆地 */
    var coastD = asset.paths.coast;
    var bands = [
      { id: "eez", w: 52, fill: "#9fc5e8", op: 0.30 },
      { id: "contiguous", w: 30, fill: "#7fb3e8", op: 0.35 },
      { id: "territorial", w: 14, fill: "#2a7de1", op: 0.40 }
    ];
    var shell = makeShell(box, P, asset, "我国的海洋国土");
    var ctx = drawBaseMap(shell.svg, asset, { provinces: "all", labels: "none",
      underlay: function (svg) {
        bands.forEach(function (b) {
          var info = MARINE.filter(function (m) { return m.id === b.id; })[0];
          var p = svgEl("path", { d: coastD, fill: "none", stroke: b.fill,
            "stroke-width": b.w, opacity: b.op, "stroke-linecap": "round", style: "cursor:pointer" });
          p.addEventListener("click", function () {
            sel = b.id;
            shell.say(info.name + "（" + (info.width || "见说明") + "）：" + info.note +
              "（海域带为示意带，非精确比例，不表达实际划界。）");
            store(P.recordKey || "geog_marine", { zone: b.id, ts: Date.now() });
          });
          svg.appendChild(p);
        });
      }
    });
    /* 大陆架说明点（东海） */
    var shelf = MARINE[3];
    var sp = svgEl("circle", { cx: 640, cy: 300, r: 12, fill: "#9fc5e8", opacity: 0.5, style: "cursor:pointer" });
    var st2 = svgEl("text", { x: 640, y: 326, "text-anchor": "middle", fill: ctx.ink,
      "font-size": "12.5", style: "cursor:pointer" });
    st2.textContent = "大陆架";
    [sp, st2].forEach(function (n) {
      n.addEventListener("click", function () {
        sel = "shelf";
        shell.say(shelf.name + "：" + shelf.note);
        store(P.recordKey || "geog_marine", { zone: "shelf", ts: Date.now() });
      });
      shell.svg.appendChild(n);
    });
    var lg = svgEl("text", { x: 60, y: 600, fill: ctx.soft, "font-size": "12.5" });
    lg.textContent = "由岸向海：领海·毗连区·专属经济区（示意带）";
    shell.svg.appendChild(lg);
    shell.say("点一点三条海域带：领海、毗连区、专属经济区各有多宽、有什么权利？");
    return finishView(shell, P, asset, {
      state: function () { return { mode: P.mode, zone: sel }; }
    });
  }

  /* ============================================================
   * 注册分发
   * ============================================================ */
  var MODES = {
    "position-switch": PositionSwitchView,
    "four-points": FourPointsView,
    "admin-puzzle": AdminPuzzleView,
    "huhuan-yong": HuhuanYongView,
    "ethnic-match": EthnicMatchView,
    "terrain-3d": Terrain3DView,
    "precip": PrecipView,
    "disaster-path": DisasterPathView,
    "river-profile": RiverProfileView,
    "yellow-river": YellowRiverView,
    "landuse": LanduseView,
    "water-transfer": WaterTransferView,
    "marine": MarineView
  };
  window.GEO.registerWidget("geo-map", function (box, params) {
    var P = params || {};
    var asset = resolveAsset(P);
    if (!asset) {
      box.appendChild(el("div", "geog-block trap", "⚠️ geo-map：缺少国界/省界派生表（data/geo-schematic-paths.js 未引入）。"));
      return;
    }
    var fn = MODES[P.mode];
    if (!fn) {
      box.appendChild(el("div", "geog-block trap",
        "⚠️ geo-map：未知 mode「" + esc(P.mode) + "」，可用：" + esc(Object.keys(MODES).join("、")) + "。"));
      return;
    }
    return fn(box, P, asset);
  });
  window.GeoBatch5.modes = Object.keys(MODES);
  window.GeoBatch5.defaultAsset = DEFAULT_ASSET;
})();
