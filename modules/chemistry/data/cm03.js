/* ============================================================
 * 学习工具箱 · 化学 · 第三章数据（蓝队 2026-10-15，阶段三·批1）
 *
 * schema 冻结版 v1.0（见 data/cm05.js 文件头）。本章组件：
 * C1 particle-view（cm03.1.1 分子运动/三态）；
 * Y6 tri-rep（cm03.1.1 品红扩散三重表征）；
 * C7 reaction-particle（cm03.1.2 水电解“分子破裂、原子重组”；
 *   cm03.2.3 NaCl 形成电子转移，reaction.eTransfer:true，箭头从失电子
 *   元素指向得电子元素，CHEM-R54）；
 * C4 periodic-explore（cm03.2.1/cm03.2.2，range [1,20] 初中版）。
 * 跃升 1（宏观→微观）+ 跃升 3（元素 vs 原子）+ 红线辨析④立靶。
 * T1/T2 边界句上 cm03.2.2 讲解页正文（原样）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm03"] = {
  id: "cm03",
  units: [
    {
      id: "cm03.1",
      title: "分子与原子",
      lessons: [
        {
          id: "cm03.1.1",
          title: "分子与原子（上）",
          prereq: "cm02 氧气",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm03.1.1-p1",
              kind: "interact",
              title: "加热水：分子越跑越快",
              exploreTip: "从 20℃ 长按加热到 100℃：看粒子越跑越快，徽章跳成气态。",
              widgets: [
                {
                  type: "particle-view",
                  params: {
                    substance: { name: "水", meltC: 0, boilC: 100 },
                    temp: { min: -20, max: 120, step: 5, init: 20, unit: "℃" },
                    particleCount: 120,
                    stateMode: "auto",
                    heatButtons: true,
                    showScaleNote: true
                  }
                }
              ],
              point: "示意：粒子大小、数量、运动速度均为示意，未按真实比例——温度越高，分子运动越剧烈。"
            },
            {
              id: "cm03.1.1-p2",
              kind: "interact",
              title: "品红扩散：谁推的它",
              exploreTip: "点三个页签：红色自己散开了——谁推的它？",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "品红扩散：红色自己散开了",
                    views: {
                      macro: { text: "一滴品红滴进清水，红色自己慢慢散开，最后整杯水都红了——没人搅拌。" },
                      micro: { text: "品红分子和水分子都在永不停息地运动，互相碰撞、散开（示意）。热水里散得更快——温度越高，分子运动越剧烈。", anim: "ref:particle-view" },
                      symbol: {
                        mathml: "<math><mtext>（无化学反应，不写方程式——这是物理变化）</mtext></math>",
                        gloss: "符号这一重是空的：没有新物质生成，所以没有化学方程式可写——这正说明扩散是物理变化（红线辨析③预告）。"
                      }
                    },
                    defaultView: "macro",
                    badgeText: {
                      macro: "现在看：宏观现象",
                      micro: "现在看：微观粒子",
                      symbol: "现在看：符号表达"
                    }
                  }
                }
              ],
              point: "看不见的粒子，干着看得见的事——品红是被分子“推”开的。"
            },
            {
              id: "cm03.1.1-p3",
              kind: "explain",
              title: "分子三性：动、隔、小",
              blocks: [
                { type: "lead", text: "分子有三个脾气，记住了，化学世界就有了“常识”." },
                { type: "text", html: "分子三性：<b>动</b>——永不停息地运动（温度越高越剧烈）；<b>隔</b>——分子之间有间隔（热胀冷缩、气体易压缩）；<b>小</b>——质量和体积都很小（一个水分子约 10⁻¹⁰ m，肉眼看不见）。" },
                { type: "text", html: "分子是<b>保持物质化学性质的最小粒子</b>：水还是水，全靠 H₂O 分子没变。" },
                { type: "trap", text: "⚠ “分子静止不动”是错觉：分子永不停息地运动——品红在热水里散得更快就是证据；“分子看得见”也是错觉：扫描隧道显微镜是间接成像，是模型。" },
                { type: "physicslink", text: "物理呼应·奠基：物理 p03.2.1 布朗运动——花粉粒在水里被看不见的水分子撞得不停乱走，物理模块已建模演示（点击可跳转查看）。它和品红扩散是一个道理：分子永不停息地做无规则运动，温度越高越剧烈。" },
                { type: "slogan", text: "分子三性：动、隔、小。" },
                { type: "mathlink", text: "直观版（数量级）：10⁻¹⁰ m 是什么概念？一根头发丝里能排几百万个水分子——先感受“小”。" }
              ],
              point: "从今天起两双眼睛：一双看现象（宏观），一双看粒子（微观）。"
            }
          ]
        },
        {
          id: "cm03.1.2",
          title: "分子与原子（下）",
          prereq: "cm03.1.1 分子与原子（上）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm03.1.2-p1",
              kind: "interact",
              title: "水电解：分子“散架”了",
              exploreTip: "慢放看：H₂O 分子破裂→H、O 原子→重组为 H₂、O₂。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: {
                      equation: "<math><mrow><mn>2</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi></mrow><mover><mo>=</mo><mtext>通电</mtext></mover><mrow><mn>2</mn><msub><mi>H</mi><mn>2</mn></msub><mo>↑</mo><mo>+</mo><msub><mi>O</mi><mn>2</mn></msub><mo>↑</mo></mrow></math>",
                      equationText: "2H₂O ＝通电＝ 2H₂↑ + O₂↑"
                    },
                    particles: [
                      { id: "w1", kind: "molecule", label: "H₂O", charge: null, role: "reactant", count: 2 },
                      { id: "h1", kind: "atom", label: "H", charge: null, role: "product", count: 4 },
                      { id: "o1", kind: "atom", label: "O", charge: null, role: "product", count: 2 }
                      /* S-8a 裁决（2026-10-15）：删 h2m/o2m 产物分子双列（同 cm01.1.1，同因）。 */
                    ],
                    keyframes: [
                      { caption: "通电：H₂O 分子“散架”——分子破裂成 H 原子和 O 原子（示意）。", moves: [{ id: "w1", from: [30, 50], to: [45, 50] }] },
                      { caption: "H 原子两两结合成 H₂，O 原子两两结合成 O₂——原子重新组合成新分子。", form: [{ ids: ["h1"], label: "H₂" }, { ids: ["o1"], label: "O₂" }], fade: [] },
                      { caption: "分子可分，原子不可分——化学变化中，分子破裂、原子重组。", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true
                  }
                }
              ],
              point: "示意：粒子大小、数量、运动速度均为示意，未按真实比例——分子破裂、原子重组，8 个字刻进脑子。"
            },
            {
              id: "cm03.1.2-p2",
              kind: "quiz",
              title: "数一数：原子三不变",
              questions: [
                {
                  type: "fill",
                  stemBefore: "2H₂O ＝通电＝ 2H₂↑ + O₂↑ 中，反应前 H 原子有",
                  stemAfter: "个，反应后 H 原子有",
                  answer: "4,4",
                  accept: ["4，4", "4个,4个", "4 个，4 个"],
                  hint: "看系数：2H₂O 里 H 有几个？2H₂ 里呢？",
                  tip: "反应前 2×2=4 个，反应后 2×2=4 个——原子个数不变。"
                },
                {
                  type: "choice",
                  stem: "化学变化中，一定不变的是？",
                  options: [
                    "分子的种类",
                    "原子的种类、数目和质量",
                    "物质的颜色和状态"
                  ],
                  answer: 1,
                  tip: "原子三不变：种类、数目、质量都不变——变的只是“队形”（分子种类）。"
                },
                {
                  type: "choice",
                  stem: "“化学变化中原子消失了”——对吗？",
                  options: ["对，原子变成了能量", "错，原子只是重新组合"],
                  answer: 1,
                  tip: "原子没生也没灭，只是重新组合——这就是质量守恒的微观原因。"
                }
              ],
              point: "数一数过关：原子种类、数目、质量都不变——变的只是队形。"
            },
            {
              id: "cm03.1.2-p3",
              kind: "explain",
              title: "原子：化学变化中的最小粒子",
              blocks: [
                { type: "lead", text: "分子会“散架”，那有没有“拆不散”的东西？有——原子。" },
                { type: "text", html: "<b>原子是化学变化中的最小粒子</b>：化学变化中，分子可分（破裂成原子），原子不可分（只能重新组合）。分子由原子构成：一个水分子由两个氢原子和一个氧原子构成。" },
                { type: "text", html: "化学变化的微观本质：<b>分子破裂、原子重组</b>。原子三不变：种类、数目、质量都不变——所以反应前后质量守恒（cm05.1.1 回看）。" },
                { type: "oldfriend", text: "（回看：cm01.1.1 红线辨析③——分子种类变没变是化学变化的判据，现在你知道“变”的是什么了。）" }
              ],
              point: "两句话背下来：分子是保持物质化学性质的最小粒子；原子是化学变化中的最小粒子。"
            }
          ]
        }
      ]
    },
    {
      id: "cm03.2",
      title: "原子的结构·元素·离子",
      lessons: [
        {
          id: "cm03.2.1",
          title: "原子的结构",
          prereq: "cm03.1.2 分子与原子（下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm03.2.1-p1",
              kind: "interact",
              title: "点开原子：质子数说了算",
              exploreTip: "点一个元素：看圈里数字（质子数）= 核外电子数。",
              widgets: [
                {
                  type: "periodic-explore",
                  params: {
                    range: [1, 20],
                    highlightMode: "none",
                    trendArrows: false,
                    showDetail: true
                  }
                }
              ],
              point: "圈里数字是质子数——质子数 = 核电荷数 = 核外电子数。"
            },
            {
              id: "cm03.2.1-p2",
              kind: "explain",
              title: "原子：小而“带电平衡”",
              blocks: [
                { type: "lead", text: "原子拆开看：中间一个核，外面几层电子——麻雀虽小，五脏俱全。" },
                { type: "text", html: "原子由<b>原子核</b>（质子 + 中子）和<b>核外电子</b>构成。<b>质子数 = 核电荷数 = 核外电子数</b>：质子带正电、电子带负电，数量相等、正负抵消——原子不带电。" },
                { type: "text", html: "<b>相对原子质量</b>：以一种碳原子（碳-12）质量的 1/12 为标准，其他原子的质量跟它比——比值，没有单位，是个“相对数”。" },
                { type: "trap", text: "⚠ “原子不带电所以内部没电荷”是错觉：正负电荷等量抵消才不带电；“中子数一定等于质子数”也是错觉：中子数可以不同（如氢有三种同位素，cm14 回填）——质子数才决定元素。" },
                { type: "mathlink", text: "直观版（正负数）：+6 和 −6 抵消得 0——质子与电子的“电荷账”就是正负数相加。" }
              ],
              point: "质子数 = 核电荷数 = 核外电子数——质子数一改，就是另一种元素。"
            },
            {
              id: "cm03.2.1-p3",
              kind: "quiz",
              title: "练一练：原子内部",
              questions: [
                {
                  type: "choice",
                  stem: "原子不带电的原因是？",
                  options: [
                    "原子内部没有电荷",
                    "质子数 = 核外电子数，正负电荷等量抵消",
                    "中子不带电"
                  ],
                  answer: 1,
                  tip: "质子带正电、电子带负电——数量相等，抵消了。"
                },
                {
                  type: "fill",
                  stemBefore: "氧原子质子数是 8，它的核外电子数是",
                  stemAfter: "。",
                  answer: "8",
                  accept: ["8个"],
                  hint: "质子数 = 核外电子数",
                  tip: "原子中：质子数 = 核电荷数 = 核外电子数 = 8。"
                },
                {
                  type: "choice",
                  stem: "相对原子质量的“相对”是指？",
                  options: [
                    "相对于氢原子质量",
                    "以碳-12 原子质量的 1/12 为标准去比",
                    "相对于电子质量"
                  ],
                  answer: 1,
                  tip: "标准：碳-12 原子质量的 1/12——是个比值，没有单位。"
                }
              ],
              point: "内部账算清：质子+中子在核里，电子在核外转——电荷账两清。"
            }
          ]
        },
        {
          id: "cm03.2.2",
          title: "元素",
          prereq: "cm03.2.1 原子的结构",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm03.2.2-p1",
              kind: "interact",
              title: "元素周期表：点开“姓氏”",
              exploreTip: "点一个元素：看“质子数相同的一类原子”是什么意思。",
              widgets: [
                {
                  type: "periodic-explore",
                  params: {
                    range: [1, 20],
                    highlightMode: "metal",
                    trendArrows: false,
                    showDetail: true
                  }
                }
              ],
              point: "元素是原子的“姓氏”：质子数相同的原子同“姓”，算同一元素。"
            },
            {
              id: "cm03.2.2-p2",
              kind: "quiz",
              title: "错句医院：组成 vs 构成",
              questions: [
                {
                  type: "choice",
                  stem: "“水由氢、氧原子组成”——这句话？",
                  options: ["正确", "错误：说“组成”要用元素"],
                  answer: 1,
                  tip: "说“组成”用元素：水由氢、氧两种元素组成——原子是微观的，不能“组成”宏观物质。"
                },
                {
                  type: "choice",
                  stem: "“一个水分子由两个氢原子和一个氧原子构成”——这句话？",
                  options: ["正确", "错误：说“构成”要用元素"],
                  answer: 0,
                  tip: "说“构成”用原子：微观粒子讲个数——两个氢原子、一个氧原子，构成一个水分子。"
                },
                {
                  type: "choice",
                  stem: "“水分子由氢、氧元素构成”——这句话？",
                  options: ["正确", "错误：元素讲种类不讲个数，不能“构成”分子"],
                  answer: 1,
                  tip: "元素是宏观概念，只讲种类不讲个数——串了就是错句。"
                }
              ],
              point: "错句医院出院标准：组成→元素，构成→原子——串了就是错句。"
            },
            {
              id: "cm03.2.2-p3",
              kind: "explain",
              title: "红线辨析④：元素 vs 原子",
              blocks: [
                { type: "lead", text: "全书最绕的一对词，今天一次分清——分不清，后面处处踩坑。" },
                { type: "text", html: "<b>元素</b>是原子的“姓氏”：<b>质子数相同的一类原子的总称</b>。质子数相同的原子同“姓”，算同一元素；质子数一改等于“改姓”，就是另一种元素。元素是宏观概念，只讲种类，不讲个数。" },
                { type: "text", html: "<b>原子</b>是微观粒子，讲种类也讲个数。固定句式卡：<b>“水由氢、氧两种元素组成”（宏观）vs “一个水分子由两个氢原子和一个氧原子构成”（微观）</b>。" },
                { type: "text", html: "元素符号书写规范：<b>一大二小</b>——第一个字母大写，第二个小写（Cl 不是 CL；Cu 不是 CU——CU 会被认成“碳 + 铀（C + U）”两种元素）。地壳中含量最多的元素是氧，人体中最多的是氧，空气中最多的是氮。" },
                { type: "slogan", text: "说“组成”用元素，说“构成”用原子。" }
              ],
              point: "红线辨析④立靶：元素是“哪一类”（宏观），原子是“哪一个/几个”（微观）。"
            }
          ]
        },
        {
          id: "cm03.2.3",
          title: "离子",
          prereq: "cm03.2.2 元素",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm03.2.3-p1",
              kind: "interact",
              title: "NaCl 的形成：电子“搬家”",
              exploreTip: "慢放看：电子从 Na 家搬到 Cl 家——箭头方向别看反。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: {
                      equationText: "Na − e⁻ → Na⁺（失电子）；Cl + e⁻ → Cl⁻（得电子）",
                      eTransfer: true,
                      arrow: { from: "Na", to: "Cl" }
                    },
                    particles: [
                      { id: "na1", kind: "atom", label: "Na", charge: null, role: "reactant", count: 1 },
                      { id: "cl1", kind: "atom", label: "Cl", charge: null, role: "reactant", count: 1 },
                      { id: "nap", kind: "ion", label: "Na", charge: "+1", role: "product", count: 1 },
                      { id: "clm", kind: "ion", label: "Cl", charge: "−1", role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "Na 失去 1 个电子变成 Na⁺——电子从 Na 家“搬”了出去（示意）。", moves: [{ id: "na1", from: [30, 50], to: [45, 50] }] },
                      { caption: "Cl 得到 1 个电子变成 Cl⁻——电子“搬”进了 Cl 家。箭头从失电子的 Na 指向得电子的 Cl。", moves: [{ id: "cl1", from: [70, 50], to: [55, 50] }] },
                      { caption: "Na⁺ 与 Cl⁻ 相互吸引结合成 NaCl——得失电子，电荷变、原子核不变。", form: [{ ids: ["nap", "clm"], label: "NaCl" }], fade: [] }
                    ],
                    counter: false,
                    spectatorFade: false,
                    slowmo: true
                  }
                }
              ],
              point: "示意：电子画成小点只为看清转移方向——得失电子，电荷变、核不变。"
            },
            {
              id: "cm03.2.3-p2",
              kind: "explain",
              title: "离子：带电的原子",
              blocks: [
                { type: "lead", text: "原子丢了电子或捡了电子，就变成了离子——“人”穿上了“盔甲”，脾气全变。" },
                { type: "text", html: "<b>离子</b>是带电的原子（或原子团）。阳离子：原子<b>失去</b>电子带正电（如 Na⁺）；阴离子：原子<b>得到</b>电子带负电（如 Cl⁻）。离子符号：电荷数在前、正负号在后（Mg²⁺，不是 Mg⁺²）。" },
                { type: "text", html: "NaCl 的形成：Na − e⁻ → Na⁺，Cl + e⁻ → Cl⁻。记住：<b>得失电子的是电子，变的是电荷，不变的是原子核</b>。" },
                { type: "trap", text: "⚠ “Na⁺ 是钠原子”是错觉：Na⁺ 是离子——得失电子后化学性质完全不同，就像“人”和“穿了盔甲的人”不是一回事。" },
                { type: "mathlink", text: "直观版（正负数）：失去电子带正电、得到电子带负电——“失正得负”，又是正负数的账。" }
              ],
              point: "离子 = 带电的原子：失电子成阳离子，得电子成阴离子——电荷数在前。"
            },
            {
              id: "cm03.2.3-p3",
              kind: "quiz",
              title: "练一练：离子符号",
              questions: [
                {
                  type: "choice",
                  stem: "Na⁺ 和钠原子（Na）的关系是？",
                  options: [
                    "同一种粒子，写法不同",
                    "Na⁺ 是离子，化学性质与 Na 完全不同",
                    "Na⁺ 是钠原子的“小名”"
                  ],
                  answer: 1,
                  tip: "得失电子后化学性质完全不同——“人”和“穿了盔甲的人”不是一回事。"
                },
                {
                  type: "fill",
                  stemBefore: "镁离子符号是",
                  stemAfter: "（电荷数在前）。",
                  answer: "Mg²⁺",
                  accept: ["Mg2+", "Mg²+"],
                  hint: "镁原子失去 2 个电子",
                  tip: "电荷数在前、正负号在后：Mg²⁺——写成 Mg⁺² 是错的。"
                },
                {
                  type: "choice",
                  stem: "氯原子变成 Cl⁻ 的过程中，氯原子？",
                  options: ["失去了 1 个电子", "得到了 1 个电子", "什么都没变"],
                  answer: 1,
                  tip: "得到电子带负电——Cl + e⁻ → Cl⁻。"
                }
              ],
              point: "离子符号三查：电荷数在前、正负号在后、数字 1 省略不写。"
            }
          ]
        },
        {
          id: "cm03.2.4",
          title: "本章小结与习题",
          prereq: "cm03.2.3 离子",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm03.2.4-p1",
              kind: "quiz",
              title: "本章小结：四辨析",
              questions: [
                {
                  type: "review",
                  html: "<b>分子</b>：保持物质化学性质的最小粒子（可分）。<b>原子</b>：化学变化中的最小粒子（不可分，只能重组）。<b>离子</b>：带电的原子（失电子→阳离子，得电子→阴离子）。<b>元素</b>：质子数相同的一类原子的总称（宏观，只讲种类）。关系链：分子由原子构成，原子得失电子变离子，质子数相同的原子算同一元素。"
                }
              ],
              point: "四句话：分子保性质、原子最小、离子带电、元素论质子数。"
            },
            {
              id: "cm03.2.4-p2",
              kind: "quiz",
              title: "本章习题",
              questions: [
                {
                  type: "choice",
                  stem: "下列说法正确的是？",
                  options: [
                    "水由氢、氧原子组成",
                    "一个水分子由两个氢原子和一个氧原子构成",
                    "Cl 应该写成 CL"
                  ],
                  answer: 1,
                  tip: "组成→元素，构成→原子；元素符号一大二小。"
                },
                {
                  type: "choice",
                  stem: "化学变化中，一定发生变化的是？",
                  options: ["原子的种类", "分子的种类", "原子的数目"],
                  answer: 1,
                  tip: "分子破裂、原子重组——分子种类变了，原子三不变。"
                },
                {
                  type: "fill",
                  stemBefore: "质子数为 11 的原子与质子数为 11 的离子，属于同一种",
                  stemAfter: "（填“元素”或“原子”）。",
                  answer: "元素",
                  accept: ["元素。"],
                  hint: "质子数相同的一类原子叫什么？",
                  tip: "质子数相同 = 同一元素——元素是“姓氏”，不管带不带电。"
                }
              ],
              point: "过关了？本章地基：分子/原子/离子/元素——后面全书都站在这四块砖上。"
            }
          ]
        }
      ]
    }
  ]
};
