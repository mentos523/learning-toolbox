/* ============================================================
 * 学习工具箱 · 生物 · 第八章数据（生物 P11 生产队 2026-10-19）
 *
 * 课：b08.1.1 传染病（3 页）/ b08.1.2 免疫（2 页）/
 *     b08.1.3 疫苗、计划免疫与安全用药急救（3 页）/
 *     b08.1.4 本章小结与习题（2 页）。共 10 页。
 * 交互：三环节—三措施配对闯关 / 三道防线闯关（病原体入侵路径），
 * 均为纯 HTML 内联 handler（window.BIO_B08，b06 的
 * window.BIO_B06 双循环闯关先例），不新增引擎组件。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 因病而异（b08.1.1-p3 专治；「得过一次就终身免疫」= FAIL）
 * - 抗体与抗原结合，结合后由吞噬细胞清除（b08.1.2-p2；
 *   BIO-R07：严格页用"结合"不许用"杀死"）
 * - 降低重症风险（b08.1.3-p1 专治；「打了就不得病」= FAIL）
 * - "演习"不是真打仗——减毒/灭活抗原，不致病；→抗体+记忆细胞
 *   （b08.1.3-p1；T12 边界句逐字）
 * - 直引号；type:"text" 的块用 html 键（P4 教训）
 *
 * 门禁⑧：新术语首现即定义——病原体/传染源（b08.1.1-p1）/
 * 抗体/过敏反应（b08.1.2-p2）。
 * 门禁⑨：深链 1 处（b08.1.1-p3→b07.1.3；已生产）；
 * b09/b10/b12/b22 正文零引用。
 * 门禁⑩：本批无新登记预告。
 * 门禁⑪：quiz 页题目数 > 0（b08.1.4 两页：3 + 4）。
 *
 * 表述口径（curriculum b08 全章）：疫苗、疾病只讲机制与官方指南
 * 口径，不制造焦虑；急救只讲官方指南口径（BIO-R53；
 * 审计清单第 8、12 条）。任何诊疗建议、焦虑渲染 = FAIL。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
window.BIO_CH["b08"] = {
  id: "b08",
  units: [
    {
      id: "b08.1",
      title: "健康地生活",
      lessons: [
        {
          id: "b08.1.1",
          title: "传染病",
          prereq: "b07 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：病原体 + 三环节 ============ */
            {
              id: "b08.1.1-p1",
              kind: "explain",
              title: "传染病与三个环节",
              blocks: [
                { type: "lead", text: "感冒会\"传染\"，近视不会——分界线在哪？" },
                { type: "text", html: "先认词——病原体：引起传染病的细菌、病毒、寄生虫等。先认词——传染源：能够散播病原体的人或动物。" },
                { type: "text", html: "传染病：由病原体引起，能在人与人之间或人与动物之间传播的疾病。" },
                { type: "text", html: "流行三环节：传染源（散播病原体的人或动物）→传播途径（病原体离开传染源、到达健康人的途径：空气/水/接触等）→易感人群（对某种传染病缺乏免疫力的人）。缺一不可。" },
                { type: "note", text: "三问自查——病原体是什么？三环节各指什么？缺了哪个环节，传染病就流行不起来？（答案在本页）" }
              ],
              point: "传染病由病原体引起；流行三环节：传染源/传播途径/易感人群。"
            },
            /* ============ p2：三措施 + 配对闯关 ============ */
            {
              id: "b08.1.1-p2",
              kind: "explain",
              title: "配对闯关：三环节↔三措施",
              blocks: [
                { type: "lead", text: "三个环节，三个对策——配对闯关。" },
                { type: "text", html: "预防三措施：控制传染源（如隔离病人）→切断传播途径（如消毒、戴口罩）→保护易感人群（如接种疫苗、锻炼身体）。" },
                { type: "text", html: "<div style=\"display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin:8px 0\">" +
                  "<div style=\"display:flex;flex-direction:column;gap:8px\">" +
                  "<div style=\"font-size:0.85rem;color:var(--bio-ink-soft)\">环节（先点）</div>" +
                  "<button type=\"button\" id=\"bioB08P-src\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B08.pair('link','src',this)\">传染源</button>" +
                  "<button type=\"button\" id=\"bioB08P-cut\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B08.pair('link','cut',this)\">传播途径</button>" +
                  "<button type=\"button\" id=\"bioB08P-sus\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B08.pair('link','sus',this)\">易感人群</button>" +
                  "</div>" +
                  "<div style=\"display:flex;flex-direction:column;gap:8px\">" +
                  "<div style=\"font-size:0.85rem;color:var(--bio-ink-soft)\">措施（后点）</div>" +
                  "<button type=\"button\" id=\"bioB08P-m1\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B08.pair('ms','sus',this)\">保护易感人群</button>" +
                  "<button type=\"button\" id=\"bioB08P-m2\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B08.pair('ms','src',this)\">控制传染源</button>" +
                  "<button type=\"button\" id=\"bioB08P-m3\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B08.pair('ms','cut',this)\">切断传播途径</button>" +
                  "</div>" +
                  "</div>" +
                  "<div style=\"text-align:center;margin:4px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B08.pairReset()\">重新闯关</button>" +
                  "<div id=\"bioB08PairMsg\" style=\"min-height:4.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">先点左侧一个环节，再点右侧一个措施配对。</div>" +
                  "</div>" },
                { type: "note", text: "动手：三对全配对成功后，遮住上面复述\"环节↔措施\"。" }
              ],
              point: "三环节↔三措施一一配对：控制传染源/切断传播途径/保护易感人群。"
            },
            /* ============ p3：误区专治「终身免疫」 ============ */
            {
              id: "b08.1.1-p3",
              kind: "explain",
              title: "专治：\"得过一次就终身免疫\"？",
              blocks: [
                { type: "lead", text: "\"得过一次，这辈子都不怕了\"——因病而异。" },
                { type: "text", html: "有些传染病得过一次后不易再得；但流感病毒变异快，会反复得——因病而异，没有\"终身免疫\"的通票。" },
                { type: "mathlink", text: "认旧友：b07.1.3——近视是晶状体/眼球前后径的问题，不是病原体引起的，不会\"传染\"；龋齿也不是传染病。" },
                { type: "trap", text: "⚠️ \"得过一次就终身免疫\"错——因病而异！流感会反复得。" },
                { type: "note", text: "一句话：免疫因病而异；近视/龋齿不是传染病。复述一遍。" }
              ],
              point: "免疫因病而异；近视/龋齿不是传染病。"
            }
          ]
        },
        {
          id: "b08.1.2",
          title: "免疫",
          prereq: "传染病",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：三道防线 + 闯关 ============ */
            {
              id: "b08.1.2-p1",
              kind: "explain",
              title: "闯关：三道防线",
              blocks: [
                { type: "lead", text: "病原体入侵，身体有三道防线——按顺序闯关！" },
                { type: "text", html: "第一道防线：皮肤和黏膜（阻挡病原体；分泌物有杀菌作用）。第二道防线：体液中的杀菌物质和吞噬细胞。第三道防线：免疫器官和免疫细胞。" },
                { type: "text", html: "非特异性免疫：第一、二道防线（生来就有，不针对特定病原体）。特异性免疫：第三道防线（出生后产生，只针对特定病原体）。" },
                { type: "text", html: "<div style=\"text-align:center;margin:8px 0\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B08.defense('d1',this)\">第一道防线</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B08.defense('d2',this)\">第二道防线</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin:4px\" onclick=\"BIO_B08.defense('d3',this)\">第三道防线</button>" +
                  "<div><button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px;margin-top:4px\" onclick=\"BIO_B08.defenseReset()\">重新闯关</button></div>" +
                  "<div id=\"bioB08DefenseMsg\" style=\"min-height:5.4em;margin-top:6px;font-size:0.95rem;line-height:1.7\">病原体来了！按顺序点防线迎战。</div>" +
                  "</div>" },
                { type: "note", text: "动手：闯关后遮住上面，复述三道防线的组成和\"特异/非特异\"划分。" }
              ],
              point: "三道防线：皮肤黏膜/杀菌物质吞噬细胞/特异性免疫；前两道非特异，第三道特异。"
            },
            /* ============ p2：抗体 + 误区专治 + 过敏 ============ */
            {
              id: "b08.1.2-p2",
              kind: "explain",
              title: "抗体与免疫的功能",
              blocks: [
                { type: "lead", text: "\"免疫=不得病\"——免疫还干别的。" },
                { type: "text", html: "先认词——抗体：淋巴细胞产生的特殊蛋白质，能与特定抗原结合；结合后由吞噬细胞清除。" },
                { type: "text", html: "免疫的功能：抵抗抗原的侵入；清除体内衰老、损伤的细胞；监视、清除自身异常细胞。" },
                { type: "text", html: "先认词——过敏反应：免疫功能过强，对某些物质（如花粉）反应过度的现象。" },
                { type: "trap", text: "⚠️ \"免疫=不得病\"错——监视、清除自身异常细胞也是免疫功能！⚠️ \"过敏是免疫力低下\"错——过敏是免疫功能过强，方向别反。" },
                { type: "note", text: "一句话：抗体\"结合\"不\"杀死\"，结合后由吞噬细胞清除；过敏是免疫功能过强。" }
              ],
              point: "抗体与抗原结合，结合后由吞噬细胞清除；过敏是免疫功能过强。"
            }
          ]
        },
        {
          id: "b08.1.3",
          title: "疫苗、计划免疫与安全用药急救",
          prereq: "免疫",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：疫苗原理 + 计划免疫 ============ */
            {
              id: "b08.1.3-p1",
              kind: "explain",
              title: "疫苗：免疫系统的\"演习\"",
              blocks: [
                { type: "lead", text: "疫苗是免疫系统的\"演习\"。" },
                { type: "text", html: "疫苗：减毒或灭活的抗原。原理：接种后刺激淋巴细胞产生抗体和记忆细胞；再次遇到同种抗原时，记忆细胞快速产生大量抗体。" },
                { type: "text", html: "边界句：\"演习\"不是真打仗——减毒/灭活抗原，不致病；→抗体+记忆细胞。" },
                { type: "text", html: "计划免疫：国家按程序为适龄儿童接种疫苗。" },
                { type: "trap", text: "⚠️ \"疫苗打了就不得病\"错——疫苗降低重症风险，不是100%不得！" },
                { type: "note", text: "一句话：疫苗原理=减毒/灭活抗原→抗体+记忆细胞；降低重症风险。复述一遍。" }
              ],
              point: "疫苗原理：减毒/灭活抗原→抗体+记忆细胞；降低重症风险。"
            },
            /* ============ p2：处方/非处方药 ============ */
            {
              id: "b08.1.3-p2",
              kind: "explain",
              title: "安全用药：先分两类",
              blocks: [
                { type: "lead", text: "药不能乱吃——先分两类。" },
                { type: "text", html: "处方药：必须凭医师处方购买和使用。非处方药（OTC）：不需要处方、可自行购买，但要按说明书使用。" },
                { type: "text", html: "安全用药：不随意增减、不滥用；具体用药听医嘱、看说明书（不推荐具体药品）。" },
                { type: "note", text: "记住：处方药凭处方，非处方药看说明书；拿不准的问医生。" }
              ],
              point: "处方药凭处方；非处方药按说明书；不滥用。"
            },
            /* ============ p3：急救常识 ============ */
            {
              id: "b08.1.3-p3",
              kind: "explain",
              title: "急救常识",
              blocks: [
                { type: "lead", text: "关键时刻，正确的一步能救命。" },
                { type: "text", html: "拨打120：说清地点、伤情、联系方式，保持电话畅通。" },
                { type: "text", html: "心肺复苏：胸外按压——两乳头连线中点，深度约5–6厘米，频率100–120次/分钟；配合人工呼吸。需专业培训，平时可参加正规急救培训。" },
                { type: "text", html: "止血包扎：直接压迫伤口止血；用干净纱布或布条包扎。不展开诊疗。" },
                { type: "note", text: "一句话：急救三件套——拨打120说清情况、心肺复苏按官方指南、止血用直接压迫。" }
              ],
              point: "急救：拨打120说清情况；心肺复苏按官方指南；止血用直接压迫。"
            }
          ]
        },
        {
          id: "b08.1.4",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b08.1.4-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "本章小结——b08.1.1：病原体（细菌/病毒/寄生虫等）；传染源（散播病原体的人或动物）；流行三环节（传染源/传播途径/易感人群）；预防三措施（控制传染源/切断传播途径/保护易感人群）；三环节—三措施配对闯关；免疫因病而异（流感会反复得）；近视/龋齿不是传染病；认旧友 b07.1.3。b08.1.2：三道防线（皮肤和黏膜/体液杀菌物质和吞噬细胞/免疫器官和免疫细胞）；非特异性免疫（第一、二道）/特异性免疫（第三道）；三道防线闯关；抗体（与抗原结合，结合后由吞噬细胞清除）；免疫功能（抵抗抗原侵入/清除衰老损伤细胞/监视清除自身异常细胞）；过敏反应（免疫功能过强）。b08.1.3：疫苗（减毒/灭活抗原→抗体+记忆细胞；\"演习\"不是真打仗）；计划免疫；降低重症风险（不是100%不得）；处方药（凭处方）/非处方药（OTC，看说明书）；急救（拨打120说清情况；心肺复苏；止血用直接压迫）。" },
                { type: "choice", stem: "传染病流行的三个环节不包括？",
                  options: ["传染源", "传播途径", "易感人群", "遗传基因"], answer: 3,
                  tip: "三环节：传染源/传播途径/易感人群，缺一不可（b08.1.1 第 1 页）。" },
                { type: "choice", stem: "\"切断传播途径\"对应的措施是？",
                  options: ["隔离病人", "消毒、戴口罩", "接种疫苗", "锻炼身体"], answer: 1,
                  tip: "隔离病人=控制传染源；消毒/戴口罩=切断传播途径；接种疫苗/锻炼=保护易感人群（b08.1.1 第 2 页）。" },
                { type: "choice", stem: "关于免疫的说法，正确的是？",
                  options: ["得过一次传染病就终身免疫", "免疫=不得病", "抗体与抗原结合，结合后由吞噬细胞清除", "过敏是免疫力低下"], answer: 2,
                  tip: "免疫因病而异（流感会反复得）；抗体\"结合\"不\"杀死\"，结合后由吞噬细胞清除；过敏是免疫功能过强（b08.1.1 第 3 页/b08.1.2 第 2 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b08.1.4-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "三道防线中属于特异性免疫的是？",
                  options: ["皮肤和黏膜", "体液中的杀菌物质和吞噬细胞", "免疫器官和免疫细胞", "以上都是"], answer: 2,
                  tip: "第一、二道防线是非特异性免疫，第三道（免疫器官和免疫细胞）是特异性免疫（b08.1.2 第 1 页）。" },
                { type: "choice", stem: "疫苗的作用原理是？",
                  options: ["直接杀死病原体", "刺激淋巴细胞产生抗体和记忆细胞", "补充营养", "增强皮肤屏障"], answer: 1,
                  tip: "减毒/灭活抗原→抗体+记忆细胞；\"演习\"不是真打仗，不致病（b08.1.3 第 1 页）。" },
                { type: "choice", stem: "关于疫苗的说法，正确的是？",
                  options: ["打了就100%不得病", "降低重症风险，不是100%不得", "疫苗就是弱病毒感染", "打疫苗不需要按程序"], answer: 1,
                  tip: "疫苗降低重症风险，不是100%不得；减毒/灭活抗原不致病；计划免疫按程序接种（b08.1.3 第 1 页）。" },
                { type: "choice", stem: "拨打120时最重要的是？",
                  options: ["说清地点和伤情", "先挂电话", "只报姓名", "等对方先问"], answer: 0,
                  tip: "说清地点、伤情、联系方式，保持电话畅通（b08.1.3 第 3 页）。" }
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
 * b08 内联交互助手（纯 HTML 内联 handler，不新增引擎组件，
 * b06 的 window.BIO_B06 双循环闯关先例）。命名空间 window.BIO_B08。
 * 三环节—三措施配对闯关 / 三道防线闯关（病原体入侵路径）。
 * 闯关记录：会话内有效，不写 localStorage（不发明新 recordKey）。
 * ============================================================ */
window.BIO_B08 = (function () {
  function say(id, html) { var m = document.getElementById(id); if (m) m.innerHTML = html; }
  function markBtn(btn) {
    if (!btn) return;
    var sibs = btn.parentNode.querySelectorAll("button");
    for (var i = 0; i < sibs.length; i++) sibs[i].style.outline = "";
    btn.style.outline = "3px solid var(--bio-highlight)";
    btn.style.outlineOffset = "1px";
  }
  /* ---------- 三环节—三措施配对闯关 ---------- */
  var LINK_NAME = { src: "传染源", cut: "传播途径", sus: "易感人群" };
  var MS_NAME = { src: "控制传染源", cut: "切断传播途径", sus: "保护易感人群" };
  var MS_EX = { src: "如隔离病人。", cut: "如消毒、戴口罩。", sus: "如接种疫苗、锻炼身体。" };
  var selLink = null, donePairs = {};
  function pairBtn(id, done) {
    var b = document.getElementById(id);
    if (!b) return;
    b.style.opacity = done ? "0.45" : "";
    b.style.outline = "";
  }
  var LINK_IDS = { src: "bioB08P-src", cut: "bioB08P-cut", sus: "bioB08P-sus" };
  var MS_IDS = { src: "bioB08P-m2", cut: "bioB08P-m3", sus: "bioB08P-m1" };
  /* ---------- 三道防线闯关（顺序固定） ---------- */
  var DORDER = ["d1", "d2", "d3"];
  var DNUM = ["①", "②", "③"];
  var DTXT = {
    d1: "① <b>第一道防线：皮肤和黏膜</b>——\"城墙\"。挡住大多数病原体；分泌物还有杀菌作用。",
    d2: "② <b>第二道防线：杀菌物质+吞噬细胞</b>——\"巡逻队\"。漏网的病原体在这里被围歼。",
    d3: "③ <b>第三道防线：免疫器官和免疫细胞</b>——\"特种部队\"。特异性免疫：产生抗体+记忆细胞；下次同种病原体再来，反应更快。"
  };
  var di = 0;
  return {
    pair: function (side, key, btn) {
      if (donePairs[key]) return;
      if (side === "link") {
        selLink = key;
        markBtn(btn);
        say("bioB08PairMsg", "已选环节「<b>" + LINK_NAME[key] + "</b>」——再点右侧一个措施配对。");
      } else {
        if (!selLink) { say("bioB08PairMsg", "先点左侧一个环节，再点措施。"); return; }
        if (selLink === key) {
          donePairs[key] = 1;
          pairBtn(LINK_IDS[key], true); pairBtn(MS_IDS[key], true);
          selLink = null;
          var n = Object.keys(donePairs).length;
          if (n >= 3) {
            say("bioB08PairMsg", "🎉 <b>三对全对！</b>传染源↔控制传染源 / 传播途径↔切断传播途径 / 易感人群↔保护易感人群。记住：环节和措施名字里就藏着答案。");
          } else {
            say("bioB08PairMsg", "✓ <b>" + LINK_NAME[key] + " ↔ " + MS_NAME[key] + "</b>" + MS_EX[key] + " —— 还差 " + (3 - n) + " 对。");
          }
        } else {
          say("bioB08PairMsg", "再想想：「<b>" + LINK_NAME[selLink] + "</b>」对应的是哪个措施？提示：名字里有答案。");
        }
      }
    },
    pairReset: function () {
      selLink = null; donePairs = {};
      ["src", "cut", "sus"].forEach(function (k) { pairBtn(LINK_IDS[k], false); pairBtn(MS_IDS[k], false); });
      say("bioB08PairMsg", "先点左侧一个环节，再点右侧一个措施配对。");
    },
    defense: function (st, btn) {
      if (di >= DORDER.length) return;
      if (st === DORDER[di]) {
        markBtn(btn);
        say("bioB08DefenseMsg", DTXT[st] + (di < 2 ? "<br>—— 下一关：<b>" + DNUM[di + 1] + "</b>" : "<br>🎉 <b>三道全过！</b>记住：前两道是非特异性免疫（生来就有），第三道是特异性免疫。"));
        di++;
      } else {
        say("bioB08DefenseMsg", "顺序别乱：病原体先撞上「<b>" + DNUM[di] + " " + ({ d1: "第一道防线", d2: "第二道防线", d3: "第三道防线" })[DORDER[di]] + "</b>」（" + ({ d1: "皮肤和黏膜", d2: "杀菌物质和吞噬细胞", d3: "免疫器官和免疫细胞" })[DORDER[di]] + "）。");
      }
    },
    defenseReset: function () {
      di = 0;
      say("bioB08DefenseMsg", "病原体来了！按顺序点防线迎战。");
    }
  };
})();
