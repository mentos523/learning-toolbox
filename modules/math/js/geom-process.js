/* ============================================================
 * 学习工具箱 · 数学 · 波 A 几何过程化渲染器（geom-process.js）
 *
 * 自包含：不引用 interactions.js 闭包内任何函数。
 * 允许的全局：window.GEOM（几何 SVG 原语）、window.MathExpr、
 *             window.MATH_INTERACTIONS.register。
 * 注册类型：morph-toggle / complete-square-lab
 * 设计依据：~/workspace/math-rectify/waveA-design.md §1.3/1.4、§3
 * ============================================================ */
(function () {
  "use strict";

  /* ================= §A 基础套件 ================= */
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
  function svgEl(tag, attrs) {
    var e = document.createElementNS(SVGNS, tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    return e;
  }
  function MX(s) {
    try { if (window.MathExpr) return window.MathExpr.html(s); } catch (e) {}
    return esc(s);
  }
  function lerp(a, b, u) { return a + (b - a) * u; }
  function clamp01(u) { return Math.min(1, Math.max(0, u)); }
  function smoothstep(a, b, u) {
    var t = clamp01((u - a) / (b - a));
    return t * t * (3 - 2 * t);
  }
  function easeInOutCubic(t) {  /* 复刻 net-fold easeIO */
    t = clamp01(t);
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  }

  /* ================= §B tween 层 =================
   * （B 期 promotion 到 Eng.Tween 的原型；waveA-design.md §3.2） */
  function createTween(opts) {
    opts = opts || {};
    var durationMs = Math.max(50, +opts.durationMs || 1200);
    var onUpdate = opts.onUpdate || function () {};
    var onDone = opts.onDone || function () {};
    var rafId = 0, startT = 0, curU = 0, fromU = 0, toU = 1;
    var reduced = false;
    try {
      reduced = window.matchMedia &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    } catch (e) {}
    function paint(u) {
      curU = clamp01(u);
      onUpdate(curU);
    }
    function tick(now) {
      if (!startT) startT = now;
      var t = clamp01((now - startT) / durationMs);
      paint(fromU + (toU - fromU) * easeInOutCubic(t));
      if (t < 1) { rafId = requestAnimationFrame(tick); }
      else { rafId = 0; onDone(); }
    }
    return {
      start: function () {
        this.cancel();
        if (reduced) { paint(1); onDone(); return; }  /* YP-09 */
        fromU = curU; toU = 1; startT = 0;
        rafId = requestAnimationFrame(tick);
      },
      cancel: function () {
        if (rafId) { cancelAnimationFrame(rafId); rafId = 0; }
        startT = 0;
      },
      seek: function (u) { this.cancel(); paint(u); },
      replay: function () { this.cancel(); paint(0); this.start(); },
      u: function () { return curU; },
      setDuration: function (ms) { durationMs = Math.max(50, +ms || 1200); }
    };
  }

  /* ================= §C 形状绘制与补间 =================
   * 自实现 DSL 形状渲染（seg/poly/circle/arc/path/txt），语义对齐
   * interactions.js drawGeoShape；paint(u) 只更新 SVG 属性，不重建 DOM。 */
  function geoFrame(W, H) {
    /* 对齐 interactions.js geoFrame：100 逻辑单位正方形 plot */
    var mL = 44, mR = 44;
    H = H || 360;
    var sx = (W - mL - mR) / 100;
    var s = Math.min(sx, (H - 28) / 100);
    var plot = 100 * s;
    var ox = mL + ((W - mL - mR) - plot) / 2;
    var oy = 14 + ((H - 28) - plot) / 2;
    function X(x) { return ox + x / 100 * plot; }
    function Y(y) { return oy + (1 - y / 100) * plot; }
    function S(v) { return v / 100 * plot; }
    function iX(px) { return (px - ox) / plot * 100; }
    function iY(py) { return (1 - (py - oy) / plot) * 100; }
    return { X: X, Y: Y, S: S, iX: iX, iY: iY, W: W, H: H };
  }
  function polar(x, y, r, angDeg) {
    var a = angDeg * Math.PI / 180;
    return [x + r * Math.cos(a), y - r * Math.sin(a)];
  }
  function norm360(d) { d %= 360; return d < 0 ? d + 360 : d; }

  /* 创建形状元素（返回 {g, update(sh)}） */
  function createShape(svg, sh, fr) {
    var G = window.GEOM;
    var g = svgEl("g", { "class": "gp-shape" });
    svg.appendChild(g);
    var parts = {};  /* 具名子元素，供 update 用 */

    function P(p) { return [fr.X(p[0]), fr.Y(p[1])]; }
    function colOf(c) { return "var(--geo-" + (c || "line") + ")"; }

    if (sh.t === "seg") {
      var ln = svgEl("line", {
        stroke: colOf(sh.color), "stroke-width": sh.width || 2.5,
        "stroke-linecap": "round"
      });
      if (sh.dash) ln.setAttribute("stroke-dasharray", sh.dash);
      g.appendChild(ln); parts.ln = ln;
      if (sh.label) {
        var lt = svgEl("text", {
          "text-anchor": "middle", "font-size": "13.6",
          "font-weight": "bold", fill: colOf(sh.color)
        });
        lt.textContent = sh.label; g.appendChild(lt); parts.label = lt;
      }
    } else if (sh.t === "poly") {
      var pg = svgEl("polygon", {
        fill: sh.fill ? colOf(sh.fill) : "none",
        stroke: colOf(sh.color), "stroke-width": sh.width || 2.5,
        "stroke-linejoin": "round", "stroke-linecap": "round"
      });
      if (sh.fill) pg.setAttribute("fill-opacity", sh.opacity == null ? 0.22 : sh.opacity);
      if (sh.dash) pg.setAttribute("stroke-dasharray", sh.dash);
      g.appendChild(pg); parts.pg = pg;
    } else if (sh.t === "circle") {
      var c = svgEl("circle", {
        fill: sh.fill ? colOf(sh.fill) : "none",
        stroke: colOf(sh.color), "stroke-width": sh.width || 2.5
      });
      if (sh.fill) c.setAttribute("fill-opacity", sh.opacity == null ? 0.22 : sh.opacity);
      if (sh.dash) c.setAttribute("stroke-dasharray", sh.dash);
      g.appendChild(c); parts.c = c;
    } else if (sh.t === "arc") {
      var grp = +(sh.group || 1);
      parts.paths = [];
      for (var k = 0; k < Math.min(3, Math.max(1, grp)); k++) {
        var pa = svgEl("path", {
          fill: "none", stroke: colOf(sh.color || "corrAngle"),
          "stroke-width": sh.width || 2
        });
        g.appendChild(pa); parts.paths.push(pa);
      }
      parts.group = grp;
    } else if (sh.t === "pt") {
      var dot = svgEl("circle", {
        fill: colOf(sh.color || "line"), stroke: "#fff", "stroke-width": 1.5
      });
      g.appendChild(dot); parts.dot = dot;
      var pl = svgEl("text", {
        "text-anchor": "start", "font-size": "13.6",
        "font-weight": "bold", fill: colOf(sh.color || "line")
      });
      pl.textContent = sh.label || "";
      g.appendChild(pl); parts.plabel = pl;
    } else if (sh.t === "txt") {
      var tx = svgEl("text", {
        "text-anchor": sh.anchor || "middle",
        "font-size": sh.size || 15,
        fill: colOf(sh.color || "text")
      });
      if (sh.bold) tx.setAttribute("font-weight", "bold");
      /* 描边衬底，保证压在线条上仍可读（对齐 GEOM.label） */
      tx.setAttribute("paint-order", "stroke");
      tx.setAttribute("stroke", "var(--geo-bg)");
      tx.setAttribute("stroke-width", "3");
      /* math 表达式走 MX（foreignObject）；纯文本直接 textContent */
      if (sh.math) {
        var fo = svgEl("foreignObject", { width: 160, height: 30 });
        var div = document.createElement("div");
        div.setAttribute("style", "font-size:" + (sh.size || 15) + "px;" +
          "text-align:center;line-height:1.4;white-space:nowrap;" +
          (sh.bold ? "font-weight:bold;" : ""));
        div.innerHTML = MX(sh.text);
        fo.appendChild(div); g.appendChild(fo);
        parts.fo = fo;
      } else {
        tx.textContent = sh.text || "";
        g.appendChild(tx);
      }
      parts.tx = tx;
    } else {
      var st = svgEl("text", { x: 8, y: 20, "font-size": "12.5", fill: "var(--geo-aux)" });
      st.textContent = "不支持的形状: " + sh.t;
      g.appendChild(st);
    }

    function update(s2) {
      if (s2.t === "seg" && parts.ln) {
        var a = P(s2.a), b = P(s2.b);
        parts.ln.setAttribute("x1", a[0]); parts.ln.setAttribute("y1", a[1]);
        parts.ln.setAttribute("x2", b[0]); parts.ln.setAttribute("y2", b[1]);
        if (parts.label) {
          parts.label.setAttribute("x", (a[0] + b[0]) / 2);
          parts.label.setAttribute("y", (a[1] + b[1]) / 2 - 10);
        }
      } else if (s2.t === "poly" && parts.pg) {
        parts.pg.setAttribute("points", (s2.pts || []).map(function (p) {
          var q = P(p); return q[0].toFixed(1) + "," + q[1].toFixed(1);
        }).join(" "));
      } else if (s2.t === "circle" && parts.c) {
        var cc = P(s2.c);
        parts.c.setAttribute("cx", cc[0]); parts.c.setAttribute("cy", cc[1]);
        parts.c.setAttribute("r", fr.S(s2.r || 10));
      } else if (s2.t === "arc" && parts.paths) {
        var v = P(s2.v), rr = fr.S(s2.r || 12);
        var sweep = norm360(s2.a2 - s2.a1);
        if (sweep === 0) sweep = 360;
        var large = sweep > 180 ? 1 : 0;
        parts.paths.forEach(function (pa, ki) {
          var rrk = rr + ki * 5 * (fr.S(1) / (fr.S(1) || 1));
          var spt = polar(v[0], v[1], rrk, s2.a1);
          var ept = polar(v[0], v[1], rrk, s2.a1 + sweep);
          pa.setAttribute("d", "M" + spt[0].toFixed(1) + "," + spt[1].toFixed(1) +
            " A" + rrk.toFixed(1) + "," + rrk.toFixed(1) + " 0 " + large + " 0 " +
            ept[0].toFixed(1) + "," + ept[1].toFixed(1));
        });
      } else if (s2.t === "pt" && parts.dot) {
        var pp = P(s2.p);
        parts.dot.setAttribute("cx", pp[0]); parts.dot.setAttribute("cy", pp[1]);
        parts.dot.setAttribute("r", s2.r || 4.5);
        if (parts.plabel) {
          parts.plabel.setAttribute("x", pp[0] + 9);
          parts.plabel.setAttribute("y", pp[1] - 8);
          if (s2.label != null) parts.plabel.textContent = s2.label;
        }
      } else if (s2.t === "txt" && parts.tx) {
        var tp = P(s2.p);
        parts.tx.setAttribute("x", tp[0]); parts.tx.setAttribute("y", tp[1]);
        if (parts.fo) {
          parts.fo.setAttribute("x", tp[0] - 80);
          parts.fo.setAttribute("y", tp[1] - 15);
        }
      }
    }
    update(sh);
    return { g: g, update: update };
  }

  /* 形状补间：同 t 才插值，否则返回 null（调用方降级淡入淡出） */
  function lerpShape(s0, s1, u) {
    if (!s0 || !s1 || s0.t !== s1.t) return null;
    function lp(a, b) { return lerp(a, b, u); }
    function lpp(p, q) { return [lp(p[0], q[0]), lp(p[1], q[1])]; }
    var o = { t: s0.t };
    ["color", "width", "dash", "fill", "opacity", "group", "label",
     "text", "size", "bold", "anchor", "math"].forEach(function (k) {
      if (s0[k] !== undefined) o[k] = (u < 0.5 ? s0[k] : (s1[k] !== undefined ? s1[k] : s0[k]));
    });
    if (s0.t === "seg") { o.a = lpp(s0.a, s1.a); o.b = lpp(s0.b, s1.b); }
    else if (s0.t === "circle") { o.c = lpp(s0.c, s1.c); o.r = lp(s0.r || 10, s1.r || 10); }
    else if (s0.t === "arc") {
      o.v = lpp(s0.v, s1.v);
      o.a1 = lp(s0.a1 || 0, s1.a1 || 0); o.a2 = lp(s0.a2 == null ? 90 : s0.a2, s1.a2 == null ? 90 : s1.a2);
      o.r = lp(s0.r || 12, s1.r || 12);
    }
    else if (s0.t === "pt") { o.p = lpp(s0.p, s1.p); o.r = lp(s0.r || 4.5, s1.r || 4.5); }
    else if (s0.t === "txt") { o.p = lpp(s0.p, s1.p); }
    else if (s0.t === "poly") {
      if ((s0.pts || []).length !== (s1.pts || []).length) return null;
      o.pts = s0.pts.map(function (p, i) { return lpp(p, s1.pts[i]); });
    }
    return o;
  }

  /* 点绕轴线（2D）的反射 */
  function reflectAcrossLine(p, A, B) {
    var dx = B[0] - A[0], dy = B[1] - A[1];
    var len2 = dx * dx + dy * dy || 1;
    var t = ((p[0] - A[0]) * dx + (p[1] - A[1]) * dy) / len2;
    var hx = A[0] + t * dx, hy = A[1] + t * dy;
    return [2 * hx - p[0], 2 * hy - p[1]];
  }
  function rotatePt(p, c, angDeg) {
    /* 逻辑坐标（y-up）下的数学逆时针旋转 */
    var a = angDeg * Math.PI / 180;
    var dx = p[0] - c[0], dy = p[1] - c[1];
    return [c[0] + dx * Math.cos(a) - dy * Math.sin(a),
            c[1] + dx * Math.sin(a) + dy * Math.cos(a)];
  }
  function angleBetween(ax, ay, bx, by) {
    /* 从向量 a 到 b 的数学逆时针角（度，y-up） */
    var a1 = Math.atan2(ay, ax), a2 = Math.atan2(by, bx);
    var d = (a2 - a1) * 180 / Math.PI;
    return norm360(d);
  }

  /* ================= §D morph-toggle =================
   * compare-toggle 的过程化替代：保留两视图切换，增加连续 morph。
   * morph.kind: assemble | translate | fold | discrete-steps */

  var morphInstances = {};

  function renderMorphToggle(container, params, page) {
    params = params || {};
    var views = params.views;
    var morph = params.morph || {};
    if (!window.GEOM) {
      container.appendChild(el("div", "ix-stub", "几何原语库未加载（js/geom-primitives.js）"));
      return;
    }
    if (!Array.isArray(views) || views.length !== 2) {
      container.appendChild(el("div", "ix-stub", "参数错误：morph-toggle 需要 views（恰好 2 个视图）"));
      return;
    }
    if (!morph.kind) {
      container.appendChild(el("div", "ix-stub", "参数错误：morph.kind 缺失（验证阻断项）"));
      return;
    }
    var ctl = params.controls || {};
    var showPlay = ctl.play !== false, showScrub = ctl.scrub !== false,
        showStep = ctl.step !== false, showReplay = ctl.replay !== false;

    var wrap = el("div", "ix-geo-wrap ix-morph");
    wrap.setAttribute("tabindex", "0");
    wrap.setAttribute("aria-label", "几何过程演示");
    container.appendChild(wrap);

    /* —— 视图切换（保留 compare-toggle UI） —— */
    var seg = el("div", "ix-seg-row");
    var segCtl = el("div", "ix-seg");
    var vBtns = views.map(function (v, i) {
      var b = el("button", i === 0 ? "on" : "", esc(v.label || ("视图" + (i + 1))));
      b.type = "button";
      segCtl.appendChild(b);
      return b;
    });
    seg.appendChild(segCtl);
    wrap.appendChild(seg);

    /* —— 画布 —— */
    var fr = geoFrame(420, 360);
    var svg = window.GEOM.svg(420, 360, "ix-svg geo-svg");
    wrap.appendChild(svg);

    /* —— 读数行 —— */
    var readoutDiv = el("div", "ix-geo-readout", "");
    wrap.appendChild(readoutDiv);
    var cap = el("div", "ix-step-cap", "");
    wrap.appendChild(cap);

    /* —— 控制条 —— */
    var ctrlBar = el("div", "ix-morph-ctrl", "");
    ctrlBar.style.cssText = "display:flex;gap:8px;align-items:center;" +
      "flex-wrap:wrap;margin-top:6px;";
    var btnPlay = null, scrub = null, btnBack = null, btnFwd = null, btnReplay = null;
    if (showPlay) {
      btnPlay = el("button", "ix-btn", "▶ 播放 morph");
      btnPlay.type = "button";
      ctrlBar.appendChild(btnPlay);
    }
    if (showScrub) {
      scrub = document.createElement("input");
      scrub.type = "range";
      scrub.className = "ix-range";
      scrub.setAttribute("aria-label", "过程进度");
      scrub.style.flex = "1";
      ctrlBar.appendChild(scrub);
    }
    if (showStep) {
      btnBack = el("button", "ix-btn", "◀");
      btnBack.type = "button"; btnBack.title = "后退 10%";
      btnFwd = el("button", "ix-btn", "▶");
      btnFwd.type = "button"; btnFwd.title = "前进 10%";
      ctrlBar.appendChild(btnBack); ctrlBar.appendChild(btnFwd);
    }
    if (showReplay) {
      btnReplay = el("button", "ix-btn", "↺ 重播");
      btnReplay.type = "button";
      ctrlBar.appendChild(btnReplay);
    }
    wrap.appendChild(ctrlBar);

    var kind = morph.kind;
    var api = null;

    /* ============ 装配 / 平移 ============ */
    if (kind === "assemble" || kind === "translate") {
      api = buildLerpMorph(svg, fr, views, morph, readoutDiv, cap, vBtns);
    }
    /* ============ 对折 ============ */
    else if (kind === "fold") {
      api = buildFoldMorph(svg, fr, views, morph, readoutDiv, cap, vBtns);
    }
    /* ============ 离散档位 ============ */
    else if (kind === "discrete-steps") {
      api = buildDiscreteMorph(svg, fr, views, morph, readoutDiv, cap, vBtns,
        btnPlay, scrub, btnBack, btnFwd, btnReplay, wrap);
    } else {
      container.appendChild(el("div", "ix-stub", "参数错误：未知 morph.kind " + esc(kind)));
      return;
    }

    /* ============ 通用控制接线（连续型） ============ */
    if (api && kind !== "discrete-steps") {
      var tw = createTween({
        durationMs: morph.durationMs || 1200,
        onUpdate: function (u) { api.paint(u); syncUI(); },
        onDone: function () { syncUI(); }
      });
      // reduced-motion 时 tween.start() 直接 seek(1)（§B YP-09）
      if (btnPlay) btnPlay.addEventListener("click", function () {
        if (tw.u() >= 1) tw.seek(0);
        tw.start();
        btnPlay.textContent = "⏸ 暂停";
        var chk = setInterval(function () {
          if (tw.u() >= 1) { btnPlay.textContent = "▶ 播放 morph"; clearInterval(chk); }
        }, 200);
      });
      if (scrub) {
        scrub.min = 0; scrub.max = 1000; scrub.value = 0;
        scrub.addEventListener("input", function () {
          tw.cancel();
          api.paint(scrub.value / 1000); syncUI();
          if (btnPlay) btnPlay.textContent = "▶ 播放 morph";
        });
      }
      if (btnBack) btnBack.addEventListener("click", function () {
        tw.cancel(); api.seek(api.u() - 0.1); syncUI();
      });
      if (btnFwd) btnFwd.addEventListener("click", function () {
        tw.cancel(); api.seek(api.u() + 0.1); syncUI();
      });
      if (btnReplay) btnReplay.addEventListener("click", function () {
        tw.replay(); syncUI();
      });
      vBtns[0].addEventListener("click", function () { tw.cancel(); api.seek(0); syncUI(); });
      vBtns[1].addEventListener("click", function () { tw.cancel(); api.seek(1); syncUI(); });
      /* 键盘（与 Eng.StepPlayer 口径一致）；
       * 返工 F-04：←/→ 被 morph 消费后 stopPropagation，不再冒泡到 math.js 全局翻页 */
      wrap.addEventListener("keydown", function (ev) {
        if (ev.key === "ArrowLeft") { tw.cancel(); api.seek(api.u() - 0.1); syncUI(); ev.preventDefault(); ev.stopPropagation(); }
        else if (ev.key === "ArrowRight") { tw.cancel(); api.seek(api.u() + 0.1); syncUI(); ev.preventDefault(); ev.stopPropagation(); }
        else if (ev.key === " ") { if (btnPlay) btnPlay.click(); ev.preventDefault(); }
        else if (ev.key === "r" || ev.key === "R") { tw.replay(); syncUI(); }
      });
      function syncUI() {
        var u = api.u();
        if (scrub && document.activeElement !== scrub) scrub.value = Math.round(u * 1000);
        vBtns.forEach(function (b, k) {
          b.classList.toggle("on", (k === 0 && u < 0.5) || (k === 1 && u >= 0.5));
        });
        cap.textContent = u < 0.5 ? (views[0].caption || "") : (views[1].caption || "");
      }
      api._tween = tw;
      api._syncUI = syncUI;
      api.paint(0); syncUI();
    }

    if (page && page.id) morphInstances[page.id] = api;
  }

  /* —— 装配 / 平移：pairs 逐点 lerp，未配对按 u=0.5 淡入淡出 —— */
  function buildLerpMorph(svg, fr, views, morph, readoutDiv, cap, vBtns) {
    var pairs = morph.pairs || [];
    var v0 = views[0].shapes || [], v1 = views[1].shapes || [];
    var used0 = {}, used1 = {};
    var pairObjs = [];
    pairs.forEach(function (pr, pi) {
      var s0 = v0[pr[0]], s1 = v1[pr[1]];
      used0[pr[0]] = true; used1[pr[1]] = true;
      if (!s0 || !s1 || s0.t !== s1.t) {
        if (window.console) console.warn("morph-toggle: pair 类型不匹配，已降级淡入淡出", pr);
        return;
      }
      var h = createShape(svg, s0, fr);
      pairObjs.push({ h: h, s0: s0, s1: s1, idx: pi });
    });
    /* 未配对形状：两静态层 */
    var g0 = svgEl("g", {}), g1 = svgEl("g", {});
    svg.appendChild(g0); svg.appendChild(g1);
    v0.forEach(function (sh, i) {
      if (!used0[i]) createShape(g0, sh, fr);
    });
    v1.forEach(function (sh, i) {
      if (!used1[i]) createShape(g1, sh, fr);
    });

    var n = pairObjs.length;
    var stagger = Math.max(0, Math.min(0.3, +morph.stagger || 0));
    function localU(u, i) {
      if (!stagger || n < 2) return u;
      var span = 1 - stagger * (n - 1);
      return clamp01((u - i * stagger) / span);
    }
    var curU = 0;
    function fmtReadout(u) {
      var ro = morph.readout;
      if (!ro) { readoutDiv.textContent = ""; return; }
      var txt = ro.template || "";
      function val(spec) {
        var v = lerp(+spec.from || 0, +spec.to || 0, u);
        var dec = spec.decimals != null ? spec.decimals : (ro.decimals != null ? ro.decimals : 0);
        return v.toFixed(dec);
      }
      txt = txt.replace(/\{v\}/g, val(ro));
      txt = txt.replace(/\{a\}/g, val(ro.a || {}));
      txt = txt.replace(/\{b\}/g, val(ro.b || {}));
      readoutDiv.textContent = txt;
    }
    function paint(u) {
      curU = clamp01(u);
      pairObjs.forEach(function (p) {
        var lu = localU(curU, p.idx);
        var sh = lerpShape(p.s0, p.s1, lu);
        if (sh) p.h.update(sh);
      });
      g0.setAttribute("opacity", 1 - smoothstep(0.45, 0.55, curU));
      g1.setAttribute("opacity", smoothstep(0.45, 0.55, curU));
      fmtReadout(curU);
    }
    return {
      paint: paint,
      seek: function (u) { paint(u); },
      u: function () { return curU; },
      keyGeom: function () { return { u: curU }; }
    };
  }

  /* —— 对折：moving 形状绕轴线做平面折叠 ——
   * 设计 §3.1#3 的 "2·∠AOP 绕轴旋转" 经核验无法同时满足
   * "轴线 OP 逐点固定" 与 "A 落到其镜像 B"（绕 O 转会搬动 P 点）。
   * 此处实现几何正确的折叠：每点 Q 沿以其中点 M 为圆心、
   * QQ*（Q* 为 Q 关于轴的镜像）为直径的半圆摆动，
   * u=1 时 Q 与 Q* 重合（A 精确落到 B）。∠AOP 仍参与计算，
   * 供断言读取（keyGeom 暴露 foldAngle 供白队核对）。 */
  function buildFoldMorph(svg, fr, views, morph, readoutDiv, cap, vBtns) {
    var v0 = views[0].shapes || [], v1 = views[1].shapes || [];
    var axis = morph.axis || [[45, 55], [88, 30]];
    var moving = morph.moving || [];
    var hide1 = morph.hide1 || [];
    var used0 = {};
    var movers = [];

    /* ∠AOP 仍按设计要求由几何计算（不断言运动，只读回） */
    var A = [63.4, 67.2], O = axis[0], P = axis[1];
    var vOA = [A[0] - O[0], A[1] - O[1]], vOP = [P[0] - O[0], P[1] - O[1]];
    var cosA = (vOA[0] * vOP[0] + vOA[1] * vOP[1]) /
      (Math.hypot(vOA[0], vOA[1]) * Math.hypot(vOP[0], vOP[1]) || 1);
    var angAOP = Math.acos(Math.min(1, Math.max(-1, cosA))) * 180 / Math.PI;

    /* 点字段表：各形状的几何点位 */
    function pointFields(sh) {
      if (sh.t === "seg") return [["a"], ["b"]];
      if (sh.t === "pt") return [["p"]];
      if (sh.t === "circle") return [["c"]];
      if (sh.t === "arc") return [["v"]];
      if (sh.t === "txt") return [["p"]];
      if (sh.t === "poly") return ["pts"];
      return [];
    }
    moving.forEach(function (mi) {
      var s0 = v0[mi];
      if (!s0) return;
      used0[mi] = true;
      /* 预计算每点的镜像与中点 */
      var info = { sh: JSON.parse(JSON.stringify(s0)), pts: [] };
      pointFields(s0).forEach(function (f) {
        if (f[0] === "pts") {
          (s0.pts || []).forEach(function (pt, k) {
            var q2 = reflectAcrossLine(pt, axis[0], axis[1]);
            info.pts.push({ field: "pts", k: k, m: [(pt[0] + q2[0]) / 2, (pt[1] + q2[1]) / 2], q: pt });
          });
        } else {
          var pt = s0[f[0]];
          var q3 = reflectAcrossLine(pt, axis[0], axis[1]);
          info.pts.push({ field: f[0], m: [(pt[0] + q3[0]) / 2, (pt[1] + q3[1]) / 2], q: pt });
        }
      });
      info.h = createShape(svg, s0, fr);
      movers.push(info);
    });
    var g0 = svgEl("g", {}), g1 = svgEl("g", {});
    svg.appendChild(g0); svg.appendChild(g1);
    v0.forEach(function (sh, i) { if (!used0[i]) createShape(g0, sh, fr); });
    v1.forEach(function (sh, i) { if (hide1.indexOf(i) < 0) createShape(g1, sh, fr); });

    var curU = 0;
    function foldPt(info_pt, u) {
      /* 绕中点转 u·180°（半圆摆动；轴上点中点即自身，保持不动） */
      return rotatePt(info_pt.q, info_pt.m, u * 180);
    }
    function paint(u) {
      curU = clamp01(u);
      movers.forEach(function (mv) {
        var sh = JSON.parse(JSON.stringify(mv.sh));
        mv.pts.forEach(function (pi) {
          var np = foldPt(pi, curU);
          if (pi.field === "pts") sh.pts[pi.k] = np;
          else sh[pi.field] = np;
        });
        mv.h.update(sh);
      });
      g0.setAttribute("opacity", 1 - smoothstep(0.45, 0.55, curU));
      g1.setAttribute("opacity", smoothstep(0.45, 0.55, curU));
      readoutDiv.textContent = "";
    }
    return {
      paint: paint,
      seek: function (u) { paint(u); },
      u: function () { return curU; },
      keyGeom: function () {
        /* 关键几何量：A 点当前位置（供 A2.1 采样） */
        var mvA = movers.filter(function (m) { return m.sh.t === "pt"; })[0];
        if (!mvA) return { u: curU };
        var pi = mvA.pts[0];
        var np = foldPt(pi, curU);
        return { u: curU, ax: np[0], ay: np[1], angAOP: angAOP };
      }
    };
  }

  /* —— 离散档位（g11）：petal-strip 生成器 + 停留/淡换 —— */
  function petalStrip(n, cx, cy, R) {
    /* n 瓣扇形交错拼成带子：上排 n/2、下排 n/2 */
    var rows = n / 2;
    var h = R * (22 / 38);
    var W = 2.047 * R;
    var w = W / (rows + 0.5);
    var x0 = cx - W / 2;
    var top = cy - h / 2, bot = cy + h / 2;
    var shapes = [];
    var i, j;
    for (i = 0; i < rows; i++) {
      shapes.push({
        t: "poly",
        pts: [[x0 + i * w, top], [x0 + (i + 1) * w, top], [x0 + (i + 0.5) * w, bot]],
        color: "known", width: 1.5
      });
    }
    for (j = 0; j < rows; j++) {
      shapes.push({
        t: "poly",
        pts: [[x0 + (j + 0.5) * w, top], [x0 + (j + 1.5) * w, top], [x0 + (j + 1) * w, bot]],
        color: "corrA", width: 1.5
      });
    }
    return shapes;
  }
  function straightness(n) {
    /* 1 − tan(π/2n)/2（绿队验算：严格单调增） */
    return 1 - Math.tan(Math.PI / (2 * n)) / 2;
  }
  var STEP_CAPTIONS = {
    8: "8 瓣：波浪边明显",
    16: "16 瓣：波浪边减弱",
    32: "32 瓣：接近平直",
    64: "64 瓣：几乎看不出波浪",
    128: "128 瓣：几乎长方形"
  };

  function buildDiscreteMorph(svg, fr, views, morph, readoutDiv, cap, vBtns,
      btnPlay, scrub, btnBack, btnFwd, btnReplay, wrap) {
    var steps = morph.steps || [8, 16, 32, 64, 128];
    var gp = morph.genParams || { cx: 50, cy: 41, R: 38 };
    var v1 = views[1].shapes || [];
    var stepIdx = 0, timer = null, playing = false;
    var STEP_MS = morph.durationMs || 750;  /* 600 停留 + 150 淡换 */

    function renderStep(i) {
      stepIdx = Math.min(steps.length - 1, Math.max(0, i));
      while (svg.firstChild) svg.removeChild(svg.firstChild);
      var n = steps[stepIdx];
      petalStrip(n, gp.cx, gp.cy, gp.R).forEach(function (sh) {
        createShape(svg, sh, fr);
      });
      /* 末档叠加 view1 的"≈长方形"标注 */
      var labels = (stepIdx === steps.length - 1)
        ? v1.filter(function (sh) { return sh.t === "txt"; })
        : [{ t: "txt", p: [50, 66], text: STEP_CAPTIONS[n] || (n + " 瓣"), size: 13 }];
      labels.forEach(function (sh) { createShape(svg, sh, fr); });
      svg.style.transition = "opacity 150ms";
      readoutDiv.textContent = "n = " + n + " 瓣，波浪边直度 " + straightness(n).toFixed(3) +
        "（越大越直）";
      cap.textContent = (views[stepIdx === 0 ? 0 : 1].caption || "");
      vBtns.forEach(function (b, k) {
        b.classList.toggle("on", (k === 0 && stepIdx === 0) || (k === 1 && stepIdx === steps.length - 1));
      });
      if (scrub) scrub.value = stepIdx;
    }
    function stop() {
      if (timer) { clearInterval(timer); timer = null; }
      playing = false;
      if (btnPlay) btnPlay.textContent = "▶ 播放 morph";
    }
    if (btnPlay) btnPlay.addEventListener("click", function () {
      if (playing) { stop(); return; }
      playing = true;
      btnPlay.textContent = "⏸ 暂停";
      if (stepIdx >= steps.length - 1) renderStep(0);
      timer = setInterval(function () {
        if (stepIdx >= steps.length - 1) { stop(); return; }
        renderStep(stepIdx + 1);
      }, STEP_MS);
    });
    if (scrub) {
      scrub.min = 0; scrub.max = steps.length - 1; scrub.step = 1; scrub.value = 0;
      scrub.addEventListener("input", function () { stop(); renderStep(+scrub.value); });
    }
    if (btnBack) btnBack.addEventListener("click", function () { stop(); renderStep(stepIdx - 1); });
    if (btnFwd) btnFwd.addEventListener("click", function () { stop(); renderStep(stepIdx + 1); });
    if (btnReplay) btnReplay.addEventListener("click", function () { stop(); renderStep(0); });
    vBtns[0].addEventListener("click", function () { stop(); renderStep(0); });
    vBtns[1].addEventListener("click", function () { stop(); renderStep(steps.length - 1); });
    wrap.addEventListener("keydown", function (ev) {
      /* 返工 F-04 补漏：discrete 分支 ←/→ 同样 stopPropagation，不冒泡到 math.js 全局翻页（与 tween 分支同口径） */
      if (ev.key === "ArrowLeft") { stop(); renderStep(stepIdx - 1); ev.preventDefault(); ev.stopPropagation(); }
      else if (ev.key === "ArrowRight") { stop(); renderStep(stepIdx + 1); ev.preventDefault(); ev.stopPropagation(); }
      else if (ev.key === " ") { if (btnPlay) btnPlay.click(); ev.preventDefault(); }
      else if (ev.key === "r" || ev.key === "R") { stop(); renderStep(0); }
    });

    renderStep(0);
    return {
      paint: function () {},
      seek: function () {},
      u: function () { return stepIdx / (steps.length - 1); },
      stepIdx: function () { return stepIdx; },
      gotoStep: function (i) { stop(); renderStep(i); },
      shapeCount: function () { return svg.querySelectorAll("polygon").length; },
      keyGeom: function () {
        return { step: steps[stepIdx], straightness: straightness(steps[stepIdx]) };
      }
    };
  }

  /* ================= §E complete-square-lab =================
   * P0 ch04-u1-l2-p1 专项：配方的几何意义——正方形拼图 + 补块动画。
   * x²+2·half·x = (x+half)² − half²（恒等式，任意 x 下 |左−右| ≤ 1e-9）。 */
  function renderCompleteSquareLab(container, params, page) {
    params = params || {};
    var min = +(params.min != null ? params.min : 0),
        max = +(params.max != null ? params.max : 6),
        step = +(params.step || 1),
        label = params.label || "x",
        half = +(params.half || 3),
        exprLeft = String(params.exprLeft || "x^2 + 6*x"),
        exprRight = String(params.exprRight || "(x+3)^2 - 9"),
        labels = params.labels || ["配方前", "配方后"],
        initial = (params.initial != null && isFinite(+params.initial)) ? +params.initial : 2;
    if (!window.GEOM) {
      container.appendChild(el("div", "ix-stub", "几何原语库未加载（js/geom-primitives.js）"));
      return;
    }

    var wrap = el("div", "ix-eqbind ix-csq");
    wrap.style.cssText = "display:flex;gap:12px;flex-wrap:wrap;align-items:flex-start;";
    /* —— 左：几何拼图 —— */
    var leftBox = el("div", "", "");
    leftBox.style.cssText = "flex:1 1 220px;min-width:0;";
    var capL = el("div", "ix-compare-title", esc(labels[0] || "配方前"));
    capL.style.cssText = "font-weight:bold;margin-bottom:2px;";
    leftBox.appendChild(capL);
    var fr = geoFrame(300, 300);
    var svg = window.GEOM.svg(300, 300, "ix-svg geo-svg");
    leftBox.appendChild(svg);
    wrap.appendChild(leftBox);
    /* —— 右：滑块 + 两行读数 —— */
    var rightBox = el("div", "", "");
    rightBox.style.cssText = "flex:1 1 200px;min-width:0;";
    var capR = el("div", "ix-compare-title", esc(labels[1] || "配方后"));
    capR.style.cssText = "font-weight:bold;margin-bottom:2px;";
    rightBox.appendChild(capR);
    var row = el("div", "ix-slider-row");
    var lab = el("span", "ix-slider-label", MX(label) + " = ");
    var vv = el("span", "ix-slider-val", "");
    var inp = document.createElement("input");
    inp.type = "range"; inp.min = min; inp.max = max; inp.step = step;
    inp.value = initial; inp.className = "ix-range";
    inp.setAttribute("aria-label", label);
    row.appendChild(lab); row.appendChild(inp); row.appendChild(vv);
    rightBox.appendChild(row);
    var lineL = el("div", "ix-expr-line", "");
    var lineR = el("div", "ix-expr-line", "");
    rightBox.appendChild(lineL); rightBox.appendChild(lineR);
    var btn = el("button", "ix-btn", "✨ 补上缺角");
    btn.type = "button";
    btn.style.cssText = "margin-top:8px;";
    rightBox.appendChild(btn);
    var status = el("div", "ix-status", "");
    rightBox.appendChild(status);
    wrap.appendChild(rightBox);
    container.appendChild(wrap);

    /* —— 几何布局（逻辑坐标，y-up） —— */
    var state = { x: initial, filled: false, fillU: 0 };
    function layout() {
      var x = state.x;
      var side = x + half;               /* 完整正方形边长 */
      var ox = 50 - side / 2, oy = 50 - side / 2;  /* 左下角（居中） */
      return {
        x: x, side: side, ox: ox, oy: oy,
        sq: [ox, oy, x],                 /* x×x 主正方形：左下角 + 边长 */
        stripR: [ox + x, oy, half, x],   /* 右长条 half×x */
        stripT: [ox, oy + x, x, half],   /* 上长条 x×half */
        hole: [ox + x, oy + x, half],    /* 缺角 half×half */
        park: [ox + side + 8, oy, half]   /* 补块停放位（右侧） */
      };
    }
    function rectAt(g, x, y, w, h, color, fillOp, dash) {
      var X = fr.X, Y = fr.Y, S = fr.S;
      var r = svgEl("rect", {
        x: X(x), y: Y(y + h), width: S(w), height: S(h),
        fill: color ? "var(--geo-" + color + ")" : "none",
        "fill-opacity": fillOp != null ? fillOp : 0.25,
        stroke: "var(--geo-line)", "stroke-width": 2
      });
      if (dash) r.setAttribute("stroke-dasharray", dash);
      g.appendChild(r);
      return r;
    }
    var gBase = svgEl("g", {}), gBlock = svgEl("g", {});
    svg.appendChild(gBase); svg.appendChild(gBlock);
    var blockEl = null;

    function paint() {
      while (gBase.firstChild) gBase.removeChild(gBase.firstChild);
      while (gBlock.firstChild) gBlock.removeChild(gBlock.firstChild);
      var L = layout();
      /* 主正方形 + 两长条 */
      if (L.x > 1e-9) {
        rectAt(gBase, L.sq[0], L.sq[1], L.sq[2], L.sq[2], "known", 0.25);
        rectAt(gBase, L.stripR[0], L.stripR[1], L.stripR[2], L.stripR[3], "corrA", 0.25);
        rectAt(gBase, L.stripT[0], L.stripT[1], L.stripT[2], L.stripT[3], "corrA", 0.25);
      }
      /* 缺角（虚线） */
      rectAt(gBase, L.hole[0], L.hole[1], L.hole[2], L.hole[2], null, 0, "5,4");
      /* 补块：停放位 → 缺角（translate 补间） */
      var u = state.fillU;
      var bx = lerp(L.park[0], L.hole[0], u), by = lerp(L.park[1], L.hole[1], u);
      blockEl = rectAt(gBlock, bx, by, L.hole[2], L.hole[2], "target", 0.55);
      /* 标注 */
      var t1 = svgEl("text", {
        x: fr.X(L.ox + L.side / 2), y: fr.Y(L.oy) + 16,
        "text-anchor": "middle", "font-size": "12.5", fill: "var(--geo-text)"
      });
      t1.textContent = "边长 x+" + half;
      gBase.appendChild(t1);
    }

    function evalL(x) {
      return (function (e) {
        e = String(e).replace(/\^/g, "**")
          .replace(/\bx\b/g, "(" + Number(x) + ")");
        if (!/^[0-9+\-*/().\s]*$/.test(e)) return NaN;
        try {
          var v = Function('"use strict"; return (' + e + ")")();
          return (typeof v === "number" && isFinite(v)) ? v : NaN;
        } catch (err) { return NaN; }
      })(exprLeft);
    }
    function evalRr(x) {
      return (function (e) {
        e = String(e).replace(/\^/g, "**")
          .replace(/\bx\b/g, "(" + Number(x) + ")");
        if (!/^[0-9+\-*/().\s]*$/.test(e)) return NaN;
        try {
          var v = Function('"use strict"; return (' + e + ")")();
          return (typeof v === "number" && isFinite(v)) ? v : NaN;
        } catch (err) { return NaN; }
      })(exprRight);
    }
    function fmt1(n) {
      if (!isFinite(n)) return "—";
      return String(Math.round(n * 1000) / 1000);
    }
    function refresh() {
      vv.textContent = fmt1(state.x);
      var lv = evalL(state.x), rv = evalRr(state.x);
      lineL.innerHTML = '<span class="ix-expr">' + MX(exprLeft) + "</span>" +
        '<span class="ix-eq"> = </span><span class="ix-val">' + fmt1(lv) + "</span>";
      lineR.innerHTML = '<span class="ix-expr">' + MX(exprRight) + "</span>" +
        '<span class="ix-eq"> = </span><span class="ix-val">' + fmt1(rv) + "</span>";
      var ok = isFinite(lv) && isFinite(rv) && Math.abs(lv - rv) <= 1e-9;
      status.innerHTML = ok
        ? '<span class="ix-success">✅ 左右恒相等（配方恒等式）</span>'
        : '<span class="ix-hint">左右值：' + fmt1(lv) + " vs " + fmt1(rv) + "</span>";
      if (state.filled) {
        lineR.style.background = "var(--m-accent-soft)";
        lineR.style.borderRadius = "6px";
      } else {
        lineR.style.background = "";
      }
      paint();
    }
    inp.addEventListener("input", function () {
      state.x = Number(inp.value);
      refresh();
    });
    var tw = createTween({
      durationMs: 900,
      onUpdate: function (u) { state.fillU = u; paint(); },
      onDone: function () {
        state.filled = true;
        refresh();
      }
    });
    btn.addEventListener("click", function () {
      state.filled = false;
      state.fillU = 0;
      paint();
      tw.start();
    });
    refresh();
  }

  /* ================= §F 注册与测试钩子 ================= */
  function registerAll() {
    if (!window.MATH_INTERACTIONS) return;
    window.MATH_INTERACTIONS.register("morph-toggle", renderMorphToggle);
    window.MATH_INTERACTIONS.register("complete-square-lab", renderCompleteSquareLab);
  }
  registerAll();

  window.__geomproc = {
    _inst: morphInstances,
    seek: function (pageId, u) {
      var o = morphInstances[pageId];
      if (o && o.seek) o.seek(u);
    },
    u: function (pageId) {
      var o = morphInstances[pageId];
      return o && o.u ? o.u() : NaN;
    },
    play: function (pageId) {
      var o = morphInstances[pageId];
      if (o && o._tween) o._tween.start();
    },
    straightness: straightness,
    shapeCount: function (pageId) {
      var o = morphInstances[pageId];
      return o && o.shapeCount ? o.shapeCount() : 0;
    },
    keyGeom: function (pageId) {
      var o = morphInstances[pageId];
      return o && o.keyGeom ? o.keyGeom() : null;
    },
    gotoStep: function (pageId, i) {
      var o = morphInstances[pageId];
      if (o && o.gotoStep) o.gotoStep(i);
    },
    stepIdx: function (pageId) {
      var o = morphInstances[pageId];
      return o && o.stepIdx ? o.stepIdx() : -1;
    }
  };
  /* 生成器导出（验证脚本用） */
  window.__petalStrip = petalStrip;
})();
