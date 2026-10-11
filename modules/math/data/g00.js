/* ============================================================
 * 学习工具箱 · 数学 · 几何 样本章 g00（蓝队）
 *
 * 用途：几何交互地基（G1 vertex-drag / G6 angle-protractor）
 * 的渲染管线验证样本。不是正式章节，不接入 chapters.js；
 * 黄队按 docs/math-geometry-params.md 写正式 gNN 页时参照此结构。
 *
 * P1：拖三角形顶点，看边长/角度实时变化（G1）。
 * P2：旋转量角器，量出角的度数（G6）。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g00"] = {
  id: "g00",
  title: "几何样本（G1/G6 验证）",
  units: [
    {
      id: "g00-u1",
      title: "几何初体验",
      lessons: [
        {
          id: "g00-u1-l1",
          title: "动手量一量",
          pages: [
            {
              id: "g00-u1-l1-p1",
              title: "拖一拖，三角形的边和角会怎么变？",
              concept: "三角形边角关系",
              formulas: [
                {
                  id: "f1",
                  latex: "a + b > c",
                  translation: "三角形任意两边之和大于第三边"
                }
              ],
              interaction: {
                type: "vertex-drag",
                params: {
                  vertices: [
                    { x: 20, y: 75, label: "A" },
                    { x: 80, y: 75, label: "B" },
                    { x: 55, y: 25, label: "C" }
                  ],
                  showLengths: true,
                  showAngles: true
                }
              },
              auxInteraction: null,
              hints: [
                "拖动蓝色的顶点 A、B、C，边长和角度的数字会跟着变。",
                "试试把一个角拖成 90°：顶点会出现一个小方块，那就是直角标记。"
              ],
              examples: [
                { text: "生活中的三角形：衣架、自行车车架", figure: "实物" }
              ],
              prev: null,
              next: "g00-u1-l1-p2"
            },
            {
              id: "g00-u1-l1-p2",
              title: "用量角器量一量，这个角多少度？",
              concept: "量角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{角} AOB = 60 \\text{度}",
                  translation: "角 AOB 等于 60 度"
                }
              ],
              interaction: {
                type: "angle-protractor",
                params: {
                  angle: 60,
                  vertex: { x: 50, y: 56, label: "O" },
                  dir1: 180,
                  rayLabels: ["A", "B"],
                  tolerance: 2
                }
              },
              auxInteraction: null,
              hints: [
                "拖动量角器旋转：先让 0° 刻度线对准一条边，再看另一条边压住几度。",
                "读数和角一样大时松手，量角器会发光定住，这就是“量准了”。",
              ],
              examples: [
                { text: "量一量书本角、桌角，看看它们是多少度", figure: "实测" }
              ],
              prev: "g00-u1-l1-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
