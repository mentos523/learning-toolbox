/* ============================================================
 * 学习工具箱 · 化学 · 第十四章数据（蓝队 2026-10-15，批3 cm12–cm16）
 * 元素周期律：排布→周期表→递变律→位置—结构—性质；化学键（离子键/共价键）
 *
 * Schema 冻结版 v1.0（见 data/cm05.js 头注释，全批复用）。
 * 组件口径见 docs/chemistry-interactions.md v1.1。
 * C4 periodic-explore：周期表探索（range/highlightMode/trendArrows+trend/showDetail）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm14"] = {
  id: "cm14",
  units: [
    {
      id: "cm14.1",
      title: "原子结构与元素周期表",
      lessons: [
        {
          id: "cm14.1.1",
          title: "原子结构",
          prereq: "cm13.3.2 本章小结与习题",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm14.1.1-p1",
              kind: "interact",
              title: "1–20 号点一点",
              exploreTip: "点元素格看原子结构示意图：数 K/L/M 层各几个电子——验证排布三规则。",
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
              point: "排布三规则：能量最低（K→L→M）、每层最多 2n²、最外层 ≤8——K、Ca 有'插队'，后面再讲。"
            },
            {
              id: "cm14.1.1-p2",
              kind: "explain",
              title: "排布三规则",
              blocks: [
                { type: "lead", text: "电子不乱坐座位：先坐能量低的（K→L→M），每层有座位数上限，最外层不能超 8。" },
                { type: "text", html: "① 能量最低原理：电子先排 K 层（n=1），排满再排 L 层。② 每层最多容纳 2n² 个：K 层最多 2，L 层最多 8，M 层最多 18。③ 最外层电子数不超过 8（K 层为最外层时不超过 2）。" },
                { type: "text", html: "K、Ca 特殊：K（19）是 2、8、8、1 不是 2、8、9——M 层先封顶到 8，第 19 个电子去 N 层。Ca（20）同理 2、8、8、2。" },
                { type: "trap", text: "⚠ 别搞混：K 是 2、8、9？错！最外层 ≤8，M 层先封顶到 8，第 19 个电子去 N 层。'每层 2n²'无条件？最外层 ≤8 优先！" }
              ],
              point: "排布三规则 + K、Ca 的'封顶'——这是周期表横着看的全部秘密。"
            },
            {
              id: "cm14.1.1-p3",
              kind: "quiz",
              title: "自测：排布",
              questions: [
                {
                  type: "choice",
                  stem: "K（19 号）的核外电子排布是（  ）",
                  options: ["2、8、9", "2、8、8、1", "2、8、1、8", "2、9、8"],
                  answer: 1,
                  tip: "K 是 2、8、8、1——M 层先封顶到 8，第 19 个电子排到 N 层。"
                },
                {
                  type: "choice",
                  stem: "M 层（n=3）最多容纳的电子数是（  ）",
                  options: ["8", "18", "2", "32"],
                  answer: 1,
                  tip: "每层最多 2n²：M 层 2×9 = 18。但最外层 ≤8 优先！"
                },
                {
                  type: "fill",
                  stemBefore: "Ca（20 号）的核外电子排布是 2、8、8、",
                  stemAfter: "。",
                  answer: "2",
                  accept: ["２"],
                  hint: "和 K 一样，M 层封顶",
                  tip: "Ca 是 2、8、8、2——M 层封顶 8，第 19、20 个电子去 N 层。"
                }
              ],
              point: "K、Ca 排布对了，周期表的'周期'就懂了一半。"
            }
          ]
        },
        {
          id: "cm14.1.2",
          title: "元素周期表",
          prereq: "cm14.1.1 原子结构",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm14.1.2-p1",
              kind: "interact",
              title: "1–36 号点一点",
              exploreTip: "点任意元素：看它的周期、族、最外层电子数——找'横看周期、纵看族'的规律。",
              widgets: [
                {
                  type: "periodic-explore",
                  params: {
                    range: [1, 36],
                    highlightMode: "group",
                    trendArrows: false,
                    showDetail: true
                  }
                }
              ],
              point: "横看周期（电子层数），纵看族（最外层电子数）——位置就是结构的'身份证'。"
            },
            {
              id: "cm14.1.2-p2",
              kind: "explain",
              title: "编排原则",
              blocks: [
                { type: "lead", text: "周期表不是随便排的：电子层数相同的放一行，最外层电子数相同的放一列。" },
                { type: "text", html: "编排原则：按原子序数递增，把电子层数相同的元素排成横行（周期），把最外层电子数相同的元素按电子层数递增排成纵列（族）。7 个周期，18 个纵列，16 个族。" },
                { type: "text", html: "第Ⅷ族特殊：纵列 8、9、10 三列合称第Ⅷ族（Fe、Co、Ni）。" },
                { type: "oldfriend", text: "（还记得 cm13 的 Na、Cl、Fe 吗？Na 在第三周期ⅠA 族，Cl 在第三周期ⅦA 族，Fe 在第四周期Ⅷ 族——位置一查，结构性质全知道。）" },
                { type: "trap", text: "⚠ 别搞混：纵列 = 族？第Ⅷ族占 8、9、10 三列！'16 个族'不是'18 列'——别数错了。" }
              ],
              point: "周期 = 电子层数，族 = 最外层电子数——位置查到了，结构就查到了。"
            },
            {
              id: "cm14.1.2-p3",
              kind: "quiz",
              title: "自测：位置",
              questions: [
                {
                  type: "choice",
                  stem: "Na（11 号）在周期表中的位置是（  ）",
                  options: ["第二周期ⅠA 族", "第三周期ⅠA 族", "第三周期ⅡA 族", "第二周期ⅡA 族"],
                  answer: 1,
                  tip: "Na 排布 2、8、1：3 个电子层 → 第三周期；最外层 1 个 → ⅠA 族。"
                },
                {
                  type: "choice",
                  stem: "第Ⅷ族包含纵列（  ）",
                  options: ["第 8 列", "第 8、9 两列", "第 8、9、10 三列", "第 9、10 两列"],
                  answer: 2,
                  tip: "第Ⅷ族占 8、9、10 三列——Fe、Co、Ni 住一间。"
                },
                {
                  type: "fill",
                  stemBefore: "Cl（17 号）在第",
                  stemAfter: "周期ⅦA 族。",
                  answer: "三",
                  accept: ["3", "第三"],
                  hint: "排布 2、8、7",
                  tip: "Cl 排布 2、8、7：3 个电子层 → 第三周期；最外层 7 个 → ⅦA 族。"
                }
              ],
              point: "位置 = 电子层数 + 最外层电子数——查位置，就是查结构。"
            }
          ]
        }
      ]
    },
    {
      id: "cm14.2",
      title: "元素周期律",
      lessons: [
        {
          id: "cm14.2.1",
          title: "递变规律",
          prereq: "cm14.1.2 元素周期表",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm14.2.1-p1",
              kind: "interact",
              title: "半径递变箭头",
              exploreTip: "看箭头：同周期从左到右半径怎么变？同主族从上到下呢？",
              widgets: [
                {
                  type: "periodic-explore",
                  params: {
                    range: [1, 20],
                    highlightMode: "none",
                    trendArrows: true,
                    trend: "同周期从左到右，原子半径逐渐减小；同主族从上到下，原子半径逐渐增大",
                    showDetail: true
                  }
                }
              ],
              point: "同周期 → 减小（核电荷增多，拉得紧）；同主族 ↓ 增大（多了一层，撑大了）。"
            },
            {
              id: "cm14.2.1-p2",
              kind: "explain",
              title: "递变律",
              blocks: [
                { type: "lead", text: "位置定了，性质就有规律：半径、金属性、非金属性，按周期和族递变。" },
                { type: "text", html: "原子半径：同周期从左到右减小（核电荷增多，吸引力增强）；同主族从上到下增大（电子层数增多）。金属性：同周期从左到右减弱，同主族从上到下增强；非金属性反过来。" },
                { type: "text", html: "最高价氧化物对应水化物：同周期从左到右，碱性减弱、酸性增强（如 NaOH → Al(OH)₃ → H₂SiO₃ → H₃PO₄ → H₂SO₄ → HClO₄）；同主族从上到下反过来。" },
                { type: "trap", text: "⚠ 别搞混：'同周期半径都减小'无条件？稀有气体例外！'酸性越强非金属性越强'无条件？限最高价含氧酸！（H₂SO₄ vs HCl 的酸性不能比非金属性。）" }
              ],
              point: "递变律有适用条件：稀有气体例外，酸性比较限最高价含氧酸——条件不对，规律不用。"
            },
            {
              id: "cm14.2.1-p3",
              kind: "quiz",
              title: "自测：递变",
              questions: [
                {
                  type: "choice",
                  stem: "同周期从左到右，原子半径的变化是（  ）",
                  options: ["增大", "减小", "不变", "先增大后减小"],
                  answer: 1,
                  tip: "同周期从左到右：核电荷增多，吸引力增强，半径减小（稀有气体例外）。"
                },
                {
                  type: "choice",
                  stem: "下列酸性最强的是（  ）",
                  options: ["H₂SiO₃", "H₃PO₄", "H₂SO₄", "HClO₄"],
                  answer: 3,
                  tip: "同周期从左到右，最高价含氧酸的酸性增强：HClO₄ 最强。"
                },
                {
                  type: "fill",
                  stemBefore: "同主族从上到下，金属性",
                  stemAfter: "。（填增强/减弱）",
                  answer: "增强",
                  accept: [],
                  hint: "电子层数增多",
                  tip: "同主族从上到下：电子层数增多，失电子能力增强，金属性增强。"
                }
              ],
              point: "递变律 = 位置的函数——先定位置，再谈递变。"
            }
          ]
        },
        {
          id: "cm14.2.2",
          title: "位置—结构—性质",
          prereq: "cm14.2.1 递变规律",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm14.2.2-p1",
              kind: "explain",
              title: "三位一体",
              blocks: [
                { type: "lead", text: "位置、结构、性质是一条链：位置 → 结构 → 性质，互相推。" },
                { type: "text", html: "位置 → 结构：第三周期ⅦA 族 → 3 个电子层、最外层 7 个电子 → Cl（2、8、7）。结构 → 性质：最外层 7 个电子 → 易得 1 个电子 → 强氧化性、非金属性强。" },
                { type: "text", html: "性质 → 位置（逆推）：某元素最高价氧化物对应水化物是强碱 → 金属性强 → 左下方 → 如 K、Ca。推断题就这么做：已知一点，推出一串。" },
                { type: "trap", text: "⚠ 别搞混：'位置能推出一切'？位置推出结构，结构推出性质——跳过结构直接猜性质，容易错。推断题一步一推，别跳步。" }
              ],
              point: "位置—结构—性质：一条链，互相推——推断题的通用解法。"
            },
            {
              id: "cm14.2.2-p2",
              kind: "quiz",
              title: "自测：推断",
              questions: [
                {
                  type: "choice",
                  stem: "某元素在第三周期ⅦA 族，它是（  ）",
                  options: ["Na", "Mg", "Cl", "Ar"],
                  answer: 2,
                  tip: "第三周期ⅦA：排布 2、8、7 → Cl。"
                },
                {
                  type: "choice",
                  stem: "某元素最高价氧化物对应水化物是强碱，它在周期表中的大致位置是（  ）",
                  options: ["右上方", "左下方", "右下方", "左上方"],
                  answer: 1,
                  tip: "强碱 → 金属性强 → 左下方（如 K、Ca、Na）。"
                },
                {
                  type: "fill",
                  stemBefore: "最外层 1 个电子的元素，单质与水反应的剧烈程度：Li",
                  stemAfter: "K。（填 </>/=）",
                  answer: "<",
                  accept: ["＜"],
                  hint: "同主族从上到下金属性增强",
                  tip: "Li、K 同主族：从上到下金属性增强，与水反应更剧烈，Li < K。"
                }
              ],
              point: "推断题：已知一点，推出一串——位置、结构、性质，一条链走到底。"
            }
          ]
        }
      ]
    },
    {
      id: "cm14.3",
      title: "化学键",
      lessons: [
        {
          id: "cm14.3.1",
          title: "离子键",
          prereq: "cm14.2.2 位置—结构—性质",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm14.3.1-p1",
              kind: "interact",
              title: "NaCl 的电子转移",
              exploreTip: "看电子从 Na 搬到 Cl：Na⁺ 与 Cl⁻ 靠静电吸引结合。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "2Na + Cl₂ ＝点燃＝ 2NaCl", eTransfer: true },
                    particles: [
                      { id: "na", kind: "atom", label: "Na", charge: null, role: "reactant", count: 2 },
                      { id: "cl2", kind: "molecule", label: "Cl₂", charge: null, role: "reactant", count: 2 },
                      { id: "nacl", kind: "molecule", label: "NaCl", charge: null, role: "product", count: 2 }
                    ],
                    keyframes: [
                      { caption: "Na 失去 1 个电子变成 Na⁺，Cl 得到 1 个电子变成 Cl⁻。" },
                      { caption: "Na⁺ 与 Cl⁻ 靠静电吸引结合成 NaCl——这就是离子键。" },
                      { caption: "注意：NaOH 里也有离子键（Na⁺ 与 OH⁻ 之间），但 O—H 之间是共价键——一种物质可以有两种键。" }
                    ],
                    counter: false,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：电子画成小球是示意；微观粒子大小、数量、运动速度均为示意，未按真实比例。"
                  }
                }
              ],
              point: "离子键 = 阴阳离子的静电吸引——电子转移是成因，静电吸引是本质。"
            },
            {
              id: "cm14.3.1-p2",
              kind: "explain",
              title: "离子键 vs 共价键",
              blocks: [
                { type: "lead", text: "离子键是'送'电子，共价键是'共用'电子——成键方式不同，性质也不同。" },
                { type: "text", html: "离子键：阴阳离子间的静电吸引。成因是电子转移（Na → Cl）。离子化合物：强碱（NaOH）、大多数盐（NaCl）、活泼金属氧化物（Na₂O）。NaOH 里既有离子键（Na⁺—OH⁻），又有共价键（O—H）——别二选一！" },
                { type: "text", html: "共价键：原子间共用电子对。H₂、Cl₂、H₂O、CO₂ 都是共价化合物。离子化合物熔点一般较高，固态不导电、熔融态导电。" },
                { type: "trap", text: "⚠ 别搞混：NaOH 里只有离子键？O—H 是共价键！'离子化合物只含离子键'？NaOH、Na₂O₂ 都含共价键！" }
              ],
              point: "离子键是静电吸引，共价键是共用电子对——NaOH 两种键都有，别二选一。"
            },
            {
              id: "cm14.3.1-p3",
              kind: "quiz",
              title: "自测：化学键",
              questions: [
                {
                  type: "choice",
                  stem: "NaCl 中化学键的类型是（  ）",
                  options: ["共价键", "离子键", "金属键", "氢键"],
                  answer: 1,
                  tip: "NaCl：Na⁺ 与 Cl⁻ 的静电吸引 → 离子键。"
                },
                {
                  type: "choice",
                  stem: "下列物质中，既含离子键又含共价键的是（  ）",
                  options: ["NaCl", "H₂O", "NaOH", "CO₂"],
                  answer: 2,
                  tip: "NaOH：Na⁺—OH⁻ 是离子键，O—H 是共价键。"
                },
                {
                  type: "fill",
                  stemBefore: "离子键的本质是",
                  stemAfter: "。",
                  answer: "阴阳离子间的静电吸引",
                  accept: ["静电吸引", "阴阳离子间静电吸引"],
                  hint: "不是电子转移本身",
                  tip: "离子键的本质是阴阳离子间的静电吸引——电子转移是成因。"
                }
              ],
              point: "离子键 = 静电吸引，共价键 = 共用电子对——判据是成键方式，不是元素种类。"
            }
          ]
        },
        {
          id: "cm14.3.2",
          title: "共价键与分子",
          prereq: "cm14.3.1 离子键",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm14.3.2-p1",
              kind: "explain",
              title: "极性",
              blocks: [
                { type: "lead", text: "共用电子对不一定'平分'：谁抢电子能力强，电子对就偏向谁。" },
                { type: "text", html: "非极性共价键：同种原子之间，共用电子对不偏向，如 H—H、Cl—Cl。极性共价键：不同种原子之间，电子对偏向得电子能力强的一方，如 H—Cl（偏向 Cl）、H—O（偏向 O）。" },
                { type: "text", html: "化合物分类判据：只含共价键 → 共价化合物（H₂O、CO₂）；含离子键 → 离子化合物（NaCl、NaOH）。注意：共价化合物里可以有极性键和非极性键（如 H₂O₂）。" },
                { type: "trap", text: "⚠ 别搞混：'含极性键的一定是极性分子'？CO₂ 含极性键但是非极性分子（对称抵消）！判据看分子构型，不只看键。" }
              ],
              point: "极性看电子对偏向，分子极性看构型——键极性 ≠ 分子极性。"
            },
            {
              id: "cm14.3.2-p2",
              kind: "quiz",
              title: "自测：极性",
              questions: [
                {
                  type: "choice",
                  stem: "H—Cl 中共用电子对偏向（  ）",
                  options: ["H", "Cl", "不偏向", "时偏 H 时偏 Cl"],
                  answer: 1,
                  tip: "Cl 得电子能力强，电子对偏向 Cl → 极性共价键。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是（  ）",
                  options: ["CO₂ 是极性分子", "H₂O 只含非极性键", "NaCl 是离子化合物", "H₂ 含极性键"],
                  answer: 2,
                  tip: "NaCl 含离子键 → 离子化合物。CO₂ 对称 → 非极性分子；H₂O 含极性键；H₂ 含非极性键。"
                },
                {
                  type: "fill",
                  stemBefore: "只含共价键的化合物叫",
                  stemAfter: "化合物。",
                  answer: "共价",
                  accept: [],
                  hint: "与离子化合物相对",
                  tip: "只含共价键 → 共价化合物；含离子键 → 离子化合物。"
                }
              ],
              point: "判据：只含共价键 → 共价化合物；含离子键 → 离子化合物。"
            }
          ]
        },
        {
          id: "cm14.3.3",
          title: "本章小结与习题",
          prereq: "cm14.3.2 共价键与分子",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm14.3.3-p1",
              kind: "quiz",
              title: "小结：周期律 · 化学键",
              questions: [
                {
                  type: "review",
                  html: "本章小结：① 排布三规则：能量最低、每层 ≤2n²、最外层 ≤8（K 为最外层时 ≤2）；K、Ca 的 M 层封顶 8。② 周期表：周期＝电子层数，族＝最外层电子数；第Ⅷ族占 8、9、10 三列。③ 递变律：同周期 → 半径减小、金属性减弱；同主族 ↓ 半径增大、金属性增强；最高价含氧酸酸性同周期 → 增强（稀有气体例外）。④ 位置—结构—性质一条链。⑤ 离子键＝阴阳离子静电吸引（电子转移是成因）；共价键＝共用电子对；NaOH 两种键都有。"
                },
                {
                  type: "choice",
                  stem: "下列排布正确的是（  ）",
                  options: ["K：2、8、9", "Ca：2、8、8、2", "Cl：2、8、8", "Na：2、7、2"],
                  answer: 1,
                  tip: "Ca：2、8、8、2。K 不是 2、8、9；Cl 是 2、8、7；Na 是 2、8、1。"
                },
                {
                  type: "choice",
                  stem: "既含离子键又含共价键的是（  ）",
                  options: ["NaCl", "NaOH", "H₂O", "MgCl₂"],
                  answer: 1,
                  tip: "NaOH：Na⁺—OH⁻ 离子键，O—H 共价键。"
                },
                {
                  type: "fill",
                  stemBefore: "第三周期ⅦA 族的元素是",
                  stemAfter: "。（填元素符号）",
                  answer: "Cl",
                  accept: ["氯"],
                  hint: "排布 2、8、7",
                  tip: "第三周期ⅦA → 排布 2、8、7 → Cl。"
                }
              ],
              point: "位置查结构，结构推性质——周期表是查表，不是背表。"
            },
            {
              id: "cm14.3.3-p2",
              kind: "quiz",
              title: "综合：生活 + 定量",
              questions: [
                {
                  type: "choice",
                  stem: "金刚石和石墨都是碳的单质，性质差异很大的原因是（  ）",
                  options: ["组成元素不同", "碳原子排列方式不同", "一个是混合物", "石墨含杂质"],
                  answer: 1,
                  tip: "生活中的化学：同种元素、不同排列 → 不同性质——结构决定性质。"
                },
                {
                  type: "choice",
                  stem: "下列物质中，只含共价键的是（  ）",
                  options: ["Na₂O₂", "NaOH", "CO₂", "NaCl"],
                  answer: 2,
                  tip: "CO₂ 只含 C＝O 共价键。Na₂O₂、NaOH、NaCl 都含离子键。"
                },
                {
                  type: "fill",
                  stemBefore: "某原子 M 层电子数为 18，该原子的核外电子总数至少是",
                  stemAfter: "。",
                  answer: "30",
                  accept: [],
                  hint: "M 层 18 个电子 → 3d 有电子 → 4s 必先排满",
                  tip: "M 层 18 → 3s²3p⁶3d¹⁰；3d 有电子则 4s 必先排满（能量最低）→ 最少 2+8+18+2 ＝ 30（Zn）。"
                }
              ],
              point: "定量题自查：排布三规则每一步都满足了吗？最外层 ≤8 检查了吗？"
            }
          ]
        }
      ]
    }
  ]
};
