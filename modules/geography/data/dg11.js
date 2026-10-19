/* ============================================================
 * 学习工具箱 · 地理 · 第十一章数据（dg11 中国的经济与文化）
 *
 * 章 dg11 中国的经济与文化：5 课 14 页（每课 p1 讲解 + p2 交互 +
 * p3 收官；2 页课 p2 交互兼收官）。
 * 单元：dg11.1 农业与工业（农业/工业），
 *       dg11.2 交通运输与文化旅游（交通运输/文化与旅游/小结）。
 * prereq 链：dg10 小结 → 农业 → 工业 → 交通运输 → 文化与旅游 → 全章。
 *
 * 真值来源（优先级，见真值口径 §0.1）：
 *  ① params（本文件即 params：农业类型分区/工业基地/铁路干线/
 *      戏曲配对均逐字引人教版八下教材口径，见各页 point）；
 *  ② 同页文案；③ curriculum 红线四辨析；④ pedagogy 第九章/T 系列；
 *  ⑤ 真值口径 GEO-R01–R57/GEO-AX01 + 书面裁决。
 *
 * GEO-R51 跨模块引用核查（本批逐条执行）：
 *  本章课表无跨科标注；回填均为本学科内回填（dg01.2.2/dg08/dg10/
 *  dg11.1.1），目标课均已上线，grep 实测存在。
 *
 * 图件定级（GEO-RULING-2026-10-17-08 §四.3 过渡带类页面先例）：
 *  本章 thematic-map 三 theme（agri/industry/railway）底图均为
 *  C 级剪影（中国全境轮廓，不叠加省界/国界线/十段线；台湾岛、
 *  海南岛单独绘制不可缺），角落冻结文案 E.3
 *  「示意｜非精确比例｜方向仅供参考」由渲染器自动渲染；
 *  专题叠加（农业分区/工业基地点/铁路走向）为教学示意，
 *  非精确界线/走向（GEO-AX01 当页显性化）。
 *  本章无新增涉国界/省界矢量几何，不触发 -08 审定签发流程。
 *
 * 首现术语当页定义（硬门禁⑧）：耕地类型水田/旱地（dg11.1.1）、
 * 工业基地（dg11.1.2）、客运专线（dg11.2.1）、世界遗产（dg11.2.2）。
 *
 * 记录键：geog_<类型>_<页id>（与批 1–5 同方案；运行时自动加 ltb-geo-
 * 前缀，老键由 migrateLegacyRecords 迁移，不另起前缀）。本批 21 个，
 * 全唯一（见文件尾“记录键清单”）。
 *
 * 政治红线：本章无政区要素图；港澳台表述不出现。
 * 数据时效（GEO-R52）："第一/最大"类表述注明人教版口径（GEO-R56），
 * 不确定的数写"约"（GEO-R54）。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};
window.GEOGRAPHY_DATA["dg11"] = {
  id: "dg11",
  units: [
    {
      id: "dg11.1",
      title: "农业与工业",
      lessons: [
        /* ============ dg11.1.1 农业（3 页） ============ */
        {
          id: "dg11.1.1",
          title: "农业",
          prereq: "dg10 小结",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg11.1.1-p1",
              kind: "explain",
              title: "农业：因地制宜",
              exploreTip: "一方水土养一方人：为什么南方种水稻、北方种小麦、西部搞畜牧？先看自然条件。",
              blocks: [
                { type: "lead", text: "农业是国民经济的基础。我国农业分四大型：种植业、畜牧业、林业、渔业——它们长在哪里，全由自然条件说了算，这叫“因地制宜”。" },
                { type: "text", html: "<strong>种植业</strong>：东部季风区。<strong>耕地类型</strong>（首现即定义：水田是长期人工灌溉的水耕地，旱地是靠天然降水种植的耕地）——<strong>秦岭—淮河以南</strong>水田（水稻、油菜）、<strong>以北</strong>旱地（小麦、玉米、大豆）。注意：南北之间有<strong>过渡带</strong>，不是一刀切（尺度！）。" },
                { type: "text", html: "<strong>畜牧业</strong>：西部、北部降水少、草原广布 → <strong>四大牧区</strong>：内蒙古牧区、新疆牧区、青海牧区、西藏牧区。" },
                { type: "text", html: "<strong>林业</strong>：东北林区（大兴安岭、小兴安岭、长白山）、西南林区（横断山区）——山地气候湿润，宜林；另有东南人工林区。<strong>渔业</strong>：东部沿海海洋渔业（<strong>舟山渔场是我国最大的渔场</strong>，人教版口径）＋长江中下游、珠江三角洲淡水渔业。" },
                { type: "trap", text: "⚠️ 大坑：“南方水田/北方旱地是绝对分界”——错！秦岭—淮河是渐变带的中心线，两侧有过渡带（GEO-AX01）。因果链别颠倒：是自然条件决定农业类型（地形→气候→农业，GEO-R40），不是反过来。" },
                { type: "slogan", text: "南水田北旱地，西牧东渔因地制宜。" }
              ],
              point: "农业：种植业（秦岭—淮河以南水田水稻、以北旱地小麦，过渡带存在）；畜牧业（内蒙古/新疆/青海/西藏四大牧区）；林业（东北/西南天然林区）；渔业（舟山渔场最大，人教版口径）；总纲：因地制宜（自然→农业，GEO-R40）。"
            },
            /* ================= p2：交互页（农业类型分布） ================= */
            {
              id: "dg11.1.1-p2",
              kind: "interact",
              title: "点一点：农业类型分布",
              exploreTip: "五个分区，五个“为什么在这里”：点分区，看自然条件→农业类型的因果链。",
              widgets: [
                {
                  type: "thematic-map",
                  params: {
                    theme: "agri",
                    intro: "农业类型分布示意：点一个分区，看“自然条件→农业类型”的因果解读。",
                    recordKey: "geog_tmap_dg11.1.1-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "五个分区逐个点：每个分区告诉你两件事——这里主要搞什么农业，以及自然条件是怎么决定它的。分区界线是示意（非精确），看的是格局不是边界。" },
                { type: "text", html: "<strong>场层真值</strong>：五分区名录与因果解读（GeoBatch6.AGRI_ZONES，人教版八下口径）。<strong>UI 可达</strong>：点分区 → 因果读数。本图为 C 级剪影底图（不画国界线/省界/十段线，台湾岛不可缺），角落 E.3 声明由渲染器自动渲染。" },
                { type: "slogan", text: "点分区，看因果：自然条件说了算。" }
              ],
              point: "dg11.1.1-p2：农业类型分布（thematic-map agri，C 级）。场层真值见 GeoBatch6.AGRI_ZONES；UI 可达为点分区看因果读数。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg11.1.1-p3",
              kind: "interact",
              title: "收官：农业三问",
              exploreTip: "3 道题——水田旱地、四大牧区、因地制宜，一题一因果。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "秦岭—淮河以南、以北的耕地类型与主要作物是？",
                    options: ["以南旱地小麦、以北水田水稻", "以南水田水稻、以北旱地小麦", "南北都是水田"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.1.1-p3a",
                    explain: "以南水田（水稻）、以北旱地（小麦）——但两侧有过渡带，不是一刀切。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国四大牧区不包括？",
                    options: ["内蒙古牧区", "新疆牧区", "华北平原牧区"],
                    answer: 2,
                    recordKey: "geog_quiz_dg11.1.1-p3b",
                    explain: "四大牧区：内蒙古、新疆、青海、西藏——都在降水少、草原广布的西部、北部。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "“因地制宜”发展农业，正确的因果方向是？",
                    options: ["农业类型决定自然条件", "自然条件决定农业类型", "两者无关"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.1.1-p3c",
                    explain: "自然→农业（GEO-R40）：地形气候定了，适合搞什么农业就定了；颠倒了就是因果倒置。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验水田旱地、四大牧区、因果方向记牢了没有。" },
                { type: "text", html: "下一课 dg11.1.2：从田里到工厂——工业为什么爱扎堆在沿海、沿江、沿交通线？" },
                { type: "slogan", text: "带走一句话：自然条件定类型，因地制宜搞农业。" }
              ],
              point: "dg11.1.1 完成。下一课：工业（四大工业基地）。"
            }
          ]
        },
        /* ============ dg11.1.2 工业（3 页） ============ */
        {
          id: "dg11.1.2",
          title: "工业",
          prereq: "农业",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg11.1.2-p1",
              kind: "explain",
              title: "工业：扎堆的学问",
              exploreTip: "工业为什么不均匀分布？四个基地、四套区位因素——工业布局是算过账的。",
              blocks: [
                { type: "lead", text: "工业是国民经济的主导。我国工业有个明显特点：爱扎堆——沿海、沿江、沿交通线。扎堆不是随意，是区位因素综合算账的结果。" },
                { type: "text", html: "<strong>工业基地</strong>（首现即定义：工业高度集中的地区）：<strong>辽中南</strong>（重工业：钢铁、机械）、<strong>京津唐</strong>（北方最大的综合性工业基地，人教版口径）、<strong>沪宁杭</strong>（全国最大的综合性工业基地，人教版口径）、<strong>珠江三角洲</strong>（轻工业、外向型）。" },
                { type: "text", html: "<strong>区位因素</strong>（影响区位选择的自然与社会经济条件）：原料、市场、交通、技术、政策、劳动力……分析时先问“这个产业最怕缺什么”（G13 口诀，GEO-R43）：辽中南最怕缺煤铁 → 靠鞍山铁矿、抚顺煤矿；沪宁杭最怕缺市场 → 靠长江三角洲的广阔市场。" },
                { type: "text", html: "<strong>高新技术产业</strong>：技术密集型，如北京中关村、深圳。特点：从业人员知识水平高、产品更新快。<strong>工业与环境</strong>：发展工业要防治污染，不能先污染后治理。" },
                { type: "trap", text: "⚠️ 大坑：“工业布局是随意的”——错！每个基地都是一套区位因素的账：原料/市场/交通/技术综合。分析时把因素清单并列、无主次 = 抓不住主导因素（GEO-R43）。" },
                { type: "slogan", text: "沿海沿江沿线扎堆，区位因素算过账。" }
              ],
              point: "工业：四大工业基地（辽中南重工业/京津唐北方最大综合性/沪宁杭全国最大综合性/珠三角轻工业外向型，人教版口径）；分布沿海沿江沿交通线；区位因素抓主导（G13口诀）；高新技术（中关村/深圳）；工业与环境。"
            },
            /* ================= p2：交互页（基地分布+区位配对） ================= */
            {
              id: "dg11.1.2-p2",
              kind: "interact",
              title: "看一看、配一配：四大工业基地",
              exploreTip: "先点基地看特点，再把基地和它的主导区位因素配上对。",
              widgets: [
                {
                  type: "thematic-map",
                  params: {
                    theme: "industry",
                    intro: "四大工业基地分布示意：点基地，看特点与主导区位因素。",
                    recordKey: "geog_tmap_dg11.1.2-p2"
                  }
                },
                {
                  type: "cause-chain",
                  params: {
                    title: "工业基地 → 主导区位因素",
                    intro: "先点左侧一个工业基地，再点右侧它最依赖的区位因素。配满四对再提交。",
                    mode: "match",
                    causeLabel: "工业基地",
                    effectLabel: "主导区位因素",
                    causes: [
                      { id: "lzhn", text: "沪宁杭工业基地" },
                      { id: "zsj", text: "珠江三角洲工业基地" },
                      { id: "lzn", text: "辽中南工业基地" },
                      { id: "jjt", text: "京津唐工业基地" }
                    ],
                    effects: [
                      { id: "f_market", text: "市场广阔、交通便利、技术力量强" },
                      { id: "f_resource", text: "煤、铁资源丰富" },
                      { id: "f_hkmo", text: "临近港澳、侨乡、政策优惠、劳动力丰富" },
                      { id: "f_tech", text: "煤铁资源＋科技力量雄厚" }
                    ],
                    pairs: [["lzhn", "f_market"], ["zsj", "f_hkmo"], ["lzn", "f_resource"], ["jjt", "f_tech"]],
                    chainNote: "检查口诀：G13“先问这个产业最怕缺什么”——主导因素优先（GEO-R43）。",
                    recordKey: "geog_cc_dg11.1.2-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "两步走：① 点地图上的四个基地，看特点；② 配对：每个基地配它的主导区位因素。配对时默念口诀——这个基地最怕缺什么？" },
                { type: "text", html: "<strong>场层真值</strong>：基地名录与主导因素（GeoBatch6.INDUSTRY_BASES）；配对正解见 cause-chain truth。<strong>UI 可达</strong>：点基地 → 特点读数；配对 → 逐对判分。本图为 C 级剪影底图，角落 E.3 声明由渲染器自动渲染。" },
                { type: "slogan", text: "看基地，配因素：最怕缺什么？" }
              ],
              point: "dg11.1.2-p2：四大工业基地分布（thematic-map industry，C 级）+ 主导区位因素配对（cause-chain match）。场层真值见 GeoBatch6.INDUSTRY_BASES；UI 可达为点读+配对判分。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg11.1.2-p3",
              kind: "interact",
              title: "收官：工业三问",
              exploreTip: "3 道题——基地、分布、区位，一题一账。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "全国最大的综合性工业基地是？（人教版口径）",
                    options: ["辽中南", "沪宁杭", "珠江三角洲"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.1.2-p3a",
                    explain: "沪宁杭：全国最大的综合性工业基地（人教版口径）；辽中南以重工业为主。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国工业分布的突出特点是？",
                    options: ["均匀分布", "沿海、沿江、沿交通线分布", "只分布在西部"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.1.2-p3b",
                    explain: "沿海、沿江、沿交通线——靠近市场与交通，不是随意的。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "分析辽中南布局，主导区位因素是？",
                    options: ["劳动力丰富", "煤、铁资源丰富", "政策优惠"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.1.2-p3c",
                    explain: "先问最怕缺什么：重工业最怕缺煤铁 → 靠鞍山铁矿、抚顺煤矿（G13口诀）。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验基地、分布规律、主导因素记牢了没有。" },
                { type: "text", html: "下一课 dg11.2.1：工厂的货怎么运出去？——五种运输方式与铁路干线五纵三横。" },
                { type: "slogan", text: "带走一句话：工业扎堆有账算，主导因素先问怕缺啥。" }
              ],
              point: "dg11.1.2 完成。下一课：交通运输（五纵三横）。"
            }
          ]
        }
      ]
    },
    {
      id: "dg11.2",
      title: "交通运输与文化旅游",
      lessons: [
        /* ============ dg11.2.1 交通运输（3 页） ============ */
        {
          id: "dg11.2.1",
          title: "交通运输",
          prereq: "工业",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg11.2.1-p1",
              kind: "explain",
              title: "交通运输：经济的先行官",
              exploreTip: "货要运、人要走：五种运输方式各有各的脾气，铁路干线织成五纵三横。",
              blocks: [
                { type: "lead", text: "交通运输是经济发展的“先行官”。五种方式，各有所长：铁路——陆上长距离运输的主力；公路——短途灵活、门到门；水运——大宗货物、运量大、运费低、速度慢；航空——速度快、运费高；管道——运送气体、液体，连续性强。" },
                { type: "text", html: "<strong>铁路干线五纵三横</strong>（人教版八下口径，走向为示意）：五纵——京哈—京广线、京沪线、京九线、太焦—焦柳线、宝成—成昆线；三横——京包—包兰线、陇海—兰新线、沪杭—浙赣—湘黔—贵昆线。" },
                { type: "text", html: "<strong>高铁</strong>（首现即定义：高速铁路）：不是“火车提速”，而是<strong>客运专线</strong>新体系——客货分流，高速客运走专线，既有线腾出来跑货运（概念精确）。" },
                { type: "text", html: "<strong>交通与经济发展</strong>：交通线通到哪里，经济活力就带到哪里——“要想富，先修路”。" },
                { type: "trap", text: "⚠️ 大坑：“高铁 = 火车跑快了”——错！高铁是客运专线新体系，与既有线分工（客货分流）。概念错了，后面全错（职能表述精确）。" },
                { type: "slogan", text: "五纵三横织成网，高铁专线客货分。" }
              ],
              point: "交通运输：五种方式比较（铁路/公路/水运/航空/管道）；铁路干线五纵三横（人教版八下口径，走向示意）；高铁=客运专线新体系、与既有线分工（客货分流）；交通是经济先行官。"
            },
            /* ================= p2：交互页（五纵三横连线闯关） ================= */
            {
              id: "dg11.2.1-p2",
              kind: "interact",
              title: "闯关：五纵三横连线",
              exploreTip: "8 条干线，逐条点出：题目给线路名，你在图上点出那一条。",
              widgets: [
                {
                  type: "thematic-map",
                  params: {
                    theme: "railway",
                    intro: "铁路干线示意（走向为示意折线）：按题目点出对应的线路，8 条全对过关。",
                    recordKey: "geog_tmap_dg11.2.1-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "闯关规则：题目报一条干线名（如“京沪线”），你在图上点出那条线。答对显示它经过的城市，答错给你城市提示。8 条全对才算过关。" },
                { type: "text", html: "<strong>场层真值</strong>：8 条干线名录、走向城市序列（GeoBatch6.RAILWAYS，人教版八下口径）。<strong>UI 可达</strong>：点线路 → 即时判分 → 全对过关。本图为 C 级剪影底图，角落 E.3 声明由渲染器自动渲染；线路走向为示意折线（GEO-AX01 当页显性化）。" },
                { type: "slogan", text: "报线名，点线路：五纵三横记心中。" }
              ],
              point: "dg11.2.1-p2：铁路干线五纵三横连线闯关（thematic-map railway，C 级）。场层真值见 GeoBatch6.RAILWAYS；UI 可达为点选判分、8 条全对过关。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg11.2.1-p3",
              kind: "interact",
              title: "收官：交通三问",
              exploreTip: "3 道题——方式选择、干线、高铁概念，一题一场景。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "大宗煤炭从山西运往沿海，最合适的运输方式是？",
                    options: ["航空", "铁路/水运", "管道"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.2.1-p3a",
                    explain: "大宗、长距离 → 铁路/水运：运量大、运费低；航空贵，管道只运气液。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "下列属于“三横”的是？",
                    options: ["京沪线", "陇海—兰新线", "京九线"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.2.1-p3b",
                    explain: "三横：京包—包兰、陇海—兰新、沪杭—浙赣—湘黔—贵昆；京沪、京九是五纵。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于高铁，表述正确的是？",
                    options: ["高铁就是火车提速", "高铁是客运专线新体系，与既有线分工（客货分流）", "高铁只运货"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.2.1-p3c",
                    explain: "概念精确：客运专线新体系，高速客运走专线、既有线跑货运——不是简单提速。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验运输方式选择、五纵三横、高铁概念记牢了没有。" },
                { type: "text", html: "下一课 dg11.2.2：路通了，人也流动起来——方言戏曲的地域差异与旅游的正确打开方式。" },
                { type: "slogan", text: "带走一句话：方式看货物，干线织成网，高铁是专线。" }
              ],
              point: "dg11.2.1 完成。下一课：文化与旅游。"
            }
          ]
        },
        /* ============ dg11.2.2 文化与旅游（3 页） ============ */
        {
          id: "dg11.2.2",
          title: "文化与旅游",
          prereq: "交通运输",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg11.2.2-p1",
              kind: "explain",
              title: "文化与旅游：一方水土一方音",
              exploreTip: "十里不同音：方言、戏曲、节日、民居，处处是地域的印记；旅游不只是吃喝玩乐。",
              blocks: [
                { type: "lead", text: "自然环境有差异，文化就有多样性。方言、戏曲、传统节日、民居——都是“一方水土养一方人”的注脚。" },
                { type: "text", html: "<strong>方言</strong>：北方方言、吴语、粤语、闽南语、客家话……<strong>戏曲</strong>：京剧（北京）、越剧（浙江）、黄梅戏（安徽）、豫剧（河南）、粤剧（广东）、川剧（四川）、秦腔（陕西）、昆曲（江苏）——听腔调，辨地域。<strong>传统节日</strong>也有地域味：端午南方的龙舟竞渡、北方的不同食俗。" },
                { type: "text", html: "<strong>旅游资源</strong>：自然（桂林山水、黄山、九寨沟）＋人文（故宫、兵马俑、苏州园林）；<strong>世界遗产</strong>（联合国教科文组织认定的具有突出普遍价值的自然/文化遗产地）：长城、莫高窟、苏州园林等（数量居世界前列，人教版口径）。" },
                { type: "text", html: "<strong>旅游的正确打开方式</strong>：旅游 = 文化体验 ＋ 环境责任——不只是吃喝玩乐；文明旅游、保护环境（dg15.3.3 可持续发展预告）。" },
                { type: "trap", text: "⚠️ 大坑：“旅游 = 吃喝玩乐”——错！旅游的核心是文化体验，底线是环境责任。只打卡不体验、乱刻乱画，都是把旅游做小了。" },
                { type: "slogan", text: "十里不同音，旅游重体验。" }
              ],
              point: "文化与旅游：方言/戏曲（8 种地域归属）/传统节日地域差异；旅游资源（自然+人文）；世界遗产（数量居世界前列，人教版口径）；旅游=文化体验+环境责任。"
            },
            /* ================= p2：交互页（戏曲地域配对） ================= */
            {
              id: "dg11.2.2-p2",
              kind: "interact",
              title: "配一配：戏曲归位",
              exploreTip: "8 种戏曲，8 个地域：听腔调，辨地域——配上对。",
              widgets: [
                {
                  type: "cause-chain",
                  params: {
                    title: "戏曲 → 地域",
                    intro: "先点左侧一种戏曲，再点右侧它所属的地域。配满八对再提交（顺序已打乱）。",
                    mode: "match",
                    causeLabel: "戏曲",
                    effectLabel: "地域",
                    causes: [
                      { id: "yueju", text: "粤剧" },
                      { id: "jingju", text: "京剧" },
                      { id: "chuanju", text: "川剧" },
                      { id: "huangmei", text: "黄梅戏" },
                      { id: "yuju", text: "豫剧" },
                      { id: "kunqu", text: "昆曲" },
                      { id: "yueju2", text: "越剧" },
                      { id: "qinqiang", text: "秦腔" }
                    ],
                    effects: [
                      { id: "r_gd", text: "广东" },
                      { id: "r_bj", text: "北京" },
                      { id: "r_sc", text: "四川" },
                      { id: "r_ah", text: "安徽" },
                      { id: "r_hen", text: "河南" },
                      { id: "r_js", text: "江苏" },
                      { id: "r_zj", text: "浙江" },
                      { id: "r_sx", text: "陕西" }
                    ],
                    pairs: [["yueju", "r_gd"], ["jingju", "r_bj"], ["chuanju", "r_sc"], ["huangmei", "r_ah"], ["yuju", "r_hen"], ["kunqu", "r_js"], ["yueju2", "r_zj"], ["qinqiang", "r_sx"]],
                    chainNote: "一方水土一方音：自然环境有差异，文化就有多样性——地域是文化的土壤。",
                    recordKey: "geog_cc_dg11.2.2-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "配对规则：点一种戏曲，再点它所属的地域，配满八对提交。注意“粤剧”和“越剧”——一字之差，广东与浙江之别！" },
                { type: "text", html: "<strong>场层真值</strong>：8 对戏曲—地域（人教版八下口径）。<strong>UI 可达</strong>：配对 → 逐对判分 → 八对全对过关。" },
                { type: "slogan", text: "听腔调，辨地域：八戏归位。" }
              ],
              point: "dg11.2.2-p2：戏曲地域配对（cause-chain match）。场层真值见 params.pairs（8 对，人教版八下口径）；UI 可达为配对判分、八对全对过关。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg11.2.2-p3",
              kind: "interact",
              title: "收官：文化旅游三问",
              exploreTip: "3 道题——戏曲、遗产、旅游观，一题一辨。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "秦腔是哪个地域的戏曲？",
                    options: ["陕西", "四川", "广东"],
                    answer: 0,
                    recordKey: "geog_quiz_dg11.2.2-p3a",
                    explain: "秦腔—陕西，吼秦腔、吃泡馍，一方水土一方音。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国世界遗产的特点是？",
                    options: ["数量很少", "数量居世界前列（人教版口径），自然与人文兼备", "只有自然遗产"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.2.2-p3b",
                    explain: "长城、莫高窟、苏州园林……数量居世界前列，自然人文双全。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于旅游，表述正确的是？",
                    options: ["旅游就是吃喝玩乐", "旅游 = 文化体验 ＋ 环境责任", "旅游景点可以随意刻画"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.2.2-p3c",
                    explain: "旅游的核心是文化体验，底线是环境责任——文明旅游。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验戏曲归位、遗产家底、旅游观记牢了没有。" },
                { type: "text", html: "下一课 dg11.2.3：本章小结——农业、工业、交通、文化四条线一次串起。" },
                { type: "slogan", text: "带走一句话：文化有地域，旅游重体验。" }
              ],
              point: "dg11.2.2 完成。下一课：本章小结。"
            }
          ]
        },
        /* ============ dg11.2.3 本章小结与习题（2 页） ============ */
        {
          id: "dg11.2.3",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：小结页 ================= */
            {
              id: "dg11.2.3-p1",
              kind: "explain",
              title: "小结：经济与文化四条线",
              exploreTip: "一章串成四条线：农业打底，工业主导，交通连通，文化添彩。",
              blocks: [
                { type: "lead", text: "本章四条线：① 农业——因地制宜（南水田北旱地、西牧东渔）；② 工业——沿海沿江沿交通线，四大基地各有主导区位因素；③ 交通——五种方式各有所长，五纵三横织成网，高铁是客运专线新体系；④ 文化旅游——一方水土一方音，旅游 = 文化体验 ＋ 环境责任。" },
                { type: "text", html: "<strong>易错清单</strong>（本章 trap 回顾）：水田旱地绝对分界 ×→ 过渡带存在；工业布局随意 ×→ 区位因素算账（先问最怕缺什么）；高铁 = 火车提速 ×→ 客运专线新体系、客货分流；旅游 = 吃喝玩乐 ×→ 文化体验 ＋ 环境责任；粤剧/越剧混淆 ×→ 广东/浙江。" },
                { type: "text", html: "<strong>方法沉淀</strong>：区位分析三问——① 最怕缺什么（主导因素）；② 靠什么（有利条件）；③ 带来什么（影响）。这套问法 dg15.2.1 会定型为答题模板。" },
                { type: "slogan", text: "四线串一章，区位三问记心上。" }
              ],
              point: "dg11 小结：农业/工业/交通/文化四条线；易错五项；方法：区位分析三问（dg15.2.1 预告）。"
            },
            /* ================= p2：综合习题页 ================= */
            {
              id: "dg11.2.3-p2",
              kind: "interact",
              title: "综合习题：经济与文化",
              exploreTip: "4 道综合题，覆盖全章四条线。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "关于农业，表述正确的是？",
                    options: ["全国都适合种水稻", "秦岭—淮河以南水田（水稻）、以北旱地（小麦），因地制宜", "畜牧业只在东部"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.2.3-p2a",
                    explain: "因地制宜：自然条件定类型；畜牧业在西部、北部四大牧区。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于工业，表述正确的是？",
                    options: ["工业均匀分布", "沿海、沿江、沿交通线分布；沪宁杭是全国最大的综合性工业基地（人教版口径）", "工业布局不需要考虑区位因素"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.2.3-p2b",
                    explain: "扎堆有账算：区位因素综合，主导因素优先。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于交通，表述正确的是？",
                    options: ["高铁就是火车提速", "五纵三横是铁路干线网；高铁是客运专线新体系、与既有线分工", "管道适合运煤炭"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.2.3-p2c",
                    explain: "概念精确：高铁 = 客运专线新体系；管道运气液。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于文化旅游，表述正确的是？",
                    options: ["粤剧是浙江的", "越剧—浙江、粤剧—广东；旅游 = 文化体验 ＋ 环境责任", "旅游景点可随意刻画"],
                    answer: 1,
                    recordKey: "geog_quiz_dg11.2.3-p2d",
                    explain: "一字之差两地：越剧浙江、粤剧广东；旅游重体验、有责任。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "4 道综合题，一题一条线：农业、工业、交通、文化旅游。" },
                { type: "text", html: "dg11 完成。下一章 dg12：中国的地理差异——一条秦岭—淮河线，划出多少不一样？" },
                { type: "slogan", text: "带走一句话：经济看区位，文化看地域。" }
              ],
              point: "dg11 完成。下一章：dg12 中国的地理差异。"
            }
          ]
        }
      ]
    }
  ]
};

/* 记录键清单（本批 21 个，全唯一；运行时自动加 ltb-geo- 前缀）：
 * geog_tmap_dg11.1.1-p2 / geog_quiz_dg11.1.1-p3a/b/c /
 * geog_tmap_dg11.1.2-p2 / geog_cc_dg11.1.2-p2 / geog_quiz_dg11.1.2-p3a/b/c /
 * geog_tmap_dg11.2.1-p2 / geog_quiz_dg11.2.1-p3a/b/c /
 * geog_cc_dg11.2.2-p2 / geog_quiz_dg11.2.2-p3a/b/c /
 * geog_quiz_dg11.2.3-p2a/b/c/d
 */
