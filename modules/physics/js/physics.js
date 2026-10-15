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
    var nLessons = 0;
    chs.forEach(function (c) {
      ((window.PHY_CH[c.id] || {}).units || []).forEach(function (u) {
        nLessons += (u.lessons || []).length;
      });
    });
    wrap.appendChild(el("p", "phy-browse-sub",
      "18 章 · 127 课 · 约 344 页（" + chs.length + " 章 · " + nLessons + " 课已就位）"));
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
    var traces = {};
    mats.forEach(function (mt) {
      var vEnd = Math.min(vMax, mMax / mt.rho);
      var pts = [];
      for (var v = 0; v <= vEnd + 1; v += 100) {
        var vv = Math.min(v, vEnd);
        pts.push(X(vv).toFixed(2) + "," + Y(mt.rho * vv).toFixed(2));
        if (vv >= vEnd) break;
      }
      var pl = svgEl("polyline", {
        "class": "phy-trace", points: pts.join(" "),
        stroke: roleColor(mt.colorRole)
      });
      svg.appendChild(pl);
      traces[mt.id] = pl;
      /* 斜率标签（Y4：直线段给精确值）
       * 附带观察（2026-10-15）：陡线（铁，线端贴近 y 轴）的标签若放线端
       * 左上，会与 y 轴 "1000" 刻度在左上角相挤；此时改放线端右下方。 */
      var tagEndX = X(vEnd), tagEndY = Y(mt.rho * vEnd);
      var tagCrowded = tagEndX < 30;
      var tag = svgEl("text", {
        "class": "phy-slope-tag",
        x: tagCrowded ? tagEndX + 1.5 : tagEndX - 1,
        y: tagCrowded ? tagEndY + 4.5 : tagEndY - 2,
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
      for (var id in traces) {
        traces[id].style.opacity = (!mt || id === mt.id) ? "1" : "0.25";
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
    order.forEach(function (mid, i) {
      var mt = null;
      mats.forEach(function (x) { if (x.id === mid) mt = x; });
      if (!mt) return;
      var row = el("button", "phy-slope-row",
        '<span class="phy-slope-rank">' + (i + 1) + "</span>" +
        '<span class="phy-slope-name">' + esc(mt.name) + "</span>" +
        '<span class="phy-slope-line" style="background:' + roleColor(mt.colorRole) + '"></span>' +
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
    autoBtn.addEventListener("click", function () {
      /* 2×2 方形无弦回路：非相邻元件在网格上不相邻，避免零电阻"弦"回路误判短路 */
      comps = [
        { id: "bat1", kind: "battery", cell: [2, 1] },
        { id: "s1", kind: "switch", cell: [3, 1], on: false },
        { id: "b1", kind: "bulb", cell: [3, 2] },
        { id: "w1", kind: "wire", cell: [2, 2] }
      ];
      solve(); flash(svg);
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
        g.appendChild(svgEl("circle", { cx: cc.x - s * 0.32, cy: cc.y, r: 1.1, fill: col }));
        g.appendChild(svgEl("circle", { cx: cc.x + s * 0.32, cy: cc.y, r: 1.1, fill: col }));
        if (comp.on) line(-s * 0.32, 0, s * 0.32, 0, 1.4);
        else {
          var lx = cc.x + s * 0.32, ly = cc.y;
          g.appendChild(svgEl("line", { x1: cc.x - s * 0.32, y1: cc.y,
            x2: cc.x + s * 0.1, y2: cc.y - s * 0.3, stroke: col, "stroke-width": 1.4 }));
          g.appendChild(svgEl("circle", { cx: cc.x + s * 0.1, cy: cc.y - s * 0.3, r: 1.1, fill: col }));
        }
        g.appendChild(svgText(cc.x, cc.y + s * 0.48, comp.on ? "闭合" : "断开", "phy-sym-label"));
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
        } else if (!compAt(cc, rr)) {
          comp.cell = [cc, rr];
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
      var b = el("button", "phy-tray-item", CIRCUIT_KIND_ZH[kind] || kind);
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
    return box;
  }

  /* ---------------- P4 · optics-ray（光路作图） ---------------- */
  /* 降级声明：只做几何光线；衍射/干涉/波前/色散不做 */
  function widgetOpticsRay(p) {
    var box = el("div", "phy-widget");
    var badge = readoutBadge(p);
    box.appendChild(badge.box);
    var svg = svgStage("", p.mode === "mirror" ? "平面镜反射光路" : "凸透镜成像光路");
    box.appendChild(svg);
    var imgBadge = stateBadge("—", "");
    box.appendChild(imgBadge);
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
        var rx2 = hx - dx, ry2 = hy + dy * 0.9;
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
      } else if (p.showImage === false) {
        imgBadge.textContent = "（像已隐藏）";
        tone = "";
      } else {
        var iy = AX + (kind === "real" ? ih : -ih);
        var iln = svgEl("line", { x1: ix, y1: AX, x2: ix, y2: kind === "real" ? AX - ih : AX + ih,
          stroke: cssVar("--phy-body"), "stroke-width": 1.8,
          "stroke-dasharray": kind === "virtual" ? "2.5,2" : "none",
          "marker-end": kind === "real" ? "url(#fh-ray)" : "none" });
        svg.appendChild(iln);
        var prop = kind === "real"
          ? (Math.abs(m) < 1 ? "倒立缩小实像" : "倒立放大实像")
          : "正立放大虚像";
        imgBadge.textContent = prop + (kind === "virtual" ? "（虚像用虚线画，因为光线没真交于那）" : "");
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
      var sumCk = el("input", "");
      sumCk.type = "checkbox"; sumCk.checked = showSum;
      sumCk.setAttribute("aria-label", "显示合成波");
      sumRow.appendChild(sumCk);
      sumRow.appendChild(el("span", "", "显示合成波（两列波叠加）"));
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
      /* 读数行：λ=v/f，v=340m/s 注明 */
      var lam = 340 / f;
      var rm = "<math><mrow><mi>A</mi><mo>=</mo><mn>" + fmtN(A, 1) +
        "</mn><mo>,</mo><mi>f</mi><mo>=</mo><mn>" + fmtN(f, 0) +
        "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">Hz</mi><mo>,</mo>" +
        "<mi>λ</mi><mo>=</mo><mi>v</mi><mo>/</mo><mi>f</mi><mo>=</mo><mn>" + fmtN(lam, 2) +
        "</mn><mspace width=\"0.25em\"/><mi mathvariant=\"normal\">m</mi></mrow></math>";
      badge.setReadout(rm, "A=" + fmtN(A, 1) + "，f=" + fmtN(f, 0) + " Hz，λ=v/f=" + fmtN(lam, 2) + " m（v=340m/s，声速）");
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
          var x = i / N * 4; /* 显示 4 个周期（示意） */
          var px = 10 + i / N * (W - 20), py = yOf(fn(x, t));
          if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
        }
        ctx.stroke(); ctx.setLineDash([]);
      }
      var fA = function (x, t) { return waveVal(A, 1, phd, x / (2 * Math.PI), t); };
      plot(fA, cssVar("--phy-wave-a"));
      readWaveB();
      if (waveB) {
        var fB = function (x, t) { return waveVal(bAmp, 1, bPh, x / (2 * Math.PI), t); };
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
      /* 阻力（橙，已知） */
      beam.appendChild(svgEl("rect", { x: Lx - 4, y: BY + 2, width: 8, height: 7, "class": "phy-body-box" }));
      arrowHead(svg, "fh-f2", cssVar("--phy-force-a"));
      beam.appendChild(svgEl("line", { x1: Lx, y1: BY + 2, x2: Lx, y2: BY - 10,
        stroke: cssVar("--phy-force-a"), "stroke-width": 1.8, "marker-end": "url(#fh-f2)" }));
      beam.appendChild(svgText(Lx - 1, BY - 12, "F₂", "phy-force-label", "end"));
      /* 动力（朱红，待求） */
      arrowHead(svg, "fh-f1", cssVar("--phy-target"));
      beam.appendChild(svgEl("line", { x1: Ex, y1: BY + 2, x2: Ex, y2: BY - 10,
        stroke: cssVar("--phy-target"), "stroke-width": 2.2, "marker-end": "url(#fh-f1)" }));
      beam.appendChild(svgText(Ex + 1, BY - 12, "F₁", "phy-force-label", "start"));
      /* 力臂弧线（单弧/双弧双编码） */
      beam.appendChild(svgEl("path", { d: "M" + Lx + "," + (BY - 14) + " A14,14 0 0 1 " + O + "," + (BY - 14),
        fill: "none", stroke: cssVar("--phy-force-a"), "stroke-width": 1 }));
      beam.appendChild(svgEl("path", { d: "M" + O + "," + (BY - 14) + " A14,14 0 0 1 " + Ex + "," + (BY - 14),
        fill: "none", stroke: cssVar("--phy-force-b"), "stroke-width": 1,
        "stroke-dasharray": "2,1.5" }));
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
    var sV1 = uiSlider({ label: "①车初速度 v₁", min: p.v1.min, max: p.v1.max,
      step: p.v1.step, init: p.v1.init, unit: "m/s" });
    var sV2 = uiSlider({ label: "②车初速度 v₂", min: p.v2.min, max: p.v2.max,
      step: p.v2.step, init: p.v2.init, unit: "m/s" });
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
          svg.appendChild(svgText(x + dir * (L + 2), 44.5, fmtN(v, 1) + "m/s", "phy-sym-label",
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
    box.appendChild(svg);
    var note = noteLine(p.mode === "bfield"
      ? "拖磁铁转一转，看小磁针 N 极跟着转。"
      : "点空白处放电荷（最多 4 个）；拖动电荷，松手后场线重算；双击删除。");
    box.appendChild(note);
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
      var fCk = el("input", "");
      fCk.type = "checkbox"; fCk.checked = !!p.ironFilings;
      filings.appendChild(fCk);
      filings.appendChild(el("span", "", "撒铁屑（看磁感线排布示意）"));
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
        svg.appendChild(rot);
        dragify(rot, { svg: svg, onMove: function (lx, ly) {
          mag.a = Math.atan2(-(ly - cy), lx - mag.x) * 180 / Math.PI;
          drawB();
        } });
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
        dragify(circ, { svg: svg, onMove: function (lx, ly) {
          c.x = Math.max(6, Math.min(94, lx)); c.y = Math.max(6, Math.min(94, 100 - ly));
          circ.setAttribute("cx", c.x); circ.setAttribute("cy", 100 - c.y);
        }, onEnd: function () { drawE(); flash(svg); } });
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
      svg.appendChild(pr);
      dragify(pr, { svg: svg, onMove: function (lx, ly) {
        probe.x = Math.max(4, Math.min(96, lx)); probe.y = Math.max(4, Math.min(96, 100 - ly));
        drawE();
      } });
      } /* probeDrag */
      /* 点选放置 */
      svg.addEventListener("click", function (ev) {
        if (ev.target !== svg) return;
        var q = toSVG(svg, ev.clientX, ev.clientY);
        if (charges.length >= 4) { note.textContent = "最多放 4 个电荷。"; flash(note); return; }
        var ly = 100 - q.y;
        var overlap = charges.some(function (c) { return Math.hypot(c.x - q.x, c.y - ly) < 8; });
        if (overlap) { note.textContent = "电荷叠在一起了，挪开一点。"; flash(note); return; }
        charges.push({ id: "q" + Date.now(), x: q.x, y: ly,
          q: charges.filter(function (c) { return c.q > 0; }).length <=
             charges.filter(function (c) { return c.q < 0; }).length ? 1 : -1 });
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
    var TIER_COL = ["--phy-charge-neg", "--phy-force-a", "--phy-charge-pos"];
    var TIER_ZH = ["慢", "中", "快"];
    function draw() {
      var T = tCtl.get();
      var Tk = T + 273.15;
      var vScale = Math.sqrt(Tk / 293.15);
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
      var rawMax = 1.5 * vScale, target = 1.1, sc = Math.min(1, target / rawMax);
      slowNote.style.display = sc < 1 ? "" : "none";
      if (sc < 1) slowNote.textContent = "已慢放（高温粒子太快，动画降速示意）。";
      /* 粒子 */
      ps.forEach(function (q) {
        var sp = q.sp * vScale * sc;
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
      var T = tCtl.get(), vScale = Math.sqrt((T + 273.15) / 293.15);
      var rawMax = 1.5 * vScale, sc = Math.min(1, 1.1 / rawMax);
      ps.forEach(function (q) {
        var sp = q.sp * vScale * sc;
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
      badge.setReadout(rm, "T = " + rm.text);
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
    verify.addEventListener("click", function () {
      try { store(p.recordKey, { choice: chosen, ts: Date.now() }); } catch (e) {}
      opts.style.display = "none"; row.style.display = "none";
      box.appendChild(noteLine("已记下你的猜测，去动手验证吧。"));
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
      if (Math.abs(v - target) <= tolHere + 1e-9) say(true, "读数 " + fmtN(target, needDec) + " " + unit + "。");
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
    /* 刻度引擎：水平 / 垂直 */
    function hTicks(g, o) {
      var n = Math.round((o.max - o.min) / o.div);
      for (var i = 0; i <= n; i++) {
        var v = o.min + i * o.div;
        var x = o.x0 + i / n * (o.x1 - o.x0);
        var major = i % (o.majorEvery || 5) === 0;
        g.appendChild(svgEl("line", { x1: x, y1: o.y, x2: x, y2: o.y + (major ? 7 : 4),
          stroke: cssVar("--phy-body"), "stroke-width": major ? 1.2 : 0.7 }));
        if (major) g.appendChild(svgText(x, o.y + 13, fmtN(v, decOf(o.div)), "phy-tick-label"));
      }
      g.appendChild(svgEl("line", { x1: o.x0, y1: o.y, x2: o.x1, y2: o.y,
        stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
    }
    function vTicks(g, o) {
      var n = Math.round((o.max - o.min) / o.div);
      for (var i = 0; i <= n; i++) {
        var v = o.min + i * o.div;
        var y = o.y1 - i / n * (o.y1 - o.y0);
        var major = i % (o.majorEvery || 5) === 0;
        g.appendChild(svgEl("line", { x1: o.x, y1: y, x2: o.x + (major ? 7 : 4), y2: y,
          stroke: cssVar("--phy-body"), "stroke-width": major ? 1.2 : 0.7 }));
        if (major) g.appendChild(svgText(o.x - 2, y + 1.5, fmtN(v, decOf(o.div)), "phy-tick-label", "end"));
      }
      g.appendChild(svgEl("line", { x1: o.x, y1: o.y0, x2: o.x, y2: o.y1,
        stroke: cssVar("--phy-body"), "stroke-width": 1.4 }));
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
        head.appendChild(inputRow(target2, range.unit, "读数（估读一位）"));
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
        head.appendChild(el("span", "", "选合适量程："));
        ranges.forEach(function (rg, i) {
          var b = el("button", "phy-mini", rg.t);
          b.type = "button";
          b.addEventListener("click", function () {
            if (p.trialTouch && isA && stage === 0) {
              say(false, "必须先大量程试触，直接小量程接入不规范。");
              return;
            }
            sel = rg; stage = 2; drawScale3();
          });
          head.appendChild(b);
        });
        head.appendChild(newQBtn(function () { stage = 0; sel = null; drawMeter(); }));
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
        /* 游码（线性拖拽） */
        var rx = 30 + rider / 5 * 40;
        var yg = svgEl("rect", { x: rx - 2, y: 30, width: 4, height: 8,
          fill: cssVar("--phy-target"), "class": "phy-handle", "aria-label": "拖动游码" });
        svg.appendChild(yg);
        svg.appendChild(svgText(30, 26, "0", "phy-tick-label", "start"));
        svg.appendChild(svgText(70, 26, "5g", "phy-tick-label", "end"));
        dragify(yg, { svg: svg, onMove: function (lx) {
          rider = Math.max(0, Math.min(5, (lx - 30) / 40 * 5));
          if (rCtl) rCtl.set(Math.round(rider / 0.2) * 0.2, true);
          drawBalance();
        } });
        head.innerHTML = "";
        head.appendChild(el("span", "", "游码（0–5g，可拖）："));
        rCtl = uiSlider({ label: "", min: 0, max: 5, step: 0.2, init: rider, unit: "g" });
        head.appendChild(rCtl.row);
        rCtl.on(function (v) { rider = v; drawBalance(); });
        head.appendChild(inputRow(panW + rider, "g", "砝码+游码", 0.2));
        head.appendChild(newQBtn(function () {
          panW = [10, 20, 50][Math.floor(Math.random() * 3)];
          rider = Math.round(Math.random() * 25) * 0.2;
          drawBalance();
        }));
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
      } else if (pts) exact = true; /* 点列：直线段给精确值 */
      var col = exact ? cssVar("--phy-force-c") : cssVar("--phy-target");
      svg.appendChild(svgEl("line", { x1: X(a), y1: Y(ya), x2: X(b), y2: Y(yb),
        stroke: col, "stroke-width": 1.6, "stroke-dasharray": exact ? "none" : "3,2" }));
      svg.appendChild(svgText((X(a) + X(b)) / 2, Math.min(Y(ya), Y(yb)) - 3,
        "k=" + fmtN(k, 2) + (exact ? "" : "（近似）"), "phy-slope-tag"));
      out.textContent = exact
        ? "斜率 k = " + fmtN(k, 2) + "（直线段，精确值）"
        : "斜率 ≈ " + fmtN(k, 2) + "（曲线段，近似——切线斜率示意，别当精确值抄）";
      var r = mmlRead(mi("k"), fmtN(k, 2) + (exact ? "" : "（近似）"), "");
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
      var found = [];
      for (var i = 0; i < 120; i++) {
        var xa = x0 + (x1 - x0) * i / 120, xb = x0 + (x1 - x0) * (i + 1) / 120;
        var ya = sampleY(xa), yb = sampleY(xb);
        if (isFinite(ya) && isFinite(yb) && ya * yb < 0)
          found.push(xa - ya * (xb - xa) / (yb - ya));
      }
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

  /* ---------------- 组件注册表 ---------------- */
  /* 校验清单第 8 条：interaction.type 口径与渲染器同步 */
  var PHYSICS_INTERACTION_TYPES = [
    "force-drag", "motion-sim", "circuit-build", "optics-ray", "wave-tune",
    "pulley-lever", "collision-lab", "field-viz", "thermo-sim", "spring-shm",
    "guess-verify", "read-gauge", "formula-id", "graph-reader", "side-compare",
    "mv-lab", "slope-compare"
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
    "slope-compare": widgetSlopeCompare
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
    var zone = renderZone(page, formulas);
    var zoneWrap = el("div", "phy-zone-wrap");
    zoneWrap.appendChild(zone);
    var more = el("div", "phy-more",
      '<span class="phy-more-pill"><span>下滑查看更多</span>' +
      '<span class="arr">↓</span></span>');
    more.setAttribute("aria-hidden", "true");
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
    prev.addEventListener("click", function () {
      if (cur.pageIdx > 0) { cur.pageIdx--; render(); }
    });
    next.addEventListener("click", function () {
      if (cur.pageIdx < pages.length - 1) { cur.pageIdx++; render(); }
      else { markDone(found.lesson.id); showBrowser(); }
    });
    pager.appendChild(prev);
    pager.appendChild(next);
    appRoot.appendChild(pager);
    bindZoneScroll(zone, zoneWrap);
  }

  /* ---------------- 路由 ---------------- */
  function parseHash() {
    var m = (location.hash || "").match(/[#&?]phy=([a-z0-9.]+)/i);
    return m ? m[1] : null;
  }
  function openLesson(lessonId) {
    var found = findLesson(lessonId);
    if (!found) return false;
    cur = { found: found, pageIdx: 0 };
    browseRoot.hidden = true;
    appRoot.hidden = false;
    render();
    try {
      if (parseHash() !== lessonId) {
        history.replaceState(null, "", "#phy=" + lessonId);
      }
    } catch (e) {}
    return true;
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
    var id = parseHash();
    if (id && hasLesson(id)) openLesson(id);
    else showBrowser();
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    browseRoot = document.getElementById("phy-browser");
    appRoot = document.getElementById("phy-app");
    if (!browseRoot || !appRoot) return;
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
