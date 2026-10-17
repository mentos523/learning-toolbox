/* ============================================================
 * 生物 SPA · 引擎渲染器（生物生产队 2026-10-17，试点 b18.1.3）
 *
 * 地位：docs/ENGINE.md §五迁移指南的课页层实现（对标化学
 * modules/chemistry/js/chem-bond.js 前例：生物侧渲染器 + Eng
 * 原语）。只在 widget params.type 为生物交互类型时被
 * js/biology.js 的 renderWidget 调用。
 *
 * 本文件实现的交互：
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
      var err = el("div", "bio-b6-err", "⚠ 系谱数据校验未通过（" + esc(chk.reason) + "）——已阻断渲染，请联系生物队。");
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
        assumptions: ["分步判读状态机：状态变更只由学生判读动作触发", "冻结答案与图已过 BIO-R25 程序化校验"],
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
        panel.appendChild(el("p", "bio-ask", "看第Ⅰ代和第Ⅱ代：用口诀定显隐。点“显性”或“隐性”。"));
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
        say(true, "所有成员都看过了——点“判读完成”，为这张图收官。");
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
      root.appendChild(el("div", "bio-b6-err", "⚠ 制片步序与冻结口径不一致（须为 解离→漂洗→染色→制片）——已阻断渲染。"));
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
      { t: "复制", cap: "间期：染色体先\"复印\"一份——DNA 复制的直觉版（半保留机制见 b19，纯文本）。" },
      { t: "排队", cap: "中期：染色体排到细胞中央（赤道板）——最整齐，最适合数数目。" },
      { t: "分开", cap: "后期：姐妹染色单体分开，向两极移动。" },
      { t: "进两个细胞", cap: "末期：平均分成两个细胞——染色体数目不变！" }
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
