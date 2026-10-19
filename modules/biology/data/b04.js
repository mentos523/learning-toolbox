/* ============================================================
 * 学习工具箱 · 生物 · 第四章数据（生物 P11 生产队 2026-10-19）
 *
 * 课：b04.1.1 人类的起源（2 页）/ b04.1.2 生殖系统的组成（3 页）/
 *     b04.1.3 生殖过程（3 页）/ b04.1.4 青春期（2 页）/
 *     b04.1.5 各类生物的生殖和发育（3 页）/
 *     b04.1.6 本章小结与习题（2 页）。共 15 页。
 * 交互：化石证据时间轴 / 生殖系统结构图点选 /
 * 受精到分娩分步动画 / 变态发育对比动画，均为纯 HTML 内联
 * handler（window.BIO_B04，b06 的 window.BIO_B06 先例），
 * 不新增引擎组件。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 共同祖先是森林古猿（b04.1.1-p1/p2 专治；
 *   「人类由现代类人猿进化来」= FAIL）
 * - 睾丸产精子、卵巢产卵细胞（b04.1.2-p1/p2 专治；审计清单第 1 条）
 * - 胎盘绒毛内毛细血管与母体血液间物质交换，血液不直接混合
 *   （b04.1.3-p1 专治）
 * - 正常的生理现象，科学看待（b04.1.4-p1/p2；不贴标签）
 * - 接穗性状保持，砧木只供营养（b04.1.5-p1 专治；BIO-R52）
 * - 模式图：非等比、非实物（BIO-R32；结构示意图角落常驻）
 * - 示意，非真实速度/比例（BIO-R35；示意类动画常驻）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 门禁⑧：新术语首现即定义——森林古猿（b04.1.1-p1）/
 * 睾丸（b04.1.2-p1）/卵巢（b04.1.2-p2）/胎盘（b04.1.3-p1）/
 * 第二性征（b04.1.4-p1）/扦插/嫁接（b04.1.5-p1）/
 * 变态发育（b04.1.5-p2）。
 * 门禁⑨：深链 2 处（b04.1.1-p1→b21.1.4；b04.1.2-p3→b05.1.3；
 * 均已生产）；b09/b10/b12/b22 正文零引用。
 * 门禁⑩：本批无新登记预告。
 * 门禁⑪：quiz 页题目数 > 0（b04.1.6 两页：3 + 4）。
 *
 * 表述口径（curriculum b04 全章）：生殖/青春期只讲生物学事实，
 * 科学克制，不渲染、不贴标签（BIO-R40；审计清单第 8、12 条）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b04"] = {
  id: "b04",
  units: [
    {
      id: "b04.1",
      title: "生殖与发育",
      lessons: [
        {
          id: "b04.1.1",
          title: "人类的起源",
          prereq: "b03 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：共同祖先 + 化石时间轴 ============ */
            {
              id: "b04.1.1-p1",
              kind: "explain",
              title: "共同的祖先：森林古猿",
              blocks: [
                { type: "lead", text: "人从哪里来？——只讲证据。" },
                { type: "text", html: "先认词——森林古猿：约1000万年前生活在非洲森林中的古猿，是人类与现代类人猿的共同祖先。" },
                { type: "text", html: "历程三步：直立行走（解放双手）→制造工具→大脑发达。点时间轴，看每一步的关键证据。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.fossil('ape',this)\">森林古猿</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.fossil('aus',this)\">南方古猿</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.fossil('hab',this)\">能人</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.fossil('ere',this)\">直立人</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.fossil('sap',this)\">智人</button>" +
                  "<div id=\"bioB04Fossil\" style=\"min-height:5.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点阶段，看关键证据。</div>" +
                  "</div>" },
                { type: "mathlink", text: "认旧友：b21.1.4——进化章已讲人类起源（森林古猿→直立行走→制造工具）；本章细讲人的生殖与发育。" },
                { type: "note", text: "时间均为\"约\"，时间轴为示意（非等比）。三问自查——共同祖先是谁？直立行走的意义？哪一步开始制造工具？（答案在本页）" }
              ],
              point: "人类与现代类人猿的共同祖先是森林古猿；历程：直立行走→制造工具→大脑发达。"
            },
            /* ============ p2：证据（化石/胚胎学）+ 误区专治 ============ */
            {
              id: "b04.1.1-p2",
              kind: "explain",
              title: "证据：化石与胚胎",
              blocks: [
                { type: "lead", text: "证据有两条线：化石和胚胎。" },
                { type: "text", html: "化石证据：地层中发现的古人类化石（如下颌骨、头骨），按地层年代排成时间轴，是最直接的证据。" },
                { type: "text", html: "胚胎学证据：人的胚胎早期出现鳃裂和尾，说明人与鱼类等脊椎动物有共同的祖先。" },
                { type: "trap", text: "⚠️ \"人类由现代类人猿进化来\"错——共同祖先是森林古猿！现代类人猿（黑猩猩/大猩猩）是\"表亲\"，不是\"爷爷\"。" },
                { type: "note", text: "一句话：人类起源只讲证据——化石+胚胎；历程三步：直立行走→制造工具→大脑发达。复述一遍。" }
              ],
              point: "化石+胚胎学是人类起源的两条证据线；现代类人猿是\"表亲\"不是\"祖先\"。"
            }
          ]
        },
        {
          id: "b04.1.2",
          title: "生殖系统的组成",
          prereq: "人类的起源",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：男性生殖系统 ============ */
            {
              id: "b04.1.2-p1",
              kind: "explain",
              title: "男性生殖系统：睾丸产精子",
              blocks: [
                { type: "lead", text: "先认对：精子在哪里产生？" },
                { type: "text", html: "先认词——睾丸：男性主要性器官，产生精子，分泌雄性激素。" },
                { type: "text", html: "组成与功能：睾丸（产生精子+分泌雄性激素）→输精管（输送精子）→前列腺（分泌黏液，利于精子活动）→尿道（排出体外）。" },
                { type: "trap", text: "⚠️ \"精子在卵巢产生\"错——睾丸产精子、卵巢产卵细胞，一次记对！" },
                { type: "note", text: "记忆钩：\"男睾精\"——男性睾丸产精子。遮住上面，复述四个结构的功能。" }
              ],
              point: "睾丸产精子+分泌雄性激素；输精管输送；前列腺分泌黏液。"
            },
            /* ============ p2：女性生殖系统 ============ */
            {
              id: "b04.1.2-p2",
              kind: "explain",
              title: "女性生殖系统：卵巢产卵细胞",
              blocks: [
                { type: "lead", text: "卵细胞在哪里产生？" },
                { type: "text", html: "先认词——卵巢：女性主要性器官，产生卵细胞，分泌雌性激素。" },
                { type: "text", html: "组成与功能：卵巢（产生卵细胞+分泌雌性激素）→输卵管（输送卵细胞；受精的场所）→子宫（胚胎发育的场所）→阴道（精子进入和胎儿产出的通道）。" },
                { type: "note", text: "记忆钩：\"女卵巢卵\"——女性卵巢产卵细胞；受精在输卵管，发育在子宫。遮住上面，复述四个结构的功能。" }
              ],
              point: "卵巢产卵细胞+分泌雌性激素；受精在输卵管，发育在子宫。"
            },
            /* ============ p3：结构与功能相适应 + 结构图 ============ */
            {
              id: "b04.1.2-p3",
              kind: "explain",
              title: "结构图：形配其用",
              blocks: [
                { type: "lead", text: "每个结构都有它的\"用\"——形配其用。" },
                { type: "mathlink", text: "认旧友：b05.1.3——\"形配其用\"（辨析①立靶）：小肠结构各配其用；生殖系统也一样，结构与功能相适应。" },
                { type: "text", html: "<svg viewBox=\"0 0 360 132\" width=\"100%\" role=\"img\" aria-label=\"男性生殖系统模式图\" style=\"max-width:380px;display:block;margin:6px auto\">" +
                  "<text x=\"8\" y=\"15\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "<text x=\"180\" y=\"32\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\">男性生殖系统</text>" +
                  "<rect x=\"8\" y=\"44\" width=\"72\" height=\"52\" rx=\"8\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"44\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">睾丸</text>" +
                  "<text x=\"44\" y=\"84\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">产生精子</text>" +
                  "<text x=\"90\" y=\"74\" font-size=\"14\">→</text>" +
                  "<rect x=\"102\" y=\"44\" width=\"72\" height=\"52\" rx=\"8\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"138\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">输精管</text>" +
                  "<text x=\"138\" y=\"84\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">输送精子</text>" +
                  "<text x=\"184\" y=\"74\" font-size=\"14\">→</text>" +
                  "<rect x=\"196\" y=\"44\" width=\"72\" height=\"52\" rx=\"8\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"232\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">前列腺</text>" +
                  "<text x=\"232\" y=\"84\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">分泌黏液</text>" +
                  "<text x=\"278\" y=\"74\" font-size=\"14\">→</text>" +
                  "<rect x=\"290\" y=\"44\" width=\"62\" height=\"52\" rx=\"8\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"321\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">尿道</text>" +
                  "<text x=\"321\" y=\"84\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">排出</text>" +
                  "</svg>" },
                { type: "text", html: "<svg viewBox=\"0 0 360 132\" width=\"100%\" role=\"img\" aria-label=\"女性生殖系统模式图\" style=\"max-width:380px;display:block;margin:6px auto\">" +
                  "<text x=\"8\" y=\"15\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "<text x=\"180\" y=\"32\" text-anchor=\"middle\" font-size=\"13\" font-weight=\"bold\">女性生殖系统</text>" +
                  "<rect x=\"8\" y=\"44\" width=\"72\" height=\"52\" rx=\"8\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"44\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">卵巢</text>" +
                  "<text x=\"44\" y=\"84\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">产生卵细胞</text>" +
                  "<text x=\"90\" y=\"74\" font-size=\"14\">→</text>" +
                  "<rect x=\"102\" y=\"44\" width=\"72\" height=\"52\" rx=\"8\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"138\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">输卵管</text>" +
                  "<text x=\"138\" y=\"84\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">输送；受精</text>" +
                  "<text x=\"184\" y=\"74\" font-size=\"14\">→</text>" +
                  "<rect x=\"196\" y=\"44\" width=\"72\" height=\"52\" rx=\"8\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"232\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">子宫</text>" +
                  "<text x=\"232\" y=\"84\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">胚胎发育</text>" +
                  "<text x=\"278\" y=\"74\" font-size=\"14\">→</text>" +
                  "<rect x=\"290\" y=\"44\" width=\"62\" height=\"52\" rx=\"8\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"321\" y=\"66\" text-anchor=\"middle\" font-size=\"13\">阴道</text>" +
                  "<text x=\"321\" y=\"84\" text-anchor=\"middle\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">通道</text>" +
                  "</svg>" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.struct('testis',this)\">睾丸</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.struct('ovary',this)\">卵巢</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.struct('tube',this)\">输卵管</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.struct('uterus',this)\">子宫</button>" +
                  "<div id=\"bioB04Struct\" style=\"min-height:4.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点结构，看\"长什么样→适合干什么\"。</div>" +
                  "</div>" },
                { type: "note", text: "结构图只讲组成与功能，不渲染。动手：遮住图，复述\"睾丸产精子、卵巢产卵细胞\"。" }
              ],
              point: "睾丸产精子、卵巢产卵细胞；各结构形配其用；模式图非等比、非实物。"
            }
          ]
        },
        {
          id: "b04.1.3",
          title: "生殖过程",
          prereq: "生殖系统的组成",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：受精 + 怀孕 + 胎盘 ============ */
            {
              id: "b04.1.3-p1",
              kind: "explain",
              title: "受精与怀孕",
              blocks: [
                { type: "lead", text: "新生命从一次\"相遇\"开始。" },
                { type: "text", html: "受精：精子与卵细胞在输卵管结合，形成受精卵——新生命的起点。" },
                { type: "text", html: "怀孕：受精卵不断分裂形成胚泡，植入子宫内膜，开始怀孕；胚泡发育成胚胎，约8周后称胎儿。" },
                { type: "text", html: "先认词——胎盘：胎儿与母体进行物质交换的器官。胎盘绒毛内毛细血管与母体血液间交换营养物质和氧，胎儿的二氧化碳等废物也经胎盘排出；血液不直接混合。" },
                { type: "trap", text: "⚠️ \"胎儿与母体血液相通\"错——胎盘绒毛内毛细血管与母体血液间物质交换，血液不直接混合！" },
                { type: "note", text: "双向交换：营养物质和氧从母体→胎儿；胎儿的二氧化碳等废物也经胎盘→母体排出。胎盘不是\"只进不出\"。" },
                { type: "note", text: "受精在输卵管；胎盘双向交换物质，血液不直接混合。" }
              ],
              point: "受精在输卵管；胎盘交换物质，血液不直接混合。"
            },
            /* ============ p2：分娩 ============ */
            {
              id: "b04.1.3-p2",
              kind: "explain",
              title: "分娩",
              blocks: [
                { type: "lead", text: "约40周后，新生命\"报到\"。" },
                { type: "text", html: "怀孕约40周（280天），胎儿发育成熟。" },
                { type: "text", html: "分娩：成熟的胎儿从母体阴道产出的过程。" },
                { type: "text", html: "时间线：受精（输卵管）→胚泡植入（子宫内膜）→胚胎→胎儿（约8周后）→分娩（约40周）。" },
                { type: "note", text: "受精→怀孕→分娩是连续的生命过程，只讲生物学事实。" }
              ],
              point: "分娩是成熟的胎儿从母体阴道产出的过程。"
            },
            /* ============ p3：受精到分娩过程动画 ============ */
            {
              id: "b04.1.3-p3",
              kind: "explain",
              title: "动画：受精到分娩",
              blocks: [
                { type: "lead", text: "点五步，看新生命的旅程。" },
                { type: "text", html: "示意，非真实速度/比例。" },
                { type: "text", html: "<svg id=\"bioB04StagesSvg\" viewBox=\"0 0 360 64\" width=\"100%\" role=\"img\" aria-label=\"受精到分娩过程示意\" style=\"max-width:380px;display:block;margin:6px auto\">" +
                  "<text x=\"8\" y=\"14\" font-size=\"12\" fill=\"var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "<circle data-sg=\"1\" cx=\"28\" cy=\"42\" r=\"14\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"28\" y=\"47\" text-anchor=\"middle\" font-size=\"12\">①</text>" +
                  "<text x=\"50\" y=\"47\" font-size=\"14\">→</text>" +
                  "<circle data-sg=\"2\" cx=\"76\" cy=\"42\" r=\"14\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"76\" y=\"47\" text-anchor=\"middle\" font-size=\"12\">②</text>" +
                  "<text x=\"98\" y=\"47\" font-size=\"14\">→</text>" +
                  "<circle data-sg=\"3\" cx=\"124\" cy=\"42\" r=\"14\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"124\" y=\"47\" text-anchor=\"middle\" font-size=\"12\">③</text>" +
                  "<text x=\"146\" y=\"47\" font-size=\"14\">→</text>" +
                  "<circle data-sg=\"4\" cx=\"172\" cy=\"42\" r=\"14\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"172\" y=\"47\" text-anchor=\"middle\" font-size=\"12\">④</text>" +
                  "<text x=\"194\" y=\"47\" font-size=\"14\">→</text>" +
                  "<circle data-sg=\"5\" cx=\"220\" cy=\"42\" r=\"14\" fill=\"var(--bio-panel)\" stroke=\"var(--bio-ink-soft)\"/>" +
                  "<text x=\"220\" y=\"47\" text-anchor=\"middle\" font-size=\"12\">⑤</text>" +
                  "</svg>" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.stages(1,this)\">①受精</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.stages(2,this)\">②胚泡植入</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.stages(3,this)\">③胚胎</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.stages(4,this)\">④胎儿</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.stages(5,this)\">⑤分娩</button>" +
                  "<div id=\"bioB04Stages\" style=\"min-height:5.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点步骤，看每一步发生在哪、发生什么。</div>" +
                  "</div>" },
                { type: "note", text: "动手：按顺序点一遍，复述\"受精→植入→胚胎→胎儿→分娩\"的时间线。" }
              ],
              point: "受精（输卵管）→胚泡植入（子宫）→胚胎→胎儿→分娩（约40周）。"
            }
          ]
        },
        {
          id: "b04.1.4",
          title: "青春期",
          prereq: "生殖过程",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：身体变化 + 月经/遗精 ============ */
            {
              id: "b04.1.4-p1",
              kind: "explain",
              title: "身体的变化",
              blocks: [
                { type: "lead", text: "身体在\"升级\"——这是正常的生理现象。" },
                { type: "text", html: "先认词——第二性征：除性器官外，男女在外形上的性别差异（如声音变粗、乳房发育），是性激素作用的结果。" },
                { type: "text", html: "身体变化：身高突增、第二性征出现、性器官发育成熟。" },
                { type: "text", html: "月经：女性每月一次的子宫出血现象，是卵巢和子宫发育成熟的标志。遗精：男性睡梦中精液排出的现象。都是正常的生理现象，科学看待。" },
                { type: "trap", text: "⚠️ \"青春期变化羞于启齿\"错——月经/遗精都是正常的生理现象，科学看待，不贴标签。" },
                { type: "note", text: "本课只讲生物学事实，不渲染。一句话：青春期身体变化是正常的生理现象。" }
              ],
              point: "第二性征是性激素作用的结果；月经/遗精是正常的生理现象，科学看待。"
            },
            /* ============ p2：心理卫生 ============ */
            {
              id: "b04.1.4-p2",
              kind: "explain",
              title: "心理卫生",
              blocks: [
                { type: "lead", text: "心理也在\"升级\"——科学看待，不贴标签。" },
                { type: "text", html: "心理变化：独立意识增强，愿意与同龄人交往，有时情绪波动——都是成长中的正常现象。" },
                { type: "text", html: "心理卫生：遇到困惑，多与师长、家长交流；把精力放在学习和健康的生活上。" },
                { type: "text", html: "青春期心理变化是成长的正常部分，不贴标签。" },
                { type: "note", text: "一句话：身体和心理的变化都是正常的生理现象，科学看待、健康生活。" }
              ],
              point: "青春期心理卫生：科学看待，不贴标签；困惑多与师长家长交流。"
            }
          ]
        },
        {
          id: "b04.1.5",
          title: "各类生物的生殖和发育",
          prereq: "青春期",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：植物的生殖 + 嫁接专治 ============ */
            {
              id: "b04.1.5-p1",
              kind: "explain",
              title: "植物的生殖：嫁接的真相",
              blocks: [
                { type: "lead", text: "植物也会\"生孩子\"——两种方式。" },
                { type: "text", html: "有性生殖：经过两性生殖细胞结合的生殖方式（如用种子繁殖）。无性生殖：不经过两性生殖细胞结合，由母体直接产生新个体。" },
                { type: "text", html: "营养生殖（无性生殖的一种）：先认词——扦插：剪取植物枝条插入土壤，长成新植株。先认词——嫁接：把一株植物的枝或芽（接穗）接到另一株植物（砧木）上。" },
                { type: "trap", text: "⚠️ \"嫁接后性状混合\"错——接穗的性状保持！砧木只供应营养。想吃甜苹果，就嫁接甜苹果树的枝（接穗）。" },
                { type: "note", text: "记忆钩：\"接穗说了算\"——果实的性状看接穗，不看砧木。" }
              ],
              point: "嫁接：接穗性状保持，砧木只供营养。"
            },
            /* ============ p2：昆虫与两栖类 ============ */
            {
              id: "b04.1.5-p2",
              kind: "explain",
              title: "昆虫与两栖类的发育",
              blocks: [
                { type: "lead", text: "毛毛虫变蝴蝶——变态发育。" },
                { type: "text", html: "先认词——变态发育：幼体与成体形态差别很大，发育中经历显著变化的过程。" },
                { type: "text", html: "完全变态：卵→幼虫→蛹→成虫（家蚕/蝴蝶/蚊）。不完全变态：卵→若虫→成虫（蝗虫/蟋蟀），无蛹期，若虫与成虫形态相似。" },
                { type: "text", html: "两栖类：体外受精（在水中完成）；变态发育（蝌蚪→青蛙：尾消失、长出四肢）。" },
                { type: "note", text: "判据：有没有\"蛹\"期——有蛹=完全变态，无蛹=不完全变态。" }
              ],
              point: "完全变态（有蛹）/不完全变态（无蛹）；两栖类体外受精、变态发育。"
            },
            /* ============ p3：鸟类 + 变态发育对比动画 ============ */
            {
              id: "b04.1.5-p3",
              kind: "explain",
              title: "鸟类：早成雏与晚成雏",
              blocks: [
                { type: "lead", text: "小鸡出壳就会跑，家燕宝宝却要喂——为什么？" },
                { type: "text", html: "鸟类：卵生。早成雏：出壳即能行走、觅食（如鸡/鸭）。晚成雏：出壳不能独立生活，需亲鸟喂养（如家燕）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.metam('silk',this)\">家蚕</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.metam('locust',this)\">蝗虫</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.metam('frog',this)\">青蛙</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B04.metam('swallow',this)\">家燕</button>" +
                  "<div id=\"bioB04Metam\" style=\"min-height:5.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点一种生物，看它的发育路线。</div>" +
                  "</div>" },
                { type: "note", text: "对比：昆虫看\"有没有蛹\"；两栖类看\"水生→陆生\"；鸟类看\"早成/晚成\"。" }
              ],
              point: "鸟类卵生；早成雏出壳能独立，晚成雏需喂养。"
            }
          ]
        },
        {
          id: "b04.1.6",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b04.1.6-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b04.1.1：共同祖先是森林古猿（现代类人猿是\"表亲\"不是\"祖先\"）；证据（化石/胚胎学）；历程（直立行走→制造工具→大脑发达）；认旧友 b21.1.4。b04.1.2：睾丸产精子+分泌雄性激素；卵巢产卵细胞+分泌雌性激素；输精管/前列腺/输卵管/子宫/阴道的功能；结构与功能相适应（辨析①回填：认旧友 b05.1.3\"形配其用\"）；模式图：非等比、非实物。b04.1.3：受精在输卵管；怀孕（胚泡植入子宫内膜；胚胎→胎儿约8周）；胎盘绒毛内毛细血管与母体血液间物质交换，血液不直接混合；分娩（约40周）。b04.1.4：第二性征（性激素作用）；月经/遗精是正常的生理现象，科学看待，不贴标签；心理卫生。b04.1.5：有性/无性生殖；扦插/嫁接（接穗性状保持，砧木只供营养）；完全变态（家蚕：有蛹）/不完全变态（蝗虫：无蛹）；两栖类体外受精、变态发育；鸟类卵生、早成雏/晚成雏。" },
                { type: "choice", stem: "人类与现代类人猿的共同祖先是？",
                  options: ["黑猩猩", "森林古猿", "大猩猩", "南方古猿"], answer: 1,
                  tip: "共同祖先是森林古猿；现代类人猿是\"表亲\"，不是\"祖先\"（b04.1.1 第 1、2 页）。" },
                { type: "choice", stem: "精子产生的部位是？",
                  options: ["卵巢", "睾丸", "输精管", "前列腺"], answer: 1,
                  tip: "睾丸产精子、卵巢产卵细胞，一次记对（b04.1.2 第 1 页）。" },
                { type: "choice", stem: "关于胎盘的说法，正确的是？",
                  options: ["胎儿与母体血液相通", "胎盘绒毛内毛细血管与母体血液间交换物质，血液不直接混合", "胎盘是胎儿的消化器官", "胎盘产生卵细胞"], answer: 1,
                  tip: "胎盘绒毛内毛细血管与母体血液间物质交换，血液不直接混合（b04.1.3 第 1 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b04.1.6-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "受精的场所是？",
                  options: ["子宫", "输卵管", "卵巢", "阴道"], answer: 1,
                  tip: "精子与卵细胞在输卵管结合形成受精卵（b04.1.3 第 1 页）。" },
                { type: "choice", stem: "嫁接后，接穗的性状会？",
                  options: ["保持不变", "与砧木混合", "变成砧木的性状", "消失"], answer: 0,
                  tip: "接穗性状保持，砧木只供营养——\"接穗说了算\"（b04.1.5 第 1 页）。" },
                { type: "choice", stem: "下列属于完全变态发育的是？",
                  options: ["蝗虫", "家蚕", "青蛙", "鸡"], answer: 1,
                  tip: "家蚕：卵→幼虫→蛹→成虫（有蛹=完全变态）；蝗虫无蛹期是不完全变态（b04.1.5 第 2 页）。" },
                { type: "choice", stem: "青春期出现月经/遗精，正确的态度是？",
                  options: ["羞于启齿", "正常的生理现象，科学看待", "这是疾病", "不必理会身体变化"], answer: 1,
                  tip: "月经/遗精都是正常的生理现象，科学看待，不贴标签（b04.1.4 第 1 页）。" }
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
 * b04 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b03/b06/b13/b14/b21 先例）。命名空间 window.BIO_B04。
 * 化石证据时间轴 / 生殖系统结构图点选 / 受精到分娩分步动画 /
 * 变态发育对比动画。闯关记录：会话内有效，不写 localStorage。
 * ============================================================ */
window.BIO_B04 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  function markBtn(btn) {
    if (!btn) return;
    var sibs = btn.parentNode.querySelectorAll("button");
    for (var i = 0; i < sibs.length; i++) sibs[i].style.outline = "";
    btn.style.outline = "3px solid var(--bio-highlight)";
    btn.style.outlineOffset = "1px";
  }
  function hlStage(n) {
    var svg = document.getElementById("bioB04StagesSvg");
    if (!svg) return;
    var cs = svg.querySelectorAll("[data-sg]");
    for (var i = 0; i < cs.length; i++) {
      cs[i].style.fill = (i + 1 === n) ? "var(--bio-highlight)" : "var(--bio-panel)";
    }
  }
  /* ---------- 化石证据时间轴（时间均为"约"，示意非等比） ---------- */
  var FOSSIL = {
    ape: "<b>森林古猿</b>：约1000万年前，生活在非洲森林。人类与现代类人猿的共同祖先——故事从这里开始。",
    aus: "<b>南方古猿</b>：约300–400万年前。开始<b>直立行走</b>，解放了双手——人猿分界的重要标志。（\"露西\"约300万年前）",
    hab: "<b>能人</b>：约200万年前。会<b>制造</b>简单的石器——\"能人\"之名由此而来。",
    ere: "<b>直立人</b>：约170万年前。会使用火，脑量明显增大。",
    sap: "<b>智人</b>：约20–30万年前。<b>大脑发达</b>——现代人类的祖先。"
  };
  /* ---------- 生殖系统结构图点选（结构→功能对问） ---------- */
  var STRUCT = {
    testis: "<b>睾丸</b>：男性主要性器官。<b>产生精子</b>，分泌雄性激素——\"产精子\"是它的用。",
    ovary: "<b>卵巢</b>：女性主要性器官。<b>产生卵细胞</b>，分泌雌性激素——\"产卵细胞\"是它的用。",
    tube: "<b>输卵管</b>：细长管道，适合<b>输送卵细胞</b>；管腔是<b>受精的场所</b>。",
    uterus: "<b>子宫</b>：壁厚、肌肉发达，适合<b>胚胎着床和发育</b>。"
  };
  /* ---------- 受精到分娩分步动画（示意） ---------- */
  var STAGES = {
    1: "① <b>受精（输卵管）</b>：精子与卵细胞结合 → 受精卵。新生命的起点。",
    2: "② <b>胚泡植入（子宫）</b>：受精卵不断分裂形成胚泡，植入子宫内膜——怀孕开始。",
    3: "③ <b>胚胎</b>：各器官系统开始形成。",
    4: "④ <b>胎儿（约8周后）</b>：已具人形；胎盘绒毛内毛细血管与母体血液间双向交换物质。",
    5: "⑤ <b>分娩（约40周）</b>：成熟的胎儿从母体阴道产出。"
  };
  /* ---------- 变态发育对比动画（示意） ---------- */
  var METAM = {
    silk: "<b>家蚕（完全变态）</b>：卵 → 幼虫 → <b>蛹</b> → 成虫。有\"蛹\"期——完全变态的判据。",
    locust: "<b>蝗虫（不完全变态）</b>：卵 → 若虫 → 成虫。无蛹期，若虫长得像小一号的成虫。",
    frog: "<b>青蛙（变态发育）</b>：受精卵 → 蝌蚪 → 幼蛙 → 成蛙。体外受精；蝌蚪用鳃呼吸，青蛙用肺。",
    swallow: "<b>家燕（晚成雏）</b>：卵 → 雏鸟（眼未睁、不能独立生活，需亲鸟喂养）→ 成鸟。"
  };
  return {
    fossil: function (k, btn) { markBtn(btn); say("bioB04Fossil", FOSSIL[k] || ""); },
    struct: function (k, btn) { markBtn(btn); say("bioB04Struct", STRUCT[k] || ""); },
    stages: function (n, btn) { markBtn(btn); hlStage(n); say("bioB04Stages", STAGES[n] || ""); },
    metam: function (k, btn) { markBtn(btn); say("bioB04Metam", METAM[k] || ""); }
  };
})();
