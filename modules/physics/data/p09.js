/* ============================================================
 * 学习工具箱 · 物理 · 第九章数据（物理批 3，2026-10-15）
 * p09 电功率与生活用电：6 课 + 章末小结与习题 p09.1.0
 *
 * schema v1.0（见 p04.js 文件头冻结版）；组件 API 见 WIDGETS.md。
 * 内容分工：概念表述=物理专家队；教学流/话术=黄队。
 *
 * 本章红线兑现：
 * - P=UI 普遍成立 vs P=I²R=U²/R 限纯电阻（条件对照表，p09.1.2–1.3）
 * - W=UIt（电功，普遍） vs Q=I²Rt（热量）的区分（p09.1.3）
 * - kW·h（度，能量） vs kW（功率）辨析（p09.1.1）
 * - 安全：家庭电路先断电（p09.1.4，W-P20 安全徽章）；触电只做虚拟辨析（p09.1.5）
 * - 估算锚点：空调 1500W×1h=1.5 度（p09.1.1）
 * 缺口上报：电能表读数虚拟组件、焦耳定律 I/R/t 对比组件（暂用 Y1/Y4/P9 载体）。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p09"] = {
  id: "p09",
  units: [
    {
      id: "p09.1",
      title: "电功率与生活用电",
      lessons: [
        {
          id: "p09.1.1",
          title: "电能与电功",
          prereq: "p08 欧姆定律",
          time: "40–60 分钟",
          formulas: {
            w: {
              mathml: "<math><mi>W</mi><mo>=</mo><mi>U</mi><mi>I</mi><mi>t</mi></math>",
              translation: "电功 = 电压 × 电流 × 时间"
            },
            kwh: {
              mathml: "<math><mrow><mn>1</mn><mspace width=\"0.2em\"/><mi mathvariant=\"normal\">kW</mi><mo>·</mo><mi mathvariant=\"normal\">h</mi><mo>=</mo><mn>3.6</mn><mo>×</mo><msup><mn>10</mn><mn>6</mn></msup><mspace width=\"0.2em\"/><mi mathvariant=\"normal\">J</mi></mrow></math>",
              translation: "1 千瓦时 = 360 万焦耳"
            }
          },
          pages: [
            {
              id: "p09.1.1-p1",
              kind: "interact",
              title: "这个月用了多少度电？",
              exploreTip: "先猜一猜，再想想电能表的读数规则：月初月末示数差，小数点别丢。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "电能表月初 0326.4、月末 0413.2，这个月用了多少度电？",
                    options: ["86.8 度", "739.6 度", "41.32 度"],
                    recordKey: "phy_guess_p09.1.1",
                    showAfter: "manual"
                  }
                }
              ],
              point: "读电能表看“度”：月末减月初，最后一格是小数——这是电费单的算法。"
            },
            {
              id: "p09.1.1-p2",
              kind: "explain",
              title: "度是能量，不是功率",
              blocks: [
                { type: "lead", text: "电费单上的“度”，到底是什么？电流做功的过程，就是电能转化为其他形式能的过程——灯亮、风扇转，都是电能在“变身”。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>W</mi><mo>=</mo><mi>U</mi><mi>I</mi><mi>t</mi></math>",
                    translation: "电功 = 电压 × 电流 × 时间"
                  },
                  conditions: ["普遍成立：电功的定义式"],
                  counterexample: "它不等于“产生的热”——电动机里 <span class=\"phy-f\" data-f=\"w\"></span> 是总耗电，发热只是其中一部分",
                  dimension: "J = V·A·s ✓",
                  units: { si: "J（焦耳）", common: "kW·h（度）", note: "1 kW·h = 3.6×10⁶ J" }
                },
                { type: "trap", text: "⚠️ 别搞混：“度”是功率单位——错。度 = kW·h，是能量单位；kW 才是功率单位。单位里有没有“h”，差了一个维度。" },
                { type: "text", html: "电能表读数规范：月初月末示数相减；表盘最后一格是小数位。估算锚点：空调 1500W 开 1 小时 ≈ 1.5 度——“大功率×长时间”最烧电。" },
                { type: "mathlink", text: "数学呼应：代数 ch02 整式（奠基）——W=UIt 是三个量的乘积，代数式的物理还魂。" },
                { type: "slogan", text: "度是能量，不是功率。" }
              ],
              point: "背公式先背条件：W=UIt 是电功的定义式，普遍成立——但它不等于热量。"
            }
          ]
        },
        {
          id: "p09.1.2",
          title: "电功率",
          prereq: "p09.1.1 电能与电功",
          time: "40–60 分钟",
          formulas: {
            p: {
              mathml: "<math><mi>P</mi><mo>=</mo><mi>U</mi><mi>I</mi></math>",
              translation: "电功率 = 电压 × 电流"
            },
            pt: {
              mathml: "<math><mi>P</mi><mo>=</mo><mfrac><mi>W</mi><mi>t</mi></mfrac></math>",
              translation: "电功率 = 电功 ÷ 时间"
            },
            p2r: {
              mathml: "<math><mi>P</mi><mo>=</mo><msup><mi>I</mi><mn>2</mn></msup><mi>R</mi><mo>=</mo><mfrac><msup><mi>U</mi><mn>2</mn></msup><mi>R</mi></mfrac></math>",
              translation: "电功率 = 电流平方×电阻 = 电压平方÷电阻（限纯电阻）"
            }
          },
          pages: [
            {
              id: "p09.1.2-p1",
              kind: "interact",
              title: "灯泡亮度听谁的？",
              exploreTip: "连一个能让灯泡亮的电路：点开关，看电流表读数和灯泡亮度——亮度跟什么同步变化？",
              widgets: [
                {
                  type: "circuit-build",
                  params: {
                    safety: "虚拟电路随便短路，真实电路短路会烧坏电源——绝不许试",
                    grid: { cols: 6, rows: 4 },
                    components: [
                      { id: "bat1", kind: "battery", cell: [1, 2] },
                      { id: "sw1", kind: "switch", cell: [4, 2] }
                    ],
                    tray: ["bulb", "ammeter", "resistor", "wire"],
                    battery: { voltage: 6 },
                    goal: "从元件库拖灯泡、电流表和导线，连一个能让灯泡亮的电路",
                    allowParallel: false, showCurrent: true,
                    badge: { invariant: "没变的是：灯泡的电阻" }
                  }
                }
              ],
              point: "灯泡亮不亮，看它现在实际消耗的功率——不是铭牌上的额定值。"
            },
            {
              id: "p09.1.2-p2",
              kind: "explain",
              title: "额定是“满血”，实际是“现在”",
              blocks: [
                { type: "lead", text: "灯泡上印着“220V 60W”——这是它在额定电压下的“满血”功率。电压不到 220V，它就没力气亮。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>P</mi><mo>=</mo><mi>U</mi><mi>I</mi></math>",
                    translation: "电功率 = 电压 × 电流"
                  },
                  conditions: ["普遍成立：功率的定义式"],
                  counterexample: "对电动机也成立——但它算出的是总功率，不是发热功率",
                  dimension: "W = V·A ✓",
                  units: { si: "W（瓦特）", common: "kW", note: "1kW = 1000W" }
                },
                { type: "text", html: "灯泡的亮度由<span class=\"phy-f\" data-f=\"pt\"></span>实际功率决定：实际电压 = 额定电压时，实际功率 = 额定功率；电压不足，实际功率 < 额定功率，灯就暗。" },
                { type: "trap", text: "⚠️ 别搞混：灯泡亮度看额定功率——错。看实际功率。额定功率是“满血”，实际功率是“现在”。" },
                { type: "slogan", text: "亮度看实际功率。" }
              ],
              point: "额定功率是“满血”，实际功率是“现在”：电压不到，灯就不亮。"
            },
            {
              id: "p09.1.2-p3",
              kind: "explain",
              title: "两个推论，限纯电阻",
              blocks: [
                { type: "lead", text: "P=UI 是“亲生的”（定义式），P=I²R 和 P=U²/R 是“领养的”（推论）——领养的有条件。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>P</mi><mo>=</mo><msup><mi>I</mi><mn>2</mn></msup><mi>R</mi><mo>=</mo><mfrac><msup><mi>U</mi><mn>2</mn></msup><mi>R</mi></mfrac></math>",
                    translation: "电功率 = 电流平方×电阻 = 电压平方÷电阻"
                  },
                  conditions: ["纯电阻电路（电能全部转化为内能）", "已用欧姆定律 I=U/R 代入"],
                  counterexample: "电动机：电能→机械能+内能，用 P=I²R 只能算出发热，算不出总功率",
                  dimension: "W = A²·Ω = V²/Ω ✓",
                  units: { si: "W（瓦特）" }
                },
                { type: "trap", text: "⚠️ 别搞混：P=I²R、P=U²/R 无条件成立——错。它俩是把欧姆定律代入 P=UI 得来的，欧姆定律限纯电阻，它俩也一样。" },
                { type: "mathlink", text: "数学呼应：代数 7.1 二次函数（奠基）——P=I²R 是 I 的二次关系，图像是抛物线。" },
                { type: "slogan", text: "推论有条件，条件是纯电阻。" }
              ],
              point: "P=I²R、P=U²/R 是欧姆定律的“推论”——离开纯电阻，这两个推论就失效。"
            }
          ]
        },
        {
          id: "p09.1.3",
          title: "焦耳定律",
          prereq: "p09.1.2 电功率",
          time: "40–60 分钟",
          formulas: {
            q: {
              mathml: "<math><mi>Q</mi><mo>=</mo><msup><mi>I</mi><mn>2</mn></msup><mi>R</mi><mi>t</mi></math>",
              translation: "电流产生的热量 = 电流平方 × 电阻 × 时间"
            },
            w: {
              mathml: "<math><mi>W</mi><mo>=</mo><mi>U</mi><mi>I</mi><mi>t</mi></math>",
              translation: "电功 = 电压 × 电流 × 时间"
            }
          },
          pages: [
            {
              id: "p09.1.3-p1",
              kind: "interact",
              title: "电流越大，升温越快？",
              exploreTip: "点“加热”看煤油升温：温度升得快慢，跟电流、电阻、时间三个量都有关——这是焦耳定律的实验载体。",
              widgets: [
                {
                  type: "thermo-sim",
                  params: {
                    temp: { min: 20, max: 80, step: 1, init: 20, unit: "℃" },
                    particleCount: 120, showStates: false, heatButtons: true,
                    badge: { invariant: "没变的是：煤油的质量" }
                  }
                }
              ],
              point: "煤油升温是“热量”的眼睛：升温越快，电流的热效应越强。"
            },
            {
              id: "p09.1.3-p2",
              kind: "explain",
              title: "Q=I²Rt：热效应的账本",
              blocks: [
                { type: "lead", text: "电炉丝热得发红，导线却不热——同一条电路，电流一样，差别在电阻。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>Q</mi><mo>=</mo><msup><mi>I</mi><mn>2</mn></msup><mi>R</mi><mi>t</mi></math>",
                    translation: "电流产生的热量 = 电流平方 × 电阻 × 时间"
                  },
                  conditions: ["电流的热效应：普遍成立"],
                  counterexample: "它算的是“热”，不是“总耗电”——电动机里总耗电要用 W=UIt",
                  dimension: "J = A²·Ω·s ✓",
                  units: { si: "J（焦耳）" }
                },
                { type: "text", html: "串联电路电流 I 相同：电炉丝 R 大，发热多；导线 R 小，发热少——Q 跟 R 成正比（I、t 一定时）。" },
                { type: "mathlink", text: "数学呼应：代数 ch02 整式（奠基）——Q=I²Rt 是二次与一次的混合，I 的影响是平方级的。" },
                { type: "slogan", text: "电流平方级，电阻线性级。" }
              ],
              point: "电炉丝热、导线不热：串联电流相同，热量跟电阻成正比。"
            },
            {
              id: "p09.1.3-p3",
              kind: "explain",
              title: "电动机：W≠Q",
              blocks: [
                { type: "lead", text: "电动机转起来也发热——那它消耗的电能，是不是就等于 I²Rt？" },
                { type: "text", html: "纯电阻（电炉、白炽灯）：电能全部变热，<span class=\"phy-f\" data-f=\"w\"></span> = <span class=\"phy-f\" data-f=\"q\"></span>。非纯电阻（电动机）：电能→机械能 + 内能，W=UIt 是总耗电，Q=I²Rt 只是发热部分，W > Q。" },
                { type: "trap", text: "⚠️ 别搞混：电动机也用 Q=I²Rt 算“消耗的电能”——错。W=UIt 才是消耗的电能，Q=I²Rt 只是发热——条件！（审计清单第 3 条）" },
                { type: "text", html: "条件对照表：P=UI、W=UIt——普遍成立；P=I²R=U²/R、W=Q——限纯电阻。用错条件，算出来的是另一个物理量。" },
                { type: "slogan", text: "W 是总账，Q 是热账。" }
              ],
              point: "电动机非纯电阻：W=UIt 是总耗电，Q=I²Rt 只是发热——两个账本别混。"
            }
          ]
        },
        {
          id: "p09.1.4",
          title: "家庭电路",
          prereq: "p09.1.3 焦耳定律",
          time: "40–60 分钟",
          pages: [
            {
              id: "p09.1.4-p1",
              kind: "interact",
              title: "先断电，再接线",
              exploreTip: "第一步永远是“断电”（断开开关）：再从元件库拖元件，连一个开关控制灯泡的单回路。",
              widgets: [
                {
                  type: "circuit-build",
                  params: {
                    safety: "先断电再接线：虚拟电路随便试，真实家庭电路带电操作会触电",
                    grid: { cols: 6, rows: 4 },
                    components: [
                      { id: "bat1", kind: "battery", cell: [1, 2] },
                      { id: "sw1", kind: "switch", cell: [4, 2] }
                    ],
                    tray: ["bulb", "wire"],
                    battery: { voltage: 3 },
                    goal: "先断开开关（断电），再连一个“开关控制灯泡”的单回路",
                    allowParallel: false, showCurrent: true,
                    badge: { invariant: "没变的是：先断电再接线" }
                  }
                }
              ],
              point: "家庭电路操作第一步：先断电——这是安全铁律，不是建议。"
            },
            {
              id: "p09.1.4-p2",
              kind: "explain",
              title: "进户线到插座",
              blocks: [
                { type: "lead", text: "电从电线杆进你家，要过五道关：进户线 → 电能表 → 总开关 → 保险丝（空气开关）→ 插座/用电器。" },
                { type: "text", html: "进户线两根：火线（220V）+ 零线。测电笔测火线，氖管发光；测零线，不发光——但零线断线时会带电，别拿“不发光”当安全证。" },
                { type: "trap", text: "⚠️ 别搞混：零线“没电”就安全——错。零线断线会带电！任何操作前先断开总开关。" },
                { type: "text", html: "注意：本页虚拟电路是单回路演示；真实家庭电路中，各用电器并联在 220V 上，互不影响——并联互不影响的前提是电压相同（p08.1.3）。" },
                { type: "slogan", text: "先断电，再动手。" }
              ],
              point: "火线 220V、零线平时不带电——但零线断线会带电，先断电再操作。"
            },
            {
              id: "p09.1.4-p3",
              kind: "explain",
              title: "三线插头与保险丝",
              blocks: [
                { type: "lead", text: "洗衣机、电冰箱的插头为什么是三个脚？多出来的那个，是“保命线”——地线。" },
                { type: "text", html: "三线插头：火线、零线 + 地线。金属外壳接大地：外壳万一带电，电流走地线入地，不走人体。保险丝（空气开关）：电流过大时熔断（跳闸），按额定电流配。" },
                { type: "trap", text: "⚠️ 别搞混：保险丝越粗越好——错。按额定电流配：粗了该断不断，起不到保护作用；细了正常用电也断。" },
                { type: "text", html: "估算：空调 1500W + 热水器 2000W 同时开，总电流 ≈ 16A——保险丝/空开的额定电流要按这个量级选。" },
                { type: "slogan", text: "地线保命，保险丝按额定配。" }
              ],
              point: "地线是保命线；保险丝按额定电流配——粗了不起保护作用。"
            }
          ]
        },
        {
          id: "p09.1.5",
          title: "安全用电",
          prereq: "p09.1.4 家庭电路",
          time: "40–60 分钟",
          pages: [
            {
              id: "p09.1.5-p1",
              kind: "interact",
              title: "湿手拔插头，危险吗？",
              exploreTip: "先猜，再想“为什么”：水、人体、电压，三个因素凑在一起会发生什么？",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "湿手拔插头，会触电吗？",
                    options: ["不会，水不导电", "会，湿手电阻小电流大", "只有高压才危险"],
                    recordKey: "phy_guess_p09.1.5",
                    showAfter: "manual"
                  }
                }
              ],
              point: "本页所有触电场景都是虚拟辨析——现实中绝不许模仿，这是安全红线。"
            },
            {
              id: "p09.1.5-p2",
              kind: "explain",
              title: "触电、电压与急救",
              blocks: [
                { type: "lead", text: "触电分两种：单线触电（人站在地上摸火线）+ 双线触电（两手分摸火线零线）——都是电流流过人体。" },
                { type: "text", html: "安全电压：不高于 36V（干燥环境）。注意“有条件”：潮湿环境人体电阻骤降，安全电压更低——所以“低压一定安全”是错的。" },
                { type: "trap", text: "⚠️ 别搞混：36V 以下就绝对安全——错。36V 是干燥环境的安全电压；潮湿环境更低；湿手不碰任何插头。" },
                { type: "text", html: "触电急救：先断电（拉闸/用干燥木棍挑开电线），再救人——绝不能直接用手拉触电的人。断线落地：绕行，别靠近，别捡。" },
                { type: "text", html: "虚拟/现实对照：本课触电场景全是虚拟辨析——现实中绝不模仿触电实验（安全徽章常驻）。" },
                { type: "slogan", text: "先断电，再救人。" }
              ],
              point: "安全电压 ≤36V 是有条件的；触电急救第一步永远是断电。"
            }
          ]
        },
        {
          id: "p09.1.0",
          title: "章末小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          formulas: {
            w: {
              mathml: "<math><mi>W</mi><mo>=</mo><mi>U</mi><mi>I</mi><mi>t</mi></math>",
              translation: "电功 = 电压 × 电流 × 时间"
            },
            p: {
              mathml: "<math><mi>P</mi><mo>=</mo><mi>U</mi><mi>I</mi><mo>=</mo><mfrac><mi>W</mi><mi>t</mi></mfrac></math>",
              translation: "电功率 = 电压×电流 = 电功÷时间"
            },
            q: {
              mathml: "<math><mi>Q</mi><mo>=</mo><msup><mi>I</mi><mn>2</mn></msup><mi>R</mi><mi>t</mi></math>",
              translation: "电流产生的热量 = 电流平方 × 电阻 × 时间"
            }
          },
          pages: [
            {
              id: "p09.1.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "<p>公式三兄弟：<span class=\"phy-f\" data-f=\"w\"></span>（电功，普遍成立）；<span class=\"phy-f\" data-f=\"p\"></span>（普遍成立）；<span class=\"phy-f\" data-f=\"q\"></span>（热量，普遍成立）。</p><p>条件对照表：P=I²R=U²/R、W=Q——限纯电阻；电动机非纯电阻，W=UIt 是总耗电，Q=I²Rt 只是发热。</p><p>单位辨析：度 = kW·h（能量）≠ kW（功率）；1 kW·h = 3.6×10⁶ J。电能表读数：月末减月初。</p><p>安全铁律：家庭电路操作先断电；保险丝按额定电流配；安全电压 ≤36V（干燥环境，有条件）；触电场景只做虚拟辨析，现实中绝不模仿。</p>"
                }
              ],
              point: "本章一句话：公式都有条件——先问“纯电阻吗”，再代公式。"
            },
            {
              id: "p09.1.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "“220V 60W”的灯泡接在电压不足的电路上变暗了，说明灯泡亮度看——",
                  options: ["额定功率", "实际功率", "灯泡的电阻"],
                  answer: 1,
                  tip: "额定功率是“满血”，实际功率是“现在”——亮度看实际功率。"
                },
                {
                  type: "choice",
                  stem: "电动机工作时，消耗的电能 W=UIt 与产生的热量 Q=I²Rt 的关系是——",
                  options: ["W = Q", "W > Q", "W < Q"],
                  answer: 1,
                  tip: "电动机非纯电阻：电能一部分转机械能，只有一部分发热，所以 W > Q。"
                },
                {
                  type: "fill",
                  stemBefore: "1 kW·h = ",
                  stemAfter: " J",
                  answer: "3.6×10⁶",
                  accept: ["3.6×10^6", "3600000", "3.6*10^6"],
                  hint: "（360 万）",
                  tip: "1 kW·h = 1000W × 3600s = 3.6×10⁶ J。"
                },
                {
                  type: "choice",
                  stem: "家庭电路中更换灯泡前，第一步是——",
                  options: ["直接换", "先断开总开关", "戴手套就行"],
                  answer: 1,
                  tip: "先断电再操作——安全铁律，不是建议。"
                },
                {
                  type: "fill",
                  stemBefore: "干燥环境的安全电压是不高于 ",
                  stemAfter: " V",
                  answer: "36",
                  accept: ["36V"],
                  hint: "（两位数）",
                  tip: "36V 以下才算安全电压，而且是有条件的——潮湿环境更低。"
                },
                {
                  type: "choice",
                  stem: "【估算】一度电（1kW·h）能让 100W 的灯泡亮约——（数量级对即满分）",
                  options: ["约 1 小时", "约 10 小时", "约 100 小时", "约 1000 小时"],
                  answer: 1,
                  tip: "依据链：t = W/P = 1000W·h÷100W = 10h——10¹ 量级。一度电 = 3.6×10⁶J。"
                }
              ],
              point: "下一章认旧友：p10 电与磁——“电生磁”与“磁生电”的对称与不对称。"
            }
          ]
        }
      ]
    }
  ]
};
