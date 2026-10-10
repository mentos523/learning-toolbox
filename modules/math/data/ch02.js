/* ============================================================
 * 学习工具箱 · 数学 · 代数 第二章：整式与因式分解（11 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第二章）。
 * 黄队教学流（docs/math-algebra-pedagogy.md 五条铁律）。
 *
 * 页面：u1-l1-p1 单项式与多项式（系数、次数、项）
 *       u1-l2-p1 整式的加减：合并同类项
 *       u1-l3-p1/p2 幂的运算（同底数幂乘法 / 幂的乘方与积的乘方）
 *       u2-l1-p1 平方差公式
 *       u2-l2-p1 完全平方公式
 *       u3-l1-p1 因式分解的概念（与整式乘法互逆）
 *       u3-l2-p1 提公因式法
 *       u3-l3-p1 公式法（平方差逆用）
 *       u3-l4-p1 十字相乘法
 *       u3-l5-p1 本章小结：乘法 ↔ 分解互逆
 * 交互全部复用已实现渲染器：slider-lab（label 均为纯变量名）。
 * 无需新交互渲染器。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch02"] = {
  id: "ch02",
  title: "整式与因式分解",
  units: [
    {
      id: "ch02-u1",
      title: "整式",
      lessons: [
        {
          id: "ch02-u1-l1",
          title: "单项式与多项式",
          pages: [
            {
              id: "ch02-u1-l1-p1",
              title: "单项式攒成多项式",
              concept: "单项式与多项式",
              formulas: [
                {
                  id: "f1",
                  latex: "3x^2",
                  translation: "3 乘 x 的平方：单项式，系数是 3，次数是 2"
                },
                {
                  id: "f2",
                  latex: "3x^2 - 2x + 5",
                  translation: "3x 平方减 2x 加 5：多项式，有 3 个项，次数是 2"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "3*x^2 - 2*x + 5"
                }
              },
              auxInteraction: null,
              hints: [
                "单项式 = 数与字母的积；单独的一个数或一个字母也是单项式（比如 5，次数是 0）；次数是所有字母指数的和。",
                "几个单项式相加就是多项式，多项式的次数看次数最高的那一项。"
              ],
              examples: [
                { text: "3x²−2x+5 的项：3x²、−2x、5；次数是 2", figure: "滑块" }
              ],
              prev: null,
              next: "ch02-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch02-u1-l2",
          title: "整式的加减",
          pages: [
            {
              id: "ch02-u1-l2-p1",
              title: "2x + 3x：数盒子就行",
              concept: "合并同类项",
              formulas: [
                {
                  id: "f1",
                  latex: "2x + 3x = 5x",
                  translation: "2 个 x 加 3 个 x 等于 5 个 x"
                },
                {
                  id: "f2",
                  latex: "7y^2 - 4y^2 = 3y^2",
                  translation: "7 个 y 平方减 4 个 y 平方等于 3 个 y 平方"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "2*x + 3*x"
                }
              },
              auxInteraction: null,
              hints: [
                "2 盒 x 加 3 盒 x，一共 5 盒 x：2x+3x = 5x。",
                "同类项：字母相同、指数也相同才能合并；合并只加系数，字母和指数不动。"
              ],
              examples: [
                { text: "数盒子：x² 的盒子和 x 的盒子不能混装", figure: "滑块" }
              ],
              prev: "ch02-u1-l1-p1",
              next: "ch02-u1-l3-p1"
            }
          ]
        },
        {
          id: "ch02-u1-l3",
          title: "幂的运算",
          pages: [
            {
              id: "ch02-u1-l3-p1",
              title: "同底数幂相乘：指数相加",
              concept: "同底数幂的乘法",
              formulas: [
                {
                  id: "f1",
                  latex: "x^m \\cdot x^n = x^{m+n}",
                  translation: "x 的 m 次方乘 x 的 n 次方，等于 x 的 m 加 n 次方"
                },
                {
                  id: "f2",
                  latex: "2^3 \\cdot 2^4 = 2^7",
                  translation: "2 的 3 次方乘 2 的 4 次方等于 2 的 7 次方"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 5,
                  step: 0.5,
                  label: "x",
                  expr: "x^2 * x^3"
                }
              },
              auxInteraction: null,
              hints: [
                "x² 是 2 个 x 相乘，x³ 是 3 个 x 相乘，合在一起是 5 个 x 相乘。",
                "所以 x²·x³ = x⁵：底数不变，指数相加。"
              ],
              examples: [
                { text: "2 个 x 盒子乘 3 个 x 盒子，是 5 个 x 盒子", figure: "滑块" }
              ],
              prev: "ch02-u1-l2-p1",
              next: "ch02-u1-l3-p2"
            },
            {
              id: "ch02-u1-l3-p2",
              title: "乘方再乘方：指数相乘",
              concept: "幂的乘方与积的乘方",
              formulas: [
                {
                  id: "f1",
                  latex: "(x^2)^3 = x^6",
                  translation: "x 平方的 3 次方等于 x 的 6 次方"
                },
                {
                  id: "f2",
                  latex: "(2x)^3 = 8x^3",
                  translation: "2x 的 3 次方等于 8 乘 x 的 3 次方"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 5,
                  step: 0.5,
                  label: "x",
                  expr: "(x^2)^3"
                }
              },
              auxInteraction: null,
              hints: [
                "(x²)³ 就是 3 个 x² 相乘：指数 2+2+2 = 6，所以是 x⁶。",
                "(2x)³ = 2³·x³ = 8x³：括号里每个因数都要乘方。"
              ],
              examples: [
                { text: "(x²)³ 展开就是 x²·x²·x²", figure: "滑块" }
              ],
              prev: "ch02-u1-l3-p1",
              next: "ch02-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch02-u2",
      title: "乘法公式",
      lessons: [
        {
          id: "ch02-u2-l1",
          title: "平方差公式",
          pages: [
            {
              id: "ch02-u2-l1-p1",
              title: "(a+b)(a−b)：中间项去哪了？",
              concept: "平方差公式",
              formulas: [
                {
                  id: "f1",
                  latex: "(a + b)(a - b) = a^2 - b^2",
                  translation: "a 加 b 的和乘 a 减 b 的差，等于 a 平方减 b 平方"
                },
                {
                  id: "f2",
                  latex: "(x + 3)(x - 3) = x^2 - 9",
                  translation: "x 加 3 乘 x 减 3 等于 x 平方减 9"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "(x+3)*(x-3)"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x：左边乘开永远等于 x²−9。",
                "+3x 和 −3x 抵消了：只剩平方的差，这就是\"平方差\"名字的由来。",
                "展开验证：(a+b)(a−b) = a²−ab+ab−b² = a²−b²，中间两项抵消了。",],
              examples: [
                { text: "大正方形挖去小正方形，剩余面积就是 a²−b²", figure: "滑块" }
              ],
              prev: "ch02-u1-l3-p2",
              next: "ch02-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch02-u2-l2",
          title: "完全平方公式",
          pages: [
            {
              id: "ch02-u2-l2-p1",
              title: "(a+b)²：别忘了中间的 2ab",
              concept: "完全平方公式",
              formulas: [
                {
                  id: "f1",
                  latex: "(a + b)^2 = a^2 + 2ab + b^2",
                  translation: "a 加 b 和的平方，等于 a 平方加 2ab 加 b 平方"
                },
                {
                  id: "f2",
                  latex: "(a - b)^2 = a^2 - 2ab + b^2",
                  translation: "a 减 b 差的平方，等于 a 平方减 2ab 加 b 平方"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "(x+2)^2"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x：(x+2)² 永远等于 x²+4x+4。",
                "最容易漏掉 2ab：(x+2)² 是 x²+4x+4，不是 x²+4。"
              ],
              examples: [
                { text: "正方形切成四块：x²、2x、2x、4", figure: "滑块" }
              ],
              prev: "ch02-u2-l1-p1",
              next: "ch02-u3-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch02-u3",
      title: "因式分解",
      lessons: [
        {
          id: "ch02-u3-l1",
          title: "因式分解的概念",
          pages: [
            {
              id: "ch02-u3-l1-p1",
              title: "乘法倒着走：和变回积",
              concept: "因式分解",
              formulas: [
                {
                  id: "f1",
                  latex: "(x + 2)(x + 3) = x^2 + 5x + 6",
                  translation: "整式乘法：把积展开成和"
                },
                {
                  id: "f2",
                  latex: "x^2 + 5x + 6 = (x + 2)(x + 3)",
                  translation: "因式分解：把和写回成积"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "x^2 + 5*x + 6"
                }
              },
              auxInteraction: null,
              hints: [
                "整式乘法是\"乘开\"：(x+2)(x+3) 展开成 x²+5x+6。",
                "因式分解是倒着走：把和 x²+5x+6 写成积 (x+2)(x+3)。",
                "因式分解要一次分到底：每个因式都要分到不能再分为止。",],
              examples: [
                { text: "已知矩形面积求边长：面积拼图的逆过程", figure: "滑块" }
              ],
              prev: "ch02-u2-l2-p1",
              next: "ch02-u3-l2-p1"
            }
          ]
        },
        {
          id: "ch02-u3-l2",
          title: "提公因式法",
          pages: [
            {
              id: "ch02-u3-l2-p1",
              title: "3x²+6x：先把 3x 提出来",
              concept: "提公因式法",
              formulas: [
                {
                  id: "f1",
                  latex: "3x^2 + 6x = 3x(x + 2)",
                  translation: "3x 平方加 6x 等于 3x 乘 x 加 2"
                },
                {
                  id: "f2",
                  latex: "4x + 8 = 4(x + 2)",
                  translation: "4x 加 8 等于 4 乘 x 加 2"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "3*x^2 + 6*x"
                }
              },
              auxInteraction: null,
              hints: [
                "3x² 和 6x 都有因数 3x：这就是公因式。",
                "提出来：3x²+6x = 3x(x+2)，像从矩形里抽出一条公共边。"
              ],
              examples: [
                { text: "找公因式：取各项系数的最大公约数、各项都含有的字母的最低次幂", figure: "滑块" }
              ],
              prev: "ch02-u3-l1-p1",
              next: "ch02-u3-l3-p1"
            }
          ]
        },
        {
          id: "ch02-u3-l3",
          title: "公式法",
          pages: [
            {
              id: "ch02-u3-l3-p1",
              title: "x²−9：平方差倒着用",
              concept: "公式法",
              formulas: [
                {
                  id: "f1",
                  latex: "x^2 - 9 = (x + 3)(x - 3)",
                  translation: "x 平方减 9 等于 x 加 3 乘 x 减 3"
                },
                {
                  id: "f2",
                  latex: "4x^2 - 25 = (2x + 5)(2x - 5)",
                  translation: "4x 平方减 25 等于 2x 加 5 乘 2x 减 5"
                },
                {
                  id: "f3",
                  latex: "x^2 + 4x + 4 = (x + 2)^2",
                  translation: "x 平方加 4x 加 4 等于 x 加 2 的平方"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "x^2 - 9"
                }
              },
              auxInteraction: null,
              hints: [
                "看到\"平方减平方\"，就把平方差公式倒着用。",
                "先确认三件事：两项、都是平方、中间是减号。",
                "完全平方也能倒着用：三项、首尾是平方、中间是两倍积，如 x²+4x+4=(x+2)²。"
              ],
              examples: [
                { text: "几何拼图的逆过程：面积 x²−9，求矩形边长", figure: "滑块" }
              ],
              prev: "ch02-u3-l2-p1",
              next: "ch02-u3-l4-p1"
            }
          ]
        },
        {
          id: "ch02-u3-l4",
          title: "十字相乘法",
          pages: [
            {
              id: "ch02-u3-l4-p1",
              title: "x²+5x+6：6 拆成 2×3",
              concept: "十字相乘法",
              formulas: [
                {
                  id: "f1",
                  latex: "x^2 + 5x + 6 = (x + 2)(x + 3)",
                  translation: "x 平方加 5x 加 6 等于 x 加 2 乘 x 加 3"
                },
                {
                  id: "f2",
                  latex: "x^2 + (a + b)x + ab = (x + a)(x + b)",
                  translation: "一般形式：常数项拆成 a 乘 b，一次项系数凑成 a 加 b"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "x^2 + 5*x + 6"
                }
              },
              auxInteraction: null,
              hints: [
                "常数项 6 = 2×3，一次项系数 5 = 2+3。",
                "拆常数项、凑一次项：这就是十字相乘。",
                "注意：这里只拆首项系数为 1 的二次三项式（首项就是 x²）。",],
              examples: [
                { text: "矩形面积的行列分解：长 (x+3)、宽 (x+2)", figure: "滑块" }
              ],
              prev: "ch02-u3-l3-p1",
              next: "ch02-u3-l5-p1"
            }
          ]
        },
        {
          id: "ch02-u3-l5",
          title: "本章小结",
          pages: [
            {
              id: "ch02-u3-l5-p1",
              title: "整式乘法 ↔ 因式分解",
              concept: "乘法与分解互逆",
              formulas: [
                {
                  id: "f1",
                  latex: "(a + b)(a - b) = a^2 - b^2",
                  translation: "平方差公式：积与和的互化"
                },
                {
                  id: "f2",
                  latex: "(a + b)^2 = a^2 + 2ab + b^2",
                  translation: "完全平方公式：积与和的互化"
                },
                {
                  id: "f3",
                  latex: "x^2 + 5x + 6 = (x + 2)(x + 3)",
                  translation: "十字相乘：把和写成积"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 0.5,
                  label: "x",
                  expr: "(x+2)*(x+3)"
                }
              },
              auxInteraction: null,
              hints: [
                "从左到右是整式乘法：积 → 和；从右到左是因式分解：和 → 积。",
                "分解三步走：先提公因式，再看乘法公式，最后十字相乘。"
              ],
              examples: [
                { text: "一图流：乘法展开与分解是同一条路的两个方向", figure: "滑块" }
              ],
              prev: "ch02-u3-l4-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
