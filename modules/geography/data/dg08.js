/* ============================================================
 * 学习工具箱 · 地理 · 第八章数据（dg08 中国的疆域与人口）
 *
 * 章 dg08 中国的疆域与人口：6 课 16 页（每课 p1 讲解 + p2 交互 +
 * p3 收官；2 页课 p2 交互兼收官）。
 * 单元：dg08.1 疆域（位置/疆域/行政区划），
 *       dg08.2 人口与民族（人口/民族/小结）。
 * prereq 链：dg07 巴西 → 中国的位置 → 疆域 → 行政区划 →
 *             中国的人口 → 中国的民族 → 全章。
 *
 * 真值来源（优先级，见真值口径 §0.1）：
 *  ① params（本文件即 params：四至点/邻国/34 省级简称与行政中心/
 *      人口数据均逐字引人教版八上教材口径，见各页 point）；
 *  ② 同页文案；③ curriculum 红线四辨析；④ pedagogy 第九章/T 系列；
 *  ⑤ 真值口径 GEO-R01–R57/GEO-AX01 + 书面裁决。
 *
 * GEO-R51 跨模块引用核查（本批逐条执行）：
 *  1. dg08.1.2 课表"代数 ch00 数量级（奠基）"——数学全库 grep 证伪
 *     （批 3 已查清：ch00 全章"从算术到代数"无数量级内容）。按用户
 *     2026-10-17 拍板 A 案：改呼应物理 p00.1.4《数量级与估算》，课页
 *     用 { type:"physicslink" } 深链（XLINK_PHY_GEO 已注册"物理 p00.1.4"，
 *     geography.js physicslinkify 转 ../physics/index.html#p00.1.4/1）。
 *  2. dg08.2.1 课表"代数 8.1 指数"——已查实：代数 ch08-u1《指数的推广》
 *     确为指数教学（ch08-u1-l1-p1=8.1.1 负整数指数幂、u1-l2-p1=8.1.2
 *     分数指数幂）。收尾批 2 · C②已补齐 geography.js 的 mathlink 深链机制
 *     （mathlinkify，仿 physicslinkify；课号式样按 playbook v1.1 门禁⑫，
 *     学生可见「代数 8.1」式、内部注册键 ch06 式学生不可见），故本课现已
 *     挂 mathlink 深链（目标 ch08-u1-l1-p1，已核实存在），课内仍保留地理本
 *     学科回填 dg04.1.1《翻倍的感觉》。文件尾"待协调者"清单相应销账。
 *  3. dg10.1.1 课表"代数 ch00 比值（奠基）"——批 3 已证伪 ch00 无"比值"
 *     概念奠基，不得挂虚假奠基引用；本批课内直观定义"人均 = 总量 ÷
 *     人口"，不挂任何跨科链（见 dg10.js 头注）。
 *  4. 其他跨科/回填标注：dg08.1.1"dg01.2.2 回填"（东西半球 20°W–160°E，
 *     批 1 已上线，grep 实测存在）；dg08.2.1"dg04.1.1 回填"（批 3 已
 *     上线，真实存在）。凡目标课未生产的一律不写（仿 dg07 头注口径）。
 *
 * 分场层口径（GEO-RULING-2026-10-17-03）：本批"输入→结论"类判读断言
 * 分两类写——① 场层真值：纯函数直算（与 UI 无关）；② UI 可达：UI 路径
 * 实际可达的读数/徽章/判分。本批判读类断言见各页 blocks 显性分段。
 *
 * 地图诚实（GEO-RULING-2026-10-17-08 国界审定书执行）：
 *  本批 geo-map 页定级与 declare 已按审定书第四节落实——
 *  A 级（position-switch / four-points / admin-puzzle / ethnic-match）：
 *    渲染器按资产 grade 自动配 E.2 冻结文案
 *    「示意｜非精确比例｜界线画法依据人教版地理教材插图，
 *    非标准地图」；闭合国界线/十段线/南海四群岛/台湾同色/钓鱼岛注记/
 *    港澳注记/34 省界等一票否决项由地图队按审定书 B–E 条绘制，
 *    地理队逐页人工核对（审定书 §十五）。
 *  C 级（huhuan-yong）：渲染器按资产 grade 自动配 E.3 冻结文案
 *    「示意｜非精确比例｜方向仅供参考」；不画国界线/省界线，
 *    台湾岛不可缺（审定书 D 底线）。
 *  数据侧不再写 declare 字段（防角落小字重复渲染），冻结文案由
 *  widget 按资产 grade 统一落角；params.mapLevel 为本生产队给地图队
 *  的定级信号（契约外辅助字段），A/B 级页已删，仅 C 级剪影页保留。
 *  admin-puzzle 另配 shapeNote「各省形状经教学简化，相邻关系不变」
 *  （GEO-AX01 显性化，审定书 C.3），由 widget 缺省分支自动渲染。
 *  assetId 为本队定义的语义 ID，实际矢量资产路径由地图队映射落地。
 *
 * 首现术语当页定义（硬门禁⑧）：内海（dg08.1.2）、三级行政区划
 * （dg08.1.3）、大杂居小聚居（dg08.2.2）。
 *
 * 记录键：geog_<类型>_<页id>（与批 1–4 同方案；运行时自动加 ltb-geo-
 * 前缀，老键由 migrateLegacyRecords 迁移，不另起前缀）。
 *
 * 政治红线：台湾/南海诸岛/钓鱼岛/港澳表述一律按审定书 B.2–B.7；
 * 人口/面积数据一律注明年份与来源口径（GEO-R52），"第一/最大"类表述
 * 注明人教版口径（GEO-R56），不确定的数写"约"（GEO-R54）。
 *
 * 待协调者清单：
 *  - 【2026-10-20 收尾批 2 · C②已销账】地理模块 mathlink 深链机制已补齐
 *    （geography.js mathlinkify；XLINK_MATH_GEO 注册"代数 ch06/几何 g13.1.1/
 *    代数 ch08.1"，目标 pageId 逐个核实存在，未命中降级纯文本不造死链）；
 *    dg08.2.1-p1 已挂"代数 8.1 指数"深链（学生可见式样按门禁⑫）。
 * ============================================================ */
window.GEOGRAPHY_DATA = window.GEOGRAPHY_DATA || {};
window.GEOGRAPHY_DATA["dg08"] = {
  id: "dg08",
  units: [
    {
      id: "dg08.1",
      title: "疆域",
      lessons: [
        /* ============ dg08.1.1 中国的位置（3 页） ============ */
        {
          id: "dg08.1.1",
          title: "中国的位置",
          prereq: "dg07 巴西",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg08.1.1-p1",
              kind: "explain",
              title: "中国的位置：半球、纬度、海陆",
              exploreTip: "给中国在世界地图上定个位：三个问题——哪个半球？哪个温度带？靠海还是内陆？",
              blocks: [
                { type: "lead", text: "说一个国家，先说它的位置。中国的位置分三层：半球位置、纬度位置、海陆位置——层层定位，位置的优越性自然显现。" },
                { type: "text", html: "<strong>半球位置</strong>：<strong>东半球、北半球</strong>。东西半球以 20°W 和 160°E 经线圈划分（dg01.2.2 回填：分界线走大洋，不拆开整块大陆）；中国最西约 73°E、最东约 135°E，全在 20°W–160°E 以东 → 东半球；全在赤道以北 → 北半球。" },
                { type: "text", html: "<strong>纬度位置</strong>：南北跨纬度近 50°（约 4°N–53°N）；<strong>北回归线</strong>穿过南部（云南、广西、广东、台湾）。大部分地区位于<strong>温带</strong>，南部小部分位于<strong>热带</strong>——跨带广，气候复杂多样。" },
                { type: "text", html: "<strong>海陆位置</strong>：亚洲东部、<strong>太平洋西岸</strong>——海陆兼备：东部临海（渤海、黄海、东海、南海），西部深入亚欧大陆内部。临海便于对外联系，内陆纵深广阔。" },
                { type: "trap", text: "⚠️ 大坑：别说中国在“西半球”！东西半球分界线是 20°W 和 160°E，不是 0° 和 180°——中国全境都在东半球范围内。" },
                { type: "slogan", text: "东半北半，海陆兼备；纬度适中，位置优越。" }
              ],
              point: "中国：东半球、北半球（20°W–160°E 划分，dg01.2.2 回填）；大部分温带、南部热带（北回归线穿过滇桂粤台）；亚欧大陆东部、太平洋西岸，海陆兼备。"
            },
            /* ================= p2：交互页（三图切换） ================= */
            {
              id: "dg08.1.1-p2",
              kind: "interact",
              title: "三图切换：中国在哪",
              exploreTip: "点三个标签，看同一片国土在三种视角下的位置——半球、纬度、海陆。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-territory",
                    mode: "position-switch",
                    switchTabs: ["半球位置", "纬度位置", "海陆位置"],
                    tabNotes: {
                      "半球位置": "20°W–160°E 经线圈以东为东半球；中国全境落入东半球、北半球。",
                      "纬度位置": "约 4°N–53°N；北回归线穿过南部，大部分温带、南部热带。",
                      "海陆位置": "亚欧大陆东部、太平洋西岸；东部临海、西部深入内陆。"
                    },
                    recordKey: "geog_geomap_dg08.1.1-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三个标签，三种视角：点“半球位置”看中国落在哪个半球；点“纬度位置”看北回归线穿过哪里；点“海陆位置”看临海与内陆。注意每幅图角落的示意声明——这是 A 级疆域要素图，国界线/十段线按审定书绘制。" },
                { type: "text", html: "<strong>场层真值</strong>：三幅示意底图分别承载半球/纬度/海陆一种位置信息。<strong>UI 可达</strong>：点标签切换三图，每图配位置说明文字。" },
                { type: "slogan", text: "一图一视角，位置分层看。" }
              ],
              point: "中国位置三图切换（geo-map position-switch，A 级）。场层真值见 widget 内冻结 TRUTH（与 params.tabNotes 同值）；UI 可达为标签切换。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg08.1.1-p3",
              kind: "interact",
              title: "收官：中国位置三问",
              exploreTip: "3 道题——半球、纬度带、海陆，一题一定位。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "中国的半球位置是？",
                    options: ["东半球、南半球", "西半球、北半球", "东半球、北半球"],
                    answer: 2,
                    recordKey: "geog_quiz_dg08.1.1-p3a",
                    explain: "20°W–160°E 划分（dg01.2.2 回填）：中国最西约 73°E，全在东半球；全在赤道以北 → 北半球。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "北回归线穿过我国南部，说明我国南部属于？",
                    options: ["温带", "寒带", "热带"],
                    answer: 2,
                    recordKey: "geog_quiz_dg08.1.1-p3b",
                    explain: "北回归线是热带与亚热带的界线；我国南部小部分位于热带，大部分位于温带。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国海陆位置的正确表述是？",
                    options: ["亚欧大陆东部、太平洋西岸", "亚欧大陆西部、太平洋东岸", "欧洲东部、大西洋西岸"],
                    answer: 0,
                    recordKey: "geog_quiz_dg08.1.1-p3c",
                    explain: "海陆兼备：东部临海（渤/黄/东/南海），西部深入亚欧大陆内部。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验三层位置记牢了没有。" },
                { type: "text", html: "下一课 dg08.1.2：从“位置”到“疆域”——960 万平方千米到底有多大，四至点和邻国一次说清。" },
                { type: "slogan", text: "带走一句话：定位分三层，半球纬度海陆。" }
              ],
              point: "dg08.1.1 完成。下一课：疆域（面积、四至点、邻国）。"
            }
          ]
        },
        /* ============ dg08.1.2 疆域（3 页） ============ */
        {
          id: "dg08.1.2",
          title: "疆域",
          prereq: "中国的位置",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg08.1.2-p1",
              kind: "explain",
              title: "疆域：960 万平方千米",
              exploreTip: "960 万平方千米——先建量级感，再看四至点和邻国，疆域一次说清。",
              blocks: [
                { type: "lead", text: "我国陆地面积约 960 万平方千米，世界第三（仅次于俄罗斯、加拿大；人教版口径）。先别背数字，先建“量级感”：960 万 = 9.6×10⁶ 平方千米。" },
                { type: "physicslink", text: "跨科呼应：物理 p00.1.4《数量级与估算》专门讲“数量级”——10 的幂、估算三招（测多算少、身体当尺、拆成小步），点击可跳转到物理模块查看。" },
                { type: "text", html: "<strong>四至点</strong>（人教版口径，均为“约”数）：<strong>最北</strong>—漠河以北黑龙江主航道中心线（约 53°N）；<strong>最南</strong>—南海南沙群岛曾母暗沙（约 4°N）；<strong>最东</strong>—黑龙江与乌苏里江主航道中心线交汇处（约 135°E）；<strong>最西</strong>—新疆帕米尔高原（约 73°E）。南北跨纬度约 49°，东西跨经度约 62°。" },
                { type: "text", html: "<strong>邻国</strong>：陆上邻国 <strong>14 个</strong>（朝鲜、俄罗斯、蒙古、哈萨克斯坦、吉尔吉斯斯坦、塔吉克斯坦、阿富汗、巴基斯坦、印度、尼泊尔、不丹、缅甸、老挝、越南），隔海相望 <strong>6 国</strong>（韩国、日本、菲律宾、马来西亚、文莱、印度尼西亚）——本课用现行教材统计口径。" },
                { type: "text", html: "<strong>海域</strong>：<strong>渤海、琼州海峡</strong>是我国的<strong>内海</strong>（领海基线向陆一侧的水域）。<strong>三沙市</strong>一瞥：2012 年设立的地级市，管辖西沙群岛、中沙群岛、南沙群岛的岛礁及其海域。" },
                { type: "trap", text: "⚠️ 误区：“邻国数量固定不变”——国界与建交是历史形成的，本课 14+6 用的是现行教材统计口径；学的是“怎么看疆域”的方法，不是背一个永恒不变的数字。" },
                { type: "slogan", text: "960 万世界三，四至邻国记心间。" }
              ],
              point: "疆域：陆地约 960 万 km²（世界第三，人教版口径）；四至约 53°N/4°N/135°E/73°E；陆上邻国 14、隔海相望 6（现行教材口径）；渤海、琼州海峡是内海；三沙市（2012 年设）辖西沙/中沙/南沙。"
            },
            /* ================= p2：交互页（四至点+邻国） ================= */
            {
              id: "dg08.1.2-p2",
              kind: "interact",
              title: "点一点：四至点与邻国",
              exploreTip: "点四个至点，看经纬度；再点周边，看 14 个陆上邻国的方位。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-territory",
                    mode: "four-points",
                    mapLevel: "A",
                    points: [
                      { id: "north", name: "最北端", coord: "约 53°N", desc: "漠河以北黑龙江主航道中心线" },
                      { id: "south", name: "最南端", coord: "约 4°N", desc: "南海南沙群岛曾母暗沙" },
                      { id: "east", name: "最东端", coord: "约 135°E", desc: "黑龙江与乌苏里江主航道中心线交汇处" },
                      { id: "west", name: "最西端", coord: "约 73°E", desc: "新疆帕米尔高原" }
                    ],
                    neighbors: ["朝鲜", "俄罗斯", "蒙古", "哈萨克斯坦", "吉尔吉斯斯坦", "塔吉克斯坦", "阿富汗", "巴基斯坦", "印度", "尼泊尔", "不丹", "缅甸", "老挝", "越南"],
                    acrossSea: ["韩国", "日本", "菲律宾", "马来西亚", "文莱", "印度尼西亚"],
                    recordKey: "geog_geomap_dg08.1.2-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "四个至点逐个点：每点弹出经纬度与地名。邻国按方位点：从东北的朝鲜开始，顺时针对一圈，看 14 个陆上邻国都在哪个方向。" },
                { type: "text", html: "<strong>场层真值</strong>：四至点经纬度与地名（GeoBatch5.FOUR_POINTS 冻结常量，人教版口径）；14 陆上邻国 + 6 隔海相望国名录。<strong>UI 可达</strong>：点至点 → 经纬度弹窗；点邻国 → 方位高亮。本图为 A 级疆域要素图，国界线/十段线/南海四群岛/台湾同色/钓鱼岛/港澳注记按审定书 B–E 由地图队绘制，地理队逐页人工核对。" },
                { type: "slogan", text: "点四至，看经纬；数邻国，辨方位。" }
              ],
              point: "疆域四至交互（geo-map four-points，A 级）。场层真值见 GeoBatch5.FOUR_POINTS；UI 可达为点选弹窗。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg08.1.2-p3",
              kind: "interact",
              title: "收官：疆域三问",
              exploreTip: "3 道题——面积、四至、邻国，一题一锚点。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "我国陆地面积约 960 万平方千米，在世界排第几？（人教版口径）",
                    options: ["第一", "第五", "第三"],
                    answer: 2,
                    recordKey: "geog_quiz_dg08.1.2-p3a",
                    explain: "仅次于俄罗斯、加拿大；960 万 = 9.6×10⁶ km²，量级感回看物理 p00.1.4。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国领土的最南端是？",
                    options: ["海南岛", "南海南沙群岛曾母暗沙（约 4°N）", "台湾岛"],
                    answer: 1,
                    recordKey: "geog_quiz_dg08.1.2-p3b",
                    explain: "最南约 4°N——曾母暗沙，不是海南岛。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "陆上邻国数量（现行教材统计口径）是？",
                    options: ["14 个", "6 个", "23 个"],
                    answer: 0,
                    recordKey: "geog_quiz_dg08.1.2-p3c",
                    explain: "14 个陆上邻国 + 6 个隔海相望国；口径随国际形势可能有统计差异，本课用现行教材口径。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验面积量级、四至锚点、邻国口径记牢了没有。" },
                { type: "text", html: "下一课 dg08.1.3：960 万平方千米怎么管？——三级行政区划与 34 个省级，拼图闯关见。" },
                { type: "slogan", text: "带走一句话：量级四至邻国，疆域三锚点。" }
              ],
              point: "dg08.1.2 完成。下一课：行政区划（34 个省级）。"
            }
          ]
        },
        /* ============ dg08.1.3 行政区划（3 页） ============ */
        {
          id: "dg08.1.3",
          title: "行政区划",
          prereq: "疆域",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg08.1.3-p1",
              kind: "explain",
              title: "行政区划：34 个省级",
              exploreTip: "960 万平方千米分三级管：省—县—乡。省级不是 23 个，是 34 个——差在哪？",
              blocks: [
                { type: "lead", text: "这么大的疆域，行政上分三级管理：省（自治区、直辖市）—县（自治县、市）—乡（镇）。省级这一级，共 34 个。" },
                { type: "text", html: "<strong>34 = 23 省 + 5 自治区 + 4 直辖市 + 2 特别行政区</strong>。5 自治区：内蒙古、新疆、西藏、宁夏、广西；4 直辖市：北京、天津、上海、重庆；2 特别行政区：香港、澳门。台湾省是我国 34 个省级之一。" },
                { type: "text", html: "<strong>简称与行政中心</strong>：每个省级有简称和行政中心，如湖北—<strong>鄂</strong>—<strong>武汉</strong>，广东—粤—广州，新疆维吾尔自治区—新—乌鲁木齐。简称多取省名中的关键字，个别有两个简称（如四川—川/蜀）。" },
                { type: "trap", text: "⚠️ 大坑：“省级 = 23 个”——错！是 34 个：23 省 + 5 自治区 + 4 直辖市 + 2 特别行政区。自治区、直辖市、特别行政区一个都不能漏。" },
                { type: "slogan", text: "三级区划三十四，简称中心要配对。" }
              ],
              point: "行政区划：省—县—乡三级；34 个省级 = 23 省 + 5 自治区 + 4 直辖市 + 2 特别行政区；简称与行政中心（如鄂—武汉）。"
            },
            /* ================= p2：交互页（34 省拼图三配对） ================= */
            {
              id: "dg08.1.3-p2",
              kind: "interact",
              title: "闯关：34 省拼图三配对",
              exploreTip: "形状、简称、行政中心三配对：点省份形状，配上简称，再配上行政中心。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-admin",
                    mode: "admin-puzzle",
                    mapLevel: "A",
                    shapeNote: "各省形状经教学简化，相邻关系不变",
                    provinces: [
                      { name: "北京市", abbr: "京", capital: "北京" },
                      { name: "天津市", abbr: "津", capital: "天津" },
                      { name: "河北省", abbr: "冀", capital: "石家庄" },
                      { name: "山西省", abbr: "晋", capital: "太原" },
                      { name: "内蒙古自治区", abbr: "内蒙古", capital: "呼和浩特" },
                      { name: "辽宁省", abbr: "辽", capital: "沈阳" },
                      { name: "吉林省", abbr: "吉", capital: "长春" },
                      { name: "黑龙江省", abbr: "黑", capital: "哈尔滨" },
                      { name: "上海市", abbr: "沪", capital: "上海" },
                      { name: "江苏省", abbr: "苏", capital: "南京" },
                      { name: "浙江省", abbr: "浙", capital: "杭州" },
                      { name: "安徽省", abbr: "皖", capital: "合肥" },
                      { name: "福建省", abbr: "闽", capital: "福州" },
                      { name: "江西省", abbr: "赣", capital: "南昌" },
                      { name: "山东省", abbr: "鲁", capital: "济南" },
                      { name: "河南省", abbr: "豫", capital: "郑州" },
                      { name: "湖北省", abbr: "鄂", capital: "武汉" },
                      { name: "湖南省", abbr: "湘", capital: "长沙" },
                      { name: "广东省", abbr: "粤", capital: "广州" },
                      { name: "广西壮族自治区", abbr: "桂", capital: "南宁" },
                      { name: "海南省", abbr: "琼", capital: "海口" },
                      { name: "重庆市", abbr: "渝", capital: "重庆" },
                      { name: "四川省", abbr: "川", capital: "成都" },
                      { name: "贵州省", abbr: "贵", capital: "贵阳" },
                      { name: "云南省", abbr: "云", capital: "昆明" },
                      { name: "西藏自治区", abbr: "藏", capital: "拉萨" },
                      { name: "陕西省", abbr: "陕", capital: "西安" },
                      { name: "甘肃省", abbr: "甘", capital: "兰州" },
                      { name: "青海省", abbr: "青", capital: "西宁" },
                      { name: "宁夏回族自治区", abbr: "宁", capital: "银川" },
                      { name: "新疆维吾尔自治区", abbr: "新", capital: "乌鲁木齐" },
                      { name: "香港特别行政区", abbr: "港", capital: "香港" },
                      { name: "澳门特别行政区", abbr: "澳", capital: "澳门" },
                      { name: "台湾省", abbr: "台", capital: "台北" }
                    ],
                    recordKey: "geog_geomap_dg08.1.3-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三配对规则：点一个省的形状 → 选它的简称 → 选它的行政中心，三对全对才算过关。34 个省级一个不能少，台湾省、港澳特别行政区都在其中。" },
                { type: "text", html: "<strong>场层真值</strong>：34 省级名录与简称、行政中心（schematicPathsMeta.provinces 冻结表，人教版口径）。<strong>UI 可达</strong>：点形状 → 配简称 → 配中心，逐项判分。各省形状经教学简化，相邻关系不变（GEO-AX01 当页显性化）。A 级政区图，省界/国界/十段线等按审定书由地图队绘制，地理队逐页人工核对。" },
                { type: "slogan", text: "形简称中心，三配对过关。" }
              ],
              point: "34 省拼图三配对（geo-map admin-puzzle，A 级）。场层真值见 schematicPathsMeta.provinces；UI 可达为形状→简称→中心三配对判分。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg08.1.3-p3",
              kind: "interact",
              title: "收官：行政区划三问",
              exploreTip: "3 道题——总数、自治区、简称中心，一题一配对。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "我国省级行政区共多少个？",
                    options: ["34 个（23 省 + 5 自治区 + 4 直辖市 + 2 特别行政区）", "32 个", "23 个"],
                    answer: 0,
                    recordKey: "geog_quiz_dg08.1.3-p3a",
                    explain: "34 个：自治区、直辖市、特别行政区别漏。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "下列属于自治区的是？",
                    options: ["新疆维吾尔自治区", "河北省", "上海市"],
                    answer: 0,
                    recordKey: "geog_quiz_dg08.1.3-p3b",
                    explain: "5 自治区：内蒙古、新疆、西藏、宁夏、广西。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "湖北省的简称和行政中心是？",
                    options: ["豫—郑州", "鄂—武汉", "湘—长沙"],
                    answer: 1,
                    recordKey: "geog_quiz_dg08.1.3-p3c",
                    explain: "鄂是湖北简称，武汉是湖北省会；湘—长沙是湖南，豫—郑州是河南。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验 34 这个数字和简称中心配对记牢了没有。" },
                { type: "text", html: "下一课 dg08.2.1：疆域说完了，说人——14 亿人口、胡焕庸线、动态调整的人口政策。" },
                { type: "slogan", text: "带走一句话：三十四省级，一个不能少。" }
              ],
              point: "dg08.1.3 完成。下一课：中国的人口。"
            }
          ]
        }
      ]
    },
    {
      id: "dg08.2",
      title: "人口与民族",
      lessons: [
        /* ============ dg08.2.1 中国的人口（3 页） ============ */
        {
          id: "dg08.2.1",
          title: "中国的人口",
          prereq: "行政区划",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg08.2.1-p1",
              kind: "explain",
              title: "人口：14 亿与胡焕庸线",
              exploreTip: "14 亿人怎么分布？一条 1935 年画下的线，至今仍在解释中国人口格局。",
              blocks: [
                { type: "lead", text: "第七次全国人口普查（2020 年）：全国人口约 14.12 亿（141178 万人）。注意年份——人口数据有时效，看任何人口结论先看年份。" },
                { type: "text", html: "<strong>增长与政策</strong>：新中国成立以来人口快速增长；人口政策<strong>动态调整</strong>：一孩 → 二孩（2016 年全面实施）→ 三孩（2021 年）。政策跟着国情走，不是一成不变。" },
                { type: "text", html: "<strong>分布</strong>：<strong>黑河—腾冲线</strong>（<strong>胡焕庸线</strong>，1935 年地理学家胡焕庸提出）：线东南人口约占全国 <strong>94%</strong>（胡焕庸 1935 年原文统计为 96%，此处“约 94%”沿用人教版现行教材表述，量级格局未变）——<strong>东多西少</strong>。原因：自然（地形、气候）+ 人文（经济、历史），一果多因。" },
                { type: "text", html: "人口增长曲线是指数增长的直观例子（dg04.1.1《翻倍的感觉》回填：翻倍的威力）。" },
                /* 收尾批 2 · C②：mathlink 深链机制已补齐（geography.js mathlinkify），
                 * 故补挂「代数 8.1 指数」预告深链（课号式样按 playbook v1.1 门禁⑫：
                 * 学生可见一律「代数 8.1」式；文案黄队教学审＋地理专家队复核待定）。 */
                { type: "mathlink", text: "预告：代数 8.1《指数的推广》学完后，回来再看这条曲线——人口翻倍的曲线，就是指数函数的样子（先记直觉：越长越快）。" },
                { type: "trap", text: "⚠️ 误区：“人口政策一直不变”——错！从一孩到二孩再到三孩，政策随国情动态调整。看人口问题，第一个动作永远是：看年份、看口径。" },
                { type: "slogan", text: "十四亿人口，东多西少；政策动态，数据看年。" }
              ],
              point: "人口：七普（2020 年）约 14.12 亿；政策一孩→二孩（2016）→三孩（2021）动态调整；黑河—腾冲线（胡焕庸线，1935）东南约占 94%，东多西少。"
            },
            /* ================= p2：交互页（胡焕庸线） ================= */
            {
              id: "dg08.2.1-p2",
              kind: "interact",
              title: "看一看：胡焕庸线两侧",
              exploreTip: "一条斜线，两边人口天差地别：点两侧，看密度对比。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-silhouette",
                    mode: "huhuan-yong",
                    mapLevel: "C",
                    lineNote: "黑河—腾冲线（胡焕庸线，1935 年胡焕庸提出）；线东南人口约占全国 94%（胡焕庸 1935 年原文统计为 96%，此处沿用人教版现行教材表述，格局未变）",
                    recordKey: "geog_geomap_dg08.2.1-p2"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "从黑龙江黑河到云南腾冲，一条斜线把中国切成两半：点线东南，看人口密度；点线西北，看地广人稀。对比两侧的地形、气候，想想为什么东多西少。" },
                { type: "text", html: "<strong>场层真值</strong>：胡焕庸线走向与两侧人口占比（GeoBatch5.HU_HUAN_YONG 冻结常量）。<strong>UI 可达</strong>：点两侧 → 密度对比读数。本图为 C 级背景示意（无省界叠加），不画国界线，台湾岛不可缺。" },
                { type: "slogan", text: "一线两边，东密西疏。" }
              ],
              point: "胡焕庸线两侧对比（geo-map huhuan-yong，C 级）。场层真值见 GeoBatch5.HU_HUAN_YONG；UI 可达为点两侧看密度对比。"
            },
            /* ================= p3：收官页 ================= */
            {
              id: "dg08.2.1-p3",
              kind: "interact",
              title: "收官：人口三问",
              exploreTip: "3 道题——数量、分布、政策，一题一口径。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "第七次全国人口普查（2020 年）全国人口约？",
                    options: ["16 亿", "14.12 亿", "12 亿"],
                    answer: 1,
                    recordKey: "geog_quiz_dg08.2.1-p3a",
                    explain: "141178 万人，约 14.12 亿；看人口数先看年份（2020 年）。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "胡焕庸线东南人口约占全国？",
                    options: ["6%", "50%", "94%"],
                    answer: 2,
                    recordKey: "geog_quiz_dg08.2.1-p3b",
                    explain: "约 94%（胡焕庸 1935 年原文为 96%，此处沿用人教版现行教材表述）：东多西少。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国人口政策的变化顺序是？",
                    options: ["一孩 → 二孩 → 三孩", "三孩 → 二孩 → 一孩", "一直是一孩"],
                    answer: 0,
                    recordKey: "geog_quiz_dg08.2.1-p3c",
                    explain: "动态调整：二孩 2016 年全面实施，三孩 2021 年——政策跟着国情走。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "三道题，检验数量、分布、政策三个口径记牢了没有。" },
                { type: "text", html: "下一课 dg08.2.2：14 亿人里，有 56 个民族——大杂居、小聚居，五大自治区对号入座。" },
                { type: "slogan", text: "带走一句话：看人口，先看年份和口径。" }
              ],
              point: "dg08.2.1 完成。下一课：中国的民族。"
            }
          ]
        },
        /* ============ dg08.2.2 中国的民族（2 页） ============ */
        {
          id: "dg08.2.2",
          title: "中国的民族",
          prereq: "中国的人口",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：讲解页 ================= */
            {
              id: "dg08.2.2-p1",
              kind: "explain",
              title: "民族：56 个民族是一家",
              exploreTip: "56 个民族怎么分布？记住八个字：大杂居、小聚居、交错杂居。",
              blocks: [
                { type: "lead", text: "我国有 56 个民族：汉族人口最多（七普约 91.11%，约 12.86 亿），其余 55 个为少数民族（约 1.25 亿）。" },
                { type: "text", html: "<strong>分布特点</strong>：<strong>大杂居、小聚居、交错杂居</strong>（各民族大范围混居、局部小范围集中）。少数民族主要分布在西南、西北、东北边疆地区，但内地城市也有许多少数民族同胞——不是“只在边疆”。" },
                { type: "text", html: "<strong>民族政策</strong>：民族平等、民族区域自治。5 个自治区实行区域自治：内蒙古、新疆、西藏、宁夏、广西——下一页对号入座。" },
                { type: "trap", text: "⚠️ 误区：“少数民族都聚居在边疆”——错！大杂居、小聚居：边疆有聚居区，内地城市也有分布。记住八个字，就不会说错。" },
                { type: "slogan", text: "五十六民族，大杂居小聚居。" }
              ],
              point: "民族：56 个民族，汉族约 91.11%（七普）；分布大杂居、小聚居、交错杂居；民族区域自治（内蒙古/新疆/西藏/宁夏/广西）。"
            },
            /* ================= p2：交互页（对号入座 + 收官） ================= */
            {
              id: "dg08.2.2-p2",
              kind: "interact",
              title: "对号入座：五大自治区",
              exploreTip: "五个自治区，五个位置：点名字，放到中国轮廓的正确位置上。",
              widgets: [
                {
                  type: "geo-map",
                  params: {
                    assetId: "cn-admin",
                    mode: "ethnic-match",
                    mapLevel: "A",
                    regions: [
                      { name: "内蒙古自治区", capital: "呼和浩特", mainEthnic: "蒙古族" },
                      { name: "新疆维吾尔自治区", capital: "乌鲁木齐", mainEthnic: "维吾尔族" },
                      { name: "西藏自治区", capital: "拉萨", mainEthnic: "藏族" },
                      { name: "宁夏回族自治区", capital: "银川", mainEthnic: "回族" },
                      { name: "广西壮族自治区", capital: "南宁", mainEthnic: "壮族" }
                    ],
                    recordKey: "geog_geomap_dg08.2.2-p2"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "我国少数民族的分布特点是？",
                    options: ["大杂居、小聚居、交错杂居", "全部聚居在边疆", "全部散居在内地"],
                    answer: 0,
                    recordKey: "geog_quiz_dg08.2.2-p2a",
                    explain: "八个字：大杂居、小聚居、交错杂居——边疆有聚居区，内地也有分布。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "下列属于自治区的是？",
                    options: ["四川省", "重庆市", "西藏自治区"],
                    answer: 2,
                    recordKey: "geog_quiz_dg08.2.2-p2b",
                    explain: "5 自治区：内蒙古、新疆、西藏、宁夏、广西。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "对号入座：五个自治区名字打乱了，点名字放到轮廓上的正确位置，放错有提示。做完再答两道收官题。" },
                { type: "text", html: "<strong>场层真值</strong>：五大自治区名录与行政中心、主要民族（GeoBatch5.FIVE_AUTONOMOUS 冻结常量）。<strong>UI 可达</strong>：点名 → 落位 → 判分。本图为 A 级（省级单元配对），国界/省界/十段线等按审定书由地图队绘制，地理队逐页人工核对。" },
                { type: "slogan", text: "五区对号，大杂居小聚居。" }
              ],
              point: "五大自治区对号入座（geo-map ethnic-match，A 级）+ 收官两问。本课完成，下一课：本章小结。"
            }
          ]
        },
        /* ============ dg08.2.3 本章小结与习题（2 页） ============ */
        {
          id: "dg08.2.3",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：小结页 ================= */
            {
              id: "dg08.2.3-p1",
              kind: "explain",
              title: "小结：疆域—人口—民族三条线",
              exploreTip: "一章串成三条线：位置定坐标，疆域画范围，人口民族说人。",
              blocks: [
                { type: "lead", text: "本章三条线：① 位置——东半球北半球、大部分温带、亚欧大陆东部太平洋西岸；② 疆域——960 万 km²（世界第三）、四至点、14+6 邻国、34 个省级；③ 人口民族——14.12 亿（2020 年七普）、胡焕庸线东多西少、56 个民族大杂居小聚居。" },
                { type: "text", html: "<strong>易错清单</strong>（本章 trap 回顾）：西半球 ×→ 东半球（20°W–160°E）；省级 23 ×→ 34（自治区/直辖市/特别行政区别漏）；人口政策不变 ×→ 一孩→二孩→三孩动态调整；少数民族只在边疆 ×→ 大杂居小聚居；邻国数永恒 ×→ 现行教材统计口径。" },
                { type: "text", html: "<strong>方法沉淀</strong>：看任何“数量”结论，先问三个问题——哪一年？什么口径？和谁比？（960 万的人教版口径、14.12 亿的七普年份、94% 沿用人教版现行教材表述（胡焕庸 1935 年原文为 96%），都是这么来的。）" },
                { type: "slogan", text: "三线串一章，口径年份莫要忘。" }
              ],
              point: "dg08 小结：位置/疆域/人口民族三条线；易错五项；方法：看数量先问年份、口径、比较对象。"
            },
            /* ================= p2：综合习题页 ================= */
            {
              id: "dg08.2.3-p2",
              kind: "interact",
              title: "综合习题：疆域与人口",
              exploreTip: "4 道综合题，覆盖全章三条线。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "关于中国位置，表述正确的是？",
                    options: ["西半球、北半球；亚欧大陆西部、大西洋东岸", "东半球、南半球；亚欧大陆东部、印度洋北岸", "东半球、北半球；亚欧大陆东部、太平洋西岸"],
                    answer: 2,
                    recordKey: "geog_quiz_dg08.2.3-p2a",
                    explain: "三层位置：半球（东/北）、纬度（大部分温带）、海陆（亚欧东、太平洋西）。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "下列关于疆域的表述，正确的是？",
                    options: ["陆地约 96 万 km²；最北端曾母暗沙", "陆地约 960 万 km²（世界第三）；最南端曾母暗沙（约 4°N）", "陆地约 9600 万 km²；最南端海南岛"],
                    answer: 1,
                    recordKey: "geog_quiz_dg08.2.3-p2b",
                    explain: "960 万 km² 世界第三（人教版口径）；四至约 53°N/4°N/135°E/73°E。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于人口，表述正确的是？",
                    options: ["人口约 10 亿；全国均匀分布", "七普（2020 年）约 14.12 亿；胡焕庸线东南约占 94%，东多西少", "七普约 20 亿；西多东少"],
                    answer: 1,
                    recordKey: "geog_quiz_dg08.2.3-p2c",
                    explain: "14.12 亿看年份（2020）；94% 看口径（沿用人教版现行教材表述，胡焕庸 1935 年原文为 96%）；政策动态调整。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "关于民族与行政区划，表述正确的是？",
                    options: ["23 个省级；少数民族只在边疆", "34 个省级；56 个民族，大杂居、小聚居", "34 个省级；汉族约占 50%"],
                    answer: 1,
                    recordKey: "geog_quiz_dg08.2.3-p2d",
                    explain: "34 = 23+5+4+2；汉族约 91.11%（七普）；大杂居小聚居八个字。"
                  }
                }
              ],
              blocks: [
                { type: "lead", text: "4 道综合题，一题一条线：位置、疆域、人口、民族行政区划。" },
                { type: "text", html: "dg08 完成。下一章 dg09：中国的自然环境——地形三级阶梯、季风气候、长江黄河。" },
                { type: "slogan", text: "带走一句话：疆域是舞台，人口是主角。" }
              ],
              point: "dg08 完成。下一章：dg09 中国的自然环境。"
            }
          ]
        }
      ]
    }
  ]
};
