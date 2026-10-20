/* ============================================================
 * 学习工具箱 · 生物 · 第十章数据（生物 P14 生产队 2026-10-19）
 *
 * 课：b10.1.1 细菌（3 页）/ b10.1.2 真菌（2 页）/
 *     b10.1.3 病毒与微生物的应用（3 页）/
 *     b10.1.4 本章小结与习题（2 页）。共 10 页。
 * 交互：细菌结构模式图（与真核细胞对比）/ 二分裂指数直观版 /
 * 酵母菌发酵演示（气球胀大）/ 酸奶制作流程三步，均为纯 HTML 内联
 * handler（window.BIO_B10，b09 的 window.BIO_B09 配对先例），
 * 不新增引擎组件。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - "模式图：非等比、非实物"（BIO-R32；细菌结构模式图）
 * - "示意，非真实速度/比例。"（BIO-R35；酵母菌发酵演示）
 * - "虚拟实验：现实中须××"（BIO-R35；酵母菌发酵演示××=无菌操作、
 *   恒温约 25–30℃、等待数小时；无动画/无实验的页不写）
 * - 认旧友深链 2 处（b10.1.3-p2 mathlink→b15.1.2 乳酸发酵；
 *   b10.1.1-p3 mathlink→代数 8.1/8.2.1 指数，XLINK_COMBO 既有）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 红线落实：
 * - 细菌口径："细菌都是有害的"= FAIL→只写"多数无害：乳酸菌做酸奶、
 *   根瘤菌固氮"（b10.1.1-p3 trap）
 * - 蘑菇口径："蘑菇是植物"= FAIL→只写"真菌（无叶绿体，异养）"
 *   （b10.1.2-p2 trap）；野生菌安全 BIO-R68：只讲"不采食野生菌"，
 *   不做野外辨认指导
 * - 病毒口径："病毒是最小的细胞"= FAIL→只写"无细胞结构（不是细胞；
 *   不列入生命结构层次）"（b10.1.3-p1 trap；BIO-R46）
 * - BIO-R49 判据："有无以核膜为界限的细胞核"（b10.1.1-p1/p3）
 * - BIO-R50：细菌原核/真菌真核（b10.1.1-p1、b10.1.2-p2）
 *
 * 门禁⑧：新术语首现即定义——原核生物/芽孢（b10.1.1）/
 * 孢子（b10.1.2-p1）/噬菌体/巴氏消毒（b10.1.3）。
 * 门禁⑨：深链 2 处课号均已生产（b15.1.2、代数 8.1/8.2.1 数学模块）；
 * b11/b12/b23/b24/b25 本批正文零引用。
 * 门禁⑩：新登记预告 1 条（b10.1.1-a1：学完代数 8.1/8.2.1 后回填指数读图，
 * 台账 drafted）。
 * 门禁⑪：quiz 页题目数 > 0（b10.1.4 两页：review+3 choice / review+3 choice）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b10"] = {
  id: "b10",
  units: [
    {
      id: "b10.1",
      title: "微生物",
      lessons: [
        {
          id: "b10.1.1",
          title: "细菌",
          prereq: "b09 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：细菌的形态与结构 ============ */
            {
              id: "b10.1.1-p1",
              kind: "explain",
              title: "细菌的形态与结构",
              blocks: [
                { type: "lead", text: "一滴脏水里，显微镜下全是游动的小点——它们是细胞吗？" },
                { type: "text", html: "先认词——原核生物：没有\"以核膜为界限的细胞核\"的生物。细菌就是原核生物：它的 DNA 裸露着，缩成一团叫拟核，没有真正的细胞核。" },
                { type: "text", html: "细菌只有三种基本形态：球菌（圆球形）、杆菌（杆状）、螺旋菌（螺旋形），大小一般以微米计（1 微米=千分之一毫米）。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 190\" width=\"100%\" role=\"img\" aria-label=\"细菌结构模式图\" style=\"max-width:380px;display:block;margin:6px auto\">" +
                  "<ellipse cx=\"150\" cy=\"95\" rx=\"105\" ry=\"62\" style=\"fill:none;stroke:var(--bio-text)\" stroke-width=\"2.5\"/>" +
                  "<ellipse cx=\"150\" cy=\"95\" rx=\"92\" ry=\"50\" style=\"fill:none;stroke:var(--bio-ink-soft)\" stroke-width=\"1.5\" stroke-dasharray=\"6 4\"/>" +
                  "<path d=\"M105 80 q 20 -18 40 0 q 20 18 40 0\" style=\"fill:none;stroke:var(--bio-organelle)\" stroke-width=\"3\"/>" +
                  "<path d=\"M110 115 q 25 14 45 0 q 20 -12 40 2\" style=\"fill:none;stroke:var(--bio-organelle)\" stroke-width=\"3\"/>" +
                  "<path d=\"M255 95 q 30 -8 45 6\" style=\"fill:none;stroke:var(--bio-text)\" stroke-width=\"2.5\"/>" +
                  "<text x=\"150\" y=\"60\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">拟核（DNA）</text>" +
                  "<text x=\"48\" y=\"150\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">细胞壁</text>" +
                  "<text x=\"255\" y=\"150\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">细胞膜</text>" +
                  "<text x=\"300\" y=\"70\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">鞭毛</text>" +
                  "<text x=\"170\" y=\"182\" font-size=\"12.5\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">细菌结构模式图（模式图：非等比、非实物）</text>" +
                  "</svg>" +
                  "<div style=\"text-align:center;margin:4px 0\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B10.compare(this)\">对比：真核细胞长什么样？</button></div>" +
                  "<div id=\"bioB10Compare\" style=\"display:none;border:1px solid var(--bio-line);border-radius:10px;padding:10px;margin:6px 0;background:var(--bio-panel);font-size:0.95rem;line-height:1.7\">你的口腔上皮细胞就是真核细胞：DNA 被核膜包着。细菌没有这层膜——这就是\"原核\"和\"真核\"的判据。</div>" },
                { type: "note", text: "细菌=原核生物（无成形细胞核）+ 三种形态（球/杆/螺旋）。" }
              ],
              point: "细菌是原核生物：无成形细胞核，形态有球/杆/螺旋。"
            },
            /* ============ p2：芽孢与分裂生殖 ============ */
            {
              id: "b10.1.1-p2",
              kind: "explain",
              title: "芽孢与分裂生殖",
              blocks: [
                { type: "lead", text: "细菌不\"生孩子\"——但它会\"装睡\"保命。" },
                { type: "text", html: "先认词——芽孢：某些细菌在恶劣环境下形成的休眠体。芽孢壁厚、代谢几乎停止，能耐高温、干旱——记住：芽孢不是生殖，不增加数量！" },
                { type: "text", html: "细菌真正的繁殖叫二分裂：一个长大后从中间裂成两个，两个再裂成四个……条件合适时 20 分钟分裂一次。乳酸菌（做酸奶、泡菜）、醋酸菌（酿醋）都是对人有益的细菌。" },
                { type: "note", text: "记住：芽孢=休眠（保命），二分裂=繁殖（加数量）。" }
              ],
              point: "芽孢是休眠体（非生殖）；细菌靠二分裂繁殖。"
            },
            /* ============ p3：分类表述+专治+指数直观版+预告 ============ */
            {
              id: "b10.1.1-p3",
              kind: "explain",
              title: "分类、专治与指数爆炸",
              blocks: [
                { type: "text", html: "认词口径：判断原核/真核只看一条——有没有\"以核膜为界限的细胞核\"。细菌没有→原核生物；酵母菌有→真核生物（下一课见）。" },
                { type: "trap", text: "⚠️ \"细菌都是有害的\"错——多数无害！正确：乳酸菌做酸奶、根瘤菌帮豆科植物固氮；有害的只是少数。" },
                { type: "text", html: "按一次按钮，细菌分裂一次：1→2→4→8……第 10 次分裂后是 1024 个（2 的 10 次方），第 20 次后约 100 万个——这就是\"指数爆炸\"。" +
                  "<div style=\"text-align:center;margin:8px 0\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B10.exp(this)\">再分裂一次</button> " +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B10.expReset()\">重来</button></div>" +
                  "<div id=\"bioB10ExpMsg\" style=\"text-align:center;min-height:3em;font-size:1rem;line-height:1.7\">第 0 次分裂：1 个细菌。按按钮开始。</div>" },
                { type: "mathlink", text: "认旧友：代数 8.1/8.2.1——\"指数爆炸\"的数学名字叫\"幂\"，学完这两课，这张图就是一道数学题。" },
                { type: "note", text: "预告：学完代数 8.1/8.2.1 后回填——用指数算一算：1 个细菌 24 小时能变成多少个？" },
                { type: "mathlink", text: "兑现：b10.1.1-a1 问过——“学完代数 8.1/8.2.1 后回填——用指数算一算：1 个细菌 24 小时能变成多少个？”——答案：按 20 分钟分裂一次算，24 小时分裂 72 次，就是 2 的 72 次方，约 4.7×10²¹ 个——用代数 8.1/8.2.1 的话说：细菌数=2 的（分裂次数）次方，这正是底数大于 1 的指数函数：指数每加 1，数量翻一番，所以越往后涨得越猛。" }
              ],
              point: "多数细菌无害；二分裂带来指数爆炸（预告：学完代数 8.1/8.2.1 回填）。"
            }
          ]
        },
        {
          id: "b10.1.2",
          title: "真菌",
          prereq: "细菌",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：酵母菌与霉菌+发酵演示 ============ */
            {
              id: "b10.1.2-p1",
              kind: "explain",
              title: "酵母菌与霉菌",
              blocks: [
                { type: "lead", text: "馒头为什么松软？——都是酵母菌呼出的\"气\"。" },
                { type: "text", html: "酵母菌：单细胞真菌。先认词——出芽生殖：母细胞长出小芽，芽长大后脱离成新个体。发酵：酵母菌把糖变成酒精（化学名乙醇）＋二氧化碳——馒头的孔洞是 CO₂ 撑的。" },
                { type: "text", html: "霉菌：多细胞真菌，靠孢子生殖。先认词——孢子：真菌的繁殖体，随风飘散。馒头上长的\"白毛\"就是霉菌的菌丝；青霉能产青霉素。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center\">" +
                  "<svg viewBox=\"0 0 200 150\" width=\"100%\" role=\"img\" aria-label=\"酵母菌发酵演示\" style=\"max-width:220px;display:block;margin:0 auto\">" +
                  "<rect x=\"80\" y=\"90\" width=\"40\" height=\"50\" rx=\"6\" style=\"fill:var(--bio-panel);stroke:var(--bio-text)\" stroke-width=\"2\"/>" +
                  "<rect x=\"80\" y=\"110\" width=\"40\" height=\"30\" rx=\"6\" style=\"fill:var(--bio-aux);opacity:.45;stroke:none\"/>" +
                  "<ellipse id=\"bioB10Balloon\" cx=\"100\" cy=\"62\" rx=\"26\" ry=\"24\" style=\"fill:var(--bio-organelle);opacity:.75;transform-origin:100px 90px;transition:transform 1.2s\"/>" +
                  "<rect x=\"94\" y=\"84\" width=\"12\" height=\"10\" style=\"fill:var(--bio-ink-soft)\"/>" +
                  "<text x=\"100\" y=\"145\" font-size=\"12\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">糖水+酵母菌</text>" +
                  "</svg>" +
                  "<div style=\"margin:6px 0\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B10.ferment()\">开始发酵</button> " +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B10.fermentReset()\">重来</button></div>" +
                  "<div id=\"bioB10FermMsg\" style=\"min-height:2.6em;font-size:0.95rem;line-height:1.7\">按\"开始发酵\"，看气球被 CO₂ 一点点撑大。</div>" +
                  "<div style=\"font-size:12.5px;color:var(--bio-ink-soft);margin-top:4px\">虚拟实验：现实中须无菌操作、恒温约 25–30℃、等待数小时；气球胀大为加速示意。示意，非真实速度/比例。</div>" +
                  "</div>" },
                { type: "note", text: "酵母菌=出芽生殖+发酵；霉菌=孢子生殖（青霉产青霉素）。" }
              ],
              point: "酵母菌出芽生殖、发酵产 CO₂；霉菌孢子生殖。"
            },
            /* ============ p2：蘑菇+安全口径 ============ */
            {
              id: "b10.1.2-p2",
              kind: "explain",
              title: "蘑菇与安全口径",
              blocks: [
                { type: "lead", text: "蘑菇没有叶、没有根——它根本不是植物！" },
                { type: "text", html: "蘑菇：大型真菌。地下的菌丝织成网，地面上的\"伞\"只是它的繁殖器官（子实体），专门散播孢子。" },
                { type: "trap", text: "⚠️ \"蘑菇是植物\"错——蘑菇是真菌！正确：无叶绿体、不能光合作用，靠分解现成的有机物生活（异养）；植物有叶绿体、能光合作用。" },
                { type: "text", html: "蘑菇的\"伞\"下有菌褶，孢子从这里散出去——采走\"伞\"等于帮它传播后代；但野生的仍然不许采、不许尝。" },
                { type: "note", text: "一句话：蘑菇=真菌（无叶绿体，异养）；野外蘑菇只看不采。" }
              ],
              point: "蘑菇是真菌（无叶绿体，异养）；不采食野生菌。"
            }
          ]
        },
        {
          id: "b10.1.3",
          title: "病毒与微生物的应用",
          prereq: "真菌",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：病毒 ============ */
            {
              id: "b10.1.3-p1",
              kind: "explain",
              title: "病毒：无细胞结构",
              blocks: [
                { type: "lead", text: "比细菌小得多、没有细胞——病毒是生物吗？" },
                { type: "text", html: "病毒：无细胞结构！只有蛋白质外壳包着一点遗传物质（DNA 或 RNA），必须寄生在活细胞里才能繁殖。先认词——噬菌体：专门攻击细菌的病毒。" },
                { type: "text", html: "病毒按宿主分三类：噬菌体（攻击细菌）、动物病毒（如流感病毒）、植物病毒（如烟草花叶病毒）。离开活细胞，病毒只是一粒\"化学颗粒\"。" },
                { type: "trap", text: "⚠️ \"病毒是最小的细胞\"错——病毒不是细胞！正确：无细胞结构，不列入生命结构层次（细胞→组织→器官→…的链条里没有它）。" },
                { type: "note", text: "记住：病毒=蛋白质外壳+遗传物质，无细胞结构，专性寄生。" }
              ],
              point: "病毒无细胞结构（不是细胞），专性寄生。"
            },
            /* ============ p2：发酵食品+认旧友 b15 ============ */
            {
              id: "b10.1.3-p2",
              kind: "explain",
              title: "发酵食品：酸奶案例",
              blocks: [
                { type: "lead", text: "一杯酸奶，是几十亿个细菌的\"杰作\"。" },
                { type: "text", html: "酸奶：乳酸菌把牛奶里的乳糖变成乳酸——奶变酸、变稠，就是酸奶。泡菜、腐乳也是发酵食品：不同的菌，变出不同的风味。" },
                { type: "text", html: "乳酸发酵也是\"无氧呼吸\"：没有氧气，乳酸菌照样\"干活\"。泡菜：乳酸菌把菜里的糖变成乳酸，酸味能抑菌——古人没有冰箱，靠发酵\"保鲜\"。" },
                { type: "mathlink", text: "认旧友：b15.1.2——乳酸菌产乳酸属于无氧呼吸（乳酸发酵），在 b15.1.2 学过，这里再认一次。" },
                { type: "note", text: "厨房即实验室：发酵=微生物替你\"加工\"食物。" }
              ],
              point: "酸奶=乳酸菌把乳糖变乳酸；泡菜/腐乳也是发酵食品。"
            },
            /* ============ p3：食品保存+酸奶三要素 ============ */
            {
              id: "b10.1.3-p3",
              kind: "explain",
              title: "食品保存与酸奶制作",
              blocks: [
                { type: "lead", text: "牛奶放三天就馊——怎么让食物\"慢点变质\"？" },
                { type: "text", html: "食品保存=不让微生物\"开饭\"：冷藏（低温让微生物长得慢）、巴氏消毒（先认词——巴氏消毒：约 72℃加热十几秒，杀死致病菌又不破坏营养，牛奶常用）。" },
                { type: "text", html: "酸奶制作三要素：菌种（买一小杯市售酸奶做\"引子\"）、温度（约 40℃、温热不烫手）、时间（6–8 小时，奶变稠就放冰箱）。家里做注意卫生：容器开水烫过；肠胃弱的人建议直接买市售酸奶。" },
                { type: "note", text: "保存两招：冷藏（抑菌）、巴氏消毒（杀菌）；做酸奶三要素：菌种/温度/时间。" }
              ],
              point: "食品保存：冷藏抑菌、巴氏消毒杀菌；酸奶三要素记牢。"
            }
          ]
        },
        {
          id: "b10.1.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40 分钟",
          pages: [
            /* ============ p1：习题（一） ============ */
            {
              id: "b10.1.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b10.1.1：细菌（原核生物：无成形细胞核；形态球/杆/螺旋；芽孢是休眠体非生殖；二分裂繁殖；多数无害：乳酸菌做酸奶、根瘤菌固氮；指数爆炸直观版）。b10.1.2：真菌（酵母菌：出芽生殖、发酵产 CO₂；霉菌：孢子生殖、青霉；蘑菇是真菌：无叶绿体、异养；不采食野生菌）。b10.1.3：病毒（无细胞结构、专性寄生：噬菌体/动物病毒/植物病毒；不列入生命结构层次）；发酵食品（酸奶=乳酸菌→乳酸；泡菜/腐乳）；食品保存（冷藏/巴氏消毒）；酸奶三要素（菌种/约 40℃/6–8 小时）。" },
                { type: "choice", stem: "细菌与真核细胞最根本的区别是？",
                  options: ["细菌更小", "细菌无成形细胞核（原核生物）", "细菌没有细胞壁", "细菌不能繁殖"], answer: 1,
                  tip: "判据只有一条：有无\"以核膜为界限的细胞核\"——细菌没有，是原核生物（b10.1.1 第 1、3 页）。" },
                { type: "choice", stem: "关于芽孢，正确的是？",
                  options: ["芽孢是细菌的生殖方式", "芽孢是休眠体，不增加数量", "所有细菌都能形成芽孢", "芽孢只能耐低温"], answer: 1,
                  tip: "芽孢=休眠（保命），二分裂=繁殖（加数量）——芽孢不是生殖（b10.1.1 第 2 页）。" },
                { type: "choice", stem: "蘑菇是？",
                  options: ["植物（有叶绿体）", "真菌（无叶绿体，异养）", "细菌", "病毒"], answer: 1,
                  tip: "蘑菇是真菌！无叶绿体、不能光合作用，靠分解现成有机物生活（b10.1.2 第 2 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b10.1.4-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "review", html: "本章小结——b10.1.1：细菌（原核/球杆螺旋/芽孢休眠/二分裂/多数无害/指数爆炸）。b10.1.2：真菌（酵母菌出芽+发酵/霉菌孢子/蘑菇是真菌/不采食野生菌）。b10.1.3：病毒（无细胞结构/专性寄生/不列入生命结构层次）；发酵（酸奶=乳酸菌→乳酸，认旧友 b15.1.2）；保存（冷藏/巴氏消毒约 72℃十几秒）；酸奶三要素（菌种/约 40℃/6–8 小时）。" },
                { type: "choice", stem: "病毒不列入生命结构层次，是因为？",
                  options: ["病毒太小", "病毒无细胞结构，不是细胞", "病毒不能寄生", "病毒没有遗传物质"], answer: 1,
                  tip: "病毒无细胞结构、不是细胞——结构层次从细胞开始，病毒进不了这个链条（b10.1.3 第 1 页）。" },
                { type: "choice", stem: "酸奶变酸、变稠的直接原因是？",
                  options: ["加了白糖", "乳酸菌把乳糖变成乳酸", "牛奶放久了", "加了防腐剂"], answer: 1,
                  tip: "酸奶=乳酸菌把乳糖变乳酸——发酵的功劳，不是放坏了（b10.1.3 第 2 页）。" },
                { type: "choice", stem: "巴氏消毒的特点是？",
                  options: ["高温长时间彻底灭菌", "约 72℃加热十几秒，杀死致病菌又不破坏营养", "冷冻杀菌", "加防腐剂"], answer: 1,
                  tip: "巴氏消毒：约 72℃加热十几秒——杀死致病菌，又保住营养和风味（b10.1.3 第 3 页）。" }
              ],
              point: "全章完。"
            }
          ]
        }
      ]
    }
  ]
};

/* ============================================================
 * b10 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b09 的 window.BIO_B09 配对先例）。命名空间 window.BIO_B10。
 * 细菌结构对比 / 二分裂指数直观版 / 酵母菌发酵演示。
 * ============================================================ */
window.BIO_B10 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  /* ---------- 细菌 vs 真核细胞对比（b10.1.1-p1） ---------- */
  function compare(btn) {
    var d = document.getElementById("bioB10Compare");
    if (!d) return;
    var show = d.style.display === "none";
    d.style.display = show ? "block" : "none";
    if (btn) btn.textContent = show ? "收起对比" : "对比：真核细胞长什么样？";
  }
  /* ---------- 二分裂指数直观版（b10.1.1-p3） ---------- */
  var expN = 0;
  function exp() {
    expN++;
    var n = Math.pow(2, expN);
    var show = n >= 10000 ? "约 " + (n / 10000).toFixed(1) + " 万" : String(n);
    say("bioB10ExpMsg", "第 " + expN + " 次分裂：" + show + " 个细菌。" +
      (expN >= 20 ? "<br>20 次分裂≈100 万个——指数爆炸！" : "<br>再按一次，数量翻一番。"));
  }
  function expReset() { expN = 0; say("bioB10ExpMsg", "第 0 次分裂：1 个细菌。按按钮开始。"); }
  /* ---------- 酵母菌发酵演示（b10.1.2-p1） ---------- */
  var fermStep = 0;
  function ferment() {
    fermStep++;
    var b = document.getElementById("bioB10Balloon");
    if (b) {
      var s = 1 + Math.min(fermStep, 5) * 0.28;
      b.style.transform = "scale(" + s.toFixed(2) + ")";
    }
    say("bioB10FermMsg", fermStep >= 5
      ? "气球鼓起来了！酵母菌把糖变成酒精+二氧化碳，CO₂ 把气球撑大——馒头的孔洞也是这么来的。"
      : "发酵进行中……CO₂ 不断产生，气球越来越大（第 " + fermStep + " 段）。");
  }
  function fermentReset() {
    fermStep = 0;
    var b = document.getElementById("bioB10Balloon");
    if (b) b.style.transform = "scale(1)";
    say("bioB10FermMsg", "按\"开始发酵\"，看气球被 CO₂ 一点点撑大。");
  }
  return { compare: compare, exp: exp, expReset: expReset, ferment: ferment, fermentReset: fermentReset };
})();
