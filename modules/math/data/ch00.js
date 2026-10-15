/* ============================================================
 * 学习工具箱 · 数学 · 代数 第零章：导论——从算术到代数
 *
 * 黄队教学设计（docs/math-algebra-pedagogy.md 第二章）。
 * 绿队课程体系（docs/math-algebra-curriculum.md 第零章）。
 * 三轮对抗终审通过（docs/math-design-review.md）。
 *
 * P1 猜数字：未知数 = "还没知道的数"，字母是它的名字。
 * P2 天平：等号不是"得出答案"，而是"两边一样重"。
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
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
                { id: "f1", latex: "x + 5 = 12", translation: "x 加 5 等于 12" }
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
              examples: [ { text: "猜数字：拖滑块找答案", figure: "滑块" } ],
              prev: null,
              next: "ch00-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：解 x+5=12",
              examples: [
                { figure: "变式练习", text: "变式：y+9=20，y 是几？（两边同减 9，得 y=11）" }
              ],
              formulas: [
                { id: "f1", latex: "x + 5 = 12", translation: "x 加 5 等于 12：第一步，先把问题原样写下来" },
                { id: "f2", latex: "x = 12 - 5", translation: "第二步，把 5 请到右边去：过等号要变号，加 5 变成减 5" },
                { id: "f3", latex: "x = 7", translation: "第三步，算出来 x 等于 7；代回去验算：7+5=12，对了" }
              ],
              hints: [
                "生活里到处是未知数：钱包花掉 5 元还剩 12 元，原来有几元？列式就是 x+5=12。",
                "验算是好习惯：把 7 代回原式，7+5=12 成立，答案就对了。"
              ],
              id: "ch00-u1-l1-p1b",
              interaction: {
                params: {
                  goal: "把 x 单独留在左边",
                  left: [
                    { id: "x", kind: "unknown", label: "x" },
                    { kind: "weight", value: 5 }
                  ],
                  right: [ { kind: "weight", value: 12 } ],
                  rule: "两边同时拿走同样多，天平依然平衡"
                },
                type: "balance-drag"
              },
              title: "x+5=12：一步步算出 x",
              prev: "ch00-u1-l1-p1",
              next: "ch00-u1-l1-p2"
            },
            {
              id: "ch00-u1-l1-p2",
              title: "= 是\"两边一样重\"，不是\"得出答案\"",
              concept: "等式",
              formulas: [
                { id: "f1", latex: "x + 3 = 8", translation: "x 加 3 等于 8" },
                { id: "f2", latex: "x = 5", translation: "x 等于 5" }
              ],
              interaction: {
                type: "balance-drag",
                params: {
                  left: [
                    { kind: "unknown", id: "x", label: "x" },
                    { kind: "weight", value: 3 }
                  ],
                  right: [ { kind: "weight", value: 8 } ],
                  goal: "把 x 单独留在左边",
                  rule: "两边同时拿走同样多，天平依然平衡"
                }
              },
              auxInteraction: null,
              hints: [
                "你刚才做的，就是解方程 x + 3 = 8 的全过程。",
                "移项这些名词以后慢慢认，动作你已经会了。"
              ],
              examples: [ { text: "天平：拖砝码保持平衡", figure: "拖拽" } ],
              prev: "ch00-u1-l1-p1b",
              next: "ch00-u1-l1-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：等式性质解方程",
              examples: [
                { figure: "变式练习", text: "变式：x+6=13，两边同减 6 得 x=7；再想想 x−4=9 怎么办？" }
              ],
              formulas: [
                { id: "f1", latex: "x + 3 = 8", translation: "x 加 3 等于 8：天平两边一样重" },
                { id: "f2", latex: "x + 3 - 3 = 8 - 3", translation: "两边同时拿走 3 个砝码，天平依然平衡" },
                { id: "f3", latex: "x = 5", translation: "左边只剩 x 盒子，右边剩 5：x 等于 5" }
              ],
              hints: [
                "记住一句话：方程两边做相同的事，等式不变——这是解方程唯一的规矩。",
                "易错：只给一边减 3 天平就歪了，两边必须同步动手。"
              ],
              id: "ch00-u1-l1-p2b",
              interaction: {
                params: {
                  expr: "x + 3",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 1,
                  target: 8,
                  targetLabel: "等于 8"
                },
                type: "slider-lab"
              },
              title: "天平解方程：两边同减 3",
              prev: "ch00-u1-l1-p2",
              next: "ch00-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch00-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch00-ux-l1",
          title: "第零章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                { figure: "核对答案", text: "答案：1．8；2．5；3．35 元；4．7；5．13；6．5" }
              ,
                { figure: "错因解析", text: "1．想加算减：15−7=8，验算 8+7=15。2．等式两边同时减 4：x=9−4=5。3．“花掉的+剩下的=原来的”：12+23=35 元。4．天平两边同时拿掉 2 个砝码：x=9−2=7。5．两边同时加 3：x=10+3=13。6．先算右边=7：2+x=7，x=5——等式两边各减 2。" }],
              formulas: [
                { id: "f1", latex: "x + 5 = 12", translation: "本章核心：含有未知数的等式叫方程" }
              ],
              hints: [
                "1．□+7=15，□ 是几？",
                "2．x+4=9，x 是几？",
                "3．买菜花 12 元还剩 23 元，钱包原来有几元？",
                "4．天平左：1 个 x 盒 +2 个砝码；右：9 个砝码。x 是几？",
                "5．x−3=10，x 是几？（天平两边同时加 3）",
                "6．2+x=2+5，x 是几？（先算出右边）"
              ],
              id: "ch00-ux-l1-p1",
              interaction: {
                params: {
                  autoPlay: true,
                  expr: "□ + 5 = 12",
                  interval: 1200,
                  stages: [ "□", "△", "x" ]
                },
                type: "placeholder-morph"
              },
              title: "第零章习题：猜数字与天平",
              prev: "ch00-u1-l1-p2b",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
