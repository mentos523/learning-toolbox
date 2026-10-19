/* ============================================================
 * 学习工具箱 · 化学 · 第十六章数据（蓝队 2026-10-15，批3 cm12–cm16）
 * 化学反应速率与限度·能量：v=Δc/Δt；动态平衡；勒夏特列；吸放热；原电池
 *
 * Schema 冻结版 v1.0（见 data/cm05.js 头注释，全批复用）。
 * 组件口径见 docs/chemistry-interactions.md v1.1。
 * C9 equilibrium-shift：浓度/压强/温度三滑杆（Fe³⁺+SCN⁻ / N₂+3H₂⇌2NH₃）；
 *   recordKey 冻结格式 chm_shift_<课号>。
 * T6 边界句（跃升 9）原样上页见 cm16.1.2-p2。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm16"] = {
  id: "cm16",
  units: [
    {
      id: "cm16.1",
      title: "化学反应速率与限度",
      lessons: [
        {
          id: "cm16.1.1",
          title: "化学反应速率",
          prereq: "cm15.2.4 本章小结与习题",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm16.1.1-p1",
              kind: "interact",
              title: "H₂O₂ 分解有多快",
              exploreTip: "加 MnO₂ 前后各测一次：同样的时间，产生的 O₂ 差多少？",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "2H₂O₂ ＝MnO₂＝ 2H₂O + O₂↑" },
                    particles: [
                      { id: "h2o2", kind: "molecule", label: "H₂O₂", charge: null, role: "reactant", count: 6 },
                      { id: "h2o", kind: "molecule", label: "H₂O", charge: null, role: "product", count: 6 },
                      { id: "o2", kind: "molecule", label: "O₂", charge: null, role: "product", count: 3 }
                    ],
                    keyframes: [
                      { caption: "H₂O₂ 溶液常温分解很慢：几乎看不到气泡。", moves: [{ id: "h2o2", to: [28, 37] }] },
                      { caption: "加入 MnO₂：迅速产生大量气泡——2H₂O₂ ＝MnO₂＝ 2H₂O + O₂↑。", moves: [{ id: "h2o2", to: [40, 39] }, { id: "o2", to: [70, 18] }, { id: "h2o", to: [70, 47] }] },
                      { caption: "催化剂只改变化学反应速率，不移动化学平衡——口诀'一变三不变'，后面细讲。", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true,
                    equilibriumBadge: false,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。",
                    safety: "⚠ H₂O₂ 有腐蚀性：虚拟实验可重复试错；现实中须戴护目镜，不可直接接触皮肤。"
                  }
                }
              ],
              point: "催化剂加快反应速率：同样时间，O₂ 多得多——但平衡位置不变；催化剂不改 K（K = 平衡常数，cm18.2.2 见）。"
            },
            {
              id: "cm16.1.1-p2",
              kind: "explain",
              title: "v = Δc / Δt",
              blocks: [
                { type: "lead", text: "反应速率 = 浓度变化 ÷ 时间：v = Δc / Δt，单位 mol/(L·s) 或 mol/(L·min)。" },
                { type: "text", html: "v = Δc / Δt：Δc 是某物质浓度的变化量（取正值），Δt 是时间。同一反应，用不同物质表示的速率数值可能不同，但意义相同——因为系数比 = 速率比。" },
                { type: "text", html: "影响因素：浓度（浓度大速率快）、温度（温度高速率快）、催化剂（降低活化能，加快速率）。催化剂'一变三不变'：一变是只变反应速率，三不变是平衡不移动、ΔH（反应热）不变、K（平衡常数）不变。" },
                { type: "trap", text: "⚠ 别搞混：'催化剂改变化学平衡'？不改变！记'一变三不变'：只变速率，平衡不移动、ΔH（反应热）不变、K 不变（K = 平衡常数，cm18.2.2 见）。" }
              ],
              point: "v = Δc / Δt；影响速率：浓度、温度、催化剂——催化剂只变速率，不变平衡。"
            },
            {
              id: "cm16.1.1-p3",
              kind: "quiz",
              title: "自测：速率",
              questions: [
                {
                  type: "choice",
                  stem: "化学反应速率的单位是（  ）",
                  options: ["mol/L", "mol/(L·s)", "g/mol", "L/mol"],
                  answer: 1,
                  tip: "v ＝ Δc / Δt：浓度除以时间 → mol/(L·s) 或 mol/(L·min)。"
                },
                {
                  type: "choice",
                  stem: "加入催化剂，下列说法正确的是（  ）",
                  options: ["改变化学平衡", "只改变化学反应速率", "改变 ΔH", "使反应完全进行"],
                  answer: 1,
                  tip: "催化剂'一变三不变'：只变速率，平衡不移动、ΔH 不变、K 不变。"
                },
                {
                  type: "fill",
                  stemBefore: "某反应 2s 内 A 的浓度从 1.0 mol/L 降到 0.6 mol/L，v(A) ＝",
                  stemAfter: " mol/(L·s)。",
                  answer: "0.2",
                  accept: ["0.2 mol/(L·s)"],
                  hint: "v ＝ Δc / Δt，Δc 取正值",
                  tip: "Δc ＝ 1.0 − 0.6 ＝ 0.4；v ＝ 0.4 / 2 ＝ 0.2 mol/(L·s)。"
                }
              ],
              point: "v = Δc / Δt：Δc 取正值，单位带上——催化剂'一变三不变'：只变速率，平衡不移动、ΔH 不变、K 不变（K = 平衡常数，cm18.2.2 见）。"
            }
          ]
        },
        {
          id: "cm16.1.2",
          title: "化学平衡",
          prereq: "cm16.1.1 化学反应速率",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm16.1.2-p1",
              kind: "interact",
              title: "N₂+3H₂⇌2NH₃ 的'拉锯'",
              exploreTip: "拖动滑杆：加压、升温、加浓度，看平衡往哪边跑。",
              widgets: [
                {
                  type: "rate-equilibrium",
                  params: {
                    reaction: { equationText: "N₂ + 3H₂ ⇌ 2NH₃", gasStoich: { fwd: 4, rev: 2 } },
                    sliders: {
                      conc: { min: 1, max: 10, step: 1, init: 5, label: "反应物浓度" },
                      pressure: { min: 1, max: 100, step: 5, init: 10, label: "压强/MPa" },
                      temp: { min: 300, max: 800, step: 50, init: 500, label: "温度/K（ΔH < 0，放热）" }
                    },
                    mode: "qualitative",
                    equilibriumBadge: true,
                    shiftNote: "增大压强，平衡正向移动——减弱这种改变，不是抵消",
                    recordKey: "chm_shift_cm16.1.2"
                  }
                }
              ],
              point: "平衡移动：减弱这种改变，但不抵消——勒夏特列原理，下页细讲。"
            },
            {
              id: "cm16.1.2-p2",
              kind: "interact",
              title: "动态平衡：微观'拉锯'",
              exploreTip: "慢放看：正反应和逆反应都没停，只是速率相等了。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "N₂ + 3H₂ ⇌ 2NH₃" },
                    particles: [
                      { id: "n2", kind: "molecule", label: "N₂", charge: null, role: "reactant", count: 2 },
                      { id: "h2", kind: "molecule", label: "H₂", charge: null, role: "reactant", count: 6 },
                      { id: "nh3", kind: "molecule", label: "NH₃", charge: null, role: "product", count: 4 }
                    ],
                    keyframes: [
                      { caption: "开始：只有 N₂ 和 H₂，正反应速率大。", moves: [{ id: "n2", to: [24, 34] }, { id: "h2", to: [22, 35] }] },
                      { caption: "进行中：NH₃ 增多，逆反应速率跟上。", moves: [{ id: "n2", to: [41, 34] }, { id: "h2", to: [42, 36] }, { id: "nh3", to: [60, 38] }] },
                      { caption: "平衡时：正逆反应速率相等，浓度不再变——但反应没停！这就是动态平衡。", moves: [{ id: "n2", to: [47, 34] }, { id: "h2", to: [48, 36] }, { id: "nh3", to: [55, 38] }] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true,
                    equilibriumBadge: true,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。"
                  }
                }
              ],
              point: "化学平衡是动态平衡：v(正) = v(逆) ≠ 0——浓度不变，反应没停。"
            },
            {
              id: "cm16.1.2-p3",
              kind: "explain",
              title: "动态平衡",
              blocks: [
                { type: "lead", text: "化学平衡不是'反应停了'，是'正逆速率相等'：v(正) = v(逆) ≠ 0，浓度不再变。" },
                { type: "text", html: "化学平衡状态：在一定条件下，可逆反应正逆速率相等，各组分浓度保持不变。N₂ + 3H₂ ⇌ 2NH₃：平衡时浓度不再变，但正逆反应都没停。" },
                { type: "text", html: "化学平衡是动态平衡——'动'（正逆反应都没停）、'等'（v 正 = v 逆）、'定'（浓度不变）、'变'（条件一变，平衡就移动）。" },
                { type: "text", html: "化学平衡是'收支平衡'，不是'关门大吉'。账面不动但分子一直在进出——v 正 = v 逆，但都不等于零。" },
                { type: "oldfriend", text: "（还记得 cm15.1.1 的 SO₂ + H₂O ⇌ H₂SO₃ 吗？那个 ⇌ 就是可逆。化学平衡只谈可逆反应。）" }
              ],
              point: "平衡四字诀：动（没停）、等（速率等）、定（浓度定）、变（条件变则移动）。"
            },
            {
              id: "cm16.1.2-p4",
              kind: "quiz",
              title: "自测：平衡",
              questions: [
                {
                  type: "choice",
                  stem: "达到化学平衡时（  ）",
                  options: ["反应停止了", "v(正) = v(逆) ≠ 0", "反应物浓度为 0", "正反应速率大于逆反应速率"],
                  answer: 1,
                  tip: "化学平衡是动态平衡：v(正) ＝ v(逆) ≠ 0——浓度不变，反应没停！"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是（  ）",
                  options: ["平衡时各组分浓度相等", "不可逆反应也有化学平衡", "平衡时浓度不再变", "催化剂能改变化学平衡"],
                  answer: 2,
                  tip: "平衡时浓度不再变（但各组分浓度不一定相等）。只有可逆反应有平衡；催化剂不改变平衡。"
                },
                {
                  type: "fill",
                  stemBefore: "N₂ + 3H₂ ⇌ 2NH₃ 达到平衡的标志是 v(正)",
                  stemAfter: "v(逆)。（填 =/>/<）",
                  answer: "=",
                  accept: ["＝"],
                  hint: "动态平衡",
                  tip: "v(正) ＝ v(逆) ≠ 0——动态平衡的标志。"
                }
              ],
              point: "平衡 = 动态：v 正 = v 逆 ≠ 0——'浓度不变'不等于'反应停止'。"
            }
          ]
        },
        {
          id: "cm16.1.3",
          title: "化学平衡移动",
          prereq: "cm16.1.2 化学平衡",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm16.1.3-p1",
              kind: "interact",
              title: "Fe³⁺ + SCN⁻：颜色'说话'",
              exploreTip: "加 Fe³⁺、加 SCN⁻、加热：看血红色深浅——颜色就是平衡移动的'直播'。",
              widgets: [
                {
                  type: "rate-equilibrium",
                  params: {
                    reaction: { equationText: "Fe³⁺ + SCN⁻ ⇌ [Fe(SCN)]²⁺", gasStoich: { fwd: 0, rev: 0 } },
                    sliders: {
                      conc: { min: 1, max: 10, step: 1, init: 5, label: "Fe³⁺ 浓度" },
                      temp: { min: 273, max: 373, step: 10, init: 298, label: "温度/K" }
                    },
                    mode: "qualitative",
                    equilibriumBadge: true,
                    shiftNote: "血红色深浅 = [Fe(SCN)]²⁺ 浓度——平衡移动看得见",
                    recordKey: "chm_shift_cm16.1.3"
                  }
                }
              ],
              point: "颜色深浅 = [Fe(SCN)]²⁺ 浓度——平衡移动看得见。"
            },
            {
              id: "cm16.1.3-p2",
              kind: "explain",
              title: "勒夏特列：减弱，不抵消",
              blocks: [
                { type: "lead", text: "平衡移动的方向：系统总是'减弱'外界改变带来的影响——但减弱不等于抵消。" },
                { type: "text", html: "勒夏特列原理：如果改变影响平衡的条件（如浓度、压强、温度），平衡就向减弱这种改变的方向移动。加压 → 向气体体积减小的方向；升温 → 向吸热方向；增大反应物浓度 → 向正反应方向。" },
                { type: "text", html: "合成氨：N₂ + 3H₂ ⇌ 2NH₃（ΔH < 0）。高压、低温有利平衡正移——但低温速率太慢，实际用 500℃ + 催化剂：平衡和速率的折中。" },
                { type: "trap", text: "⚠ 别搞混：'平衡移动能抵消外界改变'？只能减弱，不能抵消！'催化剂使平衡正移'？催化剂不改变平衡！" }
              ],
              point: "勒夏特列：减弱这种改变，但不抵消——合成氨是平衡与速率的折中。"
            },
            {
              id: "cm16.1.3-p3",
              kind: "quiz",
              title: "自测：平衡移动",
              questions: [
                {
                  type: "choice",
                  stem: "N₂ + 3H₂ ⇌ 2NH₃（ΔH < 0），使平衡正向移动的条件是（  ）",
                  options: ["升温减压", "降温加压", "加催化剂", "减小 N₂ 浓度"],
                  answer: 1,
                  tip: "加压 → 向气体体积减小的方向（正向）；降温 → 向放热方向（正向）。加催化剂：只加快率、不移动平衡，更不改 K（K = 平衡常数，cm18.2.2 见）。"
                },
                {
                  type: "choice",
                  stem: "Fe³⁺ + SCN⁻ ⇌ [Fe(SCN)]²⁺，加入 FeCl₃ 溶液，血红色（  ）",
                  options: ["变深", "变浅", "不变", "先深后浅"],
                  answer: 0,
                  tip: "增大 Fe³⁺ 浓度 → 平衡正移 → [Fe(SCN)]²⁺ 增多 → 血红色变深。"
                },
                {
                  type: "fill",
                  stemBefore: "平衡移动只能",
                  stemAfter: "外界改变，不能抵消。（填减弱/增强）",
                  answer: "减弱",
                  accept: [],
                  hint: "勒夏特列原理",
                  tip: "勒夏特列：平衡向减弱这种改变的方向移动——减弱，不抵消。"
                }
              ],
              point: "浓度、压强、温度：三杆子一推，平衡就往'减弱'的方向跑。"
            }
          ]
        }
      ]
    },
    {
      id: "cm16.2",
      title: "化学反应中的能量与电",
      lessons: [
        {
          id: "cm16.2.1",
          title: "吸热与放热",
          prereq: "cm16.1.3 化学平衡移动",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm16.2.1-p1",
              kind: "interact",
              title: "摸得到的吸热",
              exploreTip: "看烧杯外壁结霜：这个反应吸热——也能'制冷'。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "Ba(OH)₂·8H₂O + 2NH₄Cl ＝ BaCl₂ + 2NH₃↑ + 10H₂O" },
                    particles: [
                      { id: "baoh2", kind: "molecule", label: "Ba(OH)₂·8H₂O", charge: null, role: "reactant", count: 2 },
                      { id: "nh4cl", kind: "molecule", label: "NH₄Cl", charge: null, role: "reactant", count: 4 },
                      { id: "bacl2", kind: "molecule", label: "BaCl₂", charge: null, role: "product", count: 2 },
                      { id: "nh3", kind: "molecule", label: "NH₃", charge: null, role: "product", count: 4 },
                      { id: "h2o", kind: "molecule", label: "H₂O", charge: null, role: "product", count: 20 }
                    ],
                    keyframes: [
                      { caption: "Ba(OH)₂·8H₂O 与 NH₄Cl 混合搅拌。", moves: [{ id: "baoh2", to: [26, 30] }, { id: "nh4cl", to: [28, 46] }] },
                      { caption: "烧杯外壁结霜、有刺激性气味（NH₃）——反应吸热！", moves: [{ id: "baoh2", to: [28, 34] }, { id: "nh4cl", to: [30, 48] }, { id: "nh3", to: [74, 20] }] },
                      { caption: "Ba(OH)₂·8H₂O + 2NH₄Cl ＝ BaCl₂ + 2NH₃↑ + 10H₂O：吸热反应也能自发进行。", moves: [{ id: "baoh2", to: [28, 36] }, { id: "nh4cl", to: [30, 48] }], form: [{ ids: ["baoh2", "nh4cl"], label: "BaCl₂" }], fade: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。",
                    safety: "⚠ NH₃ 有刺激性气味：虚拟实验可重复试错；现实中须在通风处进行，避免吸入。"
                  }
                }
              ],
              point: "吸热反应也能发生：Ba(OH)₂·8H₂O + NH₄Cl——烧杯结霜就是证据。"
            },
            {
              id: "cm16.2.1-p2",
              kind: "explain",
              title: "断键吸热，成键放热",
              blocks: [
                { type: "lead", text: "吸热还是放热，看'两笔账'：断开旧键吸热，形成新键放热——谁大谁说了算。" },
                { type: "text", html: "断键吸热，成键放热：断开反应物的化学键吸收能量，形成生成物的化学键放出能量。放出的 > 吸收的 → 放热反应（如燃烧）；吸收的 > 放出的 → 吸热反应（如 Ba(OH)₂·8H₂O + NH₄Cl、C + H₂O ＝高温＝ CO + H₂）。" },
                { type: "text", html: "ΔH < 0 放热，ΔH > 0 吸热。常见的放热：燃烧、中和、金属与酸；常见的吸热：Ba(OH)₂·8H₂O + NH₄Cl、C + CO₂ ＝高温＝ 2CO。" },
                { type: "physicslink", text: "物理呼应·奠基：物理 p03.2.2 内能与比热容——热量、内能是理解吸热/放热的物理底座：化学键里存着的，就是内能的一种。" },
                { type: "trap", text: "⚠ 别搞混：'吸热反应不能自发'？Ba(OH)₂·8H₂O + NH₄Cl 自发吸热！点燃、加热是条件，不是吸放热！" },
                { type: "widget", widget: { type: "bond-step", params: {
                  title: "两笔账：断键吸热，成键放热",
                  layout: "energy",
                  steps: [
                    { stepIndex: 0, label: "断开旧键：吸收能量", "break": ["反应物的化学键"], form: [],
                      molStage: "break", energyLabel: "吸收能量", curveSlopeSign: 1,
                      caption: "断开反应物的化学键——吸收能量" },
                    { stepIndex: 1, label: "形成新键：放出能量", "break": [], form: ["生成物的化学键"],
                      molStage: "form", energyLabel: "放出能量", curveSlopeSign: -1,
                      caption: "形成生成物的化学键——放出能量" },
                    { stepIndex: 2, label: "结算：放出的 ＞ 吸收的 → 放热", "break": [], form: [], annotate: true,
                      molStage: "form", settleLabel: "放出的 ＞ 吸收的 → 放热",
                      caption: "两笔账一算：放出的 ＞ 吸收的 → 放热反应" }
                  ],
                  scene: { energyCurve: { points: [{ x: 5, y: 30 }, { x: 50, y: 8 }, { x: 95, y: 22 }] } },
                  autoplay: true,
                  reminder: "粒子大小、数量、运动速度均为示意，未按真实比例；粒子碰撞为示意，非真实碰撞过程。\n提醒：能量曲线是示意曲线，不是实测数据；\"断键\"和\"成键\"在真实反应里常常是交织进行的，这里为了讲清道理把它们拆成了两步。",
                  ax01: { assumptions: ["断键与成键分两步呈现（示意）"], approximations: ["能量曲线为示意曲线"], errorEstimate: "定性示意，无数值口径" }
                } } }
              ],
              point: "断键吸热、成键放热：两笔账一算，吸放热自明——条件（点燃/加热）不是吸放热。"
            },
            {
              id: "cm16.2.1-p3",
              kind: "quiz",
              title: "自测：吸放热",
              questions: [
                {
                  type: "choice",
                  stem: "下列属于吸热反应的是（  ）",
                  options: ["木材燃烧", "Ba(OH)₂·8H₂O + NH₄Cl", "酸碱中和", "Na 与水反应"],
                  answer: 1,
                  tip: "Ba(OH)₂·8H₂O + 2NH₄Cl ＝ BaCl₂ + 2NH₃↑ + 10H₂O：烧杯结霜——吸热反应。"
                },
                {
                  type: "choice",
                  stem: "ΔH < 0 表示（  ）",
                  options: ["吸热反应", "放热反应", "无能量变化", "反应不能进行"],
                  answer: 1,
                  tip: "ΔH < 0 放热，ΔH > 0 吸热。"
                },
                {
                  type: "fill",
                  stemBefore: "断开化学键",
                  stemAfter: "能量，形成化学键放出能量。（填吸收/放出）",
                  answer: "吸收",
                  accept: [],
                  hint: "两笔账",
                  tip: "断键吸热，成键放热——谁大谁说了算。"
                }
              ],
              point: "断键吸热、成键放热——吸放热看能量账，不看要不要加热。"
            }
          ]
        },
        {
          id: "cm16.2.2",
          title: "原电池",
          prereq: "cm16.2.1 吸热与放热",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm16.2.2-p1",
              kind: "interact",
              title: "Cu—Zn 原电池",
              exploreTip: "看电子走哪条路：只走导线，不走溶液——电流表指针偏转就是证据。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "Zn + 2H⁺ ＝ Zn²⁺ + H₂↑", eTransfer: true },
                    particles: [
                      { id: "zn", kind: "atom", label: "Zn", charge: null, role: "reactant", count: 2 },
                      { id: "h", kind: "atom", label: "H⁺", charge: null, role: "reactant", count: 4 },
                      { id: "zn2", kind: "atom", label: "Zn²⁺", charge: null, role: "product", count: 2 },
                      { id: "h2", kind: "molecule", label: "H₂", charge: null, role: "product", count: 2 }
                    ],
                    keyframes: [
                      { caption: "Zn 片、Cu 片插入稀硫酸，用导线连接，电流表指针偏转。", moves: [{ id: "zn", to: [18, 37] }, { id: "h", to: [34, 34] }] },
                      { caption: "Zn 片溶解（Zn → Zn²⁺ + 2e⁻，负极），Cu 片上有气泡（2H⁺ + 2e⁻ → H₂↑，正极）。", moves: [{ id: "zn", to: [20, 37] }, { id: "h", to: [49, 34] }, { id: "h2", to: [66, 22] }, { id: "zn2", to: [64, 40] }] },
                      { caption: "电子只走导线（Zn → Cu），不走溶液——化学能变成了电能。", moves: [{ id: "zn", to: [22, 37] }, { id: "h", to: [50, 34] }], form: [{ ids: ["zn"], label: "Zn²⁺" }, { ids: ["h"], label: "H₂" }], fade: [] }
                    ],
                    counter: false,
                    spectatorFade: false,
                    slowmo: true,
                    scaleNote: "示意：电子画成小球是示意；微观粒子大小、数量、运动速度均为示意，未按真实比例。"
                  }
                }
              ],
              point: "原电池：Zn 负极失电子，Cu 正极得电子——电子只走导线，化学能变电能。"
            },
            {
              id: "cm16.2.2-p2",
              kind: "explain",
              title: "正负极",
              blocks: [
                { type: "lead", text: "原电池 = 自发的氧化还原反应 + 电子分流：氧化反应在负极，还原反应在正极。" },
                { type: "text", html: "Cu—Zn 原电池：负极（Zn）：Zn → Zn²⁺ + 2e⁻（失电子，氧化反应）；正极（Cu）：2H⁺ + 2e⁻ → H₂↑（得电子，还原反应）。总反应：Zn + 2H⁺ ＝ Zn²⁺ + H₂↑。" },
                { type: "text", html: "电子只走导线，不走溶液——溶液靠离子移动导电。判断口诀：失电子的是负极（'失负'谐音'师父'），得电子的是正极。" },
                { type: "physicslink", text: "物理呼应·奠基：物理 p08.1.2 电流与电路——电子定向移动形成电流；原电池就是把“电子的定向移动”接出来用。" },
                { type: "trap", text: "⚠ 别搞混：'电子走溶液'？电子只走导线！'正极失电子'？正极得电子（还原反应）！Cu 比 Zn 活泼？Zn 比 Cu 活泼，Zn 做负极！" }
              ],
              point: "负极失电子（氧化），正极得电子（还原）——电子只走导线，离子走溶液。"
            },
            {
              id: "cm16.2.2-p3",
              kind: "quiz",
              title: "自测：原电池",
              questions: [
                {
                  type: "choice",
                  stem: "Cu—Zn 原电池中，负极是（  ）",
                  options: ["Cu", "Zn", "稀硫酸", "导线"],
                  answer: 1,
                  tip: "Zn 比 Cu 活泼：Zn 失电子 → Zn²⁺，做负极。"
                },
                {
                  type: "choice",
                  stem: "原电池中电子的流向是（  ）",
                  options: ["经溶液从负极到正极", "经导线从负极到正极", "经导线从正极到负极", "不流动"],
                  answer: 1,
                  tip: "电子只走导线：从负极（Zn）流向正极（Cu）——溶液靠离子导电。"
                },
                {
                  type: "fill",
                  stemBefore: "Cu—Zn 原电池正极的电极反应式是 2H⁺ + 2e⁻ →",
                  stemAfter: "↑。",
                  answer: "H₂",
                  accept: ["H2"],
                  hint: "得电子，还原",
                  tip: "正极：2H⁺ + 2e⁻ → H₂↑（得电子，还原反应）——Cu 片上冒气泡。"
                }
              ],
              point: "失电子负极，得电子正极——电子走导线，离子走溶液。"
            }
          ]
        },
        {
          id: "cm16.2.3",
          title: "本章小结与习题",
          prereq: "cm16.2.2 原电池",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm16.2.3-p1",
              kind: "quiz",
              title: "小结：速率 · 平衡 · 能量",
              questions: [
                {
                  type: "review",
                  html: "本章小结：① v＝Δc/Δt；影响速率：浓度、温度、催化剂（一变三不变：只变速率，平衡、ΔH、K 都不变）。② 化学平衡：动态平衡，v(正)＝v(逆)≠0，浓度不变。③ 勒夏特列：平衡向减弱这种改变的方向移动（不抵消）。④ 断键吸热、成键放热；ΔH<0 放热，ΔH>0 吸热。⑤ 原电池：负极失电子（氧化），正极得电子（还原）；电子只走导线。"
                },
                {
                  type: "choice",
                  stem: "下列能改变化学平衡的是（  ）",
                  options: ["加催化剂", "增大反应物浓度", "加惰性气体（体积不变）", "缩小容器体积（无气体）"],
                  answer: 1,
                  tip: "催化剂不改变平衡。增大反应物浓度 → 平衡正移。"
                },
                {
                  type: "choice",
                  stem: "Cu—Zn 原电池中，电子流向是（  ）",
                  options: ["Zn → Cu（经导线）", "Cu → Zn（经导线）", "Zn → Cu（经溶液）", "不流动"],
                  answer: 0,
                  tip: "电子只走导线：从负极 Zn 流向正极 Cu。"
                },
                {
                  type: "fill",
                  stemBefore: "N₂ + 3H₂ ⇌ 2NH₃（ΔH < 0），升温平衡向",
                  stemAfter: "反应方向移动。（填正/逆）",
                  answer: "逆",
                  accept: [],
                  hint: "升温 → 向吸热方向",
                  tip: "ΔH < 0 正向放热：升温 → 向吸热方向（逆向）移动。"
                }
              ],
              point: "速率看 v=Δc/Δt，平衡看动态，移动看勒夏特列，能量看断键成键。"
            },
            {
              id: "cm16.2.3-p2",
              kind: "quiz",
              title: "综合：生活 + 定量",
              questions: [
                {
                  type: "choice",
                  stem: "切开的苹果变黄、暖宝宝发热，分别利用了（  ）",
                  options: ["氧化反应、氧化反应放热", "还原反应、吸热反应", "置换反应、原电池", "复分解反应、催化"],
                  answer: 0,
                  tip: "生活中的化学：苹果变黄是果肉被空气氧化；暖宝宝是铁粉氧化放热。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是（  ）",
                  options: ["催化剂能使平衡正移", "平衡移动能抵消外界改变", "吸热反应都不能自发", "断键吸收能量"],
                  answer: 3,
                  tip: "断键吸热，成键放热。催化剂不改变平衡；平衡移动只能减弱不能抵消；吸热反应可自发。"
                },
                {
                  type: "fill",
                  stemBefore: "0.2 mol H₂O₂ 完全分解，生成 O₂ 的物质的量是",
                  stemAfter: " mol。",
                  answer: "0.1 mol",
                  accept: ["0.1mol", "0.1"],
                  hint: "2H₂O₂ ＝MnO₂＝ 2H₂O + O₂↑",
                  tip: "系数比 H₂O₂∶O₂ ＝ 2∶1 → n(O₂) ＝ 0.2/2 ＝ 0.1 mol。"
                }
              ],
              point: "定量题自查：方程式配平了吗？代入的是纯净物质量吗？单位写对了吗？（系数比用对了吗？）下一站 cm17 有机化学入门——原理主线暂停，有机小支线插入；cm18 再回原理主线。"
            }
          ]
        }
      ]
    }
  ]
};
