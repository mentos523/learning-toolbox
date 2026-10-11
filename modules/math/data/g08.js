/* ============================================================
 * 学习工具箱 · 数学 · 几何 g08：圆（二）——切线与圆的方程
 *
 * 黄队（教育教学专家）生产：1 单元 / 6 课 / 23 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g08 章）
 * 教学设计：docs/math-geometry-pedagogy.md（§5 讲解页五段式；例子库：日出/车轮/刀切西瓜/花坛；
 *           §8 H3 呼应点：标题惊奇感、圆的方程里程碑）
 * 参数手册：docs/math-geometry-params.md v1.3
 * 白队一屏预算评审：/tmp/geo-g08-g13-screen-budget-review.md（g08 18→约24 页，逐课拆分照此执行）
 *
 * 页构成：
 *   g08.1.1 点、线与圆的位置关系  4 页  P1 step-play（日出：相离→相切→相交，d vs r）
 *                                       P2 讲解（点三位置：d=r 上 / d<r 内 / d>r 外）
 *                                       P3 讲解（线三位置 + d↔r 统一思想）
 *                                       P4 例题（d=3、r=5 比大小；点 P 变式）
 *   g08.1.2 切线的判定与性质      4 页  P1 step-play（交点二合一：M、N 合成 A，OA⊥l 出现）
 *                                       P2 讲解（判定定理：过外端 + 垂直半径，查两证）
 *                                       P3 讲解（性质定理：是切线 ⇒ 垂直于过切点半径）
 *                                       P4 例题（d=r 证切线：对照判定两证）
 *   g08.1.3 切线长定理            4 页  P1 compare-toggle（展开看 / 沿 OP 对折）
 *                                       P2 proof-replay（HL 证明，4 步）
 *                                       P3 讲解（定理 + 切线长定义 + OP 平分角彩蛋）
 *                                       P4 例题（PA=6 求 PB；∠APB=60° 求 ∠APO）
 *   g08.1.4 外接圆与内切圆        5 页  P1 step-play（三角形"套"进圆：垂直平分线交于 O）
 *                                       P2 讲解（外心：三边垂直平分线交点，到顶点等距）
 *                                       P3 step-play（圆"塞"进三角形：角平分线交于 I）
 *                                       P4 讲解（内心：三角平分线交点，到三边等距）
 *                                       P5 compare-toggle（外心 vs 内心对照）
 *   g08.1.5 圆的方程 x²+y²=r²     4 页  P1 step-play（圆上动点坐标实时验证；徽章：到原点距离=r）
 *     （H3 里程碑）                     P2 讲解（距离公式 → 平方 → x²+y²=r²）
 *                                       P3 例题（代入检验：A(3,4)/B(2,2)/C(5,0)）
 *                                       P4 H3 代数呼应（方程↔图形第二次握手，双向链 ch06）
 *   g08.1.6 本章小结与习题        2 页  P1 小结 P2 习题（tap-highlight 认切线 + 6 道题）
 *
 * 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 / corrA·corrB·corrC=对应组 /
 *   corrAngle=对应角 / line=普通线 / aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
 * 公式走 LaTeX（构建器子集），交互参数里不出现裸文本公式（txt 内数学符号用 unicode 直写）。
 * H3 双向链：g08 侧→代数 ch06（本文件 P4 回链）；代数侧 ch06 已有"圆 x²+y²=1 不是函数图像"辨析条回指。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g08"] = {
  id: "g08",
  title: "圆（二）——切线与圆的方程",
  units: [
    {
      id: "g08-u1",
      title: "位置关系与切线",
      lessons: [
        /* ============ g08.1.1 点、线与圆的位置关系（4 页） ============ */
        {
          id: "g08-u1-l1",
          title: "点、线与圆的位置关系",
          pages: [
            {
              id: "g08-u1-l1-p1",
              title: "日出：直线靠近圆",
              concept: "直线与圆的三种位置关系",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{相离:}d > r",
                  translation: "圆心到直线的距离大于半径：直线与圆相离，没有交点"
                },
                {
                  id: "f2",
                  latex: "\\text{相切:}d = r",
                  translation: "圆心到直线的距离等于半径：直线与圆相切，只有一个交点"
                },
                {
                  id: "f3",
                  latex: "\\text{相交:}d < r",
                  translation: "圆心到直线的距离小于半径：直线与圆相交，有两个交点"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  autoplay: true,
                  steps: [
                    {
                      caption: "第 1 帧：直线在圆外，d=32 > r=20——相离，一个交点都没有。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 20, color: "known", width: 3 },
                        { t: "pt", p: [50,50], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [12,82], b: [88,82], color: "line", width: 3 },
                        { t: "seg", a: [50,50], b: [50,82], color: "aux", width: 2, dash: "5,4" },
                        { t: "right", v: [50,82], p: [50,50], q: [88,82], size: 6, color: "corrAngle" },
                        { t: "txt", p: [50,93], text: "d=32 > r=20：相离", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 帧：直线下降，刚好碰到圆，d=20 = r——相切，只有一个交点。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 20, color: "known", width: 3 },
                        { t: "pt", p: [50,50], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [12,70], b: [88,70], color: "line", width: 3 },
                        { t: "seg", a: [50,50], b: [50,70], color: "aux", width: 2, dash: "5,4" },
                        { t: "pt", p: [50,70], label: "A", color: "target", r: 4 },
                        { t: "txt", p: [50,93], text: "d=20 = r=20：相切", size: 13, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 帧：直线穿过圆，d=0 < r=20——相交，有两个交点。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 20, color: "known", width: 3 },
                        { t: "pt", p: [50,50], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [12,50], b: [88,50], color: "line", width: 3 },
                        { t: "pt", p: [30,50], color: "target", r: 4 },
                        { t: "pt", p: [70,50], color: "target", r: 4 },
                        { t: "txt", p: [50,93], text: "d=0 < r=20：相交", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看动画：直线靠近圆——相离（0 交点）→相切（1 个）→相交（2 个）。",
                "每帧都画了圆心到直线的垂线段：它的长度就是 d——比较 d 和 r 谁大谁小。",
                "这就是：直线和圆的位置关系——由 d 与 r 的大小关系说了算。"
              ],
              examples: [
                { text: "日出：太阳（圆）与海平面（直线）", figure: "实物" },
                { text: "自行车轮与地面：相切于一点", figure: "实物" }
              ],
              prev: null,
              next: "g08-u1-l1-p2"
            },
            {
              id: "g08-u1-l1-p2",
              title: "点和圆：三种位置",
              pageKind: "explain",
              concept: "点与圆的位置关系",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{点在圆上:}d = r",
                  translation: "点到圆心的距离等于半径：点在圆上"
                },
                {
                  id: "f2",
                  latex: "\\text{点在圆内:}d < r",
                  translation: "点到圆心的距离小于半径：点在圆内"
                },
                {
                  id: "f3",
                  latex: "\\text{点在圆外:}d > r",
                  translation: "点到圆心的距离大于半径：点在圆外"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "点 P 远离圆：d > r——在圆外。",
                      shapes: [
                        { t: "circle", c: [42,52], r: 25, color: "known", width: 3 },
                        { t: "pt", p: [42,52], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [86,60], label: "P", color: "target", r: 4 },
                        { t: "seg", a: [42,52], b: [86,60], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [64,78], text: "d > r：在圆外", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "点 P 落到圆上：d = r——在圆上。",
                      shapes: [
                        { t: "circle", c: [42,52], r: 25, color: "known", width: 3 },
                        { t: "pt", p: [42,52], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [67,52], label: "P", color: "target", r: 4 },
                        { t: "seg", a: [42,52], b: [67,52], color: "corrA", width: 2.5, ticks: 1 },
                        { t: "txt", p: [54,78], text: "d = r：在圆上", size: 13, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "点 P 走进圆里：d < r——在圆内。",
                      shapes: [
                        { t: "circle", c: [42,52], r: 25, color: "known", width: 3 },
                        { t: "pt", p: [42,52], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [54,58], label: "P", color: "target", r: 4 },
                        { t: "seg", a: [42,52], b: [54,58], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [48,78], text: "d < r：在圆内", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？点向圆靠近时，它到圆心的距离 d 一直在变——变的是 d，没变的是判断方法。",
                "点和圆的位置，看 d 和 r 比大小。",
                "d=r 在圆上（刚好够着），d<r 在圆内（还没够到边），d>r 在圆外（够过头了）。",
                "生活例：射箭——压线（圆上）/靶环内（圆内）/脱靶（圆外）。",
                "图形例：A 在圆上、B 在圆内、C 在圆外；反例：圆心 O：d=0<r，在圆内——不是“在圆上”。",
                "⚠️ 别搞混：“点在圆上”和“直线相切”的 d=r 字一样、对象不一样。",
                "一个是点到圆心，一个是直线到圆心。",
                "记住一句话：点圆位置比大小——d 和 r 谁大谁小，一比就知道。"
              ],
              examples: [
                { text: "射箭：压线、靶环内、脱靶", figure: "实物" }
              ],
              prev: "g08-u1-l1-p1",
              next: "g08-u1-l1-p3"
            },
            {
              id: "g08-u1-l1-p3",
              title: "直线和圆：三种位置",
              pageKind: "explain",
              concept: "直线与圆的位置关系；d 与 r",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{相离:}d > r",
                  translation: "圆心到直线的距离大于半径：直线与圆相离"
                },
                {
                  id: "f2",
                  latex: "\\text{相切:}d = r",
                  translation: "圆心到直线的距离等于半径：直线与圆相切"
                },
                {
                  id: "f3",
                  latex: "\\text{相交:}d < r",
                  translation: "圆心到直线的距离小于半径：直线与圆相交"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "l₁：d > r——相离，够不着。",
                      shapes: [
                        { t: "circle", c: [50,48], r: 22, color: "known", width: 3 },
                        { t: "pt", p: [50,48], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [14,82], b: [86,82], color: "line", width: 3 },
                        { t: "seg", a: [50,48], b: [50,82], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,93], text: "l₁：d > r，相离", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "l₂：d = r——相切，刚好碰到。",
                      shapes: [
                        { t: "circle", c: [50,48], r: 22, color: "known", width: 3 },
                        { t: "pt", p: [50,48], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [14,70], b: [86,70], color: "target", width: 3 },
                        { t: "seg", a: [50,48], b: [50,70], color: "aux", width: 2, dash: "5,4" },
                        { t: "pt", p: [50,70], label: "A", color: "target", r: 4 },
                        { t: "txt", p: [50,93], text: "l₂：d = r，相切", size: 13, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "l₃：d < r——相交，穿过去了。",
                      shapes: [
                        { t: "circle", c: [50,48], r: 22, color: "known", width: 3 },
                        { t: "pt", p: [50,48], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [14,48], b: [86,48], color: "line", width: 3 },
                        { t: "pt", p: [28,48], color: "target", r: 4 },
                        { t: "pt", p: [72,48], color: "target", r: 4 },
                        { t: "txt", p: [50,93], text: "l₃：d < r，相交", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得第 1 页的日出吗？交点个数 0→1→2——变的是交点个数，没变的是 d 和 r 的比大小。",
                "直线和圆的位置，看圆心到直线的距离 d 和 r 比大小。",
                "d>r 相离（够不着），d=r 相切（刚好碰到），d<r 相交（穿过去了）。",
                "生活例：日出——太阳与海平面；图形例：l₁ 相离、l₂ 相切、l₃ 相交。",
                "反例：直线穿过圆心（d=0<r）是相交——“穿过”不等于“相切”，相切是“只碰一下”。",
                "⚠️ 别搞混：d 是“圆心到直线的距离”——垂直的那段，不是斜着量。先作垂线段，再量长度。",
                "记住一句话：线圆位置也比大小——d>r 离、d=r 切、d<r 交。"
              ],
              examples: [
                { text: "日出：太阳与海平面的三种相遇", figure: "实物" }
              ],
              prev: "g08-u1-l1-p2",
              next: "g08-u1-l1-p4"
            },
            {
              id: "g08-u1-l1-p4",
              title: "例题：d 和 r 比大小",
              pageKind: "explain",
              concept: "用 d 与 r 判断位置关系",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{直线}l\\text{:}d = 3 < 5 = r \\Rightarrow \\text{相交}",
                  translation: "圆心到直线的距离 3 小于半径 5：直线 l 与圆相交"
                },
                {
                  id: "f2",
                  latex: "d_P = 5 = r \\Rightarrow P\\text{在圆上}",
                  translation: "点 P 到圆心距离等于半径：点 P 在圆上"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：读题标已知——r=5（圆的大小），d=3（圆心到直线的距离）。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 28, color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [14,70], b: [86,70], color: "line", width: 3 },
                        { t: "seg", a: [50,52], b: [50,70], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,88], text: "已知：r=5，d=3", size: 13, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步：比大小——3 < 5，即 d < r。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 28, color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [14,70], b: [86,70], color: "line", width: 3 },
                        { t: "txt", p: [50,88], text: "3 < 5：d < r", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：下结论——直线 l 与圆相交，有两个交点。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 28, color: "known", width: 3 },
                        { t: "seg", a: [14,70], b: [86,70], color: "target", width: 3 },
                        { t: "pt", p: [27.6,70], color: "target", r: 4 },
                        { t: "pt", p: [72.4,70], color: "target", r: 4 },
                        { t: "txt", p: [50,88], text: "d < r：相交", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步（变式）：点 P 到 O 的距离是 5——d=r，点 P 在圆上。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 28, color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [78,52], label: "P", color: "target", r: 4 },
                        { t: "seg", a: [50,52], b: [78,52], color: "corrA", width: 2.5, ticks: 1 },
                        { t: "txt", p: [50,88], text: "d=r：P 在圆上", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "读题先标已知：r=5（圆的大小）、d=3（圆心到直线的距离）——标成蓝色。",
                "比大小：3<5，即 d<r——直线与圆相交，有两个交点。",
                "变式：点 P 到 O 的距离是 5，d=r——点 P 在圆上。",
                "记住一句话：所有位置关系题，第一步都是“比大小”。"
              ],
              examples: [],
              prev: "g08-u1-l1-p3",
              next: "g08-u1-l2-p1"
            }
          ]
        },
        /* ============ g08.1.2 切线的判定与性质（4 页） ============ */
        {
          id: "g08-u1-l2",
          title: "切线的判定与性质",
          pages: [
            {
              id: "g08-u1-l2-p1",
              title: "交点二合一：切线诞生",
              concept: "切线的直观：相交→相切",
              formulas: [
                {
                  id: "f1",
                  latex: "l \\perp OA，A\\text{在圆}O\\text{上} \\Rightarrow l\\text{是切线}",
                  translation: "过半径外端 A 且垂直于半径 OA 的直线 l，是圆的切线"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: true,
                  steps: [
                    {
                      caption: "第 1 帧：直线 l 斜穿圆，交于 M、N 两点——这是相交。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 25, color: "known", width: 3 },
                        { t: "pt", p: [50,50], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [12,62.6], b: [88,47.4], color: "line", width: 3 },
                        { t: "pt", p: [27,59.6], label: "M", color: "line", r: 4 },
                        { t: "pt", p: [75,50], label: "N", color: "line", r: 4 },
                        { t: "seg", a: [50,50], b: [27,59.6], color: "aux", width: 2, dash: "5,4" }
                      ]
                    },
                    {
                      caption: "第 2 帧：直线 l 转动，M、N 越靠越近。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 25, color: "known", width: 3 },
                        { t: "pt", p: [50,50], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [15,81], b: [85,67], color: "line", width: 3 },
                        { t: "pt", p: [46.3,74.7], label: "M", color: "line", r: 4 },
                        { t: "pt", p: [63,71.4], label: "N", color: "line", r: 4 }
                      ]
                    },
                    {
                      caption: "第 3 帧：M、N 合成一点 A——只剩一个交点，且 OA⊥l（直角方块出现了）。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 25, color: "known", width: 3 },
                        { t: "pt", p: [50,50], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [15,75], b: [85,75], color: "target", width: 3 },
                        { t: "seg", a: [50,50], b: [50,75], color: "known", width: 3 },
                        { t: "pt", p: [50,75], label: "A", color: "target", r: 4 },
                        { t: "right", v: [50,75], p: [50,50], q: [85,75], size: 6, color: "corrAngle" }
                      ]
                    },
                    {
                      caption: "第 4 帧：定格——过半径外端 A、且垂直于半径 OA 的直线 l，就是圆的切线。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 25, color: "known", width: 3 },
                        { t: "pt", p: [50,50], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [15,75], b: [85,75], color: "target", width: 3.5 },
                        { t: "seg", a: [50,50], b: [50,75], color: "known", width: 3 },
                        { t: "pt", p: [50,75], label: "A", color: "target", r: 4 },
                        { t: "right", v: [50,75], p: [50,50], q: [85,75], size: 6, color: "corrAngle" },
                        { t: "txt", p: [50,90], text: "过外端、垂直半径 ⇒ 是切线", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 3 帧：两个交点“合”成一个的瞬间，直线刚好和半径垂直——这就是相切的“诞生时刻”。"
              ],
              examples: [
                { text: "刀切西瓜：刀刃只碰瓜皮一点", figure: "实物" }
              ],
              prev: "g08-u1-l1-p4",
              next: "g08-u1-l2-p2"
            },
            {
              id: "g08-u1-l2-p2",
              title: "切线的判定：查两证",
              pageKind: "explain",
              concept: "切线的判定定理",
              formulas: [
                {
                  id: "f1",
                  latex: "l \\perp OA，A\\text{在圆}O\\text{上} \\Rightarrow l\\text{是切线}",
                  translation: "判定定理：直线过半径的外端且垂直于半径，则它是切线"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "判定两证：① 过半径的外端 A；② 垂直于半径 OA。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 26, color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [50,52], b: [50,78], color: "known", width: 3 },
                        { t: "seg", a: [16,78], b: [84,78], color: "target", width: 3 },
                        { t: "pt", p: [50,78], label: "A", color: "target", r: 4 },
                        { t: "right", v: [50,78], p: [50,52], q: [84,78], size: 6, color: "corrAngle" },
                        { t: "txt", p: [50,92], text: "①过外端 ②垂直半径", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页第 3 帧——两个交点合成一个的瞬间，直线刚好垂直于半径。",
                "想判断一条直线是不是切线？查两个“身份证”：① 经过半径的外端（点在圆上）；② 垂直于这条半径。都对上，它就是切线。",
                "生活例：刀切西瓜——刀刃只碰瓜皮一点；图形例：l 过 A 且 l⊥OA→l 是切线。",
                "反例：直线垂直于半径但垂足在圆内——它穿过圆是相交，“过外端”不能丢！",
                "⚠️ 别搞混：垂足必须落在圆上（外端）——落在圆内/圆外都不算，“垂直”一个条件不够。",
                "记住一句话：判定查两证——过外端、垂直半径。"
              ],
              examples: [
                { text: "刀切西瓜：刀刃只碰瓜皮一点", figure: "实物" }
              ],
              prev: "g08-u1-l2-p1",
              next: "g08-u1-l2-p3"
            },
            {
              id: "g08-u1-l2-p3",
              title: "切线的性质：必垂直",
              pageKind: "explain",
              concept: "切线的性质定理",
              formulas: [
                {
                  id: "f1",
                  latex: "l\\text{是圆}O\\text{的切线}，A\\text{为切点} \\Rightarrow l \\perp OA",
                  translation: "性质定理：切线垂直于过切点的半径"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "已知 l 是切线、A 是切点——则 OA⊥l，一定垂直。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 26, color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [50,52], b: [50,78], color: "known", width: 3 },
                        { t: "seg", a: [16,78], b: [84,78], color: "target", width: 3 },
                        { t: "pt", p: [50,78], label: "A", color: "target", r: 4 },
                        { t: "right", v: [50,78], p: [50,52], q: [84,78], size: 6, color: "corrAngle" },
                        { t: "txt", p: [50,92], text: "是切线 ⇒ 必垂直", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "上一页是“因为垂直，所以是切线”——这一页反过来：“因为是切线，所以垂直”。",
                "已经知道一条直线是切线，它一定垂直于过切点的那条半径——切点是唯一的交点，半径是圆心到切点的连线，它们互相垂直。",
                "生活例：车轮与地面——接触点处地面垂直于车轴到接触点的连线；图形例：l 切圆 O 于 A，连 OA 则 OA⊥l。",
                "反例：过切点画不垂直于 OA 的直线——它扎进圆里变相交，不再是切线。",
                "⚠️ 别搞混：判定和性质是“因为”“所以”换了位置——判定：因为垂直，所以是切线；性质：因为是切线，所以垂直。别背反了。",
                "记住一句话：切线必垂直于过切点的半径。"
              ],
              examples: [
                { text: "车轮与地面：接触点处地面垂直于半径", figure: "实物" }
              ],
              prev: "g08-u1-l2-p2",
              next: "g08-u1-l2-p4"
            },
            {
              id: "g08-u1-l2-p4",
              title: "例题：证明它是切线",
              pageKind: "explain",
              concept: "用判定定理证明切线",
              formulas: [
                {
                  id: "f1",
                  latex: "d = 5 = r \\Rightarrow \\text{直线}l\\text{与圆}O\\text{相切}",
                  translation: "圆心到直线的距离等于半径：直线 l 与圆 O 相切"
                },
                {
                  id: "f2",
                  latex: "OA \\perp l，A\\text{在圆上} \\Rightarrow l\\text{是切线}",
                  translation: "满足判定两条件：过外端且垂直于半径，是切线"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：读题标已知——r=5，O 到 l 的距离 d=5。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 28, color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [14,24], b: [86,24], color: "line", width: 3 },
                        { t: "seg", a: [50,52], b: [50,24], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,88], text: "已知：r=5，d=5", size: 13, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步：比大小——d=r，直线 l 与圆只有一个公共点 A。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 28, color: "known", width: 3 },
                        { t: "seg", a: [14,24], b: [86,24], color: "line", width: 3 },
                        { t: "pt", p: [50,24], label: "A", color: "target", r: 4 },
                        { t: "txt", p: [50,88], text: "d=r：只有一个交点 A", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：连半径 OA——O 到 l 的垂线段，垂足 A 在圆上。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 28, color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "known", r: 4 },
                        { t: "seg", a: [14,24], b: [86,24], color: "line", width: 3 },
                        { t: "seg", a: [50,52], b: [50,24], color: "known", width: 3 },
                        { t: "pt", p: [50,24], label: "A", color: "target", r: 4 },
                        { t: "right", v: [50,24], p: [50,52], q: [86,24], size: 6, color: "corrAngle" }
                      ]
                    },
                    {
                      caption: "第 4 步：对照判定两证——过外端 ✓、垂直半径 ✓，l 是切线。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 28, color: "known", width: 3 },
                        { t: "seg", a: [14,24], b: [86,24], color: "target", width: 3.5 },
                        { t: "seg", a: [50,52], b: [50,24], color: "known", width: 3 },
                        { t: "pt", p: [50,24], label: "A", color: "target", r: 4 },
                        { t: "right", v: [50,24], p: [50,52], q: [86,24], size: 6, color: "corrAngle" },
                        { t: "txt", p: [50,88], text: "过外端 ✓ 垂直半径 ✓ ⇒ 是切线", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "读题标已知：r=5，O 到 l 的距离 d=5——标成蓝色。",
                "比大小：d=r——直线 l 与圆只有一个公共点 A（相切）。",
                "连半径 OA（O 到 l 的垂线段，垂足 A 在圆上）——OA⊥l 且 A 是外端。",
                "对照判定两证：过外端 ✓、垂直半径 ✓——l 是切线。"
              ],
              examples: [],
              prev: "g08-u1-l2-p3",
              next: "g08-u1-l3-p1"
            }
          ]
        },
        /* ============ g08.1.3 切线长定理（4 页） ============ */
        {
          id: "g08-u1-l3",
          title: "切线长定理",
          pages: [
            {
              id: "g08-u1-l3-p1",
              title: "对折：两条切线一样长",
              concept: "切线长；对称直观",
              formulas: [
                {
                  id: "f1",
                  latex: "PA = PB",
                  translation: "从圆外一点引的两条切线，切线长相等（先猜，后证）"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "展开看",
                      caption: "从圆外一点 P 画两条切线 PA、PB——猜一猜：哪条长？",
                      shapes: [
                        { t: "circle", c: [45,55], r: 22, color: "known", width: 3 },
                        { t: "pt", p: [45,55], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [88,30], label: "P", color: "known", r: 4 },
                        { t: "pt", p: [63.4,67.2], label: "A", color: "target", r: 4 },
                        { t: "pt", p: [43.5,33], label: "B", color: "target", r: 4 },
                        { t: "seg", a: [88,30], b: [63.4,67.2], color: "target", width: 3 },
                        { t: "seg", a: [88,30], b: [43.5,33], color: "target", width: 3 },
                        { t: "seg", a: [45,55], b: [63.4,67.2], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [45,55], b: [43.5,33], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [76,52], text: "PA 和 PB，谁长？", size: 13, bold: true }
                      ]
                    },
                    {
                      label: "对折看",
                      caption: "沿 OP 对折：PA 正好落在 PB 上——一样长！",
                      shapes: [
                        { t: "circle", c: [45,55], r: 22, color: "known", width: 3 },
                        { t: "pt", p: [45,55], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [88,30], label: "P", color: "known", r: 4 },
                        { t: "seg", a: [45,55], b: [88,30], color: "aux", width: 3, dash: "8,4" },
                        { t: "seg", a: [88,30], b: [63.4,67.2], color: "target", width: 3 },
                        { t: "seg", a: [88,30], b: [43.5,33], color: "target", width: 3, dash: "5,4" },
                        { t: "txt", p: [66,20], text: "折痕 OP", size: 12, color: "aux" },
                        { t: "txt", p: [76,52], text: "PA 落在 PB 上，完全重合", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "先认名字：切线长 = 从圆外一点到切点的线段的长度（PA 的长）——直线没有长度，说的是线段。",
                "猜一猜：PA 和 PB 哪条长？点“对折看”验证。",
                "沿 OP 对折，PA 正好落在 PB 上——没变的是：两条切线长相等（下一页证明）。"
              ],
              examples: [
                { text: "对折纸：折痕两边的图形重合", figure: "实物" }
              ],
              prev: "g08-u1-l2-p4",
              next: "g08-u1-l3-p2"
            },
            {
              id: "g08-u1-l3-p2",
              title: "切线长定理的证明",
              concept: "切线长定理证明（HL）",
              formulas: [
                {
                  id: "f1",
                  latex: "PA、PB\\text{切圆}O\\text{于}A、B \\Rightarrow PA = PB",
                  translation: "切线长定理：圆外一点引的两条切线，切线长相等"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "P 在圆 O 外，PA、PB 切圆 O 于 A、B",
                  goal: "PA = PB",
                  steps: [
                    {
                      caption: "第 1 步：连接 OP、OA、OB。",
                      card: "把圆心和切点都连起来——造两个三角形。",
                      why: "作图：连接两点成线段。",
                      shapes: [
                        { t: "circle", c: [50,55], r: 24, color: "known", width: 3 },
                        { t: "pt", p: [50,55], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [86,32], label: "P", color: "known", r: 4 },
                        { t: "pt", p: [72,64.5], label: "A", color: "target", r: 4 },
                        { t: "pt", p: [50.7,31], label: "B", color: "target", r: 4 },
                        { t: "seg", a: [50,55], b: [86,32], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "seg", a: [50,55], b: [72,64.5], color: "known", width: 2.5 },
                        { t: "seg", a: [50,55], b: [50.7,31], color: "known", width: 2.5 }
                      ]
                    },
                    {
                      caption: "第 2 步：∠OAP = ∠OBP = 90°。",
                      card: "切线垂直于过切点的半径——两个直角出现了。",
                      why: "切线性质定理（g08.1.2）：切线垂直于过切点的半径。",
                      shapes: [
                        { t: "circle", c: [50,55], r: 24, color: "line", width: 2.5 },
                        { t: "seg", a: [86,32], b: [72,64.5], color: "line", width: 2.5 },
                        { t: "seg", a: [86,32], b: [50.7,31], color: "line", width: 2.5 },
                        { t: "right", v: [72,64.5], p: [79.3,67.7], q: [68.8,71.8], size: 7, color: "corrAngle" },
                        { t: "right", v: [50.7,31], p: [50.9,23], q: [42.7,30.8], size: 7, color: "corrAngle" },
                        { t: "txt", p: [50,90], text: "∠OAP = ∠OBP = 90°", size: 13, bold: true, color: "corrAngle" }
                      ]
                    },
                    {
                      caption: "第 3 步：Rt△OAP ≌ Rt△OBP（HL）。",
                      card: "斜边 OP 公共、直角边 OA=OB（都是半径）——HL 判定全等。",
                      why: "HL 定理（g05.1.5）：斜边和一条直角边对应相等；OA=OB 是同圆半径。",
                      shapes: [
                        { t: "circle", c: [50,55], r: 24, color: "line", width: 2 },
                        { t: "poly", pts: [[50,55],[72,64.5],[86,32]], color: "target", width: 3 },
                        { t: "poly", pts: [[50,55],[50.7,31],[86,32]], color: "known", width: 3 },
                        { t: "seg", a: [50,55], b: [72,64.5], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [50,55], b: [50.7,31], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [50,55], b: [86,32], color: "corrB", width: 3, ticks: 2 },
                        { t: "txt", p: [50,90], text: "HL：斜边公共，直角边 OA=OB", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 4 步：PA = PB。",
                      card: "全等三角形的对应边相等——切线长相等，得证。",
                      why: "全等性质：对应边相等（g04.1.1）。",
                      shapes: [
                        { t: "circle", c: [50,55], r: 24, color: "line", width: 2 },
                        { t: "seg", a: [86,32], b: [72,64.5], color: "target", width: 3.5, ticks: 1 },
                        { t: "seg", a: [86,32], b: [50.7,31], color: "target", width: 3.5, ticks: 1 },
                        { t: "txt", p: [68,52], text: "PA = PB", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "连接 OP、OA、OB", reason: "作图：连接两点成线段" },
                    { statement: "∠OAP = ∠OBP = 90°", reason: "切线性质：切线⊥过切点的半径" },
                    { statement: "Rt△OAP ≌ Rt△OBP", reason: "HL：OP 公共，OA=OB（同圆半径）" },
                    { statement: "PA = PB", reason: "全等三角形对应边相等" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "慢放 4 步：连辅助线→找直角→证全等→得结论。",
                "关键一步：第 3 步用 HL——斜边 OP 公共，直角边 OA=OB（同圆半径）。",
                "每个“为什么”都可以点开看依据——证明的每一步都要有出处。"
              ],
              examples: [],
              prev: "g08-u1-l3-p1",
              next: "g08-u1-l3-p3"
            },
            {
              id: "g08-u1-l3-p3",
              title: "切线长定理",
              pageKind: "explain",
              concept: "切线长定理",
              formulas: [
                {
                  id: "f1",
                  latex: "PA、PB\\text{切圆}O\\text{于}A、B \\Rightarrow PA = PB",
                  translation: "切线长定理：从圆外一点引两条切线，切线长相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "切线长定理：PA = PB——两条切线长相等。",
                      shapes: [
                        { t: "circle", c: [45,55], r: 22, color: "known", width: 3 },
                        { t: "pt", p: [45,55], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [88,30], label: "P", color: "known", r: 4 },
                        { t: "seg", a: [88,30], b: [63.4,67.2], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [88,30], b: [43.5,33], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [45,55], b: [88,30], color: "aux", width: 2, dash: "6,4" },
                        { t: "txt", p: [70,56], text: "PA = PB", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？沿 OP 对折，PA 和 PB 严丝合缝——没变的是：两条切线长相等。",
                "从圆外一点画两条切线，这两条“从点到切点”的线段一样长——像从同一点出发的两条对称的滑道。",
                "生活例：花坛外一点修两条切路——一样长；图形例：PA、PB 切圆 O 于 A、B，则 PA=PB。",
                "反例：点在圆上时只能画一条切线——“两条”要求点在圆外。",
                "⚠️ 别搞混：切线长是“线段的长度”（PA），不是“切线”（直线没有长度）——定理说的是两条线段相等。",
                "记住一句话：圆外一点，两切线长相等。外加彩蛋：OP 还平分∠APB——对折一下就看出来了。"
              ],
              examples: [
                { text: "花坛外一点修两条相切的直路", figure: "实物" }
              ],
              prev: "g08-u1-l3-p2",
              next: "g08-u1-l3-p4"
            },
            {
              id: "g08-u1-l3-p4",
              title: "例题：切线长求值",
              pageKind: "explain",
              concept: "切线长定理应用",
              formulas: [
                {
                  id: "f1",
                  latex: "PA = PB = 6",
                  translation: "切线长定理：PB 等于 PA，等于 6"
                },
                {
                  id: "f2",
                  latex: "\\angle APO = \\frac{1}{2}\\angle APB = 30^\\circ",
                  translation: "OP 平分两切线的夹角：∠APO 是 ∠APB 的一半，等于 30°"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：标已知——PA=6（蓝色）。",
                      shapes: [
                        { t: "circle", c: [45,55], r: 22, color: "known", width: 3 },
                        { t: "pt", p: [88,30], label: "P", color: "known", r: 4 },
                        { t: "seg", a: [88,30], b: [63.4,67.2], color: "known", width: 3.5 },
                        { t: "seg", a: [88,30], b: [43.5,33], color: "line", width: 3 },
                        { t: "txt", p: [76,52], text: "PA=6", size: 13, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步：切线长定理——PB=PA=6。",
                      shapes: [
                        { t: "circle", c: [45,55], r: 22, color: "known", width: 3 },
                        { t: "pt", p: [88,30], label: "P", color: "known", r: 4 },
                        { t: "seg", a: [88,30], b: [63.4,67.2], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [88,30], b: [43.5,33], color: "target", width: 3, ticks: 1 },
                        { t: "txt", p: [70,56], text: "PB=PA=6", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：∠APB=60°，OP 平分它——∠APO=30°。",
                      shapes: [
                        { t: "circle", c: [45,55], r: 22, color: "line", width: 2.5 },
                        { t: "seg", a: [88,30], b: [63.4,67.2], color: "line", width: 2.5 },
                        { t: "seg", a: [88,30], b: [43.5,33], color: "line", width: 2.5 },
                        { t: "seg", a: [45,55], b: [88,30], color: "known", width: 2.5 },
                        { t: "arc", v: [88,30], a1: 148, a2: 180, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [88,30], a1: 180, a2: 212, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [68,18], text: "∠APO=30°", size: 13, bold: true, color: "corrAngle" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "已知 PA=6——切线长定理：PB=PA=6，一步出答案。",
                "∠APB=60°，OP 平分它——∠APO=30°（对折彩蛋的用处）。",
                "记住一句话：见“两条切线”，先写 PA=PB，再看 OP 平分角。"
              ],
              examples: [],
              prev: "g08-u1-l3-p3",
              next: "g08-u1-l4-p1"
            }
          ]
        },

        /* ============ g08.1.4 三角形的外接圆与内切圆（5 页） ============ */
        {
          id: "g08-u1-l4",
          title: "三角形的外接圆与内切圆",
          pages: [
            {
              id: "g08-u1-l4-p1",
              title: "三角形“套”进圆",
              concept: "外接圆；外心",
              formulas: [
                {
                  id: "f1",
                  latex: "OA = OB = OC",
                  translation: "外心 O 到三角形三个顶点的距离相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：画 △ABC。",
                      shapes: [
                        { t: "poly", pts: [[25,30],[75,30],[55,78]], color: "line", width: 3 },
                        { t: "pt", p: [25,30], label: "A", color: "known", r: 4 },
                        { t: "pt", p: [75,30], label: "B", color: "known", r: 4 },
                        { t: "pt", p: [55,78], label: "C", color: "known", r: 4 }
                      ]
                    },
                    {
                      caption: "第 2 步：作 AB、BC 的垂直平分线，交于 O。",
                      shapes: [
                        { t: "poly", pts: [[25,30],[75,30],[55,78]], color: "line", width: 2.5 },
                        { t: "seg", a: [50,20], b: [50,90], color: "aux", width: 2, dash: "6,4" },
                        { t: "seg", a: [30,39.4], b: [90,64.4], color: "aux", width: 2, dash: "6,4" },
                        { t: "pt", p: [50,47.75], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,14], text: "垂直平分线的交点 O", size: 12 }
                      ]
                    },
                    {
                      caption: "第 3 步：以 O 为圆心、OA 为半径画圆——恰好经过 B 和 C。",
                      shapes: [
                        { t: "poly", pts: [[25,30],[75,30],[55,78]], color: "line", width: 2.5 },
                        { t: "circle", c: [50,47.75], r: 30.66, color: "known", width: 3 },
                        { t: "pt", p: [50,47.75], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [25,30], label: "A", color: "target", r: 4 },
                        { t: "pt", p: [75,30], label: "B", color: "target", r: 4 },
                        { t: "pt", p: [55,78], label: "C", color: "target", r: 4 }
                      ]
                    },
                    {
                      caption: "第 4 步：定格——OA=OB=OC，O 到三个顶点一样远。",
                      shapes: [
                        { t: "poly", pts: [[25,30],[75,30],[55,78]], color: "line", width: 2 },
                        { t: "circle", c: [50,47.75], r: 30.66, color: "known", width: 3 },
                        { t: "seg", a: [50,47.75], b: [25,30], color: "corrA", width: 2.5, ticks: 1 },
                        { t: "seg", a: [50,47.75], b: [75,30], color: "corrA", width: 2.5, ticks: 1 },
                        { t: "seg", a: [50,47.75], b: [55,78], color: "corrA", width: 2.5, ticks: 1 },
                        { t: "pt", p: [50,47.75], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,90], text: "OA=OB=OC", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 2 帧：AB、BC 的垂直平分线交于 O——交点到 A、B、C 一样远。",
                "以 O 为圆心、OA 为半径画圆——恰好经过 B 和 C：三角形被“套”进了圆。",
                "这个圆叫外接圆，O 叫外心——它是三边垂直平分线的交点（下一页讲透）。"
              ],
              examples: [
                { text: "三个顶点恰好落在一个圆上", figure: "图形" }
              ],
              prev: "g08-u1-l3-p4",
              next: "g08-u1-l4-p2"
            },
            {
              id: "g08-u1-l4-p2",
              title: "外心与外接圆",
              pageKind: "explain",
              concept: "外心；外接圆",
              formulas: [
                {
                  id: "f1",
                  latex: "OA = OB = OC",
                  translation: "外心 O 到三角形三个顶点的距离相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "外心：三边垂直平分线的交点——到顶点等距。",
                      shapes: [
                        { t: "poly", pts: [[25,30],[75,30],[55,78]], color: "line", width: 2.5 },
                        { t: "circle", c: [50,47.75], r: 30.66, color: "known", width: 3 },
                        { t: "pt", p: [50,47.75], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,90], text: "外心：三边垂直平分线交点", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？两条垂直平分线的交点 O，到 A、B、C 的距离都一样——没变的是：OA=OB=OC。",
                "三角形三个顶点正好落在一个圆上，这个圆叫外接圆；圆心 O 叫外心——它是三条边垂直平分线的交点。",
                "生活例：三人站成三角形，找一点到三人等距——站外心上。",
                "图形例：锐角外心在形内；反例：钝角外心在形外，直角外心在斜边中点。",
                "⚠️ 别搞混：外心是“垂直平分线”的交点（找边的中点），不是“角平分线”的交点——一字之差，点就跑偏了。",
                "记住一句话：外心——三边垂直平分线交点，到顶点等距。"
              ],
              examples: [
                { text: "三人站三角形，找等距点站外心上", figure: "实物" }
              ],
              prev: "g08-u1-l4-p1",
              next: "g08-u1-l4-p3"
            },
            {
              id: "g08-u1-l4-p3",
              title: "圆“塞”进三角形",
              concept: "内切圆；内心",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{内心}I\\text{到三边距离相等}",
                  translation: "内心 I 到三角形三条边的距离都相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：画 △ABC。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,75]], color: "line", width: 3 },
                        { t: "pt", p: [20,30], label: "A", color: "known", r: 4 },
                        { t: "pt", p: [80,30], label: "B", color: "known", r: 4 },
                        { t: "pt", p: [55,75], label: "C", color: "known", r: 4 }
                      ]
                    },
                    {
                      caption: "第 2 步：作 ∠A、∠B 的角平分线，交于 I。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,75]], color: "line", width: 2.5 },
                        { t: "seg", a: [20,30], b: [70,54.45], color: "aux", width: 2, dash: "6,4" },
                        { t: "seg", a: [80,30], b: [30,59.4], color: "aux", width: 2, dash: "6,4" },
                        { t: "pt", p: [52.77,46.02], label: "I", color: "known", r: 4 },
                        { t: "txt", p: [52,14], text: "角平分线的交点 I", size: 12 }
                      ]
                    },
                    {
                      caption: "第 3 步：过 I 作 BC 的垂线，垂足为 D。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,75]], color: "line", width: 2.5 },
                        { t: "pt", p: [52.77,46.02], label: "I", color: "known", r: 4 },
                        { t: "seg", a: [52.77,46.02], b: [66.77,53.8], color: "known", width: 2.5 },
                        { t: "pt", p: [66.77,53.8], label: "D", color: "target", r: 4 },
                        { t: "right", v: [66.77,53.8], p: [52.77,46.02], q: [80,30], size: 6, color: "corrAngle" }
                      ]
                    },
                    {
                      caption: "第 4 步：以 I 为圆心、ID 为半径画圆——与三边都相切。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,75]], color: "line", width: 2.5 },
                        { t: "circle", c: [52.77,46.02], r: 16.02, color: "target", width: 3 },
                        { t: "pt", p: [52.77,46.02], label: "I", color: "known", r: 4 },
                        { t: "txt", p: [52,90], text: "I 到三边距离相等", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 2 帧：∠A、∠B 的角平分线交于 I——交点到三边一样远。",
                "过 I 作 BC 的垂线，垂足为 D，以 ID 为半径画圆——圆与三边都相切：圆被“塞”进了三角形。",
                "这个圆叫内切圆，I 叫内心——它是三角平分线的交点（下一页讲透）。"
              ],
              examples: [
                { text: "三角盒里塞最大的圆形饼干", figure: "实物" }
              ],
              prev: "g08-u1-l4-p2",
              next: "g08-u1-l4-p4"
            },
            {
              id: "g08-u1-l4-p4",
              title: "内心与内切圆",
              pageKind: "explain",
              concept: "内心；内切圆",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{内心}I\\text{到三边距离相等}",
                  translation: "内心 I 到三角形三条边的距离都相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "内心：三角平分线的交点——到三边等距。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,75]], color: "line", width: 2.5 },
                        { t: "circle", c: [52.77,46.02], r: 16.02, color: "target", width: 3 },
                        { t: "pt", p: [52.77,46.02], label: "I", color: "known", r: 4 },
                        { t: "txt", p: [52,90], text: "内心：三角平分线交点", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？两条角平分线的交点 I，到三边的距离都一样——没变的是：到三边距离相等。",
                "一个圆和三角形三条边都相切（每边只碰一下），这个圆叫内切圆；圆心 I 叫内心——它是三个角平分线的交点。",
                "生活例：三角盒塞最大圆饼干——边刚好碰三条边；图形例：ID⊥BC，ID 就是内切圆半径。",
                "反例：以边中点为圆心画圆，一般不与三边都相切——内心用角平分线找。",
                "⚠️ 别搞混：内心是“角平分线”交点（分角），外心是“垂直平分线”交点（找边的中点）——名字里都有“心”，找法完全不同。",
                "记住一句话：内心——三角平分线交点，到三边等距。"
              ],
              examples: [
                { text: "三角盒里塞最大的圆形饼干", figure: "实物" }
              ],
              prev: "g08-u1-l4-p3",
              next: "g08-u1-l4-p5"
            },
            {
              id: "g08-u1-l4-p5",
              title: "外心 vs 内心",
              concept: "外心与内心的对比",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{外心:到顶点等距；内心:到三边等距}",
                  translation: "外心到三个顶点距离相等，内心到三条边距离相等"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "外心·外接圆",
                      caption: "外心：三边垂直平分线的交点；圆经过三个顶点；锐角在形内、直角在斜边中点、钝角在形外。",
                      shapes: [
                        { t: "poly", pts: [[25,30],[75,30],[55,78]], color: "line", width: 2.5 },
                        { t: "circle", c: [50,47.75], r: 30.66, color: "known", width: 3 },
                        { t: "pt", p: [50,47.75], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [50,90], text: "圆“包”着三角形", size: 13, bold: true }
                      ]
                    },
                    {
                      label: "内心·内切圆",
                      caption: "内心：三角平分线的交点；圆与三边相切；内心永远在三角形内部。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[55,75]], color: "line", width: 2.5 },
                        { t: "circle", c: [52.77,46.02], r: 16.02, color: "target", width: 3 },
                        { t: "pt", p: [52.77,46.02], label: "I", color: "known", r: 4 },
                        { t: "txt", p: [52,90], text: "三角形“包”着圆", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“外心”看：圆“包”着三角形——圆经过三个顶点。",
                "点“内心”看：三角形“包”着圆——圆与三边都相切。",
                "记住一句话：外心管顶点（到顶点等距），内心管边（到三边等距）。"
              ],
              examples: [],
              prev: "g08-u1-l4-p4",
              next: "g08-u1-l5-p1"
            }
          ]
        },

        /* ============ g08.1.5 圆的方程：x²+y²=r²（4 页，H3 里程碑） ============ */
        {
          id: "g08-u1-l5",
          title: "圆的方程：x²+y²=r²",
          pages: [
            {
              id: "g08-u1-l5-p1",
              title: "圆也能写成一个式子？",
              concept: "圆的方程 x²+y²=r²",
              formulas: [
                {
                  id: "f1",
                  latex: "x^2 + y^2 = r^2",
                  translation: "圆的方程：圆上每一点的坐标 (x,y) 都满足它"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  autoplay: true,
                  steps: [
                    {
                      caption: "第 1 步：建系——圆心在原点 O，半径 r=5。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "pt", p: [50,50], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [88,44], text: "x", size: 13 },
                        { t: "txt", p: [54,88], text: "y", size: 13 },
                        { t: "txt", p: [50,14], text: "圆心 O(0,0)，r=5", size: 12 }
                      ]
                    },
                    {
                      caption: "第 2 步：点 P 在 (5,0)——5²+0²=25=r² ✓。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "seg", a: [50,50], b: [80,50], color: "target", width: 2.5 },
                        { t: "pt", p: [80,50], label: "P", color: "target", r: 4 },
                        { t: "txt", p: [50,14], text: "(5,0)：5²+0²=25 ✓", size: 13, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：点 P 转到 (3,4)——3²+4²=9+16=25=r² ✓。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "seg", a: [50,50], b: [68,74], color: "target", width: 2.5 },
                        { t: "pt", p: [68,74], label: "P", color: "target", r: 4 },
                        { t: "txt", p: [50,14], text: "(3,4)：9+16=25 ✓", size: 13, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：点 P 转到 (0,5)——0²+5²=25 ✓。不管转到哪，x²+y² 永远 = 25。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "seg", a: [50,50], b: [50,80], color: "target", width: 2.5 },
                        { t: "pt", p: [50,80], label: "P", color: "target", r: 4 },
                        { t: "txt", p: [50,14], text: "x²+y² 永远 = 25", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看动画：点 P 在圆上转圈，坐标一直在变——但 x²+y² 永远等于 25。",
                "不变量徽章：没变的是——动点到原点的距离 = r。",
                "一个圆，一个式子——这就是圆的方程（下一页看它怎么来的）。"
              ],
              examples: [
                { text: "广播站覆盖范围：到基站等距的边界", figure: "实物" }
              ],
              prev: "g08-u1-l4-p5",
              next: "g08-u1-l5-p2"
            },
            {
              id: "g08-u1-l5-p2",
              title: "圆的方程怎么来的",
              pageKind: "explain",
              concept: "用距离公式推导圆的方程",
              formulas: [
                {
                  id: "f1",
                  latex: "\\sqrt{(x-0)^2 + (y-0)^2} = r",
                  translation: "圆上点 P(x,y) 到原点 O 的距离等于半径 r（距离公式）"
                },
                {
                  id: "f2",
                  latex: "x^2 + y^2 = r^2",
                  translation: "两边平方：圆上每一点的坐标都满足这个方程"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：设——圆心在原点 O，半径 r，P(x,y) 是圆上任意一点。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "pt", p: [50,50], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [68,74], label: "P(x,y)", color: "target", r: 4 },
                        { t: "seg", a: [50,50], b: [68,74], color: "target", width: 2.5 }
                      ]
                    },
                    {
                      caption: "第 2 步：列式——PO = r，用距离公式写出来。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "seg", a: [50,50], b: [68,74], color: "target", width: 2.5 },
                        { t: "txt", p: [50,14], text: "√[(x−0)²+(y−0)²] = r", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：平方化简——(x−0)²+(y−0)²=r²，即 x²+y²=r²。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "txt", p: [50,14], text: "x²+y² = r²", size: 16, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？g05.1.6 我们亲手“造”出了两点间距离公式——今天用它来“造”圆的方程。",
                "设圆心在原点 O，半径 r，P(x,y) 是圆上任意一点，PO=r。",
                "用距离公式：√[(x−0)²+(y−0)²]=r，两边平方得 x²+y²=r²。",
                "生活例：广播站信号边界就是 x²+y²=r²；图形例：点 (3,4)：9+16=25 ✓ 在圆上。",
                "反例：点 (2,2)：4+4=8≠25，不在圆上——方程是圆的“身份证”。",
                "⚠️ 别搞混：x²+y²=r² 的圆心在原点——圆心不在原点时方程长得不一样（g13.1.7 再讲）。",
                "记住一句话：到原点距离为 r 的点，坐标满足 x²+y²=r²。"
              ],
              examples: [
                { text: "广播站：信号最远传 r 米的边界", figure: "实物" }
              ],
              prev: "g08-u1-l5-p1",
              next: "g08-u1-l5-p3"
            },
            {
              id: "g08-u1-l5-p3",
              title: "例题：代入检验",
              pageKind: "explain",
              concept: "代入方程检验点与圆的位置",
              formulas: [
                {
                  id: "f1",
                  latex: "3^2 + 4^2 = 25 \\Rightarrow A\\text{在圆上}",
                  translation: "A(3,4) 代入满足方程：点 A 在圆上"
                },
                {
                  id: "f2",
                  latex: "2^2 + 2^2 = 8 < 25 \\Rightarrow B\\text{在圆内}",
                  translation: "B(2,2) 代入得 8 小于 25：点 B 在圆内"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：A(3,4)——9+16=25，满足方程，在圆上。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "pt", p: [68,74], label: "A", color: "target", r: 4 },
                        { t: "txt", p: [50,14], text: "3²+4²=25：在圆上 ✓", size: 13, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 2 步：B(2,2)——4+4=8<25，不满足，点 B 在圆内。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "pt", p: [62,62], label: "B", color: "corrB", r: 4 },
                        { t: "txt", p: [50,14], text: "2²+2²=8<25：在圆内", size: 13, bold: true, color: "corrB" }
                      ]
                    },
                    {
                      caption: "第 3 步：C(5,0)——25+0=25，满足方程，在圆上。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "pt", p: [80,50], label: "C", color: "target", r: 4 },
                        { t: "txt", p: [50,14], text: "5²+0²=25：在圆上 ✓", size: 13, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：小结——代入检验 = d 与 r 比大小的代数版。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "txt", p: [50,50], text: "= r² 上；< r² 内；> r² 外", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "A(3,4)：9+16=25——满足方程，点 A 在圆上。",
                "B(2,2)：4+4=8<25——不满足，8<25，点 B 在圆内。",
                "C(5,0)：25+0=25——满足方程，点 C 在圆上。",
                "记住一句话：代入检验 = d 与 r 比大小的代数版。"
              ],
              examples: [],
              prev: "g08-u1-l5-p2",
              next: "g08-u1-l5-p4"
            },
            {
              id: "g08-u1-l5-p4",
              title: "方程和图形的第二次握手",
              pageKind: "explain",
              concept: "H3：方程↔图形的第二个里程碑",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{一次方程}y = kx + b:\\text{图像是直线}",
                  translation: "一次函数：方程的图像是一条直线（代数 ch06，第一次握手）"
                },
                {
                  id: "f2",
                  latex: "\\text{二次方程}x^2 + y^2 = r^2:\\text{图像是圆}",
                  translation: "圆的方程：方程的图像是一个圆（今天，第二次握手）"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第一次握手（代数 ch06）：y=2x+1——一次方程，长相是直线。",
                      shapes: [
                        { t: "seg", a: [20,20], b: [80,90], color: "known", width: 3.5 },
                        { t: "txt", p: [50,14], text: "y=2x+1：一次 → 直线", size: 13, bold: true, color: "known" },
                        { t: "txt", p: [50,90], text: "代数 ch06：第一次握手", size: 12 }
                      ]
                    },
                    {
                      caption: "第二次握手（今天）：x²+y²=25——二次方程，长相是圆。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 28, color: "target", width: 3.5 },
                        { t: "txt", p: [50,14], text: "x²+y²=25：二次 → 圆", size: 13, bold: true, color: "target" },
                        { t: "txt", p: [50,90], text: "几何 g08：第二次握手", size: 12 }
                      ]
                    },
                    {
                      caption: "一次→直线；二次→圆：方程升级，图形升级。",
                      shapes: [
                        { t: "seg", a: [14,60], b: [38,88], color: "known", width: 3 },
                        { t: "circle", c: [68,72], r: 14, color: "target", width: 3 },
                        { t: "txt", p: [26,48], text: "一次", size: 12, color: "known" },
                        { t: "txt", p: [68,48], text: "二次", size: 12, color: "target" },
                        { t: "txt", p: [50,20], text: "方程升级，图形升级", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "代数 ch06：y=kx+b 的“长相”是一条直线——那是方程和图形的第一次握手。",
                "今天：x²+y²=r² 的“长相”是一个圆——第二次握手。方程最高是二次，图形就从直线升级成了圆。",
                "H3 双向链：代数 ch06 的“圆 x²+y²=1 不是函数图像”辨析条，回头看的正是今天这一页。",
                "预告：g13.1.7——圆心不在原点时，方程变成 (x−a)²+(y−b)²=r²，圆“搬家”了。"
              ],
              examples: [
                { text: "回看代数 ch06：一次函数图像", figure: "回链" }
              ],
              prev: "g08-u1-l5-p3",
              next: "g08-u1-l6-p1"
            }
          ]
        },
        /* ============ g08.1.6 本章小结与习题（2 页） ============ */
        {
          id: "g08-u1-l6",
          title: "本章小结与习题",
          pages: [
            {
              id: "g08-u1-l6-p1",
              title: "圆（二）：一张图总结",
              pageKind: "explain",
              concept: "本章小结",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{位置}d\\text{比}r / \\text{切线判定性质} / \\text{切线长} / x^2+y^2=r^2",
                  translation: "本章四块：位置关系、切线、切线长与心、圆的方程"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "位置关系：点、线与圆的位置，都看 d 和 r 比大小。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 26, color: "known", width: 3 },
                        { t: "seg", a: [14,78], b: [86,78], color: "line", width: 3 },
                        { t: "txt", p: [50,14], text: "d>r 离、d=r 切、d<r 交", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "切线：判定（过外端+垂直半径⇒是切线）与性质（是切线⇒垂直于过切点半径）。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 26, color: "known", width: 3 },
                        { t: "seg", a: [16,78], b: [84,78], color: "target", width: 3 },
                        { t: "seg", a: [50,52], b: [50,78], color: "known", width: 3 },
                        { t: "right", v: [50,78], p: [50,52], q: [84,78], size: 6, color: "corrAngle" },
                        { t: "txt", p: [50,14], text: "判定⇄性质：“因为”“所以”别背反", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "切线长：圆外一点两切线长相等（HL 证）；外心管顶点，内心管边。",
                      shapes: [
                        { t: "circle", c: [42,55], r: 20, color: "known", width: 3 },
                        { t: "seg", a: [84,32], b: [58,70], color: "target", width: 3, ticks: 1 },
                        { t: "seg", a: [84,32], b: [42,35], color: "target", width: 3, ticks: 1 },
                        { t: "txt", p: [50,14], text: "PA=PB；外心↔顶点，内心↔边", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "圆的方程：x²+y²=r²——到原点距离为 r 的点的“身份证”。",
                      shapes: [
                        { t: "seg", a: [8,50], b: [92,50], color: "line", width: 2 },
                        { t: "seg", a: [50,8], b: [50,92], color: "line", width: 2 },
                        { t: "circle", c: [50,50], r: 30, color: "known", width: 3 },
                        { t: "txt", p: [50,14], text: "x²+y²=r²：方程↔图形第二次握手", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "位置关系：点、线与圆的位置，都看 d 和 r 比大小——d>r 离、d=r 切、d<r 交（g08.1.1）。",
                "切线判定：过外端 + 垂直半径 ⇒ 是切线；性质：是切线 ⇒ 垂直于过切点半径（g08.1.2）。",
                "“因为”“所以”别背反。",
                "切线长：圆外一点两切线长相等（HL 证，g08.1.3）。",
                "外心（垂直平分线交点）管顶点，内心（角平分线交点）管边（g08.1.4）。",
                "圆的方程：x²+y²=r²——到原点距离为 r 的点的“身份证”，方程↔图形第二次握手（g08.1.5）。",
                "预告：下一章 g09——全等的“放大版”：相似。"
              ],
              examples: [],
              prev: "g08-u1-l5-p4",
              next: "g08-u1-l6-p2"
            },
            {
              id: "g08-u1-l6-p2",
              title: "本章习题：6 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{切线} / \\text{切线长} / x^2+y^2=r^2",
                  translation: "用本章定理：切线判定性质、切线长定理、圆的方程"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "是切线", color: "corrA" },
                    { name: "不是切线", color: "corrB" }
                  ],
                  base: [
                    { t: "circle", c: [30,62], r: 18, color: "line", width: 2.5 },
                    { t: "seg", a: [30,62], b: [30,80], color: "known", width: 2 },
                    { t: "txt", p: [56,80], text: "①", size: 15, bold: true },
                    { t: "txt", p: [52,74], text: "②", size: 15, bold: true },
                    { t: "txt", p: [56,90], text: "③", size: 15, bold: true },
                    { t: "txt", p: [54,68], text: "④", size: 15, bold: true }
                  ],
                  items: [
                    { id: "t1", label: "①", group: 0, anchor: [30,80],
                      shape: { t: "seg", a: [10,80], b: [50,80], color: "line", width: 3 } },
                    { id: "t2", label: "②", group: 1, anchor: [30,62],
                      shape: { t: "seg", a: [14,50], b: [46,74], color: "line", width: 3 } },
                    { id: "t3", label: "③", group: 1, anchor: [30,90],
                      shape: { t: "seg", a: [10,90], b: [50,90], color: "line", width: 3 } },
                    { id: "t4", label: "④", group: 1, anchor: [30,68],
                      shape: { t: "seg", a: [12,68], b: [48,68], color: "line", width: 3 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "1．认图：4 条直线分进两篮——是切线 / 不是切线。",
                "2．圆 O 半径 4，O 到直线 l 距离 4：l 与圆什么关系？依据？",
                "3．PA、PB 切圆 O 于 A、B，OP=10，OA=6，求 PA。",
                "4．△ABC 的外接圆圆心 O，∠A=60°，求 ∠BOC（用圆周角定理）。",
                "5．圆 x²+y²=16：P(0,−4) 在圆上/内/外？Q(3,3) 呢？",
                "6．车轮与地面接触于一点：为什么地面一定垂直于车轴到接触点的连线？"
              ],
              examples: [
                { text: "1．① 是；②③④ 不是（②相交，③相离，④垂足不在圆上）。2．相切（d=r）。3．PA=8（Rt△OAP 勾股：√(100−36)）。4．120°（圆心角=2×圆周角）。5．P 在圆上（0+16=16），Q 在圆外（9+9=18>16）。6．地面是切线——切线垂直于过切点的半径。", figure: "核对答案" }
              ],
              prev: "g08-u1-l6-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
