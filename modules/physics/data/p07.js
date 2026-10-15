/* ============================================================
 * 学习工具箱 · 物理 · 第七章数据（物理专家队+黄队 2026-10-15，批量生产批 2）
 *
 * schema v1.0（冻结，见 modules/physics/data/p04.js 文件头）逐字遵守；
 * 组件 API 以 modules/physics/data/WIDGETS.md v1.0 为准。
 * 本章：p07 功、功率、机械能与简单机械（八下）——3 单元 / 7 课 / 19 页（实测）。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p07"] = {
  id: "p07",
  units: [
    {
      id: "p07.1",
      title: "功与功率",
      lessons: [
        {
          id: "p07.1.1",
          title: "功",
          prereq: "p05 力",
          time: "40–60 分钟",
          formulas: {
            work: {
              mathml: '<math><mi>W</mi><mo>=</mo><mi>F</mi><mi>s</mi></math>',
              translation: "功 = 力 × 在力的方向上移动的距离"
            }
          },
          pages: [
            {
              id: "p07.1.1-p1",
              kind: "interact",
              title: "“劳而无功”三种死法",
              exploreTip: "“劳而无功”有三种死法：先猜，再看缺了哪个条件。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "大力士推墙，墙纹丝不动，做功了吗？",
                    options: ["做了", "没做", "做了一半"],
                    recordKey: "phy_guess_p07.1.1a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "提着水桶水平走，提力做功了吗？",
                    options: ["做了", "没做", "做了一点"],
                    recordKey: "phy_guess_p07.1.1b",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "球踢出后在地上滚，脚对球做功了吗？",
                    options: ["做了", "没做", "一直在做"],
                    recordKey: "phy_guess_p07.1.1c",
                    showAfter: "manual"
                  }
                }
              ],
              point: "三种死法：无距离、方向垂直、无力——缺一个条件，功就是零。"
            },
            {
              id: "p07.1.1-p2",
              kind: "explain",
              title: "做功的两要素",
              blocks: [
                { type: "lead", text: "出力不一定出功——功是“挑食”的，要两个条件同时到场。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>W</mi><mo>=</mo><mi>F</mi><mi>s</mi></math>',
                    translation: "功 = 力 × 在力的方向上移动的距离"
                  },
                  conditions: ["力恒定", "力与位移方向一致（初中版）"],
                  counterexample: "提水桶水平走：提力向上、距离向前，垂直——W=0，一点功没做",
                  dimension: "J = N·m ✓",
                  units: { si: "J（焦耳）", note: "1J = 1N·m" }
                },
                { type: "text", html: "做功两要素：① 有力作用在物体上；② 物体在力的方向上移动了距离。两个同时满足，才算做功。" },
                { type: "trap", text: "⚠️ 别搞混：“有力有距离就做功”——错！还缺“方向一致”：力与距离垂直，一点功没做。" },
                { type: "mathlink", text: "数学呼应：代数 ch02 整式乘法（奠基）——W=Fs 是两个量的乘积，单位跟着乘：N·m=J。" }
              ],
              point: "判断做功，先看“力”，再看“在力的方向上有没有距离”。"
            },
            {
              id: "p07.1.1-p3",
              kind: "explain",
              title: "三情形复盘",
              blocks: [
                { type: "lead", text: "第 1 页的三道题，现在用两要素判一遍。" },
                { type: "text", html: "推墙：有力，无距离——没做功。提水桶水平走：有力有距离，但垂直——没做功。踢球后：有距离，但脚已离开球，无力——没做功。" },
                { type: "text", html: "不做功的三种情况：① 有力无距离；② 有距离无力；③ 力与距离垂直。考试就考这三种，认准。" },
                { type: "slogan", text: "力、距离、方向齐，才做功。" }
              ],
              point: "搬箱子上楼：提力向上、距离向上——方向一致，做了功。"
            }
          ]
        },
        {
          id: "p07.1.2",
          title: "功率",
          prereq: "p07.1.1 功",
          time: "40–60 分钟",
          formulas: {
            power: {
              mathml: '<math><mi>P</mi><mo>=</mo><mfrac><mi>W</mi><mi>t</mi></mfrac></math>',
              translation: "功率 = 功 ÷ 时间"
            },
            powerfv: {
              mathml: '<math><mi>P</mi><mo>=</mo><mi>F</mi><mi>v</mi></math>',
              translation: "功率 = 力 × 速度"
            }
          },
          pages: [
            {
              id: "p07.1.2-p1",
              kind: "interact",
              title: "做功多，不一定功率大",
              exploreTip: "做功多≠功率大——还得看时间。先猜，再看解释。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "搬 100 块砖用 1 小时 vs 搬 50 块用 10 分钟，谁功率大？",
                    options: ["搬 100 块的", "搬 50 块的", "一样大"],
                    recordKey: "phy_guess_p07.1.2a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "汽车爬坡为什么挂低速挡？",
                    options: ["v 小 F 大，劲儿大", "为了省油", "司机习惯"],
                    recordKey: "phy_guess_p07.1.2b",
                    showAfter: "manual"
                  }
                }
              ],
              point: "功率比的是“快慢”：同样的功，时间越短，功率越大。"
            },
            {
              id: "p07.1.2-p2",
              kind: "explain",
              title: "P=W/t：功的“快慢”",
              blocks: [
                { type: "lead", text: "同样搬 100 块砖，1 小时和 10 分钟——差的是“快慢”，不是“多少”。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>P</mi><mo>=</mo><mfrac><mi>W</mi><mi>t</mi></mfrac></math>',
                    translation: "功率 = 功 ÷ 时间"
                  },
                  conditions: ["W、t 对应同一过程"],
                  counterexample: "搬 100 块砖用 1 小时 vs 搬 50 块用 10 分钟：功多的一方，功率反而小——不看时间就比错了",
                  dimension: "W = J/s ✓",
                  units: { si: "W（瓦特）", common: "kW", note: "1kW = 1000W" }
                },
                { type: "text", html: "爬楼估算（全书第一个“人体功率”锚点）：体重 500N，爬 3m 高，用 10s——W=1500J，P=150W。人爬楼，约 10² W。" },
                { type: "trap", text: "⚠️ 别搞混：“做功多功率一定大”——错！还看时间：功÷时间，才是功率。" },
                { type: "mathlink", text: "数学呼应：代数 ch00 数量级（奠基）——人爬楼约 10² W，记住这个数量级。" }
              ],
              point: "估算题套路：先算 W=Fs，再除以 t——两步，别跳。"
            },
            {
              id: "p07.1.2-p3",
              kind: "explain",
              title: "P=Fv：爬坡挂低速挡",
              blocks: [
                { type: "lead", text: "功率一定，速度和力是“跷跷板”：一边下去，另一边上来。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>P</mi><mo>=</mo><mi>F</mi><mi>v</mi></math>',
                    translation: "功率 = 力 × 速度"
                  },
                  conditions: ["力恒定、方向与运动方向一致", "v 取平均速度（初中不区分瞬时，高中 p14.1.1 回填）"],
                  counterexample: "提水桶水平走：P=Fv 算出来≠0？——F 与 v 垂直，条件不满足，不能用",
                  dimension: "W = N·(m/s) = J/s ✓",
                  units: { si: "W（瓦特）" }
                },
                { type: "text", html: "汽车爬坡挂低速挡：发动机功率一定，v 小了，F 就大了——“劲儿”大了，坡就爬上去了。" },
                { type: "oldfriend", text: "预告：p14.1.1——v 到底是平均还是瞬时？高中回来严格区分（回填，批 3 兑现）。" }
              ],
              point: "P=Fv 是 P=W/t 的变形：W=Fs，除以 t，s/t 就是 v。"
            }
          ]
        }
      ]
    },
    {
      id: "p07.2",
      title: "机械能",
      lessons: [
        {
          id: "p07.2.1",
          title: "动能与势能",
          prereq: "p07.1.2 功率",
          time: "40–60 分钟",
          formulas: {
            ek: {
              mathml: '<math><msub><mi>E</mi><mi>k</mi></msub><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>m</mi><msup><mi>v</mi><mn>2</mn></msup></math>',
              translation: "动能 = ½ × 质量 × 速度平方"
            }
          },
          pages: [
            {
              id: "p07.2.1-p1",
              kind: "interact",
              title: "谁让木块飞得更远",
              exploreTip: "控制变量：先固定 m1 只变 v1，再固定 v1 只变 m1——看 m2 被撞飞的速度。",
              widgets: [
                {
                  type: "collision-lab",
                  params: {
                    m1: { min: 1, max: 5, step: 0.5, init: 2 },
                    m2: { min: 1, max: 5, step: 0.5, init: 2 },
                    v1: { min: 0, max: 8, step: 0.5, init: 4 },
                    v2: { min: 0, max: 0, step: 0.5, init: 0 },
                    restitution: 1, showMomentumBars: true,
                    badge: { invariant: "没变的是：两车总质量" }
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "v 翻倍和 m 翻倍，哪个让“撞飞效果”更猛？",
                    options: ["v 翻倍", "m 翻倍", "一样猛"],
                    recordKey: "phy_guess_p07.2.1",
                    showAfter: "manual"
                  }
                }
              ],
              point: "v 翻倍，效果不止翻倍——速度是“平方级”的影响。"
            },
            {
              id: "p07.2.1-p2",
              kind: "explain",
              title: "动能：看 m 和 v",
              blocks: [
                { type: "lead", text: "飞鸟能撞坏飞机——鸟不重，快，就够了。" },
                { type: "text", html: "动能：物体由于运动具有的能。影响因素：质量 m、速度 v。定量式（高中 p14 严格化，初中先看形状）：<span class=\"phy-f\" data-f=\"ek\"></span>——v 翻倍，动能变 4 倍。" },
                { type: "trap", text: "⚠️ 别搞混：“速度大的动能一定大”——错，还看质量：子弹快但轻，卡车慢但重。" },
                { type: "mathlink", text: "数学呼应：代数 7.1 二次函数（奠基）——Ek=½mv² 是 v 的二次关系：v 的影响是平方级的。" },
                { type: "slogan", text: "速度平方级，质量线性级。" }
              ],
              point: "动能看两个量：m 和 v——v 的“权重”是平方级的。"
            },
            {
              id: "p07.2.1-p3",
              kind: "explain",
              title: "重力势能与弹性势能",
              blocks: [
                { type: "lead", text: "举高的石头、拉开的弓——没动，也有能量。" },
                { type: "text", html: "重力势能：被举高的物体具有的能。影响因素：质量 m、高度 h——举得越高、越重，砸下来越狠（高空坠物警示）。" },
                { type: "text", html: "弹性势能：弹性形变具有的能。影响因素：形变程度——拉开的弓、压缩的弹簧，形变越大，势能越大。" },
                { type: "trap", text: "⚠️ 别搞混：“举得高重力势能一定大”——错，还看质量（零势能面初中点到为止）。" }
              ],
              point: "势能是“位置”的能量：动能是“运动”的能量——机械能 = 动能 + 势能。"
            }
          ]
        },
        {
          id: "p07.2.2",
          title: "机械能及其转化",
          prereq: "p07.2.1 动能与势能",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p07.2.2-p1",
              kind: "interact",
              title: "滚摆越滚越低，能量去哪了",
              exploreTip: "能量不会消失——只会“换衣服”。先猜，再看解释。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "单摆摆到最高点时，速度——",
                    options: ["最大", "为零", "和最低点一样"],
                    recordKey: "phy_guess_p07.2.2a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "滚摆越滚越低，机械能去哪了？",
                    options: ["消失了", "变成了内能（摩擦生热）", "被重力吃掉了"],
                    recordKey: "phy_guess_p07.2.2b",
                    showAfter: "manual"
                  }
                }
              ],
              point: "最高点：动能为零，势能最大；最低点反过来——能量在“换衣服”。"
            },
            {
              id: "p07.2.2-p2",
              kind: "explain",
              title: "动能 ↔ 势能",
              blocks: [
                { type: "lead", text: "过山车冲上坡顶越来越慢，冲下来越来越快——能量在动能和势能之间“倒手”。" },
                { type: "text", html: "单摆：最高点（势能最大、动能为零）→ 最低点（动能最大、势能最小）→ 最高点。滚摆同理：动能和势能互相转化。" },
                { type: "text", html: "有条件！只有忽略摩擦 / 阻力时，机械能才守恒。滚摆越滚越低——机械能变成了内能：能量守恒，机械能不守恒。" },
                { type: "oldfriend", text: "预告：p14.1.4 机械能守恒——今天的“忽略阻力才守恒”，高中回来严格化（回填，批 3 兑现）。" },
                { type: "trap", text: "⚠️ 别搞混：“任何运动机械能都守恒”——错！忽略阻力时才成立，有条件（审计清单第 11 条）！" }
              ],
              point: "能量不会消失：机械能少了，一定是变成了内能——先找“小偷”（摩擦）。"
            }
          ]
        }
      ]
    },
    {
      id: "p07.3",
      title: "简单机械",
      lessons: [
        {
          id: "p07.3.1",
          title: "杠杆",
          prereq: "p07.2.2 机械能及其转化",
          time: "40–60 分钟",
          formulas: {
            lever: {
              mathml: '<math><msub><mi>F</mi><mn>1</mn></msub><msub><mi>l</mi><mn>1</mn></msub><mo>=</mo><msub><mi>F</mi><mn>2</mn></msub><msub><mi>l</mi><mn>2</mn></msub></math>',
              translation: "动力 × 动力臂 = 阻力 × 阻力臂"
            }
          },
          pages: [
            {
              id: "p07.3.1-p1",
              kind: "interact",
              title: "拖支点，看 F₁ 怎么变",
              exploreTip: "拖支点 O：离钩码越近，F₁ 读数怎么变？看验算行 ✓。",
              widgets: [
                {
                  type: "pulley-lever",
                  params: {
                    mode: "lever",
                    fulcrumX: { min: 30, max: 70, step: 1, init: 50 },
                    load: { weight: 10, armInit: 20 },
                    showEquation: true, unit: "N",
                    badge: { invariant: "没变的是：阻力（钩码重量）" }
                  }
                }
              ],
              point: "支点离重物越近越省力——F₁L₁=F₂L₂，乘积守恒。"
            },
            {
              id: "p07.3.1-p2",
              kind: "explain",
              title: "五要素与平衡条件",
              blocks: [
                { type: "lead", text: "撬棍撬石头：支点、动力、阻力——找对三点，杠杆就听话了。" },
                { type: "text", html: "五要素：支点 O、动力 F₁、阻力 F₂、动力臂 L₁、阻力臂 L₂。力臂是支点到力的作用线的垂线段——不是“到支点的距离”！" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><msub><mi>F</mi><mn>1</mn></msub><msub><mi>l</mi><mn>1</mn></msub><mo>=</mo><msub><mi>F</mi><mn>2</mn></msub><msub><mi>l</mi><mn>2</mn></msub></math>',
                    translation: "动力 × 动力臂 = 阻力 × 阻力臂"
                  },
                  conditions: ["杠杆平衡（静止或匀速转动）"],
                  counterexample: "斜着拉：力臂比“作用点到支点的距离”短——按距离算，F₁ 就算错了",
                  dimension: "N·m = N·m ✓",
                  units: { si: "N·m" }
                },
                { type: "trap", text: "⚠️ 别搞混：“动力臂=动力作用点到支点的距离”——错！力臂是垂线段（几何 g02 点到直线的距离）。" },
                { type: "mathlink", text: "数学呼应：代数 ch01 方程（奠基）；几何 g02 点到直线的距离（奠基）——力臂就是垂线段，数学回链。" }
              ],
              point: "画力臂三步：找支点、画力的作用线、作垂线段——垂线段才是力臂。"
            },
            {
              id: "p07.3.1-p3",
              kind: "explain",
              title: "三类杠杆",
              blocks: [
                { type: "lead", text: "撬棍省力、筷子费力、天平不省不费——杠杆分三类。" },
                { type: "text", html: "省力杠杆（L₁>L₂）：撬棍、羊角锤——省力费距离。费力杠杆（L₁<L₂）：筷子、镊子——费力省距离。等臂杠杆（L₁=L₂）：天平——不省力不费力。" },
                { type: "text", html: "筷子是费力杠杆：费力，但手移动一小段，菜移动一大段——省距离，有时代价值得付。" },
                { type: "slogan", text: "省力费距离，鱼与熊掌。" }
              ],
              point: "分类看力臂：L₁>L₂ 省力，L₁<L₂ 费力——先比力臂，再下结论。"
            }
          ]
        },
        {
          id: "p07.3.2",
          title: "滑轮与机械效率",
          prereq: "p07.3.1 杠杆",
          time: "40–60 分钟",
          formulas: {
            eta: {
              mathml: '<math><mi>&#951;</mi><mo>=</mo><mfrac><msub><mi>W</mi><mi>有</mi></msub><msub><mi>W</mi><mi>总</mi></msub></mfrac></math>',
              translation: "机械效率 = 有用功 ÷ 总功"
            }
          },
          pages: [
            {
              id: "p07.3.2-p1",
              kind: "interact",
              title: "定滑轮 vs 动滑轮",
              exploreTip: "定滑轮拉一次，动滑轮拉一次：读数差一半，绳子多拉一倍。",
              widgets: [
                {
                  type: "pulley-lever",
                  params: {
                    mode: "pulley", pulleyKind: "fixed",
                    load: { weight: 10, armInit: 0 },
                    showEquation: false, unit: "N",
                    badge: { invariant: "没变的是：重物重量（定滑轮）" }
                  }
                },
                {
                  type: "pulley-lever",
                  params: {
                    mode: "pulley", pulleyKind: "movable",
                    load: { weight: 10, armInit: 0 },
                    showEquation: false, unit: "N",
                    badge: { invariant: "没变的是：重物重量（动滑轮）" }
                  }
                }
              ],
              point: "动滑轮：F=G/2，省一半力，但要多拉一倍绳子——省力不省功。"
            },
            {
              id: "p07.3.2-p2",
              kind: "explain",
              title: "定 / 动滑轮的实质",
              blocks: [
                { type: "lead", text: "旗杆顶的定滑轮不省力，为什么还装？——它改方向。" },
                { type: "text", html: "定滑轮：等臂杠杆，不省力，但改变力的方向。动滑轮：动力臂是阻力臂 2 倍的杠杆，省一半力，费一倍距离。" },
                { type: "text", html: "滑轮组：n 段绳子吊着动滑轮，F=G/n，s=nh——绳子段数越多越省力，绳子也拉得越长。功的原理：省力必费距离，功不省。" },
                { type: "trap", text: "⚠️ 别搞混：“省力就省功”——错！功的原理：省力必费距离，F·s 的乘积不变。" }
              ],
              point: "滑轮组 n 段绳：F=G/n，s=nh——省力的倍数，就是费距离的倍数。"
            },
            {
              id: "p07.3.2-p3",
              kind: "explain",
              title: "机械效率 η：恒小于 1",
              blocks: [
                { type: "lead", text: "有用功永远小于总功——“额外功”躲不掉：绳重、摩擦、动滑轮自重。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>&#951;</mi><mo>=</mo><mfrac><msub><mi>W</mi><mi>有</mi></msub><msub><mi>W</mi><mi>总</mi></msub></mfrac></math>',
                    translation: "机械效率 = 有用功 ÷ 总功"
                  },
                  conditions: ["恒小于 1（有用功 < 总功）"],
                  counterexample: "η>1？那就是永动机——额外功躲不掉，η 恒<1",
                  dimension: "1 = J/J ✓（无单位）",
                  units: { si: "无单位（常用百分数）" }
                },
                { type: "trap", text: "⚠️ 别搞混：“机械效率>1”——错！有用功永远小于总功，η 恒<1；η>1 就是永动机。" },
                { type: "mathlink", text: "数学呼应：代数 ch03 分式（奠基）——η 是分式，恒<1：分子永远小于分母。" },
                { type: "slogan", text: "有用小于总，效率恒小一。" }
              ],
              point: "提高 η 的思路：减小额外功（轻动滑轮、加润滑）——分子做大，分母做小。"
            }
          ]
        },
        {
          id: "p07.3.0",
          title: "本章小结与习题",
          prereq: "p07 全章",
          time: "40–60 分钟",
          formulas: {
            work: {
              mathml: '<math><mi>W</mi><mo>=</mo><mi>F</mi><mi>s</mi></math>',
              translation: "功 = 力 × 在力的方向上移动的距离"
            },
            power: {
              mathml: '<math><mi>P</mi><mo>=</mo><mfrac><mi>W</mi><mi>t</mi></mfrac></math>',
              translation: "功率 = 功 ÷ 时间"
            },
            ek: {
              mathml: '<math><msub><mi>E</mi><mi>k</mi></msub><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>m</mi><msup><mi>v</mi><mn>2</mn></msup></math>',
              translation: "动能 = ½ × 质量 × 速度平方"
            },
            lever: {
              mathml: '<math><msub><mi>F</mi><mn>1</mn></msub><msub><mi>l</mi><mn>1</mn></msub><mo>=</mo><msub><mi>F</mi><mn>2</mn></msub><msub><mi>l</mi><mn>2</mn></msub></math>',
              translation: "动力 × 动力臂 = 阻力 × 阻力臂"
            },
            eta: {
              mathml: '<math><mi>&#951;</mi><mo>=</mo><mfrac><msub><mi>W</mi><mi>有</mi></msub><msub><mi>W</mi><mi>总</mi></msub></mfrac></math>',
              translation: "机械效率 = 有用功 ÷ 总功"
            }
          },
          pages: [
            {
              id: "p07.3.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "① <b>功</b> <span class=\"phy-f\" data-f=\"work\"></span>：两要素（力 + 力的方向上移动距离）；三情形不做功。② <b>功率</b> <span class=\"phy-f\" data-f=\"power\"></span>：人爬楼约 10² W；P=Fv（v 小 F 大）。③ <b>动能</b>看 m、v（<span class=\"phy-f\" data-f=\"ek\"></span>，v 平方级）；<b>势能</b>看 m、h（重力）/ 形变（弹性）。④ <b>机械能转化</b>：忽略阻力才守恒（有条件！）。⑤ <b>杠杆</b> <span class=\"phy-f\" data-f=\"lever\"></span>：力臂是垂线段。⑥ <b>机械效率</b> <span class=\"phy-f\" data-f=\"eta\"></span> 恒<1：省力不省功。"
                }
              ],
              point: "六句话收束本章：p08 电路基础与欧姆定律——电学第一座“抽象大山”。"
            },
            {
              id: "p07.3.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "提着水桶水平走，提力做功的情况是——",
                  options: ["做了功", "没做功（力与距离垂直）", "做了一半功"],
                  answer: 1,
                  tip: "提力向上、距离向前：垂直——缺“方向一致”，W=0。"
                },
                {
                  type: "choice",
                  stem: "汽车爬坡挂低速挡，主要是为了——",
                  options: ["省油", "功率一定时 v 小 F 大", "跑得更快"],
                  answer: 1,
                  tip: "P=Fv：功率一定，速度和力是“跷跷板”。"
                },
                {
                  type: "fill",
                  stemBefore: "功率的 SI 单位是",
                  stemAfter: "",
                  answer: "W",
                  accept: ["瓦", "瓦特"],
                  hint: "（瓦特）",
                  tip: "P=W/t：J/s=W。"
                },
                {
                  type: "choice",
                  stem: "滚摆越滚越低，说明——",
                  options: ["能量消失了", "机械能转化为了内能", "重力消失了"],
                  answer: 1,
                  tip: "能量守恒，机械能不守恒：先找“小偷”（摩擦）。"
                },
                {
                  type: "choice",
                  stem: "关于机械效率，正确的是——",
                  options: ["可能大于 1", "恒小于 1", "一定等于 1"],
                  answer: 1,
                  tip: "有用功永远小于总功——额外功躲不掉。"
                },
                {
                  type: "choice",
                  stem: "用筷子夹菜，筷子是——",
                  options: ["省力杠杆", "费力杠杆", "等臂杠杆"],
                  answer: 1,
                  tip: "动力臂 < 阻力臂：费力，但省距离。"
                }
              ],
              point: "错两道以上的，回 p07.1.1 重判“劳而无功”三情形。"
            }
          ]
        }
      ]
    }
  ]
};
