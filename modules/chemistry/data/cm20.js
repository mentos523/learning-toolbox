/* ============================================================
 * 学习工具箱 · 化学 · 第二十章数据（蓝队 2026-10-15，阶段三批4）
 * 物质结构与性质（选择性必修二）· 6 课 / 16 页
 *
 * 数据格式：schema v1.0 冻结（见 data/cm05.js 文件头）。
 * 组件类型名冻结（docs/chemistry-interactions.md）：
 *   tri-rep(Y6) / side-compare(Y11复用物理Y5) / reaction-particle(C7)
 * 说明：C2 明确不做 cm20/cm21（大π键/配合物另起静态页）；
 *       3D 分子构型可旋转组件不在冻结清单内，VSEPR 用对照表落实。
 * window.CHEM_CH["cm20"] = { id, units[] }（注册由引擎 index.html script 标签完成）。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm20"] = {
  id: "cm20",
  units: [
    {
      id: "cm20.1",
      title: "原子与分子结构",
      lessons: [
        {
          id: "cm20.1.1",
          title: "原子结构与性质（深化）",
          prereq: "cm19.2.2 电解池",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm20.1.1-p1",
              kind: "explain",
              title: "能级：电子的“楼层”",
              blocks: [
                { type: "lead", text: "cm14 学了电子层。今天细分：同一层里还有“单间”——能级 s、p、d、f。" },
                { type: "text", html: "K 层只有 1s；L 层有 2s、2p；M 层有 3s、3p、3d……容量：s 2 个、p 6 个、d 10 个、f 14 个。" },
                { type: "text", html: "构造原理：按能量从低到高排：1s 2s 2p 3s 3p 4s 3d 4p……能级交错：4s 能量低于 3d，先排 4s！泡利原理、洪特规则定性了解。" },
                { type: "text", html: "本质是能量最低原理。周期表按电子排布分区：s、d、ds、p 区。" },
                { type: "mathlink", text: "奠基：代数 ch09 数列——2、6、10、14 是有规律的数列。" },
                { type: "trap", text: "⚠ 别搞混：4s 能量低于 3d！“排满一层再排下一层”只对前三层成立。" }
              ],
              point: "能量最低原理：先排 4s 再排 3d。下一页：能级对照表。"
            },
            {
              id: "cm20.1.1-p2",
              kind: "interact",
              title: "能级能量顺序对照",
              exploreTip: "对照左右两栏：能量顺序 vs 每能级容量，找到 4s 和 3d。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "构造原理：能量从低到高",
                      rows: ["1s", "2s", "2p", "3s", "3p", "4s", "3d", "4p"]
                    },
                    right: {
                      title: "每个能级最多住几个电子",
                      rows: ["2", "2", "6", "2", "6", "2", "10", "6"]
                    },
                    verdict: "按能量最低排：4s 排在 3d 前面（能级交错）——电子住“便宜房子”优先"
                  }
                }
              ],
              point: "4s 在 3d 前面——能级交错，记住它。"
            },
            {
              id: "cm20.1.1-p3",
              kind: "quiz",
              title: "练一练：能量最低",
              questions: [
                {
                  type: "choice",
                  stem: "按构造原理，3p 之后先排？",
                  options: ["3d", "4s", "4p"],
                  answer: 1,
                  tip: "能级交错：4s 能量低于 3d。"
                },
                {
                  type: "choice",
                  stem: "3d 能级最多容纳电子数？",
                  options: ["6", "10", "14"],
                  answer: 1,
                  tip: "s2、p6、d10、f14。"
                },
                {
                  type: "choice",
                  stem: "电子排布的本质是？",
                  options: ["背口诀", "能量最低原理", "排满一层再说"],
                  answer: 1,
                  tip: "电子住“最便宜的房子”——能量最低。"
                }
              ],
              point: "构造原理 + 能级交错——电子排布一次讲透。"
            }
          ]
        },
        {
          id: "cm20.1.2",
          title: "共价键与分子空间结构",
          prereq: "cm20.1.1 原子结构与性质（深化）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm20.1.2-p1",
              kind: "explain",
              title: "VSEPR：电子对互相“挤”",
              blocks: [
                { type: "lead", text: "H₂O 为什么是折线形？NH₃ 为什么是三角锥形？——价层电子对互相排斥，“挤”出了形状。" },
                { type: "text", html: "σ 键“头碰头”，π 键“肩并肩”。双键 = σ+π，三键 = σ+2π。" },
                { type: "text", html: "VSEPR：价层电子对（成键+孤对）互相排斥。CH₄：4 对成键 → 正四面体（109.5°）；NH₃：3+1 → 三角锥形（107°）；H₂O：2+2 → 折线形（105°）；CO₂：2 对 → 直线形（180°）。" },
                { type: "text", html: "孤对越多“挤”得越狠：109.5° > 107° > 105°。sp³ 杂化（定性）：CH₄ 的 1s+3p“杂”成 4 个等同轨道。" },
                { type: "trap", text: "⚠ 别搞混：H₂O 是折线形！“共价键=共用电子对”太粗——σ 和 π 不一样。" }
              ],
              point: "孤对越多，挤得越狠，键角越小。下一页：四种分子对照。"
            },
            {
              id: "cm20.1.2-p2",
              kind: "interact",
              title: "四种分子构型对照",
              exploreTip: "对照两张表：数一数每种分子的成键电子对和孤电子对。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "CH₄ 甲烷",
                      rows: ["成键电子对：4", "孤电子对：0", "构型：正四面体", "键角：109.5°"]
                    },
                    right: {
                      title: "H₂O 水",
                      rows: ["成键电子对：2", "孤电子对：2", "构型：折线形", "键角：105°"]
                    },
                    verdict: "孤电子对把成键电子对“挤”弯了：109.5° → 105°"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "NH₃ 氨",
                      rows: ["成键电子对：3", "孤电子对：1", "构型：三角锥形", "键角：107°"]
                    },
                    right: {
                      title: "CO₂ 二氧化碳",
                      rows: ["成键电子对：2", "孤电子对：0", "构型：直线形", "键角：180°"]
                    },
                    verdict: "孤对越多，挤得越狠，键角越小——VSEPR 一次看透"
                  }
                }
              ],
              point: "形状 = 电子对排斥的结果——VSEPR 一次看透。"
            },
            {
              id: "cm20.1.2-p3",
              kind: "quiz",
              title: "练一练：谁挤谁",
              questions: [
                {
                  type: "choice",
                  stem: "H₂O 是折线形的原因是？",
                  options: ["O 有两对孤电子对", "H 太多", "O 的电负性大"],
                  answer: 0,
                  tip: "2 对成键 + 2 对孤对 → 折线形（105°）。"
                },
                {
                  type: "choice",
                  stem: "下列键角最大的是？",
                  options: ["CH₄", "NH₃", "H₂O"],
                  answer: 0,
                  tip: "孤对越多挤得越狠：109.5° > 107° > 105°。"
                },
                {
                  type: "choice",
                  stem: "双键 C=C 的构成是？",
                  options: ["2 个 σ 键", "1 个 σ 键 + 1 个 π 键", "2 个 π 键"],
                  answer: 1,
                  tip: "双键 = σ + π；三键 = σ + 2π。"
                }
              ],
              point: "VSEPR：数电子对，看形状——分子空间结构收官。"
            }
          ]
        },
        {
          id: "cm20.1.3",
          title: "分子间作用力",
          prereq: "cm20.1.2 共价键与分子空间结构",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm20.1.3-p1",
              kind: "explain",
              title: "氢键：分子间的“拉手”",
              blocks: [
                { type: "lead", text: "H₂O 和 H₂S 都是 H₂X 型：水 100℃ 才开，H₂S −60℃ 就是气体——差在哪？水分子之间有“拉手”：氢键。" },
                { type: "text", html: "氢键：H 直接连在 N/O/F 上，这个 H 再“拉”住另一个分子的 N/O/F（如 O−H···O）。它比范德华力强得多，但比化学键弱得多——是分子间作用力，不是化学键！" },
                { type: "text", html: "氢键让水的熔沸点反常地高，也让 NH₃、HF 易溶于水。“含氢就有氢键”是错的：CH₄ 的 H 连在 C 上，没有氢键。" },
                { type: "trap", text: "⚠ 别搞混：氢键不是化学键！是分子间作用力；H 必须直接连 N/O/F 才有氢键——CH₄ 没有。" }
              ],
              point: "N/O/F 上的 H 才能“拉手”。下一页：三重表征看氢键。"
            },
            {
              id: "cm20.1.3-p2",
              kind: "interact",
              title: "三重表征：氢键",
              exploreTip: "点三个标签：宏观现象、微观“拉手”、符号表达，对一对。",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "氢键：水为什么 100℃ 才开",
                    views: {
                      macro: { text: "水 100℃ 沸腾，H₂S −60℃ 就是气体——都是 H₂X 型，脾气差这么多" },
                      micro: { text: "水分子之间有氢键“拉手”，H₂S 分子之间只有范德华力（示意，未按比例）", anim: "ref:particle-view" },
                      symbol: { mathml: "O−H···O", gloss: "宏观读“氢键”；微观读“H 连着 O，再拉住另一个分子的 O”" }
                    },
                    defaultView: "macro",
                    badgeText: { macro: "现在看：宏观现象", micro: "现在看：微观粒子", symbol: "现在看：符号表达" }
                  }
                }
              ],
              point: "宏观反常高沸点 = 微观氢键“拉手”——三重对得上。"
            },
            {
              id: "cm20.1.3-p3",
              kind: "quiz",
              title: "练一练：拉手的条件",
              questions: [
                {
                  type: "choice",
                  stem: "氢键属于？",
                  options: ["化学键", "分子间作用力", "离子键"],
                  answer: 1,
                  tip: "氢键比化学键弱得多，是分子间作用力。"
                },
                {
                  type: "choice",
                  stem: "下列能形成分子间氢键的是？",
                  options: ["CH₄", "H₂O", "H₂S"],
                  answer: 1,
                  tip: "H 直接连 N/O/F：H₂O ✓；CH₄ 的 H 连 C 上 ✗。"
                },
                {
                  type: "choice",
                  stem: "水的沸点反常高的主要原因是？",
                  options: ["水分子质量大", "分子间氢键", "共价键强"],
                  answer: 1,
                  tip: "氢键“拉手”：要拆开它们得多加热。"
                }
              ],
              point: "氢键三句话：N/O/F 上的 H、分子间、比化学键弱。"
            }
          ]
        }
      ]
    },
    {
      id: "cm20.2",
      title: "晶体与配合物",
      lessons: [
        {
          id: "cm20.2.1",
          title: "晶体",
          prereq: "cm20.1.3 分子间作用力",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm20.2.1-p1",
              kind: "explain",
              title: "四种晶体：四个维度",
              blocks: [
                { type: "lead", text: "金刚石硬、干冰易升华、NaCl 脆、铁导电——都是固体，脾气差这么多？看构成微粒和微粒间的作用力。" },
                { type: "text", html: "分子晶体（干冰）：微粒是分子，作用力是分子间作用力——熔沸点低，固态不导电。熔化破坏的是分子间作用力，不是共价键！" },
                { type: "text", html: "共价晶体（金刚石）：原子以共价键连成网——熔沸点很高，固态不导电。离子晶体（NaCl）：离子键——熔沸点较高，固态不导电（离子动不了），熔融/水溶液导电。金属晶体：金属键——导电导热、有延展性。" },
                { type: "trap", text: "⚠ 别搞混：分子晶体熔化不断共价键！离子晶体固态不导电——“离子晶体导电”缺了“熔融/水溶液”条件就是错的。" }
              ],
              point: "微粒+作用力，决定一切性质。下一页：四张对照表。"
            },
            {
              id: "cm20.2.1-p2",
              kind: "interact",
              title: "四种晶体对照",
              exploreTip: "看两张对照表：微粒、作用力、熔沸点、导电性，四个维度一次对齐。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "分子晶体（干冰）",
                      rows: ["微粒：分子", "作用力：分子间作用力", "熔沸点：低", "导电性：固态不导电"]
                    },
                    right: {
                      title: "共价晶体（金刚石）",
                      rows: ["微粒：原子", "作用力：共价键", "熔沸点：很高", "导电性：固态不导电"]
                    },
                    verdict: "干冰升华断的是分子间作用力，金刚石熔化断的是共价键"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: {
                      title: "离子晶体（NaCl）",
                      rows: ["微粒：离子", "作用力：离子键", "熔沸点：较高", "导电性：固态不导电，熔融/水溶液导电"]
                    },
                    right: {
                      title: "金属晶体（铁）",
                      rows: ["微粒：金属阳离子+自由电子", "作用力：金属键", "熔沸点：差别大", "导电性：固态导电"]
                    },
                    verdict: "离子晶体固态不导电（离子动不了）；金属靠自由电子导电"
                  }
                }
              ],
              point: "干冰升华断的是分子间作用力——记住这个例子。"
            },
            {
              id: "cm20.2.1-p3",
              kind: "quiz",
              title: "练一练：四维对齐",
              questions: [
                {
                  type: "choice",
                  stem: "干冰升华时被破坏的是？",
                  options: ["共价键", "分子间作用力", "离子键"],
                  answer: 1,
                  tip: "分子晶体：熔化/升华断分子间作用力，分子本身没碎。"
                },
                {
                  type: "choice",
                  stem: "NaCl 固态不导电的原因是？",
                  options: ["没有离子", "离子不能自由移动", "没有电子"],
                  answer: 1,
                  tip: "固态离子被锁定；熔融/水溶液中离子自由移动才导电。"
                },
                {
                  type: "choice",
                  stem: "熔沸点很高、固态不导电的是？",
                  options: ["干冰", "金刚石", "NaCl"],
                  answer: 1,
                  tip: "共价晶体：共价键网，熔沸点很高。"
                }
              ],
              point: "四种晶体四维对照——微粒+作用力定性质。"
            }
          ]
        },
        {
          id: "cm20.2.2",
          title: "配位键与配合物",
          prereq: "cm20.2.1 晶体",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm20.2.2-p1",
              kind: "explain",
              title: "配位键：特殊的共价键",
              blocks: [
                { type: "lead", text: "NH₄⁺ 里四个 N–H 键完全等同——可 NH₃ 明明只有三个 H，第四个 H⁺ 是“后来的”，它凭什么一样？" },
                { type: "text", html: "配位键：一方提供孤电子对，一方提供空轨道，形成的共用电子对。NH₄⁺：N 提供孤电子对，H⁺ 提供空轨道；[Cu(NH₃)₄]²⁺：N 的孤电子对 → Cu²⁺ 的空轨道（配位数 4）。" },
                { type: "text", html: "配位键是特殊的共价键！形成后，NH₄⁺ 的四个 N–H 键完全等同——分不出“原配”和“后来的”。" },
                { type: "trap", text: "⚠ 别搞混：配位键不是“另一种键”——是共价键的一种；NH₄⁺ 四个键一样，别说“三个共价键一个配位键”。" }
              ],
              point: "一方出孤对，一方出空轨道。下一页看 [Cu(H₂O)₄]²⁺ 形成。"
            },
            {
              id: "cm20.2.2-p2",
              kind: "interact",
              title: "看：[Cu(H₂O)₄]²⁺ 形成",
              exploreTip: "按 ▶ 看 4 个水分子的孤电子对“伸进”Cu²⁺ 的空轨道。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "Cu²⁺ + 4H₂O = [Cu(H₂O)₄]²⁺" },
                    particles: [
                      { id: "cu", kind: "ion", label: "Cu", charge: "+2", role: "reactant", count: 1 },
                      { id: "w", kind: "molecule", label: "H₂O", charge: null, role: "reactant", count: 4 },
                      { id: "c", kind: "ion", label: "[Cu(H₂O)₄]", charge: "+2", role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "Cu²⁺ 有空轨道，H₂O 的 O 上有孤电子对", moves: [] },
                      { caption: "4 个 H₂O 的孤电子对“伸进”Cu²⁺ 的空轨道", moves: [] },
                      { caption: "形成 [Cu(H₂O)₄]²⁺：配位键是特殊的共价键", form: [{ ids: ["cu", "w"], label: "[Cu(H₂O)₄]²⁺" }] }
                    ],
                    counter: true,
                    spectatorFade: true,
                    slowmo: true
                  }
                }
              ],
              point: "孤电子对 → 空轨道——配位键，一次看清。"
            }
          ]
        },
        {
          id: "cm20.2.3",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm20.2.3-p1",
              kind: "explain",
              title: "本章小结：结构决定性质（终极版）",
              blocks: [
                { type: "text", html: "① 能级与构造原理：1s2s2p3s3p4s3d……（4s 先于 3d，能量最低原理）。② 共价键：σ/π；VSEPR：孤对越多挤得越狠（CH₄ 109.5° > NH₃ 107° > H₂O 105°）。③ 氢键：H 连 N/O/F，分子间作用力。④ 四种晶体：微粒+作用力定性质。⑤ 配位键：孤对→空轨道，特殊的共价键。" }
              ],
              point: "“结构决定性质”的终极版：从电子排布一路讲到晶体。下一页：本章习题。"
            },
            {
              id: "cm20.2.3-p2",
              kind: "quiz",
              title: "本章习题",
              questions: [
                {
                  type: "choice",
                  stem: "4s 与 3d 先排？",
                  options: ["3d", "4s", "同时"],
                  answer: 1,
                  tip: "能级交错：4s 能量低于 3d。"
                },
                {
                  type: "choice",
                  stem: "NH₃ 的空间构型是？",
                  options: ["平面三角形", "三角锥形", "正四面体"],
                  answer: 1,
                  tip: "3 对成键 + 1 对孤对 → 三角锥形。"
                },
                {
                  type: "choice",
                  stem: "下列没有分子间氢键的是？",
                  options: ["HF", "NH₃", "CH₄"],
                  answer: 2,
                  tip: "CH₄ 的 H 连在 C 上，无氢键。"
                },
                {
                  type: "choice",
                  stem: "固态能导电的是？",
                  options: ["NaCl 固体", "铁", "金刚石"],
                  answer: 1,
                  tip: "金属晶体：自由电子导电。"
                },
                {
                  type: "fill",
                  stemBefore: "某元素原子 L 层电子数是 K 层的 3 倍，该元素是",
                  stemAfter: "。",
                  answer: "氧",
                  accept: ["O", "氧元素"],
                  hint: "K 层最多 2",
                  tip: "K 层 2 个，L 层 6 个 → 氧。"
                },
                {
                  type: "choice",
                  stem: "干冰用于人工降雨，利用的是？",
                  options: ["CO₂ 与水反应", "干冰升华吸热", "CO₂ 的酸性"],
                  answer: 1,
                  tip: "分子晶体升华：断分子间作用力、吸热。"
                }
              ],
              point: "从电子排布到晶体：结构决定性质——本章收官。"
            }
          ]
        }
      ]
    }
  ]
};
