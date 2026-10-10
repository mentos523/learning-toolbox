/* ============================================================
 * 学习工具箱 · 数学 · 代数 第一章：一元一次方程（试点 2 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第一章）。
 * 黄队示例参数（docs/math-interaction-examples.md §3）。
 *
 * P3 1.1.1 等式与方程：方程的解是"对上号"（slider-lab）
 * P4 1.2.1 移项与合并：天平上"搬"砝码（balance-drag）
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
              prev: "ch01-u1-l1-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
