/* ============================================================
 * 学习工具箱 · 生物 · 第十三章数据（生物 P8 生产队 2026-10-19）
 *
 * 课：b13.1.1 酶的作用与本质（3 页）/ b13.1.2 酶的特性
 *     （3 页）/ b13.1.3 ATP（3 页）/ b13.1.4 本章小结与习题
 *     （2 页）。共 11 页。
 * 交互：本批唯一新组件 B10 enzyme-lab（酶条件实验室，
 * biology-engine.js P8 首立，见该文件注释），落点 b13.1.2-p1
 * （recordKey=bio_enzyme_b13.1.2）与 b05.1.2-p3（锁钥段复用，
 * recordKey=bio_enzyme_b05.1.2）；过氧化氢三组对照复用既有
 * B3 experiment-3q（recordKey=bio_3q_b13.1.1）；ATP/ADP
 * 循环动画为纯 HTML 内联 handler（window.BIO_B13），不新增
 * 组件（任务书红线）。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 酶能量口径：只许写「降低活化能」，「酶提供能量」= FAIL
 *   （b13.1.1-p1；BIO-R41）
 * - 高温/低温口径：「不可恢复」（高温破坏空间结构）/
 *   「可恢复」（低温抑制）（b13.1.2-p2；B10 真锁死）
 * - B10 冻结：「示意曲线（非实测数据）」（缺=FAIL；BIO-R42
 *   类推）/「结合时会微调（诱导契合）」（T3，锁钥成功必出）/
 *   滑块默认 37℃/7.0 冻结（B-F10）
 * - 「虚拟实验：现实中须××」（BIO-R35，××逐页写实）
 * - T4 边界句逐字：「含量少、转化快，货币流通不是金库囤积」
 *   （b13.1.3-p3）
 * - 直引号；type:"text\" 的块用 html 键（P4 教训）
 *
 * 门禁⑧：新术语首现即定义——活化能/酶（b13.1.1-p1/p2）/
 * 高效性/专一性/作用条件温和（b13.1.2-p1）/腺苷三磷酸
 * （b13.1.3-p1）/吸能反应/放能反应（b13.1.3-p3）。
 * 门禁⑨：深链只用已生产课号（b05 本批互链、b16–b21、b03）
 * + 代数 6.1（XLINK_MATH 在表）；b12 未生产只纯文本前链。
 * 门禁⑩：b13.1.2-p3「学完 6.1 后回填认旧友」纯文本预告
 * drafted（兑现点 math 模块）；b05.1.2 专一性为同批兑现，
 * 本页 p1 认旧友回链（in-batch）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b13"] = {
  id: "b13",
  units: [
    {
      id: "b13.1",
      title: "酶与 ATP",
      lessons: [
        {
          id: "b13.1.1",
          title: "酶的作用与本质",
          prereq: "b12 小结（纯文本前链）",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：活化能 + 酶能量口径 ============ */
            {
              id: "b13.1.1-p1",
              kind: "explain",
              title: "活化能：反应的\"门槛\"",
              blocks: [
                { type: "lead", text: "纸不容易点着，加把火就着了——火给了什么？" },
                { type: "text", html: "先认词——活化能：分子从常态转变为容易发生化学反应的活跃状态所需要的能量。好比跨门槛：门槛越高，越难跨过去。" },
                { type: "text", html: "加热 vs 酶：加热是\"给能量\"，让分子攒够劲儿跨过高门槛；酶是\"降门槛\"，把门槛本身变矮，分子轻轻一跨就过去了。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 150\" width=\"100%\" role=\"img\" aria-label=\"活化能示意\" style=\"max-width:420px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<path d=\"M30,120 L110,120 Q150,118 160,60 Q170,118 210,120 L310,120\" style=\"fill:none;stroke:var(--bio-ink-soft)\" stroke-width=\"2\"/>" +
                  "<path d=\"M30,120 L110,120 Q150,119 160,96 Q170,119 210,120 L310,120\" style=\"fill:none;stroke:var(--bio-organelle)\" stroke-width=\"2.5\"/>" +
                  "<text x=\"160\" y=\"40\" style=\"fill:var(--bio-ink-soft)\">高门槛（无酶）</text>" +
                  "<text x=\"160\" y=\"84\" style=\"fill:var(--bio-organelle)\">矮门槛（有酶）</text>" +
                  "<text x=\"70\" y=\"140\" style=\"fill:var(--bio-ink-soft)\">反应物</text>" +
                  "<text x=\"270\" y=\"140\" style=\"fill:var(--bio-ink-soft)\">产物</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"148\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "text", html: "逐字口径——酶只降低活化能，不提供能量。能量还是反应物自己出的，酶只是让路好走。" },
                { type: "trap", text: "⚠️ 别搞混：\"酶提供能量\"错——酶只降低活化能，不提供能量！" },
                { type: "note", text: "三问自查——活化能是什么？加热和酶分别对\"门槛\"做了什么？（答案在本页）" }
              ],
              point: "活化能是门槛；酶降门槛、不提供能量。"
            },
            /* ============ p2：酶的本质（首现即定义） ============ */
            {
              id: "b13.1.1-p2",
              kind: "explain",
              title: "酶：活细胞的\"工具\"",
              blocks: [
                { type: "lead", text: "唾液里分解淀粉的\"帮手\"、肝脏里分解过氧化氢的\"帮手\"——它们是同一类东西。" },
                { type: "text", html: "先认词——酶：活细胞产生的、具有催化作用的有机物。绝大多数酶是蛋白质，少数是 RNA。" },
                { type: "text", html: "三句话记住：① 活细胞产生（不是细胞外凭空来的）；② 有机物（多为蛋白质、少数 RNA）；③ 催化作用（改变化学反应速率，自身不被消耗）。" },
                { type: "text", html: "回看 b05：唾液淀粉酶、胃蛋白酶、胰脂肪酶——名字都带\"酶\"，都是活细胞生产的\"工具\"。它们\"认\"自己的底物，这叫专一性（b13.1.2 细讲）。" },
                { type: "note", text: "三问自查——酶的定义三要素？绝大多数酶是什么物质？（答案在本页）" }
              ],
              point: "酶：活细胞产生的催化作用有机物（多为蛋白质）。"
            },
            /* ============ p3：过氧化氢三组对照（复用 B3） ============ */
            {
              id: "b13.1.1-p3",
              kind: "explain",
              title: "三组对照：酶有多\"快\"",
              blocks: [
                { type: "lead", text: "过氧化氢（双氧水）会自己慢慢分解——加催化剂，能快多少？" },
                { type: "text", html: "三组对照：① 不加催化剂（对照组）；② 加二氧化锰（无机催化剂）；③ 加新鲜肝脏研磨液（含过氧化氢酶）。变量交代：温度室温、过氧化氢等量等浓度、研磨液与二氧化锰取用规范。" },
                { type: "text", html: "<div style=\"display:flex;gap:10px;justify-content:center;margin:8px 0;flex-wrap:wrap\">" +
                  "<div style=\"text-align:center\"><svg viewBox=\"0 0 80 110\" width=\"80\" role=\"img\" aria-label=\"不加催化剂\"><rect x=\"30\" y=\"20\" width=\"20\" height=\"70\" rx=\"8\" style=\"fill:none;stroke:var(--bio-membrane)\" stroke-width=\"2\"/><circle cx=\"40\" cy=\"70\" r=\"3\" style=\"fill:var(--bio-ink-soft)\"/><text x=\"40\" y=\"104\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">不加</text><text x=\"40\" y=\"14\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">气泡极少</text></svg></div>" +
                  "<div style=\"text-align:center\"><svg viewBox=\"0 0 80 110\" width=\"80\" role=\"img\" aria-label=\"加二氧化锰\"><rect x=\"30\" y=\"20\" width=\"20\" height=\"70\" rx=\"8\" style=\"fill:none;stroke:var(--bio-membrane)\" stroke-width=\"2\"/><circle cx=\"36\" cy=\"66\" r=\"3\" style=\"fill:var(--bio-substrate)\"/><circle cx=\"44\" cy=\"58\" r=\"3\" style=\"fill:var(--bio-substrate)\"/><circle cx=\"40\" cy=\"48\" r=\"3\" style=\"fill:var(--bio-substrate)\"/><text x=\"40\" y=\"104\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">+MnO₂</text><text x=\"40\" y=\"14\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-substrate)\">气泡较多</text></svg></div>" +
                  "<div style=\"text-align:center\"><svg viewBox=\"0 0 80 110\" width=\"80\" role=\"img\" aria-label=\"加过氧化氢酶\"><rect x=\"30\" y=\"20\" width=\"20\" height=\"70\" rx=\"8\" style=\"fill:none;stroke:var(--bio-membrane)\" stroke-width=\"2\"/><circle cx=\"34\" cy=\"70\" r=\"3.5\" style=\"fill:var(--bio-organelle)\"/><circle cx=\"42\" cy=\"62\" r=\"3.5\" style=\"fill:var(--bio-organelle)\"/><circle cx=\"38\" cy=\"52\" r=\"3.5\" style=\"fill:var(--bio-organelle)\"/><circle cx=\"44\" cy=\"42\" r=\"3.5\" style=\"fill:var(--bio-organelle)\"/><circle cx=\"36\" cy=\"34\" r=\"3.5\" style=\"fill:var(--bio-organelle)\"/><text x=\"40\" y=\"104\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">+酶</text><text x=\"40\" y=\"14\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-organelle)\">气泡大量</text></svg></div>" +
                  "</div><div style=\"text-align:center;font-size:12.48px;color:var(--bio-ink-soft)\">模式图：非等比、非实物（气泡量示意相对多少）</div>" },
                { type: "widget", widget: { type: "experiment-3q", params: {
                  purpose: "比较酶与无机催化剂催化过氧化氢分解的效率",
                  controlOptions: ["不加任何催化剂的一组", "只加过氧化氢酶的一组", "三组都加催化剂"],
                  variableOptions: ["催化剂种类", "过氧化氢的量", "试管的大小"],
                  repeatOptions: ["1 次", "每组重复 3 次", "只重复对照组"],
                  answer: { control: 0, variable: 0, repeat: 1 },
                  thoughtExp: "如果不设\"不加催化剂\"的对照组，看到加酶的试管气泡冒得快，你怎么知道是酶的功劳？可能是过氧化氢自己分解得就快——没\"参照物\"，说不清。",
                  recordKey: "bio_3q_b13.1.1",
                  replayHref: "#b13.1.1/3",
                  replayText: "回看本页：三组对照现象"
                } } },
                { type: "text", html: "现象：加酶的试管气泡最多、最快——酶降低活化能的作用更显著（这只证明\"酶的催化效率更高\"，高效性的严格表述见 b13.1.2）。" },
                { type: "text", html: "虚拟实验：现实中须注意过氧化氢安全、规范取用药品，肝脏研磨液现配现用。" },
                { type: "note", text: "动手：遮住答案复述一遍——对照组是\"参照物\"，参照什么？" }
              ],
              point: "三组对照：酶催化效率最高；三原则落点。"
            }
          ]
        },
        {
          id: "b13.1.2",
          title: "酶的特性",
          prereq: "酶的作用与本质",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：三大特性 + B10 首立 ============ */
            {
              id: "b13.1.2-p1",
              kind: "explain",
              title: "酶的三个\"性格\"",
              blocks: [
                { type: "lead", text: "酶有三个鲜明的\"性格\"：干活快、认准人、脾气\"娇\"。" },
                { type: "text", html: "先认词——高效性：酶的催化效率很高（b13.1.1 第 3 页：酶比无机催化剂快得多）。先认词——专一性：每一种酶只能催化一种或一类化学反应（唾液淀粉酶只认淀粉）。先认词——作用条件温和：酶在温和的常温、常压、中性偏酸碱条件下就能起作用，不需要高温高压。" },
                { type: "mathlink", text: "认旧友：b05.1.2 第 3 页——唾液只初步消化淀粉，专一性早就见过（同批互链）。" },
                { type: "text", html: "下面进 B10 酶条件实验室：温度/pH 双滑块看活性曲线，亲手试\"烫坏\"与\"冻住\"，再玩锁钥配对。" },
                { type: "widget", widget: { type: "enzyme-lab", params: {
                  temp: { min: 0, max: 70, step: 1, init: 37, unit: "℃" },
                  ph: { min: 0, max: 14, step: 0.5, init: 7 },
                  lockKey: true, irreversDemo: true,
                  recordKey: "bio_enzyme_b13.1.2"
                } } },
                { type: "note", text: "动手（黄队先动手后结论）：温度从 37℃ 拖到 70℃ 再拖回——\"烫坏，不可恢复\"；再拖到 0℃ 拖回——\"冻住，可恢复\"。" }
              ],
              point: "高效性/专一性/作用条件温和；B10 首立。"
            },
            /* ============ p2：曲线读图直观版 + 高温/低温口径 ============ */
            {
              id: "b13.1.2-p2",
              kind: "explain",
              title: "读曲线：酶的\"舒适区\"",
              blocks: [
                { type: "lead", text: "这条\"小山包\"曲线，会读就够了——不讲函数定义。" },
                { type: "text", html: "<svg viewBox=\"0 0 360 190\" width=\"100%\" role=\"img\" aria-label=\"温度影响酶活性示意曲线\" style=\"max-width:440px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\">" +
                  "<line x1=\"44\" y1=\"150\" x2=\"340\" y2=\"150\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"1.5\"/>" +
                  "<line x1=\"44\" y1=\"150\" x2=\"44\" y2=\"20\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"1.5\"/>" +
                  "<text x=\"192\" y=\"172\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">温度（℃）</text>" +
                  "<text x=\"16\" y=\"90\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\" transform=\"rotate(-90 16 90)\">相对活性</text>" +
                  "<path d=\"M44,150 Q120,148 168,60 Q192,24 216,60 Q264,148 340,150\" style=\"fill:none;stroke:var(--bio-target)\" stroke-width=\"3\"/>" +
                  "<line x1=\"192\" y1=\"150\" x2=\"192\" y2=\"34\" style=\"stroke:var(--bio-aux)\" stroke-width=\"1.5\" stroke-dasharray=\"5,4\"/>" +
                  "<circle cx=\"192\" cy=\"34\" r=\"6\" style=\"fill:var(--bio-highlight)\"/>" +
                  "<text x=\"192\" y=\"24\" text-anchor=\"middle\" style=\"fill:var(--bio-text)\">最适（37℃）</text>" +
                  "<text x=\"330\" y=\"40\" text-anchor=\"end\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">示意曲线（非实测数据）</text>" +
                  "</g>" +
                  "<text x=\"180\" y=\"188\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "text", html: "读图三问：① 最高点在哪（最适 37℃ 附近）？② 左边上升说明什么（活性随温度升）？③ 右边掉到零说明什么（高温破坏了酶的空间结构）？纵轴是相对值，只看趋势不读数。" },
                { type: "trap", text: "⚠️ 别搞混：\"高温抑制酶活性\"错——高温破坏空间结构、不可恢复！低温才是可恢复的抑制——\"烫坏\"和\"冻住\"两回事。" },
                { type: "text", html: "生活证据：烫熟的鸡蛋回不来；冻肉化冻后还能吃。高温把锁'烫变形'，回不来——这就是为什么发烧太高危险。" },
                { type: "note", text: "三问自查——最适温度是多少？高温段为什么掉到零？" }
              ],
              point: "读曲线：最适/上升/下降；烫坏不可恢复，冻住可恢复。"
            },
            /* ============ p3：代数 6.1 XLINK + 回填预告 drafted ============ */
            {
              id: "b13.1.2-p3",
              kind: "explain",
              title: "这条曲线是函数图像",
              blocks: [
                { type: "lead", text: "\"一个量随另一个量变化\"——这条钟形曲线，数学里有个专门的名字。" },
                { type: "text", html: "直观版：温度变→活性跟着变，一个量随另一个量变化的关系，画出来就是一张图像。横轴是自变量（温度——自己变的量），纵轴是因变量（相对活性——跟着变的量）。这两个词是数学课的叫法，先混个脸熟；严格定义等代数 6.1。只读图，不讲函数定义。" },
                { type: "mathlink", text: "数学呼应：代数 6.1 细讲函数图像——这条钟形曲线就是一张函数图像（直观版：只读图，不讲定义）。" },
                { type: "text", html: "纯文本预告：学完 6.1 后回填认旧友——到时候回来看看，这条\"小山包\"就是函数图像。" },
                { type: "mathlink", text: "认旧友回链：b05.1.2 第 3 页——唾液淀粉酶锁钥配对，专一性的初见（同批互链）。" },
                { type: "note", text: "动手：遮住本页，用一句话向同桌讲清\"这条曲线横轴纵轴各是什么\"。" }
              ],
              point: "酶活性曲线即函数图像（直观版）；预告 6.1 回填。"
            }
          ]
        },
        {
          id: "b13.1.3",
          title: "ATP",
          prereq: "酶的特性",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：腺苷三磷酸结构（首现即定义） ============ */
            {
              id: "b13.1.3-p1",
              kind: "explain",
              title: "ATP：能量的\"硬通货\"",
              blocks: [
                { type: "lead", text: "细胞里的能量，不囤\"金条\"，只备\"零钱\"——ATP 就是这\"零钱\"。" },
                { type: "text", html: "先认词——腺苷三磷酸（ATP)：由腺苷和三个磷酸基团构成的有机物，是细胞生命活动的直接能源物质。" },
                { type: "text", html: "结构简写：A—P～P～P。其中 A 代表腺苷，P 代表磷酸基团，— 是普通磷酸键，～ 是高能磷酸键（储存化学能、容易断裂）。" },
                { type: "text", html: "<svg viewBox=\"0 0 360 120\" width=\"100%\" role=\"img\" aria-label=\"ATP结构示意\" style=\"max-width:360px;display:block;margin:6px auto\">" +
                  "<g font-size=\"15\" text-anchor=\"middle\">" +
                  "<rect x=\"30\" y=\"40\" width=\"70\" height=\"40\" rx=\"8\" style=\"fill:var(--bio-gene)\" opacity=\"0.8\"/>" +
                  "<text x=\"65\" y=\"65\" style=\"fill:#fff\">A（腺苷）</text>" +
                  "<text x=\"112\" y=\"65\" style=\"fill:var(--bio-text)\">—</text>" +
                  "<circle cx=\"140\" cy=\"60\" r=\"20\" style=\"fill:var(--bio-product)\" opacity=\"0.85\"/>" +
                  "<text x=\"140\" y=\"66\" style=\"fill:#fff\">P</text>" +
                  "<text x=\"168\" y=\"65\" style=\"fill:var(--bio-target)\">～</text>" +
                  "<circle cx=\"196\" cy=\"60\" r=\"20\" style=\"fill:var(--bio-product)\" opacity=\"0.85\"/>" +
                  "<text x=\"196\" y=\"66\" style=\"fill:#fff\">P</text>" +
                  "<text x=\"224\" y=\"65\" style=\"fill:var(--bio-target)\">～</text>" +
                  "<circle cx=\"252\" cy=\"60\" r=\"20\" style=\"fill:var(--bio-target)\" opacity=\"0.85\"/>" +
                  "<text x=\"252\" y=\"66\" style=\"fill:#fff\">P</text>" +
                  "<text x=\"252\" y=\"100\" font-size=\"12.48\" style=\"fill:var(--bio-target)\">远离腺苷的高能磷酸键最易断裂</text>" +
                  "</g>" +
                  "<text x=\"180\" y=\"116\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "note", text: "三问自查——ATP 全称？A—P～P～P 里\"～\"是什么键？哪一个最易断裂？（答案在本页）" }
              ],
              point: "腺苷三磷酸：A—P～P～P；远端～最易断裂。"
            },
            /* ============ p2：ATP/ADP 循环（内联动画） ============ */
            {
              id: "b13.1.3-p2",
              kind: "explain",
              title: "ATP⇌ADP：循环不息",
              blocks: [
                { type: "lead", text: "ATP 花掉变 ADP，ADP 充电变回 ATP——一枚\"硬币\"的两面。" },
                { type: "text", html: "<div style=\"text-align:center;margin:4px 0\">" +
                  "<math xmlns=\"http://www.w3.org/1998/MathML\" style=\"font-size:17px\"><mrow><mi>ATP</mi><mo>⇌</mo><mi>ADP</mi><mo>+</mo><mi>Pi</mi><mo>+</mo><mi>能量</mi></mrow></math>" +
                  "<div style=\"font-size:12.48px;color:var(--bio-ink-soft)\">Pi：磷酸基团</div></div>" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center\">" +
                  "<div style=\"font-weight:700;margin-bottom:8px\">🔄 ATP/ADP 循环：点按钮看两步</div>" +
                  "<div style=\"margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"margin:0 6px;min-height:44px\" onclick=\"BIO_B13.cyc(1)\">① 花掉：ATP→ADP</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"margin:0 6px;min-height:44px\" onclick=\"BIO_B13.cyc(2)\">② 充电：ADP→ATP</button>" +
                  "</div>" +
                  "<svg viewBox=\"0 0 340 120\" width=\"100%\" role=\"img\" aria-label=\"ATP ADP循环示意\" style=\"max-width:340px;display:block;margin:6px auto\">" +
                  "<g font-size=\"14\" text-anchor=\"middle\">" +
                  "<ellipse id=\"atpCycA\" cx=\"90\" cy=\"60\" rx=\"52\" ry=\"30\" style=\"fill:var(--bio-highlight)\" opacity=\"0.9\"/>" +
                  "<text x=\"90\" y=\"66\" style=\"fill:var(--bio-on-hl)\">ATP</text>" +
                  "<ellipse id=\"atpCycB\" cx=\"250\" cy=\"60\" rx=\"52\" ry=\"30\" style=\"fill:var(--bio-panel)\" stroke=\"var(--bio-line)\" stroke-width=\"2\"/>" +
                  "<text id=\"atpCycBT\" x=\"250\" y=\"66\" style=\"fill:var(--bio-text)\">ADP+Pi</text>" +
                  "<path d=\"M142,44 Q170,10 198,44\" style=\"fill:none;stroke:var(--bio-target)\" stroke-width=\"2.5\" marker-end=\"url(#ah1)\"/>" +
                  "<path d=\"M198,76 Q170,110 142,76\" style=\"fill:none;stroke:var(--bio-organelle)\" stroke-width=\"2.5\"/>" +
                  "<defs><marker id=\"ah1\" markerWidth=\"8\" markerHeight=\"8\" refX=\"6\" refY=\"4\" orient=\"auto\"><path d=\"M0,0 L8,4 L0,8 z\" style=\"fill:var(--bio-target)\"/></marker></defs>" +
                  "<text x=\"170\" y=\"22\" font-size=\"12.48\" style=\"fill:var(--bio-target)\">放能＋供能</text>" +
                  "<text x=\"170\" y=\"108\" font-size=\"12.48\" style=\"fill:var(--bio-organelle)\">吸能＋合成</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"118\" font-size=\"12.48\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" +
                  "<div id=\"atpCycMsg\" style=\"min-height:24px;font-size:14px\">点 ① 或 ②，看能量往哪流。</div>" +
                  "</div>" },
                { type: "text", html: "读循环：ATP 水解→ADP＋Pi＋能量（能量释放出来，供肌肉收缩、主动运输等用）；ADP＋Pi＋能量→ATP（呼吸作用等把能量\"充\"回去）。" },
                { type: "note", text: "动手：点 ① 再点 ②，用自己的话讲一遍\"能量从哪来、到哪去\"。" }
              ],
              point: "ATP⇌ADP＋Pi＋能量；花掉与充电循环。"
            },
            /* ============ p3：能量货币边界（T4）+ 吸能/放能反应 ============ */
            {
              id: "b13.1.3-p3",
              kind: "explain",
              title: "\"货币\"不是\"金库\"",
              blocks: [
                { type: "lead", text: "ATP 是\"能量货币\"，却不是\"金库\"——" },
                { type: "text", html: "边界句（逐字）——含量少、转化快，货币流通不是金库囤积。" },
                { type: "text", html: "讲透：ATP 很少，但转化非常快——靠快速周转供能，不靠囤积。" },
                { type: "trap", text: "⚠️ 别搞混：\"ATP储存大量能量备用\"错——ATP含量少、转化快！" },
                { type: "text", html: "先认词——吸能反应：需要吸收能量的化学反应（如蛋白质合成），能量由 ATP 水解提供。先认词——放能反应：释放能量的化学反应（如葡萄糖氧化分解），释放的能量用于合成 ATP。串起来：放能反应\"充电\"→ATP→\"花掉\"→吸能反应，ATP 是能量流转的\"中转站\"。" },
                { type: "note", text: "三问自查——边界句背得出吗？吸能/放能反应各举一例？" }
              ],
              point: "货币≠金库：含量少、转化快；吸能/放能反应。"
            }
          ]
        },
        {
          id: "b13.1.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b13.1.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b13.1.1：活化能（加热给能量 vs 酶降门槛）；酶只降低活化能、不提供能量；酶是活细胞产生的催化作用有机物（多为蛋白质、少数 RNA）；过氧化氢三组对照（B3 三原则落点）。b13.1.2：高效性/专一性/作用条件温和；B10 酶条件实验室（温度/pH 双滑块、示意曲线、烫坏不可恢复/冻住可恢复、锁钥配对＋\"结合时会微调（诱导契合）\"）；曲线读图直观版；代数 6.1 预告（学完 6.1 后回填认旧友）。b13.1.3：腺苷三磷酸 A—P～P～P；ATP⇌ADP＋Pi＋能量循环；边界句\"含量少、转化快，货币流通不是金库囤积\"；吸能反应/放能反应。" },
                { type: "choice", stem: "关于酶的作用，正确的是？",
                  options: ["酶为化学反应提供能量", "酶只降低活化能，不提供能量", "酶能提高反应物的总能量", "酶在反应前后质量会减少"], answer: 1,
                  tip: "酶只降低活化能，不提供能量！（b13.1.1 第 1 页）。" },
                { type: "choice", stem: "下列关于酶特性的说法，错误的是？",
                  options: ["酶的催化效率很高", "一种酶只能催化一种或一类反应", "酶在温和条件下就能起作用", "高温和低温对酶的影响都是可恢复的"], answer: 3,
                  tip: "高温破坏空间结构、不可恢复；低温才是可恢复的抑制（b13.1.2 第 2 页）。" },
                { type: "choice", stem: "把温度从 37℃ 升到 70℃ 再调回 37℃，酶活性？",
                  options: ["恢复到原来水平", "比原来更高", "不能恢复（烫坏了）", "先恢复再下降"], answer: 2,
                  tip: "\"烫坏\"真锁死：调回 37℃ 也不恢复（b13.1.2 第 1 页 B10）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b13.1.4-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "关于 ATP 的说法，正确的是？",
                  options: ["ATP 在细胞中大量储存，随用随取", "ATP 含量少、转化快，靠快速周转供能", "ATP 是细胞中唯一的能源物质", "ATP 只在线粒体中合成"], answer: 1,
                  tip: "\"货币\"流通不是\"金库\"囤积：含量少、转化快（b13.1.3 第 3 页）。" },
                { type: "choice", stem: "唾液淀粉酶只能初步消化淀粉，不能消化蛋白质，这体现了酶的？",
                  options: ["高效性", "专一性", "作用条件温和", "可重复使用"], answer: 1,
                  tip: "一把锁只开一把钥匙——专一性（b13.1.2 第 1 页；认旧友 b05.1.2）。" },
                { type: "choice", stem: "蛋白质合成需要消耗 ATP，这属于？",
                  options: ["放能反应", "吸能反应", "既不吸能也不放能", "只在高温下进行"], answer: 1,
                  tip: "合成蛋白质需要吸收能量→吸能反应，能量由 ATP 水解提供（b13.1.3 第 3 页）。" },
                { type: "choice", stem: "新鲜肝脏研磨液使过氧化氢快速分解，起作用的是研磨液中的？",
                  options: ["水", "过氧化氢酶", "二氧化锰", "肝糖原"], answer: 1,
                  tip: "肝脏研磨液含过氧化氢酶——活细胞产生的催化作用物质（b13.1.1 第 2、3 页）。" }
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
 * b13 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b03/b21 先例）。命名空间 window.BIO_B13。
 * ATP/ADP 循环两步演示：cyc(1)=花掉，cyc(2)=充电。
 * ============================================================ */
window.BIO_B13 = {
  cyc: function (n) {
    var a = document.getElementById("atpCycA"), b = document.getElementById("atpCycB"),
        bt = document.getElementById("atpCycBT"), m = document.getElementById("atpCycMsg");
    if (!a || !m) return;
    if (n === 1) {
      a.style.opacity = "0.35"; b.style.opacity = "1"; b.style.fill = "var(--bio-highlight)";
      if (bt) bt.style.fill = "var(--bio-on-hl)";
      m.innerHTML = "① 花掉：ATP → ADP＋Pi＋<b>能量</b>——能量释放，供肌肉收缩、主动运输等用。";
    } else {
      a.style.opacity = "1"; a.style.fill = "var(--bio-highlight)"; b.style.opacity = "0.5"; b.style.fill = "var(--bio-panel)";
      if (bt) bt.style.fill = "var(--bio-text)";
      m.innerHTML = "② 充电：ADP＋Pi＋<b>能量</b> → ATP——呼吸作用等把能量\"充\"回去。";
    }
  }
};
