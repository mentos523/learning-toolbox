/* ============================================================
 * 学习工具箱 · 地理 · 气候站点表（G4 climate-chart 判读数据）
 *
 * 12 站点覆盖 12 个气候类型（逐站温带-降水两步判定见各站
 * computedZone / climateTypeId）。temp[12] 为 1–12 月月均温（℃），
 * precip[12] 为 1–12 月降水量（mm），数组顺序均为 1 月起。
 *
 * 数据口径（GEO-R16 / GEO-R52 / GEO-R54）：stations[].year 必填；
 * 统计值注明来源与年份；30 年气候平均值按多年均值口径诚实
 * 表述，待核项写进 sourceNote 并列入 README 待补清单。
 *
 * 冻结字段（§十四 B8 转交项）：id / name / temp / precip / year /
 *  dataKind / source / computedZone / climateTypeId。
 * 补充字段（非冻结）：lat / lon / altitude / country / sourceNote /
 *  boundaryNote / needsRuling / expectedType / isPlateau。
 *
 * 核验日期：2026-10-17（全部逐站经公开网页检索核验）。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};
window.GEOGRAPHY_DATA.climateStations = {
  dataVersion: "2026.10.17",
  verifiedOn: "2026-10-17",
  stations: [
    {
      id: "singapore",
      name: "新加坡",
      country: "新加坡",
      lat: 1.35, lon: 103.82,
      temp: [26.8, 27.3, 27.8, 28.2, 28.6, 28.5, 28.2, 28.1, 28.0, 27.9, 27.2, 26.8],
      precip: [221.6, 105.1, 151.7, 164.3, 164.3, 135.3, 146.6, 146.9, 124.9, 168.3, 252.3, 331.9],
      year: "1991–2020",
      dataKind: "30 年气候平均值",
      source: "新加坡国家环境局 NEA（经 weather.gov.sg 气候页）",
      computedZone: "热带",
      climateTypeId: "tropical-rainforest"
    },
    {
      id: "bamako",
      name: "巴马科",
      country: "马里",
      lat: 12.64, lon: -8.0,
      temp: [24.8, 27.4, 30.9, 32.7, 32.0, 29.2, 26.0, 25.1, 25.7, 27.2, 27.5, 25.2],
      precip: [1, 0, 2, 7, 30, 91, 204, 261, 169, 49, 1, 0],
      year: "1991–2021",
      dataKind: "气候平均值（二级融合数据）",
      source: "en.climate-data.org（二级来源）",
      sourceNote: "该页未明示基准期，暂按站点标准惯例标注 1991–2021；建议后续替换为马里气象局官方值。见 README 待补清单。",
      computedZone: "热带",
      climateTypeId: "tropical-savanna"
    },
    {
      id: "mumbai",
      name: "孟买",
      country: "印度",
      lat: 18.93, lon: 72.83,
      temp: [25.5, 27.5, 28.1, 29.5, 31.8, 32.2, 28.6, 28.2, 29.0, 31.3, 30.4, 28.2],
      precip: [0.2, 0.2, 0.1, 0.1, 7.3, 526.3, 919.9, 560.8, 383.5, 91.3, 11.0, 1.6],
      year: "1991–2020",
      dataKind: "30 年气候平均值（Colaba 站月均温由日最高/最低均值合成）",
      source: "印度气象局 IMD（经 Wikipedia \"Climate of Mumbai\" 转引）",
      computedZone: "热带",
      climateTypeId: "tropical-monsoon"
    },
    {
      id: "dubai",
      name: "迪拜",
      country: "阿联酋",
      lat: 25.2, lon: 55.3,
      temp: [19.9, 21.2, 23.6, 27.8, 31.9, 34.0, 35.8, 35.9, 33.6, 30.3, 25.9, 21.9],
      precip: [20.8, 9.9, 21.7, 3.3, 0.1, 0.0, 1.1, 0.0, 0.0, 1.5, 5.9, 14.8],
      year: "1991–2020",
      dataKind: "30 年气候平均值（迪拜国际机场站；极小雨量按 1 位小数舍入）",
      source: "迪拜气象局 / NOAA（经 Wikipedia \"Climate of Dubai\" 转引）",
      computedZone: "热带",
      climateTypeId: "tropical-desert"
    },
    {
      id: "wuhan",
      name: "武汉",
      country: "中国",
      lat: 30.6, lon: 114.3,
      temp: [4, 6, 11, 17, 22, 26, 29, 28, 24, 18, 12, 6],
      precip: [45, 60, 90, 130, 170, 220, 190, 120, 80, 70, 50, 35],
      year: "2020",
      dataKind: "示例年值（非多年平均）",
      source: "docs/geography-interactions.md G4 示例",
      sourceNote: "原始气象出处待补；建议替换为中国气象局 1991–2020 气候值或指定年份实测。见 README 待补清单。",
      computedZone: "亚热带",
      climateTypeId: "subtropical-monsoon"
    },
    {
      id: "rome",
      name: "罗马",
      country: "意大利",
      lat: 41.9, lon: 12.5,
      temp: [7.2, 7.8, 10.6, 13.8, 17.9, 22.5, 25.2, 25.4, 21.1, 17.1, 12.6, 8.5],
      precip: [67, 75, 77, 83, 60, 34, 24, 23, 84, 122, 135, 94],
      year: "1991–2021",
      dataKind: "气候平均值（二级融合数据）",
      source: "en.climate-data.org（二级来源；页面标注基准期 1991–2021）",
      sourceNote: "建议后续替换为意大利官方气象部门 1991–2020 气候值。见 README 待补清单。",
      computedZone: "亚热带",
      climateTypeId: "mediterranean"
    },
    {
      id: "london",
      name: "伦敦",
      country: "英国",
      lat: 51.5, lon: -0.45,
      temp: [5.6, 5.8, 7.9, 10.5, 13.7, 16.8, 19.0, 18.7, 15.9, 12.3, 8.4, 5.9],
      precip: [58.8, 45.0, 38.8, 42.3, 45.9, 47.3, 45.8, 52.8, 49.6, 65.1, 66.6, 57.1],
      year: "1991–2020",
      dataKind: "30 年气候平均值（Heathrow 站）",
      source: "英国气象局 Met Office（经 Wikipedia \"Heathrow Airport weatherbox\" 模板转引）",
      computedZone: "亚热带（口诀直读；1 月均温 5.6℃ 落在 0–15℃ 区间）",
      expectedType: "温带海洋性气候",
      climateTypeId: "temperate-oceanic",
      boundaryNote: "口诀已知例外：本类型按分布（40°–60° 大陆西岸）与成因（西风 + 暖流）定为温带，G4 判定时看分布与成因，不以单月均温为据。待地理专家队书面裁决（B8）。",
      needsRuling: true
    },
    {
      id: "beijing",
      name: "北京",
      country: "中国",
      lat: 39.9, lon: 116.4,
      temp: [-3, 0, 8, 15, 21, 26, 28, 26, 21, 14, 6, -1],
      precip: [3, 5, 10, 20, 35, 80, 180, 160, 50, 20, 8, 3],
      year: "2020",
      dataKind: "示例年值（非多年平均）",
      source: "docs/geography-interactions.md G4 示例",
      sourceNote: "原始气象出处待补；建议替换为中国气象局 1991–2020 气候值或指定年份实测。见 README 待补清单。",
      computedZone: "温带",
      climateTypeId: "temperate-monsoon"
    },
    {
      id: "urumqi",
      name: "乌鲁木齐",
      country: "中国",
      lat: 43.8, lon: 87.6,
      temp: [-12.2, -8.9, 0.4, 11.5, 17.3, 22.4, 24.2, 22.9, 17.2, 8.8, -0.9, -9.2],
      precip: [19.0, 13.6, 18.8, 38.3, 41.3, 48.8, 35.4, 30.4, 29.8, 23.8, 23.7, 25.3],
      year: "1991–2020",
      dataKind: "30 年气候平均值",
      source: "中国气象局 CMA（经 Wikipedia \"Ürümqi\" 转引）",
      computedZone: "温带",
      climateTypeId: "temperate-continental"
    },
    {
      id: "utqiagvik",
      name: "乌特恰维克（巴罗）",
      country: "美国（阿拉斯加）",
      lat: 71.3, lon: -156.8,
      temp: [-25.2, -27.7, -26.2, -19.0, -7.1, 1.1, 4.1, 3.3, -0.8, -10.3, -18.7, -24.0],
      precip: [3.3, 3.6, 2.3, 4.1, 4.6, 8.1, 24.9, 26.7, 18.3, 10.4, 5.3, 3.6],
      year: "气温 1971–2000；降水基准期未明示",
      dataKind: "气候平均值（气温为 NOAA 30 年气候值由 °F 换算；降水为二级来源由英寸换算，1 位小数）",
      source: "气温：美国 NOAA NCDC（经 1999 年气候年报镜像转引）；降水：usclimatedata.com（二级来源）",
      sourceNote: "降水为二级来源、基准期未明示，待替换为 NOAA 官方月降水气候值。见 README 待补清单。",
      computedZone: "寒带",
      climateTypeId: "tundra"
    },
    {
      id: "amundsen-scott",
      name: "阿蒙森-斯科特站（南极点）",
      country: "南极洲",
      lat: -90, lon: 0, altitude: 2835,
      temp: [-28.1, -40.7, -53.6, -57.4, -57.7, -58.1, -60.2, -59.7, -58.9, -50.9, -37.2, -27.3],
      precip: [0.3, 0.6, 0.2, 0.1, 0.2, 0.1, 0.0, 0.0, 0.1, 0.1, 0.1, 0.3],
      year: "近年气候值（基准期待核）",
      dataKind: "气候平均值（二级转引）",
      source: "NOAA（经 Wikipedia \"Amundsen–Scott South Pole Station\" 转引）",
      sourceNote: "降水年总量（气候表约 2.3mm）与条目正文「年降水约 25mm」表述有出入，暂取气候表值，待核 NOAA 原始值。气温基准期未明示，待核。见 README 待补清单。",
      computedZone: "寒带",
      climateTypeId: "icecap"
    },
    {
      id: "lhasa",
      name: "拉萨",
      country: "中国",
      lat: 29.7, lon: 91.1, altitude: 3650,
      temp: [-0.1, 2.7, 6.2, 9.3, 13.3, 16.8, 16.6, 16.0, 14.4, 10.0, 4.3, 0.4],
      precip: [0.9, 1.0, 3.7, 8.5, 30.3, 84.8, 140.6, 127.5, 58.2, 6.9, 0.9, 0.5],
      year: "1991–2020",
      dataKind: "30 年气候平均值（WMO 标准气候值，55591 拉萨站，海拔 3650m）",
      source: "日本气象厅 JMA ClimatView",
      computedZone: "温带（口诀直读）",
      expectedType: "高原山地气候",
      climateTypeId: "plateau-mountain",
      isPlateau: true,
      boundaryNote: "高原山地气候看海拔，口诀之外（T5 / GEO-R14）。本例供 G4 讲「口诀的例外：看分布、看成因、看海拔」用。"
    }
  ]
};
