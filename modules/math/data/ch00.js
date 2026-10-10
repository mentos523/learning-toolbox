/* ============================================================
 * 学习工具箱 · 数学 · 代数 第零章：导论——从算术到代数
 *
 * 黄队教学设计（docs/math-algebra-pedagogy.md 第二章）。
 * 绿队课程体系（docs/math-algebra-curriculum.md 第零章）。
 * 三轮对抗终审通过（docs/math-design-review.md）。
 *
 * P1 猜数字：未知数 = "还没知道的数"，字母是它的名字。
 * P2 天平：等号不是"得出答案"，而是"两边一样重"。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch00"] = {
  id: "ch00",
  title: "导论——从算术到代数",
  units: [
    {
      id: "ch00-u1",
      title: "代数是什么",
      lessons: [
        {
          id: "ch00-u1-l1",
          title: "从猜数字到天平",
          pages: [
            {
              id: "ch00-u1-l1-p1",
              title: "我想了一个数，加 5 得 12，它是几？",
              concept: "未知数",
              formulas: [
                {
                  id: "f1",
                  latex: "x + 5 = 12",
                  translation: "x 加 5 等于 12"
                }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 20,
                  step: 1,
                  label: "x",
                  expr: "x + 5",
                  target: 12,
                  targetLabel: "目标 12"
                }
              },
              auxInteraction: null,
              hints: [
                "如果这个数是 10369 呢？一个一个试太慢了。",
                "给\"还没知道的数\"起名叫 x：x + 5 = 12。这就是代数——先把问题写下来，再想办法解它。"
              ],
              examples: [
                { text: "猜数字：拖滑块找答案", figure: "滑块" }
              ],
              prev: null,
              next: "ch00-u1-l1-p2"
            },
            {
              id: "ch00-u1-l1-p2",
              title: "= 是\"两边一样重\"，不是\"得出答案\"",
              concept: "等式",
              formulas: [
                {
                  id: "f1",
                  latex: "x + 3 = 8",
                  translation: "x 加 3 等于 8"
                },
                {
                  id: "f2",
                  latex: "x = 5",
                  translation: "x 等于 5"
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
                  goal: "把 x 单独留在左边",
                  rule: "两边同时拿走同样多，天平依然平衡"
                }
              },
              auxInteraction: null,
              hints: [
                "你刚才做的，就是解方程 x + 3 = 8 的全过程。",
                "移项这些名词以后慢慢认，动作你已经会了。"
              ],
              examples: [
                { text: "天平：拖砝码保持平衡", figure: "拖拽" }
              ],
              prev: "ch00-u1-l1-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
