/* ============================================================
 * 学习工具箱 · 化学 · 第十三章数据（蓝队 2026-10-15，批3 cm12–cm16）
 * 钠·氯·铁与物质的量：n—N—m—V—c；Na/Cl₂/Fe 及其化合物
 *
 * Schema 冻结版 v1.0（见 data/cm05.js 头注释，全批复用）。
 * 组件口径见 docs/chemistry-interactions.md v1.1。
 * Y12 stoich-steps：分步填空查表校验（设/写/找/列/解/答），答案三级折叠；
 *   recordKey 冻结格式 chm_stoich_<课号>。
 * T4 边界句（跃升 7）原样上页见 cm13.1.1-p2。
 * 化学用语铁律：方程式用 ＝（可逆 ⇌）；条件标等号上下；↑↓ 规范；
 * 气体摩尔体积 22.4 L/mol 必配"标准状况（0℃、101kPa）"声明（CHEM-R17）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm13"] = {
  id: "cm13",
  units: [
    {
      id: "cm13.1",
      title: "物质的量",
      lessons: [
        {
          id: "cm13.1.1",
          title: "物质的量（上）",
          prereq: "cm12.2.2 氧化还原反应（下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm13.1.1-p1",
              kind: "interact",
              title: "一堆'和'个数'互推",
              exploreTip: "一步一步填：先写公式 n＝N/N_A，再代数。",
              widgets: [
                {
                  type: "stoich-steps",
                  params: {
                    title: "1.204×10²⁴ 个水分子，是几 mol？",
                    steps: [
                      { key: "设", prompt: "设水分子的物质的量为 x", hint: "未知量设 x，带单位 mol" },
                      { key: "写", prompt: "写出公式", hint: "n ＝ N / N_A" },
                      { key: "找", prompt: "找出已知量", hint: "N ＝ 1.204×10²⁴，N_A ＝ 6.02×10²³ mol⁻¹" },
                      { key: "列", prompt: "列式", hint: "x ＝ 1.204×10²⁴ / 6.02×10²³" },
                      { key: "解", prompt: "解出 x", hint: "" },
                      { key: "答", prompt: "答", hint: "别忘单位 mol" }
                    ],
                    checkTable: { "解": "2 mol" },
                    foldLevels: 3,
                    sigFig: 3,
                    recordKey: "chm_stoich_cm13.1.1"
                  }
                }
              ],
              point: "n 是'多少堆'，N 是'多少个'——mol 是数出来的，不是称出来的。"
            },
            {
              id: "cm13.1.1-p2",
              kind: "explain",
              title: "mol：一堆的学名",
              blocks: [
                { type: "lead", text: "一打 = 12 个。化学里也有'一堆'，学名叫 mol。" },
                { type: "text", html: "'一打'是生活约定 12 个；'1 mol'是 6.02×10²³ 个，'一堆有多大'跟 12 克碳-12 挂钩。mol 是'数'的单位，不是'称'的单位——看到 mol，先问'多少个粒子'，别问'多重'。" },
                { type: "text", html: "6.02×10²³ 有多大？一滴水约 0.05g，含 1.67×10²¹ 个水分子——才 0.0028 mol。如果每秒数 1 个，数完 1 mol 要 1.9×10¹⁶ 年。" },
                { type: "trap", text: "⚠ 别搞混：摩尔是'质量单位'？mol 是物质的量的单位！阿伏加德罗常数是 6.02×10²³ mol⁻¹——单位不能丢。" }
              ],
              point: "mol 是'数'出来的：1 mol = 6.02×10²³ 个——'一堆'有多大，跟 12 克碳-12 挂钩。"
            },
            {
              id: "cm13.1.1-p3",
              kind: "explain",
              title: "'堆'思想",
              blocks: [
                { type: "lead", text: "'堆'是化学的计量中枢：微观粒子数和宏观可称量，靠'堆'连起来了。" },
                { type: "text", html: "n = N / N_A：N 是'多少个'，n 是'多少堆'。后面还会学：n = m / M（堆 ↔ 质量）、n = V / V_m（堆 ↔ 体积）、c = n / V（堆 ↔ 浓度）——n 是中转站。" },
                { type: "oldfriend", text: "（就是你 cm05.2.1 玩过的系数比 = 粒子数比：2H₂ + O₂ ＝点燃＝ 2H₂O 里，'2∶1∶2'既是粒子数比，也是'堆数'比——mol 就是给'粒子数'起的堆名。）" },
                { type: "mathlink", text: "直观版（数量级/科学记数法）：6.02×10²³ 的'10²³'就是数量级的语言。" }
              ],
              point: "n 是中枢：个数、质量、体积、浓度，都通过 n 互推。"
            },
            {
              id: "cm13.1.1-p4",
              kind: "quiz",
              title: "自测：mol 是什么",
              questions: [
                {
                  type: "choice",
                  stem: "mol 是什么的单位？",
                  options: ["质量", "物质的量", "体积", "粒子个数"],
                  answer: 1,
                  tip: "mol 是物质的量的单位——'数'的单位，不是'称'的单位。"
                },
                {
                  type: "choice",
                  stem: "阿伏加德罗常数的值和单位是（  ）",
                  options: ["6.02×10²³", "6.02×10²³ mol⁻¹", "6.02×10²³ g", "6.02×10²³ 个"],
                  answer: 1,
                  tip: "6.02×10²³ mol⁻¹——单位不能丢！'个'不是单位。"
                },
                {
                  type: "fill",
                  stemBefore: "3.01×10²³ 个 O₂ 分子，物质的量是",
                  stemAfter: " mol。",
                  answer: "0.5 mol",
                  accept: ["0.5mol", "0.5"],
                  hint: "n ＝ N / N_A",
                  tip: "n ＝ 3.01×10²³ / 6.02×10²³ ＝ 0.5 mol。"
                }
              ],
              point: "过关了？记住这句：看到 mol，先问'多少个粒子'。"
            }
          ]
        },
        {
          id: "cm13.1.2",
          title: "物质的量（下）",
          prereq: "cm13.1.1 物质的量（上）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm13.1.2-p1",
              kind: "interact",
              title: "三公式换算闯关",
              exploreTip: "n=m/M 求出'堆数'，再用 c=n/V 求浓度——两步走。",
              widgets: [
                {
                  type: "stoich-steps",
                  params: {
                    title: "11.7g NaCl 配成 0.5L 溶液，浓度是多少？",
                    steps: [
                      { key: "设", prompt: "设 NaCl 的物质的量为 n，溶液浓度为 c", hint: "两个未知量，分两步" },
                      { key: "写", prompt: "写出公式", hint: "n ＝ m / M；c ＝ n / V" },
                      { key: "找", prompt: "找出已知量", hint: "m ＝ 11.7g，M(NaCl) ＝ 58.5g/mol，V ＝ 0.5L" },
                      { key: "列", prompt: "列式", hint: "n ＝ 11.7 / 58.5 ＝ 0.2 mol；c ＝ 0.2 / 0.5" },
                      { key: "解", prompt: "解出 c", hint: "" },
                      { key: "答", prompt: "答", hint: "浓度单位 mol/L，别忘" }
                    ],
                    checkTable: { "解": "0.4 mol/L" },
                    foldLevels: 3,
                    sigFig: 3,
                    recordKey: "chm_stoich_cm13.1.2"
                  }
                }
              ],
              point: "m → n → c：n 是中转站——先把质量换成'堆数'，再算浓度。"
            },
            {
              id: "cm13.1.2-p2",
              kind: "explain",
              title: "n—m—V—c",
              blocks: [
                { type: "lead", text: "上一页你走了两步：质量 → 堆数 → 浓度。三公式一次讲清，外加一个'认旧友'。" },
                { type: "text", html: "<b>摩尔质量</b>：1 mol 物质的质量，单位是 g/mol，数值上等于该物质的相对分子质量（不是 g！）。" },
                { type: "text", html: "n = m / M：M 是摩尔质量，单位 g/mol（不是 g！）。n = V / V_m：V_m 是气体摩尔体积，标准状况（0℃、101kPa）下 22.4 L/mol——'标准状况'四个字不能丢！c = n / V：单位 mol/L。" },
                { type: "physicslink", text: "物理呼应：物理 p06.1.3 大气压强——标准状况的 101kPa 就是 1 个标准大气压；“标准状况”四个字不能丢。" },
                { type: "oldfriend", text: "（还记得 cm05.2.1 的有效数字直观版吗？规则一样：计算结果的有效数字与测量精度匹配，不编造精度。）" },
                { type: "trap", text: "⚠ 别搞混：气体摩尔体积无条件用 22.4？限标准状况（0℃、101kPa）！常温常压不是。M 的单位写 g？是 g/mol。" }
              ],
              point: "公式先问'条件'：22.4 L/mol 只认标准状况——条件不对，公式不用。"
            },
            {
              id: "cm13.1.2-p3",
              kind: "quiz",
              title: "自测：条件与单位",
              questions: [
                {
                  type: "choice",
                  stem: "22.4 L/mol 能用的条件是（  ）",
                  options: ["任何时候", "标准状况（0℃、101kPa）", "常温常压", "溶液中"],
                  answer: 1,
                  tip: "气体摩尔体积 22.4 L/mol 限标准状况（0℃、101kPa）——常温常压（约 25℃）不是！"
                },
                {
                  type: "choice",
                  stem: "摩尔质量的单位是（  ）",
                  options: ["g", "g/mol", "mol", "mol/L"],
                  answer: 1,
                  tip: "M 的单位是 g/mol——'每摩尔多少克'。"
                },
                {
                  type: "fill",
                  stemBefore: "标准状况下，4.48L O₂ 的物质的量是",
                  stemAfter: " mol。",
                  answer: "0.2 mol",
                  accept: ["0.2mol", "0.2"],
                  hint: "n ＝ V / V_m",
                  tip: "n ＝ 4.48 / 22.4 ＝ 0.2 mol（标准状况才能用 22.4）。"
                }
              ],
              point: "22.4 认标准状况，g/mol 认摩尔质量——条件和单位，一对都不能错。"
            }
          ]
        },
        {
          id: "cm13.1.3",
          title: "以物质的量为中心的计算",
          prereq: "cm13.1.2 物质的量（下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm13.1.3-p1",
              kind: "interact",
              title: "用'堆数'算化学方程式",
              exploreTip: "先把质量换成 mol，再看系数比——'堆数'比直接好算。",
              widgets: [
                {
                  type: "stoich-steps",
                  params: {
                    title: "4g H₂ 完全燃烧，需要 O₂ 多少克？",
                    steps: [
                      { key: "设", prompt: "设需要 O₂ 的质量为 x", hint: "未知量设 x" },
                      { key: "写", prompt: "写出配平的化学方程式", hint: "2H₂ + O₂ ＝点燃＝ 2H₂O（先配平！）" },
                      { key: "找", prompt: "找出'堆数'关系", hint: "n(H₂) ＝ 4/2 ＝ 2 mol；系数比 H₂∶O₂ ＝ 2∶1 ＝ 物质的量比" },
                      { key: "列", prompt: "列式", hint: "n(O₂) ＝ 1 mol；x ＝ 1 × 32" },
                      { key: "解", prompt: "解出 x", hint: "" },
                      { key: "答", prompt: "答", hint: "别忘单位 g" }
                    ],
                    checkTable: { "解": "32g" },
                    foldLevels: 3,
                    sigFig: 3,
                    recordKey: "chm_stoich_cm13.1.3"
                  }
                }
              ],
              point: "系数比 = 物质的量比——方程式里的'2∶1'，就是'堆数'比。"
            },
            {
              id: "cm13.1.3-p2",
              kind: "explain",
              title: "三比联动",
              blocks: [
                { type: "lead", text: "2H₂ + O₂ ＝点燃＝ 2H₂O 里，'2∶1∶2'有三层意思，一次讲透。" },
                { type: "oldfriend", text: "认旧友：还记得 cm05.2.1 的系数比吗？那里的“245∶96 = 49g∶x”是质量比——今天的 2∶1∶2 是“堆数”比（物质的量比），红线辨析②在此严格化。" },
                { type: "text", html: "计量数比 = 粒子数比 = 物质的量比。2H₂ + O₂ ＝点燃＝ 2H₂O：2 个 H₂ 分子与 1 个 O₂ 分子反应 → 2 mol H₂ 与 1 mol O₂ 反应。'堆数'比直接读系数。" },
                { type: "text", html: "但它不是质量比！质量比 = 系数比 × 摩尔质量比：H₂∶O₂∶H₂O = (2×2)∶(1×32)∶(2×18) = 4∶32∶36。红线辨析②严格化：把系数直接当质量用，是计算第一大错。" },
                { type: "trap", text: "⚠ 计算第一大错：系数比 = 质量比！2H₂ + O₂ 里 H₂ 与 O₂ 的质量比是 4∶32 = 1∶8，不是 2∶1。" }
              ],
              point: "系数比是'堆数'比，不是质量比——算质量，先乘摩尔质量。"
            },
            {
              id: "cm13.1.3-p3",
              kind: "quiz",
              title: "自测：三比",
              questions: [
                {
                  type: "choice",
                  stem: "2H₂ + O₂ ＝点燃＝ 2H₂O 中，H₂ 与 O₂ 的物质的量之比是（  ）",
                  options: ["2∶1", "1∶8", "4∶32", "1∶1"],
                  answer: 0,
                  tip: "系数比 = 物质的量比：2∶1。1∶8 是质量比，别串了。"
                },
                {
                  type: "choice",
                  stem: "2H₂ + O₂ ＝点燃＝ 2H₂O 中，H₂ 与 O₂ 的质量比是（  ）",
                  options: ["2∶1", "1∶8", "1∶16", "4∶36"],
                  answer: 1,
                  tip: "质量比 = 系数比 × 摩尔质量比 = (2×2)∶(1×32) = 4∶32 = 1∶8。"
                },
                {
                  type: "fill",
                  stemBefore: "2H₂ + O₂ ＝点燃＝ 2H₂O 中，参加反应的 H₂ 与生成 H₂O 的分子个数比是",
                  stemAfter: "。",
                  answer: "1:1",
                  accept: ["1∶1", "1比1"],
                  hint: "看系数",
                  tip: "系数比 = 粒子个数比：2∶2 = 1∶1。"
                }
              ],
              point: "'堆数'比看系数，质量比要乘摩尔质量——两道选择题就是红线辨析②。"
            }
          ]
        }
      ]
    },
    {
      id: "cm13.2",
      title: "钠与氯",
      lessons: [
        {
          id: "cm13.2.1",
          title: "钠及其化合物",
          prereq: "cm13.1.3 以物质的量为中心的计算",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm13.2.1-p1",
              kind: "interact",
              title: "钠与水：浮熔游响红",
              exploreTip: "慢放看五个现象：浮、熔、游、响、红——每个背后都有原因。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "2Na + 2H₂O ＝ 2NaOH + H₂↑" },
                    particles: [
                      { id: "na", kind: "atom", label: "Na", charge: null, role: "reactant", count: 2 },
                      { id: "h2o", kind: "molecule", label: "H₂O", charge: null, role: "reactant", count: 2 },
                      { id: "naoh", kind: "molecule", label: "NaOH", charge: null, role: "product", count: 2 },
                      { id: "h2", kind: "molecule", label: "H₂", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "钠块投入水中：浮在水面上（密度比水小）。", moves: [{ id: "na", to: [28, 20] }, { id: "h2o", to: [28, 42] }] },
                      { caption: "熔成闪亮的小球（熔点低，反应放热）。", moves: [{ id: "na", to: [30, 22] }, { id: "h2o", to: [30, 44] }, { id: "h2", to: [64, 22] }] },
                      { caption: "四处游动（H₂ 气体推动），发出嘶嘶的响声。", moves: [{ id: "na", to: [32, 28] }, { id: "h2", to: [36, 14] }, { id: "h2o", to: [30, 46] }] },
                      { caption: "滴加酚酞，溶液变红——生成了 NaOH。2Na + 2H₂O ＝ 2NaOH + H₂↑", moves: [{ id: "na", to: [30, 34] }, { id: "h2o", to: [30, 44] }], form: [{ ids: ["na", "h2o"], label: "NaOH" }], fade: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。",
                    safety: "⚠ 虚拟实验可重复试错；现实中钠块取绿豆大小，必须在老师指导下操作，不可用手直接拿。"
                  }
                }
              ],
              point: "浮（密度小）熔（熔点低）游（气体推）响（放 H₂）红（生成 NaOH）——现象是性质的'发言人'。"
            },
            {
              id: "cm13.2.1-p2",
              kind: "explain",
              title: "钠和它的化合物",
              blocks: [
                { type: "lead", text: "钠很活泼：常温下就能和 O₂ 反应，丢进水里'上蹿下跳'。它的化合物也各有脾气。" },
                { type: "text", html: "Na 与 O₂：4Na + O₂ ＝ 2Na₂O（常温）；2Na + O₂ ＝点燃＝ Na₂O₂。Na 与 H₂O：2Na + 2H₂O ＝ 2NaOH + H₂↑（浮熔游响红）。焰色试验：钠焰色黄色。" },
                { type: "text", html: "Na₂O₂ 不是碱性氧化物（与水反应生成 O₂↑）；与 CO₂ 反应：2Na₂O₂ + 2CO₂ ＝ 2Na₂CO₃ + O₂↑。NaHCO₃ 受热分解：2NaHCO₃ ＝△＝ Na₂CO₃ + H₂O + CO₂↑。" },
                { type: "trap", text: "⚠ 别搞混：Na₂O₂ 是'碱性氧化物'？不是！NaHCO₃ 受热不分解？会分解！" }
              ],
              point: "Na 活泼，Na₂O₂ 能供氧，NaHCO₃ 受热分解——钠的化合物，记住'条件决定性质'。"
            },
            {
              id: "cm13.2.1-p3",
              kind: "quiz",
              title: "自测：钠",
              questions: [
                {
                  type: "choice",
                  stem: "钠投入水中，'游'的原因是（  ）",
                  options: ["钠密度比水小", "H₂ 气体推动", "钠熔点低", "生成了 NaOH"],
                  answer: 1,
                  tip: "游：H₂ 气体推动。浮：密度小；熔：熔点低；红：生成 NaOH。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是（  ）",
                  options: ["Na₂O₂ 是碱性氧化物", "NaHCO₃ 受热不分解", "Na₂O₂ 可作供氧剂", "钠的焰色试验是紫色"],
                  answer: 2,
                  tip: "Na₂O₂ 与 H₂O/CO₂ 反应放出 O₂，可作供氧剂；它不是碱性氧化物；NaHCO₃ 受热分解；钠焰色黄色。"
                },
                {
                  type: "fill",
                  stemBefore: "2NaHCO₃ ＝△＝ Na₂CO₃ + H₂O +",
                  stemAfter: "↑。",
                  answer: "CO₂",
                  accept: ["CO2"],
                  hint: "气体",
                  tip: "2NaHCO₃ ＝△＝ Na₂CO₃ + H₂O + CO₂↑。"
                }
              ],
              point: "钠的五个现象、三个化合物——错的都是'想当然'，对的都是'有条件'。"
            }
          ]
        },
        {
          id: "cm13.2.2",
          title: "氯及其化合物",
          prereq: "cm13.2.1 钠及其化合物",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm13.2.2-p1",
              kind: "interact",
              title: "氯水里有什么",
              exploreTip: "看氯水里到底有几种粒子——氯水是混合物，不是盐酸。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "Cl₂ + H₂O ⇌ HCl + HClO" },
                    particles: [
                      { id: "cl2", kind: "molecule", label: "Cl₂", charge: null, role: "reactant", count: 1 },
                      { id: "h2o", kind: "molecule", label: "H₂O", charge: null, role: "reactant", count: 1 },
                      { id: "hcl", kind: "molecule", label: "HCl", charge: null, role: "product", count: 1 },
                      { id: "hclo", kind: "molecule", label: "HClO", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "黄绿色 Cl₂ 通入水中，溶液变成黄绿色。", moves: [{ id: "cl2", to: [24, 34] }, { id: "h2o", to: [36, 36] }] },
                      { caption: "部分 Cl₂ 与水发生可逆反应：Cl₂ + H₂O ⇌ HCl + HClO。", moves: [{ id: "cl2", to: [40, 36] }, { id: "h2o", to: [46, 42] }, { id: "hcl", to: [62, 34] }, { id: "hclo", to: [68, 42] }] },
                      { caption: "数一数氯水里的粒子：Cl₂、HCl、HClO、H₂O——四种！氯水是混合物，不是盐酸。", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。",
                    safety: "⚠ Cl₂ 有毒：虚拟实验可重复试错；现实中须在通风橱中进行，尾气用 NaOH 溶液吸收。"
                  }
                }
              ],
              point: "氯水是混合物：Cl₂、HCl、HClO、H₂O——新制氯水久置，HClO 见光分解，变成盐酸。"
            },
            {
              id: "cm13.2.2-p2",
              kind: "explain",
              title: "氯：黄绿色的'双面手'",
              blocks: [
                { type: "lead", text: "Cl₂ 黄绿色、有毒，用处极大：自来水消毒、制漂白粉都靠它。" },
                { type: "text", html: "<b>可逆符号 ⇌</b>：反应可向两方进行（正、逆同时发生）——详见 cm16.1.3。" },
                { type: "text", html: "Cl₂ 化学性质：与金属（2Na + Cl₂ ＝点燃＝ 2NaCl）、与非金属（H₂ + Cl₂ ＝点燃＝ 2HCl）、与水（Cl₂ + H₂O ⇌ HCl + HClO）。HClO 不稳定、能漂白：2HClO ＝光照＝ 2HCl + O₂↑。" },
                { type: "text", html: "实验室制法：MnO₂ + 4HCl(浓) ＝△＝ MnCl₂ + Cl₂↑ + 2H₂O，尾气用 NaOH 吸收。漂白粉有效成分 Ca(ClO)₂。" },
                { type: "trap", text: "⚠ 别搞混：氯水 = 盐酸？氯水是混合物！久置不变？HClO 见光分解成盐酸！" }
              ],
              point: "Cl₂ 有毒但有用：消毒、漂白都靠它——用它的'毒'，防它的'毒'。"
            },
            {
              id: "cm13.2.2-p3",
              kind: "interact",
              title: "安全闯关：84 消毒液",
              exploreTip: "两个情景都选一选：选错不要紧，看警示。",
              widgets: [
                {
                  type: "safety-quiz",
                  params: {
                    title: "84 消毒液 + 洁厕灵，能混用吗？",
                    scenarios: [
                      {
                        scene: "打扫卫生，想把 84 消毒液和洁厕灵（含盐酸）倒在一起，觉得去污力加倍",
                        options: [{ id: "a", text: "可以，混在一起去污更强" }, { id: "b", text: "绝对不行，会产生有毒的 Cl₂" }],
                        correctId: "b",
                        warnText: "⚠ 混用会产生 Cl₂（黄绿色有毒气体）！NaClO + 2HCl ＝ NaCl + Cl₂↑ + H₂O",
                        correctDo: "84 消毒液绝不与洁厕灵混用——分开使用，通风换气。"
                      },
                      {
                        scene: "实验室制取 Cl₂ 做完了，烧瓶里还有黄绿色气体没处理",
                        options: [{ id: "a", text: "直接倒掉，敞开瓶口让它散掉" }, { id: "b", text: "先用 NaOH 溶液吸收尾气，再处理" }],
                        correctId: "b",
                        warnText: "⚠ Cl₂ 有毒，不能直接排放！",
                        correctDo: "尾气用 NaOH 溶液吸收：Cl₂ + 2NaOH ＝ NaCl + NaClO + H₂O。"
                      }
                    ],
                    noScore: true,
                    recordKey: "chm_safety_cm13.2.2"
                  }
                }
              ],
              point: "84 + 洁厕灵 = Cl₂ 中毒——生活中的化学，安全第一。"
            }
          ]
        }
      ]
    },
    {
      id: "cm13.3",
      title: "铁",
      lessons: [
        {
          id: "cm13.3.1",
          title: "铁及其化合物",
          prereq: "cm13.2.2 氯及其化合物",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm13.3.1-p1",
              kind: "interact",
              title: "白色沉淀'变脸'",
              exploreTip: "盯着颜色看：白 → 灰绿 → 红褐——Fe(OH)₂ 在空气中'待不住'。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "4Fe(OH)₂ + O₂ + 2H₂O ＝ 4Fe(OH)₃" },
                    particles: [
                      { id: "feoh2", kind: "molecule", label: "Fe(OH)₂", charge: null, role: "reactant", count: 4 },
                      { id: "o2", kind: "molecule", label: "O₂", charge: null, role: "reactant", count: 1 },
                      { id: "h2o", kind: "molecule", label: "H₂O", charge: null, role: "reactant", count: 2 },
                      { id: "feoh3", kind: "molecule", label: "Fe(OH)₃", charge: null, role: "product", count: 4 }
                    ],
                    keyframes: [
                      { caption: "FeSO₄ 溶液中加入 NaOH：生成白色絮状沉淀 Fe(OH)₂。", moves: [{ id: "feoh2", to: [20, 35] }, { id: "o2", to: [54, 18] }, { id: "h2o", to: [42, 50] }] },
                      { caption: "在空气中放置：白色 → 灰绿色——Fe(OH)₂ 被 O₂ 氧化。", moves: [{ id: "feoh2", to: [22, 36] }, { id: "o2", to: [32, 30] }, { id: "h2o", to: [44, 50] }] },
                      { caption: "最终变成红褐色 Fe(OH)₃：4Fe(OH)₂ + O₂ + 2H₂O ＝ 4Fe(OH)₃。", moves: [{ id: "feoh2", to: [25, 36] }, { id: "o2", to: [36, 36] }], form: [{ ids: ["feoh2"], label: "Fe(OH)₃" }], fade: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。"
                  }
                }
              ],
              point: "Fe(OH)₂ 白色沉淀极易被氧化——实验要隔绝空气；颜色变化是氧化的'直播'。"
            },
            {
              id: "cm13.3.1-p2",
              kind: "explain",
              title: "铁三角",
              blocks: [
                { type: "lead", text: "Fe、Fe²⁺、Fe³⁺ 互相转化，叫'铁三角'：Fe²⁺ 还原性，Fe³⁺ 氧化性。" },
                { type: "text", html: "Fe 的化学性质：与 O₂（3Fe + 2O₂ ＝点燃＝ Fe₃O₄）、与酸（Fe + 2HCl ＝ FeCl₂ + H₂↑）、与盐（Fe + CuSO₄ ＝ FeSO₄ + Cu）。铁三角：Fe ⇄ Fe²⁺ ⇄ Fe³⁺（Fe²⁺→Fe³⁺ 用 Cl₂；Fe³⁺→Fe²⁺ 用 Fe）。" },
                { type: "text", html: "Fe³⁺ 的检验：加 KSCN 溶液，变血红色——是络合显色，不是沉淀！补铁剂里的铁是 Fe²⁺。" },
                { type: "trap", text: "⚠ 别搞混：Fe(OH)₂ 白色沉淀'稳定'？极易被氧化！Fe³⁺ 遇 KSCN 是'沉淀'？是显色变红。" }
              ],
              point: "铁三角：Fe ⇄ Fe²⁺ ⇄ Fe³⁺——Fe²⁺ 还原性，Fe³⁺ 氧化性，KSCN 认 Fe³⁺。"
            },
            {
              id: "cm13.3.1-p3",
              kind: "quiz",
              title: "自测：铁",
              questions: [
                {
                  type: "choice",
                  stem: "检验 Fe³⁺ 用 KSCN 溶液，现象是（  ）",
                  options: ["白色沉淀", "血红色溶液", "蓝色沉淀", "无现象"],
                  answer: 1,
                  tip: "Fe³⁺ 遇 KSCN 变血红色——络合显色，不是沉淀！"
                },
                {
                  type: "choice",
                  stem: "Fe → Fe³⁺ 一步实现，选用的试剂是（  ）",
                  options: ["稀盐酸", "Cl₂", "CuSO₄ 溶液", "NaOH 溶液"],
                  answer: 1,
                  tip: "2Fe + 3Cl₂ ＝点燃＝ 2FeCl₃。稀盐酸只能把 Fe 氧化到 Fe²⁺。"
                },
                {
                  type: "fill",
                  stemBefore: "Fe(OH)₂ 在空气中变成红褐色 Fe(OH)₃，说明 Fe(OH)₂ 具有",
                  stemAfter: "性。",
                  answer: "还原",
                  accept: ["还原性"],
                  hint: "被 O₂ 氧化",
                  tip: "Fe(OH)₂ 被 O₂ 氧化成 Fe(OH)₃——Fe(OH)₂ 做还原剂，有还原性。"
                }
              ],
              point: "Fe²⁺ 还原性、Fe³⁺ 氧化性——'铁三角'转一圈，化合价升降看得失电子。"
            }
          ]
        },
        {
          id: "cm13.3.2",
          title: "本章小结与习题",
          prereq: "cm13.3.1 铁及其化合物",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm13.3.2-p1",
              kind: "quiz",
              title: "小结：物质的量 · 钠氯铁",
              questions: [
                {
                  type: "review",
                  html: "本章小结：① 物质的量 n 是计量中枢：n＝N/N_A＝m/M＝V/V_m，c＝n/V；M 单位 g/mol，V_m＝22.4 L/mol 限标准状况（0℃、101kPa）。② 系数比＝粒子数比＝物质的量比≠质量比。③ Na：浮熔游响红；Na₂O₂ 不是碱性氧化物；NaHCO₃ 受热分解。④ Cl₂：氯水是混合物（Cl₂/HCl/HClO/H₂O）；实验室制法 MnO₂+4HCl(浓)，尾气 NaOH 吸收。⑤ 铁三角：Fe²⁺ 还原性，Fe³⁺ 氧化性，KSCN 检验 Fe³⁺（血红色）。"
                },
                {
                  type: "choice",
                  stem: "下列单位中，摩尔质量的单位是（  ）",
                  options: ["g", "g/mol", "mol/L", "L/mol"],
                  answer: 1,
                  tip: "M 单位 g/mol。mol/L 是浓度，L/mol 是气体摩尔体积。"
                },
                {
                  type: "choice",
                  stem: "下列关于 Na₂O₂ 的说法正确的是（  ）",
                  options: ["是碱性氧化物", "与水反应生成 O₂", "与 CO₂ 反应生成 CO", "受热不分解"],
                  answer: 1,
                  tip: "2Na₂O₂ + 2H₂O ＝ 4NaOH + O₂↑——与水反应生成 O₂，所以不是碱性氧化物。"
                },
                {
                  type: "fill",
                  stemBefore: "0.5 mol NaCl 的质量是",
                  stemAfter: " g。",
                  answer: "29.25g",
                  accept: ["29.25 g", "29.25"],
                  hint: "m ＝ n × M",
                  tip: "m ＝ 0.5 × 58.5 ＝ 29.25g。"
                }
              ],
              point: "n 是中枢，条件是边界——公式先问条件，再代数。"
            },
            {
              id: "cm13.3.2-p2",
              kind: "quiz",
              title: "综合：生活 + 定量",
              questions: [
                {
                  type: "choice",
                  stem: "补铁剂中的铁是 Fe²⁺ 而不是 Fe³⁺，原因是（  ）",
                  options: ["Fe²⁺ 更便宜", "Fe²⁺ 容易被人体吸收，且性质相对稳定", "Fe³⁺ 有毒", "Fe²⁺ 颜色好看"],
                  answer: 1,
                  tip: "生活中的化学：补铁剂用 Fe²⁺——容易吸收。Fe³⁺ 氧化性强，在体内不稳定。"
                },
                {
                  type: "choice",
                  stem: "新制氯水久置后，溶液的成分变化是（  ）",
                  options: ["不变", "HClO 见光分解，变成盐酸", "Cl₂ 增多", "变成纯水"],
                  answer: 1,
                  tip: "2HClO ＝光照＝ 2HCl + O₂↑——久置氯水变成盐酸，漂白性消失。"
                },
                {
                  type: "fill",
                  stemBefore: "5.6g Fe 与足量稀盐酸完全反应，生成 H₂ 的物质的量是",
                  stemAfter: " mol。",
                  answer: "0.1 mol",
                  accept: ["0.1mol", "0.1"],
                  hint: "Fe + 2HCl ＝ FeCl₂ + H₂↑",
                  tip: "n(Fe) ＝ 5.6/56 ＝ 0.1 mol；系数比 Fe∶H₂ ＝ 1∶1，故 n(H₂) ＝ 0.1 mol。"
                }
              ],
              point: "定量题自查：方程式配平了吗？代入的是纯净物质量吗？单位写对了吗？"
            }
          ]
        }
      ]
    }
  ]
};
