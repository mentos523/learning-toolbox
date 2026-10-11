/* ============================================================
 * 学习工具箱 · 数学 · 几何 g04：全等三角形
 *
 * 黄队（教育教学专家）生产：1 单元 / 8 课 / 26 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g04 章）
 * 教学设计：docs/math-geometry-pedagogy.md v1.1
 * 参数手册：docs/math-geometry-params.md v1.1
 * 白队一屏预算评审：/tmp/white_geom_budget_g01_g04.md（g04 20→26 页）
 *
 * 页构成：
 *   g04.1.1 全等的概念            2 页  P1 compare-toggle  P2 讲解（含"运动重合"预埋）
 *   g04.1.2 SSS 判定              3 页  P1 compare-toggle  P2 讲解  P3 construction-step（作三角形）
 *   g04.1.3 SAS 判定              2 页  P1 step-play（夹角锁死） P2 讲解
 *   g04.1.4 ASA 与 AAS 判定        4 页  P1 step-play（ASA 实验） P2 讲解  P3 proof-replay（AAS 证明） P4 讲解（+HL 预告）
 *   g04.1.5 等腰三角形的性质      5 页  P1 step-play（对折） P2 讲解（等边对等角） P3 proof-replay（其证明）
 *                                 P4 proof-replay（三线合一证明） P5 讲解（三线合一 + 对称轴预告）
 *   g04.1.6 判定与等边三角形      3 页  P1 proof-replay（等角对等边） P2 讲解（互逆） P3 讲解（等边）
 *   g04.1.7 尺规作图（一）        5 页  P1–P4 construction-step（作线段/作角/作角平分线/作垂线） P5 讲解（作图即全等）
 *   g04.1.8 本章小结与习题        2 页  P1 小结  P2 习题
 *
 * 本章新增交互（参数手册 v1.1 未收录，按 pedagogy §4.1/§4.2/§9.2 口径）：
 *   construction-step（作图步骤机）：params.steps 每项 {text（一句话指令≤15字，动词开头）,
 *     why（"为什么这样画"折叠条，人话依据）, shapes（帧 DSL，同 step-play）}；步骤 ≤ 6 步。
 *   proof-replay（证明慢放机）：params.steps 每项 {card（人话卡片≤40字）,
 *     reason（"为什么可以"依据：已知/定理名/页码）, shapes（帧 DSL）}；步骤 ≤ 5 步。
 *
 * 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 / corrA·corrB·corrC=对应组 /
 *   corrAngle=对应角 / line=普通线 / aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g04"] = {
  id: "g04",
  title: "全等三角形",
  units: [
    {
      id: "g04-u1",
      title: "全等与判定",
      lessons: [
        /* ============ g04.1.1 全等的概念（2 页） ============ */
        {
          id: "g04-u1-l1",
          title: "全等的概念",
          pages: [
            {
              id: "g04-u1-l1-p1",
              title: "拼图：严丝合缝才算全等",
              concept: "全等",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{全等} = \\text{完全重合}",
                  translation: "全等，就是两个图形能完全重合"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "严丝合缝",
                      caption: "两个三角形叠上去，边压边、角压角，严丝合缝——这就是全等。",
                      shapes: [
                        { t: "poly", pts: [[18,64],[54,64],[36,30]], color: "known", width: 3 },
                        { t: "poly", pts: [[18,64],[54,64],[36,30]], color: "target", width: 2, dash: "5,4" },
                        { t: "seg", a: [18,64], b: [54,64], ticks: 1, color: "known" },
                        { t: "seg", a: [54,64], b: [36,30], ticks: 2, color: "known" },
                        { t: "arc", v: [18,64], a1: 0, a2: 55, r: 9, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,76], text: "完全重合", size: 14, bold: true }
                      ]
                    },
                    {
                      label: "套不进去",
                      caption: "小三角形轮廓和大的一样，但小一圈——贴合却盖不满，这是相似，不是全等。",
                      shapes: [
                        { t: "poly", pts: [[18,64],[58,64],[38,30]], color: "line", width: 3 },
                        { t: "poly", pts: [[30,58],[50,58],[40,42]], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,76], text: "轮廓贴合，盖不满", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“严丝合缝”：两张“复印纸”叠在一起，边和角全压住。",
                "点“套不进去”：小三角形轮廓贴合大三角形，但怎么都盖不满。",
                "记住：全等 = 形状大小都一样，能完全重合。"
              ],
              examples: [
                { text: "拼图：两块能严丝合缝拼上的拼图", figure: "实物" }
              ],
              prev: null,
              next: "g04-u1-l1-p2"
            },
            {
              id: "g04-u1-l1-p2",
              title: "全等：能完全重合",
              pageKind: "explain",
              concept: "全等形、对应边、对应角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\triangle ABC \\cong \\triangle DEF",
                  translation: "三角形 ABC 全等于三角形 DEF：对应边相等、对应角相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两个全等三角形——对应边同色刻度，对应角同色弧线。",
                      shapes: [
                        { t: "poly", pts: [[12,62],[42,62],[27,34]], color: "known", width: 3 },
                        { t: "seg", a: [12,62], b: [42,62], ticks: 1, color: "corrA" },
                        { t: "seg", a: [42,62], b: [27,34], ticks: 2, color: "corrB" },
                        { t: "seg", a: [27,34], b: [12,62], ticks: 3, color: "corrC" },
                        { t: "arc", v: [12,62], a1: 0, a2: 60, r: 8, group: 1, color: "corrAngle" },
                        { t: "poly", pts: [[58,62],[88,62],[73,34]], color: "known", width: 3 },
                        { t: "seg", a: [58,62], b: [88,62], ticks: 1, color: "corrA" },
                        { t: "seg", a: [88,62], b: [73,34], ticks: 2, color: "corrB" },
                        { t: "seg", a: [73,34], b: [58,62], ticks: 3, color: "corrC" },
                        { t: "arc", v: [58,62], a1: 0, a2: 60, r: 8, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,20], text: "对应边同色，对应角同弧", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页你把两个三角形叠到一起，严丝合缝——这就是全等。",
                "人话：全等，就是“能完全重合”——像复印机印出来的两张纸（全等形）。",
                "生活例：两扇一模一样的门；图形例：三边标记同色的两个三角形。",
                "反例：照片放大版，形状一样但大小不同——那叫相似，不是全等。",
                "对应边/角：叠上去压在一起的边和角，全书用同色标记。",
                "⚠️ 别搞混：全等是“重合”，相似是“同形”；全等要求大小也一样。",
                "点拨预埋：把一个三角形“搬”过去盖住另一个——这个“搬”的动作，第 10 章会正名。",
                "记住一句话：全等要重合，相似只同形。"
              ],
              examples: [
                { text: "两扇一样的门；镜子内外翻折过去能重合，镜像也算全等", figure: "实物" }
              ],
              prev: "g04-u1-l1-p1",
              next: "g04-u1-l2-p1"
            }
          ]
        },
        /* ============ g04.1.2 SSS 判定（3 页） ============ */
        {
          id: "g04-u1-l2",
          title: "SSS 判定",
          pages: [
            {
              id: "g04-u1-l2-p1",
              title: "拉一拉：四边形晃，三角形不晃",
              concept: "三角形稳定性",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三边对应相等} \\Rightarrow \\text{全等}",
                  translation: "三条边对应相等，两个三角形就全等（SSS）"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "拉四边形",
                      caption: "四根木条钉成的四边形，一拉就变形——边长定了，形状没定。",
                      shapes: [
                        { t: "poly", pts: [[25,65],[65,70],[60,35],[20,30]], color: "target", width: 3.5 },
                        { t: "seg", a: [25,65], b: [65,70], ticks: 1, color: "target" },
                        { t: "txt", p: [45,80], text: "会晃", size: 15, bold: true, color: "target" }
                      ]
                    },
                    {
                      label: "拉三角形",
                      caption: "三根木条钉成的三角形，怎么拉都不变形——三边定了，形状就定了。",
                      shapes: [
                        { t: "poly", pts: [[25,35],[65,35],[45,65]], color: "known", width: 3.5 },
                        { t: "seg", a: [25,35], b: [65,35], ticks: 1, color: "known" },
                        { t: "seg", a: [65,35], b: [45,65], ticks: 2, color: "known" },
                        { t: "seg", a: [45,65], b: [25,35], ticks: 3, color: "known" },
                        { t: "txt", p: [45,80], text: "纹丝不动", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“拉四边形”：四条边长度不变，形状却能晃来晃去。",
                "点“拉三角形”：三条边钉死，形状也被钉死了——这叫三角形的稳定性。",
                "想一想：为什么三条边就能“锁死”形状？"
              ],
              examples: [
                { text: "自行车架、三角架：越是承重的地方越爱用三角形", figure: "实物" }
              ],
              prev: "g04-u1-l1-p2",
              next: "g04-u1-l2-p2"
            },
            {
              id: "g04-u1-l2-p2",
              title: "SSS：三边定，形状定",
              pageKind: "explain",
              concept: "边边边判定",
              formulas: [
                {
                  id: "f1",
                  latex: "AB=DE,\\ BC=EF,\\ CA=FD \\Rightarrow \\triangle ABC \\cong \\triangle DEF",
                  translation: "三组对应边分别相等，两个三角形全等，记作 SSS"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：三组对应边同色——三边定了，两个三角形只能长一个样。",
                      shapes: [
                        { t: "poly", pts: [[12,62],[42,62],[27,34]], color: "known", width: 3 },
                        { t: "seg", a: [12,62], b: [42,62], ticks: 1, color: "corrA" },
                        { t: "seg", a: [42,62], b: [27,34], ticks: 2, color: "corrB" },
                        { t: "seg", a: [27,34], b: [12,62], ticks: 3, color: "corrC" },
                        { t: "poly", pts: [[58,62],[88,62],[73,34]], color: "known", width: 3 },
                        { t: "seg", a: [58,62], b: [88,62], ticks: 1, color: "corrA" },
                        { t: "seg", a: [88,62], b: [73,34], ticks: 2, color: "corrB" },
                        { t: "seg", a: [73,34], b: [58,62], ticks: 3, color: "corrC" },
                        { t: "txt", p: [50,20], text: "SSS：边边边", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？三根木条钉死的三角形，怎么拉都不变形——三边定了，形状就定了。",
                "人话：两个三角形的三条边对应相等，它们一定全等——边边边，简称 SSS。",
                "生活例：搭积木——给定三条边，你只能搭出一种三角形，同学搭的和你的一模一样。",
                "反例：四边形三条边定了，第四条还能晃——四边形没有“SSS”。",
                "⚠️ 别搞混：“对应”二字不能丢——AB 对 DE、BC 对 EF、CA 对 FD，位置不能乱。",
                "记住一句话：三边定，形状定。"
              ],
              examples: [
                { text: "衣架厂质检：量三条边，就知道两个衣架是不是一样", figure: "实物" }
              ],
              prev: "g04-u1-l2-p1",
              next: "g04-u1-l2-p3"
            },
            {
              id: "g04-u1-l2-p3",
              title: "跟做：已知三边，画三角形",
              concept: "作三角形（SSS 应用）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{已知三边} \\Rightarrow \\text{画出唯一的三角形}",
                  translation: "已知三条边的长度，就能画出形状唯一的三角形"
                }
              ],
              interaction: {
                type: "construction-step",
                params: {
                  steps: [
                    {
                      text: "画线段 BC，等于最长的边 a",
                      why: "先定一条边当“地基”；作线段等于已知线段（g04.1.7 P1）",
                      shapes: [
                        { t: "seg", a: [25,45], b: [65,45], color: "known", width: 3.5 },
                        { t: "pt", p: [25,45], label: "B", color: "known" },
                        { t: "pt", p: [65,45], label: "C", color: "known" },
                        { t: "txt", p: [45,56], text: "a（最长边）", size: 13 }
                      ]
                    },
                    {
                      text: "以B为圆心、b为半径画弧",
                      why: "圆规保证：弧上每一点到 B 的距离都是 b",
                      shapes: [
                        { t: "seg", a: [25,45], b: [65,45], color: "line", width: 2 },
                        { t: "circle", c: [25,45], r: 28, color: "aux", dash: "5,4" },
                        { t: "txt", p: [25,80], text: "半径 = b", size: 13 }
                      ]
                    },
                    {
                      text: "以C为圆心、c为半径画弧",
                      why: "弧上每一点到 C 的距离都是 c",
                      shapes: [
                        { t: "seg", a: [25,45], b: [65,45], color: "line", width: 2 },
                        { t: "circle", c: [25,45], r: 28, color: "aux", dash: "5,4" },
                        { t: "circle", c: [65,45], r: 34, color: "aux", dash: "5,4" },
                        { t: "txt", p: [65,80], text: "半径 = c", size: 13 }
                      ]
                    },
                    {
                      text: "标出两弧的交点 A",
                      why: "交点到 B 是 b、到 C 是 c——三边全对上了",
                      shapes: [
                        { t: "seg", a: [25,45], b: [65,45], color: "line", width: 2 },
                        { t: "circle", c: [25,45], r: 28, color: "aux", dash: "5,4" },
                        { t: "circle", c: [65,45], r: 34, color: "aux", dash: "5,4" },
                        { t: "pt", p: [40,68], label: "A", color: "target" }
                      ]
                    },
                    {
                      text: "连 AB、AC，三角形画好了",
                      why: "三边定的三角形形状唯一——这就是 SSS 的施工图",
                      shapes: [
                        { t: "poly", pts: [[25,45],[65,45],[40,68]], color: "known", width: 3.5 },
                        { t: "pt", p: [25,45], label: "B", color: "known" },
                        { t: "pt", p: [65,45], label: "C", color: "known" },
                        { t: "pt", p: [40,68], label: "A", color: "known" },
                        { t: "txt", p: [45,80], text: "三边 a、b、c 全对上", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "跟做：点“下一步”，看三边怎么“长”成三角形（倒带可重看）。",
                "半径一变，交点就跑了——圆规的距离就是“长度不变”的保证。",
                "三边定的三角形形状唯一——SSS 的施工图长这样。"
              ],
              examples: [
                { text: "木工放样：按三条边在木板上画出三角形", figure: "实物" }
              ],
              prev: "g04-u1-l2-p2",
              next: "g04-u1-l3-p1"
            }
          ]
        }
,
        /* ============ g04.1.3 SAS 判定（2 页） ============ */
        {
          id: "g04-u1-l3",
          title: "SAS 判定",
          pages: [
            {
              id: "g04-u1-l3-p1",
              title: "夹角一固定，三角形被“锁死”",
              concept: "两边夹角定形状",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{两边及夹角对应相等} \\Rightarrow \\text{全等}",
                  translation: "两边和它们的夹角对应相等，两个三角形就全等（SAS）"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：两条边 AB、AC，中间夹着角 ∠A。",
                      shapes: [
                        { t: "seg", a: [40,60], b: [24,36], color: "known", width: 3.5 },
                        { t: "seg", a: [40,60], b: [66,42], color: "known", width: 3.5 },
                        { t: "pt", p: [40,60], label: "A", color: "known" },
                        { t: "arc", v: [40,60], a1: 195, a2: 240, r: 11, group: 1, color: "corrAngle" },
                        { t: "txt", p: [40,76], text: "两边 + 夹角", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：夹角张大一点，B、C 的位置全变了。",
                      shapes: [
                        { t: "seg", a: [40,60], b: [24,36], color: "known", width: 3.5 },
                        { t: "seg", a: [40,60], b: [70,30], color: "known", width: 3.5 },
                        { t: "seg", a: [24,36], b: [70,30], color: "aux", dash: "5,4" },
                        { t: "arc", v: [40,60], a1: 195, a2: 225, r: 11, group: 1, color: "corrAngle" },
                        { t: "txt", p: [40,76], text: "角一变，形就变", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：夹角固定回原样，B、C 只能这样连——锁死了。",
                      shapes: [
                        { t: "poly", pts: [[40,60],[24,36],[66,42]], color: "known", width: 3.5 },
                        { t: "arc", v: [40,60], a1: 195, a2: 240, r: 11, group: 1, color: "corrAngle" },
                        { t: "txt", p: [40,76], text: "角一定，形一定", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 2 步：夹角一张大，整个三角形全变了样。",
                "看第 3 步：夹角固定，第三条边只能有一种接法——被“锁死”。",
                "这就是边角边：两边夹角定了，形状就定了。"
              ],
              examples: [
                { text: "剪刀：两臂长度固定，开合角定了，刀尖距离就定了", figure: "实物" }
              ],
              prev: "g04-u1-l2-p3",
              next: "g04-u1-l3-p2"
            },
            {
              id: "g04-u1-l3-p2",
              title: "SAS：两边夹角，锁死形状",
              pageKind: "explain",
              concept: "边角边判定",
              formulas: [
                {
                  id: "f1",
                  latex: "AB=DE,\\ \\angle A=\\angle D,\\ AC=DF \\Rightarrow \\triangle ABC \\cong \\triangle DEF",
                  translation: "两边和夹角对应相等，两个三角形全等，记作 SAS"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两组对应边同色，中间的夹角同弧——SAS。",
                      shapes: [
                        { t: "poly", pts: [[14,62],[44,62],[30,34]], color: "known", width: 3 },
                        { t: "seg", a: [14,62], b: [44,62], ticks: 1, color: "corrA" },
                        { t: "seg", a: [44,62], b: [30,34], ticks: 2, color: "corrB" },
                        { t: "arc", v: [44,62], a1: 110, a2: 180, r: 9, group: 1, color: "corrAngle" },
                        { t: "poly", pts: [[58,62],[88,62],[74,34]], color: "known", width: 3 },
                        { t: "seg", a: [58,62], b: [88,62], ticks: 1, color: "corrA" },
                        { t: "seg", a: [88,62], b: [74,34], ticks: 2, color: "corrB" },
                        { t: "arc", v: [88,62], a1: 110, a2: 180, r: 9, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,20], text: "SAS：边角边", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？两条边夹着角固定，第三条边只能有一种接法——锁死了。",
                "人话：两边加它们中间的角，三角形就定了——边角边，简称 SAS。",
                "生活例：做衣架——两边长度和夹角定了，衣架的形状就定了。",
                "反例：两边加一个“不在中间”的角——B、C 还能有别的接法，锁不死。",
                "⚠️ 别搞混：这个角必须是两条边的“夹角”，位置不能乱。",
                "记住一句话：两边夹角，锁死形状。"
              ],
              examples: [
                { text: "衣架：两边夹角固定，形状就定了", figure: "实物" }
              ],
              prev: "g04-u1-l3-p1",
              next: "g04-u1-l4-p1"
            }
          ]
        },
        /* ============ g04.1.4 ASA 与 AAS 判定（4 页） ============ */
        {
          id: "g04-u1-l4",
          title: "ASA 与 AAS 判定",
          pages: [
            {
              id: "g04-u1-l4-p1",
              title: "实验：两角一夹边，扫出唯一三角形",
              concept: "ASA 实验",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{两角及夹边对应相等} \\Rightarrow \\text{全等}",
                  translation: "两个角和它们的夹边对应相等，两个三角形就全等（ASA）"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：先画好夹边 BC。",
                      shapes: [
                        { t: "seg", a: [25,40], b: [65,40], color: "known", width: 3.5 },
                        { t: "pt", p: [25,40], label: "B", color: "known" },
                        { t: "pt", p: [65,40], label: "C", color: "known" },
                        { t: "txt", p: [45,52], text: "夹边 BC", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：在 B、C 两端立起两个已知的角。",
                      shapes: [
                        { t: "seg", a: [25,40], b: [65,40], color: "known", width: 3.5 },
                        { t: "ray", p: [25,40], ang: 50, len: 32, color: "known", width: 2.5 },
                        { t: "ray", p: [65,40], ang: 120, len: 32, color: "known", width: 2.5 },
                        { t: "arc", v: [25,40], a1: 0, a2: 50, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [65,40], a1: 120, a2: 180, r: 10, group: 2, color: "corrAngle" },
                        { t: "txt", p: [45,76], text: "两角立起来", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：两条射线交于 A——三角形唯一出现。",
                      shapes: [
                        { t: "poly", pts: [[25,40],[65,40],[49,68]], color: "known", width: 3.5 },
                        { t: "arc", v: [25,40], a1: 0, a2: 50, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [65,40], a1: 120, a2: 180, r: 10, group: 2, color: "corrAngle" },
                        { t: "pt", p: [49,68], label: "A", color: "known" },
                        { t: "txt", p: [45,82], text: "只能长这一个样", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 2 步：两角像两盏探照灯，从 B、C 两端照出去。",
                "看第 3 步：两束光交于一点——三角形只能长这一个样。",
                "这就是角边角：两角一夹边，扫出唯一三角形。"
              ],
              examples: [
                { text: "测河宽：量一边两角，就能算出对岸的距离", figure: "实测" }
              ],
              prev: "g04-u1-l3-p2",
              next: "g04-u1-l4-p2"
            },
            {
              id: "g04-u1-l4-p2",
              title: "ASA：两角夹一边",
              pageKind: "explain",
              concept: "角边角判定",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle B=\\angle E,\\ BC=EF,\\ \\angle C=\\angle F \\Rightarrow \\triangle ABC \\cong \\triangle DEF",
                  translation: "两角和夹边对应相等，两个三角形全等，记作 ASA"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两组对应角同弧，中间的夹边同色——ASA。",
                      shapes: [
                        { t: "poly", pts: [[14,60],[54,60],[38,32]], color: "known", width: 3 },
                        { t: "arc", v: [14,60], a1: 0, a2: 55, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [54,60], a1: 125, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "seg", a: [14,60], b: [54,60], ticks: 1, color: "corrA" },
                        { t: "poly", pts: [[62,60],[92,60],[76,32]], color: "known", width: 3, dash: "5,4" },
                        { t: "txt", p: [50,20], text: "ASA：角边角", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？两角加中间的夹边，射线一交，三角形只能长一个样。",
                "人话：两个角加它们中间的边——角边角，简称 ASA。",
                "生活例：老师只告诉你底边多长、两底角多大，你画出的三角形和同学的一模一样。",
                "反例：只有两个角相等、没有边——大小定不下来（那是相似，不是全等）。",
                "⚠️ 别搞混：这条边必须是两个角“中间”的那条，位置不能乱。",
                "记住一句话：两角夹一边，扫出唯一形。"
              ],
              examples: [
                { text: "木工复制三角板：量一夹边两角，复制分毫不差", figure: "实物" }
              ],
              prev: "g04-u1-l4-p1",
              next: "g04-u1-l4-p3"
            },
            {
              id: "g04-u1-l4-p3",
              title: "慢放证明：AAS 为什么成立",
              concept: "AAS 证明",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{两角及一对边对应相等} \\Rightarrow \\text{全等}",
                  translation: "两个角和其中一角的对边对应相等，两个三角形就全等（AAS）"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      card: "已知：∠B=∠E、∠C=∠F，AB=DE。先算第三个角。",
                      reason: "已知条件（蓝色）；求证：两三角形全等（红色）",
                      shapes: [
                        { t: "poly", pts: [[14,66],[46,66],[30,42]], color: "line", width: 3 },
                        { t: "poly", pts: [[54,66],[86,66],[70,42]], color: "line", width: 3 },
                        { t: "arc", v: [14,66], a1: 0, a2: 58, r: 9, group: 1, color: "known" },
                        { t: "arc", v: [46,66], a1: 122, a2: 180, r: 9, group: 2, color: "known" },
                        { t: "arc", v: [54,66], a1: 0, a2: 58, r: 9, group: 1, color: "known" },
                        { t: "arc", v: [86,66], a1: 122, a2: 180, r: 9, group: 2, color: "known" },
                        { t: "seg", a: [14,66], b: [30,42], ticks: 1, color: "known" },
                        { t: "seg", a: [54,66], b: [70,42], ticks: 1, color: "known" }
                      ]
                    },
                    {
                      card: "∠A=180°−∠B−∠C，∠D=180°−∠E−∠F，所以 ∠A=∠D。",
                      reason: "三角形内角和 180°（g03.1.3）＋等量代换",
                      shapes: [
                        { t: "poly", pts: [[14,66],[46,66],[30,42]], color: "line", width: 3 },
                        { t: "poly", pts: [[54,66],[86,66],[70,42]], color: "line", width: 3 },
                        { t: "arc", v: [30,42], a1: 238, a2: 302, r: 9, group: 3, color: "target" },
                        { t: "arc", v: [70,42], a1: 238, a2: 302, r: 9, group: 3, color: "target" },
                        { t: "txt", p: [50,28], text: "第三个角也相等", size: 13, bold: true }
                      ]
                    },
                    {
                      card: "现在 AB 变成了 ∠B、∠A 的夹边——条件变成了 ASA。",
                      reason: "夹边就是两角中间那条边；AB 原是 ∠C 的对边，现在正好夹在 ∠B 和 ∠A 中间",
                      shapes: [
                        { t: "poly", pts: [[14,66],[46,66],[30,42]], color: "line", width: 3 },
                        { t: "poly", pts: [[54,66],[86,66],[70,42]], color: "line", width: 3 },
                        { t: "seg", a: [14,66], b: [30,42], ticks: 1, color: "target", width: 4 },
                        { t: "seg", a: [54,66], b: [70,42], ticks: 1, color: "target", width: 4 },
                        { t: "txt", p: [50,28], text: "AB：两角的夹边", size: 13, bold: true }
                      ]
                    },
                    {
                      card: "由 ASA，△ABC ≌ △DEF。AAS 得证。",
                      reason: "ASA 判定（本课 P1）：两角及夹边对应相等",
                      shapes: [
                        { t: "poly", pts: [[14,66],[46,66],[30,42]], color: "corrA", width: 3.5 },
                        { t: "poly", pts: [[54,66],[86,66],[70,42]], color: "corrA", width: 3.5 },
                        { t: "txt", p: [50,80], text: "AAS：角角边", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "慢放：点 ▶，看每一步画布上哪个部位在动。",
                "关键一步：第 3 步——这条边“变身”成了两角的夹边。",
                "点“为什么可以？”：每个“因为”都有出处。",
                "想一想：AAS 的证明用到了哪条已学过的定理？"
              ],
              examples: [
                { text: "证明阅读三问：已知是什么？求证是什么？第一步为什么敢算第三角？", figure: "方法" }
              ],
              prev: "g04-u1-l4-p2",
              next: "g04-u1-l4-p4"
            },
            {
              id: "g04-u1-l4-p4",
              title: "AAS：两角一对边",
              pageKind: "explain",
              concept: "角角边判定",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle B=\\angle E,\\ \\angle C=\\angle F,\\ AB=DE \\Rightarrow \\triangle ABC \\cong \\triangle DEF",
                  translation: "两角和其中一角的对边对应相等，两个三角形全等，记作 AAS"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两组对应角同弧，一条对边同色——AAS。",
                      shapes: [
                        { t: "poly", pts: [[14,62],[44,62],[29,34]], color: "known", width: 3 },
                        { t: "arc", v: [14,62], a1: 0, a2: 58, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [44,62], a1: 122, a2: 180, r: 9, group: 2, color: "corrAngle" },
                        { t: "seg", a: [44,62], b: [29,34], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,20], text: "AAS：角角边", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？慢放证明里，两角定了，第三个角就定了（内角和 180°）。",
                "人话：两个角加一个角的对边——角角边，简称 AAS。",
                "为什么成立？第三个角一定，这条边就变成了“夹边”——AAS 其实是 ASA 的化身。",
                "生活例：只知道两角和一条对边，照样能复制出同样的三角形。",
                "⚠️ 别搞混：边角边、角边角、角角边——名字里的“边”在哪，位置不能乱。",
                "预告：直角三角形还有第五种判定，学完勾股定理揭晓（g05.1.5）。",
                "记住一句话：两角一边，对应关系对了就全等。"
              ],
              examples: [
                { text: "ASA 与 AAS 对照：都是“两角一边”，边的“位置”不同", figure: "对比" }
              ],
              prev: "g04-u1-l4-p3",
              next: "g04-u1-l5-p1"
            }
          ]
        }
,
        /* ============ g04.1.5 等腰三角形的性质（5 页，两条证明链） ============ */
        {
          id: "g04-u1-l5",
          title: "等腰三角形的性质",
          pages: [
            {
              id: "g04-u1-l5-p1",
              title: "对折：两边严丝合缝",
              concept: "等腰三角形对称直观",
              formulas: [
                {
                  id: "f1",
                  latex: "AB=AC \\Rightarrow \\text{对折重合}",
                  translation: "两腰相等的三角形，沿中间对折能完全重合"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：等腰三角形 ABC，AB=AC，AD 是中间的折痕。",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "known", width: 3.5 },
                        { t: "seg", a: [50,74], b: [24,34], ticks: 1, color: "corrA" },
                        { t: "seg", a: [50,74], b: [76,34], ticks: 1, color: "corrA" },
                        { t: "seg", a: [50,74], b: [50,34], color: "aux", dash: "5,4" },
                        { t: "pt", p: [50,74], label: "A", color: "known" },
                        { t: "pt", p: [24,34], label: "B", color: "known" },
                        { t: "pt", p: [76,34], label: "C", color: "known" },
                        { t: "txt", p: [50,86], text: "AB = AC（两腰）", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：沿 AD 对折，左半翻到右半去。",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "aux", width: 2, dash: "5,4" },
                        { t: "poly", pts: [[50,74],[50,34],[76,34]], color: "known", width: 3.5 },
                        { t: "seg", a: [50,74], b: [76,34], ticks: 1, color: "corrA" },
                        { t: "seg", a: [50,74], b: [50,34], color: "aux", dash: "5,4" },
                        { t: "txt", p: [50,86], text: "翻过去……", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：完全重合——两底角压在一起，两腰压在一起。",
                      shapes: [
                        { t: "poly", pts: [[50,74],[50,34],[76,34]], color: "known", width: 3.5 },
                        { t: "arc", v: [76,34], a1: 125, a2: 180, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,34], a1: 90, a2: 145, r: 10, group: 1, color: "corrAngle" },
                        { t: "seg", a: [50,74], b: [76,34], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,86], text: "∠B 与 ∠C 重合", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "看第 3 步：对折后，∠B 和 ∠C 严丝合缝压在一起。",
                "变了什么：左半翻到了右边；没变的是：两底角相等、两腰重合。",
                "对折看到的规律，下一页我们用文字说出来。"
              ],
              examples: [
                { text: "剪纸：剪个等腰三角形对折，两边严丝合缝", figure: "实测" }
              ],
              prev: "g04-u1-l4-p4",
              next: "g04-u1-l5-p2"
            },
            {
              id: "g04-u1-l5-p2",
              title: "性质 1：等边对等角",
              pageKind: "explain",
              concept: "等边对等角",
              formulas: [
                {
                  id: "f1",
                  latex: "AB=AC \\Rightarrow \\angle B=\\angle C",
                  translation: "等腰三角形中，相等的两边所对的两个角也相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两腰同色，底角同弧——等边对等角。",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "known", width: 3.5 },
                        { t: "seg", a: [50,74], b: [24,34], ticks: 1, color: "corrA" },
                        { t: "seg", a: [50,74], b: [76,34], ticks: 1, color: "corrA" },
                        { t: "arc", v: [24,34], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [76,34], a1: 125, a2: 180, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,20], text: "等边对等角", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？对折后，两底角严丝合缝压在一起——它们相等。",
                "人话：等腰三角形，两条相等的边（腰）对着的两个角（底角）也相等——等边对等角。",
                "生活例：衣架——挂钩在中点，两边一样长才不歪；屋顶人字梁两边坡度一样。",
                "反例：不等边三角形，对折后两边压不到一起——角也不等。",
                "⚠️ 别搞混：“等边”指的是两腰相等，“对等角”指的是它们对面的底角。",
                "记住一句话：腰等，则底角等。"
              ],
              examples: [
                { text: "衣架：两边一样长，挂起来才不歪", figure: "实物" }
              ],
              prev: "g04-u1-l5-p1",
              next: "g04-u1-l5-p3"
            },
            {
              id: "g04-u1-l5-p3",
              title: "慢放证明：等边对等角",
              concept: "等边对等角证明",
              formulas: [
                {
                  id: "f1",
                  latex: "AB=AC \\Rightarrow \\angle B=\\angle C",
                  translation: "用 SAS 全等证明：等边对等角"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      card: "已知 AB=AC。作顶角平分线 AD（辅助线）。",
                      reason: "已知（蓝色）；辅助线：灰色虚线，自己添的",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "line", width: 3 },
                        { t: "seg", a: [50,74], b: [24,34], ticks: 1, color: "known" },
                        { t: "seg", a: [50,74], b: [76,34], ticks: 1, color: "known" },
                        { t: "seg", a: [50,74], b: [50,34], color: "aux", dash: "5,4", width: 2.5 },
                        { t: "pt", p: [50,34], label: "D", color: "aux" }
                      ]
                    },
                    {
                      card: "∠BAD=∠CAD——AD 是顶角的平分线。",
                      reason: "角平分线定义（g01.2.2）：平分线把角分成两个相等的角",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "line", width: 3 },
                        { t: "seg", a: [50,74], b: [50,34], color: "aux", dash: "5,4", width: 2.5 },
                        { t: "arc", v: [50,74], a1: 235, a2: 262, r: 10, group: 1, color: "target" },
                        { t: "arc", v: [50,74], a1: 278, a2: 305, r: 10, group: 1, color: "target" }
                      ]
                    },
                    {
                      card: "△ABD ≌ △ACD：AB=AC、∠BAD=∠CAD、AD=AD。",
                      reason: "SAS 判定（g04.1.3）：两边及夹角对应相等",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[50,34]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[50,74],[76,34],[50,34]], color: "corrB", width: 3 },
                        { t: "seg", a: [50,74], b: [50,34], color: "aux", dash: "5,4", width: 2.5 }
                      ]
                    },
                    {
                      card: "∠B=∠C——全等三角形对应角相等。得证。",
                      reason: "全等性质（g04.1.1）：对应角相等",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "known", width: 3 },
                        { t: "arc", v: [24,34], a1: 0, a2: 55, r: 10, group: 1, color: "target" },
                        { t: "arc", v: [76,34], a1: 125, a2: 180, r: 10, group: 1, color: "target" },
                        { t: "txt", p: [50,86], text: "∠B = ∠C", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "慢放：点 ▶，看辅助线 AD 如何“造”出两个三角形。",
                "关键一步：第 3 步——两个小三角形用 SAS 全等了。",
                "对折是“看到”，证明是“说清为什么”——两套语言，一个结论。",
                "下一页：用这个结论再证第二条性质。",
              ],
              examples: [
                { text: "证明阅读三问：已知是什么？求证是什么？为什么敢作 AD？", figure: "方法" }
              ],
              prev: "g04-u1-l5-p2",
              next: "g04-u1-l5-p4"
            },
            {
              id: "g04-u1-l5-p4",
              title: "慢放证明：三线合一",
              concept: "三线合一证明",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{顶角平分线} = \\text{底边中线} = \\text{底边高}",
                  translation: "等腰三角形中，顶角平分线、底边中线、底边上的高是同一条线"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      card: "承接上页：已证 △ABD ≌ △ACD。",
                      reason: "P3 的阶段性结论，本页接着用",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[50,34]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[50,74],[76,34],[50,34]], color: "corrB", width: 3 },
                        { t: "seg", a: [50,74], b: [50,34], color: "aux", dash: "5,4", width: 2.5 },
                        { t: "txt", p: [50,86], text: "从“已证全等”出发", size: 13 }
                      ]
                    },
                    {
                      card: "BD=CD——AD 是底边 BC 的中线。",
                      reason: "全等对应边相等；中线定义（g03.1.2）：连顶点与对边中点",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "line", width: 3 },
                        { t: "seg", a: [24,34], b: [50,34], ticks: 1, color: "target" },
                        { t: "seg", a: [50,34], b: [76,34], ticks: 1, color: "target" },
                        { t: "txt", p: [50,86], text: "BD = CD：中线", size: 13, bold: true }
                      ]
                    },
                    {
                      card: "∠ADB=∠ADC=90°——AD 是底边的高。",
                      reason: "对应角相等＋两角互补（平角 180°）→ 都是 90°",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "line", width: 3 },
                        { t: "seg", a: [50,74], b: [50,34], color: "target", width: 3.5 },
                        { t: "right", v: [50,34], p: [24,34], q: [50,74], size: 7, color: "target" },
                        { t: "txt", p: [50,86], text: "∠ADB = 90°：高", size: 13, bold: true }
                      ]
                    },
                    {
                      card: "AD 又是角平分线、又是中线、又是高——三线合一。",
                      reason: "同一条 AD，身兼三职",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "known", width: 3 },
                        { t: "seg", a: [50,74], b: [50,34], color: "target", width: 4 },
                        { t: "txt", p: [50,86], text: "三线合一", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "慢放：点 ▶，看同一条 AD 如何“身兼三职”。",
                "关键一步：第 3 步——两个 90° 是怎么算出来的？（互补又相等）",
                "想一想：为什么普通三角形没有三线合一？"
              ],
              examples: [
                { text: "折痕 AD：既是角平分线，又是中线，又是高", figure: "实测" }
              ],
              prev: "g04-u1-l5-p3",
              next: "g04-u1-l5-p5"
            },
            {
              id: "g04-u1-l5-p5",
              title: "性质 2：三线合一",
              pageKind: "explain",
              concept: "三线合一",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{顶角平分线} = \\text{底边中线} = \\text{底边高}",
                  translation: "等腰三角形顶角平分线、底边中线、底边高三线合一"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：对折的折痕——它既是角平分线，又是中线，又是高。",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "known", width: 3.5 },
                        { t: "seg", a: [50,74], b: [50,34], color: "target", width: 4 },
                        { t: "seg", a: [24,34], b: [50,34], ticks: 1, color: "corrA" },
                        { t: "seg", a: [50,34], b: [76,34], ticks: 1, color: "corrA" },
                        { t: "right", v: [50,34], p: [24,34], q: [50,74], size: 7, color: "target" },
                        { t: "txt", p: [50,86], text: "一条线，三种身份", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？对折的折痕 AD——它既是角平分线，又是中线，又是高，三条线合成一条。",
                "人话：等腰三角形里，顶角平分线、底边中线、底边上的高是同一条线——三线合一。",
                "生活例：衣架的挂钩线——挂正了（中线）、两边对称（角平分线）、垂直（高），全是这一条。",
                "反例：普通三角形画这三条线，是三条不同的线——只有等腰才合一。",
                "⚠️ 别搞混：说的是“顶角”的平分线和“底边”的中线/高，位置不能乱。",
                "预告：这条折痕就是等腰三角形的对称轴——第 10 章我们再看它。",
                "记住一句话：等腰一张纸，折痕即三线。"
              ],
              examples: [
                { text: "金字塔侧面：中轴线即三线合一", figure: "实物" }
              ],
              prev: "g04-u1-l5-p4",
              next: "g04-u1-l6-p1"
            }
          ]
        }
,
        /* ============ g04.1.6 等腰三角形的判定与等边三角形（3 页） ============ */
        {
          id: "g04-u1-l6",
          title: "等腰三角形的判定与等边三角形",
          pages: [
            {
              id: "g04-u1-l6-p1",
              title: "慢放证明：等角对等边",
              concept: "等角对等边证明",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle B=\\angle C \\Rightarrow AB=AC",
                  translation: "有两个角相等的三角形是等腰三角形"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  steps: [
                    {
                      card: "已知 ∠B=∠C。作顶角平分线 AD（辅助线）。",
                      reason: "已知（蓝色）；辅助线：灰色虚线",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "line", width: 3 },
                        { t: "arc", v: [24,34], a1: 0, a2: 55, r: 10, group: 1, color: "known" },
                        { t: "arc", v: [76,34], a1: 125, a2: 180, r: 10, group: 1, color: "known" },
                        { t: "seg", a: [50,74], b: [50,34], color: "aux", dash: "5,4", width: 2.5 },
                        { t: "pt", p: [50,34], label: "D", color: "aux" }
                      ]
                    },
                    {
                      card: "∠BAD=∠CAD，AD 是公共边。",
                      reason: "角平分线定义；公共边相等（自己等于自己）",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "line", width: 3 },
                        { t: "arc", v: [50,74], a1: 235, a2: 262, r: 10, group: 2, color: "target" },
                        { t: "arc", v: [50,74], a1: 278, a2: 305, r: 10, group: 2, color: "target" },
                        { t: "seg", a: [50,74], b: [50,34], color: "target", width: 3.5 }
                      ]
                    },
                    {
                      card: "△ABD ≌ △ACD（AAS）：两角及一对边。",
                      reason: "AAS 判定（g04.1.4）：∠B=∠C、∠BAD=∠CAD、AD=AD",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[50,34]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[50,74],[76,34],[50,34]], color: "corrB", width: 3 }
                      ]
                    },
                    {
                      card: "AB=AC——对应边相等，原三角形是等腰的。",
                      reason: "全等对应边相等（g04.1.1）",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "known", width: 3 },
                        { t: "seg", a: [50,74], b: [24,34], ticks: 1, color: "target" },
                        { t: "seg", a: [50,74], b: [76,34], ticks: 1, color: "target" },
                        { t: "txt", p: [50,86], text: "AB = AC：等腰", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "慢放：点 ▶，和上一课的证明对比——辅助线一样，用的判定不同。",
                "上一课：已知边等，用 SAS 证角等；这一课：已知角等，用 AAS 证边等。",
                "这就是“互逆”：条件和结论换了位置，证明照样走得通。"
              ],
              examples: [
                { text: "对照 g04.1.5 P3：同一张图，两个方向的证明", figure: "对比" }
              ],
              prev: "g04-u1-l5-p5",
              next: "g04-u1-l6-p2"
            },
            {
              id: "g04-u1-l6-p2",
              title: "判定：等角对等边",
              pageKind: "explain",
              concept: "等腰三角形判定",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle B=\\angle C \\Rightarrow AB=AC",
                  translation: "等角对等边：有两个角相等的三角形是等腰三角形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两底角同弧 → 两腰同色——等角对等边。",
                      shapes: [
                        { t: "poly", pts: [[50,74],[24,34],[76,34]], color: "known", width: 3.5 },
                        { t: "arc", v: [24,34], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [76,34], a1: 125, a2: 180, r: 10, group: 1, color: "corrAngle" },
                        { t: "seg", a: [50,74], b: [24,34], ticks: 1, color: "corrA" },
                        { t: "seg", a: [50,74], b: [76,34], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,20], text: "性质 ⇆ 判定：互逆", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "性质是“已知等腰 → 底角相等”；判定反过来：“已知底角相等 → 是等腰”——互逆。",
                "人话：一个三角形有两个角相等，它就是等腰三角形——等角对等边。",
                "生活例：屋顶两边坡度一样，梁就是等腰的——工人师傅量角就行，不用量边。",
                "反例：三个角都不相等——肯定不是等腰的。",
                "⚠️ 别搞混：判定用“角”推“边”，性质用“边”推“角”，别走反。",
                "记住一句话：角等，则腰等。"
              ],
              examples: [
                { text: "质检员：只量两个底角，就知道这根梁是不是等腰", figure: "实物" }
              ],
              prev: "g04-u1-l6-p1",
              next: "g04-u1-l6-p3"
            },
            {
              id: "g04-u1-l6-p3",
              title: "等边三角形：三边等，三角六十",
              pageKind: "explain",
              concept: "等边三角形",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三边相等} \\Rightarrow \\text{三角都是} 60\\text{度}",
                  translation: "等边三角形：三条边相等，三个角都是 60 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：三边同色三刻度，三角同弧 60°——等边三角形。",
                      shapes: [
                        { t: "poly", pts: [[50,73],[28,35],[72,35]], color: "known", width: 3.5 },
                        { t: "seg", a: [50,73], b: [28,35], ticks: 1, color: "corrA" },
                        { t: "seg", a: [28,35], b: [72,35], ticks: 1, color: "corrA" },
                        { t: "seg", a: [72,35], b: [50,73], ticks: 1, color: "corrA" },
                        { t: "arc", v: [28,35], a1: 0, a2: 60, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [72,35], a1: 120, a2: 180, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,73], a1: 240, a2: 300, r: 9, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,20], text: "60° × 3 = 180°", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "等边三角形：三条边都相等——任取两边都是腰，它一定是等腰的。",
                "判定 1：三边相等 → 等边（定义）。",
                "判定 2：三个角都是 60° → 等边（等角对等边，三边全等）。",
                "为什么 60°？三角和 180°，三个相等的角只能各 60°。",
                "生活例：警示三角牌——三边等、三角 60°，立得稳。",
                "⚠️ 别搞混：等边一定等腰，等腰不一定等边。",
                "记住一句话：三边等，或三角六十。"
              ],
              examples: [
                { text: "三角警示牌、金字塔侧面：等边最稳", figure: "实物" }
              ],
              prev: "g04-u1-l6-p2",
              next: "g04-u1-l7-p1"
            }
          ]
        },
        /* ============ g04.1.7 尺规作图（一）（5 页） ============ */
        {
          id: "g04-u1-l7",
          title: "尺规作图（一）",
          pages: [
            {
              id: "g04-u1-l7-p1",
              title: "作图 1：作一条线段等于已知线段",
              concept: "作等长线段",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{圆规量取} \\Rightarrow \\text{等长线段}",
                  translation: "用圆规把已知线段的长度“搬”到另一条射线上"
                }
              ],
              interaction: {
                type: "construction-step",
                params: {
                  steps: [
                    {
                      text: "用圆规量出已知线段的长度",
                      why: "圆规两脚的距离就是长度——量好别动",
                      shapes: [
                        { t: "seg", a: [15,62], b: [45,62], color: "known", width: 3.5 },
                        { t: "txt", p: [30,74], text: "已知线段", size: 13 },
                        { t: "circle", c: [15,62], r: 30, color: "aux", dash: "5,4" }
                      ]
                    },
                    {
                      text: "画一条射线，定起点 A",
                      why: "新线段得有个起点",
                      shapes: [
                        { t: "seg", a: [15,62], b: [45,62], color: "line", width: 2 },
                        { t: "ray", p: [55,62], ang: 0, len: 35, color: "line", width: 2.5 },
                        { t: "pt", p: [55,62], label: "A", color: "known" }
                      ]
                    },
                    {
                      text: "以A为圆心画弧交射线于B",
                      why: "圆规距离没变，AB 和已知线段等长",
                      shapes: [
                        { t: "seg", a: [15,62], b: [45,62], color: "line", width: 2 },
                        { t: "ray", p: [55,62], ang: 0, len: 35, color: "line", width: 2.5 },
                        { t: "circle", c: [55,62], r: 30, color: "aux", dash: "5,4" },
                        { t: "pt", p: [85,62], label: "B", color: "target" }
                      ]
                    },
                    {
                      text: "线段 AB 就是要作的线段",
                      why: "AB 的长度 = 圆规量出的长度",
                      shapes: [
                        { t: "seg", a: [55,62], b: [85,62], color: "target", width: 4 },
                        { t: "seg", a: [15,62], b: [45,62], color: "line", width: 2, dash: "5,4" },
                        { t: "txt", p: [70,74], text: "AB = 已知线段", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "跟做：点“下一步”，圆规的距离就是“长度不变”的保证。",
                "这是所有作图的基本功——后面的作图都要用它“搬”长度。",
                "点“为什么这样画？”：每一步的依据都写在里面。"
              ],
              examples: [
                { text: "木工：用圆规在木料上截取等长木条", figure: "实物" }
              ],
              prev: "g04-u1-l6-p3",
              next: "g04-u1-l7-p2"
            },
            {
              id: "g04-u1-l7-p2",
              title: "作图 2：作一个角等于已知角",
              concept: "作等角（SSS 应用）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{SSS} \\Rightarrow \\text{对应角相等}",
                  translation: "复制三边造全等，对应角就相等了"
                }
              ],
              interaction: {
                type: "construction-step",
                params: {
                  steps: [
                    {
                      text: "画一条射线 O′A′",
                      why: "新角得有个顶点和一条边",
                      shapes: [
                        { t: "seg", a: [18,60], b: [40,72], color: "known", width: 3 },
                        { t: "seg", a: [18,60], b: [42,52], color: "known", width: 3 },
                        { t: "pt", p: [18,60], label: "O", color: "known" },
                        { t: "ray", p: [58,60], ang: 0, len: 30, color: "line", width: 2.5 },
                        { t: "pt", p: [58,60], label: "O′", color: "known" },
                        { t: "txt", p: [30,84], text: "已知角", size: 13 }
                      ]
                    },
                    {
                      text: "以O为圆心画弧交两边于MN",
                      why: "在已知角两边截等长：OM=ON",
                      shapes: [
                        { t: "seg", a: [18,60], b: [40,72], color: "known", width: 3 },
                        { t: "seg", a: [18,60], b: [42,52], color: "known", width: 3 },
                        { t: "circle", c: [18,60], r: 16, color: "aux", dash: "5,4" },
                        { t: "pt", p: [32.05,67.66], label: "M", color: "known" },
                        { t: "pt", p: [33.18,54.94], label: "N", color: "known" },
                        { t: "ray", p: [58,60], ang: 0, len: 30, color: "line", width: 2.5 }
                      ]
                    },
                    {
                      text: "以O′为圆心画弧交射线于M′",
                      why: "保证 O′M′=OM——第一条对应边对上了",
                      shapes: [
                        { t: "seg", a: [18,60], b: [40,72], color: "line", width: 2 },
                        { t: "seg", a: [18,60], b: [42,52], color: "line", width: 2 },
                        { t: "ray", p: [58,60], ang: 0, len: 30, color: "line", width: 2.5 },
                        { t: "circle", c: [58,60], r: 16, color: "aux", dash: "5,4" },
                        { t: "pt", p: [74,60], label: "M′", color: "known" }
                      ]
                    },
                    {
                      text: "以M′为圆心画弧截得N′",
                      why: "保证 M′N′=MN——三边对上了",
                      shapes: [
                        { t: "ray", p: [58,60], ang: 0, len: 30, color: "line", width: 2.5 },
                        { t: "circle", c: [58,60], r: 16, color: "aux", dash: "5,4" },
                        { t: "circle", c: [74,60], r: 12, color: "aux", dash: "5,4" },
                        { t: "pt", p: [68,71], label: "N′", color: "target" }
                      ]
                    },
                    {
                      text: "连 O′N′，新角画好了",
                      why: "SSS：三边对应相等→两三角形全等→对应角相等",
                      shapes: [
                        { t: "seg", a: [58,60], b: [88,60], color: "known", width: 3 },
                        { t: "seg", a: [58,60], b: [68,71], color: "target", width: 3.5 },
                        { t: "arc", v: [58,60], a1: 0, a2: 45, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [70,82], text: "∠A′O′B′ = ∠AOB", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "跟做：点“下一步”——你其实在“复制”一个三角形。",
                "三段长度 OM、ON、MN 全搬过去了——SSS 全等，对应角必相等。",
                "这就是“作图即全等”：作图成功，靠的是全等判定。"
              ],
              examples: [
                { text: "装修：复制墙角的角度到另一块板材上", figure: "实物" }
              ],
              prev: "g04-u1-l7-p1",
              next: "g04-u1-l7-p3"
            },
            {
              id: "g04-u1-l7-p3",
              title: "作图 3：作角的平分线",
              concept: "作角平分线",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{SSS} \\Rightarrow \\angle AOP=\\angle BOP",
                  translation: "造两个全等三角形，对应角相等，平分线就出来了"
                }
              ],
              interaction: {
                type: "construction-step",
                params: {
                  steps: [
                    {
                      text: "以O为圆心画弧交两边于AB",
                      why: "在两边截等长：OA=OB",
                      shapes: [
                        { t: "seg", a: [30,60], b: [58,74], color: "known", width: 3 },
                        { t: "seg", a: [30,60], b: [60,48], color: "known", width: 3 },
                        { t: "circle", c: [30,60], r: 22, color: "aux", dash: "5,4" },
                        { t: "pt", p: [48,70], label: "A", color: "known" },
                        { t: "pt", p: [50,53], label: "B", color: "known" }
                      ]
                    },
                    {
                      text: "以A为圆心大于AB一半画弧",
                      why: "半径太小，两弧碰不到面",
                      shapes: [
                        { t: "seg", a: [30,60], b: [58,74], color: "line", width: 2 },
                        { t: "seg", a: [30,60], b: [60,48], color: "line", width: 2 },
                        { t: "circle", c: [48,70], r: 20, color: "aux", dash: "5,4" }
                      ]
                    },
                    {
                      text: "以B为圆心同半径画弧交于P",
                      why: "保证 PA=PB——对称的两条边",
                      shapes: [
                        { t: "seg", a: [30,60], b: [58,74], color: "line", width: 2 },
                        { t: "seg", a: [30,60], b: [60,48], color: "line", width: 2 },
                        { t: "circle", c: [48,70], r: 20, color: "aux", dash: "5,4" },
                        { t: "circle", c: [50,53], r: 20, color: "aux", dash: "5,4" },
                        { t: "pt", p: [66.95,63.61], label: "P", color: "target" }
                      ]
                    },
                    {
                      text: "连 OP，OP 就是角平分线",
                      why: "SSS：△OAP≌△OBP→∠AOP=∠BOP",
                      shapes: [
                        { t: "seg", a: [30,60], b: [58,74], color: "known", width: 3 },
                        { t: "seg", a: [30,60], b: [60,48], color: "known", width: 3 },
                        { t: "seg", a: [30,60], b: [66.95,63.61], color: "target", width: 4 },
                        { t: "arc", v: [30,60], a1: 8, a2: 20, r: 12, group: 1, color: "corrAngle" },
                        { t: "arc", v: [30,60], a1: 20, a2: 32, r: 12, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,84], text: "∠AOP = ∠BOP", size: 13, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "跟做：点“下一步”——P 点是两条弧“商量”出来的交点。",
                "为什么是平分线？OA=OB、PA=PB、OP=OP——SSS 全等，对应角相等。",
                "想一想：第二步为什么强调“大于 AB 一半”？"
              ],
              examples: [
                { text: "折纸：对折纸角，折痕就是角平分线——和尺规作图一个道理", figure: "实测" }
              ],
              prev: "g04-u1-l7-p2",
              next: "g04-u1-l7-p4"
            },
            {
              id: "g04-u1-l7-p4",
              title: "作图 4：过一点作已知直线的垂线",
              concept: "作垂线",
              formulas: [
                {
                  id: "f1",
                  latex: "PA=PB,\\ QA=QB \\Rightarrow PQ \\perp \\text{直线}",
                  translation: "P、Q 都在 AB 的“正中间”，连线就是垂线"
                }
              ],
              interaction: {
                type: "construction-step",
                params: {
                  steps: [
                    {
                      text: "以P为圆心画弧交直线于AB",
                      why: "PA=PB：P 在 AB 的“正中间”",
                      shapes: [
                        { t: "seg", a: [15,40], b: [85,40], color: "known", width: 3 },
                        { t: "pt", p: [50,66], label: "P", color: "known" },
                        { t: "circle", c: [50,66], r: 32, color: "aux", dash: "5,4" },
                        { t: "pt", p: [28,40], label: "A", color: "known" },
                        { t: "pt", p: [72,40], label: "B", color: "known" }
                      ]
                    },
                    {
                      text: "以A为圆心大于AB一半画弧",
                      why: "给两弧一个相遇的机会",
                      shapes: [
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 2 },
                        { t: "pt", p: [50,66], label: "P", color: "line" },
                        { t: "circle", c: [28,40], r: 30, color: "aux", dash: "5,4" }
                      ]
                    },
                    {
                      text: "以B为圆心同半径画弧交于Q",
                      why: "QA=QB：Q 也在 AB 的“正中间”",
                      shapes: [
                        { t: "seg", a: [15,40], b: [85,40], color: "line", width: 2 },
                        { t: "circle", c: [28,40], r: 30, color: "aux", dash: "5,4" },
                        { t: "circle", c: [72,40], r: 30, color: "aux", dash: "5,4" },
                        { t: "pt", p: [50,16], label: "Q", color: "target" }
                      ]
                    },
                    {
                      text: "连 PQ，PQ 就是垂线",
                      why: "SSS 全等→对应角→PQ⊥直线（等腰三线合一也行）",
                      shapes: [
                        { t: "seg", a: [15,40], b: [85,40], color: "known", width: 3 },
                        { t: "seg", a: [50,66], b: [50,16], color: "target", width: 4 },
                        { t: "right", v: [50,40], p: [15,40], q: [50,66], size: 7, color: "target" },
                        { t: "txt", p: [50,82], text: "PQ ⊥ 直线", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "跟做：点“下一步”——P 和 Q 两个“正中间”的点，定出一条垂线。",
                "g02 课上我们用三角板推过垂线；这是尺规版——只用圆规直尺，一样画出来。",
                "4 步画完——没超 6 步，一页装得下。"
              ],
              examples: [
                { text: "泥瓦匠：用绳子和钉子在地上画直角", figure: "实物" }
              ],
              prev: "g04-u1-l7-p3",
              next: "g04-u1-l7-p5"
            },
            {
              id: "g04-u1-l7-p5",
              title: "作图即全等",
              pageKind: "explain",
              concept: "作图原理",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{尺规作图} = \\text{全等判定的施工图}",
                  translation: "每一种尺规作图，背后都是一次全等判定"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：四种作图，一种原理——复制长度，造全等。",
                      shapes: [
                        { t: "txt", p: [50,80], text: "作线段 → 搬长度", size: 13 },
                        { t: "txt", p: [50,66], text: "作角 → SSS 造全等", size: 13 },
                        { t: "txt", p: [50,52], text: "作角平分线 → SSS 造全等", size: 13 },
                        { t: "txt", p: [50,38], text: "作垂线 → SSS 造全等", size: 13 },
                        { t: "txt", p: [50,22], text: "作图 = 全等判定的施工图", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？作角时我们搬了三段长度 OM、ON、MN——作的是全等。",
                "人话：尺规作图的每一步都在“复制”长度；作图能成功，靠的是全等判定（SSS）。",
                "作角 = 复制一个三角形（SSS）→ 对应角相等；作角平分线 = 造两个全等三角形。",
                "生活例：木工复制零件——量三段、画三段，形状分毫不差。",
                "跃升点拨：定义告诉你图形“是什么”，画法告诉你“怎么得到它”——画法是定义的施工图。",
                "记住一句话：作图即全等。"
              ],
              examples: [
                { text: "跃升 2：看一遍 → 跟一遍 → 自己来一遍，三遍都在这四页里", figure: "方法" }
              ],
              prev: "g04-u1-l7-p4",
              next: "g04-u1-l8-p1"
            }
          ]
        },
        /* ============ g04.1.8 本章小结与习题（2 页） ============ */
        {
          id: "g04-u1-l8",
          title: "本章小结与习题",
          pages: [
            {
              id: "g04-u1-l8-p1",
              title: "全等章：一张图总结",
              pageKind: "explain",
              concept: "本章小结",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{SSS / SAS / ASA / AAS}",
                  translation: "四种全等判定：边边边、边角边、角边角、角角边"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：SSS——三边对应相等。",
                      shapes: [
                        { t: "poly", pts: [[30,62],[70,62],[50,32]], color: "known", width: 3.5 },
                        { t: "seg", a: [30,62], b: [70,62], ticks: 1, color: "corrA" },
                        { t: "seg", a: [70,62], b: [50,32], ticks: 2, color: "corrB" },
                        { t: "seg", a: [50,32], b: [30,62], ticks: 3, color: "corrC" },
                        { t: "txt", p: [50,78], text: "SSS：边边边", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：SAS——两边及夹角对应相等。",
                      shapes: [
                        { t: "poly", pts: [[30,62],[70,62],[50,32]], color: "known", width: 3.5 },
                        { t: "seg", a: [30,62], b: [70,62], ticks: 1, color: "corrA" },
                        { t: "seg", a: [70,62], b: [50,32], ticks: 2, color: "corrB" },
                        { t: "arc", v: [70,62], a1: 125, a2: 180, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,78], text: "SAS：边角边", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：ASA——两角及夹边对应相等。",
                      shapes: [
                        { t: "poly", pts: [[30,62],[70,62],[50,32]], color: "known", width: 3.5 },
                        { t: "arc", v: [30,62], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [70,62], a1: 125, a2: 180, r: 10, group: 2, color: "corrAngle" },
                        { t: "seg", a: [30,62], b: [70,62], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,78], text: "ASA：角边角", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 4 步：AAS——两角及一对边对应相等。",
                      shapes: [
                        { t: "poly", pts: [[30,62],[70,62],[50,32]], color: "known", width: 3.5 },
                        { t: "arc", v: [30,62], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [70,62], a1: 125, a2: 180, r: 10, group: 2, color: "corrAngle" },
                        { t: "seg", a: [70,62], b: [50,32], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,78], text: "AAS：角角边", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "四种判定：SSS（三边）、SAS（两边夹角）、ASA（两角夹边）、AAS（两角一对边）——位置不能乱。",
                "等腰：性质（等边对等角、三线合一）与判定（等角对等边）互逆；等边是特殊的等腰。",
                "作图四种：作线段、作角、作角平分线、作垂线——背后都是全等判定。",
                "回链：对应边/角相等（g04.1.1）是全等的性质；判定是反过来的“充分条件”。",
                "预告：直角三角形还有第五种判定 HL，学完勾股定理（g05.1.5）揭晓。"
              ],
              examples: [],
              prev: "g04-u1-l7-p5",
              next: "g04-u1-l8-p2"
            },
            {
              id: "g04-u1-l8-p2",
              title: "本章习题：6 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{SSS / SAS / ASA / AAS}",
                  translation: "用四种判定和等腰性质解题"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "全等", color: "corrA" },
                    { name: "不是全等", color: "corrB" }
                  ],
                  items: [
                    { id: "t1", label: "①", group: 0, anchor: [25,72],
                      shape: { t: "poly", pts: [[12,82],[38,82],[25,60]], color: "corrA", width: 2.5 } },
                    { id: "t2", label: "②", group: 0, anchor: [75,72],
                      shape: { t: "poly", pts: [[62,82],[88,82],[75,60]], color: "corrA", width: 2.5 } },
                    { id: "t3", label: "③", group: 1, anchor: [25,32],
                      shape: { t: "poly", pts: [[16,42],[34,42],[25,26]], color: "corrB", width: 2.5 } },
                    { id: "t4", label: "④", group: 1, anchor: [75,32],
                      shape: { t: "poly", pts: [[62,44],[88,44],[72,22]], color: "corrB", width: 2.5 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "认图：4 个三角形分进两篮：全等/非全等。",
                "1．△ABC≌△DEF，AB=3，求 DE。",
                "2．等腰三角形底角 40°，求顶角。",
                "3．三边 3、4、5 与 5、3、4 的三角形全等吗？",
                "4．作等角：写出前两步。",
                "5．两边一角对应相等，一定全等吗？",
                "6．门一大一小，用全等说服师傅返工。"
              ],
              examples: [
                { figure: "核对答案", text: "认图：①②全等；1．3；2．100°；3．全等（SSS，三边对应相等）；4．画射线、以顶点为圆心画弧；5．不一定（角须为夹角）；6．全等要求完全重合，大小不同即不全等" }
              ],
              prev: "g04-u1-l8-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
