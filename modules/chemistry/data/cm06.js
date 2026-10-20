/* ============================================================
 * 学习工具箱 · 化学 · 第六章数据（蓝队 2026-10-15，阶段三批2）
 *
 * 章：cm06 碳与碳的氧化物（九上第六单元）
 * 课：cm06.1.1 / cm06.1.2 / cm06.2.1 / cm06.2.2 / cm06.2.3（5 课，15 页）
 * 依据：docs/chemistry-curriculum.md v1.1（cm06 课表）、
 *       docs/chemistry-pedagogy.md v1.1（cm06.1/cm06.2 单元策略）、
 *       docs/chemistry-interactions.md v1.1（组件 spec）、
 *       ~/workspace/chem-audit/chemistry-truth-criteria.md（CHEM-XX）。
 * Schema 沿用 data/cm05.js 文件头冻结版 v1.0。
 * 本批用到的组件类型：side-compare / reaction-particle / lab-assemble /
 *   safety-badge / safety-quiz（均属冻结清单，渲染器待增补，见引擎需求清单）。
 * 化学用语：方程式用 ＝（条件标等号上下）；↑ 只用于溶液中生成的气体；
 *   ↓ 只用于反应物中无固体的沉淀；离子电荷数在前。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm06"] = {
  id: "cm06",
  units: [
    {
      id: "cm06.1",
      title: "碳单质",
      lessons: [
        {
          id: "cm06.1.1",
          title: "碳的单质",
          prereq: "cm05 化学方程式",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：金刚石 vs 石墨） ---------- */
            {
              id: "cm06.1.1-p1",
              kind: "interact",
              title: "钻戒和铅笔芯：都是碳",
              exploreTip: "看对照表：结构不同，性质差多少。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "金刚石 vs 石墨：同是碳单质",
                    columns: ["金刚石", "石墨"],
                    rows: [
                      { dim: "碳原子排布", a: "正四面体网状：每个碳连 4 个碳", b: "层状：每层内每个碳连 3 个碳，层间易滑动" },
                      { dim: "硬度", a: "天然最硬", b: "软，一写就掉渣" },
                      { dim: "导电性", a: "不导电", b: "导电（可做电极）" },
                      { dim: "典型用途", a: "钻头、钻戒", b: "铅笔芯、电极" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "同是碳单质，性质天差地别——差别不在“成分”，在“结构”。"
            },
            /* ---------- p2：讲解页（结构决定性质 + C₆₀ + 活性炭） ---------- */
            {
              id: "cm06.1.1-p2",
              kind: "explain",
              title: "结构决定性质",
              blocks: [
                { type: "lead", text: "上一页你点开了对照表：钻戒硬到能划玻璃，铅笔芯软到一写就掉渣——它们可都是碳。" },
                { type: "text", html: "宏观上，金刚石和石墨都是碳单质（只由碳元素组成）。微观上，金刚石里每个碳原子与 4 个碳原子连成正四面体网状，结实；石墨里碳原子排成层状，层与层之间轻轻一推就滑开，所以软、能导电。" },
                { type: "text", html: "符号上，它们都是 C。C₆₀ 是第三种碳单质：60 个碳原子拼成足球形。木炭、活性炭是疏松多孔的无定形碳，吸附能力强——防毒面具的滤毒罐、冰箱除味剂里装的就是它。" },
                { type: "slogan", text: "结构决定性质：排布不同，脾气不同。" },
                { type: "trap", text: "⚠ 别搞混：“金刚石和石墨不是同一种物质”是对的，但原因不是“成分不同”——它们都是碳单质，性质不同是因为结构不同。" }
              ],
              point: "记住这句：成分相同，结构不同，性质就不同——“结构决定性质”第一课。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm06.1.1-p3",
              kind: "quiz",
              title: "练一练：结构决定性质",
              questions: [
                {
                  type: "choice",
                  stem: "下列物质中，全部属于碳单质的一组是",
                  options: ["金刚石、石墨、C₆₀", "金刚石、CO、CO₂", "石墨、碳酸钙、活性炭"],
                  answer: 0,
                  tip: "CO、CO₂ 是化合物，碳酸钙是盐——单质是只由一种元素组成的纯净物。"
                },
                {
                  type: "choice",
                  stem: "铅笔芯软、钻石硬，根本原因是",
                  options: ["成分不同", "碳原子的排布（结构）不同", "颜色不同"],
                  answer: 1,
                  tip: "都是碳单质，差的是结构：网状 vs 层状。"
                },
                {
                  type: "fill",
                  stemBefore: "金刚石中每个碳原子与",
                  stemAfter: "个碳原子相连。",
                  answer: "4",
                  accept: ["四个", "4个"],
                  hint: "正四面体",
                  tip: "正四面体网状：每个碳连 4 个碳——这是它最硬的原因。"
                }
              ],
              point: "过关了？记住：问“为什么性质不同”，先答“结构不同”。"
            }
          ]
        },
        {
          id: "cm06.1.2",
          title: "单质碳的化学性质",
          prereq: "cm06.1.1 碳的单质",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C7：C 还原 CuO + 安全徽章） ---------- */
            {
              id: "cm06.1.2-p1",
              kind: "interact",
              title: "看：碳把铜“换”出来",
              exploreTip: "按 ▶ 看碳把铜“换”出来：黑色变红的那一刻别眨眼。",
              widgets: [
                {
                  type: "safety-badge",
                  params: {
                    level: "danger",
                    text: "加热规范：试管口略向下倾斜、试管口不朝人——冷凝水倒流会炸裂试管",
                    realityNote: "虚拟实验可重复试错；现实中一切加热操作必须在老师指导下进行。"
                  }
                },
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "C + 2CuO ＝高温＝ 2Cu + CO₂↑" },
                    particles: [
                      { id: "c1", kind: "atom", label: "C", charge: null, role: "reactant", count: 1 },
                      { id: "cuo", kind: "molecule", label: "CuO", charge: null, role: "reactant", count: 2 },
                      { id: "cu", kind: "atom", label: "Cu", charge: null, role: "product", count: 2 },
                      { id: "co2", kind: "molecule", label: "CO₂", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "高温：碳把氧化铜里的氧“抢”了过来", moves: [{ id: "c1", from: [18, 50], to: [50, 50] }] },
                      { caption: "黑色粉末逐渐变红——铜被“换”出来了", form: [{ ids: ["cuo"], label: "Cu" }], fade: [] },
                      { caption: "数一数原子个数：C×1＝1、Cu×2＝2、O×2＝2，一个没少", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true
                  }
                }
              ],
              point: "碳抢走了氧化铜里的氧——这叫还原性。试管口向下是规范。"
            },
            /* ---------- p2：讲解页（可燃性/还原性/稳定性） ---------- */
            {
              id: "cm06.1.2-p2",
              kind: "explain",
              title: "碳的三副面孔",
              blocks: [
                { type: "lead", text: "上一页你看到黑色粉末变成了红色——碳把氧化铜里的氧抢走了。今天看碳的“三副面孔”。" },
                { type: "text", html: "可燃性：氧气充足时 C + O₂ ＝点燃＝ CO₂；不足时 2C + O₂ ＝点燃＝ 2CO。氧气够不够，产物完全不同。" },
                { type: "text", html: "还原性：C + 2CuO ＝高温＝ 2Cu + CO₂↑。碳夺走氧化物里的氧，自己变成 CO₂↑——单质把化合物里的某种元素“换”出来，叫置换反应。木炭炼铜、焦炭炼铁都用这一招。" },
                { type: "text", html: "稳定性：常温下碳很稳定——古代字画用墨书写，千年不褪。条件是“常温”，加热它可不安分。" },
                { type: "trap", text: "⚠ 别搞混：C + 2CuO 既是置换也是还原反应，但不是所有还原反应都是置换反应（如 CO + CuO，CO 是化合物）。" }
              ],
              point: "碳的三副面孔：烧（可燃性）、抢（还原性）、稳（常温稳定）。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm06.1.2-p3",
              kind: "quiz",
              title: "练一练：碳的化学性质",
              questions: [
                {
                  type: "choice",
                  stem: "木炭在氧气不足时燃烧，产物是",
                  options: ["CO₂", "CO", "C"],
                  answer: 1,
                  tip: "2C + O₂ ＝点燃＝ 2CO——氧气不足，烧不“透”。"
                },
                {
                  type: "fill",
                  stemBefore: "C + 2CuO ＝高温＝ 2Cu + CO₂↑ 中，被还原的物质是",
                  stemAfter: "。",
                  answer: "CuO",
                  accept: ["氧化铜", "cuo"],
                  hint: "谁失去了氧？",
                  tip: "CuO 失去氧变成 Cu——失去氧的反应是还原反应，CuO 被还原。"
                },
                {
                  type: "choice",
                  stem: "古代字画千年不褪色，说明常温（约 25℃）下碳的化学性质",
                  options: ["很活泼", "很稳定", "能自燃"],
                  answer: 1,
                  tip: "墨的主要成分是碳——常温稳定，加热才活泼。"
                }
              ],
              point: "过关了？记住：可燃看氧气足不足，还原看谁抢了氧。"
            }
          ]
        }
      ]
    },
    {
      id: "cm06.2",
      title: "碳的氧化物",
      lessons: [
        {
          id: "cm06.2.1",
          title: "二氧化碳的制取",
          prereq: "cm06.1.2 单质碳的化学性质",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C5：制取 CO₂ 装置组装） ---------- */
            {
              id: "cm06.2.1-p1",
              kind: "interact",
              title: "组装：制取 CO₂",
              exploreTip: "把仪器拖进槽位：长颈漏斗的下端必须伸到液面下。",
              widgets: [
                {
                  type: "lab-assemble",
                  params: {
                    apparatus: "co2",
                    pieces: [
                      { id: "p1", kind: "flask", label: "锥形瓶" },
                      { id: "p2", kind: "funnel", label: "长颈漏斗" },
                      { id: "p3", kind: "plug", label: "双孔塞" },
                      { id: "p4", kind: "tube", label: "导管" },
                      { id: "p5", kind: "gasJar", label: "集气瓶" }
                    ],
                    slots: [
                      { id: "s1", accepts: ["flask"], hint: "发生装置：装石灰石" },
                      { id: "s2", accepts: ["funnel"], hint: "长颈漏斗下端要伸入液面下" },
                      { id: "s3", accepts: ["gasJar"], hint: "向上排空气法收集" }
                    ],
                    steps: [
                      { caption: "第 1 步：检查装置气密性", highlight: ["s1"] },
                      { caption: "第 2 步：锥形瓶中装入石灰石，塞紧双孔塞", highlight: ["s1"] },
                      { caption: "第 3 步：从长颈漏斗倒入稀盐酸（下端伸入液面下）", highlight: ["s2"] },
                      { caption: "第 4 步：向上排空气法收集；燃着的木条放瓶口，熄灭即满", highlight: ["s3"] }
                    ],
                    safetyChecks: [
                      { id: "sc1", text: "确认：用稀盐酸，不用稀硫酸（生成的 CaSO₄ 微溶，会覆盖石灰石表面，反应停止）", mustPass: true }
                    ],
                    realityNote: "虚拟实验为示意：现实中须在老师指导下操作，废液倒入指定容器；长颈漏斗下端伸入液面下，是防气体从漏斗口逸出。"
                  }
                }
              ],
              point: "药品：石灰石 + 稀盐酸；装置：固液不加热型；收集：向上排空气法。"
            },
            /* ---------- p2：讲解页（原理/装置/收集/检验） ---------- */
            {
              id: "cm06.2.1-p2",
              kind: "explain",
              title: "为什么是这套装置",
              blocks: [
                { type: "lead", text: "上一页你组装了制取 CO₂ 的装置——为什么用石灰石加稀盐酸，不用别的？" },
                { type: "text", html: "原理：CaCO₃ + 2HCl = CaCl₂ + H₂O + CO₂↑。不用稀硫酸：生成的 CaSO₄ 微溶，会覆盖在石灰石表面，反应很快停止——选药品必有理由。" },
                { type: "text", html: "装置：固液不加热型。规范两条：① 先检查气密性再装药品；② 长颈漏斗下端伸入液面下，防气体从漏斗口跑掉。" },
                { type: "text", html: "收集：CO₂ 密度比空气大，用向上排空气法（不用排水法，它能溶于水）。验满：燃着的木条放瓶口，熄灭即满；检验：澄清石灰水变浑浊。" },
                { type: "trap", text: "⚠ 别搞混：验满（瓶口木条熄灭）和检验（石灰水变浑浊）是两回事——一个看“满没满”，一个看“是不是 CO₂”。" }
              ],
              point: "石灰石 + 稀盐酸；固液不加热；向上排空气；石灰水检验。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm06.2.1-p3",
              kind: "quiz",
              title: "练一练：制取 CO₂",
              questions: [
                {
                  type: "choice",
                  stem: "实验室制 CO₂ 不用稀硫酸代替稀盐酸，主要原因是",
                  options: ["稀硫酸价格太贵", "生成的 CaSO₄ 微溶，覆盖石灰石使反应停止", "稀硫酸不与石灰石反应"],
                  answer: 1,
                  tip: "CaSO₄ 微溶——像给石灰石穿了件“盔甲”，酸进不去了。"
                },
                {
                  type: "choice",
                  stem: "长颈漏斗下端要伸入液面下，是为了",
                  options: ["好看", "防止生成的气体从漏斗口逸出", "加快反应速率"],
                  answer: 1,
                  tip: "规范动作不是形式：每一步都在防一个具体事故。"
                },
                {
                  type: "fill",
                  stemBefore: "实验室制取 CO₂：CaCO₃ + 2HCl = CaCl₂ + H₂O +",
                  stemAfter: "。",
                  answer: "CO2",
                  accept: ["CO₂", "co2", "CO2↑", "CO₂↑"],
                  hint: "气体符号别漏",
                  tip: "CO₂ 是从溶液里冒出来的气体，标 ↑。"
                }
              ],
              point: "过关了？记住：药品、装置、收集、检验，四问一套。"
            }
          ]
        },
        {
          id: "cm06.2.2",
          title: "二氧化碳的性质与用途",
          prereq: "cm06.2.1 二氧化碳的制取",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C7：CO₂ 通入澄清石灰水） ---------- */
            {
              id: "cm06.2.2-p1",
              kind: "interact",
              title: "看：石灰水变浑浊",
              exploreTip: "按 ▶ 看澄清石灰水变浑浊：白色的 CaCO₃ 是哪来的？",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "CO₂ + Ca(OH)₂ = CaCO₃↓ + H₂O" },
                    particles: [
                      { id: "co2", kind: "molecule", label: "CO₂", charge: null, role: "reactant", count: 1 },
                      { id: "loh", kind: "molecule", label: "Ca(OH)₂", charge: null, role: "reactant", count: 1 },
                      { id: "cc", kind: "molecule", label: "CaCO₃", charge: null, role: "product", count: 1 },
                      { id: "w", kind: "molecule", label: "H₂O", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "把 CO₂ 通入澄清石灰水", moves: [{ id: "co2", from: [15, 70], to: [50, 50] }] },
                      { caption: "白色沉淀出现——CaCO₃ 生成了", form: [{ ids: ["co2", "loh"], label: "CaCO₃↓" }], fade: [] },
                      { caption: "数一数原子个数：Ca×1＝1、C×1＝1、O×4＝4、H×2＝2", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true
                  }
                }
              ],
              point: "CO₂ 使澄清石灰水变浑浊——这是检验 CO₂ 的专属反应。"
            },
            /* ---------- p2：讲解页（性质/用途/温室效应） ---------- */
            {
              id: "cm06.2.2-p2",
              kind: "explain",
              title: "CO₂ 的三样本事",
              blocks: [
                { type: "lead", text: "上一页石灰水变浑浊了——CO₂ 还有两样本事，今天看完。" },
                { type: "text", html: "物理性质：无色无味，密度比空气大，能溶于水。化学性质三条：① 与水：CO₂ + H₂O = H₂CO₃（石蕊变红）；② 与石灰水：CO₂ + Ca(OH)₂ = CaCO₃↓ + H₂O（变浑浊）；③ 与灼热的碳：C + CO₂ ＝高温＝ 2CO。" },
                { type: "text", html: "用途：灭火、人工降雨（干冰升华吸热）、化工原料、气体肥料。温室效应：CO₂ 过多则全球变暖——“过多”是关键，CO₂ 本身无毒。" },
                { type: "trap", text: "⚠ 别搞混：CO₂ 无毒，窒息因“过多缺氧”；有毒的是 CO。Mg、Na 着火不能用 CO₂ 灭（2Mg + CO₂ ＝点燃＝ 2MgO + C）。" },
                { type: "mathlink", text: "直观版（数量级）：大气 CO₂ 浓度用 ppm（百万分之一）计量。" }
              ],
              point: "CO₂：能灭火、能制冷、可做肥料；无毒，但过多会带来温室效应。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm06.2.2-p3",
              kind: "quiz",
              title: "练一练：CO₂ 的性质",
              questions: [
                {
                  type: "choice",
                  stem: "检验二氧化碳的试剂是",
                  options: ["紫色石蕊试液", "澄清石灰水", "燃着的木条"],
                  answer: 1,
                  tip: "变浑浊才是专属检验；木条熄灭只能验满，不能证明是 CO₂。"
                },
                {
                  type: "choice",
                  stem: "干冰用于人工降雨，利用的是",
                  options: ["CO₂ 与水反应", "干冰升华吸热", "CO₂ 能灭火"],
                  answer: 1,
                  tip: "干冰 → CO₂ 气体是升华（物理变化），吸热使水蒸气凝结。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["CO₂ 有剧毒", "Mg 着火可以用 CO₂ 灭火器扑灭", "大气中 CO₂ 过多会导致温室效应"],
                  answer: 2,
                  tip: "CO₂ 无毒；Mg 着火不能用 CO₂ 灭——条件！条件！"
                }
              ],
              point: "过关了？记住：检验用石灰水，灭火看条件，无毒但过多有害。"
            }
          ]
        },
        {
          id: "cm06.2.3",
          title: "一氧化碳",
          prereq: "cm06.2.2 二氧化碳的性质与用途",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C7：CO 燃烧 + 安全徽章 + 尾气处理） ---------- */
            {
              id: "cm06.2.3-p1",
              kind: "interact",
              title: "看：CO 燃烧与尾气",
              exploreTip: "按 ▶ 看 CO 燃烧：点燃前第一步是什么？尾气去哪了？",
              widgets: [
                {
                  type: "safety-badge",
                  params: {
                    level: "danger",
                    text: "CO 剧毒！点燃前必须验纯；尾气必须处理（点燃或气球收集），不能直接排放",
                    realityNote: "虚拟演示为示意：现实中 CO 实验必须在通风橱中进行，严禁在家模仿；煤气泄漏先开窗、勿动电器开关。"
                  }
                },
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "2CO + O₂ ＝点燃＝ 2CO₂" },
                    particles: [
                      { id: "co", kind: "molecule", label: "CO", charge: null, role: "reactant", count: 2 },
                      { id: "o2", kind: "molecule", label: "O₂", charge: null, role: "reactant", count: 1 },
                      { id: "co2", kind: "molecule", label: "CO₂", charge: null, role: "product", count: 2 }
                    ],
                    keyframes: [
                      { caption: "第 1 步永远是验纯：不纯点燃会爆炸", moves: [] },
                      { caption: "点燃：蓝色火焰，CO 与 O₂ 结合成 CO₂", moves: [{ id: "co", from: [20, 50], to: [50, 50] }], form: [{ ids: ["co", "o2"], label: "CO₂" }] },
                      { caption: "尾气处理：多余的 CO 在尖嘴处点燃，不能直接排放", moves: [] },
                      { caption: "数一数原子个数：C×2＝2、O×4＝4", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true
                  }
                }
              ],
              point: "CO 能烧（蓝色火焰）、能还原、有剧毒——点燃先验纯，尾气要处理。"
            },
            /* ---------- p2：讲解页（性质/毒性/用途） ---------- */
            {
              id: "cm06.2.3-p2",
              kind: "explain",
              title: "一字之差，天壤之别",
              blocks: [
                { type: "lead", text: "上一页 CO 烧出了蓝色火焰——但这个“会烧的气”，碰不得。它和 CO₂ 只差一个氧，脾气天差地别。" },
                { type: "text", html: "物理性质：无色无味的气体，难溶于水。化学性质：① 可燃性 2CO + O₂ ＝点燃＝ 2CO₂（蓝色火焰，放热）；② 还原性 CO + CuO ＝加热＝ Cu + CO₂（冶炼金属用它当还原剂）。" },
                { type: "text", html: "毒性：CO 极易与血液中的血红蛋白结合（能力是氧气的 200–300 倍），使血红蛋白失去携氧能力——煤气中毒就是它。冬天煤炉取暖，务必装烟囱、通风。" },
                { type: "trap", text: "⚠ 安全红线：① 点燃 CO 前必须验纯（不纯点燃会爆炸）；② 实验尾气必须点燃或用气球收集，不能直接排放。现实中 CO 实验须在通风橱中做，只模拟演示。" }
              ],
              point: "CO：可燃、还原、剧毒。记住：验纯、尾气处理、通风橱。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm06.2.3-p3",
              kind: "quiz",
              title: "练一练：一氧化碳",
              questions: [
                {
                  type: "choice",
                  stem: "关于 CO 与 CO₂，正确的是",
                  options: ["都是无毒气体", "CO 有剧毒，CO₂ 无毒", "都能使澄清石灰水变浑浊"],
                  answer: 1,
                  tip: "一字之差，天壤之别：毒的是 CO，无毒的是 CO₂。"
                },
                {
                  type: "choice",
                  stem: "点燃 CO 前必须",
                  options: ["直接点燃", "先验纯", "加催化剂"],
                  answer: 1,
                  tip: "可燃性气体点燃前都要验纯——H₂、CO、CH₄，一个不落。"
                },
                {
                  type: "fill",
                  stemBefore: "CO 中毒，是因为它与血液中的",
                  stemAfter: "结合，使其失去携氧能力。",
                  answer: "血红蛋白",
                  accept: ["血红蛋白"],
                  hint: "血液里运氧的",
                  tip: "CO 与血红蛋白结合能力是氧气的 200–300 倍——抢氧气的“座位”。"
                }
              ],
              point: "过关了？记住：CO 三件事——可燃、还原、剧毒，条条有规范。"
            }
          ]
        }
      ]
    }
  ]
};
