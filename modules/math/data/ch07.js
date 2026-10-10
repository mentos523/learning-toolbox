/* ============================================================
 * 学习工具箱 · 数学 · 代数 第七章：二次函数与反比例函数（10 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第七章 v2.0）。
 * 黄队教学流（docs/math-algebra-pedagogy.md 五条铁律 + 跃升 3 脚手架）。
 *
 * 页面：u1-l1-p1 描点：把 y=x² 一个点一个点画出来（7.1.1：抛物线）
 *       u1-l1-p2 a 的符号定开口，大小定宽窄（7.1.1：二次项系数）
 *       u1-l2-p1 顶点式：顶点直接写在脸上（7.1.2：顶点式的几何意义）
 *       u1-l2-p2 一般式变顶点式：配方是钥匙（7.1.2：两种形式互化）
 *       u1-l3-p1 顶点：对称轴穿过的地方（7.1.3：对称轴与最值）
 *       u1-l4-p1 20 米篱笆，围出最大面积（7.1.4：最值应用）
 *       u2-l1-p1 y=k/x：一个变大，另一个变小（7.2.1：定义与禁区）
 *       u2-l1-p2 双曲线：关于原点对称的两支（7.2.1：图像与 k 定象限）
 *       u2-l2-p1 增减性：只能在每支内部比（7.2.2：增减性）
 *       u2-l3-p1 一图流：抛物线与双曲线（7.2.3：本章小结）
 * 交互复用已实现渲染器：plot-points（描点成像）/ linked-dashboard
 * （滑块 + 读数 + 坐标点）/ slider-lab（label 均为纯变量名）/
 * side-compare（slider-lab 并排，sync 联动）。无需新交互渲染器。
 * 前六批教训落实：
 *   - slider-lab label 全部用纯变量名（"x"/"a"），expr 只含单个变量
 *   - hints 每页 ≤ 2 条、总字数 ≤ 70 字（防 390px 裁剪）
 *   - 定义完整、适用范围限定：二次函数 a≠0、反比例函数 k≠0 且 x≠0、
 *     顶点式/一般式均注明 a≠0；增减性限定"每支内部"
 *   - 顶点式/一般式转换：u1-l2-p2 用配方互化，side-compare 同步验证恒等
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch07"] = {
  id: "ch07",
  title: "二次函数与反比例函数",
  units: [
    {
      id: "ch07-u1",
      title: "二次函数",
      lessons: [
        {
          id: "ch07-u1-l1",
          title: "二次函数的图像",
          pages: [
            {
              id: "ch07-u1-l1-p1",
              title: "描点：把 y=x² 一个点一个点画出来",
              concept: "二次函数的图像是抛物线",
              formulas: [
                {
                  id: "f1",
                  latex: "y = ax^2 + bx + c (a \\neq 0)",
                  translation: "y 等于 ax² 加 bx 加 c（a 不为 0）：二次函数的定义，x 的最高次是 2"
                },
                {
                  id: "f2",
                  latex: "y = x^2",
                  translation: "y 等于 x 平方：最简单的二次函数，它的图像就是这条抛物线"
                }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "x^2",
                  xMin: -3,
                  xMax: 3,
                  step: 0.5,
                  autoPlay: true,
                  speed: 800
                }
              },
              auxInteraction: null,
              hints: [
                "点一个亮一个：所有 (x, x²) 的点连起来，是一条光滑的抛物线。",
                "a≠0 是底线：a=0 时 x² 项消失，就退化成一次函数了（b=0 时甚至退化成常数函数）。"
              ],
              examples: [
                { text: "扔铅球的轨迹、喷泉的水柱，都是抛物线", figure: "描点成像" }
              ],
              prev: null,
              next: "ch07-u1-l1-p2"
            },
            {
              id: "ch07-u1-l1-p2",
              title: "a 的符号定开口，大小定宽窄",
              concept: "二次项系数 a 决定开口方向与宽窄",
              formulas: [
                {
                  id: "f1",
                  latex: "y = ax^2 (a \\neq 0)",
                  translation: "y 等于 a 乘 x 平方（a 不为 0）：a 叫二次项系数，管着抛物线的开口"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: { label: "a", min: -3, max: 3, step: 0.5, initial: 1 },
                  views: [
                    { kind: "readout", expr: "a*4", label: "y" },
                    { kind: "point", xExpr: "2", yExpr: "a*4" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看 x=2：a 为正时点在横轴上方——开口向上，反之向下；a=0 已不是二次函数。",
                "|a| 越大点离横轴越远：抛物线越“瘦”。",],
              examples: [
                { text: "微笑（a>0）与哭脸（a<0）：开口方向一眼看穿", figure: "仪表盘" }
              ],
              prev: "ch07-u1-l1-p1",
              next: "ch07-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch07-u1-l2",
          title: "顶点式",
          pages: [
            {
              id: "ch07-u1-l2-p1",
              title: "顶点式：顶点直接写在脸上",
              concept: "顶点式的形式与几何意义",
              formulas: [
                {
                  id: "f1",
                  latex: "y = a(x-h)^2 + k (a \\neq 0)",
                  translation: "y 等于 a 乘 (x−h) 的平方加 k（a 不为 0）：顶点式，顶点就是 (h, k)，对称轴是 x=h"
                },
                {
                  id: "f2",
                  latex: "y = (x-2)^2 + 1",
                  translation: "y 等于 (x−2) 的平方加 1：a=1，h=2，k=1——顶点 (2,1)，开口向上"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: -4, max: 4, step: 0.5, label: "x", expr: "x^2" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: -4, max: 4, step: 0.5, label: "x", expr: "(x-2)^2+1" }
                  },
                  sync: ["x"],
                  labels: ["y=x²：顶点 (0,0)", "y=(x−2)²+1：顶点 (2,1)"]
                }
              },
              auxInteraction: null,
              hints: [
                "同步拖 x 找最小值：左边在 x=0 取 0，右边在 x=2 取 1——顶点从 (0,0) 搬到了 (2,1)。",
                "顶点式是 y=x² 平移来的：h 管左右，k 管上下。"
              ],
              examples: [
                { text: "搬家：顶点 (0,0) 右移 2、上移 1，整条抛物线跟着走", figure: "并排对比" }
              ],
              prev: "ch07-u1-l1-p2",
              next: "ch07-u1-l2-p2"
            },
            {
              id: "ch07-u1-l2-p2",
              title: "一般式变顶点式：配方是钥匙",
              concept: "一般式与顶点式的互化（配方）",
              formulas: [
                {
                  id: "f1",
                  latex: "y = ax^2 + bx + c (a \\neq 0)",
                  translation: "一般式：y 等于 ax² 加 bx 加 c（a 不为 0），二次函数的常用写法"
                },
                {
                  id: "f2",
                  latex: "x^2 + 6x + 5 = (x+3)^2 - 4",
                  translation: "配方：x²+6x+5 等于 (x+3)²−4——一般式变顶点式，顶点 (−3,−4) 一眼可见"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: -5, max: 3, step: 0.5, label: "x", expr: "x^2+6*x+5" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: -5, max: 3, step: 0.5, label: "x", expr: "(x+3)^2-4" }
                  },
                  sync: ["x"],
                  labels: ["一般式：y=x²+6x+5", "顶点式：y=(x+3)²−4"]
                }
              },
              auxInteraction: null,
              hints: [
                "两边同步拖 x：值永远相等——同一个函数，两件衣服。",
                "配方（第四章配方法）就是钥匙：先配方，再读顶点。"
              ],
              examples: [
                { text: "已知一般式求最值：先配方成顶点式，顶点就是答案", figure: "并排对比" }
              ],
              prev: "ch07-u1-l2-p1",
              next: "ch07-u1-l3-p1"
            }
          ]
        },
        {
          id: "ch07-u1-l3",
          title: "二次函数的性质",
          pages: [
            {
              id: "ch07-u1-l3-p1",
              title: "顶点：对称轴穿过的地方",
              concept: "顶点（对称轴与最值点）",
              formulas: [
                {
                  id: "f1",
                  latex: "y = (x-1)^2 - 3",
                  translation: "y 等于 (x−1) 的平方减 3：顶点 (1,−3)，对称轴是直线 x=1"
                },
                {
                  id: "f2",
                  latex: "x = 1",
                  translation: "对称轴 x=1：x=1+t 与 x=1−t 的函数值永远相等，抛物线左右镜像"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -2,
                  max: 4,
                  step: 0.5,
                  label: "x",
                  expr: "(x-1)^2-3",
                  target: -3,
                  targetLabel: "最小值 −3"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x：x=1 时函数值最小为 −3；x=0 和 x=2 的值相等——关于 x=1 镜像。",
                "顶点是三合一：对称轴与抛物线的交点，也是最高/最低点。"
              ],
              examples: [
                { text: "对折纸：沿 x=1 对折，抛物线两边完全重合", figure: "滑块" }
              ],
              prev: "ch07-u1-l2-p2",
              next: "ch07-u1-l4-p1"
            }
          ]
        },
        {
          id: "ch07-u1-l4",
          title: "二次函数的最值应用",
          pages: [
            {
              id: "ch07-u1-l4-p1",
              title: "20 米篱笆，围出最大面积",
              concept: "最值应用（建模三步）",
              formulas: [
                {
                  id: "f1",
                  latex: "S = x(20-2x) = -2x^2 + 20x",
                  translation: "面积 S 等于宽 x 乘长 (20−2x)，即 −2x²+20x（0<x<10）"
                },
                {
                  id: "f2",
                  latex: "x = -\\frac{b}{2a} = 5",
                  translation: "顶点横坐标 x=−b/(2a)=5：宽 5 米、长 10 米时，面积最大 50 平方米"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "-2*x^2+20*x",
                  target: 50,
                  targetLabel: "最大面积 50",
                  unit: "平方米"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x：x=5 时“咔哒”锁定，S=50 最大——顶点就是最优解。",
                "三步：设宽为 x 列出 S(x)，配方找顶点，顶点即答案。"
              ],
              examples: [
                { text: "靠墙围矩形鸡圈：宽 5 米、长 10 米时面积最大", figure: "滑块" },
                { text: "定价问题：单价与利润是开口向下的抛物线", figure: "滑块" }
              ],
              prev: "ch07-u1-l3-p1",
              next: "ch07-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch07-u2",
      title: "反比例函数",
      lessons: [
        {
          id: "ch07-u2-l1",
          title: "反比例函数的图像",
          pages: [
            {
              id: "ch07-u2-l1-p1",
              title: "y=k/x：一个变大，另一个变小",
              concept: "反比例函数的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "y = \\frac{k}{x} (k \\neq 0)",
                  translation: "y 等于 k 除以 x（k 不为 0）：反比例函数的定义，x 住在分母里"
                },
                {
                  id: "f2",
                  latex: "x \\neq 0",
                  translation: "x 不等于 0：分母不能为零，0 是定义域里的禁区"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: { label: "x", min: 1, max: 12, step: 1, initial: 6 },
                  views: [
                    { kind: "readout", expr: "6/x", label: "y" },
                    { kind: "point", xExpr: "x", yExpr: "6/x" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x：x 变大，y 变小——一个变大、另一个变小，这就是“反比”。",
                "k≠0 且 x≠0：k=0 时 y=0 是常数函数，x=0 时分式无意义。"
              ],
              examples: [
                { text: "6 块披萨分给 x 个人：人越多，每人分得越少", figure: "仪表盘" }
              ],
              prev: "ch07-u1-l4-p1",
              next: "ch07-u2-l1-p2"
            },
            {
              id: "ch07-u2-l1-p2",
              title: "双曲线：关于原点对称的两支",
              concept: "反比例函数的图像是双曲线",
              formulas: [
                {
                  id: "f1",
                  latex: "y = \\frac{6}{x}",
                  translation: "k=6 的图像：两支双曲线，一支在一象限，一支在三象限"
                },
                {
                  id: "f2",
                  latex: "f(-x) = -f(x)",
                  translation: "f(−x) 等于 −f(x)：把图像转 180°，与原来完全重合——关于原点对称"
                }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "6/x",
                  xMin: -6,
                  xMax: 6,
                  step: 1,
                  autoPlay: true,
                  speed: 800
                }
              },
              auxInteraction: null,
              hints: [
                "点亮所有点：两支，x=0 是空的——中间的竖线是y轴，不是函数图像。",
                "k>0 时两支在一三象限；k<0 时在二四象限，k 的符号定象限。"
              ],
              examples: [
                { text: "k=−6 时：两支跑到二、四象限，形状一模一样", figure: "描点成像" }
              ],
              prev: "ch07-u2-l1-p1",
              next: "ch07-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch07-u2-l2",
          title: "反比例函数的性质",
          pages: [
            {
              id: "ch07-u2-l2-p1",
              title: "增减性：只能在每支内部比",
              concept: "反比例函数的增减性",
              formulas: [
                {
                  id: "f1",
                  latex: "k > 0",
                  translation: "k 大于 0 时：在 x>0 的一支和 x<0 的一支里，y 都随 x 增大而减小"
                },
                {
                  id: "f2",
                  latex: "k < 0",
                  translation: "k 小于 0 时：在每支内部，y 都随 x 增大而增大"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: -6, max: 6, step: 1, label: "x", expr: "6/x" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: -6, max: 6, step: 1, label: "x", expr: "-6/x" }
                  },
                  sync: ["x"],
                  labels: ["k=6>0", "k=−6<0"]
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x 从 1 到 6：y 从 6 降到 1；从 −6 到 −1：y 也下降——每支内部各自单调。",
                "别跨过 x=0 比大小：禁区两边是两个世界，单调只在每支内部成立。"
              ],
              examples: [
                { text: "比较大小题的坑：先看两点在不在同一支上", figure: "并排对比" }
              ],
              prev: "ch07-u2-l1-p2",
              next: "ch07-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch07-u2-l3",
          title: "本章小结",
          pages: [
            {
              id: "ch07-u2-l3-p1",
              title: "一图流：抛物线与双曲线",
              concept: "本章知识串联",
              formulas: [
                {
                  id: "f1",
                  latex: "y = ax^2 + bx + c (a \\neq 0)",
                  translation: "二次函数：图像是抛物线，顶点是最高点或最低点（最值）"
                },
                {
                  id: "f2",
                  latex: "y = \\frac{k}{x} (k \\neq 0)",
                  translation: "反比例函数：图像是双曲线，x=0 是禁区，k 的符号定象限"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: -4, max: 4, step: 0.5, label: "x", expr: "x^2" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: -4, max: 4, step: 1, label: "x", expr: "6/x" }
                  },
                  sync: ["x"],
                  labels: ["二次函数 y=x²：抛物线", "反比例函数 y=6/x：双曲线"]
                }
              },
              auxInteraction: null,
              hints: [
                "本章两条曲线：抛物线有顶点（管最值），双曲线有禁区（x≠0）。",
                "共同点：一个 x 对应唯一的 y；不同点：一个连成一片，一个断成两支。"
              ],
              examples: [
                { text: "同步拖 x：左边 y=x² 永远非负，右边 y=6/x 在 x=0 处显示“—”", figure: "并排对比" }
              ],
              prev: "ch07-u2-l2-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
