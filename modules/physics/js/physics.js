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
    try { localStorage.setItem("ltb-phy-" + k, JSON.stringify(v)); } catch (e) {}
  }
  function load(k, fb) {
    try {
      var v = JSON.parse(localStorage.getItem("ltb-phy-" + k));
      return v == null ? fb : v;
    } catch (e) { return fb; }
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
    return { box: box, val: $(".phy-badge-val", box), unit: $(".phy-badge-unit", box), root: box };
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
      var w = b.widget || {};
      if (w.type === "slope-compare") return widgetSlopeCompare(w.params || {});
      if (w.type === "mv-lab") return widgetMvLab(w.params || {});
    }
    return el("div", "", "");
  }

  /* ---------------- 练习题（Y3 判分口径） ---------------- */
  function renderQuestion(q) {
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

  /* ---------------- 页面渲染 ---------------- */
  function pageKindLabel(kind) {
    return { interact: "交互", explain: "讲解", quiz: "练习" }[kind] || kind;
  }
  function renderZone(page, formulas) {
    var zone = el("div", "phy-zone");
    if (page.kind === "interact") {
      if (page.exploreTip) zone.appendChild(el("div", "phy-tip", "🖐 " + esc(page.exploreTip)));
      (page.widgets || []).forEach(function (w) {
        if (w.type === "mv-lab") zone.appendChild(widgetMvLab(w.params || {}));
        else if (w.type === "slope-compare") zone.appendChild(widgetSlopeCompare(w.params || {}));
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
    close: function () { cur = null; }
  };
})();
