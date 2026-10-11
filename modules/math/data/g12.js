/* ============================================================
 * 学习工具箱 · 数学 · 几何 g12：立体几何初步
 *
 * 黄队（教育教学专家）生产：1 单元 / 5 课 / 22 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g12 章，以直观为主、证明为辅）
 * 教学设计：docs/math-geometry-pedagogy.md v1.1（跃升 6：平面→立体；G8 net-fold）
 * 参数手册：docs/math-geometry-params.md v1.3
 * 白队一屏预算评审：~/workspace/geo-g08-g13-screen-budget-review.md（g12 15→约 21 页，按拆分建议执行）
 *
 * 页构成：
 *   g12.1.1 走进立体图形（6 页，白队🔴已拆）P1 step-play（5 种立体展示）
 *        P2 讲解（棱/面/顶点点名） P3 step-play（数 V/E/F，发现欧拉公式）
 *        P4 讲解（欧拉公式 V−E+F=2） P5 tap-highlight（长方体找平行/找垂直）
 *        P6 讲解（空间位置直观判断法）
 *   g12.1.2 三视图（4 页）P1 step-play（探照灯三束光） P2 讲解（三个视图）
 *        P3 讲解（口诀：长对正/高平齐/宽相等） P4 tap-highlight（认视图小练习）
 *   g12.1.3 展开图（6 页，白队🔴已拆）P1 net-fold（G8 技术验证页：正方体一四一展开↔折叠）
 *        P2 讲解（展开图概念） P3 step-play（一四一 6 种） P4 step-play（二三一/二二二/三三 5 种）
 *        P5 step-play（"田"字形反例） P6 讲解（口诀 141/231/222/33）
 *   g12.1.4 截面（4 页）P1 step-play（切西瓜：4 刀 4 种截面） P2 讲解（三角/四边形截面）
 *        P3 讲解（五边形/六边形截面） P4 讲解（规律：截面边数=切到的面数）
 *   g12.1.5 本章小结与习题（2 页）P1 小结（讲解页） P2 习题（tap-highlight 认图 + 6 道题）
 *
 * 呼应点落实：
 *   l3-p2：圆柱展开图（两个圆 + 一个长方形）回链 g11.1.7（圆柱侧面展开）
 *   l5-p1：全章串讲（欧拉公式 / 三视图口诀 / 展开图分类 / 截面规律）
 *
 * 蓝队需求（net-fold，G8 新增交互类型）：
 *   l3-p1 为技术验证页，params 按教学设计 §9.2（展开图多边形、折叠轴序列、视角档位）
 *   提案书写，schema 待蓝队冻结。白队验收点：折叠动画 ≤3 秒；固定 4–6 个视角档位
 *   （不做自由 3D 旋转）；390px 下展开图多边形可点区域 ≥44px。验证通过后再量产
 *   11 种分类页（本文件 p3/p4 已用 step-play 写好，不依赖 net-fold 量产）。
 *   在蓝队实现并注册 net-fold 之前，本章 chapters.js 保持 status: "planned"。
 *
 * 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 / corrA·corrB·corrC=对应组 /
 *   corrAngle=对应角 / line=普通线 / aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g12"] = {
  id: "g12",
  title: "立体几何初步",
  units: [
    {
      id: "g12-u1",
      title: "走进立体图形",
      lessons: [
        /* ============ g12.1.1 走进立体图形：认识与空间位置（6 页） ============ */
        {
          id: "g12-u1-l1",
          title: "走进立体图形：认识与空间位置",
          pages: [
            {
              id: "g12-u1-l1-p1",
              title: "五种立体，转着看",
              concept: "棱柱、棱锥、圆柱、圆锥、球",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{柱体，上下一样粗}",
                  translation: "柱体上下两头形状大小一样，像一根切出来的柱子"
                },
                {
                  id: "f2",
                  latex: "\\text{锥体，一头是尖顶}",
                  translation: "锥体一头是尖顶，像削好的铅笔尖"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 种：棱柱——上下两个底面一模一样，像一刀切出来的柱子。",
                      shapes: [
                        { t: "poly", pts: [[28,38],[54,38],[41,58]], color: "line", width: 3 },
                        { t: "poly", pts: [[38,48],[64,48],[51,68]], color: "line", width: 2, dash: "5,4" },
                        { t: "seg", a: [28,38], b: [38,48], color: "line", width: 2 },
                        { t: "seg", a: [54,38], b: [64,48], color: "line", width: 2 },
                        { t: "seg", a: [41,58], b: [51,68], color: "line", width: 2 },
                        { t: "txt", p: [50,84], text: "棱柱：上下底面一模一样", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 种：棱锥——底面是个多边形，侧面全是三角形，顶上聚成一个尖。",
                      shapes: [
                        { t: "poly", pts: [[30,60],[60,60],[60,72],[30,72]], color: "line", width: 3 },
                        { t: "seg", a: [45,34], b: [30,60], color: "line", width: 2 },
                        { t: "seg", a: [45,34], b: [60,60], color: "line", width: 2 },
                        { t: "seg", a: [45,34], b: [60,72], color: "line", width: 2 },
                        { t: "seg", a: [45,34], b: [30,72], color: "line", width: 2, dash: "5,4" },
                        { t: "pt", p: [45,34], label: "顶", color: "target" },
                        { t: "txt", p: [50,84], text: "棱锥：底面多边形，顶上一个尖", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 种：圆柱——上下两个圆一样大，侧面是曲面，像一节水管。",
                      shapes: [
                        { t: "circle", c: [45,62], r: 15, color: "line", width: 3 },
                        { t: "seg", a: [30,62], b: [30,32], color: "line", width: 3 },
                        { t: "seg", a: [60,62], b: [60,32], color: "line", width: 3 },
                        { t: "seg", a: [30,32], b: [60,32], color: "line", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,84], text: "圆柱：两个圆一样大，侧面是曲面", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 4 种：圆锥——底面是圆，顶上一个尖，像圣诞帽。",
                      shapes: [
                        { t: "circle", c: [45,60], r: 15, color: "line", width: 3 },
                        { t: "seg", a: [45,32], b: [30,60], color: "line", width: 2.5 },
                        { t: "seg", a: [45,32], b: [60,60], color: "line", width: 2.5 },
                        { t: "pt", p: [45,32], label: "顶", color: "target" },
                        { t: "txt", p: [50,84], text: "圆锥：底面是圆，顶上一个尖", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 5 种：球——浑身是曲面，没有棱也没有顶点，像篮球。",
                      shapes: [
                        { t: "circle", c: [45,52], r: 18, color: "line", width: 3 },
                        { t: "txt", p: [50,84], text: "球：浑身曲面，没有棱也没有顶点", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点▶，五种立体排着队转到你面前：棱柱、棱锥、圆柱、圆锥、球。",
                "先认长相：柱体上下一样粗，锥体一头尖，球浑身圆溜溜。",
                "名字带“棱”的是多面体；圆柱、圆锥、球有曲面。"
              ],
              examples: [
                { text: "纸箱→长方体（特殊的棱柱）；蛋筒→圆锥", figure: "实物" }
              ],
              prev: null,
              next: "g12-u1-l1-p2"
            },
            {
              id: "g12-u1-l1-p2",
              title: "给立体“点名”",
              pageKind: "explain",
              concept: "棱、面、顶点",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{面：平平的一块}",
                  translation: "（多面体的）面是围成立体的一块平面"
                },
                {
                  id: "f2",
                  latex: "\\text{棱：面与面的交线}",
                  translation: "棱是两个面相交的线"
                },
                {
                  id: "f3",
                  latex: "\\text{顶点：棱与棱的交点}",
                  translation: "顶点是棱与棱相交的点"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "点名“面”：长方体有 6 个面，每个面都是长方形。",
                      shapes: [
                        { t: "poly", pts: [[28,40],[62,40],[62,62],[28,62]], color: "line", width: 2 },
                        { t: "poly", pts: [[40,52],[74,52],[74,74],[40,74]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [28,40], b: [40,52], color: "line", width: 1.5 },
                        { t: "seg", a: [62,40], b: [74,52], color: "line", width: 1.5 },
                        { t: "seg", a: [62,62], b: [74,74], color: "line", width: 1.5 },
                        { t: "seg", a: [28,62], b: [40,74], color: "line", width: 1.5 },
                        { t: "poly", pts: [[28,40],[62,40],[62,62],[28,62]], color: "target", width: 2, fill: "target", opacity: 0.25 },
                        { t: "txt", p: [45,51], text: "1 个面", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "点名“棱”：两个面交出一条棱，长方体有 12 条棱。",
                      shapes: [
                        { t: "poly", pts: [[28,40],[62,40],[62,62],[28,62]], color: "line", width: 2 },
                        { t: "poly", pts: [[40,52],[74,52],[74,74],[40,74]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [28,40], b: [62,40], color: "target", width: 5 },
                        { t: "txt", p: [45,30], text: "1 条棱", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "点名“顶点”：几条棱交出一个顶点，长方体有 8 个顶点。",
                      shapes: [
                        { t: "poly", pts: [[28,40],[62,40],[62,62],[28,62]], color: "line", width: 2 },
                        { t: "poly", pts: [[40,52],[74,52],[74,74],[40,74]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "pt", p: [28,40], label: "顶点", color: "target", r: 6 },
                        { t: "txt", p: [55,30], text: "1 个顶点", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页五种立体排队时，棱柱棱角分明、球圆溜溜——差别就在“棱”和“面”上。",
                "（多面体的）面，就是围成立体的一块平面；棱，是两个面相交的线；顶点，是棱与棱相交的点。",
                "拿长方体数一遍：6 个面、12 条棱、8 个顶点。",
                "生活例：魔方有 6 个面；图形例：三棱柱有 5 个面、9 条棱、6 个顶点（自己数一遍）。",
                "反例：球没有棱也没有顶点——别给球数棱！",
                "⚠️ 别搞混：“棱”是线不是面——“这条棱”指的是一条边，不是那一块面。",
                "记住一句话：面是块，棱是线，顶点是点。"
              ],
              examples: [
                { text: "拿起魔方，数出它的 6 个面、12 条棱、8 个顶点", figure: "动手" }
              ],
              prev: "g12-u1-l1-p1",
              next: "g12-u1-l1-p3"
            },
            {
              id: "g12-u1-l1-p3",
              title: "数一数，有惊喜",
              concept: "欧拉公式 V−E+F=2 的发现",
              formulas: [
                {
                  id: "f1",
                  latex: "V - E + F = 2",
                  translation: "顶点数减棱数加面数，凸多面体永远等于 2"
                },
                {
                  id: "f2",
                  latex: "8 - 12 + 6 = 2",
                  translation: "正方体：8 个顶点、12 条棱、6 个面，8 减 12 加 6 等于 2"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：数顶点——正方体 8 个顶点，一个个亮起来。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[60,30],[60,60],[30,60]], color: "line", width: 2.5 },
                        { t: "seg", a: [30,30], b: [60,30], color: "line", width: 2 },
                        { t: "seg", a: [60,30], b: [60,60], color: "line", width: 2 },
                        { t: "seg", a: [60,60], b: [30,60], color: "line", width: 2 },
                        { t: "seg", a: [30,60], b: [30,30], color: "line", width: 2 },
                        { t: "pt", p: [30,30], color: "corrA", r: 4 },
                        { t: "pt", p: [60,30], color: "corrA", r: 4 },
                        { t: "pt", p: [60,60], color: "corrA", r: 4 },
                        { t: "pt", p: [30,60], color: "corrA", r: 4 },
                        { t: "pt", p: [42,42], color: "corrA", r: 4 },
                        { t: "pt", p: [72,42], color: "corrA", r: 4 },
                        { t: "pt", p: [72,72], color: "corrA", r: 4 },
                        { t: "pt", p: [42,72], color: "corrA", r: 4 },
                        { t: "txt", p: [50,88], text: "顶点 V = 8", size: 15, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "第 2 步：数棱——12 条棱，别漏了底面那一圈。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[60,30],[60,60],[30,60]], color: "corrB", width: 3.5 },
                        { t: "seg", a: [42,42], b: [72,42], color: "corrB", width: 3.5 },
                        { t: "seg", a: [72,42], b: [72,72], color: "corrB", width: 3.5 },
                        { t: "seg", a: [72,72], b: [42,72], color: "corrB", width: 3.5 },
                        { t: "seg", a: [42,72], b: [42,42], color: "corrB", width: 3.5 },
                        { t: "seg", a: [30,30], b: [42,42], color: "corrB", width: 3.5 },
                        { t: "seg", a: [60,30], b: [72,42], color: "corrB", width: 3.5 },
                        { t: "seg", a: [60,60], b: [72,72], color: "corrB", width: 3.5 },
                        { t: "seg", a: [30,60], b: [42,72], color: "corrB", width: 3.5 },
                        { t: "txt", p: [50,88], text: "棱 E = 12", size: 15, bold: true, color: "corrB" }
                      ]
                    },
                    {
                      caption: "第 3 步：数面——6 个面：前、后、左、右、上、下。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[60,30],[60,60],[30,60]], color: "corrC", width: 2, fill: "corrC", opacity: 0.3 },
                        { t: "poly", pts: [[42,42],[72,42],[72,72],[42,72]], color: "corrC", width: 2, fill: "corrC", opacity: 0.3 },
                        { t: "poly", pts: [[30,60],[60,60],[72,72],[42,72]], color: "corrC", width: 2, fill: "corrC", opacity: 0.3 },
                        { t: "poly", pts: [[30,30],[60,30],[72,42],[42,42]], color: "corrC", width: 2, fill: "corrC", opacity: 0.3 },
                        { t: "poly", pts: [[30,30],[30,60],[42,72],[42,42]], color: "corrC", width: 2, fill: "corrC", opacity: 0.3 },
                        { t: "poly", pts: [[60,30],[60,60],[72,72],[72,42]], color: "corrC", width: 2, fill: "corrC", opacity: 0.3 },
                        { t: "txt", p: [50,88], text: "面 F = 6", size: 15, bold: true, color: "corrC" }
                      ]
                    },
                    {
                      caption: "第 4 步：算一算——正方体 8−12+6=2；换三棱柱（6 顶点、9 棱、5 面），6−9+5 还是 2！",
                      shapes: [
                        { t: "txt", p: [50,80], text: "8 − 12 + 6 = 2", size: 18, bold: true },
                        { t: "poly", pts: [[28,38],[54,38],[41,58]], color: "line", width: 2.5 },
                        { t: "poly", pts: [[38,48],[64,48],[51,68]], color: "line", width: 2, dash: "5,4" },
                        { t: "seg", a: [28,38], b: [38,48], color: "line", width: 2 },
                        { t: "seg", a: [54,38], b: [64,48], color: "line", width: 2 },
                        { t: "seg", a: [41,58], b: [51,68], color: "line", width: 2 },
                        { t: "txt", p: [50,22], text: "三棱柱：6 − 9 + 5 = 2", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "跟着动画数一遍：正方体 8 个顶点、12 条棱、6 个面。",
                "算一下：8−12+6=2。换三棱柱数：6 个顶点、9 条棱、5 个面，6−9+5 还是 2！",
                "记住这个 2：换一个凸多面体，V−E+F 还是 2——没变的是这个 2。"
              ],
              examples: [
                { text: "骰子就是正方体，拿一颗骰子自己数一遍", figure: "实物" }
              ],
              prev: "g12-u1-l1-p2",
              next: "g12-u1-l1-p4"
            },
            {
              id: "g12-u1-l1-p4",
              title: "欧拉公式：永远的 2",
              pageKind: "explain",
              concept: "欧拉公式 V−E+F=2",
              formulas: [
                {
                  id: "f1",
                  latex: "V - E + F = 2",
                  translation: "顶点数减棱数加面数等于 2（凸多面体欧拉公式）"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "正方体：8 个顶点、12 条棱、6 个面，8−12+6=2。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[60,30],[60,60],[30,60]], color: "line", width: 2.5 },
                        { t: "seg", a: [42,42], b: [72,42], color: "line", width: 2, dash: "5,4" },
                        { t: "seg", a: [42,42], b: [42,72], color: "line", width: 2, dash: "5,4" },
                        { t: "seg", a: [30,30], b: [42,42], color: "line", width: 2, dash: "5,4" },
                        { t: "seg", a: [60,30], b: [72,42], color: "line", width: 2 },
                        { t: "seg", a: [72,42], b: [72,72], color: "line", width: 2 },
                        { t: "seg", a: [42,72], b: [72,72], color: "line", width: 2 },
                        { t: "seg", a: [60,60], b: [72,72], color: "line", width: 2 },
                        { t: "seg", a: [30,60], b: [42,72], color: "line", width: 2 },
                        { t: "txt", p: [50,88], text: "V − E + F = 8 − 12 + 6 = 2", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "三棱柱：6 个顶点、9 条棱、5 个面，6−9+5=2——换了个图形，答案还是 2。",
                      shapes: [
                        { t: "poly", pts: [[28,38],[54,38],[41,58]], color: "line", width: 2.5 },
                        { t: "poly", pts: [[38,48],[64,48],[51,68]], color: "line", width: 2, dash: "5,4" },
                        { t: "seg", a: [28,38], b: [38,48], color: "line", width: 2 },
                        { t: "seg", a: [54,38], b: [64,48], color: "line", width: 2 },
                        { t: "seg", a: [41,58], b: [51,68], color: "line", width: 2 },
                        { t: "txt", p: [50,88], text: "V − E + F = 6 − 9 + 5 = 2", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页你数了正方体（8−12+6=2），又数了三棱柱（6−9+5=2）——换了个图形，答案还是 2。",
                "这就是欧拉公式：V−E+F=2。V 是顶点数，E 是棱数，F 是面数。",
                "两百多年前，数学家欧拉发现：鼓鼓的（凸）多面体算出来都是 2。",
                "生活例：足球 60 个顶点、90 条棱、32 个面，60−90+32=2；图形例：四棱锥 5−8+5=2。",
                "反例：数棱时漏了底面一圈，算出来就不等于 2——错的是数法，不是公式。",
                "⚠️ 别搞混：公式里 E 前面是减号——V−E+F，不是 V+E+F。",
                "记住一句话：凸多面体顶点减棱加面，永远等于 2。"
              ],
              examples: [
                { text: "足球：60 个顶点、90 条棱、32 个面，60−90+32=2", figure: "实物" }
              ],
              prev: "g12-u1-l1-p3",
              next: "g12-u1-l1-p5"
            },
            {
              id: "g12-u1-l1-p5",
              title: "长方体里找平行找垂直",
              concept: "空间中的平行与垂直（直观）",
              formulas: [
                {
                  id: "f1",
                  latex: "AB \\parallel CD",
                  translation: "棱 AB 与棱 CD 平行"
                },
                {
                  id: "f2",
                  latex: "AB \\perp BC",
                  translation: "棱 AB 与棱 BC 垂直"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "seg", a: [25,30], b: [65,30], color: "line", width: 2 },
                    { t: "seg", a: [65,30], b: [65,55], color: "line", width: 2 },
                    { t: "seg", a: [65,55], b: [25,55], color: "line", width: 2 },
                    { t: "seg", a: [25,55], b: [25,30], color: "line", width: 2 },
                    { t: "seg", a: [39,44], b: [79,44], color: "line", width: 2 },
                    { t: "seg", a: [79,44], b: [79,69], color: "line", width: 2 },
                    { t: "seg", a: [79,69], b: [39,69], color: "line", width: 2 },
                    { t: "seg", a: [39,69], b: [39,44], color: "line", width: 2 },
                    { t: "seg", a: [65,55], b: [79,69], color: "aux", width: 2, dash: "5,4" },
                    { t: "seg", a: [25,55], b: [39,69], color: "aux", width: 2, dash: "5,4" },
                    { t: "seg", a: [79,44], b: [79,69], color: "aux", width: 2, dash: "5,4" },
                    { t: "seg", a: [39,44], b: [39,69], color: "aux", width: 2, dash: "5,4" },
                    { t: "seg", a: [25,30], b: [65,30], color: "target", width: 4.5 },
                    { t: "txt", p: [21,28], text: "A", size: 13, bold: true },
                    { t: "txt", p: [69,28], text: "B", size: 13, bold: true },
                    { t: "txt", p: [50,88], text: "红色是棱 AB：点棱，分进两篮", size: 13 }
                  ],
                  groups: [
                    { name: "与 AB 平行的棱", color: "corrA" },
                    { name: "与 AB 垂直的棱（交于一点的）", color: "corrB" }
                  ],
                  items: [
                    { id: "p1", label: "CD", group: 0, anchor: [59,44],
                      shape: { t: "seg", a: [39,44], b: [79,44], color: "corrA", width: 3 } },
                    { id: "p2", label: "A1B1", group: 0, anchor: [45,55],
                      shape: { t: "seg", a: [25,55], b: [65,55], color: "corrA", width: 3 } },
                    { id: "p3", label: "C1D1", group: 0, anchor: [59,69],
                      shape: { t: "seg", a: [39,69], b: [79,69], color: "corrA", width: 3 } },
                    { id: "v1", label: "AD", group: 1, anchor: [32,37],
                      shape: { t: "seg", a: [25,30], b: [39,44], color: "corrB", width: 3 } },
                    { id: "v2", label: "AA1", group: 1, anchor: [25,42],
                      shape: { t: "seg", a: [25,30], b: [25,55], color: "corrB", width: 3 } },
                    { id: "v3", label: "BC", group: 1, anchor: [72,37],
                      shape: { t: "seg", a: [65,30], b: [79,44], color: "corrB", width: 3 } },
                    { id: "v4", label: "BB1", group: 1, anchor: [65,42],
                      shape: { t: "seg", a: [65,30], b: [65,55], color: "corrB", width: 3 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "红色的棱是 AB。点一点：找出所有与 AB 平行的棱，点进“平行”篮。",
                "再找：与 AB 垂直、并且和 AB 交于一点的棱，点进“垂直”篮。",
                "灰色虚线的 4 条棱隔着空间，既不平行也不相交——先不管，以后再说。"
              ],
              examples: [
                { text: "教室的墙角：三条棱两两垂直", figure: "实物" }
              ],
              prev: "g12-u1-l1-p4",
              next: "g12-u1-l1-p6"
            },
            {
              id: "g12-u1-l1-p6",
              title: "平行垂直，看得见",
              pageKind: "explain",
              concept: "空间平行与垂直的直观判断",
              formulas: [
                {
                  id: "f1",
                  latex: "AB \\parallel CD",
                  translation: "AB 与 CD 平行：在同一个面里，永不相交"
                },
                {
                  id: "f2",
                  latex: "AB \\perp BC",
                  translation: "AB 与 BC 垂直：在同一个面里，夹角是 90 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "平行：与 AB 平行的 3 条棱，加上 AB 自己——4 条互相平行。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [65,30], color: "corrA", width: 4 },
                        { t: "seg", a: [39,44], b: [79,44], color: "corrA", width: 4 },
                        { t: "seg", a: [25,55], b: [65,55], color: "corrA", width: 4 },
                        { t: "seg", a: [39,69], b: [79,69], color: "corrA", width: 4 },
                        { t: "seg", a: [25,30], b: [25,55], color: "line", width: 1.5 },
                        { t: "seg", a: [65,30], b: [65,55], color: "line", width: 1.5 },
                        { t: "seg", a: [25,30], b: [39,44], color: "line", width: 1.5 },
                        { t: "seg", a: [65,30], b: [79,44], color: "line", width: 1.5 },
                        { t: "txt", p: [50,88], text: "4 条棱互相平行", size: 14, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "垂直：与 AB 交于一点的 4 条棱，都和 AB 垂直。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [65,30], color: "target", width: 4 },
                        { t: "seg", a: [25,30], b: [25,55], color: "corrB", width: 4 },
                        { t: "seg", a: [25,30], b: [39,44], color: "corrB", width: 4 },
                        { t: "seg", a: [65,30], b: [65,55], color: "corrB", width: 4 },
                        { t: "seg", a: [65,30], b: [79,44], color: "corrB", width: 4 },
                        { t: "right", v: [25,30], p: [65,30], q: [25,55], size: 5, color: "corrB" },
                        { t: "txt", p: [50,88], text: "交于一点，夹角 90°", size: 14, bold: true, color: "corrB" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页你在长方体里找：与 AB 平行的 3 条、垂直（交于一点）的 4 条。",
                "直观判断法：先看“是不是在同一个面里”——在同一个面里，永不相交就是平行，夹角 90° 就是垂直。和平面里学的一样。",
                "生活例：教室墙角三条棱两两垂直；图形例：长方体每条棱有 3 条平行棱、4 条相交垂直棱。",
                "反例：立体里“不相交”不一定平行——隔着空间的两条棱也可能不相交，以后会正名！",
                "⚠️ 别搞混：垂直不一定非要相交——隔着空间的垂直以后再说，现在只认“交于一点”的垂直。",
                "记住一句话：先找同面，再看平行垂直。"
              ],
              examples: [
                { text: "书本的 12 条棱：每条都有 3 条平行棱", figure: "实物" }
              ],
              prev: "g12-u1-l1-p5",
              next: "g12-u1-l2-p1"
            }
          ]
        },
        /* ============ g12.1.2 三视图（4 页） ============ */
        {
          id: "g12-u1-l2",
          title: "三视图",
          pages: [
            {
              id: "g12-u1-l2-p1",
              title: "三束光，三个影子",
              concept: "三视图：主视图、左视图、俯视图",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{主视图，从前看}",
                  translation: "从前面看物体得到的图形叫主视图"
                },
                {
                  id: "f2",
                  latex: "\\text{左视图，从左看}",
                  translation: "从左面看物体得到的图形叫左视图"
                },
                {
                  id: "f3",
                  latex: "\\text{俯视图，从上看}",
                  translation: "从上面看物体得到的图形叫俯视图"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 束光：从前面直直照过去，墙上留下主视图。",
                      shapes: [
                        { t: "poly", pts: [[18,40],[38,40],[38,60],[18,60]], color: "known", width: 3 },
                        { t: "seg", a: [38,44], b: [58,44], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [38,50], b: [58,50], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [38,56], b: [58,56], color: "aux", width: 2, dash: "5,4" },
                        { t: "poly", pts: [[62,38],[86,38],[86,62],[62,62]], color: "target", width: 2.5, fill: "target", opacity: 0.2 },
                        { t: "txt", p: [74,72], text: "主视图", size: 14, bold: true, color: "target" },
                        { t: "txt", p: [50,88], text: "光从前面来，直直照过去", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 束光：从左面直直照过去，墙上留下左视图。",
                      shapes: [
                        { t: "poly", pts: [[62,40],[82,40],[82,60],[62,60]], color: "known", width: 3 },
                        { t: "seg", a: [62,44], b: [42,44], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [62,50], b: [42,50], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [62,56], b: [42,56], color: "aux", width: 2, dash: "5,4" },
                        { t: "poly", pts: [[18,38],[38,38],[38,62],[18,62]], color: "target", width: 2.5, fill: "target", opacity: 0.2 },
                        { t: "txt", p: [28,72], text: "左视图", size: 14, bold: true, color: "target" },
                        { t: "txt", p: [50,88], text: "光从左面来，直直照过去", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 束光：从上面直直照过去，地上留下俯视图。",
                      shapes: [
                        { t: "poly", pts: [[38,48],[62,48],[62,68],[38,68]], color: "known", width: 3 },
                        { t: "seg", a: [42,48], b: [42,28], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [50,48], b: [50,28], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [58,48], b: [58,28], color: "aux", width: 2, dash: "5,4" },
                        { t: "poly", pts: [[36,12],[64,12],[64,24],[36,24]], color: "target", width: 2.5, fill: "target", opacity: 0.2 },
                        { t: "txt", p: [50,36], text: "俯视图", size: 14, bold: true, color: "target" },
                        { t: "txt", p: [50,88], text: "光从上面来，直直照过去", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点▶：三束光从前、左、上三个方向直直照过去，留下三个影子。",
                "这三个影子就是三视图：主视图（从前看）、左视图（从左看）、俯视图（从上看）。",
                "记住：光是直直照过去的，不斜照——看到几层就是几层。"
              ],
              examples: [
                { text: "工程图纸就是按三视图画的", figure: "实物" }
              ],
              prev: "g12-u1-l1-p6",
              next: "g12-u1-l2-p2"
            },
            {
              id: "g12-u1-l2-p2",
              title: "三个视图各看什么",
              pageKind: "explain",
              concept: "主视图、左视图、俯视图的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{主视图} + \\text{左视图} + \\text{俯视图}",
                  translation: "三个视图合起来，才能确定物体的形状"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "主视图：从前看——左边 2 层，右边 1 层。",
                      shapes: [
                        { t: "poly", pts: [[30,40],[54,40],[54,52],[42,52],[42,64],[30,64]], color: "target", width: 2.5 },
                        { t: "seg", a: [42,52], b: [54,52], color: "target", width: 1.5 },
                        { t: "txt", p: [50,80], text: "主视图：左 2 层、右 1 层", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "左视图：从左看——一列 2 层。",
                      shapes: [
                        { t: "poly", pts: [[38,40],[50,40],[50,64],[38,64]], color: "target", width: 2.5 },
                        { t: "seg", a: [38,52], b: [50,52], color: "target", width: 1.5 },
                        { t: "txt", p: [50,80], text: "左视图：一列 2 层", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "俯视图：从上看——横着 2 格。",
                      shapes: [
                        { t: "poly", pts: [[30,44],[54,44],[54,56],[30,56]], color: "target", width: 2.5 },
                        { t: "seg", a: [42,44], b: [42,56], color: "target", width: 1.5 },
                        { t: "txt", p: [50,80], text: "俯视图：横着 2 格", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？三束光留下三个影子：从前看是主视图，从左看是左视图，从上看是俯视图。",
                "一个视图不够：只看俯视图，一个圆柱和一个球看起来都是圆。三个视图合起来，形状才定得下来。",
                "生活例：体检拍片要拍正位和侧位；图形例：组合体三个视图各数“几层几列”。",
                "反例：左视图是从左“看”到的影子，不是物体左边的东西！",
                "⚠️ 别搞混：左视图是“从左往右看”，别站到右边去看。",
                "记住一句话：前主、左左、上俯，三个影子定形状。"
              ],
              examples: [
                { text: "用 3 个骰子搭组合体，自己画它的三视图", figure: "动手" }
              ],
              prev: "g12-u1-l2-p1",
              next: "g12-u1-l2-p3"
            },
            {
              id: "g12-u1-l2-p3",
              title: "口诀：长对正高平齐",
              pageKind: "explain",
              concept: "三视图口诀：长对正、高平齐、宽相等",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{长对正，主俯}",
                  translation: "主视图和俯视图，左右的长要对正"
                },
                {
                  id: "f2",
                  latex: "\\text{高平齐，主左}",
                  translation: "主视图和左视图，上下的高要平齐"
                },
                {
                  id: "f3",
                  latex: "\\text{宽相等，左俯}",
                  translation: "左视图和俯视图，前后的宽要相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "长对正：主视图和俯视图，左右的长对正——画两条对齐线检查。",
                      shapes: [
                        { t: "poly", pts: [[28,52],[56,52],[56,72],[28,72]], color: "known", width: 2.5 },
                        { t: "poly", pts: [[28,20],[56,20],[56,34],[28,34]], color: "known", width: 2.5 },
                        { t: "seg", a: [28,18], b: [28,74], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [56,18], b: [56,74], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "txt", p: [42,44], text: "主", size: 13 },
                        { t: "txt", p: [42,28], text: "俯", size: 13 },
                        { t: "txt", p: [50,88], text: "长对正：主俯", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "高平齐：主视图和左视图，上下的高平齐。",
                      shapes: [
                        { t: "poly", pts: [[20,40],[44,40],[44,64],[20,64]], color: "known", width: 2.5 },
                        { t: "poly", pts: [[56,40],[76,40],[76,64],[56,64]], color: "known", width: 2.5 },
                        { t: "seg", a: [18,40], b: [78,40], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [18,64], b: [78,64], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "txt", p: [32,53], text: "主", size: 13 },
                        { t: "txt", p: [66,53], text: "左", size: 13 },
                        { t: "txt", p: [50,88], text: "高平齐：主左", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "宽相等：左视图和俯视图，前后的宽相等。",
                      shapes: [
                        { t: "poly", pts: [[28,44],[48,44],[48,64],[28,64]], color: "known", width: 2.5 },
                        { t: "poly", pts: [[58,44],[78,44],[78,64],[58,64]], color: "known", width: 2.5 },
                        { t: "txt", p: [38,55], text: "左", size: 13 },
                        { t: "txt", p: [68,55], text: "俯", size: 13 },
                        { t: "txt", p: [50,80], text: "宽相等：左俯", size: 14, bold: true },
                        { t: "txt", p: [50,88], text: "（前后方向的宽一样）", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？三个视图各就各位后，它们之间还有“对暗号”的规矩——这就是画三视图的口诀。",
                "长对正：主视图和俯视图，左右的长要对正；高平齐：主视图和左视图，上下的高要平齐；宽相等：左视图和俯视图，前后的宽要相等。",
                "生活例：拼积木按图纸，左右对不齐就拼歪了；图形例：画对齐线检查谁和谁对。",
                "反例：主视图画得比俯视图长——“长”没对正，图就错了。",
                "⚠️ 别搞混：是“主俯长、主左高、左俯宽”配对，别张冠李戴。",
                "记住一句话：长对正，高平齐，宽相等。"
              ],
              examples: [
                { text: "画长方体的三视图，用尺子检查三组对齐", figure: "动手" }
              ],
              prev: "g12-u1-l2-p2",
              next: "g12-u1-l2-p4"
            },
            {
              id: "g12-u1-l2-p4",
              title: "你能认出三个视图吗",
              concept: "三视图辨认",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{主视图} \\neq \\text{左视图}",
                  translation: "同一个物体，主视图和左视图常常不一样"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "poly", pts: [[20,14],[32,14],[32,26],[20,26]], color: "known", width: 2 },
                    { t: "poly", pts: [[32,14],[44,14],[44,26],[32,26]], color: "known", width: 2 },
                    { t: "poly", pts: [[20,26],[32,26],[32,38],[20,38]], color: "known", width: 2 },
                    { t: "txt", p: [50,88], text: "组合体：下面 2 个、上面 1 个（在左上）", size: 12 },
                    { t: "txt", p: [50,80], text: "点小图，分进四个篮子", size: 13 }
                  ],
                  groups: [
                    { name: "主视图", color: "corrA" },
                    { name: "左视图", color: "corrB" },
                    { name: "俯视图", color: "corrC" },
                    { name: "干扰项", color: "aux" }
                  ],
                  items: [
                    { id: "m1", label: "图1", group: 0, anchor: [32,60],
                      shape: { t: "poly", pts: [[20,52],[44,52],[44,64],[32,64],[32,76],[20,76]], color: "corrA", width: 2.5 } },
                    { id: "m2", label: "图2", group: 3, anchor: [68,60],
                      shape: { t: "poly", pts: [[56,52],[80,52],[80,76],[68,76],[68,64],[56,64]], color: "line", width: 2.5 } },
                    { id: "l1", label: "图3", group: 1, anchor: [32,36],
                      shape: { t: "poly", pts: [[26,28],[38,28],[38,52],[26,52]], color: "corrB", width: 2.5 } },
                    { id: "l2", label: "图4", group: 3, anchor: [68,36],
                      shape: { t: "poly", pts: [[62,40],[74,40],[74,52],[62,52]], color: "line", width: 2.5 } },
                    { id: "t1", label: "图5", group: 2, anchor: [32,18],
                      shape: { t: "poly", pts: [[20,12],[44,12],[44,24],[20,24]], color: "corrC", width: 2.5 } },
                    { id: "t2", label: "图6", group: 3, anchor: [68,18],
                      shape: { t: "poly", pts: [[62,6],[74,6],[74,30],[62,30]], color: "line", width: 2.5 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "上面 6 张小图，把它们点进四个篮子：主视图、左视图、俯视图各一张是对的，另三张是干扰项。",
                "点之前先在心里从三个方向看一遍组合体：主视图左高右低，左视图一列两层，俯视图横向两格。",
                "点完对照答案：图1 主视图、图3 左视图、图5 俯视图；图2、图4、图6 是干扰项。"
              ],
              examples: [
                { text: "答案：图1 是主视图，图3 是左视图，图5 是俯视图；图2、图4、图6 进干扰项篮", figure: "核对答案" }
              ],
              prev: "g12-u1-l2-p3",
              next: "g12-u1-l3-p1"
            }
          ]
        },        /* ============ g12.1.3 展开图（6 页） ============ */
        {
          id: "g12-u1-l3",
          title: "展开图",
          pages: [
            {
              id: "g12-u1-l3-p1",
              title: "剥开，再折回去",
              concept: "展开图与折叠（可逆）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{立体剥开展平} \\to \\text{展开图}",
                  translation: "把立体沿着棱剪开、摊平，就得到展开图"
                }
              ],
              interaction: {
                type: "net-fold",
                params: {
                  /* G8 技术验证页：正方体“一四一”展开图 ↔ 折叠。
                   * 提案 schema（待蓝队冻结）：net=展开图多边形 / foldSequence=折叠轴序列 /
                   * views=固定视角档位。蓝队实现并注册 net-fold 后，本页方可渲染。 */
                  net: [
                    { id: "F1", pts: [[30,50],[40,50],[40,60],[30,60]] },
                    { id: "F2", pts: [[40,50],[50,50],[50,60],[40,60]] },
                    { id: "F3", pts: [[50,50],[60,50],[60,60],[50,60]] },
                    { id: "F4", pts: [[60,50],[70,50],[70,60],[60,60]] },
                    { id: "F5", pts: [[40,60],[50,60],[50,70],[40,70]] },
                    { id: "F6", pts: [[40,40],[50,40],[50,50],[40,50]] }
                  ],
                  foldSequence: [
                    { face: "F5", edge: [[40,60],[50,60]], angle: 90 },
                    { face: "F6", edge: [[40,50],[50,50]], angle: 90 },
                    { face: "F1", edge: [[40,50],[40,60]], angle: 90 },
                    { face: "F4", edge: [[60,50],[60,60]], angle: 90 },
                    { face: "F3", edge: [[50,50],[50,60]], angle: 90 }
                  ],
                  views: ["iso", "front", "top"],
                  autoplay: true,
                  reversible: true
                }
              },
              auxInteraction: null,
              hints: [
                "点▶：正方体被“剥开”，6 个面摊平成一张图——这就是展开图。",
                "再点“折回去”：6 个面沿着棱折起来，又变回正方体。展开和折叠可逆。",
                "本页是技术验证页：先走通这一个折叠，11 种分类后面慢慢来。"
              ],
              examples: [
                { text: "快递纸箱压扁就是展开图，撑开就是立体", figure: "实物" }
              ],
              prev: "g12-u1-l2-p4",
              next: "g12-u1-l3-p2"
            },
            {
              id: "g12-u1-l3-p2",
              title: "展开图：把立体剥开",
              pageKind: "explain",
              concept: "展开图的概念",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{表面积} = \\text{展开图面积}",
                  translation: "立体的表面积就是它的展开图的面积"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "纸盒压扁：沿着棱剪开、摊平——立体变平面，这就是展开图。",
                      shapes: [
                        { t: "poly", pts: [[24,44],[44,44],[44,64],[24,64]], color: "line", width: 2.5 },
                        { t: "seg", a: [44,50], b: [58,50], color: "aux", width: 2, dash: "5,4", arrows: 1 },
                        { t: "poly", pts: [[64,50],[74,50],[74,60],[64,60]], color: "target", width: 2 },
                        { t: "poly", pts: [[74,50],[84,50],[84,60],[74,60]], color: "target", width: 2 },
                        { t: "poly", pts: [[84,50],[94,50],[94,60],[84,60]], color: "target", width: 2 },
                        { t: "txt", p: [50,84], text: "沿着棱剪开 → 摊平", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页正方体被剥开，6 个正方形摊平成一张图——那张图就是展开图。",
                "展开图，就是把立体沿着棱剪开、摊平得到的平面图。反过来，把展开图沿折痕折起来、粘好，就回到立体。",
                "生活例：牛奶盒剪开摊平；图形例：圆柱展开图是两个圆加一个长方形（g11 学过）。",
                "反例：“田”字形折起来有两块重叠——它不是正方体的展开图！",
                "⚠️ 别搞混：展开图是“剪开展平”，三视图是“光照影子”——一个动手拆，一个站着看。",
                "记住一句话：展开图是立体的“平面分身”。"
              ],
              examples: [
                { text: "找个小纸盒，沿着棱剪开摊平，看看它的展开图", figure: "动手" }
              ],
              prev: "g12-u1-l3-p1",
              next: "g12-u1-l3-p3"
            },
            {
              id: "g12-u1-l3-p3",
              title: "“一四一”：6 种",
              concept: "正方体展开图分类：一四一型",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{一四一，共} 6 \\text{种}",
                  translation: "中间 4 个一排、上下各 1 个的展开图，一共有 6 种"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 种：上块贴在第 1 个上面，下块贴在第 1 个下面——上下同列。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[54,46],[62,46],[62,54],[54,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[30,54],[38,54],[38,62],[30,62]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[30,38],[38,38],[38,46],[30,46]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,80], text: "上 1、下 1", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 种：上块贴第 1 个，下块贴第 2 个——错开一格。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[54,46],[62,46],[62,54],[54,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[30,54],[38,54],[38,62],[30,62]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[38,38],[46,38],[46,46],[38,46]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,80], text: "上 1、下 2", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 种：上块贴第 1 个，下块贴第 3 个。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[54,46],[62,46],[62,54],[54,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[30,54],[38,54],[38,62],[30,62]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[46,38],[54,38],[54,46],[46,46]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,80], text: "上 1、下 3", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 4 种：上块贴第 1 个，下块贴第 4 个——拉到最开。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[54,46],[62,46],[62,54],[54,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[30,54],[38,54],[38,62],[30,62]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[54,38],[62,38],[62,46],[54,46]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,80], text: "上 1、下 4", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 5 种：上块贴第 2 个，下块也贴第 2 个——上下同列（居中）。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[54,46],[62,46],[62,54],[54,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,54],[46,54],[46,62],[38,62]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[38,38],[46,38],[46,46],[38,46]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,80], text: "上 2、下 2", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 6 种：上块贴第 2 个，下块贴第 3 个——“一四一”收官。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[54,46],[62,46],[62,54],[54,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,54],[46,54],[46,62],[38,62]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[46,38],[54,38],[54,46],[46,46]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,80], text: "上 2、下 3", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一页看 6 种“一四一”：中间 4 个一排，上下各 1 个。",
                "点▶一步步看：上下两块贴在第几个上，6 种全在这里。",
                "数一数：真是 6 种，不多不少——后面三类加起来 5 种，一共 11 种。"
              ],
              examples: [
                { text: "拿 6 张小纸片，摆出这 6 种“一四一”", figure: "动手" }
              ],
              prev: "g12-u1-l3-p2",
              next: "g12-u1-l3-p4"
            },
            {
              id: "g12-u1-l3-p4",
              title: "剩下 5 种长这样",
              concept: "正方体展开图分类：二三一/二二二/三三型",
              formulas: [
                {
                  id: "f1",
                  latex: "6 + 3 + 1 + 1 = 11",
                  translation: "一四一 6 种、二三一 3 种、二二二 1 种、三三 1 种，一共 11 种"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "“二三一”第 1 种：中间 3 个一排，左头 2 个贴下边、右头 1 个也贴下边。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[22,46],[30,46],[30,54],[22,54]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[22,54],[30,54],[30,62],[22,62]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[46,54],[54,54],[54,62],[46,62]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,80], text: "二三一：第 1 种", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "“二三一”第 2 种：“2 个”的那头换个贴法——叠到上面去。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[22,46],[30,46],[30,54],[22,54]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[22,38],[30,38],[30,46],[22,46]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[46,54],[54,54],[54,62],[46,62]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,80], text: "二三一：第 2 种", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "“二三一”第 3 种：“1 个”贴在首格旁边，和“2 个”拼出一个 2×2 小块。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "line", width: 2 },
                        { t: "poly", pts: [[22,46],[30,46],[30,54],[22,54]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[22,54],[30,54],[30,62],[22,62]], color: "target", width: 2.5 },
                        { t: "poly", pts: [[30,54],[38,54],[38,62],[30,62]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,80], text: "二三一：第 3 种", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "“二二二”：像台阶一样，3 排各 2 个错开——只有 1 种。",
                      shapes: [
                        { t: "poly", pts: [[34,50],[42,50],[42,58],[34,58]], color: "line", width: 2 },
                        { t: "poly", pts: [[42,50],[50,50],[50,58],[42,58]], color: "line", width: 2 },
                        { t: "poly", pts: [[42,42],[50,42],[50,50],[42,50]], color: "line", width: 2 },
                        { t: "poly", pts: [[50,42],[58,42],[58,50],[50,50]], color: "line", width: 2 },
                        { t: "poly", pts: [[50,34],[58,34],[58,42],[50,42]], color: "line", width: 2 },
                        { t: "poly", pts: [[58,34],[66,34],[66,42],[58,42]], color: "line", width: 2 },
                        { t: "txt", p: [50,80], text: "二二二：1 种", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "“三三”：两个“3 块”上下错开，像字母 Z——只有 1 种。",
                      shapes: [
                        { t: "poly", pts: [[28,58],[36,58],[36,66],[28,66]], color: "line", width: 2 },
                        { t: "poly", pts: [[36,58],[44,58],[44,66],[36,66]], color: "line", width: 2 },
                        { t: "poly", pts: [[44,58],[52,58],[52,66],[44,66]], color: "line", width: 2 },
                        { t: "poly", pts: [[36,50],[44,50],[44,58],[36,58]], color: "line", width: 2 },
                        { t: "poly", pts: [[44,50],[52,50],[52,58],[44,58]], color: "line", width: 2 },
                        { t: "poly", pts: [[52,50],[60,50],[60,58],[52,58]], color: "line", width: 2 },
                        { t: "txt", p: [50,80], text: "三三：1 种", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点▶看剩下 5 种：“二三一”3 种、“二二二”1 种、“三三”1 种。",
                "分类看长相：中间 3 个一排叫“二三一”，台阶叫“二二二”，错开的两个三块叫“三三”。",
                "6+3+1+1=11——正方体的展开图一共 11 种，全齐了。"
              ],
              examples: [
                { text: "11 种里找一找：有没有“田”字形？没有——它折不成", figure: "观察" }
              ],
              prev: "g12-u1-l3-p3",
              next: "g12-u1-l3-p5"
            },
            {
              id: "g12-u1-l3-p5",
              title: "“田”字形，折不成",
              concept: "展开图反例：田字形",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{田字形} \\neq \\text{展开图}",
                  translation: "田字形折起来有两块重叠，不是正方体的展开图"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：“田”字形——6 个正方形，2 排 3 列，排得整整齐齐。",
                      shapes: [
                        { t: "poly", pts: [[32,40],[44,40],[44,52],[32,52]], color: "line", width: 2 },
                        { t: "poly", pts: [[44,40],[56,40],[56,52],[44,52]], color: "line", width: 2 },
                        { t: "poly", pts: [[56,40],[68,40],[68,52],[56,52]], color: "line", width: 2 },
                        { t: "poly", pts: [[32,52],[44,52],[44,64],[32,64]], color: "line", width: 2 },
                        { t: "poly", pts: [[44,52],[56,52],[56,64],[44,64]], color: "line", width: 2 },
                        { t: "poly", pts: [[56,52],[68,52],[68,64],[56,64]], color: "line", width: 2 },
                        { t: "txt", p: [50,80], text: "“田”字形：6 个正方形", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：试着折——上下两排往中间合。",
                      shapes: [
                        { t: "poly", pts: [[32,40],[44,40],[44,52],[32,52]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[44,40],[56,40],[56,52],[44,52]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[56,40],[68,40],[68,52],[56,52]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[32,52],[44,52],[44,64],[32,64]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[44,52],[56,52],[56,64],[44,64]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[56,52],[68,52],[68,64],[56,64]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [32,52], b: [68,52], color: "target", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,80], text: "沿中间这条线对折", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：糟了！两块正方形抢同一个面——“田”字形折不成正方体。",
                      shapes: [
                        { t: "poly", pts: [[32,40],[44,40],[44,52],[32,52]], color: "target", width: 2.5, fill: "target", opacity: 0.35 },
                        { t: "poly", pts: [[32,40],[44,40],[44,52],[32,52]], color: "corrB", width: 2.5, fill: "corrB", opacity: 0.35 },
                        { t: "txt", p: [50,66], text: "❌ 两块重叠了", size: 16, bold: true, color: "target" },
                        { t: "txt", p: [50,80], text: "“田”字形不是展开图", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "6 个正方形拼在一起，不一定都是展开图——“田”字形就是反例。",
                "点▶看它怎么失败：折到最后，两块正方形抢同一个面，重叠了。",
                "判断小窍门：折的时候心里“合”一下，有重叠的就不是展开图。"
              ],
              examples: [
                { text: "剪个“田”字形纸片，亲手折一次就信了", figure: "动手" }
              ],
              prev: "g12-u1-l3-p4",
              next: "g12-u1-l3-p6"
            },
            {
              id: "g12-u1-l3-p6",
              title: "口诀：141、231、222、33",
              pageKind: "explain",
              concept: "正方体展开图口诀",
              formulas: [
                {
                  id: "f1",
                  latex: "6 + 3 + 1 + 1 = 11",
                  translation: "四类展开图加起来，一共 11 种"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第一类“一四一”：中间 4 个一排、上下各 1 个——6 种。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[54,46],[62,46],[62,54],[54,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[38,54],[46,54],[46,62],[38,62]], color: "known", width: 2 },
                        { t: "poly", pts: [[38,38],[46,38],[46,46],[38,46]], color: "known", width: 2 },
                        { t: "txt", p: [50,80], text: "一四一：6 种", size: 15, bold: true }
                      ]
                    },
                    {
                      caption: "第二类“二三一”：中间 3 个一排——3 种。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[22,46],[30,46],[30,54],[22,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[22,54],[30,54],[30,62],[22,62]], color: "known", width: 2 },
                        { t: "poly", pts: [[46,54],[54,54],[54,62],[46,62]], color: "known", width: 2 },
                        { t: "txt", p: [50,80], text: "二三一：3 种", size: 15, bold: true }
                      ]
                    },
                    {
                      caption: "第三类“二二二”（台阶）和第四类“三三”（Z 形）——各 1 种。",
                      shapes: [
                        { t: "poly", pts: [[34,50],[42,50],[42,58],[34,58]], color: "known", width: 2 },
                        { t: "poly", pts: [[42,50],[50,50],[50,58],[42,58]], color: "known", width: 2 },
                        { t: "poly", pts: [[42,42],[50,42],[50,50],[42,50]], color: "known", width: 2 },
                        { t: "poly", pts: [[50,42],[58,42],[58,50],[50,50]], color: "known", width: 2 },
                        { t: "poly", pts: [[50,34],[58,34],[58,42],[50,42]], color: "known", width: 2 },
                        { t: "poly", pts: [[58,34],[66,34],[66,42],[58,42]], color: "known", width: 2 },
                        { t: "txt", p: [50,80], text: "二二二：1 种；三三：1 种", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "不在 11 种里的：“田”字形、“凹”字形——折起来会重叠，靠边站。",
                      shapes: [
                        { t: "poly", pts: [[32,40],[44,40],[44,52],[32,52]], color: "line", width: 2 },
                        { t: "poly", pts: [[44,40],[56,40],[56,52],[44,52]], color: "line", width: 2 },
                        { t: "poly", pts: [[56,40],[68,40],[68,52],[56,52]], color: "line", width: 2 },
                        { t: "poly", pts: [[32,52],[44,52],[44,64],[32,64]], color: "line", width: 2 },
                        { t: "poly", pts: [[44,52],[56,52],[56,64],[44,64]], color: "line", width: 2 },
                        { t: "poly", pts: [[56,52],[68,52],[68,64],[56,64]], color: "line", width: 2 },
                        { t: "txt", p: [50,78], text: "❌ 田、凹靠边站", size: 15, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？11 种展开图分四类：“一四一”6 种、“二三一”3 种、“二二二”1 种、“三三”1 种。",
                "口诀就念数字：141、231、222、33——念的是“中间一排几个”。141 就是中间 4 个一排、上下各 1 个。",
                "生活例：纸箱厂下料就按这 11 种排版；图形例：“二二二”像台阶、“三三”像字母 Z。",
                "反例：“田”字形和“凹”字形不在 11 种里——折起来会重叠。",
                "⚠️ 别搞混：口诀记的是“形状分类”，不是“折法”——同属“一四一”的 6 种，折法各不相同。",
                "记住一句话：一四一六种，二三一三种，田凹靠边站。"
              ],
              examples: [
                { text: "默写口诀 141、231、222、33，再画出每类的代表图", figure: "动手" }
              ],
              prev: "g12-u1-l3-p5",
              next: "g12-u1-l4-p1"
            }
          ]
        },        /* ============ g12.1.4 截面（4 页） ============ */
        {
          id: "g12-u1-l4",
          title: "截面",
          pages: [
            {
              id: "g12-u1-l4-p1",
              title: "切一切，截面现形",
              concept: "截面：平面截立体",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{截面，就是切出来的面}",
                  translation: "用平面去截立体，截出的那个面叫截面"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 刀：斜着切掉一个角——切过 3 个面，截面是三角形。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[60,30],[60,60],[30,60]], color: "line", width: 2 },
                        { t: "seg", a: [42,42], b: [72,42], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [72,42], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [42,72], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [30,30], b: [42,42], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [60,30], b: [72,42], color: "line", width: 1.5 },
                        { t: "seg", a: [60,60], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [30,60], b: [42,72], color: "line", width: 1.5 },
                        { t: "poly", pts: [[60,38],[52,30],[60,30]], color: "target", width: 2.5, fill: "target", opacity: 0.4 },
                        { t: "txt", p: [50,88], text: "切 3 个面 → 三角形", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 2 刀：竖着切——切过 4 个面，截面是四边形（长方形）。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[60,30],[60,60],[30,60]], color: "line", width: 2 },
                        { t: "seg", a: [42,42], b: [72,42], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [72,42], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [42,72], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [30,30], b: [42,42], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [60,30], b: [72,42], color: "line", width: 1.5 },
                        { t: "seg", a: [60,60], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [30,60], b: [42,72], color: "line", width: 1.5 },
                        { t: "poly", pts: [[44,30],[56,30],[68,42],[56,42]], color: "target", width: 2.5, fill: "target", opacity: 0.4 },
                        { t: "txt", p: [50,88], text: "切 4 个面 → 四边形", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 刀：斜着切过 5 个面——截面是五边形。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[60,30],[60,60],[30,60]], color: "line", width: 2 },
                        { t: "seg", a: [42,42], b: [72,42], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [72,42], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [42,72], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [30,30], b: [42,42], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [60,30], b: [72,42], color: "line", width: 1.5 },
                        { t: "seg", a: [60,60], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [30,60], b: [42,72], color: "line", width: 1.5 },
                        { t: "poly", pts: [[52,30],[68,36],[72,54],[60,68],[44,62]], color: "target", width: 2.5, fill: "target", opacity: 0.4 },
                        { t: "txt", p: [50,88], text: "切 5 个面 → 五边形", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 刀：角度再刁一点，6 个面全切到——截面是六边形。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[60,30],[60,60],[30,60]], color: "line", width: 2 },
                        { t: "seg", a: [42,42], b: [72,42], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [72,42], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [42,72], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [30,30], b: [42,42], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [60,30], b: [72,42], color: "line", width: 1.5 },
                        { t: "seg", a: [60,60], b: [72,72], color: "line", width: 1.5 },
                        { t: "seg", a: [30,60], b: [42,72], color: "line", width: 1.5 },
                        { t: "poly", pts: [[48,30],[66,34],[74,50],[66,66],[48,70],[40,54]], color: "target", width: 2.5, fill: "target", opacity: 0.4 },
                        { t: "txt", p: [50,88], text: "切 6 个面 → 六边形", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "把正方体当西瓜，点▶看四刀：三角形、四边形、五边形、六边形截面。",
                "截面就是“切出来的那个面”——刀是平面，切口就是截面。",
                "注意每刀切过了几个面：3 个面→三角形，4 个面→四边形……"
              ],
              examples: [
                { text: "拿橡皮当正方体，用塑料刀切一切", figure: "动手" }
              ],
              prev: "g12-u1-l3-p6",
              next: "g12-u1-l4-p2"
            },
            {
              id: "g12-u1-l4-p2",
              title: "三角、四边形怎么切",
              pageKind: "explain",
              concept: "三角形截面与四边形截面",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{切 3 个面} \\to \\text{三角形}",
                  translation: "平面切过 3 个面，截面是三角形"
                },
                {
                  id: "f2",
                  latex: "\\text{切 4 个面} \\to \\text{四边形}",
                  translation: "平面切过 4 个面，截面是四边形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "三角形截面：斜切掉一个角，刀切过 3 个面。",
                      shapes: [
                        { t: "poly", pts: [[30,34],[52,34],[41,54]], color: "target", width: 3, fill: "target", opacity: 0.3 },
                        { t: "txt", p: [50,80], text: "切 3 个面 → 三角形", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "四边形截面：竖着切，刀切过 4 个面（长方形）。",
                      shapes: [
                        { t: "poly", pts: [[34,34],[54,34],[54,62],[34,62]], color: "target", width: 3, fill: "target", opacity: 0.3 },
                        { t: "txt", p: [50,80], text: "切 4 个面 → 四边形", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？第 1 刀斜切掉一个角，切过 3 个面——截面是三角形；第 2 刀竖切，切过 4 个面——截面是四边形。",
                "规律：截面有几条边，刀就切过了几个面。切 3 个面得三角形，切 4 个面得四边形。",
                "生活例：切西瓜先切掉一角，切口是三角形；图形例：竖切正方体，切口是长方形。",
                "反例：想一刀切出五边形？只切 3、4 个面可不够——边数不够。",
                "⚠️ 别搞混：截面是“切口那个面”，不是被切掉的那一块。",
                "记住一句话：几条边就是切过几个面。"
              ],
              examples: [
                { text: "竖切橡皮，看看切口是不是长方形", figure: "动手" }
              ],
              prev: "g12-u1-l4-p1",
              next: "g12-u1-l4-p3"
            },
            {
              id: "g12-u1-l4-p3",
              title: "五边形、六边形登场",
              pageKind: "explain",
              concept: "五边形截面与六边形截面",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{切 5 个面} \\to \\text{五边形}",
                  translation: "平面切过 5 个面，截面是五边形"
                },
                {
                  id: "f2",
                  latex: "\\text{切 6 个面} \\to \\text{六边形}",
                  translation: "平面切过 6 个面，截面是六边形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "五边形截面：刀斜一点，切过 5 个面。",
                      shapes: [
                        { t: "poly", pts: [[50,32],[66,38],[70,54],[58,68],[42,62]], color: "target", width: 3, fill: "target", opacity: 0.3 },
                        { t: "txt", p: [50,82], text: "切 5 个面 → 五边形", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "六边形截面：6 个面全切到——这是正方体截面的“天花板”。",
                      shapes: [
                        { t: "poly", pts: [[46,32],[64,36],[72,52],[64,68],[46,72],[38,56]], color: "target", width: 3, fill: "target", opacity: 0.3 },
                        { t: "txt", p: [50,84], text: "切 6 个面 → 六边形", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？第 3 刀斜着切过 5 个面——五边形；第 4 刀角度更刁，切过 6 个面——六边形。",
                "想切出更多边，刀就要“照顾”到更多面：五边形要切 5 个面，六边形 6 个面全切到。",
                "生活例：钻石的切面；图形例：六个面全切到时切口最正（正六边形）。",
                "反例：想切出七边形？正方体只有 6 个面——没面可切了！",
                "⚠️ 别搞混：六边形截面不一定是正六边形——刀歪一点，六边形就歪一点。",
                "记住一句话：面数封顶，边数也封顶。"
              ],
              examples: [
                { text: "斜切橡皮试试：能切出五边形吗", figure: "动手" }
              ],
              prev: "g12-u1-l4-p2",
              next: "g12-u1-l4-p4"
            },
            {
              id: "g12-u1-l4-p4",
              title: "截面规律一句话",
              pageKind: "explain",
              concept: "截面边数规律",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{截面边数} = \\text{切到的面数}",
                  translation: "截面的边数等于平面切到的面的个数"
                },
                {
                  id: "f2",
                  latex: "\\text{正方体截面} \\leq 6 \\text{条边}",
                  translation: "正方体的截面最多 6 条边"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "四种截面排排站：边数 3、4、5、6——正好等于切到的面数。",
                      shapes: [
                        { t: "poly", pts: [[14,40],[26,40],[20,52]], color: "target", width: 2.5 },
                        { t: "txt", p: [20,62], text: "3 边", size: 12, bold: true },
                        { t: "poly", pts: [[34,40],[46,40],[46,52],[34,52]], color: "target", width: 2.5 },
                        { t: "txt", p: [40,62], text: "4 边", size: 12, bold: true },
                        { t: "poly", pts: [[58,40],[68,44],[66,54],[56,54],[52,46]], color: "target", width: 2.5 },
                        { t: "txt", p: [60,62], text: "5 边", size: 12, bold: true },
                        { t: "poly", pts: [[76,40],[86,44],[86,54],[76,58],[70,52]], color: "target", width: 2.5 },
                        { t: "txt", p: [78,62], text: "6 边", size: 12, bold: true },
                        { t: "txt", p: [50,80], text: "边数 = 切到的面数", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？四刀切出三角、四边、五边、六边形——边数 3、4、5、6，对应切到的面数 3、4、5、6。",
                "规律一句话：截面有几条边，平面就切到了几个面。正方体只有 6 个面，所以截面最多 6 条边——七边形想都别想。",
                "生活例：切蛋糕先数有几个面可切；图形例：三棱柱最多切出五边形（它只有 5 个面）。",
                "反例：“一刀切出圆形截面”——切正方体切不出圆，圆是切球才有的。",
                "⚠️ 别搞混：边数=面数说的是“切到的面”，不是立体总面数——一刀没切到的面不算。",
                "记住一句话：切几个面，得几边形。"
              ],
              examples: [
                { text: "三棱柱最多能切出几边形？先数它的面数", figure: "思考" }
              ],
              prev: "g12-u1-l4-p3",
              next: "g12-u1-l5-p1"
            }
          ]
        },
        /* ============ g12.1.5 本章小结与习题（2 页） ============ */
        {
          id: "g12-u1-l5",
          title: "本章小结与习题",
          pages: [
            {
              id: "g12-u1-l5-p1",
              title: "本章小结：看穿立体",
              pageKind: "explain",
              concept: "立体几何初步全章串讲",
              formulas: [
                {
                  id: "f1",
                  latex: "V - E + F = 2",
                  translation: "欧拉公式：凸多面体顶点数减棱数加面数等于 2"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "认识：5 种立体——棱是线、面是块、顶点是点；欧拉公式 V−E+F=2。",
                      shapes: [
                        { t: "circle", c: [30,50], r: 10, color: "known", width: 2.5 },
                        { t: "poly", pts: [[48,40],[62,40],[55,54]], color: "known", width: 2.5 },
                        { t: "txt", p: [50,80], text: "5 种立体 + 欧拉公式", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "三视图：三个影子（主/左/俯）+ 口诀长对正、高平齐、宽相等。",
                      shapes: [
                        { t: "poly", pts: [[28,44],[48,44],[48,60],[28,60]], color: "known", width: 2.5 },
                        { t: "txt", p: [38,52], text: "主", size: 13 },
                        { t: "poly", pts: [[56,44],[72,44],[72,60],[56,60]], color: "known", width: 2.5 },
                        { t: "txt", p: [64,52], text: "左", size: 13 },
                        { t: "txt", p: [50,80], text: "三视图：三个影子", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "展开图：11 种（141 六种、231 三种、222 和 33 各一种），“田”字折不成。",
                      shapes: [
                        { t: "poly", pts: [[30,46],[38,46],[38,54],[30,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[38,46],[46,46],[46,54],[38,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[46,46],[54,46],[54,54],[46,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[54,46],[62,46],[62,54],[54,54]], color: "known", width: 2 },
                        { t: "poly", pts: [[38,54],[46,54],[46,62],[38,62]], color: "known", width: 2 },
                        { t: "poly", pts: [[38,38],[46,38],[46,46],[38,46]], color: "known", width: 2 },
                        { t: "txt", p: [50,80], text: "展开图：11 种", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "截面：切几个面，得几边形——正方体最多 6 条边。",
                      shapes: [
                        { t: "poly", pts: [[46,36],[64,40],[72,56],[64,72],[46,76],[38,60]], color: "target", width: 2.5, fill: "target", opacity: 0.3 },
                        { t: "txt", p: [50,86], text: "截面：切几面得几边形", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一句话串全章：认识 5 种立体→数出欧拉公式→长方体找平行垂直→三视图三个影子→11 种展开图→切出截面。",
                "两样本事：看不懂立体时，记住“转一转”（换角度看三视图）、“拆一拆”（剥开展开图）。",
                "三个口诀：V−E+F=2；长对正、高平齐、宽相等；141、231、222、33。",
                "记住一句话：立体几何就是“看穿”——看穿它的面、它的影子、它的切口。"
              ],
              examples: [
                { text: "全章知识图谱", figure: "图表" }
              ],
              prev: "g12-u1-l4-p4",
              next: "g12-u1-l5-p2"
            },
            {
              id: "g12-u1-l5-p2",
              title: "本章习题：6 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "V - E + F = 2",
                  translation: "用欧拉公式、三视图、展开图知识解题"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "txt", p: [50,88], text: "点名字，分进两篮", size: 14 }
                  ],
                  groups: [
                    { name: "能折成正方体", color: "corrA" },
                    { name: "不能折成正方体", color: "corrB" }
                  ],
                  items: [
                    { id: "n1", label: "一四一", group: 0, anchor: [25,68],
                      shape: { t: "txt", p: [25,68], text: "“一四一”", size: 17, bold: true, color: "corrA" } },
                    { id: "n2", label: "二三一", group: 0, anchor: [75,68],
                      shape: { t: "txt", p: [75,68], text: "“二三一”", size: 17, bold: true, color: "corrA" } },
                    { id: "n3", label: "田字形", group: 1, anchor: [25,44],
                      shape: { t: "txt", p: [25,44], text: "“田”字形", size: 17, bold: true, color: "corrB" } },
                    { id: "n4", label: "凹字形", group: 1, anchor: [75,44],
                      shape: { t: "txt", p: [75,44], text: "“凹”字形", size: 17, bold: true, color: "corrB" } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "认图：4 个名字分两篮：能折成/不能折成正方体。",
                "1．数正方体顶点、棱、面，算 V−E+F。",
                "2．数三棱柱顶点、棱、面，算 V−E+F。",
                "3．长方体中，与一棱平行的几条？相交垂直的几条？",
                "4．主视图长方形、俯视图是圆，是什么？",
                "5．“二二二”型几种？“田”字形为何折不成？",
                "6．纸箱压扁是哪种展开图？做它用多少纸板？"
              ],
              examples: [
                { text: "认图：一四一、二三一能，田字形、凹字形不能；1．8、12、6，等于 2；2．6、9、5，等于 2；3．3 条平行、4 条相交垂直；4．圆柱；5．1 种，会重叠；6．展开图的一种，纸板面积=表面积", figure: "核对答案" }
              ],
              prev: "g12-u1-l5-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};