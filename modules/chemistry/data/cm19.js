/* ============================================================
 * 学习工具箱 · 化学 · 第十九章数据（蓝队 2026-10-15，阶段三批4）
 * 化学反应原理·下（水溶液平衡·电化学）· 7 课 / 20 页
 *
 * 数据格式：schema v1.0 冻结（见 data/cm05.js 文件头）。
 * 组件类型名冻结（docs/chemistry-interactions.md）：
 *   reaction-particle(C7) / ph-scale(C8) / redox-track(C10) /
 *   safety-badge(Y2)
 * 落点：T7 “数量级的尺子”+pH=−lgc(H⁺) 严格化（cm19.1.2，回填 cm10.2.3）；
 *       酸碱两步走兑现：cm19.1.3 回填 cm10.2.2“酸碱中和不一定 pH=7”；
 *       Na₂CO₃ 是盐显碱性（回填 cm10.3.1）。
 * window.CHEM_CH["cm19"] = { id, units[] }（注册由引擎 index.html script 标签完成）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm19"] = {
  id: "cm19",
  units: [
    {
      id: "cm19.1",
      title: "水溶液中的平衡",
      lessons: [
        {
          id: "cm19.1.1",
          title: "电离平衡",
          prereq: "cm18.2.4 化学平衡计算",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm19.1.1-p1",
              kind: "explain",
              title: "弱电解质：部分电离",
              blocks: [
                { type: "lead", text: "0.1mol/L 的醋酸，pH 不是 1——CH₃COOH 没有完全电离。弱电解质的电离，是可逆的。" },
                { type: "text", html: "CH₃COOH ⇌ CH₃COO⁻ + H⁺：分子、离子、H⁺ 三者共存，电离与“复合”同时进行——这就是电离平衡。电离常数 Ka（定性）：Ka 越大，酸电离程度越大、酸性越强。" },
                { type: "text", html: "加水稀释：促进电离（电离程度变大），但 c(H⁺) 反而减小——体积变大的速度，超过了电离增加的速度。“程度”和“浓度”，两回事！" },
                { type: "trap", text: "⚠ 别搞混：弱酸溶液里不“只有”弱酸分子——分子、酸根离子、H⁺ 共存；稀释促进电离，但 c(H⁺) 减小！" }
              ],
              point: "电离可逆、部分电离；稀释：程度↑、浓度↓。下一页看微观动画。"
            },
            {
              id: "cm19.1.1-p2",
              kind: "interact",
              title: "看：醋酸的部分电离",
              exploreTip: "按 ▶ 看电离与复合同时进行，再看稀释时发生什么。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "CH₃COOH ⇌ CH₃COO⁻ + H⁺" },
                    particles: [
                      { id: "hac", kind: "molecule", label: "CH₃COOH", charge: null, role: "reactant", count: 3 },
                      { id: "hac2", kind: "molecule", label: "CH₃COOH", charge: null, role: "product", count: 2 },
                      { id: "ac", kind: "ion", label: "CH₃COO", charge: "−1", role: "product", count: 1 },
                      { id: "h", kind: "ion", label: "H", charge: "+1", role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "3 个醋酸分子入水：只有 1 个“舍得”电离（示意：实际电离比例更小）", moves: [] },
                      { caption: "CH₃COO⁻ 与 H⁺ 也会“复合”回去——电离是可逆的", moves: [] },
                      { caption: "加水稀释：电离的比例变大了（程度↑），但 H⁺ 被水“冲淡”了（c↓）", form: [{ ids: ["hac"], label: "CH₃COO⁻+H⁺" }] }
                    ],
                    counter: true,
                    spectatorFade: true,
                    slowmo: true
                  }
                }
              ],
              point: "电离⇌复合：动态平衡又一例——v(电离)=v(复合)≠0。"
            },
            {
              id: "cm19.1.1-p3",
              kind: "quiz",
              title: "练一练：部分电离",
              questions: [
                {
                  type: "choice",
                  stem: "醋酸溶液中存在？",
                  options: ["只有 CH₃COOH 分子", "CH₃COOH、CH₃COO⁻、H⁺ 共存", "只有离子"],
                  answer: 1,
                  tip: "弱电解质部分电离：分子与离子共存。"
                },
                {
                  type: "choice",
                  stem: "加水稀释醋酸，c(H⁺)？",
                  options: ["增大", "减小", "不变"],
                  answer: 1,
                  tip: "稀释促进电离（程度↑），但 c(H⁺) 减小（浓度↓）。"
                },
                {
                  type: "choice",
                  stem: "Ka 越大，说明该弱酸？",
                  options: ["电离程度越大", "电离程度越小", "与电离无关"],
                  answer: 0,
                  tip: "Ka 是电离程度的量度：越大电离越多。"
                }
              ],
              point: "部分电离、可逆共存——电离平衡一次讲透。"
            }
          ]
        },
        {
          id: "cm19.1.2",
          title: "水的电离与溶液 pH",
          prereq: "cm19.1.1 电离平衡",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm19.1.2-p1",
              kind: "explain",
              title: "pH = −lg c(H⁺)：严格化",
              blocks: [
                { type: "lead", text: "cm10.2.3 的 pH 标尺是直观版（pH 差 1 差 10 倍）。学完对数，上严格版。" },
                { type: "oldfriend", text: "（就是 cm10.2.3 你玩过的 pH 标尺：拖动 pH，c(H⁺) 以 10 倍跳动——今天兑现严格形式。）" },
                { type: "text", html: "水也电离：H₂O ⇌ H⁺ + OH⁻。Kw = c(H⁺)·c(OH⁻)，只与温度有关——25℃ 时 1.0×10⁻¹⁴。" },
                { type: "text", html: "pH 是“数量级的尺子”：pH = −lg c(H⁺)。c(H⁺)=0.01 的盐酸 pH=2；0.01mol/L NaOH 的 pH=12。" },
                { type: "mathlink", text: "回填：代数 8.2 对数——cm10.2.3 的预告今天兑现。" },
                { type: "trap", text: "⚠ 别搞混：pH=7 不一定中性——看温度！100℃ 时中性 pH=6；Kw=10⁻¹⁴ 只在 25℃ 成立。" }
              ],
              point: "pH = −lg c(H⁺)：小小一步，浓度大跳。下一页：亲手算 pH。"
            },
            {
              id: "cm19.1.2-p2",
              kind: "interact",
              title: "pH 计算器：严格版",
              exploreTip: "拖溶液到试纸看 pH，再拨 pH 滑块看 c(H⁺) 的 10 倍跳动。",
              widgets: [
                {
                  type: "ph-scale",
                  params: {
                    solutions: [
                      { name: "0.01mol/L 盐酸", ph: 2 },
                      { name: "白醋", ph: 3 },
                      { name: "纯水", ph: 7 },
                      { name: "肥皂水", ph: 10 },
                      { name: "0.01mol/L NaOH 溶液", ph: 12 }
                    ],
                    mode: "strict",
                    tenfoldViz: true
                  }
                }
              ],
              point: "pH 差 1，c(H⁺) 差 10 倍——对数标尺，一次看清。"
            },
            {
              id: "cm19.1.2-p3",
              kind: "quiz",
              title: "练一练：pH 计算",
              questions: [
                {
                  type: "fill",
                  stemBefore: "c(H⁺)=1×10⁻³ mol/L 的溶液，pH=",
                  stemAfter: "。",
                  answer: "3",
                  accept: ["3.0"],
                  hint: "pH=−lgc(H⁺)",
                  tip: "−lg(10⁻³)=3。"
                },
                {
                  type: "fill",
                  stemBefore: "0.01mol/L NaOH 溶液（25℃）的 pH=",
                  stemAfter: "。",
                  answer: "12",
                  accept: ["12.0"],
                  hint: "先求 c(H⁺)=Kw/c(OH⁻)",
                  tip: "c(OH⁻)=0.01，c(H⁺)=10⁻¹²，pH=12。"
                },
                {
                  type: "choice",
                  stem: "100℃ 的纯水，pH=6，它是？",
                  options: ["酸性", "中性", "碱性"],
                  answer: 1,
                  tip: "100℃ Kw≈10⁻¹²，中性时 c(H⁺)=10⁻⁶——pH=7 只在 25℃ 意味着中性。"
                }
              ],
              point: "pH=−lgc(H⁺)：数量级的尺子，一次算对。"
            }
          ]
        },
        {
          id: "cm19.1.3",
          title: "盐类的水解",
          prereq: "cm19.1.2 水的电离与溶液 pH",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm19.1.3-p1",
              kind: "explain",
              title: "盐：有弱才水解",
              blocks: [
                { type: "lead", text: "CH₃COONa 是中和产物，溶液却显碱性——cm10.2.2 的纠偏今天兑现。" },
                { type: "oldfriend", text: "（cm10.2.2 的靶：“酸碱中和一定 pH=7”——有弱参与则 ≠7。）" },
                { type: "text", html: "水解实质：弱离子“抢”水电离出的 H⁺/OH⁻，生成弱电解质。CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻——显碱性。" },
                { type: "text", html: "规律：有弱才水解；越弱越水解；谁强显谁性。Na₂CO₃ 是盐却显碱性——cm10.3.1 的误区今天正名。" },
                { type: "text", html: "应用：泡沫灭火器（双水解：2Al³⁺+6HCO₃⁻=2Al(OH)₃↓+6CO₂↑）；明矾净水（Al(OH)₃ 胶体吸附）。" },
                { type: "trap", text: "⚠ 别搞混：盐溶液不都是中性！CH₃COONa 碱性，NH₄Cl 酸性。" }
              ],
              point: "酸碱中和不一定 pH=7——水解说了算。下一页：测四种盐的 pH。"
            },
            {
              id: "cm19.1.3-p2",
              kind: "interact",
              title: "测一测：四种盐溶液",
              exploreTip: "把四种盐溶液拖到试纸上：哪个酸、哪个碱、哪个中性？",
              widgets: [
                {
                  type: "ph-scale",
                  params: {
                    solutions: [
                      { name: "NaCl 溶液", ph: 7 },
                      { name: "NH₄Cl 溶液", ph: 5 },
                      { name: "CH₃COONa 溶液", ph: 9 },
                      { name: "Na₂CO₃ 溶液", ph: 11 }
                    ],
                    mode: "intuitive",
                    tenfoldViz: true
                  }
                }
              ],
              point: "NaCl 中性、CH₃COONa 碱性、NH₄Cl 酸性——有弱才水解。"
            },
            {
              id: "cm19.1.3-p3",
              kind: "quiz",
              title: "练一练：谁强显谁性",
              questions: [
                {
                  type: "choice",
                  stem: "CH₃COONa 溶液显碱性的原因是？",
                  options: ["CH₃COONa 是碱", "CH₃COO⁻ 水解生成 OH⁻", "Na⁺ 水解"],
                  answer: 1,
                  tip: "CH₃COO⁻ + H₂O ⇌ CH₃COOH + OH⁻：弱离子才水解。"
                },
                {
                  type: "choice",
                  stem: "泡沫灭火器的原理是？",
                  options: ["Al³⁺ 与 HCO₃⁻ 双水解产生 CO₂", "Na₂CO₃ 受热分解", "加压喷出"],
                  answer: 0,
                  tip: "2Al³⁺+6HCO₃⁻=2Al(OH)₃↓+6CO₂↑：双水解互相促进。"
                },
                {
                  type: "choice",
                  stem: "下列盐溶液显酸性的是？",
                  options: ["NaCl", "NH₄Cl", "CH₃COONa"],
                  answer: 1,
                  tip: "谁强显谁性：NH₄Cl 是强酸弱碱盐，显酸性。"
                }
              ],
              point: "有弱才水解、越弱越水解、谁强显谁性——水解三句话收好。"
            }
          ]
        },
        {
          id: "cm19.1.4",
          title: "沉淀溶解平衡",
          prereq: "cm19.1.3 盐类的水解",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm19.1.4-p1",
              kind: "explain",
              title: "难溶 ≠ 不溶",
              blocks: [
                { type: "lead", text: "AgCl 是“沉淀”，却没“躺平”：AgCl(s) ⇌ Ag⁺ + Cl⁻，溶解与沉淀同时进行。" },
                { type: "text", html: "Ksp = c(Ag⁺)·c(Cl⁻)（AgCl，25℃，1.8×10⁻¹⁰）。Qc > Ksp 析出；Qc = Ksp 平衡；Qc < Ksp 不沉淀。" },
                { type: "text", html: "沉淀转化：AgCl 中加 KI 变黄——AgI 的 Ksp（8.5×10⁻¹⁷）更小：AgCl(s) + I⁻ = AgI(s) + Cl⁻。" },
                { type: "mathlink", text: "奠基：代数 ch02 整式——Ksp 就是离子浓度幂之积。" },
                { type: "trap", text: "⚠ 别搞混：Ksp 大=溶解度大只限同类型；“完全不溶”是错的——难溶也是平衡！" }
              ],
              point: "Qc>Ksp 析出；Ksp 越小越难溶。下一页看白色变黄色。"
            },
            {
              id: "cm19.1.4-p2",
              kind: "interact",
              title: "看：白色沉淀变黄",
              exploreTip: "按 ▶ 看 AgCl 遇到 I⁻：谁把谁“换”了下来？",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "AgCl(s) + I⁻ = AgI(s) + Cl⁻" },
                    particles: [
                      { id: "agcl", kind: "molecule", label: "AgCl", charge: null, role: "reactant", count: 2 },
                      { id: "i", kind: "ion", label: "I", charge: "−1", role: "reactant", count: 2 },
                      { id: "agi", kind: "molecule", label: "AgI", charge: null, role: "product", count: 2 },
                      { id: "cl", kind: "ion", label: "Cl", charge: "−1", role: "product", count: 2 }
                    ],
                    keyframes: [
                      { caption: "白色 AgCl 沉淀 + KI 溶液：I⁻ 向 AgCl“进攻”", moves: [] },
                      { caption: "AgI 更难溶（Ksp 更小），AgCl“让位”", moves: [] },
                      { caption: "白色沉淀变黄：AgCl → AgI（沉淀转化）", form: [{ ids: ["agcl", "i"], label: "AgI" }] }
                    ],
                    counter: true,
                    spectatorFade: true,
                    slowmo: true
                  }
                }
              ],
              point: "Ksp 小的更难溶——沉淀向更难溶的方向转化。"
            },
            {
              id: "cm19.1.4-p3",
              kind: "quiz",
              title: "练一练：Ksp 的判断",
              questions: [
                {
                  type: "choice",
                  stem: "AgCl(s) ⇌ Ag⁺ + Cl⁻ 中，Ksp 的表达式是？",
                  options: ["Ksp=c(AgCl)", "Ksp=c(Ag⁺)·c(Cl⁻)", "Ksp=c(Ag⁺)+c(Cl⁻)"],
                  answer: 1,
                  tip: "固体不写入：Ksp = 离子浓度幂之积。"
                },
                {
                  type: "fill",
                  stemBefore: "c(Ag⁺)=c(Cl⁻)=2×10⁻⁵ mol/L（Qc=4×10⁻¹⁰，Ksp=1.8×10⁻¹⁰），会",
                  stemAfter: "沉淀。",
                  answer: "析出",
                  accept: ["生成", "有"],
                  hint: "Qc vs Ksp",
                  tip: "Qc=4×10⁻¹⁰ > Ksp=1.8×10⁻¹⁰，析出沉淀。"
                },
                {
                  type: "choice",
                  stem: "AgCl 白色沉淀加 KI 变黄，说明？",
                  options: ["AgI 比 AgCl 更难溶", "KI 有颜色", "AgCl 溶解了"],
                  answer: 0,
                  tip: "沉淀向 Ksp 更小的方向转化：AgCl → AgI。"
                }
              ],
              point: "难溶≠不溶；Qc>Ksp 析出——沉淀溶解平衡收官。"
            }
          ]
        }
      ]
    },
    {
      id: "cm19.2",
      title: "电化学",
      lessons: [
        {
          id: "cm19.2.1",
          title: "原电池（深化）",
          prereq: "cm19.1.4 沉淀溶解平衡",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm19.2.1-p1",
              kind: "explain",
              title: "电极反应式：三守恒",
              blocks: [
                { type: "lead", text: "铜锌原电池的电极反应式，今天写“严”：原子、电荷、电子三守恒，三个都得过。" },
                { type: "oldfriend", text: "（cm16.2.2 玩过的铜锌原电池：电子只走导线，溶液中是离子在移动。）" },
                { type: "text", html: "负极 Zn − 2e⁻ = Zn²⁺（氧化）；正极 Cu²⁺ + 2e⁻ = Cu（还原）。检查：原子、电荷、得失电子数三守恒。" },
                { type: "text", html: "铅蓄电池放电：Pb + PbO₂ + 2H₂SO₄ = 2PbSO₄ + 2H₂O；充电逆向进行——充电是电解池，用“阴、阳极”！氢氧燃料电池：产物是水，清洁高效。" },
                { type: "mathlink", text: "奠基：代数 ch01 方程——得失电子数相等，就是列方程。" },
                { type: "trap", text: "⚠ 别搞混：电子不守恒 = 没写完；充电别叫“正负极”——叫阴阳极！" }
              ],
              point: "三守恒：原子、电荷、电子。下一页：追踪电子去向。"
            },
            {
              id: "cm19.2.1-p2",
              kind: "interact",
              title: "追踪电子：从 Zn 到 Cu²⁺",
              exploreTip: "先点元素标化合价，再点起点、终点画电子转移箭头。单质中元素化合价为 0（如 H₂ 中的 H 为 0、Zn 为 0）。",
              widgets: [
                {
                  type: "redox-track",
                  params: {
                    equation: {
                      reactants: [
                        { formula: "Zn", atoms: { Zn: 1 } },
                        { formula: "CuSO₄", atoms: { Cu: 1, S: 1, O: 4 } }
                      ],
                      products: [
                        { formula: "ZnSO₄", atoms: { Zn: 1, S: 1, O: 4 } },
                        { formula: "Cu", atoms: { Cu: 1 } }
                      ]
                    },
                    valences: {
                      reactants: { "Zn.Zn": "0", "CuSO₄.Cu": "+2", "CuSO₄.S": "+6", "CuSO₄.O": "−2" },
                      products: { "ZnSO₄.Zn": "+2", "ZnSO₄.S": "+6", "ZnSO₄.O": "−2", "Cu.Cu": "0" }
                    },
                    transfer: { from: "Zn", to: "Cu", electrons: 2 },
                    motto: [
                      { element: "Zn（负极）", change: "升高", e: "失 2e⁻", reaction: "氧化反应", role: "还原剂" },
                      { element: "Cu²⁺（正极）", change: "降低", e: "得 2e⁻", reaction: "还原反应", role: "氧化剂" }
                    ],
                    arrowMode: "tap"
                  }
                }
              ],
              point: "升失氧、降得还：Zn 升失氧做还原剂，Cu²⁺ 降得还做氧化剂。"
            },
            {
              id: "cm19.2.1-p3",
              kind: "quiz",
              title: "练一练：三守恒",
              questions: [
                {
                  type: "choice",
                  stem: "Zn − 2e⁻ = Zn²⁺ 中，Zn 发生的是？",
                  options: ["还原反应", "氧化反应", "既不是"],
                  answer: 1,
                  tip: "失电子 = 氧化反应；Zn 做还原剂。"
                },
                {
                  type: "choice",
                  stem: "铅蓄电池充电时，电极应该叫？",
                  options: ["正负极", "阴、阳极", "还是正负极"],
                  answer: 1,
                  tip: "充电 = 电解池：阳极氧化、阴极还原。"
                },
                {
                  type: "choice",
                  stem: "电极反应式书写必须同时满足？",
                  options: ["原子守恒", "原子、电荷、电子三守恒", "电子守恒即可"],
                  answer: 1,
                  tip: "三守恒缺一不可。"
                }
              ],
              point: "三守恒 + 充电=电解池——原电池深化收官。"
            }
          ]
        },
        {
          id: "cm19.2.2",
          title: "电解池",
          prereq: "cm19.2.1 原电池（深化）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm19.2.2-p1",
              kind: "explain",
              title: "电解：阳极氧化、阴极还原",
              blocks: [
                { type: "lead", text: "给 CuCl₂ 溶液通电：阴极变红（Cu 析出），阳极冒黄绿气体（Cl₂）——电能逼出非自发反应。" },
                { type: "text", html: "阴极：Cu²⁺ + 2e⁻ = Cu（还原）；阳极：2Cl⁻ − 2e⁻ = Cl₂↑（氧化）。电解池叫阴、阳极！" },
                { type: "text", html: "放电顺序：阳离子 Ag⁺ > Fe³⁺ > Cu²⁺ > H⁺；阴离子 S²⁻ > I⁻ > Br⁻ > Cl⁻ > OH⁻。“排前面”先放电。电解 NaCl 溶液阴极放 H₂——本质是水电离的 H⁺，表述要严谨。" },
                { type: "text", html: "应用：电镀、精炼铜、氯碱工业（2NaCl + 2H₂O ＝通电＝ 2NaOH + H₂↑ + Cl₂↑）。" },
                { type: "trap", text: "⚠ 别搞混：阳极氧化（阳氧），阴极还原；放电顺序是“先后”不是“能不能”。" }
              ],
              point: "阳氧阴还；放电看顺序。下一页看 CuCl₂ 电解。"
            },
            {
              id: "cm19.2.2-p2",
              kind: "interact",
              title: "电解 CuCl₂：阴极红、阳极黄绿",
              exploreTip: "按 ▶ 看离子定向移动，再看顶部安全徽章（Cl₂ 有毒）。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "CuCl₂ =(通电)= Cu + Cl₂↑" },
                    particles: [
                      { id: "cu", kind: "ion", label: "Cu", charge: "+2", role: "reactant", count: 1 },
                      { id: "cl", kind: "ion", label: "Cl", charge: "−1", role: "reactant", count: 2 },
                      { id: "cum", kind: "atom", label: "Cu", charge: null, role: "product", count: 1 },
                      { id: "cl2", kind: "molecule", label: "Cl₂", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "通电：Cu²⁺ 向阴极移动，Cl⁻ 向阳极移动", moves: [] },
                      { caption: "阴极：Cu²⁺ + 2e⁻ = Cu（红色铜析出）——还原反应", moves: [] },
                      { caption: "阳极：2Cl⁻ − 2e⁻ = Cl₂↑（黄绿色气体）——氧化反应", form: [{ ids: ["cl"], label: "Cl₂" }] }
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
                    text: "Cl₂ 有毒：虚拟实验可重复试错",
                    realityNote: "虚拟实验可重复试错；现实中电解实验必须在通风橱中、老师指导下操作，Cl₂ 须尾气吸收"
                  }
                }
              ],
              point: "Cu²⁺ 向阴极、Cl⁻ 向阳极——离子定向移动形成电流。"
            },
            {
              id: "cm19.2.2-p3",
              kind: "quiz",
              title: "练一练：阳氧阴还",
              questions: [
                {
                  type: "choice",
                  stem: "电解 CuCl₂ 溶液，阴极的现象是？",
                  options: ["冒黄绿色气体", "析出红色固体", "无现象"],
                  answer: 1,
                  tip: "阴极：Cu²⁺ + 2e⁻ = Cu（还原）。"
                },
                {
                  type: "fill",
                  stemBefore: "阳离子放电顺序：Ag⁺ > Fe³⁺ >",
                  stemAfter: "> H⁺。",
                  answer: "Cu²⁺",
                  accept: ["Cu2+", "铜离子"],
                  hint: "课本顺序",
                  tip: "Ag⁺ > Fe³⁺ > Cu²⁺ > H⁺：排前面的先放电。"
                },
                {
                  type: "choice",
                  stem: "电解饱和 NaCl 溶液，阴极产物是？",
                  options: ["Cl₂", "H₂", "Na"],
                  answer: 1,
                  tip: "阴极是水电离的 H⁺ 放电：2H⁺ + 2e⁻ = H₂↑。"
                }
              ],
              point: "阳氧阴还 + 放电顺序——电解池一次讲透。"
            }
          ]
        },
        {
          id: "cm19.2.3",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm19.2.3-p1",
              kind: "explain",
              title: "本章小结：水溶液 + 电",
              blocks: [
                { type: "text", html: "① 电离平衡：弱电解质部分电离、可逆（Ka 定性）。② Kw 只与温度有关；pH = −lg c(H⁺)（25℃ 中性 pH=7）。③ 盐类水解：有弱才水解、越弱越水解、谁强显谁性——兑现“酸碱中和不一定 pH=7”。④ Ksp：Qc>Ksp 析出；沉淀向更难溶转化。⑤ 原电池：电极反应式三守恒；充电=电解池。⑥ 电解：阳氧阴还；放电顺序。" }
              ],
              point: "cm10 的三个预告（pH 严格化、中和≠7、Na₂CO₃ 显碱性）全部兑现。下一页：本章习题。"
            },
            {
              id: "cm19.2.3-p2",
              kind: "quiz",
              title: "本章习题",
              questions: [
                {
                  type: "fill",
                  stemBefore: "0.001mol/L 盐酸的 pH=",
                  stemAfter: "。",
                  answer: "3",
                  accept: ["3.0"],
                  hint: "pH=−lgc(H⁺)",
                  tip: "c(H⁺)=10⁻³，pH=3。"
                },
                {
                  type: "choice",
                  stem: "CH₃COONa 溶液 pH？",
                  options: ["<7", ">7", "=7"],
                  answer: 1,
                  tip: "CH₃COO⁻ 水解显碱性——酸碱中和不一定 pH=7。"
                },
                {
                  type: "choice",
                  stem: "Qc < Ksp 时？",
                  options: ["析出沉淀", "不沉淀", "无法判断"],
                  answer: 1,
                  tip: "Qc<Ksp：还没饱和，不析出。"
                },
                {
                  type: "fill",
                  stemBefore: "电解时，阴离子先放电的是 S²⁻、I⁻、Br⁻、Cl⁻、OH⁻ 中的",
                  stemAfter: "。",
                  answer: "S²⁻",
                  accept: ["S2-", "硫离子"],
                  hint: "放电顺序",
                  tip: "S²⁻ > I⁻ > Br⁻ > Cl⁻ > OH⁻。"
                },
                {
                  type: "choice",
                  stem: "通过 2mol 电子，电解 CuCl₂ 溶液最多析出 Cu？",
                  options: ["32g", "64g", "128g"],
                  answer: 1,
                  tip: "Cu²⁺+2e⁻=Cu：2mol 电子 → 1mol Cu = 64g。"
                },
                {
                  type: "choice",
                  stem: "用 Na₂CO₃ 溶液去油污，原理是？",
                  options: ["Na₂CO₃ 是碱", "CO₃²⁻ 水解显碱性，去油污", "Na⁺ 的作用"],
                  answer: 1,
                  tip: "Na₂CO₃ 是盐：CO₃²⁻+H₂O ⇌ HCO₃⁻+OH⁻，碱性去油污。"
                }
              ],
              point: "水溶液平衡 + 电化学：cm10 的预告全部兑现——本章收官。"
            }
          ]
        }
      ]
    }
  ]
};
