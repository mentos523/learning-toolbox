/* ============================================================
 * 学习工具箱 · 数学 · 几何 g06：四边形
 *
 * 黄队（教育教学专家）生产：1 单元 / 7 课 / 25 页。
 * 课程体系：docs/math-geometry-curriculum.md v1.1（g06 章）
 * 教学设计：docs/math-geometry-pedagogy.md（铁律/五段式/反例强制）
 * 参数手册：docs/math-geometry-params.md v1.2
 * 白队一屏预算评审：/tmp/white_geom_budget_g05_g07.md（g06 18→25 页）
 *
 * 页构成：
 *   g06.1.1 平行四边形的性质    5 页  P1 step-play（旋转180°重合） P2 讲解（性质1 对边平行且相等）
 *                                 P3 讲解（性质2 对角相等） P4 讲解（性质3 对角线互相平分）
 *                                 P5 proof-replay（对角线平分证明，4 步）
 *   g06.1.2 平行四边形的判定    5 页  P1 step-play（四条件拼图形） P2–P5 讲解（判定 Q1–Q4 各一页；
 *                                 Q2/Q3/Q4 的证明默认收进"为什么可以？"提示行）
 *   g06.1.3 矩形                4 页  P1 step-play（拉直变形） P2 讲解（定义） P3 讲解（对角线相等）
 *                                 P4 proof-replay（对角线相等证明，4 步）
 *   g06.1.4 菱形                4 页  P1 step-play（压扁变形） P2 讲解（定义） P3 讲解（对角线垂直平分）
 *                                 P4 proof-replay（对角线垂直证明，4 步；回链三线合一）
 *   g06.1.5 正方形              2 页  P1 tap-highlight（家族谱系图：多了什么条件）
 *                                 P2 讲解（矩形+菱形=正方形）
 *   g06.1.6 梯形与三角形中位线  3 页  P1 step-play（切出小三角形拼平行四边形）
 *                                 P2 proof-replay（中位线证明，5 步踩线）
 *                                 P3 讲解（梯形定义+等腰梯形+强制反例）
 *   g06.1.7 本章小结与习题      2 页  P1 小结（compare-toggle 判定 vs 性质 + 编号总表 P1–P3/Q1–Q4 + 家族总表）
 *                                 P2 习题（6 道，tap-highlight 分类）
 *
 * 定理编号（白队建议）：性质 P1–P3、判定 Q1–Q4，一页只出现一个编号，总表收进 g06.1.7。
 * 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 / corrA·corrB·corrC=对应组 /
 *   corrAngle=对应角 / line=普通线 / aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g06"] = {
  id: "g06",
  title: "四边形",
  units: [
    {
      id: "g06-u1",
      title: "四边形家族",
      lessons: [
        /* ============ g06.1.1 平行四边形的性质（5 页） ============ */
        {
          id: "g06-u1-l1",
          title: "平行四边形的性质",
          pages: [
            {
              id: "g06-u1-l1-p1",
              title: "转半圈：严丝合缝",
              concept: "平行四边形的中心对称",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{旋转} 180 \\text{度，完全重合}",
                  translation: "绕对角线交点转半圈，图形和原来完全重合"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: true,
                  steps: [
                    {
                      caption: "第 1 帧：平行四边形 ABCD，两条对角线交于点 O。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "line", width: 3 },
                        { t: "seg", a: [24,28], b: [72,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [84,28], b: [12,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "pt", p: [48,48], label: "O", color: "target" },
                        { t: "txt", p: [20,22], text: "A", size: 13 },
                        { t: "txt", p: [88,22], text: "B", size: 13 },
                        { t: "txt", p: [76,74], text: "C", size: 13 },
                        { t: "txt", p: [8,74], text: "D", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 帧：绕 O 转 90°——还没对上。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[68,24],[68,84],[28,72],[28,12]], color: "target", width: 3 },
                        { t: "pt", p: [48,48], label: "O", color: "target" },
                        { t: "txt", p: [50,90], text: "转 90°", size: 14.48, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 帧：转 180°（半圈）——和原来严丝合缝！",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "known", width: 3.5 },
                        { t: "pt", p: [48,48], label: "O", color: "target" },
                        { t: "txt", p: [20,22], text: "A→C", size: 12, color: "target" },
                        { t: "txt", p: [88,22], text: "B→D", size: 12, color: "target" },
                        { t: "txt", p: [50,90], text: "转 180°：完全重合！", size: 15, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "定格想一想：转半圈后，顶点 A 跑到了哪里？（答：C 的位置）",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "known", width: 3.5 },
                        { t: "seg", a: [24,28], b: [72,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [84,28], b: [12,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "pt", p: [48,48], label: "O", color: "target" },
                        { t: "txt", p: [50,12], text: "A 和 C 互换，B 和 D 互换", size: 14.48, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点▶：平行四边形绕对角线交点转半圈，和原来严丝合缝。",
                "没变的是：转 180° 完全重合——这个本事叫中心对称（第 10 章正名）。"
              ],
              examples: [
                { text: "推拉门、伸缩衣架：拉一拉变形，但对边永远平行", figure: "实物" }
              ],
              prev: null,
              next: "g06-u1-l1-p2"
            },
            {
              id: "g06-u1-l1-p2",
              title: "性质1：对边平行且相等",
              pageKind: "explain",
              concept: "对边平行且相等（P1）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{对边平行：} AB \\parallel CD, AD \\parallel BC",
                  translation: "AB 平行于 CD，AD 平行于 BC"
                },
                {
                  id: "f2",
                  latex: "\\text{对边相等：} AB = CD, AD = BC",
                  translation: "AB 等于 CD，AD 等于 BC"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两组对边——平行箭头标记'平行'，同色刻度标记'相等'。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "line", width: 3 },
                        { t: "seg", a: [24,28], b: [84,28], arrows: 1, ticks: 1, color: "corrA" },
                        { t: "seg", a: [72,68], b: [12,68], arrows: 1, ticks: 1, color: "corrA" },
                        { t: "seg", a: [84,28], b: [72,68], arrows: 2, ticks: 2, color: "corrB" },
                        { t: "seg", a: [12,68], b: [24,28], arrows: 2, ticks: 2, color: "corrB" },
                        { t: "txt", p: [54,16], text: "AB = CD", size: 13, color: "corrA" },
                        { t: "txt", p: [88,48], text: "AD = BC", size: 13, color: "corrB" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？你转半圈时，AB 落到了 CD 的位置上——两条边压在了一起。",
                "人话：平行四边形的对边，既平行又相等——这是它最出名的两条“身份证”。",
                "生活例：伸缩门每一节都是平行四边形，对边永远平行；图形例：同色刻度标记的两条边相等。",
                "反例：梯形（后面会学到：只有一组对边平行）——不满足“两组”，所以不是平行四边形。",
                "⚠️ 别搞混：“平行”是定义给的（已知），“相等”是性质推出来的（结论）——别写反。",
                "记住一句话：对边平行又相等（P1）。"
              ],
              examples: [
                { text: "小区伸缩门：拉开收拢，对边始终平行", figure: "实物" }
              ],
              prev: "g06-u1-l1-p1",
              next: "g06-u1-l1-p3"
            },
            {
              id: "g06-u1-l1-p3",
              title: "性质2：对角相等",
              pageKind: "explain",
              concept: "对角相等（P2）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\angle A = \\angle C, \\angle B = \\angle D",
                  translation: "角 A 等于角 C，角 B 等于角 D"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：相对的两个角画同色弧线——它们永远一样大。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "line", width: 3 },
                        { t: "arc", v: [24,28], a1: 0, a2: 107, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [72,68], a1: 180, a2: 287, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [84,28], a1: 107, a2: 180, r: 10, group: 2, color: "corrAngle" },
                        { t: "arc", v: [12,68], a1: 287, a2: 360, r: 10, group: 2, color: "corrAngle" },
                        { t: "txt", p: [20,22], text: "A", size: 13 },
                        { t: "txt", p: [76,74], text: "C", size: 13 },
                        { t: "txt", p: [50,90], text: "∠A = ∠C，∠B = ∠D", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？转半圈后，∠A 落到了 ∠C 的位置——对角压在了一起。",
                "人话：平行四边形相对的两个角，大小永远一样。",
                "生活例：伸缩门拉扁时，相对的两个角一起变大、一起变小；图形例：同色弧线的两个角相等。",
                "反例：一般的四边形，对角不一定相等——别想当然。",
                "⚠️ 别搞混：对角相等，邻角可不相等——∠A + ∠B = 180°（邻角互补，因为 AB ∥ CD，同旁内角互补）。",
                "记住一句话：对角相等（P2），邻角互补是推论。"
              ],
              examples: [
                { text: "伸缩衣架：拉开角度变，相对两角始终一样大", figure: "实物" }
              ],
              prev: "g06-u1-l1-p2",
              next: "g06-u1-l1-p4"
            },
            {
              id: "g06-u1-l1-p4",
              title: "性质3：对角线互相平分",
              pageKind: "explain",
              concept: "对角线互相平分（P3）",
              formulas: [
                {
                  id: "f1",
                  latex: "OA = OC, OB = OD",
                  translation: "OA 等于 OC，OB 等于 OD：交点 O 是两条对角线的中点"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两条对角线相交——OA 和 OC 同色刻度，OB 和 OD 同色刻度。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "line", width: 3 },
                        { t: "seg", a: [24,28], b: [72,68], color: "known", width: 2.5 },
                        { t: "seg", a: [84,28], b: [12,68], color: "known", width: 2.5 },
                        { t: "seg", a: [24,28], b: [48,48], ticks: 1, color: "corrA" },
                        { t: "seg", a: [48,48], b: [72,68], ticks: 1, color: "corrA" },
                        { t: "seg", a: [84,28], b: [48,48], ticks: 2, color: "corrB" },
                        { t: "seg", a: [48,48], b: [12,68], ticks: 2, color: "corrB" },
                        { t: "pt", p: [48,48], label: "O", color: "target" },
                        { t: "txt", p: [50,90], text: "O 是两条对角线的中点", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？转半圈后，半条对角线 OA 落到了 OC 的位置上。",
                "人话：两条对角线相交，交点正好是每条对角线的中点——互相平分。",
                "生活例：伸缩门对角交叉的铆钉，永远钉在正中间；图形例：O 到四个顶点的距离两两相等。",
                "反例：一般四边形的对角线，交点不在正中间——不互相平分。",
                "⚠️ 别搞混：互相平分说的是“交点是中点”，不是“两条对角线一样长”——AC 和 BD 一般不相等。",
                "记住一句话：对角线互相平分（P3）——下一页我们证明它。"
              ],
              examples: [
                { text: "两根木条中点钉在一起，四个端点围成平行四边形", figure: "实物" }
              ],
              prev: "g06-u1-l1-p3",
              next: "g06-u1-l1-p5"
            },
            {
              id: "g06-u1-l1-p5",
              title: "证明：对角线互相平分",
              concept: "对角线互相平分的证明",
              formulas: [
                {
                  id: "f1",
                  latex: "OA = OC, OB = OD",
                  translation: "OA 等于 OC，OB 等于 OD：对角线互相平分"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "平行四边形 ABCD，AC 与 BD 交于 O",
                  goal: "OA = OC, OB = OD",
                  steps: [
                    {
                      card: "先把两条对角线画出来，交点记作 O——要证的 OA、OC 就在这两条线上。",
                      why: "已知：ABCD 是平行四边形；AB ∥ CD（定义）。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "line", width: 3 },
                        { t: "seg", a: [24,28], b: [72,68], color: "target", width: 2.5 },
                        { t: "seg", a: [84,28], b: [12,68], color: "target", width: 2.5 },
                        { t: "seg", a: [24,28], b: [84,28], arrows: 1, color: "known" },
                        { t: "seg", a: [72,68], b: [12,68], arrows: 1, color: "known" },
                        { t: "pt", p: [48,48], label: "O", color: "target" },
                        { t: "txt", p: [50,90], text: "第 1 步：连对角线", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "AB 和 CD 平行，AC 是截线——∠OAB 和 ∠OCD 是内错角，相等。",
                      why: "定理：两直线平行，内错角相等（第 g02.2.3 页）。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "line", width: 1.5 },
                        { t: "seg", a: [24,28], b: [72,68], color: "target", width: 3 },
                        { t: "arc", v: [24,28], a1: 0, a2: 40, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [72,68], a1: 180, a2: 220, r: 9, group: 1, color: "corrAngle" },
                        { t: "txt", p: [16,20], text: "∠1", size: 13, color: "corrAngle" },
                        { t: "txt", p: [80,76], text: "∠2", size: 13, color: "corrAngle" },
                        { t: "txt", p: [50,90], text: "第 2 步：∠1 = ∠2（内错角）", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "AB=CD（性质1），∠AOB=∠COD（对顶角相等）——两角夹一边，两三角形全等。",
                      why: "ASA 判定（第 g04.1.4 页）；对顶角相等（第 g02.1.1 页）；AB=CD（性质1：由旋转 180° 重合直观得到，严格证明见第 10 章中心对称）。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[24,28],[84,28],[48,48]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[72,68],[12,68],[48,48]], color: "corrB", width: 3 },
                        { t: "seg", a: [24,28], b: [84,28], ticks: 1, color: "corrA" },
                        { t: "seg", a: [72,68], b: [12,68], ticks: 1, color: "corrB" },
                        { t: "arc", v: [48,48], a1: 220, a2: 331, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [48,48], a1: 40, a2: 151, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,90], text: "第 3 步：△AOB ≌ △COD（ASA）", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "全等了：OA 和 OC、OB 和 OD 分别压在一起——对应边相等，证完。",
                      why: "全等三角形对应边相等（第 g04.1.1 页）。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "line", width: 1.5 },
                        { t: "seg", a: [24,28], b: [48,48], ticks: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [48,48], b: [72,68], ticks: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [84,28], b: [48,48], ticks: 2, color: "corrB", width: 3 },
                        { t: "seg", a: [48,48], b: [12,68], ticks: 2, color: "corrB", width: 3 },
                        { t: "txt", p: [50,90], text: "第 4 步：OA=OC，OB=OD", size: 14.48, bold: true, color: "known" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "连对角线 AC、BD，交于 O", reason: "已知；AB ∥ CD（定义）" },
                    { statement: "∠OAB = ∠OCD", reason: "两直线平行，内错角相等" },
                    { statement: "△AOB ≌ △COD（ASA）", reason: "AB=CD（性质1）、∠AOB=∠COD（对顶角相等）" },
                    { statement: "OA=OC，OB=OD", reason: "全等三角形对应边相等" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "证明三问：已知是平行四边形 ABCD；求证 OA=OC、OB=OD；第一步敢连对角线，因为结论就藏在对角线上。",
                "核心动作：造出两个三角形，用全等把“边相等”搬出来——全等是几何的“搬运工”。"
              ],
              examples: [
                { text: "思路模板：要证线段相等，先找它们所在的三角形证全等", figure: "方法" }
              ],
              prev: "g06-u1-l1-p4",
              next: "g06-u1-l2-p1"
            }
          ]
        },
        /* ============ g06.1.2 平行四边形的判定（5 页） ============ */
        {
          id: "g06-u1-l2",
          title: "平行四边形的判定",
          pages: [
            {
              id: "g06-u1-l2-p1",
              title: "四个条件，都能拼出来",
              concept: "四种判定方法总览",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{满足任一条，就能断定是平行四边形}",
                  translation: "四条判定条件满足任意一条，就能断定它是平行四边形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "条件 Q1：两组对边分别平行——画两组平行线，围出来的就是平行四边形。",
                      shapes: [
                        { t: "seg", a: [15,30], b: [85,30], color: "corrA", width: 3, arrows: 1 },
                        { t: "seg", a: [25,70], b: [75,70], color: "corrA", width: 3, arrows: 1 },
                        { t: "seg", a: [20,20], b: [30,80], color: "corrB", width: 3, arrows: 2 },
                        { t: "seg", a: [70,20], b: [80,80], color: "corrB", width: 3, arrows: 2 },
                        { t: "txt", p: [50,90], text: "Q1：两组对边分别平行", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "条件 Q2：两组对边分别相等——AB=CD、AD=BC 的四根木条，只能钉成平行四边形。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "known", width: 3 },
                        { t: "seg", a: [24,28], b: [84,28], ticks: 1, color: "corrA" },
                        { t: "seg", a: [72,68], b: [12,68], ticks: 1, color: "corrA" },
                        { t: "seg", a: [84,28], b: [72,68], ticks: 2, color: "corrB" },
                        { t: "seg", a: [12,68], b: [24,28], ticks: 2, color: "corrB" },
                        { t: "txt", p: [50,90], text: "Q2：两组对边分别相等", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "条件 Q3：一组对边平行且相等——AB ∥ CD 且 AB=CD，另一组自动跟上。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "known", width: 3 },
                        { t: "seg", a: [24,28], b: [84,28], arrows: 1, ticks: 1, color: "target", width: 3.5 },
                        { t: "seg", a: [72,68], b: [12,68], arrows: 1, ticks: 1, color: "target", width: 3.5 },
                        { t: "txt", p: [50,90], text: "Q3：一组对边平行且相等", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "条件 Q4：对角线互相平分——OA=OC、OB=OD，四个端点连起来就是平行四边形。",
                      shapes: [
                        { t: "seg", a: [24,28], b: [72,68], color: "known", width: 2.5 },
                        { t: "seg", a: [84,28], b: [12,68], color: "known", width: 2.5 },
                        { t: "seg", a: [24,28], b: [48,48], ticks: 1, color: "corrA" },
                        { t: "seg", a: [48,48], b: [72,68], ticks: 1, color: "corrA" },
                        { t: "seg", a: [84,28], b: [48,48], ticks: 2, color: "corrB" },
                        { t: "seg", a: [48,48], b: [12,68], ticks: 2, color: "corrB" },
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "target", width: 3, dash: "6,4" },
                        { t: "txt", p: [50,90], text: "Q4：对角线互相平分", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一步一步点：四个条件，每条都能“拼”出一个平行四边形。",
                "这是判定——给条件、断“身份”。和上一课反过来：上一课是已知平行四边形得结论。",
                "记住编号：Q1 两组对边平行；Q2 两组对边相等；Q3 一组平行且相等；Q4 对角线互相平分。"
              ],
              examples: [
                { text: "做木工：两组等长的木条钉四边形，只能钉成平行四边形", figure: "实物" }
              ],
              prev: "g06-u1-l1-p5",
              next: "g06-u1-l2-p2"
            },
            {
              id: "g06-u1-l2-p2",
              title: "判定1：两组对边分别平行",
              pageKind: "explain",
              concept: "判定1：两组对边分别平行（Q1）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{两组对边分别平行} \\Rightarrow \\text{平行四边形}",
                  translation: "两组对边分别平行，就能断定它是平行四边形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两组平行箭头——这是定义反过来用。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "known", width: 3 },
                        { t: "seg", a: [24,28], b: [84,28], arrows: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [72,68], b: [12,68], arrows: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [84,28], b: [72,68], arrows: 2, color: "corrB", width: 3 },
                        { t: "seg", a: [12,68], b: [24,28], arrows: 2, color: "corrB", width: 3 },
                        { t: "txt", p: [50,90], text: "定义反过来用", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "这是最短的一条：定义反过来用。",
                "人话：两组对边都平行——那它就是平行四边形本人，定义说的。",
                "生活例：伸缩门每一节；图形例：两组平行箭头标记。",
                "反例：梯形只有一组对边平行——Q1 不通过。",
                "记住一句话：Q1 = 定义法，两组对边分别平行。"
              ],
              examples: [
                { text: "定义既是“身份证”，也是第一条判定", figure: "方法" }
              ],
              prev: "g06-u1-l2-p1",
              next: "g06-u1-l2-p3"
            },
            {
              id: "g06-u1-l2-p3",
              title: "判定2：两组对边分别相等",
              pageKind: "explain",
              concept: "判定2：两组对边分别相等（Q2）",
              formulas: [
                {
                  id: "f1",
                  latex: "AB = CD, AD = BC \\Rightarrow \\text{平行四边形}",
                  translation: "两组对边分别相等，就能断定是平行四边形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两组等长刻度——虚线对角线是证明的“桥”。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "known", width: 3 },
                        { t: "seg", a: [24,28], b: [84,28], ticks: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [72,68], b: [12,68], ticks: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [84,28], b: [72,68], ticks: 2, color: "corrB", width: 3 },
                        { t: "seg", a: [12,68], b: [24,28], ticks: 2, color: "corrB", width: 3 },
                        { t: "seg", a: [24,28], b: [72,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,90], text: "只看边相等，不看角", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话：四条边，两两相对相等——不用量角，也能断定是平行四边形。",
                "生活例：四根木条两组等长，钉起来只能是平行四边形（想想第 g04 章三角形的稳定性）。",
                "图形例：同色刻度标记的两组对边；虚线对角线是证明要走的“桥”。",
                "反例：一组对边相等、另一组不相等——拼不成平行四边形。",
                "为什么可以？连对角线 AC：△ABC ≌ △CDA（SSS）。",
                "∠BAC=∠DCA（内错角相等）→ AB ∥ CD；同理 AD ∥ BC。",
                "两组对边平行 → Q1 → 是平行四边形。",
                "⚠️ 别搞混：Q2 只看“边相等”，不看角——别去量角。",
                "记住一句话：两组对边分别相等（Q2）。"
              ],
              examples: [
                { text: "四根木条钉相框：对边等长，框不会“塌”成别的形状", figure: "实物" }
              ],
              prev: "g06-u1-l2-p2",
              next: "g06-u1-l2-p4"
            },
            {
              id: "g06-u1-l2-p4",
              title: "判定3：一组对边平行且相等",
              pageKind: "explain",
              concept: "判定3：一组对边平行且相等（Q3）",
              formulas: [
                {
                  id: "f1",
                  latex: "AB \\parallel CD, AB = CD \\Rightarrow \\text{平行四边形}",
                  translation: "一组对边平行且相等，就能断定是平行四边形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：AB 与 CD 又有平行箭头、又有等长刻度——“平行”和“相等”必须在同一组对边上。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "known", width: 3 },
                        { t: "seg", a: [24,28], b: [84,28], arrows: 1, ticks: 1, color: "target", width: 3.5 },
                        { t: "seg", a: [72,68], b: [12,68], arrows: 1, ticks: 1, color: "target", width: 3.5 },
                        { t: "seg", a: [24,28], b: [72,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,90], text: "同一组对边：又平行又相等", size: 14.48, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话：一组对边又平行又相等——另一组对边会自动“跟上”。",
                "生活例：推拉门的一节：上下两根滑轨平行等长。",
                "图形例：AB 与 CD 又有平行箭头、又有等长刻度。",
                "反例：等腰梯形——一组对边平行、另一组对边（两腰）相等，但“平行”和“相等”不在同一组对边上，所以不是平行四边形！",
                "为什么可以？连 AC：∠BAC=∠DCA（内错角相等）。",
                "△ABC ≌ △CDA（SAS）→ BC=AD。",
                "两组对边分别相等 → Q2 → 是平行四边形。",
                "⚠️ 别搞混：必须是同一组对边“又平行又相等”——拆开到两组上就不行（见反例）。",
                "记住一句话：一组对边平行且相等（Q3）。"
              ],
              examples: [
                { text: "传送带：两条平行等长的边带着货物走直线", figure: "实物" }
              ],
              prev: "g06-u1-l2-p3",
              next: "g06-u1-l2-p5"
            },
            {
              id: "g06-u1-l2-p5",
              title: "判定4：对角线互相平分",
              pageKind: "explain",
              concept: "判定4：对角线互相平分（Q4）",
              formulas: [
                {
                  id: "f1",
                  latex: "OA = OC, OB = OD \\Rightarrow \\text{平行四边形}",
                  translation: "对角线互相平分，就能断定是平行四边形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：OA=OC、OB=OD——四个端点连起来，必是平行四边形。",
                      shapes: [
                        { t: "seg", a: [24,28], b: [72,68], color: "known", width: 2.5 },
                        { t: "seg", a: [84,28], b: [12,68], color: "known", width: 2.5 },
                        { t: "seg", a: [24,28], b: [48,48], ticks: 1, color: "corrA" },
                        { t: "seg", a: [48,48], b: [72,68], ticks: 1, color: "corrA" },
                        { t: "seg", a: [84,28], b: [48,48], ticks: 2, color: "corrB" },
                        { t: "seg", a: [48,48], b: [12,68], ticks: 2, color: "corrB" },
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "target", width: 3 },
                        { t: "pt", p: [48,48], label: "O", color: "target" },
                        { t: "txt", p: [50,90], text: "端点连线，必是平行四边形", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话：两条对角线互相平分——四个端点连起来，必是平行四边形。",
                "生活例：两根木条中点钉在一起，转一转，四个端点永远围成平行四边形。",
                "图形例：OA=OC、OB=OD 刻度标记。",
                "反例：对角线不互相平分的四边形——Q4 不通过。",
                "为什么可以？∠AOB=∠COD（对顶角相等）。",
                "△AOB ≌ △COD（SAS）→ AB=CD；同理 AD=CB。",
                "两组对边分别相等 → Q2 → 是平行四边形。",
                "记住一句话：对角线互相平分（Q4）。"
              ],
              examples: [
                { text: "做风筝：两根竹条中点对中点绑紧，骨架不歪", figure: "实物" }
              ],
              prev: "g06-u1-l2-p4",
              next: "g06-u1-l3-p1"
            }
          ]
        },
        /* ============ g06.1.3 矩形（4 页） ============ */
        {
          id: "g06-u1-l3",
          title: "矩形",
          pages: [
            {
              id: "g06-u1-l3-p1",
              title: "拉直：角变成了直角",
              concept: "矩形的形成",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{矩形} = \\text{平行四边形} + \\text{一个直角}",
                  translation: "矩形就是有一个角是直角的平行四边形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: true,
                  steps: [
                    {
                      caption: "第 1 帧：一个普通的平行四边形——角是斜的。",
                      shapes: [
                        { t: "poly", pts: [[12,30],[76,30],[88,66],[24,66]], color: "line", width: 3 },
                        { t: "txt", p: [50,90], text: "角是斜的", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 帧：捏住它慢慢“拉直”——对边还平行，只是角在变大。",
                      shapes: [
                        { t: "poly", pts: [[16,28],[84,28],[80,68],[20,68]], color: "target", width: 3 },
                        { t: "txt", p: [50,90], text: "拉直中……", size: 14.48, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 帧：四个角都变成直角——它有了新名字：矩形。",
                      shapes: [
                        { t: "poly", pts: [[20,28],[80,28],[80,68],[20,68]], color: "known", width: 3.5 },
                        { t: "right", v: [20,28], p: [80,28], q: [20,68], color: "known" },
                        { t: "right", v: [80,28], p: [20,28], q: [80,68], color: "known" },
                        { t: "right", v: [80,68], p: [80,28], q: [20,68], color: "known" },
                        { t: "right", v: [20,68], p: [20,28], q: [80,68], color: "known" },
                        { t: "txt", p: [50,90], text: "四个角都是直角：矩形", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点▶看变形：平行四边形被“拉直”，角一个个变成直角。",
                "没变的是：对边平行且相等、对角线互相平分——平行四边形的老本都在。",
                "变了的是：角变成了直角——这就是矩形的新身份证。"
              ],
              examples: [
                { text: "书本、黑板、手机屏幕：四个角都是直角", figure: "实物" }
              ],
              prev: "g06-u1-l2-p5",
              next: "g06-u1-l3-p2"
            },
            {
              id: "g06-u1-l3-p2",
              title: "矩形：一个直角定身份",
              pageKind: "explain",
              concept: "矩形的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{有一个角是直角的平行四边形叫做矩形}",
                  translation: "有一个角是直角的平行四边形，就叫做矩形"
                },
                {
                  id: "f2",
                  latex: "\\text{矩形的四个角都是直角}",
                  translation: "矩形的四个角都是直角"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：四个直角方块——一个直角，带来四个直角。",
                      shapes: [
                        { t: "poly", pts: [[20,28],[80,28],[80,68],[20,68]], color: "known", width: 3 },
                        { t: "right", v: [20,28], p: [80,28], q: [20,68], color: "known" },
                        { t: "right", v: [80,28], p: [20,28], q: [80,68], color: "known" },
                        { t: "right", v: [80,68], p: [80,28], q: [20,68], color: "known" },
                        { t: "right", v: [20,68], p: [20,28], q: [80,68], color: "known" },
                        { t: "txt", p: [50,90], text: "一个直角 → 四个直角", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？拉直的那一刻，四个角同时变成了直角。",
                "人话：平行四边形里，只要有一个角是直角——四个角就全是直角，它就是矩形。",
                "一句话推导：∠A=90° → ∠C=90°（P2 对角相等）→ ∠B=180°−90°=90°（邻角互补）",
                "生活例：书本、黑板；图形例：四个直角方块标记。",
                "反例：一般的平行四边形——角是斜的，不是矩形。",
                "⚠️ 别搞混：矩形首先是平行四边形——P1、P2、P3 三条性质它全有，一个不少。",
                "记住一句话：一个直角定身份（矩形定义）。"
              ],
              examples: [
                { text: "长方形就是矩形：只是名字不同", figure: "实物" }
              ],
              prev: "g06-u1-l3-p1",
              next: "g06-u1-l3-p3"
            },
            {
              id: "g06-u1-l3-p3",
              title: "矩形：对角线相等",
              pageKind: "explain",
              concept: "矩形的对角线相等",
              formulas: [
                {
                  id: "f1",
                  latex: "AC = BD",
                  translation: "矩形的两条对角线相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：两条对角线同色等长刻度——一样长。",
                      shapes: [
                        { t: "poly", pts: [[20,28],[80,28],[80,68],[20,68]], color: "line", width: 3 },
                        { t: "seg", a: [20,28], b: [80,68], color: "known", width: 2.5 },
                        { t: "seg", a: [80,28], b: [20,68], color: "known", width: 2.5 },
                        { t: "seg", a: [20,28], b: [80,68], ticks: 1, color: "corrA" },
                        { t: "seg", a: [80,28], b: [20,68], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,90], text: "AC = BD", size: 14.48, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话：矩形的两条对角线，一样长——这是它独有的新性质。",
                "生活例：量黑板对角线：两条一样长，四个角就是直角（装修师傅的土办法，用的就是这条）。",
                "图形例：两条对角线同色等长刻度。",
                "反例：一般的平行四边形——对角线一边长一边短，不相等。",
                "⚠️ 别搞混：“互相平分”是平行四边形自带的（P3），“相等”是矩形新加的——两条都得有。",
                "记住一句话：矩形的对角线相等且互相平分——下一页证明它。"
              ],
              examples: [
                { text: "门框装正了没有？量两条对角线等不等", figure: "实物" }
              ],
              prev: "g06-u1-l3-p2",
              next: "g06-u1-l3-p4"
            },
            {
              id: "g06-u1-l3-p4",
              title: "证明：矩形对角线相等",
              concept: "矩形对角线相等的证明",
              formulas: [
                {
                  id: "f1",
                  latex: "AC = BD",
                  translation: "矩形的两条对角线相等"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "ABCD 为矩形",
                  goal: "AC = BD",
                  steps: [
                    {
                      card: "矩形首先是平行四边形：AB=DC（性质1）；∠B 和 ∠C 都是直角（矩形定义）。",
                      why: "平行四边形对边相等（P1）；矩形四个角都是直角。",
                      shapes: [
                        { t: "poly", pts: [[20,28],[80,28],[80,68],[20,68]], color: "line", width: 3 },
                        { t: "seg", a: [20,28], b: [80,28], ticks: 1, color: "corrA" },
                        { t: "seg", a: [80,68], b: [20,68], ticks: 1, color: "corrA" },
                        { t: "right", v: [80,28], p: [20,28], q: [80,68], color: "target" },
                        { t: "right", v: [80,68], p: [80,28], q: [20,68], color: "target" },
                        { t: "txt", p: [50,90], text: "第 1 步：摆好已知", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "看两个三角形：△ABC 和 △DCB——AB=DC，∠B=∠C=直角，BC 是公共边。",
                      why: "公共边：BC 是两个三角形的同一条边。",
                      shapes: [
                        { t: "poly", pts: [[20,28],[80,28],[80,68],[20,68]], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[20,28],[80,28],[80,68]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[80,68],[20,68],[80,28]], color: "corrB", width: 3 },
                        { t: "txt", p: [50,90], text: "第 2 步：找出两个三角形", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "两边夹一角——SAS，△ABC ≌ △DCB。",
                      why: "SAS 判定：两边及夹角对应相等（第 g04.1.3 页）。",
                      shapes: [
                        { t: "poly", pts: [[20,28],[80,28],[80,68],[20,68]], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[20,28],[80,28],[80,68]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[80,68],[20,68],[80,28]], color: "corrB", width: 3 },
                        { t: "txt", p: [50,50], text: "≅", size: 22, bold: true, color: "target" },
                        { t: "txt", p: [50,90], text: "第 3 步：SAS 全等", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "全等了：对应边 AC 和 BD 相等——矩形的对角线相等，证完。",
                      why: "全等三角形对应边相等（第 g04.1.1 页）。",
                      shapes: [
                        { t: "poly", pts: [[20,28],[80,28],[80,68],[20,68]], color: "line", width: 1.5 },
                        { t: "seg", a: [20,28], b: [80,68], ticks: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [80,28], b: [20,68], ticks: 1, color: "corrA", width: 3 },
                        { t: "txt", p: [50,90], text: "第 4 步：AC = BD", size: 14.48, bold: true, color: "known" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "ABCD 为矩形：AB=DC，∠ABC=∠DCB=直角", reason: "性质1；矩形定义" },
                    { statement: "△ABC 与 △DCB：AB=DC，∠B=∠C，BC 公共", reason: "已知；公共边" },
                    { statement: "△ABC ≌ △DCB（SAS）", reason: "SAS 判定" },
                    { statement: "AC=BD", reason: "全等三角形对应边相等" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "证明三问：已知是矩形；求证 AC=BD；第一步敢用 AB=DC 和直角，因为矩形自带这两样。",
                "和上一课的证明比：同样的“造三角形→证全等→搬结论”三板斧。"
              ],
              examples: [
                { text: "SAS 是本证明的钥匙：两边夹一角", figure: "方法" }
              ],
              prev: "g06-u1-l3-p3",
              next: "g06-u1-l4-p1"
            }
          ]
        },
        /* ============ g06.1.4 菱形（4 页） ============ */
        {
          id: "g06-u1-l4",
          title: "菱形",
          pages: [
            {
              id: "g06-u1-l4-p1",
              title: "压扁：四条边一样长",
              concept: "菱形的形成",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{菱形} = \\text{平行四边形} + \\text{邻边相等}",
                  translation: "菱形就是有一组邻边相等的平行四边形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: true,
                  steps: [
                    {
                      caption: "第 1 帧：一个普通的平行四边形——四条边长短不一。",
                      shapes: [
                        { t: "poly", pts: [[14,30],[70,30],[82,66],[26,66]], color: "line", width: 3 },
                        { t: "txt", p: [50,90], text: "边长短不一", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 帧：捏住两端往中间“压”——边长没变，只是形状在变。",
                      shapes: [
                        { t: "poly", pts: [[20,32],[64,32],[76,68],[32,68]], color: "target", width: 3 },
                        { t: "txt", p: [50,90], text: "压扁中……", size: 14.48, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 帧：四条边变得一样长——它有了新名字：菱形。",
                      shapes: [
                        { t: "poly", pts: [[18,48],[50,30],[82,48],[50,66]], color: "known", width: 3.5 },
                        { t: "seg", a: [18,48], b: [50,30], ticks: 1, color: "known" },
                        { t: "seg", a: [50,30], b: [82,48], ticks: 1, color: "known" },
                        { t: "seg", a: [82,48], b: [50,66], ticks: 1, color: "known" },
                        { t: "seg", a: [50,66], b: [18,48], ticks: 1, color: "known" },
                        { t: "txt", p: [50,90], text: "四条边一样长：菱形", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点▶看变形：平行四边形被“压扁”，四条边越压越一样长。",
                "没变的是：对边平行、对角线互相平分——平行四边形的老本都在。",
                "变了的是：四条边一样长了——这就是菱形的新身份证。",
                "还记得矩形那一课吗？同样的四步：变形 → 定义 → 对角线性质 → 证明。"
              ],
              examples: [
                { text: "衣架撑开、风筝、菱形地砖", figure: "实物" }
              ],
              prev: "g06-u1-l3-p4",
              next: "g06-u1-l4-p2"
            },
            {
              id: "g06-u1-l4-p2",
              title: "菱形：邻边相等定身份",
              pageKind: "explain",
              concept: "菱形的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{有一组邻边相等的平行四边形叫做菱形}",
                  translation: "有一组邻边相等的平行四边形，就叫做菱形"
                },
                {
                  id: "f2",
                  latex: "AB = BC = CD = DA",
                  translation: "菱形的四条边都相等"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：四条边同色等长刻度——一组邻边相等，带来四边相等。",
                      shapes: [
                        { t: "poly", pts: [[18,48],[50,30],[82,48],[50,66]], color: "known", width: 3 },
                        { t: "seg", a: [18,48], b: [50,30], ticks: 1, color: "known" },
                        { t: "seg", a: [50,30], b: [82,48], ticks: 1, color: "known" },
                        { t: "seg", a: [82,48], b: [50,66], ticks: 1, color: "known" },
                        { t: "seg", a: [50,66], b: [18,48], ticks: 1, color: "known" },
                        { t: "txt", p: [50,90], text: "一组邻边相等 → 四边相等", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？压到最后，四条边一样长——这就是菱形。",
                "人话：平行四边形里，相邻两条边相等——四条边就全相等了，它就是菱形。",
                "生活例：衣架撑开、风筝骨架；图形例：四条边同色等长刻度。",
                "反例：一般的平行四边形——邻边一边长一边短，不是菱形。",
                "⚠️ 别搞混：只要“一组邻边”相等就够了，不用四条边逐一量——平行四边形对边本来就相等。",
                "记住一句话：邻边相等定身份（菱形定义）。"
              ],
              examples: [
                { text: "扑克牌里的方块 ♦：标准的菱形", figure: "实物" }
              ],
              prev: "g06-u1-l4-p1",
              next: "g06-u1-l4-p3"
            },
            {
              id: "g06-u1-l4-p3",
              title: "菱形：对角线垂直平分",
              pageKind: "explain",
              concept: "菱形的对角线互相垂直平分",
              formulas: [
                {
                  id: "f1",
                  latex: "AC \\perp BD",
                  translation: "菱形的两条对角线互相垂直"
                },
                {
                  id: "f2",
                  latex: "\\text{菱形的对角线互相垂直平分}",
                  translation: "菱形的对角线互相垂直，还互相平分"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：交点处的直角方块 + 平分刻度——垂直又平分。",
                      shapes: [
                        { t: "poly", pts: [[18,48],[50,30],[82,48],[50,66]], color: "line", width: 3 },
                        { t: "seg", a: [18,48], b: [82,48], color: "known", width: 2.5 },
                        { t: "seg", a: [50,30], b: [50,66], color: "known", width: 2.5 },
                        { t: "right", v: [50,48], p: [82,48], q: [50,66], color: "target" },
                        { t: "seg", a: [18,48], b: [50,48], ticks: 1, color: "corrA" },
                        { t: "seg", a: [50,48], b: [82,48], ticks: 1, color: "corrA" },
                        { t: "seg", a: [50,30], b: [50,48], ticks: 2, color: "corrB" },
                        { t: "seg", a: [50,48], b: [50,66], ticks: 2, color: "corrB" },
                        { t: "txt", p: [50,90], text: "垂直 + 平分", size: 14.48, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话：菱形的两条对角线，不仅互相平分，还互相垂直——交成四个直角。",
                "生活例：风筝的十字骨架：两根竹条垂直交叉，中点对中点。",
                "图形例：交点处的直角方块 + 平分刻度。",
                "反例：矩形的对角线——平分但不垂直（除非它是正方形）。",
                "⚠️ 别搞混：“平分”是平行四边形自带的（P3），“垂直”是菱形新加的——两条都得有。",
                "记住一句话：菱形的对角线互相垂直平分——下一页证明“垂直”。"
              ],
              examples: [
                { text: "菱形窗花：对角线交成直角", figure: "实物" }
              ],
              prev: "g06-u1-l4-p2",
              next: "g06-u1-l4-p4"
            },
            {
              id: "g06-u1-l4-p4",
              title: "证明：菱形对角线垂直",
              concept: "菱形对角线垂直的证明",
              formulas: [
                {
                  id: "f1",
                  latex: "AC \\perp BD",
                  translation: "菱形的两条对角线互相垂直"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "ABCD 为菱形，AC 与 BD 交于 O",
                  goal: "AC ⊥ BD",
                  steps: [
                    {
                      card: "先拿现成的：AB=AD（菱形四边相等）；BO=DO（对角线互相平分，性质3）。",
                      why: "菱形性质：四边相等（第 g06.1.4 页已证）；平行四边形性质3（第 g06.1.1 页）。",
                      shapes: [
                        { t: "poly", pts: [[18,48],[50,30],[82,48],[50,66]], color: "line", width: 3 },
                        { t: "seg", a: [18,48], b: [82,48], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [50,30], b: [50,66], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [18,48], b: [50,30], ticks: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [18,48], b: [50,66], ticks: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [50,30], b: [50,48], ticks: 2, color: "corrB" },
                        { t: "seg", a: [50,48], b: [50,66], ticks: 2, color: "corrB" },
                        { t: "txt", p: [50,90], text: "第 1 步：摆好已知", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "△ABO 和 △ADO：三边对应相等——SSS，两个小三角形全等。",
                      why: "SSS 判定：三边对应相等（第 g04.1.2 页）；AO 是公共边。",
                      shapes: [
                        { t: "poly", pts: [[18,48],[50,30],[82,48],[50,66]], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[18,48],[50,30],[50,48]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[18,48],[50,66],[50,48]], color: "corrB", width: 3 },
                        { t: "txt", p: [50,90], text: "第 2 步：△ABO ≌ △ADO（SSS）", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "全等了：∠AOB=∠AOD；它俩拼成一条直线，所以都是 90°。",
                      why: "全等三角形对应角相等；∠AOB + ∠AOD = 180°（平角）。",
                      shapes: [
                        { t: "poly", pts: [[18,48],[50,30],[82,48],[50,66]], color: "line", width: 1.5 },
                        { t: "seg", a: [18,48], b: [82,48], color: "target", width: 2.5 },
                        { t: "arc", v: [50,48], a1: 180, a2: 270, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,48], a1: 90, a2: 180, r: 10, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,90], text: "第 3 步：∠AOB = ∠AOD = 90°", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "AC ⊥ BD——垂直得证；平分是平行四边形自带的。所以：互相垂直平分。",
                      why: "垂直的定义；回链：等腰 △ABD 中，AO 既是中线又是高——三线合一（第 g04.1.5 页）。",
                      shapes: [
                        { t: "poly", pts: [[18,48],[50,30],[82,48],[50,66]], color: "line", width: 1.5 },
                        { t: "seg", a: [18,48], b: [82,48], color: "known", width: 3 },
                        { t: "seg", a: [50,30], b: [50,66], color: "known", width: 3 },
                        { t: "right", v: [50,48], p: [82,48], q: [50,66], color: "target" },
                        { t: "seg", a: [18,48], b: [50,48], ticks: 1, color: "corrA" },
                        { t: "seg", a: [50,48], b: [82,48], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,90], text: "第 4 步：AC ⊥ BD", size: 14.48, bold: true, color: "known" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "AB=AD（菱形），BO=DO（性质3）", reason: "菱形定义；对角线互相平分" },
                    { statement: "△ABO ≌ △ADO（SSS）", reason: "SSS 判定；AO 公共" },
                    { statement: "∠AOB=∠AOD=90°", reason: "对应角相等；拼成平角" },
                    { statement: "AC ⊥ BD", reason: "垂直的定义" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "证明三问：已知是菱形；求证 AC ⊥ BD；第一步敢用 AB=AD 和 BO=DO，因为菱形和性质3给了这两样。",
                "换种看法：△ABD 是等腰三角形，AO 是底边中线——三线合一直接得 AO ⊥ BD（第 g04.1.5 页）。"
              ],
              examples: [
                { text: "SSS 是本证明的钥匙：三边对应相等", figure: "方法" }
              ],
              prev: "g06-u1-l4-p3",
              next: "g06-u1-l5-p1"
            }
          ]
        },
        /* ============ g06.1.5 正方形（2 页） ============ */
        {
          id: "g06-u1-l5",
          title: "正方形",
          pages: [
            {
              id: "g06-u1-l5-p1",
              title: "家族谱系：多了什么条件",
              concept: "四边形家族谱系",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{正方形} = \\text{矩形} + \\text{菱形}",
                  translation: "正方形既是矩形又是菱形：四个角是直角，四条边相等"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "txt", p: [50,86], text: "四边形", size: 15, bold: true },
                    { t: "seg", a: [50,80], b: [50,70], color: "aux", width: 2 },
                    { t: "seg", a: [50,58], b: [28,50], color: "aux", width: 2 },
                    { t: "seg", a: [50,58], b: [72,50], color: "aux", width: 2 },
                    { t: "seg", a: [24,38], b: [40,30], color: "aux", width: 2 },
                    { t: "seg", a: [76,38], b: [60,30], color: "aux", width: 2 }
                  ],
                  groups: [
                    { name: "先加平行条件", color: "corrA" },
                    { name: "再加直角或等边", color: "corrB" },
                    { name: "两者兼得", color: "corrC" }
                  ],
                  items: [
                    { id: "n1", label: "平行四边形：多了“两组对边平行”", group: 0, anchor: [50,64],
                      shape: { t: "txt", p: [50,64], text: "平行四边形", size: 14.48, bold: true } },
                    { id: "n2", label: "矩形：多了“一个角是直角”", group: 1, anchor: [24,44],
                      shape: { t: "txt", p: [24,44], text: "矩形", size: 14.48, bold: true } },
                    { id: "n3", label: "菱形：多了“一组邻边相等”", group: 1, anchor: [76,44],
                      shape: { t: "txt", p: [76,44], text: "菱形", size: 14.48, bold: true } },
                    { id: "n4", label: "正方形：直角和等边兼得", group: 2, anchor: [50,24],
                      shape: { t: "txt", p: [50,24], text: "正方形", size: 14.48, bold: true } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点一点：家族里的每个成员，看看它比上一代“多了什么条件”。",
                "四边形 → 加两组对边平行 → 平行四边形 → 加一个直角 → 矩形 / 加邻边相等 → 菱形。",
                "矩形 + 邻边相等 = 正方形；菱形 + 一个直角 = 正方形——两条路都通。"
              ],
              examples: [
                { text: "从一般到特殊：条件越加越多，图形越来越“方”", figure: "谱系" }
              ],
              prev: "g06-u1-l4-p4",
              next: "g06-u1-l5-p2"
            },
            {
              id: "g06-u1-l5-p2",
              title: "正方形：两家本事全有",
              pageKind: "explain",
              concept: "正方形的性质",
              formulas: [
                {
                  id: "f1",
                  latex: "AC = BD, AC \\perp BD",
                  translation: "正方形的对角线：相等、互相垂直平分"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：对角线等长刻度 + 交点直角方块——矩形和菱形的本事集于一身。",
                      shapes: [
                        { t: "poly", pts: [[30,32],[70,32],[70,72],[30,72]], color: "known", width: 3 },
                        { t: "seg", a: [30,32], b: [70,72], color: "known", width: 2.5 },
                        { t: "seg", a: [70,32], b: [30,72], color: "known", width: 2.5 },
                        { t: "seg", a: [30,32], b: [70,72], ticks: 1, color: "corrA" },
                        { t: "seg", a: [70,32], b: [30,72], ticks: 1, color: "corrA" },
                        { t: "right", v: [50,52], p: [70,72], q: [70,32], color: "target" },
                        { t: "txt", p: [50,90], text: "相等 + 垂直平分", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话：正方形是矩形和菱形的“孩子”——两家的本事它全有。",
                "从矩形那儿继承：四个角是直角，对角线相等；从菱形那儿继承：四条边相等，对角线垂直。",
                "生活例：地砖、魔方的一个面；图形例：对角线又等长又有直角标记。",
                "反例：长方形（长≠宽）——是矩形但邻边不相等，不是正方形；一般的菱形——角不是直角，不是正方形。",
                "⚠️ 别搞混：正方形一定是矩形、一定是菱形；反过来不行——“是”的方向别说反。",
                "记住一句话：正方形 = 矩形 + 菱形，对角线相等且垂直平分。"
              ],
              examples: [
                { text: "正方形判定速查：矩形+邻边相等，或菱形+一个直角", figure: "方法" }
              ],
              prev: "g06-u1-l5-p1",
              next: "g06-u1-l6-p1"
            }
          ]
        },
        /* ============ g06.1.6 梯形与三角形中位线（3 页） ============ */
        {
          id: "g06-u1-l6",
          title: "梯形与三角形中位线",
          pages: [
            {
              id: "g06-u1-l6-p1",
              title: "切一角：拼出平行四边形",
              concept: "三角形中位线定理的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "DE \\parallel BC, DE = \\frac{1}{2} BC",
                  translation: "中位线 DE 平行于第三边 BC，长度是 BC 的一半"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: true,
                  steps: [
                    {
                      caption: "第 1 帧：△ABC，D、E 是两边的中点，连 DE——这条线叫中位线。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[56,74]], color: "line", width: 3 },
                        { t: "pt", p: [50,30], label: "D", color: "known" },
                        { t: "pt", p: [38,52], label: "E", color: "known" },
                        { t: "seg", a: [50,30], b: [38,52], color: "target", width: 3.5 },
                        { t: "txt", p: [50,90], text: "DE：中位线", size: 14.48, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 2 帧：沿 DE 把小三角形 ADE 剪下来。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[56,74]], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[20,30],[50,30],[38,52]], color: "target", width: 3 },
                        { t: "seg", a: [50,30], b: [38,52], color: "target", width: 3.5 },
                        { t: "txt", p: [50,90], text: "剪下 △ADE", size: 14.48, bold: true, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 帧：把小三角形转 180° 拼到下面——DE 和它的“复制品”连成一条直线。",
                      shapes: [
                        { t: "poly", pts: [[50,30],[80,30],[56,74],[26,74]], color: "known", width: 3 },
                        { t: "poly", pts: [[26,74],[38,52],[50,30]], color: "target", width: 2, dash: "5,4" },
                        { t: "seg", a: [50,30], b: [26,74], color: "target", width: 3.5 },
                        { t: "seg", a: [50,30], b: [38,52], ticks: 1, color: "corrA" },
                        { t: "seg", a: [38,52], b: [26,74], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,90], text: "拼成平行四边形 DBCF", size: 14.48, bold: true },
                        { t: "txt", p: [50,14], text: "DF = 2×DE，DF ∥ BC", size: 13, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点▶：中位线把三角形“切”出一角，转下来一拼——拼成了平行四边形。",
                "没变的是：DE 的长度——转下来后，DF 正好是两个 DE。",
                "看到的是：DE ∥ BC，DE = BC 的一半——这就是三角形中位线定理。"
              ],
              examples: [
                { text: "剪纸：沿中位线剪下小三角形，旋转拼回去", figure: "实物" }
              ],
              prev: "g06-u1-l5-p2",
              next: "g06-u1-l6-p2"
            },
            {
              id: "g06-u1-l6-p2",
              title: "证明：三角形中位线定理",
              concept: "中位线定理的证明",
              formulas: [
                {
                  id: "f1",
                  latex: "DE \\parallel BC, DE = \\frac{1}{2} BC",
                  translation: "中位线 DE 平行于第三边 BC，长度是 BC 的一半"
                }
              ],
              interaction: {
                type: "proof-replay",
                params: {
                  given: "D、E 为 AB、AC 中点",
                  goal: "DE ∥ BC，DE = ½BC",
                  steps: [
                    {
                      card: "把 DE 延长一倍，端点记作 F，连 CF——造一个全等三角形。",
                      why: "作图：延长线段到 2 倍、连接两点。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[56,74]], color: "line", width: 3 },
                        { t: "pt", p: [50,30], label: "D", color: "known" },
                        { t: "pt", p: [38,52], label: "E", color: "known" },
                        { t: "seg", a: [50,30], b: [38,52], color: "target", width: 3 },
                        { t: "seg", a: [38,52], b: [26,74], color: "target", width: 3, dash: "6,4" },
                        { t: "seg", a: [56,74], b: [26,74], color: "aux", width: 2, dash: "5,4" },
                        { t: "pt", p: [26,74], label: "F", color: "target" },
                        { t: "txt", p: [50,90], text: "第 1 步：延长 DE 到 F", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "AE=CE，DE=FE，对顶角相等——SAS，△ADE ≌ △CFE。",
                      why: "SAS 判定（第 g04.1.3 页）；中点定义；对顶角相等（第 g02.1.1 页）。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[56,74]], color: "aux", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[20,30],[50,30],[38,52]], color: "corrA", width: 3 },
                        { t: "poly", pts: [[56,74],[26,74],[38,52]], color: "corrB", width: 3 },
                        { t: "seg", a: [50,30], b: [38,52], ticks: 1, color: "corrA" },
                        { t: "seg", a: [38,52], b: [26,74], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,90], text: "第 2 步：△ADE ≌ △CFE（SAS）", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "全等了：AD=CF，∠A=∠ECF——内错角相等，所以 AD ∥ CF。",
                      why: "全等三角形对应边/角相等；内错角相等 → 两直线平行（判定）。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[56,74]], color: "line", width: 1.5 },
                        { t: "seg", a: [20,30], b: [50,30], ticks: 1, color: "corrA", width: 3 },
                        { t: "seg", a: [56,74], b: [26,74], ticks: 1, color: "corrA", width: 3 },
                        { t: "arc", v: [20,30], a1: 0, a2: 51, r: 9, group: 1, color: "corrAngle" },
                        { t: "arc", v: [56,74], a1: 180, a2: 231, r: 9, group: 1, color: "corrAngle" },
                        { t: "txt", p: [50,90], text: "第 3 步：AD=CF，AD ∥ CF", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "DB=AD=CF，且 DB ∥ CF——一组对边平行且相等，拼出平行四边形 DBCF。",
                      why: "D 是 AB 中点；判定3：一组对边平行且相等 → 平行四边形（第 g06.1.2 页）。",
                      shapes: [
                        { t: "poly", pts: [[50,30],[80,30],[56,74],[26,74]], color: "target", width: 3.5 },
                        { t: "seg", a: [50,30], b: [80,30], ticks: 1, color: "corrA" },
                        { t: "seg", a: [56,74], b: [26,74], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,90], text: "第 4 步：DBCF 是平行四边形", size: 14.48, bold: true }
                      ]
                    },
                    {
                      card: "DF ∥ BC 且 DF=BC（平行四边形性质）；DE 是 DF 的一半——证完。",
                      why: "平行四边形对边平行且相等（性质1，第 g06.1.1 页）。",
                      shapes: [
                        { t: "poly", pts: [[50,30],[80,30],[56,74],[26,74]], color: "line", width: 1.5 },
                        { t: "seg", a: [50,30], b: [26,74], color: "target", width: 3.5 },
                        { t: "seg", a: [80,30], b: [56,74], color: "target", width: 3.5 },
                        { t: "seg", a: [50,30], b: [38,52], ticks: 1, color: "corrA" },
                        { t: "seg", a: [38,52], b: [26,74], ticks: 1, color: "corrA" },
                        { t: "txt", p: [50,90], text: "第 5 步：DE ∥ BC，DE = 一半 BC", size: 14.48, bold: true, color: "known" }
                      ]
                    }
                  ],
                  summary: [
                    { statement: "延长 DE 到 F 使 DE=EF，连 CF", reason: "作图" },
                    { statement: "△ADE ≌ △CFE（SAS）", reason: "AE=CE、DE=FE、对顶角相等" },
                    { statement: "AD=CF，AD ∥ CF", reason: "对应边/角相等；内错角相等→平行" },
                    { statement: "四边形 DBCF 是平行四边形", reason: "DB=CF 且 DB ∥ CF（判定3）" },
                    { statement: "DE ∥ BC，DE=一半 BC", reason: "平行四边形性质1；DE=一半 DF" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "证明三问：已知 D、E 是中点；求证 DE ∥ BC 且 DE = 一半 BC；第一步敢延长 DE，因为要“造”一个平行四边形。",
                "5 步踩线：延长→全等→平行→拼出平行四边形→搬性质——一步都不能少。"
              ],
              examples: [
                { text: "思路模板：中点+延长一倍，是几何最常用的“造全等”手法", figure: "方法" }
              ],
              prev: "g06-u1-l6-p1",
              next: "g06-u1-l6-p3"
            },
            {
              id: "g06-u1-l6-p3",
              title: "梯形：“只有”是关键词",
              pageKind: "explain",
              concept: "梯形的定义",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{只有一组对边平行的四边形叫做梯形}",
                  translation: "只有一组对边平行的四边形，就叫做梯形"
                },
                {
                  id: "f2",
                  latex: "\\text{两腰相等的梯形叫做等腰梯形}",
                  translation: "两腰相等的梯形，叫做等腰梯形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：梯形 vs 平行四边形——注意“只有”两个字。",
                      shapes: [
                        { t: "poly", pts: [[20,30],[80,30],[66,66],[34,66]], color: "known", width: 3 },
                        { t: "seg", a: [20,30], b: [80,30], arrows: 1, color: "corrA" },
                        { t: "seg", a: [66,66], b: [34,66], arrows: 1, color: "corrA" },
                        { t: "txt", p: [50,16], text: "梯形：只有一组对边平行", size: 13, bold: true },
                        { t: "poly", pts: [[24,30],[84,30],[72,66],[12,66]], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,78], text: "❌ 平行四边形不是梯形", size: 14.48, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "人话：四边形里，只有一组对边平行——另一组不平行，它就是梯形。",
                "生活例：水坝的横截面；等腰梯形：两腰相等的梯形，像“对称”的梯子。",
                "图形例：AB ∥ CD（平行箭头），AD 与 BC 不平行。",
                "反例：平行四边形——两组对边都平行，不符合“只有一组”，所以不是梯形！（“只有”是关键词）",
                "⚠️ 别搞混：“一组对边平行”≠梯形——平行四边形也有一组对边平行；必须“只有一组”。",
                "记住一句话：只有一组对边平行，才是梯形。"
              ],
              examples: [
                { text: "水坝横截面、梯子：上窄下宽的等腰梯形", figure: "实物" }
              ],
              prev: "g06-u1-l6-p2",
              next: "g06-u1-l7-p1"
            }
          ]
        },
        /* ============ g06.1.7 本章小结与习题（2 页） ============ */
        {
          id: "g06-u1-l7",
          title: "本章小结与习题",
          pages: [
            {
              id: "g06-u1-l7-p1",
              title: "小结：判定 vs 性质",
              pageKind: "explain",
              concept: "判定与性质的对比",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{判定：条件} \\to \\text{是平行四边形}；\\text{性质：是平行四边形} \\to \\text{结论}",
                  translation: "判定从条件推出是平行四边形，性质从是平行四边形推出边角结论"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "判定",
                      caption: "判定：给“边/角/对角线”的条件 → 断定“是平行四边形”。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "known", width: 3 },
                        { t: "seg", a: [24,28], b: [84,28], ticks: 1, color: "corrA" },
                        { t: "seg", a: [72,68], b: [12,68], ticks: 1, color: "corrA" },
                        { t: "seg", a: [84,28], b: [72,68], ticks: 2, color: "corrB" },
                        { t: "seg", a: [12,68], b: [24,28], ticks: 2, color: "corrB" },
                        { t: "txt", p: [50,90], text: "Q2：两组对边分别相等 → 是平行四边形", size: 13, bold: true, color: "known" }
                      ]
                    },
                    {
                      label: "性质",
                      caption: "性质：已知“是平行四边形” → 得到边、角、对角线的结论。",
                      shapes: [
                        { t: "poly", pts: [[24,28],[84,28],[72,68],[12,68]], color: "known", width: 3 },
                        { t: "seg", a: [24,28], b: [72,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [84,28], b: [12,68], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,90], text: "P1：AB=CD；P2：∠A=∠C；P3：OA=OC", size: 13, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "编号总表——性质：P1 对边平行且相等；P2 对角相等；P3 对角线互相平分。",
                "判定：Q1 两组对边分别平行；Q2 两组对边分别相等；Q3 一组对边平行且相等；Q4 对角线互相平分。",
                "特殊家族：矩形 = 平行四边形 + 一个直角（对角线相等）；菱形 = 平行四边形 + 邻边相等（对角线垂直平分）；正方形 = 两者兼得。",
                "梯形：只有一组对边平行；中位线：平行于第三边，等于它的一半。",
                "做题第一步：已知给的是“条件”还是“是平行四边形”？给条件用判定，已知平行四边形用性质。"
              ],
              examples: [
                { text: "口诀：判定找条件，性质得结论", figure: "方法" }
              ],
              prev: "g06-u1-l6-p3",
              next: "g06-u1-l7-p2"
            },
            {
              id: "g06-u1-l7-p2",
              title: "本章小测：6 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{先看已知：给条件用判定，已知平行四边形用性质}",
                  translation: "做题先看已知给的是条件还是平行四边形，再决定用判定还是性质"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "用性质", color: "corrA" },
                    { name: "用判定", color: "corrB" }
                  ],
                  items: [
                    { id: "q1", label: "① ▱ABCD 中 AB=6cm，求 CD", group: 0, anchor: [25,74],
                      shape: { t: "txt", p: [25,74], text: "①", size: 22.86, bold: true } },
                    { id: "q2", label: "② AB=CD=5、AD=BC=4，是平行四边形吗", group: 1, anchor: [75,74],
                      shape: { t: "txt", p: [75,74], text: "②", size: 22.86, bold: true } },
                    { id: "q3", label: "③ 矩形 ABCD 对角线交于 O，AC=8cm，求 OA", group: 0, anchor: [25,52],
                      shape: { t: "txt", p: [25,52], text: "③", size: 22.86, bold: true } },
                    { id: "q4", label: "④ 对角线互相平分的四边形，是平行四边形吗", group: 1, anchor: [75,52],
                      shape: { t: "txt", p: [75,52], text: "④", size: 22.86, bold: true } },
                    { id: "q5", label: "⑤ “对角线相等的四边形一定是矩形”对吗？举反例", group: 1, anchor: [25,30],
                      shape: { t: "txt", p: [25,30], text: "⑤", size: 22.86, bold: true } },
                    { id: "q6", label: "⑥ ▱ABCD 中 ∠A=70°，求 ∠B、∠C", group: 0, anchor: [75,30],
                      shape: { t: "txt", p: [75,30], text: "⑥", size: 22.86, bold: true } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点一点：把 6 道题送进“用性质”或“用判定”的篮子。",
                "1．▱ABCD 中 AB=6cm，求 CD。",
                "2．四边形 ABCD 中 AB=CD=5cm、AD=BC=4cm，是平行四边形吗？",
                "3．矩形 ABCD 对角线交于 O，AC=8cm，求 OA。",
                "4．对角线互相平分的四边形，是平行四边形吗？",
                "5．“对角线相等的四边形一定是矩形”——对吗？举反例。",
                "6．▱ABCD 中 ∠A=70°，求 ∠B、∠C。"
              ],
              examples: [
                { figure: "核对答案", text: "答案：①CD=6cm（P1 对边相等）；②是（Q2）；③OA=4cm（对角线相等且平分）；④是（Q4）；⑤不对，等腰梯形对角线也相等；⑥∠C=70°（P2），∠B=110°（邻角互补）" }
              ,
                { figure: "错因解析", text: "认图：“已知图形求边角”用性质；“判断是不是平行四边形”用判定。1．平行四边形对边相等：CD=AB=6cm（性质 P1）。2．两组对边分别相等→是平行四边形（判定 Q2）。3．矩形对角线相等且互相平分：OA=AC/2=4cm。4．对角线互相平分→是平行四边形（判定 Q4）。5．不对：等腰梯形对角线也相等——“对角线相等”推不出矩形，还要“互相平分”。6．∠C=∠A=70°（对角相等 P2）；∠B=180°−70°=110°（邻角互补）。" }],
              prev: "g06-u1-l7-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
