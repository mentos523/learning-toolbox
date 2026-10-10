/* ============================================================
 * 学习工具箱 · 数学 · 代数 第十章：极限与连续（10 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第十章 v2.0）：
 * 10.0.1 从散点到曲线 / 10.1.1 逼近思想 / 10.1.2a ε-N 语言（直观版）/
 * 10.1.2b ε-N 语言（严格版）/ 10.1.3 常见数列的极限 / 10.2.1 函数的极限 /
 * 10.2.2 极限的运算法则 / 10.2.3 函数的连续性 / 10.2.4 本章小结 /
 * 附录 B 回填：8.1.3 实数指数幂的严格定义（10.2.4 之后）。
 *
 * 页面：u0-l1-p1 散点加密：从离散到连续（10.0.1，过渡）
 *       u1-l1-p1 加一项：和在逼近 1（10.1.1，跃升 5 的"加一项"数值实验）
 *       u1-l2-p1 ε-N（直观版）：带子套点（10.1.2a）
 *       u1-l3-p1 ε-N（严格版）：任意 ε（10.1.2b，例证）
 *       u1-l4-p1 1/n 与 qⁿ：都趋向 0（10.1.3）
 *       u2-l1-p1 函数极限：x→1 时 f(x)→2（10.2.1，左右逼近）
 *       u2-l2-p1 极限法则：和可拆开算（10.2.2）
 *       u2-l3-p1 连续：一笔画不断裂（10.2.3）
 *       u2-l4-p1 本章小结：从逼近到连续（10.2.4）
 *       ub-l1-p1 回填：2^√2 的严格定义（附录 B，8.1.3 的债）
 * 交互复用已实现渲染器：plot-points（1/x 散点加密）/
 * numeric-lab（accumulate：1/2ⁿ 累加逼近 1）/
 * linked-dashboard（ε↔N 联动、x→f(x)→点三联动、2ˣ 回填）/
 * slider-lab（label 均为纯变量名，expr 只含单个变量；
 *   target 只在网格可达时设置：2b 页 n=20 时 1/n=0.05，node 已验 1/20===0.05）/
 * side-compare（仅内嵌 slider-lab，不可嵌套；sync 同名滑块联动）。
 * 绿队审计结论落实：
 *   - 每页 hints ≤ 2 条、总字数（两条 hint 字符串 JS .length 之和）≤ 70
 *   - 定义条件齐全：n=1,2,3,…（正整数）、|q|<1、x≠1（分母≠0）、
 *     商法则分母极限≠0、r_n 为有理数列
 *   - LaTeX 仅用渲染器支持子集（\lim \to \infty \epsilon \frac \sqrt
 *     \cdot \neq \approx），无 \dots、无 Unicode 省略号
 *   - 数值全部 node 实测：S_20≈0.9999990463、(1/2)^20≈9.54e-7、
 *     x=0.9/1.1 时 (x²-1)/(x-1)=1.9/2.1、2^1.414≈2.6647、2^√2≈2.6651
 * 黄队教学流：第九章小结预埋"离散逼近连续（极限）"由 10.0.1 承接；
 * 10.1.1 落实跃升 5 脚手架①"加一项"数值实验（ch09 9.2.4-p2 刻意未抢）；
 * 10.2.1 的 (x²-1)/(x-1) 在 10.2.3 被"认旧友"为不连续的反例；
 * 附录 B 回填页点题"8.1.3 的债用极限还清"，并点明连续性是担保。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch10"] = {
  id: "ch10",
  title: "极限与连续",
  units: [
    {
      id: "ch10-u0",
      title: "过渡：从离散到连续",
      lessons: [
        {
          id: "ch10-u0-l1",
          title: "从散点到曲线",
          pages: [
            {
              id: "ch10-u0-l1-p1",
              title: "散点加密：从离散到连续",
              concept: "离散加密成连续",
              formulas: [
                {
                  id: "f1",
                  latex: "a_n = \\frac{1}{n} (n = 1, 2, 3, \\cdot\\cdot\\cdot)",
                  translation: "散点：n 只能取正整数，点与点之间是断开的"
                },
                {
                  id: "f2",
                  latex: "y = \\frac{1}{x} (x > 0)",
                  translation: "x 可取任意实数：点无限加密，就连成了一条曲线"
                }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "1/x",
                  xMin: 1,
                  xMax: 20,
                  step: 0.5,
                  autoPlay: true,
                  speed: 150
                }
              },
              auxInteraction: null,
              hints: [
                "看点逐个出现：越往右越密，几乎连成一条曲线。",
                "离散→连续：点够密时，'一串点'就变成了'一条线'。"
              ],
              examples: [
                { text: "第九章的散点图：数列是定义在正整数上的函数", figure: "描点成像" }
              ],
              prev: "ch09-u2-l5-p1",
              next: "ch10-u1-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch10-u1",
      title: "数列的极限",
      lessons: [
        {
          id: "ch10-u1-l1",
          title: "逼近思想",
          pages: [
            {
              id: "ch10-u1-l1-p1",
              title: "加一项：和在逼近 1",
              concept: "逼近思想",
              formulas: [
                {
                  id: "f1",
                  latex: "S_n = \\frac{1}{2} + \\frac{1}{4} + \\cdot\\cdot\\cdot + \\frac{1}{2^n} = 1 - \\frac{1}{2^n}",
                  translation: "前 n 项和 = 1 − 1/2ⁿ：加的项越多，和离 1 越近"
                },
                {
                  id: "f2",
                  latex: "\\lim_{n \\to \\infty} S_n = 1",
                  translation: "极限记法：n 趋向无穷时 S_n 无限趋近 1——'极限'就是给这个趋势起的名字"
                }
              ],
              interaction: {
                type: "numeric-lab",
                params: {
                  mode: "accumulate",
                  term: "1/2^n",
                  maxSteps: 20,
                  buttonLabel: "加一项",
                  showTrend: true,
                  precision: 6
                }
              },
              auxInteraction: null,
              hints: [
                "每点一次'加一项'：0.5→0.75→0.875→…，永远差一点。",
                "点 20 次看 S₂₀≈0.999999：'无限接近 1'是亲手点的趋势。"
              ],
              examples: [
                { text: "芝诺悖论：阿基里斯追龟——永远差一点，但追上了", figure: "数值实验" }
              ],
              prev: "ch10-u0-l1-p1",
              next: "ch10-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch10-u1-l2",
          title: "ε-N 语言（直观版）",
          pages: [
            {
              id: "ch10-u1-l2-p1",
              title: "ε-N（直观版）：带子套点",
              concept: "ε-N 直观",
              formulas: [
                {
                  id: "f1",
                  latex: "|a_n - 0| < \\epsilon (n > N)",
                  translation: "带子说法：从第 N 项起，所有点都落进半宽 ε 的带子"
                },
                {
                  id: "f2",
                  latex: "N = \\frac{1}{\\epsilon}",
                  translation: "对 a_n=1/n：取 N=1/ε 就够了——带子越窄，N 越大"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "e",
                    min: 0.05,
                    max: 0.5,
                    step: 0.05,
                    initial: 0.2
                  },
                  views: [
                    { kind: "readout", expr: "1/e", label: "N≈1/ε" },
                    { kind: "point", xExpr: "1/e", yExpr: "e", axisLabelX: "N", axisLabelY: "ε" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖滑块 e（就是 ε）：带子收窄，N=1/ε 变大。",
                "右图：ε 越小 N 越大——窄带子要更大的序号来套住。"
              ],
              examples: [
                { text: "a_n=1/n：点越往后离 0 越近，窄带子要等更靠后的项", figure: "联动仪表盘" }
              ],
              prev: "ch10-u1-l1-p1",
              next: "ch10-u1-l3-p1"
            }
          ]
        },
        {
          id: "ch10-u1-l3",
          title: "ε-N 语言（严格版）",
          pages: [
            {
              id: "ch10-u1-l3-p1",
              title: "ε-N（严格版）：任意 ε",
              concept: "ε-N 定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\lim_{n \\to \\infty} a_n = A",
                  translation: "极限的记法：n 趋向无穷大时，a_n 趋向 A"
                },
                {
                  id: "f2",
                  latex: "|\\frac{1}{n} - 0| < 0.05 (n > 20)",
                  translation: "ε=0.05 的例证：n>20 时所有项与 0 的距离都小于 0.05"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 100,
                  step: 1,
                  label: "n",
                  expr: "1/n",
                  target: 0.05,
                  targetLabel: "ε=0.05：N=20（n>20 全进带子）"
                }
              },
              auxInteraction: null,
              hints: [
                "拖到 n=20 咔哒：往后所有项全落进 ε=0.05 的带子。",
                "ε 越窄、N 越大——回上一页拖滑块 e，体验'任意 ε'。"
              ],
              examples: [
                { text: "极限的承诺：带子任意窄，我都找得到 N 来套住", figure: "滑块" }
              ],
              prev: "ch10-u1-l2-p1",
              next: "ch10-u1-l4-p1"
            }
          ]
        },
        {
          id: "ch10-u1-l4",
          title: "常见数列的极限",
          pages: [
            {
              id: "ch10-u1-l4-p1",
              title: "1/n 与 qⁿ：都趋向 0",
              concept: "常见数列极限",
              formulas: [
                {
                  id: "f1",
                  latex: "\\lim_{n \\to \\infty} \\frac{1}{n} = 0",
                  translation: "1/n 的极限是 0：分母越大，分数越小"
                },
                {
                  id: "f2",
                  latex: "\\lim_{n \\to \\infty} q^n = 0 (|q| < 1)",
                  translation: "qⁿ 的极限是 0（|q|<1）：每次乘 q，越乘越小"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: 1, max: 20, step: 1, label: "n", expr: "1/n" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: 1, max: 20, step: 1, label: "n", expr: "(1/2)^n" }
                  },
                  sync: ["n"],
                  labels: ["1/n → 0：慢速趋近", "(1/2)ⁿ → 0：快速趋近"]
                }
              },
              auxInteraction: null,
              hints: [
                "拖一边另一边同步：两列都→0，但 (1/2)ⁿ 快得多。",
                "|q|<1 是条件：q=1 时恒为 1，q=−1 时来回跳，都不→0。"
              ],
              examples: [
                { text: "两种'变小'：1/n 是爬楼梯式，(1/2)ⁿ 是跳水式", figure: "并排对比" }
              ],
              prev: "ch10-u1-l3-p1",
              next: "ch10-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch10-u2",
      title: "函数的极限与连续",
      lessons: [
        {
          id: "ch10-u2-l1",
          title: "函数的极限",
          pages: [
            {
              id: "ch10-u2-l1-p1",
              title: "函数极限：x→1 时 f(x)→2",
              concept: "函数的极限",
              formulas: [
                {
                  id: "f1",
                  latex: "\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1} = 2",
                  translation: "x 趋向 1（但 x≠1）时函数值趋向 2——从左从右拖过去看"
                },
                {
                  id: "f2",
                  latex: "\\lim_{x \\to \\infty} \\frac{1}{x} = 0",
                  translation: "x 趋向无穷大时 1/x 趋向 0：数列 1/n→0 的连续版"
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
                    initial: -2
                  },
                  views: [
                    { kind: "readout", expr: "(x^2-1)/(x-1)", label: "f(x)" },
                    { kind: "point", xExpr: "x", yExpr: "(x^2-1)/(x-1)", axisLabelX: "x", axisLabelY: "y" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "从左（x<1）和从右（x>1）拖向 1：f(x) 都→2。",
                "x=1 处分母为 0、无定义——但极限照样是 2，不看'那一点'。"
              ],
              examples: [
                { text: "约分：(x²−1)/(x−1)=x+1（x≠1）——极限看的是趋势", figure: "联动仪表盘" }
              ],
              prev: "ch10-u1-l4-p1",
              next: "ch10-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch10-u2-l2",
          title: "极限的运算法则",
          pages: [
            {
              id: "ch10-u2-l2-p1",
              title: "极限法则：和可拆开算",
              concept: "极限的四则运算",
              formulas: [
                {
                  id: "f1",
                  latex: "\\lim_{n \\to \\infty} (a_n + b_n) = \\lim_{n \\to \\infty} a_n + \\lim_{n \\to \\infty} b_n",
                  translation: "和的极限 = 极限的和：差、积、商也一样（商要求分母极限≠0）"
                },
                {
                  id: "f2",
                  latex: "\\lim_{n \\to \\infty} (1 + \\frac{1}{n}) = 1 + 0 = 1",
                  translation: "右栏 = 左栏 +1：极限 1+0=1——拆开算，结果一样"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: 1, max: 30, step: 1, label: "n", expr: "1/n" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: 1, max: 30, step: 1, label: "n", expr: "1+1/n" }
                  },
                  sync: ["n"],
                  labels: ["a_n = 1/n → 0", "a_n + 1 → 0 + 1 = 1"]
                }
              },
              auxInteraction: null,
              hints: [
                "两栏同步拖：左→0，右→1——右栏永远比左栏大 1。",
                "法则就是'拆开算'：先各求极限，再加减乘除。"
              ],
              examples: [
                { text: "分装：lim(2/n+3)=2·lim(1/n)+3=3", figure: "并排对比" }
              ],
              prev: "ch10-u2-l1-p1",
              next: "ch10-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch10-u2-l3",
          title: "函数的连续性",
          pages: [
            {
              id: "ch10-u2-l3-p1",
              title: "连续：一笔画不断裂",
              concept: "函数的连续性",
              formulas: [
                {
                  id: "f1",
                  latex: "\\lim_{x \\to x_0} f(x) = f(x_0)",
                  translation: "连续的定义：在 x₀ 连续 ⟺ 极限值等于函数值——'对得上'"
                },
                {
                  id: "f2",
                  latex: "\\lim_{x \\to 1} x^2 = 1 = f(1)",
                  translation: "y=x² 在 x=1：极限 1 = 函数值 1——对上了，所以连续"
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
                    initial: -2
                  },
                  views: [
                    { kind: "readout", expr: "x^2", label: "f(x)" },
                    { kind: "point", xExpr: "x", yExpr: "x^2", axisLabelX: "x", axisLabelY: "y" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "从左一路拖到右：点始终连着走，没有'跳'——一笔画。",
                "上一页的函数在 x=1 没定义：极限 2 对不上函数值，不连续。"
              ],
              examples: [
                { text: "认旧友：上一页 (x²−1)/(x−1) 的'断点'就是不连续", figure: "联动仪表盘" }
              ],
              prev: "ch10-u2-l2-p1",
              next: "ch10-u2-l4-p1"
            }
          ]
        },
        {
          id: "ch10-u2-l4",
          title: "本章小结",
          pages: [
            {
              id: "ch10-u2-l4-p1",
              title: "本章小结：从逼近到连续",
              concept: "本章知识串联",
              formulas: [
                {
                  id: "f1",
                  latex: "\\lim_{n \\to \\infty} a_n = A",
                  translation: "数列的极限：离散点的趋近——ε-N 语言是它的严格说法"
                },
                {
                  id: "f2",
                  latex: "\\lim_{x \\to x_0} f(x) = f(x_0)",
                  translation: "连续：极限值 = 函数值——下一站：导数（变化率的极限）"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: 1, max: 20, step: 1, label: "n", expr: "1/n" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: -2, max: 2, step: 0.1, label: "x", expr: "x^2" }
                  },
                  labels: ["数列极限：1/n → 0（离散）", "连续：一笔画 y=x²"]
                }
              },
              auxInteraction: null,
              hints: [
                "本章路线：逼近 → ε-N → 数列极限 → 函数极限 → 连续。",
                "附录 B：8.1.3 欠的 2^√2 严格定义，下一页用极限来还。"
              ],
              examples: [
                { text: "一图流：左栏离散逼近，右栏连续不断——极限是同一思想", figure: "并排对比" }
              ],
              prev: "ch10-u2-l3-p1",
              next: "ch10-ub-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch10-ub",
      title: "附录 B：回填 8.1.3",
      lessons: [
        {
          id: "ch10-ub-l1",
          title: "实数指数幂的严格定义",
          pages: [
            {
              id: "ch10-ub-l1-p1",
              title: "回填：2^√2 的严格定义",
              concept: "实数指数幂的严格定义",
              formulas: [
                {
                  id: "f1",
                  latex: "2^{\\sqrt{2}} = \\lim_{n \\to \\infty} 2^{r_n} (r_n \\to \\sqrt{2})",
                  translation: "严格定义：取有理数列 r_n→√2（如 1.4, 1.41, 1.414, …），2^√2 就是 2^{r_n} 的极限"
                },
                {
                  id: "f2",
                  latex: "2^{1.414} \\approx 2.665",
                  translation: "数值：滑到 x=1.414，2^x≈2.665——指数函数连续，所以极限存在"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "x",
                    min: 1.4,
                    max: 1.42,
                    step: 0.001,
                    initial: 1.4
                  },
                  views: [
                    { kind: "readout", expr: "2^x", label: "2^x" },
                    { kind: "point", xExpr: "x", yExpr: "2^x", axisLabelX: "x", axisLabelY: "y" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "8.1.3 的债：无理数指数当时只给直观，现在用极限还清。",
                "关键：y=2ˣ 的图像不断裂——r_n→√2 时 2^{r_n} 必有极限。"
              ],
              examples: [
                { text: "r_n=1.4, 1.41, 1.414, 1.4142, …：√2 的不足近似值数列", figure: "联动仪表盘" }
              ],
              prev: "ch10-u2-l4-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
