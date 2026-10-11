/* ============================================================
 * 学习工具箱 · 数学 · 几何 g09：图形的相似
 *
 * 黄队（教育教学专家）生产：1 单元 / 8 课 / 29 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g09 章，图形的相似）
 * 教学设计：docs/math-geometry-pedagogy.md v1.1（跃升 5：全等→相似）
 * 参数手册：docs/math-geometry-params.md v1.3
 * 白队一屏预算评审：sandbox://workspace/geo-g08-g13-screen-budget-review.md（g09 20→29 页，按逐课页清单执行）
 *
 * 页构成：
 *   g09.1.1 比例线段            3 页  P1 step-play（线段按 1:2 分割，两段同分法）
 *                                     P2 讲解（成比例线段定义 + H15 互链代数 ch03）
 *                                     P3 讲解（黄金分割拓展，可折叠收起）
 *   g09.1.2 相似图形            4 页  P1 compare-toggle（全等套合 vs 相似套合，跃升 5-1）
 *                                     P2 step-play（照片 1×→2×→3× 放大，跃升 5-2）
 *                                     P3 compare-toggle（等比放大 vs 单向拉伸反例，跃升 5-3）
 *                                     P4 讲解（相似多边形定义：对应角相等、对应边成比例）
 *   g09.1.3 AA 判定             3 页  P1 step-play（两对角相等→边自动成比例→放大重合）
 *                                     P2 讲解（AA 定义 + 类比 ASA 全等 + 全等是 k=1 特例）
 *                                     P3 讲解（例题：算第三角再判相似）
 *   g09.1.4 SAS/SSS 判定        5 页  P1 step-play（SAS：两边成比例夹角相等，k=2 放大重合）
 *                                     P2 讲解（SAS 定义 + 反例：夹的不是对应角）
 *                                     P3 step-play（SSS：三边 2-3-4 vs 4-6-8）
 *                                     P4 讲解（SSS 定义 + 类比全等 SSS）
 *                                     P5 compare-toggle（全等判定表 vs 相似判定表，大对照）
 *   g09.1.5 相似三角形性质      5 页  P1 step-play（周长比：k=1/2/3，周长 9→18→27）
 *                                     P2 讲解（周长比=相似比，分配律推导）
 *                                     P3 ratio-slider（面积比：拖 k，面积按 k² 跳，H4 灵魂页）
 *                                     P4 讲解（面积比=相似比² 推导 + 别和周长比串）
 *                                     P5 讲解（H4 呼应：这就是 y=x² 在干的事 ↔ 代数 ch07）
 *   g09.1.6 应用：测高与测距    3 页  P1 step-play（影子测高：平行光线→AA 相似→列式求解）
 *                                     P2 讲解（建模四步 + 泰勒斯测金字塔故事）
 *                                     P3 讲解（例题：标杆测距）
 *   g09.1.7 位似                4 页  P1 step-play（以 O 为中心 k=2 放大，对应点连线交于 O）
 *                                     P2 讲解（位似定义 + 反例：平移的相似不是位似）
 *                                     P3 讲解（H18：坐标写法 (x,y)→(kx,ky)，g13 微型预演）
 *                                     P4 讲解（例题：画 k=2 的位似图形）
 *   g09.1.8 本章小结与习题      2 页  P1 小结（讲解页，全章串讲） P2 习题（tap-highlight 认图 + 5 道题）
 *
 * 呼应点落实：
 *   H4  g09.1.5 P3/P4/P5：面积比=相似比² ↔ 代数 ch07 7.1 二次函数 y=x²；
 *       P3 滑块页配小字"这就是 y=x² 在干的事"，P5 单开呼应页双向互链代数 7.1
 *   H15 g09.1.1 P2："a:b=c:d 就是两张照片的缩放比一样" ↔ 代数 ch03 分式
 *   H18 g09.1.7 P3：位似中心在原点时 (x,y)→(kx,ky) ↔ 代数 ch06，g13 微型预演
 *
 * 蓝队待实现（本章新增交互 1 种，其余复用已实现类型）：
 *   ratio-slider（相似缩放滑块）：k 滑块 0.5–3，两三角形始终相似锁定
 *     （角度恒相等、对应边比恒=k），面积读数按 k² 联动，配不变量徽章与
 *     "这就是 y=x² 在干的事"小字。params 见 g09-u1-l5-p3。
 *     用途：g09.1.5 P3（面积比灵魂页）。g09.1.4 的 SAS/SSS 用 step-play
 *     关键帧（k=2 放大重合）表达，未新增交互。
 *
 * 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 / corrA·corrB·corrC=对应组 /
 *   corrAngle=对应角 / line=普通线 / aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g09"] = {
  id: "g09",
  title: "图形的相似",
  units: [
    {
      id: "g09-u1",
      title: "相似",
      lessons: [
        /* ============ g09.1.1 比例线段（3 页） ============ */
        {
          id: "g09-u1-l1",
          title: "比例线段",
          pages: [
            {
              id: "g09-u1-l1-p1",
              title: "两条线段，同一个分法",
              concept: "成比例线段",
              formulas: [
                {
                  id: "f1",
                  latex: "a:b = c:d",
                  translation: "a 比 b 等于 c 比 d"
                },
                {
                  id: "f2",
                  latex: "\\frac{a}{b} = \\frac{c}{d}",
                  translation: "a 除以 b 等于 c 除以 d"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：线段 AB 被点 P 按 1:2 切开——短的是长的二分之一。",
                      shapes: [
                        { t: "seg", a: [10,35], b: [90,35], color: "line", width: 3 },
                        { t: "pt", p: [36.7,35], label: "P", color: "known" },
                        { t: "txt", p: [8,42], text: "A", size: 13 },
                        { t: "txt", p: [92,42], text: "B", size: 13 },
                        { t: "txt", p: [23,26], text: "1 份", size: 12, color: "known" },
                        { t: "txt", p: [63,26], text: "2 份", size: 12, color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步：另一条线段 CD，也按 1:2 切开。",
                      shapes: [
                        { t: "seg", a: [10,35], b: [90,35], color: "line", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [10,62], b: [90,62], color: "line", width: 3 },
                        { t: "pt", p: [36.7,62], label: "Q", color: "known" },
                        { t: "txt", p: [8,69], text: "C", size: 13 },
                        { t: "txt", p: [92,69], text: "D", size: 13 },
                        { t: "txt", p: [23,53], text: "1 份", size: 12, color: "known" },
                        { t: "txt", p: [63,53], text: "2 份", size: 12, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：两条线段的“分法“一样——a:b = c:d，这就叫成比例线段。",
                      shapes: [
                        { t: "seg", a: [10,35], b: [90,35], color: "known", width: 2.5 },
                        { t: "pt", p: [36.7,35], color: "known" },
                        { t: "seg", a: [10,62], b: [90,62], color: "known", width: 2.5 },
                        { t: "pt", p: [36.7,62], color: "known" },
                        { t: "txt", p: [50,82], text: "a : b = c : d = 1 : 2", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一条线段按 1:2 切开，另一条也按 1:2 切开——切法一样，就是成比例。",
                "a:b = c:d：四个数里，前两个的比等于后两个的比。",
                "照片放大就是这回事：长和宽都按同一个比变，人脸才不变形。"
              ],
              examples: [
                { text: "照片放大：长宽按同一比例变", figure: "交互" },
                { text: "地图比例尺：图上 1cm = 实际 1km", figure: "实物" }
              ],
              prev: null,
              next: "g09-u1-l1-p2"
            },
            {
              id: "g09-u1-l1-p2",
              title: "a:b=c:d：比例线段",
              pageKind: "explain",
              concept: "成比例线段的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "a:b = c:d",
                  translation: "a 比 b 等于 c 比 d"
                },
                {
                  id: "f2",
                  latex: "\\frac{a}{b} = \\frac{c}{d}",
                  translation: "a 除以 b 等于 c 除以 d"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：两条线段都按 1:2 切——分法相同，就是成比例线段。",
                      shapes: [
                        { t: "seg", a: [10,35], b: [90,35], color: "known", width: 2.5 },
                        { t: "pt", p: [36.7,35], color: "known" },
                        { t: "txt", p: [23,26], text: "2", size: 12, color: "known" },
                        { t: "txt", p: [63,26], text: "4", size: 12, color: "known" },
                        { t: "seg", a: [10,62], b: [90,62], color: "target", width: 2.5 },
                        { t: "pt", p: [36.7,62], color: "target" },
                        { t: "txt", p: [23,53], text: "3", size: 12, color: "target" },
                        { t: "txt", p: [63,53], text: "6", size: 12, color: "target" },
                        { t: "txt", p: [50,82], text: "2:4 = 3:6", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你刚看到两条线段都按 1:2 切——切法一样，就是成比例线段。",
                "成比例线段，就是“分法相同”的线段：a:b = c:d，读作 a 比 b 等于 c 比 d。",
                "生活例：同一张底片洗出的 1 寸和 6 寸照片，长宽比相同。图形例：2:4 = 3:6，这四条线段成比例。",
                "反例：一条按 1:2 切、另一条按 1:3 切——分法不同，不成比例。",
                "⚠️ 别搞混：a:b = c:d 写成分数是 a/b = c/d，四个数谁除以谁不能乱（a 除以 b，不能写成 b 除以 a）。",
                "记住一句话：比例是“分法相同”；代数 ch03 的分式讲的也是它（H15）——“a:b=c:d 就是两张照片的缩放比一样”。"
              ],
              examples: [
                { text: "照片缩放：缩放比一样才不变形", figure: "实物" }
              ],
              prev: "g09-u1-l1-p1",
              next: "g09-u1-l1-p3"
            },
            {
              id: "g09-u1-l1-p3",
              title: "细心的你发现了吗：黄金分割",
              pageKind: "explain",
              concept: "黄金分割",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{\\text{长段}}{\\text{全长}} = \\frac{\\text{短段}}{\\text{长段}} \\approx 0.618",
                  translation: "长段比全长等于短段比长段，约等于 0.618"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：全长按 0.618 切——长段:全长 = 短段:长段，这就是黄金分割。（本页可折叠收起）",
                      shapes: [
                        { t: "seg", a: [10,50], b: [90,50], color: "line", width: 3 },
                        { t: "pt", p: [59.4,50], label: "G", color: "target" },
                        { t: "txt", p: [35,41], text: "长段", size: 12, color: "target" },
                        { t: "txt", p: [75,41], text: "短段", size: 12 },
                        { t: "txt", p: [50,68], text: "0.618", size: 15, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "把线段分成两段：长段与全长的比，等于短段与长段的比——这个比约 0.618，叫黄金分割。",
                "生活例：人的肚脐大致把身高按黄金分割；五角星的边也藏着它。反例：随手一分（比如 1:1 对半）不是黄金分割。",
                "记住一句话：黄金分割是“最耐看的切法”——大自然和建筑都在偷偷用它。"
              ],
              examples: [
                { text: "五角星、肚脐与身高", figure: "实物" }
              ],
              prev: "g09-u1-l1-p2",
              next: "g09-u1-l2-p1"
            }
          ]
        },
        /* ============ g09.1.2 相似图形（4 页） ============ */
        {
          id: "g09-u1-l2",
          title: "相似图形",
          pages: [
            {
              id: "g09-u1-l2-p1",
              title: "全等能套上，相似套不上",
              concept: "全等与相似的套合区别",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{全等} \\Rightarrow \\text{完全重合}",
                  translation: "全等就是能完全重合"
                },
                {
                  id: "f2",
                  latex: "\\text{相似} = \\text{形状相同，大小可不同}",
                  translation: "相似是形状相同、大小可以不同"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "全等的拼图",
                      caption: "两个三角形完全一样：小图往大图上一放，严丝合缝——这叫全等，你在 g04 玩过。",
                      shapes: [
                        { t: "poly", pts: [[20,35],[60,35],[40,65]], color: "line", width: 3 },
                        { t: "poly", pts: [[20,35],[60,35],[40,65]], color: "known", width: 2.5, dash: "5,4" },
                        { t: "txt", p: [50,80], text: "严丝合缝", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      label: "相似的拼图",
                      caption: "形状一样、但大一圈：小图放上去，轮廓贴合却盖不住——大小不一样，这叫相似。",
                      shapes: [
                        { t: "poly", pts: [[15,30],[75,30],[45,75]], color: "line", width: 3 },
                        { t: "poly", pts: [[35,42],[55,42],[45,57]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,86], text: "轮廓贴合，盖不住", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "全等的能严丝合缝套上；相似的轮廓贴合、但大小不一样，套不进。",
                "切换两个视图：看“能重合”和“只能贴合”的区别——没变的是形状，变的是大小。",
                "全等是 g04 的老朋友；相似是今天的新朋友——“像”而不“同”。"
              ],
              examples: [
                { text: "两块拼图：一块严丝合缝，一块大一圈", figure: "交互" }
              ],
              prev: "g09-u1-l1-p3",
              next: "g09-u1-l2-p2"
            },
            {
              id: "g09-u1-l2-p2",
              title: "照片放大：人脸不变形",
              concept: "相似图形的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{新边长} = 2 \\times \\text{原边长}",
                  translation: "放大 2 倍时，新图的每条边都是原图的 2 倍"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：原照片——长和宽记为 1 份。",
                      shapes: [
                        { t: "poly", pts: [[35,40],[65,40],[65,70],[35,70]], color: "line", width: 3 },
                        { t: "circle", c: [50,58], r: 6, color: "line", width: 2 },
                        { t: "txt", p: [50,80], text: "1×", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：长和宽都乘以 2——人脸没变形。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[80,80],[20,80]], color: "known", width: 3 },
                        { t: "circle", c: [50,58], r: 12, color: "known", width: 2 },
                        { t: "txt", p: [50,88], text: "2×：没变的是形状", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：再乘以 3——还是没变形。没变的是形状，变的是大小。",
                      shapes: [
                        { t: "poly", pts: [[8,22],[92,22],[92,82],[8,82]], color: "target", width: 3 },
                        { t: "circle", c: [50,55], r: 16, color: "target", width: 2 },
                        { t: "txt", p: [50,90], text: "3×：形状一直没变", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "没变的是：形状；变的是：大小——照片从 1× 放到 3×，人脸一直没变形。",
                "关键：每个方向都按同一个比变，所以不变形。",
                "如果只拉宽不拉高呢？下一页试试。"
              ],
              examples: [
                { text: "照片放大：1×→3× 人脸不变形", figure: "交互" }
              ],
              prev: "g09-u1-l2-p1",
              next: "g09-u1-l2-p3"
            },
            {
              id: "g09-u1-l2-p3",
              title: "只拉宽：还像吗？",
              concept: "相似的反例",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{相似要求：所有方向按同一比例变}",
                  translation: "相似要求所有方向都按同一个比例变化"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "等比放大",
                      caption: "长和宽都乘以 2：人脸没变形——相似。",
                      shapes: [
                        { t: "poly", pts: [[20,35],[80,35],[80,75],[20,75]], color: "known", width: 3 },
                        { t: "circle", c: [50,58], r: 12, color: "known", width: 2 },
                        { t: "txt", p: [50,86], text: "像！", size: 15, bold: true, color: "known" }
                      ]
                    },
                    {
                      label: "只拉宽",
                      caption: "只把宽拉长：人脸变胖了——不像了，不相似。",
                      shapes: [
                        { t: "poly", pts: [[8,45],[92,45],[92,75],[8,75]], color: "target", width: 3 },
                        { t: "circle", c: [50,62], r: 12, color: "target", width: 2 },
                        { t: "txt", p: [50,86], text: "不像了！", size: 15, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "等比放大：每个方向同一个比——像，这就是相似。",
                "只拉宽：宽变了、高没变——人脸变胖，不像了，不相似。",
                "所以相似要求：所有方向按同一比例变，缺一个方向都不行。"
              ],
              examples: [
                { text: "手机照片只拉宽：人脸变胖", figure: "实物" }
              ],
              prev: "g09-u1-l2-p2",
              next: "g09-u1-l2-p4"
            },
            {
              id: "g09-u1-l2-p4",
              title: "相似：形状相同，大小成比例",
              pageKind: "explain",
              concept: "相似多边形的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle A = \\angle A', \\angle B = \\angle B', \\angle C = \\angle C'",
                  translation: "两个三角形的对应角分别相等"
                },
                {
                  id: "f2",
                  latex: "\\frac{a}{a'} = \\frac{b}{b'} = \\frac{c}{c'}",
                  translation: "对应边的比都相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：对应角画同色弧线，对应边画同色描边——这就是相似多边形。",
                      shapes: [
                        { t: "poly", pts: [[12,35],[42,35],[27,62]], color: "corrA", width: 3 },
                        { t: "arc", v: [12,35], a1: 0, a2: 55, r: 8, group: 1, color: "corrAngle" },
                        { t: "arc", v: [42,35], a1: 125, a2: 180, r: 8, group: 2, color: "corrAngle" },
                        { t: "poly", pts: [[58,33],[88,33],[73,63]], color: "corrB", width: 3 },
                        { t: "arc", v: [58,33], a1: 0, a2: 55, r: 8, group: 1, color: "corrAngle" },
                        { t: "arc", v: [88,33], a1: 125, a2: 180, r: 8, group: 2, color: "corrAngle" },
                        { t: "txt", p: [50,80], text: "对应角相等，对应边成比例", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？照片放大到 3 倍人脸都没变形——形状一直没变，这就是相似。",
                "相似多边形，就是“形状相同、大小成比例”的图形：对应角相等，对应边成比例。",
                "生活例：同一张底片洗出的 1 寸和 6 寸照片。图形例：两个三角形，三对角分别相等，三组对应边的比都相等。",
                "反例：正方形和长方形——四个角都是 90 度，但边不成比例，不相似。",
                "⚠️ 别搞混：对应角相等还不够，边也要成比例——正方形 vs 长方形就是教训。",
                "记住一句话：全等要重合，相似只同形。"
              ],
              examples: [
                { text: "1 寸和 6 寸的同一张照片", figure: "实物" }
              ],
              prev: "g09-u1-l2-p3",
              next: "g09-u1-l3-p1"
            }
          ]
        },
        /* ============ g09.1.3 相似三角形的判定（一）：AA（3 页） ============ */
        {
          id: "g09-u1-l3",
          title: "AA 判定",
          pages: [
            {
              id: "g09-u1-l3-p1",
              title: "两个角相等，形状就锁死",
              concept: "AA 判定的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle A = \\angle A' = 50\\text{度}, \\angle B = \\angle B' = 60\\text{度}",
                  translation: "两对角分别相等，都是 50 度和 60 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：两个三角形，两对角分别相等（50 度、60 度）。",
                      shapes: [
                        { t: "poly", pts: [[15,62],[45,62],[33,32]], color: "corrA", width: 3 },
                        { t: "arc", v: [15,62], a1: 0, a2: 62, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45,62], a1: 118, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "txt", p: [15,74], text: "50°", size: 12 },
                        { t: "txt", p: [45,74], text: "60°", size: 12 },
                        { t: "poly", pts: [[58,64],[92,64],[77,28]], color: "corrB", width: 3 },
                        { t: "arc", v: [58,64], a1: 0, a2: 62, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [92,64], a1: 118, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "txt", p: [58,76], text: "50°", size: 12 },
                        { t: "txt", p: [92,76], text: "60°", size: 12 }
                      ]
                    },
                    {
                      caption: "第 2 步：量一量边——2:4 = 3:6，边自动成比例！",
                      shapes: [
                        { t: "poly", pts: [[15,62],[45,62],[33,32]], color: "corrA", width: 2.5 },
                        { t: "txt", p: [30,70], text: "2", size: 13, bold: true },
                        { t: "txt", p: [24,46], text: "3", size: 13, bold: true },
                        { t: "poly", pts: [[58,64],[92,64],[77,28]], color: "corrB", width: 2.5 },
                        { t: "txt", p: [75,72], text: "4", size: 13, bold: true },
                        { t: "txt", p: [68,46], text: "6", size: 13, bold: true },
                        { t: "txt", p: [50,86], text: "2:4 = 3:6", size: 15, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：把小的放大 2 倍盖到大的上面——严丝合缝，相似！",
                      shapes: [
                        { t: "poly", pts: [[58,64],[92,64],[77,28]], color: "corrB", width: 3 },
                        { t: "poly", pts: [[58,64],[92,64],[77,28]], color: "corrA", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,84], text: "两角相等，形状锁死", size: 14, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "两对角相等，边就“自动”成比例——第三个角不用量，内角和 180 度（g03 玩过）说了算。",
                "没变的是：形状。只要两对角相等，两个三角形永远相似。",
                "这就是 AA 判定：两角对应相等 → 相似。"
              ],
              examples: [
                { text: "两对角相等，边自动成比例", figure: "交互" }
              ],
              prev: "g09-u1-l2-p4",
              next: "g09-u1-l3-p2"
            },
            {
              id: "g09-u1-l3-p2",
              title: "AA 判定：两角相等就相似",
              pageKind: "explain",
              concept: "AA 判定定理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle A = \\angle A', \\angle B = \\angle B' \\Rightarrow \\text{两三角形相似}",
                  translation: "两对角分别相等，则两个三角形相似"
                },
                {
                  id: "f2",
                  latex: "k = 1 \\Rightarrow \\text{相似退化为全等}",
                  translation: "相似比为 1 时，相似就退化成全等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：AA 判定——两对角相等，相似；k=1 时就是全等。",
                      shapes: [
                        { t: "poly", pts: [[15,55],[45,55],[30,28]], color: "corrA", width: 3 },
                        { t: "arc", v: [15,55], a1: 0, a2: 55, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [45,55], a1: 125, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "poly", pts: [[60,57],[90,57],[75,30]], color: "corrB", width: 3 },
                        { t: "arc", v: [60,57], a1: 0, a2: 55, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [90,57], a1: 125, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "txt", p: [50,80], text: "AA：两角对应相等 → 相似", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页两个三角形只有两对角相等，边就自动成比例了——这就是 AA 判定。",
                "AA 判定：两个三角形的两对角分别相等，这两个三角形就相似。",
                "生活例：太阳光测影子——人和旗杆都垂直地面，太阳光线平行，两个直角三角形有两对角相等，所以相似。",
                "图形例：50 度、60 度的两个三角形一定相似。反例：只有一对角相等（都是 50 度），另一对角不同——不相似。",
                "⚠️ 别搞混：AA 是相似判定，它的全等亲戚叫 ASA（两角夹一边）；全等就是相似比 k=1 的特例。",
                "记住一句话：两角定相似，全等是 k=1 的特例。"
              ],
              examples: [
                { text: "太阳光测影子：两个直角三角形相似", figure: "实物" }
              ],
              prev: "g09-u1-l3-p1",
              next: "g09-u1-l3-p3"
            },
            {
              id: "g09-u1-l3-p3",
              title: "练一练：用 AA 判相似",
              pageKind: "explain",
              concept: "AA 判定的例题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle C = 180\\text{度} - 40\\text{度} - 75\\text{度} = 65\\text{度}",
                  translation: "角 C 等于 180 度减 40 度减 75 度，得 65 度"
                },
                {
                  id: "f2",
                  latex: "\\angle N = 180\\text{度} - 40\\text{度} - 65\\text{度} = 75\\text{度}",
                  translation: "角 N 等于 180 度减 40 度减 65 度，得 75 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：先算第三个角，再看有没有两对角相等。",
                      shapes: [
                        { t: "poly", pts: [[15,62],[45,62],[33,32]], color: "corrA", width: 3 },
                        { t: "txt", p: [30,72], text: "40°+75°", size: 12 },
                        { t: "txt", p: [30,22], text: "∠C=65°", size: 12, bold: true, color: "corrA" },
                        { t: "poly", pts: [[58,64],[92,64],[77,28]], color: "corrB", width: 3 },
                        { t: "txt", p: [75,74], text: "40°+65°", size: 12 },
                        { t: "txt", p: [75,18], text: "∠N=75°", size: 12, bold: true, color: "corrB" },
                        { t: "txt", p: [50,86], text: "两对角相等 → 相似", size: 13, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "题目：△ABC 中 ∠A=40 度、∠B=75 度；△MNP 中 ∠M=40 度、∠P=65 度。相似吗？",
                "先算第三个角：三角形内角和 180 度（g03 玩过）——∠C=65 度，∠N=75 度。",
                "∠A 对 ∠M（40 度），∠B 对 ∠N（75 度）——两对角分别相等 → 相似。",
                "⚠️ 注意对应：角要“对上号”，∠B=75 度对的是 ∠N=75 度，别写成对 ∠P。"
              ],
              examples: [
                { text: "先算第三角，再判 AA", figure: "图表" }
              ],
              prev: "g09-u1-l3-p2",
              next: "g09-u1-l4-p1"
            }
          ]
        },
        /* ============ g09.1.4 判定（二）：SAS/SSS（5 页，白队高风险必拆） ============ */
        {
          id: "g09-u1-l4",
          title: "SAS/SSS 判定",
          pages: [
            {
              id: "g09-u1-l4-p1",
              title: "SAS：两边成比例，夹角相等",
              concept: "SAS 相似判定的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{AB}{A'B'} = \\frac{AC}{A'C'} = \\frac{1}{2}, \\angle A = \\angle A' = 60\\text{度}",
                  translation: "两组对应边的比都是 1 比 2，夹角都是 60 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：两个三角形——小边 2、3，大边 4、6，夹角都是 60 度。",
                      shapes: [
                        { t: "poly", pts: [[12,60],[42,60],[27,30]], color: "corrA", width: 3 },
                        { t: "arc", v: [12,60], a1: 0, a2: 60, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [27,68], text: "2", size: 12, bold: true },
                        { t: "txt", p: [18,44], text: "3", size: 12, bold: true },
                        { t: "txt", p: [12,74], text: "60°", size: 12 },
                        { t: "poly", pts: [[55,62],[90,62],[72,28]], color: "corrB", width: 3 },
                        { t: "arc", v: [55,62], a1: 0, a2: 60, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [72,70], text: "4", size: 12, bold: true },
                        { t: "txt", p: [62,44], text: "6", size: 12, bold: true },
                        { t: "txt", p: [55,76], text: "60°", size: 12 }
                      ]
                    },
                    {
                      caption: "第 2 步：2:4 = 3:6，两组边成比例；60 度是这两条边的夹角，位置不能错。",
                      shapes: [
                        { t: "poly", pts: [[12,60],[42,60],[27,30]], color: "corrA", width: 3 },
                        { t: "arc", v: [12,60], a1: 0, a2: 60, r: 12, group: 1, color: "target" },
                        { t: "poly", pts: [[55,62],[90,62],[72,28]], color: "corrB", width: 3 },
                        { t: "arc", v: [55,62], a1: 0, a2: 60, r: 12, group: 1, color: "target" },
                        { t: "txt", p: [50,84], text: "2:4 = 3:6，夹角 60°", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：把小的放大 2 倍盖到大的上面——严丝合缝，相似！",
                      shapes: [
                        { t: "poly", pts: [[55,62],[90,62],[72,28]], color: "corrB", width: 3 },
                        { t: "poly", pts: [[55,62],[90,62],[72,28]], color: "corrA", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,84], text: "SAS：两边成比例，夹角相等 → 相似", size: 13, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "两组边 2:4 和 3:6——比都是 1:2，成比例。",
                "夹在中间的角都是 60 度——必须是“夹角”，两边中间的那个角，位置不能错。",
                "小三角形放大 2 倍盖住大的：形状一样——这就是 SAS 判定。"
              ],
              examples: [
                { text: "衣架两边按比例加长，夹角不变", figure: "实物" }
              ],
              prev: "g09-u1-l3-p3",
              next: "g09-u1-l4-p2"
            },
            {
              id: "g09-u1-l4-p2",
              title: "SAS 判定：成比例的两边夹着相等的角",
              pageKind: "explain",
              concept: "SAS 判定定理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{AB}{A'B'} = \\frac{AC}{A'C'}, \\angle A = \\angle A' \\Rightarrow \\text{两三角形相似}",
                  translation: "两边成比例且夹角相等，则两个三角形相似"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：SAS——两边成比例，夹住的角相等。",
                      shapes: [
                        { t: "poly", pts: [[15,60],[50,60],[32,30]], color: "corrA", width: 3 },
                        { t: "arc", v: [15,60], a1: 0, a2: 60, r: 10, group: 1, color: "corrAngle" },
                        { t: "poly", pts: [[58,62],[93,62],[75,32]], color: "corrB", width: 3 },
                        { t: "arc", v: [58,62], a1: 0, a2: 60, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,82], text: "SAS：边成比例 + 夹角相等", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页两组边 2:4=3:6，夹角都是 60 度——放大 2 倍就重合了。",
                "SAS 判定：两边成比例，并且这两边的夹角相等，这两个三角形就相似。",
                "生活例：做衣架——两边按比例加长，夹角不变，衣架形状不变。",
                "图形例：边 2、3 夹 60 度角的三角形，与边 4、6 夹 60 度角的三角形相似。",
                "反例：两组边成比例，但相等的角不是“夹”在中间的——不一定相似。",
                "⚠️ 别搞混：必须是“夹角”——两边中间的那个角；而且相等的角要对应（∠A 对 ∠A′）。",
                "记住一句话：成比例的两边，夹着相等的角。"
              ],
              examples: [
                { text: "全等的 SAS 亲戚：相等换成成比例", figure: "图表" }
              ],
              prev: "g09-u1-l4-p1",
              next: "g09-u1-l4-p3"
            },
            {
              id: "g09-u1-l4-p3",
              title: "SSS：三边成比例",
              concept: "SSS 相似判定的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8} = \\frac{1}{2}",
                  translation: "三组对应边的比都是 1 比 2"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：一个三角形，三边是 2、3、4。",
                      shapes: [
                        { t: "poly", pts: [[15,62],[47,62],[31,34]], color: "corrA", width: 3 },
                        { t: "txt", p: [31,70], text: "2", size: 12, bold: true },
                        { t: "txt", p: [21,48], text: "3", size: 12, bold: true },
                        { t: "txt", p: [40,48], text: "4", size: 12, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：另一个三角形，三边是 4、6、8——2:4=3:6=4:8。",
                      shapes: [
                        { t: "poly", pts: [[15,62],[47,62],[31,34]], color: "corrA", width: 2 },
                        { t: "poly", pts: [[58,64],[90,64],[74,36]], color: "corrB", width: 3 },
                        { t: "txt", p: [74,72], text: "4", size: 12, bold: true },
                        { t: "txt", p: [64,50], text: "6", size: 12, bold: true },
                        { t: "txt", p: [83,50], text: "8", size: 12, bold: true },
                        { t: "txt", p: [50,84], text: "2:4 = 3:6 = 4:8", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：小的放大 2 倍盖到大的上面——严丝合缝，相似！",
                      shapes: [
                        { t: "poly", pts: [[58,64],[90,64],[74,36]], color: "corrB", width: 3 },
                        { t: "poly", pts: [[58,64],[90,64],[74,36]], color: "corrA", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,84], text: "SSS：三边成比例 → 相似", size: 14, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三组边的比都是 1:2——三边成比例。",
                "角不用量：三边定了，形状就定了（g04 的 SSS 全等是亲戚，那里是“三边相等”）。",
                "这就是 SSS 判定：三边成比例 → 相似。"
              ],
              examples: [
                { text: "按图纸比例放大零件", figure: "实物" }
              ],
              prev: "g09-u1-l4-p2",
              next: "g09-u1-l4-p4"
            },
            {
              id: "g09-u1-l4-p4",
              title: "SSS 判定：三边同比例",
              pageKind: "explain",
              concept: "SSS 判定定理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{a}{a'} = \\frac{b}{b'} = \\frac{c}{c'} \\Rightarrow \\text{两三角形相似}",
                  translation: "三组对应边的比都相等，则两个三角形相似"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：SSS——三边成比例，角都不用看。",
                      shapes: [
                        { t: "poly", pts: [[12,60],[44,60],[28,32]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[56,62],[90,62],[73,34]], color: "corrB", width: 3 },
                        { t: "txt", p: [50,82], text: "SSS：三边成比例 → 相似", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？三边 2、3、4 和 4、6、8——比都是 1:2，放大 2 倍就重合了。",
                "SSS 判定：三边成比例，这两个三角形就相似。",
                "生活例：按图纸 1:2 放大做零件，三条边都乘以 2，形状不变。",
                "图形例：三边 3、4、5 的三角形与三边 6、8、10 的三角形相似。",
                "反例：三边 2、3、4 与 4、6、9——4/9 不是 1/2，比不全等，不相似。",
                "⚠️ 别搞混：是“三组比都相等”，一组掉队就不行（4/9 那个就是掉队的）。",
                "记住一句话：三边同比例，形状必相同。"
              ],
              examples: [
                { text: "3-4-5 与 6-8-10：经典相似对", figure: "图表" }
              ],
              prev: "g09-u1-l4-p3",
              next: "g09-u1-l4-p5"
            },
            {
              id: "g09-u1-l4-p5",
              title: "全等判定 vs 相似判定",
              concept: "判定对照表",
              formulas: [
                {
                  id: "f1",
                  latex: "k = 1 \\Rightarrow \\text{相似退化为全等}",
                  translation: "相似比为 1 时，相似就退化成全等"
                },
                {
                  id: "f2",
                  latex: "\\text{全等} \\subset \\text{相似}",
                  translation: "全等是相似的特例"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  layout: "stack",
                  views: [
                    {
                      label: "全等四判定（g04）",
                      caption: "全等：SSS / SAS / ASA / AAS（+ 直角三角形 HL）——对应边相等、对应角相等。",
                      shapes: [
                        { t: "txt", p: [50,78], text: "SSS：三边相等", size: 13 },
                        { t: "txt", p: [50,64], text: "SAS：两边夹角相等", size: 13 },
                        { t: "txt", p: [50,50], text: "ASA / AAS：两角一边相等", size: 13 },
                        { t: "txt", p: [50,36], text: "HL：直角三角形专用", size: 13 },
                        { t: "txt", p: [50,20], text: "关键词：相等", size: 13, bold: true, color: "known" }
                      ]
                    },
                    {
                      label: "相似三判定（g09）",
                      caption: "相似：SSS / SAS / AA——对应边成比例、对应角相等。全等是相似比 k=1 的特例。",
                      shapes: [
                        { t: "txt", p: [50,78], text: "SSS：三边成比例", size: 13 },
                        { t: "txt", p: [50,64], text: "SAS：两边成比例，夹角相等", size: 13 },
                        { t: "txt", p: [50,50], text: "AA：两角对应相等", size: 13 },
                        { t: "txt", p: [50,36], text: "（HL 没有相似版，直角用 AA）", size: 12 },
                        { t: "txt", p: [50,20], text: "关键词：成比例", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "对照看：SSS 对 SSS，SAS 对 SAS，ASA/AAS 对 AA——“相等”换成“成比例”。",
                "HL 没有相似版：直角三角形判相似直接用 AA（两个直角本来就相等）。",
                "记住：全等是相似大家族里 k=1 的那个成员。"
              ],
              examples: [
                { text: "一张表看清全等与相似的关系", figure: "图表" }
              ],
              prev: "g09-u1-l4-p4",
              next: "g09-u1-l5-p1"
            }
          ]
        },
        /* ============ g09.1.5 相似三角形的性质（5 页：周长比铺垫→面积比重点→H4 呼应） ============ */
        {
          id: "g09-u1-l5",
          title: "相似三角形的性质",
          pages: [
            {
              id: "g09-u1-l5-p1",
              title: "周长跟着边一起变",
              concept: "周长比=相似比",
              formulas: [
                {
                  id: "f1",
                  latex: "C_1 : C_2 = 9 : 18 = 1 : 2",
                  translation: "两个三角形的周长比是 9 比 18，等于相似比 1 比 2"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：三边 2、3、4，周长 9。",
                      shapes: [
                        { t: "poly", pts: [[20,62],[48,62],[36,36]], color: "corrA", width: 3 },
                        { t: "txt", p: [34,70], text: "2", size: 12 },
                        { t: "txt", p: [26,50], text: "3", size: 12 },
                        { t: "txt", p: [43,50], text: "4", size: 12 },
                        { t: "txt", p: [50,82], text: "周长 = 9", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：相似比 k=2——三边 4、6、8，周长 18 = 9×2。",
                      shapes: [
                        { t: "poly", pts: [[15,64],[55,64],[38,28]], color: "corrB", width: 3 },
                        { t: "txt", p: [35,72], text: "4", size: 12 },
                        { t: "txt", p: [24,48], text: "6", size: 12 },
                        { t: "txt", p: [47,48], text: "8", size: 12 },
                        { t: "txt", p: [50,84], text: "周长 = 18 = 9 × 2", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：k=3——三边 6、9、12，周长 27 = 9×3。周长比永远等于相似比。",
                      shapes: [
                        { t: "poly", pts: [[12,66],[62,66],[40,24]], color: "corrB", width: 3 },
                        { t: "txt", p: [37,74], text: "6", size: 12 },
                        { t: "txt", p: [24,46], text: "9", size: 12 },
                        { t: "txt", p: [52,46], text: "12", size: 12 },
                        { t: "txt", p: [50,86], text: "周长 = 27 = 9 × 3", size: 14, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "边都乘以 2，周长也乘以 2；边乘以 3，周长也乘以 3。",
                "为什么？周长是三条边的和：ka + kb + kc = k(a + b + c)——分配律，代数 0.1.4 玩过。",
                "没变的是：周长比永远等于相似比 k。"
              ],
              examples: [
                { text: "窗框放大 2 倍，框条总长也是 2 倍", figure: "实物" }
              ],
              prev: "g09-u1-l4-p5",
              next: "g09-u1-l5-p2"
            },
            {
              id: "g09-u1-l5-p2",
              title: "周长比 = 相似比",
              pageKind: "explain",
              concept: "周长比定理",
              formulas: [
                {
                  id: "f1",
                  latex: "C' = ka + kb + kc = kC",
                  translation: "放大后三角形的周长等于 k 倍的原周长"
                },
                {
                  id: "f2",
                  latex: "\\frac{C_1}{C_2} = k",
                  translation: "周长比等于相似比 k"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：周长是三条边的和——每条边都乘以 k，和也乘以 k。",
                      shapes: [
                        { t: "poly", pts: [[15,60],[48,60],[33,32]], color: "corrA", width: 2.5 },
                        { t: "poly", pts: [[55,62],[90,62],[73,34]], color: "corrB", width: 2.5 },
                        { t: "txt", p: [50,82], text: "C₁ : C₂ = k", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？边变成 2 倍，周长 9 变成 18——周长跟着边一起变。",
                "相似三角形的周长比等于相似比：对应边 a′=ka、b′=kb、c′=kc，周长 C′=ka+kb+kc=k(a+b+c)=kC。",
                "生活例：按 2 倍放大做窗框，框条总长度也是 2 倍。",
                "图形例：相似比 2:3 的两三角形，周长比也是 2:3。",
                "反例：面积比不是 k——那是下一页的主角，别提前剧透。",
                "⚠️ 别搞混：周长是“一维”的量，跟着边走，所以比就是 k；面积是“二维”的量，下一页见分晓。",
                "记住一句话：周长是一维的量，比就是 k。"
              ],
              examples: [
                { text: "相似比 2:3，周长比也是 2:3", figure: "图表" }
              ],
              prev: "g09-u1-l5-p1",
              next: "g09-u1-l5-p3"
            },
            {
              id: "g09-u1-l5-p3",
              title: "拖 k，看面积按 k² 跳",
              concept: "面积比=相似比²（H4 灵魂页）",
              formulas: [
                {
                  id: "f1",
                  latex: "S_1 : S_2 = 1 : k^2",
                  translation: "面积比等于 1 比 k 的平方"
                },
                {
                  id: "f2",
                  latex: "k = 2 \\Rightarrow S_2 = 4S_1",
                  translation: "相似比为 2 时，大三角形面积是小的 4 倍"
                }
              ],
              interaction: {
                type: "ratio-slider",
                params: {
                  kMin: 0.5, kMax: 3, kStep: 0.25, kInit: 1,
                  lockRatio: true,
                  showAreas: true,
                  badge: "没变的是：形状；面积按 k² 跳",
                  note: "这就是 y=x² 在干的事"
                }
              },
              auxInteraction: null,
              hints: [
                "拖动滑块 k：边变成 k 倍，面积变成 k² 倍——看面积读数怎么跳。",
                "k=2 时面积变 4 倍，k=3 时变 9 倍——不是 2 倍、3 倍！",
                "旁边小字：这就是 y=x² 在干的事（代数 ch07 7.1 见过）。"
              ],
              examples: [
                { text: "照片边长×2，面积×4", figure: "交互" }
              ],
              prev: "g09-u1-l5-p2",
              next: "g09-u1-l5-p4"
            },
            {
              id: "g09-u1-l5-p4",
              title: "面积比 = 相似比的平方",
              pageKind: "explain",
              concept: "面积比定理",
              formulas: [
                {
                  id: "f1",
                  latex: "S = \\frac{1}{2}ah",
                  translation: "三角形面积等于底乘高除以 2"
                },
                {
                  id: "f2",
                  latex: "S' = \\frac{1}{2}(ka)(kh) = k^2S",
                  translation: "放大后面积等于 k 的平方乘原面积"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：底变成 k 倍，高也变成 k 倍——面积变成 k² 倍。",
                      shapes: [
                        { t: "poly", pts: [[12,55],[42,55],[27,30]], color: "corrA", width: 2.5 },
                        { t: "seg", a: [27,55], b: [27,30], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [27,66], text: "a", size: 12 },
                        { t: "txt", p: [34,44], text: "h", size: 12 },
                        { t: "poly", pts: [[55,58],[90,58],[72,28]], color: "corrB", width: 2.5 },
                        { t: "seg", a: [72,58], b: [72,28], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [72,68], text: "ka", size: 12 },
                        { t: "txt", p: [79,44], text: "kh", size: 12 },
                        { t: "txt", p: [50,82], text: "S₁ : S₂ = 1 : k²", size: 14, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你拖滑块时 k=2 面积变 4 倍、k=3 变 9 倍——现在看它为什么。",
                "底 a 变成 ka，对应高之比也等于相似比，高 h 变成 kh——面积 S′=½·ka·kh=k²·½ah=k²S。",
                "生活例：照片从 1 寸放大到 6 寸，边长变 4 倍，相纸面积变 16 倍。",
                "图形例：相似比 1:2 的两三角形，面积比 1:4。",
                "反例：把面积比说成 k——“周长比是 k，面积比是 k²，别串”。",
                "⚠️ 别搞混：周长比=k（一维），面积比=k²（二维）——维度决定指数。",
                "记住一句话：边变 k 倍，面积变 k² 倍。"
              ],
              examples: [
                { text: "1 寸→6 寸：边×4，面积×16", figure: "实物" }
              ],
              prev: "g09-u1-l5-p3",
              next: "g09-u1-l5-p5"
            },
            {
              id: "g09-u1-l5-p5",
              title: "H4：这就是 y=x² 在干的事",
              pageKind: "explain",
              concept: "面积比与二次函数的呼应",
              formulas: [
                {
                  id: "f1",
                  latex: "y = x^2",
                  translation: "y 等于 x 的平方"
                },
                {
                  id: "f2",
                  latex: "\\text{边} \\to k\\text{倍} \\Rightarrow \\text{面积} \\to k^2\\text{倍}",
                  translation: "边变成 k 倍，面积变成 k 的平方倍"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：同一个“平方关系”——代数里叫 y=x²，几何里叫面积比=k²。",
                      shapes: [
                        { t: "poly", pts: [[15,60],[45,60],[30,32]], color: "corrA", width: 2.5 },
                        { t: "poly", pts: [[58,62],[90,62],[74,34]], color: "corrB", width: 2.5 },
                        { t: "txt", p: [50,80], text: "边 ×k → 面积 ×k²", size: 14, bold: true, color: "known" },
                        { t: "txt", p: [50,90], text: "x ×k → y ×k²（y=x²）", size: 13, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "代数第 7 章 7.1：y=x²——输入 x 变 2 倍，输出 y 变 4 倍。",
                "几何这里：边变 k 倍，面积变 k² 倍——同一个“平方关系”，两种语言。",
                "二次关系有了“长相”：边长一拉，面积按平方跳——这就是数形结合。",
                "数的部分回代数 7.1 复习；形的部分就是本课——两页互相印证。"
              ],
              examples: [
                { text: "代数 ch07 7.1 二次函数 y=x²", figure: "互链" }
              ],
              prev: "g09-u1-l5-p4",
              next: "g09-u1-l6-p1"
            }
          ]
        },
        /* ============ g09.1.6 应用：测高与测距（3 页） ============ */
        {
          id: "g09-u1-l6",
          title: "应用：测高与测距",
          pages: [
            {
              id: "g09-u1-l6-p1",
              title: "影子测高",
              concept: "相似三角形测高",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{1.6}{2} = \\frac{h}{10}",
                  translation: "1.6 比 2 等于旗杆高比 10"
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
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：同一时刻，太阳光线平行——人影 2 米，旗杆影 10 米。",
                      shapes: [
                        { t: "seg", a: [8,25], b: [92,25], color: "line", width: 2.5 },
                        { t: "seg", a: [30,25], b: [30,45], color: "known", width: 3.5 },
                        { t: "txt", p: [26,36], text: "1.6米", size: 11 },
                        { t: "seg", a: [30,25], b: [50,25], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [40,20], text: "影2米", size: 11 },
                        { t: "seg", a: [65,25], b: [65,70], color: "target", width: 3.5 },
                        { t: "txt", p: [72,50], text: "h=?", size: 12, bold: true, color: "target" },
                        { t: "seg", a: [65,25], b: [90,25], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [78,20], text: "影10米", size: 11 },
                        { t: "seg", a: [22,58], b: [34,42], color: "aux", width: 2, arrows: 1 },
                        { t: "seg", a: [53,88], b: [69,68], color: "aux", width: 2, arrows: 1 }
                      ]
                    },
                    {
                      caption: "第 2 步：人、旗杆都垂直地面，光线平行——两个三角形两对角相等（AA 相似）。",
                      shapes: [
                        { t: "seg", a: [8,25], b: [92,25], color: "line", width: 2.5 },
                        { t: "seg", a: [30,25], b: [30,45], color: "known", width: 3.5 },
                        { t: "seg", a: [30,25], b: [50,25], color: "aux", width: 2, dash: "5,4" },
                        { t: "right", v: [30,25], p: [30,45], q: [50,25], size: 5, color: "corrAngle" },
                        { t: "seg", a: [65,25], b: [65,70], color: "target", width: 3.5 },
                        { t: "seg", a: [65,25], b: [90,25], color: "aux", width: 2, dash: "5,4" },
                        { t: "right", v: [65,25], p: [65,70], q: [90,25], size: 5, color: "corrAngle" },
                        { t: "arc", v: [50,25], a1: 0, a2: 60, r: 8, group: 1, color: "corrAngle" },
                        { t: "arc", v: [90,25], a1: 0, a2: 60, r: 8, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,12], text: "AA 相似", size: 13, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：列比例式 1.6/2 = h/10——旗杆高 8 米，没爬上去就量出来了。",
                      shapes: [
                        { t: "seg", a: [8,25], b: [92,25], color: "line", width: 2 },
                        { t: "seg", a: [30,25], b: [30,45], color: "known", width: 3 },
                        { t: "seg", a: [65,25], b: [65,70], color: "target", width: 3 },
                        { t: "txt", p: [50,55], text: "1.6/2 = h/10", size: 15, bold: true },
                        { t: "txt", p: [50,70], text: "h = 8 米", size: 15, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "太阳光线平行 → 两个三角形有两对角相等（直角 + 光线与地面的夹角）。",
                "AA 相似：人高/人影 = 旗杆高/旗杆影——1.6/2 = h/10。",
                "解得旗杆高 8 米——没爬上去就量出来了，这就是相似的威力。"
              ],
              examples: [
                { text: "泰勒斯测金字塔：等影子等于身高时量", figure: "故事" }
              ],
              prev: "g09-u1-l5-p5",
              next: "g09-u1-l6-p2"
            },
            {
              id: "g09-u1-l6-p2",
              title: "建模四步：生活→图形→列式→求解",
              pageKind: "explain",
              concept: "相似应用的建模流程",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{生活} \\Rightarrow \\text{图形} \\Rightarrow \\text{列式} \\Rightarrow \\text{求解}",
                  translation: "先把生活翻译成图形，再列式求解"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：建模四步——先翻译成三角形，再让相似干活。",
                      shapes: [
                        { t: "txt", p: [50,75], text: "① 生活：影子、标杆", size: 13 },
                        { t: "txt", p: [50,60], text: "② 图形：画出两个三角形", size: 13 },
                        { t: "txt", p: [50,45], text: "③ 列式：对应边成比例", size: 13 },
                        { t: "txt", p: [50,30], text: "④ 求解：解比例式", size: 13, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？影子测高就是四步：看到影子 → 画出两个三角形 → 列 1.6/2=h/10 → 解出 8 米。",
                "建模四步：生活 → 图形 → 列式 → 求解——先翻译成三角形，再让相似干活。",
                "生活例：泰勒斯测金字塔——等到自己的影子等于身高时去量，金字塔的影子有多长，金字塔就有多高（相似比 1:1）。",
                "图形例：标杆测距——眼睛、标杆顶、目标顶三点一线，摆出两个相似三角形。",
                "反例：阴天没有影子、光线不平行——摆不出相似三角形，就不能用这个方法。",
                "⚠️ 别搞混：对应边要“对上号”——人高对旗杆高，人影对旗杆影，交叉了就错了。",
                "记住一句话：先翻译成三角形，再让相似干活。"
              ],
              examples: [
                { text: "泰勒斯与金字塔的故事", figure: "故事" }
              ],
              prev: "g09-u1-l6-p1",
              next: "g09-u1-l6-p3"
            },
            {
              id: "g09-u1-l6-p3",
              title: "例题：河对岸的树有多远",
              pageKind: "explain",
              concept: "标杆测距例题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{1}{2} = \\frac{h}{32}",
                  translation: "1 比 2 等于树高比 32"
                },
                {
                  id: "f2",
                  latex: "h = 16",
                  translation: "树高 16 米"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：小三角形（眼—杆顶）相似于大三角形（眼—树顶）。",
                      shapes: [
                        { t: "seg", a: [10,20], b: [90,20], color: "line", width: 2 },
                        { t: "pt", p: [20,20], label: "眼", color: "known" },
                        { t: "seg", a: [35,20], b: [35,32], color: "known", width: 3 },
                        { t: "txt", p: [30,28], text: "1米", size: 11 },
                        { t: "txt", p: [28,14], text: "2米", size: 11 },
                        { t: "seg", a: [80,20], b: [80,68], color: "target", width: 3 },
                        { t: "txt", p: [86,46], text: "h", size: 12, bold: true, color: "target" },
                        { t: "txt", p: [52,12], text: "32米", size: 11 },
                        { t: "seg", a: [20,20], b: [35,32], color: "aux", width: 2 },
                        { t: "seg", a: [20,20], b: [80,68], color: "aux", width: 2 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "题目：眼睛离标杆 2 米，标杆高出视线 1 米；标杆离河对岸的树 30 米。树有多高？",
                "视线从眼睛出发，经过杆顶，落到树顶——小三角形与大三角形 AA 相似。",
                "列式：1/2 = h/32——树高 h=16 米。河没过去，树高量出来了。",
                "自查：每个“因为”都有理由吗？光线是直线（已知），两三角形共一个角、都有直角（AA 判定）。"
              ],
              examples: [
                { text: "标杆测距：不过河量树高", figure: "实物" }
              ],
              prev: "g09-u1-l6-p2",
              next: "g09-u1-l7-p1"
            }
          ]
        },
        /* ============ g09.1.7 位似（4 页） ============ */        {
          id: "g09-u1-l7",
          title: "位似",
          pages: [
            {
              id: "g09-u1-l7-p1",
              title: "以一点为中心放大",
              concept: "位似的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "OA' = 2 \\cdot OA, OB' = 2 \\cdot OB, OC' = 2 \\cdot OC",
                  translation: "每个对应点到中心的距离都是原来的 2 倍"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：三角形 ABC，和一个点 O。",
                      shapes: [
                        { t: "pt", p: [48,25], label: "O", color: "target" },
                        { t: "poly", pts: [[42,55],[54,55],[48,66]], color: "corrA", width: 3 },
                        { t: "txt", p: [36,52], text: "A", size: 12 },
                        { t: "txt", p: [58,52], text: "B", size: 12 },
                        { t: "txt", p: [50,71], text: "C", size: 12 }
                      ]
                    },
                    {
                      caption: "第 2 步：从 O 引射线穿过每个顶点——在射线上取 2 倍远的点 A′、B′、C′。",
                      shapes: [
                        { t: "pt", p: [48,25], label: "O", color: "target" },
                        { t: "poly", pts: [[42,55],[54,55],[48,66]], color: "corrA", width: 2 },
                        { t: "ray", p: [48,25], ang: 101, len: 62, color: "aux", width: 1.5 },
                        { t: "ray", p: [48,25], ang: 79, len: 62, color: "aux", width: 1.5 },
                        { t: "ray", p: [48,25], ang: 90, len: 70, color: "aux", width: 1.5 },
                        { t: "pt", p: [36,85], label: "A′", color: "corrB" },
                        { t: "pt", p: [60,85], label: "B′", color: "corrB" },
                        { t: "pt", p: [48,95], label: "C′", color: "corrB" },
                        { t: "txt", p: [50,12], text: "OA′ = 2·OA", size: 12, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：连起 A′B′C′——新三角形是原图的 2 倍，对应点连线都交于 O。",
                      shapes: [
                        { t: "pt", p: [48,25], label: "O", color: "target" },
                        { t: "poly", pts: [[42,55],[54,55],[48,66]], color: "corrA", width: 2 },
                        { t: "poly", pts: [[36,85],[60,85],[48,95]], color: "corrB", width: 3 },
                        { t: "seg", a: [48,25], b: [36,85], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [48,25], b: [60,85], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [48,25], b: [48,95], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "txt", p: [50,8], text: "O 叫位似中心，2 叫位似比", size: 13, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "射线从 O 出发，穿过每个顶点——O 是“中心”。",
                "k=2：OA′ 是 OA 的 2 倍，每个顶点都一样——这就是“位似比”。",
                "对应点连线交于 O——位似是“有中心的相似”。"
              ],
              examples: [
                { text: "投影仪：灯泡是位似中心，胶片放大到幕布", figure: "实物" }
              ],
              prev: "g09-u1-l6-p3",
              next: "g09-u1-l7-p2"
            },
            {
              id: "g09-u1-l7-p2",
              title: "位似：有中心的相似",
              pageKind: "explain",
              concept: "位似的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{位似} \\subset \\text{相似}",
                  translation: "位似是相似的一种特殊情况"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：位似 = 相似 + 一个公共中心 O。",
                      shapes: [
                        { t: "pt", p: [30,50], label: "O", color: "target" },
                        { t: "poly", pts: [[42,60],[54,60],[48,72]], color: "corrA", width: 2.5 },
                        { t: "poly", pts: [[54,70],[78,70],[66,94]], color: "corrB", width: 2.5 },
                        { t: "seg", a: [30,50], b: [54,70], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [30,50], b: [78,70], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "txt", p: [50,88], text: "位似 = 相似 + 公共中心", size: 13, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？从 O 引射线，每个顶点都按 2 倍放大——对应点连线全交于 O。",
                "位似：以一点 O 为中心，按位似比 k 放大（或缩小）得到的图形。O 叫位似中心，k 叫位似比；位似是特殊的相似。",
                "生活例：投影仪——灯泡是位似中心，胶片上的画面被放大到幕布上。",
                "图形例：以 O 为中心、k=2 的位似三角形。",
                "反例：把三角形平移得到的新三角形——也相似，但对应点连线互相平行、不交于一点，所以不是位似。",
                "⚠️ 别搞混：位似一定相似，相似不一定位似——“有中心”才是位似的身份证。",
                "记住一句话：位似 = 相似 + 一个公共中心。"
              ],
              examples: [
                { text: "手影游戏：手是位似中心吗？", figure: "实物" }
              ],
              prev: "g09-u1-l7-p1",
              next: "g09-u1-l7-p3"
            },
            {
              id: "g09-u1-l7-p3",
              title: "H18：位似的坐标写法",
              pageKind: "explain",
              concept: "位似的坐标表示",
              formulas: [
                {
                  id: "f1",
                  latex: "(x, y) \\to (kx, ky)",
                  translation: "点的横坐标纵坐标都乘以 k"
                },
                {
                  id: "f2",
                  latex: "A(1,2) \\Rightarrow A'(2,4) \\quad (k=2)",
                  translation: "k 等于 2 时，A(1,2) 变成 A'(2,4)"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：位似中心在原点时，放大就是坐标乘以 k。",
                      shapes: [
                        { t: "seg", a: [8,30], b: [92,30], color: "line", width: 2 },
                        { t: "seg", a: [20,12], b: [20,92], color: "line", width: 2 },
                        { t: "txt", p: [94,30], text: "x", size: 12 },
                        { t: "txt", p: [20,96], text: "y", size: 12 },
                        { t: "pt", p: [20,30], label: "O", color: "target" },
                        { t: "ray", p: [20,30], ang: 45, len: 75, color: "aux", width: 1.5 },
                        { t: "pt", p: [40,50], label: "A(1,2)", color: "corrA" },
                        { t: "pt", p: [60,70], label: "A′(2,4)", color: "corrB" },
                        { t: "txt", p: [55,88], text: "(x,y) → (kx,ky)", size: 14, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "把位似中心放在原点 O(0,0)，位似比 k——点 A(x,y) 变成 A′(kx,ky)。",
                "例子：A(1,2)，k=2 → A′(2,4)——横纵坐标都乘以 2。",
                "几何的“放大”动作，代数里就是“坐标乘 k”——只给直观，不推导。",
                "这是 g13 解析几何的微型预演；坐标系见代数 ch06。"
              ],
              examples: [
                { text: "代数 ch06 坐标系：点的坐标写法", figure: "互链" }
              ],
              prev: "g09-u1-l7-p2",
              next: "g09-u1-l7-p4"
            },
            {
              id: "g09-u1-l7-p4",
              title: "例题：画 k=2 的位似图形",
              pageKind: "explain",
              concept: "位似作图例题",
              formulas: [
                {
                  id: "f1",
                  latex: "(x,y) \\to (2x, 2y)",
                  translation: "横坐标纵坐标都乘以 2"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：三步画位似形——定中心、量距离、连新点。",
                      shapes: [
                        { t: "pt", p: [20,30], label: "O", color: "target" },
                        { t: "poly", pts: [[40,50],[60,50],[50,65]], color: "corrA", width: 2.5 },
                        { t: "txt", p: [50,72], text: "A(1,1) B(3,1) C(2,3)", size: 11 },
                        { t: "poly", pts: [[60,70],[90,70],[75,95]], color: "corrB", width: 2.5 },
                        { t: "txt", p: [72,60], text: "A′(2,2) B′(6,2) C′(4,6)", size: 11, color: "corrB" },
                        { t: "txt", p: [50,88], text: "①定中心 ②坐标×2 ③连新点", size: 13, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "题目：△ABC 的顶点 A(1,1)、B(3,1)、C(2,3)，以原点为位似中心、k=2 作位似图形。",
                "坐标写法一步到位：A′(2,2)、B′(6,2)、C′(4,6)——横纵坐标都乘以 2。",
                "连起 A′B′C′，再连 OA、OB、OC 验证：三条连线都过原点——位似无误。",
                "自查：位似比是 2（不是 1/2），中心是原点（不是别的点）。"
              ],
              examples: [
                { text: "坐标法画位似形：乘 k 就行", figure: "图表" }
              ],
              prev: "g09-u1-l7-p3",
              next: "g09-u1-l8-p1"
            }
          ]
        },
        /* ============ g09.1.8 本章小结与习题（2 页） ============ */
        {
          id: "g09-u1-l8",
          title: "本章小结与习题",
          pages: [
            {
              id: "g09-u1-l8-p1",
              title: "本章小结：从“像”到“算”",
              pageKind: "explain",
              concept: "相似全章串讲",
              formulas: [
                {
                  id: "f1",
                  latex: "S_1 : S_2 = k^2",
                  translation: "面积比等于相似比的平方"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "起点：比例线段 a:b=c:d——“分法相同”（H15 互链代数 ch03）。",
                      shapes: [
                        { t: "seg", a: [15,50], b: [85,50], color: "known", width: 3 },
                        { t: "pt", p: [38,50], color: "known" },
                        { t: "txt", p: [50,70], text: "a : b = c : d", size: 15, bold: true }
                      ]
                    },
                    {
                      caption: "相似图形：拼图套合→照片放大→单向拉伸反例（跃升 5）。",
                      shapes: [
                        { t: "poly", pts: [[20,40],[50,40],[35,65]], color: "corrA", width: 2.5 },
                        { t: "poly", pts: [[55,38],[88,38],[71,68]], color: "corrB", width: 2.5 },
                        { t: "txt", p: [50,82], text: "形状相同，大小成比例", size: 13, bold: true }
                      ]
                    },
                    {
                      caption: "三个判定：AA / SAS / SSS——对照全等表，“相等”换成“成比例”。",
                      shapes: [
                        { t: "txt", p: [50,68], text: "AA：两角对应相等", size: 13 },
                        { t: "txt", p: [50,52], text: "SAS：两边成比例夹角相等", size: 13 },
                        { t: "txt", p: [50,36], text: "SSS：三边成比例", size: 13 },
                        { t: "txt", p: [50,20], text: "全等是 k=1 的特例", size: 12, color: "known" }
                      ]
                    },
                    {
                      caption: "性质与应用：周长比=k，面积比=k²（H4）；影子测高；位似 (x,y)→(kx,ky)（H18）。",
                      shapes: [
                        { t: "txt", p: [50,68], text: "周长比 = k，面积比 = k²", size: 14, bold: true, color: "known" },
                        { t: "txt", p: [50,50], text: "应用：影子测高、标杆测距", size: 13 },
                        { t: "txt", p: [50,32], text: "位似：有中心的相似", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一句话串全章：比例线段 → 相似图形 → 三个判定 → 性质（周长 k、面积 k²）→ 应用与位似。",
                "三个呼应：H4 面积比↔代数 ch07 y=x²，H15 比例↔代数 ch03，H18 位似坐标↔代数 ch06。",
                "判定对照表记住：SSS 对 SSS，SAS 对 SAS，ASA/AAS 对 AA——“相等”换成“成比例”。",
                "记住一句话：相似是“形状相同”，判定看角和边，性质看 k 和 k²。"
              ],
              examples: [
                { text: "全章知识图谱", figure: "图表" }
              ],
              prev: "g09-u1-l7-p4",
              next: "g09-u1-l8-p2"
            },
            {
              id: "g09-u1-l8-p2",
              title: "本章习题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{C_1}{C_2} = k, \\frac{S_1}{S_2} = k^2",
                  translation: "周长比=k，面积比=k²"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "txt", p: [50,90], text: "点三角形，分进两篮", size: 14 }
                  ],
                  groups: [
                    { name: "相似", color: "corrA" },
                    { name: "不相似", color: "corrB" }
                  ],
                  items: [
                    { id: "q1", label: "3-4-5 / 6-8-10", group: 0, anchor: [25,70],
                      shape: { t: "poly", pts: [[12,76],[38,76],[12,56]], color: "corrA", width: 2.5 } },
                    { id: "q2", label: "50°60° / 50°60°", group: 0, anchor: [70,70],
                      shape: { t: "poly", pts: [[58,76],[84,76],[58,56]], color: "corrA", width: 2.5 } },
                    { id: "q3", label: "2-3-4 / 4-6-9", group: 1, anchor: [25,42],
                      shape: { t: "poly", pts: [[12,48],[38,48],[12,28]], color: "corrB", width: 2.5 } },
                    { id: "q4", label: "正方形 / 长方形", group: 1, anchor: [70,42],
                      shape: { t: "poly", pts: [[58,48],[84,48],[84,28],[58,28]], color: "corrB", width: 2.5 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "认图：4 组图形分两篮：相似 / 不相似。",
                "1．两三角形相似比（小:大）为 2:3，小三角形的最长边是 6，求大三角形的对应边。",
                "2．两三角形：50°60° 与 60°70°，相似？",
                "3．4-6-8 与 6-9-12，相似？比？",
                "4．相似比 1:3，小面积 5，大面积？",
                "5．人 1.7 米影 2 米，旗杆影 12 米，杆高？"
              ],
              examples: [
                { figure: "核对答案", text: "认图：①②相似，③④不相似；1．9；2．相似；3．相似，比 2:3；4．45；5．10.2 米" }
              ],
              prev: "g09-u1-l8-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
