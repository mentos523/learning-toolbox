/* ============================================================
 * 学习工具箱 · 数学 · 代数 第八章：指数与对数（12 页）
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
                  target: 1/8,
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
              prev: "ch08-u1-l1-p1",
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
                {
                  id: "f1",
                  latex: "y = 2^x",
                  translation: "y 等于 2 的 x 次方：x 取任意实数，所有点连成一条不断裂的曲线"
                },
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
              prev: "ch08-u1-l2-p1",
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
              prev: "ch08-u1-l3-p1",
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
                {
                  id: "f1",
                  latex: "2^5 = 32",
                  translation: "2 的 5 次方等于 32：顺着问——2 的 5 次方是几"
                },
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
                { text: "一张纸对折 5 次，厚度变成 32 倍：log₂32=5——每对折一次，厚度就乘以 2", figure: "滑块" }
              ],
              prev: "ch08-u2-l1-p1",
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
                {
                  id: "f1",
                  latex: "y = 2^x",
                  translation: "指数函数 y 等于 2 的 x 次方：输入 x，输出 2ˣ"
                },
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
                    params: { min: -3, max: 3, step: 0.25, label: "x", expr: "2^x", target: 8, targetLabel: "目标 8（2³=8）" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: 0.2, max: 8, step: 0.2, label: "x", expr: "log2(x)", target: 3, targetLabel: "目标 3（log₂8=3）" }
                  },
                  labels: ["指数函数 y=2ˣ：关于直线 y=x 对称", "对数函数 y=log₂x：关于直线 y=x 对称"]
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
              prev: "ch08-u2-l2-p1",
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
                  source: { label: "m", min: 1, max: 5, step: 1, initial: 2 },
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
              prev: "ch08-u2-l3-p1",
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
                {
                  id: "f2",
                  latex: "x = 0, x = 1",
                  translation: "恰有两个解：x=0（1=1）和 x=1（2=2），代入检验都成立"
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
              prev: "ch08-u2-l4-p1",
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
                    params: { min: -3, max: 3, step: 0.25, label: "x", expr: "2^x", target: 8, targetLabel: "目标 8（2³=8）" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: 0.2, max: 8, step: 0.2, label: "x", expr: "log2(x)", target: 3, targetLabel: "目标 3（log₂8=3）" }
                  },
                  labels: ["指数之旅：x → 2ˣ（去程）", "对数之旅：x → log₂x（回程）"]
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
              prev: "ch08-u2-l5-p1",
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
                {
                  id: "f1",
                  latex: "\\pi = 180\\text{度}",
                  translation: "180 度等于 π（弧度）：π 弧度就是半圈"
                },
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
              prev: "ch08-u2-l6-p1",
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
                {
                  id: "f2",
                  latex: "y = \\sin x",
                  translation: "y 等于 sin x：把每个 t 的 sin t 画成点，连起来就是正弦曲线"
                }
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
                  source: { label: "t", min: 0, max: 6.3, step: 0.1, initial: 0 },
                  views: [
                    { kind: "readout", expr: "sin(t)", label: "sin t" },
                    { kind: "readout", expr: "cos(t)", label: "cos t" },
                    { kind: "point", xExpr: "cos(t)", yExpr: "sin(t)", axisLabelX: "x", axisLabelY: "y" }
                  ]
                }
              },
              hints: [
                "拖 t：单位圆上 (cos t, sin t) 转圈，纵坐标画出正弦曲线。",
                "t 从 0 到约 6.3（≈2π）转满一圈：一个波形就是一个周期。"
              ],
              examples: [
                { text: "摩天轮座舱的高度随时间起伏：正弦曲线", figure: "描点成像" }
              ],
              prev: "ch08-u3-l1-p1",
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
                {
                  id: "f2",
                  latex: "y = \\sin x",
                  translation: "正弦（选学）：单位圆纵坐标的变化，周期性波动"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: -3, max: 3, step: 0.5, label: "x", expr: "2^x" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: 0, max: 6.3, step: 0.3, label: "t", expr: "sin(t)" }
                  },
                  labels: ["指数爆炸 y=2ˣ：越涨越快", "周期波动 y=sin t：涨落循环（选学）"]
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
              prev: "ch08-u3-l2-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
