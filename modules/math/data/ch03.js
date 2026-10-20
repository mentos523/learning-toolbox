/* ============================================================
 * 学习工具箱 · 数学 · 代数 第三章：分式（18 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第三章）。
 * 黄队教学流（docs/math-algebra-pedagogy.md 五条铁律）。
 *
 * 页面：u1-l1-p1 分式的定义（分母含字母）
 *       u1-l1-p2 分式有意义的条件（分母≠0，数轴禁区）
 *       u1-l2-p1 分式的基本性质（约分、通分）
 *       u2-l1-p1 分式的乘除（先约分再乘，除变乘）
 *       u2-l2-p1 分式的加减（一）：异分母通分
 *       u2-l2-p2 分式的加减（二）：同分母分子加减
 *       u2-l3-p1 分式方程（一）：去分母
 *       u2-l3-p2 分式方程（二）：增根检验
 *       u2-l4-p1 本章小结：一图流
 * 交互全部复用已实现渲染器：slider-lab（label 均为纯变量名）。
 * 无需新交互渲染器。
 * 前两批教训落实：
 *   - slider-lab label 全部用纯变量名 "x"（不加中文括号）
 *   - 未使用 balance-drag，无初始胜利条件问题
 *   - 分式定义完整给出（A、B 整式，B 含字母，A 分子 B 分母）
 *   - 适用范围处处限定：约分/通分乘除的整式≠0；去分母公分母≠0；增根舍去
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch03"] = {
  id: "ch03",
  title: "分式",
  units: [
    {
      id: "ch03-u1",
      title: "分式的概念与性质",
      lessons: [
        {
          id: "ch03-u1-l1",
          title: "分式的定义",
          pages: [
            {
              id: "ch03-u1-l1-p1",
              title: "分母里住进了字母",
              concept: "分式的定义",
              formulas: [
                { id: "f1", latex: "\\frac{3}{4}", translation: "四分之三：普通的分数，分母是数字" },
                { id: "f2", latex: "\\frac{3}{x}", translation: "x 分之三：分母是字母 x，它就是分式" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "12/x"
                }
              },
              auxInteraction: null,
              hints: [
                "一般地，A、B 是两个整式，B 含有字母时，A÷B 写成 A/B 的形式，就叫做分式；A 叫分子，B 叫分母。",
                "拖动滑块：分母 x 在变，值跟着变——字母住进分母，分数就升级成了分式。"
              ],
              examples: [
                { text: "12 块披萨分给 x 个人，每人 12/x 块", figure: "滑块" }
              ],
              prev: null,
              next: "ch03-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：分式的定义",
              examples: [
                { figure: "辨析", text: "x/5 不是分式（分母是 5）；5/x 是分式；(x+1)/(x−1) 是分式。" }
              ],
              formulas: [
                { id: "f1", latex: "\\frac{1}{2}", translation: "二分之一：分母是数字，只是分数" },
                { id: "f2", latex: "\\frac{1}{a}", translation: "a 分之一：分母是字母 a，它就是分式" },
                { id: "f3", latex: "\\frac{x + 1}{2}", translation: "分母是 2（数字）：不是分式，是整式——认分式只看分母" }
              ],
              hints: [
                "认分式只看分母：分母里有字母才是分式，分子有没有字母无所谓。",
                "π 是数字不是字母：2/π 是分数不是分式，别被希腊字母骗了。",
                "这里的『分子』『分母』，指分式中分数线上方、下方的代数式（在分数中则是上方、下方的数）；它与化学、物理里构成物质的微粒『分子』只是同名，含义无关，不要按粒子义理解分式。"
              ],
              id: "ch03-u1-l1-p1b",
              interaction: {
                params: {
                  expr: "12/x",
                  label: "x",
                  max: 10,
                  min: 1,
                  step: 1
                },
                type: "slider-lab"
              },
              title: "分式：只看分母有没有字母",
              prev: "ch03-u1-l1-p1",
              next: "ch03-u1-l1-p2"
            },
            {
              id: "ch03-u1-l1-p2",
              title: "分母不能为零",
              concept: "分式有意义的条件",
              formulas: [
                { id: "f1", latex: "\\frac{5}{x-2}", translation: "5 除以 x 减 2：分母是 x 减 2" },
                { id: "f2", latex: "x - 2 \\neq 0", translation: "x 减 2 不等于 0：分式有意义的条件" }
              ],
              interaction: {
                type: "eq-graph-lab",
                params: {
                  min: -2,
                  max: 6,
                  step: 1,
                  label: "x",
                  expr: "x - 2",
                  target: 0,
                  targetLabel: "分母为零的点",
                  graph: {
                    kind: "rational",
                    forbidAt: []
                  }
                },
                engine: {
                  primitive: "EqGraphLab",
                  version: "2026.10.16.A",
                  params: {
                    kind: "rational",
                    forbidAt: []
                  }
                }
              },
              auxInteraction: null,
              hints: [
                "拖到 x=2：分母变成 0，这个点是数轴上的“禁区”，要挖去。",
                "分式有意义 ⟺ 分母 ≠ 0；先找到禁区，再谈计算。"
              ],
              examples: [ { text: "x=2 是禁区：5 除以 0 没有意义", figure: "滑块" } ],
              prev: "ch03-u1-l1-p1b",
              next: "ch03-u1-l1-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：分式有意义的条件",
              examples: [
                { figure: "变式练习", text: "1/(2x−4)：令 2x−4=0 得 x=2，禁区是 2。" }
              ],
              formulas: [
                { id: "f1", latex: "\\frac{6}{x + 3}", translation: "6 除以 x 加 3：分母是 x+3" },
                { id: "f2", latex: "x + 3 \\neq 0", translation: "有意义的条件：分母 x+3 不等于 0" },
                { id: "f3", latex: "x \\neq -3", translation: "禁区：x=−3，数轴上这个点要挖去" }
              ],
              hints: [
                "求禁区一步：令分母=0，解出来的 x 就是禁区。",
                "分式题第一问永远是“有意义”：先找禁区，再谈计算。"
              ],
              id: "ch03-u1-l1-p2b",
              interaction: {
                type: "eq-graph-lab",
                params: {
                  min: -6,
                  max: 2,
                  step: 1,
                  label: "x",
                  expr: "x + 3",
                  target: 0,
                  targetLabel: "禁区：分母为零",
                  graph: {
                    kind: "rational",
                    forbidAt: []
                  }
                },
                engine: {
                  primitive: "EqGraphLab",
                  version: "2026.10.16.A",
                  params: {
                    kind: "rational",
                    forbidAt: []
                  }
                }
              },
              title: "禁区：让分母等于零的 x",
              prev: "ch03-u1-l1-p2",
              next: "ch03-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch03-u1-l2",
          title: "分式的基本性质",
          pages: [
            {
              id: "ch03-u1-l2-p1",
              title: "分子分母同乘除，值不变",
              concept: "分式的基本性质",
              formulas: [
                { id: "f1", latex: "\\frac{4x}{2x} = 2", translation: "4x 除以 2x 等于 2：分子分母同除以 2x，这叫约分" },
                {
                  id: "f2",
                  latex: "\\frac{1}{2} = \\frac{x}{2x}",
                  translation: "二分之一等于 x 除以 2x：分子分母同乘 x（分式基本性质的用法）"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "(4*x)/(2*x)"
                }
              },
              auxInteraction: null,
              hints: [
                "拖动滑块：x 怎么变，值恒为 2——分子分母里的 x 被约掉了。",
                "约分是同除以公因式，通分是同乘一个整式；乘除的整式不能为零。"
              ],
              examples: [ { text: "分数约分 6/8=3/4 的翻版", figure: "滑块" } ],
              prev: "ch03-u1-l1-p2b",
              next: "ch03-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：约分",
              examples: [
                { figure: "变式练习", text: "(a²−b²)/(a+b)=a−b：先把分子分解成 (a+b)(a−b)，再约。" }
              ],
              formulas: [
                { id: "f1", latex: "\\frac{6x^2}{3x}", translation: "分子 6x²，分母 3x：找公因式" },
                { id: "f2", latex: "\\frac{6x^2}{3x} = 2x", translation: "同除以公因式 3x：6÷3=2，x²÷x=x" },
                { id: "f3", latex: "\\frac{x + 2}{2}", translation: "反例：x+2 和 2 没有公因式，约不动——加减号隔开不能约" }
              ],
              hints: [
                "约分=分子分母同除以公因式；约到不能再约叫最简分式。",
                "大忌：(x+2)/2 约成 x——加号隔开的不是因式，不能约！"
              ],
              id: "ch03-u1-l2-p1b",
              interaction: {
                params: {
                  expr: "(6*x^2)/(3*x)",
                  label: "x",
                  max: 10,
                  min: 1,
                  step: 1
                },
                type: "slider-lab"
              },
              title: "约分：分子分母同除",
              prev: "ch03-u1-l2-p1",
              next: "ch03-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch03-u2",
      title: "分式的运算与方程",
      lessons: [
        {
          id: "ch03-u2-l1",
          title: "分式的乘除",
          pages: [
            {
              id: "ch03-u2-l1-p1",
              title: "先约分，再相乘",
              concept: "分式的乘除法",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{2}{x} \\cdot \\frac{x}{4} = \\frac{1}{2}",
                  translation: "x 分之 2 乘 4 分之 x 等于二分之一：x 先约掉"
                },
                {
                  id: "f2",
                  latex: "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}",
                  translation: "除以一个分式，等于乘它的倒数（其中 b、c、d 都不为零）"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "(2/x)*(x/4)"
                }
              },
              auxInteraction: null,
              hints: [
                "乘法：分子乘分子、分母乘分母；能约分的先约分，数字会小很多。",
                "除法没有新规则：除以 c/d 就是乘 d/c，然后按乘法做。"
              ],
              examples: [
                { text: "2/x × x/4：x 约掉，直接得 1/2", figure: "滑块" }
              ],
              prev: "ch03-u1-l2-p1b",
              next: "ch03-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：分式的乘除法",
              examples: [
                {
                  figure: "变式练习",
                  text: "(2a/b)÷(4/a)：倒数是 a/4，(2a/b)·(a/4)=a²/(2b)。"
                }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{3x}{4} \\cdot \\frac{8}{9x}",
                  translation: "先别急着乘：找能约的——3x 与 9x，4 与 8"
                },
                {
                  id: "f2",
                  latex: "\\frac{3x}{4} \\cdot \\frac{8}{9x} = \\frac{2}{3}",
                  translation: "约分：3x 与 9x 约成 1 和 3，4 与 8 约成 1 和 2，得 2/3"
                },
                {
                  id: "f3",
                  latex: "\\frac{x}{2} \\div \\frac{3}{x} = \\frac{x^2}{6}",
                  translation: "除变乘：x/2 乘 x/3，等于 x²/6"
                }
              ],
              hints: [
                "乘法口诀：先约分再相乘——数字越小越不容易错。",
                "除法只有一步：除以一个分式=乘它的倒数，然后按乘法做。"
              ],
              id: "ch03-u2-l1-p1b",
              interaction: {
                params: {
                  expr: "(3*x/4)*(8/(9*x))",
                  label: "x",
                  max: 10,
                  min: 1,
                  step: 1
                },
                type: "slider-lab"
              },
              title: "乘除：先约分再相乘",
              prev: "ch03-u2-l1-p1",
              next: "ch03-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch03-u2-l2",
          title: "分式的加减",
          pages: [
            {
              id: "ch03-u2-l2-p1",
              title: "异分母相加：先通分",
              concept: "分式的加减（通分）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}",
                  translation: "二分之一加三分之一等于六分之五：先通分再相加"
                },
                {
                  id: "f2",
                  latex: "\\frac{1}{x} + \\frac{1}{2x} = \\frac{3}{2x}",
                  translation: "x 分之一加 2x 分之一等于 2x 分之三"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "1/x + 1/(2*x)"
                }
              },
              auxInteraction: null,
              hints: [
                "1/x = 2/(2x)：把分母都变成 2x（最简公分母），再把分子相加。",
                "和分数加法一模一样：先找公分母，再加减分子，分母不动。"
              ],
              examples: [
                { text: "1/2+1/3 通分成 3/6+2/6 的翻版", figure: "滑块" }
              ],
              prev: "ch03-u2-l1-p1b",
              next: "ch03-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：通分",
              examples: [
                { figure: "变式练习", text: "1/a+1/b：最简公分母 ab，通分成 b/ab+a/ab=(a+b)/ab。" }
              ],
              formulas: [
                { id: "f1", latex: "\\frac{2}{x} + \\frac{3}{2x}", translation: "分母 x 和 2x：最简公分母是 2x" },
                {
                  id: "f2",
                  latex: "\\frac{4}{2x} + \\frac{3}{2x}",
                  translation: "2/x 分子分母同乘 2：变成 4/(2x)"
                },
                { id: "f3", latex: "\\frac{7}{2x}", translation: "同分母了：分子 4+3=7，分母不动" }
              ],
              hints: [
                "通分=找最简公分母：系数取最小公倍数，字母取最高次幂。",
                "通分不改变值：分子乘几，分母必须乘几。"
              ],
              id: "ch03-u2-l2-p1b",
              interaction: {
                params: {
                  expr: "2/x + 3/(2*x)",
                  label: "x",
                  max: 10,
                  min: 1,
                  step: 1
                },
                type: "slider-lab"
              },
              title: "通分：化成相同分母",
              prev: "ch03-u2-l2-p1",
              next: "ch03-u2-l2-p2"
            },
            {
              id: "ch03-u2-l2-p2",
              title: "同分母：分子直接加减",
              concept: "分式的加减（法则）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{5}{x} - \\frac{2}{x} = \\frac{3}{x}",
                  translation: "x 分之 5 减 x 分之 2 等于 x 分之 3"
                },
                {
                  id: "f2",
                  latex: "\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}",
                  translation: "同分母相加：分子相加，分母不变"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "5/x - 2/x"
                }
              },
              auxInteraction: null,
              hints: [
                "分母相同，分子直接加减：5 个 1/x 减 2 个 1/x，还剩 3 个 1/x。",
                "结果还能约分一定要约到最简：这是分式运算的收尾动作。"
              ],
              examples: [
                { text: "5 个 1/x 减 2 个 1/x，还剩 3 个 1/x", figure: "滑块" }
              ],
              prev: "ch03-u2-l2-p1b",
              next: "ch03-u2-l2-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：同分母分式加减",
              examples: [
                { figure: "变式练习", text: "(2a+1)/a−1/a=2a/a=2：分子 2a+1−1=2a，再约分。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{3x + 1}{x} - \\frac{x + 1}{x}",
                  translation: "同分母：分母 x 不动，分子相减"
                },
                {
                  id: "f2",
                  latex: "\\frac{3x + 1 - (x + 1)}{x}",
                  translation: "分子是多项式相减：(x+1) 整体减，必须添括号"
                },
                { id: "f3", latex: "\\frac{2x}{x} = 2", translation: "=2x/x=2：还能约分，一定要约干净" }
              ],
              hints: [
                "分子是多项式相减时添括号：−(x+1)=−x−1，漏括号是重灾区。",
                "收尾动作：结果能约分必须约到最简。"
              ],
              id: "ch03-u2-l2-p2b",
              interaction: {
                params: {
                  expr: "(3*x + 1)/x - (x + 1)/x",
                  label: "x",
                  max: 10,
                  min: 1,
                  step: 1
                },
                type: "slider-lab"
              },
              title: "加减：分母不动算分子",
              prev: "ch03-u2-l2-p2",
              next: "ch03-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch03-u2-l3",
          title: "分式方程",
          pages: [
            {
              id: "ch03-u2-l3-p1",
              title: "去分母：两边同乘",
              concept: "分式方程的解法",
              formulas: [
                { id: "f1", latex: "\\frac{3}{x} = 1", translation: "x 分之 3 等于 1：分母里有未知数的方程叫分式方程" },
                { id: "f2", latex: "3 = x", translation: "两边同乘最简公分母 x：得到 3 等于 x" }
              ],
              interaction: {
                type: "eq-graph-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "3/x",
                  target: 1,
                  targetLabel: "右边 = 1",
                  graph: {
                    kind: "rational",
                    forbidAt: [ 0 ]
                  }
                },
                engine: {
                  primitive: "EqGraphLab",
                  version: "2026.10.16.A",
                  params: {
                    kind: "rational",
                    forbidAt: [ 0 ]
                  }
                }
              },
              auxInteraction: null,
              hints: [
                "分母里有未知数 ⟺ 分式方程；去分母：两边同乘最简公分母 x（x≠0——分母不能乘丢铁律），化成整式方程。",
                "拖动滑块找到 x=3：这就是去分母后解出来的答案，回代验算一下。"
              ],
              examples: [ { text: "3/x=1：x=3 时左边恰好等于 1", figure: "滑块" } ],
              prev: "ch03-u2-l2-p2b",
              next: "ch03-u2-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：分式方程的解法",
              examples: [
                {
                  figure: "变式练习",
                  text: "2/(x+1)=1：同乘 (x+1) 得 2=x+1，x=1；检验 x+1=2≠0。"
                }
              ],
              formulas: [
                { id: "f1", latex: "\\frac{4}{x} = 2", translation: "第一步：找最简公分母 x（x≠0，分母不能为零）" },
                { id: "f2", latex: "4 = 2x", translation: "第二步：两边同乘 x，分母消失，变成整式方程" },
                { id: "f3", latex: "x = 4", translation: "第三步：x=4；检验：4≠0，不在禁区，通过" }
              ],
              hints: [
                "解分式方程三步：找最简公分母；两边同乘去分母；解整式方程。",
                "去分母的依据是等式性质 2：两边乘同一个不为 0 的整式。"
              ],
              id: "ch03-u2-l3-p1b",
              interaction: {
                type: "eq-graph-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "4/x",
                  target: 2,
                  targetLabel: "右边 = 2",
                  graph: {
                    kind: "rational",
                    forbidAt: [ 0 ]
                  }
                },
                engine: {
                  primitive: "EqGraphLab",
                  version: "2026.10.16.A",
                  params: {
                    kind: "rational",
                    forbidAt: [ 0 ]
                  }
                }
              },
              title: "分式方程：去分母三步",
              prev: "ch03-u2-l3-p1",
              next: "ch03-u2-l3-p2"
            },
            {
              id: "ch03-u2-l3-p2",
              title: "增根：闯入禁区的解",
              concept: "增根与检验",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{x}{x-2} = \\frac{2}{x-2}",
                  translation: "x 除以 x 减 2，等于 2 除以 x 减 2"
                },
                {
                  id: "f2",
                  latex: "x = 2 \\rightarrow x - 2 = 0",
                  translation: "去分母解得 x=2，但此时分母为零：这是增根，要舍去"
                }
              ],
              interaction: {
                type: "eq-graph-lab",
                params: {
                  min: 0,
                  max: 5,
                  step: 1,
                  label: "x",
                  expr: "x - 2",
                  target: 0,
                  targetLabel: "禁区：分母为零",
                  graph: {
                    kind: "rational",
                    forbidAt: [],
                    markX: [ 2 ]
                  }
                },
                engine: {
                  primitive: "EqGraphLab",
                  version: "2026.10.16.A",
                  params: {
                    kind: "rational",
                    forbidAt: [],
                    markX: [ 2 ]
                  }
                }
              },
              auxInteraction: null,
              hints: [
                "去分母得 x=2；可 x=2 恰是第 2 页说的禁区——分母为零，原方程无意义。",
                "增根必须舍去，原方程无解；所以解分式方程最后一步永远是检验。"
              ],
              examples: [
                { text: "x=2 是“假解”：它闯入了分母为零的禁区", figure: "滑块" }
              ],
              prev: "ch03-u2-l3-p1b",
              next: "ch03-u2-l3-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：增根与检验",
              examples: [
                { figure: "变式练习", text: "1/(x−2)=3/(x−2)：去分母得 1=3，无解——连增根都没有。" }
              ],
              formulas: [
                { id: "f1", latex: "\\frac{x}{x-3} = \\frac{3}{x-3}", translation: "两边同乘 (x−3) 去分母" },
                { id: "f2", latex: "x = 3", translation: "解得 x=3" },
                { id: "f3", latex: "x - 3 = 0 \\to \\text{舍去}", translation: "检验：x=3 让分母为零，是增根，原方程无解" }
              ],
              hints: [
                "增根=去分母时混进来的假解：它让分母为零，必须舍去。",
                "分式方程最后一步永远是检验：代入最简公分母，为零就舍去。"
              ],
              id: "ch03-u2-l3-p2b",
              interaction: {
                type: "eq-graph-lab",
                params: {
                  min: 0,
                  max: 6,
                  step: 1,
                  label: "x",
                  expr: "x - 3",
                  target: 0,
                  targetLabel: "禁区：分母为零",
                  graph: {
                    kind: "rational",
                    forbidAt: [],
                    markX: [ 3 ]
                  }
                },
                engine: {
                  primitive: "EqGraphLab",
                  version: "2026.10.16.A",
                  params: {
                    kind: "rational",
                    forbidAt: [],
                    markX: [ 3 ]
                  }
                }
              },
              title: "增根：解完必须检验",
              prev: "ch03-u2-l3-p2",
              next: "ch03-u2-l4-p1"
            }
          ]
        },
        {
          id: "ch03-u2-l4",
          title: "本章小结",
          pages: [
            {
              id: "ch03-u2-l4-p1",
              title: "一图流：分式全家桶",
              concept: "本章小结",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{x^2-1}{x-1} = x + 1",
                  translation: "x 平方减 1 除以 x 减 1 等于 x 加 1：分子分母约掉 x 减 1"
                },
                { id: "f2", latex: "x \\neq 1", translation: "但 x 不能等于 1：约分不改变“分母不为零”的铁律" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 2,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "(x^2 - 1)/(x - 1)"
                }
              },
              auxInteraction: null,
              hints: [
                "本章一条线：分母含字母 → 分母≠0 → 约分通分 → 乘除/加减 → 去分母解方程 → 检验增根。",
                "所有运算最后都要问两句：还能约分吗？分母为零了吗？"
              ],
              examples: [ { text: "约分前后，禁区 x=1 一直都在", figure: "滑块" } ],
              prev: "ch03-u2-l3-p2b",
              next: "ch03-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch03-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch03-ux-l1",
          title: "第三章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．B；2．5；3．(2x)/3；4．1/2；5．3/x；6．x=4（检验：分母 4≠0，通过）"
                }
              ,
                { figure: "错因解析", text: "1．分式=分母含字母：A、C 分母是数字，只有 B 的分母是 x。2．分母不能为 0：x−5≠0，得 x≠5。3．分子分母同除以 2x：(4x²)/(6x)=2x/3。4．约分：(2/a)·(a/4)=2a/4a=1/2——a 可以约掉（a≠0）。5．同分母相加：分子相加，1+2=3，得 3/x。6．两边×x：4=x；检验：x=4 时分母≠0，是原方程的解。" }],
              formulas: [
                { id: "f1", latex: "\\frac{4}{x} = 1", translation: "第 6 题：两边同乘 x 去分母，得 4=x" }
              ],
              hints: [
                "1．是分式的是（ ）A．x/2 B．2/x C．(x+1)/3",
                "2．分式 3/(x−5) 有意义，则 x≠____。",
                "3．约分：(4x²)/(6x)=____。",
                "4．计算：(2/a)·(a/4)=____。",
                "5．计算：1/x+2/x=____。",
                "6．解方程：4/x=1，并检验。"
              ],
              id: "ch03-ux-l1-p1",
              interaction: {
                type: "eq-graph-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "4/x",
                  target: 1,
                  targetLabel: "右边 = 1（第 6 题）",
                  graph: {
                    kind: "rational",
                    forbidAt: [ 0 ]
                  }
                },
                engine: {
                  primitive: "EqGraphLab",
                  version: "2026.10.16.A",
                  params: {
                    kind: "rational",
                    forbidAt: [ 0 ]
                  }
                }
              },
              title: "第三章习题：分式",
              prev: "ch03-u2-l4-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
