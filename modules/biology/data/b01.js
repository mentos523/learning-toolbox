/* ============================================================
 * 学习工具箱 · 生物 · 第一章数据（生物 P18 生产队 2026-10-19）
 *
 * 课：b01.1.1 显微镜的使用（3 页）/ b01.1.2 观察动植物细胞（4 页）/
 *     b01.1.3 细胞的基本结构（2 页，§B1 cell-builder 首落点，
 *     引擎级 Eng.CellBuilder，走 BIO_ENGINE.render("cell-builder") 分发，
 *     不再写旧式内联实现）/ b01.1.4 本章小结与习题（2 页）。
 *     共 11 页。前置：b00 小结（b00.1.4 已上线）。
 * 交互：§B1 cell-builder（b01.1.3-p2 首落点，params 严格按
 * docs/biology-interactions.md §B1 schema）；其余页内小交互
 * （步骤器）为纯内联 HTML + window.BIO_B01 助手函数，
 * 不新增引擎组件。§B2 microscope-sim 渲染器尚未交付，
 * 本批 b01.1.1 显微镜操作流程用讲解页+SVG 模式图+闯关 quiz 落实，
 * B2 渲染器缺口记 LEG-BIO-002（open）。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 示意声明：「示意，非真实速度/比例。」（仅示意页）
 * - B1 diagramNote 冻结：「模式图：非等比、非实物」（B-F1）
 * - B1 错放回弹：「再想想它该待在哪」
 * - B1 模式切换二次确认：「切换模式会清空已放卡片，继续吗？」
 * - B1 plantOnly 置灰：「动物细胞没有它」
 * - 高倍流程：「先低倍找到→移到中央→再转高倍」
 * - 污点三步排查：转动目镜→移动装片→转动物镜
 * - 盖盖玻片：「一侧先接触水滴、缓缓放下」
 * - 口腔上皮：「生理盐水」（清水使细胞吸水涨破）
 * - 倒像本质：「倒像=旋转 180°」；口诀「偏哪移哪」限操作页
 *
 * 红线落实：
 * - 「动物细胞也有细胞壁」错→动物无细胞壁（b01.1.3-p1 trap 专治）
 * - 「细胞膜看不见=没有」错→光镜下紧贴细胞壁，存在但难分辨
 *   （b01.1.3-p1 trap 专治）
 * - 「盖盖玻片直接扣上」错→一侧先接触水滴、缓缓放下（b01.1.2-p1 trap）
 * - 「口腔上皮滴清水」错→生理盐水，清水使细胞吸水涨破（b01.1.2-p3 trap）
 * - 「高倍镜下从头找物像」错→先低倍找到、移到中央，再转高倍（b01.1.1-p2 trap）
 * - 「倍数越大越好」错→倍数越大视野越小越暗（b01.1.1-p1 trap）
 * - 结构口径：全批「结构决定…」零出现
 *
 * 门禁⑧：新术语首现即定义——目镜/物镜/放大倍数（b01.1.1-p1）/
 * 倒像/对光（b01.1.1-p2）/临时装片（b01.1.2-p1）/
 * 生理盐水（b01.1.2-p3）/细胞壁/细胞膜/细胞质/细胞核/
 * 液泡/叶绿体（b01.1.3-p1）。
 * 门禁⑨：数学深链只挂已上线——代数 ch00（b01.1.1-p1/p3，
 * 放大倍数=目镜×物镜）；生物内部互链用 #课号/页码手写锚点。
 * 门禁⑩：本批新登记预告 0 条（b01 无预告项；b01.1.2 审计清单
 * 第 9 条为误区纠偏，非预告）。
 * 门禁⑪：b01.1.4（2 页）为任务书课页分工的设计意图（小结与习题），
 * 台账留痕，非缺页；quiz 页题目数>0（b01.1.4-p1 review+3 choice，
 * p2 4 choice，含生活题 1 道＋实验设计题 1 道；b01.1.1-p3 review+3 choice）。
 * 门禁⑫：数学课号统一「代数 ch00」式（本批无「ch06」式旧写法）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
/* ---------- b01 页内小交互助手（纯内联，不新增引擎组件） ---------- */
window.BIO_B01 = {
  /* 步骤器：id 前缀，idx 从 0 起；steps: "bioB01Steps-<id>-<i>" */
  go: function (id, idx) {
    var i = 0, s;
    while ((s = document.getElementById("bioB01Steps-" + id + "-" + i))) {
      s.style.display = i === idx ? "" : "none";
      i++;
    }
    var msg = document.getElementById("bioB01Msg-" + id);
    if (msg) msg.textContent = "第 " + (idx + 1) + " 步 / 共 " + i + " 步";
    return idx;
  }
};
/* ---------- §B1 cell-builder 参数（b01.1.3-p2 首落点；引擎级渲染） ----------
 * 形状严格按 docs/biology-interactions.md §B1 schema：
 * mode/organelles/zones/showFuncPop/diagramNote/resetOnModeSwitch/doneText。
 * 渲染走 BIO_ENGINE.render("cell-builder") 分发（P18 装配），
 * 不写任何内联渲染实现。 */
var BIO_B01_CB_PARAMS = {
  mode: "animal",
  organelles: [
    { id: "wall", label: "细胞壁", func: "支持和保护——硬外衣，只有植物细胞才有", plantOnly: true },
    { id: "membrane", label: "细胞膜", func: "控制进出——有用的进来、废物出去；光镜下紧贴细胞壁，难分辨" },
    { id: "cytoplasm", label: "细胞质", func: "生命活动的场所——大多数生命活动在这里进行" },
    { id: "nucleus", label: "细胞核", func: "遗传信息库——指挥细胞的各项生命活动" },
    { id: "vacuole", label: "液泡", func: "仓库——储存水分和营养；植物的大液泡特别明显", plantOnly: true },
    { id: "chloro", label: "叶绿体", func: "光合作用的场所——把光能变成化学能", plantOnly: true }
  ],
  zones: [
    { zoneId: "z-wall", label: "最外圈", accepts: ["wall"], hint: "硬硬的外衣在哪？" },
    { zoneId: "z-membrane", label: "紧贴外圈", accepts: ["membrane"], hint: "紧贴细胞壁、看不见的那层膜？" },
    { zoneId: "z-cyto", label: "中间大片", accepts: ["cytoplasm"], hint: "细胞里流动的胶状部分？" },
    { zoneId: "z-nucleus", label: "中央", accepts: ["nucleus"], hint: "指挥中心在哪？" },
    { zoneId: "z-vacuole", label: "大泡", accepts: ["vacuole"], hint: "储存水分的大仓库？" },
    { zoneId: "z-chloro", label: "绿色小粒", accepts: ["chloro"], hint: "进行光合作用的绿色结构？" }
  ],
  showFuncPop: true,
  diagramNote: "模式图：非等比、非实物",
  resetOnModeSwitch: true,
  doneText: "拼搭完成——植物细胞多了三样！"
};
window.BIO_CH["b01"] = {
  id: "b01",
  units: [
    {
      id: "b01.1",
      title: "显微镜与细胞",
      lessons: [
        {
          id: "b01.1.1",
          title: "显微镜的使用",
          prereq: "b00 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：认识显微镜（讲解页） ============ */
            {
              id: "b01.1.1-p1",
              kind: "explain",
              title: "认识显微镜",
              blocks: [
                { type: "lead", text: "显微镜是观察细胞的“眼睛”：先认清它的结构，再动手操作。" },
                { type: "text", html: "先认词——目镜：靠近眼睛的镜头；物镜：靠近装片的镜头（越长倍数越高）；载物台：放装片的平台；反光镜：把光反射进镜筒；粗准焦螺旋：大范围升降镜筒；细准焦螺旋：小范围精调清晰度。" },
                { type: "text", html: "放大倍数=目镜倍数×物镜倍数：目镜 10×、物镜 40×，就是 400×。" },
                { type: "mathlink", text: "数学呼应：放大倍数=目镜×物镜——代数 ch00 的乘法/比例（小学奠基）。" },
                { type: "text", html: "<div style='border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center'>" +
                  "<svg viewBox='0 0 200 190' style='max-width:220px;width:100%;height:auto' role='img' aria-label='显微镜结构模式图'>" +
                  "<rect x='88' y='30' width='24' height='70' rx='4' fill='none' stroke='var(--bio-membrane)' stroke-width='3'/>" +
                  "<rect x='82' y='14' width='36' height='18' rx='4' fill='none' stroke='var(--bio-membrane)' stroke-width='3'/>" +
                  "<text x='130' y='26' font-size='11' fill='var(--bio-text)'>目镜</text>" +
                  "<rect x='88' y='100' width='24' height='26' rx='4' fill='none' stroke='var(--bio-membrane)' stroke-width='3'/>" +
                  "<text x='130' y='118' font-size='11' fill='var(--bio-text)'>物镜（越长倍数越高）</text>" +
                  "<rect x='60' y='126' width='80' height='10' rx='3' fill='none' stroke='var(--bio-membrane)' stroke-width='3'/>" +
                  "<text x='146' y='136' font-size='11' fill='var(--bio-text)'>载物台</text>" +
                  "<path d='M70 136 L55 175 M130 136 L145 175' stroke='var(--bio-membrane)' stroke-width='3'/>" +
                  "<ellipse cx='55' cy='178' rx='12' ry='7' fill='none' stroke='var(--bio-membrane)' stroke-width='3'/>" +
                  "<text x='76' y='182' font-size='11' fill='var(--bio-text)'>反光镜</text>" +
                  "<circle cx='128' cy='80' r='7' fill='none' stroke='var(--bio-organelle)' stroke-width='3'/>" +
                  "<text x='140' y='84' font-size='11' fill='var(--bio-text)'>粗/细准焦螺旋</text>" +
                  "</svg>" +
                  "<div style='font-size:12px;color:var(--bio-ink-soft);margin-top:4px'>模式图：非等比、非实物</div></div>" },
                { type: "trap", text: "⚠️ “倍数越大越好”错——倍数越大，视野越小、越暗：先低倍找到，再转高倍看。" },
                { type: "note", text: "记：目镜短、物镜长——物镜越长，倍数越高。" }
              ],
              point: "认结构、算倍数：放大倍数=目镜×物镜；物镜越长倍数越高。"
            },
            /* ============ p2：操作四步与倒像（讲解页） ============ */
            {
              id: "b01.1.1-p2",
              kind: "explain",
              title: "操作四步与倒像",
              blocks: [
                { type: "lead", text: "四步操作：取放→对光→安放→观察；成像的秘密在“倒像”。" },
                { type: "text", html: "<div style='border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)'>" +
                  "<div style='display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px'>" +
                  "<button type='button' class='tb-btn-secondary' style='min-height:44px' onclick=\"BIO_B01.go('scope',0)\">1 取放</button>" +
                  "<button type='button' class='tb-btn-secondary' style='min-height:44px' onclick=\"BIO_B01.go('scope',1)\">2 对光</button>" +
                  "<button type='button' class='tb-btn-secondary' style='min-height:44px' onclick=\"BIO_B01.go('scope',2)\">3 安放</button>" +
                  "<button type='button' class='tb-btn-secondary' style='min-height:44px' onclick=\"BIO_B01.go('scope',3)\">4 观察</button>" +
                  "</div>" +
                  "<div id='bioB01Steps-scope-0'>① 取放：右手握镜臂、左手托镜座，轻拿轻放。</div>" +
                  "<div id='bioB01Steps-scope-1' style='display:none'>② 对光：低倍物镜对准通光孔，调反光镜至视野明亮。</div>" +
                  "<div id='bioB01Steps-scope-2' style='display:none'>③ 安放：装片放载物台，标本正对通光孔中心。</div>" +
                  "<div id='bioB01Steps-scope-3' style='display:none'>④ 观察：先低倍找到→移到中央→再转高倍，调细准焦螺旋。</div>" +
                  "<div id='bioB01Msg-scope' style='font-size:12px;color:var(--bio-ink-soft);margin-top:6px'>第 1 步 / 共 4 步</div></div>" },
                { type: "text", html: "先认词——对光：调反光镜让视野明亮；倒像：物像上下、左右都颠倒。" },
                { type: "text", html: "<div style='border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center'>" +
                  "<div style='display:flex;justify-content:center;gap:24px;align-items:center;flex-wrap:wrap'>" +
                  "<div><div style='font-size:44px;color:var(--bio-organelle)'>上</div><div style='font-size:12px'>玻片上的字</div></div>" +
                  "<div style='font-size:22px'>→</div>" +
                  "<div><div style='font-size:44px;color:var(--bio-organelle);transform:rotate(180deg)'>上</div><div style='font-size:12px'>视野中的像</div></div>" +
                  "</div>" +
                  "<div style='font-size:13px;margin-top:6px'>严格本质：倒像=旋转 180°；“偏哪移哪”：物像偏哪，玻片往哪移。</div>" +
                  "<div style='font-size:12px;color:var(--bio-ink-soft);margin-top:4px'>模式图：非等比、非实物</div></div>" },
                { type: "trap", text: "⚠️ “高倍镜下从头找物像”错——高倍视野小，必须先低倍找到、移到中央，再转高倍。" }
              ],
              point: "对光看亮；倒像偏哪移哪；高倍：先低倍找到→移到中央→再转高倍。"
            },
            /* ============ p3：闯关 quiz ============ */
            {
              id: "b01.1.1-p3",
              kind: "quiz",
              title: "闯关：偏哪移哪",
              questions: [
                { type: "review", html: "本课小结——结构：目镜/物镜/载物台/反光镜/粗细准焦螺旋；倍数=目镜×物镜；四步：取放→对光→安放→观察；倒像=旋转 180°，偏哪移哪；高倍：先低倍找到→移到中央→再转高倍。" },
                { type: "choice", stem: "视野中物像偏右下方，要把它移到中央，玻片往哪移？",
                  options: ["左上方", "右下方", "左下方", "右上方"], answer: 1,
                  tip: "偏哪移哪：物像偏右下，玻片就往右下移——因为是倒像（旋转 180°，b01.1.1 第 2 页）。" },
                { type: "choice", stem: "目镜 10×、物镜 40×，这台显微镜的放大倍数是？",
                  options: ["50×", "400×", "40×", "10×"], answer: 1,
                  tip: "放大倍数=目镜×物镜=10×40=400×（代数 ch00 乘法，b01.1.1 第 1 页）。" },
                { type: "choice", stem: "视野里有个污点，转动目镜时污点跟着动，污点最可能在哪？",
                  options: ["目镜上", "物镜上", "装片上", "反光镜上"], answer: 0,
                  tip: "三步排查：转动目镜，污点动→在目镜；不动再移动装片、转动物镜逐一排查。" }
              ],
              point: "闯关过：偏哪移哪、倍数相乘、污点三步排查。"
            }
          ]
        },
        {
          id: "b01.1.2",
          title: "观察动植物细胞",
          prereq: "显微镜的使用",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：制作临时装片（讲解页） ============ */
            {
              id: "b01.1.2-p1",
              kind: "explain",
              title: "制作临时装片",
              blocks: [
                { type: "lead", text: "看细胞先“做片子”：临时装片制作就六个字——擦、滴、取、放、盖、染。" },
                { type: "text", html: "先认词——临时装片：临时制作、用于显微观察的玻片标本。六步：擦（擦净载玻片、盖玻片）→滴（中央滴一滴清水）→取（撕取洋葱鳞片叶内表皮）→放（展平放入水滴）→盖（盖盖玻片）→染（碘液染色）。" },
                { type: "text", html: "<div style='border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)'>" +
                  "<div style='font-size:14px;font-weight:bold;margin-bottom:6px'>盖盖玻片：防气泡的关键一步</div>" +
                  "<div style='display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px'>" +
                  "<button type='button' class='tb-btn-secondary' style='min-height:44px' onclick=\"BIO_B01.go('cover',0)\">第 1 步</button>" +
                  "<button type='button' class='tb-btn-secondary' style='min-height:44px' onclick=\"BIO_B01.go('cover',1)\">第 2 步</button>" +
                  "</div>" +
                  "<div id='bioB01Steps-cover-0'>① 用镊子夹起盖玻片，一侧先接触水滴。</div>" +
                  "<div id='bioB01Steps-cover-1' style='display:none'>② 缓缓放下另一侧，让水自然铺满——气泡就被“赶”出去了。</div>" +
                  "<div id='bioB01Msg-cover' style='font-size:12px;color:var(--bio-ink-soft);margin-top:6px'>第 1 步 / 共 2 步</div>" +
                  "<div style='font-size:12px;color:var(--bio-ink-soft);margin-top:4px'>示意，非真实速度/比例。</div></div>" },
                { type: "trap", text: "⚠️ “盖盖玻片直接扣上”错——一侧先接触水滴、缓缓放下，否则气泡满视野。" },
                { type: "note", text: "碘液染色：细胞核染得最深——先找深色圆点，再看整齐的“小格子”。" }
              ],
              point: "擦滴取放盖染；盖片缓缓放，气泡不来捣乱。"
            },
            /* ============ p2：观察洋葱表皮细胞（讲解页） ============ */
            {
              id: "b01.1.2-p2",
              kind: "explain",
              title: "观察洋葱表皮细胞",
              blocks: [
                { type: "lead", text: "低倍镜下找洋葱表皮细胞：先找深色圆点（细胞核），再看整齐的“小格子”。" },
                { type: "text", html: "<div style='border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel);text-align:center'>" +
                  "<svg viewBox='0 0 220 130' style='max-width:260px;width:100%;height:auto' role='img' aria-label='洋葱表皮细胞模式图'>" +
                  "<g fill='none' stroke='var(--bio-membrane)' stroke-width='2'>" +
                  "<rect x='10' y='10' width='60' height='40' rx='6'/><rect x='75' y='10' width='60' height='40' rx='6'/><rect x='140' y='10' width='60' height='40' rx='6'/>" +
                  "<rect x='10' y='55' width='60' height='40' rx='6'/><rect x='75' y='55' width='60' height='40' rx='6'/><rect x='140' y='55' width='60' height='40' rx='6'/>" +
                  "</g>" +
                  "<g fill='var(--bio-gene)' opacity='0.65'>" +
                  "<ellipse cx='40' cy='30' rx='9' ry='7'/><ellipse cx='105' cy='30' rx='9' ry='7'/><ellipse cx='170' cy='30' rx='9' ry='7'/>" +
                  "<ellipse cx='40' cy='75' rx='9' ry='7'/><ellipse cx='105' cy='75' rx='9' ry='7'/><ellipse cx='170' cy='75' rx='9' ry='7'/>" +
                  "</g>" +
                  "<text x='105' y='122' font-size='11' fill='var(--bio-text)' text-anchor='middle'>深色圆点=细胞核</text>" +
                  "</svg>" +
                  "<div style='font-size:12px;color:var(--bio-ink-soft);margin-top:4px'>模式图：非等比、非实物</div></div>" },
                { type: "text", html: "观察记录单三规：铅笔绘图（不用圆珠笔）；明暗用点的疏密表示（点越密越暗，不涂黑）；标注结构名称和放大倍数。" },
                { type: "note", text: "找细胞三步：低倍视野先找深色圆点→移到中央→转高倍看“小格子”细节。" }
              ],
              point: "洋葱表皮：长方形小格子排整齐，深色圆点是细胞核。"
            },
            /* ============ p3：观察口腔上皮细胞（讲解页） ============ */
            {
              id: "b01.1.2-p3",
              kind: "explain",
              title: "观察口腔上皮细胞",
              blocks: [
                { type: "note", text: "⚠ 安全：一次性消毒牙签，轻刮口腔内侧壁，用后按规范处理。" },
                { type: "lead", text: "刮取口腔上皮细胞：这一步的“水”，和洋葱的不一样。" },
                { type: "text", html: "先认词——生理盐水：浓度 0.9% 的盐水，和人体细胞内部环境接近，能保持细胞形态。" },
                { type: "text", html: "步骤：滴一滴生理盐水→消毒牙签轻刮口腔内侧壁→在盐水滴中涂抹→盖盖玻片→碘液染色。" },
                { type: "trap", text: "⚠️ “口腔上皮也滴清水”错——清水使细胞吸水涨破，什么都看不清！必须用生理盐水。" },
                { type: "text", html: "镜下样子：扁平、不规则多边形，比洋葱细胞小，轮廓较淡——但深色圆点（细胞核）依然好找。" }
              ],
              point: "口腔上皮：生理盐水保形态；安全第一，牙签一次性。"
            },
            /* ============ p4：两种细胞对照看（讲解页） ============ */
            {
              id: "b01.1.2-p4",
              kind: "explain",
              title: "两种细胞对照看",
              blocks: [
                { type: "lead", text: "把两种细胞的记录单摆在一起：一样吗？" },
                { type: "text", html: "不同点：洋葱表皮细胞长方形、排列整齐、轮廓清晰（最外面有一圈细胞壁）；口腔上皮细胞不规则、扁平、轮廓较淡。" },
                { type: "text", html: "相同点：都有深色圆点（细胞核）、都有细胞膜、都有细胞质——细胞的基本样子是相通的。" },
                { type: "oldfriend", text: "下一课 b01.1.3：六个结构一次认全，动植物细胞异同拼出来（纯文本）。" }
              ],
              point: "对照看：植物细胞方正有壁，动物细胞扁平无壁；都有核、膜、质。"
            }
          ]
        },
        {
          id: "b01.1.3",
          title: "细胞的基本结构",
          prereq: "观察动植物细胞",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：六个结构一次认全（讲解页） ============ */
            {
              id: "b01.1.3-p1",
              kind: "explain",
              title: "六个结构一次认全",
              blocks: [
                { type: "lead", text: "细胞虽小，五脏俱全：六个结构，一个一个认。" },
                { type: "text", html: "先认词——细胞壁：植物细胞最外层，支持和保护；细胞膜：紧贴细胞壁，控制物质进出；细胞质：流动的胶状物质，生命活动的场所；细胞核：遗传信息库，指挥生命活动；液泡：储存水分和营养，植物的大液泡明显；叶绿体：光合作用的场所，绿色。" },
                { type: "oldfriend", text: "认旧友：b01.1.2——洋葱表皮最外面的一圈就是细胞壁；口腔上皮细胞外没有这一圈。" },
                { type: "trap", text: "⚠️ “动物细胞也有细胞壁”错——动物细胞没有细胞壁！" },
                { type: "trap", text: "⚠️ “细胞膜看不见=没有”错——光镜下它紧贴细胞壁，存在但难分辨。" },
                { type: "note", text: "结构—功能对问：每个结构都要能回答“长什么样”和“适合干什么”（下一页拼搭时考你）。" }
              ],
              point: "六结构：壁膜质核泡绿；植物全有，动物只有膜质核。"
            },
            /* ============ p2：拼搭细胞（§B1 cell-builder 引擎级） ============ */
            {
              id: "b01.1.3-p2",
              kind: "interact",
              title: "拼搭细胞",
              exploreTip: "拖结构卡到对的位置；点已放的结构看“结构—功能”一句话；切到植物模式试试。",
              interaction: { type: "cell-builder", params: BIO_B01_CB_PARAMS },
              widgets: [
                { type: "cell-builder", params: BIO_B01_CB_PARAMS }
              ],
              blocks: [
                { type: "note", text: "动手→现象→结论：切到植物模式，看哪三张卡“活”过来了——植物细胞多了三样，动物细胞没有，这就是异同。" }
              ],
              point: "拼一遍记住：植物细胞多了三样（细胞壁/叶绿体/大液泡），动物细胞没有——这就是异同。"
            }
          ]
        },
        {
          id: "b01.1.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40 分钟",
          pages: [
            /* ============ p1：小结 + 习题（练习页） ============ */
            {
              id: "b01.1.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——显微镜：结构认清、倍数=目镜×物镜、四步操作（b01.1.1）；装片：擦滴取放盖染，盖片缓缓放、口腔上皮用生理盐水（b01.1.2）；细胞六结构：壁膜质核泡绿，植物全有、动物只有膜质核（b01.1.3）。" },
                { type: "choice", stem: "显微镜下看到的物像与实际标本的关系是？",
                  options: ["完全一样", "上下左右都颠倒（倒像）", "只是左右颠倒", "只是放大了"], answer: 1,
                  tip: "倒像=旋转 180°：上下、左右都颠倒（b01.1.1 第 2 页）。" },
                { type: "choice", stem: "下列哪组结构是植物细胞特有的？",
                  options: ["细胞壁、叶绿体、大液泡", "细胞膜、细胞质、细胞核", "细胞核、液泡、线粒体", "细胞壁、细胞膜、细胞核"], answer: 0,
                  tip: "植物多了三样：细胞壁/叶绿体/大液泡；动物细胞没有细胞壁（b01.1.3 第 1 页）。" },
                { type: "choice", stem: "观察人口腔上皮细胞时，载玻片上应该滴？",
                  options: ["清水", "生理盐水", "碘液", "酒精"], answer: 1,
                  tip: "生理盐水保持细胞形态；清水使细胞吸水涨破（b01.1.2 第 3 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（练习页） ============ */
            {
              id: "b01.1.4-p2",
              kind: "quiz",
              title: "习题（二）",
              questions: [
                { type: "choice", stem: "玻片上写着字母“p”，在显微镜下看到的是？",
                  options: ["p", "d", "q", "b"], answer: 1,
                  tip: "倒像=旋转 180°：“p”转 180° 就是“d”（b01.1.1 第 2 页）。" },
                { type: "choice", stem: "制作洋葱表皮临时装片，正确的顺序是？",
                  options: ["擦→滴→取→放→盖→染", "滴→擦→取→盖→放→染", "擦→取→滴→盖→放→染", "取→擦→滴→放→染→盖"], answer: 0,
                  tip: "擦滴取放盖染：先擦净、滴水，再取材展平，盖片缓缓放，最后染色（b01.1.2 第 1 页）。" },
                { type: "choice", stem: "视野中有污点，已排除目镜和物镜，接下来应该？",
                  options: ["擦反光镜", "移动装片，看污点动不动", "换高倍物镜", "重新对光"], answer: 1,
                  tip: "三步排查：转动目镜→移动装片→转动物镜；移动装片污点动→在装片上。" },
                { type: "choice", stem: "小明说“细胞膜在光镜下看不见，所以植物细胞没有细胞膜”，错在哪？",
                  options: ["植物细胞确实没有细胞膜", "细胞膜紧贴细胞壁，存在但难分辨", "细胞膜只在动物细胞有", "光镜下只能看到细胞壁"], answer: 1,
                  tip: "看不见≠没有：细胞膜紧贴细胞壁，存在但难分辨（b01.1.3 第 1 页）。" }
              ],
              point: "全章完。下章 b02 生物体的结构层次（纯文本预告）。"
            }
          ]
        }
      ]
    }
  ]
};
