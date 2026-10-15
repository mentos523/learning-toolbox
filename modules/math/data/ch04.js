/* ============================================================
 * 学习工具箱 · 数学 · 代数 第四章：一元二次方程（23 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第四章 v2.0）。
 * 黄队教学流（docs/math-algebra-pedagogy.md 五条铁律 + 跃升 3）。
 *
 * 页面：u0-l1-p1 扔铅球：轨迹是弯的（跃升脚手架①）
 *       u0-l1-p2 描点成像：画出抛物线（跃升脚手架②）
 *       u1-l1-p1 一元二次方程的概念（交点=解，脚手架③落点）
 *       u1-l2-p1 配方法（一）：几何直觉——补正方形
 *       u1-l2-p2 配方法（二）：代数推导——把二次降成一次
 *       u1-l3-p1 公式法：求根公式（万能钥匙）
 *       u1-l4-p1 因式分解法：乘积为零逐个击破
 *       u2-l1-p1 根的判别式：Δ 的三种几何长相
 *       u2-l2-p1 韦达定理：两根的和与积
 *       u2-l3-p1 二次方程的应用：面积问题
 *       u2-l4-p1 本章小结：一图流
 * 交互复用已实现渲染器：linked-dashboard / plot-points /
 * slider-lab（label 均为纯变量名）/ side-compare（slider-lab 并排）。
 * 无需新交互渲染器。
 * 前三批教训落实：
 *   - slider-lab label 全部用纯变量名（"x"/"t"/"h"），无中文括号
 *   - 未使用 balance-drag，无初始胜利条件问题
 *   - 定义完整：4.1.1 给出一元二次方程的完整定义（含 a≠0 限定）；
 *     4.1.4 给出"乘积为零"原理的适用范围；公式法/韦达注明 Δ≥0
 *   - 绿队顺序：配方法（几何→代数，u1-l2 两页）→ 求根公式（u1-l3）
 *     → 韦达定理（u2-l2）
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch04"] = {
  id: "ch04",
  title: "一元二次方程",
  units: [
    {
      id: "ch04-u0",
      title: "过渡：从一次到二次",
      lessons: [
        {
          id: "ch04-u0-l1",
          title: "为什么需要二次方程",
          pages: [
            {
              id: "ch04-u0-l1-p1",
              title: "扔出去的球，走出一条弯路",
              concept: "二次关系的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "h = -5t^2 + 20t + 2",
                  translation: "h 等于负 5 t 平方加 20 t 加 2：t 秒时铅球的高度"
                },
                { id: "f2", latex: "t = 0 \\to h = 2", translation: "t 等于 0 时 h 等于 2：出手高度是 2 米" }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "t",
                    min: 0,
                    max: 4,
                    step: 0.1,
                    initial: 0
                  },
                  views: [
                    { kind: "readout", expr: "-5*t^2 + 20*t + 2", label: "h" },
                    { kind: "point", xExpr: "t", yExpr: "-5*t^2 + 20*t + 2" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖动时间 t：高度 h 先升后降，点的轨迹是一条弯弯的弧线。",
                "一次方程的图像是直线——这条弯路，一次方程画不出来。"
              ],
              examples: [ { text: "铅球、喷泉、投篮，走的都是这种弯路", figure: "仪表盘" } ],
              prev: null,
              next: "ch04-u0-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：二次关系的直观",
              examples: [
                { figure: "生活实例", text: "喷泉的水、投出去的篮球，走的都是这种先升后降的弯路。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "h = -5t^2 + 20t + 2",
                  translation: "t=0 时 h=2（出手高度）；t=2 时 h=22（最高点附近）"
                },
                { id: "f2", latex: "t = 4 \\to h = 2", translation: "t=4 时 h 又回到 2：升到顶后，对称地落下来" }
              ],
              hints: [
                "t=0 出手 2 米，t=2 升到 22 米，t=4 回到 2 米：先升后降。",
                "−5t² 是“往下拉”的力，20t 是“往上冲”的力：冲力先赢，后劲不足。"
              ],
              id: "ch04-u0-l1-p1b",
              interaction: {
                params: {
                  expr: "-5*t^2 + 20*t + 2",
                  label: "t",
                  max: 4,
                  min: 0,
                  step: 0.1,
                  unit: "米"
                },
                type: "slider-lab"
              },
              title: "铅球：h 先升后降",
              prev: "ch04-u0-l1-p1",
              next: "ch04-u0-l1-p2"
            },
            {
              id: "ch04-u0-l1-p2",
              title: "点点成线：画出它的画像",
              concept: "抛物线的描点生成",
              formulas: [
                { id: "f1", latex: "(t, h)", translation: "t 和 h 组成一个点：每一时刻铅球的位置" },
                { id: "f2", latex: "h = -5t^2 + 20t + 2", translation: "把每个点连起来，得到这条曲线的画像" }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "-5*x^2 + 20*x + 2",
                  xMin: 0,
                  xMax: 4,
                  step: 0.5,
                  autoPlay: true,
                  speed: 600
                }
              },
              auxInteraction: null,
              hints: [
                "自动逐点绘制：每个点都是某一时刻铅球的位置（横轴就是时间 t）。",
                "这条弯弯的曲线，就是 h = -5t² + 20t + 2 的画像——它叫抛物线。"
              ],
              examples: [ { text: "描点法：列表、描点、连线三步画图像", figure: "描点" } ],
              prev: "ch04-u0-l1-p1b",
              next: "ch04-u0-l1-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：描点法画图像",
              examples: [
                {
                  figure: "变式练习",
                  text: "画 y=x²：取 x=−2,−1,0,1,2，得点 (−2,4),(−1,1),(0,0),(1,1),(2,4)。"
                }
              ],
              formulas: [
                { id: "f1", latex: "(0, 2), (1, 17), (2, 22)", translation: "t=0、1、2 时的点：（时间，高度）" },
                { id: "f2", latex: "(3, 17), (4, 2)", translation: "t=3、4 时的点：对称地落下来，(1,17) 与 (3,17) 对称" }
              ],
              hints: [
                "描点三步：列表算出 (t,h)；在坐标系里描点；用平滑曲线连起来。",
                "点越多线越准：对称的点帮你找到顶点在 t=2。"
              ],
              id: "ch04-u0-l1-p2b",
              interaction: {
                params: {
                  autoPlay: true,
                  fn: "-5*x^2 + 20*x + 2",
                  speed: 600,
                  step: 0.5,
                  xMax: 4,
                  xMin: 0
                },
                type: "plot-points"
              },
              title: "描点三步：列表描点连线",
              prev: "ch04-u0-l1-p2",
              next: "ch04-u1-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch04-u1",
      title: "二次方程的解法",
      lessons: [
        {
          id: "ch04-u1-l1",
          title: "一元二次方程的概念",
          pages: [
            {
              id: "ch04-u1-l1-p1",
              title: "只含一个未知数，最高两次方",
              concept: "一元二次方程的定义",
              formulas: [
                { id: "f1", latex: "ax^2 + bx + c = 0", translation: "a x 平方加 b x 加 c 等于 0：标准形式" },
                { id: "f2", latex: "a \\neq 0", translation: "a 不等于 0：如果 a 是 0，二次项就没了" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -2,
                  max: 4,
                  step: 1,
                  label: "x",
                  expr: "x^2 - 3*x + 2",
                  target: 0,
                  targetLabel: "等于 0 的点"
                }
              },
              auxInteraction: null,
              hints: [
                "一般地，只含一个未知数、未知数最高次数是 2 的整式方程，叫做一元二次方程。",
                "拖动 x：方程等于 0 时 x=1 和 x=2——它们就是方程的解；图上是抛物线与横轴的两个交点。"
              ],
              examples: [
                { text: "x²=4、x²-3x+2=0 都是；x²+y=1 不是（一元才行）", figure: "滑块" }
              ],
              prev: "ch04-u0-l1-p2b",
              next: "ch04-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：一元二次方程的定义",
              examples: [
                { figure: "辨析", text: "(m−1)x²+2x+3=0 是一元二次方程，则 m≠1（否则二次项消失）。" }
              ],
              formulas: [
                { id: "f1", latex: "2x^2 - 3x + 1 = 0", translation: "一元（一个未知数）、二次（最高 2 次）、方程（等式）：三条全中" },
                { id: "f2", latex: "x^2 = 4", translation: "也是一元二次方程：a=1，b=0，c=−4" },
                { id: "f3", latex: "x + y = 1", translation: "反例：两个未知数，不是一元；x³=8 是三次，也不是" }
              ],
              hints: [
                "判断三要素：一元（一个未知数）、二次（最高次数 2）、方程（是等式）。",
                "a≠0 是底线：a=0 时二次项消失，就退化成一次方程了。"
              ],
              id: "ch04-u1-l1-p1b",
              interaction: {
                params: {
                  expr: "2*x^2 - 3*x + 1",
                  label: "x",
                  max: 3,
                  min: -1,
                  step: 0.5,
                  target: 0,
                  targetLabel: "等于 0 的点"
                },
                type: "slider-lab"
              },
              title: "一元二次方程：三要素",
              prev: "ch04-u1-l1-p1",
              next: "ch04-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch04-u1-l2",
          title: "配方法",
          pages: [
            {
              id: "ch04-u1-l2-p1",
              title: "缺角的正方形，补一块就完整",
              concept: "配方的几何意义",
              formulas: [
                {
                  id: "f1",
                  latex: "x^2 + 6x = (x+3)^2 - 9",
                  translation: "x 平方加 6x 等于 x 加 3 的平方减 9：配方前后是同一个数"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: 0,
                      max: 6,
                      step: 1,
                      label: "x",
                      expr: "x^2 + 6*x"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: 0,
                      max: 6,
                      step: 1,
                      label: "x",
                      expr: "(x+3)^2 - 9"
                    }
                  },
                  sync: [ "x" ],
                  labels: [ "配方前：缺角的正方形", "配方后：完整正方形减去小块" ]
                }
              },
              auxInteraction: null,
              hints: [
                "x² 是正方形，6x 是两条长条，拼起来缺一个 3×3 的角；补上 9 得 (x+3)²。",
                "所以 x²+6x = (x+3)² − 9：两边滑块同步，值永远相等。"
              ],
              examples: [
                { text: "拼图：x²+6x 缺的角，正好是 3×3", figure: "并排对比" }
              ],
              prev: "ch04-u1-l1-p1b",
              next: "ch04-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：配方的几何意义",
              examples: [
                { figure: "变式练习", text: "x²−6x：补 (−3)²=9，得 (x−3)²−9。" }
              ],
              formulas: [
                { id: "f1", latex: "x^2 + 8x", translation: "x² 是正方形，8x 折成两条 4x 长条：缺一个 4×4 的角" },
                { id: "f2", latex: "x^2 + 8x + 16 = (x + 4)^2", translation: "补上 16：拼成边长 (x+4) 的完整正方形" },
                { id: "f3", latex: "x^2 + 8x = (x + 4)^2 - 16", translation: "等式两边相等：补的 16 要减回去" }
              ],
              hints: [
                "配方口诀：一次项系数的一半——8 的一半是 4，补 4²=16。",
                "为什么是一半？8x 要折成两条相等的长条，每条 4x。"
              ],
              id: "ch04-u1-l2-p1b",
              interaction: {
                params: {
                  initial: 4,
                  label: "x",
                  max: 8,
                  min: 1,
                  showGrid: true,
                  step: 1
                },
                type: "shape-area"
              },
              title: "配方几何：缺角补角",
              prev: "ch04-u1-l2-p1",
              next: "ch04-u1-l2-p1g"
            },
            {
              auxInteraction: null,
              concept: "图形：配方前后面积对比",
              examples: [
                { figure: "数形结合", text: "x²+10x：折成两条 5x，补 25，得 (x+5)²−25。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "(x + 3)^2 = x^2 + 6x + 9",
                  translation: "大正方形 = x² + 两条 3x 长条 + 角上 9"
                },
                { id: "f2", latex: "x^2 + 6x = (x + 3)^2 - 9", translation: "反过来：x²+6x 就是大正方形挖掉角上的 9" }
              ],
              hints: [
                "左图 x²，右图 (x+3)²：多的两条长条就是 6x，角上那块是 9。",
                "配方=把 6x 折成两条 3x 贴在 x² 两边，再补上 3×3 的角。"
              ],
              id: "ch04-u1-l2-p1g",
              interaction: {
                params: {
                  labels: [ "x²", "(x+3)²：多了两条 3x 和一个 9" ],
                  left: {
                    kind: "shape-area",
                    params: {
                      initial: 4,
                      label: "x",
                      max: 8,
                      min: 1,
                      showGrid: true,
                      step: 1
                    }
                  },
                  right: {
                    kind: "shape-area",
                    params: {
                      initial: 7,
                      label: "x+3",
                      max: 10,
                      min: 4,
                      showGrid: true,
                      step: 1
                    }
                  }
                },
                type: "side-compare"
              },
              title: "配方：(x+3)² 比 x² 大多少",
              prev: "ch04-u1-l2-p1b",
              next: "ch04-u1-l2-p2"
            },
            {
              id: "ch04-u1-l2-p2",
              title: "配方：把二次降成一次",
              concept: "配方法的代数步骤",
              formulas: [
                { id: "f1", latex: "x^2 + 6x + 5 = 0", translation: "x 平方加 6x 加 5 等于 0：待解的方程" },
                { id: "f2", latex: "(x+3)^2 = 4", translation: "x 加 3 的平方等于 4：配方后只剩一个平方" },
                { id: "f3", latex: "x + 3 = \\pm 2", translation: "x 加 3 等于正负 2：开平方，一次方程出现了" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -8,
                  max: 2,
                  step: 1,
                  label: "x",
                  expr: "(x+3)^2",
                  target: 4,
                  targetLabel: "右边 = 4"
                }
              },
              auxInteraction: null,
              hints: [
                "配方口诀：一次项系数一半的平方——x²+6x+5=0 化成 (x+3)²=4。",
                "开平方得 x+3=±2——二次方程变成了两个一次方程，解得 x=−1 或 −5。",
                "拖动验证：x=−1 和 x=−5 时，(x+3)² 都等于 4。"
              ],
              examples: [
                { text: "配方三步：移常数、两边加一半的平方、开平方", figure: "滑块" }
              ],
              prev: "ch04-u1-l2-p1g",
              next: "ch04-u1-l2-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：配方法的代数步骤",
              examples: [
                {
                  figure: "变式练习",
                  text: "x²+2x−3=0：移常数得 x²+2x=3，加 1 得 (x+1)²=4，x=1 或 x=−3。"
                }
              ],
              formulas: [
                { id: "f1", latex: "x^2 - 4x - 5 = 0", translation: "第一步：移常数项，得 x²−4x=5" },
                { id: "f2", latex: "(x - 2)^2 = 9", translation: "第二步：两边加 (−2)²=4，得 (x−2)²=9" },
                { id: "f3", latex: "x - 2 = \\pm 3", translation: "第三步：开平方 x−2=±3，得 x=5 或 x=−1；代回验算" }
              ],
              hints: [
                "配方三步：移常数；两边加一半的平方；开平方。",
                "开平方别丢负根：(x−2)²=9 有两个解，x=5 和 x=−1。"
              ],
              id: "ch04-u1-l2-p2b",
              interaction: {
                params: {
                  expr: "(x-2)^2",
                  label: "x",
                  max: 7,
                  min: -3,
                  step: 1,
                  target: 9,
                  targetLabel: "右边 = 9"
                },
                type: "slider-lab"
              },
              title: "配方解方程：完整三步",
              prev: "ch04-u1-l2-p2",
              next: "ch04-u1-l3-p1"
            }
          ]
        },
        {
          id: "ch04-u1-l3",
          title: "公式法",
          pages: [
            {
              id: "ch04-u1-l3-p1",
              title: "万能钥匙：求根公式",
              concept: "求根公式",
              formulas: [
                {
                  id: "f1",
                  latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
                  translation: "x 等于负 b 加减根号 b 平方减 4ac，再除以 2a：对 ax²+bx+c=0 配方一次得到"
                },
                { id: "f2", latex: "\\Delta = b^2 - 4ac", translation: "德尔塔等于 b 平方减 4ac：判别式，就是根号里的东西" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 5,
                  step: 1,
                  label: "x",
                  expr: "x^2 - 5*x + 6",
                  target: 0,
                  targetLabel: "等于 0 的点"
                }
              },
              auxInteraction: null,
              hints: [
                "把 a=1、b=−5、c=6 代入公式：x=(5±1)/2，得 x=2 或 x=3。",
                "拖动验证：x=2 和 x=3 时方程都等于 0——公式算出的就是它们。",
                "适用范围：a≠0；Δ≥0 时才有实数解，Δ<0 时方程无实数解。"
              ],
              examples: [ { text: "任何二次方程都能解：先算 Δ，再套公式", figure: "滑块" } ],
              prev: "ch04-u1-l2-p2b",
              next: "ch04-u1-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：求根公式",
              examples: [
                { figure: "变式练习", text: "x²−4x+4=0：Δ=16−16=0，x=2（两个相等的实根）。" }
              ],
              formulas: [
                { id: "f1", latex: "2x^2 + 5x + 2 = 0", translation: "第一步：认出 a=2，b=5，c=2" },
                { id: "f2", latex: "\\Delta = 25 - 16 = 9", translation: "第二步：Δ=5²−4×2×2=9>0，有两个不等实根" },
                {
                  id: "f3",
                  latex: "x = \\frac{-5 \\pm 3}{4}",
                  translation: "第三步：代入公式，x=−0.5 或 x=−2；拖滑块验证"
                }
              ],
              hints: [
                "套公式三步：认 a/b/c；算 Δ；代入。",
                "符号是重灾区：b=5 时 −b=−5，先写负号再代入，别把 b 的符号弄丢。"
              ],
              id: "ch04-u1-l3-p1b",
              interaction: {
                params: {
                  expr: "2*x^2 + 5*x + 2",
                  label: "x",
                  max: 1,
                  min: -3,
                  step: 0.5,
                  target: 0,
                  targetLabel: "等于 0 的点"
                },
                type: "slider-lab"
              },
              title: "求根公式：代入三步",
              prev: "ch04-u1-l3-p1",
              next: "ch04-u1-l4-p1"
            }
          ]
        },
        {
          id: "ch04-u1-l4",
          title: "因式分解法",
          pages: [
            {
              id: "ch04-u1-l4-p1",
              title: "乘积为零，逐个击破",
              concept: "因式分解法",
              formulas: [
                { id: "f1", latex: "(x+2)(x+3) = 0", translation: "x 加 2 乘 x 加 3 等于 0：左边是两个因式的乘积" },
                { id: "f2", latex: "x + 2 = 0", translation: "x 加 2 等于 0：第一个因式为零，得 x=−2" },
                { id: "f3", latex: "x + 3 = 0", translation: "x 加 3 等于 0：第二个因式为零，得 x=−3" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -5,
                  max: 1,
                  step: 1,
                  label: "x",
                  expr: "(x+2)*(x+3)",
                  target: 0,
                  targetLabel: "乘积为 0"
                }
              },
              auxInteraction: null,
              hints: [
                "原理：若 A·B=0（A、B 为整式），则 A=0 或 B=0——乘积为零，必有一个因式为零。",
                "所以 x+2=0 或 x+3=0，得 x=−2 或 x=−3；拖动滑块验算。",
                "适用范围：先把方程化成一边为 0、另一边能分解的形式。"
              ],
              examples: [
                { text: "x²+5x+6=0 先拆成 (x+2)(x+3)=0", figure: "滑块" }
              ],
              prev: "ch04-u1-l3-p1b",
              next: "ch04-u1-l4-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：因式分解法",
              examples: [
                { figure: "变式练习", text: "x²−9=0：(x+3)(x−3)=0，x=3 或 x=−3。" }
              ],
              formulas: [
                { id: "f1", latex: "x^2 - 3x = 0", translation: "右边已经是 0：左边提公因式" },
                { id: "f2", latex: "x(x - 3) = 0", translation: "x(x−3)=0：乘积为零" },
                { id: "f3", latex: "x = 0, x = 3", translation: "x=0 或 x−3=0：得 x=0 或 x=3" }
              ],
              hints: [
                "因式分解法两步：化成一边为 0；另一边分解成乘积。",
                "x²=3x 不能两边除以 x——x 可能是 0；移项分解才对。"
              ],
              id: "ch04-u1-l4-p1b",
              interaction: {
                params: {
                  expr: "x*(x - 3)",
                  label: "x",
                  max: 4,
                  min: -1,
                  step: 1,
                  target: 0,
                  targetLabel: "乘积为 0"
                },
                type: "slider-lab"
              },
              title: "因式分解法：先化一边为零",
              prev: "ch04-u1-l4-p1",
              next: "ch04-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch04-u2",
      title: "二次方程的性质",
      lessons: [
        {
          id: "ch04-u2-l1",
          title: "根的判别式",
          pages: [
            {
              id: "ch04-u2-l1-p1",
              title: "Δ 的三种几何长相",
              concept: "判别式的几何意义",
              formulas: [
                { id: "f1", latex: "\\Delta > 0", translation: "德尔塔大于 0：抛物线穿过横轴两次，两个不等实根" },
                { id: "f2", latex: "\\Delta = 0", translation: "德尔塔等于 0：抛物线与横轴相切，两个相等的实根（图像上只看到一个交点）" },
                { id: "f3", latex: "\\Delta < 0", translation: "德尔塔小于 0：抛物线碰不到横轴，没有实数根" }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "k",
                    min: -3,
                    max: 3,
                    step: 0.5,
                    initial: 1
                  },
                  views: [
                    { kind: "readout", expr: "-4*k", label: "Δ" },
                    { kind: "point", xExpr: "0", yExpr: "k" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "方程 x²+k=0 的 Δ=−4k；拖动 k，抛物线顶点 (0,k) 上下移动。",
                "k>0 时顶点在横轴上方：Δ<0，无实根；k=0 相切：两个相等的实根；k<0 顶点在下方：Δ>0，两个实根。",
                "Δ 的符号 = 抛物线与横轴的位置关系——代数结论有了几何长相。"
              ],
              examples: [ { text: "开口向上的抛物线，顶点位置决定交点个数", figure: "仪表盘" } ],
              prev: "ch04-u1-l4-p1b",
              next: "ch04-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：根的判别式",
              examples: [
                {
                  figure: "变式练习",
                  text: "x²+x+1=0：Δ=−3<0，无实根；x²−6x+9=0：Δ=0，x=3（重根）。"
                }
              ],
              formulas: [
                { id: "f1", latex: "3x^2 + 2x + 1 = 0", translation: "a=3，b=2，c=1" },
                { id: "f2", latex: "\\Delta = 4 - 12 = -8", translation: "Δ=2²−4×3×1=−8<0" },
                { id: "f3", latex: "\\text{无实数根}", translation: "Δ<0：抛物线碰不到横轴，没有实数根，不用再算" }
              ],
              hints: [
                "解二次方程先算 Δ：Δ<0 直接判无实根，省下后面所有计算。",
                "Δ=0 不是没根：是两个相等的实根（图像上只看到一个交点）。"
              ],
              id: "ch04-u2-l1-p1b",
              interaction: {
                params: {
                  expr: "3*x^2 + 2*x + 1",
                  label: "x",
                  max: 2,
                  min: -2,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "判别式：先算 Δ 再动手",
              prev: "ch04-u2-l1-p1",
              next: "ch04-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch04-u2-l2",
          title: "韦达定理",
          pages: [
            {
              id: "ch04-u2-l2-p1",
              title: "两根的和与积，藏在系数里",
              concept: "韦达定理",
              formulas: [
                { id: "f1", latex: "x_1 + x_2 = -\\frac{b}{a}", translation: "两根之和等于负 a 分之 b" },
                { id: "f2", latex: "x_1 x_2 = \\frac{c}{a}", translation: "两根之积等于 a 分之 c" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 6,
                  step: 1,
                  label: "x",
                  expr: "x^2 - 5*x + 6",
                  target: 0,
                  targetLabel: "等于 0 的点"
                }
              },
              auxInteraction: null,
              hints: [
                "对 ax²+bx+c=0（a≠0，Δ≥0）：两根 x₁、x₂ 的和是 −b/a，积是 c/a。",
                "验证老朋友 x²−5x+6=0：两根 2 和 3，和为 5，积为 6——不用解方程也知道。",
                "两根在数轴上关于 x=−b/2a 对称；已知一根可求另一根、判断根的符号。"
              ],
              examples: [ { text: "两根在数轴上关于 −b/2a 对称", figure: "滑块" } ],
              prev: "ch04-u2-l1-p1b",
              next: "ch04-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：韦达定理",
              examples: [
                { figure: "变式练习", text: "x²−5x+6=0 的两根 2、3：和 5=−(−5)/1，积 6=6/1。" }
              ],
              formulas: [
                { id: "f1", latex: "x^2 - 7x + 10 = 0", translation: "a=1，b=−7，c=10，Δ=9>0" },
                { id: "f2", latex: "x_1 + x_2 = 7", translation: "两根之和=−b/a=7" },
                { id: "f3", latex: "x_1 x_2 = 10", translation: "两根之积=c/a=10：两根是 2 和 5（和 7 积 10）" }
              ],
              hints: [
                "韦达定理：和=−b/a，积=c/a——注意和有个负号。",
                "妙用：已知一根是 2，另一根=10÷2=5，不用再解方程。"
              ],
              id: "ch04-u2-l2-p1b",
              interaction: {
                params: {
                  expr: "x^2 - 7*x + 10",
                  label: "x",
                  max: 7,
                  min: 0,
                  step: 1,
                  target: 0,
                  targetLabel: "等于 0 的点"
                },
                type: "slider-lab"
              },
              title: "韦达定理：不用解方程",
              prev: "ch04-u2-l2-p1",
              next: "ch04-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch04-u2-l3",
          title: "二次方程的应用",
          pages: [
            {
              id: "ch04-u2-l3-p1",
              title: "面积问题：方程从哪儿来",
              concept: "列二次方程解应用题",
              formulas: [
                { id: "f1", latex: "x(x+2) = 24", translation: "x 乘 x 加 2 等于 24：宽为 x，长为 x+2，面积 24" },
                { id: "f2", latex: "x = 4", translation: "x 等于 4：宽 4 米（负根舍去，边长为正）" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "x*(x+2)",
                  target: 24,
                  targetLabel: "面积 = 24"
                }
              },
              auxInteraction: null,
              hints: [
                "长方形长比宽多 2 米，面积 24 平方米：设宽 x 米，列方程 x(x+2)=24。",
                "解得 x=4 或 x=−6；边长不能为负，舍去 −6——实际问题要检验解的合理性。"
              ],
              examples: [
                { text: "面积问题：长比宽多 2 米，面积 24 平方米", figure: "滑块" }
              ],
              prev: "ch04-u2-l2-p1b",
              next: "ch04-u2-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：列二次方程解应用题",
              examples: [
                { figure: "生活实例", text: "两数和 10、积 21：设一数为 x，x(10−x)=21，x=3 或 7。" }
              ],
              formulas: [
                { id: "f1", latex: "x(x + 3) = 40", translation: "设宽 x 米，长 (x+3) 米：面积 40 平方米" },
                { id: "f2", latex: "x^2 + 3x - 40 = 0", translation: "展开移项：(x+8)(x−5)=0" },
                { id: "f3", latex: "x = 5", translation: "x=5 或 x=−8；边长为正，舍去 −8：宽 5 米，长 8 米" }
              ],
              hints: [
                "列二次方程四步：设、列、解、验——验两件事：方程对不对、解合不合理。",
                "负根常常要舍去：边长、时间、人数不能是负的。"
              ],
              id: "ch04-u2-l3-p1b",
              interaction: {
                params: {
                  expr: "x*(x + 3)",
                  label: "x",
                  max: 10,
                  min: 1,
                  step: 1,
                  target: 40,
                  targetLabel: "面积 = 40",
                  unit: "平方米"
                },
                type: "slider-lab"
              },
              title: "应用题：设列解验四步",
              prev: "ch04-u2-l3-p1",
              next: "ch04-u2-l4-p1"
            }
          ]
        },
        {
          id: "ch04-u2-l4",
          title: "本章小结",
          pages: [
            {
              id: "ch04-u2-l4-p1",
              title: "一图流：从配方到公式",
              concept: "本章知识串联",
              formulas: [
                {
                  id: "f1",
                  latex: "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
                  translation: "求根公式：配方法的终极形态"
                },
                {
                  id: "f2",
                  latex: "x_1 + x_2 = -\\frac{b}{a}, x_1 x_2 = \\frac{c}{a}",
                  translation: "韦达定理：两根的和与积藏在系数里"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -3,
                  max: 3,
                  step: 1,
                  label: "x",
                  expr: "x^2 - 4",
                  target: 0,
                  targetLabel: "等于 0"
                }
              },
              auxInteraction: null,
              hints: [
                "路线：几何补正方形（配方）→ 公式法（能分解先用因式分解法）→ Δ 看个数 → 韦达看关系。",
                "三种解法按顺序试：能分解用因式分解法，否则配方，万能钥匙是公式法。",
                "方程的实数解 = 抛物线与横轴交点的横坐标——代数与几何在这里会合。"
              ],
              examples: [
                { text: "x²−4=0：三种解法都能解，拖滑块看 x=±2", figure: "滑块" }
              ],
              prev: "ch04-u2-l3-p1b",
              next: "ch04-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch04-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch04-ux-l1",
          title: "第四章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．2，3；2．−7，0 个；3．9，3；4．x=1 或 x=3；5．5，6；6．5 米（列 x²+4x−45=0，舍去 −9）"
                }
              ,
                { figure: "错因解析", text: "1．x²−5x+6=(x−2)(x−3)：和 5、积 6 的两数是 2、3。2．Δ=3²−4×2×2=9−16=−7<0：没有实数根。3．x²+6x+9=(x+3)²：配的数=(6/2)²=9。4．Δ=16−12=4，x=(4±2)/2：x=1 或 x=3。5．韦达定理：x₁+x₂=−b/a=5，x₁x₂=c/a=6。6．设宽 x：x(x+4)=45，(x+9)(x−5)=0，x=5（−9 舍去，宽度不能为负）。" }],
              formulas: [
                { id: "f1", latex: "x^2 - 5x + 6 = 0", translation: "第 1 题：(x−2)(x−3)=0，乘积为零逐个击破" }
              ],
              hints: [
                "1．方程 x²−5x+6=0 的两根是____、____。",
                "2．方程 2x²+3x+2=0 的 Δ=____，有____个实数根。",
                "3．配方：x²+6x+____=(x+____)²。",
                "4．用公式法解：x²−4x+3=0。",
                "5．x²−5x+6=0 的两根 x₁、x₂：x₁+x₂=____，x₁x₂=____。",
                "6．长方形长比宽多 4 米，面积 45 平方米，宽是几米？"
              ],
              id: "ch04-ux-l1-p1",
              interaction: {
                params: {
                  expr: "x^2 - 5*x + 6",
                  label: "x",
                  max: 5,
                  min: 0,
                  step: 0.5,
                  target: 0,
                  targetLabel: "等于 0 的点（第 1 题）"
                },
                type: "slider-lab"
              },
              title: "第四章习题：一元二次方程",
              prev: "ch04-u2-l4-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
