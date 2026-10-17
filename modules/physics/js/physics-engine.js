/* ============================================================
 * 物理 SPA · 引擎渲染器（2026-10-16 试点 p07/p12；2026-10-17 批1 扩至
 * p00/p01/p03/p04/p05/p06/p11/p13/p14/p17）
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
  function $(sel, root) { return (root || document).querySelector(sel); }
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
      if (typeof window.getComputedStyle === "function" && document.getElementById) {
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
  /* MathML 可用性检测（旧渲染器同名函数的引擎侧实现，与 physics.js 闭包隔离） */
  var mmlCached = null;
  function mathmlOK() {
    if (window.MathMLCheck && typeof window.MathMLCheck.supported === "boolean")
      return window.MathMLCheck.supported;
    if (mmlCached != null) return mmlCached;
    var ok = false;
    try {
      var t = document.createElementNS("http://www.w3.org/1998/Math/MathML", "math");
      if (t && t.namespaceURI === "http://www.w3.org/1998/Math/MathML") {
        var holder = document.createElement("div");
        holder.setAttribute("aria-hidden", "true");
        holder.style.cssText = "position:absolute;left:-9999px;top:0;visibility:hidden;";
        holder.innerHTML = "<math><mspace height=\"23px\" width=\"77px\"></mspace></math>";
        document.body.appendChild(holder);
        var ms = holder.querySelector("mspace");
        if (ms) { var r = ms.getBoundingClientRect(); ok = r.width > 10 && r.height > 10; }
        holder.parentNode.removeChild(holder);
      }
    } catch (e) { ok = false; }
    mmlCached = ok;
    return ok;
  }
  function readoutBadge(params) {
    var b = params.badge || {};
    var box = el("div", "phy-badge");
    var ro = el("span", "phy-readout", "");
    var q = el("span", "");
    q.innerHTML = b.quantityMathml && mathmlOK()
      ? b.quantityMathml
      : '<span class="phy-formula-fallback">' + esc(b.quantityText || "ρ") + "</span>";
    ro.appendChild(q);
    ro.appendChild(el("span", "phy-badge-val", ""));
    ro.appendChild(el("span", "phy-badge-unit", ""));
    box.appendChild(ro);
    if (b.invariant) box.appendChild(el("div", "phy-invariant", esc(b.invariant)));
    /* 整行读数替换（新组件用）：MathML 优先，否则纯文本；单位与数值同行 */
    function setReadout(mathmlHtml, text) {
      if (mathmlHtml && mathmlOK()) ro.innerHTML = mathmlHtml;
      else ro.textContent = text;
    }
    return { box: box, val: $(".phy-badge-val", box), unit: $(".phy-badge-unit", box),
      root: box, setReadout: setReadout };
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
          fill: cssVar("--phy-body"), listening: false, halo: true });
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
        /* P-02 返工（2026-10-16 复验）：data-force 标识标签所属箭头（见 resLabel） */
        label.setAttr("data-force", f.id);
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
      /* P-02 返工（2026-10-16 复验）：data-force 标识标签所属箭头，供"他杆"断言
       * 排除自身箭头（尖端锚定+halo 是正确做法，不适用 6px 门禁）。 */
      resLabel.setAttr("data-force", "Fres");
      layer.add(resLabel);
      refs.res = res; refs.resLabel = resLabel;
    }
    /* P-01/P-02（2026-10-16）：
     * - 内容自适应 bounds：grow-only，中心恒为物块中心。半宽 forceR 按实测
     *   内容包围盒 + 14px 安全边距确定；拖拽导致内容超出时只放大不缩小
     *   （不许裁掉任何内容；中心固定故无缩放跳变）。
     *   黄队口径：初始内容包围盒/画布面积 ≥35%，内容边距 ≥8px。
     * - 标签避让：力标签/合力标签按候选位评分选零碰撞位置；紧贴时加 halo。
     * - 地面线收缩到内容范围；水平面贴住物块底部（原 y=22 悬空，不合直觉）。
     * 逻辑几何（FORCE_K/tipOf/角度）零改动：回归断言钉的是逻辑层，不受影响。 */
    var forceR = 0;
    var forceInLayout = false;
    function overlapArea(a, b) {
      var ix = Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x);
      var iy = Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y);
      return (ix > 0 && iy > 0) ? ix * iy : 0;
    }
    function pxDistToSeg(px, py, ax, ay, bx, by) {
      var dx = bx - ax, dy = by - ay;
      var L2 = dx * dx + dy * dy;
      var t = L2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / L2 : 0;
      t = Math.max(0, Math.min(1, t));
      return Math.hypot(px - (ax + t * dx), py - (ay + t * dy));
    }
    function boxSegDist(box, s) {
      /* 矩形与线段最短距离：端点在内或线段穿盒即 0 */
      if (s.ax >= box.x && s.ax <= box.x + box.w && s.ay >= box.y && s.ay <= box.y + box.h) return 0;
      if (s.bx >= box.x && s.bx <= box.x + box.w && s.by >= box.y && s.by <= box.y + box.h) return 0;
      var cx = box.x + box.w / 2, cy = box.y + box.h / 2;
      if (pxDistToSeg(cx, cy, s.ax, s.ay, s.bx, s.by) < Math.min(box.w, box.h) / 2) return 0;
      return Math.min(
        pxDistToSeg(box.x, box.y, s.ax, s.ay, s.bx, s.by),
        pxDistToSeg(box.x + box.w, box.y, s.ax, s.ay, s.bx, s.by),
        pxDistToSeg(box.x, box.y + box.h, s.ax, s.ay, s.bx, s.by),
        pxDistToSeg(box.x + box.w, box.y + box.h, s.ax, s.ay, s.bx, s.by));
    }
    /* P-02 标签避让：候选位评分（零碰撞优先、位移最小次之）。
     * items: [{node, tip:{x,y}}]；fixedBoxes: 固定障碍盒；shafts: 杆线段；
     * W/H: 画布像素。返回已放置的标签盒数组。 */
    function avoidLabels(items, fixedBoxes, shafts, W, H) {
      var placed = [];
      items.forEach(function (it) {
        var node = it.node, tip = it.tip;
        var w = node.width(), h = node.height();
        var cands = [
          { dx: 6, dy: -10 }, { dx: -6 - w, dy: -10 },
          { dx: 6, dy: 10 }, { dx: -6 - w, dy: 10 },
          { dx: -w / 2, dy: -10 - h }, { dx: -w / 2, dy: 10 }
        ];
        /* 候选评分：零碰撞优先、位移最小次之。minDOther 供合力逃逸触发器用。
         * pad/thr：常规路径 pad=0、thr=6（与复验已验证版本逐像素一致）；
         * 逃逸路径 pad=2、thr=6——getClientRect 会把 strokeWidth 4 的 halo 描边
         * 计入（每边膨胀 2px），逃逸按实测口径严格评分。 */
        function scoreCands(cs, pad, thr) {
          var best = null, i;
          cs.forEach(function (c) {
            var nx = tip.x + c.dx, ny = tip.y + c.dy;
            var box = { x: nx - pad, y: ny - pad, w: w + pad * 2, h: h + pad * 2 };
            var score = 0;
            if (box.x < 2 || box.y < 2 || box.x + box.w > W - 2 || box.y + box.h > H - 2) score += 1e6;
            for (i = 0; i < placed.length; i++) score += overlapArea(box, placed[i]) * 3;
            for (i = 0; i < fixedBoxes.length; i++) score += overlapArea(box, fixedBoxes[i]) * 3;
            var minD = Infinity, minDOther = Infinity;
            for (i = 0; i < shafts.length; i++) {
              var d = boxSegDist(box, shafts[i]);
              if (d < minD) minD = d;
              if (shafts[i] !== it.ownShaft && d < minDOther) minDOther = d;
              if (d < thr) score += (thr - d) * 60;
            }
            var disp = Math.hypot(c.dx - 6, c.dy + 10);
            var key = score * 1e6 + disp;
            if (best === null || key < best.key)
              best = { nx: nx, ny: ny, box: box, score: score, minD: minD,
                minDOther: minDOther, key: key, moved: disp > 0.5 };
          });
          return best;
        }
        var best = scoreCands(cands, 0, 6);
        /* P-02 返工（2026-10-16 复验打回）：合力标签经常规 6 候选仍与他杆实测 <6px
         * 时（共线构型：尖端落在他杆上，或如 85°/95° 盒近杆远；8 = 6 + halo 膨胀
         * 2px，即 node 口径 <8 等价于实测口径 <6），追加逃逸候选网格后按实测口径
         * 重选：垂直于最近他杆 ±D（D=max(w,h)/2+10，盒居中）× 沿杆向
         * {0, ±(h/2+6), ±(h+10)}。不触发时布局与复验已验证版本逐像素一致。 */
        if (it.isResultant && best.minDOther < 8) {
          var near = null, nd = Infinity, k;
          for (k = 0; k < shafts.length; k++) {
            if (shafts[k] === it.ownShaft) continue;
            var td = pxDistToSeg(tip.x, tip.y, shafts[k].ax, shafts[k].ay,
              shafts[k].bx, shafts[k].by);
            if (td < nd) { nd = td; near = shafts[k]; }
          }
          if (near) {
            var evx = near.bx - near.ax, evy = near.by - near.ay;
            var evl = Math.hypot(evx, evy) || 1, eux = evx / evl, euy = evy / evl;
            var epx = -euy, epy = eux;
            var D = Math.max(w, h) / 2 + 10;
            [-1, 1].forEach(function (s) {
              [0, h / 2 + 6, -(h / 2 + 6), h + 10, -(h + 10)].forEach(function (a) {
                var cx = tip.x + epx * s * D + eux * a;
                var cy = tip.y + epy * s * D + euy * a;
                cands.push({ dx: cx - tip.x - w / 2, dy: cy - tip.y - h / 2 });
              });
            });
            best = scoreCands(cands, 2, 6); /* 逃逸：按实测口径（含 halo）严格评分 */
          }
        }
        node.position({ x: best.nx, y: best.ny });
        placed.push(best.box);
        /* halo：残留碰撞 / 被迫移位 / 与杆紧贴（<8px）时加小底衬 */
        if (best.score > 0 || best.moved || best.minD < 8) {
          node.stroke(view.palette.bg);
          node.strokeWidth(4);
          node.fillAfterStrokeEnabled(true);
        } else {
          node.strokeWidth(0);
        }
      });
      return placed;
    }
    function layoutForceNodes() {
      var L2P = function (x, y) { return view.logicalToPixel(x, y); };
      var scale = view.mapper.params().scale;
      var W = view.stage.width(), H = view.stage.height();
      var bc = L2P(body.x, body.y);
      var bs = body.size || 15;
      var bpx = bs * scale;
      refs.bodyRect.position({ x: bc.x - bpx / 2, y: bc.y - bpx / 2 });
      refs.bodyRect.width(bpx); refs.bodyRect.height(bpx);
      if (refs.bodyLabel) {
        refs.bodyLabel.position({ x: bc.x - bpx / 2, y: bc.y - 8 });
        refs.bodyLabel.width(bpx);
        refs.bodyLabel.align("center");
      }
      var shafts = [], fixedBoxes = [], labelItems = [], tipPts = [];
      fixedBoxes.push({ x: bc.x - bpx / 2, y: bc.y - bpx / 2, w: bpx, h: bpx });
      if (refs.bodyLabel)
        fixedBoxes.push({ x: refs.bodyLabel.x(), y: refs.bodyLabel.y(),
          w: refs.bodyLabel.width(), h: refs.bodyLabel.height() });
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
        var shaftObj = { ax: p1.x, ay: p1.y, bx: p2.x, by: p2.y };
        /* P-02 返工（2026-10-16 复验观察项）：零长箭头（mag≈0）隐藏标签——
         * 合力已用同样 0.05 阈值；避免标签落到物块上与本体标签交叠。断言钉死。 */
        var zeroMag = (f.mag || 0) < 0.05;
        rec.label.visible(!zeroMag);
        if (!zeroMag)
          labelItems.push({ node: rec.label, tip: { x: p2.x, y: p2.y }, ownShaft: shaftObj });
        shafts.push(shaftObj);
        tipPts.push({ x: p2.x, y: p2.y });
        fixedBoxes.push({ x: p2.x - 10, y: p2.y - 10, w: 20, h: 20 }); /* 箭头头部 */
        if (rec.handle) {
          rec.handle.position({ x: p2.x, y: p2.y });
          rec.shaft.points([p1.x, p1.y, p2.x, p2.y]);
          fixedBoxes.push({ x: p2.x - 9, y: p2.y - 9, w: 18, h: 18 }); /* 手柄 */
          /* 命中区跟随（程序化移动后保持 ≥44px 可点） */
          if (rec.hitTip) rec.hitTip.position({
            x: p2.x - rec.hitTip.width() / 2, y: p2.y - rec.hitTip.height() / 2 });
          if (rec.hitShaft) {
            var smx = (p1.x + p2.x) / 2, smy = (p1.y + p2.y) / 2;
            rec.hitShaft.position({
              x: smx - rec.hitShaft.width() / 2, y: smy - rec.hitShaft.height() / 2 });
          }
        }
        rec._tip = { x: p2.x, y: p2.y };
      });
      var R = resultant();
      var resVisible = showRes && R.mag > 0.05;
      if (resVisible) {
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
        /* 合力标签优先避让（派生量，重要性最高） */
        var resShaft = { ax: rp1.x, ay: rp1.y, bx: rp2.x, by: rp2.y };
        labelItems.unshift({ node: refs.resLabel, tip: { x: rp2.x, y: rp2.y },
          ownShaft: resShaft, isResultant: true });
        shafts.push(resShaft);
        tipPts.push({ x: rp2.x, y: rp2.y });
        fixedBoxes.push({ x: rp2.x - 11, y: rp2.y - 11, w: 22, h: 22 });
      } else {
        refs.res.visible(false); refs.resLabel.visible(false);
      }
      /* P-02：标签避让（含 🔒 图标错开） */
      var placedLabels = avoidLabels(labelItems, fixedBoxes, shafts, W, H);
      state.forces.forEach(function (f) {
        var rec = refs.forces[f.id];
        if (!rec.lock || !rec._tip) return;
        var lw = rec.lock.width(), lh = rec.lock.height();
        var lcands = [
          { dx: -18, dy: -22 }, { dx: 10, dy: -22 },
          { dx: -18, dy: 6 }, { dx: 10, dy: 6 },
          /* P-02 返工：合力逃逸后可能占据右侧，追加左侧远位候选 */
          { dx: -28, dy: -22 }, { dx: -28, dy: 6 }
        ];
        /* P-02 返工：🔒 也是文字节点，同样适用"与他杆 ≥6px"；
         * 两档挑选——先找无重叠且杆距≥6 的，找不到退回旧逻辑（无重叠即可），
         * 旧逻辑能过的态布局逐像素不变。 */
        function lockTry(c, shaftAware) {
          var box = { x: rec._tip.x + c.dx, y: rec._tip.y + c.dy, w: lw, h: lh };
          if (box.x < 2 || box.y < 2 || box.x + lw > W - 2 || box.y + lh > H - 2) return null;
          var i;
          for (i = 0; i < placedLabels.length; i++)
            if (overlapArea(box, placedLabels[i]) > 0) return null;
          for (i = 0; i < fixedBoxes.length; i++)
            if (overlapArea(box, fixedBoxes[i]) > 0) return null;
          if (shaftAware)
            for (i = 0; i < shafts.length; i++)
              if (boxSegDist(box, shafts[i]) < 6) return null;
          return box;
        }
        var lok = null, li;
        for (li = 0; li < lcands.length && !lok; li++) lok = lockTry(lcands[li], true);
        for (li = 0; li < 4 && !lok; li++) lok = lockTry(lcands[li], false);
        if (lok) rec.lock.position({ x: lok.x, y: lok.y });
        else rec.lock.position({ x: rec._tip.x - 18, y: rec._tip.y - 22 });
      });
      /* P-01：地面 / 斜面收缩到内容范围 */
      var gx1 = body.x - forceR + 3, gx2 = body.x + forceR - 3;
      if (surface === "incline") {
        var tanI = Math.tan(state.inclineDeg * Math.PI / 180);
        var yAt = function (x) { return (body.y - bs / 2) + (x - body.x) * tanI; };
        var g1 = L2P(gx1, yAt(gx1)), g2 = L2P(gx2, yAt(gx2));
        refs.ground.points([g1.x, g1.y, g2.x, g2.y]);
      } else {
        /* 水平面贴住物块底部（原 y=22 悬空） */
        var gy = body.y - bs / 2;
        var h1 = L2P(gx1, gy), h2 = L2P(gx2, gy);
        refs.ground.points([h1.x, h1.y, h2.x, h2.y]);
      }
      /* P-01：内容半径（逻辑单位；地面已收缩不计入） */
      var need = 0, mgn = 14 / scale;
      function growNeed(lx, ly, half) {
        var d = Math.hypot(lx - body.x, ly - body.y) + half;
        if (d > need) need = d;
      }
      function pxBoxNeed(b) {
        var c = view.pixelToLogical(b.x + b.w / 2, b.y + b.h / 2);
        growNeed(c.x, c.y, Math.hypot(b.w, b.h) / 2 / scale);
      }
      pxBoxNeed({ x: bc.x - bpx / 2, y: bc.y - bpx / 2, w: bpx, h: bpx });
      if (refs.bodyLabel) pxBoxNeed({ x: refs.bodyLabel.x(), y: refs.bodyLabel.y(),
        w: refs.bodyLabel.width(), h: refs.bodyLabel.height() });
      placedLabels.forEach(pxBoxNeed);
      fixedBoxes.forEach(function (b, i) { if (i > 0) pxBoxNeed(b); });
      state.forces.forEach(function (f) {
        var rec = refs.forces[f.id];
        if (rec.lock) pxBoxNeed({ x: rec.lock.x(), y: rec.lock.y(),
          w: rec.lock.width(), h: rec.lock.height() });
      });
      return need + mgn;
    }
    function redraw() {
      if (!view || !refs || forceInLayout) return;
      forceInLayout = true;
      try {
        /* P-01：增长迭代至收敛（每次 setBounds 后 scale 变化，像素偏移量
         * 换算的逻辑边距跟着变；迭代 3 次收敛，保证最终边距 ≥8px）。 */
        for (var iter = 0; iter < 3; iter++) {
          var need = layoutForceNodes();
          if (need <= forceR * 1.005) break;
          forceR = need;
          view.setBounds({ xMin: body.x - forceR, xMax: body.x + forceR,
            yMin: body.y - forceR, yMax: body.y + forceR });
        }
      } finally {
        forceInLayout = false;
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


  /* ============================================================
   * 批1（2026-10-17）：课页层本地辅助（旧渲染器同名函数的引擎侧实现，
   * 与 physics.js 闭包隔离，避免跨文件依赖）
   * ============================================================ */
  function flash(node) {
    if (!node || !node.classList) return;
    node.classList.remove("phy-flash");
    void node.offsetWidth;
    node.classList.add("phy-flash");
  }
  function vib(ms) {
    try { if (typeof navigator !== "undefined" && navigator.vibrate) navigator.vibrate(ms); }
    catch (e) {}
  }
  /* 小视口判定（与旧实现一致）：无 matchMedia（如 smoke stub）时一律返回 false */
  function smallViewport() {
    try {
      return typeof window.matchMedia === "function" &&
        !!window.matchMedia("(max-width:480px)").matches;
    } catch (e) { return false; }
  }
  /* F1 止血口径：非 100×100 viewBox 的 svg-stage 换算比按 meet 取 min */
  function phyWatchStage(svg) {
    try {
      if (!svg.getAttribute("viewBox")) svg.setAttribute("viewBox", "0 0 100 100");
    } catch (e) {}
  }
  function pageSeed(pageId) {
    var h = 7, s = String(pageId || "x");
    for (var i = 0; i < s.length; i++) h = (h * 31 + s.charCodeAt(i)) >>> 0;
    return h || 11;
  }
  /* 墙钟驱动 driver 的固定步进推进（Eng.Driver 走确定性 dt；此处只推进步数，
   * 真值由 state() 读回） */
  function stepDriverByWall(driver, dtWall, dtStep) {
    var n = Math.max(0, Math.round(dtWall / dtStep));
    if (n > 0) driver.step(Math.min(n, 600));
    return n;
  }
  var PHENOM_AX = {
    assumptions: ["现象演示：形状/速率/数量均为教学示意，非真实比例"],
    approximations: ["定性模型，无解析对账；确定性由固定步进 + 播种随机保证"],
    errorEstimate: "无数值宣称；状态徽章与读数行由 state() 读回驱动"
  };
  function needPhenom() {
    if (!(window.Eng && window.Eng.Phenom))
      throw new Error("Eng.Phenom 未加载（检查 index.html 的 phenom.js 引用）");
  }

  /* ============================================================
   * B1-1. tuning-fork（p01.1.1）：Eng.Phenom.TuningFork 状态机真值
   * 旧实现口径原样搬迁：amp=3.4·e^(−1.8t)，5Hz 示意，水滴抛物线 2.5s 自停。
   * 文案/交互/徽章与旧版一致。
   * ============================================================ */
  function renderTuningForkEngine(p, pageId) {
    needPhenom();
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var btnWrap = el("div", "phy-sticky-btn");
    var btn = el("button", "phy-mini", "🔨 敲一下音叉");
    btn.type = "button";
    btnWrap.appendChild(btn);
    box.appendChild(btnWrap);
    /* 音叉用 100×64 宽幅舞台（默认正方形太高） */
    var svg = svgEl("svg", { "class": "phy-stage", viewBox: "0 0 100 64",
      role: "img", "aria-label": "音叉振动溅水花" });
    box.appendChild(svg);
    var st = stateBadge("静止：点“敲一下音叉”", "");
    box.appendChild(st);
    var tf = new window.Eng.Phenom.TuningFork({
      seed: pageSeed(pageId), dropCount: 16,
      assumptions: PHENOM_AX.assumptions,
      approximations: PHENOM_AX.approximations,
      errorEstimate: PHENOM_AX.errorEstimate });
    var rafId = 0, lastT = 0;
    function draw() {
      var s = tf.state();
      var amp = s.amp, dx = s.armDx, t = s.tSec;
      var Y = function (y) { return y - 24; }; /* 100 盒 → 64 宽幅 */
      svg.innerHTML = "";
      svg.appendChild(svgEl("rect", { x: 42, y: Y(78), width: 16, height: 6, "class": "phy-body-box" }));
      svg.appendChild(svgEl("line", { x1: 36, y1: Y(86), x2: 64, y2: Y(86), "class": "phy-ground" }));
      svg.appendChild(svgEl("line", { x1: 46, y1: Y(78), x2: 46 - dx, y2: Y(32),
        stroke: cssVar("--phy-body"), "stroke-width": 3.4 }));
      svg.appendChild(svgEl("line", { x1: 54, y1: Y(78), x2: 54 + dx, y2: Y(32),
        stroke: cssVar("--phy-body"), "stroke-width": 3.4 }));
      if (amp > 0.4)
        svg.appendChild(svgEl("path", { d: "M38," + Y(54) + " q-5,5 0,10 M62," + Y(54) + " q5,5 0,10",
          fill: "none", stroke: cssVar("--phy-wave-a"), "stroke-width": 1.2 }));
      var wv = "M18," + Y(70);
      for (var i = 0; i <= 13; i++) wv += " L" + (18 + i * 5) + "," + (Y(70) + (i % 2 ? 1.6 : -1.6));
      svg.appendChild(svgEl("path", { d: wv, fill: "none",
        stroke: cssVar("--phy-known"), "stroke-width": 1.4 }));
      svg.appendChild(svgText(84, Y(65), "水", "phy-note-text", "start"));
      tf.dropsAt(t).forEach(function (d) {
        svg.appendChild(svgEl("circle", { cx: d.x.toFixed(1), cy: Y(d.y).toFixed(1),
          r: 1.1, fill: cssVar("--phy-known") }));
      });
      if (s.active) {
        st.textContent = "振动中…：水花被溅起来了";
        st.className = "phy-state phy-state-ok";
        badge.setReadout("", "音叉在振动 → 水花溅起（发声的物体在振动）");
      } else {
        st.textContent = "静止：点“敲一下音叉”";
        st.className = "phy-state";
        badge.setReadout("", "音叉静止 → 水面平静");
      }
    }
    function loop() {
      var now = nowMs(), dt = Math.min(0.1, (now - lastT) / 1000 || 0.016);
      lastT = now;
      stepDriverByWall(tf.driver, dt, 1 / 60);
      draw();
      if (tf.state().active) rafId = rafFn(loop);
      else { rafId = 0; draw(); }
    }
    btn.addEventListener("click", function () {
      tf.strike(); lastT = nowMs();
      if (rafId) cafFn(rafId);
      loop(); flash(svg); vib(15);
    });
    draw();
    debugFor(pageId).widgets.push({ type: "tuning-fork", engine: tf,
      strike: function () { tf.strike(); return tf.state(); },
      step: function (n) { return tf.step(n); },
      state: function () { return tf.state(); } });
    return box;
  }

  /* ============================================================
   * B1-2. vacuum-chamber（p01.1.2）：Eng.Phenom.VacuumChamber
   * 波纹数=round(air/100·4)，分子点数=round(air/100·40)，三档状态。
   * ============================================================ */
  function renderVacuumChamberEngine(p, pageId) {
    needPhenom();
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "真空罩抽气实验");
    box.appendChild(svg);
    var ac = p.air || {};
    var sAir = uiSlider({ label: "罩内空气", min: ac.min != null ? ac.min : 0,
      max: ac.max != null ? ac.max : 100, step: ac.step || 5,
      init: ac.init != null ? ac.init : 100, unit: "%",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(sAir.row);
    var st = stateBadge("", "ok");
    box.appendChild(st);
    var vc = new window.Eng.Phenom.VacuumChamber({ airInit: sAir.get(),
      assumptions: PHENOM_AX.assumptions,
      approximations: PHENOM_AX.approximations,
      errorEstimate: PHENOM_AX.errorEstimate });
    var dots = [];
    for (var i = 0; i < 40; i++)
      dots.push({ x: 25 + (i * 37 % 50), y: 20 + (i * 53 % 54) });
    function draw() {
      var s = vc.state(), air = s.airPct;
      svg.innerHTML = "";
      svg.appendChild(svgEl("path", { d: "M20,88 L20,30 Q20,14 36,14 L64,14 Q80,14 80,30 L80,88",
        fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
      svg.appendChild(svgEl("line", { x1: 14, y1: 88, x2: 86, y2: 88, "class": "phy-ground" }));
      svg.appendChild(svgText(50, 8, "真空罩", "phy-note-text"));
      svg.appendChild(svgEl("line", { x1: 50, y1: 16, x2: 50, y2: 27,
        stroke: cssVar("--phy-body"), "stroke-width": 1.2 }));
      svg.appendChild(svgEl("circle", { cx: 50, cy: 34, r: 7, fill: "none",
        stroke: cssVar("--phy-force-a"), "stroke-width": 1.6 }));
      for (var w = 0; w < s.waveCount; w++) {
        var r = 12 + w * 7;
        svg.appendChild(svgEl("path", { d: "M" + (50 - r) + ",34 a" + r + "," + r + " 0 0 1 " + (2 * r) + ",0",
          fill: "none", stroke: cssVar("--phy-wave-a"), "stroke-width": 1.2 }));
      }
      for (var k = 0; k < s.dotCount && k < dots.length; k++)
        svg.appendChild(svgEl("circle", { cx: dots[k].x, cy: dots[k].y, r: 1,
          fill: cssVar("--phy-ink-soft") }));
      svg.appendChild(svgText(50, 96, air <= 0 ? "真空（几乎无空气）" : "空气 " + fmtN(air, 0) + "%",
        "phy-note-text"));
      if (s.statusKey === "vacuum") {
        st.textContent = "几乎听不见铃声：真空不能传声";
        st.className = "phy-state phy-state-warn";
        badge.setReadout("", "铃声 ≈ 0（真空不能传声）");
      } else if (s.statusKey === "low") {
        st.textContent = "铃声变小：空气变稀薄了";
        st.className = "phy-state phy-state-warn";
        badge.setReadout("", "铃声变小（介质减少）");
      } else {
        st.textContent = "铃声清晰：空气充足";
        st.className = "phy-state phy-state-ok";
        badge.setReadout("", "铃声清晰（空气传声）");
      }
    }
    sAir.on(function (v) { vc.setAir(v); draw(); });
    draw();
    debugFor(pageId).widgets.push({ type: "vacuum-chamber", engine: vc,
      setAir: function (v) { sAir.set(v); return vc.state(); },
      state: function () { return vc.state(); } });
    return box;
  }

  /* ============================================================
   * B1-3. sponge-dent（p06.1.1）：Eng.Phenom.SpongeDent
   * dent=F/pMax·12；三档文字 + 3 格条形（黄队口径：不给伪数字）。
   * ============================================================ */
  function renderSpongeDentEngine(p, pageId) {
    needPhenom();
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "海绵凹陷：压力的作用效果");
    box.appendChild(svg);
    var pc = p.pressure || {}, pMax = pc.max || 20;
    var sP = uiSlider({ label: "压力", min: pc.min != null ? pc.min : 0, max: pMax,
      step: pc.step || 1, init: pc.init != null ? pc.init : 8, unit: "N",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(sP.row);
    var st = stateBadge("", "");
    box.appendChild(st);
    var sd = new window.Eng.Phenom.SpongeDent({ pressureMax: pMax, pressureInit: sP.get(),
      assumptions: PHENOM_AX.assumptions,
      approximations: PHENOM_AX.approximations,
      errorEstimate: PHENOM_AX.errorEstimate });
    var TIER_ZH = { shallow: "浅", mid: "中", deep: "深" };
    function draw() {
      var s = sd.state(), F = s.pressure, dent = s.dentUnits;
      svg.innerHTML = "";
      svg.appendChild(svgEl("line", { x1: 10, y1: 84, x2: 90, y2: 84, "class": "phy-ground" }));
      var d = "M22,84 L22,52 Q36," + (52 + dent).toFixed(1) + " 50," + (52 + dent).toFixed(1) +
        " Q64," + (52 + dent).toFixed(1) + " 78,52 L78,84 Z";
      svg.appendChild(svgEl("path", { d: d, "class": "phy-body-box" }));
      svg.appendChild(svgText(50, 74, "海绵", "phy-note-text"));
      svg.appendChild(svgEl("rect", { x: 42, y: 52 + dent - 24, width: 16, height: 24,
        fill: cssVar("--phy-force-a"), opacity: 0.85 }));
      svg.appendChild(svgText(50, 52 + dent - 28, "压力 " + fmtN(F, 0) + " N", "phy-note-text"));
      if (dent > 1) {
        arrowHead(svg, "fh-dent", cssVar("--phy-target"));
        svg.appendChild(svgEl("line", { x1: 83, y1: 52, x2: 83, y2: 52 + dent,
          stroke: cssVar("--phy-target"), "stroke-width": 1.2,
          "marker-start": "url(#fh-dent)", "marker-end": "url(#fh-dent)" }));
      }
      var tier = TIER_ZH[s.tier] || "浅", bar = "";
      for (var bi = 0; bi < 3; bi++) bar += bi < s.cells ? "■" : "□";
      svg.appendChild(svgText(88, 52 + dent / 2, tier, "phy-sym-label", "start"));
      badge.setReadout("", "压力 " + fmtN(F, 0) + " N → 凹陷：" + tier + " " + bar);
      st.textContent = dent < 2 ? "压力小：几乎看不出凹陷"
        : "压力越大，海绵凹陷越深（压力作用效果越明显）";
      st.className = "phy-state " + (dent >= 2 ? "phy-state-ok" : "");
    }
    sP.on(function (v) { sd.setPressure(v); draw(); });
    draw();
    debugFor(pageId).widgets.push({ type: "sponge-dent", engine: sd,
      setPressure: function (v) { sP.set(v); return sd.state(); },
      state: function () { return sd.state(); } });
    return box;
  }

  /* ============================================================
   * B1-4. paper-blow（p06.1.4）：Eng.Phenom.PaperBlow
   * paper: 角=b/bMax·50°；wing: 升力箭头高=b/bMax·18。
   * ============================================================ */
  function renderPaperBlowEngine(p, pageId) {
    needPhenom();
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var mode = p.mode === "wing" ? "wing" : "paper";
    var svg = svgStage("", mode === "wing" ? "机翼流线与升力" : "吹纸条");
    box.appendChild(svg);
    var bc = p.blow || {}, bMax = bc.max || 10;
    var sB = uiSlider({ label: "吹气强度", min: bc.min != null ? bc.min : 0, max: bMax,
      step: bc.step || 1, init: bc.init != null ? bc.init : 4, unit: "档",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(sB.row);
    var st = stateBadge("", "ok");
    box.appendChild(st);
    var pb = new window.Eng.Phenom.PaperBlow({ mode: mode, blowMax: bMax, blowInit: sB.get(),
      assumptions: PHENOM_AX.assumptions,
      approximations: PHENOM_AX.approximations,
      errorEstimate: PHENOM_AX.errorEstimate });
    function draw() {
      var s = pb.state(), b = s.blow;
      svg.innerHTML = "";
      arrowHead(svg, "fh-blow", cssVar("--phy-known"));
      if (mode === "wing") {
        svg.appendChild(svgEl("path", { d: "M20,52 Q50,34 82,50 Q50,58 20,52 Z",
          "class": "phy-body-box" }));
        svg.appendChild(svgText(50, 66, "机翼", "phy-note-text"));
        var k;
        for (k = 0; k < 3; k++) {
          var y = 40 - k * 5;
          svg.appendChild(svgEl("path", { d: "M8," + y + " Q50," + (y - 7) + " 92," + y,
            fill: "none", stroke: cssVar("--phy-known"),
            "stroke-width": s.upperLineWidth.toFixed(2), "marker-end": "url(#fh-blow)" }));
        }
        for (k = 0; k < 2; k++) {
          var y2 = 60 + k * 6;
          svg.appendChild(svgEl("line", { x1: 8, y1: y2, x2: 92, y2: y2,
            stroke: cssVar("--phy-known"), "stroke-width": 0.9,
            "marker-end": "url(#fh-blow)" }));
        }
        svg.appendChild(svgText(90, 28, "快", "phy-note-text", "end"));
        svg.appendChild(svgText(90, 72, "慢", "phy-note-text", "end"));
        if (s.liftVisible) {
          svg.appendChild(svgEl("line", { x1: 50, y1: 44, x2: 50, y2: 44 - s.liftH,
            stroke: cssVar("--phy-target"), "stroke-width": 2, "marker-end": "url(#fh-blow)" }));
          svg.appendChild(svgText(50, 42 - s.liftH, "升力", "phy-force-label"));
        }
        st.textContent = "上方流速快 → 压强小：机翼被往上“托”（升力）";
        badge.setReadout("", "吹气 " + fmtN(b, 0) + " 档：上快下慢 → 产生升力");
      } else {
        var ang = s.angleDeg, rad = ang * Math.PI / 180;
        var px = 30, py = 56, len = 44;
        var ex = px + len * Math.cos(rad), ey = py - len * Math.sin(rad);
        svg.appendChild(svgEl("line", { x1: px, y1: py, x2: ex, y2: ey,
          stroke: cssVar("--phy-body"), "stroke-width": 2.6 }));
        svg.appendChild(svgEl("circle", { cx: px, cy: py, r: 2.2, fill: cssVar("--phy-body") }));
        svg.appendChild(svgText(24, py + 6, "纸条", "phy-note-text", "end"));
        for (var g = 0; g < 3; g++) {
          var gy = py - 9 - g * 5;
          svg.appendChild(svgEl("line", { x1: 36, y1: gy, x2: 92, y2: gy,
            stroke: cssVar("--phy-known"), "stroke-width": s.gasLineWidth.toFixed(2),
            "marker-end": "url(#fh-blow)" }));
        }
        svg.appendChild(svgText(64, py - 24, "吹气", "phy-note-text"));
        st.textContent = ang < 5 ? "没吹气：纸条下垂"
          : "纸条上方流速快、压强小，被“吸”了起来";
        badge.setReadout("", "吹气 " + fmtN(b, 0) + " 档 → 纸条上飘 " + fmtN(ang, 0) + "°");
      }
    }
    sB.on(function (v) { pb.setBlow(v); draw(); });
    draw();
    debugFor(pageId).widgets.push({ type: "paper-blow", engine: pb,
      setBlow: function (v) { sB.set(v); return pb.state(); },
      state: function () { return pb.state(); } });
    return box;
  }

  /* ============================================================
   * B1-5. overflow-cup（p06.2.2）：Eng.Phenom.OverflowCup
   * frac=min(1,V/Vmax)；烧杯水位=frac·44；V溢≡V。
   * ============================================================ */
  function renderOverflowCupEngine(p, pageId) {
    needPhenom();
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "溢水杯实验");
    box.appendChild(svg);
    var vc = p.objVolume || {}, vMax = vc.max || 200;
    var sV = uiSlider({ label: "物体浸入体积", min: 0, max: vMax, step: vc.step || 10,
      init: vc.init != null ? vc.init : 0, unit: "cm³",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(sV.row);
    var st = stateBadge("把物体按进水里，看溢出多少水", "");
    box.appendChild(st);
    var oc = new window.Eng.Phenom.OverflowCup({ volumeMax: vMax, volumeInit: sV.get(),
      assumptions: PHENOM_AX.assumptions,
      approximations: PHENOM_AX.approximations,
      errorEstimate: PHENOM_AX.errorEstimate });
    function draw() {
      var s = oc.state(), vIn = s.volume, frac = s.frac;
      svg.innerHTML = "";
      var cx0 = 12, cx1 = 56, topY = 24, botY = 84, wl = topY + 12;
      svg.appendChild(svgEl("path", { d: "M" + cx0 + "," + topY + " L" + cx0 + "," + botY +
        " L" + cx1 + "," + botY + " L" + cx1 + "," + wl,
        fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
      svg.appendChild(svgEl("line", { x1: cx1, y1: wl, x2: cx1 + 9, y2: wl,
        stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
      svg.appendChild(svgEl("rect", { x: cx0 + 1, y: wl, width: cx1 - cx0 - 2,
        height: botY - wl - 1, fill: cssVar("--phy-known"), opacity: 0.25 }));
      svg.appendChild(svgText((cx0 + cx1) / 2, wl - 4, "水面（与溢水口齐平）", "phy-note-text"));
      var dep = s.depth, bTop = wl - dep, bH = 32;
      svg.appendChild(svgEl("rect", { x: 24, y: bTop, width: 20, height: bH,
        "class": "phy-body-box" }));
      svg.appendChild(svgText(34, bTop - 4, "物体", "phy-note-text"));
      if (s.poured) {
        svg.appendChild(svgEl("line", { x1: cx1 + 9, y1: wl + 1, x2: cx1 + 9, y2: wl + 12,
          stroke: cssVar("--phy-known"), "stroke-width": 1.6 }));
        svg.appendChild(svgEl("circle", { cx: cx1 + 9, cy: wl + 15, r: 1.4,
          fill: cssVar("--phy-known") }));
      }
      var bx0 = 72, bx1 = 90, bBot = 84, fillH = s.fillH;
      svg.appendChild(svgEl("path", { d: "M" + bx0 + ",40 L" + bx0 + "," + bBot +
        " L" + bx1 + "," + bBot + " L" + bx1 + ",40",
        fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
      if (fillH > 0.5)
        svg.appendChild(svgEl("rect", { x: bx0 + 1, y: bBot - fillH, width: bx1 - bx0 - 2,
          height: fillH - 1, fill: cssVar("--phy-known"), opacity: 0.35 }));
      svg.appendChild(svgText(81, 90, "接水杯", "phy-note-text"));
      badge.setReadout("", "V溢 = " + fmtN(vIn, 0) + " cm³ = 排开水的体积");
      st.textContent = vIn <= 0 ? "把物体按进水里，看溢出多少水"
        : "溢出的水，正好等于物体排开的水";
      st.className = "phy-state " + (vIn > 0 ? "phy-state-ok" : "");
    }
    sV.on(function (v) { oc.setVolume(v); draw(); });
    draw();
    debugFor(pageId).widgets.push({ type: "overflow-cup", engine: oc,
      setVolume: function (v) { sV.set(v); return oc.state(); },
      state: function () { return oc.state(); } });
    return box;
  }

  /* ============================================================
   * B1-6. vacuum-tube（p11.2.3）：Eng.Phenom.VacuumTube
   * 硬币 1.2s；羽毛有空气 3.6s+飘摆 / 真空 1.2s；"有空气/真空"二选。
   * ============================================================ */
  function renderVacuumTubeEngine(p, pageId) {
    needPhenom();
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "真空管：羽毛和硬币一起落");
    box.appendChild(svg);
    var row = el("div", "phy-btn-row");
    var bAir = el("button", "", "有空气"); bAir.type = "button";
    var bVac = el("button", "", "抽成真空"); bVac.type = "button";
    row.appendChild(bAir); row.appendChild(bVac);
    box.appendChild(row);
    var bar = uiPlaybar({
      onPlay: function () { vt.drop(); lastT = nowMs(); playing = true; loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0;
        vt.reset(); vt.drop(); draw(); }
    });
    bar.scrub.style.display = "none";
    box.appendChild(bar.bar);
    var st = stateBadge("先选“有空气 / 真空”，再按 ▶", "");
    box.appendChild(st);
    var vt = new window.Eng.Phenom.VacuumTube({
      assumptions: PHENOM_AX.assumptions,
      approximations: PHENOM_AX.approximations,
      errorEstimate: PHENOM_AX.errorEstimate });
    var playing = false, rafId = 0, lastT = 0;
    function setVac(v) {
      vt.setMode(v);
      bAir.setAttribute("aria-pressed", v ? "false" : "true");
      bVac.setAttribute("aria-pressed", v ? "true" : "false");
      draw(); flash(svg);
    }
    function draw() {
      var s = vt.state(), t = s.tSec;
      svg.innerHTML = "";
      svg.appendChild(svgEl("rect", { x: 30, y: 12, width: 40, height: 72, "class": "phy-body-box" }));
      svg.appendChild(svgText(50, 90, s.vacuum ? "真空管" : "有空气的管", "phy-note-text"));
      svg.appendChild(svgEl("circle", { cx: 59, cy: s.coinY.toFixed(1), r: 3.4, fill: "none",
        stroke: cssVar("--phy-force-a"), "stroke-width": 1.6 }));
      svg.appendChild(svgText(59, s.coinY + 7, "硬币", "phy-note-text"));
      svg.appendChild(svgEl("ellipse", { cx: s.featherX.toFixed(1), cy: s.featherY.toFixed(1),
        rx: 2.6, ry: 4.8, fill: cssVar("--phy-known"), opacity: 0.8,
        transform: "rotate(18 " + s.featherX.toFixed(1) + " " + s.featherY.toFixed(1) + ")" }));
      svg.appendChild(svgText(s.featherX, s.featherY - 8, "羽毛", "phy-note-text"));
      if (s.done) {
        st.textContent = s.vacuum ? "同时落地 ✓：真空里只受重力，下落一样快"
          : "硬币先落地：空气阻力拖住了羽毛";
        st.className = "phy-state " + (s.vacuum ? "phy-state-ok" : "phy-state-warn");
        badge.setReadout("", s.vacuum ? "真空：同时落地（自由落体）" : "有空气：硬币快、羽毛慢");
      } else {
        st.textContent = t > 0 ? "下落中…" : "先选“有空气 / 真空”，再按 ▶";
        st.className = "phy-state";
      }
    }
    function loop() {
      if (!playing) return;
      var now = nowMs(), dt = Math.min(0.1, (now - lastT) / 1000 || 0.05);
      lastT = now;
      stepDriverByWall(vt.driver, dt, 1 / 60);
      draw();
      if (vt.state().done) { playing = false; bar.setPlaying(false); draw(); return; }
      rafId = rafFn(loop);
    }
    bAir.addEventListener("click", function () { setVac(false); });
    bVac.addEventListener("click", function () { setVac(true); });
    setVac(false);
    debugFor(pageId).widgets.push({ type: "vacuum-tube", engine: vt,
      setMode: function (v) { setVac(!!v); return vt.state(); },
      dropStep: function (n) { vt.drop(); return vt.step(n); },
      state: function () { return vt.state(); } });
    return box;
  }


  /* ============================================================
   * B1-7. pendulum（p00.1.2 / 复用 p17.1.2）：Eng.Pendulum 状态机真值
   * 旧实现口径：三滑块（摆长/摆球/摆角）+ ▶/⏸/↺ + "一次只动一个滑块"
   * 提示条 + 快捷对比按钮；读数 T=2π√(L/g)；小角度≤10°说明；
   * 摆角滑块改动后从该角释放。动画摆角由 Eng.Pendulum.state().angleRad
   * 读回（驱动器固定步进），读数走解析公式（旧口径）。
   * ============================================================ */
  var PENDULUM_AX = {
    assumptions: ["小角度近似（θ0 ≤ 5° 时周期公式成立；ENG-29 大摆角显性化）",
      "轻绳、质点摆球", "无空气阻尼", "g = 9.8 m/s²"],
    approximations: ["驱动器半隐式欧拉积分；周期公式本身为小角近似"],
    errorEstimate: "T 公式小角近似偏差 θ0²/16；本页 T 读数走解析公式（旧口径）"
  };
  function renderPendulumEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "单摆");
    box.appendChild(svg);
    box.appendChild(noteLine("小角度（≤10°）时公式最准；摆角给到 30° 是为了看清摆动。"));
    var lc = p.length || {}, mc = p.mass || {}, ac = p.angle || {};
    var sL = uiSlider({ label: "摆长 L", min: lc.min != null ? lc.min : 0.2, max: lc.max || 1.5,
      step: lc.step || 0.1, init: lc.init != null ? lc.init : 1, unit: "m",
      fmt: function (v) { return fmtN(v, 1); } });
    var sM = uiSlider({ label: "摆球质量", min: mc.min != null ? mc.min : 0.1, max: mc.max || 1,
      step: mc.step || 0.1, init: mc.init != null ? mc.init : 0.5, unit: "kg",
      fmt: function (v) { return fmtN(v, 1); } });
    var sA = uiSlider({ label: "摆角", min: ac.min != null ? ac.min : 5, max: ac.max || 30,
      step: ac.step || 1, init: ac.init != null ? ac.init : 15, unit: "°",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(sL.row); box.appendChild(sM.row); box.appendChild(sA.row);
    box.appendChild(el("div", "phy-hint-bar", "一次只动一个滑块，其他不动——看看谁能改变周期"));
    var verdictMsg = null;
    function animateSliderP(s, target) {
      var from = s.get(), t0 = nowMs(), dur = 900;
      (function tick() {
        var k = Math.min(1, (nowMs() - t0) / dur);
        s.set(from + (target - from) * k, true);
        draw();
        if (k < 1) rafFn(tick);
      })();
    }
    var presets = el("div", "phy-preset-row");
    var bM = el("button", "phy-preset-btn", "只换摆球试试");
    bM.type = "button";
    bM.addEventListener("click", function () {
      var mMax = mc.max || 1, mMin = mc.min != null ? mc.min : 0.1;
      animateSliderP(sM, sM.get() > (mMax + mMin) / 2 ? mMin : mMax);
      verdictMsg = "只换了摆球质量 → 周期不变 ✓（看读数 T）";
    });
    var bL = el("button", "phy-preset-btn", "只换摆长试试");
    bL.type = "button";
    bL.addEventListener("click", function () {
      var lMax = lc.max || 1.5, lMin = lc.min != null ? lc.min : 0.2;
      animateSliderP(sL, sL.get() > (lMax + lMin) / 2 ? lMin : lMax);
      verdictMsg = "只换了摆长 → 周期变了（看读数 T）";
    });
    presets.appendChild(bM); presets.appendChild(bL);
    box.appendChild(presets);
    /* ---- Eng.Pendulum：换 L/θ0 重建（驱动器固定步进 1/240） ---- */
    var pend = null;
    function rebuild() {
      if (!(window.Eng && window.Eng.Pendulum && window.Eng.Driver)) return;
      var drv = new window.Eng.Driver({ dt: 1 / 240, gravityMps2: 9.8,
        assumptions: PENDULUM_AX.assumptions,
        approximations: PENDULUM_AX.approximations,
        errorEstimate: PENDULUM_AX.errorEstimate });
      pend = new window.Eng.Pendulum(drv, {
        lengthM: sL.get(), initialAngleRad: sA.get() * Math.PI / 180,
        pivotM: { x: 0, y: 0 },
        assumptions: PENDULUM_AX.assumptions,
        approximations: PENDULUM_AX.approximations,
        errorEstimate: PENDULUM_AX.errorEstimate });
    }
    rebuild();
    var playing = true, rafId = 0, lastT = nowMs();
    var bar = uiPlaybar({
      onPlay: function () { playing = true; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { rebuild(); draw(); }
    });
    bar.scrub.style.display = "none";
    box.appendChild(bar.bar);
    var st = stateBadge("周期只跟摆长有关", "ok");
    box.appendChild(st);
    function draw() {
      var L = sL.get(), m = sM.get();
      var T = 2 * Math.PI * Math.sqrt(L / 9.8);
      var th = pend ? pend.state().angleRad : sA.get() * Math.PI / 180;
      svg.innerHTML = "";
      var pxLen = 22 + (L - 0.2) / 1.3 * 38;
      var bx = 50 + pxLen * Math.sin(th), by = 16 + pxLen * Math.cos(th);
      svg.appendChild(svgEl("line", { x1: 30, y1: 14, x2: 70, y2: 14, "class": "phy-ground" }));
      svg.appendChild(svgEl("line", { x1: 50, y1: 14, x2: bx.toFixed(1), y2: by.toFixed(1),
        stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
      svg.appendChild(svgEl("circle", { cx: 50, cy: 14, r: 1.6, fill: cssVar("--phy-body") }));
      var br = 2.4 + m * 3;
      svg.appendChild(svgEl("circle", { cx: bx.toFixed(1), cy: by.toFixed(1), r: br.toFixed(1),
        fill: cssVar("--phy-force-a"), stroke: cssVar("--phy-body"), "stroke-width": 1 }));
      svg.appendChild(svgEl("line", { x1: 50, y1: 14, x2: 50, y2: 16 + pxLen, "class": "phy-track-line" }));
      badge.setReadout("", "T = 2π√(L/g) = " + fmtN(T, 2) + " s");
      st.textContent = verdictMsg || "换摆球质量 / 摆角 → 周期不变；摆长变 → 周期变";
      st.className = "phy-state " + (verdictMsg ? "phy-state-ok" : "");
    }
    function loop() {
      if (!playing) return;
      var now = nowMs(), dt = Math.min(0.05, (now - lastT) / 1000 || 0.016);
      lastT = now;
      if (pend) stepDriverByWall(pend.driver, dt, 1 / 240);
      draw();
      rafId = rafFn(loop);
    }
    sL.on(function () { verdictMsg = null; rebuild(); draw(); });
    sM.on(function () { verdictMsg = null; draw(); });
    sA.on(function () { verdictMsg = null; rebuild(); draw(); });
    draw();
    loop();
    debugFor(pageId).widgets.push({ type: "pendulum", engine: pend,
      truth: function () { var L = sL.get();
        return { L: L, angleDeg: sA.get(), T: 2 * Math.PI * Math.sqrt(L / 9.8),
          beyondSmallAngle: sA.get() > 5 }; },
      angleRadNow: function () { return pend ? pend.state().angleRad : NaN; },
      measurePeriod: function () { return pend ? pend.measurePeriodSec(14) : NaN; } });
    return box;
  }

  /* ============================================================
   * B1-8. read-gauge（p00.1.3 / p03.2.1 / p04.1.4）：Eng 仪表原语真值
   * 口径搬迁（旧 widgetReadGauge 全量搬迁）：
   * - 出题随机数走 Eng.SeededRNG（页种子 + 题序），禁用 Math.random；
   * - 判分真值走 ENG-38：needDec = Eng.estimateDecimals(dv, noEstimate)，
   *   示范答案 = Eng.estimateReading(target, dv, {noEstimate}).text；
   *   天平 noEstimate（ENG-38 特例）；
   * - 容差 ±1 分度值（冻结）；零下缺负号针对性提示（黄队 Y2-3）；
   * - 刻度尺先选视线（平视才出输入框）；电流表试触流程保留；
   *   天平游码 0–5g 拖拽 + 滑块双向同步 + 2×放大弹窗。
   * ============================================================ */
  function renderReadGaugeEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var gauge = p.gauge;
    var range = p.range || { min: 0, max: 10, unit: "" };
    var div = p.divisions || 1;
    var estimate = p.estimate !== false;
    var svg = svgStage("", "仪表读数练习");
    box.appendChild(svg);
    var fb = el("div", "phy-q-fb", "");
    box.appendChild(fb);
    var head = el("div", "phy-gauge-head", "");
    box.appendChild(head);
    function say(ok, msg) {
      fb.innerHTML = (ok ? '<span class="ok">✓ 读对了</span> ' : '<span class="bad">✗ 再试试</span> ') + esc(msg);
      if (ok) { flash(box); vib(10); }
    }
    /* ENG-38 真值口径（替代旧 decOf+1）：天平特例不估读 */
    var noEstimate = (gauge === "balance") || !estimate;
    var needDec = (window.Eng && window.Eng.estimateDecimals)
      ? window.Eng.estimateDecimals(div, noEstimate)
      : (String(div).indexOf(".") >= 0 ? String(div).split(".")[1].length : 0) + (noEstimate ? 0 : 1);
    function modelAnswer(target) {
      if (window.Eng && window.Eng.estimateReading)
        return window.Eng.estimateReading(target, div, { noEstimate: noEstimate }).text;
      return String(target);
    }
    function checkInput(input, target, unit, dv) {
      dv = dv == null ? div : dv;
      var raw = String(input.value).trim().replace("−", "-");
      var v = parseFloat(raw);
      if (!isFinite(v)) { say(false, "先填一个数。"); return false; }
      var dec = (raw.split(".")[1] || "").length;
      var tolHere = (p.tolerance || "1division") === "1division" ? dv : parseFloat(p.tolerance) || dv;
      if (!noEstimate && dec > needDec) {
        say(false, "估读只到分度值下一位（" + needDec + " 位小数）。"); return false;
      }
      if (Math.abs(v - target) <= tolHere + 1e-9) {
        say(true, "读数 " + modelAnswer(target) + " " + unit + "。"); return true;
      } else if (target < 0 && v > 0) { say(false, "你是不是忘了零下要带负号？"); return false; }
      else { say(false, "差了 " + fmtN(Math.abs(v - target), 2) + unit + "，再对一次刻度。"); return false; }
    }
    function inputRow(target, unit, ph, dv) {
      var row = el("div", "phy-gauge-input");
      var inp = el("input", "");
      inp.type = "text"; inp.setAttribute("aria-label", "读数输入");
      inp.placeholder = ph || "";
      var btn = el("button", "phy-q-check", "检查");
      btn.type = "button";
      btn.addEventListener("click", function () { checkInput(inp, target, unit, dv); });
      inp.addEventListener("keydown", function (e) { if (e.key === "Enter") btn.click(); });
      row.appendChild(inp); row.appendChild(btn);
      row.appendChild(el("span", "phy-note", unit));
      return { row: row, input: inp };
    }
    function newQBtn(fn) {
      var b = el("button", "phy-mini", "🔀 换一题");
      b.type = "button";
      b.addEventListener("click", function () { fb.textContent = ""; fn(); });
      return b;
    }
    function hTicks(g, o) {
      var n = Math.round((o.max - o.min) / o.div);
      var me = o.majorEvery || 5, le = o.labelEvery || me;
      if (smallViewport()) le = Math.max(le, thinLabels(n, me, o.x1 - o.x0));
      for (var i = 0; i <= n; i++) {
        var v = o.min + i * o.div;
        var x = o.x0 + i / n * (o.x1 - o.x0);
        var major = i % me === 0;
        g.appendChild(svgEl("line", { x1: x, y1: o.y, x2: x, y2: o.y + (major ? 7 : 4),
          stroke: cssVar("--phy-body"), "stroke-width": major ? 1.2 : 0.7 }));
        if (major && i % le === 0)
          g.appendChild(svgText(x, o.y + 13, fmtN(v, decOfD(o.div)), "phy-tick-label"));
      }
      g.appendChild(svgEl("line", { x1: o.x0, y1: o.y, x2: o.x1, y2: o.y,
        stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
    }
    function vTicks(g, o) {
      var n = Math.round((o.max - o.min) / o.div);
      var me = o.majorEvery || 5, le = me;
      if (smallViewport()) le = thinLabels(n, me, o.y1 - o.y0);
      for (var i = 0; i <= n; i++) {
        var v = o.min + i * o.div;
        var y = o.y1 - i / n * (o.y1 - o.y0);
        var major = i % me === 0;
        g.appendChild(svgEl("line", { x1: o.x, y1: y, x2: o.x + (major ? 7 : 4), y2: y,
          stroke: cssVar("--phy-body"), "stroke-width": major ? 1.2 : 0.7 }));
        if (major && i % le === 0)
          g.appendChild(svgText(o.x - 2, y + 1.5, fmtN(v, decOfD(o.div)), "phy-tick-label", "end"));
      }
      g.appendChild(svgEl("line", { x1: o.x, y1: o.y0, x2: o.x, y2: o.y1,
        stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
    }
    function decOfD(d) {
      var s = String(d);
      return s.indexOf(".") >= 0 ? s.split(".")[1].length : 0;
    }
    function thinLabels(n, me, span) {
      var labels = Math.floor(n / me) + 1;
      var k = Math.ceil(labels * 7 / Math.max(span, 1));
      return k > 1 ? me * k : me;
    }
    /* 出题 RNG：页种子 + 题序（禁用 Math.random） */
    var qSeq = 0;
    function newRng() {
      qSeq++;
      return (window.Eng && window.Eng.SeededRNG)
        ? new window.Eng.SeededRNG(pageSeed(pageId) + qSeq * 100003)
        : { next: function () { return Math.random(); } };
    }
    var probe = { type: "read-gauge", gauge: gauge, needDec: needDec,
      question: function () { return NaN; },
      check: function (v) { return false; } };
    debugFor(pageId).widgets.push(probe);

    if (gauge === "ruler") {
      var target = 0;
      function drawRuler() {
        var rng = newRng();
        svg.innerHTML = "";
        /* 数字每 2cm 标一次（20cm 尺上 1cm 标号会重叠，Y2 审计遗留） */
        hTicks(svg, { min: range.min, max: range.max, div: div, x0: 8, x1: 92, y: 40,
          majorEvery: 5, labelEvery: 20 });
        target = range.min + Math.round((0.3 + rng.next() * 0.6) *
          (range.max - range.min) / div) * div;
        var tx = 8 + (target - range.min) / (range.max - range.min) * 84;
        svg.appendChild(svgEl("rect", { x: 8, y: 30, width: tx - 8, height: 10,
          fill: cssVar("--phy-known"), opacity: 0.55 }));
        svg.appendChild(svgText(50, 66, "视线要与刻度面垂直", "phy-note-text"));
        head.innerHTML = "";
        head.appendChild(el("span", "", "第 1 步：选视线——"));
        ["俯视", "平视", "仰视"].forEach(function (z) {
          var b = el("button", "phy-mini", z);
          b.type = "button";
          b.addEventListener("click", function () {
            if (z === "平视") {
              if (!head.querySelector(".phy-gauge-input"))
                head.appendChild(inputRow(target, range.unit, "读数（估读一位）").row);
              say(true, "视线正确，可以读数了。");
            }
            else say(false, "视线" + z + "读数会偏大/偏小，再想想。");
          });
          head.appendChild(b);
        });
        head.appendChild(newQBtn(drawRuler));
        probe.question = function () { return target; };
        probe.check = function (v) {
          return Math.abs(v - target) <= div + 1e-9;
        };
      }
      drawRuler();
    } else if (gauge === "thermometer") {
      var target2 = 0;
      function drawThermo() {
        var rng = newRng();
        svg.innerHTML = "";
        vTicks(svg, { min: range.min, max: range.max, div: div, x: 46, y0: 12, y1: 86, majorEvery: 5 });
        target2 = range.min + Math.round(rng.next() * (range.max - range.min) / div) * div;
        var y = 86 - (target2 - range.min) / (range.max - range.min) * 74;
        svg.appendChild(svgEl("rect", { x: 43, y: y, width: 6, height: 86 - y,
          fill: cssVar("--phy-charge-pos") }));
        svg.appendChild(svgEl("circle", { cx: 46, cy: 88, r: 5, fill: cssVar("--phy-charge-pos") }));
        head.innerHTML = "";
        head.appendChild(el("span", "", "零下读数记得带 − 号："));
        var tRow = inputRow(target2, range.unit, "读数（估读一位）");
        var negBtn = el("button", "phy-mini", "±");
        negBtn.type = "button";
        negBtn.style.minHeight = "44px";
        negBtn.setAttribute("aria-label", "切换负号");
        negBtn.addEventListener("click", function () {
          var inp = tRow.row.querySelector("input");
          if (!inp) return;
          if (inp.value.charAt(0) === "-" || inp.value.charAt(0) === "−")
            inp.value = inp.value.slice(1);
          else inp.value = "−" + inp.value;
          inp.focus();
        });
        tRow.row.insertBefore(negBtn, tRow.row.firstChild);
        head.appendChild(tRow.row);
        head.appendChild(newQBtn(drawThermo));
        probe.question = function () { return target2; };
        probe.check = function (v) {
          return Math.abs(v - target2) <= div + 1e-9;
        };
      }
      drawThermo();
    } else if (gauge === "ammeter" || gauge === "voltmeter") {
      var isA = gauge === "ammeter";
      var ranges = isA ? [{ t: "0–3A", max: 3, div: 0.1 }, { t: "0–0.6A", max: 0.6, div: 0.02 }]
                       : [{ t: "0–15V", max: 15, div: 0.5 }, { t: "0–3V", max: 3, div: 0.1 }];
      var stage = 0, target3 = 0, sel = null;
      function drawDialPreview(rg) {
        svg.innerHTML = "";
        var max = rg.max, dv = rg.div;
        var g = svgEl("g", { opacity: "0.6" });
        var cx = 50, cy = 78, rr = 34;
        var n = Math.round(max / dv);
        for (var i = 0; i <= n; i++) {
          var v = i * dv, a = Math.PI - i / n * Math.PI;
          var x1 = cx + Math.cos(a) * rr, y1 = cy - Math.sin(a) * rr;
          var x2 = cx + Math.cos(a) * (rr - (i % 5 === 0 ? 6 : 3)),
              y2 = cy - Math.sin(a) * (rr - (i % 5 === 0 ? 6 : 3));
          g.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2,
            stroke: cssVar("--phy-track"), "stroke-width": i % 5 === 0 ? 1.2 : 0.7 }));
          if (i % 10 === 0)
            g.appendChild(svgText(cx + Math.cos(a) * (rr - 10),
              cy - Math.sin(a) * (rr - 10) + 1.5, fmtN(v, decOfD(dv)), "phy-tick-label"));
        }
        g.appendChild(svgEl("line", { x1: cx, y1: cy,
          x2: cx - (rr - 4), y2: cy, stroke: cssVar("--phy-track"), "stroke-width": 1.8 }));
        g.appendChild(svgEl("circle", { cx: cx, cy: cy, r: 2.4, fill: cssVar("--phy-track") }));
        g.appendChild(svgText(cx, cy + 8, isA ? "A" : "V", "phy-f-label"));
        svg.appendChild(g);
      }
      function drawMeter() {
        svg.innerHTML = "";
        head.innerHTML = "";
        if (p.trialTouch && isA && stage === 0) {
          head.appendChild(el("span", "", "第 1 步：大量程试触——"));
          var tb = el("button", "phy-mini", "试触（0–3A 挡）");
          tb.type = "button";
          tb.addEventListener("click", function () {
            stage = 1; drawMeter();
            say(true, "试触完成：指针偏转不大，可以换小量程精读。");
          });
          head.appendChild(tb);
          head.appendChild(el("span", "phy-note", "直接接小量程？先想想为什么不行。"));
          return;
        }
        head.appendChild(el("div", "phy-range-mask", "第一步：选合适量程"));
        drawDialPreview(ranges[0]);
        var rb = el("div", "phy-range-btns");
        ranges.forEach(function (rg) {
          var b = el("button", "phy-range-btn", rg.t);
          b.type = "button";
          b.addEventListener("click", function () {
            sel = rg; stage = 2; drawScale3();
          });
          rb.appendChild(b);
        });
        head.appendChild(rb);
        head.appendChild(newQBtn(function () { stage = 0; sel = null; drawMeter(); }));
      }
      function drawScale3() {
        var rng = newRng();
        svg.innerHTML = "";
        var max = sel.max, dv = sel.div, unit = isA ? "A" : "V";
        target3 = Math.round((0.25 + rng.next() * 0.6) * max / dv) * dv;
        var cx = 50, cy = 78, rr = 34;
        for (var i = 0; i <= Math.round(max / dv); i++) {
          var v = i * dv, a = Math.PI - i / Math.round(max / dv) * Math.PI;
          var x1 = cx + Math.cos(a) * rr, y1 = cy - Math.sin(a) * rr;
          var x2 = cx + Math.cos(a) * (rr - (i % 5 === 0 ? 6 : 3)), y2 = cy - Math.sin(a) * (rr - (i % 5 === 0 ? 6 : 3));
          svg.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2,
            stroke: cssVar("--phy-body"), "stroke-width": i % 5 === 0 ? 1.2 : 0.7 }));
          if (i % 10 === 0)
            svg.appendChild(svgText(cx + Math.cos(a) * (rr - 10), cy - Math.sin(a) * (rr - 10) + 1.5,
              fmtN(v, decOfD(dv)), "phy-tick-label"));
        }
        var ta = Math.PI - target3 / max * Math.PI;
        svg.appendChild(svgEl("line", { x1: cx, y1: cy,
          x2: cx + Math.cos(ta) * (rr - 4), y2: cy - Math.sin(ta) * (rr - 4),
          stroke: cssVar("--phy-charge-pos"), "stroke-width": 1.8 }));
        svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: 2.4, fill: cssVar("--phy-body") }));
        svg.appendChild(svgText(cx, cy + 8, isA ? "A" : "V", "phy-f-label"));
        head.innerHTML = "";
        head.appendChild(el("span", "", "读数（" + sel.t + "）："));
        head.appendChild(inputRow(target3, unit, "估读一位", dv).row);
        head.appendChild(newQBtn(function () { stage = 0; sel = null; drawMeter(); }));
        probe.question = function () { return target3; };
        probe.check = function (v) { return Math.abs(v - target3) <= dv + 1e-9; };
      }
      drawMeter();
    } else if (gauge === "balance") {
      var rider = 0, panW = 20, rCtl = null, rngB = newRng();
      panW = [10, 20, 50][Math.floor(rngB.next() * 3)];
      rider = Math.round(rngB.next() * 25) * 0.2;
      function drawBalance() {
        svg.innerHTML = "";
        svg.appendChild(svgEl("line", { x1: 20, y1: 70, x2: 80, y2: 70, "class": "phy-ground" }));
        svg.appendChild(svgEl("line", { x1: 50, y1: 70, x2: 50, y2: 34,
          stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
        svg.appendChild(svgEl("line", { x1: 18, y1: 34, x2: 82, y2: 34,
          stroke: cssVar("--phy-body"), "stroke-width": 2 }));
        svg.appendChild(svgEl("rect", { x: 12, y: 40, width: 12, height: 8, "class": "phy-body-box" }));
        svg.appendChild(svgText(18, 54, "待测", "phy-sym-label"));
        svg.appendChild(svgEl("rect", { x: 76, y: 40, width: 12, height: 8, "class": "phy-body-box" }));
        svg.appendChild(svgText(82, 54, panW + "g", "phy-sym-label"));
        var rx = 30 + rider / 5 * 40;
        for (var ti = 0; ti <= 25; ti++) {
          var tv = ti * 0.2, tx = 30 + tv * 8;
          var major = ti % 5 === 0;
          svg.appendChild(svgEl("line", { x1: tx, y1: 34, x2: tx, y2: major ? 30.5 : 32,
            stroke: cssVar("--phy-body"), "stroke-width": major ? 1 : 0.6 }));
          if (major)
            svg.appendChild(svgText(tx, 28.5, String(Math.round(tv)), "phy-tick-label"));
        }
        svg.appendChild(svgText(72.5, 28.5, "g", "phy-tick-label", "start"));
        var yg = svgEl("rect", { x: rx, y: 30, width: 4, height: 8,
          fill: cssVar("--phy-target"), "class": "phy-handle", "aria-label": "拖动游码" });
        svg.appendChild(yg);
        var grabDX = 0;
        dragify(yg, { svg: svg,
          onStart: function (e) {
            try { grabDX = toSVG(svg, e.clientX, e.clientY).x - (30 + rider * 8); }
            catch (err) { grabDX = 0; }
          },
          onMove: function (lx) {
            rider = Math.max(0, Math.min(5, (lx - grabDX - 30) / 40 * 5));
            if (rCtl) rCtl.set(Math.round(rider / 0.2) * 0.2, true);
            drawBalance();
          } });
        head.innerHTML = "";
        head.appendChild(el("span", "", "游码（0–5g，可拖，以左侧刻线读数）："));
        rCtl = uiSlider({ label: "", min: 0, max: 5, step: 0.2, init: rider, unit: "g" });
        head.appendChild(rCtl.row);
        rCtl.on(function (v) { rider = v; drawBalance(); });
        var magBtn = el("button", "phy-mini", "🔍 放大游码");
        magBtn.type = "button";
        magBtn.style.minHeight = "44px";
        magBtn.setAttribute("aria-label", "放大游码 2 倍查看位置");
        magBtn.addEventListener("click", function () { openRiderMag(); });
        head.appendChild(magBtn);
        head.appendChild(inputRow(panW + rider, "g", "砝码+游码", 0.2).row);
        head.appendChild(newQBtn(function () {
          var r2 = newRng();
          panW = [10, 20, 50][Math.floor(r2.next() * 3)];
          rider = Math.round(r2.next() * 25) * 0.2;
          drawBalance();
        }));
        probe.question = function () { return panW + rider; };
        probe.check = function (v) { return Math.abs(v - (panW + rider)) <= 0.2 + 1e-9; };
        function openRiderMag() {
          var ov = el("div", "phy-mag-ov");
          var inner = el("div", "phy-mag-box");
          inner.appendChild(el("div", "phy-mag-title", "游码放大 2×（以游码左侧刻线读数）"));
          var zs = svgEl("svg", { "class": "phy-stage", viewBox: "0 0 100 46",
            role: "img", "aria-label": "游码放大图" });
          phyWatchStage(zs);
          var zc = Math.max(1, Math.min(4, rider));
          function ZX(v) { return (30 + v * 8 - (30 + (zc - 2) * 8)) / 32 * 100; }
          zs.appendChild(svgEl("line", { x1: 0, y1: 30, x2: 100, y2: 30,
            stroke: cssVar("--phy-body"), "stroke-width": 2 }));
          for (var zi = 0; zi <= 20; zi++) {
            var zv = (zc - 2) + zi * 0.2;
            if (zv < 0 || zv > 5) continue;
            var zx = ZX(zv), zmajor = Math.abs(zv - Math.round(zv)) < 0.01;
            zs.appendChild(svgEl("line", { x1: zx, y1: 30, x2: zx, y2: zmajor ? 22 : 26,
              stroke: cssVar("--phy-body"), "stroke-width": zmajor ? 1.2 : 0.7 }));
            if (zmajor)
              zs.appendChild(svgText(zx, 19, fmtN(zv, 1), "phy-tick-label"));
          }
          var zrx = ZX(rider);
          zs.appendChild(svgEl("rect", { x: zrx, y: 22, width: 12.5, height: 16,
            fill: cssVar("--phy-target"), opacity: 0.9 }));
          zs.appendChild(svgEl("line", { x1: zrx, y1: 12, x2: zrx, y2: 40,
            stroke: cssVar("--phy-warn"), "stroke-width": 1, "stroke-dasharray": "2,1.5" }));
          zs.appendChild(svgText(zrx + 6, 9, "读数 " + fmtN(rider, 1) + "g", "phy-note-text"));
          inner.appendChild(zs);
          var close = el("button", "phy-mini", "关闭");
          close.type = "button";
          close.style.minHeight = "44px";
          close.addEventListener("click", function () {
            if (ov.parentNode) ov.parentNode.removeChild(ov);
          });
          ov.addEventListener("click", function (e) {
            if (e.target === ov && ov.parentNode) ov.parentNode.removeChild(ov);
          });
          inner.appendChild(close);
          ov.appendChild(inner);
          document.body.appendChild(ov);
        }
      }
      drawBalance();
    } else {
      box.appendChild(noteLine("未知仪表类型：" + gauge));
    }
    return box;
  }


  /* ============================================================
   * B1-9. thermo-sim（p03 / p17.3.2）：Eng.MoleculeMotion(field:'thermal')
   * 真值搬迁：速率 ∝ √T（T 开尔文，params 只暴露摄氏度）；边界弹性
   * 反射（motion.js 内建）；物态徽章 T<0→固态(冰)/0–100→液态(水)/
   * ≥100→气态(水蒸气)（以水为例）；brownian=true 时加一颗大颗粒
   * 走 brownian 式随机游走（文案"示意，非真实碰撞"）。
   * ============================================================ */
  var THERMO_AX = {
    assumptions: ["分子为质点，无分子间作用力", "以水为例的物态划分（熔点 0℃/沸点 100℃）"],
    approximations: ["二维示意；速率按 √(T/293) 缩放（非真实分子速率）；碰撞为示意"],
    errorEstimate: "示意模型无解析对账；速率比 = √(T₂/T₁) 逐位（CHEMC-03/33 口径）"
  };
  function renderThermoEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var cv = el("canvas", "phy-thermo-cv");
    box.appendChild(cv);
    var legend = el("div", "phy-note", "图例：蓝色=慢 · 橙色=中 · 朱红=快" +
      (p.brownian ? " · 绿色大颗粒=布朗运动示意（随机游走，非真实碰撞）" : "") +
      "（粒子大小、数量、运动速度均为示意，未按真实比例）");
    box.appendChild(legend);
    var tc = p.temp || {};
    var tCtl = uiSlider({ label: "温度 T", min: tc.min != null ? tc.min : -20,
      max: tc.max != null ? tc.max : 120, step: tc.step || 5,
      init: tc.init != null ? tc.init : 20, unit: tc.unit || "℃",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(tCtl.row);
    if (p.heatButtons !== false) {
      var holdRow = el("div", "phy-btn-row");
      var bHeat = el("button", "phy-mini", "加热 🔥"); bHeat.type = "button";
      var bCool = el("button", "phy-mini", "制冷 ❄"); bCool.type = "button";
      holdRow.appendChild(bHeat); holdRow.appendChild(bCool);
      box.appendChild(holdRow);
      function hold(btn, d) {
        var id = 0;
        function step() { tCtl.set(tCtl.get() + d * (tc.step || 5)); }
        btn.addEventListener("pointerdown", function () {
          step(); id = setInterval(step, 220);
        });
        ["pointerup", "pointerleave", "pointercancel"].forEach(function (t) {
          btn.addEventListener(t, function () { if (id) { clearInterval(id); id = 0; } });
        });
      }
      hold(bHeat, 1); hold(bCool, -1);
    }
    var st = stateBadge("", "ok");
    box.appendChild(st);
    var motion = null;
    /* 速率三档分组（旧口径的慢/中/快双编码）：同 kind 速率相同，故分三组；
     * 各组速率均 ∝ √T（thermal 场内建），图例颜色即 kind 颜色。 */
    var KIND_STYLE = {
      slow: { color: "#0072B2", r: 1.6 }, mid: { color: "#E69F00", r: 1.6 },
      fast: { color: "#D55E00", r: 1.6 }, brown: { color: "#009E73", r: 4.5 } };
    if (window.Eng && window.Eng.MoleculeMotion) {
      var total = Math.min(p.particleCount || 120, 400);
      var kinds = [
        { kind: "slow", count: Math.floor(total / 3), color: KIND_STYLE.slow.color,
          r: 1.6, speedMps: 4.5 },
        { kind: "mid", count: Math.floor(total / 3), color: KIND_STYLE.mid.color,
          r: 1.6, speedMps: 7.6 },
        { kind: "fast", count: total - 2 * Math.floor(total / 3),
          color: KIND_STYLE.fast.color, r: 1.6, speedMps: 11 }
      ];
      if (p.brownian) kinds.push({ kind: "brown", count: 1, color: KIND_STYLE.brown.color,
        r: 4.5, speedMps: 3 });
      motion = new window.Eng.MoleculeMotion({
        field: "thermal", seed: pageSeed(pageId),
        temperatureK: tCtl.get() + 273.15,
        kinds: kinds,
        assumptions: THERMO_AX.assumptions,
        approximations: THERMO_AX.approximations,
        errorEstimate: THERMO_AX.errorEstimate });
    }
    var bar = uiPlaybar({
      onPlay: function () { playing = true; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { if (motion) motion.reset(); draw(); }
    });
    bar.scrub.style.display = "none";
    box.appendChild(bar.bar);
    var playing = true, rafId = 0, lastT = nowMs();
    function fitCanvas() {
      var w = Math.min(560, box.clientWidth || 560) || 560;
      cv.width = w; cv.height = Math.round(w * 0.62);
      cv.style.width = w + "px"; cv.style.height = Math.round(w * 0.62) + "px";
    }
    function stateKey(T) { return T < 0 ? "solid" : (T < 100 ? "liquid" : "gas"); }
    var KEY_ZH = { solid: "固态（冰）", liquid: "液态（水）", gas: "气态（水蒸气）" };
    function draw() {
      var T = tCtl.get();
      if (motion) motion.temperatureK = T + 273.15;
      fitCanvas();
      var ctx = cv.getContext("2d");
      var W = cv.width, H = cv.height;
      ctx.clearRect(0, 0, W, H);
      if (motion) {
        var ps = motion.state().particles;
        ps.forEach(function (q) {
          var sty = KIND_STYLE[q.type] || KIND_STYLE.mid;
          ctx.fillStyle = sty.color;
          ctx.beginPath();
          ctx.arc(q.pos.x / 100 * W, (1 - q.pos.y / 100) * H,
            Math.max(1.5, sty.r / 100 * W), 0, 7);
          ctx.fill();
        });
      }
      badge.setReadout("", "T = " + fmtN(T, 0) + " ℃ · " + KEY_ZH[stateKey(T)]);
      var sub = T <= 0 ? "（分子仍在振动，动画已放大显示）" : "";
      st.textContent = KEY_ZH[stateKey(T)] + "：0℃ 熔点 / 100℃ 沸点（以水为例）" + sub;
      st.className = "phy-state phy-state-ok";
    }
    function loop() {
      if (!playing) return;
      var now = nowMs(), dt = Math.min(0.1, (now - lastT) / 1000 || 0.016);
      lastT = now;
      if (motion) stepDriverByWall(motion.driver, dt, 1 / 60);
      draw();
      rafId = rafFn(loop);
    }
    tCtl.on(function () { draw(); });
    draw();
    loop();
    debugFor(pageId).widgets.push({ type: "thermo-sim", engine: motion,
      setTempC: function (t) { tCtl.set(t); return stateKey(tCtl.get()); },
      stateKey: function () { return stateKey(tCtl.get()); },
      tempC: function () { return tCtl.get(); },
      speedRatio: function (t1, t2) {
        return Math.sqrt((t1 + 273.15) / (t2 + 273.15)); } });
    return box;
  }

  /* ============================================================
   * B1-10. heat-compare（p03.2.2）：Eng.PlotBoard 双 T-t 曲线 + 播放
   * 真值：T(t) = 20 + P·t/(m·c)；c水=4200、c沙=920 冻结；动画加速 ×20
   * （文案注明"非真实时间"）；终态"沙子升温是水的约 c水/c沙 倍"。
   * ============================================================ */
  function renderHeatCompareEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var cid = "phy-eng-heat-" + (++plotSeq);
    var cdiv = el("div", "phy-eng-plot");
    cdiv.id = cid;
    box.appendChild(cdiv);
    box.appendChild(noteLine("动画加速 ×20（非真实时间）；初温都按 20℃。"));
    var mc = p.mass || {}, P0 = p.power || 500;
    var sM = uiSlider({ label: "质量", min: mc.min != null ? mc.min : 0.5,
      max: mc.max || 2, step: mc.step || 0.5, init: mc.init != null ? mc.init : 1,
      unit: "kg", fmt: function (v) { return fmtN(v, 1); } });
    box.appendChild(sM.row);
    var st = stateBadge("按 ▶ 开始加热", "");
    box.appendChild(st);
    var tMax = 300, cW = 4200, cS = 920, t = 0;
    var board = null, cursor = null, recS = null, recW = null;
    function Tof(c, tt) { return 20 + P0 * tt / (sM.get() * c); }
    function draw() {
      var dTw = Tof(cW, t) - 20, dTs = Tof(cS, t) - 20;
      badge.setReadout("", "加热 " + fmtN(t, 0) + " s：水 +" + fmtN(dTw, 1) +
        " ℃，沙子 +" + fmtN(dTs, 1) + " ℃");
      st.textContent = t >= tMax ? "加热结束：沙子升温是水的约 " + fmtN(cW / cS, 1) + " 倍"
        : t > 0 ? "加热中…：沙子线更陡（升温快）" : "按 ▶ 开始加热";
      st.className = "phy-state " + (t > 0 ? "phy-state-ok" : "");
      if (cursor && board) {
        try { cursor.moveTo([t, 0]); } catch (e) {}
        board.board.update();
      }
    }
    function init() {
      if (!(window.Eng && window.Eng.PlotBoard)) return;
      var bw = Math.max(280, Math.min(720, cdiv.clientWidth || box.clientWidth || 560));
      board = new window.Eng.PlotBoard({ containerId: cid,
        bounds: { xMin: 0, xMax: tMax, yMin: 0, yMax: 200 },
        viewportWPx: bw, viewportHPx: Math.round(bw * 0.62),
        assumptions: PLOT_AX.assumptions,
        approximations: PLOT_AX.approximations,
        errorEstimate: PLOT_AX.errorEstimate });
      var J = board.board;
      recS = board.functionGraph({ fn: function (tt) { return Tof(cS, tt); },
        domain: [0, tMax], name: "sand" });
      recW = board.functionGraph({ fn: function (tt) { return Tof(cW, tt); },
        domain: [0, tMax], name: "water" });
      try {
        recS.curve.setAttribute({ strokeColor: "#E69F00", strokeWidth: 3 });
        recW.curve.setAttribute({ strokeColor: "#0072B2", strokeWidth: 3, dash: 2 });
      } catch (e) {}
      J.create("text", [tMax * 0.98, Tof(cS, tMax), "沙子"], { fixed: true, fontSize: 13 });
      J.create("text", [tMax * 0.98, Tof(cW, tMax) + 8, "水"], { fixed: true, fontSize: 13 });
      J.create("text", [tMax, 4, "t/s"], { fixed: true, anchorX: "right", fontSize: 13 });
      J.create("text", [2, 192, "T/℃"], { fixed: true, fontSize: 13 });
      cursor = J.create("line", [[0, 0], [0, 200]], { fixed: true, straightFirst: false,
        straightLast: false, strokeColor: "#7A7A7A", dash: 2, strokeWidth: 1 });
      board.board.update();
      /* V-04：data-theme 变化即同步作图板主题 */
      try {
        if (typeof MutationObserver === "function" && document.body && board.setTheme) {
          var heatThemeObs = new MutationObserver(function (muts) {
            for (var hi = 0; hi < muts.length; hi++) {
              if (muts[hi].attributeName === "data-theme") {
                board.setTheme(document.body.getAttribute("data-theme") === "dark" ? "dark" : "light");
                break;
              }
            }
          });
          heatThemeObs.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
        }
      } catch (e) {}
    }
    later(init, 0);
    var playing = false, rafId = 0, lastT = 0;
    var bar = uiPlaybar({
      onPlay: function () { playing = true; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0;
        t = 0; bar.setProgress(0); draw(); },
      onScrub: function (f) { playing = false; if (rafId) cafFn(rafId); rafId = 0;
        t = f * tMax; draw(); }
    });
    box.appendChild(bar.bar);
    function loop() {
      if (!playing) return;
      var now = nowMs(), dt = Math.min(0.1, (now - lastT) / 1000 || 0.016);
      lastT = now; t = Math.min(tMax, t + dt * 20);
      draw();
      bar.setProgress(t / tMax);
      if (t >= tMax) { playing = false; bar.setPlaying(false); return; }
      rafId = rafFn(loop);
    }
    sM.on(function () { t = 0; draw(); });
    draw();
    debugFor(pageId).widgets.push({ type: "heat-compare", board: function () { return board; },
      Tof: function (c, tt) { return Tof(c, tt); },
      scrubTo: function (f) { t = f * tMax; bar.setProgress(f); draw();
        return { t: t, dTw: Tof(cW, t) - 20, dTs: Tof(cS, t) - 20 }; },
      ratio: cW / cS });
    return box;
  }

  /* ============================================================
   * B1-11. mv-lab（p04）：Eng.PlotBoard 点列数据源 + 材料选择
   * 三条过原点直线 m=ρV；质量滑块→活动点沿直线走；读数 V=m/ρ；
   * 斜率标签 ρ=…（Y4：直线段给精确值）。
   * ============================================================ */
  function renderMvLabEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var mats = p.materials || [];
    var tabs = el("div", "phy-tabs");
    tabs.setAttribute("role", "group");
    tabs.setAttribute("aria-label", "选择材料");
    box.appendChild(tabs);
    var cid = "phy-eng-mv-" + (++plotSeq);
    var cdiv = el("div", "phy-eng-plot");
    cdiv.id = cid;
    box.appendChild(cdiv);
    var mMax = p.mMax || 1000;
    var sM = uiSlider({ label: "质量 m", min: 0, max: mMax, step: p.step || 10,
      init: p.mInit != null ? p.mInit : 400, unit: p.unitM || "g",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(sM.row);
    var state = { mat: mats[0] || null };
    var board = null, J = null, actPt = null, tagObjs = [];
    var vMax = 0;
    mats.forEach(function (mt) { vMax = Math.max(vMax, mMax / mt.rho); });
    vMax = Math.ceil(vMax / 100) * 100;
    function Vof(m, rho) { return m / rho; }
    function draw() {
      var mt = state.mat;
      var v = mt ? Vof(sM.get(), mt.rho) : 0;
      if (actPt && J) {
        try { actPt.moveTo([v, sM.get()]); board.board.update(); } catch (e) {}
      }
      if (mt) {
        badge.setReadout("", "V = m/ρ = " + fmtN(v, 1) + " " + (p.unitV || "cm³") +
          "（" + mt.name + "，ρ=" + mt.rho + " " + (p.unitRho || "g/cm³") + "）");
      } else badge.setReadout("", "—");
    }
    function init() {
      if (!(window.Eng && window.Eng.PlotBoard)) return;
      var bw = Math.max(280, Math.min(720, cdiv.clientWidth || box.clientWidth || 560));
      board = new window.Eng.PlotBoard({ containerId: cid,
        bounds: { xMin: 0, xMax: vMax, yMin: 0, yMax: mMax },
        viewportWPx: bw, viewportHPx: Math.round(bw * 0.62),
        assumptions: PLOT_AX.assumptions,
        approximations: PLOT_AX.approximations,
        errorEstimate: PLOT_AX.errorEstimate });
      J = board.board;
      var roleColor = { "force-a": "#E69F00", "force-b": "#56B4E9", "force-c": "#009E73",
        "known": "#0072B2", "target": "#D55E00", "body": "#222222" };
      mats.forEach(function (mt) {
        var vEnd = Math.min(vMax, mMax / mt.rho);
        var pts = [];
        for (var v = 0; v <= vEnd; v += 50) pts.push([v, mt.rho * v]);
        pts.push([vEnd, mt.rho * vEnd]);
        J.create("segment", [J.create("point", [0, 0], { fixed: true, visible: false }),
          J.create("point", [vEnd, mt.rho * vEnd], { fixed: true, visible: false })],
          { fixed: true, strokeColor: roleColor[mt.colorRole] || "#0072B2", strokeWidth: 2.5 });
        var tg = J.create("text", [vEnd, mt.rho * vEnd, "ρ=" + mt.rho],
          { fixed: true, fontSize: 13 });
        tagObjs.push(tg);
      });
      J.create("text", [vMax, mMax * 0.02, "V/" + (p.unitV || "cm³")],
        { fixed: true, anchorX: "right", fontSize: 13 });
      J.create("text", [vMax * 0.01, mMax * 0.99, "m/" + (p.unitM || "g")],
        { fixed: true, fontSize: 13 });
      actPt = J.create("point", [Vof(sM.get(), state.mat ? state.mat.rho : 1), sM.get()],
        { name: "", size: 5, strokeColor: "#D55E00", fillColor: "#D55E00" });
      board.board.update();
      /* V-04：data-theme 变化即同步作图板主题 */
      try {
        if (typeof MutationObserver === "function" && document.body && board.setTheme) {
          var mvThemeObs = new MutationObserver(function (muts) {
            for (var mi2 = 0; mi2 < muts.length; mi2++) {
              if (muts[mi2].attributeName === "data-theme") {
                board.setTheme(document.body.getAttribute("data-theme") === "dark" ? "dark" : "light");
                break;
              }
            }
          });
          mvThemeObs.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
        }
      } catch (e) {}
      draw();
    }
    mats.forEach(function (mt) {
      var b = el("button", "phy-tab", mt.name);
      b.type = "button";
      b.setAttribute("aria-pressed", mt === state.mat ? "true" : "false");
      b.addEventListener("click", function () {
        state.mat = mt;
        for (var i = 0; i < tabs.children.length; i++)
          tabs.children[i].setAttribute("aria-pressed",
            tabs.children[i] === b ? "true" : "false");
        draw(); flash(box);
      });
      tabs.appendChild(b);
    });
    sM.on(function () { draw(); });
    later(init, 0);
    draw();
    debugFor(pageId).widgets.push({ type: "mv-lab", board: function () { return board; },
      Vof: function (m, rho) { return Vof(m, rho); },
      select: function (id) {
        var tb = null;
        for (var i = 0; i < tabs.children.length; i++)
          if (mats[i] && mats[i].id === id) tb = tabs.children[i];
        if (tb) tb.click();
        return state.mat ? state.mat.id : null;
      },
      current: function () { return state.mat ? { id: state.mat.id, rho: state.mat.rho } : null; },
      setMass: function (m) { sM.set(m); return Vof(sM.get(), state.mat.rho); } });
    return box;
  }

  /* ============================================================
   * B1-12. slope-compare（p04.1.3）：DOM（点选行→文案+flash）
   * 色条长度 ∝ ρ + ρ 数值双编码；排名按 order（ρ 从大到小）。
   * ============================================================ */
  function renderSlopeCompareEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var mats = p.materials || [], order = p.order || [];
    var maxRho = 0;
    order.forEach(function (mid) {
      mats.forEach(function (x) { if (x.id === mid) maxRho = Math.max(maxRho, x.rho); });
    });
    var list = el("div", "phy-slope-list");
    box.appendChild(list);
    var note = el("div", "phy-slope-note", "点一点每种材料，看它的 ρ 和线的样子。");
    box.appendChild(note);
    var steepWord = ["最陡", "次之", "最平缓"];
    var rankWord = ["最大", "居中", "最小"];
    var verdict = "";
    order.forEach(function (mid, i) {
      var mt = null;
      mats.forEach(function (x) { if (x.id === mid) mt = x; });
      if (!mt) return;
      var frac = maxRho > 0 ? mt.rho / maxRho : 0;
      var barW = Math.round(24 + frac * 96);
      var row = el("button", "phy-slope-row",
        '<span class="phy-slope-rank">' + (i + 1) + "</span>" +
        '<span class="phy-slope-name">' + esc(mt.name) + "</span>" +
        '<span class="phy-slope-bar" style="width:' + barW + 'px;background:' +
        cssVar("--phy-force-a") + '"></span>' +
        '<span class="phy-slope-rho">ρ=' + mt.rho.toFixed(1) + " " + esc(p.unitRho || "") + "</span>");
      row.setAttribute("aria-pressed", "false");
      (function (m, idx) {
        row.addEventListener("click", function () {
          for (var k = 0; k < list.children.length; k++)
            list.children[k].setAttribute("aria-pressed", "false");
          row.setAttribute("aria-pressed", "true");
          verdict = m.name + "：ρ = " + m.rho.toFixed(1) + " " + (p.unitRho || "") +
            "，线" + (steepWord[idx] || ("第" + (idx + 1))) +
            " → 密度" + (rankWord[idx] || "");
          note.textContent = verdict;
          badge.setReadout("", verdict);
          flash(row);
        });
      })(mt, i);
      list.appendChild(row);
    });
    debugFor(pageId).widgets.push({ type: "slope-compare", order: order.slice(),
      select: function (i) { list.children[i].click(); return verdict; },
      verdict: function () { return verdict; } });
    return box;
  }


  /* ============================================================
   * B1-13. motion-sim（p13）：解析运动学原语（Eng.Tween 驱动）
   * projectile：R=v0²sin2θ/g、H=(v0·sinθ)²/2g、T=2v0·sinθ/g；
   *   v0≤0 → 播放置灰 + "初速度不能为 0"；θ→90° → 竖线 +
   *   "竖直上抛是抛体的特例"；
   * circle：T=2π/ω；向心力箭头实时指向圆心；手柄↔滑块双向同步。
   * 播放由 Eng.Tween（deterministic）驱动时间参量，位置为 t 纯函数。
   * ============================================================ */
  var MOTIONSIM_AX = {
    assumptions: ["无空气阻力", "质点", "匀速圆周：理想匀速"],
    approximations: ["解析运动学：轨迹为时间纯函数，数值逐位"],
    errorEstimate: "解析精确；动画时间由 Tween 驱动（reduced-motion 降级首末两态）"
  };
  function renderMotionSimEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "运动轨迹模拟");
    box.appendChild(svg);
    var mode = p.mode === "circle" ? "circle" : "projectile";
    var g = p.g || 9.8;
    var ts = p.timeScale == null ? 1 : p.timeScale;
    if (ts < 1) box.appendChild(noteLine("慢放 ×" + ts + "（非真实时间）"));
    var maxF = Math.min(p.maxFrames || 120, 300);
    var bar = uiPlaybar({
      onPlay: function () { playTween(); },
      onPause: function () { if (tw) tw.cancel(); playing = false; },
      onReplay: function () { if (tw) tw.cancel(); playing = false; seekU(0); },
      onScrub: function (f) { if (tw) tw.cancel(); playing = false; seekU(f); }
    });
    box.appendChild(bar.bar);
    var st = stateBadge("", "");
    box.appendChild(st);
    var tw = null, playing = false, probe = null;
    function seekU(u) { if (probe) probe.seek(u); drawAt(probe.tOf(u)); }
    function playTween() {
      if (!probe || !window.Eng || !window.Eng.Tween) return;
      playing = true;
      var durMs = probe.durSec() * 1000 / ts;
      tw = new window.Eng.Tween({ durationMs: durMs, ease: function (u) { return u; },
        deterministic: false, reducedMotion: false,
        assumptions: MOTIONSIM_AX.assumptions,
        approximations: MOTIONSIM_AX.approximations,
        errorEstimate: MOTIONSIM_AX.errorEstimate,
        onUpdate: function (u) { drawAt(probe.tOf(u)); bar.setProgress(u); },
        onDone: function () { playing = false; bar.setPlaying(false); } });
      tw.start();
    }
    function drawAt(t) { if (probe) probe.draw(t); }

    if (mode === "circle") {
      var om = uiSlider({ label: "角速度 ω", min: p.omega.min, max: p.omega.max,
        step: p.omega.step, init: p.omega.init, unit: "rad/s" });
      box.insertBefore(om.row, svg.nextSibling);
      var phase = 0;
      var cx0 = 50, cy0 = 52, RR = 30;
      function TofC() { return 2 * Math.PI / om.get(); }
      function posAt(t) {
        var a = phase + om.get() * t;
        return { x: cx0 + RR * Math.cos(a), y: cy0 + RR * Math.sin(a) };
      }
      function drawC(t) {
        svg.innerHTML = "";
        svg.appendChild(svgEl("circle", { cx: cx0, cy: cy0, r: RR, fill: "none",
          stroke: cssVar("--phy-body"), "stroke-width": 1.2 }));
        svg.appendChild(svgEl("circle", { cx: cx0, cy: cy0, r: 1.6, fill: cssVar("--phy-body") }));
        var q = posAt(t);
        arrowHead(svg, "fh-cent", cssVar("--phy-target"));
        svg.appendChild(svgEl("line", { x1: q.x, y1: q.y, x2: cx0, y2: cy0,
          stroke: cssVar("--phy-target"), "stroke-width": 1.6, "marker-end": "url(#fh-cent)" }));
        svg.appendChild(svgText((q.x + cx0) / 2, (q.y + cy0) / 2 - 4, "F向", "phy-force-label"));
        svg.appendChild(svgEl("circle", { cx: q.x, cy: q.y, r: 3.2,
          fill: cssVar("--phy-force-a"), stroke: cssVar("--phy-body"), "stroke-width": 1 }));
        var hd = svgEl("circle", { cx: q.x, cy: q.y, r: 6, "class": "phy-handle",
          fill: "none", "aria-label": "拖动手柄改相位" });
        svg.appendChild(hd);
        dragify(hd, { svg: svg, onMove: function (lx, ly) {
          phase = Math.atan2(ly - cy0, lx - cx0);
          if (tw) tw.cancel();
          drawC(0);
        }, onEnd: function () { flash(svg); } });
        var T = TofC();
        badge.setReadout("", "T = 2π/ω = " + fmtN(T, 2) + " s");
        st.textContent = "向心力永远指向圆心";
        st.className = "phy-state phy-state-ok";
      }
      probe = {
        tOf: function (u) { return u * TofC(); },
        durSec: function () { return TofC(); },
        seek: function (u) { if (tw) tw.seek(u); },
        draw: drawC,
        truth: function () { return { omega: om.get(), T: TofC() }; }
      };
      om.on(function () { if (tw) tw.cancel(); playing = false; bar.setPlaying(false);
        seekU(0); });
      drawC(0);
    } else {
      var v0s = uiSlider({ label: "初速度 v₀", min: p.v0.min, max: p.v0.max,
        step: p.v0.step, init: p.v0.init, unit: "m/s" });
      var ags = uiSlider({ label: "发射角 θ", min: p.angle.min, max: p.angle.max,
        step: p.angle.step, init: p.angle.init, unit: "°" });
      box.appendChild(v0s.row);
      box.appendChild(ags.row);
      function RTV() {
        var v0 = v0s.get(), th = ags.get() * Math.PI / 180;
        var T = 2 * v0 * Math.sin(th) / g;
        var R = v0 * Math.cos(th) * T;
        var H = Math.pow(v0 * Math.sin(th), 2) / (2 * g);
        return { v0: v0, thDeg: ags.get(), T: T, R: R, H: H };
      }
      function posP(t) {
        var r = RTV(), th = r.thDeg * Math.PI / 180;
        return { x: r.v0 * Math.cos(th) * t,
          y: r.v0 * Math.sin(th) * t - 0.5 * g * t * t };
      }
      function drawP(t) {
        svg.innerHTML = "";
        var r = RTV();
        if (r.v0 <= 0) {
          badge.setReadout("", "初速度不能为 0");
          st.textContent = "初速度不能为 0";
          st.className = "phy-state phy-state-warn";
          svg.appendChild(svgText(50, 50, "初速度不能为 0", "phy-note-text"));
          return;
        }
        var Rd = Math.max(r.R, 1), Hd = Math.max(r.H, 1);
        function X(x) { return 8 + x / Rd * 80; }
        function Y(y) { return 90 - y / Hd * 76; }
        svg.appendChild(svgEl("line", { x1: 8, y1: 90, x2: 94, y2: 90, "class": "phy-ground" }));
        var pts = [];
        var n = Math.min(maxF, 120);
        for (var i = 0; i <= n; i++) {
          var tt = r.T * i / n, qq = posP(tt);
          pts.push(X(Math.max(0, qq.x)).toFixed(1) + "," + Y(Math.max(0, qq.y)).toFixed(1));
        }
        svg.appendChild(svgEl("polyline", { points: pts.join(" "),
          fill: "none", stroke: cssVar("--phy-track"), "stroke-width": 1.2,
          "stroke-dasharray": "3,2" }));
        if (r.R < 0.01 || Math.abs(r.thDeg - 90) < 1e-9)
          svg.appendChild(svgText(X(0) + 4, Y(Hd / 2), "竖直上抛是抛体的特例", "phy-note-text", "start"));
        var qb = posP(Math.min(t, r.T));
        svg.appendChild(svgEl("circle", { cx: X(Math.max(0, qb.x)).toFixed(1),
          cy: Y(Math.max(0, qb.y)).toFixed(1), r: 3,
          fill: cssVar("--phy-force-a"), stroke: cssVar("--phy-body"), "stroke-width": 1 }));
        /* 发射手柄（蓝色可拖视觉约定）↔ 滑块双向同步（旧口径） */
        if (p.dragHandle !== false && !bar.playBtn.disabled) {
          var hx = X(Math.min(r.v0 * 0.35, Rd * 0.4)), hy = Y(0) - 8;
          var hd = svgEl("circle", { cx: hx.toFixed(1), cy: hy.toFixed(1), r: 6,
            "class": "phy-handle-blue", fill: cssVar("--phy-known"),
            "aria-label": "拖动发射手柄改初速度和发射角" });
          svg.appendChild(hd);
          dragify(hd, { svg: svg,
            onMove: function (lx, ly) {
              var dx = Math.max(2, lx - X(0)), dy = Math.max(1, Y(0) - ly);
              var nv = Math.min(p.v0.max, Math.max(p.v0.min, dx / (X(Rd) - X(0)) * Rd * 2.2));
              var na = Math.min(p.angle.max, Math.max(p.angle.min,
                Math.atan2(dy, dx) * 180 / Math.PI));
              v0s.set(nv, true); ags.set(na, true);
              drawP(0);
            },
            onEnd: function () { flash(hd); } });
        }
        badge.setReadout("", "R = " + fmtN(r.R, 2) + " m，H = " + fmtN(r.H, 2) +
          " m，T = " + fmtN(r.T, 2) + " s");
        st.textContent = "R 只看落点多远，H 只看最高多高";
        st.className = "phy-state phy-state-ok";
      }
      probe = {
        tOf: function (u) { return u * RTV().T; },
        durSec: function () { return RTV().T; },
        seek: function (u) { if (tw) tw.seek(u); },
        draw: drawP,
        truth: function () { return RTV(); },
        posAt: posP
      };
      function syncDisabled() {
        var dis = v0s.get() <= 0;
        bar.playBtn.disabled = dis;
      }
      v0s.on(function () { if (tw) tw.cancel(); playing = false; syncDisabled(); seekU(0); });
      ags.on(function () { if (tw) tw.cancel(); playing = false; seekU(0); });
      syncDisabled();
      drawP(0);
    }
    debugFor(pageId).widgets.push(Object.assign({ type: "motion-sim", mode: mode }, probe));
    return box;
  }

  /* ============================================================
   * B1-14. spring-shm（p14.1.2 / p17.2.2）：Eng.SpringMass 状态机真值
   * x=A·cos(ωt)（ω=√(k/m)）；T=2π√(m/k) 实时验算行；振子可拖改振幅
   * （松手即从该位置释放，初相位=0）；x-t 联动图像 + 当前时刻游标；
   * T 极端时动画归一化（Tvis 钳制 0.8–2.4s）并常驻"动画已调速"；
   * damping=true 仅定性"振幅渐小"示意（文案显性化）。
   * ============================================================ */
  function renderSpringShmEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "弹簧振子");
    box.appendChild(svg);
    var kc = p.k || {}, mc = p.m || {};
    var sK = uiSlider({ label: "劲度系数 k", min: kc.min || 10, max: kc.max || 200,
      step: kc.step || 10, init: kc.init != null ? kc.init : 50, unit: "N/m",
      fmt: function (v) { return fmtN(v, 0); } });
    var sM = uiSlider({ label: "质量 m", min: mc.min || 0.5, max: mc.max || 5,
      step: mc.step || 0.5, init: mc.init != null ? mc.init : 1, unit: "kg",
      fmt: function (v) { return fmtN(v, 1); } });
    box.appendChild(sK.row); box.appendChild(sM.row);
    var eqLine = el("div", "phy-note", "");
    box.appendChild(eqLine);
    var xt = el("canvas", "phy-xt-cv");
    box.appendChild(xt);
    var bar = uiPlaybar({
      onPlay: function () { playing = true; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0;
        rebuild(); tV = 0; pts = []; draw(); }
    });
    bar.scrub.style.display = "none";
    box.appendChild(bar.bar);
    var st = stateBadge("", "ok");
    box.appendChild(st);
    var A = 14, tV = 0, pts = [];
    var sm = null;
    function omega() { return Math.sqrt(sK.get() / sM.get()); }
    function period() { return 2 * Math.PI / omega(); }
    function rebuild() {
      if (!(window.Eng && window.Eng.SpringMass && window.Eng.Driver)) return;
      var drv = new window.Eng.Driver({ dt: 1 / 240, gravityMps2: 0,
        assumptions: ["无阻尼", "轻弹簧", "水平无摩擦"],
        approximations: ["驱动器半隐式欧拉积分；ENG-26 胡克力逐位"],
        errorEstimate: "ENG-27：周期容差 (ωdt)²/24+0.05%" });
      sm = new window.Eng.SpringMass(drv, {
        springConstantNpm: sK.get(), massKg: sM.get(),
        equilibriumXM: 0, amplitudeM: A / 40,
        assumptions: ["无阻尼", "轻弹簧", "水平无摩擦"],
        approximations: ["驱动器半隐式欧拉积分"],
        errorEstimate: "ENG-26/27" });
    }
    rebuild();
    var playing = true, rafId = 0, lastT = nowMs();
    function draw() {
      var T = period(), Tvis = Math.max(0.8, Math.min(2.4, T));
      var x = sm ? sm.state().displacementM * 40 : 0;
      var damp = p.damping ? Math.exp(-0.12 * tV) : 1;
      var xd = x * damp;
      svg.innerHTML = "";
      var eqX = 50;
      svg.appendChild(svgEl("line", { x1: 8, y1: 50, x2: eqX - 26, y2: 50,
        stroke: cssVar("--phy-body"), "stroke-width": 1.2 }));
      var coils = 8, x1 = eqX - 26, x0 = 8;
      var dd = "M" + x0 + ",50";
      for (var j2 = 0; j2 <= coils; j2++)
        dd += " L" + (x0 + (x1 - x0) * j2 / coils).toFixed(1) + "," + (50 + (j2 % 2 ? -4 : 4));
      svg.appendChild(svgEl("path", { d: dd, fill: "none",
        stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
      var mx = eqX + xd;
      svg.appendChild(svgEl("rect", { x: mx - 5, y: 42, width: 10, height: 16,
        "class": "phy-body-box" }));
      svg.appendChild(svgEl("line", { x1: eqX, y1: 30, x2: eqX, y2: 70, "class": "phy-track-line" }));
      svg.appendChild(svgText(eqX, 74, "O", "phy-note-text"));
      var blk = svgEl("rect", { x: mx - 5, y: 42, width: 10, height: 16,
        fill: "transparent", "class": "phy-handle", "aria-label": "拖动振子改振幅" });
      svg.appendChild(blk);
      dragify(blk, { svg: svg, onMove: function (lx) {
        A = Math.max(4, Math.min(24, Math.abs(lx - eqX)));
        rebuild(); tV = 0; pts = []; draw();
      }, onEnd: function () { flash(svg); } });
      svg.appendChild(svgEl("line", { x1: eqX - A, y1: 34, x2: eqX + A, y2: 34,
        stroke: cssVar("--phy-target"), "stroke-width": 1,
        "marker-start": "url(#fh-amp)", "marker-end": "url(#fh-amp)" }));
      arrowHead(svg, "fh-amp", cssVar("--phy-target"));
      svg.appendChild(svgText(eqX, 30, "A = " + fmtN(A, 1), "phy-note-text"));
      var W = 300, H = 90;
      xt.width = W; xt.height = H;
      xt.style.width = W + "px"; xt.style.height = H + "px";
      var ctx = xt.getContext("2d");
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "#888"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(6, H / 2); ctx.lineTo(W - 6, H / 2); ctx.stroke();
      ctx.strokeStyle = "#D55E00"; ctx.lineWidth = 1.6;
      ctx.beginPath();
      pts.forEach(function (q, i) {
        var px = 6 + q.t / (Tvis * 2.2) * (W - 12), py = H / 2 - q.x / 26 * (H / 2 - 8);
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      });
      ctx.stroke();
      if (pts.length) {
        var last = pts[pts.length - 1];
        var cxp = 6 + last.t / (Tvis * 2.2) * (W - 12);
        ctx.strokeStyle = "#0072B2"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(cxp, 4); ctx.lineTo(cxp, H - 4); ctx.stroke();
      }
      badge.setReadout("", "T = 2π√(m/k) = " + fmtN(T, 2) + " s");
      eqLine.textContent = "T = 2π√(m/k) = " + fmtN(T, 2) + " s" +
        (Tvis !== T ? "（动画已调速，非真实时间）" : "") +
        (p.damping ? "（振幅慢慢变小（示意））" : "");
      st.textContent = "振幅 A = " + fmtN(A, 1) + "：拖振子可改";
      st.className = "phy-state phy-state-ok";
    }
    function loop() {
      if (!playing) return;
      var now = nowMs(), dt = Math.min(0.05, (now - lastT) / 1000 || 0.016);
      lastT = now;
      var T = period(), Tvis = Math.max(0.8, Math.min(2.4, T));
      if (sm) stepDriverByWall(sm.driver, dt * (T / Tvis), 1 / 240);
      tV += dt * (T / Tvis);
      var damp = p.damping ? Math.exp(-0.12 * tV) : 1;
      var x = sm ? sm.state().displacementM * 40 * damp : 0;
      pts.push({ t: tV % (Tvis * 2.2), x: x });
      if (pts.length > 300) pts.shift();
      draw();
      rafId = rafFn(loop);
    }
    sK.on(function () { rebuild(); tV = 0; pts = []; draw(); });
    sM.on(function () { rebuild(); tV = 0; pts = []; draw(); });
    draw();
    loop();
    debugFor(pageId).widgets.push({ type: "spring-shm", engine: sm,
      truth: function () { return { k: sK.get(), m: sM.get(), A: A, T: period() }; },
      xNow: function () { return sm ? sm.state().displacementM * 40 : NaN; } });
    return box;
  }

  /* ============================================================
   * B1-15. displacement-arrow（p11.1.2）：Konva 基座小原语
   * 起点固定（蓝点），拖终点手柄（朱红，r=6）→ 位移箭头 + 分量虚线；
   * 读数 Δx = … 格（只看起点→终点的直线）。
   * ============================================================ */
  function renderDisplacementArrowEngine(p, pageId) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var cid = "phy-eng-disp-" + (++forceViewSeq);
    var cdiv = el("div", "phy-eng-stage");
    cdiv.id = cid;
    box.appendChild(cdiv);
    var st = stateBadge("从起点拖到终点，画位移箭头", "");
    box.appendChild(st);
    var A = { x: 20, y: 70 }, B = { x: 68, y: 34 };
    var view = null, input = null, layer = null;
    var arrow = null, lbl = null, comp1 = null, comp2 = null, handle = null, endLbl = null;
    function konvaText(text, fontSize, fill) {
      return new Konva.Text({ text: text, fontSize: fontSize, fill: fill,
        fontFamily: (window.Eng && window.Eng.FONT_STACK) || "sans-serif",
        listening: false });
    }
    function drawAll() {
      if (!view) return;
      var pA = view.logicalToPixel(A.x, A.y), pB = view.logicalToPixel(B.x, B.y);
      comp1.points([pA.x, pA.y, pB.x, pA.y]);
      comp2.points([pB.x, pA.y, pB.x, pB.y]);
      arrow.points([pA.x, pA.y, pB.x, pB.y]);
      lbl.position({ x: (pA.x + pB.x) / 2 - 14, y: (pA.y + pB.y) / 2 - 20 });
      handle.position({ x: pB.x, y: pB.y });
      endLbl.position({ x: pB.x - 12, y: pB.y - 26 });
      var dx = (B.x - A.x) / 10, dy = (A.y - B.y) / 10;
      var disp = Math.sqrt(dx * dx + dy * dy);
      badge.setReadout("", "位移 Δx = " + fmtN(disp, 1) + " 格（只看起点→终点的直线）");
      st.textContent = "位移只看起点→终点：Δx = " + fmtN(disp, 1) + " 格（方向：箭头指向）";
      st.className = "phy-state phy-state-ok";
      layer.batchDraw();
    }
    /* V-04：主题跟随页面 data-theme（与受力页 Konva 视图同路） */
    function pageTheme() {
      try {
        return document.body && document.body.getAttribute("data-theme") === "dark"
          ? "dark" : "light";
      } catch (e) { return "light"; }
    }
    function init() {
      if (!(window.Eng && window.Eng.KonvaView && window.Konva)) return;
      view = new window.Eng.KonvaView({ containerId: cid,
        bounds: { xMin: 0, xMax: 100, yMin: 0, yMax: 100 },
        viewportWPx: Math.max(280, Math.min(560, cdiv.clientWidth || box.clientWidth || 480)),
        viewportHPx: 400, theme: pageTheme(),
        assumptions: ["位移只看起点→终点的直线（矢量）"],
        approximations: ["二维示意网格（10 格=1 单位长度）"],
        errorEstimate: "解析精确：Δx = 起终点直线距离" });
      try {
        if (typeof MutationObserver === "function" && document.body && view.setTheme) {
          var themeObs = new MutationObserver(function (muts) {
            for (var mi = 0; mi < muts.length; mi++) {
              if (muts[mi].attributeName === "data-theme") { view.setTheme(pageTheme()); break; }
            }
          });
          themeObs.observe(document.body, { attributes: true, attributeFilter: ["data-theme"] });
        }
      } catch (e) {}
      input = new window.Eng.Input(view);
      layer = view.layer;
      for (var gx = 10; gx <= 90; gx += 10) {
        var gp1 = view.logicalToPixel(gx, 10), gp2 = view.logicalToPixel(gx, 90);
        layer.add(new Konva.Line({ points: [gp1.x, gp1.y, gp2.x, gp2.y],
          stroke: "#ddd", strokeWidth: 1, listening: false }));
      }
      for (var gy = 10; gy <= 90; gy += 10) {
        var gq1 = view.logicalToPixel(10, gy), gq2 = view.logicalToPixel(90, gy);
        layer.add(new Konva.Line({ points: [gq1.x, gq1.y, gq2.x, gq2.y],
          stroke: "#ddd", strokeWidth: 1, listening: false }));
      }
      comp1 = new Konva.Line({ points: [0, 0, 1, 1], stroke: "#999",
        strokeWidth: 1, dash: [4, 3], listening: false });
      comp2 = new Konva.Line({ points: [0, 0, 1, 1], stroke: "#999",
        strokeWidth: 1, dash: [4, 3], listening: false });
      layer.add(comp1); layer.add(comp2);
      var pA0 = view.logicalToPixel(A.x, A.y);
      layer.add(new Konva.Circle({ x: pA0.x, y: pA0.y, radius: 6,
        fill: cssVar("--phy-known"), listening: false }));
      var sLbl = konvaText("起点", 12, cssVar("--phy-body"));
      sLbl.position({ x: pA0.x - 12, y: pA0.y + 10 });
      layer.add(sLbl);
      arrow = new Konva.Arrow({ points: [0, 0, 1, 1], stroke: cssVar("--phy-target"),
        fill: cssVar("--phy-target"), strokeWidth: 3, pointerLength: 10,
        pointerWidth: 10, listening: false });
      layer.add(arrow);
      lbl = konvaText("位移", 13, cssVar("--phy-target"));
      layer.add(lbl);
      endLbl = konvaText("终点", 12, cssVar("--phy-body"));
      layer.add(endLbl);
      handle = new Konva.Circle({ radius: 6, fill: cssVar("--phy-target"),
        stroke: "#fff", strokeWidth: 1.5 });
      handle.setAttr("aria-label", "拖动终点");
      layer.add(handle);
      var bd = input.bindDrag(handle, { onEnd: function () { drawAll(); } });
      var hit = bd.hit || handle;
      function live() {
        var ap = handle.getAbsolutePosition();
        var lg = view.pixelToLogical(ap.x, ap.y);
        B.x = Math.max(10, Math.min(90, lg.x));
        B.y = Math.max(10, Math.min(90, lg.y));
        drawAll();
      }
      hit.on("dragmove", live);
      handle.on("dragmove", live);
      if (input.ensureHitArea) input.ensureHitArea(handle);
      drawAll();
    }
    later(init, 0);
    debugFor(pageId).widgets.push({ type: "displacement-arrow",
      setB: function (x, y) { B.x = x; B.y = y; drawAll();
        return Math.sqrt(Math.pow((B.x - A.x) / 10, 2) + Math.pow((A.y - B.y) / 10, 2)); },
      readout: function () { return Math.sqrt(Math.pow((B.x - A.x) / 10, 2) +
        Math.pow((A.y - B.y) / 10, 2)); } });
    return box;
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
    "spring-scale-pull": renderSpringPairEngine,
    /* 批1（2026-10-17）：其余章节迁移 */
    "pendulum": renderPendulumEngine,
    "read-gauge": renderReadGaugeEngine,
    "thermo-sim": renderThermoEngine,
    "heat-compare": renderHeatCompareEngine,
    "mv-lab": renderMvLabEngine,
    "slope-compare": renderSlopeCompareEngine,
    "motion-sim": renderMotionSimEngine,
    "spring-shm": renderSpringShmEngine,
    "displacement-arrow": renderDisplacementArrowEngine,
    "tuning-fork": renderTuningForkEngine,
    "vacuum-chamber": renderVacuumChamberEngine,
    "sponge-dent": renderSpongeDentEngine,
    "paper-blow": renderPaperBlowEngine,
    "overflow-cup": renderOverflowCupEngine,
    "vacuum-tube": renderVacuumTubeEngine
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
