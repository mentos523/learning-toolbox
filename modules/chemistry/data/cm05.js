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
          id: "cm05.1.1",
          title: "质量守恒定律",
          prereq: "cm04 化学式",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：开放 vs 密闭天平对比，跃升 6） ---------- */
            {
              id: "cm05.1.1-p1",
              kind: "interact",
              title: "天平：敞口“轻了”之谜",
              exploreTip: "对照三组实验：敞口“轻了”的那组，少的不是质量，是跑掉的气体。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "开放 vs 密闭：天平读数对比",
                    columns: ["敞口（开放体系）", "密闭体系"],
                    rows: [
                      { dim: "红磷燃烧", a: "变轻——白烟（P₂O₅）跑掉了", b: "不变 ✓" },
                      { dim: "铁钉 + 硫酸铜溶液", a: "不变 ✓（无气体跑掉）", b: "不变 ✓" },
                      { dim: "碳酸钠 + 盐酸", a: "变轻——CO₂ 跑掉了", b: "不变 ✓" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "敞口“轻了”，少的不是质量，是跑掉的气体——把跑掉的算上，质量一点没少。"
            },
            /* ---------- p2：交互页（C7：微观解释——原子三不变） ---------- */
            {
              id: "cm05.1.1-p2",
              kind: "interact",
              title: "微观解释：原子三不变",
              exploreTip: "慢放看：镁原子和氧分子怎样变成氧化镁——数一数原子。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: {
                      equation: "<math><mrow><mn>2</mn><mi>Mg</mi><mo>+</mo><msub><mi>O</mi><mn>2</mn></msub></mrow><mover><mo>=</mo><mtext>点燃</mtext></mover><mrow><mn>2</mn><mi>MgO</mi></mrow></math>",
                      equationText: "2Mg + O₂ ＝点燃＝ 2MgO"
                    },
                    particles: [
                      { id: "mg1", kind: "atom", label: "Mg", charge: null, role: "reactant", count: 2 },
                      { id: "o2m", kind: "molecule", label: "O₂", charge: null, role: "reactant", count: 1 },
                      { id: "mgo", kind: "molecule", label: "MgO", charge: null, role: "product", count: 2 }
                    ],
                    keyframes: [
                      { caption: "点燃：Mg 原子与 O₂ 分子碰撞——发出耀眼白光（示意）。", moves: [{ id: "mg1", from: [25, 50], to: [45, 50] }] },
                      { caption: "Mg 原子与 O 原子重新组合成 MgO——分子种类变了，原子没变。", form: [{ ids: ["mg1", "o2m"], label: "MgO" }], fade: [] },
                      { caption: "数一数：反应前 Mg×2、O×2；反应后 Mg×2、O×2——原子种类、数目、质量都不变。", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true
                  }
                }
              ],
              point: "示意：粒子大小、数量、运动速度均为示意，未按真实比例——原子没少一个，只是换了“队形”。"
            },
            /* ---------- p3：讲解页（定律表述 + “参加反应的各物质”划重点） ---------- */
            {
              id: "cm05.1.1-p3",
              kind: "explain",
              title: "质量守恒定律",
              blocks: [
                { type: "lead", text: "天平不会说谎——说谎的是“没算跑掉的气体”的眼睛。" },
                { type: "text", html: "<b>质量守恒定律</b>：参加化学反应的<b>各物质</b>的质量总和，等于反应后生成的各物质的质量总和。关键词是“<b>参加反应的</b>”——没参加的、跑掉的，都不在账上。" },
                { type: "text", html: "微观解释：化学变化中原子<b>种类、数目、质量</b>都不变——原子没少一个，只是换了“队形”，所以质量守恒。开放体系里气体逸散，天平读数变小，不算违背定律（称的是密闭体系）。" },
                { type: "trap", text: "⚠ “镁条烧完变轻，质量不守恒”是错觉：MgO 白烟跑掉了——把跑掉的算上，质量一点没少；“质量守恒 = 体积守恒”也是错觉：体积不守恒！" },
                { type: "oldfriend", text: "（回看：cm03.1.2 原子三不变——今天它变成了定律。）" }
              ],
              point: "称的是“参加反应的”，不是“烧杯里剩下的”——气体跑了，天平会“说谎”。"
            }
          ]
        },
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
                { type: "lead", text: "上一课称出来了：反应前后原子的种类和个数都不变。化学方程式就是把“原子账本”写成一句话。" },
                { type: "text", html: "C + O₂ ＝点燃＝ CO₂ 有三层意义：① 质：碳和氧气点燃生成二氧化碳；② 量：12 份（质量）碳与 32 份氧气恰好反应，生成 44 份二氧化碳；③ 粒子数比 1∶1∶1。原子一个没少，只是换了“队形”：分子拆了重组。" },
                { type: "text", html: "书写原则：① 以客观事实为依据；② 遵守质量守恒定律。四步：一写（反应物、生成物化学式）→ 二配（只调系数）→ 三注（条件；气体 ↑、沉淀 ↓）→ 四等（短线改等号；可逆写 ⇌）。" },
                { type: "trap", text: "⚠ 全书第一大错：配平时改下标！cm04.2.1 立过靶：H₂O 的“2”是下标（水分子里 2 个氢原子），改成 H₂O₂ 就成了双氧水。下标是身份证，系数是人数：配平只能加人，不能改身份证。" }
              ],
              point: "一写二配三注四等；配平不改下标——第 2 页亲手配一次。"
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
                  stem: "配平 H₂ + O₂ → H₂O（待配平）时，下面哪种做法犯了“改下标”的错？",
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
        },
        /* ============ cm05.1.3 化学方程式（下）：配平方法 + 闯关（蓝队 2026-10-15，批1） ============ */
        {
          id: "cm05.1.3",
          title: "化学方程式（下）",
          prereq: "cm05.1.2 化学方程式（上）",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C3 配平闯关：Fe₂O₃ + CO，Y9 口径） ---------- */
            {
              id: "cm05.1.3-p1",
              kind: "interact",
              title: "配平闯关：只许调系数",
              exploreTip: "先点一下 Fe₂O₃ 的下标“2”（试试陷阱），再调系数配平。",
              widgets: [
                {
                  type: "equation-balance",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "Fe₂O₃", atoms: { Fe: 2, O: 3 } },
                        { formula: "CO", atoms: { C: 1, O: 1 } }
                      ],
                      products: [
                        { formula: "Fe", atoms: { Fe: 1 } },
                        { formula: "CO₂", atoms: { C: 1, O: 2 } }
                      ],
                      conditions: "高温",
                      reversible: false
                    },
                    coeffInit: [1, 1, 1, 1],
                    coeffMax: 9,
                    trapSubscript: true,
                    trapText: "⚠ 这是身份证号，不能改！下标是物质的“身份证号”——把 H₂O 改成 H₂O₂，它就变成双氧水，不再是水了。配平只能调系数（加“人数”），绝不改下标。",
                    answer: [1, 3, 2, 3],
                    showWeigh: true,
                    relMass: { Fe: 56, O: 16, C: 12 }
                  }
                }
              ],
              point: "配平是质量守恒的必然要求——不是数学游戏，是原子在“对账”。"
            },
            /* ---------- p2：交互页（Y3 观察法回放） ---------- */
            {
              id: "cm05.1.3-p2",
              kind: "interact",
              title: "看一遍：观察法",
              exploreTip: "按 ▶ 看观察法走一遍：先找两边不一样的元素下手。",
              widgets: [
                {
                  type: "balance-replay",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "Fe₂O₃", atoms: { Fe: 2, O: 3 } },
                        { formula: "CO", atoms: { C: 1, O: 1 } }
                      ],
                      products: [
                        { formula: "Fe", atoms: { Fe: 1 } },
                        { formula: "CO₂", atoms: { C: 1, O: 2 } }
                      ],
                      conditions: "高温",
                      reversible: false
                    },
                    method: "observe",
                    steps: [
                      {
                        caption: "第 1 步 · 找：先数原子。左边 Fe 2 个、右边 Fe 1 个——Fe 两边不一样，先从 Fe 下手。",
                        coeffSnapshot: [1, 1, 1, 1],
                        highlight: []
                      },
                      {
                        caption: "第 2 步 · 配 Fe：右边 Fe 前面配 2——调的是系数，下标一个没动。",
                        coeffSnapshot: [1, 1, 2, 1],
                        highlight: [2]
                      },
                      {
                        caption: "第 3 步 · 看 O：左边 3 + CO 里的 O，右边 CO₂ 里有 2 个 O。把 CO₂ 先配 3，右边 O 就有 6 个。",
                        coeffSnapshot: [1, 1, 2, 3],
                        highlight: [3]
                      },
                      {
                        caption: "第 4 步 · 配 CO：左边 CO 前面配 3——C、O 一起齐了（C：3=3，O：3+3=6）。",
                        coeffSnapshot: [1, 3, 2, 3],
                        highlight: [1]
                      },
                      {
                        caption: "第 5 步 · 查：左边 Fe 2、C 3、O 6；右边 Fe 2、C 3、O 6。每种原子两边个数相等，配平完成 ✓",
                        coeffSnapshot: [1, 3, 2, 3],
                        highlight: []
                      },
                      {
                        caption: "第 6 步 · 注 + 等：标上条件“高温”，短线改等号：Fe₂O₃ + 3CO ＝高温＝ 2Fe + 3CO₂。",
                        coeffSnapshot: [1, 3, 2, 3],
                        highlight: []
                      }
                    ],
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。"
                  }
                }
              ],
              point: "观察法：找不一样的→配→查——一次只动一个系数，标条件、改等号别忘。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm05.1.3-p3",
              kind: "quiz",
              title: "练一练：配平规范",
              questions: [
                {
                  type: "choice",
                  stem: "化学方程式的连接符应该用？",
                  options: ["→", "＝", "—"],
                  answer: 1,
                  tip: "规范用等号（可逆反应除外）——“→”是草稿，成品用“＝”。"
                },
                {
                  type: "fill",
                  stemBefore: "Fe₂O₃ + 3CO ＝高温＝ 2Fe + 3CO₂ 中，CO 的系数是",
                  stemAfter: "。",
                  answer: "3",
                  accept: ["3。"],
                  hint: "看 C 和 O 的账",
                  tip: "C：3=3，O：3+3=6——CO 配 3，账才平。"
                },
                {
                  type: "choice",
                  stem: "配平完成后，还必须做的是？",
                  options: [
                    "把系数都改成下标",
                    "注明反应条件（标在等号上下），该标 ↑↓ 的标上",
                    "把等号改回短线"
                  ],
                  answer: 1,
                  tip: "一写二配三注四等——条件标等号上下，↑↓ 只用于规定情形。"
                }
              ],
              point: "配平三查：原子两边等吗？条件标了吗？用的是等号吗？"
            }
          ]
        }
      ]
    },
    /* ============ 单元 cm05.2 利用方程式的计算（蓝队 2026-10-15，批1） ============ */
    {
      id: "cm05.2",
      title: "利用方程式的计算",
      lessons: [
        {
          id: "cm05.2.1",
          title: "计算（上）",
          prereq: "cm05.1.3 化学方程式（下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm05.2.1-p1",
              kind: "explain",
              title: "计算六步：设写找列解答",
              blocks: [
                { type: "lead", text: "化学计算不是列式，是走流程——六步一步不错，才算真会。" },
                { type: "text", html: "计算六步：<b>设</b>（设未知量）→ <b>写</b>（写出配平的方程式）→ <b>找</b>（找出质量关系）→ <b>列</b>（列比例式）→ <b>解</b>（解出未知量）→ <b>答</b>（带单位回答）。顺序错了全错：“写”（配平）在“列”前面。" },
                { type: "trap", text: "⚠ “不配平方程式就计算”是错的：不配平的方程式是“错的等式”——配平是计算的前提。" },
                { type: "slogan", text: "动笔前三问：配平了吗？纯净物吗？单位对吗？" }
              ],
              point: "六步走：设写找列解答——“写”（配平）在“列”前面。"
            },
            {
              id: "cm05.2.1-p2",
              kind: "explain",
              title: "纯量法与辨析②",
              blocks: [
                { type: "lead", text: "两个大坑——“代入什么”“系数是什么”，一次填平。" },
                { type: "text", html: "<b>纯量法</b>：只代入纯净物质量——混合物先换算成纯净物（样品质量 × 纯度）。" },
                { type: "text", html: "<b>红线辨析②立靶</b>：系数比 2∶1∶2 是粒子个数比、非质量比！质量比 = 系数比 × 摩尔质量比（如 2KClO₃ 制 O₂：245∶149∶96）；系数当质量用，是计算第一大错。" },
                { type: "text", html: "<b>摩尔质量</b>（本课初见）：1 mol 物质质量，单位 g/mol（不是 g！），数值等于相对分子质量——严格定义 cm13.1.2 见。" },
                { type: "text", html: "直观版（先直觉后严格）：49g 只两位有效数字，严格该写 19g；本课先走流程，按计算器写，严格规则以后回填。" },
                { type: "trap", text: "⚠ “混合物总质量直接代入”是错的：须先换成纯净物！" },
                { type: "mathlink", text: "直观版（比例式）：245∶96 = 49g∶x——化学计算就是解比例式。" }
              ],
              point: "纯量法 + 辨析②：代入纯净物，系数比≠质量比。"
            },
            {
              id: "cm05.2.1-p3",
              kind: "interact",
              title: "例题分步：49g KClO₃ 制 O₂",
              exploreTip: "一步一步填：设→写→找→列→解→答，每步即时核对。",
              widgets: [
                {
                  type: "stoich-steps",
                  params: {
                    title: "49g KClO₃ 完全分解，生成 O₂ 多少克？",
                    steps: [
                      { key: "设", prompt: "设生成 O₂ 的质量为 x", hint: "未知量设 x，带单位" },
                      { key: "写", prompt: "写出配平的化学方程式", hint: "2KClO₃ ＝MnO₂/加热＝ 2KCl + 3O₂↑（先配平！条件标等号上下）" },
                      { key: "找", prompt: "找出已知量与未知量的质量关系", hint: "2×122.5 ∶ 3×32 = 245 ∶ 96（质量比！不是系数比）" },
                      { key: "列", prompt: "列比例式", hint: "245 ∶ 96 = 49g ∶ x" },
                      { key: "解", prompt: "解出 x", hint: "x = 49×96÷245" },
                      { key: "答", prompt: "答", hint: "生成氧气 19.2g（本课直观版：先走通流程）" }
                    ],
                    checkTable: { "解": "19.2g" },
                    foldLevels: 3,
                    sigFig: 3,
                    recordKey: "chm_stoich_cm05.2.1"
                  }
                }
              ],
              point: "自查清单：方程式配平了吗？代入的是纯净物质量吗？单位写对了吗？"
            },
            {
              id: "cm05.2.1-p4",
              kind: "quiz",
              title: "练一练：计算基本功",
              questions: [
                {
                  type: "choice",
                  stem: "计算的第一步“写”指的是？",
                  options: [
                    "写出配平的化学方程式",
                    "写出已知数据",
                    "写出答案"
                  ],
                  answer: 0,
                  tip: "“写”在“列”前面——不配平的方程式是“错的等式”，不能算。"
                },
                {
                  type: "choice",
                  stem: "2H₂ + O₂ ＝点燃＝ 2H₂O 中，H₂ 与 O₂ 的质量比是？",
                  options: ["2∶1", "4∶32 = 1∶8", "2∶32"],
                  answer: 1,
                  tip: "质量比 = 系数比 × 摩尔质量比 = (2×2)∶(1×32) = 1∶8——系数比不是质量比！"
                },
                {
                  type: "choice",
                  stem: "含杂质的样品 10g（含 CaCO₃ 80%），代入计算的质量是？",
                  options: ["10g", "8g", "12.5g"],
                  answer: 1,
                  tip: "纯量法：10g × 80% = 8g——只把纯净物质量代入。"
                }
              ],
              point: "红线辨析②：系数比是粒子个数比，质量比要乘摩尔质量比——别拿错。"
            }
          ]
        },
        {
          id: "cm05.2.2",
          title: "计算（下）",
          prereq: "cm05.2.1 计算（上）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm05.2.2-p1",
              kind: "explain",
              title: "限量反应物：谁定产量",
              blocks: [
                { type: "lead", text: "两种反应物都给了，谁说了算？——少的（按比例算）说了算。" },
                { type: "text", html: "<b>限量反应物</b>：两种反应物，先按方程式算谁先用完——先用完的定产量，剩下的过量。如 6.5g Zn 与含 H₂SO₄ 4.9g 的稀硫酸：Zn 需酸 9.8g，酸只 4.9g——酸限量，按酸算。" },
                { type: "text", html: "<b>气体体积换算</b>：方程式是<b>质量关系</b>，不是体积关系！已知气体体积，先换算成质量（用密度）再代入。条件：本课只处理“密度已知”的换算；标准状况（0℃、101kPa）下 22.4 L/mol 是高中内容，不展开。" },
                { type: "trap", text: "⚠ “两种反应物都按完全反应算”是错觉：限量决定产量（cm13/cm16 回填）；“气体体积直接代入”也是错觉：先换算成质量！" }
              ],
              point: "两种反应物，先判限量——谁先用完，谁定产量。"
            },
            {
              id: "cm05.2.2-p2",
              kind: "interact",
              title: "例题分步：谁是限量",
              exploreTip: "关键在“找”这一步：先算谁先用完，再列比例式。",
              widgets: [
                {
                  type: "stoich-steps",
                  params: {
                    title: "6.5g Zn 与含 H₂SO₄ 4.9g 的稀硫酸反应，生成 H₂ 多少克？",
                    steps: [
                      { key: "设", prompt: "设生成 H₂ 的质量为 x", hint: "未知量设 x，带单位" },
                      { key: "写", prompt: "写出配平的化学方程式", hint: "Zn + H₂SO₄ ＝ ZnSO₄ + H₂↑（已配平）" },
                      { key: "找", prompt: "先判限量，再找质量关系", hint: "6.5g Zn 需 H₂SO₄ 9.8g，实际只有 4.9g——酸是限量，按酸算：98 ∶ 2 = 4.9g ∶ x" },
                      { key: "列", prompt: "列比例式", hint: "98 ∶ 2 = 4.9g ∶ x" },
                      { key: "解", prompt: "解出 x", hint: "x = 4.9×2÷98" },
                      { key: "答", prompt: "答", hint: "生成氢气 0.1g（限量反应物是 H₂SO₄）" }
                    ],
                    checkTable: { "解": "0.1g" },
                    foldLevels: 3,
                    sigFig: 3,
                    recordKey: "chm_stoich_cm05.2.2"
                  }
                }
              ],
              point: "自查清单：方程式配平了吗？判限量了吗？代入的是纯净物质量吗？"
            },
            {
              id: "cm05.2.2-p3",
              kind: "quiz",
              title: "练一练：限量与换算",
              questions: [
                {
                  type: "choice",
                  stem: "两种反应物都足量吗？产量由谁决定？",
                  options: [
                    "由质量大的决定",
                    "由限量反应物决定",
                    "两种各算一半"
                  ],
                  answer: 1,
                  tip: "先用完的定产量——限量反应物说了算。"
                },
                {
                  type: "choice",
                  stem: "已知生成 O₂ 的体积，要求质量，正确做法是？",
                  options: [
                    "把体积直接代入方程式",
                    "先用密度把体积换算成质量，再代入",
                    "体积和质量是一回事，不用换算"
                  ],
                  answer: 1,
                  tip: "方程式是质量关系——体积先换算成质量！"
                }
              ],
              point: "限量三步：都算一遍→找先用完的→按它算——过量不管，限量说了算。"
            }
          ]
        },
        {
          id: "cm05.2.3",
          title: "本章小结与习题",
          prereq: "cm05.2.2 计算（下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm05.2.3-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "<b>质量守恒</b>：参加反应的各物质质量总和不变（原子三不变；称的是密闭体系）。<b>方程式</b>：一写二配三注四等；配平只调系数、绝不改下标（下标是身份证）；等号连接，条件标等号上下。<b>配平方法</b>：最小公倍数法 / 观察法 / 奇偶法。<b>计算</b>：设写找列解答六步；纯量法；限量反应物；红线辨析①（下标 vs 系数）②（系数比 vs 质量比）。"
                }
              ],
              point: "本章两句话：配平只能调系数；计算先配平、用纯量、判限量。"
            },
            {
              id: "cm05.2.3-p2",
              kind: "quiz",
              title: "本章习题：辨析①②自测",
              questions: [
                {
                  type: "choice",
                  stem: "配平 H₂ + O₂ → H₂O（待配平）时，把 H₂O 改成 H₂O₂。这种做法？",
                  options: [
                    "可以，配平了就行",
                    "犯了全书第一大错：改下标 = 改物质种类",
                    "可以，只要系数也调"
                  ],
                  answer: 1,
                  tip: "红线辨析①：下标是身份证——H₂O₂ 是双氧水，不再是水。"
                },
                {
                  type: "choice",
                  stem: "2KClO₃ ＝MnO₂/加热＝ 2KCl + 3O₂↑ 中，KClO₃ 与 O₂ 的质量比是？",
                  options: ["2∶3", "245∶96", "122.5∶32"],
                  answer: 1,
                  tip: "红线辨析②：质量比 = 系数比 × 摩尔质量比 = 245∶96——不是 2∶3！"
                },
                {
                  type: "fill",
                  stemBefore: "配平：Al + O₂ → Al₂O₃，Al 的系数是",
                  stemAfter: "（待配平）。",
                  answer: "4",
                  accept: ["4。"],
                  hint: "4Al + 3O₂ ＝点燃＝ 2Al₂O₃",
                  tip: "4Al + 3O₂ ＝ 2Al₂O₃：Al 4=4，O 6=6——配平完成。"
                }
              ],
              point: "辨析①②自测过关：下标不动，系数比≠质量比——分水岭跨过去了。"
            }
          ]
        }
      ]
    }
  ]
};
