/* ============================================================
 * 学习工具箱 · 化学 · 第九章数据（蓝队 2026-10-15，阶段三批2）
 *
 * 章：cm09 溶液（九下第九单元）
 * 课：cm09.1.1 / cm09.1.2 / cm09.1.3 / cm09.2.1 / cm09.2.2 / cm09.2.3（6 课，17 页）
 * 依据：docs/chemistry-curriculum.md v1.1（cm09 课表）、
 *       docs/chemistry-pedagogy.md v1.1（cm09.1/cm09.2 单元策略）、
 *       docs/chemistry-interactions.md v1.1、真值口径 CHEM-XX。
 * Schema 沿用 data/cm05.js 文件头冻结版 v1.0。
 * 本批用到的组件类型：tri-rep / side-compare / solution-mix /
 *   read-gauge-chem / stoich-steps（冻结清单，渲染器待增补）。
 * Y10 落点（D3 方案 B，+0 页）：cm09.2.1 天平读数并入配制交互页。
 * 数据口径：溶解度/相对原子质量以人教版教科书常用值为准（F6），
 *   引用页均配数据源声明（CHEM-R26）；走附表 E 两审门禁。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm09"] = {
  id: "cm09",
  units: [
    {
      id: "cm09.1",
      title: "溶液与溶解度",
      lessons: [
        {
          id: "cm09.1.1",
          title: "溶液的形成",
          prereq: "cm08.2.3 本章小结与习题",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（Y6：一杯糖水三重表征） ---------- */
            {
              id: "cm09.1.1-p1",
              kind: "interact",
              title: "一杯糖水：三重表征",
              exploreTip: "切三重视角看糖水：现象、粒子、符号各讲一遍。",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "一杯糖水",
                    views: {
                      macro: { text: "把糖块放进水里搅拌：糖块“消失”了，得到均一、透明的糖水，放置不分层。" },
                      micro: { text: "蔗糖分子从晶体表面扩散开，均匀分散在水分子之间——分子种类没变，只是排开了。" },
                      symbol: { text: "溶质：蔗糖 C₁₂H₂₂O₁₁；溶剂：水 H₂O。糖水是混合物。" }
                    },
                    defaultView: "macro",
                    badgeText: {
                      macro: "现在看：宏观现象",
                      micro: "现在看：微观粒子",
                      symbol: "现在看：符号表达"
                    }
                  }
                },
                {
                  type: "molecule-motion",
                  params: {
                    view: { w: 620, h: 380 },
                    motion: { field: "dissolve", seed: 31,
                      kinds: [
                        { kind: "water", count: 90, color: "#90CAF9", r: 1.3, label: "水", speedMps: 9 },
                        { kind: "sugar", count: 9, color: "#FFB74D", r: 2.2, label: "蔗糖", speedMps: 7 }
                      ],
                      soluteKind: "sugar", detachProbPerStep: 0.004,
                      lattice: { cols: 3, rows: 3, x0: 40, y0: 64, dx: 9, dy: 9 } },
                    stepper: { stepsPerFrame: 200, summaries: [
                      "晶体表面的蔗糖分子被水分子一个个“拉”下来（脱离）",
                      "脱离的蔗糖分子在水中随机游走散开（扩散）",
                      "水分子包围在蔗糖分子周围（水合示意）",
                      "蔗糖分子均匀分散，晶体不见了但分子都在（均匀）"
                    ] },
                    autoplay: false,
                    legend: "图例：橙色=蔗糖分子，浅蓝=水分子；虚线圈=水合示意",
                    reminder: "粒子大小、数量、运动速度均为示意，未按真实比例；粒子碰撞为示意，非真实碰撞过程。\n提醒：蔗糖分子画成了一个小球、水分子包围它的\"水合壳\"也是示意——真实分子的形状和包围方式更复杂；这里只想让你看清\"脱离—散开—被包围\"三步。",
                    ax01: {
                      assumptions: ["蔗糖晶体为 3×3 示意晶格", "水为均匀背景"],
                      approximations: ["二维示意；粒子为质点", "水合壳为示意圈"],
                      errorEstimate: "随机游走为教学示意模型，无解析对账；确定性由播种 RNG 保证"
                    }
                  }
                }
              ],
              point: "溶液：均一、稳定的混合物；溶质 + 溶剂，缺一不可。"
            },
            /* ---------- p2：讲解页（溶液/溶质/溶剂/浊液） ---------- */
            {
              id: "cm09.1.1-p2",
              kind: "explain",
              title: "什么是溶液",
              blocks: [
                { type: "lead", text: "还记得吗？上一页你切了三重视角看糖水：糖“消失”了，但蔗糖分子一个没少，只是均匀散开了。" },
                { type: "text", html: "溶液是均一、稳定的混合物。均一：各处成分一样；稳定：放置不分层。被溶解的叫溶质，起溶解作用的叫溶剂——水是最常用的溶剂。" },
                { type: "text", html: "补充说明：溶质不一定是固体——酒精溶于水，溶质是酒精（液体）；汽水里溶了 CO₂，溶质是气体。两种液体互溶时，量多的为溶剂；有水时水为溶剂。" },
                { type: "text", html: "不是均一稳定的叫浊液：泥水（悬浊液）、牛奶（乳浊液），放置会分层。洗洁精洗油污是乳化，不是溶解。" },
                { type: "trap", text: "⚠ 别搞混：“溶液一定无色”是错的——CuSO₄ 溶液是蓝色的！均一 ≠ 无色。另：溶液一定是混合物，不可能是纯净物。" },
                { type: "physicslink", text: "物理呼应·奠基：物理 p03.2.1 布朗运动——水分子永不停息的无规则运动，正是把蔗糖分子从晶体表面“撞”散、均匀分散的推手，物理模块已建模演示（点击可跳转查看）。溶解时分子种类没变，变的只是排布。" }
              ],
              point: "溶液 = 均一 + 稳定 + 混合物；溶质可固可液可气。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm09.1.1-p3",
              kind: "quiz",
              title: "练一练：溶液",
              questions: [
                {
                  type: "choice",
                  stem: "下列属于溶液的是",
                  options: ["泥水", "牛奶", "蔗糖水"],
                  answer: 2,
                  tip: "泥水是悬浊液，牛奶是乳浊液——只有蔗糖水均一、稳定。"
                },
                {
                  type: "choice",
                  stem: "CuSO₄ 溶液呈蓝色，说明",
                  options: ["它不是溶液", "溶液不一定无色", "它不是混合物"],
                  answer: 1,
                  tip: "均一 ≠ 无色——颜色和“是不是溶液”没关系。"
                },
                {
                  type: "fill",
                  stemBefore: "汽水中溶解的 CO₂ 是",
                  stemAfter: "（填“溶质”或“溶剂”）。",
                  answer: "溶质",
                  accept: ["溶质"],
                  hint: "被溶解的是谁？",
                  tip: "溶质可以是气体——被溶解的 CO₂ 是溶质，水是溶剂。"
                }
              ],
              point: "过关了？记住：均一、稳定、混合物，三条全满足才是溶液。"
            }
          ]
        },
        {
          id: "cm09.1.2",
          title: "溶解度（上）",
          prereq: "cm09.1.1 溶液的形成",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：四要素缺一不可） ---------- */
            {
              id: "cm09.1.2-p1",
              kind: "interact",
              title: "四要素：缺一不可",
              exploreTip: "去一要素即错：看四要素，缺了哪一个。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "溶解度四要素：去一要素即错",
                    columns: ["✅ 溶解度（四要素齐全）", "❌ 缺要素，不算溶解度"],
                    rows: [
                      { dim: "温度", a: "20℃（一定温度）", b: "“NaCl 溶解度 36g”——没说温度" },
                      { dim: "溶剂量", a: "100g 水", b: "“20℃ 最多溶解 36g”——没说多少水" },
                      { dim: "状态", a: "饱和（再加也化不开）", b: "“20℃ 100g 水里溶了 36g”——没说饱没饱和" },
                      { dim: "单位", a: "36g（克数）", b: "“20℃ 时 NaCl 饱和”——没说多少克" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "溶解度四要素：一定温度、100g 水、饱和、克数，缺一不可。"
            },
            /* ---------- p2：讲解页（饱和/溶解度定义/数据源） ---------- */
            {
              id: "cm09.1.2-p2",
              kind: "explain",
              title: "溶解度是什么",
              blocks: [
                { type: "lead", text: "上一页“去一要素即错”——四要素齐了才叫溶解度，今天把定义讲清。" },
                { type: "text", html: "一定温度下，某固体在 100g 水中达到饱和时溶解的质量，叫该温度下的溶解度。标准说法：“20℃ 时 NaCl 的溶解度是 36g”——四要素一个不少。" },
                { type: "text", html: "饱和溶液：在一定温度下，不能再溶解某种溶质的溶液；还能继续溶解的是不饱和溶液。比较浓稀须同种溶质、同一温度——不同溶质、不同温度不能比！" },
                { type: "text", html: "数据源：溶解度数据引自人教版九年级下册溶解度表（常用值）。温度一变，溶解度就变——温度是第一要素。" },
                { type: "trap", text: "⚠ 别搞混：“溶解度 20g”没说温度，是错句；“饱和溶液一定比不饱和溶液浓”没说同种溶质、同温度，是错句。" }
              ],
              point: "溶解度 = 一定温度 + 100g 水 + 饱和 + 克数；温度是第一要素。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm09.1.2-p3",
              kind: "quiz",
              title: "练一练：溶解度",
              questions: [
                {
                  type: "choice",
                  stem: "下列关于溶解度的说法，正确的是",
                  options: ["NaCl 的溶解度是 36g", "20℃ 时 NaCl 的溶解度是 36g", "100g 水中最多溶解 36g NaCl"],
                  answer: 1,
                  tip: "四要素缺一不可：温度、100g 水、饱和、克数。"
                },
                {
                  type: "choice",
                  stem: "20℃ 时，甲是 NaCl 饱和溶液，乙是 KNO₃ 不饱和溶液，能比较浓稀的是",
                  options: ["甲一定比乙浓", "乙一定比甲浓", "不能比较"],
                  answer: 2,
                  tip: "不同溶质、不同状态——没有可比性，条件！"
                },
                {
                  type: "fill",
                  stemBefore: "20℃ 时，100g 水中最多溶解 36g NaCl，此时溶液是",
                  stemAfter: "溶液。",
                  answer: "饱和",
                  accept: ["饱和"],
                  hint: "再加也化不开",
                  tip: "“最多溶解” = 达到饱和——再加 NaCl 也化不开了。"
                }
              ],
              point: "过关了？记住：说溶解度，四要素一次说全。"
            }
          ]
        },
        {
          id: "cm09.1.3",
          title: "溶解度（下）",
          prereq: "cm09.1.2 溶解度（上）",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：蒸发结晶 vs 降温结晶） ---------- */
            {
              id: "cm09.1.3-p1",
              kind: "interact",
              title: "结晶：看曲线选方法",
              exploreTip: "左右对照：溶解度曲线平的陡的，结晶方法完全不同。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "蒸发结晶 vs 降温结晶",
                    columns: ["蒸发结晶", "降温结晶"],
                    rows: [
                      { dim: "适用", a: "溶解度受温度影响小的（如 NaCl）", b: "溶解度受温度影响大的（如 KNO₃）" },
                      { dim: "做法", a: "加热蒸发溶剂，溶质析出", b: "降温，溶解度变小，晶体析出" },
                      { dim: "生活例子", a: "海水晒盐", b: "KNO₃ 溶液降温析出晶体" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "结晶看溶解度曲线：平的用蒸发，陡的用降温。"
            },
            /* ---------- p2：讲解页（曲线判读/气体溶解度/数据源） ---------- */
            {
              id: "cm09.1.3-p2",
              kind: "explain",
              title: "读懂溶解度曲线",
              blocks: [
                { type: "lead", text: "上一页你按“陡平”选了结晶方法——今天学读曲线。" },
                { type: "text", html: "溶解度曲线：横坐标温度，纵坐标溶解度。判读三步：① 线上 = 该温度下饱和（可查溶解度）；② 线下 = 不饱和；③ 交点 = 两物质溶解度相等。KNO₃ 曲线陡，NaCl 曲线平——这就是选结晶方法的依据。" },
                { type: "text", html: "气体溶解度：温度越高越小，压强越大越大。打开汽水瓶冒气泡：压强减小，CO₂ 溶解度减小——物理变化（分子种类没变，红线辨析③）。" },
                { type: "text", html: "数据源：本课曲线为教学示意数据（趋势与人教版溶解度表一致）。读数先认横纵坐标。" },
                { type: "trap", text: "⚠ 别搞混：NaCl 溶解度受温度影响小，降温析不出多少，必须用蒸发结晶——有条件！" },
                { type: "mathlink", text: "数学呼应·奠基：代数 ch06 函数图像——溶解度曲线就是函数图像，读法一模一样。" }
              ],
              point: "曲线三步：线上饱和、线下不饱和、交点溶解度相等。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm09.1.3-p3",
              kind: "quiz",
              title: "练一练：溶解度曲线",
              questions: [
                {
                  type: "choice",
                  stem: "溶解度曲线上某一点表示",
                  options: ["该温度下的不饱和溶液", "该温度下的饱和溶液", "该温度下的溶解度为 0"],
                  answer: 1,
                  tip: "线上 = 饱和，可查该温度下的溶解度；线下 = 不饱和。"
                },
                {
                  type: "choice",
                  stem: "从 NaCl 溶液中获得 NaCl 晶体，宜用",
                  options: ["降温结晶", "蒸发结晶", "过滤"],
                  answer: 1,
                  tip: "NaCl 溶解度受温度影响小——降温析不出多少，用蒸发结晶。"
                },
                {
                  type: "choice",
                  stem: "打开汽水瓶冒出大量气泡，主要原因是",
                  options: ["发生了化学变化", "压强减小，气体溶解度减小", "温度升高"],
                  answer: 1,
                  tip: "压强减小 → CO₂ 溶解度减小 → 冒出来。分子种类没变，是物理变化。"
                }
              ],
              point: "过关了？记住：读曲线先看坐标，选结晶看陡平。"
            }
          ]
        }
      ]
    },
    {
      id: "cm09.2",
      title: "溶质质量分数",
      lessons: [
        {
          id: "cm09.2.1",
          title: "溶质质量分数（上）",
          prereq: "cm09.1.3 溶解度（下）",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C6 配制 + Y10 天平读数并入，D3 +0 页） ---------- */
            {
              id: "cm09.2.1-p1",
              kind: "interact",
              title: "配制：50g 6% 盐水",
              exploreTip: "先算出要称 3.0 g，再读天平、量筒，走完配制四步。",
              widgets: [
                {
                  type: "read-gauge-chem",
                  params: {
                    gauge: "balance",
                    division: 0.1,
                    tolerance: 0.1,
                    estimateNext: true,
                    targetValue: 3.0,
                    recordKey: "chm_gauge_cm09.2.1"
                  }
                },
                {
                  type: "solution-mix",
                  params: {
                    mode: "prepare",
                    solute: { name: "NaCl" },
                    target: { mass: 50, percent: 6 },
                    calcCheck: true,
                    sigFig: 3
                  }
                }
              ],
              point: "配制四步：计算、称量、量取、溶解；天平读数读到 0.1g。"
            },
            /* ---------- p2：讲解页（定义/配制/稀释） ---------- */
            {
              id: "cm09.2.1-p2",
              kind: "explain",
              title: "质量分数与稀释",
              blocks: [
                { type: "lead", text: "还记得吗？上一页你算出 3.0g 盐、47mL 水，一步步走完了配制——先算对，再动手。" },
                { type: "text", html: "溶质质量分数 = 溶质质量 / 溶液质量 × 100%。配制一定质量分数的溶液四步：计算 → 称量 → 量取 → 溶解。量取水时按密度 1g/mL 换算（初中约定）：47g 水 ≈ 47mL。" },
                { type: "text", html: "稀释：加的是水，溶质一分没多——稀释前后溶质质量不变：m(浓)×w(浓) = m(稀)×w(稀)。如 100g 20% 稀释到 5%，加水 300g。" },
                { type: "trap", text: "⚠ 别搞混：溶质质量分数 ≠ 溶解度！前者是比值（%），后者是克数（g/100g 水）——概念不同，算法不同。" },
                { type: "mathlink", text: "数学呼应·奠基：代数 ch03 分式——质量分数就是“溶质质量/溶液质量”的分式；直观版（比例）：稀释公式是比例式，比例那套算法直接搬过来用。" }
              ],
              point: "w = m(溶质)/m(溶液)；稀释前后溶质质量不变。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm09.2.1-p3",
              kind: "quiz",
              title: "练一练：质量分数",
              questions: [
                {
                  type: "choice",
                  stem: "把 100g 20% 的 NaCl 溶液稀释到 5%，需要加水",
                  options: ["100g", "300g", "400g"],
                  answer: 1,
                  tip: "溶质质量不变：100×20% = m(稀)×5% → m(稀) = 400g，加水 300g。"
                },
                {
                  type: "fill",
                  stemBefore: "配制 50g 6% 的 NaCl 溶液，需要 NaCl",
                  stemAfter: "g。",
                  answer: "3",
                  accept: ["3", "3.0"],
                  hint: "50 × 6%",
                  tip: "m(溶质) = 50g × 6% = 3.0g；水 47g ≈ 47mL。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["溶质质量分数就是溶解度", "稀释前后溶质质量不变", "稀释时溶质质量变小了"],
                  answer: 1,
                  tip: "加的是水，盐一分没多——变的是溶剂，不是溶质。"
                }
              ],
              point: "过关了？记住：先算对再动手，稀释抓住“溶质不变”。"
            }
          ]
        },
        {
          id: "cm09.2.2",
          title: "溶质质量分数（下）",
          prereq: "cm09.2.1 溶质质量分数（上）",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（Y12：Zn + H₂SO₄ 综合计算） ---------- */
            {
              id: "cm09.2.2-p1",
              kind: "interact",
              title: "综合算：反应 + 分数",
              exploreTip: "综合题三步：先算生成物，再算溶液质量，最后求分数。",
              widgets: [
                {
                  type: "stoich-steps",
                  params: {
                    title: "6.5g Zn 与 100g 稀硫酸（足量）反应，求所得溶液中 ZnSO₄ 的质量分数。",
                    steps: [
                      { key: "设", prompt: "设生成 ZnSO₄ 的质量为 x，生成 H₂ 的质量为 y", hint: "两个未知量，先都设出来" },
                      { key: "写", prompt: "写出配平的化学方程式", hint: "Zn + H₂SO₄ = ZnSO₄ + H₂↑（先配平！）" },
                      { key: "找", prompt: "找出 ZnSO₄、H₂ 与 Zn 的质量关系", hint: "161 : 2 : 65 = x : y : 6.5g（ZnSO₄ 相对分子质量 161）" },
                      { key: "列", prompt: "列比例式求 x、y", hint: "161/65 = x/6.5g；2/65 = y/6.5g" },
                      { key: "解", prompt: "算出反应后溶液质量与质量分数", hint: "m(液) = 6.5 + 100 − 0.2 = 106.3g；w = 16.1/106.3 = 15.1%" },
                      { key: "答", prompt: "答", hint: "所得溶液中 ZnSO₄ 的质量分数为 15.1%（3 位有效数字）" }
                    ],
                    checkTable: {
                      "找": "161:2:65=x:y:6.5g",
                      "解": "15.1%"
                    },
                    foldLevels: 3,
                    sigFig: 3,
                    recordKey: "chm_stoich_cm09.2.2"
                  }
                }
              ],
              point: "溶液质量 = 总质量 − 气体 − 沉淀；溶质是纯净物。"
            },
            /* ---------- p2：讲解页（纯量法/溶液质量/结晶水） ---------- */
            {
              id: "cm09.2.2-p2",
              kind: "explain",
              title: "综合计算三注意",
              blocks: [
                { type: "lead", text: "上一页你算出了 15.1%——中间的“106.3g”怎么来的？综合计算有三处容易翻车。" },
                { type: "text", html: "① 纯量法：把溶液质量直接代入方程式是错的——方程式只认纯净物。先按方程式算出溶质（ZnSO₄ 16.1g），再求分数。" },
                { type: "text", html: "② 反应后溶液质量 = 反应前总质量 − 放出的气体 − 生成的沉淀。本题：6.5 + 100 − 0.2 = 106.3g。跑掉的 H₂ 不在溶液里。" },
                { type: "text", html: "③ 结晶水：CuSO₄·5H₂O（胆矾）溶于水，溶质是 CuSO₄（无水物），不是晶体本身——凡结晶水合物，先认清溶质是谁。" },
                { type: "trap", text: "⚠ 别搞混：m(液) = m(溶质) + m(溶剂) 没错，但综合题里要用“反应前总质量 − 气体 − 沉淀”——两条路同一个数。" }
              ],
              point: "纯量代入、溶液质量扣气体沉淀、结晶水认清溶质。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm09.2.2-p3",
              kind: "quiz",
              title: "练一练：综合计算",
              questions: [
                {
                  type: "review",
                  html: "✅ <b>计算自查清单</b>：方程式配平了吗？代入的是纯净物质量吗？溶液质量扣掉气体/沉淀了吗？溶质认清了吗（结晶水）？单位和有效数字对了吗？"
                },
                {
                  type: "choice",
                  stem: "把胆矾（CuSO₄·5H₂O）溶于水配成溶液，溶质是",
                  options: ["CuSO₄·5H₂O", "CuSO₄", "H₂O"],
                  answer: 1,
                  tip: "结晶水合物中，溶质是无水物 CuSO₄——有条件！"
                },
                {
                  type: "fill",
                  stemBefore: "6.5g Zn 与足量稀硫酸反应，反应后溶液质量比反应前总质量少",
                  stemAfter: "g。",
                  answer: "0.2",
                  accept: ["0.2", "0.20"],
                  hint: "跑掉的是什么？",
                  tip: "跑掉的是 H₂（0.2g）——m(液) = 总质量 − 气体质量。"
                }
              ],
              point: "过关了？记住：溶质要纯，溶液质量要扣，结晶水要认。"
            }
          ]
        },
        {
          id: "cm09.2.3",
          title: "本章小结与习题",
          prereq: "cm09.2.2 溶质质量分数（下）",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：小结 + 梯度题 ---------- */
            {
              id: "cm09.2.3-p1",
              kind: "quiz",
              title: "小结：溶液",
              questions: [
                {
                  type: "review",
                  html: "📝 <b>本章小结</b><br>① 溶液：均一、稳定的混合物；溶质可固可液可气。<br>② 溶解度四要素：一定温度、100g 水、饱和、克数（缺一不可）。<br>③ 溶解度曲线：线上饱和、线下不饱和；结晶看陡平（NaCl 蒸发、KNO₃ 降温）。<br>④ 溶质质量分数 w = m(溶质)/m(溶液)；稀释前后溶质质量不变。<br>⑤ 综合计算：纯量法 + 溶液质量扣气体/沉淀 + 结晶水认清溶质。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["溶解度就是溶质质量分数", "20℃ 时 NaCl 溶解度 36g，四要素齐全", "饱和溶液一定比不饱和溶液浓"],
                  answer: 1,
                  tip: "溶解度是克数，质量分数是比值；比浓稀要同溶质同温度。"
                },
                {
                  type: "choice",
                  stem: "从海水中提取食盐，宜用",
                  options: ["降温结晶", "蒸发结晶", "过滤"],
                  answer: 1,
                  tip: "NaCl 溶解度受温度影响小——海水晒盐，蒸发结晶。"
                }
              ],
              point: "小结过关？四要素、曲线、分数、纯量，四件套记牢。"
            },
            /* ---------- p2：生活题 + 计算题 ---------- */
            {
              id: "cm09.2.3-p2",
              kind: "quiz",
              title: "生活中的化学 + 计算",
              questions: [
                {
                  type: "review",
                  html: "🏠 <b>生活中的化学</b>：医院里输液用的生理盐水是 0.9% 的 NaCl 溶液。为什么是 0.9%，而不是越浓越好？<br><details><summary>思路提示</summary>想想：盐水浓了，血细胞会发生什么？</details><details><summary>关键步骤</summary>0.9% 与人体血浆的浓度接近（等渗）；太浓会使血细胞失水皱缩，太稀会使血细胞吸水涨破。</details><details><summary>完整答案</summary>0.9% 是与血浆等渗的浓度，保证血细胞形态正常。用到的原理：溶质质量分数（cm09.2.1）。</details>"
                },
                {
                  type: "review",
                  html: "🧮 <b>定量计算</b>：配制 100g 10% 的 NaCl 溶液，需要 NaCl 和水各多少？<br>自查清单：公式用对了吗？单位对了吗？<br><details><summary>思路提示</summary>m(溶质) = m(溶液) × w。</details><details><summary>关键步骤</summary>m(NaCl) = 100g × 10% = 10g；m(水) = 100 − 10 = 90g ≈ 90mL。</details><details><summary>完整答案</summary>需要 NaCl 10g，水 90mL。用到的原理：溶质质量分数（cm09.2.1）。</details>"
                }
              ],
              point: "本章完。下章：酸·碱·盐——初中化学的集大成。"
            }
          ]
        }
      ]
    }
  ]
};
