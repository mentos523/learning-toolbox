/* ============================================================
 * 学习工具箱 · 生物 · 第十四章数据（生物 P9 生产队 2026-10-19）
 *
 * 课：b14.1.1 捕获光能的色素（3 页）/ b14.1.2 光反应
 *     （3 页）/ b14.1.3 暗反应（4 页）/ b14.1.4 光合速率的
 *     影响因素与应用（3 页）/ b14.1.5 本章小结与习题
 *     （2 页）。共 15 页。
 * 交互：色素分离展开 / 光反应流程 / 卡尔文循环转圈 /
 * 温室抓短板，均为纯 HTML 内联 handler
 * （window.BIO_B14，b13 的 window.BIO_B13 先例），不新增
 * 引擎组件；b14.1.4-p1 复用 B4 photosyn-sandbox
 * （P9 回填升级：可选 insights 参数，见 biology-engine.js
 * P9 注释；b03.1.5 未传 insights，行为与 P7 一致）。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 「模式图：非等比、非实物」（BIO-R32，结构示意图常驻）
 * - 「虚拟实验：现实中须××」（BIO-R35，××逐页写实）
 * - B4：「示意曲线（非实测数据）」常驻（BIO-R42/BIO-R70，
 *   删=FAIL）；「当前××是短板——生产上先补短板」（逐字）
 * - O₂ 来源只许写「来自水」（b14.1.2；「来自 CO₂」= FAIL）
 * - BIO-R45 类推：纸层析结论不超范围（只证明四条色素带、
 *   叶绿素主吸红蓝紫，不许推出能量转换机制）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 门禁⑧：新术语首现即定义——类囊体 / 光反应
 * （b14.1.2-p1）/ 暗反应（b14.1.3-p1）/ 卡尔文循环
 * （b14.1.3-p2）/ 化能合成作用（b14.1.4-p3）。
 * 门禁⑨：深链只用已生产课号（b03 / b05 / b13、b16–b21；
 * b06↔b14 不硬链）；b07 / b08 / b15 未生产只纯文本。
 * 门禁⑩：b14.1.4-p1「学完 6.1 后回填认旧友」纯文本预告
 * → ledger-b14.1.4.json 记 drafted（门禁⑫口径待 CEO 裁决，
 * 沿用任务书"代数 6.1"）。
 * 门禁⑪：quiz 页题目数 > 0（b14.1.5 两页：3 + 4）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b14"] = {
  id: "b14",
  units: [
    {
      id: "b14.1",
      title: "光合作用的机理",
      lessons: [
        {
          id: "b14.1.1",
          title: "捕获光能的色素",
          prereq: "b13 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：纸层析实验（三原则落点） ============ */
            {
              id: "b14.1.1-p1",
              kind: "explain",
              title: "纸层析：把色素\"分家\"",
              blocks: [
                { type: "lead", text: "绿叶里只有一种绿色色素吗？一张滤纸条就能让它们\"分家\"。" },
                { type: "text", html: "纸层析实验：把绿叶色素提取液画在滤纸条上，层析液带色素往上跑——快慢不一，分出四条色素带：胡萝卜素、叶黄素、叶绿素 a、叶绿素 b。" },
                { type: "text", html: "三原则：① 对照——同条滤纸条同时展开，互相参照；② 单一变量——只比色素在层析液中的溶解度；③ 重复——多条滤纸条重复，位置一致才下结论。" },
                { type: "text", html: "结论边界：这个实验只证明\"绿叶里有四种色素、叶绿素 a/b 含量最多\"——不许推出\"它们怎么把光能变成化学能\"（光反应 b14.1.2 细讲）。" },
                { type: "note", text: "三问自查——四条色素带是哪四种？三原则怎么落点？不能推出什么？（答案在本页）" }
              ],
              point: "纸层析分四条色素带；三原则落点；结论不超范围。"
            },
            /* ============ p2：色素分离虚拟实验 ============ */
            {
              id: "b14.1.1-p2",
              kind: "explain",
              title: "虚拟实验：色素带展开",
              blocks: [
                { type: "lead", text: "点一下，看四条色素带在滤纸条上\"赛跑\"。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.pigment(1,this)\">① 点样</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.pigment(2,this)\">② 层析展开</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.pigment(3,this)\">③ 四条带认名</button>" +
                  "<div id=\"bioB14Pig\" style=\"min-height:5em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点按钮，一步步看色素分离。</div>" +
                  "<div style=\"font-size:0.85rem;color:var(--bio-ink-soft)\">虚拟实验：现实中须用层析液（有机溶剂，注意通风、远离明火）、规范取用药品，滤纸条的点样处不要用手直接触碰。</div>" +
                  "</div>" },
                { type: "text", html: "虚拟实验：现实中须用层析液（有机溶剂，注意通风、远离明火），规范取用药品。" },
                { type: "note", text: "动手：遮住上面，按\"点样→展开→认名\"复述一遍，并说出四条带从上到下的顺序。" }
              ],
              point: "虚拟实验看色素带展开；从上到下：胡萝卜素/叶黄素/叶绿素 a/b。"
            },
            /* ============ p3：吸收光谱 + 误区专治 ============ */
            {
              id: "b14.1.1-p3",
              kind: "explain",
              title: "吸收光谱：叶绿素\"挑食\"",
              blocks: [
                { type: "lead", text: "叶子是绿的，是因为它\"只吸收绿光\"吗？——正好反了。" },
                { type: "text", html: "叶绿素主要吸收红光和蓝紫光，对绿光吸收最少——绿光大部分被反射出来，所以叶子看起来是绿的。" },
                { type: "text", html: "<svg viewBox=\"0 0 360 120\" width=\"100%\" role=\"img\" aria-label=\"叶绿素吸收光谱示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"30\" y=\"30\" width=\"70\" height=\"46\" style=\"fill:var(--bio-organelle);opacity:0.85\"/><text x=\"65\" y=\"56\" style=\"fill:var(--bio-on-hl)\">蓝紫光</text><text x=\"65\" y=\"92\" style=\"fill:var(--bio-text)\">吸收多</text>" +
                  "<rect x=\"145\" y=\"30\" width=\"70\" height=\"46\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink-soft)\"/><text x=\"180\" y=\"56\" style=\"fill:var(--bio-text)\">绿光</text><text x=\"180\" y=\"92\" style=\"fill:var(--bio-text)\">吸收最少</text>" +
                  "<rect x=\"260\" y=\"30\" width=\"70\" height=\"46\" style=\"fill:var(--bio-organelle);opacity:0.85\"/><text x=\"295\" y=\"56\" style=\"fill:var(--bio-on-hl)\">红光</text><text x=\"295\" y=\"92\" style=\"fill:var(--bio-text)\">吸收多</text>" +
                  "<text x=\"180\" y=\"114\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">示意，非真实速度/比例</text>" +
                  "</g></svg>" },
                { type: "trap", text: "⚠️ \"叶片发绿因为只吸收绿光\"错——叶绿素主要吸收红光和蓝紫光，绿光吸收最少、被反射，所以看起来绿。" },
                { type: "note", text: "一句话：叶绿素\"挑食\"——爱红光和蓝紫光，不爱绿光。复述一遍。" }
              ],
              point: "叶绿素主吸红光和蓝紫光，绿光吸收最少。"
            }
          ]
        },
        {
          id: "b14.1.2",
          title: "光反应",
          prereq: "色素",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：场所（类囊体薄膜） ============ */
            {
              id: "b14.1.2-p1",
              kind: "explain",
              title: "光反应的场所：类囊体",
              blocks: [
                { type: "lead", text: "色素住在哪？光反应在哪开工？" },
                { type: "text", html: "先认词——类囊体：叶绿体内扁平的小囊，色素就分布在类囊体的薄膜上。" },
                { type: "text", html: "先认词——光反应：光合作用中需要光的阶段，在类囊体薄膜上进行。记住\"光\"字：没光，这一步开不了工。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 150\" width=\"100%\" role=\"img\" aria-label=\"叶绿体与类囊体模式图\" style=\"max-width:360px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<ellipse cx=\"170\" cy=\"70\" rx=\"120\" ry=\"52\" style=\"fill:var(--bio-panel);stroke:var(--bio-organelle)\" stroke-width=\"2\"/>" +
                  "<text x=\"170\" y=\"30\" style=\"fill:var(--bio-text)\">叶绿体</text>" +
                  "<rect x=\"110\" y=\"55\" width=\"120\" height=\"14\" rx=\"7\" style=\"fill:var(--bio-organelle);opacity:0.7\"/>" +
                  "<rect x=\"110\" y=\"76\" width=\"120\" height=\"14\" rx=\"7\" style=\"fill:var(--bio-organelle);opacity:0.7\"/>" +
                  "<rect x=\"110\" y=\"97\" width=\"120\" height=\"14\" rx=\"7\" style=\"fill:var(--bio-organelle);opacity:0.7\"/>" +
                  "<text x=\"170\" y=\"140\" style=\"fill:var(--bio-ink-soft)\">类囊体（色素在薄膜上）</text>" +
                  "<text x=\"170\" y=\"148\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</g></svg>" },
                { type: "note", text: "两词两问：类囊体是什么？光反应在哪进行、要什么条件？（答案在本页）" }
              ],
              point: "类囊体薄膜：色素所在地，光反应场所。"
            },
            /* ============ p2：水的光解（O₂ 来自水） ============ */
            {
              id: "b14.1.2-p2",
              kind: "explain",
              title: "水的光解：O₂ 来自水",
              blocks: [
                { type: "lead", text: "光合作用放出的氧气，来自二氧化碳还是水？" },
                { type: "text", html: "光能做的第一件事：把水分解——水在光下被分解，释放出 O₂（来自水），同时产生 [H] 和能量。" },
                { type: "text", html: "先认词——[H]：活泼的氢。水被分解后，氢并没有跑掉，而是变成一种\"带着能量的氢\"——[H]，它和 ATP 一起，把能量送给暗反应。" },
                { type: "text", html: "证据：同位素标记实验——给水里的氧做\"标记\"，放出的氧气就有标记；给二氧化碳做标记，放出的氧气没有。标记跟着水走，O₂ 来自水。" },
                { type: "text", html: "光能做的第二件事：把光能变成 ATP 和 NADPH 里的化学能——NADPH 是一种\"能量快递员\"分子，专门把能量送给暗反应（b14.1.3 细讲）。" },
                { type: "trap", text: "⚠️ \"光合释放的 O₂ 来自 CO₂\"错——来自水！这是初中版结论的严格化。" },
                { type: "note", text: "两问：O₂ 来自哪？证据是什么？ATP/NADPH 是干什么的？（答案在本页）" }
              ],
              point: "水的光解：O₂ 来自水（同位素证据）；光能→ATP/NADPH。"
            },
            /* ============ p3：光反应流程动画 + 误区专治 + 认旧友 ============ */
            {
              id: "b14.1.2-p3",
              kind: "explain",
              title: "光反应流程：直觉版",
              blocks: [
                { type: "lead", text: "光反应的全流程，一步步走一遍。" },
                { type: "text", html: "三步走一遍：场所——类囊体薄膜，色素吸光的地方；原料——水和光能，水被分解，释放出 O₂（O₂ 来自水，同位素标记实验证明）；产物——[H]（活泼的氢）和 ATP、NADPH，\"能量快递员\"带着化学能出发，送往暗反应（b14.1.3 细讲）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.light(1,this)\">① 色素吸光</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.light(2,this)\">② 水的光解</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.light(3,this)\">③ 产 ATP/NADPH</button>" +
                  "<div id=\"bioB14Light\" style=\"min-height:4.5em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点按钮，看光反应三步（电子传递链直觉版，不背细节）。</div>" +
                  "</div>" },
                { type: "trap", text: "⚠️ 再认一遍：\"光合释放的 O₂ 来自 CO₂\"错——来自水！（b14.1.2 第 2 页）" },
                { type: "mathlink", text: "认旧友：b03.1.2 第 1 页——初中版\"光合作用释放氧气\"的结论，本课严格化为\"O₂ 来自水\"（同位素标记证据）。" },
                { type: "note", text: "动手：遮住上面，复述光反应三步：场所→原料→产物。" }
              ],
              point: "光反应三步走；O₂ 来自水；认旧友 b03.1.2。"
            }
          ]
        },
        {
          id: "b14.1.3",
          title: "暗反应",
          prereq: "光反应",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：场所（叶绿体基质） ============ */
            {
              id: "b14.1.3-p1",
              kind: "explain",
              title: "暗反应的场所：叶绿体基质",
              blocks: [
                { type: "lead", text: "光反应在类囊体薄膜上开工，暗反应在哪？" },
                { type: "text", html: "先认词——暗反应：光合作用中不直接需要光的阶段，在叶绿体基质中进行。" },
                { type: "text", html: "先认词——基质：叶绿体内部、类囊体之外的液体部分，暗反应就在这里进行。" },
                { type: "text", html: "\"暗\"是\"不直接需要光\"，不是\"不要能量\"——暗反应用的 ATP 和 NADPH，全是光反应送来的。没光，光反应停工，暗反应也跟着停。" },
                { type: "text", html: "两阶段对照：光反应（类囊体薄膜，需光：水 → O₂ + ATP/NADPH）→ 暗反应（叶绿体基质，不直接需光：CO₂ → 糖类）。" },
                { type: "note", text: "两问：暗反应在哪进行？\"暗\"字到底什么意思？（答案在本页）" }
              ],
              point: "暗反应在叶绿体基质；\"暗\"=不直接需光，不是不要能量。"
            },
            /* ============ p2：卡尔文循环（直觉版三步转圈） ============ */
            {
              id: "b14.1.3-p2",
              kind: "explain",
              title: "卡尔文循环：三步转圈",
              blocks: [
                { type: "lead", text: "二氧化碳怎么变成糖？——转圈，转三步。" },
                { type: "text", html: "先认词——卡尔文循环：暗反应中 CO₂ 被固定、还原成糖类的循环过程（直觉版：三步转圈，不背酶名）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.calvin(1,this)\">① CO₂ 固定</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.calvin(2,this)\">② 还原</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.calvin(3,this)\">③ 再生转圈</button>" +
                  "<div id=\"bioB14Calvin\" style=\"min-height:4.5em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点按钮，看卡尔文循环三步转圈（直觉版）。</div>" +
                  "</div>" },
                { type: "text", html: "记住\"转圈\"的感觉就行：CO₂ 进来被固定 → 被还原成糖 → 起点再生、再接下一个 CO₂。酶的名字不用背。" },
                { type: "note", text: "动手：遮住上面，用\"固定→还原→再生\"三个词复述卡尔文循环。" }
              ],
              point: "卡尔文循环三步转圈：固定→还原→再生（不背酶名）。"
            },
            /* ============ p3：产物（糖类） ============ */
            {
              id: "b14.1.3-p3",
              kind: "explain",
              title: "产物：糖类",
              blocks: [
                { type: "lead", text: "转了一圈，产出是什么？" },
                { type: "text", html: "暗反应的产物是糖类（如葡萄糖）——光能最终变成了糖类里的化学能，存了起来。" },
                { type: "text", html: "能量账：光能 →（光反应）→ ATP/NADPH 里的化学能 →（暗反应）→ 糖类里的化学能。能量一站站往下传，没有凭空消失。" },
                { type: "text", html: "总式回顾：二氧化碳 + 水 —光能，叶绿体→ 有机物（糖类）+ 氧气。原料、条件、场所、产物四要素对上号。" },
                { type: "note", text: "一句话：暗反应把 CO₂ 变成糖，光能变成\"存\"起来的化学能。" }
              ],
              point: "暗反应产物是糖类；能量：光能→ATP/NADPH→糖类。"
            },
            /* ============ p4：误区专治 ============ */
            {
              id: "b14.1.3-p4",
              kind: "explain",
              title: "专治：\"暗反应不需要 ATP\"错",
              blocks: [
                { type: "lead", text: "\"暗反应\"听起来像\"不要能量\"？——错！" },
                { type: "text", html: "\"暗\"指不直接需要光，不是不要能量。CO₂ 固定和还原都要消耗 ATP 和 NADPH——它们全是光反应送来的\"能量快递\"。" },
                { type: "text", html: "链条：没光 → 光反应停工 → ATP/NADPH 断供 → 暗反应跟着停。所以晚上植物不进行光合作用，两步都停。" },
                { type: "trap", text: "⚠️ \"暗反应不需要 ATP\"错——光反应供 ATP/NADPH！\"暗\"指不直接需光，不是不要能量。" },
                { type: "note", text: "动手：用自己的话解释——为什么晚上暗反应也停工？" }
              ],
              point: "暗反应要 ATP/NADPH（光反应供）；\"暗\"≠不要能量。"
            }
          ]
        },
        {
          id: "b14.1.4",
          title: "光合速率的影响因素与应用",
          prereq: "暗反应",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：三因素 + B4 回填升级 ============ */
            {
              id: "b14.1.4-p1",
              kind: "explain",
              title: "三因素调控沙盘",
              blocks: [
                { type: "lead", text: "光合速率由谁说了算？三个滑块，自己动手找答案。" },
                { type: "text", html: "影响光合速率的三因素：光照强度、CO₂ 浓度、温度。拉动滑块，看光合速率（相对值）实时变化。" },
                { type: "widget", widget: { type: "photosyn-sandbox", params: {
                  light: { min: 0, max: 100, step: 5, init: 60, unit: "相对值" },
                  co2:   { min: 0, max: 100, step: 5, init: 40, unit: "相对值" },
                  temp:  { min: 5, max: 40, step: 1, init: 25, unit: "℃" },
                  showCurve: true,
                  limitHint: true,
                  insights: [
                    { type: "tempHigh", at: 35, text: "温度太高，酶活性下降——不是越高越好", href: "#b13.1.2", linkText: "认旧友：b13.1.2 酶的作用条件" },
                    { type: "lightHighCo2Low", lightAt: 80, co2At: 30, text: "光照充足但 CO₂ 不足——综合作用，生产上抓主要限制因素" }
                  ]
                } } },
                { type: "text", html: "读曲线（直观版，不讲函数定义）：横轴是光照强度，纵轴是光合速率（相对值）；曲线先升后平——光再强，速率也不涨了，因为别的因素成了短板。" },
                { type: "text", html: "纯文本预告：学完 6.1 后回填认旧友——到时候回来看看，这条\"先升后平\"的曲线就是函数图像。" },
                { type: "note", text: "动手：把光照拉满、CO₂ 调低，看\"当前短板\"徽章说什么；再把温度调到 38℃，看新提示说什么。" }
              ],
              point: "三因素综合作用；抓主要限制因素；曲线先升后平。"
            },
            /* ============ p2：温室应用 ============ */
            {
              id: "b14.1.4-p2",
              kind: "explain",
              title: "温室：补短板的生产",
              blocks: [
                { type: "lead", text: "大棚种菜，补光、增施 CO₂、拉大昼夜温差——都是在补哪块短板？" },
                { type: "text", html: "温室应用三招：① 补光——光照是短板时补光；② 增施 CO₂——CO₂ 是短板时补充；③ 昼夜温差——白天温度适宜多光合，夜间适当降温减弱呼吸作用、少消耗。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.greenhouse(1,this)\">补光补哪块？</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.greenhouse(2,this)\">增施 CO₂ 补哪块？</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B14.greenhouse(3,this)\">昼夜温差为哪般？</button>" +
                  "<div id=\"bioB14Gh\" style=\"min-height:3.6em;margin-top:6px;font-size:0.95rem;line-height:1.7\">点按钮，看每招补的是哪块短板。</div>" +
                  "</div>" },
                { type: "text", html: "单位正确：本课速率一律用相对值（非常测数据）——纵轴\"相对值\"标注常驻，不能删。" },
                { type: "note", text: "动手：遮住上面，说出温室三招各补哪块短板。" }
              ],
              point: "温室三招：补光/增施 CO₂/昼夜温差；抓短板。"
            },
            /* ============ p3：化能合成作用拓展 ============ */
            {
              id: "b14.1.4-p3",
              kind: "explain",
              title: "拓展：化能合成作用",
              blocks: [
                { type: "lead", text: "不见光的细菌，也能自己制造有机物？" },
                { type: "text", html: "先认词——化能合成作用：某些细菌利用化学能，把二氧化碳和水合成有机物的过程。" },
                { type: "text", html: "例子：硝化细菌。能量来源是化学能，不是光能——这是它和光合作用的根本区别：一个\"吃光\"，一个\"吃化学能\"。" },
                { type: "trap", text: "⚠️ \"影响因素单因论\"错——综合作用！生产上抓主要限制因素：先看\"当前短板\"是哪块，再补哪块。" },
                { type: "note", text: "两问：化能合成作用的能量来源是什么？它和光合作用的根本区别在哪？（答案在本页）" }
              ],
              point: "化能合成作用：能量来自化学能（硝化细菌）；抓主要限制因素。"
            }
          ]
        },
        {
          id: "b14.1.5",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b14.1.5-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b14.1.1：纸层析分出四条色素带（胡萝卜素/叶黄素/叶绿素 a/b；三原则落点；结论不超范围）；色素分离虚拟实验；叶绿素主吸红光和蓝紫光（绿光吸收最少）。b14.1.2：类囊体薄膜（光反应场所）；水的光解（O₂ 来自水，同位素证据；认旧友 b03.1.2）；光能→ATP/NADPH；光反应三步。b14.1.3：叶绿体基质（暗反应场所）；卡尔文循环三步转圈（固定→还原→再生，不背酶名）；产物糖类；暗反应要 ATP/NADPH。b14.1.4：三因素（光照/CO₂/温度；B4 沙盘；抓主要限制因素）；温室三招；化能合成作用（化学能非光能）；代数 6.1 预告（学完 6.1 后回填认旧友，drafted）。" },
                { type: "choice", stem: "纸层析实验中，滤纸条最上端的色素带是？",
                  options: ["叶绿素 a", "叶绿素 b", "叶黄素", "胡萝卜素"], answer: 3,
                  tip: "跑得最快的是胡萝卜素（橙黄色），在最上端（b14.1.1 第 1、2 页）。" },
                { type: "choice", stem: "光合作用释放的氧气来自？",
                  options: ["二氧化碳", "水", "叶绿素", "ATP"], answer: 1,
                  tip: "来自水！同位素标记实验证据——选\"来自二氧化碳\"就错了（b14.1.2 第 2、3 页）。" },
                { type: "choice", stem: "关于暗反应的说法，正确的是？",
                  options: ["暗反应不需要任何能量", "暗反应在类囊体薄膜上进行", "暗反应消耗光反应提供的 ATP 和 NADPH", "暗反应只能在黑暗中进行"], answer: 2,
                  tip: "\"暗\"指不直接需光，不是不要能量——ATP/NADPH 由光反应供应（b14.1.3 第 1、4 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b14.1.5-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "叶绿素主要吸收的光是？",
                  options: ["绿光", "红光和蓝紫光", "只吸收绿光", "各种光等量吸收"], answer: 1,
                  tip: "主吸红光和蓝紫光，绿光吸收最少——所以叶子看起来绿（b14.1.1 第 3 页）。" },
                { type: "choice", stem: "大棚里光照充足但 CO₂ 不足，最该补的是？",
                  options: ["继续补光", "增施 CO₂", "升温到 40℃", "什么都不用做"], answer: 1,
                  tip: "抓主要限制因素：当前 CO₂ 是短板——生产上先补短板（b14.1.4 第 1、2 页）。" },
                { type: "choice", stem: "硝化细菌进行化能合成作用，其能量来源是？",
                  options: ["光能", "化学能", "热能", "ATP 直接供能"], answer: 1,
                  tip: "能量来源是化学能，不是光能——这是与光合作用的根本区别（b14.1.4 第 3 页）。" },
                { type: "choice", stem: "卡尔文循环的三个步骤依次是？",
                  options: ["还原→固定→再生", "固定→还原→再生", "再生→固定→还原", "固定→再生→还原"], answer: 1,
                  tip: "三步转圈：CO₂ 固定 → 还原 → 再生（b14.1.3 第 2 页）。" }
              ],
              point: "全章完。"
            }
          ]
        }
      ]
    }
  ]
};

/* ============================================================
 * b14 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b03/b13/b21 先例）。命名空间 window.BIO_B14。
 * 色素分离展开 / 光反应流程 / 卡尔文循环转圈 / 温室抓短板。
 * ============================================================ */
window.BIO_B14 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  function markBtn(btn) {
    if (!btn) return;
    var sibs = btn.parentNode.querySelectorAll("button");
    for (var i = 0; i < sibs.length; i++) sibs[i].style.outline = "";
    btn.style.outline = "3px solid var(--bio-highlight)";
    btn.style.outlineOffset = "1px";
  }
  /* ---------- 色素分离 ---------- */
  var PIG = {
    1: "① <b>点样</b>：把绿叶色素提取液画在滤纸条一端——四个\"选手\"站在同一起跑线。",
    2: "② <b>层析展开</b>：层析液带着色素往上跑。溶解度大的跑得快、小的跑得慢——队伍拉开了。",
    3: "③ <b>四条带认名</b>（从上到下）：<b>胡萝卜素</b>（橙黄，最快）→ <b>叶黄素</b>（黄）→ <b>叶绿素 a</b>（蓝绿，含量最多）→ <b>叶绿素 b</b>（黄绿）。"
  };
  /* ---------- 光反应 ---------- */
  var LIGHT = {
    1: "① <b>色素吸光</b>：类囊体薄膜上的色素吸收光能（主要红光和蓝紫光）——\"天线\"开机。",
    2: "② <b>水的光解</b>：水被分解，释放 <b>O₂（来自水！）</b>，同时产生 [H]。",
    3: "③ <b>产 ATP/NADPH</b>：光能转化成 ATP 和 NADPH 里的化学能——\"能量快递员\"出发，送往暗反应（b14.1.3 细讲）。"
  };
  /* ---------- 卡尔文循环 ---------- */
  var CALVIN = {
    1: "① <b>CO₂ 固定</b>：二氧化碳被\"抓\"进来，固定到已有分子上——原料进场。",
    2: "② <b>还原</b>：消耗光反应送来的 ATP 和 NADPH，把固定的碳还原成糖类——能量花掉，糖造出来。",
    3: "③ <b>再生转圈</b>：起点分子再生，回去再接下一个 CO₂——转圈继续。记住\"固定→还原→再生\"，酶名不背。"
  };
  /* ---------- 温室抓短板 ---------- */
  var GH = {
    1: "<b>补光</b>补的是\"光照\"短板：阴天、冬季光照不足时，多见光才能多光合。",
    2: "<b>增施 CO₂</b>补的是\"CO₂\"短板：大棚密闭，CO₂ 容易先见底——补上，速率才上得去。",
    3: "<b>昼夜温差</b>：白天温度适宜多光合、夜间适当降温减弱呼吸少消耗——一增一减，净积累更多。"
  };
  return {
    pigment: function (n, btn) { markBtn(btn); say("bioB14Pig", PIG[n] || ""); },
    light: function (n, btn) { markBtn(btn); say("bioB14Light", LIGHT[n] || ""); },
    calvin: function (n, btn) { markBtn(btn); say("bioB14Calvin", CALVIN[n] || ""); },
    greenhouse: function (n, btn) { markBtn(btn); say("bioB14Gh", GH[n] || ""); }
  };
})();
