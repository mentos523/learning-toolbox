/* ============================================================
 * 学习工具箱 · 数学 · 几何 g03：三角形（一）——认识三角形
 *
 * 黄队（教育教学专家）生产：6 课 / 20 页（白队一屏预算评审执行版）。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g03 章）
 * 教学设计：docs/math-geometry-pedagogy.md（跃升 3、跃升 4 落地课）
 * 参数手册：docs/math-geometry-params.md v1.1
 * 白队评审：/tmp/white_geom_budget_g01_g04.md（g03 15→19 页）
 *
 * 页构成（白队逐课页清单）：
 *   g03.1.1 三角形的定义与三边关系  3页  P1 小棒拼 P2 定义表示 P3 三边关系+反例
 *   g03.1.2 三角形的分类与三线      4页  P1 分类对照 P2 三线点亮 P3 分类讲解 P4 三线讲解(钝角高在形外)
 *   g03.1.3 三角形内角和            5页  P1 拖量 P2 批量100 P3 撕拼 P4 proof-replay P5 讲解（严格执行不压缩）
 *   g03.1.4 三角形的外角            3页  P1 张开动画 P2 证明 P3 讲解（含“记住一句话”）
 *   g03.1.5 多边形的内角和          3页  P1 对角线剖分 P2 H19加边交互 P3 公式讲解（外角和不加）
 *   g03.1.6 本章小结与习题          2页  小结串讲 + 习题
 *
 * 交互类型：step-play / compare-toggle / vertex-drag / tap-highlight / proof-replay
 * proof-replay params 约定（按教学设计 §4.2，蓝队实现）：
 *   { given, goal, steps: [{caption, shapes, card(≤40字), why}], summary: [{statement, reason}] }
 *   已知标蓝色、求证标红色；每步 = 画布高亮 + 人话卡片 + "为什么可以"折叠；收尾两栏式。
 * （params 只用语义色名，不出现具体色值；逻辑坐标 0–100，y 向上）
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g03"] = {
  id: "g03",
  title: "三角形（一）：认识三角形",
  units: [
    {
      id: "g03-u1",
      title: "三角形的基础",
      lessons: [
        {
          id: "g03-u1-l1",
          title: "三角形的定义与三边关系",
          pages: [
            {
              id: "g03-u1-l1-p1",
              title: "三根小棒：拼得成，拼不成",
              concept: "围成三角形的条件",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三条线段首尾相连}",
                  translation: "三条线段首尾相连，才能围成三角形"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "两根太短",
                      caption: "两根小棒太短，顶端怎么也碰不到一起——围不成三角形。",
                      shapes: [
                        { t: "seg", a: [15,35], b: [85,35], color: "line", width: 4 },
                        { t: "seg", a: [15,35], b: [34,62], color: "target", width: 4 },
                        { t: "seg", a: [85,35], b: [68,62], color: "target", width: 4 },
                        { t: "txt", p: [50,52], text: "够不着！", size: 15, bold: true, color: "target" },
                        { t: "txt", p: [50,76], text: "太短的两根碰不到一起", size: 13 }
                      ]
                    },
                    {
                      label: "换一根长的",
                      caption: "换一根长点的：三根小棒首尾相连，严丝合缝拼成了三角形。",
                      shapes: [
                        { t: "poly", pts: [[15,35],[85,35],[50,72]], color: "known", width: 4 },
                        { t: "pt", p: [15,35], r: 3, color: "line" },
                        { t: "pt", p: [85,35], r: 3, color: "line" },
                        { t: "pt", p: [50,72], r: 3, color: "line" },
                        { t: "txt", p: [50,80], text: "首尾相连，围成了！", size: 13, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“两根太短”：顶端够不着，有豁口——围不成。",
                "点“换一根长的”：三根小棒首尾相连，拼成了三角形。",
                "变的是小棒的长度；不变的是——拼好的那个图形。",
                "这就是今天的主角：三角形。先别急着记术语，动手感觉得到了。"
              ],
              examples: [
                { text: "钉三角架：两根短木条拼不拢，换长的才行", figure: "实测" }
              ],
              prev: null,
              next: "g03-u1-l1-p2"
            },
            {
              id: "g03-u1-l1-p2",
              title: "什么是三角形：三条线段首尾相连",
              pageKind: "explain",
              concept: "三角形的定义与表示",
              formulas: [
                {
                  id: "f1",
                  latex: "\\triangle ABC",
                  translation: "三角形 ABC：三条线段首尾相连围成的图形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：三角形 △ABC——顶点 A、B、C，边 a、b、c。",
                      shapes: [
                        { t: "poly", pts: [[20,32],[80,32],[50,70]], color: "line", width: 3 },
                        { t: "txt", p: [15,24], text: "A", size: 14, bold: true },
                        { t: "txt", p: [85,24], text: "B", size: 14, bold: true },
                        { t: "txt", p: [50,78], text: "C", size: 14, bold: true },
                        { t: "txt", p: [50,24], text: "边 c", size: 12, color: "known" },
                        { t: "txt", p: [74,58], text: "边 a", size: 12, color: "known" },
                        { t: "txt", p: [26,58], text: "边 b", size: 12, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页你亲手拼好的那个图形，就叫三角形。",
                "三角形：三条线段首尾相连围成的图形——关键是“围”成的。",
                "表示法：记作 △ABC，读作“三角形 ABC”；三个顶点是大写字母。",
                "生活例：自行车架、衣架——拉一拉，不变形（下章揭晓为什么）。",
                "图形例：顶点 A 的对边记作 a，B 的对边记作 b，C 的对边记作 c。",
                "反例：三根线段没连上、有豁口——没围住，不是三角形。",
                "⚠️ 别搞混：顶点是点，边是线段——边不叫“直线”。",
                "记住一句话：三条线段，首尾相连。"
              ],
              examples: [
                { text: "衣架、屋顶人字梁：都是三角形", figure: "实物" }
              ],
              prev: "g03-u1-l1-p1",
              next: "g03-u1-l1-p3"
            },
            {
              id: "g03-u1-l1-p3",
              title: "三边关系：两边之和大于第三边",
              pageKind: "explain",
              concept: "三角形三边关系",
              formulas: [
                {
                  id: "f1",
                  latex: "a + b > c",
                  translation: "三角形任意两边之和大于第三边"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "能围成",
                      caption: "5cm、6cm、7cm：5+6>7，5+7>6，6+7>5——围得成。",
                      shapes: [
                        { t: "poly", pts: [[18,40],[78,40],[50,72]], color: "known", width: 3.5 },
                        { t: "txt", p: [48,33], text: "7", size: 13, color: "known" },
                        { t: "txt", p: [72,60], text: "5", size: 13, color: "known" },
                        { t: "txt", p: [28,60], text: "6", size: 13, color: "known" }
                      ]
                    },
                    {
                      label: "围不成",
                      caption: "3cm、4cm、8cm：3+4=7<8——两根加起来还没第三根长，围不成。",
                      shapes: [
                        { t: "seg", a: [12,40], b: [88,40], color: "line", width: 4 },
                        { t: "seg", a: [12,40], b: [30,62], color: "target", width: 4 },
                        { t: "seg", a: [88,40], b: [62,62], color: "target", width: 4 },
                        { t: "txt", p: [50,55], text: "够不着！", size: 14, bold: true, color: "target" },
                        { t: "txt", p: [30,72], text: "3+4=7 < 8", size: 13, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得小狗抄近道吗？走直线比走折线近——这就是“两点之间线段最短”。",
                "从 B 到 C：直接走边 a，和绕道 A 走（b+c），哪个短？a < b+c。",
                "三边关系：任意两边之和大于第三边——三组都要成立。",
                "反例：3cm、4cm、8cm——3+4=7<8，试一试就知道围不成。",
                "⚠️ 易错：“大于”不能改成“大于等于”——相等时三点共线，压成一条线段了。",
                "记住一句话：两边之和，必须大于第三边。"
              ],
              examples: [
                { text: "木工做三角架：两根短木条必须“够得着”第三根", figure: "实物" }
              ],
              prev: "g03-u1-l1-p2",
              next: "g03-u1-l2-p1"
            }
          ]
        },
        {
          id: "g03-u1-l2",
          title: "三角形的分类与三线",
          pages: [
            {
              id: "g03-u1-l2-p1",
              title: "分一分：按边分，还是按角分？",
              concept: "三角形的分类",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{按边分} \\quad / \\quad \\text{按角分}",
                  translation: "三角形有两种分法：看边，或看角"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "按边分",
                      caption: "看边：三边都相等→等边三角形；两边相等→等腰三角形。",
                      shapes: [
                        { t: "poly", pts: [[22,62],[48,62],[35,30]], color: "corrA", width: 3 },
                        { t: "seg", a: [22,62], b: [48,62], ticks: 3, color: "corrA" },
                        { t: "seg", a: [48,62], b: [35,30], ticks: 3, color: "corrA" },
                        { t: "seg", a: [35,30], b: [22,62], ticks: 3, color: "corrA" },
                        { t: "txt", p: [35,72], text: "等边", size: 13, color: "corrA" },
                        { t: "poly", pts: [[58,62],[84,62],[71,36]], color: "corrB", width: 3 },
                        { t: "seg", a: [58,62], b: [71,36], ticks: 2, color: "corrB" },
                        { t: "seg", a: [71,36], b: [84,62], ticks: 2, color: "corrB" },
                        { t: "txt", p: [71,72], text: "等腰", size: 13, color: "corrB" }
                      ]
                    },
                    {
                      label: "按角分",
                      caption: "看角：三个锐角→锐角三角形；一个直角→直角三角形；一个钝角→钝角三角形。",
                      shapes: [
                        { t: "poly", pts: [[14,62],[40,62],[27,32]], color: "corrA", width: 3 },
                        { t: "txt", p: [27,72], text: "锐角", size: 13, color: "corrA" },
                        { t: "poly", pts: [[48,62],[74,62],[48,32]], color: "corrB", width: 3 },
                        { t: "right", v: [48,62], p: [48,32], q: [74,62], size: 6, color: "corrB" },
                        { t: "txt", p: [61,72], text: "直角", size: 13, color: "corrB" },
                        { t: "poly", pts: [[78,62],[96,62],[66,30]], color: "corrC", width: 3 },
                        { t: "txt", p: [82,72], text: "钝角", size: 13, color: "corrC" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“按边分”：看边长——等边（3 条等长刻度）、等腰（2 条等长刻度）。",
                "点“按角分”：看角——锐角、直角（有直角方块）、钝角。",
                "变的是边长和角度；不变的是——它们都是三角形。",
                "分三角形先问一句：我是按边分，还是按角分？"
              ],
              examples: [
                { text: "红领巾：等腰三角形；三角板：直角三角形", figure: "实物" }
              ],
              prev: "g03-u1-l1-p3",
              next: "g03-u1-l2-p2"
            },
            {
              id: "g03-u1-l2-p2",
              title: "点一点：高、中线、角平分线",
              concept: "三角形的高、中线、角平分线",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{高} \\quad / \\quad \\text{中线} \\quad / \\quad \\text{角平分线}",
                  translation: "从一个顶点出发，能画出三种不一样的线"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "poly", pts: [[14,30],[84,30],[30,72]], color: "line", width: 3 },
                    { t: "txt", p: [9,24], text: "B", size: 14, bold: true },
                    { t: "txt", p: [89,24], text: "C", size: 14, bold: true },
                    { t: "txt", p: [30,80], text: "A", size: 14, bold: true },
                    { t: "pt", p: [30,30], r: 3, color: "line" },
                    { t: "txt", p: [23,20], text: "D", size: 12 },
                    { t: "pt", p: [49,30], r: 3, color: "line" },
                    { t: "txt", p: [55,20], text: "M", size: 12 },
                    { t: "pt", p: [41.8,30], r: 2.5, color: "line" },
                    { t: "txt", p: [37,20], text: "E", size: 12 }
                  ],
                  groups: [
                    { name: "高", color: "corrA" },
                    { name: "中线", color: "corrB" },
                    { name: "角平分线", color: "corrC" }
                  ],
                  items: [
                    { id: "alt", label: "高 AD", group: 0, anchor: [22,52],
                      shape: { t: "seg", a: [30,72], b: [30,30], color: "corrA", width: 3 } },
                    { id: "med", label: "中线 AM", group: 1, anchor: [58,52],
                      shape: { t: "seg", a: [30,72], b: [49,30], color: "corrB", width: 3, dash: "6,3" } },
                    { id: "bis", label: "角平分线 AE", group: 2, anchor: [46,52],
                      shape: { t: "seg", a: [30,72], b: [41.8,30], color: "corrC", width: 3 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "从顶点 A 出发，能画三条不一样的线——点一点，把它们送进各自的组。",
                "高 AD：从 A 向对边 BC 画垂线，垂足是 D——“高”是垂直的。",
                "中线：连到对边中点 M——“中”是中点的中。",
                "角平分线：把 ∠A 平分成两半的线——“分”的是角。",
                "全部点亮后记住：从一个顶点出发，三条线各走各的路。"
              ],
              examples: [
                { text: "认旧友：这三条线你刚点亮过，下页给它们正式起名字", figure: "回链" }
              ],
              prev: "g03-u1-l2-p1",
              next: "g03-u1-l2-p3"
            },
            {
              id: "g03-u1-l2-p3",
              title: "分类讲透：等边也是等腰",
              pageKind: "explain",
              concept: "三角形分类",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{等边} \\subset \\text{等腰}",
                  translation: "等边三角形是等腰三角形的一种"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：按边分——等边（它也是等腰）、等腰、不等边；按角分——锐角、直角、钝角。",
                      shapes: [
                        { t: "poly", pts: [[18,62],[42,62],[30,32]], color: "corrA", width: 3 },
                        { t: "txt", p: [30,72], text: "等边", size: 13, color: "corrA" },
                        { t: "poly", pts: [[52,62],[76,62],[64,36]], color: "corrB", width: 3 },
                        { t: "txt", p: [64,72], text: "等腰", size: 13, color: "corrB" },
                        { t: "poly", pts: [[24,28],[46,28],[24,12]], color: "corrC", width: 3 },
                        { t: "right", v: [24,28], p: [24,12], q: [46,28], size: 5, color: "corrC" },
                        { t: "txt", p: [35,36], text: "直角", size: 13, color: "corrC" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一课你亲手点过两种分法：按边看、按角看。",
                "按边：三条边都相等——等边三角形；有两条边相等——等腰三角形。",
                "等边三角形也是等腰三角形（它也有两条边相等）——等边是等腰的一种。",
                "按角：三个角都是锐角——锐角三角形；有一个直角——直角三角形；有一个钝角——钝角三角形。",
                "一个三角形里最多有一个直角或钝角——两个直角的话，角和就超过 180° 了（内角和下节课揭晓）。",
                "⚠️ 别搞混：“等腰”和“等边”不是并列的，等边是等腰的一种。",
                "记住一句话：分三角形，先问“按什么分”。"
              ],
              examples: [
                { text: "金字塔侧面：等腰三角形", figure: "实物" }
              ],
              prev: "g03-u1-l2-p2",
              next: "g03-u1-l2-p4"
            },
            {
              id: "g03-u1-l2-p4",
              title: "三线讲透：钝角三角形的高在形外",
              pageKind: "explain",
              concept: "高、中线、角平分线的性质",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{钝角三角形的高可以在形外}",
                  translation: "钝角三角形的高不一定画在图形里面"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "锐角三角形",
                      caption: "锐角三角形：三条高都在形内，垂足都落在边上。",
                      shapes: [
                        { t: "poly", pts: [[22,30],[82,30],[52,70]], color: "line", width: 3 },
                        { t: "seg", a: [52,70], b: [52,30], color: "corrA", width: 3 },
                        { t: "right", v: [52,30], p: [52,70], q: [82,30], size: 5, color: "corrA" },
                        { t: "txt", p: [52,80], text: "高在形内", size: 13, color: "corrA" }
                      ]
                    },
                    {
                      label: "钝角三角形",
                      caption: "钝角三角形：从锐角顶点画高，垂足落在对边的延长线上——高跑到形外了。",
                      shapes: [
                        { t: "poly", pts: [[40,62],[68,30],[96,30]], color: "line", width: 3 },
                        { t: "seg", a: [96,30], b: [30,30], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [40,62], b: [40,30], color: "corrA", width: 3 },
                        { t: "right", v: [40,30], p: [40,62], q: [96,30], size: 5, color: "corrA" },
                        { t: "txt", p: [50,80], text: "高在形外！", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页你亲手点亮过三条线：高、中线、角平分线。",
                "锐角三角形里：三条高都在形内——垂足落在边上。",
                "钝角三角形里：从锐角顶点画高，垂足落在对边的延长线上——高跑到形外去了。",
                "⚠️ 易错：“高一定在三角形里面”——错！钝角三角形的高可以在形外。",
                "中线和角平分线永远在形内——它们连的是边上的点，不用延长。",
                "记住一句话：高看垂直，中线看中点，角平分线看角。"
              ],
              examples: [
                { text: "认旧友：这三条线就是上一页你点亮过的那三条", figure: "回链" }
              ],
              prev: "g03-u1-l2-p3",
              next: "g03-u1-l3-p1"
            }
          ]
        },
        {
          id: "g03-u1-l3",
          title: "三角形内角和",
          pages: [
            {
              id: "g03-u1-l3-p1",
              title: "拖一拖：内角和永远是 180°",
              concept: "三角形内角和实验",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle A + \\angle B + \\angle C = 180\\text{度}",
                  translation: "拖顶点时三个角度数在变，但它们的和永远是 180 度"
                }
              ],
              interaction: {
                type: "vertex-drag",
                params: {
                  vertices: [
                    { x: 20, y: 28, label: "A" },
                    { x: 82, y: 28, label: "B" },
                    { x: 52, y: 72, label: "C" }
                  ],
                  showLengths: true,
                  showAngles: true
                }
              },
              auxInteraction: null,
              hints: [
                "拖动蓝色顶点：三角形变大变小、变胖变瘦。",
                "看顶部读数：三个角的度数在变，它们的和——永远 180°。",
                "没变的是：内角和 = 180°（这就是不变量徽章）。",
                "先动手看到，再问为什么——下页我们做 100 个实验。"
              ],
              examples: [
                { text: "量角器验证：拿纸三角形量一量，和也是 180°", figure: "实测" }
              ],
              prev: "g03-u1-l2-p4",
              next: "g03-u1-l3-p2"
            },
            {
              id: "g03-u1-l3-p2",
              title: "只量 3 个就敢说永远？",
              concept: "实验不是证明",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{量 100 个也是“量”，不是“证”}",
                  translation: "再多的测量也代替不了证明"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：量了 3 个三角形，内角和都是 180°——巧合吗？",
                      shapes: [
                        { t: "poly", pts: [[14,60],[40,60],[27,34]], color: "line", width: 2.5 },
                        { t: "txt", p: [27,72], text: "180°", size: 12, color: "known" },
                        { t: "poly", pts: [[46,60],[72,60],[46,34]], color: "line", width: 2.5 },
                        { t: "txt", p: [59,72], text: "180°", size: 12, color: "known" },
                        { t: "poly", pts: [[76,60],[94,60],[82,30]], color: "line", width: 2.5 },
                        { t: "txt", p: [85,72], text: "180°", size: 12, color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步：随机生成 100 个三角形，一字排开——全是 180°。",
                      shapes: [
                        { t: "txt", p: [50,56], text: "100 个三角形", size: 20, bold: true },
                        { t: "txt", p: [50,40], text: "180° × 100", size: 15, color: "known" },
                        { t: "txt", p: [50,26], text: "全部 180°，一个不少", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：量 100 个也是“量”，不是“证”——第 101 个呢？",
                      shapes: [
                        { t: "txt", p: [50,58], text: "量，永远量不完", size: 18, bold: true, color: "target" },
                        { t: "txt", p: [50,40], text: "我们要一次说清所有三角形", size: 14 },
                        { t: "txt", p: [50,24], text: "下页：撕角拼图", size: 13, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "3 个三角形都是 180°——巧合吗？点 ▶ 看 100 个。",
                "100 个都对，但第 101 个呢？量，永远量不完。",
                "量出来的是“规律”，说清楚“为什么”的叫证明。",
                "下页：撕角拼图——拼一次，说清所有三角形。"
              ],
              examples: [],
              prev: "g03-u1-l3-p1",
              next: "g03-u1-l3-p3"
            },
            {
              id: "g03-u1-l3-p3",
              title: "撕角拼角：拼成一条直线",
              concept: "拼图证明内角和",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三个角拼成平角} = 180\\text{度}",
                  translation: "三个内角拼成一条直线，就是 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：完整的三角形，三个角都在。",
                      shapes: [
                        { t: "poly", pts: [[20,70],[80,70],[50,27]], color: "line", width: 3 },
                        { t: "arc", v: [20,70], a1: 304.9, a2: 0, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [80,70], a1: 180, a2: 235.1, r: 10, group: 2, color: "corrAngle" },
                        { t: "arc", v: [50,27], a1: 55.1, a2: 124.9, r: 10, group: 3, color: "corrAngle" }
                      ]
                    },
                    {
                      caption: "第 2 步：把三个角撕下来，顶点拼到一起。",
                      shapes: [
                        { t: "poly", pts: [[20,70],[80,70],[50,27]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "arc", v: [50,45], a1: 0, a2: 48, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 48, a2: 132, r: 12, group: 2, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 132, a2: 180, r: 14, group: 3, color: "corrAngle" },
                        { t: "seg", a: [28,45], b: [72,45], color: "aux", dash: "5,4" }
                      ]
                    },
                    {
                      caption: "第 3 步：三个角拼成一条直线——内角和是 180°。",
                      shapes: [
                        { t: "seg", a: [20,45], b: [80,45], color: "line", width: 3 },
                        { t: "arc", v: [50,45], a1: 0, a2: 48, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 48, a2: 132, r: 12, group: 2, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 132, a2: 180, r: 14, group: 3, color: "corrAngle" },
                        { t: "txt", p: [50,28], text: "三个角拼成平角", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶ 播放：三个角被“撕”下来，顶点拼到一起。",
                "看第 3 步：严丝合缝拼成一条直线——平角是 180°。",
                "拼的动作不依赖三角形的长相——哪个三角形来都一样拼。",
                "这就是证明的雏形：拼一次，就说清了所有三角形。"
              ],
              examples: [
                { text: "剪纸片：剪下纸三角形的三个角，自己拼一拼", figure: "实测" }
              ],
              prev: "g03-u1-l3-p2",
              next: "g03-u1-l3-p4"
            },
            {
              id: "g03-u1-l3-p4",
              title: "证明：过顶点作平行线",
              concept: "三角形内角和的证明",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle A + \\angle B + \\angle C = 180\\text{度}",
                  translation: "三角形三个内角的和等于 180 度"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "△ABC",
                  goal: "∠A + ∠B + ∠C = 180°",
                  steps: [
                    {
                      caption: "第 1 步：过点 C 作直线 DE，使 DE ∥ AB。",
                      shapes: [
                        { t: "poly", pts: [[18,28],[82,28],[58,72]], color: "line", width: 3 },
                        { t: "seg", a: [20,72], b: [88,72], color: "aux", width: 2.5, dash: "6,4", arrows: 2 },
                        { t: "pt", p: [58,72], r: 3, color: "line" },
                        { t: "txt", p: [13,68], text: "D", size: 13 },
                        { t: "txt", p: [95,68], text: "E", size: 13 },
                        { t: "txt", p: [13,24], text: "A", size: 13, bold: true },
                        { t: "txt", p: [87,24], text: "B", size: 13, bold: true },
                        { t: "txt", p: [58,80], text: "C", size: 13, bold: true }
                      ],
                      card: "画一条辅助线：过 C 作 AB 的平行线——给三个角搭个“舞台”。",
                      why: "依据：平行公理——过直线外一点，有且只有一条直线与已知直线平行。"
                    },
                    {
                      caption: "第 2 步：∠A = ∠ACD（内错角）。",
                      shapes: [
                        { t: "poly", pts: [[18,28],[82,28],[58,72]], color: "line", width: 2 },
                        { t: "seg", a: [20,72], b: [88,72], color: "aux", width: 2, dash: "6,4" },
                        { t: "arc", v: [18,28], a1: 0, a2: 48, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [58,72], a1: 180, a2: 228, r: 11, group: 1, color: "corrA" },
                        { t: "txt", p: [30,20], text: "∠A", size: 13, color: "corrA" },
                        { t: "txt", p: [46,64], text: "∠ACD", size: 13, color: "corrA" }
                      ],
                      card: "∠A 和 ∠ACD 是内错角——平行线一画，它们就相等了。",
                      why: "依据：平行线的性质——两直线平行，内错角相等。"
                    },
                    {
                      caption: "第 3 步：∠B = ∠BCE（内错角）。",
                      shapes: [
                        { t: "poly", pts: [[18,28],[82,28],[58,72]], color: "line", width: 2 },
                        { t: "seg", a: [20,72], b: [88,72], color: "aux", width: 2, dash: "6,4" },
                        { t: "arc", v: [82,28], a1: 119, a2: 180, r: 11, group: 2, color: "corrB" },
                        { t: "arc", v: [58,72], a1: 299, a2: 360, r: 11, group: 2, color: "corrB" },
                        { t: "txt", p: [70,20], text: "∠B", size: 13, color: "corrB" },
                        { t: "txt", p: [70,64], text: "∠BCE", size: 13, color: "corrB" }
                      ],
                      card: "∠B 和 ∠BCE 也是内错角——同样相等。",
                      why: "依据：平行线的性质——内错角相等。"
                    },
                    {
                      caption: "第 4 步：∠ACD、∠C、∠BCE 拼成一条直线——180°。",
                      shapes: [
                        { t: "seg", a: [20,72], b: [88,72], color: "line", width: 3 },
                        { t: "seg", a: [18,28], b: [58,72], color: "line", width: 2 },
                        { t: "seg", a: [82,28], b: [58,72], color: "line", width: 2 },
                        { t: "arc", v: [58,72], a1: 180, a2: 228, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [58,72], a1: 228, a2: 299, r: 14, group: 3, color: "corrC" },
                        { t: "arc", v: [58,72], a1: 299, a2: 360, r: 11, group: 2, color: "corrB" },
                        { t: "txt", p: [58,84], text: "DCE 是一条直线", size: 13, bold: true }
                      ],
                      card: "看 DCE：三个角排排坐，拼成一条直线——180°。",
                      why: "依据：平角的定义——一条直线是 180°。"
                    },
                    {
                      caption: "第 5 步：把 ∠ACD、∠BCE 换成 ∠A、∠B——证毕。",
                      shapes: [
                        { t: "poly", pts: [[18,28],[82,28],[58,72]], color: "known", width: 3 },
                        { t: "txt", p: [50,50], text: "∠A + ∠B + ∠C = 180°", size: 15, bold: true, math: true }
                      ],
                      card: "∠ACD=∠A、∠BCE=∠B，换一下：∠A+∠B+∠C=180°。",
                      why: "依据：等量代换。"
                    }
                  ],
                  summary: [
                    { statement: "过点 C 作直线 DE ∥ AB", reason: "平行公理" },
                    { statement: "∠A = ∠ACD", reason: "平行线性质：内错角相等" },
                    { statement: "∠B = ∠BCE", reason: "平行线性质：内错角相等" },
                    { statement: "∠ACD + ∠C + ∠BCE = 180°", reason: "平角的定义" },
                    { statement: "∴ ∠A + ∠B + ∠C = 180°", reason: "等量代换" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "证明 = 把动画里的每个动作，用“因为……所以……”说清楚。",
                "已知（蓝）：△ABC；求证（红）：∠A+∠B+∠C=180°——每页证明先看三问。",
                "第一步为什么敢作平行线？点“为什么可以”——依据是平行公理。",
                "播完看“证明书”：左栏做了什么，右栏凭什么。"
              ],
              examples: [
                { text: "一句话证明：过 C 作 AB 的平行线，三个角就排排坐到一条直线上了", figure: "点题" }
              ],
              prev: "g03-u1-l3-p3",
              next: "g03-u1-l3-p5"
            },
            {
              id: "g03-u1-l3-p5",
              title: "内角和定理：永远 180°",
              pageKind: "explain",
              concept: "三角形内角和定理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle A + \\angle B + \\angle C = 180\\text{度}",
                  translation: "三角形三个内角的和等于 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：DE ∥ AB，∠A、∠B 被“搬”到了直线 DCE 上。",
                      shapes: [
                        { t: "poly", pts: [[18,28],[82,28],[58,72]], color: "line", width: 2.5 },
                        { t: "seg", a: [20,72], b: [88,72], color: "aux", width: 2, dash: "6,4" },
                        { t: "arc", v: [58,72], a1: 180, a2: 228, r: 11, group: 1, color: "corrA" },
                        { t: "arc", v: [58,72], a1: 228, a2: 299, r: 14, group: 3, color: "corrC" },
                        { t: "arc", v: [58,72], a1: 299, a2: 360, r: 11, group: 2, color: "corrB" },
                        { t: "txt", p: [50,86], text: "180°", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你拖顶点时三个角的和永远 180°——现在你知道为什么了。",
                "内角和定理：三角形三个内角的和是 180°。",
                "生活例：纸飞机——摊平纸飞机，折出来的三个角拼起来正好是平角。",
                "图形例：直角三角形里，两个锐角加起来是 90°（180°−90°）——它们互余。",
                "反例：别说“四边形的内角和也是 180°”——四边形留到下下课算，别急。",
                "⚠️ 别搞混：“量出来 180°”是实验，“证出来 180°”才是定理。",
                "记住一句话：三角形内角和，永远 180°。"
              ],
              examples: [
                { text: "纸飞机：折出来的角也能拼成 180°", figure: "实物" }
              ],
              prev: "g03-u1-l3-p4",
              next: "g03-u1-l4-p1"
            }
          ]
        },
        {
          id: "g03-u1-l4",
          title: "三角形的外角",
          pages: [
            {
              id: "g03-u1-l4-p1",
              title: "把一条边延长：外角“长”出来了",
              concept: "三角形的外角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{外角} = \\text{一边} + \\text{另一边的延长线}",
                  translation: "外角是三角形一边与另一边延长线组成的角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：完整的三角形 △ABC。",
                      shapes: [
                        { t: "poly", pts: [[20,32],[80,32],[55,68]], color: "line", width: 3 },
                        { t: "txt", p: [15,24], text: "A", size: 13, bold: true },
                        { t: "txt", p: [85,24], text: "B", size: 13, bold: true },
                        { t: "txt", p: [55,76], text: "C", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：把 BC 延长到 D（虚线是延长部分）。",
                      shapes: [
                        { t: "poly", pts: [[20,32],[80,32],[55,68]], color: "line", width: 3 },
                        { t: "seg", a: [80,32], b: [91,16], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [93,12], text: "D", size: 13 },
                        { t: "txt", p: [55,76], text: "C", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：∠ABD“张开”了——这就是外角。",
                      shapes: [
                        { t: "poly", pts: [[20,32],[80,32],[55,68]], color: "line", width: 2.5 },
                        { t: "seg", a: [80,32], b: [91,16], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "arc", v: [80,32], a1: 180, a2: 304.8, r: 13, group: 1, color: "corrA" },
                        { t: "txt", p: [71,14], text: "∠ABD", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [50,80], text: "外角：∠ABD", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶：BC 延长到 D，一个新角“长”出来了——∠ABD。",
                "外角：三角形一边与另一边的延长线组成的角。",
                "每个顶点都有两个外角（左右各一），它们是对顶角——相等。",
                "外角和它相邻的内角是邻居：拼成一条直线——互补。"
              ],
              examples: [
                { text: "三角形的屋顶：屋檐外侧那个角就是外角", figure: "实物" }
              ],
              prev: "g03-u1-l3-p5",
              next: "g03-u1-l4-p2"
            },
            {
              id: "g03-u1-l4-p2",
              title: "外角 = 不相邻两内角之和",
              concept: "三角形外角定理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle ABD = \\angle A + \\angle C",
                  translation: "三角形的一个外角等于和它不相邻的两个内角的和"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "△ABC，D 在 CB 延长线上",
                  goal: "∠ABD = ∠A + ∠C",
                  steps: [
                    {
                      caption: "第 1 步：延长 CB 到 D——外角 ∠ABD 登场。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,66]], color: "line", width: 3 },
                        { t: "seg", a: [80,30], b: [93,11], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "arc", v: [80,30], a1: 180, a2: 304.8, r: 13, group: 1, color: "corrA" },
                        { t: "txt", p: [71,12], text: "∠ABD", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [15,22], text: "A", size: 13, bold: true },
                        { t: "txt", p: [85,22], text: "B", size: 13, bold: true },
                        { t: "txt", p: [55,74], text: "C", size: 13, bold: true },
                        { t: "txt", p: [95,7], text: "D", size: 13 }
                      ],
                      card: "延长 CB 到 D——外角 ∠ABD 登场。",
                      why: "依据：外角的定义——三角形一边与另一边延长线组成的角。"
                    },
                    {
                      caption: "第 2 步：∠ABC + ∠ABD = 180°（邻居拼成直线）。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,66]], color: "line", width: 2 },
                        { t: "seg", a: [80,30], b: [93,11], color: "aux", width: 2, dash: "6,4" },
                        { t: "arc", v: [80,30], a1: 124.8, a2: 180, r: 12, group: 2, color: "corrB" },
                        { t: "arc", v: [80,30], a1: 180, a2: 304.8, r: 13, group: 1, color: "corrA" },
                        { t: "txt", p: [68,22], text: "∠ABC", size: 12, color: "corrB" },
                        { t: "txt", p: [71,12], text: "∠ABD", size: 12, color: "corrA" },
                        { t: "txt", p: [50,82], text: "∠ABC + ∠ABD = 180°", size: 13, math: true }
                      ],
                      card: "∠ABC 和 ∠ABD 是邻居，拼成一条直线——180°。",
                      why: "依据：邻补角——互为邻补角的两角之和为 180°。"
                    },
                    {
                      caption: "第 3 步：∠A + ∠ABC + ∠C = 180°（内角和）。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,66]], color: "line", width: 2.5 },
                        { t: "arc", v: [20,30], a1: 0, a2: 45.8, r: 10, group: 1, color: "corrA" },
                        { t: "arc", v: [80,30], a1: 124.8, a2: 180, r: 10, group: 2, color: "corrB" },
                        { t: "arc", v: [55,66], a1: 225.8, a2: 304.8, r: 10, group: 3, color: "corrC" },
                        { t: "txt", p: [50,82], text: "∠A + ∠ABC + ∠C = 180°", size: 13, math: true }
                      ],
                      card: "三角形内角和也是 180°——上一课刚证的，现拿现用。",
                      why: "依据：三角形内角和定理（g03.1.3）。"
                    },
                    {
                      caption: "第 4 步：两式一减，∠ABC 消掉了——证毕。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,66]], color: "known", width: 3 },
                        { t: "seg", a: [80,30], b: [93,11], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [50,50], text: "∠ABD = ∠A + ∠C", size: 15, bold: true, math: true }
                      ],
                      card: "两个 180° 一减，∠ABC 消掉了——外角等于不相邻两内角之和。",
                      why: "依据：等量代换。"
                    }
                  ],
                  summary: [
                    { statement: "延长 CB 到 D，得外角 ∠ABD", reason: "外角的定义" },
                    { statement: "∠ABC + ∠ABD = 180°", reason: "邻补角之和为 180°" },
                    { statement: "∠A + ∠ABC + ∠C = 180°", reason: "三角形内角和定理" },
                    { statement: "∴ ∠ABD = ∠A + ∠C", reason: "等量代换" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "外角定理：三角形的一个外角，等于和它不相邻的两个内角的和。",
                "人话：外角 = 另外两个内角加起来。",
                "生活例：三角形屋顶——屋檐外侧的角，等于屋内两个角的和。",
                "⚠️ 别搞混：“不相邻”——和它相邻的那个内角不算在内。",
                "外角和我们不急着算——留到多边形那课一起想。"
              ],
              examples: [
                { text: "求外角不用量：两个不相邻内角一加就行", figure: "技巧" }
              ],
              prev: "g03-u1-l4-p1",
              next: "g03-u1-l4-p3"
            },
            {
              id: "g03-u1-l4-p3",
              title: "外角定理：一次讲透",
              pageKind: "explain",
              concept: "三角形外角定理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{外角} = \\text{不相邻两内角之和}",
                  translation: "三角形的一个外角等于和它不相邻的两个内角的和"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：BC 延长到 D，外角 ∠ABD 登场——它等于 ∠A + ∠C。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,66]], color: "line", width: 2.5 },
                        { t: "seg", a: [80,30], b: [93,11], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "arc", v: [80,30], a1: 180, a2: 305, r: 13, group: 1, color: "corrA" },
                        { t: "arc", v: [20,30], a1: 0, a2: 45.8, r: 10, group: 2, color: "corrB" },
                        { t: "arc", v: [55,66], a1: 225.8, a2: 304.8, r: 10, group: 3, color: "corrC" },
                        { t: "txt", p: [15,22], text: "A", size: 13, bold: true },
                        { t: "txt", p: [85,22], text: "B", size: 13, bold: true },
                        { t: "txt", p: [55,74], text: "C", size: 13, bold: true },
                        { t: "txt", p: [95,7], text: "D", size: 13 },
                        { t: "txt", p: [70,11], text: "∠ABD", size: 13, bold: true, color: "corrA" },
                        { t: "txt", p: [50,84], text: "∠ABD = ∠A + ∠C", size: 14, bold: true, math: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你把 BC 延长到 D，∠ABD“长”了出来——外角就是这么来的。",
                "外角定理：三角形的一个外角，等于和它不相邻的两个内角的和——“不相邻”是关键词。",
                "生活例：三角形屋顶——屋檐外侧的角，等于屋内两个角的和。",
                "图形例：∠A=50°、∠C=60°，外角 ∠ABD=110°——不用量角器，一加就行。",
                "反例：∠ABC 是和外角相邻的那个内角——它不算在内，把它加进去就错了。",
                "⚠️ 别搞混：外角等于“不相邻”两内角之和——相邻的那个是邻居（互补），不是加数。",
                "记住一句话：外角等于另两角之和。"
              ],
              examples: [
                { text: "反着用：已知外角 110°、∠A=50°，求∠C=60°", figure: "方法" }
              ],
              prev: "g03-u1-l4-p2",
              next: "g03-u1-l5-p1"
            }
          ]
        },
        {
          id: "g03-u1-l5",
          title: "多边形的内角和",
          pages: [
            {
              id: "g03-u1-l5-p1",
              title: "切一切：五边形变成 3 个三角形",
              concept: "对角线剖分",
              formulas: [
                {
                  id: "f1",
                  latex: "3 \\times 180\\text{度} = 540\\text{度}",
                  translation: "五边形切成 3 个三角形，内角和是 540 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：一个五边形。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[82,58],[50,80],[18,58]], color: "line", width: 3 },
                        { t: "pt", p: [30,30], r: 3.5, color: "known" },
                        { t: "txt", p: [50,92], text: "五边形", size: 14 }
                      ]
                    },
                    {
                      caption: "第 2 步：从一个顶点引出所有对角线。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[82,58],[50,80],[18,58]], color: "line", width: 3 },
                        { t: "seg", a: [30,30], b: [82,58], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "seg", a: [30,30], b: [50,80], color: "aux", width: 2.5, dash: "6,4" }
                      ]
                    },
                    {
                      caption: "第 3 步：切成 3 个三角形——3×180°=540°。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[82,58]], color: "corrA", width: 2.5, fill: "corrA", opacity: 0.3 },
                        { t: "poly", pts: [[30,30],[82,58],[50,80]], color: "corrB", width: 2.5, fill: "corrB", opacity: 0.3 },
                        { t: "poly", pts: [[30,30],[50,80],[18,58]], color: "corrC", width: 2.5, fill: "corrC", opacity: 0.3 },
                        { t: "txt", p: [50,92], text: "3 个三角形 × 180° = 540°", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶：从一个顶点引出所有对角线。",
                "五边形被切成 3 个三角形——五边形的内角，全变成了这 3 个三角形的内角。",
                "3 个三角形 × 180° = 540°：五边形的内角和是 540°。",
                "切一刀，多一个三角形；加一条边，会发生什么？下页你来“加边”。"
              ],
              examples: [
                { text: "从一个顶点引：五边形引 2 条对角线，切出 3 个三角形", figure: "数形" }
              ],
              prev: "g03-u1-l4-p2",
              next: "g03-u1-l5-p2"
            },
            {
              id: "g03-u1-l5-p2",
              title: "加边游戏：你来发明公式",
              concept: "用字母表示规律（H19）",
              formulas: [
                {
                  id: "f1",
                  latex: "(n - 2) \\times 180\\text{度}",
                  translation: "n 边形的内角和等于 (n−2) 乘以 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "n=3：1 个三角形——1×180°=180°。",
                      shapes: [
                        { t: "poly", pts: [[20,35],[80,35],[50,72]], color: "corrA", width: 3, fill: "corrA", opacity: 0.25 },
                        { t: "txt", p: [50,86], text: "n=3：1×180°=180°", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "n=4：切出 2 个三角形——2×180°=360°。",
                      shapes: [
                        { t: "poly", pts: [[25,35],[75,35],[80,65],[20,65]], color: "line", width: 2.5 },
                        { t: "seg", a: [25,35], b: [80,65], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [50,86], text: "n=4：2×180°=360°", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "n=5：切出 3 个三角形——3×180°=540°。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[82,58],[50,80],[18,58]], color: "line", width: 2.5 },
                        { t: "seg", a: [30,30], b: [82,58], color: "aux", width: 2, dash: "6,4" },
                        { t: "seg", a: [30,30], b: [50,80], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [50,92], text: "n=5：3×180°=540°", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "n=6：切出 4 个三角形——4×180°=720°。规律自己“长”出来了！",
                      shapes: [
                        { t: "poly", pts: [[35,30],[65,30],[82,55],[65,80],[35,80],[18,55]], color: "line", width: 2.5 },
                        { t: "seg", a: [35,30], b: [82,55], color: "aux", width: 2, dash: "6,4" },
                        { t: "seg", a: [35,30], b: [65,80], color: "aux", width: 2, dash: "6,4" },
                        { t: "seg", a: [35,30], b: [35,80], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [50,92], text: "n=6：4×180°=720°", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "从三角形开始，一条一条加边：n=3、4、5、6……",
                "数切出了几个三角形：n 边形切出 (n−2) 个三角形。",
                "内角和：180°、360°、540°、720°——规律自己“长”出来了。",
                "(n−2)×180°——你亲手“发明”了用字母表示规律！"
              ],
              examples: [
                { text: "回链：代数第 0.2.1 页起过这个名字——用字母表示数", figure: "回链" }
              ],
              prev: "g03-u1-l5-p1",
              next: "g03-u1-l5-p3"
            },
            {
              id: "g03-u1-l5-p3",
              title: "多边形内角和定理：(n−2)×180°",
              pageKind: "explain",
              concept: "多边形内角和公式",
              formulas: [
                {
                  id: "f1",
                  latex: "(n - 2) \\times 180\\text{度}",
                  translation: "n 边形的内角和等于 (n−2) 乘以 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：从一个顶点引 (n−3) 条对角线，分成 (n−2) 个三角形。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[82,58],[50,80],[18,58]], color: "line", width: 2.5 },
                        { t: "seg", a: [30,30], b: [82,58], color: "aux", width: 2, dash: "6,4" },
                        { t: "seg", a: [30,30], b: [50,80], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [50,92], text: "(n−2) 个三角形", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你加边数出来的：n 边形的内角和 = (n−2)×180°。",
                "多边形内角和定理：n 边形的内角和等于 (n−2)×180°。",
                "生活例：蜂巢是六边形——内角和是 (6−2)×180°=720°。",
                "图形例：从一个顶点引 (n−3) 条对角线，分成 (n−2) 个三角形。",
                "⚠️ 前提：这里讨论的多边形都是凸的（没有“凹进去”的角）——凹多边形从某些顶点引的对角线会落到形外，这种切法不适用。",
                "⚠️ 易错：(n−2) 别记成 (n−1)——三角形 n=3 时切出 1 个，不是 2 个。",
                "记住一句话：n 条边，(n−2) 个三角形。",
                "回链：“用字母表示规律”你在代数第 0.2.1 页见过——这是它的几何版。"
              ],
              examples: [
                { text: "七边形：(7−2)×180°=900°，自己算一遍", figure: "自测" }
              ],
              prev: "g03-u1-l5-p2",
              next: "g03-u1-l6-p1"
            }
          ]
        },
        {
          id: "g03-u1-l6",
          title: "本章小结与习题",
          pages: [
            {
              id: "g03-u1-l6-p1",
              title: "这一章：三角形从拼到算",
              concept: "本章知识串讲",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{拼} \\to \\text{分} \\to \\text{线} \\to \\text{角}",
                  translation: "三角形：先拼起来，再分类，再看三线，最后算角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：拼——三边关系（两边之和大于第三边）。",
                      shapes: [
                        { t: "poly", pts: [[18,62],[82,62],[50,28]], color: "known", width: 3 },
                        { t: "txt", p: [50,74], text: "a + b > c", size: 14, bold: true, math: true }
                      ]
                    },
                    {
                      caption: "第 2 步：分——按边/按角分类；三线：高、中线、角平分线。",
                      shapes: [
                        { t: "poly", pts: [[14,62],[42,62],[28,32]], color: "corrA", width: 2.5 },
                        { t: "poly", pts: [[54,62],[86,62],[70,32]], color: "corrB", width: 2.5 },
                        { t: "seg", a: [70,32], b: [70,62], color: "corrC", width: 2.5 },
                        { t: "txt", p: [50,78], text: "分类 + 三线", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：角——内角和 180°；外角=不相邻两内角之和；n 边形=(n−2)×180°。",
                      shapes: [
                        { t: "poly", pts: [[20,62],[80,62],[50,28]], color: "line", width: 2.5 },
                        { t: "arc", v: [20,62], a1: 311.4, a2: 0, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [80,62], a1: 180, a2: 228.6, r: 9, group: 2, color: "corrAngle" },
                        { t: "arc", v: [50,28], a1: 48.6, a2: 131.4, r: 9, group: 3, color: "corrAngle" },
                        { t: "txt", p: [50,78], text: "180° / 外角定理 / (n−2)×180°", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "这一章我们认识了三角形：怎么拼、怎么分、有哪些线、角有多少度。",
                "拼：三边关系——两边之和大于第三边（两点之间线段最短的孩子）。",
                "分与线：按边/按角分类；高（垂直）、中线（中点）、角平分线（平分角）。",
                "角：内角和 180°（撕拼实验 + 平行线证明）；外角=不相邻两内角之和；n 边形=(n−2)×180°。"
              ],
              examples: [
                { text: "一张思维导图：拼→分→线→角", figure: "串讲" }
              ],
              prev: "g03-u1-l5-p3",
              next: "g03-u1-l6-p2"
            },
            {
              id: "g03-u1-l6-p2",
              title: "本章习题：5 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三角形} = \\text{拼} + \\text{分} + \\text{线} + \\text{角}",
                  translation: "三角形：三边关系、分类、三线、角度"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "能围成", color: "corrA" },
                    { name: "围不成", color: "corrB" }
                  ],
                  items: [
                    { id: "e1", label: "5，6，7", group: 0, anchor: [28,68],
                      shape: { t: "txt", p: [28,68], text: "5，6，7", size: 15, bold: true } },
                    { id: "e2", label: "3，4，5", group: 0, anchor: [72,68],
                      shape: { t: "txt", p: [72,68], text: "3，4，5", size: 15, bold: true } },
                    { id: "e3", label: "3，4，8", group: 1, anchor: [28,38],
                      shape: { t: "txt", p: [28,38], text: "3，4，8", size: 15, bold: true } },
                    { id: "e4", label: "2，2，5", group: 1, anchor: [72,38],
                      shape: { t: "txt", p: [72,38], text: "2，2，5", size: 15, bold: true } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点一点：哪组边能围成三角形，哪组围不成？",
                "1．（直用）三角形两边是 5 和 9，第三边可能是？A．3  B．5  C．14",
                "2．（小综合）△ABC 中 ∠A=50°，∠B=60°，求 ∠C。",
                "3．（变式）直角三角形一个锐角是 35°，另一个锐角是多少？",
                "4．（生活建模）木工做三角架，两根木条 40cm 和 60cm，第三根多长能围成？"
              ],
              examples: [
                { figure: "核对答案", text: "点选答案：能围成—5，6，7 / 3，4，5；围不成—3，4，8 / 2，2，5。1．B（5+5>9，5+9>5）2．70°（180−50−60）3．55°（180−90−35）4．大于 20cm 且小于 100cm（两边之和>第三边，且第三边+40>60）" }
              ],
              prev: "g03-u1-l6-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
