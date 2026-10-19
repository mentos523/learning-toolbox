/* ============================================================
 * 学习工具箱 · 生物 · 第二十五章数据（生物 P19 生产队 2026-10-19）
 *
 * 课：b25.1.1 发酵工程（3 页）
 *     b25.1.2 细胞工程（3 页）
 *     b25.1.3 基因工程（3 页）
 *     b25.1.4 胚胎工程与生态工程（3 页）
 *     b25.1.5 生物技术伦理与本章小结（2 页）。共 14 页。
 * 交互（全部内联实现，零新引擎组件；本批无 B1 引擎交互）：
 *   b25.1.1-p3 发酵条件诊所（果酒/果醋/泡菜 × 温度/氧气/时间三要素）
 *   b25.1.2-p3 组织培养流程动画（5 步按序点亮）
 *   b25.1.3-p3 基因工程四步动画（4 步按序点亮）
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 表述克制三处（黄队/专家硬性要求；BIO-R36/R39）：
 * ① b25.1.2-p2 克隆：只讲核移植技术事实（步骤+"多莉"实例），不展开伦理讨论；
 * ② b25.1.3-p2 转基因：只讲科学事实与现行安全管理规范（安全评价/环境释放评估/标识）；
 * ③ b25.1.4-p2 人类胚胎研究边界：只讲现行规范（"14 天规则"点到为止，生殖性克隆人多国法律禁止）；
 * ④ b25.1.5-p1 基因编辑与伦理：只讲技术事实与国际现行伦理共识，不渲染、不做价值审判。
 *
 * 门禁⑧（新术语首现即定义，本章首现）：
 * 发酵工程/无菌操作（b25.1.1-p1）/醋酸菌/毛霉（b25.1.1-p2）/
 * 脱分化/再分化/愈伤组织（b25.1.2-p1）/
 * 动物细胞培养/传代培养/接触抑制/核移植/克隆（b25.1.2-p2）/
 * 限制酶/DNA 连接酶/质粒/目的基因/标记基因（b25.1.3-p1）/
 * 启动子/终止子/基因表达载体（b25.1.3-p2 ②行内定义；"载体"此前仅 b16 染色体语境出现，基因工程运载体义本章首次）/
 * 试管动物/胚胎移植（b25.1.4-p1；"试管"此前仅实验器皿义出现）/胚胎分割（b25.1.4-p2）/
 * 生态工程（b25.1.4-p3）/基因编辑/CRISPR/Cas9/14 天规则（b25.1.5-p1）。
 * 非本章首现（此前已出现，不重复列为首现）：酵母菌/乳酸菌（b15）、
 * 植物组织培养（b16.1.3）、体外受精（b04/b09）。
 *
 * 门禁⑨（深链只挂已上线课号；href 由 renderMathlink 按 XLINK 表生成）：
 * b16.1.3（XLINK_BIO 在表→#b16.1.3）/
 * b10.1.3（本地 XLINK_BIO 未在表→mathlink 纯文本先行，不造死链；b10.1.3 已上线，
 * staging 组装前协调者确认远端 XLINK_BIO 是否已含 b10.1.3，如未入则补 token）/
 * 无数学课号引用（本章图纸数学呼应全空；门禁⑫无触发）。
 *
 * 门禁⑩（预告台账草案框架；status=drafted/foretell；review_history 由专家队复签时写，
 * 生产队不写任何评审结论）：
 * - b25.1.2-e1：echo b16.1.3-a2（fulfilled）——回填句 b25.1.2-p1 mathlink，
 *   深链→b16.1.3（方向：兑现页→预告页）。
 *   预告原文（逐字）：「全能性回填点：受精卵全能性最高；植物组织培养见 b25.1.2（纯文本）。」
 *   兑现 evidence（实物逐字，b25.1.2-p1 mathlink）：
 *   「兑现：b16.1.3-a2 问过——“植物组织培养见 b25.1.2”——答案：组织培养的理论基础正是细胞全能性：
 *   受精卵全能性最高，分化程度越高、全能性一般越低。」
 * - b25.1.1：ledger-b10.1.3 无 foretell 指向 b25（b10.1.3-f1 为 frozen_copy，与 b25 无关）→
 *   只写"认旧友"回填句＋mathlink 深链，不造台账项（任务书§〇）。
 * - b25.1.5-a1（drafted）：基因编辑与伦理新发展预告——后续维护承接
 *   （生物技术发展快，新规范出现时回填本页）；本批 oldfriend 纯文本，无深链。
 *
 * 门禁⑪：本批 quiz 页仅 b25.1.5-p2（1 页）；为课程图纸"本章总复习"既定设计意图，
 * 台账留痕，非缺页。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b25"] = {
  id: "b25",
  units: [
    {
      id: "b25.1",
      title: "生物技术与工程",
      lessons: [
        {
          id: "b25.1.1",
          title: "发酵工程",
          prereq: "b24 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：回填一页（b10.1.3 酸奶→发酵工程） ============ */
            {
              id: "b25.1.1-p1",
              kind: "explain",
              title: "回填：从酸奶到发酵工程",
              blocks: [
                { type: "mathlink", text: "认旧友：b10.1.3——酸奶是乳酸菌把奶里的糖变成乳酸（乳酸菌→乳酸）；这门手艺放大到工厂、加上工程技术，就是发酵工程。" },
                { type: "lead", text: "一杯酸奶、一坛泡菜、一瓶果酒——背后是同一门手艺。" },
                { type: "text", html: "发酵工程=利用微生物的特定功能，通过现代工程技术，规模化生产对人类有用的产品。传统发酵是它的老祖宗，现代发酵工程把它搬进了发酵罐。" },
                { type: "text", html: "中心环节只有一条：防止杂菌污染，保证发酵正常进行——无菌操作是底线，贯穿全程。" }
              ],
              point: "发酵工程=微生物+工程技术规模化生产；无菌操作是底线。"
            },
            /* ============ p2：四种传统发酵 ============ */
            {
              id: "b25.1.1-p2",
              kind: "explain",
              title: "四种传统发酵",
              blocks: [
                { type: "lead", text: "四坛子，四种菌，各管一摊——认一认。" },
                { type: "text", html: "果酒：酵母菌在缺氧条件下把葡萄汁里的糖变成酒精——温度 18–25℃、密闭，约 10 天。" },
                { type: "text", html: "果醋：醋酸菌在有氧条件下把糖或酒精变成醋酸——要通气、30–35℃，比果酒快。" },
                { type: "text", html: "腐乳：毛霉先在豆腐上长出白毛，分泌蛋白酶、脂肪酶分解蛋白质，再加盐卤制——味道变鲜，质地变软。" },
                { type: "text", html: "泡菜：乳酸菌在缺氧条件下把菜里的糖变成乳酸——水封坛隔绝空气，常温下几天可食。" },
                { type: "trap", text: "⚠️ 别搞混：果醋不是“果酒放久了自然变酸”！变酸的是醋酸菌发酵——它需要氧气，条件不对，酸也变不出好醋。" }
              ],
              point: "四发酵：果酒酵母菌、果醋醋酸菌、腐乳毛霉、泡菜乳酸菌。"
            },
            /* ============ p3：发酵条件诊所（交互） ============ */
            {
              id: "b25.1.1-p3",
              kind: "interact",
              title: "诊所：发酵条件调控",
              exploreTip: "当一回发酵工程师：先点一种产品，再为温度/氧气/时间三要素各选一项，点“开始发酵”看成败。",
              blocks: [
                { type: "text", html: "发酵三要素：温度、氧气、时间——三种产品，三种配方，配错就失败。" },
                { type: "text", html: "<div style=\"text-align:center;margin:2px 0\">" +
                  "<div style=\"margin:4px 0\">产品：<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('prod','wine',this)\">果酒</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('prod','vinegar',this)\">果醋</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('prod','pickle',this)\">泡菜</button></div>" +
                  "<div style=\"margin:4px 0\">温度：<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('temp','t1',this)\">常温偏高（30–35℃）</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('temp','t2',this)\">常温偏低（18–25℃）</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('temp','t3',this)\">常温</button></div>" +
                  "<div style=\"margin:4px 0\">氧气：<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('o2','o1',this)\">密闭缺氧</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('o2','o2',this)\">通气有氧</button></div>" +
                  "<div style=\"margin:4px 0\">时间：<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('time','d1',this)\">短（几天）</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('time','d2',this)\">中（约 7 天）</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.ferPick('time','d3',this)\">长（约 10 天）</button></div>" +
                  "</div>" +
                  "<div style=\"text-align:center\"><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B25.ferGo()\">开始发酵</button></div>" +
                  "<div id=\"bioB25FerMsg\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">先点一种产品</div>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">天数为相对口径（非实测数据）；示意，非真实速度/比例</div>" },
                { type: "text", html: "诊所规则：三要素全对才算发酵成功——错一项就打回，想想这种菌要什么条件。" }
              ],
              point: "诊所结论：温度、氧气、时间三要素，缺一不可。"
            }
          ]
        },
        {
          id: "b25.1.2",
          title: "细胞工程",
          prereq: "发酵工程",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：回填一页（b16.1.3-a2 兑现：全能性→组织培养） ============ */
            {
              id: "b25.1.2-p1",
              kind: "explain",
              title: "兑现：全能性→组织培养",
              blocks: [
                { type: "mathlink", text: "兑现：b16.1.3-a2 问过——“植物组织培养见 b25.1.2”——答案：组织培养的理论基础正是细胞全能性：受精卵全能性最高，分化程度越高、全能性一般越低。" },
                { type: "lead", text: "一片叶子，能不能长出一整棵树？" },
                { type: "text", html: "植物组织培养=把离体的植物组织、器官或细胞，放在无菌的人工培养基上，培养成完整植株。" },
                { type: "text", html: "两步关键：脱分化——已分化的细胞变回没有特定结构功能的愈伤组织；再分化——愈伤组织重新长出根和芽。" },
                { type: "note", text: "无菌是前提：培养基营养丰富，杂菌一来就抢——全程无菌操作，一步都不能省。" }
              ],
              point: "组织培养=离体+无菌+培养基→完整植株；理论基础是细胞全能性。"
            },
            /* ============ p2：动物细胞培养与克隆 ============ */
            {
              id: "b25.1.2-p2",
              kind: "explain",
              title: "动物细胞培养与克隆",
              blocks: [
                { type: "lead", text: "植物细胞能“返老还童”，动物细胞呢？" },
                { type: "text", html: "动物细胞培养=把动物组织分散成单个细胞进行培养。条件：无菌无毒、营养充足、温度 pH 适宜、气体环境（95% 空气+5% CO₂）。" },
                { type: "text", html: "细胞贴壁生长，长满就停（接触抑制）——分瓶续养叫传代培养。" },
                { type: "text", html: "克隆（只讲技术事实）：核移植——把体细胞核移入去核卵母细胞，建成重组细胞，激活后发育成胚胎，再移植到代孕母体。1997 年克隆羊“多莉”就是这么来的。" },
                { type: "trap", text: "⚠️ 别搞混：组织培养“变异很大”？错！它是无性繁殖——后代和亲本几乎一样，保持优良性状正是它的优点。" },
                { type: "note", text: "口径：克隆只讲技术事实（BIO-R36）；伦理讨论见 b25.1.5。" }
              ],
              point: "动物细胞培养=单个细胞体外增殖；克隆=核移植技术事实。"
            },
            /* ============ p3：组织培养流程动画（交互） ============ */
            {
              id: "b25.1.2-p3",
              kind: "interact",
              title: "动画：组织培养流程",
              exploreTip: "按正确顺序点亮 5 个步骤，点错打回重来。",
              blocks: [
                { type: "text", html: "<svg viewBox=\"0 0 360 130\" width=\"100%\" role=\"img\" aria-label=\"植物组织培养流程示意\" style=\"max-width:440px;display:block;margin:6px auto\">" +
                  "<defs><marker id=\"bioB25TAh\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 Z\" style=\"fill:var(--bio-aux)\"/></marker></defs>" +
                  "<g font-size=\"13\" text-anchor=\"middle\">" +
                  "<g id=\"bioB25TisG-n0\" opacity=\"0.35\"><circle cx=\"36\" cy=\"46\" r=\"26\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2.5\"/><text x=\"36\" y=\"42\" style=\"fill:var(--bio-product)\">离体</text><text x=\"36\" y=\"58\" style=\"fill:var(--bio-product)\">组织</text></g>" +
                  "<g id=\"bioB25TisG-n1\" opacity=\"0.35\"><circle cx=\"108\" cy=\"46\" r=\"26\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2.5\"/><text x=\"108\" y=\"42\" style=\"fill:var(--bio-substrate)\">脱分化</text></g>" +
                  "<g id=\"bioB25TisG-n2\" opacity=\"0.35\"><circle cx=\"180\" cy=\"46\" r=\"26\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2.5\"/><text x=\"180\" y=\"42\" style=\"fill:var(--bio-substrate)\">愈伤</text><text x=\"180\" y=\"58\" style=\"fill:var(--bio-substrate)\">组织</text></g>" +
                  "<g id=\"bioB25TisG-n3\" opacity=\"0.35\"><circle cx=\"252\" cy=\"46\" r=\"26\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2.5\"/><text x=\"252\" y=\"42\" style=\"fill:var(--bio-gene)\">再分化</text></g>" +
                  "<g id=\"bioB25TisG-n4\" opacity=\"0.35\"><circle cx=\"324\" cy=\"46\" r=\"26\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2.5\"/><text x=\"324\" y=\"42\" style=\"fill:var(--bio-product)\">试管苗</text></g>" +
                  "<line x1=\"62\" y1=\"46\" x2=\"82\" y2=\"46\" style=\"stroke:var(--bio-aux)\" stroke-width=\"2\" marker-end=\"url(#bioB25TAh)\"/>" +
                  "<line x1=\"134\" y1=\"46\" x2=\"154\" y2=\"46\" style=\"stroke:var(--bio-aux)\" stroke-width=\"2\" marker-end=\"url(#bioB25TAh)\"/>" +
                  "<line x1=\"206\" y1=\"46\" x2=\"226\" y2=\"46\" style=\"stroke:var(--bio-aux)\" stroke-width=\"2\" marker-end=\"url(#bioB25TAh)\"/>" +
                  "<line x1=\"278\" y1=\"46\" x2=\"298\" y2=\"46\" style=\"stroke:var(--bio-aux)\" stroke-width=\"2\" marker-end=\"url(#bioB25TAh)\"/>" +
                  "<text x=\"36\" y=\"92\" style=\"fill:var(--bio-ink-soft)\">取外植体</text>" +
                  "<text x=\"108\" y=\"92\" style=\"fill:var(--bio-ink-soft)\">变回未分化</text>" +
                  "<text x=\"180\" y=\"92\" style=\"fill:var(--bio-ink-soft)\">细胞团</text>" +
                  "<text x=\"252\" y=\"92\" style=\"fill:var(--bio-ink-soft)\">长出根和芽</text>" +
                  "<text x=\"324\" y=\"92\" style=\"fill:var(--bio-ink-soft)\">移栽大田</text>" +
                  "</g></svg>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">模式图：非等比、非实物；示意流程，非真实速度/比例</div>" +
                  "<div style=\"text-align:center;margin:4px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.flowPlay('tissue',0,this)\">离体组织</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.flowPlay('tissue',1,this)\">脱分化</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.flowPlay('tissue',2,this)\">愈伤组织</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.flowPlay('tissue',3,this)\">再分化</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.flowPlay('tissue',4,this)\">试管苗</button>" +
                  "</div>" +
                  "<div id=\"bioB25TisMsg\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">从第一步开始，依次点亮</div>" },
                { type: "text", html: "动画规则：顺序点对，节点亮起；点错一步，全部打回重来。" }
              ],
              point: "流程结论：离体组织→脱分化→愈伤组织→再分化→试管苗。"
            }
          ]
        },
        {
          id: "b25.1.3",
          title: "基因工程",
          prereq: "细胞工程",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：基因工程的工具 ============ */
            {
              id: "b25.1.3-p1",
              kind: "explain",
              title: "基因工程的工具",
              blocks: [
                { type: "lead", text: "把一个基因从一种生物搬到另一种生物，需要三样工具。" },
                { type: "text", html: "限制酶=分子手术刀：识别双链 DNA 上的特定核苷酸序列，切割磷酸二酯键。" },
                { type: "text", html: "DNA 连接酶=分子缝合针：把两个 DNA 片段之间的磷酸二酯键连起来。" },
                { type: "text", html: "载体=运货车：携带目的基因进入受体细胞的 DNA 分子，常用的是质粒。好载体三条件：能自我复制、有标记基因、有多个限制酶切割位点。" },
                { type: "note", text: "目的基因=人们所需要的特定基因；标记基因用来鉴别受体细胞里有没有目的基因。" }
              ],
              point: "三工具：限制酶切、连接酶连、载体运。"
            },
            /* ============ p2：操作四步与抗虫棉 ============ */
            {
              id: "b25.1.3-p2",
              kind: "explain",
              title: "操作四步与抗虫棉",
              blocks: [
                { type: "lead", text: "四步，把外来基因安进棉花。" },
                { type: "text", html: "操作四步：①获取目的基因 ②构建基因表达载体=组装好的运载 DNA（目的基因+启动子+终止子+标记基因；启动子/终止子=启动/终止转录的 DNA 片段）③把目的基因导入受体细胞 ④目的基因的检测与鉴定。" },
                { type: "text", html: "抗虫棉实例：苏云金杆菌的 Bt 抗虫基因转入棉花——棉铃虫吃了棉叶就活不了，农药少打，棉农受益。" },
                { type: "trap", text: "⚠️ 别搞混：转基因生物的基因会“到处乱跑”？错！从实验室到田间是严格监管下的定向操作——我国实行安全评价、环境释放评估、标识等管理制度（只陈述现行规范）。" },
                { type: "note", text: "口径：本页只讲科学事实与现行安全管理规范，不做价值审判（BIO-R36）。" }
              ],
              point: "四步：获取—构建—导入—检测；抗虫棉是实例。"
            },
            /* ============ p3：基因工程四步动画（交互） ============ */
            {
              id: "b25.1.3-p3",
              kind: "interact",
              title: "动画：基因工程四步",
              exploreTip: "按正确顺序点亮 4 个步骤，点错打回重来。",
              blocks: [
                { type: "text", html: "<svg viewBox=\"0 0 360 130\" width=\"100%\" role=\"img\" aria-label=\"基因工程操作四步示意\" style=\"max-width:440px;display:block;margin:6px auto\">" +
                  "<defs><marker id=\"bioB25GAh\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 Z\" style=\"fill:var(--bio-aux)\"/></marker></defs>" +
                  "<g font-size=\"13\" text-anchor=\"middle\">" +
                  "<g id=\"bioB25GenG-n0\" opacity=\"0.35\"><circle cx=\"45\" cy=\"46\" r=\"30\" style=\"fill:none;stroke:var(--bio-product)\" stroke-width=\"2.5\"/><text x=\"45\" y=\"42\" style=\"fill:var(--bio-product)\">获取</text><text x=\"45\" y=\"58\" style=\"fill:var(--bio-product)\">目的基因</text></g>" +
                  "<g id=\"bioB25GenG-n1\" opacity=\"0.35\"><circle cx=\"135\" cy=\"46\" r=\"30\" style=\"fill:none;stroke:var(--bio-substrate)\" stroke-width=\"2.5\"/><text x=\"135\" y=\"42\" style=\"fill:var(--bio-substrate)\">构建</text><text x=\"135\" y=\"58\" style=\"fill:var(--bio-substrate)\">表达载体</text></g>" +
                  "<g id=\"bioB25GenG-n2\" opacity=\"0.35\"><circle cx=\"225\" cy=\"46\" r=\"30\" style=\"fill:none;stroke:var(--bio-gene)\" stroke-width=\"2.5\"/><text x=\"225\" y=\"42\" style=\"fill:var(--bio-gene)\">导入</text><text x=\"225\" y=\"58\" style=\"fill:var(--bio-gene)\">受体细胞</text></g>" +
                  "<g id=\"bioB25GenG-n3\" opacity=\"0.35\"><circle cx=\"315\" cy=\"46\" r=\"30\" style=\"fill:none;stroke:var(--bio-aux)\" stroke-width=\"2.5\"/><text x=\"315\" y=\"42\" style=\"fill:var(--bio-aux)\">检测</text><text x=\"315\" y=\"58\" style=\"fill:var(--bio-aux)\">与鉴定</text></g>" +
                  "<line x1=\"75\" y1=\"46\" x2=\"105\" y2=\"46\" style=\"stroke:var(--bio-aux)\" stroke-width=\"2\" marker-end=\"url(#bioB25GAh)\"/>" +
                  "<line x1=\"165\" y1=\"46\" x2=\"195\" y2=\"46\" style=\"stroke:var(--bio-aux)\" stroke-width=\"2\" marker-end=\"url(#bioB25GAh)\"/>" +
                  "<line x1=\"255\" y1=\"46\" x2=\"285\" y2=\"46\" style=\"stroke:var(--bio-aux)\" stroke-width=\"2\" marker-end=\"url(#bioB25GAh)\"/>" +
                  "<text x=\"45\" y=\"94\" style=\"fill:var(--bio-ink-soft)\">要搬的基因</text>" +
                  "<text x=\"135\" y=\"94\" style=\"fill:var(--bio-ink-soft)\">限制酶+连接酶</text>" +
                  "<text x=\"225\" y=\"94\" style=\"fill:var(--bio-ink-soft)\">载体送进去</text>" +
                  "<text x=\"315\" y=\"94\" style=\"fill:var(--bio-ink-soft)\">在不在/起不起作用</text>" +
                  "</g></svg>" +
                  "<div style=\"text-align:center;font-size:12px;color:var(--bio-ink-soft)\">模式图：非等比、非实物；示意流程，非真实速度/比例</div>" +
                  "<div style=\"text-align:center;margin:4px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.flowPlay('gene',0,this)\">获取目的基因</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.flowPlay('gene',1,this)\">构建表达载体</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.flowPlay('gene',2,this)\">导入受体细胞</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:2px 4px\" onclick=\"BIO_B25.flowPlay('gene',3,this)\">检测与鉴定</button>" +
                  "</div>" +
                  "<div id=\"bioB25GenMsg\" style=\"text-align:center;font-size:0.9rem;min-height:2.2em\">从第一步开始，依次点亮</div>" },
                { type: "text", html: "动画规则：顺序点对，节点亮起；点错一步，全部打回重来。" }
              ],
              point: "流程结论：获取→构建→导入→检测。"
            }
          ]
        },
        {
          id: "b25.1.4",
          title: "胚胎工程与生态工程",
          prereq: "基因工程",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：试管动物 ============ */
            {
              id: "b25.1.4-p1",
              kind: "explain",
              title: "试管动物",
              blocks: [
                { type: "lead", text: "“试管”里能造出动物吗？" },
                { type: "text", html: "试管动物=体外受精→早期胚胎体外培养→胚胎移植→母体发育分娩。依然是有性生殖——精子和卵子只是在体外相遇。" },
                { type: "text", html: "胚胎移植是关键一步：把早期胚胎送进发情状态一致的母体子宫，让它继续发育。" },
                { type: "note", text: "试管动物≠克隆动物：前者精卵结合（有性生殖），后者核移植（无性生殖）——别搞混。" }
              ],
              point: "试管动物=体外受精+胚胎移植；本质仍是有性生殖。"
            },
            /* ============ p2：胚胎分割与核移植（点到为止）+ 人类胚胎研究边界 ============ */
            {
              id: "b25.1.4-p2",
              kind: "explain",
              title: "胚胎分割与研究边界",
              blocks: [
                { type: "lead", text: "一个胚胎，能不能变成两个？" },
                { type: "text", html: "胚胎分割：用机械方法把早期胚胎切成 2 等份或 4 等份，再分别移植——得到同卵双胎或多胎（点到为止）。" },
                { type: "text", html: "核移植在 b25.1.2 已讲：体细胞核+去核卵母细胞→重组细胞→胚胎（点到为止，不重复展开）。" },
                { type: "note", text: "人类胚胎研究边界（只讲现行规范）：人类胚胎体外研究有明确时限规范（“14 天规则”，见 b25.1.5）；生殖性克隆人在多国被法律禁止——本页只陈述规范，不展开技术细节（BIO-R39）。" }
              ],
              point: "胚胎分割=切分早期胚胎得同卵多胎；人类胚胎研究只讲现行规范。"
            },
            /* ============ p3：生态工程 ============ */
            {
              id: "b25.1.4-p3",
              kind: "explain",
              title: "生态工程",
              blocks: [
                { type: "lead", text: "生态工程，可不是“多种几棵树”。" },
                { type: "text", html: "生态工程=应用生态学和系统学原理，对受损的生态系统进行修复重建的系统设计。" },
                { type: "text", html: "四条基本原理：物质循环再生（废物变资源）、物种多样性（种类多、结构才稳定）、协调与平衡（别超过环境承载力）、整体性（自然、经济、社会一起看）。" },
                { type: "trap", text: "⚠️ 别搞混：生态工程=“种树绿化”？错！种树只是手段之一——生态工程是原理指导下的系统设计，种什么、种多少、和谁搭配，都要按原理来。" }
              ],
              point: "生态工程=原理指导的系统设计；四原理：循环、多样、协调、整体。"
            }
          ]
        },
        {
          id: "b25.1.5",
          title: "生物技术伦理与本章小结",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：生物技术伦理（表述克制） ============ */
            {
              id: "b25.1.5-p1",
              kind: "explain",
              title: "生物技术伦理",
              blocks: [
                { type: "lead", text: "技术能做到，是不是就应该做？" },
                { type: "text", html: "基因编辑（只讲技术事实）：CRISPR/Cas9——向导 RNA 把 Cas9 蛋白带到 DNA 特定位点切开，可以敲除或替换基因。" },
                { type: "text", html: "现行规范与共识（只呈现，不审判）：可遗传的人类生殖系基因编辑，多国法律严格限制或禁止；人类胚胎体外研究通行“14 天规则”（点到为止）。" },
                { type: "trap", text: "⚠️ 别搞混：技术能做=“应该做”？错！伦理边界是独立维度——“能不能”归科学回答，“该不该”归规范与共识回答。本课只呈现规范共识，不做价值审判。" },
                { type: "note", text: "口径：BIO-R36/R39——只讲科学事实与现行规范，不渲染、不做价值审判。" },
                { type: "oldfriend", text: "预告：基因编辑与相关伦理规范还在发展中——新规范出现时，回填本页（后续维护承接）。" }
              ],
              point: "伦理=独立维度；本课只呈现规范共识。"
            },
            /* ============ p2：本章小结与习题（quiz） ============ */
            {
              id: "b25.1.5-p2",
              kind: "quiz",
              title: "本章小结与习题",
              questions: [
                { type: "review", html: "本章小结——b25.1.1：发酵工程=微生物+工程技术规模化生产；无菌操作是底线；四传统发酵：果酒（酵母菌、缺氧、18–25℃）、果醋（醋酸菌、有氧、30–35℃）、腐乳（毛霉）、泡菜（乳酸菌、缺氧）；三要素：温度/氧气/时间。b25.1.2：植物组织培养=离体+无菌+培养基→完整植株（脱分化→愈伤组织→再分化；理论基础：细胞全能性）；动物细胞培养=单个细胞体外增殖（贴壁生长、接触抑制、传代培养）；克隆=核移植技术事实（多莉，1997）。b25.1.3：三工具（限制酶/DNA 连接酶/载体）；四步（获取—构建—导入—检测）；抗虫棉实例；转基因=严格监管下的定向操作。b25.1.4：试管动物=体外受精+胚胎移植（有性生殖）；胚胎分割得同卵多胎；人类胚胎研究只讲现行规范；生态工程=原理指导的系统设计（循环/多样/协调/整体）。b25.1.5：基因编辑=CRISPR/Cas9 技术事实；14 天规则点到为止；伦理是独立维度，只呈现规范共识。" },
                { type: "choice", stem: "果醋发酵需要的条件是？",
                  options: ["缺氧、18–25℃", "有氧、30–35℃", "缺氧、30–35℃", "有氧、18–25℃"], answer: 1,
                  tip: "醋酸菌发酵需要氧气，温度 30–35℃（b25.1.1 第 2 页）。" },
                { type: "judge", stem: "植物组织培养的后代与亲本性状差异很大。",
                  answer: false, tip: "组织培养是无性繁殖，保持优良性状正是它的优点（b25.1.2 第 2 页）。" },
                { type: "choice", stem: "基因工程正确的操作顺序是？",
                  options: ["获取—导入—构建—检测", "获取—构建—导入—检测", "构建—获取—检测—导入", "导入—构建—获取—检测"], answer: 1,
                  tip: "四步：获取目的基因→构建基因表达载体→导入受体细胞→检测与鉴定（b25.1.3 第 2 页）。" },
                { type: "judge", stem: "转基因生物从实验室到田间不需要任何监管，基因会到处乱跑。",
                  answer: false, tip: "严格监管下的定向操作：安全评价、环境释放评估、标识等管理制度（b25.1.3 第 2 页）。" }
              ],
              point: "全章完：发酵—细胞—基因—胚胎/生态—伦理，一条线。"
            }
          ]
        }
      ]
    }
  ]
};

/* ============ b25 内联交互命名空间（零新引擎组件；P18 引擎内容本批不引用） ============ */
window.BIO_B25 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  function markBtn(btn) {
    if (!btn) return;
    var sibs = btn.parentNode.querySelectorAll("button");
    for (var i = 0; i < sibs.length; i++) sibs[i].style.outline = "";
    btn.style.outline = "3px solid var(--bio-highlight)";
    btn.style.outlineOffset = "1px";
  }
  /* ---------- b25.1.1-p3：发酵条件诊所 ---------- */
  var PROD = {
    wine:    { name: "果酒", bug: "酵母菌", temp: "t2", o2: "o1", time: "d3",
               why: "酵母菌缺氧发酵产酒精：18–25℃、密闭、约 10 天。" },
    vinegar: { name: "果醋", bug: "醋酸菌", temp: "t1", o2: "o2", time: "d2",
               why: "醋酸菌有氧发酵产醋酸：30–35℃、通气、约 7 天。" },
    pickle:  { name: "泡菜", bug: "乳酸菌", temp: "t3", o2: "o1", time: "d1",
               why: "乳酸菌缺氧发酵产乳酸：常温、水封坛、几天可食。" }
  };
  var fer = { prod: null, temp: null, o2: null, time: null, done: {} };
  function ferPick(kind, key, btn) {
    markBtn(btn);
    if (kind === "prod") {
      fer.prod = key; fer.temp = null; fer.o2 = null; fer.time = null;
      say("bioB25FerMsg", "产品：「" + PROD[key].name + "」（" + PROD[key].bug + "）——再为三要素各选一项");
    } else {
      fer[kind] = key;
    }
  }
  function ferGo() {
    if (!fer.prod) { say("bioB25FerMsg", "先点一种产品"); return; }
    if (!fer.temp || !fer.o2 || !fer.time) { say("bioB25FerMsg", "三要素还没选全——温度、氧气、时间各选一项"); return; }
    var p = PROD[fer.prod];
    var wrong = [];
    if (fer.temp !== p.temp) wrong.push("温度");
    if (fer.o2 !== p.o2) wrong.push("氧气");
    if (fer.time !== p.time) wrong.push("时间");
    if (wrong.length === 0) {
      fer.done[fer.prod] = true;
      var n = Object.keys(fer.done).length;
      say("bioB25FerMsg", "✓ 发酵成功！" + p.why + "（" + n + "/3）" +
        (n === 3 ? "——三种产品全部调通！" : ""));
      fer.prod = null; fer.temp = null; fer.o2 = null; fer.time = null;
    } else {
      say("bioB25FerMsg", "✗ 发酵失败：" + wrong.join("、") + "选错了——打回，想想" + p.bug + "要什么条件。");
    }
  }
  /* ---------- 通用流程点亮（组织培养 5 步 / 基因工程 4 步） ---------- */
  var FLOW = {
    tissue: {
      msg: "bioB25TisMsg", g: "bioB25TisG",
      steps: [
        { n: "离体组织", d: "取植物的组织、器官或细胞作外植体" },
        { n: "脱分化", d: "已分化细胞变回愈伤组织" },
        { n: "愈伤组织", d: "无定形的薄壁细胞团" },
        { n: "再分化", d: "长出根和芽" },
        { n: "试管苗", d: "完整植株，移栽大田" }
      ],
      done: "——组织培养流程走通！"
    },
    gene: {
      msg: "bioB25GenMsg", g: "bioB25GenG",
      steps: [
        { n: "获取目的基因", d: "要搬的基因先拿到手" },
        { n: "构建表达载体", d: "目的基因+启动子+终止子+标记基因" },
        { n: "导入受体细胞", d: "载体把基因送进去" },
        { n: "检测与鉴定", d: "查基因在不在、起不起作用" }
      ],
      done: "——基因工程四步走通！"
    }
  };
  var flowIdx = {};
  function flowPlay(tag, i, btn) {
    var cfg = FLOW[tag];
    var idx = flowIdx[tag] || 0;
    markBtn(btn);
    if (i === idx) {
      var node = document.getElementById(cfg.g + "-n" + i);
      if (node) node.setAttribute("opacity", "1");
      flowIdx[tag] = idx + 1;
      say(cfg.msg, "✓ 第 " + (idx + 1) + " 步：" + cfg.steps[idx].n + "——" + cfg.steps[idx].d +
        (idx + 1 === cfg.steps.length ? cfg.done : "（" + (idx + 1) + "/" + cfg.steps.length + "）"));
    } else {
      flowIdx[tag] = 0;
      for (var k = 0; k < cfg.steps.length; k++) {
        var nd = document.getElementById(cfg.g + "-n" + k);
        if (nd) nd.setAttribute("opacity", "0.35");
      }
      say(cfg.msg, "✗ 顺序错了，打回——从第一步重新点。");
    }
  }
  return {
    ferPick: ferPick,
    ferGo: ferGo,
    flowPlay: flowPlay
  };
})();
/* 发酵诊所：三要素相对口径（非实测数据）已在页内注明；流程点亮首帧=全部未点亮（审计基线=第一帧） */
