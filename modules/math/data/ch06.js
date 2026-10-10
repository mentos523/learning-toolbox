/* ============================================================
 * 学习工具箱 · 数学 · 代数 第六章：函数与一次函数（10 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第六章 v2.0）。
 * 黄队教学流（docs/math-algebra-pedagogy.md 五条铁律 + 跃升 4 脚手架）。
 *
 * 页面：u0-l1-p1 方程求解，函数看关系（6.0.1 静与动：机器隐喻）
 *       u0-l1-p2 机器的工作记录连成线（6.0.1：描点成像）
 *       u1-l1-p1 会动的数与不会动的数（6.1.1 变量与常量）
 *       u1-l2-p1 每个 x 都有唯一的 y（6.1.2 函数的定义：唯一对应）
 *       u1-l3-p1 一种关系，三种写法（6.1.3 解析式/列表/图像）
 *       u2-l1-p1 正比例：过原点的直线（6.2.1 y=kx）
 *       u2-l2-p1 b 让直线上下平移（6.2.2 y=kx+b、截距）
 *       u2-l3-p1 k 定上坡还是下坡（6.2.3 增减性）
 *       u2-l4-p1 方程不等式的大会师（6.2.4 交点=方程的解、上方=不等式的解）
 *       u2-l5-p1 本章小结：一图流
 * 交互复用已实现渲染器：linked-dashboard（x 滑块→y 读数→坐标点三联动）/
 * plot-points（描点成像）/ slider-lab（label 均为纯变量名）/
 * side-compare（并排对比，sync 联动）。无需新交互渲染器。
 * 前五批教训落实：
 *   - slider-lab label 全部用纯变量名（"x"/"k"/"b"），无中文括号
 *   - hints 每页 ≤ 2 条、总字数 ≤ 70 字（防 390px 裁剪）
 *   - 定义完整：函数定义给出"唯一对应"+多对一说明；正比例/一次函数
 *     注明 k≠0 的适用范围；增减性注明与 b 无关
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch06"] = {
  id: "ch06",
  title: "函数与一次函数",
  units: [
    {
      id: "ch06-u0",
      title: "过渡：从方程到函数",
      lessons: [
        {
          id: "ch06-u0-l1",
          title: "静与动：为什么需要函数",
          pages: [
            {
              id: "ch06-u0-l1-p1",
              title: "方程求解，函数看关系",
              concept: "函数与方程的区别",
              formulas: [
                {
                  id: "f1",
                  latex: "x + 2 = 5",
                  translation: "x 加 2 等于 5：方程——求一个确定的 x"
                },
                {
                  id: "f2",
                  latex: "y = x + 2",
                  translation: "y 等于 x 加 2：函数——x 动起来，y 跟着变"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: { label: "x", min: 0, max: 5, step: 0.5, initial: 2 },
                  views: [
                    { kind: "readout", expr: "x + 2", label: "y" },
                    { kind: "point", xExpr: "x", yExpr: "x + 2" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖动 x：同一台机器“加 2”，x 滑过去 y 就跟着变。",
                "方程问“输出 5 时投入几”，函数问“投入变时输出怎么变”。"
              ],
              examples: [
                { text: "自动售货机：投币 x 元，出货 y 件", figure: "仪表盘" }
              ],
              prev: null,
              next: "ch06-u0-l1-p2"
            },
            {
              id: "ch06-u0-l1-p2",
              title: "机器的工作记录连成线",
              concept: "函数图像的生成",
              formulas: [
                {
                  id: "f1",
                  latex: "y = 2x + 1",
                  translation: "y 等于 2x 加 1：这台机器的工作规则"
                },
                {
                  id: "f2",
                  latex: "(0, 1), (1, 3), (2, 5)",
                  translation: "三次工作记录：x 取 0、1、2 时，y 是 1、3、5"
                }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "2*x + 1",
                  xMin: -2,
                  xMax: 2,
                  step: 0.5,
                  autoPlay: true,
                  speed: 800
                }
              },
              auxInteraction: null,
              hints: [
                "点一个画一个：所有 (x, y) 工作记录连起来就是这条直线。",
                "函数图像 = 一台机器全部工作记录的画像。"
              ],
              examples: [
                { text: "快递轨迹：每个时刻的位置点连成路线图", figure: "描点成像" }
              ],
              prev: "ch06-u0-l1-p1",
              next: "ch06-u1-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch06-u1",
      title: "函数的概念",
      lessons: [
        {
          id: "ch06-u1-l1",
          title: "变量与常量",
          pages: [
            {
              id: "ch06-u1-l1-p1",
              title: "会动的数与不会动的数",
              concept: "变量与常量",
              formulas: [
                {
                  id: "f1",
                  latex: "S = 8 + 2.5x",
                  translation: "打车费 = 8 元起步价 + 每公里 2.5 元：x、S 是变量，8 和 2.5 是常量"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "8 + 2.5*x",
                  unit: "元"
                }
              },
              auxInteraction: null,
              hints: [
                "拖动 x（公里数）：S 跟着变，x 和 S 是变量；8 和 2.5 不动，是常量。",
                "变量常量是相对的：只在“这趟打车”这个变化过程里成立。"
              ],
              examples: [
                { text: "水池注水：时间是变量，每分钟出水量是常量", figure: "滑块" }
              ],
              prev: "ch06-u0-l1-p2",
              next: "ch06-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch06-u1-l2",
          title: "函数的定义",
          pages: [
            {
              id: "ch06-u1-l2-p1",
              title: "每个 x 都有唯一的 y",
              concept: "函数的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "y = x^2",
                  translation: "y 等于 x 的平方：x 每取一个确定值，y 都有唯一的值与它对应"
                },
                {
                  id: "f2",
                  latex: "(-2)^2 = 2^2 = 4",
                  translation: "负 2 和 2 的平方都是 4：两个 x 对应同一个 y，仍然是函数"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: { label: "x", min: -3, max: 3, step: 1, initial: 0 },
                  views: [
                    { kind: "readout", expr: "x^2", label: "y" },
                    { kind: "point", xExpr: "x", yExpr: "x^2" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "x=2 与 x=−2 都对应 y=4：多对一仍是函数；一个 x 对应两个 y 则不是。",
                "x 每取一个确定值（在允许范围内），y 都有唯一确定的值与之对应。",],
              examples: [
                { text: "身份证号→人：一一对应；班级→班主任：多对一", figure: "仪表盘" }
              ],
              prev: "ch06-u1-l1-p1",
              next: "ch06-u1-l3-p1"
            }
          ]
        },
        {
          id: "ch06-u1-l3",
          title: "函数的表示法",
          pages: [
            {
              id: "ch06-u1-l3-p1",
              title: "一种关系，三种写法",
              concept: "函数的三种表示法",
              formulas: [
                {
                  id: "f1",
                  latex: "y = 2x + 3",
                  translation: "解析式：用式子写出规则"
                },
                {
                  id: "f2",
                  latex: "(0, 3), (1, 5), (2, 7)",
                  translation: "列表法：x 取 0、1、2 时，y 是 3、5、7"
                }
              ],
              interaction: {
                type: "plot-points",
                params: {
                  fn: "2*x + 3",
                  xMin: -2,
                  xMax: 3,
                  step: 1,
                  autoPlay: true,
                  speed: 800
                }
              },
              auxInteraction: null,
              hints: [
                "解析式→列表：代入 x 算 y；列表→图像：把 (x, y) 逐点画出来。",
                "三种写法说的是同一件事，考试常考互相翻译。"
              ],
              examples: [
                { text: "心电图：时间→心跳的图像表示", figure: "描点成像" }
              ],
              prev: "ch06-u1-l2-p1",
              next: "ch06-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch06-u2",
      title: "一次函数",
      lessons: [
        {
          id: "ch06-u2-l1",
          title: "正比例函数",
          pages: [
            {
              id: "ch06-u2-l1-p1",
              title: "正比例函数的图像：过原点的直线",
              concept: "正比例函数的定义与图像",
              formulas: [
                {
                  id: "f1",
                  latex: "y = kx (k \\neq 0)",
                  translation: "y 等于 kx（k 不为 0）：正比例函数的定义；x 取 0 时 y 一定是 0，所以图像必过原点"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: { label: "k", min: -3, max: 3, step: 0.5, initial: 1 },
                  views: [
                    { kind: "readout", expr: "2*k", label: "y" },
                    { kind: "point", xExpr: "2", yExpr: "2*k" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖 k：直线绕原点转；k>0 上坡，k<0 下坡，|k| 越大越陡。",
                "k=0 时 y=0（x 轴），不是正比例函数（k≠0）。",],
              examples: [
                { text: "匀速跑步：路程 = 速度 × 时间，过原点的直线", figure: "仪表盘" }
              ],
              prev: "ch06-u1-l3-p1",
              next: "ch06-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch06-u2-l2",
          title: "一次函数的图像",
          pages: [
            {
              id: "ch06-u2-l2-p1",
              title: "b 让直线上下平移",
              concept: "一次函数的图像与平移",
              formulas: [
                {
                  id: "f1",
                  latex: "y = kx + b (k \\neq 0)",
                  translation: "y 等于 kx 加 b（k 不为 0）：一次函数的定义"
                },
                {
                  id: "f2",
                  latex: "(0, b)",
                  translation: "x 取 0 时 y 等于 b：直线与 y 轴交于 (0, b)，b 叫截距"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: -3, max: 3, step: 0.5, label: "k", expr: "k*2 + 1" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: -3, max: 3, step: 0.5, label: "b", expr: "4 + b" }
                  },
                  labels: ["k 转：b 固定为 1", "b 移：k 固定为 2"]
                }
              },
              auxInteraction: null,
              hints: [
                "左拖 k 转直线，右拖 b 上下平移；b 是直线与 y 轴交点的纵坐标（截距）。",
                "左图 k=0 时是常数函数 y=1，不是一次函数（k≠0）。",],
              examples: [
                { text: "打车费 S=8+2.5x：b=8 是起步价，直线不经过原点", figure: "并排对比" }
              ],
              prev: "ch06-u2-l1-p1",
              next: "ch06-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch06-u2-l3",
          title: "一次函数的性质",
          pages: [
            {
              id: "ch06-u2-l3-p1",
              title: "k 定上坡还是下坡",
              concept: "一次函数的增减性",
              formulas: [
                {
                  id: "f1",
                  latex: "y = 2x + 1",
                  translation: "k=2 大于 0：x 增大时 y 也增大——上坡"
                },
                {
                  id: "f2",
                  latex: "y = -2x + 1",
                  translation: "k=−2 小于 0：x 增大时 y 减小——下坡"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: { min: -2, max: 5, step: 0.5, label: "x", expr: "2*x + 1" }
                  },
                  right: {
                    kind: "slider-lab",
                    params: { min: -2, max: 5, step: 0.5, label: "x", expr: "-2*x + 1" }
                  },
                  sync: ["x"],
                  labels: ["上坡：y=2x+1", "下坡：y=−2x+1"]
                }
              },
              auxInteraction: null,
              hints: [
                "两边同步拖 x：左边 y 跟着涨，右边 y 反而跌。",
                "k>0 递增（上坡），k<0 递减（下坡）；与 b 无关。"
              ],
              examples: [
                { text: "水池注水 vs 水池漏水：一个水位涨，一个水位跌", figure: "并排对比" }
              ],
              prev: "ch06-u2-l2-p1",
              next: "ch06-u2-l4-p1"
            }
          ]
        },
        {
          id: "ch06-u2-l4",
          title: "一次函数与方程、不等式",
          pages: [
            {
              id: "ch06-u2-l4-p1",
              title: "方程不等式的大会师",
              concept: "一次函数与方程、不等式",
              formulas: [
                {
                  id: "f1",
                  latex: "2x - 4 = 0",
                  translation: "2x 减 4 等于 0：解是 x=2——直线与 x 轴交点的横坐标"
                },
                {
                  id: "f2",
                  latex: "2x - 4 > 0",
                  translation: "2x 减 4 大于 0：解是 x>2——直线在 x 轴上方的那一段"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: { label: "x", min: 0, max: 4, step: 0.5, initial: 1 },
                  views: [
                    { kind: "readout", expr: "2*x - 4", label: "y" },
                    { kind: "point", xExpr: "x", yExpr: "2*x - 4" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖到 y=0 处：x=2 就是方程 2x−4=0 的解。",
                "y>0 的点都在 x 轴上方——不等式 2x−4>0 的解是 x>2。"
              ],
              examples: [
                { text: "第五章的“分界点”：先解等号，再看一边", figure: "仪表盘" }
              ],
              prev: "ch06-u2-l3-p1",
              next: "ch06-u2-l5-p1"
            }
          ]
        },
        {
          id: "ch06-u2-l5",
          title: "本章小结",
          pages: [
            {
              id: "ch06-u2-l5-p1",
              title: "一图流：从机器到直线",
              concept: "本章知识串联",
              formulas: [
                {
                  id: "f1",
                  latex: "y = kx + b (k \\neq 0)",
                  translation: "一次函数：k 定倾斜与增减，b 定上下位置"
                },
                {
                  id: "f2",
                  latex: "y = kx",
                  translation: "b=0 时退化为正比例函数，图像必过原点"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -2,
                  max: 5,
                  step: 0.5,
                  label: "x",
                  expr: "2*x + 1",
                  target: 0,
                  targetLabel: "y=0：交点"
                }
              },
              auxInteraction: null,
              hints: [
                "路线：机器（函数）→ 三种表示法 → 正比例 → 一次函数 → 大会师。",
                "记住 k 和 b 的分工：k 管倾斜增减，b 管上下位置。"
              ],
              examples: [
                { text: "y=2x+1 上拖 x：经过 y=0 时 x=−0.5，就是方程的解", figure: "滑块" }
              ],
              prev: "ch06-u2-l4-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
