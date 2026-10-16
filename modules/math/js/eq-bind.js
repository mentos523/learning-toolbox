/* ============================================================
 * 学习工具箱 · 数学 · 波 A 图文绑定渲染器（eq-bind.js）
 *
 * 自包含：不引用 interactions.js 闭包内任何函数。
 * 允许的全局：window.MathExpr（表达式排版）、window.MATH_INTERACTIONS.register。
 * 注册类型：eq-graph-lab / ineq-shade-lab / eq-graph /
 *           sys-lab / sys-steps / static-compare（后三者为 ch05x 单元专用小件）
 * 设计依据：~/workspace/math-rectify/waveA-design.md §1.1/1.2/1.5、§2
 * ============================================================ */
(function () {
  "use strict";

  /* ================= §A 自包含基础套件 =================
   * 与 interactions.js 语义逐项一致（waveA-design.md §1.5），
   * 不得扩展求值函数集。 */
  var SVGNS = "http://www.w3.org/2000/svg";

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function el(tag, cls, html) {
    var d = document.createElement(tag);
    if (cls) d.className = cls;
    if (html != null) d.innerHTML = html;
    return d;
  }
  function fmt(n) {
    if (!isFinite(n)) return "—";
    return String(Math.round(n * 1000) / 1000);
  }
  function MX(s) {
    try { if (window.MathExpr) return window.MathExpr.html(s); } catch (e) {}
    return esc(s);
  }
  function svgEl(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }

  /* 安全表达式求值器（单变量；与 slider-lab 语义逐项一致） */
  function evalExpr(expr, varName, varValue) {
    return evalVars(expr, [[varName, varValue]]);
  }
  /* 多变量版：按变量名长度降序代入，避免前缀吞食 */
  function evalVars(expr, pairs) {
    var e = String(expr == null ? "" : expr);
    e = e.replace(/\^/g, "**");
    e = e.replace(/\bsin\s*\(/g, "Math.sin(")
         .replace(/\bcos\s*\(/g, "Math.cos(")
         .replace(/\btan\s*\(/g, "Math.tan(")
         .replace(/\blog2\s*\(/g, "Math.log2(")
         .replace(/\blog\s*\(/g, "Math.log(")
         .replace(/\bln\s*\(/g, "Math.log(")
         .replace(/\bsqrt\s*\(/g, "Math.sqrt(")
         .replace(/\u03C0/g, "Math.PI");
    var ps = (pairs || []).slice().sort(function (a, b) {
      return String(b[0]).length - String(a[0]).length;
    });
    ps.forEach(function (pr) {
      var escName = String(pr[0]).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
      e = e.replace(new RegExp("\\b" + escName + "\\b", "g"),
                    "(" + Number(pr[1]) + ")");
    });
    var check = e.replace(/\bMath\.(sin|cos|tan|log2|log|sqrt|PI)\b/g, "");
    if (!/^[0-9+\-*/().\s]*$/.test(check)) return NaN;
    try {
      var v = Function('"use strict"; return (' + e + ")")();
      return (typeof v === "number" && isFinite(v)) ? v : NaN;
    } catch (err) { return NaN; }
  }

  /* 咔哒音效（复刻 slider-lab 命中反馈；失败静默） */
  var tickCtx = null;
  function tickSound() {
    try {
      if (!tickCtx) tickCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (tickCtx.state === "suspended") tickCtx.resume();
      var t = tickCtx.currentTime;
      var o = tickCtx.createOscillator(), g = tickCtx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(2400, t);
      o.frequency.exponentialRampToValueAtTime(1200, t + 0.03);
      g.gain.setValueAtTime(0.05, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.05);
      o.connect(g); g.connect(tickCtx.destination);
      o.start(t); o.stop(t + 0.06);
    } catch (e) {}
  }
  function hapticTick() {
    try { if (navigator.vibrate) navigator.vibrate(8); } catch (e) {}
  }

  /* 坐标帧：逻辑坐标 ↔ SVG 像素（y-up 逻辑） */
  function makeFrame(W, H, xMin, xMax, yMin, yMax, margins) {
    var m = margins || {};
    var mL = m.l != null ? m.l : 46, mR = m.r != null ? m.r : 16;
    var mT = m.t != null ? m.t : 14, mB = m.b != null ? m.b : 30;
    function X(x) { return mL + (x - xMin) / (xMax - xMin) * (W - mL - mR); }
    function Y(y) { return mT + (1 - (y - yMin) / (yMax - yMin)) * (H - mT - mB); }
    function iX(px) { return xMin + (px - mL) / (W - mL - mR) * (xMax - xMin); }
    function iY(py) { return yMin + (1 - (py - mT) / (H - mT - mB)) * (yMax - yMin); }
    function S(v) { return v / (xMax - xMin) * (W - mL - mR); }
    return { W: W, H: H, X: X, Y: Y, iX: iX, iY: iY, S: S,
             xMin: xMin, xMax: xMax, yMin: yMin, yMax: yMax };
  }
  /* SVG 客户端坐标 → viewBox 坐标 */
  function svgPoint(svg, evt) {
    var r = svg.getBoundingClientRect();
    var vb = svg.viewBox.baseVal;
    return {
      x: (evt.clientX - r.left) / r.width * vb.width,
      y: (evt.clientY - r.top) / r.height * vb.height
    };
  }
  function nearForbid(x, forbid, eps) {
    for (var i = 0; i < (forbid || []).length; i++)
      if (Math.abs(x - forbid[i]) <= eps) return true;
    return false;
  }
  function dedupRoots(roots, tol) {
    roots.sort(function (a, b) { return a - b; });
    var out = [];
    roots.forEach(function (r) {
      if (!out.length || Math.abs(r - out[out.length - 1]) > tol) out.push(r);
    });
    return out;
  }

  /* 扫描 + 二分求根（waveA-design.md §2.4）
   * g: x -> number；forbid: 禁区 x 列表；返回升序根数组。
   * 含相切兜底：|g| 局部极小 + 精化 ≤1e-9 也算根。 */
  function findRoots(g, a, b, forbid) {
    forbid = forbid || [];
    var N = 400, roots = [];
    var xs = [], vs = [];
    for (var i = 0; i <= N; i++) {
      var x = a + (b - a) * i / N;
      var bad = nearForbid(x, forbid, 1e-6);
      xs.push(x);
      vs.push(bad ? NaN : g(x));
    }
    function addRoot(r) {
      if (r >= a - 1e-9 && r <= b + 1e-9 && !nearForbid(r, forbid, 1e-6))
        roots.push(Math.min(b, Math.max(a, r)));
    }
    for (var j = 0; j < N; j++) {
      var x0 = xs[j], x1 = xs[j + 1], v0 = vs[j], v1 = vs[j + 1];
      if (!isFinite(v0) || !isFinite(v1)) continue;
      if (v0 === 0) { addRoot(x0); continue; }
      if (v1 === 0) { addRoot(x1); continue; }
      if (v0 * v1 < 0) {
        var lo = x0, hi = x1, flo = v0;
        for (var k = 0; k < 60; k++) {
          var mid = (lo + hi) / 2, fm = g(mid);
          if (!isFinite(fm)) break;
          if (flo * fm <= 0) hi = mid; else { lo = mid; flo = fm; }
        }
        addRoot((lo + hi) / 2);
      }
    }
    /* 相切兜底：|g| 的局部极小若可精化到 ≤1e-9 则为偶重根 */
    var av = [];
    for (var m = 0; m <= N; m++) av.push(Math.abs(vs[m]));
    for (var q = 1; q < N; q++) {
      if (!isFinite(av[q]) || !isFinite(av[q - 1]) || !isFinite(av[q + 1])) continue;
      if (av[q] <= av[q - 1] && av[q] <= av[q + 1] && av[q] < 1e-7) {
        var lo2 = xs[q - 1], hi2 = xs[q + 1];
        for (var t = 0; t < 50; t++) {  /* 黄金分割精化 |g| */
          var m1 = lo2 + (hi2 - lo2) * 0.382, m2 = lo2 + (hi2 - lo2) * 0.618;
          var f1 = Math.abs(g(m1)), f2 = Math.abs(g(m2));
          if (!isFinite(f1) || !isFinite(f2)) break;
          if (f1 < f2) hi2 = m2; else lo2 = m1;
        }
        var best = (lo2 + hi2) / 2;
        if (Math.abs(g(best)) <= 1e-9) addRoot(best);
      }
    }
    return dedupRoots(roots, 1e-7);
  }

  /* 不等式解集：expr(axisVar) ineq 0 在 [a,b] 上的区间列表（含端点开闭）
   * extraPairs: 除轴变量外的参数代入（如 param-sweep 的 [["a", av]]） */
  function solveIneq(expr, ineq, axisVar, extraPairs, a, b) {
    var g = function (x) {
      var ps = [[axisVar, x]].concat(extraPairs || []);
      return evalVars(expr, ps);
    };
    var roots = findRoots(g, a, b, []);
    var cuts = [a].concat(roots, [b]);
    var segs = [];
    var closed = (ineq === ">=" || ineq === "<=");
    function holds(v) {
      if (ineq === ">") return v > 0;
      if (ineq === "<") return v < 0;
      if (ineq === ">=") return v >= 0;
      return v <= 0;
    }
    for (var i = 0; i + 1 < cuts.length; i++) {
      var lo = cuts[i], hi = cuts[i + 1];
      if (hi - lo < 1e-12) continue;
      var mid = (lo + hi) / 2, v = g(mid);
      if (!isFinite(v)) continue;
      if (holds(v)) segs.push({ lo: lo, hi: hi, loOpen: true, hiOpen: true });
    }
    /* 区间端点若恰为根：开闭按 ineq 定（>/</>>= /<=） */
    segs.forEach(function (s) {
      var loIsRoot = roots.some(function (r) { return Math.abs(r - s.lo) < 1e-7; });
      var hiIsRoot = roots.some(function (r) { return Math.abs(r - s.hi) < 1e-7; });
      s.loOpen = loIsRoot ? !closed : false;
      s.hiOpen = hiIsRoot ? !closed : false;
      if (Math.abs(s.lo - a) < 1e-9) s.loOpen = false;  /* 轴端点不画圈 */
      if (Math.abs(s.hi - b) < 1e-9) s.hiOpen = false;
    });
    return { roots: roots, segs: segs };
  }
  /* 区间列表求交（system 模式公共行） */
  function intersectSegs(lists) {
    var cur = lists.length ? lists[0].slice() : [];
    for (var i = 1; i < lists.length; i++) {
      var nxt = [];
      cur.forEach(function (A) {
        lists[i].forEach(function (B) {
          var lo = Math.max(A.lo, B.lo), hi = Math.min(A.hi, B.hi);
          if (hi - lo > 1e-12) {
            nxt.push({
              lo: lo, hi: hi,
              loOpen: lo === A.lo ? A.loOpen : B.loOpen,
              hiOpen: hi === A.hi ? A.hiOpen : B.hiOpen
            });
          }
        });
      });
      cur = nxt;
    }
    return cur;
  }

  /* 实例注册（测试钩子用） */
  var instances = {};
  function regInst(page, key, api) {
    if (page && page.id) instances[page.id + "::" + key] = api;
  }

  /* ================= §B eq-graph-lab =================
   * 滑块试解 + 函数图像/数轴双向绑定。
   * 探针只反写试解变量 x，不反写方程系数（绿队裁定 §2.1）。 */

  var EQGUIDE = "拖动滑块，或直接拖动图上的解点";

  function renderEqGraphLab(container, params, page) {
    params = params || {};
    var graph = params.graph || {};
    var kind = graph.kind || "numberline";

    var min = Number(params.min), max = Number(params.max);
    var step = Number(params.step) || 1;
    var label = params.label || "x";
    var expr = params.expr != null ? String(params.expr) : label;
    var hasTarget = params.target !== undefined && params.target !== null;
    var target = hasTarget ? Number(params.target) : NaN;
    var initial = (params.initial !== undefined && params.initial !== null &&
                   isFinite(Number(params.initial)))
      ? Number(params.initial) : (min + max) / 2;
    var guide = (params.guide !== undefined && params.guide !== null &&
                 String(params.guide).trim() !== "")
      ? String(params.guide) : EQGUIDE;

    if (!(min < max)) {
      container.appendChild(el("div", "ix-stub", "参数错误：min 必须 < max"));
      return;
    }
    if (kind === "system2x2") {
      renderSystem2x2(container, params, page);
      return;
    }

    var wrap = el("div", "ix-eqbind");
    /* —— 表达式行（复刻 slider-lab） —— */
    var exprLine = el("div", "ix-expr-line",
      '<span class="ix-expr">' + MX(expr) + "</span>" +
      '<span class="ix-eq"> = </span><span class="ix-val">0</span>' +
      (params.unit ? ' <span class="ix-unit">' + esc(params.unit) + "</span>" : ""));
    var valSpan = exprLine.querySelector(".ix-val");
    /* —— 滑块行 —— */
    var row = el("div", "ix-slider-row");
    var labSpan = el("span", "ix-slider-label", MX(label) + " = ");
    var valLab = el("span", "ix-slider-val", "");
    var input = document.createElement("input");
    input.type = "range";
    input.min = min; input.max = max; input.step = step;
    input.className = "ix-range";
    input.setAttribute("aria-label", label);
    row.appendChild(labSpan); row.appendChild(input); row.appendChild(valLab);
    /* —— 引导 —— */
    var guideDiv = el("div", "ix-hint", esc(guide));
    guideDiv.style.cssText = "font-size:.8rem;color:var(--m-ink-soft);margin:2px 0;";
    wrap.appendChild(exprLine); wrap.appendChild(row); wrap.appendChild(guideDiv);

    /* —— SVG 图 —— */
    var isNL = (kind === "numberline");
    var VW = 420, VH = isNL ? 130 : 300;
    var svg = svgEl("svg", {
      viewBox: "0 0 " + VW + " " + VH, "class": "ix-svg", role: "img"
    });
    svg.style.maxWidth = "100%";
    wrap.appendChild(svg);

    /* —— 目标旗帜 + 状态行（复刻 slider-lab） —— */
    if (hasTarget) {
      var flag = el("div", "ix-target-flag",
        "🎯 " + esc(params.targetLabel || ("目标 " + target)));
      flag.title = "把结果拖到这个值";
      wrap.appendChild(flag);
    }
    var status = el("div", "ix-status", "");
    wrap.appendChild(status);
    container.appendChild(wrap);

    /* —— 状态与 setX —— */
    var state = { x: initial };
    function snap(v) {
      v = Math.min(max, Math.max(min, v));
      var n = Math.round((v - min) / step);
      var s = min + n * step;
      s = Math.min(max, Math.max(min, s));
      /* 浮点吸附修正：0.1+0.2 类 */
      var dec = Math.max(0, -Math.floor(Math.log10(step) + 1e-9));
      return Number(s.toFixed(Math.min(dec + 2, 10)));
    }
    function evalR(x) { return evalExpr(expr, label, x); }

    /* —— 取景 —— */
    var fr;
    (function buildView() {
      var gx0 = graph.view && isFinite(+graph.view.xMin) ? +graph.view.xMin : null;
      var x0 = gx0 != null ? gx0 : min - (max - min) * 0.1;
      var x1 = graph.view && isFinite(+graph.view.xMax) ? +graph.view.xMax : max + (max - min) * 0.1;
      if (kind === "numberline") { fr = makeFrame(VW, VH, x0, x1, -1, 1); return; }
      var y0 = graph.view && isFinite(+graph.view.yMin) ? +graph.view.yMin : null;
      var y1 = graph.view && isFinite(+graph.view.yMax) ? +graph.view.yMax : null;
      if (y0 == null || y1 == null) {
        var forbid = graph.forbidAt || [];
        var lo = Infinity, hi = -Infinity, xr = x1 - x0;
        for (var i = 0; i <= 200; i++) {
          var sx = x0 + xr * i / 200;
          if (nearForbid(sx, forbid, 1e-6)) continue;
          var sv = sampleY(kind, graph, expr, label, sx);
          if (!isFinite(sv)) continue;
          if (kind === "rational" && Math.abs(sv) > 50 * xr) continue;  /* 渐近线钳制 */
          if (sv < lo) lo = sv; if (sv > hi) hi = sv;
        }
        if (!isFinite(lo)) { lo = -1; hi = 1; }
        if (hasTarget) { if (target < lo) lo = target; if (target > hi) hi = target; }
        if (kind === "zero") { lo = Math.min(lo, 0); hi = Math.max(hi, 0); }
        var pad = (hi - lo) * 0.15 || 1;
        if (y0 == null) y0 = lo - pad;
        if (y1 == null) y1 = hi + pad;
      }
      fr = makeFrame(VW, VH, x0, x1, y0, y1);
    })();

    /* —— 静态层：坐标轴/网格/曲线/目标线 —— */
    var gStatic = svgEl("g", { "class": "eqb-static" });
    svg.appendChild(gStatic);
    /* numberline 解 tick：求 evalR(x)=target 的解（扫描+二分，复用 findRoots；
     * 返工 F-01：此前引用了未定义的 solveLinearTick，致全部 numberline 页渲染失败） */
    function solveLinearTick() {
      if (!hasTarget) return null;
      var gg = function (x) {
        var y = evalR(x);
        return isFinite(y) ? y - target : NaN;
      };
      var roots = findRoots(gg, fr.xMin, fr.xMax, []);
      return roots.length ? roots[0] : null;
    }
    drawAxes(gStatic, fr, isNL);
    if (!isNL) {
      drawCurve(gStatic, fr, kind, graph, expr, label);
      var tLineY = (kind === "zero") ? 0 : target;
      if (kind !== "zero" ? hasTarget : true) {
        var tl = svgEl("line", {
          x1: fr.X(fr.xMin), y1: fr.Y(tLineY),
          x2: fr.X(fr.xMax), y2: fr.Y(tLineY),
          stroke: "var(--geo-corr-a)", "stroke-width": 1.5,
          "stroke-dasharray": "7,5"
        });
        gStatic.appendChild(tl);
        var tlab = svgEl("text", {
          x: fr.X(fr.xMax) - 4, y: fr.Y(tLineY) - 6,
          "text-anchor": "end", "font-size": "12.5",
          fill: "var(--geo-corr-a)"
        });
        tlab.textContent = (kind === "zero") ? "y = 0" : ("y = " + fmt(target));
        gStatic.appendChild(tlab);
      }
      /* 禁区 ✕ 标注 */
      (graph.forbidAt || []).forEach(function (fx) {
        if (fx < fr.xMin || fx > fr.xMax) return;
        var cx = fr.X(fx), cy = fr.Y(0);
        var yy = Math.min(Math.max(cy, 20), fr.H - 20);
        var mk = svgEl("text", {
          x: cx, y: yy, "text-anchor": "middle", "font-size": "15.2",
          "font-weight": "bold", fill: "var(--geo-target)"
        });
        mk.textContent = "✕";
        gStatic.appendChild(mk);
        var cap = svgEl("text", {
          x: cx, y: yy + 15, "text-anchor": "middle", "font-size": "12.5",
          fill: "var(--geo-target)"
        });
        cap.textContent = "分母为零，无意义";
        gStatic.appendChild(cap);
      });
      /* 增根标记（forbidAt=[] 但文案要求打 ✕ 的页） */
      (graph.markX || []).forEach(function (fx) {
        if (fx < fr.xMin || fx > fr.xMax) return;
        var mkx = svgEl("text", {
          x: fr.X(fx), y: fr.Y(0) - 10, "text-anchor": "middle",
          "font-size": "15.2", "font-weight": "bold", fill: "var(--geo-target)"
        });
        mkx.textContent = "✕";
        gStatic.appendChild(mkx);
        var cl = svgEl("text", {
          x: fr.X(fx), y: fr.Y(0) + 14, "text-anchor": "middle",
          "font-size": "12.5", fill: "var(--geo-target)"
        });
        cl.textContent = "增根";
        gStatic.appendChild(cl);
      });
      /* vertex 顶点星标（只读） */
      if (kind === "vertex" && graph.a) {
        var hv = -graph.b / (2 * graph.a);
        var kv = graph.c - graph.b * graph.b / (4 * graph.a);
        if (hv >= fr.xMin && hv <= fr.xMax) drawStar(gStatic, fr.X(hv), fr.Y(kv), 9, "var(--geo-highlight)");
        var vl = svgEl("text", {
          x: fr.X(hv), y: fr.Y(kv) - 14, "text-anchor": "middle",
          "font-size": "12.5", fill: "var(--geo-text)"
        });
        vl.textContent = "顶点 (" + fmt(hv) + ", " + fmt(kv) + ")";
        gStatic.appendChild(vl);
      }
    }
    else {
      /* numberline：数轴 + 解 tick */
      var solX = solveLinearTick();
      if (solX != null) {
        var dm = svgEl("path", {
          d: "M" + fr.X(solX) + "," + (fr.Y(0) - 26) + " l6,8 l-6,8 l-6,-8 Z",
          fill: "var(--geo-corr-a)", opacity: "0.85"
        });
        gStatic.appendChild(dm);
        var dl = svgEl("text", {
          x: fr.X(solX), y: fr.Y(0) - 32, "text-anchor": "middle",
          "font-size": "12.5", fill: "var(--geo-corr-a)"
        });
        dl.textContent = "解";
        gStatic.appendChild(dl);
      }
    }

    /* —— 交点静态标记（解的位置）+ 可拖探针（试解点，x 坐标恒 = state.x） —— */
    var gProbe = svgEl("g", { "class": "eqb-probes" });
    svg.appendChild(gProbe);
    var tYp = isNL ? 0 : ((kind === "zero") ? 0 : target);

    function probeIntersections() {
      /* 返回交点逻辑 x 列表（按 kind；静态标记用） */
      if (kind === "numberline" || kind === "system2x2") return [];
      var tY = (kind === "zero") ? 0 : target;
      if (kind === "parabola" || kind === "vertex") {
        var a = +graph.a, b = +graph.b, c = +graph.c;
        if (!(a > 0 || a < 0)) return [];
        var D = b * b - 4 * a * (c - tY);
        if (D < -1e-12) return [];
        if (D < 0) D = 0;
        var sD = Math.sqrt(D);
        var r1 = (-b - sD) / (2 * a), r2 = (-b + sD) / (2 * a);
        return D <= 1e-12 ? [r1] : [r1, r2].sort(function (p, q) { return p - q; });
      }
      if (kind === "line") {
        var k = evalR(1) - evalR(0), bb = evalR(0);
        if (Math.abs(k) < 1e-12) return [];
        return [(tY - bb) / k];
      }
      var gg = function (x) {
        var y = sampleY(kind, graph, expr, label, x);
        return isFinite(y) ? y - tY : NaN;
      };
      return findRoots(gg, fr.xMin, fr.xMax, graph.forbidAt || []);
    }

    /* 交点静态标记 */
    var solMarks = [];
    (probeIntersections() || []).forEach(function (ix0) {
      if (ix0 < fr.xMin - 1e-9 || ix0 > fr.xMax + 1e-9) return;
      var mk = svgEl("circle", {
        cx: fr.X(ix0), cy: isNL ? fr.Y(0) : fr.Y(tYp),
        r: 5, fill: "none", stroke: "var(--geo-corr-a)", "stroke-width": 2
      });
      gProbe.appendChild(mk);
      solMarks.push(ix0);
    });

    /* 可拖探针：沿 y=target（或数轴）移动，x 恒 = state.x */
    var probeRoot = svgEl("g", { "class": "eqb-probe" });
    var probeDot = svgEl("circle", {
      r: 8, fill: "var(--geo-target)", stroke: "#fff", "stroke-width": 1.5,
      style: "cursor:grab"
    });
    var probeRing = svgEl("circle", {
      r: 12.5, fill: "none", stroke: "var(--geo-target)",
      "stroke-width": 2, opacity: "0"
    });
    var probePad = svgEl("circle", {
      r: 22, fill: "transparent", style: "cursor:grab;pointer-events:all"
    });
    probeRoot.appendChild(probeRing);
    probeRoot.appendChild(probeDot);
    probeRoot.appendChild(probePad);
    gProbe.appendChild(probeRoot);

    var dragging = false;
    probePad.addEventListener("pointerdown", function (ev) {
      dragging = true;
      try { probePad.setPointerCapture(ev.pointerId); } catch (e) {}
      probeDot.style.cursor = "grabbing"; probePad.style.cursor = "grabbing";
      ev.preventDefault();
    });
    probePad.addEventListener("pointermove", function (ev) {
      if (!dragging) return;
      var sp = svgPoint(svg, ev);
      var lx = fr.iX(sp.x);
      if (kind === "rational") {  /* 不得跨禁区 */
        (graph.forbidAt || []).forEach(function (fx) {
          if (Math.abs(lx - fx) < 0.6) lx = fx + (lx >= fx ? 0.6 : -0.6);
        });
      }
      setX(snap(lx));
    });
    function endDrag() {
      if (!dragging) return;
      dragging = false;
      probeDot.style.cursor = "grab"; probePad.style.cursor = "grab";
    }
    probePad.addEventListener("pointerup", endDrag);
    probePad.addEventListener("pointercancel", endDrag);

    function layoutProbes() {
      var py = isNL ? fr.Y(0) : fr.Y(tYp);
      probeRoot.setAttribute("transform",
        "translate(" + fr.X(state.x).toFixed(1) + "," + py.toFixed(1) + ")");
    }

    /* —— 命中反馈 —— */
    var hitOn = false;
    function updateHit(r) {
      var hit = hasTarget && Math.abs(r - target) <= 1e-9 * Math.max(1, Math.abs(target));
      if (kind === "zero") hit = false;
      if (hit && !hitOn) {
        hitOn = true; tickSound(); hapticTick();
        status.innerHTML = '<span class="ix-success">🎯 ' +
          esc(params.targetLabel || ("达到目标 " + target)) + "！</span>";
        wrap.classList.add("ix-hit");
      } else if (!hit && hitOn) {
        hitOn = false;
        status.innerHTML = "";
        wrap.classList.remove("ix-hit");
      } else if (!hitOn && hasTarget && kind !== "zero") {
        var diff = target - r;
        status.innerHTML = '<span class="ix-hint">' +
          (diff > 0 ? "还差 " + fmt(diff) : "超过了 " + fmt(-diff)) + "</span>";
      }
      probeRing.setAttribute("opacity", hit ? "1" : "0");
    }

    /* —— setX：唯一事实源 —— */
    function setX(v) {
      state.x = snap(v);
      input.value = state.x;
      valLab.textContent = fmt(state.x);
      var r = evalR(state.x);
      valSpan.textContent = fmt(r);
      layoutProbes();
      updateHit(r);
    }
    input.addEventListener("input", function () { setX(Number(input.value)); });

    /* 注：探针旁标注"拖动解点 = 换一个 x 试试"（§2.1 诚实语义） */
    if (!isNL) {
      var honest = svgEl("text", {
        x: 8, y: 14, "font-size": "12.5", fill: "var(--geo-aux)"
      });
      honest.textContent = "拖动解点 = 换一个 x 试试";
      svg.appendChild(honest);
    }

    setX(initial);

    /* —— 测试钩子 —— */
    regInst(page, "lab", {
      setX: setX,
      sliderValue: function () { return Number(input.value); },
      readout: function () { return evalR(state.x); },
      probeCount: function () { return 1; },
      probeX: function () { return state.x; },
      dragProbeTo: function (i, x) { setX(snap(x)); },  /* 走同一 setX 入口 */
      solutionMarks: function () { return solMarks.slice(); },
      kind: kind
    });
  }

  function sampleY(kind, graph, expr, label, x) {
    if (kind === "parabola" || kind === "vertex") {
      return graph.a * x * x + graph.b * x + graph.c;
    }
    return evalExpr(expr, label, x);
  }

  function drawAxes(g, fr, isNL) {
    var NS = SVGNS;
    function ln(x1, y1, x2, y2, attrs) {
      var e = document.createElementNS(NS, "line");
      e.setAttribute("x1", x1); e.setAttribute("y1", y1);
      e.setAttribute("x2", x2); e.setAttribute("y2", y2);
      for (var k in attrs) e.setAttribute(k, attrs[k]);
      g.appendChild(e);
      return e;
    }
    if (isNL) {
      var y0 = fr.Y(0);
      ln(fr.X(fr.xMin), y0, fr.X(fr.xMax), y0,
         { stroke: "var(--geo-line)", "stroke-width": 2 });
      /* 整数刻度 */
      var stepT = niceTick(fr.xMax - fr.xMin);
      for (var t = Math.ceil(fr.xMin / stepT) * stepT; t <= fr.xMax + 1e-9; t += stepT) {
        ln(fr.X(t), y0 - 5, fr.X(t), y0 + 5,
           { stroke: "var(--geo-line)", "stroke-width": 1.5 });
        var tx = document.createElementNS(NS, "text");
        tx.setAttribute("x", fr.X(t)); tx.setAttribute("y", y0 + 20);
        tx.setAttribute("text-anchor", "middle");
        tx.setAttribute("font-size", "12.5");
        tx.setAttribute("fill", "var(--geo-text)");
        tx.textContent = fmt(t);
        g.appendChild(tx);
      }
      return;
    }
    /* 网格 */
    var xt = niceTick(fr.xMax - fr.xMin), yt = niceTick(fr.yMax - fr.yMin);
    for (var gx = Math.ceil(fr.xMin / xt) * xt; gx <= fr.xMax + 1e-9; gx += xt) {
      ln(fr.X(gx), fr.Y(fr.yMin), fr.X(gx), fr.Y(fr.yMax),
         { stroke: "var(--geo-grid)", "stroke-width": 1 });
    }
    for (var gy = Math.ceil(fr.yMin / yt) * yt; gy <= fr.yMax + 1e-9; gy += yt) {
      ln(fr.X(fr.xMin), fr.Y(gy), fr.X(fr.xMax), fr.Y(gy),
         { stroke: "var(--geo-grid)", "stroke-width": 1 });
    }
    /* 坐标轴（过零） */
    if (fr.yMin <= 0 && fr.yMax >= 0)
      ln(fr.X(fr.xMin), fr.Y(0), fr.X(fr.xMax), fr.Y(0),
         { stroke: "var(--geo-line)", "stroke-width": 1.5 });
    if (fr.xMin <= 0 && fr.xMax >= 0)
      ln(fr.X(0), fr.Y(fr.yMin), fr.X(0), fr.Y(fr.yMax),
         { stroke: "var(--geo-line)", "stroke-width": 1.5 });
  }
  function niceTick(range) {
    var raw = range / 8, mag = Math.pow(10, Math.floor(Math.log10(raw)));
    var n = raw / mag;
    return (n >= 5 ? 5 : n >= 2 ? 2 : 1) * mag;
  }

  var clipSeq = 0;
  function drawCurve(g, fr, kind, graph, expr, label) {
    var NS = SVGNS;
    var forbid = graph.forbidAt || [];
    var pts = [];
    var N = 220;
    for (var i = 0; i <= N; i++) {
      var x = fr.xMin + (fr.xMax - fr.xMin) * i / N;
      if (nearForbid(x, forbid, 1e-6)) { pts.push(null); continue; }
      var y = sampleY(kind, graph, expr, label, x);
      if (!isFinite(y)) { pts.push(null); continue; }
      pts.push([fr.X(x), fr.Y(y)]);
    }
    var d = "", pen = false;
    pts.forEach(function (p) {
      if (!p) { pen = false; return; }
      d += (pen ? "L" : "M") + p[0].toFixed(1) + "," + p[1].toFixed(1) + " ";
      pen = true;
    });
    /* 裁剪到绘图区（防渐近线撑爆） */
    var clipId = "eqb-clip-" + (++clipSeq);
    var defs = document.createElementNS(NS, "defs");
    var cp = document.createElementNS(NS, "clipPath");
    cp.setAttribute("id", clipId);
    var rc = document.createElementNS(NS, "rect");
    rc.setAttribute("x", fr.X(fr.xMin)); rc.setAttribute("y", fr.Y(fr.yMax));
    rc.setAttribute("width", fr.X(fr.xMax) - fr.X(fr.xMin));
    rc.setAttribute("height", fr.Y(fr.yMin) - fr.Y(fr.yMax));
    cp.appendChild(rc); defs.appendChild(cp); g.appendChild(defs);
    var path = document.createElementNS(NS, "path");
    path.setAttribute("d", d);
    path.setAttribute("fill", "none");
    path.setAttribute("stroke", "var(--geo-known)");
    path.setAttribute("stroke-width", "2.5");
    path.setAttribute("stroke-linecap", "round");
    path.setAttribute("clip-path", "url(#" + clipId + ")");
    g.appendChild(path);
  }

  function drawStar(g, cx, cy, r, fill) {
    var NS = SVGNS, d = "";
    for (var i = 0; i < 10; i++) {
      var rr = (i % 2 === 0) ? r : r * 0.45;
      var a = -Math.PI / 2 + i * Math.PI / 5;
      var px = cx + rr * Math.cos(a), py = cy + rr * Math.sin(a);
      d += (i === 0 ? "M" : "L") + px.toFixed(1) + "," + py.toFixed(1) + " ";
    }
    var p = document.createElementNS(NS, "path");
    p.setAttribute("d", d + "Z");
    p.setAttribute("fill", fill);
    p.setAttribute("stroke", "var(--geo-line)");
    p.setAttribute("stroke-width", "1");
    g.appendChild(p);
  }

  /* ============ §B-2 system2x2：二元一次方程组双向绑定 ============
   * 两种模式：
   *  - coeffs：a1,b1,c1,a2,b2,c2 六滑块（ch05x-u3-l1-p2/p3），交点拖拽 → c 反写
   *  - lines：lines:[{k,b},{k,b}]（设计模板），交点拖拽 → b 反写
   * 绿队 §2.3：拖交点反写走"保持斜率、回写截距"的数学定义。 */

  function renderSystem2x2(container, params, page) {
    params = params || {};
    var graph = params.graph || {};
    var mode = graph.mode || (graph.coeffs ? "coeffs" : "lines");

    var wrap = el("div", "ix-eqbind ix-sys2");
    container.appendChild(wrap);

    /* ---------- coeffs 模式 ---------- */
    if (mode === "coeffs") renderSysCoeffs(wrap, graph, page);
    else renderSysLines(wrap, graph, page);
  }

  function fmt2(n) {
    if (!isFinite(n)) return "—";
    var r = Math.round(n * 100) / 100;
    return (Math.abs(r) < 0.0005 ? 0 : r).toFixed(2);
  }
  function fmtCoef(n) {
    /* 方程显示：整数显示整数，否则 2 位小数 */
    if (!isFinite(n)) return "?";
    if (Math.abs(n - Math.round(n)) < 1e-9) return String(Math.round(n));
    return fmt2(n);
  }
  function eqText(a, b, c) {
    /* "a1x + b1y = c1" 人话串 */
    function term(coef, v) {
      if (Math.abs(coef) < 1e-12) return "";
      var s = fmtCoef(Math.abs(coef));
      if (s === "1" && v) s = "";
      return (coef < 0 ? "− " : "+ ") + (s ? s + v : v);
    }
    var s = (term(a, "x") + " " + term(b, "y")).replace(/^\+ /, "").trim();
    if (!s) s = "0";
    return s + " = " + fmtCoef(c);
  }

  function renderSysCoeffs(wrap, graph, page) {
    var C = JSON.parse(JSON.stringify(graph.coeffs || {}));
    ["a1", "b1", "c1", "a2", "b2", "c2"].forEach(function (k) {
      C[k] = isFinite(+C[k]) ? +C[k] : 0;
    });
    var rgAB = graph.ranges && graph.ranges.ab ? graph.ranges.ab : { min: -5, max: 5, step: 1 };
    var rgC = graph.ranges && graph.ranges.c ? graph.ranges.c : { min: -12, max: 12, step: 1 };
    var presets = graph.presets || [];
    var showD = graph.showD === true;

    /* 方程显示区 */
    var eqDiv = el("div", "ix-sys-eqs", "");
    eqDiv.style.cssText = "font-size:.95rem;margin-bottom:6px;line-height:1.8;";
    wrap.appendChild(eqDiv);

    /* 滑块区 */
    var sliders = {};
    ["a1", "b1", "c1", "a2", "b2", "c2"].forEach(function (nm) {
      var isC = (nm === "c1" || nm === "c2");
      var rg = isC ? rgC : rgAB;
      var row = el("div", "ix-slider-row");
      var lab = el("span", "ix-slider-label", esc(nm) + " = ");
      var val = el("span", "ix-slider-val", "");
      var inp = document.createElement("input");
      inp.type = "range";
      inp.min = rg.min; inp.max = rg.max; inp.step = rg.step;
      inp.value = Math.min(rg.max, Math.max(rg.min, C[nm]));
      inp.className = "ix-range";
      inp.setAttribute("aria-label", nm);
      row.appendChild(lab); row.appendChild(inp); row.appendChild(val);
      var grp = el("div", "", "");
      grp.appendChild(el("div", "ix-hint", nm.indexOf("1") >= 0 ? "方程①" : "方程②"));
      grp.firstChild.style.cssText = "font-size:.75rem;color:var(--m-ink-soft);";
      grp.appendChild(row);
      wrap.appendChild(grp);
      sliders[nm] = { input: inp, val: val, row: row };
      inp.addEventListener("input", function () {
        C[nm] = Number(inp.value);
        refresh();
      });
    });
    /* 预设按钮（p3） */
    if (presets.length) {
      var preRow = el("div", "ix-sys-presets", "");
      preRow.style.cssText = "display:flex;gap:8px;margin:6px 0;flex-wrap:wrap;";
      presets.forEach(function (pr) {
        var b = el("button", "ix-btn", esc(pr.label));
        b.type = "button";
        b.addEventListener("click", function () {
          ["a1", "b1", "c1", "a2", "b2", "c2"].forEach(function (k) {
            if (pr.coeffs && isFinite(+pr.coeffs[k])) C[k] = +pr.coeffs[k];
          });
          syncSliders();
          refresh();
        });
        preRow.appendChild(b);
      });
      wrap.appendChild(preRow);
    }
    /* c 反写小字说明（M4，初始隐藏） */
    var cNote = el("div", "ix-hint",
      "拖动交点后 c 可以是小数——直线平移不要求 c 是整数");
    cNote.style.cssText = "font-size:.75rem;color:var(--m-ink-soft);display:none;";
    wrap.appendChild(cNote);

    /* SVG */
    var VW = 420, VH = 320;
    var svg = svgEl("svg", { viewBox: "0 0 " + VW + " " + VH, "class": "ix-svg", role: "img" });
    svg.style.maxWidth = "100%";
    wrap.appendChild(svg);
    var gLines = svgEl("g", {}); svg.appendChild(gLines);
    var gMark = svgEl("g", {}); svg.appendChild(gMark);

    /* readout + 检验 + 状态 */
    var readout = el("div", "ix-expr-line", "");
    wrap.appendChild(readout);
    var residLine = el("div", "ix-hint", "");
    residLine.style.cssText = "font-size:.8rem;color:var(--m-ink-soft);";
    wrap.appendChild(residLine);
    var stateDiv = el("div", "ix-status", "");
    wrap.appendChild(stateDiv);

    var fr = null, sol = null, degenerate = null;  /* sol:{x,y} | null */

    function lineGeom(a, b, c) {
      /* 返回 {pts:[[x,y]...]} 采样或 {vertical:x} */
      if (Math.abs(b) < 1e-12) {
        if (Math.abs(a) < 1e-12) return null;
        return { vertical: c / a };
      }
      return { fn: function (x) { return (c - a * x) / b; } };
    }
    function compute() {
      var a1 = C.a1, b1 = C.b1, c1 = C.c1, a2 = C.a2, b2 = C.b2, c2 = C.c2;
      var bad1 = (Math.abs(a1) < 1e-12 && Math.abs(b1) < 1e-12);
      var bad2 = (Math.abs(a2) < 1e-12 && Math.abs(b2) < 1e-12);
      if (bad1 || bad2) {
        degenerate = "invalid";
        sol = null;
        return;
      }
      var D = a1 * b2 - a2 * b1;
      if (Math.abs(D) <= 1e-9 * Math.max(1, Math.abs(a1 * b2) + Math.abs(a2 * b1))) {
        /* M6 精确式（容差版，供浮点 c） */
        var p1 = Math.abs(a1 * b2 - a2 * b1) <= 1e-9;
        var p2 = Math.abs(a1 * c2 - a2 * c1) <= 1e-9 * Math.max(1, Math.abs(a1 * c2));
        var p3 = Math.abs(b1 * c2 - b2 * c1) <= 1e-9 * Math.max(1, Math.abs(b1 * c2));
        degenerate = (p1 && p2 && p3) ? "coincident" : "parallel";
        sol = null;
        return;
      }
      degenerate = null;
      sol = {
        x: (c1 * b2 - b1 * c2) / D,
        y: (a1 * c2 - c1 * a2) / D
      };
    }
    function buildFrame() {
      var x0 = -8, x1 = 8;
      var lo = Infinity, hi = -Infinity;
      [["a1", "b1", "c1"], ["a2", "b2", "c2"]].forEach(function (ks) {
        var lg = lineGeom(C[ks[0]], C[ks[1]], C[ks[2]]);
        if (!lg) return;
        if (lg.vertical != null) return;
        for (var i = 0; i <= 60; i++) {
          var x = x0 + 16 * i / 60, y = lg.fn(x);
          if (isFinite(y)) { if (y < lo) lo = y; if (y > hi) hi = y; }
        }
      });
      if (sol) { lo = Math.min(lo, sol.y); hi = Math.max(hi, sol.y); }
      if (!isFinite(lo)) { lo = -8; hi = 8; }
      var pad = (hi - lo) * 0.2 || 2;
      /* 钳制：防竖直线撑爆 */
      var yr = hi - lo;
      if (yr > 60) { var mid = (hi + lo) / 2; lo = mid - 30; hi = mid + 30; }
      else { lo -= pad; hi += pad; }
      fr = makeFrame(VW, VH, x0, x1, lo, hi);
    }
    function draw() {
      while (gLines.firstChild) gLines.removeChild(gLines.firstChild);
      while (gMark.firstChild) gMark.removeChild(gMark.firstChild);
      drawAxes(gLines, fr, false);
      var cols = ["var(--geo-known)", "var(--geo-corr-a)"];
      var hitLines = [];
      [["a1", "b1", "c1"], ["a2", "b2", "c2"]].forEach(function (ks, idx) {
        var lg = lineGeom(C[ks[0]], C[ks[1]], C[ks[2]]);
        if (!lg) return;
        var col = cols[idx];
        if (lg.vertical != null) {
          var vx = fr.X(lg.vertical);
          [0, 1].forEach(function (w) {
            var ln = svgEl("line", {
              x1: vx, y1: fr.Y(fr.yMin), x2: vx, y2: fr.Y(fr.yMax),
              stroke: col, "stroke-width": w ? 14 : 2.5,
              opacity: w ? "0" : "1", style: w ? "cursor:grab" : ""
            });
            (w ? gMark : gLines).appendChild(ln);
            if (w) hitLines.push({ el: ln, idx: idx, vertical: true });
          });
        } else {
          var d = "";
          for (var i = 0; i <= 120; i++) {
            var x = fr.xMin + (fr.xMax - fr.xMin) * i / 120;
            var y = lg.fn(x);
            if (!isFinite(y)) { d += "M"; continue; }
            d += (d === "" || d.slice(-1) === "M" ? "M" : "L") +
                 fr.X(x).toFixed(1) + "," + fr.Y(y).toFixed(1) + " ";
          }
          var p = svgEl("path", {
            d: d, fill: "none", stroke: col, "stroke-width": 2.5,
            "stroke-linecap": "round"
          });
          gLines.appendChild(p);
          var hit = svgEl("path", {
            d: d, fill: "none", stroke: "transparent",
            "stroke-width": 24, style: "cursor:grab;pointer-events:stroke"
          });
          gMark.appendChild(hit);
          hitLines.push({ el: hit, idx: idx, vertical: false });
        }
        /* 直线标签 */
        var lab = svgEl("text", {
          x: fr.X(fr.xMax) - 6, y: 18 + idx * 18,
          "text-anchor": "end", "font-size": "13.6", fill: col, "font-weight": "bold"
        });
        lab.textContent = idx === 0 ? "直线①" : "直线②";
        gLines.appendChild(lab);
      });
      /* 交点标记（可拖） */
      if (sol && !degenerate) {
        var mk = svgEl("g", { "class": "eqb-probe" });
        var dot = svgEl("circle", {
          cx: fr.X(sol.x), cy: fr.Y(sol.y), r: 8,
          fill: "var(--geo-target)", stroke: "#fff", "stroke-width": 1.5,
          style: "cursor:grab"
        });
        var pad = svgEl("circle", {
          cx: fr.X(sol.x), cy: fr.Y(sol.y), r: 22,
          fill: "transparent", style: "cursor:grab;pointer-events:all"
        });
        mk.appendChild(dot); mk.appendChild(pad);
        gMark.appendChild(mk);
        attachSysDrag(pad, false, -1);
        var sl = svgEl("text", {
          x: fr.X(sol.x) + 12, y: fr.Y(sol.y) - 10,
          "font-size": "12.5", fill: "var(--geo-target)"
        });
        sl.textContent = "交点（拖我）";
        gMark.appendChild(sl);
      }
      /* 直线拖拽（整体平移 → c 变化） */
      hitLines.forEach(function (h) {
        attachSysDrag(h.el, true, h.idx);
      });
    }

    var dragMode = null;
    function attachSysDrag(elm, isLine, lineIdx) {
      var sx0 = 0, sy0 = 0, c10 = 0, c20 = 0;
      elm.addEventListener("pointerdown", function (ev) {
        var sp = svgPoint(svg, ev);
        sx0 = fr.iX(sp.x); sy0 = fr.iY(sp.y);
        c10 = C.c1; c20 = C.c2;
        dragMode = isLine ? { line: lineIdx } : { point: true };
        try { elm.setPointerCapture(ev.pointerId); } catch (e) {}
        ev.preventDefault();
      });
      elm.addEventListener("pointermove", function (ev) {
        if (!dragMode) return;
        var sp = svgPoint(svg, ev);
        var lx = fr.iX(sp.x), ly = fr.iY(sp.y);
        if (dragMode.point) {
          /* H7：c 反写（保持 a,b 不变） */
          C.c1 = C.a1 * lx + C.b1 * ly;
          C.c2 = C.a2 * lx + C.b2 * ly;
          /* M4：c 滑块切连续模式 */
          ["c1", "c2"].forEach(function (nm) {
            sliders[nm].input.step = "any";
          });
          cNote.style.display = "";
        } else {
          /* 拖直线：整体平移 → c 变化 */
          var i = dragMode.line;
          if (i === 0) {
            if (Math.abs(C.b1) >= 1e-12) C.c1 = c10 + (ly - sy0) * C.b1;
            else C.c1 = c10 + (lx - sx0) * C.a1;
          } else {
            if (Math.abs(C.b2) >= 1e-12) C.c2 = c20 + (ly - sy0) * C.b2;
            else C.c2 = c20 + (lx - sx0) * C.a2;
          }
        }
        syncSliders();
        refresh();
      });
      function endEv() { dragMode = null; }
      elm.addEventListener("pointerup", endEv);
      elm.addEventListener("pointercancel", endEv);
    }

    function syncSliders() {
      Object.keys(sliders).forEach(function (nm) {
        sliders[nm].input.value = C[nm];
      });
    }
    function refresh() {
      compute();
      buildFrame();
      draw();
      /* 方程显示 */
      eqDiv.innerHTML =
        '<div>① ' + MX(eqText(C.a1, C.b1, C.c1)) + "</div>" +
        '<div>② ' + MX(eqText(C.a2, C.b2, C.c2)) + "</div>";
      Object.keys(sliders).forEach(function (nm) {
        sliders[nm].val.textContent = fmtCoef(C[nm]);
      });
      /* (ai,bi)=(0,0) 禁用 */
      var bad1 = (Math.abs(C.a1) < 1e-12 && Math.abs(C.b1) < 1e-12);
      var bad2 = (Math.abs(C.a2) < 1e-12 && Math.abs(C.b2) < 1e-12);
      ["a1", "b1", "c1"].forEach(function (nm) { sliders[nm].input.disabled = bad1; });
      ["a2", "b2", "c2"].forEach(function (nm) { sliders[nm].input.disabled = bad2; });
      if (degenerate === "invalid") {
        readout.innerHTML = '<span class="ix-hint">a、b 不能同时为 0——这不是二元一次方程</span>';
        residLine.textContent = "";
        stateDiv.innerHTML = "";
      } else if (degenerate === "parallel") {
        readout.innerHTML = '<span class="ix-val">—</span>';
        residLine.textContent = "";
        stateDiv.innerHTML = '<span class="ix-hint">两直线平行：方程组无解</span>';
        stateDiv.firstChild.style.color = "var(--geo-target)";
      } else if (degenerate === "coincident") {
        readout.innerHTML = '<span class="ix-val">—</span>';
        residLine.textContent = "";
        stateDiv.innerHTML = '<span class="ix-hint">两直线重合：无数组解</span>';
        stateDiv.firstChild.style.color = "var(--geo-corr-c)";
      } else if (sol) {
        readout.innerHTML = '<span class="ix-expr">' + MX("(x_0, y_0)") + "</span>" +
          '<span class="ix-eq"> = </span><span class="ix-val">(' +
          fmt2(sol.x) + ", " + fmt2(sol.y) + ")</span> " +
          '<span class="ix-hint">（图像读数，近似）</span>';
        /* M5：余数按内部全精度算 */
        var r1 = C.a1 * sol.x + C.b1 * sol.y - C.c1;
        var r2 = C.a2 * sol.x + C.b2 * sol.y - C.c2;
        residLine.textContent = "把精确解代回两式：余数 = " + fmt2(r1) + "、" + fmt2(r2) +
          "（≈0 即验算通过）";
        stateDiv.innerHTML = '<span class="ix-success">相交：唯一解</span>';
      }
      if (showD) {
        var Dv = C.a1 * C.b2 - C.a2 * C.b1;
        var dline = el("div", "ix-hint", "判别式 D = a₁b₂−a₂b₁ = " + fmtCoef(Dv));
        dline.style.cssText = "font-size:.85rem;margin-top:2px;";
        /* 插到 readout 前（只保留一个） */
        var old = wrap.querySelector(".ix-sys-d");
        if (old) old.remove();
        dline.className += " ix-sys-d";
        wrap.insertBefore(dline, readout);
      }
    }
    syncSliders();
    refresh();

    /* 测试钩子 */
    regInst(page, "sys", {
      coeffs: function () { return JSON.parse(JSON.stringify(C)); },
      solution: function () { return sol ? { x: sol.x, y: sol.y } : null; },
      degenerate: function () { return degenerate; },
      setCoeff: function (nm, v) {
        if (C[nm] === undefined) return;
        C[nm] = Number(v); syncSliders(); refresh();
      },
      dragSysTo: function (x, y) {  /* 走与真实拖拽同一反写入口 */
        C.c1 = C.a1 * x + C.b1 * y;
        C.c2 = C.a2 * x + C.b2 * y;
        ["c1", "c2"].forEach(function (nm) { sliders[nm].input.step = "any"; });
        cNote.style.display = "";
        syncSliders(); refresh();
      },
      residuals: function () {
        if (!sol) return null;
        return [C.a1 * sol.x + C.b1 * sol.y - C.c1,
                C.a2 * sol.x + C.b2 * sol.y - C.c2];
      }
    });
  }

  function renderSysLines(wrap, graph, page) {
    /* 设计模板通用版：lines:[{k,b,label},{k,b,label}]，拖交点 → b 反写 */
    var Ls = (graph.lines || []).map(function (L) {
      return { k: +L.k || 0, b: +L.b || 0, label: L.label || "" };
    });
    while (Ls.length < 2) Ls.push({ k: 0, b: 0, label: "" });

    var readout = el("div", "ix-expr-line", "");
    wrap.appendChild(readout);
    var VW = 420, VH = 300;
    var svg = svgEl("svg", { viewBox: "0 0 " + VW + " " + VH, "class": "ix-svg", role: "img" });
    svg.style.maxWidth = "100%";
    wrap.appendChild(svg);
    var gL = svgEl("g", {}); svg.appendChild(gL);
    var gM = svgEl("g", {}); svg.appendChild(gM);
    var fr = null, S = null;

    function compute() {
      var k1 = Ls[0].k, b1 = Ls[0].b, k2 = Ls[1].k, b2 = Ls[1].b;
      if (Math.abs(k1 - k2) <= 1e-12) { S = null; return Math.abs(b1 - b2) <= 1e-9 ? "coincident" : "parallel"; }
      var x = (b2 - b1) / (k1 - k2);
      S = { x: x, y: k1 * x + b1 };
      return null;
    }
    function refresh() {
      var deg = compute();
      var lo = Infinity, hi = -Infinity;
      Ls.forEach(function (L) {
        for (var i = 0; i <= 40; i++) {
          var x = -8 + 16 * i / 40, y = L.k * x + L.b;
          if (y < lo) lo = y; if (y > hi) hi = y;
        }
      });
      if (S) { lo = Math.min(lo, S.y); hi = Math.max(hi, S.y); }
      var pad = (hi - lo) * 0.2 || 2;
      fr = makeFrame(VW, VH, -8, 8, lo - pad, hi + pad);
      while (gL.firstChild) gL.removeChild(gL.firstChild);
      while (gM.firstChild) gM.removeChild(gM.firstChild);
      drawAxes(gL, fr, false);
      var cols = ["var(--geo-known)", "var(--geo-corr-a)"];
      Ls.forEach(function (L, idx) {
        var d = "";
        for (var i = 0; i <= 100; i++) {
          var x = fr.xMin + (fr.xMax - fr.xMin) * i / 100;
          d += (i ? "L" : "M") + fr.X(x).toFixed(1) + "," + fr.Y(L.k * x + L.b).toFixed(1) + " ";
        }
        gL.appendChild(svgEl("path", {
          d: d, fill: "none", stroke: cols[idx], "stroke-width": 2.5
        }));
      });
      if (deg) {
        readout.innerHTML = '<span class="ix-hint">' +
          (deg === "parallel" ? "两直线平行：方程组无解" : "两直线重合：无数组解") + "</span>";
        return;
      }
      /* 交点标记（可拖 → b 反写） */
      var mk = svgEl("g", {});
      var dot = svgEl("circle", {
        cx: fr.X(S.x), cy: fr.Y(S.y), r: 8,
        fill: "var(--geo-target)", stroke: "#fff", "stroke-width": 1.5,
        style: "cursor:grab"
      });
      var padE = svgEl("circle", {
        cx: fr.X(S.x), cy: fr.Y(S.y), r: 22, fill: "transparent",
        style: "cursor:grab;pointer-events:all"
      });
      mk.appendChild(dot); mk.appendChild(padE); gM.appendChild(mk);
      var drag = false;
      padE.addEventListener("pointerdown", function (ev) {
        drag = true;
        try { padE.setPointerCapture(ev.pointerId); } catch (e) {}
        ev.preventDefault();
      });
      padE.addEventListener("pointermove", function (ev) {
        if (!drag) return;
        var sp = svgPoint(svg, ev);
        var lx = fr.iX(sp.x), ly = fr.iY(sp.y);
        /* §2.3：b1'=y−k1x，b2'=y−k2x（k 不变） */
        Ls[0].b = ly - Ls[0].k * lx;
        Ls[1].b = ly - Ls[1].k * lx;
        refresh();
      });
      padE.addEventListener("pointerup", function () { drag = false; });
      padE.addEventListener("pointercancel", function () { drag = false; });
      readout.innerHTML = '<span class="ix-expr">解 = 交点</span>' +
        '<span class="ix-eq"> = </span><span class="ix-val">(' +
        fmt2(S.x) + ", " + fmt2(S.y) + ")</span>";
    }
    refresh();
    regInst(page, "sys", {
      lines: function () { return JSON.parse(JSON.stringify(Ls)); },
      solution: function () { return S ? { x: S.x, y: S.y } : null; },
      dragSysTo: function (x, y) {
        Ls[0].b = y - Ls[0].k * x;
        Ls[1].b = y - Ls[1].k * x;
        refresh();
      }
    });
  }

  /* ================= §C ineq-shade-lab =================
   * 不等式/不等式组的解集在数轴上高亮。
   * sets[].ineq 由黄队逐页签字（waveA-design.md §2.5），脚本不许猜。 */

  function renderIneqShadeLab(container, params, page) {
    params = params || {};
    var src = params.source || {};
    var axisVar = src.label || "x";
    var sMin = Number(src.min), sMax = Number(src.max);
    var sStep = Number(src.step) || 1;
    var sInit = (src.initial !== undefined && src.initial !== null && isFinite(+src.initial))
      ? +src.initial : (sMin + sMax) / 2;
    var mode = params.mode || "single";
    var sets = params.sets || [];
    var showProbe = params.showProbe !== false;
    /* param-sweep：轴是 x，source 是参数 */
    var isParam = (mode === "param-sweep");
    var axVar = isParam ? "x" : axisVar;
    var paramVar = isParam ? axisVar : null;
    var axMin, axMax;
    if (isParam && params.xAxis) {
      axMin = +params.xAxis.min; axMax = +params.xAxis.max;
    } else { axMin = sMin; axMax = sMax; }
    if (!(axMin < axMax) || !(sMin < sMax) || !sets.length) {
      container.appendChild(el("div", "ix-stub", "参数错误：ineq-shade-lab 需要 source 与 sets"));
      return;
    }

    var wrap = el("div", "ix-eqbind ix-ineq");
    /* —— source 滑块 —— */
    var row = el("div", "ix-slider-row");
    var labSpan = el("span", "ix-slider-label", MX(axisVar) + " = ");
    var valLab = el("span", "ix-slider-val", "");
    var input = document.createElement("input");
    input.type = "range";
    input.min = sMin; input.max = sMax; input.step = sStep;
    input.className = "ix-range";
    input.setAttribute("aria-label", axisVar);
    row.appendChild(labSpan); row.appendChild(input); row.appendChild(valLab);
    wrap.appendChild(row);
    if (isParam) {
      var pn = el("div", "ix-hint",
        "拖动参数 " + axisVar + "，看解集怎么变；再拖数轴上的动点验算");
      pn.style.cssText = "font-size:.8rem;color:var(--m-ink-soft);";
      wrap.appendChild(pn);
    }

    /* —— 解集计算 —— */
    var sVal = sInit;      /* source 值（param-sweep 时为参数 a） */
    var xProbe = (axMin + axMax) / 2;  /* param-sweep 时的 x 动点 */
    function extraPairs() {
      return isParam ? [[paramVar, sVal]] : [];
    }
    function solveAll() {
      return sets.map(function (st) {
        return {
          set: st,
          sol: solveIneq(st.expr, st.ineq, axVar, extraPairs(), axMin, axMax)
        };
      });
    }
    var solved = solveAll();

    /* —— 数轴行 —— */
    var VW = 420, ROWH = 66;
    var nRows = solved.length + (mode === "system" ? 1 : 0);
    var svg = svgEl("svg", {
      viewBox: "0 0 " + VW + " " + (ROWH * nRows + 8),
      "class": "ix-svg", role: "img"
    });
    svg.style.maxWidth = "100%";
    wrap.appendChild(svg);

    var probes = [];  /* 每行一个探针，同值联动 */
    function axisValue() { return isParam ? xProbe : sVal; }

    function drawRow(g, yTop, sol, rowLabel, isCommon) {
      var fr = makeFrame(VW, ROWH, axMin, axMax, -1, 1,
        { l: 46, r: 16, t: 6, b: 6 });
      var yA = yTop + 40;  /* 轴线 y（viewBox 坐标） */
      /* 标签 */
      var lb = svgEl("text", {
        x: 4, y: yTop + 24, "font-size": "12.5", fill: "var(--geo-text)"
      });
      lb.textContent = rowLabel.length > 14 ? rowLabel.slice(0, 14) + "…" : rowLabel;
      g.appendChild(lb);
      /* 轴线 */
      g.appendChild(svgEl("line", {
        x1: fr.X(axMin), y1: yA, x2: fr.X(axMax), y2: yA,
        stroke: "var(--geo-line)", "stroke-width": 2
      }));
      /* 刻度 */
      var tk = niceTick(axMax - axMin);
      for (var t = Math.ceil(axMin / tk) * tk; t <= axMax + 1e-9; t += tk) {
        g.appendChild(svgEl("line", {
          x1: fr.X(t), y1: yA - 4, x2: fr.X(t), y2: yA + 4,
          stroke: "var(--geo-line)", "stroke-width": 1
        }));
        var tx = svgEl("text", {
          x: fr.X(t), y: yA + 17, "text-anchor": "middle",
          "font-size": "12.5", fill: "var(--geo-text)"
        });
        tx.textContent = fmt(t);
        g.appendChild(tx);
      }
      /* 高亮解集 */
      var bandY = yA - 22;
      sol.segs.forEach(function (sg) {
        var x1 = Math.max(axMin, sg.lo), x2 = Math.min(axMax, sg.hi);
        var r = svgEl("rect", {
          x: fr.X(x1), y: bandY, width: Math.max(1, fr.X(x2) - fr.X(x1)),
          height: 10, rx: 5,
          fill: isCommon ? "var(--geo-corr-c)" : "var(--geo-highlight)",
          opacity: "0.75"
        });
        g.appendChild(r);
        /* 延伸箭头 */
        if (sg.lo <= axMin + 1e-9) {
          var a1 = svgEl("path", {
            d: "M" + (fr.X(axMin) + 2) + "," + (bandY + 5) + " l-9,-4 v8 Z",
            fill: isCommon ? "var(--geo-corr-c)" : "var(--geo-highlight)"
          });
          g.appendChild(a1);
        }
        if (sg.hi >= axMax - 1e-9) {
          var a2 = svgEl("path", {
            d: "M" + (fr.X(axMax) - 2) + "," + (bandY + 5) + " l9,-4 v8 Z",
            fill: isCommon ? "var(--geo-corr-c)" : "var(--geo-highlight)"
          });
          g.appendChild(a2);
        }
      });
      /* 边界点：空心/实心 */
      sol.roots.forEach(function (rt) {
        if (rt < axMin - 1e-9 || rt > axMax + 1e-9) return;
        var seg = sol.segs.filter(function (sg) {
          return Math.abs(sg.lo - rt) < 1e-7 || Math.abs(sg.hi - rt) < 1e-7;
        })[0];
        var open = true;
        if (seg) {
          open = Math.abs(seg.lo - rt) < 1e-7 ? seg.loOpen : seg.hiOpen;
        }
        g.appendChild(svgEl("circle", {
          cx: fr.X(rt), cy: bandY + 5, r: 6,
          fill: open ? "var(--geo-bg)" : "var(--geo-target)",
          stroke: "var(--geo-target)", "stroke-width": 2
        }));
      });
      /* 探针 */
      if (showProbe) {
        var pr = svgEl("g", { "class": "eqb-probe" });
        var dot = svgEl("circle", {
          r: 7, fill: "var(--geo-known)", stroke: "#fff", "stroke-width": 1.5,
          style: "cursor:grab"
        });
        var pad = svgEl("circle", {
          r: 22, fill: "transparent", style: "cursor:grab;pointer-events:all"
        });
        pr.appendChild(dot); pr.appendChild(pad);
        g.appendChild(pr);
        var drag = false;
        pad.addEventListener("pointerdown", function (ev) {
          drag = true;
          try { pad.setPointerCapture(ev.pointerId); } catch (e) {}
          ev.preventDefault();
        });
        pad.addEventListener("pointermove", function (ev) {
          if (!drag) return;
          var sp = svgPoint(svg, ev);
          setAxis(snapAxis(fr.iX(sp.x)));
        });
        pad.addEventListener("pointerup", function () { drag = false; });
        pad.addEventListener("pointercancel", function () { drag = false; });
        probes.push({ root: pr, fr: fr, yA: yA });
      }
      return fr;
    }

    function snapAxis(v) {
      v = Math.min(axMax, Math.max(axMin, v));
      if (!isParam) {  /* 轴=source：按 source step 吸附 */
        var n = Math.round((v - sMin) / sStep);
        v = Math.min(sMax, Math.max(sMin, sMin + n * sStep));
      }
      return v;
    }
    function setAxis(v) {
      if (isParam) xProbe = v; else { sVal = v; input.value = v; }
      refresh();
    }
    function layoutProbes() {
      probes.forEach(function (p) {
        p.root.setAttribute("transform",
          "translate(" + p.fr.X(axisValue()).toFixed(1) + "," + p.yA.toFixed(1) + ")");
      });
    }

    /* 读数行：每段 expr 符号 */
    var readDiv = el("div", "ix-expr-line", "");
    wrap.appendChild(readDiv);
    var status = el("div", "ix-status", "");
    wrap.appendChild(status);
    container.appendChild(wrap);

    function holds(st, v) {
      var e = evalVars(st.expr, [[axVar, v]].concat(extraPairs()));
      if (!isFinite(e)) return null;
      if (st.ineq === ">") return e > 0;
      if (st.ineq === "<") return e < 0;
      if (st.ineq === ">=") return e >= 0;
      return e <= 0;
    }
    function refresh() {
      solved = solveAll();
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      probes = [];
      solved.forEach(function (s, i) {
        var g = svgEl("g", {});
        svg.appendChild(g);
        drawRow(g, 8 + i * ROWH, s.sol, s.set.label || ("条件" + (i + 1)), false);
      });
      if (mode === "system") {
        var common = intersectSegs(solved.map(function (s) { return s.sol.segs; }));
        var g2 = svgEl("g", {});
        svg.appendChild(g2);
        drawRow(g2, 8 + solved.length * ROWH,
          { roots: [], segs: common }, "公共解集", true);
        var cs = common.map(function (sg) {
          return (sg.loOpen ? "(" : "[") + fmt(sg.lo) + ", " + fmt(sg.hi) + (sg.hiOpen ? ")" : "]");
        }).join(" ∪ ") || "无解";
        status.innerHTML = '<span class="ix-success">公共解集：' + esc(cs) + "</span>";
      } else {
        status.innerHTML = "";
      }
      layoutProbes();
      /* 读数 */
      var v = axisValue();
      var parts = solved.map(function (s) {
        var e = evalVars(s.set.expr, [[axVar, v]].concat(extraPairs()));
        var h = holds(s.set, v);
        return esc(s.set.label || s.set.expr) + " = " + fmt(e) +
          (h == null ? "" : (h ? " ✅" : " ❌"));
      });
      readDiv.innerHTML = '<span class="ix-expr">' + MX(axVar) + "</span>" +
        '<span class="ix-eq"> = </span><span class="ix-val">' + fmt(v) + "</span>" +
        '<div class="ix-hint" style="font-size:.8rem;color:var(--m-ink-soft);">' +
        parts.join("　") + "</div>";
      valLab.textContent = fmt(sVal);
      if (isParam) input.value = sVal;
    }
    input.addEventListener("input", function () {
      sVal = Number(input.value);
      if (!isParam) { /* 轴=source 时联动 */ }
      refresh();
    });
    /* compare 一致性标注 / param 分段说明 */
    if (params.note) {
      var noteDiv = el("div", "ix-hint", esc(params.note));
      noteDiv.style.cssText =
        "font-size:.85rem;margin-top:4px;padding:4px 8px;" +
        "background:var(--m-accent-soft);border-radius:6px;";
      wrap.appendChild(noteDiv);
    }
    input.value = sInit;
    refresh();

    regInst(page, "ineq", {
      setSource: function (v) {
        sVal = Math.min(sMax, Math.max(sMin, Number(v)));
        input.value = sVal;
        refresh();
      },
      sourceValue: function () { return sVal; },
      setAxis: function (v) { setAxis(v); },
      axisValue: function () { return axisValue(); },
      solutions: function () {
        return solved.map(function (s) {
          return { label: s.set.label, segs: JSON.parse(JSON.stringify(s.sol.segs)) };
        });
      },
      holdsAt: function (i, v) { return holds(sets[i], v); }
    });
  }

  /* ================= §D eq-graph =================
   * 批次二 R1 9 页的辅交互：保留天平主交互，追加数轴解点联动。
   * 实为 eq-graph-lab 的 numberline 预设（紧凑版）。 */
  function renderEqGraph(container, params, page) {
    params = params || {};
    renderEqGraphLab(container, {
      min: params.min, max: params.max,
      step: params.step || 1,
      label: params.label || "x",
      expr: params.expr,
      target: params.target,
      targetLabel: params.targetLabel,
      initial: params.initial,
      guide: params.caption || "天平上解出的 x，就落在数轴的这个位置",
      graph: { kind: "numberline" }
    }, page);
  }

  /* ================= §E sys-lab =================
   * ch05x 代数页通用小件：多滑块 + 派生变量 + 读数行（各带 target 命中）
   * + 可选 point 轨迹视图 + 可选 combine 按钮 + 可选 guard。
   * params: {
   *   sliders:[{label,min,max,step,initial}],
   *   vars:{name:"expr"},            // 派生变量（按 sliders 之后求值）
   *   readouts:[{expr,label,target,targetLabel}],
   *   hitAll:"…",                    // 全部命中时的总评语
   *   point:{xExpr,yExpr},           // 可选轨迹视图
   *   combine:{label,expr,result,note}, // 可选合成按钮（u2-l1-p1）
   *   guard:{when:"expr",message}    // 可选禁用条件（u3-l1-p1 b=0）
   * } */
  function renderSysLab(container, params, page) {
    params = params || {};
    var cfgs = params.sliders || [{ label: "x", min: -10, max: 10, step: 1 }];
    var vars = params.vars || {};
    var readouts = params.readouts || [];

    var wrap = el("div", "ix-eqbind ix-syslab");
    var state = {};
    cfgs.forEach(function (c) {
      state[c.label] = (c.initial !== undefined && isFinite(+c.initial))
        ? +c.initial : (+c.min);
    });

    /* 滑块区 */
    var sliderObjs = [];
    cfgs.forEach(function (c) {
      var row = el("div", "ix-slider-row");
      var lab = el("span", "ix-slider-label", MX(c.label) + " = ");
      var vv = el("span", "ix-slider-val", "");
      var inp = document.createElement("input");
      inp.type = "range";
      inp.min = c.min; inp.max = c.max; inp.step = c.step || 1;
      inp.value = state[c.label];
      inp.className = "ix-range";
      inp.setAttribute("aria-label", c.label);
      row.appendChild(lab); row.appendChild(inp); row.appendChild(vv);
      wrap.appendChild(row);
      sliderObjs.push({ cfg: c, input: inp, val: vv });
      inp.addEventListener("input", function () {
        state[c.label] = Number(inp.value);
        refresh();
      });
    });

    /* 读数区 */
    var rb = el("div", "ix-dash-readouts", "");
    rb.style.cssText = "display:flex;flex-wrap:wrap;gap:4px 24px;padding:6px 0;";
    var roSpans = [];
    readouts.forEach(function (r) {
      var line = el("div", "ix-expr-line",
        '<span class="ix-expr">' + MX(r.label || r.expr || "") + "</span>" +
        '<span class="ix-eq"> = </span><span class="ix-val">0</span>');
      rb.appendChild(line);
      roSpans.push(line.querySelector(".ix-val"));
    });
    wrap.appendChild(rb);

    /* point 轨迹视图 */
    var svg = null, dotEl = null, frP = null;
    if (params.point) {
      var VW = 420, VH = 260;
      svg = svgEl("svg", { viewBox: "0 0 " + VW + " " + VH, "class": "ix-svg", role: "img" });
      svg.style.maxWidth = "100%";
      wrap.appendChild(svg);
    }

    /* combine 按钮 */
    var combineLine = null;
    if (params.combine) {
      var cb = el("button", "ix-btn", esc(params.combine.label || "合成"));
      cb.type = "button";
      cb.style.cssText = "margin:6px 0;";
      combineLine = el("div", "ix-expr-line", "");
      combineLine.style.display = "none";
      cb.addEventListener("click", function () {
        var vs = allVars();
        var r = evalVars(params.combine.expr, vs);
        combineLine.style.display = "";
        combineLine.innerHTML = '<span class="ix-expr">' + MX(params.combine.expr) + "</span>" +
          '<span class="ix-eq"> = </span><span class="ix-val">' + fmt(r) + "</span>" +
          (params.combine.note ? ' <span class="ix-success">' + esc(params.combine.note) + "</span>" : "");
      });
      wrap.appendChild(cb);
      wrap.appendChild(combineLine);
    }

    var status = el("div", "ix-status", "");
    wrap.appendChild(status);
    container.appendChild(wrap);

    function allVars() {
      var ps = [];
      Object.keys(state).forEach(function (k) { ps.push([k, state[k]]); });
      /* 派生变量：按 vars 定义顺序求值（可引用前面的派生量） */
      Object.keys(vars).forEach(function (k) {
        var v = evalVars(vars[k], ps);
        ps.push([k, v]);
      });
      return ps;
    }
    function guarded() {
      if (!params.guard) return false;
      return !!evalVars(params.guard.when, allVars());
    }

    var hitState = [];
    function refresh() {
      sliderObjs.forEach(function (s) { s.val.textContent = fmt(state[s.cfg.label]); });
      var vs = allVars();
      var gd = guarded();
      var allHit = true, anyTarget = false;
      readouts.forEach(function (r, i) {
        var v = gd ? NaN : evalVars(r.expr, vs);
        roSpans[i].textContent = fmt(v);
        var hasT = (r.target !== undefined && r.target !== null);
        if (hasT) {
          anyTarget = true;
          var hit = Math.abs(v - r.target) <= 1e-9 * Math.max(1, Math.abs(r.target));
          hitState[i] = hit;
          if (!hit) allHit = false;
          roSpans[i].style.color = hit ? "var(--geo-target)" : "";
          roSpans[i].style.fontWeight = hit ? "bold" : "";
        }
      });
      if (params.guard && gd) {
        status.innerHTML = '<span class="ix-hint">' + esc(params.guard.message) + "</span>";
      } else if (anyTarget && allHit && params.hitAll) {
        status.innerHTML = '<span class="ix-success">' + esc(params.hitAll) + "</span>";
        if (!refresh._hit) { refresh._hit = true; tickSound(); hapticTick(); }
      } else if (anyTarget && params.hitAll) {
        refresh._hit = false;
        status.innerHTML = "";
      } else {
        status.innerHTML = "";
      }
      drawPoint(vs, gd);
    }

    function drawPoint(vs, gd) {
      if (!svg) return;
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      if (gd) return;
      var pv = params.point;
      /* 量程：全滑块范围采样 */
      var x0 = Infinity, x1 = -Infinity, y0 = Infinity, y1 = -Infinity;
      var lead = cfgs[0];
      for (var i = 0; i <= 60; i++) {
        var t = (+lead.min) + ((+lead.max) - (+lead.min)) * i / 60;
        var ps = [[lead.label, t]];
        Object.keys(state).forEach(function (k) {
          if (k !== lead.label) ps.push([k, state[k]]);
        });
        Object.keys(vars).forEach(function (k) { ps.push([k, evalVars(vars[k], ps)]); });
        var px = evalVars(pv.xExpr, ps), py = evalVars(pv.yExpr, ps);
        if (isFinite(px) && isFinite(py)) {
          if (px < x0) x0 = px; if (px > x1) x1 = px;
          if (py < y0) y0 = py; if (py > y1) y1 = py;
        }
      }
      if (!isFinite(x0)) { x0 = -10; x1 = 10; y0 = -10; y1 = 10; }
      var xp = (x1 - x0) * 0.1 || 1, yp = (y1 - y0) * 0.15 || 1;
      frP = makeFrame(420, 260, x0 - xp, x1 + xp, y0 - yp, y1 + yp);
      drawAxes(svg, frP, false);
      /* 轨迹（淡） */
      var d = "";
      for (var j = 0; j <= 60; j++) {
        var t2 = (+lead.min) + ((+lead.max) - (+lead.min)) * j / 60;
        var ps2 = [[lead.label, t2]];
        Object.keys(state).forEach(function (k) {
          if (k !== lead.label) ps2.push([k, state[k]]);
        });
        Object.keys(vars).forEach(function (k) { ps2.push([k, evalVars(vars[k], ps2)]); });
        var qx = evalVars(pv.xExpr, ps2), qy = evalVars(pv.yExpr, ps2);
        if (!isFinite(qx) || !isFinite(qy)) continue;
        d += (d ? "L" : "M") + frP.X(qx).toFixed(1) + "," + frP.Y(qy).toFixed(1) + " ";
      }
      if (d) svg.appendChild(svgEl("path", {
        d: d, fill: "none", stroke: "var(--geo-known)",
        "stroke-width": 2, opacity: "0.35"
      }));
      /* 当前点 */
      var cx = evalVars(pv.xExpr, vs), cy = evalVars(pv.yExpr, vs);
      if (isFinite(cx) && isFinite(cy)) {
        dotEl = svgEl("circle", {
          cx: frP.X(cx), cy: frP.Y(cy), r: 8,
          fill: "var(--geo-target)", stroke: "#fff", "stroke-width": 1.5
        });
        svg.appendChild(dotEl);
        var cl = svgEl("text", {
          x: frP.X(cx) + 12, y: frP.Y(cy) - 8,
          "font-size": "12.5", fill: "var(--geo-text)"
        });
        cl.textContent = "(" + fmt(cx) + ", " + fmt(cy) + ")";
        svg.appendChild(cl);
      }
    }

    refresh();
    regInst(page, "syslab", {
      setSlider: function (nm, v) {
        if (state[nm] === undefined) return;
        state[nm] = Number(v);
        sliderObjs.forEach(function (s) {
          if (s.cfg.label === nm) s.input.value = v;
        });
        refresh();
      },
      sliderValue: function (nm) { return state[nm]; },
      readouts: function () {
        var vs = allVars();
        return readouts.map(function (r) { return evalVars(r.expr, vs); });
      },
      pointXY: function () {
        if (!params.point) return null;
        var vs = allVars();
        return [evalVars(params.point.xExpr, vs), evalVars(params.point.yExpr, vs)];
      }
    });
  }

  /* ================= §F sys-steps =================
   * ch05x 文本分步播放（代入/加减步骤）：steps:[{title, html}] */
  function renderSysSteps(container, params, page) {
    params = params || {};
    var steps = params.steps || [];
    if (!steps.length) {
      container.appendChild(el("div", "ix-stub", "参数错误：sys-steps 需要 steps"));
      return;
    }
    var wrap = el("div", "ix-eqbind ix-steps");
    var card = el("div", "ix-step-card", "");
    card.style.cssText =
      "border:1px solid var(--m-line);border-radius:8px;padding:10px 12px;" +
      "min-height:88px;font-size:.92rem;line-height:1.7;";
    var ind = el("div", "ix-hint", "");
    ind.style.cssText = "font-size:.8rem;color:var(--m-ink-soft);margin:4px 0;";
    var ctrl = el("div", "ix-step-ctrl", "");
    ctrl.style.cssText = "display:flex;gap:8px;margin-top:6px;";
    function mkBtn(t) {
      var b = el("button", "ix-btn", t);
      b.type = "button";
      ctrl.appendChild(b);
      return b;
    }
    var bPrev = mkBtn("◀ 上一步"), bPlay = mkBtn("⏯ 播放"), bNext = mkBtn("下一步 ▶"),
        bRe = mkBtn("↺ 重来");
    wrap.appendChild(card); wrap.appendChild(ind); wrap.appendChild(ctrl);
    container.appendChild(wrap);

    var idx = 0, timer = null;
    var iv = Math.max(800, Math.min(5000, +params.interval || 1800));
    function show(i) {
      idx = Math.min(steps.length - 1, Math.max(0, i));
      var s = steps[idx];
      card.innerHTML = (s.title ? "<b>" + esc(s.title) + "</b><br>" : "") + (s.html || "");
      ind.textContent = "第 " + (idx + 1) + " / " + steps.length + " 步";
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    bPrev.addEventListener("click", function () { stop(); show(idx - 1); });
    bNext.addEventListener("click", function () { stop(); show(idx + 1); });
    bRe.addEventListener("click", function () { stop(); show(0); });
    bPlay.addEventListener("click", function () {
      if (timer) { stop(); bPlay.textContent = "⏯ 播放"; return; }
      bPlay.textContent = "⏸ 暂停";
      timer = setInterval(function () {
        if (idx >= steps.length - 1) { stop(); bPlay.textContent = "⏯ 播放"; return; }
        show(idx + 1);
      }, iv);
    });
    show(0);
    regInst(page, "steps", {
      step: function () { return idx; },
      goto: function (i) { stop(); show(i); }
    });
  }

  /* ================= §G static-compare =================
   * ch05x-u3-l2-p1 小结：两栏静态对比（左代数法 / 右图像法）。 */
  function renderStaticCompare(container, params, page) {
    params = params || {};
    var L = params.left || {}, R = params.right || {};
    var wrap = el("div", "ix-compare", "");
    wrap.style.cssText = "display:flex;gap:12px;flex-wrap:wrap;";
    [[L, "左"], [R, "右"]].forEach(function (pair, i) {
      var cfg = pair[0];
      var col = el("div", "ix-compare-col", "");
      col.style.cssText = "flex:1 1 220px;min-width:0;border:1px solid var(--m-line);" +
        "border-radius:8px;padding:10px 12px;";
      var t = el("div", "ix-compare-title", esc(cfg.title || pair[1]));
      t.style.cssText = "font-weight:bold;margin-bottom:6px;";
      col.appendChild(t);
      var body = el("div", "", cfg.html || "");
      body.style.cssText = "font-size:.88rem;line-height:1.75;";
      col.appendChild(body);
      wrap.appendChild(col);
    });
    container.appendChild(wrap);
    regInst(page, "static", { ok: function () { return true; } });
  }

  /* ================= §H 注册 ================= */
  function registerAll() {
    if (!window.MATH_INTERACTIONS) return;
    window.MATH_INTERACTIONS.register("eq-graph-lab", renderEqGraphLab);
    window.MATH_INTERACTIONS.register("ineq-shade-lab", renderIneqShadeLab);
    window.MATH_INTERACTIONS.register("eq-graph", renderEqGraph);
    window.MATH_INTERACTIONS.register("sys-lab", renderSysLab);
    window.MATH_INTERACTIONS.register("sys-steps", renderSysSteps);
    window.MATH_INTERACTIONS.register("static-compare", renderStaticCompare);
  }
  registerAll();

  /* 测试钩子（仅供验证脚本；不渲染 UI） */
  window.__eqbind = {
    _inst: instances,
    _get: function (pageId, key) { return instances[pageId + "::" + key] || null; },
    setX: function (pageId, v) {
      var o = this._get(pageId, "lab"); if (o) o.setX(v);
    },
    sliderValue: function (pageId) {
      var o = this._get(pageId, "lab"); return o ? o.sliderValue() : NaN;
    },
    readout: function (pageId) {
      var o = this._get(pageId, "lab"); return o ? o.readout() : NaN;
    },
    probeCount: function (pageId) {
      var o = this._get(pageId, "lab"); return o ? o.probeCount() : 0;
    },
    probeX: function (pageId, i) {
      var o = this._get(pageId, "lab"); return o ? o.probeX(i) : NaN;
    },
    dragProbeTo: function (pageId, i, x) {
      var o = this._get(pageId, "lab"); if (o) o.dragProbeTo(i, x);
    },
    solutionMarks: function (pageId) {
      var o = this._get(pageId, "lab"); return o ? o.solutionMarks() : [];
    },
    /* ineq */
    ineqSetSource: function (pageId, v) {
      var o = this._get(pageId, "ineq"); if (o) o.setSource(v);
    },
    ineqSolutions: function (pageId) {
      var o = this._get(pageId, "ineq"); return o ? o.solutions() : [];
    },
    ineqHoldsAt: function (pageId, i, v) {
      var o = this._get(pageId, "ineq"); return o ? o.holdsAt(i, v) : null;
    },
    /* system2x2 */
    sysSolution: function (pageId) {
      var o = this._get(pageId, "sys"); return o ? o.solution() : null;
    },
    sysSetCoeff: function (pageId, nm, v) {
      var o = this._get(pageId, "sys"); if (o && o.setCoeff) o.setCoeff(nm, v);
    },
    sysDragTo: function (pageId, x, y) {
      var o = this._get(pageId, "sys"); if (o && o.dragSysTo) o.dragSysTo(x, y);
    },
    sysDegenerate: function (pageId) {
      var o = this._get(pageId, "sys"); return o ? o.degenerate() : null;
    },
    sysResiduals: function (pageId) {
      var o = this._get(pageId, "sys"); return o ? o.residuals() : null;
    },
    /* sys-lab */
    syslabSet: function (pageId, nm, v) {
      var o = this._get(pageId, "syslab"); if (o) o.setSlider(nm, v);
    },
    syslabReadouts: function (pageId) {
      var o = this._get(pageId, "syslab"); return o ? o.readouts() : [];
    },
    syslabPoint: function (pageId) {
      var o = this._get(pageId, "syslab"); return o ? o.pointXY() : null;
    }
  };
})();
