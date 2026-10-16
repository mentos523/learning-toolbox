/* ============================================================
 * 学习工具箱 · 物理 · 第八章数据（物理专家队+黄队 2026-10-15，批量生产批 2）
 *
 * schema v1.0（冻结，见 modules/physics/data/p04.js 文件头）逐字遵守；
 * 组件 API 以 modules/physics/data/WIDGETS.md v1.0 为准。
 * 本章：p08 电路基础与欧姆定律（九上）——2 单元 / 8 课 / 23 页（实测；
 *   课表行合计 21 + 章末 2 = 23，明细表 22 差 1 页，见交付报告）。
 * 全书红线「比值定义法四辨析」第二落点：p08.2.2（电阻）。
 * 跃升 3（公式条件意识）首次完整亮相：p08.2.3。
 * B-M8：p08.1.4 烧表警告——机制在 P3（physics.js:1320，占位“待黄队定”），
 *   黄队正式话术见交付报告；本课讲解页同步讲清机制。
 * 方案 B：p08.2.3 的 I–R 图像降为定性（不画双曲线），等代数 7.2 后回填。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p08"] = {
  id: "p08",
  units: [
    {
      id: "p08.1",
      title: "电路",
      lessons: [
        {
          id: "p08.1.1",
          title: "电荷",
          prereq: "p00 导论",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p08.1.1-p1",
              kind: "interact",
              title: "摩擦生电，验电器作证",
              exploreTip: "冬天脱毛衣的噼啪声，和验电器是同一个道理。先猜，再看解释。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "丝绸摩擦过的玻璃棒靠近验电器金属球，箔片会——",
                    options: ["张开更大", "闭合", "没变化"],
                    recordKey: "phy_guess_p08.1.1a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "摩擦起电，是创造了电荷吗？",
                    options: ["创造了电荷", "只是转移了电荷", "不确定"],
                    recordKey: "phy_guess_p08.1.1b",
                    showAfter: "manual"
                  }
                }
              ],
              point: "箔片张开，是因为同种电荷互相排斥——电荷看不见，效果看得见。"
            },
            {
              id: "p08.1.1-p2",
              kind: "explain",
              title: "两种电荷与电荷守恒",
              blocks: [
                { type: "lead", text: "用丝绸摩擦玻璃棒、用毛皮摩擦橡胶棒——得到两种不一样的“电脾气”。" },
                { type: "text", html: "两种电荷：正电荷、负电荷。同种相斥、异种相吸。验电器：箔片张角越大，带的电荷越多——“张角”是电荷的翻译。" },
                { type: "text", html: "摩擦起电不是创造电荷：只是电荷转移。电荷守恒（初中版）：电荷不会凭空产生，也不会凭空消失。" },
                { type: "text", html: "金属中真正移动的是电子（负电荷）——“正电荷在移动”是错的，记住。" },
                { type: "trap", text: "⚠️ 别搞混：“摩擦‘创造’了电荷”——错，只是转移；“正电荷在导线里移动”——错，金属中移动的是电子。" },
                { type: "mathlink", text: "数学呼应：代数 ch00 正负数（奠基）——两种电荷即正负，符号第一次有了物理身体。" }
              ],
              point: "电荷守恒是底线：转移来转移去，总量不变——p15.1.1 回来深化。"
            }
          ]
        },
        {
          id: "p08.1.2",
          title: "电流与电路",
          prereq: "p08.1.1 电荷",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p08.1.2-p1",
              kind: "interact",
              title: "连亮一个灯泡",
              exploreTip: "任务1连亮灯泡，任务2串进三个电流表看读数——水流过水车会被“用掉”吗？",
              widgets: [
                {
                  type: "circuit-build",
                  params: {
                    grid: { cols: 6, rows: 4 },
                    components: [
                      { id: "bat1", kind: "battery", cell: [1, 2] },
                      { id: "sw1",  kind: "switch",  cell: [4, 2] }
                    ],
                    tray: ["bulb", "wire", "ammeter"],
                    battery: { voltage: 3 },
                    goal: "任务1：拖灯泡和导线连亮电路。任务2：串进三个电流表，看读数一不一样。",
                    showCurrent: true,
                    badge: { invariant: "没变的是：电源电压（变的是接法→三处电流表读数）" },
                    safety: "虚拟电路随便短路；真实电路短路会烧电源、烧表——只许在虚拟里试。"
                  }
                }
              ],
              point: "三处电流表读数永远相等——电荷是“队伍”在走，不是被“吃掉”。"
            },
            {
              id: "p08.1.2-p2",
              kind: "explain",
              title: "电流方向：全书级易错",
              blocks: [
                { type: "lead", text: "电流有方向——但它的方向，和电子跑的方向是反的！" },
                { type: "text", html: "电流：电荷的定向移动。方向规定：正电荷定向移动的方向为电流方向。金属里跑的是电子（负电荷），所以电子移动方向与电流方向相反。" },
                { type: "text", html: "这句话背三遍：电流方向 = 正电荷定向移动方向 = 电子移动的反方向。通路 / 断路 / 短路：开关没闭合是断路，导线直连电源两极是短路（P3 里试一次，看红色警告）。" },
                { type: "trap", text: "⚠️ 别搞混：“电流方向 = 电子移动方向”——错！相反！这是全书级易错，p16.1.1 还要考。" },
                { type: "slogan", text: "正电荷定方向，电子反着跑。" }
              ],
              point: "画电路图永远标电流方向：从电源正极出发，绕一圈回负极。"
            },
            {
              id: "p08.1.2-p3",
              kind: "explain",
              title: "水流类比：拐杖与边界",
              blocks: [
                { type: "lead", text: "水压→电压、水流→电流、水管→导线——类比是拐杖，但拐杖不是腿。" },
                {
                  type: "widget",
                  widget: {
                    type: "side-compare",
                    params: {
                      left: { title: "水流类比管用的地方", rows: ["有压力才有水流 ↔ 有电压才有电流", "水管细水流小 ↔ 电阻大电流小"] },
                      right: { title: "不管用的地方", rows: ["水和电荷都不会被“用掉”——被“用掉”的是能量", "水流慢≠电子慢（p16.1.1 回填：电场近光速）"] },
                      verdict: "每次用类比，都问一句：它在哪儿不管用了？"
                    }
                  }
                },
                { type: "text", html: "“用掉”的从来不是水也不是电荷，而是能量：水车用掉的是水的势能，灯泡用掉的是电荷的电势能——水和电荷本身都守恒。" },
                { type: "oldfriend", text: "预告：p16.1.1——灯瞬间亮，不是因为电子跑得快，是电场像口令一样瞬间传到全电路（回填）。" }
              ],
              point: "类比是拐杖，不是腿：不管用的地方，往往就是真正的物理。"
            }
          ]
        },
        {
          id: "p08.1.3",
          title: "串联和并联",
          prereq: "p08.1.2 电流与电路",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p08.1.3-p1",
              kind: "interact",
              title: "断一处，谁还亮",
              exploreTip: "对比：串联断一处全灭，并联断一条另一条照亮。试试两条支路。",
              widgets: [
                {
                  type: "circuit-build",
                  params: {
                    grid: { cols: 6, rows: 4 },
                    components: [
                      { id: "bat1", kind: "battery", cell: [1, 2] },
                      { id: "sw1",  kind: "switch",  cell: [4, 2] }
                    ],
                    tray: ["bulb", "wire"],
                    battery: { voltage: 3 },
                    goal: "试试两条支路：搭一个双支路电路，断开一条支路的灯泡，看另一条还亮吗？再搭个串联对比。",
                    allowParallel: true, showCurrent: true,
                    badge: { invariant: "没变的是：电源电压（变的是串/并联与断点→灯泡亮还是灭）" },
                    safety: "虚拟电路随便短路；真实电路短路会烧电源、烧表——只许在虚拟里试。"
                  }
                }
              ],
              point: "串联：一灭全灭；并联：各走各路——圣诞灯串 vs 家庭电路。"
            },
            {
              id: "p08.1.3-p2",
              kind: "explain",
              title: "串并联特点与识别",
              blocks: [
                { type: "lead", text: "圣诞灯串（一灭全灭）是串联，家庭电路（一坏不影响）是并联。" },
                { type: "text", html: "串联：一条路，电流处处相等，一个断全断。并联：多条路，各支路互不影响（前提：电压相同），干路电流 = 各支路之和。" },
                { type: "text", html: "识别两招：电流法（电流有几条路）、拆除法（拆掉一个，看别的还工不工作）。" },
                { type: "slogan", text: "一条路是串联，多条路是并联。" }
              ],
              point: "画不准就用拆除法：拆一个，别的还亮就是并联。"
            },
            {
              id: "p08.1.3-p3",
              kind: "explain",
              title: "电流不会被“用掉”",
              blocks: [
                { type: "lead", text: "第 1 页三个电流表读数相等——电流过灯泡，没有被“吃掉”。" },
                { type: "text", html: "串联电路处处电流相等：电荷是“队伍”在走，队伍不会越走越短——电荷守恒。被“用掉”的是能量，不是电荷。" },
                { type: "text", html: "并联互不影响的前提：电压相同。电压不一样，各支路就各走各的“脾气”了。" },
                { type: "trap", text: "⚠️ 别搞混：“电流被‘用掉’了”——错，串联处处电流相等；“并联一定互不影响”——错，前提：电压相同。" }
              ],
              point: "记住因果链：电压是“原因”，电流是“结果”——下一课讲电压。"
            }
          ]
        },
        {
          id: "p08.1.4",
          title: "电流的测量",
          prereq: "p08.1.3 串联和并联",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p08.1.4-p1",
              kind: "interact",
              title: "电流表接线虚拟实验",
              exploreTip: "试触先用大量程；故意接错一次——并在灯泡两端，看烧表警告说什么。",
              widgets: [
                {
                  type: "circuit-build",
                  params: {
                    grid: { cols: 6, rows: 4 },
                    components: [
                      { id: "bat1", kind: "battery", cell: [1, 2] },
                      { id: "sw1",  kind: "switch",  cell: [4, 2] }
                    ],
                    tray: ["ammeter", "bulb", "wire"],
                    battery: { voltage: 3 },
                    goal: "大量程试触选量程，电流表串进电路；再并在灯泡两端——看警告说什么。",
                    showCurrent: true,
                    badge: { invariant: "没变的是：电源电压（变的是表的接法→烧表警告出不出现）" },
                    safety: "电流表内阻极小：并联=短路=烧表——安全红线！虚拟里看一次，现实中绝不试。"
                  }
                },
                {
                  type: "read-gauge",
                  params: {
                    gauge: "ammeter",
                    range: { min: 0, max: 3, unit: "A" },
                    divisions: 0.1, estimate: true, eyeLine: true,
                    trialTouch: true, tolerance: "1division"
                  }
                }
              ],
              point: "试触用大量程，估读到分度值下一位——接错警告一次，记一辈子。"
            },
            {
              id: "p08.1.4-p2",
              kind: "explain",
              title: "电流表：只能串联",
              blocks: [
                { type: "lead", text: "电流表是电流的“收费站”：电流必须从它身体里过——所以只能串联。" },
                { type: "text", html: "使用规则：① 量程：先大量程试触，再选合适量程；② 接线柱：正进负出（电流从正接线柱进）；③ 必须串联在电路中；④ 读数：视线正对，估读到分度值下一位。" },
                { type: "trap", text: "⚠️ 别搞混：把电流表并联在用电器两端来“测电流”——这是禁令，不是接法！电流表内阻极小，并联近乎短路，大电流会烧表。电流表只能串联。" },
                { type: "text", html: "烧表机制（B-M8）：电流表内阻极小，并联在用电器两端时，电流几乎全挤进电流表这一条路——等于把电源两极直接连起来（短路），瞬间大电流烧坏电流表。这是安全红线。" },
                { type: "slogan", text: "电流表，只能串联。" }
              ],
              point: "试触选量程是规范：直接小量程接入，大电流一样烧表——规范就是安全。"
            }
          ]
        }
      ]
    },
    {
      id: "p08.2",
      title: "电压、电阻与欧姆定律",
      lessons: [
        {
          id: "p08.2.1",
          title: "电压",
          prereq: "p08.1.4 电流的测量",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p08.2.1-p1",
              kind: "interact",
              title: "电压是“原因”，电流是“结果”",
              exploreTip: "电压是“原因”，电流是“结果”——因果别倒。先猜，再看解释。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "开关断开，灯泡两端有电压吗？有电流吗？",
                    options: ["有电压，没电流", "都没", "有电流没电压"],
                    recordKey: "phy_guess_p08.2.1a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "两节电池串联起来，灯泡会——",
                    options: ["更亮", "更暗", "一样亮"],
                    recordKey: "phy_guess_p08.2.1b",
                    showAfter: "manual"
                  }
                },
                {
                  type: "read-gauge",
                  params: {
                    gauge: "voltmeter",
                    range: { min: 0, max: 15, unit: "V" },
                    divisions: 0.5, estimate: true, eyeLine: true,
                    trialTouch: false, tolerance: "1division"
                  }
                },
              ],
              point: "有电压不一定有电流（断路），有电流一定有电压。电压表读数：先选合适量程，估读到分度值下一位。"
            },
            {
              id: "p08.2.1-p2",
              kind: "explain",
              title: "电压与电压表",
              blocks: [
                { type: "lead", text: "水位差让水流，电压让电流——水压类比开场（边界：“用掉”的从来不是水也不是电荷，而是能量）。" },
                { type: "text", html: "电压：使电荷定向移动形成电流的原因，电源是提供电压的装置。有电压不一定有电流（断路时），有电流一定有电压。" },
                { type: "text", html: "电压表：内阻极大，理想时看作断路——并联在用电器两端。有条件：内阻极大，可“串联”在电源两极测电源电压（不烧表）。" },
                { type: "text", html: "串并联电压规律：串联 U=U₁+U₂（分电压），并联 U=U₁=U₂（各支路相等）。" },
                { type: "trap", text: "⚠️ 别搞混：“电压=电流”——错！电压是“原因”，电流是“结果”；“电压表绝不能串联”——错，有条件：内阻极大，可串联测电源电压。" }
              ],
              point: "电压表和电流表是反的：一个内阻极大（并联用），一个内阻极小（串联用）。"
            }
          ]
        },
        {
          id: "p08.2.2",
          title: "电阻与变阻器",
          prereq: "p08.2.1 电压",
          time: "40–60 分钟",
          formulas: {
            res: {
              mathml: '<math><mi>R</mi><mo>=</mo><mfrac><mi>U</mi><mi>I</mi></mfrac></math>',
              translation: "电阻 = 电压 ÷ 电流"
            }
          },
          pages: [
            {
              id: "p08.2.2-p1",
              kind: "interact",
              title: "电阻越大，电流越小",
              exploreTip: "拖动滑片：接入电阻变大→电流变小——“阻碍”看得见。",
              widgets: [
                {
                  type: "circuit-build",
                  params: {
                    grid: { cols: 6, rows: 4 },
                    components: [
                      { id: "bat1", kind: "battery", cell: [2, 1] },
                      { id: "sw1",  kind: "switch",  cell: [3, 1] },
                      { id: "rh1",  kind: "rheostat", cell: [3, 2], min: 0, max: 50, init: 50 },
                      { id: "a1",   kind: "ammeter", cell: [2, 2] }
                    ],
                    tray: ["bulb", "resistor", "rheostat", "wire"],
                    battery: { voltage: 6 },
                    goal: "闭合开关前，滑片移到阻值最大处；闭合开关，拖动滑片——接入电阻变，电流表读数跟着变。",
                    showCurrent: true,
                    badge: { invariant: "没变的是：电源电压（变的是滑片位置→接入电阻→电流大小）" },
                    safety: "虚拟电路随便短路；真实电路短路会烧电源、烧表——只许在虚拟里试。"
                  }
                }
              ],
              point: "滑片一动，接入电阻变，读数跟着变——电阻是导体对电流的“阻碍”。"
            },
            {
              id: "p08.2.2-p2",
              kind: "explain",
              title: "电阻的影响因素",
              blocks: [
                { type: "lead", text: "同样 6V 电池，换根“脾气大”的导线，电流就小了——脾气是导体的。" },
                { type: "text", html: "电阻：导体对电流的阻碍作用。影响因素（控制变量思想）：长度越长越大、横截面积越大越小、材料不同，电阻不同、温度也有影响。" },
                { type: "text", html: "滑动变阻器：靠改变接入电路的电阻丝长度来改变电阻。接法：一上一下；开关闭合前，滑片移到阻值最大处。" },
                { type: "mathlink", text: "数学呼应：代数 6.1（奠基）——控制变量 → 函数关系思想：固定其他量，看一个量怎么变。" },
                { type: "slogan", text: "电阻是导体的脾气。" }
              ],
              point: "变阻器调灯泡亮度：滑片一动，电阻变，电流变，亮度变。"
            },
            {
              id: "p08.2.2-p3",
              kind: "explain",
              title: "比值定义再现：R=U/I",
              blocks: [
                { type: "lead", text: "R=U/I——看到这个式子，有没有想起 p04.1.2 的 ρ=m/V？" },
                { type: "oldfriend", text: "认旧友：p04.1.2 密度——“等号不代表因果”：m/V 是“量”密度的方法；R=U/I 一模一样：电阻是导体的脾气，跟“量”它的人（U、I）无关。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>R</mi><mo>=</mo><mfrac><mi>U</mi><mi>I</mi></mfrac></math>',
                    translation: "电阻 = 电压 ÷ 电流"
                  },
                  conditions: ["导体温度、状态一定"],
                  counterexample: "灯丝热了 R 变了——变的不是 U、I，是导体自己：R 是导体的属性",
                  dimension: "Ω = V/A ✓",
                  units: { si: "Ω（欧姆）", note: "1Ω = 1V/A" }
                },
                { type: "text", html: "三步法：① 谁变了、谁跟着变；② “脾气”变没变；③ U 变 I 跟着变，R 不动——R 与 U、I 无关。" },
                { type: "trap", text: "⚠️ 别搞混：“电阻与电压成正比”——错！红线第二落点：R=U/I 是“量”电阻的方法，不是“决定”的原因。" },
                { type: "slogan", text: "等号不代表因果。" }
              ],
              point: "带上这句话去 p08.2.3：I=U/R 里，R 是“已知条件”，不是被 U、I 决定的。"
            }
          ]
        },
        {
          id: "p08.2.3",
          title: "欧姆定律",
          prereq: "p08.2.2 电阻与变阻器",
          time: "40–60 分钟",
          formulas: {
            ohm: {
              mathml: '<math><mi>I</mi><mo>=</mo><mfrac><mi>U</mi><mi>R</mi></mfrac></math>',
              translation: "电流 = 电压 ÷ 电阻"
            }
          },
          pages: [
            {
              id: "p08.2.3-p1",
              kind: "interact",
              title: "R 越大，I 越小（定性）",
              exploreTip: "R 越大 I 越小——只看趋势，不画双曲线。",
              widgets: [
                {
                  type: "circuit-build",
                  params: {
                    grid: { cols: 6, rows: 4 },
                    components: [
                      { id: "bat1", kind: "battery", cell: [1, 2] },
                      { id: "sw1",  kind: "switch",  cell: [4, 2] }
                    ],
                    tray: ["resistor", "ammeter", "wire"],
                    battery: { voltage: 6 },
                    goal: "保持电压不变：先串 1 个 20Ω 电阻读电流，再串第 2 个——R 越大，I 越小。",
                    showCurrent: true,
                    badge: { invariant: "没变的是：电源电压（变的是电阻 R→电流 I 的趋势）" },
                    safety: "虚拟电路随便短路；真实电路短路会烧电源、烧表——只许在虚拟里试。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "定值电阻两端电压加倍，电流会——",
                    options: ["加倍", "不变", "减半"],
                    recordKey: "phy_guess_p08.2.3",
                    showAfter: "manual"
                  }
                }
              ],
              point: "R 一定，U 加倍 I 加倍；U 一定，R 越大 I 越小——两个定性关系。"
            },
            {
              id: "p08.2.3-p2",
              kind: "explain",
              title: "I–U 图像探究",
              blocks: [
                { type: "lead", text: "欧姆定律说 I=U/R 是直线——小灯泡的 I–U 图像怎么弯了？" },
                {
                  type: "widget",
                  widget: {
                    type: "graph-reader",
                    params: {
                      source: { kind: "function", expr: "I = t/20", xLabel: "U/V", yLabel: "I/A", steps: ["slope"] },
                      badge: { invariant: "没变的是：电阻（20Ω）（变的是电压→电流跟着变）" }
                    }
                  }
                },
                { type: "text", html: "定值电阻的 I–U 图像：过原点的直线，斜率 = 1/R。R 越大，线越平缓——斜率里藏着电阻。" },
                { type: "text", html: "反例：小灯泡——灯丝热了，电阻变了，I–U 图像弯了。欧姆定律的直线，在这里失效了。为什么？下一页办“身份证”时揭晓。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 一次函数（奠基）——I–U 图像是过原点的直线；回填：反比例图像等代数 7.2 学完后回填。" }
              ],
              point: "I–U 直线的斜率 = 1/R：线越陡，电阻越小——和密度的“线越陡越大”对照着记。"
            },
            {
              id: "p08.2.3-p3",
              kind: "explain",
              title: "公式身份证：I=U/R",
              blocks: [
                { type: "lead", text: "小灯泡为什么“弯”了？因为欧姆定律是“有条件的真话”——现在办身份证。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>I</mi><mo>=</mo><mfrac><mi>U</mi><mi>R</mi></mfrac></math>',
                    translation: "电流 = 电压 ÷ 电阻"
                  },
                  conditions: ["金属导体", "纯电阻", "温度不变"],
                  counterexample: "小灯泡：灯丝热了电阻变了，I–U 图像弯了，不成立（审计清单第 3 条）",
                  dimension: "A = V/Ω ✓",
                  units: { si: "A（安培）", common: "mA", note: "1A = 1000mA" }
                },
                { type: "text", html: "条件口诀：物理公式都是“有条件的真话”，背公式先背条件。以后看到公式，第一问永远是：它在什么时候成立？" },
                { type: "trap", text: "⚠️ 别搞混：“欧姆定律对小灯泡也成立”——错！灯丝电阻随温度变，非线性元件；“I 与 U 成正比无条件”——错，需 R 一定。" },
                { type: "slogan", text: "背公式，先背条件。" }
              ],
              point: "跃升 3 在此完整亮相：反例→身份证→口诀——之后每个公式都走这三步。"
            }
          ]
        },
        {
          id: "p08.2.4",
          title: "串并联电路规律与应用",
          prereq: "p08.2.3 欧姆定律",
          time: "40–60 分钟",
          formulas: {
            rseries: {
              mathml: '<math><mi>R</mi><mo>=</mo><msub><mi>R</mi><mn>1</mn></msub><mo>+</mo><msub><mi>R</mi><mn>2</mn></msub></math>',
              translation: "串联总电阻 = 各电阻之和"
            },
            rparallel: {
              mathml: '<math><mfrac><mn>1</mn><mi>R</mi></mfrac><mo>=</mo><mfrac><mn>1</mn><msub><mi>R</mi><mn>1</mn></msub></mfrac><mo>+</mo><mfrac><mn>1</mn><msub><mi>R</mi><mn>2</mn></msub></mfrac></math>',
              translation: "并联总电阻的倒数 = 各支路电阻倒数之和"
            }
          },
          pages: [
            {
              id: "p08.2.4-p1",
              kind: "interact",
              title: "串联分压，并联分流",
              exploreTip: "变阻器已进元件库：拖入电路、拖滑片，看电流和亮度怎么变。",
              widgets: [
                {
                  type: "circuit-build",
                  params: {
                    grid: { cols: 6, rows: 4 },
                    components: [
                      { id: "bat1", kind: "battery", cell: [1, 2] },
                      { id: "sw1",  kind: "switch",  cell: [4, 2] }
                    ],
                    tray: ["resistor", "rheostat", "bulb", "ammeter", "wire", "voltmeter"],
                    battery: { voltage: 6 },
                    goal: "串联两电阻读电流，再换并联：哪种接法总电阻更小？亮度呢？",
                    allowParallel: true, showCurrent: true,
                    badge: { invariant: "没变的是：电源电压（变的是滑片→电流与灯泡亮度）" },
                    safety: "虚拟电路随便短路；真实电路短路会烧电源、烧表——只许在虚拟里试。"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "并联总电阻，和任一支路电阻比——",
                    options: ["更小", "更大", "相等"],
                    recordKey: "phy_guess_p08.2.4",
                    showAfter: "manual"
                  }
                }
              ],
              point: "并联路越多，总电阻越小——越并越小。"
            },
            {
              id: "p08.2.4-p2",
              kind: "explain",
              title: "串联分压，并联分流",
              blocks: [
                { type: "lead", text: "串联像排队：电流一样，电压分着用；并联像分岔路：电压一样，电流分着走。" },
                { type: "text", html: "串联：I=I₁=I₂，U=U₁+U₂，<span class=\"phy-f\" data-f=\"rseries\"></span>。分压：U₁/U₂=R₁/R₂——电阻大的多分电压。" },
                { type: "text", html: "并联：U=U₁=U₂，I=I₁+I₂，<span class=\"phy-f\" data-f=\"rparallel\"></span>。分流：I₁/I₂=R₂/R₁——电阻大的少分电流。" },
                { type: "text", html: "等效电阻：效果相同——并联总电阻比任一支路都小（路多了，“阻碍”就小）。内部仍各走各路。" },
                { type: "trap", text: "⚠️ 别搞混：“并联总电阻比任一支路都大”——错，正好反了；“等效”就是“完全相同”——错。" },
                { type: "mathlink", text: "数学呼应：代数 ch03 分式（奠基）——1/R=1/R₁+1/R₂，通分变形是基本功。" }
              ],
              point: "分压看电阻比，分流看电阻反比——串联分大头给大电阻，并联分大头给小电阻。"
            },
            {
              id: "p08.2.4-p3",
              kind: "explain",
              title: "动态电路：滑片移动",
              blocks: [
                { type: "lead", text: "滑动变阻器滑片一动，全电路都跟着变——动态电路三步走。" },
                { type: "text", html: "三步：① 滑片移动→接入电阻变大 / 变小；② 总电阻变→总电流变（I=U/R）；③ 各用电器电压、电流、亮度跟着变。" },
                { type: "text", html: "例：滑片右移，接入电阻变大→总电流变小→灯泡变暗、电流表示数变小。一步一步来，别跳。" },
                { type: "text", html: "现在元件库里有真滑动变阻器了（p08.2.2 已上手）：滑片一滑，接入电阻连续变化，电流、电压、亮度一步一步跟着变——动态电路三步走，照着滑就行。" },
                { type: "slogan", text: "滑片一动，全军跟着动。" }
              ],
              point: "动态电路不怕：电阻→电流→电压亮度，一步推一步。"
            }
          ]
        },
        {
          id: "p08.2.0",
          title: "本章小结与习题",
          prereq: "p08 全章",
          time: "40–60 分钟",
          formulas: {
            res: {
              mathml: '<math><mi>R</mi><mo>=</mo><mfrac><mi>U</mi><mi>I</mi></mfrac></math>',
              translation: "电阻 = 电压 ÷ 电流"
            },
            ohm: {
              mathml: '<math><mi>I</mi><mo>=</mo><mfrac><mi>U</mi><mi>R</mi></mfrac></math>',
              translation: "电流 = 电压 ÷ 电阻"
            },
            rseries: {
              mathml: '<math><mi>R</mi><mo>=</mo><msub><mi>R</mi><mn>1</mn></msub><mo>+</mo><msub><mi>R</mi><mn>2</mn></msub></math>',
              translation: "串联总电阻 = 各电阻之和"
            },
            rparallel: {
              mathml: '<math><mfrac><mn>1</mn><mi>R</mi></mfrac><mo>=</mo><mfrac><mn>1</mn><msub><mi>R</mi><mn>1</mn></msub></mfrac><mo>+</mo><mfrac><mn>1</mn><msub><mi>R</mi><mn>2</mn></msub></mfrac></math>',
              translation: "并联总电阻的倒数 = 各支路电阻倒数之和"
            }
          },
          pages: [
            {
              id: "p08.2.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "① <b>电流方向</b>：正电荷定向移动方向；与电子移动方向相反（全书级易错）。② <b>串联</b>处处电流相等；<b>并联</b>电压相同才互不影响。③ <b>电流表</b>：串联，禁并联（烧表红线）；试触选量程。④ <b>电压</b>是“原因”，电流是“结果”；电压表内阻极大。⑤ <b>电阻</b> <span class=\"phy-f\" data-f=\"res\"></span>：是“量”不是“决定”（等号不代表因果）。⑥ <b>欧姆定律</b> <span class=\"phy-f\" data-f=\"ohm\"></span>：金属导体、纯电阻、温度不变。⑦ <b>串联</b> <span class=\"phy-f\" data-f=\"rseries\"></span>；<b>并联</b> <span class=\"phy-f\" data-f=\"rparallel\"></span>（总电阻比任一支路小）。⑧ <b>数量级锚点</b>：干电池 1.5V、家庭电路 220V、手机充电电流约 1–2A——估算先有锚。"
                }
              ],
              point: "七句话收束本章：p09 电功率——公式更多，条件更多，拿“身份证”去。"
            },
            {
              id: "p08.2.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "金属导线中，电流方向与电子移动方向——",
                  options: ["相同", "相反", "无关"],
                  answer: 1,
                  tip: "电流方向 = 正电荷定向移动方向 = 电子移动的反方向——背三遍。"
                },
                {
                  type: "choice",
                  stem: "把电流表并联在灯泡两端，会——",
                  options: ["烧表（安全红线）", "正常测出电流", "灯泡更亮"],
                  answer: 0,
                  tip: "电流表内阻极小，并联近乎短路——只能串联，这是禁令。"
                },
                {
                  type: "choice",
                  stem: "由公式 R=U/I 可以得出——",
                  options: ["电阻与电压成正比", "电阻与电流成反比", "电阻是导体属性，与 U、I 无关"],
                  answer: 2,
                  tip: "等号不代表因果：R=U/I 是“量”电阻的方法，不是“决定”的原因。"
                },
                {
                  type: "choice",
                  stem: "欧姆定律 I=U/R 适用于——",
                  options: ["小灯泡（灯丝发热时）", "金属导体、纯电阻", "所有电路"],
                  answer: 1,
                  tip: "有条件的真话：金属导体、纯电阻、温度不变——小灯泡不符合。"
                },
                {
                  type: "fill",
                  stemBefore: "串联电路中，各处电流",
                  stemAfter: "",
                  answer: "相等",
                  accept: [],
                  hint: "（两个字）",
                  tip: "电荷是“队伍”在走：串联处处电流相等。"
                },
                {
                  type: "choice",
                  stem: "两个 10Ω 的电阻并联，总电阻是——",
                  options: ["20Ω", "5Ω", "10Ω"],
                  answer: 1,
                  tip: "并联总电阻比任一支路都小：1/R=1/10+1/10，R=5Ω。"
                },
                {
                  type: "choice",
                  stem: "【估算】一节干电池 1.5V，接在 10Ω 的电阻两端，电流约——（数量级对即满分）",
                  options: ["约 0.015A", "约 0.15A", "约 1.5A", "约 15A"],
                  answer: 1,
                  tip: "依据链：I = U/R = 1.5÷10 = 0.15A——10⁻¹ 量级。记住这个锚点：干电池配小电阻，电流零点几安。"
                }
              ],
              point: "错两道以上的，回 p08.2.2 重看“等号不代表因果”。"
            }
          ]
        }
      ]
    }
  ]
};
