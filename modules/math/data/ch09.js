/* ============================================================
 * 学习工具箱 · 数学 · 代数 第九章：数列（10 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第九章 v2.0）：
 * 9.1.1 数列的定义 / 9.1.2 数列的表示 / 9.2.1 等差数列 /
 * 9.2.2 等差数列求和 / 9.2.3 等比数列 / 9.2.4 等比数列求和 /
 * 9.2.5 本章小结。
 *
 * 页面：u1-l1-p1 数列：一组排好顺序的数（9.1.1）
 *       u1-l2-p1 通项公式：用 n 写出第 n 项（9.1.2）
 *       u1-l2-p2 递推公式：前一项推出后一项（9.1.2）
 *       u2-l1-p1 等差数列：每次加同一个数（9.2.1）
 *       u2-l1-p2 公差的威力：拖 d 看第 10 项（9.2.1）
 *       u2-l2-p1 高斯配对：等差数列求和（9.2.2）
 *       u2-l3-p1 等比数列：每次乘同一个数（9.2.3）
 *       u2-l4-p1 错位相减：等比数列求和（9.2.4）
 *       u2-l4-p2 棋盘麦粒：指数爆炸的故事（9.2.4）
 *       u2-l5-p1 本章小结：离散的函数（9.2.5）
 * 交互复用已实现渲染器：plot-points（step=1 画散点列）/
 * linked-dashboard（n→a_n 联动，point 视图 axisLabelX/axisLabelY）/
 * slider-lab（label 均为纯变量名，expr 只含单个变量，target 只在
 * 网格可达时设置）/ numeric-lab（accumulate 累加麦粒）/
 * side-compare（仅内嵌 slider-lab，不可嵌套）。
 * 绿队审计结论落实：
 *   - 每页 hints ≤ 2 条、总字数（两条 hint 字符串 JS .length 之和）≤ 70
 *   - 定义条件齐全：n=1,2,3,…（正整数）、q≠0、q≠1、分母≠0
 *   - LaTeX 标准写法：\\log_2 32（无括号上下标只接一个 token）
 *   - 数值全部 node 实测：n=7 时奇数和 49、高斯和 55(n=10)、
 *     等比和 127(n=7)、2^63=9223372036854775808≈9.2×10^18、
 *     2^64-1≈1.8×10^19、S_100=5050
 * 黄队教学流：数列是定义在正整数上的函数（散点即画像）；
 * 例子取自 pedagogy 例子库（楼梯台阶、存款递增、斐波那契兔子、
 * 传谣言、高斯轶事、棋盘麦粒传说）；
 * 跃升 5 的"加一项"数值实验留给第十章，本章 9.2.4-p2 只做
 * 2^(n-1) 累加（指数爆炸），不抢 1/2+1/4+… 的极限伏笔。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch09"] = {
  id: "ch09",
  title: "数列",
  units: [
    {
      id: "ch09-u1",
      title: "数列的概念",
      lessons: [
        {
          id: "ch09-u1-l1",
          title: "数列的定义",
          pages: [
            {
              id: "ch09-u1-l1-p1",
              title: "数列：一组排好顺序的数",
              concept: "项",
              formulas: [
                {
                  id: "f1",
                  latex: "a_n = 1 + \\frac{1}{n} (n = 1, 2, 3, \\cdot\\cdot\\cdot)",
                  translation: "第 n 项 a_n 等于 1 加 1/n：n 从 1 开始取正整数，得到一串排好顺序的数"
                },
                {
                  id: "f2",
                  latex: "a_1 = 2, a_2 = \\frac{3}{2}, a_3 = \\frac{4}{3}, \\cdot\\cdot\\cdot",
                  translation: "前三项：2、3/2、4/3——每一项都有自己的序号，顺序不能乱"
                }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "1+1/x",
                  xMin: 1,
                  xMax: 15,
                  step: 1,
                  autoPlay: true,
                  speed: 500
                }
              },
              auxInteraction: null,
              hints: [
                "每一项都有序号：a₁ 是第 1 项，a₂ 是第 2 项——顺序不能乱。",
                "数列是定义在正整数上的函数：散点图就是它的画像。"
              ],
              examples: [
                { text: "楼梯台阶数：1, 2, 3, …——天然排好顺序", figure: "描点成像" }
              ],
              prev: "ch08-u3-l3-p1",
              next: "ch09-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch09-u1-l2",
          title: "数列的表示",
          pages: [
            {
              id: "ch09-u1-l2-p1",
              title: "通项公式：用 n 写出第 n 项",
              concept: "通项公式",
              formulas: [
                {
                  id: "f1",
                  latex: "a_n = 2n + 1 (n = 1, 2, 3, \\cdot\\cdot\\cdot)",
                  translation: "第 n 项等于 2n+1：代入 n=1 得 a₁=3，n=2 得 a₂=5，想算哪项代 n 就行"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "n",
                    min: 1,
                    max: 20,
                    step: 1,
                    initial: 1
                  },
                  views: [
                    { kind: "readout", expr: "2*n+1", label: "a_n" },
                    { kind: "point", xExpr: "n", yExpr: "2*n+1", axisLabelX: "n", axisLabelY: "a_n" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖 n 看 a_n 同步变：通项公式是项的计算器。",
                "注意 n 只能取正整数：散点之间是断开的。"
              ],
              examples: [
                { text: "存款每月递增：a_n = 100 + 10n（第 n 个月的存款）", figure: "联动仪表盘" }
              ],
              prev: "ch09-u1-l1-p1",
              next: "ch09-u1-l2-p2"
            },
            {
              id: "ch09-u1-l2-p2",
              title: "递推公式：前一项推出后一项",
              concept: "递推公式",
              formulas: [
                {
                  id: "f1",
                  latex: "a_1 = 1, a_n = a_{n-1} + 3 (n \\geq 2)",
                  translation: "首项是 1，每一项比前一项多 3：1, 4, 7, 10, …——前推后"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 10,
                  step: 1,
                  label: "n",
                  expr: "3*n-2",
                  target: 28,
                  targetLabel: "a₁₀=28"
                }
              },
              auxInteraction: null,
              hints: [
                "递推要两件东西：首项 a₁，和'后项=前项+3'的规则。",
                "拖到 n=10 咔哒：a₁₀=28——递推算出的和公式算的一样。"
              ],
              examples: [
                { text: "斐波那契：后一项是前两项之和（兔子数列）", figure: "滑块" }
              ],
              prev: "ch09-u1-l2-p1",
              next: "ch09-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch09-u2",
      title: "等差与等比数列",
      lessons: [
        {
          id: "ch09-u2-l1",
          title: "等差数列",
          pages: [
            {
              id: "ch09-u2-l1-p1",
              title: "等差数列：每次加同一个数",
              concept: "等差数列",
              formulas: [
                {
                  id: "f1",
                  latex: "a_n = a_1 + (n-1)d",
                  translation: "第 n 项 = 首项 + (n−1)×公差：公差 d 是每次加的同一个数"
                },
                {
                  id: "f2",
                  latex: "d = a_{n+1} - a_n",
                  translation: "公差 = 后一项减前一项：任意相邻两项的差都相等"
                }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "2*x+3",
                  xMin: 1,
                  xMax: 12,
                  step: 1,
                  autoPlay: true,
                  speed: 500
                }
              },
              auxInteraction: null,
              hints: [
                "看散点：所有点都落在一条直线上——等差数列是离散的一次函数。",
                "公差 d 就是直线的斜率：d=2，点列每步爬高 2。"
              ],
              examples: [
                { text: "楼梯：每级高 18 厘米，台阶高度成等差数列", figure: "描点成像" }
              ],
              prev: "ch09-u1-l2-p2",
              next: "ch09-u2-l1-p2"
            },
            {
              id: "ch09-u2-l1-p2",
              title: "公差的威力：拖 d 看第 10 项",
              concept: "公差决定变化快慢",
              formulas: [
                {
                  id: "f1",
                  latex: "a_{10} = a_1 + 9d",
                  translation: "第 10 项 = 首项 + 9×公差：从 a₁ 走到 a₁₀，一共加了 9 次公差"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -3,
                  max: 3,
                  step: 0.5,
                  label: "d",
                  expr: "2+9*d",
                  target: 20,
                  targetLabel: "目标 20（d=2）"
                }
              },
              auxInteraction: null,
              hints: [
                "公差每加 0.5，a₁₀ 就加 4.5：9 次累积，威力放大 9 倍。",
                "d 为负也行：数列往下走，公差是每步的变化量。"
              ],
              examples: [
                { text: "打车计价：起步价 + 每公里单价×公里数", figure: "滑块" }
              ],
              prev: "ch09-u2-l1-p1",
              next: "ch09-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch09-u2-l2",
          title: "等差数列求和",
          pages: [
            {
              id: "ch09-u2-l2-p1",
              title: "高斯配对：等差数列求和",
              concept: "等差数列求和",
              formulas: [
                {
                  id: "f1",
                  latex: "S_n = \\frac{n(a_1 + a_n)}{2}",
                  translation: "前 n 项和 = n×(首项+末项)÷2：首尾配对，每对的和都相等"
                },
                {
                  id: "f2",
                  latex: "S_{100} = \\frac{100 \\times 101}{2} = 5050",
                  translation: "高斯算法：1 到 100 配成 50 对，每对 101，总和 5050"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 20,
                  step: 1,
                  label: "n",
                  expr: "n*(n+1)/2",
                  target: 55,
                  targetLabel: "S₁₀=55"
                }
              },
              auxInteraction: null,
              hints: [
                "首尾配对：1+100=101，2+99=101……共 50 对。",
                "配对法的简写：约 n/2 对，每对 (a₁+aₙ)；n 为奇数时中间项单留。"
              ],
              examples: [
                { text: "高斯 10 岁：老师刚写完 1+2+…+100，他报出 5050", figure: "滑块" }
              ],
              prev: "ch09-u2-l1-p2",
              next: "ch09-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch09-u2-l3",
          title: "等比数列",
          pages: [
            {
              id: "ch09-u2-l3-p1",
              title: "等比数列：每次乘同一个数",
              concept: "等比数列",
              formulas: [
                {
                  id: "f1",
                  latex: "a_n = a_1 q^{n-1} (q \\neq 0)",
                  translation: "第 n 项 = 首项×公比的 n−1 次方：公比 q 是每次乘的数（q 不为 0）"
                },
                {
                  id: "f2",
                  latex: "q = \\frac{a_{n+1}}{a_n}",
                  translation: "公比 = 后一项除以前一项：任意相邻两项的比都相等"
                }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "2^(x-1)",
                  xMin: 1,
                  xMax: 10,
                  step: 1,
                  autoPlay: true,
                  speed: 500
                }
              },
              auxInteraction: null,
              hints: [
                "看散点：点落在一条指数曲线上——等比数列是离散的指数函数。",
                "公比 2：每步翻一番，越往后涨得越快。"
              ],
              examples: [
                { text: "传谣言：每人告诉 2 人，知情人数 1, 2, 4, 8, …", figure: "描点成像" }
              ],
              prev: "ch09-u2-l2-p1",
              next: "ch09-u2-l4-p1"
            }
          ]
        },
        {
          id: "ch09-u2-l4",
          title: "等比数列求和",
          pages: [
            {
              id: "ch09-u2-l4-p1",
              title: "错位相减：等比数列求和",
              concept: "等比数列求和",
              formulas: [
                {
                  id: "f1",
                  latex: "S_n = \\frac{a_1(1 - q^n)}{1 - q} (q \\neq 1)",
                  translation: "前 n 项和 = a₁×(1−qⁿ)÷(1−q)：q≠1 时成立，分母不能为 0"
                },
                {
                  id: "f2",
                  latex: "S_7 = 2^7 - 1 = 127",
                  translation: "验算：1+2+4+…+64，拖到 n=7，S₇=127，恰好 2⁷−1"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 12,
                  step: 1,
                  label: "n",
                  expr: "2^n-1",
                  target: 127,
                  targetLabel: "S₇=127"
                }
              },
              auxInteraction: null,
              hints: [
                "错位相减：Sₙ 乘以 q 再相减，中间项全消掉，只剩首尾。",
                "q=1 是特例：每项都是 a₁，Sₙ=n×a₁。"
              ],
              examples: [
                { text: "1+2+4+…+2ⁿ⁻¹：翻一番的累积有多快", figure: "滑块" }
              ],
              prev: "ch09-u2-l3-p1",
              next: "ch09-u2-l4-p2"
            },
            {
              id: "ch09-u2-l4-p2",
              title: "棋盘麦粒：指数爆炸的故事",
              concept: "指数增长的威力",
              formulas: [
                {
                  id: "f1",
                  latex: "S_{64} = 2^{64} - 1",
                  translation: "64 格麦粒总和 = 2⁶⁴−1，约 1.8×10¹⁹ 粒——天文数字"
                }
              ],
              interaction: {
                type: "numeric-lab",
                params: {
                  mode: "accumulate",
                  term: "2^(n-1)",
                  maxSteps: 15,
                  buttonLabel: "加一格",
                  showTrend: true
                }
              },
              auxInteraction: null,
              hints: [
                "每点一次加一格：总数翻一番再加 1，1→3→7→15→…。",
                "第 64 格单独就要 2⁶³≈9.2×10¹⁸ 粒——指数增长快得离谱。"
              ],
              examples: [
                { text: "古印度传说：国王奖励发明象棋的大臣", figure: "数值实验" }
              ],
              prev: "ch09-u2-l4-p1",
              next: "ch09-u2-l5-p1"
            }
          ]
        },
        {
          id: "ch09-u2-l5",
          title: "本章小结",
          pages: [
            {
              id: "ch09-u2-l5-p1",
              title: "本章小结：离散的函数",
              concept: "本章知识串联",
              formulas: [
                {
                  id: "f1",
                  latex: "a_n = a_1 + (n-1)d, S_n = \\frac{n(a_1 + a_n)}{2}",
                  translation: "等差全家桶：通项一次加，求和首尾配对"
                },
                {
                  id: "f2",
                  latex: "a_n = a_1 q^{n-1}, S_n = \\frac{a_1(1 - q^n)}{1 - q} (q \\neq 1)",
                  translation: "等比全家桶：通项指数乘，求和错位相减"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: 1, max: 12, step: 1, label: "n", expr: "2*n+1" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: 1, max: 10, step: 1, label: "n", expr: "2^(n-1)" }
                  },
                  labels: ["等差：散点落在直线上", "等比：散点落在指数曲线上"]
                }
              },
              auxInteraction: null,
              hints: [
                "数列是定义在正整数上的函数——散点图就是它的画像。",
                "下一章看：散点越来越密，离散开始逼近连续（极限）。"
              ],
              examples: [
                { text: "两种增长：等差匀速爬坡，等比越涨越快", figure: "并排对比" }
              ],
              prev: "ch09-u2-l4-p2",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
