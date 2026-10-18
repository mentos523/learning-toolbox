/* ============================================================
 * 学习工具箱 · 生物 · 第三章数据（生物 P7 生产队 2026-10-19）
 *
 * 课：b03.1.1 绿叶在光下制造有机物（3 页）/ b03.1.2 光合作用的
 *     概念（3 页）/ b03.1.3 呼吸作用（3 页）/ b03.1.4 开花、
 *     传粉与结果（3 页）/ b03.1.5 光合与呼吸的联系（2 页）/
 *     b03.1.6 本章小结与习题（2 页）。共 16 页。
 *     本章是初中植物学的核心：b03.1.1 绿叶实验是全书第一个
 *     完整探究实验，"对照/单一变量/重复"三原则在此定型。
 * 交互：新组件 2 个（上限 2，任务书冻结）——
 *   B3 experiment-3q（b03.1.1-p1 首立，recordKey=bio_3q_b03.1.1，
 *     三问顺序 对照→单一变量→重复冻结，answer 索引程序化校验），
 *   B4 photosyn-sandbox（b03.1.5-p1 首立，光/CO₂/温度三滑块，
 *     纵轴一律相对值，常驻"相对值（非实测数据）"）；
 *   注册进 js/biology-engine.js（注释记 P7 首立）。
 *   其余页内小交互（步骤器/拼搭/花结构点选）为纯内联 HTML +
 *   window.BIO_B03 助手函数，不新增引擎组件、不新增落点类型。
 * 数据 schema 见 data/b18.js 文件头（生物冻结版 v1.0）。
 *
 * 本批冻结引用（逐字）：
 * - 模式图声明：「模式图：非等比、非实物」（BIO-R32）
 * - 虚拟实验声明：「虚拟实验：现实中须××」（BIO-R35，××逐页写实）
 * - B4 相对值：「相对值（非实测数据）」（BIO-R42/B-F4，删=FAIL）
 * - B3 记录键：「bio_3q_b03.1.1」（B-F3）；三问顺序冻结
 *   对照→单一变量→重复（BIO-R12）
 * - 绿叶实验结论（BIO-R45）：只说"光是条件、产物含淀粉"，
 *   不许推出原料/场所/其他结论
 * - 辨析③立靶：「能量单向物循环」（BIO-R61，逐字；本章只立靶，
 *   不展开能量流动；碳循环完整环路文案 b24.3.3 细讲）
 * - 碳—氧平衡纯文本预告→b24.3.3（门禁⑩，台账 drafted）
 * - \"呼吸\"只用于肺通气语境，\"呼吸作用\"=细胞内氧化分解（BIO-R01）
 * - 直觉比喻 T8：「呼吸是\"喘气\"，呼吸作用是细胞里\"烧\"有机物」，
 *   配边界句「呼吸作用是缓慢氧化，不是有火苗的烧」
 *
 * 门禁⑧：新术语首现即定义——暗处理/对照组/单一变量/碘液检验
 * （b03.1.1-p1）/叶绿体/光合作用（b03.1.2-p1）/呼吸作用
 * （b03.1.3-p1 先认词，p2 展开实质）/子房/胚珠（b03.1.4-p1）/
 * 传粉/受精/花粉管（b03.1.4-p2）。
 * 注：章题"绿色植物：光合、呼吸与生殖"中的"光合"为章名引用，
 * 非术语定义；"光合作用"正式定义首现仍在 b03.1.2-p1。
 * 门禁⑨：深链 token 只用已生产课号（b16–b21）；b02 小结未生产，
 * b03.1.1 prereq 只做纯文本前链，不挂深链；b03 章内互链用
 * #课号/页码（如 #b03.1.1/2）。
 * 门禁⑩：本批新登记预告 b03.1.5-a1（碳—氧平衡/碳循环，
 * b24.3.3 细讲）→ ledger-b03.1.5.json 记 drafted。
 * 门禁⑪：b03.1.5（2 页）/b03.1.6（2 页）为任务书课页分工的设计
 * 意图（讲解+沙盘 / 小结与习题），台账留痕，非缺页；
 * quiz 页题目数>0（b03.1.6-p1 review+3 choice，p2 4 choice）。
 * ============================================================ */
window.BIO_CH = window.BIO_CH || {};
/* ---------- b03 页内小交互助手（纯内联，不新增引擎组件） ---------- */
window.BIO_B03 = {
  /* 步骤器：id 前缀，idx 从 0 起；steps: "bioB03Steps-<id>-<i>"，dots: "bioB03Dot-<id>-<i>" */
  go: function (id, idx) {
    var i = 0, s;
    while ((s = document.getElementById("bioB03Steps-" + id + "-" + i))) {
      s.style.display = i === idx ? "" : "none";
      var d = document.getElementById("bioB03Dot-" + id + "-" + i);
      if (d) d.style.background = i === idx ? "var(--bio-organelle)" : "var(--bio-line)";
      i++;
    }
    var msg = document.getElementById("bioB03Msg-" + id);
    if (msg) msg.textContent = "第 " + (idx + 1) + " 步 / 共 " + i + " 步";
  },
  /* 演示切换：与 go 同构，id 不同 */
  demo: function (id, idx) { window.BIO_B03.go(id, idx); },
  /* 花结构点选：part → 卡片文案；被点部位描边高亮 */
  flower: function (part) {
    var INFO = {
      hue: ["花萼", "花的最外层，保护未开放的花。"],
      huban: ["花瓣", "一般颜色鲜艳，招引昆虫来传粉（虫媒花）。"],
      huayao: ["花药", "雄蕊顶端，里面产生花粉。"],
      huasi: ["花丝", "雄蕊的花丝像小柄，托着花药。"],
      zhutou: ["柱头", "雌蕊顶端，负责承接花粉。"],
      huazhu: ["花柱", "连接柱头和子房，花粉管从这里通过。"],
      zifang: ["子房", "雌蕊下部膨大的部分，内有胚珠——子房壁将来发育成果皮（b03.1.4 第 3 页）！"]
    };
    var card = document.getElementById("bioB03FlowerCard");
    if (card && INFO[part]) {
      card.innerHTML = "<b>" + INFO[part][0] + "</b>：" + INFO[part][1];
    }
    var ids = ["hue", "huban", "huayao", "huasi", "zhutou", "huazhu", "zifang"];
    for (var k = 0; k < ids.length; k++) {
      var n = document.getElementById("bioB03F-" + ids[k]);
      if (n) n.style.stroke = ids[k] === part ? "var(--bio-target)" : "var(--bio-membrane)";
    }
    try { if (navigator.vibrate) navigator.vibrate(10); } catch (e) {}
  },
  /* 光合作用文字表达式拼搭 */
  ps: {
    sel: null,
    truth: { "s-r1": "c-co2", "s-r2": "c-h2o", "s-cond": "c-light", "s-site": "c-chl", "s-p1": "c-org", "s-p2": "c-o2" },
    chip: function (cid, node) {
      window.BIO_B03.ps.sel = cid;
      var box = document.getElementById("bioB03PsChips");
      if (box) {
        var cs = box.querySelectorAll("button");
        for (var i = 0; i < cs.length; i++) cs[i].style.outline = "";
      }
      if (node) node.style.outline = "3px solid var(--bio-organelle)";
    },
    fill: function (sid, node) {
      var P = window.BIO_B03.ps;
      var slot = document.getElementById(sid);
      if (!slot) return;
      if (slot.getAttribute("data-cid")) {
        slot.setAttribute("data-cid", "");
        slot.innerHTML = "<span style=\"color:var(--bio-ink-soft)\">？</span>";
        return;
      }
      if (!P.sel) {
        var fb0 = document.getElementById("bioB03PsFb");
        if (fb0) fb0.textContent = "先点上面的选项，再点空格。";
        return;
      }
      var chip = document.getElementById(P.sel);
      slot.setAttribute("data-cid", P.sel);
      slot.textContent = chip ? chip.textContent : P.sel;
      P.sel = null;
      var box = document.getElementById("bioB03PsChips");
      if (box) {
        var cs = box.querySelectorAll("button");
        for (var j = 0; j < cs.length; j++) cs[j].style.outline = "";
      }
    },
    reset: function () {
      var ids = ["s-r1", "s-r2", "s-cond", "s-site", "s-p1", "s-p2"];
      for (var i = 0; i < ids.length; i++) {
        var s = document.getElementById(ids[i]);
        if (s) { s.setAttribute("data-cid", ""); s.innerHTML = "<span style=\"color:var(--bio-ink-soft)\">？</span>"; }
      }
      window.BIO_B03.ps.sel = null;
      var fb = document.getElementById("bioB03PsFb");
      if (fb) fb.textContent = "";
    },
    check: function () {
      var P = window.BIO_B03.ps, ok = true, n = 0;
      for (var sid in P.truth) {
        var s = document.getElementById(sid);
        n++;
        if (!s || s.getAttribute("data-cid") !== P.truth[sid]) { ok = false; }
      }
      var fb = document.getElementById("bioB03PsFb");
      if (!fb) return;
      if (ok) {
        fb.innerHTML = "✓ 拼对了！二氧化碳 + 水 —光能，叶绿体→ 有机物（淀粉）+ 氧气。四要素对上号了吗？";
      } else {
        fb.textContent = "还没全对，再想想：原料/条件/场所/产物各是什么（b03.1.2 第 1 页）——不扣分，继续试。";
      }
      try { if (navigator.vibrate) navigator.vibrate(15); } catch (e) {}
    }
  }
};
window.BIO_CH["b03"] = {
  id: "b03",
  units: [
    {
      id: "b03.1",
      title: "绿色植物的生命活动",
      lessons: [
        {
          id: "b03.1.1",
          title: "绿叶在光下制造有机物",
          prereq: "b02 小结",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：实验原理+步骤+B3 三问设计器首立 ============ */
            {
              id: "b03.1.1-p1",
              kind: "explain",
              title: "实验：绿叶制造有机物",
              blocks: [
                { type: "lead", text: "一片叶子，一半遮光、一半见光——几天后，淀粉藏在哪一半？" },
                { type: "text", html: "先认词——暗处理：把天竺葵放在黑暗处一昼夜，耗尽叶片中原有的淀粉。对照组：实验里不做特殊处理的那一组，是\"参照物\"——没它，不知道变没变（此处的\"参照物\"指\"比较的基准\"，不是物理运动学中的参照系）。单一变量：一次实验只改变一个量，本实验只变\"光照\"，其他条件都一样。" },
                { type: "text", html: "五步流程：暗处理→一半遮光（对照！）→光照几小时→酒精脱色（水浴加热）→碘液检验（变蓝=有淀粉）。" },
                { type: "widget", widget: { type: "experiment-3q", params: {
                  purpose: "证明光是绿叶制造有机物的条件",
                  controlOptions: ["一半遮光、一半见光", "两片叶子都见光", "两片叶子都遮光"],
                  variableOptions: ["光照", "温度", "叶片大小"],
                  repeatOptions: ["1 次", "3 次", "10 次"],
                  answer: { control: 0, variable: 0, repeat: 1 },
                  thoughtExp: "如果不设遮光对照（两片叶子都见光），叶片变蓝了，你怎么知道是光的功劳？可能是暗处理没做彻底——叶子本来就有淀粉。",
                  recordKey: "bio_3q_b03.1.1",
                  replayHref: "#b03.1.1/2",
                  replayText: "回看第 2 页：虚拟实验全流程"
                } } },
                { type: "note", text: "三问自查——对照组是\"参照物\"，参照什么？单一变量\"只变\"的是哪个量？（答案在本页）" }
              ],
              point: "三原则落点：对照（遮光 vs 见光）、单一变量（光）、重复（多片叶）。"
            },
            /* ============ p2：虚拟实验全流程观察页 ============ */
            {
              id: "b03.1.1-p2",
              kind: "explain",
              title: "虚拟实验：五步全流程",
              blocks: [
                { type: "lead", text: "进虚拟实验室，把五步亲手走一遍——注意每一步\"为什么\"。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.go('gexp',0)\">①</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.go('gexp',1)\">②</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.go('gexp',2)\">③</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.go('gexp',3)\">④</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.go('gexp',4)\">⑤</button>" +
                  "</div>" +
                  "<div id=\"bioB03Steps-gexp-0\"><b>① 暗处理</b>：天竺葵在黑暗处放一昼夜——耗尽叶片中原有的淀粉。为什么：排除旧淀粉干扰。</div>" +
                  "<div id=\"bioB03Steps-gexp-1\" style=\"display:none\"><b>② 一半遮光</b>：用黑纸片/铝箔遮住叶片的一半，另一半见光——对照组设置！只差\"光照\"这一个量。</div>" +
                  "<div id=\"bioB03Steps-gexp-2\" style=\"display:none\"><b>③ 光照</b>：阳光下照射几小时，让见光的一半充分\"工作\"。</div>" +
                  "<div id=\"bioB03Steps-gexp-3\" style=\"display:none\"><b>④ 酒精脱色</b>：摘下叶片，放入酒精中水浴加热——绿色褪去，叶片变成黄白色。<b>误区纠正：</b>叶片不能直接滴碘液——先酒精脱色！否则绿色掩盖蓝色，什么都看不见。</div>" +
                  "<div id=\"bioB03Steps-gexp-4\" style=\"display:none\"><b>⑤ 碘液检验</b>：清水漂洗后，向叶片滴加碘液。<span style=\"color:var(--bio-ink-soft);font-size:13.6px\">先只看现象：见光部分变蓝，遮光部分不变蓝——结论下一页再说。</span></div>" +
                  "<div style=\"display:flex;gap:6px;margin-top:10px;align-items:center;flex-wrap:wrap\">" +
                  "<span id=\"bioB03Dot-gexp-0\" style=\"width:10px;height:10px;border-radius:50%;background:var(--bio-organelle);display:inline-block\"></span>" +
                  "<span id=\"bioB03Dot-gexp-1\" style=\"width:10px;height:10px;border-radius:50%;background:var(--bio-line);display:inline-block\"></span>" +
                  "<span id=\"bioB03Dot-gexp-2\" style=\"width:10px;height:10px;border-radius:50%;background:var(--bio-line);display:inline-block\"></span>" +
                  "<span id=\"bioB03Dot-gexp-3\" style=\"width:10px;height:10px;border-radius:50%;background:var(--bio-line);display:inline-block\"></span>" +
                  "<span id=\"bioB03Dot-gexp-4\" style=\"width:10px;height:10px;border-radius:50%;background:var(--bio-line);display:inline-block\"></span>" +
                  "<span id=\"bioB03Msg-gexp\" style=\"font-size:12.48px;color:var(--bio-ink-soft);margin-left:6px\">第 1 步 / 共 5 步</span>" +
                  "</div></div>" },
                { type: "note", text: "虚拟实验：现实中须水浴加热酒精（酒精易燃，严禁用明火直热）；碘液不接触皮肤，实验后洗手。" },
                { type: "note", text: "走完五步再想：哪一步在设对照？哪一步在\"只变一个量\"？（对照 b03.1.1 第 1 页三问）" }
              ],
              point: "五步走完只看现象：见光部分变蓝，遮光部分不变。"
            },
            /* ============ p3：结果、结论与三原则定型 ============ */
            {
              id: "b03.1.1-p3",
              kind: "explain",
              title: "结果、结论与三原则",
              blocks: [
                { type: "lead", text: "见光的一半变蓝，遮光的一半没变——能下什么结论？" },
                { type: "text", html: "结果：滴加碘液后，见光部分变蓝，遮光部分呈黄白色（碘液本色），没有变蓝。" },
                { type: "text", html: "结论（只说两句，不超范围）：①光是绿叶制造有机物的条件；②产物中有淀粉。不许推出\"原料是二氧化碳和水\"——本实验没测原料，超范围下结论=犯规！" },
                { type: "text", html: "跃升 4 定型：对照、单一变量、重复——这三问，全书每个实验都要过一遍。一次实验的结论，要\"多片叶、多做几次\"重复验证才站得住。" },
                { type: "note", text: "三问自查——本实验的对照组是哪一半？\"单一变量\"是哪个量？重复怎么做？（答案：b03.1.1 第 1 页）" }
              ],
              point: "结论两句：光是条件，产物含淀粉。三原则全书通用。"
            }
          ]
        },
        {
          id: "b03.1.2",
          title: "光合作用的概念",
          prereq: "绿叶实验",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：原料/条件/场所/产物 ============ */
            {
              id: "b03.1.2-p1",
              kind: "explain",
              title: "原料、条件、场所、产物",
              blocks: [
                { type: "lead", text: "绿叶实验只证明了\"光是条件、产物含淀粉\"——原料是什么？在哪里造？" },
                { type: "text", html: "先认词——光合作用：绿色植物通过叶绿体，利用光能，把二氧化碳和水转化成储存着能量的有机物（如淀粉），并且释放出氧气的过程。" },
                { type: "text", html: "先认词——叶绿体：植物细胞中进行光合作用的场所，含有叶绿素（叶片绿色的原因）。" },
                { type: "text", html: "四要素一次记：原料——二氧化碳 + 水；条件——光；场所——叶绿体；产物——有机物 + 氧气。" },
                { type: "trap", text: "⚠️ 别搞混：\"光合作用只在白天\"错——有光即可，条件是光不是\"白天\"；\"产物只有氧气\"错——有机物 + 氧气，有机物才是目的！" }
              ],
              point: "四要素：原料/条件/场所/产物，一次记对。"
            },
            /* ============ p2：文字表达式拼搭 ============ */
            {
              id: "b03.1.2-p2",
              kind: "explain",
              title: "文字表达式拼搭",
              blocks: [
                { type: "lead", text: "把四要素拼成一句话——动手拼。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"margin-bottom:8px\">第一步：点一个选项；第二步：点一个空格放进去。点已填的空格可清空。</div>" +
                  "<div id=\"bioB03PsChips\" style=\"display:flex;gap:8px;flex-wrap:wrap;margin-bottom:12px\">" +
                  "<button type=\"button\" id=\"c-co2\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.chip('c-co2',this)\">二氧化碳</button>" +
                  "<button type=\"button\" id=\"c-h2o\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.chip('c-h2o',this)\">水</button>" +
                  "<button type=\"button\" id=\"c-light\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.chip('c-light',this)\">光能</button>" +
                  "<button type=\"button\" id=\"c-chl\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.chip('c-chl',this)\">叶绿体</button>" +
                  "<button type=\"button\" id=\"c-org\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.chip('c-org',this)\">有机物（淀粉）</button>" +
                  "<button type=\"button\" id=\"c-o2\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.chip('c-o2',this)\">氧气</button>" +
                  "<button type=\"button\" id=\"c-mit\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.chip('c-mit',this)\">线粒体</button>" +
                  "<button type=\"button\" id=\"c-chlp\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.chip('c-chlp',this)\">叶绿素</button>" +
                  "</div>" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;align-items:center;margin-bottom:12px\">" +
                  "<button type=\"button\" id=\"s-r1\" data-cid=\"\" style=\"min-height:44px;min-width:76px;border:2px dashed var(--bio-ink-soft);border-radius:8px;background:var(--bio-bg);font-size:16px\" onclick=\"BIO_B03.ps.fill('s-r1',this)\"><span style=\"color:var(--bio-ink-soft)\">？</span></button>" +
                  "<span>+</span>" +
                  "<button type=\"button\" id=\"s-r2\" data-cid=\"\" style=\"min-height:44px;min-width:76px;border:2px dashed var(--bio-ink-soft);border-radius:8px;background:var(--bio-bg);font-size:16px\" onclick=\"BIO_B03.ps.fill('s-r2',this)\"><span style=\"color:var(--bio-ink-soft)\">？</span></button>" +
                  "<span style=\"font-size:20px\">→</span>" +
                  "<button type=\"button\" id=\"s-p1\" data-cid=\"\" style=\"min-height:44px;min-width:76px;border:2px dashed var(--bio-ink-soft);border-radius:8px;background:var(--bio-bg);font-size:16px\" onclick=\"BIO_B03.ps.fill('s-p1',this)\"><span style=\"color:var(--bio-ink-soft)\">？</span></button>" +
                  "<span>+</span>" +
                  "<button type=\"button\" id=\"s-p2\" data-cid=\"\" style=\"min-height:44px;min-width:76px;border:2px dashed var(--bio-ink-soft);border-radius:8px;background:var(--bio-bg);font-size:16px\" onclick=\"BIO_B03.ps.fill('s-p2',this)\"><span style=\"color:var(--bio-ink-soft)\">？</span></button>" +
                  "</div>" +
                  "<div style=\"display:flex;gap:8px;flex-wrap:wrap;align-items:center;margin-bottom:8px\">" +
                  "<span style=\"font-size:13.6px;color:var(--bio-ink-soft)\">条件：</span>" +
                  "<button type=\"button\" id=\"s-cond\" data-cid=\"\" style=\"min-height:44px;min-width:76px;border:2px dashed var(--bio-ink-soft);border-radius:8px;background:var(--bio-bg);font-size:16px\" onclick=\"BIO_B03.ps.fill('s-cond',this)\"><span style=\"color:var(--bio-ink-soft)\">？</span></button>" +
                  "<span style=\"font-size:13.6px;color:var(--bio-ink-soft)\">场所：</span>" +
                  "<button type=\"button\" id=\"s-site\" data-cid=\"\" style=\"min-height:44px;min-width:76px;border:2px dashed var(--bio-ink-soft);border-radius:8px;background:var(--bio-bg);font-size:16px\" onclick=\"BIO_B03.ps.fill('s-site',this)\"><span style=\"color:var(--bio-ink-soft)\">？</span></button>" +
                  "</div>" +
                  "<div style=\"display:flex;gap:8px;flex-wrap:wrap\">" +
                  "<button type=\"button\" class=\"tb-btn-primary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.check()\">检查</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.ps.reset()\">重置</button>" +
                  "</div>" +
                  "<div id=\"bioB03PsFb\" style=\"margin-top:8px;min-height:24px;font-size:15.2px\"></div>" +
                  "</div>" },
                { type: "text", html: "读式：原料在左，产物在右，条件和场所记在心里。注意：这是文字表达式，化学符号版等化学 cm05 再回填。" },
                { type: "note", text: "选项里混进了两个\"捣乱\"的：线粒体、叶绿素——都不是表达式的成员，别放错地方。" }
              ],
              point: "拼出：二氧化碳 + 水 → 有机物 + 氧气。"
            },
            /* ============ p3：实质 ============ */
            {
              id: "b03.1.2-p3",
              kind: "explain",
              title: "实质：合成与储能",
              blocks: [
                { type: "lead", text: "光合作用到底在\"干什么\"？" },
                { type: "text", html: "实质两句：①合成有机物（把二氧化碳和水这样的无机物，变成淀粉这样的有机物）；②储存能量（光能转化成化学能，储存在有机物里）。" },
                { type: "text", html: "能量表述口径：只说\"光能→化学能，储存在有机物中\"。不说\"阳光进入食物链\"——能量起点口径 b24.3.2 细讲。" },
                { type: "oldfriend", text: "认旧友：b03.1.1 第 3 页——绿叶实验证明了\"光是条件、产物含淀粉\"，现在原料（二氧化碳+水）和场所（叶绿体）补齐了。" },
                { type: "note", text: "三问自查——四要素背得出吗？实质两句是什么？（答案在本课第 1 页）" }
              ],
              point: "实质：合成有机物，储存能量。"
            }
          ]
        },
        {
          id: "b03.1.3",
          title: "呼吸作用",
          prereq: "光合作用概念",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：种子呼吸三演示 ============ */
            {
              id: "b03.1.3-p1",
              kind: "explain",
              title: "三组演示看呼吸作用",
              blocks: [
                { type: "lead", text: "萌发的种子 vs 煮熟的种子——三组演示，找呼吸作用的证据。" },
                { type: "text", html: "先认词——呼吸作用：细胞内分解有机物、释放能量的过程。三组演示找的，就是它的三条证据。" },
                { type: "text", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:12px;margin:6px 0;background:var(--bio-panel)\">" +
                  "<div style=\"display:flex;gap:6px;flex-wrap:wrap;margin-bottom:8px\">" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.demo('resp',0)\">① 放出二氧化碳</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.demo('resp',1)\">② 放出热量</button>" +
                  "<button type=\"button\" class=\"tb-btn-secondary\" style=\"min-height:44px\" onclick=\"BIO_B03.demo('resp',2)\">③ 消耗氧气</button>" +
                  "</div>" +
                  "<div id=\"bioB03Steps-resp-0\"><b>① 释放二氧化碳</b>：甲瓶（萌发的种子）通入澄清石灰水变浑浊，乙瓶（煮熟的种子）不变。对照：煮熟的种子（灭活）。</div>" +
                  "<div id=\"bioB03Steps-resp-1\" style=\"display:none\"><b>② 释放热量</b>：甲瓶温度计上升，乙瓶不变——呼吸作用释放能量，一部分变成热。</div>" +
                  "<div id=\"bioB03Steps-resp-2\" style=\"display:none\"><b>③ 消耗氧气</b>：燃烧的蜡烛放入甲瓶熄灭（氧气被消耗），乙瓶继续燃烧。</div>" +
                  "<div style=\"display:flex;gap:6px;margin-top:10px;align-items:center\">" +
                  "<span id=\"bioB03Dot-resp-0\" style=\"width:10px;height:10px;border-radius:50%;background:var(--bio-organelle);display:inline-block\"></span>" +
                  "<span id=\"bioB03Dot-resp-1\" style=\"width:10px;height:10px;border-radius:50%;background:var(--bio-line);display:inline-block\"></span>" +
                  "<span id=\"bioB03Dot-resp-2\" style=\"width:10px;height:10px;border-radius:50%;background:var(--bio-line);display:inline-block\"></span>" +
                  "<span id=\"bioB03Msg-resp\" style=\"font-size:12.48px;color:var(--bio-ink-soft);margin-left:6px\">第 1 组 / 共 3 组</span>" +
                  "</div></div>" },
                { type: "note", text: "虚拟实验：现实中须把种子彻底煮熟灭活作对照；澄清石灰水不接触皮肤。" },
                { type: "note", text: "想一想：为什么三组演示都要用煮熟的种子作对照？（对照组是\"参照物\"：没它，不知道变没变）" }
              ],
              point: "三证据：放出二氧化碳、放出热量、消耗氧气。"
            },
            /* ============ p2：实质 ============ */
            {
              id: "b03.1.3-p2",
              kind: "explain",
              title: "实质：分解与放能",
              blocks: [
                { type: "lead", text: "光合作用\"合成 + 储能\"，呼吸作用反过来——" },
                { type: "text", html: "实质两句：①分解有机物；②释放能量（供给各项生命活动）。注意：是\"呼吸作用\"，不是\"呼吸\"！" },
                { type: "text", html: "对比一次记：光合作用——合成有机物、储存能量；呼吸作用——分解有机物、释放能量。一合一分，一存一放。" },
                { type: "trap", text: "⚠️ 别搞混：\"植物只进行光合作用、不进行呼吸作用\"错——植物时刻都在进行呼吸作用！光合作用只在有光时进行，呼吸作用时刻不停。" }
              ],
              point: "实质：分解有机物，释放能量。"
            },
            /* ============ p3：\"呼吸\"vs\"呼吸作用\"一次分清 ============ */
            {
              id: "b03.1.3-p3",
              kind: "explain",
              title: "\"呼吸\"vs\"呼吸作用\"",
              blocks: [
                { type: "lead", text: "两个词，一字之差，意思差十万八千里——一次分清。" },
                { type: "text", html: "严格版：呼吸——肺与外界的气体交换（\"喘气\"）；呼吸作用——细胞内分解有机物、释放能量（缓慢氧化）。" },
                { type: "text", html: "直觉版：呼吸是\"喘气\"，呼吸作用是细胞里\"烧\"有机物。边界句：呼吸作用是缓慢氧化，不是有火苗的烧。" },
                { type: "text", html: "<div style=\"display:flex;gap:10px;margin:6px 0\">" +
                  "<div style=\"flex:1;text-align:center\"><svg viewBox=\"0 0 120 96\" width=\"100%\" role=\"img\" aria-label=\"跑步喘气示意\" style=\"max-width:180px;display:block;margin:0 auto\">" +
                  "<circle cx=\"80\" cy=\"16\" r=\"9\" style=\"fill:none;stroke:var(--bio-ink);stroke-width:3\"/>" +
                  "<path d=\"M74,28 L62,52 M68,38 L86,46 L94,60 M68,38 L54,48 L46,42 M62,52 L78,66 L76,88 M62,52 L48,64 L30,72\" style=\"fill:none;stroke:var(--bio-ink);stroke-width:3;stroke-linecap:round\"/>" +
                  "<path d=\"M22,30 q8,-8 16,-2 M16,46 q8,-8 16,-2\" style=\"fill:none;stroke:var(--bio-ink-soft);stroke-width:2;stroke-linecap:round\"/>" +
                  "</svg><div style=\"font-size:12.48px;color:var(--bio-ink-soft)\">呼吸：喘气（肺通气）</div></div>" +
                  "<div style=\"flex:1;text-align:center\"><svg viewBox=\"0 0 120 96\" width=\"100%\" role=\"img\" aria-label=\"澄清石灰水变浑浊示意\" style=\"max-width:180px;display:block;margin:0 auto\">" +
                  "<rect x=\"32\" y=\"34\" width=\"44\" height=\"50\" rx=\"6\" style=\"fill:none;stroke:var(--bio-ink);stroke-width:3\"/>" +
                  "<rect x=\"46\" y=\"22\" width=\"16\" height=\"14\" style=\"fill:var(--bio-panel);stroke:var(--bio-ink);stroke-width:2\"/>" +
                  "<rect x=\"36\" y=\"52\" width=\"36\" height=\"28\" rx=\"4\" style=\"fill:var(--bio-ink-soft);opacity:.6\"/>" +
                  "<circle cx=\"46\" cy=\"64\" r=\"3\" style=\"fill:var(--bio-bg)\"/><circle cx=\"60\" cy=\"70\" r=\"2.4\" style=\"fill:var(--bio-bg)\"/><circle cx=\"54\" cy=\"60\" r=\"2\" style=\"fill:var(--bio-bg)\"/>" +
                  "<rect x=\"88\" y=\"30\" width=\"10\" height=\"44\" rx=\"5\" style=\"fill:none;stroke:var(--bio-ink);stroke-width:2\"/>" +
                  "<rect x=\"90.5\" y=\"50\" width=\"5\" height=\"22\" style=\"fill:var(--bio-target)\"/>" +
                  "<circle cx=\"93\" cy=\"74\" r=\"7\" style=\"fill:var(--bio-target)\"/>" +
                  "</svg><div style=\"font-size:12.48px;color:var(--bio-ink-soft)\">呼吸作用：细胞内氧化分解</div></div>" +
                  "</div>" },
                { type: "text", html: "观念页：植物时刻都在进行呼吸作用；光合作用只在有光时进行。" },
                { type: "text", html: "<b>术语医院</b>——给错句看病（练手，不扣分）：①\"跑步后喘气是呼吸作用加快了\"<details style=\"margin:4px 0\"><summary style=\"cursor:pointer\">看诊断</summary>错：\"喘气\"是呼吸（肺通气）加快，不是呼吸作用（细胞内氧化分解）。改对：\"喘气加快是呼吸加快。\"</details>②\"植物晚上不进行呼吸作用了\"<details style=\"margin:4px 0\"><summary style=\"cursor:pointer\">看诊断</summary>错：植物时刻都在进行呼吸作用；晚上停的是光合作用。改对：\"植物晚上仍在进行呼吸作用。\"</details>" },
                { type: "note", text: "三问自查——\"呼吸\"和\"呼吸作用\"各指什么？（答案在本页）" }
              ],
              point: "呼吸=肺通气；呼吸作用=细胞内氧化分解。"
            }
          ]
        },
        {
          id: "b03.1.4",
          title: "开花、传粉与结果",
          prereq: "呼吸作用",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：花的结构拆解 ============ */
            {
              id: "b03.1.4-p1",
              kind: "explain",
              title: "花的结构拆解",
              blocks: [
                { type: "lead", text: "一朵花，点一点，每个部位报上名来——" },
                { type: "text", html: "<svg viewBox=\"0 0 340 210\" width=\"100%\" role=\"img\" aria-label=\"花纵切面结构示意\" style=\"max-width:430px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<line x1=\"170\" y1=\"196\" x2=\"170\" y2=\"176\" style=\"stroke:var(--bio-organelle)\" stroke-width=\"4\"/>" +
                  "<rect x=\"150\" y=\"168\" width=\"40\" height=\"10\" rx=\"3\" style=\"fill:var(--bio-organelle);opacity:.55\"/>" +
                  "<path id=\"bioB03F-hue\" d=\"M150,170 Q110,150 96,118 Q130,132 152,158 Z\" style=\"fill:var(--bio-organelle);opacity:.35;stroke:var(--bio-membrane)\" stroke-width=\"1.5\" onclick=\"BIO_B03.flower('hue')\"/>" +
                  "<path id=\"bioB03F-hue2\" d=\"M190,170 Q230,150 244,118 Q210,132 188,158 Z\" style=\"fill:var(--bio-organelle);opacity:.35;stroke:var(--bio-membrane)\" stroke-width=\"1.5\" onclick=\"BIO_B03.flower('hue')\"/>" +
                  "<path id=\"bioB03F-huban\" d=\"M152,166 Q120,120 108,66 Q146,96 162,150 Z\" style=\"fill:var(--bio-product);opacity:.5;stroke:var(--bio-membrane)\" stroke-width=\"1.5\" onclick=\"BIO_B03.flower('huban')\"/>" +
                  "<path id=\"bioB03F-huban2\" d=\"M188,166 Q220,120 232,66 Q194,96 178,150 Z\" style=\"fill:var(--bio-product);opacity:.5;stroke:var(--bio-membrane)\" stroke-width=\"1.5\" onclick=\"BIO_B03.flower('huban')\"/>" +
                  "<line id=\"bioB03F-huasi\" x1=\"132\" y1=\"162\" x2=\"104\" y2=\"96\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"3\" onclick=\"BIO_B03.flower('huasi')\"/>" +
                  "<ellipse id=\"bioB03F-huayao\" cx=\"102\" cy=\"88\" rx=\"10\" ry=\"14\" style=\"fill:var(--bio-gene);stroke:var(--bio-membrane)\" stroke-width=\"1.5\" onclick=\"BIO_B03.flower('huayao')\"/>" +
                  "<line x1=\"208\" y1=\"162\" x2=\"236\" y2=\"96\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"3\"/>" +
                  "<ellipse cx=\"238\" cy=\"88\" rx=\"10\" ry=\"14\" style=\"fill:var(--bio-gene);stroke:var(--bio-membrane)\" stroke-width=\"1.5\"/>" +
                  "<rect id=\"bioB03F-zifang\" x=\"152\" y=\"128\" width=\"36\" height=\"42\" rx=\"12\" style=\"fill:var(--bio-target);opacity:.4;stroke:var(--bio-membrane)\" stroke-width=\"1.5\" onclick=\"BIO_B03.flower('zifang')\"/>" +
                  "<circle cx=\"163\" cy=\"146\" r=\"5\" style=\"fill:var(--bio-gene)\"/><circle cx=\"177\" cy=\"152\" r=\"5\" style=\"fill:var(--bio-gene)\"/>" +
                  "<line id=\"bioB03F-huazhu\" x1=\"170\" y1=\"128\" x2=\"170\" y2=\"72\" style=\"stroke:var(--bio-membrane)\" stroke-width=\"4\" onclick=\"BIO_B03.flower('huazhu')\"/>" +
                  "<path id=\"bioB03F-zhutou\" d=\"M170,72 Q158,60 150,62 M170,72 Q182,60 190,62\" style=\"fill:none;stroke:var(--bio-membrane)\" stroke-width=\"4\" stroke-linecap=\"round\" onclick=\"BIO_B03.flower('zhutou')\"/>" +
                  "</g>" +
                  "<text x=\"170\" y=\"206\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "text", html: "<div id=\"bioB03FlowerCard\" style=\"border:1px solid var(--bio-line);border-radius:8px;padding:10px;margin:6px 0;min-height:44px;background:var(--bio-panel)\">点花的一个部位，看它的名字和工作。被点中的部位会变红圈出。</div>" },
                { type: "text", html: "先认词——子房：雌蕊下部膨大的部分，内有胚珠。先认词——胚珠：子房内的结构，将来发育成种子。" },
                { type: "text", html: "主角一次认：雄蕊（花药 + 花丝）和雌蕊（柱头 + 花柱 + 子房）是花的主要结构——它们直接参与果实和种子的形成。" },
                { type: "note", text: "点一点：子房在哪里？它和果实有什么关系？（答案：b03.1.4 第 3 页）" }
              ],
              point: "主角：雄蕊和雌蕊。子房内有胚珠。"
            },
            /* ============ p2：传粉与受精 ============ */
            {
              id: "b03.1.4-p2",
              kind: "explain",
              title: "传粉与受精",
              blocks: [
                { type: "lead", text: "花粉从花药到柱头——这段旅程叫传粉。" },
                { type: "text", html: "先认词——传粉：花粉从花药落到雌蕊柱头上的过程。自花传粉（同一朵花内）/异花传粉（不同花之间）。" },
                { type: "text", html: "虫媒花 vs 风媒花：虫媒花（桃花）——花大、色艳、有蜜腺，招昆虫；风媒花（玉米）——花小、花粉多而轻、柱头大而分叉，靠风。" },
                { type: "text", html: "先认词——花粉管：花粉落在柱头上萌发，长出的管，把精子送到胚珠。先认词——受精：精子与卵细胞结合的过程。双受精点到为止（高中细讲）。" },
                { type: "trap", text: "⚠️ 别搞混：传粉≠受精——传粉是\"送到\"（花粉到柱头），受精是\"结合\"（精子与卵细胞）。" }
              ],
              point: "传粉是\"送到\"，受精是\"结合\"。"
            },
            /* ============ p3：果实与种子 ============ */
            {
              id: "b03.1.4-p3",
              kind: "explain",
              title: "果实与种子：谁变谁",
              blocks: [
                { type: "lead", text: "花谢了，果实来了——谁变成了谁？" },
                { type: "text", html: "一一对应，常考：子房壁→果皮；胚珠→种子；子房→果实。" },
                { type: "text", html: "<svg viewBox=\"0 0 340 150\" width=\"100%\" role=\"img\" aria-label=\"子房发育成果实示意\" style=\"max-width:430px;display:block;margin:6px auto\">" +
                  "<g font-size=\"13.6\" text-anchor=\"middle\">" +
                  "<rect x=\"30\" y=\"40\" width=\"90\" height=\"70\" rx=\"20\" style=\"fill:var(--bio-target);opacity:.35;stroke:var(--bio-membrane)\" stroke-width=\"1.5\"/>" +
                  "<circle cx=\"60\" cy=\"72\" r=\"9\" style=\"fill:var(--bio-gene)\"/><circle cx=\"88\" cy=\"84\" r=\"9\" style=\"fill:var(--bio-gene)\"/>" +
                  "<text x=\"75\" y=\"30\" style=\"fill:var(--bio-text)\">子房</text>" +
                  "<text x=\"52\" y=\"128\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">子房壁</text>" +
                  "<text x=\"98\" y=\"128\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">胚珠</text>" +
                  "<line x1=\"130\" y1=\"75\" x2=\"200\" y2=\"75\" style=\"stroke:var(--bio-organelle)\" stroke-width=\"3\"/>" +
                  "<polygon points=\"200,75 188,67 188,83\" style=\"fill:var(--bio-organelle)\"/>" +
                  "<text x=\"165\" y=\"62\" font-size=\"12.48\" style=\"fill:var(--bio-organelle)\">发育成</text>" +
                  "<rect x=\"220\" y=\"40\" width=\"90\" height=\"70\" rx=\"20\" style=\"fill:var(--bio-target);opacity:.55;stroke:var(--bio-membrane)\" stroke-width=\"1.5\"/>" +
                  "<ellipse cx=\"250\" cy=\"75\" rx=\"12\" ry=\"16\" style=\"fill:var(--bio-gene)\"/><ellipse cx=\"280\" cy=\"75\" rx=\"12\" ry=\"16\" style=\"fill:var(--bio-gene)\"/>" +
                  "<text x=\"265\" y=\"30\" style=\"fill:var(--bio-text)\">果实</text>" +
                  "<text x=\"242\" y=\"128\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">果皮</text>" +
                  "<text x=\"288\" y=\"128\" font-size=\"12.48\" style=\"fill:var(--bio-ink-soft)\">种子</text>" +
                  "</g>" +
                  "<text x=\"170\" y=\"144\" font-size=\"13.6\" text-anchor=\"middle\" style=\"fill:var(--bio-ink-soft)\">模式图：非等比、非实物</text>" +
                  "</svg>" },
                { type: "text", html: "读图：左边的\"壁\"变成右边的\"皮\"，左边的\"小圆点\"变成右边的\"种子\"。壁→皮，珠→子。" },
                { type: "note", text: "三问自查——子房壁变成什么？胚珠变成什么？子房变成什么？（答案：果皮/种子/果实）" }
              ],
              point: "子房壁→果皮，胚珠→种子，子房→果实。"
            }
          ]
        },
        {
          id: "b03.1.5",
          title: "光合与呼吸的联系",
          prereq: "开花结果",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：白天/夜晚 + B4 沙盘首立 ============ */
            {
              id: "b03.1.5-p1",
              kind: "explain",
              title: "白天与夜晚：两台机器",
              blocks: [
                { type: "lead", text: "白天、夜晚，植物体内的两台\"机器\"怎么分工？" },
                { type: "text", html: "白天有光：光合作用和呼吸作用同时进行，光合作用更强——制造的有机物多于消耗的，植物积累有机物、生长。" },
                { type: "text", html: "夜晚无光：只进行呼吸作用，消耗有机物。但\"夜间植物停止一切活动\"错——呼吸作用继续，生长主要在夜间！" },
                { type: "widget", widget: { type: "photosyn-sandbox", params: {
                  light: { min: 0, max: 100, step: 5, init: 60, unit: "相对值" },
                  co2: { min: 0, max: 100, step: 5, init: 40, unit: "相对值" },
                  temp: { min: 5, max: 40, step: 1, init: 25, unit: "℃" },
                  showCurve: true,
                  limitHint: true
                } } },
                { type: "text", html: "农业应用：合理密植（多见光）、温室补光 + 增施二氧化碳（补短板）、夜间适当降温（减弱呼吸作用、少消耗）。" },
                { type: "note", text: "动手：把光照拉满、CO₂调低，看\"当前短板\"徽章说什么；再把温度调到 40℃，看曲线怎么变。" }
              ],
              point: "白天光合更强，夜晚只进行呼吸作用。"
            },
            /* ============ p2：碳—氧平衡（纯文本预告） ============ */
            {
              id: "b03.1.5-p2",
              kind: "explain",
              title: "碳—氧平衡（预告）",
              blocks: [
                { type: "lead", text: "大气里的氧气和二氧化碳，为什么长期保持平衡？" },
                { type: "text", html: "碳—氧平衡：绿色植物的光合作用吸收二氧化碳、释放氧气；生物的呼吸作用吸收氧气、释放二氧化碳——大气中两种气体基本保持平衡。" },
                { type: "text", html: "纯文本预告：碳在生物群落和无机环境之间怎样循环往复——b24.3.3 细讲。" },
                { type: "text", html: "辨析③立靶：能量单向物循环（能量流动 b24.3.2 细讲、物质循环 b24.3.3 细讲——本章只立靶，不展开）。" },
                { type: "note", text: "本页两句话：碳—氧平衡是什么？辨析③口诀是什么？（口诀逐字：能量单向物循环）" }
              ],
              point: "碳—氧平衡；辨析③立靶：能量单向物循环。"
            }
          ]
        },
        {
          id: "b03.1.6",
          title: "本章小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            /* ============ p1：小结 + 习题（一） ============ */
            {
              id: "b03.1.6-p1",
              kind: "quiz",
              title: "小结与习题（一）",
              questions: [
                { type: "review", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:10px;margin:6px 0;background:var(--bio-panel)\"><b>b03.1.1 回查</b>：绿叶实验五步——暗处理→一半遮光→光照→酒精脱色→碘液检验；三原则：对照（遮光 vs 见光）、单一变量（光）、重复（多片叶）；结论两句：光是条件、产物含淀粉，不超范围。</div>" },
                { type: "review", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:10px;margin:6px 0;background:var(--bio-panel)\"><b>b03.1.2 回查</b>：四要素——原料（水 + 二氧化碳）、条件（光）、场所（叶绿体）、产物（有机物 + 氧气）；文字表达式：二氧化碳 + 水 → 有机物 + 氧气；实质：合成有机物、储存能量。</div>" },
                { type: "review", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:10px;margin:6px 0;background:var(--bio-panel)\"><b>b03.1.3 回查</b>：呼吸作用三证据——石灰水变浑浊、温度计上升、蜡烛熄灭；实质：分解有机物、释放能量；\"呼吸\"（肺通气）vs\"呼吸作用\"（细胞内氧化分解）；植物时刻都在进行呼吸作用。</div>" },
                { type: "review", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:10px;margin:6px 0;background:var(--bio-panel)\"><b>b03.1.4 回查</b>：主角——雄蕊（花药 + 花丝）、雌蕊（柱头 + 花柱 + 子房）；传粉是\"送到\"，受精是\"结合\"；子房壁→果皮、胚珠→种子、子房→果实。</div>" },
                { type: "review", html: "<div style=\"border:1px solid var(--bio-line);border-radius:10px;padding:10px;margin:6px 0;background:var(--bio-panel)\"><b>b03.1.5 回查</b>：白天光合更强、夜晚只进行呼吸作用；温室抓\"当前短板\"；农业应用：合理密植、补光 + 补二氧化碳、夜间降温；碳—氧平衡（b24.3.3 细讲）；辨析③立靶：能量单向物循环。</div>" },
                { type: "choice", stem: "绿叶实验中，\"一半遮光、一半见光\"的作用是？",
                  options: ["作为对照", "给叶片保温", "帮助酒精脱色", "让碘液显色更明显"], answer: 0,
                  tip: "对照组是\"参照物\"：没它，不知道变没变（b03.1.1 第 1 页）。" },
                { type: "choice", stem: "关于绿叶实验的结论，正确的是？",
                  options: ["证明光合作用的原料是二氧化碳和水", "证明光是绿叶制造有机物的条件、产物含淀粉", "证明氧气是光合作用的产物", "证明叶绿体是光合作用的场所"], answer: 1,
                  tip: "结论不超范围：只说两句，不许推出原料/场所（b03.1.1 第 3 页）。" },
                { type: "choice", stem: "\"夜间植物停止一切生命活动\"错在哪？",
                  options: ["夜晚植物不进行呼吸作用", "呼吸作用时刻都在进行，夜晚植物继续进行呼吸作用", "光合作用不需要光", "夜晚植物进行光合作用"], answer: 1,
                  tip: "夜晚无光：只进行呼吸作用；生长主要在夜间（b03.1.5 第 1 页）。" }
              ],
              point: "做完对答案：错的回对应页再看一遍。"
            },
            /* ============ p2：习题（二） ============ */
            {
              id: "b03.1.6-p2",
              kind: "quiz",
              title: "小结与习题（二）",
              questions: [
                { type: "choice", stem: "关于\"呼吸\"和\"呼吸作用\"，正确的是？",
                  options: ["呼吸就是呼吸作用", "呼吸是肺通气，呼吸作用是细胞内氧化分解", "呼吸作用就是植物在喘气", "呼吸作用只在晚上进行"], answer: 1,
                  tip: "一次分清：呼吸=\"喘气\"，呼吸作用=细胞里\"烧\"有机物（缓慢氧化）（b03.1.3 第 3 页）。" },
                { type: "choice", stem: "一朵花传粉受精后，子房壁和胚珠分别发育成？",
                  options: ["果皮/种子", "种子/果皮", "果肉/种皮", "果皮/果肉"], answer: 0,
                  tip: "一一对应：子房壁→果皮、胚珠→种子（b03.1.4 第 3 页）。" },
                { type: "choice", stem: "温室里光照充足，增施二氧化碳后增产了。这说明？",
                  options: ["二氧化碳是当前短板", "光照是增产的唯一原因", "温度越低产量越高", "呼吸作用停止了"], answer: 0,
                  tip: "抓\"当前短板\"，不说\"唯一原因\"（b03.1.5 第 1 页沙盘）。" },
                { type: "choice", stem: "大气中二氧化碳和氧气长期保持平衡，主要与哪两项有关？",
                  options: ["光合作用和呼吸作用", "蒸腾作用和吸收作用", "传粉和受精", "生长和繁殖"], answer: 0,
                  tip: "碳—氧平衡：光合作用吸收二氧化碳放氧气，呼吸作用反之（b03.1.5 第 2 页）。" }
              ],
              point: "全章完。"
            }
          ]
        }
      ]
    }
  ]
};
