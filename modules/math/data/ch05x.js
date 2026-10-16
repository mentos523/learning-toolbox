/* ch05x: 二元一次方程组（前置单元，2026-10-16 波A新建）
 * 位置：ch05（一元一次不等式）之后、ch06（一次函数）之前
 * 课案依据：math-rectify/sys-eq-draft-reviewed.md（绿队审查定稿，H1–H7/M1–M10 已落实）
 * 交互类型：sys-lab / sys-steps / eq-graph-lab(system2x2) / static-compare（见 js/eq-bind.js）
 */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch05x"] = {
  id: "ch05x",
  title: "二元一次方程组",
  grade: "七年级下",
  units: [
    {
      id: "ch05x-u1",
      title: "二元一次方程组与代入消元法",
      lessons: [
        {
          id: "ch05x-u1-l1",
          title: "方程组：两个方程定住两个未知数",
          pages: [
            {
              id: "ch05x-u1-l1-p1",
              title: "一个方程，两个未知数：解有无数个",
              concept: "二元一次方程",
              formulas: [
                { id: "f1", latex: "x + y = 10", translation: "x 加 y 等于 10：两个未知数，一个方程" },
                { id: "f2", latex: "(1, 9), (2, 8), (5, 5), (10, 0)", translation: "都是解：1+9=10，2+8=10……怎么代都对" },
                { id: "f3", latex: "y = 10 - x", translation: "y 等于 10 减 x：x 定了，y 就定了——解有无数个" }
              ],
              interaction: {
                type: "sys-lab",
                params: {
                  sliders: [
                    { id: "x", label: "x", min: -10, max: 10, step: 1, initial: 1 },
                    { id: "y", label: "y", min: -10, max: 10, step: 1, initial: 9 }
                  ],
                  derived: [
                    { id: "sum", expr: "x + y", label: "x + y" }
                  ],
                  readouts: [
                    { expr: "x + y - 10", target: 0, label: "离 10 差多少", okText: "✓ 是解", noText: "还不是解" }
                  ],
                  point: {
                    xExpr: "x", yExpr: "10 - x",
                    xRange: [-10, 10], yRange: [-10, 10],
                    caption: "点 (x, 10−x) 同步走——直线雏形"
                  },
                  target: { expr: "x + y", value: 10, label: "等于 10 的组合" }
                },
                engine: { primitive: "SysLab", version: "2026.10.16.A", params: { sliders: ["x", "y"] } }
              },
              examples: [
                { text: "猜数：我想了两个数，和是 10——你猜是哪两个？", figure: "滑块" }
              ],
              hints: [
                "拖出 (1,9)、(2,8)、(5,5)、(10,0)……发现怎么都对。",
                "一个方程定不住两个未知数：x 变，y 跟着变，解有无数个。",
                "右边的点 (x, 10−x) 在坐标系里走出的是一条直线——为后面铺垫。"
              ],
              prev: null,
              next: "ch05x-u1-l1-p2"
            },
            {
              id: "ch05x-u1-l1-p2",
              title: "两个方程，解就定了：方程组的解",
              concept: "二元一次方程组",
              formulas: [
                { id: "f1", latex: "x + y = 10", translation: "方程组①：x 加 y 等于 10" },
                { id: "f2", latex: "2x - y = 8", translation: "方程组②：2x 减 y 等于 8——两个方程联立" },
                { id: "f3", latex: "(6, 4)", translation: "解是 (6,4)：6+4=10，2×6−4=8，两个都成立" }
              ],
              interaction: {
                type: "sys-lab",
                params: {
                  sliders: [
                    { id: "x", label: "x", min: -10, max: 10, step: 1, initial: 6 },
                    { id: "y", label: "y", min: -10, max: 10, step: 1, initial: 4 }
                  ],
                  readouts: [
                    { expr: "x + y - 10", target: 0, label: "第一式余数", okText: "✓ 第一式成立", noText: "第一式不成立" },
                    { expr: "2*x - y - 8", target: 0, label: "第二式余数", okText: "✓ 第二式成立", noText: "第二式不成立" }
                  ],
                  combine: {
                    label: "判是不是解",
                    rule: "双 target=0 同时命中",
                    okText: "✓ 是方程组的解",
                    noText: "还不是解：两个式子要同时成立"
                  },
                  note: "命中点 (6,4)：6+4−10=0，2×6−4−8=0"
                },
                engine: { primitive: "SysLab", version: "2026.10.16.A", params: { sliders: ["x", "y"], combine: true } }
              },
              examples: [
                { text: "鸡兔同笼原故事：头 10、脚 28。方程组 {x+y=10, 2x+4y=28}，同解 (6,4)。", figure: "对照" }
              ],
              hints: [
                "只满足一个式子不算：解要让两个方程同时成立。",
                "这里的两个方程是各说各话、互相独立的；如果两句话说的是同一件事（重合）或互相打架（平行），解的个数会不一样——u3-l1-p3 见分晓。",
                "例方程组 {x+y=10, 2x−y=8}（解 (6,4)）是本单元的运行例，后面反复用它。"
              ],
              prev: "ch05x-u1-l1-p1",
              next: "ch05x-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch05x-u1-l2",
          title: "代入消元法",
          pages: [
            {
              id: "ch05x-u1-l2-p1",
              title: "代入：把 x 的“化身”送进第二个方程",
              concept: "代入消元（直觉）",
              formulas: [
                { id: "f1", latex: "x = 10 - y", translation: "由①得：x 等于 10 减 y——x 的化身" },
                { id: "f2", latex: "2(10 - y) - y = 8", translation: "送进②：2 乘 (10 减 y) 减 y 等于 8" },
                { id: "f3", latex: "20 - 3y = 8 \\Rightarrow y = 4, x = 6", translation: "解得 y=4，回代得 x=6" }
              ],
              interaction: {
                type: "sys-steps",
                params: {
                  steps: [
                    { text: "① x = 10 − y：x 的化身", expr: "x", value: "10 - y" },
                    { text: "② 2(10−y) − y = 8：化身送进第二个方程", expr: "2*(10-y) - y", target: 8 },
                    { text: "③ 20 − 3y = 8 → y = 4：一元一次方程，会解了", expr: "20 - 3*y", target: 8 },
                    { text: "④ x = 6：回代检验，代回①②都成立", expr: "x + y", target: 10 }
                  ],
                  sliders: [
                    { id: "y", label: "y", min: -10, max: 10, step: 1, initial: 4 }
                  ],
                  derived: [
                    { id: "x", expr: "10 - y", label: "x = 10 − y" }
                  ],
                  caption: "拖 y，看 x 的化身如何变化——变形前后①还是同一条直线，交点不变"
                },
                engine: { primitive: "SysSteps", version: "2026.10.16.A", params: { steps: 4 } }
              },
              examples: [
                { text: "检验清单：代入① ✓、代入② ✓——两个都要验。", figure: "清单" }
              ],
              hints: [
                "代入的本质：用一个方程把 x 表示出来，送进另一个方程消掉 x。",
                "变形前后①式还是同一条直线——等价变形不改变交点。",
                "拖 y 到 4：x=6，读数 2×6−4=8 命中——检验语义：拖看第一式、读数看第二式。"
              ],
              prev: "ch05x-u1-l1-p2",
              next: "ch05x-u1-l2-p2"
            },
            {
              id: "ch05x-u1-l2-p2",
              title: "代入法三步：变形→代入→回代检验",
              concept: "代入消元（推导）",
              formulas: [
                { id: "f1", latex: "x + y = 10", translation: "例①：x+y=10" },
                { id: "f2", latex: "2x + y = 14", translation: "例②：2x+y=14" },
                { id: "f3", latex: "x = 10 - y \\Rightarrow 2(10-y) + y = 14", translation: "变形→代入：一元一次方程" },
                { id: "f4", latex: "y = 6, x = 4", translation: "解得 y=6，回代得 x=4；检验：4+6=10，8+6=14 ✓" }
              ],
              interaction: {
                type: "sys-lab",
                params: {
                  sliders: [
                    { id: "x", label: "x", min: -10, max: 10, step: 1, initial: 4 }
                  ],
                  derived: [
                    { id: "y", expr: "10 - x", label: "y 由①式导出：y = 10 − x" }
                  ],
                  readouts: [
                    { expr: "2*x + y - 14", target: 0, label: "第二式余数", okText: "✓ 命中：x=4 是解", noText: "拖 x 到 4 试试" }
                  ],
                  note: "例 {x+y=10, 2x+y=14}，解 (4,6)：拖 x 到 4 时 y=6，读数 2×4+6=14 命中"
                },
                engine: { primitive: "SysLab", version: "2026.10.16.A", params: { sliders: ["x"], derived: ["y"] } }
              },
              examples: [
                { text: "三步口诀：变形（把一个未知数表示出来）→代入（送进另一个方程）→回代检验。", figure: "口诀" }
              ],
              hints: [
                "y 由①式导出：拖 x，y 自动跟着变——这就是代入。",
                "检验清单：代入① ✓（4+6=10）、代入② ✓（8+6=14）。",
                "代入法的合法性来自 ch01 等式性质：等价变形不改变解。"
              ],
              prev: "ch05x-u1-l2-p1",
              next: "ch05x-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch05x-u2",
      title: "加减消元法",
      lessons: [
        {
          id: "ch05x-u2-l1",
          title: "加减：让一个未知数直接消失",
          pages: [
            {
              id: "ch05x-u2-l1-p1",
              title: "加减：让一个未知数直接消失",
              concept: "加减消元（直觉）",
              formulas: [
                { id: "f1", latex: "x + y = 10", translation: "例①：x+y=10" },
                { id: "f2", latex: "x - y = 2", translation: "例②：x−y=2" },
                { id: "f3", latex: "(x+y) + (x-y) = 2x = 12", translation: "①+②：y 消失了——2x=12" },
                { id: "f4", latex: "x = 6, y = 4", translation: "解得 x=6，回代得 y=4" }
              ],
              interaction: {
                type: "sys-lab",
                params: {
                  sliders: [
                    { id: "x", label: "x", min: -10, max: 10, step: 1, initial: 6 }
                  ],
                  panels: [
                    {
                      label: "左：① x + y = 10",
                      derived: [{ id: "y1", expr: "10 - x", label: "y = 10 − x" }],
                      readouts: [{ expr: "x + (10 - x) - 10", target: 0, label: "①余数" }]
                    },
                    {
                      label: "右：①+② → 2x = 12",
                      derived: [{ id: "y2", expr: "x - 2", label: "由②：y = x − 2" }],
                      readouts: [{ expr: "2*x - 12", target: 0, label: "新方程余数", okText: "✓ x=6", noText: "" }]
                    }
                  ],
                  note: "左栏 y 显示 10−x，右栏 y 显示 x−2；新方程 2x=12 的直线过原交点 (6,4)"
                },
                engine: { primitive: "SysLab", version: "2026.10.16.A", params: { panels: 2 } }
              },
              examples: [
                { text: "几何锚点：新方程 2x=12 是过 (6,4) 的竖直线——过交点画新线。", figure: "几何" }
              ],
              hints: [
                "①+②：(x+y)+(x−y)=2x，10+2=12——y 直接消失。",
                "{①, ①+②} 与 {①, ②} 同解：②=(①+②)−①，能互相推出。",
                "两侧 x 滑块范围统一 −10~10（须覆盖解的横坐标 x=6）。"
              ],
              prev: "ch05x-u1-l2-p2",
              next: "ch05x-u2-l1-p2"
            },
            {
              id: "ch05x-u2-l1-p2",
              title: "先凑系数，再加减",
              concept: "加减消元（推导）",
              formulas: [
                { id: "f1", latex: "2x + 3y = 12", translation: "例①：2x+3y=12" },
                { id: "f2", latex: "3x - 2y = 5", translation: "例②：3x−2y=5（解 (3,2)）" },
                { id: "f3", latex: "4x + 6y = 24, \\quad 9x - 6y = 15", translation: "①×2 得 4x+6y=24，②×3 得 9x−6y=15——6y 与 −6y 凑成相反数" },
                { id: "f4", latex: "13x = 39 \\Rightarrow x = 3, y = 2", translation: "相加消 y 得 13x=39 → x=3，回代得 y=2；检验 9−4=5 ✓" }
              ],
              interaction: {
                type: "sys-steps",
                params: {
                  steps: [
                    { text: "①×2：4x + 6y = 24", expr: "4*x + 6*y", target: 24 },
                    { text: "②×3：9x − 6y = 15（6y 与 −6y 凑成相反数）", expr: "9*x - 6*y", target: 15 },
                    { text: "相加消 y：13x = 39 → x = 3", expr: "13*x", target: 39 },
                    { text: "回代入①：y = 2；代回②检验 9−4=5 ✓", expr: "3*x - 2*y", target: 5 }
                  ],
                  sliders: [
                    { id: "x", label: "x", min: -10, max: 10, step: 1, initial: 3 },
                    { id: "y", label: "y", min: -10, max: 10, step: 1, initial: 2 }
                  ],
                  caption: "先乘倍数凑成相反数，再加减消元"
                },
                engine: { primitive: "SysSteps", version: "2026.10.16.A", params: { steps: 4 } }
              },
              examples: [
                { text: "行程问题：甲乙两车……（略，用加减法列方程组求解）", figure: "应用" },
                { text: "一题两路：本题亦可①×3、②×2 相减消 x——选用口径见小结。", figure: "小结" }
              ],
              hints: [
                "选用口径：有系数为 ±1 选代入，否则加减。",
                "凑系数的目标：让一个未知数的系数变成相反数，相加就消掉了。",
                "含负系数 −2y：符号运算要小心，这是中考常考形态。"
              ],
              prev: "ch05x-u2-l1-p1",
              next: "ch05x-u3-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch05x-u3",
      title: "图像法与小结",
      lessons: [
        {
          id: "ch05x-u3-l1",
          title: "方程组的解 = 两条直线的交点",
          pages: [
            {
              id: "ch05x-u3-l1-p1",
              title: "每条方程都是一条直线",
              concept: "二元一次方程的图像",
              formulas: [
                { id: "f1", latex: "ax + by = c \\Rightarrow y = \\frac{c - a x}{b}", translation: "ax+by=c（b≠0）→ y=(c−ax)/b：每条方程都是一条直线" },
                { id: "f2", latex: "k = -\\frac{a}{b}, \\quad b_0 = \\frac{c}{b}", translation: "写成 y=kx+b：k=−a/b，常数项=c/b" }
              ],
              interaction: {
                type: "sys-lab",
                params: {
                  sliders: [
                    { id: "a", label: "a", min: -5, max: 5, step: 1, initial: 1 },
                    { id: "b", label: "b", min: -5, max: 5, step: 1, initial: 1 },
                    { id: "c", label: "c", min: -12, max: 12, step: 1, initial: 10 },
                    { id: "x", label: "x", min: -8, max: 8, step: 1, initial: 0 }
                  ],
                  derived: [
                    { id: "y", expr: "(c - a*x)/b", label: "y = (c − a·x)/b" },
                    { id: "k", expr: "-a/b", label: "k = −a/b" }
                  ],
                  point: {
                    xExpr: "x", yExpr: "(c - a*x)/b",
                    xRange: [-8, 8], yRange: [-12, 12],
                    caption: "点 (x, y) 在直线上走"
                  },
                  guard: {
                    when: "b == 0",
                    message: "b=0 时禁用：先保证 b≠0——此时方程是竖直线 x=c/a，写不成 y=kx+b 的样子"
                  },
                  note: "x 滑块 −8~8（与取景对齐）；b=0 时方程变成 x=c/a，是竖直线，同样有无数组解"
                },
                engine: { primitive: "SysLab", version: "2026.10.16.A", params: { sliders: ["a", "b", "c", "x"], guard: "b!=0" } }
              },
              examples: [
                { text: "亲手算：拖 a、b、c，看 k=−a/b 如何变化。", figure: "探索" }
              ],
              hints: [
                "b=0 时方程变成 x=c/a，是竖直线，同样有无数组解（x 固定、y 任意），只是写不成 y=kx+b 的样子。",
                "k、b 都是由你拖动的 a、b、c 算出来的：k=−a/b、常数项=c/b。",
                "下一章你会给这些直线起新名字——一次函数。"
              ],
              prev: "ch05x-u2-l1-p2",
              next: "ch05x-u3-l1-p2"
            },
            {
              id: "ch05x-u3-l1-p2",
              title: "方程组的解 = 两条直线交点的坐标",
              concept: "图像法解方程组",
              formulas: [
                { id: "f1", latex: "x + y = 10", translation: "运行例①：x+y=10" },
                { id: "f2", latex: "2x - y = 8", translation: "运行例②：x+y=10，2x−y=8" },
                { id: "f3", latex: "x_0 = \\frac{c_1 b_2 - b_1 c_2}{D}, \\quad y_0 = \\frac{a_1 c_2 - c_1 a_2}{D}", translation: "克拉默法则：D=a₁b₂−a₂b₁≠0 时交点坐标公式" },
                { id: "f4", latex: "(6, 4)", translation: "解 = 交点坐标 (6,4)：代数⟷几何双向读" }
              ],
              interaction: {
                type: "eq-graph-lab",
                params: {
                  graph: {
                    kind: "system2x2",
                    /* 返工 F-02：统一为渲染器 schema（graph.coeffs/ranges/presets/showD）。
                     * 原 sliders/point/reverseWrite/readouts/check/guard/presets-flat 语义逐项映射：
                     *  6 滑块→coeffs+ranges；交点拖拽→渲染器内建 c 反写（保持 a,b；c 可小数）；
                     *  readouts(x0,y0,D)→读出 (x0,y0)+showD；check 余数→余数行；guard→invalid 态；
                     *  presets→预设按钮。params.note 无渲染路径，并入 hints。 */
                    coeffs: { a1: 1, b1: 1, c1: 10, a2: 2, b2: -1, c2: 8 },
                    ranges: {
                      ab: { min: -5, max: 5, step: 1 },
                      c: { min: -12, max: 12, step: 1 }
                    },
                    presets: [
                      { label: "相交", coeffs: { a1: 1, b1: 1, c1: 10, a2: 2, b2: -1, c2: 8 } },
                      { label: "平行", coeffs: { a1: 1, b1: 1, c1: 4, a2: 1, b2: 1, c2: 7 } },
                      { label: "重合", coeffs: { a1: 1, b1: 1, c1: 4, a2: 2, b2: 2, c2: 8 } }
                    ],
                    showD: true
                  }
                },
                engine: { primitive: "EqGraphLab", version: "2026.10.16.A", params: { kind: "system2x2", mode: "coeffs" } }
              },
              examples: [
                { text: "ch04 其实也是在解方程组——{y=抛物线, y=0}，只是一条边恰好是横轴；这里两条边都是一般的直线。", figure: "衔接" }
              ],
              hints: [
                "方程组的解 = 两条直线交点的坐标（= 式命名，与 ch04 脚手架③平行）。",
                "改系数→交点动；拖交点→读出解，还反写 c——双向绑定。",
                "上面的方程组也变了：拖交点后 c 可以是小数——直线平移不要求 c 是整数。",
                "图上读出来的是近似值（比如 5.99）；要精确解，用 u1、u2 的代入/加减法算。",
                "SYS-INT 断言钩子：默认 (6.00,4.00)；a₁ 1→2 变 (4.50,1.00)；拖交点到 (2,1) 反写 c₁=c₂=3.00；D=0 判平行/重合；几何一致性残差 <1e−6。"
              ],
              prev: "ch05x-u3-l1-p1",
              next: "ch05x-u3-l1-p3"
            },
            {
              id: "ch05x-u3-l1-p3",
              title: "三种位置，三种解：相交 / 平行 / 重合",
              concept: "解的个数与直线位置",
              formulas: [
                { id: "f1", latex: "D \\neq 0 \\Rightarrow \\text{交于一点} \\Rightarrow \\text{唯一解}", translation: "D≠0 → 相交 → 唯一解" },
                { id: "f2", latex: "D = 0 \\ \\text{且不成比例} \\Rightarrow \\text{平行} \\Rightarrow \\text{无解}", translation: "D=0 且不成比例 → 平行 → 无解（如 {x+y=4, x+y=7} 得 4=7 矛盾）" },
                { id: "f3", latex: "D = 0 \\ \\text{且成比例} \\Rightarrow \\text{重合} \\Rightarrow \\text{无数组解}", translation: "D=0 且成比例 → 重合 → 无数组解（如 {x+y=4, 2x+2y=8} 得 8=8 恒成立）" }
              ],
              interaction: {
                type: "eq-graph-lab",
                params: {
                  graph: {
                    kind: "system2x2",
                    /* 返工 F-02：统一为渲染器 schema（graph.coeffs/ranges/presets/showD）。
                     * 原 sliders/presets-flat/readouts/status 语义逐项映射：
                     *  6 滑块→coeffs+ranges；三预设→预设按钮（note 留作数据注记）；
                     *  readouts(D 等)→showD；status 三态→渲染器内建 相交/平行/重合 状态行；
                     *  params.note 无渲染路径，并入 hints。 */
                    coeffs: { a1: 1, b1: 1, c1: 4, a2: 1, b2: 1, c2: 7 },
                    ranges: {
                      ab: { min: -5, max: 5, step: 1 },
                      c: { min: -12, max: 12, step: 1 }
                    },
                    presets: [
                      { label: "相交", coeffs: { a1: 1, b1: 1, c1: 10, a2: 2, b2: -1, c2: 8 }, note: "唯一解 (6,4)" },
                      { label: "平行", coeffs: { a1: 1, b1: 1, c1: 4, a2: 1, b2: 1, c2: 7 }, note: "无解：两条直线永不相见" },
                      { label: "重合", coeffs: { a1: 1, b1: 1, c1: 4, a2: 2, b2: 2, c2: 8 }, note: "无数组解：其实是同一条直线" }
                    ],
                    showD: true
                  }
                },
                engine: { primitive: "EqGraphLab", version: "2026.10.16.A", params: { kind: "system2x2", mode: "coeffs" } }
              },
              examples: [
                { text: "代数视角：用代入/加减法解平行的方程组（如 {x+y=4, x+y=7}），消元后得到 4=7 矛盾式（即 0=3）→ 无解；解重合的（如 {x+y=4, 2x+2y=8}），得到 8=8（即 0=0）恒成立 → 无数组解。", figure: "代数" }
              ],
              hints: [
                "D≠0 → 相交 → 唯一解；D=0 时再看 c 是否成比例。",
                "判别式 D=a₁b₂−a₂b₁——它就是系数矩阵的行列式，D≠0 时方程组有唯一解（与 ch04 用 Δ 看交点个数呼应）。",
                "三预设按钮：相交 / 平行 / 重合，一键切换看三种命运。",
                "p2 说方程组的解 = 两条直线交点的坐标，那是两直线相交的情形；现在看另外两种位置。"
              ],
              prev: "ch05x-u3-l1-p2",
              next: "ch05x-u3-l2-p1"
            }
          ]
        },
        {
          id: "ch05x-u3-l2",
          title: "本章小结",
          pages: [
            {
              id: "ch05x-u3-l2-p1",
              title: "一图流：三条路，一座桥",
              concept: "本章小结",
              formulas: [
                { id: "f1", latex: "\\text{代入消元} \\quad | \\quad \\text{加减消元} \\quad | \\quad \\text{图像法}", translation: "三条路：代入、加减、图像——都会到同一个解" },
                { id: "f2", latex: "\\text{解} = \\text{交点坐标}", translation: "一座桥：方程组的解 = 两条直线交点的坐标" }
              ],
              interaction: {
                type: "static-compare",
                params: {
                  left: {
                    title: "代数两条路",
                    items: [
                      "代入：变形→代入→回代检验（有 ±1 系数首选）",
                      "加减：凑成相反数→相加减消元（否则用它）",
                      "都给出精确解"
                    ]
                  },
                  right: {
                    title: "几何一条路",
                    items: [
                      "每条方程是一条直线",
                      "解 = 交点坐标（图上读是近似值）",
                      "D 判个数：相交/平行/重合"
                    ]
                  },
                  bridge: "下一章你会给这些直线起新名字——一次函数。你在 p1 亲手算过的 y=(c−a·x)/b，写成 y=kx+b 就是 k=−a/b、常数项=c/b——k、b 都是由你拖动的 a、b、c 算出来的。",
                  deepLink: "#p=ch06-u0-l1-p1"
                },
                engine: { primitive: "StaticCompare", version: "2026.10.16.A", params: {} }
              },
              examples: [
                { text: "运行例回顾：{x+y=10, 2x−y=8}，三种方法都得 (6,4)。", figure: "回顾" }
              ],
              hints: [
                "三条路，一座桥：代数给精确，几何给直觉，交点即解连两边。",
                "预告必有回音：ch06 6.2.2 会回指本页——y=kx+b 中的 k、b 就是这里算出来的。"
              ],
              prev: "ch05x-u3-l1-p3",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
