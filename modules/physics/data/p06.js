/* ============================================================
 * 学习工具箱 · 物理 · 第六章数据（物理专家队+黄队 2026-10-15，批量生产批 2）
 *
 * schema v1.0（冻结，见 modules/physics/data/p04.js 文件头）逐字遵守；
 * 组件 API 以 modules/physics/data/WIDGETS.md v1.0 为准。
 * 本章：p06 压强与浮力（八下）——2 单元 / 8 课 / 21 页（实测）。
 * 全书级难点：p06.2 浮力（受力分析 + 阿基米德双线程，跃升 11）。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p06"] = {
  id: "p06",
  units: [
    {
      id: "p06.1",
      title: "压强",
      lessons: [
        {
          id: "p06.1.1",
          title: "压强",
          prereq: "p05 力",
          time: "40–60 分钟",
          formulas: {
            press: {
              mathml: '<math><mi>p</mi><mo>=</mo><mfrac><mi>F</mi><mi>S</mi></mfrac></math>',
              translation: "压强 = 压力 ÷ 受力面积"
            }
          },
          pages: [
            {
              id: "p06.1.1-p1",
              kind: "interact",
              title: "海绵怎么说",
              exploreTip: "控制变量：一次只变一个量，猜猜海绵的凹陷怎么说。（海绵凹陷暂无专用组件，先猜后验。）",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "压力相同，接触面积减半，海绵凹陷会——",
                    options: ["更深", "更浅", "不变"],
                    recordKey: "phy_guess_p06.1.1a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "接触面积相同，压力加倍，海绵凹陷会——",
                    options: ["更深", "更浅", "不变"],
                    recordKey: "phy_guess_p06.1.1b",
                    showAfter: "manual"
                  }
                }
              ],
              point: "凹陷只看一个量不够：压力和面积，两个量说了算。"
            },
            {
              id: "p06.1.1-p2",
              kind: "explain",
              title: "压强：两个量决定一个量",
              blocks: [
                { type: "lead", text: "压力大不一定“压得狠”——还得看它站在多大的面积上。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>p</mi><mo>=</mo><mfrac><mi>F</mi><mi>S</mi></mfrac></math>',
                    translation: "压强 = 压力 ÷ 受力面积"
                  },
                  conditions: ["F 取垂直于接触面的压力"],
                  counterexample: "斜面上的箱子：压力不等于重力——只有水平面静止时才等大",
                  dimension: "Pa = N/m² ✓",
                  units: { si: "Pa（帕斯卡）", common: "kPa", note: "1Pa = 1N/m²" }
                },
                { type: "text", html: "压力 ≠ 重力：压力的方向是垂直于接触面。斜面上的箱子，压力斜着指——只有水平面静止，压力才和重力等大。" },
                { type: "trap", text: "⚠️ 别搞混：“压力就是重力”——错！压力垂直于接触面，重力竖直向下；只有水平面静止才等大。" }
              ],
              point: "压强看“压力 + 面积”两个量：一个量说了不算。"
            },
            {
              id: "p06.1.1-p3",
              kind: "explain",
              title: "增大 / 减小压强",
              blocks: [
                { type: "lead", text: "菜刀磨快、滑雪板加宽——生活里全是 p=F/S 的应用题。" },
                { type: "text", html: "增大压强：增大压力（压路机）、减小受力面积（菜刀磨快、图钉尖）。减小压强：减小压力、增大受力面积（滑雪板、书包宽肩带）。" },
                { type: "text", html: "思路永远是控制变量：想让它“压得狠”，要么加 F，要么减 S——两个旋钮，别只拧一个。" },
                { type: "mathlink", text: "数学呼应：代数 7.2 反比例函数（定性，不画双曲线图像，奠基）——F 一定时，p 与 S 成反比：面积减半，压强加倍。" },
                { type: "slogan", text: "面积小一半，压强翻一番。" }
              ],
              point: "F 一定，p 与 S 成反比——定性记住趋势，图像等代数 7.2 再画。"
            }
          ]
        },
        {
          id: "p06.1.2",
          title: "液体压强",
          prereq: "p06.1.1 压强",
          time: "40–60 分钟",
          formulas: {
            liq: {
              mathml: '<math><mi>p</mi><mo>=</mo><mi>&#961;</mi><mi>g</mi><mi>h</mi></math>',
              translation: "液体压强 = 液体密度 × g × 深度"
            }
          },
          pages: [
            {
              id: "p06.1.2-p1",
              kind: "interact",
              title: "p–h 图像：斜率是谁",
              exploreTip: "看 p–h 图像：斜率是多少？再想：压强计在水里转个方向，读数变吗？",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "function", expr: "p = 9800*h", xLabel: "h/m", yLabel: "p/Pa", steps: ["slope"] },
                    badge: { invariant: "没变的是：液体密度（水）" }
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "压强计在水中同一深度，探头朝上 / 朝下 / 朝侧面，U 形管高度差——",
                    options: ["一样", "朝下最大", "朝上最大"],
                    recordKey: "phy_guess_p06.1.2",
                    showAfter: "manual"
                  }
                }
              ],
              point: "p–h 是过原点的直线：斜率 = ρg；同一深度，朝哪压强都一样。"
            },
            {
              id: "p06.1.2-p2",
              kind: "explain",
              title: "p=ρgh：只与 ρ、h 有关",
              blocks: [
                { type: "lead", text: "大坝下宽上窄——水越深，“压”得越狠。帕斯卡裂桶：一杯水就能压裂木桶！" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>p</mi><mo>=</mo><mi>&#961;</mi><mi>g</mi><mi>h</mi></math>',
                    translation: "液体压强 = 液体密度 × g × 深度"
                  },
                  conditions: ["静止液体"],
                  counterexample: "水流起来就不归它管：流速大的地方压强小——那是 p06.1.4 的地盘",
                  dimension: "Pa = (kg/m³)·(m/s²)·m = N/m² ✓",
                  units: { si: "Pa", note: "h 用 m；ρ 用 kg/m³" }
                },
                { type: "text", html: "h 是深度——从液面往下量，不是高度！只与 ρ、h 有关：容器形状、液体多少，都不影响。" },
                { type: "trap", text: "⚠️ 别搞混：“液体压强与容器形状、液体多少有关”——错，只与 ρ、h 有关；“h 是高度”——错，h 是深度。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 正比例（奠基）——p–h 图像是过原点的直线，斜率 = ρg。" }
              ],
              point: "h 从液面往下量：深度不是高度，这是本课第一坑。"
            },
            {
              id: "p06.1.2-p3",
              kind: "explain",
              title: "压强计与连通器",
              blocks: [
                { type: "lead", text: "压强计是液体的“听诊器”：U 形管两边高度差越大，压强越大。" },
                { type: "text", html: "三探头结论（压强计虚拟实验暂无专用组件，结论先记）：① 深度越深，压强越大；② 同一深度，各个方向压强相等；③ 深度相同时，液体密度越大，压强越大。" },
                { type: "text", html: "连通器：上端开口、底部连通的容器。液体静止时，各液面相平——茶壶、船闸都是连通器。" },
                { type: "slogan", text: "深度为王，方向平等。" }
              ],
              point: "连通器液面相平的前提：同种液体、液体静止。"
            }
          ]
        },
        {
          id: "p06.1.3",
          title: "大气压强",
          prereq: "p06.1.2 液体压强",
          time: "40–60 分钟",
          formulas: {
            stdatm: {
              mathml: '<math><mn>1</mn><mspace width="0.2em"/><mi mathvariant="normal">标准大气压</mi><mo>=</mo><mn>1.01</mn><mo>×</mo><msup><mn>10</mn><mn>5</mn></msup><mspace width="0.2em"/><mi mathvariant="normal">Pa</mi></math>',
              translation: "1 标准大气压 = 1.01×10⁵ Pa"
            }
          },
          pages: [
            {
              id: "p06.1.3-p1",
              kind: "interact",
              title: "是“压”，不是“吸”",
              exploreTip: "是大气在“压”，不是“吸”——“吸”不是一种力。先猜，再看解释。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "覆杯实验：杯口盖纸片倒过来，纸片会——",
                    options: ["掉下来", "被大气“托”住不掉", "纸片湿了才掉"],
                    recordKey: "phy_guess_p06.1.3a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "高山上烧水，水开了时温度——",
                    options: ["还是 100℃", "不到 100℃", "超过 100℃"],
                    recordKey: "phy_guess_p06.1.3b",
                    showAfter: "manual"
                  }
                }
              ],
              point: "纸片不掉、高山水“提前”开——都是大气压在动手。"
            },
            {
              id: "p06.1.3-p2",
              kind: "explain",
              title: "大气压的存在与测量",
              blocks: [
                { type: "lead", text: "马德堡半球：两队马拉不开两个铜半球——看不见的空气，有看得见的力气。" },
                { type: "text", html: "吸盘、吸管喝水：都是大气压在“压”你喝，不是“吸”。“吸”不是一种力——记住这句。" },
                { type: "text", html: "托里拆利实验：水银柱高 760mm——这就是“标准大气压”的定义值，恒成立：<span class=\"phy-f\" data-f=\"stdatm\"></span>。" },
                { type: "trap", text: "⚠️ 别搞混：“大气压把纸片‘吸’住了”——错，是大气压在“压”；“760mmHg 处处成立”——错，那是标准大气压的定义值，真实气压随高度、天气变化。" },
                { type: "mathlink", text: "数学呼应：代数 ch00 数量级（奠基）——10⁵ Pa：大气压的数量级锚点。" }
              ],
              point: "标准大气压是“定义值”（恒成立）；你头顶的真实气压，随高度天气变。"
            },
            {
              id: "p06.1.3-p3",
              kind: "explain",
              title: "气压与沸点",
              blocks: [
                { type: "lead", text: "高山上水不到 100℃ 就开了——不是火太旺，是气压太低。" },
                { type: "text", html: "气压越低，水的沸点越低：高山上气压小，水 80 多℃就开了，饭煮不熟——所以有了高压锅（加压提高沸点）。" },
                { type: "text", html: "生活里的气压计：吸盘挂钩（压紧再挂）、拔火罐、飞机座舱加压——全是大气压的应用。" },
                { type: "slogan", text: "气压低，沸点低。" }
              ],
              point: "高压锅的思路：加压→沸点升高→饭煮得熟——反向利用气压。"
            }
          ]
        },
        {
          id: "p06.1.4",
          title: "流体压强与流速",
          prereq: "p06.1.3 大气压强",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p06.1.4-p1",
              kind: "interact",
              title: "往中间吹，纸往哪跑",
              exploreTip: "别记反了：流速大，压强小。先猜，再看解释。（流线演示暂无专用组件）",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "往两张纸中间吹气，两张纸会——",
                    options: ["向中间合拢", "向两边分开", "一动不动"],
                    recordKey: "phy_guess_p06.1.4a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "火车站为什么要画安全线？",
                    options: ["流速大压强小，人会被“推”向火车", "怕乘客掉下站台", "装饰"],
                    recordKey: "phy_guess_p06.1.4b",
                    showAfter: "manual"
                  }
                }
              ],
              point: "中间流速大、压强小：纸被两边的“大气压大军”推进来了。"
            },
            {
              id: "p06.1.4-p2",
              kind: "explain",
              title: "流速大，压强小",
              blocks: [
                { type: "lead", text: "飞机几十吨重，怎么上天的？机翼上下，空气跑得不一样快。" },
                { type: "text", html: "流体压强与流速（初中定性）：流速大的地方压强小。机翼上表面空气流速快、压强小，下表面流速慢、压强大——压强差把飞机“托”起来。" },
                { type: "text", html: "有条件！限同一流体、同一水平高度附近，定性即可——别拿着结论到处套。" },
                { type: "trap", text: "⚠️ 别搞混：“流速大压强就大”——错，正好反了；“只记结论不记条件”——错，限同一流体、同一水平高度附近。" },
                { type: "slogan", text: "跑得快，压得小。" }
              ],
              point: "火车站安全线、飞机升力——都是“流速大压强小”在上班。"
            }
          ]
        }
      ]
    },
    {
      id: "p06.2",
      title: "浮力",
      lessons: [
        {
          id: "p06.2.1",
          title: "浮力",
          prereq: "p04 密度；p05 力",
          time: "40–60 分钟",
          formulas: {
            weigh: {
              mathml: '<math><msub><mi>F</mi><mi>浮</mi></msub><mo>=</mo><mi>G</mi><mo>−</mo><msup><mi>F</mi><mo>′</mo></msup></math>',
              translation: "浮力 = 重力 − 测力计示数"
            }
          },
          pages: [
            {
              id: "p06.2.1-p1",
              kind: "interact",
              title: "示数少了多少，就是浮力",
              exploreTip: "拖 F浮（模拟石块越浸越深），再调 F′ 让合力为零：F′ 比 G 少了多少，浮力就是多少。",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 45, size: 15, label: "石块" },
                    forces: [
                      { id: "g",  kind: "gravity", label: "G",   angleDeg: 270, mag: 10, fixed: true },
                      { id: "fb", kind: "custom",  label: "F浮", angleDeg: 90,  mag: 3, min: 0, max: 10 },
                      { id: "fp", kind: "pull",    label: "F′",  angleDeg: 90,  mag: 7, min: 0, max: 10 }
                    ],
                    showResultant: true, surface: "horizontal", unit: "N",
                    badge: { invariant: "没变的是：石块的重力" }
                  }
                }
              ],
              point: "称重法：F浮=G−F′——看得见的浮力，先画三个箭头再算数。"
            },
            {
              id: "p06.2.1-p2",
              kind: "explain",
              title: "浮力：方向竖直向上",
              blocks: [
                { type: "lead", text: "把石块按进水里，手感到一股“托举”——这就是浮力。" },
                { type: "text", html: "浮力方向：竖直向上（不是“垂直于物体表面”）。称重法：<span class=\"phy-f\" data-f=\"weigh\"></span>——测力计示数差，就是浮力。" },
                { type: "text", html: "漂浮的物体恰恰受浮力，而且 F浮=G：船浮在水面上，不是“没受浮力”，是浮力刚好托住了重力。" },
                { type: "trap", text: "⚠️ 别搞混：“漂浮的物体不受浮力”——错，漂浮时 F浮=G；“浮力方向垂直于表面”——错，竖直向上。" },
                { type: "slogan", text: "先画箭头，再算数。" }
              ],
              point: "算浮力永远两只手：左手画受力图，右手想阿基米德——下一课开右手。"
            }
          ]
        },
        {
          id: "p06.2.2",
          title: "阿基米德原理",
          prereq: "p06.2.1 浮力",
          time: "40–60 分钟",
          formulas: {
            arch: {
              mathml: '<math><msub><mi>F</mi><mi>浮</mi></msub><mo>=</mo><msub><mi>G</mi><mi>排</mi></msub><mo>=</mo><msub><mi>&#961;</mi><mi>液</mi></msub><mi>g</mi><msub><mi>V</mi><mi>排</mi></msub></math>',
              translation: "浮力 = 排开液体的重力 = 液体密度 × g × 排开体积"
            }
          },
          pages: [
            {
              id: "p06.2.2-p1",
              kind: "interact",
              title: "左手称重，右手排水",
              exploreTip: "左手称重法，右手想想溢出的水——两只手对答案。（溢水杯暂无专用组件，先猜后验。）",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "石块浸入水中“变轻”了 2N，溢出的水重——",
                    options: ["2N", "比 2N 大", "比 2N 小"],
                    recordKey: "phy_guess_p06.2.2a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "漂浮的木块，V排和 V物——",
                    options: ["V排=V物", "V排<V物", "V排>V物"],
                    recordKey: "phy_guess_p06.2.2b",
                    showAfter: "manual"
                  }
                }
              ],
              point: "变轻了多少，排出的水就有多重——F浮=G排，两只手对上了。"
            },
            {
              id: "p06.2.2-p2",
              kind: "explain",
              title: "F浮=G排=ρ液gV排",
              blocks: [
                { type: "lead", text: "阿基米德洗澡时想通的：你“挤”走多少水，水就“托”你多少。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><msub><mi>F</mi><mi>浮</mi></msub><mo>=</mo><msub><mi>G</mi><mi>排</mi></msub><mo>=</mo><msub><mi>&#961;</mi><mi>液</mi></msub><mi>g</mi><msub><mi>V</mi><mi>排</mi></msub></math>',
                    translation: "浮力 = 排开液体的重力 = 液体密度 × g × 排开体积"
                  },
                  conditions: ["物体浸在液体中（气体也成立，下一章不讲）"],
                  counterexample: "V排=V物 只在浸没时成立：漂浮时 V排<V物，代 V物 就算错了",
                  dimension: "N = (kg/m³)·(m/s²)·m³ = N ✓",
                  units: { si: "N", note: "ρ液 用 kg/m³，V排 用 m³" }
                },
                { type: "text", html: "浮力只与 ρ液、V排 有关：铁块扔水里沉底，压成船就浮了——铁的密度变了吗？没有，变的是 V排。" },
                { type: "text", html: "双线程检查清单：① 受力图画全了吗（G / F′ / F浮）？② F浮 用的是哪个式子（称重法还是阿基米德）？两只手对不上，就有东西漏了。" }
              ],
              point: "浮力不看物体密度：看液体密度和排开体积——“挤”走多少，托起多少。"
            },
            {
              id: "p06.2.2-p3",
              kind: "explain",
              title: "王冠鉴别",
              blocks: [
                { type: "lead", text: "阿基米德本人：国王的王冠掺假了吗？排开水的体积说了算。" },
                { type: "text", html: "把王冠浸入水中，排开水的体积 = 王冠的体积（浸没时 V排=V物）。称出王冠质量，算出密度——和纯金对不上，就是掺假了。" },
                { type: "text", html: "注意边界：V排=V物 限浸没。漂浮时只有一部分在水下，V排<V物——这是审计清单第 14 条。" },
                { type: "trap", text: "⚠️ 别搞混：“浮力与物体密度有关”——错，只与 ρ液、V排 有关；“V排=V物恒成立”——错，限浸没。" },
                { type: "slogan", text: "挤走多少，托起多少。" }
              ],
              point: "王冠鉴别的思路：V排=V物（浸没）→ 密度 = 质量 ÷ 体积——p04 的密度回来了。"
            }
          ]
        },
        {
          id: "p06.2.3",
          title: "物体的浮沉条件与应用",
          prereq: "p06.2.2 阿基米德原理",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p06.2.3-p1",
              kind: "interact",
              title: "潜水艇：注水下潜，排水上浮",
              exploreTip: "拖 G（注水变重 / 排水变轻）：G>F浮 下沉，G<F浮 上浮。浮力动了吗？",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 45, size: 16, label: "潜水艇" },
                    forces: [
                      { id: "g",  kind: "gravity", label: "G",   angleDeg: 270, mag: 8, min: 6, max: 14 },
                      { id: "fb", kind: "custom",  label: "F浮", angleDeg: 90,  mag: 10, fixed: true }
                    ],
                    showResultant: true, surface: "horizontal", unit: "N",
                    badge: { invariant: "没变的是：潜水艇体积（→浮力不变）" }
                  }
                }
              ],
              point: "体积不变，浮力就不变——潜水艇玩的是“变重 / 变轻”，不是“变浮力”。"
            },
            {
              id: "p06.2.3-p2",
              kind: "explain",
              title: "浮沉条件",
              blocks: [
                { type: "lead", text: "上浮、下沉、悬浮、漂浮——四个状态，一把尺子：F浮 vs G。" },
                { type: "text", html: "F浮>G：上浮（最后漂浮，F浮=G）；F浮<G：下沉；F浮=G：悬浮（水中任意位置）或漂浮（水面）。也可以比密度：ρ物<ρ液 上浮，ρ物>ρ液 下沉，ρ物=ρ液 悬浮。" },
                { type: "text", html: "轮船：空心的——平均密度小于水，就浮了。密度计：漂浮，F浮=G，刻度“上小下大”。" },
                { type: "trap", text: "⚠️ 别搞混：“空心铁球一定浮”——错！看平均密度和液体密度比；“潜水艇靠改变浮力上浮”——错，靠改变自身重力。" }
              ],
              point: "浮沉看两把尺子：比力（F浮 vs G），或比密度（ρ物 vs ρ液）。"
            },
            {
              id: "p06.2.3-p3",
              kind: "explain",
              title: "应用辨析",
              blocks: [
                { type: "lead", text: "轮船、潜水艇、密度计、热气球——浮沉条件的“全家桶”。" },
                { type: "text", html: "轮船：空心增大 V排，F浮=ρ液gV排 变大——钢铁也能浮。潜水艇：体积不变，F浮 不变，注水变重下潜、排水变轻上浮。" },
                { type: "text", html: "密度计：刻度上小下大——液体密度越大，V排 越小，露出越多。热气球：加热空气，ρ空气 变小，F浮>G 就升空。" },
                { type: "mathlink", text: "数学呼应：代数 ch01 方程（奠基）——漂浮 F浮=G、悬浮 F浮=G，都是受力平衡列方程。" },
                { type: "slogan", text: "比力，比密度，都行。" }
              ],
              point: "应用题万变不离其宗：先画受力图，再选 F浮=G 还是 F浮=ρ液gV排。"
            }
          ]
        },
        {
          id: "p06.2.0",
          title: "本章小结与习题",
          prereq: "p06 全章",
          time: "40–60 分钟",
          formulas: {
            press: {
              mathml: '<math><mi>p</mi><mo>=</mo><mfrac><mi>F</mi><mi>S</mi></mfrac></math>',
              translation: "压强 = 压力 ÷ 受力面积"
            },
            liq: {
              mathml: '<math><mi>p</mi><mo>=</mo><mi>&#961;</mi><mi>g</mi><mi>h</mi></math>',
              translation: "液体压强 = 液体密度 × g × 深度"
            },
            stdatm: {
              mathml: '<math><mn>1</mn><mspace width="0.2em"/><mi mathvariant="normal">标准大气压</mi><mo>=</mo><mn>1.01</mn><mo>×</mo><msup><mn>10</mn><mn>5</mn></msup><mspace width="0.2em"/><mi mathvariant="normal">Pa</mi></math>',
              translation: "1 标准大气压 = 1.01×10⁵ Pa"
            },
            arch: {
              mathml: '<math><msub><mi>F</mi><mi>浮</mi></msub><mo>=</mo><msub><mi>G</mi><mi>排</mi></msub><mo>=</mo><msub><mi>&#961;</mi><mi>液</mi></msub><mi>g</mi><msub><mi>V</mi><mi>排</mi></msub></math>',
              translation: "浮力 = 排开液体的重力 = 液体密度 × g × 排开体积"
            }
          },
          pages: [
            {
              id: "p06.2.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "① <b>压强</b> <span class=\"phy-f\" data-f=\"press\"></span>：压力垂直于接触面（≠重力）。② <b>液体压强</b> <span class=\"phy-f\" data-f=\"liq\"></span>：h 是深度；只与 ρ、h 有关。③ <b>标准大气压</b> <span class=\"phy-f\" data-f=\"stdatm\"></span>（定义值）；真实气压随高度天气变；气压低沸点低。④ <b>流体</b>：流速大压强小（限同一流体、同一水平高度附近）。⑤ <b>浮力</b>：方向竖直向上；称重法 F浮=G−F′。⑥ <b>阿基米德</b> <span class=\"phy-f\" data-f=\"arch\"></span>（V排=V物 限浸没）。⑦ <b>浮沉</b>：比力（F浮 vs G）或比密度；潜水艇靠改变自身重力。"
                }
              ],
              point: "七句话收束本章：p07 功、功率、机械能——力要开始“做功”了。"
            },
            {
              id: "p06.2.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "菜刀磨得很锋利，主要是为了——",
                  options: ["增大压力", "减小受力面积，增大压强", "减小压强"],
                  answer: 1,
                  tip: "压力没变，面积小了——p=F/S，压强翻倍。"
                },
                {
                  type: "fill",
                  stemBefore: "液体压强公式 p=ρgh 中，h 指的是",
                  stemAfter: "（填“深度”或“高度”）",
                  answer: "深度",
                  accept: [],
                  hint: "（从液面往下量）",
                  tip: "h 从液面往下量——深度不是高度，这是本课第一坑。"
                },
                {
                  type: "choice",
                  stem: "高山上烧水不到 100℃ 就开了，说明——",
                  options: ["高山上大气压小，沸点低", "水变了", "温度计坏了"],
                  answer: 0,
                  tip: "气压越低，沸点越低——高压锅反向利用了这一点。"
                },
                {
                  type: "choice",
                  stem: "潜水艇上浮，靠的是——",
                  options: ["增大浮力", "排水减小自身重力", "增大体积"],
                  answer: 1,
                  tip: "体积不变→浮力不变：玩的是“变重 / 变轻”，不是“变浮力”。"
                },
                {
                  type: "fill",
                  stemBefore: "1 标准大气压 =",
                  stemAfter: "Pa",
                  answer: "1.01×10⁵",
                  accept: ["1.01×10^5", "101000", "1.01e5"],
                  hint: "（1.01 乘以 10 的 5 次方）",
                  tip: "数量级锚点：10⁵ Pa。"
                },
                {
                  type: "choice",
                  stem: "漂浮的木块，V排与 V物 的关系是——",
                  options: ["V排=V物", "V排<V物", "V排>V物"],
                  answer: 1,
                  tip: "V排=V物 限浸没：漂浮只有一部分在水下。"
                }
              ],
              point: "错两道以上的，回 p06.2.2 重走“双线程检查清单”。"
            }
          ]
        }
      ]
    }
  ]
};
