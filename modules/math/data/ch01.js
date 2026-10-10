/* ============================================================
 * 学习工具箱 · 数学 · 代数 第一章：一元一次方程（24 页）
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
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
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
                { id: "f1", latex: "2x + 1 = 11", translation: "2 乘 x 加 1 等于 11" }
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
              examples: [ { text: "滑块试解：找让等式成立的 x", figure: "滑块" } ],
              prev: null,
              next: "ch01-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：解 2x+1=11",
              examples: [
                { figure: "变式练习", text: "变式：3x+2=14。先减 2 得 3x=12，再除以 3 得 x=4。" }
              ],
              formulas: [
                { id: "f1", latex: "2x + 1 = 11", translation: "第一步：两边同时减 1，消掉常数项（等式性质 1）" },
                { id: "f2", latex: "2x = 10", translation: "得到 2x=10；x 前面还挡着个 2" },
                { id: "f3", latex: "x = 5", translation: "第二步：两边同时除以 2（等式性质 2），x=5；验算 2×5+1=11" }
              ],
              hints: [
                "解这类方程两步走：先移常数项（+1 过等号变 −1），再把 x 的系数化为 1。",
                "顺序别反：先除以 2 的话 1÷2 会添麻烦。做完一定验算。"
              ],
              id: "ch01-u1-l1-p1b",
              interaction: {
                params: {
                  goal: "先消掉常数 1，再把两个 x 盒并成一个",
                  left: [
                    { id: "x1", kind: "unknown", label: "x" },
                    { id: "x2", kind: "unknown", label: "x" },
                    { kind: "weight", value: 1 }
                  ],
                  right: [ { kind: "weight", value: 11 } ],
                  rule: "两边同时拿走同样多，天平依然平衡"
                },
                type: "balance-drag"
              },
              title: "2x+1=11：先减 1 再除以 2",
              prev: "ch01-u1-l1-p1",
              next: "ch01-u1-l1-p2"
            },
            {
              id: "ch01-u1-l1-p2",
              title: "含有未知数的等式叫方程",
              concept: "方程的定义",
              formulas: [
                { id: "f1", latex: "x + 5 = 12", translation: "x 加 5 等于 12" },
                { id: "f2", latex: "3 + 5 = 8", translation: "3 加 5 等于 8" }
              ],
              interaction: {
                type: "balance-drag",
                params: {
                  left: [
                    { kind: "unknown", id: "x", label: "x" },
                    { kind: "weight", value: 5 }
                  ],
                  right: [ { kind: "weight", value: 12 } ],
                  goal: "观察天平：它既是一个等式，也是一个方程",
                  rule: "天平平衡叫等式；含有未知数 x 的等式叫方程"
                }
              },
              auxInteraction: null,
              hints: [
                "天平平衡：两边一样重，这就是等式。",
                "左边多了个 x 盒子——含有未知数的等式，叫方程。"
              ],
              examples: [ { text: "天平：等式是平衡，方程是藏了 x 的平衡", figure: "天平" } ],
              prev: "ch01-u1-l1-p1b",
              next: "ch01-u1-l1-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：方程的定义",
              examples: [
                { figure: "辨析", text: "x+2=7 是方程；7=7 是等式；2x+1 是代数式。你能一眼分清吗？" }
              ],
              formulas: [
                { id: "f1", latex: "x + 5 = 12", translation: "有等号、有未知数 x：是方程" },
                { id: "f2", latex: "3 + 5 = 8", translation: "有等号、全是数字：只是等式，不是方程" },
                { id: "f3", latex: "2x + 5", translation: "连等号都没有：叫代数式，更不是方程" }
              ],
              hints: [
                "判断是不是方程两步看：有等号吗？有未知数吗？两个都是“有”才是方程。",
                "易错：x=5 也是方程——未知数还在，只是答案已经找到了。"
              ],
              id: "ch01-u1-l1-p2b",
              interaction: {
                params: {
                  autoPlay: true,
                  expr: "□ + 5 = 12",
                  interval: 1200,
                  stages: [ "□", "△", "x" ]
                },
                type: "placeholder-morph"
              },
              title: "方程和等式：一句话分清",
              prev: "ch01-u1-l1-p2",
              next: "ch01-u1-l1-p3"
            },
            {
              id: "ch01-u1-l1-p3",
              title: "未知数和变量是一回事吗？",
              concept: "未知数 vs 变量",
              formulas: [
                { id: "f1", latex: "2x + 5", translation: "2 乘 x 加 5" },
                { id: "f2", latex: "2x + 5 = 13", translation: "2 乘 x 加 5 等于 13" }
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
              prev: "ch01-u1-l1-p2b",
              next: "ch01-u1-l1-p3b"
            },
            {
              auxInteraction: null,
              concept: "讲解：未知数 vs 变量",
              examples: [
                {
                  figure: "生活实例",
                  text: "气温 T 随时间 t 变化：t 和 T 都是变量；中午 12 点 T=28℃，那是定值。"
                }
              ],
              formulas: [
                { id: "f1", latex: "y = 2x + 1", translation: "没有等号定住谁：x 跑、y 跟着跑，两个都是变量" },
                { id: "f2", latex: "2x + 1 = 11", translation: "等号把它定在 11 上：此刻 x 是未知数，等着被求出来" }
              ],
              hints: [
                "同一个字母 x：在等式里等人来找它叫未知数，在变化里到处跑叫变量。",
                "解方程，就是让乱跑的 x 停在唯一正确的位置上。"
              ],
              id: "ch01-u1-l1-p3b",
              interaction: {
                params: {
                  source: {
                    initial: 0,
                    label: "x",
                    max: 5,
                    min: 0,
                    step: 0.5
                  },
                  views: [
                    { expr: "2*x + 1", kind: "readout", label: "y" },
                    { kind: "point", xExpr: "x", yExpr: "2*x + 1" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "变量到处跑，未知数等人找",
              prev: "ch01-u1-l1-p3",
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
                { id: "f1", latex: "x + 3 = 8", translation: "x 加 3 等于 8" },
                { id: "f2", latex: "x + 3 - 3 = 8 - 3", translation: "x 加 3 减 3 等于 8 减 3" }
              ],
              interaction: {
                type: "balance-drag",
                params: {
                  left: [
                    { kind: "unknown", id: "x", label: "x" },
                    { kind: "weight", value: 3 }
                  ],
                  right: [ { kind: "weight", value: 8 } ],
                  goal: "两边同时拿走 3g 砝码，看天平还平不平",
                  rule: "等式两边加减同一个数，等式依然成立"
                }
              },
              auxInteraction: null,
              hints: [
                "拖走左边 3g，右边也拖走 3g。",
                "天平没动：这就是等式的性质 1——两边加减同一个数，等式不变。"
              ],
              examples: [ { text: "天平：两边同时减 3", figure: "天平" } ],
              prev: "ch01-u1-l1-p3b",
              next: "ch01-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：等式的性质 1",
              examples: [
                { figure: "变式练习", text: "x−6=4：两边同加 6 得 x=10。加减看符号，缺什么补什么。" }
              ],
              formulas: [
                { id: "f1", latex: "x + 7 = 15", translation: "x 加 7 等于 15：想消掉 +7" },
                { id: "f2", latex: "x + 7 - 7 = 15 - 7", translation: "两边同时减 7（性质 1）：+7−7 抵消" },
                { id: "f3", latex: "x = 8", translation: "x 等于 8；验算 8+7=15，成立" }
              ],
              hints: [
                "性质 1 专治“+几/−几”：等式两边加减同一个数，等式不变。",
                "移项就是性质 1 的快捷写法：+7 过等号变成 −7。"
              ],
              id: "ch01-u1-l2-p1b",
              interaction: {
                params: {
                  goal: "两边同时拿走 7 个砝码，看天平还平不平",
                  left: [
                    { id: "x", kind: "unknown", label: "x" },
                    { kind: "weight", value: 7 }
                  ],
                  right: [ { kind: "weight", value: 15 } ],
                  rule: "等式两边加减同一个数，等式依然成立"
                },
                type: "balance-drag"
              },
              title: "性质 1：两边加减同一数",
              prev: "ch01-u1-l2-p1",
              next: "ch01-u1-l2-p2"
            },
            {
              id: "ch01-u1-l2-p2",
              title: "两边同时乘除，天平还平吗？",
              concept: "等式的性质2",
              formulas: [
                { id: "f1", latex: "2x = 10", translation: "2 乘 x 等于 10" },
                { id: "f2", latex: "\\frac{2x}{2} = \\frac{10}{2}", translation: "2 乘 x 除以 2 等于 10 除以 2" }
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
              examples: [ { text: "滑块：找 2x = 10 的解", figure: "滑块" } ],
              prev: "ch01-u1-l2-p1b",
              next: "ch01-u1-l2-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：等式的性质 2",
              examples: [
                { figure: "变式练习", text: "5x=20：两边同除以 5 得 x=4。乘除看系数，系数是几就除以几。" }
              ],
              formulas: [
                { id: "f1", latex: "\\frac{x}{3} = 4", translation: "x 除以 3 等于 4：想消掉 ÷3" },
                {
                  id: "f2",
                  latex: "\\frac{x}{3} \\times 3 = 4 \\times 3",
                  translation: "两边同时乘 3（性质 2）：÷3×3 抵消"
                },
                { id: "f3", latex: "x = 12", translation: "x 等于 12；验算 12÷3=4，成立" }
              ],
              hints: [
                "性质 2 专治“×几/÷几”：两边乘除同一个不为 0 的数，等式不变。",
                "红线：除数不能是 0。0 不能做除数，这是全书通用的铁律。"
              ],
              id: "ch01-u1-l2-p2b",
              interaction: {
                params: {
                  expr: "x/3",
                  label: "x",
                  max: 24,
                  min: 0,
                  step: 1,
                  target: 4,
                  targetLabel: "x÷3 = 4"
                },
                type: "slider-lab"
              },
              title: "性质 2：两边乘除同一数",
              prev: "ch01-u1-l2-p2",
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
                { id: "f1", latex: "x + 5 = 12", translation: "x 加 5 等于 12" },
                { id: "f2", latex: "x = 7", translation: "x 等于 7" }
              ],
              interaction: {
                type: "balance-drag",
                params: {
                  left: [
                    { kind: "unknown", id: "x", label: "x" },
                    { kind: "weight", value: 5 }
                  ],
                  right: [ { kind: "weight", value: 12 } ],
                  goal: "把 x 单独留在左边",
                  rule: "把 5 拖到右边的 12 上，两边同时减去 5"
                }
              },
              auxInteraction: null,
              hints: [
                "试试把左边的 5 拖到右边的 12 上面松开。",
                "这就是\"移项\"的动作：+5 从左边搬到右边，变成了 −5。"
              ],
              examples: [ { text: "天平：拖 5 去减 12", figure: "拖拽" } ],
              prev: "ch01-u1-l2-p2b",
              next: "ch01-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：移项",
              examples: [
                { figure: "变式练习", text: "5x−6=3x+4：移项得 5x−3x=4+6，2x=10，x=5。" }
              ],
              formulas: [
                { id: "f1", latex: "x + 8 = 3x", translation: "x 加 8 等于 3x：x 在等号两边都有" },
                { id: "f2", latex: "8 = 3x - x", translation: "把左边的 x 请到右边：+x 过等号变成 −x" },
                { id: "f3", latex: "x = 4", translation: "8=2x 得 x=4；验算：4+8=12，3×4=12" }
              ],
              hints: [
                "移项口诀：搬家过等号，+变−、−变+。",
                "习惯动作：含 x 的放一边，纯数字放另一边，再合并同类项。"
              ],
              id: "ch01-u2-l1-p1b",
              interaction: {
                params: {
                  goal: "把 x 都赶到一边，数字都赶到另一边",
                  left: [
                    { id: "x", kind: "unknown", label: "x" },
                    { kind: "weight", value: 8 }
                  ],
                  right: [
                    { id: "x1", kind: "unknown", label: "x" },
                    { id: "x2", kind: "unknown", label: "x" },
                    { id: "x3", kind: "unknown", label: "x" }
                  ],
                  rule: "从一边搬到另一边，+变−、−变+"
                },
                type: "balance-drag"
              },
              title: "移项：搬家过等号要变号",
              prev: "ch01-u2-l1-p1",
              next: "ch01-u2-l1-p2"
            },
            {
              id: "ch01-u2-l1-p2",
              title: "2x + 3x：数盒子就行",
              concept: "合并同类项",
              formulas: [
                { id: "f1", latex: "2x + 3x = 5x", translation: "2 乘 x 加 3 乘 x 等于 5 乘 x" },
                { id: "f2", latex: "5x = 25", translation: "5 乘 x 等于 25" }
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
              prev: "ch01-u2-l1-p1b",
              next: "ch01-u2-l1-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：合并同类项",
              examples: [
                { figure: "变式练习", text: "7a−3a+2a=12：合并得 6a=12，a=2。" }
              ],
              formulas: [
                { id: "f1", latex: "3x + 4 + 5x = 20", translation: "3x 加 4 加 5x 等于 20：先找同类项" },
                { id: "f2", latex: "8x + 4 = 20", translation: "3x 与 5x 长得一样（字母同、指数同），合并得 8x；4 是单身数字不动" },
                { id: "f3", latex: "x = 2", translation: "8x=16 得 x=2；验算 3×2+4+5×2=20" }
              ],
              hints: [
                "同类项两同：字母相同、指数相同；合并只加减系数，字母和指数都不变。",
                "2x 和 3y 不是同类项——苹果和梨不能直接装一袋。"
              ],
              id: "ch01-u2-l1-p2b",
              interaction: {
                params: {
                  expr: "3*x + 4 + 5*x",
                  label: "x",
                  max: 5,
                  min: 0,
                  step: 0.5,
                  target: 20,
                  targetLabel: "3x+4+5x = 20"
                },
                type: "slider-lab"
              },
              title: "同类项：长得一样才能并",
              prev: "ch01-u2-l1-p2",
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
                { id: "f1", latex: "2(x + 3) = 14", translation: "2 乘以 x 加 3 的和等于 14" },
                { id: "f2", latex: "2x + 6 = 14", translation: "2 乘 x 加 6 等于 14" }
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
              prev: "ch01-u2-l1-p2b",
              next: "ch01-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：去括号",
              examples: [
                { figure: "易错提醒", text: "−(x−5)=2：去括号得 −x+5=2，x=3。负号开头最容易错。" }
              ],
              formulas: [
                { id: "f1", latex: "3(x - 2) = 15", translation: "3 乘以 x 减 2 的差等于 15" },
                { id: "f2", latex: "3x - 6 = 15", translation: "3 乘给括号里每一项：3×x=3x，3×(−2)=−6" },
                { id: "f3", latex: "x = 7", translation: "3x=21 得 x=7；验算 3×(7−2)=15" }
              ],
              hints: [
                "括号外的数是快递员：括号里每一项都要送到，不许漏掉谁。",
                "符号陷阱：−2(x+3)=−2x−6，负号也要乘进去，别只乘数字。"
              ],
              id: "ch01-u2-l2-p1b",
              interaction: {
                params: {
                  expr: "3*(x - 2)",
                  label: "x",
                  max: 12,
                  min: 0,
                  step: 0.5,
                  target: 15,
                  targetLabel: "3(x−2) = 15"
                },
                type: "slider-lab"
              },
              title: "去括号：括号外乘进来",
              prev: "ch01-u2-l2-p1",
              next: "ch01-u2-l2-p2"
            },
            {
              id: "ch01-u2-l2-p2",
              title: "分母 2 太碍事，乘掉它",
              concept: "去分母",
              formulas: [
                { id: "f1", latex: "\\frac{x}{2} + 1 = 5", translation: "x 除以 2 加 1 等于 5" },
                { id: "f2", latex: "x + 2 = 10", translation: "x 加 2 等于 10" }
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
              examples: [ { text: "去分母：两边同乘 2", figure: "滑块" } ],
              prev: "ch01-u2-l2-p1b",
              next: "ch01-u2-l2-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：去分母",
              examples: [
                {
                  figure: "易错提醒",
                  text: "x/4−1=x/6：同乘 12 得 3x−12=2x，x=12。注意 −1 也要乘 12。"
                }
              ],
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{x}{2} + \\frac{x}{3} = 5",
                  translation: "x 除以 2 加 x 除以 3 等于 5：分母是 2 和 3"
                },
                { id: "f2", latex: "3x + 2x = 30", translation: "两边同乘 6（2 和 3 的最小公倍数）：每一项都乘，分母全消失" },
                { id: "f3", latex: "x = 6", translation: "5x=30 得 x=6；验算 6÷2+6÷3=3+2=5" }
              ],
              hints: [
                "去分母三步：找分母的最小公倍数；两边同乘；每一项都乘。",
                "第一杀手是漏乘：常数项也要乘 6，漏了等式就变了。"
              ],
              id: "ch01-u2-l2-p2b",
              interaction: {
                params: {
                  expr: "x/2 + x/3",
                  label: "x",
                  max: 12,
                  min: 0,
                  step: 0.5,
                  target: 5,
                  targetLabel: "x/2+x/3 = 5"
                },
                type: "slider-lab"
              },
              title: "去分母：两边同乘最小公倍数",
              prev: "ch01-u2-l2-p2",
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
                { id: "f1", latex: "2(2x + 3) = 26", translation: "2 乘以 2x 加 3 的和等于 26" },
                { id: "f2", latex: "x = 5", translation: "x 等于 5" }
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
              examples: [ { text: "设未知数、找等量关系", figure: "滑块" } ],
              prev: "ch01-u2-l2-p2b",
              next: "ch01-u2-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：列方程解应用题",
              examples: [
                {
                  figure: "生活实例",
                  text: "小明看书：看了 20 页还剩 35 页。设全书 x 页：x−20=35，x=55。"
                }
              ],
              formulas: [
                { id: "f1", latex: "2(x + x + 5) = 34", translation: "设宽为 x，则长为 x+5；等量关系：周长=2×(长+宽)" },
                { id: "f2", latex: "x + x + 5 = 17", translation: "两边同除以 2：先把最外层拆开" },
                { id: "f3", latex: "x = 6", translation: "2x=12 得 x=6；长是 11；验算 2×(6+11)=34" }
              ],
              hints: [
                "列方程三步：设未知数；找等量关系（题中“共”“是”后面的话）；列式求解。",
                "设谁有讲究：一般设题目最后问的那个，解出来直接就能答。"
              ],
              id: "ch01-u2-l3-p1b",
              interaction: {
                params: {
                  expr: "2*(x + x + 5)",
                  label: "x",
                  max: 12,
                  min: 0,
                  step: 0.5,
                  target: 34,
                  targetLabel: "周长 = 34 厘米",
                  unit: "厘米"
                },
                type: "slider-lab"
              },
              title: "列方程：设、找、列三步走",
              prev: "ch01-u2-l3-p1",
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
                { id: "f1", latex: "40x + 20x = 120", translation: "40 乘 x 加 20 乘 x 等于 120" },
                { id: "f2", latex: "x = 2", translation: "x 等于 2" }
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
              examples: [ { text: "相遇问题：路程和 = 全程", figure: "滑块" } ],
              prev: "ch01-u2-l3-p1b",
              next: "ch01-u2-l4-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：追及问题",
              examples: [
                {
                  figure: "生活实例",
                  text: "小红 8 点出发时速 5 千米，小刚 8 点半时速 7 千米追：7x=5x+2.5，x=1.25 小时追上。"
                }
              ],
              formulas: [
                { id: "f1", latex: "60x = 40x + 30", translation: "甲时速 60 追时速 40 的乙，乙先走了 30 千米；设 x 小时追上" },
                { id: "f2", latex: "20x = 30", translation: "等量关系：追上时甲走的路程 = 乙走的路程" },
                { id: "f3", latex: "x = 1.5", translation: "x=1.5：1.5 小时追上；甲走了 90，乙走了 60+30=90" }
              ],
              hints: [
                "追及等量关系：快车路程 = 慢车路程 + 先走的。",
                "相遇是“和”=全程，追及是“差”=先走的——一字之差，关系完全不同。"
              ],
              id: "ch01-u2-l4-p1b",
              interaction: {
                params: {
                  expr: "60*x - 40*x",
                  label: "x",
                  max: 3,
                  min: 0,
                  step: 0.25,
                  target: 30,
                  targetLabel: "甲比乙多走 30 千米",
                  unit: "千米"
                },
                type: "slider-lab"
              },
              title: "追及问题：快的追慢的",
              prev: "ch01-u2-l4-p1",
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
                { id: "f1", latex: "3x - 5 = 10", translation: "3 乘 x 减 5 等于 10" },
                { id: "f2", latex: "3x = 15", translation: "3 乘 x 等于 15" },
                { id: "f3", latex: "x = 5", translation: "x 等于 5" }
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
              examples: [ { text: "一图流：解方程三步走", figure: "滑块" } ],
              prev: "ch01-u2-l4-p1b",
              next: "ch01-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch01-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch01-ux-l1",
          title: "第一章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．C；2．8；3．7；4．x=4；5．x=9；6．6（设 x：x/2=x−3）"
                }
              ],
              formulas: [
                { id: "f1", latex: "5x - 3 = 2x + 9", translation: "第 4 题：先把含 x 的项聚到左边，数字聚到右边" }
              ],
              hints: [
                "1．是方程的是（ ）A．2x+1 B．3+4=7 C．x−5=9",
                "2．x+9=17，x=____。",
                "3．4x=28，x=____。",
                "4．解方程：5x−3=2x+9。",
                "5．解方程：2(x−4)=10。",
                "6．一个数的一半比它本身小 3，这个数是几？"
              ],
              id: "ch01-ux-l1-p1",
              interaction: {
                params: {
                  goal: "检验第 2 题：把 x 单独留在左边",
                  left: [
                    { id: "x", kind: "unknown", label: "x" },
                    { kind: "weight", value: 9 }
                  ],
                  right: [ { kind: "weight", value: 17 } ],
                  rule: "两边同时拿走同样多，天平依然平衡"
                },
                type: "balance-drag"
              },
              title: "第一章习题：一元一次方程",
              prev: "ch01-u2-l5-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
