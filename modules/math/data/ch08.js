/* ============================================================
 * 学习工具箱 · 数学 · 代数 第八章：指数与对数（25 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第八章 v2.0）。
 * 黄队教学流（docs/math-algebra-pedagogy.md 五条铁律 + 跃升 4 脚手架）。
 *
 * 页面：u1-l1-p1 幂的倒退：从 2³ 倒推 2⁻³=1/8（8.1.1：负整数指数幂）
 *       u1-l2-p1 分数指数：8^(1/3)=2（8.1.2：分数指数幂）
 *       u1-l3-p1 描点：y=2ˣ 是一条不断裂的曲线（8.1.3：直观版）
 *       u2-l1-p1 指数函数：y=aˣ（a>0 且 a≠1）（8.2.1：定义）
 *       u2-l2-p1 对数：2⁵=32 倒过来问（8.2.2：对数的概念）
 *       u2-l3-p1 镜像：y=log₂x 与 y=2ˣ（8.2.3：对数函数）
 *       u2-l4-p1 对数运算法则：真数相乘，对数相加（8.2.4）
 *       u2-l5-p1 方程的解是交点的横坐标：2ˣ=x+1（8.2.5）
 *       u2-l6-p1 互逆小结：指数与对数（8.2.6）
 *       u3-l1-p1 弧度制：180 度 = π（弧度）（8.3.1，选学）
 *       u3-l2-p1 正弦与余弦：单位圆上点的坐标（8.3.2，选学）
 *       u3-l3-p1 一图流：指数、对数与正弦（本章小结）
 * 8.3 三角初探为选学（绿队附录 C：可跳过不影响主线），
 * 8.3.1 弧度制、8.3.2 正弦与余弦，共 2 课 2 页并标注选学。
 * 交互复用已实现渲染器：slider-lab（label 均为纯变量名，
 * expr 只含单个变量）/ plot-points（描点成像）/ linked-dashboard
 * （滑块 + 读数 + 坐标点，point 视图支持 axisLabelX/axisLabelY）/
 * side-compare（仅支持 slider-lab 内嵌，不可嵌套）。无需新交互渲染器。
 * 绿队审计结论落实：
 *   - 术语一律用"幂相乘"，禁用"指数相乘"（labels + hints 全查）
 *   - hint 避开"永不相交"，写"永不与横轴相交"；每页 hints ≤ 2 条、总字数 ≤ 70
 *     （字数规则：中文 1 字、连续 ASCII 串计 1 字；node 实测 12 页均达标）
 *   - 定义条件齐全：a>0 且 a≠1、N>0、x>0 等
 *   - LaTeX 标准写法：\log_2 32（无括号上下标只接一个 token）
 *   - 数值全部精确：2⁻³=1/8、8^(1/3)=2、2⁵=32、折纸 30 次 ≈107374 米
 * 蓝队扩展（2026-10-10）：evalExpr 已支持 log2(x)/log(x)/ln(x)
 * （→ Math.log2 / Math.log），u2-l3-p1 / u2-l6-p1 已升级为真正的对数曲线：
 * 右视图用 log2(x)，xMin=0.1>0 避开 log2(0) 的 -Infinity。
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch08"] = {
  id: "ch08",
  title: "指数与对数",
  units: [
    {
      id: "ch08-u1",
      title: "指数的推广",
      lessons: [
        {
          id: "ch08-u1-l1",
          title: "整数指数幂",
          pages: [
            {
              id: "ch08-u1-l1-p1",
              title: "幂的倒退：2⁻³=1/8",
              concept: "负整数指数幂是倒数",
              formulas: [
                {
                  id: "f1",
                  latex: "a^{-n} = \\frac{1}{a^n} (a \\neq 0)",
                  translation: "a 的 −n 次方等于 1 除以 a 的 n 次方（a 不为 0）：负指数就是取倒数"
                },
                {
                  id: "f2",
                  latex: "2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}",
                  translation: "2 的 −3 次方等于 1 除以 2 的 3 次方，等于 1/8：指数倒退三格，值连除三个 2"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -3,
                  max: 3,
                  step: 1,
                  label: "n",
                  expr: "2^n",
                  target: 0.125,
                  targetLabel: "2⁻³=1/8"
                }
              },
              auxInteraction: null,
              hints: [
                "指数每减 1，值就除以 2：8→4→2→1→1/2→1/4→1/8。",
                "2⁰=1 是转折点：零指数规定为 1，除法规律才能一路畅通。"
              ],
              examples: [
                { text: "数轴上的倒退：2³→2²→2¹→2⁰→2⁻¹→2⁻²→2⁻³", figure: "滑块" }
              ],
              prev: "ch07-u2-l3-p1",
              next: "ch08-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：负整数指数幂",
              examples: [
                { figure: "变式练习", text: "(1/2)⁻²=4：负指数先取倒数，(1/2)⁻²=2²=4。" }
              ],
              formulas: [
                { id: "f1", latex: "3^{-2}", translation: "3 的 −2 次方：指数倒退 2 格" },
                {
                  id: "f2",
                  latex: "3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}",
                  translation: "等于 1 除以 3²，即 1/9"
                },
                { id: "f3", latex: "2^{-1} = \\frac{1}{2}", translation: "2 的 −1 次方 = 1/2" }
              ],
              hints: [
                "负指数=取倒数：a⁻ⁿ=1/aⁿ（a≠0）。",
                "2⁰=1 是分界：指数向右+1 是乘 2，向左−1 是除以 2。"
              ],
              id: "ch08-u1-l1-p1b",
              interaction: {
                params: {
                  expr: "2^n",
                  label: "n",
                  max: 3,
                  min: -3,
                  step: 1,
                  target: 0.125,
                  targetLabel: "2⁻³=1/8"
                },
                type: "slider-lab"
              },
              title: "负指数：倒着数",
              prev: "ch08-u1-l1-p1",
              next: "ch08-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch08-u1-l2",
          title: "分数指数幂",
          pages: [
            {
              id: "ch08-u1-l2-p1",
              title: "分数指数：8 的 1/3 次方是 2",
              concept: "分数指数幂就是开方",
              formulas: [
                {
                  id: "f1",
                  latex: "a^{\\frac{m}{n}} = \\sqrt[n]{a^m} (a > 0)",
                  translation: "a 的 m/n 次方等于 a 的 m 次方再开 n 次方（a 大于 0）：分数指数是开方的另一种写法"
                },
                {
                  id: "f2",
                  latex: "8^{\\frac{1}{3}} = \\sqrt[3]{8} = 2",
                  translation: "8 的 1/3 次方等于 8 开立方，等于 2：因为 2 的 3 次方是 8"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 4,
                  step: 1,
                  label: "n",
                  expr: "8^(1/n)",
                  target: 2,
                  targetLabel: "8 的 1/3 次方 = 2"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 n：n=3 时值恰为 2——2³=8，8 的 1/3 次方就是 2。",
                "分数指数就是开方的另一种写法：底数 a>0。"
              ],
              examples: [
                { text: "√9=9^(1/2)=3：根号是分数指数的“旧衣服”", figure: "滑块" }
              ],
              prev: "ch08-u1-l1-p1b",
              next: "ch08-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：分数指数幂",
              examples: [
                { figure: "变式练习", text: "4 的 3/2 次方=(√4)³=2³=8。" }
              ],
              formulas: [
                { id: "f1", latex: "27^{\\frac{2}{3}}", translation: "分子 2 是乘方，分母 3 是开立方" },
                { id: "f2", latex: "27^{\\frac{2}{3}} = 9", translation: "先开方 (∛27)²=3²=9：先开方数字小，好算" },
                { id: "f3", latex: "16^{\\frac{3}{4}} = 8", translation: "16 开 4 次方得 2，2³=8" }
              ],
              hints: [
                "分数指数口诀：分母开方、分子乘方——a^(m/n)=ⁿ√(aᵐ)。",
                "先开方再乘方数字小：27^(2/3)=(∛27)²=9。"
              ],
              id: "ch08-u1-l2-p1b",
              interaction: {
                params: {
                  expr: "8^(1/n)",
                  label: "n",
                  max: 4,
                  min: 1,
                  step: 1,
                  target: 2,
                  targetLabel: "8 的 1/3 次方 = 2"
                },
                type: "slider-lab"
              },
              title: "分数指数：分母管开方",
              prev: "ch08-u1-l2-p1",
              next: "ch08-u1-l3-p1"
            }
          ]
        },
        {
          id: "ch08-u1-l3",
          title: "实数指数幂（直观版）",
          pages: [
            {
              id: "ch08-u1-l3-p1",
              title: "描点：y=2ˣ 是一条不断裂的曲线",
              concept: "指数连续变化时幂也连续变化（直观）",
              formulas: [
                { id: "f1", latex: "y = 2^x", translation: "y 等于 2 的 x 次方：x 取任意实数，所有点连成一条不断裂的曲线" },
                {
                  id: "f2",
                  latex: "2^{\\sqrt{2}}",
                  translation: "2 的 √2 次方：无理数指数直观上也有值；在 10.2.4 之后（附录 B）回填"
                }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "2^x",
                  xMin: -2,
                  xMax: 3,
                  step: 0.5,
                  autoPlay: true,
                  speed: 600
                }
              },
              auxInteraction: null,
              hints: [
                "点一个亮一个：所有 (x, 2ˣ) 的点连起来，是一条光滑不断裂的曲线。",
                "无理数指数（如 2^√2）直观上也有值，附录 B 回填。"
              ],
              examples: [
                { text: "细菌每 20 分钟翻一倍：数量曲线就是 y=2ˣ 的形状", figure: "描点成像" }
              ],
              prev: "ch08-u1-l2-p1b",
              next: "ch08-u1-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：无理数指数幂",
              examples: [
                { figure: "变式练习", text: "3^π：π≈3.14159…，3^3.14≈31.5，越逼越准。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "2^{1.4}, 2^{1.41}, 2^{1.414}",
                  translation: "√2≈1.4142…：用 1.4、1.41、1.414 一步步逼近"
                },
                { id: "f2", latex: "2^{\\sqrt{2}} \\approx 2.665", translation: "越逼越准：2^√2≈2.665（计算器算的）" }
              ],
              hints: [
                "无理数指数用有理数逼近：1.4→1.41→1.414→…，值越算越准。",
                "因为能无限逼近，y=2ˣ 的图像才不断裂——附录 B 回填严格定义。"
              ],
              id: "ch08-u1-l3-p1b",
              interaction: {
                params: {
                  autoPlay: true,
                  fn: "2^x",
                  speed: 600,
                  step: 0.1,
                  xMax: 2,
                  xMin: 1
                },
                type: "plot-points"
              },
              title: "无理数指数：逼近",
              prev: "ch08-u1-l3-p1",
              next: "ch08-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch08-u2",
      title: "指数函数与对数函数",
      lessons: [
        {
          id: "ch08-u2-l1",
          title: "指数函数",
          pages: [
            {
              id: "ch08-u2-l1-p1",
              title: "指数函数：y=aˣ（a>0 且 a≠1）",
              concept: "指数函数的定义（底数条件）",
              formulas: [
                {
                  id: "f1",
                  latex: "y = a^x (a > 0, a \\neq 1)",
                  translation: "y 等于 a 的 x 次方（a 大于 0 且 a 不为 1）：指数函数的定义"
                },
                {
                  id: "f2",
                  latex: "y = 2^x, y = (\\frac{1}{2})^x",
                  translation: "a=2 是爆炸增长，a=1/2 是指数衰减：底数 a 决定曲线的性格"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0.5,
                  max: 3,
                  step: 0.5,
                  label: "a",
                  expr: "a^2",
                  target: 4,
                  targetLabel: "a=2 时 y=4"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 a：x=2 时，a=2 得 y=4，a=0.5 得 y=0.25。",
                "a=1 退化为常数函数；a≤0 会出麻烦，故 a>0 且 a≠1。"
              ],
              examples: [
                { text: "a=2 爆炸增长，a=1/2 指数衰减：底数决定性格", figure: "滑块" }
              ],
              prev: "ch08-u1-l3-p1b",
              next: "ch08-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：指数函数的定义",
              examples: [
                { figure: "生活实例", text: "细菌翻倍 y=2ˣ；药物代谢 y=(1/2)ˣ。" }
              ],
              formulas: [
                { id: "f1", latex: "y = 3^x", translation: "a=3>1：爆炸增长，x=5 时 y=243" },
                { id: "f2", latex: "y = (\\frac{1}{3})^x", translation: "a=1/3<1：指数衰减，x=5 时 y=1/243" }
              ],
              hints: [
                "a>1 增长，0<a<1 衰减：底数 a 决定曲线的性格。",
                "a=1 时 y≡1（常数函数）；a≤0 会出麻烦，所以 a>0 且 a≠1。"
              ],
              id: "ch08-u2-l1-p1b",
              interaction: {
                params: {
                  expr: "a^2",
                  label: "a",
                  max: 3,
                  min: 0.5,
                  step: 0.5,
                  target: 4,
                  targetLabel: "a=2 时 y=4"
                },
                type: "slider-lab"
              },
              title: "指数函数：底数定性格",
              prev: "ch08-u2-l1-p1",
              next: "ch08-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch08-u2-l2",
          title: "对数的概念",
          pages: [
            {
              id: "ch08-u2-l2-p1",
              title: "对数：2⁵=32 倒过来问",
              concept: "对数是指数的逆运算",
              formulas: [
                { id: "f1", latex: "2^5 = 32", translation: "2 的 5 次方等于 32：顺着问——2 的 5 次方是几" },
                {
                  id: "f2",
                  latex: "\\log_2 32 = 5",
                  translation: "以 2 为底 32 的对数等于 5：倒着问——32 是 2 的几次方，对数是指数的逆运算"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 1,
                  max: 6,
                  step: 1,
                  label: "x",
                  expr: "2^x",
                  target: 32,
                  targetLabel: "2⁵=32：x=5 即 log₂32=5"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 x：x=5 时“咔哒”锁定，2⁵=32——log₂32=5。",
                "对数是倒着问：log₂32 问的是“32 是 2 的几次方”。"
              ],
              examples: [
                {
                  text: "一张纸对折 5 次，厚度变成 32 倍：log₂32=5——每对折一次，厚度就乘以 2",
                  figure: "滑块"
                }
              ],
              prev: "ch08-u2-l1-p1b",
              next: "ch08-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：对数的概念",
              examples: [
                { figure: "变式练习", text: "log₁₀1000=3（10³=1000）；lg 是以 10 为底的简写。" }
              ],
              formulas: [
                { id: "f1", latex: "\\log_3 81", translation: "问：81 是 3 的几次方？" },
                { id: "f2", latex: "\\log_3 81 = 4", translation: "3⁴=81，所以是 4" },
                { id: "f3", latex: "\\log_5 1 = 0", translation: "5⁰=1：1 的对数永远是 0" }
              ],
              hints: [
                "对数三要素：底数、真数、结果——log₂32=5 里底 2、真数 32、结果 5。",
                "logₐ1=0（a⁰=1），logₐa=1：两个永远对的结论。"
              ],
              id: "ch08-u2-l2-p1b",
              interaction: {
                params: {
                  expr: "2^x",
                  label: "x",
                  max: 6,
                  min: 1,
                  step: 1,
                  target: 32,
                  targetLabel: "2⁵=32：x=5 即 log₂32=5"
                },
                type: "slider-lab"
              },
              title: "对数：把指数请下来",
              prev: "ch08-u2-l2-p1",
              next: "ch08-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch08-u2-l3",
          title: "对数函数",
          pages: [
            {
              id: "ch08-u2-l3-p1",
              title: "镜像：y=log₂x 与 y=2ˣ",
              concept: "对数函数与指数函数互为镜像",
              formulas: [
                { id: "f1", latex: "y = 2^x", translation: "指数函数 y 等于 2 的 x 次方：输入 x，输出 2ˣ" },
                {
                  id: "f2",
                  latex: "y = \\log_2 x (x > 0)",
                  translation: "对数函数 y 等于以 2 为底 x 的对数（x 大于 0）：倒过来读就是 x=2ʸ，输入输出互换"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: -3,
                      max: 3,
                      step: 0.25,
                      label: "x",
                      expr: "2^x",
                      target: 8,
                      targetLabel: "目标 8（2³=8）"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: 0.2,
                      max: 8,
                      step: 0.2,
                      label: "x",
                      expr: "log2(x)",
                      target: 3,
                      targetLabel: "目标 3（log₂8=3）"
                    }
                  },
                  labels: [
                    "指数函数 y=2ˣ：关于直线 y=x 对称",
                    "对数函数 y=log₂x：关于直线 y=x 对称"
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "左图 x=3 得 2³=8，右图 x=8 得 log₂8=3——互逆数值。",
                "点 (3,8) 关于 y=x 翻转成 (8,3)：互为镜像。"
              ],
              examples: [
                { text: "密码锁的逆向：知道 2ˣ=8 反推 x=3，就是一次对数运算", figure: "并排对比" }
              ],
              prev: "ch08-u2-l2-p1b",
              next: "ch08-u2-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：指数与对数互逆",
              examples: [
                { figure: "变式练习", text: "10^(lg7)=7；ln(e³)=3。" }
              ],
              formulas: [
                { id: "f1", latex: "3^4 = 81", translation: "去程：指数运算" },
                { id: "f2", latex: "\\log_3 81 = 4", translation: "回程：对数运算，回到指数 4" },
                { id: "f3", latex: "2^{\\log_2 5} = 5", translation: "先对数后指数：回到 5——互逆的铁证" }
              ],
              hints: [
                "互逆=输入输出互换：2³=8 与 log₂8=3 说的是一回事。",
                "a^(logₐN)=N，logₐ(aˣ)=x：一去一回，原地踏步。"
              ],
              id: "ch08-u2-l3-p1b",
              interaction: {
                params: {
                  labels: [ "指数之旅：x→2ˣ", "对数之旅：x→log₂x" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "2^x",
                      label: "x",
                      max: 3,
                      min: -3,
                      step: 0.25,
                      target: 8,
                      targetLabel: "目标 8"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "log2(x)",
                      label: "x",
                      max: 8,
                      min: 0.2,
                      step: 0.2,
                      target: 3,
                      targetLabel: "目标 3"
                    }
                  }
                },
                type: "side-compare"
              },
              title: "互逆：去程与回程",
              prev: "ch08-u2-l3-p1",
              next: "ch08-u2-l3-p1g"
            },
            {
              auxInteraction: null,
              concept: "图形：指数与对数关于 y=x 对称",
              examples: [
                {
                  figure: "数形结合",
                  text: "10²=100 与 lg100=2：点 (2,100) 与 (100,2) 关于 y=x 对称。"
                }
              ],
              formulas: [
                { id: "f1", latex: "(3, 8), (8, 3)", translation: "点 (3,8) 在指数曲线上；翻转成 (8,3) 落在对数曲线上" },
                { id: "f2", latex: "y = x", translation: "对称轴 y=x：两条曲线关于它镜像对称" }
              ],
              hints: [
                "左图描出 (3,8)，右图描出 (8,3)：横纵坐标互换。",
                "互逆=输入输出互换：图像上就是关于 y=x 翻转。"
              ],
              id: "ch08-u2-l3-p1g",
              interaction: {
                params: {
                  labels: [ "y=2ˣ", "y=log₂x：关于 y=x 镜像" ],
                  left: {
                    kind: "plot-points",
                    params: {
                      autoPlay: true,
                      fn: "2^x",
                      speed: 500,
                      step: 0.5,
                      xMax: 3,
                      xMin: -3
                    }
                  },
                  right: {
                    kind: "plot-points",
                    params: {
                      autoPlay: true,
                      fn: "log2(x)",
                      speed: 500,
                      step: 0.5,
                      xMax: 8,
                      xMin: 0.1
                    }
                  }
                },
                type: "side-compare"
              },
              title: "镜像：关于 y=x 对称",
              prev: "ch08-u2-l3-p1b",
              next: "ch08-u2-l4-p1"
            }
          ]
        },
        {
          id: "ch08-u2-l4",
          title: "对数的运算",
          pages: [
            {
              id: "ch08-u2-l4-p1",
              title: "对数运算法则：真数相乘，对数相加",
              concept: "对数的运算法则",
              formulas: [
                {
                  id: "f1",
                  latex: "\\log_a (MN) = \\log_a M + \\log_a N (a > 0, a \\neq 1, M > 0, N > 0)",
                  translation: "以 a 为底 MN 的对数，等于以 a 为底 M 的对数加 N 的对数（条件齐全）：真数相乘，对数相加"
                },
                {
                  id: "f2",
                  latex: "\\log_a (M^k) = k \\cdot \\log_a M (a > 0, a \\neq 1, M > 0)",
                  translation: "以 a 为底 M 的 k 次幂的对数，等于 k 乘以以 a 为底 M 的对数：幂的指数提到前面变成系数"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "m",
                    min: 1,
                    max: 5,
                    step: 1,
                    initial: 2
                  },
                  views: [
                    { kind: "readout", expr: "2^m", label: "M=2ᵐ" },
                    { kind: "readout", expr: "2^m*4", label: "MN（N=4 固定）" },
                    { kind: "readout", expr: "m+2", label: "log₂(MN)=log₂M+log₂4" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖 m：第三个读数恒为 log₂M+log₂4——真数相乘对数相加。",
                "第二法则：logₐ(Mᵏ)=k·logₐM——Mᵏ 对数取 k 倍。"
              ],
              examples: [
                { text: "log₂(8×4)=log₂8+log₂4=3+2=5：乘法变加法，计算变简单", figure: "仪表盘" }
              ],
              prev: "ch08-u2-l3-p1g",
              next: "ch08-u2-l4-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：对数的运算法则",
              examples: [
                { figure: "变式练习", text: "lg200=lg(2×100)=lg2+2≈2.301。" }
              ],
              formulas: [
                { id: "f1", latex: "\\log_2 48", translation: "48=16×3：真数是乘积" },
                {
                  id: "f2",
                  latex: "\\log_2 48 = \\log_2 16 + \\log_2 3",
                  translation: "=4+log₂3：真数相乘，对数相加"
                },
                {
                  id: "f3",
                  latex: "\\log_2 \\frac{1}{8} = -3",
                  translation: "真数相除，对数相减：log₂1−log₂8=0−3=−3"
                }
              ],
              hints: [
                "三大法则：乘→加，除→减，幂→乘（指数变系数）。",
                "法则的反向也常用：log₂8+log₂4=log₂32——加变乘。"
              ],
              id: "ch08-u2-l4-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 2,
                    label: "m",
                    max: 5,
                    min: 1,
                    step: 1
                  },
                  views: [
                    { expr: "2^m", kind: "readout", label: "M=2ᵐ" },
                    { expr: "2^m*4", kind: "readout", label: "MN（N=4 固定）" },
                    { expr: "m+2", kind: "readout", label: "log₂(MN)=log₂M+log₂4" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "对数法则：乘变加",
              prev: "ch08-u2-l4-p1",
              next: "ch08-u2-l5-p1"
            }
          ]
        },
        {
          id: "ch08-u2-l5",
          title: "指数对数方程",
          pages: [
            {
              id: "ch08-u2-l5-p1",
              title: "方程的解是交点的横坐标",
              concept: "方程的解是图像交点的横坐标",
              formulas: [
                {
                  id: "f1",
                  latex: "2^x = x + 1",
                  translation: "2 的 x 次方等于 x 加 1：左边是指数函数，右边是直线，解就是两条曲线交点的横坐标"
                },
                { id: "f2", latex: "x = 0, x = 1", translation: "恰有两个解：x=0（1=1）和 x=1（2=2），代入检验都成立" }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "2^x",
                  xMin: -2,
                  xMax: 3,
                  step: 0.5,
                  autoPlay: true,
                  speed: 600
                }
              },
              auxInteraction: {
                type: "plot-points",
                params: {
                  fn: "x+1",
                  xMin: -2,
                  xMax: 3,
                  step: 0.5,
                  autoPlay: true,
                  speed: 600
                }
              },
              hints: [
                "两条曲线都画出来：交于 x=0 和 x=1——方程的解就是交点的横坐标。",
                "代入检验：x=0 得 1=1，x=1 得 2=2——解恰有两个。"
              ],
              examples: [
                { text: "跃升 3 的回声：二次方程的解也是抛物线与横轴交点的横坐标", figure: "描点成像" }
              ],
              prev: "ch08-u2-l4-p1b",
              next: "ch08-u2-l5-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：用图像解方程",
              examples: [
                { figure: "变式练习", text: "(1/2)ˣ=x+1：画出来交于 x=0（1=1）。" }
              ],
              formulas: [
                { id: "f1", latex: "3^x = 9", translation: "左边指数曲线，右边水平直线 y=9" },
                { id: "f2", latex: "x = 2", translation: "交点横坐标 x=2：3²=9" }
              ],
              hints: [
                "图像解方程三步：左右两边各画一条曲线；找交点；读横坐标。",
                "交点个数=解的个数：没交点就无解。"
              ],
              id: "ch08-u2-l5-p1b",
              interaction: {
                params: {
                  autoPlay: true,
                  fn: "3^x",
                  speed: 600,
                  step: 0.5,
                  xMax: 3,
                  xMin: -1
                },
                type: "plot-points"
              },
              title: "图像解方程：找交点",
              prev: "ch08-u2-l5-p1",
              next: "ch08-u2-l6-p1"
            }
          ]
        },
        {
          id: "ch08-u2-l6",
          title: "互逆小结",
          pages: [
            {
              id: "ch08-u2-l6-p1",
              title: "互逆小结：指数与对数",
              concept: "指数与对数互为反函数",
              formulas: [
                {
                  id: "f1",
                  latex: "y = a^x (a > 0, a \\neq 1)",
                  translation: "指数函数：y 等于 a 的 x 次方（a 大于 0 且 a 不为 1）"
                },
                {
                  id: "f2",
                  latex: "y = \\log_a x (a > 0, a \\neq 1, x > 0)",
                  translation: "对数函数：y 等于以 a 为底 x 的对数（a 大于 0 且 a 不为 1，x 大于 0）——指数函数的反函数"
                },
                {
                  id: "f3",
                  latex: "\\log_a (a^x) = x",
                  translation: "以 a 为底 a 的 x 次方的对数等于 x：先指数后对数，回到 x——互逆的铁证"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: -3,
                      max: 3,
                      step: 0.25,
                      label: "x",
                      expr: "2^x",
                      target: 8,
                      targetLabel: "目标 8（2³=8）"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: 0.2,
                      max: 8,
                      step: 0.2,
                      label: "x",
                      expr: "log2(x)",
                      target: 3,
                      targetLabel: "目标 3（log₂8=3）"
                    }
                  },
                  labels: [ "指数之旅：x → 2ˣ（去程）", "对数之旅：x → log₂x（回程）" ]
                }
              },
              auxInteraction: null,
              hints: [
                "去程 x=3：2³=8；回程 x=8：log₂8=3。",
                "定义域值域互换：y=2ˣ 输出恒大于 0，即 y=log₂x 的输入（x>0）。"
              ],
              examples: [
                { text: "10²=100 与 lg100=2：常用对数是以 10 为底的特例", figure: "并排对比" }
              ],
              prev: "ch08-u2-l5-p1b",
              next: "ch08-u2-l6-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：指数与对数互为反函数",
              examples: [
                { figure: "变式练习", text: "y=10ˣ 与 y=lgx：一个定义域 R，一个 x>0。" }
              ],
              formulas: [
                { id: "f1", latex: "y = 2^x: x \\in R, y > 0", translation: "指数函数：x 任意实数，y 恒大于 0" },
                {
                  id: "f2",
                  latex: "y = \\log_2 x: x > 0, y \\in R",
                  translation: "对数函数：x 大于 0，y 任意实数——定义域值域互换"
                }
              ],
              hints: [
                "互逆的两大表现：运算互逆（a^(logₐN)=N），定义域值域互换。",
                "记住一句话：指数管“乘方”，对数管“问几次方”。"
              ],
              id: "ch08-u2-l6-p1b",
              interaction: {
                params: {
                  labels: [ "指数之旅：x→2ˣ（去程）", "对数之旅：x→log₂x（回程）" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "2^x",
                      label: "x",
                      max: 3,
                      min: -3,
                      step: 0.25,
                      target: 8,
                      targetLabel: "目标 8（2³=8）"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "log2(x)",
                      label: "x",
                      max: 8,
                      min: 0.2,
                      step: 0.2,
                      target: 3,
                      targetLabel: "目标 3（log₂8=3）"
                    }
                  }
                },
                type: "side-compare"
              },
              title: "互逆小结：域值互换",
              prev: "ch08-u2-l6-p1",
              next: "ch08-u3-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch08-u3",
      title: "三角函数初探（选学）",
      lessons: [
        {
          id: "ch08-u3-l1",
          title: "弧度制（选学）",
          pages: [
            {
              id: "ch08-u3-l1-p1",
              title: "弧度制：180 度 = π（弧度）",
              concept: "弧度制（选学）",
              formulas: [
                { id: "f1", latex: "\\pi = 180\\text{度}", translation: "180 度等于 π（弧度）：π 弧度就是半圈" },
                {
                  id: "f2",
                  latex: "\\text{弧度} = \\text{角度} \\times \\frac{\\pi}{180}",
                  translation: "角度乘以 π 除以 180 就是弧度：比如 90 度等于 π/2（弧度）"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 360,
                  step: 30,
                  label: "d",
                  expr: "d*π/180"
                }
              },
              auxInteraction: null,
              hints: [
                "拖 d：d=180 时读数是 π（约 3.142）——180 度等于 π 弧度。",
                "弧度用弧长量角度：单位圆上，弧长是多少，角度就是多少弧度。"
              ],
              examples: [
                { text: "钟表：时针转半圈是 180 度，也是 π 弧度", figure: "滑块" }
              ],
              prev: "ch08-u2-l6-p1b",
              next: "ch08-u3-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：弧度制（选学）",
              examples: [
                { figure: "变式练习", text: "60°=π/3 弧度；3π/2 弧度=270°。" }
              ],
              formulas: [
                { id: "f1", latex: "2\\pi = 360\\text{度}", translation: "一圈：2π 弧度 = 360 度" },
                { id: "f2", latex: "\\frac{\\pi}{6} = 30\\text{度}", translation: "π/6 弧度 = 30 度" }
              ],
              hints: [
                "弧度=弧长：单位圆上走多长，角度就是多少弧度。",
                "常用：π/6=30°，π/4=45°，π/3=60°，π/2=90°。"
              ],
              id: "ch08-u3-l1-p1b",
              interaction: {
                params: {
                  expr: "d*π/180",
                  label: "d",
                  max: 360,
                  min: 0,
                  step: 30
                },
                type: "slider-lab"
              },
              title: "弧度：用弧长量角（选学）",
              prev: "ch08-u3-l1-p1",
              next: "ch08-u3-l2-p1"
            }
          ]
        },
        {
          id: "ch08-u3-l2",
          title: "正弦与余弦（选学）",
          pages: [
            {
              id: "ch08-u3-l2-p1",
              title: "正弦与余弦：单位圆上点的坐标",
              concept: "正弦与余弦的单位圆定义（选学）",
              formulas: [
                {
                  id: "f1",
                  latex: "(\\cos t, \\sin t)",
                  translation: "单位圆上角度 t 对应的点是 (cos t, sin t)：余弦是横坐标，正弦是纵坐标"
                },
                { id: "f2", latex: "y = \\sin x", translation: "y 等于 sin x：把每个 t 的 sin t 画成点，连起来就是正弦曲线" }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "sin(x)",
                  xMin: 0,
                  xMax: 6.3,
                  step: 0.2,
                  autoPlay: true,
                  speed: 400
                }
              },
              auxInteraction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "t",
                    min: 0,
                    max: 6.3,
                    step: 0.1,
                    initial: 0
                  },
                  views: [
                    { kind: "readout", expr: "sin(t)", label: "sin t" },
                    { kind: "readout", expr: "cos(t)", label: "cos t" },
                    {
                      kind: "point",
                      xExpr: "cos(t)",
                      yExpr: "sin(t)",
                      axisLabelX: "x",
                      axisLabelY: "y"
                    }
                  ]
                }
              },
              hints: [
                "拖 t：单位圆上 (cos t, sin t) 转圈，纵坐标画出正弦曲线。",
                "t 从 0 到约 6.3（≈2π）转满一圈：一个波形就是一个周期。"
              ],
              examples: [ { text: "摩天轮座舱的高度随时间起伏：正弦曲线", figure: "描点成像" } ],
              prev: "ch08-u3-l1-p1b",
              next: "ch08-u3-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：正弦与余弦（选学）",
              examples: [
                { figure: "变式练习", text: "t=π/4：(√2/2, √2/2)，sin45°=cos45°。" }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "(\\cos \\frac{\\pi}{2}, \\sin \\frac{\\pi}{2}) = (0, 1)",
                  translation: "转到 90°：点在 (0,1)，sin90°=1"
                },
                {
                  id: "f2",
                  latex: "(\\cos \\pi, \\sin \\pi) = (-1, 0)",
                  translation: "转到 180°：点在 (−1,0)，cos180°=−1"
                }
              ],
              hints: [
                "cos 是横坐标，sin 是纵坐标：转到哪，坐标读到哪。",
                "sin²t+cos²t=1：单位圆半径是 1，勾股定理。"
              ],
              id: "ch08-u3-l2-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 1.57,
                    label: "t",
                    max: 6.3,
                    min: 0,
                    step: 0.1
                  },
                  views: [
                    { expr: "sin(t)", kind: "readout", label: "sin t" },
                    { expr: "cos(t)", kind: "readout", label: "cos t" },
                    {
                      axisLabelX: "x",
                      axisLabelY: "y",
                      kind: "point",
                      xExpr: "cos(t)",
                      yExpr: "sin(t)"
                    }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "正弦余弦：横纵坐标（选学）",
              prev: "ch08-u3-l2-p1",
              next: "ch08-u3-l3-p1"
            }
          ]
        },
        {
          id: "ch08-u3-l3",
          title: "本章小结",
          pages: [
            {
              id: "ch08-u3-l3-p1",
              title: "一图流：指数、对数与正弦",
              concept: "本章知识串联",
              formulas: [
                {
                  id: "f1",
                  latex: "y = a^x, y = \\log_a x (a > 0, a \\neq 1)",
                  translation: "指数与对数互逆：一个把真数相乘变成对数相加，一个倒着走回来"
                },
                { id: "f2", latex: "y = \\sin x", translation: "正弦（选学）：单位圆纵坐标的变化，周期性波动" }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: -3,
                      max: 3,
                      step: 0.5,
                      label: "x",
                      expr: "2^x"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: 0,
                      max: 6.3,
                      step: 0.3,
                      label: "t",
                      expr: "sin(t)"
                    }
                  },
                  labels: [ "指数爆炸 y=2ˣ：越涨越快", "周期波动 y=sin t：涨落循环（选学）" ]
                }
              },
              auxInteraction: null,
              hints: [
                "三条主线：指数推广（负、分数）→ 指数对数互逆 → 三角初探（选学）。",
                "记住：对数是指数的逆问题——2⁵=32 反问 32 是 2 的几次方。"
              ],
              examples: [
                { text: "折纸 30 次 ≈ 107374 米：指数爆炸的威力", figure: "并排对比" }
              ],
              prev: "ch08-u3-l2-p1b",
              next: "ch08-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch08-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch08-ux-l1",
          title: "第八章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．1/16；2．3；3．6；4．3；5．4（=log₃81）；6．衰减；7．x=3"
                }
              ],
              formulas: [
                { id: "f1", latex: "2^x = 8", translation: "第 7 题：x=3；或取对数 x=log₂8=3" }
              ],
              hints: [
                "1．2⁻⁴=____。",
                "2．27 的 1/3 次方=____。",
                "3．log₂64=____。",
                "4．lg1000=____。",
                "5．log₃27+log₃3=____。",
                "6．y=(1/2)ˣ 是____（增长/衰减）函数。",
                "7．方程 2ˣ=8 的解是____。"
              ],
              id: "ch08-ux-l1-p1",
              interaction: {
                params: {
                  expr: "2^x",
                  label: "x",
                  max: 6,
                  min: 1,
                  step: 1,
                  target: 8,
                  targetLabel: "2³=8（第 7 题）"
                },
                type: "slider-lab"
              },
              title: "第八章习题：指数对数",
              prev: "ch08-u3-l3-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
