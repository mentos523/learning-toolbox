/* ============================================================
 * 学习工具箱 · 化学 · 第十二章数据（蓝队 2026-10-15，批3 cm12–cm16）
 * 物质及其变化：分类与胶体；电解质与离子方程式；氧化还原
 *
 * Schema 冻结版 v1.0（见 data/cm05.js 头注释，全批复用）：
 * window.CHEM_CH["cmNN"] = { id, units[] }；章→单元→课→页；
 * 页 kind: interact/explain/quiz；title ≤20 字；point ≤60 字；
 * exploreTip ≤40 字（交互页必填）；讲解页正文 ≤300 字；slogan ≤20 字。
 *
 * 本批用到的组件类型（params 口径见 docs/chemistry-interactions.md v1.1）：
 * C3 equation-balance（含 mode:"redox" 第二检查行，得失电子守恒；
 *   params.redox = {lose:{sp,per}, gain:{sp,per}}，sp 按 formula 匹配物种，
 *   per 为每式量得失电子数——蓝队 2026-10-15 追加实现）；
 * C7 reaction-particle（eTransfer 电子转移；scaleNote 用 B4 定稿文案）；
 * C9 rate-equilibrium（equilibriumBadge 默认 true；不可逆反应传 false）；
 * C10 redox-track（valences/transfer/motto/arrowMode:"tap"）；
 * Y1 formula-read；Y4 ion-split（spec 草案扩展字段：coefficients 配平系数数组、
 *   fullIonic 全离子方程式、netIonic 净离子方程式，供渲染器实现时取用）；
 * Y6 tri-rep（defaultView:"macro"）；Y11 side-compare（复用物理 Y5 范式）；
 * Y12 stoich-steps（recordKey 冻结格式 chm_stoich_<课号>）；
 * Y13 safety-quiz（recordKey 冻结格式 chm_safety_<课号>）；
 * Y2 safety-badge：任意 widget 传 params.safety（"虚拟/现实"对比句式）即渲染。
 *
 * 化学用语铁律：方程式用 ＝（可逆 ⇌）；条件标等号上下；↑↓ 规范；
 * 未配平方程式一律配"待配平"文字；配平只调系数。
 * T5 边界句（跃升 8）原样上页见 cm12.2.1-p3。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm12"] = {
  id: "cm12",
  units: [
    {
      id: "cm12.1",
      title: "分类与离子反应",
      lessons: [
        {
          id: "cm12.1.1",
          title: "物质的分类",
          prereq: "cm11.1.4 初中化学总结",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm12.1.1-p1",
              kind: "interact",
              title: "一束光，照出三种分散系",
              exploreTip: "点“微观”，看看三种液体里粒子大小有什么不同。",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "一束光，照出三种分散系",
                    views: {
                      macro: { text: "激光笔照进三杯液体：食盐水里看不到光路；氢氧化铁胶体里出现一条明亮的光柱（丁达尔效应）；泥水里光被挡住，静置后泥沙沉降。" },
                      micro: { text: "食盐水：Na⁺、Cl⁻ 直径小于 1nm，均匀分散；胶体：粒子直径 1–100nm，能散射光；泥水：泥沙颗粒大于 100nm，肉眼可见、会沉降。" },
                      symbol: { text: "分散系 = 分散质 + 分散剂。按分散质粒子直径分三类：溶液（<1nm）、胶体（1–100nm）、浊液（>100nm）。" }
                    },
                    defaultView: "macro",
                    badgeText: {
                      macro: "现在看：宏观现象——光照出了什么",
                      micro: "现在看：微观粒子——粒子有多大",
                      symbol: "现在看：符号表达——分散系分类"
                    }
                  }
                }
              ],
              point: "丁达尔效应是胶体的身份证：粒子直径 1–100nm——溶液和浊液都照不出这条光路。"
            },
            {
              id: "cm12.1.1-p2",
              kind: "explain",
              title: "分类：先问标准",
              blocks: [
                { type: "lead", text: "上一页那束光还记得吗？食盐水、氢氧化铁胶体、泥水——光一照，原形毕露。今天给物质分分类，先问：按什么标准分？" },
                { type: "text", html: "树状分类法像家谱，一层层往下分：物质 → 纯净物/混合物 → 单质/化合物 → 氧化物、酸、碱、盐。交叉分类法按不同标准反复分：Na₂CO₃ 既是钠盐，又是碳酸盐——标准不同，结论不同。" },
                { type: "text", html: "分散系 = 分散质 + 分散剂，按分散质粒子直径分三类：溶液（<1nm，如食盐水）、胶体（1–100nm，如氢氧化铁胶体、豆浆、雾）、浊液（>100nm，如泥水）。丁达尔效应就是胶体的身份证。" },
                { type: "trap", text: "⚠ 别搞混：'胶体介于溶液和浊液之间'是模糊说法——本质区别是分散质粒子直径 1–100nm。分类必交代标准，标准不同结论不同。" }
              ],
              point: "分类先问标准：树状一层层分，交叉多标准分——分散系按粒子直径认出胶体。"
            },
            {
              id: "cm12.1.1-p3",
              kind: "explain",
              title: "分类思想入库",
              blocks: [
                { type: "lead", text: "分类不只是'整理'——它是化学的思想方法：标准选得好，性质能预言。" },
                { type: "text", html: "豆浆点豆腐：豆浆是胶体，加盐卤（电解质）让胶体聚沉——生活里的胶体知识。雾、果冻、墨水都是胶体：粒子直径都在 1–100nm 之间。" },
                { type: "oldfriend", text: "（就是你 cm10 学过的酸、碱、盐：纯碱 Na₂CO₃ 是盐不是碱——分类标准是'组成'，不是'名字里有没有碱字'。）" },
                { type: "text", html: "思想入库：分类思想——标准不同，结论不同。从今天起，每学一类物质，先问'按什么标准分的'。" }
              ],
              point: "'标准不同，结论不同'——这是分类思想，学有机官能团、晶体分类时还会回来。"
            }
          ]
        },
        {
          id: "cm12.1.2",
          title: "离子反应（上）",
          prereq: "cm12.1.1 物质的分类",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm12.1.2-p1",
              kind: "interact",
              title: "灯泡亮了，里面发生了什么",
              exploreTip: "先点“宏观”看灯泡，再点“微观”看离子动不动。",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "灯泡亮了，里面发生了什么",
                    views: {
                      macro: { text: "五杯液体通电：盐酸、氢氧化钠溶液灯泡亮；蔗糖水、酒精灯泡不亮；固体食盐不亮——加水溶解后，亮了。" },
                      micro: { text: "亮的液体里有自由移动的离子：H⁺、Cl⁻、Na⁺、OH⁻。蔗糖水、酒精里只有分子，没有离子。固体食盐里离子被锁在晶格里，动不了。" },
                      symbol: { text: "电解质 = 在水溶液中或熔融态能导电的化合物。非电解质 = 在水溶液中和熔融态都不导电的化合物。导电条件：水溶液中或熔融态。" }
                    },
                    defaultView: "macro",
                    badgeText: {
                      macro: "现在看：宏观现象——灯泡亮不亮",
                      micro: "现在看：微观粒子——离子动不动",
                      symbol: "现在看：符号表达——电解质定义"
                    }
                  }
                }
              ],
              point: "电解质是化合物——铜能导电，但铜是单质，不是电解质。固体食盐不导电：离子动不了。"
            },
            {
              id: "cm12.1.2-p2",
              kind: "explain",
              title: "电解质：化合物 + 能电离",
              blocks: [
                { type: "lead", text: "灯泡亮的那几杯，里面都有'自由'的离子。电解质的定义就两句话，记牢。" },
                { type: "text", html: "电解质 = 在水溶液中或熔融态能导电的化合物。关键词两个：化合物（单质、混合物不是电解质）；水溶液中或熔融态（固体 NaCl 不导电）。导电的原因：电离出了自由移动的离子。" },
                { type: "text", html: "强弱电解质：强酸、强碱、大多数盐是强电解质，完全电离；弱酸、弱碱、水是弱电解质，部分电离。电离方程式：HCl ＝ H⁺ + Cl⁻；NaOH ＝ Na⁺ + OH⁻。" },
                { type: "trap", text: "⚠ 别搞混：'能导电的就是电解质'——铜能导电，但铜是单质！电解质必须是化合物。固体 NaCl 不导电：离子被锁住，动不了。" }
              ],
              point: "电解质 = 化合物 + 水溶液/熔融态导电——强弱看电离程度：完全还是部分。"
            },
            {
              id: "cm12.1.2-p3",
              kind: "interact",
              title: "慢读离子符号",
              exploreTip: "点每一段，慢读离子符号：电荷数在前，正负号在后。",
              widgets: [
                {
                  type: "formula-read",
                  params: {
                    formula: "Mg²⁺",
                    recordKey: "chm_read_cm12.1.2",
                    segments: [
                      { label: "Mg", mathml: "<math><mi>Mg</mi></math>", fallback: "Mg", gloss: "宏观：镁元素符号。", level: "macro" },
                      { label: "电荷数 2", mathml: "<math><mn>2</mn></math>", fallback: "2", gloss: "微观：带 2 个单位电荷——电荷数在前。", level: "micro" },
                      { label: "正号", mathml: "<math><mo>+</mo></math>", fallback: "+", gloss: "微观：正负号在后——正电荷。合起来读'镁离子'：是离子，不是镁原子。", level: "micro" }
                    ]
                  }
                }
              ],
              point: "Mg²⁺ 读作'镁离子'：电荷数在前、正负号在后——写成 Mg⁺² 是错的。"
            }
          ]
        },
        {
          id: "cm12.1.3",
          title: "离子反应（下）",
          prereq: "cm12.1.2 离子反应（上）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm12.1.3-p1",
              kind: "interact",
              title: "四步写出离子方程式",
              exploreTip: "跟着四步走：写 → 拆 → 删 → 查，点每一步看变化。",
              widgets: [
                {
                  type: "ion-split",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "Ba(OH)₂", atoms: { Ba: 1, O: 2, H: 2 } },
                        { formula: "H₂SO₄", atoms: { H: 2, S: 1, O: 4 } }
                      ],
                      products: [
                        { formula: "BaSO₄", atoms: { Ba: 1, S: 1, O: 4 } },
                        { formula: "H₂O", atoms: { H: 2, O: 1 } }
                      ],
                      conditions: "",
                      reversible: false
                    },
                    coefficients: [1, 1, 1, 2],
                    split: { ions: ["Ba(OH)₂", "H₂SO₄"], formulas: ["BaSO₄", "H₂O"] },
                    spectators: [],
                    fullIonic: "Ba²⁺ + 2OH⁻ + 2H⁺ + SO₄²⁻ ＝ BaSO₄↓ + 2H₂O",
                    netIonic: "Ba²⁺ + 2OH⁻ + 2H⁺ + SO₄²⁻ ＝ BaSO₄↓ + 2H₂O（无旁观离子，全部参加反应）"
                  }
                }
              ],
              point: "先写全，再决定谁'留'谁'拆'——Ba(OH)₂ + H₂SO₄ 里没有旁观离子，个个都参战。"
            },
            {
              id: "cm12.1.3-p2",
              kind: "explain",
              title: "四留三拆",
              blocks: [
                { type: "lead", text: "上一页你亲手拆了一遍：Ba(OH)₂ 和 H₂SO₄ 拆成离子，BaSO₄ 和 H₂O 留化学式。规则就四步。" },
                { type: "text", html: "① 写——写出配平的化学方程式：Ba(OH)₂ + H₂SO₄ ＝ BaSO₄↓ + 2H₂O。② 拆——'四留三拆'：弱电解质、沉淀、气体、氧化物留化学式；强酸、强碱、可溶性盐拆成离子。" },
                { type: "text", html: "本例：Ba(OH)₂、H₂SO₄ 拆成离子；BaSO₄、H₂O 留化学式：Ba²⁺ + 2OH⁻ + 2H⁺ + SO₄²⁻ ＝ BaSO₄↓ + 2H₂O。" },
                { type: "slogan", text: "四留三拆：弱沉气氧留，强酸强碱可溶盐拆" },
                { type: "trap", text: "⚠ 别搞混：把 CH₃COOH、CaCO₃、CO₂ 写成离子——弱电解质、沉淀、气体留化学式！" }
              ],
              point: "'四留三拆'先分类，再决定拆还是留——口诀背下来，拆写不用愁。"
            },
            {
              id: "cm12.1.3-p3",
              kind: "interact",
              title: "删去旁观离子",
              exploreTip: "点'删'：Na⁺ 和 NO₃⁻ 只是'看客'，删掉它们。",
              widgets: [
                {
                  type: "ion-split",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "AgNO₃", atoms: { Ag: 1, N: 1, O: 3 } },
                        { formula: "NaCl", atoms: { Na: 1, Cl: 1 } }
                      ],
                      products: [
                        { formula: "AgCl", atoms: { Ag: 1, Cl: 1 } },
                        { formula: "NaNO₃", atoms: { Na: 1, N: 1, O: 3 } }
                      ],
                      conditions: "",
                      reversible: false
                    },
                    coefficients: [1, 1, 1, 1],
                    split: { ions: ["AgNO₃", "NaCl"], formulas: ["AgCl"] },
                    spectators: ["Na⁺", "NO₃⁻"],
                    fullIonic: "Ag⁺ + NO₃⁻ + Na⁺ + Cl⁻ ＝ AgCl↓ + Na⁺ + NO₃⁻",
                    netIonic: "Ag⁺ + Cl⁻ ＝ AgCl↓"
                  }
                }
              ],
              point: "Na⁺、NO₃⁻ 只是'看客'——删掉它们，离子方程式立刻变清爽。"
            },
            {
              id: "cm12.1.3-p4",
              kind: "explain",
              title: "删、查与小结",
              blocks: [
                { type: "text", html: "③ 删——删去两边都有的旁观离子：上例删去 Na⁺、NO₃⁻，得到 Ag⁺ + Cl⁻ ＝ AgCl↓。Ba(OH)₂ + H₂SO₄ 那一例没有旁观离子，全部参加反应。" },
                { type: "text", html: "④ 查——查两遍，一个不能少。原子守恒：Ag 1、Cl 1，两边相等。电荷守恒：左边 +1−1＝0，右边 0。离子方程式是等式：原子、电荷双守恒。" },
                { type: "oldfriend", text: "（就是你 cm10.3.1 学过的复分解反应：AgNO₃ + NaCl 有沉淀生成，符合'沉淀、气体、水三者有其一'——离子方程式是复分解的'微观版'。）" },
                { type: "mathlink", text: "数学呼应（奠基）：电荷守恒 + 原子守恒，就是代数 ch01 的方程组思想——两边相等，列式求解。" }
              ],
              point: "删旁观离子，查双守恒——离子方程式写完，查两遍再交卷。"
            }
          ]
        }
      ]
    },
    {
      id: "cm12.2",
      title: "氧化还原反应",
      lessons: [
        {
          id: "cm12.2.1",
          title: "氧化还原反应（上）",
          prereq: "cm12.1.3 离子反应（下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm12.2.1-p1",
              kind: "interact",
              title: "电子搬家了",
              exploreTip: "慢放看电子：它从谁家出发，搬到谁家去？",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "H₂ + CuO ＝加热＝ Cu + H₂O", eTransfer: true },
                    particles: [
                      { id: "h2", kind: "molecule", label: "H₂", charge: null, role: "reactant", count: 2 },
                      { id: "cuo", kind: "molecule", label: "CuO", charge: null, role: "reactant", count: 2 },
                      { id: "cu", kind: "atom", label: "Cu", charge: null, role: "product", count: 2 },
                      { id: "h2o", kind: "molecule", label: "H₂O", charge: null, role: "product", count: 2 }
                    ],
                    keyframes: [
                      { caption: "加热：H₂ 分子里的 H 各交出 1 个电子（天蓝小点 e⁻，示意），电子从 H 流向 CuO 中的 Cu。" },
                      { caption: "Cu 得到 2 个电子，变成 Cu 原子；失去电子的 H 与 O 结合成 H₂O。" },
                      { caption: "数一数：反应前后 H 4 个、O 2 个、Cu 2 个——原子种类、个数都不变 ✓" }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。"
                  }
                }
              ],
              point: "电子搬家了：从 H 家搬到 Cu 家——盯住转移方向，这就是氧化还原的本质。"
            },
            {
              id: "cm12.2.1-p2",
              kind: "interact",
              title: "升失氧、降得还",
              exploreTip: "先点 Cu 标 +2，再点生成物里的 Cu 标 0：看它是'升高'还是'降低'。",
              widgets: [
                {
                  type: "redox-track",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "CuO", atoms: { Cu: 1, O: 1 } },
                        { formula: "H₂", atoms: { H: 2 } }
                      ],
                      products: [
                        { formula: "Cu", atoms: { Cu: 1 } },
                        { formula: "H₂O", atoms: { H: 2, O: 1 } }
                      ]
                    },
                    valences: {
                      reactants: { "CuO.Cu": "+2", "CuO.O": "−2", "H₂.H": "0" },
                      products: { "Cu.Cu": "0", "H₂O.H": "+1", "H₂O.O": "−2" }
                    },
                    transfer: { from: "H", to: "Cu", electrons: 2 },
                    motto: [
                      { element: "H", change: "升高", e: "失 2e⁻", reaction: "氧化反应", role: "还原剂" },
                      { element: "Cu", change: "降低", e: "得 2e⁻", reaction: "还原反应", role: "氧化剂" }
                    ],
                    arrowMode: "tap"
                  }
                }
              ],
              point: "H：升高 → 失电子 → 被氧化 → 做还原剂；Cu：降低 → 得电子 → 被还原 → 做氧化剂。"
            },
            {
              id: "cm12.2.1-p3",
              kind: "explain",
              title: "四位一体，一次记全",
              blocks: [
                { type: "lead", text: "上一页你标完了：H 从 0 升到 +1，Cu 从 +2 降到 0。四个身份，方向必须一致。" },
                { type: "text", html: "'升失氧、降得还'：化合价升高 → 失电子 → 被氧化 → 做还原剂；化合价降低 → 得电子 → 被还原 → 做氧化剂。一句话里四个名字，'升'就全是'升'那一边。" },
                { type: "text", html: "初中版（得氧失氧）看现象，高中版（电子转移）看本质。配对不错位：氧化剂（CuO）↔ 还原产物（Cu）；还原剂（H₂）↔ 氧化产物（H₂O）。电子画成小球是示意——我们只关心它'从谁家搬到谁家'（转移方向），它真实的样子（电子云）cm20 再讲。" },
                { type: "trap", text: "⚠ 别搞混：'得氧 = 氧化'无条件——那是初中版看现象；高中电子转移版看本质，方向一反全错。" }
              ],
              point: "记住'升失氧、降得还'，再记住它是'电子搬家'的四个名字：价升了，电子丢了，被氧化了，它就是还原剂。"
            }
          ]
        },
        {
          id: "cm12.2.2",
          title: "氧化还原反应（下）",
          prereq: "cm12.2.1 氧化还原反应（上）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm12.2.2-p1",
              kind: "interact",
              title: "电子守恒配平",
              exploreTip: "调系数配平：注意第二行——得失电子也要相等。",
              widgets: [
                {
                  type: "equation-balance",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "H₂", atoms: { H: 2 } },
                        { formula: "CuO", atoms: { Cu: 1, O: 1 } }
                      ],
                      products: [
                        { formula: "Cu", atoms: { Cu: 1 } },
                        { formula: "H₂O", atoms: { H: 2, O: 1 } }
                      ],
                      conditions: "加热",
                      reversible: false
                    },
                    coeffInit: [1, 1, 1, 1],
                    coeffMax: 9,
                    trapSubscript: true,
                    trapText: "⚠ 这是身份证号，不能改！下标是物质的'身份证号'——把 H₂O 改成 H₂O₂，它就变成双氧水，不再是水了。配平只能调系数（加'人数'），绝不改下标。",
                    answer: [1, 1, 1, 1],
                    mode: "redox",
                    redox: { lose: { sp: "H₂", per: 2 }, gain: { sp: "CuO", per: 2 } },
                    showWeigh: true,
                    relMass: { H: 1, O: 16, Cu: 64 }
                  }
                }
              ],
              point: "氧化还原配平：原子守恒 + 电子守恒，两行全 ✓ 才算配好。"
            },
            {
              id: "cm12.2.2-p2",
              kind: "interact",
              title: "再战一道：C 还原 CuO",
              exploreTip: "C 一个原子交 4 个电子，CuO 一个式量收 2 个——系数怎么配？",
              widgets: [
                {
                  type: "equation-balance",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "CuO", atoms: { Cu: 1, O: 1 } },
                        { formula: "C", atoms: { C: 1 } }
                      ],
                      products: [
                        { formula: "Cu", atoms: { Cu: 1 } },
                        { formula: "CO₂", atoms: { C: 1, O: 2 } }
                      ],
                      conditions: "高温",
                      reversible: false
                    },
                    coeffInit: [1, 1, 1, 1],
                    coeffMax: 9,
                    trapSubscript: true,
                    trapText: "⚠ 这是身份证号，不能改！下标是物质的'身份证号'——把 CO 改成 CO₂，它就从一氧化碳变成了二氧化碳。配平只能调系数，绝不改下标。",
                    answer: [2, 1, 2, 1],
                    mode: "redox",
                    redox: { lose: { sp: "C", per: 4 }, gain: { sp: "CuO", per: 2 } },
                    showWeigh: true,
                    relMass: { C: 12, O: 16, Cu: 64 }
                  }
                }
              ],
              point: "电子守恒优先：先算得失电子数，再定系数——配平看的是电子账。"
            },
            {
              id: "cm12.2.2-p3",
              kind: "explain",
              title: "双线桥",
              blocks: [
                { type: "lead", text: "配平会了，画法也要规范：双线桥的箭头，方向画反就是电子倒流。" },
                { type: "text", html: "双线桥：箭头从失电子元素指向得电子元素，线上注明'失 2e⁻''得 2e⁻'。H₂ + CuO ＝加热＝ Cu + H₂O：H 指向 Cu 的箭头标'失 2e⁻'，Cu 承接的箭头标'得 2e⁻'。单线桥只画一条总箭头，标总电子数。" },
                { type: "text", html: "氧化性、还原性强弱入门：氧化剂的氧化性 > 氧化产物的氧化性；还原剂的还原性 > 还原产物的还原性。本例：氧化性 CuO > H₂O，还原性 H₂ > Cu。" },
                { type: "trap", text: "⚠ 别搞混：双线桥箭头从失电子元素指向得电子元素——画反了就是电子倒流。配平只看原子不看电子？电子守恒优先！" }
              ],
              point: "双线桥：起点失电子，终点得电子——箭头方向就是电子流向。"
            }
          ]
        },
        {
          id: "cm12.2.3",
          title: "本章小结与习题",
          prereq: "cm12.2.2 氧化还原反应（下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm12.2.3-p1",
              kind: "quiz",
              title: "小结：分类 · 离子 · 氧化还原",
              questions: [
                {
                  type: "review",
                  html: "本章小结：① 分类先问标准——分散系按粒子直径分溶液（<1nm）/胶体（1–100nm）/浊液（>100nm），丁达尔效应是胶体的身份证。② 电解质是化合物，水溶液或熔融态导电。③ 离子方程式四步：写、拆（四留三拆）、删、查（原子+电荷双守恒）。④ 氧化还原：升失氧、降得还，电子守恒配平。"
                },
                {
                  type: "choice",
                  stem: "下列物质中，属于电解质的是（  ）",
                  options: ["铜", "蔗糖", "熔融的 NaCl", "酒精"],
                  answer: 2,
                  tip: "电解质是化合物：铜是单质，蔗糖、酒精是非电解质；熔融 NaCl 能导电，是电解质。"
                },
                {
                  type: "choice",
                  stem: "Ba(OH)₂ + H₂SO₄ 的离子方程式中，写化学式的是（  ）",
                  options: ["Ba²⁺", "SO₄²⁻", "BaSO₄", "H⁺"],
                  answer: 2,
                  tip: "四留三拆：BaSO₄ 是沉淀，留化学式；Ba(OH)₂、H₂SO₄ 是强碱、强酸，拆成离子。"
                },
                {
                  type: "fill",
                  stemBefore: "H₂ + CuO ＝加热＝ Cu + H₂O 中，做还原剂的是",
                  stemAfter: "。",
                  answer: "H₂",
                  accept: ["H2", "氢气"],
                  hint: "化合价升高的做还原剂",
                  tip: "H：0 → +1，升高，失电子，被氧化，做还原剂。"
                }
              ],
              point: "分类、离子、氧化还原——高中化学的两大新语言，你已经会说了。"
            },
            {
              id: "cm12.2.3-p2",
              kind: "quiz",
              title: "综合：生活 + 定量",
              questions: [
                {
                  type: "choice",
                  stem: "食品包装里常放一小包铁粉（'脱氧剂'），原理是（  ）",
                  options: ["铁粉与氧气发生氧化还原反应，吸收包装里的 O₂", "铁粉吸水，保持干燥", "铁粉杀菌", "铁粉增重，防拆"],
                  answer: 0,
                  tip: "生活中的化学：铁粉利用还原性（Fe 失电子被氧化）吸收 O₂，防止食品氧化变质。"
                },
                {
                  type: "choice",
                  stem: "H₂ + CuO ＝加热＝ Cu + H₂O 中，化合价降低的元素是（  ）",
                  options: ["H", "Cu", "O", "都不降低"],
                  answer: 1,
                  tip: "Cu：+2 → 0，降低，得电子，被还原；做氧化剂的是 CuO。"
                },
                {
                  type: "fill",
                  stemBefore: "8g CuO 与足量 H₂ 完全反应，转移电子的物质的量是",
                  stemAfter: " mol。",
                  answer: "0.2 mol",
                  accept: ["0.2mol", "0.2"],
                  hint: "先算 CuO 的物质的量（M=80g/mol）",
                  tip: "n(CuO)＝8/80＝0.1 mol；每个 CuO 得 2e⁻，共转移 0.2 mol 电子。"
                }
              ],
              point: "定量题自查：方程式配平了吗？代入的是纯量吗？单位写对了吗？"
            }
          ]
        }
      ]
    }
  ]
};
