/* ============================================================
 * 学习工具箱 · 生物 · 第十八章数据（生物生产队 2026-10-17 试点 b18.1.3；2026-10-18 P3 增补 b18.1.1/1.2/1.4/1.5）
 *
 * ============ 生物数据 Schema（冻结版 v1.0，批量生产复用） ============
 *
 * 1. 注册：window.BIO_CH["bNN"] = { id, units[] }。
 *    章标题/目标不在此文件，见 data/chapters.js（window.BIO_META，
 *    26 章元信息冻结自 biology-curriculum.md v1.0，生产队不得改章名）。
 *
 * 2. 层级：章 → units[]（单元）→ lessons[]（课）→ pages[]（页）。
 *    id 命名铁律：
 *      章 "b18"；单元 "b18.1"（章号.单元序号）；
 *      课 "b18.1.3"（章号.单元序号.课序号）；
 *      页 "b18.1.3-p1"（课号-p页序号），全局唯一。
 *    深链：index.html#b18.1.3/2（课号/页码）。
 *
 * 3. 页对象：
 *    { id, kind, title, point, exploreTip?, widgets?|blocks? }
 *    kind 枚举："interact"（交互页，≤150 字）/ "explain"（讲解页，
 *      ≤300 字）/ "quiz"（练习页）。
 *    title：一句话概念，≤20 字。point：底部点拨区 ≤60 字（黄队文案）。
 *    exploreTip：交互页顶部操作提示（一句话动词开头）。
 *    interact 页可带 blocks[]（组件之后的讲解块，如回填）。
 *
 * 4. explain 页 blocks[]（顺序即渲染顺序），type 枚举：
 *    "lead"      {text}               先现象后规则的引子
 *    "text"      {html}               正文
 *    "slogan"    {text}               口诀 ≤20 字（逐字冻结的不许改）
 *    "trap"      {text}               误区警示："⚠️ 别搞混……"
 *    "note"      {text}               小字备注（适用边界/声明，常驻）
 *    "oldfriend" {text}               认旧友/预告（纯文本；未生产课号
 *                                     不许转深链，见门禁⑨，走预告台账）
 *    "mathlink"  {text}               数学呼应（目标存在性校验见门禁⑨）
 *    "widget"    {widget:{type,params}} 讲解页内嵌交互组件
 *
 * 5. interact 页 widgets[]，type 枚举（本文件试点实现 1 种）：
 *    "pedigree-quest"  B6 系谱判读闯关（见 docs/biology-interactions.md §B6）
 *      params: { qid, pedigree:{members:[{id,sex,affected,generation}],
 *                answer:{dominance,location}},
 *                geneExpect:[{id,text,carrier?}]（仅展示，不机判）,
 *                tips:{dom,loc}（答错提示文案，黄队）,
 *                scopeExtra?（Q3 典型特征推断声明）,
 *                mottoCard, carrierNote, scopeNote（冻结值，见 B-F6） }
 *      渲染器：js/biology-engine.js（Eng.KonvaView + Eng.Input +
 *      Eng.StepPlayer）。冻结答案与图的一致性渲染前按 BIO-R25
 *      程序化校验（见 pilot-b18.1.3-truth.md §六）。
 *
 * 6. 全局铁律（docs/biology-interactions.md §0.3）：
 *    - params 里不出现具体色值，只用 --bio-* 语义名；深色自动跟随。
 *    - 触控目标 ≥44px；双编码（颜色+形状/文字）；读数行走 MathML。
 *    - 讲解页 ≤300 字、交互页 ≤150 字；一步一动词（文案即脚本）；
 *      图示指代类措辞零命中；模式图声明常驻；新术语首现即定义（门禁⑧）。
 *    - 适用边界/近似条件当页显性化（门禁⑤ / BIO-AX01）。
 *
 * 冻结引用（逐字，黄队/蓝队照抄）：
 * - 口诀卡 B-F6：「无中生有是隐性，有中生无是显性」
 * - 适用边界 B-F6：「适用于孟德尔式单基因遗传系谱」
 * - 携带者标注：「携带者表型正常，但能把致病基因传给后代」
 * - 口诀使用提示：「先看代际，再看口诀——口诀只解决"定显隐"第一步，不包办全程」
 * - D-C3：「先手算（自己按步骤判读）、提交后看自动校验对照」
 * - M1 系谱题库：见本文件 Q1–Q3（生物真值口径队审定冻结版，直接用，不许改）
 * - 辨析②回填句：「性状=基因+环境」；「携带致病基因≠注定发病——携带者表型正常，但能传递致病基因」
 * - Q3 边界声明：「单一家系为典型特征推断，确证需多家系统计」
 * ============================================================ */
/* M1 系谱题库审定版（生物真值口径队冻结交付，直接用，不许改；p2/p3/p4 同一引用） */
var BIO_B18_M1 = {
    q1: {
      qid: "b18.1.3-q1",
      mottoCard: true, carrierNote: true,
      scopeNote: "适用于孟德尔式单基因遗传系谱",
      pedigree: {
        members: [
          { id: "I-1", sex: "男", affected: false, generation: 1 },
          { id: "I-2", sex: "女", affected: false, generation: 1 },
          { id: "II-1", sex: "男", affected: true, generation: 2 },
          { id: "II-2", sex: "女", affected: false, generation: 2 },
          { id: "II-3", sex: "女", affected: true, generation: 2 }
        ],
        answer: { dominance: "隐性", location: "常染色体" }
      },
      geneExpect: [
        { id: "I-1", text: "Aa" },
        { id: "I-2", text: "Aa" },
        { id: "II-1", text: "aa" },
        { id: "II-2", text: "AA 或 Aa", carrier: true },
        { id: "II-3", text: "aa" }
      ],
      tips: {
        dom: "再看看第Ⅱ代：双亲都正常，孩子里出现了患者——无中生有了吗？",
        loc: "父亲正常、女儿患病：如果是 X 隐性，女儿的两条 Xᵃ 都从父母来——父亲会正常吗？"
      }
    },
    q2: {
      qid: "b18.1.3-q2",
      mottoCard: true, carrierNote: true,
      scopeNote: "适用于孟德尔式单基因遗传系谱",
      pedigree: {
        members: [
          { id: "I-1", sex: "男", affected: true, generation: 1 },
          { id: "I-2", sex: "女", affected: true, generation: 1 },
          { id: "II-1", sex: "男", affected: false, generation: 2 },
          { id: "II-2", sex: "女", affected: false, generation: 2 },
          { id: "II-3", sex: "男", affected: true, generation: 2 }
        ],
        answer: { dominance: "显性", location: "常染色体" }
      },
      geneExpect: [
        { id: "I-1", text: "Aa" },
        { id: "I-2", text: "Aa" },
        { id: "II-1", text: "aa" },
        { id: "II-2", text: "aa" },
        { id: "II-3", text: "AA 或 Aa" }
      ],
      tips: {
        dom: "再看看第Ⅱ代：双亲都患病，孩子里出现了正常——有中生无了吗？",
        loc: "父亲患病、女儿正常：如果是 X 显性，父亲一定把 Xᴬ 传给女儿——女儿会正常吗？"
      }
    },
    q3: {
      qid: "b18.1.3-q3",
      mottoCard: true, carrierNote: true,
      scopeNote: "适用于孟德尔式单基因遗传系谱",
      scopeExtra: "单一家系为典型特征推断，确证需多家系统计",
      pedigree: {
        members: [
          { id: "I-1", sex: "男", affected: false, generation: 1 },
          { id: "I-2", sex: "女", affected: false, generation: 1 },
          { id: "II-1", sex: "男", affected: true, generation: 2 },
          { id: "II-2", sex: "男", affected: true, generation: 2 },
          { id: "II-3", sex: "女", affected: false, generation: 2 },
          { id: "II-4", sex: "女", affected: false, generation: 2 },
          { id: "II-5", sex: "男", affected: false, generation: 2 }
        ],
        answer: { dominance: "隐性", location: "X染色体" }
      },
      geneExpect: [
        { id: "I-1", text: "XᴬY" },
        { id: "I-2", text: "XᴬXᵃ", carrier: true },
        { id: "II-1", text: "XᵃY" },
        { id: "II-2", text: "XᵃY" },
        { id: "II-3", text: "XᴬXᴬ 或 XᴬXᵃ" },
        { id: "II-4", text: "XᴬXᴬ 或 XᴬXᵃ" },
        { id: "II-5", text: "XᴬY" }
      ],
      tips: {
        dom: "再看看第Ⅱ代：双亲都正常，孩子里出现了患者——无中生有了吗？",
        loc: "数一数患病的男性和女性各有几个：男性明显多于女性——这是哪类遗传的典型特征？"
      }
    }
};

window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b18"] = {
  id: "b18",
  units: [
    {
      id: "b18.1",
      title: "基因与染色体",
      lessons: [
        {
          id: "b18.1.1",
          title: "减数分裂与遗传的染色体学说",
          prereq: "b17 小结",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：萨顿类比（直觉页） ================= */
            {
              id: "b18.1.1-p1",
              kind: "explain",
              title: "萨顿的类比：行为对照表",
              blocks: [
                { type: "note", text: "直觉版——本页只讲萨顿的类比故事；证明见第 2 页。" },
                { type: "lead", text: "1903 年，萨顿盯着显微镜下的染色体，心里一动：它的行为，怎么跟孟德尔的\"遗传因子\"一模一样？" },
                { type: "text", html: "逐项对照——①都成对：基因在体细胞中成对，同源染色体也成对；②配子中都单个：配子中基因单个，染色体也单条（减数分裂后）；③受精恢复成对：基因恢复成对，染色体也恢复成对；④都分离：形成配子时基因分离，同源染色体也分离；⑤都自由组合：非等位基因自由组合，非同源染色体也自由组合。" },
                { type: "text", html: "五项全对上——萨顿想：基因，该不会就住在染色体上吧？" },
                { type: "oldfriend", text: "预告：类比推理有个\"边界\"——第 3 页讲为什么\"像\"不能当\"证明\"。" }
              ],
              point: "萨顿的类比：基因的行为，条条对得上染色体的行为。严格表述见下一页。"
            },
            /* ================= p2：摩尔根证据（严格页） ================= */
            {
              id: "b18.1.1-p2",
              kind: "explain",
              title: "摩尔根的证据：果蝇杂交",
              blocks: [
                { type: "note", text: "严格版——本页是实验证据。" },
                { type: "oldfriend", text: "认旧友：上一页萨顿的类比提了个假说——现在看实验证据。" },
                { type: "lead", text: "类比再像，也只是\"像\"。证明\"基因在染色体上\"的，是摩尔根的果蝇实验。" },
                { type: "text", html: "1910 年，摩尔根发现一只白眼雄果蝇（红眼是常态）。红眼雌 × 白眼雄 → 子一代 1237 只，全红眼：红眼是显性。" },
                { type: "text", html: "子一代互交 → 子二代：红眼雌 2459 只、红眼雄 1011 只、白眼雄 782 只。关键：白眼果蝇，全是雄性！" },
                { type: "text", html: "证据链——白眼性状总跟\"雄性\"绑在一起出现，说明眼色基因在 X 染色体上（X 是决定性别的染色体之一，下一课细讲；Y 上没有它的等位基因）。结论：基因在染色体上——萨顿的假说，被实验证实了。" },
                { type: "text", html: "三问自查——对照：红眼雌 × 白眼雄、白眼雌 × 红眼雄，正反两组互为对照；单一变量：只变眼色基因的亲本来源；重复：数千只果蝇计数，不看一两只下结论。" },
                { type: "note", text: "数据为摩尔根 1910 年原始计数；比例不必细算——关键证据是\"白眼全为雄性\"。" }
              ],
              point: "摩尔根：白眼只出现在雄蝇 → 眼色基因在 X 染色体上。"
            },
            /* ================= p3：类比边界（辨析页） ================= */
            {
              id: "b18.1.1-p3",
              kind: "explain",
              title: "辨析：类比的边界",
              blocks: [
                { type: "lead", text: "类比推理是发现假说的好帮手，但它有个跑不掉的边界。" },
                { type: "text", html: "类比只负责\"提假说\"：萨顿看到基因行为与染色体行为处处对应，提出了\"基因在染色体上\"这个假说。" },
                { type: "text", html: "证明只认实验：摩尔根用果蝇杂交实验证实了它。类比再像，也不能代替实验——这是科学推理的规矩。" },
                { type: "trap", text: "⚠️ 别搞混：\"类比=证明\"是错的！类比只提假说，实验才是证明。" }
              ],
              point: "类比提假说，实验给证明——顺序不能反。"
            }
          ]
        },
        {
          id: "b18.1.2",
          title: "伴性遗传",
          prereq: "染色体学说",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：性染色体（直觉页） ================= */
            {
              id: "b18.1.2-p1",
              kind: "explain",
              title: "性染色体：X 与 Y",
              blocks: [
                { type: "note", text: "直觉版——本页只讲 X/Y 决定性别；严格表述见下一页。" },
                { type: "lead", text: "决定孩子是男孩还是女孩的，是一对特殊的染色体。" },
                { type: "text", html: "人有 23 对染色体：22 对常染色体（男女都一样），加 1 对性染色体——性染色体：决定性别的染色体。女性是 XX，男性是 XY。Y 染色体小得多，上面的基因也少得多。" },
                { type: "text", html: "先认词——伴性遗传：性染色体上的基因所控制的性状，在遗传上总是和性别相关联。" },
                { type: "text", html: "生男生女怎么定：卵细胞只带 X；精子带 X → 女儿（XX），带 Y → 儿子（XY）。X 精子、Y 精子理论上各占一半，所以生男生女理论上各占一半——取决于精子带来的是 X 还是 Y。" },
                { type: "mathlink", text: "认旧友：b16.1.4 讲过，减数分裂时配对的染色体分开——X 与 Y 也是这样分开，分别进入不同的精子。" }
              ],
              point: "XX 是女孩，XY 是男孩；生男生女理论上各占一半，看精子带 X 还是 Y。严格表述见下一页。"
            },
            /* ================= p2：X 隐性遗传与交叉遗传（严格页） ================= */
            {
              id: "b18.1.2-p2",
              kind: "explain",
              title: "X 隐性遗传与交叉遗传",
              blocks: [
                { type: "note", text: "严格版——X 遗传规律。" },
                { type: "oldfriend", text: "认旧友：XX 女孩、XY 男孩——看 X 基因怎么传。" },
                { type: "lead", text: "色盲、血友病：为什么男患者多？" },
                { type: "text", html: "色盲基因在 X 染色体上，是隐性基因（记作 Xᵇ，正常记作 Xᴮ）。女性两条 X 都有 Xᵇ（XᵇXᵇ）才色盲；男性只有一条 X，XᵇY 就色盲——所以男患者多得多。" },
                { type: "text", html: "血友病也是 X 染色体隐性遗传，传递规律与色盲相同。" },
                { type: "text", html: "交叉遗传：男患者的致病基因来自母亲、传给女儿。如：色盲父亲的 Xᵇ必传给女儿；色盲母亲的儿子必色盲。" },
                { type: "text", html: "图解规范——亲代写 P，子代写 F1。例：P：XᴮXᴮ × XᵇY → F1：女儿 XᴮXᵇ（正常，携带者——带致病基因但本人不发病），儿子 XᴮY（正常）。" },
                { type: "text", html: "再看一例：P：XᴮXᵇ × XᴮY → F1：女儿一半正常、一半携带者，儿子一半正常、一半色盲。携带者母亲传给儿子的 Xᵇ，是儿子色盲的来源。" },
                { type: "trap", text: "⚠️ 别搞混：\"色盲传男不传女\"是错的！女性也会色盲（XᵇXᵇ），只是少得多。" },
                { type: "mathlink", text: "去 b18.1.3 实战：第 3 题就是 X 隐性家系，用\"定显隐→定常性→推基因型\"走一遍。" }
              ],
              point: "X 隐性：男患者多；交叉遗传——男患者的致病基因来自母亲、传给女儿。"
            },
            /* ================= p3：连锁与互换（严格页，兑现 b17 三预告） ================= */
            {
              id: "b18.1.2-p3",
              kind: "explain",
              title: "连锁与互换：完整故事",
              blocks: [
                { type: "lead", text: "\"绑在一起\"的基因，偶尔也会\"交换\"——b17 的预告，今天兑现。" },
                { type: "mathlink", text: "认旧友：b17.1.3 第 3 页讲过——两对基因住在同一对同源染色体上（连锁），\"绑\"在一起遗传；b17.1.5 也预告过，今天讲完完整故事。" },
                { type: "text", html: "严格说连锁：同一条染色体上的基因，在减数分裂时倾向于一起进入同一个配子——这就是连锁（b17.1.3 的\"绑在一起\"，这里是严格版）。" },
                { type: "text", html: "再说互换：减数分裂时，同源染色体的非姐妹染色单体（同一对同源染色体上、分别来自父方和母方的两条染色单体）偶尔交换片段——这叫互换。互换后，\"绑在一起\"的基因就被拆开重组了。" },
                { type: "text", html: "为什么 9∶3∶3∶1 是例外：连锁时，\"绑在一起\"的基因整体传递，后代多为亲本组合；互换偶尔发生，才出现少量重组类型。所以 9∶3∶3∶1 只在独立遗传时成立——连锁互换是例外。" },
                { type: "mathlink", text: "这就是 b17.1.4 第四问的答案：\"这几对性状独立遗传吗（连锁的不算）？\"——连锁的基因对，不适用自由组合定律。" }
              ],
              point: "连锁：绑在一起传；互换：偶尔交换片段——9∶3∶3∶1 只在独立遗传时成立。"
            }
          ]
        },
        {
          id: "b18.1.3",
          title: "系谱图判读实战",
          prereq: "b18.1.2 伴性遗传",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：判读步骤总览（讲解页） ================= */
            {
              id: "b18.1.3-p1",
              kind: "explain",
              title: "判读三步走：口诀开道",
              blocks: [
                { type: "lead", text: "系谱图摆在面前：先看谁、再定什么？" },
                { type: "slogan", text: "无中生有是隐性，有中生无是显性" },
                { type: "text", html: "先看代际，再看口诀——口诀只解决\"定显隐\"第一步，不包办全程。" },
                { type: "text", html: "第一步，先定显隐：看口诀。第二步，再定常性：基因在常染色体还是 X 染色体上？第三步，再推基因型：逐个成员写出可能的基因型。" },
                { type: "trap", text: "顺序不能反，一步都不能跳——跳步就是猜。" },
                { type: "text", html: "先认词——系谱图：家族性状传递的记录图；显性：杂合子也表现；隐性：纯合子才表现；基因型：个体的基因组成；表现型：表现出来的性状；携带者：带致病基因但表型正常；常染色体：与性别无关；X 染色体：性染色体的一种。" },
                { type: "oldfriend", text: "认旧友：b17.1.2 数格子时点的\"基因型\"（DD、Dd、dd 这样的字母组合）和\"表现型\"（黄圆、绿皱这样的外在表现），这里是正式定义。" },
                { type: "note", text: "适用于孟德尔式单基因遗传系谱（不完全显性等情形不在本课范围）。" },
                { type: "oldfriend", text: "预告：表现型正常≠基因型正常——第 4 页回填。" }
              ],
              point: "看系谱永远两步半：先定显隐、再定常性、最后推基因型。"
            },
            /* ================= p2：B6 第一步·定显隐（交互页） ================= */
            {
              id: "b18.1.3-p2",
              kind: "interact",
              title: "第一步：先定显隐",
              exploreTip: "点\"显性\"或\"隐性\"提交判读：一步过关、自动进下一步。",
              widgets: [
                { type: "pedigree-quest", params: Object.assign({}, BIO_B18_M1.q1) },
                { type: "pedigree-quest", params: Object.assign({}, BIO_B18_M1.q2) },
                { type: "pedigree-quest", params: Object.assign({}, BIO_B18_M1.q3) }
              ],
              point: "口诀是拐杖，不是答案——判完回头看图：代际关系对上了吗？"
            },
            /* ================= p3：B6 第二步·定常/性（交互页） ================= */
            {
              id: "b18.1.3-p3",
              kind: "interact",
              title: "第二步：再定常性",
              exploreTip: "接着判：基因在常染色体上，还是 X 染色体上？",
              widgets: [
                { type: "pedigree-quest", params: Object.assign({focusStep: 1}, BIO_B18_M1.q1) },
                { type: "pedigree-quest", params: Object.assign({focusStep: 1}, BIO_B18_M1.q2) },
                { type: "pedigree-quest", params: Object.assign({focusStep: 1}, BIO_B18_M1.q3) }
              ],
              point: "先定显隐、再定常性——顺序不能反。"
            },
            /* ================= p4：B6 第三步·基因型推断 + 辨析②回填 ================= */
            {
              id: "b18.1.3-p4",
              kind: "interact",
              title: "第三步：推基因型",
              exploreTip: "点系谱图里的成员，看基因型推断。",
              widgets: [
                { type: "pedigree-quest", params: Object.assign({focusStep: 2}, BIO_B18_M1.q1) },
                { type: "pedigree-quest", params: Object.assign({focusStep: 2}, BIO_B18_M1.q2) },
                { type: "pedigree-quest", params: Object.assign({focusStep: 2}, BIO_B18_M1.q3) }
              ],
              blocks: [
                { type: "text", html: "性状=基因+环境。携带致病基因≠注定发病——携带者表型正常，但能传递致病基因。" }
              ],
              point: "基因型≠表现型：携带者表型正常。下节课 b18.1.4 继续。"
            }
          ]
        },
        {
          id: "b18.1.4",
          title: "人类遗传病与遗传咨询",
          prereq: "系谱判读",
          time: "40–60 分钟",
          pages: [
            /* ================= p1：三类遗传病 + 携带≠发病（讲解页） ================= */
            {
              id: "b18.1.4-p1",
              kind: "explain",
              title: "三类遗传病",
              blocks: [
                { type: "lead", text: "遗传病分三类。先记住一句话：携带致病基因≠注定发病。" },
                { type: "text", html: "单基因遗传病：1 对等位基因决定，如白化病、色盲；多基因遗传病：多对基因加环境共同作用，如高血压、哮喘；染色体异常遗传病：染色体数目或结构异常，如 21 三体综合征。" },
                { type: "text", html: "性状=基因+环境。携带致病基因≠注定发病——携带者表型正常，但能传递致病基因。" },
                { type: "mathlink", text: "认旧友：b18.1.3 第 4 页——携带者表型正常，但能把致病基因传给后代。" },
                { type: "text", html: "多基因病还要看环境：同样的基因型，生活方式不同，发病风险也不同——\"性状=基因+环境\"在这里同样适用。" }
              ],
              point: "三类：单基因、多基因、染色体异常；携带≠发病。"
            },
            /* ================= p2：遗传咨询流程 + 产前诊断（讲解页） ================= */
            {
              id: "b18.1.4-p2",
              kind: "explain",
              title: "遗传咨询与产前诊断",
              blocks: [
                { type: "lead", text: "担心遗传病？先找医生做遗传咨询——流程是这样的。" },
                { type: "text", html: "遗传咨询四步：①了解家族病史和生育史；②分析遗传方式，推算再发风险；③提出防治对策和建议；④指导做产前诊断。" },
                { type: "text", html: "产前诊断：在胎儿出生前，用羊水检查、B 超检查、基因诊断等方法，确定胎儿是否患有某种遗传病。" },
                { type: "text", html: "红线：咨询只提供科学信息和建议，不替任何人做婚育决定，也不评判选择——只讲科学事实与咨询流程。" }
              ],
              point: "遗传咨询：了解→分析→建议；产前诊断在出生前发现问题。"
            }
          ]
        },
        {
          id: "b18.1.5",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b18.1.5-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——染色体学说：萨顿类比提假说、摩尔根果蝇实验证实（b18.1.1）；伴性遗传：性染色体 X/Y，X 隐性男患者多，交叉遗传（b18.1.2）；连锁互换：\"绑在一起\"传、偶尔交换，9∶3∶3∶1 只在独立遗传时成立（b18.1.2）；系谱三步：定显隐→定常性→推基因型，携带者表型正常（b18.1.3）；遗传病三类、携带≠发病、咨询四步（b18.1.4）。" },
                { type: "choice", stem: "女性的性染色体组成是？",
                  options: ["XX", "XY", "XXX", "YY"], answer: 0,
                  tip: "女性 XX，男性 XY（b18.1.2 第 1 页）。" },
                { type: "choice", stem: "色盲父亲（XᵇY）与正常母亲（XᴮXᴮ）的女儿，基因型是？",
                  options: ["XᴮXᵇ", "XᵇXᵇ", "XᴮXᴮ", "XᵇY"], answer: 0,
                  tip: "父亲的 Xᵇ一定传给女儿，母亲只给 Xᴮ（b18.1.2 第 2 页）。" },
                { type: "choice", stem: "母亲是携带者（XᴮXᵇ）、父亲正常（XᴮY），他们儿子色盲的概率是？",
                  options: ["1/2", "1/4", "全部", "0"], answer: 0,
                  tip: "儿子从母亲得 X：Xᴮ、Xᵇ 各一半（b18.1.2 第 2 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b18.1.5-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "要验证\"白眼基因在 X 染色体上\"，最关键的实验设计是？",
                  options: ["做正反交，看白眼是否总跟雄性走", "只数红眼果蝇有多少只", "换一种食物再养一次", "只做一代杂交就下结论"], answer: 0,
                  tip: "正反交互为对照：只变亲本组合，看性状跟不跟性别走（b18.1.1 第 2 页）。" },
                { type: "choice", stem: "21 三体综合征属于哪类遗传病？",
                  options: ["染色体异常遗传病", "单基因遗传病", "多基因遗传病", "传染病"], answer: 0,
                  tip: "染色体数目异常：第 21 号染色体多了一条（b18.1.4 第 1 页）。" },
                { type: "choice", stem: "A/a、B/b 两对基因连锁（A 与 B 在同一条染色体上，a 与 b 在另一条上），不考虑互换，AaBb 产生的配子是？",
                  options: ["AB、ab", "AB、Ab、aB、ab", "Aa、Bb", "只有 AB"], answer: 0,
                  tip: "\"绑在一起\"：A 总跟 B 走，a 总跟 b 走（b18.1.2 第 3 页）。" },
                { type: "choice", stem: "表姐婚前做遗传咨询，医生给出再发风险评估。下列做法对的是？",
                  options: ["相信科学评估，按医嘱决定是否做产前诊断", "有风险就一定不能生育", "隐瞒家族病史，免得医生多想", "找偏方\"保平安\"更靠谱"], answer: 0,
                  tip: "咨询只提供科学信息和建议；隐瞒病史、信偏方都不可取（b18.1.4 第 2 页）。"
                }
              ],
              point: "全章完。"
            }
          ]
        }
      ]
    }
  ]
};
