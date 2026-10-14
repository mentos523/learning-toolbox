/* ============================================================
 * 学习工具箱 · 数学 · 几何 g07：圆（一）——圆的基本性质
 *
 * 黄队（教育教学专家）生产：1 单元 / 6 课 / 17 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g07 章）
 * 教学设计：docs/math-geometry-pedagogy.md（§4.2 proof-replay 清单第 8 项：圆周角定理三种情形；
 *           例子库：赵州桥/测圆木/看球赛/披萨）
 * 参数手册：docs/math-geometry-params.md v1.2
 * 白队一屏预算评审：/tmp/white_geom_budget_g05_g07.md（g07 18→17 页，逐课页清单照此执行）
 *
 * 页构成：
 *   g07.1.1 圆的基本概念      3 页  P1 step-play（圆规轨迹追踪画圆）
 *                                   P2 讲解（圆心/半径/弦/直径/弧/半圆定义组）
 *                                   P3 讲解（圆 vs 圆面 compare-toggle + 同圆半径相等/直径最大弦）
 *   g07.1.2 垂径定理          3 页  P1 step-play（直径为轴对折）
 *                                   P2 proof-replay（4 步：连半径→等腰→三线合一→平分弧）
 *                                   P3 讲解（赵州桥/测圆木 + 逆命题易错点）
 *   g07.1.3 弧、弦、圆心角    2 页  P1 step-play（圆心角旋转，弧弦联动）
 *                                   P2 讲解（等弧⇔等弦⇔等圆心角 compare-toggle）
 *   g07.1.4 圆周角定理        5 页  P1 compare-toggle（定义前置 + 强制反例图）
 *                                   P2/P3/P4 proof-replay（三种情形各 4 步，P3/P4 化归情形一）
 *                                   P5 讲解（定理总述 + 分类讨论点拨）
 *   g07.1.5 直径推论          2 页  P1 vertex-drag（拖顶点 P，∠APB 恒 90°）
 *                                   P2 讲解（推论 + 逆命题互逆对照）
 *   g07.1.6 本章小结与习题    2 页  P1 小结 P2 习题（tap-highlight 认圆周角 + 6 道题）
 *
 * 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 / corrA·corrB·corrC=对应组 /
 *   corrAngle=对应角 / line=普通线 / aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
 * 公式走 LaTeX（构建器子集），交互参数里不出现裸文本公式。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g07"] = {
  id: "g07",
  title: "圆（一）——圆的基本性质",
  units: [
    {
      id: "g07-u1",
      title: "圆的对称性与角",
      lessons: [
        /* ============ g07.1.1 圆的基本概念（3 页） ============ */
        {
          id: "g07-u1-l1",
          title: "圆的基本概念",
          pages: [
            {
              id: "g07-u1-l1-p1",
              title: "圆规画圆：轨迹就是圆",
              concept: "圆的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{圆上每一点到圆心}O\\text{的距离} = r",
                  translation: "圆：到定点 O 距离等于定长 r 的点的轨迹"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：定一个点 O——圆心。",
                      shapes: [
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 5 },
                        { t: "txt", p: [50,40], text: "圆心 O", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：圆规张开 r——针脚到笔尖的距离固定。",
                      shapes: [
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 5 },
                        { t: "seg", a: [50,52], b: [80,52], color: "target", width: 3.5, ticks: 1 },
                        { t: "pt", p: [80,52], color: "target", r: 4 },
                        { t: "txt", p: [65,61], text: "半径 r", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：圆规转一圈——笔尖留下的轨迹就是圆。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "known", width: 3.5 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 5 },
                        { t: "seg", a: [50,52], b: [80,52], color: "target", width: 2.5 },
                        { t: "pt", p: [80,52], color: "target", r: 4 }
                      ]
                    },
                    {
                      caption: "第 4 步：轨迹上每一点到 O 的距离都是 r——三条半径刻度相同。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 5 },
                        { t: "seg", a: [50,52], b: [80,52], color: "corrA", width: 2.5, ticks: 1 },
                        { t: "seg", a: [50,52], b: [35,78], color: "corrA", width: 2.5, ticks: 1 },
                        { t: "seg", a: [50,52], b: [50,22], color: "corrA", width: 2.5, ticks: 1 },
                        { t: "txt", p: [50,90], text: "都等于 r", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 3 步：圆规转一圈，笔尖走过的轨迹——闭合、首尾相接，这就是圆。",
                "注意第 4 步：三条半径都画了 1 道刻度——它们长度都相等。",
                "记住：圆不是“圆盘”，是那条“线”（下一页讲圆 vs 圆面）。"
              ],
              examples: [
                { text: "圆规画圆：针脚是圆心，两脚张开的距离是半径", figure: "实物" }
              ],
              prev: null,
              next: "g07-u1-l1-p2"
            },
            {
              id: "g07-u1-l1-p2",
              title: "圆的“全家福”：六个名字",
              pageKind: "explain",
              concept: "圆心、半径、弦、直径、弧、半圆",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{直径} = 2\\text{半径}",
                  translation: "直径是半径的两倍：d = 2r"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格 1：圆心、半径、弦、直径。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,52], b: [65,78], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [22.5,64], b: [77.5,64], color: "corrB", width: 3 },
                        { t: "seg", a: [50,82], b: [50,22], color: "corrC", width: 3, ticks: 2 },
                        { t: "txt", p: [13,64], text: "A", size: 13 },
                        { t: "txt", p: [82,64], text: "B", size: 13 },
                        { t: "txt", p: [44,14], text: "C", size: 13 },
                        { t: "txt", p: [56,90], text: "D", size: 13 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 5 },
                        { t: "txt", p: [62,72], text: "半径", size: 13, color: "corrA" },
                        { t: "txt", p: [50,72], text: "弦", size: 13, color: "corrB" },
                        { t: "txt", p: [58,40], text: "直径", size: 13, color: "corrC" },
                        { t: "txt", p: [50,36], text: "圆心 O", size: 13 }
                      ]
                    },
                    {
                      caption: "定格 2：弧、半圆——圆上两点之间的一段。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "arc", v: [50,52], a1: 23.6, a2: 90, r: 35, color: "target", width: 4.5 },
                        { t: "arc", v: [50,52], a1: 90, a2: 270, r: 35, color: "corrA", width: 3, dash: "6,4" },
                        { t: "pt", p: [77.5,64], label: "B", color: "known", r: 4 },
                        { t: "pt", p: [50,82], label: "C", color: "known", r: 4 },
                        { t: "txt", p: [74,82], text: "劣弧", size: 13, bold: true, color: "target" },
                        { t: "txt", p: [11,52], text: "半圆", size: 13, color: "corrA" },
                        { t: "txt", p: [50,13], text: "弧：圆上两点之间的一段", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得上一页的圆规吗？针脚扎的点叫圆心 O，针脚到笔尖的距离叫半径 r。",
                "人话定义组：圆心（O）→半径（r）→弦（圆上两点的连线）→直径（过圆心的弦）→弧（圆上两点间的一段）→半圆（一半的弧）。",
                "生活例：自行车轮——轴是圆心，辐条是半径，轮胎是圆。",
                "图形例：看定格图——弦 AB 不过圆心；直径 CD 过圆心，是最长的弦。",
                "反例（下页细讲）：圆 ≠ 圆面——圆是“圈”，圆面是“饼”。",
                "⚠️ 别搞混：半径相等 ⇔ 同圆或等圆；直径是最大的弦（为什么？第 6 课考你）。",
                "记住一句话：圆上所有点到圆心距离相等——这是圆的“身份证”。"
              ],
              examples: [
                { text: "车轮：轴心 O、辐条 r、外胎就是圆", figure: "实物" }
              ],
              prev: "g07-u1-l1-p1",
              next: "g07-u1-l1-p3"
            },
            {
              id: "g07-u1-l1-p3",
              title: "圆 vs 圆面：圈和饼",
              pageKind: "explain",
              concept: "圆与圆面",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{圆} \\neq \\text{圆面}",
                  translation: "圆是那条圈，圆面是圈加里面的饼"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "圆",
                      caption: "圆：只有一条“圈”——数学里说的圆，指的就是这条线。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "known", width: 4 },
                        { t: "txt", p: [50,90], text: "只有圈", size: 15, bold: true, color: "known" }
                      ]
                    },
                    {
                      label: "圆面",
                      caption: "圆面：圈 + 里面涂满——像一张饼，算面积时才用它。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "known", width: 4, fill: "known", opacity: 0.3 },
                        { t: "txt", p: [50,90], text: "圈 + 里面的饼", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“圆”：只有一条圈——数学里“圆”指的就是这条线。",
                "点“圆面”：圈 + 里面涂满——这是“饼”，叫圆面（以后算面积才用）。",
                "生活例：呼啦圈是圆，烧饼是圆面；铁环滚的是圆，车轮压的是圆面。",
                "结论 1：同一个圆（或相等的圆）里，所有半径都相等——圆规张开的角度没变。",
                "结论 2：直径是圆里最长的弦——任何弦都不超过 2r（g05 勾股定理能证）。",
                "记住一句话：说“圆”时想“圈”，说“圆面”时想“饼”。"
              ],
              examples: [
                { text: "呼啦圈 vs 烧饼：一个是圈，一个是饼", figure: "实物" }
              ],
              prev: "g07-u1-l1-p2",
              next: "g07-u1-l2-p1"
            }
          ]
        },
        /* ============ g07.1.2 垂径定理（3 页） ============ */
        {
          id: "g07-u1-l2",
          title: "垂径定理",
          pages: [
            {
              id: "g07-u1-l2-p1",
              title: "对折：直径是折痕",
              concept: "垂径定理直观",
              formulas: [
                {
                  id: "f1",
                  latex: "CD \\perp AB \\Rightarrow AE = EB",
                  translation: "直径 CD 垂直于弦 AB，就平分这条弦"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：弦 AB，直径 CD 垂直于 AB，交于 E。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [22.5,64], b: [77.5,64], color: "line", width: 3.5 },
                        { t: "seg", a: [50,82], b: [50,22], color: "known", width: 2.5 },
                        { t: "right", v: [50,64], p: [50,82], q: [77.5,64], size: 6 },
                        { t: "txt", p: [16,64], text: "A", size: 13 },
                        { t: "txt", p: [84,64], text: "B", size: 13 },
                        { t: "txt", p: [50,89], text: "C", size: 13 },
                        { t: "txt", p: [50,15], text: "D", size: 13 },
                        { t: "txt", p: [58,64], text: "E", size: 13 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 }
                      ]
                    },
                    {
                      caption: "第 2 步：沿直径 CD 对折——右半边翻过去。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2, dash: "6,4" },
                        { t: "seg", a: [50,82], b: [50,22], color: "target", width: 3.5 },
                        { t: "seg", a: [22.5,64], b: [50,64], color: "known", width: 3.5 },
                        { t: "seg", a: [50,64], b: [77.5,64], color: "aux", width: 2.5, dash: "5,4" },
                        { t: "txt", p: [50,40], text: "沿 CD 对折 →", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：对折后，AE 与 EB 完全重合——弦被平分了。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "seg", a: [50,82], b: [50,22], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [22.5,64], b: [50,64], color: "corrA", width: 3.5, ticks: 1 },
                        { t: "seg", a: [50,64], b: [77.5,64], color: "corrA", width: 3.5, ticks: 1 },
                        { t: "arc", v: [50,52], a1: 90, a2: 156.4, r: 35, color: "corrA", width: 3 },
                        { t: "arc", v: [50,52], a1: 23.6, a2: 90, r: 35, color: "corrA", width: 3 },
                        { t: "txt", p: [50,74], text: "AE = EB", size: 15, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 2 步：把圆沿着直径 CD 对折——这是 g04 对折的老朋友。",
                "第 3 步定格：AE 和 EB 严丝合缝——直径垂直于弦，就平分它。",
                "记住一句话：垂直直径一出手，弦和弧都对半分。"
              ],
              examples: [
                { text: "折纸：圆纸片对折，折痕就是直径", figure: "实物" }
              ],
              prev: "g07-u1-l1-p3",
              next: "g07-u1-l2-p2"
            },
            {
              id: "g07-u1-l2-p2",
              title: "慢放证明：垂径定理",
              concept: "垂径定理证明",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{垂直于弦的直径} \\Rightarrow \\text{平分弦、平分弧}",
                  translation: "垂直于弦的直径，平分这条弦，也平分弦所对的弧"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "直径 CD ⊥ 弦 AB，交于 E",
                  goal: "AE = EB；弧 AC = 弧 BC，弧 AD = 弧 BD",
                  steps: [
                    {
                      card: "连 OA、OB——两条半径登场。",
                      reason: "作图：连半径；OA = OB（同圆半径相等）",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [22.5,64], b: [77.5,64], color: "line", width: 3 },
                        { t: "seg", a: [50,82], b: [50,22], color: "known", width: 2.5 },
                        { t: "seg", a: [50,52], b: [22.5,64], color: "target", width: 3.5, ticks: 1 },
                        { t: "seg", a: [50,52], b: [77.5,64], color: "target", width: 3.5, ticks: 1 },
                        { t: "txt", p: [16,64], text: "A", size: 13 },
                        { t: "txt", p: [84,64], text: "B", size: 13 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 }
                      ]
                    },
                    {
                      card: "OA = OB，△OAB 是等腰三角形。",
                      reason: "等腰三角形定义：有两边相等的三角形",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "poly", pts: [[50,52],[22.5,64],[77.5,64]], color: "target", width: 3 },
                        { t: "seg", a: [50,52], b: [22.5,64], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [50,52], b: [77.5,64], color: "target", width: 3, ticks: 1 },
                        { t: "txt", p: [50,44], text: "等腰", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      card: "OE ⊥ AB——底边上的高，平分底边。",
                      reason: "等腰三角形三线合一（g04.1.5 P4）",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "poly", pts: [[50,52],[22.5,64],[77.5,64]], color: "line", width: 2.5 },
                        { t: "seg", a: [50,52], b: [50,64], color: "target", width: 3.5 },
                        { t: "right", v: [50,64], p: [50,52], q: [77.5,64], size: 6 },
                        { t: "seg", a: [22.5,64], b: [50,64], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [50,64], b: [77.5,64], color: "corrA", width: 3, ticks: 1 },
                        { t: "txt", p: [50,74], text: "AE = EB", size: 14, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      card: "沿 CD 对折：弧 AC 与弧 BC 重合，弧 AD 与弧 BD 也重合。",
                      reason: "圆的轴对称性：直径 CD 是对称轴（本课 P1）",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,82], b: [50,22], color: "aux", width: 2, dash: "5,4" },
                        { t: "arc", v: [50,52], a1: 90, a2: 156.4, r: 35, color: "corrA", width: 4 },
                        { t: "arc", v: [50,52], a1: 23.6, a2: 90, r: 35, color: "corrA", width: 4 },
                        { t: "txt", p: [50,90], text: "弧 AC = 弧 BC", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "连半径 OA、OB", reason: "作图；同圆半径相等" },
                    { statement: "△OAB 是等腰三角形", reason: "等腰三角形定义" },
                    { statement: "OE ⊥ AB → AE = EB", reason: "等腰三角形三线合一" },
                    { statement: "弧 AC = 弧 BC，弧 AD = 弧 BD", reason: "圆的轴对称性（直径是折痕）" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三问：已知？求证？第一步连 OA、OB 凭什么？（连半径是作图，不用理由）",
                "关键动作：第 3 步把“垂直”翻译成等腰三角形的“三线合一”——老定理是新证明的砖。"
              ],
              examples: [
                { text: "三线合一回来了：等腰三角形底边上的高平分底边", figure: "回链" }
              ],
              prev: "g07-u1-l2-p1",
              next: "g07-u1-l2-p3"
            },
            {
              id: "g07-u1-l2-p3",
              title: "垂径定理：赵州桥",
              pageKind: "explain",
              concept: "垂径定理应用",
              formulas: [
                {
                  id: "f1",
                  latex: "r^2 = (\\frac{L}{2})^2 + (r-h)^2",
                  translation: "设半径为 r：r² = (L/2)² + (r−h)²，解出 r"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "赵州桥：拱是圆弧，跨度是弦——知道跨度 L 和拱高 h，设半径为 r，用勾股定理列方程算 r。",
                      shapes: [
                        { t: "arc", v: [50,10], a1: 35, a2: 145, r: 50, color: "known", width: 4 },
                        { t: "seg", a: [9,38.7], b: [91,38.7], color: "line", width: 3 },
                        { t: "seg", a: [50,38.7], b: [50,60], color: "target", width: 3.5, ticks: 1 },
                        { t: "txt", p: [50,31], text: "跨度 L", size: 13 },
                        { t: "txt", p: [60,50], text: "拱高 h", size: 13, color: "target" },
                        { t: "txt", p: [50,72], text: "拱 = 圆上的一段弧", size: 13 }
                      ]
                    },
                    {
                      caption: "测圆木：卡尺卡住圆木，读出弦长和拱高——同一招算出直径。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [22.5,64], b: [77.5,64], color: "corrB", width: 3.5 },
                        { t: "seg", a: [50,64], b: [50,82], color: "target", width: 3.5, ticks: 1 },
                        { t: "txt", p: [50,72], text: "弦长", size: 13, color: "corrB" },
                        { t: "txt", p: [60,74], text: "拱高", size: 13, color: "target" },
                        { t: "txt", p: [50,14], text: "卡尺量出弦长和拱高 → 算出直径", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "定理（人话）：直径垂直于弦 → 弦被平分，弦所对的两条弧也被平分。",
                "生活例·赵州桥：石拱的跨度是弦，拱高从弦中点量到拱顶——知道跨度和拱高，设半径为 r，用勾股定理列方程就能算出 r。",
                "生活例·测圆木：卡尺卡住圆木，读出弦长和拱高——同一招算出直径。",
                "⚠️ 易错：“平分弦的直径垂直于弦”反过来说不对——两条直径互相平分，但不一定垂直。",
                "记住一句话：垂直→平分（弦和弧）；平分→不一定垂直。"
              ],
              examples: [
                { text: "赵州桥：跨度 37m、拱高 7.2m，算拱所在圆的半径", figure: "实物" }
              ],
              prev: "g07-u1-l2-p2",
              next: "g07-u1-l3-p1"
            }
          ]
        },
        /* ============ g07.1.3 弧、弦、圆心角（2 页） ============ */
        {
          id: "g07-u1-l3",
          title: "弧、弦、圆心角",
          pages: [
            {
              id: "g07-u1-l3-p1",
              title: "转一转：弧弦跟着角走",
              concept: "圆心角与弧弦联动",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{圆心角变} \\Rightarrow \\text{弧、弦跟着变}",
                  translation: "圆心角一变，它所对的弧和弦跟着变"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：圆心角 ∠AOB = 30°——弧 AB、弦 AB 跟着定下来。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,52], b: [50,82], color: "known", width: 3 },
                        { t: "seg", a: [50,52], b: [65,78], color: "known", width: 3 },
                        { t: "arc", v: [50,52], a1: 60, a2: 90, r: 35, color: "target", width: 4.5 },
                        { t: "seg", a: [50,82], b: [65,78], color: "corrA", width: 3 },
                        { t: "arc", v: [50,52], a1: 60, a2: 90, r: 12, group: 1, color: "corrAngle" },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [58,75], text: "30°", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：圆心角转到 60°——弧变长、弦变长，半径没变。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,52], b: [50,82], color: "known", width: 3 },
                        { t: "seg", a: [50,52], b: [76,67], color: "known", width: 3 },
                        { t: "arc", v: [50,52], a1: 30, a2: 90, r: 35, color: "target", width: 4.5 },
                        { t: "seg", a: [50,82], b: [76,67], color: "corrA", width: 3 },
                        { t: "arc", v: [50,52], a1: 30, a2: 90, r: 12, group: 1, color: "corrAngle" },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [62,72], text: "60°", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：圆心角转到 90°——转多少度，弧和弦跟多少。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,52], b: [50,82], color: "known", width: 3 },
                        { t: "seg", a: [50,52], b: [80,52], color: "known", width: 3 },
                        { t: "arc", v: [50,52], a1: 0, a2: 90, r: 35, color: "target", width: 4.5 },
                        { t: "seg", a: [50,82], b: [80,52], color: "corrA", width: 3 },
                        { t: "right", v: [50,52], p: [50,82], q: [80,52], size: 6 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [64,70], text: "90°", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一帧一转：圆心角 30°→60°→90°，弧 AB 越来越长，弦 AB 越来越长。",
                "不变量徽章：半径 r 纹丝不动——转的是角，半径没变。",
                "记住一句话：圆心角是“遥控器”，弧和弦都听它的。"
              ],
              examples: [
                { text: "钟表：分针走 15 分钟，扫过 90° 圆心角", figure: "实物" }
              ],
              prev: "g07-u1-l2-p3",
              next: "g07-u1-l3-p2"
            },
            {
              id: "g07-u1-l3-p2",
              title: "等弧、等弦、等角：一荣俱荣",
              pageKind: "explain",
              concept: "弧弦圆心角关系",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{等弧} \\Rightarrow \\text{等弦}",
                  translation: "在同圆中，相等的弧所对的弦相等"
                },
                {
                  id: "f2",
                  latex: "\\text{等弦} \\Rightarrow \\text{等圆心角}",
                  translation: "在同圆中，相等的弦所对的圆心角相等"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "等弧 → 等弦",
                      caption: "弧 AB = 弧 CD（一样长）→ 弦 AB = 弦 CD：把扇形转过去，完全重合。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "arc", v: [50,52], a1: 100, a2: 140, r: 35, color: "target", width: 4.5 },
                        { t: "arc", v: [50,52], a1: 220, a2: 260, r: 35, color: "target", width: 4.5 },
                        { t: "seg", a: [44.8,81.5], b: [27,71.3], color: "corrA", width: 3.5, ticks: 2 },
                        { t: "seg", a: [27,32.7], b: [44.8,22.5], color: "corrA", width: 3.5, ticks: 2 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,13], text: "弧相等 → 弦相等", size: 14, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      label: "等弦 → 等圆心角",
                      caption: "弦 AB = 弦 CD → ∠AOB = ∠COD：弦定了，圆心角就定了。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [44.8,81.5], b: [27,71.3], color: "corrA", width: 3.5, ticks: 2 },
                        { t: "seg", a: [27,32.7], b: [44.8,22.5], color: "corrA", width: 3.5, ticks: 2 },
                        { t: "seg", a: [50,52], b: [44.8,81.5], color: "known", width: 2.5 },
                        { t: "seg", a: [50,52], b: [27,71.3], color: "known", width: 2.5 },
                        { t: "seg", a: [50,52], b: [27,32.7], color: "known", width: 2.5 },
                        { t: "seg", a: [50,52], b: [44.8,22.5], color: "known", width: 2.5 },
                        { t: "arc", v: [50,52], a1: 100, a2: 140, r: 12, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,52], a1: 220, a2: 260, r: 12, group: 1, color: "corrAngle" },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,13], text: "弦相等 → 圆心角相等", size: 14, bold: true, color: "corrAngle" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话：弧相等 → 弦相等；弦相等 → 圆心角相等——三者互相锁定。",
                "为什么？把扇形 AOB 旋转到扇形 COD：弧重合 → 弦重合 → 角重合（旋转不变性）。",
                "生活例：披萨切两刀——夹角相等，两块扇形一模一样。",
                "⚠️ 前提：同一个圆（或等圆）里——不同大小的圆不能比。",
                "记住一句话：同圆里，弧、弦、圆心角“一荣俱荣”。"
              ],
              examples: [
                { text: "披萨：扇形是圆心角的地盘，弦是“一刀切”的切口", figure: "实物" }
              ],
              prev: "g07-u1-l3-p1",
              next: "g07-u1-l4-p1"
            }
          ]
        },
        /* ============ g07.1.4 圆周角定理（5 页，分类讨论首秀） ============ */
        {
          id: "g07-u1-l4",
          title: "圆周角定理",
          pages: [
            {
              id: "g07-u1-l4-p1",
              title: "先认清：什么才是圆周角",
              concept: "圆周角定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{圆周角} = \\text{顶点在圆上} + \\text{两边交圆}",
                  translation: "圆周角：顶点在圆上，两边都与圆相交"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "是圆周角",
                      caption: "顶点 P 在圆上，两边 PA、PB 都交圆于另一点——两个条件缺一不可。对照圆心角：顶点在圆心 O，顶点位置不同，名字就不同。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,22], b: [24,67], color: "known", width: 3.5 },
                        { t: "seg", a: [50,22], b: [76,67], color: "known", width: 3.5 },
                        { t: "arc", v: [50,22], a1: 60, a2: 120, r: 10, group: 1, color: "corrAngle" },
                        { t: "pt", p: [50,22], label: "P", color: "known", r: 5 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,90], text: "顶点在圆上，两边交圆 ✓", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      label: "不是圆周角",
                      caption: "顶点掉进圆里、在圆外面、一边是切线没交到圆——都不是圆周角。",
                      shapes: [
                        { t: "circle", c: [20,60], r: 14, color: "line", width: 2.5 },
                        { t: "seg", a: [20,60], b: [13,72.1], color: "aux", width: 2.5 },
                        { t: "seg", a: [20,60], b: [27,72.1], color: "aux", width: 2.5 },
                        { t: "txt", p: [20,82], text: "❌", size: 14, color: "target" },
                        { t: "txt", p: [20,40], text: "顶点在圆内", size: 11 },
                        { t: "circle", c: [50,60], r: 14, color: "line", width: 2.5 },
                        { t: "seg", a: [50,84], b: [43,72.1], color: "aux", width: 2.5 },
                        { t: "seg", a: [50,84], b: [57,72.1], color: "aux", width: 2.5 },
                        { t: "txt", p: [50,92], text: "❌", size: 14, color: "target" },
                        { t: "txt", p: [50,40], text: "顶点在圆外", size: 11 },
                        { t: "circle", c: [80,60], r: 14, color: "line", width: 2.5 },
                        { t: "seg", a: [80,46], b: [73,72.1], color: "aux", width: 2.5 },
                        { t: "seg", a: [80,46], b: [94,46], color: "aux", width: 2.5 },
                        { t: "txt", p: [80,82], text: "❌", size: 14, color: "target" },
                        { t: "txt", p: [80,40], text: "一边没交圆", size: 11 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“是圆周角”：顶点 P 长在圆上，两边 PA、PB 都交圆——两个条件缺一不可。",
                "点“不是圆周角”：顶点在圆内、在圆外、一边没交圆——统统出局。",
                "对照圆心角：顶点在圆心 O 的叫圆心角；顶点搬到圆上，才叫圆周角。",
                "⚠️ 易错：顶点在圆上、一边是切线——切线只交于 P，不算“交圆”，不是圆周角。"
              ],
              examples: [
                { text: "看球赛：球门是弦，最佳观赛点在圆上（视角定理生活版）", figure: "实物" }
              ],
              prev: "g07-u1-l3-p2",
              next: "g07-u1-l4-p2"
            },
            {
              id: "g07-u1-l4-p2",
              title: "慢放证明：情形一",
              concept: "圆周角定理情形一",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle APB = \\frac{1}{2} \\angle AOB",
                  translation: "圆周角等于它所对圆心角的一半"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "∠APB 是圆周角，圆心 O 在边 PA 上",
                  goal: "∠APB = ½∠AOB",
                  steps: [
                    {
                      card: "连 OB——造出 △OPB。",
                      reason: "作图：连半径 OB",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [20,52], b: [80,52], color: "line", width: 3 },
                        { t: "seg", a: [20,52], b: [50,82], color: "known", width: 3 },
                        { t: "seg", a: [50,52], b: [50,82], color: "target", width: 3.5 },
                        { t: "arc", v: [20,52], a1: 0, a2: 45, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [13,52], text: "P", size: 13 },
                        { t: "txt", p: [87,52], text: "A", size: 13 },
                        { t: "txt", p: [50,89], text: "B", size: 13 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 }
                      ]
                    },
                    {
                      card: "OP = OB——△OPB 是等腰三角形，得 ∠OPB = ∠OBP。",
                      reason: "同圆半径相等；等边对等角（g04.1.5）",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "poly", pts: [[50,52],[20,52],[50,82]], color: "target", width: 3 },
                        { t: "seg", a: [50,52], b: [20,52], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [50,52], b: [50,82], color: "target", width: 3, ticks: 1 },
                        { t: "arc", v: [20,52], a1: 0, a2: 45, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,82], a1: 225, a2: 270, r: 9, group: 1, color: "corrAngle" },
                        { t: "txt", p: [35,62], text: "OP = OB", size: 13, color: "target" }
                      ]
                    },
                    {
                      card: "∠AOB 是 △OPB 在 O 处的外角——∠AOB = ∠OPB + ∠OBP。",
                      reason: "三角形外角定理（g03.1.3）：外角等于不相邻两内角和",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "poly", pts: [[50,52],[20,52],[50,82]], color: "line", width: 2.5 },
                        { t: "seg", a: [50,52], b: [80,52], color: "aux", width: 2, dash: "5,4" },
                        { t: "arc", v: [50,52], a1: 0, a2: 90, r: 14, color: "target", width: 3 },
                        { t: "txt", p: [67,68], text: "外角", size: 13, bold: true, color: "target" },
                        { t: "txt", p: [13,52], text: "P", size: 13 },
                        { t: "txt", p: [87,52], text: "A", size: 13 }
                      ]
                    },
                    {
                      card: "∠OPB 就是 ∠APB——O 在 PA 上，所以 ∠APB = ½∠AOB。",
                      reason: "等量代换：∠AOB = 2∠OPB = 2∠APB",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [20,52], b: [80,52], color: "line", width: 3 },
                        { t: "seg", a: [20,52], b: [50,82], color: "known", width: 3 },
                        { t: "seg", a: [50,52], b: [50,82], color: "known", width: 2.5 },
                        { t: "arc", v: [20,52], a1: 0, a2: 45, r: 10, group: 1, color: "target" },
                        { t: "arc", v: [50,52], a1: 0, a2: 90, r: 12, group: 2, color: "target" },
                        { t: "txt", p: [50,93], text: "∠APB = ½∠AOB", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "连半径 OB", reason: "作图" },
                    { statement: "OP = OB → ∠OPB = ∠OBP", reason: "同圆半径相等；等边对等角" },
                    { statement: "∠AOB = ∠OPB + ∠OBP", reason: "三角形外角定理（△OPB 在 O 处的外角）" },
                    { statement: "∠APB = ∠OPB = ½∠AOB", reason: "等量代换（O 在 PA 上，∠OPB 就是 ∠APB）" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三问：已知？求证？第一步连 OB 凭什么？（连半径是作图，不用理由）",
                "关键动作：第 3 步把圆心角“翻译”成三角形的外角——外角定理是桥梁。"
              ],
              examples: [
                { text: "外角定理回来了：g03 的老朋友来搭桥", figure: "回链" }
              ],
              prev: "g07-u1-l4-p1",
              next: "g07-u1-l4-p3"
            },
            {
              id: "g07-u1-l4-p3",
              title: "慢放证明：情形二",
              concept: "圆周角定理情形二",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle APB = \\frac{1}{2} \\angle AOB",
                  translation: "圆周角等于它所对圆心角的一半"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "∠APB 是圆周角，圆心 O 在 ∠APB 内",
                  goal: "∠APB = ½∠AOB",
                  steps: [
                    {
                      card: "过 P 作直径 PQ——把大角切成两个小角。",
                      reason: "直径定义：过圆心的弦；Q 是 PQ 与圆的另一交点",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,22], b: [35,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [65,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [50,82], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [43,22], text: "P", size: 13 },
                        { t: "txt", p: [57,82], text: "Q", size: 13 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 }
                      ]
                    },
                    {
                      card: "看 ∠APQ：圆心 O 在它的一边 PQ 上——情形一！",
                      reason: "化归依据：情形一已证（本课 P2）；O 在 PQ 上",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "seg", a: [50,22], b: [35,78], color: "target", width: 3.5 },
                        { t: "seg", a: [50,22], b: [50,82], color: "target", width: 3.5 },
                        { t: "seg", a: [50,22], b: [65,78], color: "line", width: 2 },
                        { t: "arc", v: [50,22], a1: 90, a2: 105, r: 10, color: "target", width: 3 },
                        { t: "arc", v: [50,52], a1: 90, a2: 120, r: 12, color: "target", width: 3 },
                        { t: "txt", p: [26,52], text: "O 在 PQ 上", size: 13, color: "target" }
                      ]
                    },
                    {
                      card: "同理 ∠BPQ = ½∠BOQ——另一半也是情形一。",
                      reason: "化归依据：同上（本课 P2）",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "seg", a: [50,22], b: [65,78], color: "target", width: 3.5 },
                        { t: "seg", a: [50,22], b: [50,82], color: "target", width: 3.5 },
                        { t: "seg", a: [50,22], b: [35,78], color: "line", width: 2 },
                        { t: "arc", v: [50,22], a1: 75, a2: 90, r: 10, color: "target", width: 3 },
                        { t: "arc", v: [50,52], a1: 60, a2: 90, r: 12, color: "target", width: 3 }
                      ]
                    },
                    {
                      card: "∠APB = ∠APQ + ∠BPQ = ½∠AOB。",
                      reason: "等量代换（加法）",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,22], b: [35,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [65,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [50,82], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "arc", v: [50,22], a1: 75, a2: 105, r: 10, group: 1, color: "target" },
                        { t: "txt", p: [50,94], text: "∠APB = ∠APQ + ∠BPQ", size: 12, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "过 P 作直径 PQ", reason: "直径定义" },
                    { statement: "∠APQ = ½∠AOQ", reason: "化归：O 在 PQ 上（情形一）" },
                    { statement: "∠BPQ = ½∠BOQ", reason: "化归：同上（情形一）" },
                    { statement: "∠APB = ½(∠AOQ + ∠BOQ) = ½∠AOB", reason: "等量代换（加法）" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "化归思想：没见过的情形二，作一条直径，切成两个“见过的”情形一。",
                "为什么敢用情形一？折叠里写了——O 在 PQ 上，对号入座。"
              ],
              examples: [
                { text: "化归：把没见过的，切成见过的", figure: "方法" }
              ],
              prev: "g07-u1-l4-p2",
              next: "g07-u1-l4-p4"
            },
            {
              id: "g07-u1-l4-p4",
              title: "慢放证明：情形三",
              concept: "圆周角定理情形三",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle APB = \\frac{1}{2} \\angle AOB",
                  translation: "圆周角等于它所对圆心角的一半"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "∠APB 是圆周角，圆心 O 在 ∠APB 外",
                  goal: "∠APB = ½∠AOB",
                  steps: [
                    {
                      card: "过 P 作直径 PQ——这次用“减法”。",
                      reason: "直径定义：过圆心的弦；Q 是 PQ 与圆的另一交点",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,22], b: [20,52], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [35,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [50,82], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [43,22], text: "P", size: 13 },
                        { t: "txt", p: [57,82], text: "Q", size: 13 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 }
                      ]
                    },
                    {
                      card: "∠APQ = ½∠AOQ——大角是情形一。",
                      reason: "化归依据：O 在 PQ 上（本课 P2）",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "seg", a: [50,22], b: [20,52], color: "target", width: 3.5 },
                        { t: "seg", a: [50,22], b: [50,82], color: "target", width: 3.5 },
                        { t: "seg", a: [50,22], b: [35,78], color: "line", width: 2 },
                        { t: "arc", v: [50,22], a1: 90, a2: 135, r: 10, color: "target", width: 3 },
                        { t: "arc", v: [50,52], a1: 90, a2: 180, r: 12, color: "target", width: 3 }
                      ]
                    },
                    {
                      card: "∠BPQ = ½∠BOQ——小角也是情形一。",
                      reason: "化归依据：同上（本课 P2）",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 2 },
                        { t: "seg", a: [50,22], b: [35,78], color: "target", width: 3.5 },
                        { t: "seg", a: [50,22], b: [50,82], color: "target", width: 3.5 },
                        { t: "seg", a: [50,22], b: [20,52], color: "line", width: 2 },
                        { t: "arc", v: [50,22], a1: 90, a2: 105, r: 10, color: "target", width: 3 },
                        { t: "arc", v: [50,52], a1: 90, a2: 120, r: 12, color: "target", width: 3 }
                      ]
                    },
                    {
                      card: "∠APB = ∠APQ − ∠BPQ = ½∠AOB。",
                      reason: "等量代换（减法）",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,22], b: [20,52], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [35,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [50,82], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "arc", v: [50,22], a1: 105, a2: 135, r: 10, group: 1, color: "target" },
                        { t: "txt", p: [50,94], text: "∠APB = ∠APQ − ∠BPQ", size: 12, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "过 P 作直径 PQ", reason: "直径定义" },
                    { statement: "∠APQ = ½∠AOQ", reason: "化归：O 在 PQ 上（情形一）" },
                    { statement: "∠BPQ = ½∠BOQ", reason: "化归：同上（情形一）" },
                    { statement: "∠APB = ½(∠AOQ − ∠BOQ) = ½∠AOB", reason: "等量代换（减法）" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "情形三和情形二动作一样（作直径），区别只有一个：加法变减法。",
                "三情形一句话：圆心在边上直接证，在角内用加法，在角外用减法。"
              ],
              examples: [
                { text: "加法变减法：同一个动作，换个算法", figure: "方法" }
              ],
              prev: "g07-u1-l4-p3",
              next: "g07-u1-l4-p5"
            },
            {
              id: "g07-u1-l4-p5",
              title: "圆周角定理：总述",
              pageKind: "explain",
              concept: "圆周角定理总述",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{同弧所对的圆周角} = \\frac{1}{2}\\text{圆心角}",
                  translation: "同弧所对的圆周角，都等于圆心角的一半"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "情形一：圆心在角的一边上——直接用等腰 + 外角定理。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [20,52], b: [80,52], color: "line", width: 2.5 },
                        { t: "seg", a: [20,52], b: [50,82], color: "known", width: 3 },
                        { t: "seg", a: [50,52], b: [50,82], color: "target", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,12], text: "情形一：圆心在边上", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "情形二：圆心在角内——作直径，加法化归情形一。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,22], b: [35,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [65,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [50,82], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,12], text: "情形二：圆心在角内——加法", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "情形三：圆心在角外——作直径，减法化归情形一。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,22], b: [20,52], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [35,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [50,82], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,12], text: "情形三：圆心在角外——减法", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "定理总述：同弧所对的圆周角，都等于圆心角的一半——圆心在哪，不影响结论。",
                "生活例·看球赛：球门是弦，最佳观赛点都在同一段弧上——视角一样大。",
                "点拨：这是“分类讨论”第一次正式亮相——三种位置，一个一个拿下，一个结论全覆盖。",
                "⚠️ 易错：必须是“同弧”所对——不同弧的角不能比。",
                "记住一句话：一边、角内、角外——三种位置，一个“一半”。"
              ],
              examples: [
                { text: "看球赛：同一段弧上，视角都一样大", figure: "实物" }
              ],
              prev: "g07-u1-l4-p4",
              next: "g07-u1-l5-p1"
            }
          ]
        },
        /* ============ g07.1.5 推论：直径所对的圆周角（2 页） ============ */
        {
          id: "g07-u1-l5",
          title: "直径所对的圆周角",
          pages: [
            {
              id: "g07-u1-l5-p1",
              title: "拖一拖：半圆上的角不变",
              concept: "直径所对圆周角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle APB = 90\\text{度}",
                  translation: "∠APB 的读数：90 度"
                }
              ],
              interaction: {
                type: "vertex-drag",
                params: {
                  vertices: [
                    { x: 20, y: 52, label: "A" },
                    { x: 80, y: 52, label: "B" },
                    { x: 65, y: 78, label: "P" }
                  ],
                  showLengths: false,
                  showAngles: true,
                  base: [
                    { t: "arcpath", c: [50, 52], r: 30, a1: 0, a2: 180, color: "line", width: 2.5 },
                    { t: "seg", a: [20, 52], b: [80, 52], color: "line", width: 3 }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "只拖顶点 P：让它在圆上走——∠P 读数一直停在 90°（直角方块自动弹出）。",
                "A、B 是直径的两端（别拖它们）——动了就不是“直径所对”了。",
                "记住一句话：直径所对的圆周角，永远是直角。"
              ],
              examples: [
                { text: "半圆仪：卡在直径两端，顶点走到哪都是直角", figure: "实物" }
              ],
              prev: "g07-u1-l4-p5",
              next: "g07-u1-l5-p2"
            },
            {
              id: "g07-u1-l5-p2",
              title: "推论与逆命题：一对互逆",
              pageKind: "explain",
              concept: "直径推论与逆命题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{直径所对的圆周角} = \\text{直角}",
                  translation: "直径所对的圆周角是直角"
                },
                {
                  id: "f2",
                  latex: "\\text{圆周角} = 90\\text{度} \\Rightarrow \\text{所对弦是直径}",
                  translation: "90 度的圆周角所对的弦是直径"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "AB 是直径 → ∠APB 是直角：圆心角 ∠AOB 是平角 180°，一半就是 90°。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [20,52], b: [80,52], color: "line", width: 3 },
                        { t: "seg", a: [50,82], b: [20,52], color: "known", width: 3 },
                        { t: "seg", a: [50,82], b: [80,52], color: "known", width: 3 },
                        { t: "right", v: [50,82], p: [20,52], q: [80,52], size: 6 },
                        { t: "pt", p: [50,82], label: "P", color: "known", r: 4 },
                        { t: "txt", p: [50,14], text: "直径所对的圆周角是直角", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "反过来：∠APB = 90° → AB 一定是直径——“因为/所以”换位，意思就反了。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [24.7,35.9], b: [75.3,68.1], color: "target", width: 3.5 },
                        { t: "seg", a: [50,82], b: [24.7,35.9], color: "known", width: 3 },
                        { t: "seg", a: [50,82], b: [75.3,68.1], color: "known", width: 3 },
                        { t: "right", v: [50,82], p: [24.7,35.9], q: [75.3,68.1], size: 6 },
                        { t: "pt", p: [50,82], label: "P", color: "known", r: 4 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,14], text: "90° 的圆周角 → 对的弦是直径", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "推论：AB 是直径 → ∠APB 是直角（圆心角是平角 180°，一半就是 90°）。",
                "逆命题：∠APB = 90° → AB 是直径——“因为/所以”换位，意思就反了。",
                "生活例：直角三角板卡圆——斜边就是直径，斜边中点就是圆心。",
                "⚠️ 易错：逆命题只对 90° 成立——60° 的圆周角对的弦可不是直径。",
                "记住一句话：直径对直角，直角对直径——一对互逆。"
              ],
              examples: [
                { text: "找圆心：三角板卡住圆，斜边中点就是圆心", figure: "实物" }
              ],
              prev: "g07-u1-l5-p1",
              next: "g07-u1-l6-p1"
            }
          ]
        },
        /* ============ g07.1.6 本章小结与习题（2 页） ============ */
        {
          id: "g07-u1-l6",
          title: "本章小结与习题",
          pages: [
            {
              id: "g07-u1-l6-p1",
              title: "圆（一）：一张图总结",
              pageKind: "explain",
              concept: "本章小结",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{垂径} / \\text{弧弦角} / \\text{圆周角}",
                  translation: "本章三定理：垂径定理、弧弦圆心角、圆周角定理"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定理 1·垂径定理：垂直于弦的直径，平分弦、平分弧。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [22.5,64], b: [77.5,64], color: "line", width: 3 },
                        { t: "seg", a: [50,82], b: [50,22], color: "known", width: 2.5 },
                        { t: "right", v: [50,64], p: [50,82], q: [77.5,64], size: 6 },
                        { t: "seg", a: [22.5,64], b: [50,64], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [50,64], b: [77.5,64], color: "corrA", width: 3, ticks: 1 },
                        { t: "txt", p: [50,14], text: "垂径定理", size: 15, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "定理 2·弧弦圆心角：同圆里，等弧对等弦、等弦对等圆心角。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "arc", v: [50,52], a1: 100, a2: 140, r: 35, color: "target", width: 4 },
                        { t: "arc", v: [50,52], a1: 220, a2: 260, r: 35, color: "target", width: 4 },
                        { t: "seg", a: [44.8,81.5], b: [27,71.3], color: "corrA", width: 3, ticks: 2 },
                        { t: "seg", a: [27,32.7], b: [44.8,22.5], color: "corrA", width: 3, ticks: 2 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,14], text: "弧弦圆心角", size: 15, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "定理 3·圆周角定理：同弧圆周角 = 圆心角的一半；直径对直角，直角对直径。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 30, color: "line", width: 3 },
                        { t: "seg", a: [50,22], b: [35,78], color: "known", width: 3 },
                        { t: "seg", a: [50,22], b: [65,78], color: "known", width: 3 },
                        { t: "arc", v: [50,22], a1: 75, a2: 105, r: 10, group: 1, color: "corrAngle" },
                        { t: "pt", p: [50,22], label: "P", color: "known", r: 4 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,14], text: "圆周角定理", size: 15, bold: true, color: "corrAngle" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "定理 1 垂径定理：垂直于弦的直径，平分弦、平分弧（g07.1.2）。",
                "定理 2 弧弦圆心角：同圆里等弧对等弦、等弦对等圆心角（g07.1.3）。",
                "定理 3 圆周角定理：同弧圆周角 = 一半圆心角；直径对直角、直角对直径（g07.1.4–1.5）。",
                "一条线：对称性（对折/旋转）是圆所有性质的源头——g10 学变换时回来看。",
                "预告：下一章 g08——直线和圆“打起来”：相交、相切、相离。"
              ],
              examples: [],
              prev: "g07-u1-l5-p2",
              next: "g07-u1-l6-p2"
            },
            {
              id: "g07-u1-l6-p2",
              title: "本章习题：6 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{垂径} / \\text{弧弦角} / \\text{圆周角}",
                  translation: "用本章三定理：垂径定理、弧弦圆心角、圆周角定理"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "是圆周角", color: "corrA" },
                    { name: "不是圆周角", color: "corrB" }
                  ],
                  base: [
                    { t: "circle", c: [24,70], r: 15, color: "line", width: 2.5 },
                    { t: "circle", c: [76,70], r: 15, color: "line", width: 2.5 },
                    { t: "circle", c: [24,30], r: 15, color: "line", width: 2.5 },
                    { t: "circle", c: [76,30], r: 15, color: "line", width: 2.5 },
                    { t: "pt", p: [24,55], label: "P", color: "known", r: 4 },
                    { t: "pt", p: [76,70], label: "O", color: "known", r: 4 },
                    { t: "pt", p: [24,34], color: "known", r: 4 },
                    { t: "pt", p: [76,15], color: "known", r: 4 },
                    { t: "txt", p: [24,92], text: "①", size: 16, bold: true },
                    { t: "txt", p: [76,92], text: "②", size: 16, bold: true },
                    { t: "txt", p: [24,50], text: "③", size: 16, bold: true },
                    { t: "txt", p: [76,50], text: "④", size: 16, bold: true }
                  ],
                  items: [
                    { id: "q1", label: "①", group: 0, anchor: [24,55],
                      shape: { t: "poly", pts: [[18.9,84.1],[24,55],[29.1,84.1]], close: false, color: "line", width: 3 } },
                    { id: "q2", label: "②", group: 1, anchor: [76,70],
                      shape: { t: "poly", pts: [[61,70],[76,70],[76,85]], close: false, color: "line", width: 3 } },
                    { id: "q3", label: "③", group: 1, anchor: [24,34],
                      shape: { t: "poly", pts: [[18.9,44.1],[24,34],[29.1,44.1]], close: false, color: "line", width: 3 } },
                    { id: "q4", label: "④", group: 1, anchor: [76,15],
                      shape: { t: "poly", pts: [[68.5,43],[76,15],[91,15]], close: false, color: "line", width: 3 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "1．认图：4 个角分进两篮——是圆周角 / 不是圆周角。",
                "2．⊙O 半径 5，弦 AB = 8，CD 是直径且 CD⊥AB 于 E，求 AE。",
                "3．同弧 AB 所对的圆心角 ∠AOB = 80°，求圆周角 ∠APB。",
                "4．AB 是直径，P 在圆上，∠PAB = 30°，求 ∠PBA，并说出依据。",
                "5．赵州桥跨度约 37m、拱高约 7.2m：设拱所在圆半径为 r，列出方程。",
                "6．为什么“直径是圆里最长的弦”？用本章定理一句话说明。"
              ],
              examples: [
                { figure: "核对答案", text: "1．① 是；②③④ 不是（②是圆心角，③顶点在圆内，④一边是切线）。2．AE = 4（垂径定理）。3．40°（圆周角定理）。4．60°（直径所对的圆周角是直角）。5．r² = 18.5² + (r − 7.2)²（勾股定理）。6．弦不过圆心时 OA + OB > AB（三边关系）；弦过圆心时弦 = 2r = 直径。" }
              ],
              prev: "g07-u1-l6-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
