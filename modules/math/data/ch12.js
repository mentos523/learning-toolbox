/* ============================================================
 * 学习工具箱 · 数学 · 代数 第十二章：定积分与微积分基本定理（20 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第十二章 v2.0）：
 * 12.1.1a 曲边梯形的面积（一）：分割与近似 / 12.1.1b 曲边梯形的面积（二）：
 * 求和与取极限（v2.0 拆两课，回应黄队 M5）/ 12.1.2 定积分的定义 /
 * 12.1.3 定积分的性质 / 12.2.0 面积函数：变上限积分（v2.0 新增过渡课，
 * 回应黄队 S3）/ 12.2.1 原函数与不定积分 / 12.2.2 牛顿-莱布尼茨公式
 * （直觉页+推导页拆两页）/ 12.2.3 定积分的应用 / 12.2.4 全书总结：
 * 微积分的统一。
 *
 * 页面：u1-l1-p1 已知速度求路程：先切碎（12.1.1a，v=2t 细分逼近 16）
 *       u1-l2-p1 n 越大，和越接近 1/3（12.1.1b，S_n 极限）
 *       u1-l3-p1 定积分：面积的精确名字（12.1.2，∫₀ᵃx dx=a²/2）
 *       u1-l4-p1 分开算再加，结果一样（12.1.3，线性性质并排验证）
 *       u2-l1-p1 面积函数：右端点会动（12.2.0，A(x)=x²，A'=f）
 *       u2-l2-p1 原函数：坡度的逆运算（12.2.1，F=x³/3 vs F'=x²）
 *       u2-l3-p1 牛顿-莱布尼茨：面积=原函数之差（12.2.2a，直觉页）
 *       u2-l3-p2 常数 C 在相减中消失（12.2.2b，推导页）
 *       u2-l4-p1 水池注水：面积=总水量（12.2.3，累加 420→400）
 *       u2-l5-p1 全书总结：微分与积分互逆（12.2.4，一图流）
 * 交互复用已实现渲染器：subdivision（fn/a/b/steps 必填；p1 用 2x 在
 *   [0,4] 四档 4/16/64/256）/ slider-lab（label 均为纯变量名，expr 只含
 *   单个变量；target 只在网格可达时设置：p3 a=2 时 a²/2=2（min 0/step
 *   0.25，node 已验 0+8*0.25===2 且 2**2/2===2）；p7 b=4 时 b²/2=8
 *   （min 0/step 0.25，node 已验 0+16*0.25===4 且 4**2/2===8））/
 * linked-dashboard（p5：x→面积点→A(x) 读数→A'(x) 读数三联动）/
 * side-compare（仅内嵌 slider-lab，不可嵌套；sync 同名滑块联动；
 *   p4 左右同为 a 的函数验证线性；p6/p8/p10 同 x 联动）/
 * numeric-lab（p9 accumulate，term="2*n"，n 从 1 起，20 步累计 420）。
 * 绿队审计结论落实：
 *   - 每页 hints ≤ 2 条、总字数（两条 hint 字符串 JS .length 之和）≤ 70
 *   - 定义条件齐全：subdivision 要求 b>a、steps 递增；定积分定义注明
 *     n→∞；不定积分 +C 注明 C 为任意常数；牛顿-莱布尼茨要求 f 在
 *     [a,b] 上连续（初等函数默认满足）
 *   - LaTeX 仅用渲染器支持子集（\\int \\sum \\lim \\to \\infty \\frac
 *     \\cdot \\approx \\text 与求导撇 '；面积函数记 A(x)，不用渲染器
 *     不支持的 \\Phi），无 \\dots、latex 公式中无 Unicode 省略号
 *     （hints/translation 纯文本中的 … 不受影响）
 *   - 数值全部 node 实测：∫₀⁴2t dt=16（S_4=20、S_16=17、S_64=16.25、
 *     S_256=16.0625）、S_n=(n+1)(2n+1)/(6n²)（n=1 得 1、n=4 得 0.46875、
 *     n=100 得 0.33835→1/3）、a=2 时 ∫₀ᵃx dx=2、
 *     ∫₀²(x+x²)dx=2+8/3=14/3（右式 (3a²+2a³)/6 同值）、
 *     A(2)=4 且 A'(2)=4=f(2)、x=2 时 F=8/3≈2.6667 且 F'=4、
 *     b=4 时 ∫₀ᵇx dx=8、x=3 时 A(3)−A(0)=9=F(3)−F(0)（F=x²+1）、
 *     Σ_{n=1}^{20}2n=420 vs ∫₀²⁰2t dt=400、x=1 时 s=−2 且 s'=0
 * 黄队教学流：落实跃升 7 脚手架（数格子→细分→点题：p1 细分动画即
 *   "格子越分越细"）；p1 承接 ch11 小结预埋"已知坡度求路程"——已知
 *   速度（坡度）求路程正是积分；12.2.2 拆直觉页+推导页（先看到
 *   F(b)−F(a) 好用，再亲手验证 C 相减抵消）；p10 一图流复用 ch11
 *   小结的"路 vs 坡度计"认旧友，落点"求导过去、积分回来"。
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch12"] = {
  id: "ch12",
  title: "定积分与微积分基本定理",
  units: [
    {
      id: "ch12-u1",
      title: "定积分的概念",
      lessons: [
        {
          id: "ch12-u1-l1",
          title: "曲边梯形的面积（一）：分割与近似",
          pages: [
            {
              id: "ch12-u1-l1-p1",
              title: "已知速度求路程：先切碎",
              concept: "曲边梯形的面积",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{路程} = \\text{速度图像下的面积}",
                  translation: "v=2t 的图像下方、0 到 4 秒围出的面积，就是走过的路程"
                },
                {
                  id: "f2",
                  latex: "S_{256} = 16.0625 \\approx 16",
                  translation: "4 份时面积和 20，256 份时 16.0625——份数越多，越接近真实值 16"
                }
              ],
              interaction: {
                type: "subdivision",
                params: {
                  fn: "2*x",
                  a: 0,
                  b: 4,
                  steps: [ 4, 16, 64, 256 ],
                  showError: true
                }
              },
              auxInteraction: null,
              hints: [
                "点档位按钮：4→16→64→256 份，矩形越分越细，面积和越贴近 16。",
                "这就是积分第一步'分割'：曲边形切成直边小矩形再相加。"
              ],
              examples: [
                { text: "曲边田地：先数整格再估半格——阿基米德的做法", figure: "细分动画" }
              ],
              prev: "ch11-u3-l4-p1",
              next: "ch12-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：曲边梯形的面积",
              examples: [
                { figure: "生活实例", text: "湖泊面积：方格纸数格子，格子越小越准。" }
              ],
              formulas: [
                { id: "f1", latex: "\\int_{0}^{2} x^2 dx", translation: "y=x² 从 0 到 2 下方的曲边面积" },
                { id: "f2", latex: "S_4 = 3.75", translation: "切 4 份：右端点矩形和 3.75" },
                { id: "f3", latex: "S_{100} \\approx 2.69", translation: "切 100 份：≈2.69，越来越接近 8/3≈2.67" }
              ],
              hints: [
                "曲边形面积三步：分割（切碎）、近似（矩形代替）、求和。",
                "份数越多误差越小：这是积分思想的全部。"
              ],
              id: "ch12-u1-l1-p1b",
              interaction: {
                params: {
                  a: 0,
                  b: 2,
                  fn: "x^2",
                  showError: true,
                  steps: [ 4, 16, 64, 256 ]
                },
                type: "subdivision"
              },
              title: "曲边面积：切碎再拼",
              prev: "ch12-u1-l1-p1",
              next: "ch12-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch12-u1-l2",
          title: "曲边梯形的面积（二）：求和与取极限",
          pages: [
            {
              id: "ch12-u1-l2-p1",
              title: "n 越大，和越接近 1/3",
              concept: "黎曼和的极限",
              formulas: [
                {
                  id: "f1",
                  latex: "S_n = \\sum_{i=1}^{n} (\\frac{i}{n})^2 \\cdot \\frac{1}{n}",
                  translation: "n 份右端点矩形：S_n=Σ(i/n)²·(1/n)——y=x² 在 [0,1] 上的面积和"
                },
                {
                  id: "f2",
                  latex: "S_n = \\frac{(n+1)(2n+1)}{6n^2} \\to \\frac{1}{3}",
                  translation: "求和化简：n 越大 S_n 越接近 1/3——这就是定积分的值"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 100,
                  step: 1,
                  label: "n",
                  expr: "(n+1)*(2*n+1)/(6*n^2)"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 n 从 1 到 100：读数 1→0.469→…→0.338，越挤越靠近 1/3。",
                "'无限细分'不是玄学：是你亲手拖滑块看到的趋势。"
              ],
              examples: [
                { text: "1/2+1/4+1/8+…：第九章点'加一项'的老朋友", figure: "滑块实验" }
              ],
              prev: "ch12-u1-l1-p1b",
              next: "ch12-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：黎曼和的极限",
              examples: [
                { figure: "生活实例", text: "π 的计算：圆内接正 n 边形，n 越大越接近圆。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "S_n = \\sum_{i=1}^{n} f(x_i) \\Delta x",
                  translation: "黎曼和：n 个矩形面积之和"
                },
                { id: "f2", latex: "\\lim_{n \\to \\infty} S_n", translation: "n→∞：矩形无限变细，和趋向精确值" }
              ],
              hints: [
                "Sₙ 是近似值：n 越大越准；极限是精确值。",
                "Δx=(b−a)/n：n 越大，每份越窄。"
              ],
              id: "ch12-u1-l2-p1b",
              interaction: {
                params: {
                  expr: "(n+1)*(2*n+1)/(6*n^2)",
                  label: "n",
                  max: 100,
                  min: 1,
                  step: 1
                },
                type: "slider-lab"
              },
              title: "黎曼和：n→∞ 取极限",
              prev: "ch12-u1-l2-p1",
              next: "ch12-u1-l3-p1"
            }
          ]
        },
        {
          id: "ch12-u1-l3",
          title: "定积分的定义",
          pages: [
            {
              id: "ch12-u1-l3-p1",
              title: "定积分：面积的精确名字",
              concept: "定积分的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\int_{0}^{a} x dx = \\frac{a^2}{2}",
                  translation: "∫₀ᵃx dx：直线 y=x 从 0 到 a 下方的面积（三角形）=a²/2"
                },
                {
                  id: "f2",
                  latex: "\\int_{a}^{b} f(x) dx = \\lim_{n \\to \\infty} S_n",
                  translation: "定积分的定义：n→∞ 时矩形面积和 S_n 的极限——给'曲边面积'一个精确名字"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 4,
                  step: 0.25,
                  label: "a",
                  expr: "a^2/2",
                  target: 2,
                  targetLabel: "找：面积=2 时 a 是多少"
                }
              },
              auxInteraction: null,
              hints: [
                "∫ 读作'积分'：它是'把无穷多小份加起来'的专用记号。",
                "三角形面积你早就会：∫₀ᵃx dx=a²/2，老朋友的新名字。"
              ],
              examples: [
                { text: "路程=速度×时间：匀速是矩形，变速是曲边形", figure: "滑块实验" }
              ],
              prev: "ch12-u1-l2-p1b",
              next: "ch12-u1-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：定积分的定义",
              examples: [
                { figure: "变式练习", text: "∫₀¹1dx=1：y=1 从 0 到 1 是 1×1 的正方形。" }
              ],
              formulas: [
                { id: "f1", latex: "\\int_{1}^{3} 2 dx = 4", translation: "y=2 从 1 到 3：矩形面积 2×2=4" },
                { id: "f2", latex: "\\int_{0}^{3} x dx = 4.5", translation: "y=x 从 0 到 3：三角形 3×3/2=4.5" }
              ],
              hints: [
                "∫ₐᵇf(x)dx 读作“f 从 a 到 b 的积分”：a 下限，b 上限。",
                "几何意义：曲线下方、x 轴上方、夹在 a 与 b 之间的面积。"
              ],
              id: "ch12-u1-l3-p1b",
              interaction: {
                params: {
                  expr: "a^2/2",
                  label: "a",
                  max: 4,
                  min: 0,
                  step: 0.25,
                  target: 2,
                  targetLabel: "找：面积=2 时 a 是多少"
                },
                type: "slider-lab"
              },
              title: "∫：把无穷多份加起来",
              prev: "ch12-u1-l3-p1",
              next: "ch12-u1-l4-p1"
            }
          ]
        },
        {
          id: "ch12-u1-l4",
          title: "定积分的性质",
          pages: [
            {
              id: "ch12-u1-l4-p1",
              title: "分开算再加，结果一样",
              concept: "定积分的线性性质",
              formulas: [
                {
                  id: "f1",
                  latex: "\\int_{0}^{a} (x + x^2) dx = \\int_{0}^{a} x dx + \\int_{0}^{a} x^2 dx",
                  translation: "线性性质：和的积分=积分的和——分开算再加，结果一样"
                },
                {
                  id: "f2",
                  latex: "\\int_{0}^{2} (x + x^2) dx = 2 + \\frac{8}{3} = \\frac{14}{3}",
                  translation: "a=2 时：2+8/3=14/3——拖滑块，左右两图读数永远相等"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: 0,
                      max: 3,
                      step: 0.25,
                      label: "a",
                      expr: "a^2/2+a^3/3"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: 0,
                      max: 3,
                      step: 0.25,
                      label: "a",
                      expr: "(3*a^2+2*a^3)/6"
                    }
                  },
                  sync: [ "a" ],
                  labels: [ "∫₀ᵃx dx + ∫₀ᵃx²dx：分开算再加", "∫₀ᵃ(x+x²)dx：先加再积分" ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖 a：左右读数永远相等——分开算再加，和先加再积分没区别。",
                "还有区间可加：∫₀¹+∫₁²=∫₀²，面积拼起来就是整体。"
              ],
              examples: [ { text: "拼图：两块面积相加，整体等于部分之和", figure: "并排对比" } ],
              prev: "ch12-u1-l3-p1b",
              next: "ch12-u1-l4-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：定积分的线性性质",
              examples: [
                { figure: "变式练习", text: "∫₀²(3x)dx=3∫₀²xdx=3×2=6。" }
              ],
              formulas: [
                { id: "f1", latex: "\\int_{0}^{1} (2x + 3) dx", translation: "拆：∫2xdx+∫3dx" },
                { id: "f2", latex: "= 1 + 3 = 4", translation: "2×(1/2)+3×1=1+3=4" }
              ],
              hints: [
                "线性=可加可乘常数：∫(f+g)=∫f+∫g，∫(kf)=k∫f。",
                "区间也可加：∫₀¹+∫₁²=∫₀²。"
              ],
              id: "ch12-u1-l4-p1b",
              interaction: {
                params: {
                  labels: [ "分开算再加", "先加再积分" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "a^2/2+a^3/3",
                      label: "a",
                      max: 3,
                      min: 0,
                      step: 0.25
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "(3*a^2+2*a^3)/6",
                      label: "a",
                      max: 3,
                      min: 0,
                      step: 0.25
                    }
                  },
                  sync: [ "a" ]
                },
                type: "side-compare"
              },
              title: "线性性质：分开算",
              prev: "ch12-u1-l4-p1",
              next: "ch12-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch12-u2",
      title: "微积分基本定理",
      lessons: [
        {
          id: "ch12-u2-l1",
          title: "面积函数：变上限积分",
          pages: [
            {
              id: "ch12-u2-l1-p1",
              title: "面积函数：右端点会动",
              concept: "变上限积分",
              formulas: [
                {
                  id: "f1",
                  latex: "A(x) = \\int_{0}^{x} 2t dt",
                  translation: "面积函数：右端点拖到 x，y=2t 曲线下方的面积记作 A(x)"
                },
                { id: "f2", latex: "A(x) = x^2", translation: "算出来 A(x)=x²——右端点右移，面积跟着长大" },
                { id: "f3", latex: "A'(x) = 2x = f(x)", translation: "对面积函数求导：A'(x)=2x，正好回到 f——这是下一课的钥匙" }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "x",
                    min: 0,
                    max: 4,
                    step: 0.1,
                    initial: 2
                  },
                  views: [
                    {
                      kind: "point",
                      xExpr: "x",
                      yExpr: "x^2",
                      axisLabelX: "x",
                      axisLabelY: "A(x)"
                    },
                    { kind: "readout", expr: "x^2", label: "A(x)：阴影面积" },
                    { kind: "readout", expr: "2*x", label: "A'(x)=2x=f(x)" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖右端点 x：阴影面积跟着长大，读数 A(x)=x²。",
                "看第三个读数：A'(x)=2x=f(x)——面积函数的'坡度'正是 f 自己。"
              ],
              examples: [ { text: "水位计：右端点右移，水量读数跟着涨", figure: "联动仪表盘" } ],
              prev: "ch12-u1-l4-p1b",
              next: "ch12-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：变上限积分",
              examples: [
                { figure: "变式练习", text: "A(x)=∫₀ˣt²dt=x³/3：A'(x)=x²。" }
              ],
              formulas: [
                { id: "f1", latex: "A(2) = \\int_{0}^{2} 2t dt = 4", translation: "x=2：面积 4" },
                { id: "f2", latex: "A(3) = 9", translation: "x=3：面积 9" },
                { id: "f3", latex: "A(x) = x^2", translation: "一般：A(x)=x²" }
              ],
              hints: [
                "变上限积分：上限 x 会动，面积 A(x) 是 x 的函数。",
                "A'(x)=f(x)：面积函数的导数正是被积函数——基本定理的种子。"
              ],
              id: "ch12-u2-l1-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 2,
                    label: "x",
                    max: 4,
                    min: 0,
                    step: 0.1
                  },
                  views: [
                    {
                      axisLabelX: "x",
                      axisLabelY: "A(x)",
                      kind: "point",
                      xExpr: "x",
                      yExpr: "x^2"
                    },
                    { expr: "x^2", kind: "readout", label: "A(x)：阴影面积" },
                    { expr: "2*x", kind: "readout", label: "A'(x)=2x=f(x)" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "面积函数：上限是变量",
              prev: "ch12-u2-l1-p1",
              next: "ch12-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch12-u2-l2",
          title: "原函数与不定积分",
          pages: [
            {
              id: "ch12-u2-l2-p1",
              title: "原函数：坡度的逆运算",
              concept: "原函数与不定积分",
              formulas: [
                {
                  id: "f1",
                  latex: "(\\frac{x^3}{3})' = x^2",
                  translation: "F(x)=x³/3 求导得 x²——F 就是 f 的'原函数'"
                },
                {
                  id: "f2",
                  latex: "\\int x^2 dx = \\frac{x^3}{3} + C",
                  translation: "不定积分：全体原函数记作 ∫x²dx=x³/3+C，C 是任意常数"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: -2,
                      max: 2,
                      step: 0.1,
                      label: "x",
                      expr: "x^3/3"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: -2,
                      max: 2,
                      step: 0.1,
                      label: "x",
                      expr: "x^2"
                    }
                  },
                  sync: [ "x" ],
                  labels: [ "F(x)=x³/3：原函数", "F'(x)=x²：求导回到 f" ]
                }
              },
              auxInteraction: null,
              hints: [
                "联动拖 x：右图读数永远是左图曲线在该点的坡度。",
                "F'=f：原函数就是'坡度为 f 的那条路'，+C 是上下平移。"
              ],
              examples: [
                { text: "已知坡度找路：坡度处处为 2x 的路是 x²+C", figure: "并排对比" }
              ],
              prev: "ch12-u2-l1-p1b",
              next: "ch12-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：原函数与不定积分",
              examples: [
                { figure: "变式练习", text: "∫3x²dx=x³+C：因为 (x³)'=3x²。" }
              ],
              formulas: [
                { id: "f1", latex: "(x^2)' = 2x", translation: "顺着：x² 求导得 2x" },
                { id: "f2", latex: "\\int 2x dx = x^2 + C", translation: "倒着：2x 的原函数是 x²+C" },
                { id: "f3", latex: "(x^2 + 5)' = 2x", translation: "C=5 也行：常数求导是 0" }
              ],
              hints: [
                "原函数=求导的逆运算：(F)'=f，则 F 是 f 的原函数。",
                "+C 不能丢：x²、x²+1、x²−100 的导数都是 2x。"
              ],
              id: "ch12-u2-l2-p1b",
              interaction: {
                params: {
                  labels: [ "F(x)=x³/3：原函数", "F'(x)=x²：求导回到 f" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "x^3/3",
                      label: "x",
                      max: 2,
                      min: -2,
                      step: 0.1
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "x^2",
                      label: "x",
                      max: 2,
                      min: -2,
                      step: 0.1
                    }
                  },
                  sync: [ "x" ]
                },
                type: "side-compare"
              },
              title: "原函数：倒着求导",
              prev: "ch12-u2-l2-p1",
              next: "ch12-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch12-u2-l3",
          title: "牛顿-莱布尼茨公式",
          pages: [
            {
              id: "ch12-u2-l3-p1",
              title: "牛顿-莱布尼茨：面积=原函数之差",
              concept: "牛顿-莱布尼茨公式",
              formulas: [
                {
                  id: "f1",
                  latex: "\\int_{a}^{b} f(x) dx = F(b) - F(a)",
                  translation: "牛顿-莱布尼茨公式：定积分=原函数在两端点的值相减——不用再切碎求和"
                },
                {
                  id: "f2",
                  latex: "\\int_{0}^{4} x dx = \\frac{4^2}{2} - \\frac{0^2}{2} = 8",
                  translation: "例：∫₀⁴x dx=16/2−0=8——拖滑块到 b=4，读数'咔哒'停在 8"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 4,
                  step: 0.25,
                  label: "b",
                  expr: "b^2/2",
                  target: 8,
                  targetLabel: "找：b=4 时面积=8"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 b 到 4'咔哒'：面积 8=F(4)−F(0)——不用再切碎求和。",
                "牛顿和莱布尼茨各自独立发现：积分从此有了'捷径'。"
              ],
              examples: [
                { text: "自由落体：已知速度 v=gt，求路程 s=gt²/2", figure: "滑块实验" }
              ],
              prev: "ch12-u2-l2-p1b",
              next: "ch12-u2-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：牛顿-莱布尼茨公式",
              examples: [
                { figure: "变式练习", text: "∫₀^π sinxdx=[−cosx]₀^π=1+1=2。" }
              ],
              formulas: [
                { id: "f1", latex: "\\int_{1}^{2} x^2 dx", translation: "第一步：找原函数 x³/3" },
                {
                  id: "f2",
                  latex: "= \\frac{8}{3} - \\frac{1}{3} = \\frac{7}{3}",
                  translation: "第二步：F(2)−F(1)=7/3"
                }
              ],
              hints: [
                "两步：找原函数 F；算 F(b)−F(a)。",
                "条件：f 在 [a,b] 上连续——初等函数在它有定义的区间上默认满足。"
              ],
              id: "ch12-u2-l3-p1b",
              interaction: {
                params: {
                  expr: "b^2/2",
                  label: "b",
                  max: 4,
                  min: 0,
                  step: 0.25,
                  target: 8,
                  targetLabel: "找：b=4 时面积=8"
                },
                type: "slider-lab"
              },
              title: "牛顿-莱布尼茨：两步算面积",
              prev: "ch12-u2-l3-p1",
              next: "ch12-u2-l3-p2"
            },
            {
              id: "ch12-u2-l3-p2",
              title: "常数 C 在相减中消失",
              concept: "原函数差与常数无关",
              formulas: [
                {
                  id: "f1",
                  latex: "\\int_{a}^{b} f(x) dx = \\left(F(b)+C\\right) - \\left(F(a)+C\\right)",
                  translation: "两个原函数只差常数 C：相减时 C−C=0，C 被抵消"
                },
                {
                  id: "f2",
                  latex: "\\int_{0}^{3} 2x dx = (3^2 + 1) - (0^2 + 1) = 9",
                  translation: "用 F(x)=x²+1 也行：(9+1)−(0+1)=9——C 不影响结果"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: 0,
                      max: 4,
                      step: 0.1,
                      label: "x",
                      expr: "x^2"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: 0,
                      max: 4,
                      step: 0.1,
                      label: "x",
                      expr: "x^2+1"
                    }
                  },
                  sync: [ "x" ],
                  labels: [ "面积函数 A(x)=x²", "另一个原函数 F(x)=x²+1：整体上移" ]
                }
              },
              auxInteraction: null,
              hints: [
                "联动拖 x：两条曲线永远差 1——原函数不唯一，差一个常数 C。",
                "A(3)−A(0) 与 F(3)−F(0) 都是 9：相减时 C−C=0。"
              ],
              examples: [
                { text: "量身高：从 1 楼量和从 2 楼量，两人身高差不变", figure: "并排对比" }
              ],
              prev: "ch12-u2-l3-p1b",
              next: "ch12-u2-l3-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：原函数差与常数无关",
              examples: [
                { figure: "变式练习", text: "∫₁²2xdx=(4+C)−(1+C)=3。" }
              ],
              formulas: [
                { id: "f1", latex: "\\int_{0}^{2} 3x^2 dx", translation: "原函数 x³+C" },
                { id: "f2", latex: "= (8 + C) - (0 + C) = 8", translation: "C−C=0：用哪个 C 结果都是 8" }
              ],
              hints: [
                "定积分只用原函数的差：C 会被减掉，所以+C 写不写都行。",
                "但不定积分必须写 +C：它表示一整族原函数。"
              ],
              id: "ch12-u2-l3-p2b",
              interaction: {
                params: {
                  labels: [ "A(x)=x²", "F(x)=x²+1" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "x^2",
                      label: "x",
                      max: 4,
                      min: 0,
                      step: 0.1
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "x^2+1",
                      label: "x",
                      max: 4,
                      min: 0,
                      step: 0.1
                    }
                  },
                  sync: [ "x" ]
                },
                type: "side-compare"
              },
              title: "C 抵消：随便选个原函数",
              prev: "ch12-u2-l3-p2",
              next: "ch12-u2-l4-p1"
            }
          ]
        },
        {
          id: "ch12-u2-l4",
          title: "定积分的应用",
          pages: [
            {
              id: "ch12-u2-l4-p1",
              title: "水池注水：面积=总水量",
              concept: "定积分的应用",
              formulas: [
                {
                  id: "f1",
                  latex: "\\int_{0}^{20} 2t dt = 400",
                  translation: "20 分钟总水量：流速 v=2t 曲线下的面积=400（升）"
                },
                {
                  id: "f2",
                  latex: "\\sum_{n=1}^{20} 2n = 420",
                  translation: "按分钟累加：2+4+…+40=420——份数越多，越接近 400"
                }
              ],
              interaction: {
                type: "numeric-lab",
                params: {
                  mode: "accumulate",
                  term: "2*n",
                  maxSteps: 20,
                  buttonLabel: "再流 1 分钟",
                  showTrend: true
                }
              },
              auxInteraction: null,
              hints: [
                "每点一次'再流 1 分钟'：累计 2→6→12→…→420，逼近 400。",
                "流速图像下的面积=总水量：积分是'累积量'的计算器。"
              ],
              examples: [
                { text: "曲边田地：数格子→细分，同一招", figure: "数值实验台" },
                { text: "面包薄片：旋转体体积=无穷多圆片相加", figure: "数值实验台" }
              ],
              prev: "ch12-u2-l3-p2b",
              next: "ch12-u2-l4-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：定积分的应用",
              examples: [
                { figure: "变式练习", text: "v=t²，10 秒路程=∫₀¹⁰t²dt=1000/3≈333 米。" }
              ],
              formulas: [
                { id: "f1", latex: "\\int_{0}^{10} 3 dt = 30", translation: "流速恒 3，10 分钟：3×10=30 升" },
                { id: "f2", latex: "\\int_{0}^{10} 2t dt = 100", translation: "流速 2t：t²|₀¹⁰=100 升" }
              ],
              hints: [
                "积分是累积量的计算器：速度积出路程，流速积出水量。",
                "离散累加（Σ）vs 连续累积（∫）：份数→∞，Σ 变成 ∫。"
              ],
              id: "ch12-u2-l4-p1b",
              interaction: {
                params: {
                  buttonLabel: "再流 1 分钟",
                  maxSteps: 20,
                  mode: "accumulate",
                  showTrend: true,
                  term: "2*n"
                },
                type: "numeric-lab"
              },
              title: "积分=累积量",
              prev: "ch12-u2-l4-p1",
              next: "ch12-u2-l5-p1"
            }
          ]
        },
        {
          id: "ch12-u2-l5",
          title: "全书总结：微积分的统一",
          pages: [
            {
              id: "ch12-u2-l5-p1",
              title: "全书总结：微分与积分互逆",
              concept: "微积分基本定理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{d}{dx} \\int_{a}^{x} f(t) dt = f(x)",
                  translation: "基本定理（一）：对面积函数求导，回到 f——微分是积分的逆运算"
                },
                {
                  id: "f2",
                  latex: "\\int_{a}^{b} f'(x) dx = f(b) - f(a)",
                  translation: "基本定理（二）：对导函数积分，回到 f——积分是微分的逆运算"
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
                  labels: [ "路 s=x³−3x：由坡度积分得到", "坡度计 s'=3x²−3：由路求导得到" ]
                }
              },
              auxInteraction: null,
              hints: [
                "本章路线：分割→求和→取极限→面积函数→原函数→牛顿-莱布尼茨。",
                "全书终点：求导与积分互逆——'坡度计'和'路程表'是同一枚硬币两面。"
              ],
              examples: [
                { text: "一图流：左图是路，右图是坡度计——求导过去，积分回来", figure: "并排对比" }
              ],
              prev: "ch12-u2-l4-p1b",
              next: "ch12-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch12-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch12-ux-l1",
          title: "第十二章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．1/2；2．6；3．26/3；4．2x；5．x⁴/4+C；6．2；7．50 米"
                }
              ],
              formulas: [
                { id: "f1", latex: "\\int_{0}^{1} x dx = \\frac{1}{2}", translation: "第 1 题：三角形面积 1×1/2" }
              ],
              hints: [
                "1．∫₀¹x dx=____。",
                "2．∫₀²3dx=____。",
                "3．∫₁³x²dx=____。",
                "4．d/dx ∫₀ˣ2t dt=____。",
                "5．∫x³dx=____。",
                "6．∫₀^π sin x dx=____。",
                "7．汽车速度 v=4t（m/s），0 到 5 秒行驶____米。"
              ],
              id: "ch12-ux-l1-p1",
              interaction: {
                params: {
                  expr: "a^2/2",
                  label: "a",
                  max: 4,
                  min: 0,
                  step: 0.25,
                  target: 0.5,
                  targetLabel: "第 1 题：a=1 时面积=1/2"
                },
                type: "slider-lab"
              },
              title: "第十二章习题：定积分",
              prev: "ch12-u2-l5-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
