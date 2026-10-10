/* ============================================================
 * 学习工具箱 · 数学 · 代数 第零章（框架示例）
 *
 * ⚠️ 本文件为 schema 演示占位，内容为示例文案，非正式课程内容。
 * 正式课程内容由黄队按 docs/math-algebra-pedagogy.md 填充，
 * 经绿队审查后替换本文件。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch00"] = {
  id: "ch00",
  title: "导论——从算术到代数",
  units: [
    {
      id: "ch00-u1",
      title: "示例单元（占位）",
      lessons: [
        {
          id: "ch00-u1-l1",
          title: "示例课（占位）",
          pages: [
            {
              id: "ch00-u1-l1-p1",
              title: "示例页：滑块猜数字",
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
                "拖动滑块，当结果等于 12 时停下。",
                "这就是代数：先把问题写下来，再想办法解它。"
              ],
              examples: [
                { text: "猜数字游戏", figure: "滑块" }
              ],
              prev: null,
              next: "ch00-u1-l1-p2"
            },
            {
              id: "ch00-u1-l1-p2",
              title: "示例页：天平平衡",
              concept: "等式",
              formulas: [
                {
                  id: "f1",
                  latex: "x + 3 = 8",
                  translation: "x 加 3 等于 8"
                }
              ],
              interaction: {
                type: "balance-drag",
                params: {
                  left: [{ kind: "unknown", id: "x", label: "x" }, { kind: "weight", value: 3 }],
                  right: [{ kind: "weight", value: 8 }],
                  goal: "把 x 单独留在左边"
                }
              },
              auxInteraction: null,
              hints: [
                "两边同时拿走同样多，天平依然平衡。",
                "移项这些名词以后慢慢认，动作你已经会了。"
              ],
              examples: [
                { text: "天平", figure: "拖拽" }
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
