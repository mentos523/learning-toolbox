/* ============================================================
 * 学习工具箱 · 数学 · 代数 第一章：一元一次方程（12 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第一章）。
 * 黄队教学流（docs/math-algebra-pedagogy.md 五条铁律）。
 *
 * 页面：u1-l1-p1/p2/p3 等式与方程（含未知数 vs 变量）
 *       u1-l2-p1/p2 等式的性质（性质1、性质2）
 *       u2-l1-p1/p2 移项与合并
 *       u2-l2-p1/p2 去括号、去分母
 *       u2-l3-p1 列方程（应用一）
 *       u2-l4-p1 行程问题（应用二）
 *       u2-l5-p1 本章小结：解方程三步走
 * 交互全部复用已实现渲染器：slider-lab / balance-drag。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch01"] = {
  id: "ch01",
  title: "一元一次方程",
  units: [
    {
      id: "ch01-u1",
      title: "方程的概念",
      lessons: [
        {
          id: "ch01-u1-l1",
          title: "等式与方程",
          pages: [
            {
              id: "ch01-u1-l1-p1",
              title: "2x + 1 = 11，x 是几？",
              concept: "方程的解",
              formulas: [
                {
                  id: "f1",
                  latex: "2x + 1 = 11",
                  translation: "2 乘 x 加 1 等于 11"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "2*x + 1",
                  target: 11,
                  targetLabel: "让左边等于 11"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x，看 2x+1 什么时候追上 11。",
                "解方程，就是找到那个\"对上号\"的 x。"
              ],
              examples: [
                { text: "滑块试解：找让等式成立的 x", figure: "滑块" }
              ],
              prev: null,
              next: "ch01-u1-l1-p2"
            },
            {
              id: "ch01-u1-l1-p2",
              title: "含有未知数的等式叫方程",
              concept: "方程的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "x + 5 = 12",
                  translation: "x 加 5 等于 12"
                },
                {
                  id: "f2",
                  latex: "3 + 5 = 8",
                  translation: "3 加 5 等于 8"
                }
              ],
              interaction: {
                type: "balance-drag",
                params: {
                  left: [
                    { kind: "unknown", id: "x", label: "x" },
                    { kind: "weight", value: 5 }
                  ],
                  right: [
                    { kind: "weight", value: 12 }
                  ],
                  goal: "观察天平：它既是一个等式，也是一个方程",
                  rule: "天平平衡叫等式；含有未知数 x 的等式叫方程"
                }
              },
              auxInteraction: null,
              hints: [
                "天平平衡：两边一样重，这就是等式。",
                "左边多了个 x 盒子——含有未知数的等式，叫方程。"
              ],
              examples: [
                { text: "天平：等式是平衡，方程是藏了 x 的平衡", figure: "天平" }
              ],
              prev: "ch01-u1-l1-p1",
              next: "ch01-u1-l1-p3"
            },
            {
              id: "ch01-u1-l1-p3",
              title: "未知数和变量是一回事吗？",
              concept: "未知数 vs 变量",
              formulas: [
                {
                  id: "f1",
                  latex: "2x + 5",
                  translation: "2 乘 x 加 5"
                },
                {
                  id: "f2",
                  latex: "2x + 5 = 13",
                  translation: "2 乘 x 加 5 等于 13"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "2*x + 5",
                  target: 13,
                  targetLabel: "方程 2x+5 = 13 要找的那个 x"
                }
              },
              auxInteraction: null,
              hints: [
                "随便拖 x：它到处跑，叫变量。",
                "让它停在等式成立的位置：此刻它有一个确定的值，叫未知数。"
              ],
              examples: [
                { text: "动点 vs 定点：变量是跑的数，未知数是等着被找到的数", figure: "滑块" }
              ],
              prev: "ch01-u1-l1-p2",
              next: "ch01-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch01-u1-l2",
          title: "等式的性质",
          pages: [
            {
              id: "ch01-u1-l2-p1",
              title: "两边同时加减，天平还平吗？",
              concept: "等式的性质1",
              formulas: [
                {
                  id: "f1",
                  latex: "x + 3 = 8",
                  translation: "x 加 3 等于 8"
                },
                {
                  id: "f2",
                  latex: "x + 3 - 3 = 8 - 3",
                  translation: "x 加 3 减 3 等于 8 减 3"
                }
              ],
              interaction: {
                type: "balance-drag",
                params: {
                  left: [
                    { kind: "unknown", id: "x", label: "x" },
                    { kind: "weight", value: 3 }
                  ],
                  right: [
                    { kind: "weight", value: 8 }
                  ],
                  goal: "两边同时拿走 3g 砝码，看天平还平不平",
                  rule: "等式两边加减同一个数，等式依然成立"
                }
              },
              auxInteraction: null,
              hints: [
                "拖走左边 3g，右边也拖走 3g。",
                "天平没动：这就是等式的性质 1——两边加减同一个数，等式不变。"
              ],
              examples: [
                { text: "天平：两边同时减 3", figure: "天平" }
              ],
              prev: "ch01-u1-l1-p3",
              next: "ch01-u1-l2-p2"
            },
            {
              id: "ch01-u1-l2-p2",
              title: "两边同时乘除，天平还平吗？",
              concept: "等式的性质2",
              formulas: [
                {
                  id: "f1",
                  latex: "2x = 10",
                  translation: "2 乘 x 等于 10"
                },
                {
                  id: "f2",
                  latex: "\\frac{2x}{2} = \\frac{10}{2}",
                  translation: "2 乘 x 除以 2 等于 10 除以 2"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "2*x",
                  target: 10,
                  targetLabel: "2x = 10",
                  unit: ""
                }
              },
              auxInteraction: null,
              hints: [
                "拖动滑块，找一找 2x = 10 时 x 是几。",
                "x = 5 时 2×5 = 10。这就是等式的性质 2：两边乘同一个数，或除以同一个不为 0 的数，等式不变。"
              ],
              examples: [
                { text: "滑块：找 2x = 10 的解", figure: "滑块" }
              ],
              prev: "ch01-u1-l2-p1",
              next: "ch01-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch01-u2",
      title: "一元一次方程的解法",
      lessons: [
        {
          id: "ch01-u2-l1",
          title: "移项与合并",
          pages: [
            {
              id: "ch01-u2-l1-p1",
              title: "x + 5 = 12：把 x 单独留下",
              concept: "移项",
              formulas: [
                {
                  id: "f1",
                  latex: "x + 5 = 12",
                  translation: "x 加 5 等于 12"
                },
                {
                  id: "f2",
                  latex: "x = 7",
                  translation: "x 等于 7"
                }
              ],
              interaction: {
                type: "balance-drag",
                params: {
                  left: [
                    { kind: "unknown", id: "x", label: "x" },
                    { kind: "weight", value: 5 }
                  ],
                  right: [
                    { kind: "weight", value: 12 }
                  ],
                  goal: "把 x 单独留在左边",
                  rule: "把 5 拖到右边的 12 上，两边同时减去 5"
                }
              },
              auxInteraction: null,
              hints: [
                "试试把左边的 5 拖到右边的 12 上面松开。",
                "这就是\"移项\"的动作：+5 从左边搬到右边，变成了 −5。"
              ],
              examples: [
                { text: "天平：拖 5 去减 12", figure: "拖拽" }
              ],
              prev: "ch01-u1-l2-p2",
              next: "ch01-u2-l1-p2"
            },
            {
              id: "ch01-u2-l1-p2",
              title: "2x + 3x：数盒子就行",
              concept: "合并同类项",
              formulas: [
                {
                  id: "f1",
                  latex: "2x + 3x = 5x",
                  translation: "2 乘 x 加 3 乘 x 等于 5 乘 x"
                },
                {
                  id: "f2",
                  latex: "5x = 25",
                  translation: "5 乘 x 等于 25"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "2*x + 3*x",
                  target: 25,
                  targetLabel: "5x = 25"
                }
              },
              auxInteraction: null,
              hints: [
                "2 盒 x 加 3 盒 x，一共 5 盒 x。",
                "同类项合并就是数盒子：2x+3x = 5x，字母和指数都不变。"
              ],
              examples: [
                { text: "盒子合并：2 盒 x 加 3 盒 x 是 5 盒 x", figure: "滑块" }
              ],
              prev: "ch01-u2-l1-p1",
              next: "ch01-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch01-u2-l2",
          title: "去括号与去分母",
          pages: [
            {
              id: "ch01-u2-l2-p1",
              title: "2(x+3)：2 要乘给谁？",
              concept: "去括号",
              formulas: [
                {
                  id: "f1",
                  latex: "2(x + 3) = 14",
                  translation: "2 乘以 x 加 3 的和等于 14"
                },
                {
                  id: "f2",
                  latex: "2x + 6 = 14",
                  translation: "2 乘 x 加 6 等于 14"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "2*(x + 3)",
                  target: 14,
                  targetLabel: "2(x+3) = 14"
                }
              },
              auxInteraction: null,
              hints: [
                "括号外的 2 要乘给括号里的每一项。",
                "2×x 得 2x，2×3 得 6：2(x+3) = 2x+6。这就是去括号。"
              ],
              examples: [
                { text: "拆包：2 袋 (x+3) 拆开是 2x+6", figure: "滑块" }
              ],
              prev: "ch01-u2-l1-p2",
              next: "ch01-u2-l2-p2"
            },
            {
              id: "ch01-u2-l2-p2",
              title: "分母 2 太碍事，乘掉它",
              concept: "去分母",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{x}{2} + 1 = 5",
                  translation: "x 除以 2 加 1 等于 5"
                },
                {
                  id: "f2",
                  latex: "x + 2 = 10",
                  translation: "x 加 2 等于 10"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 20,
                  step: 1,
                  label: "x",
                  expr: "x/2 + 1",
                  target: 5,
                  targetLabel: "x/2 + 1 = 5"
                }
              },
              auxInteraction: null,
              hints: [
                "分母是 2，两边同乘 2。",
                "x/2×2 = x，1×2 = 2：分母消失了。这就是去分母，用的是等式的性质 2。"
              ],
              examples: [
                { text: "去分母：两边同乘 2", figure: "滑块" }
              ],
              prev: "ch01-u2-l2-p1",
              next: "ch01-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch01-u2-l3",
          title: "方程的应用（一）：列方程",
          pages: [
            {
              id: "ch01-u2-l3-p1",
              title: "长方形：长比宽多 3",
              concept: "列方程",
              formulas: [
                {
                  id: "f1",
                  latex: "2(2x + 3) = 26",
                  translation: "2 乘以 2x 加 3 的和等于 26"
                },
                {
                  id: "f2",
                  latex: "x = 5",
                  translation: "x 等于 5"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "2*(2*x + 3)",
                  target: 26,
                  targetLabel: "周长 = 26 厘米",
                  unit: "厘米"
                }
              },
              auxInteraction: null,
              hints: [
                "第一步：设宽为 x，则长为 x+3。",
                "第二步：找等量关系——周长 = 2×(长+宽)，列出 2(2x+3) = 26。"
              ],
              examples: [
                { text: "设未知数、找等量关系", figure: "滑块" }
              ],
              prev: "ch01-u2-l2-p2",
              next: "ch01-u2-l4-p1"
            }
          ]
        },
        {
          id: "ch01-u2-l4",
          title: "方程的应用（二）：拓展",
          pages: [
            {
              id: "ch01-u2-l4-p1",
              title: "两车相向：几小时相遇？",
              concept: "行程问题",
              formulas: [
                {
                  id: "f1",
                  latex: "40x + 20x = 120",
                  translation: "40 乘 x 加 20 乘 x 等于 120"
                },
                {
                  id: "f2",
                  latex: "x = 2",
                  translation: "x 等于 2"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 5,
                  step: 0.25,
                  label: "x",
                  expr: "40*x + 20*x",
                  target: 120,
                  targetLabel: "甲乙路程之和 = 120 千米",
                  unit: "千米"
                }
              },
              auxInteraction: null,
              hints: [
                "甲车时速 40 千米走 x 小时走 40x 千米，乙车时速 20 千米走 20x 千米。",
                "等量关系：甲走的 + 乙走的 = 全程 120。列出 40x+20x = 120，解得 x = 2。"
              ],
              examples: [
                { text: "相遇问题：路程和 = 全程", figure: "滑块" }
              ],
              prev: "ch01-u2-l3-p1",
              next: "ch01-u2-l5-p1"
            }
          ]
        },
        {
          id: "ch01-u2-l5",
          title: "本章小结",
          pages: [
            {
              id: "ch01-u2-l5-p1",
              title: "解方程三步走",
              concept: "解方程的流程",
              formulas: [
                {
                  id: "f1",
                  latex: "3x - 5 = 10",
                  translation: "3 乘 x 减 5 等于 10"
                },
                {
                  id: "f2",
                  latex: "3x = 15",
                  translation: "3 乘 x 等于 15"
                },
                {
                  id: "f3",
                  latex: "x = 5",
                  translation: "x 等于 5"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "3*x - 5",
                  target: 10,
                  targetLabel: "3x − 5 = 10"
                }
              },
              auxInteraction: null,
              hints: [
                "移项：−5 搬到右边变 +5，得 3x = 15（依据等式性质 1：两边同减 5）。",
                "合并、系数化为 1：x = 5。记住三步：移项→合并→系数化 1。"
              ],
              examples: [
                { text: "一图流：解方程三步走", figure: "滑块" }
              ],
              prev: "ch01-u2-l4-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
