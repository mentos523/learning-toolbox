/* ============================================================
 * 学习工具箱 · 数学 · 几何 g02：相交线与平行线
 *
 * 黄队（教育教学专家）生产：9 课 / 30 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g02 章）
 * 教学设计：docs/math-geometry-pedagogy.md（黄队）
 * 参数手册：docs/math-geometry-params.md v1.1
 * 白队预算评审：/tmp/white_geom_budget_g01_g04.md（高风险 3 处已执行拆分）
 *
 * 页构成（白队评审口径）：
 *   g02.1.1 对顶角与邻补角   3 页：P1 转剪刀 step-play / P2 proof-replay（2 步首秀）/ P3 讲解
 *   g02.1.2 垂线             2 页：P1 三角板推画 step-play / P2 讲解（尺规版留 g04.1.7）
 *   g02.1.3 点到直线的距离   2 页：P1 跳跃对比 step-play / P2 讲解
 *   g02.1.4 三线八角         8 页：P1–P4 交互（总览编号 / 同位角 / 内错角 / 同旁内角，各 tap-highlight）/
 *                        P5–P8 讲解页（三线八角 / 同位角 F / 内错角 Z / 同旁内角 U + F/Z/U 对比）
 *   g02.2.1 平行的定义与公理 2 页：P1 铁轨 step-play / P2 讲解（含异面伏笔）
 *   g02.2.2 平行线的判定     4 页：P1 量角器验证 / P2-P4 三种判定各一讲解页
 *   g02.2.3 平行线的性质     4 页：P1 度数联动 / P2-P4 三种性质各一讲解页
 *   g02.2.4 平移             3 页：P1 滑动 step-play / P2 性质讲解 / P3 H16 预告
 *   g02.2.5 本章小结与习题   2 页：P1 判定 vs 性质 compare-toggle / P2 习题
 * 交互类型：step-play / compare-toggle / vertex-drag / tap-highlight /
 *           angle-protractor / proof-replay
 * （params 只用语义色名，不出现具体色值；逻辑坐标 0–100，y 向上）
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g02"] = {
  id: "g02",
  title: "相交线与平行线",
  units: [
    {
      id: "g02-u1",
      title: "相交线",
      lessons: [
        {
          id: "g02-u1-l1",
          title: "对顶角与邻补角",
          pages: [
            {
              id: "g02-u1-l1-p1",
              title: "转剪刀：四个角此消彼长",
              concept: "对顶角与邻补角的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{两条直线相交} \\to \\text{四个角}",
                  translation: "两条直线相交，形成四个角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：两条直线交叉——四个角：∠1、∠2、∠3、∠4。",
                      shapes: [
                        { t: "seg", a: [20,70], b: [80,30], color: "line", width: 3 },
                        { t: "seg", a: [20,30], b: [80,70], color: "line", width: 3 },
                        { t: "arc", v: [50,50], a1: 34, a2: 146, r: 11, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,50], a1: -34, a2: 34, r: 11, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,50], a1: 214, a2: 326, r: 11, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,50], a1: 146, a2: 214, r: 11, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,67], text: "∠1", size: 14.48, bold: true },
                        { t: "txt", p: [67,50], text: "∠2", size: 14.48, bold: true },
                        { t: "txt", p: [50,33], text: "∠3", size: 14.48, bold: true },
                        { t: "txt", p: [33,50], text: "∠4", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：剪刀张开——四个角的大小都变了。",
                      shapes: [
                        { t: "seg", a: [20,76], b: [80,24], color: "line", width: 3 },
                        { t: "seg", a: [20,24], b: [80,76], color: "line", width: 3 },
                        { t: "txt", p: [50,67], text: "∠1", size: 14.48, bold: true },
                        { t: "txt", p: [67,50], text: "∠2", size: 14.48, bold: true },
                        { t: "txt", p: [50,33], text: "∠3", size: 14.48, bold: true },
                        { t: "txt", p: [33,50], text: "∠4", size: 14.48, bold: true },
                        { t: "txt", p: [50,85], text: "张开", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：剪刀快合上——上下两角越来越小，左右两角越来越大，但对着的永远相等。",
                      shapes: [
                        { t: "seg", a: [14,58], b: [86,42], color: "line", width: 3 },
                        { t: "seg", a: [14,42], b: [86,58], color: "line", width: 3 },
                        { t: "txt", p: [50,67], text: "∠1", size: 14.48, bold: true },
                        { t: "txt", p: [67,50], text: "∠2", size: 14.48, bold: true },
                        { t: "txt", p: [50,33], text: "∠3", size: 14.48, bold: true },
                        { t: "txt", p: [33,50], text: "∠4", size: 14.48, bold: true },
                        { t: "txt", p: [50,85], text: "此消彼长", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶：转一转剪刀，看四个角怎么变。",
                "上下两个角（∠1 和 ∠3）一个变大、另一个也变大——它们叫对顶角，永远相等。",
                "相邻的两个角（比如 ∠1 和 ∠2）拼成一条直线，叫邻补角，和永远是 180°。",
                "下一页：我们用 2 步说清楚“对顶角为什么相等”。"
              ],
              examples: [
                { text: "十字路口斜对着的两个角", figure: "实物" }
              ],
              prev: null,
              next: "g02-u1-l1-p2"
            },
            {
              id: "g02-u1-l1-p2",
              title: "2 步看懂：对顶角为什么相等",
              concept: "对顶角相等的证明（proof-replay 首秀）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle 1 = \\angle 3",
                  translation: "对顶角相等：∠1 等于 ∠3"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      caption: "∠1 和 ∠2 紧挨着，拼成一条直线——它们的和是 180°。",
                      why: "依据：邻补角的定义（上一页刚玩过）。",
                      shapes: [
                        { t: "seg", a: [20,70], b: [80,30], color: "line", width: 2 },
                        { t: "seg", a: [20,30], b: [80,70], color: "line", width: 2 },
                        { t: "arc", v: [50,50], a1: 34, a2: 146, r: 13, group: 1, color: "corrA" },
                        { t: "arc", v: [50,50], a1: -34, a2: 34, r: 13, group: 1, color: "corrB" },
                        { t: "txt", p: [50,80], text: "∠1 + ∠2 = 180°", size: 15, bold: true }
                      ]
                    },
                    {
                      caption: "∠3 和 ∠2 也拼成一条直线，和也是 180°——∠1 和 ∠3 都是 ∠2 的补角，所以 ∠1 = ∠3。",
                      why: "依据：同角的补角相等（g01.2.3 学过）。",
                      shapes: [
                        { t: "seg", a: [20,70], b: [80,30], color: "line", width: 2 },
                        { t: "seg", a: [20,30], b: [80,70], color: "line", width: 2 },
                        { t: "arc", v: [50,50], a1: 214, a2: 326, r: 13, group: 1, color: "corrA" },
                        { t: "arc", v: [50,50], a1: -34, a2: 34, r: 13, group: 1, color: "corrB" },
                        { t: "txt", p: [50,80], text: "∠3 + ∠2 = 180°，所以 ∠1 = ∠3", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "第 1 步：∠1 + ∠2 = 180°——邻补角拼成平角。",
                "第 2 步：∠3 + ∠2 = 180°——也是邻补角。",
                "∠1 和 ∠3 都是 ∠2 的补角——补角只有一个大小，所以 ∠1 = ∠3。",
                "证明就是这样：每一步的动作，都能点“为什么可以”看到依据。"
              ],
              examples: [
                { text: "这是证明慢放机的第一次亮相：只有 2 步，先习惯“看动作、问依据”", figure: "方法" }
              ],
              prev: "g02-u1-l1-p1",
              next: "g02-u1-l1-p3"
            },
            {
              id: "g02-u1-l1-p3",
              title: "对顶角与邻补角：一次讲透",
              pageKind: "explain",
              concept: "对顶角与邻补角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{对顶角相等}，\\text{邻补角互补}",
                  translation: "对顶角相等，邻补角加起来是 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：∠1 和 ∠3 对着（同色），∠2 和 ∠4 对着——对顶角相等；挨着的两角互补。",
                      shapes: [
                        { t: "seg", a: [20,70], b: [80,30], color: "line", width: 3 },
                        { t: "seg", a: [20,30], b: [80,70], color: "line", width: 3 },
                        { t: "arc", v: [50,50], a1: 34, a2: 146, r: 12, group: 1, color: "corrA" },
                        { t: "arc", v: [50,50], a1: 214, a2: 326, r: 12, group: 1, color: "corrA" },
                        { t: "arc", v: [50,50], a1: -34, a2: 34, r: 12, group: 2, color: "corrB" },
                        { t: "arc", v: [50,50], a1: 146, a2: 214, r: 12, group: 2, color: "corrB" },
                        { t: "txt", p: [50,67], text: "∠1", size: 14.48, bold: true, color: "corrA" },
                        { t: "txt", p: [50,33], text: "∠3", size: 14.48, bold: true, color: "corrA" },
                        { t: "txt", p: [67,50], text: "∠2", size: 14.48, bold: true, color: "corrB" },
                        { t: "txt", p: [33,50], text: "∠4", size: 14.48, bold: true, color: "corrB" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得剪刀吗？你转到哪一帧，对着的两个角都一样大——对着的，就叫对顶角。",
                "对顶角：两条直线相交，不相邻的两个角。像 ∠1 和 ∠3——它们“对着看”，顶点是同一个。",
                "邻补角：紧挨着的两个角，像 ∠1 和 ∠2——“邻”是相邻，“补”是加起来 180°（互补）。",
                "生活例：剪刀的四个角；十字路口斜对着的两个角。",
                "反例：∠1 和 ∠4 也紧挨着、也互补——它是邻补角，不是“对顶角”。挨着的都不是对顶角。",
                "⚠️ 别搞混：对顶角才相等；邻补角是互补（和 180°），不相等。",
                "记住一句话：对着的相等，挨着的互补。"
              ],
              examples: [],
              prev: "g02-u1-l1-p2",
              next: "g02-u1-l2-p1"
            }
          ]
        },
        {
          id: "g02-u1-l2",
          title: "垂线",
          pages: [
            {
              id: "g02-u1-l2-p1",
              title: "三角板推一推：画垂线",
              concept: "垂线的三角板画法",
              formulas: [
                {
                  id: "f1",
                  latex: "a \\perp b",
                  translation: "a 垂直于 b：相交成 90 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：直线 l，和直线外一点 A。",
                      shapes: [
                        { t: "seg", a: [12,42], b: [88,42], color: "line", width: 3 },
                        { t: "txt", p: [90,42], text: "l", size: 14.48 },
                        { t: "pt", p: [50,72], r: 3.5, color: "target" },
                        { t: "txt", p: [56,74], text: "A", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：三角板的一条直角边靠紧直线 l。",
                      shapes: [
                        { t: "seg", a: [12,42], b: [88,42], color: "line", width: 3 },
                        { t: "txt", p: [90,42], text: "l", size: 14.48 },
                        { t: "poly", pts: [[28,42],[60,42],[60,72]], color: "aux", width: 2.5 },
                        { t: "right", v: [60,42], p: [28,42], q: [60,72], size: 6, color: "aux" },
                        { t: "pt", p: [50,72], r: 3.5, color: "target" },
                        { t: "txt", p: [56,74], text: "A", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：沿着直线推三角板，直到另一条直角边经过点 A。",
                      shapes: [
                        { t: "seg", a: [12,42], b: [88,42], color: "line", width: 3 },
                        { t: "txt", p: [90,42], text: "l", size: 14.48 },
                        { t: "poly", pts: [[18,42],[50,42],[50,72]], color: "aux", width: 2.5 },
                        { t: "right", v: [50,42], p: [18,42], q: [50,72], size: 6, color: "aux" },
                        { t: "pt", p: [50,72], r: 3.5, color: "target" },
                        { t: "txt", p: [56,74], text: "A", size: 14.48, bold: true },
                        { t: "txt", p: [50,28], text: "推到这里", size: 13, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 4 步：沿这条直角边画线——过 A 的垂线画好了，交点处是直角。",
                      shapes: [
                        { t: "seg", a: [12,42], b: [88,42], color: "line", width: 3 },
                        { t: "txt", p: [90,42], text: "l", size: 14.48 },
                        { t: "seg", a: [50,72], b: [50,42], color: "target", width: 3.5 },
                        { t: "right", v: [50,42], p: [12,42], q: [50,72], size: 7, color: "target" },
                        { t: "pt", p: [50,72], r: 3.5, color: "target" },
                        { t: "txt", p: [56,74], text: "A", size: 14.48, bold: true },
                        { t: "txt", p: [50,28], text: "垂足", size: 13, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶：看三角板怎么“推”出一条垂线。",
                "关键动作：一条直角边贴紧直线，沿着直线推，让另一条直角边“逮住”点 A。",
                "画出的线和直线 l 交于直角——这就是垂直，记作 a ⊥ b。",
                "尺规版的画法我们留到第 4 章（g04.1.7），那里圆规上场。"
              ],
              examples: [
                { text: "装修：用三角板检验墙面和地面是否垂直", figure: "实物" }
              ],
              prev: "g02-u1-l1-p3",
              next: "g02-u1-l2-p2"
            },
            {
              id: "g02-u1-l2-p2",
              title: "垂直：相交成了 90°",
              pageKind: "explain",
              concept: "垂直的定义与唯一性",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{过一点有且只有一条直线与已知直线垂直}",
                  translation: "过一点，只能画出一条和已知直线垂直的直线"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：过 A 的垂线只有这一条——转到别的位置，就不是 90° 了。",
                      shapes: [
                        { t: "seg", a: [12,42], b: [88,42], color: "line", width: 3 },
                        { t: "txt", p: [90,42], text: "l", size: 14.48 },
                        { t: "seg", a: [50,72], b: [50,42], color: "target", width: 3.5 },
                        { t: "seg", a: [34,64], b: [66,56], color: "aux", width: 2, dash: "5,4" },
                        { t: "right", v: [50,42], p: [12,42], q: [50,72], size: 7, color: "target" },
                        { t: "pt", p: [50,72], r: 3.5, color: "target" },
                        { t: "txt", p: [56,74], text: "A", size: 14.48, bold: true },
                        { t: "txt", p: [50,28], text: "转到这里就不是 90° 了", size: 12, color: "aux" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "上一页你推过三角板：当两条直线相交成 90°，就叫垂直（互相垂直），记作 a ⊥ b，读作“a 垂直于 b”。",
                "交点叫垂足——垂线“落”到直线上的那个点。",
                "过一点有且只有一条直线和已知直线垂直：转动画笔试试——穿过 A 的直线转一圈，只有转到 90° 那一下才“垂直”。",
                "生活例：墙角和地面；书桌的桌腿和桌面；红绿灯杆和地面。",
                "反例：两条直线斜着交叉（比如 60°）——相交了，但不垂直。垂直必须是 90°。",
                "⚠️ 别搞混：“相交”不等于“垂直”；垂直是相交里最特殊的一种——成直角。",
                "记住一句话：垂直就是 90° 的相交。"
              ],
              examples: [],
              prev: "g02-u1-l2-p1",
              next: "g02-u1-l3-p1"
            }
          ]
        },
        {
          id: "g02-u1-l3",
          title: "点到直线的距离",
          pages: [
            {
              id: "g02-u1-l3-p1",
              title: "点向直线跳：哪条路最短？",
              concept: "垂线段最短",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{垂线段最短}",
                  translation: "从点到直线的所有线段里，垂直的那条最短"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：点 A，直线 l。A 想“跳”到 l 上。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [88,30], color: "line", width: 3 },
                        { t: "txt", p: [90,30], text: "l", size: 14.48 },
                        { t: "pt", p: [50,78], r: 4, color: "target" },
                        { t: "txt", p: [56,80], text: "A", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：三条路都能到——中间那条是垂直的。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [88,30], color: "line", width: 3 },
                        { t: "txt", p: [90,30], text: "l", size: 14.48 },
                        { t: "seg", a: [50,78], b: [50,30], color: "target", width: 3 },
                        { t: "seg", a: [50,78], b: [30,30], color: "known", width: 2 },
                        { t: "seg", a: [50,78], b: [70,30], color: "known", width: 2 },
                        { t: "right", v: [50,30], p: [12,30], q: [50,78], size: 6, color: "target" },
                        { t: "pt", p: [50,78], r: 4, color: "target" },
                        { t: "txt", p: [56,80], text: "A", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：量一量——垂直的那条最短，斜的路都更长。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [88,30], color: "line", width: 3 },
                        { t: "txt", p: [90,30], text: "l", size: 14.48 },
                        { t: "seg", a: [50,78], b: [30,30], color: "known", width: 2, dash: "5,4" },
                        { t: "seg", a: [50,78], b: [70,30], color: "known", width: 2, dash: "5,4" },
                        { t: "seg", a: [50,78], b: [50,30], color: "target", width: 4 },
                        { t: "right", v: [50,30], p: [12,30], q: [50,78], size: 6, color: "target" },
                        { t: "txt", p: [58,54], text: "最短", size: 15, bold: true, color: "target" },
                        { t: "pt", p: [50,78], r: 4, color: "target" },
                        { t: "txt", p: [56,80], text: "A", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶：A 向直线 l 跳过去，三条路摆在面前。",
                "中间垂直的那条，叫垂线段——从点 A 出发、垂直于 l 的线段。",
                "量一量：垂线段最短，斜的都更长——这就是“垂线段最短”。",
                "下一页：点到直线的“距离”，指的就是这条垂线段的长度。"
              ],
              examples: [
                { text: "跳远：从起跳线垂直量到落点", figure: "实物" }
              ],
              prev: "g02-u1-l2-p2",
              next: "g02-u1-l3-p2"
            },
            {
              id: "g02-u1-l3-p2",
              title: "点到直线的距离",
              pageKind: "explain",
              concept: "点到直线的距离",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{点到直线的距离} = \\text{垂线段的长度}",
                  translation: "点到直线的距离就是垂线段的长度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：A 到 l 的距离，就是垂线段的长度——只认垂直那条。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [88,30], color: "line", width: 3 },
                        { t: "txt", p: [90,30], text: "l", size: 14.48 },
                        { t: "seg", a: [50,78], b: [50,30], color: "target", width: 4 },
                        { t: "right", v: [50,30], p: [12,30], q: [50,78], size: 6, color: "target" },
                        { t: "txt", p: [58,54], text: "距离", size: 15, bold: true, color: "target" },
                        { t: "pt", p: [50,78], r: 4, color: "target" },
                        { t: "txt", p: [56,80], text: "A", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得跳远吗？A 到直线 l 的“距离”，就是垂线段的长度——垂直的那条有多长，距离就是多少。",
                "点到直线的距离：直线外一点到这条直线的垂线段的长度。",
                "生活例：跳远成绩——量的是起跳线到落点的垂直距离；过马路走斑马线最短。",
                "反例：斜着量过去的那段——再长也不是“距离”。距离只认垂线段。",
                "⚠️ 别搞混：“距离”是长度（一个数），“垂线段”是线段（一段线）——问距离要答数。",
                "记住一句话：距离看垂线段，量的是长度。"
              ],
              examples: [],
              prev: "g02-u1-l3-p1",
              next: "g02-u1-l4-p1"
            }
          ]
        },
        /* ---------- g02.1.4 三线八角（白队高风险拆 4 页） ---------- */
        {
          id: "g02-u1-l4",
          title: "同位角、内错角、同旁内角",
          pages: [
            {
              id: "g02-u1-l4-p1",
              title: "第三条直线来了：八个角排排坐",
              concept: "三线八角总览",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三条直线相交} \\to \\text{八个角}",
                  translation: "一条截线切两条直线，形成八个角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：两条直线 a、b。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "txt", p: [88,72], text: "a", size: 14.48 },
                        { t: "txt", p: [88,40], text: "b", size: 14.48 }
                      ]
                    },
                    {
                      caption: "第 2 步：第三条直线 c“切”过来——叫截线，一共形成 8 个角。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2.5 },
                        { t: "txt", p: [88,72], text: "a", size: 14.48 },
                        { t: "txt", p: [88,40], text: "b", size: 14.48 },
                        { t: "txt", p: [64,87], text: "c（截线）", size: 13, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 3 步：上面的交点，4 个角编上号：∠1、∠2、∠3、∠4。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2.5 },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 70, a2: 180, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, group: 1, color: "corrAngle" },
                        { t: "txt", p: [68,80], text: "∠1", size: 13, bold: true },
                        { t: "txt", p: [50,83], text: "∠2", size: 13, bold: true },
                        { t: "txt", p: [47,65], text: "∠3", size: 13, bold: true },
                        { t: "txt", p: [65,61], text: "∠4", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 4 步：下面的交点：∠5、∠6、∠7、∠8。三线八角，到齐。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2.5 },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 70, a2: 180, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 180, a2: 250, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 250, a2: 360, r: 9, group: 1, color: "corrAngle" },
                        { t: "txt", p: [68,80], text: "∠1", size: 13, bold: true },
                        { t: "txt", p: [50,83], text: "∠2", size: 13, bold: true },
                        { t: "txt", p: [47,65], text: "∠3", size: 13, bold: true },
                        { t: "txt", p: [65,61], text: "∠4", size: 13, bold: true },
                        { t: "txt", p: [56,48], text: "∠5", size: 13, bold: true },
                        { t: "txt", p: [38,51], text: "∠6", size: 13, bold: true },
                        { t: "txt", p: [35,33], text: "∠7", size: 13, bold: true },
                        { t: "txt", p: [53,29], text: "∠8", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶：截线 c 切过 a、b，8 个角一个个亮起来。",
                "先认编号：上面 ∠1 到 ∠4，下面 ∠5 到 ∠8。",
                "三条线、八个角——“三线八角”。接下来三页，我们给它们分组、起名字。",
                "⚠️ 提醒：编号是临时的，位置关系才是永久的——下页见。"
              ],
              examples: [
                { text: "斑马线被斜路切过：数一数有几个角", figure: "实物" }
              ],
              prev: "g02-u1-l3-p2",
              next: "g02-u1-l4-p2"
            },
            {
              id: "g02-u1-l4-p2",
              title: "同位角：位置一模一样的角",
              concept: "同位角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{同位角} = \\text{位置相同的两个角}",
                  translation: "同位角：在两个交点的相同位置上的一对角"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                    { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                    { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2 },
                    { t: "poly", pts: [[68,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 3, dash: "6,4", close: false },
                    { t: "txt", p: [88,72], text: "a", size: 13 },
                    { t: "txt", p: [88,40], text: "b", size: 13 },
                    { t: "txt", p: [64,87], text: "c", size: 13 },
                    { t: "txt", p: [68,80], text: "∠1", size: 12 },
                    { t: "txt", p: [50,83], text: "∠2", size: 12 },
                    { t: "txt", p: [47,65], text: "∠3", size: 12 },
                    { t: "txt", p: [65,61], text: "∠4", size: 12 },
                    { t: "txt", p: [56,48], text: "∠5", size: 12 },
                    { t: "txt", p: [38,51], text: "∠6", size: 12 },
                    { t: "txt", p: [35,33], text: "∠7", size: 12 },
                    { t: "txt", p: [53,29], text: "∠8", size: 12 },
                    { t: "txt", p: [74,56], text: "F", size: 15, bold: true, color: "aux" }
                  ],
                  groups: [
                    { name: "同位角", color: "corrA" }
                  ],
                  items: [
                    { id: "a1", label: "∠1", group: 0, shape: { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 9, color: "corrAngle" } },
                    { id: "a2", label: "∠2", group: 0, shape: { t: "arc", v: [57.2,72], a1: 70, a2: 180, r: 9, color: "corrAngle" } },
                    { id: "a3", label: "∠3", group: 0, shape: { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 9, color: "corrAngle" } },
                    { id: "a4", label: "∠4", group: 0, shape: { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, color: "corrAngle" } },
                    { id: "a5", label: "∠5", group: 0, shape: { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 9, color: "corrAngle" } },
                    { id: "a6", label: "∠6", group: 0, shape: { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, color: "corrAngle" } },
                    { id: "a7", label: "∠7", group: 0, shape: { t: "arc", v: [45.4,40], a1: 180, a2: 250, r: 9, color: "corrAngle" } },
                    { id: "a8", label: "∠8", group: 0, shape: { t: "arc", v: [45.4,40], a1: 250, a2: 360, r: 9, color: "corrAngle" } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点一点：8 个角里，藏着 4 对“同位角”——位置一模一样的一对。",
                "看虚线的“F”：∠1 和 ∠5，一个在上交点右上，一个在下交点右上——位置相同。",
                "找全 4 对：∠1–∠5、∠2–∠6、∠3–∠7、∠4–∠8。",
                "点拨：“同位”就是“同一个位置”——都在右上，或都在左下。"
              ],
              examples: [
                { text: "F 形：顺着 F 的三笔找同位角", figure: "方法" }
              ],
              prev: "g02-u1-l4-p1",
              next: "g02-u1-l4-p3"
            },
            {
              id: "g02-u1-l4-p3",
              title: "内错角：Z 字两头的角",
              concept: "内错角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{内错角} = \\text{内部错开的两个角}",
                  translation: "内错角：在两直线之间、截线两侧的一对角"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                    { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                    { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2 },
                    { t: "poly", pts: [[47,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 3, dash: "6,4", close: false },
                    { t: "txt", p: [88,72], text: "a", size: 13 },
                    { t: "txt", p: [88,40], text: "b", size: 13 },
                    { t: "txt", p: [64,87], text: "c", size: 13 },
                    { t: "txt", p: [68,80], text: "∠1", size: 12 },
                    { t: "txt", p: [50,83], text: "∠2", size: 12 },
                    { t: "txt", p: [47,65], text: "∠3", size: 12 },
                    { t: "txt", p: [65,61], text: "∠4", size: 12 },
                    { t: "txt", p: [56,48], text: "∠5", size: 12 },
                    { t: "txt", p: [38,51], text: "∠6", size: 12 },
                    { t: "txt", p: [35,33], text: "∠7", size: 12 },
                    { t: "txt", p: [53,29], text: "∠8", size: 12 },
                    { t: "txt", p: [30,56], text: "Z", size: 15, bold: true, color: "aux" }
                  ],
                  groups: [
                    { name: "第 1 对", color: "corrA" },
                    { name: "第 2 对", color: "corrB" }
                  ],
                  items: [
                    { id: "b3", label: "∠3", group: 0, shape: { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 9, color: "corrAngle" } },
                    { id: "b5", label: "∠5", group: 0, shape: { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 9, color: "corrAngle" } },
                    { id: "b4", label: "∠6", group: 1, shape: { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, color: "corrAngle" } },
                    { id: "b6", label: "∠4", group: 1, shape: { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, color: "corrAngle" } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点一点：找出 2 对内错角——“里面”+“错开”的一对。",
                "看虚线的“Z”：∠3 在上交点的左下，∠5 在下交点的右上——一个左一个右，错开了。",
                "“内”是两条直线 a、b 之间；“错”是分居截线两侧。",
                "找全 2 对：∠3–∠5、∠4–∠6。"
              ],
              examples: [
                { text: "Z 形：Z 的两头就是一对内错角", figure: "方法" }
              ],
              prev: "g02-u1-l4-p2",
              next: "g02-u1-l4-p4"
            },
            {
              id: "g02-u1-l4-p4",
              title: "同旁内角：U 字怀里的角",
              concept: "同旁内角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{同旁内角} = \\text{内部同侧的两个角}",
                  translation: "同旁内角：在两直线之间、截线同侧的一对角"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                    { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                    { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2 },
                    { t: "poly", pts: [[66,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 3, dash: "6,4", close: false },
                    { t: "txt", p: [88,72], text: "a", size: 13 },
                    { t: "txt", p: [88,40], text: "b", size: 13 },
                    { t: "txt", p: [64,87], text: "c", size: 13 },
                    { t: "txt", p: [68,80], text: "∠1", size: 12 },
                    { t: "txt", p: [50,83], text: "∠2", size: 12 },
                    { t: "txt", p: [47,65], text: "∠3", size: 12 },
                    { t: "txt", p: [65,61], text: "∠4", size: 12 },
                    { t: "txt", p: [56,48], text: "∠5", size: 12 },
                    { t: "txt", p: [38,51], text: "∠6", size: 12 },
                    { t: "txt", p: [35,33], text: "∠7", size: 12 },
                    { t: "txt", p: [53,29], text: "∠8", size: 12 },
                    { t: "txt", p: [74,56], text: "U", size: 15, bold: true, color: "aux" }
                  ],
                  groups: [
                    { name: "第 1 对", color: "corrA" },
                    { name: "第 2 对", color: "corrB" }
                  ],
                  items: [
                    { id: "c4", label: "∠4", group: 0, shape: { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, color: "corrAngle" } },
                    { id: "c5", label: "∠5", group: 0, shape: { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 9, color: "corrAngle" } },
                    { id: "c3", label: "∠3", group: 1, shape: { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 9, color: "corrAngle" } },
                    { id: "c6", label: "∠6", group: 1, shape: { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, color: "corrAngle" } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点一点：找出 2 对同旁内角——“同侧”+“里面”的一对。",
                "看虚线：∠4 和 ∠5 都在截线 c 的右边、都在 a 和 b 之间——像被 U 字抱在怀里。",
                "找全 2 对：∠4–∠5、∠3–∠6。",
                "三组名字集齐：F 同位、Z 内错、U 同旁——三线八角的分组，下节课派大用场。"
              ],
              examples: [
                { text: "U 形：U 抱住的两个角就是一对同旁内角", figure: "方法" }
              ],
              prev: "g02-u1-l4-p3",
              next: "g02-u1-l4-p5"
            },
            {
              id: "g02-u1-l4-p5",
              title: "三线八角：一次讲透",
              pageKind: "explain",
              concept: "三线八角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{一条截线} + \\text{两条直线} = \\text{八个角}",
                  translation: "一条截线切过两条直线，一共形成八个角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：截线 c 切过 a、b——上面交点 4 个角，下面交点 4 个角，到齐。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2.5 },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 70, a2: 180, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 180, a2: 250, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 250, a2: 360, r: 9, group: 1, color: "corrAngle" },
                        { t: "txt", p: [68,80], text: "∠1", size: 13, bold: true },
                        { t: "txt", p: [50,83], text: "∠2", size: 13, bold: true },
                        { t: "txt", p: [47,65], text: "∠3", size: 13, bold: true },
                        { t: "txt", p: [65,61], text: "∠4", size: 13, bold: true },
                        { t: "txt", p: [56,48], text: "∠5", size: 13, bold: true },
                        { t: "txt", p: [38,51], text: "∠6", size: 13, bold: true },
                        { t: "txt", p: [35,33], text: "∠7", size: 13, bold: true },
                        { t: "txt", p: [53,29], text: "∠8", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你点了 ▶，截线 c 切过 a、b，8 个角一个个亮起来——上面 ∠1 到 ∠4，下面 ∠5 到 ∠8。",
                "三线八角：一条截线切过两条直线，形成的八个角——“三线”是 a、b、c，“八角”是 ∠1 到 ∠8。",
                "生活例：楼梯的斜扶手切过每级台阶——每一级都被“切”出 4 个角。",
                "图形例：看定格图——认准两个交点，一个交点管 4 个角。",
                "反例：三条直线交于同一点——只有 6 个角。三线八角要求两个不同的交点，“共点”的不算。",
                "⚠️ 别搞混：编号 ∠1–∠8 是临时的，换个图可能重编——位置关系（上下、左右）才是永久的。",
                "记住一句话：一线切两线，八角排排坐。"
              ],
              examples: [
                { text: "斜扶手切台阶：每级 4 个角", figure: "实物" }
              ],
              prev: "g02-u1-l4-p4",
              next: "g02-u1-l4-p6"
            },
            {
              id: "g02-u1-l4-p6",
              title: "同位角：F 形找同位",
              pageKind: "explain",
              concept: "同位角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{同位角} = \\text{两交点上位置相同的角}",
                  translation: "同位角是在两个交点的相同位置上的一对角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：F 的三笔框住 ∠1 和 ∠5——上交点右上、下交点右上，位置一模一样。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2 },
                        { t: "poly", pts: [[68,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 3, dash: "6,4", close: false },
                        { t: "txt", p: [88,72], text: "a", size: 13 },
                        { t: "txt", p: [88,40], text: "b", size: 13 },
                        { t: "txt", p: [64,87], text: "c", size: 13 },
                        { t: "txt", p: [74,56], text: "F", size: 15, bold: true, color: "aux" },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [57.2,72], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 180, a2: 250, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 250, a2: 360, r: 9, group: 2, color: "corrAngle" },
                        { t: "txt", p: [68,80], text: "∠1", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [50,83], text: "∠2", size: 12 },
                        { t: "txt", p: [47,65], text: "∠3", size: 12 },
                        { t: "txt", p: [65,61], text: "∠4", size: 12 },
                        { t: "txt", p: [38,51], text: "∠6", size: 12 },
                        { t: "txt", p: [35,33], text: "∠7", size: 12 },
                        { t: "txt", p: [53,29], text: "∠8", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你点的 F 形里，∠1 在上交点右上，∠5 在下交点右上——位置相同，这就是同位角。",
                "同位角：两个交点上，位置完全相同的一对角——都在右上，或都在左下。",
                "生活例：电影院前后两排、同一列的两个座位——位置一模一样。",
                "图形例：顺着 F 的三笔找——F 框住的两个角就是一对：∠1–∠5、∠2–∠6、∠3–∠7、∠4–∠8。",
                "反例：∠1 和 ∠3 都在上交点——同位角必须是两个交点各出一个，同一个交点的再像也不是。",
                "⚠️ 别搞混：同位角说的是“位置相同”，不是“大小相等”——大小相等要等两直线平行才成立，下节课见。",
                "记住一句话：同位看 F，位置要相同。"
              ],
              examples: [
                { text: "F 形三笔：框住的就是一对", figure: "方法" }
              ],
              prev: "g02-u1-l4-p5",
              next: "g02-u1-l4-p7"
            },
            {
              id: "g02-u1-l4-p7",
              title: "内错角：Z 字两头找",
              pageKind: "explain",
              concept: "内错角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{内错角} = \\text{两直线之间、截线两侧的角}",
                  translation: "内错角是在两条直线之间、分居截线两侧的一对角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：Z 的两头——∠3（上交点左下）和 ∠5（下交点右上），里面、错开。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2 },
                        { t: "poly", pts: [[47,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 3, dash: "6,4", close: false },
                        { t: "txt", p: [88,72], text: "a", size: 13 },
                        { t: "txt", p: [88,40], text: "b", size: 13 },
                        { t: "txt", p: [64,87], text: "c", size: 13 },
                        { t: "txt", p: [30,56], text: "Z", size: 15, bold: true, color: "aux" },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 180, a2: 250, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 250, a2: 360, r: 9, group: 2, color: "corrAngle" },
                        { t: "txt", p: [47,65], text: "∠3", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [68,80], text: "∠1", size: 12 },
                        { t: "txt", p: [50,83], text: "∠2", size: 12 },
                        { t: "txt", p: [65,61], text: "∠4", size: 12 },
                        { t: "txt", p: [38,51], text: "∠6", size: 12 },
                        { t: "txt", p: [35,33], text: "∠7", size: 12 },
                        { t: "txt", p: [53,29], text: "∠8", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你点的 Z 形里，∠3 在上交点左下，∠5 在下交点右上——一个左一个右，错开了。",
                "内错角：夹在两条直线 a、b 之间，又分居截线 c 两侧的一对角——“内”是里面，“错”是错开。",
                "生活例：两条平行的马路，中间绿化带两侧各站一人，一个在东头一个在西头——里面、错开。",
                "图形例：Z 的两头就是一对内错角：∠3–∠5、∠4–∠6。",
                "反例：∠3 和 ∠6——看着也“错开”，但都在截线左侧（同侧）——那是同旁内角，不是内错角。",
                "⚠️ 别搞混：内错角也要“两条直线之间”——跑到 a 上面或 b 下面的角，再错开也不是内错角。",
                "记住一句话：内错看 Z，里面错开。"
              ],
              examples: [
                { text: "Z 字两头：一头一个", figure: "方法" }
              ],
              prev: "g02-u1-l4-p6",
              next: "g02-u1-l4-p8"
            },
            {
              id: "g02-u1-l4-p8",
              title: "同旁内角：U 形抱一抱",
              pageKind: "explain",
              concept: "同旁内角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{同旁内角} = \\text{两直线之间、截线同侧的角}",
                  translation: "同旁内角是在两条直线之间、截线同一侧的一对角"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "同位角·F",
                      caption: "F 形：∠1 和 ∠5——两个交点、位置相同（都在右上）——同位角。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2 },
                        { t: "poly", pts: [[68,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 3, dash: "6,4", close: false },
                        { t: "txt", p: [88,72], text: "a", size: 13 },
                        { t: "txt", p: [88,40], text: "b", size: 13 },
                        { t: "txt", p: [64,87], text: "c", size: 13 },
                        { t: "txt", p: [74,56], text: "F", size: 15, bold: true, color: "aux" },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [57.2,72], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 180, a2: 250, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 250, a2: 360, r: 9, group: 2, color: "corrAngle" },
                        { t: "txt", p: [68,80], text: "∠1", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [50,83], text: "∠2", size: 12 },
                        { t: "txt", p: [47,65], text: "∠3", size: 12 },
                        { t: "txt", p: [65,61], text: "∠4", size: 12 },
                        { t: "txt", p: [38,51], text: "∠6", size: 12 },
                        { t: "txt", p: [35,33], text: "∠7", size: 12 },
                        { t: "txt", p: [53,29], text: "∠8", size: 12 }
                      ]
                    },
                    {
                      label: "内错角·Z",
                      caption: "Z 形：∠3 和 ∠5——两直线之间、截线两侧（一左一右）——内错角。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2 },
                        { t: "poly", pts: [[47,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 3, dash: "6,4", close: false },
                        { t: "txt", p: [88,72], text: "a", size: 13 },
                        { t: "txt", p: [88,40], text: "b", size: 13 },
                        { t: "txt", p: [64,87], text: "c", size: 13 },
                        { t: "txt", p: [30,56], text: "Z", size: 15, bold: true, color: "aux" },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 180, a2: 250, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 250, a2: 360, r: 9, group: 2, color: "corrAngle" },
                        { t: "txt", p: [47,65], text: "∠3", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [68,80], text: "∠1", size: 12 },
                        { t: "txt", p: [50,83], text: "∠2", size: 12 },
                        { t: "txt", p: [65,61], text: "∠4", size: 12 },
                        { t: "txt", p: [38,51], text: "∠6", size: 12 },
                        { t: "txt", p: [35,33], text: "∠7", size: 12 },
                        { t: "txt", p: [53,29], text: "∠8", size: 12 }
                      ]
                    },
                    {
                      label: "同旁内角·U",
                      caption: "U 形：∠4 和 ∠5——两直线之间、截线同侧（都在右边）——同旁内角。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2 },
                        { t: "poly", pts: [[66,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 3, dash: "6,4", close: false },
                        { t: "txt", p: [88,72], text: "a", size: 13 },
                        { t: "txt", p: [88,40], text: "b", size: 13 },
                        { t: "txt", p: [64,87], text: "c", size: 13 },
                        { t: "txt", p: [74,56], text: "U", size: 15, bold: true, color: "aux" },
                        { t: "arc", v: [57.2,72], a1: 250, a2: 360, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 180, a2: 250, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [45.4,40], a1: 250, a2: 360, r: 9, group: 2, color: "corrAngle" },
                        { t: "txt", p: [65,61], text: "∠4", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5", size: 12, bold: true, color: "corrA" },
                        { t: "txt", p: [68,80], text: "∠1", size: 12 },
                        { t: "txt", p: [50,83], text: "∠2", size: 12 },
                        { t: "txt", p: [47,65], text: "∠3", size: 12 },
                        { t: "txt", p: [38,51], text: "∠6", size: 12 },
                        { t: "txt", p: [35,33], text: "∠7", size: 12 },
                        { t: "txt", p: [53,29], text: "∠8", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你点的 U 形里，∠4 和 ∠5 都在截线右边、都被 a、b 夹在中间——像被 U 抱在怀里。",
                "同旁内角：夹在两条直线之间，又在截线同一侧的一对角——“同旁”是同侧，“内”是里面。",
                "生活例：两条平行的跑道，同一侧看台上前后排的两个观众——里面、同侧。",
                "图形例：U 抱住的两个角：∠4–∠5、∠3–∠6。",
                "反例：∠4 和 ∠8——也都在截线右侧，但 ∠8 在直线 b 的外边——不在“两条直线之间”，那是同位角。",
                "⚠️ 别搞混：同旁内角互补（和 180°）也要等两直线平行——现在只认位置，不认大小。",
                "F/Z/U 对比：F 同位（位置相同）、Z 内错（里面两侧）、U 同旁（里面同侧）——看字母，认位置。",
                "记住一句话：F 同位，Z 内错，U 同旁。"
              ],
              examples: [
                { text: "U 形怀抱：抱住的两个角", figure: "方法" }
              ],
              prev: "g02-u1-l4-p7",
              next: "g02-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "g02-u2",
      title: "平行线",
      lessons: [
        {
          id: "g02-u2-l1",
          title: "平行的定义与平行公理",
          pages: [
            {
              id: "g02-u2-l1-p1",
              title: "铁轨：永远不相交",
              concept: "平行的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "a \\parallel b",
                  translation: "a 平行于 b：在同一平面内永不相交"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：这两条直线，延长后会撞到一起——不平行。",
                      shapes: [
                        { t: "seg", a: [10,62], b: [70,52], color: "line", width: 3 },
                        { t: "seg", a: [10,38], b: [70,48], color: "line", width: 3 },
                        { t: "seg", a: [70,52], b: [95,48], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [70,48], b: [95,52], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,78], text: "延长后会相交", size: 14.48, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 2 步：这两条呢？怎么延长都不相交——这就是平行。",
                      shapes: [
                        { t: "seg", a: [10,60], b: [90,60], color: "known", width: 3, arrows: 2 },
                        { t: "seg", a: [10,40], b: [90,40], color: "known", width: 3, arrows: 2 },
                        { t: "txt", p: [50,78], text: "延长也不相交", size: 14.48, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：平行记作 a ∥ b。铁轨、斑马线、推拉门滑轨，都是平行。",
                      shapes: [
                        { t: "seg", a: [10,60], b: [90,60], color: "known", width: 3, arrows: 2 },
                        { t: "seg", a: [10,40], b: [90,40], color: "known", width: 3, arrows: 2 },
                        { t: "txt", p: [50,24], text: "a ∥ b", size: 18, bold: true, color: "known" },
                        { t: "txt", p: [50,78], text: "铁轨：两条永不相交", size: 14.48 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶：延长两条直线，看它们会不会相交。",
                "平行：在同一平面内，永不相交的两条直线。",
                "记作 a ∥ b，读作“a 平行于 b”——两道竖线像铁轨。",
                "下一页：过直线外一点，能画几条平行线？"
              ],
              examples: [
                { text: "铁轨、斑马线、推拉门滑轨", figure: "实物" }
              ],
              prev: "g02-u1-l4-p8",
              next: "g02-u2-l1-p2"
            },
            {
              id: "g02-u2-l1-p2",
              title: "平行公理：只能画一条",
              pageKind: "explain",
              concept: "平行公理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{过直线外一点有且只有一条直线与已知直线平行}",
                  translation: "过直线外一点，只能画出一条和已知直线平行的直线"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：过 A 作 l 的平行线——只有这一条是平行的，歪一点就会撞上 l。",
                      shapes: [
                        { t: "seg", a: [10,35], b: [90,35], color: "line", width: 3 },
                        { t: "txt", p: [92,35], text: "l", size: 14.48 },
                        { t: "seg", a: [10,70], b: [90,70], color: "target", width: 3, arrows: 2 },
                        { t: "seg", a: [30,82], b: [70,58], color: "aux", width: 2, dash: "5,4" },
                        { t: "pt", p: [50,70], r: 3.5, color: "target" },
                        { t: "txt", p: [56,74], text: "A", size: 14.48, bold: true },
                        { t: "txt", p: [50,52], text: "这条延长后会撞上 l", size: 12, color: "aux" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "上一页你看到：平行就是“延长也不相交”。现在问：过直线外一点 A，能画几条 l 的平行线？",
                "答案：有且只有一条——这就是平行公理。画两条试试，第二条总会撞上 l。",
                "生活例：铁轨只有一对；推拉门的滑轨——多一条就卡住了。",
                "反例伏笔：在立体空间里，“不相交”不一定平行——比如天花板和地板的两条棱，永不相交但也不平行（第 12 章再见）。",
                "⚠️ 别搞混：平行公理说的是“直线外一点”；点在直线上时，平行线就是直线本身。",
                "记住一句话：线外一点，只能引一条平行线。"
              ],
              examples: [],
              prev: "g02-u2-l1-p1",
              next: "g02-u2-l2-p1"
            }
          ]
        },
        /* ---------- g02.2.2 平行线的判定（白队高风险拆 4 页） ---------- */
        {
          id: "g02-u2-l2",
          title: "平行线的判定",
          pages: [
            {
              id: "g02-u2-l2-p1",
              title: "量角器验证：角对上了，线就平行了",
              concept: "用角判定平行（量角器验证）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{同位角相等} \\to \\text{两直线平行}",
                  translation: "同位角相等，两条直线就平行"
                }
              ],
              interaction: {
                type: "angle-protractor",
                params: {
                  angle: 60,
                  vertex: { x: 50, y: 56, label: "O" },
                  dir1: 180,
                  rayLabels: ["A", "B"],
                  tolerance: 2
                }
              },
              auxInteraction: null,
              hints: [
                "把量角器中心拖到角的顶点上对准——不用转也不用读刻度，读数自动算出：这个角是 60°。",
                "再想想：如果另一个交点上的同位角也是 60°，两个角“对上”了，两条直线就平行——铁轨铺直了。",
                "判定 1：同位角相等，两直线平行。下一页开始，一个判定一页，讲透。"
              ],
              examples: [
                { text: "木工：用角尺检验门框两边平行", figure: "实物" }
              ],
              prev: "g02-u2-l1-p2",
              next: "g02-u2-l2-p2"
            },
            {
              id: "g02-u2-l2-p2",
              title: "判定 1：同位角相等 → 平行",
              pageKind: "explain",
              concept: "平行线判定 1",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{同位角相等} \\Rightarrow a \\parallel b",
                  translation: "同位角相等可以推出两直线平行"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：∠1 = ∠5 = 60°（同位角对上了）——所以 a ∥ b。",
                      shapes: [
                        { t: "seg", a: [15,70], b: [85,70], color: "known", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "known", width: 3, arrows: 2 },
                        { t: "seg", a: [42,28], b: [58,82], color: "aux", width: 2.5 },
                        { t: "arc", v: [54.2,70], a1: 0, a2: 72, r: 10, group: 1, color: "corrA" },
                        { t: "arc", v: [45.8,40], a1: 0, a2: 72, r: 10, group: 1, color: "corrA" },
                        { t: "txt", p: [66,78], text: "∠1=60°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5=60°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [50,24], text: "a ∥ b", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得三线八角吗？∠1 和 ∠5 是同位角——位置一模一样的一对。",
                "判定 1：如果 ∠1 = ∠5，两条直线 a、b 就平行。角“对上”了，线就“摆直”了。",
                "生活例：木工弹墨线——量出同位角相等，就知道两条线平行；铁轨铺设也要验这个角。",
                "反例：∠1 = 60°、∠5 = 65°——差 5°，就不平行，延长后总会相交。",
                "⚠️ 别搞混：这是“判定”——用角去判断线平行；下节课反过来，用平行去得角相等。",
                "记住一句话：判定找相等——角相等，线平行。"
              ],
              examples: [],
              prev: "g02-u2-l2-p1",
              next: "g02-u2-l2-p3"
            },
            {
              id: "g02-u2-l2-p3",
              title: "判定 2：内错角相等 → 平行",
              pageKind: "explain",
              concept: "平行线判定 2",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{内错角相等} \\Rightarrow a \\parallel b",
                  translation: "内错角相等可以推出两直线平行"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：∠3 = ∠5 = 60°（Z 字两头对上了）——所以 a ∥ b。",
                      shapes: [
                        { t: "seg", a: [15,70], b: [85,70], color: "known", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "known", width: 3, arrows: 2 },
                        { t: "seg", a: [34.4,28], b: [65.6,82], color: "aux", width: 2.5 },
                        { t: "poly", pts: [[48,70],[58.7,70],[41.3,40],[52,40]], color: "aux", width: 2, dash: "6,4", close: false },
                        { t: "arc", v: [58.7,70], a1: 180, a2: 240, r: 10, group: 1, color: "corrB" },
                        { t: "arc", v: [41.3,40], a1: 0, a2: 60, r: 10, group: 1, color: "corrB" },
                        { t: "txt", p: [47,63], text: "∠3=60°", size: 13, bold: true, color: "corrB" },
                        { t: "txt", p: [53,47], text: "∠5=60°", size: 13, bold: true, color: "corrB" },
                        { t: "txt", p: [50,24], text: "a ∥ b", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "判定 2：如果 ∠3 = ∠5（内错角），两条直线 a、b 就平行——Z 字两头的角对上了。",
                "为什么也行？因为 ∠3 的对顶角就是 ∠1，∠3 = ∠5 时 ∠1 = ∠5，回到判定 1。",
                "生活例：折纸——折痕和纸边平行时，内错角自然相等；反过来，量出内错角相等就知道折直了。",
                "反例：∠3 = 60°、∠5 = 70°——Z 字两头没对上，不平行。",
                "⚠️ 别搞混：内错角是“里面错开”的一对，别拿成同旁内角。",
                "记住一句话：Z 字对上，线就平行。"
              ],
              examples: [],
              prev: "g02-u2-l2-p2",
              next: "g02-u2-l2-p4"
            },
            {
              id: "g02-u2-l2-p4",
              title: "判定 3：同旁内角互补 → 平行",
              pageKind: "explain",
              concept: "平行线判定 3",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{同旁内角互补} \\Rightarrow a \\parallel b",
                  translation: "同旁内角加起来是 180 度，可以推出两直线平行"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：∠4 + ∠5 = 60° + 120° = 180°（U 字怀里互补）——所以 a ∥ b。",
                      shapes: [
                        { t: "seg", a: [15,70], b: [85,70], color: "known", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "known", width: 3, arrows: 2 },
                        { t: "seg", a: [34.4,28], b: [65.6,82], color: "aux", width: 2.5 },
                        { t: "poly", pts: [[68,70],[58.7,70],[41.3,40],[52,40]], color: "aux", width: 2, dash: "6,4", close: false },
                        { t: "arc", v: [58.7,70], a1: 240, a2: 360, r: 10, group: 1, color: "corrC" },
                        { t: "arc", v: [41.3,40], a1: 0, a2: 60, r: 10, group: 1, color: "corrC" },
                        { t: "txt", p: [66,58], text: "∠4=120°", size: 13, bold: true, color: "corrC" },
                        { t: "txt", p: [53,47], text: "∠5=60°", size: 13, bold: true, color: "corrC" },
                        { t: "txt", p: [50,24], text: "a ∥ b", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "判定 3：如果 ∠4 + ∠5 = 180°（同旁内角互补），两条直线 a、b 就平行。",
                "为什么也行？∠4 和 ∠1 是邻补角（和 180°），∠4 + ∠5 = 180° 时 ∠1 = ∠5，回到判定 1。",
                "注意这个判定不说“相等”，说“互补”——加起来是 180°。",
                "反例：∠4 + ∠5 = 170°——差 10° 才到 180°，不平行。",
                "⚠️ 别搞混：前两个判定找“相等”，这一个找“互补”；“互补”就是和为 180°。",
                "记住一句话：U 里互补，线就平行。"
              ],
              examples: [],
              prev: "g02-u2-l2-p3",
              next: "g02-u2-l3-p1"
            }
          ]
        },
        /* ---------- g02.2.3 平行线的性质（白队高风险拆 4 页） ---------- */
        {
          id: "g02-u2-l3",
          title: "平行线的性质",
          pages: [
            {
              id: "g02-u2-l3-p1",
              title: "平行线被截：三个角联动",
              concept: "平行时角的关系（度数联动）",
              formulas: [
                {
                  id: "f1",
                  latex: "a \\parallel b \\to \\text{角有关系}",
                  translation: "两直线平行，被截出的角就有确定的关系"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：截线这个位置——∠1 = 70°，同位角 ∠5 也是 70°。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2.5 },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 10, group: 1, color: "corrA" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 10, group: 1, color: "corrA" },
                        { t: "txt", p: [68,80], text: "∠1=70°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5=70°", size: 13, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "第 2 步：转动截线——∠1 变成 80°，∠5 跟着变成 80°；内错角 ∠4 = ∠6 = 100°。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [44,20], b: [56,85], color: "aux", width: 2.5 },
                        { t: "arc", v: [53.6,72], a1: 0, a2: 80, r: 10, group: 1, color: "corrA" },
                        { t: "arc", v: [47.7,40], a1: 0, a2: 80, r: 10, group: 1, color: "corrA" },
                        { t: "arc", v: [53.6,72], a1: 260, a2: 360, r: 10, group: 2, color: "corrB" },
                        { t: "arc", v: [47.7,40], a1: 80, a2: 180, r: 10, group: 2, color: "corrB" },
                        { t: "txt", p: [64,80], text: "∠1=80°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [58,48], text: "∠5=80°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [60,61], text: "∠4=100°", size: 12, color: "corrB" },
                        { t: "txt", p: [39,50], text: "∠6=100°", size: 12, color: "corrB" }
                      ]
                    },
                    {
                      caption: "第 3 步：再看同旁内角——∠3 = 70°，∠6 = 110°，加起来永远 180°。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2.5 },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 10, group: 1, color: "corrC" },
                        { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 10, group: 1, color: "corrC" },
                        { t: "txt", p: [47,65], text: "∠3=70°", size: 13, bold: true, color: "corrC" },
                        { t: "txt", p: [38,51], text: "∠6=110°", size: 13, bold: true, color: "corrC" },
                        { t: "txt", p: [50,22], text: "70° + 110° = 180°", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶：转动截线 c，看三个角的读数一起变。",
                "变的是角度大小；不变的是关系：同位角永远相等，内错角永远相等，同旁内角永远互补。",
                "前提：a ∥ b——平行是因，角的关系是果。下一页起，一个性质一页。"
              ],
              examples: [
                { text: "斑马线：平行线被斜路截，角的关系不变", figure: "实物" }
              ],
              prev: "g02-u2-l2-p4",
              next: "g02-u2-l3-p2"
            },
            {
              id: "g02-u2-l3-p2",
              title: "性质 1：平行 → 同位角相等",
              pageKind: "explain",
              concept: "平行线性质 1",
              formulas: [
                {
                  id: "f1",
                  latex: "a \\parallel b \\Rightarrow \\text{同位角相等}",
                  translation: "两直线平行可以推出同位角相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：因为 a ∥ b，所以 ∠1 = ∠5 = 70°——同位角相等。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2.5 },
                        { t: "arc", v: [57.2,72], a1: 0, a2: 70, r: 10, group: 1, color: "corrA" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 10, group: 1, color: "corrA" },
                        { t: "txt", p: [68,80], text: "∠1=70°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5=70°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [50,24], text: "因为 a ∥ b", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "性质 1：因为 a ∥ b（线平行），所以 ∠1 = ∠5（同位角相等）。",
                "和判定 1 比一比：判定是“角相等 → 线平行”，性质是“线平行 → 角相等”——因为和所以换了位置。",
                "生活例：铁轨是平行的——量任意一组同位角，永远相等；不相等就说明轨铺歪了。",
                "反例：如果 a、b 不平行，∠1 和 ∠5 就不相等——“平行”这个前提不能丢。",
                "⚠️ 别搞混：做题时先看已知给的是“角”还是“线”——给角用判定，给线用性质。",
                "记住一句话：性质得相等——线平行，角相等。"
              ],
              examples: [],
              prev: "g02-u2-l3-p1",
              next: "g02-u2-l3-p3"
            },
            {
              id: "g02-u2-l3-p3",
              title: "性质 2：平行 → 内错角相等",
              pageKind: "explain",
              concept: "平行线性质 2",
              formulas: [
                {
                  id: "f1",
                  latex: "a \\parallel b \\Rightarrow \\text{内错角相等}",
                  translation: "两直线平行可以推出内错角相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：因为 a ∥ b，所以 ∠3 = ∠5 = 70°——Z 字两头的角相等。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2.5 },
                        { t: "poly", pts: [[47,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 2, dash: "6,4", close: false },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 10, group: 1, color: "corrB" },
                        { t: "arc", v: [45.4,40], a1: 0, a2: 70, r: 10, group: 1, color: "corrB" },
                        { t: "txt", p: [47,65], text: "∠3=70°", size: 13, bold: true, color: "corrB" },
                        { t: "txt", p: [56,48], text: "∠5=70°", size: 13, bold: true, color: "corrB" },
                        { t: "txt", p: [50,24], text: "因为 a ∥ b", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "性质 2：因为 a ∥ b（线平行），所以 ∠3 = ∠5（内错角相等）——Z 字两头。",
                "为什么成立？∠3 的对顶角是 ∠1，性质 1 已有 ∠1 = ∠5，所以 ∠3 = ∠5。",
                "生活例：折纸时折痕和纸边平行——折出来的 Z 字两角永远相等，可以拿来验折得直不直。",
                "反例：两条线不平行时，Z 字两头的角一个大一个小——别硬说相等。",
                "⚠️ 别搞混：内错角是“里面错开”的一对（∠3–∠5、∠4–∠6），别和同旁内角串了。",
                "记住一句话：线平行，Z 字两头相等。"
              ],
              examples: [],
              prev: "g02-u2-l3-p2",
              next: "g02-u2-l3-p4"
            },
            {
              id: "g02-u2-l3-p4",
              title: "性质 3：平行 → 同旁内角互补",
              pageKind: "explain",
              concept: "平行线性质 3",
              formulas: [
                {
                  id: "f1",
                  latex: "a \\parallel b \\Rightarrow \\text{同旁内角互补}",
                  translation: "两直线平行可以推出同旁内角加起来是 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：因为 a ∥ b，所以 ∠3 + ∠6 = 70° + 110° = 180°——U 字怀里互补。",
                      shapes: [
                        { t: "seg", a: [15,72], b: [85,72], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [38,20], b: [62,85], color: "aux", width: 2.5 },
                        { t: "poly", pts: [[66,72],[57.2,72],[45.4,40],[56,40]], color: "aux", width: 2, dash: "6,4", close: false },
                        { t: "arc", v: [57.2,72], a1: 180, a2: 250, r: 10, group: 1, color: "corrC" },
                        { t: "arc", v: [45.4,40], a1: 70, a2: 180, r: 10, group: 1, color: "corrC" },
                        { t: "txt", p: [47,65], text: "∠3=70°", size: 13, bold: true, color: "corrC" },
                        { t: "txt", p: [38,51], text: "∠6=110°", size: 13, bold: true, color: "corrC" },
                        { t: "txt", p: [50,22], text: "70° + 110° = 180°", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "性质 3：因为 a ∥ b（线平行），所以 ∠3 + ∠6 = 180°（同旁内角互补）。",
                "为什么成立？∠5+∠6=180°（邻补角）；性质1：∠1=∠5；对顶角：∠1=∠3。所以∠3+∠6=180°。",
                "注意：前两个性质说“相等”，这一个说“互补”——加起来是 180°。",
                "反例：两条线不平行时，同旁内角加起来不是 180°——“平行”前提不能丢。",
                "⚠️ 别搞混：判定 3 和性质 3 是一对互逆——判定是“互补 → 平行”，性质是“平行 → 互补”。",
                "记住一句话：线平行，U 里加起来 180°。"
              ],
              examples: [],
              prev: "g02-u2-l3-p3",
              next: "g02-u2-l4-p1"
            }
          ]
        },
        {
          id: "g02-u2-l4",
          title: "平移：图形的第一次运动",
          pages: [
            {
              id: "g02-u2-l4-p1",
              title: "三角形滑走了：对应点连线",
              concept: "平移的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{平移} = \\text{沿直线滑动}",
                  translation: "平移：图形沿直线方向滑动，形状大小不变"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：三角形 ABC，沿箭头方向滑动。",
                      shapes: [
                        { t: "poly", pts: [[20,60],[38,60],[29,74]], color: "known", width: 3 },
                        { t: "pt", p: [20,60], r: 3, color: "known" },
                        { t: "pt", p: [38,60], r: 3, color: "known" },
                        { t: "pt", p: [29,74], r: 3, color: "known" },
                        { t: "txt", p: [16,54], text: "A", size: 13 },
                        { t: "txt", p: [40,54], text: "B", size: 13 },
                        { t: "txt", p: [29,80], text: "C", size: 13 },
                        { t: "seg", a: [44,67], b: [56,67], color: "aux", width: 3 },
                        { t: "poly", pts: [[56,67],[50,63],[50,71]], color: "aux", width: 2, fill: "aux" }
                      ]
                    },
                    {
                      caption: "第 2 步：滑到新位置 A'B'C'——对应点连起来：AA'、BB'、CC'。",
                      shapes: [
                        { t: "poly", pts: [[20,60],[38,60],[29,74]], color: "aux", width: 2, dash: "5,4" },
                        { t: "poly", pts: [[52,60],[70,60],[61,74]], color: "target", width: 3 },
                        { t: "txt", p: [72,54], text: "A'", size: 13 },
                        { t: "txt", p: [50,54], text: "B'", size: 13 },
                        { t: "txt", p: [61,80], text: "C'", size: 13 },
                        { t: "seg", a: [20,60], b: [52,60], color: "corrA", width: 2.5 },
                        { t: "seg", a: [38,60], b: [70,60], color: "corrA", width: 2.5 },
                        { t: "seg", a: [29,74], b: [61,74], color: "corrA", width: 2.5 }
                      ]
                    },
                    {
                      caption: "第 3 步：量一量：三条连线互相平行，而且一样长。",
                      shapes: [
                        { t: "poly", pts: [[20,60],[38,60],[29,74]], color: "aux", width: 2, dash: "5,4" },
                        { t: "poly", pts: [[52,60],[70,60],[61,74]], color: "target", width: 3 },
                        { t: "seg", a: [20,60], b: [52,60], color: "corrA", width: 3, arrows: 1 },
                        { t: "seg", a: [38,60], b: [70,60], color: "corrA", width: 3, arrows: 1 },
                        { t: "seg", a: [29,74], b: [61,74], color: "corrA", width: 3, arrows: 1 },
                        { t: "txt", p: [36,66], text: "平行且相等", size: 14.48, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶：三角形沿箭头“滑”过去——形状大小一点没变。",
                "对应点：A 滑到 A'，B 滑到 B'，C 滑到 C'——连起来三条线。",
                "不变的是：AA'、BB'、CC' 互相平行且一样长——这就是平移的性质。",
                "下一页：平移的定义一次讲透。"
              ],
              examples: [
                { text: "电梯上楼：人没变，楼层变了", figure: "实物" }
              ],
              prev: "g02-u2-l3-p4",
              next: "g02-u2-l4-p2"
            },
            {
              id: "g02-u2-l4-p2",
              title: "平移的性质：对应点连线平行且相等",
              pageKind: "explain",
              concept: "平移的定义与性质",
              formulas: [
                {
                  id: "f1",
                  latex: "AA' \\parallel BB' \\parallel CC',\\ AA' = BB' = CC'",
                  translation: "对应点连线互相平行且长度相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：平移只改变位置——对应点连线平行且相等，形状大小纹丝不动。",
                      shapes: [
                        { t: "poly", pts: [[20,60],[38,60],[29,74]], color: "aux", width: 2, dash: "5,4" },
                        { t: "poly", pts: [[52,60],[70,60],[61,74]], color: "target", width: 3 },
                        { t: "seg", a: [20,60], b: [52,60], color: "corrA", width: 3, arrows: 1 },
                        { t: "seg", a: [38,60], b: [70,60], color: "corrA", width: 3, arrows: 1 },
                        { t: "seg", a: [29,74], b: [61,74], color: "corrA", width: 3, arrows: 1 },
                        { t: "txt", p: [36,50], text: "形状大小不变", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得滑动吗？三角形从 ABC 滑到 A'B'C'——这个“滑”的动作，就叫平移。",
                "平移的性质：对应点连的线（AA'、BB'、CC'）互相平行，而且长度相等。",
                "平移不改变图形的形状和大小——只改变位置。像电梯上楼：人没变，楼层变了。",
                "生活例：电梯、推箱子、滑滑梯——都是平移。",
                "反例：转动的门——位置变了，但它是“转”不是“滑”，那叫旋转（第 10 章）。",
                "⚠️ 别搞混：平移是“滑”，旋转是“转”；平移里每条对应点连线都平行。",
                "记住一句话：平移滑一滑，连线平行又相等。"
              ],
              examples: [],
              prev: "g02-u2-l4-p1",
              next: "g02-u2-l4-p3"
            },
            {
              id: "g02-u2-l4-p3",
              title: "预告：直线也能“滑”——y=x 往上滑",
              concept: "平移与函数图像（H16 预告）",
              formulas: [
                {
                  id: "f1",
                  latex: "y = x \\to y = x + 2",
                  translation: "直线 y = x 往上平移 2 格，变成 y = x + 2"
                }
              ],
              interaction: {
                type: "morph-toggle",
                params: {
                  views: [
                    {
                      label: "y = x",
                      caption: "直线 y = x：经过原点，斜着往上走。",
                      shapes: [
                        {
                          t: "seg",
                          a: [ 15, 25 ],
                          b: [ 75, 85 ],
                          color: "known",
                          width: 3
                        },
                        {
                          t: "txt",
                          p: [ 62, 60 ],
                          text: "y = x",
                          size: 15,
                          bold: true,
                          color: "known"
                        },
                        {
                          t: "pt",
                          p: [ 45, 55 ],
                          r: 3,
                          color: "known"
                        },
                        {
                          t: "txt",
                          p: [ 45, 48 ],
                          text: "原点",
                          size: 12
                        }
                      ]
                    },
                    {
                      label: "往上滑 2 格",
                      caption: "整体往上平移 2 格，变成 y = x + 2——b 就是往上滑的格数。",
                      shapes: [
                        {
                          t: "seg",
                          a: [ 15, 25 ],
                          b: [ 68, 78 ],
                          color: "aux",
                          width: 2,
                          dash: "5,4"
                        },
                        {
                          t: "seg",
                          a: [ 15, 45 ],
                          b: [ 68, 98 ],
                          color: "target",
                          width: 3
                        },
                        {
                          t: "seg",
                          a: [ 40, 50 ],
                          b: [ 40, 70 ],
                          color: "corrA",
                          width: 2.5
                        },
                        {
                          t: "txt",
                          p: [ 62, 80 ],
                          text: "y = x + 2",
                          size: 15,
                          bold: true,
                          color: "target"
                        },
                        {
                          t: "txt",
                          p: [ 30, 60 ],
                          text: "上移 2 格",
                          size: 12,
                          color: "corrA"
                        }
                      ]
                    }
                  ],
                  morph: {
                    kind: "translate",
                    durationMs: 1200,
                    pairs: [ [ 0, 1 ] ],
                    readout: {
                      template: "y = x + {v}",
                      from: 0,
                      to: 2,
                      decimals: 1
                    }
                  },
                  controls: {
                    play: true,
                    scrub: true,
                    step: true,
                    replay: true
                  }
                },
                engine: {
                  primitive: "MorphToggle",
                  version: "2026.10.16.A",
                  params: {
                    kind: "translate"
                  }
                }
              },
              auxInteraction: null,
              hints: [
                "点“往上滑 2 格”：整条直线 y = x 平移上去，变成 y = x + 2。",
                "代数 ch06-u2-l2：y=kx+b 里 b 让直线上下平移——那是函数图像在“滑”，和本课图形平移同一回事。",
                "这里只埋一个“原来如此”：b 是上下平移的量。函数留到代数课细讲。"
              ],
              examples: [
                { text: "回看代数第 6 章：一次函数图像的平移", figure: "回链" }
              ],
              prev: "g02-u2-l4-p2",
              next: "g02-u2-l5-p1"
            }
          ]
        },
        {
          id: "g02-u2-l5",
          title: "本章小结与习题",
          pages: [
            {
              id: "g02-u2-l5-p1",
              title: "判定 vs 性质：因为和所以换了位置",
              concept: "判定与性质的对比",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{判定：角} \\to \\text{线}；\\text{性质：线} \\to \\text{角}",
                  translation: "判定从角推出线平行，性质从线平行推出角的关系"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "判定",
                      caption: "判定：因为 ∠1 = ∠5（角相等），所以 a ∥ b——从角推出线。",
                      shapes: [
                        { t: "seg", a: [15,70], b: [85,70], color: "known", width: 3 },
                        { t: "seg", a: [15,40], b: [85,40], color: "known", width: 3 },
                        { t: "seg", a: [42,28], b: [58,82], color: "aux", width: 2.5 },
                        { t: "arc", v: [54.2,70], a1: 0, a2: 72, r: 10, group: 1, color: "corrA" },
                        { t: "arc", v: [45.8,40], a1: 0, a2: 72, r: 10, group: 1, color: "corrA" },
                        { t: "txt", p: [66,78], text: "∠1=60°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5=60°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [50,24], text: "所以 a ∥ b", size: 15, bold: true, color: "known" }
                      ]
                    },
                    {
                      label: "性质",
                      caption: "性质：因为 a ∥ b（线平行），所以 ∠1 = ∠5 = 60°——从线推出角。",
                      shapes: [
                        { t: "seg", a: [15,70], b: [85,70], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 3, arrows: 2 },
                        { t: "seg", a: [42,28], b: [58,82], color: "aux", width: 2.5 },
                        { t: "arc", v: [54.2,70], a1: 0, a2: 72, r: 10, group: 1, color: "corrA" },
                        { t: "arc", v: [45.8,40], a1: 0, a2: 72, r: 10, group: 1, color: "corrA" },
                        { t: "txt", p: [66,78], text: "∠1=60°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [56,48], text: "∠5=60°", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [50,24], text: "因为 a ∥ b", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“判定”：因为角相等，所以线平行——用角去判断线。",
                "点“性质”：因为线平行，所以角相等——用线去得到角。",
                "把“因为”“所以”换个位置，意思就反了——这是全章最容易混的地方。",
                "口诀：判定找相等，性质得相等。"
              ],
              examples: [
                { text: "做题第一步：看已知给的是“角”还是“线”——给角用判定，给线用性质", figure: "方法" }
              ],
              prev: "g02-u2-l4-p3",
              next: "g02-u2-l5-p2"
            },
            {
              id: "g02-u2-l5-p2",
              title: "本章小测：6 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{判定找相等，性质得相等}",
                  translation: "判定用角相等推出平行，性质由平行得到角相等"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "用判定", color: "corrA" },
                    { name: "用性质", color: "corrB" }
                  ],
                  items: [
                    { id: "q1", label: "① ∠1=∠5=60°，能推出 a∥b 吗？", group: 0, anchor: [25,72],
                      shape: { t: "txt", p: [25,72], text: "①", size: 22.86, bold: true } },
                    { id: "q2", label: "② 已知 a∥b，∠1=60°，求∠5", group: 1, anchor: [75,72],
                      shape: { t: "txt", p: [75,72], text: "②", size: 22.86, bold: true } },
                    { id: "q3", label: "③ ∠3+∠6=180°，能推出 a∥b 吗？", group: 0, anchor: [25,32],
                      shape: { t: "txt", p: [25,32], text: "③", size: 22.86, bold: true } },
                    { id: "q4", label: "④ 已知 a∥b，∠4=100°，求∠6", group: 1, anchor: [75,32],
                      shape: { t: "txt", p: [75,32], text: "④", size: 22.86, bold: true } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点一点：把 ①–④ 送进“用判定”或“用性质”的篮子；⑤⑥ 直接算一算。",
                "1．∠1 = ∠5 = 60°，能推出 a ∥ b 吗？",
                "2．已知 a ∥ b，∠1 = 60°，求 ∠5 是多少？",
                "3．∠3 + ∠6 = 180°，能推出 a ∥ b 吗？",
                "4．已知 a ∥ b，∠4 = 100°，求 ∠6 是多少？",
                "5．已知 a ∥ b，∠1 = 110°，求 ∠6 是多少？（两步：先找同位角，再用邻补角）",
                "6．小区楼梯的两条扶手是平行的，一根横杆斜穿两条扶手，量得横杆和上面扶手的夹角是 75°，横杆和下面扶手在同一侧的夹角是多少？"
              ],
              examples: [
                { figure: "核对答案", text: "答案：①用判定（同位角相等→平行）；②用性质（∠5=60°，同位角相等）；③用判定（同旁内角互补→平行）；④用性质（∠6=100°，内错角相等）；⑤∠6=70°（∠5=∠1=110°，∠5+∠6=180°）；⑥105°（同旁内角互补）" }
              ,
                { figure: "错因解析", text: "认图：“能推出平行”用判定（角→平行）；“已知平行求角”用性质（平行→角）。1．∠1 与 ∠5 是同位角：同位角相等→a∥b，用判定。2．a∥b：同位角相等，∠5=∠1=60°，用性质。3．∠3+∠6=180° 是同旁内角互补→a∥b，用判定。4．a∥b：内错角相等，∠6=∠4=100°，用性质。5．∠5=∠1=110°（同位角），∠5+∠6=180°（邻补角）：∠6=70°。6．两扶手平行，横杆是截线：同侧两角是同旁内角，互补——180°−75°=105°。" }],
              prev: "g02-u2-l5-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
