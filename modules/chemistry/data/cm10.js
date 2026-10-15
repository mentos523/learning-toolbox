/* ============================================================
 * 学习工具箱 · 化学 · 第十章数据（蓝队 2026-10-15，阶段三批2）
 *
 * 章：cm10 酸·碱·盐（九下第十+十一单元）
 * 课：cm10.1.1 / cm10.1.2 / cm10.1.3 / cm10.2.1 / cm10.2.2 /
 *     cm10.2.3 / cm10.3.1 / cm10.3.2（8 课，24 页）
 * 依据：docs/chemistry-curriculum.md v1.1（cm10 课表）、
 *       docs/chemistry-pedagogy.md v1.1（cm10.1/cm10.2/cm10.3 单元策略）、
 *       docs/chemistry-interactions.md v1.1、真值口径 CHEM-XX。
 * Schema 沿用 data/cm05.js 文件头冻结版 v1.0。
 * 本批用到的组件类型：side-compare / safety-quiz / safety-badge /
 *   reaction-particle / ph-scale / read-gauge-chem（冻结清单，渲染器待增补）。
 * Y10 落点（D3 方案 B，+0 页）：cm10.2.3 pH 试纸读数并入第 3 页。
 * 关键口径：
 *   - T12 限定句上 cm10.1.3 讲解页正文（评审团裁决，原样上页）；
 *   - cm10.2.2 “酸碱中和一定 pH=7”重点纠偏（cm19.1.3 回填，附录 B 已登记）；
 *   - cm10.2.3 对数直观版：只讲“10 倍一格”，不讲 log 定义（代数 8.2 预告）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm10"] = {
  id: "cm10",
  units: [
    {
      id: "cm10.1",
      title: "酸",
      lessons: [
        {
          id: "cm10.1.1",
          title: "酸碱指示剂",
          prereq: "cm09.2.3 本章小结与习题",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：石蕊 vs 酚酞） ---------- */
            {
              id: "cm10.1.1-p1",
              kind: "interact",
              title: "石蕊 vs 酚酞",
              exploreTip: "左右对照点一点：酸、碱、中性，三种液体各变什么色？",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "石蕊 vs 酚酞：变色对照",
                    columns: ["石蕊试液", "酚酞试液"],
                    rows: [
                      { dim: "滴入酸性溶液", a: "变红", b: "不变色" },
                      { dim: "滴入碱性溶液", a: "变蓝", b: "变红" },
                      { dim: "滴入中性溶液", a: "不变色（仍为紫色）", b: "不变色（仍为无色）" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "石蕊：酸红碱蓝；酚酞：酸不变碱红——变色的是溶液。"
            },
            /* ---------- p2：讲解页（指示剂/变色规律） ---------- */
            {
              id: "cm10.1.1-p2",
              kind: "explain",
              title: "指示剂的使用",
              blocks: [
                { type: "lead", text: "上一页你点开了对照表：石蕊和酚酞，一个爱变红，一个爱“装没看见”——今天记住它们的脾气。" },
                { type: "text", html: "酸碱指示剂是能跟酸/碱溶液作用显示不同颜色的物质。石蕊：酸红碱蓝（中性仍为紫色）；酚酞：酸不变色、碱变红（中性仍为无色）。口诀：“石蕊酸红碱蓝，酚酞碱红酸不变”——注意酚酞遇酸是不变色，不是变红！" },
                { type: "text", html: "适用条件：指示剂只能定性判断酸碱性，测不出酸碱强弱——想知道“有多酸”，用 pH 试纸（cm10.2.3）。" },
                { type: "trap", text: "⚠ 别搞混：“变色的是指示剂”是错句——变色的是溶液！指示剂只是让溶液的颜色变化被我们看见。" }
              ],
              point: "石蕊酸红碱蓝，酚酞碱红；只能定性，不能定量。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm10.1.1-p3",
              kind: "quiz",
              title: "练一练：指示剂",
              questions: [
                {
                  type: "choice",
                  stem: "往某溶液中滴入酚酞试液，溶液变红，该溶液是",
                  options: ["酸性", "碱性", "中性"],
                  answer: 1,
                  tip: "酚酞：酸不变碱红——变红就是碱性。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["酚酞遇酸变红", "石蕊遇碱变蓝", "变色的是指示剂"],
                  answer: 1,
                  tip: "酚酞遇酸不变色；变色的是溶液，不是试剂本身。"
                }
              ],
              point: "过关了？记住：石蕊两头变，酚酞只认碱。"
            }
          ]
        },
        {
          id: "cm10.1.2",
          title: "常见的酸（上）",
          prereq: "cm10.1.1 酸碱指示剂",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（Y13：浓硫酸稀释安全闯关） ---------- */
            {
              id: "cm10.1.2-p1",
              kind: "interact",
              title: "闯关：稀释浓硫酸",
              exploreTip: "三道情景题：浓硫酸的脾气，错一步就告诉你。",
              widgets: [
                {
                  type: "safety-badge",
                  params: {
                    level: "danger",
                    text: "稀释浓硫酸：酸入水、沿器壁、慢倒、不断搅拌——水入酸会沸腾飞溅",
                    realityNote: "虚拟实验可重复试错；现实中浓硫酸操作必须在老师指导下进行，穿戴护目镜。"
                  }
                },
                {
                  type: "safety-quiz",
                  params: {
                    title: "浓硫酸安全闯关",
                    scenarios: [
                      {
                        scene: "要把浓硫酸稀释，你",
                        options: [{ id: "a", text: "把水倒入浓硫酸中" }, { id: "b", text: "把浓硫酸沿器壁慢慢倒入水中，不断搅拌" }],
                        correctId: "b",
                        warnText: "⚠ 水入酸会沸腾飞溅！浓硫酸溶于水放出大量热，水浮在上面瞬间沸腾。",
                        correctDo: "酸入水、沿器壁、慢倒、不断搅拌——让热量及时散开。"
                      },
                      {
                        scene: "浓硫酸不小心沾到皮肤上，你先",
                        options: [{ id: "a", text: "立刻用大量水冲洗" }, { id: "b", text: "先用干布拭去，再用大量水冲洗" }],
                        correctId: "b",
                        warnText: "⚠ 直接冲水，浓硫酸遇水放热会加重灼伤！",
                        correctDo: "先用干布拭去，再用大量水冲洗，最后涂碳酸氢钠溶液。"
                      },
                      {
                        scene: "打开浓盐酸瓶盖，瓶口冒出白雾，说明",
                        options: [{ id: "a", text: "浓盐酸有挥发性" }, { id: "b", text: "浓盐酸在燃烧" }],
                        correctId: "a",
                        warnText: "⚠ 白雾是挥发出来的 HCl 气体遇水蒸气形成的小液滴，不是燃烧。",
                        correctDo: "浓盐酸易挥发——用后盖紧瓶盖，密封保存。"
                      }
                    ],
                    noScore: true,
                    recordKey: "chm_safety_cm10.1.2"
                  }
                }
              ],
              point: "酸入水是铁律；沾皮肤先拭后冲；浓盐酸易挥发。"
            },
            /* ---------- p2：讲解页（浓硫酸三特性/稀释规范） ---------- */
            {
              id: "cm10.1.2-p2",
              kind: "explain",
              title: "浓硫酸的三特性",
              blocks: [
                { type: "lead", text: "上一页三关闯完——浓硫酸可不是“浓一点的硫酸”，它有三个“怪脾气”，稀硫酸全没有。" },
                { type: "text", html: "浓硫酸三特性：① 吸水性（可做干燥剂，干燥不与它反应的气体）；② 脱水性（把纸、蔗糖里的氢氧按水夺走，蔗糖变黑膨胀）；③ 强氧化性（与铜反应生成 SO₂，不是 H₂）。" },
                { type: "text", html: "稀释规范：酸入水、沿器壁、慢倒、不断搅拌。适用条件：这条规范只针对浓硫酸——稀硫酸稀释没这么危险，但好习惯通用。" },
                { type: "text", html: "浓盐酸：有挥发性（瓶口白雾），密封保存。洁厕灵的主要成分就是盐酸——生活里的“酸”，和实验室的是同一种脾气。" },
                { type: "trap", text: "⚠ 别搞混：浓硫酸沾皮肤直接用水冲是错的——先干布拭去，再大量水冲。顺序错了，灼伤加重。" }
              ],
              point: "浓硫酸：吸水、脱水、强氧化；稀释永远酸入水。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm10.1.2-p3",
              kind: "quiz",
              title: "练一练：常见的酸",
              questions: [
                {
                  type: "choice",
                  stem: "稀释浓硫酸时，正确操作是",
                  options: ["把水倒入浓硫酸", "把浓硫酸倒入水中并搅拌", "两者同时倒入烧杯"],
                  answer: 1,
                  tip: "酸入水、沿器壁、慢倒、搅拌——水入酸会沸腾飞溅。"
                },
                {
                  type: "choice",
                  stem: "下列不属于浓硫酸特性的是",
                  options: ["吸水性", "脱水性", "挥发性"],
                  answer: 2,
                  tip: "挥发性是浓盐酸的；浓硫酸的特性是吸水、脱水、强氧化性。"
                },
                {
                  type: "fill",
                  stemBefore: "打开浓盐酸瓶盖，瓶口的白雾说明浓盐酸有",
                  stemAfter: "性。",
                  answer: "挥发",
                  accept: ["挥发"],
                  hint: "HCl 气体跑出来了",
                  tip: "白雾 = 挥发的 HCl 遇水蒸气成小液滴——所以浓盐酸要密封保存。"
                }
              ],
              point: "过关了？记住：浓硫酸三特性，稀释酸入水。"
            }
          ]
        },
        {
          id: "cm10.1.3",
          title: "常见的酸（下）",
          prereq: "cm10.1.2 常见的酸（上）",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C7：Fe₂O₃ + 6HCl，铁锈溶解） ---------- */
            {
              id: "cm10.1.3-p1",
              kind: "interact",
              title: "看：铁锈消失了",
              exploreTip: "按 ▶ 看铁锈消失：黄色的溶液里有什么离子？",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "Fe₂O₃ + 6HCl = 2FeCl₃ + 3H₂O" },
                    particles: [
                      { id: "rust", kind: "molecule", label: "Fe₂O₃", charge: null, role: "reactant", count: 1 },
                      { id: "h", kind: "ion", label: "H", charge: "+1", role: "reactant", count: 6 },
                      { id: "cl", kind: "ion", label: "Cl", charge: "−1", role: "spectator", count: 6 },
                      { id: "fe3", kind: "ion", label: "Fe", charge: "+3", role: "product", count: 2 },
                      { id: "w", kind: "molecule", label: "H₂O", charge: null, role: "product", count: 3 }
                    ],
                    keyframes: [
                      { caption: "把铁锈放进稀盐酸：Fe₂O₃ 与 H⁺ 接触", moves: [{ id: "h", from: [15, 70], to: [50, 50] }] },
                      { caption: "铁锈逐渐溶解，溶液变黄——Fe³⁺ 生成了", form: [{ ids: ["rust", "h"], label: "Fe³⁺" }], fade: [] },
                      { caption: "Cl⁻ 只是旁观离子，全程“看戏”", fade: ["cl"] },
                      { caption: "数一数原子个数：Fe×2＝2、O×3＝3、H×6＝6、Cl×6＝6", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: true,
                    slowmo: true
                  }
                }
              ],
              point: "酸 + 金属氧化物 → 盐 + 水；H⁺ 是主角，Cl⁻ 旁观。"
            },
            /* ---------- p2：讲解页（酸的通性五条 + T12 限定句上正文） ---------- */
            {
              id: "cm10.1.3-p2",
              kind: "explain",
              title: "酸的通性：H⁺ 的性质",
              blocks: [
                { type: "lead", text: "上一页铁锈在稀盐酸里消失了——盐酸、硫酸、硝酸各不同，但有一套“通用本事”。" },
                { type: "text", html: "酸的化学性质五条：① 使指示剂变色；② 与活泼金属 → 盐 + H₂（如 Mg + 2HCl = MgCl₂ + H₂↑）；③ 与金属氧化物 → 盐 + 水（如 Fe₂O₃ + 6HCl = 2FeCl₃ + 3H₂O）；④ 与碱 → 盐 + 水；⑤ 与盐 → 新盐 + 新酸（如 CaCO₃ + 2HCl = CaCl₂ + H₂O + CO₂↑）。" },
                { type: "text", html: "微观上，（稀）酸的通性 = H⁺ 的性质——五条反应的主角都是 H⁺。限定：浓硫酸/浓硝酸有特性（强氧化性等），不属通性。比如浓硫酸与铜反应生成 SO₂ 而不是 H₂，稀酸的通性管不着它。" },
                { type: "trap", text: "⚠ 别搞混：只有浓盐酸、浓硝酸挥发；“酸的通性无条件”也是错的，浓酸特性单算。" }
              ],
              point: "酸五条，主角是 H⁺；浓硫酸/浓硝酸有特性，不属通性。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm10.1.3-p3",
              kind: "quiz",
              title: "练一练：酸的通性",
              questions: [
                {
                  type: "choice",
                  stem: "盐酸除铁锈的化学方程式是",
                  options: ["Fe₂O₃ + 6HCl = 2FeCl₃ + 3H₂O", "Fe + 2HCl = FeCl₂ + H₂↑", "Fe₂O₃ + 3H₂SO₄ = Fe₂(SO₄)₃ + 3H₂O"],
                  answer: 0,
                  tip: "铁锈是 Fe₂O₃（金属氧化物）——酸 + 金属氧化物 → 盐 + 水。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["浓硫酸与铜反应放出 H₂", "（稀）酸的通性是 H⁺ 的性质", "所有酸都有挥发性"],
                  answer: 1,
                  tip: "浓硫酸与铜生成 SO₂ 不是 H₂——这是特性，不属通性；挥发的只有浓盐酸/浓硝酸。"
                },
                {
                  type: "fill",
                  stemBefore: "CaCO₃ + 2HCl = CaCl₂ + H₂O + CO₂↑ 属于酸的通性第",
                  stemAfter: "条（填数字）。",
                  answer: "5",
                  accept: ["5", "五"],
                  hint: "酸 + 盐 → ？",
                  tip: "第五条：酸 + 盐 → 新盐 + 新酸——食醋除水垢也是这一条。"
                }
              ],
              point: "过关了？记住：酸五条看 H⁺，浓酸特性单算。"
            }
          ]
        }
      ]
    },
    {
      id: "cm10.2",
      title: "碱与中和",
      lessons: [
        {
          id: "cm10.2.1",
          title: "常见的碱",
          prereq: "cm10.1.3 常见的酸（下）",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：NaOH vs Ca(OH)₂） ---------- */
            {
              id: "cm10.2.1-p1",
              kind: "interact",
              title: "烧碱 vs 熟石灰",
              exploreTip: "左右对照：都是碱，脾气差在哪？",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "NaOH vs Ca(OH)₂",
                    columns: ["氢氧化钠 NaOH", "氢氧化钙 Ca(OH)₂"],
                    rows: [
                      { dim: "俗名", a: "烧碱、火碱、苛性钠", b: "熟石灰、消石灰" },
                      { dim: "溶解性", a: "易溶于水，溶解放热", b: "微溶于水" },
                      { dim: "特性", a: "潮解（吸收空气中水分）、强腐蚀性", b: "腐蚀性较弱" },
                      { dim: "用途", a: "炉具清洁剂、造纸", b: "改良酸性土壤、建筑" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "NaOH 强腐蚀、易潮解；Ca(OH)₂ 微溶——碱不都是可溶的。"
            },
            /* ---------- p2：讲解页（碱的通性四条/OH⁻/弱碱预告） ---------- */
            {
              id: "cm10.2.1-p2",
              kind: "explain",
              title: "碱的通性：OH⁻ 的性质",
              blocks: [
                { type: "lead", text: "上一页你对照了烧碱和熟石灰——一个霸道（强腐蚀、潮解），一个温和（微溶）。但它们有同一套“通用本事”。" },
                { type: "text", html: "碱的化学性质四条：① 使指示剂变色（石蕊变蓝、酚酞变红）；② 与非金属氧化物反应 → 盐 + 水（如 2NaOH + CO₂ = Na₂CO₃ + H₂O，NaOH 密封保存就是防它变质）；③ 与酸反应 → 盐 + 水；④ 与盐反应 → 新碱 + 新盐。" },
                { type: "text", html: "微观上，碱的通性 = OH⁻ 的性质。适用条件：氨水（NH₃·H₂O）是弱碱，只能部分产生 OH⁻——“弱”是什么意思，cm19 会讲透，这里先记住它不算强碱。" },
                { type: "trap", text: "⚠ 别搞混：“所有碱都可溶”是错的——Cu(OH)₂ 等难溶！“纯碱是碱”也是错的——Na₂CO₃ 是盐（溶液显碱性另有原因，cm19 回填）。" }
              ],
              point: "碱四条，主角是 OH⁻；难溶的碱也存在，纯碱是盐不是碱。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm10.2.1-p3",
              kind: "quiz",
              title: "练一练：碱的通性",
              questions: [
                {
                  type: "choice",
                  stem: "NaOH 固体要密封保存，原因是",
                  options: ["NaOH 有毒", "NaOH 易潮解，还能与空气中 CO₂ 反应", "NaOH 见光分解"],
                  answer: 1,
                  tip: "2NaOH + CO₂ = Na₂CO₃ + H₂O——敞口放，烧碱变纯碱。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["所有碱都易溶于水", "Cu(OH)₂ 难溶于水", "Na₂CO₃ 是碱"],
                  answer: 1,
                  tip: "Cu(OH)₂ 蓝色沉淀难溶；Na₂CO₃ 叫“纯碱”却是盐！"
                },
                {
                  type: "fill",
                  stemBefore: "2NaOH + CO₂ = Na₂CO₃ + H₂O 属于碱的通性第",
                  stemAfter: "条（填数字）。",
                  answer: "2",
                  accept: ["2", "二"],
                  hint: "碱 + 非金属氧化物 → ？",
                  tip: "第二条：碱 + 非金属氧化物 → 盐 + 水。"
                }
              ],
              point: "过关了？记住：碱四条看 OH⁻，难溶碱、纯碱是盐别搞混。"
            }
          ]
        },
        {
          id: "cm10.2.2",
          title: "中和反应",
          prereq: "cm10.2.1 常见的碱",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C7：中和实质 H⁺+OH⁻→H₂O） ---------- */
            {
              id: "cm10.2.2-p1",
              kind: "interact",
              title: "看：中和的实质",
              exploreTip: "按 ▶ 看中和的实质：谁和谁结合了？谁在旁观？",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "HCl + NaOH = NaCl + H₂O" },
                    particles: [
                      { id: "h", kind: "ion", label: "H", charge: "+1", role: "reactant", count: 1 },
                      { id: "oh", kind: "ion", label: "OH", charge: "−1", role: "reactant", count: 1 },
                      { id: "na", kind: "ion", label: "Na", charge: "+1", role: "spectator", count: 1 },
                      { id: "cl", kind: "ion", label: "Cl", charge: "−1", role: "spectator", count: 1 },
                      { id: "w", kind: "molecule", label: "H₂O", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "H⁺ 与 OH⁻ 相遇", moves: [{ id: "h", from: [20, 50], to: [50, 50] }, { id: "oh", from: [80, 50], to: [50, 50] }] },
                      { caption: "结合成水分子——这就是中和的实质", form: [{ ids: ["h", "oh"], label: "H₂O" }], fade: [] },
                      { caption: "Na⁺、Cl⁻ 只是旁观离子，全程“看戏”", fade: ["na", "cl"] },
                      { caption: "数一数原子个数：H×2＝2、O×1＝1", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: true,
                    slowmo: true
                  }
                }
              ],
              point: "中和的实质：H⁺ + OH⁻ = H₂O；旁观离子只是看客。"
            },
            /* ---------- p2：讲解页（中和反应/pH 突跃/“pH=7”纠偏） ---------- */
            {
              id: "cm10.2.2-p2",
              kind: "explain",
              title: "中和≠pH=7",
              blocks: [
                { type: "lead", text: "还记得吗？上一页 H⁺ 和 OH⁻ 结合成了水，Na⁺、Cl⁻ 全程旁观——中和的实质就这么简单。" },
                { type: "text", html: "中和反应：酸 + 碱 → 盐 + 水，实质 H⁺ + OH⁻ = H₂O。向盐酸滴加氢氧化钠，pH 从小于 7 上升穿过 7——突跃曲线在“恰好中和”处最陡。应用：胃药中和胃酸、熟石灰改良酸性土壤。" },
                { type: "text", html: "重点纠偏：“酸碱中和一定 pH=7”是错的！只有强酸与强碱恰好完全中和，pH 才等于 7；有弱酸/弱碱参与（如醋酸、氨水）时 pH ≠ 7——为什么，cm19.1.3 盐类水解时兑现。" },
                { type: "trap", text: "⚠ 别搞混：酚酞红色褪去就是现象——“中和无现象”是错的。" },
                { type: "mathlink", text: "数学呼应·奠基：代数 6.1 函数图像——pH 突跃曲线就是函数图像：横坐标是碱的滴加量，纵坐标是 pH，突跃点一目了然。" }
              ],
              point: "中和实质是 H⁺+OH⁻=H₂O；pH=7 只属于强酸强碱恰好中和。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm10.2.2-p3",
              kind: "quiz",
              title: "练一练：中和反应",
              questions: [
                {
                  type: "choice",
                  stem: "中和反应的实质是",
                  options: ["H⁺ + OH⁻ = H₂O", "酸 + 碱 = 盐 + 水（无实质）", "Na⁺ + Cl⁻ = NaCl"],
                  answer: 0,
                  tip: "Na⁺、Cl⁻ 只是旁观离子——主角永远是 H⁺ 和 OH⁻。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["酸碱中和后 pH 一定等于 7", "强酸与强碱恰好完全中和，pH = 7", "有弱酸参与的中和，pH 一定等于 7"],
                  answer: 1,
                  tip: "重点纠偏：pH=7 只属于强酸强碱恰好中和——弱酸/弱碱参与则 ≠7（cm19.1.3 回填）。"
                },
                {
                  type: "fill",
                  stemBefore: "用熟石灰改良酸性土壤，发生的是",
                  stemAfter: "反应。",
                  answer: "中和",
                  accept: ["中和"],
                  hint: "酸 + 碱 → ？",
                  tip: "酸性土壤 + Ca(OH)₂ → 盐 + 水——中和反应的生活版。"
                }
              ],
              point: "过关了？记住：实质是 H⁺+OH⁻，pH=7 有条件。"
            }
          ]
        },
        {
          id: "cm10.2.3",
          title: "pH 与溶液酸碱度",
          prereq: "cm10.2.2 中和反应",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C8：pH 标尺 + 10 倍条 + 试纸） ---------- */
            {
              id: "cm10.2.3-p1",
              kind: "interact",
              title: "拨标尺：pH 差 1 差 10 倍",
              exploreTip: "拖溶液到试纸，再拨 pH 滑块：看 c(H⁺) 怎么 10 倍 10 倍地跳。",
              widgets: [
                {
                  type: "ph-scale",
                  params: {
                    solutions: [
                      { name: "胃液", ph: 1 },
                      { name: "白醋", ph: 3 },
                      { name: "雨水", ph: 6 },
                      { name: "纯水", ph: 7 },
                      { name: "肥皂水", ph: 10 },
                      { name: "稀氢氧化钠溶液", ph: 13 }
                    ],
                    mode: "intuitive",
                    tenfoldViz: true
                  }
                }
              ],
              point: "pH 每差 1，c(H⁺) 差 10 倍——pH 是“浓度的密码”。"
            },
            /* ---------- p2：讲解页（对数直观版 + pH 标度 + 适用条件） ---------- */
            {
              id: "cm10.2.3-p2",
              kind: "explain",
              title: "pH：数量级的尺子",
              blocks: [
                { type: "lead", text: "还记得吗？上一页你把滑块从 3 拨到 4，c(H⁺) 的条子缩成了 1/10——pH 不是“厘米尺”，是“数量级尺”。" },
                { type: "text", html: "pH 标度常用 0–14：< 7 酸性、= 7 中性、> 7 碱性。适用条件：0–14 是常用范围，超浓酸 pH 可小于 0。" },
                { type: "text", html: "对数直观版：pH 每差 1，c(H⁺) 差 10 倍；差 2 差 100 倍。pH 是“压缩”过的尺子——不讲 log 定义，只记“10 倍一格”；学完代数 8.2 对数后回填 pH = −lg c(H⁺)。" },
                { type: "trap", text: "⚠ 别搞混：试纸测大概，精确用 pH 计；试纸不能伸入待测液——玻璃棒蘸取，点在试纸上对比色卡。" },
                { type: "mathlink", text: "数学呼应·预告：代数 8.2 对数——本页是“对数直观版”（10 倍一格，不讲 log 定义）；学完 8.2 后回填 pH = −lg c(H⁺)（cm19.1.2 兑现）。"
                }
              ],
              point: "pH 差 1 差 10 倍；0–14 是常用范围；试纸测大概。"
            },
            /* ---------- p3：交互页（生活 pH 谱 + Y10 pH 试纸读数并入，D3 +0 页） ---------- */
            {
              id: "cm10.2.3-p3",
              kind: "interact",
              title: "生活 pH 谱 + 试纸读数",
              exploreTip: "先读谱，再拿试纸和比色卡对一对：读出 pH 是几。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "生活 pH 谱",
                    columns: ["pH", "c(H⁺)"],
                    rows: [
                      { dim: "胃液", a: "≈ 1", b: "≈ 10⁻¹ mol/L（酸，帮助消化）" },
                      { dim: "白醋", a: "≈ 3", b: "≈ 10⁻³ mol/L" },
                      { dim: "雨水", a: "≈ 6", b: "正常雨水约 5.6（< 5.6 是酸雨）" },
                      { dim: "纯水", a: "= 7", b: "= 10⁻⁷ mol/L（中性）" },
                      { dim: "肥皂水", a: "≈ 10", b: "碱性（去油污就靠它）" }
                    ],
                    highlightDiff: true
                  }
                },
                {
                  type: "read-gauge-chem",
                  params: {
                    gauge: "ph-paper",
                    division: 1,
                    tolerance: 1,
                    estimateNext: false,
                    targetValue: "≈3",
                    recordKey: "chm_gauge_cm10.2.3"
                  }
                }
              ],
              point: "记住几个生活 pH：胃液酸、肥皂水碱；读数对准比色卡。"
            },
            /* ---------- p4：练习页 ---------- */
            {
              id: "cm10.2.3-p4",
              kind: "quiz",
              title: "练一练：pH",
              questions: [
                {
                  type: "choice",
                  stem: "pH = 3 的溶液与 pH = 5 的溶液，c(H⁺) 相差",
                  options: ["2 倍", "20 倍", "100 倍"],
                  answer: 2,
                  tip: "pH 差 2，差 10×10 = 100 倍——“10 倍一格”。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["pH = 0 的酸一定是最强的酸", "pH 试纸能测出精确的 pH", "超浓酸的 pH 可以小于 0"],
                  answer: 2,
                  tip: "0–14 是常用范围；试纸测大概，精确用 pH 计。"
                },
                {
                  type: "fill",
                  stemBefore: "用 pH 试纸测溶液酸碱度，正确的操作是用",
                  stemAfter: "蘸取待测液点在试纸上。",
                  answer: "玻璃棒",
                  accept: ["玻璃棒"],
                  hint: "不能把试纸伸进去",
                  tip: "玻璃棒蘸取——试纸伸入待测液会污染整瓶试剂。"
                }
              ],
              point: "过关了？记住：差 1 差 10 倍，试纸蘸取不伸入。"
            }
          ]
        },
        {
          id: "cm10.3.1",
          title: "生活中常见的盐与复分解反应",
          prereq: "cm10.2.3 pH 与溶液酸碱度",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：复分解能发生 vs 不能发生） ---------- */
            {
              id: "cm10.3.1-p1",
              kind: "interact",
              title: "复分解：看条件",
              exploreTip: "左右对照：能发生的，都有沉淀、气体或水。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "复分解：能发生 vs 不能发生",
                    columns: ["能发生", "不能发生"],
                    rows: [
                      { dim: "AgNO₃ + NaCl", a: "AgCl↓ 白色沉淀", b: "—" },
                      { dim: "Na₂CO₃ + 2HCl", a: "CO₂↑ 气体", b: "—" },
                      { dim: "NaCl + KNO₃", a: "—", b: "交换后仍是 NaNO₃ + KCl，无沉淀气体水" },
                      { dim: "条件", a: "沉淀/气体/水三者有其一", b: "三者全无，不反应" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "复分解条件：沉淀、气体、水，三者有其一，否则不反应。"
            },
            /* ---------- p2：讲解页（盐的性质/复分解/Na₂CO₃ 是盐） ---------- */
            {
              id: "cm10.3.1-p2",
              kind: "explain",
              title: "复分解反应",
              blocks: [
                { type: "lead", text: "上一页你对照了四组反应：能发生的都有沉淀、气体或水——这就是复分解反应的“入场券”。" },
                { type: "text", html: "复分解反应：两种化合物交换成分，生成另两种化合物。盐的化学性质：① 与金属 → 新金属 + 新盐；② 与酸；③ 与碱 → 新碱 + 新盐；④ 与盐。例：AgNO₃ + NaCl = AgCl↓ + NaNO₃；Na₂CO₃ + 2HCl = 2NaCl + H₂O + CO₂↑。" },
                { type: "text", html: "条件：沉淀/气体/水三者有其一——没有条件就没有复分解。常见盐：NaCl（食盐）、CaCO₃（大理石）、Na₂CO₃（纯碱，去油污）、NaHCO₃（小苏打，发面）。" },
                { type: "trap", text: "⚠ 别搞混：纯碱是盐不是碱！溶液显碱性另有原因（cm19.1.3 回填）。“复分解就是交换成分”没说条件，也是错句。" }
              ],
              point: "复分解 = 交换成分 + 三者有其一；纯碱是盐不是碱。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm10.3.1-p3",
              kind: "quiz",
              title: "练一练：复分解",
              questions: [
                {
                  type: "choice",
                  stem: "下列反应属于复分解反应的是",
                  options: ["C + 2CuO ＝高温＝ 2Cu + CO₂", "AgNO₃ + NaCl = AgCl↓ + NaNO₃", "Zn + H₂SO₄ = ZnSO₄ + H₂↑"],
                  answer: 1,
                  tip: "两种化合物交换成分 + 有沉淀——才是复分解。"
                },
                {
                  type: "choice",
                  stem: "NaCl + KNO₃ 不能发生复分解反应，原因是",
                  options: ["没有沉淀、气体或水生成", "都是盐", "需要加热"],
                  answer: 0,
                  tip: "交换成分后还是那几种离子——三者全无，不反应。"
                },
                {
                  type: "fill",
                  stemBefore: "Na₂CO₃ 俗称纯碱，但它属于",
                  stemAfter: "（填“酸/碱/盐”）。",
                  answer: "盐",
                  accept: ["盐"],
                  hint: "看成分：Na⁺ + CO₃²⁻",
                  tip: "由金属离子和酸根离子构成——是盐！溶液显碱性是水解（cm19.1.3 回填）。"
                }
              ],
              point: "过关了？记住：交换成分看条件，纯碱是盐。"
            }
          ]
        },
        {
          id: "cm10.3.2",
          title: "本章小结与习题",
          prereq: "cm10.3.1 生活中常见的盐与复分解反应",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：小结 + 梯度题 ---------- */
            {
              id: "cm10.3.2-p1",
              kind: "quiz",
              title: "小结：酸·碱·盐",
              questions: [
                {
                  type: "review",
                  html: "📝 <b>本章小结</b><br>① 酸五条（主角 H⁺）：指示剂/活泼金属/金属氧化物/碱/盐；浓硫酸、浓硝酸有特性，不属通性。<br>② 碱四条（主角 OH⁻）：指示剂/非金属氧化物/酸/盐；Cu(OH)₂ 难溶；纯碱是盐。<br>③ 中和反应实质 H⁺ + OH⁻ = H₂O；pH = 7 只属于强酸强碱恰好中和（弱酸/弱碱参与 ≠7，cm19.1.3 回填）。<br>④ pH：差 1 差 10 倍（对数直观版）；0–14 是常用范围；试纸蘸取、测大概。<br>⑤ 复分解：交换成分 + 沉淀/气体/水三者有其一。"
                },
                {
                  type: "choice",
                  stem: "下列物质中，属于盐的是",
                  options: ["NaOH", "Na₂CO₃", "Ca(OH)₂"],
                  answer: 1,
                  tip: "纯碱是盐！烧碱、熟石灰才是碱。"
                },
                {
                  type: "choice",
                  stem: "除去 NaCl 溶液中混有的少量 Na₂CO₃，宜选用的试剂是",
                  options: ["稀盐酸（适量）", "石灰水", "硝酸银溶液"],
                  answer: 0,
                  tip: "Na₂CO₃ + 2HCl = 2NaCl + H₂O + CO₂↑——适量盐酸除碳酸根，不引入新杂质。"
                }
              ],
              point: "小结过关？酸五条、碱四条、中和、pH、复分解，五件套记牢。"
            },
            /* ---------- p2：生活题 + 计算题 ---------- */
            {
              id: "cm10.3.2-p2",
              kind: "quiz",
              title: "生活中的化学 + 计算",
              questions: [
                {
                  type: "review",
                  html: "🏠 <b>生活中的化学</b>：蒸馒头时放小苏打，馒头松软多孔；炒菜时放醋，面团里的碱味消失。两个现象各是什么反应？<br><details><summary>思路提示</summary>小苏打受热放出什么气体？醋（醋酸）能和什么反应？</details><details><summary>关键步骤</summary>2NaHCO₃ ＝加热＝ Na₂CO₃ + H₂O + CO₂（气体使馒头多孔）；2CH₃COOH + Na₂CO₃ = 2CH₃COONa + H₂O + CO₂↑（复分解去碱味）。</details><details><summary>完整答案</summary>发面：小苏打受热分解放 CO₂；去碱味：醋酸与碳酸盐发生复分解。用到的原理：盐的性质（cm10.3.1）、中和反应（cm10.2.2）。</details>"
                },
                {
                  type: "review",
                  html: "🧮 <b>定量计算</b>：10g CaCO₃ 与足量稀盐酸反应，生成 CO₂ 多少克？<br>自查清单：方程式配平了吗？代入的是纯净物质量吗？单位写对了吗？<br><details><summary>思路提示</summary>先写配平的方程式，再找质量关系列比例式。</details><details><summary>关键步骤</summary>CaCO₃ + 2HCl = CaCl₂ + H₂O + CO₂↑；100 : 44 = 10g : x。</details><details><summary>完整答案</summary>x = 4.4g。守恒检查：Ca×1、C×1、O×5、H×2、Cl×2，原子守恒 ✓。用到的原理：化学方程式计算（cm05.2.1）+ 纯量法（cm08.2.2）。</details>"
                }
              ],
              point: "本章完。下章：化学与生活——初中化学毕业展。"
            }
          ]
        }
      ]
    }
  ]
};
