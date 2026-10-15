/* ============================================================
 * 学习工具箱 · 化学 · 第二章数据（蓝队 2026-10-15，阶段三·批1）
 *
 * schema 冻结版 v1.0（见 data/cm05.js 文件头）。本章组件：
 * Y6 tri-rep（cm02.1.1 磷燃烧测体积分数）；
 * C7 reaction-particle（cm02.1.2 铁丝在 O₂ 中燃烧，params.safety 常驻
 * 安全徽章，沿用物理 W-P20 约定）；
 * C5 lab-assemble（cm02.1.3 H₂O₂/MnO₂ 制氧，apparatus "o2-liquid"；
 * realityNote 必填；气密性检查在先）。
 * T11 催化剂“一变二不变”八字上 cm02.1.3 讲解页正文。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm02"] = {
  id: "cm02",
  units: [
    {
      id: "cm02.1",
      title: "空气与氧气",
      lessons: [
        {
          id: "cm02.1.1",
          title: "空气",
          prereq: "cm01 实验室",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm02.1.1-p1",
              kind: "explain",
              title: "空气：看不见的混合物",
              blocks: [
                { type: "lead", text: "一瓶“空”瓶子，其实装满了东西——空气里有什么？" },
                { type: "text", html: "空气组成（<b>体积分数</b>）：氮气 78%、氧气 21%、稀有气体 0.94%、二氧化碳 0.03%，还有水蒸气等。拉瓦锡用汞的实验第一次称出了氧气约占 1/5。" },
                { type: "text", html: "空气是<b>混合物</b>：由多种物质混合而成，各成分保持自己的性质。纯净物只由一种物质组成（如氧气、蒸馏水）。" },
                { type: "trap", text: "⚠ “空气中 O₂ 占 1/5 是质量分数”是错觉：空气是气体，论体积不论质量——是体积分数！" },
                { type: "mathlink", text: "直观版（百分比）：78%、21%、0.94%——体积分数就是“每 100 份里有几份”。" }
              ],
              point: "空气组成记体积分数：N₂ 78%、O₂ 21%——空气是混合物。"
            },
            {
              id: "cm02.1.1-p2",
              kind: "interact",
              title: "磷燃烧：水面为什么上升 1/5",
              exploreTip: "点三个页签：红磷烧完，水面上升约 1/5。",
              widgets: [
                {
                  type: "tri-rep",
                  params: {
                    topic: "磷燃烧测氧气：水面为什么上升 1/5",
                    views: {
                      macro: { text: "红磷在集气瓶里燃烧，冒出浓浓白烟；熄灭冷却后，打开止水夹，水面上升约 1/5。" },
                      micro: { text: "O₂ 分子被红磷“吃掉”变成五氧化二磷固体（示意）——瓶里气体少了，气压下降，外面的水被压进来。" },
                      symbol: {
                        mathml: "<math><mrow><mn>4</mn><mi>P</mi><mo>+</mo><mn>5</mn><msub><mi>O</mi><mn>2</mn></msub></mrow><mover><mo>=</mo><mtext>点燃</mtext></mover><mrow><mn>2</mn><msub><mi>P</mi><mn>2</mn></msub><msub><mi>O</mi><mn>5</mn></msub></mrow></math>",
                        gloss: "4P + 5O₂ ＝点燃＝ 2P₂O₅：氧气被消耗了；剩下约 4/5 的主要是氮气——空气是混合物。"
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
              point: "水面上升约 1/5——被吃掉的是氧气，剩下约 4/5 主要是氮气。"
            },
            {
              id: "cm02.1.1-p3",
              kind: "quiz",
              title: "练一练：空气的数",
              questions: [
                {
                  type: "choice",
                  stem: "空气中氧气约占 1/5，指的是？",
                  options: ["质量分数", "体积分数", "个数分数"],
                  answer: 1,
                  tip: "空气是气体，论体积不论质量——是体积分数。"
                },
                {
                  type: "choice",
                  stem: "用木炭代替红磷做这个实验，为什么不行？",
                  options: [
                    "木炭不能燃烧",
                    "木炭燃烧生成 CO₂ 气体，瓶内压强基本不变，水面不上升",
                    "木炭太贵"
                  ],
                  answer: 1,
                  tip: "木炭燃烧：C + O₂ ＝点燃＝ CO₂——气体体积没变，压强不变，水进不来。"
                },
                {
                  type: "choice",
                  stem: "空气属于？",
                  options: ["纯净物", "混合物", "化合物"],
                  answer: 1,
                  tip: "多种物质混合、各成分保持自己性质——是混合物。"
                }
              ],
              point: "记住三个数：N₂ 78%、O₂ 21%、CO₂ 0.03%——都是体积分数。"
            }
          ]
        },
        {
          id: "cm02.1.2",
          title: "氧气的性质",
          prereq: "cm02.1.1 空气",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm02.1.2-p1",
              kind: "explain",
              title: "氧气：看不见的“助燃者”",
              blocks: [
                { type: "lead", text: "氧气自己不烧，却让万物烧得更旺——它的脾气分两面。" },
                { type: "text", html: "物理性质：无色、无味的气体，难溶于水，密度比空气略大。化学性质（现象描述规范）：硫燃烧——蓝紫色火焰；铁丝在氧气中——<b>火星四射、放热、生成黑色固体</b>；红磷——大量白烟。" },
                { type: "text", html: "<b>氧化反应</b>：物质与氧发生的反应。剧烈氧化（燃烧）vs 缓慢氧化（铁生锈、食物腐烂、呼吸作用）——都是氧化反应，速率不同。" },
                { type: "trap", text: "⚠ 两个条件句：“铁在空气中点燃”只发红，<b>纯氧中</b>才剧烈燃烧——浓度是条件；“白烟”是 P₂O₅ 固体小颗粒（烟），水蒸气是雾——烟 vs 雾别混。" }
              ],
              point: "现象描述规范：烟/雾/光/色说准——纯氧中才剧烈燃烧，浓度是条件。"
            },
            {
              id: "cm02.1.2-p2",
              kind: "interact",
              title: "铁丝在氧气中燃烧",
              exploreTip: "慢放看：铁原子和氧分子怎样变成黑色固体。",
              widgets: [
                {
                  type: "reaction-particle",
                  params: {
                    reaction: {
                      equation: "<math><mrow><mn>3</mn><mi>Fe</mi><mo>+</mo><mn>2</mn><msub><mi>O</mi><mn>2</mn></msub></mrow><mover><mo>=</mo><mtext>点燃</mtext></mover><mrow><msub><mi>Fe</mi><mn>3</mn></msub><msub><mi>O</mi><mn>4</mn></msub></mrow></math>",
                      equationText: "3Fe + 2O₂ ＝点燃＝ Fe₃O₄"
                    },
                    particles: [
                      { id: "fe1", kind: "atom", label: "Fe", charge: null, role: "reactant", count: 3 },
                      { id: "o2m", kind: "molecule", label: "O₂", charge: null, role: "reactant", count: 2 },
                      { id: "feo", kind: "molecule", label: "Fe₃O₄", charge: null, role: "product", count: 1 }
                    ],
                    keyframes: [
                      { caption: "点燃：Fe 原子与 O₂ 分子剧烈碰撞——火星四射（示意）。", moves: [{ id: "fe1", from: [25, 50], to: [45, 50] }] },
                      { caption: "Fe 原子与 O 原子重新组合成 Fe₃O₄——分子种类变了，是化学变化。", form: [{ ids: ["fe1", "o2m"], label: "Fe₃O₄" }], fade: [] },
                      { caption: "数一数：反应前 Fe×3、O×4；反应后 Fe×3、O×4——原子没少一个。", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true,
                    safety: "铁丝在氧气中燃烧：瓶底要放少量水或细沙，防止高温熔化物炸裂瓶底——虚拟实验可重复试错，现实中必须在老师指导下操作。"
                  }
                }
              ],
              point: "示意：粒子大小、数量、运动速度均为示意，未按真实比例——火星四射、黑色固体。"
            },
            {
              id: "cm02.1.2-p3",
              kind: "quiz",
              title: "练一练：现象与条件",
              questions: [
                {
                  type: "choice",
                  stem: "铁丝在氧气中燃烧的现象是？",
                  options: [
                    "火星四射、放热、生成黑色固体",
                    "发出蓝紫色火焰",
                    "产生大量白烟"
                  ],
                  answer: 0,
                  tip: "火星四射 + 黑色固体（Fe₃O₄）——蓝紫色火焰是硫，白烟是磷。"
                },
                {
                  type: "choice",
                  stem: "铁丝在空气中点燃会怎样？",
                  options: [
                    "一样火星四射",
                    "只发红，不剧烈燃烧",
                    "生成大量白烟"
                  ],
                  answer: 1,
                  tip: "空气中氧气浓度只有 21%——纯氧中才剧烈燃烧，浓度是条件。"
                },
                {
                  type: "choice",
                  stem: "下列属于缓慢氧化的是？",
                  options: ["蜡烛燃烧", "铁生锈", "红磷燃烧"],
                  answer: 1,
                  tip: "缓慢氧化：铁生锈、食物腐烂——也是氧化反应，只是慢。"
                }
              ],
              point: "烟是固体小颗粒，雾是小液滴——描述现象，烟/雾/光/色说准。"
            }
          ]
        },
        {
          id: "cm02.1.3",
          title: "氧气的制取（上）",
          prereq: "cm02.1.2 氧气的性质",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm02.1.3-p1",
              kind: "explain",
              title: "实验室制氧：三法一催化剂",
              blocks: [
                { type: "lead", text: "实验室要氧气，现制现用——三条路线，一个“幕后推手”。" },
                { type: "text", html: "三法：① 过氧化氢 + 二氧化锰（常温，固液不加热）；② 氯酸钾 + 二氧化锰（加热）；③ 高锰酸钾（加热）。收集：排水法（难溶于水）或向上排空气法（密度比空气大）。" },
                { type: "text", html: "<b>催化剂“一变二不变”</b>：一变——改变化学反应速率；二不变——质量、化学性质在反应前后不变。MnO₂ 是催化剂，不是反应物，可以回收。" },
                { type: "trap", text: "⚠ “MnO₂ 是反应物”是错觉：它是催化剂——质量、化学性质不变；“一有气泡就收集”会收集到空气：等气泡连续均匀冒出再收集。" }
              ],
              point: "催化剂八字：一变（改变化学反应速率）二不变（质量、化学性质不变）。"
            },
            {
              id: "cm02.1.3-p2",
              kind: "interact",
              title: "组装：H₂O₂ 制氧装置",
              exploreTip: "拖仪器到槽位；第一步永远是检查气密性。",
              widgets: [
                {
                  type: "lab-assemble",
                  params: {
                    apparatus: "o2-liquid",
                    pieces: [
                      { id: "p1", kind: "flask", label: "锥形瓶" },
                      { id: "p2", kind: "funnel", label: "长颈漏斗" },
                      { id: "p3", kind: "plug", label: "双孔塞" },
                      { id: "p4", kind: "tube", label: "导管" },
                      { id: "p5", kind: "trough", label: "水槽" },
                      { id: "p6", kind: "gasJar", label: "集气瓶" }
                    ],
                    slots: [
                      { id: "s1", accepts: ["flask"], hint: "发生装置：锥形瓶" },
                      { id: "s2", accepts: ["funnel"], hint: "长颈漏斗下端要伸入液面下" },
                      { id: "s3", accepts: ["gasJar"], hint: "排水法收集：集气瓶装满水倒扣" }
                    ],
                    steps: [
                      { caption: "第 1 步 · 检查装置气密性：先确认不漏气，再装药品", highlight: ["s1"] },
                      { caption: "第 2 步 · 装药品：锥形瓶里放少量 MnO₂，塞紧双孔塞", highlight: ["s1"] },
                      { caption: "第 3 步 · 加液体：从长颈漏斗倒入过氧化氢溶液（下端伸入液面下）", highlight: ["s2"] },
                      { caption: "第 4 步 · 收集：等气泡连续均匀冒出，再把导管伸进集气瓶", highlight: ["s3"] },
                      { caption: "第 5 步 · 验满：把带火星的木条放在瓶口，复燃就是满了", highlight: ["s3"] }
                    ],
                    safetyChecks: [
                      { id: "sc1", text: "确认：长颈漏斗下端已伸入液面下——否则气体会从漏斗口跑掉", mustPass: true },
                      { id: "sc2", text: "确认：等气泡连续均匀冒出再收集——一有气泡就收集，收集的是空气", mustPass: true }
                    ],
                    mode: "assemble",
                    realityNote: "虚拟实验为示意：现实中 MnO₂ 是催化剂可回收；实验须在老师指导下操作，废液倒入指定容器。"
                  }
                }
              ],
              point: "组装口诀：气密性→装药→加液→收集→验满——规范动作防的是具体事故。"
            },
            {
              id: "cm02.1.3-p3",
              kind: "quiz",
              title: "练一练：制氧关键点",
              questions: [
                {
                  type: "choice",
                  stem: "MnO₂ 在 H₂O₂ 制氧中起什么作用？",
                  options: ["反应物", "催化剂", "生成物"],
                  answer: 1,
                  tip: "催化剂：一变（改变化学反应速率）二不变（质量、化学性质不变）。"
                },
                {
                  type: "choice",
                  stem: "什么时候开始收集氧气？",
                  options: [
                    "一有气泡就收集",
                    "等气泡连续均匀冒出再收集",
                    "等反应结束再收集"
                  ],
                  answer: 1,
                  tip: "一开始的气泡是装置里的空气——等气泡连续均匀，收集的才是氧气。"
                },
                {
                  type: "choice",
                  stem: "能用排水法收集氧气，依据是？",
                  options: ["氧气密度比空气大", "氧气难溶于水", "氧气无色"],
                  answer: 1,
                  tip: "排水法看溶解性：难溶于水才能用——氧气难溶于水。"
                }
              ],
              point: "制氧三问：催化剂一变二不变；气泡均匀再收集；验满用带火星木条。"
            }
          ]
        },
        {
          id: "cm02.1.4",
          title: "氧气的制取（下）",
          prereq: "cm02.1.3 氧气的制取（上）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm02.1.4-p1",
              kind: "explain",
              title: "工业制氧：把空气“冻开”",
              blocks: [
                { type: "lead", text: "医院、炼钢厂要的是吨级的氧气——实验室那套不够用了。" },
                { type: "text", html: "工业制法：<b>分离液态空气</b>。先把空气加压降温变成液体，再升温：氮气沸点低先蒸发出来，剩下的就是氧气——利用沸点不同分离，是<b>物理变化</b>（红线辨析③）！" },
                { type: "text", html: "氧气用途：医疗急救、炼钢、气焊。顺带认识<b>分解反应</b>：一种物质生成两种或多种物质（一变多），如 2H₂O₂ ＝MnO₂＝ 2H₂O + O₂↑。" },
                { type: "trap", text: "⚠ “工业制氧是化学变化”是错觉：只是把空气里本来就有的氧气“冻出来、分出来”——分子种类没变，是物理变化。" }
              ],
              point: "工业制氧 = 分离液态空气（物理变化）；分解反应：一变多。"
            },
            {
              id: "cm02.1.4-p2",
              kind: "quiz",
              title: "练一练：物理还是化学",
              questions: [
                {
                  type: "choice",
                  stem: "工业上分离液态空气制氧气，属于？",
                  options: ["化学变化", "物理变化"],
                  answer: 1,
                  tip: "分子种类没变——只是按沸点把氮气和氧气分开，是物理变化。"
                },
                {
                  type: "choice",
                  stem: "下列属于分解反应的是？",
                  options: [
                    "2H₂O₂ ＝MnO₂＝ 2H₂O + O₂↑",
                    "3Fe + 2O₂ ＝点燃＝ Fe₃O₄",
                    "CO₂ + Ca(OH)₂ ＝ CaCO₃↓ + H₂O"
                  ],
                  answer: 0,
                  tip: "分解反应：一变多——一种物质生成两种或多种物质。"
                }
              ],
              point: "判据回头看：分子种类变没变——工业制氧没变，是物理变化。"
            }
          ]
        },
        {
          id: "cm02.1.5",
          title: "本章小结与习题",
          prereq: "cm02.1.4 氧气的制取（下）",
          time: "40–60 分钟",
          pages: [
            {
              id: "cm02.1.5-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "<b>空气</b>：N₂ 78%、O₂ 21%（体积分数）——混合物。<b>氧气性质</b>：无色无味、难溶于水；S/C/Fe/P/Mg 燃烧现象（烟/雾/光/色说准）；氧化反应分剧烈与缓慢。<b>制氧</b>：实验室三法 + MnO₂ 催化剂（一变二不变）；气密性→装药→收集→验满；工业分离液态空气（物理变化）。<b>新概念</b>：分解反应（一变多）。"
                }
              ],
              point: "小结背三句话：空气论体积；氧气看现象说准；制氧先查气密性。"
            },
            {
              id: "cm02.1.5-p2",
              kind: "quiz",
              title: "本章习题",
              questions: [
                {
                  type: "choice",
                  stem: "下列说法正确的是？",
                  options: [
                    "空气中氧气占 21%，是质量分数",
                    "MnO₂ 在制氧反应中是反应物",
                    "铁丝在纯氧中燃烧比在空气中剧烈得多"
                  ],
                  answer: 2,
                  tip: "体积分数！催化剂！浓度是条件！"
                },
                {
                  type: "fill",
                  stemBefore: "实验室用 H₂O₂ 制氧气，第一步操作是",
                  stemAfter: "。",
                  answer: "检查装置气密性",
                  accept: ["检查气密性", "查气密性"],
                  hint: "先确认什么再装药？",
                  tip: "气密性→装药→收集→验满——第一步永远是气密性。"
                },
                {
                  type: "choice",
                  stem: "2KMnO₄ ＝加热＝ K₂MnO₄ + MnO₂ + O₂↑ 属于？",
                  options: ["分解反应", "化合反应", "置换反应"],
                  answer: 0,
                  tip: "一变多——是分解反应。"
                }
              ],
              point: "过关了？本章关键词：体积分数、催化剂一变二不变、分解反应一变多。"
            }
          ]
        }
      ]
    }
  ]
};
