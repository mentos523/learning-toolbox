/* ============================================================
 * 生物 SPA · 引擎渲染器（生物生产队 2026-10-17，试点 b18.1.3）
 *
 * 地位：docs/ENGINE.md §五迁移指南的课页层实现（对标化学
 * modules/chemistry/js/chem-bond.js 前例：生物侧渲染器 + Eng
 * 原语）。只在 widget params.type 为生物交互类型时被
 * js/biology.js 的 renderWidget 调用。
 *
 * 本文件实现的交互：
 * - "punnett-lab"（B5 分离比模拟实验室，见
 *   docs/biology-interactions.md §B5；冻结口径 B-F5；验收 W-B5/W-B7；
 *   用户拍板⑤不走 PeaLab 路线 + D3 解析推导扩展）：
 *   次数滑块模拟（10–5000，B-F5 默认）+ Punnett 方格点选填格
 *   （pairs:1 → 2×2 数格子得 3∶1；pairs:2 → 4×4 棋盘格拼搭得
 *   9∶3∶3∶1）；"大量统计的结果"徽章常驻不可关；实验三问徽章
 *   （对照→单一变量→重复）常驻；概率显示分式（MathML）+百分比；
 *   方格总数 = 4^pairs 程序化校验。纯 DOM 实现。
 * - "pedigree-quest"（B6 系谱判读闯关，见
 *   docs/biology-interactions.md §B6；冻结口径 B-F6；真值口径
 *   BIO-R23/R24/R25/R26/R60/R37/R07、BIO-AX01）：
 *   系谱渲染走 Eng.KonvaView（图=render(数据集)，ENG-64；
 *   dataSource 声明 ENG-65）；成员点选用 Eng.Input（tap 语义
 *   ENG-55、命中区 ≥44px ENG-56）；分步向导走 Eng.StepPlayer
 *   （分步不可跳 BIO-R23；每步一句话结论 YP-22；键盘 ←→/R；
 *   步前预测钩子 = D-C3"先手算"）。
 *
 * 真值：系谱数据（M1 冻结题库）只消费、不重算；冻结答案与图
 * 的一致性在渲染前按 pilot-b18.1.3-truth.md §六伪代码程序化
 * 校验（BIO-R25），不一致 → 可见错误态，不静默放行。
 * 基因型期望仅展示（渲染器不机判，B6 schema 无基因型答案字段）。
 *
 * - "experiment-3q"（B3 实验三问设计器，P7 首立 b03.1.1，见
 *   docs/biology-interactions.md §B3；冻结口径 B-F3；真值口径
 *   BIO-R12/R13/R14/R15）：对照→单一变量→重复三问点选（顺序冻结），
 *   答对出 ✓ 徽章、答错回放 thoughtExp 思想实验（不判错不扣分）；
 *   三问徽章常驻点展；answer 三索引渲染前程序化校验越界；
 *   记录走 localStorage（key 即 recordKey=bio_3q_<课号>）。纯 DOM 实现。
 * - "photosyn-sandbox"（B4 光合速率调控沙盘，P7 首立 b03.1.5，见
 *   docs/biology-interactions.md §B4；冻结口径 B-F4；真值口径
 *   BIO-R42/BIO-R70）：光/CO2/温度三滑块（±步进，轨道 ≥44px），
 *   速率 = f×g×h 三段饱和示意函数；纵轴一律相对值，常驻
 *   "相对值（非实测数据）"（删=FAIL）；"当前×是短板"徽章
 *   （不许写"唯一原因"）；Canvas 曲线描点（≤101 点），深色经
 *   liveViews 重绘（--bio-* 取色）。
 * - "cell-builder"（B1 细胞结构拼搭，P16 并行工作流交付，见
 *   docs/biology-interactions.md §B1；真值实现 assets/engine/
 *   cell-builder.js 的 Eng.CellBuilder，纯 DOM、零依赖）：
 *   本文件只做分发（引擎未加载时走可见错误态，不静默放行；
 *   params 非法时抛出的校验错误也转为可见错误态，ENG-66）。
 *   P15 的 window.BIO_B12 内联实现为行为基准（专家逐项核对一致），
 *   引擎版与之行为契约一致。
 *
 * - "enzyme-lab"（B10 酶条件实验室，P8 首立 b13.1.2，见
 *   docs/biology-interactions.md §B10；冻结口径 B-F10；真值口径
 *   BIO-R42 类推/BIO-R41）：温度/pH 双滑块（±步进，轨道 ≥44px）
 *   + 双钟形示意曲线（常驻"示意曲线（非实测数据）"，删=FAIL）
 *   + MathML 读数（相对活性=%）；"烫坏"态真锁死（temp≥60，
 *   调回 37℃ 不恢复）、"冻住"态可恢复（temp≤5/≥15）；锁钥
 *   配对小游戏（3 对，配错温和回弹，成功出专一性徽章 +
 *   T3 边界小字"结合时会微调（诱导契合）"）；双落点
 *   b13.1.2-p1（全开）/ b05.1.2-p3（锁钥段复用，tempLab:false）；
 *   记录走 localStorage（key 即 recordKey=bio_enzyme_<课号>）。
 *   纯 DOM + Canvas 实现，样式全内联（--bio-* 变量）。
 *
 * 命名空间隔离：只写 window.BIO_ENGINE；CSS 类名前缀 bio-；
 * localStorage 键 ltb-bio-b6-<qid>（file:// 禁用降级为内存）。
 * 不改 assets/engine/**；params 里不出现具体色值（Canvas 取色
 * 走 getComputedStyle 解析 --bio-*，回退 Okabe-Ito 字面值）。
 * ============================================================ */
(function () {
  "use strict";

  /* ---------------- 基础工具 ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "&lt;": "&lt;", "&gt;": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function flash(node) {
    if (!node || !node.classList) return;
    node.classList.remove("bio-flash");
    void node.offsetWidth;
    node.classList.add("bio-flash");
  }
  function vib(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }

  /* Canvas 取色：解析 --bio-* 主题变量（深色自动跟随）；无
   * getComputedStyle 时回退 Okabe-Ito 字面值（只在渲染器内部，
   * params 里永不出现色值）。 */
  var CSSVAR_FALLBACK = {
    "--bio-known": "#0072B2", "--bio-target": "#D55E00",
    "--bio-text": "#1A1A1A", "--bio-bg": "#FFFFFF",
    "--bio-membrane": "#1A1A1A", "--bio-highlight": "#F0E442"
  };
  function cssVar(name) {
    try {
      if (typeof window.getComputedStyle === "function") {
        var host = document.getElementById("biology-app") || document.body;
        var v = window.getComputedStyle(host).getPropertyValue(name);
        if (v && String(v).trim()) return String(v).trim();
      }
    } catch (e) {}
    return CSSVAR_FALLBACK[name] || "#222222";
  }
  function inkOn(colorHex) {
    /* 实心填充上的文字色：浅色主题用白，深色主题用近黑（对比度口径沿用物理 R3） */
    var dark = false;
    try { dark = document.body.getAttribute("data-theme") === "dark"; } catch (e) {}
    return dark ? "#1A1A1A" : "#FFFFFF";
  }

  /* localStorage（ltb-bio-b6-<qid>；file:// 禁用降级为内存） */
  var memStore = {};
  function b6load(qid) {
    try {
      var v = localStorage.getItem("ltb-bio-b6-" + qid);
      return v ? JSON.parse(v) : null;
    } catch (e) { return memStore[qid] || null; }
  }
  function b6save(qid, obj) {
    try { localStorage.setItem("ltb-bio-b6-" + qid, JSON.stringify(obj)); }
    catch (e) { memStore[qid] = obj; }
  }

  /* ---------------- BIO-R25：冻结答案与图的程序化校验 ----------------
   * 逐字实现 ~/workspace/bio-audit/pilot-b18.1.3-truth.md §六伪代码。
   * 返回 {ok:true} 或 {ok:false, reason}；reason 上页可见。 */
  function checkPedigree(pedigree) {
    var m = pedigree.members || [], a = pedigree.answer || {};
    function find(id) { for (var i = 0; i < m.length; i++) if (m[i].id === id) return m[i]; return null; }
    function isNormal(x) { return !x.affected; }
    function isAffected(x) { return !!x.affected; }
    var parents = m.filter(function (x) { return x.generation === 1; });
    var children = m.filter(function (x) { return x.generation === 2; });
    var father = null;
    for (var i = 0; i < parents.length; i++) if (parents[i].sex === "男") father = parents[i];
    var daughters = children.filter(function (x) { return x.sex === "女"; });
    if (!parents.length || !children.length) return { ok: false, reason: "系谱数据缺少亲代/子代成员" };
    if (!father) return { ok: false, reason: "系谱数据缺少父亲成员" };
    if (a.dominance === "隐性") {
      if (!(parents.every(isNormal) && children.some(isAffected)))
        return { ok: false, reason: "无中生有条件不满足：需要双亲正常、子代有患者" };
    } else if (a.dominance === "显性") {
      if (!(parents.every(isAffected) && children.some(isNormal)))
        return { ok: false, reason: "有中生无条件不满足：需要双亲患病、子代有正常" };
    } else {
      return { ok: false, reason: "answer.dominance 非法（只许显性/隐性）" };
    }
    if (a.location === "常染色体" && a.dominance === "隐性") {
      if (!(!isAffected(father) && daughters.some(isAffected)))
        return { ok: false, reason: "缺少父正女病排除式判据" };
    } else if (a.location === "常染色体" && a.dominance === "显性") {
      if (!(isAffected(father) && daughters.some(isNormal)))
        return { ok: false, reason: "缺少父病女正排除式判据" };
    } else if (a.location === "X染色体") {
      var males = m.filter(function (x) { return x.sex === "男" && x.affected; }).length;
      var females = m.filter(function (x) { return x.sex === "女" && x.affected; }).length;
      if (!((males - females) >= 2))
        return { ok: false, reason: "男性患者不明显多于女性（差值须 ≥2）" };
    } else {
      return { ok: false, reason: "answer.location 非法（只许常染色体/X染色体）" };
    }
    return { ok: true };
  }

  /* ---------------- B6 系谱渲染（Eng.KonvaView） ---------------- */
  var liveViews = []; /* {view, redraw}：主题切换时重绘 */
  function bioTheme() {
    try { return document.body.getAttribute("data-theme") === "dark" ? "dark" : "light"; }
    catch (e) { return "light"; }
  }

  /* V8 字号阶梯（px）：Konva.Text 字号取阶梯值，getAbsoluteScale=1 时
   * 渲染字号逐位落阶梯。{12.48,13.6,15.2,16,16.8,20,24} ±0.5 */
  var FS_ID = 15.2;    /* 成员内文字 男/女 */
  var FS_CAP = 13.6;   /* 编号/正常·患病/代际标注 */

  function renderPedigreeStage(container, pedigree, onMemberTap) {
    var W = Math.max(280, Math.min(560, container.clientWidth || 360));
    var H = Math.round(W * 0.62);
    container.style.width = W + "px";
    container.style.height = H + "px";
    var cid = container.id;
    var view = new window.Eng.KonvaView({
      containerId: cid,
      bounds: { xMin: 0, xMax: 100, yMin: 0, yMax: 62 },
      viewportWPx: W, viewportHPx: H,
      theme: bioTheme(),
      assumptions: ["系谱图为教学示意图，非真实家系", "成员按代际等距排布，不表示真实亲缘距离"],
      approximations: ["无数值计算"],
      errorEstimate: "静态示意图，无数值积分误差"
    });
    var members = pedigree.members || [];
    var dataset = window.Eng.deepCopy({ members: members });
    var hitZones = []; /* {id, cx, cy, r} 像素坐标，供 Eng.Input tap 命中 */

    function colors() {
      return {
        target: cssVar("--bio-target"), known: cssVar("--bio-known"),
        text: cssVar("--bio-text"), membrane: cssVar("--bio-membrane")
      };
    }
    function draw(ds, vw) {
      var C = colors();
      var layer = vw.layer;
      var w = vw.stage.width(), h = vw.stage.height();
      var y1 = h * 0.26, y2 = h * 0.74;
      var gen1 = ds.members.filter(function (x) { return x.generation === 1; });
      var gen2 = ds.members.filter(function (x) { return x.generation === 2; });
      hitZones = [];
      /* 代际标注（双编码：文字） */
      var t1 = new Konva.Text({ x: 6, y: y1 - FS_CAP / 2, text: "Ⅰ代", fontSize: FS_CAP, fill: C.text, fontFamily: "sans-serif" });
      var t2 = new Konva.Text({ x: 6, y: y2 - FS_CAP / 2, text: "Ⅱ代", fontSize: FS_CAP, fill: C.text, fontFamily: "sans-serif" });
      layer.add(t1); layer.add(t2);
      var r = Math.max(15, Math.min(19, w * 0.032)); /* 成员符号半径/半边长 */
      function memberXY(list, y) {
        var n = list.length, xs = [];
        for (var i = 0; i < n; i++) xs.push(w * 0.14 + (w * 0.72) * (n === 1 ? 0.5 : i / (n - 1)));
        return xs;
      }
      var x1s = memberXY(gen1, y1), x2s = memberXY(gen2, y2);
      /* 婚配线 + 子代线（示意线） */
      if (gen1.length >= 2) {
        var ln = new Konva.Line({ points: [x1s[0] + r, y1, x1s[x1s.length - 1] - r, y1], stroke: C.membrane, strokeWidth: 2 });
        layer.add(ln);
        var midX = (x1s[0] + x1s[x1s.length - 1]) / 2;
        var dropY = y2 - r - 26;
        layer.add(new Konva.Line({ points: [midX, y1, midX, dropY], stroke: C.membrane, strokeWidth: 2 }));
        layer.add(new Konva.Line({ points: [x2s[0], dropY, x2s[x2s.length - 1], dropY], stroke: C.membrane, strokeWidth: 2 }));
        for (var k = 0; k < x2s.length; k++)
          layer.add(new Konva.Line({ points: [x2s[k], dropY, x2s[k], y2 - r - 24], stroke: C.membrane, strokeWidth: 2 }));
      }
      function drawMember(mm, cx, cy) {
        var g = new Konva.Group({ x: cx, y: cy });
        var shape;
        if (mm.sex === "男") {
          shape = new Konva.Rect({ x: -r, y: -r, width: 2 * r, height: 2 * r });
        } else {
          shape = new Konva.Circle({ radius: r });
        }
        if (mm.affected) {
          shape.fill(C.target); shape.stroke(C.target);
        } else {
          shape.fill("rgba(0,0,0,0)"); shape.stroke(C.known); shape.strokeWidth(3);
        }
        g.add(shape);
        /* 双编码：形状 + "男/女"文字 */
        var gt = new Konva.Text({
          text: mm.sex, fontSize: FS_ID, fontFamily: "sans-serif",
          fill: mm.affected ? inkOn(C.target) : C.known,
          x: -r, y: -FS_ID / 2 - 1, width: 2 * r, align: "center"
        });
        g.add(gt);
        /* 编号 + 表型文字（双编码：颜色 + 文字） */
        var idt = new Konva.Text({
          text: mm.id, fontSize: FS_CAP, fontFamily: "sans-serif", fill: C.text,
          x: -r - 12, y: r + 5, width: 2 * r + 24, align: "center"
        });
        var st = new Konva.Text({
          text: mm.affected ? "患病" : "正常", fontSize: FS_CAP, fontFamily: "sans-serif",
          fill: mm.affected ? C.target : C.known,
          x: -r - 12, y: r + 5 + FS_CAP + 3, width: 2 * r + 24, align: "center"
        });
        g.add(idt); g.add(st);
        layer.add(g);
        /* ENG-56：命中区 ≥44px（视觉不足时自动外扩） */
        try { window.Eng.ensureHitArea(g); } catch (e) {}
        hitZones.push({ id: mm.id, cx: cx, cy: cy, r: Math.max(r + 6, 24) });
      }
      for (var i = 0; i < gen1.length; i++) drawMember(gen1[i], x1s[i], y1);
      for (var j = 0; j < gen2.length; j++) drawMember(gen2[j], x2s[j], y2);
    }

    view.renderDataset(dataset, draw, { kind: "schema", ref: "M1系谱题库审定版（生物真值口径队冻结）" });
    /* Eng.Input：tap 语义统一鼠标/触控（ENG-55） */
    var input = new window.Eng.Input(view);
    input.onTap = function (p) {
      if (!p) return;
      for (var i = 0; i < hitZones.length; i++) {
        var z = hitZones[i];
        if (Math.hypot(p.x - z.cx, p.y - z.cy) <= z.r) { onMemberTap(z.id); return; }
      }
    };
    var handle = {
      view: view,
      redraw: function () { view.setTheme(bioTheme()); view.redraw(); }
    };
    liveViews.push(handle);
    return handle;
  }

  /* ---------------- B6 分步向导（Eng.StepPlayer） ---------------- */
  /* 分步顺序冻结（B-F6）：显隐 → 常/性 → 基因型 */
  var STEP_NAMES = ["显隐", "常/性", "基因型"];
  var STEP_SUMMARIES = [
    "第1步完成：已定显隐——口诀只解决第一步，后面还要看图说话。",
    "第2步完成：已定常/性——顺序不能反，一步都不能跳。",
    "第3步完成：基因型已推断——携带者表型正常，但能传递致病基因。"
  ];
  var DOMINANCE_OPTS = ["显性", "隐性"];
  var LOCATION_OPTS = ["常染色体", "X染色体"];
  /* 冻结文案（B-F6/T15，逐字） */
  var MOTTO_1 = "无中生有是隐性", MOTTO_2 = "有中生无是显性";
  var MOTTO_TIP = "先看代际，再看口诀——口诀只解决\"定显隐\"第一步，不包办全程";
  var SCOPE_NOTE = "适用于孟德尔式单基因遗传系谱";
  var CARRIER_NOTE = "携带者表型正常，但能把致病基因传给后代";
  var DC3_WORDING = "先手算（自己按步骤判读）、提交后看自动校验对照";

  function renderPedigreeQuest(params, wid) {
    params = params || {};
    var pedigree = params.pedigree || { members: [], answer: {} };
    var qid = params.qid || wid;
    var geneExpect = params.geneExpect || [];
    var tips = params.tips || {};
    var scopeExtra = params.scopeExtra || null; /* Q3 典型特征推断声明 */
    /* B6 schema 参数（冻结默认值，见 B-F6；显式传入以便 schema 校验） */
    var showMotto = params.mottoCard !== false;
    var showCarrier = params.carrierNote !== false;
    var scopeText = params.scopeNote || SCOPE_NOTE;
    var focusStep = (typeof params.focusStep === "number") ? params.focusStep : null;

    var root = el("div", "bio-b6");
    root.setAttribute("data-qid", qid);

    /* BIO-R25：渲染前程序化校验冻结答案与图的一致性 */
    var chk = checkPedigree(pedigree);
    if (!chk.ok) {
      var err = el("div", "bio-b6-err", "⚠ 这道题的系谱数据有问题（" + esc(chk.reason) + "）——这道题暂时打不开。");
      root.appendChild(err);
      return root;
    }

    /* ---- 口诀卡（常驻；文字逐字冻结 B-F6） ---- */
    var motto, m1, m2;
    if (showMotto) {
      motto = el("div", "bio-motto", "");
      m1 = el("span", "bio-motto-s", MOTTO_1);
      m2 = el("span", "bio-motto-s", MOTTO_2);
      motto.appendChild(m1);
      motto.appendChild(document.createTextNode("，"));
      motto.appendChild(m2);
      root.appendChild(motto);
      root.appendChild(el("div", "bio-motto-tip", esc(MOTTO_TIP)));
    } else {
      m1 = el("span", ""); m2 = el("span", "");
    }
    var scopeLine = el("div", "bio-scope", esc(scopeText));
    if (scopeExtra) scopeLine.appendChild(el("span", "bio-scope-extra", " · " + esc(scopeExtra)));
    root.appendChild(scopeLine);

    /* ---- 系谱舞台 ---- */
    var stageBox = el("div", "bio-stage");
    stageBox.id = wid + "-stage";
    root.appendChild(stageBox);

    /* ---- 步骤条 ---- */
    var stepsBar = el("div", "bio-steps", "");
    var stepBtns = [];
    STEP_NAMES.forEach(function (nm, i) {
      var b = el("button", "bio-step", '<span class="bio-step-n">' + (i + 1) + "</span> " + esc(nm));
      b.type = "button";
      b.setAttribute("aria-label", "第" + (i + 1) + "步：" + nm);
      (function (idx) {
        b.addEventListener("click", function () { gotoStep(idx); });
      })(i);
      stepsBar.appendChild(b);
      stepBtns.push(b);
    });
    root.appendChild(stepsBar);

    /* ---- 步骤面板 / 反馈 / 基因型卡片 ---- */
    var panel = el("div", "bio-panel", "");
    var fb = el("div", "bio-fb", "");
    var gcard = el("div", "bio-gcard", "");
    gcard.style.display = "none";
    var doneBadge = el("div", "bio-done", "✓ 判读完成");
    doneBadge.style.display = "none";
    root.appendChild(panel);
    root.appendChild(gcard);
    root.appendChild(fb);
    root.appendChild(doneBadge);

    /* ---- 状态（Eng.StepPlayer 的 primitive：答题状态机） ---- */
    var saved = b6load(qid) || {};
    var state = {
      stepDone: saved.stepDone || [false, false, false],
      answers: saved.answers || [null, null, null],
      seenMembers: saved.seenMembers || {}
    };
    function persist() {
      b6save(qid, { stepDone: state.stepDone, answers: state.answers, seenMembers: state.seenMembers });
    }
    var prim = {
      _st: state,
      step: function (n) { /* 向导无仿真步进：状态由判读动作直接变更，此处为恒等步进 */ },
      reset: function () {
        state.stepDone = [false, false, false];
        state.answers = [null, null, null];
        state.seenMembers = {};
        persist();
      },
      snapshot: function () { return window.Eng.deepCopy(state); },
      restore: function (s) {
        state.stepDone = s.stepDone.slice(); state.answers = s.answers.slice();
        state.seenMembers = window.Eng.deepCopy(s.seenMembers || {});
        persist();
      },
      simTimeSec: function () { return 0; },
      stepCountN: function () { return 0; }
    };
    var player = null;
    try {
      player = new window.Eng.StepPlayer({
        primitive: prim,
        stepsPerFrame: 1,
        totalFrames: 3,
        stepSummaries: STEP_SUMMARIES,
        assumptions: ["分步判读状态机：状态变更只由学生判读动作触发", "判读的正确答案已先与图逐一核对一致"],
        approximations: ["无数值计算"],
        errorEstimate: "离散状态机，无数值误差",
        onFrame: function () { paintAll(); }
      });
    } catch (e) {
      var perr = el("div", "bio-b6-err", "⚠ 分步播放器初始化失败：" + esc(e.message));
      root.appendChild(perr);
      return root;
    }
    /* 恢复进度：已完成的步数 → 对应帧 */
    var doneCount = state.stepDone.filter(Boolean).length;
    if (doneCount > 0) player.gotoFrame(doneCount);
    player.bindKeys(root);

    function curStep() {
      for (var i = 0; i < 3; i++) if (!state.stepDone[i]) return i;
      return 3;
    }
    function gotoStep(i) {
      var cs = curStep();
      if (i > cs) {
        say(false, "先完成上一步，再进这一步。");
        return;
      }
      viewStep = (i === 3) ? 2 : i;
      paintAll();
    }
    /* focusStep：页级聚焦（如 p3 聚焦第 2 步）；只影响初始视图，
     * 不改变冻结顺序与阻塞规则（上一步未完成仍不可进）。 */
    var viewStep = Math.min(curStep(), 2);
    if (focusStep != null && focusStep >= 0 && focusStep <= 2 && focusStep <= curStep()) {
      viewStep = focusStep;
    }

    function say(ok, msg) {
      fb.innerHTML = (ok ? '<span class="ok">✓ </span>' : '<span class="bad">再想想：</span>') + esc(msg);
      flash(fb);
    }
    function paintSteps() {
      var cs = curStep();
      stepBtns.forEach(function (b, i) {
        b.classList.remove("done", "cur", "locked");
        var label = '<span class="bio-step-n">' + (i + 1) + "</span> " + esc(STEP_NAMES[i]);
        if (state.stepDone[i]) {
          b.classList.add("done");
          b.innerHTML = label + ' <span class="bio-step-ok">✓</span>';
          b.disabled = false; b.title = "已完成，点击回顾";
        } else if (i === cs) {
          b.classList.add("cur");
          b.innerHTML = label;
          b.disabled = false; b.title = "";
        } else {
          /* W2（2026-10-17 拍板 a）：锁定步骤不再 disabled——可点但拦截，
           * 点后提示"先完成上一步"（触屏无 hover 也可达）；aria-disabled
           * 保留无障碍语义，视觉仍置灰 + 🔒。 */
          b.classList.add("locked");
          b.innerHTML = label + ' <span class="bio-step-lock">🔒</span>';
          b.disabled = false;
          b.setAttribute("aria-disabled", "true");
          b.title = "先完成上一步";
        }
      });
    }
    function paintPanel() {
      panel.innerHTML = "";
      gcard.style.display = "none";
      var cs = curStep();
      if (cs >= 3) {
        panel.appendChild(el("div", "bio-panel-done", "三步全部完成——口诀、判据、基因型推断都已过关。"));
        doneBadge.style.display = "";
        return;
      }
      doneBadge.style.display = "none";
      var vs = viewStep;
      if (vs < cs) {
        /* 回顾已完成的步骤（只读） */
        var sum = el("div", "bio-panel-done", "✓ " + esc(STEP_SUMMARIES[vs]));
        panel.appendChild(sum);
        if (vs === 2) paintGcard(true);
        return;
      }
      /* 当前步骤：先手算 → 点选提交 */
      panel.appendChild(el("div", "bio-dc3", esc(DC3_WORDING)));
      if (cs === 0) {
        panel.appendChild(el("p", "bio-ask", "看第Ⅰ代和第Ⅱ代：用口诀定显隐。点\"显性\"或\"隐性\"。"));
        var opts0 = el("div", "bio-opts", "");
        DOMINANCE_OPTS.forEach(function (op) {
          var b = el("button", "bio-opt", esc(op));
          b.type = "button";
          b.addEventListener("click", function () { judgeDominance(op); });
          opts0.appendChild(b);
        });
        panel.appendChild(opts0);
      } else if (cs === 1) {
        panel.appendChild(el("p", "bio-ask", "显隐已定。再看判据：基因在常染色体上，还是 X 染色体上？"));
        if (scopeExtra) panel.appendChild(el("div", "bio-scope-inline", esc(scopeExtra)));
        var opts1 = el("div", "bio-opts", "");
        LOCATION_OPTS.forEach(function (op) {
          var b = el("button", "bio-opt", esc(op));
          b.type = "button";
          b.addEventListener("click", function () { judgeLocation(op); });
          opts1.appendChild(b);
        });
        panel.appendChild(opts1);
      } else {
        panel.appendChild(el("p", "bio-ask", "点系谱图里的成员，看基因型推断；点遍所有成员，闯关完成。"));
        paintProgress();
      }
    }
    function paintProgress() {
      var total = pedigree.members.length, seen = 0;
      pedigree.members.forEach(function (mm) { if (state.seenMembers[mm.id]) seen++; });
      var old = panel.querySelector(".bio-progress");
      if (old) old.remove();
      panel.appendChild(el("div", "bio-progress", "已查看 " + seen + " / " + total + " 位成员"));
      if (seen >= total && !state.stepDone[2]) {
        var fin = el("button", "bio-finish", "判读完成 ✓");
        fin.type = "button";
        fin.addEventListener("click", function () {
          state.stepDone[2] = true; state.answers[2] = "完成";
          persist(); player.next(); vib(10); paintAll();
        });
        panel.appendChild(fin);
      }
    }
    function paintGcard(readonly) {
      var total = pedigree.members.length, seen = 0;
      pedigree.members.forEach(function (mm) { if (state.seenMembers[mm.id]) seen++; });
      if (seen === 0 && !readonly) { gcard.style.display = "none"; return; }
      var html = "";
      pedigree.members.forEach(function (mm) {
        if (!state.seenMembers[mm.id]) return;
        var ge = null;
        for (var i = 0; i < geneExpect.length; i++) if (geneExpect[i].id === mm.id) ge = geneExpect[i];
        var gt = ge ? ge.text : "—";
        html += '<div class="bio-grow"><span class="bio-gid">' + esc(mm.id) + "</span>" +
          '<span class="bio-gsex">' + esc(mm.sex) + " · " + (mm.affected ? "患病" : "正常") + "</span>" +
          '<span class="bio-gt">基因型：' + esc(gt) + "</span>";
        if (ge && ge.carrier && showCarrier) html += '<span class="bio-carrier">' + esc(CARRIER_NOTE) + "</span>";
        html += "</div>";
      });
      if (!html) { gcard.style.display = "none"; return; }
      gcard.innerHTML = html;
      gcard.style.display = "";
    }
    function paintAll() {
      /* 保持用户当前查看的步骤；仅当其超出进度时才回落 */
      if (viewStep > curStep()) viewStep = Math.min(curStep(), 2);
      paintSteps();
      paintPanel();
      if (curStep() === 2) paintGcard(false);
    }

    function highlightMotto(which) {
      m1.classList.toggle("on", which === 1);
      m2.classList.toggle("on", which === 2);
    }
    function judgeDominance(op) {
      if (state.stepDone[0]) return;
      if (op === pedigree.answer.dominance) {
        state.stepDone[0] = true; state.answers[0] = op;
        persist(); player.next(); viewStep = Math.min(curStep(), 2);
        highlightMotto(op === "隐性" ? 1 : 2);
        say(true, "定显隐正确。" + STEP_SUMMARIES[0]);
        vib(10);
      } else {
        /* 全局铁律：不判错、不扣分，只给提示 */
        say(false, tips.dom || "再看看第Ⅱ代：代际之间出现了什么变化？");
      }
      paintAll();
    }
    function judgeLocation(op) {
      if (state.stepDone[1]) return;
      if (op === pedigree.answer.location) {
        state.stepDone[1] = true; state.answers[1] = op;
        persist(); player.next(); viewStep = Math.min(curStep(), 2);
        say(true, "定常/性正确。" + STEP_SUMMARIES[1]);
        vib(10);
      } else {
        say(false, tips.loc || "再想想排除式判据：父亲和女儿的表型组合，能排除哪一种？");
      }
      paintAll();
    }
    function onMemberTap(id) {
      if (curStep() !== 2) {
        say(false, "先完成上一步（定常/性），再来推基因型。");
        return;
      }
      var mm = null;
      for (var i = 0; i < pedigree.members.length; i++) if (pedigree.members[i].id === id) mm = pedigree.members[i];
      if (!mm) return;
      state.seenMembers[id] = true;
      persist();
      paintGcard(false);
      paintProgress();
      var last = gcard.querySelector(".bio-grow:last-child");
      if (last) flash(last);
      var total = pedigree.members.length, seen = 0;
      pedigree.members.forEach(function (x) { if (state.seenMembers[x.id]) seen++; });
      if (seen >= total && !state.stepDone[2]) {
        say(true, "所有成员都看过了——点\"判读完成\"，为这张图收官。");
      }
    }

    /* ---- 首屏绘制（等容器挂载后取宽） ---- */
    function initStage() {
      if (!stageBox.isConnected) {
        (window.requestAnimationFrame || function (f) { setTimeout(f, 16); })(initStage);
        return;
      }
      try {
        renderPedigreeStage(stageBox, pedigree, onMemberTap);
      } catch (e) {
        stageBox.appendChild(el("div", "bio-b6-err", "⚠ 系谱图渲染失败：" + esc(e.message)));
      }
    }
    initStage();
    /* 重置入口（长按步骤条？不——显式小字按钮，教学诚实） */
    var reset = el("button", "bio-reset", "重来");
    reset.type = "button";
    reset.setAttribute("aria-label", "重置本闯关进度");
    reset.addEventListener("click", function () {
      prim.reset(); player.resetAll(); player.gotoFrame(0);
      m1.classList.remove("on"); m2.classList.remove("on");
      fb.innerHTML = ""; paintAll();
    });
    root.appendChild(reset);

    paintAll();
    return root;
  }

  /* ---------------- B11 mitosis-stage（分裂时期辨认） ----------------
   * 见 docs/biology-interactions.md §B11；冻结口径 B-F11；真值口径
   * BIO-R32（模式图声明）/R66（制片步序冻结）/R67（安全徽章常驻）/
   * BIO-AX01（近似与适用条件显性化）。纯 DOM/SVG 步骤机 + 点选判定，
   * 不用 Konva（示意 SVG 足够，零性能风险）。
   * phases（按需组合，顺序即闯关顺序；各落点页只取需要的相位）：
   *  behavior  染色体行为直觉动画（复制→排队→分开→进两个细胞）
   *  compare   "数一数\"：分裂前后染色体数目对照（先猜后数，专治\"减半\"误区）
   *  prep      虚拟制片（步序冻结；跳过漂洗阻塞并提示冻结文案）
   *  lowpower  低倍找分生区（点选判定：排列紧密、近正方形）
   *  highpower 高倍认时期闯关（直觉动作先行，再对术语名）
   *  count     "间期最长\"计数器（柱状图：间期最高）
   *  meiosis   减数分裂联会—分离直觉动画（配对/交换/分开/再分开）
   *  difftree  分化树（一球多路：受精卵→肌/神经/红细胞）
   * localStorage 键 ltb-bio-b11-<qid>（file:// 禁用降级为内存）。
   * 锁定相位沿用 W2 裁决(a)：可点但拦截，点后提示\"先完成上一步"
   * （触屏无 hover 也可达）。 */
  var B11_PHASE_LABEL = {
    behavior: "看动作", compare: "数一数", prep: "制片", lowpower: "找分生区",
    highpower: "认时期", count: "数一数", meiosis: "看配对", difftree: "分化树"
  };
  var B11_PREP_DEFAULT = ["解离", "漂洗", "染色", "制片"];
  var B11_STAGES_DEFAULT = ["间期", "前期", "中期", "后期", "末期"];
  var B11_ACTIONS = ["复制", "排队", "分开", "进两个细胞"];
  var B11_DIAGRAM_NOTE = "模式图：非等比、非实物"; /* BIO-R32 冻结文案 */
  var B11_RINSE_TIP = "解离液会干扰染色，先漂洗！"; /* B-F11 冻结文案 */
  var b11Redraws = [];
  var b11mem = {};
  function b11load(qid) {
    try {
      var v = localStorage.getItem("ltb-bio-b11-" + qid);
      return v ? JSON.parse(v) : null;
    } catch (e) { return b11mem[qid] || null; }
  }
  function b11save(qid, obj) {
    try { localStorage.setItem("ltb-bio-b11-" + qid, JSON.stringify(obj)); }
    catch (e) { b11mem[qid] = obj; }
  }

  /* ---- SVG 小工具（示意 SVG；文字字号取 V8 阶梯 px 值） ---- */
  var B11_SVGNS = "http://www.w3.org/2000/svg";
  function b11svgEl(tag, attrs, text) {
    var n = document.createElementNS(B11_SVGNS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    if (text != null) n.textContent = text;
    return n;
  }
  function b11mkSvg(w, h) {
    var s = b11svgEl("svg", { viewBox: "0 0 " + w + " " + h, width: "100%" });
    s.style.display = "block";
    s.style.maxWidth = w + "px";
    s.style.height = "auto";
    s.setAttribute("role", "img");
    return s;
  }
  function b11pal() {
    return {
      gene: cssVar("--bio-gene"), known: cssVar("--bio-known"),
      target: cssVar("--bio-target"), aux: cssVar("--bio-aux"),
      text: cssVar("--bio-text"), membrane: cssVar("--bio-membrane"),
      hl: cssVar("--bio-highlight")
    };
  }
  function b11softFill(node) {
    try { node.style.fill = "var(--bio-ink-soft)"; } catch (e) { node.setAttribute("fill", "#777"); }
  }
  /* 角落常驻模式图声明（BIO-R32） */
  function b11diagramNote(svg, w, txt) {
    var t = b11svgEl("text", {
      x: w - 4, y: 15, "text-anchor": "end", "font-size": "12.48"
    }, txt || B11_DIAGRAM_NOTE);
    b11softFill(t);
    svg.appendChild(t);
    return t;
  }
  /* X 形染色体（姐妹染色单体） */
  function b11X(svg, cx, cy, s, color, lw) {
    var g = b11svgEl("g", {});
    g.appendChild(b11svgEl("line", { x1: cx - s, y1: cy - s, x2: cx + s, y2: cy + s, stroke: color, "stroke-width": lw || 3, "stroke-linecap": "round" }));
    g.appendChild(b11svgEl("line", { x1: cx + s, y1: cy - s, x2: cx - s, y2: cy + s, stroke: color, "stroke-width": lw || 3, "stroke-linecap": "round" }));
    svg.appendChild(g);
    return g;
  }
  /* 染色质丝（间期） */
  function b11chromatin(svg, x, y, w, color) {
    var d = "M " + x + " " + y;
    var segs = 5, sw = w / segs;
    for (var i = 0; i < segs; i++) {
      var x0 = x + i * sw;
      d += " q " + (sw / 2) + " " + (i % 2 ? 10 : -10) + " " + sw + " 0";
    }
    svg.appendChild(b11svgEl("path", { d: d, fill: "none", stroke: color, "stroke-width": 2.5 }));
  }
  function b11cellCircle(svg, cx, cy, r, P) {
    svg.appendChild(b11svgEl("circle", { cx: cx, cy: cy, r: r, fill: "none", stroke: P.membrane, "stroke-width": 2.5 }));
  }
  function b11svgText(svg, x, y, str, size, anchor) {
    var t = b11svgEl("text", {
      x: x, y: y, "font-size": String(size || 13.6),
      "text-anchor": anchor || "middle"
    }, str);
    try { t.style.fill = "var(--bio-text)"; } catch (e) {}
    svg.appendChild(t);
    return t;
  }
  function b11zoneBtn(g, label, onPick) {
    g.setAttribute("tabindex", "0");
    g.setAttribute("role", "button");
    g.setAttribute("aria-label", "选择" + label);
    function go() { onPick(); }
    g.addEventListener("click", go);
    g.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); go(); }
    });
  }

  /* ---- 高倍认时期：6 张卡真值（动作→术语；直觉版在前 B-F11） ---- */
  var B11_HP_CARDS = [
    { id: "c1", stage: "间期", action: "复制", variant: 1 },
    { id: "c2", stage: "前期", action: "排队", variant: 1 },
    { id: "c3", stage: "中期", action: "排队", variant: 1 },
    { id: "c4", stage: "后期", action: "分开", variant: 1 },
    { id: "c5", stage: "末期", action: "进两个细胞", variant: 1 },
    { id: "c6", stage: "间期", action: "复制", variant: 2 }
  ];
  var B11_ACTION_HINT = {
    "间期": "染色体还没登场（看不见 X 形）——它在忙着\"复制\"。",
    "前期": "染色体刚凝缩登场，正赶去中央——动作上是\"排队\"的开头。",
    "中期": "染色体整齐排在中央——这就是\"排队\"。",
    "后期": "姐妹染色单体正在分开、向两极走——\"分开\"。",
    "末期": "两个新细胞快形成了——染色体\"进两个细胞\"。"
  };
  /* 计数器数据：6 张图的正确判读分布（间期 2，其余各 1） */
  var B11_COUNT_DATA = [["间期", 2], ["前期", 1], ["中期", 1], ["后期", 1], ["末期", 1]];

  function b11drawCellStage(svg, card, P) {
    /* 240x200，细胞圆心 (120,100) r=54 */
    var cx = 120, cy = 100, r = 54;
    b11cellCircle(svg, cx, cy, r, P);
    var st = card.stage;
    if (st === "间期") {
      svg.appendChild(b11svgEl("circle", { cx: cx, cy: cy, r: 34, fill: "none", stroke: P.aux, "stroke-width": 1.5, "stroke-dasharray": "4 3" }));
      b11chromatin(svg, cx - 26, cy - 12, 52, P.gene);
      b11chromatin(svg, cx - 26, cy + 2, 52, P.gene);
      b11chromatin(svg, cx - 26, cy + 16, 52, P.gene);
      if (card.variant === 2) b11chromatin(svg, cx - 26, cy - 24, 52, P.gene);
    } else if (st === "前期") {
      b11X(svg, 95, 78, 9, P.gene); b11X(svg, 148, 74, 9, P.gene);
      b11X(svg, 98, 126, 9, P.gene); b11X(svg, 148, 130, 9, P.gene);
      svg.appendChild(b11svgEl("circle", { cx: cx, cy: cy - r - 6, r: 4, fill: P.aux }));
      svg.appendChild(b11svgEl("circle", { cx: cx, cy: cy + r + 6, r: 4, fill: P.aux }));
    } else if (st === "中期") {
      svg.appendChild(b11svgEl("line", { x1: cx, y1: cy - r + 4, x2: cx, y2: cy + r - 4, stroke: P.aux, "stroke-width": 1.5, "stroke-dasharray": "5 4" }));
      b11X(svg, cx, 66, 9, P.gene); b11X(svg, cx, 88, 9, P.gene);
      b11X(svg, cx, 112, 9, P.gene); b11X(svg, cx, 134, 9, P.gene);
    } else if (st === "后期") {
      var i, yy;
      for (i = 0; i < 4; i++) {
        yy = 62 + i * 10;
        svg.appendChild(b11svgEl("path", { d: "M " + (cx - 14) + " " + (yy + 8) + " L " + cx + " " + yy + " L " + (cx + 14) + " " + (yy + 8), fill: "none", stroke: P.gene, "stroke-width": 3, "stroke-linecap": "round" }));
      }
      for (i = 0; i < 4; i++) {
        yy = 138 - i * 10;
        svg.appendChild(b11svgEl("path", { d: "M " + (cx - 14) + " " + (yy - 8) + " L " + cx + " " + yy + " L " + (cx + 14) + " " + (yy - 8), fill: "none", stroke: P.gene, "stroke-width": 3, "stroke-linecap": "round" }));
      }
      svg.appendChild(b11svgEl("line", { x1: cx - 30, y1: cy - r, x2: cx - 8, y2: cy - 20, stroke: P.aux, "stroke-width": 1.5, "stroke-dasharray": "4 3" }));
      svg.appendChild(b11svgEl("line", { x1: cx + 30, y1: cy + r, x2: cx + 8, y2: cy + 20, stroke: P.aux, "stroke-width": 1.5, "stroke-dasharray": "4 3" }));
    } else if (st === "末期") {
      svg.appendChild(b11svgEl("circle", { cx: cx - 26, cy: cy, r: 34, fill: "none", stroke: P.membrane, "stroke-width": 2.5 }));
      svg.appendChild(b11svgEl("circle", { cx: cx + 26, cy: cy, r: 34, fill: "none", stroke: P.membrane, "stroke-width": 2.5 }));
      b11X(svg, cx - 26, cy - 12, 8, P.gene); b11X(svg, cx - 26, cy + 14, 8, P.gene);
      b11X(svg, cx + 26, cy - 12, 8, P.gene); b11X(svg, cx + 26, cy + 14, 8, P.gene);
    }
    b11diagramNote(svg, 240);
  }

  function renderMitosisStage(params, wid) {
    params = params || {};
    var rawPhases = params.phases || ["prep", "lowpower", "highpower", "count"];
    var phases = rawPhases.filter(function (p) { return !!B11_PHASE_LABEL[p]; });
    if (!phases.length) phases = ["prep", "lowpower", "highpower", "count"];
    var qid = params.qid || wid;
    var prepSteps = params.prepSteps || B11_PREP_DEFAULT.slice();
    /* B-R66/B-F11：步序冻结——顺序必须为 解离→漂洗→染色→制片 */
    var prepFrozen = ["解离", "漂洗", "染色", "制片"];
    var prepOK = prepSteps.length === 4 && prepFrozen.every(function (s, i) { return prepSteps[i] === s; });
    var safetyNote = params.safetyNote || "盐酸解离：戴手套操作，解离后必须漂洗";
    var diagramNote = params.diagramNote || B11_DIAGRAM_NOTE;
    var virtualNote = params.virtualNote || "虚拟实验：现实中须在老师指导下操作";
    var showSafety = params.showSafety !== false && phases.indexOf("prep") >= 0;
    var showVirtual = params.showVirtual !== false &&
      (phases.indexOf("prep") >= 0 || phases.indexOf("lowpower") >= 0 || phases.indexOf("highpower") >= 0);

    var root = el("div", "bio-b11");
    root.setAttribute("data-qid", qid);

    if (!prepOK) {
      root.appendChild(el("div", "bio-b6-err", "⚠ 制片步序不对（须为 解离→漂洗→染色→制片）——这道题暂时打不开。"));
      return root;
    }

    /* ---- 状态 ---- */
    var saved = b11load(qid) || {};
    var S = {
      phaseDone: saved.phaseDone || {},
      prepDone: saved.prepDone || [],
      lowDone: !!saved.lowDone,
      cards: saved.cards || {},
      guess: (saved.guess == null ? null : saved.guess),
      counted: saved.counted || {},
      branches: saved.branches || {},
      viewed: saved.viewed || {},
      curPhase: saved.curPhase || phases[0],
      hpCard: saved.hpCard || B11_HP_CARDS[0].id,
      hpStep: saved.hpStep || "action",
      step: (typeof saved.step === "number" ? saved.step : 0)
    };
    if (phases.indexOf(S.curPhase) < 0) S.curPhase = phases[0];
    function persist() {
      b11save(qid, {
        phaseDone: S.phaseDone, prepDone: S.prepDone, lowDone: S.lowDone,
        cards: S.cards, guess: S.guess, counted: S.counted,
        branches: S.branches, viewed: S.viewed, curPhase: S.curPhase,
        hpCard: S.hpCard, hpStep: S.hpStep, step: S.step
      });
    }

    /* ---- 安全徽章（BIO-R67：常驻交互区顶部，不随交互消失） ---- */
    if (showSafety) {
      var safe = el("div", "bio-b11-safe", "⚠ " + safetyNote);
      safe.setAttribute("role", "note");
      root.appendChild(safe);
    }

    /* ---- 相位步骤条（W2 口径：锁定可点拦截） ---- */
    var bar = el("div", "bio-steps", "");
    var phaseBtns = [];
    phases.forEach(function (ph, i) {
      var b = el("button", "bio-step", '<span class="bio-step-n">' + (i + 1) + "</span> " + esc(B11_PHASE_LABEL[ph]));
      b.type = "button";
      b.setAttribute("aria-label", "第" + (i + 1) + "步：" + B11_PHASE_LABEL[ph]);
      (function (p) { b.addEventListener("click", function () { gotoPhase(p); }); })(ph);
      bar.appendChild(b);
      phaseBtns.push(b);
    });
    root.appendChild(bar);

    var body = el("div", "bio-b11-body", "");
    var fb = el("div", "bio-fb", "");
    var doneBadge = el("div", "bio-done", "✓ 闯关完成");
    doneBadge.style.display = "none";
    root.appendChild(body);
    root.appendChild(fb);
    root.appendChild(doneBadge);

    function say(ok, msg) {
      fb.innerHTML = (ok ? '<span class="ok">✓ </span>' : '<span class="bad">再想想：</span>') + esc(msg);
      flash(fb);
    }
    function phasePos() {
      for (var i = 0; i < phases.length; i++) if (!S.phaseDone[phases[i]]) return i;
      return phases.length;
    }
    function gotoPhase(ph) {
      var pos = phasePos();
      var idx = phases.indexOf(ph);
      if (idx > pos) { say(false, "先完成上一步，再进这一步。"); return; }
      S.curPhase = ph; persist();
      renderPhase();
    }
    function paintBar() {
      var pos = phasePos();
      phaseBtns.forEach(function (b, i) {
        var ph = phases[i];
        b.classList.remove("done", "cur", "locked");
        b.removeAttribute("aria-disabled");
        var label = '<span class="bio-step-n">' + (i + 1) + "</span> " + esc(B11_PHASE_LABEL[ph]);
        if (S.phaseDone[ph]) {
          b.classList.add("done");
          b.innerHTML = label + ' <span class="bio-step-ok">✓</span>';
          b.title = "已完成，点击回顾";
        } else if (i === pos && S.curPhase === ph) {
          b.classList.add("cur");
          b.innerHTML = label;
          b.title = "";
        } else if (i <= pos) {
          b.innerHTML = label;
          b.title = "点击查看";
        } else {
          b.classList.add("locked");
          b.innerHTML = label + ' <span class="bio-step-lock">🔒</span>';
          b.setAttribute("aria-disabled", "true");
          b.title = "先完成上一步";
        }
        if (S.curPhase === ph) b.setAttribute("aria-current", "true");
        else b.removeAttribute("aria-current");
      });
      var allDone = pos >= phases.length;
      doneBadge.style.display = allDone ? "" : "none";
    }
    function finishPhase(ph) {
      if (!S.phaseDone[ph]) {
        S.phaseDone[ph] = true;
        persist();
      }
      paintBar();
      var pos = phasePos();
      if (pos < phases.length) {
        var nb = el("button", "bio-finish", "下一步 →");
        nb.type = "button";
        nb.addEventListener("click", function () {
          S.curPhase = phases[pos]; persist();
          renderPhase();
        });
        return nb;
      }
      return null;
    }
    function badgeRow(txt) {
      return el("div", "bio-b11-badgerow",
        '<span class="bio-b11-badge">' + esc(txt) + "</span>");
    }
    function optBtn(label, fn) {
      var b = el("button", "bio-opt", esc(label));
      b.type = "button";
      b.addEventListener("click", fn);
      return b;
    }

    /* ============ 相位：behavior（染色体行为直觉动画） ============ */
    var BEHAVIOR_STEPS = [
      { t: "复制", cap: "间期：染色体先\"复印\"一份——\"复印\"指染色体数目复制（半保留机制见 b19.1.2，直觉版）。" },
      { t: "排队", cap: "中期：染色体排到细胞中央（赤道板）——最整齐，最适合数数目。" },
      { t: "分开", cap: "后期：姐妹染色单体分开，向两极移动。" },
      { t: "进两个细胞", cap: "末期：把复印好的染色体\"平分\"给两个细胞——\"平分\"指染色体平均分配，所以数目不变！" }
    ];
    function drawBehavior(svg, idx, P) {
      var cx = 150, cy = 95, r = 62;
      if (idx === 0) {
        b11cellCircle(svg, 70, cy, 40, P);
        b11chromatin(svg, 44, cy - 14, 52, P.gene);
        b11chromatin(svg, 44, cy + 2, 52, P.gene);
        svg.appendChild(b11svgEl("line", { x1: 122, y1: cy, x2: 168, y2: cy, stroke: P.aux, "stroke-width": 2, "marker-end": "none" }));
        b11svgText(svg, 145, cy - 10, "复印", 13.6);
        b11cellCircle(svg, 225, cy, 40, P);
        b11X(svg, 212, cy - 14, 8, P.gene); b11X(svg, 240, cy - 14, 8, P.gene);
        b11X(svg, 212, cy + 14, 8, P.gene); b11X(svg, 240, cy + 14, 8, P.gene);
      } else if (idx === 1) {
        b11cellCircle(svg, cx, cy, r, P);
        svg.appendChild(b11svgEl("line", { x1: cx, y1: cy - r + 4, x2: cx, y2: cy + r - 4, stroke: P.aux, "stroke-width": 1.5, "stroke-dasharray": "5 4" }));
        b11X(svg, cx, 62, 9, P.gene); b11X(svg, cx, 86, 9, P.gene);
        b11X(svg, cx, 110, 9, P.gene); b11X(svg, cx, 134, 9, P.gene);
      } else if (idx === 2) {
        b11cellCircle(svg, cx, cy, r, P);
        var i;
        for (i = 0; i < 3; i++) {
          var yy = 66 + i * 12;
          svg.appendChild(b11svgEl("path", { d: "M " + (cx - 16) + " " + (yy + 9) + " L " + cx + " " + yy + " L " + (cx + 16) + " " + (yy + 9), fill: "none", stroke: P.gene, "stroke-width": 3, "stroke-linecap": "round" }));
        }
        for (i = 0; i < 3; i++) {
          var y2 = 124 + i * 0;
          svg.appendChild(b11svgEl("path", { d: "M " + (cx - 16) + " " + (y2 - 9 + i * 12) + " L " + cx + " " + (y2 + i * 12) + " L " + (cx + 16) + " " + (y2 - 9 + i * 12), fill: "none", stroke: P.gene, "stroke-width": 3, "stroke-linecap": "round" }));
        }
      } else {
        b11cellCircle(svg, 105, cy, 44, P);
        b11cellCircle(svg, 195, cy, 44, P);
        b11X(svg, 92, cy - 14, 8, P.gene); b11X(svg, 118, cy - 14, 8, P.gene);
        b11X(svg, 92, cy + 14, 8, P.gene); b11X(svg, 118, cy + 14, 8, P.gene);
        b11X(svg, 182, cy - 14, 8, P.gene); b11X(svg, 208, cy - 14, 8, P.gene);
        b11X(svg, 182, cy + 14, 8, P.gene); b11X(svg, 208, cy + 14, 8, P.gene);
        b11svgText(svg, 105, cy + 66, "4 条", 13.6);
        b11svgText(svg, 195, cy + 66, "4 条", 13.6);
      }
      b11diagramNote(svg, 300, diagramNote);
    }
    function renderBehavior() {
      body.appendChild(badgeRow("直觉版：只看动作，时期术语第 3 页再认"));
      var wrap = el("div", "bio-b11-svgwrap", "");
      body.appendChild(wrap);
      var cap = el("p", "bio-b11-cap", "");
      body.appendChild(cap);
      var dots = el("div", "bio-steps", "");
      var dotBtns = [];
      BEHAVIOR_STEPS.forEach(function (s, i) {
        var b = el("button", "bio-step", '<span class="bio-step-n">' + (i + 1) + "</span> " + esc(s.t));
        b.type = "button";
        b.addEventListener("click", function () { S.step = i; persist(); paint(); });
        dots.appendChild(b); dotBtns.push(b);
      });
      body.appendChild(dots);
      var nav = el("div", "bio-opts", "");
      var prev = optBtn("← 上一步", function () { S.step = Math.max(0, S.step - 1); persist(); paint(); });
      var next = optBtn("下一步 →", function () { S.step = Math.min(3, S.step + 1); persist(); paint(); });
      nav.appendChild(prev); nav.appendChild(next);
      body.appendChild(nav);
      body.appendChild(el("div", "bio-b11-note", "示意：非真实速度/比例。" + (showVirtual ? virtualNote : "")));
      var conc = el("div", "bio-b11-conc", "");
      body.appendChild(conc);
      function paint() {
        wrap.innerHTML = "";
        var P = b11pal();
        var svg = b11mkSvg(300, 190);
        drawBehavior(svg, S.step, P);
        wrap.appendChild(svg);
        cap.textContent = BEHAVIOR_STEPS[S.step].cap;
        dotBtns.forEach(function (b, i) {
          b.classList.toggle("cur", i === S.step);
          b.classList.toggle("done", !!S.viewed["b" + i]);
        });
        S.viewed["b" + S.step] = true; persist();
        prev.disabled = S.step === 0;
        next.disabled = S.step === 3;
        var seen = [0, 1, 2, 3].every(function (i) { return S.viewed["b" + i]; });
        conc.innerHTML = "";
        if (seen) {
          conc.appendChild(el("div", "bio-panel-done", "✓ 四步看完：先复印、再平分——分裂前后染色体数目不变。下一页数一数验证。"));
          var nb = finishPhase("behavior");
          if (nb) conc.appendChild(nb);
        }
      }
      paint();
    }

    /* ============ 相位：compare（数一数：分裂前后对照） ============ */
    function drawCompareBefore(svg, P) {
      b11cellCircle(svg, 120, 85, 52, P);
      b11X(svg, 100, 70, 9, P.gene); b11X(svg, 140, 70, 9, P.gene);
      b11X(svg, 100, 102, 9, P.gene); b11X(svg, 140, 102, 9, P.gene);
      b11svgText(svg, 120, 165, "分裂前：1 个细胞", 13.6);
      b11diagramNote(svg, 240);
    }
    function drawCompareAfter(svg, P) {
      b11cellCircle(svg, 72, 85, 40, P);
      b11X(svg, 60, 72, 8, P.gene); b11X(svg, 86, 72, 8, P.gene);
      b11X(svg, 60, 100, 8, P.gene); b11X(svg, 86, 100, 8, P.gene);
      b11cellCircle(svg, 168, 85, 40, P);
      b11X(svg, 156, 72, 8, P.gene); b11X(svg, 182, 72, 8, P.gene);
      b11X(svg, 156, 100, 8, P.gene); b11X(svg, 182, 100, 8, P.gene);
      b11svgText(svg, 120, 165, "分裂后：2 个子细胞", 13.6);
      b11diagramNote(svg, 240);
    }
    function renderCompare() {
      body.appendChild(badgeRow("直觉版：数一数，验证\"先复印、再平分\""));
      body.appendChild(el("p", "bio-ask", "先猜一猜：分裂后，每个子细胞的染色体是变多、变少，还是不变？（只记录，不判对错）"));
      var grow = el("div", "bio-opts", "");
      ["变多", "变少", "不变"].forEach(function (g) {
        var b = optBtn(g, function () {
          S.guess = g; persist(); paintGuess();
          say(true, "已记录你的预测：" + g + "——数完再看对不对。");
        });
        if (S.guess === g) b.classList.add("cur");
        grow.appendChild(b);
      });
      body.appendChild(grow);
      function paintGuess() {
        Array.prototype.forEach.call(grow.children, function (b) {
          b.classList.toggle("cur", b.textContent === S.guess);
        });
      }
      var panels = el("div", "bio-opts", "");
      [["before", "分裂前"], ["after", "分裂后"]].forEach(function (pp) {
        var key = pp[0], label = pp[1];
        var card = el("div", "bio-b11-countcard", "");
        var wrap = el("div", "bio-b11-svgwrap", "");
        var P = b11pal();
        var svg = b11mkSvg(240, 175);
        if (key === "before") drawCompareBefore(svg, P); else drawCompareAfter(svg, P);
        wrap.appendChild(svg);
        card.appendChild(wrap);
        var n = el("div", "bio-b11-barnum", S.counted[key] ? "4 条" : "？");
        card.appendChild(n);
        var b = optBtn(S.counted[key] ? "已数过 ✓" : "数一数：" + label, function () {
          S.counted[key] = 4; persist(); paint();
          say(true, label + "：4 条染色体。");
        });
        card.appendChild(b);
        panels.appendChild(card);
      });
      body.appendChild(panels);
      body.appendChild(el("div", "bio-b11-note", "示意：以 4 条染色体为例（人的体细胞为 46 条）。" + diagramNote + "。"));
      var conc = el("div", "bio-b11-conc", "");
      body.appendChild(conc);
      function paint() {
        var cards = panels.children;
        for (var i = 0; i < cards.length; i++) {
          var key = i === 0 ? "before" : "after";
          var num = cards[i].querySelector(".bio-b11-barnum");
          var btn = cards[i].querySelector(".bio-opt");
          if (S.counted[key]) { num.textContent = "4 条"; btn.textContent = "已数过 ✓"; }
        }
        conc.innerHTML = "";
        if (S.counted.before && S.counted.after) {
          var t = "分裂前 4 条，分裂后每个子细胞 4 条——数目不变！因为间期已经\"复印\"过。";
          if (S.guess) t += "（你猜的是\"" + S.guess + "\"，数出来是\"不变\"。）";
          conc.appendChild(el("div", "bio-panel-done", "✓ " + t));
          conc.appendChild(el("div", "bio-trap", "⚠ 别搞混：分裂后染色体\"减半\"？间期已复制，子细胞染色体数目不变！"));
          var nb = finishPhase("compare");
          if (nb) conc.appendChild(nb);
        } else if (!S.guess) {
          conc.appendChild(el("div", "bio-b11-note", "先猜一猜，再点\"数一数\"。"));
        }
      }
      paint();
    }

    /* ============ 相位：prep（虚拟制片） ============ */
    var PREP_DONE_TEXT = {
      "解离": "✓ 解离完成：盐酸让根尖细胞相互分离开。",
      "漂洗": "✓ 漂洗完成：洗掉解离液，染色才染得上。",
      "染色": "✓ 染色完成：染色体被染成深色，看得见了。",
      "制片": "✓ 制片完成：盖上盖玻片，压成薄薄一层。"
    };
    function renderPrep() {
      var list = el("div", "bio-opts", "");
      prepSteps.forEach(function (s, i) {
        var b = optBtn(s, function () { doPrep(i); });
        b.setAttribute("data-prep", s);
        list.appendChild(b);
      });
      body.appendChild(list);
      var prog = el("div", "bio-progress", "");
      body.appendChild(prog);
      var conc = el("div", "bio-b11-conc", "");
      body.appendChild(conc);
      if (showVirtual) body.appendChild(el("div", "bio-b11-note", virtualNote + "。"));
      function paint() {
        var btns = list.children;
        for (var i = 0; i < btns.length; i++) {
          var done = S.prepDone.indexOf(prepSteps[i]) >= 0;
          btns[i].classList.toggle("cur", done);
          btns[i].textContent = done ? "✓ " + prepSteps[i] : prepSteps[i];
        }
        prog.textContent = "制片进度：" + S.prepDone.length + " / 4 步";
        conc.innerHTML = "";
        if (S.prepDone.length >= 4) {
          conc.appendChild(el("div", "bio-panel-done", "✓ 制片完成——解离液不洗掉，染色染不上：规范就是结论的一部分。"));
          var nb = finishPhase("prep");
          if (nb) conc.appendChild(nb);
        }
      }
      function doPrep(i) {
        var s = prepSteps[i];
        if (S.prepDone.indexOf(s) >= 0) { say(true, PREP_DONE_TEXT[s]); return; }
        var nextIdx = 0;
        while (nextIdx < prepSteps.length && S.prepDone.indexOf(prepSteps[nextIdx]) >= 0) nextIdx++;
        if (i === nextIdx) {
          S.prepDone.push(s); persist(); paint();
          say(true, PREP_DONE_TEXT[s]);
          vib(10);
        } else if (s === "染色" && S.prepDone.indexOf("漂洗") < 0) {
          say(false, B11_RINSE_TIP);
        } else {
          say(false, "按顺序来：先完成「" + prepSteps[nextIdx] + "」。");
        }
      }
      paint();
    }

    /* ============ 相位：lowpower（低倍找分生区） ============ */
    function renderLowpower() {
      body.appendChild(el("p", "bio-ask", "低倍镜下有三个区域：点一点，哪个是分生区？（细胞小、排列紧密、近正方形）"));
      var wrap = el("div", "bio-b11-svgwrap", "");
      var P = b11pal();
      var svg = b11mkSvg(360, 250);
      var zones = [
        { id: "meristem", label: "甲区", ok: true },
        { id: "elongation", label: "乙区", ok: false },
        { id: "mature", label: "丙区", ok: false }
      ];
      var zw = 120;
      zones.forEach(function (z, zi) {
        var g = b11svgEl("g", {});
        var x0 = zi * zw;
        g.appendChild(b11svgEl("rect", { x: x0 + 2, y: 30, width: zw - 4, height: 190, fill: "none", stroke: P.membrane, "stroke-width": 2, rx: 6 }));
        var py;
        if (z.id === "meristem") {
          for (var r = 0; r < 6; r++) for (var c = 0; c < 4; c++) {
            g.appendChild(b11svgEl("rect", {
              x: x0 + 10 + c * 26, y: 44 + r * 28, width: 22, height: 24,
              fill: "none", stroke: P.known, "stroke-width": 1.5
            }));
          }
        } else if (z.id === "elongation") {
          for (var c2 = 0; c2 < 3; c2++) for (var r2 = 0; r2 < 3; r2++) {
            g.appendChild(b11svgEl("rect", {
              x: x0 + 10 + c2 * 36, y: 44 + r2 * 58, width: 32, height: 54,
              fill: "none", stroke: P.known, "stroke-width": 1.5
            }));
          }
        } else {
          for (var c3 = 0; c3 < 2; c3++) for (var r3 = 0; r3 < 2; r3++) {
            var bx = x0 + 12 + c3 * 56, by = 48 + r3 * 88;
            g.appendChild(b11svgEl("rect", { x: bx, y: by, width: 48, height: 80, fill: "none", stroke: P.known, "stroke-width": 1.5 }));
            g.appendChild(b11svgEl("circle", { cx: bx + 24, cy: by + 40, r: 16, fill: "none", stroke: P.aux, "stroke-width": 1.5 }));
          }
        }
        b11svgText(g, x0 + zw / 2, 24, z.label, 13.6);
        svg.appendChild(g);
        b11zoneBtn(g, z.label, function () { pickZone(z); });
      });
      b11diagramNote(svg, 360, diagramNote);
      wrap.appendChild(svg);
      body.appendChild(wrap);
      if (showVirtual) body.appendChild(el("div", "bio-b11-note", virtualNote + "。"));
      var conc = el("div", "bio-b11-conc", "");
      body.appendChild(conc);
      function paint() {
        conc.innerHTML = "";
        if (S.lowDone) {
          conc.appendChild(el("div", "bio-panel-done", "✓ 找对了：甲区细胞小、排列紧密、近正方形——这就是分生区（分裂旺盛）。"));
          var nb = finishPhase("lowpower");
          if (nb) conc.appendChild(nb);
        }
      }
      function pickZone(z) {
        if (S.lowDone) { say(true, "甲区就是分生区：细胞小、排列紧密、近正方形。"); return; }
        if (z.ok) {
          S.lowDone = true; persist(); paint();
          say(true, "找对了！甲区细胞小而排列紧密——分生区在此。");
          vib(10);
        } else {
          say(false, "分生区的细胞小而排列紧密——再找找。");
        }
      }
      paint();
    }

    /* ============ 相位：highpower（高倍认时期闯关） ============ */
    function renderHighpower() {
      body.appendChild(badgeRow("直觉版在前：先认动作（复制/排队/分开/进两个细胞），再对术语名"));
      var cardWrap = el("div", "bio-b11-svgwrap", "");
      body.appendChild(cardWrap);
      var ask = el("p", "bio-ask", "");
      body.appendChild(ask);
      var opts = el("div", "bio-opts", "");
      body.appendChild(opts);
      var prog = el("div", "bio-progress", "");
      body.appendChild(prog);
      var conc = el("div", "bio-b11-conc", "");
      body.appendChild(conc);
      function curCard() {
        for (var i = 0; i < B11_HP_CARDS.length; i++) {
          var c = B11_HP_CARDS[i];
          var st = S.cards[c.id];
          if (!st || !st.t) return c;
        }
        return null;
      }
      function paint() {
        var c = curCard();
        cardWrap.innerHTML = ""; opts.innerHTML = ""; ask.textContent = "";
        var doneN = B11_HP_CARDS.filter(function (x) { return S.cards[x.id] && S.cards[x.id].t; }).length;
        prog.textContent = "认时期：" + doneN + " / 6 张";
        conc.innerHTML = "";
        if (!c) {
          var svg = b11mkSvg(240, 60);
          b11svgText(svg, 120, 36, "6 张图全认对 ✓", 15.2);
          cardWrap.appendChild(svg);
          conc.appendChild(el("div", "bio-panel-done", "✓ 6 张图全认对——直觉动作和术语都对上了。"));
          var nb = finishPhase("highpower");
          if (nb) conc.appendChild(nb);
          return;
        }
        var P = b11pal();
        var cs = b11mkSvg(240, 200);
        b11drawCellStage(cs, c, P);
        cardWrap.appendChild(cs);
        var st = S.cards[c.id] || {};
        if (!st.a) {
          S.hpStep = "action";
          ask.textContent = "第 " + (doneN + 1) + " 张：它在做什么？（先认动作）";
          B11_ACTIONS.forEach(function (a) {
            opts.appendChild(optBtn(a, function () {
              if (a === c.action) {
                S.cards[c.id] = { a: a }; S.hpStep = "term"; persist(); paint();
                say(true, "动作对了：" + a + "——再对术语名。");
              } else {
                say(false, B11_ACTION_HINT[c.stage]);
              }
            }));
          });
        } else {
          S.hpStep = "term";
          ask.textContent = "动作是\"" + st.a + "\"：它叫什么时期？（再对术语）";
          B11_STAGES_DEFAULT.forEach(function (t) {
            opts.appendChild(optBtn(t, function () {
              if (t === c.stage) {
                S.cards[c.id] = { a: st.a, t: t }; persist(); paint();
                say(true, "✓ 这张是\"" + t + "\"（动作：" + st.a + "）。");
                vib(10);
              } else {
                say(false, "动作是\"" + st.a + "\"：术语是间期/前期/中期/后期/末期中的哪一个？");
              }
            }));
          });
        }
        persist();
      }
      paint();
      b11Redraws.push({ qid: qid, redraw: function () { renderPhase(); } });
    }

    /* ============ 相位：count（间期最长计数器） ============ */
    function renderCount() {
      body.appendChild(el("p", "bio-ask", "6 张图的时期都认对了：数一数各时期几张，看谁最高。"));
      var chart = el("div", "bio-b11-bar", "");
      var maxN = 2;
      B11_COUNT_DATA.forEach(function (d) {
        var col = el("div", "bio-b11-barcol", "");
        var num = el("div", "bio-b11-barnum", String(d[1]));
        var fill = el("div", "bio-b11-barfill", "");
        fill.style.height = (d[1] / maxN * 110) + "px";
        if (d[0] === "间期") fill.style.background = "var(--bio-target)";
        var lab = el("div", "bio-b11-barlab", d[0]);
        col.appendChild(num); col.appendChild(fill); col.appendChild(lab);
        chart.appendChild(col);
      });
      body.appendChild(chart);
      body.appendChild(el("div", "bio-b11-note", "按 6 张图的正确判读统计；柱高 + 数字双编码。"));
      var conc = el("div", "bio-b11-conc", "");
      body.appendChild(conc);
      conc.appendChild(el("div", "bio-panel-done", "✓ 间期柱最高——间期最长：视野里\"中期细胞最多\"是错觉。"));
      conc.appendChild(el("div", "bio-b11-note", "细胞数量之比 ≈ 时长之比（大量统计才准；本课只有 6 张图，是示意）。"));
      var nb = finishPhase("count");
      if (nb) conc.appendChild(nb);
      else conc.appendChild(el("div", "bio-panel-done", "✓ 本页闯关完成。"));
    }

    /* ============ 相位：meiosis（减数分裂联会—分离直觉动画） ============ */
    var MEIOSIS_STEPS = [
      { t: "配对", cap: "联会：同源染色体两两配对。" },
      { t: "交换片段", cap: "交叉互换：同源染色体的非姐妹染色单体交换片段。" },
      { t: "分开", cap: "减数第一次分裂：同源染色体分离，分别进入两个细胞——染色体数目减半。" },
      { t: "再分一次", cap: "减数第二次分裂：姐妹染色单体分开，形成 4 个子细胞（配子）。" }
    ];
    function drawMeiosis(svg, idx, P) {
      function rod(x, y, len, color, vertical) {
        if (vertical) svg.appendChild(b11svgEl("rect", { x: x - 6, y: y - len / 2, width: 12, height: len, rx: 6, fill: color }));
        else svg.appendChild(b11svgEl("rect", { x: x - len / 2, y: y - 6, width: len, height: 12, rx: 6, fill: color }));
      }
      if (idx === 0) {
        rod(110, 100, 90, P.known, true);
        rod(210, 100, 90, P.gene, true);
        b11svgText(svg, 110, 165, "父方", 13.6); b11svgText(svg, 210, 165, "母方", 13.6);
        svg.appendChild(b11svgEl("line", { x1: 140, y1: 100, x2: 180, y2: 100, stroke: P.aux, "stroke-width": 2, "stroke-dasharray": "5 4" }));
        b11svgText(svg, 160, 88, "配对", 13.6);
      } else if (idx === 1) {
        rod(150, 100, 90, P.known, true);
        rod(172, 100, 90, P.gene, true);
        svg.appendChild(b11svgEl("line", { x1: 150, y1: 70, x2: 172, y2: 110, stroke: P.hl, "stroke-width": 3 }));
        svg.appendChild(b11svgEl("line", { x1: 172, y1: 70, x2: 150, y2: 110, stroke: P.hl, "stroke-width": 3 }));
        b11svgText(svg, 161, 140, "交换片段", 13.6);
      } else if (idx === 2) {
        b11cellCircle(svg, 95, 100, 52, P);
        b11cellCircle(svg, 225, 100, 52, P);
        b11X(svg, 95, 100, 12, P.known);
        b11X(svg, 225, 100, 12, P.gene);
        b11svgText(svg, 95, 172, "n 减半", 13.6); b11svgText(svg, 225, 172, "n 减半", 13.6);
      } else {
        var xs = [55, 130, 205, 280], i;
        for (i = 0; i < 4; i++) {
          b11cellCircle(svg, xs[i] - 20 + 20, 100, 34, P);
          svg.appendChild(b11svgEl("line", { x1: xs[i], y1: 84, x2: xs[i], y2: 116, stroke: i % 2 ? P.gene : P.known, "stroke-width": 4, "stroke-linecap": "round" }));
        }
        b11svgText(svg, 160, 172, "4 个配子", 13.6);
      }
      b11diagramNote(svg, 320, diagramNote);
    }
    function renderMeiosis() {
      body.appendChild(badgeRow("直觉版：先看懂配对→交换→分开的动作"));
      body.appendChild(el("div", "bio-b11-def",
        "先认词——同源染色体：形态、大小相同，一条来自父方、一条来自母方；" +
        "联会：同源染色体两两配对；四分体：联会后，每对同源染色体含有 4 条染色单体。"));
      var wrap = el("div", "bio-b11-svgwrap", "");
      body.appendChild(wrap);
      var cap = el("p", "bio-b11-cap", "");
      body.appendChild(cap);
      var dots = el("div", "bio-steps", "");
      var dotBtns = [];
      MEIOSIS_STEPS.forEach(function (s, i) {
        var b = el("button", "bio-step", '<span class="bio-step-n">' + (i + 1) + "</span> " + esc(s.t));
        b.type = "button";
        b.addEventListener("click", function () { S.step = i; persist(); paint(); });
        dots.appendChild(b); dotBtns.push(b);
      });
      body.appendChild(dots);
      var nav = el("div", "bio-opts", "");
      var prev = optBtn("← 上一步", function () { S.step = Math.max(0, S.step - 1); persist(); paint(); });
      var next = optBtn("下一步 →", function () { S.step = Math.min(3, S.step + 1); persist(); paint(); });
      nav.appendChild(prev); nav.appendChild(next);
      body.appendChild(nav);
      body.appendChild(el("div", "bio-b11-note", "示意：非真实速度/比例。" + diagramNote + "。"));
      var conc = el("div", "bio-b11-conc", "");
      body.appendChild(conc);
      function paint() {
        wrap.innerHTML = "";
        var P = b11pal();
        var svg = b11mkSvg(320, 185);
        drawMeiosis(svg, S.step, P);
        wrap.appendChild(svg);
        cap.textContent = MEIOSIS_STEPS[S.step].cap;
        dotBtns.forEach(function (b, i) {
          b.classList.toggle("cur", i === S.step);
          b.classList.toggle("done", !!S.viewed["m" + i]);
        });
        S.viewed["m" + S.step] = true; persist();
        prev.disabled = S.step === 0;
        next.disabled = S.step === 3;
        conc.innerHTML = "";
        if ([0, 1, 2, 3].every(function (i) { return S.viewed["m" + i]; })) {
          conc.appendChild(el("div", "bio-panel-done", "✓ 四步看完：复制一次、分裂两次——配子染色体数目减半。"));
          var nb = finishPhase("meiosis");
          if (nb) conc.appendChild(nb);
        }
      }
      paint();
    }

    /* ============ 相位：difftree（分化树：一球多路） ============ */
    var DIFFTREE_BRANCHES = [
      { id: "muscle", label: "肌细胞", desc: "长梭形，能收缩——组成肌肉，负责运动。" },
      { id: "neuron", label: "神经细胞", desc: "有突起，能传导兴奋——组成神经系统。" },
      { id: "rbc", label: "红细胞", desc: "圆饼形、无核，能运输氧气——血液的\"搬运工\"。" }
    ];
    function renderDifftree() {
      body.appendChild(badgeRow("动手：点受精卵，再点每条路，看终点细胞"));
      var wrap = el("div", "bio-b11-svgwrap", "");
      var P = b11pal();
      var svg = b11mkSvg(320, 250);
      svg.appendChild(b11svgEl("circle", { cx: 160, cy: 52, r: 26, fill: "none", stroke: P.target, "stroke-width": 3 }));
      b11svgText(svg, 160, 57, "受精卵", 13.6);
      var bx = [60, 160, 260];
      DIFFTREE_BRANCHES.forEach(function (br, i) {
        svg.appendChild(b11svgEl("line", { x1: 160, y1: 80, x2: bx[i], y2: 160, stroke: P.aux, "stroke-width": 2 }));
        var g = b11svgEl("g", {});
        g.appendChild(b11svgEl("circle", { cx: bx[i], cy: 190, r: 30, fill: "none", stroke: S.branches[br.id] ? P.known : P.membrane, "stroke-width": 2.5 }));
        b11svgText(g, bx[i], 195, br.label, 13.6);
        svg.appendChild(g);
        b11zoneBtn(g, br.label, function () { openBranch(br); });
      });
      b11diagramNote(svg, 320, diagramNote);
      wrap.appendChild(svg);
      body.appendChild(wrap);
      var card = el("div", "bio-b11-conc", "");
      body.appendChild(card);
      var conc = el("div", "bio-b11-conc", "");
      body.appendChild(conc);
      function openBranch(br) {
        S.branches[br.id] = true; persist();
        card.innerHTML = "";
        card.appendChild(el("div", "bio-b11-def",
          "✓ " + br.label + "：" + br.desc + "基因选择性表达：不同细胞表达了不同的基因（机制见 b19，纯文本）。"));
        say(true, "一条路走通：" + br.label + "。");
        paint();
      }
      function paint() {
        var n = DIFFTREE_BRANCHES.filter(function (br) { return S.branches[br.id]; }).length;
        conc.innerHTML = "";
        if (n >= 3) {
          conc.appendChild(el("div", "bio-panel-done", "✓ 三条路走完：同一个受精卵，基因选择性表达，走出不同的路——这就是分化。"));
          conc.appendChild(el("div", "bio-b11-note", "受精卵全能性最高；分化程度越高，全能性一般越低（植物组织培养见 b25.1.2，纯文本）。"));
          var nb = finishPhase("difftree");
          if (nb) conc.appendChild(nb);
        } else {
          conc.appendChild(el("div", "bio-progress", "已走 " + n + " / 3 条路"));
        }
      }
      paint();
    }

    /* ---- 相位分发 ---- */
    function renderPhase() {
      body.innerHTML = "";
      var ph = S.curPhase;
      if (ph === "behavior") renderBehavior();
      else if (ph === "compare") renderCompare();
      else if (ph === "prep") renderPrep();
      else if (ph === "lowpower") renderLowpower();
      else if (ph === "highpower") renderHighpower();
      else if (ph === "count") renderCount();
      else if (ph === "meiosis") renderMeiosis();
      else if (ph === "difftree") renderDifftree();
      paintBar();
    }

    /* ---- 重来（两终态之二：完成态 / 重置态） ---- */
    var reset = el("button", "bio-reset", "重来");
    reset.type = "button";
    reset.setAttribute("aria-label", "重置本闯关进度");
    reset.addEventListener("click", function () {
      S.phaseDone = {}; S.prepDone = []; S.lowDone = false; S.cards = {};
      S.guess = null; S.counted = {}; S.branches = {}; S.viewed = {};
      S.curPhase = phases[0]; S.hpCard = B11_HP_CARDS[0].id; S.hpStep = "action"; S.step = 0;
      persist(); fb.innerHTML = ""; renderPhase();
    });
    root.appendChild(reset);

    /* 主题切换重绘（按 qid 去重注册；重渲染当前相位，状态保留） */
    (function () {
      for (var i = 0; i < b11Redraws.length; i++) {
        if (b11Redraws[i].qid === qid) { b11Redraws[i].redraw = function () { renderPhase(); }; return; }
      }
      b11Redraws.push({ qid: qid, redraw: function () { renderPhase(); } });
    })();

    renderPhase();
    return root;
  }

/* ============================================================
 * B5 · punnett-lab（分离比模拟实验室）—— 生物 P2 首立（2026-10-17）
 *
 * 落点：b17.1.2（性状分离比的模拟）、b17.1.3（自由组合定律）。
 * 依据：docs/biology-interactions.md §B5；验收 W-B5/W-B7；
 * 冻结 B-F5；用户拍板⑤（不走 PeaLab"配子叙述+大样本计数+
 * 卡方"路线，保持自研）+ D3 扩展（解析概率推导页：Punnett
 * 2×2 数格子，不引入概率定义、零数学前置）。
 *
 * mode: "sim"（模拟区）/ "grid"（方格区）/ "both"（都渲染）。
 * pairs: 1 → 2×2（3∶1）；2 → 4×4（9∶3∶3∶1）。
 * 方格总数 = 4^pairs 程序化校验（W-B7），不一致 → 可见错误态。
 * statBadge（"大量统计的结果"）常驻不可关（B-F5）；
 * 实验三问徽章（对照→单一变量→重复）常驻（W-B5）。
 * 概率显示：分式（MathML）+ 百分比文字（W-B7/W-B16）。
 * 4×4 在 390px 下横向滚动兜底（W-B7）；全部热区 ≥44px。
 * 纯 DOM，无 Konva；主题色走 --bio-* CSS 变量（深色自动跟随）。
 * ============================================================ */
function parseAllele(label) {
  var m = String(label || "").match(/[\(\（]([A-Za-z])[\)\）]/);
  return m ? m[1] : "";
}
function shortName(label) {
  return String(label || "").replace(/[\(\（][A-Za-z][\)\）]/g, "");
}
function renderPunnettLab(params, wid) {
  var pairs = params.pairs === 2 ? 2 : 1;
  var mode = params.mode === "grid" ? "grid" : params.mode === "both" ? "both" : "sim";
  var T = params.trials || {};
  var tmin = T.min != null ? T.min : 10, tmax = T.max != null ? T.max : 5000;
  var tstep = T.step != null ? T.step : 10, tinit = T.init != null ? T.init : 100;
  var showRatio = params.showRatio !== false;
  /* statBadge 冻结常驻（B-F5）：params 传 false 也不关 */
  var root = el("div", "bio-b5");
  root.setAttribute("data-qid", params.qid || wid || "bio-b5");
  root.setAttribute("data-pairs", String(pairs));

  /* ---------- 方格总数 = 4^pairs 程序化校验（W-B7） ---------- */
  function gridTruth() {
    if (pairs === 1) {
      var dL = parseAllele((params.alleles || {}).dom) || "D";
      var rL = parseAllele((params.alleles || {}).rec) || "d";
      var gs = [dL, rL], cells = [];
      for (var r = 0; r < 2; r++) for (var c = 0; c < 2; c++) {
        var a = gs[r], b = gs[c];
        var gt = (a === dL || b === dL) ? (a === dL && b === dL ? dL + dL : dL + rL) : rL + rL;
        cells.push({ row: a, col: b, gt: gt, dom: gt !== rL + rL });
      }
      return { gametes: gs, cells: cells, dL: dL, rL: rL };
    }
    var tA = params.traitA || params.alleles || {}, tB = params.traitB || params.alleles2 || {};
    var Ad = parseAllele(tA.dom) || "Y", Ar = parseAllele(tA.rec) || "y";
    var Bd = parseAllele(tB.dom) || "R", Br = parseAllele(tB.rec) || "r";
    var gs2 = [Ad + Bd, Ad + Br, Ar + Bd, Ar + Br], cells2 = [];
    for (var i = 0; i < 4; i++) for (var j = 0; j < 4; j++) {
      var g1 = gs2[i], g2 = gs2[j];
      var hasA = g1.charAt(0) === Ad || g2.charAt(0) === Ad;
      var hasB = g1.charAt(1) === Bd || g2.charAt(1) === Bd;
      var cls = (hasA ? 0 : 2) + (hasB ? 0 : 1); /* 0 黄圆 1 黄皱 2 绿圆 3 绿皱 */
      cells2.push({ row: g1, col: g2, cls: cls });
    }
    return { gametes: gs2, cells: cells2, clsNames: [
      shortName(tA.dom) + shortName(tB.dom), shortName(tA.dom) + shortName(tB.rec),
      shortName(tA.rec) + shortName(tB.dom), shortName(tA.rec) + shortName(tB.rec)] };
  }
  var truth = gridTruth();
  var expectCells = Math.pow(4, pairs);
  if (truth.cells.length !== expectCells) {
    return el("div", "bio-b5-err",
      "⚠ 这道题的数据有问题：方格数 " + truth.cells.length + " ≠ 4^" + pairs + "，暂时打不开。");
  }

  /* ---------- 常驻徽章：大量统计的结果（B-F5，不可关） ---------- */
  var badge = el("div", "bio-b5-statbadge",
    "<span class=\"bio-b5-statbadge-t\">📊 大量统计的结果</span>" +
    "<span class=\"bio-b5-statbadge-s\">次数越多，越接近理论比</span>");
  root.appendChild(badge);

  /* ---------- 模拟区 ---------- */
  function fracHTML(num, den) {
    return "<math><mfrac><mn>" + num + "</mn><mn>" + den + "</mn></mfrac></math>";
  }
  function pct(n, N) { return "约 " + Math.round(n / N * 100) + "%"; }
  function buildSim() {
    var box = el("section", "bio-b5-sim");
    box.appendChild(el("h4", "bio-b5-h", "模拟：抓小球"));
    /* 实验三问徽章（W-B5）：对照 → 单一变量 → 重复 */
    var q = el("div", "bio-b5-3q");
    var theory = pairs === 1 ? "3∶1" : "9∶3∶3∶1";
    var answers = [
      ["对照", "方格推导的 " + theory + " 就是\"对照尺\"——模拟跑出的比例，要和它比一比。"],
      ["单一变量", "只改次数（10→100→1000），亲本组合、小球抓法都不变。"],
      ["重复", "1000 次多跑几轮：轮轮都接近理论比；10 次多跑几轮：轮轮都不一样。"]
    ];
    answers.forEach(function (qa, i) {
      var chip = el("button", "bio-b5-3q-chip", (i + 1) + "·" + qa[0]);
      chip.setAttribute("type", "button");
      chip.setAttribute("aria-expanded", "false");
      var ans = el("div", "bio-b5-3q-ans", esc(qa[1]));
      ans.hidden = true;
      chip.addEventListener("click", function () {
        ans.hidden = !ans.hidden;
        chip.setAttribute("aria-expanded", String(!ans.hidden));
      });
      var wrap = el("span", "bio-b5-3q-item");
      wrap.appendChild(chip); wrap.appendChild(ans);
      q.appendChild(wrap);
      if (i < 2) q.appendChild(el("span", "bio-b5-3q-arrow", "→"));
    });
    box.appendChild(q);
    box.appendChild(el("p", "bio-b5-desc",
      pairs === 1
        ? "甲、乙两个袋子，各装一半 D 小球、一半 d 小球；各抓 1 个 = 1 次\"Dd×Dd 杂交\"。"
        : "甲、乙两个袋子，各装 YR、Yr、yR、yr 四种小球各 1/4；各抓 1 个 = 1 次\"YyRr×YyRr 杂交\"。"));

    var n = tinit;
    var row = el("div", "bio-b5-sliderow");
    var minus = el("button", "bio-b5-stepbtn", "−"); minus.setAttribute("type", "button");
    var plus = el("button", "bio-b5-stepbtn", "+"); plus.setAttribute("type", "button");
    var range = el("input", "bio-b5-range");
    range.setAttribute("type", "range");
    range.setAttribute("min", tmin); range.setAttribute("max", tmax);
    range.setAttribute("step", tstep); range.value = n;
    range.setAttribute("aria-label", "模拟次数");
    var nlab = el("span", "bio-b5-n", "次数 = " + n);
    function sync() {
      n = parseInt(range.value, 10);
      nlab.textContent = "次数 = " + n;
    }
    range.addEventListener("input", sync);
    minus.addEventListener("click", function () {
      range.value = Math.max(tmin, parseInt(range.value, 10) - tstep); sync();
    });
    plus.addEventListener("click", function () {
      range.value = Math.min(tmax, parseInt(range.value, 10) + tstep); sync();
    });
    row.appendChild(minus); row.appendChild(range); row.appendChild(plus); row.appendChild(nlab);
    box.appendChild(row);

    var run = el("button", "bio-b5-run", "跑 " + n + " 次");
    run.setAttribute("type", "button");
    range.addEventListener("input", function () { run.textContent = "跑 " + range.value + " 次"; });
    minus.addEventListener("click", function () { run.textContent = "跑 " + range.value + " 次"; });
    plus.addEventListener("click", function () { run.textContent = "跑 " + range.value + " 次"; });
    box.appendChild(run);

    var out = el("div", "bio-b5-out");
    box.appendChild(out);
    function pick2(gs) {
      return [gs[(Math.random() * gs.length) | 0], gs[(Math.random() * gs.length) | 0]];
    }
    run.addEventListener("click", function () {
      var N = parseInt(range.value, 10), counts;
      if (pairs === 1) {
        var dL = truth.dL, rL = truth.rL, dom = 0;
        for (var i = 0; i < N; i++) {
          var g = pick2(truth.gametes);
          if (g[0] === dL || g[1] === dL) dom++;
        }
        counts = [dom, N - dom];
      } else {
        counts = [0, 0, 0, 0];
        var Ad2 = parseAllele((params.traitA || {}).dom) || "Y";
        var Bd2 = parseAllele((params.traitB || {}).dom) || "R";
        for (var k = 0; k < N; k++) {
          var gg = pick2(truth.gametes);
          var hasA = gg[0].charAt(0) === Ad2 || gg[1].charAt(0) === Ad2;
          var hasB = gg[0].charAt(1) === Bd2 || gg[1].charAt(1) === Bd2;
          counts[(hasA ? 0 : 2) + (hasB ? 0 : 1)]++;
        }
      }
      out.innerHTML = "";
      if (showRatio) {
        var names = pairs === 1
          ? [shortName((params.alleles || {}).dom), shortName((params.alleles || {}).rec)]
          : truth.clsNames;
        counts.forEach(function (c, idx) {
          var line = el("div", "bio-b5-line" + (pairs === 1 ? (idx === 0 ? " is-dom" : " is-rec") : " is-c" + idx));
          var tag = pairs === 1 ? (idx === 0 ? "显" : "隐") : String(idx + 1);
          line.innerHTML = "<span class=\"bio-b5-tag\">" + esc(tag) + "</span>" +
            "<span class=\"bio-b5-nm\">" + esc(names[idx]) + "</span>" +
            "<span class=\"bio-b5-ct\">" + c + " / " + N + "</span> " +
            fracHTML(c, N) + "<span class=\"bio-b5-pc\">" + pct(c, N) + "</span>";
          out.appendChild(line);
        });
        var rb = el("div", "bio-b5-ratio",
          "理论比 " + theory + "（方格推导） vs 本轮实测——数字自己会说话。");
        out.appendChild(rb);
      }
      if (N >= 1000) {
        out.appendChild(el("div", "bio-b5-close",
          "✓ 接近 " + theory + "（大量统计的结果）——再跑一轮，还是这么稳。"));
      } else {
        out.appendChild(el("div", "bio-b5-far",
          "次数还少，比例会乱跳——拖到 1000 再看。"));
      }
      flash(out);
      vib(15);
    });
    return box;
  }

  /* ---------- 方格区（解析推导 / 棋盘格拼搭） ---------- */
  function buildGrid() {
    var box = el("section", "bio-b5-grid");
    box.appendChild(el("h4", "bio-b5-h",
      pairs === 1 ? "解析：数格子" : "拼搭：9∶3∶3∶1 棋盘格"));
    box.appendChild(el("p", "bio-b5-desc",
      pairs === 1
        ? "行、列都是配子（D / d）。先选手算：点一个基因型（基因型=遗传组成的写法，如 Dd），再点格子填进去；填完点\"提交对照\"。"
        : "行、列都是配子（YR / Yr / yR / yr）。先选手算：点一类表现型（表现型=看得见的性状，如高茎），再点格子填进去；填完点\"提交对照\"。"));
    if (pairs === 2) {
      box.appendChild(el("p", "bio-b5-scope",
        "边界：9∶3∶3∶1 只在\"独立遗传\"时成立——有例外一来，比例就变（第 3 页辨析）。"));
    }
    var chips, chipVal = null;
    if (pairs === 1) {
      chips = [truth.dL + truth.dL, truth.dL + truth.rL, truth.rL + truth.rL];
    } else {
      chips = truth.clsNames.slice();
    }
    var chipRow = el("div", "bio-b5-chips");
    chips.forEach(function (c) {
      var b = el("button", "bio-b5-chip", esc(c));
      b.setAttribute("type", "button");
      b.addEventListener("click", function () {
        chipVal = c;
        var all = chipRow.querySelectorAll(".bio-b5-chip");
        for (var i = 0; i < all.length; i++) all[i].setAttribute("aria-pressed", "false");
        b.setAttribute("aria-pressed", "true");
      });
      chipRow.appendChild(b);
    });
    box.appendChild(chipRow);
    box.appendChild(el("p", "bio-b5-d3",
      "先手算（自己按配子组合填）、提交后看自动校验对照。"));

    var wrap = el("div", "bio-b5-gridwrap");
    var table = el("table", "bio-b5-table");
    var gs = truth.gametes, size = gs.length;
    var head = el("tr", null, "<th></th>");
    for (var c = 0; c < size; c++) head.appendChild(el("th", null, esc(gs[c])));
    table.appendChild(head);
    var cellBtns = [];
    for (var r = 0; r < size; r++) {
      var tr = el("tr", null);
      tr.appendChild(el("th", null, esc(gs[r])));
      for (var cc = 0; cc < size; cc++) {
        (function (ri, ci) {
          var td = el("td", null);
          var b = el("button", "bio-b5-cell", "·");
          b.setAttribute("type", "button");
          b.setAttribute("aria-label", "第" + (ri + 1) + "行第" + (ci + 1) + "列");
          b.addEventListener("click", function () {
            if (!chipVal) {
              hint("先点上面的基因型/表现型，再点格子填。");
              return;
            }
            b.textContent = chipVal;
            b.setAttribute("data-fill", chipVal);
            b.classList.add("filled");
            hint("");
            updateCount();
          });
          td.appendChild(b);
          tr.appendChild(td);
          cellBtns.push(b);
        })(r, cc);
      }
      table.appendChild(tr);
    }
    wrap.appendChild(table);
    box.appendChild(wrap);

    var hintLine = el("div", "bio-b5-hint");
    function hint(t) { hintLine.textContent = t || ""; }
    box.appendChild(hintLine);
    var cntLine = el("div", "bio-b5-count", "已填 0 / " + expectCells + " 格");
    box.appendChild(cntLine);
    function updateCount() {
      var n = 0;
      for (var i = 0; i < cellBtns.length; i++) if (cellBtns[i].getAttribute("data-fill")) n++;
      cntLine.textContent = "已填 " + n + " / " + expectCells + " 格";
    }
    var submit = el("button", "bio-b5-submit", "提交对照");
    submit.setAttribute("type", "button");
    var verdict = el("div", "bio-b5-verdict");
    box.appendChild(submit);
    box.appendChild(verdict);
    submit.addEventListener("click", function () {
      var filled = 0, wrong = 0;
      for (var i = 0; i < cellBtns.length; i++) {
        var b = cellBtns[i], f = b.getAttribute("data-fill");
        if (!f) continue;
        filled++;
        var t = truth.cells[i];
        var okFill = pairs === 1 ? (f === t.gt) : (truth.clsNames[t.cls] === f);
        if (okFill) {
          b.classList.add("ok");
          b.classList.remove("bad");
          if (pairs === 1) {
            b.classList.add(t.dom ? "is-dom" : "is-rec");
          } else {
            b.classList.add("is-c" + t.cls);
          }
        } else {
          wrong++;
          b.classList.add("bad");
          b.classList.remove("ok");
        }
      }
      if (filled < expectCells) {
        hint("还有空格子没填——填满再提交。");
        return;
      }
      if (wrong > 0) {
        hint("有 " + wrong + " 格不对：再想想配子怎么组合。不扣分，改对为止。");
        verdict.innerHTML = "";
        return;
      }
      hint("");
      var html;
      if (pairs === 1) {
        var dName = shortName((params.alleles || {}).dom), rName = shortName((params.alleles || {}).rec);
        html = "<span class=\"bio-b5-tag\">显</span> " + esc(dName) + " 3 格 " + fracHTML(3, 4) +
          "<span class=\"bio-b5-pc\">约 75%</span>　<span class=\"bio-b5-tag\">隐</span> " +
          esc(rName) + " 1 格 " + fracHTML(1, 4) + "<span class=\"bio-b5-pc\">约 25%</span>" +
          "<div class=\"bio-b5-conc\">数格子：显性∶隐性 = 3∶1 —— 方格里的 3∶1，就是模拟器里跑出来的 3∶1。</div>";
      } else {
        html = truth.clsNames.map(function (nm, i) {
          var exp = [9, 3, 3, 1][i];
          return "<div class=\"bio-b5-line is-c" + i + "\"><span class=\"bio-b5-nm\">" + esc(nm) +
            "</span><span class=\"bio-b5-ct\">" + exp + " 格</span> " + fracHTML(exp, 16) +
            "<span class=\"bio-b5-pc\">" + pct(exp, 16) + "</span></div>";
        }).join("") +
          "<div class=\"bio-b5-conc\">数格子：9∶3∶3∶1 —— 每对各自 3∶1，合起来就是它。</div>";
      }
      verdict.innerHTML = html;
      flash(verdict);
      vib(15);
    });
    return box;
  }

  if (mode === "sim" || mode === "both") root.appendChild(buildSim());
  if (mode === "grid" || mode === "both") root.appendChild(buildGrid());
  return root;
}


  /* ============================================================
   * P7 首立（2026-10-19）：B3 experiment-3q / B4 photosyn-sandbox
   * 规格见 docs/biology-interactions.md §B3（行285起）/§B4（行366起）；
   * 冻结口径 B-F3（三问顺序/记录键）/B-F4（相对值口径）；
   * 真值口径 BIO-R12/R13/R14/R15（B3）、BIO-R42/BIO-R70（B4）。
   * 点选 + 即时反馈复用 tap-highlight 范式（bio-tap 瞬时高亮 +
   * flash/vib）；记录走 localStorage（key 即 recordKey）。
   * ============================================================ */

  /* ---------- B3：params 程序化校验（BIO-R15：answer 索引不越界） ---------- */
  function check3QParams(params) {
    function opts(a, name) {
      if (!Array.isArray(a) || a.length < 2 || a.length > 4)
        return name + " 须为 2–4 个字符串数组";
      for (var i = 0; i < a.length; i++)
        if (typeof a[i] !== "string" || !a[i]) return name + "[" + i + "] 非法";
      return null;
    }
    var e = opts(params.controlOptions, "controlOptions") ||
            opts(params.variableOptions, "variableOptions") ||
            opts(params.repeatOptions, "repeatOptions");
    if (e) return e;
    var a = params.answer || {};
    var spec = [["control", params.controlOptions], ["variable", params.variableOptions], ["repeat", params.repeatOptions]];
    for (var k = 0; k < spec.length; k++) {
      var v = spec[k][1], idx = a[spec[k][0]];
      if (!Number.isInteger(idx) || idx < 0 || idx >= v.length)
        return "answer." + spec[k][0] + "=" + idx + " 越界（0–" + (v.length - 1) + "）";
    }
    if (typeof params.purpose !== "string" || !params.purpose) return "purpose 缺失";
    if (typeof params.thoughtExp !== "string" || !params.thoughtExp) return "thoughtExp 缺失";
    return null;
  }

  /* B3 三问：顺序冻结 对照→单一变量→重复（BIO-R12/B-F3），页内不得调换 */
  var B3_QNAMES = ["对照", "单一变量", "重复"];
  var B3_QTITLES = ["第 1 问 · 对照组怎么设？", "第 2 问 · \"只变的一个量\"是？", "第 3 问 · 重复做几次？"];
  var B3_BADGE_ANSWERS = [
    "对照组是\"参照物\"：没它，不知道变没变。",
    "\"只变一个量\"：其他条件都一样，差别才能算到它头上。",
    "\"多做几次\"：一次的结果可能是巧合，重复验证才站得住。"
  ];
  var B3_PASS_TEXT = "实验设计通过：对照、单一变量、重复——全书每个实验都要过这三问。";

  /* localStorage：key 即 recordKey（B-F3）；file:// 降级为内存 */
  function b3load(key) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
    catch (e) { return memStore[key] || null; }
  }
  function b3save(key, obj) {
    try { localStorage.setItem(key, JSON.stringify(obj)); }
    catch (e) { memStore[key] = obj; }
  }

  function renderExperiment3Q(params, wid) {
    var perr = check3QParams(params || {});
    if (perr) return el("div", "bio-b3-err", "⚠ 这道题的数据有问题，暂时打不开（" + perr + "）。");
    var m = String(wid || "").match(/^b\d+\.\d+\.\d+/);
    var recordKey = params.recordKey || ("bio_3q_" + (m ? m[0] : "unknown"));
    var optArr = [params.controlOptions, params.variableOptions, params.repeatOptions];
    var ansArr = [params.answer.control, params.answer.variable, params.answer.repeat];
    /* thoughtExp 按空行分段，答错回放"对应段落" */
    var paras = String(params.thoughtExp).split(/\n\s*\n/);

    var root = el("section", "bio-b3");
    root.setAttribute("data-record-key", recordKey);
    root.setAttribute("aria-label", "实验三问设计器");

    var hp = el("div", "bio-b3-purpose", "🔬 实验目的：" + esc(params.purpose));
    root.appendChild(hp);

    /* ---------- 三问徽章常驻（点展一句话答案；热区 ≥44px） ---------- */
    var badgeRow, badgeBtns = [], badgeBodies = [];
    if (params.showBadge !== false) {
      badgeRow = el("div", "bio-b3-badges");
      for (var b = 0; b < 3; b++) {
        (function (qi) {
          var btn = el("button", "bio-b3-badge");
          btn.type = "button";
          btn.setAttribute("aria-expanded", "false");
          btn.innerHTML = "<span class=\"bio-b3-badge-q\">" + esc(B3_QNAMES[qi]) + "</span>" +
            "<span class=\"bio-b3-badge-st\">待作答</span>";
          var body = el("div", "bio-b3-badge-a", esc(B3_BADGE_ANSWERS[qi]));
          body.style.display = "none";
          btn.addEventListener("click", function () {
            var open = body.style.display !== "none";
            body.style.display = open ? "none" : "";
            btn.setAttribute("aria-expanded", open ? "false" : "true");
            vib(10);
          });
          badgeRow.appendChild(btn);
          badgeRow.appendChild(body);
          badgeBtns.push(btn); badgeBodies.push(body);
        })(b);
      }
      root.appendChild(badgeRow);
    }

    /* ---------- 三问点选（冻结顺序渲染） ---------- */
    var fbEls = [], optBtns = [];
    var done = [false, false, false];
    var passBox = el("div", "bio-b3-pass", "🏅 " + esc(B3_PASS_TEXT));
    passBox.style.display = "none";

    function refreshPass() {
      if (done[0] && done[1] && done[2]) {
        passBox.style.display = "";
        flash(passBox);
        b3save(recordKey, { done: true, ts: Date.now() });
      }
    }
    /* 恢复已通过态 */
    var saved = b3load(recordKey);
    var restored = !!(saved && saved.done);

    for (var q = 0; q < 3; q++) {
      (function (qi) {
        var sec = el("section", "bio-b3-q");
        sec.appendChild(el("div", "bio-b3-qtitle", esc(B3_QTITLES[qi])));
        var opts = el("div", "bio-b3-opts");
        var btns = [];
        optArr[qi].forEach(function (label, oi) {
          var b = el("button", "bio-b3-opt");
          b.type = "button";
          b.textContent = label;
          if (qi === 0) {
            /* 对照组选项配"参照物"小标签：答对后亮出（双编码，不只靠颜色） */
            var tag = el("span", "bio-b3-tag", "参照物");
            tag.style.display = "none";
            tag.setAttribute("data-tag", "1");
            b.appendChild(tag);
          }
          b.addEventListener("click", function () {
            if (done[qi]) return;
            /* tap-highlight：瞬时高亮 + 即时反馈 */
            b.classList.remove("bio-tap"); void b.offsetWidth; b.classList.add("bio-tap");
            if (oi === ansArr[qi]) {
              done[qi] = true;
              b.classList.add("is-ok");
              b.insertAdjacentHTML("afterbegin", "<span class=\"bio-b3-tick\" aria-hidden=\"true\">✓ </span>");
              var tagOn = b.querySelector("[data-tag]");
              if (tagOn) tagOn.style.display = "";
              var fb = fbEls[qi];
              fb.className = "bio-b3-fb is-ok";
              fb.textContent = "✓ 答对了。" + B3_BADGE_ANSWERS[qi];
              if (badgeBtns[qi]) {
                badgeBtns[qi].classList.add("is-done");
                badgeBtns[qi].querySelector(".bio-b3-badge-st").textContent = "✓";
              }
              flash(fb); vib(15);
              refreshPass();
            } else {
              var fb2 = fbEls[qi];
              fb2.className = "bio-b3-fb is-think";
              var para = paras[Math.min(qi, paras.length - 1)];
              fb2.textContent = "💭 思想实验：如果不这样做会怎样？" + para + "（不判错、不扣分，再想想。）";
              flash(fb2); vib(10);
            }
          });
          opts.appendChild(b); btns.push(b);
        });
        sec.appendChild(opts);
        var fb = el("div", "bio-b3-fb");
        fb.setAttribute("aria-live", "polite");
        sec.appendChild(fb);
        fbEls.push(fb); optBtns.push(btns);
        root.appendChild(sec);
      })(q);
    }
    root.appendChild(passBox);

    /* 全流程回放入口（首立页配；后续课按需传 replayHref/replayText） */
    if (params.replayHref) {
      var rp = el("div", "bio-b3-replay");
      var a = document.createElement("a");
      a.href = params.replayHref;
      a.textContent = params.replayText || "回看实验全流程";
      rp.appendChild(a);
      root.appendChild(rp);
    }

    /* 恢复：三问全对态直接点亮 */
    if (restored) {
      for (var r = 0; r < 3; r++) {
        done[r] = true;
        if (optBtns[r][ansArr[r]]) {
          optBtns[r][ansArr[r]].classList.add("is-ok");
          optBtns[r][ansArr[r]].insertAdjacentHTML("afterbegin", "<span class=\"bio-b3-tick\" aria-hidden=\"true\">✓ </span>");
          var tagRe = optBtns[r][ansArr[r]].querySelector("[data-tag]");
          if (tagRe) tagRe.style.display = "";
        }
        if (badgeBtns[r]) {
          badgeBtns[r].classList.add("is-done");
          badgeBtns[r].querySelector(".bio-b3-badge-st").textContent = "✓";
        }
      }
      passBox.style.display = "";
    }
    return root;
  }

  /* ============================================================
   * B4 photosyn-sandbox（光合速率调控沙盘）
   * 速率模型（示意）：rate = f(light)×g(co2)×h(temp)，三段饱和型
   * 示意函数；纵轴一律相对值，常驻 relativeNote（B-F4，删=FAIL）；
   * "主要限制因素"提示写"当前短板"，不许写"唯一原因"。
   * P9 回填升级（2026-10-19）：新增可选 params.insights（教学
   * 提示条数组；不传则无提示条，b03.1.5 落点行为与 P7 一致）。
   * insights 项：{type:"tempHigh",at:35,text:"…",href:"#b13.1.2",
   * linkText:"…"} / {type:"lightHighCo2Low",lightAt:80,co2At:30,
   * text:"…"}。样式全内联（--bio-* 变量），无新增 css 依赖
   * （B10 先例）；落点 b14.1.4-p1。
   * ============================================================ */
  var B4_REL_NOTE = "相对值（非实测数据）";

  function checkSandboxParams(params) {
    function slider(o, name) {
      if (!o || typeof o.min !== "number" || typeof o.max !== "number" ||
          typeof o.step !== "number" || typeof o.init !== "number" || !(o.min < o.max))
        return name + " 滑块参数非法（min/max/step/init）";
      if (o.init < o.min || o.init > o.max) return name + " init 越界";
      return null;
    }
    var serr = slider(params.light, "light") || slider(params.co2, "co2") || slider(params.temp, "temp");
    if (serr) return serr;
    /* P9：insights 可选；传了必须为数组，项必须有 type 字符串 */
    if (params.insights != null) {
      if (!Array.isArray(params.insights)) return "insights 须为数组";
      for (var i = 0; i < params.insights.length; i++) {
        if (!params.insights[i] || typeof params.insights[i].type !== "string")
          return "insights[" + i + "] 缺 type";
      }
    }
    return null;
  }

  /* 三段饱和型示意函数（教学示意，非真实光合动力学模型） */
  function b4fL(L) { return L / (L + 30); }
  function b4fC(C) { return C / (C + 25); }
  function b4fT(T) { var d = (T - 25) / 18; var h = 1 - d * d; return h > 0 ? h : 0; }
  function b4Rate(L, C, T) {
    var max = b4fL(100) * b4fC(100); /* h(25)=1 为峰值 */
    return Math.round(100 * b4fL(L) * b4fC(C) * b4fT(T) / max);
  }

  function renderPhotosynSandbox(params, wid) {
    var perr = checkSandboxParams(params || {});
    if (perr) return el("div", "bio-b4-err", "⚠ 这道题的数据有问题，暂时打不开（" + perr + "）。");
    var relNote = params.relativeNote || B4_REL_NOTE;
    var showCurve = params.showCurve !== false;
    var limitHint = params.limitHint !== false;
    /* P9 回填升级：可选教学提示条（不传则无，b03.1.5 行为不变） */
    var insights = Array.isArray(params.insights) ? params.insights : [];

    var root = el("section", "bio-b4");
    root.setAttribute("aria-label", "光合速率调控沙盘");

    /* 常驻：相对值（非实测数据）——删=FAIL（BIO-R42/B-F4） */
    root.appendChild(el("div", "bio-b4-rel", "📏 " + esc(relNote)));

    var sliders = [
      { key: "light", name: "光照强度", o: params.light },
      { key: "co2", name: "CO₂ 浓度", o: params.co2 },
      { key: "temp", name: "温度", o: params.temp }
    ];
    var state = {};
    var valEls = {}, rangeEls = {};
    var box = el("div", "bio-b4-sliders");

    sliders.forEach(function (s) {
      state[s.key] = s.o.init;
      var wrap = el("div", "bio-b4-slider");
      var lab = el("div", "bio-b4-lab");
      var nm = el("span", "bio-b4-name", esc(s.name));
      var vv = el("span", "bio-b4-val", "");
      vv.setAttribute("aria-live", "polite");
      lab.appendChild(nm); lab.appendChild(vv);
      wrap.appendChild(lab);
      var ctl = el("div", "bio-b4-ctl");
      var minus = el("button", "bio-b4-step", "−");
      minus.type = "button";
      minus.setAttribute("aria-label", s.name + "减小");
      var rg = document.createElement("input");
      rg.type = "range";
      rg.min = s.o.min; rg.max = s.o.max; rg.step = s.o.step; rg.value = s.o.init;
      rg.setAttribute("aria-label", s.name + "滑块");
      rg.className = "bio-b4-range";
      var plus = el("button", "bio-b4-step", "+");
      plus.type = "button";
      plus.setAttribute("aria-label", s.name + "增大");
      function setVal(v, fromRange) {
        v = Math.min(s.o.max, Math.max(s.o.min, v));
        /* 对齐步长 */
        v = Math.round(v / s.o.step) * s.o.step;
        v = Math.round(v * 100) / 100;
        state[s.key] = v;
        if (!fromRange) rg.value = v;
        vv.textContent = v + " " + (s.o.unit || "");
        update();
      }
      minus.addEventListener("click", function () { setVal(state[s.key] - s.o.step); vib(8); });
      plus.addEventListener("click", function () { setVal(state[s.key] + s.o.step); vib(8); });
      rg.addEventListener("input", function () { setVal(parseFloat(rg.value), true); });
      ctl.appendChild(minus); ctl.appendChild(rg); ctl.appendChild(plus);
      wrap.appendChild(ctl);
      if (s.key === "temp") {
        wrap.appendChild(el("div", "bio-b4-tempnote", "🌡 温度过高，酶活性下降——曲线不会一直涨。"));
      }
      box.appendChild(wrap);
      valEls[s.key] = vv; rangeEls[s.key] = rg;
      vv.textContent = state[s.key] + ' ' + (s.o.unit || '');
    });
    root.appendChild(box);

    /* 读数行（MathML）+ 当前短板徽章 */
    var read = el("div", "bio-b4-read");
    var mathBox = el("span", "bio-b4-math");
    var limitBadge = el("span", "bio-b4-limit", "");
    read.appendChild(mathBox); read.appendChild(limitBadge);
    root.appendChild(read);

    /* P9 回填升级：教学提示条容器（样式全内联，无新增 css 依赖） */
    var insightBox = document.createElement("div");
    insightBox.style.display = "none";
    root.appendChild(insightBox);

    /* 曲线画布 */
    var cv = document.createElement("canvas");
    cv.className = "bio-b4-curve";
    cv.width = 600; cv.height = 340;
    cv.setAttribute("role", "img");
    cv.setAttribute("aria-label", "光合速率随光照强度变化的示意曲线（相对值）");
    if (showCurve) root.appendChild(cv);
    root.appendChild(el("div", "bio-b4-axnote", "纵轴：" + esc(relNote) + "；横轴：光照强度（相对值）。示意曲线，非实测数据。"));

    function limitOf() {
      var cands = [
        ["光照", b4fL(state.light)],
        ["CO₂", b4fC(state.co2)],
        ["温度", b4fT(state.temp)]
      ];
      var mi = 0;
      for (var i = 1; i < 3; i++) if (cands[i][1] < cands[mi][1]) mi = i;
      return cands[mi][0];
    }

    /* P9 回填升级：按当前滑块状态评估 insights 提示条 */
    function renderInsights() {
      insightBox.innerHTML = "";
      var shown = false;
      insights.forEach(function (ins) {
        var hit = false;
        if (ins.type === "tempHigh" && typeof ins.at === "number") {
          hit = state.temp >= ins.at;
        } else if (ins.type === "lightHighCo2Low") {
          var la = (typeof ins.lightAt === "number") ? ins.lightAt : 80;
          var ca = (typeof ins.co2At === "number") ? ins.co2At : 30;
          hit = state.light >= la && state.co2 <= ca;
        }
        if (!hit) return;
        shown = true;
        var d = document.createElement("div");
        d.setAttribute("style", "font-size:0.95rem;line-height:1.6;border:2px solid var(--bio-target);" +
          "border-radius:10px;padding:8px 12px;margin:8px 0;background:var(--bio-panel);color:var(--bio-text)");
        var t = document.createElement("div");
        t.textContent = "💡 " + (ins.text || "");
        d.appendChild(t);
        if (ins.href) {
          var wrap = document.createElement("div");
          var a = document.createElement("a");
          a.href = ins.href;
          a.textContent = ins.linkText || ins.href;
          a.setAttribute("style", "color:var(--bio-known)");
          wrap.appendChild(a);
          d.appendChild(wrap);
        }
        insightBox.appendChild(d);
      });
      insightBox.style.display = shown ? "" : "none";
    }

    function draw() {
      var L = state.light, C = state.co2, T = state.temp;
      var rate = b4Rate(L, C, T);
      renderInsights();
      /* 读数（MathML） */
      mathBox.innerHTML = "<math><mtext>光合速率（相对值）</mtext><mo>=</mo><mn>" + rate + "</mn></math>";
      /* 短板徽章：写"当前短板"，不许写"唯一原因" */
      if (limitHint) {
        limitBadge.textContent = "当前" + limitOf() + "是短板——生产上先补短板";
        limitBadge.style.display = "";
      } else { limitBadge.style.display = "none"; }
      if (!showCurve) return;
      var ctx = cv.getContext("2d");
      if (!ctx) return;
      var W = cv.width, H = cv.height;
      var padL = 52, padR = 14, padT = 30, padB = 40;
      var pw = W - padL - padR, ph = H - padT - padB;
      ctx.clearRect(0, 0, W, H);
      var colGrid = cssVar("--bio-grid"), colText = cssVar("--bio-text"),
          colCurve = cssVar("--bio-organelle"), colMark = cssVar("--bio-target");
      /* 网格 + 纵轴（相对值） */
      ctx.font = "13px sans-serif"; ctx.textAlign = "right"; ctx.textBaseline = "middle";
      for (var g = 0; g <= 4; g++) {
        var yv = g * 25, y = padT + ph - (yv / 100) * ph;
        ctx.strokeStyle = colGrid; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(padL, y); ctx.lineTo(W - padR, y); ctx.stroke();
        ctx.fillStyle = colText; ctx.fillText(String(yv), padL - 6, y);
      }
      ctx.textAlign = "center"; ctx.textBaseline = "top";
      ctx.fillStyle = colText;
      ctx.fillText("相对值", 26, padT - 4);
      /* 常驻标注（B-F4） */
      ctx.textAlign = "right";
      ctx.fillText(relNote, W - padR, 8);
      /* 曲线：rate(x, C, T)，x=光照 0–100 */
      ctx.strokeStyle = colCurve; ctx.lineWidth = 3;
      ctx.beginPath();
      for (var x = 0; x <= 100; x += 2) {
        var r = b4Rate(x, C, T);
        var cx = padL + (x / 100) * pw, cy = padT + ph - (r / 100) * ph;
        if (x === 0) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
      }
      ctx.stroke();
      /* 当前点 */
      var px = padL + (L / 100) * pw, py = padT + ph - (rate / 100) * ph;
      ctx.fillStyle = colMark;
      ctx.beginPath(); ctx.arc(px, py, 7, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = colText; ctx.textBaseline = "bottom";
      ctx.fillText("当前", px, py - 10);
      /* 横轴标注 */
      ctx.textBaseline = "top";
      ctx.fillText("光照强度（相对值）", padL + pw / 2, padT + ph + 12);
    }

    function update() { draw(); }
    draw();
    /* 深色切换重绘（走 liveViews） */
    liveViews.push({ redraw: function () { draw(); } });
    return root;
  }

  /* ---------------- B10 酶条件实验室（P8 首立） ----------------
   * 见 docs/biology-interactions.md §B10；冻结口径 B-F10
   * （温度 {min:0,max:70,step:1,init:37} / pH {min:0,max:14,
   * step:0.5,init:7}；\"烫坏\"态真锁死；T3 边界句必配）；
   * 真值口径 BIO-R42 类推（曲线纵轴一律相对值，常驻
   * \"示意曲线（非实测数据）\"，删=FAIL）/ BIO-R41（页内变量
   * 交代由课页文案承担）；BIO-R35 虚拟声明常驻。
   * 落点：b13.1.2-p1（首立，recordKey=bio_enzyme_b13.1.2，
   * tempLab 全开）/ b05.1.2-p3（锁钥段复用，
   * recordKey=bio_enzyme_b05.1.2，tempLab:false）。
   * 状态机（irreversDemo）：正常 → 烫坏（temp≥60，真锁死，
   * 调回 37℃ 不恢复）/ 正常 → 冻住（temp≤5，temp≥15 恢复）。
   * 锁钥配错温和回弹；配对成功出专一性徽章 + T3 边界小字
   * \"结合时会微调（诱导契合）\"。
   * 记录走 localStorage（key 即 recordKey，file:// 降级内存）；
   * 锁钥完成态持久化，烫坏态为当次实验会话态（\"换一份新酶"
   * 重置=新实验）。
   * 纯 DOM + Canvas；样式全内联（--bio-* 变量），无新增
   * css 依赖；滑块/卡片热区 ≥44px；双编码（图标+文字）。
   * ------------------------------------------------------------ */
  var B10_DEFAULT_PAIRS = [
    { enzyme: "淀粉酶", substrate: "淀粉" },
    { enzyme: "蛋白酶", substrate: "蛋白质" },
    { enzyme: "脂肪酶", substrate: "脂肪" }
  ];
  var B10_TEMP_DENATURE = 60;   /* ≥60℃ 进入烫坏（真锁死） */
  var B10_TEMP_FREEZE = 5;      /* ≤5℃ 进入冻住 */
  var B10_TEMP_THAW = 15;       /* ≥15℃ 解冻恢复 */
  function checkEnzymeParams(params) {
    function rng(o, name) {
      if (o == null) return null;
      if (typeof o.min !== "number" || typeof o.max !== "number" ||
          typeof o.step !== "number" || typeof o.init !== "number")
        return name + " 须含 min/max/step/init 数字";
      return null;
    }
    return rng(params.temp, "temp") || rng(params.ph, "ph");
  }
  function b10load(key) {
    try { var v = localStorage.getItem(key); return v ? JSON.parse(v) : null; }
    catch (e) { return memStore[key] || null; }
  }
  function b10save(key, obj) {
    try { localStorage.setItem(key, JSON.stringify(obj)); }
    catch (e) { memStore[key] = obj; }
  }
  function b10TempAct(t) { return 100 * Math.exp(-Math.pow(t - 37, 2) / (2 * 20 * 20)); }
  function b10PhAct(p) { return 100 * Math.exp(-Math.pow(p - 7, 2) / (2 * 2.0 * 2.0)); }

  function renderEnzymeLab(params, wid) {
    params = params || {};
    var perr = checkEnzymeParams(params);
    if (perr) return el("div", "bio-b10-err", "⚠ 这道题的数据有问题，暂时打不开（" + perr + "）。");
    var m = String(wid || "").match(/^b\d+\.\d+\.\d+/);
    var recordKey = params.recordKey || ("bio_enzyme_" + (m ? m[0] : "unknown"));
    var tempCfg = params.temp || { min: 0, max: 70, step: 1, init: 37, unit: "℃" };
    var phCfg = params.ph || { min: 0, max: 14, step: 0.5, init: 7 };
    var showTempLab = params.tempLab !== false;
    var showLockKey = params.lockKey !== false;
    var showIrrevers = params.irreversDemo !== false;
    var pairs = Array.isArray(params.pairs) && params.pairs.length >= 2 ? params.pairs : B10_DEFAULT_PAIRS;
    if (pairs.length > 4) pairs = pairs.slice(0, 4);
    var curveNote = params.curveNote || "示意曲线（非实测数据）";

    var root = el("section", "bio-b10");
    root.setAttribute("data-record-key", recordKey);
    root.setAttribute("aria-label", "酶条件实验室");
    root.style.cssText = "margin:10px 0 16px;border:1px solid var(--bio-line);border-radius:12px;padding:12px;background:var(--bio-panel);";
    root.appendChild(el("div", null, "🧪 <b>B10 · 酶条件实验室</b>"));
    var st = { temp: tempCfg.init, ph: (phCfg.init == null ? 7 : phCfg.init), denatured: false, frozen: false };

    /* ============ A. 温度/pH 双滑块 + 曲线 ============ */
    var tempSlider, phSlider, tempVal, phVal, readOut, badgeBox, canvas;
    function fmtAct() {
      if (st.denatured) return 0;
      if (st.frozen) return 0;
      return Math.round(b10TempAct(st.temp) * b10PhAct(st.ph) / 100);
    }
    function refreshBadge() {
      badgeBox.innerHTML = "";
      var b = el("div", null);
      b.style.cssText = "display:inline-flex;align-items:center;gap:8px;font-size:14px;font-weight:700;border:1.5px solid var(--bio-line);border-radius:20px;padding:8px 14px;min-height:44px;";
      if (st.denatured) {
        b.innerHTML = "<svg viewBox=\"0 0 24 24\" width=\"20\" height=\"20\" aria-hidden=\"true\"><rect x=\"5\" y=\"10\" width=\"14\" height=\"10\" rx=\"2\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M8 10 V7 a4 4 0 0 1 7.6-1.8\" fill=\"none\" stroke=\"currentColor\" stroke-width=\"2\"/><path d=\"M12 10 L9.5 20 M12 10 L14.5 20\" stroke=\"currentColor\" stroke-width=\"1.6\"/></svg>" +
          "<span>🔥 烫坏了：不可恢复</span>";
        b.style.borderColor = "var(--bio-target)"; b.style.color = "var(--bio-target)";
      } else if (st.frozen) {
        b.innerHTML = "<span style=\"font-size:18px\" aria-hidden=\"true\">❄</span><span>冻住了：可恢复（调回 37℃ 恢复）</span>";
        b.style.borderColor = "var(--bio-product)"; b.style.color = "var(--bio-product)";
      } else {
        b.innerHTML = "<span style=\"font-size:16px\" aria-hidden=\"true\">●</span><span>正常</span>";
        b.style.color = "var(--bio-organelle)";
      }
      badgeBox.appendChild(b);
    }
    function drawCurves() {
      if (!canvas) return;
      var ctx = canvas.getContext("2d");
      var W = canvas.width, H = canvas.height;
      var colCurve = cssVar("--bio-target"), colMark = cssVar("--bio-highlight"),
          colText = cssVar("--bio-text"), colSoft = cssVar("--bio-ink-soft"),
          colGrid = cssVar("--bio-grid"), colAux = cssVar("--bio-aux");
      ctx.clearRect(0, 0, W, H);
      ctx.font = "13.6px sans-serif";
      function panel(y0, h, xLabel, yLabel, fn, xMin, xMax, cur, optAt) {
        var padL = 44, padR = 10, padT = 22, padB = 30;
        var pw = W - padL - padR, ph = h - padT - padB;
        /* 网格 */
        ctx.strokeStyle = colGrid; ctx.lineWidth = 1;
        for (var g = 0; g <= 4; g++) {
          var gy = y0 + padT + (g / 4) * ph;
          ctx.beginPath(); ctx.moveTo(padL, gy); ctx.lineTo(padL + pw, gy); ctx.stroke();
        }
        /* 坐标轴 */
        ctx.strokeStyle = colAux; ctx.lineWidth = 1.5;
        ctx.beginPath(); ctx.moveTo(padL, y0 + padT + ph); ctx.lineTo(padL + pw, y0 + padT + ph); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(padL, y0 + padT); ctx.lineTo(padL, y0 + padT + ph); ctx.stroke();
        /* 曲线 */
        ctx.strokeStyle = colCurve; ctx.lineWidth = 3;
        ctx.beginPath();
        for (var x = xMin; x <= xMax; x += (xMax - xMin) / 100) {
          var r = fn(x);
          var cx = padL + ((x - xMin) / (xMax - xMin)) * pw;
          var cy = y0 + padT + ph - (r / 100) * ph;
          if (x === xMin) ctx.moveTo(cx, cy); else ctx.lineTo(cx, cy);
        }
        ctx.stroke();
        /* 最适点 */
        var ox = padL + ((optAt - xMin) / (xMax - xMin)) * pw;
        ctx.fillStyle = colMark;
        ctx.beginPath(); ctx.arc(ox, y0 + padT + ph - ph, 6, 0, Math.PI * 2); ctx.fill();
        ctx.fillStyle = colText; ctx.textAlign = "center";
        ctx.fillText("最适", ox, y0 + padT - 8);
        /* 当前值游标 */
        var ux = padL + ((cur - xMin) / (xMax - xMin)) * pw;
        var uy = y0 + padT + ph - (fn(cur) / 100) * ph;
        ctx.fillStyle = colText;
        ctx.beginPath(); ctx.arc(ux, uy, 7, 0, Math.PI * 2); ctx.fill();
        ctx.strokeStyle = colAux; ctx.setLineDash([4, 3]);
        ctx.beginPath(); ctx.moveTo(ux, y0 + padT); ctx.lineTo(ux, y0 + padT + ph); ctx.stroke();
        ctx.setLineDash([]);
        /* 轴标注 */
        ctx.fillStyle = colSoft; ctx.textAlign = "center";
        ctx.fillText(xLabel, padL + pw / 2, y0 + h - 8);
        ctx.save();
        ctx.translate(12, y0 + padT + ph / 2); ctx.rotate(-Math.PI / 2);
        ctx.fillText(yLabel, 0, 0);
        ctx.restore();
        /* curveNote 改由 DOM 标注（可测+无障碍），画布内不再重复绘制 */
      }
      panel(0, H / 2, "温度（℃）", "相对活性", b10TempAct, tempCfg.min, tempCfg.max, st.temp, 37);
      panel(H / 2, H / 2, "pH", "相对活性", b10PhAct, phCfg.min, phCfg.max, st.ph, 7);
    }
    function update() {
      /* 状态机 */
      if (showIrrevers && !st.denatured && st.temp >= B10_TEMP_DENATURE) {
        st.denatured = true; vib(40);
      }
      if (showIrrevers && !st.denatured) {
        if (st.temp <= B10_TEMP_FREEZE) st.frozen = true;
        else if (st.temp >= B10_TEMP_THAW) st.frozen = false;
      } else if (st.denatured) {
        st.frozen = false;
      }
      tempVal.textContent = st.temp + (tempCfg.unit || "℃");
      phVal.textContent = "pH " + st.ph;
      readOut.innerHTML = "<math xmlns=\"http://www.w3.org/1998/MathML\" style=\"font-size:16px\"><mrow><mi>相对活性</mi><mo>=</mo><mn>" +
        fmtAct() + "</mn><mo>%</mo></mrow></math>";
      refreshBadge();
      drawCurves();
    }
    if (showTempLab) {
      var lab = el("div", null);
      /* 温度滑块行 */
      var tRow = el("div", null);
      tRow.style.cssText = "margin:10px 0;";
      tRow.appendChild(el("div", null, "<b>温度</b>（变量交代：pH 固定 7.0、底物量相同）"));
      var tCtl = el("div", null);
      tCtl.style.cssText = "display:flex;align-items:center;gap:6px;flex-wrap:wrap;";
      var tMinus = el("button", null, "−");
      tMinus.type = "button"; tMinus.className = "tb-btn-secondary"; tMinus.setAttribute("aria-label", "温度减");
      tMinus.style.cssText = "min-width:44px;min-height:44px;";
      tMinus.addEventListener("click", function () {
        st.temp = Math.max(tempCfg.min, st.temp - tempCfg.step); tempSlider.value = st.temp; update(); vib(10);
      });
      tempSlider = el("input", null);
      tempSlider.type = "range"; tempSlider.min = tempCfg.min; tempSlider.max = tempCfg.max;
      tempSlider.step = tempCfg.step; tempSlider.value = st.temp;
      tempSlider.setAttribute("aria-label", "温度滑块");
      tempSlider.style.cssText = "flex:1;min-width:160px;min-height:44px;";
      tempSlider.addEventListener("input", function () { st.temp = Number(tempSlider.value); update(); });
      var tPlus = el("button", null, "+");
      tPlus.type = "button"; tPlus.className = "tb-btn-secondary"; tPlus.setAttribute("aria-label", "温度加");
      tPlus.style.cssText = "min-width:44px;min-height:44px;";
      tPlus.addEventListener("click", function () {
        st.temp = Math.min(tempCfg.max, st.temp + tempCfg.step); tempSlider.value = st.temp; update(); vib(10);
      });
      tempVal = el("b", null, st.temp + (tempCfg.unit || "℃"));
      tCtl.appendChild(tMinus); tCtl.appendChild(tempSlider); tCtl.appendChild(tPlus); tCtl.appendChild(tempVal);
      tRow.appendChild(tCtl);
      lab.appendChild(tRow);
      /* pH 滑块行 */
      var pRow = el("div", null);
      pRow.style.cssText = "margin:10px 0;";
      pRow.appendChild(el("div", null, "<b>pH</b>（变量交代：温度以当前滑块值为准、底物量相同）"));
      var pCtl = el("div", null);
      pCtl.style.cssText = "display:flex;align-items:center;gap:6px;flex-wrap:wrap;";
      var pMinus = el("button", null, "−");
      pMinus.type = "button"; pMinus.className = "tb-btn-secondary"; pMinus.setAttribute("aria-label", "pH减");
      pMinus.style.cssText = "min-width:44px;min-height:44px;";
      pMinus.addEventListener("click", function () {
        st.ph = Math.max(phCfg.min, Math.round((st.ph - phCfg.step) * 10) / 10); phSlider.value = st.ph; update(); vib(10);
      });
      phSlider = el("input", null);
      phSlider.type = "range"; phSlider.min = phCfg.min; phSlider.max = phCfg.max;
      phSlider.step = phCfg.step; phSlider.value = st.ph;
      phSlider.setAttribute("aria-label", "pH滑块");
      phSlider.style.cssText = "flex:1;min-width:160px;min-height:44px;";
      phSlider.addEventListener("input", function () { st.ph = Number(phSlider.value); update(); });
      var pPlus = el("button", null, "+");
      pPlus.type = "button"; pPlus.className = "tb-btn-secondary"; pPlus.setAttribute("aria-label", "pH加");
      pPlus.style.cssText = "min-width:44px;min-height:44px;";
      pPlus.addEventListener("click", function () {
        st.ph = Math.min(phCfg.max, Math.round((st.ph + phCfg.step) * 10) / 10); phSlider.value = st.ph; update(); vib(10);
      });
      phVal = el("b", null, "pH " + st.ph);
      pCtl.appendChild(pMinus); pCtl.appendChild(phSlider); pCtl.appendChild(pPlus); pCtl.appendChild(phVal);
      pRow.appendChild(pCtl);
      lab.appendChild(pRow);
      /* 曲线画布 */
      canvas = el("canvas", null);
      canvas.width = 640; canvas.height = 380;
      canvas.style.cssText = "width:100%;max-width:640px;display:block;margin:6px auto;";
      canvas.setAttribute("role", "img");
      canvas.setAttribute("aria-label", "温度与pH影响酶活性的示意曲线");
      lab.appendChild(canvas);
      var capNote = el("div", null, curveNote);
      capNote.setAttribute("data-b10-curvenote", "1");
      capNote.style.cssText = "font-size:12.48px;color:var(--bio-ink-soft);text-align:right;max-width:640px;margin:0 auto;";
      lab.appendChild(capNote);
      liveViews.push({ redraw: function () { drawCurves(); } });
      /* 读数 + 徽章 + 重置 */
      var rRow = el("div", null);
      rRow.style.cssText = "display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin:8px 0;";
      readOut = el("div", null);
      readOut.setAttribute("data-b10-readout", "1");
      rRow.appendChild(readOut);
      badgeBox = el("div", null);
      badgeBox.setAttribute("data-b10-badge", "1");
      rRow.appendChild(badgeBox);
      var resetBtn = el("button", null, "换一份新酶（重置）");
      resetBtn.type = "button"; resetBtn.className = "tb-btn-secondary";
      resetBtn.style.cssText = "min-height:44px;";
      resetBtn.addEventListener("click", function () {
        st.temp = tempCfg.init; st.ph = (phCfg.init == null ? 7 : phCfg.init);
        st.denatured = false; st.frozen = false;
        tempSlider.value = st.temp; phSlider.value = st.ph;
        update(); flash(rRow); vib(10);
      });
      rRow.appendChild(resetBtn);
      lab.appendChild(rRow);
      lab.appendChild(el("div", null, "虚拟实验：现实中须用恒温设备控制变量，并注意高温烫伤安全。")).style.cssText =
        "font-size:12.48px;color:var(--bio-ink-soft);text-align:right;";
      root.appendChild(lab);
    }

    /* ============ B. 锁钥配对小游戏 ============ */
    if (showLockKey) {
      var lk = el("div", null);
      lk.style.cssText = "margin:12px 0 4px;border-top:1px dashed var(--bio-line);padding-top:10px;";
      lk.appendChild(el("div", null, "🔐 <b>锁钥配对</b>：点一把\"钥匙\"，再点它能开的\"锁\"（酶—底物专一性）"));
      var keyRow = el("div", null), lockRow = el("div", null);
      keyRow.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;margin:8px 0;";
      lockRow.style.cssText = "display:flex;gap:8px;flex-wrap:wrap;margin:8px 0;";
      keyRow.setAttribute("data-b10-keys", "1"); lockRow.setAttribute("data-b10-locks", "1");
      var order = pairs.map(function (_, i) { return i; });
      for (var si = order.length - 1; si > 0; si--) { var sj = Math.floor(Math.random() * (si + 1)); var tt = order[si]; order[si] = order[sj]; order[sj] = tt; }
      var selKey = -1, donePairs = 0;
      var keyBtns = [], lockBtns = [];
      var badge = el("div", null);
      badge.setAttribute("data-b10-lockbadge", "1");
      badge.style.cssText = "margin:8px 0;min-height:24px;";
      function lkDone() {
        badge.innerHTML = "🏅 <b>专一性徽章</b>：每把锁只认自己的钥匙——一把锁只开一把钥匙。" +
          "<div style=\"font-size:12.48px;color:var(--bio-ink-soft);margin-top:4px\">结合时会微调（诱导契合）</div>";
        badge.style.cssText += "border:1.5px solid var(--bio-organelle);border-radius:10px;padding:10px;background:var(--bio-panel);";
        b10save(recordKey, { lockKeyDone: true, ts: Date.now() });
        flash(badge); vib(30);
      }
      order.forEach(function (pi) {
        var kb = el("button", null, "🗝 " + pairs[pi].substrate);
        kb.type = "button";
        kb.setAttribute("data-pair", pi);
        kb.style.cssText = "min-width:44px;min-height:44px;padding:8px 14px;font-size:15px;border:1.5px solid var(--bio-line);border-radius:10px;background:var(--bio-bg);color:var(--bio-text);cursor:pointer;";
        kb.addEventListener("click", function () {
          if (kb.disabled) return;
          keyBtns.forEach(function (x) { x.style.borderColor = "var(--bio-line)"; });
          selKey = pi; kb.style.borderColor = "var(--bio-highlight)"; kb.style.borderWidth = "2.5px";
          vib(10);
        });
        keyRow.appendChild(kb); keyBtns.push(kb);
      });
      pairs.forEach(function (pr, pi) {
        var lb = el("button", null, "🔒 " + pr.enzyme);
        lb.type = "button";
        lb.setAttribute("data-pair", pi);
        lb.style.cssText = "min-width:44px;min-height:44px;padding:8px 14px;font-size:15px;border:1.5px solid var(--bio-line);border-radius:10px;background:var(--bio-bg);color:var(--bio-text);cursor:pointer;";
        lb.addEventListener("click", function () {
          if (lb.disabled) return;
          if (selKey < 0) {
            lb.animate([{ transform: "translateX(0)" }, { transform: "translateX(-5px)" }, { transform: "translateX(0)" }], { duration: 180 });
            return;
          }
          if (selKey === pi) {
            lb.disabled = true; keyBtns[order.indexOf(pi)].disabled = true;
            lb.style.borderColor = "var(--bio-organelle)"; lb.style.opacity = "0.8";
            keyBtns[order.indexOf(pi)].style.borderColor = "var(--bio-organelle)";
            keyBtns[order.indexOf(pi)].style.opacity = "0.6";
            lb.innerHTML = "🔓 " + esc(pairs[pi].enzyme) + " ✓";
            selKey = -1; donePairs++;
            vib(20);
            if (donePairs === pairs.length) lkDone();
          } else {
            /* 配错温和回弹 */
            lb.animate(
              [{ transform: "translateX(0)" }, { transform: "translateX(-7px)" }, { transform: "translateX(7px)" }, { transform: "translateX(0)" }],
              { duration: 260 });
            keyBtns.forEach(function (x) { if (!x.disabled) x.style.borderColor = "var(--bio-line)"; });
            selKey = -1;
            vib(15);
          }
        });
        lockRow.appendChild(lb); lockBtns.push(lb);
      });
      lk.appendChild(el("div", null, "钥匙（底物）：")).style.cssText = "font-size:13.6px;color:var(--bio-ink-soft);";
      lk.appendChild(keyRow);
      lk.appendChild(el("div", null, "锁（酶）：")).style.cssText = "font-size:13.6px;color:var(--bio-ink-soft);";
      lk.appendChild(lockRow);
      lk.appendChild(badge);
      /* 恢复已完成态 */
      var saved = b10load(recordKey);
      if (saved && saved.lockKeyDone) {
        keyBtns.forEach(function (x) { x.disabled = true; x.style.opacity = "0.6"; });
        lockBtns.forEach(function (x, xi) { x.disabled = true; x.style.opacity = "0.8"; x.innerHTML = "🔓 " + esc(pairs[xi].enzyme) + " ✓"; });
        donePairs = pairs.length;
        lkDone();
      }
      root.appendChild(lk);
    }

    if (showTempLab) update();
    return root;
  }

/* ---------------- B12 immuno-flow（免疫流程推演）· P13 首立 ----------------
* spec: docs/biology-interactions.md §B12；冻结口径 B-F12。
* params: branch("humoral" 默认，B-F12 体液线在前）, roleCards[],
* cellularCards[]（P13 扩展：细胞线角色卡，未传则复用 roleCards）,
* orderQuiz(true), bindNote(true，冻结必配，不许关）,
* vaccineLink(true，默认开，挂 #b08.1.3),
* diagramNote("模式图：非等比、非实物" 冻结文案）。
* roleCards[] 项：{id,label,desc,why?}；卡片池展示 = 正确序的逆序
* （确定性打乱，无随机）。
* 交互：点卡片选中 → 点槽位放置；放错给因果提示
* "××应该在第×步，因为××"；抗体放对 → 纠错卡（T11）；
* 记忆细胞放对 → 疫苗回填链接；全对 → 两线对比总结；
* 分支切换二次确认后清空（B-F12）。
*/
function renderImmunoFlow(params, wid) {
params = params || {};
var branch = params.branch === "cellular"? "cellular": "humoral";
var cardsH = params.roleCards || [];
var cardsC = params.cellularCards || [];
var bindNote = params.bindNote!== false;
var vaccineLink = params.vaccineLink!== false;
var orderQuiz = params.orderQuiz!== false;
var diagramNote = params.diagramNote || "模式图：非等比、非实物";

var root = el("div", "bio-b12");
root.setAttribute("data-wid", wid || "bio-b12");
if (!cardsH.length) {
root.appendChild(el("div", "bio-b6-err", "⚠ immuno-flow 缺少 roleCards，无法渲染。"));
return root;
}
root.appendChild(el("div", "bio-note", esc(diagramNote)));
root.appendChild(el("div", "bio-note",
"简化声明：这里只画体液 / 细胞两条主线，真实过程还有更多配角参与。"));

var lines = {
humoral: { name: "体液免疫线", cards: cardsH},
cellular: { name: "细胞免疫线", cards: cardsC.length? cardsC: cardsH}
};

/* orderQuiz 关 → 静态流程展示（仍配纠错卡与疫苗回填） */
if (!orderQuiz) {
["humoral", "cellular"].forEach(function (key) {
var cards = lines[key].cards;
var t = el("div", "bio-note", "" +
cards.map(function (c, i) { return (i + 1) + "." + c.label;}).join(" → "));
root.appendChild(t);
});
if (bindNote) root.appendChild(el("div", "bio-trap",
"⚠ 纠错：抗体是“抱住”抗原，不是“杀死”——结合后由吞噬细胞清除。"));
if (vaccineLink) {
var vl0 = el("div", "bio-b12-vaccine", null);
vl0.innerHTML = '还记得 <a href="#b08.1.3">b08.1.3</a> 的疫苗吗？——疫苗就是一次“演习”，留下记忆细胞。';
root.appendChild(vl0);
}
return root;
}

var bar = el("div", "bio-b12-branch", null);
bar.style.cssText = "display:flex;gap:8px;justify-content:center;margin:6px 0;flex-wrap:wrap";
var btnH = el("button", "tb-btn-secondary", "体液免疫线");
var btnC = el("button", "tb-btn-secondary", "细胞免疫线");
[btnH, btnC].forEach(function (b) { b.type = "button"; b.style.minHeight = "44px";});
bar.appendChild(btnH); bar.appendChild(btnC);
root.appendChild(bar);

var flowBox = el("div", "bio-b12-flow", null);
root.appendChild(flowBox);
var msgBox = el("div", "bio-b12-msg", null);
msgBox.style.cssText = "min-height:2em;text-align:center;font-size:0.9rem;margin-top:6px";
root.appendChild(msgBox);

function cardById(cards, id) {
for (var i = 0; i < cards.length; i++) if (cards[i].id === id) return cards[i];
return null;
}
function imsg(t) { msgBox.textContent = t;}

function renderBranch(key) {
flowBox.innerHTML = "";
imsg("");
var cards = lines[key].cards;
var n = cards.length;
var placed = [];
var pool = [];
var pi, qi;
for (pi = 0; pi < n; pi++) placed.push(null);
for (qi = n - 1; qi >= 0; qi--) pool.push(cards[qi].id); /* 逆序展示 */
var selected = null;
var doneShown = false, bindShown = false, vacShown = false;

var slotsEl = el("div", "bio-b12-slots", null);
slotsEl.style.cssText = "display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:8px 0";
var slotBtns = [];
for (var s = 0; s < n; s++) {
(function (si) {
var b = el("button", "tb-btn-secondary", "第" + (si + 1) + "步：待放置");
b.type = "button"; b.style.minHeight = "44px"; b.style.minWidth = "96px";
b.addEventListener("click", function () {
var k, card, correctIdx;
if (placed[si]) {
pool.push(placed[si]); placed[si] = null; selected = null; draw(); return;
}
if (!selected) { imsg("先点一张角色卡，再点槽位。"); return;}
card = cardById(cards, selected);
correctIdx = -1;
for (k = 0; k < n; k++) if (cards[k].id === selected) correctIdx = k;
if (correctIdx === si) {
placed[si] = selected;
pool.splice(pool.indexOf(selected), 1);
selected = null;
if (bindNote &&!bindShown && /抗体/.test(card.label)) {
bindShown = true;
imsg("⚠ 纠错：抗体是“抱住”抗原，不是“杀死”——结合后由吞噬细胞清除。");
}
if (vaccineLink &&!vacShown && /记忆细胞/.test(card.label)) {
vacShown = true;
var vl = el("div", "bio-b12-vaccine", null);
vl.style.cssText = "margin-top:6px;text-align:center";
vl.innerHTML = '还记得 <a href="#b08.1.3">b08.1.3</a> 的疫苗吗？——疫苗就是一次“演习”，留下记忆细胞。';
flowBox.appendChild(vl);
}
var allDone = true;
for (var q = 0; q < n; q++) if (!placed[q]) allDone = false;
if (allDone &&!doneShown) {
doneShown = true;
flowBox.appendChild(el("div", "bio-note",
"✓ 两线对比：体液免疫管“液体里”的敌人（靠抗体结合），细胞免疫管“藏进细胞”的敌人（靠效应 T 细胞）。"));
}
if (!bindShown) imsg("");
} else {
var why = card.why? "，因为" + card.why: "";
imsg("“" + card.label + "”应该在第" + (correctIdx + 1) + "步" + why + "。");
}
draw();
});
slotsEl.appendChild(b); slotBtns.push(b);
})(s);
}
flowBox.appendChild(slotsEl);

var poolEl = el("div", "bio-b12-pool", null);
poolEl.style.cssText = "display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:6px 0";
flowBox.appendChild(poolEl);

function draw() {
var si2, id2, c2, b2;
for (si2 = 0; si2 < n; si2++) {
b2 = slotBtns[si2];
if (placed[si2]) {
c2 = cardById(cards, placed[si2]);
b2.textContent = "第" + (si2 + 1) + "步：" + c2.label;
b2.style.borderColor = "#009E73";
} else {
b2.textContent = "第" + (si2 + 1) + "步：待放置";
b2.style.borderColor = "";
}
}
poolEl.innerHTML = "";
pool.forEach(function (id) {
var c = cardById(cards, id);
var b = el("button", "tb-btn-secondary", c.label + "（" + c.desc + "）");
b.type = "button"; b.style.minHeight = "44px";
if (id === selected) b.style.borderWidth = "3px";
b.addEventListener("click", function () {
selected = (selected === id)? null: id;
draw();
});
poolEl.appendChild(b);
});
if (!pool.length) {
poolEl.appendChild(el("div", "bio-note", "点已放置的槽位可把卡片退回重排。"));
}
}
draw();
}

function switchBranch(key, btn) {
if (key === branch) return;
try {
if (typeof window.confirm === "function" &&
!window.confirm("切换到" + lines[key].name + "会清空已放的卡片，继续吗？")) return;
} catch (e) {}
branch = key;
btnH.style.borderWidth = ""; btnC.style.borderWidth = "";
btn.style.borderWidth = "3px";
renderBranch(key);
}
btnH.addEventListener("click", function () { switchBranch("humoral", btnH);});
btnC.addEventListener("click", function () { switchBranch("cellular", btnC);});
btnH.style.borderWidth = "3px";
renderBranch(branch);
return root;
}

  /* ---------------- 对外 API ---------------- */
  var api = {
    render: function (type, params, wid) {
      if (type === "pedigree-quest") {
        if (!(window.Eng && window.Eng.KonvaView && window.Konva && window.Eng.StepPlayer && window.Eng.Input)) {
          var miss = el("div", "bio-b6-err", "⚠ 基础引擎未就绪（Konva/Eng 缺失），系谱闯关无法渲染。");
          return miss;
        }
        return renderPedigreeQuest(params || {}, wid || "bio-b6");
      }
      if (type === "mitosis-stage") {
        return renderMitosisStage(params || {}, wid || "bio-b11");
      }
      if (type === "punnett-lab") {
        return renderPunnettLab(params || {}, wid || "bio-b5");
      }
      if (type === "immuno-flow") {
        return renderImmunoFlow(params || {}, wid || "bio-b12");
      }
      if (type === "experiment-3q") {
        return renderExperiment3Q(params || {}, wid || "bio-b3");
      }
      if (type === "photosyn-sandbox") {
        return renderPhotosynSandbox(params || {}, wid || "bio-b4");
      }
      if (type === "cell-builder") {
        if (!(window.Eng && window.Eng.CellBuilder)) {
          return el("div", "bio-b6-err", "⚠ 基础引擎 cell-builder 渲染器未就绪（Eng.CellBuilder 缺失），拼搭交互无法渲染。");
        }
        var cbroot = el("div", "bio-b1");
        cbroot.setAttribute("data-wid", wid || "bio-b1");
        try {
          cbroot._cb = new window.Eng.CellBuilder(cbroot, params || {});
        } catch (e) {
          cbroot.appendChild(el("div", "bio-b6-err", "⚠ cell-builder 参数校验未通过：" + esc(String((e && e.message) || e))));
          return cbroot;
        }
        return cbroot;
      }
      if (type === "enzyme-lab") {
        return renderEnzymeLab(params || {}, wid || "bio-b10");
      }
      return null;
    },
    onThemeChange: function () {
      for (var i = 0; i < liveViews.length; i++) {
        try { liveViews[i].redraw(); } catch (e) {}
      }
      for (var j = 0; j < b11Redraws.length; j++) {
        try { b11Redraws[j].redraw(); } catch (e) {}
      }
    }
  };
  /* 主题切换广播（index.html 的 apply() 在切换 data-theme 后派发） */
  if (typeof document !== "undefined" && document.addEventListener) {
    document.addEventListener("bio-theme", function () { api.onThemeChange(); });
  }
  window.BIO_ENGINE = api;
})();
