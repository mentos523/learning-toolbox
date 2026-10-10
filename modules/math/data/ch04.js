/* ============================================================
 * 学习工具箱 · 数学 · 代数 第四章：一元二次方程（11 页）
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
                {
                  id: "f2",
                  latex: "t = 0 \\to h = 2",
                  translation: "t 等于 0 时 h 等于 2：出手高度是 2 米"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: { label: "t", min: 0, max: 4, step: 0.1, initial: 0 },
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
              examples: [
                { text: "铅球、喷泉、投篮，走的都是这种弯路", figure: "仪表盘" }
              ],
              prev: null,
              next: "ch04-u0-l1-p2"
            },
            {
              id: "ch04-u0-l1-p2",
              title: "点点成线：画出它的画像",
              concept: "抛物线的描点生成",
              formulas: [
                {
                  id: "f1",
                  latex: "(t, h)",
                  translation: "t 和 h 组成一个点：每一时刻铅球的位置"
                },
                {
                  id: "f2",
                  latex: "h = -5t^2 + 20t + 2",
                  translation: "把每个点连起来，得到这条曲线的画像"
                }
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
              examples: [
                { text: "描点法：列表、描点、连线三步画图像", figure: "描点" }
              ],
              prev: "ch04-u0-l1-p1",
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
                {
                  id: "f1",
                  latex: "ax^2 + bx + c = 0",
                  translation: "a x 平方加 b x 加 c 等于 0：标准形式"
                },
                {
                  id: "f2",
                  latex: "a \\neq 0",
                  translation: "a 不等于 0：如果 a 是 0，二次项就没了"
                }
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
              prev: "ch04-u0-l1-p2",
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
                    params: { min: 0, max: 6, step: 1, label: "x", expr: "x^2 + 6*x" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: 0, max: 6, step: 1, label: "x", expr: "(x+3)^2 - 9" }
                  },
                  sync: ["x"],
                  labels: ["配方前：缺角的正方形", "配方后：完整正方形减去小块"]
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
              prev: "ch04-u1-l1-p1",
              next: "ch04-u1-l2-p2"
            },
            {
              id: "ch04-u1-l2-p2",
              title: "配方：把二次降成一次",
              concept: "配方法的代数步骤",
              formulas: [
                {
                  id: "f1",
                  latex: "x^2 + 6x + 5 = 0",
                  translation: "x 平方加 6x 加 5 等于 0：待解的方程"
                },
                {
                  id: "f2",
                  latex: "(x+3)^2 = 4",
                  translation: "x 加 3 的平方等于 4：配方后只剩一个平方"
                },
                {
                  id: "f3",
                  latex: "x + 3 = \\pm 2",
                  translation: "x 加 3 等于正负 2：开平方，一次方程出现了"
                }
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
              prev: "ch04-u1-l2-p1",
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
                {
                  id: "f2",
                  latex: "\\Delta = b^2 - 4ac",
                  translation: "德尔塔等于 b 平方减 4ac：判别式，就是根号里的东西"
                }
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
              examples: [
                { text: "任何二次方程都能解：先算 Δ，再套公式", figure: "滑块" }
              ],
              prev: "ch04-u1-l2-p2",
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
                {
                  id: "f1",
                  latex: "(x+2)(x+3) = 0",
                  translation: "x 加 2 乘 x 加 3 等于 0：左边是两个因式的乘积"
                },
                {
                  id: "f2",
                  latex: "x + 2 = 0",
                  translation: "x 加 2 等于 0：第一个因式为零，得 x=−2"
                },
                {
                  id: "f3",
                  latex: "x + 3 = 0",
                  translation: "x 加 3 等于 0：第二个因式为零，得 x=−3"
                }
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
              prev: "ch04-u1-l3-p1",
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
                {
                  id: "f1",
                  latex: "\\Delta > 0",
                  translation: "德尔塔大于 0：抛物线穿过横轴两次，两个不等实根"
                },
                {
                  id: "f2",
                  latex: "\\Delta = 0",
                  translation: "德尔塔等于 0：抛物线与横轴相切，两个相等的实根（图像上只看到一个交点）"
                },
                {
                  id: "f3",
                  latex: "\\Delta < 0",
                  translation: "德尔塔小于 0：抛物线碰不到横轴，没有实数根"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: { label: "k", min: -3, max: 3, step: 0.5, initial: 1 },
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
              examples: [
                { text: "开口向上的抛物线，顶点位置决定交点个数", figure: "仪表盘" }
              ],
              prev: "ch04-u1-l4-p1",
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
                {
                  id: "f1",
                  latex: "x_1 + x_2 = -\\frac{b}{a}",
                  translation: "两根之和等于负 a 分之 b"
                },
                {
                  id: "f2",
                  latex: "x_1 x_2 = \\frac{c}{a}",
                  translation: "两根之积等于 a 分之 c"
                }
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
              examples: [
                { text: "两根在数轴上关于 −b/2a 对称", figure: "滑块" }
              ],
              prev: "ch04-u2-l1-p1",
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
                {
                  id: "f1",
                  latex: "x(x+2) = 24",
                  translation: "x 乘 x 加 2 等于 24：宽为 x，长为 x+2，面积 24"
                },
                {
                  id: "f2",
                  latex: "x = 4",
                  translation: "x 等于 4：宽 4 米（负根舍去，边长为正）"
                }
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
              prev: "ch04-u2-l2-p1",
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
              prev: "ch04-u2-l3-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
