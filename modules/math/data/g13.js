/* ============================================================
 * 学习工具箱 · 数学 · 几何 g13：解析几何入门
 *
 * 黄队（教育教学专家）生产：1 单元 / 9 课 + 章首学习地图 / 33 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g13 章）
 * 教学设计：docs/math-geometry-pedagogy.md（§11 g13 落点：H2/H7/H8/H9/H17/H18；
 *           例子库：电影院找座位/打车计价/爬坡/铁轨/墙角）
 * 参数手册：docs/math-geometry-params.md v1.3
 * 白队一屏预算评审：g13 25→约 34+1 页（本章实际 33 页，口径内）
 *
 * 页构成：
 *   章首学习地图            1 页  P1 step-play（主路/支路/终点）
 *   g13.1.1 坐标系：几何视角 3 页  P1 step-play（动点 P 坐标联动）
 *                                   P2 讲解（点↔坐标一一对应；呼应代数 6.1，只讲"形"）
 *                                   P3 step-play（例题：读坐标/描点）
 *   g13.1.2 距离与中点公式  4 页  P1 step-play（横平竖直直角三角形，引用 g05.1.6）
 *                                   P2 讲解（距离公式；呼应代数 ch06，只讲"形"）
 *                                   P3 step-play（中点拖动验证：端点平均）
 *                                   P4 讲解（中点公式）
 *   g13.1.3 斜率            4 页  P1 step-play（爬坡：k 联动）
 *                                   P2 讲解（k=Δy/Δx 定义与计算）
 *                                   P3 讲解（k 符号：上坡/下坡/平路；竖直线反例）
 *                                   P4 讲解（|k| 陡度；tanθ 折叠条预告 v2.0）
 *   g13.1.4 直线方程        4 页  P1 step-play（k、b 旋钮）
 *                                   P2 讲解（斜截式；H7：k、b 几何正名，回链代数 6.2.2）
 *                                   P3 讲解（点斜式：一点一斜率锁死直线）
 *                                   P4 step-play（例题：两点定直线）
 *   g13.1.5 两直线位置关系  4 页  P1 step-play（平行/垂直 k 验证）
 *                                   P2 讲解（平行 k₁=k₂；重合反例）
 *                                   P3 proof-replay（5 步：垂直 k₁k₂=−1 勾股证明）
 *                                   P4 讲解（垂直结论 + 例题）
 *   g13.1.6 抛物线几何定义  5 页  P1 step-play（焦点/准线拖动，胖瘦联动）
 *                                   P2 讲解（几何定义；H8：出生证明 vs 长相公式）
 *                                   P3 proof-replay（5 步：设点/列式/平方/化简/结论 y=ax²）
 *                                   P4 讲解（a=1/(4p) 复盘；呼应代数 7.1）
 *                                   P5 step-play（例题：已知焦点写方程）
 *   g13.1.7 圆的方程        3 页  P1 step-play（圆心拖动，方程参数联动）
 *                                   P2 讲解（(x−a)²+(y−b)²=r²；g08.1.5 平移推广）
 *                                   P3 step-play（例题：写方程/判点位）
 *   g13.1.8 切线斜率与导数  3 页  P1 step-play（割线→切线极限动画；页首跳过提示）
 *                                   P2 讲解（切线斜率=变化率；H9；只讲"形"）
 *                                   P3 讲解（y=x² 在 (1,1) 处切线斜率→2）
 *   g13.1.9 全书总结        2 页  P1 讲解（数形统一图谱；与 g00.1.4 同一张握手图）
 *                                   P2 习题（6 道综合题，答案折叠）
 *
 * 呼应点落实（只讲"形"，数的部分链回代数页）：
 *   1.1 P2：坐标"数"的部分（有序数对/象限）→ 代数 6.1
 *   1.2 P2：开方化简（数的运算）→ 代数；距离只看"形"（斜边）
 *   1.4 P2（H7）：k、b 的计算 → 代数 6.2.2（打车计价回链）
 *   1.6 P2/P4（H8）：二次函数图像性质 → 代数 7.1；几何只给"出生证明"
 *   1.8 P2（H9）：导数计算 → 代数 11.1.3；几何只看"形"（割线极限）
 *
 * 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 /
 *   corrA·corrB·corrC=对应组 / corrAngle=对应角 / line=普通线 /
 *   aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
 * 公式走 LaTeX（构建器子集），交互参数里不出现裸文本公式。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g13"] = {
  id: "g13",
  title: "解析几何入门",
  units: [
    {
      id: "g13-u1",
      title: "用代数研究几何",
      lessons: [
        /* ============ 章首：本章学习地图（1 页，不占课时） ============ */
        {
          id: "g13-u1-l0",
          title: "本章学习地图",
          pages: [
            {
              id: "g13-u1-l0-p1",
              title: "本章学习地图：两条路",
              pageKind: "explain",
              concept: "学习路径",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{代数}ch06/ch07 \\Rightarrow 1.1\\text{–}1.7；\\text{代数}ch11 \\Rightarrow 1.8",
                  translation: "学完代数第 6、7 章可学 1.1–1.7；1.8 需要代数第 11 章，可跳过"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "主路：学完代数第 6、7 章（函数、二次函数），走 1.1–1.7。",
                      shapes: [
                        { t: "txt", p: [50,78], text: "代数 ch06 函数", size: 15, bold: true, color: "known" },
                        { t: "txt", p: [50,62], text: "代数 ch07 二次函数", size: 15, bold: true, color: "known" },
                        { t: "seg", a: [50,54], b: [50,44], color: "line", width: 2.5 },
                        { t: "txt", p: [50,34], text: "g13.1.1–1.7 主路", size: 15, bold: true, color: "target" },
                        { t: "txt", p: [50,22], text: "坐标系 → 距离 → 斜率 → 直线 → 抛物线 → 圆", size: 12 }
                      ]
                    },
                    {
                      caption: "支路：1.8 切线斜率与导数需要代数第 11 章，没学过可跳过。",
                      shapes: [
                        { t: "txt", p: [50,78], text: "代数 ch11 导数", size: 15, bold: true, color: "known" },
                        { t: "seg", a: [50,70], b: [50,60], color: "line", width: 2.5 },
                        { t: "txt", p: [50,50], text: "g13.1.8 支路（选学）", size: 15, bold: true, color: "corrA" },
                        { t: "txt", p: [50,36], text: "没学过？先跳过，回头再来", size: 13 },
                        { t: "txt", p: [50,24], text: "不影响主路和 1.9", size: 13 }
                      ]
                    },
                    {
                      caption: "终点：1.9 全书总结——几何问题与代数问题，是同一个问题的两种说法。",
                      shapes: [
                        { t: "txt", p: [32,55], text: "形", size: 22, bold: true, color: "known" },
                        { t: "txt", p: [68,55], text: "数", size: 22, bold: true, color: "target" },
                        { t: "seg", a: [40,55], b: [60,55], color: "line", width: 3 },
                        { t: "txt", p: [50,38], text: "g13.1.9 数与形的统一", size: 15, bold: true, color: "corrA" },
                        { t: "txt", p: [50,24], text: "几何全书的收官", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "这章是几何全书的收官：用坐标和方程，把以前学过的图形重新讲一遍。",
                "主路（1.1–1.7）：坐标系、距离、中点、斜率、直线方程、抛物线、圆的方程——学完代数 6、7 章就能走。",
                "支路（1.8）：需要代数第 11 章（导数）。没学过？先跳过，回头再来，不影响主路和总结。",
                "终点（1.9）：全书总结——几何问题↔代数问题互译，数形结合的方法论收束。"
              ],
              examples: [],
              prev: null,
              next: "g13-u1-l1-p1"
            }
          ]
        },
        /* ============ g13.1.1 坐标系：几何视角（3 页） ============ */
        {
          id: "g13-u1-l1",
          title: "坐标系：几何视角",
          pages: [
            {
              id: "g13-u1-l1-p1",
              title: "动点 P：坐标跟着走",
              concept: "坐标表示点的位置",
              formulas: [
                {
                  id: "f1",
                  latex: "P(x, y)",
                  translation: "点 P 的坐标是 (x, y)"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：点 P 在 (3, 2)——向右 3，向上 2。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "txt", p: [21,26], text: "O", size: 12 },
                        { t: "pt", p: [55,52], label: "P", color: "target", r: 5 },
                        { t: "txt", p: [55,64], text: "(3, 2)", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 2 步：P 走到 (5, 5)——坐标跟着变。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "pt", p: [70,72], label: "P", color: "target", r: 5 },
                        { t: "txt", p: [70,84], text: "(5, 5)", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：P 落在 x 轴上——纵坐标是 0。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "pt", p: [70,30], label: "P", color: "corrA", r: 5 },
                        { t: "txt", p: [70,42], text: "(4, 0)", size: 14, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "第 4 步：P 落在 y 轴上——横坐标是 0。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "pt", p: [25,70], label: "P", color: "corrA", r: 5 },
                        { t: "txt", p: [38,70], text: "(0, 3)", size: 14, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "第 5 步：P 回到原点——坐标是 (0, 0)。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "pt", p: [25,30], label: "P", color: "known", r: 5 },
                        { t: "txt", p: [40,24], text: "(0, 0) 原点", size: 14, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 2 步：点 P 走到哪里，坐标就跟到哪里——坐标是点的“身份证号”。",
                "注意第 3、4 步：点落在坐标轴上时，总有一个坐标是 0。",
                "这就是代数 6.1 建好的坐标系——我们换个几何视角：坐标是“位置的语言”。"
              ],
              examples: [
                { text: "电影院“5 排 8 号”：排是 y，号是 x", figure: "实物" }
              ],
              prev: "g13-u1-l0-p1",
              next: "g13-u1-l1-p2"
            },
            {
              id: "g13-u1-l1-p2",
              title: "点和坐标：一一对应",
              pageKind: "explain",
              concept: "点与坐标一一对应",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{点} P \\text{的位置} = (x, y)",
                  translation: "点 P 的位置就是坐标 (x, y)"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：P(4, 3)——向右 4、向上 3，落点唯一。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "seg", a: [25,30], b: [62,30], color: "aux", width: 1.5, dash: "4,3" },
                        { t: "seg", a: [62,30], b: [62,62], color: "aux", width: 1.5, dash: "4,3" },
                        { t: "pt", p: [62,62], label: "P", color: "target", r: 5 },
                        { t: "txt", p: [62,74], text: "P(4, 3)", size: 14, bold: true, color: "target" },
                        { t: "txt", p: [44,24], text: "向右 4", size: 12 },
                        { t: "txt", p: [72,48], text: "向上 3", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页你让点 P 满场跑，坐标一直跟着——点到哪里，坐标就报到哪里。",
                "人话版：坐标系是给平面装的“门牌号系统”。每个点一张身份证 (x, y)，每张身份证只对应一个点——这叫“一一对应”。",
                "生活例：电影院“5 排 8 号”；图形例：P(4, 3) 就是“向右 4、向上 3”的那个点。",
                "反例：只说“第 5 排”找不到座位——少一个数，位置就定不下来。",
                "分工：有序数对、象限这些“数”的部分回代数 6.1 复习；几何只关心“形”：坐标是描述位置的语言。",
                "记住一句话：点是形，坐标是它的名字。"
              ],
              examples: [
                { text: "下棋记谱：坐标定位棋子", figure: "实物" }
              ],
              prev: "g13-u1-l1-p1",
              next: "g13-u1-l1-p3"
            },
            {
              id: "g13-u1-l1-p3",
              title: "例题：读坐标，描点",
              concept: "坐标例题",
              formulas: [
                {
                  id: "f1",
                  latex: "A(2, 5)",
                  translation: "点 A 的坐标是 (2, 5)：向右 2，向上 5"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：读出 A(2, 5)——先向右 2，再向上 5。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "seg", a: [25,30], b: [45,30], color: "known", width: 2.5 },
                        { t: "seg", a: [45,30], b: [45,75], color: "known", width: 2.5 },
                        { t: "pt", p: [45,75], label: "A", color: "target", r: 5 },
                        { t: "txt", p: [45,87], text: "A(2, 5)", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 2 步：反过来——在图上标出 B(6, 3)。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "seg", a: [25,30], b: [73,30], color: "aux", width: 1.5, dash: "4,3" },
                        { t: "seg", a: [73,30], b: [73,54], color: "aux", width: 1.5, dash: "4,3" },
                        { t: "pt", p: [73,54], label: "B", color: "target", r: 5 },
                        { t: "txt", p: [73,66], text: "B(6, 3)", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：想一想——x 轴上的点，y 坐标永远是几？",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 3 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "pt", p: [55,30], color: "corrA", r: 5 },
                        { t: "pt", p: [80,30], color: "corrA", r: 5 },
                        { t: "txt", p: [50,48], text: "y = ?", size: 16, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "第 1 步：A(2, 5)——先向右走 2，再向上走 5，落点就是 A。",
                "第 2 步反过来：知道坐标找点——“按图索骥”。",
                "第 3 题想一想：x 轴上的点，y 坐标永远是 0（P1 第 3 步见过）。"
              ],
              examples: [
                { text: "寻宝游戏：按坐标找宝藏", figure: "实物" }
              ],
              prev: "g13-u1-l1-p2",
              next: "g13-u1-l2-p1"
            }
          ]
        },
        /* ============ g13.1.2 距离与中点公式（4 页，两公式拆页） ============ */
        {
          id: "g13-u1-l2",
          title: "距离与中点公式",
          pages: [
            {
              id: "g13-u1-l2-p1",
              title: "两点之间：画个直角三角形",
              concept: "距离公式的几何构造",
              formulas: [
                {
                  id: "f1",
                  latex: "\\Delta x = 6, \\Delta y = 3",
                  translation: "横向差 6，纵向差 3"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：标出 A(1, 2)、B(7, 5)。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "pt", p: [33,46], label: "A", color: "known", r: 5 },
                        { t: "txt", p: [33,58], text: "A(1, 2)", size: 13, color: "known" },
                        { t: "pt", p: [81,70], label: "B", color: "known", r: 5 },
                        { t: "txt", p: [81,82], text: "B(7, 5)", size: 13, color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步：连 AB——这就是要求的距离。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "pt", p: [33,46], label: "A", color: "known", r: 5 },
                        { t: "pt", p: [81,70], label: "B", color: "known", r: 5 },
                        { t: "seg", a: [33,46], b: [81,70], color: "target", width: 3.5 },
                        { t: "txt", p: [57,66], text: "AB = ?", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：从 A 向右画横线、从 B 向下画竖线，交于 C(7, 2)。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "seg", a: [33,46], b: [81,70], color: "line", width: 2.5 },
                        { t: "seg", a: [33,46], b: [81,46], color: "known", width: 3 },
                        { t: "seg", a: [81,46], b: [81,70], color: "known", width: 3 },
                        { t: "right", v: [81,46], p: [33,46], q: [81,70], size: 6 },
                        { t: "pt", p: [81,46], label: "C", color: "known", r: 4 },
                        { t: "txt", p: [88,40], text: "C(7, 2)", size: 12 }
                      ]
                    },
                    {
                      caption: "第 4 步：横边 Δx=6、竖边 Δy=3——直角三角形造好了！",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "seg", a: [33,46], b: [81,70], color: "target", width: 3.5 },
                        { t: "seg", a: [33,46], b: [81,46], color: "corrA", width: 3 },
                        { t: "seg", a: [81,46], b: [81,70], color: "corrB", width: 3 },
                        { t: "right", v: [81,46], p: [33,46], q: [81,70], size: 6 },
                        { t: "txt", p: [57,40], text: "Δx = 6", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [90,58], text: "Δy = 3", size: 13, bold: true, color: "corrB" },
                        { t: "txt", p: [57,66], text: "勾² + 股² = 弦²", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 4 步：AB 是斜边，横平竖直的两条边是“勾”和“股”——直角三角形造好了。",
                "这个直角三角形是 g05.1.6 的老朋友：距离公式就是勾股定理穿了坐标衣。",
                "证明不重复——g05.1.6 已经证过，这里当工具直接用。"
              ],
              examples: [
                { text: "地图上两点直线距离估算", figure: "实物" }
              ],
              prev: "g13-u1-l1-p3",
              next: "g13-u1-l2-p2"
            },
            {
              id: "g13-u1-l2-p2",
              title: "距离公式：勾股定理的坐标版",
              pageKind: "explain",
              concept: "两点间距离公式",
              formulas: [
                {
                  id: "f1",
                  latex: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
                  translation: "两点距离 = 根号下（横向差的平方 + 纵向差的平方）"
                },
                {
                  id: "f2",
                  latex: "d = \\sqrt{6^2 + 3^2} = 3\\sqrt{5}",
                  translation: "例：A(1,2)、B(7,5)，距离 = 3 倍根号 5"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：横边 Δx、竖边 Δy、斜边 d——勾股定理登场。",
                      shapes: [
                        { t: "seg", a: [33,46], b: [81,70], color: "target", width: 3.5 },
                        { t: "seg", a: [33,46], b: [81,46], color: "corrA", width: 3 },
                        { t: "seg", a: [81,46], b: [81,70], color: "corrB", width: 3 },
                        { t: "right", v: [81,46], p: [33,46], q: [81,70], size: 6 },
                        { t: "txt", p: [57,36], text: "Δx", size: 14, bold: true, color: "corrA" },
                        { t: "txt", p: [90,58], text: "Δy", size: 14, bold: true, color: "corrB" },
                        { t: "txt", p: [57,64], text: "d", size: 16, bold: true, color: "target" },
                        { t: "txt", p: [50,88], text: "d² = Δx² + Δy²", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得上一页吗？你亲手“造”出了直角三角形：横边 Δx、竖边 Δy、斜边 AB。",
                "人话版：先量“横着差多少、竖着差多少”，再用勾股定理——斜边就是两点距离。",
                "例题：A(1, 2)、B(7, 5)：Δx=6、Δy=3，d=√(36+9)=√45=3√5。",
                "分工：开方、化简这些“数”的运算回代数复习；几何只管“形”：距离就是斜边的长。",
                "记住一句话：横竖一画，勾股一算，距离到手。"
              ],
              examples: [
                { text: "操场对角线：横 30 米、竖 40 米，对角线 50 米", figure: "实物" }
              ],
              prev: "g13-u1-l2-p1",
              next: "g13-u1-l2-p3"
            },
            {
              id: "g13-u1-l2-p3",
              title: "中点：正好走一半",
              concept: "中点坐标",
              formulas: [
                {
                  id: "f1",
                  latex: "M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})",
                  translation: "中点 M 的坐标：横坐标是两端横坐标的平均，纵坐标是两端纵坐标的平均"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：线段 AB，A(2, 2)、B(8, 6)。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "pt", p: [41,46], label: "A", color: "known", r: 5 },
                        { t: "txt", p: [41,58], text: "A(2, 2)", size: 12, color: "known" },
                        { t: "pt", p: [89,78], label: "B", color: "known", r: 5 },
                        { t: "txt", p: [80,88], text: "B(8, 6)", size: 12, color: "known" },
                        { t: "seg", a: [41,46], b: [89,78], color: "line", width: 2.5 }
                      ]
                    },
                    {
                      caption: "第 2 步：标出中点 M——线段的正中间。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "seg", a: [41,46], b: [89,78], color: "line", width: 2.5 },
                        { t: "seg", a: [41,46], b: [65,62], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [65,62], b: [89,78], color: "corrA", width: 3, ticks: 1 },
                        { t: "pt", p: [65,62], label: "M", color: "target", r: 5 }
                      ]
                    },
                    {
                      caption: "第 3 步：M(5, 4)——横纵坐标都是“平均”。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "seg", a: [41,46], b: [89,78], color: "line", width: 2.5 },
                        { t: "pt", p: [65,62], label: "M", color: "target", r: 5 },
                        { t: "txt", p: [65,74], text: "M(5, 4)", size: 14, bold: true, color: "target" },
                        { t: "txt", p: [50,90], text: "(2+8)÷2=5，(2+6)÷2=4", size: 13 }
                      ]
                    },
                    {
                      caption: "第 4 步：端点换成 (3, 3)、(7, 5)，中点还是“平均”：(5, 4)。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "seg", a: [49,54], b: [81,70], color: "line", width: 2.5 },
                        { t: "pt", p: [49,54], color: "known", r: 4 },
                        { t: "txt", p: [40,48], text: "(3, 3)", size: 12 },
                        { t: "pt", p: [81,70], color: "known", r: 4 },
                        { t: "txt", p: [88,76], text: "(7, 5)", size: 12 },
                        { t: "pt", p: [65,62], label: "M", color: "target", r: 5 },
                        { t: "txt", p: [65,74], text: "M(5, 4)", size: 14, bold: true, color: "target" },
                        { t: "txt", p: [50,90], text: "端点动，中点永远在正中间", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 3 步：M(5, 4)——横坐标是 (2+8)÷2，纵坐标是 (2+6)÷2，都是“平均”。",
                "第 4 步：端点动，中点永远跟在“正中间”——中点坐标就是端点坐标取平均。"
              ],
              examples: [
                { text: "两人相向而行，相遇点就是中点", figure: "实物" }
              ],
              prev: "g13-u1-l2-p2",
              next: "g13-u1-l2-p4"
            },
            {
              id: "g13-u1-l2-p4",
              title: "中点公式：取个平均",
              pageKind: "explain",
              concept: "中点公式",
              formulas: [
                {
                  id: "f1",
                  latex: "M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})",
                  translation: "中点坐标 = 端点坐标分别取平均"
                },
                {
                  id: "f2",
                  latex: "M = (\\frac{2+8}{2}, \\frac{2+6}{2}) = (5, 4)",
                  translation: "例：A(2,2)、B(8,6)，中点 M 是 (5, 4)"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：横着走一半，竖着走一半——落点就是中点。",
                      shapes: [
                        { t: "seg", a: [41,46], b: [89,78], color: "line", width: 2.5 },
                        { t: "seg", a: [41,46], b: [65,46], color: "corrA", width: 3 },
                        { t: "seg", a: [65,46], b: [65,62], color: "corrB", width: 3 },
                        { t: "pt", p: [65,62], label: "M", color: "target", r: 5 },
                        { t: "txt", p: [53,40], text: "横走一半", size: 12, color: "corrA" },
                        { t: "txt", p: [74,54], text: "竖走一半", size: 12, color: "corrB" },
                        { t: "txt", p: [65,74], text: "M(5, 4)", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话版：中点就是“走一半”的那个点——横着走一半，竖着走一半。",
                "生活例：你和同学相向而行，中点是你们相遇的地方；图形例：A(2,2)、B(8,6)，中点 (5,4)。",
                "反例：(2+8, 2+6)=(10,8) 是把两段路“接起来”，不是中点——平均别忘了除以 2。",
                "记住一句话：中点坐标，端点平均。"
              ],
              examples: [
                { text: "拔河绳正中间系红布条：两端点取平均", figure: "实物" }
              ],
              prev: "g13-u1-l2-p3",
              next: "g13-u1-l3-p1"
            }
          ]
        },
        /* ============ g13.1.3 斜率（4 页） ============ */
        {
          id: "g13-u1-l3",
          title: "直线的倾斜角与斜率",
          pages: [
            {
              id: "g13-u1-l3-p1",
              title: "爬坡：直线越转越陡",
              concept: "斜率的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "k = \\frac{\\Delta y}{\\Delta x}",
                  translation: "斜率 = 纵向变化 ÷ 横向变化"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：k=0.5——缓坡，骑车轻松。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "aux", width: 1.5, dash: "4,3" },
                        { t: "seg", a: [25,30], b: [85,60], color: "known", width: 3.5 },
                        { t: "txt", p: [55,72], text: "k = 0.5 缓坡", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步：k=2——陡坡，得推着走。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "aux", width: 1.5, dash: "4,3" },
                        { t: "seg", a: [25,30], b: [55,90], color: "target", width: 3.5 },
                        { t: "txt", p: [55,72], text: "k = 2 陡坡", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：k=0——平路，不费力。",
                      shapes: [
                        { t: "seg", a: [15,30], b: [90,30], color: "corrA", width: 3.5 },
                        { t: "txt", p: [52,44], text: "k = 0 平路", size: 14, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "第 4 步：k=−1.5——下坡，溜得飞快。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "aux", width: 1.5, dash: "4,3" },
                        { t: "seg", a: [25,90], b: [65,30], color: "corrB", width: 3.5 },
                        { t: "txt", p: [55,72], text: "k = −1.5 下坡", size: 14, bold: true, color: "corrB" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "拖的是“坡度”：k 就是这条“路”有多陡。",
                "看第 3 步：k=0，直线是平的——没坡。",
                "第 4 步：k 是负的，路往下走——下坡。"
              ],
              examples: [
                { text: "盘山公路的坡度牌", figure: "实物" }
              ],
              prev: "g13-u1-l2-p4",
              next: "g13-u1-l3-p2"
            },
            {
              id: "g13-u1-l3-p2",
              title: "斜率 k：纵向变化除以横向变化",
              pageKind: "explain",
              concept: "斜率定义",
              formulas: [
                {
                  id: "f1",
                  latex: "k = \\frac{\\Delta y}{\\Delta x}",
                  translation: "斜率 = 纵向变化 ÷ 横向变化"
                },
                {
                  id: "f2",
                  latex: "k = \\frac{8-2}{4-1} = 2",
                  translation: "例：A(1,2)、B(4,8)，斜率 k = 2"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：横走 3，竖走 6——k=6÷3=2。",
                      shapes: [
                        { t: "pt", p: [33,46], label: "A", color: "known", r: 5 },
                        { t: "txt", p: [33,58], text: "A(1, 2)", size: 12 },
                        { t: "pt", p: [57,82], label: "B", color: "known", r: 5 },
                        { t: "txt", p: [57,92], text: "B(4, 8)", size: 12 },
                        { t: "seg", a: [33,46], b: [57,82], color: "target", width: 3.5 },
                        { t: "seg", a: [33,46], b: [57,46], color: "corrA", width: 3 },
                        { t: "seg", a: [57,46], b: [57,82], color: "corrB", width: 3 },
                        { t: "txt", p: [45,40], text: "横走 3", size: 12, color: "corrA" },
                        { t: "txt", p: [66,64], text: "竖走 6", size: 12, color: "corrB" },
                        { t: "txt", p: [40,90], text: "k = 6÷3 = 2", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话版：横着走 1 步，竖着走几步？走的这“几步”就是斜率 k。",
                "例题：A(1, 2) 到 B(4, 8)：横向走 3，纵向走 6，k=6÷3=2——横走 1、竖走 2。",
                "生活例：盘山公路的“坡度牌”；图形例：k=2 的直线比 k=0.5 的陡。",
                "记住一句话：k 是纵向变化除以横向变化。"
              ],
              examples: [
                { text: "楼梯：横走 1 级、竖上 2 级，斜率 2", figure: "实物" }
              ],
              prev: "g13-u1-l3-p1",
              next: "g13-u1-l3-p3"
            },
            {
              id: "g13-u1-l3-p3",
              title: "k 的符号：上坡、下坡、平路",
              pageKind: "explain",
              concept: "斜率的符号",
              formulas: [
                {
                  id: "f1",
                  latex: "k > 0 \\text{上坡}；k < 0 \\text{下坡}；k = 0 \\text{平路}",
                  translation: "k 大于 0 是上坡，小于 0 是下坡，等于 0 是平路"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    { label: "上坡 k>0",
                      caption: "从左往右看，线往上走——k>0，上坡。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [75,80], color: "known", width: 3.5 },
                        { t: "txt", p: [50,90], text: "k = 2 上坡", size: 15, bold: true, color: "known" }
                      ] },
                    { label: "下坡 k<0",
                      caption: "从左往右看，线往下走——k<0，下坡。",
                      shapes: [
                        { t: "seg", a: [25,80], b: [75,30], color: "target", width: 3.5 },
                        { t: "txt", p: [50,90], text: "k = −2 下坡", size: 15, bold: true, color: "target" }
                      ] }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "从左往右看：k>0，线往上走——上坡；k<0，线往下走——下坡；k=0，线是平的。",
                "生活例：上坡累、下坡爽、平路不费力——k 的符号就是“费力方向”。",
                "反例：竖直线 Δx=0，除法没法做——竖直线没有斜率（k 不存在，不是 k=0）。",
                "别搞混：“没有斜率”和“斜率为 0”是两码事——一个是悬崖（竖直），一个是平地。",
                "记住一句话：正上负下，零平竖无。"
              ],
              examples: [
                { text: "滑梯：从左往右看是下坡，k<0", figure: "实物" }
              ],
              prev: "g13-u1-l3-p2",
              next: "g13-u1-l3-p4"
            },
            {
              id: "g13-u1-l3-p4",
              title: "|k| 越大，越陡",
              pageKind: "explain",
              concept: "斜率的绝对值与陡度",
              formulas: [
                {
                  id: "f1",
                  latex: "|k| \\text{越大，直线越陡}",
                  translation: "k 的绝对值越大，直线越陡峭"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "三条线同场：k=0.5、1、3——越陡 k 越大。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [85,60], color: "corrA", width: 3 },
                        { t: "txt", p: [80,68], text: "k=0.5", size: 12, color: "corrA" },
                        { t: "seg", a: [25,30], b: [75,80], color: "known", width: 3 },
                        { t: "txt", p: [70,88], text: "k=1", size: 12, color: "known" },
                        { t: "seg", a: [25,30], b: [45,90], color: "target", width: 3 },
                        { t: "txt", p: [38,92], text: "k=3", size: 12, color: "target" },
                        { t: "txt", p: [50,18], text: "|k| 越大越陡", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "k=0.5 是缓坡，k=3 是陡坡——符号管方向，大小管陡峭。",
                "生活例：k=3 的坡，骑车上去要推着走。",
                "折叠条预告：倾斜角和斜率还有个更精确的关系（正切），三角模块（v2.0）揭晓——现在用“爬坡”直观就够了。",
                "记住一句话：|k| 是陡峭程度。"
              ],
              examples: [
                { text: "屋顶坡度：南方缓、北方陡（雪滑得下来）", figure: "实物" }
              ],
              prev: "g13-u1-l3-p3",
              next: "g13-u1-l4-p1"
            }
          ]
        },
        /* ============ g13.1.4 直线方程（4 页，两形式拆页；H7） ============ */
        {
          id: "g13-u1-l4",
          title: "直线方程",
          pages: [
            {
              id: "g13-u1-l4-p1",
              title: "k、b 两个旋钮",
              concept: "斜截式中 k、b 的作用",
              formulas: [
                {
                  id: "f1",
                  latex: "y = kx + b",
                  translation: "y 等于 k 乘 x 加 b"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：基准 y=x——k=1，b=0。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [75,80], color: "line", width: 3 },
                        { t: "txt", p: [50,90], text: "y = x（k=1, b=0）", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：转 k 旋钮——y=2x，更陡了。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [75,80], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [25,30], b: [50,80], color: "target", width: 3.5 },
                        { t: "txt", p: [50,90], text: "y = 2x（k 变大，更陡）", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：转 b 旋钮——y=x+2，整体上移。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [75,80], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [25,46], b: [65,86], color: "known", width: 3.5 },
                        { t: "txt", p: [50,94], text: "y = x + 2（b 变大，上移）", size: 13, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 4 步：b=0——直线过原点，起点高度是 0。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [75,80], color: "target", width: 3.5 },
                        { t: "pt", p: [25,30], color: "target", r: 5 },
                        { t: "txt", p: [50,90], text: "b = 0：过原点", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "两个旋钮：k 管“陡不陡”，b 管“高不高”。",
                "看第 4 步：b=0，直线过原点——起点高度是 0。"
              ],
              examples: [
                { text: "调台灯：旋钮调角度（k）、调高低（b）", figure: "实物" }
              ],
              prev: "g13-u1-l3-p4",
              next: "g13-u1-l4-p2"
            },
            {
              id: "g13-u1-l4-p2",
              title: "斜截式：y=kx+b",
              pageKind: "explain",
              concept: "斜截式",
              formulas: [
                {
                  id: "f1",
                  latex: "y = kx + b",
                  translation: "斜截式：k 是斜率，b 是截距"
                },
                {
                  id: "f2",
                  latex: "y = 2x + 1, k = 2, b = 1",
                  translation: "例：y = 2x + 1，斜率 2，截距 1"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：y=2x+1——k=2（陡），b=1（从 (0,1) 出发）。",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [25,18], b: [25,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 13 },
                        { t: "txt", p: [25,95], text: "y", size: 13 },
                        { t: "seg", a: [25,38], b: [60,88], color: "target", width: 3.5 },
                        { t: "pt", p: [25,38], color: "target", r: 5 },
                        { t: "txt", p: [36,38], text: "(0, 1)", size: 12, color: "target" },
                        { t: "txt", p: [50,92], text: "k=2 是坡度，b=1 是起点", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话版：k 是“坡度”（上一课的老朋友），b 是“起点高度”——x=0 时 y=b，直线从 (0,b) 出发。",
                "生活例：打车计价 y=2x+8——起步价 8 元就是 b，每公里 2 元就是 k（回链代数 6.2.2）。",
                "反例：y=x²+b 不是直线——k 必须乘在 x 的“一次”上，x² 是抛物线的地盘。",
                "分工：k、b 的计算（数的部分）回代数 6.2.2 复习；这里只看“形”：k 管陡，b 管高。",
                "记住一句话：k 是坡度，b 是起点。"
              ],
              examples: [
                { text: "手机套餐：月租 b 元，每分钟 k 元", figure: "实物" }
              ],
              prev: "g13-u1-l4-p1",
              next: "g13-u1-l4-p3"
            },
            {
              id: "g13-u1-l4-p3",
              title: "点斜式：过一点、有斜率，直线被锁死",
              pageKind: "explain",
              concept: "点斜式",
              formulas: [
                {
                  id: "f1",
                  latex: "y - y_0 = k(x - x_0)",
                  translation: "点斜式：过点 (x₀, y₀)、斜率为 k 的直线"
                },
                {
                  id: "f2",
                  latex: "y - 3 = 2(x - 1)",
                  translation: "例：过 (1, 3)、k=2：y − 3 = 2(x − 1)"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：点 P(1, 3) 钉死，k 一转，直线绕 P 转——但永远过 P。",
                      shapes: [
                        { t: "pt", p: [45,55], label: "P", color: "target", r: 6 },
                        { t: "txt", p: [45,67], text: "P(1, 3) 钉死", size: 13, bold: true, color: "target" },
                        { t: "seg", a: [25,35], b: [65,75], color: "known", width: 3 },
                        { t: "seg", a: [25,55], b: [65,55], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [35,75], b: [55,35], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,90], text: "k 定了，直线就转不动了", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话版：告诉你“经过哪一点”和“有多陡”，直线就被“锁死”了——动不了。",
                "例题：过 (1, 3)、k=2：y−3=2(x−1)，展开就是 y=2x+1——点斜式和斜截式是同一条直线的两种说法。",
                "别小看：点斜式不是“斜截式的变形”——它是“已知一点一斜率”这个条件的直接翻译。",
                "记住一句话：一点一斜率，锁死一条线。"
              ],
              examples: [
                { text: "钉钉子：钉住一点再定方向，木条就固定了", figure: "实物" }
              ],
              prev: "g13-u1-l4-p2",
              next: "g13-u1-l4-p4"
            },
            {
              id: "g13-u1-l4-p4",
              title: "例题：两点定直线",
              concept: "直线方程例题",
              formulas: [
                {
                  id: "f1",
                  latex: "y = 2x + 1",
                  translation: "过 A(1,3)、B(4,9) 的直线是 y = 2x + 1"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：标出 A(1, 3)、B(4, 9)。",
                      shapes: [
                        { t: "pt", p: [35,50], label: "A", color: "known", r: 5 },
                        { t: "txt", p: [35,62], text: "A(1, 3)", size: 12 },
                        { t: "pt", p: [65,86], label: "B", color: "known", r: 5 },
                        { t: "txt", p: [65,94], text: "B(4, 9)", size: 12 }
                      ]
                    },
                    {
                      caption: "第 2 步：先算斜率 k=(9−3)/(4−1)=2。",
                      shapes: [
                        { t: "pt", p: [35,50], label: "A", color: "known", r: 5 },
                        { t: "pt", p: [65,86], label: "B", color: "known", r: 5 },
                        { t: "seg", a: [35,50], b: [65,86], color: "line", width: 2.5 },
                        { t: "txt", p: [50,32], text: "k = (9−3)/(4−1) = 2", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：写点斜式 y−3=2(x−1)。",
                      shapes: [
                        { t: "seg", a: [25,40], b: [75,90], color: "target", width: 3 },
                        { t: "pt", p: [35,50], label: "A", color: "target", r: 5 },
                        { t: "txt", p: [50,28], text: "y − 3 = 2(x − 1)", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：化简 y=2x+1；把 B 代入验算：9=2×4+1 ✓。",
                      shapes: [
                        { t: "seg", a: [25,40], b: [75,90], color: "target", width: 3 },
                        { t: "pt", p: [65,86], label: "B", color: "known", r: 5 },
                        { t: "txt", p: [50,28], text: "y = 2x + 1", size: 15, bold: true, color: "target" },
                        { t: "txt", p: [50,16], text: "9 = 2×4 + 1 ✓", size: 13, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三步走：先算斜率 k，再写点斜式，最后化简成斜截式。",
                "第 4 步验算：把 B(4, 9) 代进去，9=2×4+1 ✓——点在直线上，方程就没错。"
              ],
              examples: [
                { text: "两点定直线：先求坡度，再定起点", figure: "方法" }
              ],
              prev: "g13-u1-l4-p3",
              next: "g13-u1-l5-p1"
            }
          ]
        },
        /* ============ g13.1.5 两直线的位置关系（4 页，平行/垂直拆页） ============ */
        {
          id: "g13-u1-l5",
          title: "两直线的位置关系",
          pages: [
            {
              id: "g13-u1-l5-p1",
              title: "平行 vs 垂直：看 k",
              concept: "位置关系与斜率",
              formulas: [
                {
                  id: "f1",
                  latex: "k_1 = k_2 \\text{平行}；k_1 k_2 = -1 \\text{垂直}",
                  translation: "斜率相等就平行；斜率乘积等于 −1 就垂直"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：l₁: y=x+1，l₂: y=x−2——k 都是 1，永不相交。",
                      shapes: [
                        { t: "seg", a: [25,38], b: [75,88], color: "known", width: 3 },
                        { t: "txt", p: [68,92], text: "l₁", size: 13, color: "known" },
                        { t: "seg", a: [25,14], b: [75,64], color: "corrA", width: 3 },
                        { t: "txt", p: [68,68], text: "l₂", size: 13, color: "corrA" },
                        { t: "txt", p: [50,28], text: "k₁ = k₂ = 1：平行", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：如果 b 也相等——两条线重合成一条。",
                      shapes: [
                        { t: "seg", a: [25,38], b: [75,88], color: "target", width: 4 },
                        { t: "txt", p: [50,92], text: "k、b 都相等：同一条直线", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：l₁: y=2x，l₂: y=−x/2——k₁k₂=−1。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [50,80], color: "known", width: 3 },
                        { t: "txt", p: [44,84], text: "l₁", size: 13, color: "known" },
                        { t: "seg", a: [25,30], b: [75,5], color: "corrA", width: 3 },
                        { t: "txt", p: [70,12], text: "l₂", size: 13, color: "corrA" },
                        { t: "txt", p: [50,92], text: "k₁=2, k₂=−½：k₁k₂=−1", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 4 步：交角是 90°——这就是垂直。",
                      shapes: [
                        { t: "seg", a: [25,30], b: [50,80], color: "known", width: 3 },
                        { t: "seg", a: [25,30], b: [75,5], color: "corrA", width: 3 },
                        { t: "right", v: [25,30], p: [50,80], q: [75,5], size: 7 },
                        { t: "txt", p: [50,92], text: "垂直：交角 90°", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "第 1 步：两条线坡度一样，怎么走都不碰头——这就是平行。",
                "第 3 步：k₁k₂=−1，两条线“掐”出 90°——这就是垂直。"
              ],
              examples: [
                { text: "铁轨平行，墙角垂直", figure: "实物" }
              ],
              prev: "g13-u1-l4-p4",
              next: "g13-u1-l5-p2"
            },
            {
              id: "g13-u1-l5-p2",
              title: "平行：k₁=k₂",
              pageKind: "explain",
              concept: "平行线的斜率条件",
              formulas: [
                {
                  id: "f1",
                  latex: "k_1 = k_2 \\Rightarrow l_1 \\parallel l_2",
                  translation: "斜率相等，两直线平行"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    { label: "平行：k 相同",
                      caption: "k₁=k₂=1：两条线永不相交——平行。",
                      shapes: [
                        { t: "seg", a: [25,40], b: [75,90], color: "known", width: 3 },
                        { t: "seg", a: [25,24], b: [75,74], color: "known", width: 3 },
                        { t: "txt", p: [50,92], text: "k₁ = k₂：平行", size: 14, bold: true, color: "known" }
                      ] },
                    { label: "相交：k 不同",
                      caption: "k₁=1、k₂=2：坡度不一样，迟早碰头——相交。",
                      shapes: [
                        { t: "seg", a: [25,40], b: [75,90], color: "known", width: 3 },
                        { t: "seg", a: [25,40], b: [50,90], color: "target", width: 3 },
                        { t: "txt", p: [50,92], text: "k₁ ≠ k₂：相交", size: 14, bold: true, color: "target" }
                      ] }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话版：坡度一样的两条路，永远保持同样的“距离”，不会碰头。",
                "生活例：铁轨；图形例：y=x+1 和 y=x−2。",
                "反例：k 相等、b 也相等——那是同一条直线，不是“两条平行线”。",
                "别搞混：平行是“k 相等”，重合是“k、b 都相等”。",
                "记住一句话：同坡永不交。"
              ],
              examples: [
                { text: "斑马线：k 全相等，条条平行", figure: "实物" }
              ],
              prev: "g13-u1-l5-p1",
              next: "g13-u1-l5-p3"
            },
            {
              id: "g13-u1-l5-p3",
              title: "慢放证明：k₁k₂=−1",
              concept: "垂直的斜率条件证明",
              formulas: [
                {
                  id: "f1",
                  latex: "l_1 \\perp l_2 \\Rightarrow k_1 k_2 = -1",
                  translation: "两直线垂直，则斜率乘积等于 −1"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "l₁: y = k₁x，l₂: y = k₂x，l₁ ⊥ l₂",
                  goal: "k₁k₂ = −1",
                  steps: [
                    {
                      card: "先把两条直线平移到过原点——平移不改变垂不垂直。",
                      reason: "平移不改变直线的方向（g02.2.4）；记 l₁: y=k₁x，l₂: y=k₂x",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [50,18], b: [50,92], color: "line", width: 2 },
                        { t: "seg", a: [50,30], b: [75,80], color: "known", width: 3 },
                        { t: "txt", p: [70,84], text: "l₁", size: 13, color: "known" },
                        { t: "seg", a: [50,30], b: [90,10], color: "corrA", width: 3 },
                        { t: "txt", p: [84,16], text: "l₂", size: 13, color: "corrA" },
                        { t: "pt", p: [50,30], label: "O", color: "line", r: 4 }
                      ]
                    },
                    {
                      card: "在 x=1 处立一根“标杆”，交 l₁ 于 A、交 l₂ 于 B。",
                      reason: "作图；A(1, k₁)、B(1, k₂)（点在直线上，坐标满足方程）",
                      shapes: [
                        { t: "seg", a: [12,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [50,18], b: [50,92], color: "line", width: 2 },
                        { t: "seg", a: [50,30], b: [75,80], color: "line", width: 2.5 },
                        { t: "seg", a: [50,30], b: [90,10], color: "line", width: 2.5 },
                        { t: "seg", a: [62,10], b: [62,90], color: "target", width: 3, dash: "5,4" },
                        { t: "pt", p: [62,54], label: "A", color: "target", r: 5 },
                        { t: "txt", p: [70,54], text: "A(1, k₁)", size: 12, color: "target" },
                        { t: "pt", p: [62,24], label: "B", color: "target", r: 5 },
                        { t: "txt", p: [70,24], text: "B(1, k₂)", size: 12, color: "target" },
                        { t: "pt", p: [50,30], label: "O", color: "line", r: 4 }
                      ]
                    },
                    {
                      card: "算三边平方：OA²=1+k₁²，OB²=1+k₂²，AB²=(k₁−k₂)²。",
                      reason: "距离公式（g05.1.6；本课 1.2 当工具用）",
                      shapes: [
                        { t: "seg", a: [50,30], b: [62,54], color: "corrA", width: 3.5 },
                        { t: "seg", a: [50,30], b: [62,24], color: "corrB", width: 3.5 },
                        { t: "seg", a: [62,54], b: [62,24], color: "corrC", width: 3.5 },
                        { t: "txt", p: [44,46], text: "OA²=1+k₁²", size: 12, color: "corrA" },
                        { t: "txt", p: [44,22], text: "OB²=1+k₂²", size: 12, color: "corrB" },
                        { t: "txt", p: [72,40], text: "AB²=(k₁−k₂)²", size: 12, color: "corrC" }
                      ]
                    },
                    {
                      card: "l₁⊥l₂，所以 ∠AOB=90°，OA²+OB²=AB²。",
                      reason: "勾股定理（g05.1.2）",
                      shapes: [
                        { t: "seg", a: [50,30], b: [62,54], color: "line", width: 2.5 },
                        { t: "seg", a: [50,30], b: [62,24], color: "line", width: 2.5 },
                        { t: "seg", a: [62,54], b: [62,24], color: "line", width: 2.5 },
                        { t: "right", v: [50,30], p: [62,54], q: [62,24], size: 7 },
                        { t: "txt", p: [50,72], text: "OA² + OB² = AB²", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      card: "展开化简：2=−2k₁k₂，即 k₁k₂=−1。",
                      reason: "等式化简：两边消去 k₁²、k₂²",
                      shapes: [
                        { t: "seg", a: [50,30], b: [62,54], color: "line", width: 2 },
                        { t: "seg", a: [50,30], b: [62,24], color: "line", width: 2 },
                        { t: "seg", a: [62,54], b: [62,24], color: "line", width: 2 },
                        { t: "txt", p: [50,60], text: "2 = −2k₁k₂", size: 14, bold: true },
                        { t: "txt", p: [50,78], text: "k₁k₂ = −1", size: 17, bold: true, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "平移两直线过原点：l₁: y=k₁x，l₂: y=k₂x", reason: "平移不改变方向（g02.2.4）" },
                    { statement: "x=1 处立标杆，得 A(1,k₁)、B(1,k₂)", reason: "作图；点在直线上" },
                    { statement: "OA²=1+k₁²，OB²=1+k₂²，AB²=(k₁−k₂)²", reason: "距离公式（g05.1.6）" },
                    { statement: "垂直 → OA²+OB²=AB²", reason: "勾股定理（g05.1.2）" },
                    { statement: "展开化简得 k₁k₂=−1", reason: "等式化简" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三问：已知？求证？第 1 步凭什么平移？（平移不改变方向，g02.2.4）",
                "关键动作：第 4 步把“垂直”翻译成“勾股定理能用”——老定理是新证明的砖。"
              ],
              examples: [
                { text: "反过来也成立：k₁k₂=−1 → 垂直（思路一样，留作思考）", figure: "回链" }
              ],
              prev: "g13-u1-l5-p2",
              next: "g13-u1-l5-p4"
            },
            {
              id: "g13-u1-l5-p4",
              title: "垂直：k₁k₂=−1",
              pageKind: "explain",
              concept: "垂直线的斜率条件",
              formulas: [
                {
                  id: "f1",
                  latex: "k_1 k_2 = -1 \\Rightarrow l_1 \\perp l_2",
                  translation: "斜率乘积等于 −1，两直线垂直"
                },
                {
                  id: "f2",
                  latex: "y = -\\frac{1}{2}x + 3",
                  translation: "例：与 y=2x+1 垂直且过 (0,3) 的直线是 y=−x/2+3"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：y=2x+1 与 y=−x/2+3——k=2 和 k=−1/2，乘积 −1。",
                      shapes: [
                        { t: "seg", a: [25,44], b: [50,94], color: "known", width: 3 },
                        { t: "txt", p: [44,94], text: "y=2x+1", size: 12, color: "known" },
                        { t: "seg", a: [25,44], b: [75,19], color: "target", width: 3 },
                        { t: "txt", p: [68,16], text: "y=−x/2+3", size: 12, color: "target" },
                        { t: "right", v: [25,44], p: [50,94], q: [75,19], size: 6 },
                        { t: "txt", p: [50,60], text: "2 × (−½) = −1", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话版：两条直线“掐”出 90°，它们的斜率一定“互为负倒数”——2 和 −1/2。",
                "例题：求过 (0, 3) 且与 y=2x+1 垂直的直线：k=−1/2，b=3，得 y=−x/2+3。",
                "生活例：墙角——墙和地面垂直；图形例：y=2x 和 y=−x/2 在原点掐出直角。",
                "反例：k₁=2、k₂=1/2（正倒数）不垂直——符号别丢，负号是“拐弯”的关键。",
                "记住一句话：垂直看乘积，等于负一。"
              ],
              examples: [
                { text: "桌面与桌腿：垂直的两条线", figure: "实物" }
              ],
              prev: "g13-u1-l5-p3",
              next: "g13-u1-l6-p1"
            }
          ]
        },
        /* ============ g13.1.6 抛物线的几何定义（5 页；H8；推导做 proof-replay 慢放） ============ */
        {
          id: "g13-u1-l6",
          title: "抛物线的几何定义",
          pages: [
            {
              id: "g13-u1-l6-p1",
              title: "焦点离准线越远，抛物线越“胖”",
              concept: "抛物线形状与焦点准线",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{到焦点距离} = \\text{到准线距离}",
                  translation: "抛物线上每一点，到焦点的距离等于到准线的距离"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：标准抛物线——焦点 F，准线 l。",
                      shapes: [
                        { t: "seg", a: [20,34], b: [80,34], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [84,34], text: "l", size: 13 },
                        { t: "poly", pts: [[30,88],[40,68],[50,60],[60,68],[70,88]], close: false, color: "target", width: 3.5 },
                        { t: "pt", p: [50,66], label: "F", color: "known", r: 5 },
                        { t: "txt", p: [50,92], text: "焦点 F，准线 l", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：F 靠近准线——抛物线变“瘦高”。",
                      shapes: [
                        { t: "seg", a: [20,44], b: [80,44], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [84,44], text: "l", size: 13 },
                        { t: "poly", pts: [[38,88],[46,66],[50,62],[54,66],[62,88]], close: false, color: "target", width: 3.5 },
                        { t: "pt", p: [50,58], label: "F", color: "known", r: 5 },
                        { t: "txt", p: [50,92], text: "F 靠近 l：瘦高", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：F 远离准线——抛物线变“矮胖”。",
                      shapes: [
                        { t: "seg", a: [20,24], b: [80,24], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [84,24], text: "l", size: 13 },
                        { t: "poly", pts: [[24,88],[38,70],[50,66],[62,70],[76,88]], close: false, color: "target", width: 3.5 },
                        { t: "pt", p: [50,74], label: "F", color: "known", r: 5 },
                        { t: "txt", p: [50,92], text: "F 远离 l：矮胖", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 4 步：P 在抛物线上——PF 与 P 到准线的垂线段等长。",
                      shapes: [
                        { t: "seg", a: [20,34], b: [80,34], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [84,34], text: "l", size: 13 },
                        { t: "poly", pts: [[30,88],[40,68],[50,60],[60,68],[70,88]], close: false, color: "line", width: 2.5 },
                        { t: "pt", p: [50,66], label: "F", color: "known", r: 5 },
                        { t: "pt", p: [60,68], label: "P", color: "target", r: 5 },
                        { t: "seg", a: [60,68], b: [50,66], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [60,68], b: [60,34], color: "target", width: 3, ticks: 1 },
                        { t: "txt", p: [50,92], text: "两段一样长：等距", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "第 4 步：P 到 F 的线段和 P 到准线的垂线段，刻度一样——等距。",
                "焦点动一动，抛物线跟着变“胖瘦”——形状被焦点和准线“锁死”。"
              ],
              examples: [
                { text: "探照灯反射面、手电筒反光碗：抛物线", figure: "实物" }
              ],
              prev: "g13-u1-l5-p4",
              next: "g13-u1-l6-p2"
            },
            {
              id: "g13-u1-l6-p2",
              title: "抛物线的出生证明",
              pageKind: "explain",
              concept: "抛物线的几何定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{到}F\\text{的距离} = \\text{到}l\\text{的距离}",
                  translation: "抛物线：到焦点 F 的距离等于到准线 l 的距离的点的轨迹"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：焦点 F、准线 l、动点 P——两段等长。",
                      shapes: [
                        { t: "seg", a: [20,34], b: [80,34], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [84,34], text: "准线 l", size: 13 },
                        { t: "poly", pts: [[30,88],[40,68],[50,60],[60,68],[70,88]], close: false, color: "line", width: 2.5 },
                        { t: "pt", p: [50,66], label: "F", color: "known", r: 5 },
                        { t: "txt", p: [42,66], text: "焦点", size: 12, color: "known" },
                        { t: "pt", p: [60,68], label: "P", color: "target", r: 5 },
                        { t: "seg", a: [60,68], b: [50,66], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [60,68], b: [60,34], color: "target", width: 3, ticks: 1 },
                        { t: "txt", p: [50,92], text: "PF = P 到准线的距离", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话版：抛物线不是“长这样的”，而是“这么来的”——到一个定点和一条定直线等距的点，走出来的轨迹。",
                "新名词：定点叫焦点（F），定直线叫准线（l）——记住这两个名字，后面推导全靠它们。",
                "点题：代数 7.1 给的是“长相公式” y=ax²，几何给的是“出生证明”——同一条抛物线，两种说法。",
                "分工：二次函数图像的性质（数的部分）回代数 7.1 复习；这里只看“形”：等距的轨迹。",
                "记住一句话：抛物线，到焦准等距的轨迹。"
              ],
              examples: [
                { text: "出生证明 vs 长相公式：同一条抛物线，两种定义", figure: "方法" }
              ],
              prev: "g13-u1-l6-p1",
              next: "g13-u1-l6-p3"
            },
            {
              id: "g13-u1-l6-p3",
              title: "慢放推导：从等距到 y=ax²",
              concept: "抛物线方程推导",
              formulas: [
                {
                  id: "f1",
                  latex: "x^2 = 4py \\Rightarrow y = ax^2",
                  translation: "化简得 x² = 4py，记 a = ¼p，就得到 y = ax²"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "焦点 F(0, p)，准线 l：y = −p",
                  goal: "y = ax²，a = ¼p",
                  steps: [
                    {
                      card: "设轨迹上任意一点 P(x, y)——“任意”就是“每一”。",
                      reason: "设点法：轨迹方程就是“轨迹上每一点的坐标都满足的式子”",
                      shapes: [
                        { t: "seg", a: [20,30], b: [80,30], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [84,30], text: "l: y=−p", size: 12 },
                        { t: "pt", p: [50,70], label: "F", color: "known", r: 5 },
                        { t: "txt", p: [58,70], text: "F(0, p)", size: 12, color: "known" },
                        { t: "pt", p: [66,58], label: "P", color: "target", r: 5 },
                        { t: "txt", p: [74,58], text: "P(x, y)", size: 12, color: "target" }
                      ]
                    },
                    {
                      card: "PF 用距离公式算，到准线的距离是垂线段。",
                      reason: "距离公式（本课 1.2）；点到直线的距离是垂线段（g02.1.3）",
                      shapes: [
                        { t: "seg", a: [20,30], b: [80,30], color: "aux", width: 2, dash: "6,4" },
                        { t: "pt", p: [50,70], label: "F", color: "known", r: 5 },
                        { t: "pt", p: [66,58], label: "P", color: "target", r: 5 },
                        { t: "seg", a: [66,58], b: [50,70], color: "target", width: 3 },
                        { t: "txt", p: [60,70], text: "PF=√[x²+(y−p)²]", size: 12, color: "target" },
                        { t: "seg", a: [66,58], b: [66,30], color: "corrA", width: 3 },
                        { t: "txt", p: [76,44], text: "|y+p|", size: 13, color: "corrA" }
                      ]
                    },
                    {
                      card: "等距列等式：√[x²+(y−p)²] = |y+p|。",
                      reason: "抛物线定义：到焦点距离 = 到准线距离（本课 P2）",
                      shapes: [
                        { t: "pt", p: [50,70], label: "F", color: "known", r: 5 },
                        { t: "pt", p: [66,58], label: "P", color: "target", r: 5 },
                        { t: "seg", a: [66,58], b: [50,70], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [66,58], b: [66,30], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [20,30], b: [80,30], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [50,86], text: "√[x²+(y−p)²] = |y+p|", size: 15, bold: true, color: "target" }
                      ]
                    },
                    {
                      card: "两边平方、展开：x²+y²−2py+p² = y²+2py+p²。",
                      reason: "等式两边平方去根号；完全平方展开",
                      shapes: [
                        { t: "txt", p: [50,62], text: "x² + (y−p)² = (y+p)²", size: 15, bold: true },
                        { t: "txt", p: [50,44], text: "x²+y²−2py+p² = y²+2py+p²", size: 13 },
                        { t: "txt", p: [50,28], text: "平方去根号，展开", size: 12 }
                      ]
                    },
                    {
                      card: "约掉 y² 和 p²：x²=4py，记 a=1/(4p)，得 y=ax²。",
                      reason: "合并同类项；等式变形",
                      shapes: [
                        { t: "poly", pts: [[30,88],[40,68],[50,60],[60,68],[70,88]], close: false, color: "line", width: 2.5 },
                        { t: "txt", p: [50,40], text: "x² = 4py", size: 15, bold: true },
                        { t: "txt", p: [50,24], text: "y = ax²（a = ¼p）", size: 16, bold: true, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "设轨迹上任意点 P(x, y)", reason: "设点法" },
                    { statement: "PF=√[x²+(y−p)²]，到准线距离 |y+p|", reason: "距离公式（本课 1.2）" },
                    { statement: "列等式：√[x²+(y−p)²]=|y+p|", reason: "抛物线定义（本课 P2）" },
                    { statement: "平方展开：x²+y²−2py+p²=y²+2py+p²", reason: "去根号；完全平方" },
                    { statement: "化简得 y=ax²（a=¼p）", reason: "合并同类项" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三问：已知？求证？第 2 步 PF 凭什么这么算？（距离公式，本课 1.2）",
                "关键动作：第 4 步“两边平方”去根号——这是把“形”翻译成“数”的常规操作。"
              ],
              examples: [
                { text: "出生证明变长相公式：等距的轨迹就是 y=ax²", figure: "方法" }
              ],
              prev: "g13-u1-l6-p2",
              next: "g13-u1-l6-p4"
            },
            {
              id: "g13-u1-l6-p4",
              title: "y=ax² 的“出生”复盘",
              pageKind: "explain",
              concept: "抛物线方程中 a 的几何意义",
              formulas: [
                {
                  id: "f1",
                  latex: "y = ax^2, a = \\frac{1}{4p}",
                  translation: "y = ax²，其中 a = 1/(4p)：p 决定开口宽窄"
                },
                {
                  id: "f2",
                  latex: "p \\text{越大，开口越宽}",
                  translation: "焦点离准线越远（p 越大），抛物线开口越宽"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：p=0.5/1/2——a=0.5/0.25/0.125，开口越来越宽。",
                      shapes: [
                        { t: "poly", pts: [[40,88],[47,68],[50,64],[53,68],[60,88]], close: false, color: "corrA", width: 3 },
                        { t: "txt", p: [68,88], text: "p=0.5", size: 12, color: "corrA" },
                        { t: "poly", pts: [[30,88],[40,68],[50,60],[60,68],[70,88]], close: false, color: "known", width: 3 },
                        { t: "txt", p: [76,68], text: "p=1", size: 12, color: "known" },
                        { t: "poly", pts: [[20,88],[36,70],[50,64],[64,70],[80,88]], close: false, color: "target", width: 3 },
                        { t: "txt", p: [84,88], text: "p=2", size: 12, color: "target" },
                        { t: "txt", p: [50,30], text: "p 越大，a 越小，开口越宽", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "复盘：焦点 F(0,p)、准线 y=−p，推出 y=ax²，a=1/(4p)——a 藏着 p 的信息。",
                "人话版：p 是“焦点到准线距离的一半”；p 越大，a 越小，开口越宽——和 P1 交互看到的一样。",
                "呼应：代数 7.1 的 y=ax² 现在有了“出生证明”——它是对称轴为 y 轴、顶点在原点的抛物线。",
                "记住一句话：a=1/(4p)，p 定宽窄。"
              ],
              examples: [
                { text: "a 不是神秘数字：它是焦点位置的“密码”", figure: "方法" }
              ],
              prev: "g13-u1-l6-p3",
              next: "g13-u1-l6-p5"
            },
            {
              id: "g13-u1-l6-p5",
              title: "例题：已知焦点写方程",
              concept: "抛物线方程例题",
              formulas: [
                {
                  id: "f1",
                  latex: "y = \\frac{1}{8}x^2",
                  translation: "焦点 (0,2)、准线 y=−2 的抛物线方程是 y = x²/8"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：焦点 F(0, 2)、准线 y=−2——读出 p=2。",
                      shapes: [
                        { t: "seg", a: [20,30], b: [80,30], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [86,30], text: "y=−2", size: 12 },
                        { t: "pt", p: [50,70], label: "F", color: "known", r: 5 },
                        { t: "txt", p: [58,70], text: "F(0, 2)", size: 12, color: "known" },
                        { t: "txt", p: [50,90], text: "p = 2", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：a=1/(4×2)=1/8。",
                      shapes: [
                        { t: "txt", p: [50,60], text: "a = 1/(4p) = ⅛", size: 16, bold: true, color: "target" },
                        { t: "txt", p: [50,44], text: "p=2 代入", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：方程 y=x²/8。",
                      shapes: [
                        { t: "poly", pts: [[30,88],[40,68],[50,60],[60,68],[70,88]], close: false, color: "target", width: 3.5 },
                        { t: "txt", p: [50,40], text: "y = x²/8", size: 16, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：验算——点 (4, 2)：到 F 距离 4，到准线距离 4 ✓。",
                      shapes: [
                        { t: "seg", a: [20,30], b: [80,30], color: "aux", width: 2, dash: "6,4" },
                        { t: "pt", p: [50,70], label: "F", color: "known", r: 5 },
                        { t: "pt", p: [66,70], color: "corrA", r: 5 },
                        { t: "txt", p: [74,70], text: "(4, 2)", size: 12 },
                        { t: "seg", a: [66,70], b: [50,70], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [66,70], b: [66,30], color: "corrA", width: 3, ticks: 1 },
                        { t: "txt", p: [50,90], text: "4 = 4 ✓ 在抛物线上", size: 13, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三步走：读出 p，算出 a=1/(4p)，写出 y=ax²。",
                "第 4 步验算：(4, 2) 到焦点的距离和到准线的距离都是 4——在抛物线上，方程没错。"
              ],
              examples: [
                { text: "已知焦点/准线 → p → a → 方程", figure: "方法" }
              ],
              prev: "g13-u1-l6-p4",
              next: "g13-u1-l7-p1"
            }
          ]
        },
        /* ============ g13.1.7 圆的方程（3 页） ============ */
        {
          id: "g13-u1-l7",
          title: "圆的方程",
          pages: [
            {
              id: "g13-u1-l7-p1",
              title: "圆心拖到哪里，方程跟到哪里",
              concept: "圆的标准方程",
              formulas: [
                {
                  id: "f1",
                  latex: "(x-a)^2 + (y-b)^2 = r^2",
                  translation: "圆心 (a,b)、半径 r 的圆：(x−a)² + (y−b)² = r²"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：圆心在原点——x²+y²=4（g08.1.5 的老朋友）。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 24, color: "line", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 5 },
                        { t: "txt", p: [50,90], text: "x² + y² = 4", size: 15, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：圆心拖到 (3, 1)——方程变成 (x−3)²+(y−1)²=4。",
                      shapes: [
                        { t: "circle", c: [62,58], r: 24, color: "target", width: 3 },
                        { t: "pt", p: [62,58], label: "C", color: "target", r: 5 },
                        { t: "txt", p: [70,58], text: "C(3, 1)", size: 12, color: "target" },
                        { t: "txt", p: [50,90], text: "(x−3)² + (y−1)² = 4", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：圆心再拖到 (−2, 3)——(x+2)²+(y−3)²=1。",
                      shapes: [
                        { t: "circle", c: [42,66], r: 16, color: "corrA", width: 3 },
                        { t: "pt", p: [42,66], label: "C", color: "corrA", r: 5 },
                        { t: "txt", p: [52,66], text: "C(−2, 3)", size: 12, color: "corrA" },
                        { t: "txt", p: [50,90], text: "(x+2)² + (y−3)² = 1", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "圆心动，方程里的 a、b 跟着动——方程是圆的“身份证号”。",
                "第 1 步：圆心在原点，方程退化成 x²+y²=r²（g08.1.5 的老朋友）。"
              ],
              examples: [
                { text: "给圆搬家：圆心坐标就是方程里的 a、b", figure: "方法" }
              ],
              prev: "g13-u1-l6-p5",
              next: "g13-u1-l7-p2"
            },
            {
              id: "g13-u1-l7-p2",
              title: "圆的方程：平移推广",
              pageKind: "explain",
              concept: "圆的标准方程",
              formulas: [
                {
                  id: "f1",
                  latex: "(x-a)^2 + (y-b)^2 = r^2",
                  translation: "圆心 (a,b)、半径 r 的圆的方程"
                },
                {
                  id: "f2",
                  latex: "(x-3)^2 + (y-1)^2 = 4",
                  translation: "例：圆心 (3,1)、半径 2 的圆：(x−3)²+(y−1)²=4"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    { label: "圆心在原点",
                      caption: "圆心 O(0,0)：x²+y²=r²（g08.1.5）。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 24, color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 5 },
                        { t: "txt", p: [50,90], text: "x² + y² = r²", size: 15, bold: true, color: "known" }
                      ] },
                    { label: "圆心在 (a,b)",
                      caption: "把圆“搬”到 (a,b)：x 换成 x−a，y 换成 y−b。",
                      shapes: [
                        { t: "circle", c: [62,58], r: 24, color: "target", width: 3 },
                        { t: "pt", p: [62,58], label: "C", color: "target", r: 5 },
                        { t: "txt", p: [50,90], text: "(x−a)² + (y−b)² = r²", size: 14, bold: true, color: "target" }
                      ] }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话版：圆上每一点到圆心 (a,b) 的距离都是 r——距离公式直接写出来，就是 (x−a)²+(y−b)²=r²。",
                "这是 g08.1.5 的平移推广：把圆心从原点“搬”到 (a,b)，方程里的 x、y 就变成 x−a、y−b。",
                "生活例：“把圆搬家，方程跟着搬”——平移的思想（g02.2.4）又回来了。",
                "记住一句话：圆心定位置，半径定大小，方程全写下。"
              ],
              examples: [
                { text: "x−a：向右搬 a；y−b：向上搬 b", figure: "方法" }
              ],
              prev: "g13-u1-l7-p1",
              next: "g13-u1-l7-p3"
            },
            {
              id: "g13-u1-l7-p3",
              title: "例题：写方程，判点位",
              concept: "圆的方程例题",
              formulas: [
                {
                  id: "f1",
                  latex: "(x-2)^2 + (y+1)^2 = 9",
                  translation: "圆心 (2,−1)、半径 3 的圆：(x−2)²+(y+1)²=9"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：圆心 (2, −1)、半径 3。",
                      shapes: [
                        { t: "circle", c: [56,44], r: 27, color: "line", width: 3 },
                        { t: "pt", p: [56,44], label: "C", color: "known", r: 5 },
                        { t: "txt", p: [66,44], text: "C(2, −1)", size: 12 },
                        { t: "txt", p: [50,90], text: "r = 3", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：写方程 (x−2)²+(y+1)²=9——注意 y−(−1)=y+1。",
                      shapes: [
                        { t: "circle", c: [56,44], r: 27, color: "target", width: 3 },
                        { t: "txt", p: [50,90], text: "(x−2)² + (y+1)² = 9", size: 14, bold: true, color: "target" },
                        { t: "txt", p: [50,78], text: "y−(−1) = y+1，符号别抄错", size: 12 }
                      ]
                    },
                    {
                      caption: "第 3 步：P(2, 2) 代入：0+9=9——在圆上。",
                      shapes: [
                        { t: "circle", c: [56,44], r: 27, color: "line", width: 2.5 },
                        { t: "pt", p: [56,62], color: "corrA", r: 5 },
                        { t: "txt", p: [66,62], text: "P(2, 2)", size: 12 },
                        { t: "txt", p: [50,90], text: "(2−2)²+(2+1)² = 9：在圆上", size: 13, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "第 4 步：Q(0, 0) 代入：4+1=5<9——在圆内。",
                      shapes: [
                        { t: "circle", c: [56,44], r: 27, color: "line", width: 2.5 },
                        { t: "pt", p: [44,32], color: "corrB", r: 5 },
                        { t: "txt", p: [34,32], text: "Q(0, 0)", size: 12 },
                        { t: "txt", p: [50,90], text: "(0−2)²+(0+1)² = 5 < 9：在圆内", size: 13, bold: true, color: "corrB" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "先写方程：(x−2)²+(y+1)²=9——注意 y−(−1)=y+1，符号别抄错。",
                "判点位：代入算一算，=9 在圆上，<9 在圆内，>9 在圆外。"
              ],
              examples: [
                { text: "方程是圆的“安检门”：代入就知道点在哪", figure: "方法" }
              ],
              prev: "g13-u1-l7-p2",
              next: "g13-u1-l8-p1"
            }
          ]
        },
        /* ============ g13.1.8 切线斜率与导数（3 页；H9；页首跳过提示） ============ */
        {
          id: "g13-u1-l8",
          title: "切线斜率与导数",
          pages: [
            {
              id: "g13-u1-l8-p1",
              title: "割线逼近切线",
              concept: "切线是割线的极限",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{切线} = \\text{割线的极限位置}",
                  translation: "切线是割线不断逼近的极限位置"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: true,
                  steps: [
                    {
                      caption: "第 1 步：曲线上取 P(1, 1) 和较远的 Q(2, 4)，连割线 PQ。",
                      shapes: [
                        { t: "poly", pts: [[30,88],[40,66],[50,52],[60,44],[70,40]], close: false, color: "line", width: 2.5 },
                        { t: "txt", p: [76,40], text: "y = x²（示意）", size: 12 },
                        { t: "pt", p: [50,52], label: "P", color: "target", r: 5 },
                        { t: "txt", p: [42,52], text: "P(1, 1)", size: 12, color: "target" },
                        { t: "pt", p: [60,44], label: "Q", color: "known", r: 5 },
                        { t: "txt", p: [68,44], text: "Q(2, 4)", size: 12, color: "known" },
                        { t: "seg", a: [50,52], b: [60,44], color: "known", width: 3 }
                      ]
                    },
                    {
                      caption: "第 2 步：Q 向 P 靠近——割线跟着转动。",
                      shapes: [
                        { t: "poly", pts: [[30,88],[40,66],[50,52],[60,44],[70,40]], close: false, color: "line", width: 2.5 },
                        { t: "pt", p: [50,52], label: "P", color: "target", r: 5 },
                        { t: "pt", p: [55,48], label: "Q", color: "known", r: 5 },
                        { t: "txt", p: [63,48], text: "Q(1.5, 2.25)", size: 11, color: "known" },
                        { t: "seg", a: [50,52], b: [55,48], color: "known", width: 3 }
                      ]
                    },
                    {
                      caption: "第 3 步：Q 无限靠近 P——割线变成了切线。",
                      shapes: [
                        { t: "poly", pts: [[30,88],[40,66],[50,52],[60,44],[70,40]], close: false, color: "line", width: 2.5 },
                        { t: "pt", p: [50,52], label: "P", color: "target", r: 6 },
                        { t: "seg", a: [30,72], b: [70,32], color: "target", width: 3.5 },
                        { t: "txt", p: [50,88], text: "切线：割线的极限位置", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：放大镜——切线在 P 点附近“贴”着曲线。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 22, color: "aux", width: 2, dash: "5,4" },
                        { t: "poly", pts: [[38,66],[46,56],[50,52],[54,48],[62,40]], close: false, color: "line", width: 2.5 },
                        { t: "seg", a: [32,70], b: [68,34], color: "target", width: 3 },
                        { t: "pt", p: [50,52], label: "P", color: "target", r: 5 },
                        { t: "txt", p: [50,88], text: "放大看：切线“贴”着曲线", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "没学过代数第 11 章（导数）？这一课可以先跳过，回头再来，不影响 1.9。",
                "看第 2、3 步：Q 越靠近 P，割线越“贴”向切线——“逼近”就是这么个动作。",
                "第 4 步的放大镜，和代数 11.1.2 的放大镜是同一套画法——一眼认出来。"
              ],
              examples: [
                { text: "汽车后视镜：越近越大——逼近的直观", figure: "实物" }
              ],
              prev: "g13-u1-l7-p3",
              next: "g13-u1-l8-p2"
            },
            {
              id: "g13-u1-l8-p2",
              title: "切线斜率：该点处的“变化率”",
              pageKind: "explain",
              concept: "切线斜率即导数",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{切线斜率} = \\text{导数}",
                  translation: "曲线在 x₀ 处的切线斜率，就是该点的导数"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：切线有多陡，曲线在这一点就变化多快。",
                      shapes: [
                        { t: "poly", pts: [[30,88],[40,66],[50,52],[60,44],[70,40]], close: false, color: "line", width: 2.5 },
                        { t: "seg", a: [30,72], b: [70,32], color: "target", width: 3.5 },
                        { t: "pt", p: [50,52], label: "P", color: "target", r: 6 },
                        { t: "txt", p: [50,88], text: "切线斜率 = 该点的变化率", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话版：切线有多陡，就是曲线在这一点“变化有多快”——陡=变化快。",
                "圆的例子：圆上一点的切线垂直于过该点的半径（g08.1.2）——切线与半径斜率乘积是 −1（本课 1.5）。",
                "分工：导数的计算（数的部分）回代数 11.1.3 复习；这里只看“形”：切线是割线的极限。",
                "记住一句话：切线斜率，就是变化率。"
              ],
              examples: [
                { text: "过山车最高点：切线是水平的，变化率为 0", figure: "实物" }
              ],
              prev: "g13-u1-l8-p1",
              next: "g13-u1-l8-p3"
            },
            {
              id: "g13-u1-l8-p3",
              title: "回声：y=x² 在 (1,1) 处",
              pageKind: "explain",
              concept: "切线斜率的直观计算",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{切线斜率} = 2",
                  translation: "y = x² 在点 (1,1) 处的切线斜率是 2"
                },
                {
                  id: "f2",
                  latex: "y - 1 = 2(x - 1)",
                  translation: "切线方程：y − 1 = 2(x − 1)"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：Q 取 (2, 4)，割线斜率 (4−1)/(2−1)=3。",
                      shapes: [
                        { t: "pt", p: [50,52], label: "P", color: "target", r: 5 },
                        { t: "txt", p: [42,52], text: "P(1, 1)", size: 12 },
                        { t: "pt", p: [60,44], color: "known", r: 4 },
                        { t: "txt", p: [68,44], text: "Q(2, 4)", size: 12 },
                        { t: "txt", p: [50,88], text: "k = 3", size: 15, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：Q 取 (1.5, 2.25)，割线斜率 2.5。",
                      shapes: [
                        { t: "pt", p: [50,52], label: "P", color: "target", r: 5 },
                        { t: "pt", p: [55,48], color: "known", r: 4 },
                        { t: "txt", p: [63,48], text: "Q(1.5, 2.25)", size: 11 },
                        { t: "txt", p: [50,88], text: "k = 2.5", size: 15, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：Q 取 (1.1, 1.21)，割线斜率 2.1——逼近 2。",
                      shapes: [
                        { t: "pt", p: [50,52], label: "P", color: "target", r: 6 },
                        { t: "txt", p: [50,88], text: "k → 2", size: 16, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：切线方程——过 (1,1)、k=2，点斜式直接写。",
                      shapes: [
                        { t: "seg", a: [30,72], b: [70,32], color: "target", width: 3.5 },
                        { t: "pt", p: [50,52], label: "P", color: "target", r: 5 },
                        { t: "txt", p: [50,88], text: "y − 1 = 2(x − 1)", size: 15, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "直观算法：Q 取 (2,4)，割线斜率 (4−1)/(2−1)=3；Q 越靠近 (1,1)，斜率越靠近 2。",
                "代数 11.1.3 算出来也是 2——“数”和“形”在这里握手。",
                "切线方程：过 (1,1)、k=2——点斜式（本课 1.4）直接写：y−1=2(x−1)。",
                "记住一句话：逼近出来的 2，就是导数。"
              ],
              examples: [
                { text: "3 → 2.5 → 2.1 → 2：逼近的数列", figure: "方法" }
              ],
              prev: "g13-u1-l8-p2",
              next: "g13-u1-l9-p1"
            }
          ]
        },
        /* ============ g13.1.9 全书总结：数与形的统一（2 页） ============ */
        {
          id: "g13-u1-l9",
          title: "全书总结：数与形的统一",
          pages: [
            {
              id: "g13-u1-l9-p1",
              title: "数与形：同一问题的两种说法",
              pageKind: "explain",
              concept: "数形结合方法论",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{形} \\Rightarrow \\text{数}",
                  translation: "形→数：用坐标和方程描述图形"
                },
                {
                  id: "f2",
                  latex: "\\text{数} \\Rightarrow \\text{形}",
                  translation: "数→形：用图像和轨迹理解式子"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：几何问题——两圆是什么关系？",
                      shapes: [
                        { t: "circle", c: [42,52], r: 20, color: "known", width: 3 },
                        { t: "circle", c: [62,52], r: 20, color: "corrA", width: 3 },
                        { t: "txt", p: [50,88], text: "几何：两圆相交？", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：翻译成代数——解方程组。",
                      shapes: [
                        { t: "txt", p: [50,66], text: "x² + y² = 4", size: 15, bold: true },
                        { t: "txt", p: [50,50], text: "(x−2)² + y² = 4", size: 15, bold: true },
                        { t: "txt", p: [50,32], text: "解方程组", size: 14, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：数形握手——方程组的解就是交点坐标。",
                      shapes: [
                        { t: "circle", c: [42,52], r: 20, color: "known", width: 2.5 },
                        { t: "circle", c: [62,52], r: 20, color: "corrA", width: 2.5 },
                        { t: "pt", p: [52,69], color: "target", r: 5 },
                        { t: "pt", p: [52,35], color: "target", r: 5 },
                        { t: "txt", p: [50,88], text: "解 = 交点 (1, ±√3)", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "全书一句话：几何是“看得见的代数”，代数是“算得出的几何”。",
                "方法论：几何问题→翻译成代数（列方程）→算→翻译回几何（看图形）。本章每一课都在练这套动作。",
                "回看：g00.1.4 我们第一次握手（x² 是正方形）；g13.1.9 我们最后一次握手——切线斜率是导数。",
                "数形结合不是口号，是工作方法：卡住的时候，换一种语言再想一遍。",
                "记住一句话：数缺形时少直观，形缺数时难入微。"
              ],
              examples: [
                { text: "与 g00.1.4 同一张“数形握手”图：首尾呼应", figure: "回链" }
              ],
              prev: "g13-u1-l8-p3",
              next: "g13-u1-l9-p2"
            },
            {
              id: "g13-u1-l9-p2",
              title: "全书综合：6 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{数形互译}",
                  translation: "数形互译：几何与代数是同一规律的两种语言"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "做题锦囊：先想“形”（画图），再想“数”（列式），最后“翻译”回来。",
                      shapes: [
                        { t: "txt", p: [50,74], text: "形：画图", size: 15, bold: true, color: "known" },
                        { t: "seg", a: [50,66], b: [50,56], color: "line", width: 2.5 },
                        { t: "txt", p: [50,48], text: "数：列式计算", size: 15, bold: true, color: "target" },
                        { t: "seg", a: [50,40], b: [50,30], color: "line", width: 2.5 },
                        { t: "txt", p: [50,22], text: "翻译回几何作答", size: 15, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "1．认图：圆心(2,3)、半径4的圆方程是？A．(x−2)²+(y−3)²=16 B．(x+2)²+(y+3)²=16",
                "2．直用：A(1,2)、B(7,10)，求 AB 的距离和中点坐标。",
                "3．小综合：直线 y=2x+1 与 y=2x−3 什么关系？求过 (0,0) 且与 y=2x+1 垂直的直线方程。",
                "4．变式：抛物线 y=2x² 的焦点坐标是？（提示：a=1/(4p)）",
                "5．生活建模：地图上两点 (3,4)、(9,12)（单位 km），直线距离多远？",
                "6．想一想：为什么“形→数→形”走一圈，问题反而变简单了？（开放题，说说你的理解）"
              ],
              examples: [
                { figure: "核对答案", text: "1．A。2．距离 10，中点 (4,6)。3．平行；y=−x/2。4．(0,⅛)：a=2=1/(4p) 得 p=⅛。5．10 km：横差 6、竖差 8。6．开放：代数擅长算，几何擅长看，互译取长补短。" }
              ],
              prev: "g13-u1-l9-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
