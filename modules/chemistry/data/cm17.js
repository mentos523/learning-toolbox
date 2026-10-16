/* ============================================================
 * 学习工具箱 · 化学 · 第十七章数据（蓝队 2026-10-15，阶段三批4）
 * 有机化学入门（必修二第四章直观版）· 6 课 / 16 页
 *
 * 数据格式：schema v1.0 冻结（见 data/cm05.js 文件头）。
 * 组件类型名冻结（docs/chemistry-interactions.md）：
 *   molecule-build(C2) / reaction-particle(C7) / tri-rep(Y6) /
 *   side-compare(Y11复用物理Y5) / safety-badge(Y2)
 * 落点：T8（cm17.1.2 分子式是原料清单）、T10（cm17.1.1 压缩包/有损压缩）、
 *       跃升12 同分异构（cm21.1.1 回填）。
 * window.CHEM_CH["cm17"] = { id, units[] }（注册由引擎 index.html script 标签完成）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm17"] = {
  id: "cm17",
  units: [
    {
      id: "cm17.1",
      title: "烃",
      lessons: [
        {
          id: "cm17.1.1",
          title: "有机物概述",
          prereq: "cm14.3.2 共价键与分子",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm17.1.1-p1",
              kind: "explain",
              title: "有机物的身份证：含碳",
              blocks: [
                { type: "lead", text: "塑料、酒精、汽油、涤纶——共同点：含碳。含碳的化合物叫有机物。" },
                { type: "text", html: "有机物 = 含碳化合物（CO、CO₂、碳酸盐等少数除外）。只含 C、H 的叫烃（如 CH₄）；烃的氢被取代，就成了烃的衍生物（如 C₂H₅OH）。" },
                { type: "text", html: "碳最外层 4 个电子，形成 4 个共价键，还能碳碳相连成链、成环。CH₄ 中 4 个 H 排成正四面体，键角 109.5°。" },
                { type: "text", html: "符号是三重表征的“压缩包”，是“有损压缩”：解压能拿回种类和数量，拿不回形状——CH₄ 到底是正四面体还是平面正方形？符号里看不出来，得去翻微观那一重。" },
                { type: "trap", text: "⚠ 别搞混：有机物不都“来自生物”；CH₄ 不是平面正方形，是正四面体！" },
                { type: "slogan", text: "结构决定性质，官能团决定性质" }
              ],
              point: "有机物=含碳化合物；碳四价；甲烷正四面体。下一页：亲手拼出 CH₄。"
            },
            {
              id: "cm17.1.1-p2",
              kind: "interact",
              title: "拼出甲烷：四个 H 完全等价",
              exploreTip: "拖 1 个 C、4 个 H 到画布拼出甲烷：注意 109.5° 正四面体提示。",
              widgets: [
                {
                  type: "molecule-build",
                  params: {
                    target: { formula: "CH₄", atoms: { C: 1, H: 4 }, bonds: [["C", "H"], ["C", "H"], ["C", "H"], ["C", "H"]] },
                    mode: "target",
                    tray: [
                      { element: "C", count: 1, maxBonds: 4 },
                      { element: "H", count: 4, maxBonds: 1 }
                    ],
                    showTetraHint: true
                  }
                }
              ],
              point: "四个 H 地位完全相同——这就是甲烷只有一种一氯代物的原因。（边界：离子化合物如 NaCl 没有分子，不拼——这里拼的都是共价分子。）"
            },
            {
              id: "cm17.1.1-p3",
              kind: "quiz",
              title: "练一练：碳的四只手",
              questions: [
                {
                  type: "choice",
                  stem: "甲烷分子中，四个氢原子的关系是？",
                  options: ["完全等价", "有两个比较特殊", "排成平面正方形"],
                  answer: 0,
                  tip: "正四面体：四个 H 地位完全相同，键角 109.5°。"
                },
                {
                  type: "choice",
                  stem: "下列属于有机物的是？",
                  options: ["CO₂", "CH₄", "Na₂CO₃"],
                  answer: 1,
                  tip: "CO₂、碳酸盐等少数含碳化合物不算有机物。"
                },
                {
                  type: "fill",
                  stemBefore: "碳原子能形成",
                  stemAfter: "个共价键。",
                  answer: "4",
                  accept: ["四"],
                  hint: "看最外层电子数",
                  tip: "碳四价：四只“手”，能连成链、成环。"
                }
              ],
              point: "碳四价 + 正四面体：有机化学的地基打好了。"
            }
          ]
        },
        {
          id: "cm17.1.2",
          title: "烷烃",
          prereq: "cm17.1.1 有机物概述",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm17.1.2-p1",
              kind: "explain",
              title: "同分异构：清单一样，拼法不同",
              blocks: [
                { type: "lead", text: "C₄H₁₀ 两种拼法：正丁烷（一条线）vs 异丁烷（分叉）。清单一样，拼法不同，沸点 −0.5℃ vs −11.7℃。" },
                { type: "text", html: "分子式相同、结构不同，互称同分异构体。记住这句：分子式是“原料清单”，结构是“拼装图纸”——清单一样，拼法不同，脾气就不同。" },
                { type: "text", html: "同分异构体只差在“拼法”：碳骨架的连接顺序不同，性质就不同。丁烷的两种拼法只是开始——碳越多，拼法越多。" }
              ],
              point: "分子式是原料清单，结构是拼装图纸。下一页：亲手拼出两种丁烷。"
            },
            {
              id: "cm17.1.2-p2",
              kind: "interact",
              title: "拼出两种丁烷",
              exploreTip: "用 4 个 C、10 个 H 拼两种碳骨架：一条线 vs 三个排线一个分叉。",
              widgets: [
                {
                  type: "molecule-build",
                  params: {
                    mode: "free",
                    tray: [
                      { element: "C", count: 4, maxBonds: 4 },
                      { element: "H", count: 10, maxBonds: 1 }
                    ]
                  }
                }
              ],
              point: "拼法不同，沸点不同——这就是“结构决定性质”的第一课。（边界：离子化合物没有分子，不拼——这里拼的都是共价分子。）"
            },
            {
              id: "cm17.1.2-p3",
              kind: "explain",
              title: "同系物与通式",
              blocks: [
                { type: "lead", text: "甲烷 CH₄、乙烷 C₂H₆、丙烷 C₃H₈、丁烷 C₄H₁₀……像一串兄弟，一个比一个多一块。" },
                { type: "text", html: "相差一个 CH₂ 的一串物质叫同系物。每多一个 CH₂，就多一个成员——像台阶，一级一级往上，性质也跟着一级一级变。" },
                { type: "text", html: "烷烃通式 CₙH₂ₙ₊₂：n 是碳的个数。n=1 是甲烷 CH₄，n=2 是乙烷 C₂H₆，n=4 是丁烷 C₄H₁₀。知道 n，就知道分子式——通式是“配方”。" },
                { type: "text", html: "命名：先数碳（甲乙丙丁），再看分叉——完整的系统命名规则，cm21.1.2 会系统讲，这里先认“姓”就行。" },
                { type: "mathlink", text: "预告：代数 ch09 数列——CₙH₂ₙ₊₂ 就是数列通项。" }
              ],
              point: "同系物：差一个 CH₂ 的一串兄弟；通式 CₙH₂ₙ₊₂ 是配方。下一页：烷烃的招牌反应。"
            },
            {
              id: "cm17.1.2-p4",
              kind: "explain",
              title: "取代反应：换下一个 H",
              blocks: [
                { type: "lead", text: "甲烷的四个 H 排得整整齐齐——Cl₂ 来了，一个 H 被“换”了下来。" },
                { type: "text", html: "取代反应：CH₄ + Cl₂ ＝光照＝ CH₃Cl + HCl。一个 H 被 Cl“换”下来，H 和 Cl 各找新伙伴——“换”，是取代的灵魂。" },
                { type: "text", html: "条件是光照：没有光，甲烷和氯气混在一起也相安无事——条件是反应的“开关”，写方程式时标在等号上方。" },
                { type: "trap", text: "⚠ 别搞混：取代 ≠ 置换！取代是“换”（有机）；置换是单质+化合物→单质+化合物（无机）。" }
              ],
              point: "取代 = 换一个 H；光照是开关。下一页：练一练。"
            },
            {
              id: "cm17.1.2-p5",
              kind: "quiz",
              title: "练一练：拼法决定脾气",
              questions: [
                {
                  type: "choice",
                  stem: "正丁烷与异丁烷的关系是？",
                  options: ["同系物", "同分异构体", "同一种物质"],
                  answer: 1,
                  tip: "分子式都是 C₄H₁₀，结构不同——同分异构体。"
                },
                {
                  type: "choice",
                  stem: "CH₄ + Cl₂ ＝光照＝ CH₃Cl + HCl 属于？",
                  options: ["置换反应", "取代反应", "加成反应"],
                  answer: 1,
                  tip: "有机“取代”：H 被 Cl 换下来；置换反应是无机概念。"
                },
                {
                  type: "fill",
                  stemBefore: "丁烷的分子式是",
                  stemAfter: "。",
                  answer: "C₄H₁₀",
                  accept: ["C4H10"],
                  hint: "通式 CₙH₂ₙ₊₂，n=4",
                  tip: "烷烃通式 CₙH₂ₙ₊₂：n=4 时 C₄H₁₀。"
                }
              ],
              point: "同分异构：清单一样，拼法不同——cm21.1.1 会讲透三类型。"
            }
          ]
        },
        {
          id: "cm17.1.3",
          title: "烯烃",
          prereq: "cm17.1.2 烷烃",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm17.1.3-p1",
              kind: "explain",
              title: "双键：乙烯的“两只手”",
              blocks: [
                { type: "lead", text: "乙烯 C₂H₄：两个碳之间是双键 C=C，六个原子排成一个平面。双键里有一根“松”——容易打开一个，这就是烯烃活泼的原因。" },
                { type: "text", html: "加成反应：双键打开一个，“空出的手”拉住新伙伴。CH₂=CH₂ + Br₂ = CH₂BrCH₂Br（溴水褪色）；CH₂=CH₂ + H₂ ＝催化剂＝ CH₃CH₃；CH₂=CH₂ + HCl = CH₃CH₂Cl。" },
                { type: "text", html: "加聚反应：n 个乙烯的双键逐个打开，手拉手连成一条长链——聚乙烯。乙烯是小分子，聚乙烯是高分子。" },
                { type: "trap", text: "⚠ 别搞混：乙烯使溴水褪色是加成反应（双键加了 Br₂），不是萃取；加聚产物是聚乙烯（高分子），不是“很多乙烯”。" }
              ],
              point: "双键打开一个叫加成，很多双键连起来叫加聚。下一页看微观动画。"
            },
            {
              id: "cm17.1.3-p2",
              kind: "interact",
              title: "看：双键打开一个",
              exploreTip: "按 ▶ 看乙烯与 Br₂ 的加成：盯住 C=C 双键的变化。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "CH₂=CH₂ + Br₂ = CH₂BrCH₂Br" },
                    particles: [
                      { id: "c2h4", kind: "molecule", label: "C₂H₄", charge: null, role: "reactant", count: 1 },
                      { id: "br2", kind: "molecule", label: "Br₂", charge: null, role: "reactant", count: 1 },
                      { id: "p", kind: "molecule", label: "C₂H₄Br₂", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "乙烯的 C=C 双键“打开”一个：两个 C 各空出一只“手”", moves: [] },
                      { caption: "Br₂ 的 Br–Br 键断开：两个 Br 原子各伸出一只“手”", moves: [] },
                      { caption: "C–Br 键形成：CH₂BrCH₂Br（1,2-二溴乙烷）", form: [{ ids: ["c2h4", "br2"], label: "C₂H₄Br₂" }] }
                    ],
                    counter: true,
                    spectatorFade: true,
                    slowmo: true
                  }
                }
              ],
              point: "双键变单键，两个 Br 各就各位——加成就是“打开+拉手”。"
            },
            {
              id: "cm17.1.3-p3",
              kind: "quiz",
              title: "练一练：双键的脾气",
              questions: [
                {
                  type: "choice",
                  stem: "乙烯使溴水褪色的原因是？",
                  options: ["萃取", "加成反应", "乙烯有漂白性"],
                  answer: 1,
                  tip: "C=C 双键与 Br₂ 加成，不是萃取。"
                },
                {
                  type: "choice",
                  stem: "聚乙烯与乙烯的关系是？",
                  options: ["同一种物质", "聚乙烯是乙烯加聚而成的高分子", "同分异构体"],
                  answer: 1,
                  tip: "nCH₂=CH₂ → 聚乙烯：小分子连成高分子。"
                },
                {
                  type: "fill",
                  stemBefore: "乙烯与氢气加成的产物是",
                  stemAfter: "。",
                  answer: "乙烷",
                  accept: ["CH₃CH₃", "C₂H₆"],
                  hint: "CH₂=CH₂ + H₂ ＝ ?",
                  tip: "双键打开，加两个 H：CH₂=CH₂ + H₂ = CH₃CH₃。"
                }
              ],
              point: "加成是双键的招牌动作——打开一个，拉住两个。"
            }
          ]
        },
        {
          id: "cm17.1.4",
          title: "苯",
          prereq: "cm17.1.3 烯烃",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm17.1.4-p1",
              kind: "explain",
              title: "苯：特殊的六元环",
              blocks: [
                { type: "lead", text: "苯 C₆H₆：六个碳排成平面六元环。按说三个双键该很活泼，可苯偏偏不与溴水加成——它的键很特殊。" },
                { type: "text", html: "苯环上 6 个碳的 p 电子形成“大π键”：六个键完全等同，介于单键和双键之间。所以苯不能使溴水褪色（加溴水只是萃取、分层）；但能发生取代：溴代（FeBr₃）、硝化（浓硫酸）。" },
                { type: "text", html: "苯的性质：取代 C₆H₆ + Br₂ ＝FeBr₃＝ C₆H₅Br + HBr；C₆H₆ + HNO₃ ＝浓硫酸＝ C₆H₅NO₂ + H₂O；加成 C₆H₆ + 3H₂ ＝Ni,加热＝ C₆H₁₂（环己烷）。" },
                { type: "trap", text: "⚠ 别搞混：苯环里没有真正的碳碳双键！“苯使溴水褪色所以有双键”是错的——那是萃取分层，溴被萃取到了苯层。" }
              ],
              point: "大π键：六个键完全等同。下一页三重表征一次看清。"
            },
            {
              id: "cm17.1.4-p2",
              kind: "interact",
              title: "三重表征看苯",
              exploreTip: "点“宏观/微观/符号”三个标签：同一件事，三种讲法。",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "苯：六个碳“手拉手”的特殊环",
                    views: {
                      macro: { text: "把苯加入溴水：不褪色，只是分层——溴被萃取到了苯层" },
                      micro: { text: "此处为文字描述：六个碳排成平面六元环，6 个 p 电子形成大π键，六个键完全等同——\"电子离域\"的真实图像超出本课范围，记住\"六个键一样\"这个结论即可。" },
                      symbol: { mathml: "C₆H₆", gloss: "宏观读“苯”；微观读“六个碳氢单元排成环，键介于单双键之间”" }
                    },
                    defaultView: "macro",
                    badgeText: { macro: "现在看：宏观现象", micro: "现在看：微观粒子", symbol: "现在看：符号表达" }
                  }
                }
              ],
              point: "宏观分层、微观大π键、符号 C₆H₆——三重对得上，才算真懂。"
            }
          ]
        }
      ]
    },
    {
      id: "cm17.2",
      title: "烃的衍生物入门",
      lessons: [
        {
          id: "cm17.2.1",
          title: "乙醇与乙酸",
          prereq: "cm17.1.4 苯",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm17.2.1-p1",
              kind: "explain",
              title: "官能团决定性质",
              blocks: [
                { type: "lead", text: "乙醇 C₂H₅OH 能与 Na 反应、能催化氧化；乙酸 CH₃COOH 能发生酯化。性质不同，因为官能团不同：–OH（羟基）、–COOH（羧基）。" },
                { type: "text", html: "乙醇（–OH）：与 Na 放 H₂：2CH₃CH₂OH + 2Na = 2CH₃CH₂ONa + H₂↑；催化氧化成乙醛：2CH₃CH₂OH + O₂ ＝Cu,加热＝ 2CH₃CHO + 2H₂O。–OH ≠ OH⁻：乙醇不显碱性！" },
                { type: "text", html: "乙酸（–COOH，弱酸）：酯化 CH₃COOH + C₂H₅OH ⇌浓硫酸,加热⇌ CH₃COOC₂H₅ + H₂O（可逆！）。饱和 Na₂CO₃ 吸收：溶乙醇、除乙酸、降酯溶解度。" },
                { type: "trap", text: "⚠ 别搞混：–OH（羟基）≠ OH⁻（氢氧根）；酯化：浓硫酸催化、加热、可逆，条件一个不能少！" }
              ],
              point: "官能团决定性质：–OH vs –COOH。下一页看酯化反应的微观过程。"
            },
            {
              id: "cm17.2.1-p2",
              kind: "interact",
              title: "酯化：找到脱去的水",
              exploreTip: "按 ▶ 看酯化反应：找到“脱去的水”从哪来，再看顶部安全徽章。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O" },
                    particles: [
                      { id: "aa", kind: "molecule", label: "CH₃COOH", charge: null, role: "reactant", count: 1 },
                      { id: "et", kind: "molecule", label: "C₂H₅OH", charge: null, role: "reactant", count: 1 },
                      { id: "es", kind: "molecule", label: "CH₃COOC₂H₅", charge: null, role: "product", count: 1 },
                      { id: "w", kind: "molecule", label: "H₂O", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "浓硫酸催化、加热：羧基上的 –OH 与羟基上的 H“看对眼”", moves: [] },
                      { caption: "脱去一分子水：CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O", form: [{ ids: ["aa", "et"], label: "CH₃COOC₂H₅" }] },
                      { caption: "这是可逆反应：产物里加水，反应会往回走——⇌ 别写成 ＝", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: true,
                    slowmo: true
                  }
                },
                {
                  type: "safety-badge",
                  params: {
                    level: "danger",
                    text: "浓硫酸有强腐蚀性：虚拟实验可重复试错",
                    realityNote: "虚拟实验可重复试错；现实中浓硫酸必须在老师指导下使用，沾到皮肤先干布拭去再大量水冲"
                  }
                }
              ],
              point: "羧基脱 –OH、羟基脱 H——“酸脱羟基醇脱氢”，可逆别忘。"
            },
            {
              id: "cm17.2.1-p3",
              kind: "quiz",
              title: "练一练：官能团的脾气",
              questions: [
                {
                  type: "choice",
                  stem: "乙醇中的 –OH 与 OH⁻ 的关系是？",
                  options: ["同一种粒子", "–OH 是羟基（中性），OH⁻ 是氢氧根（带电），完全不同", "乙醇显碱性"],
                  answer: 1,
                  tip: "–OH ≠ OH⁻：乙醇不显碱性。"
                },
                {
                  type: "choice",
                  stem: "酯化反应 CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O 的特点是？",
                  options: ["不可逆", "浓硫酸催化、加热、可逆", "不需要任何条件"],
                  answer: 1,
                  tip: "酯化：浓硫酸催化、加热、可逆——条件一个不能少。"
                },
                {
                  type: "fill",
                  stemBefore: "酯化反应中，脱去的水是由羧基的",
                  stemAfter: "和羟基的氢结合而成。",
                  answer: "羟基",
                  accept: ["–OH", "OH"],
                  hint: "酸脱羟基醇脱氢",
                  tip: "酸脱羟基（–OH）、醇脱氢（H）——口诀“酸脱羟基醇脱氢”。"
                }
              ],
              point: "–OH ≠ OH⁻；酯化可逆——官能团决定性质，一次记牢。"
            }
          ]
        },
        {
          id: "cm17.2.2",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm17.2.2-p1",
              kind: "explain",
              title: "本章小结：有机入门四件事",
              blocks: [
                { type: "text", html: "① 碳四价：甲烷正四面体（109.5°）。② 同分异构：分子式是原料清单，结构是拼装图纸（C₄H₁₀ 两种）。③ 官能团决定性质：C=C（加成/加聚）、–OH、–COOH。④ 四种反应：取代（CH₄+Cl₂）、加成（乙烯+Br₂）、加聚（→聚乙烯）、酯化（可逆）。" },
                { type: "text", html: "符号是三重表征的“压缩包”（有损压缩）：看到 C₂H₆O，先问“哪种拼法”——乙醇还是二甲醚？cm21 会讲透同分异构三类型。" }
              ],
              point: "一把钥匙：结构决定性质，官能团决定性质。下一页：本章习题。"
            },
            {
              id: "cm17.2.2-p2",
              kind: "quiz",
              title: "本章习题",
              questions: [
                {
                  type: "choice",
                  stem: "下列互为同分异构体的是？",
                  options: ["CH₄ 和 C₂H₆", "正丁烷和异丁烷", "乙醇和乙酸"],
                  answer: 1,
                  tip: "C₄H₁₀ 的两种拼法：分子式相同、结构不同。"
                },
                {
                  type: "choice",
                  stem: "甲烷与氯气在光照下反应属于？",
                  options: ["置换反应", "取代反应", "加成反应"],
                  answer: 1,
                  tip: "有机取代 ≠ 无机置换。"
                },
                {
                  type: "fill",
                  stemBefore: "相对分子质量为 58 的烷烃，分子式为",
                  stemAfter: "。",
                  answer: "C₄H₁₀",
                  accept: ["C4H10"],
                  hint: "14n+2=58",
                  tip: "烷烃通式 CₙH₂ₙ₊₂：14n+2=58，n=4。"
                },
                {
                  type: "choice",
                  stem: "苯加入溴水中，现象是？",
                  options: ["溴水褪色（加成）", "分层，溴被萃取到苯层", "无任何现象"],
                  answer: 1,
                  tip: "苯不与溴水加成——是萃取分层。"
                },
                {
                  type: "choice",
                  stem: "下列生活现象与加聚反应有关的是？",
                  options: ["食醋除水垢", "塑料脸盆的聚乙烯", "铁锅生锈"],
                  answer: 1,
                  tip: "聚乙烯 = 乙烯加聚而成的高分子。"
                },
                {
                  type: "review",
                  html: "本章自查：□ 碳四价能默写甲烷结构吗？□ 同分异构三句话？□ 四种反应类型各举一例？□ –OH ≠ OH⁻？"
                }
              ],
              point: "有机入门收官：cm21 见——同分异构三类型、系统命名、合成路线。"
            }
          ]
        }
      ]
    }
  ]
};
