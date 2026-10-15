/* ============================================================
 * 学习工具箱 · 化学 · 第二十一章数据（蓝队 2026-10-15，阶段三批4）
 * 有机化学基础（选择性必修三）· 7 课 / 19 页
 *
 * 数据格式：schema v1.0 冻结（见 data/cm05.js 文件头）。
 * 组件类型名冻结（docs/chemistry-interactions.md）：
 *   side-compare(Y11复用物理Y5) / lab-assemble(C5) /
 *   reaction-particle(C7) / safety-badge(Y2)
 * 落点：同分异构三类型（回填 cm17.1.2）；红线辨析③ 裂化≠分馏；
 *       取代 vs 消去条件（水代醇消）；苯酚与 Na₂CO₃ 生成 NaHCO₃ 不放 CO₂；
 *       酯水解酸性可逆/碱性不可逆；银氨溶液现配现用（Y2）。
 * window.CHEM_CH["cm21"] = { id, units[] }（注册由引擎 index.html script 标签完成）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm21"] = {
  id: "cm21",
  units: [
    {
      id: "cm21.1",
      title: "有机结构基础",
      lessons: [
        {
          id: "cm21.1.1",
          title: "有机物的结构特点与研究方法",
          prereq: "cm20.2.2 配位键与配合物",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm21.1.1-p1",
              kind: "explain",
              title: "同分异构三类型 + 研究方法",
              blocks: [
                { type: "lead", text: "C₂H₆O：乙醇能与 Na 反应，二甲醚却很稳定——清单一样，拼法不同，脾气两样。" },
                { type: "oldfriend", text: "（cm17.1.2 拼过的两种丁烷：分子式是“原料清单”，结构是“拼装图纸”。）" },
                { type: "text", html: "三类型：碳链异构（正丁烷/异丁烷）、位置异构（1-丁烯/2-丁烯）、官能团异构（乙醇/二甲醚）。" },
                { type: "text", html: "三件套：质谱 → 相对分子质量（不是结构式！）；核磁共振氢谱 → 等效氢种类与个数比（CH₃CH₂OH 三组峰 3∶2∶1）；红外光谱 → 官能团。" },
                { type: "mathlink", text: "奠基：代数 ch01 比例——峰面积比 = 氢原子个数比。" },
                { type: "trap", text: "⚠ 别搞混：质谱给不出结构式；峰面积比 = 氢原子个数比。" }
              ],
              point: "先称多重，再数几种氢，最后认官能团。下一页：三件套对照。"
            },
            {
              id: "cm21.1.1-p2",
              kind: "interact",
              title: "研究方法三件套",
              exploreTip: "对照三栏：每种方法测什么、得到什么，什么时候用。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "质谱 / 红外光谱",
                      rows: ["质谱：测相对分子质量", "红外光谱：看官能团（有哪些化学键）"]
                    },
                    right: {
                      title: "核磁共振氢谱",
                      rows: ["看等效氢有几种（几组峰）", "峰面积比 = 氢原子个数比", "CH₃CH₂OH：三组峰 3∶2∶1"]
                    },
                    verdict: "先称“多重”（质谱），再数“几种氢”（核磁），最后认“官能团”（红外）"
                  }
                }
              ],
              point: "质谱称重、核磁数氢、红外认官能团——各管一摊。"
            },
            {
              id: "cm21.1.1-p3",
              kind: "quiz",
              title: "练一练：异构与方法",
              questions: [
                {
                  type: "choice",
                  stem: "乙醇与二甲醚（C₂H₆O）互为？",
                  options: ["碳链异构", "官能团异构", "位置异构"],
                  answer: 1,
                  tip: "分子式相同、官能团不同（–OH vs –O–）。"
                },
                {
                  type: "choice",
                  stem: "要确定有机物的相对分子质量，用？",
                  options: ["核磁共振氢谱", "质谱", "红外光谱"],
                  answer: 1,
                  tip: "质谱 → 相对分子质量；核磁 → H 种类个数比；红外 → 官能团。"
                },
                {
                  type: "choice",
                  stem: "CH₃CH₂OH 核磁共振氢谱三组峰面积比 3∶2∶1，面积为 1 的峰对应？",
                  options: ["CH₃", "CH₂", "OH"],
                  answer: 2,
                  tip: "3 个 H（CH₃）∶2 个 H（CH₂）∶1 个 H（OH）。"
                }
              ],
              point: "异构三类型 + 研究三件套——有机结构基础打好。"
            }
          ]
        },
        {
          id: "cm21.1.2",
          title: "烃（深化）",
          prereq: "cm21.1.1 有机物的结构特点与研究方法",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm21.1.2-p1",
              kind: "explain",
              title: "系统命名 + 乙炔制取",
              blocks: [
                { type: "lead", text: "烷/烯/炔/芳香烃的名字不能乱起——系统命名法是化学家的“普通话”。" },
                { type: "text", html: "选最长碳链为主链，编号让取代基/官能团位次最小。如 CH₃CH(CH₃)CH₃：2-甲基丙烷。" },
                { type: "text", html: "分馏是物理变化（按沸点分）；裂化/裂解是化学变化（长链断短链）——红线辨析③：看分子种类变没变！" },
                { type: "text", html: "乙炔制法：CaC₂ + 2H₂O = Ca(OH)₂ + C₂H₂↑。必须用分液漏斗控速（放热剧烈）+ 防倒吸！" },
                { type: "mathlink", text: "奠基：代数 ch09 数列——各烃通式又是一串数列。" },
                { type: "trap", text: "⚠ 别搞混：裂化 ≠ 分馏！电石与水不能直接混合——分液漏斗控速 + 防倒吸。" }
              ],
              point: "命名看主链和位次；裂化是化学变化。下一页：组装乙炔发生装置。"
            },
            {
              id: "cm21.1.2-p2",
              kind: "interact",
              title: "组装：乙炔制取装置",
              exploreTip: "拖仪器到槽位组装，再跟着步骤回放走一遍：别漏了防倒吸检查点。",
              widgets: [
                {
                  type: "lab-assemble",
                  params: {
                    apparatus: "c2h2",
                    pieces: [
                      { id: "p1", kind: "flask", label: "广口瓶" },
                      { id: "p2", kind: "sepFunnel", label: "分液漏斗" },
                      { id: "p3", kind: "plug", label: "双孔塞" },
                      { id: "p4", kind: "tube", label: "导管" },
                      { id: "p5", kind: "trough", label: "水槽" },
                      { id: "p6", kind: "gasJar", label: "集气瓶" }
                    ],
                    slots: [
                      { id: "s1", accepts: ["flask"], hint: "发生装置：装电石" },
                      { id: "s2", accepts: ["sepFunnel"], hint: "分液漏斗：控制滴水速度" },
                      { id: "s3", accepts: ["tube"], hint: "导管：防倒吸装置接在这里" },
                      { id: "s4", accepts: ["gasJar"], hint: "排水法收集乙炔" }
                    ],
                    steps: [
                      { caption: "检查装置气密性", highlight: ["s1"] },
                      { caption: "装入电石（CaC₂），塞紧双孔塞", highlight: ["s1", "s2"] },
                      { caption: "分液漏斗中加水，缓慢滴加控制反应速率", highlight: ["s2"] },
                      { caption: "确认防倒吸装置就位", highlight: ["s3"] },
                      { caption: "排水法收集乙炔", highlight: ["s4"] }
                    ],
                    safetyChecks: [
                      { id: "sc1", text: "确认：防倒吸装置已接好（防止水倒吸入热的烧瓶）", mustPass: true },
                      { id: "sc2", text: "确认：用分液漏斗缓慢滴加，不直接混合", mustPass: true }
                    ],
                    realityNote: "虚拟实验为示意：现实中电石与水反应放热剧烈，必须用分液漏斗控制滴速；点燃乙炔前必须验纯，须在老师指导下操作。"
                  }
                }
              ],
              point: "分液漏斗控速、防倒吸就位——规范动作防具体事故。"
            },
            {
              id: "cm21.1.2-p3",
              kind: "quiz",
              title: "练一练：命名与规范",
              questions: [
                {
                  type: "choice",
                  stem: "CH₃CH(CH₃)CH₃ 的系统命名是？",
                  options: ["正丁烷", "2-甲基丙烷", "异丁烷"],
                  answer: 1,
                  tip: "最长链 3 个碳，甲基在 2 号位。"
                },
                {
                  type: "choice",
                  stem: "石油的裂化属于？",
                  options: ["物理变化", "化学变化", "既不是"],
                  answer: 1,
                  tip: "长链断短链：分子种类变了——化学变化（红线辨析③）。"
                },
                {
                  type: "choice",
                  stem: "制取乙炔时必须？",
                  options: ["电石与水直接混合", "分液漏斗控速 + 防倒吸", "加热"],
                  answer: 1,
                  tip: "反应放热剧烈：控速防冲料，防倒吸防炸裂。"
                }
              ],
              point: "命名、裂化、制取规范——烃深化收官。"
            }
          ]
        }
      ]
    },
    {
      id: "cm21.2",
      title: "烃的衍生物",
      lessons: [
        {
          id: "cm21.2.1",
          title: "卤代烃",
          prereq: "cm21.1.2 烃（深化）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm21.2.1-p1",
              kind: "explain",
              title: "取代 vs 消去：条件说了算",
              blocks: [
                { type: "lead", text: "溴乙烷 + NaOH：水溶液加热 → 乙醇；醇溶液加热 → 乙烯。试剂一样，溶剂一换，产物全变——条件决定去向。" },
                { type: "text", html: "取代：CH₃CH₂Br + NaOH ＝水溶液,加热＝ CH₃CH₂OH + NaBr（Br 被 –OH 取代）。消去：CH₃CH₂Br + NaOH ＝醇溶液,加热＝ CH₂=CH₂↑ + NaBr + H₂O（脱去 HBr，形成 C=C）。" },
                { type: "text", html: "卤素原子检验：先加稀 HNO₃ 酸化，再加 AgNO₃——淡黄色 AgBr 沉淀。不先酸化？NaOH 会跟 AgNO₃ 反应，干扰判断！" },
                { type: "trap", text: "⚠ 别搞混：NaOH 水溶液=取代，NaOH 醇溶液=消去——这是全书最高频的条件混淆点；检验 Br⁻ 前必须酸化！" }
              ],
              point: "水代醇消：溶剂不同，去向不同。下一页：对照表一次记牢。"
            },
            {
              id: "cm21.2.1-p2",
              kind: "interact",
              title: "取代 vs 消去对照",
              exploreTip: "对照两栏：条件、产物、断键成键，一处一处对。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "取代反应",
                      rows: ["条件：NaOH 水溶液，加热", "CH₃CH₂Br → CH₃CH₂OH", "Br 被 –OH 取代", "断 C–Br，形成 C–O"]
                    },
                    right: {
                      title: "消去反应",
                      rows: ["条件：NaOH 醇溶液，加热", "CH₃CH₂Br → CH₂=CH₂", "脱去 HBr", "断 C–Br 和 C–H，形成 C=C"]
                    },
                    verdict: "试剂一样，溶剂不同，反应类型完全不同——条件决定去向"
                  }
                }
              ],
              point: "条件决定去向——做题先看条件。"
            },
            {
              id: "cm21.2.1-p3",
              kind: "quiz",
              title: "练一练：水代醇消",
              questions: [
                {
                  type: "choice",
                  stem: "CH₃CH₂Br → CH₂=CH₂ 选用的条件是？",
                  options: ["NaOH 水溶液，加热", "NaOH 醇溶液，加热", "直接加热"],
                  answer: 1,
                  tip: "水代醇消：消去用醇溶液。"
                },
                {
                  type: "choice",
                  stem: "检验溴乙烷水解液中的 Br⁻，第一步是？",
                  options: ["直接加 AgNO₃", "加稀 HNO₃ 酸化", "加热"],
                  answer: 1,
                  tip: "先酸化：排除 NaOH 的干扰。"
                },
                {
                  type: "fill",
                  stemBefore: "CH₃CH₂Br 在 NaOH 水溶液中加热，产物是",
                  stemAfter: "。",
                  answer: "乙醇",
                  accept: ["CH₃CH₂OH", "C₂H₅OH"],
                  hint: "取代",
                  tip: "Br 被 –OH 取代：CH₃CH₂OH。"
                }
              ],
              point: "水代醇消 + 先酸化——卤代烃两条铁律。"
            }
          ]
        },
        {
          id: "cm21.2.2",
          title: "醇·酚",
          prereq: "cm21.2.1 卤代烃",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm21.2.2-p1",
              kind: "explain",
              title: "苯酚：羟基连上苯环，全变了",
              blocks: [
                { type: "lead", text: "乙醇的 –OH 温和；苯酚的 –OH 连在苯环上，有了酸性——苯环“带坏”了羟基。" },
                { type: "text", html: "乙醇：与 Na 放 H₂、与 HBr 取代、催化氧化成乙醛、浓硫酸 170℃ 消去成乙烯。" },
                { type: "text", html: "苯酚（弱酸）：C₆H₅OH+NaOH=C₆H₅ONa+H₂O；C₆H₅OH+Na₂CO₃=C₆H₅ONa+NaHCO₃（不放 CO₂！酸性 H₂CO₃>苯酚>HCO₃⁻）。极弱酸：不能使指示剂变色！" },
                { type: "text", html: "FeCl₃ 显紫色；浓溴水白色沉淀（三溴苯酚）。苯环使 –OH 的 H 更活泼。" },
                { type: "trap", text: "⚠ 别搞混：苯酚不能使指示剂变色；与 Na₂CO₃ 生成 NaHCO₃，不放 CO₂！" }
              ],
              point: "苯环活化了羟基：比醇活泼，比碳酸弱。下一页：三性质对照。"
            },
            {
              id: "cm21.2.2-p2",
              kind: "interact",
              title: "苯酚三性质对照",
              exploreTip: "对照两栏：弱酸性 vs 特征反应——现象和结论配对记。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "弱酸性",
                      rows: ["与 NaOH：C₆H₅OH + NaOH = C₆H₅ONa + H₂O", "与 Na₂CO₃：生成 NaHCO₃，不放 CO₂", "极弱酸：不能使指示剂变色"]
                    },
                    right: {
                      title: "特征反应",
                      rows: ["FeCl₃：显紫色", "浓溴水：白色沉淀（三溴苯酚）", "可用于检验苯酚"]
                    },
                    verdict: "羟基连在苯环上，性质全变：比醇活泼，比碳酸弱"
                  }
                }
              ],
              point: "紫色（FeCl₃）、白沉淀（浓溴水）——苯酚的“身份证”。"
            },
            {
              id: "cm21.2.2-p3",
              kind: "quiz",
              title: "练一练：酚羟基的脾气",
              questions: [
                {
                  type: "choice",
                  stem: "苯酚与 Na₂CO₃ 溶液反应的产物是？",
                  options: ["C₆H₅ONa + CO₂↑", "C₆H₅ONa + NaHCO₃", "不反应"],
                  answer: 1,
                  tip: "酸性：H₂CO₃ > 苯酚 > HCO₃⁻——只到 NaHCO₃，不放 CO₂。"
                },
                {
                  type: "choice",
                  stem: "检验苯酚可选用？",
                  options: ["石蕊试液", "FeCl₃ 溶液", "pH 试纸"],
                  answer: 1,
                  tip: "FeCl₃ 显紫色是苯酚的特征反应。"
                },
                {
                  type: "choice",
                  stem: "乙醇不能，而苯酚能的是？",
                  options: ["与 Na 反应", "与 NaOH 反应", "燃烧"],
                  answer: 1,
                  tip: "苯酚有弱酸性：与 NaOH 反应；乙醇的 –OH 不行。"
                }
              ],
              point: "比醇活泼、比碳酸弱——酚羟基一次讲透。"
            }
          ]
        },
        {
          id: "cm21.2.3",
          title: "醛·羧酸·酯",
          prereq: "cm21.2.2 醇·酚",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm21.2.3-p1",
              kind: "explain",
              title: "官能团接力",
              blocks: [
                { type: "lead", text: "乙醇 → 乙醛 → 乙酸 → 乙酸乙酯：官能团一步一步“升级”，每步都有特征反应认路。" },
                { type: "text", html: "乙醛 CH₃CHO：银镜反应（CH₃CHO + 2[Ag(NH₃)₂]OH ＝水浴加热＝ CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O）——乙醛被氧化，银氨溶液被还原；新制 Cu(OH)₂：砖红色 Cu₂O 沉淀。" },
                { type: "text", html: "乙酸：酸性 + 酯化（CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O）。酯的水解：酸性条件下可逆，碱性条件下不可逆（CH₃COOC₂H₅ + NaOH = CH₃COONa + C₂H₅OH）。" },
                { type: "trap", text: "⚠ 别搞混：银镜的“银”是还原产物——乙醛被氧化了！酯水解有条件：酸性可逆、碱性不可逆。" }
              ],
              point: "–OH → –CHO → –COOH → –COO–：官能团接力。下一页看银镜反应。"
            },
            {
              id: "cm21.2.3-p2",
              kind: "interact",
              title: "银镜反应：水浴加热",
              exploreTip: "按 ▶ 看银镜生成：谁被氧化、谁被还原？再看安全徽章。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "CH₃CHO + 2[Ag(NH₃)₂]OH =(水浴加热)= CH₃COONH₄ + 2Ag↓ + 3NH₃ + H₂O" },
                    particles: [
                      { id: "ald", kind: "molecule", label: "CH₃CHO", charge: null, role: "reactant", count: 1 },
                      { id: "ag", kind: "molecule", label: "[Ag(NH₃)₂]OH", charge: null, role: "reactant", count: 2 },
                      { id: "pro", kind: "molecule", label: "CH₃COONH₄", charge: null, role: "product", count: 1 },
                      { id: "agm", kind: "atom", label: "Ag", charge: null, role: "product", count: 2 },
                      { id: "nh3", kind: "molecule", label: "NH₃", charge: null, role: "product", count: 3 },
                      { id: "w", kind: "molecule", label: "H₂O", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "洁净试管 + 银氨溶液（现配现用）+ 乙醛，水浴加热", moves: [] },
                      { caption: "乙醛被氧化：CH₃CHO → CH₃COO⁻（失电子）", moves: [] },
                      { caption: "Ag⁺ 得电子被还原：银沉积在试管壁上，形成光亮银镜", form: [{ ids: ["agm"], label: "Ag（银镜）" }] }
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
                    text: "银氨溶液现配现用：久置会生成易爆物质",
                    realityNote: "虚拟实验可重复试错；现实中银氨溶液必须现配现用、多余的加稀盐酸处理，全程老师指导、戴护目镜"
                  }
                }
              ],
              point: "乙醛失电子被氧化，Ag⁺ 得电子成银镜——氧化还原又一例。"
            },
            {
              id: "cm21.2.3-p3",
              kind: "quiz",
              title: "练一练：官能团接力",
              questions: [
                {
                  type: "choice",
                  stem: "银镜反应中，乙醛？",
                  options: ["被还原", "被氧化", "做催化剂"],
                  answer: 1,
                  tip: "CH₃CHO → CH₃COO⁻：失电子，被氧化；银是还原产物。"
                },
                {
                  type: "choice",
                  stem: "乙酸乙酯在 NaOH 溶液中水解？",
                  options: ["可逆", "不可逆，完全水解", "不水解"],
                  answer: 1,
                  tip: "碱性水解不可逆；酸性水解可逆——有条件！"
                },
                {
                  type: "fill",
                  stemBefore: "乙醛与新制 Cu(OH)₂ 加热，生成",
                  stemAfter: "色沉淀。",
                  answer: "砖红",
                  accept: ["砖红色", "红色"],
                  hint: "Cu₂O",
                  tip: "砖红色 Cu₂O 沉淀——醛基的特征检验。"
                }
              ],
              point: "银镜、砖红沉淀、酯水解条件——醛羧酸酯收官。"
            }
          ]
        },
        {
          id: "cm21.2.4",
          title: "有机合成",
          prereq: "cm21.2.3 醛·羧酸·酯",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm21.2.4-p1",
              kind: "explain",
              title: "合成：官能团接力赛",
              blocks: [
                { type: "lead", text: "乙烯 → 乙酸乙酯：四步，每步只变一个官能团。有机合成就是设计这场“接力赛”。" },
                { type: "text", html: "路线：① 加成 CH₂=CH₂ + H₂O → CH₃CH₂OH；② 催化氧化 2CH₃CH₂OH + O₂ ＝Cu,加热＝ 2CH₃CHO + 2H₂O；③ 氧化 2CH₃CHO + O₂ ＝催化剂,加热＝ 2CH₃COOH；④ 酯化 CH₃COOH + C₂H₅OH ⇌浓硫酸,加热⇌ CH₃COOC₂H₅ + H₂O。" },
                { type: "text", html: "合成策略：引入官能团、转化官能团、保护官能团（如 –OH 易被氧化时先保护）。路线不是越短越好——产率、条件、成本综合算账。" },
                { type: "trap", text: "⚠ 别搞混：“一步到位”多半不现实——官能团转化常常要“绕路”（保护策略）；选路线要算综合账。" }
              ],
              point: "每步只变一个官能团：C=C → –OH → –CHO → –COOH → –COO–。"
            },
            {
              id: "cm21.2.4-p2",
              kind: "interact",
              title: "合成路线：四步接力",
              exploreTip: "看路线表：每步的转化、条件、官能团变化，对一遍。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "乙烯 → 乙酸",
                      rows: ["① 加成：CH₂=CH₂ + H₂O → CH₃CH₂OH", "② 催化氧化：2CH₃CH₂OH + O₂ → 2CH₃CHO + 2H₂O", "③ 氧化：2CH₃CHO + O₂ → 2CH₃COOH"]
                    },
                    right: {
                      title: "乙酸 → 乙酸乙酯",
                      rows: ["④ 酯化：CH₃COOH + C₂H₅OH ⇌ CH₃COOC₂H₅ + H₂O", "条件：浓硫酸，加热，可逆", "官能团变化：C=C → –OH → –CHO → –COOH → –COO–"]
                    },
                    verdict: "合成是“官能团接力”：每步只变一个官能团，路线要算产率和成本"
                  }
                }
              ],
              point: "合成是设计，不是背诵——官能团接力，一步一条件。"
            }
          ]
        }
      ]
    },
    {
      id: "cm21.3",
      title: "小结",
      lessons: [
        {
          id: "cm21.3.1",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm21.3.1-p1",
              kind: "explain",
              title: "本章小结：官能团总表",
              blocks: [
                { type: "text", html: "官能团总表：–X（卤代烃：取代/消去）→ –OH（醇：氧化/消去/取代；酚：弱酸性）→ –CHO（醛：银镜/砖红沉淀）→ –COOH（羧酸：酸性/酯化）→ –COO–（酯：水解）。" },
                { type: "text", html: "转化总图：乙烯 →（加成）乙醇 →（氧化）乙醛 →（氧化）乙酸 →（酯化）乙酸乙酯；溴乙烷 →（水代）乙醇 / →（醇消）乙烯。cm17 的直观版，到这里全部严格化——有机化学从知识变成了方法。" }
              ],
              point: "官能团决定性质，转化需要条件。下一页：本章习题。"
            },
            {
              id: "cm21.3.1-p2",
              kind: "quiz",
              title: "本章习题",
              questions: [
                {
                  type: "choice",
                  stem: "官能团决定性质：–CHO 的特征检验是？",
                  options: ["FeCl₃ 显紫色", "银镜反应", "使溴水褪色"],
                  answer: 1,
                  tip: "醛基：银镜 / 新制 Cu(OH)₂ 砖红色。"
                },
                {
                  type: "choice",
                  stem: "下列转化一步不能实现的是？",
                  options: ["乙烯→乙醇", "乙醇→乙醛", "乙烷→乙酸"],
                  answer: 2,
                  tip: "乙烷→乙酸要先取代再多步转化——“一步到位”多半不现实。"
                },
                {
                  type: "fill",
                  stemBefore: "8.8g 乙酸乙酯（M=88）与 NaOH 完全反应，消耗 NaOH",
                  stemAfter: "g。",
                  answer: "4.0",
                  accept: ["4"],
                  hint: "n=0.1mol，1∶1",
                  tip: "8.8/88=0.1mol，酯∶NaOH=1∶1 → 0.1×40=4.0g。"
                },
                {
                  type: "choice",
                  stem: "CH₃CH₂Br → CH₂=CH₂ 的条件是？",
                  options: ["NaOH 水溶液加热", "NaOH 醇溶液加热", "浓硫酸加热"],
                  answer: 1,
                  tip: "水代醇消。"
                },
                {
                  type: "choice",
                  stem: "炒菜时加酒又加醋更香，因为？",
                  options: ["酒精挥发", "生成了有香味的酯", "醋杀菌"],
                  answer: 1,
                  tip: "乙酸 + 乙醇 → 乙酸乙酯（酯化）——生活中的化学。"
                },
                {
                  type: "review",
                  html: "本章自查：□ 同分异构三类型？□ 官能团总表默写？□ 乙烯→乙酸乙酯四步？□ 水代醇消？"
                }
              ],
              point: "有机化学从知识变成方法——cm21 收官，全书 22 章完结。"
            }
          ]
        }
      ]
    }
  ]
};
