/* ============================================================
 * 学习工具箱 · 化学 · 第一章数据（蓝队 2026-10-15，阶段三·批1）
 *
 * schema 冻结版 v1.0（见 data/cm05.js 文件头）。本章组件：
 * C1 particle-view（cm01.1.1 水沸腾分子种类不变）；
 * C7 reaction-particle（cm01.1.1 水电解分子种类改变）；
 * Y6 tri-rep（cm01.1.2/cm01.1.3 证据三重表征）；
 * Y10 read-gauge-chem（cm01.1.4 量筒读数，D3 落点；容差=分度值×1；
 * 量筒 division=1，估读到 0.1mL（中考口径，S1 终裁），B13.4 冻结）；Y13 safety-quiz（cm01.1.5 酒精灯）。
 * 跃升 2（物理/化学变化判据）+ 红线辨析③立靶在本章。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm01"] = {
  id: "cm01",
  units: [
    {
      id: "cm01.1",
      title: "变化、性质与探究",
      lessons: [
        {
          id: "cm01.1.1",
          title: "物质的变化和性质",
          prereq: "cm00 导论",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm01.1.1-p1",
              kind: "interact",
              title: "水沸腾 vs 水电解：分子变没变",
              exploreTip: "先拖温度滑块把水烧开（看分子），再看水电解动画（看分子）。",
              widgets: [
                {
                  type: "particle-view",
                  params: {
                    substance: { name: "水", meltC: 0, boilC: 100 },
                    temp: { min: -20, max: 120, step: 5, init: 20, unit: "℃" },
                    particleCount: 120,
                    stateMode: "auto",
                    heatButtons: true,
                    showScaleNote: true
                  }
                },
                {
                  type: "reaction-particle",
                  params: {
                    reaction: {
                      equation: "<math><mrow><mn>2</mn><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi></mrow><mover><mo>=</mo><mtext>通电</mtext></mover><mrow><mn>2</mn><msub><mi>H</mi><mn>2</mn></msub><mo>↑</mo><mo>+</mo><msub><mi>O</mi><mn>2</mn></msub><mo>↑</mo></mrow></math>",
                      equationText: "2H₂O ＝通电＝ 2H₂↑ + O₂↑"
                    },
                    particles: [
                      { id: "w1", kind: "molecule", label: "H₂O", charge: null, role: "reactant", count: 2 },
                      { id: "h1", kind: "atom", label: "H", charge: null, role: "product", count: 4 },
                      { id: "o1", kind: "atom", label: "O", charge: null, role: "product", count: 2 }
                      /* S-8a 裁决（2026-10-15）：删 h2m/o2m 产物分子双列——
                         第 1 帧 form 已渲染终态 H₂/O₂ 合并标签，双列致三帧全程原子+分子并存，
                         与第 0 帧 caption"分子破裂成原子"矛盾。计数器验算左右 H×4/O×2 全等。 */
                    ],
                    keyframes: [
                      { caption: "通电：H₂O 分子被“拆开”——分子破裂成 H 原子和 O 原子（示意）。", moves: [{ id: "w1", from: [30, 50], to: [45, 50] }] },
                      { caption: "H 原子两两结合成 H₂ 分子，O 原子两两结合成 O₂ 分子——分子种类变了。", form: [{ ids: ["h1"], label: "H₂" }, { ids: ["o1"], label: "O₂" }], fade: [] },
                      { caption: "数一数：反应前 H×4、O×2；反应后 H×4、O×2——原子一个没少，只是换了“队形”。", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true
                  }
                }
              ],
              point: "示意：粒子大小、数量、运动速度均为示意，未按真实比例——左边分子没变，右边分子变了。"
            },
            {
              id: "cm01.1.1-p2",
              kind: "quiz",
              title: "判据闯关：分子变没变",
              questions: [
                {
                  type: "choice",
                  stem: "电灯通电发光发热，这是？",
                  options: ["化学变化", "物理变化"],
                  answer: 1,
                  tip: "发光发热只是“热闹”——灯丝还是钨，分子种类没变，是物理变化。"
                },
                {
                  type: "choice",
                  stem: "铁锅生锈，这是？",
                  options: ["化学变化", "物理变化"],
                  answer: 0,
                  tip: "铁变成了铁锈——分子种类变了，是化学变化。"
                },
                {
                  type: "choice",
                  stem: "冰化成水，这是？",
                  options: ["化学变化", "物理变化"],
                  answer: 1,
                  tip: "冰和水都是 H₂O——分子种类没变，只是散开了，是物理变化。"
                },
                {
                  type: "choice",
                  stem: "饭变馊（有酸味），这是？",
                  options: ["化学变化", "物理变化"],
                  answer: 0,
                  tip: "馊味来自新物质——分子种类变了，是化学变化。"
                }
              ],
              point: "闯关口诀：别看热不热闹，看分子变没变——变了就是化学变化。"
            },
            {
              id: "cm01.1.1-p3",
              kind: "explain",
              title: "红线辨析③：判据只有一个",
              blocks: [
                { type: "lead", text: "发光、发热、变色、冒泡都可能是“烟雾弹”——判据只有一个。" },
                { type: "text", html: "化学变化的判据：<b>分子种类变没变</b>（有新物质生成）。物理变化：分子种类不变，只是位置、状态变了（水沸腾）。化学性质：物质在化学变化中表现出的性质（可燃性）；物理性质：不需要化学变化就表现出的性质（颜色、状态、熔点）。" },
                { type: "trap", text: "⚠ “发光发热一定是化学变化”是错觉：电灯发光发热，分子没变——判据只看“新物质”，不看“热闹”；樟脑丸变小（升华）也是物理变化。" },
                { type: "slogan", text: "别看热不热闹，看分子变没变。" }
              ],
              point: "红线辨析③立靶：判据 = 分子种类变没变——宏观现象要到微观去验。"
            }
          ]
        },
        {
          id: "cm01.1.2",
          title: "蜡烛燃烧探究",
          prereq: "cm01.1.1 物质的变化和性质",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm01.1.2-p1",
              kind: "explain",
              title: "蜡烛：火焰三层，证据三条",
              blocks: [
                { type: "lead", text: "一根蜡烛，烧出了化学探究的全部家当：火焰、证据、变量。" },
                { type: "text", html: "火焰分三层：<b>外焰、内焰、焰心</b>——外焰温度最高（给火焰分层取样，看木条哪段先焦）。产物检验：罩杯内壁水雾 → 有水生成；澄清石灰水变浑浊 → 有二氧化碳生成。" },
                { type: "text", html: "探究这样走：换罩杯大小（变量！）看熄灭快慢；取火焰不同部位，看木条焦黑程度——一次只改一个条件。" },
                { type: "trap", text: "⚠ “蜡烛燃烧只生成水和 CO₂”是有条件的：完全燃烧才如此；不完全燃烧会生成一氧化碳和炭黑（罩壁白糊）——条件不同，产物不同。" }
              ],
              point: "火焰三层（外焰最热）；产物检验：水雾→水，石灰水变浑浊→CO₂。"
            },
            {
              id: "cm01.1.2-p2",
              kind: "interact",
              title: "证据“石灰水变浑浊”的三种讲法",
              exploreTip: "点三个页签：同一证据，宏观、微观、符号三种讲法。",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "证据“石灰水变浑浊”的三种讲法",
                    views: {
                      macro: { text: "把罩过蜡烛的气体通入澄清石灰水，石灰水变浑浊——这是肉眼看到的证据。" },
                      micro: { text: "CO₂ 分子与氢氧化钙反应，生成碳酸钙小颗粒悬在水里（示意）——浑浊就是小颗粒。" },
                      symbol: {
                        mathml: "<math><mi>C</mi><msub><mi>O</mi><mn>2</mn></msub><mo>+</mo><mi>Ca</mi><mo>(</mo><mi>O</mi><mi>H</mi><mo>)</mo><msub><mn>2</mn></msub><mo>=</mo><mi>CaC</mi><msub><mi>O</mi><mn>3</mn></msub><mo>↓</mo><mo>+</mo><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi></math>",
                        gloss: "CO₂ + Ca(OH)₂ ＝ CaCO₃↓ + H₂O：反应物里没有固体，生成的碳酸钙是沉淀，标↓。"
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
              point: "证据链：现象→粒子→符号——每个证据都走一遍三重表征。"
            },
            {
              id: "cm01.1.2-p3",
              kind: "quiz",
              title: "练一练：探究基本功",
              questions: [
                {
                  type: "choice",
                  stem: "罩杯内壁出现水雾，说明燃烧产物中有？",
                  options: ["氧气", "水", "炭黑"],
                  answer: 1,
                  tip: "水雾 = 水蒸气遇冷凝成小水滴——产物里有水。"
                },
                {
                  type: "choice",
                  stem: "澄清石灰水变浑浊，说明燃烧产物中有？",
                  options: ["一氧化碳", "二氧化碳", "氧气"],
                  answer: 1,
                  tip: "CO₂ 使澄清石灰水变浑浊——这是检验 CO₂ 的标准方法。"
                },
                {
                  type: "choice",
                  stem: "罩杯壁出现黑色糊状物（白糊），说明？",
                  options: [
                    "完全燃烧，产物只有水和 CO₂",
                    "不完全燃烧，生成了炭黑",
                    "蜡烛没有燃烧"
                  ],
                  answer: 1,
                  tip: "氧气不足时不完全燃烧：生成 CO 和炭黑——条件不同，产物不同。"
                }
              ],
              point: "检验配对记牢：水雾→水，石灰水变浑浊→CO₂，白糊→炭黑（不完全燃烧）。"
            }
          ]
        },
        {
          id: "cm01.1.3",
          title: "吸入与呼出的气体",
          prereq: "cm01.1.2 蜡烛燃烧探究",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm01.1.3-p1",
              kind: "explain",
              title: "呼吸：气体成分变了多少",
              blocks: [
                { type: "lead", text: "吸进去的是空气，呼出来的是什么？数字说话。" },
                { type: "text", html: "吸入 vs 呼出（体积分数）：O₂ 21% → 16%，CO₂ 0.03% → 约 4%，水蒸气变多，N₂ 基本不变（还是最多，约 78%）。" },
                { type: "text", html: "三种检验配对：燃着的木条（O₂：燃得更旺 / CO₂：熄灭）、澄清石灰水（CO₂：变浑浊）、干燥玻璃片（水蒸气：出现水雾）。排水法收集气体：气体难溶于水才能用。" },
                { type: "trap", text: "⚠ “呼出气体全是 CO₂”是错觉：CO₂ 只从 0.03% 升到约 4%——最多的仍是氮气。" },
                { type: "mathlink", text: "直观版（百分比）：体积分数是百分比——21%、0.03%、4%，先会读数再谈化学。" }
              ],
              point: "数据记牢：O₂ 21%→16%，CO₂ 0.03%→4%——呼出气最多的仍是 N₂。"
            },
            {
              id: "cm01.1.3-p2",
              kind: "interact",
              title: "证据“玻璃片水雾”的三种讲法",
              exploreTip: "点三个页签：对着干燥玻璃片呼气，看到水雾。",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "证据“玻璃片水雾”的三种讲法",
                    views: {
                      macro: { text: "对着干燥的玻璃片呼气，玻璃片上出现一层水雾——肉眼看到的证据。" },
                      micro: { text: "呼出的水蒸气分子碰到冷玻璃，运动减慢、聚成小水滴（示意）。" },
                      symbol: {
                        mathml: "<math><msub><mi>H</mi><mn>2</mn></msub><mi>O</mi></math>",
                        gloss: "H₂O：宏观读“水”，微观读“水分子”——证据指向：呼出气体里水蒸气变多了。"
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
              point: "检验配对：水雾→水蒸气——证据、粒子、符号三者对得上。"
            },
            {
              id: "cm01.1.3-p3",
              kind: "quiz",
              title: "练一练：三瓶气体三检验",
              questions: [
                {
                  type: "choice",
                  stem: "用燃着的木条检验，木条熄灭的是？",
                  options: ["氧气", "二氧化碳", "氮气"],
                  answer: 1,
                  tip: "CO₂ 不燃烧也不支持燃烧——木条熄灭。"
                },
                {
                  type: "choice",
                  stem: "呼出气体中含量最高的是？",
                  options: ["二氧化碳", "氧气", "氮气"],
                  answer: 2,
                  tip: "N₂ 基本不变，仍占约 78%——呼出气里最多的还是氮气。"
                },
                {
                  type: "fill",
                  stemBefore: "呼出气体中 CO₂ 的体积分数约为",
                  stemAfter: "（填百分数）。",
                  answer: "4%",
                  accept: ["约4%", "4 %", "百分之四"],
                  hint: "从 0.03% 升到多少？",
                  tip: "0.03% → 约 4%——涨了一百多倍，但总量仍不大。"
                }
              ],
              point: "三检验配对：木条→O₂/CO₂，石灰水→CO₂，玻璃片→水蒸气。"
            }
          ]
        },
        {
          id: "cm01.1.4",
          title: "走进化学实验室（上）",
          prereq: "cm01.1.3 吸入与呼出的气体",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm01.1.4-p1",
              kind: "explain",
              title: "取用药品与量器读数规范",
              blocks: [
                { type: "lead", text: "固体用药匙、液体倾倒、量筒读数——每个动作都有“标准姿势”。" },
                { type: "text", html: "固体：粉末用药匙送到试管底（一横二送三直立），块状用镊子夹到管口再滑下。液体：瓶塞倒放、标签向手心、瓶口紧挨试管口。" },
                { type: "text", html: "量筒读数：<b>视线与凹液面最低处保持水平</b>。俯视（从上往下看）读数偏大，仰视（从下往上看）读数偏小——规范不是讲究，是准确。" },
                { type: "trap", text: "⚠ “俯视/仰视无所谓”是错觉：俯视偏大、仰视偏小——差的不是姿势，是数据。" }
              ],
              point: "读数铁律：视线水平看凹液面最低处——俯视偏大，仰视偏小。"
            },
            {
              id: "cm01.1.4-p2",
              kind: "interact",
              title: "量筒读数：视线决定数据",
              exploreTip: "先俯视读一次，再视线水平读一次——两个读数不一样。",
              widgets: [
                {
                  type: "read-gauge-chem",
                  params: {
                    gauge: "cylinder",
                    division: 1,
                    tolerance: 0.1,
                    estimateNext: true,
                    sightDemo: true,
                    targetValue: 12,
                    recordKey: "chm_gauge_cm01.1.4"
                  }
                }
              ],
              point: "量筒分度值 1mL，估读到 0.1mL——读数规范练的是“诚实”。"
            }
          ]
        },
        {
          id: "cm01.1.5",
          title: "走进化学实验室（下）",
          prereq: "cm01.1.4 走进化学实验室（上）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm01.1.5-p1",
              kind: "explain",
              title: "酒精灯与加热、洗涤规范",
              blocks: [
                { type: "lead", text: "酒精灯是实验室的“火种”——点火、熄火、加热，全是规范动作。" },
                { type: "text", html: "点燃用火柴点（从下往上），熄灭<b>用灯帽盖灭</b>（盖两次，防下次打不开）。加热：试管夹夹在距管口 1/3 处，试管口不朝人，外焰加热，先预热。" },
                { type: "text", html: "洗涤仪器：内壁水膜“既不聚成水滴，也不成股流下”，才算干净。" },
                { type: "trap", text: "⚠ 安全红线：绝不用嘴吹灭酒精灯——嘴吹会把火吹进灯壶，引起灯内酒精燃烧。" }
              ],
              point: "酒精灯：火柴点、灯帽盖；加热：管口不朝人、外焰、先预热。"
            },
            {
              id: "cm01.1.5-p2",
              kind: "interact",
              title: "酒精灯操作闯关",
              exploreTip: "选错会警示——警示里藏着正确做法。",
              widgets: [
                {
                  type: "safety-quiz",
                  params: {
                    title: "酒精灯操作闯关",
                    scenarios: [
                      {
                        scene: "酒精灯用完，怎么熄灭？",
                        options: [
                          { id: "a", text: "用嘴吹灭" },
                          { id: "b", text: "用灯帽盖灭" }
                        ],
                        correctId: "b",
                        warnText: "⚠ 安全红线！嘴吹会把火吹进灯壶，引起灯内酒精燃烧。",
                        correctDo: "用灯帽盖灭（盖两次）——隔绝空气。"
                      },
                      {
                        scene: "给试管里的液体加热，试管口应该？",
                        options: [
                          { id: "a", text: "朝向自己，方便看" },
                          { id: "b", text: "不朝向自己和他人，倾斜约 45°" }
                        ],
                        correctId: "b",
                        warnText: "⚠ 液体沸腾喷出会烫伤！试管口绝不朝人。",
                        correctDo: "试管口不朝人，倾斜加热，用外焰。"
                      },
                      {
                        scene: "洗过的试管，怎么判断算干净了？",
                        options: [
                          { id: "a", text: "看不见污渍就行" },
                          { id: "b", text: "内壁水膜既不聚成水滴，也不成股流下" }
                        ],
                        correctId: "b",
                        warnText: "⚠ “看着干净”不算数——水膜是检验标准。",
                        correctDo: "水膜均匀：不聚滴、不成股，才算洗净。"
                      }
                    ],
                    noScore: true,
                    recordKey: "chm_safety_cm01.1.5"
                  }
                }
              ],
              point: "虚拟实验可重复试错；现实中必须在老师指导下操作。"
            }
          ]
        }
      ]
    }
  ]
};
