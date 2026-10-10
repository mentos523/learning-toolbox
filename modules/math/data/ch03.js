/* ============================================================
 * 学习工具箱 · 数学 · 代数 第三章：分式（9 页）
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
                {
                  id: "f1",
                  latex: "\\frac{3}{4}",
                  translation: "四分之三：普通的分数，分母是数字"
                },
                {
                  id: "f2",
                  latex: "\\frac{3}{x}",
                  translation: "x 分之三：分母是字母 x，它就是分式"
                }
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
              next: "ch03-u1-l1-p2"
            },
            {
              id: "ch03-u1-l1-p2",
              title: "分母不能为零",
              concept: "分式有意义的条件",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{5}{x-2}",
                  translation: "5 除以 x 减 2：分母是 x 减 2"
                },
                {
                  id: "f2",
                  latex: "x - 2 \\neq 0",
                  translation: "x 减 2 不等于 0：分式有意义的条件"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -2,
                  max: 6,
                  step: 1,
                  label: "x",
                  expr: "x - 2",
                  target: 0,
                  targetLabel: "分母为零的点"
                }
              },
              auxInteraction: null,
              hints: [
                "拖到 x=2：分母变成 0，这个点是数轴上的“禁区”，要挖去。",
                "分式有意义 ⟺ 分母 ≠ 0；先找到禁区，再谈计算。"
              ],
              examples: [
                { text: "x=2 是禁区：5 除以 0 没有意义", figure: "滑块" }
              ],
              prev: "ch03-u1-l1-p1",
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
                {
                  id: "f1",
                  latex: "\\frac{4x}{2x} = 2",
                  translation: "4x 除以 2x 等于 2：分子分母同除以 2x，这叫约分"
                },
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
              examples: [
                { text: "分数约分 6/8=3/4 的翻版", figure: "滑块" }
              ],
              prev: "ch03-u1-l1-p2",
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
              prev: "ch03-u1-l2-p1",
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
              prev: "ch03-u2-l1-p1",
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
              prev: "ch03-u2-l2-p1",
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
                {
                  id: "f1",
                  latex: "\\frac{3}{x} = 1",
                  translation: "x 分之 3 等于 1：分母里有未知数的方程叫分式方程"
                },
                {
                  id: "f2",
                  latex: "3 = x",
                  translation: "两边同乘最简公分母 x：得到 3 等于 x"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "3/x",
                  target: 1,
                  targetLabel: "右边 = 1"
                }
              },
              auxInteraction: null,
              hints: [
                "分母里有未知数 ⟺ 分式方程；去分母：两边同乘最简公分母 x（x≠0——分母不能乘丢铁律），化成整式方程。",
                "拖动滑块找到 x=3：这就是去分母后解出来的答案，回代验算一下。"
              ],
              examples: [
                { text: "3/x=1：x=3 时左边恰好等于 1", figure: "滑块" }
              ],
              prev: "ch03-u2-l2-p2",
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
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 5,
                  step: 1,
                  label: "x",
                  expr: "x - 2",
                  target: 0,
                  targetLabel: "禁区：分母为零"
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
              prev: "ch03-u2-l3-p1",
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
                {
                  id: "f2",
                  latex: "x \\neq 1",
                  translation: "但 x 不能等于 1：约分不改变“分母不为零”的铁律"
                }
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
              examples: [
                { text: "约分前后，禁区 x=1 一直都在", figure: "滑块" }
              ],
              prev: "ch03-u2-l3-p2",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
