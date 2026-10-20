/* ============================================================
 * 学习工具箱 · 地理 · 气候类型库（G4 climate-chart 判定依据）
 *
 * 真值口径（~/workspace/geo-audit/geography-truth-criteria.md）：
 *  GEO-R13 两步顺序冻结（先以温定带、再以水定型）；
 *  GEO-R14 以温定带阈值（本文件 zoneRule 逐字冻结）；
 *  GEO-R15 以水定型（年降水总量 + 季节分配）；类型徽章必须与
 *  本库一致——库外自创类型名 = FAIL。
 * 冻结口诀（§15 B7）：「以温定带、以水定型」逐字对齐。
 *
 * 类型名来源：docs/geography-curriculum.md dg03.2.2（热带四型）、
 *  dg03.2.3（亚热带二型/温带三型/极地二型）+ dg09.2.1（高原山地）。
 * 注：§十四 B8「地理专家队审定清单」尚未正式发布，本表暂以课程
 *  体系类型名为准；审定稿发布后以审定稿为准同步（见 README 待裁决项）。
 * 极地二型拆分依据：curriculum「极地气候（苔原/冰原）」。
 *
 * 字段冻结（§十四 B8 转交项）：类型名 / 温度带阈值 / 降水条件 /
 *  季节分配 / 边界句 —— 下方字段即冻结实现，改名/增删须经
 *  地理专家队书面裁决。distribution 为教学辅助字段（非冻结）。
 *
 * 季节分配枚举：全年多雨 / 夏季多雨 / 冬季多雨 / 全年少雨 /
 *  全年较均匀（增补：温带海洋性用；G4 四选一按钮是否增补
 *  「全年较均匀」待黄队/地理专家队确认，见 README）。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};
window.GEOGRAPHY_DATA.climateTypes = {
  dataVersion: "2026.10.17",
  motto: "以温定带、以水定型",
  basis: "GEO-R14 / docs/geography-curriculum.md dg03.2.2–dg03.2.3",
  seasonEnum: ["全年多雨", "夏季多雨", "冬季多雨", "全年少雨", "全年较均匀"],
  types: [
    {
      id: "tropical-rainforest",
      name: "热带雨林气候",
      zone: "热带",
      zoneRule: "最冷月均温 > 15℃",
      precipRule: "年降水一般 > 2000mm",
      season: "全年多雨",
      boundaryNote: "每月降水都多，无明显干季（最干月一般 > 60mm）。",
      distribution: "赤道附近：刚果盆地、亚马孙平原、马来群岛"
    },
    {
      id: "tropical-savanna",
      name: "热带草原气候",
      zone: "热带",
      zoneRule: "最冷月均温 > 15℃",
      precipRule: "年降水约 750–1500mm",
      season: "夏季多雨",
      boundaryNote: "干湿季分明；与热带季风气候的区别：年降水总量更少、干季更长。",
      distribution: "热带雨林南北两侧：东非高原、巴西高原"
    },
    {
      id: "tropical-monsoon",
      name: "热带季风气候",
      zone: "热带",
      zoneRule: "最冷月均温 > 15℃",
      precipRule: "年降水一般 > 1500mm",
      season: "夏季多雨",
      boundaryNote: "旱雨季分明，雨季降水高度集中；与热带草原气候的区别：年总量更大、雨季更集中。",
      distribution: "南亚、东南亚（印度半岛、中南半岛）"
    },
    {
      id: "tropical-desert",
      name: "热带沙漠气候",
      zone: "热带",
      zoneRule: "最冷月均温 > 15℃",
      precipRule: "年降水一般 < 250mm",
      season: "全年少雨",
      boundaryNote: "全年高温少雨；分布在南北回归线附近的大陆西岸与内陆（如撒哈拉、阿拉伯半岛）。",
      distribution: "撒哈拉、阿拉伯半岛、澳大利亚中西部"
    },
    {
      id: "subtropical-monsoon",
      name: "亚热带季风气候",
      zone: "亚热带",
      zoneRule: "0℃ ≤ 最冷月均温 ≤ 15℃",
      precipRule: "年降水一般 > 1000mm",
      season: "夏季多雨",
      boundaryNote: "雨热同期；夏季高温多雨、冬季温和少雨。",
      distribution: "中国东部、日本、美国东南部"
    },
    {
      id: "mediterranean",
      name: "地中海气候",
      zone: "亚热带",
      zoneRule: "0℃ ≤ 最冷月均温 ≤ 15℃",
      precipRule: "年降水约 400–1000mm",
      season: "冬季多雨",
      boundaryNote: "夏季炎热干燥、冬季温和多雨；分布在南北纬 30°–40° 大陆西岸。",
      distribution: "地中海沿岸、美国加州、智利中部、南非开普敦、澳洲西南"
    },
    {
      id: "temperate-oceanic",
      name: "温带海洋性气候",
      zone: "温带",
      zoneRule: "口诀例外（见边界句）",
      precipRule: "年降水约 600–1000mm",
      season: "全年较均匀",
      boundaryNote: "口诀已知例外：温带海洋性气候最冷月均温常落在 0–15℃（如伦敦 1 月约 5.6℃），按口诀直读为「亚热带」；本类型按分布（南北纬 40°–60° 大陆西岸）与成因（西风 + 暖流）定为温带。",
      distribution: "欧洲西部、南美南部、澳大利亚东南、新西兰"
    },
    {
      id: "temperate-monsoon",
      name: "温带季风气候",
      zone: "温带",
      zoneRule: "最冷月均温 < 0℃ 且 最热月均温 > 10℃",
      precipRule: "年降水约 400–800mm",
      season: "夏季多雨",
      boundaryNote: "雨热同期；夏季高温多雨、冬季寒冷干燥。",
      distribution: "中国北方、日本北部、朝鲜半岛"
    },
    {
      id: "temperate-continental",
      name: "温带大陆性气候",
      zone: "温带",
      zoneRule: "最冷月均温 < 0℃ 且 最热月均温 > 10℃",
      precipRule: "年降水一般 < 400mm",
      season: "全年少雨",
      boundaryNote: "冬冷夏热，气温年较差大；深居内陆，降水稀少。",
      distribution: "亚欧大陆内部、北美中部"
    },
    {
      id: "tundra",
      name: "苔原气候",
      zone: "寒带",
      zoneRule: "最热月均温 ≤ 10℃（一般 > 0℃）",
      precipRule: "年降水一般 < 250mm",
      season: "全年少雨",
      boundaryNote: "最热月 0–10℃；与冰原气候的区别：最热月是否高于 0℃。",
      distribution: "北冰洋沿岸、格陵兰沿海"
    },
    {
      id: "icecap",
      name: "冰原气候",
      zone: "寒带",
      zoneRule: "最热月均温 < 0℃",
      precipRule: "年降水极少",
      season: "全年少雨",
      boundaryNote: "终年严寒，降水稀少——「白色荒漠」。",
      distribution: "南极大陆、格陵兰内陆"
    },
    {
      id: "plateau-mountain",
      name: "高原山地气候",
      zone: "高原山地",
      zoneRule: "看海拔，口诀之外",
      precipRule: "降水随海拔与坡向变化大",
      season: null,
      boundaryNote: "高原山地气候看海拔，口诀之外。海拔显著站点（如青藏高原）不走口诀，直接定型。",
      distribution: "青藏高原、安第斯山脉"
    }
  ]
};
