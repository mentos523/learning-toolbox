/* ============================================================
 * 学习工具箱 · 数学 · 代数 第十章：极限与连续（20 页）
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
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
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
                { id: "f2", latex: "y = \\frac{1}{x} (x > 0)", translation: "x 可取任意实数：点无限加密，就连成了一条曲线" }
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
              next: "ch10-u0-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：离散与连续",
              examples: [
                { figure: "生活实例", text: "票房按天统计是离散的；水温连续变化是连续的。" }
              ],
              formulas: [
                { id: "f1", latex: "n = 1, 2, 3", translation: "数列：n 只能取正整数，点与点断开" },
                { id: "f2", latex: "x = 1, 1.5, 1.55", translation: "函数：x 可取任意实数，点无限加密成线" }
              ],
              hints: [ "离散=一个个孤立的点；连续=点密到连成线。", "数列是函数的“抽样”：只在整数点取值。" ],
              id: "ch10-u0-l1-p1b",
              interaction: {
                params: {
                  autoPlay: true,
                  fn: "1/x",
                  speed: 150,
                  step: 0.5,
                  xMax: 20,
                  xMin: 1
                },
                type: "plot-points"
              },
              title: "离散 vs 连续：点密成线",
              prev: "ch10-u0-l1-p1",
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
              prev: "ch10-u0-l1-p1b",
              next: "ch10-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：逼近思想",
              examples: [
                { figure: "生活实例", text: "0.999…=1：0.9,0.99,0.999,…无限逼近 1。" }
              ],
              formulas: [
                { id: "f1", latex: "S_3 = \\frac{7}{8}", translation: "加 3 项：1/2+1/4+1/8=7/8" },
                { id: "f2", latex: "S_{10} = 1 - \\frac{1}{1024}", translation: "加 10 项：差 1/1024" },
                { id: "f3", latex: "\\lim_{n \\to \\infty} S_n = 1", translation: "项数越多离 1 越近：极限是 1" }
              ],
              hints: [
                "“无限接近”不是“等于”：Sₙ 永远 <1，但可以任意接近 1。",
                "极限描述的是趋势：n 越大，Sₙ 离 1 越近。"
              ],
              id: "ch10-u1-l1-p1b",
              interaction: {
                params: {
                  buttonLabel: "加一项",
                  maxSteps: 20,
                  mode: "accumulate",
                  precision: 6,
                  showTrend: true,
                  term: "1/2^n"
                },
                type: "numeric-lab"
              },
              title: "逼近：永远差一点",
              prev: "ch10-u1-l1-p1",
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
                    {
                      kind: "point",
                      xExpr: "1/e",
                      yExpr: "e",
                      axisLabelX: "N",
                      axisLabelY: "ε"
                    }
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
              prev: "ch10-u1-l1-p1b",
              next: "ch10-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：ε-N 直观",
              examples: [
                { figure: "变式练习", text: "aₙ=1/n²：ε=0.01 时 N=10（1/100<0.01）。" }
              ],
              formulas: [
                { id: "f1", latex: "\\epsilon = 0.1", translation: "带子半宽 0.1：(−0.1, 0.1)" },
                { id: "f2", latex: "N = 10", translation: "n>10 时，1/n<0.1：全落进带子" }
              ],
              hints: [
                "ε 是带子宽度（你定），N 是序号门槛（我找）：带子越窄，N 越大。",
                "极限的承诺：无论带子多窄，总找得到 N 套住后面的所有点。"
              ],
              id: "ch10-u1-l2-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 0.2,
                    label: "e",
                    max: 0.5,
                    min: 0.05,
                    step: 0.05
                  },
                  views: [
                    { expr: "1/e", kind: "readout", label: "N≈1/ε" },
                    {
                      axisLabelX: "N",
                      axisLabelY: "ε",
                      kind: "point",
                      xExpr: "1/e",
                      yExpr: "e"
                    }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "ε-N：带子套点的游戏",
              prev: "ch10-u1-l2-p1",
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
              prev: "ch10-u1-l2-p1b",
              next: "ch10-u1-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：ε-N 严格定义",
              examples: [
                {
                  figure: "变式练习",
                  text: "证 1/(2n)→0：1/(2n)<ε 得 n>1/(2ε)，取 N 为大于 1/(2ε) 的整数。"
                }
              ],
              formulas: [
                { id: "f1", latex: "\\lim_{n \\to \\infty} \\frac{1}{n^2} = 0", translation: "例：1/n²→0" },
                {
                  id: "f2",
                  latex: "\\frac{1}{n^2} < \\epsilon \\to n > \\frac{1}{\\sqrt{\\epsilon}}",
                  translation: "解出 N：n>1/√ε 时成立"
                }
              ],
              hints: [
                "严格版=把“带子套点”写成数学：∀ε>0，∃N，n>N 时 |aₙ−A|<ε。",
                "做题套路：从 |aₙ−A|<ε 反解出 n>…，那个“…”就是 N。"
              ],
              id: "ch10-u1-l3-p1b",
              interaction: {
                params: {
                  expr: "1/n^2",
                  label: "n",
                  max: 100,
                  min: 1,
                  step: 1,
                  target: 0.01,
                  targetLabel: "ε=0.01：N=10"
                },
                type: "slider-lab"
              },
              title: "严格定义：∀ε∃N",
              prev: "ch10-u1-l3-p1",
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
                    params: {
                      min: 1,
                      max: 20,
                      step: 1,
                      label: "n",
                      expr: "1/n"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: 1,
                      max: 20,
                      step: 1,
                      label: "n",
                      expr: "(1/2)^n"
                    }
                  },
                  sync: [ "n" ],
                  labels: [ "1/n → 0：慢速趋近", "(1/2)ⁿ → 0：快速趋近" ]
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
              prev: "ch10-u1-l3-p1b",
              next: "ch10-u1-l4-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：常见数列极限",
              examples: [
                { figure: "变式练习", text: "(0.99)¹⁰⁰≈0.366：0.99ⁿ→0，只是慢。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "\\lim_{n \\to \\infty} \\frac{1}{n^k} = 0 (k > 0)",
                  translation: "1/nᵏ→0：k>0"
                },
                {
                  id: "f2",
                  latex: "\\lim_{n \\to \\infty} (\\frac{2}{3})^n = 0",
                  translation: "(2/3)ⁿ→0：底数绝对值 <1"
                },
                {
                  id: "f3",
                  latex: "\\lim_{n \\to \\infty} (\\frac{3}{2})^n = \\infty",
                  translation: "(3/2)ⁿ→∞：底数 >1，爆炸"
                }
              ],
              hints: [
                "三个必记：1/nᵏ→0（k>0），qⁿ→0（|q|<1），qⁿ→∞（q>1）。",
                "|q|=1 是分界：q=1 恒为 1，q=−1 来回跳，都不收敛。"
              ],
              id: "ch10-u1-l4-p1b",
              interaction: {
                params: {
                  labels: [ "1/n → 0", "(1/2)ⁿ → 0" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "1/n",
                      label: "n",
                      max: 20,
                      min: 1,
                      step: 1
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "(1/2)^n",
                      label: "n",
                      max: 20,
                      min: 1,
                      step: 1
                    }
                  },
                  sync: [ "n" ]
                },
                type: "side-compare"
              },
              title: "常见极限：记住三个",
              prev: "ch10-u1-l4-p1",
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
                    {
                      kind: "point",
                      xExpr: "x",
                      yExpr: "(x^2-1)/(x-1)",
                      axisLabelX: "x",
                      axisLabelY: "y"
                    }
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
              prev: "ch10-u1-l4-p1b",
              next: "ch10-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：函数的极限",
              examples: [
                { figure: "变式练习", text: "lim(x→3)(x²)=9：连续函数直接代入。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "\\lim_{x \\to 2} (3x - 1) = 5",
                  translation: "x→2 时 3x−1→5：代入就行（连续函数）"
                },
                {
                  id: "f2",
                  latex: "\\lim_{x \\to 0} \\frac{1}{x}",
                  translation: "x→0 时 1/x：左→−∞，右→+∞，极限不存在"
                }
              ],
              hints: [
                "函数极限看趋势：x 逼近 x₀ 时 f(x) 逼近谁。",
                "左右极限都要看：左≠右则极限不存在（如 1/x 在 0 处）。"
              ],
              id: "ch10-u2-l1-p1b",
              interaction: {
                params: {
                  source: {
                    initial: -2,
                    label: "x",
                    max: 2,
                    min: -2,
                    step: 0.1
                  },
                  views: [
                    { expr: "(x^2-1)/(x-1)", kind: "readout", label: "f(x)" },
                    {
                      axisLabelX: "x",
                      axisLabelY: "y",
                      kind: "point",
                      xExpr: "x",
                      yExpr: "(x^2-1)/(x-1)"
                    }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "函数极限：左右夹击",
              prev: "ch10-u2-l1-p1",
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
                    params: {
                      min: 1,
                      max: 30,
                      step: 1,
                      label: "n",
                      expr: "1/n"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: 1,
                      max: 30,
                      step: 1,
                      label: "n",
                      expr: "1+1/n"
                    }
                  },
                  sync: [ "n" ],
                  labels: [ "a_n = 1/n → 0", "a_n + 1 → 0 + 1 = 1" ]
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
              prev: "ch10-u2-l1-p1b",
              next: "ch10-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：极限的运算法则",
              examples: [
                { figure: "变式练习", text: "lim(3n²+1)/(2n²)=3/2：分子分母同除 n²。" }
              ],
              formulas: [
                { id: "f1", latex: "\\lim_{n \\to \\infty} \\frac{2n + 1}{n}", translation: "分子分母同除以 n" },
                {
                  id: "f2",
                  latex: "= \\lim_{n \\to \\infty} (2 + \\frac{1}{n}) = 2",
                  translation: "=2+0=2：拆开算"
                }
              ],
              hints: [ "法则=拆开算：和差积商的极限=极限的和差积商。", "商法则红线：分母的极限不能是 0。" ],
              id: "ch10-u2-l2-p1b",
              interaction: {
                params: {
                  labels: [ "1/n → 0", "(2n+1)/n → 2" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "1/n",
                      label: "n",
                      max: 30,
                      min: 1,
                      step: 1
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "(2*n+1)/n",
                      label: "n",
                      max: 30,
                      min: 1,
                      step: 1
                    }
                  },
                  sync: [ "n" ]
                },
                type: "side-compare"
              },
              title: "极限法则：拆开算",
              prev: "ch10-u2-l2-p1",
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
                    {
                      kind: "point",
                      xExpr: "x",
                      yExpr: "x^2",
                      axisLabelX: "x",
                      axisLabelY: "y"
                    }
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
              prev: "ch10-u2-l2-p1b",
              next: "ch10-u2-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：函数的连续性",
              examples: [
                { figure: "变式练习", text: "y=1/x 在 x=0：没定义，不连续；且是断成两截的那种。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "f(x) = \\frac{x^2 - 1}{x - 1} (x \\neq 1)",
                  translation: "x=1 处没定义：断点"
                },
                { id: "f2", latex: "\\lim_{x \\to 1} f(x) = 2", translation: "极限是 2，但 f(1) 不存在：对不上，不连续" },
                { id: "f3", latex: "g(1) = 2", translation: "定义 g(1)=2：把断点补上，就连续了" }
              ],
              hints: [
                "连续=三对上：f(x₀) 有定义、极限存在、两者相等。",
                "可去断点：补上那一点就连续——如 (x²−1)/(x−1) 补 f(1)=2。"
              ],
              id: "ch10-u2-l3-p1b",
              interaction: {
                params: {
                  source: {
                    initial: -2,
                    label: "x",
                    max: 2,
                    min: -2,
                    step: 0.1
                  },
                  views: [
                    { expr: "x^2", kind: "readout", label: "f(x)" },
                    {
                      axisLabelX: "x",
                      axisLabelY: "y",
                      kind: "point",
                      xExpr: "x",
                      yExpr: "x^2"
                    }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "连续：极限对上函数值",
              prev: "ch10-u2-l3-p1",
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
                    params: {
                      min: 1,
                      max: 20,
                      step: 1,
                      label: "n",
                      expr: "1/n"
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
                  labels: [ "数列极限：1/n → 0（离散）", "连续：一笔画 y=x²" ]
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
              prev: "ch10-u2-l3-p1b",
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
                    {
                      kind: "point",
                      xExpr: "x",
                      yExpr: "2^x",
                      axisLabelX: "x",
                      axisLabelY: "y"
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "8.1.3 的债：无理数指数当时只给直观，现在用极限还清。",
                "关键：y=2ˣ 的图像不断裂——r_n→√2 时 2^{r_n} 必有极限。"
              ],
              examples: [
                {
                  text: "r_n=1.4, 1.41, 1.414, 1.4142, …：√2 的不足近似值数列",
                  figure: "联动仪表盘"
                }
              ],
              prev: "ch10-u2-l4-p1",
              next: "ch10-ub-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：实数指数幂的严格定义",
              examples: [
                { figure: "变式练习", text: "3^π=lim 3^{rₙ}（rₙ→π）：同样的还债方式。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "r_n = 1.4, 1.41, 1.414, \\cdot\\cdot\\cdot",
                  translation: "rₙ→√2：有理数列逼近 √2"
                },
                { id: "f2", latex: "2^{r_n} \\to 2^{\\sqrt{2}}", translation: "指数函数连续：2^{rₙ}→2^√2" }
              ],
              hints: [
                "8.1.3 欠的债：当时只说“直观上有值”，现在用极限严格定义。",
                "担保人是连续性：y=2ˣ 不断裂，rₙ→√2 时 2^{rₙ} 必收敛。"
              ],
              id: "ch10-ub-l1-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 1.4,
                    label: "x",
                    max: 1.42,
                    min: 1.4,
                    step: 0.001
                  },
                  views: [
                    { expr: "2^x", kind: "readout", label: "2^x" },
                    {
                      axisLabelX: "x",
                      axisLabelY: "y",
                      kind: "point",
                      xExpr: "x",
                      yExpr: "2^x"
                    }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "回填：有理数逼近无理数",
              prev: "ch10-ub-l1-p1",
              next: "ch10-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch10-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch10-ux-l1",
          title: "第十章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．0；2．0；3．1；4．5；5．不连续（x=2 没定义）；6．∀ε>0，∃N，n>N 时 |aₙ−A|<ε"
                }
              ],
              formulas: [
                { id: "f1", latex: "S_n = 1 - \\frac{1}{2^n}", translation: "第 3 题：Sₙ=1−1/2ⁿ→1" }
              ],
              hints: [
                "1．lim(n→∞) 3/n=____。",
                "2．lim(n→∞) (1/3)ⁿ=____。",
                "3．Sₙ=1/2+1/4+…+1/2ⁿ，则 lim Sₙ=____。",
                "4．lim(x→2)(x²+1)=____。",
                "5．f(x)=(x²−4)/(x−2)，f 在 x=2 处____（连续/不连续）。",
                "6．用 ε-N 语言叙述 lim(n→∞)aₙ=A 的定义。"
              ],
              id: "ch10-ux-l1-p1",
              interaction: {
                params: {
                  buttonLabel: "加一项",
                  maxSteps: 20,
                  mode: "accumulate",
                  showTrend: true,
                  term: "1/2^n"
                },
                type: "numeric-lab"
              },
              title: "第十章习题：极限连续",
              prev: "ch10-ub-l1-p1b",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
