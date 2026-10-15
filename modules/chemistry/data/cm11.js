/* ============================================================
 * 学习工具箱 · 化学 · 第十一章数据（蓝队 2026-10-15，阶段三批2）
 *
 * 章：cm11 化学与生活（九下第十一（化肥）+第十二单元）
 * 课：cm11.1.1 / cm11.1.2 / cm11.1.3 / cm11.1.4（4 课，12 页）
 * 依据：docs/chemistry-curriculum.md v1.1（cm11 课表）、
 *       docs/chemistry-pedagogy.md v1.1（cm11.1 单元策略）、
 *       docs/chemistry-interactions.md v1.1、真值口径 CHEM-XX。
 * Schema 沿用 data/cm05.js 文件头冻结版 v1.0。
 * 本批用到的组件类型：reaction-particle / safety-badge / side-compare
 *   （冻结清单，渲染器待增补）。
 * 本章是初中化学“毕业展”：每个概念都配生活抓手。
 * ============================================================ */
window.CHEM_CH = window.CHEM_CH || {};
window.CHEM_CH["cm11"] = {
  id: "cm11",
  units: [
    {
      id: "cm11.1",
      title: "生活中的化学",
      lessons: [
        {
          id: "cm11.1.1",
          title: "化学肥料",
          prereq: "cm10.3.2 本章小结与习题",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（C7：铵态氮肥检验 + 安全徽章） ---------- */
            {
              id: "cm11.1.1-p1",
              kind: "interact",
              title: "检验：铵态氮肥",
              exploreTip: "按 ▶ 看铵态氮肥检验：试纸变蓝说明什么来了？",
              widgets: [
                {
                  type: "safety-badge",
                  params: {
                    level: "warn",
                    text: "加热规范：试管口略向下倾斜；NH₃ 有刺激性气味，注意通风",
                    realityNote: "虚拟实验可重复试错；现实中加热操作必须在老师指导下进行。"
                  }
                },
                {
                  type: "reaction-particle",
                  params: {
                    reaction: { equationText: "2NH₄Cl + Ca(OH)₂ ＝加热＝ CaCl₂ + 2NH₃↑ + 2H₂O" },
                    particles: [
                      { id: "nh4", kind: "ion", label: "NH₄", charge: "+1", role: "reactant", count: 2 },
                      { id: "oh", kind: "ion", label: "OH", charge: "−1", role: "reactant", count: 2 },
                      { id: "ca", kind: "ion", label: "Ca", charge: "+2", role: "spectator", count: 1 },
                      { id: "cl", kind: "ion", label: "Cl", charge: "−1", role: "spectator", count: 2 },
                      { id: "nh3", kind: "molecule", label: "NH₃", charge: null, role: "product", count: 2 },
                      { id: "w", kind: "molecule", label: "H₂O", charge: null, role: "product", count: 2 }
                    ],
                    keyframes: [
                      { caption: "研磨混合后加热：NH₄⁺ 与 OH⁻ 相遇", moves: [{ id: "nh4", from: [20, 50], to: [50, 50] }] },
                      { caption: "放出有刺激性气味的气体——NH₃", form: [{ ids: ["nh4", "oh"], label: "NH₃" }], fade: [] },
                      { caption: "湿润的红色石蕊试纸变蓝——NH₃ 来了", moves: [] },
                      { caption: "数一数原子个数：N×2＝2、H×10＝10、Cl×2＝2、Ca×1＝1、O×2＝2", moves: [] }
                    ],
                    counter: true,
                    spectatorFade: false,
                    slowmo: true
                  }
                }
              ],
              point: "铵态氮肥 + 碱 → NH₃；湿润红色石蕊试纸变蓝是证据。"
            },
            /* ---------- p2：讲解页（N/P/K 肥/复合肥/施用注意） ---------- */
            {
              id: "cm11.1.1-p2",
              kind: "explain",
              title: "氮磷钾与复合肥",
              blocks: [
                { type: "lead", text: "上一页试纸变蓝了——NH₃ 来了。今天认识化肥全家：庄稼的“粮食”分三种。" },
                { type: "text", html: "化学肥料：氮肥（促进茎叶生长，如尿素、NH₄Cl）、磷肥（促进根系、籽粒，如磷矿粉）、钾肥（促进茎秆粗壮，如 KCl）。含两种以上营养元素的叫复合肥（如 KNO₃）。" },
                { type: "text", html: "铵态氮肥（含 NH₄⁺ 的）遇到碱性物质会放出 NH₃，肥效流失——所以铵态氮肥不能与碱性物质（如草木灰、熟石灰）混用。检验铵态氮肥：加碱研磨/加热，湿润红色石蕊试纸变蓝。" },
                { type: "trap", text: "⚠ 别搞混：“化肥有毒”是错的——合理施用无害，过量施用才污染水体、板结土壤。剂量决定性质。" },
                { type: "mathlink", text: "直观版（比例）：化肥含氮量计算（如尿素含氮 46.7%），就是比例应用题。"
                }
              ],
              point: "氮磷钾各管一摊；铵态氮肥不与碱混用；合理施用无害。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm11.1.1-p3",
              kind: "quiz",
              title: "练一练：化学肥料",
              questions: [
                {
                  type: "choice",
                  stem: "检验铵态氮肥的方法是",
                  options: ["加水溶解看颜色", "与碱混合加热，湿润红色石蕊试纸变蓝", "闻气味"],
                  answer: 1,
                  tip: "NH₄⁺ + OH⁻ ＝加热＝ NH₃ + H₂O——试纸变蓝是 NH₃ 的证据。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["化肥都有毒，不能用", "铵态氮肥可与草木灰混用", "KNO₃ 属于复合肥"],
                  answer: 2,
                  tip: "KNO₃ 含 N 和 K 两种营养元素；铵态氮肥遇碱放氨，不能混用。"
                },
                {
                  type: "fill",
                  stemBefore: "铵态氮肥不能与碱性物质混用，否则会放出",
                  stemAfter: "，降低肥效。",
                  answer: "NH3",
                  accept: ["NH₃", "nh3", "氨气"],
                  hint: "刺激性气味的气体",
                  tip: "NH₄⁺ + OH⁻ ＝加热＝ NH₃ + H₂O——氨跑了，肥效就没了。"
                }
              ],
              point: "过关了？记住：氮磷钾分工，铵态氮肥怕碱。"
            }
          ]
        },
        {
          id: "cm11.1.2",
          title: "人类重要的营养物质",
          prereq: "cm11.1.1 化学肥料",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：营养素对照） ---------- */
            {
              id: "cm11.1.2-p1",
              kind: "interact",
              title: "营养素：缺啥补啥",
              exploreTip: "看对照表：每种营养素管什么，缺了会怎样。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "六大营养素",
                    columns: ["作用", "缺乏 / 过量"],
                    rows: [
                      { dim: "蛋白质", a: "构成细胞、修复组织", b: "缺乏影响生长发育" },
                      { dim: "糖类", a: "主要供能物质", b: "过量转化为脂肪" },
                      { dim: "油脂", a: "备用能源", b: "过量导致肥胖" },
                      { dim: "维生素", a: "调节生理功能（量少作用大）", b: "缺乏得病（如缺 C 得坏血病）；过量也有害" },
                      { dim: "水 / 无机盐", a: "生命活动必需", b: "缺钙影响骨骼、缺铁贫血" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "六大营养素：蛋白质、糖类、油脂、维生素、水、无机盐。"
            },
            /* ---------- p2：讲解页（功能/均衡/剂量） ---------- */
            {
              id: "cm11.1.2-p2",
              kind: "explain",
              title: "均衡：不多不少",
              blocks: [
                { type: "lead", text: "上一页你点开了营养素对照表：每种都有活干，缺了会生病——但“多吃”就是好吗？" },
                { type: "text", html: "六大营养素：蛋白质（鸡蛋、牛奶）、糖类（大米、馒头）、油脂（花生、肥肉）、维生素（蔬菜、水果）、水、无机盐。各管一摊：蛋白质管“长身体”，糖类管“供能”，维生素管“调节”——缺一不可。" },
                { type: "text", html: "均衡膳食：不多不少，搭配着吃。适用条件：“维生素吃越多越好”是错的——剂量决定性质，过量有害（如维生素 A 过量中毒）。" },
                { type: "trap", text: "⚠ 别搞混：“营养素 = 吃饱”是错的——吃饱解决的是能量，蛋白质、维生素、无机盐管的是结构和功能。" }
              ],
              point: "营养不只为吃饱；均衡搭配，剂量决定性质。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm11.1.2-p3",
              kind: "quiz",
              title: "练一练：营养物质",
              questions: [
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["维生素吃得越多越好", "蛋白质是构成细胞的基本物质", "油脂一点也不能吃"],
                  answer: 1,
                  tip: "维生素过量有害；油脂是备用能源，适量要吃。"
                },
                {
                  type: "fill",
                  stemBefore: "人体主要的供能物质是",
                  stemAfter: "。",
                  answer: "糖类",
                  accept: ["糖类"],
                  hint: "大米、馒头",
                  tip: "糖类是主要供能物质；蛋白质主“长”，油脂备“用”。"
                }
              ],
              point: "过关了？记住：六大营养素，均衡不多不少。"
            }
          ]
        },
        {
          id: "cm11.1.3",
          title: "有机合成材料",
          prereq: "cm11.1.2 人类重要的营养物质",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：天然 vs 合成 + 安全徽章） ---------- */
            {
              id: "cm11.1.3-p1",
              kind: "interact",
              title: "天然 vs 合成：别认错",
              exploreTip: "左右对照：棉花到底算哪边？",
              widgets: [
                {
                  type: "safety-badge",
                  params: {
                    level: "warn",
                    text: "塑料点燃鉴别：注意通风；现实中须在老师指导下进行",
                    realityNote: "虚拟实验为示意：现实中燃烧塑料会产生有害气体，必须在通风橱中进行。"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    title: "天然 vs 合成材料",
                    columns: ["天然", "合成（有机合成材料）"],
                    rows: [
                      { dim: "纤维", a: "棉花（天然纤维）", b: "涤纶（合成纤维，衣服）" },
                      { dim: "橡胶", a: "天然橡胶", b: "合成橡胶（轮胎）" },
                      { dim: "塑料", a: "—（无天然对应）", b: "聚乙烯塑料瓶、塑料袋" },
                      { dim: "分类结论", a: "棉花是天然纤维", b: "塑料/合成纤维/合成橡胶是合成材料" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "棉花是天然纤维！塑料、合成纤维、合成橡胶才是合成材料。"
            },
            /* ---------- p2：讲解页（有机物/白色污染/回收） ---------- */
            {
              id: "cm11.1.3-p2",
              kind: "explain",
              title: "有机物与白色污染",
              blocks: [
                { type: "lead", text: "上一页你给棉花“正名”了：它是天然纤维，不是合成材料。今天看有机物的世界。" },
                { type: "text", html: "有机物：含碳的化合物（如甲烷、乙醇、塑料）。例外：CO、CO₂、碳酸盐虽含碳，但性质像无机物，算无机物。有机合成材料：塑料、合成纤维、合成橡胶——“合成”是关键词。" },
                { type: "text", html: "白色污染：废弃塑料难降解，污染环境。对策：减少使用、重复使用、分类回收（塑料瓶上的 1–7 回收标志）、可降解塑料。适用条件：“塑料都有害”是错的——看种类与用途，医用塑料救命，乱丢的塑料袋才污染。" },
                { type: "trap", text: "⚠ 别搞混：“棉花是有机合成材料”是分类错误——棉花是天然纤维！分类先看“天然还是合成”，再看“有机还是无机”。" }
              ],
              point: "有机物含碳（CO/CO₂/碳酸盐除外）；合成材料三件套；白色污染靠分类回收治。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm11.1.3-p3",
              kind: "quiz",
              title: "练一练：合成材料",
              questions: [
                {
                  type: "choice",
                  stem: "下列属于有机合成材料的是",
                  options: ["棉花", "涤纶", "天然橡胶"],
                  answer: 1,
                  tip: "棉花是天然纤维，天然橡胶是天然的——“合成”才是关键词。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["CO₂ 是有机物", "塑料瓶上的数字标志用于分类回收", "所有塑料都有害"],
                  answer: 1,
                  tip: "CO₂ 性质像无机物；塑料看种类与用途，不能一棍子打死。"
                }
              ],
              point: "过关了？记住：合成三件套，棉花是天然的。"
            }
          ]
        },
        {
          id: "cm11.1.4",
          title: "初中化学总结",
          prereq: "cm11.1.3 有机合成材料",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（side-compare：四种基本反应类型） ---------- */
            {
              id: "cm11.1.4-p1",
              kind: "interact",
              title: "四种基本反应类型",
              exploreTip: "看对照表：四个类型，各举一个你学过的例子。",
              widgets: [
                {
                  type: "side-compare",
                  params: {
                    title: "四种基本反应类型",
                    columns: ["定义", "例子"],
                    rows: [
                      { dim: "化合反应", a: "多变一", b: "C + O₂ ＝点燃＝ CO₂" },
                      { dim: "分解反应", a: "一变多", b: "2NaHCO₃ ＝加热＝ Na₂CO₃ + H₂O + CO₂" },
                      { dim: "置换反应", a: "单质 + 化合物 → 新单质 + 新化合物", b: "Fe + CuSO₄ = FeSO₄ + Cu" },
                      { dim: "复分解反应", a: "交换成分（沉淀/气体/水三者有其一）", b: "AgNO₃ + NaCl = AgCl↓ + NaNO₃" }
                    ],
                    highlightDiff: true
                  }
                }
              ],
              point: "化合、分解、置换、复分解——氧化还原不属其中（cm12 见）。"
            },
            /* ---------- p2：讲解页（分类总图/三观/预告） ---------- */
            {
              id: "cm11.1.4-p2",
              kind: "explain",
              title: "初中化学知识地图",
              blocks: [
                { type: "lead", text: "上一页你复习了四个反应类型——现在把整个初中化学装进一张地图。" },
                { type: "text", html: "物质分类：纯净物（单质/化合物）与混合物；化合物再分酸/碱/盐/氧化物——分类先看标准，标准不同结论不同（cm12 会讲两种分类法）。" },
                { type: "text", html: "三观：元素观（物质由元素组成）、微粒观（物质由分子/原子/离子构成）、变化观（化学变化的判据是分子种类变没变）。三重表征四辨析，是全书的红线。" },
                { type: "text", html: "预告：四种基本反应类型概括不了所有反应——氧化还原反应（如 C + 2CuO）自成一类，cm12 会给你新语言：电子转移。“升失氧、降得还”，高中见。" },
                { type: "oldfriend", text: "还记得 cm01.1.1 的判据吗？“别看热不热闹，看分子变没变”——这句话管完了整个初中化学。" }
              ],
              point: "分类看标准，三观看世界；四类型之外，还有氧化还原。"
            },
            /* ---------- p3：练习页 ---------- */
            {
              id: "cm11.1.4-p3",
              kind: "quiz",
              title: "练一练：初中总结",
              questions: [
                {
                  type: "choice",
                  stem: "下列反应中，属于置换反应的是",
                  options: ["2NaHCO₃ ＝加热＝ Na₂CO₃ + H₂O + CO₂", "Fe + CuSO₄ = FeSO₄ + Cu", "AgNO₃ + NaCl = AgCl↓ + NaNO₃"],
                  answer: 1,
                  tip: "单质 + 化合物 → 新单质 + 新化合物——置换的“换”字是关键。"
                },
                {
                  type: "choice",
                  stem: "下列说法正确的是",
                  options: ["四种基本反应类型能概括一切化学反应", "氧化还原反应不属于四种基本反应类型", "复分解反应不需要条件"],
                  answer: 1,
                  tip: "氧化还原自成一类（cm12）；复分解要沉淀/气体/水三者有其一。"
                },
                {
                  type: "fill",
                  stemBefore: "化学变化的判据是",
                  stemAfter: "变没变。",
                  answer: "分子种类",
                  accept: ["分子种类", "分子"],
                  hint: "别看热不热闹",
                  tip: "判据只有一个：分子种类变没变——管完整个初中化学的一句话。"
                }
              ],
              point: "初中化学毕业！带着三观和四辨析，高中见。"
            }
          ]
        }
      ]
    }
  ]
};
