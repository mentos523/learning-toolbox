/* ============================================================
 * 物理 SPA · 引擎试点渲染器（2026-10-16，p07/p12 迁移）
 *
 * 地位：docs/ENGINE.md §五迁移指南的课页层实现。只在 widget params
 * 或 quiz page 带有 `engine:` 字段时被 physics.js 的 renderWidget /
 * renderZone 分支调用；其余章节永远走旧渲染器（兼容层）。
 *
 * 铁律：
 * - 只消费原语 state() 读回，不重算真值；读数走 readValue/claimValue 口径。
 * - 不改 assets/engine/**；原语缺口见 migration-table.md §四。
 * - 文案/结构/深链/localStorage 键名/页数一律不动（只加 engine: 字段）。
 * - 命名空间隔离：只写 window.PHY_ENGINE 与 window.PHY_PILOT_DEBUG；
 *   CSS 类名复用 phy- 前缀；localStorage 键沿用 ltb-phy-* / phy_hint_seen_*。
 * ============================================================ */
(function () {
  "use strict";

  /* ---------------- 基础工具（与 physics.js 同口径，独立实现） ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "&lt;": "&lt;", "&gt;": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  var SVG_NS = "http://www.w3.org/2000/svg";
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function svgEl(tag, attrs) {
    var n = document.createElementNS(SVG_NS, tag);
    for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }
  function svgText(x, y, str, cls, anchor) {
    var t = svgEl("text", { x: x, y: y, "class": cls || "", "text-anchor": anchor || "middle" });
    t.textContent = str;
    return t;
  }
  function svgStage(cls, label) {
    return svgEl("svg", { "class": "phy-stage " + (cls || ""), viewBox: "0 0 100 100",
      role: "img", "aria-label": label || "物理交互图" });
  }
  function arrowHead(svg, id, color) {
    var defs = svg.querySelector("defs");
    if (!defs) { defs = svgEl("defs", {}); svg.appendChild(defs); }
    if (svg.querySelector("#" + id)) return "url(#" + id + ")";
    var m = svgEl("marker", { id: id, viewBox: "0 0 10 10", refX: "8", refY: "5",
      markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" });
    m.appendChild(svgEl("path", { d: "M0,0 L10,5 L0,10 z", fill: color }));
    defs.appendChild(m);
    return "url(#" + id + ")";
  }
  function fmtN(n, d) {
    if (!isFinite(n)) return "—";
    var s = Number(n).toFixed(d == null ? 1 : d);
    return s.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
  }
  var CSSVAR_FALLBACK = {
    "--phy-known": "#0072B2", "--phy-target": "#D55E00",
    "--phy-force-a": "#E69F00", "--phy-force-b": "#56B4E9",
    "--phy-force-c": "#009E73", "--phy-body": "#222222",
    "--phy-track": "#7A7A7A", "--phy-momentum-a": "#7A7A7A",
    "--phy-momentum-b": "#222222"
  };
  function cssVar(name) {
    try {
      if (typeof window.getComputedStyle === "function") {
        var host = document.getElementById("phy-app") || document.body;
        var v = window.getComputedStyle(host).getPropertyValue(name);
        if (v && String(v).trim()) return String(v).trim();
      }
    } catch (e) {}
    return CSSVAR_FALLBACK[name] || "#222222";
  }
  function later(fn, ms) {
    if (typeof setTimeout === "function") return setTimeout(fn, ms);
    return 0;
  }
  function rafFn(fn) {
    if (typeof window.requestAnimationFrame === "function") return window.requestAnimationFrame(fn);
    return later(fn, 16);
  }
  function cafFn(id) {
    if (typeof window.cancelAnimationFrame === "function") { try { window.cancelAnimationFrame(id); } catch (e) {} }
    else if (typeof clearTimeout === "function") clearTimeout(id);
  }
  function nowMs() {
    try { if (window.performance && window.performance.now) return window.performance.now(); }
    catch (e) {}
    return Date.now();
  }
  var SUPER_DIGITS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function norm(s) {
    return String(s == null ? "" : s).trim().toLowerCase()
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, function (d) { return String(SUPER_DIGITS.indexOf(d)); })
      .replace(/\s+/g, " ");
  }
  /* 首访提示记忆：键名与旧渲染器一致（phy_hint_seen_<页id>），file:// 降级内存 */
  var hintMem = {};
  function hintSeen(key) {
    try { return !!localStorage.getItem("phy_hint_seen_" + key); }
    catch (e) { return !!hintMem[key]; }
  }
  function markHintSeen(key) {
    try { localStorage.setItem("phy_hint_seen_" + key, "1"); }
    catch (e) { hintMem[key] = 1; }
  }
  function readoutBadge(params) {
    var b = params.badge || {};
    var box = el("div", "phy-badge");
    var ro = el("span", "phy-readout", "");
    var q = el("span", "");
    q.innerHTML = '<span class="phy-formula-fallback">' + esc(b.quantityText || "") + "</span>";
    ro.appendChild(q);
    ro.appendChild(el("span", "phy-badge-val", ""));
    ro.appendChild(el("span", "phy-badge-unit", ""));
    box.appendChild(ro);
    if (b.invariant) box.appendChild(el("div", "phy-invariant", esc(b.invariant)));
    function setReadout(mathmlHtml, text) { ro.textContent = text; }
    return { box: box, root: box, setReadout: setReadout };
  }
  function stateBadge(text, tone) {
    return el("div", "phy-state" + (tone ? " phy-state-" + tone : ""), text);
  }
  function noteLine(text) { return el("div", "phy-note", text); }
  function uiSlider(cfg) {
    var row = el("div", "phy-slider-row");
    row.appendChild(el("label", "", cfg.label || ""));
    var minus = el("button", "phy-stepper", "−");
    minus.type = "button"; minus.setAttribute("aria-label", "减小" + (cfg.label || ""));
    var input = el("input", "");
    input.type = "range";
    input.min = String(cfg.min); input.max = String(cfg.max);
    input.step = String(cfg.step); input.value = String(cfg.init);
    input.setAttribute("aria-label", (cfg.label || "滑块") + (cfg.unit ? "（" + cfg.unit + "）" : ""));
    var plus = el("button", "phy-stepper", "+");
    plus.type = "button"; plus.setAttribute("aria-label", "增大" + (cfg.label || ""));
    var val = el("span", "phy-slider-val", "");
    row.appendChild(minus); row.appendChild(input); row.appendChild(plus); row.appendChild(val);
    var fmt = cfg.fmt || function (v) { return fmtN(v, 2); };
    function cur() { return parseFloat(input.value); }
    var handlers = [];
    function paint() { val.textContent = fmt(cur()) + (cfg.unit ? " " + cfg.unit : ""); }
    function fire() { var v = cur(); for (var i = 0; i < handlers.length; i++) handlers[i](v); }
    function set(v, silent) {
      v = Math.min(cfg.max, Math.max(cfg.min, v));
      v = Math.round(v / cfg.step) * cfg.step;
      v = parseFloat(v.toFixed(10));
      input.value = String(v); paint(); if (!silent) fire();
    }
    input.addEventListener("input", function () { paint(); fire(); });
    minus.addEventListener("click", function () { set(cur() - cfg.step); });
    plus.addEventListener("click", function () { set(cur() + cfg.step); });
    paint();
    return { row: row, input: input, val: val, get: cur, set: set,
      on: function (fn) { handlers.push(fn); } };
  }
  function uiPlaybar(o) {
    o = o || {};
    var bar = el("div", "phy-playbar");
    var bPlay = el("button", "", "▶"); bPlay.type = "button"; bPlay.setAttribute("aria-label", "播放");
    var bPause = el("button", "", "⏸"); bPause.type = "button"; bPause.setAttribute("aria-label", "暂停");
    var bRe = el("button", "", "↺"); bRe.type = "button"; bRe.setAttribute("aria-label", "重播");
    var scrub = el("input", "");
    scrub.type = "range"; scrub.min = "0"; scrub.max = "1000"; scrub.value = "0";
    scrub.setAttribute("aria-label", "播放进度");
    bar.appendChild(bPlay); bar.appendChild(bPause); bar.appendChild(bRe); bar.appendChild(scrub);
    function setPlaying(b) { bPlay.disabled = b; bPause.disabled = !b; }
    bPlay.addEventListener("click", function () { setPlaying(true); if (o.onPlay) o.onPlay(); });
    bPause.addEventListener("click", function () { setPlaying(false); if (o.onPause) o.onPause(); });
    bRe.addEventListener("click", function () {
      setPlaying(false); scrub.value = "0"; if (o.onReplay) o.onReplay();
    });
    scrub.addEventListener("input", function () {
      setPlaying(false); if (o.onScrub) o.onScrub(parseFloat(scrub.value) / 1000);
    });
    setPlaying(false);
    return { bar: bar, setPlaying: setPlaying,
      setProgress: function (f) { scrub.value = String(Math.max(0, Math.min(1000, Math.round(f * 1000)))); },
      scrub: scrub, playBtn: bPlay, pauseBtn: bPause };
  }
  /* 指针拖拽（SVG 路径用；Konva 路径用 Eng.Input.bindDrag） */
  function toSVG(svg, cx, cy) {
    try {
      var r = svg.getBoundingClientRect();
      if (r && r.width > 0 && r.height > 0) {
        return { x: (cx - r.left) / r.width * 100, y: (cy - r.top) / r.height * 100 };
      }
    } catch (e) {}
    return { x: 50, y: 50 };
  }
  function dragify(node, o) {
    o = o || {};
    try { node.style.touchAction = "none"; node.style.cursor = "grab"; } catch (e) {}
    function onDown(e) {
      if (e.preventDefault) e.preventDefault();
      if (node.setPointerCapture && e.pointerId != null) {
        try { node.setPointerCapture(e.pointerId); } catch (err) {}
      }
      var moved = false;
      function onMove(ev) {
        var p = toSVG(o.svg, ev.clientX, ev.clientY);
        moved = true;
        if (o.onMove) o.onMove(p.x, p.y, ev);
      }
      function onUp(ev) {
        try {
          node.removeEventListener("pointermove", onMove);
          node.removeEventListener("pointerup", onUp);
          node.removeEventListener("pointercancel", onUp);
        } catch (err) {}
        if (o.onEnd) o.onEnd(moved, ev);
      }
      node.addEventListener("pointermove", onMove);
      node.addEventListener("pointerup", onUp);
      node.addEventListener("pointercancel", onUp);
      if (o.onStart) o.onStart(e);
    }
    node.addEventListener("pointerdown", onDown);
  }

  /* ---------------- 调试注册表（回归断言用） ---------------- */
  var DEBUG = window.PHY_PILOT_DEBUG = window.PHY_PILOT_DEBUG || {};
  function debugFor(pageId) {
    if (!DEBUG[pageId]) DEBUG[pageId] = { widgets: [] };
    return DEBUG[pageId];
  }
  function engOK() { return !!(window.Eng && window.Eng.Lever); }

  /* ============================================================
   * A. 杠杆（p07.3.1-p1）：Eng.Lever + 力箭头数据驱动绘制
   *
   * 状态：支点 O 位置（滑块）。F₁ 由平衡方程解析给出（F₂·L₂/L₁），
   * Eng.Lever 只做真值校验（torque/isBalanced/tipDirection 读回）。
   * 三项根治（审计底稿 audit-findings-merged.json）：
   * - R-M08（PHY-M08）：力臂 = 自支点 O 向力作用线作的垂线段本体
   *   （加粗高亮 + 垂足直角标记），不许悬空弧线暗示；
   * - R-M09（PHY-M09）：力臂弧圆心 = 支点 O；L₂ 单弧、L₁ 双弧编码；
   * - R-M01B（专家队裁决 B"双下"）：F₁/F₂ 箭头一律竖直向下（270°±2°），
   *   作用点落在梁线上（PHY-M07）。
   * 断言用 data-* 属性钉死几何（见 regression-assertions.mjs）。
   * ============================================================ */
  var LEVER_AX = {
    assumptions: ["轻质杠杆（杠杆自重忽略）", "理想支点（无摩擦）", "力竖直向下、杠杆水平"],
    approximations: ["静态理想模型：只判定平衡/力矩/失衡方向，不积分转动动力学过程（倾斜表现为课页层缓动）"],
    errorEstimate: "解析精确：F₁·L₁=F₂·L₂、力矩逐位成立；本页恒平衡"
  };
  function renderLeverEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "杠杆平衡模拟");
    box.appendChild(svg);
    var eqLine = el("div", "phy-formula-line", "");
    box.appendChild(eqLine);
    var stBadge = stateBadge("—", "");
    box.appendChild(stBadge);
    var unit = p.unit || "N";
    var ful = uiSlider({ label: "支点 O 位置", min: p.fulcrumX.min, max: p.fulcrumX.max,
      step: p.fulcrumX.step, init: p.fulcrumX.init, unit: "" });
    box.appendChild(ful.row);
    var F2load = (p.load && p.load.weight) || 10;
    var Lx = 15, Rx = 85, BY = 55;

    function buildLever(O) {
      var L2 = O - Lx, L1 = Rx - O; /* 左臂（阻力臂）/ 右臂（动力臂） */
      var badArm = L1 <= 0 || L2 <= 0;
      var F1 = badArm ? NaN : F2load * L2 / L1; /* 平衡方程解析给出 */
      if (badArm) return null;
      return new Eng.Lever({
        arm1M: L2, arm2M: L1, force1N: F2load, force2N: F1,
        assumptions: LEVER_AX.assumptions,
        approximations: LEVER_AX.approximations,
        errorEstimate: LEVER_AX.errorEstimate
      });
    }

    function drawLever() {
      svg.innerHTML = "";
      var O = ful.get();
      var lever = buildLever(O);
      if (!lever) {
        badge.setReadout("", "F₁ = —");
        stBadge.textContent = "支点不能压在端点上";
        stBadge.className = "phy-state";
        eqLine.textContent = "";
        return;
      }
      var st = lever.state(); /* 只消费读回 */
      var L2 = st.arm1M, L1 = st.arm2M, F1 = st.force2N;
      var Ex = Rx;
      /* 支点三角 + O */
      svg.appendChild(svgEl("path", { d: "M" + (O - 4) + "," + (BY + 8) + " L" + O + "," + BY +
        " L" + (O + 4) + "," + (BY + 8) + " Z", "class": "phy-fulcrum",
        "data-fulcrum": "O", "data-ox": O.toFixed(2) }));
      svg.appendChild(svgText(O, BY + 13, "O", "phy-f-label"));
      /* 梁（恒平衡 → 水平；倾斜缓动略去，真值由 isBalanced 读回） */
      var beam = svgEl("g", { "class": "phy-beam" });
      beam.appendChild(svgEl("line", { x1: Lx, y1: BY, x2: Rx, y2: BY,
        stroke: cssVar("--phy-body"), "stroke-width": 2.4, "data-beam": "1" }));
      var maxF = Math.max(F1, F2load, 1e-9);
      var len2 = 14 * F2load / maxF, len1 = 14 * F1 / maxF;
      /* --- F₂（阻力=钩码重力）：作用点在悬挂点 (Lx,BY)，竖直向下（270°） --- */
      var boxTop2 = BY + len2 - 2;
      beam.appendChild(svgEl("line", { x1: Lx, y1: BY, x2: Lx, y2: boxTop2,
        stroke: cssVar("--phy-track"), "stroke-width": 0.9 }));
      beam.appendChild(svgEl("rect", { x: Lx - 4, y: boxTop2, width: 8, height: 8,
        "class": "phy-body-box" }));
      arrowHead(svg, "fh-eng-f2", cssVar("--phy-force-a"));
      beam.appendChild(svgEl("line", { x1: Lx, y1: BY, x2: Lx, y2: BY + len2,
        stroke: cssVar("--phy-force-a"), "stroke-width": 1.8,
        "marker-end": "url(#fh-eng-f2)",
        "data-force": "F2", "data-x1": Lx, "data-y1": BY,
        "data-x2": Lx, "data-y2": (BY + len2).toFixed(2) }));
      beam.appendChild(svgText(Lx - 2.4, BY + len2 * 0.45, "F₂", "phy-force-label", "end"));
      /* --- F₁（动力）：作用点在动力端 (Ex,BY)，竖直向下（270°） --- */
      arrowHead(svg, "fh-eng-f1", cssVar("--phy-target"));
      beam.appendChild(svgEl("line", { x1: Ex, y1: BY, x2: Ex, y2: BY + len1,
        stroke: cssVar("--phy-target"), "stroke-width": 2.2,
        "marker-end": "url(#fh-eng-f1)",
        "data-force": "F1", "data-x1": Ex, "data-y1": BY,
        "data-x2": Ex, "data-y2": (BY + len1).toFixed(2) }));
      beam.appendChild(svgText(Ex + 2.4, BY + len1 * 0.55, "F₁", "phy-force-label", "start"));
      /* --- 力臂 R-M08：自支点 O 向竖直力线作垂线段（本体，加粗高亮） ---
       * 力线竖直（x=Lx / x=Ex），垂足即力作用点，垂线段沿梁线；垂足直角标记。 */
      function armSeg(xFoot, color, tag) {
        beam.appendChild(svgEl("line", { x1: O, y1: BY, x2: xFoot, y2: BY,
          stroke: color, "stroke-width": 4.5, opacity: 0.55,
          "data-arm": tag, "data-x1": O.toFixed(2), "data-y1": BY,
          "data-x2": xFoot, "data-y2": BY }));
        var s = 2.6, dirX = xFoot < O ? 1 : -1;
        beam.appendChild(svgEl("path", {
          d: "M" + (xFoot + dirX * s).toFixed(1) + "," + BY +
             " L" + (xFoot + dirX * s).toFixed(1) + "," + (BY + s) +
             " L" + xFoot + "," + (BY + s),
          fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1 }));
      }
      armSeg(Lx, cssVar("--phy-force-a"), "L2");
      armSeg(Ex, cssVar("--phy-force-b"), "L1");
      /* --- 力臂弧 R-M09：圆心=支点 O；L₂ 单弧，L₁ 双弧 --- */
      function arcPath(xStart, r, sweep, tag) {
        beam.appendChild(svgEl("path", {
          d: "M" + xStart.toFixed(1) + "," + BY + " A" + r.toFixed(1) + "," + r.toFixed(1) +
             " 0 0 " + sweep + " " + O.toFixed(1) + "," + (BY - r).toFixed(1),
          fill: "none", stroke: tag === "L2" ? cssVar("--phy-force-a") : cssVar("--phy-force-b"),
          "stroke-width": 1.2,
          "data-arc": tag, "data-cx": O.toFixed(2), "data-cy": BY, "data-r": r.toFixed(2) }));
      }
      arcPath(Lx, L2, 1, "L2");
      arcPath(Ex, L1, 0, "L1a");
      var r1b = Math.max(L1 - 2.5, 1);
      arcPath(O + r1b, r1b, 0, "L1b");
      function arcLabel(r, deg, txt, color) {
        var a = deg * Math.PI / 180;
        var mxp = O + r * Math.cos(a), myp = BY + r * Math.sin(a);
        var lxp = O + (r + 6.5) * Math.cos(a), lyp = BY + (r + 6.5) * Math.sin(a);
        beam.appendChild(svgEl("line", { x1: mxp.toFixed(1), y1: myp.toFixed(1),
          x2: lxp.toFixed(1), y2: lyp.toFixed(1), stroke: color, "stroke-width": 0.8 }));
        beam.appendChild(svgText(lxp.toFixed(1), (lyp + 1.5).toFixed(1), txt, "phy-arm-tag", "middle"));
      }
      arcLabel(L2, 225, "L₂", cssVar("--phy-force-a"));
      arcLabel(L1, 315, "L₁", cssVar("--phy-force-b"));
      svg.appendChild(beam);
      /* 支点手柄 */
      var oh = svgEl("circle", { cx: O, cy: BY + 4, r: 6, fill: "transparent", "class": "phy-hot" });
      svg.appendChild(oh);
      dragify(oh, { svg: svg, onMove: function (lx) { ful.set(lx, true); drawLever(); },
        onEnd: function () {} });
      /* 读数与判定：全部来自 Eng.Lever 读回 */
      badge.setReadout("", "F₁ = " + fmtN(st.force2N, 1) + " " + unit);
      eqLine.textContent = "F₁L₁=" + fmtN(-st.torque2Nm, 1) +
        (st.isBalanced ? " ✓ = " : " ≠ ") + fmtN(st.torque1Nm, 1) + "=F₂L₂";
      if (st.isBalanced) { stBadge.textContent = "平衡 ✓"; stBadge.className = "phy-state phy-state-ok"; }
      else if (F1 < F2load) { stBadge.textContent = "省力（F₁ < F₂）"; stBadge.className = "phy-state phy-state-ok"; }
      else { stBadge.textContent = "费力（F₁ > F₂）"; stBadge.className = "phy-state"; }
    }
    ful.on(drawLever);
    drawLever();
    debugFor(pageId).widgets.push({ type: "pulley-lever", mode: "lever",
      buildLever: buildLever, getO: function () { return ful.get(); }, svg: svg,
      setO: function (v) { ful.set(v); } });
    return box;
  }

  /* ============================================================
   * B. 滑轮（p07.3.2-p1）：Eng.Pulley（F=G/n，s绳=n·s物）
   * 读数 = tensionN() 读回；拉绳交互 = pullRopeM() 状态驱动。
   * ============================================================ */
  var PULLEY_AX = {
    assumptions: ["轻绳（质量忽略）", "轻滑轮（质量忽略）", "无摩擦", "绳不可伸长"],
    approximations: ["理想静力学模型：不模拟拉动过程中的动力学加速度，只跟踪几何约束"],
    errorEstimate: "解析精确：F=G/n、s绳=n·s物 逐位成立（无积分误差）"
  };
  function renderPulleyEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "滑轮模拟");
    box.appendChild(svg);
    var eqLine = el("div", "phy-formula-line", "");
    box.appendChild(eqLine);
    var stBadge = stateBadge("—", "");
    box.appendChild(stBadge);
    var ropeNote = noteLine("");
    box.appendChild(ropeNote);
    var unit = p.unit || "N";
    var kind = p.pulleyKind || "fixed";
    var G = (p.load && p.load.weight) || 10;
    var n = kind === "movable" ? 2 : 1;
    var pulley = new Eng.Pulley({
      ropeSegmentsN: n, loadWeightN: G,
      assumptions: PULLEY_AX.assumptions,
      approximations: PULLEY_AX.approximations,
      errorEstimate: PULLEY_AX.errorEstimate
    });
    var PXM = 12; /* 逻辑单位 / m（渲染比例） */
    var MAXPULL = 1.0; /* 最大拉绳 1.0m（几何不穿帮） */

    function drawPulley() {
      svg.innerHTML = "";
      var st = pulley.state();
      arrowHead(svg, "fh-eng-p", cssVar("--phy-target"));
      svg.appendChild(svgEl("line", { x1: 10, y1: 12, x2: 90, y2: 12, "class": "phy-ground" }));
      var riseU = st.loadRiseM * PXM;      /* 物升（逻辑单位） */
      var pullU = st.ropePulledM * PXM;    /* 拉绳（逻辑单位） */
      var F = st.tensionN;
      var lastY = null;
      function makeHandle(cx, cy) {
        var hd = svgEl("circle", { cx: cx, cy: cy, r: 6, "class": "phy-handle",
          fill: cssVar("--phy-known"), "aria-label": "拖动拉绳" });
        svg.appendChild(hd);
        dragify(hd, { svg: svg,
          onMove: function (lx, ly) {
            if (lastY == null) lastY = ly;
            var dU = ly - lastY; lastY = ly; /* 屏幕 y 向下为正 */
            var dM = dU / PXM;
            var room = MAXPULL - pulley.state().ropePulledM;
            dM = Math.max(-pulley.state().ropePulledM, Math.min(room, dM));
            if (Math.abs(dM) > 1e-12) { pulley.pullRopeM(dM); drawPulley(); }
          },
          onEnd: function () { lastY = null; }
        });
        return hd;
      }
      if (kind === "fixed") {
        /* 定滑轮：下拉右绳 d → 左物上升 d（n=1）。几何由 state() 驱动。 */
        var cx = 50, cy = 24, rr = 8;
        svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: rr, fill: "none",
          stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
        svg.appendChild(svgEl("line", { x1: cx, y1: 12, x2: cx, y2: cy - rr,
          stroke: cssVar("--phy-body"), "stroke-width": 1.2 }));
        var ly = 40 - pullU, ry = 40 + pullU;
        svg.appendChild(svgEl("line", { x1: cx - rr, y1: cy, x2: cx - rr, y2: ly,
          stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
        svg.appendChild(svgEl("line", { x1: cx + rr, y1: cy, x2: cx + rr, y2: ry,
          stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
        svg.appendChild(svgEl("rect", { x: cx - rr - 5, y: ly, width: 10, height: 8,
          "class": "phy-body-box" }));
        svg.appendChild(svgText(cx - rr, ly + 12, "G=" + G + " N", "phy-sym-label"));
        makeHandle(cx + rr, ry);
        stBadge.textContent = "定滑轮：不省力，改变方向";
        stBadge.className = "phy-state";
      } else {
        /* 动滑轮：下拉自由端 d → 物上升 d/2（n=2）。几何由 state() 驱动。 */
        var mx = 50, my = 30 - riseU;
        svg.appendChild(svgEl("line", { x1: 30, y1: 12, x2: 30, y2: 24,
          stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
        svg.appendChild(svgEl("line", { x1: 30, y1: 24, x2: mx - 7, y2: my,
          stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
        svg.appendChild(svgEl("circle", { cx: mx, cy: my, r: 7, fill: "none",
          stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
        var hy = 24 + pullU;        svg.appendChild(svgEl("line", { x1: mx + 7, y1: my, x2: mx + 7, y2: 24,
          stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
        svg.appendChild(svgEl("line", { x1: mx + 7, y1: 24, x2: mx + 7, y2: hy,
          stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
        svg.appendChild(svgEl("rect", { x: mx - 5, y: my + 7, width: 10, height: 8,
          "class": "phy-body-box" }));
        svg.appendChild(svgText(mx, my + 20, "G=" + G + " N", "phy-sym-label"));
        makeHandle(mx + 7, hy);
        stBadge.textContent = "动滑轮：F = G/2（省一半力，但要多拉一倍绳子）";
        stBadge.className = "phy-state phy-state-ok";
      }
      badge.setReadout("", "F = " + fmtN(F, 1) + " " + unit);
      eqLine.textContent = kind === "movable" ? "F = G/2" : "F = G";
      ropeNote.textContent = "拉绳 " + fmtN(st.ropePulledM, 2) + " m → 物升 " +
        fmtN(st.loadRiseM, 2) + " m（s绳 = " + n + "·s物）";
    }
    drawPulley();
    debugFor(pageId).widgets.push({ type: "pulley-lever", mode: "pulley",
      kind: kind, pulley: pulley, svg: svg });
    return box;
  }

  /* ============================================================
   * C. 碰撞实验（p07.2.1-p1）：Eng.Collision1D（弹性碰撞）
   * 动量条由 state() 读回数据驱动。v1≤v2 时 Eng 构造抛错（缺口#5），
   * 课页层降级为解析直算（动量守恒恒成立），明确标注"撞不起来"。
   * ============================================================ */
  var COLLISION_AX = {
    assumptions: ["一维对心碰撞", "完全弹性（动能守恒）", "质点近似（忽略转动与形变）", "碰撞瞬时完成"],
    approximations: ["解析模型：碰撞时刻按匀速运动解析求解，步内事件精确处理，无数值积分"],
    errorEstimate: "解析精确：动量守恒逐位（≤1e-6 含浮点余量）"
  };
  function renderCollisionEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "一维碰撞实验");
    box.appendChild(svg);
    var sM1 = uiSlider({ label: "①车质量 m₁", min: p.m1.min, max: p.m1.max,
      step: p.m1.step, init: p.m1.init, unit: "kg" });
    var sM2 = uiSlider({ label: "②车质量 m₂", min: p.m2.min, max: p.m2.max,
      step: p.m2.step, init: p.m2.init, unit: "kg" });
    function vText(v) {
      if (Math.abs(v) < 1e-9) return "0 m/s（静止）";
      return fmtN(Math.abs(v), 1) + " m/s（" + (v > 0 ? "向右" : "向左") + "）";
    }
    function veloControl(cfg, label) {
      var wrap = el("div", "phy-velo");
      var dir = cfg.init < 0 ? -1 : 1;
      var bL = el("button", "phy-dir", "←"); bL.type = "button";
      bL.setAttribute("aria-label", label + "方向：向左");
      var bR = el("button", "phy-dir", "→"); bR.type = "button";
      bR.setAttribute("aria-label", label + "方向：向右");
      var mag = uiSlider({ label: label + "大小", min: 0, max: cfg.max, step: cfg.step,
        init: Math.abs(cfg.init), unit: "m/s" });
      function paintDir() {
        bL.setAttribute("aria-pressed", dir < 0 ? "true" : "false");
        bR.setAttribute("aria-pressed", dir > 0 ? "true" : "false");
      }
      paintDir();
      var handlers = [];
      function get() { return dir * mag.get(); }
      function fire() { var v = get(); for (var i = 0; i < handlers.length; i++) handlers[i](v); }
      bL.addEventListener("click", function () { dir = -1; paintDir(); fire(); });
      bR.addEventListener("click", function () { dir = 1; paintDir(); fire(); });
      mag.on(fire);
      wrap.appendChild(bL); wrap.appendChild(mag.row); wrap.appendChild(bR);
      return { row: wrap, get: get, on: function (h) { handlers.push(h); } };
    }
    var sV1 = veloControl(p.v1, "①车初速度 v₁");
    var sV2 = veloControl(p.v2, "②车初速度 v₂");
    box.appendChild(sM1.row); box.appendChild(sM2.row);
    box.appendChild(sV1.row); box.appendChild(sV2.row);
    var barsBox = el("div", "phy-mbars", "");
    box.appendChild(barsBox);
    var verdict = stateBadge("调好参数，按 ▶ 播放碰撞", "");
    box.appendChild(verdict);
    var e = p.restitution == null ? 1 : p.restitution;

    function params() {
      return { m1: sM1.get(), m2: sM2.get(), v1: sV1.get(), v2: sV2.get() };
    }
    function analytic(q) {
      var v1p = ((q.m1 - e * q.m2) * q.v1 + (1 + e) * q.m2 * q.v2) / (q.m1 + q.m2);
      var v2p = ((q.m2 - e * q.m1) * q.v2 + (1 + e) * q.m1 * q.v1) / (q.m1 + q.m2);
      return { v1p: v1p, v2p: v2p };
    }
    /* 构造碰撞体：v1>v2 走 Eng.Collision1D；否则解析降级（缺口#5） */
    function makeCollision(q) {
      if (q.v1 > q.v2) {
        var col = new Eng.Collision1D({
          mass1Kg: q.m1, mass2Kg: q.m2,
          velocity1Mps: q.v1, velocity2Mps: q.v2,
          radiusM: 0.15, initialGapM: 2.0,
          assumptions: COLLISION_AX.assumptions,
          approximations: COLLISION_AX.approximations,
          errorEstimate: COLLISION_AX.errorEstimate
        });
        var tC = (2.0 - 2 * 0.15) / (q.v1 - q.v2);
        return { eng: col, backed: true, tCollide: tC, tEnd: tC + 1.0, q: q };
      }
      var a = analytic(q);
      var st = { velocity1Mps: q.v1, velocity2Mps: q.v2,
        momentumBeforeKgmps: q.m1 * q.v1 + q.m2 * q.v2,
        momentumAfterKgmps: q.m1 * q.v1 + q.m2 * q.v2,
        analyticV1pMps: a.v1p, analyticV2pMps: a.v2p, hasCollided: false,
        position1M: 0, position2M: 2.0, simTimeSec: 0 };
      return { eng: { state: function () { return st; },
          step: function () { return st; }, reset: function () { return st; } },
        backed: false, tCollide: Infinity, tEnd: 1.0, q: q };
    }

    var rafId = 0, playing = false;
    var cur = null; /* 当前碰撞体包装 */
    function stopA() { playing = false; if (rafId) cafFn(rafId); rafId = 0; }
    var PX = 20; /* 逻辑单位 / m */
    function drawFromState(w, tFrac) {
      var st = w.eng.state(), q = w.q;
      svg.innerHTML = "";
      svg.appendChild(svgEl("line", { x1: 5, y1: 60, x2: 95, y2: 60, "class": "phy-ground" }));
      var xcM = w.backed ? q.v1 * w.tCollide : 1.0; /* 碰撞点（m） */
      function X(m) {
        return Math.max(6, Math.min(94, 50 + (m - xcM) * PX));
      }
      arrowHead(svg, "fh-eng-v1", cssVar("--phy-body"));
      function cart(xm, tag, v) {
        var x = X(xm);
        svg.appendChild(svgEl("rect", { x: x - 5, y: 50, width: 10, height: 8,
          "class": "phy-body-box" }));
        svg.appendChild(svgText(x, 54.5, tag, "phy-cart-label"));
        if (Math.abs(v) > 0.01) {
          var L = Math.max(3, Math.min(16, Math.abs(v) * 3));
          var d = v > 0 ? 1 : -1;
          svg.appendChild(svgEl("line", { x1: x, y1: 46, x2: x + d * L, y2: 46,
            stroke: cssVar("--phy-body"), "stroke-width": 1.6, "marker-end": "url(#fh-eng-v1)" }));
          svg.appendChild(svgText(x + d * (L + 2), 44.5, vText(v), "phy-sym-label",
            d > 0 ? "start" : "end"));
        }
      }
      cart(st.position1M, "①", st.velocity1Mps);
      cart(st.position2M, "②", st.velocity2Mps);
      /* 动量条：读回数据驱动（ENG-34） */
      var p1 = q.m1 * q.v1, p2 = q.m2 * q.v2;
      var p1p = q.m1 * st.analyticV1pMps, p2p = q.m2 * st.analyticV2pMps;
      var pMax = Math.max(Math.abs(p1), Math.abs(p2), Math.abs(p1p), Math.abs(p2p), 1e-9);
      barsBox.innerHTML = "";
      function barRow(tag, pa, pb) {
        var row = el("div", "phy-mbar-row");
        row.appendChild(el("span", "phy-mbar-tag", tag));
        [["①", pa, "momentum-a"], ["②", pb, "momentum-b"]].forEach(function (t) {
          var cell = el("span", "phy-mbar-cell", "");
          if (Math.abs(t[1]) < 1e-9) {
            cell.appendChild(el("span", "phy-mbar-zero", t[0] + " p=0"));
          } else {
            var b = el("span", "phy-mbar",
              t[0] + " p=" + fmtN(t[1], 1));
            b.style.width = Math.max(8, Math.abs(t[1]) / pMax * 110) + "px";
            b.style.background = "var(--phy-" + t[2] + ")";
            if (t[1] < 0) b.style.borderStyle = "dashed";
            cell.appendChild(b);
          }
          row.appendChild(cell);
        });
        barsBox.appendChild(row);
      }
      barRow("碰前", p1, p2);
      barRow("碰后", p1p, p2p);
      var pTot = st.momentumBeforeKgmps;
      badge.setReadout("", "p前 = p后 = " + fmtN(pTot, 1) + " kg·m/s ✓");
    }
    function resetAll() {
      stopA(); bar.setPlaying(false); bar.setProgress(0);
      cur = makeCollision(params());
      drawFromState(cur, 0);
      var q = params();
      if (q.v1 === 0 && q.v2 === 0) verdict.textContent = "两车都不动，撞不起来";
      else if (!cur.backed) {
        verdict.textContent = "①追不上②（v₁≤v₂），撞不起来——但动量依然守恒";
        verdict.className = "phy-state";
      } else verdict.textContent = "调好参数，按 ▶ 播放碰撞";
      bar.playBtn.disabled = (q.v1 === 0 && q.v2 === 0);
    }
    var bar = uiPlaybar({
      onPlay: function () {
        var q = params();
        if (q.v1 === 0 && q.v2 === 0) return;
        cur = makeCollision(q);
        playing = true;
        var t0 = nowMs(), dur = 2400, dt = cur.eng.dt || (1 / 240);
        (function tick() {
          if (!playing) return;
          var target = Math.min(1, (nowMs() - t0) / dur) * cur.tEnd;
          var now = cur.eng.simTimeSec();
          var n = Math.max(0, Math.round((target - now) / dt));
          if (n > 0) cur.eng.step(n);
          drawFromState(cur, 0);
          bar.setProgress(Math.min(1, (nowMs() - t0) / dur));
          if ((nowMs() - t0) / dur >= 1) {
            stopA(); bar.setPlaying(false);
            var st = cur.eng.state(), qq = cur.q, a = analytic(qq);
            if (cur.backed && qq.m1 === qq.m2 && e === 1 && qq.v2 === 0 && qq.v1 !== 0) {
              verdict.textContent = "交换速度 ✓：①车停下，②车以 v₁ 冲出去——动量从①传给了②";
              verdict.className = "phy-state phy-state-ok";
            } else if (!cur.backed) {
              verdict.textContent = "没撞上：速度没变，p前=p后=" + fmtN(st.momentumBeforeKgmps, 1) + " kg·m/s";
            } else {
              verdict.textContent = "碰后：v₁′=" + fmtN(st.velocity1Mps, 2) + " m/s，v₂′=" +
                fmtN(st.velocity2Mps, 2) + " m/s（动量守恒 ✓）";
              verdict.className = "phy-state phy-state-ok";
            }
          } else rafId = rafFn(tick);
        })();
      },
      onPause: function () { stopA(); },
      onReplay: function () { resetAll(); },
      onScrub: function (f) {
        stopA();
        cur = makeCollision(params());
        var target = f * cur.tEnd, dt = cur.eng.dt || (1 / 240);
        cur.eng.step(Math.max(0, Math.round(target / dt)));
        drawFromState(cur, f);
      }
    });
    box.appendChild(bar.bar);
    [sM1, sM2, sV1, sV2].forEach(function (s) { s.on(resetAll); });
    resetAll();
    debugFor(pageId).widgets.push({ type: "collision-lab",
      params: params, makeCollision: makeCollision, analytic: analytic, svg: svg,
      getCur: function () { return cur; } });
    return box;
  }

  /* ============================================================
   * D. 受力状态机（p12.1.3/1.4/2.4-p1）：课页层组合
   * Eng.KonvaView + Eng.Input.bindDrag（原语缺口#1，见 migration-table.md §四）
   *
   * 状态 = {forces:[{mag,angleDeg}], inclineDeg}；所有箭头角度/长度
   * 由状态计算，不许手填角度：
   * - gravity 种：270°（物理定义）；
   * - p12.1.4 的 N：90° + inclineDeg（由斜面状态计算）；
   * - 可拖力：拖拽落点 atan2 读回；
   * - F合 = 矢量和计算。
   * ============================================================ */
  var FORCE_AX = {
    assumptions: ["平面受力示意（非动力学仿真）", "箭头长度 ∝ 力的大小（同一比例）"],
    approximations: ["静态示意：不积分运动方程；合力箭头为矢量和的几何表示"],
    errorEstimate: "解析精确：合力 = 各力矢量和（≤1e-9）；拖拽落点读回 ≤0.5px"
  };
  var FORCE_K = 1.4; /* 逻辑单位 / N */
  var forceViewSeq = 0;
  var forceViews = []; /* 全局 resize 时 refit */
  if (typeof window.addEventListener === "function") {
    window.addEventListener("resize", function () {
      forceViews.forEach(function (rec) {
        try { if (rec.fit) rec.fit(); } catch (e) {}
      });
    });
  }
  function normAng(a) {
    while (a > 180) a -= 360;
    while (a <= -180) a += 360;
    return a;
  }
  function renderForceStateEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var cid = "phy-eng-force-" + (++forceViewSeq);
    var cdiv = el("div", "phy-eng-stage");
    cdiv.id = cid;
    box.appendChild(cdiv);
    var trend = stateBadge("—", "");
    box.appendChild(trend);
    var unit = p.unit || "N";
    var showRes = p.showResultant !== false;
    var body = p.body || { x: 50, y: 45, size: 15 };
    var surface = p.surface || "horizontal";
    var inclineDeg = p.inclineDeg || 0;
    var state = {
      forces: (p.forces || []).map(function (f, i) {
        return { id: f.id || ("f" + i), kind: f.kind || "custom",
          label: f.label || ("F" + (i + 1)),
          angleDeg: f.angleDeg == null ? 0 : f.angleDeg,
          mag: f.mag == null ? 5 : f.mag,
          min: f.min == null ? 0 : f.min, max: f.max == null ? 20 : f.max,
          fixed: !!f.fixed };
      }),
      inclineDeg: inclineDeg
    };
    /* 角度语义（全部由状态/定义计算，不许手填） */
    function angleOf(f) {
      if (f.kind === "gravity") return 270; /* 重力恒竖直向下（PHY-M01） */
      if (f.id === "n" && f.kind === "normal" && surface === "incline")
        return 90 + state.inclineDeg; /* R-M02：由斜面状态计算 */
      return normAng(f.angleDeg);
    }
    function vecOf(f) {
      var a = normAng(angleOf(f)) * Math.PI / 180;
      return { x: f.mag * Math.cos(a), y: f.mag * Math.sin(a) };
    }
    function resultant() {
      var rx = 0, ry = 0;
      state.forces.forEach(function (f) { var v = vecOf(f); rx += v.x; ry += v.y; });
      return { x: rx, y: ry, mag: Math.hypot(rx, ry) };
    }
    var hasFixed = state.forces.some(function (f) { return f.fixed; });
    if (hasFixed) box.appendChild(noteLine("灰色虚线的是固定力（如重力）：大小方向不变，拖不动。"));

    var view = null, input = null, refs = null;
    function arrowLen(mag) { return Math.max(3, Math.min(30, mag * FORCE_K)); }
    function tipOf(f) {
      var a = normAng(angleOf(f)) * Math.PI / 180;
      var L = arrowLen(f.mag);
      return { x: body.x + L * Math.cos(a), y: body.y + L * Math.sin(a), len: L, ang: a };
    }
    function buildScene() {
      refs = { forces: {}, res: null, resLabel: null, ground: null, bodyRect: null,
        bodyLabel: null };
      var layer = view.layer;
      /* 地面 / 斜面（位置由 layout() 统一摆） */
      var ground = new Konva.Line({ points: [0, 0, 1, 1],
        stroke: cssVar("--phy-track"), strokeWidth: 2, listening: false });
      layer.add(ground);
      refs.ground = ground;
      /* 物块（位置由 layout() 统一摆） */
      var bodyRect = new Konva.Rect({ x: 0, y: 0, width: 10, height: 10,
        stroke: cssVar("--phy-body"), strokeWidth: 2, listening: false });
      layer.add(bodyRect);
      refs.bodyRect = bodyRect;
      if (body.label) {
        var bodyLabel = Eng.konvaText({ text: body.label, fontSize: 13,
          fill: cssVar("--phy-body"), listening: false });
        layer.add(bodyLabel);
        refs.bodyLabel = bodyLabel;
      }
      var roleOf = { gravity: "force-a", normal: "force-b", pull: "force-b",
        friction: "force-c", custom: "force-c" };
      state.forces.forEach(function (f) {
        var role = roleOf[f.kind] || "force-c";
        var col = f.fixed ? cssVar("--phy-track") : cssVar("--phy-" + role);
        var arrow = new Konva.Arrow({ points: [0, 0, 1, 1],
          stroke: col, fill: col, strokeWidth: f.fixed ? 1.5 : 2.4,
          pointerLength: 8, pointerWidth: 8,
          dash: f.fixed ? [4, 3] : null, listening: false });
        /* data-force 供回归断言：把逻辑几何钉在节点属性上 */
        arrow.setAttr("data-force", f.id);
        layer.add(arrow);
        var label = Eng.konvaText({ text: f.label, fontSize: 14, fill: col,
          listening: false });
        layer.add(label);
        var rec = { arrow: arrow, label: label, handle: null, shaft: null, f: f,
          hitTip: null, hitShaft: null };
        /* 先摆位置（命中区按真实位置生成），再 bindDrag */
        function placeNodes() {
          var t = tipOf(f);
          var p1 = view.logicalToPixel(body.x, body.y), p2 = view.logicalToPixel(t.x, t.y);
          arrow.points([p1.x, p1.y, p2.x, p2.y]);
          label.position({ x: p2.x + 6, y: p2.y - 10 });
          if (rec.handle) {
            rec.handle.position({ x: p2.x, y: p2.y });
            rec.shaft.points([p1.x, p1.y, p2.x, p2.y]);
          }
        }
        placeNodes();
        if (!f.fixed) {
          var handle = new Konva.Circle({ radius: 7, fill: col,
            stroke: "#fff", strokeWidth: 1.5 });
          handle.setAttr("aria-label", "拖动" + f.label + "的箭头端点");
          /* 注意：handle/shaft 在 placeNodes 之后创建，需重新摆位 */
          layer.add(handle);
          var shaft = new Konva.Line({
            stroke: "rgba(0,0,0,0)", strokeWidth: 22, listening: true });
          layer.add(shaft);
          rec.handle = handle; rec.shaft = shaft;
          placeNodes();
          var bd1 = input.bindDrag(handle, { onEnd: function () { updateBadges(); view.layer.batchDraw(); } });
          var bd2 = input.bindDrag(shaft, { onEnd: function () { updateBadges(); view.layer.batchDraw(); } });
          rec.hitTip = bd1.hit || null; rec.hitShaft = bd2.hit || null;
          function liveFrom(node, angleOnly) {
            var ap = node.getAbsolutePosition();
            var lg = view.pixelToLogical(ap.x, ap.y);
            var dx = lg.x - body.x, dy = lg.y - body.y;
            var d = Math.hypot(dx, dy);
            if (!angleOnly) f.mag = Math.min(f.max, Math.max(f.min, d / FORCE_K));
            if (d > 0.5) f.angleDeg = normAng(Math.atan2(dy, dx) * 180 / Math.PI);
            redraw(); updateBadges();
          }
          [bd1, bd2].forEach(function (bd, bi) {
            var node = bd.node, hit = bd.hit || bd.node;
            hit.on("dragmove", function () { liveFrom(node, bi === 1); });
            node.on("dragmove", function () { liveFrom(node, bi === 1); });
          });
        } else {
          var lock = Eng.konvaText({ text: "🔒", fontSize: 13, listening: false });
          layer.add(lock);
          rec.lock = lock;
        }
        refs.forces[f.id] = rec;
      });
      /* 合力箭头 */
      var resCol = cssVar("--phy-target");
      var res = new Konva.Arrow({ points: [0, 0, 1, 1], stroke: resCol, fill: resCol,
        strokeWidth: 3, pointerLength: 10, pointerWidth: 10, listening: false });
      res.setAttr("data-force", "Fres");
      layer.add(res);
      var resLabel = Eng.konvaText({ text: "F合", fontSize: 14, fill: resCol,
        listening: false });
      layer.add(resLabel);
      refs.res = res; refs.resLabel = resLabel;
    }
    function redraw() {
      if (!view || !refs) return;
      var L2P = function (x, y) { return view.logicalToPixel(x, y); };
      /* 地面 / 斜面 + 物块：统一布局（构造时 mapper 尺寸未定，不能只摆一次） */
      if (surface === "incline") {
        var y0 = 22, gx1 = 5, gx2 = 95;
        var gy2 = y0 + (gx2 - gx1) * Math.tan(state.inclineDeg * Math.PI / 180);
        var g1 = L2P(gx1, y0), g2 = L2P(gx2, gy2);
        refs.ground.points([g1.x, g1.y, g2.x, g2.y]);
      } else {
        var h1 = L2P(5, 22), h2 = L2P(95, 22);
        refs.ground.points([h1.x, h1.y, h2.x, h2.y]);
      }
      var bc = L2P(body.x, body.y);
      var bs = body.size || 15;
      var bpx = bs * view.mapper.params().scale;
      refs.bodyRect.position({ x: bc.x - bpx / 2, y: bc.y - bpx / 2 });
      refs.bodyRect.width(bpx); refs.bodyRect.height(bpx);
      if (refs.bodyLabel) {
        refs.bodyLabel.position({ x: bc.x - bpx / 2, y: bc.y - 8 });
        refs.bodyLabel.width(bpx);
        refs.bodyLabel.align("center");
      }
      state.forces.forEach(function (f) {
        var rec = refs.forces[f.id];
        var t = tipOf(f);
        var p1 = L2P(body.x, body.y), p2 = L2P(t.x, t.y);
        rec.arrow.points([p1.x, p1.y, p2.x, p2.y]);
        rec.arrow.setAttr("data-x1", body.x.toFixed(2));
        rec.arrow.setAttr("data-y1", body.y.toFixed(2));
        rec.arrow.setAttr("data-x2", t.x.toFixed(2));
        rec.arrow.setAttr("data-y2", t.y.toFixed(2));
        rec.arrow.setAttr("data-angle", normAng(angleOf(f)).toFixed(2));
        rec.arrow.setAttr("data-mag", f.mag.toFixed(3));
        rec.label.position({ x: p2.x + 6, y: p2.y - 10 });
        if (rec.handle) {
          rec.handle.position({ x: p2.x, y: p2.y });
          rec.shaft.points([p1.x, p1.y, p2.x, p2.y]);
          /* 命中区跟随（程序化移动后保持 ≥44px 可点） */
          if (rec.hitTip) rec.hitTip.position({
            x: p2.x - rec.hitTip.width() / 2, y: p2.y - rec.hitTip.height() / 2 });
          if (rec.hitShaft) {
            var smx = (p1.x + p2.x) / 2, smy = (p1.y + p2.y) / 2;
            rec.hitShaft.position({
              x: smx - rec.hitShaft.width() / 2, y: smy - rec.hitShaft.height() / 2 });
          }
        }
        if (rec.lock) rec.lock.position({ x: p2.x - 18, y: p2.y - 22 });
      });
      var R = resultant();
      if (showRes && R.mag > 0.05) {
        var rl = arrowLen(R.mag);
        var ra = Math.atan2(R.y, R.x);
        var rp2 = L2P(body.x + rl * Math.cos(ra), body.y + rl * Math.sin(ra));
        var rp1 = L2P(body.x, body.y);
        refs.res.points([rp1.x, rp1.y, rp2.x, rp2.y]);
        refs.res.visible(true);
        refs.res.setAttr("data-angle", normAng(ra * 180 / Math.PI).toFixed(2));
        refs.res.setAttr("data-mag", R.mag.toFixed(3));
        refs.resLabel.position({ x: rp2.x + 6, y: rp2.y - 10 });
        refs.resLabel.visible(true);
      } else {
        refs.res.visible(false); refs.resLabel.visible(false);
      }
      view.layer.batchDraw();
    }
    function updateBadges() {
      var R = resultant();
      badge.setReadout("", "F合 = " + fmtN(R.mag, 1) + " " + unit);
      var t, tone;
      if (pageId === "p12.2.4-p1") {
        /* 超重/失重由 N−G 计算（状态驱动） */
        var gF = null, nF = null;
        state.forces.forEach(function (f) {
          if (f.kind === "gravity") gF = f;
          if (f.id === "n") nF = f;
        });
        var d = (nF ? nF.mag : 0) - (gF ? gF.mag : 0);
        if (d > 0.05) { t = "超重（N>G，视重变大）"; tone = "ok"; }
        else if (d < -0.05) { t = "失重（N<G，视重变小）"; tone = "ok"; }
        else { t = "视重 = 重力（完全静止）"; tone = ""; }
      } else {
        if (R.mag < 0.5) { t = "静止（合力为零）"; tone = ""; }
        else if (Math.abs(R.x) >= Math.abs(R.y)) { t = R.x > 0 ? "向右加速" : "向左加速"; tone = "ok"; }
        else { t = R.y > 0 ? "向上加速" : "向下加速"; tone = "ok"; }
      }
      trend.textContent = t;
      trend.className = "phy-state" + (tone ? " phy-state-" + tone : "");
    }
    function init() {
      if (!engOK()) {
        cdiv.textContent = "引擎未加载";
        return;
      }
      /* 主题跟随页面 data-theme（复验 2026-10-16 打回：硬编码 light 致深色下画布白色） */
      function pageTheme() {
        try {
          return document.body && document.body.getAttribute("data-theme") === "dark"
            ? "dark" : "light";
        } catch (e) { return "light"; }
      }
      view = new Eng.KonvaView({ containerId: cid,
        bounds: { xMin: 0, xMax: 100, yMin: 0, yMax: 100 },
        viewportWPx: 560, viewportHPx: 560, theme: pageTheme(),
        assumptions: FORCE_AX.assumptions,
        approximations: FORCE_AX.approximations,
        errorEstimate: FORCE_AX.errorEstimate });
      /* 深色切换中途变更：data-theme 变化即同步画布底色（箭头走 CSS 变量已自适应） */
      try {
        if (typeof MutationObserver === "function" && document.body) {
          var themeObs = new MutationObserver(function (muts) {
            for (var i = 0; i < muts.length; i++) {
              if (muts[i].attributeName === "data-theme" && view && view.setTheme) {
                view.setTheme(pageTheme());
                break;
              }
            }
          });
          themeObs.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
        }
      } catch (e) {}
      input = new Eng.Input(view);
      /* 正方形视口（与旧 SVG viewBox 0 0 100 100 同权重）；setViewportW 是
       * 16:10，不适用此处的 1:1 bounds，故课页层自行 fit */
      function fit() {
        var w = Math.max(300, Math.min(720, box.clientWidth || 560));
        view.stage.width(w); view.stage.height(w);
        view.mapper.resize(w, w);
        view._bg.width(w); view._bg.height(w);
        var c = document.getElementById(cid);
        if (c) { c.style.width = w + "px"; c.style.height = w + "px"; }
        redraw();
      }
      buildScene();
      fit();
      updateBadges();
      forceViews.push({ fit: fit });
    }
    later(init, 0);
    /* 首访气泡（键名沿旧：<页id>-force） */
    (function () {
      var key = pageId + "-force";
      if (!pageId || hintSeen(key)) return;
      var bub = el("div", "phy-hint-bubble", "👆 拖蓝色圆点：改大小和方向；拖箭身：只转方向");
      box.insertBefore(bub, cdiv);
      var done = false;
      function dismiss() {
        if (done) return; done = true;
        markHintSeen(key);
        if (bub.parentNode) bub.parentNode.removeChild(bub);
      }
      box.addEventListener("pointerdown", function once() {
        box.removeEventListener("pointerdown", once);
        setTimeout(dismiss, 600);
      });
      setTimeout(dismiss, 8000);
    })();
    debugFor(pageId).widgets.push({ type: "force-drag",
      getState: function () {
        return { forces: state.forces.map(function (f) {
            return { id: f.id, kind: f.kind, mag: f.mag,
              angleDeg: normAng(angleOf(f)) };
          }),
          inclineDeg: state.inclineDeg, resultant: resultant() };
      },
      setForce: function (id, mag, angleDeg) {
        state.forces.forEach(function (f) {
          if (f.id === id) {
            if (mag != null) f.mag = Math.min(f.max, Math.max(f.min, mag));
            if (angleDeg != null) f.angleDeg = normAng(angleDeg);
          }
        });
        redraw(); updateBadges();
      },
      view: function () { return view; },
      refs: function () { return refs; } });
    return box;
  }

  /* ============================================================
   * E. 作图（p12.1.1/1.2/2.2-p1）：Eng.PlotBoard
   * "读斜率"步骤用 glider/投影语义实现，读数=解析斜率，断言钉死。
   * ============================================================ */
  var PLOT_AX = {
    assumptions: ["函数图像为理论线（非实测描点）", "读数取自解析函数"],
    approximations: ["JSXGraph 渲染采样：函数曲线为分段线性逼近，断言采样 ≤1e-9"],
    errorEstimate: "解析精确：斜率 = (f(b)−f(a))/(b−a) 逐位；glider 投影 ≤1e-9"
  };
  var plotSeq = 0;
  function axisUnit(lbl) {
    var s = String(lbl || "");
    var m = /\(([^()]+)\)$/.exec(s) || /\/([^/()（）]+)$/.exec(s);
    if (!m) return "";
    var u = m[1].trim();
    return /^[\w°·/().×^ \-]+$/.test(u) ? u : "";
  }
  function renderGraphEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var cid = "phy-eng-plot-" + (++plotSeq);
    var cdiv = el("div", "phy-eng-plot");
    cdiv.id = cid;
    box.appendChild(cdiv);
    var btnRow = el("div", "phy-btn-row");
    box.appendChild(btnRow);
    var out = el("div", "phy-greader-out", "");
    box.appendChild(out);
    var src = p.source || {};
    var steps = p.steps || ["slope"];
    function slopeUnit() {
      var yu = axisUnit(src.yLabel), xu = axisUnit(src.xLabel);
      return yu ? (xu ? yu + "/" + xu : yu) : "";
    }
    var fn = null, pts = null, x0 = -5, x1 = 5;
    if (src.kind === "points" && src.points && src.points.length) {
      pts = src.points.map(function (q) { return { x: q.x != null ? q.x : q[0], y: q.y != null ? q.y : q[1] }; });
      x0 = Math.min.apply(null, pts.map(function (q) { return q.x; }));
      x1 = Math.max.apply(null, pts.map(function (q) { return q.x; }));
      if (x1 - x0 < 1e-9) { x0 -= 1; x1 += 1; }
      /* 分段线性插值函数（与旧 sampleY 同口径） */
      fn = (function (pp) {
        return function (t) {
          for (var i = 0; i + 1 < pp.length; i++) {
            var a = pp[i], b = pp[i + 1];
            if ((t - a.x) * (t - b.x) <= 0 && b.x !== a.x)
              return a.y + (b.y - a.y) * (t - a.x) / (b.x - a.x);
          }
          return NaN;
        };
      })(pts);
    } else if (src.kind === "function" && src.expr) {
      var rhs = src.expr.indexOf("=") >= 0 ? src.expr.split("=").slice(1).join("=") : src.expr;
      try { fn = new Function("t", "return (" + rhs + ");"); fn(0); }
      catch (e) { fn = null; }
      if (p.xRange) { x0 = p.xRange[0]; x1 = p.xRange[1]; }
    }
    var probe = { type: "graph-reader", fn: fn, x0: x0, x1: x1, pts: pts,
      board: null, rec: null, gliders: [], proj: [], slope: null };
    function sampleY(x) {
      if (!fn) return NaN;
      try { return fn(x); } catch (e) { return NaN; }
    }
    function init() {
      if (!engOK() || !fn) {
        out.textContent = fn ? "作图引擎未加载" : "函数解析失败";
        return;
      }
      var yMin = Infinity, yMax = -Infinity;
      for (var sx = 0; sx <= 60; sx++) {
        var yy = sampleY(x0 + (x1 - x0) * sx / 60);
        if (isFinite(yy)) { yMin = Math.min(yMin, yy); yMax = Math.max(yMax, yy); }
      }
      if (!isFinite(yMin)) { yMin = -1; yMax = 1; }
      if (yMax - yMin < 1e-9) { yMin -= 1; yMax += 1; }
      var pad = (yMax - yMin) * 0.15;
      yMin -= pad; yMax += pad;
      /* V-05：y 轴标签顶部留白（板顶不再裁剪 F/N 这类轴标签） */
      yMax += (yMax - yMin) * 0.10;
      /* V-05：板范围 = 数据范围 + 轴标签边距。左侧留 8% x 幅给 y 轴刻度标签
       *（轴贴边时 JSXGraph 不生成刻度标签）；y 标签放在顶部留白内侧。 */
      var xPadL = (x1 - x0) * 0.08;
      var bx0 = x0 - xPadL, bx1 = x1;
      var yLblY = yMax - (yMax - yMin) * 0.02;
      /* V-04：主题跟随页面 data-theme（与受力页 Konva 视图同路） */
      function pageTheme() {
        try {
          return document.body && document.body.getAttribute("data-theme") === "dark"
            ? "dark" : "light";
        } catch (e) { return "light"; }
      }
      /* V-05：板宽随容器自适应（参考受力页 fit()；390 下不再固定 560 横向溢出） */
      var bw = Math.max(280, Math.min(720, cdiv.clientWidth || box.clientWidth || 560));
      var board = new Eng.PlotBoard({ containerId: cid,
        bounds: { xMin: bx0, xMax: bx1, yMin: yMin, yMax: yMax },
        fitData: true, theme: pageTheme(),
        viewportWPx: bw, viewportHPx: Math.round(bw * 0.72),
        assumptions: PLOT_AX.assumptions,
        approximations: PLOT_AX.approximations,
        errorEstimate: PLOT_AX.errorEstimate });
      probe.board = board;
      /* V-04：data-theme 变化即同步作图板主题 */
      try {
        if (typeof MutationObserver === "function" && document.body) {
          var plotThemeObs = new MutationObserver(function (muts) {
            for (var mi = 0; mi < muts.length; mi++) {
              if (muts[mi].attributeName === "data-theme" && board && board.setTheme) {
                board.setTheme(pageTheme());
                break;
              }
            }
          });
          plotThemeObs.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
        }
      } catch (e) {}
      var rec = board.functionGraph({ fn: fn, domain: [x0, x1], name: "f" });
      probe.rec = rec;
      var J = board.board;
      if (pts) {
        pts.forEach(function (q) {
          J.create("point", [q.x, q.y], { fixed: true, name: "", size: 3 });
        });
      }
      J.create("text", [x1, yMin + (yMax - yMin) * 0.04, src.xLabel || "x"],
        { fixed: true, anchorX: "right", fontSize: 13 });
      J.create("text", [bx0 + (bx1 - bx0) * 0.02, yLblY, src.yLabel || "y"],
        { fixed: true, fontSize: 13 });
      if (steps.indexOf("slope") >= 0) {
        var b = el("button", "phy-mini", "读斜率");
        b.type = "button";
        b.addEventListener("click", function () {
          var a = x0 + (x1 - x0) * 0.25, bb = x0 + (x1 - x0) * 0.75;
          var gA = board.gliderOnCurve(rec, a, sampleY(a));
          var gB = board.gliderOnCurve(rec, bb, sampleY(bb));
          probe.gliders = [gA, gB];
          probe.proj = [
            board.checkGliderProjection(gA, rec, { x: a, y: sampleY(a) }),
            board.checkGliderProjection(gB, rec, { x: bb, y: sampleY(bb) })
          ];
          var ya = sampleY(a), yb = sampleY(bb);
          var k = (yb - ya) / (bb - a);
          probe.slope = k;
          /* 直线度检验（与旧口径一致）：弦内 8 等分采样 */
          var dev = 0;
          for (var si = 0; si <= 8; si++) {
            var sx3 = a + (bb - a) * si / 8, sy3 = sampleY(sx3);
            if (isFinite(sy3)) {
              var ych = ya + (yb - ya) * (sx3 - a) / (bb - a);
              dev = Math.max(dev, Math.abs(sy3 - ych));
            }
          }
          var exact = dev <= 0.02 * (Math.abs(yb - ya) || (yMax - yMin) || 1);
          J.create("segment", [gA, gB], { strokeWidth: 2.5,
            dash: exact ? 0 : 2, strokeColor: exact ? "#009E73" : "#D55E00" });
          var ku = slopeUnit(), kuS = ku ? " " + ku : "";
          out.textContent = exact
            ? "斜率 k = " + fmtN(k, 2) + kuS + "（直线段，精确值）"
            : "斜率 ≈ " + fmtN(k, 2) + kuS + "（曲线段，近似——切线斜率示意，别当精确值抄）";
          badge.setReadout("", "k = " + fmtN(k, 2) + (exact ? "" : "（近似）") + kuS);
        });
        btnRow.appendChild(b);
      }
    }
    later(init, 0);
    debugFor(pageId).widgets.push(probe);
    return box;
  }

  /* ============================================================
   * F. 两弹簧秤对拉（p12.2.3-p1）：课页层状态机（原语缺口#2）
   * 同一 state.forceN 驱动两个秤读数；R-SPR-01：两读数恒等。
   * ============================================================ */
  function renderSpringPairEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "两弹簧秤对拉");
    box.appendChild(svg);
    var fc = p.force || {}, fMax = fc.max || 10;
    var state = { forceN: fc.init != null ? fc.init : 4 };
    var sF = uiSlider({ label: "拉力", min: fc.min != null ? fc.min : 0, max: fMax,
      step: fc.step || 0.5, init: state.forceN, unit: "N",
      fmt: function (v) { return fmtN(v, 1); } });
    box.appendChild(sF.row);
    var st = stateBadge("两个秤的读数永远一样", "ok");
    box.appendChild(st);
    var readEls = [];
    function draw() {
      state.forceN = sF.get();
      var F = state.forceN, ext = F / fMax * 13;
      svg.innerHTML = "";
      readEls = [];
      function scale(cx, flip, label, tag) {
        var dir = flip ? -1 : 1;
        svg.appendChild(svgEl("rect", { x: cx - 7, y: 38, width: 14, height: 22,
          "class": "phy-body-box" }));
        svg.appendChild(svgText(cx, 34, label, "phy-note-text"));
        var x0 = cx + dir * 7, x1 = cx + dir * (7 + ext), d = "M" + x0 + ",49";
        for (var j = 0; j <= 6; j++)
          d += " L" + (x0 + (x1 - x0) * j / 6).toFixed(1) + "," + (49 + (j % 2 ? -3 : 3));
        svg.appendChild(svgEl("path", { d: d, fill: "none",
          stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
        svg.appendChild(svgEl("circle", { cx: x1 + dir * 3.4, cy: 49, r: 2.4, fill: "none",
          stroke: cssVar("--phy-body"), "stroke-width": 1.2 }));
        var rd = svgText(cx, 68, fmtN(F, 1) + " N", "phy-force-label");
        rd.setAttribute("data-scale", tag);
        rd.setAttribute("data-reading", fmtN(F, 1));
        svg.appendChild(rd);
        readEls.push(rd);
      }
      scale(30, true, "甲秤", "A");
      scale(70, false, "乙秤", "B");
      svg.appendChild(svgText(50, 49, "对拉", "phy-note-text phy-text-halo"));
      svg.appendChild(svgEl("line", { x1: 41, y1: 49, x2: 59, y2: 49,
        stroke: cssVar("--phy-track"), "stroke-width": 1, "stroke-dasharray": "2.5,2" }));
      badge.setReadout("", "F甲 = F乙 = " + fmtN(F, 1) + " N");
      st.textContent = "甲拉乙的力 = 乙拉甲的力：大小相等、方向相反";
    }
    sF.on(draw);
    draw();
    debugFor(pageId).widgets.push({ type: "spring-scale-pull",
      getForceN: function () { return state.forceN; },
      setForceN: function (v) { sF.set(v); },
      readings: function () {
        return readEls.map(function (r) { return parseFloat(r.getAttribute("data-reading")); });
      },
      svg: svg });
    return box;
  }

  /* ============================================================
   * G. 练习判分器（p07.3.0-p2 / p12.2.0-p2）：YP-05 + YP-15（原语缺口#3）
   *
   * YP-05 错误反馈三件套：①哪里错了 ②正确做法一句话 ③下一步试什么。
   *   禁止只有"✗ 再想想"。
   * YP-15 读数判分容差：数值题按容差判定（±1 个答案末位，页面声明），
   *   不许精确字符串匹配；文字题归一化匹配（沿用旧口径并声明）。
   * 防刷题：① 按序解锁（答对上一题才开下一题）；② 连错 5 次冷却 5 秒。
   * 判分口径声明展示在每道填空题下（YP-15"须明确声明"）。
   * ============================================================ */
  function gradeFill(q, raw) {
    var g = q.grade || {};
    if (g.numeric) {
      var exp = parseFloat(g.answer);
      var dec = g.decimals == null ? 0 : g.decimals;
      var tol = g.tol != null ? g.tol : Math.pow(10, -dec); /* ±1 个答案末位 */
      var v = parseFloat(norm(raw).replace(/,/g, ""));
      if (!isFinite(v) || !isFinite(exp)) return { ok: false, tol: tol };
      return { ok: Math.abs(v - exp) <= tol + 1e-12, tol: tol,
        expected: exp, got: v };
    }
    var v = norm(raw);
    var candidates = [q.answer].concat(q.accept || []);
    var ok = candidates.some(function (a) { return norm(a) === v; });
    return { ok: ok, tol: null };
  }
  function quizStoreKey(pageId) { return "ltb-phy-quizeng-" + pageId; }
  function loadQuiz(pageId) {
    try {
      var v = JSON.parse(localStorage.getItem(quizStoreKey(pageId)));
      return v || {};
    } catch (e) { return {}; }
  }
  function saveQuiz(pageId, obj) {
    try { localStorage.setItem(quizStoreKey(pageId), JSON.stringify(obj)); }
    catch (e) {}
  }
  function renderQuizPage(page, pageId) {
    var wrap = el("div", "phy-quiz-eng");
    var saved = loadQuiz(pageId);
    var questions = page.questions || [];
    var qStates = questions.map(function (q, i) {
      return { solved: !!saved["q" + i], wrongStreak: 0, cooling: false };
    });
    function persist() {
      var o = {};
      qStates.forEach(function (s, i) { if (s.solved) o["q" + i] = 1; });
      saveQuiz(pageId, o);
    }
    function threePiece(q, fb, where, retryFn) {
      /* YP-05 三件套：①哪里错了 ②正确做法一句话 ③下一步试什么 */
      fb.innerHTML = '<span class="bad">✗ 不对</span> ' + esc(where) +
        '<br><span class="tip">💡 正确做法：' + esc(q.tip || "看题干再想一步。") + "</span>" +
        '<br><span class="tip">👉 下一步：<button type="button" class="phy-mini phy-retry">再试一次</button></span>';
      var rb = fb.querySelector(".phy-retry");
      if (rb && retryFn) rb.addEventListener("click", retryFn);
    }
    function sayOk(q, fb, msg) {
      fb.innerHTML = '<span class="ok">✓ 答对了</span> ' + esc(msg) +
        (q.tip ? '<br><span class="tip">💡 ' + esc(q.tip) + "</span>" : "");
    }
    function cooldown(qs, fb, enableFn) {
      qs.cooling = true;
      var left = 5;
      fb.innerHTML = '<span class="bad">⏳ 连错 5 次，冷静 ' + left +
        " 秒再试（防刷题）</span>";
      var timer = setInterval(function () {
        left--;
        if (left <= 0) {
          clearInterval(timer);
          qs.cooling = false; qs.wrongStreak = 0;
          enableFn();
          fb.innerHTML = '<span class="tip">👉 可以继续了，换个思路试试。</span>';
        } else {
          fb.innerHTML = '<span class="bad">⏳ 连错 5 次，冷静 ' + left +
            " 秒再试（防刷题）</span>";
        }
      }, 1000);
    }
    questions.forEach(function (q, qi) {
      if (q.type === "review") {
        var rv = el("div", "phy-review");
        rv.appendChild(el("div", "phy-review-head", "📝 本章小结"));
        rv.appendChild(el("div", "phy-review-body", q.html || ""));
        wrap.appendChild(rv);
        return;
      }
      var qs = qStates[qi];
      var box = el("div", "phy-q");
      var fb = el("div", "phy-q-fb", "");
      box.appendChild(el("div", "phy-q-stem", esc(q.stem || q.stemBefore || "")));
      box._locked = qi > 0 && !qStates[qi - 1].solved;
      function isLocked() { return box._locked; }
      function refreshLock() {
        box._locked = qi > 0 && !qStates[qi - 1].solved;
        box.classList.toggle("phy-q-locked", box._locked);
        var lk = box.querySelector(".phy-q-locknote");
        if (box._locked && !lk) {
          box.insertBefore(el("div", "phy-q-locknote", "🔒 先答对上一题，再开这一题（防刷题式跳过）。"), fb);
        } else if (!box._locked && lk) {
          lk.parentNode.removeChild(lk);
        }
      }
      function onSolved() {
        qs.solved = true; qs.wrongStreak = 0;
        persist();
        refreshAllLocks(); /* 解锁下一题 */
      }
      function wrongCommon(retryFn) {
        qs.wrongStreak++;
        if (qs.wrongStreak >= 5 && !qs.cooling) {
          cooldown(qs, fb, function () { setEnabled(true); });
          setEnabled(false);
        }
      }
      var setEnabled = function () {};
      if (q.type === "choice") {
        var opts = el("div", "phy-q-opts");
        (q.options || []).forEach(function (op, i) {
          var b = el("button", "", esc(op));
          b.type = "button";
          b.disabled = isLocked();
          b.addEventListener("click", function () {
            if (qs.solved || qs.cooling || isLocked()) return;
            if (i === q.answer) {
              b.classList.add("judged-ok");
              sayOk(q, fb, "就是它。");
              qs.solved = true;
              onSolved();
            } else {
              b.classList.add("judged-bad");
              b.disabled = true;
              threePiece(q, fb, "你选了「" + op + "」——不对。", function () {
                b.disabled = false; b.classList.remove("judged-bad"); b.focus();
              });
              wrongCommon();
            }
          });
          opts.appendChild(b);
        });
        setEnabled = function (en) {
          Array.prototype.forEach.call(opts.children, function (b) {
            if (!b.classList.contains("judged-ok")) b.disabled = !en || isLocked();
          });
        };
        box.appendChild(opts);
      } else if (q.type === "fill") {
        var stem = el("div", "phy-q-stem", "");
        stem.innerHTML = esc(q.stemBefore || "") +
          ' <input type="text" style="width:7em;display:inline-block;" aria-label="填空"' +
          (isLocked() ? " disabled" : "") + ">" +
          " " + esc(q.stemAfter || "") +
          (q.hint ? ' <span style="color:var(--phy-ink-soft);font-size:0.82rem;">' + esc(q.hint) + "</span>" : "");
        box.appendChild(stem);
        var input = stem.querySelector("input");
        var btn = el("button", "phy-q-check", "检查");
        btn.type = "button";
        btn.disabled = isLocked();
        var decl = el("div", "phy-q-tol",
          (q.grade && q.grade.numeric)
            ? "判分口径（YP-15）：数值题按 ±" + (q.grade.tol != null ? q.grade.tol : "1 个答案末位") + " 容差判定，不精确匹配字符串。"
            : "判分口径（YP-15）：文字题归一化匹配（去空格/小写/上标转数字）+ 候选集。");
        btn.addEventListener("click", function () {
          if (qs.solved || qs.cooling || isLocked()) return;
          var r = gradeFill(q, input.value);
          if (r.ok) {
            sayOk(q, fb, "正确。");
            qs.solved = true;
            onSolved();
          } else {
            var where = r.tol != null
              ? "你填的是「" + input.value + "」——不在容差内（±" + r.tol + "）。"
              : "你填的是「" + input.value + "」——不对。";
            threePiece(q, fb, where, function () { input.focus(); input.select(); });
            wrongCommon();
          }
        });
        if (input.addEventListener) {
          input.addEventListener("keydown", function (e) {
            if (e.key === "Enter" && btn.click) btn.click();
          });
          input.addEventListener("input", function () {
            btn.disabled = isLocked() || qs.cooling || norm(input.value) === "";
          });
        }
        box.appendChild(btn);
        box.appendChild(decl);
        setEnabled = function (en) {
          btn.disabled = !en || isLocked() || norm(input.value) === "";
          input.disabled = !en || isLocked();
        };
      }
      box.appendChild(fb);
      box._refreshLock = refreshLock;
      box._setEnabled = function (en) { setEnabled(en); };
      box._qs = qs;
      wrap.appendChild(box);
      refreshLock();
    });
    function refreshAllLocks() {
      Array.prototype.forEach.call(wrap.children, function (ch) {
        if (!ch._refreshLock) return;
        ch._refreshLock();
        /* 锁态变化时同步各题控件禁用态 */
        if (ch._qs && !ch._qs.solved && !ch._qs.cooling && ch._setEnabled)
          ch._setEnabled(true);
      });
    }
    debugFor(pageId).quiz = { gradeFill: gradeFill, pageId: pageId,
      states: function () { return qStates.map(function (s) {
        return { solved: s.solved, wrongStreak: s.wrongStreak, cooling: s.cooling }; }); } };
    return wrap;
  }

  /* ---------------- 总调度 ---------------- */
  var ENGINE_TYPES = {
    "pulley-lever": function (p, pageId) {
      return (p.mode === "pulley" || (p.engine && p.engine.primitive === "Pulley"))
        ? renderPulleyEngine(p, pageId) : renderLeverEngine(p, pageId);
    },
    "collision-lab": renderCollisionEngine,
    "force-drag": renderForceStateEngine,
    "graph-reader": renderGraphEngine,
    "spring-scale-pull": renderSpringPairEngine
  };
  function render(type, params, pageId) {
    var fn = ENGINE_TYPES[type];
    if (!fn) return null;
    try {
      return fn(params || {}, pageId || "");
    } catch (err) {
      if (typeof console !== "undefined" && console.error)
        console.error("[phy-engine] 渲染失败 " + type + ":", err);
      var d = el("div", "phy-widget", "引擎渲染失败，已回退旧实现不可用——请检查控制台。");
      return d;
    }
  }

  window.PHY_ENGINE = {
    render: render,
    renderQuizPage: renderQuizPage,
    gradeFill: gradeFill,
    debug: DEBUG
  };
})();
