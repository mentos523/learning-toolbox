/* ============================================================
 * 学习工具箱 · 生物 · 第十八章数据（生物生产队 2026-10-17，试点 b18.1.3）
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
        }
      ]
    }
  ]
};
