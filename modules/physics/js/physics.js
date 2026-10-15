/* ============================================================
 * 物理 SPA 引擎（蓝队 2026-10-15，骨架 + 试点 p04.1.2）
 *
 * 命名空间隔离铁律：本文件只使用 window.PHY_META（章注册表）、
 * window.PHY_CH（章数据）与 window.PHY（对外 API），只渲染
 * #physics-app 容器内；不读取、不调用其他学科引擎的任何变量
 * 与函数；CSS 类名前缀 phy-，见 css/physics.css。
 * localStorage 键一律 ltb-phy-* 命名空间；ltb-en-* / ltb-math-*
 * 与旧深链零触碰。
 *
 * 数据驱动：页面全部来自 window.PHY_CH[pNN].units[].lessons[]
 * .pages[]，pageKind = interact / explain / quiz；数据 schema
 * 见 data/p04.js 文件头（冻结版 v1.0，127 课批量生产复用）。
 * 路由：#phy=<课号> 深链冷启动直达（如 #phy=p04.1.2）。
 * 一屏口径（白队 F1–F3）：.phy-zone 是唯一滚动容器
 * （overflow-y:auto + overscroll-behavior-y:contain），
 * 配套「下滑查看更多」提示；body 永不滚动；无 scrollIntoView。
 * 公式：原生 MathML（方案 A），window.MathMLCheck 不可用时
 * 本地兜底检测；不支持时降级为 translation 人话文本。
 * ============================================================ */
(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";

  /* ---------------- 基础工具 ---------------- */
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
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
  function flash(node) {
    if (!node || !node.classList) return;
    node.classList.remove("phy-flash");
    void node.offsetWidth;
    node.classList.add("phy-flash");
  }
  function store(k, v) {
    try { localStorage.setItem("ltb-phy-" + k, JSON.stringify(v)); }
    catch (e) { memStore["ltb-phy-" + k] = JSON.stringify(v); } /* Y1：禁用时内存降级 */
  }
  var memStore = {};
  function load(k, fb) {
    try {
      var v = JSON.parse(localStorage.getItem("ltb-phy-" + k));
      return v == null ? fb : v;
    } catch (e) {
      try {
        var m = JSON.parse(memStore["ltb-phy-" + k]);
        return m == null ? fb : m;
      } catch (e2) { return fb; }
    }
  }
  /* 填空归一化：去首尾空白、小写、压缩空白；上标数字 ⁰¹²³⁴⁵⁶⁷⁸⁹ → 0-9
   *（数据 schema §6：上标 ³ 必须接受纯文本 3 变体；R2 2026-10-15） */
  var SUPER_DIGITS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function norm(s) {
    return String(s == null ? "" : s).trim().toLowerCase()
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, function (d) { return String(SUPER_DIGITS.indexOf(d)); })
      .replace(/\s+/g, " ");
  }
  function roleColor(role) {
    return "var(--phy-" + role + ")";
  }

  /* ---------------- MathML 环境检测（math/js/mathml-check.js 兜底） ---------------- */
  var mmlCached = null;
  function mathmlOK() {
    if (window.MathMLCheck && typeof window.MathMLCheck.supported === "boolean") {
      return window.MathMLCheck.supported;
    }
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
        if (ms) {
          var r = ms.getBoundingClientRect();
          ok = r.width > 10 && r.height > 10;
        }
        holder.parentNode.removeChild(holder);
      }
    } catch (e) { ok = false; }
    mmlCached = ok;
    return ok;
  }
  /* 公式渲染：MathML 优先；不支持时降级为 translation 人话文本 */
  function formulaHtml(formulas, key) {
    var f = (formulas || {})[key];
    if (!f) return "";
    if (f.mathml && mathmlOK()) return f.mathml;
    return '<span class="phy-formula-fallback">' + esc(f.translation || "") + "</span>";
  }
  /* 正文块内的 <span class="phy-f" data-f="key"> 占位替换 */
  function hydrateFormulas(root, formulas) {
    var spans = root.querySelectorAll(".phy-f");
    for (var i = 0; i < spans.length; i++) {
      var key = spans[i].getAttribute("data-f");
      spans[i].innerHTML = formulaHtml(formulas, key);
    }
  }

  /* ---------------- 数据查找 ---------------- */
  function readyChapters() {
    var meta = (window.PHY_META && window.PHY_META.chapters) || [];
    return meta.filter(function (c) {
      var ch = (window.PHY_CH || {})[c.id];
      return ch && (ch.units || []).length > 0;
    });
  }
  function findLesson(lessonId) {
    var CH = window.PHY_CH || {};
    for (var cid in CH) {
      var ch = CH[cid];
      var units = ch.units || [];
      for (var i = 0; i < units.length; i++) {
        var lessons = units[i].lessons || [];
        for (var j = 0; j < lessons.length; j++) {
          if (lessons[j].id === lessonId) {
            return { chapter: ch, unit: units[i], lesson: lessons[j] };
          }
        }
      }
    }
    return null;
  }
  function hasLesson(lessonId) { return !!findLesson(lessonId); }
  function isDone(lessonId) {
    return !!(load("progress", {})[lessonId] || {}).done;
  }

  /* ---------------- 章节浏览器（数据驱动） ---------------- */
  var browseRoot = null, appRoot = null, cur = null;

  function renderBrowser() {
    browseRoot.innerHTML = "";
    var wrap = el("div", "phy-browse");
    wrap.appendChild(el("h1", "", "物理"));
    var chs = readyChapters();
    var nLessons = 0, nPages = 0;
    chs.forEach(function (c) {
      ((window.PHY_CH[c.id] || {}).units || []).forEach(function (u) {
        ((u.lessons || [])).forEach(function (l) {
          nLessons++;
          nPages += ((l.pages || []).length);
        });
      });
    });
    wrap.appendChild(el("p", "phy-browse-sub",
      chs.length + " 章 · " + nLessons + " 课 · " + nPages + " 页"));
    var list = el("ul", "phy-ch-list");
    chs.forEach(function (c) {
      var ch = window.PHY_CH[c.id];
      var li = el("li", "");
      var nL = 0;
      (ch.units || []).forEach(function (u) { nL += (u.lessons || []).length; });
      var btn = el("button", "phy-ch-btn",
        '<span class="phy-ch-id">' + esc(c.id) + "</span>" +
        '<span class="phy-ch-title">' + esc(c.title) + "</span>" +
        '<span class="phy-ch-count">' + nL + " 课</span>");
      btn.type = "button";
      btn.setAttribute("aria-expanded", "false");
      var sub = el("div", "");
      sub.style.display = "none";
      btn.addEventListener("click", function () {
        var open = sub.style.display !== "none";
        sub.style.display = open ? "none" : "block";
        btn.setAttribute("aria-expanded", open ? "false" : "true");
      });
      (ch.units || []).forEach(function (u) {
        sub.appendChild(el("h3", "phy-unit", esc(u.id) + " · " + esc(u.title)));
        var ul = el("ul", "phy-lesson-list");
        (u.lessons || []).forEach(function (l) {
          var done = isDone(l.id) ? '<span class="phy-done">✓ 已学完</span>' : "";
          var lb = el("button", "phy-lesson-btn",
            '<span class="phy-lesson-id">' + esc(l.id) + "</span>" +
            '<span class="phy-lesson-title">' + esc(l.title) + "</span>" +
            done + '<span class="phy-lesson-go">进入 →</span>');
          lb.type = "button";
          lb.addEventListener("click", function () { openLesson(l.id); });
          var lli = el("li", "");
          lli.appendChild(lb);
          ul.appendChild(lli);
        });
        sub.appendChild(ul);
      });
      li.appendChild(btn);
      li.appendChild(sub);
      list.appendChild(li);
    });
    wrap.appendChild(list);
    browseRoot.appendChild(wrap);
  }

  /* ---------------- 读数徽章（冻结 spec） ---------------- */
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

  /* ---------------- 交互：mv-lab（m–V 图像虚拟实验） ---------------- */
  /* 坐标约定：SVG 逻辑坐标 0–100，屏幕系（y 向下）；JS 侧 X()/Y()
   * 做物理量→屏幕坐标映射，文本不翻转。 */
  function widgetMvLab(params) {
    var box = el("div", "");
    var mats = params.materials || [];
    var mMax = params.mMax || 1000, mInit = params.mInit || 400, step = params.step || 10;
    var vMax = 1000;
    var state = { mat: mats[0] || null, m: mInit };

    var tabs = el("div", "phy-tabs");
    tabs.setAttribute("role", "group");
    tabs.setAttribute("aria-label", "选择材料");
    mats.forEach(function (mt) {
      var b = el("button", "", esc(mt.name));
      b.type = "button";
      b.style.color = roleColor(mt.colorRole);
      b.setAttribute("aria-pressed", mt === state.mat ? "true" : "false");
      b.addEventListener("click", function () {
        state.mat = mt;
        for (var i = 0; i < tabs.children.length; i++) {
          tabs.children[i].setAttribute("aria-pressed",
            tabs.children[i] === b ? "true" : "false");
        }
        update();
        flash(badge.root);
      });
      tabs.appendChild(b);
    });
    box.appendChild(tabs);

    var badge = readoutBadge(params);
    box.appendChild(badge.box);

    /* 坐标图 */
    var padL = 13, padR = 5, padT = 7, padB = 13;
    function X(v) { return padL + (v / vMax) * (100 - padL - padR); }
    function Y(m) { return padT + (1 - m / mMax) * (100 - padT - padB); }
    var svg = svgEl("svg", {
      "class": "phy-plot", viewBox: "0 0 100 100", role: "img",
      "aria-label": "m–V 图像：三条过原点的直线，斜率不同"
    });
    /* 网格 */
    [0, 250, 500, 750, 1000].forEach(function (v) {
      svg.appendChild(svgEl("line", {
        "class": "phy-grid", x1: X(v), y1: Y(0), x2: X(v), y2: Y(mMax)
      }));
      svg.appendChild(svgEl("line", {
        "class": "phy-grid", x1: X(0), y1: Y(v), x2: X(1000), y2: Y(v)
      }));
    });
    /* 坐标轴 */
    svg.appendChild(svgEl("line", { "class": "phy-axis", x1: X(0), y1: Y(0), x2: X(vMax), y2: Y(0) }));
    svg.appendChild(svgEl("line", { "class": "phy-axis", x1: X(0), y1: Y(0), x2: X(0), y2: Y(mMax) }));
    var xl = svgEl("text", { x: X(vMax), y: Y(0) + 5.5, "text-anchor": "end" });
    xl.textContent = (params.source && params.source.xLabel) || "V/cm³";
    svg.appendChild(xl);
    var yl = svgEl("text", { x: X(0) + 1, y: Y(mMax) - 1 });
    yl.textContent = (params.source && params.source.yLabel) || "m/g";
    svg.appendChild(yl);
    [0, 500, 1000].forEach(function (v) {
      var t = svgEl("text", { x: X(v), y: Y(0) + 5.5, "text-anchor": "middle" });
      t.textContent = String(v);
      svg.appendChild(t);
      var t2 = svgEl("text", { x: X(0) - 1.5, y: Y(v) + 1.5, "text-anchor": "end" });
      t2.textContent = String(v);
      svg.appendChild(t2);
    });
    /* 三条过原点的直线 m = ρV（点列数据源，Y4 口径） */
    var traces = {}, endDots = {};
    mats.forEach(function (mt) {
      /* W5 修复（2026-10-15）：端点必达。旧循环 v<=vEnd+1 步进 100，
       * vEnd 非 100 倍数时端点分支永不执行（ρ=2.7 止于 300、ρ=7.9 止于 100）。 */
      var vEnd = Math.min(vMax, mMax / mt.rho);
      var pts = [];
      for (var v = 0; v < vEnd; v += 100)
        pts.push(X(v).toFixed(2) + "," + Y(mt.rho * v).toFixed(2));
      pts.push(X(vEnd).toFixed(2) + "," + Y(mt.rho * vEnd).toFixed(2));
      var pl = svgEl("polyline", { "class": "phy-trace", points: pts.join(" ") });
      /* W6 修复（2026-10-15，专家队裁决）：行内样式恢复颜色编码。
       * CSS .phy-trace 的灰色虚线会覆盖表现属性；行内样式优先级最高，
       * 且不影响位移迹线等另两处 .phy-trace 用法（零副作用）。 */
      pl.style.stroke = roleColor(mt.colorRole);
      pl.style.strokeDasharray = "none";
      svg.appendChild(pl);
      traces[mt.id] = pl;
      /* 端点圆点（黄队 mv-lab 改法 1：选中态放大 1.5 倍，与加粗直线双编码） */
      var ed = svgEl("circle", { cx: X(vEnd).toFixed(2), cy: Y(mt.rho * vEnd).toFixed(2),
        r: 1.6, "class": "phy-dot" });
      ed.style.fill = roleColor(mt.colorRole);
      svg.appendChild(ed);
      endDots[mt.id] = ed;
      /* 斜率标签（Y4：直线段给精确值）
       * 黄队 mv-lab 改法 2：ρ 标签用引线锚定在实际线端（引线端点距直线 ≤4 逻辑单位），
       * 标签跟随直线；陡线（铁，线端贴近 y 轴）标签放线端右下方防与刻度相挤。 */
      var tagEndX = X(vEnd), tagEndY = Y(mt.rho * vEnd);
      var tagCrowded = tagEndX < 30;
      var tagX = tagCrowded ? tagEndX + 1.5 : tagEndX - 1;
      var tagY = tagCrowded ? tagEndY + 3.5 : tagEndY - 2;
      var leader = svgEl("line", { x1: tagEndX.toFixed(2), y1: tagEndY.toFixed(2),
        x2: tagX.toFixed(2), y2: tagY.toFixed(2), "class": "phy-tag-leader" });
      leader.style.stroke = roleColor(mt.colorRole);
      svg.appendChild(leader);
      var tag = svgEl("text", {
        "class": "phy-slope-tag",
        x: tagX.toFixed(2), y: tagY.toFixed(2),
        fill: roleColor(mt.colorRole),
        "text-anchor": tagCrowded ? "start" : "end"
      });
      tag.textContent = "ρ=" + mt.rho;
      svg.appendChild(tag);
    });
    /* 活动点 */
    var dot = svgEl("circle", { "class": "phy-dot", r: 2.4, fill: "#D55E00" });
    svg.appendChild(dot);
    box.appendChild(svg);

    /* 滑块 */
    var srow = el("div", "phy-slider-row");
    srow.appendChild(el("label", "", "质量 m"));
    var slider = el("input", "");
    slider.type = "range";
    slider.min = "0"; slider.max = String(mMax); slider.step = String(step);
    slider.value = String(mInit);
    slider.setAttribute("aria-label", "质量（克）");
    var sval = el("span", "phy-slider-val", "");
    srow.appendChild(slider);
    srow.appendChild(sval);
    box.appendChild(srow);

    function update() {
      var mt = state.mat;
      var v = mt ? state.m / mt.rho : 0;
      dot.setAttribute("cx", X(v).toFixed(2));
      dot.setAttribute("cy", Y(state.m).toFixed(2));
      dot.setAttribute("fill", mt ? roleColor(mt.colorRole) : "#D55E00");
      /* 黄队 mv-lab 改法 1：选中态不许只靠透明度——选中直线加粗 2px +
       * 端点圆点放大 1.5 倍，非选中线降到 40% 透明（透明度只做辅助）。 */
      for (var id in traces) {
        var sel = !mt || id === mt.id;
        traces[id].style.opacity = sel ? "1" : "0.4";
        traces[id].style.strokeWidth = sel ? "2px" : "";
        endDots[id].setAttribute("r", sel ? 2.4 : 1.6);
        endDots[id].style.opacity = sel ? "1" : "0.4";
      }
      badge.val.textContent = mt ? mt.rho.toFixed(1) : "—";
      badge.unit.textContent = " " + (params.unitRho || "");
      sval.textContent = "m=" + state.m + (params.unitM || "g") +
        "  V=" + v.toFixed(1) + (params.unitV || "cm³");
    }
    slider.addEventListener("input", function () {
      state.m = parseFloat(slider.value) || 0;
      update();
    });
    update();
    return box;
  }

  /* ---------------- 交互：slope-compare（斜率直观版） ---------------- */
  function widgetSlopeCompare(params) {
    var box = el("div", "");
    var mats = params.materials || [];
    var order = params.order || [];
    var list = el("div", "phy-slope-list");
    list.setAttribute("role", "group");
    list.setAttribute("aria-label", "按线的陡峭程度排序");
    var note = el("div", "phy-slope-note", "点一点每种材料，看它的 ρ 和线的样子。");
    /* 黄队 slope-compare：三条等长色条是视觉编码错误。改法：
     * ① 色条长度 ∝ ρ（最长=密度最大者）+ ρ 数值；
     * ② 行首迷你 m–V 直线缩略图（40×28px，陡缓直接可见）；
     * ③ 排名数字徽章"①最陡/②/③最平缓"。三重编码，灰度下可辨。 */
    var maxRho = 0;
    order.forEach(function (mid) {
      mats.forEach(function (x) { if (x.id === mid) maxRho = Math.max(maxRho, x.rho); });
    });
    if (!(maxRho > 0)) maxRho = 1;
    var rankTxt = ["①最陡", "②", "③最平缓"];
    order.forEach(function (mid, i) {
      var mt = null;
      mats.forEach(function (x) { if (x.id === mid) mt = x; });
      if (!mt) return;
      var frac = mt.rho / maxRho;
      var barW = Math.round(24 + frac * 96);
      var tx2 = 4 + 32 * frac, ty2 = 24 - 20 * frac;
      var thumb = '<svg class="phy-slope-thumb" width="40" height="28" viewBox="0 0 40 28" aria-hidden="true">' +
        '<line x1="4" y1="26" x2="38" y2="26" stroke="#999" stroke-width="1"/>' +
        '<line x1="4" y1="26" x2="4" y2="4" stroke="#999" stroke-width="1"/>' +
        '<line x1="4" y1="24" x2="' + tx2.toFixed(1) + '" y2="' + ty2.toFixed(1) +
        '" stroke="' + roleColor(mt.colorRole) + '" stroke-width="2.5"/></svg>';
      var row = el("button", "phy-slope-row",
        '<span class="phy-slope-rank">' + (rankTxt[i] || String(i + 1)) + "</span>" +
        '<span class="phy-slope-name">' + esc(mt.name) + "</span>" +
        thumb +
        '<span class="phy-slope-bar" style="width:' + barW + 'px;background:' +
        roleColor(mt.colorRole) + '"></span>' +
        '<span class="phy-slope-rho">ρ=' + mt.rho.toFixed(1) + " " + esc(params.unitRho || "") + "</span>");
      row.type = "button";
      row.setAttribute("aria-pressed", "false");
      (function (m, idx) {
        row.addEventListener("click", function () {
          var on = row.getAttribute("aria-pressed") === "true";
          for (var k = 0; k < list.children.length; k++) {
            list.children[k].setAttribute("aria-pressed", "false");
          }
          row.setAttribute("aria-pressed", on ? "false" : "true");
          if (!on) {
            var steep = ["最陡", "次之", "最平缓"][idx] || "";
            note.textContent = m.name + "：ρ = " + m.rho.toFixed(1) + " " +
              (params.unitRho || "") + "，线" + steep + " → 密度" +
              (idx === 0 ? "最大" : idx === order.length - 1 ? "最小" : "居中") + "。";
            flash(row);
          }
        });
      })(mt, i);
      list.appendChild(row);
    });
    box.appendChild(list);
    box.appendChild(note);
    return box;
  }

  /* ---------------- Y3 公式身份证卡片 ---------------- */
  function renderFormulaId(p) {
    var card = el("div", "phy-idcard");
    card.appendChild(el("div", "phy-idcard-head", "公式身份证"));
    function row(k, vHtml) {
      var r = el("div", "phy-idcard-row",
        '<div class="phy-idcard-k">' + esc(k) + '</div><div class="phy-idcard-v"></div>');
      $(".phy-idcard-v", r).innerHTML = vHtml;
      card.appendChild(r);
    }
    var f = p.formula || {};
    var fHtml = '<div class="phy-formula">' +
      (f.mathml && mathmlOK() ? f.mathml
        : '<span class="phy-formula-fallback">' + esc(f.translation || "") + "</span>") +
      '</div><div class="phy-translation">' + esc(f.translation || "") + "</div>";
    row("公式", fHtml);
    row("成立条件", "<ul><li>" + (p.conditions || []).map(esc).join("</li><li>") + "</li></ul>");
    row("什么时候失效", esc(p.counterexample || ""));
    row("量纲检查", esc(p.dimension || "").replace("✓", '<span class="phy-dim-ok">✓</span>'));
    if (p.units) {
      var u = p.units;
      var uHtml = "SI：" + esc(u.si) + "；常用：" + esc(u.common);
      if (u.note) uHtml += "<br>" + esc(u.note);
      row("单位", uHtml);
    }
    return card;
  }

  /* ---------------- 讲解页块渲染 ---------------- */
  function renderBlock(b, formulas) {
    if (b.type === "lead") return el("p", "phy-lead", esc(b.text));
    if (b.type === "text") {
      var t = el("p", "phy-text", b.html || "");
      hydrateFormulas(t, formulas);
      return t;
    }
    if (b.type === "formula-id") return renderFormulaId(b);
    if (b.type === "trap") return el("div", "phy-trap", esc(b.text));
    if (b.type === "oldfriend") {
      var o = el("div", "phy-oldfriend", b.text || "");
      hydrateFormulas(o, formulas);
      return o;
    }
    if (b.type === "mathlink") return el("div", "phy-mathlink", esc(b.text));
    if (b.type === "slogan") return el("div", "phy-slogan", esc(b.text));
    if (b.type === "widget") {
      return renderWidget((b.widget || {}).type, (b.widget || {}).params);
    }
    return el("div", "", "");
  }

  /* ---------------- 练习题（Y3 判分口径） ---------------- */
  function renderQuestion(q) {
    /* 章末小结与习题约定（WIDGETS.md §章末习题）：type "review" 为静态
     * 小结块（无判分），与 choice/fill 同属 kind:"quiz" 页。 */
    if (q.type === "review") {
      var rv = el("div", "phy-review");
      rv.appendChild(el("div", "phy-review-head", "📝 本章小结"));
      var rb = el("div", "phy-review-body", q.html || "");
      hydrateFormulas(rb, {});
      rv.appendChild(rb);
      return rv;
    }
    var box = el("div", "phy-q");
    var fb = el("div", "phy-q-fb", "");
    var wrong = 0;
    function say(ok, msg, showTip) {
      fb.innerHTML = (ok ? '<span class="ok">✓ 答对了</span> ' : '<span class="bad">✗ 不对</span> ') +
        esc(msg) + (showTip && q.tip ? '<br><span class="tip">💡 ' + esc(q.tip) + "</span>" : "");
      flash(box);
    }
    if (q.type === "choice") {
      box.appendChild(el("div", "phy-q-stem", esc(q.stem)));
      var opts = el("div", "phy-q-opts");
      (q.options || []).forEach(function (op, i) {
        var b = el("button", "", esc(op));
        b.type = "button";
        b.addEventListener("click", function () {
          if (b.classList.contains("judged-ok")) return;
          if (i === q.answer) {
            b.classList.add("judged-ok");
            say(true, "就是它。", true);
          } else {
            wrong++;
            b.classList.add("judged-bad");
            say(false, "再想想。", wrong >= 2);
          }
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
    } else if (q.type === "fill") {
      var stem = el("div", "phy-q-stem", "");
      stem.innerHTML = esc(q.stemBefore || "") +
        ' <input type="text" style="width:7em;display:inline-block;" aria-label="填空">' +
        " " + esc(q.stemAfter || "") +
        (q.hint ? ' <span style="color:var(--phy-ink-soft);font-size:0.82rem;">' + esc(q.hint) + "</span>" : "");
      box.appendChild(stem);
      var input = stem.querySelector("input");
      var btn = el("button", "phy-q-check", "检查");
      btn.type = "button";
      btn.addEventListener("click", function () {
        var v = norm(input.value);
        /* R2（2026-10-15）：候选集 = canonical + accept 全集；
         * 旧式 (q.accept || [q.answer]) 在 accept 存在时丢弃 canonical，
         * 致 Q3 填 kg/m³（canonical）被判错。 */
        var candidates = [q.answer].concat(q.accept || []);
        var ok = candidates.some(function (a) { return norm(a) === v; });
        if (ok) say(true, "单位正确。", true);
        else { wrong++; say(false, "再想想。", wrong >= 2); }
      });
      if (input.addEventListener) {
        input.addEventListener("keydown", function (e) {
          if (e.key === "Enter" && btn.click) btn.click();
        });
      }
      box.appendChild(btn);
    }
    box.appendChild(fb);
    return box;
  }

  /* ============================================================
   * P1–P10 / Y1–Y5 组件渲染器（蓝队 2026-10-15，阶段三批量生产用）
   *
   * 全部忠实实现 docs/physics-interactions.md v1.1 spec：
   * - params 无具体色值（colorRole→var(--phy-*)；Canvas 取色走
   *   getComputedStyle 解析，stub/无 CSS 时才用 Okabe-Ito 回退值）
   * - 逻辑单位 0–100（y 向上为物理惯例，SVG 屏幕系 y 向下时各组件
   *   内做映射，文本不翻转）；触控目标 ≥44px；手柄 ≥6 逻辑单位
   * - 双编码（颜色+形状/文字）；读数走 MathML，单位与数值同行
   * - 反馈走 M6（视觉 flash 必选，震动/合成音可选）；零音频文件
   * - 「主动降级（教学聚焦）」按降级后 spec 实现，不二次降级
   * ============================================================ */

  /* ---------------- 通用 UI 工件 ---------------- */
  function fmtN(n, d) {
    if (!isFinite(n)) return "—";
    var s = Number(n).toFixed(d == null ? 1 : d);
    return s.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
  }
  /* Canvas 取色：解析主题变量（深色自动跟随）；无 getComputedStyle
   *（如 smoke stub）时回退 Okabe-Ito 字面值——回退只在渲染器内部，
   * params 里永不出现色值。 */
  var CSSVAR_FALLBACK = {
    "--phy-known": "#0072B2", "--phy-target": "#D55E00",
    "--phy-force-a": "#E69F00", "--phy-force-b": "#56B4E9",
    "--phy-force-c": "#009E73", "--phy-body": "#222222",
    "--phy-track": "#7A7A7A", "--phy-ray": "#222222",
    "--phy-field": "#56B4E9", "--phy-current": "#009E73",
    "--phy-charge-pos": "#D55E00", "--phy-charge-neg": "#0072B2",
    "--phy-wave-a": "#E69F00", "--phy-wave-b": "#56B4E9",
    "--phy-highlight": "#F0E442", "--phy-momentum-a": "#7A7A7A",
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
  function cancelLater(id) {
    if (id && typeof clearTimeout === "function") clearTimeout(id);
  }
  function every(fn, ms) {
    if (typeof setInterval === "function") return setInterval(fn, ms);
    return 0;
  }
  function cancelEvery(id) {
    if (id && typeof clearInterval === "function") clearInterval(id);
  }
  function rafFn(fn) {
    if (typeof window.requestAnimationFrame === "function") return window.requestAnimationFrame(fn);
    return later(fn, 16);
  }
  function cafFn(id) {
    if (typeof window.cancelAnimationFrame === "function") { try { window.cancelAnimationFrame(id); } catch (e) {} }
    else cancelLater(id);
  }
  function nowMs() {
    try { if (window.performance && window.performance.now) return window.performance.now(); }
    catch (e) {}
    return Date.now();
  }
  function vib(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }
  /* 滑块行：原生 range（轨道 ≥44px）+ −/+ 步进按钮（W-P9：440Hz 这类
   * 目标值手机上一次点到）+ 读数值 */
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
  /* 播放控制条：▶/⏸/↺ + scrubber（沿用代数 slow-replay 约定，W-P6） */
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
  function svgStage(cls, label) {
    return svgEl("svg", { "class": "phy-stage " + (cls || ""), viewBox: "0 0 100 100",
      role: "img", "aria-label": label || "物理交互图" });
  }
  function svgText(x, y, str, cls, anchor) {
    var t = svgEl("text", { x: x, y: y, "class": cls || "", "text-anchor": anchor || "middle" });
    t.textContent = str;
    return t;
  }
  function arrowHead(svg, id, color) {
    var defs = svg.querySelector("defs");
    if (!defs) { defs = svgEl("defs", {}); svg.appendChild(defs); }
    var m = svgEl("marker", { id: id, viewBox: "0 0 10 10", refX: "8", refY: "5",
      markerWidth: "7", markerHeight: "7", orient: "auto-start-reverse" });
    m.appendChild(svgEl("path", { d: "M0,0 L10,5 L0,10 z", fill: color }));
    defs.appendChild(m);
    return "url(#" + id + ")";
  }
  /* client 坐标 → SVG 逻辑坐标（0–100） */
  function toSVG(svg, cx, cy) {
    try {
      var r = svg.getBoundingClientRect();
      if (r && r.width > 0 && r.height > 0) {
        return { x: (cx - r.left) / r.width * 100, y: (cy - r.top) / r.height * 100 };
      }
    } catch (e) {}
    return { x: 50, y: 50 };
  }
  /* 小视口判定（Y2 刻度尺审计 P1 / 滑块纵向排布共用）：
   * 无 matchMedia（如 smoke stub）时一律返回 false，保持大视口行为 */
  function smallViewport() {
    try {
      return typeof window.matchMedia === "function" &&
        !!window.matchMedia("(max-width:480px)").matches;
    } catch (e) { return false; }
  }
  /* 指针拖拽：onMove(lx, ly) 给逻辑坐标；松手 onEnd(moved) */
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
  /* 读数行：MathML 优先（符号斜体），单位与数值同行；返回 {mathml, text} */
  function mmlRead(symbolMML, valueText, unitText) {
    var m = "<math><mrow>" + symbolMML + "<mo>=</mo><mn>" + esc(valueText) + "</mn>" +
      (unitText ? "<mspace width=\"0.25em\"/><mi mathvariant=\"normal\">" + esc(unitText) + "</mi>" : "") +
      "</mrow></math>";
    return { mathml: m, text: valueText + (unitText ? " " + unitText : "") };
  }
  function mi(s) { return "<mi>" + esc(s) + "</mi>"; }
  function msub(base, sub) {
    return "<msub>" + mi(base) + "<mn>" + esc(sub) + "</mn></msub>";
  }
  /* 状态徽章：文字为主（W-P4：状态不只靠颜色） */
  function stateBadge(text, tone) {
    return el("div", "phy-state" + (tone ? " phy-state-" + tone : ""), text);
  }
  function noteLine(text) { return el("div", "phy-note", text); }
  /* 当前页 id（黄队 P1/Y4 首访提示按页记忆用）：render() 里赋值，形如 p01.1.1-p1 */
  var curPageId = "";
  var hintMem = {};
  /* 首次进入提示的记忆读写：localStorage 键 `phy_hint_seen_<页id>`；
   * file:// 下 localStorage 禁用时降级为内存（不报错）。 */
  function hintSeen(key) {
    try { return !!localStorage.getItem("phy_hint_seen_" + key); }
    catch (e) { return !!hintMem[key]; }
  }
  function markHintSeen(key) {
    try { localStorage.setItem("phy_hint_seen_" + key, "1"); }
    catch (e) { hintMem[key] = 1; }
  }
  /* Canvas 2d 上下文（stub/无 canvas 时返回 null，渲染器跳过绘制） */
  function c2d(cv) {
    try { return (cv && typeof cv.getContext === "function") ? cv.getContext("2d") : null; }
    catch (e) { return null; }
  }
  function fitCanvas(cv, w, h) {
    try {
      var dpr = (typeof window.devicePixelRatio === "number" && window.devicePixelRatio > 0)
        ? Math.min(window.devicePixelRatio, 2) : 1;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      var ctx = c2d(cv);
      if (ctx) ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return ctx;
    } catch (e) { return null; }
  }
  /* Web Audio（零音频文件；需用户手势触发，自动播放策略） */
  function audioCtx() {
    try {
      var AC = window.AudioContext || window.webkitAudioContext;
      return AC ? new AC() : null;
    } catch (e) { return null; }
  }

  /* ---------------- P1 · force-drag（受力示意拖拽） ---------------- */
  var FORCE_KIND_ROLE = { gravity: "force-a", normal: "force-b", pull: "force-b",
    friction: "force-c", custom: "force-c" };
  function widgetForceDrag(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var body = p.body || { x: 50, y: 40, size: 15 };
    var unit = p.unit || "N";
    var showRes = p.showResultant !== false;
    var forces = (p.forces || []).map(function (f, i) {
      return { id: f.id || ("f" + i), kind: f.kind || "custom",
        label: f.label || ("F" + (i + 1)),
        angle: f.angleDeg == null ? 0 : f.angleDeg,
        mag: f.mag == null ? 5 : f.mag,
        min: f.min == null ? 0 : f.min, max: f.max == null ? 20 : f.max,
        fixed: !!f.fixed };
    });
    var svg = svgStage("", "受力示意：拖动箭头改变力的大小和方向");
    /* 地面 / 斜面 */
    if (p.surface === "incline") {
      var inc = Math.min(45, Math.max(0, p.inclineDeg || 0)) * Math.PI / 180;
      var y0 = 78;
      svg.appendChild(svgEl("line", { "class": "phy-ground",
        x1: 5, y1: y0, x2: 95, y2: y0 - 90 * Math.tan(inc) }));
    } else {
      svg.appendChild(svgEl("line", { "class": "phy-ground", x1: 5, y1: 80, x2: 95, y2: 80 }));
    }
    var dyn = svgEl("g", {});
    svg.appendChild(dyn);
    var trend = stateBadge("—", "");
    box.appendChild(svg);
    box.appendChild(trend);
    var hasFixed = forces.some(function (f) { return f.fixed; });
    if (hasFixed) box.appendChild(noteLine("灰色虚线的是固定力（如重力）：大小方向不变，拖不动。"));
    var K = 1.4; /* 逻辑单位 / N */
    function fvec(f) {
      var a = f.angle * Math.PI / 180;
      return { x: f.mag * Math.cos(a), y: f.mag * Math.sin(a) };
    }
    /* 摩擦力方向：与除摩擦外诸力合力反向（渲染器自动，不暴露方向参数） */
    function frictionAngle() {
      var sx = 0, sy = 0;
      forces.forEach(function (f) {
        if (f.kind !== "friction") { var v = fvec(f); sx += v.x; sy += v.y; }
      });
      if (Math.hypot(sx, sy) < 1e-9) return 180;
      return Math.atan2(-sy, -sx) * 180 / Math.PI;
    }
    function draw() {
      dyn.innerHTML = "";
      var cx = body.x, cy = 100 - body.y; /* 屏幕系 */
      var rect = svgEl("rect", { x: cx - body.size / 2, y: cy - body.size / 2,
        width: body.size, height: body.size, "class": "phy-body-box" });
      dyn.appendChild(rect);
      if (body.label) dyn.appendChild(svgText(cx, cy + 1.5, body.label, "phy-body-label"));
      forces.forEach(function (f) {
        var ang = (f.kind === "friction") ? frictionAngle() : f.angle;
        var v = { x: f.mag * Math.cos(ang * Math.PI / 180), y: f.mag * Math.sin(ang * Math.PI / 180) };
        var len = Math.max(3, Math.min(30, f.mag * K));
        var ux = Math.cos(ang * Math.PI / 180), uy = -Math.sin(ang * Math.PI / 180);
        var x2 = cx + ux * len, y2 = cy + uy * len;
        var role = FORCE_KIND_ROLE[f.kind] || "force-c";
        var col = roleColor(role);
        var mid = "fh-" + f.id;
        arrowHead(svg, mid, f.fixed ? cssVar("--phy-track") : cssVar("--phy-" + role));
        var ln = svgEl("line", { x1: cx, y1: cy, x2: x2, y2: y2,
          stroke: f.fixed ? cssVar("--phy-track") : col,
          "stroke-width": f.fixed ? 0.8 : 1.6,
          "stroke-dasharray": f.fixed ? "2,1.4" : "none",
          "marker-end": "url(#" + mid + ")" });
        dyn.appendChild(ln);
        dyn.appendChild(svgText(x2 + ux * 3.5, y2 + uy * 3.5 - 1, f.label, "phy-force-label"));
        /* 黄队 P1 改法 3：fixed 的力箭头旁加 🔒（通用符号，不需说明书） */
        if (f.fixed)
          dyn.appendChild(svgText(x2 + ux * 1.2, y2 + uy * 1.2 - 5.5, "🔒", "phy-lock-icon"));
        if (!f.fixed) {
          var tip = svgEl("circle", { cx: x2, cy: y2, r: 6, "class": "phy-handle",
            fill: col, "aria-label": "拖动" + f.label + "的箭头端点" });
          dyn.appendChild(tip);
          /* 拖端点：改大小+方向；拖箭身：只改方向 */
          dragify(tip, { svg: svg,
            onMove: function (lx, ly) {
              var dx = lx - cx, dy = -(ly - cy); /* y 向上 */
              var d = Math.hypot(dx, dy);
              f.mag = Math.min(f.max, Math.max(f.min, d / K));
              f.angle = Math.atan2(dy, dx) * 180 / Math.PI;
              update(false);
            },
            onEnd: function () { flash(svg); vib(10); update(true); }
          });
          var shaft = svgEl("line", { x1: cx, y1: cy, x2: x2, y2: y2,
            stroke: "transparent", "stroke-width": 8, "class": "phy-shaft-hot" });
          dyn.appendChild(shaft);
          dragify(shaft, { svg: svg,
            onMove: function (lx, ly) {
              var dx = lx - cx, dy = -(ly - cy);
              if (Math.hypot(dx, dy) > 2) f.angle = Math.atan2(dy, dx) * 180 / Math.PI;
              update(false);
            },
            onEnd: function () { flash(svg); update(true); }
          });
        }
      });
      if (showRes) {
        var rx = 0, ry = 0;
        forces.forEach(function (f) {
          var a = ((f.kind === "friction") ? frictionAngle() : f.angle) * Math.PI / 180;
          rx += f.mag * Math.cos(a); ry += f.mag * Math.sin(a);
        });
        var R = Math.hypot(rx, ry);
        if (R > 0.05) {
          var rl = Math.max(3, Math.min(30, R * K));
          var ra = Math.atan2(ry, rx);
          var rex = cx + Math.cos(ra) * rl, rey = cy - Math.sin(ra) * rl;
          arrowHead(svg, "fh-res", cssVar("--phy-target"));
          dyn.appendChild(svgEl("line", { x1: cx, y1: cy, x2: rex, y2: rey,
            stroke: cssVar("--phy-target"), "stroke-width": 2.6, "marker-end": "url(#fh-res)" }));
          dyn.appendChild(svgText(rex + 3, rey - 2, "F合", "phy-force-label phy-res-label"));
        }
      }
    }
    function update() {
      draw();
      var rx = 0, ry = 0;
      forces.forEach(function (f) {
        var a = ((f.kind === "friction") ? frictionAngle() : f.angle) * Math.PI / 180;
        rx += f.mag * Math.cos(a); ry += f.mag * Math.sin(a);
      });
      var R = Math.hypot(rx, ry);
      var r = mmlRead(mi("F") + "<mtext>合</mtext>", fmtN(R, 1), unit);
      badge.setReadout(r.mathml, "F合 = " + r.text);
      var t, tone;
      if (R < 0.5) { t = "静止（合力为零）"; tone = ""; }
      else if (Math.abs(rx) >= Math.abs(ry)) { t = rx > 0 ? "向右加速" : "向左加速"; tone = "ok"; }
      else { t = ry > 0 ? "向上加速" : "向下加速"; tone = "ok"; }
      trend.textContent = t;
      trend.className = "phy-state" + (tone ? " phy-state-" + tone : "");
    }
    update();
    /* 黄队 P1 改法 1：首次进入该页，所有可拖手柄做一次脉冲 + 气泡指引；
     * 动画结束/首次拖拽后永久消失（按页记忆 `phy_hint_seen_<页id>`）。 */
    (function () {
      var key = curPageId + "-force";
      if (!curPageId || hintSeen(key)) return;
      var firstTip = dyn.querySelector(".phy-handle");
      if (firstTip) firstTip.classList.add("phy-handle-pulse");
      var bub = el("div", "phy-hint-bubble", "👆 拖蓝色圆点：改大小和方向；拖箭身：只转方向");
      box.insertBefore(bub, svg);
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
    return box;
  }

  /* ---------------- P2 · motion-sim（运动轨迹模拟） ---------------- */
  function widgetMotionSim(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    if (p.showReadouts === false) badge.box.style.display = "none";
    box.appendChild(badge.box);
    var mode = p.mode;
    var svg = svgStage("", mode === "circle" ? "匀速圆周运动模拟" : "抛体运动轨迹模拟");
    box.appendChild(svg);
    var timeNote = noteLine("");
    timeNote.style.display = "none";
    box.appendChild(timeNote);
    var g = p.g || 9.8;
    var maxF = Math.min(p.maxFrames || 120, 300);
    var ts = p.timeScale == null ? 1 : p.timeScale;
    if (ts !== 1) {
      timeNote.style.display = "";
      timeNote.textContent = ts < 1
        ? "慢放 ×" + ts + "（非真实时间）"
        : "加速 ×" + ts + "（非真实时间）";
    }
    var rafId = 0, playing = false, tCur = 0, tEnd = 1;

    function stopAnim() { playing = false; if (rafId) cafFn(rafId); rafId = 0; }
    var scrubFn = null; /* 模式相关：projectile=时间 scrub，circle=相位 scrub */
    var bar = uiPlaybar({
      onPlay: function () {
        if (tEnd <= 0) return;
        playing = true;
        var t0 = nowMs(), base = tCur;
        var dur = Math.min(3, Math.max(0.6, tEnd / Math.max(ts, 0.05)));
        (function tick() {
          if (!playing) return;
          var el2 = (nowMs() - t0) / 1000;
          tCur = base + el2 / dur * tEnd;
          if (tCur >= tEnd) { tCur = tEnd; stopAnim(); bar.setPlaying(false); }
          if (scrubFn) scrubFn(tCur / tEnd);
          bar.setProgress(tCur / tEnd);
          if (playing) rafId = rafFn(tick);
        })();
      },
      onPause: function () { stopAnim(); },
      onReplay: function () { stopAnim(); tCur = 0; if (scrubFn) scrubFn(0); },
      onScrub: function (f) { stopAnim(); if (scrubFn) scrubFn(f); }
    });
    box.appendChild(bar.bar);

    if (mode === "circle") {
      var om = uiSlider({ label: "角速度 ω", min: p.omega.min, max: p.omega.max,
        step: p.omega.step, init: p.omega.init, unit: "rad/s" });
      box.appendChild(om.row);
      var cx0 = 50, cy0 = 52, RR = 30;
      function drawCirc(f) {
        svg.innerHTML = "";
        svg.appendChild(svgEl("circle", { cx: cx0, cy: cy0, r: RR, "class": "phy-track-circle" }));
        var a = f * om.get() * tEndC;
        var bx = cx0 + RR * Math.cos(a), by = cy0 - RR * Math.sin(a);
        arrowHead(svg, "fh-c", cssVar("--phy-target"));
        svg.appendChild(svgEl("line", { x1: bx, y1: by, x2: cx0, y2: cy0,
          stroke: cssVar("--phy-target"), "stroke-width": 1.8, "marker-end": "url(#fh-c)" }));
        svg.appendChild(svgText((bx + cx0) / 2 + 3, (by + cy0) / 2, "F向", "phy-force-label"));
        var ball = svgEl("circle", { cx: bx, cy: by, r: 3.2, "class": "phy-ball" });
        svg.appendChild(ball);
        var T = 2 * Math.PI / om.get();
        var r = mmlRead(mi("T"), fmtN(T, 2), "s");
        badge.setReadout(r.mathml, "T = 2π/ω = " + r.text);
      }
      var tEndC = 2 * Math.PI / om.get();
      om.on(function () { tEndC = 2 * Math.PI / om.get(); tCur = 0; bar.setProgress(0); drawCirc(0); });
      scrubFn = function (f) { drawCirc(f); };
      /* 圆周拖动手柄：拖小球改相位（角速度仍由滑块定） */
      var dragDot = null;
      svg.addEventListener("pointerdown", function (e) {
        var q = toSVG(svg, e.clientX, e.clientY);
        if (Math.hypot(q.x - 50, q.y - 52) < 45) {
          stopAnim(); bar.setPlaying(false);
          var f0 = Math.atan2(-(q.y - 52), q.x - 50) / (om.get() * tEndC);
          drawCirc(((f0 % 1) + 1) % 1);
        }
      });
      drawCirc(0);
      return box;
    }

    /* 抛体 */
    var v0s = uiSlider({ label: "初速度 v₀", min: p.v0.min, max: p.v0.max,
      step: p.v0.step, init: p.v0.init, unit: "m/s" });
    var ags = uiSlider({ label: "发射角 θ", min: p.angle.min, max: p.angle.max,
      step: p.angle.step, init: p.angle.init, unit: "°" });
    box.appendChild(v0s.row);
    box.appendChild(ags.row);
    var traj = [];
    function recompute() {
      stopAnim(); bar.setPlaying(false); bar.setProgress(0); tCur = 0;
      var v0 = v0s.get(), th = ags.get() * Math.PI / 180;
      traj = [];
      if (v0 <= 0) {
        bar.playBtn.disabled = true;
        badge.setReadout("", "初速度不能为 0");
        svg.innerHTML = "";
        svg.appendChild(svgText(50, 50, "初速度不能为 0", "phy-note-text"));
        tEnd = 0;
        return;
      }
      bar.playBtn.disabled = false;
      var T = 2 * v0 * Math.sin(th) / g;
      var R = v0 * Math.cos(th) * T;
      var H = Math.pow(v0 * Math.sin(th), 2) / (2 * g);
      tEnd = T;
      var n = Math.min(maxF, 300);
      for (var i = 0; i <= n; i++) {
        var t = T * i / n;
        traj.push({ t: t, x: v0 * Math.cos(th) * t, y: v0 * Math.sin(th) * t - 0.5 * g * t * t });
      }
      var Rd = Math.max(R, 1), Hd = Math.max(H, 1);
      function X(x) { return 8 + x / Rd * 80; }
      function Y(y) { return 90 - y / Hd * 76; }
      svg.innerHTML = "";
      svg.appendChild(svgEl("line", { x1: 6, y1: 90, x2: 94, y2: 90, "class": "phy-ground" }));
      svg.appendChild(svgText(8, 95, "起点", "phy-note-text", "start"));
      if (th > 89 * Math.PI / 180 || R < 0.01) {
        svg.appendChild(svgEl("line", { x1: X(0), y1: Y(0), x2: X(0), y2: Y(Hd),
          "class": "phy-trace-vert" }));
        svg.appendChild(svgText(X(0) + 4, Y(Hd / 2), "竖直上抛是抛体的特例", "phy-note-text", "start"));
      } else {
        var pts = traj.map(function (q) { return X(q.x).toFixed(1) + "," + Y(q.y).toFixed(1); }).join(" ");
        var pl = svgEl("polyline", { points: pts, "class": "phy-trace" });
        svg.appendChild(pl);
        svg.appendChild(svgEl("circle", { cx: X(0), cy: Y(0), r: 1.6, "class": "phy-dot-start" }));
        svg.appendChild(svgEl("circle", { cx: X(R), cy: Y(0), r: 1.6, "class": "phy-dot-end" }));
        svg.appendChild(svgText(X(R), 95, "落点", "phy-note-text"));
      }
      /* 发射手柄（蓝色可拖视觉约定）↔ 滑块双向同步 */
      if (p.dragHandle !== false && bar.playBtn && !bar.playBtn.disabled) {
        var hx = X(Math.min(v0 * 0.35, Rd * 0.4)), hy = Y(0) - 8;
        var hd = svgEl("circle", { cx: hx, cy: hy, r: 6, "class": "phy-handle-blue",
          fill: cssVar("--phy-known"), "aria-label": "拖动发射手柄改初速度和发射角" });
        svg.appendChild(hd);
        dragify(hd, { svg: svg,
          onMove: function (lx, ly) {
            var dx = Math.max(2, lx - X(0)), dy = Math.max(1, Y(0) - ly);
            var nv = Math.min(p.v0.max, Math.max(p.v0.min, dx / (X(Rd) - X(0)) * Rd * 2.2));
            var na = Math.min(p.angle.max, Math.max(p.angle.min,
              Math.atan2(dy, dx) * 180 / Math.PI));
            v0s.set(nv, true); ags.set(na, true);
            recompute();
          },
          onEnd: function () { flash(hd); }
        });
      }
      var Rm = "<math><mrow><mi>R</mi><mo>=</mo><mn>" + fmtN(R, 1) +
        "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">m</mi><mo>,</mo>" +
        "<mi>H</mi><mo>=</mo><mn>" + fmtN(H, 1) +
        "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">m</mi><mo>,</mo>" +
        "<mi>T</mi><mo>=</mo><mn>" + fmtN(T, 2) +
        "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">s</mi></mrow></math>";
      badge.setReadout(Rm, "R=" + fmtN(R, 1) + " m，H=" + fmtN(H, 1) + " m，T=" + fmtN(T, 2) + " s");
      draw(0);
    }
    function draw(f) {
      var old = svg.querySelector(".phy-ball");
      if (old && old.parentNode) old.parentNode.removeChild(old);
      if (!traj || !traj.length) return;
      var i = Math.min(traj.length - 1, Math.round(f * (traj.length - 1)));
      var q = traj[i];
      var Rd = Math.max.apply(null, traj.map(function (z) { return z.x; }).concat([1]));
      var Hd = Math.max.apply(null, traj.map(function (z) { return z.y; }).concat([1]));
      var ball = svgEl("circle", { cx: 8 + q.x / Rd * 80, cy: 90 - q.y / Hd * 76,
        r: 2.6, "class": "phy-ball" });
      svg.appendChild(ball);
      if (f >= 1) { flash(svg); vib(10); }
    }
    v0s.on(recompute); ags.on(recompute);
    scrubFn = function (f) { tCur = f * tEnd; draw(f); };
    recompute();
    return box;
  }

  /* ---------------- P3 · circuit-build（电路搭建） ---------------- */
  /* 降级约束（§12.2）：只做单回路串联解析求解 I=U/ΣR + 固定双支路并联
   * 模板；元件 ≤8；不做通用节点分析（MNA）。 */
  var CIRCUIT_KIND_ZH = { battery: "电源", bulb: "灯泡", "switch": "开关",
    ammeter: "电流表", voltmeter: "电压表", resistor: "电阻", rheostat: "滑动变阻器", wire: "导线" };
  function circuitR(c) {
    if (c.kind === "bulb") return c.value || 12;
    if (c.kind === "resistor") return c.value || 20;
    if (c.kind === "rheostat") return rheoR(c);
    return 0; /* 电流表内阻视为 0（初中教学约定）；开关/导线 0；
                 电压表串联另判"≈断路"，不走此分支 */
  }
  /* 滑动变阻器接入电阻 = min + frac*(max-min)；
   * init 缺省=阻值最大处（"开关闭合前滑片移到阻值最大处"，规范动作） */
  function rheoCfg(c) {
    var mn = c.min != null ? c.min : 0, mx = c.max != null ? c.max : 50;
    if (!(mx > mn)) mx = mn + 1;
    return { min: mn, max: mx, step: c.step || (mx - mn) / 50 || 1 };
  }
  function rheoR(c) {
    var cfg = rheoCfg(c);
    var f = c.frac != null ? Math.max(0, Math.min(1, c.frac)) : 1;
    return cfg.min + f * (cfg.max - cfg.min);
  }
  function rheoX(c, cc, s) {
    var f = c.frac != null ? Math.max(0, Math.min(1, c.frac)) : 1;
    return cc.x - s * 0.3 + f * s * 0.6;
  }
  function widgetCircuitBuild(p) {
    var box = el("div", "phy-widget");
    if (p.goal) box.appendChild(el("div", "phy-goal", "🎯 " + p.goal));
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var cols = p.grid.cols, rows = p.grid.rows;
    var cw = 100 / cols, chh = 100 / rows;
    var U = (p.battery && p.battery.voltage) || 3;
    var trayKinds = p.tray || ["battery", "bulb", "switch", "ammeter", "voltmeter", "resistor", "rheostat", "wire"];
    var comps = (p.components || []).map(function (c, i) {
      var o = { id: c.id || ("c" + i), kind: c.kind, cell: [c.cell[0], c.cell[1]],
        value: c.value, on: c.kind === "switch" ? false : undefined };
      if (c.kind === "rheostat") {
        var rcfg = rheoCfg(c);
        o.min = rcfg.min; o.max = rcfg.max; o.step = rcfg.step;
        var initR = c.init != null ? c.init : rcfg.max; /* 缺省滑片在阻值最大处 */
        o.frac = Math.max(0, Math.min(1, (initR - rcfg.min) / (rcfg.max - rcfg.min)));
      }
      if (c.kind === "voltmeter") {
        o.across = c.across || null;
        o.range = c.range || { max: 15 };
        o.divisions = c.divisions != null ? c.divisions : 0.5;
      }
      return o;
    });
    var svg = svgStage("phy-circuit", "电路搭建：从元件库拖元件到网格");
    /* 单元格热区（格点间距 ≥13 逻辑单位：cols=6 时 16.7 ✓） */
    var hitLayer = svgEl("g", {});
    var cells = [];
    for (var r = 0; r < rows; r++) for (var c = 0; c < cols; c++) {
      (function (cc, rr) {
        var h = svgEl("rect", { x: cc * cw + 0.5, y: rr * chh + 0.5,
          width: cw - 1, height: chh - 1, "class": "phy-cell" });
        h.addEventListener("pointerdown", function (e) { cellDown(cc, rr, e); });
        hitLayer.appendChild(h); cells.push(h);
      })(c, r);
    }
    svg.appendChild(hitLayer);
    var wireLayer = svgEl("g", {}); svg.appendChild(wireLayer);
    var compLayer = svgEl("g", {}); svg.appendChild(compLayer);
    /* P3 审计 P1：元件符号层盖在 cell 热区 rect 上层，点按符号落不到
     * 热区 → 开关点按无反应。符号层点按委托到所在 cell 的同一处理
     * 路径（cellDown）：点开关切换开合，其余元件走原拖拽逻辑。
     * 滑片手柄（phy-handle-hit）自有 dragify，此处跳过避免双处理。 */
    compLayer.addEventListener("pointerdown", function (e) {
      try {
        var t = e.target;
        while (t && t !== compLayer) {
          var cl = t.getAttribute ? t.getAttribute("class") : null;
          if (cl && String(cl).indexOf("phy-handle-hit") >= 0) return;
          t = t.parentNode;
        }
      } catch (err) {}
      var q = toSVG(svg, e.clientX, e.clientY);
      var cc = Math.max(0, Math.min(cols - 1, Math.floor(q.x / cw)));
      var rr = Math.max(0, Math.min(rows - 1, Math.floor(q.y / chh)));
      if (!compAt(cc, rr)) return;
      cellDown(cc, rr, e);
    });
    var stateLine = stateBadge("把元件拖到网格里", "");
    box.appendChild(svg);
    var ctrlBox = el("div", "phy-circuit-ctrls"); /* 滑动变阻器滑片滑块行 */
    box.appendChild(ctrlBox);
    var voltBox = el("div", "phy-volt-read");     /* 电压表读数行 */
    box.appendChild(voltBox);
    box.appendChild(stateLine);
    var notes = el("div", "phy-circuit-notes");
    box.appendChild(notes);
    var tray = el("div", "phy-tray");
    tray.setAttribute("aria-label", "元件库");
    box.appendChild(tray);
    /* 滑动变阻器运行时引用（每轮 solve() 重建） */
    var rheoValNodes = {}, rheoCtrls = {}, rheoDrag = {};
    var autoBtn = el("button", "phy-auto", "一键连好示范电路");
    autoBtn.type = "button";
    var autoBubble = null, autoTipT = 0;
    function dismissAutoBubble() {
      if (autoTipT) { clearTimeout(autoTipT); autoTipT = 0; }
      if (autoBubble && autoBubble.parentNode) autoBubble.parentNode.removeChild(autoBubble);
      autoBubble = null;
      try {
        var sws = compLayer.querySelectorAll(".phy-switch-pulse");
        for (var si = 0; si < sws.length; si++) sws[si].classList.remove("phy-switch-pulse");
      } catch (e) {}
    }
    autoBtn.addEventListener("click", function () {
      /* 2×2 方形无弦回路：非相邻元件在网格上不相邻，避免零电阻"弦"回路误判短路 */
      comps = [
        { id: "bat1", kind: "battery", cell: [2, 1] },
        { id: "s1", kind: "switch", cell: [3, 1], on: false },
        { id: "b1", kind: "bulb", cell: [3, 2] },
        { id: "w1", kind: "wire", cell: [2, 2] }
      ];
      solve(); flash(svg);
      /* 黄队 P3 改法 2："一键连好"不自动闭合开关（动手权留给学生）；
       * 开关持续呼吸脉冲 + 气泡"差一步：把开关闭合，灯才会亮！"；
       * 8 秒无操作，exploreTip 高亮闪烁一次。 */
      dismissAutoBubble();
      try {
        var swg = compLayer.querySelector(".phy-switch");
        if (swg) swg.classList.add("phy-switch-pulse");
      } catch (e) {}
      autoBubble = el("div", "phy-hint-bubble", "💡 差一步：把开关闭合，灯才会亮！");
      box.insertBefore(autoBubble, ctrlBox);
      autoTipT = setTimeout(function () {
        autoTipT = 0;
        var s1 = null;
        comps.forEach(function (c) { if (!s1 && c.kind === "switch") s1 = c; });
        if (s1 && !s1.on) {
          try {
            var zone = box.parentNode;
            var tip = zone && zone.querySelector ? zone.querySelector(".phy-tip") : null;
            if (tip) {
              tip.classList.add("phy-tip-flash");
              setTimeout(function () { tip.classList.remove("phy-tip-flash"); }, 1100);
            }
          } catch (e) {}
        }
      }, 8000);
    });
    box.appendChild(autoBtn);

    function cellCenter(cell) { return { x: (cell[0] + 0.5) * cw, y: (cell[1] + 0.5) * chh }; }
    function compAt(cc, rr) {
      for (var i = 0; i < comps.length; i++)
        if (comps[i].cell[0] === cc && comps[i].cell[1] === rr) return comps[i];
      return null;
    }
    function adjOf() {
      var m = {};
      comps.forEach(function (a) {
        m[a.id] = [];
        comps.forEach(function (b) {
          if (a === b) return;
          var d = Math.abs(a.cell[0] - b.cell[0]) + Math.abs(a.cell[1] - b.cell[1]);
          if (d === 1) m[a.id].push(b.id);
        });
      });
      return m;
    }
    function byId(id) { for (var i = 0; i < comps.length; i++) if (comps[i].id === id) return comps[i]; return null; }
    /* 电压表是"探头"：只并联测量，不进回路拓扑（表笔虚线另画） */
    function adjNoVolt() {
      var adj = adjOf(), out = {};
      Object.keys(adj).forEach(function (id) {
        var c = byId(id);
        if (c && c.kind === "voltmeter") return;
        out[id] = adj[id].filter(function (x) {
          var q = byId(x);
          return !(q && q.kind === "voltmeter");
        });
      });
      return out;
    }

    /* ---- GB/T 4728 元件符号（符号本身即第一编码） ---- */
    function drawSymbol(g, comp) {
      var cc = cellCenter(comp.cell), s = Math.min(cw, chh) * 0.62;
      var col = cssVar("--phy-body");
      function line(x1, y1, x2, y2, w, dash) {
        g.appendChild(svgEl("line", { x1: cc.x + x1, y1: cc.y + y1, x2: cc.x + x2, y2: cc.y + y2,
          stroke: col, "stroke-width": w || 1, "stroke-dasharray": dash || "none" }));
      }
      if (comp.kind === "battery") {
        g.appendChild(svgEl("line", { x1: cc.x - s * 0.18, y1: cc.y - s * 0.28,
          x2: cc.x - s * 0.18, y2: cc.y + s * 0.28, stroke: col, "stroke-width": 1.6 }));
        g.appendChild(svgEl("line", { x1: cc.x + s * 0.18, y1: cc.y - s * 0.14,
          x2: cc.x + s * 0.18, y2: cc.y + s * 0.14, stroke: col, "stroke-width": 3 }));
        g.appendChild(svgText(cc.x - s * 0.18, cc.y - s * 0.36, "+", "phy-sym-label", "middle"));
        g.appendChild(svgText(cc.x + s * 0.18, cc.y - s * 0.24, "−", "phy-sym-label", "middle"));
      } else if (comp.kind === "bulb") {
        g.appendChild(svgEl("circle", { cx: cc.x, cy: cc.y, r: s * 0.3,
          fill: "none", stroke: col, "stroke-width": 1.2 }));
        line(-s * 0.2, -s * 0.2, s * 0.2, s * 0.2, 1);
        line(-s * 0.2, s * 0.2, s * 0.2, -s * 0.2, 1);
      } else if (comp.kind === "switch") {
        /* 黄队 P3 改法 1：闸刀开关描黄色呼吸发光边（可点性宣告）。
         * 首次进入该页脉冲 3 次后转常亮弱描边（按页记忆）。 */
        var sw = svgEl("g", { "class": "phy-switch" + (hintSeen(curPageId + "-circuit") ? "" : " phy-switch-first"),
          "data-id": comp.id });
        sw.appendChild(svgEl("circle", { cx: cc.x - s * 0.32, cy: cc.y, r: 1.1, fill: col }));
        sw.appendChild(svgEl("circle", { cx: cc.x + s * 0.32, cy: cc.y, r: 1.1, fill: col }));
        if (comp.on) sw.appendChild(svgEl("line", { x1: cc.x - s * 0.32, y1: cc.y,
          x2: cc.x + s * 0.32, y2: cc.y, stroke: col, "stroke-width": 1.4 }));
        else {
          sw.appendChild(svgEl("line", { x1: cc.x - s * 0.32, y1: cc.y,
            x2: cc.x + s * 0.1, y2: cc.y - s * 0.3, stroke: col, "stroke-width": 1.4 }));
          sw.appendChild(svgEl("circle", { cx: cc.x + s * 0.1, cy: cc.y - s * 0.3, r: 1.1, fill: col }));
        }
        sw.appendChild(svgText(cc.x, cc.y + s * 0.48, comp.on ? "闭合" : "断开", "phy-sym-label"));
        sw.appendChild(svgText(cc.x, cc.y + s * 0.48 + 5, "点我开/合", "phy-switch-hint"));
        g.appendChild(sw);
      } else if (comp.kind === "ammeter") {
        g.appendChild(svgEl("circle", { cx: cc.x, cy: cc.y, r: s * 0.3,
          fill: "none", stroke: col, "stroke-width": 1.2 }));
        g.appendChild(svgText(cc.x, cc.y + 1.8, "A", "phy-sym-label"));
      } else if (comp.kind === "resistor") {
        g.appendChild(svgEl("rect", { x: cc.x - s * 0.3, y: cc.y - s * 0.13,
          width: s * 0.6, height: s * 0.26, fill: "none", stroke: col, "stroke-width": 1.2 }));
      } else if (comp.kind === "rheostat") {
        /* GB/T 4728 滑动变阻器：电阻框 + 斜箭头（滑动触头） */
        g.appendChild(svgEl("rect", { x: cc.x - s * 0.3, y: cc.y - s * 0.13,
          width: s * 0.6, height: s * 0.26, fill: "none", stroke: col, "stroke-width": 1.2 }));
        arrowHead(svg, "fh-rheo", col);
        g.appendChild(svgEl("line", { x1: cc.x - s * 0.34, y1: cc.y + s * 0.24,
          x2: cc.x + s * 0.34, y2: cc.y - s * 0.24,
          stroke: col, "stroke-width": 1.1, "marker-end": "url(#fh-rheo)" }));
        /* 滑片手柄：可视圆（橙色，第二编码）+ 隐形大热区（r=7，直径 14 ≥ 6 逻辑单位） */
        var hx = rheoX(comp, cc, s);
        var hd = svgEl("circle", { cx: hx, cy: cc.y - s * 0.13, r: 2.4,
          fill: cssVar("--phy-target"), "class": "phy-handle" });
        var hit = svgEl("circle", { cx: hx, cy: cc.y - s * 0.13, r: 7,
          fill: "transparent", "class": "phy-handle-hit", "aria-label": "拖动滑片改变接入电阻" });
        g.appendChild(hd); g.appendChild(hit);
        var rv = svgText(cc.x, cc.y + s * 0.62 + 4.5, "", "phy-rheo-val");
        rv.textContent = "R=" + fmtN(rheoR(comp), 1) + "Ω";
        g.appendChild(rv);
        rheoValNodes[comp.id] = rv;
        rheoDrag[comp.id] = { hd: hd, hit: hit, cc: { x: cc.x, y: cc.y }, s: s };
        (function (cp, ccx, ss) {
          dragify(hit, { svg: svg, onMove: function (lx) {
            var f = (lx - (ccx - ss * 0.3)) / (ss * 0.6);
            cp.frac = Math.max(0, Math.min(1, f));
            moveRheoHandle(cp);
            liveRheo();
          }, onEnd: function () { solve(); flash(svg); vib(10); } });
        })(comp, cc.x, s);
      } else if (comp.kind === "voltmeter") {
        /* GB/T 4728 电压表：圆圈 + V */
        g.appendChild(svgEl("circle", { cx: cc.x, cy: cc.y, r: s * 0.3,
          fill: "none", stroke: col, "stroke-width": 1.2 }));
        g.appendChild(svgText(cc.x, cc.y + 1.8, "V", "phy-sym-label"));
        /* 表笔虚线：连到被测用电器（across），双编码：虚线 + "测×"文字 */
        var tgt = comp.across ? byId(comp.across) : null;
        if (tgt) {
          var tc = cellCenter(tgt.cell);
          g.appendChild(svgEl("line", { x1: cc.x, y1: cc.y, x2: tc.x, y2: tc.y,
            stroke: cssVar("--phy-target"), "stroke-width": 1, "stroke-dasharray": "2.5,2" }));
          g.appendChild(svgText((cc.x + tc.x) / 2, (cc.y + tc.y) / 2 - 2,
            "测" + (CIRCUIT_KIND_ZH[tgt.kind] || tgt.kind), "phy-sym-label"));
        }
      }
      /* wire：只连通，不画符号 */
      var lb = svgText(cc.x, cc.y + s * 0.62, CIRCUIT_KIND_ZH[comp.kind] || comp.kind, "phy-sym-label");
      compLayer.appendChild(lb);
      return cc;
    }

    /* ---- 求解 ---- */
    function findCycles(adj, batId) {
      var cycles = [];
      function dfs(cur, path) {
        if (cycles.length >= 20 || path.length > comps.length + 1) return;
        var nbs = adj[cur] || [];
        for (var i = 0; i < nbs.length; i++) {
          var nb = nbs[i];
          /* 成环至少 3 个不同节点：排除"去又回"的 2 节点退化路径（否则任何闭环都误判短路） */
          if (nb === batId && path.length >= 3) { cycles.push(path.slice()); continue; }
          if (path.indexOf(nb) >= 0) continue;
          path.push(nb); dfs(nb, path); path.pop();
        }
      }
      dfs(batId, [batId]);
      /* 去重（轮换同一环） */
      var seen = {}, out = [];
      cycles.forEach(function (cy) {
        var key = cy.slice().sort().join(",");
        if (!seen[key]) { seen[key] = 1; out.push(cy); }
      });
      return out;
    }
    function cycleR(cy) {
      var s = 0;
      for (var i = 0; i < cy.length; i++) {
        var c = byId(cy[i]);
        if (!c || c.kind === "battery") continue;
        if (c.kind === "voltmeter") return -1; /* 电压表内阻极大，串联≈断路 */
        if (c.kind === "switch" && !c.on) return -1; /* 断开 */
        s += circuitR(c);
      }
      return s;
    }
    /* 单回路串联解析求解（降级约束）：返回 {cy, adj, bat, R, I} 或 null；
     * 电压表不进拓扑（探头），避免"挨着放"破坏串联判定 */
    function seriesSolution() {
      var adj = adjNoVolt();
      var bat = null;
      comps.forEach(function (c) { if (!bat && c.kind === "battery") bat = c; });
      if (!bat) return null;
      var cycles = findCycles(adj, bat.id);
      var valid = cycles.filter(function (cy) { return cycleR(cy) >= 0; });
      if (valid.length !== 1) return null;
      var degs = valid[0].map(function (id) { return (adj[id] || []).length; });
      if (Math.max.apply(null, degs) > 2) return null;
      var R = cycleR(valid[0]);
      return { cy: valid[0], adj: adj, bat: bat, R: R, I: U / R };
    }
    /* 电压表被串进回路（除此之外回路是通的）→ "≈断路"教学判定；
     * 用全邻接检测（探头语义下电压表本不该出现在回路里） */
    function voltBlocked() {
      var full = adjOf(), bat = null;
      comps.forEach(function (c) { if (!bat && c.kind === "battery") bat = c; });
      if (!bat) return false;
      var cycles = findCycles(full, bat.id);
      for (var i = 0; i < cycles.length; i++) {
        var cy = cycles[i], hasV = false, ok = true;
        for (var j = 0; j < cy.length; j++) {
          var c = byId(cy[j]);
          if (!c || c.kind === "battery") continue;
          if (c.kind === "voltmeter") { hasV = true; continue; }
          if (c.kind === "switch" && !c.on) { ok = false; break; }
        }
        if (hasV && ok) return true;
      }
      return false;
    }
    /* 串联读数行（MathML）：I = … A；有滑动变阻器时追加 R滑 = … Ω */
    function seriesReadout(sol) {
      var parts = [{ sym: "I", mml: mi("I"), v: fmtN(sol.I, 2), u: "A" }];
      sol.cy.map(byId).forEach(function (c) {
        if (c && c.kind === "rheostat")
          parts.push({ sym: "R滑", mml: "<msub><mi>R</mi><mtext>滑</mtext></msub>",
            v: fmtN(rheoR(c), 1), u: "Ω" });
      });
      var m = "<math><mrow>" + parts.map(function (p, i) {
        return (i ? '<mspace width="0.6em"/><mtext>；</mtext><mspace width="0.6em"/>' : "") +
          p.mml + "<mo>=</mo><mn>" + esc(p.v) + "</mn>" +
          (p.u ? '<mspace width="0.25em"/><mi mathvariant="normal">' + esc(p.u) + "</mi>" : "");
      }).join("") + "</mrow></math>";
      var t = parts.map(function (p) {
        return p.sym + " = " + p.v + (p.u ? " " + p.u : "");
      }).join("；");
      return { mathml: m, text: t };
    }
    /* 滑片拖动时的轻量联动：只更读数/手柄位置，不重建 DOM（拖拽中保持 pointer capture） */
    function moveRheoHandle(c) {
      var d = rheoDrag[c.id];
      if (d) {
        var hx = rheoX(c, d.cc, d.s);
        d.hd.setAttribute("cx", hx); d.hit.setAttribute("cx", hx);
      }
      if (rheoValNodes[c.id])
        rheoValNodes[c.id].textContent = "R=" + fmtN(rheoR(c), 1) + "Ω";
      var ctl = rheoCtrls[c.id];
      if (ctl) ctl.set(rheoR(c), true);
    }
    function liveRheo() {
      var sol = seriesSolution();
      if (sol) {
        var sr = seriesReadout(sol);
        badge.setReadout(sr.mathml, sr.text);
      } else {
        badge.setReadout("", "I = —");
      }
      comps.forEach(function (c) {
        if (c.kind === "rheostat" && rheoValNodes[c.id])
          rheoValNodes[c.id].textContent = "R=" + fmtN(rheoR(c), 1) + "Ω";
      });
    }
    /* 滑动变阻器滑块行（W-P9：原生 range ≥44px + −/+ 步进；与 SVG 滑片双向同步） */
    function buildRheoCtrls() {
      ctrlBox.innerHTML = ""; rheoCtrls = {};
      comps.forEach(function (c) {
        if (c.kind !== "rheostat") return;
        var cfg = rheoCfg(c);
        var ctl = uiSlider({ label: "滑动变阻器滑片", min: cfg.min, max: cfg.max,
          step: cfg.step, init: rheoR(c), unit: "Ω",
          fmt: function (v) { return "R=" + fmtN(v, 1); } });
        ctrlBox.appendChild(ctl.row);
        rheoCtrls[c.id] = ctl;
        ctl.on(function (v) {
          c.frac = (v - cfg.min) / ((cfg.max - cfg.min) || 1);
          moveRheoHandle(c);
          liveRheo();
        });
        ctl.input.addEventListener("change", function () { solve(); flash(svg); });
      });
    }
    /* 电压表读数行（MathML）：U_被测 = I·R_被测；量程/分度值可配，超量程警告 */
    var VOLT_SUB = { bulb: "灯泡", resistor: "电阻", rheostat: "变阻器", battery: "电源" };
    function drawVoltmeters(sol) {
      voltBox.innerHTML = "";
      comps.forEach(function (c) {
        if (c.kind !== "voltmeter") return;
        var tgt = c.across ? byId(c.across) : null;
        var div = c.divisions != null ? c.divisions : 0.5;
        var dec = (String(div).split(".")[1] || "").length;
        var line = el("div", "phy-volt-line", "");
        var sub = tgt ? (VOLT_SUB[tgt.kind] || "用电器") : "";
        if (tgt && sol && sol.cy.indexOf(tgt.id) >= 0) {
          var Uv = tgt.kind === "battery" ? U : sol.I * circuitR(tgt);
          var m = "<math><mrow><msub><mi>U</mi><mtext>" + esc(sub) + "</mtext></msub>" +
            "<mo>=</mo><mn>" + esc(fmtN(Uv, dec)) + "</mn>" +
            '<mspace width="0.25em"/><mi mathvariant="normal">V</mi></mrow></math>';
          if (mathmlOK()) line.innerHTML = m;
          else line.textContent = "U" + sub + " = " + fmtN(Uv, dec) + " V";
          var mx = c.range && c.range.max != null ? c.range.max : 15;
          if (Uv > mx + 1e-9)
            line.appendChild(el("span", "phy-warn", " ⚠ 超出电压表量程（" + mx + " V），换大量程再测"));
        } else {
          line.textContent = "U" + sub + " = —" +
            (!tgt ? "（电压表还没连上被测用电器：拖到用电器旁边会自动连表笔）"
                  : "（电路未形成通路，或被测元件不在回路中）");
        }
        voltBox.appendChild(line);
      });
    }
    function orderedLoop(adj, batId) {
      /* 从电池出发，优先走 + 极（符号左侧长板）方向，沿环走一圈 */
      var order = [batId], prev = null, cur = batId;
      var bxy = cellCenter(byId(batId).cell);
      function prefer(nbs) {
        return nbs.slice().sort(function (a, b) {
          var pa = cellCenter(byId(a).cell), pb = cellCenter(byId(b).cell);
          return (pa.x - bxy.x) - (pb.x - bxy.x) ||
                 Math.abs(pa.y - bxy.y) - Math.abs(pb.y - bxy.y);
        });
      }
      var guard = 0;
      while (guard++ < comps.length + 2) {
        var nbs = (adj[cur] || []).filter(function (x) { return x !== prev; });
        if (!nbs.length) break;
        var nx = (cur === batId && prev === null) ? prefer(nbs)[0] : nbs[0];
        if (nx === batId) break;
        order.push(nx); prev = cur; cur = nx;
      }
      return order;
    }

    function solve() {
      wireLayer.innerHTML = ""; compLayer.innerHTML = ""; notes.innerHTML = "";
      voltBox.innerHTML = ""; ctrlBox.innerHTML = "";
      rheoValNodes = {}; rheoCtrls = {}; rheoDrag = {};
      var adj = adjNoVolt(); /* 电压表是探头：不画实线、不进回路判定 */
      /* 导线：相邻格点自动连线 */
      var drawn = {};
      comps.forEach(function (a) {
        (adj[a.id] || []).forEach(function (bid) {
          var key = [a.id, bid].sort().join("|");
          if (drawn[key]) return; drawn[key] = 1;
          var pa = cellCenter(a.cell), pb = cellCenter(byId(bid).cell);
          wireLayer.appendChild(svgEl("line", { x1: pa.x, y1: pa.y, x2: pb.x, y2: pb.y,
            stroke: cssVar("--phy-body"), "stroke-width": 1.2 }));
        });
      });
      comps.forEach(function (c) { drawSymbol(compLayer, c); });
      buildRheoCtrls(); /* 滑动变阻器滑块行（与 SVG 滑片双向同步） */
      /* 元件总数 ≤8（降级约束） */
      var bat = null;
      comps.forEach(function (c) { if (!bat && c.kind === "battery") bat = c; });
      function setState(text, tone) {
        stateLine.textContent = text;
        stateLine.className = "phy-state" + (tone ? " phy-state-" + tone : "");
      }
      if (!bat) {
        setState("断路（还没有电源）", ""); badge.setReadout("", "I = —");
        drawVoltmeters(null);
        return;
      }
      var cycles = findCycles(adj, bat.id);
      var valid = cycles.filter(function (cy) { return cycleR(cy) >= 0; });
      /* 短路：含电池的零电阻环（导线直连电源两极） */
      var short = valid.some(function (cy) { return cycleR(cy) === 0; });
      /* 烧表：电流表被并联在用电器/电源两端 */
      var hasBranch = comps.some(function (c) { return (adj[c.id] || []).length >= 3; });
      var burn = false;
      comps.forEach(function (c) {
        if (c.kind !== "ammeter" || !hasBranch) return;
        var nbs = adj[c.id] || [];
        /* 去掉电流表后，其两邻点若经含电池/用电器路径连通 → 被并联 */
        var adj2 = adjOf();
        Object.keys(adj2).forEach(function (k) {
          adj2[k] = adj2[k].filter(function (x) { return x !== c.id; });
        });
        for (var i = 0; i < nbs.length && !burn; i++) for (var j = i + 1; j < nbs.length && !burn; j++) {
          var path = bfsPath(adj2, nbs[i], nbs[j]);
          if (path && path.some(function (id) {
            var q = byId(id);
            return q && (q.kind === "battery" || q.kind === "bulb" || q.kind === "resistor");
          })) burn = true;
        }
      });
      if (short) {
        setState("短路！电流过大", "bad");
        notes.appendChild(noteLine("⚠ 导线直接连了电源两极——短路电流很大，会烧坏电源，绝不允许。"));
        badge.setReadout("", "I = —（断路态）");
        drawVoltmeters(null);
        flash(stateLine);
        return;
      }
      if (burn) {
        setState("断路", "");
        var w = stateBadge("⚠ 烧表警告：电流表内阻极小，并联会近乎短路，大电流烧表——电流表只能串联，绝不并联", "bad");
        notes.appendChild(w);
        badge.setReadout("", "I = —（断路态）");
        drawVoltmeters(null);
        flash(w);
        return;
      }
      /* 串联单环（解析求解 I=U/ΣR） */
      var sol = seriesSolution();
      if (!sol && voltBlocked()) {
        setState("断路（电压表串联≈断路）", "");
        notes.appendChild(noteLine("电压表内阻极大，理想时看作断路——只能并联在用电器两端，串进回路等于把路断开。"));
        badge.setReadout("", "U = —（断路态）");
        drawVoltmeters(null);
        flash(stateLine);
        return;
      }
      if (sol) {
        var order = orderedLoop(sol.adj, sol.bat.id);
        drawCurrent(order);
        var bulbs = sol.cy.map(byId).filter(function (c) { return c && c.kind === "bulb"; });
        var tier = sol.I < 0.15 ? "暗" : sol.I < 0.5 ? "亮" : "很亮";
        bulbs.forEach(function (b) { glowBulb(b, tier); });
        var amm = sol.cy.map(byId).filter(function (c) { return c && c.kind === "ammeter"; })[0];
        setState("通路", "ok");
        var extra = amm ? "（电流表读数）" : "";
        var sr = seriesReadout(sol);
        badge.setReadout(sr.mathml, sr.text + extra);
        notes.appendChild(noteLine("灯泡" + tier + "（" + bulbs.length + " 只）" +
          (amm ? "；电流表读数 " + fmtN(sol.I, 2) + " A" : "；电流表内阻视为 0") + "。"));
        drawVoltmeters(sol);
        return;
      }
      /* 固定双支路并联模板（allowParallel） */
      if (p.allowParallel && hasBranch) {
        var branches = Object.keys(adj).filter(function (id) { return adj[id].length >= 3; });
        if (branches.length === 2) {
          var paths = branchPaths(adj, branches[0], branches[1]);
          var batPath = null, loadPaths = [];
          paths.forEach(function (ph) {
            if (ph.some(function (id) { return byId(id).kind === "battery"; })) batPath = ph;
            else loadPaths.push(ph);
          });
          var okT = batPath && loadPaths.length === 2 && loadPaths.every(function (ph) {
            var bulbs = ph.filter(function (id) { return byId(id).kind === "bulb"; });
            var bad = ph.some(function (id) {
              var k = byId(id).kind;
              return k === "resistor" || k === "rheostat" || k === "ammeter" || (k === "switch" && !byId(id).on);
            });
            return bulbs.length === 1 && !bad;
          });
          if (okT) {
            var Is = loadPaths.map(function (ph) {
              return U / ph.reduce(function (s, id) { return s + circuitR(byId(id)); }, 0);
            });
            loadPaths.forEach(function (ph, i) {
              drawCurrent(ph);
              ph.map(byId).filter(function (c) { return c.kind === "bulb"; })
                .forEach(function (b) { glowBulb(b, Is[i] < 0.15 ? "暗" : Is[i] < 0.5 ? "亮" : "很亮"); });
            });
            setState("通路（两条支路，各一灯泡）", "ok");
            var r2 = mmlRead(mi("I") + "<mtext>总</mtext>", fmtN(Is[0] + Is[1], 2), "A");
            badge.setReadout(r2.mathml, "I总 = " + r2.text);
            return;
          }
        }
      }
      if (cycles.length > 0) setState("断路（开关没闭合）", "");
      else if (hasBranch) setState("断路（仅支持单回路串联 / 固定双支路模板）", "");
      else setState("断路（电路未闭合）", "");
      badge.setReadout("", "I = —");
      drawVoltmeters(null);
    }
    function bfsPath(adj, from, to) {
      var prev = {}, seen = {};
      seen[from] = 1;
      var q = [from];
      while (q.length) {
        var cur = q.shift();
        if (cur === to) {
          var path = [to], p = prev[to];
          while (p) { path.unshift(p); p = prev[p]; }
          return path;
        }
        (adj[cur] || []).forEach(function (nb) {
          if (!seen[nb]) { seen[nb] = 1; prev[nb] = cur; q.push(nb); }
        });
      }
      return null;
    }
    function branchPaths(adj, b1, b2) {
      /* b1→b2 的三条不交内部点的路径（枚举） */
      var paths = [];
      function dfs(cur, path, seen) {
        if (paths.length >= 4) return;
        if (cur === b2) { paths.push(path.slice()); return; }
        (adj[cur] || []).forEach(function (nb) {
          if (seen[nb]) return;
          if (nb !== b2 && (adj[nb] || []).length >= 3 && nb !== b1) return;
          seen[nb] = 1; path.push(nb); dfs(nb, path, seen); path.pop(); delete seen[nb];
        });
      }
      var seen = {}; seen[b1] = 1;
      dfs(b1, [b1], seen);
      return paths;
    }
    function drawCurrent(order) {
      arrowHead(svg, "fh-cur", cssVar("--phy-current"));
      for (var i = 0; i + 1 < order.length; i++) {
        var pa = cellCenter(byId(order[i]).cell), pb = cellCenter(byId(order[i + 1]).cell);
        var mx = (pa.x + pb.x) / 2, my = (pa.y + pb.y) / 2;
        var dx = pb.x - pa.x, dy = pb.y - pa.y, d = Math.hypot(dx, dy) || 1;
        var ux = dx / d, uy = dy / d;
        wireLayer.appendChild(svgEl("line", {
          x1: mx - ux * 3, y1: my - uy * 3, x2: mx + ux * 3, y2: my + uy * 3,
          stroke: cssVar("--phy-current"), "stroke-width": 1.6, "marker-end": "url(#fh-cur)" }));
      }
    }
    function glowBulb(b, tier) {
      var cc = cellCenter(b.cell), s = Math.min(cw, chh) * 0.62;
      var op = tier === "暗" ? 0.25 : tier === "亮" ? 0.6 : 0.95;
      compLayer.appendChild(svgEl("circle", { cx: cc.x, cy: cc.y, r: s * 0.5,
        fill: cssVar("--phy-highlight"), opacity: op, "class": "phy-glow" }));
      compLayer.appendChild(svgText(cc.x, cc.y - s * 0.55, tier, "phy-sym-label"));
    }

    /* ---- 拖放 ---- */
    var ghost = null;
    function cellDown(cc, rr, e) {
      var existing = compAt(cc, rr);
      if (!existing) return;
      startDrag(existing, e, true);
    }
    function startDrag(comp, e, fromCell) {
      if (e.preventDefault) e.preventDefault();
      var sx = e.clientX, sy = e.clientY, moved = false;
      ghost = el("div", "phy-ghost", CIRCUIT_KIND_ZH[comp.kind] || comp.kind);
      box.appendChild(ghost);
      function mv(ev) {
        moved = true;
        ghost.style.left = (ev.clientX + 8) + "px";
        ghost.style.top = (ev.clientY - 10) + "px";
      }
      function up(ev) {
        try {
          window.removeEventListener("pointermove", mv);
          window.removeEventListener("pointerup", up);
        } catch (err) {}
        if (ghost && ghost.parentNode) ghost.parentNode.removeChild(ghost);
        ghost = null;
        if (!moved) {
          if (comp.kind === "switch") {
            comp.on = !comp.on; solve(); flash(svg); vib(10);
            /* 黄队 P3 改法 1：闭合/断开切换时刀闸 200ms 旋转 + 视觉弹跳 */
            try {
              var swg = compLayer.querySelector('.phy-switch[data-id="' + comp.id + '"]');
              if (swg) {
                swg.classList.add("phy-switch-toggle");
                setTimeout(function () { swg.classList.remove("phy-switch-toggle"); }, 260);
              }
            } catch (e) {}
            /* 黄队 P3 改法 2：开关闭合后，撤掉"差一步"气泡与持续脉冲 */
            if (comp.on) dismissAutoBubble();
          }
          return;
        }
        var q = toSVG(svg, ev.clientX, ev.clientY);
        var cc = Math.max(0, Math.min(cols - 1, Math.floor(q.x / cw)));
        var rr = Math.max(0, Math.min(rows - 1, Math.floor(q.y / chh)));
        var overTray = false;
        try {
          var tr = tray.getBoundingClientRect();
          overTray = ev.clientX >= tr.left && ev.clientX <= tr.right &&
                     ev.clientY >= tr.top && ev.clientY <= tr.bottom;
        } catch (err) {}
        if (overTray) {
          comps = comps.filter(function (x) { return x !== comp; });
        } else {
          /* 黄队 P3 改法 3：画布内元件可拖到空格点换位（cut-reassemble 同构）；
           * 目标格有元件 → 两元件交换位置；空格 → 直接落位。 */
          var other = compAt(cc, rr);
          if (!other || other === comp) {
            comp.cell = [cc, rr];
          } else {
            var tmp = comp.cell; comp.cell = other.cell; other.cell = tmp;
            notes.innerHTML = "";
            notes.appendChild(noteLine("两个元件换了位置。"));
          }
          /* 电压表落位：自动把表笔连到最近的可用电器（bulb/resistor/rheostat/battery） */
          if (comp.kind === "voltmeter" && !comp.across) {
            var best = null, bd = 1e9;
            comps.forEach(function (q) {
              if (q === comp) return;
              if (["bulb", "resistor", "rheostat", "battery"].indexOf(q.kind) < 0) return;
              var d = Math.abs(q.cell[0] - comp.cell[0]) + Math.abs(q.cell[1] - comp.cell[1]);
              if (d < bd) { bd = d; best = q; }
            });
            if (best) comp.across = best.id;
          }
        }
        solve(); flash(svg);
      }
      if (typeof window.addEventListener === "function") {
        window.addEventListener("pointermove", mv);
        window.addEventListener("pointerup", up);
      }
    }
    trayKinds.forEach(function (kind) {
      /* 黄队 P3：元件库条目配"拖我进画布"小字，条目 ≥44px 高（CSS） */
      var b = el("button", "phy-tray-item",
        esc(CIRCUIT_KIND_ZH[kind] || kind) + '<span class="phy-tray-hint">拖我进画布</span>');
      b.type = "button";
      b.setAttribute("aria-label", "添加" + (CIRCUIT_KIND_ZH[kind] || kind));
      b.addEventListener("pointerdown", function (e) {
        if (comps.length >= 8) {
          notes.innerHTML = "";
          notes.appendChild(noteLine("元件已到 8 个上限（降级约束）。"));
          return;
        }
        var comp = { id: "c" + Date.now() + Math.floor(Math.random() * 999),
          kind: kind, cell: [0, 0], on: kind === "switch" ? false : undefined,
          frac: kind === "rheostat" ? 1 : undefined }; /* 新拖入的滑片默认在阻值最大处 */
        comps.push(comp);
        startDrag(comp, e, false);
      });
      tray.appendChild(b);
    });
    /* 元件库拖拽方向：只支持"库→画布"和"画布→库"（常见坑 #4） */
    solve();
    /* 首访脉冲只播一次：初始渲染后即标记，后续 solve 不再加 first 类 */
    markHintSeen(curPageId + "-circuit");
    return box;
  }

  /* ---------------- P4 · optics-ray（光路作图） ---------------- */
  /* 降级声明：只做几何光线；衍射/干涉/波前/色散不做 */
  function widgetOpticsRay(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", p.mode === "mirror" ? "平面镜反射光路"
      : p.mode === "refraction" ? "激光斜射入水折射" : "凸透镜成像光路");
    box.appendChild(svg);
    var imgBadge = stateBadge("—", "");
    box.appendChild(imgBadge);
    var imgHuman = el("div", "phy-note", "");
    box.appendChild(imgHuman);
    var formulaLine = el("div", "phy-formula-line", "");
    box.appendChild(formulaLine);
    var AX = 52; /* 主光轴 y */
    var rays = p.rays || ["parallel", "center", "focus"];

    if (p.mode === "mirror") {
      var mx = p.mirrorX == null ? 55 : p.mirrorX;
      var src = { x: (p.source && p.source.x) || 25, y: (p.source && p.source.y) || 68 };
      function drawMirror() {
        svg.innerHTML = "";
        arrowHead(svg, "fh-ray", cssVar("--phy-ray"));
        svg.appendChild(svgEl("line", { x1: 5, y1: AX, x2: 95, y2: AX, "class": "phy-track-line" }));
        /* 镜面：竖直线 + 斜线阴影 */
        svg.appendChild(svgEl("line", { x1: mx, y1: 12, x2: mx, y2: 92,
          stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
        for (var i = 0; i < 7; i++)
          svg.appendChild(svgEl("line", { x1: mx, y1: 16 + i * 11, x2: mx + 3.5, y2: 12.5 + i * 11,
            stroke: cssVar("--phy-track"), "stroke-width": 0.8 }));
        svg.appendChild(svgText(mx + 2, 10, "平面镜", "phy-note-text", "start"));
        /* 物体箭头（可拖） */
        var oy = 100 - src.y;
        drawArrowObj(svg, src.x, oy, "fh-ray");
        var hd = svgEl("circle", { cx: src.x, cy: oy - 6, r: 6, "class": "phy-handle",
          fill: cssVar("--phy-known"), "aria-label": "拖动物体" });
        svg.appendChild(hd);
        dragify(hd, { svg: svg, onMove: function (lx, ly) {
          src.x = Math.max(8, Math.min(mx - 8, lx)); src.y = Math.max(8, Math.min(96, 100 - ly));
          drawMirror();
        }, onEnd: function () { flash(svg); } });
        /* 反射：入射角=反射角（构造保证） */
        var topX = src.x, topY = oy - 12;
        var hx = mx, hy = (topY + AX) / 2 + 6;
        svg.appendChild(svgEl("line", { x1: topX, y1: topY, x2: hx, y2: hy,
          stroke: cssVar("--phy-ray"), "stroke-width": 1.2, "marker-end": "url(#fh-ray)" }));
        var dx = hx - topX, dy = hy - topY;
        /* F14–F15 修复（2026-10-15）：反射角必须=入射角（PHY-O01，≤1°）。
         * 旧 ry2=hy+dy*0.9 致 r=atan(0.9·tan i)<i 恒成立。镜面竖直，
         * 反射即水平分量反向、竖直分量不变：ry2=hy+dy（构造保证，对拖动位形亦然）。 */
        var rx2 = hx - dx, ry2 = hy + dy;
        svg.appendChild(svgEl("line", { x1: hx, y1: hy, x2: rx2, y2: Math.min(95, ry2),
          stroke: cssVar("--phy-ray"), "stroke-width": 1.2, "marker-end": "url(#fh-ray)" }));
        /* 法线（灰虚线） */
        svg.appendChild(svgEl("line", { x1: hx - 6, y1: hy, x2: hx + 6, y2: hy, "class": "phy-normal" }));
        /* 虚像（虚线）：与物关于镜面对称 */
        var ix = 2 * mx - src.x;
        svg.appendChild(svgEl("line", { x1: hx, y1: hy, x2: ix, y2: topY,
          stroke: cssVar("--phy-ray"), "stroke-width": 1, "stroke-dasharray": "2.5,2" }));
        var io = drawArrowObj(svg, ix, oy, null, true);
        imgBadge.textContent = "正立等大虚像";
        imgBadge.className = "phy-state phy-state-ok";
        var r = mmlRead(mi("v"), fmtN(Math.abs(mx - src.x), 1), "");
        badge.setReadout(r.mathml, "像距 = 物距 = " + fmtN(Math.abs(mx - src.x), 1));
        formulaLine.innerHTML = "入射角 = 反射角（作图保证）";
      }
      drawMirror();
      return box;
    }

    /* 折射模式（p02.2.1）：激光从空气斜射入水，入射角滑块联动折射角 */
    if (p.mode === "refraction") {
      imgBadge.style.display = "none"; /* 本模式不用像性质徽章，改用 refrSt */
      var n1 = p.n1 || 1, n2 = p.n2 || 1.33;
      var acfg = p.angle || {};
      var sA = uiSlider({ label: "入射角 i", min: acfg.min != null ? acfg.min : 0,
        max: acfg.max != null ? acfg.max : 80, step: acfg.step || 1,
        init: acfg.init != null ? acfg.init : 30, unit: "°",
        fmt: function (v) { return fmtN(v, 0); } });
      box.appendChild(sA.row);
      var refrSt = stateBadge("向法线偏折", "ok");
      box.appendChild(refrSt);
      function drawRefr() {
        svg.innerHTML = "";
        var iDeg = sA.get(), i = iDeg * Math.PI / 180, WY = 46;
        svg.appendChild(svgEl("rect", { x: 6, y: WY, width: 88, height: 48,
          fill: cssVar("--phy-known"), opacity: 0.12 }));
        svg.appendChild(svgEl("line", { x1: 6, y1: WY, x2: 94, y2: WY,
          stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
        svg.appendChild(svgText(88, WY - 5, "空气", "phy-note-text", "end"));
        svg.appendChild(svgText(88, WY + 8, "水", "phy-note-text", "end"));
        svg.appendChild(svgEl("line", { x1: 50, y1: 10, x2: 50, y2: 92, "class": "phy-normal" }));
        svg.appendChild(svgText(54, 14, "法线", "phy-note-text", "start"));
        arrowHead(svg, "fh-refr", cssVar("--phy-target"));
        var L = 34;
        var sx = 50 - L * Math.sin(i), sy = WY - L * Math.cos(i);
        svg.appendChild(svgEl("line", { x1: sx.toFixed(1), y1: sy.toFixed(1), x2: 50, y2: WY,
          stroke: cssVar("--phy-target"), "stroke-width": 1.6, "marker-end": "url(#fh-refr)" }));
        svg.appendChild(svgText(sx - 4, sy - 2, "激光", "phy-note-text", "end"));
        var rDeg = Math.asin(Math.min(1, n1 * Math.sin(i) / n2)) * 180 / Math.PI;
        var r = rDeg * Math.PI / 180;
        var ex = 50 + L * Math.sin(r), ey = WY + L * Math.cos(r);
        svg.appendChild(svgEl("line", { x1: 50, y1: WY,
          x2: ex.toFixed(1), y2: ey.toFixed(1),
          stroke: cssVar("--phy-target"), "stroke-width": 1.6, "marker-end": "url(#fh-refr)" }));
        /* 角度弧线（双编码：弧 + 数字） */
        function arc(cx, cy, rr, a0, a1, flip) {
          var x0 = cx + rr * Math.sin(a0), y0 = cy - rr * Math.cos(a0) * (flip ? -1 : 1);
          var x1 = cx + rr * Math.sin(a1), y1 = cy - rr * Math.cos(a1) * (flip ? -1 : 1);
          return "M" + x0.toFixed(1) + "," + y0.toFixed(1) +
            " A" + rr + "," + rr + " 0 0 " + (flip ? 1 : 0) + " " + x1.toFixed(1) + "," + y1.toFixed(1);
        }
        if (iDeg > 0) {
          svg.appendChild(svgEl("path", { d: arc(50, WY, 11, 0, i, false),
            fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1 }));
          svg.appendChild(svgText(50 - 15 * Math.sin(i / 2), WY - 15 * Math.cos(i / 2),
            "i", "phy-f-label"));
        }
        if (rDeg > 0.5) {
          svg.appendChild(svgEl("path", { d: arc(50, WY, 11, 0, r, true),
            fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1 }));
          svg.appendChild(svgText(50 + 15 * Math.sin(r / 2), WY + 15 * Math.cos(r / 2),
            "r", "phy-f-label"));
        }
        var rm = mmlRead(mi("r"), fmtN(rDeg, 1), "°");
        badge.setReadout(rm.mathml, "i = " + fmtN(iDeg, 0) + "°，r = " + fmtN(rDeg, 1) + "°");
        refrSt.textContent = iDeg === 0 ? "垂直入射：不偏折（i = r = 0）"
          : "光从空气斜射入水：向法线偏折（r < i）";
        refrSt.className = "phy-state phy-state-ok";
        if (mathmlOK())
          formulaLine.innerHTML = "<math><mrow><mi>n</mi><mn>1</mn><mi>sin</mi><mi>i</mi><mo>=</mo>" +
            "<mi>n</mi><mn>2</mn><mi>sin</mi><mi>r</mi></mrow></math>";
        else formulaLine.textContent = "n1·sin i = n2·sin r（n空气=1，n水=1.33）";
      }
      sA.on(drawRefr);
      drawRefr();
      return box;
    }

    /* 透镜模式 */
    var lensX = (p.lens && p.lens.x) || 50;
    var fCtl = null;
    if (p.focal) {
      fCtl = uiSlider({ label: "焦距 f", min: p.focal.min, max: p.focal.max,
        step: p.focal.step, init: p.focal.init, unit: "" });
      box.appendChild(fCtl.row);
    }
    var f0 = (p.lens && p.lens.f) || (p.focal && p.focal.init) || 15;
    var src = { x: (p.source && p.source.x) || 22, y: (p.source && p.source.y) || 62 };
    function F() { return fCtl ? fCtl.get() : f0; }
    function drawArrowObj(svg, x, yBase, marker, dashed) {
      var h = 100 - src.y; /* 物高（逻辑） */
      var topY = yBase - h * 0.55;
      var ln = svgEl("line", { x1: x, y1: yBase, x2: x, y2: topY,
        stroke: cssVar("--phy-body"), "stroke-width": 1.8,
        "stroke-dasharray": dashed ? "2.5,2" : "none",
        "marker-end": marker ? "url(#" + marker + ")" : "none" });
      svg.appendChild(ln);
      return { x: x, topY: topY, baseY: yBase };
    }
    function drawLens() {
      svg.innerHTML = "";
      var f = F();
      arrowHead(svg, "fh-ray", cssVar("--phy-ray"));
      svg.appendChild(svgEl("line", { x1: 4, y1: AX, x2: 96, y2: AX, "class": "phy-track-line" }));
      /* 透镜：竖直线 + 上下箭头 */
      svg.appendChild(svgEl("line", { x1: lensX, y1: 18, x2: lensX, y2: 86,
        stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
      svg.appendChild(svgEl("path", { d: "M" + lensX + ",18 l-2.5,5 M" + lensX + ",18 l2.5,5",
        stroke: cssVar("--phy-body"), "stroke-width": 1.2, fill: "none" }));
      svg.appendChild(svgEl("path", { d: "M" + lensX + ",86 l-2.5,-5 M" + lensX + ",86 l2.5,-5",
        stroke: cssVar("--phy-body"), "stroke-width": 1.2, fill: "none" }));
      /* 焦点 F（只读标记，不可拖） */
      [lensX - f, lensX + f].forEach(function (fx) {
        svg.appendChild(svgEl("circle", { cx: fx, cy: AX, r: 1.3, "class": "phy-f-mark" }));
        svg.appendChild(svgText(fx, AX + 5, "F", "phy-f-label"));
      });
      svg.appendChild(svgText(lensX, AX + 5, "O", "phy-f-label"));
      /* 光源（可拖） */
      var oy = AX;
      var obj = drawArrowObj(svg, src.x, oy, "fh-ray");
      var hd = svgEl("circle", { cx: src.x, cy: obj.topY, r: 6, "class": "phy-handle",
        fill: cssVar("--phy-known"), "aria-label": "拖动光源（改物距）" });
      svg.appendChild(hd);
      dragify(hd, { svg: svg, onMove: function (lx, ly) {
        src.x = Math.max(6, Math.min(lensX - 4, lx));
        src.y = Math.max(54, Math.min(96, 100 - ly));
        drawLens();
      }, onEnd: function () { flash(svg); } });
      /* 透镜整体可拖（改位置） */
      var lh = svgEl("rect", { x: lensX - 4, y: 30, width: 8, height: 44,
        fill: "transparent", "class": "phy-lens-hot" });
      svg.appendChild(lh);
      dragify(lh, { svg: svg, onMove: function (lx) {
        lensX = Math.max(src.x + 6, Math.min(92, lx));
        drawLens();
      }, onEnd: function () { flash(svg); } });

      var u = lensX - src.x, topY = obj.topY;
      function ray(x1, y1, x2, y2, dashed) {
        svg.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2,
          stroke: cssVar("--phy-ray"), "stroke-width": 1.2,
          "stroke-dasharray": dashed ? "2.5,2" : "none",
          "marker-end": dashed ? "none" : "url(#fh-ray)" }));
      }
      /* 三条特殊光线（解析计算） */
      var v, kind;
      if (Math.abs(u - f) < 0.5) { v = Infinity; kind = "none"; }
      else { v = 1 / (1 / f - 1 / u); kind = v > 0 ? "real" : "virtual"; }
      var ix = lensX + (isFinite(v) ? v : 0);
      var m = isFinite(v) ? -v / u : 0;
      var ih = (100 - src.y) * 0.55 * Math.abs(m);
      function drawRays() {
        /* parallel：平行主光轴 → 过远侧焦点 */
        if (rays.indexOf("parallel") >= 0) {
          var fx2 = lensX + f;
          var yAt96 = topY + (AX - topY) / (fx2 - lensX) * (96 - lensX);
          ray(src.x, topY, lensX, topY);
          ray(lensX, topY, 96, yAt96);
        }
        /* center：过光心直进 */
        if (rays.indexOf("center") >= 0) {
          var slope = (AX - topY) / (lensX - src.x);
          ray(src.x, topY, 96, topY + slope * (96 - src.x));
        }
        /* focus：过近侧焦点 → 平行射出 */
        if (rays.indexOf("focus") >= 0) {
          var fx1 = lensX - f;
          var yAtLens = topY + (AX - topY) / (fx1 - src.x) * (lensX - src.x);
          ray(src.x, topY, lensX, yAtLens);
          ray(lensX, yAtLens, 96, yAtLens);
        }
      }
      /* 三条特殊光线 */
      drawRays();
      /* 像（showImage=false 时不画） */
      var badgeText, tone = "ok";
      if (kind === "none") {
        badgeText = "不成像（u=f）";
        tone = "";
        imgBadge.textContent = badgeText;
        imgHuman.textContent = "物正好在焦点上：折射光线平行，交不到一起";
      } else if (p.showImage === false) {
        imgBadge.textContent = "（像已隐藏）";
        imgHuman.textContent = "";
        tone = "";
      } else {
        /* F16–F20 修复（2026-10-15）：像箭头方向画反。逻辑 y 向上、SVG y 向下：
         * 物在轴上方（SVG y2=topY<AX）；实像倒立→像尖应在轴下方（SVG y=AX+ih），
         * 虚像正立→像尖应在轴上方（SVG y=AX−ih）。iy 的计算本就正确，
         * 错的是下面 y2 把实/虚写反了——直接用 iy。 */
        var iy = AX + (kind === "real" ? ih : -ih);
        var iln = svgEl("line", { x1: ix, y1: AX, x2: ix, y2: iy,
          stroke: cssVar("--phy-body"), "stroke-width": 1.8,
          "stroke-dasharray": kind === "virtual" ? "2.5,2" : "none",
          "marker-end": kind === "real" ? "url(#fh-ray)" : "none" });
        svg.appendChild(iln);
        /* F21 修复（2026-10-15，专家队裁决 A）：|m| 三态徽章。
         * u=2f 时 |m|=1 是"放大/缩小"的分界，必须独立为"倒立等大实像"；
         * ±5% 容差带防拖拽边界抖动（裁决 A）。 */
        var am = Math.abs(m);
        var prop = kind === "real"
          ? (am < 0.95 ? "倒立缩小实像" : am <= 1.05 ? "倒立等大实像" : "倒立放大实像")
          : "正立放大虚像";
        imgBadge.textContent = prop + (kind === "virtual" ? "（虚像用虚线画，因为光线没真交于那）" : "");
        /* 黄队 P4（直观性）：徽章只报术语不够，加一句人话——放独立 .phy-note 元素，
         * 不进 imgBadge（白队 O13 对徽章做精确匹配，文本必须保持术语原样）。 */
        imgHuman.textContent = kind === "virtual" ? "像跑到物体这边来了——这就是放大镜的秘密"
          : am < 0.95 ? "像比物体小、倒过来了"
          : am <= 1.05 ? "像和物体一样大、倒过来了" : "像比物体大、倒过来了";
        badgeText = prop;
      }
      imgBadge.className = "phy-state" + (tone ? " phy-state-" + tone : "");
      var fm = "<math><mrow><mfrac><mn>1</mn><mi>f</mi></mfrac><mo>=</mo>" +
        "<mfrac><mn>1</mn><mi>u</mi></mfrac><mo>+</mo><mfrac><mn>1</mn><mi>v</mi></mfrac>" +
        "<mspace width=\"0.5em\"/><mtext>u=" + fmtN(u, 1) + "，v=" +
        (isFinite(v) ? fmtN(v, 1) : "∞") + "</mtext></mrow></math>";
      if (mathmlOK()) formulaLine.innerHTML = fm;
      else formulaLine.textContent = "1/f=1/u+1/v（u=" + fmtN(u, 1) + "，v=" + (isFinite(v) ? fmtN(v, 1) : "∞") + "）";
      var rr = mmlRead(mi("u"), fmtN(u, 1), "");
      badge.setReadout(rr.mathml, "u = " + fmtN(u, 1));
    }
    /* 黄队 P4 改法 1：初学页默认只开两条特殊光线，第三条以"挑战"按钮后开
     *（防一次三条线+像+徽章信息过载）。数据显式配了 focus 的页不显示挑战按钮。 */
    if (rays.indexOf("focus") < 0) {
      var chBtn = el("button", "phy-mini", "挑战：再加一条光线看看");
      chBtn.type = "button";
      chBtn.addEventListener("click", function () {
        rays = rays.concat(["focus"]);
        chBtn.style.display = "none";
        drawLens(); flash(svg);
      });
      box.appendChild(chBtn);
    }
    /* 黄队 P4 改法 3：物距拖到 f 以内 → 折射光线发散，气泡指引 */
    var spreadBubble = el("div", "phy-hint-bubble",
      "🔦 光线散开了，在光屏上接不到像——把眼睛放在右边看");
    spreadBubble.style.display = "none";
    box.insertBefore(spreadBubble, svg);
    var _drawLens = drawLens;
    drawLens = function () {
      _drawLens();
      spreadBubble.style.display = (lensX - src.x < F() - 0.5) ? "" : "none";
    };
    if (fCtl) fCtl.on(drawLens);
    drawLens();
    return box;
  }

  /* ---------------- P5 · wave-tune（波形调节） ---------------- */
  /* 约束：发声钳制 20–audibleMax Hz；波形动画频闪 ≤3Hz；落定不播音 */
  function widgetWaveTune(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var legend = el("div", "phy-legend", "");
    box.appendChild(legend);
    var cv = el("canvas", "phy-wave-cv");
    cv.setAttribute("aria-label", "波形图");
    box.appendChild(cv);
    var sAmp = uiSlider({ label: "振幅 A", min: p.amp.min, max: p.amp.max,
      step: p.amp.step, init: p.amp.init, unit: "" });
    var sFreq = uiSlider({ label: "频率 f", min: p.freq.min, max: p.freq.max,
      step: p.freq.step, init: p.freq.init, unit: "Hz" });
    var ph = p.phase || { min: 0, max: 360, step: 15, init: 0 };
    var sPhase = uiSlider({ label: "相位 φ", min: ph.min, max: ph.max,
      step: ph.step, init: ph.init, unit: "°" });
    box.appendChild(sAmp.row); box.appendChild(sFreq.row); box.appendChild(sPhase.row);
    var bSliders = null;
    var waveB = p.waveB || null;
    var showSum = p.showSum === true;
    var bAmp, bFreq, bPh;
    function readWaveB() {
      if (!waveB) return;
      if (bSliders) { bAmp = bSliders.a.get(); bFreq = bSliders.f.get(); bPh = bSliders.p.get(); }
      else { bAmp = waveB.amp; bFreq = waveB.freq; bPh = waveB.phase || 0; }
    }
    if (waveB && waveB.amp && waveB.amp.min != null) {
      /* waveB 同构滑块形态 */
      bSliders = {
        a: uiSlider({ label: "波 B 振幅", min: waveB.amp.min, max: waveB.amp.max,
          step: waveB.amp.step, init: waveB.amp.init, unit: "" }),
        f: uiSlider({ label: "波 B 频率", min: waveB.freq.min, max: waveB.freq.max,
          step: waveB.freq.step, init: waveB.freq.init, unit: "Hz" }),
        p: uiSlider({ label: "波 B 相位", min: 0, max: 360, step: 15,
          init: waveB.phase && waveB.phase.init != null ? waveB.phase.init : 0, unit: "°" })
      };
      box.appendChild(bSliders.a.row); box.appendChild(bSliders.f.row); box.appendChild(bSliders.p.row);
      bSliders.a.on(draw); bSliders.f.on(draw); bSliders.p.on(draw);
    }
    if (waveB) {
      var sumRow = el("div", "phy-check-row");
      var sumLb = el("label", "phy-check");
      var sumCk = el("input", "");
      sumCk.type = "checkbox"; sumCk.checked = showSum;
      sumCk.setAttribute("aria-label", "显示合成波");
      sumLb.appendChild(sumCk);
      sumLb.appendChild(el("span", "", "显示合成波（两列波叠加）"));
      sumRow.appendChild(sumLb);
      box.appendChild(sumRow);
      sumCk.addEventListener("change", function () { showSum = sumCk.checked; draw(); });
    }
    var sndRow = el("div", "phy-btn-row");
    var sndBtn = null, sndNote = noteLine("");
    if (p.playSound !== false) {
      sndBtn = el("button", "", "🔊 听一听");
      sndBtn.type = "button";
      sndBtn.addEventListener("click", toggleSound);
      sndRow.appendChild(sndBtn);
    }
    sndRow.appendChild(sndNote);
    box.appendChild(sndRow);
    var drift = true;
    var driftBtn = el("button", "phy-mini", drift ? "⏸ 波形动画" : "▶ 波形动画");
    driftBtn.type = "button";
    driftBtn.addEventListener("click", function () {
      drift = !drift;
      driftBtn.textContent = drift ? "⏸ 波形动画" : "▶ 波形动画";
    });
    box.appendChild(driftBtn);

    var AC = null, osc = null, sounding = false;
    function toggleSound() {
      var f = sFreq.get();
      var aMax = p.audibleMax || 2000;
      if (sounding) { stopSound(); return; }
      if (f < 20) { sndNote.textContent = "太低听不见，只看波形。"; return; }
      if (f > aMax) { sndNote.textContent = "超过发声上限（" + aMax + "Hz），只看波形。"; return; }
      AC = AC || audioCtx();
      if (!AC) { sndNote.textContent = "当前环境不支持发声，只看波形。"; return; }
      try {
        if (AC.state === "suspended") AC.resume();
        osc = AC.createOscillator(); osc.type = "sine"; osc.frequency.value = f;
        var gn = AC.createGain(); gn.gain.value = 0.15;
        osc.connect(gn); gn.connect(AC.destination); osc.start();
        sounding = true; sndBtn.textContent = "⏹ 停止";
        sndNote.textContent = "正在播放 " + f + " Hz（合成音，非真实乐器音色）。";
      } catch (e) { sndNote.textContent = "发声失败，只看波形。"; }
    }
    function stopSound() {
      sounding = false;
      try { if (osc) osc.stop(); } catch (e) {}
      osc = null;
      if (sndBtn) sndBtn.textContent = "🔊 听一听";
      sndNote.textContent = "";
    }

    var t0 = nowMs();
    var driftHz = 1; /* 波形动画频闪 ≤3Hz（光敏安全 W-P8） */
    function waveVal(A, f, phDeg, x, t) {
      return A * Math.sin(2 * Math.PI * f * x + phDeg * Math.PI / 180 + 2 * Math.PI * driftHz * t);
    }
    function draw() {
      var W = 340, H = 150;
      var ctx = fitCanvas(cv, W, H);
      var A = sAmp.get(), f = sFreq.get(), phd = sPhase.get();
      driftHz = Math.min(Math.max(f, 0), 3);
      /* 读数行：λ=v/f
       * 声速备注修复（2026-10-15）：v=340m/s 写死致非声学页（p17.2.3 交流电）读数行出现
       * "声速"误导。数据侧无 v 参数，渲染器层修：p.v 可覆盖波速、p.vNote 可覆盖备注；
       * 缺省时仅声学语境（playSound，可发声演示）保留"声速"注，非声学页只显示 λ 数值。 */
      var vWave = p.v || 340;
      var lam = vWave / f;
      var vNote = p.vNote != null ? p.vNote
        : (p.v ? "（v=" + p.v + "m/s）" : (p.playSound !== false ? "（v=340m/s，声速）" : ""));
      var rm = "<math><mrow><mi>A</mi><mo>=</mo><mn>" + fmtN(A, 1) +
        "</mn><mo>,</mo><mi>f</mi><mo>=</mo><mn>" + fmtN(f, 0) +
        "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">Hz</mi><mo>,</mo>" +
        "<mi>λ</mi><mo>=</mo><mi>v</mi><mo>/</mo><mi>f</mi><mo>=</mo><mn>" + fmtN(lam, 2) +
        "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">m</mi></mrow></math>";
      badge.setReadout(rm, "A=" + fmtN(A, 1) + "，f=" + fmtN(f, 0) + " Hz，λ=v/f=" + fmtN(lam, 2) + " m" + vNote);
      legend.innerHTML = "";
      var lgA = el("span", "phy-lg",
        '<i style="background:' + roleColor("wave-a") + '"></i>波 A（实线）');
      legend.appendChild(lgA);
      if (waveB) legend.appendChild(el("span", "phy-lg",
        '<i class="dash" style="border-color:' + roleColor("wave-b") + '"></i>波 B（虚线）'));
      if (showSum && waveB) legend.appendChild(el("span", "phy-lg",
        '<i style="background:' + roleColor("target") + '"></i>合成波'));
      if (!ctx) return;
      var t = drift ? (nowMs() - t0) / 1000 : 0;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = "#BBBBBB"; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(0, H / 2); ctx.lineTo(W, H / 2); ctx.stroke();
      var N = 300, yOf = function (v) { return H / 2 - v / (p.amp.max * 1.15) * (H / 2 - 8); };
      function plot(fn, color, dash, width) {
        ctx.strokeStyle = color; ctx.lineWidth = width || 2;
        ctx.setLineDash(dash || []);
        ctx.beginPath();
        for (var i = 0; i <= N; i++) {
          var x = i / N * 4; /* 显示域固定 4 个单位；周期数 = NP·f/fInit，随频率成比例变化 */
          var px = 10 + i / N * (W - 20), py = yOf(fn(x, t));
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke(); ctx.setLineDash([]);
      }
      /* F1–F4 修复（2026-10-15）：频率滑块必须改变波形。显示域固定为 x∈[0,4]，
       * 空间相位 = 2π·NP·(f/fInit)·(x/4)，NP=3（初值档显示 3 个周期）：
       * 两档频率下像素波长比 λ1/λ2 = f2/f1 精确成立（PHY-G06），
       * 且低频档也有 ≥2 个上升过零点、像素可测。 */
      var fInit = (p.freq && p.freq.init) || 440;
      var NP = 3;
      var fA = function (x, t) { return waveVal(A, NP * f / fInit, phd, x / 4, t); };
      plot(fA, cssVar("--phy-wave-a"));
      readWaveB();
      if (waveB) {
        var fB = function (x, t) { return waveVal(bAmp, NP * bFreq / fInit, bPh, x / 4, t); };
        plot(fB, cssVar("--phy-wave-b"), [6, 4]);
        if (showSum) plot(function (x, t) { return fA(x, t) + fB(x, t); },
          cssVar("--phy-target"), [], 3);
      }
      /* 峰/谷标注（圆点 + "峰"/"谷"文字） */
      if (p.showLabels !== false) {
        ctx.fillStyle = cssVar("--phy-wave-a");
        ctx.font = "11px sans-serif"; ctx.textAlign = "center";
        var prev = fA(0, t), prevD = 0, marked = 0;
        for (var i = 1; i <= N && marked < 4; i++) {
          var v = fA(i / N * 4, t);
          var d = v - prev;
          if (prevD > 0 && d <= 0) {
            var px = 10 + (i - 1) / N * (W - 20), py = yOf(prev);
            ctx.beginPath(); ctx.arc(px, py, 3, 0, 7); ctx.fill();
            ctx.fillText("峰", px, py - 8); marked++;
          } else if (prevD < 0 && d >= 0) {
            var px2 = 10 + (i - 1) / N * (W - 20), py2 = yOf(prev);
            ctx.beginPath(); ctx.arc(px2, py2, 3, 0, 7); ctx.fill();
            ctx.fillText("谷", px2, py2 + 14); marked++;
          }
          prevD = d; prev = v;
        }
      }
    }
    /* 相位滑块循环：0°=360°，拖到头回绕 */
    sPhase.input.addEventListener("change", function () {
      var v = sPhase.get();
      if (v >= ph.max) sPhase.set(ph.min, true);
      draw();
    });
    sAmp.on(draw); sFreq.on(draw); sPhase.on(draw);
    (function loop() {
      if (!drift) { later(loop, 300); return; }
      draw();
      later(loop, 120); /* 演示速度钳制：低频刷新，无频闪风险 */
    })();
    draw();
    return box;
  }

  /* ---------------- P6 · pulley-lever（滑轮杠杆） ---------------- */
  function widgetPulleyLever(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", p.mode === "pulley" ? "滑轮模拟" : "杠杆平衡模拟");
    box.appendChild(svg);
    var eqLine = el("div", "phy-formula-line", "");
    box.appendChild(eqLine);
    var stBadge = stateBadge("—", "");
    box.appendChild(stBadge);
    var unit = p.unit || "N";

    if (p.mode === "pulley") {
      var kind = p.pulleyKind || "fixed";
      var G = (p.load && p.load.weight) || 10;
      var pull = 0; /* 拉绳位移（逻辑单位） */
      function drawPulley() {
        svg.innerHTML = "";
        arrowHead(svg, "fh-p", cssVar("--phy-target"));
        svg.appendChild(svgEl("line", { x1: 10, y1: 12, x2: 90, y2: 12, "class": "phy-ground" }));
        var F = kind === "movable" ? G / 2 : G;
        if (kind === "fixed") {
          var cx = 50, cy = 24, rr = 8;
          svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: rr,
            fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
          svg.appendChild(svgEl("line", { x1: cx, y1: 12, x2: cx, y2: cy - rr,
            stroke: cssVar("--phy-body"), "stroke-width": 1.2 }));
          var ly = 40 + pull * 0.4, ry = 40 - pull * 0.4;
          svg.appendChild(svgEl("line", { x1: cx - rr, y1: cy, x2: cx - rr, y2: ly,
            stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
          svg.appendChild(svgEl("line", { x1: cx + rr, y1: cy, x2: cx + rr, y2: ry,
            stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
          svg.appendChild(svgEl("rect", { x: cx - rr - 5, y: ly, width: 10, height: 8,
            "class": "phy-body-box" }));
          svg.appendChild(svgText(cx - rr, ly + 12, "G=" + G + "N", "phy-sym-label"));
          var hd = svgEl("circle", { cx: cx + rr, cy: ry, r: 6, "class": "phy-handle",
            fill: cssVar("--phy-known"), "aria-label": "拖动拉绳" });
          svg.appendChild(hd);
          dragify(hd, { svg: svg, onMove: function (lx, ly2) {
            pull = Math.max(0, Math.min(30, pull + (ly2 - ry) * 0.5)); drawPulley();
          }, onEnd: function () { flash(svg); } });
          stBadge.textContent = "定滑轮：不省力，改变方向";
        } else {
          var mx2 = 50, my2 = 30 + pull * 0.2;
          svg.appendChild(svgEl("line", { x1: 30, y1: 12, x2: 30, y2: 24,
            stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
          svg.appendChild(svgEl("line", { x1: 30, y1: 24, x2: mx2 - 7, y2: my2,
            stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
          svg.appendChild(svgEl("circle", { cx: mx2, cy: my2, r: 7,
            fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
          var hy2 = 24 + pull * 0.9;
          svg.appendChild(svgEl("line", { x1: mx2 + 7, y1: my2, x2: mx2 + 7, y2: 24,
            stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
          svg.appendChild(svgEl("line", { x1: mx2 + 7, y1: 24, x2: mx2 + 7, y2: hy2,
            stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
          svg.appendChild(svgEl("rect", { x: mx2 - 5, y: my2 + 7, width: 10, height: 8,
            "class": "phy-body-box" }));
          svg.appendChild(svgText(mx2, my2 + 20, "G=" + G + "N", "phy-sym-label"));
          var hd2 = svgEl("circle", { cx: mx2 + 7, cy: hy2, r: 6, "class": "phy-handle",
            fill: cssVar("--phy-known"), "aria-label": "拖动拉绳" });
          svg.appendChild(hd2);
          dragify(hd2, { svg: svg, onMove: function (lx, ly3) {
            pull = Math.max(0, Math.min(30, pull + (ly3 - hy2) * 0.5)); drawPulley();
          }, onEnd: function () { flash(svg); } });
          stBadge.textContent = "动滑轮：F = G/2（省一半力，但要多拉一倍绳子）";
          stBadge.className = "phy-state phy-state-ok";
        }
        stBadge.className = "phy-state" + (kind === "movable" ? " phy-state-ok" : "");
        var fr = mmlRead(mi("F"), fmtN(F, 1), unit);
        badge.setReadout(fr.mathml, "F = " + fr.text);
        if (mathmlOK()) eqLine.innerHTML = kind === "movable"
          ? "<math><mi>F</mi><mo>=</mo><mfrac><mi>G</mi><mn>2</mn></mfrac></math>"
          : "<math><mi>F</mi><mo>=</mo><mi>G</mi></math>";
        else eqLine.textContent = kind === "movable" ? "F = G/2" : "F = G";
      }
      drawPulley();
      return box;
    }

    /* 杠杆模式 */
    var ful = uiSlider({ label: "支点 O 位置", min: p.fulcrumX.min, max: p.fulcrumX.max,
      step: p.fulcrumX.step, init: p.fulcrumX.init, unit: "" });
    box.appendChild(ful.row);
    var effS = null;
    if (p.effortArm) {
      effS = uiSlider({ label: "动力作用点", min: p.effortArm.min, max: p.effortArm.max,
        step: p.effortArm.step, init: p.effortArm.init, unit: "" });
      box.appendChild(effS.row);
    }
    var F2 = (p.load && p.load.weight) || 10;
    var Lx = 15, Rx = 85, BY = 55;
    var tiltShown = 0, tiltRaf = 0; /* 倾斜动画 300ms 缓动（触控要求） */
    var armAnimDone = false; /* 力臂描画动画：每页视图只播一次 */
    function drawLever() {
      svg.innerHTML = "";
      var O = ful.get();
      var Ex = effS ? effS.get() : Rx;
      var L2 = O - Lx, L1 = Ex - O;
      var badArm = L1 <= 0 || L2 <= 0;
      var F1 = badArm ? NaN : F2 * L2 / L1;
      /* 支点三角 + O */
      svg.appendChild(svgEl("path", { d: "M" + (O - 4) + "," + (BY + 8) + " L" + O + "," + BY +
        " L" + (O + 4) + "," + (BY + 8) + " Z", "class": "phy-fulcrum" }));
      svg.appendChild(svgText(O, BY + 13, "O", "phy-f-label"));
      /* 杠杆（绕支点旋转，倾斜钳制 ±15°，300ms 缓动） */
      var tilt = 0;
      if (!badArm) {
        var diff = F1 * L1 - F2 * L2, mx = Math.max(F1 * L1, F2 * L2, 1e-9);
        tilt = Math.max(-15, Math.min(15, diff / mx * 60));
      }
      var beam = svgEl("g", { "class": "phy-beam" });
      beam.appendChild(svgEl("line", { x1: Lx, y1: BY, x2: Rx, y2: BY,
        stroke: cssVar("--phy-body"), "stroke-width": 2.4 }));
      /* === 杠杆受力图重画（2026-10-15）：专家队裁决 B + PHY-M08/M09 + 黄队 P6 改法 2 ===
       * 坐标：SVG y 向下；逻辑 y 向上。竖直向下 = SVG +y = 逻辑 270°。
       * F₂/F₁ 箭头一律竖直向下（270°±2°，PHY-M01），作用点落在梁线上（PHY-M07）；
       * 箭长 ∝ 力的大小（PHY-M05，同一比例系数）；全部位于 beam 组内，随倾斜一起旋转。 */
      if (!badArm) {
        var maxF = Math.max(F1, F2, 1e-9);
        var len2 = 14 * F2 / maxF, len1 = 14 * F1 / maxF;
        /* --- F₂（阻力=钩码重力）：作用点在悬挂点 (Lx,BY)，竖直向下穿入钩码顶部 ---
         * 箭头绘制长度严格 = len2（∝F₂，PHY-M05 测量口径）；钩码顶部比箭头短 2，
         * 箭头穿入顶部 2 单位（先画钩码、后画箭头，箭头可见）。 */
        var boxTop2 = BY + len2 - 2;
        beam.appendChild(svgEl("line", { x1: Lx, y1: BY, x2: Lx, y2: boxTop2,
          stroke: cssVar("--phy-track"), "stroke-width": 0.9 })); /* 悬挂线 */
        beam.appendChild(svgEl("rect", { x: Lx - 4, y: boxTop2, width: 8, height: 8,
          "class": "phy-body-box" })); /* 钩码 */
        arrowHead(svg, "fh-f2", cssVar("--phy-force-a"));
        beam.appendChild(svgEl("line", { x1: Lx, y1: BY, x2: Lx, y2: BY + len2,
          stroke: cssVar("--phy-force-a"), "stroke-width": 1.8, "marker-end": "url(#fh-f2)" }));
        beam.appendChild(svgText(Lx - 2.4, BY + len2 * 0.45, "F₂", "phy-force-label", "end"));
        /* --- F₁（动力）：作用点在动力端 (Ex,BY)，竖直向下（人手下压杠杆） --- */
        arrowHead(svg, "fh-f1", cssVar("--phy-target"));
        beam.appendChild(svgEl("line", { x1: Ex, y1: BY, x2: Ex, y2: BY + len1,
          stroke: cssVar("--phy-target"), "stroke-width": 2.2, "marker-end": "url(#fh-f1)" }));
        beam.appendChild(svgText(Ex + 2.4, BY + len1 * 0.55, "F₁", "phy-force-label", "start"));
        /* --- 力臂（PHY-M08）：支点 O 到竖直力线的垂线段。
         * 力线竖直（x=Lx / x=Ex），垂足即作用点，臂线沿梁线；
         * 加粗高亮 + 垂足直角标记。 --- */
        function armSeg(xFoot, color) {
          var seg = svgEl("line", { x1: O, y1: BY, x2: xFoot, y2: BY,
            stroke: color, "stroke-width": 4.5, opacity: 0.55 });
          beam.appendChild(seg);
          return seg;
        }
        var seg2 = armSeg(Lx, cssVar("--phy-force-a"));
        var seg1 = armSeg(Ex, cssVar("--phy-force-b"));
        function rightMark(xFoot, dirX) {
          /* 垂足直角标记：臂方向（dirX=±1，自垂足指向 O）与竖直力线之间的小方角 */
          var s = 2.6;
          beam.appendChild(svgEl("path", {
            d: "M" + (xFoot + dirX * s).toFixed(1) + "," + BY +
               " L" + (xFoot + dirX * s).toFixed(1) + "," + (BY + s) +
               " L" + xFoot + "," + (BY + s),
            fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1 }));
        }
        rightMark(Lx, 1);
        rightMark(Ex, -1);
        /* --- 力臂弧线（PHY-M09）：圆心=支点 O，单弧/双弧区分两臂。
         * L₂ 单弧（橙）：中心 (O,BY) 半径 L₂，自梁上 (Lx,BY) 扫到 O 正上方；
         * L₁ 双弧：中心 (O,BY)，半径 L₁ 与 L₁−2.5，同向。
         * 屏坐标顺时针为正：L₂ 自 9 点到 12 点取 sweep=1；L₁ 自 3 点到 12 点取 sweep=0。 --- */
        var arcCol2 = cssVar("--phy-force-a"), arcCol1 = cssVar("--phy-force-b");
        beam.appendChild(svgEl("path", {
          d: "M" + Lx + "," + BY + " A" + L2 + "," + L2 + " 0 0 1 " + O + "," + (BY - L2),
          fill: "none", stroke: arcCol2, "stroke-width": 1.2 }));
        var r1b = Math.max(L1 - 2.5, 1);
        beam.appendChild(svgEl("path", {
          d: "M" + Ex + "," + BY + " A" + L1 + "," + L1 + " 0 0 0 " + O + "," + (BY - L1),
          fill: "none", stroke: arcCol1, "stroke-width": 1.2 }));
        beam.appendChild(svgEl("path", {
          d: "M" + (O + r1b).toFixed(1) + "," + BY + " A" + r1b + "," + r1b +
             " 0 0 0 " + O + "," + (BY - r1b).toFixed(1),
          fill: "none", stroke: arcCol1, "stroke-width": 1.2 }));
        /* 弧线标签 L₁/L₂（斜体）+ 引线连到弧中点 */
        function arcLabel(r, deg, txt, color) {
          var a = deg * Math.PI / 180;
          var mxp = O + r * Math.cos(a), myp = BY + r * Math.sin(a);
          var lxp = O + (r + 6.5) * Math.cos(a), lyp = BY + (r + 6.5) * Math.sin(a);
          beam.appendChild(svgEl("line", { x1: mxp.toFixed(1), y1: myp.toFixed(1),
            x2: lxp.toFixed(1), y2: lyp.toFixed(1), stroke: color, "stroke-width": 0.8 }));
          beam.appendChild(svgText(lxp.toFixed(1), (lyp + 1.5).toFixed(1), txt, "phy-arm-tag", "middle"));
        }
        arcLabel(L2, 225, "L₂", arcCol2);
        arcLabel(L1, 315, "L₁", arcCol1);
        /* 首次进入：力臂线段描画动画（从支点 O 画到垂足，600ms） */
        if (!armAnimDone) {
          armAnimDone = true;
          try {
            [seg2, seg1].forEach(function (sg) {
              var L = Math.abs(parseFloat(sg.getAttribute("x2")) - parseFloat(sg.getAttribute("x1"))) || 1;
              sg.style.strokeDasharray = String(L);
              sg.style.strokeDashoffset = String(L);
            });
            var tA0 = nowMs();
            (function animArm() {
              var kk = Math.min(1, (nowMs() - tA0) / 600);
              [seg2, seg1].forEach(function (sg) {
                var L = Math.abs(parseFloat(sg.getAttribute("x2")) - parseFloat(sg.getAttribute("x1"))) || 1;
                sg.style.strokeDashoffset = (L * (1 - kk)).toFixed(1);
              });
              if (kk < 1) rafFn(animArm);
              else [seg2, seg1].forEach(function (sg) {
                sg.style.strokeDasharray = ""; sg.style.strokeDashoffset = "";
              });
            })();
          } catch (e) {}
        }
      }
      svg.appendChild(beam);
      /* 300ms 缓动：从当前显示角度 tween 到目标角度 */
      (function (g, ox, oy, from, to) {
        if (tiltRaf) cafFn(tiltRaf);
        tiltRaf = 0;
        if (Math.abs(to - from) < 0.05) {
          tiltShown = to;
          g.setAttribute("transform", "rotate(" + to.toFixed(2) + " " + ox + " " + oy + ")");
          return;
        }
        var tStart = nowMs();
        (function step() {
          var k = Math.min(1, (nowMs() - tStart) / 300);
          var e2 = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
          tiltShown = from + (to - from) * e2;
          try { g.setAttribute("transform", "rotate(" + tiltShown.toFixed(2) + " " + ox + " " + oy + ")"); }
          catch (e) {}
          if (k < 1) tiltRaf = rafFn(step);
          else tiltRaf = 0;
        })();
      })(beam, O, BY, tiltShown, tilt);
      /* 支点手柄（三角形标记 + 热区） */
      var oh = svgEl("circle", { cx: O, cy: BY + 4, r: 6, fill: "transparent", "class": "phy-hot" });
      svg.appendChild(oh);
      dragify(oh, { svg: svg, onMove: function (lx) { ful.set(lx, true); drawLever(); },
        onEnd: function () { flash(svg); } });
      /* 读数与判定 */
      if (badArm) {
        badge.setReadout("", "F₁ = —");
        stBadge.textContent = "支点不能压在端点上";
        stBadge.className = "phy-state";
        eqLine.textContent = "";
        return;
      }
      var rel = Math.abs(F1 * L1 - F2 * L2) / Math.max(F1 * L1, F2 * L2);
      var balanced = rel < 0.02;
      var fr = mmlRead(msub("F", "1"), fmtN(F1, 1), unit);
      badge.setReadout(fr.mathml, "F₁ = " + fr.text);
      var eqm = "<math><mrow>" + msub("F", "1") + "<msub><mi>L</mi><mn>1</mn></msub><mo>=</mo>" +
        "<mn>" + fmtN(F1 * L1, 1) + "</mn><mo>" + (balanced ? "✓" : "≠") + "</mo>" +
        "<mn>" + fmtN(F2 * L2, 1) + "</mn><mo>=</mo>" + msub("F", "2") +
        "<msub><mi>L</mi><mn>2</mn></msub></mrow></math>";
      if (mathmlOK()) eqLine.innerHTML = eqm;
      else eqLine.textContent = "F₁L₁=" + fmtN(F1 * L1, 1) + (balanced ? " ✓ = " : " ≠ ") +
        fmtN(F2 * L2, 1) + "=F₂L₂";
      if (balanced) { stBadge.textContent = "平衡 ✓（基本平衡）"; stBadge.className = "phy-state phy-state-ok"; flash(stBadge); }
      else if (F1 < F2) { stBadge.textContent = "省力（F₁ < F₂）"; stBadge.className = "phy-state phy-state-ok"; }
      else { stBadge.textContent = "费力（F₁ > F₂）"; stBadge.className = "phy-state"; }
    }
    ful.on(drawLever);
    if (effS) effS.on(drawLever);
    drawLever();
    return box;
  }

  /* ---------------- P7 · collision-lab（碰撞实验） ---------------- */
  /* 降级：统一一维沿 x 轴解析解；二维/斜碰不做 */
  function widgetCollisionLab(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "一维碰撞实验");
    box.appendChild(svg);
    var sM1 = uiSlider({ label: "①车质量 m₁", min: p.m1.min, max: p.m1.max,
      step: p.m1.step, init: p.m1.init, unit: "kg" });
    var sM2 = uiSlider({ label: "②车质量 m₂", min: p.m2.min, max: p.m2.max,
      step: p.m2.step, init: p.m2.init, unit: "kg" });
    /* 黄队 P7：速度滑块可为负是隐形知识（负号=箭头反了，pedagogy 跃升 1）。
     * 初中页（min≥0）：方向选择器（←/→ 大按钮 ≥48px）+ 大小滑块（0 起）；
     * 高中页（min<0）：保留数值滑块，0 点画刻度分隔线 + "0（静止）"，
     * 负值区标注"← 反向"。读数永远写"v₁ = 3 m/s（向右）"，不写裸 "-3"。 */
    function vText(v) {
      if (Math.abs(v) < 1e-9) return "0 m/s（静止）";
      return fmtN(Math.abs(v), 1) + " m/s（" + (v > 0 ? "向右" : "向左") + "）";
    }
    function veloControl(cfg, label) {
      var neg = cfg.min < 0;
      var wrap = el("div", "phy-velo");
      var dir = cfg.init < 0 ? -1 : 1, mag = null, s = null;
      if (!neg) {
        var bL = el("button", "phy-dir", "←"); bL.type = "button";
        bL.setAttribute("aria-label", label + "方向：向左");
        var bR = el("button", "phy-dir", "→"); bR.type = "button";
        bR.setAttribute("aria-label", label + "方向：向右");
        mag = uiSlider({ label: label + "大小", min: 0, max: cfg.max, step: cfg.step,
          init: Math.abs(cfg.init), unit: "m/s" });
        (function paintDir() {
          bL.setAttribute("aria-pressed", dir < 0 ? "true" : "false");
          bR.setAttribute("aria-pressed", dir > 0 ? "true" : "false");
        })();
        bL.addEventListener("click", function () { dir = -1;
          bL.setAttribute("aria-pressed", "true"); bR.setAttribute("aria-pressed", "false");
          fire(); });
        bR.addEventListener("click", function () { dir = 1;
          bL.setAttribute("aria-pressed", "false"); bR.setAttribute("aria-pressed", "true");
          fire(); });
        wrap.appendChild(bL); wrap.appendChild(mag.row); wrap.appendChild(bR);
      } else {
        s = uiSlider({ label: label, min: cfg.min, max: cfg.max, step: cfg.step,
          init: cfg.init, unit: "m/s" });
        wrap.appendChild(s.row);
        var zero = el("div", "phy-zero-scale", "");
        var f0 = (0 - cfg.min) / (cfg.max - cfg.min);
        zero.innerHTML = '<span class="phy-zero-neg">← 反向</span>' +
          '<span class="phy-zero-mark" style="left:' + (f0 * 100).toFixed(1) + '%">0（静止）</span>' +
          '<span class="phy-zero-pos">正向 →</span>';
        wrap.appendChild(zero);
      }
      var handlers = [];
      function get() { return neg ? s.get() : dir * mag.get(); }
      function fire() { var v = get(); for (var i = 0; i < handlers.length; i++) handlers[i](v); }
      if (mag) mag.on(fire);
      if (s) s.on(fire);
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
    var rafId = 0, playing = false, tF = 0;
    function stopA() { playing = false; if (rafId) cafFn(rafId); rafId = 0; }
    function params() {
      return { m1: sM1.get(), m2: sM2.get(), v1: sV1.get(), v2: sV2.get() };
    }
    function solveCol(q) {
      var v1p = ((q.m1 - e * q.m2) * q.v1 + (1 + e) * q.m2 * q.v2) / (q.m1 + q.m2);
      var v2p = ((q.m2 - e * q.m1) * q.v2 + (1 + e) * q.m1 * q.v1) / (q.m1 + q.m2);
      return { v1p: v1p, v2p: v2p };
    }
    var bar = uiPlaybar({
      onPlay: function () {
        var q = params();
        if (q.v1 === 0 && q.v2 === 0) return;
        playing = true;
        var t0 = nowMs(), base = tF, dur = 2400;
        (function tick() {
          if (!playing) return;
          tF = base + (nowMs() - t0) / dur;
          if (tF >= 1) { tF = 1; stopA(); bar.setPlaying(false); onCollide(); }
          draw(tF);
          bar.setProgress(tF);
          if (playing) rafId = rafFn(tick);
        })();
      },
      onPause: function () { stopA(); },
      onReplay: function () { stopA(); tF = 0; draw(0); },
      onScrub: function (f) { stopA(); tF = f; draw(f); }
    });
    box.appendChild(bar.bar);
    function onCollide() {
      flash(svg); vib(15);
      var q = params(), s = solveCol(q);
      if (q.m1 === q.m2 && e === 1 && q.v2 === 0 && q.v1 !== 0) {
        verdict.textContent = "交换速度 ✓：①车停下，②车以 v₁ 冲出去——动量从①传给了②";
        verdict.className = "phy-state phy-state-ok";
      }
    }
    function draw(f) {
      var q = params(), s = solveCol(q);
      svg.innerHTML = "";
      svg.appendChild(svgEl("line", { x1: 5, y1: 60, x2: 95, y2: 60, "class": "phy-ground" }));
      var TC = 0.45;
      var sc = 26;
      function x1of(t) {
        if (t <= TC) return 50 - sc * q.v1 * (TC - t) - 4;
        return 50 - 4 + sc * s.v1p * (t - TC);
      }
      function x2of(t) {
        if (t <= TC) return 50 - sc * q.v2 * (TC - t) + 4;
        return 50 + 4 + sc * s.v2p * (t - TC);
      }
      var x1 = Math.max(6, Math.min(94, x1of(f))), x2 = Math.max(6, Math.min(94, x2of(f)));
      arrowHead(svg, "fh-v1", cssVar("--phy-body"));
      function cart(x, n, v, vv) {
        svg.appendChild(svgEl("rect", { x: x - 5, y: 50, width: 10, height: 8,
          "class": "phy-body-box" }));
        svg.appendChild(svgText(x, 54.5, n === 1 ? "①" : "②", "phy-cart-label"));
        if (Math.abs(v) > 0.01) {
          var L = Math.max(3, Math.min(16, Math.abs(v) * 3));
          var dir = v > 0 ? 1 : -1;
          svg.appendChild(svgEl("line", { x1: x, y1: 46, x2: x + dir * L, y2: 46,
            stroke: cssVar("--phy-body"), "stroke-width": 1.6, "marker-end": "url(#fh-v1)" }));
          svg.appendChild(svgText(x + dir * (L + 2), 44.5, vText(v), "phy-sym-label",
            dir > 0 ? "start" : "end"));
        }
      }
      cart(x1, 1, f <= TC ? q.v1 : s.v1p);
      cart(x2, 2, f <= TC ? q.v2 : s.v2p);
      /* 动量条（碰前/碰后两组；①灰 ②常规描边色；p=0 不画条配文字） */
      var p1 = q.m1 * q.v1, p2 = q.m2 * q.v2;
      var p1p = q.m1 * s.v1p, p2p = q.m2 * s.v2p;
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
            b.style.background = roleColor(t[2]);
            if (t[1] < 0) b.style.borderStyle = "dashed";
            cell.appendChild(b);
          }
          row.appendChild(cell);
        });
        barsBox.appendChild(row);
      }
      barRow("碰前", p1, p2);
      barRow("碰后", p1p, p2p);
      var pTot = p1 + p2;
      var rm = "<math><mrow><msub><mi>p</mi><mtext>前</mtext></msub><mo>=</mo>" +
        "<msub><mi>p</mi><mtext>后</mtext></msub><mo>=</mo><mn>" + fmtN(pTot, 1) +
        "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">kg·m/s</mi>" +
        "<mo> ✓</mo></mrow></math>";
      badge.setReadout(rm, "p前 = p后 = " + fmtN(pTot, 1) + " kg·m/s ✓");
      var bothZero = q.v1 === 0 && q.v2 === 0;
      bar.playBtn.disabled = bothZero;
      if (bothZero && verdict.textContent.indexOf("调好") !== 0)
        verdict.textContent = "两车都不动，撞不起来";
    }
    [sM1, sM2, sV1, sV2].forEach(function (s) {
      s.on(function () { stopA(); bar.setPlaying(false); tF = 0; bar.setProgress(0); draw(0); });
    });
    draw(0);
    return box;
  }

  /* ---------------- P8 · field-viz（电场/磁场可视化） ---------------- */
  /* 降级：2D 平面切片；电荷 ≤4；拖动中不重算场线、松手后重算；
   * 低端机 lineCount→24（渲染器内部 matchMedia 启发式） */
  function widgetFieldViz(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", p.mode === "bfield" ? "磁场可视化" : "电场可视化");
    /* 黄队 P8 改法 3：拖动中场线半透明 + 角落小字（画布包一层相对定位容器） */
    var stageWrap = el("div", "phy-stage-wrap");
    stageWrap.appendChild(svg);
    var dragNote = el("div", "phy-drag-note", "松手后重算场线");
    stageWrap.appendChild(dragNote);
    box.appendChild(stageWrap);
    var note = noteLine(p.mode === "bfield"
      ? "拖磁铁转一转，看小磁针 N 极跟着转。"
      : "点空白处放电荷（最多 4 个）；拖动电荷，松手后场线重算；双击删除。");
    box.appendChild(note);
    /* 黄队 P8 改法 1：底部工具条（点选模式与点选放置双通道，按钮 ≥44px） */
    var placeMode = null; /* "+", "-", "erase" */
    if (p.mode !== "bfield") {
      var tools = el("div", "phy-field-tools");
      [["＋正电荷", "+"], ["＋负电荷", "-"], ["橡皮擦", "erase"]].forEach(function (t) {
        var b = el("button", "", t[0]); b.type = "button";
        b.setAttribute("aria-pressed", "false");
        (function (mode, btn) {
          btn.addEventListener("click", function () {
            placeMode = (placeMode === mode) ? null : mode;
            var btns = tools.querySelectorAll("button");
            for (var i = 0; i < btns.length; i++)
              btns[i].setAttribute("aria-pressed", btns[i] === btn && placeMode ? "true" : "false");
          });
        })(t[1], b);
        tools.appendChild(b);
      });
      box.appendChild(tools);
    }
    var lineCount = p.lineCount || 32;
    try {
      if (lineCount > 24 && typeof window.matchMedia === "function" &&
          window.matchMedia("(pointer:coarse)").matches) lineCount = 24;
    } catch (e) {}
    lineCount = Math.min(48, lineCount);
    /* 电荷数组：bfield 分支的 traceField 也引用（空数组），故提前声明 */
    var charges = [];

    if (p.mode === "bfield") {
      var mag = { x: (p.magnet && p.magnet.x) || 50, y: (p.magnet && p.magnet.y) || 50,
        a: (p.magnet && p.magnet.angle) || 0 };
      var nN = Math.min(p.needleCount || 8, 12);
      var filings = el("div", "phy-check-row");
      var fLb = el("label", "phy-check");
      var fCk = el("input", "");
      fCk.type = "checkbox"; fCk.checked = !!p.ironFilings;
      fLb.appendChild(fCk);
      fLb.appendChild(el("span", "", "撒铁屑（看磁感线排布示意）"));
      filings.appendChild(fLb);
      box.appendChild(filings);
      fCk.addEventListener("change", drawB);
      function Bdip(x, y) {
        /* 条形磁铁偶极子场（静磁场示意） */
        var dx = x - mag.x, dy = -(y - mag.y), r2 = dx * dx + dy * dy;
        if (r2 < 4) return { x: 0, y: 0 };
        var r = Math.sqrt(r2), nx = dx / r, ny = dy / r;
        var ma = mag.a * Math.PI / 180, mx = Math.cos(ma), my = Math.sin(ma);
        var dot = mx * nx + my * ny;
        var k = 2000 / (r2 * r);
        return { x: k * (3 * dot * nx - mx), y: k * (3 * dot * ny - my) };
      }
      function drawB() {
        svg.innerHTML = "";
        arrowHead(svg, "fh-f", cssVar("--phy-field"));
        var ma = mag.a * Math.PI / 180;
        var L = 13, Wd = 5;
        var g = svgEl("g", { transform: "rotate(" + (-mag.a) + " " + mag.x + " " + (100 - mag.y) + ")" });
        var cy = 100 - mag.y;
        g.appendChild(svgEl("rect", { x: mag.x - L, y: cy - Wd, width: L, height: Wd * 2,
          fill: cssVar("--phy-charge-neg"), opacity: 0.85 }));
        g.appendChild(svgEl("rect", { x: mag.x, y: cy - Wd, width: L, height: Wd * 2,
          fill: cssVar("--phy-charge-pos"), opacity: 0.85 }));
        g.appendChild(svgText(mag.x - L / 2, cy + 2, "S", "phy-mag-label"));
        g.appendChild(svgText(mag.x + L / 2, cy + 2, "N", "phy-mag-label"));
        svg.appendChild(g);
        var body = svgEl("rect", { x: mag.x - L - 3, y: cy - Wd - 3, width: 2 * L + 6,
          height: 2 * Wd + 6, fill: "transparent", "class": "phy-hot" });
        svg.appendChild(body);
        dragify(body, { svg: svg, onMove: function (lx, ly) {
          mag.x = Math.max(16, Math.min(84, lx)); mag.y = Math.max(16, Math.min(84, 100 - ly));
          drawB();
        }, onEnd: function () { flash(svg); } });
        var rot = svgEl("circle", { cx: mag.x + L + 8, cy: cy, r: 6, "class": "phy-handle",
          fill: cssVar("--phy-known"), "aria-label": "旋转磁铁" });
        /* 黄队 P8 改法 2：旋转手柄首次进入脉冲提示一次 */
        if (!hintSeen(curPageId + "-field")) rot.classList.add("phy-handle-pulse");
        svg.appendChild(rot);
        dragify(rot, { svg: svg, onMove: function (lx, ly) {
          mag.a = Math.atan2(-(ly - cy), lx - mag.x) * 180 / Math.PI;
          drawB();
        }, onEnd: function () { markHintSeen(curPageId + "-field"); } });
        /* 小磁针：N 极指向该点磁感应方向 */
        for (var i = 0; i < nN; i++) {
          var na = i / nN * 2 * Math.PI;
          var nx = mag.x + 26 * Math.cos(na), ny = mag.y + 26 * Math.sin(na);
          if (nx < 6 || nx > 94 || ny < 6 || ny > 94) continue;
          var B = Bdip(nx, ny);
          var ba = Math.atan2(-B.y, B.x);
          var nl = 7;
          var x1 = nx - Math.cos(ba) * nl / 2, y1 = (100 - ny) + Math.sin(ba) * nl / 2;
          var x2 = nx + Math.cos(ba) * nl / 2, y2 = (100 - ny) - Math.sin(ba) * nl / 2;
          svg.appendChild(svgEl("line", { x1: x1, y1: y1, x2: (x1 + x2) / 2, y2: (y1 + y2) / 2,
            stroke: cssVar("--phy-charge-neg"), "stroke-width": 2 }));
          svg.appendChild(svgEl("line", { x1: (x1 + x2) / 2, y1: (y1 + y2) / 2, x2: x2, y2: y2,
            stroke: cssVar("--phy-charge-pos"), "stroke-width": 2, "marker-end": "url(#fh-f)" }));
          svg.appendChild(svgText(x2 + 1.5, y2 - 1, "N", "phy-sym-label", "start"));
        }
        /* 磁感线（N 出发环回 S） */
        if (p.showFieldLines !== false) {
          for (var k = 0; k < 10; k++) {
            var sa = mag.a * Math.PI / 180 + (k / 10 - 0.5) * 2.4;
            var sx = mag.x + Math.cos(sa) * (L + 2), sy = mag.y + Math.sin(sa) * (L + 2);
            var pts = traceField(sx, sy, Bdip, 160);
            if (pts.length > 4) {
              var d = "M" + pts.map(function (q) {
                return q.x.toFixed(1) + "," + (100 - q.y).toFixed(1);
              }).join(" L");
              svg.appendChild(svgEl("path", { d: d, fill: "none",
                stroke: cssVar("--phy-field"), "stroke-width": 0.9,
                "marker-mid": "url(#fh-f)" }));
            }
          }
        }
        /* 撒铁屑：沿磁感线排布的静态纹理（非真实随机模拟） */
        if (fCk.checked) {
          var dots = svgEl("g", { "class": "phy-filings" });
          for (var j = 0; j < 10; j++) {
            var sa2 = mag.a * Math.PI / 180 + (j / 10 - 0.5) * 2.4;
            var pts2 = traceField(mag.x + Math.cos(sa2) * (L + 2),
              mag.y + Math.sin(sa2) * (L + 2), Bdip, 160);
            for (var m2 = 0; m2 < pts2.length; m2 += 6) {
              dots.appendChild(svgEl("circle", { cx: pts2[m2].x, cy: 100 - pts2[m2].y,
                r: 0.55, fill: cssVar("--phy-track") }));
            }
          }
          svg.appendChild(dots);
        }
        var r = mmlRead(mi("B"), "N极指向该点磁场方向", "");
        badge.setReadout("", "小磁针 N 极指向该点磁场方向");
      }
      drawB();
      return box;
    }

    /* 电场模式 */
    charges = (p.charges || []).map(function (c, i) {
      return { id: "q" + i, x: c.x, y: c.y, q: c.q >= 0 ? 1 : -1 };
    });
    var probe = { x: 50, y: 72 };
    function Efield(x, y) {
      var ex = 0, ey = 0;
      charges.forEach(function (c) {
        var dx = x - c.x, dy = y - c.y, r2 = dx * dx + dy * dy;
        if (r2 < 0.5) return;
        var r = Math.sqrt(r2), k = c.q / (r2 * r);
        ex += k * dx; ey += k * dy;
      });
      return { x: ex, y: ey };
    }
    function traceField(sx, sy, fieldFn, maxPts) {
      var pts = [{ x: sx, y: sy }], h = 1.1;
      for (var i = 0; i < (maxPts || 200); i++) {
        var q = pts[pts.length - 1];
        var f1 = fieldFn(q.x, q.y);
        var n1 = Math.hypot(f1.x, f1.y);
        if (n1 < 1e-9) break;
        var mx = q.x + f1.x / n1 * h / 2, my = q.y + f1.y / n1 * h / 2;
        var f2 = fieldFn(mx, my), n2 = Math.hypot(f2.x, f2.y) || 1;
        var nx = q.x + f2.x / n2 * h, ny = q.y + f2.y / n2 * h;
        var hit = charges.some(function (c) { return Math.hypot(nx - c.x, ny - c.y) < 3; });
        if (hit || nx < 2 || nx > 98 || ny < 2 || ny > 98) break;
        pts.push({ x: nx, y: ny });
      }
      return pts;
    }
    function drawE() {
      svg.innerHTML = "";
      arrowHead(svg, "fh-f", cssVar("--phy-field"));
      /* 黄队 P8 改法 1：首次进入电场模式页，空白画布显示 3 个虚线圆圈占位；
       * 放置后占位消失（只出现一次）。 */
      if (!charges.length && !hintSeen(curPageId + "-field")) {
        [[25, 50], [50, 50], [75, 50]].forEach(function (pt) {
          svg.appendChild(svgEl("circle", { cx: pt[0], cy: 100 - pt[1], r: 5,
            fill: "none", stroke: cssVar("--phy-track"), "stroke-width": 1,
            "class": "phy-placeholder" }));
        });
        svg.appendChild(svgText(50, 32, "点这里放一个正电荷", "phy-note-text"));
      }
      /* 场线 */
      var totQ = charges.reduce(function (s, c) { return s + Math.abs(c.q); }, 0) || 1;
      charges.forEach(function (c) {
        var n = Math.max(4, Math.round(lineCount * Math.abs(c.q) / totQ));
        for (var i = 0; i < n; i++) {
          var a = i / n * 2 * Math.PI;
          var sx = c.x + Math.cos(a) * 3.2 * (c.q > 0 ? 1 : 1);
          var sy = c.y + Math.sin(a) * 3.2;
          var dir = c.q > 0 ? 1 : -1;
          var pts = traceFieldDir(sx, sy, dir);
          /* 负电荷：场线止于负电荷——反转点列使箭头指向电荷 */
          if (c.q < 0) pts = pts.slice().reverse();
          if (pts.length > 4) {
            var d = "M" + pts.map(function (q) {
              return q.x.toFixed(1) + "," + (100 - q.y).toFixed(1);
            }).join(" L");
            svg.appendChild(svgEl("path", { d: d, fill: "none",
              stroke: cssVar("--phy-field"), "stroke-width": 0.9 }));
            var mid = pts[Math.floor(pts.length / 2)];
            var nx2 = pts[Math.floor(pts.length / 2) + 1] || mid;
            svg.appendChild(svgEl("line", {
              x1: mid.x, y1: 100 - mid.y,
              x2: mid.x + (nx2.x - mid.x) * 2.5, y2: 100 - mid.y - (nx2.y - mid.y) * 2.5,
              stroke: cssVar("--phy-field"), "stroke-width": 0.9, "marker-end": "url(#fh-f)" }));
          }
        }
      });
      /* 电荷（可拖；双击删除） */
      charges.forEach(function (c) {
        var col = c.q > 0 ? cssVar("--phy-charge-pos") : cssVar("--phy-charge-neg");
        var circ = svgEl("circle", { cx: c.x, cy: 100 - c.y, r: 4.2,
          fill: col, "class": "phy-charge" });
        svg.appendChild(circ);
        svg.appendChild(svgText(c.x, 100 - c.y + 2, c.q > 0 ? "+" : "−", "phy-charge-label"));
        dragify(circ, { svg: svg,
          onStart: function () {
            /* 黄队 P8 改法 3：拖动中场线变 40% 半透明 + 角落小字（性能降级的诚实标注） */
            svg.classList.add("phy-field-dragging");
            dragNote.style.display = "block";
          },
          onMove: function (lx, ly) {
          c.x = Math.max(6, Math.min(94, lx)); c.y = Math.max(6, Math.min(94, 100 - ly));
          circ.setAttribute("cx", c.x); circ.setAttribute("cy", 100 - c.y);
        }, onEnd: function () {
          svg.classList.remove("phy-field-dragging");
          dragNote.style.display = "none";
          drawE(); flash(svg);
        } });
        circ.addEventListener("click", function (ev) {
          /* 橡皮擦模式：点电荷删除 */
          if (placeMode !== "erase") return;
          try { ev.stopPropagation(); } catch (e) {}
          charges = charges.filter(function (x) { return x !== c; });
          drawE();
        });
        circ.addEventListener("dblclick", function () {
          charges = charges.filter(function (x) { return x !== c; });
          drawE();
        });
      });
      /* 探测手柄（probeDrag=false 时不显示） */
      if (p.probeDrag !== false) {
      var E = Efield(probe.x, probe.y);
      var em = Math.hypot(E.x, E.y);
      if (em > 1e-9) {
        var pa = Math.atan2(E.y, E.x);
        var pl = 9;
        svg.appendChild(svgEl("line", { x1: probe.x, y1: 100 - probe.y,
          x2: probe.x + Math.cos(pa) * pl, y2: 100 - probe.y - Math.sin(pa) * pl,
          stroke: cssVar("--phy-target"), "stroke-width": 2, "marker-end": "url(#fh-f)" }));
        svg.appendChild(svgText(probe.x, 100 - probe.y - pl - 2,
          dirText(pa) + " · " + strengthText(em), "phy-probe-label"));
      }
      var pr = svgEl("circle", { cx: probe.x, cy: 100 - probe.y, r: 6,
        fill: "none", stroke: cssVar("--phy-known"), "stroke-width": 2,
        "class": "phy-handle", "aria-label": "拖动探测点" });
      /* 探测手柄：蓝色手柄 + 首次脉冲提示（全仓统一） */
      if (!hintSeen(curPageId + "-field")) pr.classList.add("phy-handle-pulse");
      svg.appendChild(pr);
      dragify(pr, { svg: svg, onMove: function (lx, ly) {
        probe.x = Math.max(4, Math.min(96, lx)); probe.y = Math.max(4, Math.min(96, 100 - ly));
        drawE();
      }, onStart: function () { markHintSeen(curPageId + "-field"); } });
      } /* probeDrag */
      /* 点选放置（工具条点选模式与点选放置双通道） */
      svg.addEventListener("click", function (ev) {
        var tgtCls = ev.target && ev.target.getAttribute ? ev.target.getAttribute("class") : "";
        var onBlank = ev.target === svg || tgtCls === "phy-placeholder";
        if (!onBlank || placeMode === "erase") return;
        var q = toSVG(svg, ev.clientX, ev.clientY);
        if (charges.length >= 4) { note.textContent = "最多放 4 个电荷。"; flash(note); return; }
        var ly = 100 - q.y;
        var overlap = charges.some(function (c) { return Math.hypot(c.x - q.x, c.y - ly) < 8; });
        if (overlap) { note.textContent = "电荷叠在一起了，挪开一点。"; flash(note); return; }
        var qsign;
        if (placeMode === "+") qsign = 1;
        else if (placeMode === "-") qsign = -1;
        else qsign = charges.filter(function (c) { return c.q > 0; }).length <=
             charges.filter(function (c) { return c.q < 0; }).length ? 1 : -1;
        charges.push({ id: "q" + Date.now(), x: q.x, y: ly, q: qsign });
        markHintSeen(curPageId + "-field"); /* 占位只出现一次 */
        drawE(); flash(svg); vib(10);
      });
      badge.setReadout("", "电荷 " + charges.length + " 个（+ / − 示意单位）");
    }
    function traceFieldDir(sx, sy, dir) {
      var pts = [{ x: sx, y: sy }], h = 1.1;
      for (var i = 0; i < 200; i++) {
        var q = pts[pts.length - 1];
        var f = Efield(q.x, q.y), n = Math.hypot(f.x, f.y);
        if (n < 1e-9) break;
        var nx = q.x + dir * f.x / n * h, ny = q.y + dir * f.y / n * h;
        var hit = charges.some(function (c) { return Math.hypot(nx - c.x, ny - c.y) < 3; });
        if (hit || nx < 2 || nx > 98 || ny < 2 || ny > 98) break;
        pts.push({ x: nx, y: ny });
      }
      return pts;
    }
    function dirText(a) {
      var deg = ((a * 180 / Math.PI) % 360 + 360) % 360;
      var names = ["向右", "向右偏上", "向上", "向左偏上", "向左", "向左偏下", "向下", "向右偏下"];
      return names[Math.round(deg / 45) % 8];
    }
    function strengthText(em) {
      var ref = 0;
      charges.forEach(function (c) { ref = Math.max(ref, 1 / 25); });
      ref = Math.max(ref, 0.02);
      return em > ref * 8 ? "强" : em > ref * 2 ? "中" : "弱";
    }
    drawE();
    return box;
  }

  /* ---------------- P9 · thermo-sim（热学模拟） ---------------- */
  /* 降级：分子 = "速率 ∝ √T 随机圆点"示意；粒子 ≤400；只边界反射 */
  function widgetThermoSim(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var cv = el("canvas", "phy-thermo-cv");
    cv.setAttribute("aria-label", "分子热运动示意");
    box.appendChild(cv);
    var tCtl = uiSlider({ label: "温度 T", min: p.temp.min, max: p.temp.max,
      step: p.temp.step, init: p.temp.init, unit: p.temp.unit || "℃" });
    box.appendChild(tCtl.row);
    var btnRow = el("div", "phy-btn-row");
    var bHeat = el("button", "phy-heat", "🔥 加热");
    var bCool = el("button", "phy-cool", "❄ 制冷");
    bHeat.type = "button"; bCool.type = "button";
    btnRow.appendChild(bHeat); btnRow.appendChild(bCool);
    box.appendChild(btnRow);
    var stBadge = stateBadge("—", "");
    box.appendChild(stBadge);
    box.appendChild(noteLine("以水为例：0℃ 是冰的熔点，100℃ 是水的沸点，其他物质不一样。"));
    var slowNote = noteLine(""); slowNote.style.display = "none";
    box.appendChild(slowNote);
    var lowNote = noteLine("分子仍在振动，动画已放大显示。"); lowNote.style.display = "none";
    box.appendChild(lowNote);
    var n = Math.min(p.particleCount || 120, 400);
    if ((p.particleCount || 120) > 400 && typeof console !== "undefined" && console.warn)
      console.warn("[thermo-sim] particleCount 超 400，已钳制。");
    var ps = [];
    function reset() {
      ps = [];
      for (var i = 0; i < n; i++) ps.push({ x: 8 + Math.random() * 84, y: 10 + Math.random() * 72,
        a: Math.random() * 2 * Math.PI, sp: 0.4 + Math.random() * 0.6 });
    }
    reset();
    var brown = null;
    if (p.brownian) {
      brown = { x: 50, y: 46 };
      box.appendChild(noteLine("大颗粒在做布朗运动（示意，非真实碰撞）。"));
    }
    var playing = true, rafId = 0, lastT = 0, crossed = null;
    var bar = uiPlaybar({
      onPlay: function () { playing = true; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { reset(); draw(); },
      onScrub: null
    });
    bar.scrub.style.display = "none";
    box.appendChild(bar.bar);
    function hold(btn, d) {
      var id = 0;
      function step() { tCtl.set(tCtl.get() + d * p.temp.step); }
      btn.addEventListener("pointerdown", function (e) {
        if (e.preventDefault) e.preventDefault();
        step(); id = every(step, 120);
      });
      ["pointerup", "pointerleave", "pointercancel"].forEach(function (t) {
        btn.addEventListener(t, function () { cancelEvery(id); id = 0; });
      });
    }
    hold(bHeat, 1); hold(bCool, -1);
    function tierOf(sp) { return sp < 0.5 ? 0 : sp < 0.85 ? 1 : 2; }
    /* F5–F9 修复（2026-10-15）：粒子速率必须随 T 严格单调上升
     *（文案"加热=粒子加速"为真值，PHY-X08）。旧 sc=min(1,1.1/(1.5·vScale))
     * 在全部可达温度下把 vScale 完全抵消，致速率恒定。
     * 新映射：k(T) = 0.35+0.65·(vScale−vMin)/(vMax−vMin)，vScale=√(T_K/293.15)，
     * 按本页温度范围归一化——严格单调（速率 ∝ √T 趋势），高温端钳制在
     * 可视速度内（"已慢放"示意保留）。 */
    var vTMin = Math.sqrt((p.temp.min + 273.15) / 293.15);
    var vTMax = Math.sqrt((p.temp.max + 273.15) / 293.15);
    function speedK(T) {
      var vs = Math.sqrt((T + 273.15) / 293.15);
      var q = vTMax > vTMin ? (vs - vTMin) / (vTMax - vTMin) : 1;
      q = Math.max(0, Math.min(1, q));
      return 0.35 + 0.65 * q;
    }
    var TIER_COL = ["--phy-charge-neg", "--phy-force-a", "--phy-charge-pos"];
    var TIER_ZH = ["慢", "中", "快"];
    function draw() {
      var T = tCtl.get();
      var W = 340, H = 190;
      var ctx = fitCanvas(cv, W, H);
      /* 物态徽章 */
      var st = T < 0 ? "固态（冰）" : T < 100 ? "液态（水）" : "气态（水蒸气）";
      if (st !== stBadge.textContent) {
        stBadge.textContent = st;
        stBadge.className = "phy-state phy-state-ok";
        if ((crossed === "low" && T >= 0) || (crossed === "high" && T < 100) ||
            (T < 0 && crossed !== "low") || (T >= 100 && crossed !== "high")) flash(stBadge);
      }
      crossed = T < 0 ? "low" : T >= 100 ? "high" : "mid";
      lowNote.style.display = T <= 0 ? "" : "none";
      var r = mmlRead(mi("T"), fmtN(T, 0), p.temp.unit || "℃");
      badge.setReadout(r.mathml, "T = " + r.text);
      /* 0℃/100℃ 刻度线高亮 */
      if (!ctx) return;
      ctx.clearRect(0, 0, W, H);
      ctx.strokeStyle = cssVar("--phy-body"); ctx.lineWidth = 2;
      ctx.strokeRect(4, 4, W - 8, H - 34);
      /* 温度条 */
      var tx0 = 8, tx1 = W - 8, ty = H - 18;
      ctx.strokeStyle = cssVar("--phy-track"); ctx.lineWidth = 4;
      ctx.beginPath(); ctx.moveTo(tx0, ty); ctx.lineTo(tx1, ty); ctx.stroke();
      [0, 100].forEach(function (tv) {
        if (tv < p.temp.min || tv > p.temp.max) return;
        var px = tx0 + (tv - p.temp.min) / (p.temp.max - p.temp.min) * (tx1 - tx0);
        ctx.strokeStyle = cssVar("--phy-highlight"); ctx.lineWidth = 5;
        ctx.beginPath(); ctx.moveTo(px, ty - 6); ctx.lineTo(px, ty + 6); ctx.stroke();
        ctx.fillStyle = cssVar("--phy-body"); ctx.font = "10px sans-serif"; ctx.textAlign = "center";
        ctx.fillText(tv + "℃", px, ty + 18);
      });
      /* F5–F9：慢放标注常驻（动画速度经缩放示意，非真实分子速率） */
      slowNote.style.display = "";
      slowNote.textContent = "已慢放（高温粒子太快，动画降速示意）。";
      /* 粒子 */
      ps.forEach(function (q) {
        var sp = q.sp * speedK(T);
        var tier = tierOf(q.sp);
        var px = 4 + q.x / 100 * (W - 8), py = 4 + q.y / 100 * (H - 38);
        ctx.fillStyle = cssVar(TIER_COL[tier]);
        if (tier === 0) { ctx.beginPath(); ctx.arc(px, py, 2.6, 0, 7); ctx.fill(); }
        else if (tier === 1) {
          ctx.beginPath(); ctx.moveTo(px, py - 3.2); ctx.lineTo(px + 3, py + 2.4);
          ctx.lineTo(px - 3, py + 2.4); ctx.closePath(); ctx.fill();
        } else { ctx.fillRect(px - 2.6, py - 2.6, 5.2, 5.2); }
        q.px = px; q.py = py; q.tier = tier;
      });
      /* 图例：颜色+形状+文字三编码 */
      ctx.font = "10px sans-serif"; ctx.textAlign = "left";
      TIER_ZH.forEach(function (z, i) {
        var lx = 10 + i * 52, ly2 = 14;
        ctx.fillStyle = cssVar(TIER_COL[i]);
        ctx.fillRect(lx, ly2 - 4, 8, 8);
        ctx.fillStyle = cssVar("--phy-body");
        ctx.fillText(z, lx + 12, ly2 + 4);
      });
      if (brown) {
        ctx.fillStyle = cssVar("--phy-body");
        ctx.beginPath(); ctx.arc(4 + brown.x / 100 * (W - 8), 4 + brown.y / 100 * (H - 38), 6, 0, 7);
        ctx.fill();
      }
    }
    function stepPhys(dt) {
      var T = tCtl.get(), kNow = speedK(T);
      ps.forEach(function (q) {
        var sp = q.sp * kNow;
        q.x += Math.cos(q.a) * sp; q.y += Math.sin(q.a) * sp * 0.8;
        if (q.x < 8 || q.x > 92) { q.a = Math.PI - q.a; q.x = Math.max(8, Math.min(92, q.x)); }
        if (q.y < 10 || q.y > 82) { q.a = -q.a; q.y = Math.max(10, Math.min(82, q.y)); }
      });
      if (brown) {
        brown.x += (Math.random() - 0.5) * 1.6;
        brown.y += (Math.random() - 0.5) * 1.6;
        brown.x = Math.max(10, Math.min(90, brown.x));
        brown.y = Math.max(12, Math.min(80, brown.y));
      }
    }
    function loop() {
      if (!playing) return;
      var t = nowMs(), dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
      lastT = t;
      stepPhys(dt);
      draw();
      rafId = rafFn(loop);
    }
    tCtl.on(function () { draw(); });
    draw();
    lastT = nowMs();
    loop();
    return box;
  }

  /* ---------------- P10 · spring-shm（弹簧振子） ---------------- */
  /* 降级：阻尼只做定性"振幅渐小"示意，不做阻尼方程数值解 */
  function widgetSpringShm(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "弹簧振子振动");
    box.appendChild(svg);
    var xt = el("canvas", "phy-xt-cv");
    xt.setAttribute("aria-label", "x-t 图像");
    box.appendChild(xt);
    var eqLine = el("div", "phy-formula-line", "");
    box.appendChild(eqLine);
    var spdNote = noteLine(""); spdNote.style.display = "none";
    box.appendChild(spdNote);
    var sK = uiSlider({ label: "劲度系数 k", min: p.k.min, max: p.k.max,
      step: p.k.step, init: p.k.init, unit: "N/m" });
    var sM = uiSlider({ label: "质量 m", min: p.m.min, max: p.m.max,
      step: p.m.step, init: p.m.init, unit: "kg" });
    box.appendChild(sK.row); box.appendChild(sM.row);
    var playing = true, rafId = 0, tV = 0, lastT = nowMs();
    var A = 14; /* 振幅（逻辑单位） */
    var bar = uiPlaybar({
      onPlay: function () { playing = true; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { tV = 0; pts = []; draw(); },
      onScrub: null
    });
    bar.scrub.style.display = "none";
    box.appendChild(bar.bar);
    var pts = [];
    function omega() { return Math.sqrt(sK.get() / sM.get()); }
    function period() { return 2 * Math.PI / omega(); }
    function draw() {
      var T = period();
      var Tvis = Math.max(0.8, Math.min(2.4, T));
      var tuned = Tvis !== T;
      spdNote.style.display = tuned ? "" : "none";
      if (tuned) spdNote.textContent = "动画已调速，非真实时间。";
      var w = omega();
      var damp = p.damping ? Math.exp(-0.12 * tV) : 1;
      var x = A * damp * Math.cos(w * tV * (T / Tvis));
      svg.innerHTML = "";
      var eqX = 34;
      /* 墙 + 弹簧（折线） */
      svg.appendChild(svgEl("line", { x1: 8, y1: 30, x2: 8, y2: 70, "class": "phy-ground" }));
      for (var i = 0; i < 5; i++)
        svg.appendChild(svgEl("line", { x1: 8, y1: 34 + i * 8, x2: 5, y2: 32 + i * 8,
          stroke: cssVar("--phy-track"), "stroke-width": 0.8 }));
      var mx = eqX + x;
      var coils = 8, x0 = 10, x1 = mx - 5;
      var d = "M" + x0 + ",50";
      for (var j2 = 0; j2 <= coils; j2++) {
        var px = x0 + (x1 - x0) * j2 / coils;
        var py = 50 + (j2 % 2 === 0 ? -6 : 6) * (j2 === 0 || j2 === coils ? 0 : 1);
        d += " L" + px.toFixed(1) + "," + py.toFixed(1);
      }
      svg.appendChild(svgEl("path", { d: d, fill: "none",
        stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
      var blk = svgEl("rect", { x: mx - 5, y: 43, width: 10, height: 14, "class": "phy-body-box" });
      svg.appendChild(blk);
      /* 平衡位置：虚线 + O */
      svg.appendChild(svgEl("line", { x1: eqX, y1: 32, x2: eqX, y2: 68, "class": "phy-track-line" }));
      svg.appendChild(svgText(eqX, 72, "O", "phy-f-label"));
      /* 振幅：双箭头 + 读数 */
      arrowHead(svg, "fh-amp", cssVar("--phy-body"));
      svg.appendChild(svgEl("line", { x1: eqX, y1: 78, x2: eqX + A * damp, y2: 78,
        stroke: cssVar("--phy-body"), "stroke-width": 1,
        "marker-start": "url(#fh-amp)", "marker-end": "url(#fh-amp)" }));
      svg.appendChild(svgText(eqX + A * damp / 2, 83, "A=" + fmtN(A * damp, 1), "phy-sym-label"));
      /* 振子拖拽改振幅（松手即从该位置释放，初相位 0） */
      dragify(blk, { svg: svg, onMove: function (lx) {
        A = Math.max(4, Math.min(24, Math.abs(lx - eqX)));
        tV = 0; pts = []; draw();
      }, onEnd: function () { flash(svg); } });
      /* x-t 图（≤300 点，当前时刻游标线） */
      var W = 340, H = 110;
      var ctx = fitCanvas(xt, W, H);
      if (ctx) {
        ctx.clearRect(0, 0, W, H);
        ctx.strokeStyle = "#BBBBBB"; ctx.lineWidth = 1;
        ctx.beginPath(); ctx.moveTo(6, H / 2); ctx.lineTo(W - 6, H / 2); ctx.stroke();
        ctx.strokeStyle = cssVar("--phy-wave-a"); ctx.lineWidth = 2;
        ctx.beginPath();
        pts.forEach(function (q, i) {
          var px = 6 + q.t / (Tvis * 2.2) * (W - 12);
          var py = H / 2 - q.x / 26 * (H / 2 - 8);
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        });
        ctx.stroke();
        if (pts.length) {
          var last = pts[pts.length - 1];
          var cxp = 6 + last.t / (Tvis * 2.2) * (W - 12);
          ctx.strokeStyle = cssVar("--phy-target"); ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(cxp, 4); ctx.lineTo(cxp, H - 4); ctx.stroke();
        }
        ctx.fillStyle = cssVar("--phy-body"); ctx.font = "10px sans-serif";
        ctx.fillText("x-t 图像", 8, 12);
      }
      var rm = mmlRead(mi("T"), fmtN(T, 2), "s");
      badge.setReadout(rm.mathml, "T = " + rm.text);
      var eqm = "<math><mrow><mi>T</mi><mo>=</mo><mn>2</mn><mi>π</mi>" +
        "<msqrt><mfrac><mi>m</mi><mi>k</mi></mfrac></msqrt><mo>=</mo><mn>" +
        fmtN(T, 2) + "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">s</mi></mrow></math>";
      if (mathmlOK()) eqLine.innerHTML = eqm;
      else eqLine.textContent = "T = 2π√(m/k) = " + fmtN(T, 2) + " s";
      if (p.damping) {
        var dn = box.querySelector(".phy-damp-note");
        if (!dn) box.appendChild(noteLine("振幅慢慢变小（示意）。"));
      }
    }
    function loop() {
      if (!playing) return;
      var t = nowMs(), dt = Math.min(0.05, (t - lastT) / 1000 || 0.016);
      lastT = t;
      var T = period(), Tvis = Math.max(0.8, Math.min(2.4, T));
      tV += dt * (T / Tvis);
      var w = omega(), damp = p.damping ? Math.exp(-0.12 * tV) : 1;
      pts.push({ t: tV % (Tvis * 2.2), x: A * damp * Math.cos(w * tV * (T / Tvis)) });
      if (pts.length > 300) pts.shift();
      draw();
      rafId = rafFn(loop);
    }
    sK.on(function () { tV = 0; pts = []; draw(); });
    sM.on(function () { tV = 0; pts = []; draw(); });
    draw();
    loop();
    return box;
  }

  /* ---------------- Y1 · guess-verify（先猜后验） ---------------- */
  /* 铁律：不判对错、无红叉；只记录选项供学习报告用 */
  function widgetGuessVerify(p) {
    var box = el("div", "phy-guess");
    box.appendChild(el("div", "phy-guess-q", "🤔 " + (p.question || "")));
    var opts = el("div", "phy-guess-opts");
    opts.setAttribute("role", "group");
    opts.setAttribute("aria-label", "先猜一猜");
    var chosen = -1;
    var btns = [];
    (p.options || []).slice(0, 4).forEach(function (op, i) {
      var b = el("button", "", op);
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        chosen = i;
        btns.forEach(function (x, j) { x.setAttribute("aria-pressed", j === i ? "true" : "false"); });
        verify.disabled = false;
        flash(b);
      });
      btns.push(b); opts.appendChild(b);
    });
    box.appendChild(opts);
    var row = el("div", "phy-btn-row");
    var verify = el("button", "phy-next", "动手验证 →");
    verify.type = "button"; verify.disabled = true;
    var tip = el("span", "phy-note", "先猜，再动手验证（猜错不扣分）。");
    row.appendChild(verify); row.appendChild(tip);
    box.appendChild(row);
    /* 黄队 Y1：验证后猜测条折叠，但保留重选入口——"我的猜测：××（点我可改）"，
     * 点开展开重选；记录最后一次选择（学习报告读最后一次）。不判对错。 */
    var bar = el("button", "phy-mini phy-guess-change", "");
    bar.type = "button";
    bar.style.display = "none";
    function paintBar() {
      bar.textContent = "我的猜测：" + ((p.options || [])[chosen] || "") + "（点我可改）";
    }
    bar.addEventListener("click", function () {
      bar.style.display = "none";
      opts.style.display = ""; row.style.display = "";
      verify.disabled = false;
    });
    box.appendChild(bar);
    var noted = false;
    verify.addEventListener("click", function () {
      try { store(p.recordKey, { choice: chosen, ts: Date.now() }); } catch (e) {}
      opts.style.display = "none"; row.style.display = "none";
      paintBar();
      bar.style.display = "";
      if (!noted) { noted = true; box.appendChild(noteLine("已记下你的猜测，去动手验证吧。")); }
      flash(box); vib(10);
    });
    return box;
  }

  /* ---------------- Y2 · read-gauge（仪表读数练习器） ---------------- */
  /* 五种仪表共用刻度引擎；口径冻结：容差=分度值×1、估读到下一位；
   * 试触不做真实电路仿真；天平游码=线性拖拽 */
  function widgetReadGauge(p) {
    var box = el("div", "phy-widget");
    var gauge = p.gauge;
    var range = p.range || { min: 0, max: 10, unit: "" };
    var div = p.divisions || 1;
    var estimate = p.estimate !== false;
    var tol = (p.tolerance || "1division") === "1division" ? div : parseFloat(p.tolerance) || div;
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
    function decOf(d) {
      var s = String(d);
      return s.indexOf(".") >= 0 ? s.split(".")[1].length : 0;
    }
    function checkInput(input, target, unit, dv) {
      dv = dv == null ? div : dv;
      var raw = String(input.value).trim().replace("−", "-");
      var v = parseFloat(raw);
      if (!isFinite(v)) { say(false, "先填一个数。"); return; }
      var dec = (raw.split(".")[1] || "").length;
      var needDec = decOf(dv) + (estimate ? 1 : 0);
      var tolHere = (p.tolerance || "1division") === "1division" ? dv : parseFloat(p.tolerance) || dv;
      if (estimate && dec > needDec) {
        say(false, "估读只到分度值下一位（" + needDec + " 位小数）。");
        return;
      }
      /* W1 修复（2026-10-15，专家队裁决升级为 FAIL）：判对反馈是示范答案，
       * 必须定长显示估读位（PHY-R03：少一位都算 FAIL）。只改这一处；
       * 刻度标签与"差了 X"提示保持去尾零不动。 */
      if (Math.abs(v - target) <= tolHere + 1e-9) say(true, "读数 " + Number(target).toFixed(needDec) + " " + unit + "。");
      /* 黄队 Y2 改法 3：零下读数缺负号判错时给针对性提示（不红叉，只提示） */
      else if (target < 0 && v > 0) say(false, "你是不是忘了零下要带负号？");
      else say(false, "差了 " + fmtN(Math.abs(v - target), 2) + unit + "，再对一次刻度。");
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
      return row;
    }
    function newQBtn(fn) {
      var b = el("button", "phy-mini", "🔀 换一题");
      b.type = "button";
      b.addEventListener("click", function () { fb.textContent = ""; fn(); });
      return b;
    }
    /* 刻度引擎：水平 / 垂直
     * Y2 审计 P1：p00.1.3 刻度尺 41 个标签在 390px 下糊成一片（69 对重叠）。
     * 小视口标签跳显（只降标签密度，刻度线与 majorEvery 不动；大视口保持）。 */
    function hTicks(g, o) {
      var n = Math.round((o.max - o.min) / o.div);
      var me = o.majorEvery || 5, le = me;
      if (smallViewport()) le = thinLabels(n, me, o.x1 - o.x0);
      for (var i = 0; i <= n; i++) {
        var v = o.min + i * o.div;
        var x = o.x0 + i / n * (o.x1 - o.x0);
        var major = i % me === 0;
        g.appendChild(svgEl("line", { x1: x, y1: o.y, x2: x, y2: o.y + (major ? 7 : 4),
          stroke: cssVar("--phy-body"), "stroke-width": major ? 1.2 : 0.7 }));
        if (major && i % le === 0)
          g.appendChild(svgText(x, o.y + 13, fmtN(v, decOf(o.div)), "phy-tick-label"));
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
          g.appendChild(svgText(o.x - 2, y + 1.5, fmtN(v, decOf(o.div)), "phy-tick-label", "end"));
      }
      g.appendChild(svgEl("line", { x1: o.x, y1: o.y0, x2: o.x, y2: o.y1,
        stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
    }
    /* 标签跳显：按标签约 7 逻辑单位宽估算，把标签密度降到不重叠 */
    function thinLabels(n, me, span) {
      var labels = Math.floor(n / me) + 1;
      var k = Math.ceil(labels * 7 / Math.max(span, 1));
      return k > 1 ? me * k : me;
    }

    if (gauge === "ruler") {
      var eye = -1, target = 0;
      function drawRuler() {
        svg.innerHTML = "";
        hTicks(svg, { min: range.min, max: range.max, div: div, x0: 8, x1: 92, y: 40, majorEvery: 5 });
        target = range.min + Math.round((0.3 + Math.random() * 0.6) *
          (range.max - range.min) / div) * div;
        var tx = 8 + (target - range.min) / (range.max - range.min) * 84;
        svg.appendChild(svgEl("rect", { x: 8, y: 30, width: tx - 8, height: 10,
          fill: cssVar("--phy-known"), opacity: 0.55 }));
        svg.appendChild(svgText(50, 66, "视线要与刻度面垂直", "phy-note-text"));
        head.innerHTML = "";
        head.appendChild(el("span", "", "第 1 步：选视线——"));
        ["俯视", "平视", "仰视"].forEach(function (z, i) {
          var b = el("button", "phy-mini", z);
          b.type = "button";
          b.addEventListener("click", function () {
            if (z === "平视") {
              if (!head.querySelector(".phy-gauge-input"))
                head.appendChild(inputRow(target, range.unit, "读数（估读一位）"));
              say(true, "视线正确，可以读数了。");
            }
            else say(false, "视线" + z + "读数会偏大/偏小，再想想。");
          });
          head.appendChild(b);
        });
        head.appendChild(newQBtn(drawRuler));
      }
      drawRuler();
    } else if (gauge === "thermometer") {
      var target2 = 0;
      function drawThermo() {
        svg.innerHTML = "";
        vTicks(svg, { min: range.min, max: range.max, div: div, x: 46, y0: 12, y1: 86, majorEvery: 5 });
        target2 = range.min + Math.round(Math.random() * (range.max - range.min) / div) * div;
        var y = 86 - (target2 - range.min) / (range.max - range.min) * 74;
        svg.appendChild(svgEl("rect", { x: 43, y: y, width: 6, height: 86 - y,
          fill: cssVar("--phy-charge-pos") }));
        svg.appendChild(svgEl("circle", { cx: 46, cy: 88, r: 5, fill: cssVar("--phy-charge-pos") }));
        head.innerHTML = "";
        head.appendChild(el("span", "", "零下读数记得带 − 号："));
        /* 黄队 Y2 改法 3：读数输入区加 "±" 切换按钮（≥44px），
         * 点一下输入框前出现"−"。 */
        var tRow = inputRow(target2, range.unit, "读数（估读一位）");
        var negBtn = el("button", "phy-mini", "±");
        negBtn.type = "button";
        negBtn.style.minHeight = "44px";
        negBtn.setAttribute("aria-label", "切换负号");
        negBtn.addEventListener("click", function () {
          var inp = tRow.querySelector("input");
          if (!inp) return;
          if (inp.value.charAt(0) === "-" || inp.value.charAt(0) === "−")
            inp.value = inp.value.slice(1);
          else inp.value = "−" + inp.value;
          inp.focus();
        });
        tRow.insertBefore(negBtn, tRow.firstChild);
        head.appendChild(tRow);
        head.appendChild(newQBtn(drawThermo));
      }
      drawThermo();
    } else if (gauge === "ammeter" || gauge === "voltmeter") {
      var isA = gauge === "ammeter";
      var ranges = isA ? [{ t: "0–3A", max: 3, div: 0.1 }, { t: "0–0.6A", max: 0.6, div: 0.02 }]
                       : [{ t: "0–15V", max: 15, div: 0.5 }, { t: "0–3V", max: 3, div: 0.1 }];
      var stage = 0, target3 = 0, sel = null;
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
        /* 黄队 Y2 改法 1：选量程前画布不再全空——默认渲染大量程表盘预览
         *（灰色禁用态、60% 透明度）+ 顶部遮罩条"第一步：选合适量程"；
         * 量程选择器是表盘下方两个大按钮（≥52px 高），点选后表盘点亮、遮罩消失。 */
        head.appendChild(el("div", "phy-range-mask", "第一步：选合适量程"));
        drawDialPreview(ranges[0], isA);
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
      /* 大量程表盘预览（灰色禁用态）：指针停在 0（未通电） */
      function drawDialPreview(rg, isA) {
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
          if (i % 10 === 0) {
            g.appendChild(svgText(cx + Math.cos(a) * (rr - 10),
              cy - Math.sin(a) * (rr - 10) + 1.5, fmtN(v, decOf(dv)), "phy-tick-label"));
          }
        }
        g.appendChild(svgEl("line", { x1: cx, y1: cy,
          x2: cx - (rr - 4), y2: cy, stroke: cssVar("--phy-track"), "stroke-width": 1.8 }));
        g.appendChild(svgEl("circle", { cx: cx, cy: cy, r: 2.4, fill: cssVar("--phy-track") }));
        g.appendChild(svgText(cx, cy + 8, isA ? "A" : "V", "phy-f-label"));
        svg.appendChild(g);
      }
      function drawScale3() {
        svg.innerHTML = "";
        var max = sel.max, dv = sel.div, unit = isA ? "A" : "V";
        target3 = Math.round((0.25 + Math.random() * 0.6) * max / dv) * dv;
        /* 表盘：半圆弧刻度 */
        var cx = 50, cy = 78, rr = 34;
        for (var i = 0; i <= Math.round(max / dv); i++) {
          var v = i * dv, a = Math.PI - i / Math.round(max / dv) * Math.PI;
          var x1 = cx + Math.cos(a) * rr, y1 = cy - Math.sin(a) * rr;
          var x2 = cx + Math.cos(a) * (rr - (i % 5 === 0 ? 6 : 3)), y2 = cy - Math.sin(a) * (rr - (i % 5 === 0 ? 6 : 3));
          svg.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2,
            stroke: cssVar("--phy-body"), "stroke-width": i % 5 === 0 ? 1.2 : 0.7 }));
          if (i % 10 === 0) {
            svg.appendChild(svgText(cx + Math.cos(a) * (rr - 10), cy - Math.sin(a) * (rr - 10) + 1.5,
              fmtN(v, decOf(dv)), "phy-tick-label"));
          }
        }
        var ta = Math.PI - target3 / max * Math.PI;
        svg.appendChild(svgEl("line", { x1: cx, y1: cy,
          x2: cx + Math.cos(ta) * (rr - 4), y2: cy - Math.sin(ta) * (rr - 4),
          stroke: cssVar("--phy-charge-pos"), "stroke-width": 1.8 }));
        svg.appendChild(svgEl("circle", { cx: cx, cy: cy, r: 2.4, fill: cssVar("--phy-body") }));
        svg.appendChild(svgText(cx, cy + 8, isA ? "A" : "V", "phy-f-label"));
        head.innerHTML = "";
        head.appendChild(el("span", "", "读数（" + sel.t + "）："));
        head.appendChild(inputRow(target3, unit, "估读一位", dv));
        head.appendChild(newQBtn(function () { stage = 0; sel = null; drawMeter(); }));
      }
      drawMeter();
    } else if (gauge === "balance") {
      var rider = 0, panW = 20;
      var rCtl = null;
      function drawBalance() {
        svg.innerHTML = "";
        svg.appendChild(svgEl("line", { x1: 20, y1: 70, x2: 80, y2: 70, "class": "phy-ground" }));
        svg.appendChild(svgEl("line", { x1: 50, y1: 70, x2: 50, y2: 34,
          stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
        svg.appendChild(svgEl("line", { x1: 18, y1: 34, x2: 82, y2: 34,
          stroke: cssVar("--phy-body"), "stroke-width": 2 }));
        /* 左盘：待测物；右盘：砝码 */
        svg.appendChild(svgEl("rect", { x: 12, y: 40, width: 12, height: 8, "class": "phy-body-box" }));
        svg.appendChild(svgText(18, 54, "待测", "phy-sym-label"));
        svg.appendChild(svgEl("rect", { x: 76, y: 40, width: 12, height: 8, "class": "phy-body-box" }));
        svg.appendChild(svgText(82, 54, panW + "g", "phy-sym-label"));
        /* 游码（线性拖拽）
         * 黄队 Y2 改法 2："估读一位"必须有刻度可依——横梁画出游码刻度
         *（0–5g，分度 0.2g）；游码以左侧刻线为准（专家口径 PHY-R07）；
         * "🔍 放大游码"按钮开 2× 放大弹窗看游码位置。 */
        var rx = 30 + rider / 5 * 40; /* 游码左沿 x = 读数位置 */
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
        head.appendChild(inputRow(panW + rider, "g", "砝码+游码", 0.2));
        head.appendChild(newQBtn(function () {
          panW = [10, 20, 50][Math.floor(Math.random() * 3)];
          rider = Math.round(Math.random() * 25) * 0.2;
          drawBalance();
        }));
        /* 游码 2× 放大弹窗 */
        function openRiderMag() {
          var ov = el("div", "phy-mag-ov");
          var inner = el("div", "phy-mag-box");
          inner.appendChild(el("div", "phy-mag-title", "游码放大 2×（以游码左侧刻线读数）"));
          var zs = svgEl("svg", { "class": "phy-stage", viewBox: "0 0 100 46",
            role: "img", "aria-label": "游码放大图" });
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

  /* ---------------- Y4 · graph-reader（图像三读法） ---------------- */
  /* 降级：复杂图像仍可用 P2/P10 等专用交互，本组件保底通用 */
  function widgetGraphReader(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "物理图像三读法");
    box.appendChild(svg);
    var btnRow = el("div", "phy-btn-row");
    box.appendChild(btnRow);
    var out = el("div", "phy-greader-out", "");
    box.appendChild(out);
    var src = p.source || {};
    var steps = p.steps || ["slope", "area", "intercept"];
    /* W13 边界（2026-10-15 专家队裁决"一并考虑"）：斜率读数为数值物理量时，
     * 若轴标签是真"量/单位"式则补单位；符号化比例图（哑标签如 "ΔΦ/Δt"）豁免，
     * 不硬加（防把哑系数伪装成实测值）。 */
    function axisUnit(lbl) {
      var s = String(lbl || "");
      var m = /\(([^()]+)\)$/.exec(s) || /\/([^/()（）]+)$/.exec(s);
      if (!m) return "";
      var u = m[1].trim();
      return /^[\w°·/().×^ \-]+$/.test(u) ? u : "";
    }
    function slopeUnit() {
      var yu = axisUnit(src.yLabel), xu = axisUnit(src.xLabel);
      return yu ? (xu ? yu + "/" + xu : yu) : "";
    }
    var slices = Math.min(p.areaSlices || 40, 60);
    if ((p.areaSlices || 40) > 60 && typeof console !== "undefined" && console.warn)
      console.warn("[graph-reader] areaSlices 超 60，已钳制。");
    var fn = null, pts = null, x0 = -5, x1 = 5;
    if (src.kind === "points" && src.points && src.points.length) {
      pts = src.points.map(function (q) { return { x: q.x != null ? q.x : q[0], y: q.y != null ? q.y : q[1] }; });
      x0 = Math.min.apply(null, pts.map(function (q) { return q.x; }));
      x1 = Math.max.apply(null, pts.map(function (q) { return q.x; }));
      if (x1 - x0 < 1e-9) { x0 -= 1; x1 += 1; }
    } else if (src.kind === "function" && src.expr) {
      var rhs = src.expr.indexOf("=") >= 0 ? src.expr.split("=").slice(1).join("=") : src.expr;
      try { fn = new Function("t", "return (" + rhs + ");"); fn(0); }
      catch (e) { fn = null; }
      if (p.xRange) { x0 = p.xRange[0]; x1 = p.xRange[1]; }
    }
    var yMin = Infinity, yMax = -Infinity;
    function sampleY(x) {
      if (fn) { try { return fn(x); } catch (e) { return NaN; } }
      if (pts) {
        for (var i = 0; i + 1 < pts.length; i++) {
          var a = pts[i], b = pts[i + 1];
          if ((x - a.x) * (x - b.x) <= 0 && b.x !== a.x)
            return a.y + (b.y - a.y) * (x - a.x) / (b.x - a.x);
        }
        return NaN;
      }
      return NaN;
    }
    for (var sx = 0; sx <= 60; sx++) {
      var yy = sampleY(x0 + (x1 - x0) * sx / 60);
      if (isFinite(yy)) { yMin = Math.min(yMin, yy); yMax = Math.max(yMax, yy); }
    }
    if (!isFinite(yMin)) { yMin = -1; yMax = 1; }
    if (yMax - yMin < 1e-9) { yMin -= 1; yMax += 1; }
    var pad = (yMax - yMin) * 0.15;
    yMin -= pad; yMax += pad;
    function X(x) { return 10 + (x - x0) / (x1 - x0) * 80; }
    function Y(y) { return 88 - (y - yMin) / (yMax - yMin) * 76; }
    function drawBase() {
      svg.innerHTML = "";
      var yA = Y(0);
      if (yA > 6 && yA < 90) {
        svg.appendChild(svgEl("line", { x1: 6, y1: yA, x2: 94, y2: yA, "class": "phy-axis" }));
        svg.appendChild(svgText(93, yA - 2, "0", "phy-tick-label", "end"));
      }
      svg.appendChild(svgEl("line", { x1: 10, y1: 4, x2: 10, y2: 92, "class": "phy-axis" }));
      svg.appendChild(svgText(92, 94, src.xLabel || "x", "phy-note-text", "end"));
      svg.appendChild(svgText(4, 8, src.yLabel || "y", "phy-note-text", "start"));
      var d = "";
      for (var i = 0; i <= 120; i++) {
        var x = x0 + (x1 - x0) * i / 120, y = sampleY(x);
        if (!isFinite(y)) continue;
        d += (d ? " L" : "M") + X(x).toFixed(1) + "," + Y(y).toFixed(1);
      }
      if (d) svg.appendChild(svgEl("path", { d: d, fill: "none",
        stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
    }
    drawBase();
    function stepBtn(name, label, fn2) {
      if (steps.indexOf(name) < 0) return;
      var b = el("button", "phy-mini", label);
      b.type = "button";
      b.addEventListener("click", function () { drawBase(); fn2(); flash(svg); });
      btnRow.appendChild(b);
    }
    stepBtn("slope", "读斜率", function () {
      var a = x0 + (x1 - x0) * 0.25, b = x0 + (x1 - x0) * 0.75;
      var ya = sampleY(a), yb = sampleY(b);
      if (!isFinite(ya) || !isFinite(yb)) { out.textContent = "数据不足，读不出斜率。"; return; }
      var k = (yb - ya) / (b - a);
      var exact = false;
      if (fn) {
        var mid = (a + b) / 2, ym = sampleY(mid);
        exact = Math.abs(ym - (ya + yb) / 2) < 1e-6 * (yMax - yMin);
      } else if (pts) {
        /* F10–F12 修复（2026-10-15）：点列不再硬编码 exact=true。
         * 直线度检验：[a,b] 内 8 等分采样，任一点偏离弦超过弦 y 跨度 2%
         * 即判为曲线段（只许"近似"，PHY-G01；归一化口径与白队审计一致）。
         * 弦近水平时退回全量程归一化（防除零）。 */
        var yr = Math.abs(yb - ya), fullR = (yMax - yMin) || 1;
        if (yr < 1e-9 * fullR) yr = fullR;
        var dev = 0;
        for (var si = 0; si <= 8; si++) {
          var sx3 = a + (b - a) * si / 8, sy3 = sampleY(sx3);
          if (isFinite(sy3)) {
            var ych = ya + (yb - ya) * (sx3 - a) / (b - a);
            dev = Math.max(dev, Math.abs(sy3 - ych));
          }
        }
        exact = dev <= 0.02 * yr;
      }
      var col = exact ? cssVar("--phy-force-c") : cssVar("--phy-target");
      svg.appendChild(svgEl("line", { x1: X(a), y1: Y(ya), x2: X(b), y2: Y(yb),
        stroke: col, "stroke-width": 1.6, "stroke-dasharray": exact ? "none" : "3,2" }));
      var ku = slopeUnit(), kuS = ku ? " " + ku : "";
      svg.appendChild(svgText((X(a) + X(b)) / 2, Math.min(Y(ya), Y(yb)) - 3,
        "k=" + fmtN(k, 2) + kuS + (exact ? "" : "（近似）"), "phy-slope-tag"));
      out.textContent = exact
        ? "斜率 k = " + fmtN(k, 2) + kuS + "（直线段，精确值）"
        : "斜率 ≈ " + fmtN(k, 2) + kuS + "（曲线段，近似——切线斜率示意，别当精确值抄）";
      var r = mmlRead(mi("k"), fmtN(k, 2) + (exact ? "" : "（近似）"), ku);
      badge.setReadout(r.mathml, "k = " + r.text);
    });
    stepBtn("area", "读面积", function () {
      var n = slices, sum = 0, i = 0;
      var dx = (x1 - x0) / n;
      var layer = svgEl("g", {});
      svg.appendChild(layer);
      out.textContent = "面积分割中…（" + n + " 片）";
      (function paint() {
        if (i >= n) {
          /* W16 修复（2026-10-15）：对称区间积分为 0 显示 "-0" 是浮点符号位残留；
           * |sum|<ε 先归零，只改显示不动积分逻辑。 */
          if (Math.abs(sum) < 1e-9) sum = 0;
          var r = mmlRead(mi("S"), fmtN(sum, 2), "");
          badge.setReadout(r.mathml, "S = " + r.text);
          out.textContent = "面积 S ≈ " + fmtN(sum, 2) +
            "（图线在横轴上方，面积为正；在横轴下方，面积为负）";
          flash(svg);
          return;
        }
        var x = x0 + (i + 0.5) * dx, y = sampleY(x);
        if (isFinite(y)) {
          var y0p = Y(0), yp = Y(y);
          layer.appendChild(svgEl("rect", {
            x: X(x0 + i * dx), y: Math.min(y0p, yp),
            width: Math.max(0.6, X(x0 + (i + 1) * dx) - X(x0 + i * dx)),
            height: Math.abs(yp - y0p),
            fill: y >= 0 ? cssVar("--phy-force-c") : cssVar("--phy-target"), opacity: 0.55 }));
          sum += y * dx;
        }
        i++;
        later(paint, 40);
      })();
    });
    stepBtn("intercept", "读截距", function () {
      /* F13 修复（2026-10-15；W14/W15 同根因顺带）：零点恰落在采样点/数据点上时，
       * 严格不等式 ya*yb<0 会漏报。改为：变号内插 + 端点零点检查 + 数据点零点兜底，
       * 相邻重复去重（容差一个采样步长）。 */
      var found = [];
      var epsX = (x1 - x0) / 120;
      function addZero(zx) {
        for (var k = 0; k < found.length; k++)
          if (Math.abs(found[k] - zx) <= epsX) return;
        found.push(zx);
      }
      var prevZero = false;
      for (var i = 0; i < 120; i++) {
        var xa = x0 + (x1 - x0) * i / 120, xb = x0 + (x1 - x0) * (i + 1) / 120;
        var ya = sampleY(xa), yb = sampleY(xb);
        if (!isFinite(ya) || !isFinite(yb)) { prevZero = false; continue; }
        if (ya * yb < 0) { found.push(xa - ya * (xb - xa) / (yb - ya)); prevZero = false; }
        else if (ya === 0 && !prevZero) { addZero(xa); prevZero = true; }
        else prevZero = (ya === 0);
      }
      var yEnd = sampleY(x1);
      if (yEnd === 0) addZero(x1);
      if (pts) for (var pi = 0; pi < pts.length; pi++) {
        if (pts[pi].y === 0 && pts[pi].x >= x0 && pts[pi].x <= x1) addZero(pts[pi].x);
      }
      found.sort(function (m, n) { return m - n; });
      found.slice(0, 4).forEach(function (zx) {
        svg.appendChild(svgEl("circle", { cx: X(zx), cy: Y(0), r: 1.8, "class": "phy-dot" }));
        svg.appendChild(svgText(X(zx), Y(0) - 3, fmtN(zx, 2), "phy-tick-label"));
      });
      var yb0 = sampleY(0);
      var msg = "x 截距：" + (found.length ? found.slice(0, 4).map(function (z) { return fmtN(z, 2); }).join("、") : "无（图像不跨横轴）");
      if (isFinite(yb0) && x0 <= 0 && x1 >= 0) {
        svg.appendChild(svgEl("circle", { cx: X(0), cy: Y(yb0), r: 1.8, "class": "phy-dot" }));
        msg += "；y 截距：" + fmtN(yb0, 2);
      }
      out.textContent = msg;
      badge.setReadout("", msg);
    });
    /* 黄队 Y4：首次进入该页，"读斜率/读面积/读截距"三个按钮依次脉冲一次
     *（各 600ms，顺序斜率→面积→截距）+ 气泡"点我试试：读斜率"；
     * 点过之后永久不再提示（按页记忆）。 */
    (function () {
      var key = curPageId + "-graph";
      if (!curPageId || hintSeen(key)) return;
      var btns = Array.prototype.slice.call(btnRow.children);
      if (!btns.length) return;
      var bub = el("div", "phy-hint-bubble", "👆 点我试试：读斜率");
      box.insertBefore(bub, btnRow);
      var done = false;
      function dismiss() {
        if (done) return; done = true;
        markHintSeen(key);
        if (bub.parentNode) bub.parentNode.removeChild(bub);
      }
      btns.forEach(function (b, i) {
        setTimeout(function () {
          b.classList.add("phy-btn-pulse");
          setTimeout(function () { b.classList.remove("phy-btn-pulse"); }, 650);
        }, i * 600);
      });
      btnRow.addEventListener("click", function once() {
        btnRow.removeEventListener("click", once);
        setTimeout(dismiss, 400);
      });
      setTimeout(dismiss, btns.length * 600 + 2500);
    })();
    return box;
  }

  /* ---------------- Y5 · side-compare（对照表） ---------------- */
  function widgetSideCompare(p) {
    var box = el("div", "phy-compare");
    function col(side, cls) {
      var c = el("div", "phy-col " + cls);
      c.appendChild(el("div", "phy-col-title", (side && side.title) || ""));
      var ul = el("ul", "phy-col-rows");
      ((side && side.rows) || []).slice(0, 8).forEach(function (r) {
        var li = el("li", "");
        if (r && typeof r === "object") li.textContent = r.k + "：" + r.v;
        else li.textContent = String(r);
        ul.appendChild(li);
      });
      c.appendChild(ul);
      return c;
    }
    /* verdict 置顶：DOM 在前，桌面端 CSS 排到两栏下方 */
    box.appendChild(el("div", "phy-verdict", "💡 " + (p.verdict || "")));
    var cols = el("div", "phy-cols");
    cols.appendChild(col(p.left, "phy-col-l"));
    cols.appendChild(col(p.right, "phy-col-r"));
    box.appendChild(cols);
    return box;
  }

  /* ============================================================
   * 阶段四新增组件（黄队 P0：策略路径断裂必补）
   * 全部遵守 §0.3 全局铁律：params 零色值（只用 colorRole/cssVar）、
   * 触控目标 ≥44px、双编码（颜色+文字/形状）、深色自动跟随。
   * ============================================================ */

  /* ---------------- P0 · tuning-fork（音叉溅水花） ---------------- */
  /* p01.1.1：敲击 → 音叉振动 → 水花溅起（振动发声的证据） */
  function widgetTuningFork(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    /* 黄队 tuning-fork：核心操作按钮必须首屏可见——放交互区顶部 sticky */
    var btnWrap = el("div", "phy-sticky-btn");
    var btn = el("button", "phy-mini", "🔨 敲一下音叉");
    btn.type = "button";
    btnWrap.appendChild(btn);
    box.appendChild(btnWrap);
    var svg = svgStage("", "音叉振动溅水花");
    box.appendChild(svg);
    var st = stateBadge("静止：点“敲一下音叉”", "");
    box.appendChild(st);
    var t0 = -1, drops = [], rafId = 0;
    function draw() {
      svg.innerHTML = "";
      var t = t0 < 0 ? 99 : (nowMs() - t0) / 1000;
      var amp = t0 < 0 ? 0 : Math.max(0, 3.4 * Math.exp(-1.8 * t));
      var dx = amp * Math.sin(t * 2 * Math.PI * 5); /* 5Hz 示意（非真实频率） */
      /* 底座 */
      svg.appendChild(svgEl("rect", { x: 42, y: 78, width: 16, height: 6, "class": "phy-body-box" }));
      svg.appendChild(svgEl("line", { x1: 36, y1: 86, x2: 64, y2: 86, "class": "phy-ground" }));
      /* 两臂（反向振动） */
      svg.appendChild(svgEl("line", { x1: 46, y1: 78, x2: 46 - dx, y2: 32,
        stroke: cssVar("--phy-body"), "stroke-width": 3.4 }));
      svg.appendChild(svgEl("line", { x1: 54, y1: 78, x2: 54 + dx, y2: 32,
        stroke: cssVar("--phy-body"), "stroke-width": 3.4 }));
      if (amp > 0.4)
        svg.appendChild(svgEl("path", { d: "M38,54 q-5,5 0,10 M62,54 q5,5 0,10",
          fill: "none", stroke: cssVar("--phy-wave-a"), "stroke-width": 1.2 }));
      /* 水面 */
      var wv = "M18,70";
      for (var i = 0; i <= 13; i++) wv += " L" + (18 + i * 5) + "," + (70 + (i % 2 ? 1.6 : -1.6));
      svg.appendChild(svgEl("path", { d: wv, fill: "none",
        stroke: cssVar("--phy-known"), "stroke-width": 1.4 }));
      svg.appendChild(svgText(84, 65, "水", "phy-note-text", "start"));
      drops.forEach(function (d) {
        svg.appendChild(svgEl("circle", { cx: d.x.toFixed(1), cy: d.y.toFixed(1),
          r: 1.1, fill: cssVar("--phy-known") }));
      });
      if (amp > 0.15) {
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
      var t = (nowMs() - t0) / 1000, dt = 0.016;
      drops.forEach(function (d) { d.vy += 60 * dt; d.x += d.vx * dt; d.y += d.vy * dt; });
      drops = drops.filter(function (d) { return d.y < 70 && t < 2.5; });
      draw();
      if (drops.length || 3.4 * Math.exp(-1.8 * t) > 0.15) rafId = rafFn(loop);
      else { rafId = 0; draw(); }
    }
    btn.addEventListener("click", function () {
      t0 = nowMs();
      drops = [];
      for (var i = 0; i < 16; i++)
        drops.push({ x: 40 + Math.random() * 20, y: 66,
          vx: (Math.random() - 0.5) * 26, vy: -(28 + Math.random() * 30) });
      if (rafId) cafFn(rafId);
      loop(); flash(svg); vib(15);
    });
    draw();
    return box;
  }

  /* ---------------- P0 · vacuum-chamber（真空罩抽气） ---------------- */
  /* p01.1.2：抽气 → 空气变稀 → 铃声变小（真空不能传声） */
  function widgetVacuumChamber(p) {
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
    var dots = [];
    for (var i = 0; i < 40; i++)
      dots.push({ x: 25 + (i * 37 % 50), y: 20 + (i * 53 % 54) });
    function draw() {
      var air = sAir.get();
      svg.innerHTML = "";
      svg.appendChild(svgEl("path", { d: "M20,88 L20,30 Q20,14 36,14 L64,14 Q80,14 80,30 L80,88",
        fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
      svg.appendChild(svgEl("line", { x1: 14, y1: 88, x2: 86, y2: 88, "class": "phy-ground" }));
      svg.appendChild(svgText(50, 8, "真空罩", "phy-note-text"));
      /* 铃铛 */
      svg.appendChild(svgEl("line", { x1: 50, y1: 16, x2: 50, y2: 27,
        stroke: cssVar("--phy-body"), "stroke-width": 1.2 }));
      svg.appendChild(svgEl("circle", { cx: 50, cy: 34, r: 7, fill: "none",
        stroke: cssVar("--phy-force-a"), "stroke-width": 1.6 }));
      /* 声波纹：数量随空气量（双编码：波纹 + 文字） */
      var waves = Math.round(air / 100 * 4);
      for (var w = 0; w < waves; w++) {
        var r = 12 + w * 7;
        svg.appendChild(svgEl("path", { d: "M" + (50 - r) + ",34 a" + r + "," + r + " 0 0 1 " + (2 * r) + ",0",
          fill: "none", stroke: cssVar("--phy-wave-a"), "stroke-width": 1.2 }));
      }
      var n = Math.round(air / 100 * dots.length);
      for (var k = 0; k < n; k++)
        svg.appendChild(svgEl("circle", { cx: dots[k].x, cy: dots[k].y, r: 1,
          fill: cssVar("--phy-ink-soft") }));
      svg.appendChild(svgText(50, 96, air <= 0 ? "真空（几乎无空气）" : "空气 " + fmtN(air, 0) + "%",
        "phy-note-text"));
      if (air <= 0) {
        st.textContent = "几乎听不见铃声：真空不能传声";
        st.className = "phy-state phy-state-warn";
        badge.setReadout("", "铃声 ≈ 0（真空不能传声）");
      } else if (air < 40) {
        st.textContent = "铃声变小：空气变稀薄了";
        st.className = "phy-state phy-state-warn";
        badge.setReadout("", "铃声变小（介质减少）");
      } else {
        st.textContent = "铃声清晰：空气充足";
        st.className = "phy-state phy-state-ok";
        badge.setReadout("", "铃声清晰（空气传声）");
      }
    }
    sAir.on(draw);
    draw();
    return box;
  }

  /* ---------------- P0 · pinhole-camera（小孔成像） ---------------- */
  /* p02.1.1：孔大小 / 物距可调 → 像的亮度、大小、清晰度变化 */
  function widgetPinholeCamera(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "小孔成像");
    box.appendChild(svg);
    var ap = p.aperture || {}, od = p.objDist || {};
    var sAp = uiSlider({ label: "小孔孔径", min: ap.min != null ? ap.min : 1,
      max: ap.max != null ? ap.max : 6, step: ap.step || 0.5,
      init: ap.init != null ? ap.init : 2, unit: "",
      fmt: function (v) { return fmtN(v, 1); } });
    var sOd = uiSlider({ label: "物距", min: od.min != null ? od.min : 12,
      max: od.max != null ? od.max : 38, step: od.step || 1,
      init: od.init != null ? od.init : 24, unit: "",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(sAp.row); box.appendChild(sOd.row);
    var st = stateBadge("倒立的实像", "ok");
    box.appendChild(st);
    function draw() {
      svg.innerHTML = "";
      var holeR = sAp.get(), u = sOd.get();
      var wallX = 55, scrX = 88, HY = 50; /* 小孔高度 */
      var objX = Math.max(8, wallX - u);
      var objH = 22, baseY = HY + objH / 2, topY = HY - objH / 2;
      /* 蜡烛 */
      svg.appendChild(svgEl("line", { x1: objX, y1: baseY, x2: objX, y2: topY,
        stroke: cssVar("--phy-body"), "stroke-width": 2 }));
      svg.appendChild(svgEl("circle", { cx: objX, cy: topY - 2.6, r: 2.2,
        fill: cssVar("--phy-force-a") }));
      svg.appendChild(svgText(objX, baseY + 6, "蜡烛", "phy-note-text"));
      /* 挡板 + 小孔 */
      svg.appendChild(svgEl("line", { x1: wallX, y1: 12, x2: wallX, y2: HY - holeR,
        stroke: cssVar("--phy-body"), "stroke-width": 2.5 }));
      svg.appendChild(svgEl("line", { x1: wallX, y1: HY + holeR, x2: wallX, y2: 88,
        stroke: cssVar("--phy-body"), "stroke-width": 2.5 }));
      svg.appendChild(svgText(wallX, 94, "挡板（小孔）", "phy-note-text"));
      /* 光屏 */
      svg.appendChild(svgEl("line", { x1: scrX, y1: 20, x2: scrX, y2: 80,
        stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
      svg.appendChild(svgText(scrX, 86, "光屏", "phy-note-text"));
      /* 成像几何：过孔心的两条光线（倒像：顶→底、底→顶） */
      var v = scrX - wallX, m = v / u, imgH = objH * m;
      var iTop = HY - imgH / 2, iBot = HY + imgH / 2;
      arrowHead(svg, "fh-pin", cssVar("--phy-ray"));
      function ray(x1, y1, x2, y2) {
        svg.appendChild(svgEl("line", { x1: x1, y1: y1, x2: x2, y2: y2,
          stroke: cssVar("--phy-ray"), "stroke-width": 0.7 + holeR * 0.32,
          "marker-end": "url(#fh-pin)" }));
      }
      ray(objX, topY, scrX, iBot);
      ray(objX, baseY, scrX, iTop);
      /* 像（倒立；孔大 → 亮但模糊：叠一层虚影） */
      svg.appendChild(svgEl("line", { x1: scrX, y1: iTop, x2: scrX, y2: iBot,
        stroke: cssVar("--phy-body"), "stroke-width": 2 }));
      svg.appendChild(svgEl("circle", { cx: scrX, cy: iBot + 2.6, r: 2.2,
        fill: cssVar("--phy-force-a") }));
      if (holeR > 3.5)
        svg.appendChild(svgEl("line", { x1: scrX - 2.5, y1: iTop, x2: scrX - 2.5, y2: iBot,
          stroke: cssVar("--phy-body"), "stroke-width": 2, opacity: 0.35,
          "stroke-dasharray": "2,1.5" }));
      var blur = holeR > 3.5;
      st.textContent = "倒立的实像" + (blur ? "（孔太大：变亮但变模糊）" : "（孔小：暗但清晰）");
      st.className = "phy-state " + (blur ? "phy-state-warn" : "phy-state-ok");
      var r = mmlRead(mi("m"), fmtN(m, 2), "");
      /* W4 补修（2026-10-15）：setReadout 在 MathML 可用时只渲染 mathml 分支，
       * 缩放词必须写进 MathML 的 DOM 里（<mtext>），否则 Chrome 下永不显示 */
      var zoomWord = m < 1 ? "（缩小）" : m > 1 ? "（放大）" : "（等大）";
      badge.setReadout(
        r.mathml.replace("</mrow>", "<mtext>" + zoomWord + "</mtext></mrow>"),
        "放大率 m = 像距/物距 = " + fmtN(m, 2) + zoomWord);
    }
    sAp.on(draw); sOd.on(draw);
    draw();
    return box;
  }

  /* ---------------- P0 · overflow-cup（溢水杯） ---------------- */
  /* p06.2.2：物体浸入 → 水位到溢水口 → 溢出量 = 排开体积 */
  function widgetOverflowCup(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "溢水杯实验");
    box.appendChild(svg);
    var vc = p.objVolume || {};
    var vMax = vc.max || 200;
    var sV = uiSlider({ label: "物体浸入体积", min: 0, max: vMax, step: vc.step || 10,
      init: vc.init != null ? vc.init : 0, unit: "cm³",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(sV.row);
    var st = stateBadge("把物体按进水里，看溢出多少水", "");
    box.appendChild(st);
    function draw() {
      var vIn = sV.get(), frac = Math.min(1, vIn / vMax);
      svg.innerHTML = "";
      var cx0 = 12, cx1 = 56, topY = 24, botY = 84, wl = topY + 12;
      /* 杯体 + 溢水口 */
      svg.appendChild(svgEl("path", { d: "M" + cx0 + "," + topY + " L" + cx0 + "," + botY +
        " L" + cx1 + "," + botY + " L" + cx1 + "," + wl,
        fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
      svg.appendChild(svgEl("line", { x1: cx1, y1: wl, x2: cx1 + 9, y2: wl,
        stroke: cssVar("--phy-body"), "stroke-width": 1.6 }));
      /* 杯中水（水面恒与溢水口齐平：多余的流走了） */
      svg.appendChild(svgEl("rect", { x: cx0 + 1, y: wl, width: cx1 - cx0 - 2,
        height: botY - wl - 1, fill: cssVar("--phy-known"), opacity: 0.25 }));
      svg.appendChild(svgText((cx0 + cx1) / 2, wl - 4, "水面（与溢水口齐平）", "phy-note-text"));
      /* 物体：下压深度 ∝ 浸入体积 */
      var dep = 3 + frac * 26, bTop = wl - dep, bH = 32;
      svg.appendChild(svgEl("rect", { x: 24, y: bTop, width: 20, height: bH,
        "class": "phy-body-box" }));
      svg.appendChild(svgText(34, bTop - 4, "物体", "phy-note-text"));
      /* 溢出水：从溢水口滴到小烧杯 */
      if (vIn > 0) {
        svg.appendChild(svgEl("line", { x1: cx1 + 9, y1: wl + 1, x2: cx1 + 9, y2: wl + 12,
          stroke: cssVar("--phy-known"), "stroke-width": 1.6 }));
        svg.appendChild(svgEl("circle", { cx: cx1 + 9, cy: wl + 15, r: 1.4,
          fill: cssVar("--phy-known") }));
      }
      /* 小烧杯接水 */
      var bx0 = 72, bx1 = 90, bBot = 84, fillH = frac * 44;
      svg.appendChild(svgEl("path", { d: "M" + bx0 + ",40 L" + bx0 + "," + bBot +
        " L" + bx1 + "," + bBot + " L" + bx1 + ",40",
        fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
      if (fillH > 0.5)
        svg.appendChild(svgEl("rect", { x: bx0 + 1, y: bBot - fillH, width: bx1 - bx0 - 2,
          height: fillH - 1, fill: cssVar("--phy-known"), opacity: 0.35 }));
      svg.appendChild(svgText(81, 90, "接水杯", "phy-note-text"));
      var r = mmlRead(msub("V", "溢"), fmtN(vIn, 0), "cm³");
      badge.setReadout(r.mathml, "V溢 = " + fmtN(vIn, 0) + " cm³ = 排开水的体积");
      st.textContent = vIn <= 0 ? "把物体按进水里，看溢出多少水"
        : "溢出的水，正好等于物体排开的水";
      st.className = "phy-state " + (vIn > 0 ? "phy-state-ok" : "");
    }
    sV.on(draw);
    draw();
    return box;
  }

  /* ---------------- P0 · em-induction（电磁感应） ---------------- */
  /* p10.1.4（复用 p16.3.1/p16.3.3）：磁铁插入/拔出 → Φ变化 → 感应电流方向
   * 方向口径（楞次定律）：N 极插入 → Φ 增大 → 感应电流磁场阻碍增大；
   * 从磁铁一侧看为逆时针；上导线 ⊗（入纸）、下导线 ⊙（出纸）。 */
  function widgetEmInduction(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "电磁感应：磁铁插入线圈");
    box.appendChild(svg);
    /* 黄队 em-induction：⊗/⊙ 符号初中生没见过，无图例=天书。
     * 画布角落常驻可折叠图例，默认展开，点标题折叠。 */
    var legend = el("details", "phy-legend", "");
    legend.setAttribute("open", "");
    legend.innerHTML = "<summary>图例</summary>" +
      "<div>⊗ 电流流进纸面（看箭尾） · ⊙ 电流流出纸面（看箭头）</div>";
    box.appendChild(legend);
    var pole = p.pole === "S" ? "S" : "N";
    var mx = 28, prevPhi = null;
    var st = stateBadge("拖动磁铁靠近 / 插入线圈", "");
    box.appendChild(st);
    function draw() {
      svg.innerHTML = "";
      /* 线圈（三匝） */
      for (var i = 0; i < 3; i++) {
        var cxp = 60 + i * 5;
        svg.appendChild(svgEl("ellipse", { cx: cxp, cy: 50, rx: 3.4, ry: 17,
          fill: "none", stroke: cssVar("--phy-force-b"), "stroke-width": 1.6 }));
      }
      svg.appendChild(svgText(67, 76, "线圈", "phy-note-text"));
      /* 磁铁（可拖） */
      svg.appendChild(svgEl("rect", { x: mx - 9, y: 44, width: 9, height: 12,
        fill: pole === "N" ? cssVar("--phy-charge-pos") : cssVar("--phy-charge-neg") }));
      svg.appendChild(svgEl("rect", { x: mx, y: 44, width: 9, height: 12,
        fill: pole === "N" ? cssVar("--phy-charge-neg") : cssVar("--phy-charge-pos") }));
      svg.appendChild(svgEl("rect", { x: mx - 9, y: 44, width: 18, height: 12,
        fill: "none", stroke: cssVar("--phy-body"), "stroke-width": 1.2 }));
      svg.appendChild(svgText(mx - 4.5, 52.5, pole === "N" ? "N" : "S", "phy-f-label"));
      svg.appendChild(svgText(mx + 4.5, 52.5, pole === "N" ? "S" : "N", "phy-f-label"));
      var hd = svgEl("rect", { x: mx - 13, y: 39, width: 26, height: 22,
        fill: "transparent", "class": "phy-handle", "aria-label": "拖动磁铁" });
      svg.appendChild(hd);
      dragify(hd, { svg: svg, onMove: function (lx) {
        mx = Math.max(14, Math.min(50, lx)); draw();
      }, onEnd: function () { flash(svg); } });
      /* Φ ∝ 1/距离 */
      var d = Math.max(4, 60 - (mx + 9));
      var phi = 100 / d, dPhi = prevPhi == null ? 0 : phi - prevPhi;
      prevPhi = phi;
      /* 方向口径（楞次定律）：N 极插入 ≡ S 极拔出 → 上⊗下⊙（从左看逆时针）；
       * S 极插入 ≡ N 极拔出 → 反向 */
      var nPoleIn = (pole === "N") === (dPhi > 0);
      var cur = Math.abs(dPhi) > 0.02 ? (nPoleIn ? "in" : "out") : "none";
      /* 感应电流方向标注（双编码：⊙/⊗ 符号 + 文字说明） */
      if (cur !== "none") {
        var topS = cur === "in" ? "⊗" : "⊙", botS = cur === "in" ? "⊙" : "⊗";
        var tTop = svgText(65, 36, topS, "phy-f-label");
        tTop.style.fill = cssVar("--phy-current");
        var tBot = svgText(65, 66, botS, "phy-f-label");
        tBot.style.fill = cssVar("--phy-current");
        svg.appendChild(tTop); svg.appendChild(tBot);
        svg.appendChild(svgText(65, 29, cur === "in" ? "上入下出" : "上出下入", "phy-note-text"));
      }
      /* Φ 条 */
      var fw = Math.min(30, phi / 25 * 30);
      svg.appendChild(svgEl("rect", { x: 8, y: 86, width: 30, height: 5, "class": "phy-body-box" }));
      if (fw > 0.5)
        svg.appendChild(svgEl("rect", { x: 8.6, y: 86.6, width: fw, height: 3.8,
          fill: cssVar("--phy-force-a") }));
      svg.appendChild(svgText(42, 90.5, "Φ（磁通量）", "phy-note-text", "start"));
      if (cur === "in") {
        st.textContent = (dPhi > 0 ? "插入" : "拔出") + "：Φ " + (dPhi > 0 ? "增大" : "减小") +
          " → 感应电流（从左看逆时针），磁场阻碍" + (dPhi > 0 ? "增大" : "减小");
        st.className = "phy-state phy-state-ok";
        badge.setReadout("", "Φ " + (dPhi > 0 ? "增大" : "减小") +
          " → 感应电流：上 ⊗ 下 ⊙（从磁铁一侧看：逆时针）");
      } else if (cur === "out") {
        st.textContent = (dPhi > 0 ? "插入" : "拔出") + "：Φ " + (dPhi > 0 ? "增大" : "减小") +
          " → 感应电流反向（从左看顺时针），磁场阻碍" + (dPhi > 0 ? "增大" : "减小");
        st.className = "phy-state phy-state-ok";
        badge.setReadout("", "Φ " + (dPhi > 0 ? "增大" : "减小") +
          " → 感应电流：上 ⊙ 下 ⊗（从磁铁一侧看：顺时针）");
      } else {
        st.textContent = "磁铁不动：Φ 不变 → 无感应电流";
        st.className = "phy-state";
        badge.setReadout("", "Φ 不变 → 无感应电流（“变”才是条件）");
      }
    }
    draw();
    return box;
  }

  /* ---------------- P0 · displacement-arrow（位移箭头绘制） ---------------- */
  /* p11.1.2：起点固定，拖终点画位移箭头（直线距离；分量虚线双编码） */
  function widgetDisplacementArrow(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "位移箭头绘制");
    box.appendChild(svg);
    var st = stateBadge("从起点拖到终点，画位移箭头", "");
    box.appendChild(st);
    var A = { x: 20, y: 70 }, B = { x: 68, y: 34 };
    function draw() {
      svg.innerHTML = "";
      for (var gx = 10; gx <= 90; gx += 10)
        svg.appendChild(svgEl("line", { x1: gx, y1: 10, x2: gx, y2: 90,
          stroke: cssVar("--phy-line"), "stroke-width": 0.4 }));
      for (var gy = 10; gy <= 90; gy += 10)
        svg.appendChild(svgEl("line", { x1: 10, y1: gy, x2: 90, y2: gy,
          stroke: cssVar("--phy-line"), "stroke-width": 0.4 }));
      /* 分量虚线（先画，压在箭头下） */
      svg.appendChild(svgEl("line", { x1: A.x, y1: A.y, x2: B.x, y2: A.y, "class": "phy-track-line" }));
      svg.appendChild(svgEl("line", { x1: B.x, y1: A.y, x2: B.x, y2: B.y, "class": "phy-track-line" }));
      /* 起点 */
      svg.appendChild(svgEl("circle", { cx: A.x, cy: A.y, r: 2, fill: cssVar("--phy-known") }));
      svg.appendChild(svgText(A.x, A.y + 6.5, "起点", "phy-note-text"));
      /* 位移箭头 */
      arrowHead(svg, "fh-disp", cssVar("--phy-target"));
      svg.appendChild(svgEl("line", { x1: A.x, y1: A.y, x2: B.x, y2: B.y,
        stroke: cssVar("--phy-target"), "stroke-width": 2, "marker-end": "url(#fh-disp)" }));
      svg.appendChild(svgText((A.x + B.x) / 2, (A.y + B.y) / 2 - 4, "位移", "phy-force-label"));
      svg.appendChild(svgText(B.x, B.y - 7, "终点", "phy-note-text"));
      /* 终点手柄 */
      var hd = svgEl("circle", { cx: B.x, cy: B.y, r: 6, "class": "phy-handle",
        fill: cssVar("--phy-target"), "aria-label": "拖动终点" });
      svg.appendChild(hd);
      dragify(hd, { svg: svg, onMove: function (lx, ly) {
        B.x = Math.max(10, Math.min(90, lx)); B.y = Math.max(10, Math.min(90, ly)); draw();
      }, onEnd: function () { flash(svg); } });
      var dx = (B.x - A.x) / 10, dy = (A.y - B.y) / 10; /* 格为单位，y 向上为正 */
      var disp = Math.sqrt(dx * dx + dy * dy);
      var r = mmlRead(mi("Δx"), fmtN(disp, 1), "格");
      badge.setReadout(r.mathml, "位移 Δx = " + fmtN(disp, 1) + " 格（只看起点→终点的直线）");
      st.textContent = "位移只看起点→终点：Δx = " + fmtN(disp, 1) + " 格（方向：箭头指向）";
      st.className = "phy-state phy-state-ok";
    }
    draw();
    return box;
  }

  /* ---------------- P0 · spring-scale-pull（两弹簧秤对拉） ---------------- */
  /* p12.2.3：滑块拉力 → 两秤伸长相同 → 读数永远相等（相互作用力） */
  function widgetSpringScalePull(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "两弹簧秤对拉");
    box.appendChild(svg);
    var fc = p.force || {}, fMax = fc.max || 10;
    var sF = uiSlider({ label: "拉力", min: fc.min != null ? fc.min : 0, max: fMax,
      step: fc.step || 0.5, init: fc.init != null ? fc.init : 4, unit: "N",
      fmt: function (v) { return fmtN(v, 1); } });
    box.appendChild(sF.row);
    var st = stateBadge("两个秤的读数永远一样", "ok");
    box.appendChild(st);
    function draw() {
      var F = sF.get(), ext = F / fMax * 13;
      svg.innerHTML = "";
      function scale(cx, flip, label) {
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
        svg.appendChild(svgText(cx, 68, fmtN(F, 1) + " N", "phy-force-label"));
      }
      scale(30, true, "甲秤");
      scale(70, false, "乙秤");
      svg.appendChild(svgText(50, 49, "对拉", "phy-note-text"));
      svg.appendChild(svgEl("line", { x1: 41, y1: 49, x2: 59, y2: 49,
        stroke: cssVar("--phy-track"), "stroke-width": 1, "stroke-dasharray": "2.5,2" }));
      var r = mmlRead(msub("F", "甲"), fmtN(F, 1), "N");
      badge.setReadout(r.mathml, "F甲 = F乙 = " + fmtN(F, 1) + " N");
      st.textContent = "甲拉乙的力 = 乙拉甲的力：大小相等、方向相反";
    }
    sF.on(draw);
    draw();
    return box;
  }

  /* ============================================================
   * 阶段四新增组件（黄队 P1：核心定量无载体必补）
   * ============================================================ */

  /* ---------------- P1 · heat-compare（水 vs 沙子双加热曲线） ---------------- */
  /* p03.2.2：同功率加热 → 沙子升温快（比热容小）；T-t 双曲线 */
  function widgetHeatCompare(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "水和沙子加热曲线对比");
    box.appendChild(svg);
    box.appendChild(noteLine("动画加速 ×20（非真实时间）；初温都按 20℃。"));
    var mc = p.mass || {}, P0 = p.power || 500;
    var sM = uiSlider({ label: "质量", min: mc.min != null ? mc.min : 0.5,
      max: mc.max || 2, step: mc.step || 0.5, init: mc.init != null ? mc.init : 1,
      unit: "kg", fmt: function (v) { return fmtN(v, 1); } });
    box.appendChild(sM.row);
    var t = 0, playing = false, rafId = 0, lastT = 0;
    var tMax = 300, cW = 4200, cS = 920; /* J/(kg·℃) */
    var bar = uiPlaybar({
      onPlay: function () { playing = true; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; t = 0;
        bar.setProgress(0); draw(); },
      /* 黄队 heat-compare：scrubber 加回来（W-P6）——拖进度定点对比
       * "第 100 秒时水温多少"，双曲线读数联动。 */
      onScrub: function (f) { playing = false; if (rafId) cafFn(rafId); rafId = 0;
        t = f * tMax; draw(); }
    });
    box.appendChild(bar.bar);
    var st = stateBadge("按 ▶ 开始加热", "");
    box.appendChild(st);
    function Tof(c, tt) { return 20 + P0 * tt / (sM.get() * c); }
    function X(tt) { return 13 + tt / tMax * 79; }
    function Y(T) { return 88 - Math.min(T, 140) / 140 * 74; }
    function curve(c, color, dash) {
      var pts = [];
      for (var tt = 0; tt <= t + 1; tt += 5)
        pts.push(X(tt).toFixed(1) + "," + Y(Tof(c, tt)).toFixed(1));
      if (pts.length < 2) pts.push(X(0).toFixed(1) + "," + Y(20).toFixed(1));
      svg.appendChild(svgEl("polyline", { points: pts.join(" "), fill: "none",
        stroke: color, "stroke-width": 1.8, "stroke-dasharray": dash || "none" }));
    }
    function draw() {
      svg.innerHTML = "";
      svg.appendChild(svgEl("line", { x1: 13, y1: 12, x2: 13, y2: 88,
        stroke: cssVar("--phy-body"), "stroke-width": 1 }));
      svg.appendChild(svgEl("line", { x1: 13, y1: 88, x2: 94, y2: 88,
        stroke: cssVar("--phy-body"), "stroke-width": 1 }));
      svg.appendChild(svgText(92, 94, "t/s", "phy-note-text", "end"));
      svg.appendChild(svgText(7, 14, "T/℃", "phy-note-text", "end"));
      curve(cS, cssVar("--phy-force-a"));         /* 沙子：橙实线（升温快） */
      curve(cW, cssVar("--phy-known"), "3,2");    /* 水：蓝虚线（升温慢） */
      svg.appendChild(svgText(94, Y(Tof(cS, t)) - 3, "沙子", "phy-note-text", "end"));
      svg.appendChild(svgText(94, Y(Tof(cW, t)) + 6, "水", "phy-note-text", "end"));
      var dTw = Tof(cW, t) - 20, dTs = Tof(cS, t) - 20;
      var r = mmlRead(mi("ΔT"), fmtN(dTs, 1), "℃");
      badge.setReadout(r.mathml, "加热 " + fmtN(t, 0) + "s：水 +" + fmtN(dTw, 1) +
        "℃，沙子 +" + fmtN(dTs, 1) + "℃");
      st.textContent = t >= tMax ? "加热结束：沙子升温是水的约 " + fmtN(cW / cS, 1) + " 倍"
        : t > 0 ? "加热中…：沙子线更陡（升温快）" : "按 ▶ 开始加热";
      st.className = "phy-state " + (t > 0 ? "phy-state-ok" : "");
    }
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
    return box;
  }

  /* ---------------- P1 · sponge-dent（海绵凹陷） ---------------- */
  /* p06.1.1：压力滑块 → 凹陷深度（压力作用效果的直观证据） */
  function widgetSpongeDent(p) {
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
    function draw() {
      var F = sP.get(), dent = F / pMax * 12;
      svg.innerHTML = "";
      svg.appendChild(svgEl("line", { x1: 10, y1: 84, x2: 90, y2: 84, "class": "phy-ground" }));
      var d = "M22,84 L22,52 Q36," + (52 + dent).toFixed(1) + " 50," + (52 + dent).toFixed(1) +
        " Q64," + (52 + dent).toFixed(1) + " 78,52 L78,84 Z";
      svg.appendChild(svgEl("path", { d: d, "class": "phy-body-box" }));
      svg.appendChild(svgText(50, 74, "海绵", "phy-note-text"));
      /* 下压的砝码 */
      svg.appendChild(svgEl("rect", { x: 42, y: 52 + dent - 24, width: 16, height: 24,
        fill: cssVar("--phy-force-a"), opacity: 0.85 }));
      svg.appendChild(svgText(50, 52 + dent - 28, "压力 " + fmtN(F, 0) + "N", "phy-note-text"));
      if (dent > 1) {
        svg.appendChild(svgEl("line", { x1: 83, y1: 52, x2: 83, y2: 52 + dent,
          stroke: cssVar("--phy-target"), "stroke-width": 1.2,
          "marker-start": "url(#fh-dent)", "marker-end": "url(#fh-dent)" }));
        arrowHead(svg, "fh-dent", cssVar("--phy-target"));
      }
      /* 黄队 sponge-dent：去掉伪数字（"示意单位"当读数学生会抄）。
       * 读数行改为三档文字 + 3 格条形；压力滑块读数保留 N（真值）。 */
      var tier = dent < 2 ? "浅" : dent < 6 ? "中" : "深";
      var cells = dent < 2 ? 1 : dent < 6 ? 2 : 3;
      var bar = "";
      for (var bi = 0; bi < 3; bi++) bar += bi < cells ? "■" : "□";
      svg.appendChild(svgText(88, 52 + dent / 2, tier, "phy-sym-label", "start"));
      /* 读数行 = 三档文字 + 3 格条形（压力真值在滑块读数行保留 "…N"） */
      badge.setReadout("", "压力 " + fmtN(F, 0) + " N → 凹陷：" + tier + " " + bar);
      st.textContent = dent < 2 ? "压力小：几乎看不出凹陷"
        : "压力越大，海绵凹陷越深（压力作用效果越明显）";
      st.className = "phy-state " + (dent >= 2 ? "phy-state-ok" : "");
    }
    sP.on(draw);
    draw();
    return box;
  }

  /* ---------------- P1 · paper-blow（吹纸 / 机翼流线） ---------------- */
  /* p06.1.4：吹气强度 → 纸条上飘 / 机翼上下流速差 → 升力 */
  function widgetPaperBlow(p) {
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
    function draw() {
      var b = sB.get();
      svg.innerHTML = "";
      arrowHead(svg, "fh-blow", cssVar("--phy-known"));
      if (mode === "wing") {
        svg.appendChild(svgEl("path", { d: "M20,52 Q50,34 82,50 Q50,58 20,52 Z",
          "class": "phy-body-box" }));
        svg.appendChild(svgText(50, 66, "机翼", "phy-note-text"));
        var k;
        for (k = 0; k < 3; k++) { /* 上方：密（快） */
          var y = 40 - k * 5;
          svg.appendChild(svgEl("path", { d: "M8," + y + " Q50," + (y - 7) + " 92," + y,
            fill: "none", stroke: cssVar("--phy-known"),
            "stroke-width": (0.8 + b * 0.14).toFixed(2), "marker-end": "url(#fh-blow)" }));
        }
        for (k = 0; k < 2; k++) { /* 下方：疏（慢） */
          var y2 = 60 + k * 6;
          svg.appendChild(svgEl("line", { x1: 8, y1: y2, x2: 92, y2: y2,
            stroke: cssVar("--phy-known"), "stroke-width": 0.9,
            "marker-end": "url(#fh-blow)" }));
        }
        svg.appendChild(svgText(90, 28, "快", "phy-note-text", "end"));
        svg.appendChild(svgText(90, 72, "慢", "phy-note-text", "end"));
        var lh = b / bMax * 18;
        if (lh > 1) {
          svg.appendChild(svgEl("line", { x1: 50, y1: 44, x2: 50, y2: 44 - lh,
            stroke: cssVar("--phy-target"), "stroke-width": 2, "marker-end": "url(#fh-blow)" }));
          svg.appendChild(svgText(50, 42 - lh, "升力", "phy-force-label"));
        }
        st.textContent = "上方流速快 → 压强小：机翼被往上“托”（升力）";
        badge.setReadout("", "吹气 " + fmtN(b, 0) + " 档：上快下慢 → 产生升力");
      } else {
        var ang = b / bMax * 50, rad = ang * Math.PI / 180;
        var px = 30, py = 56, len = 44;
        var ex = px + len * Math.cos(rad), ey = py - len * Math.sin(rad);
        svg.appendChild(svgEl("line", { x1: px, y1: py, x2: ex, y2: ey,
          stroke: cssVar("--phy-body"), "stroke-width": 2.6 }));
        svg.appendChild(svgEl("circle", { cx: px, cy: py, r: 2.2, fill: cssVar("--phy-body") }));
        svg.appendChild(svgText(24, py + 6, "纸条", "phy-note-text", "end"));
        for (var g = 0; g < 3; g++) {
          var gy = py - 9 - g * 5;
          svg.appendChild(svgEl("line", { x1: 36, y1: gy, x2: 92, y2: gy,
            stroke: cssVar("--phy-known"), "stroke-width": (0.8 + b * 0.16).toFixed(2),
            "marker-end": "url(#fh-blow)" }));
        }
        svg.appendChild(svgText(64, py - 24, "吹气", "phy-note-text"));
        st.textContent = ang < 5 ? "没吹气：纸条下垂"
          : "纸条上方流速快、压强小，被“吸”了起来";
        badge.setReadout("", "吹气 " + fmtN(b, 0) + " 档 → 纸条上飘 " + fmtN(ang, 0) + "°");
      }
    }
    sB.on(draw);
    draw();
    return box;
  }

  /* ---------------- P1 · joule-heating（电流热效应） ---------------- */
  /* p09.1.3：I / R / t 三滑块 → Q = I²Rt（热量条双编码） */
  function widgetJouleHeating(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "电流热效应：Q = I²Rt");
    box.appendChild(svg);
    var cc = p.current || {}, rc = p.resistance || {}, tc = p.time || {};
    var iMax = cc.max || 3, rMax = rc.max || 50, tMax = tc.max || 60;
    var sI = uiSlider({ label: "电流 I", min: cc.min != null ? cc.min : 0.5, max: iMax,
      step: cc.step || 0.1, init: cc.init != null ? cc.init : 1, unit: "A",
      fmt: function (v) { return fmtN(v, 1); } });
    var sR = uiSlider({ label: "电阻 R", min: rc.min != null ? rc.min : 5, max: rMax,
      step: rc.step || 1, init: rc.init != null ? rc.init : 20, unit: "Ω",
      fmt: function (v) { return fmtN(v, 0); } });
    var sT = uiSlider({ label: "时间 t", min: tc.min != null ? tc.min : 0, max: tMax,
      step: tc.step || 1, init: tc.init != null ? tc.init : 10, unit: "s",
      fmt: function (v) { return fmtN(v, 0); } });
    box.appendChild(sI.row); box.appendChild(sR.row); box.appendChild(sT.row);
    /* 黄队 joule-heating：① 顶部常驻"一次只动一个滑块"提示条；
     * ② 快捷预设按钮（把"控制变量"做成按钮）：点后自动播放数值变化动画。 */
    box.appendChild(el("div", "phy-hint-bar", "一次只动一个滑块，其他不动——看看谁的影响最大"));
    function animateSlider(s, target) {
      var from = s.get(), t0 = nowMs(), dur = 600;
      (function tick() {
        var k = Math.min(1, (nowMs() - t0) / dur);
        s.set(from + (target - from) * k);
        if (k < 1) rafFn(tick);
      })();
    }
    var presets = el("div", "phy-preset-row");
    var bI2 = el("button", "phy-preset-btn", "电流翻倍试试（I×2）");
    bI2.type = "button";
    bI2.addEventListener("click", function () { animateSlider(sI, Math.min(iMax, sI.get() * 2)); });
    var bR2 = el("button", "phy-preset-btn", "电阻翻倍试试（R×2）");
    bR2.type = "button";
    bR2.addEventListener("click", function () { animateSlider(sR, Math.min(rMax, sR.get() * 2)); });
    presets.appendChild(bI2); presets.appendChild(bR2);
    box.appendChild(presets);
    var st = stateBadge("电流翻倍，热量变 4 倍（I 是平方关系）", "ok");
    box.appendChild(st);
    function draw() {
      var I = sI.get(), R = sR.get(), t = sT.get(), Q = I * I * R * t;
      svg.innerHTML = "";
      svg.appendChild(svgEl("path", { d: "M14,48 q6,-10 12,0 t12,0 t12,0 t12,0",
        fill: "none", stroke: cssVar("--phy-force-a"), "stroke-width": 2 }));
      svg.appendChild(svgText(50, 36, "电阻丝（发热）", "phy-note-text"));
      var qMax = iMax * iMax * rMax * tMax, frac = qMax > 0 ? Math.min(1, Q / qMax) : 0;
      svg.appendChild(svgEl("rect", { x: 14, y: 60, width: 72, height: 10, "class": "phy-body-box" }));
      if (frac > 0.005)
        svg.appendChild(svgEl("rect", { x: 15, y: 61, width: (70 * frac).toFixed(1), height: 8,
          fill: cssVar("--phy-force-a") }));
      svg.appendChild(svgText(50, 78, "热量", "phy-note-text"));
      var eqm = "<math><mrow><mi>Q</mi><mo>=</mo><msup><mi>I</mi><mn>2</mn></msup>" +
        "<mi>R</mi><mi>t</mi><mo>=</mo><mn>" + fmtN(Q, 0) + "</mn>" +
        "<mspace width=\"0.25em\"/><mi mathvariant=\"normal\">J</mi></mrow></math>";
      badge.setReadout(eqm, "Q = I²Rt = " + fmtN(Q, 0) + " J");
      st.textContent = "电流翻倍 → 热量变 4 倍；电阻/时间翻倍 → 热量变 2 倍";
    }
    [sI, sR, sT].forEach(function (s) { s.on(draw); });
    draw();
    return box;
  }

  /* ---------------- P1 · motor-commutator（电动机换向器慢动作） ---------------- */
  /* p10.1.3：慢放看清“转过平衡位置 → 换向器换向 → 电流反向 → 继续同向转” */
  function widgetMotorCommutator(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", "电动机换向器慢动作");
    box.appendChild(svg);
    box.appendChild(noteLine("慢放 ×0.2（非真实转速）：看清换向器什么时候换向。"));
    var ang = 0, playing = false, rafId = 0, lastT = 0;
    var bar = uiPlaybar({
      onPlay: function () { playing = true; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; ang = 0; draw(); }
    });
    bar.scrub.style.display = "none";
    box.appendChild(bar.bar);
    var st = stateBadge("按 ▶ 看慢动作", "");
    box.appendChild(st);
    var PHASES = ["① 通电线圈在磁场中受力，开始转动",
      "② 靠惯性转过平衡位置", "③ 换向器切换：线圈里的电流反向", "④ 受力方向不变，继续朝同一方向转"];
    /* 黄队 motor-commutator：步骤条四步可点——点第③步直接跳到换向瞬间并暂停，
     * 换向器切换处高亮闪烁 3 次；"慢放 ×0.2（非真实转速）"常驻标注已在上方。 */
    var stepsBar = el("div", "phy-steps");
    var stepBtns = [];
    ["①", "②", "③", "④"].forEach(function (num, i) {
      var b = el("button", "phy-step", "第" + num + "步");
      b.type = "button";
      b.setAttribute("aria-current", "false");
      b.setAttribute("aria-label", PHASES[i]);
      b.addEventListener("click", function () {
        playing = false; if (rafId) cafFn(rafId); rafId = 0; bar.setPlaying(false);
        ang = i * 90 + (i === 2 ? 0 : 45); /* ③ 精确停在换向瞬间 */
        draw();
        if (i === 2) {
          try {
            var arcs = svg.querySelectorAll(".phy-comm");
            for (var k = 0; k < arcs.length; k++) arcs[k].classList.add("phy-step-flash");
            setTimeout(function () {
              for (var k2 = 0; k2 < arcs.length; k2++) arcs[k2].classList.remove("phy-step-flash");
            }, 1600);
          } catch (e) {}
        }
        flash(svg);
      });
      stepBtns.push(b); stepsBar.appendChild(b);
    });
    box.appendChild(stepsBar);
    function draw() {
      svg.innerHTML = "";
      var cx = 50, cy = 46, R = 20, a = ang * Math.PI / 180;
      /* 磁铁 N / S */
      svg.appendChild(svgEl("rect", { x: 8, y: 28, width: 10, height: 36,
        fill: cssVar("--phy-charge-pos") }));
      svg.appendChild(svgText(13, 48, "N", "phy-f-label"));
      svg.appendChild(svgEl("rect", { x: 82, y: 28, width: 10, height: 36,
        fill: cssVar("--phy-charge-neg") }));
      svg.appendChild(svgText(87, 48, "S", "phy-f-label"));
      /* 线圈（旋转矩形） */
      function rot(x, y) {
        return { x: cx + x * Math.cos(a) - y * Math.sin(a),
                 y: cy + x * Math.sin(a) + y * Math.cos(a) };
      }
      var p1 = rot(-R, -8), p2 = rot(R, -8), p3 = rot(R, 8), p4 = rot(-R, 8);
      var poly = [p1, p2, p3, p4].map(function (q) {
        return q.x.toFixed(1) + "," + q.y.toFixed(1); }).join(" ");
      svg.appendChild(svgEl("polygon", { points: poly, fill: "none",
        stroke: cssVar("--phy-body"), "stroke-width": 1.8 }));
      svg.appendChild(svgText(cx, cy - 13, "线圈", "phy-note-text"));
      /* 电流方向（每半圈翻转；双编码：箭头 + 文字） */
      var half = Math.floor(ang / 180) % 2;
      arrowHead(svg, "fh-mot", cssVar("--phy-current"));
      function edgeArrow(q1, q2, fwd) {
        var mx = (q1.x + q2.x) / 2, my = (q1.y + q2.y) / 2;
        var dx = (q2.x - q1.x), dy = (q2.y - q1.y), L = Math.hypot(dx, dy) || 1;
        var s = fwd ? 1 : -1;
        svg.appendChild(svgEl("line", {
          x1: (mx - dx / L * 4 * s).toFixed(1), y1: (my - dy / L * 4 * s).toFixed(1),
          x2: (mx + dx / L * 4 * s).toFixed(1), y2: (my + dy / L * 4 * s).toFixed(1),
          stroke: cssVar("--phy-current"), "stroke-width": 1.6,
          "marker-end": "url(#fh-mot)" }));
      }
      edgeArrow(p1, p2, half === 0);
      edgeArrow(p3, p4, half !== 0);
      svg.appendChild(svgText(cx, cy + 15, half === 0 ? "电流：上→右" : "电流：上→左", "phy-note-text"));
      /* 换向器：两半环（随线圈转）+ 固定电刷 */
      var hr = 5.5;
      function arcPath(a0, a1) {
        var x0 = (cx + hr * Math.cos(a0)).toFixed(1), y0 = (cy + hr * Math.sin(a0)).toFixed(1);
        var x1 = (cx + hr * Math.cos(a1)).toFixed(1), y1 = (cy + hr * Math.sin(a1)).toFixed(1);
        return "M" + x0 + "," + y0 + " A" + hr + "," + hr + " 0 0 1 " + x1 + "," + y1;
      }
      svg.appendChild(svgEl("path", { d: arcPath(a, a + Math.PI), fill: "none",
        stroke: cssVar("--phy-force-a"), "stroke-width": 2.6, "class": "phy-comm" }));
      svg.appendChild(svgEl("path", { d: arcPath(a + Math.PI, a + 2 * Math.PI), fill: "none",
        stroke: cssVar("--phy-force-b"), "stroke-width": 2.6, "class": "phy-comm" }));
      svg.appendChild(svgText(cx, cy + 1.6, "换向器", "phy-sym-label"));
      svg.appendChild(svgEl("rect", { x: cx - hr - 6, y: cy - 2, width: 5, height: 4,
        fill: cssVar("--phy-body") }));
      svg.appendChild(svgEl("rect", { x: cx + hr + 1, y: cy - 2, width: 5, height: 4,
        fill: cssVar("--phy-body") }));
      svg.appendChild(svgText(cx - hr - 8, cy + 8, "+刷", "phy-note-text", "end"));
      svg.appendChild(svgText(cx + hr + 8, cy + 8, "−刷", "phy-note-text", "start"));
      var phase = Math.floor(ang / 90) % 4;
      stepBtns.forEach(function (b, i) {
        b.setAttribute("aria-current", i === phase ? "true" : "false");
      });
      st.textContent = PHASES[phase];
      st.className = "phy-state " + (phase === 2 ? "phy-state-warn" : "phy-state-ok");
      badge.setReadout("", "已转 " + fmtN(ang / 360, 1) + " 圈（慢放示意）");
    }
    function loop() {
      if (!playing) return;
      var now = nowMs(), dt = Math.min(0.1, (now - lastT) / 1000 || 0.016);
      lastT = now; ang = (ang + dt * 72) % 3600; /* 慢放 */
      draw();
      rafId = rafFn(loop);
    }
    draw();
    return box;
  }

  /* ---------------- P1 · vacuum-tube（真空管：羽毛 vs 硬币） ---------------- */
  /* p11.2.3：有空气 → 硬币先落地；抽真空 → 同时落地（自由落体） */
  function widgetVacuumTube(p) {
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
    var t = 0, playing = false, rafId = 0, lastT = 0, vacuum = false;
    var bar = uiPlaybar({
      onPlay: function () { playing = true; t = 0; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; t = 0; draw(); }
    });
    bar.scrub.style.display = "none";
    box.appendChild(bar.bar);
    var st = stateBadge("先选“有空气 / 真空”，再按 ▶", "");
    box.appendChild(st);
    var H = 54, dC = 1.2;
    function setVac(v) {
      vacuum = v; t = 0;
      bAir.setAttribute("aria-pressed", v ? "false" : "true");
      bVac.setAttribute("aria-pressed", v ? "true" : "false");
      draw(); flash(svg);
    }
    function draw() {
      svg.innerHTML = "";
      var dF = vacuum ? dC : 3.6;
      svg.appendChild(svgEl("rect", { x: 30, y: 12, width: 40, height: 72, "class": "phy-body-box" }));
      svg.appendChild(svgText(50, 90, vacuum ? "真空管" : "有空气的管", "phy-note-text"));
      var yc = 18 + H * Math.pow(Math.min(1, t / dC), 2);
      var yf = 18 + H * Math.pow(Math.min(1, t / dF), 2);
      var xf = 43 + (vacuum ? 0 : Math.sin(t * 9) * 3 * Math.max(0, 1 - t / dF));
      /* 硬币 */
      svg.appendChild(svgEl("circle", { cx: 59, cy: yc.toFixed(1), r: 3.4, fill: "none",
        stroke: cssVar("--phy-force-a"), "stroke-width": 1.6 }));
      svg.appendChild(svgText(59, yc + 7, "硬币", "phy-note-text"));
      /* 羽毛 */
      svg.appendChild(svgEl("ellipse", { cx: xf.toFixed(1), cy: yf.toFixed(1), rx: 2.6, ry: 4.8,
        fill: cssVar("--phy-known"), opacity: 0.8,
        transform: "rotate(18 " + xf.toFixed(1) + " " + yf.toFixed(1) + ")" }));
      svg.appendChild(svgText(xf, yf - 8, "羽毛", "phy-note-text"));
      var done = t >= Math.max(dC, dF);
      if (done) {
        st.textContent = vacuum ? "同时落地 ✓：真空里只受重力，下落一样快"
          : "硬币先落地：空气阻力拖住了羽毛";
        st.className = "phy-state " + (vacuum ? "phy-state-ok" : "phy-state-warn");
        badge.setReadout("", vacuum ? "真空：同时落地（自由落体）" : "有空气：硬币快、羽毛慢");
      } else {
        st.textContent = t > 0 ? "下落中…" : "先选“有空气 / 真空”，再按 ▶";
        st.className = "phy-state";
      }
    }
    function loop() {
      if (!playing) return;
      var now = nowMs(), dt = Math.min(0.1, (now - lastT) / 1000 || 0.05);
      lastT = now; t += dt; draw();
      if (t >= Math.max(dC, vacuum ? dC : 3.6)) {
        playing = false; bar.setPlaying(false); draw(); return;
      }
      rafId = rafFn(loop);
    }
    bAir.addEventListener("click", function () { setVac(false); });
    bVac.addEventListener("click", function () { setVac(true); });
    setVac(false);
    return box;
  }

  /* ---------------- P1 · pendulum（虚拟摆） ---------------- */
  /* p00.1.2（复用 p17.1.2）：摆长 / 摆球 / 摆角可调 → T = 2π√(L/g) */
  function widgetPendulum(p) {
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
    /* 黄队 pendulum：① 顶部常驻"一次只动一个滑块"提示条；
     * ② 快捷对比按钮（把控制变量做成按钮）：只换摆球→周期不变 ✓，只换摆长→周期变。 */
    box.appendChild(el("div", "phy-hint-bar", "一次只动一个滑块，其他不动——看看谁能改变周期"));
    var verdictMsg = null;
    function animateSliderP(s, target) {
      var from = s.get(), t0 = nowMs(), dur = 900;
      (function tick() {
        var k = Math.min(1, (nowMs() - t0) / dur);
        /* silent set：只推滑块位置、不触发 on（不清 verdictMsg），手动 draw */
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
    var tV = 0, playing = true, rafId = 0, lastT = nowMs();
    var bar = uiPlaybar({
      onPlay: function () { playing = true; lastT = nowMs(); loop(); },
      onPause: function () { playing = false; if (rafId) cafFn(rafId); rafId = 0; },
      onReplay: function () { tV = 0; draw(); }
    });
    bar.scrub.style.display = "none";
    box.appendChild(bar.bar);
    var st = stateBadge("周期只跟摆长有关", "ok");
    box.appendChild(st);
    function draw() {
      var L = sL.get(), m = sM.get(), a0 = sA.get() * Math.PI / 180;
      var T = 2 * Math.PI * Math.sqrt(L / 9.8), w = 2 * Math.PI / T;
      var th = a0 * Math.cos(w * tV);
      svg.innerHTML = "";
      var pxLen = 22 + (L - 0.2) / 1.3 * 38;
      var bx = 50 + pxLen * Math.sin(th), by = 16 + pxLen * Math.cos(th);
      /* 支架 */
      svg.appendChild(svgEl("line", { x1: 30, y1: 14, x2: 70, y2: 14, "class": "phy-ground" }));
      /* 摆线 + 摆球（大小 ∝ 质量，示意） */
      svg.appendChild(svgEl("line", { x1: 50, y1: 14, x2: bx.toFixed(1), y2: by.toFixed(1),
        stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
      svg.appendChild(svgEl("circle", { cx: 50, cy: 14, r: 1.6, fill: cssVar("--phy-body") }));
      var br = 2.4 + m * 3;
      svg.appendChild(svgEl("circle", { cx: bx.toFixed(1), cy: by.toFixed(1), r: br.toFixed(1),
        fill: cssVar("--phy-force-a"), stroke: cssVar("--phy-body"), "stroke-width": 1 }));
      /* 平衡位置虚线 */
      svg.appendChild(svgEl("line", { x1: 50, y1: 14, x2: 50, y2: 16 + pxLen, "class": "phy-track-line" }));
      var eqm = "<math><mrow><mi>T</mi><mo>=</mo><mn>2</mn><mi>π</mi>" +
        "<msqrt><mfrac><mi>L</mi><mi>g</mi></mfrac></msqrt><mo>=</mo><mn>" +
        fmtN(T, 2) + "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">s</mi></mrow></math>";
      badge.setReadout(eqm, "T = 2π√(L/g) = " + fmtN(T, 2) + " s");
      st.textContent = verdictMsg || "换摆球质量 / 摆角 → 周期不变；摆长变 → 周期变";
      st.className = "phy-state " + (verdictMsg ? "phy-state-ok" : "");
    }
    function loop() {
      if (!playing) return;
      var now = nowMs(), dt = Math.min(0.05, (now - lastT) / 1000 || 0.016);
      lastT = now; tV += dt;
      draw();
      rafId = rafFn(loop);
    }
    sL.on(function () { verdictMsg = null; draw(); });
    sM.on(function () { verdictMsg = null; draw(); });
    sA.on(function () { verdictMsg = null; tV = 0; draw(); });
    draw();
    loop();
    return box;
  }

  /* ---------------- 组件注册表 ---------------- */
  /* 校验清单第 8 条：interaction.type 口径与渲染器同步 */
  var PHYSICS_INTERACTION_TYPES = [
    "force-drag", "motion-sim", "circuit-build", "optics-ray", "wave-tune",
    "pulley-lever", "collision-lab", "field-viz", "thermo-sim", "spring-shm",
    "guess-verify", "read-gauge", "formula-id", "graph-reader", "side-compare",
    "mv-lab", "slope-compare",
    /* 阶段四新增（黄队 P0/P1，2026-10-15） */
    "tuning-fork", "vacuum-chamber", "pinhole-camera", "overflow-cup",
    "em-induction", "displacement-arrow", "spring-scale-pull",
    "heat-compare", "sponge-dent", "paper-blow", "joule-heating",
    "motor-commutator", "vacuum-tube", "pendulum"
  ];
  var WIDGETS = {
    "force-drag": widgetForceDrag,
    "motion-sim": widgetMotionSim,
    "circuit-build": widgetCircuitBuild,
    "optics-ray": widgetOpticsRay,
    "wave-tune": widgetWaveTune,
    "pulley-lever": widgetPulleyLever,
    "collision-lab": widgetCollisionLab,
    "field-viz": widgetFieldViz,
    "thermo-sim": widgetThermoSim,
    "spring-shm": widgetSpringShm,
    "guess-verify": widgetGuessVerify,
    "read-gauge": widgetReadGauge,
    "formula-id": function (pr) { return renderFormulaId(pr || {}); },
    "graph-reader": widgetGraphReader,
    "side-compare": widgetSideCompare,
    "mv-lab": widgetMvLab,
    "slope-compare": widgetSlopeCompare,
    /* 阶段四新增（黄队 P0/P1，2026-10-15） */
    "tuning-fork": widgetTuningFork,
    "vacuum-chamber": widgetVacuumChamber,
    "pinhole-camera": widgetPinholeCamera,
    "overflow-cup": widgetOverflowCup,
    "em-induction": widgetEmInduction,
    "displacement-arrow": widgetDisplacementArrow,
    "spring-scale-pull": widgetSpringScalePull,
    "heat-compare": widgetHeatCompare,
    "sponge-dent": widgetSpongeDent,
    "paper-blow": widgetPaperBlow,
    "joule-heating": widgetJouleHeating,
    "motor-commutator": widgetMotorCommutator,
    "vacuum-tube": widgetVacuumTube,
    "pendulum": widgetPendulum
  };
  function renderWidget(type, params) {
    var fn = WIDGETS[type];
    if (!fn) {
      if (typeof console !== "undefined" && console.warn)
        console.warn("[physics] 未知组件类型：" + type);
      return el("div", "phy-unknown", "未支持的组件：" + type);
    }
    var node = fn(params || {});
    /* W-P20 安全徽章：涉及电/激光/高温/高压的页，params.safety 给话术
     *（"虚拟/现实"对比句式，黄队定稿），常驻交互区顶部 */
    if (params && params.safety) {
      var wrap = el("div", "phy-widget");
      wrap.appendChild(el("div", "phy-safety", "⚠ " + params.safety));
      wrap.appendChild(node);
      return wrap;
    }
    return node;
  }

  /* ---------------- 页面渲染 ---------------- */
  function pageKindLabel(kind) {
    return { interact: "交互", explain: "讲解", quiz: "练习" }[kind] || kind;
  }
  function renderZone(page, formulas) {
    var zone = el("div", "phy-zone");
    if (page.kind === "interact") {
      if (page.exploreTip) zone.appendChild(el("div", "phy-tip", "🖐 " + esc(page.exploreTip)));
      (page.widgets || []).forEach(function (w) {
        zone.appendChild(renderWidget(w.type, w.params));
      });
    } else if (page.kind === "explain") {
      (page.blocks || []).forEach(function (b) { zone.appendChild(renderBlock(b, formulas)); });
    } else if (page.kind === "quiz") {
      (page.questions || []).forEach(function (q) { zone.appendChild(renderQuestion(q)); });
    }
    return zone;
  }

  var zoneCleanup = null;
  function bindZoneScroll(zone, wrap) {
    if (zoneCleanup) { try { zoneCleanup(); } catch (e) {} zoneCleanup = null; }
    function update() {
      var sh = zone.scrollHeight || 0;
      var ch = zone.clientHeight || 0;
      var st = zone.scrollTop || 0;
      var can = sh > ch + 4;
      var atBottom = st + ch >= sh - 4;
      wrap.classList.toggle("show-more", can && !atBottom);
    }
    var rafFn = (typeof window.requestAnimationFrame === "function")
      ? window.requestAnimationFrame.bind(window) : null;
    var cafFn = (typeof window.cancelAnimationFrame === "function")
      ? window.cancelAnimationFrame.bind(window) : null;
    var raf = 0;
    function schedule() {
      if (raf) return;
      if (rafFn) { raf = rafFn(function () { raf = 0; update(); }); }
      else update();
    }
    function onScroll() { schedule(); }
    function onResize() { schedule(); }
    if (zone.addEventListener) {
      try { zone.addEventListener("scroll", onScroll, { passive: true }); }
      catch (e) { zone.addEventListener("scroll", onScroll); }
    }
    var hasWinListen = (typeof window.addEventListener === "function");
    if (hasWinListen) window.addEventListener("resize", onResize);
    var mo = null;
    if (typeof window.MutationObserver === "function") {
      mo = new window.MutationObserver(schedule);
      mo.observe(zone, { childList: true, subtree: true, characterData: true });
    }
    update();
    var cancelled = false;
    zoneCleanup = function () {
      if (cancelled) return;
      cancelled = true;
      if (zone.removeEventListener) {
        try { zone.removeEventListener("scroll", onScroll); } catch (e) {}
      }
      if (hasWinListen && typeof window.removeEventListener === "function") {
        try { window.removeEventListener("resize", onResize); } catch (e) {}
      }
      if (mo) { try { mo.disconnect(); } catch (e) {} }
      if (raf && cafFn) { try { cafFn(raf); } catch (e) {} }
      raf = 0;
    };
  }

  function markDone(lessonId) {
    var p = load("progress", {});
    p[lessonId] = { done: true, ts: Date.now() };
    store("progress", p);
  }

  function render() {
    if (!cur || !appRoot) return;
    var found = cur.found;
    var pages = found.lesson.pages;
    var page = pages[cur.pageIdx];
    var formulas = found.lesson.formulas || {};
    appRoot.innerHTML = "";

    var head = el("header", "phy-head");
    /* 目录抽屉入口（ux-review §2.1）：☰ + "目录"文字，≥44px，aria-expanded 同步 */
    var menuBtn = el("button", "phy-menu-btn", "☰ 目录");
    menuBtn.type = "button";
    menuBtn.setAttribute("aria-label", "打开目录");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.addEventListener("click", function () {
      if (drawerOpen) closeDrawer(); else openDrawer();
    });
    head.appendChild(menuBtn);
    drawerBtn = menuBtn;
    var back = el("button", "phy-back", "← 返回");
    back.type = "button";
    back.setAttribute("aria-label", "返回章节浏览");
    back.addEventListener("click", function () { showBrowser(); });
    head.appendChild(back);
    head.appendChild(el("h1", "", esc(found.lesson.title)));
    head.appendChild(el("span", "phy-page-tag",
      pageKindLabel(page.kind) + " " + (cur.pageIdx + 1) + "/" + pages.length));
    appRoot.appendChild(head);

    appRoot.appendChild(el("div", "phy-crumb",
      esc(found.chapter.id) + " · " + esc(found.unit.title) + " · " + esc(found.lesson.id)));

    var main = el("main", "phy-main");
    main.appendChild(el("h2", "phy-title", esc(page.title)));
    curPageId = found.lesson.id + "-p" + (cur.pageIdx + 1);
    var zone = renderZone(page, formulas);
    var zoneWrap = el("div", "phy-zone-wrap");
    zoneWrap.appendChild(zone);
    var more = el("button", "phy-more", "");
    more.type = "button";
    more.innerHTML =
      '<span class="phy-more-pill"><span>↓ 下面还有</span>' +
      '<span class="arr">↓</span></span>';
    more.setAttribute("aria-label", "滚动到底部操作区");
    more.addEventListener("click", function () {
      try { zone.scrollTo({ top: zone.scrollHeight, behavior: "smooth" }); }
      catch (e) { zone.scrollTop = zone.scrollHeight; }
    });
    zoneWrap.appendChild(more);
    main.appendChild(zoneWrap);
    if (page.point) {
      main.appendChild(el("p", "phy-point" + (page.pointScroll ? " scroll" : ""),
        "💡 " + esc(page.point)));
    }
    appRoot.appendChild(main);

    var pager = el("nav", "phy-pager");
    var prev = el("button", "", "← 上一页");
    var next = el("button", "phy-next", cur.pageIdx === pages.length - 1 ? "完成 ✓" : "下一页 →");
    prev.type = "button"; next.type = "button";
    prev.disabled = cur.pageIdx === 0;
    prev.addEventListener("click", function () { goPage(cur.pageIdx - 1); });
    next.addEventListener("click", function () {
      if (cur.pageIdx < pages.length - 1) goPage(cur.pageIdx + 1);
      else { markDone(found.lesson.id); showBrowser(); }
    });
    pager.appendChild(prev);
    pager.appendChild(next);
    appRoot.appendChild(pager);
    bindZoneScroll(zone, zoneWrap);
  }

  /* ---------------- 路由（hash 升级：#课号/页码，ux-review §2.4） ---------------- */
  function parseHash() {
    var h = location.hash || "";
    var m = h.match(/^#(p\d+\.\d+\.\d+)(?:\/(\d+))?$/);
    if (m) return { lesson: m[1], page: m[2] ? parseInt(m[2], 10) - 1 : 0 };
    var m2 = h.match(/[#&?]phy=([a-z0-9.]+)/i);
    if (m2) return { lesson: m2[1], page: 0, legacy: true }; /* 旧 hash 兼容：进第 1 页 */
    return null;
  }
  /* 每课页码持久化 `phy_page_<课号>`；file:// 下降级为内存（不报错） */
  var pageMem = {};
  function savePage(lessonId, pageIdx) {
    try { localStorage.setItem("phy_page_" + lessonId, String(pageIdx)); }
    catch (e) { pageMem[lessonId] = pageIdx; }
  }
  function loadPage(lessonId) {
    try {
      var v = parseInt(localStorage.getItem("phy_page_" + lessonId), 10);
      return isFinite(v) && v >= 0 ? v : 0;
    } catch (e) { return pageMem[lessonId] || 0; }
  }
  function markVisited(lessonId) {
    try {
      var v = load("visited", {});
      if (!v[lessonId]) { v[lessonId] = { ts: Date.now() }; store("visited", v); }
    } catch (e) {}
  }
  /* 二期"已学完"判定预留接口（首版只用"已访问"） */
  function lessonDone(lessonId) {
    try { return localStorage.getItem("phy_done_" + lessonId) === "1"; }
    catch (e) { return false; }
  }
  function syncHash(replace) {
    if (!cur || !cur.found) return;
    var url = "#" + cur.found.lesson.id + "/" + (cur.pageIdx + 1);
    try {
      if (replace) history.replaceState(null, "", url);
      else history.pushState(null, "", url);
    } catch (e) {}
  }
  /* 课内翻页：replaceState（不污染历史栈）+ 持久化页码 */
  function goPage(idx) {
    if (!cur || !cur.found) return;
    var pages = cur.found.lesson.pages || [];
    idx = Math.max(0, Math.min(pages.length - 1, idx));
    if (idx === cur.pageIdx) return;
    cur.pageIdx = idx;
    savePage(cur.found.lesson.id, idx);
    render();
    syncHash(true);
  }
  function openLesson(lessonId, pageIdx, push) {
    var found = findLesson(lessonId);
    if (!found) return false;
    var pages = found.lesson.pages || [];
    var idx = (pageIdx == null)
      ? Math.min(loadPage(lessonId), Math.max(0, pages.length - 1))
      : Math.max(0, Math.min(pages.length - 1, pageIdx));
    cur = { found: found, pageIdx: idx };
    markVisited(lessonId);
    savePage(lessonId, idx);
    browseRoot.hidden = true;
    appRoot.hidden = false;
    render();
    syncHash(!push);
    return true;
  }
  /* 跨课跳转：pushState；目标课恢复上次页码（新课进第 1 页） */
  function goLesson(lessonId) {
    openLesson(lessonId, undefined, true);
  }
  function showBrowser() {
    cur = null;
    if (appRoot) appRoot.hidden = true;
    if (browseRoot) {
      browseRoot.hidden = false;
      renderBrowser();
    }
    try {
      if (parseHash()) history.replaceState(null, "", location.pathname + location.search);
    } catch (e) {}
  }
  function route() {
    var h = parseHash();
    if (h && hasLesson(h.lesson)) {
      var pages = (findLesson(h.lesson).lesson.pages || []).length;
      var idx = Math.max(0, Math.min(pages - 1, h.page || 0));
      /* 已在该课该页 → 不重渲染（抽屉开关不触发，保证组件状态） */
      if (cur && cur.found && cur.found.lesson.id === h.lesson && cur.pageIdx === idx) return;
      openLesson(h.lesson, idx, false);
    } else {
      showBrowser();
    }
  }

  /* ---------------- 目录抽屉（ux-review §2 定案） ---------------- */
  var drawer = null, drawerMask = null, drawerBtn = null;
  var drawerOpen = false, drawerAnim = false, lastFocus = null, drawerBuilt = false;
  function buildDrawer() {
    if (drawerBuilt) return;
    drawerBuilt = true;
    drawerMask = el("div", "phy-drawer-mask");
    drawerMask.addEventListener("click", closeDrawer);
    drawer = el("div", "phy-drawer");
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-label", "目录");
    drawer.setAttribute("aria-hidden", "true");
    /* 焦点陷阱 + Esc 关闭 */
    drawer.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeDrawer(); return; }
      if (e.key !== "Tab") return;
      var btns = drawer.querySelectorAll("button");
      var f = [];
      for (var i = 0; i < btns.length; i++)
        if (btns[i].offsetParent !== null) f.push(btns[i]);
      if (!f.length) return;
      var first = f[0], last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault(); last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault(); first.focus();
      }
    });
    /* 抽屉内左划关闭（起始于抽屉内，向左 ≥40px，垂直偏移 <30px） */
    var dStart = null;
    drawer.addEventListener("touchstart", function (e) {
      var t = e.touches[0];
      dStart = { x: t.clientX, y: t.clientY };
    }, { passive: true });
    drawer.addEventListener("touchend", function (e) {
      if (!dStart) return;
      var t = e.changedTouches[0];
      var dx = t.clientX - dStart.x, dy = t.clientY - dStart.y;
      dStart = null;
      if (dx <= -40 && Math.abs(dy) < 30) closeDrawer();
    }, { passive: true });
    document.body.appendChild(drawerMask);
    document.body.appendChild(drawer);
  }
  function renderDrawer() {
    drawer.innerHTML = "";
    var curId = cur && cur.found ? cur.found.lesson.id : null;
    var curChId = cur && cur.found ? cur.found.chapter.id : null;
    var head = el("div", "phy-drawer-head");
    if (cur && cur.found) {
      head.appendChild(el("div", "phy-drawer-ch", esc(cur.found.chapter.title)));
      head.appendChild(el("div", "phy-drawer-page",
        "第 " + (cur.pageIdx + 1) + " 页 / 共 " + (cur.found.lesson.pages || []).length + " 页"));
    } else {
      head.appendChild(el("div", "phy-drawer-ch", "目录"));
    }
    var close = el("button", "phy-drawer-close", "✕");
    close.type = "button";
    close.setAttribute("aria-label", "关闭目录");
    close.addEventListener("click", closeDrawer);
    head.appendChild(close);
    drawer.appendChild(head);
    var list = el("div", "phy-drawer-list");
    var visited = load("visited", {});
    var curLessonBtn = null, curChBox = null;
    readyChapters().forEach(function (c) {
      var ch = window.PHY_CH[c.id];
      if (!ch) return;
      var chBox = el("div", "phy-drawer-chbox");
      var isCur = c.id === curChId;
      var chBtn = el("button", "phy-drawer-chbtn", "");
      chBtn.type = "button";
      chBtn.innerHTML = "<span>" + esc(c.id) + " · " + esc(c.title) + "</span>" +
        '<span class="phy-drawer-arrow">' + (isCur ? "▾" : "▸") + "</span>";
      chBtn.setAttribute("aria-expanded", isCur ? "true" : "false");
      var lessonsBox = el("div", "phy-drawer-lessons");
      lessonsBox.style.display = isCur ? "" : "none";
      (function (cb, lb, ab) {
        cb.addEventListener("click", function () {
          var open = lb.style.display !== "none";
          lb.style.display = open ? "none" : "";
          cb.setAttribute("aria-expanded", open ? "false" : "true");
          ab.textContent = open ? "▸" : "▾";
        });
      })(chBtn, lessonsBox, chBtn.querySelector(".phy-drawer-arrow"));
      chBox.appendChild(chBtn);
      (ch.units || []).forEach(function (u) {
        (u.lessons || []).forEach(function (l) {
          var lb = el("button", "phy-drawer-lesson", "");
          lb.type = "button";
          var isCurL = l.id === curId;
          /* 三编码：背景高亮 + 左侧 4px 指示条 + "当前"文字徽章；
           * 状态点：当前课实心圆 / 已访问空心圆（首版口径） */
          var mark = isCurL ? '<span class="phy-dot-cur" aria-hidden="true"></span>'
            : visited[l.id] ? '<span class="phy-dot-seen" aria-hidden="true"></span>' : "";
          lb.innerHTML = mark + '<span class="phy-drawer-lt">' + esc(l.title) + "</span>" +
            (isCurL ? '<span class="phy-drawer-cur">当前</span>' : "");
          if (isCurL) { lb.classList.add("phy-drawer-cur-lesson"); curLessonBtn = lb; }
          lb.setAttribute("aria-current", isCurL ? "true" : "false");
          (function (lid) {
            lb.addEventListener("click", function () {
              closeDrawer();
              goLesson(lid);
            });
          })(l.id);
          lessonsBox.appendChild(lb);
        });
      });
      chBox.appendChild(lessonsBox);
      list.appendChild(chBox);
      if (isCur) curChBox = chBox;
    });
    drawer.appendChild(list);
    var foot = el("div", "phy-drawer-foot");
    var home = el("button", "phy-mini", "← 课程首页");
    home.type = "button";
    home.addEventListener("click", function () { closeDrawer(); showBrowser(); });
    foot.appendChild(home);
    drawer.appendChild(foot);
    /* 自动滚动到当前章/当前课 */
    try {
      if (curChBox) curChBox.scrollIntoView({ block: "start" });
      if (curLessonBtn) curLessonBtn.scrollIntoView({ block: "center" });
    } catch (e) {}
  }
  function openDrawer() {
    if (drawerOpen || drawerAnim || !cur) return;
    buildDrawer();
    drawerAnim = true;
    setTimeout(function () { drawerAnim = false; }, 280);
    drawerOpen = true;
    renderDrawer();
    drawerMask.classList.add("open");
    drawer.classList.add("open");
    drawer.classList.add("phy-drawer-anim");
    drawer.setAttribute("aria-hidden", "false");
    try { document.body.style.overflow = "hidden"; } catch (e) {}
    if (drawerBtn) drawerBtn.setAttribute("aria-expanded", "true");
    lastFocus = document.activeElement;
    var f = drawer.querySelector("button");
    if (f) { try { f.focus(); } catch (e) {} }
  }
  function closeDrawer() {
    if (!drawerOpen || drawerAnim) return;
    drawerAnim = true;
    setTimeout(function () { drawerAnim = false; }, 230);
    drawerOpen = false;
    if (drawerMask) drawerMask.classList.remove("open");
    if (drawer) {
      drawer.classList.remove("open");
      drawer.setAttribute("aria-hidden", "true");
    }
    try { document.body.style.overflow = ""; } catch (e) {}
    if (drawerBtn) drawerBtn.setAttribute("aria-expanded", "false");
    if (lastFocus && lastFocus.focus) { try { lastFocus.focus(); } catch (e) {} }
    /* 不重渲染、不重置组件状态：覆盖层本来就没离开当前页 */
  }
  /* 左边缘划出手势（≤24px 热区、右划 ≥40px、垂直偏移 <30px；只在学习视图生效） */
  var gStart = null;
  function bindDrawerGesture() {
    document.addEventListener("touchstart", function (e) {
      if (!cur || !appRoot || appRoot.hidden) { gStart = null; return; }
      var t = e.touches[0];
      gStart = { x: t.clientX, y: t.clientY,
        inEdge: t.clientX <= 24, inDrawer: !!(drawer && drawer.contains(e.target)) };
    }, { passive: true });
    document.addEventListener("touchend", function (e) {
      if (!gStart) return;
      var t = e.changedTouches[0];
      var dx = t.clientX - gStart.x, dy = t.clientY - gStart.y;
      var s = gStart; gStart = null;
      if (!drawerOpen && s.inEdge && dx >= 40 && Math.abs(dy) < 30) openDrawer();
      else if (drawerOpen && s.inDrawer && dx <= -40 && Math.abs(dy) < 30) closeDrawer();
    }, { passive: true });
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    browseRoot = document.getElementById("phy-browser");
    appRoot = document.getElementById("phy-app");
    if (!browseRoot || !appRoot) return;
    buildDrawer();
    bindDrawerGesture();
    if (window.addEventListener) window.addEventListener("hashchange", route);
    route();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

  window.PHY = {
    hasLesson: hasLesson,
    open: openLesson,
    close: function () { cur = null; },
    /* 阶段三批量生产用：渲染单个组件（冒烟/调试）；types 与校验清单同步 */
    widget: renderWidget,
    types: PHYSICS_INTERACTION_TYPES
  };
})();
