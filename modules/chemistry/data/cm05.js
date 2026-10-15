/* ============================================================
 * 学习工具箱 · 化学 · 第五章数据（蓝队 2026-10-15，试点 cm05.1.2）
 *
 * ============ 化学数据 Schema（冻结版 v1.0，阶段三 130 课批量生产复用） ============
 *
 * 1. 注册：window.CHEM_CH["cmNN"] = { id, units[] }。
 *    章标题/目标不在此文件，见 data/chapters.js（window.CHEM_META，
 *    22 章元信息冻结自 curriculum v1.1，生产队不得改章名）。
 *
 * 2. 层级：章 → units[]（单元）→ lessons[]（课）→ pages[]（页）。
 *    id 命名铁律：
 *      章 "cm05"；单元 "cm05.1"（章号.单元序号）；
 *      课 "cm05.1.2"（章号.单元序号.课序号）；
 *      页 "cm05.1.2-p1"（课号-p页序号），全局唯一。
 *    深链：index.html#chm=<课号>（旧 hash 兼容）；新 hash #<课号>/<页码>。
 *
 * 3. 页对象：
 *    { id, kind, title, point, pointScroll?, exploreTip?,
 *      widgets?|blocks?|questions?, formulas? }
 *    kind 枚举："interact"（交互页，≤150 字）/ "explain"（讲解页，
 *      正文 blocks ≤300 字，point 不计入）/ "quiz"（练习页）。
 *    title：一句话概念，≤20 字。point：底部点拨区 ≤60 字（黄队文案）。
 *    exploreTip：交互页动手提示 ≤40 字（黄队文案）。
 *    formulas：本课公式注册表 {key:{mathml, translation}}；正文块中用
 *      <span class="chm-f" data-f="key"></span> 占位，渲染器负责
 *      MathML/降级文本二选一（translation 必填，降级用）。
 *
 * 4. explain 页 blocks[]（顺序即渲染顺序），type 枚举：
 *    "lead"      {text}                      先现象后规则的引子
 *    "text"      {html}                      正文（可含 chm-f 公式占位）
 *    "trap"      {text}                      误区警示："⚠ 别搞混：××不是××，因为××"
 *    "oldfriend" {text}                      认旧友："（就是你第 X 页……）"回看/预告
 *    "mathlink"  {text}                      数学呼应（带 预告/回填/奠基 标签）
 *    "slogan"    {text}                      口诀 ≤20 字
 *    "widget"    {widget:{type,params}}       讲解页内嵌交互组件
 *
 * 5. interact 页 widgets[]，type 枚举（试点实现 3 种，C1–C10/Y6/Y10/
 *    Y12/Y13 随阶段三按 interactions.md spec 增补）：
 *    "equation-balance"  C3 方程式配平（跃升 4 脚手架；Y9 口径）
 *      params: { equation:{reactants:[{formula, atoms:{H:2}}],
 *                products:[...], conditions（如"点燃"), reversible:false},
 *                coeffInit, coeffMax（默认 9）, trapSubscript（默认 true）,
 *                trapText（§15 B5：占位不可进生产，本课已定稿见下）,
 *                answer（最小整数比，黄队配；B1 口径：任一正整数解都算
 *                配平成功，另给"最简整数比 ✓"徽章）,
 *                showWeigh（默认 true：质量守恒称量动画）,
 *                relMass（如{H:1,O:16}：相对原子质量示意值，数据驱动，
 *                人教版教科书常用值，试点扩展字段） }
 *      铁律双重执行：atoms 锁定自 params（渲染器永不从下标反推）；
 *      点下标只弹警告、不改数据；判分器（练习页）复测"改下标=改物质"。
 *      B5 trapText 定稿（蓝队 2026-10-15，来源：T3 采纳例 + 跃升 4 点拨话术
 *      + pedagogy Y9"这是身份证号，不能改！"；黄队生产前可微调）：
 *      "⚠ 这是身份证号，不能改！下标是物质的'身份证号'——把 H₂O 改成
 *       H₂O₂，它就变成双氧水，不再是水了。配平只能调系数（加'人数'），
 *       绝不改下标。"
 *    "formula-read"  Y1 化学式慢读点读器（cm04.2.1→cm05.1.2 回填）
 *      params: { formula（显示名）, segments:[{label, mathml, fallback,
 *                sub?（下标段样式）, gloss（慢读文案）, level:"macro"/"micro"}],
 *                recordKey（冻结格式 chm_read_<课号>，§15 B10） }
 *      宏观/微观双注齐全；speechSynthesis 特性检测，不支持静默降级。
 *    "balance-replay"  Y3 配平步骤回放（给定例题固定分镜，主动降级）
 *      params: { equation（同 C3 结构）, method:"lcm"/"observe"/"odd-even",
 *                steps:[{caption, coeffSnapshot（该步系数快照）,
 *                         highlight（高亮的物种下标）}],
 *                scaleNote（B4 定稿文案，见下） }
 *      B4 定稿文案（蓝队 2026-10-15，§15 B4 占位句冻结版；黄队可做措辞优化）：
 *      "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。"
 *
 * 6. quiz 页 questions[]，type 枚举（判分口径沿用语法 Y3）：
 *    "choice" {stem, options[], answer(0-based), tip}
 *    "fill"   {stemBefore, stemAfter, answer, accept[], hint, tip}
 *    "review" {html}  本课小结静态块（无判分）
 *    归一化：大小写不敏感、连续空白折叠；上标 ³ 接受纯文本 3 变体；
 *    全角冒号接受为半角；canonical + accept 全集（物理 R2 教训）。
 *
 * 7. 全局铁律（docs/chemistry-interactions.md §0.3）：
 *    - params 里不出现具体色值，只用 --chm-* 语义名；本数据用
 *      colorRole 语义（渲染器映射为 var(--chm-*)）。深色模式自动跟随。
 *    - 触控目标 ≥44px；双编码（颜色+文字/形状）；读数行走 MathML，
 *      单位与数值同行；无音频文件。
 *    - 化学用语：方程式用等号（可逆 ⇌ 除外）；↑↓ 规范；离子电荷数在前。
 *    - 微观粒子页"示意，未按比例"声明必备（W-C7；本课 Y3 末步已配）。
 *
 * 内容分工：概念表述=化学专家队；教学流/话术=黄队；
 * 跃升 4 脚手架（cm04.2.1 立靶 2 页 + cm05.1.2 回填；红线辨析①）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm05"] = {
  id: "cm05",
  units: [
    {
      id: "cm05.1",
      title: "质量守恒与方程式",
      lessons: [
        {
          id: "cm05.1.2",
          title: "化学方程式（上）",
          prereq: "cm05.1.1 质量守恒定律",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：讲解页（方程式三层意义 + 书写原则/步骤 + 红线辨析①回填） ---------- */
            {
              id: "cm05.1.2-p1",
              kind: "explain",
              title: "方程式是原子的账本",
              blocks: [
                { type: "lead", text: "上一课称出来了：反应前后，原子的种类和个数都不变。化学方程式，就是把这本“原子账本”写成一句话。" },
                { type: "text", html: "C + O₂ ＝点燃＝ CO₂ 有三层意义：① 质：碳和氧气点燃生成二氧化碳；② 量：12 份碳与 32 份氧气恰好完全反应，生成 44 份二氧化碳；③ 粒子数比 1∶1∶1。原子没少一个，只是换了“队形”——分子拆了重组，原子一个没碎。" },
                { type: "text", html: "书写原则：① 以客观事实为依据；② 遵守质量守恒定律。四步：一写（反应物、生成物的化学式）→ 二配（配平：只调系数）→ 三注（注明条件；气体 ↑、沉淀 ↓）→ 四等（短线改等号；可逆反应写 ⇌）。" },
                { type: "trap", text: "⚠ 全书第一大错：配平时改下标！cm04.2.1 立过靶：H₂O 的“2”是下标（一个水分子里 2 个氢原子），改成 H₂O₂，水就变成了双氧水。下标是身份证，系数是人数：配平只能加人（调系数），不能改身份证（改下标）。" }
              ],
              point: "一写二配三注四等；配平只数原子、不改下标——第 2 页亲手配一次。"
            },
            /* ---------- p2：交互页（C3 配平 + Y1 慢读回填） ---------- */
            {
              id: "cm05.1.2-p2",
              kind: "interact",
              title: "亲手配平：只许调系数",
              exploreTip: "先点一下 H₂O 的“2”（下标），再调前面的系数，把两边配平。",
              widgets: [
                {
                  type: "equation-balance",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "H₂", atoms: { H: 2 } },
                        { formula: "O₂", atoms: { O: 2 } }
                      ],
                      products: [
                        { formula: "H₂O", atoms: { H: 2, O: 1 } }
                      ],
                      conditions: "点燃",
                      reversible: false
                    },
                    coeffInit: [1, 1, 1],
                    coeffMax: 9,
                    trapSubscript: true,
                    trapText: "⚠ 这是身份证号，不能改！下标是物质的“身份证号”——把 H₂O 改成 H₂O₂，它就变成双氧水，不再是水了。配平只能调系数（加“人数”），绝不改下标。",
                    answer: [2, 1, 2],
                    showWeigh: true,
                    relMass: { H: 1, O: 16 }
                  }
                },
                {
                  type: "formula-read",
                  params: {
                    formula: "2H₂",
                    recordKey: "chm_read_cm05.1.2",
                    segments: [
                      {
                        label: "系数 2",
                        mathml: "<math><mn>2</mn></math>",
                        fallback: "2",
                        gloss: "系数是“人数”：2 个氢分子。配平只许调系数，不许改下标。",
                        level: "micro"
                      },
                      {
                        label: "H",
                        mathml: "<math><mi>H</mi></math>",
                        fallback: "H",
                        gloss: "H 是氢元素符号。宏观读“氢气”：一种无色气体。",
                        level: "macro"
                      },
                      {
                        label: "下标 2",
                        sub: true,
                        mathml: "<math><mn>2</mn></math>",
                        fallback: "₂",
                        gloss: "下标是“身份证号”：一个氢分子由两个氢原子构成。改了它，氢气就变成另一种物质了。",
                        level: "micro"
                      }
                    ]
                  }
                }
              ],
              point: "系数是“人数”（几个分子），下标是“身份证号”（分子里几个原子）——两个“2”，完全两回事。"
            },
            /* ---------- p3：交互页（Y3 最小公倍数法回放 + 原子重组示意） ---------- */
            {
              id: "cm05.1.2-p3",
              kind: "interact",
              title: "看一遍：最小公倍数法",
              exploreTip: "按 ▶ 看最小公倍数法走一遍：每一步只动一个系数。",
              widgets: [
                {
                  type: "balance-replay",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "H₂", atoms: { H: 2 } },
                        { formula: "O₂", atoms: { O: 2 } }
                      ],
                      products: [
                        { formula: "H₂O", atoms: { H: 2, O: 1 } }
                      ],
                      conditions: "点燃",
                      reversible: false
                    },
                    method: "lcm",
                    steps: [
                      {
                        caption: "第 1 步 · 找：先数原子。左边 H 2 个、O 2 个；右边 H 2 个、O 1 个——氧两边不一样，先从氧下手。",
                        coeffSnapshot: [1, 1, 1],
                        highlight: []
                      },
                      {
                        caption: "第 2 步 · 配氧：O 的个数 2 和 1，最小公倍数是 2。右边 H₂O 前面先配 2——调的是系数，下标一个没动。",
                        coeffSnapshot: [1, 1, 2],
                        highlight: [2]
                      },
                      {
                        caption: "第 3 步 · 再看 H：左边 2 个，右边 2×2=4 个。左边 H₂ 前面配 2。",
                        coeffSnapshot: [2, 1, 2],
                        highlight: [0]
                      },
                      {
                        caption: "第 4 步 · 查：左边 H 4、O 2；右边 H 4、O 2。每种原子两边个数相等，配平完成 ✓",
                        coeffSnapshot: [2, 1, 2],
                        highlight: []
                      },
                      {
                        caption: "第 5 步 · 注 + 等：标上条件“点燃”，短线改等号：2H₂ + O₂ ＝点燃＝ 2H₂O。下面看原子是怎么“换队形”的。",
                        coeffSnapshot: [2, 1, 2],
                        highlight: []
                      }
                    ],
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。"
                  }
                }
              ],
              point: "最小公倍数法：找 → 配 → 查。先配两边个数不一样的元素，一次只动一个系数。"
            },
            /* ---------- p4：练习页（判分器复测“改下标=改物质”） ---------- */
            {
              id: "cm05.1.2-p4",
              kind: "quiz",
              title: "练一练：身份证保卫战",
              questions: [
                {
                  type: "choice",
                  stem: "2H₂ + O₂ ＝点燃＝ 2H₂O 里，H₂ 前面的系数“2”表示什么？",
                  options: ["两个氢原子", "两个氢分子", "氢元素的化合价是 +2"],
                  answer: 1,
                  tip: "系数是“人数”：2H₂ = 2 个氢分子。两个氢原子写作 2H，不带下标。"
                },
                {
                  type: "choice",
                  stem: "配平 H₂ + O₂ → H₂O 时，下面哪种做法犯了“改下标”的错？",
                  options: [
                    "2H₂ + O₂ ＝ 2H₂O",
                    "H₂ + O₂ → H₂O₂",
                    "H₂ + O₂ ＝点燃＝ H₂O（未配平）"
                  ],
                  answer: 1,
                  tip: "H₂O₂ 是双氧水——改下标 = 改物质种类，全书第一大错。"
                },
                {
                  type: "fill",
                  stemBefore: "2H₂ + O₂ ＝点燃＝ 2H₂O 中，参加反应的 H₂ 与 O₂ 的分子个数比是",
                  stemAfter: "。",
                  answer: "2:1",
                  accept: ["2∶1", "2比1"],
                  hint: "看系数",
                  tip: "系数比 = 粒子个数比——方程式的第三层意义。"
                }
              ],
              point: "过关了？记住这句：下标是身份证，系数是人数——配平只能加人，不能改身份证。"
            }
          ]
        }
      ]
    }
  ]
};
