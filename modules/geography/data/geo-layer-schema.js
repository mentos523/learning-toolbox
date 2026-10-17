/* ============================================================
 * 学习工具箱 · 地理 · 专题图图层字段 schema（G12 layer-stack）
 *
 * 真值口径（docs/geography-interactions.md G12 schema；§十四 B12
 * 转交项）：图层字段名冻结；单区域图层 ≤ 6 层；同时可见 ≤ 3 层
 * （GEO-R14 相关冻结项见 climate 表，本文件冻结图层结构）。
 *
 * 冻结字段：id / name / kind / visible / dataRef —— 改名/增删须经
 *  地理专家队书面裁决。本文件同时冻结：
 *   kindEnum（terrain 地形 / climate 气候 / river 河流 / pop 人口 /
 *     traffic 交通 / industry 产业，G12 spec 枚举逐字一致）
 *   MAX_VISIBLE = 3（同时可见 ≤ 3 层）
 *   MAX_LAYERS_PER_REGION = 6（单区域图层 ≤ 6 层）
 *
 * dataRef 约定：「区域 id:图层数据 id」字符串；指向构建时内嵌
 *  的图层数据键（本表只冻结字段名，不冻结引用格式细节，后续
 *  批次按此约定供数）。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};
window.GEOGRAPHY_DATA.layerSchema = {
  dataVersion: "2026.10.17",
  frozenFields: ["id", "name", "kind", "visible", "dataRef"],
  kindEnum: [
    { id: "terrain",  name: "地形" },
    { id: "climate",  name: "气候" },
    { id: "river",    name: "河流" },
    { id: "pop",      name: "人口" },
    { id: "traffic",  name: "交通" },
    { id: "industry", name: "产业" }
  ],
  maxVisible: 3,
  maxLayersPerRegion: 6,
  dataRefConvention: "「区域 id:图层数据 id」字符串，指向构建时内嵌的图层数据键",
  regions: [
    {
      id: "qlhuai",
      name: "秦岭—淮河线两侧",
      note: "六层预设（G12 spec），默认只开两层；单区域 ≤ 6 层、同时可见 ≤ 3 层",
      layers: [
        { id: "temp",   name: "1 月 0℃ 等温线",     kind: "climate",  visible: true,  dataRef: "qlhuai:jan0c-isotherm" },
        { id: "precip", name: "800mm 年等降水量线", kind: "climate",  visible: true,  dataRef: "qlhuai:800mm-isohyet" },
        { id: "zone",   name: "温度带界线",         kind: "climate",  visible: false, dataRef: "qlhuai:zone-boundary" },
        { id: "humid",  name: "干湿区界线",         kind: "climate",  visible: false, dataRef: "qlhuai:humid-boundary" },
        { id: "farm",   name: "水田/旱地",          kind: "industry", visible: false, dataRef: "qlhuai:farm-type" },
        { id: "crop",   name: "水稻/小麦",          kind: "industry", visible: false, dataRef: "qlhuai:crop-type" }
      ],
      thoughtExp: null
    },
    {
      id: "wuhan",
      name: "武汉及长江中游",
      note: "「一城讲全书」案例区（curriculum 红线：武汉优先、不垄断）；thoughtExp 示例见 G12 spec",
      layers: [],
      thoughtExp: {
        offLayer: "river",
        question: "关掉河流层，你还能判断武汉在哪吗？",
        hint: "想想还有哪些图层能定位它"
      }
    }
  ]
};
