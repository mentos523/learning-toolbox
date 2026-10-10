/* ============================================================
 * 学习工具箱 · 数学 · 代数 第七章：二次函数与反比例函数（21 页）
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
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
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
                { id: "f2", latex: "y = x^2", translation: "y 等于 x 平方：最简单的二次函数，它的图像就是这条抛物线" }
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
              examples: [ { text: "扔铅球的轨迹、喷泉的水柱，都是抛物线", figure: "描点成像" } ],
              prev: null,
              next: "ch07-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：二次函数的定义",
              examples: [
                { figure: "辨析", text: "y=(m+1)x²+3x−2 是二次函数，则 m≠−1。" }
              ],
              formulas: [
                { id: "f1", latex: "y = 3x^2 - 2x + 1", translation: "a=3，b=−2，c=1：a≠0，是二次函数" },
                { id: "f2", latex: "y = 2x + 1", translation: "反例：最高 1 次，是一次函数不是二次" },
                { id: "f3", latex: "y = x^3", translation: "反例：最高 3 次，是三次函数" }
              ],
              hints: [
                "认二次函数看最高次：x 的最高指数是 2，且 a≠0。",
                "y=x²+1 是二次函数（b=0 可以缺）；y=2x²+x³ 不是（被三次项带偏）。"
              ],
              id: "ch07-u1-l1-p1b",
              interaction: {
                params: {
                  autoPlay: true,
                  fn: "3*x^2 - 2*x + 1",
                  speed: 800,
                  step: 0.5,
                  xMax: 3,
                  xMin: -2
                },
                type: "plot-points"
              },
              title: "二次函数：最高两次方",
              prev: "ch07-u1-l1-p1",
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
                  source: {
                    label: "a",
                    min: -3,
                    max: 3,
                    step: 0.5,
                    initial: 1
                  },
                  views: [
                    { kind: "readout", expr: "a*4", label: "y" },
                    { kind: "point", xExpr: "2", yExpr: "a*4" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看 x=2：a 为正时点在横轴上方——开口向上，反之向下；a=0 已不是二次函数。",
                "|a| 越大点离横轴越远：抛物线越“瘦”。"
              ],
              examples: [
                { text: "微笑（a>0）与哭脸（a<0）：开口方向一眼看穿", figure: "仪表盘" }
              ],
              prev: "ch07-u1-l1-p1b",
              next: "ch07-u1-l1-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：二次项系数 a",
              examples: [
                { figure: "变式练习", text: "y=−2x²：开口向下，比 y=−x² 瘦。" }
              ],
              formulas: [
                { id: "f1", latex: "y = 2x^2", translation: "a=2>0：开口向上；|a|=2，比 y=x² 瘦" },
                { id: "f2", latex: "y = -\\frac{1}{2}x^2", translation: "a=−1/2<0：开口向下；|a|=1/2，比 y=x² 胖" }
              ],
              hints: [
                "a>0 微笑（向上），a<0 哭脸（向下）。",
                "|a| 越大越瘦：a=3 的抛物线比 a=1 的“收”得更紧。"
              ],
              id: "ch07-u1-l1-p2b",
              interaction: {
                params: {
                  source: {
                    initial: 2,
                    label: "a",
                    max: 3,
                    min: -3,
                    step: 0.5
                  },
                  views: [
                    { expr: "a*4", kind: "readout", label: "x=2 时 y" },
                    { kind: "point", xExpr: "2", yExpr: "a*4" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "a：符号定开口大小定宽窄",
              prev: "ch07-u1-l1-p2",
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
                    params: {
                      min: -4,
                      max: 4,
                      step: 0.5,
                      label: "x",
                      expr: "x^2"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: -4,
                      max: 4,
                      step: 0.5,
                      label: "x",
                      expr: "(x-2)^2+1"
                    }
                  },
                  sync: [ "x" ],
                  labels: [ "y=x²：顶点 (0,0)", "y=(x−2)²+1：顶点 (2,1)" ]
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
              prev: "ch07-u1-l1-p2b",
              next: "ch07-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：顶点式",
              examples: [
                { figure: "变式练习", text: "y=3(x−2)²+5：顶点 (2,5)，最小值 5。" }
              ],
              formulas: [
                { id: "f1", latex: "y = 2(x + 1)^2 - 3", translation: "a=2，h=−1，k=−3：顶点 (−1,−3)" },
                { id: "f2", latex: "y = -(x - 4)^2", translation: "a=−1，h=4，k=0：顶点 (4,0)，开口向下" }
              ],
              hints: [
                "顶点式 y=a(x−h)²+k：顶点 (h,k)，注意 h 的符号——(x+1)² 里 h=−1。",
                "a 的符号定开口：a>0 顶点是最低点，a<0 顶点是最高点。"
              ],
              id: "ch07-u1-l2-p1b",
              interaction: {
                params: {
                  expr: "2*(x+1)^2-3",
                  label: "x",
                  max: 2,
                  min: -4,
                  step: 0.5,
                  target: -3,
                  targetLabel: "最小值 −3"
                },
                type: "slider-lab"
              },
              title: "顶点式：顶点写在脸上",
              prev: "ch07-u1-l2-p1",
              next: "ch07-u1-l2-p1g"
            },
            {
              auxInteraction: null,
              concept: "图形：抛物线的平移",
              examples: [
                {
                  figure: "数形结合",
                  text: "y=(x+3)²−2：顶点 (−3,−2)，由 y=x² 左移 3、下移 2 得到。"
                }
              ],
              formulas: [
                { id: "f1", latex: "y = (x-2)^2 + 1", translation: "顶点 (2,1)：h=2 右移，k=1 上移" },
                { id: "f2", latex: "\\text{形状不变}", translation: "a=1 没变：开口大小形状完全一样，只是位置搬了家" }
              ],
              hints: [
                "两条抛物线同步描点：形状一模一样，整条平移。",
                "h 管左右（左加右减），k 管上下（上加下减）。"
              ],
              id: "ch07-u1-l2-p1g",
              interaction: {
                params: {
                  labels: [ "y=x²：顶点 (0,0)", "y=(x−2)²+1：顶点 (2,1)" ],
                  left: {
                    kind: "plot-points",
                    params: {
                      autoPlay: true,
                      fn: "x^2",
                      speed: 500,
                      step: 1,
                      xMax: 4,
                      xMin: -4
                    }
                  },
                  right: {
                    kind: "plot-points",
                    params: {
                      autoPlay: true,
                      fn: "(x-2)^2+1",
                      speed: 500,
                      step: 1,
                      xMax: 6,
                      xMin: -2
                    }
                  }
                },
                type: "side-compare"
              },
              title: "平移：顶点搬家整条走",
              prev: "ch07-u1-l2-p1b",
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
                    params: {
                      min: -5,
                      max: 3,
                      step: 0.5,
                      label: "x",
                      expr: "x^2+6*x+5"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: -5,
                      max: 3,
                      step: 0.5,
                      label: "x",
                      expr: "(x+3)^2-4"
                    }
                  },
                  sync: [ "x" ],
                  labels: [ "一般式：y=x²+6x+5", "顶点式：y=(x+3)²−4" ]
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
              prev: "ch07-u1-l2-p1g",
              next: "ch07-u1-l2-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：一般式与顶点式的互化",
              examples: [
                { figure: "变式练习", text: "y=2x²+8x+5=2(x+2)²−3：顶点 (−2,−3)。" }
              ],
              formulas: [
                { id: "f1", latex: "y = x^2 - 4x + 1", translation: "第一步：x²−4x 配成 (x−2)²−4" },
                { id: "f2", latex: "y = (x - 2)^2 - 3", translation: "第二步：−4+1=−3，顶点式完成" },
                { id: "f3", latex: "(2, -3)", translation: "顶点 (2,−3)：开口向上，最小值 −3" }
              ],
              hints: [
                "配方四步：提 a；括号里配方；括号外整理；读顶点。",
                "x²−4x+1：(−4/2)²=4，(x−2)²−4+1=(x−2)²−3。"
              ],
              id: "ch07-u1-l2-p2b",
              interaction: {
                params: {
                  labels: [ "一般式", "顶点式" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "x^2-4*x+1",
                      label: "x",
                      max: 6,
                      min: -2,
                      step: 0.5
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "(x-2)^2-3",
                      label: "x",
                      max: 6,
                      min: -2,
                      step: 0.5
                    }
                  },
                  sync: [ "x" ]
                },
                type: "side-compare"
              },
              title: "配方：一般式变顶点式",
              prev: "ch07-u1-l2-p2",
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
                { id: "f2", latex: "x = 1", translation: "对称轴 x=1：x=1+t 与 x=1−t 的函数值永远相等，抛物线左右镜像" }
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
              prev: "ch07-u1-l2-p2b",
              next: "ch07-u1-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：对称轴与顶点",
              examples: [
                { figure: "变式练习", text: "y=x²−6x+5：对称轴 x=3，顶点 (3,−4)。" }
              ],
              formulas: [
                { id: "f1", latex: "y = x^2 + 2x", translation: "配方：(x+1)²−1，顶点 (−1,−1)" },
                { id: "f2", latex: "x = -1", translation: "对称轴 x=−1：x=−1+t 与 x=−1−t 函数值相等" }
              ],
              hints: [
                "对称轴 x=h（顶点横坐标）：沿它对折，抛物线两边重合。",
                "对称轴公式：x=−b/(2a)——配方一次就记住它。"
              ],
              id: "ch07-u1-l3-p1b",
              interaction: {
                params: {
                  expr: "(x+1)^2-1",
                  label: "x",
                  max: 2,
                  min: -4,
                  step: 0.5,
                  target: -1,
                  targetLabel: "最小值 −1"
                },
                type: "slider-lab"
              },
              title: "对称轴：对折重合的线",
              prev: "ch07-u1-l3-p1",
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
              prev: "ch07-u1-l3-p1b",
              next: "ch07-u1-l4-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：二次函数的最值应用",
              examples: [
                { figure: "生活实例", text: "定价：单价 x 元，利润 y=−2x²+100x：x=25 时利润最大。" }
              ],
              formulas: [
                { id: "f1", latex: "S = x(60 - 2x)", translation: "设宽 x 米，长 (60−2x) 米（靠墙围，墙作一边）" },
                { id: "f2", latex: "S = -2x^2 + 60x", translation: "展开：a=−2<0，开口向下，有最大值" },
                { id: "f3", latex: "x = 15", translation: "x=−b/2a=15：宽 15 米，长 30 米，最大 450 平方米" }
              ],
              hints: [
                "建模三步：设自变量列函数式；化成顶点式（或套公式）；顶点即答案。",
                "别忘了定义域：x>0 且 60−2x>0，即 0<x<30。"
              ],
              id: "ch07-u1-l4-p1b",
              interaction: {
                params: {
                  expr: "x*(60-2*x)",
                  label: "x",
                  max: 30,
                  min: 0,
                  step: 1,
                  target: 450,
                  targetLabel: "最大面积 450",
                  unit: "平方米"
                },
                type: "slider-lab"
              },
              title: "最值应用：建模三步",
              prev: "ch07-u1-l4-p1",
              next: "ch07-u1-l4-p2"
            }            ,
            {
              id: "ch07-u1-l4-p2",
              title: "扔铅球：能飞多远？",
              concept: "抛物线应用",
              formulas: [
                { id: "f1", latex: "y = 10t - 4.9t^2", translation: "铅球高度 y 等于 10t 减 4.9 倍 t 平方（初速 10，角度 90 度简化）" },
                { id: "f2", latex: "10t - 4.9t^2 = 0", translation: "落地时高度为 0，解得 t 约 2.04 秒" }
              ],
              interaction: {
                type: "slow-replay",
                params: {
                  frames: 60,
                  duration: 3000,
                  draw: {
                    kind: "projectile",
                    params: { v0: 14, angle: 45, g: 9.8 }
                  },
                  scrubber: true
                }
              },
              auxInteraction: null,
              hints: [
                "铅球出手后划出一道弧线，落地时高度 y = 0。",
                "落地点就是方程的解：抛物线与 x 轴的交点。"
              ],
              examples: [ { text: "看动画：铅球飞出去，落在哪里？", figure: "抛物线" } ],
              prev: "ch07-u1-l4-p1b",
              next: "ch07-u1-l4-p3"
            },
            {
              id: "ch07-u1-l4-p3",
              title: "最高点：顶点就是最值",
              concept: "顶点与最值",
              formulas: [
                { id: "f1", latex: "y = -4.9t^2 + 10t", translation: "高度关于时间的二次函数，开口向下" },
                { id: "f2", latex: "t = 1.02", translation: "顶点横坐标约 1.02 秒时达到最高" }
              ],
              interaction: {
                type: "slow-replay",
                params: {
                  frames: 60,
                  duration: 3000,
                  draw: {
                    kind: "projectile",
                    params: { v0: 14, angle: 45, g: 9.8 }
                  },
                  scrubber: true
                }
              },
              auxInteraction: null,
              hints: [
                "抛物线升到最高再下落，最高点就是顶点。",
                "顶点横坐标对应最值：这是二次函数最重要的应用。"
              ],
              examples: [ { text: "定格在最高点：此时速度方向水平", figure: "顶点" } ],
              prev: "ch07-u1-l4-p2",
              next: "ch07-u1-l4-p4"
            },
            {
              id: "ch07-u1-l4-p4",
              title: "喷泉：45° 射得最远？",
              concept: "角度探究",
              formulas: [
                { id: "f1", latex: "R = \frac{v_0^2 \sin 2\theta}{g}", translation: "射程 R 等于初速平方乘 sin2θ 除以 g" }
              ],
              interaction: {
                type: "slow-replay",
                params: {
                  frames: 60,
                  duration: 3000,
                  draw: {
                    kind: "projectile",
                    params: { v0: 14, angle: 30, g: 9.8 }
                  },
                  scrubber: true
                }
              },
              auxInteraction: null,
              hints: [
                "同样初速，30°、45°、60° 哪个射得远？",
                "sin2θ 在 θ=45° 时最大，所以 45° 最远——这是有数学证明的。"
              ],
              examples: [ { text: "对比：30° 低平远射 vs 60° 高吊", figure: "角度对比" } ],
              prev: "ch07-u1-l4-p3",
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
                { id: "f2", latex: "x \\neq 0", translation: "x 不等于 0：分母不能为零，0 是定义域里的禁区" }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "x",
                    min: 1,
                    max: 12,
                    step: 1,
                    initial: 6
                  },
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
              prev: "ch07-u1-l4-p1b",
              next: "ch07-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：反比例函数的定义",
              examples: [
                { figure: "生活实例", text: "120 千米路程：速度 v 与时间 t 反比，vt=120。" }
              ],
              formulas: [
                { id: "f1", latex: "y = \\frac{12}{x}", translation: "xy=12：x 与 y 的乘积恒为 12" },
                { id: "f2", latex: "(2, 6), (3, 4), (4, 3)", translation: "三组对应值：乘积都是 12" }
              ],
              hints: [
                "反比例=乘积定值：xy=k，x 扩大几倍，y 就缩小几倍。",
                "k≠0 且 x≠0：k=0 退化成 y=0，x=0 分母无意义。"
              ],
              id: "ch07-u2-l1-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 3,
                    label: "x",
                    max: 12,
                    min: 1,
                    step: 1
                  },
                  views: [
                    { expr: "12/x", kind: "readout", label: "y" },
                    { kind: "point", xExpr: "x", yExpr: "12/x" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "反比例：xy=k 恒定",
              prev: "ch07-u2-l1-p1",
              next: "ch07-u2-l1-p2"
            },
            {
              id: "ch07-u2-l1-p2",
              title: "双曲线：关于原点对称的两支",
              concept: "反比例函数的图像是双曲线",
              formulas: [
                { id: "f1", latex: "y = \\frac{6}{x}", translation: "k=6 的图像：两支双曲线，一支在一象限，一支在三象限" },
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
              prev: "ch07-u2-l1-p1b",
              next: "ch07-u2-l1-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：反比例函数的图像",
              examples: [
                { figure: "变式练习", text: "y=8/x：一三象限；y=−8/x：二四象限。" }
              ],
              formulas: [
                { id: "f1", latex: "y = \\frac{-4}{x}", translation: "k=−4<0：两支在二、四象限" },
                { id: "f2", latex: "(2, -2), (-2, 2)", translation: "点 (2,−2) 转 180° 到 (−2,2)：关于原点对称" }
              ],
              hints: [
                "k>0 一三象限，k<0 二四象限：k 的符号定象限。",
                "双曲线永远碰不到坐标轴：x=0、y=0 都是禁区。"
              ],
              id: "ch07-u2-l1-p2b",
              interaction: {
                params: {
                  autoPlay: true,
                  fn: "-4/x",
                  speed: 800,
                  step: 1,
                  xMax: 6,
                  xMin: -6
                },
                type: "plot-points"
              },
              title: "双曲线：k 定象限",
              prev: "ch07-u2-l1-p2",
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
                { id: "f2", latex: "k < 0", translation: "k 小于 0 时：在每支内部，y 都随 x 增大而增大" }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: -6,
                      max: 6,
                      step: 1,
                      label: "x",
                      expr: "6/x"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: -6,
                      max: 6,
                      step: 1,
                      label: "x",
                      expr: "-6/x"
                    }
                  },
                  sync: [ "x" ],
                  labels: [ "k=6>0", "k=−6<0" ]
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
              prev: "ch07-u2-l1-p2b",
              next: "ch07-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：反比例函数的增减性",
              examples: [
                { figure: "易错提醒", text: "y=6/x 上 A(−1,−6)、B(2,3)：跨支，−6<3；同支内才用增减。" }
              ],
              formulas: [
                { id: "f1", latex: "y = \\frac{4}{x}", translation: "k=4>0：每支内部 y 随 x 增大而减小" },
                { id: "f2", latex: "x_1 = -2 < 1 = x_2", translation: "但 y₁=−2 < 4=y₂：跨过禁区，“减小”失效" }
              ],
              hints: [
                "增减性只在每支内部成立：比较前先看两点在不在同一支。",
                "经典坑：x₁<0<x₂ 时，y₁<y₂ 与 k 的符号无关——别套单调性。"
              ],
              id: "ch07-u2-l2-p1b",
              interaction: {
                params: {
                  labels: [ "k=4>0", "k=−4<0" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "4/x",
                      label: "x",
                      max: 6,
                      min: -6,
                      step: 1
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "-4/x",
                      label: "x",
                      max: 6,
                      min: -6,
                      step: 1
                    }
                  },
                  sync: [ "x" ]
                },
                type: "side-compare"
              },
              title: "增减性：别跨禁区比",
              prev: "ch07-u2-l2-p1",
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
                    params: {
                      min: -4,
                      max: 4,
                      step: 0.5,
                      label: "x",
                      expr: "x^2"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: -4,
                      max: 4,
                      step: 1,
                      label: "x",
                      expr: "6/x"
                    }
                  },
                  sync: [ "x" ],
                  labels: [ "二次函数 y=x²：抛物线", "反比例函数 y=6/x：双曲线" ]
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
              prev: "ch07-u2-l2-p1b",
              next: "ch07-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch07-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch07-ux-l1",
          title: "第七章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．2；2．(−2,1)，下；3．y=(x−2)²−1；4．窄；5．2；6．二、四；7．S=x(20−x)，x=10"
                }
              ],
              formulas: [
                { id: "f1", latex: "y = x^2 - 4x + 3", translation: "第 3 题：(x−2)²−1，顶点 (2,−1)" }
              ],
              hints: [
                "1．y=(k−2)x² 是二次函数，则 k≠____。",
                "2．y=−3(x+2)²+1 的顶点是____，开口向____。",
                "3．y=x²−4x+3 配方成顶点式：____。",
                "4．y=2x² 的图像比 y=x²____（宽/窄）。",
                "5．y=10/x 中，当 x=5 时 y=____。",
                "6．y=−5/x 的图像在第____、____象限。",
                "7．矩形周长 40 米，长 x 米，面积 S=____，x=____ 时面积最大。"
              ],
              id: "ch07-ux-l1-p1",
              interaction: {
                params: {
                  autoPlay: true,
                  fn: "x^2 - 4*x + 3",
                  speed: 800,
                  step: 0.5,
                  xMax: 5,
                  xMin: -1
                },
                type: "plot-points"
              },
              title: "第七章习题：函数图像",
              prev: "ch07-u2-l3-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
