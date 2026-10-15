/* ============================================================
 * 学习工具箱 · 化学 · 第八章数据（蓝队 2026-10-15，阶段三批2）
 *
 * 章：cm08 金属与金属材料（九下第八单元）
 * 课：cm08.1.1 / cm08.1.2 / cm08.1.3 / cm08.2.1 / cm08.2.2 / cm08.2.3（6 课，17 页）
 * 依据：docs/chemistry-curriculum.md v1.1（cm08 课表）、
 *       docs/chemistry-pedagogy.md v1.1（cm08.1/cm08.2 单元策略）、
 *       docs/chemistry-interactions.md v1.1、真值口径 CHEM-XX。
 * Schema 沿用 data/cm05.js 文件头冻结版 v1.0。
 * 本批用到的组件类型：side-compare / reaction-particle / stoich-steps
 *   （冻结清单，渲染器待增补）。
 * 金属活动性顺序四边界（CHEM-AX01）当页显性化；↑ 只用于溶液中生成的气体。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm08"] = {
  id: "cm08",
  units: [
    {
      id: "cm08.1",
      title: "金属的性质",
      lessons: [
        {
          id: "cm08.1.1",
          title: "金属材料与合金",
          prereq: "cm07.2.2 清洁燃料",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：纯金属 vs 合金） ---------- */
            {
              id: "cm08.1.1-p1",
              kind: "interact",
              title: "纯铁 vs 钢：谁更硬",
              exploreTip: "左右对照：合金到底强在哪。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "纯金属 vs 合金",
                    columns: ["纯金属（如纯铁）", "合金（如钢）"],
                    rows: [
                      { dim: "成分", a: "只由一种金属组成", b: "金属与金属/非金属熔合而成" },
                      { dim: "硬度", a: "较软", b: "硬度大" },
                      { dim: "熔点", a: "较高", b: "熔点低" },
                      { dim: "抗腐蚀", a: "较差", b: "抗腐蚀能力强" },
                      { dim: "例子", a: "—", b: "生铁/钢、黄铜、硬铝" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "合金性能常优于纯金属——硬度大、熔点低、抗腐蚀。"
            },
            /* ---------- p2：讲解页（合金概念/常见合金/条件） ---------- */
            {
              id: "cm08.1.1-p2",
              kind: "explain",
              title: "合金：金属的“组队”",
              blocks: [
                { type: "lead", text: "上一页你点开了对照表：钢比纯铁硬得多、还更抗腐蚀——“组队”之后，金属变强了。" },
                { type: "text", html: "合金是金属与金属（或非金属）熔合而成的具有金属特性的物质。注意：合金是混合物！生铁和钢都是铁的合金（生铁含碳 2%–4.3%，钢含碳 0.03%–2%），黄铜是铜锌合金，硬铝是铝合金（飞机就用它，又轻又硬）。" },
                { type: "text", html: "合金的优越性：硬度大、熔点低、抗腐蚀能力强。适用条件：“不锈钢永不生锈”是错句——特定环境（如海水、强酸）中它仍会腐蚀，只是比普通钢强得多。" },
                { type: "trap", text: "⚠ 别搞混：“合金是混合物，所以性能差”是错的——恰恰相反，合金性能常优于组分金属。分类看“纯不纯”，性能看“结构怎么配”。" }
              ],
              point: "合金 = 金属组队（混合物）；性能常更优，但没有“永不腐蚀”。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm08.1.1-p3",
              kind: "quiz",
              title: "练一练：合金",
              questions: [
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["合金是纯净物", "合金是混合物，性能常优于纯金属", "不锈钢在任何环境下都不生锈"],
                  answer: 1,
                  tip: "合金是混合物；“永不生锈”是有条件的说法。"
                },
                {
                  type: "fill",
                  stemBefore: "生铁和钢都是铁的合金，它们含",
                  stemAfter: "量不同。",
                  answer: "碳",
                  accept: ["碳", "C"],
                  hint: "2%–4.3% vs 0.03%–2%",
                  tip: "生铁含碳高（2%–4.3%），钢含碳低（0.03%–2%）——含碳量决定硬度与韧性。"
                }
              ],
              point: "过关了？记住：合金是混合物，性能看“组队”效果。"
            }
          ]
        },
        {
          id: "cm08.1.2",
          title: "金属的化学性质（上）",
          prereq: "cm08.1.1 金属材料与合金",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C7：Zn + 稀硫酸，旁观离子淡出） ---------- */
            {
              id: "cm08.1.2-p1",
              kind: "interact",
              title: "看：锌把氢“换”出来",
              exploreTip: "按 ▶ 看锌把氢“换”出来：冒气泡的就是 H₂。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "Zn + H₂SO₄ = ZnSO₄ + H₂↑" },
                    particles: [
                      { id: "zn1", kind: "atom", label: "Zn", charge: null, role: "reactant", count: 1 },
                      { id: "h1", kind: "ion", label: "H", charge: "+1", role: "reactant", count: 2 },
                      { id: "so4", kind: "ion", label: "SO₄", charge: "−2", role: "spectator", count: 1 },
                      { id: "zn2", kind: "ion", label: "Zn", charge: "+2", role: "product", count: 1 },
                      { id: "h2", kind: "molecule", label: "H₂", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "Zn 把 H⁺ 中的 H“换”了出来", moves: [{ id: "zn1", from: [20, 50], to: [45, 50] }] },
                      { caption: "2 个 H⁺ 变成 H₂ 分子，冒出去了（H₂↑）", form: [{ ids: ["h1"], label: "H₂" }], fade: [] },
                      { caption: "Zn²⁺ 留在溶液里；SO₄²⁻ 只是旁观离子", fade: ["so4"] },
                      { caption: "数一数原子个数：Zn×1＝1、H×2＝2、S×1＝1、O×4＝4", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: true,
                    slowmo: true
                  }
                }
              ],
              point: "活泼金属 + 稀酸 → 盐 + H₂↑；SO₄²⁻ 只是旁观离子。"
            },
            /* ---------- p2：讲解页（与 O₂/与酸/置换反应） ---------- */
            {
              id: "cm08.1.2-p2",
              kind: "explain",
              title: "金属的两类反应",
              blocks: [
                { type: "lead", text: "上一页锌把氢“换”了出来——金属化学性质第一类就是“换”（置换）：" },
                { type: "text", html: "与氧气：2Mg + O₂ ＝点燃＝ 2MgO（剧烈），4Al + 3O₂ ＝点燃＝ 2Al₂O₃，Cu 加热变黑，Au 很难反应——越活泼越易反应。铝锅耐腐蚀靠表面致密的 Al₂O₃ 保护膜。" },
                { type: "text", html: "与酸：Mg + 2HCl = MgCl₂ + H₂↑（最快），Zn 次之，Fe 最慢；Cu、Ag 不能置换出氢。适用条件：稀盐酸/稀硫酸，氢前面的活泼金属。" },
                { type: "text", html: "这类反应叫置换反应：单质 + 化合物 → 新单质 + 新化合物。如 Zn + H₂SO₄ = ZnSO₄ + H₂↑（↑ 因 H₂ 从溶液里冒出）。" },
                { type: "trap", text: "⚠ 别搞混：Cu、Ag 不能与酸反应放 H₂；Fe + 稀盐酸生成 FeCl₂（+2 价），不是 FeCl₃。" }
              ],
              point: "金属 + O₂ 看活泼程度；金属 + 稀酸看“氢前氢后”；都是置换反应。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm08.1.2-p3",
              kind: "quiz",
              title: "练一练：金属与酸",
              questions: [
                {
                  type: "choice",
                  stem: "下列金属中，不能与稀盐酸反应放出 H₂ 的是",
                  options: ["Mg", "Zn", "Cu"],
                  answer: 2,
                  tip: "Cu 在氢后面——不活泼金属置换不出氢。"
                },
                {
                  type: "fill",
                  stemBefore: "Fe + 2HCl = FeCl₂ + H₂↑ 属于",
                  stemAfter: "反应。",
                  answer: "置换",
                  accept: ["置换"],
                  hint: "单质 + 化合物 → 新单质 + 新化合物",
                  tip: "置换反应：一种单质把另一种单质从化合物里“换”出来。"
                },
                {
                  type: "choice",
                  stem: "铝锅耐腐蚀的原因是",
                  options: ["铝不活泼", "表面有致密的 Al₂O₃ 保护膜", "铝是贵金属"],
                  answer: 1,
                  tip: "铝很活泼，但致密的氧化膜把它“封”住了。"
                }
              ],
              point: "过关了？记住：氢前能置氢，氢后干瞪眼。"
            }
          ]
        },
        {
          id: "cm08.1.3",
          title: "金属的化学性质（下）",
          prereq: "cm08.1.2 金属的化学性质（上）",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C7：Fe + CuSO₄ 经典置换） ---------- */
            {
              id: "cm08.1.3-p1",
              kind: "interact",
              title: "看：铁钉变红了",
              exploreTip: "按 ▶ 看经典置换：铁钉变红，溶液变浅。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "Fe + CuSO₄ = FeSO₄ + Cu" },
                    particles: [
                      { id: "fe", kind: "atom", label: "Fe", charge: null, role: "reactant", count: 1 },
                      { id: "cu2", kind: "ion", label: "Cu", charge: "+2", role: "reactant", count: 1 },
                      { id: "so4", kind: "ion", label: "SO₄", charge: "−2", role: "spectator", count: 1 },
                      { id: "fe2", kind: "ion", label: "Fe", charge: "+2", role: "product", count: 1 },
                      { id: "cu", kind: "atom", label: "Cu", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "铁钉放进硫酸铜溶液：Fe 把 Cu²⁺ 中的 Cu“换”了出来", moves: [{ id: "fe", from: [20, 50], to: [45, 50] }] },
                      { caption: "铁钉表面变红——铜被置换出来了；蓝色溶液变浅", form: [{ ids: ["cu2"], label: "Cu" }], fade: [] },
                      { caption: "SO₄²⁻ 是旁观离子；数一数：Fe×1＝1、Cu×1＝1", fade: ["so4"] }
                    ],
                    counter: true,
                    spectatorFade: true,
                    slowmo: true
                  }
                }
              ],
              point: "Fe + CuSO₄ = FeSO₄ + Cu——前面的金属，把后面的换出来。"
            },
            /* ---------- p2：讲解页（活动性顺序 + 四边界） ---------- */
            {
              id: "cm08.1.3-p2",
              kind: "explain",
              title: "金属活动性顺序",
              blocks: [
                { type: "lead", text: "上一页铁把铜换出来了——反过来，把铜片放进硫酸亚铁溶液，什么都不会发生。金属的“武力值”有个排名。" },
                { type: "text", html: "金属活动性顺序：K Ca Na Mg Al Zn Fe Sn Pb (H) Cu Hg Ag Pt Au。规律：前面的金属把后面的从盐溶液里置换出来（如 Fe + CuSO₄ = FeSO₄ + Cu；Cu + 2AgNO₃ = Cu(NO₃)₂ + 2Ag）。" },
                { type: "text", html: "适用四边界（缺一条就可能错）：① 在溶液中进行；② 只有前面的置换后面的；③ K、Ca、Na 太活泼，先与水反应，不置换；④ 盐必须是可溶的。" },
                { type: "trap", text: "⚠ 别搞混：拿金属活动性顺序解题前，先过四边界——“Fe + CuSO₄ 能反应”没错，但 “Na + CuSO₄ → Na₂SO₄ + Cu” 大错：Na 先跟水反应了！" }
              ],
              point: "顺序是排名，四边界是使用说明书——用前先过四条。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm08.1.3-p3",
              kind: "quiz",
              title: "练一练：活动性顺序",
              questions: [
                {
                  type: "choice",
                  stem: "下列反应能发生的是",
                  options: ["Cu + ZnSO₄ = Zn + CuSO₄", "Zn + CuSO₄ = ZnSO₄ + Cu", "Ag + CuSO₄ = Cu + Ag₂SO₄"],
                  answer: 1,
                  tip: "前面的换后面的：Zn 在 Cu 前面，能换；Cu、Ag 在后面，换不动。"
                },
                {
                  type: "choice",
                  stem: "把 Na 放进 CuSO₄ 溶液中，现象是",
                  options: ["置换出红色铜", "Na 先与水反应，有气体放出", "无明显现象"],
                  answer: 1,
                  tip: "四边界③：K、Ca、Na 太活泼，先与水反应——顺序表在这里“失效”。"
                },
                {
                  type: "fill",
                  stemBefore: "Cu + 2AgNO₃ = Cu(NO₃)₂ + 2Ag 说明 Cu 比 Ag",
                  stemAfter: "（填“活泼”或“不活泼”）。",
                  answer: "活泼",
                  accept: ["活泼"],
                  hint: "谁把谁换出来了？",
                  tip: "Cu 把 Ag 换出来了——前面的金属更活泼。"
                }
              ],
              point: "过关了？记住：排名 + 四边界，缺一不可。"
            }
          ]
        }
      ]
    },
    {
      id: "cm08.2",
      title: "金属资源",
      lessons: [
        {
          id: "cm08.2.1",
          title: "金属资源的利用和保护",
          prereq: "cm08.1.3 金属的化学性质（下）",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：三试管对照） ---------- */
            {
              id: "cm08.2.1-p1",
              kind: "interact",
              title: "三试管：找生锈的凶手",
              exploreTip: "对照三试管：生锈的那支，和另两支差在哪？",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "铁生锈条件：三试管对照",
                    columns: ["②号试管（生锈）", "①③号试管（不生锈）"],
                    rows: [
                      { dim: "水", a: "有", b: "①无（干燥剂吸水）/ ③有" },
                      { dim: "氧气", a: "有", b: "①有 / ③无（植物油隔绝空气）" },
                      { dim: "几天后", a: "铁钉生锈", b: "铁钉不生锈" },
                      { dim: "结论", a: "水 + 氧气同时存在才生锈", b: "缺水或缺氧，都不锈" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "铁生锈 = 水 + 氧气，缺一不可——这是化学变化。"
            },
            /* ---------- p2：讲解页（高炉炼铁/生锈/防锈） ---------- */
            {
              id: "cm08.2.1-p2",
              kind: "explain",
              title: "炼铁与防锈",
              blocks: [
                { type: "lead", text: "还记得吗？上一页三试管判了案：水和氧气是铁生锈的“共犯”，缺一个都不行。" },
                { type: "text", html: "高炉炼铁：Fe₂O₃ + 3CO ＝高温＝ 2Fe + 3CO₂。用 CO 的还原性把铁还原出来——和 C 还原 CuO 同一招。" },
                { type: "text", html: "铁锈的主要成分是 Fe₂O₃·xH₂O，是新物质——铁生锈是化学变化（红线辨析③：分子种类变了）。防锈就是破坏生锈条件：刷漆、镀锌（隔绝水和氧气）、制成不锈钢（合金化）、保持干燥。" },
                { type: "trap", text: "⚠ 别搞混：暖宝宝发热、月饼里的脱氧剂（铁粉），用的正是“铁生锈放热、耗氧气”——生锈这个“坏事”，用对地方就是好事。" },
                { type: "mathlink", text: "数学呼应·奠基：代数 ch01 方程——高炉炼铁的定量计算（多少矿石出多少铁），就是列方程解应用题，下一课亲手算。" }
              ],
              point: "炼铁是还原，防锈是隔绝；生锈是化学变化，条件是水 + 氧气。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm08.2.1-p3",
              kind: "quiz",
              title: "练一练：生锈与防锈",
              questions: [
                {
                  type: "choice",
                  stem: "铁生锈是",
                  options: ["物理变化", "化学变化", "既不是物理变化也不是化学变化"],
                  answer: 1,
                  tip: "铁锈 Fe₂O₃·xH₂O 是新物质——判据：分子种类变没变。"
                },
                {
                  type: "choice",
                  stem: "下列防锈方法中，原理属于“隔绝氧气和水”的是",
                  options: ["制成不锈钢", "自行车链条涂油", "用钛合金代替"],
                  answer: 1,
                  tip: "涂油 = 隔绝水和氧气；制成合金是改变内部结构。"
                },
                {
                  type: "fill",
                  stemBefore: "高炉炼铁的化学方程式：Fe₂O₃ + 3CO",
                  stemAfter: "2Fe + 3CO₂。",
                  answer: "＝高温＝",
                  accept: ["=高温=", "高温", "＝高温＝"],
                  hint: "条件标等号上下",
                  tip: "高温标在等号上下：＝高温＝。CO 在这里做还原剂。"
                }
              ],
              point: "过关了？记住：生锈要水和氧气，防锈就拆它俩。"
            }
          ]
        },
        {
          id: "cm08.2.2",
          title: "金属的化学计算",
          prereq: "cm08.2.1 金属资源的利用和保护",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（Y12：Zn + 2HCl 计算分步） ---------- */
            {
              id: "cm08.2.2-p1",
              kind: "interact",
              title: "分步算：锌和酸",
              exploreTip: "一步一步填：设/写/找/列/解/答，顺序错了全错。",
              widgets: [
                {
                  type: "stoich-steps",
                  params: {
                    title: "6.5g Zn 与足量稀盐酸反应，生成 H₂ 多少克？",
                    steps: [
                      { key: "设", prompt: "设生成 H₂ 的质量为 x", hint: "未知量设 x，带单位" },
                      { key: "写", prompt: "写出配平的化学方程式", hint: "Zn + 2HCl = ZnCl₂ + H₂↑（先配平！）" },
                      { key: "找", prompt: "找出已知量与未知量的质量关系", hint: "65 : 2 = 6.5g : x（Zn 相对原子质量 65）" },
                      { key: "列", prompt: "列比例式", hint: "65/2 = 6.5g/x" },
                      { key: "解", prompt: "解出 x", hint: "x = 0.2g" },
                      { key: "答", prompt: "答", hint: "生成氢气 0.2g（3 位有效数字）" }
                    ],
                    checkTable: {
                      "写": "Zn + 2HCl = ZnCl₂ + H₂↑",
                      "找": "65:2=6.5g:x",
                      "解": "0.2g"
                    },
                    foldLevels: 3,
                    sigFig: 3,
                    recordKey: "chm_stoich_cm08.2.2"
                  }
                }
              ],
              point: "计算六步：设写找列解答；“写”（配平）在“列”前面。"
            },
            /* ---------- p2：讲解页（纯量法/限量判断） ---------- */
            {
              id: "cm08.2.2-p2",
              kind: "explain",
              title: "纯量法与限量",
              blocks: [
                { type: "lead", text: "上一页你一步一步算出了 0.2g——但有两道“暗坑”，专坑不细心的人。" },
                { type: "text", html: "纯量法：代入方程式的必须是纯净物的质量。10g 锌铜合金里的锌不是 10g——先算出锌的质量，再代入。把合金总质量直接代入，是计算第一大错（红线辨析②：系数比不是质量比，更不是“总质量比”）。" },
                { type: "text", html: "限量判断：两种反应物都给出质量时，先判谁先用完（限量反应物），产量由它定。适用条件：“足量”“适量”字眼别漏看——“足量”就是告诉你不用判限量。" },
                { type: "trap", text: "⚠ 别搞混：气体体积不能直接代入方程式——方程式是质量关系，先换算成质量再算（cm05.2.2 回填）。" }
              ],
              point: "纯量代入，限量先判；气体先换算成质量。"
            },
            /* ---------- p3：练习页（自查清单 + 混合物计算） ---------- */
            {
              id: "cm08.2.2-p3",
              kind: "quiz",
              title: "练一练：金属计算",
              questions: [
                {
                  type: "review",
                  html: "✅ <b>计算自查清单</b>：方程式配平了吗？代入的是纯净物质量吗？单位写对了吗？有效数字合理吗？系数比当成质量比了吗？"
                },
                {
                  type: "choice",
                  stem: "用含杂质的锌粒与稀硫酸反应求 H₂ 质量，代入方程式的应该是",
                  options: ["锌粒的总质量", "锌粒中纯锌的质量", "稀硫酸的质量"],
                  answer: 1,
                  tip: "纯量法：只把纯净物质量代入方程式——杂质不参加反应。"
                },
                {
                  type: "fill",
                  stemBefore: "10g Fe/Cu 混合物与足量稀硫酸反应，生成 H₂ 0.2g，则混合物中 Cu 的质量分数是",
                  stemAfter: "%。",
                  answer: "44",
                  accept: ["44", "44%"],
                  hint: "Cu 不与稀硫酸反应",
                  tip: "Fe + H₂SO₄ = FeSO₄ + H₂↑：56:2 = m:0.2g → m(Fe)=5.6g；Cu = 4.4g；4.4/10 = 44%。"
                }
              ],
              point: "过关了？记住：纯量代入是铁律，自查清单是习惯。"
            }
          ]
        },
        {
          id: "cm08.2.3",
          title: "本章小结与习题",
          prereq: "cm08.2.2 金属的化学计算",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：小结 + 梯度题 ---------- */
            {
              id: "cm08.2.3-p1",
              kind: "quiz",
              title: "小结：金属",
              questions: [
                {
                  type: "review",
                  html: "📝 <b>本章小结</b><br>① 合金是混合物，性能常优于纯金属（硬度大、熔点低、抗腐蚀）。<br>② 金属化学性质：与 O₂（看活泼程度）、与稀酸（氢前置换 H₂）、与盐溶液（前换后）。<br>③ 金属活动性顺序：K Ca Na Mg Al Zn Fe Sn Pb (H) Cu Hg Ag Pt Au；使用前过四边界（溶液中、前换后、KCaNa 先与水、盐须可溶）。<br>④ 铁生锈条件：水 + 氧气（化学变化）；防锈 = 隔绝水和氧气。<br>⑤ 计算：纯量法 + 限量判断 + 自查清单。"
                },
                {
                  type: "choice",
                  stem: "下列反应能发生的是",
                  options: ["Fe + ZnSO₄ = Zn + FeSO₄", "Cu + 2AgNO₃ = Cu(NO₃)₂ + 2Ag", "Na + CuSO₄ = Cu + Na₂SO₄"],
                  answer: 1,
                  tip: "Fe 在 Zn 后面换不动；Na 先与水反应——四边界③。"
                },
                {
                  type: "choice",
                  stem: "下列防锈措施中，原理不同于其他三项的是",
                  options: ["自行车架刷漆", "铁锅用后擦干", "菜刀用后涂油", "制成不锈钢"],
                  answer: 3,
                  tip: "前三项都是隔绝水和氧气；制成合金是改变内部结构。"
                }
              ],
              point: "小结过关？排名、四边界、生锈条件，三件套记牢。"
            },
            /* ---------- p2：生活题 + 计算题 ---------- */
            {
              id: "cm08.2.3-p2",
              kind: "quiz",
              title: "生活中的化学 + 计算",
              questions: [
                {
                  type: "review",
                  html: "🏠 <b>生活中的化学</b>：月饼包装里的“脱氧剂”（小袋铁粉）能防止月饼变质，原理是什么？<br><details><summary>思路提示</summary>铁粉在里面“吃”掉了什么？跟生锈条件对照一下。</details><details><summary>关键步骤</summary>铁粉生锈需要水和氧气——它把包装里的氧气“吃”掉，月饼就不易被氧化变质。</details><details><summary>完整答案</summary>脱氧剂利用铁生锈消耗氧气（水 + 氧气 → Fe₂O₃·xH₂O），制造无氧环境。用到的原理：铁生锈条件（cm08.2.1，第 13 页）。</details>"
                },
                {
                  type: "review",
                  html: "🧮 <b>定量计算</b>：1000g 含 Fe₂O₃ 80% 的赤铁矿，理论上可炼得铁多少克？<br>自查清单：方程式配平了吗？代入的是纯净物质量吗？单位写对了吗？<br><details><summary>思路提示</summary>先算纯 Fe₂O₃ 的质量，再按方程式列比例式。</details><details><summary>关键步骤</summary>Fe₂O₃ + 3CO ＝高温＝ 2Fe + 3CO₂；m(Fe₂O₃) = 800g；160 : 112 = 800g : x。</details><details><summary>完整答案</summary>x = 560g。守恒检查：Fe×2、O×6、C×3，原子守恒 ✓。用到的原理：纯量法（cm08.2.2）。</details>"
                }
              ],
              point: "本章完。下章：溶液——初中定量的第二高峰。"
            }
          ]
        }
      ]
    }
  ]
};
