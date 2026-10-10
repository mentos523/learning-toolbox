/* ============================================================
 * 学习工具箱 · 数学 · 代数 第十一章：导数（21 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第十一章 v2.0）：
 * 11.1.1 平均变化率 / 11.1.2 瞬时变化率与导数 / 11.1.3 导数的几何意义 /
 * 11.2.1 基本初等函数的导数（幂/指数/对数/三角，三角前置见 8.3）/
 * 11.2.2 求导法则（和差积商）/ 11.2.3 链式法则（v2.0 从 11.2.2 拆出）/
 * 11.3.1 单调性 / 11.3.2 极值 / 11.3.3 最值 / 11.3.4 本章小结。
 *
 * 页面：u1-l1-p1 割线斜率：平均变化率（11.1.1，割线斜率=Δy/Δx）
 *       u1-l2-p1 h→0：平均变化率趋向 2（11.1.2，极限定义 f'(1)）
 *       u1-l3-p1 切线斜率就是导数（11.1.3，切线方程）
 *       u2-l1-p1 求导公式表：先看三角（11.2.1，sin→cos 并排描点，承接 8.3）
 *       u2-l2-p1 积的导数≠导数的积（11.2.2，积法则 vs 错法并排证伪）
 *       u2-l3-p1 链式法则：剥洋葱（11.2.3，x→u→y 三联动）
 *       u3-l1-p1 f'>0 上坡，f'<0 下坡（11.3.1，y=x³-3x 单调性）
 *       u3-l2-p1 山峰山谷：导数为 0 处（11.3.2，驻点 x=±1）
 *       u3-l3-p1 闭区间最值：端点也参选（11.3.3，x² 在 [-1,2]）
 *       u3-l4-p1 本章小结：从变化率到最值（11.3.4，一图流：路 vs 坡度计）
 * 交互复用已实现渲染器：slider-lab（label 均为纯变量名，expr 只含单个变量；
 *   target 只在网格可达时设置：p1 x=2 时 (x²-1)/(x-1)=3（min 1.5/step 0.5，
 *   node 已验 1.5+0.5===2）；p8 x=±1 时 3x²-3=0（min -2/step 0.25，
 *   node 已验 -2+4*0.25===-1、-2+12*0.25===1）；p9 x=2 时 x²=4
 *   （min -1/step 0.25，node 已验 -1+12*0.25===2））/
 * linked-dashboard（拖切点→斜率读数；x→u→y→y' 四联动；x→点→f'(x) 三联动；
 *   evalExpr 已支持 sin/cos/tan）/
 * side-compare（仅内嵌 plot-points / slider-lab，不可嵌套；sync 同名滑块联动）。
 * 绿队审计结论落实：
 *   - 每页 hints ≤ 2 条、总字数（两条 hint 字符串 JS .length 之和）≤ 70
 *   - 定义条件齐全：h≠0（分母不能为 0）、(ln x)' 要求 x>0、
 *     商法则 g≠0、闭区间 [-1,2] 端点参选
 *   - LaTeX 仅用渲染器支持子集（\\lim \\to \\Delta \\frac \\cdot \\text
 *     \\sin \\cos \\ln \\max \\min 与求导撇 '），无 \\dots、
 *     latex 公式中无 Unicode 省略号（hints/translation 纯文本中的 … 不受影响）
 *   - 数值全部 node 实测：(2²-1)/(2-1)=3、h=0.1/0.01 时 2.1/2.01、
 *     x=1 时积法则 2.2232=数值导数≠错法 1.0806、
 *     x=1 时链式 cos1·2=1.0806=数值导数、
 *     x³-3x 在 x=-1/1 取 2/-2、x² 在 [-1,2] 上最大 4（x=2）最小 0（x=0）
 * 黄队教学流：落实跃升 6 脚手架（割线→h→0→切线斜率，三页即 11.1）；
 * 11.2.1 落实课程体系注记"三角函数前置见 8.3"——sin/cos 并排描点认旧友；
 * p5 用"证伪"式对比（错法 f'·g'）先动手看到对不上，再给积法则；
 * p10 小结预埋"已知坡度求路程"指向第十二章积分。
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch11"] = {
  id: "ch11",
  title: "导数",
  units: [
    {
      id: "ch11-u1",
      title: "导数的概念",
      lessons: [
        {
          id: "ch11-u1-l1",
          title: "平均变化率",
          pages: [
            {
              id: "ch11-u1-l1-p1",
              title: "割线斜率：平均变化率",
              concept: "平均变化率",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{\\Delta y}{\\Delta x} = \\frac{f(x_2) - f(x_1)}{x_2 - x_1}",
                  translation: "平均变化率：y 的增量除以 x 的增量——几何上就是割线的斜率"
                },
                {
                  id: "f2",
                  latex: "\\frac{2^2 - 1^2}{2 - 1} = 3",
                  translation: "y=x² 从 x=1 到 x=2：平均变化率是 3——这段割线的斜率"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1.5,
                  max: 4,
                  step: 0.5,
                  label: "x",
                  expr: "(x^2-1)/(x-1)",
                  target: 3,
                  targetLabel: "找：斜率=3 时第二点在哪"
                }
              },
              auxInteraction: null,
              hints: [
                "拖动第二点：区间越短，割线越贴近曲线，斜率越接近那一点的陡峭程度。",
                "0–10 秒走 100 米：平均速度 10 m/s，这就是平均变化率。"
              ],
              examples: [ { text: "爬坡：两点间的平均坡度就是割线斜率", figure: "滑块实验" } ],
              prev: "ch10-ub-l1-p1",
              next: "ch11-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：平均变化率",
              examples: [
                { figure: "生活实例", text: "股票：周一 10 元周五 15 元，平均每天涨 1 元。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{100 - 0}{10 - 0} = 10",
                  translation: "0–10 秒跑 100 米：平均速度 10 m/s"
                },
                { id: "f2", latex: "\\frac{3^2 - 1^2}{3 - 1} = 4", translation: "y=x² 从 x=1 到 3：平均变化率 4" }
              ],
              hints: [
                "平均变化率=Δy/Δx：纵增量除以横增量。",
                "它只管“平均”：中间忽快忽慢，它都看不见。"
              ],
              id: "ch11-u1-l1-p1b",
              interaction: {
                params: {
                  expr: "(x^2-1)/(x-1)",
                  label: "x",
                  max: 4,
                  min: 1.5,
                  step: 0.5,
                  target: 3,
                  targetLabel: "找：斜率=3 时第二点在哪"
                },
                type: "slider-lab"
              },
              title: "平均变化率：两点间坡度",
              prev: "ch11-u1-l1-p1",
              next: "ch11-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch11-u1-l2",
          title: "瞬时变化率与导数",
          pages: [
            {
              id: "ch11-u1-l2-p1",
              title: "h→0：平均变化率趋向 2",
              concept: "导数的极限定义",
              formulas: [
                {
                  id: "f1",
                  latex: "f'(1) = \\lim_{h \\to 0} \\frac{(1+h)^2 - 1}{h}",
                  translation: "导数定义：h→0 时平均变化率的极限——y=x² 在 x=1 处的导数"
                },
                {
                  id: "f2",
                  latex: "\\lim_{h \\to 0} \\frac{(1+h)^2 - 1}{h} = 2",
                  translation: "算出来是 2：h=1, 0.1, 0.01 时得 3, 2.1, 2.01，越来越靠近 2"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0.01,
                  max: 1,
                  step: 0.01,
                  label: "h",
                  expr: "((1+h)^2-1)/h"
                }
              },
              auxInteraction: null,
              hints: [
                "把 h 往左拖到最小：读数 3→2.1→2.01→…，它在逼近 2。",
                "'h→0'不是让 h 等于 0（分母不能为 0），而是'无限靠近 0'。"
              ],
              examples: [
                { text: "时速表：某一瞬间的速度就是位移函数的导数", figure: "滑块实验" }
              ],
              prev: "ch11-u1-l1-p1b",
              next: "ch11-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：导数的极限定义",
              examples: [
                { figure: "生活实例", text: "时速表：h 是 1 小时→1 分钟→1 秒，越来越“瞬时”。" }
              ],
              formulas: [
                { id: "f1", latex: "h = 1: \\frac{2^2 - 1}{1} = 3", translation: "h=1：平均变化率 3" },
                { id: "f2", latex: "h = 0.01: 2.01", translation: "h=0.01：2.01" },
                { id: "f3", latex: "h \\to 0: 2", translation: "h→0：趋向 2——这就是 f'(1)" }
              ],
              hints: [
                "h 是区间长度：h 越小，平均变化率越接近瞬时变化率。",
                "h→0 不是 h=0：分母不能为 0，是“无限靠近”。"
              ],
              id: "ch11-u1-l2-p1b",
              interaction: {
                params: {
                  expr: "((1+h)^2-1)/h",
                  label: "h",
                  max: 1,
                  min: 0.01,
                  step: 0.01
                },
                type: "slider-lab"
              },
              title: "h→0：区间缩成一点",
              prev: "ch11-u1-l2-p1",
              next: "ch11-u1-l3-p1"
            }
          ]
        },
        {
          id: "ch11-u1-l3",
          title: "导数的几何意义",
          pages: [
            {
              id: "ch11-u1-l3-p1",
              title: "切线斜率就是导数",
              concept: "导数的几何意义",
              formulas: [
                {
                  id: "f1",
                  latex: "f'(x_0) = \\text{切线斜率}",
                  translation: "导数的几何意义：f'(x₀) 就是曲线在 x₀ 处切线的斜率"
                },
                {
                  id: "f2",
                  latex: "y - 1 = 2(x - 1)",
                  translation: "切线方程：y=x² 在点 (1,1) 处切线斜率为 2，方程是 y−1=2(x−1)"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "x",
                    min: -3,
                    max: 3,
                    step: 0.1,
                    initial: 1
                  },
                  views: [
                    {
                      kind: "point",
                      xExpr: "x",
                      yExpr: "x^2",
                      axisLabelX: "x",
                      axisLabelY: "y"
                    },
                    { kind: "readout", expr: "2*x", label: "切线斜率 f'(x)" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖动切点：点走到哪，斜率读数就报出那一点切线的斜率。",
                "x<0 时斜率为负：切线'向下俯'——导数的正负就是'上扬还是下俯'。"
              ],
              examples: [
                { text: "放大镜：曲线局部放大像直线，那条直线的斜率就是导数", figure: "联动仪表盘" }
              ],
              prev: "ch11-u1-l2-p1b",
              next: "ch11-u1-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：导数的几何意义",
              examples: [
                { figure: "变式练习", text: "y=√x 在 (4,2)：f'(4)=1/4，切线 y−2=(x−4)/4。" }
              ],
              formulas: [
                { id: "f1", latex: "y = x^3", translation: "y=x³ 在 x=1 处" },
                { id: "f2", latex: "y - 1 = 3(x - 1)", translation: "f'(1)=3：切线 y−1=3(x−1)" }
              ],
              hints: [
                "切线方程三步：求切点、求斜率 f'(x₀)、点斜式写方程。",
                "导数>0 切线往上扬，<0 往下俯，=0 水平。"
              ],
              id: "ch11-u1-l3-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 1,
                    label: "x",
                    max: 3,
                    min: -3,
                    step: 0.1
                  },
                  views: [
                    {
                      axisLabelX: "x",
                      axisLabelY: "y",
                      kind: "point",
                      xExpr: "x",
                      yExpr: "x^3"
                    },
                    { expr: "3*x^2", kind: "readout", label: "切线斜率 f'(x)" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "切线：导数的几何脸",
              prev: "ch11-u1-l3-p1",
              next: "ch11-u1-l3-p1g"
            },
            {
              auxInteraction: null,
              concept: "图形：割线逼近切线",
              examples: [
                { figure: "数形结合", text: "地球表面：站得近看是平面，放大看地球是圆的——同一个道理。" }
              ],
              formulas: [
                { id: "f1", latex: "f'(1) = 2", translation: "y=x² 在 x=1 处切线斜率是 2" },
                { id: "f2", latex: "\\text{割线} \\to \\text{切线}", translation: "放大：割线越来越贴近切线" }
              ],
              hints: [
                "一级级放大 x=1 附近：曲线越来越直，最后像直线。",
                "那条“像直线”的极限位置就是切线，它的斜率=导数。"
              ],
              id: "ch11-u1-l3-p1g",
              interaction: {
                params: {
                  caption: "放大到足够大，曲线看起来像直线了",
                  center: 1,
                  fn: "x^2",
                  levels: 4,
                  window: 2
                },
                type: "zoomer"
              },
              title: "放大镜：曲线放大变直线",
              prev: "ch11-u1-l3-p1b",
              next: "ch11-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch11-u2",
      title: "求导",
      lessons: [
        {
          id: "ch11-u2-l1",
          title: "基本初等函数的导数",
          pages: [
            {
              id: "ch11-u2-l1-p1",
              title: "求导公式表：幂法则先行",
              concept: "基本初等函数的导数",
              formulas: [
                { id: "f1", latex: "(x^n)' = n x^{n-1}", translation: "幂法则：指数落下来当系数，指数减 1——如 (x³)'=3x²" },
                { id: "f2", latex: "(e^x)' = e^x", translation: "指数法则：eˣ 求导不变；一般 (aˣ)'=aˣ ln a" },
                { id: "f3", latex: "(\\ln x)' = \\frac{1}{x}", translation: "对数法则：(ln x)'=1/x（x>0）" }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "plot-points",
                    params: {
                      fn: "sin(x)",
                      xMin: 0,
                      xMax: 6.3,
                      step: 0.2,
                      autoPlay: true,
                      speed: 400
                    }
                  },
                  right: {
                    kind: "plot-points",
                    params: {
                      fn: "cos(x)",
                      xMin: 0,
                      xMax: 6.3,
                      step: 0.2,
                      autoPlay: true,
                      speed: 400
                    }
                  },
                  labels: [ "y = sin x（原函数）", "y' = cos x（它的斜率函数）" ]
                }
              },
              auxInteraction: null,
              hints: [
                "右图：sin x 每点斜率连起来就是 cos x，即 (sin x)'=cos x。",
                "符号别错：(cos x)'=−sin x，多一个负号。"
              ],
              examples: [
                { text: "8.3 的前置：三角函数图像当时只讲定义，现在它的导数也有了", figure: "并排对比" }
              ],
              prev: "ch11-u1-l3-p1g",
              next: "ch11-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：基本初等函数的导数",
              examples: [
                { figure: "变式练习", text: "(x²+3x)'=2x+3：和差法则，先拆再导。" }
              ],
              formulas: [
                { id: "f1", latex: "(x^5)' = 5x^4", translation: "指数 5 落下来当系数，指数减 1" },
                {
                  id: "f2",
                  latex: "(\\frac{1}{x})' = -\\frac{1}{x^2}",
                  translation: "1/x=x⁻¹：(−1)x⁻²=−1/x²"
                },
                {
                  id: "f3",
                  latex: "(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}",
                  translation: "√x=x^(1/2)：(1/2)x^(−1/2)"
                }
              ],
              hints: [
                "幂法则 (xⁿ)'=nxⁿ⁻¹：先把分数、根号化成 xⁿ 再求导。",
                "常数求导是 0：(5)'=0——水平的线，斜率为 0。"
              ],
              id: "ch11-u2-l1-p1b",
              interaction: {
                params: {
                  labels: [ "y=sin x", "y'=cos x" ],
                  left: {
                    kind: "plot-points",
                    params: {
                      autoPlay: true,
                      fn: "sin(x)",
                      speed: 400,
                      step: 0.2,
                      xMax: 6.3,
                      xMin: 0
                    }
                  },
                  right: {
                    kind: "plot-points",
                    params: {
                      autoPlay: true,
                      fn: "cos(x)",
                      speed: 400,
                      step: 0.2,
                      xMax: 6.3,
                      xMin: 0
                    }
                  }
                },
                type: "side-compare"
              },
              title: "求导公式：先背幂法则",
              prev: "ch11-u2-l1-p1",
              next: "ch11-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch11-u2-l2",
          title: "求导法则",
          pages: [
            {
              id: "ch11-u2-l2-p1",
              title: "积的导数≠导数的积",
              concept: "积法则",
              formulas: [
                { id: "f1", latex: "(f + g)' = f' + g'", translation: "和差法则：分别求导再相加减——最省心的一条" },
                {
                  id: "f2",
                  latex: "(f \\cdot g)' = f' g + f g'",
                  translation: "积法则：'前导后不导'加'前不导后导'——不是 f'·g'"
                },
                {
                  id: "f3",
                  latex: "(\\frac{f}{g})' = \\frac{f' g - f g'}{g^2}",
                  translation: "商法则：分子'上导下不导减上不导下导'，分母 g²（g≠0）"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: 0.5,
                      max: 3,
                      step: 0.5,
                      label: "x",
                      expr: "2*x*sin(x)+x^2*cos(x)"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: 0.5,
                      max: 3,
                      step: 0.5,
                      label: "x",
                      expr: "2*x*cos(x)"
                    }
                  },
                  sync: [ "x" ],
                  labels: [
                    "积法则：(x²·sin x)'=2x·sin x+x²·cos x",
                    "错法：f'·g'=2x·cos x"
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖滑块：两边读数对不上——'分别求导再相乘'是错的。",
                "口诀：积法则'各导一次再相加'；商法则分母是 g²，减号别写成加号。"
              ],
              examples: [
                { text: "(x²·x³)'=5x⁴：积法则得 2x·x³+x²·3x=5x⁴，对得上", figure: "并排对比" }
              ],
              prev: "ch11-u2-l1-p1b",
              next: "ch11-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：积法则与商法则",
              examples: [
                { figure: "变式练习", text: "(x·eˣ)'=eˣ+x·eˣ=(1+x)eˣ。" }
              ],
              formulas: [
                { id: "f1", latex: "(x^2 \\cdot x^3)' = 5x^4", translation: "积法则：2x·x³+x²·3x=5x⁴" },
                {
                  id: "f2",
                  latex: "(\\frac{x^2}{x})' = 1",
                  translation: "商法则：(2x·x−x²·1)/x²=1——其实就是 (x)'"
                }
              ],
              hints: [
                "积法则：前导后不导 + 前不导后导；商法则：上导下不导 − 上不导下导，除以 g²。",
                "商法则的减号是命：写成加号就全错。"
              ],
              id: "ch11-u2-l2-p1b",
              interaction: {
                params: {
                  labels: [ "积法则", "错法 f'·g'" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "2*x*sin(x)+x^2*cos(x)",
                      label: "x",
                      max: 3,
                      min: 0.5,
                      step: 0.5
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "2*x*cos(x)",
                      label: "x",
                      max: 3,
                      min: 0.5,
                      step: 0.5
                    }
                  },
                  sync: [ "x" ]
                },
                type: "side-compare"
              },
              title: "积法则商法则：口诀",
              prev: "ch11-u2-l2-p1",
              next: "ch11-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch11-u2-l3",
          title: "链式法则",
          pages: [
            {
              id: "ch11-u2-l3-p1",
              title: "链式法则：剥洋葱",
              concept: "链式法则",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
                  translation: "链式法则：y 对 x 求导 = y 对 u 求导 乘 u 对 x 求导——像接力"
                },
                {
                  id: "f2",
                  latex: "(\\sin(x^2))' = \\cos(x^2) \\cdot 2x",
                  translation: "例 y=sin(x²)：外层 sin→cos(x²)，内层 x²→2x，两段相乘"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "x",
                    min: -2,
                    max: 2,
                    step: 0.1,
                    initial: 1
                  },
                  views: [
                    { kind: "readout", expr: "x^2", label: "u = x²（内层）" },
                    { kind: "readout", expr: "sin(x^2)", label: "y = sin u（外层）" },
                    { kind: "readout", expr: "cos(x^2)*2*x", label: "y' = cos u · 2x" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x：u=x² 先变，y=sin u 跟着变——外导乘内导。",
                "最易漏内层：(sin x²)' 不是 cos x²，2x 不能丢。"
              ],
              examples: [
                { text: "剥洋葱：y=sin(x²) 先剥外层 sin，再剥内层 x²", figure: "联动仪表盘" }
              ],
              prev: "ch11-u2-l2-p1b",
              next: "ch11-u2-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：链式法则",
              examples: [
                { figure: "变式练习", text: "y=e^(2x)：外导 e^u，内导 2，y'=2e^(2x)。" }
              ],
              formulas: [
                { id: "f1", latex: "y = (3x + 1)^5", translation: "分层：外层 u⁵，内层 u=3x+1" },
                { id: "f2", latex: "y' = 5(3x + 1)^4 \\cdot 3", translation: "外导 5u⁴，内导 3：相乘" }
              ],
              hints: [
                "链式三步：分层（外/内）；外导×内导；把 u 代回去。",
                "层数=求导次数：三层复合就乘三次，别漏。"
              ],
              id: "ch11-u2-l3-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 1,
                    label: "x",
                    max: 2,
                    min: -2,
                    step: 0.1
                  },
                  views: [
                    { expr: "3*x+1", kind: "readout", label: "u=3x+1（内层）" },
                    { expr: "(3*x+1)^5", kind: "readout", label: "y=u⁵（外层）" },
                    { expr: "5*(3*x+1)^4*3", kind: "readout", label: "y'=5u⁴·3" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "链式法则：先分层",
              prev: "ch11-u2-l3-p1",
              next: "ch11-u3-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch11-u3",
      title: "导数的应用",
      lessons: [
        {
          id: "ch11-u3-l1",
          title: "单调性",
          pages: [
            {
              id: "ch11-u3-l1-p1",
              title: "f'>0 上坡，f'<0 下坡",
              concept: "单调性",
              formulas: [
                {
                  id: "f1",
                  latex: "f'(x) > 0 \\text{则} f(x) \\text{递增}",
                  translation: "导数为正：切线向上扬，函数递增——y=x³−3x 在 x>1 的段"
                },
                {
                  id: "f2",
                  latex: "f'(x) < 0 \\text{则} f(x) \\text{递减}",
                  translation: "导数为负：切线向下俯，函数递减——y=x³−3x 在 −1<x<1 的段"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "x",
                    min: -3,
                    max: 3,
                    step: 0.1,
                    initial: 0
                  },
                  views: [
                    {
                      kind: "point",
                      xExpr: "x",
                      yExpr: "x^3-3*x",
                      axisLabelX: "x",
                      axisLabelY: "y"
                    },
                    { kind: "readout", expr: "3*x^2-3", label: "f'(x)" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x 扫过曲线：读数为正的段往上走，为负的段往下走。",
                "x=±1 处读数为 0：曲线在那儿'换方向'——下一页讲极值。"
              ],
              examples: [
                { text: "坡度计：f'(x) 就是曲线在每一点的'坡度'", figure: "联动仪表盘" }
              ],
              prev: "ch11-u2-l3-p1b",
              next: "ch11-u3-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：单调性",
              examples: [
                { figure: "变式练习", text: "y=x²：f'=2x，x>0 递增，x<0 递减。" }
              ],
              formulas: [
                { id: "f1", latex: "f(x) = x^3", translation: "f'(x)=3x²≥0：恒递增" },
                { id: "f2", latex: "f'(x) > 0 \\to \\text{递增}", translation: "导数>0：上坡" },
                { id: "f3", latex: "f'(x) < 0 \\to \\text{递减}", translation: "导数<0：下坡" }
              ],
              hints: [
                "判断单调性：求 f'(x)，解 f'(x)>0 得递增区间。",
                "f'(x)=0 的点是“换挡点”：单调性可能在这里改变。"
              ],
              id: "ch11-u3-l1-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 0,
                    label: "x",
                    max: 3,
                    min: -3,
                    step: 0.1
                  },
                  views: [
                    {
                      axisLabelX: "x",
                      axisLabelY: "y",
                      kind: "point",
                      xExpr: "x",
                      yExpr: "x^3-3*x"
                    },
                    { expr: "3*x^2-3", kind: "readout", label: "f'(x)" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "单调性：导数是坡度计",
              prev: "ch11-u3-l1-p1",
              next: "ch11-u3-l2-p1"
            }
          ]
        },
        {
          id: "ch11-u3-l2",
          title: "极值",
          pages: [
            {
              id: "ch11-u3-l2-p1",
              title: "山峰山谷：导数为 0 处",
              concept: "极值",
              formulas: [
                { id: "f1", latex: "f'(x_0) = 0", translation: "驻点：导数为 0 的点——曲线在那儿'脚下是平的'（切线水平）" },
                {
                  id: "f2",
                  latex: "x = -1 \\text{极大}, x = 1 \\text{极小}",
                  translation: "y=x³−3x：x=−1 取极大值 2（山峰），x=1 取极小值 −2（山谷）"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -2,
                  max: 2,
                  step: 0.25,
                  label: "x",
                  expr: "3*x^2-3",
                  target: 0,
                  targetLabel: "找 f'(x)=0 的点（有两个）"
                }
              },
              auxInteraction: null,
              hints: [
                "拖到'咔哒'处：x=−1 和 x=1 两处导数都是 0。",
                "光 f'=0 不够：还要看左右'换没换方向'——换了才是极值点。"
              ],
              examples: [
                { text: "爬到山顶时脚下是平的：极值点处切线水平", figure: "滑块实验" }
              ],
              prev: "ch11-u3-l1-p1b",
              next: "ch11-u3-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：极值",
              examples: [
                { figure: "易错提醒", text: "y=x³：f'=3x²，x=0 处 f'=0，但左右都递增，无极值。" }
              ],
              formulas: [
                { id: "f1", latex: "f(x) = x^3 - 3x^2", translation: "f'(x)=3x²−6x=3x(x−2)" },
                { id: "f2", latex: "x = 0, x = 2", translation: "驻点：x=0 和 x=2" },
                {
                  id: "f3",
                  latex: "x = 0 \\text{极大}, x = 2 \\text{极小}",
                  translation: "左+右−是极大（x=0），左−右+是极小（x=2)"
                }
              ],
              hints: [
                "极值两步：令 f'(x)=0 找驻点；看左右导数变号。",
                "f'=0 只是“候选”：如 y=x³ 在 x=0，f'=0 但不是极值点。"
              ],
              id: "ch11-u3-l2-p1b",
              interaction: {
                params: {
                  expr: "3*x^2-6*x",
                  label: "x",
                  max: 3,
                  min: -1,
                  step: 0.25,
                  target: 0,
                  targetLabel: "找 f'(x)=0 的点"
                },
                type: "slider-lab"
              },
              title: "极值：驻点再看换向",
              prev: "ch11-u3-l2-p1",
              next: "ch11-u3-l3-p1"
            }
          ]
        },
        {
          id: "ch11-u3-l3",
          title: "最值",
          pages: [
            {
              id: "ch11-u3-l3-p1",
              title: "闭区间最值：端点也参选",
              concept: "最值",
              formulas: [
                {
                  id: "f1",
                  latex: "\\max_{-1 \\leq x \\leq 2} x^2 = 4",
                  translation: "最大值是 4：在端点 x=2 处取到——端点也要参选"
                },
                {
                  id: "f2",
                  latex: "\\min_{-1 \\leq x \\leq 2} x^2 = 0",
                  translation: "最小值是 0：在驻点 x=0 处取到"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -1,
                  max: 2,
                  step: 0.25,
                  label: "x",
                  expr: "x^2",
                  target: 4,
                  targetLabel: "最大值在哪"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x 扫 [-1,2]：最高点在端点 x=2，最低点在驻点 x=0。",
                "闭区间找最值三步：求驻点、算端点值、比大小。"
              ],
              examples: [
                { text: "关门打狗：不能只看极值，区间端点的值也要比", figure: "滑块实验" }
              ],
              prev: "ch11-u3-l2-p1b",
              next: "ch11-u3-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：最值",
              examples: [
                {
                  figure: "变式练习",
                  text: "y=−x²+4x 在 [0,3]：驻点 x=2 处 4，端点 0、3：最大 4，最小 0。"
                }
              ],
              formulas: [
                { id: "f1", latex: "f(x) = x^3 - 3x", translation: "区间 [−2,2]：驻点 x=±1" },
                { id: "f2", latex: "f(-2) = -2, f(-1) = 2", translation: "端点 −2 处 −2，驻点 −1 处 2" },
                { id: "f3", latex: "f(1) = -2, f(2) = 2", translation: "驻点 1 处 −2，端点 2 处 2：最大 2，最小 −2" }
              ],
              hints: [
                "闭区间最值三步：求驻点；算驻点+端点的函数值；比大小。",
                "开区间没最值：(0,1) 上的 y=x 取不到 0 和 1。"
              ],
              id: "ch11-u3-l3-p1b",
              interaction: {
                params: {
                  expr: "x^3-3*x",
                  label: "x",
                  max: 2,
                  min: -2,
                  step: 0.25,
                  target: 2,
                  targetLabel: "最大值 2 在哪"
                },
                type: "slider-lab"
              },
              title: "最值：闭区间三步",
              prev: "ch11-u3-l3-p1",
              next: "ch11-u3-l4-p1"
            }
          ]
        },
        {
          id: "ch11-u3-l4",
          title: "本章小结",
          pages: [
            {
              id: "ch11-u3-l4-p1",
              title: "本章小结：从变化率到最值",
              concept: "本章知识串联",
              formulas: [
                {
                  id: "f1",
                  latex: "f'(x_0) = \\lim_{\\Delta x \\to 0} \\frac{\\Delta y}{\\Delta x}",
                  translation: "导数：变化率的极限——割线斜率取极限，变成切线斜率"
                },
                {
                  id: "f2",
                  latex: "(x^n)' = n x^{n-1}, (f \\cdot g)' = f' g + f g'",
                  translation: "求导工具箱：幂法则、积法则——下一站：定积分（第十二章）"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: -3,
                      max: 3,
                      step: 0.1,
                      label: "x",
                      expr: "x^3-3*x"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: -3,
                      max: 3,
                      step: 0.1,
                      label: "x",
                      expr: "3*x^2-3"
                    }
                  },
                  sync: [ "x" ],
                  labels: [ "y=x³−3x：拖 x 看起伏", "y'=3x²−3：导数是'坡度计'" ]
                }
              },
              auxInteraction: null,
              hints: [
                "本章路线：平均变化率→导数→求导法则→单调性→极值→最值。",
                "下一站第十二章：导数反过来用——已知'坡度'求'路程'，就是积分。"
              ],
              examples: [
                { text: "一图流：左图是路，右图是坡度计——导数是函数的'坡度计'", figure: "并排对比" }
              ],
              prev: "ch11-u3-l3-p1b",
              next: "ch11-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch11-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch11-ux-l1",
          title: "第十一章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．4；2．4x³；3．cos x，−sin x；4．(x²+2x)eˣ；5．1/x；6．(−∞,−1) 和 (1,+∞)；7．9，0"
                }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "f(x) = x^2",
                  translation: "第 7 题：驻点 x=0 处 0，端点 −1 处 1、3 处 9"
                }
              ],
              hints: [
                "1．f(x)=x²，x 从 1 到 3 的平均变化率=____。",
                "2．(x⁴)'=____。",
                "3．(sin x)'=____，(cos x)'=____。",
                "4．(x²·eˣ)'=____。",
                "5．y=ln(2x) 的导数是____。",
                "6．f(x)=x³−3x 的递增区间是____。",
                "7．f(x)=x² 在 [−1,3] 上的最大值是____，最小值是____。"
              ],
              id: "ch11-ux-l1-p1",
              interaction: {
                params: {
                  expr: "x^2",
                  label: "x",
                  max: 3,
                  min: -1,
                  step: 0.25,
                  target: 9,
                  targetLabel: "最大值 9（第 7 题）"
                },
                type: "slider-lab"
              },
              title: "第十一章习题：导数",
              prev: "ch11-u3-l4-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
