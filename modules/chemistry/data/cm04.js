/* ============================================================
 * 学习工具箱 · 化学 · 第四章数据（蓝队 2026-10-15，阶段三·批1）
 *
 * schema 冻结版 v1.0（见 data/cm05.js 文件头）。本章组件：
 * Y6 tri-rep（cm04.1.1 过滤 / cm04.1.2 水的组成）；
 * Y1 formula-read（cm04.2.1 H₂O 四层含义慢读，红线辨析①立靶；
 *   cm04.2.2 Ca(OH)₂ 慢读，原子团括号）；
 * C2 molecule-build（cm04.2.1 拼 H₂O，跃升 4 立靶）。
 * 红线辨析①（下标 vs 系数）立靶 + 红线辨析④（元素 vs 原子）回填。
 *
 * ---- B6 原子球颜色惯例表（蓝队提案，待黄队确认） ----
 * 教科书惯例简化版；每个球必配元素符号文字（双编码）；
 * 球大小只分档（注“示意，未按比例”）：
 *   H 白（浅灰）/ O 红 / C 黑（深灰）/ N 蓝 / Cl 绿 / S 黄 /
 *   Na 紫 / Ca 灰绿
 * 深色模式：深色球描边加粗一档。待黄队确认后冻结。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm04"] = {
  id: "cm04",
  units: [
    {
      id: "cm04.1",
      title: "水与净化",
      lessons: [
        {
          id: "cm04.1.1",
          title: "爱护水资源与水的净化",
          prereq: "cm03 元素",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm04.1.1-p1",
              kind: "explain",
              title: "水：净化四步走",
              blocks: [
                { type: "lead", text: "地球上水很多，能喝的很少——自来水厂每天都在“洗”水。" },
                { type: "text", html: "净化方法：<b>沉淀 → 过滤 → 吸附 → 蒸馏</b>（程度渐深）。过滤只除<b>不溶性固体</b>：滤纸、漏斗、玻璃棒“三靠”（一贴二低三靠）——玻璃棒轻靠三层滤纸处引流。" },
                { type: "text", html: "自来水厂流程：取水 → 沉淀 → 过滤 → 吸附 → 消毒。硬水 vs 软水：肥皂水检验——泡沫多的是软水，浮渣多的是硬水。" },
                { type: "trap", text: "⚠ “过滤能除去可溶性杂质”是错觉：糖水过滤还是糖水——过滤只除不溶性固体；“自来水是纯净物”也是错觉：自来水是混合物（含矿物质、消毒剂）！" }
              ],
              point: "净化四步：沉淀→过滤→吸附→蒸馏——过滤只除不溶性固体。"
            },
            {
              id: "cm04.1.1-p2",
              kind: "interact",
              title: "过滤：三靠留住泥沙",
              exploreTip: "点三个页签：浑浊泥水进去，清水出来——泥沙去哪了？",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "过滤：三靠留住泥沙",
                    views: {
                      macro: { text: "浑浊的泥水倒进漏斗，滤纸上留下泥沙，漏斗下面流出澄清的水。" },
                      micro: { text: "水分子穿过滤纸孔隙流走，泥沙颗粒太大被拦截在滤纸上（示意）。" },
                      symbol: {
                        mathml: "<math><mtext>（无化学反应，不写方程式——过滤是物理变化）</mtext></math>",
                        gloss: "符号这一重是空的：泥沙还是泥沙、水还是水——没有新物质，是物理变化。规范口诀：滤纸紧贴漏斗壁、液面低于滤纸边、玻璃棒轻靠三层滤纸处。"
                      }
                    },
                    defaultView: "macro",
                    badgeText: {
                      macro: "现在看：宏观现象",
                      micro: "现在看：微观粒子",
                      symbol: "现在看：符号表达"
                    }
                  }
                }
              ],
              point: "过滤三靠：滤纸、漏斗、玻璃棒各就各位——规范动作防的是浑浊。"
            },
            {
              id: "cm04.1.1-p3",
              kind: "quiz",
              title: "练一练：净化常识",
              questions: [
                {
                  type: "choice",
                  stem: "把糖水过滤一遍，得到的是？",
                  options: ["纯净水", "还是糖水", "蔗糖固体"],
                  answer: 1,
                  tip: "过滤只除不溶性固体——糖溶解了，滤不掉，还是糖水。"
                },
                {
                  type: "choice",
                  stem: "自来水属于？",
                  options: ["纯净物", "混合物", "化合物"],
                  answer: 1,
                  tip: "自来水含矿物质、消毒剂等——是混合物。"
                },
                {
                  type: "choice",
                  stem: "用肥皂水检验水样，泡沫很少、浮渣很多，说明是？",
                  options: ["软水", "硬水", "蒸馏水"],
                  answer: 1,
                  tip: "泡沫多是软水，浮渣多是硬水——记住这个配对。"
                }
              ],
              point: "净化口诀：沉淀过滤吸附蒸馏——一关比一关干净。"
            }
          ]
        },
        {
          id: "cm04.1.2",
          title: "水的组成",
          prereq: "cm04.1.1 水的净化",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm04.1.2-p1",
              kind: "explain",
              title: "电解水：水里有什么",
              blocks: [
                { type: "lead", text: "水通上电，冒出两种气体——水到底是由什么组成的？" },
                { type: "text", html: "电解水：<b>正氧负氢</b>——正极产生氧气（带火星木条复燃），负极产生氢气（能燃烧），H₂∶O₂ <b>体积比 2∶1</b>。结论：<b>水由氢、氧两种元素组成</b>（宏观表述！）。" },
                { type: "text", html: "分类三兄弟：<b>单质</b>（同种元素，如 H₂、Fe）→ <b>化合物</b>（不同种元素，如 H₂O）→ <b>氧化物</b>（两种元素且有氧，如 CO₂）。" },
                { type: "trap", text: "⚠ “水是由氢气和氧气组成的”是错句：水由氢、氧元素组成——红线辨析④回填；“水电解是物理变化”也是错觉：有新物质生成，是化学变化。" },
                { type: "mathlink", text: "数学呼应 · 代数 ch01 比例（奠基）：H₂∶O₂ = 2∶1——体积比就是比例，化学里处处是比例。" }
              ],
              point: "正氧负氢，体积比 2∶1——水由氢、氧两种元素组成。"
            },
            {
              id: "cm04.1.2-p2",
              kind: "interact",
              title: "水的组成：三重表征",
              exploreTip: "点三个页签：电解水的现象、粒子、符号对得上。",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "水的组成：电解水的三重表征",
                    views: {
                      macro: { text: "水通电：正极产生使带火星木条复燃的气体（氧气），负极产生能燃烧的气体（氢气），体积比约 2∶1。" },
                      micro: { text: "H₂O 分子破裂成 H、O 原子，重组为 H₂、O₂ 分子（示意）——分子种类变了，是化学变化。" },
                      symbol: {
                        mathml: "<math><mrow><mn>2</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi></mrow><mover><mo>=</mo><mtext>通电</mtext></mover><mrow><mn>2</mn><msub><mi>H</mi><mn>2</mn></msub><mo>↑</mo><mo>+</mo><msub><mi>O</mi><mn>2</mn></msub><mo>↑</mo></mrow></math>",
                        gloss: "2H₂O ＝通电＝ 2H₂↑ + O₂↑：正氧负氢，H₂∶O₂ 体积比 2∶1——水由氢、氧两种元素组成。"
                      }
                    },
                    defaultView: "macro",
                    badgeText: {
                      macro: "现在看：宏观现象",
                      micro: "现在看：微观粒子",
                      symbol: "现在看：符号表达"
                    }
                  }
                }
              ],
              point: "三重对齐：现象（正氧负氢）→ 粒子（分子破裂重组）→ 符号（2H₂O 电解）。"
            },
            {
              id: "cm04.1.2-p3",
              kind: "quiz",
              title: "练一练：组成与分类",
              questions: [
                {
                  type: "choice",
                  stem: "电解水实验证明了？",
                  options: [
                    "水是由氢气和氧气组成的",
                    "水由氢、氧两种元素组成",
                    "水是混合物"
                  ],
                  answer: 1,
                  tip: "宏观表述用元素：水由氢、氧两种元素组成——红线辨析④回填。"
                },
                {
                  type: "choice",
                  stem: "下列属于氧化物的是？",
                  options: ["O₂", "H₂O", "Ca(OH)₂"],
                  answer: 1,
                  tip: "氧化物：两种元素、其中一种是氧的化合物——H₂O 是，O₂ 是单质，Ca(OH)₂ 有三种元素。"
                },
                {
                  type: "fill",
                  stemBefore: "电解水时，与电源正极相连的玻璃管中产生的是",
                  stemAfter: "气。",
                  answer: "氧",
                  accept: ["氧气", "O2", "O₂"],
                  hint: "正氧负氢",
                  tip: "正氧负氢——正极是氧气，负极是氢气。"
                }
              ],
              point: "分类三兄弟：单质（一种元素）→ 化合物（多种元素）→ 氧化物（两种元素+有氧）。"
            }
          ]
        }
      ]
    },
    {
      id: "cm04.2",
      title: "化学式与化合价",
      lessons: [
        {
          id: "cm04.2.1",
          title: "化学式（上）",
          prereq: "cm04.1.2 水的组成",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm04.2.1-p1",
              kind: "interact",
              title: "H₂O 四层含义慢读",
              exploreTip: "点每一段：宏观读两遍，微观读两遍——四层含义。",
              widgets: [
                {
                  type: "formula-read",
                  params: {
                    formula: "H₂O",
                    recordKey: "chm_read_cm04.2.1",
                    segments: [
                      {
                        label: "H",
                        mathml: "<math><mi>H</mi></math>",
                        fallback: "H",
                        gloss: "H：氢元素符号（一大二小）。宏观含义①：H₂O 表示水这种物质。",
                        level: "macro"
                      },
                      {
                        label: "下标 2",
                        sub: true,
                        mathml: "<math><mn>2</mn></math>",
                        fallback: "₂",
                        gloss: "下标 2：一个水分子里有两个氢原子——这是“身份证号”，改了它，水就变成双氧水（H₂O₂）了。",
                        level: "micro"
                      },
                      {
                        label: "O",
                        mathml: "<math><mi>O</mi></math>",
                        fallback: "O",
                        gloss: "O：氧元素符号。宏观含义②：H₂O 表示水由氢、氧两种元素组成。",
                        level: "macro"
                      },
                      {
                        label: "H₂O 整体",
                        mathml: "<math><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi></math>",
                        fallback: "H₂O",
                        gloss: "整体读 H₂O：宏观①水这种物质②水由氢、氧两种元素组成；微观③一个水分子④一个水分子由两个氢原子和一个氧原子构成——四层含义，一次读全。",
                        level: "micro"
                      }
                    ]
                  }
                }
              ],
              point: "慢读规范：每次读化学式，宏观一遍、微观一遍——四层含义别漏。"
            },
            {
              id: "cm04.2.1-p2",
              kind: "interact",
              title: "拼出 H₂O：下标是身份证",
              exploreTip: "拖 H 和 O 拼出两个水分子；试试给 O 连 3 个 H？",
              widgets: [
                {
                  type: "molecule-build",
                  params: {
                    target: { formula: "H₂O", atoms: { H: 2, O: 1 }, bonds: [["O", "H"], ["O", "H"]] },
                    mode: "target",
                    tray: [
                      { element: "H", count: 4, maxBonds: 1 },
                      { element: "O", count: 2, maxBonds: 2 }
                    ]
                  }
                }
              ],
              point: "示意：球大小未按真实比例——离子化合物（如 NaCl）没有分子，不拼。"
            },
            {
              id: "cm04.2.1-p3",
              kind: "explain",
              title: "红线辨析①：下标 vs 系数",
              blocks: [
                { type: "lead", text: "H₂O 里的“2”和 2H₂O 的“2”，是完全不同的两个“2”——分不清，后面配平必错。" },
                { type: "text", html: "<b>下标是物质的“身份证号”</b>：H₂O 的“2”表示一个水分子里有两个氢原子。改了它，水就变成双氧水（H₂O₂）——另一种物质！<b>系数是“人数”</b>：2H₂O 表示两个水分子。" },
                { type: "text", html: "化学式书写：单质——金属/固态非金属/稀有气体用元素符号（如 Fe、C、He），气态非金属用“元素符号 + 下标”（如 H₂、O₂）；化合物——按化合价写（下节课）。" },
                { type: "trap", text: "⚠ 全书第一大错预告：配平时改下标！H₂O 改成 H₂O₂，水就变成了双氧水——下标是身份证，配平只能调系数（cm05.1.2 回填）。" },
                { type: "slogan", text: "下标是身份证，系数是人数。" }
              ],
              point: "红线辨析①立靶：下标改不得——配平时只能调系数，绝不改下标。"
            },
            {
              id: "cm04.2.1-p4",
              kind: "quiz",
              title: "练一练：身份证保卫战",
              questions: [
                {
                  type: "choice",
                  stem: "H₂O 中的“2”是？",
                  options: ["系数", "下标", "化合价"],
                  answer: 1,
                  tip: "下标：一个水分子里有两个氢原子——是“身份证号”。"
                },
                {
                  type: "choice",
                  stem: "2H₂O 中的“2”是？",
                  options: ["下标", "系数：表示两个水分子", "化合价"],
                  answer: 1,
                  tip: "系数是“人数”：2H₂O = 两个水分子。"
                },
                {
                  type: "choice",
                  stem: "把 H₂O 写成 H₂O₂，会发生什么？",
                  options: [
                    "没什么，只是写法不同",
                    "物质种类变了：H₂O₂ 是双氧水，不再是水",
                    "变成了两个水分子"
                  ],
                  answer: 1,
                  tip: "改下标 = 改物质种类——全书第一大错，cm05.1.2 再回填。"
                }
              ],
              point: "立靶成功：下标是身份证，系数是人数——两个“2”，两回事。"
            }
          ]
        },
        {
          id: "cm04.2.2",
          title: "化学式（下）",
          prereq: "cm04.2.1 化学式（上）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm04.2.2-p1",
              kind: "explain",
              title: "化合价：写化学式的“密码”",
              blocks: [
                { type: "lead", text: "化学式不是背下来的，是“算”出来的——密码叫化合价。" },
                { type: "text", html: "口诀两句：<b>单质中元素化合价为 0</b>；<b>化合物中各元素化合价代数和为 0</b>。化合价是人为规定的数值。常见：H +1、O −2、Na +1、Ca +2、Al +3、Cl −1、OH −1、SO₄ −2。" },
                { type: "text", html: "<b>十字交叉法</b>三步：① 标化合价（如 Ca +2、OH −1）；② 交叉写个数；③ 化简、原子团加括号（Ca(OH)₂——括号不能省！）。" },
                { type: "trap", text: "⚠ “原子团不加括号”是高频错：Ca(OH)₂ 的括号不能省——省了“两个氢氧根”就变成“两个氢”；“化合价 = 离子电荷数”也是错觉：相关但概念不同。" },
                { type: "mathlink", text: "数学呼应 · 代数 ch00 正负数代数和（奠基）：(+2) + 2×(−1) = 0——化合价代数和为零，就是正负数相加。" }
              ],
              point: "口诀两句：单质零价、化合物代数和为零——原子团个数>1，加括号。"
            },
            {
              id: "cm04.2.2-p2",
              kind: "interact",
              title: "Ca(OH)₂ 慢读：括号不能省",
              exploreTip: "点每一段：看括号把“OH”护成一个整体。",
              widgets: [
                {
                  type: "formula-read",
                  params: {
                    formula: "Ca(OH)₂",
                    recordKey: "chm_read_cm04.2.2",
                    segments: [
                      {
                        label: "Ca",
                        mathml: "<math><mi>Ca</mi></math>",
                        fallback: "Ca",
                        gloss: "Ca：钙元素符号（一大二小），化合价 +2。",
                        level: "macro"
                      },
                      {
                        label: "(OH)",
                        mathml: "<math><mo>(</mo><mi>OH</mi><mo>)</mo></math>",
                        fallback: "(OH)",
                        gloss: "OH 是氢氧根（原子团）：整体看作一个“零件”，化合价 −1——括号把它护成整体。",
                        level: "micro"
                      },
                      {
                        label: "下标 2",
                        sub: true,
                        mathml: "<math><mn>2</mn></math>",
                        fallback: "₂",
                        gloss: "下标 2：两个氢氧根——原子团个数大于 1，必须加括号，括号不能省！",
                        level: "micro"
                      },
                      {
                        label: "Ca(OH)₂ 整体",
                        mathml: "<math><mi>Ca</mi><mo>(</mo><mi>OH</mi><mo>)</mo><msub><mn>2</mn></msub></math>",
                        fallback: "Ca(OH)₂",
                        gloss: "整体验算：(+2) + 2×(−1) = 0——化合价代数和为零 ✓，化学式写对了。",
                        level: "micro"
                      }
                    ]
                  }
                }
              ],
              point: "括号是原子团的“保护罩”：个数>1 不加括号，意思全变。"
            },
            {
              id: "cm04.2.2-p3",
              kind: "quiz",
              title: "练一练：十字交叉",
              questions: [
                {
                  type: "fill",
                  stemBefore: "Na（+1）与 Cl（−1）交叉，化学式是",
                  stemAfter: "。",
                  answer: "NaCl",
                  accept: ["nacl", "NACL"],
                  hint: "+1 和 −1 交叉，个数都是 1",
                  tip: "(+1) + (−1) = 0——代数和为零 ✓。"
                },
                {
                  type: "fill",
                  stemBefore: "Ca（+2）与 OH（−1）交叉，化学式是",
                  stemAfter: "（注意括号）。",
                  answer: "Ca(OH)₂",
                  accept: ["Ca(OH)2", "ca(oh)₂"],
                  hint: "原子团个数 >1，加括号",
                  tip: "(+2) + 2×(−1) = 0——括号不能省！"
                },
                {
                  type: "fill",
                  stemBefore: "Al（+3）与 O（−2）交叉，化学式是",
                  stemAfter: "。",
                  answer: "Al₂O₃",
                  accept: ["Al2O3", "al₂o₃"],
                  hint: "3 和 2 交叉",
                  tip: "2×(+3) + 3×(−2) = 0——交叉后化简，Al₂O₃。"
                },
                {
                  type: "choice",
                  stem: "铁单质（Fe）中铁元素的化合价是？",
                  options: ["+2", "+3", "0"],
                  answer: 2,
                  tip: "单质中元素化合价为 0——Fe 是单质，就是 0。"
                }
              ],
              point: "推写三步：标价→交叉→验算（代数和为零）——不背“死式”。"
            }
          ]
        },
        {
          id: "cm04.2.3",
          title: "有关化学式的计算",
          prereq: "cm04.2.2 化学式（下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm04.2.3-p1",
              kind: "explain",
              title: "化学式里的“数”：三种算法",
              blocks: [
                { type: "lead", text: "化学式不光是“名字”，还是“账本”——能算出质量关系。" },
                { type: "text", html: "① <b>相对分子质量</b> = 各原子相对原子质量之和（如 CaCO₃：40 + 12 + 16×3 = 100）。② <b>元素质量比</b> = 原子个数比 × 相对原子质量比（如 Ca∶C∶O = 40∶12∶48 = 10∶3∶12）。③ <b>元素质量分数</b> = 某元素质量 ÷ 相对分子质量（如 Ca% = 40 ÷ 100 = 40%）。" },
                { type: "trap", text: "⚠ “元素质量比 = 原子个数比”是错觉：个数比是“人数比”，质量比是“体重比”——要乘相对原子质量！“质量分数分母用错”也是高频错：分母是相对分子质量。" },
                { type: "mathlink", text: "数学呼应 · 代数 ch01 比例/方程（奠基）：10∶3∶12 是比例，40% 是百分数——化学计算就是比例计算。" }
              ],
              point: "三种算法：相对分子质量（求和）、质量比（个数×原子量）、质量分数（相除）。"
            },
            {
              id: "cm04.2.3-p2",
              kind: "quiz",
              title: "练一练：CaCO₃ 三算",
              questions: [
                {
                  type: "fill",
                  stemBefore: "CaCO₃ 的相对分子质量是",
                  stemAfter: "（Ca 40、C 12、O 16）。",
                  answer: "100",
                  accept: ["100。"],
                  hint: "40 + 12 + 16×3",
                  tip: "相对分子质量 = 各原子相对原子质量之和 = 100。"
                },
                {
                  type: "fill",
                  stemBefore: "CaCO₃ 中 Ca、C、O 的元素质量比是",
                  stemAfter: "（最简整数比）。",
                  answer: "10:3:12",
                  accept: ["10∶3∶12", "10比3比12", "40:12:48"],
                  hint: "40∶12∶48 化简",
                  tip: "个数比×原子量：40∶12∶48 = 10∶3∶12——不是 1∶1∶3！"
                },
                {
                  type: "fill",
                  stemBefore: "CaCO₃ 中钙元素的质量分数是",
                  stemAfter: "。",
                  answer: "40%",
                  accept: ["40 %", "百分之四十", "0.4"],
                  hint: "40 ÷ 100",
                  tip: "某元素质量 ÷ 相对分子质量 = 40 ÷ 100 = 40%。"
                }
              ],
              point: "三算过关：100、10∶3∶12、40%——分母是相对分子质量，别拿错。"
            },
            {
              id: "cm04.2.3-p3",
              kind: "explain",
              title: "不纯物入门：纯量法预告",
              blocks: [
                { type: "lead", text: "现实中的药品很少是纯的——含杂质的样品，怎么算？" },
                { type: "text", html: "先算<b>纯物质质量</b>：纯物质质量 = 样品质量 × 纯度（或 × 质量分数）。只有纯净物的质量，才能代入化学式/方程式计算——这叫<b>纯量法</b>，cm05.2.1 正式登场。" },
                { type: "oldfriend", text: "（预告：cm05.2.1 用化学方程式算质量——纯量法在那儿大显身手，先记住这句：“只把纯净物质量代入”。）" }
              ],
              point: "纯量法一句话：只把纯净物质量代入计算——杂质先“扒掉”。"
            }
          ]
        }
      ]
    }
  ]
};
