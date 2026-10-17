/* ============================================================
 * 学习工具箱 · 地理 · 批 5 国界/省界示意路径派生表
 *
 * 审定依据：GEO-RULING-2026-10-17-08（地理专家队书面审定书，
 *   批 5 dg08+dg09+dg10 国界/省界绘制口径），第二节 B/C、
 *   第五节待查项临时口径。
 * 画法：按人教版义务教育地理八年级上册教材插图描摹简化绘制
 *   （审定书 B.6 临时口径）；国界线闭合（南段为十段线断续线，
 *   与固线共同构成闭合回路，类比 2023 年版标准地图）；
 *   省界 34 单元齐全、相邻关系以 ADJACENCY 表为准（程序化校验），
 *   几何接边为教学简化描摹、存在像素级缝隙（诚实缺口，见卷宗）；
 *   南海四群岛符号缺一不可；十段线 10 段（含台湾东侧一段）；
 *   台湾岛与大陆同色系；钓鱼岛点位+注记；港澳符号点+注记。
 *
 * viewBox：0 0 800 640。坐标系为教学示意坐标（非经纬度投影），
 *   大致按 X=(经度-73)*9.03+140、Y=(53-纬度)*11.02+60 线性换算后
 *   手工简化取整；仅保证方位与相对位置，不保证精确比例
 *   （E.2 声明「非精确比例」）。
 *
 * 省界审定版本号：CN-PROV-v1，状态 expert-signed（地理专家队书面签发，
 *   见 GEO-RULING-2026-10-17-09；签发后任何走向变更须经新的书面审定）
 *   （审定书附则：版本号由地理专家队在审定路径入库时签发；
 *   任何走向变更须经新的书面审定，生产队不得自行更新版本号）。
 * 34 省 id/简称/行政中心按人教版口径（23 省/5 自治区/4 直辖市/
 *   2 特别行政区）。
 *
 * 挂载：window.GEOGRAPHY_DATA.schematicPaths（数组，每条记录字段
 *   {id, assetId, grade, mapTitle, lessonRefs, signoff, paths, notes}）。
 * 零外部请求；file:// 可跑。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};

(function () {
  "use strict";

  /* ---------------- 34 省级单元 ----------------
   * id：拼音缩写；name：全称；abbr：简称（人教版口径，“/”表“或”）；
   * capital：行政中心；capitalPt：行政中心示意点位；
   * labelPt：省名注记点位；path：示意多边形（M…Z）。 */
  var PROVINCES = [
    { id: "hl",  name: "黑龙江省", abbr: "黑",      capital: "哈尔滨",   capitalPt: [623,139], labelPt: [620,120],
      path: "M587,57 L616,71 L655,95 L698,112 L690,128 L681,150 L665,172 L645,176 L605,172 L560,160 L560,140 L570,100 Z" },
    { id: "jl",  name: "吉林省",   abbr: "吉",      capital: "长春",     capitalPt: [612,160], labelPt: [608,186],
      path: "M560,160 L605,172 L645,176 L655,180 L648,195 L620,200 L595,198 L575,190 L560,175 Z" },
    { id: "ln",  name: "辽宁省",   abbr: "辽",      capital: "沈阳",     capitalPt: [594,183], labelPt: [600,208],
      path: "M575,190 L595,198 L620,200 L648,195 L640,210 L620,222 L604,202 L590,216 L575,226 L564,218 L570,206 Z" },
    { id: "nm",  name: "内蒙古自治区", abbr: "内蒙古", capital: "呼和浩特", capitalPt: [490,194], labelPt: [430,150],
      path: "M361,175 L384,173 L420,165 L456,143 L491,121 L519,104 L545,84 L564,66 L560,100 L560,140 L560,160 L575,190 L570,206 L545,215 L520,222 L500,228 L480,232 L460,228 L445,232 L430,228 L415,232 L400,228 L390,210 L380,195 L370,182 Z" },
    { id: "hb",  name: "河北省",   abbr: "冀",      capital: "石家庄",   capitalPt: [515,225], labelPt: [540,228],
      path: "M500,228 L520,222 L545,215 L570,206 L580,212 L575,226 L565,235 L550,238 L535,235 L520,232 L505,232 Z" },
    { id: "bj",  name: "北京市",   abbr: "京",      capital: "北京",     capitalPt: [533,204], labelPt: [533,192],
      path: "M526,198 L540,198 L540,210 L526,210 Z" },
    { id: "tj",  name: "天津市",   abbr: "津",      capital: "天津",     capitalPt: [540,215], labelPt: [556,215],
      path: "M534,210 L546,210 L546,220 L534,220 Z" },
    { id: "sx",  name: "山西省",   abbr: "晋",      capital: "太原",     capitalPt: [497,227], labelPt: [491,244],
      path: "M478,230 L498,226 L508,230 L510,244 L505,256 L496,262 L484,260 L474,252 L472,240 Z" },
    { id: "shx", name: "陕西省",   abbr: "陕/秦",   capital: "西安",     capitalPt: [465,266], labelPt: [456,272],
      path: "M430,228 L445,232 L460,228 L472,246 L474,266 L484,282 L478,292 L465,296 L450,290 L438,280 L430,265 L428,248 Z" },
    { id: "nx",  name: "宁夏回族自治区", abbr: "宁", capital: "银川",    capitalPt: [440,220], labelPt: [433,242],
      path: "M425,225 L442,222 L444,240 L440,258 L428,256 L422,240 Z" },
    { id: "gs",  name: "甘肃省",   abbr: "甘/陇",   capital: "兰州",     capitalPt: [418,247], labelPt: [350,230],
      path: "M320,295 L318,275 L322,255 L330,235 L340,215 L350,195 L361,175 L380,180 L400,190 L415,200 L420,215 L425,225 L442,222 L446,232 L448,246 L444,260 L436,270 L428,280 L418,290 L410,296 L400,292 L390,286 L380,280 L368,274 L355,270 L342,266 L330,262 Z" },
    { id: "qh",  name: "青海省",   abbr: "青",      capital: "西宁",     capitalPt: [400,241], labelPt: [360,288],
      path: "M305,256 L320,260 L335,262 L350,264 L365,266 L380,270 L395,274 L405,276 L412,290 L418,305 L405,315 L390,320 L372,322 L355,320 L340,314 L328,306 L318,288 L310,272 Z" },
    { id: "xj",  name: "新疆维吾尔自治区", abbr: "新", capital: "乌鲁木齐", capitalPt: [272,161], labelPt: [255,230],
      path: "M146,205 L160,190 L190,175 L221,168 L248,165 L275,160 L300,158 L330,160 L350,170 L345,195 L338,220 L330,245 L322,270 L320,295 L322,312 L330,322 L312,318 L295,310 L280,300 L265,290 L250,282 L235,275 L221,268 L208,262 L194,256 L180,250 L167,242 L154,225 Z" },
    { id: "xz",  name: "西藏自治区", abbr: "藏",    capital: "拉萨",     capitalPt: [304,317], labelPt: [300,330],
      path: "M194,256 L208,262 L221,268 L235,275 L250,282 L265,290 L280,300 L295,310 L312,318 L330,322 L345,330 L360,340 L375,348 L365,358 L350,352 L335,348 L320,344 L305,340 L290,334 L275,328 L260,320 L245,312 L230,304 L218,294 L208,284 L200,272 Z" },
    { id: "sc",  name: "四川省",   abbr: "川/蜀",   capital: "成都",     capitalPt: [420,307], labelPt: [412,330],
      path: "M330,262 L342,266 L355,270 L368,274 L380,280 L390,286 L400,292 L410,296 L425,292 L438,288 L448,296 L455,310 L452,328 L445,345 L432,358 L418,366 L402,370 L388,364 L380,350 L378,332 L380,314 L372,300 L360,288 L345,278 Z" },
    { id: "cq",  name: "重庆市",   abbr: "渝",      capital: "重庆",     capitalPt: [443,318], labelPt: [440,322],
      path: "M438,288 L448,296 L455,310 L452,328 L445,345 L435,348 L428,336 L426,320 L428,304 Z" },
    { id: "yn",  name: "云南省",   abbr: "云/滇",   capital: "昆明",     capitalPt: [409,368], labelPt: [415,372],
      path: "M375,348 L388,364 L402,370 L418,366 L432,358 L445,345 L455,352 L450,368 L440,380 L425,388 L408,390 L395,386 L385,376 Z" },
    { id: "gz",  name: "贵州省",   abbr: "贵/黔",   capital: "贵阳",     capitalPt: [444,350], labelPt: [448,364],
      path: "M402,370 L418,366 L432,358 L445,345 L452,328 L465,332 L472,344 L478,356 L474,368 L464,378 L450,382 L436,378 L428,366 L428,352 L436,340 Z" },
    { id: "gx",  name: "广西壮族自治区", abbr: "桂", capital: "南宁",    capitalPt: [459,393], labelPt: [452,386],
      path: "M414,378 L428,380 L444,378 L458,370 L468,358 L478,362 L482,374 L474,386 L460,394 L444,398 L428,396 L416,390 Z" },
    { id: "gd",  name: "广东省",   abbr: "粤",      capital: "广州",     capitalPt: [503,390], labelPt: [520,372],
      path: "M468,358 L482,362 L488,374 L498,386 L512,392 L528,394 L544,390 L556,378 L560,366 L552,354 L540,346 L524,344 L508,346 L494,350 L482,354 Z" },
    { id: "hi",  name: "海南省",   abbr: "琼",      capital: "海口",     capitalPt: [477,424], labelPt: [473,452],
      path: "M464,420 L476,418 L484,424 L482,434 L472,440 L462,434 Z" },
    { id: "hk",  name: "香港特别行政区", abbr: "港", capital: "香港",    capitalPt: [511,398], labelPt: [526,392],
      path: "", shapeKind: "point" },
    { id: "hm",  name: "澳门特别行政区", abbr: "澳", capital: "澳门",    capitalPt: [506,400], labelPt: [492,410],
      path: "", shapeKind: "point" },
    { id: "tw",  name: "台湾省",   abbr: "台",      capital: "台北",     capitalPt: [578,366], labelPt: [573,416],
      path: "M566,368 L574,366 L580,370 L583,380 L582,390 L578,400 L572,402 L567,396 L564,384 Z" },
    { id: "fj",  name: "福建省",   abbr: "闽",      capital: "福州",     capitalPt: [558,357], labelPt: [560,362],
      path: "M544,332 L550,344 L560,348 L570,342 L574,330 L578,342 L576,356 L570,368 L560,374 L550,370 L544,360 Z" },
    { id: "zj",  name: "浙江省",   abbr: "浙",      capital: "杭州",     capitalPt: [566,310], labelPt: [558,326],
      path: "M544,316 L556,310 L566,306 L572,316 L574,330 L570,342 L560,348 L550,344 L544,332 Z" },
    { id: "js",  name: "江苏省",   abbr: "苏",      capital: "南京",     capitalPt: [553,291], labelPt: [566,262],
      path: "M540,300 L544,288 L548,272 L552,258 L556,244 L562,232 L570,222 L578,216 L586,222 L590,232 L586,244 L580,256 L574,268 L570,280 L566,292 L560,302 L550,308 Z" },
    { id: "sh",  name: "上海市",   abbr: "沪",      capital: "上海",     capitalPt: [577,301], labelPt: [592,301],
      path: "M572,296 L582,296 L582,306 L572,306 Z" },
    { id: "ah",  name: "安徽省",   abbr: "皖",      capital: "合肥",     capitalPt: [534,293], labelPt: [532,296],
      path: "M518,268 L532,266 L546,270 L556,280 L558,294 L552,306 L542,314 L530,316 L520,310 L514,298 L514,284 Z" },
    { id: "jx",  name: "江西省",   abbr: "赣",      capital: "南昌",     capitalPt: [527,328], labelPt: [528,338],
      path: "M510,330 L518,320 L520,308 L528,300 L538,302 L546,312 L548,326 L544,340 L536,350 L524,354 L514,350 L508,342 Z" },
    { id: "hub", name: "湖北省",   abbr: "鄂",      capital: "武汉",     capitalPt: [513,307], labelPt: [492,308],
      path: "M438,288 L448,296 L455,310 L452,328 L465,330 L478,328 L490,328 L502,332 L510,330 L518,320 L520,308 L514,298 L502,292 L488,288 L474,286 L460,286 Z" },
    { id: "hn",  name: "湖南省",   abbr: "湘",      capital: "长沙",     capitalPt: [501,333], labelPt: [486,352],
      path: "M452,328 L465,330 L478,328 L490,328 L502,332 L510,342 L513,356 L508,368 L498,372 L488,366 L480,356 L472,344 Z" },
    { id: "he",  name: "河南省",   abbr: "豫",      capital: "郑州",     capitalPt: [507,261], labelPt: [516,270],
      path: "M472,240 L484,252 L496,256 L508,250 L520,244 L535,240 L550,242 L556,252 L552,266 L544,278 L532,286 L518,290 L504,288 L492,282 L484,272 L476,262 Z" },
    { id: "sd",  name: "山东省",   abbr: "鲁",      capital: "济南",     capitalPt: [538,240], labelPt: [556,232],
      path: "M520,232 L535,235 L550,238 L558,246 L566,242 L578,236 L590,228 L594,220 L586,212 L574,210 L562,214 L550,220 L538,226 L528,230 Z" }
  ];

  /* ---------------- 省际相邻关系（人教版口径，程序化校验用）
   * 拼图闯关的「相邻关系不变」以此表为准；几何接边为近似描摹。 */
  var ADJACENCY = {
    hl: ["nm", "jl"], jl: ["hl", "nm", "ln"], ln: ["jl", "nm", "hb"],
    nm: ["hl", "jl", "ln", "hb", "sx", "shx", "nx", "gs"],
    hb: ["nm", "ln", "sx", "he", "sd", "bj", "tj"], bj: ["hb", "tj"], tj: ["hb", "bj"],
    sx: ["hb", "nm", "shx", "he"], shx: ["nm", "nx", "gs", "sc", "cq", "hub", "he", "sx"],
    nx: ["nm", "shx", "gs"], gs: ["nm", "nx", "shx", "sc", "qh", "xj"],
    qh: ["xj", "gs", "sc", "xz"], xj: ["xz", "qh", "gs"], xz: ["xj", "qh", "sc", "yn"],
    sc: ["qh", "gs", "shx", "cq", "gz", "yn", "xz"], cq: ["shx", "hub", "hn", "gz", "sc"],
    yn: ["xz", "sc", "gz", "gx"], gz: ["sc", "cq", "hn", "gx", "yn"],
    gx: ["yn", "gz", "hn", "gd"], gd: ["gx", "hn", "jx", "fj", "hk", "hm", "hi"],
    hi: ["gd"], hk: ["gd"], hm: ["gd"], tw: ["fj"],
    fj: ["zj", "jx", "gd", "tw"], zj: ["sh", "js", "ah", "jx", "fj"],
    js: ["sd", "ah", "zj", "sh"], sh: ["js", "zj"],
    ah: ["js", "sd", "he", "hub", "jx", "zj"], jx: ["ah", "hub", "hn", "gd", "fj", "zj"],
    hub: ["he", "shx", "cq", "hn", "jx", "ah"], hn: ["hub", "cq", "gz", "gx", "gd", "jx"],
    he: ["hb", "sx", "shx", "hub", "ah", "sd"], sd: ["hb", "he", "ah", "js"]
  };

  /* ---------------- 国界/海域几何 ----------------
   * nationalLand：固线（丹东→陆上边境→东兴→海南南外海），在
   *   (446,458) 处与十段线衔接（不断开语义：见 nationalSeaEast）。
   * nationalSeaEast：固线（十段线北端 (606,382) →浙江外海→
   *   黄海→渤海→丹东，与 nationalLand 在丹东闭合）。
   *   南段国界即十段线断续线：固线+断线共同构成闭合回路
   *   （类比 2023 年版标准地图画法）。
   * coast：海岸线装饰线（细线，无界线语义），港澳/海岸注记定位用。
   * tenDash：十段线 10 段（d10 为台湾东侧一段，不可少）。 */
  var PATHS = {
    viewBox: "0 0 800 640",
    nationalLand: "M604,202 L595,190 L620,185 L648,178 L665,172 L681,150 L690,128 " +
      "L698,112 L670,100 L640,85 L616,71 L587,57 L564,66 L545,84 L519,104 L491,121 " +
      "L456,143 L420,165 L384,173 L361,175 L338,187 L311,198 L280,214 L248,222 " +
      "L221,220 L200,215 L180,208 L160,200 L146,205 L154,225 L167,242 L190,256 " +
      "L208,270 L226,285 L248,300 L275,315 L302,328 L329,321 L352,330 L375,340 " +
      "L386,352 L379,372 L390,385 L397,394 L415,395 L433,389 L447,391 L457,407 " +
      "L452,425 L448,445 L446,458",
    nationalSeaEast: "M606,382 L612,366 L606,348 L596,340 L590,332 L586,318 L588,304 " +
      "L580,292 L570,276 L566,262 L572,250 L582,240 L594,230 L586,220 L596,210 L604,202",
    coast: "M457,407 L470,410 L482,416 L490,424 L500,420 L508,412 L516,408 L528,402 " +
      "L540,394 L550,384 L558,372 L562,360 L568,348 L574,338 L580,326 L582,312 " +
      "L580,302 L572,290 L562,274 L558,262 L566,250 L576,242 L588,232 L580,222 " +
      "L592,212 L604,202",
    tenDash: [
      "M446,458 L444,476", "M443,492 L444,510", "M448,526 L458,542",
      "M472,556 L492,566", "M508,570 L528,564", "M544,552 L556,534",
      "M562,516 L568,496", "M574,478 L580,458", "M586,440 L592,420",
      "M598,404 L604,384"
    ],
    tenDashNote: "第 10 段（M598,404 L604,384）为台湾岛东侧一段（2023 年版标准地图口径），不可省略；" +
      "小比例尺允许断线加粗合并，但段数不得少于 8 段、包络范围不得实质改变（审定书 B.3）。",
    islands: {
      dongsha: { point: [535, 416], label: "东沙群岛", labelPt: [535, 402] },
      xisha:   { point: [498, 458], label: "西沙群岛", labelPt: [498, 444] },
      zhongsha:{ point: [512, 484], label: "中沙群岛", labelPt: [512, 500] },
      nansha:  { point: [502, 530], label: "南沙群岛", labelPt: [502, 546] },
      zengmu:  { point: [498, 598], label: "曾母暗沙", labelPt: [498, 616], atoll: true }
    },
    taiwan: {
      label: "台湾省",
      note: "台湾岛与大陆同色系（同一省级政区色系），拼图/配对中为 34 单元之一（审定书 B.4）。"
    },
    diaoyu: { point: [598, 359], label: "钓鱼岛", labelPt: [570, 346], leader: true },
    hkmo: [
      { point: [511, 398], label: "香港", labelPt: [548, 384] },
      { point: [506, 400], label: "澳门", labelPt: [492, 410] }
    ]
  };

  /* ---------------- 资产记录（8 幅图） ----------------
   * 每条记录：{id, assetId, grade, mapTitle, lessonRefs, signoff, paths, notes}
   * grade 按审定书第二节 A 分级；paths 共享同一套审定几何。 */
  var SIGNOFF = { version: "CN-PROV-v1", status: "expert-signed",
    ruling: "GEO-RULING-2026-10-17-09", signedDate: "2026-10-17" };

  function record(id, assetId, grade, mapTitle, lessonRefs, notes) {
    return {
      id: id, assetId: assetId, grade: grade, mapTitle: mapTitle,
      lessonRefs: lessonRefs, signoff: { version: SIGNOFF.version, status: SIGNOFF.status,
        ruling: SIGNOFF.ruling, signedDate: SIGNOFF.signedDate },
      paths: PATHS, provinces: PROVINCES, adjacency: ADJACENCY, notes: notes
    };
  }

  var RECORDS = [
    record("map-cn-territory", "cn-territory", "A", "中国疆域全图",
      ["dg08.1.1", "dg08.1.2"],
      "A 级·中国政区要素图：讲半球位置/纬度位置/海陆位置、四至点与邻国。" +
      "国界线闭合（南段为十段线）、34 省界齐全、四群岛+曾母暗沙、十段线 10 段、" +
      "台湾岛与大陆同色、钓鱼岛点位+注记、港澳符号点+注记，缺一不可（审定书 D 节）。"),
    record("map-cn-admin", "cn-admin", "A", "中国省级行政区全图",
      ["dg08.1.3", "dg08.2.2"],
      "A 级·中国政区要素图：34 省级单元拼图闯关与五大自治区对号入座底图。" +
      "各省形状为教学简化（拼图用），相邻关系以 adjacency 表为准、不得错乱（审定书 C.3）；" +
      "配「形状经简化，相邻关系不变」声明（GEO-AX01 显性化）。"),
    record("map-cn-silhouette", "cn-silhouette", "C", "中国轮廓剪影",
      ["dg08.2.1", "dg09.2.3", "dg09.3.2", "dg09.3.3"],
      "C 级·背景剪影：纯装饰性中国轮廓，不承载政区信息、不出现省界/国界/十段线；" +
      "沿用批 4 及以前「不画国界线＋示意声明」口径，但台湾岛不可缺（审定书 D 节底线），" +
      "且必须带 GEO-R24 示意声明（C 级冻结文案）。"),
    record("map-cn-terrain", "cn-terrain", "B", "中国地形底图（含省界）",
      ["dg09.1.1"],
      "B 级·要素叠加图：主题为三级阶梯/山脉走向，底图为中国全境轮廓且叠加省界，" +
      "执行 B–E 全部条文（与 A 级同，审定书第二节 A）。"),
    record("map-cn-precip", "cn-precip", "B", "中国年降水量分布底图（含省界）",
      ["dg09.2.2"],
      "B 级·要素叠加图：年降水量分布按省域判读，底图叠加省界，执行 B–E 全部条文。"),
    record("map-cn-landuse", "cn-landuse", "B", "中国土地利用类型底图（含省界）",
      ["dg10.1.2"],
      "B 级·要素叠加图：土地利用类型分区判读，底图叠加省界，执行 B–E 全部条文。"),
    record("map-cn-watertransfer", "cn-watertransfer", "B", "南水北调三线示意底图（含省界）",
      ["dg10.2.1"],
      "B 级·要素叠加图：东/中/西三线示意，底图叠加省界，执行 B–E 全部条文；" +
      "西线为规划线，用虚线区别于已建成的东/中线（诚实区分“已建成/规划中”）。"),
    record("map-cn-marine", "cn-marine", "A", "中国海域示意图",
      ["dg10.2.2"],
      "A 级·中国政区要素图：以海域（领海/毗连区/专属经济区/大陆架）为教学内容，" +
      "执行 B–E 全部条文；海域带为示意带、非精确比例（E.2 声明），不表达实际划界。")
  ];

  /* 省 id 快速索引（渲染器用） */
  var PROV_BY_ID = {};
  PROVINCES.forEach(function (p) { PROV_BY_ID[p.id] = p; });

  window.GEOGRAPHY_DATA.schematicPaths = RECORDS;
  window.GEOGRAPHY_DATA.schematicPathsMeta = {
    dataVersion: "CN-PROV-v1",
    signoffStatus: "expert-signed",
    signoffRuling: "GEO-RULING-2026-10-17-09",
    ruling: "GEO-RULING-2026-10-17-08",
    viewBox: PATHS.viewBox,
    byAssetId: function (assetId) {
      for (var i = 0; i < RECORDS.length; i++) {
        if (RECORDS[i].assetId === assetId) return RECORDS[i];
      }
      return null;
    },
    provinceById: function (id) { return PROV_BY_ID[id] || null; },
    provinces: PROVINCES,
    adjacency: ADJACENCY,
    /* 自检：一票否决相关结构完整性（白队/蓝队程序断言用） */
    selfCheck: function () {
      var issues = [];
      if (PROVINCES.length !== 34) issues.push("provinces!=34:" + PROVINCES.length);
      var ids = {};
      PROVINCES.forEach(function (p) {
        if (!p.id || !p.name || !p.abbr || !p.capital) issues.push("prov-missing-field:" + p.id);
        if (ids[p.id]) issues.push("prov-dup-id:" + p.id);
        ids[p.id] = true;
      });
      Object.keys(ADJACENCY).forEach(function (k) {
        if (!ids[k]) issues.push("adj-unknown:" + k);
        (ADJACENCY[k] || []).forEach(function (n) {
          if (!ids[n]) issues.push("adj-unknown-neighbor:" + k + ">" + n);
          else if ((ADJACENCY[n] || []).indexOf(k) < 0) issues.push("adj-asymmetric:" + k + ">" + n);
        });
      });
      if (PATHS.tenDash.length < 8) issues.push("tendash<8:" + PATHS.tenDash.length);
      ["dongsha", "xisha", "zhongsha", "nansha"].forEach(function (k) {
        if (!PATHS.islands[k]) issues.push("island-missing:" + k);
      });
      if (!PATHS.diaoyu || !PATHS.diaoyu.point) issues.push("diaoyu-missing");
      if (!PATHS.hkmo || PATHS.hkmo.length !== 2) issues.push("hkmo!=2");
      return { ok: issues.length === 0, issues: issues };
    }
  };
})();
