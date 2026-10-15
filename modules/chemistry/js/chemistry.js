/* ============================================================
 * 学习工具箱 · 化学 · 主引擎（蓝队 2026-10-15，骨架 + 试点 cm05.1.2）
 *
 * 命名空间隔离铁律：本文件只使用 window.CHEM_META（章注册表）、
 * window.CHEM_CH（章数据）与 window.CHEM（对外 API），只渲染
 * #chemistry-app 容器内的内容。
 * localStorage 键一律 ltb-chm-* 命名空间；ltb-en-* / ltb-math-* /
 * ltb-phy-* 键只读不写、绝不删除。
 * 数据驱动：页面全部来自 window.CHEM_CH[cmNN].units[].lessons[]
 *              .pages[]（schema 见 data/cm05.js 文件头，v1.0 冻结）。
 * IIFE + var，零依赖；数据经 <script> 引入（不用 fetch、不用 ES Module），
 * file:// 可运行。
 * hash：#cm05.1.2/3（课号/页码）；旧 hash #chm=cm05.1.2 兼容。
 * 目录抽屉：顶栏「目录」按钮 + 左缘划出双开；点遮罩/左划/按钮再点/
 * Esc 关闭；fixed 覆盖层不挤压主内容；学习页默认收起。
 * ============================================================ */
(function () {
  "use strict";
  var SVG_NS = "http://www.w3.org/2000/svg";
  var CHEMISTRY_INTERACTION_TYPES = [
    "equation-balance", "formula-read", "balance-replay"
  ];
  /* 试点阶段实现 3 种；C1–C10/Y6/Y10/Y12/Y13 随阶段三按
   * docs/chemistry-interactions.md spec 增补（类型名冻结，不得自创）。 */

  var cur = null;            /* { found, pageIdx } */
  var curPageId = "";
  var browseRoot = null, appRoot = null;

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
    node.classList.remove("chm-flash");
    void node.offsetWidth;
    node.classList.add("chm-flash");
  }
  function vib(ms) { try { if (navigator.vibrate) navigator.vibrate(ms); } catch (e) {} }

  /* localStorage：ltb-chm-* 命名空间；禁用时内存降级（不报错） */
  var memStore = {};
  function store(k, v) {
    try { localStorage.setItem("ltb-chm-" + k, JSON.stringify(v)); }
    catch (e) { memStore["ltb-chm-" + k] = JSON.stringify(v); }
  }
  function load(k, fb) {
    try {
      var v = JSON.parse(localStorage.getItem("ltb-chm-" + k));
      return v == null ? fb : v;
    } catch (e) {
      try {
        var m = JSON.parse(memStore["ltb-chm-" + k]);
        return m == null ? fb : m;
      } catch (e2) { return fb; }
    }
  }
  /* 填空归一化：去首尾空白、小写、压缩空白；上标数字 ⁰¹²³⁴⁵⁶⁷⁸⁹ → 0-9；
   * 全角冒号 → 半角（"2：1" 接受为 "2:1"）。判分口径：canonical + accept 全集。 */
  var SUPER_DIGITS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
  function norm(s) {
    return String(s == null ? "" : s).trim().toLowerCase()
      .replace(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g, function (d) { return String(SUPER_DIGITS.indexOf(d)); })
      .replace(/：/g, ":")
      .replace(/\s+/g, " ");
  }
  function fmtN(n, d) {
    if (!isFinite(n)) return "—";
    var s = Number(n).toFixed(d == null ? 1 : d);
    return s.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
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
    return '<span class="chm-formula-fallback">' + esc(f.translation || "") + "</span>";
  }
  /* 正文块内的 <span class="chm-f" data-f="key"> 占位替换 */
  function hydrateFormulas(root, formulas) {
    var spans = root.querySelectorAll(".chm-f");
    for (var i = 0; i < spans.length; i++) {
      var key = spans[i].getAttribute("data-f");
      spans[i].innerHTML = formulaHtml(formulas, key);
    }
  }

  /* ---------------- 数据查找 ---------------- */
  function readyChapters() {
    var meta = (window.CHEM_META && window.CHEM_META.chapters) || [];
    return meta.filter(function (c) { return window.CHEM_CH && window.CHEM_CH[c.id]; });
  }
  function findLesson(lessonId) {
    var CH = window.CHEM_CH || {};
    for (var cid in CH) {
      if (!Object.prototype.hasOwnProperty.call(CH, cid)) continue;
      var ch = CH[cid];
      var units = ch.units || [];
      for (var i = 0; i < units.length; i++) {
        var lessons = units[i].lessons || [];
        for (var j = 0; j < lessons.length; j++) {
          if (lessons[j].id === lessonId)
            return { chapter: ch, unit: units[i], lesson: lessons[j] };
        }
      }
    }
    return null;
  }
  function hasLesson(lessonId) { return !!findLesson(lessonId); }
  function isDone(lessonId) {
    var p = load("progress", {});
    return !!(p[lessonId] && p[lessonId].done);
  }

  /* ---------------- 章节浏览器 ---------------- */
  function renderBrowser() {
    browseRoot.innerHTML = "";
    var wrap = el("div", "chm-browse");
    wrap.appendChild(el("h1", "", "化学"));
    wrap.appendChild(el("p", "chm-browse-sub",
      "下标是身份证，系数是人数——配平绝不改下标。"));
    var list = el("ul", "chm-ch-list");
    readyChapters().forEach(function (c) {
      var ch = window.CHEM_CH[c.id];
      var n = 0;
      (ch.units || []).forEach(function (u) { n += (u.lessons || []).length; });
      var li = el("li", "");
      var btn = el("button", "chm-ch-btn", "");
      btn.type = "button";
      btn.innerHTML = '<span class="chm-ch-id">' + esc(c.id) + "</span>" +
        '<span class="chm-ch-title">' + esc(c.title) + "</span>" +
        '<span class="chm-ch-count">' + n + " 课</span>";
      (function (cid) {
        btn.addEventListener("click", function () { toggleChapter(li, cid); });
      })(c.id);
      li.appendChild(btn);
      var body = el("div", "chm-ch-body");
      body.style.display = "none";
      (ch.units || []).forEach(function (u) {
        body.appendChild(el("div", "chm-unit", esc(u.id) + " · " + esc(u.title)));
        var ll = el("ul", "chm-lesson-list");
        (u.lessons || []).forEach(function (l) {
          var li2 = el("li", "");
          var b2 = el("button", "chm-lesson-btn", "");
          b2.type = "button";
          b2.innerHTML = '<span class="chm-lesson-id">' + esc(l.id) + "</span>" +
            '<span class="chm-lesson-title">' + esc(l.title) + "</span>" +
            (isDone(l.id) ? '<span class="chm-done">✓ 已学</span>' : "") +
            '<span class="chm-lesson-go">›</span>';
          (function (lid) {
            b2.addEventListener("click", function () { goLesson(lid); });
          })(l.id);
          li2.appendChild(b2);
          ll.appendChild(li2);
        });
        body.appendChild(ll);
      });
      li.appendChild(body);
      list.appendChild(li);
    });
    wrap.appendChild(list);
    browseRoot.appendChild(wrap);
  }
  function toggleChapter(li, cid) {
    var body = li.querySelector(".chm-ch-body");
    if (!body) return;
    body.style.display = body.style.display === "none" ? "" : "none";
  }

  /* ---------------- 讲解页块渲染 ---------------- */
  function renderBlock(b, formulas) {
    if (b.type === "lead") return el("p", "chm-lead", esc(b.text));
    if (b.type === "text") {
      var t = el("p", "chm-text", b.html || "");
      hydrateFormulas(t, formulas);
      return t;
    }
    if (b.type === "trap") return el("div", "chm-trap", esc(b.text));
    if (b.type === "oldfriend") {
      var o = el("div", "chm-oldfriend", b.text || "");
      hydrateFormulas(o, formulas);
      return o;
    }
    if (b.type === "mathlink") return el("div", "chm-mathlink", esc(b.text));
    if (b.type === "slogan") return el("div", "chm-slogan", esc(b.text));
    if (b.type === "widget") {
      return renderWidget((b.widget || {}).type, (b.widget || {}).params);
    }
    return el("div", "", "");
  }

  /* ---------------- 练习题（判分口径：canonical + accept 全集） ---------------- */
  function renderQuestion(q) {
    if (q.type === "review") {
      var rv = el("div", "chm-q");
      rv.appendChild(el("div", "chm-q-stem", "📝 本课小结"));
      var rb = el("div", "chm-text", q.html || "");
      hydrateFormulas(rb, {});
      rv.appendChild(rb);
      return rv;
    }
    var box = el("div", "chm-q");
    var fb = el("div", "chm-q-fb", "");
    var wrong = 0;
    function say(ok, msg, showTip) {
      fb.innerHTML = (ok ? '<span class="ok">✓ 答对了</span> ' : '<span class="bad">✗ 不对</span> ') +
        esc(msg) + (showTip && q.tip ? '<br><span class="tip">💡 ' + esc(q.tip) + "</span>" : "");
      flash(box);
    }
    if (q.type === "choice") {
      box.appendChild(el("div", "chm-q-stem", esc(q.stem)));
      var opts = el("div", "chm-q-opts");
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
      var stem = el("div", "chm-q-stem", "");
      stem.innerHTML = esc(q.stemBefore || "") +
        ' <input type="text" inputmode="text" style="width:7em;display:inline-block;" aria-label="填空">' +
        " " + esc(q.stemAfter || "") +
        (q.hint ? ' <span style="color:var(--chm-ink-soft);font-size:0.82rem;">' + esc(q.hint) + "</span>" : "");
      box.appendChild(stem);
      var input = stem.querySelector("input");
      var btn = el("button", "chm-q-check", "检查");
      btn.type = "button";
      btn.addEventListener("click", function () {
        var v = norm(input.value);
        /* canonical + accept 全集：canonical 单独在 accept 里漏配时仍判对
         *（物理 R2 教训：kg/m³ canonical 被判错）。 */
        var candidates = [q.answer].concat(q.accept || []);
        var ok = candidates.some(function (a) { return norm(a) === v; });
        if (ok) say(true, "对了。", true);
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
   * C3 / Y1 / Y3 组件渲染器（蓝队 2026-10-15，试点 3 种）
   *
   * 忠实实现 docs/chemistry-interactions.md v1.1 spec：
   * - params 无具体色值（只用 --chm-* 语义名）；触控目标 ≥44px；
   * - 双编码（颜色+文字/形状）；读数走 MathML；零音频文件
   *   （Y1 语音走系统 speechSynthesis，特性检测 + 静默降级）；
   * - 反馈走 M6（视觉 flash 必选，震动可选）；
   * - 化学第一铁律双重执行：渲染器下标不可改（atoms 锁定自
   *   params，点下标只弹警告不改数据）+ 练习页判分器复测概念。
   * ============================================================ */

  /* 化学式解析："H₂O" → [{t:"el",v:"H"},{t:"sub",v:"2"},{t:"el",v:"O"}]
   * 下标用 Unicode 下标数字 ₀₁₂₃₄₅₆₇₈₉；暂不支持括号（试点无此需求）。 */
  var SUB_CHARS = "₀₁₂₃₄₅₆₇₈₉";
  function parseFormula(f) {
    var toks = [], i = 0, s = String(f || "");
    while (i < s.length) {
      var c = s[i];
      if (SUB_CHARS.indexOf(c) >= 0) {
        var sub = "";
        while (i < s.length && SUB_CHARS.indexOf(s[i]) >= 0) {
          sub += String(SUB_CHARS.indexOf(s[i])); i++;
        }
        toks.push({ t: "sub", v: sub });
      } else if (/[A-Z]/.test(c)) {
        var elem = c; i++;
        if (i < s.length && /[a-z]/.test(s[i])) { elem += s[i]; i++; }
        toks.push({ t: "el", v: elem });
      } else { i++; } /* 其他字符跳过（试点数据无） */
    }
    return toks;
  }
  function renderFormulaToks(formula, trapSubscript, onTrap) {
    var wrap = el("span", "chm-formula", "");
    wrap.setAttribute("aria-label", String(formula).replace(/[₀₁₂₃₄₅₆₇₈₉]/g, function (d) {
      return String(SUB_CHARS.indexOf(d));
    }));
    parseFormula(formula).forEach(function (tk) {
      if (tk.t === "el") {
        wrap.appendChild(el("span", "chm-base", esc(tk.v)));
      } else {
        if (trapSubscript) {
          var b = el("button", "chm-sub", esc(tk.v) + '<span class="chm-lock">🔒</span>');
          b.type = "button";
          b.setAttribute("aria-label", "下标 " + tk.v + "（不可更改，点击查看原因）");
          b.addEventListener("click", function () { onTrap(); });
          wrap.appendChild(b);
        } else {
          wrap.appendChild(el("span", "chm-sub-plain", esc(tk.v)));
        }
      }
    });
    return wrap;
  }

  /* ---------------- C3 · equation-balance ---------------- */
  function widgetEquationBalance(p) {
    p = p || {};
    var eq = p.equation || {};
    var reactants = eq.reactants || [], products = eq.products || [];
    var all = reactants.concat(products);
    var nR = reactants.length;
    var coeffMax = p.coeffMax || 9;
    var coeffs = (p.coeffInit || []).slice();
    while (coeffs.length < all.length) coeffs.push(1);
    coeffs = coeffs.slice(0, all.length).map(function (c) {
      c = parseInt(c, 10); return (isFinite(c) && c >= 1) ? Math.min(coeffMax, c) : 1;
    });
    var answer = p.answer || null;
    var relMass = p.relMass || {};

    var box = el("div", "chm-widget chm-eq", "");
    var warnSlot = el("div", "", "");
    warnSlot.style.minHeight = "0px";
    box.appendChild(warnSlot);

    var trapCount = 0;
    function onTrap() {
      trapCount++;
      warnSlot.innerHTML = "";
      /* S3：B5 定稿 trapText 自带 "⚠"，渲染器不再加前缀（否则 ⚠ 重复） */
      var w = el("div", "chm-state chm-state-bad", esc(p.trapText || "⚠ 下标不可更改。"));
      warnSlot.appendChild(w);
      flash(w); vib(30);
    }

    var eqLine = el("div", "chm-eq-line", "");
    box.appendChild(eqLine);
    var numNodes = [];
    var lastClick = 0;
    function buildEqLine() {
      eqLine.innerHTML = "";
      numNodes = [];
      all.forEach(function (sp, i) {
        if (i > 0) {
          if (i === nR) {
            /* 等号 + 反应条件（CHEM-R04：条件必须位于等号上方或下方，
               不许行内写在等号侧面混入反应物/生成物行） */
            var opWrap = el("span", "chm-eq-stack", "");
            if (eq.conditions) opWrap.appendChild(el("span", "chm-eq-cond", esc(eq.conditions)));
            opWrap.appendChild(el("span", "chm-eq-op", eq.reversible ? " ⇌ " : " ＝ "));
            eqLine.appendChild(opWrap);
          } else {
            eqLine.appendChild(el("span", "chm-eq-op", " ＋ "));
          }
        }
        var ctl = el("span", "chm-coeff-ctl", "");
        var minus = el("button", "chm-stepper", "−");
        minus.type = "button";
        minus.setAttribute("aria-label", "系数减 1");
        var num = el("span", "chm-coeff-num", String(coeffs[i]));
        var plus = el("button", "chm-stepper", "＋");
        plus.type = "button";
        plus.setAttribute("aria-label", "系数加 1");
        function step(d) {
          /* W-C2：300ms 防连击去重 */
          var now = Date.now();
          if (now - lastClick < 300) return;
          lastClick = now;
          var v = coeffs[i] + d;
          if (v < 1 || v > coeffMax) return;   /* 系数禁 0/禁负，上限 coeffMax */
          coeffs[i] = v;
          num.textContent = String(v);
          num.classList.remove("chm-coeff-flash");
          void num.offsetWidth;
          num.classList.add("chm-coeff-flash");
          vib(10);
          refresh();
        }
        minus.addEventListener("click", function () { step(-1); });
        plus.addEventListener("click", function () { step(1); });
        ctl.appendChild(minus); ctl.appendChild(num); ctl.appendChild(plus);
        eqLine.appendChild(ctl);
        eqLine.appendChild(renderFormulaToks(sp.formula, p.trapSubscript !== false, onTrap));
        numNodes.push(num);
      });
    }

    /* 原子计数表：atoms 锁定自 params，渲染器永不从下标反推 */
    var tableWrap = el("div", "", "");
    box.appendChild(tableWrap);
    function atomCounts() {
      var elems = [];
      function addElem(e) { if (elems.indexOf(e) < 0) elems.push(e); }
      all.forEach(function (sp) {
        Object.keys(sp.atoms || {}).forEach(addElem);
      });
      var left = {}, right = {};
      elems.forEach(function (e) { left[e] = 0; right[e] = 0; });
      reactants.forEach(function (sp, i) {
        Object.keys(sp.atoms || {}).forEach(function (e) {
          left[e] += coeffs[i] * sp.atoms[e];
        });
      });
      products.forEach(function (sp, i) {
        Object.keys(sp.atoms || {}).forEach(function (e) {
          right[e] += coeffs[nR + i] * sp.atoms[e];
        });
      });
      return { elems: elems, left: left, right: right };
    }
    function balanced(c) {
      return c.elems.every(function (e) { return c.left[e] === c.right[e]; });
    }
    function isMinimal() {
      if (!answer) return false;
      if (answer.length !== coeffs.length) return false;
      return answer.every(function (a, i) { return a === coeffs[i]; });
    }

    var statusBox = el("div", "chm-state", "调一下系数，让两边每种原子的个数相等。");
    box.appendChild(statusBox);

    /* 称量动画：SVG 天平（示意）；质量 = Σ 系数×原子数×相对质量 */
    var weighWrap = el("div", "chm-weigh", "");
    box.appendChild(weighWrap);
    function sideMass(list, off) {
      var m = 0;
      list.forEach(function (sp, i) {
        var per = 0;
        Object.keys(sp.atoms || {}).forEach(function (e) {
          per += sp.atoms[e] * (relMass[e] || 1);
        });
        m += coeffs[off + i] * per;
      });
      return m;
    }
    function renderWeigh(mL, mR, ok) {
      weighWrap.innerHTML = "";
      var svg = svgEl("svg", { viewBox: "0 0 100 46", role: "img",
        "aria-label": "天平示意：反应前总质量 " + mL + "，反应后总质量 " + mR });
      var maxM = Math.max(mL, mR, 1);
      var ang = -16 * (mL - mR) / maxM;   /* 左重 → 左端下沉（SVG y 向下，负角逆时针） */
      var g = svgEl("g", { transform: "rotate(" + ang.toFixed(1) + " 50 12)" });
      var beam = svgEl("line", { x1: "22", y1: "12", x2: "78", y2: "12",
        stroke: "var(--chm-ink)", "stroke-width": "1.2" });
      g.appendChild(beam);
      [[22, mL, "反应前"], [78, mR, "反应后"]].forEach(function (pan) {
        var x = pan[0];
        g.appendChild(svgEl("line", { x1: x, y1: "12", x2: x, y2: "24",
          stroke: "var(--chm-ink)", "stroke-width": "0.8" }));
        var tray = svgEl("path", { d: "M " + (x - 10) + " 24 L " + (x + 10) + " 24 L " +
          (x + 7) + " 30 L " + (x - 7) + " 30 Z",
          fill: "none", stroke: "var(--chm-ink)", "stroke-width": "0.8" });
        g.appendChild(tray);
        var t = svgEl("text", { x: x, y: "38", "text-anchor": "middle",
          "font-size": "4.6", fill: "var(--chm-ink)" });
        t.textContent = pan[2] + " " + pan[1];
        g.appendChild(t);
      });
      svg.appendChild(g);
      /* 支柱：细杆 + 顶端小三角 + 底座线（示意，不抢视觉） */
      var sup = svgEl("g", { stroke: "var(--chm-ink-soft, #888)", "stroke-width": "1" });
      sup.appendChild(svgEl("line", { x1: "50", y1: "44", x2: "50", y2: "18" }));
      sup.appendChild(svgEl("path", { d: "M 47.5 18 L 52.5 18 L 50 13.5 Z",
        fill: "var(--chm-ink-soft, #888)", stroke: "none" }));
      sup.appendChild(svgEl("line", { x1: "43", y1: "44", x2: "57", y2: "44",
        "stroke-width": "1.4" }));
      svg.appendChild(sup);
      weighWrap.appendChild(svg);
      var cap = el("div", "chm-weigh-cap",
        (ok ? "✓ 天平平衡：反应前后总质量相等——质量守恒"
            : "天平倾斜：两边总质量还不一样，继续调系数") +
        "（称的是密闭体系；相对质量为示意）");
      weighWrap.appendChild(cap);
    }

    function refresh() {
      var c = atomCounts();
      var ok = balanced(c);
      tableWrap.innerHTML = "";
      var tbl = el("table", "chm-count-table", "");
      var tr = el("tr", "", "<th>元素</th><th>反应物侧</th><th>生成物侧</th><th></th>");
      tbl.appendChild(tr);
      c.elems.forEach(function (e) {
        var same = c.left[e] === c.right[e];
        var row = el("tr", "",
          "<td>" + esc(e) + "</td>" +
          '<td class="chm-l">' + c.left[e] + "</td>" +
          '<td class="chm-r">' + c.right[e] + "</td>" +
          '<td class="' + (same ? "chm-eq-ok" : "") + '">' + (same ? "✓" : "✗") + "</td>");
        tbl.appendChild(row);
      });
      tableWrap.appendChild(tbl);
      statusBox.className = "chm-state" + (ok ? " chm-state-ok" : "");
      if (ok) {
        /* B1：任一正整数解都算配平成功；另给"最简整数比 ✓"徽章 */
        statusBox.textContent = isMinimal()
          ? "✓ 配平成功！最简整数比 ✓"
          : "✓ 配平成功！还能约成更小的整数比吗？试试看。";
        flash(statusBox);
      } else {
        statusBox.textContent = "调一下系数，让两边每种原子的个数相等。";
      }
      var mL = sideMass(reactants, 0), mR = sideMass(products, nR);
      if (p.showWeigh !== false) renderWeigh(mL, mR, ok);
      else weighWrap.style.display = "none";
    }

    buildEqLine();
    refresh();
    box.appendChild(el("div", "chm-note",
      "下标点一下试试？锁住的数字是物质的\"身份证号\"，只能调前面的系数。"));
    return box;
  }

  /* ---------------- Y1 · formula-read ---------------- */
  function widgetFormulaRead(p) {
    p = p || {};
    var segs = p.segments || [];
    var box = el("div", "chm-widget chm-read", "");
    var fline = el("div", "chm-read-formula", "");
    fline.setAttribute("role", "group");
    fline.setAttribute("aria-label", "化学式分段点读：" + (p.formula || ""));
    var gloss = el("div", "chm-read-gloss", "点一下化学式的每一段，慢读它的含义。");
    segs.forEach(function (sg, i) {
      var b = el("button", "chm-read-seg" + (sg.sub ? " chm-sub-seg" : ""), "");
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      b.setAttribute("aria-label", "点读：" + (sg.label || ""));
      /* 分段用 MathML 渲染（不支持时降级纯文本）；每段独立可点 */
      if (sg.mathml && mathmlOK()) b.innerHTML = sg.mathml;
      else b.textContent = sg.fallback || sg.label || "";
      b.addEventListener("click", function () {
        segs.forEach(function (_, j) {
          var other = fline.children[j];
          if (other) other.setAttribute("aria-pressed", j === i ? "true" : "false");
        });
        var tag = sg.level === "micro" ? "微观" : "宏观";
        gloss.className = "chm-read-gloss" + (sg.level === "micro" ? " micro" : "");
        gloss.innerHTML = '<span class="chm-level-tag">' + tag + "</span>" + esc(sg.gloss || "");
        flash(gloss); vib(10);
        /* 记录键冻结格式 chm_read_<课号>（§15 B10） */
        if (p.recordKey) store(p.recordKey, { seg: sg.label || "", ts: Date.now() });
      });
      fline.appendChild(b);
    });
    box.appendChild(fline);
    box.appendChild(gloss);
    /* 朗读：系统 speechSynthesis；特性检测，不支持/被禁则静默降级（W-C16） */
    var bar = el("div", "chm-read-bar", "");
    var canSpeak = false;
    try {
      canSpeak = ("speechSynthesis" in window) && !!window.speechSynthesis;
    } catch (e) { canSpeak = false; }
    if (canSpeak && segs.length) {
      var spk = el("button", "chm-q-check", "🔊 朗读当前段");
      spk.type = "button";
      spk.addEventListener("click", function () {
        var cur2 = null;
        for (var i = 0; i < segs.length; i++) {
          if (fline.children[i] &&
              fline.children[i].getAttribute("aria-pressed") === "true") { cur2 = segs[i]; break; }
        }
        var text = cur2 ? (cur2.gloss || "") : segs[0].gloss;
        try {
          window.speechSynthesis.cancel();
          var u = new SpeechSynthesisUtterance(text);
          u.lang = "zh-CN";
          window.speechSynthesis.speak(u);
        } catch (e) { /* 静默降级：不报错 */ }
      });
      bar.appendChild(spk);
      bar.appendChild(el("div", "chm-note", "语音为系统合成，仅辅助；以文字为准。"));
    }
    if (bar.children.length) box.appendChild(bar);
    return box;
  }

  /* ---------------- Y3 · balance-replay ---------------- */
  function widgetBalanceReplay(p) {
    p = p || {};
    var eq = p.equation || {};
    var reactants = eq.reactants || [], products = eq.products || [];
    var all = reactants.concat(products);
    var nR = reactants.length;
    var steps = p.steps || [];
    var idx = 0, playing = false, timer = null;

    var box = el("div", "chm-widget chm-replay", "");
    var stage = el("div", "chm-replay-stage", "");
    var eqLine = el("div", "chm-replay-eq", "");
    var countLine = el("div", "chm-replay-count", "");
    var caption = el("div", "chm-replay-caption", "");
    var stepTag = el("div", "chm-replay-step", "");
    stage.appendChild(stepTag);
    stage.appendChild(eqLine);
    stage.appendChild(countLine);
    stage.appendChild(caption);
    box.appendChild(stage);

    /* 微观示意演示（最后一步展开；B4 声明常驻） */
    var microBox = el("div", "chm-micro", "");
    microBox.style.display = "none";
    box.appendChild(microBox);
    var microFrame = 0;
    var MICRO = [
      { label: "反应物", cap: "反应前：2 个 H₂ 分子 + 1 个 O₂ 分子（原子都没少）" },
      { label: "拆开", cap: "拆开看：4 个 H 原子 + 2 个 O 原子——分子拆了，原子没变" },
      { label: "重组后", cap: "重组后：2 个 H₂O 分子——原子种类、个数都不变 ✓" }
    ];
    function ball(svg, cx, cy, r, fill, label, labelFill) {
      var c = svgEl("circle", { cx: cx, cy: cy, r: r, fill: fill,
        stroke: "#00000055", "stroke-width": "0.6" });
      svg.appendChild(c);
      var t = svgEl("text", { x: cx, y: cy + r * 0.36, "text-anchor": "middle",
        "font-size": r * 0.95, "font-weight": "700", fill: labelFill });
      t.textContent = label;
      svg.appendChild(t);
    }
    function renderMicro() {
      microBox.innerHTML = "";
      var svg = svgEl("svg", { viewBox: "0 0 100 58", role: "img",
        "aria-label": "原子重组示意：" + MICRO[microFrame].cap });
      var H = "#E4E4E4", O = "#D43A2F";
      if (microFrame === 0) {
        /* 2×H₂（左） + 1×O₂（右） */
        ball(svg, 18, 29, 7, H, "H", "#333"); ball(svg, 31, 29, 7, H, "H", "#333");
        ball(svg, 18, 44, 7, H, "H", "#333"); ball(svg, 31, 44, 7, H, "H", "#333");
        ball(svg, 66, 36, 9, O, "O", "#fff"); ball(svg, 82, 36, 9, O, "O", "#fff");
      } else if (microFrame === 1) {
        ball(svg, 14, 20, 7, H, "H", "#333"); ball(svg, 34, 16, 7, H, "H", "#333");
        ball(svg, 14, 44, 7, H, "H", "#333"); ball(svg, 36, 46, 7, H, "H", "#333");
        ball(svg, 66, 24, 9, O, "O", "#fff"); ball(svg, 80, 44, 9, O, "O", "#fff");
      } else {
        /* 2×H₂O：O 居中，2 H 在旁 */
        ball(svg, 28, 29, 9, O, "O", "#fff");
        ball(svg, 14, 20, 7, H, "H", "#333"); ball(svg, 14, 40, 7, H, "H", "#333");
        ball(svg, 72, 29, 9, O, "O", "#fff");
        ball(svg, 58, 20, 7, H, "H", "#333"); ball(svg, 58, 40, 7, H, "H", "#333");
      }
      microBox.appendChild(svg);
      var fr = el("div", "chm-micro-frames", "");
      MICRO.forEach(function (m, i) {
        var b = el("button", "", m.label);
        b.type = "button";
        b.setAttribute("aria-pressed", i === microFrame ? "true" : "false");
        b.addEventListener("click", function () { microFrame = i; renderMicro(); });
        fr.appendChild(b);
      });
      microBox.appendChild(fr);
      microBox.appendChild(el("div", "chm-micro-cap", MICRO[microFrame].cap));
      /* B4 定稿文案（§15 B4 占位句冻结版）：示意声明常驻 */
      microBox.appendChild(el("div", "chm-note",
        "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。"));
    }

    function snapCounts(snap) {
      var parts = [];
      var elems = [];
      all.forEach(function (sp) {
        Object.keys(sp.atoms || {}).forEach(function (e) {
          if (elems.indexOf(e) < 0) elems.push(e);
        });
      });
      elems.forEach(function (e) {
        var l = 0, r = 0;
        reactants.forEach(function (sp, i) { l += snap[i] * (sp.atoms[e] || 0); });
        products.forEach(function (sp, i) { r += snap[nR + i] * (sp.atoms[e] || 0); });
        parts.push(e + "：左 " + l + " / 右 " + r + (l === r ? " ✓" : ""));
      });
      return parts.join("　");
    }
    function renderStep() {
      var st = steps[idx] || {};
      var snap = (st.coeffSnapshot || []).slice();
      while (snap.length < all.length) snap.push(1);
      stepTag.textContent = "第 " + (idx + 1) + " 步 / 共 " + steps.length + " 步" +
        (p.method ? " · " + ({ lcm: "最小公倍数法", observe: "观察法", "odd-even": "奇偶法" }[p.method] || p.method) : "");
      eqLine.innerHTML = "";
      all.forEach(function (sp, i) {
        if (i > 0) {
          if (i === nR) {
            /* CHEM-R04：条件位于等号上方，不许写在方程式行末混入生成物行 */
            var opWrap = el("span", "chm-eq-stack", "");
            if (eq.conditions) opWrap.appendChild(el("span", "chm-eq-cond", esc(eq.conditions)));
            opWrap.appendChild(el("span", "chm-eq-op", " ＝ "));
            eqLine.appendChild(opWrap);
          } else {
            eqLine.appendChild(el("span", "chm-eq-op", " ＋ "));
          }
        }
        var c = el("span", "", String(snap[i]));
        if ((st.highlight || []).indexOf(i) >= 0) c.className = "chm-replay-hl";
        else { c.style.color = "var(--chm-target)"; c.style.fontWeight = "700"; }
        eqLine.appendChild(c);
        eqLine.appendChild(renderFormulaToks(sp.formula, false, function () {}));
      });
      countLine.textContent = snapCounts(snap);
      caption.textContent = st.caption || "";
      var last = idx === steps.length - 1;
      microBox.style.display = last ? "" : "none";
      if (last) renderMicro();
      playBtn.textContent = playing ? "⏸" : "▶";
      playBtn.setAttribute("aria-label", playing ? "暂停回放" : "播放回放");
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === steps.length - 1;
    }
    function stop() {
      playing = false;
      if (timer) { clearInterval(timer); timer = null; }
      renderStep();
    }
    var bar = el("div", "chm-playbar", "");
    var prevBtn = el("button", "", "‹");
    prevBtn.type = "button"; prevBtn.setAttribute("aria-label", "上一步");
    prevBtn.addEventListener("click", function () {
      stop(); if (idx > 0) { idx--; renderStep(); }
    });
    var playBtn = el("button", "", "▶");
    playBtn.type = "button"; playBtn.setAttribute("aria-label", "播放回放");
    playBtn.addEventListener("click", function () {
      if (playing) { stop(); return; }
      if (idx >= steps.length - 1) idx = 0;
      playing = true;
      renderStep();
      timer = setInterval(function () {
        if (idx < steps.length - 1) { idx++; renderStep(); }
        else stop();
      }, 3200);
    });
    var reBtn = el("button", "", "↺");
    reBtn.type = "button"; reBtn.setAttribute("aria-label", "从头回放");
    reBtn.addEventListener("click", function () { stop(); idx = 0; microFrame = 0; renderStep(); });
    var nextBtn = el("button", "", "›");
    nextBtn.type = "button"; nextBtn.setAttribute("aria-label", "下一步");
    nextBtn.addEventListener("click", function () {
      stop(); if (idx < steps.length - 1) { idx++; renderStep(); }
    });
    bar.appendChild(prevBtn); bar.appendChild(playBtn);
    bar.appendChild(reBtn); bar.appendChild(nextBtn);
    bar.appendChild(el("div", "chm-note", "慢放看思路：每一步只动一个地方。"));
    box.appendChild(bar);
    renderStep();
    return box;
  }

  /* ---------------- 组件注册表 ---------------- */
  var WIDGETS = {
    "equation-balance": widgetEquationBalance,
    "formula-read": widgetFormulaRead,
    "balance-replay": widgetBalanceReplay
  };
  function renderWidget(type, params) {
    var fn = WIDGETS[type];
    if (!fn) {
      if (typeof console !== "undefined" && console.warn)
        console.warn("[chemistry] 未知组件类型：" + type);
      return el("div", "chm-unknown", "未支持的组件：" + type);
    }
    var node = fn(params || {});
    /* 安全徽章（沿用物理 W-P20 约定）：params.safety 给话术
     *（"虚拟/现实"对比句式，黄队定稿），常驻交互区顶部 */
    if (params && params.safety) {
      var wrap = el("div", "chm-widget");
      wrap.appendChild(el("div", "chm-state chm-state-warn", "⚠ " + params.safety));
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
    var zone = el("div", "chm-zone");
    if (page.kind === "interact") {
      if (page.exploreTip) zone.appendChild(el("div", "chm-tip", "🖐 " + esc(page.exploreTip)));
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

    var head = el("header", "chm-head");
    /* 目录抽屉入口：☰ + "目录"文字，≥44px，aria-expanded 同步 */
    var menuBtn = el("button", "chm-menu-btn", "☰ 目录");
    menuBtn.type = "button";
    menuBtn.setAttribute("aria-label", "打开目录");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.addEventListener("click", function () {
      if (drawerOpen) closeDrawer(); else openDrawer();
    });
    head.appendChild(menuBtn);
    drawerBtn = menuBtn;
    var back = el("button", "chm-back", "← 返回");
    back.type = "button";
    back.setAttribute("aria-label", "返回章节浏览");
    back.addEventListener("click", function () { showBrowser(); });
    head.appendChild(back);
    head.appendChild(el("h1", "", esc(found.lesson.title)));
    head.appendChild(el("span", "chm-page-tag",
      pageKindLabel(page.kind) + " " + (cur.pageIdx + 1) + "/" + pages.length));
    appRoot.appendChild(head);

    appRoot.appendChild(el("div", "chm-crumb",
      esc(found.chapter.id) + " · " + esc(found.unit.title) + " · " + esc(found.lesson.id)));

    var main = el("main", "chm-main");
    main.appendChild(el("h2", "chm-title", esc(page.title)));
    curPageId = found.lesson.id + "-p" + (cur.pageIdx + 1);
    var zone = renderZone(page, formulas);
    var zoneWrap = el("div", "chm-zone-wrap");
    zoneWrap.appendChild(zone);
    var more = el("button", "chm-more", "");
    more.type = "button";
    more.innerHTML =
      '<span class="chm-more-pill"><span>↓ 下面还有</span>' +
      '<span class="arr">↓</span></span>';
    more.setAttribute("aria-label", "滚动到底部操作区");
    more.addEventListener("click", function () {
      try { zone.scrollTo({ top: zone.scrollHeight, behavior: "smooth" }); }
      catch (e) { zone.scrollTop = zone.scrollHeight; }
    });
    zoneWrap.appendChild(more);
    main.appendChild(zoneWrap);
    if (page.point) {
      main.appendChild(el("p", "chm-point" + (page.pointScroll ? " scroll" : ""),
        "💡 " + esc(page.point)));
    }
    appRoot.appendChild(main);

    var pager = el("nav", "chm-pager");
    var prev = el("button", "", "← 上一页");
    var next = el("button", "chm-next", cur.pageIdx === pages.length - 1 ? "完成 ✓" : "下一页 →");
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

  /* ---------------- 路由（hash：#课号/页码） ---------------- */
  function parseHash() {
    var h = location.hash || "";
    var m = h.match(/^#(cm\d+\.\d+\.\d+)(?:\/(\d+))?$/);
    if (m) return { lesson: m[1], page: m[2] ? parseInt(m[2], 10) - 1 : 0 };
    var m2 = h.match(/[#&?]chm=([a-z0-9.]+)/i);
    if (m2) return { lesson: m2[1], page: 0, legacy: true }; /* 旧 hash 兼容：进第 1 页 */
    return null;
  }
  /* 每课页码持久化 `ltb-chm-page-<课号>`；file:// 下降级为内存（不报错） */
  var pageMem = {};
  function savePage(lessonId, pageIdx) {
    try { localStorage.setItem("ltb-chm-page-" + lessonId, String(pageIdx)); }
    catch (e) { pageMem[lessonId] = pageIdx; }
  }
  function loadPage(lessonId) {
    try {
      var v = parseInt(localStorage.getItem("ltb-chm-page-" + lessonId), 10);
      return isFinite(v) && v >= 0 ? v : 0;
    } catch (e) { return pageMem[lessonId] || 0; }
  }
  function markVisited(lessonId) {
    try {
      var v = load("visited", {});
      if (!v[lessonId]) { v[lessonId] = { ts: Date.now() }; store("visited", v); }
    } catch (e) {}
  }
  function lessonDone(lessonId) {
    var p = load("progress", {});
    return !!(p[lessonId] && p[lessonId].done);
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

  /* ---------------- 目录抽屉（附表 D 规格） ---------------- */
  var drawer = null, drawerMask = null, drawerBtn = null;
  var drawerOpen = false, drawerAnim = false, lastFocus = null, drawerBuilt = false;
  function buildDrawer() {
    if (drawerBuilt) return;
    drawerBuilt = true;
    drawerMask = el("div", "chm-drawer-mask");
    drawerMask.addEventListener("click", closeDrawer);
    drawer = el("div", "chm-drawer");
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
    var head = el("div", "chm-drawer-head");
    if (cur && cur.found) {
      head.appendChild(el("div", "chm-drawer-ch", esc(cur.found.chapter.title)));
      head.appendChild(el("div", "chm-drawer-page",
        "第 " + (cur.pageIdx + 1) + " 页 / 共 " + (cur.found.lesson.pages || []).length + " 页"));
    } else {
      head.appendChild(el("div", "chm-drawer-ch", "目录"));
    }
    var close = el("button", "chm-drawer-close", "✕");
    close.type = "button";
    close.setAttribute("aria-label", "关闭目录");
    close.addEventListener("click", closeDrawer);
    head.appendChild(close);
    drawer.appendChild(head);
    var list = el("div", "chm-drawer-list");
    var visited = load("visited", {});
    var curLessonBtn = null, curChBox = null;
    readyChapters().forEach(function (c) {
      var ch = window.CHEM_CH[c.id];
      if (!ch) return;
      var chBox = el("div", "chm-drawer-chbox");
      var isCur = c.id === curChId;
      var chBtn = el("button", "chm-drawer-chbtn", "");
      chBtn.type = "button";
      chBtn.innerHTML = "<span>" + esc(c.id) + " · " + esc(c.title) + "</span>" +
        '<span class="chm-drawer-arrow">' + (isCur ? "▾" : "▸") + "</span>";
      chBtn.setAttribute("aria-expanded", isCur ? "true" : "false");
      var lessonsBox = el("div", "chm-drawer-lessons");
      lessonsBox.style.display = isCur ? "" : "none";
      (function (cb, lb, ab) {
        cb.addEventListener("click", function () {
          var open = lb.style.display !== "none";
          lb.style.display = open ? "none" : "";
          cb.setAttribute("aria-expanded", open ? "false" : "true");
          ab.textContent = open ? "▸" : "▾";
        });
      })(chBtn, lessonsBox, chBtn.querySelector(".chm-drawer-arrow"));
      chBox.appendChild(chBtn);
      (ch.units || []).forEach(function (u) {
        (u.lessons || []).forEach(function (l) {
          var lb = el("button", "chm-drawer-lesson", "");
          lb.type = "button";
          var isCurL = l.id === curId;
          /* 三编码：背景高亮 + 左侧 4px 指示条 + "当前"文字徽章；
           * 状态点：当前课实心圆 / 已访问空心圆 */
          var mark = isCurL ? '<span class="chm-dot-cur" aria-hidden="true"></span>'
            : visited[l.id] ? '<span class="chm-dot-seen" aria-hidden="true"></span>' : "";
          lb.innerHTML = mark + '<span class="chm-drawer-lt">' + esc(l.title) + "</span>" +
            (isCurL ? '<span class="chm-drawer-cur">当前</span>' : "");
          if (isCurL) { lb.classList.add("chm-drawer-cur-lesson"); curLessonBtn = lb; }
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
    var foot = el("div", "chm-drawer-foot");
    var home = el("button", "chm-mini", "← 课程首页");
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
    drawer.classList.add("chm-drawer-anim");
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
    browseRoot = document.getElementById("chm-browser");
    appRoot = document.getElementById("chm-app");
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

  window.CHEM = {
    hasLesson: hasLesson,
    open: openLesson,
    close: function () { cur = null; },
    /* 阶段三批量生产用：渲染单个组件（冒烟/调试）；types 与校验清单同步 */
    widget: renderWidget,
    types: CHEMISTRY_INTERACTION_TYPES
  };
})();
