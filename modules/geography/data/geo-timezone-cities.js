/* ============================================================
 * 学习工具箱 · 地理 · 时区城市表（G6 区时计算题源）
 *
 * 真值口径（truth-criteria §区时类断言）：用标准时区（不计夏令时）；
 * 北京时间 = 东八区区时（GEO-R11）；教学计算口径为整小时时区
 * （新德里 UTC+5:30 非整小时，故未入库，见 README）。
 *
 * 经度取教学用代表经度，东经为正、西经为负。
 * 覆盖：东半球 9 城、西半球 5 城；跨 180° 经线案例：苏瓦/惠灵顿
 * （东十二区）↔ 檀香山/洛杉矶（西十区/西八区），分居日界线两侧。
 *
 * 冻结字段（§十四 B7 转交项）：name / zone / lon。
 * 补充字段（非冻结）：country / note。
 *
 * 核验日期：2026-10-17（标准时区与代表经度为公开常识口径，
 *  计算示例经 UTC 验算，见 GEOGRAPHY-DATA-README.md）。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};
window.GEOGRAPHY_DATA.timezoneCities = {
  dataVersion: "2026.10.17",
  note: "标准时区，不计夏令时；经度东正西负，为教学用代表经度。",
  cities: [
    { name: "北京",     country: "中国",     lon: 116,  zone: 8,  note: "北京时间 = 东八区区时" },
    { name: "东京",     country: "日本",     lon: 140,  zone: 9 },
    { name: "曼谷",     country: "泰国",     lon: 100,  zone: 7 },
    { name: "悉尼",     country: "澳大利亚", lon: 151,  zone: 10 },
    { name: "惠灵顿",   country: "新西兰",   lon: 175,  zone: 12, note: "跨日界线案例（东十二区）" },
    { name: "苏瓦",     country: "斐济",     lon: 178,  zone: 12, note: "跨日界线案例：紧邻 180° 经线（东十二区）" },
    { name: "檀香山",   country: "美国",     lon: -157, zone: -10, note: "跨日界线案例（西十区），与苏瓦/惠灵顿分居日界线两侧" },
    { name: "洛杉矶",   country: "美国",     lon: -118, zone: -8,  note: "跨日界线案例：与苏瓦时区差 20 小时" },
    { name: "墨西哥城", country: "墨西哥",   lon: -99,  zone: -6 },
    { name: "纽约",     country: "美国",     lon: -74,  zone: -5 },
    { name: "里约热内卢", country: "巴西",   lon: -43,  zone: -3 },
    { name: "伦敦",     country: "英国",     lon: 0,    zone: 0,  note: "中时区（本初子午线）" },
    { name: "开罗",     country: "埃及",     lon: 31,   zone: 2 },
    { name: "莫斯科",   country: "俄罗斯",   lon: 37,   zone: 3 }
  ]
};
