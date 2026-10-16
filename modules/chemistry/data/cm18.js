/* ============================================================
 * 学习工具箱 · 化学 · 第十八章数据（蓝队 2026-10-15，阶段三批4）
 * 化学反应原理·上（热效应·速率·平衡）· 7 课 / 20 页
 *
 * 数据格式：schema v1.0 冻结（见 data/cm05.js 文件头）。
 * 组件类型名冻结（docs/chemistry-interactions.md）：
 *   read-gauge-chem(Y10) / stoich-steps(Y12) / rate-equilibrium(C9) /
 *   side-compare(Y11复用物理Y5)
 * 落点：D3 Y10 滴定管并入 cm18.1.1（+0 页）；T6 收支平衡边界句（cm18.2.2）；
 *       C9 验收（催化剂两线同等变陡、平衡位置不动，cm18.2.3）；
 *       K 只与温度有关；勒夏特列“减弱”非“抵消”。
 * 注意：C9 定量模式 K 配表待黄队按 B13.7 提供（freeze-report 待办#3），
 *       本批 C9 均用定性模式；K 数值教学用题目给定值/教学示意数据。
 * window.CHEM_CH["cm18"] = { id, units[] }（注册由引擎 index.html script 标签完成）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm18"] = {
  id: "cm18",
  units: [
    {
      id: "cm18.1",
      title: "反应热",
      lessons: [
        {
          id: "cm18.1.1",
          title: "反应热",
          prereq: "cm16.2.1 吸热与放热",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm18.1.1-p1",
              kind: "explain",
              title: "ΔH：放热为负，吸热为正",
              blocks: [
                { type: "lead", text: "盐酸和 NaOH 混合，温度升高了——放出的热量被溶液“吃”掉了。ΔH 来量一量。" },
                { type: "text", html: "焓变 ΔH：放热 ΔH < 0（如中和 −57.3 kJ/mol），吸热 ΔH > 0。符号和直觉反着来——负的是放热！" },
                { type: "text", html: "热化学方程式必注状态：2H₂(g)+O₂(g)=2H₂O(l) ΔH=−571.6 kJ/mol——ΔH 与状态有关。" },
                { type: "text", html: "燃烧热：1mol 可燃物完全燃烧放出的热量（H₂：285.8 kJ/mol）。中和热：强酸强碱稀溶液生成 1mol 水放出的热量（57.3 kJ/mol）。" },
                { type: "mathlink", text: "直观版（正负数）：ΔH 的正负就是正负数的应用。" },
                { type: "trap", text: "⚠ 别搞混：ΔH < 0 是放热！热化学方程式不注状态 = 没写完。" }
              ],
              point: "ΔH<0 放热，ΔH>0 吸热；热化学方程式必注状态。下一页：滴定管读数 + 中和热计算。"
            },
            {
              id: "cm18.1.1-p2",
              kind: "interact",
              title: "量一量，算一算：中和热",
              exploreTip: "先练滴定管读数（估读到 0.01mL），再一步步算出中和热 ΔH。",
              widgets: [
                {
                  type: "read-gauge-chem",
                  params: {
                    gauge: "burette",
                    division: 0.1,
                    tolerance: 0.1,
                    estimateNext: true,
                    sightDemo: false,
                    targetValue: 24.60,
                    recordKey: "chm_gauge_cm18.1.1"
                  }
                },
                {
                  type: "stoich-steps",
                  params: {
                    title: "中和热测定：50mL 0.50mol/L HCl 与 50mL 0.55mol/L NaOH 混合，溶液温度升高 3.4℃，求中和热 ΔH（kJ/mol）",
                    steps: [
                      { key: "设", prompt: "设中和热为 ΔH（kJ/mol）", hint: "中和热：强酸强碱稀溶液生成 1mol 水放出的热量" },
                      { key: "写", prompt: "写出反应与热量公式", hint: "H⁺ + OH⁻ = H₂O；Q=(m₁+m₂)·c·ΔT，c 取 4.18 J/(g·℃)，溶液密度按 1g/mL，忽略量热计吸热" },
                      { key: "找", prompt: "找出放出的热量 Q", hint: "Q = 100g × 4.18 J/(g·℃) × 3.4℃ = 1421.2J ≈ 1.42kJ" },
                      { key: "列", prompt: "算生成水的物质的量 n", hint: "HCl 0.025mol、NaOH 0.0275mol：HCl 不足，n(H₂O)=0.025mol" },
                      { key: "解", prompt: "解出 ΔH", hint: "ΔH = −Q/n = −1.42/0.025 = −56.8 kJ/mol" },
                      { key: "答", prompt: "答（含符号与单位）", hint: "ΔH = −56.8 kJ/mol（放热为负；与 57.3 的差值来自热量散失）" }
                    ],
                    checkTable: { "解": "−56.8 kJ/mol", "答": "−56.8 kJ/mol" },
                    foldLevels: 3,
                    sigFig: 3,
                    recordKey: "chm_stoich_cm18.1.1"
                  }
                }
              ],
              point: "读数估读一位；计算三步走：Q → n → ΔH=−Q/n。"
            },
            {
              id: "cm18.1.1-p3",
              kind: "quiz",
              title: "练一练：ΔH 的符号",
              questions: [
                {
                  type: "choice",
                  stem: "2H₂(g) + O₂(g) = 2H₂O(l)  ΔH = −571.6 kJ/mol，该反应是？",
                  options: ["吸热反应", "放热反应", "无法判断"],
                  answer: 1,
                  tip: "ΔH<0 = 放热——符号与直觉反着来。"
                },
                {
                  type: "choice",
                  stem: "热化学方程式 2H₂(g) + O₂(g) = 2H₂O  ΔH = −571.6 kJ/mol 有什么问题？",
                  options: ["没问题", "没注明 H₂O 的状态", "ΔH 符号错了"],
                  answer: 1,
                  tip: "ΔH 与状态有关：不注状态 = 没写完。"
                },
                {
                  type: "fill",
                  stemBefore: "强酸强碱稀溶液中和热 ΔH =",
                  stemAfter: "kJ/mol。",
                  answer: "−57.3",
                  accept: ["-57.3", "负57.3"],
                  hint: "放热为负",
                  tip: "中和热 57.3 kJ/mol，放热 ΔH 取负。"
                }
              ],
              point: "ΔH<0 放热；热化学方程式必注状态——两条铁律收好。"
            }
          ]
        },
        {
          id: "cm18.1.2",
          title: "盖斯定律",
          prereq: "cm18.1.1 反应热",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm18.1.2-p1",
              kind: "explain",
              title: "两条路，一个 ΔH",
              blocks: [
                { type: "lead", text: "C 烧成 CO₂：一步到位，或先烧成 CO 再烧——两条路 ΔH 相加居然相等。" },
                { type: "text", html: "盖斯定律：ΔH 只与起点、终点有关，与路径无关。C(s)+O₂(g)=CO₂(g) ΔH₁=−393.5 kJ/mol；分两步：C(s)+½O₂(g)=CO(g) ΔH₂=−110.5，CO(g)+½O₂(g)=CO₂(g) ΔH₃=−283.0；ΔH₁=ΔH₂+ΔH₃。" },
                { type: "text", html: "本质：焓是状态函数——只看“在哪”，不看“怎么来”。热化学方程式可加减：测不出的 ΔH，用能测出的“拼”出来。" },
                { type: "mathlink", text: "直观版（方程组思想）：方程式“加减”就是加减消元的思想。" },
                { type: "trap", text: "⚠ 别搞混：不只是“数学加减”——能加减是因为焓是状态函数。" }
              ],
              point: "ΔH₁ = ΔH₂ + ΔH₃：起点终点定，ΔH 就定了。下一页：两条路线对照。"
            },
            {
              id: "cm18.1.2-p2",
              kind: "interact",
              title: "两条路线，ΔH 相同",
              exploreTip: "对照两条路线：起点、终点、ΔH 各是什么？",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "路线一：一步到位",
                      rows: ["C(s) + O₂(g) = CO₂(g)", "ΔH₁ = −393.5 kJ/mol"]
                    },
                    right: {
                      title: "路线二：分两步走",
                      rows: ["C(s) + ½O₂(g) = CO(g)  ΔH₂ = −110.5 kJ/mol", "CO(g) + ½O₂(g) = CO₂(g)  ΔH₃ = −283.0 kJ/mol", "ΔH₂ + ΔH₃ = −393.5 kJ/mol"]
                    },
                    verdict: "起点终点相同，ΔH 相同：−393.5 = −110.5 + (−283.0)——焓是状态函数，与路径无关"
                  }
                }
              ],
              point: "焓是状态函数：只看起点终点，不看路径。"
            },
            {
              id: "cm18.1.2-p3",
              kind: "quiz",
              title: "练一练：拼出 ΔH",
              questions: [
                {
                  type: "choice",
                  stem: "盖斯定律的本质是？",
                  options: ["数学加减技巧", "焓是状态函数，与路径无关", "所有反应都分两步"],
                  answer: 1,
                  tip: "能加减，是因为焓只与状态有关。"
                },
                {
                  type: "fill",
                  stemBefore: "已知 ΔH₂=−110.5、ΔH₃=−283.0 kJ/mol，则 ΔH₁=",
                  stemAfter: "kJ/mol。",
                  answer: "−393.5",
                  accept: ["-393.5"],
                  hint: "ΔH₁=ΔH₂+ΔH₃",
                  tip: "−110.5 + (−283.0) = −393.5。"
                },
                {
                  type: "choice",
                  stem: "C 直接烧成 CO 的 ΔH 很难直接测，盖斯定律的价值是？",
                  options: ["用能测出的 ΔH 把它“拼”出来", "所有反应都能直接测", "盖斯定律没有实用价值"],
                  answer: 0,
                  tip: "测不出的，用能测的拼出来——这就是盖斯定律的用武之地。"
                }
              ],
              point: "ΔH₁ = ΔH₂ + ΔH₃——拼 ΔH，先确认起点终点相同。"
            }
          ]
        }
      ]
    },
    {
      id: "cm18.2",
      title: "速率与平衡深化",
      lessons: [
        {
          id: "cm18.2.1",
          title: "化学反应速率（深化）",
          prereq: "cm18.1.2 盖斯定律",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm18.2.1-p1",
              kind: "explain",
              title: "速率：比值 = 系数比",
              blocks: [
                { type: "lead", text: "N₂ + 3H₂ ＝ 2NH₃：用 N₂ 表示的速率是 0.1 mol/(L·min)，用 H₂ 表示是多少？不是 0.1——是 0.3。" },
                { type: "oldfriend", text: "认旧友：还记得 cm02.1.3 的“一变二不变”吗？催化剂改变化学反应速率，但反应前后质量和化学性质都不变——今天看它“怎么办到”的：换一条活化能更低的路。" },
                { type: "text", html: "同一反应，用不同物质表示的速率之比 = 系数比。v(N₂)∶v(H₂)∶v(NH₃) = 1∶3∶2。速率单位别丢时间：mol/(L·min) 或 mol/(L·s)。" },
                { type: "text", html: "微观上：有效碰撞 = 能量够 + 取向对。活化能是反应的“门槛”——催化剂换一条“矮门”的路（降低活化能），正逆速率都加快，但 ΔH 不变、平衡不移动。" },
                { type: "trap", text: "⚠ 别搞混：不同物质表示的速率不相等，比值才等于系数比；催化剂不改 ΔH、不改平衡、不改 K（K = 平衡常数，下一课 cm18.2.2 见），只降活化能、加快率。" },
                { type: "widget", widget: { type: "bond-step", params: {
                  title: "有效碰撞：能量够 + 取向对",
                  layout: "collision",
                  steps: [
                    { stepIndex: 0, label: "A：能量不够 → 弹开", "break": [], form: [], annotate: true,
                      lane: 0, phase: "collide", energyTag: "能量不够 ＜ 活化能" },
                    { stepIndex: 1, label: "B：取向不对 → 弹开", "break": [], form: [], annotate: true,
                      lane: 1, phase: "collide", energyTag: "取向不对" },
                    { stepIndex: 2, label: "C：能量够 + 取向对 → 断开旧键", "break": ["旧键"], form: [],
                      lane: 2, phase: "collide", energyTag: "能量够 + 取向对", note: "旧键断开" },
                    { stepIndex: 3, label: "C：形成新键", "break": [], form: ["新键"],
                      lane: 2, phase: "collide", energyTag: "能量够 + 取向对", note: "新键形成" }
                  ],
                  autoplay: true,
                  reminder: "粒子大小、数量、运动速度均为示意，未按真实比例；粒子碰撞为示意，非真实碰撞过程。\n提醒：\"能量够\"的门槛画成了一道\"门\"，是示意——真实活化能是能量数值；分子的取向被简化成了几个固定角度，真实碰撞的取向是任意的。",
                  ax01: { assumptions: ["碰撞示意"], approximations: ["二维示意"], errorEstimate: "定性示意，无数值口径" }
                } } },
                { type: "widget", widget: { type: "bond-step", params: {
                  title: "催化剂：换一条“矮门”的路",
                  layout: "energy",
                  steps: [
                    { stepIndex: 0, label: "无催化剂：活化能高", "break": [], form: [], annotate: true,
                      molStage: "form", caption: "起点 → 高门槛 → 终点" },
                    { stepIndex: 1, label: "有催化剂：活化能更低，ΔH 不变", "break": [], form: [], annotate: true,
                      molStage: "form", energyLabel: "活化能更低", settleLabel: "ΔH 不变",
                      caption: "催化剂：活化能更低的路；不改 ΔH、不改平衡、不改 K" }
                  ],
                  scene: { energyCurve: {
                    points: [{ x: 5, y: 30 }, { x: 50, y: 8 }, { x: 95, y: 30 }],
                    altPath: [{ x: 5, y: 30 }, { x: 50, y: 20 }, { x: 95, y: 30 }]
                  } },
                  autoplay: true,
                  reminder: "粒子大小、数量、运动速度均为示意，未按真实比例；粒子碰撞为示意，非真实碰撞过程。",
                  ax01: { assumptions: ["能量曲线为示意"], approximations: ["二维示意"], errorEstimate: "定性示意" }
                } } }
              ],
              point: "速率比=系数比；催化剂降活化能、不改 ΔH。下一页：拨滑块看速率变化。"
            },
            {
              id: "cm18.2.1-p2",
              kind: "interact",
              title: "拨一拨：速率与平衡",
              exploreTip: "先等两条线重合，再拨温度/压强滑块，或打开催化剂开关。",
              widgets: [
                {
                  type: "rate-equilibrium",
                  params: {
                    reaction: { equationText: "N₂ + 3H₂ ⇌ 2NH₃", gasStoich: { fwd: 4, rev: 2 } },
                    sliders: {
                      conc: { min: 1, max: 10, step: 1, init: 5, label: "反应物浓度" },
                      temp: { min: 300, max: 800, step: 50, init: 500, label: "温度/K" },
                      pressure: { min: 1, max: 100, step: 5, init: 10, label: "压强/MPa" }
                    },
                    mode: "qualitative",
                    equilibriumBadge: true,
                    catalystSwitch: true,
                    shiftNote: "催化剂：两条线一起变陡——正逆速率都加快，ΔH 和平衡位置都不变"
                  }
                }
              ],
              point: "催化剂：两线一起变陡，平衡位置不动——只改速率，不改平衡、不改 K（K = 平衡常数，下一课 cm18.2.2 见）。"
            },
            {
              id: "cm18.2.1-p3",
              kind: "quiz",
              title: "练一练：速率的比",
              questions: [
                {
                  type: "choice",
                  stem: "N₂ + 3H₂ ＝ 2NH₃ 中，v(H₂)∶v(NH₃) =",
                  options: ["1∶1", "3∶2", "1∶3"],
                  answer: 1,
                  tip: "速率比 = 系数比 = 3∶2。"
                },
                {
                  type: "fill",
                  stemBefore: "v(N₂)=0.1 mol/(L·min)，则 v(NH₃)=",
                  stemAfter: "mol/(L·min)。",
                  answer: "0.2",
                  accept: ["0.20"],
                  hint: "v(N₂)∶v(NH₃)=1∶2",
                  tip: "v(N₂)∶v(NH₃)=1∶2，v(NH₃)=0.2。"
                },
                {
                  type: "choice",
                  stem: "催化剂的作用是？",
                  options: ["降低反应热 ΔH", "降低活化能，加快正逆速率", "使平衡正向移动"],
                  answer: 1,
                  tip: "一变（速率）二不变（ΔH、平衡）。"
                }
              ],
              point: "速率比=系数比；催化剂一变二不变（也不改 K；K = 平衡常数，下一课 cm18.2.2 见）——速率深化收官。"
            }
          ]
        },
        {
          id: "cm18.2.2",
          title: "化学平衡（深化·上）",
          prereq: "cm18.2.1 化学反应速率（深化）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm18.2.2-p1",
              kind: "explain",
              title: "K：只认温度",
              blocks: [
                { type: "lead", text: "N₂ + 3H₂ ⇌ 2NH₃ 达到平衡时，各物质浓度之间有个固定关系——平衡常数 K。" },
                { type: "text", html: "K = c²(NH₃) / [c(N₂)·c³(H₂)]（固体、纯液体不写入）。K 越大，反应进行得越彻底——K 是“限度”的量，不是“快慢”的量。" },
                { type: "text", html: "K 只与温度有关！改浓度、改压强、加催化剂，K 纹丝不动——这是全书级铁律（还记得 cm16.1.1 的“一变二不变”吗）。记住收支平衡的边界句：进出一样快（v正=v逆），账面（浓度）才不动——但分子一直在进出，不是关门大吉。" },
                { type: "mathlink", text: "奠基：代数 ch03 分式——K 的表达式就是分式：分子生成物、分母反应物，指数是系数。" },
                { type: "trap", text: "⚠ 别搞混：K 大 ≠ 速率快（K 管限度，速率管快慢）；K 不随浓度/压强变，只随温度变。" }
              ],
              point: "K 只认温度；K 大 = 进行得彻底。下一页：看平衡建立。"
            },
            {
              id: "cm18.2.2-p2",
              kind: "interact",
              title: "看平衡建立：v正=v逆≠0",
              exploreTip: "等两条线重合：看徽章的 ≠0，再拨浓度滑块。",
              widgets: [
                {
                  type: "rate-equilibrium",
                  params: {
                    reaction: { equationText: "N₂ + 3H₂ ⇌ 2NH₃", gasStoich: { fwd: 4, rev: 2 } },
                    sliders: {
                      conc: { min: 1, max: 10, step: 1, init: 5, label: "反应物浓度" },
                      temp: { min: 300, max: 800, step: 50, init: 500, label: "温度/K" },
                      pressure: { min: 1, max: 100, step: 5, init: 10, label: "压强/MPa" }
                    },
                    mode: "qualitative",
                    equilibriumBadge: true,
                    shiftNote: "温度不变，平衡常数 K 不变——K 只与温度有关",
                    readGuide: [
                      "📖 读图三句话（v–t 图像直观版，不依赖数学已学）：",
                      "① 线往上翘 = 变快，线往下掉 = 变慢——线的走势就是速率的变化。",
                      "② 两线重合成一条水平线 = 平台 = v正=v逆≠0——动态平衡，不是停了。",
                      "③ 线突然拐弯/跳变 = 条件变了（你拨了滑块）——拐点处找原因。",
                      "数学呼应：这就是代数 ch06 的函数图像读法（拐点、平台、突变）——化学里一样用，学过 ch06 的可对照。"
                    ]
                  }
                }
              ],
              point: "两线重合 ≠ 停了：v正=v逆≠0，动态平衡。"
            },
            {
              id: "cm18.2.2-p3",
              kind: "quiz",
              title: "练一练：K 的脾气",
              questions: [
                {
                  type: "choice",
                  stem: "N₂ + 3H₂ ⇌ 2NH₃ 的 K 表达式是？",
                  options: ["K=c(N₂)·c(H₂)/c(NH₃)", "K=c²(NH₃)/[c(N₂)·c³(H₂)]", "K=c(NH₃)/[c(N₂)·c(H₂)]"],
                  answer: 1,
                  tip: "K = 生成物浓度幂之积 / 反应物浓度幂之积，指数=系数。"
                },
                {
                  type: "choice",
                  stem: "下列改变中，K 一定改变的是？",
                  options: ["增大 N₂ 浓度", "增大压强", "升高温度"],
                  answer: 2,
                  tip: "K 只与温度有关——改浓度压强，K 不动。"
                },
                {
                  type: "fill",
                  stemBefore: "平衡时 c(N₂)=1.0、c(H₂)=1.0、c(NH₃)=2.0 mol/L（教学示意数据），K=",
                  stemAfter: "。",
                  answer: "4.0",
                  accept: ["4"],
                  hint: "K=c²(NH₃)/[c(N₂)·c³(H₂)]",
                  tip: "2.0²/(1.0×1.0³)=4.0。"
                }
              ],
              point: "K 只认温度——改浓度压强，K 纹丝不动。"
            }
          ]
        },
        {
          id: "cm18.2.3",
          title: "化学平衡（深化·下）",
          prereq: "cm18.2.2 化学平衡（深化·上）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm18.2.3-p1",
              kind: "explain",
              title: "勒夏特列：减弱，不是抵消",
              blocks: [
                { type: "lead", text: "平衡时增大压强，N₂ + 3H₂ ⇌ 2NH₃ 会向正向移动——但压强并没有“回到原来”，只是“涨得少了点”。" },
                { type: "text", html: "勒夏特列原理：如果改变影响平衡的一个条件，平衡就向着能够减弱这种改变的方向移动。关键词是“减弱”，不是“抵消”——改变还在，只是被削弱了。" },
                { type: "text", html: "Qc 与 K 判断方向：Qc < K，正向移动；Qc = K，平衡；Qc > K，逆向移动。等效平衡（定性）：同等条件下，按系数比换算成同一边投料相同，平衡状态就相同。" },
                { type: "mathlink", text: "奠基：代数 ch06 函数图像——v–t、c–t 平衡图像的判读，就是函数图像的读法：拐点、平台、突变。" },
                { type: "trap", text: "⚠ 别搞混：“抵消”是错的！平衡移动只能减弱改变；平衡移动后 K 不变（温度不变），但各物质浓度变了。" }
              ],
              point: "减弱≠抵消；Qc<K 正向走。下一页：亲手移动平衡。"
            },
            {
              id: "cm18.2.3-p2",
              kind: "interact",
              title: "移动平衡：减弱这种改变",
              exploreTip: "平衡后把压强滑块往大拨：看两条线先分开、再重合到新高度。",
              widgets: [
                {
                  type: "rate-equilibrium",
                  params: {
                    reaction: { equationText: "N₂ + 3H₂ ⇌ 2NH₃", gasStoich: { fwd: 4, rev: 2 } },
                    sliders: {
                      conc: { min: 1, max: 10, step: 1, init: 5, label: "反应物浓度" },
                      temp: { min: 300, max: 800, step: 50, init: 500, label: "温度/K" },
                      pressure: { min: 1, max: 100, step: 5, init: 10, label: "压强/MPa" }
                    },
                    mode: "qualitative",
                    equilibriumBadge: true,
                    catalystSwitch: true,
                    shiftNote: "增大压强，平衡正向移动——减弱这种改变，不是抵消"
                  }
                }
              ],
              point: "催化剂开关：两线同等变陡、平衡位置不动——催化剂不改 K。"
            },
            {
              id: "cm18.2.3-p3",
              kind: "quiz",
              title: "练一练：平衡移动",
              questions: [
                {
                  type: "choice",
                  stem: "增大压强使 N₂+3H₂⇌2NH₃ 正向移动，这是因为？",
                  options: ["抵消了压强增大", "减弱了压强增大的影响", "K 变大了"],
                  answer: 1,
                  tip: "勒夏特列：减弱，不是抵消；K 只与温度有关。"
                },
                {
                  type: "choice",
                  stem: "某时刻 Qc < K，反应将？",
                  options: ["正向移动", "逆向移动", "已达平衡"],
                  answer: 0,
                  tip: "Qc<K：还没“装满”，正向走。"
                },
                {
                  type: "choice",
                  stem: "v–t 图像上，v正、v逆两条线重合后又分开，说明？",
                  options: ["建立了新平衡", "平衡被打破，正在移动", "反应停止了"],
                  answer: 1,
                  tip: "分开 = v正≠v逆，平衡移动中；重合 = 新平衡。"
                }
              ],
              point: "减弱≠抵消；Qc<K 正向走——平衡移动一次讲透。"
            }
          ]
        },
        {
          id: "cm18.2.4",
          title: "化学平衡计算",
          prereq: "cm18.2.3 化学平衡（深化·下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm18.2.4-p1",
              kind: "explain",
              title: "三段式：起始/转化/平衡",
              blocks: [
                { type: "lead", text: "2L 容器里放 2mol N₂、6mol H₂，平衡时生成了 2mol NH₃——N₂ 的转化率是多少？列个三段式，一目了然。" },
                { type: "oldfriend", text: "认旧友：还记得 cm05.2.2 的限量反应物吗？“谁先用完、谁说了算”——三段式就是它的升级版：起始量里先找限量，再按系数比算转化。" },
                { type: "text", html: "三段式三行：起始量 → 转化量 → 平衡量。转化量必须按系数比设：NH₃ 生成 2mol，则 N₂ 转化 1mol、H₂ 转化 3mol（1∶3∶2）。" },
                { type: "text", html: "转化率 = 转化量 / 起始量 ×100%。上例：N₂ 转化率 = 1/2 = 50%。产率是实际产量占理论产量的比例——工业上拼命提高它。" },
                { type: "mathlink", text: "奠基：代数 ch01 方程——三段式列出的就是方程：设转化量为 x，按系数比列式。" },
                { type: "trap", text: "⚠ 别搞混：转化量不能随意设，必须按系数比；平衡时各物质浓度不一定相等——相等的是 v正和 v逆！" }
              ],
              point: "三段式：转化量按系数比。下一页：一步一步填。"
            },
            {
              id: "cm18.2.4-p2",
              kind: "interact",
              title: "三段式：一步一步填",
              exploreTip: "按设/写/找/列/解/答六步填：关键是“找”——转化量按系数比。",
              widgets: [
                {
                  type: "stoich-steps",
                  params: {
                    title: "2L 容器中放入 2mol N₂、6mol H₂，N₂+3H₂⇌2NH₃，平衡时生成 2mol NH₃，求 N₂ 的转化率",
                    steps: [
                      { key: "设", prompt: "设 N₂ 的转化量为 x mol", hint: "转化量按系数比设：N₂∶H₂∶NH₃ = 1∶3∶2" },
                      { key: "写", prompt: "写出三段式表头", hint: "起始 / 转化 / 平衡，三行" },
                      { key: "找", prompt: "找出各物质转化量", hint: "NH₃ 生成 2mol → N₂ 转化 1mol、H₂ 转化 3mol" },
                      { key: "列", prompt: "列出平衡量", hint: "N₂：2−1=1mol；H₂：6−3=3mol；NH₃：0+2=2mol" },
                      { key: "解", prompt: "解出 x", hint: "x = 1" },
                      { key: "答", prompt: "答：N₂ 的转化率", hint: "转化率 = 转化量/起始量 = 1/2 = 50%" }
                    ],
                    checkTable: { "解": "x=1", "答": "50%" },
                    foldLevels: 3,
                    sigFig: 3,
                    recordKey: "chm_stoich_cm18.2.4"
                  }
                }
              ],
              point: "先配平方程式，再列三段式——顺序错了全错。"
            },
            {
              id: "cm18.2.4-p3",
              kind: "quiz",
              title: "练一练：三段式",
              questions: [
                {
                  type: "choice",
                  stem: "三段式中“转化”一行的数据必须？",
                  options: ["随意设", "按系数比", "全部相等"],
                  answer: 1,
                  tip: "转化量之比 = 系数比——这是三段式的灵魂。"
                },
                {
                  type: "fill",
                  stemBefore: "上例 N₂ 的转化率是",
                  stemAfter: "。",
                  answer: "50%",
                  accept: ["50", "0.5"],
                  hint: "转化量/起始量",
                  tip: "1mol / 2mol = 50%。"
                },
                {
                  type: "review",
                  html: "自查清单：□ 方程式配平了吗？□ 转化量按系数比了吗？□ 单位写对了吗？□ 转化率=转化/起始？"
                }
              ],
              point: "三段式 + 自查清单：计算题一次做对。"
            }
          ]
        },
        {
          id: "cm18.2.5",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm18.2.5-p1",
              kind: "explain",
              title: "本章小结：从定性到定量",
              blocks: [
                { type: "text", html: "① ΔH：放热为负，热化学方程式必注状态。② 盖斯定律：ΔH₁=ΔH₂+ΔH₃（焓是状态函数）。③ 速率：比值=系数比；催化剂降活化能、不改 ΔH、不改 K。④ 平衡：v正=v逆≠0；K 只与温度有关；勒夏特列“减弱”非“抵消”；Qc<K 正向。⑤ 三段式：转化量按系数比。" }
              ],
              point: "定性→定量：cm16 的直观版，这里全部严格化。下一页：本章习题。"
            },
            {
              id: "cm18.2.5-p2",
              kind: "quiz",
              title: "本章习题",
              questions: [
                {
                  type: "choice",
                  stem: "ΔH < 0 表示？",
                  options: ["吸热", "放热", "ΔH 不能为负"],
                  answer: 1,
                  tip: "ΔH<0 = 放热。"
                },
                {
                  type: "fill",
                  stemBefore: "C(s)+O₂(g)＝CO₂(g) ΔH=",
                  stemAfter: "kJ/mol（ΔH₂=−110.5，ΔH₃=−283.0）。",
                  answer: "−393.5",
                  accept: ["-393.5"],
                  hint: "盖斯定律",
                  tip: "−110.5+(−283.0)=−393.5。"
                },
                {
                  type: "choice",
                  stem: "温度不变，增大压强后 K？",
                  options: ["变大", "变小", "不变"],
                  answer: 2,
                  tip: "K 只与温度有关。"
                },
                {
                  type: "choice",
                  stem: "催化剂能？",
                  options: ["改变化学平衡", "同等加快正逆速率，平衡不动", "改变 ΔH"],
                  answer: 1,
                  tip: "两线同等变陡、平衡位置不动——催化剂不改 K。"
                },
                {
                  type: "fill",
                  stemBefore: "N₂+3H₂＝2NH₃，v(N₂)=0.3mol/(L·min)，则 v(H₂)=",
                  stemAfter: "mol/(L·min)。",
                  answer: "0.9",
                  accept: ["0.90"],
                  hint: "1∶3",
                  tip: "速率比=系数比=1∶3。"
                },
                {
                  type: "choice",
                  stem: "合成氨工业选高温、高压、催化剂，是因为？",
                  options: ["全为使平衡正向移动", "速率、平衡、成本综合权衡", "温度越高 K 越大"],
                  answer: 1,
                  tip: "高温不利平衡但有利速率——工业条件是综合权衡，不是单目标最优。"
                }
              ],
              point: "从定性到定量：ΔH、盖斯、速率、平衡——本章收官。"
            }
          ]
        }
      ]
    }
  ]
};
