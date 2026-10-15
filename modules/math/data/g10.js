/* ============================================================
 * 学习工具箱 · 数学 · 几何 g10：图形的变换——对称与旋转
 *
 * 黄队（教育教学专家）生产：1 单元 / 7 课 / 25 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g10 章）
 * 教学设计：docs/math-geometry-pedagogy.md（跃升 7 静图→变换；
 *           例子库：剪纸/蝴蝶/脸谱/风车/钟表/雪花；H17 轴对称↔代数 ch07
 *           抛物线对称轴 x=−b/2a；g10.1.6 为全书方法论高点）
 * 参数手册：docs/math-geometry-params.md v1.3
 * 白队一屏预算评审：~/workspace/geo-g08-g13-screen-budget-review.md
 *   （g10 20→25 页；g10.1.5 高风险必拆 5–6 页，按拆分建议执行：
 *    旋转交互→旋转三要素讲解→中心对称交互→中心对称讲解→平行四边形彩蛋）
 *
 * 页构成：
 *   g10.1.1 轴对称的概念      4 页  P1 step-play（折纸剪洞，跃升 7-1）
 *                                   P2 step-play（翻折慢动作 + 定格提问，跃升 7-2）
 *                                   P3 讲解（轴对称定义 + 三例 + 反例）
 *                                   P4 compare-toggle（等腰三角形 vs 平行四边形反例）
 *   g10.1.2 轴对称的性质      4 页  P1 step-play（对应点翻折，连线被垂直平分）
 *                                   P2 讲解（性质 + 镜子例 + 主语别反）
 *                                   P3 step-play（H17：抛物线对折找 x=−b/2a）
 *                                   P4 tap-highlight（矩形的对称轴有几条）
 *   g10.1.3 作轴对称图形      3 页  P1 construction-step（作点的对称点，5 步）
 *                                   P2 construction-step（作三角形的对称形，6 步）
 *                                   P3 讲解（三步口诀：垂线·等长·连线）
 *   g10.1.4 等腰三角形对称性再探 3 页 P1 step-play（沿对称轴翻折完全重合）
 *                                   P2 讲解（三线合一即对称轴）
 *                                   P3 step-play（例题：用对称求角度）
 *   g10.1.5 旋转与中心对称    6 页  P1 step-play（旋转步进器：时针 + 雪花 6 转回原样）
 *                                   P2 讲解（旋转三要素：中心·方向·角度）
 *                                   P3 step-play（中心对称：转 180° 重合）
 *                                   P4 讲解（性质 + 找对称中心 + 别搞混）
 *                                   P5 step-play（彩蛋：平行四边形正名，回链 g06）
 *                                   P6 tap-highlight（认中心对称图形）
 *   g10.1.6 旋转与全等        3 页  P1 step-play（三种运动，一个结果：重合）
 *                                   P2 讲解（方法论高点：全等即运动重合）
 *                                   P3 step-play（运动找对应：转过去压住）
 *   g10.1.7 本章小结与习题    2 页  P1 讲解（三变换对照表）
 *                                   P2 习题（tap-highlight 认轴对称 + 6 道题）
 *
 * 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 / corrA·corrB·corrC=对应组 /
 *   corrAngle=对应角 / line=普通线 / aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
 * 公式走 LaTeX（构建器子集），交互参数里不出现裸文本公式。
 * fold-flip（G4）尚未实现：本章翻折/旋转动画暂用 step-play 多帧实现，
 *   待蓝队实现 G4 后可整体升级（见黄队汇报）。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g10"] = {
  id: "g10",
  title: "图形的变换——对称与旋转",
  units: [
    {
      id: "g10-u1",
      title: "对称与旋转",
      lessons: [
        /* ============ g10.1.1 轴对称的概念（4 页） ============ */
        {
          id: "g10-u1-l1",
          title: "轴对称的概念",
          pages: [
            {
              id: "g10-u1-l1-p1",
              title: "折纸剪洞：对称是“折”出来的",
              concept: "对称是折的结果",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{对折} \\Rightarrow \\text{折痕两边镜像重合}",
                  translation: "对折后，折痕两边的图形镜像重合"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：一张长方形纸，干干净净。",
                      shapes: [
                        { t: "poly", pts: [[25,30],[75,30],[75,70],[25,70]], color: "line", width: 3 }
                      ]
                    },
                    {
                      caption: "第 2 步：沿中线对折——这条折痕一会儿有用。",
                      shapes: [
                        { t: "poly", pts: [[50,30],[75,30],[75,70],[50,70]], color: "line", width: 3 },
                        { t: "seg", a: [50,28], b: [50,72], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,82], text: "折痕", size: 14, bold: true, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 3 步：在折好的一边剪一个小洞。",
                      shapes: [
                        { t: "poly", pts: [[50,30],[75,30],[75,70],[50,70]], color: "line", width: 3 },
                        { t: "seg", a: [50,28], b: [50,72], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "circle", c: [62,55], r: 5, color: "target", width: 3 }
                      ]
                    },
                    {
                      caption: "第 4 步：展开——两个洞关于折痕镜像对称！",
                      shapes: [
                        { t: "poly", pts: [[25,30],[75,30],[75,70],[25,70]], color: "line", width: 3 },
                        { t: "seg", a: [50,28], b: [50,72], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "circle", c: [38,55], r: 5, color: "corrA", width: 3 },
                        { t: "circle", c: [62,55], r: 5, color: "corrA", width: 3 },
                        { t: "seg", a: [38,55], b: [62,55], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,20], text: "镜像对称！", size: 15, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 4 步：只剪了一个洞，展开却有两个——另一个是“折”出来的。",
                "没变的是：两个洞到折痕的距离相等，关于折痕镜像。",
                "记住：对称是“折”这个动作的结果，不是图形天生的长相。"
              ],
              examples: [
                { text: "剪纸：对折剪一下，展开就是对称图案", figure: "实物" }
              ],
              prev: null,
              next: "g10-u1-l1-p2"
            },
            {
              id: "g10-u1-l1-p2",
              title: "翻折慢动作：重合的瞬间",
              concept: "轴对称的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{沿直线} l \\text{翻折} \\Rightarrow \\text{两部分完全重合}",
                  translation: "图形沿直线 l 翻折后，两部分完全重合"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：一个三角形，一条折线 l。",
                      shapes: [
                        { t: "poly", pts: [[22,60],[48,60],[35,32]], color: "known", width: 3 },
                        { t: "seg", a: [55,20], b: [55,80], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [60,76], text: "l", size: 15, bold: true, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 2 步：三角形沿 l 翻过去——看它“飞”到另一边。",
                      shapes: [
                        { t: "poly", pts: [[22,60],[48,60],[35,32]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[58,58],[80,52],[70,34]], color: "known", width: 3, opacity: 0.6 },
                        { t: "seg", a: [55,20], b: [55,80], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,16], text: "正在翻……", size: 14, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：落定——和右边的轮廓严丝合缝！",
                      shapes: [
                        { t: "poly", pts: [[62,60],[88,60],[75,32]], color: "known", width: 3 },
                        { t: "poly", pts: [[62,60],[88,60],[75,32]], color: "target", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [55,20], b: [55,80], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [75,20], text: "重合！", size: 15, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "定格提问：翻过去的三角形，和轮廓严丝合缝吗？（想好了点▶继续）",
                      shapes: [
                        { t: "poly", pts: [[62,60],[88,60],[75,32]], color: "known", width: 3 },
                        { t: "seg", a: [55,20], b: [55,80], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,88], text: "是 / 否（不判对错，只记录）", size: 13, color: "aux" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 3 步：翻过去的那一刻，三角形和轮廓“长”到了一起——这就是重合。",
                "这就是轴对称：如果一个图形沿一条直线翻折，两部分完全重合，它就是轴对称图形，这条直线叫对称轴。",
                "新名词认旧友：对称轴（就是你上一页折纸时那条“折痕”）。"
              ],
              examples: [
                { text: "翻书：书页沿书脊翻过去，两页重合", figure: "实物" }
              ],
              prev: "g10-u1-l1-p1",
              next: "g10-u1-l1-p3"
            },
            {
              id: "g10-u1-l1-p3",
              title: "轴对称：对折能重合的图形",
              pageKind: "explain",
              concept: "轴对称图形",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{轴对称图形}",
                  translation: "沿一条直线对折后两部分完全重合的图形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：等腰三角形沿虚线对折，两部分严丝合缝。",
                      shapes: [
                        { t: "poly", pts: [[30,65],[70,65],[50,30]], color: "known", width: 3 },
                        { t: "seg", a: [50,25], b: [50,70], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,82], text: "对称轴", size: 14, bold: true, color: "aux" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你把纸对折剪洞再展开——两个洞关于折痕镜像对称。",
                "轴对称，就是“能对折重合”：把图形沿一条直线折过去，两部分严丝合缝。这条直线叫对称轴。",
                "统一口径：P2 里“一个三角形翻过去压住轮廓”——那是两个图形关于 l 成轴对称；把它俩合在一起看，就是一个轴对称图形。",
                "生活例：蝴蝶的两只翅膀；京剧脸谱的左右脸。图形例：等腰三角形沿顶角平分线对折。",
                "反例：一般的平行四边形，对折后两部分合不上——它不是轴对称图形（但它转 180° 能重合，那是中心对称，1.5 节讲）。",
                "⚠️ 别搞混：对称轴是“直线”，不是“线段”——它可以向两端无限延长。",
                "记住一句话：对折能重合，就是轴对称。"
              ],
              examples: [
                { text: "蝴蝶、京剧脸谱：沿中线对折重合", figure: "实物" },
                { text: "❌ 一般的平行四边形：对折合不上，不是轴对称图形", figure: "反例图" }
              ],
              prev: "g10-u1-l1-p2",
              next: "g10-u1-l1-p4"
            },
            {
              id: "g10-u1-l1-p4",
              title: "反例：平行四边形合不上",
              concept: "轴对称的反例",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{对折重合} \\Rightarrow \\text{轴对称}",
                  translation: "能对折重合才是轴对称，对不上就不是"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "等腰三角形",
                      caption: "沿虚线对折，两部分严丝合缝——是轴对称图形。",
                      shapes: [
                        { t: "poly", pts: [[30,65],[70,65],[50,30]], color: "known", width: 3.5 },
                        { t: "seg", a: [50,25], b: [50,70], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,82], text: "是轴对称图形 ✓", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      label: "平行四边形",
                      caption: "沿中线对折，角对不上边——❌ 不是轴对称图形。",
                      shapes: [
                        { t: "poly", pts: [[30,40],[70,40],[60,68],[20,68]], color: "target", width: 3.5 },
                        { t: "seg", a: [45,34], b: [45,74], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [45,84], text: "❌ 不是：合不上", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "切到“平行四边形”：中线两边看着差不多，但折过去角压不到边上——差一点也不行。",
                "点拨：对称是“折”的结果，不是“长得差不多”。“差不多对称”不叫对称。",
                "预告：平行四边形有自己的本事——转 180° 能重合，1.5 节给它正名。"
              ],
              examples: [
                { text: "长得像对称 ≠ 对称：必须对折严丝合缝", figure: "对比" }
              ],
              prev: "g10-u1-l1-p3",
              next: "g10-u1-l2-p1"
            }
          ]
        }
        ,
        /* ============ g10.1.2 轴对称的性质（4 页） ============ */
        {
          id: "g10-u1-l2",
          title: "轴对称的性质",
          pages: [
            {
              id: "g10-u1-l2-p1",
              title: "对应点“飞”过去：连线被垂直平分",
              concept: "对称轴是对应点连线的垂直平分线",
              formulas: [
                {
                  id: "f1",
                  latex: "l \\perp AA'",
                  translation: "对称轴 l 垂直于对应点连线 AA'"
                },
                {
                  id: "f2",
                  latex: "AO = OA'",
                  translation: "对称轴平分对应点连线：AO 等于 OA'"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：点 A 在折线 l 左边，O 是垂足。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [30,55], label: "A", color: "known", r: 5 },
                        { t: "seg", a: [30,55], b: [55,55], color: "line", width: 2, dash: "5,4" },
                        { t: "pt", p: [55,55], label: "O", color: "aux", r: 4 },
                        { t: "txt", p: [60,80], text: "l", size: 15, bold: true, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 2 步：A 沿垂直方向“飞”向另一边。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [45,55], label: "A", color: "known", r: 5, opacity: 0.5 },
                        { t: "seg", a: [30,55], b: [80,55], color: "line", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,30], text: "正在飞……", size: 14, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：落定在 A'——连线 AA' 与 l 相交。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [30,55], label: "A", color: "known", r: 5 },
                        { t: "pt", p: [80,55], label: "A'", color: "target", r: 5 },
                        { t: "seg", a: [30,55], b: [80,55], color: "line", width: 3 },
                        { t: "pt", p: [55,55], label: "O", color: "aux", r: 4 }
                      ]
                    },
                    {
                      caption: "第 4 步：没变的是——l 垂直平分 AA'：直角标记 + 两段等长刻度。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [30,55], label: "A", color: "known", r: 5 },
                        { t: "pt", p: [80,55], label: "A'", color: "target", r: 5 },
                        { t: "seg", a: [30,55], b: [55,55], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [55,55], b: [80,55], color: "corrA", width: 3, ticks: 1 },
                        { t: "right", v: [55,55], p: [55,85], q: [80,55], size: 6, color: "corrA" },
                        { t: "txt", p: [55,12], text: "l 垂直平分 AA'", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 4 步：连线 AA' 被 l 切成两段，一样长（两道刻度），夹角是直角。",
                "这就是轴对称的性质：对称轴是对应点连线的垂直平分线。",
                "新名词认旧友：对应点（就是翻过去之后压在一起的那两个点）。"
              ],
              examples: [
                { text: "A 飞到 A'：连线与折痕垂直且被平分", figure: "慢动作" }
              ],
              prev: "g10-u1-l1-p4",
              next: "g10-u1-l2-p2"
            },
            {
              id: "g10-u1-l2-p2",
              title: "性质：对称轴垂直平分连线",
              pageKind: "explain",
              concept: "轴对称的性质",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{对称轴} \\perp \\text{对应点连线}，\\text{且平分它}",
                  translation: "对称轴垂直于对应点连线，并且平分它"
                },
                {
                  id: "f2",
                  latex: "AB = A'B', \\angle A = \\angle A'",
                  translation: "对应线段相等，对应角相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：A 与 A' 关于 l 对称——连线被 l 垂直平分，对应边同色。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "poly", pts: [[25,60],[45,60],[35,40]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[65,60],[85,60],[75,40]], color: "corrA", width: 3 },
                        { t: "txt", p: [50,90], text: "对应边同色：翻过去完全一样", size: 13, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？A 飞到 A' 落定那一刻，连线 AA' 被折痕垂直平分。",
                "性质人话版：对称轴是对应点连线的垂直平分线；翻过去当然一样大，所以对应线段相等、对应角相等。",
                "生活例：照镜子——你和镜中的你，到镜面的距离永远相等。",
                "图形例：△ABC 关于 l 对称，则 AB=A'B'，∠A=∠A'。",
                "反例：如果 A' 不在过 A 的垂线上，或 AO≠OA'，折过去就对不上——那就不是对称。",
                "⚠️ 别搞混：是“对称轴垂直平分连线”，不是“连线平分对称轴”——主语别反。",
                "记住一句话：对应点连线，对称轴垂直平分。"
              ],
              examples: [
                { text: "照镜子：人与镜像到镜面距离相等", figure: "实物" },
                { text: "❌ AO≠OA' 时折过去对不上", figure: "反例图" }
              ],
              prev: "g10-u1-l2-p1",
              next: "g10-u1-l2-p3"
            },
            {
              id: "g10-u1-l2-p3",
              title: "压轴例子：抛物线的折痕",
              concept: "抛物线对称轴的几何意义（H17）",
              formulas: [
                {
                  id: "f1",
                  latex: "x = -\\frac{b}{2a}",
                  translation: "抛物线的对称轴：x 等于负 b 除以 2a"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：纸上画一条抛物线 y=ax²+bx+c（开口向上）。",
                      shapes: [
                        { t: "seg", a: [50,15], b: [50,85], color: "line", width: 2 },
                        { t: "seg", a: [15,50], b: [85,50], color: "line", width: 2 },
                        { t: "poly", pts: [[28,72],[38,58],[46,50],[50,48],[54,50],[62,58],[72,72]], close: false, color: "known", width: 3.5 },
                        { t: "txt", p: [72,30], text: "y=ax²+bx+c", size: 13, math: true }
                      ]
                    },
                    {
                      caption: "第 2 步：沿虚线对折——猜猜折痕在哪？",
                      shapes: [
                        { t: "poly", pts: [[28,72],[38,58],[46,50],[50,48],[54,50],[62,58],[72,72]], close: false, color: "known", width: 3.5 },
                        { t: "seg", a: [50,20], b: [50,82], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,88], text: "沿这条线对折", size: 14, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 3 步：左右两半严丝合缝——折痕就是 x=−b/2a！",
                      shapes: [
                        { t: "poly", pts: [[28,72],[38,58],[46,50],[50,48],[54,50],[62,58],[72,72]], close: false, color: "known", width: 3.5 },
                        { t: "seg", a: [50,20], b: [50,82], color: "target", width: 3 },
                        { t: "txt", p: [50,12], text: "折痕：x = −b/2a", size: 15, bold: true, color: "target", math: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "这条抛物线你在代数 ch07 见过，当时只给了公式；现在看它的“长相”——对折，折痕就是 x=−b/2a。",
                "“对称轴”三个字，脑子里先出现折痕，再出现公式——这就是几何给代数的礼物。",
                "再看 y=x²：它关于 y 轴对称——这正是代数里的偶函数。抛物线对称轴 + 偶函数，H17 的两块都齐了。",
                "呼应：代数 ch07 二次函数（数的部分回代数第 7 章复习，这里只看“形”）。"
              ],
              examples: [
                { text: "y=x²−4x+3：对称轴 x=2，纸上对折验证", figure: "纸上画" }
              ],
              prev: "g10-u1-l2-p2",
              next: "g10-u1-l2-p4"
            },
            {
              id: "g10-u1-l2-p4",
              title: "找一找：矩形的对称轴",
              concept: "矩形的对称轴",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{矩形的对称轴} = 2\\text{条}",
                  translation: "矩形有 2 条对称轴"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "是矩形的对称轴", color: "corrA" },
                    { name: "不是对称轴", color: "corrB" }
                  ],
                  base: [
                    { t: "poly", pts: [[25,35],[75,35],[75,65],[25,65]], color: "line", width: 3 },
                    { t: "txt", p: [50,82], text: "点每条虚线，分进两篮", size: 14, color: "aux" }
                  ],
                  items: [
                    { id: "m1", label: "①", group: 0, anchor: [30,50],
                      shape: { t: "seg", a: [22,50], b: [78,50], color: "line", width: 2, dash: "5,4" } },
                    { id: "m2", label: "②", group: 0, anchor: [50,62],
                      shape: { t: "seg", a: [50,32], b: [50,68], color: "line", width: 2, dash: "5,4" } },
                    { id: "d1", label: "③", group: 1, anchor: [38,42],
                      shape: { t: "seg", a: [25,35], b: [75,65], color: "line", width: 2, dash: "5,4" } },
                    { id: "d2", label: "④", group: 1, anchor: [62,42],
                      shape: { t: "seg", a: [75,35], b: [25,65], color: "line", width: 2, dash: "5,4" } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点每条虚线：沿它对折，矩形两部分能重合吗？能→左篮，不能→右篮。",
                "对角线为什么不行？折过去角对不上边——除非它是正方形。",
                "结论：矩形有 2 条对称轴（长、宽的中线）；正方形有 4 条。"
              ],
              examples: [
                { text: "纸上剪个矩形，沿 4 条线各折一次验证", figure: "实物" }
              ],
              prev: "g10-u1-l2-p3",
              next: "g10-u1-l3-p1"
            }
          ]
        }
        ,
        /* ============ g10.1.3 作轴对称图形（3 页） ============ */
        {
          id: "g10-u1-l3",
          title: "作轴对称图形",
          pages: [
            {
              id: "g10-u1-l3-p1",
              title: "作图：点的对称点",
              concept: "作点关于直线的对称点",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{作垂线} \\Rightarrow \\text{截等长} \\Rightarrow A'",
                  translation: "过 A 作 l 的垂线，截等长，得到对称点 A'"
                }
              ],
              interaction: {
                type: "construction-step",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      text: "过点 A 作直线 l 的垂线，交 l 于 O",
                      why: "垂线保证：A 与 A' 的连线垂直于 l（性质的要求）。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "line", width: 2.5 },
                        { t: "pt", p: [30,55], label: "A", color: "known", r: 5 },
                        { t: "seg", a: [30,55], b: [55,55], color: "target", width: 3.5 },
                        { t: "pt", p: [55,55], label: "O", color: "target", r: 4 },
                        { t: "right", v: [55,55], p: [55,85], q: [30,55], size: 6, color: "target" },
                        { t: "txt", p: [62,80], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    },
                    {
                      text: "量出 AO 的长度",
                      why: "要让 l 平分 AA'，先知道一半是多长。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "line", width: 2.5 },
                        { t: "pt", p: [30,55], label: "A", color: "known", r: 5 },
                        { t: "seg", a: [30,55], b: [55,55], color: "target", width: 3.5, ticks: 1 },
                        { t: "pt", p: [55,55], label: "O", color: "known", r: 4 },
                        { t: "txt", p: [42,66], text: "量一量", size: 13, color: "target" },
                        { t: "txt", p: [62,80], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    },
                    {
                      text: "在 l 另一侧截取 OA' = AO",
                      why: "截等长保证：O 是 AA' 的中点（性质反过来用）。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "line", width: 2.5 },
                        { t: "pt", p: [30,55], label: "A", color: "known", r: 5 },
                        { t: "seg", a: [30,55], b: [80,55], color: "target", width: 3.5 },
                        { t: "seg", a: [55,55], b: [80,55], color: "target", width: 3.5, ticks: 1 },
                        { t: "pt", p: [55,55], label: "O", color: "known", r: 4 },
                        { t: "pt", p: [80,55], label: "A'", color: "target", r: 5 },
                        { t: "txt", p: [62,80], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    },
                    {
                      text: "标出点 A'，连线 AA'（虚线）",
                      why: "连线是辅助线：帮你看清“垂直平分”，画完可擦可留。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "line", width: 2.5 },
                        { t: "pt", p: [30,55], label: "A", color: "known", r: 5 },
                        { t: "pt", p: [80,55], label: "A'", color: "known", r: 5 },
                        { t: "seg", a: [30,55], b: [80,55], color: "aux", width: 2, dash: "5,4" },
                        { t: "pt", p: [55,55], label: "O", color: "aux", r: 4 },
                        { t: "txt", p: [62,80], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    },
                    {
                      text: "检查：沿 l 对折，A 与 A' 重合",
                      why: "作图的验收标准永远是定义：对折重合。",
                      shapes: [
                        { t: "seg", a: [55,15], b: [55,85], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [30,55], label: "A", color: "corrA", r: 5 },
                        { t: "pt", p: [80,55], label: "A'", color: "corrA", r: 5 },
                        { t: "txt", p: [55,30], text: "对折重合 ✓", size: 15, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "两步核心：作垂线（保证垂直）→ 截等长（保证平分）——性质反过来用。",
                "切“跟做”模式：先在纸上比划这一步，再点“下一步”验证。",
                "验收：沿 l 对折，A 与 A' 重合——不对就重来，不扣分。"
              ],
              examples: [
                { text: "方格纸上：A 到 l 隔 3 格，A' 在另一侧 3 格处", figure: "数格子" }
              ],
              prev: "g10-u1-l2-p4",
              next: "g10-u1-l3-p2"
            },
            {
              id: "g10-u1-l3-p2",
              title: "作图：三角形的对称形",
              concept: "作三角形的轴对称图形",
              formulas: [
                {
                  id: "f1",
                  latex: "\\triangle ABC \\Rightarrow \\triangle A'B'C'",
                  translation: "作出三角形 ABC 关于直线 l 的对称图形"
                }
              ],
              interaction: {
                type: "construction-step",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      text: "作点 A 关于 l 的对称点 A'",
                      why: "用上一页的方法：作垂线、截等长。",
                      shapes: [
                        { t: "seg", a: [50,12], b: [50,88], color: "line", width: 2.5 },
                        { t: "poly", pts: [[22,60],[40,60],[31,40]], color: "known", width: 3 },
                        { t: "pt", p: [22,60], label: "A", color: "known", r: 4 },
                        { t: "pt", p: [40,60], label: "B", color: "known", r: 4 },
                        { t: "pt", p: [31,40], label: "C", color: "known", r: 4 },
                        { t: "pt", p: [78,60], label: "A'", color: "target", r: 5 },
                        { t: "seg", a: [22,60], b: [78,60], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [56,82], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    },
                    {
                      text: "作点 B 的对称点 B'",
                      why: "同一个方法，再来一遍。",
                      shapes: [
                        { t: "seg", a: [50,12], b: [50,88], color: "line", width: 2.5 },
                        { t: "poly", pts: [[22,60],[40,60],[31,40]], color: "known", width: 3 },
                        { t: "pt", p: [78,60], label: "A'", color: "known", r: 4 },
                        { t: "pt", p: [60,60], label: "B'", color: "target", r: 5 },
                        { t: "seg", a: [40,60], b: [60,60], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [56,82], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    },
                    {
                      text: "作点 C 的对称点 C'",
                      why: "三个顶点各就各位。",
                      shapes: [
                        { t: "seg", a: [50,12], b: [50,88], color: "line", width: 2.5 },
                        { t: "poly", pts: [[22,60],[40,60],[31,40]], color: "known", width: 3 },
                        { t: "pt", p: [78,60], label: "A'", color: "known", r: 4 },
                        { t: "pt", p: [60,60], label: "B'", color: "known", r: 4 },
                        { t: "pt", p: [69,40], label: "C'", color: "target", r: 5 },
                        { t: "seg", a: [31,40], b: [69,40], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [56,82], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    },
                    {
                      text: "连接 A'B'",
                      why: "对应点定对应边：A'B' 就是 AB 的对称边。",
                      shapes: [
                        { t: "seg", a: [50,12], b: [50,88], color: "line", width: 2.5 },
                        { t: "poly", pts: [[22,60],[40,60],[31,40]], color: "known", width: 3 },
                        { t: "pt", p: [78,60], label: "A'", color: "known", r: 4 },
                        { t: "pt", p: [60,60], label: "B'", color: "known", r: 4 },
                        { t: "pt", p: [69,40], label: "C'", color: "known", r: 4 },
                        { t: "seg", a: [78,60], b: [60,60], color: "target", width: 3.5 },
                        { t: "txt", p: [56,82], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    },
                    {
                      text: "连接 B'C'",
                      why: "第二条对应边。",
                      shapes: [
                        { t: "seg", a: [50,12], b: [50,88], color: "line", width: 2.5 },
                        { t: "poly", pts: [[22,60],[40,60],[31,40]], color: "known", width: 3 },
                        { t: "pt", p: [78,60], label: "A'", color: "known", r: 4 },
                        { t: "pt", p: [60,60], label: "B'", color: "known", r: 4 },
                        { t: "pt", p: [69,40], label: "C'", color: "known", r: 4 },
                        { t: "seg", a: [78,60], b: [60,60], color: "line", width: 3 },
                        { t: "seg", a: [60,60], b: [69,40], color: "target", width: 3.5 },
                        { t: "txt", p: [56,82], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    },
                    {
                      text: "连接 C'A'，得到对称三角形",
                      why: "三个对应点定三条对应边——三角形被“锁死”，这就是 SAS/SSS 的回声。",
                      shapes: [
                        { t: "seg", a: [50,12], b: [50,88], color: "line", width: 2.5 },
                        { t: "poly", pts: [[22,60],[40,60],[31,40]], color: "known", width: 3 },
                        { t: "poly", pts: [[78,60],[60,60],[69,40]], color: "target", width: 3.5 },
                        { t: "txt", p: [69,74], text: "△A'B'C'", size: 14, bold: true, color: "target", math: true },
                        { t: "txt", p: [56,82], text: "l", size: 15, bold: true, color: "line" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "六步拆成两段：前三步“找对称点”，后三步“连对称边”。",
                "为什么先找点再连线？因为点定了，边就定了——三角形被“锁死”。",
                "方格纸上更快：每个顶点数格子找对称点，连起来就行。"
              ],
              examples: [
                { text: "照镜子画图：左物右像，先定点再连线", figure: "方格纸" }
              ],
              prev: "g10-u1-l3-p1",
              next: "g10-u1-l3-p3"
            },
            {
              id: "g10-u1-l3-p3",
              title: "三步口诀：垂线·等长·连线",
              pageKind: "explain",
              concept: "作轴对称图形的方法总结",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{作垂线} \\Rightarrow \\text{截等长} \\Rightarrow \\text{连线}",
                  translation: "作轴对称图形三步：作垂线、截等长、连线"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：方格纸数格子——A 到 l 隔 3 格，A' 在另一侧 3 格处。",
                      shapes: [
                        { t: "seg", a: [50,20], b: [50,80], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [32,55], label: "A", color: "known", r: 5 },
                        { t: "pt", p: [68,55], label: "A'", color: "target", r: 5 },
                        { t: "seg", a: [32,55], b: [68,55], color: "line", width: 2, dash: "5,4" },
                        { t: "txt", p: [41,66], text: "3 格", size: 13, color: "corrA" },
                        { t: "txt", p: [59,66], text: "3 格", size: 13, color: "corrA" },
                        { t: "txt", p: [50,88], text: "数格子，不用量角器", size: 13, color: "aux" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三步口诀：作垂线 → 截等长 → 连起来。每个顶点都这么办。",
                "为什么这样画？性质反过来用：对称点连线被对称轴垂直平分——作垂线保证“垂直”，截等长保证“平分”。",
                "方格纸快捷法：数格子——A 到 l 隔几格，A' 就在另一侧几格处，不用量角器。",
                "反例：直接把三角形“描”到另一边，看着像但对应点连线不垂直——折一下就露馅。",
                "⚠️ 别搞混：作的是“对称点”再连线，不是一笔画描过去。",
                "记住一句话：先找对称点，再连对称形。"
              ],
              examples: [
                { text: "数格子法：3 格对 3 格，又快又准", figure: "方格纸" }
              ],
              prev: "g10-u1-l3-p2",
              next: "g10-u1-l4-p1"
            }
          ]
        }
        ,
        /* ============ g10.1.4 等腰三角形的对称性再探（3 页） ============ */
        {
          id: "g10-u1-l4",
          title: "等腰三角形的对称性再探",
          pages: [
            {
              id: "g10-u1-l4-p1",
              title: "等腰三角形：沿对称轴翻折",
              concept: "等腰三角形的轴对称性",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三线合一} \\Rightarrow \\text{对称轴}",
                  translation: "三线合一的那条线，就是等腰三角形的对称轴"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：等腰三角形 ABC（AB=AC，两道刻度），AD 是顶角平分线。",
                      shapes: [
                        { t: "poly", pts: [[30,65],[70,65],[50,30]], color: "known", width: 3 },
                        { t: "seg", a: [30,65], b: [50,30], color: "known", width: 3, ticks: 1 },
                        { t: "seg", a: [70,65], b: [50,30], color: "known", width: 3, ticks: 1 },
                        { t: "seg", a: [50,30], b: [50,65], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [50,30], label: "A", color: "known", r: 4 },
                        { t: "pt", p: [50,65], label: "D", color: "aux", r: 4 },
                        { t: "txt", p: [24,72], text: "B", size: 14 },
                        { t: "txt", p: [76,72], text: "C", size: 14 }
                      ]
                    },
                    {
                      caption: "第 2 步：沿 AD 对折——左半边“飞”向右半边。",
                      shapes: [
                        { t: "poly", pts: [[50,65],[70,65],[50,30]], color: "known", width: 3 },
                        { t: "poly", pts: [[40,60],[50,55],[50,38]], color: "known", width: 2, opacity: 0.5 },
                        { t: "seg", a: [50,30], b: [50,65], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,20], text: "正在对折……", size: 14, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：完全重合——B 落到 C 身上，严丝合缝！",
                      shapes: [
                        { t: "poly", pts: [[50,65],[70,65],[50,30]], color: "known", width: 3 },
                        { t: "seg", a: [50,30], b: [50,65], color: "target", width: 3.5 },
                        { t: "txt", p: [72,52], text: "B、C 重合！", size: 14, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：AD 既是顶角平分线，又是底边中线、底边高——三线合一就是这条对称轴。",
                      shapes: [
                        { t: "poly", pts: [[30,65],[70,65],[50,30]], color: "known", width: 3 },
                        { t: "seg", a: [50,30], b: [50,65], color: "target", width: 3.5 },
                        { t: "right", v: [50,65], p: [50,30], q: [70,65], size: 6, color: "target" },
                        { t: "txt", p: [50,18], text: "三线合一 = 对称轴", size: 15, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 3 步：B 和 C 压到了同一个位置——等腰三角形的两腰“长”到了一起。",
                "g04.1.5 我们对折过它，当时叫“三线合一”；现在它有了正式名字：轴对称，对称轴就是 AD。",
                "新名词认旧友：对称轴（就是 AD 这条线——顶角平分线、底边中线、底边高，三线合一）。"
              ],
              examples: [
                { text: "纸剪等腰三角形，沿 AD 对折验证重合", figure: "实物" }
              ],
              prev: "g10-u1-l3-p3",
              next: "g10-u1-l4-p2"
            },
            {
              id: "g10-u1-l4-p2",
              title: "三线合一就是对称轴",
              pageKind: "explain",
              concept: "对称视角下的三线合一",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{对称轴上的点到} B、C \\text{距离相等}",
                  translation: "对称轴上的点，到两底角顶点的距离相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：对称轴 AD 上的点 P，到 B、C 距离相等（两段同色等长刻度）。",
                      shapes: [
                        { t: "poly", pts: [[30,65],[70,65],[50,30]], color: "line", width: 2.5 },
                        { t: "seg", a: [50,30], b: [50,65], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "pt", p: [50,48], label: "P", color: "known", r: 5 },
                        { t: "seg", a: [50,48], b: [30,65], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [50,48], b: [70,65], color: "corrA", width: 3, ticks: 1 },
                        { t: "txt", p: [50,82], text: "PB = PC", size: 14, bold: true, color: "corrA", math: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得 g04.1.5 吗？我们把等腰三角形对折，两边重合——现在它叫轴对称。",
                "对称视角看三线合一：顶角平分线、底边中线、底边高是同一条直线——它就是对称轴。对称轴上每一点，到 B、C 距离都相等。",
                "生活例：金字塔的侧面、农村屋顶的人字梁。图形例：等边三角形有 3 条对称轴。",
                "反例：等腰三角形只有 1 条对称轴——别把底边上的“高线段”当对称轴，对称轴是无限长的直线。",
                "⚠️ 别搞混：中线是线段（有端点），对称轴是直线（无端点）。",
                "记住一句话：三线合一即对称轴。"
              ],
              examples: [
                { text: "人字梁：左右对称，梁柱就是对称轴", figure: "实物" },
                { text: "❌ 高线段 ≠ 对称轴：线段有端点，直线无限长", figure: "反例图" }
              ],
              prev: "g10-u1-l4-p1",
              next: "g10-u1-l4-p3"
            },
            {
              id: "g10-u1-l4-p3",
              title: "例题：用对称求角度",
              concept: "对称性质的应用",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle BAD = 40^{\\circ}",
                  translation: "角 BAD 等于 40 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：已知等腰 △ABC，AB=AC，AD 是对称轴交 BC 于 D，∠B=50°。",
                      shapes: [
                        { t: "poly", pts: [[30,65],[70,65],[50,41.2]], color: "known", width: 3 },
                        { t: "seg", a: [30,65], b: [50,41.2], color: "known", width: 3, ticks: 1 },
                        { t: "seg", a: [70,65], b: [50,41.2], color: "known", width: 3, ticks: 1 },
                        { t: "seg", a: [50,41.2], b: [50,65], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "arc", v: [30,65], a1: 310, a2: 0, r: 10, group: 1, color: "target" },
                        { t: "txt", p: [22,56], text: "50°", size: 13, color: "target" }
                      ]
                    },
                    {
                      caption: "第 2 步：对称 → ∠C = ∠B = 50°（对应角相等）。",
                      shapes: [
                        { t: "poly", pts: [[30,65],[70,65],[50,41.2]], color: "known", width: 3 },
                        { t: "arc", v: [30,65], a1: 310, a2: 0, r: 10, group: 1, color: "corrA" },
                        { t: "arc", v: [70,65], a1: 180, a2: 230, r: 10, group: 1, color: "corrA" },
                        { t: "txt", p: [22,56], text: "50°", size: 13, color: "corrA" },
                        { t: "txt", p: [78,56], text: "50°", size: 13, color: "corrA" }
                      ]
                    },
                    {
                      caption: "第 3 步：AD⊥BC（三线合一），∠BAD = 180°−90°−50° = 40°。",
                      shapes: [
                        { t: "poly", pts: [[30,65],[70,65],[50,41.2]], color: "known", width: 3 },
                        { t: "seg", a: [50,41.2], b: [50,65], color: "target", width: 3 },
                        { t: "right", v: [50,65], p: [50,41.2], q: [70,65], size: 6, color: "target" },
                        { t: "arc", v: [50,41.2], a1: 90, a2: 130, r: 10, group: 1, color: "target" },
                        { t: "txt", p: [44,42], text: "40°", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "第 2 步用“对称”：B、C 是对应点，对应角当然相等——不用再证一遍全等。",
                "第 3 步用“三线合一”：AD 既是角平分线又是高，∠ADB=90°。",
                "你看：对称的眼光让两步都变成“一句话”，这就是学变换的回报。"
              ],
              examples: [
                { text: "变式：∠A=100°，求∠B（对称→∠B=∠C=40°）", figure: "纸上算" }
              ],
              prev: "g10-u1-l4-p2",
              next: "g10-u1-l5-p1"
            }
          ]
        }
        ,
        /* ============ g10.1.5 旋转与中心对称（6 页，白队高风险必拆） ============ */
        {
          id: "g10-u1-l5",
          title: "旋转与中心对称",
          pages: [
            {
              id: "g10-u1-l5-p1",
              title: "旋转步进器：几转回原样",
              concept: "旋转是转的动作",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{旋转中心} + \\text{旋转方向} + \\text{旋转角度}",
                  translation: "讲清一次旋转：绕哪个点、往哪转、转多少度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  steps: [
                    {
                      caption: "第 1 步：时针指着 12——准备转。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 26, color: "line", width: 3 },
                        { t: "pt", p: [50,52], color: "target", r: 5 },
                        { t: "seg", a: [50,52], b: [50,74], color: "known", width: 4 },
                        { t: "txt", p: [50,88], text: "12 点", size: 14, color: "known" }
                      ]
                    },
                    {
                      caption: "第 2 步：顺时针转 90°——时针指到 3。",
                      shapes: [
                        { t: "circle", c: [50,52], r: 26, color: "line", width: 3 },
                        { t: "pt", p: [50,52], color: "target", r: 5 },
                        { t: "seg", a: [50,52], b: [50,74], color: "line", width: 2, dash: "5,4" },
                        { t: "seg", a: [50,52], b: [72,52], color: "known", width: 4 },
                        { t: "arc", v: [50,52], a1: 0, a2: 90, r: 14, color: "corrA" },
                        { t: "txt", p: [50,14], text: "转 90°", size: 14, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "第 3 步：雪花登场——每次转 60°，转 1 次。",
                      shapes: [
                        { t: "seg", a: [50,30], b: [50,74], color: "known", width: 3 },
                        { t: "seg", a: [31,41], b: [69,63], color: "known", width: 3 },
                        { t: "seg", a: [31,63], b: [69,41], color: "known", width: 3 },
                        { t: "pt", p: [50,52], color: "target", r: 5 },
                        { t: "txt", p: [50,16], text: "转 1 次：60°", size: 14, color: "known" }
                      ]
                    },
                    {
                      caption: "第 4 步：转 6 次——回到原样！6×60°=360°。",
                      shapes: [
                        { t: "seg", a: [50,30], b: [50,74], color: "corrA", width: 3.5 },
                        { t: "seg", a: [31,41], b: [69,63], color: "corrA", width: 3.5 },
                        { t: "seg", a: [31,63], b: [69,41], color: "corrA", width: 3.5 },
                        { t: "pt", p: [50,52], color: "target", r: 5 },
                        { t: "txt", p: [50,16], text: "转 6 次：回到原样！", size: 15, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "定格提问：雪花每次转 60°，转几次回到自己？（想好了点▶继续）",
                      shapes: [
                        { t: "seg", a: [50,30], b: [50,74], color: "line", width: 3 },
                        { t: "seg", a: [31,41], b: [69,63], color: "line", width: 3 },
                        { t: "seg", a: [31,63], b: [69,41], color: "line", width: 3 },
                        { t: "pt", p: [50,52], color: "target", r: 5 },
                        { t: "txt", p: [50,88], text: "6 次？5 次？（不判对错，只记录）", size: 13, color: "aux" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 4 步：雪花转 6 次回到原样——每次 60°，6×60°=360°，正好一圈。",
                "没变的是：转的过程中，雪花上每一点到中心的距离永远不变。",
                "旋转三要素缺一不可：绕哪个点（中心）、往哪转（方向）、转多少度（角度）。"
              ],
              examples: [
                { text: "钟表指针：绕表心顺时针转；旋转木马：绕中心转", figure: "实物" }
              ],
              prev: "g10-u1-l4-p3",
              next: "g10-u1-l5-p2"
            },
            {
              id: "g10-u1-l5-p2",
              title: "旋转三要素：中心·方向·角度",
              pageKind: "explain",
              concept: "旋转三要素",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{旋转} \\Rightarrow \\text{形状大小不变}",
                  translation: "旋转不改变图形的形状和大小"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：同转 90°，绕 A 转和绕 B 转，落点完全不一样——中心不能缺。",
                      shapes: [
                        { t: "poly", pts: [[25,60],[45,60],[35,42]], color: "known", width: 3 },
                        { t: "pt", p: [25,60], label: "A", color: "target", r: 5 },
                        { t: "pt", p: [65,60], label: "B", color: "target", r: 5 },
                        { t: "poly", pts: [[25,60],[25,40],[43,50]], close: true, color: "corrA", width: 2.5, dash: "5,4" },
                        { t: "poly", pts: [[65,60],[65,40],[83,50]], close: true, color: "corrB", width: 2.5, dash: "5,4" },
                        { t: "txt", p: [50,88], text: "只说“转 90°”不够：绕谁转？", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？雪花转 6 次回到原样——每次转 60°。",
                "旋转三要素：旋转中心（绕哪个点转，红点标出）、旋转方向（顺/逆时针）、旋转角度（转多少度）。",
                "缺一个，就说不清这次旋转。",
                "生活例：钟表指针（中心是表心，顺时针）、旋转木马、电风扇叶片。图形例：正方形绕中心转 90° 与自身重合。",
                "反例：只说“转了 90°”——绕 A 转还是绕 B 转？落点完全不一样（看配图）。",
                "⚠️ 别搞混：旋转不改变形状大小，但改变位置和朝向——和翻折（左右互换）不一样。",
                "记住一句话：中心方向角度，旋转三要素。"
              ],
              examples: [
                { text: "电风扇叶片：绕轴心转，中心·方向·角度都明确", figure: "实物" },
                { text: "❌ 只说“转 90°”：绕 A 和绕 B 落点完全不同", figure: "反例图" }
              ],
              prev: "g10-u1-l5-p1",
              next: "g10-u1-l5-p3"
            },
            {
              id: "g10-u1-l5-p3",
              title: "转 180°：风车回到自己",
              concept: "中心对称即旋转 180°",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{中心对称} = \\text{旋转} 180^{\\circ}",
                  translation: "中心对称就是绕一点旋转 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：四叶风车，中心 O（红点）。",
                      shapes: [
                        { t: "poly", pts: [[50,52],[62,64],[50,76],[38,64]], color: "known", width: 3 },
                        { t: "poly", pts: [[50,52],[62,40],[50,28],[38,40]], color: "known", width: 3, opacity: 0.45 },
                        { t: "pt", p: [50,52], label: "O", color: "target", r: 5 }
                      ]
                    },
                    {
                      caption: "第 2 步：转 90°——叶子位置变了，对不上原样。",
                      shapes: [
                        { t: "poly", pts: [[50,52],[62,40],[50,28],[38,40]], color: "known", width: 3 },
                        { t: "poly", pts: [[50,52],[62,64],[50,76],[38,64]], color: "known", width: 3, opacity: 0.45 },
                        { t: "pt", p: [50,52], label: "O", color: "target", r: 5 },
                        { t: "txt", p: [50,16], text: "转 90°：对不上", size: 14, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：转 180°（半圈）——和原来严丝合缝！",
                      shapes: [
                        { t: "poly", pts: [[50,52],[62,64],[50,76],[38,64]], color: "known", width: 3.5 },
                        { t: "poly", pts: [[50,52],[62,40],[50,28],[38,40]], color: "known", width: 3.5, opacity: 0.45 },
                        { t: "pt", p: [50,52], label: "O", color: "target", r: 5 },
                        { t: "txt", p: [50,16], text: "转 180°：完全重合！", size: 15, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：△ABC 绕 O 转 180° 得到 △A'B'C'，两者重合——这两个图形成中心对称。",
                      shapes: [
                        { t: "poly", pts: [[30,60],[48,60],[39,44]], color: "known", width: 3 },
                        { t: "poly", pts: [[70,44],[52,44],[61,60]], color: "target", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "aux", r: 5 },
                        { t: "seg", a: [39,52], b: [61,52], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,88], text: "绕 O 转 180°，△ABC 与 △A'B'C' 重合", size: 13, color: "aux", math: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 3 步：转半圈（180°），风车和原来“长”到了一起——这就是中心对称图形。",
                "第 4 步是两个图形的版本：一个绕 O 转 180° 与另一个重合——这两个图形成中心对称，O 叫对称中心。",
                "新名词认旧友：对称中心（就是风车转动的那个红点 O）。"
              ],
              examples: [
                { text: "方向盘转半圈：回到原样；扑克牌方块", figure: "实物" }
              ],
              prev: "g10-u1-l5-p2",
              next: "g10-u1-l5-p4"
            },
            {
              id: "g10-u1-l5-p4",
              title: "中心对称：连线过中心被平分",
              pageKind: "explain",
              concept: "中心对称的性质",
              formulas: [
                {
                  id: "f1",
                  latex: "OA = OA'",
                  translation: "对应点到对称中心的距离相等：OA 等于 OA'"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：对应点 A、A' 的连线经过 O，且 OA=OA'（两段同色等长刻度）。",
                      shapes: [
                        { t: "pt", p: [30,60], label: "A", color: "known", r: 5 },
                        { t: "pt", p: [70,44], label: "A'", color: "target", r: 5 },
                        { t: "pt", p: [50,52], label: "O", color: "aux", r: 5 },
                        { t: "seg", a: [30,60], b: [50,52], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [50,52], b: [70,44], color: "corrA", width: 3, ticks: 1 },
                        { t: "txt", p: [50,88], text: "连线过 O，且被 O 平分", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？风车转半圈（180°），和原来严丝合缝。",
                "中心对称的性质：对应点连线都经过对称中心 O，且被 O 平分（OA=OA'）。",
                "找对称中心：连两组对应点，交点就是 O。",
                "生活例：扑克牌方块、方向盘转半圈。图形例：线段的中点、圆的圆心都是对称中心。",
                "反例：等腰三角形转 180° 合不上——它不是中心对称图形（但它是轴对称图形）。",
                "⚠️ 别搞混：“成中心对称”是两个图形的关系；“中心对称图形”是一个图形自己的事。",
                "记住一句话：转 180° 能重合，就是中心对称。"
              ],
              examples: [
                { text: "找对称中心：连两组对应点，交点就是 O", figure: "作图" },
                { text: "❌ 等腰三角形转 180° 合不上：不是中心对称图形", figure: "反例图" }
              ],
              prev: "g10-u1-l5-p3",
              next: "g10-u1-l5-p5"
            },
            {
              id: "g10-u1-l5-p5",
              title: "彩蛋：平行四边形的正名",
              concept: "平行四边形是中心对称图形",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{平行四边形} \\Rightarrow \\text{中心对称图形}",
                  translation: "平行四边形是中心对称图形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：g06.1.1 的老朋友——平行四边形 ABCD，O 是对角线交点。",
                      shapes: [
                        { t: "poly", pts: [[30,40],[70,40],[60,68],[20,68]], color: "known", width: 3 },
                        { t: "seg", a: [30,40], b: [60,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [70,40], b: [20,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "pt", p: [45,54], label: "O", color: "target", r: 5 },
                        { t: "txt", p: [45,88], text: "g06 说过：它转 180° 能重合", size: 13, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 2 步：绕 O 转 90°——位置变了。",
                      shapes: [
                        { t: "poly", pts: [[45,32],[45,72],[59,62],[59,42]], color: "known", width: 3, opacity: 0.7 },
                        { t: "poly", pts: [[30,40],[70,40],[60,68],[20,68]], color: "line", width: 2, dash: "5,4" },
                        { t: "pt", p: [45,54], label: "O", color: "target", r: 5 }
                      ]
                    },
                    {
                      caption: "第 3 步：绕 O 转 180°——与原图严丝合缝！",
                      shapes: [
                        { t: "poly", pts: [[30,40],[70,40],[60,68],[20,68]], color: "known", width: 3.5 },
                        { t: "pt", p: [45,54], label: "O", color: "target", r: 5 },
                        { t: "txt", p: [45,16], text: "严丝合缝！", size: 15, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：兑现 g06 的伏笔——平行四边形是中心对称图形，对称中心是对角线交点。",
                      shapes: [
                        { t: "poly", pts: [[30,40],[70,40],[60,68],[20,68]], color: "known", width: 3 },
                        { t: "seg", a: [30,40], b: [60,68], color: "corrA", width: 2.5 },
                        { t: "seg", a: [70,40], b: [20,68], color: "corrA", width: 2.5 },
                        { t: "pt", p: [45,54], label: "O", color: "target", r: 5 },
                        { t: "txt", p: [45,88], text: "对称中心：对角线交点", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "g06.1.1 我们说过：平行四边形转 180° 能重合，当时只许看不许说——现在正名：它就是中心对称图形。",
                "对比雪花：每次 60° 转 6 次回原样；平行四边形每次 180°、转 2 次回原样——“几次回原样”看每次转的角度。",
                "对称中心是对角线交点 O：A 的对应点是 C，B 的对应点是 D，连线都过 O 且被 O 平分。",
                "这也是“对角线互相平分”的运动版说法——同一个事实，两种语言。"
              ],
              examples: [
                { text: "矩形、菱形、正方形：都是中心对称图形，对称中心都是对角线交点", figure: "家族" }
              ],
              prev: "g10-u1-l5-p4",
              next: "g10-u1-l5-p6"
            },
            {
              id: "g10-u1-l5-p6",
              title: "找一找：中心对称图形",
              concept: "辨认中心对称图形",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{转} 180^{\\circ} \\text{重合} \\Rightarrow \\text{中心对称图形}",
                  translation: "转 180 度能与自身重合的图形叫中心对称图形"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "是中心对称图形", color: "corrA" },
                    { name: "不是中心对称图形", color: "corrB" }
                  ],
                  base: [
                    { t: "poly", pts: [[14,62],[30,62],[26,78],[10,78]], color: "line", width: 2.5 },
                    { t: "circle", c: [70,70], r: 12, color: "line", width: 2.5 },
                    { t: "poly", pts: [[14,26],[30,26],[22,40]], color: "line", width: 2.5 },
                    { t: "seg", a: [58,26], b: [82,40], color: "line", width: 2.5 },
                    { t: "txt", p: [20,88], text: "①平行四边形", size: 11, color: "aux" },
                    { t: "txt", p: [70,88], text: "②圆", size: 11, color: "aux" },
                    { t: "txt", p: [22,48], text: "③等腰三角形", size: 11, color: "aux" },
                    { t: "txt", p: [70,48], text: "④线段", size: 11, color: "aux" }
                  ],
                  items: [
                    { id: "c1", label: "①", group: 0, anchor: [20,70],
                      shape: { t: "circle", c: [20,70], r: 13, color: "line", width: 1.5, dash: "4,3" } },
                    { id: "c2", label: "②", group: 0, anchor: [70,70],
                      shape: { t: "circle", c: [70,70], r: 15, color: "line", width: 1.5, dash: "4,3" } },
                    { id: "c3", label: "③", group: 1, anchor: [22,32],
                      shape: { t: "circle", c: [22,32], r: 11, color: "line", width: 1.5, dash: "4,3" } },
                    { id: "c4", label: "④", group: 0, anchor: [70,33],
                      shape: { t: "circle", c: [70,33], r: 11, color: "line", width: 1.5, dash: "4,3" } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "心里转 180°：哪个图形能和自己重合？点它，分进两篮。",
                "线段的对称中心是它的中点——别漏掉这个最不起眼的中心对称图形。",
                "等腰三角形为什么不是？转 180° 后尖角朝下，合不上原样。"
              ],
              examples: [
                { text: "答案：①②④ 是；③ 不是", figure: "核对" }
              ],
              prev: "g10-u1-l5-p5",
              next: "g10-u1-l6-p1"
            }
          ]
        }
        ,
        /* ============ g10.1.6 旋转与全等：运动的眼光（3 页） ============ */
        {
          id: "g10-u1-l6",
          title: "旋转与全等：运动的眼光",
          pages: [
            {
              id: "g10-u1-l6-p1",
              title: "三种运动，一个结果：重合",
              concept: "三种运动都不改变形状大小",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{平移} / \\text{轴对称} / \\text{旋转} \\Rightarrow \\text{形状大小不变}",
                  translation: "三种运动都不改变图形的形状和大小"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：三角形 ABC，和它的“目标位置”（虚线）。",
                      shapes: [
                        { t: "poly", pts: [[22,60],[44,60],[33,40]], color: "known", width: 3 },
                        { t: "poly", pts: [[62,60],[84,60],[73,40]], color: "line", width: 2, dash: "5,4" },
                        { t: "txt", p: [33,74], text: "△ABC", size: 13, math: true },
                        { t: "txt", p: [73,74], text: "目标位置", size: 13, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 2 步：平移——沿箭头滑过去，重合！",
                      shapes: [
                        { t: "poly", pts: [[62,60],[84,60],[73,40]], color: "known", width: 3.5 },
                        { t: "seg", a: [33,50], b: [68,50], color: "aux", width: 2.5, dash: "5,4" },
                        { t: "txt", p: [50,30], text: "平移：滑过去", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：轴对称——沿折线翻过去，重合！",
                      shapes: [
                        { t: "poly", pts: [[62,60],[84,60],[73,40]], color: "known", width: 3.5 },
                        { t: "seg", a: [50,25], b: [50,75], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,16], text: "轴对称：翻过去", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 4 步：旋转——绕 O 转过去，重合！三种动作，一个结果。",
                      shapes: [
                        { t: "poly", pts: [[62,60],[84,60],[73,40]], color: "known", width: 3.5 },
                        { t: "pt", p: [50,52], label: "O", color: "target", r: 5 },
                        { t: "arc", v: [50,52], a1: 160, a2: 20, r: 18, color: "corrA" },
                        { t: "txt", p: [50,16], text: "旋转：转过去", size: 14, bold: true, color: "known" },
                        { t: "txt", p: [50,88], text: "没变的是：形状和大小", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 2/3/4 步：滑过去、翻过去、转过去——三个动作，一个结果：完全重合。",
                "没变的是：形状和大小。不变的那个，就是全等要讲的东西。",
                "g02 学过平移，1.1 学过翻折，1.5 学过旋转——今天它们第一次“同台”。"
              ],
              examples: [
                { text: "搬桌子：平移搬、翻面搬、转着搬，桌子还是那张桌子", figure: "实物" }
              ],
              prev: "g10-u1-l5-p6",
              next: "g10-u1-l6-p2"
            },
            {
              id: "g10-u1-l6-p2",
              title: "全等即运动重合",
              pageKind: "explain",
              concept: "全等的运动本质",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{全等} \\Rightarrow \\text{经运动可重合}",
                  translation: "全等就是经过运动能完全重合"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "关键帧：g04.1.1 的“搬”——两个三角形叠到一起，严丝合缝。",
                      shapes: [
                        { t: "poly", pts: [[30,60],[55,60],[42,38]], color: "known", width: 3 },
                        { t: "poly", pts: [[30,60],[55,60],[42,38]], color: "target", width: 1.5, dash: "5,4" },
                        { t: "seg", a: [30,60], b: [55,60], color: "corrA", width: 3, ticks: 1 },
                        { t: "seg", a: [30,60], b: [55,60], color: "corrA", width: 3, ticks: 1 },
                        { t: "txt", p: [42,80], text: "“搬”过去，严丝合缝", size: 14, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得 g04.1.1 的那句话吗？把三角形“搬”过去盖住另一个——现在“搬”有了正式名字：平移、翻折、旋转。",
                "全等的本质：两个图形全等，当且仅当经过一次（或几次）运动能完全重合。",
                "SSS、SAS、ASA、AAS：给定这些条件，三角形形状就被“锁死”，搬过去一定重合——判定定理就是“锁死说明书”。",
                "例子：g04 用 SAS 搭三角形，“两边夹角固定、形状锁死”——现在看：锁死了，运动过去必重合。",
                "反例：只给两条边（没夹角），形状锁不死，搬过去可能合不上——所以“SSA”不能判定全等。",
                "⚠️ 别搞混：全等要求“形状大小都一样”；相似只要求“形状一样”（g09）——运动重合是全等的专属检验法。",
                "记住一句话：全等，就是经运动能重合。"
              ],
              examples: [
                { text: "复印机两张纸：平移一下就重合，所以全等", figure: "实物" }
              ],
              prev: "g10-u1-l6-p1",
              next: "g10-u1-l6-p3"
            },
            {
              id: "g10-u1-l6-p3",
              title: "运动找对应：转过去压住",
              concept: "用运动找对应边角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\triangle ABC \\cong \\triangle A'B'C'",
                  translation: "三角形 ABC 全等于三角形 A'B'C'"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 2000,
                  steps: [
                    {
                      caption: "第 1 步：两个三角形，位置不同，但看着“一样大”。",
                      shapes: [
                        { t: "poly", pts: [[22,62],[44,62],[33,42]], color: "known", width: 3 },
                        { t: "poly", pts: [[78,42],[56,42],[67,62]], color: "line", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "target", r: 4 },
                        { t: "txt", p: [50,88], text: "全等吗？转过去看看", size: 13, color: "aux" }
                      ]
                    },
                    {
                      caption: "第 2 步：绕 O 旋转，A 落到 A' 身上（同色标记）。",
                      shapes: [
                        { t: "poly", pts: [[78,42],[56,42],[67,62]], color: "known", width: 3 },
                        { t: "pt", p: [33,42], label: "A", color: "corrA", r: 5 },
                        { t: "pt", p: [67,62], label: "A'", color: "corrA", r: 5 },
                        { t: "pt", p: [50,52], label: "O", color: "target", r: 4 },
                        { t: "txt", p: [50,16], text: "A → A'：压住了", size: 14, bold: true, color: "corrA" }
                      ]
                    },
                    {
                      caption: "第 3 步：B→B'，C→C' 依次落定——对应边同色。",
                      shapes: [
                        { t: "poly", pts: [[78,42],[56,42],[67,62]], color: "known", width: 3 },
                        { t: "seg", a: [56,42], b: [78,42], color: "corrB", width: 3.5, ticks: 2 },
                        { t: "seg", a: [78,42], b: [67,62], color: "corrC", width: 3.5, ticks: 1 },
                        { t: "txt", p: [50,16], text: "对应边：同色等长", size: 14, bold: true, color: "corrB" }
                      ]
                    },
                    {
                      caption: "第 4 步：转过去压在一起的，就是对应顶点——对应边、对应角一次找齐。",
                      shapes: [
                        { t: "poly", pts: [[78,42],[56,42],[67,62]], color: "known", width: 3.5 },
                        { t: "txt", p: [67,80], text: "△ABC ≌ △A'B'C'", size: 14, bold: true, color: "known", math: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "找对应不用再“看字母顺序”：转过去，压在一起的就是对应顶点。",
                "对应边画同色、标同刻度——全书统一的颜色约定（g04 就这么认的）。",
                "这招以后一直有用：g11 面积割补、g13 解析几何，找对应都靠“运动过去压住”。"
              ],
              examples: [
                { text: "拼图：拿起一块转一转，严丝合缝处就是对应边", figure: "实物" }
              ],
              prev: "g10-u1-l6-p2",
              next: "g10-u1-l7-p1"
            }
          ]
        },
        /* ============ g10.1.7 本章小结与习题（2 页） ============ */
        {
          id: "g10-u1-l7",
          title: "本章小结与习题",
          pages: [
            {
              id: "g10-u1-l7-p1",
              title: "小结：三变换对照表",
              pageKind: "explain",
              concept: "本章小结",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{全等} \\Rightarrow \\text{经运动可重合}",
                  translation: "全等就是经过运动能完全重合"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "平移（g02）：变了位置；没变：形状、大小、朝向。",
                      shapes: [
                        { t: "poly", pts: [[25,60],[45,60],[35,42]], color: "line", width: 2.5, dash: "5,4" },
                        { t: "poly", pts: [[55,60],[75,60],[65,42]], color: "known", width: 3 },
                        { t: "seg", a: [35,51], b: [60,51], color: "aux", width: 2.5, dash: "5,4" },
                        { t: "txt", p: [50,82], text: "平移：滑过去", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "轴对称（1.1–1.4）：变了位置、朝向（左右翻）；没变：形状、大小。",
                      shapes: [
                        { t: "poly", pts: [[25,60],[45,60],[35,42]], color: "known", width: 3 },
                        { t: "poly", pts: [[75,60],[55,60],[65,42]], color: "known", width: 3 },
                        { t: "seg", a: [50,35], b: [50,67], color: "aux", width: 2.5, dash: "6,4" },
                        { t: "txt", p: [50,82], text: "轴对称：翻过去", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "旋转（1.5）：变了位置、朝向；没变：形状、大小。",
                      shapes: [
                        { t: "poly", pts: [[30,60],[50,60],[40,42]], color: "line", width: 2.5, dash: "5,4" },
                        { t: "poly", pts: [[60,52],[76,62],[62,70]], color: "known", width: 3 },
                        { t: "pt", p: [50,52], label: "O", color: "target", r: 5 },
                        { t: "txt", p: [50,82], text: "旋转：转过去", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "共同不变量：形状和大小——这就是全等的底气（1.6）。",
                      shapes: [
                        { t: "txt", p: [50,60], text: "平移 / 翻折 / 旋转", size: 16, bold: true, color: "known" },
                        { t: "txt", p: [50,42], text: "都不改变形状和大小", size: 15, bold: true, color: "corrA" },
                        { t: "txt", p: [50,24], text: "→ 全等即运动重合", size: 14, color: "aux" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "平移（g02.2.4）：变了位置；没变的是形状、大小、朝向。",
                "轴对称（1.1–1.4）：变了位置和朝向（左右翻）；没变的是形状、大小。",
                "旋转（1.5）：变了位置和朝向；没变的是形状、大小。",
                "一条线：三种运动的共同不变量是形状和大小——全等（1.6）就立在这上面。",
                "预告：下一章 g11——运动不改变面积，割补法就靠它。"
              ],
              examples: [],
              prev: "g10-u1-l6-p3",
              next: "g10-u1-l7-p2"
            },
            {
              id: "g10-u1-l7-p2",
              title: "本章习题：6 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{对称} / \\text{旋转} / \\text{运动重合}",
                  translation: "轴对称、旋转、运动重合看全等"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "是轴对称图形", color: "corrA" },
                    { name: "不是轴对称图形", color: "corrB" }
                  ],
                  base: [
                    { t: "poly", pts: [[14,66],[30,66],[22,80]], color: "line", width: 2.5 },
                    { t: "poly", pts: [[56,62],[80,62],[74,78],[62,78]], color: "line", width: 2.5 },
                    { t: "circle", c: [22,30], r: 11, color: "line", width: 2.5 },
                    { t: "poly", pts: [[58,22],[82,22],[78,38],[62,38]], color: "line", width: 2.5 },
                    { t: "txt", p: [22,92], text: "①等腰三角形", size: 11, color: "aux" },
                    { t: "txt", p: [68,92], text: "②平行四边形", size: 11, color: "aux" },
                    { t: "txt", p: [22,48], text: "③圆", size: 11, color: "aux" },
                    { t: "txt", p: [68,48], text: "④一般梯形", size: 11, color: "aux" }
                  ],
                  items: [
                    { id: "e1", label: "①", group: 0, anchor: [22,73],
                      shape: { t: "circle", c: [22,73], r: 12, color: "line", width: 1.5, dash: "4,3" } },
                    { id: "e2", label: "②", group: 1, anchor: [68,70],
                      shape: { t: "circle", c: [68,70], r: 13, color: "line", width: 1.5, dash: "4,3" } },
                    { id: "e3", label: "③", group: 0, anchor: [22,30],
                      shape: { t: "circle", c: [22,30], r: 14, color: "line", width: 1.5, dash: "4,3" } },
                    { id: "e4", label: "④", group: 1, anchor: [70,30],
                      shape: { t: "circle", c: [70,30], r: 12, color: "line", width: 1.5, dash: "4,3" } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "1．认图：4 个图形分两篮——是 / 不是轴对称图形。",
                "2．方格纸上，点 A 在竖线 l 左侧 3 格，它的对称点 A' 在哪？（自查：被 l 垂直平分吗？）",
                "3．A、A' 到对称轴都是 3cm，求 AA' 的长。",
                "4．正方形绕中心旋转多少度，第一次与自身重合？",
                "5．等边三角形几条对称轴？一般的平行四边形几条？",
                "6．纸对折两次剪一刀，展开几个洞？用对称解释。"
              ],
              examples: [
                { figure: "核对答案", text: "1．①③是；②④不是。2．l 右侧 3 格。3．6cm。4．90°。5．3 条；0 条。6．4 个洞（一刀变四洞）。" }
              ,
                { figure: "错因解析", text: "认图：轴对称=沿一条直线对折重合——找那条折痕。1．对称点到轴等距：A' 在 l 右侧 3 格——用“被 l 垂直平分”自查。2．AA' 被轴垂直平分：3+3=6cm。3．正方形旋转对称：360°/4=90° 转一次就重合。4．等边三角形 3 条对称轴；一般平行四边形没有对称轴（0 条）——别和矩形混了。5．对折两次=4 层：一刀穿 4 层，展开 4 个洞——对称操作可叠加。" }],
              prev: "g10-u1-l7-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
