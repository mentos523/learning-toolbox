/* ============================================================
 * 学习工具箱 · 数学 · 几何 g05：勾股定理
 *
 * 黄队（教育教学专家）生产：1 单元 / 8 课 / 24 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g05 章，枢纽章）
 * 教学设计：docs/math-geometry-pedagogy.md v1.1（跃升 8：形→数）
 * 参数手册：docs/math-geometry-params.md v1.2
 * 白队一屏预算评审：/tmp/white_geom_budget_g05_g07.md（g05 20→23 页，按逐课页清单执行）
 *
 * 页构成：
 *   g05.1.1 发现：方格纸上的秘密   3 页  P1 step-play（数格子） P2 pythag-grow（正方形生长滑块，直角锁定）
 *                                        P3 讲解（猜想 a²+b²=c²）
 *   g05.1.2 证明：弦图拼图          5 页  P1 cut-reassemble（弦图拼图） P2 proof-replay（主证法慢放）
 *                                        P3 proof-replay（总统证法·拼法） P4 proof-replay（总统证法·化简）
 *                                        P5 讲解（定理陈述 + H1 互链代数 2.2.2）
 *   g05.1.3 应用：已知两边求第三边   3 页  P1 ladder-slide（梯子图形联动滑块）
 *                                        P2 讲解（旗杆拉绳例） P3 讲解（逆运算例 + 易错点）
 *   g05.1.4 逆定理                  3 页  P1 step-play（绳圈拉直角） P2 proof-replay（SSS 构造证明）
 *                                        P3 讲解（互逆讲清）
 *   g05.1.5 HL：直角三角形全等      3 页  P1 compare-toggle（补 g04 拼图） P2 proof-replay（勾股+SSS）
 *                                        P3 讲解
 *   g05.1.6 两点间距离公式          2 页  P1 step-play（横平竖直造公式，H2） P2 讲解（+数轴回链）
 *   g05.1.7 勾股数 + √2             3 页  P1 tap-highlight（家族图谱） P2 step-play（√2 对角线，H13） P3 讲解（正例/反例对照：√2 不是勾股数）
 *   g05.1.8 本章小结与习题          2 页  P1 小结（讲解页） P2 习题（tap-highlight 认图 + 6 道题）
 *
 * 呼应点落实：
 *   H1  g05.1.2 P5：弦图既证勾股又证完全平方 (a+b)²，页内写清来龙去脉 + 页尾双向互链代数 2.2.2
 *   H2  g05.1.6 P1/P2：距离公式 ↔ 代数 ch06（"横平竖直"亲手造公式 + 数轴回链）
 *   H13 g05.1.7 P2：√2 ↔ 代数 0.1.3（"画出来→算出来"）
 *
 * 蓝队已实现（2026-10-11，params 手册 v1.3）：以下三交互已接入本章对应页——
 *   cut-reassemble（G5 切割拼补）：g05.1.2 P1（4 三角形 + 1 小正方形 → 弦图）
 *   pythag-grow（正方形生长滑块）：g05.1.1 P2（直角锁定硬约束 + 面积徽章）
 *   ladder-slide（梯子滑块）：g05.1.3 P1（拖梯底/滑块双向联动 + x²+h²=L² 验算）
 *
 * 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 / corrA·corrB·corrC=对应组 /
 *   corrAngle=对应角 / line=普通线 / aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g05"] = {
  id: "g05",
  title: "勾股定理",
  units: [
    {
      id: "g05-u1",
      title: "勾股定理",
      lessons: [
        /* ============ g05.1.1 发现：方格纸上的秘密（3 页） ============ */
        {
          id: "g05-u1-l1",
          title: "发现：方格纸上的秘密",
          pages: [
            {
              id: "g05-u1-l1-p1",
              title: "方格纸上数格子",
              concept: "勾股猜想的发现",
              formulas: [
                {
                  id: "f1",
                  latex: "3^2 + 4^2 = 5^2",
                  translation: "3 的平方加 4 的平方等于 5 的平方"
                },
                {
                  id: "f2",
                  latex: "9 + 16 = 25",
                  translation: "9 加 16 等于 25"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：数两条直角边上的正方形——3×3=9 格，4×4=16 格。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[58,30],[30,51]], color: "line", width: 3 },
                        { t: "right", v: [30,30], p: [58,30], q: [30,51], size: 6, color: "corrAngle" },
                        { t: "poly", pts: [[30,30],[58,30],[58,4],[30,4]], color: "known", width: 2 },
                        { t: "txt", p: [44,17], text: "16 格", size: 13, bold: true },
                        { t: "poly", pts: [[30,30],[30,51],[9,51],[9,30]], color: "known", width: 2 },
                        { t: "txt", p: [19,40], text: "9 格", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：数斜边上的正方形——斜着也能数：整格加半格拼一拼，一共 25 格。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[58,30],[30,51]], color: "line", width: 2 },
                        { t: "poly", pts: [[30,30],[58,30],[58,4],[30,4]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "txt", p: [44,17], text: "16 格", size: 12 },
                        { t: "poly", pts: [[30,30],[30,51],[9,51],[9,30]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "txt", p: [19,40], text: "9 格", size: 12 },
                        { t: "poly", pts: [[58,30],[30,51],[51,79],[79,58]], color: "target", width: 2.5 },
                        { t: "txt", p: [55,54], text: "25 格", size: 13, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：9+16=25——两个小正方形的格子加起来，正好等于大正方形。这是巧合吗？",
                      shapes: [
                        { t: "poly", pts: [[30,30],[58,30],[30,51]], color: "line", width: 2 },
                        { t: "poly", pts: [[30,30],[58,30],[58,4],[30,4]], color: "known", width: 2 },
                        { t: "txt", p: [44,17], text: "16 格", size: 12 },
                        { t: "poly", pts: [[30,30],[30,51],[9,51],[9,30]], color: "known", width: 2 },
                        { t: "txt", p: [19,40], text: "9 格", size: 12 },
                        { t: "poly", pts: [[58,30],[30,51],[51,79],[79,58]], color: "target", width: 2.5 },
                        { t: "txt", p: [55,54], text: "25 格", size: 12 },
                        { t: "txt", p: [50,90], text: "9 + 16 = 25", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "先描出直角三角形：两条直角边 3 格、4 格，斜边 5 格。",
                "数格子：直角边上的正方形是 9 格和 16 格；斜边上的斜着数，整格加半格拼，一共 25 格。",
                "9+16=25——两小块正好填满大块。换个三角形还成立吗？下一页试试。"
              ],
              examples: [
                { text: "装修时数地砖：数砖块就能算面积", figure: "实物" }
              ],
              prev: null,
              next: "g05-u1-l1-p2"
            },
            {
              id: "g05-u1-l1-p2",
              title: "正方形在生长",
              concept: "a²+b²=c² 的猜想",
              formulas: [
                {
                  id: "f1",
                  latex: "a^2 + b^2 = c^2",
                  translation: "a 的平方加 b 的平方等于 c 的平方：两小正方形面积和等于大正方形面积"
                }
              ],
              interaction: {
                type: "pythag-grow",
                params: {
                  aMin: 1, aMax: 6, bMin: 1, bMax: 6,
                  aInit: 3, bInit: 4,
                  lockRight: true, showAreas: true,
                  badge: "直角三角形中，两小块面积和=大块面积"
                }
              },
              auxInteraction: null,
              hints: [
                "三组数都成立：3-4-5、5-12-13、任意 a-b-c——直角三角形里，两小块面积和永远等于大块。",
                "徽章条件式：直角三角形中，两小块面积和 = 大块面积——'直角'这个条件不能丢。",
                "这还只是猜想（看起来对），下一课我们来证明它真的永远对。"
              ],
              examples: [
                { text: "篮球场对角线：长 28 米宽 15 米，对角线约 31.8 米", figure: "实物" }
              ],
              prev: "g05-u1-l1-p1",
              next: "g05-u1-l1-p3"
            },
            {
              id: "g05-u1-l1-p3",
              title: "猜想：a²+b²=c²",
              pageKind: "explain",
              concept: "勾股定理（猜想阶段）",
              formulas: [
                {
                  id: "f1",
                  latex: "a^2 + b^2 = c^2",
                  translation: "直角三角形两直角边的平方和等于斜边的平方"
                },
                {
                  id: "f2",
                  latex: "\\text{勾}^2 + \\text{股}^2 = \\text{弦}^2",
                  translation: "勾的平方加股的平方等于弦的平方：短直角边、长直角边、斜边"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "直角三角形：成立",
                      caption: "直角三角形：9+16=25——有直角，规律成立。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[58,30],[30,51]], color: "known", width: 3 },
                        { t: "right", v: [30,30], p: [58,30], q: [30,51], size: 7, color: "corrAngle" },
                        { t: "txt", p: [50,72], text: "9 + 16 = 25  ✓", size: 15, bold: true, color: "known" }
                      ]
                    },
                    {
                      label: "不是直角：不成立",
                      caption: "等边三角形：4+4=8，不等于 4——没有直角，规律立刻失效。",
                      shapes: [
                        { t: "poly", pts: [[30,28],[60,28],[45,54]], color: "target", width: 3 },
                        { t: "txt", p: [50,72], text: "4 + 4 = 8 ≠ 4  ✗", size: 15, bold: true, color: "target" },
                        { t: "txt", p: [50,60], text: "边长都是 2", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你数了格子、看了正方形生长——直角三角形里，两小块面积加起来永远等于大块。",
                "a² 不是'字母的平方'，是'边长为 a 的正方形的面积'——公式背后站着一个图形。",
                "生活例：房间长 3 米、宽 4 米，装修师傅量对角线是不是 5 米，就知道墙角直不直。",
                "反例：等边三角形边长都是 2，4+4=8≠4——'直角'这个条件丢了，规律立刻失效。",
                "⚠️ 别搞混：c 必须是斜边——最长的那条、对着直角的那条。把直角边当成 c，算出来全错。",
                "记住一句话：勾²加股²等于弦²——勾是短直角边，股是长直角边，弦是斜边。"
              ],
              examples: [
                { text: "木工验墙角：3-4-5 尺", figure: "实物" }
              ],
              prev: "g05-u1-l1-p2",
              next: "g05-u1-l2-p0"
            }
          ]
        }
        ,
        /* ============ g05.1.2 证明：弦图拼图（6 页，p0 前置检查） ============ */
        {
          id: "g05-u1-l2",
          title: "证明：弦图拼图",
          pages: [
            {
              id: "g05-u1-l2-p0",
              title: "前置检查：完全平方公式",
              concept: "完全平方公式（前置检查）",
              formulas: [
                { id: "f1", latex: "(a+b)^2 = a^2 + 2ab + b^2", translation: "完全平方公式：两数和的平方 = 第一项平方 + 两倍乘积 + 第二项平方" }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    { caption: "第 1 步：边长 (a+b) 的大正方形——面积就是 (a+b)²。",
                      shapes: [
                        { t: "poly", pts: [[20,20],[80,20],[80,80],[20,80]], color: "line", width: 2.5 },
                        { t: "txt", p: [50,13], text: "a+b", size: 13 },
                        { t: "txt", p: [12,50], text: "a+b", size: 13 }
                      ] },
                    { caption: "第 2 步：按 a 和 b 各切一刀——横竖两刀，分成四块。",
                      shapes: [
                        { t: "poly", pts: [[20,20],[80,20],[80,80],[20,80]], color: "line", width: 2.5 },
                        { t: "seg", a: [55,20], b: [55,80], color: "line", width: 2 },
                        { t: "seg", a: [20,55], b: [80,55], color: "line", width: 2 },
                        { t: "txt", p: [37,13], text: "a", size: 12 },
                        { t: "txt", p: [67,13], text: "b", size: 12 },
                        { t: "txt", p: [12,37], text: "a", size: 12 },
                        { t: "txt", p: [12,67], text: "b", size: 12 }
                      ] },
                    { caption: "第 3 步：四块面积相加——a² + ab + ab + b²，就是 (a+b)²。",
                      shapes: [
                        { t: "poly", pts: [[20,20],[80,20],[80,80],[20,80]], color: "line", width: 2.5 },
                        { t: "seg", a: [55,20], b: [55,80], color: "line", width: 2 },
                        { t: "seg", a: [20,55], b: [80,55], color: "line", width: 2 },
                        { t: "txt", p: [37,37], text: "a²", size: 14, bold: true },
                        { t: "txt", p: [67,37], text: "ab", size: 14, bold: true },
                        { t: "txt", p: [37,67], text: "ab", size: 14, bold: true },
                        { t: "txt", p: [67,67], text: "b²", size: 14, bold: true }
                      ] }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "30 秒前置检查：本课证明要用这个公式——先看懂这张图，不用背。",
                "人话版：边长 (a+b) 的大正方形切成 a²、b² 和两个 ab，四块面积相加就是公式。",
                "只学几何的同学：记住这张切分图——下一页弦图证明里还会用到它。",
                "代数 2.2.2（ch02-u2-l2）讲过它：那里是“切分证公式”，这里是“用公式证勾股”。"
              ],
              examples: [ { text: "数字验算：(3+2)²=25=9+12+4", figure: "数字例子" } ],
              prev: "g05-u1-l1-p3",
              next: "g05-u1-l2-p1"
            },
            {
              id: "g05-u1-l2-p1",
              title: "四个三角形拼正方形",
              concept: "赵爽弦图",
              formulas: [
                {
                  id: "f1",
                  latex: "(a + b)^2",
                  translation: "大正方形的边长是 a 加 b，面积是 a 加 b 的平方"
                }
              ],
              interaction: {
                type: "cut-reassemble",
                params: {
                  pieces: [
                    { id: "t1", label: "①", pts: [[16.4,48.8],[2,68],[42,68]] },
                    { id: "t2", label: "②", pts: [[37.2,20.4],[18,6],[18,46]] },
                    { id: "t3", label: "③", pts: [[71.6,45.2],[86,26],[46,26]] },
                    { id: "t4", label: "④", pts: [[48.8,79.6],[68,94],[68,54]] },
                    { id: "sq", label: "c", pts: [[10,18],[50,18],[50,58],[10,58]] }
                  ],
                  targets: [
                    { id: "t1", pts: [[44.4,10.8],[30,30],[70,30]] },
                    { id: "t2", pts: [[89.2,44.4],[70,30],[70,70]] },
                    { id: "t3", pts: [[55.6,89.2],[70,70],[30,70]] },
                    { id: "t4", pts: [[10.8,55.6],[30,70],[30,30]] },
                    { id: "sq", pts: [[30,30],[70,30],[70,70],[30,70]] }
                  ],
                  autoAssemble: true,
                  doneText: "弦图拼好了！大正方形边长 = a + b 🎉"
                }
              },
              auxInteraction: null,
              hints: [
                "四个三角形必须全等——直角边都是 a、b，斜边都是 c。",
                "拼的时候让斜边朝里：四条斜边正好围成中间的小正方形。",
                "大正方形每条边 = a+b；小正方形每条边 = c。下一步：用面积算出定理。"
              ],
              examples: [
                { text: "拼图：四块全等三角板拼弦图", figure: "实物" }
              ],
              prev: "g05-u1-l2-p0",
              next: "g05-u1-l2-p2"
            },
            {
              id: "g05-u1-l2-p2",
              title: "主证法：面积两种算法",
              concept: "勾股定理的弦图证明",
              formulas: [
                {
                  id: "f1",
                  latex: "(a+b)^2 = 2ab + c^2",
                  translation: "a 加 b 的平方等于 2ab 加 c 的平方"
                },
                {
                  id: "f2",
                  latex: "a^2 + b^2 = c^2",
                  translation: "a 的平方加 b 的平方等于 c 的平方"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      card: "大正方形的边长是 a+b——每条边都是一段 a 接一段 b。",
                      reason: "已知：四个全等直角三角形（蓝色）；求证：a²+b²=c²（红色）。拼图见上一页。",
                      shapes: [
                        { t: "poly", pts: [[44.4,10.8],[89.2,44.4],[55.6,89.2],[10.8,55.6]], color: "known", width: 3.5 },
                        { t: "txt", p: [57,20], text: "b", size: 13, bold: true, color: "known" },
                        { t: "txt", p: [80,37], text: "a", size: 13, bold: true, color: "known" }
                      ]
                    },
                    {
                      card: "算法一：大正方形面积 = 边长的平方 = (a+b)²。",
                      reason: "正方形面积 = 边长 × 边长。",
                      shapes: [
                        { t: "poly", pts: [[44.4,10.8],[89.2,44.4],[55.6,89.2],[10.8,55.6]], color: "known", width: 2, fill: "known", opacity: 0.25 },
                        { t: "txt", p: [50,50], text: "(a+b)²", size: 16, bold: true, math: true }
                      ]
                    },
                    {
                      card: "中间四边形的角也是直角：顶点处是平角 180°，减去两个锐角（互余，和 90°），剩下 90°。",
                      reason: "直角三角形两锐角互余；180° − 90° = 90°——四边是 c、四角是直角，它才是真正的正方形。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "target", width: 3 },
                        { t: "right", v: [30,30], p: [70,30], q: [30,70], size: 6, color: "corrAngle" },
                        { t: "right", v: [70,30], p: [30,30], q: [70,70], size: 6, color: "corrAngle" },
                        { t: "right", v: [70,70], p: [70,30], q: [30,70], size: 6, color: "corrAngle" },
                        { t: "right", v: [30,70], p: [30,30], q: [70,70], size: 6, color: "corrAngle" },
                        { t: "txt", p: [50,50], text: "c", size: 13, bold: true, color: "target" },
                        { t: "txt", p: [50,90], text: "180°−90°=90°：四角皆直角", size: 13, bold: true }
                      ]
                    },
                    {
                      card: "算法二：4 个小三角形（每个 ab/2）加中间的正方形——上一步刚证了它是正方形，面积 c²。",
                      reason: "三角形面积 = ab ÷ 2；正方形边长是 c，面积 c²。",
                      shapes: [
                        { t: "poly", pts: [[44.4,10.8],[30,30],[70,30]], color: "corrA", width: 2, fill: "corrA", opacity: 0.4 },
                        { t: "poly", pts: [[89.2,44.4],[70,30],[70,70]], color: "corrB", width: 2, fill: "corrB", opacity: 0.4 },
                        { t: "poly", pts: [[55.6,89.2],[70,70],[30,70]], color: "corrC", width: 2, fill: "corrC", opacity: 0.4 },
                        { t: "poly", pts: [[10.8,55.6],[30,70],[30,30]], color: "known", width: 2, fill: "known", opacity: 0.4 },
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "target", width: 2.5, fill: "target", opacity: 0.3 },
                        { t: "txt", p: [50,88], text: "4×ab/2 + c²", size: 14, bold: true, math: true }
                      ]
                    },
                    {
                      card: "同一块面积两种算法：(a+b)²=2ab+c²，展开得 a²+b²=c²。",
                      reason: "等量代换；(a+b)²=a²+2ab+b²（代数 2.2.2 完全平方公式）。",
                      shapes: [
                        { t: "txt", p: [50,58], text: "(a+b)² = 2ab + c²", size: 15, bold: true, math: true },
                        { t: "txt", p: [50,42], text: "→ a² + b² = c²", size: 15, bold: true, math: true, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "大正方形边长为 a+b", reason: "拼图：每条边都是一段 a 接一段 b" },
                    { statement: "面积算法一：(a+b)²", reason: "正方形面积 = 边长²" },
                    { statement: "中间四边形：四边都是 c，四角都是 90°——是正方形", reason: "顶点处：180° − 两锐角之和（90°）= 90°" },
                    { statement: "面积算法二：4×ab/2 + c² = 2ab + c²", reason: "三角形面积 + 正方形面积" },
                    { statement: "(a+b)² = 2ab + c²，展开得 a²+b²=c²", reason: "等量代换；代数 2.2.2" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "证明三问：已知是四个全等直角三角形；求证是 a²+b²=c²；第一步敢拼，因为拼的是面积。",
                "关键动作：同一块大正方形，用两种方法算面积——算出来相等，定理就出来了。",
                "这一步用了代数 2.2.2 的完全平方公式——数和形在这里握手了。"
              ],
              examples: [
                { text: "回看代数 2.2.2：完全平方公式", figure: "回链" }
              ],
              prev: "g05-u1-l2-p1",
              next: "g05-u1-l2-p3"
            },
            {
              id: "g05-u1-l2-p3",
              title: "总统证法：拼梯形",
              concept: "勾股定理的总统证法（拼法）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{(a+b)^2}{2}",
                  translation: "a 加 b 的平方除以 2：梯形的面积"
                },
                {
                  id: "f2",
                  latex: "ab + \\frac{c^2}{2}",
                  translation: "ab 加 c 的平方除以 2：三个三角形的面积和"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      card: "两个全等的直角三角形，直角边 a、b，斜边 c。",
                      reason: "已知：两个全等直角三角形（蓝色）；求证：a²+b²=c²（红色）。",
                      shapes: [
                        { t: "poly", pts: [[20,20],[38,20],[20,44]], color: "known", width: 3 },
                        { t: "txt", p: [29,16], text: "a", size: 12, color: "known" },
                        { t: "txt", p: [16,32], text: "b", size: 12, color: "known" },
                        { t: "poly", pts: [[62,20],[86,20],[86,38]], color: "known", width: 3 },
                        { t: "txt", p: [74,16], text: "b", size: 12, color: "known" },
                        { t: "txt", p: [89,29], text: "a", size: 12, color: "known" }
                      ]
                    },
                    {
                      card: "首尾相接摆好：a 的尾巴接 b 的头，外框是一个直角梯形。",
                      reason: "拼图：两条竖边都垂直于底边，所以它们平行；两底是 a 和 b，高是 a+b。",
                      shapes: [
                        { t: "poly", pts: [[20,20],[62,20],[62,38],[20,44]], color: "line", width: 2.5 },
                        { t: "poly", pts: [[20,20],[38,20],[20,44]], color: "corrA", width: 2, fill: "corrA", opacity: 0.3 },
                        { t: "poly", pts: [[38,20],[62,20],[62,38]], color: "corrB", width: 2, fill: "corrB", opacity: 0.3 },
                        { t: "txt", p: [41,15], text: "a+b", size: 12 },
                        { t: "txt", p: [16,32], text: "b", size: 12 },
                        { t: "txt", p: [65,29], text: "a", size: 12 }
                      ]
                    },
                    {
                      card: "中间三角形两条边都是 c，夹角是 90°——等腰直角三角形。",
                      reason: "交汇点处：180° − 两个锐角 = 90°（三角形内角和）；两条斜边都是 c。",
                      shapes: [
                        { t: "poly", pts: [[20,20],[62,20],[62,38],[20,44]], color: "line", width: 2 },
                        { t: "poly", pts: [[38,20],[20,44],[62,38]], color: "target", width: 2.5, fill: "target", opacity: 0.25 },
                        { t: "right", v: [38,20], p: [20,44], q: [62,38], size: 6, color: "corrAngle" },
                        { t: "txt", p: [29,32], text: "c", size: 12, bold: true, color: "target" },
                        { t: "txt", p: [50,29], text: "c", size: 12, bold: true, color: "target" }
                      ]
                    },
                    {
                      card: "梯形面积两种算法：(a+b)²/2 = ab/2 + ab/2 + c²/2。",
                      reason: "梯形面积 = (上底+下底)×高÷2；三个三角形面积相加。",
                      shapes: [
                        { t: "poly", pts: [[20,20],[62,20],[62,38],[20,44]], color: "known", width: 2, fill: "known", opacity: 0.2 },
                        { t: "txt", p: [41,58], text: "(a+b)²/2", size: 14, bold: true, math: true },
                        { t: "txt", p: [41,44], text: "= ab/2+ab/2+c²/2", size: 13, bold: true, math: true }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "两个全等直角三角形首尾相接", reason: "拼图：a 的尾巴接 b 的头" },
                    { statement: "外框是直角梯形：两底 a、b，高 a+b", reason: "两条竖边都垂直于底边" },
                    { statement: "中间是等腰直角三角形：两条 c，夹角 90°", reason: "180° − 两锐角 = 90°" },
                    { statement: "梯形面积 = (a+b)²/2 = ab/2+ab/2+c²/2", reason: "两种算法" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "总统证法是美国第 20 任总统加菲尔德发现的——当总统前，他是个数学爱好者。",
                "'换种看法'：弦图用正方形装三角形，总统用梯形装三角形——拼法不同，面积守恒相同。",
                "下一步：把列出的等式化简，结论自己走出来。"
              ],
              examples: [
                { text: "加菲尔德：1876 年发表这个证法", figure: "实物" }
              ],
              prev: "g05-u1-l2-p2",
              next: "g05-u1-l2-p4"
            },
            {
              id: "g05-u1-l2-p4",
              title: "总统证法：化简得结论",
              concept: "勾股定理的总统证法（化简）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{(a+b)^2}{2} = ab + \\frac{c^2}{2}",
                  translation: "梯形面积的两种算法相等"
                },
                {
                  id: "f2",
                  latex: "a^2 + b^2 = c^2",
                  translation: "a 的平方加 b 的平方等于 c 的平方"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      card: "两种算法算的是同一个梯形：(a+b)²/2 = ab + c²/2。",
                      reason: "等量代换：同一块面积，两种算法结果相等。",
                      shapes: [
                        { t: "txt", p: [50,58], text: "(a+b)²/2 = ab + c²/2", size: 15, bold: true, math: true }
                      ]
                    },
                    {
                      card: "两边 ×2：(a+b)² = 2ab + c²；展开：a²+b²=c²。",
                      reason: "等式两边同乘 2；(a+b)²=a²+2ab+b²（代数 2.2.2）。",
                      shapes: [
                        { t: "txt", p: [50,62], text: "(a+b)² = 2ab + c²", size: 14, bold: true, math: true },
                        { t: "txt", p: [50,44], text: "→ a² + b² = c²", size: 15, bold: true, math: true, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "(a+b)²/2 = ab + c²/2", reason: "等量代换" },
                    { statement: "两边×2 再展开：a²+b²=c²", reason: "代数 2.2.2 完全平方公式" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "和弦图证法对比：弦图用正方形，总统用梯形——两种拼法，同一个结论。",
                "一题两证：你更喜欢哪一种？为什么？——对证明产生审美，而不是恐惧。",
                "两种证法都只用了一招：同一块面积，两种算法。"
              ],
              examples: [
                { text: "一题多证：弦图 vs 总统证法", figure: "图表" }
              ],
              prev: "g05-u1-l2-p3",
              next: "g05-u1-l2-p5"
            },
            {
              id: "g05-u1-l2-p5",
              title: "这就是勾股定理",
              pageKind: "explain",
              concept: "勾股定理 + H1 呼应",
              formulas: [
                {
                  id: "f1",
                  latex: "a^2 + b^2 = c^2",
                  translation: "直角三角形两直角边的平方和等于斜边的平方"
                },
                {
                  id: "f2",
                  latex: "(a+b)^2 = a^2 + 2ab + b^2",
                  translation: "a 加 b 的平方等于 a 的平方加 2ab 加 b 的平方：完全平方公式"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "读出勾股定理",
                      caption: "把弦图读成'面积相等'：(a+b)²=2ab+c²，化简得 a²+b²=c²——这就是勾股定理。",
                      shapes: [
                        { t: "poly", pts: [[44.4,10.8],[89.2,44.4],[55.6,89.2],[10.8,55.6]], color: "known", width: 3 },
                        { t: "poly", pts: [[44.4,10.8],[30,30],[70,30]], color: "corrA", width: 2, fill: "corrA", opacity: 0.3 },
                        { t: "poly", pts: [[89.2,44.4],[70,30],[70,70]], color: "corrB", width: 2, fill: "corrB", opacity: 0.3 },
                        { t: "poly", pts: [[55.6,89.2],[70,70],[30,70]], color: "corrC", width: 2, fill: "corrC", opacity: 0.3 },
                        { t: "poly", pts: [[10.8,55.6],[30,70],[30,30]], color: "known", width: 2, fill: "known", opacity: 0.3 },
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "line", width: 2 },
                        { t: "txt", p: [50,94], text: "读面积：a² + b² = c²", size: 13, bold: true }
                      ]
                    },
                    {
                      label: "读出完全平方公式",
                      caption: "同一个 (a+b)² 外框，两种分块：弦图分块读出勾股定理；换成 a²、b²、两个 ab 长方形的分块，就读出完全平方公式 (a+b)²=a²+2ab+b²。",
                      shapes: [
                        { t: "poly", pts: [[44.4,10.8],[89.2,44.4],[55.6,89.2],[10.8,55.6]], color: "target", width: 3 },
                        { t: "txt", p: [57,20], text: "b", size: 12, bold: true, color: "target" },
                        { t: "txt", p: [80,37], text: "a", size: 12, bold: true, color: "target" },
                        { t: "txt", p: [50,94], text: "另一种分块：(a+b)²=a²+2ab+b²", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一句话点题：直角三角形两直角边的平方和等于斜边的平方——这就是勾股定理。",
                "H1 来龙去脉：这个 (a+b)² 的大正方形你在代数 2.2.2 见过——当时我们把外框切成 a²、b²、两个 ab，证完全平方公式；今天换成弦图分块，用它证勾股定理。",
                "同一个 (a+b)² 外框，两种分块：弦图分块读出勾股定理，a²/b²/ab 分块读出完全平方公式——数和形是同一枚硬币的两面。",
                "⚠️ 别搞混：勾股定理说的是边长关系（a²+b²=c²），完全平方公式说的是展开关系——一张图，两个定理。",
                "双向互链：回看代数 2.2.2 完全平方公式的几何证明；代数页也链回这一页——姊妹篇互相认亲。",
                "记住一句话：同一个 (a+b)² 外框，两种分块，勾股、平方公式全都有。"
              ],
              examples: [
                { text: "回看代数 2.2.2：完全平方公式（姊妹篇）", figure: "回链" }
              ],
              prev: "g05-u1-l2-p4",
              next: "g05-u1-l3-p1"
            }
          ]
        }
        ,
        /* ============ g05.1.3 应用：已知两边求第三边（3 页） ============ */
        {
          id: "g05-u1-l3",
          title: "应用：已知两边求第三边",
          pages: [
            {
              id: "g05-u1-l3-p1",
              title: "梯子靠墙：滑块实验",
              concept: "勾股定理的直接应用",
              formulas: [
                {
                  id: "f1",
                  latex: "x^2 + h^2 = 10^2",
                  translation: "梯子底端离墙 x 米、高 h 米，x 的平方加 h 的平方等于 100"
                }
              ],
              interaction: {
                type: "ladder-slide",
                params: {
                  length: 10, xMin: 2, xMax: 8, xStep: 0.5, xInit: 6,
                  expr: "sqrt(100-x^2)",
                  unit: "米",
                  showTriangle: true, showCheck: true
                }
              },
              auxInteraction: null,
              hints: [
                "拖滑块，或直接拖梯子底端：梯子长 10 米不变——看高度 h 跟着变。",
                "每次都验算：x²+h² 是不是等于 100？——勾股定理在实时工作。",
                "试试 x=6：h=8——6-8-10，又是勾股数家族的成员。"
              ],
              examples: [
                { text: "梯子靠墙、篮球架", figure: "实物" }
              ],
              prev: "g05-u1-l2-p5",
              next: "g05-u1-l3-p2"
            },
            {
              id: "g05-u1-l3-p2",
              title: "例题：旗杆拉绳",
              pageKind: "explain",
              concept: "已知斜边和一直角边求另一直角边",
              formulas: [
                {
                  id: "f1",
                  latex: "h^2 = 10^2 - 6^2 = 64",
                  translation: "旗杆高度的平方等于 100 减 36，等于 64"
                },
                {
                  id: "f2",
                  latex: "h = 8",
                  translation: "旗杆高 8 米"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步画图：旗杆垂直地面——直角三角形，绳子是斜边（最长的那条）。",
                      shapes: [
                        { t: "seg", a: [15,20], b: [85,20], color: "line", width: 3 },
                        { t: "seg", a: [50,20], b: [50,70], color: "known", width: 3.5 },
                        { t: "right", v: [50,20], p: [85,20], q: [50,70], size: 6, color: "corrAngle" },
                        { t: "seg", a: [50,70], b: [74,20], color: "target", width: 3 },
                        { t: "txt", p: [68,45], text: "10 米", size: 12, bold: true, color: "target" },
                        { t: "txt", p: [62,15], text: "6 米", size: 12 },
                        { t: "txt", p: [44,45], text: "h 米？", size: 12, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步列式：h²+6²=10²——先认出斜边，再把数对号入座。",
                      shapes: [
                        { t: "seg", a: [15,20], b: [85,20], color: "line", width: 2 },
                        { t: "seg", a: [50,20], b: [50,70], color: "known", width: 3 },
                        { t: "seg", a: [50,70], b: [74,20], color: "target", width: 3 },
                        { t: "txt", p: [50,80], text: "h² + 6² = 10²", size: 15, bold: true, math: true }
                      ]
                    },
                    {
                      caption: "第 3 步求解：h²=100−36=64，h=8 米（长度取正）。",
                      shapes: [
                        { t: "seg", a: [15,20], b: [85,20], color: "line", width: 2 },
                        { t: "seg", a: [50,20], b: [50,70], color: "known", width: 3 },
                        { t: "seg", a: [50,70], b: [74,20], color: "target", width: 3 },
                        { t: "txt", p: [50,80], text: "h²=64，h=8 米", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "第 1 步画图：旗杆垂直地面——直角三角形，绳子是斜边（最长的那条）。",
                "第 2 步列式：h²+6²=10²——先认出斜边，再把数对号入座。",
                "第 3 步求解：h²=100−36=64，h=8（长度取正）。",
                "⚠️ 别搞混：斜边是绳子（10 米），不是旗杆——先找最长边，再列式。"
              ],
              examples: [
                { text: "旗杆拉绳、风筝线", figure: "实物" }
              ],
              prev: "g05-u1-l3-p1",
              next: "g05-u1-l3-p3"
            },
            {
              id: "g05-u1-l3-p3",
              title: "反过来：已知斜边求直角边",
              pageKind: "explain",
              concept: "勾股定理的逆运算",
              formulas: [
                {
                  id: "f1",
                  latex: "b = \\sqrt{15^2 - 9^2} = 12",
                  translation: "b 等于根号下 225 减 81，等于 12"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "例题：斜边 15 米、一条直角边 9 米，求另一条 b。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[66,30],[30,78]], color: "line", width: 3 },
                        { t: "right", v: [30,30], p: [66,30], q: [30,78], size: 6, color: "corrAngle" },
                        { t: "txt", p: [48,26], text: "9", size: 13, bold: true },
                        { t: "txt", p: [52,56], text: "15", size: 13, bold: true },
                        { t: "txt", p: [26,54], text: "b=?", size: 13, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "b²=15²−9²=225−81=144，所以 b=12。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[66,30],[30,78]], color: "line", width: 2 },
                        { t: "txt", p: [50,88], text: "b²=225−81=144，b=12", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "例题：斜边 15 米、一条直角边 9 米，求另一条：b²=15²−9²=144，b=12。",
                "⚠️ 易错 1：开方别漏——h²=64 得 h=8，不是 64。",
                "⚠️ 易错 2：c²−a² 不是 (c−a)²——先平方再减，别先减再平方。",
                "⚠️ 易错 3：不写单位——长度题答案带单位（米）。",
                "记住一句话：已知两边求第三边——先找斜边，再列式，最后开方别漏。"
              ],
              examples: [
                { text: "小区滑梯：滑道长 5 米、底端离立柱 4 米，立柱高 3 米", figure: "实物" }
              ],
              prev: "g05-u1-l3-p2",
              next: "g05-u1-l4-p1"
            }
          ]
        },
        /* ============ g05.1.4 逆定理：判定直角三角形（3 页） ============ */
        {
          id: "g05-u1-l4",
          title: "逆定理：判定直角三角形",
          pages: [
            {
              id: "g05-u1-l4-p1",
              title: "绳圈拉直角",
              concept: "勾股逆定理的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "3^2 + 4^2 = 5^2",
                  translation: "3 的平方加 4 的平方等于 5 的平方"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：一根绳子打 13 个结，分成 12 段——取 3 段、4 段、5 段。",
                      shapes: [
                        { t: "seg", a: [15,55], b: [85,55], color: "line", width: 3 },
                        { t: "pt", p: [15,55] }, { t: "pt", p: [20.8,55] }, { t: "pt", p: [26.7,55] },
                        { t: "pt", p: [32.5,55] }, { t: "pt", p: [38.3,55] }, { t: "pt", p: [44.2,55] },
                        { t: "pt", p: [50,55] }, { t: "pt", p: [55.8,55] }, { t: "pt", p: [61.7,55] },
                        { t: "pt", p: [67.5,55] }, { t: "pt", p: [73.3,55] }, { t: "pt", p: [79.2,55] },
                        { t: "pt", p: [85,55] },
                        { t: "txt", p: [50,70], text: "13 个结，12 段", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：3 段、4 段、5 段首尾相接，围成三角形——绳子要拉紧！",
                      shapes: [
                        { t: "poly", pts: [[30,30],[58,30],[30,51]], color: "known", width: 3.5 },
                        { t: "txt", p: [44,26], text: "4 段", size: 12 },
                        { t: "txt", p: [26,40], text: "3 段", size: 12 },
                        { t: "txt", p: [48,44], text: "5 段", size: 12 }
                      ]
                    },
                    {
                      caption: "第 3 步：量一量——3-4-5 对着的角是直角！古埃及人就用这招画直角。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[58,30],[30,51]], color: "known", width: 3.5 },
                        { t: "right", v: [30,30], p: [58,30], q: [30,51], size: 7, color: "corrAngle" },
                        { t: "txt", p: [50,68], text: "3²+4²=5²", size: 14, bold: true, math: true },
                        { t: "txt", p: [50,80], text: "是直角！", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "绳子 12 段：3+4+5=12——打结时数好，别多数少一段。",
                "拉紧！绳子松了围出的就不是三角形了——'拉直'是关键动作。",
                "3²+4²=5² 的三角形，角是直角——反过来也成立，这就是逆定理。"
              ],
              examples: [
                { text: "古埃及绳法：金字塔的地基直角", figure: "实物" }
              ],
              prev: "g05-u1-l3-p3",
              next: "g05-u1-l4-p2"
            },
            {
              id: "g05-u1-l4-p2",
              title: "逆定理证明：SSS 构造",
              concept: "勾股逆定理的证明",
              formulas: [
                {
                  id: "f1",
                  latex: "a^2 + b^2 = c^2 \\Rightarrow \\text{直角三角形}",
                  translation: "如果 a 的平方加 b 的平方等于 c 的平方，那么这个三角形是直角三角形"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      card: "造一个'肯定直角'的三角形：画直角，两条直角边照抄 a、b。",
                      reason: "已知：三边 a、b、c 且 a²+b²=c²（蓝色）；求证：是直角三角形（红色）。作图见 g04.1.7。",
                      shapes: [
                        { t: "poly", pts: [[25,30],[61,30],[25,62]], color: "known", width: 3 },
                        { t: "right", v: [25,30], p: [61,30], q: [25,62], size: 7, color: "corrAngle" },
                        { t: "txt", p: [43,26], text: "a", size: 13, bold: true, color: "known" },
                        { t: "txt", p: [21,46], text: "b", size: 13, bold: true, color: "known" },
                        { t: "txt", p: [50,74], text: "'替身'三角形", size: 12 }
                      ]
                    },
                    {
                      card: "对'替身'用勾股定理：它的斜边 = √(a²+b²)。",
                      reason: "勾股定理（上一课刚证的）：替身是直角三角形，对它用理直气壮。",
                      shapes: [
                        { t: "poly", pts: [[25,30],[61,30],[25,62]], color: "known", width: 2.5 },
                        { t: "txt", p: [48,50], text: "斜边=√(a²+b²)", size: 12, bold: true, color: "target" }
                      ]
                    },
                    {
                      card: "已知 a²+b²=c²，所以'替身'的斜边 = c。",
                      reason: "已知条件代入：√(a²+b²) = √c² = c。",
                      shapes: [
                        { t: "poly", pts: [[8,45],[26,45],[8,63]], color: "line", width: 2.5 },
                        { t: "txt", p: [17,70], text: "原三角形", size: 11 },
                        { t: "txt", p: [17,36], text: "a,b,c", size: 11 },
                        { t: "poly", pts: [[45,45],[63,45],[45,63]], color: "known", width: 2.5 },
                        { t: "txt", p: [54,70], text: "'替身'", size: 11 },
                        { t: "txt", p: [54,36], text: "a,b,c", size: 11, color: "known" }
                      ]
                    },
                    {
                      card: "两个三角形三边都相等 → SSS 全等 → ∠C = 90°。",
                      reason: "SSS 判定（g04.1.2）；全等三角形对应角相等。",
                      shapes: [
                        { t: "poly", pts: [[8,45],[26,45],[8,63]], color: "line", width: 2.5 },
                        { t: "seg", a: [8,45], b: [26,45], ticks: 1, color: "corrA" },
                        { t: "seg", a: [26,45], b: [8,63], ticks: 2, color: "corrB" },
                        { t: "seg", a: [8,63], b: [8,45], ticks: 3, color: "corrC" },
                        { t: "poly", pts: [[45,45],[63,45],[45,63]], color: "line", width: 2.5 },
                        { t: "seg", a: [45,45], b: [63,45], ticks: 1, color: "corrA" },
                        { t: "seg", a: [63,45], b: [45,63], ticks: 2, color: "corrB" },
                        { t: "seg", a: [45,63], b: [45,45], ticks: 3, color: "corrC" },
                        { t: "right", v: [45,45], p: [63,45], q: [45,63], size: 6, color: "corrAngle" },
                        { t: "right", v: [8,45], p: [26,45], q: [8,63], size: 6, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "作直角三角形，直角边为 a、b", reason: "作图（g04.1.7）" },
                    { statement: "它的斜边 = √(a²+b²) = c", reason: "勾股定理 + 已知条件" },
                    { statement: "两三角形三边对应相等", reason: "已知 + 上一步" },
                    { statement: "SSS 全等 → 对应角 ∠C = 90°", reason: "SSS 判定（g04.1.2）" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "证明思路：'造'一个已知是直角三角形的'替身'，再证明它和原三角形全等。",
                "为什么敢用勾股定理？因为替身是我们亲手画的直角三角形——对它用，理直气壮。",
                "SSS 是桥梁：三边相等 → 全等 → 角相等——全等判定在这里立功了。"
              ],
              examples: [
                { text: "替身战术：先造一个已知的，再证全等", figure: "图表" }
              ],
              prev: "g05-u1-l4-p1",
              next: "g05-u1-l4-p3"
            },
            {
              id: "g05-u1-l4-p3",
              title: "互逆：条件结论换位置",
              pageKind: "explain",
              concept: "定理与逆定理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{定理：直角} \\Rightarrow a^2+b^2=c^2",
                  translation: "定理：如果是直角三角形，那么两直角边的平方和等于斜边的平方"
                },
                {
                  id: "f2",
                  latex: "a^2+b^2=c^2 \\Rightarrow \\text{直角}",
                  translation: "逆定理：如果三边满足平方和关系，那么这个三角形是直角三角形"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "定理：由形到数",
                      caption: "已知是直角三角形 → 可以算 a²+b²=c²：从'形'推出'数'。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[58,30],[30,51]], color: "known", width: 3 },
                        { t: "right", v: [30,30], p: [58,30], q: [30,51], size: 7, color: "corrAngle" },
                        { t: "txt", p: [50,68], text: "直角 → a²+b²=c²", size: 13, bold: true }
                      ]
                    },
                    {
                      label: "逆定理：由数到形",
                      caption: "已知 6²+8²=10² → 可以判定是直角三角形：从'数'推出'形'。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[62,30],[30,62]], color: "target", width: 3 },
                        { t: "right", v: [30,30], p: [62,30], q: [30,62], size: 7, color: "corrAngle" },
                        { t: "txt", p: [50,68], text: "6²+8²=10² → 直角", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "互逆就是'条件结论换位置'：定理说'直角→平方和'，逆定理说'平方和→直角'。",
                "生活例：木工验直角——量三边是不是 3-4-5，是就是直角，不用带量角器。",
                "图形例：6-8-10（3-4-5 的 2 倍）：36+64=100——也是直角三角形。",
                "反例：2-3-4：4+9=13≠16——差一点也不是直角，'差不多'不行。",
                "⚠️ 别搞混：先找最长边当 c——把短边当成 c 去验，永远验不对。",
                "记住一句话：平方和对上号，直角就跑不掉。"
              ],
              examples: [
                { text: "装修验墙角：3-4-5 墨斗", figure: "实物" }
              ],
              prev: "g05-u1-l4-p2",
              next: "g05-u1-l5-p1"
            }
          ]
        }
        ,
        /* ============ g05.1.5 HL：直角三角形全等（3 页） ============ */
        {
          id: "g05-u1-l5",
          title: "HL：直角三角形全等",
          pages: [
            {
              id: "g05-u1-l5-p1",
              title: "g04 缺的最后一块拼图",
              concept: "HL 判定的引入",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{斜边}=\\text{斜边},\\ \\text{直角边}=\\text{直角边}\\Rightarrow\\text{全等}",
                  translation: "斜边和一条直角边对应相等，两个直角三角形全等"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "g04 的四种判定",
                      caption: "SSS、SAS、ASA、AAS——g04 讲了四种全等判定，够用吗？",
                      shapes: [
                        { t: "txt", p: [50,50], text: "SSS / SAS / ASA / AAS", size: 16, bold: true },
                        { t: "txt", p: [50,36], text: "g04 的四种判定", size: 13 }
                      ]
                    },
                    {
                      label: "直角三角形：HL",
                      caption: "直角三角形有第五种：斜边和一条直角边对应相等——HL。g04 没讲，因为它要等勾股定理。",
                      shapes: [
                        { t: "poly", pts: [[12,62],[36,62],[12,38]], color: "line", width: 2.5 },
                        { t: "right", v: [12,62], p: [36,62], q: [12,38], size: 6, color: "corrAngle" },
                        { t: "seg", a: [36,62], b: [12,38], ticks: 1, color: "corrA" },
                        { t: "seg", a: [12,38], b: [12,62], ticks: 2, color: "corrB" },
                        { t: "poly", pts: [[58,62],[82,62],[58,38]], color: "line", width: 2.5 },
                        { t: "right", v: [58,62], p: [82,62], q: [58,38], size: 6, color: "corrAngle" },
                        { t: "seg", a: [82,62], b: [58,38], ticks: 1, color: "corrA" },
                        { t: "seg", a: [58,38], b: [58,62], ticks: 2, color: "corrB" },
                        { t: "txt", p: [47,72], text: "斜边、一条直角边对应相等", size: 12, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "g04 预告过：'直角三角形还有第五种判定，学完勾股定理揭晓'——今天兑现。",
                "HL 只用于直角三角形——普通三角形用它，不灵。",
                "H 是 hypotenuse（斜边），L 是 leg（直角边）——名字就是条件。"
              ],
              examples: [
                { text: "集齐五种判定：SSS/SAS/ASA/AAS/HL", figure: "图表" }
              ],
              prev: "g05-u1-l4-p3",
              next: "g05-u1-l5-p2"
            },
            {
              id: "g05-u1-l5-p2",
              title: "HL 证明：勾股+SSS",
              concept: "HL 判定的证明",
              formulas: [
                {
                  id: "f1",
                  latex: "\\sqrt{c^2-a^2}",
                  translation: "根号下 c 的平方减 a 的平方：另一条直角边"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      card: "在 Rt△ABC 里用勾股定理：另一直角边 BC = √(c²−a²)。",
                      reason: "已知：两个直角三角形，斜边 c、直角边 a 对应相等（蓝色）；求证：全等（红色）。",
                      shapes: [
                        { t: "poly", pts: [[20,35],[56,35],[20,67]], color: "line", width: 3 },
                        { t: "right", v: [20,35], p: [56,35], q: [20,67], size: 7, color: "corrAngle" },
                        { t: "txt", p: [42,52], text: "c", size: 13, bold: true, color: "known" },
                        { t: "txt", p: [16,51], text: "a", size: 13, bold: true, color: "known" },
                        { t: "seg", a: [20,35], b: [56,35], ticks: 1, color: "target" },
                        { t: "txt", p: [38,30], text: "BC = ?", size: 12, bold: true, color: "target" }
                      ]
                    },
                    {
                      card: "在 Rt△DEF 里同样：EF = √(c²−a²)。",
                      reason: "同一个勾股定理，同样的已知条件——算出来必然一样。",
                      shapes: [
                        { t: "poly", pts: [[20,35],[56,35],[20,67]], color: "line", width: 2.5 },
                        { t: "txt", p: [38,30], text: "EF = √(c²−a²)", size: 12, bold: true, color: "target" }
                      ]
                    },
                    {
                      card: "BC 和 EF 都是 √(c²−a²)，所以 BC = EF。",
                      reason: "等量代换：同一个式子算出的结果相等。",
                      shapes: [
                        { t: "poly", pts: [[8,48],[32,48],[8,72]], color: "line", width: 2.5 },
                        { t: "seg", a: [8,48], b: [32,48], ticks: 1, color: "corrA" },
                        { t: "poly", pts: [[50,48],[74,48],[50,72]], color: "line", width: 2.5 },
                        { t: "seg", a: [50,48], b: [74,48], ticks: 1, color: "corrA" },
                        { t: "txt", p: [41,80], text: "BC = EF", size: 13, bold: true }
                      ]
                    },
                    {
                      card: "三边对应相等 → SSS → 两个三角形全等。",
                      reason: "SSS 判定（g04.1.2）：三边对应相等则全等。",
                      shapes: [
                        { t: "poly", pts: [[8,48],[32,48],[8,72]], color: "line", width: 2.5 },
                        { t: "seg", a: [8,48], b: [32,48], ticks: 1, color: "corrA" },
                        { t: "seg", a: [32,48], b: [8,72], ticks: 2, color: "corrB" },
                        { t: "seg", a: [8,72], b: [8,48], ticks: 3, color: "corrC" },
                        { t: "poly", pts: [[50,48],[74,48],[50,72]], color: "line", width: 2.5 },
                        { t: "seg", a: [50,48], b: [74,48], ticks: 1, color: "corrA" },
                        { t: "seg", a: [74,48], b: [50,72], ticks: 2, color: "corrB" },
                        { t: "seg", a: [50,72], b: [50,48], ticks: 3, color: "corrC" },
                        { t: "txt", p: [41,82], text: "SSS → 全等", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "Rt△ABC 中：BC = √(c²−a²)", reason: "勾股定理" },
                    { statement: "Rt△DEF 中：EF = √(c²−a²)", reason: "勾股定理" },
                    { statement: "BC = EF", reason: "等量代换" },
                    { statement: "三边对应相等 → SSS → 全等", reason: "SSS 判定（g04.1.2）" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "证明只有一招：用勾股定理把'未知'的第三边算出来，化成 SSS。",
                "为什么 HL 只适用于直角三角形？因为证明里用了勾股定理——非直角三角形没这条路。"
              ],
              examples: [
                { text: "化归思想：未知→已知（SSS）", figure: "图表" }
              ],
              prev: "g05-u1-l5-p1",
              next: "g05-u1-l5-p3"
            },
            {
              id: "g05-u1-l5-p3",
              title: "HL：直角三角形专用",
              pageKind: "explain",
              concept: "HL 判定",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{HL：斜边、直角边对应相等}",
                  translation: "斜边和一条直角边对应相等，两个直角三角形全等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "例：斜边 10、直角边 6 对应相等 → HL → 全等。",
                      shapes: [
                        { t: "poly", pts: [[15,42],[45,42],[15,72]], color: "line", width: 2.5 },
                        { t: "right", v: [15,42], p: [45,42], q: [15,72], size: 6, color: "corrAngle" },
                        { t: "seg", a: [45,42], b: [15,72], ticks: 1, color: "corrA" },
                        { t: "seg", a: [15,72], b: [15,42], ticks: 2, color: "corrB" },
                        { t: "poly", pts: [[55,42],[85,42],[55,72]], color: "line", width: 2.5 },
                        { t: "right", v: [55,42], p: [85,42], q: [55,72], size: 6, color: "corrAngle" },
                        { t: "seg", a: [85,42], b: [55,72], ticks: 1, color: "corrA" },
                        { t: "seg", a: [55,72], b: [55,42], ticks: 2, color: "corrB" },
                        { t: "txt", p: [50,82], text: "HL → 全等 ✓", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "反例：两条直角边对应相等——那是 SAS，别叫成 HL。",
                      shapes: [
                        { t: "poly", pts: [[15,42],[45,42],[15,72]], color: "line", width: 2.5 },
                        { t: "right", v: [15,42], p: [45,42], q: [15,72], size: 6, color: "corrAngle" },
                        { t: "seg", a: [15,42], b: [45,42], ticks: 1, color: "corrA" },
                        { t: "seg", a: [15,72], b: [15,42], ticks: 2, color: "corrB" },
                        { t: "poly", pts: [[55,42],[85,42],[55,72]], color: "line", width: 2.5 },
                        { t: "right", v: [55,42], p: [85,42], q: [55,72], size: 6, color: "corrAngle" },
                        { t: "seg", a: [55,42], b: [85,42], ticks: 1, color: "corrA" },
                        { t: "seg", a: [55,72], b: [55,42], ticks: 2, color: "corrB" },
                        { t: "txt", p: [50,82], text: "这是 SAS，不是 HL", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "HL 陈述：斜边和一条直角边对应相等的两个直角三角形全等。",
                "生活例：两个直角三角板，斜边一样长、一条直角边一样长——叠上去严丝合缝。",
                "反例：两条直角边对应相等，那是 SAS——HL 的'H'必须是斜边。",
                "⚠️ 别搞混：看到'直角三角形+两条边相等'，先问——其中一条是斜边吗？是，才是 HL。",
                "记住一句话：直角三角形判全等，斜边直角边来相认。"
              ],
              examples: [
                { text: "一副三角板：45° 的那块", figure: "实物" }
              ],
              prev: "g05-u1-l5-p2",
              next: "g05-u1-l6-p1"
            }
          ]
        },
        /* ============ g05.1.6 两点间距离公式（2 页） ============ */
        {
          id: "g05-u1-l6",
          title: "两点间距离公式",
          pages: [
            {
              id: "g05-u1-l6-p1",
              title: "横平竖直造公式",
              concept: "两点间距离公式的发现（H2）",
              formulas: [
                {
                  id: "f1",
                  latex: "AB = \\sqrt{3^2 + 4^2} = 5",
                  translation: "AB 等于根号下 9 加 16，等于 5"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：A(1,2)、B(4,6)——求 AB 有多长。",
                      shapes: [
                        { t: "seg", a: [10,15], b: [90,15], color: "line", width: 2 },
                        { t: "seg", a: [15,10], b: [15,90], color: "line", width: 2 },
                        { t: "pt", p: [25,35], label: "A(1,2)", color: "known" },
                        { t: "pt", p: [55,75], label: "B(4,6)", color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步：过 A 作横线、过 B 作竖线——'横平竖直'造出直角三角形 ABC。",
                      shapes: [
                        { t: "seg", a: [10,15], b: [90,15], color: "line", width: 2 },
                        { t: "seg", a: [15,10], b: [15,90], color: "line", width: 2 },
                        { t: "pt", p: [25,35], label: "A(1,2)", color: "known" },
                        { t: "pt", p: [55,75], label: "B(4,6)", color: "known" },
                        { t: "seg", a: [25,35], b: [55,35], color: "aux", width: 2, dash: "6,4" },
                        { t: "seg", a: [55,35], b: [55,75], color: "aux", width: 2, dash: "6,4" },
                        { t: "pt", p: [55,35], label: "C(4,2)", color: "aux" },
                        { t: "right", v: [55,35], p: [25,35], q: [55,75], size: 6, color: "corrAngle" }
                      ]
                    },
                    {
                      caption: "第 3 步：两条直角边就是坐标差：3 和 4——AB=√(3²+4²)=5，公式自己'长'出来了。",
                      shapes: [
                        { t: "seg", a: [10,15], b: [90,15], color: "line", width: 1.5 },
                        { t: "seg", a: [15,10], b: [15,90], color: "line", width: 1.5 },
                        { t: "seg", a: [25,35], b: [55,35], color: "known", width: 3 },
                        { t: "seg", a: [55,35], b: [55,75], color: "known", width: 3 },
                        { t: "seg", a: [25,35], b: [55,75], color: "target", width: 3 },
                        { t: "right", v: [55,35], p: [25,35], q: [55,75], size: 6, color: "corrAngle" },
                        { t: "txt", p: [40,30], text: "AC=|4−1|=3", size: 12 },
                        { t: "txt", p: [62,55], text: "BC=|6−2|=4", size: 12 },
                        { t: "txt", p: [50,88], text: "AB=√(3²+4²)=5", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "H2：亲手'造'公式——横线一画、竖线一画，直角三角形就出来了。",
                "直角边 = 坐标差：横着差 3，竖着差 4——'差'字就是减法。",
                "斜边 AB 就是两点距离：√(3²+4²)=5。"
              ],
              examples: [
                { text: "地图上量两点距离", figure: "实物" }
              ],
              prev: "g05-u1-l5-p3",
              next: "g05-u1-l6-p2"
            },
            {
              id: "g05-u1-l6-p2",
              title: "两点间距离公式",
              pageKind: "explain",
              concept: "两点间距离公式 + H2 呼应",
              formulas: [
                {
                  id: "f1",
                  latex: "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
                  translation: "两点距离等于 x 坐标差的平方加 y 坐标差的平方，再开方"
                },
                {
                  id: "f2",
                  latex: "d = |x_2 - x_1|",
                  translation: "数轴上两点距离等于坐标差的绝对值：一维版本"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "例题：P(−1,3)、Q(2,−1)：横差 3、纵差 4，d=√(9+16)=5。",
                      shapes: [
                        { t: "seg", a: [10,15], b: [90,15], color: "line", width: 1.5 },
                        { t: "seg", a: [15,10], b: [15,90], color: "line", width: 1.5 },
                        { t: "poly", pts: [[30,60],[60,60],[60,20]], color: "line", width: 2.5 },
                        { t: "right", v: [60,60], p: [30,60], q: [60,20], size: 6, color: "corrAngle" },
                        { t: "txt", p: [45,65], text: "横差 3", size: 12 },
                        { t: "txt", p: [66,40], text: "纵差 4", size: 12 },
                        { t: "txt", p: [50,82], text: "d=√(3²+4²)=5", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "数轴回链：一维时距离=|7−2|=5——平面公式是它的'升级版'。",
                      shapes: [
                        { t: "seg", a: [15,50], b: [85,50], color: "line", width: 3 },
                        { t: "pt", p: [29,50], label: "2", color: "known" },
                        { t: "pt", p: [64,50], label: "7", color: "known" },
                        { t: "seg", a: [29,50], b: [64,50], color: "target", width: 4 },
                        { t: "txt", p: [46,62], text: "距离 = |7−2| = 5", size: 13, bold: true },
                        { t: "txt", p: [50,76], text: "一维：|dx| → 二维：√(dx²+dy²)", size: 12 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "公式：d=√[(x₂−x₁)²+(y₂−y₁)²]——横坐标差、纵坐标差，先平方、再相加、最后开方。",
                "数轴回链：一维时距离 = |x₂−x₁|；平面是它的升级版——多了一个 y，多了一次平方和。",
                "例题：P(−1,3)、Q(2,−1)：横差 3、纵差 −4，d=√(9+16)=5。",
                "⚠️ 别搞混：是 √(dx²+dy²)，不是 |dx|+|dy|——'先平方再开方'和'直接相加'是两回事。",
                "H2 互链：代数 ch06-u0-l2 坐标系里，两点距离从今天起有了公式——几何给代数递了一把尺子。",
                "记住一句话：横差竖差平方和，开方就是距离。"
              ],
              examples: [
                { text: "回看代数 ch06-u0-l2：平面直角坐标系", figure: "回链" }
              ],
              prev: "g05-u1-l6-p1",
              next: "g05-u1-l7-p1"
            }
          ]
        },
        /* ============ g05.1.7 勾股数 + √2（2 页） ============ */
        {
          id: "g05-u1-l7",
          title: "勾股数",
          pages: [
            {
              id: "g05-u1-l7-p1",
              title: "整数边直角三角形家族",
              concept: "勾股数",
              formulas: [
                {
                  id: "f1",
                  latex: "3^2 + 4^2 = 5^2",
                  translation: "3 的平方加 4 的平方等于 5 的平方：最小的勾股数"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "txt", p: [50,90], text: "点成员，看它属于哪个家族", size: 14 }
                  ],
                  groups: [
                    { name: "3-4-5 家族", color: "corrA" },
                    { name: "5-12-13 家族", color: "corrB" },
                    { name: "更多本原勾股数", color: "corrC" }
                  ],
                  items: [
                    { id: "t1", label: "3-4-5", group: 0, anchor: [20,72],
                      shape: { t: "poly", pts: [[8,80],[32,80],[8,60]], color: "corrA", width: 2.5 } },
                    { id: "t2", label: "6-8-10", group: 0, anchor: [60,72],
                      shape: { t: "poly", pts: [[48,80],[72,80],[48,60]], color: "corrA", width: 2.5 } },
                    { id: "t3", label: "5-12-13", group: 1, anchor: [20,45],
                      shape: { t: "poly", pts: [[8,53],[32,53],[8,33]], color: "corrB", width: 2.5 } },
                    { id: "t4", label: "10-24-26", group: 1, anchor: [60,45],
                      shape: { t: "poly", pts: [[48,53],[72,53],[48,33]], color: "corrB", width: 2.5 } },
                    { id: "t5", label: "8-15-17", group: 2, anchor: [20,18],
                      shape: { t: "poly", pts: [[8,26],[32,26],[8,6]], color: "corrC", width: 2.5 } },
                    { id: "t6", label: "20-21-29", group: 2, anchor: [60,18],
                      shape: { t: "poly", pts: [[48,26],[72,26],[48,6]], color: "corrC", width: 2.5 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点三角形：3-4-5 和 6-8-10 是一家（2 倍关系）；5-12-13 和 10-24-26 是一家；8-15-17 和 20-21-29 都是本原勾股数，彼此没有倍数关系。",
                "本原勾股数 = 不能从别的勾股数放大缩小得到，比如 8-15-17、20-21-29。",
                "勾股数 = 三边都是整数的直角三角形——最出名的是 3-4-5。",
                "记住 3-4-5、5-12-13、8-15-17——考试和生活里最常见。"
              ],
              examples: [
                { text: "3-4-5 墨斗、5-12-13 房梁", figure: "实物" }
              ],
              prev: "g05-u1-l6-p2",
              next: "g05-u1-l7-p2"
            },
            {
              id: "g05-u1-l7-p2",
              title: "√2：画出来的数",
              concept: "√2 的几何意义（H13）",
              formulas: [
                {
                  id: "f1",
                  latex: "c = \\sqrt{1^2 + 1^2} = \\sqrt{2}",
                  translation: "c 等于根号下 1 的平方加 1 的平方，等于根号 2"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：边长 1 的正方形，连一条对角线——得到等腰直角三角形。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "line", width: 3 },
                        { t: "seg", a: [30,30], b: [70,70], color: "target", width: 3 },
                        { t: "txt", p: [50,25], text: "1", size: 13 },
                        { t: "txt", p: [24,50], text: "1", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：用勾股定理算：c²=1²+1²=2，所以 c=√2——'画出来'之后跟一步'算出来'。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "line", width: 2.5 },
                        { t: "seg", a: [30,30], b: [70,70], color: "target", width: 3 },
                        { t: "txt", p: [56,56], text: "c", size: 14, bold: true, color: "target" },
                        { t: "txt", p: [50,82], text: "c²=1²+1²=2，c=√2", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：√2 不是算出来的，是画出来的——它就住在正方形的对角线上。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "line", width: 2.5 },
                        { t: "seg", a: [30,30], b: [70,70], color: "target", width: 3.5 },
                        { t: "txt", p: [50,88], text: "√2 就住在正方形的对角线上", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "画出来：边长 1 的正方形，对角线一连，等腰直角三角形出现了。",
                "算出来：c²=1²+1²=2，所以 c=√2——计算只要一行，但必须有。",
                "H13：代数 0.1.3 的无理数 √2，在几何里找到了家——'无限不循环'的数，也是一条看得见的线段。"
              ],
              examples: [
                { text: "回看代数 0.1.3：无理数 √2", figure: "回链" }
              ],
              prev: "g05-u1-l7-p1",
              next: "g05-u1-l7-p3"
            },
            {
              id: "g05-u1-l7-p3",
              title: "勾股数：边边皆整数",
              pageKind: "explain",
              concept: "勾股数",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{勾股数} = \\text{三边都是整数的直角三角形}",
                  translation: "勾股数就是三条边都是整数的直角三角形"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "是勾股数：3-4-5",
                      caption: "3-4-5：三边都是整数，又是直角三角形——勾股数。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[66,30],[30,66]], color: "corrA", width: 3 },
                        { t: "right", v: [30,30], p: [66,30], q: [30,66], size: 6, color: "corrAngle" },
                        { t: "txt", p: [48,24], text: "4", size: 13, bold: true },
                        { t: "txt", p: [24,48], text: "3", size: 13, bold: true },
                        { t: "txt", p: [52,52], text: "5", size: 13, bold: true },
                        { t: "txt", p: [50,80], text: "3²+4²=5²，三边整数 ✓", size: 13, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      label: "不是勾股数：1-1-√2",
                      caption: "1-1-√2：也满足 a²+b²=c²，但 √2 不是整数——不是勾股数。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[66,30],[30,66]], color: "line", width: 3 },
                        { t: "right", v: [30,30], p: [66,30], q: [30,66], size: 6, color: "corrAngle" },
                        { t: "txt", p: [48,24], text: "1", size: 13, bold: true },
                        { t: "txt", p: [24,48], text: "1", size: 13, bold: true },
                        { t: "txt", p: [52,52], text: "√2", size: 13, bold: true, color: "target" },
                        { t: "txt", p: [50,80], text: "√2 不是整数 ✗", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你点的 3-4-5、5-12-13、8-15-17——三条边都是整数，这就是勾股数。",
                "勾股数：三条边都是整数的直角三角形——“整数”和“直角”两个条件，缺一不可。",
                "生活例：木工的 3-4-5 墨斗——3 米、4 米、5 米一拉，直角就出来了。",
                "图形例：6-8-10 是 3-4-5 的 2 倍——同一家族，放大缩小还是勾股数。",
                "反例：边长 1、1、√2 的等腰直角三角形——也满足 a²+b²=c²，但 √2 不是整数，所以它不是勾股数。",
                "⚠️ 别搞混：a²+b²=c² 成立 ≠ 勾股数——勾股数还要求三条边都是整数。",
                "⚠️ 别搞混 2：2-3-4 看着像，2²+3²=13≠16——得验算，不能看长得像。",
                "记住一句话：勾股数，边边皆整数。"
              ],
              examples: [
                { text: "记住三组：3-4-5、5-12-13、8-15-17", figure: "方法" }
              ],
              prev: "g05-u1-l7-p2",
              next: "g05-u1-l8-p1"
            }
          ]
        },
        /* ============ g05.1.8 本章小结与习题（2 页） ============ */
        {
          id: "g05-u1-l8",
          title: "本章小结与习题",
          pages: [
            {
              id: "g05-u1-l8-p1",
              title: "本章小结：承重墙",
              pageKind: "explain",
              concept: "勾股定理全章串讲",
              formulas: [
                {
                  id: "f1",
                  latex: "a^2 + b^2 = c^2",
                  translation: "直角三角形两直角边的平方和等于斜边的平方"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "发现：方格纸上数格子——9+16=25，猜想 a²+b²=c²。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[58,30],[30,51]], color: "known", width: 3 },
                        { t: "right", v: [30,30], p: [58,30], q: [30,51], size: 6, color: "corrAngle" },
                        { t: "txt", p: [50,68], text: "9 + 16 = 25", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "证明：赵爽弦图 + 总统证法——面积两种算法，猜想变定理。",
                      shapes: [
                        { t: "poly", pts: [[44.4,10.8],[89.2,44.4],[55.6,89.2],[10.8,55.6]], color: "known", width: 2.5 },
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "target", width: 2 },
                        { t: "txt", p: [50,50], text: "c²", size: 13, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "逆定理：a²+b²=c² → 直角三角形——判定直角的新工具；HL 补上 g04 的拼图。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[58,30],[30,51]], color: "line", width: 2.5 },
                        { t: "right", v: [30,30], p: [58,30], q: [30,51], size: 6, color: "corrAngle" },
                        { t: "txt", p: [50,68], text: "a²+b²=c² → 直角", size: 13, bold: true },
                        { t: "txt", p: [50,80], text: "+ HL 判定", size: 12 }
                      ]
                    },
                    {
                      caption: "应用：距离公式——勾股定理长成了代数工具。",
                      shapes: [
                        { t: "seg", a: [10,15], b: [90,15], color: "line", width: 1.5 },
                        { t: "seg", a: [15,10], b: [15,90], color: "line", width: 1.5 },
                        { t: "seg", a: [25,35], b: [55,75], color: "target", width: 3 },
                        { t: "txt", p: [50,88], text: "d=√[(x₂−x₁)²+(y₂−y₁)²]", size: 12, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一句话串全章：数格子发现 → 弦图证明 → 逆定理判定 → 距离公式应用。",
                "枢纽地位：向上承接全等（SSS 证逆定理、HL 补判定），向下支撑圆、相似、解析几何。",
                "三个呼应：H1 弦图↔代数 2.2.2，H2 距离公式↔代数 ch06-u0-l2，H13 √2↔代数 0.1.3。",
                "记住一句话：勾股定理是几何的'承重墙'——后面的圆、相似、解析几何都压在它上面。"
              ],
              examples: [
                { text: "全章知识图谱", figure: "图表" }
              ],
              prev: "g05-u1-l7-p3",
              next: "g05-u1-l8-p2"
            },
            {
              id: "g05-u1-l8-p2",
              title: "本章习题：6 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "a^2 + b^2 = c^2",
                  translation: "用勾股定理及其逆定理解题"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "txt", p: [50,88], text: "点三元组，分进两篮", size: 14 }
                  ],
                  groups: [
                    { name: "是直角三角形", color: "corrA" },
                    { name: "不是直角三角形", color: "corrB" }
                  ],
                  items: [
                    { id: "q1", label: "3-4-5", group: 0, anchor: [20,70],
                      shape: { t: "poly", pts: [[8,78],[32,78],[8,58]], color: "corrA", width: 2.5 } },
                    { id: "q2", label: "5-12-13", group: 0, anchor: [60,70],
                      shape: { t: "poly", pts: [[48,78],[72,78],[48,58]], color: "corrA", width: 2.5 } },
                    { id: "q3", label: "2-3-4", group: 1, anchor: [20,42],
                      shape: { t: "poly", pts: [[8,50],[32,50],[8,30]], color: "corrB", width: 2.5 } },
                    { id: "q4", label: "6-8-10", group: 0, anchor: [60,42],
                      shape: { t: "poly", pts: [[48,50],[72,50],[48,30]], color: "corrA", width: 2.5 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "认图：4 个三元组分进两篮：是直角三角形 / 不是。",
                "1．直角边 9、12，求斜边。",
                "2．斜边 25、一条直角边 7，求另一条直角边。",
                "3．三边 8、15、17，是直角三角形吗？",
                "4．A(0,0)、B(3,4)，求 AB 的距离。",
                "5．梯子长 13 米，底端离墙 5 米，顶端高多少？",
                "6．边长 2 的正方形，对角线长？"
              ],
              examples: [
                { figure: "核对答案", text: "认图：3-4-5、5-12-13、6-8-10 是，2-3-4 不是；1．15；2．24；3．是（64+225=289）；4．5；5．12 米；6．2√2" }
              ,
                { figure: "错因解析", text: "认图：验 a²+b²=c²——3²+4²=5² 是，2²+3²=13≠16 不是。1．c=√(9²+12²)=√225=15——3-4-5 的 3 倍。2．b=√(25²−7²)=√576=24——7-24-25 勾股数。3．8²+15²=64+225=289=17²：是直角三角形（逆定理）。4．AB=√((3−0)²+(4−0)²)=5——距离公式，3-4-5 再现。5．高=√(13²−5²)=√144=12 米——5-12-13 勾股数。6．对角线=√(2²+2²)=2√2——正方形对角线=边长×√2。" }],
              prev: "g05-u1-l8-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
