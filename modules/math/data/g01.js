/* ============================================================
 * 学习工具箱 · 数学 · 几何 g01：点、线、面、角
 *
 * 黄队（教育教学专家）生产：7 课 / 21 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g01 章）
 * 教学设计：docs/math-geometry-pedagogy.md（六条铁律 / 讲解页五段式）
 * 一屏预算：/tmp/white_geom_budget_g01_g04.md（g01 部分：20→21 页）
 * 参数手册：docs/math-geometry-params.md v1.1
 *
 * 页构成：
 *   g01.1.1 点、线、面的概念      3页  P1 step-play  P2-P3 讲解
 *   g01.1.2 直线、射线、线段      3页  P1 转动画笔  P2 对比讲解  P3 表示法+H12
 *   g01.1.3 线段的比较与中点      2页  P1 叠合法  P2 中点讲解
 *   g01.2.1 角的概念、表示与度量  4页  P1 旋转成角  P2 表示法  P3 量角器跟做  P4 度分秒
 *   g01.2.2 角的比较与角平分线    3页  P1 叠角  P2-P3 和差+平分线讲解
 *   g01.2.3 余角与补角            4页  P1-P2 余角(交互+讲解)  P3-P4 补角(交互+讲解)
 *   g01.2.4 本章小结与习题        2页
 * 交互类型：step-play / compare-toggle / tap-highlight / angle-protractor
 * （params 只用语义色名，不出现具体色值；逻辑坐标 0–100，y 向上）
 * 呼应点：H12（射线 ↔ 代数 ch05 不等式解集）落在 g01.1.2 P3
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g01"] = {
  id: "g01",
  title: "点、线、面、角",
  units: [
    {
      id: "g01-u1",
      title: "点与线",
      lessons: [
        {
          id: "g01-u1-l1",
          title: "点、线、面的概念",
          pages: [
            {
              id: "g01-u1-l1-p1",
              title: "生活中的点、线、面",
              concept: "点、线、面的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{点}、\\text{线}、\\text{面}",
                  translation: "点：只有位置；线：笔直的长度；面：平平铺开"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：夜空的星星——离得太远，只剩下一个位置。",
                      shapes: [
                        { t: "pt", p: [25,68], r: 3, color: "known" },
                        { t: "pt", p: [40,74], r: 2.5, color: "known" },
                        { t: "pt", p: [55,66], r: 3, color: "known" },
                        { t: "pt", p: [70,74], r: 2.5, color: "known" },
                        { t: "pt", p: [82,66], r: 3, color: "known" },
                        { t: "txt", p: [50,50], text: "星星：只看得到位置", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：绷紧的琴弦——拉得笔直，这就是线。",
                      shapes: [
                        { t: "seg", a: [15,60], b: [85,60], color: "line", width: 3 },
                        { t: "pt", p: [15,60], r: 3, color: "line" },
                        { t: "pt", p: [85,60], r: 3, color: "line" },
                        { t: "txt", p: [50,76], text: "绷紧的琴弦：笔直，有长度", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：平静的湖面——平平地铺开，这就是面。",
                      shapes: [
                        { t: "poly", pts: [[15,50],[85,50],[85,68],[15,68]], color: "corrA", width: 2, fill: "corrA", opacity: 0.35 },
                        { t: "txt", p: [50,80], text: "平静的湖面：平平铺开", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "夜空的星星：离得太远，只剩一个位置——这就是点。",
                "绷紧的琴弦：拉得笔直，有长度——这就是线。",
                "平静的湖面：平平铺开——这就是面。"
              ],
              examples: [
                { text: "点线面都在生活里：星星、琴弦、湖面", figure: "实物" }
              ],
              prev: null,
              next: "g01-u1-l1-p2"
            },
            {
              id: "g01-u1-l1-p2",
              title: "给点、线、面起名字",
              pageKind: "explain",
              concept: "点、直线、平面的表示法",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{点} A、\\text{直线} l、\\text{直线} AB、\\text{平面} \\alpha",
                  translation: "点用大写字母，直线用小写字母或两个点，平面用希腊字母"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：点 A、直线 l（直线 AB）、平面 α 的记法。",
                      shapes: [
                        { t: "pt", p: [22,60], r: 4, color: "known", label: "A" },
                        { t: "txt", p: [22,74], text: "点 A", size: 13 },
                        { t: "pt", p: [44,60], r: 3, color: "line", label: "A" },
                        { t: "seg", a: [44,60], b: [76,60], color: "line", width: 2.5 },
                        { t: "pt", p: [76,60], r: 3, color: "line", label: "B" },
                        { t: "txt", p: [60,74], text: "直线 l（直线 AB）", size: 13 },
                        { t: "poly", pts: [[30,22],[70,22],[78,32],[38,32]], color: "corrA", width: 2, fill: "corrA", opacity: 0.3 },
                        { t: "txt", p: [54,40], text: "平面 α", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得上一页吗？星星是点、琴弦是线、湖面是面——现在给它们起名字。",
                "点：大写字母——点 A。点只有位置，没有大小。",
                "直线：小写字母——直线 l；也可以用两个点——直线 AB。",
                "平面：希腊字母——平面 α。湖面就是一块平面。",
                "⚠️ 别搞混：画出来的点线面都有粗细，那是“画像”；真正的点没有大小、线没有粗细、面没有厚薄。",
                "反例：弯的钓鱼线不是直线——直线必须是笔直的。"
              ],
              examples: [],
              prev: "g01-u1-l1-p1",
              next: "g01-u1-l1-p3"
            },
            {
              id: "g01-u1-l1-p3",
              title: "几何的“洁癖”：只留形状大小位置",
              pageKind: "explain",
              concept: "几何抽象",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{点：没有大小；线：没有粗细；面：没有厚薄}",
                  translation: "几何图形只保留形状、大小和位置"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "画像（画出来的）",
                      caption: "黑板上的点：放大看，它有大小、有粗细——这是不得已的“画像”。",
                      shapes: [
                        { t: "circle", c: [50,55], r: 9, color: "known", width: 2.5, fill: "known", opacity: 0.45 },
                        { t: "txt", p: [50,30], text: "放大看：有大小、有粗细", size: 13 }
                      ]
                    },
                    {
                      label: "真身（几何的）",
                      caption: "真正的点：没有大小，只剩下一个位置 A。",
                      shapes: [
                        { t: "pt", p: [50,55], r: 4, color: "known", label: "A" },
                        { t: "txt", p: [50,30], text: "只有位置，没有大小", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“画像”：黑板上的点，放大看有大小、有粗细。",
                "点“真身”：没有大小，只剩一个位置。",
                "线没有粗细，面没有厚薄——抽掉的都是几何不关心的。",
                "这就是几何的“洁癖”：只关心形状、大小、位置。",
                "下一课：线里面分三种——直线、射线、线段。"
              ],
              examples: [],
              prev: "g01-u1-l1-p2",
              next: "g01-u1-l2-p1"
            }
          ]
        },
        {
          id: "g01-u1-l2",
          title: "直线、射线、线段",
          pages: [
            {
              id: "g01-u1-l2-p1",
              title: "两点确定一条直线",
              concept: "两点确定一条直线",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{过两点，有且只有一条直线}",
                  translation: "两个点唯一确定一条直线"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：只钉住点 A，木条随便转——无数条直线。",
                      shapes: [
                        { t: "seg", a: [20,70], b: [80,30], color: "aux", width: 2 },
                        { t: "seg", a: [25,30], b: [75,70], color: "aux", width: 2 },
                        { t: "seg", a: [15,50], b: [85,50], color: "aux", width: 2 },
                        { t: "pt", p: [50,50], r: 4, color: "known", label: "A" },
                        { t: "txt", p: [50,80], text: "过一点的直线：无数条", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：再钉住点 B，转一转木条——只有一条能同时穿过 A 和 B。",
                      shapes: [
                        { t: "seg", a: [35,58], b: [65,42], color: "line", width: 3.5 },
                        { t: "seg", a: [20,68], b: [50,48], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [50,52], b: [80,32], color: "aux", width: 2, dash: "5,4" },
                        { t: "pt", p: [35,58], r: 4, color: "known", label: "A" },
                        { t: "pt", p: [65,42], r: 4, color: "known", label: "B" },
                        { t: "txt", p: [50,78], text: "转一转：只有一条穿过 A、B", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：过 A、B 两点，有且只有一条直线。",
                      shapes: [
                        { t: "seg", a: [15,66], b: [85,34], color: "line", width: 3.5 },
                        { t: "pt", p: [35,58], r: 4, color: "known", label: "A" },
                        { t: "pt", p: [65,42], r: 4, color: "known", label: "B" },
                        { t: "txt", p: [50,78], text: "两点确定一条直线", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "只钉住点 A：木条随便转——过一点的直线有无数条。",
                "再钉住点 B：木条转不动了——只有一条直线穿过 A 和 B。",
                "这就是：两点确定一条直线。"
              ],
              examples: [
                { text: "木工弹墨线：两个点一拉一弹，线就直了", figure: "实物" }
              ],
              prev: "g01-u1-l1-p3",
              next: "g01-u1-l2-p2"
            },
            {
              id: "g01-u1-l2-p2",
              title: "直线、射线、线段：三张身份证",
              pageKind: "explain",
              concept: "三种线的区别",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{线段：2 个端点；射线：1 个端点；直线：0 个端点}",
                  translation: "端点数是区分三种线的身份证"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：三种线的端点数——2 个、1 个、0 个。",
                      shapes: [
                        { t: "pt", p: [15,74], r: 3, color: "line", label: "A" },
                        { t: "seg", a: [15,74], b: [45,74], color: "line", width: 3 },
                        { t: "pt", p: [45,74], r: 3, color: "line", label: "B" },
                        { t: "txt", p: [70,74], text: "线段 AB：两个端点", size: 12 },
                        { t: "pt", p: [15,52], r: 3, color: "line", label: "O" },
                        { t: "ray", p: [15,52], ang: 0, len: 32, color: "line", width: 3 },
                        { t: "txt", p: [70,52], text: "射线 OA：一个端点", size: 12 },
                        { t: "seg", a: [15,30], b: [45,30], color: "line", width: 3 },
                        { t: "txt", p: [70,30], text: "直线：没有端点", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看图：线段（两个端点）、射线（一个端点）、直线（没有端点）。",
                "线段：两个头，像排队、像金箍棒——能测量多长。",
                "射线：一个头，像手电筒的光——向一边无限长。",
                "直线：没有头，像双向延长的公路——两边都无限长。",
                "⚠️ 别搞混：金箍棒再长也有头，是线段，不是直线。",
                "反例：弯的钓鱼线——它是曲线，不在三种“直的线”里。"
              ],
              examples: [],
              prev: "g01-u1-l2-p1",
              next: "g01-u1-l2-p3"
            },
            {
              id: "g01-u1-l2-p3",
              title: "表示法：名字怎么写",
              pageKind: "explain",
              concept: "三种线的表示法；H12 射线↔不等式解集",
              formulas: [
                {
                  id: "f1",
                  latex: "x > 3",
                  translation: "x 大于 3：在数轴上是从 3 出发向右的射线"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：x>3 的解集——从 3 出发向右的一条射线。",
                      shapes: [
                        { t: "seg", a: [10,50], b: [90,50], color: "line", width: 2 },
                        { t: "pt", p: [35,50], r: 3.5, color: "target", label: "3" },
                        { t: "ray", p: [35,50], ang: 0, len: 50, color: "target", width: 3.5 },
                        { t: "txt", p: [62,64], text: "x > 3", size: 15, bold: true, color: "target" },
                        { t: "txt", p: [62,36], text: "端点空心圈：不含 3", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "表示法：直线 l（小写），或直线 AB；射线 OA（端点 O 写在前面！）；线段 AB（AB、BA 都行）。",
                "⚠️ 别写错：射线 OB 和射线 BO 是两条射线——端点一变，射线就变了。",
                "呼应代数：x>3 的解集，在数轴上就是“从 3 出发向右的一条射线”。",
                "端点的空心圈（不含 3）就是射线的端点——代数的“不含”，几何的“起点”，同一个意思。"
              ],
              examples: [
                { text: "回看代数不等式：数轴上的解集", figure: "回链" }
              ],
              prev: "g01-u1-l2-p2",
              next: "g01-u1-l3-p1"
            }
          ]
        },
        {
          id: "g01-u1-l3",
          title: "线段的比较与中点",
          pages: [
            {
              id: "g01-u1-l3-p1",
              title: "叠一叠，比长短",
              concept: "线段长短的比较（叠合法）",
              formulas: [
                {
                  id: "f1",
                  latex: "AB > CD",
                  translation: "线段 AB 比线段 CD 长"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：两条线段 AB、CD，谁长？",
                      shapes: [
                        { t: "seg", a: [20,62], b: [60,62], color: "line", width: 3.5 },
                        { t: "txt", p: [40,74], text: "AB", size: 14, bold: true },
                        { t: "seg", a: [20,38], b: [50,38], color: "target", width: 3.5 },
                        { t: "txt", p: [35,50], text: "CD", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 2 步：把 CD 叠到 AB 上：一端对齐，看另一端。",
                      shapes: [
                        { t: "seg", a: [20,60], b: [60,60], color: "line", width: 3.5 },
                        { t: "seg", a: [20,60], b: [50,60], color: "target", width: 4.5 },
                        { t: "pt", p: [20,60], r: 3.5, color: "known", label: "A(C)" },
                        { t: "txt", p: [50,76], text: "C 和 A 对齐，D 落在 B 里面", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：D 落在 B 里面——AB 比 CD 长。",
                      shapes: [
                        { t: "seg", a: [20,60], b: [60,60], color: "line", width: 3.5 },
                        { t: "seg", a: [20,60], b: [50,60], color: "target", width: 4.5 },
                        { t: "txt", p: [50,40], text: "AB > CD", size: 18, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "比长短不用尺：把一条线段叠到另一条上，一端对齐。",
                "看另一端：D 落在 B 里面——AB 比 CD 长。",
                "D 正好落到 B 上——两条线段一样长。"
              ],
              examples: [
                { text: "也可以用尺量：AB=5cm，CD=3cm", figure: "度量" }
              ],
              prev: "g01-u1-l2-p3",
              next: "g01-u1-l3-p2"
            },
            {
              id: "g01-u1-l3-p2",
              title: "中点：线段的“一半处”",
              pageKind: "explain",
              concept: "中点；线段的和差",
              formulas: [
                {
                  id: "f1",
                  latex: "AM = MB = \\frac{1}{2}AB",
                  translation: "M 是中点：AM 等于 MB，都等于 AB 的一半"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：M 是 AB 的中点——AM=MB=½AB。",
                      shapes: [
                        { t: "seg", a: [15,50], b: [85,50], color: "line", width: 3.5 },
                        { t: "seg", a: [15,50], b: [50,50], color: "line", width: 3.5, ticks: 1 },
                        { t: "seg", a: [50,50], b: [85,50], color: "line", width: 3.5, ticks: 1 },
                        { t: "pt", p: [50,50], r: 3.5, color: "known", label: "M" },
                        { t: "txt", p: [15,62], text: "A", size: 13 },
                        { t: "txt", p: [85,62], text: "B", size: 13 },
                        { t: "txt", p: [50,68], text: "AM = MB", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "中点：把线段平均分成两半的点——M 是 AB 的中点，AM=MB。",
                "AM 是 AB 的一半：AM=MB=½AB。",
                "线段能加减（点 B 在线段 AC 上时）：AC=AB+BC（两段接起来）；BC=AC−AB（全长减一段）。",
                "⚠️ 别搞混：中点必须在线段上，延长线上的点不算。"
              ],
              examples: [
                { text: "对折纸条：折痕就是中点", figure: "实物" }
              ],
              prev: "g01-u1-l3-p1",
              next: "g01-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "g01-u2",
      title: "角",
      lessons: [
        {
          id: "g01-u2-l1",
          title: "角的概念、表示与度量",
          pages: [
            {
              id: "g01-u2-l1-p1",
              title: "射线转一转，角就出来了",
              concept: "角的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle AOB",
                  translation: "角 AOB：顶点是 O，两条边是 OA 和 OB"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：一条射线 OA，端点是 O。",
                      shapes: [
                        { t: "ray", p: [50,50], ang: 90, len: 35, color: "line", width: 3 },
                        { t: "pt", p: [50,50], r: 4, color: "known", label: "O" },
                        { t: "txt", p: [50,90], text: "射线 OA", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：射线绕 O 转起来——转过的张开程度，就是角。",
                      shapes: [
                        { t: "seg", a: [50,50], b: [50,85], color: "line", width: 3 },
                        { t: "seg", a: [50,50], b: [80,50], color: "line", width: 3 },
                        { t: "arc", v: [50,50], a1: 0, a2: 90, r: 12, color: "corrAngle" },
                        { t: "pt", p: [50,50], r: 4, color: "known", label: "O" },
                        { t: "txt", p: [50,24], text: "转一转", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：这就是角 ∠AOB：顶点 O，两条边 OA 和 OB。",
                      shapes: [
                        { t: "seg", a: [50,50], b: [50,85], color: "line", width: 3 },
                        { t: "seg", a: [50,50], b: [80,50], color: "line", width: 3 },
                        { t: "arc", v: [50,50], a1: 0, a2: 90, r: 12, color: "corrAngle" },
                        { t: "pt", p: [50,50], r: 4, color: "known", label: "O" },
                        { t: "txt", p: [63,68], text: "∠AOB", size: 14, bold: true },
                        { t: "txt", p: [50,24], text: "顶点 O，两条边 OA、OB", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一条射线 OA，绕端点 O 转起来——转过的“张开程度”就是角。",
                "角有两部分：顶点 O（转动的中心），两条边 OA、OB。",
                "生活例：剪刀开合——刀刃就是角的两条边。",
                "转得越大，角越大——角的大小看“张开”，不看边的长短。"
              ],
              examples: [
                { text: "钟表：时针和分针也在不停地“转角”", figure: "实物" }
              ],
              prev: "g01-u1-l3-p2",
              next: "g01-u2-l1-p2"
            },
            {
              id: "g01-u2-l1-p2",
              title: "角的 4 种写法",
              pageKind: "explain",
              concept: "角的表示法",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle AOB = \\angle O = \\angle 1 = \\angle \\alpha",
                  translation: "同一个角的四种写法（∠O 只在顶点处只有一个角时可用）"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：同一个角的 4 种写法——∠AOB、∠O、∠1、∠α。",
                      shapes: [
                        { t: "seg", a: [45,62], b: [20,80], color: "line", width: 3 },
                        { t: "seg", a: [45,62], b: [70,80], color: "line", width: 3 },
                        { t: "arc", v: [45,62], a1: 35.8, a2: 144.2, r: 12, color: "corrAngle" },
                        { t: "txt", p: [45,90], text: "∠AOB", size: 14, bold: true },
                        { t: "txt", p: [18,58], text: "∠O", size: 13 },
                        { t: "txt", p: [72,58], text: "∠1", size: 13 },
                        { t: "txt", p: [86,74], text: "∠α", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "4 种写法：∠AOB（顶点 O 写中间，最保险）、∠O（顶点处只有一个角时）、∠1、∠α。",
                "⚠️ 别写错：∠ABO 不行！顶点字母必须写在中间——∠AOB 的顶点是 O。",
                "图形例：图上标了∠1 的角，也可以叫∠AOB——写法不同，意思一样。",
                "反例：弯月形不是角——角的两条边必须是射线，弯的不行。"
              ],
              examples: [],
              prev: "g01-u2-l1-p1",
              next: "g01-u2-l1-p3"
            },
            {
              id: "g01-u2-l1-p3",
              title: "拿起量角器，自己量一量",
              concept: "用量角器度量角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle AOB = 60^{\\circ}",
                  translation: "角 AOB 等于 60 度"
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
                "把量角器整个拖过去：中心对准顶点 O 就行——它只会平移，不用转。",
                "读数不用看刻度：角是多大，读数区就自动算出多大。",
                "拖射线上的蓝点可以改变角的大小——看读数跟着变；量角器动不动都不影响角。",
                "中心贴上顶点就“落定”了：闪一下加圆环扩散，读数区显示“已对准 ✓”，这个角就是 60°。"
              ],
              examples: [
                { text: "量完点右下角 ↺，可以再来一次", figure: "操作" }
              ],
              prev: "g01-u2-l1-p2",
              next: "g01-u2-l1-p4"
            },
            {
              id: "g01-u2-l1-p4",
              title: "度、分、秒：角度的时分秒",
              pageKind: "explain",
              concept: "角度单位；周角、平角、直角",
              formulas: [
                {
                  id: "f1",
                  latex: "1^{\\circ} = 60', 1' = 60''",
                  translation: "1 度等于 60 分，1 分等于 60 秒"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：转一圈 360°，转半圈 180°，转四分之一圈 90°。",
                      shapes: [
                        { t: "circle", c: [25,55], r: 12, color: "line", width: 2.5 },
                        { t: "txt", p: [25,32], text: "周角 360°", size: 12 },
                        { t: "seg", a: [45,55], b: [75,55], color: "line", width: 2.5 },
                        { t: "txt", p: [60,40], text: "平角 180°", size: 12 },
                        { t: "seg", a: [84,70], b: [84,50], color: "line", width: 2.5 },
                        { t: "seg", a: [84,60], b: [97,60], color: "line", width: 2.5 },
                        { t: "right", v: [84,60], p: [84,50], q: [97,60], size: 6, color: "line" },
                        { t: "txt", p: [90,38], text: "直角 90°", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "角度单位：度（°）、分（′）、秒（″）——1°=60′，1′=60″，和时间的时分秒一个脾气。",
                "转一圈：周角=360°；转半圈：平角=180°；转四分之一圈：直角=90°。",
                "生活例：披萨切 4 块，每块圆心角 90°；切 6 块，每块 60°。",
                "⚠️ 别搞混：1°=60′，不是 100′——角度是六十进制。",
                "换算例：37.5°=37°30′（0.5°×60=30′）。"
              ],
              examples: [],
              prev: "g01-u2-l1-p3",
              next: "g01-u2-l2-p1"
            }
          ]
        },
        {
          id: "g01-u2-l2",
          title: "角的比较与角平分线",
          pages: [
            {
              id: "g01-u2-l2-p1",
              title: "叠角：比一比谁大",
              concept: "角的大小比较（叠合法）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle 1 > \\angle 2",
                  translation: "角 1 比角 2 大"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：两个角 ∠1、∠2，谁大？",
                      shapes: [
                        { t: "seg", a: [30,55], b: [12,55], color: "line", width: 2.5 },
                        { t: "seg", a: [30,55], b: [14,68], color: "line", width: 2.5 },
                        { t: "txt", p: [30,44], text: "∠1", size: 13 },
                        { t: "seg", a: [70,55], b: [88,55], color: "target", width: 2.5 },
                        { t: "seg", a: [70,55], b: [86,62], color: "target", width: 2.5 },
                        { t: "txt", p: [70,44], text: "∠2", size: 13, color: "target" }
                      ]
                    },
                    {
                      caption: "第 2 步：顶点对顶点，一条边对齐——看另一条边。",
                      shapes: [
                        { t: "seg", a: [50,50], b: [88,50], color: "line", width: 3 },
                        { t: "seg", a: [50,50], b: [21,74], color: "line", width: 3 },
                        { t: "arc", v: [50,50], a1: 0, a2: 140, r: 12, color: "corrAngle" },
                        { t: "seg", a: [50,50], b: [68,82], color: "target", width: 2, dash: "5,4" },
                        { t: "arc", v: [50,50], a1: 0, a2: 60.6, r: 9, color: "corrAngle" },
                        { t: "txt", p: [50,30], text: "一条边对齐", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：∠1 的另一条边在外面——∠1 更大。",
                      shapes: [
                        { t: "seg", a: [50,50], b: [88,50], color: "line", width: 3 },
                        { t: "seg", a: [50,50], b: [21,74], color: "line", width: 3 },
                        { t: "arc", v: [50,50], a1: 0, a2: 140, r: 12, color: "corrAngle" },
                        { t: "seg", a: [50,50], b: [68,82], color: "target", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,24], text: "∠1 > ∠2", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "比角大小：像比线段一样“叠”——顶点对顶点，一条边对齐。",
                "看另一条边：谁在外面，谁就大；重合了，就一样大。",
                "角的大小只看张开程度，不看边的长短——边画长了，角不变。"
              ],
              examples: [
                { text: "对折纸角：折痕就是角平分线（下一页）", figure: "预告" }
              ],
              prev: "g01-u2-l1-p4",
              next: "g01-u2-l2-p2"
            },
            {
              id: "g01-u2-l2-p2",
              title: "角的加减法",
              pageKind: "explain",
              concept: "角的和差",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle AOC = \\angle 1 + \\angle 2",
                  translation: "大角 AOC 等于角 1 加角 2"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：∠AOC 被分成∠1 和∠2——大角等于两小角之和。",
                      shapes: [
                        { t: "seg", a: [50,30], b: [15,68], color: "line", width: 3 },
                        { t: "seg", a: [50,30], b: [50,78], color: "aux", width: 2.5 },
                        { t: "seg", a: [50,30], b: [85,68], color: "line", width: 3 },
                        { t: "arc", v: [50,30], a1: 90, a2: 132.6, r: 12, color: "corrAngle", group: 1 },
                        { t: "arc", v: [50,30], a1: 47.4, a2: 90, r: 12, color: "corrAngle", group: 2 },
                        { t: "txt", p: [38,58], text: "∠1", size: 13 },
                        { t: "txt", p: [62,58], text: "∠2", size: 13 },
                        { t: "txt", p: [50,90], text: "∠AOC = ∠1 + ∠2", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "角也能加减：∠AOC 被分成∠1 和∠2——∠AOC=∠1+∠2。",
                "反过来：∠1=∠AOC−∠2（大角减小角）。",
                "图形例：两块三角板拼起来——30°+45°=75°。",
                "⚠️ 别搞混：加的是“度数”，不是“边长”——角的大小和边长没关系。"
              ],
              examples: [],
              prev: "g01-u2-l2-p1",
              next: "g01-u2-l2-p3"
            },
            {
              id: "g01-u2-l2-p3",
              title: "角平分线：从中间下刀",
              pageKind: "explain",
              concept: "角平分线",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle 1 = \\angle 2",
                  translation: "角平分线把角分成两个相等的角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：射线 OB 把∠AOC 分成两个相等的角——OB 是角平分线。",
                      shapes: [
                        { t: "seg", a: [50,32], b: [18,72], color: "line", width: 3 },
                        { t: "seg", a: [50,32], b: [82,72], color: "line", width: 3 },
                        { t: "ray", p: [50,32], ang: 90, len: 40, color: "target", width: 3 },
                        { t: "arc", v: [50,32], a1: 90, a2: 128.7, r: 12, color: "corrAngle", group: 1 },
                        { t: "arc", v: [50,32], a1: 51.3, a2: 90, r: 12, color: "corrAngle", group: 2 },
                        { t: "txt", p: [38,60], text: "∠1", size: 13 },
                        { t: "txt", p: [62,60], text: "∠2", size: 13 },
                        { t: "txt", p: [50,88], text: "∠1 = ∠2", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "角平分线：从顶点 O 出发的一条射线，把∠AOC 分成∠1 和∠2——∠1=∠2。",
                "它是一条射线：有起点（顶点），向一边无限长。",
                "生活例：切蛋糕从正中间下刀——刀口就是角平分线。",
                "⚠️ 别搞混：把角分成两半的“线段”不是角平分线——必须是射线。",
                "反例：从顶点出发但两边不等的射线——分的是角，不是平分。",
                "记住一句话：平分线，平分角，一分为二都相等。"
              ],
              examples: [],
              prev: "g01-u2-l2-p2",
              next: "g01-u2-l3-p1"
            }
          ]
        },
        {
          id: "g01-u2-l3",
          title: "余角与补角",
          pages: [
            {
              id: "g01-u2-l3-p1",
              title: "拼一拼：两个角凑成 90°",
              concept: "互余",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle 1 + \\angle 2 = 90^{\\circ}",
                  translation: "角 1 加角 2 等于 90 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：三角板的两个锐角：∠1 和∠2。",
                      shapes: [
                        { t: "poly", pts: [[30,62],[70,62],[30,34]], color: "line", width: 3 },
                        { t: "arc", v: [70,62], a1: 180, a2: 215, r: 10, color: "corrAngle", group: 1 },
                        { t: "arc", v: [30,34], a1: 35, a2: 90, r: 10, color: "corrAngle", group: 2 },
                        { t: "txt", p: [60,54], text: "∠1", size: 13 },
                        { t: "txt", p: [40,44], text: "∠2", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：把∠1 和∠2 拼起来——正好拼成一个直角。",
                      shapes: [
                        { t: "seg", a: [40,62], b: [40,86], color: "line", width: 3 },
                        { t: "seg", a: [40,62], b: [68,62], color: "line", width: 3 },
                        { t: "ray", p: [40,62], ang: 55, len: 24, color: "aux", width: 2.5 },
                        { t: "arc", v: [40,62], a1: 0, a2: 55, r: 10, color: "corrAngle", group: 1 },
                        { t: "arc", v: [40,62], a1: 55, a2: 90, r: 13, color: "corrAngle", group: 2 },
                        { t: "txt", p: [52,70], text: "∠1", size: 13 },
                        { t: "txt", p: [44,76], text: "∠2", size: 13 },
                        { t: "txt", p: [54,32], text: "拼成直角", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：∠1+∠2=90°——∠1 和∠2 互为余角。",
                      shapes: [
                        { t: "txt", p: [50,55], text: "∠1 + ∠2 = 90°", size: 18, bold: true },
                        { t: "txt", p: [50,36], text: "∠1 和∠2 互为余角", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三角板的两个锐角：一个∠1，一个∠2。",
                "把它们拼起来——正好拼成一个直角（90°）。",
                "∠1+∠2=90°：∠1 是∠2 的余角，∠2 也是∠1 的余角。",
                "不能单独说一个角“是余角”——余角描述的是两个角之间的关系。"
              ],
              examples: [],
              prev: "g01-u2-l2-p3",
              next: "g01-u2-l3-p2"
            },
            {
              id: "g01-u2-l3-p2",
              title: "余角：同角的余角相等",
              pageKind: "explain",
              concept: "互余；同角（等角）的余角相等",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle 2 = \\angle 3",
                  translation: "同角（等角）的余角相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：∠1+∠2=90°。",
                      shapes: [
                        { t: "seg", a: [30,62], b: [30,82], color: "line", width: 3 },
                        { t: "seg", a: [30,62], b: [62,62], color: "line", width: 3 },
                        { t: "ray", p: [30,62], ang: 40, len: 26, color: "aux", width: 2.5 },
                        { t: "arc", v: [30,62], a1: 0, a2: 40, r: 10, color: "corrAngle", group: 1 },
                        { t: "arc", v: [30,62], a1: 40, a2: 90, r: 13, color: "corrAngle", group: 2 },
                        { t: "txt", p: [42,68], text: "∠1", size: 13 },
                        { t: "txt", p: [36,74], text: "∠2", size: 13 },
                        { t: "txt", p: [50,32], text: "∠1+∠2=90°", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：∠1+∠3=90°——∠2 和∠3 都是“90° 减去∠1”，所以相等。",
                      shapes: [
                        { t: "seg", a: [30,62], b: [30,82], color: "line", width: 3 },
                        { t: "seg", a: [30,62], b: [62,62], color: "line", width: 3 },
                        { t: "ray", p: [30,62], ang: 65, len: 26, color: "aux", width: 2.5 },
                        { t: "arc", v: [30,62], a1: 0, a2: 65, r: 10, color: "corrAngle", group: 1 },
                        { t: "arc", v: [30,62], a1: 65, a2: 90, r: 13, color: "corrAngle", group: 3 },
                        { t: "txt", p: [42,68], text: "∠1", size: 13 },
                        { t: "txt", p: [36,72], text: "∠3", size: 13 },
                        { t: "txt", p: [50,32], text: "∠1+∠3=90°", size: 13, bold: true },
                        { t: "txt", p: [68,42], text: "∠2 = ∠3", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得拼图吗？∠1+∠2=90°，∠1+∠3=90°——两个式子都有∠1。",
                "∠2 和∠3 都是“90° 减去∠1”剩下的——所以∠2=∠3。",
                "这就是定理：同角（等角）的余角相等。",
                "“同角”是同一个角，“等角”是一样大的角——道理一样。",
                "⚠️ 别搞混：互余只看度数和是不是 90°，两个角挨不挨着没关系。",
                "反例：“小明的余角”这种说法是错的——余角是两个角的关系。"
              ],
              examples: [],
              prev: "g01-u2-l3-p1",
              next: "g01-u2-l3-p3"
            },
            {
              id: "g01-u2-l3-p3",
              title: "拼一拼：两个角凑成 180°",
              concept: "互补",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle 1 + \\angle 2 = 180^{\\circ}",
                  translation: "角 1 加角 2 等于 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：一个平角（180°）被分成两块：∠1 和∠2。",
                      shapes: [
                        { t: "seg", a: [20,55], b: [80,55], color: "line", width: 3 },
                        { t: "seg", a: [50,55], b: [64,79], color: "line", width: 3 },
                        { t: "arc", v: [50,55], a1: 0, a2: 59.7, r: 12, color: "corrAngle", group: 1 },
                        { t: "arc", v: [50,55], a1: 59.7, a2: 180, r: 12, color: "corrAngle", group: 2 },
                        { t: "txt", p: [60,64], text: "∠1", size: 13 },
                        { t: "txt", p: [40,64], text: "∠2", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：∠1+∠2=180°——∠1 和∠2 互为补角。",
                      shapes: [
                        { t: "txt", p: [50,58], text: "∠1 + ∠2 = 180°", size: 18, bold: true },
                        { t: "txt", p: [50,38], text: "∠1 和∠2 互为补角", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一个平角（180°）被分成两块：∠1 和∠2。",
                "∠1+∠2=180°：∠1 是∠2 的补角，∠2 也是∠1 的补角。",
                "生活例：6 点整，时针分针在一条直线上，形成一个平角 180°。",
                "“互为”还是互相：补角也是两个角的关系。"
              ],
              examples: [],
              prev: "g01-u2-l3-p2",
              next: "g01-u2-l3-p4"
            },
            {
              id: "g01-u2-l3-p4",
              title: "补角：同角的补角相等",
              pageKind: "explain",
              concept: "互补；同角（等角）的补角相等",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle 2 = \\angle 3",
                  translation: "同角（等角）的补角相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：∠1+∠2=180°。",
                      shapes: [
                        { t: "seg", a: [20,55], b: [80,55], color: "line", width: 3 },
                        { t: "seg", a: [50,55], b: [64,79], color: "line", width: 3 },
                        { t: "arc", v: [50,55], a1: 0, a2: 59.7, r: 12, color: "corrAngle", group: 1 },
                        { t: "arc", v: [50,55], a1: 59.7, a2: 180, r: 12, color: "corrAngle", group: 2 },
                        { t: "txt", p: [60,64], text: "∠1", size: 13 },
                        { t: "txt", p: [40,64], text: "∠2", size: 13 },
                        { t: "txt", p: [50,32], text: "∠1+∠2=180°", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：∠1+∠3=180°——∠2 和∠3 都是“180° 减去∠1”，所以相等。",
                      shapes: [
                        { t: "seg", a: [20,55], b: [80,55], color: "line", width: 3 },
                        { t: "seg", a: [50,55], b: [64,79], color: "line", width: 3 },
                        { t: "arc", v: [50,55], a1: 0, a2: 59.7, r: 12, color: "corrAngle", group: 1 },
                        { t: "arc", v: [50,55], a1: 59.7, a2: 180, r: 12, color: "corrAngle", group: 3 },
                        { t: "txt", p: [60,64], text: "∠1", size: 13 },
                        { t: "txt", p: [40,64], text: "∠3", size: 13 },
                        { t: "txt", p: [50,32], text: "∠1+∠3=180°", size: 13, bold: true },
                        { t: "txt", p: [70,40], text: "∠2 = ∠3", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "∠1+∠2=180°，∠1+∠3=180°——∠2 和∠3 都是“180° 减去∠1”。",
                "所以∠2=∠3——同角（等角）的补角相等。",
                "和余角的定理长得一模一样：只是 90° 换成了 180°。",
                "⚠️ 别搞混：余角看 90°，补角看 180°——“余”是剩下凑 90，“补”是补成 180。",
                "反例：∠1=100°、∠2=90°，和是 190°——不互补。"
              ],
              examples: [],
              prev: "g01-u2-l3-p3",
              next: "g01-u2-l4-p1"
            }
          ]
        },
        {
          id: "g01-u2-l4",
          title: "本章小结与习题",
          pages: [
            {
              id: "g01-u2-l4-p1",
              title: "本章小结：三步走",
              pageKind: "explain",
              concept: "本章知识小结",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{点线面} \\to \\text{三种线} \\to \\text{角}",
                  translation: "先学语言，再学三种线，最后学角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：本章的三步——语言、三种线、角。",
                      shapes: [
                        { t: "txt", p: [50,78], text: "点、线、面（几何的语言）", size: 14, bold: true },
                        { t: "txt", p: [50,66], text: "↓", size: 14 },
                        { t: "txt", p: [50,56], text: "直线、射线、线段（三种线）", size: 14, bold: true },
                        { t: "txt", p: [50,44], text: "↓", size: 14 },
                        { t: "txt", p: [50,34], text: "角：定义 → 度量 → 余角补角", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "本章走了三步：点线面（语言）→三种线（直线/射线/线段）→角（定义/度量/余补）。",
                "三个“最”：两点确定一条直线（最直）；角的大小看张开（最像）；同角的余（补）角相等（最巧）。",
                "表示法口诀：点大写、直线小写或两点、射线端点先、角顶点中。",
                "下一章：两条直线相交——对顶角、垂线，角开始“打架”了。"
              ],
              examples: [],
              prev: "g01-u2-l3-p4",
              next: "g01-u2-l4-p2"
            },
            {
              id: "g01-u2-l4-p2",
              title: "本章小测：分类大挑战",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{线段：2 个端点；射线：1 个端点；直线：0 个端点}",
                  translation: "按端点数分类，是本章最要紧的本事"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "线段", color: "corrA" },
                    { name: "射线", color: "corrB" },
                    { name: "直线", color: "corrC" }
                  ],
                  items: [
                    { id: "e1", label: "排队", group: 0, anchor: [25,74],
                      shape: { t: "seg", a: [15,70], b: [35,70], color: "line", width: 4 } },
                    { id: "e2", label: "金箍棒", group: 0, anchor: [72,74],
                      shape: { t: "seg", a: [60,70], b: [84,70], color: "line", width: 4 } },
                    { id: "e3", label: "手电筒光", group: 1, anchor: [25,46],
                      shape: { t: "ray", p: [13,44], ang: 0, len: 24, color: "line", width: 3.5 } },
                    { id: "e4", label: "x>3", group: 1, anchor: [72,46],
                      shape: { t: "ray", p: [60,44], ang: 0, len: 24, color: "line", width: 3.5 } },
                    { id: "e5", label: "公路", group: 2, anchor: [25,20],
                      shape: { t: "seg", a: [12,18], b: [38,18], color: "line", width: 3.5 } },
                    { id: "e6", label: "琴弦", group: 0, anchor: [72,20],
                      shape: { t: "seg", a: [58,18], b: [86,18], color: "line", width: 3.5 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点一点：把 6 样东西送进线段/射线/直线的篮子。",
                "1．三种线各有几个端点？",
                "2．射线 OA 和射线 AO 是同一条吗？",
                "3．∠1+∠2=90°，∠1=35°，求∠2。",
                "4．37.5°=？°？′；AB=10，M 为中点，AM=？"
              ],
              examples: [
                { figure: "核对答案", text: "篮子：线段—排队/金箍棒/琴弦；射线—手电筒光/x>3；直线—公路。1．直线 0 个、射线 1 个、线段 2 个；2．不是；3．55°，互余；4．37°30′；AM=5。" }
              ,
                { figure: "错因解析", text: "认图：排队/金箍棒/琴弦两头封口是线段；手电筒光/x>3 一头射出去是射线；公路两头无限是直线。1．直线 0 个端点、射线 1 个、线段 2 个。2．射线看端点和方向：OA 端点是 O，AO 端点是 A——不是同一条。3．互余：∠2=90°−35°=55°。4．0.5°=30′：37.5°=37°30′；中点平分：AM=10/2=5。" }],
              prev: "g01-u2-l4-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
