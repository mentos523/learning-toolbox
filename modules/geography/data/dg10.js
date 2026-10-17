/* ============================================================
 * 学习工具箱 · 地理 · 第十章数据（dg10 中国的自然资源）
 *
 * 章 dg10 中国的自然资源：5 课 12 页（每课 p1 讲解 + p2 交互 +
 * p3 收官；2 页课 p2 交互兼收官）。
 * 单元：dg10.1 土地资源（自然资源概况/土地资源），
 *       dg10.2 水资源与海洋资源（水资源/海洋资源/小结）。
 * prereq 链：dg09 小结 → 自然资源概况 → 土地资源 →
 *             水资源 → 海洋资源 → 全章。
 *
 * 真值来源（优先级，见真值口径 §0.1）：
 *  ① params（本文件即 params：耕地红线/南水北调通水年份/海洋权益
 *      宽度均注明年份与口径，见各页 point）；
 *  ② 同页文案；③ curriculum 红线四辨析；④ pedagogy 第九章/T 系列；
 *  ⑤ 真值口径 GEO-R01–R57/GEO-AX01 + 书面裁决。
 *
 * GEO-R51 跨模块引用核查（本批）：
 *  dg10.1.1 课表"代数 ch00 比值（人均=总量/人口，比值思维，奠基）"——
 *  批 3 已证伪：代数 ch00 全章"从算术到代数"无"比值"概念奠基
 *  （grep 全库零命中）。故**不得挂虚假奠基引用**；本课课内直观定义
 *  "人均 = 总量 ÷ 人口"，不挂任何 mathlink/跨科链。本批零跨科标注、
 *  零 mathlink/physicslink（写完后全仓 grep 核验：无 ch0/p0/#r= 残留）。
 *
 * 地图诚实（GEO-RULING-2026-10-17-08 国界审定书执行）：
 *  本批 3 个 geo-map 页按资产实际定级——
 *  B 级（landuse / water-transfer：主题要素图，底图带省界叠加，
 *    执行 B–E 全部条文；西线为规划线，用虚线区别于已建成的东/中线）；
 *  A 级（marine：中国海域政区要素图，执行 B–E 全部条文，
 *    海域带为示意带、非精确比例，不表达实际划界）。
 *  数据侧不再写 declare 字段（防角落小字重复渲染），冻结文案由
 *  widget 按资产 grade 自动渲染（A/B 级 E.2、C 级 E.3）。
 *  本批三页均为 A/B 级，残留的 params.mapLevel: "C" 已删。
 *  assetId 为本队定义的语义 ID，实际矢量资产路径由地图队映射落地。
 *
 * 首现术语当页定义（硬门禁⑧）：自然资源、可再生/非可再生资源
 * （dg10.1.1）、领海/专属经济区/休渔期（dg10.2.2）。
 *
 * 记录键：geog_<类型>_<页id>（与批 1–4 同方案；运行时自动加 ltb-geo-
 * 前缀，老键由 migrateLegacyRecords 迁移，不另起前缀）。
 *
 * 数据口径（GEO-R52/R54）：耕地红线 18 亿亩（2006 年《全国土地利用
 * 总体规划纲要》确立并延续至今；第三次全国国土调查 2021 年 8 月公布：
 * 全国耕地 19.14 亿亩）；南水北调东线一期 2013 年 11 月通水、中线一期
 * 2014 年 12 月通水、西线尚未开工；海洋权益宽度：领海 12 海里、毗连区
 * 24 海里、专属经济区 200 海里（《联合国海洋法公约》口径）；海洋国土
 * 约 300 万平方千米（我国主张管辖海域面积，教材口径）。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};
window.GEOGRAPHY_DATA["dg10"] = {
  id: "dg10",
  units: [
    {
      id: "dg10.1",
      title: "土地资源",
      lessons: [
        /* ============ dg10.1.1 自然资源概况（2 页） ============ */
        {
          id: "dg10.1.1",
          title: "自然资源概况",
          prereq: "dg09 小结",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg10.1.1-p1",
              kind: "explain",
              title: "自然资源：可再生与非可再生",
              exploreTip: "阳光用不完，煤炭用一点少一点：先分类，再看我国“总量丰富、人均不足”的国情。",
              blocks: [
                { type: "lead", text: "自然资源（首现即定义）：自然界中对人类有利用价值的物质和能量。先分类，再看国情。" },
                { type: "text", html: "<strong>两类</strong>（首现即定义）：<strong>可再生资源</strong>—在短时间内能再生或循环利用的（阳光、水、森林、草地）；<strong>非可再生资源</strong>—形成极慢、用一点少一点的（煤炭、石油、天然气、矿产）。" },
                { type: "text", html: "<strong>我国资源国情</strong>：<strong>总量丰富、人均不足</strong>。人均 = 总量 ÷ 人口：总量大，但 14 亿人一分，人均就少了。直观理解，不挂公式奠基。" },
                { type: "trap", text: "⚠️ 大坑：“可再生 = 用不完”——错！只有合理利用才是可再生：超载利用，森林会退化、草地会沙化、水会被污染。可再生是有条件的（审计清单第 8 条）。" },
                { type: "slogan", text: "分类看再生，国情总量人均。" }
              ],
              point: "自然资源：可再生（阳光/水/森林）vs 非可再生（煤/油/气）；我国总量丰富、人均不足（人均 = 总量 ÷ 人口，直观定义）；可再生≠用不完，合理利用才可再生。"
            },
            /* ================= p2：交互页（分类闯关 + 收官） ================= */
            {
              id: "dg10.1.1-p2",
              kind: "interact",
              title: "闯关：资源分类",
              exploreTip: "8 种资源，逐个判：可再生还是非可再生？判完答收官题。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "阳光是？",
                    options: ["可再生资源", "非可再生资源"],
                    answer: 0,
                    recordKey: "geog_quiz_dg10.1.1-p2a",
                    explain: "阳光短时间内可循环利用 → 可再生。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "煤炭是？",
                    options: ["可再生资源", "非可再生资源"],
                    answer: 1,
                    recordKey: "geog_quiz_dg10.1.1-p2b",
                    explain: "煤炭形成要上亿年，用一点少一点 → 非可再生。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "森林（合理采伐、及时补种）是？",
                    options: ["非可再生资源", "可再生资源"],
                    answer: 1,
                    recordKey: "geog_quiz_dg10.1.1-p2c",
                    explain: "合理利用 → 可再生；超载砍伐 → 退化。条件是关键。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "石油、天然气是？",
                    options: ["非可再生资源", "可再生资源"],
                    answer: 0,
                    recordKey: "geog_quiz_dg10.1.1-p2d",
                    explain: "化石能源都是非可再生：形成极慢。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于我国资源国情，正确的是？",
                    options: ["总量人均都丰富", "总量丰富、人均不足", "总量不足、人均丰富"],
                    answer: 1,
                    recordKey: "geog_quiz_dg10.1.1-p2e",
                    explain: "人均 = 总量 ÷ 人口：14 亿人一分，人均就少了。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "5 道闯关题：4 道分类 + 1 道国情。森林那题是陷阱——可再生是有条件的。" },
                { type: "text", html: "<strong>场层真值</strong>：5 题答案（见各题 params.answer）。<strong>UI 可达</strong>：逐题点选 → 即时判分 + 讲解。本课完成，下一课：土地资源。" },
                { type: "slogan", text: "分类看条件，国情看人均。" }
              ],
              point: "dg10.1.1-p2：资源分类闯关 5 题（guess-verify）+ 收官。本课完成，下一课：土地资源。"
            }
          ]
        },
        /* ============ dg10.1.2 土地资源（3 页） ============ */
        {
          id: "dg10.1.2",
          title: "土地资源",
          prereq: "自然资源概况",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg10.1.2-p1",
              kind: "explain",
              title: "土地资源：耕地红线",
              exploreTip: "我国土地类型齐全，但耕地比重小：记住 18 亿亩这条红线，看年份、看口径。",
              blocks: [
                { type: "lead", text: "我国土地资源：类型齐全（耕地、林地、草地、建设用地……），但耕地比重小——因为山地多、平地少。" },
                { type: "text", html: "<strong>问题</strong>：水土流失、荒漠化、建设占用耕地——耕地在减少。对策：<strong>珍惜和合理利用</strong>每一寸土地。" },
                { type: "text", html: "<strong>耕地红线：18 亿亩</strong>。2006 年《全国土地利用总体规划纲要》确立并延续至今的保护目标。第三次全国国土调查（2021 年 8 月公布）：全国耕地 <strong>19.14 亿亩</strong>——守住红线，数字说话。" },
                { type: "trap", text: "⚠️ 误区：“土地资源取之不尽”——错！耕地红线 18 亿亩是硬约束（2006 年确立；三调 2021 年 8 月公布 19.14 亿亩）。看土地问题，先看年份、看口径。" },
                { type: "slogan", text: "类型齐全耕地少，十八亿亩红线守。" }
              ],
              point: "土地：类型齐全、耕地比重小（山地多平地少）；问题水土流失/荒漠化/占耕地；耕地红线 18 亿亩（2006 年确立；三调 2021.8 公布 19.14 亿亩）。"
            },
            /* ================= p2：交互页（土地利用类型图） ================= */
            {
              id: "dg10.1.2-p2",
              kind: "interact",
              title: "看一看：土地利用类型",
              exploreTip: "看土地利用类型图：耕地、林地、草地都在哪？为什么耕地比重小？",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-landuse",
                    mode: "landuse",
                    types: [
                      { name: "耕地", where: "东部平原、丘陵", note: "比重小：山地多、平地少" },
                      { name: "林地", where: "东北、西南山区", note: "大小兴安岭、横断山区" },
                      { name: "草地", where: "内蒙古高原、青藏高原", note: "畜牧业基地" },
                      { name: "建设用地", where: "东部沿海城市群", note: "占用耕地是主要矛盾之一" }
                    ],
                    recordKey: "geog_geomap_dg10.1.2-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "点四种土地利用类型，看分布：耕地为什么集中在东部？林地为什么在山区？草地为什么在高原？——地形回填（dg09.1.1）。" },
                { type: "text", html: "<strong>场层真值</strong>：四类土地利用的分布（GeoBatch5.LANDUSE 冻结常量）。<strong>UI 可达</strong>：点类型 → 分布高亮 + 说明。本图为 B 级土地利用底图（含省界），国界线/十段线按审定书绘制。" },
                { type: "slogan", text: "看分布，想地形，守红线。" }
              ],
              point: "dg10.1.2-p2：土地利用类型图（geo-map landuse，B 级）。场层真值见 GeoBatch5.LANDUSE；UI 可达为点类型看分布。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg10.1.2-p3",
              kind: "interact",
              title: "收官：土地资源三问",
              exploreTip: "3 道题——类型、耕地少的原因、红线，一题一口径。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "我国耕地比重小的主要原因是？",
                    options: ["山地多、平地少", "人口少", "气候干旱"],
                    answer: 0,
                    recordKey: "geog_quiz_dg10.1.2-p3a",
                    explain: "地形回填（dg09.1.1）：山地多 → 平地少 → 耕地比重小。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "耕地红线 18 亿亩的确立时间与现状是？",
                    options: ["1990 年确立；现状未知", "2021 年首次提出；全国耕地 18 亿亩整", "2006 年确立并延续至今；三调（2021 年 8 月公布）全国耕地 19.14 亿亩"],
                    answer: 2,
                    recordKey: "geog_quiz_dg10.1.2-p3b",
                    explain: "2006 年《全国土地利用总体规划纲要》确立；三调 19.14 亿亩——看年份、看口径。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "当前土地利用的主要问题不包括？",
                    options: ["建设占用耕地", "耕地面积持续大幅增加", "水土流失"],
                    answer: 1,
                    recordKey: "geog_quiz_dg10.1.2-p3c",
                    explain: "问题是耕地减少：水土流失、荒漠化、占用耕地。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验类型分布、耕地少的原因、红线口径记牢了没有。" },
                { type: "text", html: "下一课 dg10.2.1：土地说完了，说水——南多北少、夏秋多冬春少，怎么调。" },
                { type: "slogan", text: "带走一句话：红线是硬约束，口径看年份。" }
              ],
              point: "dg10.1.2 完成。下一课：水资源。"
            }
          ]
        }
      ]
    },
    {
      id: "dg10.2",
      title: "水资源与海洋资源",
      lessons: [
        /* ============ dg10.2.1 水资源（3 页） ============ */
        {
          id: "dg10.2.1",
          title: "水资源",
          prereq: "土地资源",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg10.2.1-p1",
              kind: "explain",
              title: "水资源：南水北调",
              exploreTip: "我国水资源南多北少、夏秋多冬春少：缺水怎么办？三线调水，各有分工。",
              blocks: [
                { type: "lead", text: "我国水资源时空分布不均：南多北少、夏秋多冬春少。缺水的原因：自然（分布不均）+ 人为（浪费、污染）。" },
                { type: "text", html: "<strong>南水北调</strong>：把南方丰沛的水调往缺水的北方——东线、中线、西线三线。<strong>东线一期</strong> 2013 年 11 月通水（供苏北、山东），<strong>中线一期</strong> 2014 年 12 月通水（供京津冀豫），<strong>西线</strong>尚在规划、未开工。" },
                { type: "text", html: "<strong>节约用水</strong>：调水是“开源”，节水是“节流”——农业节水灌溉、工业循环用水、生活节约用水。" },
                { type: "trap", text: "⚠️ 误区：“南水北调把南方水全调走”——错！是优化配置：三线各有分工、按需调配，南方用水不受影响。记住通水年份：东线 2013、中线 2014。" },
                { type: "slogan", text: "三线调水各有分工，开源节流一起抓。" }
              ],
              point: "水资源：南多北少、夏秋多冬春少；缺水原因自然+人为；南水北调东/中/西三线（东线一期 2013.11 通水、中线一期 2014.12 通水、西线未开工）；节约用水。"
            },
            /* ================= p2：交互页（南水北调三线） ================= */
            {
              id: "dg10.2.1-p2",
              kind: "interact",
              title: "看一看：南水北调三线",
              exploreTip: "看三线走向：东线走京杭运河，中线从丹江口水库北上，西线还在规划——各供哪里？",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-watertransfer",
                    mode: "water-transfer",
                    lines: [
                      { name: "东线", route: "长江下游 → 京杭大运河 → 苏北、山东", status: "一期 2013 年 11 月通水" },
                      { name: "中线", route: "丹江口水库 → 京津冀豫", status: "一期 2014 年 12 月通水" },
                      { name: "西线", route: "长江上游 → 黄河上游（西北）", status: "规划中，尚未开工" }
                    ],
                    recordKey: "geog_geomap_dg10.2.1-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "点三条线，看走向和供水区：东线沿京杭运河北上，中线从丹江口水库出发，西线还是规划中的虚线。记住：三线各有分工，不是“一根管子全调走”。" },
                { type: "text", html: "<strong>场层真值</strong>：三线走向、供水区与通水状态（GeoBatch5.WATER_TRANSFER 冻结常量，通水年份见本页文案）。<strong>UI 可达</strong>：点线 → 走向 + 供水区读数。本图为 B 级南水北调底图（含省界），国界线/十段线按审定书绘制。" },
                { type: "slogan", text: "三线各有分工，调水优化配置。" }
              ],
              point: "dg10.2.1-p2：南水北调三线示意（geo-map water-transfer，B 级）。场层真值见 GeoBatch5.WATER_TRANSFER；UI 可达为点线看走向供水区。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg10.2.1-p3",
              kind: "interact",
              title: "收官：水资源三问",
              exploreTip: "3 道题——分布、调水、节水，一题一对策。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "我国水资源时空分布的特点是？",
                    options: ["全国均匀", "南多北少、夏秋多冬春少", "北多南少、冬春多夏秋少"],
                    answer: 1,
                    recordKey: "geog_quiz_dg10.2.1-p3a",
                    explain: "跟着季风走：南方雨季长水多，北方少。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "南水北调中线一期通水时间与供水区是？",
                    options: ["2013 年 11 月通水，供苏北山东", "尚未开工", "2014 年 12 月通水，供京津冀豫"],
                    answer: 2,
                    recordKey: "geog_quiz_dg10.2.1-p3b",
                    explain: "东线一期 2013.11（苏北山东），中线一期 2014.12（京津冀豫），西线未开工。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "解决缺水问题，正确的思路是？",
                    options: ["只靠调水", "只靠节水", "开源（调水）+ 节流（节水）一起抓"],
                    answer: 2,
                    recordKey: "geog_quiz_dg10.2.1-p3c",
                    explain: "调水是优化配置，节水是根本：农业节水灌溉、工业循环、生活节约。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验分布规律、三线口径、开源节流记牢了没有。" },
                { type: "text", html: "下一课 dg10.2.2：从江河到海洋——300 万平方千米的海洋国土，领海和专属经济区不是一回事。" },
                { type: "slogan", text: "带走一句话：调水是配置，节水是根本。" }
              ],
              point: "dg10.2.1 完成。下一课：海洋资源。"
            }
          ]
        },
        /* ============ dg10.2.2 海洋资源（2 页） ============ */
        {
          id: "dg10.2.2",
          title: "海洋资源",
          prereq: "水资源",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg10.2.2-p1",
              kind: "explain",
              title: "海洋资源：蓝色国土",
              exploreTip: "300 万平方千米的海洋国土：领海、专属经济区，宽度不同，权利不同——概念别混。",
              blocks: [
                { type: "lead", text: "我国主张管辖的海域面积约 300 万平方千米（教材口径）——蓝色国土。海洋资源：渔业、油气、旅游、港口。" },
                { type: "text", html: "<strong>海洋权益</strong>（首现即定义）：<strong>领海</strong>—12 海里，沿海国享有<strong>主权</strong>；<strong>毗连区</strong>—24 海里；<strong>专属经济区</strong>—200 海里，沿海国享有<strong>主权权利</strong>（勘探开发自然资源）；还有<strong>大陆架</strong>。宽度与权利配套记。" },
                { type: "text", html: "<strong>休渔期</strong>（首现即定义）：为保护渔业资源，每年规定一段禁止捕捞的时期——合理利用海洋渔业资源的制度。" },
                { type: "trap", text: "⚠️ 大坑：“专属经济区 = 领海”——错！领海是主权（12 海里），专属经济区是主权权利（200 海里）。概念不同，权利不同（审计清单第 9 条）。" },
                { type: "slogan", text: "十二领海二百专属，主权权利要分清。" }
              ],
              point: "海洋：约 300 万 km² 主张管辖海域（教材口径）；领海 12 海里（主权）/毗连区 24 海里/专属经济区 200 海里（主权权利）；渔业/油气/旅游/港口；休渔期。"
            },
            /* ================= p2：交互页（海洋权益 + 收官） ================= */
            {
              id: "dg10.2.2-p2",
              kind: "interact",
              title: "看一看：海洋权益示意",
              exploreTip: "从海岸线向外看：12 海里、24 海里、200 海里，三圈权利各不同——点圈看定义。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-marine",
                    mode: "marine",
                    zones: [
                      { name: "领海", width: "12 海里", right: "主权" },
                      { name: "毗连区", width: "24 海里", right: "管制权（海关/财政/移民/卫生）" },
                      { name: "专属经济区", width: "200 海里", right: "主权权利（勘探开发自然资源）" }
                    ],
                    recordKey: "geog_geomap_dg10.2.2-p2"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "专属经济区的宽度与权利是？",
                    options: ["24 海里，主权", "12 海里，主权", "200 海里，主权权利"],
                    answer: 2,
                    recordKey: "geog_quiz_dg10.2.2-p2a",
                    explain: "200 海里 + 主权权利 ≠ 领海（12 海里 + 主权）。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "休渔期制度的目的是？",
                    options: ["发展海洋旅游", "增加捕捞量", "保护渔业资源，合理利用"],
                    answer: 2,
                    recordKey: "geog_quiz_dg10.2.2-p2b",
                    explain: "可再生≠用不完：休渔期是合理利用的制度（dg10.1.1 回填）。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "点三个圈，看宽度和权利：12 海里领海（主权）、24 海里毗连区、200 海里专属经济区（主权权利）。看完答两道收官题。" },
                { type: "text", html: "<strong>场层真值</strong>：三圈宽度与权利（GeoBatch5.MARINE 冻结常量，《联合国海洋法公约》口径）。<strong>UI 可达</strong>：点圈 → 宽度 + 权利读数。本图为 A 级海域要素图，国界线/十段线/南海四群岛按审定书绘制；海域带为示意带，不表达实际划界。" },
                { type: "slogan", text: "三圈三权利，宽度配套记。" }
              ],
              point: "dg10.2.2-p2：海洋权益示意（geo-map marine，A 级）+ 收官两问。本课完成，下一课：本章小结。"
            }
          ]
        },
        /* ============ dg10.2.3 本章小结与习题（2 页） ============ */
        {
          id: "dg10.2.3",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：小结页 ================= */
            {
              id: "dg10.2.3-p1",
              kind: "explain",
              title: "小结：资源三问",
              exploreTip: "一章串成三问：有什么？够不够？怎么办？",
              blocks: [
                { type: "lead", text: "本章三问：① 有什么——自然资源分可再生/非可再生；② 够不够——总量丰富、人均不足（土地耕地比重小、水南多北少）；③ 怎么办——珍惜合理利用：守耕地红线、调水+节水、休渔期。" },
                { type: "text", html: "<strong>易错清单</strong>（本章 trap 回顾）：可再生 = 用不完 ×→ 合理利用才可再生；土地取之不尽 ×→ 18 亿亩红线；南水北调把南方水全调走 ×→ 优化配置三线分工；专属经济区 = 领海 ×→ 主权权利 vs 主权。" },
                { type: "text", html: "<strong>数据口径登记</strong>：18 亿亩（2006 年确立；三调 2021.8 公布 19.14 亿亩）；东线一期 2013.11、中线一期 2014.12 通水；领海 12/专属经济区 200 海里；海洋国土约 300 万 km²（教材口径）。看数量，先问年份和口径。" },
                { type: "slogan", text: "三问串一章，合理利用是答案。" }
              ],
              point: "dg10 小结：有什么/够不够/怎么办三问；易错四项；数据口径登记（年份+来源）。"
            },
            /* ================= p2：综合习题页 ================= */
            {
              id: "dg10.2.3-p2",
              kind: "interact",
              title: "综合习题：自然资源",
              exploreTip: "4 道综合题，覆盖分类、土地、水、海洋。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "下列属于可再生资源的是？（合理利用前提下）",
                    options: ["石油", "森林", "煤炭"],
                    answer: 1,
                    recordKey: "geog_quiz_dg10.2.3-p2a",
                    explain: "森林合理采伐补种 → 可再生；煤、油是非可再生。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于耕地红线，表述正确的是？",
                    options: ["没有红线约束", "18 亿公顷", "18 亿亩（2006 年确立并延续至今；三调 19.14 亿亩）"],
                    answer: 2,
                    recordKey: "geog_quiz_dg10.2.3-p2b",
                    explain: "18 亿亩是硬约束；三调（2021 年 8 月公布）19.14 亿亩。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "南水北调的正确认识是？",
                    options: ["把南方水全调走", "只有一条线", "优化配置：东/中/西三线各有分工"],
                    answer: 2,
                    recordKey: "geog_quiz_dg10.2.3-p2c",
                    explain: "东线一期 2013.11、中线一期 2014.12 通水，西线未开工。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "领海与专属经济区的区别是？",
                    options: ["两者完全相同", "专属经济区 12 海里", "领海 12 海里享主权；专属经济区 200 海里享主权权利"],
                    answer: 2,
                    recordKey: "geog_quiz_dg10.2.3-p2d",
                    explain: "宽度不同、权利不同：主权 vs 主权权利。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "4 道综合题，一题一单元：分类、土地、水、海洋。" },
                { type: "text", html: "dg10 完成。批 5（dg08+dg09+dg10）课页交付完毕：53 页。" },
                { type: "slogan", text: "带走一句话：资源有限，合理利用。" }
              ],
              point: "dg10 完成。批 5 课页（dg08+dg09+dg10，53 页）交付完毕。"
            }
          ]
        }
      ]
    }
  ]
};
