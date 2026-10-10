/* ============================================================
 * 学习工具箱 · 数学 · 代数 第二章：整式与因式分解（25 页）
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
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
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
                { id: "f1", latex: "3x^2", translation: "3 乘 x 的平方：单项式，系数是 3，次数是 2" },
                { id: "f2", latex: "3x^2 - 2x + 5", translation: "3x 平方减 2x 加 5：多项式，有 3 个项，次数是 2" }
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
              next: "ch02-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：单项式与多项式",
              examples: [
                { figure: "辨析", text: "−3ab²：系数 −3，次数 3（a¹b²，1+2=3）。πx² 的系数是 π。" }
              ],
              formulas: [
                { id: "f1", latex: "5x^3", translation: "系数是 5，次数是 3：数字因数叫系数，x 的指数叫次数" },
                { id: "f2", latex: "2x^2 + 3x - 7", translation: "三项：2x²、3x、−7；最高次数是 2，叫二次三项式" },
                { id: "f3", latex: "\\frac{2}{x}", translation: "分母里有字母：不是单项式，更不是整式" }
              ],
              hints: [
                "系数：单项式里的数字因数；次数：所有字母指数的和。",
                "易错：πx² 的系数是 π（π 是数不是字母）；2³x 的次数是 1。"
              ],
              id: "ch02-u1-l1-p1b",
              interaction: {
                params: {
                  expr: "2*x^2 + 3*x - 7",
                  label: "x",
                  max: 5,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "系数次数：先认再算",
              prev: "ch02-u1-l1-p1",
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
                { id: "f1", latex: "2x + 3x = 5x", translation: "2 个 x 加 3 个 x 等于 5 个 x" },
                { id: "f2", latex: "7y^2 - 4y^2 = 3y^2", translation: "7 个 y 平方减 4 个 y 平方等于 3 个 y 平方" }
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
              prev: "ch02-u1-l1-p1b",
              next: "ch02-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：合并同类项",
              examples: [
                { figure: "变式练习", text: "3ab−5ab+2a²=−2ab+2a²：ab 合并，a² 落单照抄。" }
              ],
              formulas: [
                { id: "f1", latex: "4x^2 + 3x - 2x^2 + 5", translation: "第一步：找同类项——4x² 与 −2x² 是同类项" },
                { id: "f2", latex: "2x^2 + 3x + 5", translation: "第二步：4x²−2x²=2x²；3x 和 5 落单，照抄" },
                { id: "f3", latex: "7y^2 - 4y^2 = 3y^2", translation: "再练：7 个 y² 减 4 个 y²，剩 3 个 y²" }
              ],
              hints: [
                "合并三步：找（同类项）、并（系数相加）、抄（落单的照抄）。",
                "x² 的盒子和 x 的盒子不能混装：指数不同就不是同类项。"
              ],
              id: "ch02-u1-l2-p1b",
              interaction: {
                params: {
                  expr: "4*x^2 + 3*x - 2*x^2 + 5",
                  label: "x",
                  max: 5,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "合并三步：找、并、抄",
              prev: "ch02-u1-l2-p1",
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
                { id: "f2", latex: "2^3 \\cdot 2^4 = 2^7", translation: "2 的 3 次方乘 2 的 4 次方等于 2 的 7 次方" }
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
              prev: "ch02-u1-l2-p1b",
              next: "ch02-u1-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：同底数幂的乘法",
              examples: [
                { figure: "变式练习", text: "(−2)⁴·(−2)³=(−2)⁷：底数 −2 相同，指数 4+3=7。" }
              ],
              formulas: [
                { id: "f1", latex: "a^3 \\cdot a^5", translation: "3 个 a 相乘，再乘 5 个 a：一共 8 个 a 相乘" },
                { id: "f2", latex: "a^3 \\cdot a^5 = a^8", translation: "底数不变，指数相加：3+5=8" },
                { id: "f3", latex: "x^2 \\cdot y^3", translation: "底数不同（x 和 y）：公式用不上，原样放着" }
              ],
              hints: [
                "同底数幂相乘：底数不变，指数相加——前提是底数相同。",
                "易错：x²·x³=x⁵ 不是 x⁶；2³·3² 底数不同不能合并。"
              ],
              id: "ch02-u1-l3-p1b",
              interaction: {
                params: {
                  expr: "x^2 * x^3",
                  label: "x",
                  max: 5,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "同底数幂：指数相加",
              prev: "ch02-u1-l3-p1",
              next: "ch02-u1-l3-p2"
            },
            {
              id: "ch02-u1-l3-p2",
              title: "乘方再乘方：指数相乘",
              concept: "幂的乘方与积的乘方",
              formulas: [
                { id: "f1", latex: "(x^2)^3 = x^6", translation: "x 平方的 3 次方等于 x 的 6 次方" },
                { id: "f2", latex: "(2x)^3 = 8x^3", translation: "2x 的 3 次方等于 8 乘 x 的 3 次方" }
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
              examples: [ { text: "(x²)³ 展开就是 x²·x²·x²", figure: "滑块" } ],
              prev: "ch02-u1-l3-p1b",
              next: "ch02-u1-l3-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：幂的乘方与积的乘方",
              examples: [
                { figure: "变式练习", text: "[(−2)³]²=(−2)⁶=64：指数 3×2=6。" }
              ],
              formulas: [
                { id: "f1", latex: "(y^4)^2", translation: "2 个 y⁴ 相乘：指数 4+4" },
                { id: "f2", latex: "(y^4)^2 = y^8", translation: "乘方再乘方：指数相乘，4×2=8" },
                { id: "f3", latex: "(3x^2)^3 = 27x^6", translation: "积的乘方：每个因数都乘方，3³=27，(x²)³=x⁶" }
              ],
              hints: [
                "口诀：乘方套乘方，指数要相乘；积的乘方，括号里每个因数都不能跑。",
                "对比：(x²)³=x⁶ 是相乘，x²·x³=x⁵ 是相加——别串台。"
              ],
              id: "ch02-u1-l3-p2b",
              interaction: {
                params: {
                  expr: "(x^2)^3",
                  label: "x",
                  max: 5,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "乘方套乘方：指数相乘",
              prev: "ch02-u1-l3-p2",
              next: "ch02-u1-l3-p2g"
            },
            {
              auxInteraction: null,
              concept: "图形：x² 的几何意义",
              examples: [
                {
                  figure: "生活实例",
                  text: "地砖是边长 2 的正方形，一块面积 2²=4；4 块拼成大正方形，面积 4²=16。"
                }
              ],
              formulas: [
                { id: "f1", latex: "x^2", translation: "x 的平方：x 乘 x" },
                { id: "f2", latex: "3^2 = 9", translation: "边长 3 的正方形：数格子，横 3 竖 3，一共 9 格" }
              ],
              hints: [
                "拖动手柄：边长变，面积实时变——x² 就是边长为 x 的正方形的面积。",
                "整数边长时数格子：边长 3 有 9 格，3²=9，眼见为实。"
              ],
              id: "ch02-u1-l3-p2g",
              interaction: {
                params: {
                  initial: 3,
                  label: "x",
                  max: 8,
                  min: 1,
                  showGrid: true,
                  step: 1
                },
                type: "shape-area"
              },
              title: "x²：边长为 x 的正方形",
              prev: "ch02-u1-l3-p2b",
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
                { id: "f2", latex: "(x + 3)(x - 3) = x^2 - 9", translation: "x 加 3 乘 x 减 3 等于 x 平方减 9" }
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
                "展开验证：(a+b)(a−b) = a²−ab+ab−b² = a²−b²，中间两项抵消了。"
              ],
              examples: [
                { text: "大正方形挖去小正方形，剩余面积就是 a²−b²", figure: "滑块" }
              ],
              prev: "ch02-u1-l3-p2g",
              next: "ch02-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：平方差公式",
              examples: [
                { figure: "变式练习", text: "(2a+3)(2a−3)=4a²−9：a 换成 2a，平方别忘了 4。" }
              ],
              formulas: [
                { id: "f1", latex: "(x + 5)(x - 5)", translation: "长成 (a+b)(a−b) 的样子：直接套公式" },
                { id: "f2", latex: "x^2 - 25", translation: "中间 +5x−5x 抵消，只剩 x²−25" },
                {
                  id: "f3",
                  latex: "99 \\times 101 = 9999",
                  translation: "活用：99×101=(100−1)(100+1)=100²−1²=9999，口算秒出"
                }
              ],
              hints: [
                "平方差三特征：两项、都是平方、中间减号——三条全中才能套。",
                "99×101 这类“上下差一点”的乘法，用平方差口算最快。"
              ],
              id: "ch02-u2-l1-p1b",
              interaction: {
                params: {
                  expr: "(x+5)*(x-5)",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "平方差：三特征全中才套",
              prev: "ch02-u2-l1-p1",
              next: "ch02-u2-l1-p1g"
            },
            {
              auxInteraction: null,
              concept: "图形：平方差的面积意义",
              examples: [
                {
                  figure: "数形结合",
                  text: "边长 10 的正方形挖掉边长 4 的：100−16=84=(10+4)(10−4)。"
                }
              ],
              formulas: [
                { id: "f1", latex: "a^2 - b^2", translation: "大正方形挖去小正方形，剩下部分的面积" },
                {
                  id: "f2",
                  latex: "(a + b)(a - b) = a^2 - b^2",
                  translation: "剩下的图形剪开重拼，正好是长 (a+b)、宽 (a−b) 的长方形"
                }
              ],
              hints: [
                "拖 a、b：大正方形面积 a²，挖掉 b²，剩下的就是平方差。",
                "把剩下一块剪开重拼，变成 (a+b)×(a−b) 的长方形——公式看得见。"
              ],
              id: "ch02-u2-l1-p1g",
              interaction: {
                params: {
                  labels: [ "大正方形：面积 a²", "挖掉的小正方形：面积 b²" ],
                  left: {
                    kind: "shape-area",
                    params: {
                      initial: 5,
                      label: "a",
                      max: 8,
                      min: 1,
                      showGrid: true,
                      step: 1
                    }
                  },
                  right: {
                    kind: "shape-area",
                    params: {
                      initial: 2,
                      label: "b",
                      max: 5,
                      min: 1,
                      showGrid: true,
                      step: 1
                    }
                  }
                },
                type: "side-compare"
              },
              title: "平方差：大正方形挖一角",
              prev: "ch02-u2-l1-p1b",
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
              examples: [ { text: "正方形切成四块：x²、2x、2x、4", figure: "滑块" } ],
              prev: "ch02-u2-l1-p1g",
              next: "ch02-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：完全平方公式",
              examples: [
                { figure: "变式练习", text: "(2x+1)²=4x²+4x+1：a=2x，2ab=2·2x·1=4x。" }
              ],
              formulas: [
                { id: "f1", latex: "(x + 4)^2", translation: "套公式 (a+b)²=a²+2ab+b²：a=x，b=4" },
                { id: "f2", latex: "x^2 + 8x + 16", translation: "a²=x²，2ab=2·x·4=8x，b²=16" },
                {
                  id: "f3",
                  latex: "(x - 3)^2 = x^2 - 6x + 9",
                  translation: "(a−b)²：中间是 −2ab，但最后一项永远是 +b²"
                }
              ],
              hints: [
                "完全平方=三项：首平方、尾平方、中间是首尾积的 2 倍。",
                "最高频错误：(x+4)² 写成 x²+16——漏了中间的 8x，默写三遍记住它。"
              ],
              id: "ch02-u2-l2-p1b",
              interaction: {
                params: {
                  expr: "(x+4)^2",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "完全平方：别漏 2ab",
              prev: "ch02-u2-l2-p1",
              next: "ch02-u2-l2-p1g"
            },
            {
              auxInteraction: null,
              concept: "图形：完全平方的面积意义",
              examples: [
                { figure: "口算技巧", text: "102²=(100+2)²=10000+400+4=10404：完全平方口算。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "(a + b)^2 = a^2 + 2ab + b^2",
                  translation: "大正方形 = a² + 两条 ab 长方形 + b² 小正方形"
                },
                {
                  id: "f2",
                  latex: "5^2 = 3^2 + 2 \\times 3 \\times 2 + 2^2",
                  translation: "取 a=3、b=2：25=9+12+4，数格子验证"
                }
              ],
              hints: [
                "右图边长 a+b：切成四块——a²、两个 ab、b²。",
                "总说漏 2ab 的同学请数格子：25 格里有 12 格是那两条长方形。"
              ],
              id: "ch02-u2-l2-p1g",
              interaction: {
                params: {
                  labels: [ "a²", "(a+b)²：多了两条 ab 和一个 b²" ],
                  left: {
                    kind: "shape-area",
                    params: {
                      initial: 3,
                      label: "a",
                      max: 6,
                      min: 1,
                      showGrid: true,
                      step: 1
                    }
                  },
                  right: {
                    kind: "shape-area",
                    params: {
                      initial: 5,
                      label: "a+b",
                      max: 8,
                      min: 2,
                      showGrid: true,
                      step: 1
                    }
                  }
                },
                type: "side-compare"
              },
              title: "完全平方：切成四块看",
              prev: "ch02-u2-l2-p1b",
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
                { id: "f1", latex: "(x + 2)(x + 3) = x^2 + 5x + 6", translation: "整式乘法：把积展开成和" },
                { id: "f2", latex: "x^2 + 5x + 6 = (x + 2)(x + 3)", translation: "因式分解：把和写回成积" }
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
                "因式分解要一次分到底：每个因式都要分到不能再分为止。"
              ],
              examples: [ { text: "已知矩形面积求边长：面积拼图的逆过程", figure: "滑块" } ],
              prev: "ch02-u2-l2-p1g",
              next: "ch02-u3-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：因式分解的概念",
              examples: [
                {
                  figure: "类比",
                  text: "12=2×2×3 是数字的因式分解；x²+7x+12=(x+3)(x+4) 是整式的。"
                }
              ],
              formulas: [
                { id: "f1", latex: "x^2 + 7x + 12", translation: "这是和的形式：三项相加" },
                { id: "f2", latex: "(x + 3)(x + 4)", translation: "写成积的形式：这就是因式分解" },
                { id: "f3", latex: "(x + 3)(x + 4) = x^2 + 7x + 12", translation: "倒回去展开能还原：说明分解对了" }
              ],
              hints: [
                "因式分解 = 和变积，是整式乘法的逆运算。",
                "检验标准：把分解结果乘开，能还原就对了；还要一次分到底。"
              ],
              id: "ch02-u3-l1-p1b",
              interaction: {
                params: {
                  expr: "x^2 + 7*x + 12",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "因式分解：和变回积",
              prev: "ch02-u3-l1-p1",
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
                { id: "f1", latex: "3x^2 + 6x = 3x(x + 2)", translation: "3x 平方加 6x 等于 3x 乘 x 加 2" },
                { id: "f2", latex: "4x + 8 = 4(x + 2)", translation: "4x 加 8 等于 4 乘 x 加 2" }
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
              prev: "ch02-u3-l1-p1b",
              next: "ch02-u3-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：提公因式法",
              examples: [
                {
                  figure: "变式练习",
                  text: "8a³b²+12a²b=4a²b(2ab+3)：系数最大公约数 4，字母最低次 a²b。"
                }
              ],
              formulas: [
                { id: "f1", latex: "6x^3 + 9x^2", translation: "系数最大公约数是 3，字母最低次是 x²：公因式 3x²" },
                { id: "f2", latex: "3x^2(2x + 3)", translation: "提出 3x²：6x³÷3x²=2x，9x²÷3x²=3" },
                { id: "f3", latex: "3x^2(2x + 3) = 6x^3 + 9x^2", translation: "乘回去能还原：提对了，也提干净了" }
              ],
              hints: [
                "找公因式两步：系数取最大公约数，字母取最低次幂。",
                "提完必检验：公因式乘回括号，还原才算提干净。"
              ],
              id: "ch02-u3-l2-p1b",
              interaction: {
                params: {
                  expr: "6*x^3 + 9*x^2",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "提公因式：先找后提",
              prev: "ch02-u3-l2-p1",
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
                { id: "f1", latex: "x^2 - 9 = (x + 3)(x - 3)", translation: "x 平方减 9 等于 x 加 3 乘 x 减 3" },
                {
                  id: "f2",
                  latex: "4x^2 - 25 = (2x + 5)(2x - 5)",
                  translation: "4x 平方减 25 等于 2x 加 5 乘 2x 减 5"
                },
                { id: "f3", latex: "x^2 + 4x + 4 = (x + 2)^2", translation: "x 平方加 4x 加 4 等于 x 加 2 的平方" }
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
              prev: "ch02-u3-l2-p1b",
              next: "ch02-u3-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：公式法分解因式",
              examples: [
                {
                  figure: "变式练习",
                  text: "a⁴−1=(a²+1)(a²−1)=(a²+1)(a+1)(a−1)：一次分到底。"
                }
              ],
              formulas: [
                { id: "f1", latex: "9x^2 - 16", translation: "两项、都是平方、中间减号：平方差倒着用" },
                { id: "f2", latex: "(3x + 4)(3x - 4)", translation: "9x²=(3x)²，16=4²" },
                { id: "f3", latex: "x^2 - 10x + 25 = (x - 5)^2", translation: "三项、首尾平方、中间 −2ab：完全平方倒着用" }
              ],
              hints: [
                "公式法=乘法公式倒着走：先认出是哪种公式的形状。",
                "顺序：先看能不能提公因式，再看公式——本题没有公因式可提。"
              ],
              id: "ch02-u3-l3-p1b",
              interaction: {
                params: {
                  expr: "9*x^2 - 16",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "公式法：认出形状倒着用",
              prev: "ch02-u3-l3-p1",
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
                "注意：这里只拆首项系数为 1 的二次三项式（首项就是 x²）。"
              ],
              examples: [
                { text: "矩形面积的行列分解：长 (x+3)、宽 (x+2)", figure: "滑块" }
              ],
              prev: "ch02-u3-l3-p1b",
              next: "ch02-u3-l4-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：十字相乘法",
              examples: [
                {
                  figure: "变式练习",
                  text: "x²−x−6=(x−3)(x+2)：−6=(−3)×2，−3+2=−1，对上一次项。"
                }
              ],
              formulas: [
                { id: "f1", latex: "x^2 + 8x + 15", translation: "首项 x²，常数 15，一次项系数 8" },
                { id: "f2", latex: "15 = 3 \\times 5", translation: "拆常数项：15=3×5；凑一次项：3+5=8，对上了" },
                { id: "f3", latex: "(x + 3)(x + 5)", translation: "写成积；展开检验：x²+8x+15，还原成功" }
              ],
              hints: [
                "十字相乘两步：拆常数项（乘积=c），凑一次项（和=b）。",
                "符号口诀：c 为正，两因数同号（与 b 同）；c 为负，两因数异号。"
              ],
              id: "ch02-u3-l4-p1b",
              interaction: {
                params: {
                  expr: "x^2 + 8*x + 15",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 0.5
                },
                type: "slider-lab"
              },
              title: "十字相乘：拆常数凑系数",
              prev: "ch02-u3-l4-p1",
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
                { id: "f1", latex: "(a + b)(a - b) = a^2 - b^2", translation: "平方差公式：积与和的互化" },
                { id: "f2", latex: "(a + b)^2 = a^2 + 2ab + b^2", translation: "完全平方公式：积与和的互化" },
                { id: "f3", latex: "x^2 + 5x + 6 = (x + 2)(x + 3)", translation: "十字相乘：把和写成积" }
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
              prev: "ch02-u3-l4-p1b",
              next: "ch02-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch02-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch02-ux-l1",
          title: "第二章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．−2，5；2．x⁹，x¹²；3．x²−36；4．x²−10x+25；5．4x(x+2)；6．(x+4)(x+5)；7．10609"
                }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "(a + b)^2 = a^2 + 2ab + b^2",
                  translation: "本章核心公式之一：完全平方公式（第 7 题就用它口算）"
                }
              ],
              hints: [
                "1．−2x³y² 的系数是____，次数是____。",
                "2．计算：x⁴·x⁵=____；(x³)⁴=____。",
                "3．(x+6)(x−6)=____。",
                "4．(x−5)²=____。",
                "5．分解因式：4x²+8x=____。",
                "6．分解因式：x²+9x+20=____。",
                "7．用简便方法算：103²。"
              ],
              id: "ch02-ux-l1-p1",
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
              title: "第二章习题：整式与分解",
              prev: "ch02-u3-l5-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
