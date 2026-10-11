/* ============================================================
 * 学习工具箱 · 数学模块 · 几何标注原语库（蓝队）
 *
 * 几何交互地基第一步：SVG 标注原语，零依赖。
 * 全部遵循 docs/math-geometry-style.md：
 *   M4  Okabe-Ito 色板 + 双编码（颜色 + 几何标记，永不同时只靠颜色）
 *   M5  深色模式：只读 CSS 变量 --geo-*，主题切换不重绘画布
 *   M6  反馈：flash（高亮闪烁必选）/ ripple（落定扩散环）/
 *       vibrate（可选加分，能力检测 + try/catch 静默跳过）
 *
 * 角度约定：数学惯例，度，逆时针为正；polar() 已换算到 SVG 坐标。
 * 颜色：params 里只传语义名（known/target/corrA/…），不出现具体色值。
 * 挂载：window.GEOM。
 * ============================================================ */
(function () {
  "use strict";

  var NS = "http://www.w3.org/2000/svg";
  var XNS = "http://www.w3.org/1999/xhtml";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------------- 语义色 → CSS 变量（M4/M5） ---------------- */
  var C = {
    known:     "var(--geo-known)",      // 已知：蓝
    target:    "var(--geo-target)",     // 待求/求证：朱红
    corrA:     "var(--geo-corr-a)",     // 对应 A 组：橙
    corrB:     "var(--geo-corr-b)",     // 对应 B 组：天蓝
    corrC:     "var(--geo-corr-c)",     // 对应 C 组：蓝绿
    corrAngle: "var(--geo-corr-angle)", // 对应角弧线：紫红
    line:      "var(--geo-line)",       // 常规描边
    aux:       "var(--geo-aux)",        // 辅助线（灰虚线）
    grid:      "var(--geo-grid)",       // 网格线
    highlight: "var(--geo-highlight)",  // 高亮：黄
    text:      "var(--geo-text)"        // 文字
  };
  function colorOf(name) { return C[name] || C.line; }

  /* ---------------- 角度/几何小工具 ---------------- */
  function rad(d) { return d * Math.PI / 180; }
  function deg(r) { return r * 180 / Math.PI; }
  function norm360(d) { d %= 360; return d < 0 ? d + 360 : d; }
  function norm180(d) { d %= 180; return d < 0 ? d + 180 : d; }
  function dist(ax, ay, bx, by) {
    var dx = bx - ax, dy = by - ay;
    return Math.sqrt(dx * dx + dy * dy);
  }
  // 数学惯例角度 → SVG 坐标点（y 轴向下，故减去 sin 分量）
  function polar(x, y, r, angDeg) {
    var a = rad(angDeg);
    return [x + r * Math.cos(a), y - r * Math.sin(a)];
  }
  // 从 p1 看 p2 的数学惯例角度（度）
  function angleOf(x1, y1, x2, y2) {
    return norm360(deg(Math.atan2(-(y2 - y1), x2 - x1)));
  }

  /* ---------------- SVG 基础 ---------------- */
  function el(tag, attrs) {
    var e = document.createElementNS(NS, tag);
    if (attrs) for (var k in attrs) {
      if (attrs[k] !== undefined && attrs[k] !== null) e.setAttribute(k, attrs[k]);
    }
    return e;
  }
  function svg(w, h, cls) {
    return el("svg", {
      viewBox: "0 0 " + w + " " + h,
      "class": cls || "geo-svg",
      role: "img"
    });
  }
  // svgPoint：pointer 事件坐标 → SVG 坐标
  function svgPoint(svgRoot, evt) {
    var pt = svgRoot.createSVGPoint();
    pt.x = evt.clientX; pt.y = evt.clientY;
    var m = svgRoot.getScreenCTM();
    if (!m) return { x: 0, y: 0 };
    var p = pt.matrixTransform(m.inverse());
    return { x: p.x, y: p.y };
  }

  /* ---------------- 箭头 marker（按语义色缓存） ---------------- */
  var markerCache = {};
  function arrowMarker(svgRoot, colorName) {
    var id = "geo-arrow-" + (colorName || "line");
    if (markerCache[id] && svgRoot.querySelector("#" + id)) return "url(#" + id + ")";
    var defs = svgRoot.querySelector("defs");
    if (!defs) { defs = el("defs"); svgRoot.insertBefore(defs, svgRoot.firstChild); }
    var mk = el("marker", {
      id: id, viewBox: "0 0 10 10", refX: 8.5, refY: 5,
      markerWidth: 6.5, markerHeight: 6.5, orient: "auto-start-reverse"
    });
    mk.appendChild(el("path", { d: "M0,0 L10,5 L0,10 z", fill: colorOf(colorName) }));
    defs.appendChild(mk);
    markerCache[id] = true;
    return "url(#" + id + ")";
  }

  /* ---------------- 原语：点 ---------------- */
  function point(svgRoot, x, y, opts) {
    opts = opts || {};
    var g = el("g", { "class": "geo-point" });
    var c = el("circle", {
      cx: x, cy: y, r: opts.r || 4.5,
      fill: colorOf(opts.color || "line"),
      stroke: "#fff", "stroke-width": 1.5
    });
    g.appendChild(c);
    svgRoot.appendChild(g);
    if (opts.label) {
      label(svgRoot, x + (opts.dx == null ? 9 : opts.dx),
        y + (opts.dy == null ? -8 : opts.dy),
        opts.label, { anchor: "start", bold: true, math: opts.labelMath });
    }
    return g;
  }

  /* ---------------- 原语：线段 ---------------- */
  function segment(svgRoot, ax, ay, bx, by, opts) {
    opts = opts || {};
    var ln = el("line", {
      x1: ax, y1: ay, x2: bx, y2: by,
      stroke: colorOf(opts.color || "line"),
      "stroke-width": opts.width || 2.5,
      "stroke-linecap": "round"
    });
    if (opts.dash) ln.setAttribute("stroke-dasharray", opts.dash);
    svgRoot.appendChild(ln);
    return ln;
  }

  /* ---------------- 原语：射线（端点带箭头） ---------------- */
  function ray(svgRoot, x, y, angDeg, len, opts) {
    opts = opts || {};
    var p = polar(x, y, len, angDeg);
    var ln = el("line", {
      x1: x, y1: y, x2: p[0].toFixed(1), y2: p[1].toFixed(1),
      stroke: colorOf(opts.color || "line"),
      "stroke-width": opts.width || 2.5,
      "stroke-linecap": "round",
      "marker-end": arrowMarker(svgRoot, opts.color || "line")
    });
    svgRoot.appendChild(ln);
    return ln;
  }

  /* ---------------- 原语：直线（裁剪到画布框） ---------------- */
  function line(svgRoot, x, y, angDeg, w, h, opts) {
    opts = opts || {};
    var dx = Math.cos(rad(angDeg)), dy = -Math.sin(rad(angDeg));
    // 与四条边求交，取框内最长线段
    var ts = [];
    if (Math.abs(dx) > 1e-9) { ts.push((0 - x) / dx); ts.push((w - x) / dx); }
    if (Math.abs(dy) > 1e-9) { ts.push((0 - y) / dy); ts.push((h - y) / dy); }
    var pts = [];
    ts.forEach(function (t) {
      var px = x + dx * t, py = y + dy * t;
      if (px >= -0.5 && px <= w + 0.5 && py >= -0.5 && py <= h + 0.5) pts.push([px, py]);
    });
    if (pts.length < 2) return null;
    // 取距离最远的两点
    var best = [pts[0], pts[1]], bd = -1;
    for (var i = 0; i < pts.length; i++) for (var j = i + 1; j < pts.length; j++) {
      var d = dist(pts[i][0], pts[i][1], pts[j][0], pts[j][1]);
      if (d > bd) { bd = d; best = [pts[i], pts[j]]; }
    }
    return segment(svgRoot, best[0][0], best[0][1], best[1][0], best[1][1], opts);
  }

  /* ---------------- 原语：圆 ----------------
   * fill：语义色名 → 填充该色（默认不透明度 0.22）；缺省不填充。 */
  function circle(svgRoot, x, y, r, opts) {
    opts = opts || {};
    var c = el("circle", {
      cx: x, cy: y, r: r,
      fill: opts.fill ? colorOf(opts.fill) : "none",
      stroke: colorOf(opts.color || "line"),
      "stroke-width": opts.width || 2.5
    });
    if (opts.fill) c.setAttribute("fill-opacity",
      opts.opacity == null ? 0.22 : opts.opacity);
    if (opts.dash) c.setAttribute("stroke-dasharray", opts.dash);
    svgRoot.appendChild(c);
    return c;
  }

  /* ---------------- 原语：角弧线（双编码：颜色 + 弧数） ----------------
   * a1→a2 按数学逆时针方向画；group 1/2/3 → 单弧/双弧/三弧。 */
  function angleArc(svgRoot, vx, vy, a1, a2, r, opts) {
    opts = opts || {};
    var g = el("g", { "class": "geo-angle-arc" });
    var sweep = norm360(a2 - a1);
    if (sweep === 0) sweep = 360;
    var group = Math.min(3, Math.max(1, opts.group || 1));
    var col = colorOf(opts.color || "corrAngle");
    var wdt = opts.width || 2;
    for (var k = 0; k < group; k++) {
      var rr = r + k * 5;
      var s = polar(vx, vy, rr, a1), e = polar(vx, vy, rr, a1 + sweep);
      var large = sweep > 180 ? 1 : 0;
      // 数学逆时针在 SVG y-down 坐标中视觉为逆时针 → sweep-flag 0
      g.appendChild(el("path", {
        d: "M" + s[0].toFixed(1) + "," + s[1].toFixed(1) +
           " A" + rr.toFixed(1) + "," + rr.toFixed(1) + " 0 " + large + " 0 " +
           e[0].toFixed(1) + "," + e[1].toFixed(1),
        fill: "none", stroke: col, "stroke-width": wdt
      }));
    }
    svgRoot.appendChild(g);
    return g;
  }

  /* ---------------- 原语：圆弧（以圆心为锚的圆周弧线） ----------------
   * a1→a2 按数学逆时针方向画（y-up 逻辑）；用于半圆/扇形边等背景图形。
   * sweep<=0 或 >=360 时画整圆。 */
  function circleArc(svgRoot, cx, cy, r, a1, a2, opts) {
    opts = opts || {};
    var sweep = norm360(a2 - a1);
    var col = colorOf(opts.color || "line");
    var wdt = opts.width || 2.5;
    var full = sweep === 0;
    if (full) sweep = 360;
    var s = polar(cx, cy, r, a1), e = polar(cx, cy, r, a1 + sweep);
    var large = sweep > 180 ? 1 : 0;
    // 数学逆时针在 SVG y-down 坐标中视觉为逆时针 → sweep-flag 0
    var p = el("path", {
      d: "M" + s[0].toFixed(1) + "," + s[1].toFixed(1) +
         " A" + r.toFixed(1) + "," + r.toFixed(1) + " 0 " + large + " 0 " +
         e[0].toFixed(1) + "," + e[1].toFixed(1),
      fill: "none", stroke: col, "stroke-width": wdt,
      "stroke-linecap": "round"
    });
    if (opts.dash) p.setAttribute("stroke-dasharray", opts.dash);
    svgRoot.appendChild(p);
    return p;
  }

  /* ---------------- 原语：等长刻度线（双编码：颜色 + 刻度道数） ----------------
   * 在边中点画与边垂直的短横刻度；count 1/2/3 道沿边方向排开。 */
  function ticks(svgRoot, ax, ay, bx, by, opts) {
    opts = opts || {};
    var g = el("g", { "class": "geo-ticks" });
    var count = Math.min(3, Math.max(1, opts.count || 1));
    var mx = (ax + bx) / 2, my = (ay + by) / 2;
    var len = dist(ax, ay, bx, by) || 1;
    var ux = (bx - ax) / len, uy = (by - ay) / len;   // 边方向
    var px = -uy, py = ux;                            // 法方向
    var half = opts.size || 6;                        // 刻度半长
    var gap = opts.gap || 7;                          // 道间距
    var col = colorOf(opts.color || "line");
    var wdt = opts.width || 2;
    for (var i = 0; i < count; i++) {
      var off = (i - (count - 1) / 2) * gap;
      var cx = mx + ux * off, cy = my + uy * off;
      g.appendChild(el("line", {
        x1: (cx - px * half).toFixed(1), y1: (cy - py * half).toFixed(1),
        x2: (cx + px * half).toFixed(1), y2: (cy + py * half).toFixed(1),
        stroke: col, "stroke-width": wdt, "stroke-linecap": "round"
      }));
    }
    svgRoot.appendChild(g);
    return g;
  }

  /* ---------------- 原语：平行箭头（双编码：颜色 + 箭头数） ----------------
   * 在线段中点沿线方向画 count 个小箭头。 */
  function parArrows(svgRoot, ax, ay, bx, by, opts) {
    opts = opts || {};
    var g = el("g", { "class": "geo-par-arrows" });
    var count = Math.min(3, Math.max(1, opts.count || 1));
    var mx = (ax + bx) / 2, my = (ay + by) / 2;
    var len = dist(ax, ay, bx, by) || 1;
    var ux = (bx - ax) / len, uy = (by - ay) / len;
    var px = -uy, py = ux;
    var s = opts.size || 7;   // 箭头大小
    var gap = opts.gap || 9;  // 箭头间距（沿法向排开，避免遮挡线条方向感）
    var col = colorOf(opts.color || "line");
    for (var i = 0; i < count; i++) {
      var off = (i - (count - 1) / 2) * gap;
      var cx = mx + px * off, cy = my + py * off;
      // 小箭头：沿线方向的三角形
      var tipx = cx + ux * s, tipy = cy + uy * s;
      var bx1 = cx - ux * s * 0.4 + px * s * 0.55, by1 = cy - uy * s * 0.4 + py * s * 0.55;
      var bx2 = cx - ux * s * 0.4 - px * s * 0.55, by2 = cy - uy * s * 0.4 - py * s * 0.55;
      g.appendChild(el("path", {
        d: "M" + tipx.toFixed(1) + "," + tipy.toFixed(1) +
           " L" + bx1.toFixed(1) + "," + by1.toFixed(1) +
           " L" + bx2.toFixed(1) + "," + by2.toFixed(1) + " Z",
        fill: col
      }));
    }
    svgRoot.appendChild(g);
    return g;
  }

  /* ---------------- 原语：直角方块（不依赖颜色） ----------------
   * vx,vy 顶点；px,py / qx,qy 分别在两条边上（决定朝向）。 */
  function rightAngle(svgRoot, vx, vy, px, py, qx, qy, size, opts) {
    opts = opts || {};
    var s = size || 10;
    var l1 = dist(vx, vy, px, py) || 1, l2 = dist(vx, vy, qx, qy) || 1;
    var ux = (px - vx) / l1, uy = (py - vy) / l1;
    var wx = (qx - vx) / l2, wy = (qy - vy) / l2;
    var p1x = vx + ux * s, p1y = vy + uy * s;
    var p2x = p1x + wx * s, p2y = p1y + wy * s;
    var p3x = vx + wx * s, p3y = vy + wy * s;
    var path = el("path", {
      d: "M" + p1x.toFixed(1) + "," + p1y.toFixed(1) +
         " L" + p2x.toFixed(1) + "," + p2y.toFixed(1) +
         " L" + p3x.toFixed(1) + "," + p3y.toFixed(1),
      fill: "none",
      stroke: colorOf(opts.color || "line"),
      "stroke-width": opts.width || 2
    });
    svgRoot.appendChild(path);
    return path;
  }

  /* ---------------- 原语：标签文字 ----------------
   * math:true 时走 MathExpr（x^2 → x²，SVG 内 foreignObject），
   * 与代数交互的 axisLabel 同一渲染器。 */
  function label(svgRoot, x, y, text, opts) {
    opts = opts || {};
    var size = opts.size || 15;
    if (opts.math) {
      var html = text;
      try { if (window.MathExpr) html = window.MathExpr.html(text); } catch (e) { html = esc(text); }
      var fo = el("foreignObject", {
        x: (x - 60).toFixed(1), y: (y - size / 2 - 4).toFixed(1),
        width: 120, height: size + 14
      });
      var div = document.createElementNS(XNS, "div");
      var align = opts.anchor === "middle" ? "center" : (opts.anchor === "end" ? "right" : "left");
      var wdt = 120;
      var fx = opts.anchor === "middle" ? x - wdt / 2 : (opts.anchor === "end" ? x - wdt : x);
      fo.setAttribute("x", fx.toFixed(1));
      div.setAttribute("style",
        "font-size:" + size + "px;color:" + colorOf(opts.color || "text") + ";" +
        "text-align:" + align + ";line-height:1.4;white-space:nowrap;" +
        (opts.bold ? "font-weight:bold;" : ""));
      div.innerHTML = html;
      fo.appendChild(div);
      svgRoot.appendChild(fo);
      return fo;
    }
    var t = el("text", {
      x: x.toFixed(1), y: y.toFixed(1),
      "text-anchor": opts.anchor || "middle",
      "font-size": size,
      fill: colorOf(opts.color || "text")
    });
    if (opts.bold) t.setAttribute("font-weight", "bold");
    // 描边衬底，保证压在线条上仍可读
    t.setAttribute("paint-order", "stroke");
    t.setAttribute("stroke", "var(--geo-bg)");
    t.setAttribute("stroke-width", "3");
    t.textContent = text;
    svgRoot.appendChild(t);
    return t;
  }

  /* ============================================================
   * M6 · 反馈原语
   * ============================================================ */

  // 能力检测 + try/catch：不支持时静默跳过（iOS Safari 无效、桌面无硬件）
  function vibrate(pattern) {
    try {
      if (typeof navigator !== "undefined" &&
          typeof navigator.vibrate === "function") {
        navigator.vibrate(pattern == null ? 15 : pattern);
      }
    } catch (e) { /* 静默跳过：视觉反馈已覆盖 */ }
  }

  // 短促合成音（Web Audio 现场合成，零音频文件；加分项）
  var audioCtx = null;
  function beep(freq, durMs) {
    try {
      if (!audioCtx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        audioCtx = new AC();
      }
      if (audioCtx.state === "suspended") audioCtx.resume();
      var t = audioCtx.currentTime;
      var o = audioCtx.createOscillator();
      var g = audioCtx.createGain();
      o.type = "sine";
      o.frequency.setValueAtTime(freq || 880, t);
      g.gain.setValueAtTime(0.06, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + (durMs || 90) / 1000);
      o.connect(g); g.connect(audioCtx.destination);
      o.start(t); o.stop(t + (durMs || 90) / 1000 + 0.02);
    } catch (e) { /* 静默跳过 */ }
  }

  // 高亮闪烁：描边变黄 flashMs 后恢复；无 transform 属性的元素附带缩放脉冲
  function flash(node, ms) {
    if (!node) return;
    ms = ms || 300;
    node.classList.add("geo-flash");
    if (!node.getAttribute("transform")) node.classList.add("geo-pulse");
    setTimeout(function () {
      try {
        node.classList.remove("geo-flash");
        node.classList.remove("geo-pulse");
      } catch (e) {}
    }, ms);
  }

  // 落定扩散圆环：半径 0→R，300ms 淡出后移除
  function ripple(svgRoot, x, y, opts) {
    opts = opts || {};
    var R = opts.radius || 24, ms = opts.ms || 300;
    var c = el("circle", {
      cx: x, cy: y, r: 1,
      fill: "none", stroke: colorOf(opts.color || "highlight"),
      "stroke-width": 2.5, opacity: 0.9, "pointer-events": "none"
    });
    svgRoot.appendChild(c);
    var t0 = null;
    function frame(ts) {
      if (t0 === null) t0 = ts;
      var k = Math.min(1, (ts - t0) / ms);
      c.setAttribute("r", (1 + (R - 1) * k).toFixed(1));
      c.setAttribute("opacity", (0.9 * (1 - k)).toFixed(2));
      if (k < 1) requestAnimationFrame(frame);
      else if (c.parentNode) c.parentNode.removeChild(c);
    }
    if (typeof requestAnimationFrame === "function") requestAnimationFrame(frame);
    else if (c.parentNode) c.parentNode.removeChild(c);
  }

  // 落定组合反馈（M6）：视觉必选（flash + ripple），震动/音效可选加分
  function settle(svgRoot, x, y, node, opts) {
    opts = opts || {};
    flash(node, opts.flashMs || 300);
    ripple(svgRoot, x, y, { radius: opts.radius || 24 });
    if (opts.vibrate !== null && opts.vibrate !== undefined) vibrate(opts.vibrate);
    else if (opts.vibrate !== null) vibrate([20, 30, 20]);
    if (opts.beep) beep(opts.beepFreq || 880, opts.beepMs || 90);
  }

  /* ---------------- 挂载 ---------------- */
  window.GEOM = {
    el: el, svg: svg, svgPoint: svgPoint, esc: esc,
    C: C, colorOf: colorOf,
    rad: rad, deg: deg, norm360: norm360, norm180: norm180,
    dist: dist, polar: polar, angleOf: angleOf,
    point: point, segment: segment, ray: ray, line: line, circle: circle,
    angleArc: angleArc, circleArc: circleArc, ticks: ticks, parArrows: parArrows,
    rightAngle: rightAngle, label: label, arrowMarker: arrowMarker,
    vibrate: vibrate, beep: beep, flash: flash, ripple: ripple, settle: settle
  };
})();
