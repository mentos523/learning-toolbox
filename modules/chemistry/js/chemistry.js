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
    "equation-balance", "formula-read", "balance-replay",
    "particle-view", "molecule-build", "periodic-explore", "lab-assemble",
    "solution-mix", "reaction-particle", "ph-scale", "rate-equilibrium",
    "redox-track", "safety-badge", "ion-split", "tri-rep",
    "read-gauge-chem", "stoich-steps", "safety-quiz", "side-compare"
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

    /* C3 redox 模式（蓝队 2026-10-15 追加）：mode:"redox" 时在原子计数表下
     * 加第二检查行"得失电子守恒"（interactions.md C3 spec；CHEM-R57）。
     * params.redox = { lose:{sp:"H₂",per:2}, gain:{sp:"CuO",per:2} }：
     * sp 为方程式中某物种的 formula（按字符串匹配 all[]），per 为该物种
     * 每式量得失电子数。失电子总数 = lose.per × 还原剂系数；
     * 得电子总数 = gain.per × 氧化剂系数。两行（原子行 + 电子行）全 ✓
     * 才算配平成功。normal 模式：redoxCfg 为 null，okAll 恒等于 ok，
     * 本分支零介入，现有行为不变。 */
    var redoxCfg = (p.mode === "redox" && p.redox) ? p.redox : null;
    function redoxSpeciesIndex(formula) {
      for (var ri = 0; ri < all.length; ri++) {
        if (all[ri].formula === formula) return ri;
      }
      return -1;
    }
    function redoxTotals() {
      var lose = (redoxCfg && redoxCfg.lose) || {};
      var gain = (redoxCfg && redoxCfg.gain) || {};
      var li = redoxSpeciesIndex(lose.sp), gi = redoxSpeciesIndex(gain.sp);
      /* 数据问题时失败闭合：不谎报电子守恒（CHEM-R57：不等却判成功 = FAIL） */
      if (li < 0 || gi < 0) return { ok: false, lost: 0, gained: 0, badData: true };
      var lost = (parseInt(lose.per, 10) || 0) * coeffs[li];
      var gained = (parseInt(gain.per, 10) || 0) * coeffs[gi];
      return { ok: lost === gained, lost: lost, gained: gained, badData: false };
    }
    function renderRedoxRow(rt) {
      var txt;
      if (rt.badData) {
        txt = "⚠ redox 参数中的物种名与方程式对不上，电子行无法校验（数据问题）。";
      } else if (rt.ok) {
        txt = "✓ 得失电子守恒：得电子总数 ＝ 失电子总数 ＝ " + rt.gained + " e⁻";
      } else {
        txt = "✗ 电子还不守恒：得电子总数 " + rt.gained + " e⁻ ≠ 失电子总数 " +
          rt.lost + " e⁻ —— 继续调系数。";
      }
      /* 双编码：✓/✗ + 文字 + 数字，不只靠颜色；复用 chm-state 语义样式 */
      return el("div", "chm-state" + (rt.ok ? " chm-state-ok" : ""), esc(txt));
    }

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
      /* redox 第二检查行：原子表之后追加电子得失行（normal 模式不执行） */
      var redoxOk = true;
      if (redoxCfg) {
        var rt = redoxTotals();
        redoxOk = rt.ok;
        tableWrap.appendChild(renderRedoxRow(rt));
      }
      var okAll = ok && redoxOk;   /* redox 模式：两行全 ✓ 才算成功；normal 模式 okAll === ok */
      statusBox.className = "chm-state" + (okAll ? " chm-state-ok" : "");
      if (okAll) {
        /* B1：任一正整数解都算配平成功；另给"最简整数比 ✓"徽章 */
        statusBox.textContent = isMinimal()
          ? "✓ 配平成功！最简整数比 ✓"
          : "✓ 配平成功！还能约成更小的整数比吗？试试看。";
        flash(statusBox);
      } else if (ok && redoxCfg && !redoxOk) {
        /* redox 模式中间态：原子行已 ✓，电子行还差——继续调系数 */
        statusBox.textContent = "原子已配平 ✓，但得失电子还不相等——继续调系数，让电子也守恒。";
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

/* ============================================================
 * 化学 · 阶段三引擎补齐（蓝队 2026-10-15）
 *
 * 本段追加实现 16 种缺失组件渲染器（差集实测）：
 * C1 particle-view / C2 molecule-build / C4 periodic-explore /
 * C5 lab-assemble / C6 solution-mix / C7 reaction-particle /
 * C8 ph-scale / C9 rate-equilibrium / C10 redox-track /
 * Y2 safety-badge / Y4 ion-split / Y6 tri-rep /
 * Y10 read-gauge-chem / Y12 stoich-steps / Y13 safety-quiz /
 * Y11 side-compare（类型名 "side-compare"，复用物理 Y5 范式）。
 *
 * 全部遵守：纯 DOM/SVG/Canvas 2D、零依赖、一屏、触控 ≥44px；
 * params 零色值（只用 --chm-* 语义名）；双编码（颜色+文字）；
 * 读数走 MathML；反馈走 M6（flash 必选、震动可选）。
 * ============================================================ */

/* ---------------- 冻结数据表（蓝队建表） ---------------- */

/* B6 原子球颜色惯例表（教科书惯例简化版）：{bg 背景, fg 球上文字色}。
 * 每个球必配元素符号文字（双编码），params 不暴露色值。 */
var ATOM_STYLE = {
  H:  { bg: "#E4E4E4", fg: "#1A1A1A" }, He: { bg: "#D9FFFF", fg: "#1A1A1A" },
  Li: { bg: "#CC80FF", fg: "#1A1A1A" }, Be: { bg: "#C2FF00", fg: "#1A1A1A" },
  B:  { bg: "#FFB5B5", fg: "#1A1A1A" }, C:  { bg: "#3A3A3A", fg: "#FFFFFF" },
  N:  { bg: "#3050F8", fg: "#FFFFFF" }, O:  { bg: "#D43A2F", fg: "#FFFFFF" },
  F:  { bg: "#90E050", fg: "#1A1A1A" }, Ne: { bg: "#B3E3F5", fg: "#1A1A1A" },
  Na: { bg: "#AB5CF2", fg: "#FFFFFF" }, Mg: { bg: "#8AFF00", fg: "#1A1A1A" },
  Al: { bg: "#BFA6A6", fg: "#1A1A1A" }, Si: { bg: "#F0C8A0", fg: "#1A1A1A" },
  P:  { bg: "#FF8000", fg: "#1A1A1A" }, S:  { bg: "#E8C832", fg: "#1A1A1A" },
  Cl: { bg: "#2CA02C", fg: "#FFFFFF" }, Ar: { bg: "#80D1C3", fg: "#1A1A1A" },
  K:  { bg: "#8F40D4", fg: "#FFFFFF" }, Ca: { bg: "#3DFF00", fg: "#1A1A1A" },
  Fe: { bg: "#E06633", fg: "#FFFFFF" }, Cu: { bg: "#C88033", fg: "#FFFFFF" },
  Zn: { bg: "#7D80B0", fg: "#FFFFFF" }, Ag: { bg: "#C0C0C0", fg: "#1A1A1A" },
  I:  { bg: "#940094", fg: "#FFFFFF" }, Ba: { bg: "#00C900", fg: "#1A1A1A" }
};
function atomStyle(elem) {
  return ATOM_STYLE[elem] || { bg: "#9E9E9E", fg: "#FFFFFF" };
}

/* B8 pH 试纸标准比色卡（0–14 档，构建时内嵌；params.paperColors 可整体覆盖）。
 * 教学示意比色卡，深色模式可辨性按 W-C4 验收。 */
var PH_COLORS = {
  0: "#C1272D", 1: "#E01B22", 2: "#F15A24", 3: "#F7941E",
  4: "#FBB040", 5: "#FFF200", 6: "#D7DF23", 7: "#8CC63F",
  8: "#39B54A", 9: "#00A651", 10: "#00AEEF", 11: "#2B3990",
  12: "#662D91", 13: "#92278F", 14: "#A24CA8"
};

/* B11 元素数据表（1–36 号，六字段冻结：符号/中文名/质子数/
 * 核外电子排布（简化）/相对原子质量/金属非金属分区）。
 * 相对原子质量取人教版教科书常用值；21–36 号排布为简化示意
 * （能级交错），渲染器配"简化示意"声明（CHEM-R50）。
 * metal: "金" 金属 / "非" 非金属 / "类" 类金属。 */
var CHEM_ELEMENTS = [
  { s: "H",  n: "氢",   z: 1,  cfg: [1],          m: 1,    metal: "非" },
  { s: "He", n: "氦",   z: 2,  cfg: [2],          m: 4,    metal: "非" },
  { s: "Li", n: "锂",   z: 3,  cfg: [2, 1],       m: 7,    metal: "金" },
  { s: "Be", n: "铍",   z: 4,  cfg: [2, 2],       m: 9,    metal: "金" },
  { s: "B",  n: "硼",   z: 5,  cfg: [2, 3],       m: 11,   metal: "类" },
  { s: "C",  n: "碳",   z: 6,  cfg: [2, 4],       m: 12,   metal: "非" },
  { s: "N",  n: "氮",   z: 7,  cfg: [2, 5],       m: 14,   metal: "非" },
  { s: "O",  n: "氧",   z: 8,  cfg: [2, 6],       m: 16,   metal: "非" },
  { s: "F",  n: "氟",   z: 9,  cfg: [2, 7],       m: 19,   metal: "非" },
  { s: "Ne", n: "氖",   z: 10, cfg: [2, 8],       m: 20,   metal: "非" },
  { s: "Na", n: "钠",   z: 11, cfg: [2, 8, 1],    m: 23,   metal: "金" },
  { s: "Mg", n: "镁",   z: 12, cfg: [2, 8, 2],    m: 24,   metal: "金" },
  { s: "Al", n: "铝",   z: 13, cfg: [2, 8, 3],    m: 27,   metal: "金" },
  { s: "Si", n: "硅",   z: 14, cfg: [2, 8, 4],    m: 28,   metal: "类" },
  { s: "P",  n: "磷",   z: 15, cfg: [2, 8, 5],    m: 31,   metal: "非" },
  { s: "S",  n: "硫",   z: 16, cfg: [2, 8, 6],    m: 32,   metal: "非" },
  { s: "Cl", n: "氯",   z: 17, cfg: [2, 8, 7],    m: 35.5, metal: "非" },
  { s: "Ar", n: "氩",   z: 18, cfg: [2, 8, 8],    m: 40,   metal: "非" },
  { s: "K",  n: "钾",   z: 19, cfg: [2, 8, 8, 1], m: 39,   metal: "金" },
  { s: "Ca", n: "钙",   z: 20, cfg: [2, 8, 8, 2], m: 40,   metal: "金" },
  { s: "Sc", n: "钪",   z: 21, cfg: [2, 8, 9, 2], m: 45,   metal: "金" },
  { s: "Ti", n: "钛",   z: 22, cfg: [2, 8, 10, 2], m: 48,  metal: "金" },
  { s: "V",  n: "钒",   z: 23, cfg: [2, 8, 11, 2], m: 51,  metal: "金" },
  { s: "Cr", n: "铬",   z: 24, cfg: [2, 8, 13, 1], m: 52,  metal: "金" },
  { s: "Mn", n: "锰",   z: 25, cfg: [2, 8, 13, 2], m: 55,  metal: "金" },
  { s: "Fe", n: "铁",   z: 26, cfg: [2, 8, 14, 2], m: 56,  metal: "金" },
  { s: "Co", n: "钴",   z: 27, cfg: [2, 8, 15, 2], m: 59,  metal: "金" },
  { s: "Ni", n: "镍",   z: 28, cfg: [2, 8, 16, 2], m: 59,  metal: "金" },
  { s: "Cu", n: "铜",   z: 29, cfg: [2, 8, 18, 1], m: 64,  metal: "金" },
  { s: "Zn", n: "锌",   z: 30, cfg: [2, 8, 18, 2], m: 65,  metal: "金" },
  { s: "Ga", n: "镓",   z: 31, cfg: [2, 8, 18, 3], m: 70,  metal: "金" },
  { s: "Ge", n: "锗",   z: 32, cfg: [2, 8, 18, 4], m: 73,  metal: "类" },
  { s: "As", n: "砷",   z: 33, cfg: [2, 8, 18, 5], m: 75,  metal: "类" },
  { s: "Se", n: "硒",   z: 34, cfg: [2, 8, 18, 6], m: 79,  metal: "非" },
  { s: "Br", n: "溴",   z: 35, cfg: [2, 8, 18, 7], m: 80,  metal: "非" },
  { s: "Kr", n: "氪",   z: 36, cfg: [2, 8, 18, 8], m: 84,  metal: "非" }
];
window.CHEMISTRY_ELEMENTS = CHEM_ELEMENTS;  /* B11：派生分离，独立小表 */
function chemElement(z) {
  for (var i = 0; i < CHEM_ELEMENTS.length; i++)
    if (CHEM_ELEMENTS[i].z === z) return CHEM_ELEMENTS[i];
  return null;
}

/* ---------------- 化学式全解析（含括号/结晶水点号） ----------------
 * "Ba(OH)₂" → {Ba:1,O:2,H:2}；"CuSO₄·5H₂O" → {Cu:1,S:1,O:9,H:10}。
 * 计数器/离子解析共用；渲染器永不从下标反推 atoms（铁律⑥）。 */
function countAtoms(label) {
  var counts = {};
  function add(map, mul) {
    for (var e in map) counts[e] = (counts[e] || 0) + map[e] * mul;
  }
  String(label || "").split(/[·.]/).forEach(function (part) {
    var mm = part.match(/^(\d+)/), mul = 1;
    if (mm) { mul = parseInt(mm[1], 10); part = part.slice(mm[0].length); }
    var stack = [{}], i = 0;
    function readNum() {
      var n = "";
      while (i < part.length && /[0-9]/.test(part[i])) { n += part[i]; i++; }
      var n2 = "";
      while (i < part.length && SUB_CHARS.indexOf(part[i]) >= 0) {
        n2 += SUB_CHARS.indexOf(part[i]); i++;
      }
      return parseInt(n || n2 || "1", 10);
    }
    while (i < part.length) {
      var c = part[i];
      if (c === "(") { stack.push({}); i++; }
      else if (c === ")") {
        i++; var n = readNum(), top = stack.pop(), cur = stack[stack.length - 1];
        for (var e in top) cur[e] = (cur[e] || 0) + top[e] * n;
      } else if (/[A-Z]/.test(c)) {
        var elem = c; i++;
        if (i < part.length && /[a-z]/.test(part[i])) { elem += part[i]; i++; }
        var cnt = readNum(), cur2 = stack[stack.length - 1];
        cur2[elem] = (cur2[elem] || 0) + cnt;
      } else { i++; }
    }
    add(stack[0], mul);
  });
  return counts;
}
/* 从化学式标签取首个元素符号（如 "SO₄" → "S"） */
function firstElement(label) {
  var m = String(label || "").match(/[A-Z][a-z]?/);
  return m ? m[0] : "?";
}
/* 离子电荷格式化（CHEM-R14：电荷数在前、正负号在后）：
 * "+1"→"⁺"、"−1"→"⁻"、"+2"→"²⁺"、"−2"→"²⁻" */
var SUP_NUM = { "0": "⁰", "1": "¹", "2": "²", "3": "³", "4": "⁴", "5": "⁵" };
function fmtCharge(ch) {
  if (!ch) return "";
  var m = String(ch).replace(/＋/g, "+").replace(/－/g, "−").replace(/-/g, "−")
    .match(/^([+−])(\d*)$/);
  if (!m) return "";
  var sign = m[1] === "+" ? "⁺" : "⁻";
  var num = m[2] === "" || m[2] === "1" ? "" :
    String(m[2]).split("").map(function (d) { return SUP_NUM[d] || ""; }).join("");
  return num + sign;
}
function chargeSign(ch) {
  var s = String(ch || "").replace(/＋/g, "+").replace(/－/g, "−").replace(/-/g, "−");
  if (/^[+＋]/.test(s)) return 1;
  if (/^[−－-]/.test(s)) return -1;
  return 0;
}

/* B4 统一声明（黄队定稿前用占位句冻结版；试点 Y3 已有，推广到 C1/C2/C7）。
 * params.scaleNote 可覆写措辞；showScaleNote 不可关闭（W-C7）。 */
function scaleNote(p) {
  return el("div", "chm-note",
    esc((p && p.scaleNote) ||
      "示意：微观粒子大小、数量、运动速度均为示意，未按真实比例。"));
}

/* SVG 内化学式文字（tspan 下标）：x,y 为基线锚点 */
function svgFormulaText(svg, x, y, label, size, fill, anchor) {
  var t = svgEl("text", {
    x: x, y: y, "text-anchor": anchor || "middle",
    "font-size": size, "font-weight": "700", fill: fill || "var(--chm-ink)"
  });
  parseFormula(label).forEach(function (tk) {
    var ts = svgEl("tspan", {});
    ts.textContent = tk.v;
    if (tk.t === "sub") {
      ts.setAttribute("font-size", Math.round(size * 0.68));
      ts.setAttribute("dy", size * 0.22);
    }
    t.appendChild(ts);
  });
  svg.appendChild(t);
  return t;
}

/* 通用滑块（复用 slider-lab 范式）：label + range(≥44px 高) + 读数 */
function uiSlider(opt) {
  opt = opt || {};
  var min = opt.min != null ? opt.min : 0, max = opt.max != null ? opt.max : 100;
  var step = opt.step || 1, val = opt.init != null ? opt.init : min;
  var row = el("div", "chm-slider-row", "");
  var lab = el("label", "chm-slider-lab", esc(opt.label || "") + "：");
  var input = document.createElement("input");
  input.type = "range"; input.className = "chm-slider";
  input.min = min; input.max = max; input.step = step; input.value = val;
  input.setAttribute("aria-label", opt.label || "滑块");
  var read = el("span", "chm-slider-read", "");
  function fmt(v) {
    return opt.fmt ? opt.fmt(v) :
      (fmtN(v, String(step).split(".")[1] ? String(step).split(".")[1].length : 0) +
        (opt.unit ? " " + opt.unit : ""));
  }
  var cbs = [];
  function set(v, silent) {
    v = Math.max(min, Math.min(max, v));
    /* 步进对齐 */
    v = Math.round(v / step) * step;
    v = Math.round(v * 1e9) / 1e9;
    val = v; input.value = v; read.textContent = fmt(v);
    if (!silent) cbs.forEach(function (fn) { fn(v); });
  }
  input.addEventListener("input", function () { set(parseFloat(input.value)); });
  row.appendChild(lab); row.appendChild(input); row.appendChild(read);
  set(val, true);
  return {
    row: row, get: function () { return val; }, set: set,
    on: function (fn) { cbs.push(fn); }, input: input
  };
}

/* 拖拽：pointer 事件通用拖放（托盘 → 目标）。opts:
 * { ghost:fn(el)→node, canDrop:fn(x,y)→target|null, onDrop:fn(target) } */
function dragFrom(trayEl, opts) {
  opts = opts || {};
  trayEl.style.touchAction = "none";
  trayEl.addEventListener("pointerdown", function (e) {
    /* 不 preventDefault：保留 click 兜底（如 C2 点托盘即添加）；
     * touch-action:none 已防止触摸滚动。拖放后 350ms 内忽略 click。 */
    trayEl.__justDropped = false;
    var ghost = opts.ghost ? opts.ghost(trayEl) :
      (function () { var g = trayEl.cloneNode(true); return g; })();
    ghost.className += " chm-drag-ghost";
    ghost.style.position = "fixed";
    ghost.style.left = (e.clientX - 22) + "px";
    ghost.style.top = (e.clientY - 22) + "px";
    ghost.style.pointerEvents = "none";
    ghost.style.zIndex = "9999";
    ghost.style.opacity = "0.85";
    document.body.appendChild(ghost);
    var target = null;
    function move(ev) {
      ghost.style.left = (ev.clientX - 22) + "px";
      ghost.style.top = (ev.clientY - 22) + "px";
      if (opts.canDrop) target = opts.canDrop(ev.clientX, ev.clientY);
    }
    function up(ev) {
      document.removeEventListener("pointermove", move);
      document.removeEventListener("pointerup", up);
      document.removeEventListener("pointercancel", up);
      if (ghost.parentNode) ghost.parentNode.removeChild(ghost);
      if (opts.canDrop) target = opts.canDrop(ev.clientX, ev.clientY);
      if (target && opts.onDrop) {
        trayEl.__justDropped = true;
        setTimeout(function () { trayEl.__justDropped = false; }, 350);
        opts.onDrop(target);
      } else if (opts.onMiss) opts.onMiss();
    }
    document.addEventListener("pointermove", move);
    document.addEventListener("pointerup", up);
    document.addEventListener("pointercancel", up);
  });
}
/* 点位命中：(x,y) 视口坐标 → 命中带 [data-drop] 的元素（最近中心优先） */
function hitDrop(x, y) {
  var els = document.querySelectorAll("[data-drop]");
  var best = null, bestD = 1e9;
  for (var i = 0; i < els.length; i++) {
    var r = els[i].getBoundingClientRect();
    if (x >= r.left - 8 && x <= r.right + 8 && y >= r.top - 8 && y <= r.bottom + 8) {
      var dx = x - (r.left + r.width / 2), dy = y - (r.top + r.height / 2);
      var d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = els[i]; }
    }
  }
  return best;
}

/* ============================================================
 * C1 · particle-view（微观粒子视角）
 * 温度滑块 + 加热/制冷长按 → 粒子速率 ∝ √T；跨熔/沸点三态徽章切换。
 * 降级声明：粒子大小/数量/速度/路径均为示意（B4 常驻，不可关闭）。
 * ============================================================ */
function widgetParticleView(p) {
  p = p || {};
  var sub = p.substance || { name: "物质", meltC: 0, boilC: 100 };
  var tp = p.temp || {};
  var tMin = tp.min != null ? tp.min : -20, tMax = tp.max != null ? tp.max : 120;
  var tStep = tp.step || 5, tInit = tp.init != null ? tp.init : 20;
  var tUnit = tp.unit || "℃";
  /* W-C1：粒子 ≤400；低端机（小屏或弱 CPU）自动降档 ≤200，不暴露 params */
  var lowEnd = false;
  try {
    lowEnd = (window.innerWidth || 999) < 430 ||
      ((navigator.hardwareConcurrency || 4) <= 2);
  } catch (e) {}
  var N = Math.min(p.particleCount || 120, 400);
  if (lowEnd) N = Math.min(N, 200);

  var box = el("div", "chm-widget chm-pview", "");
  var W = 100, H = 58;  /* 逻辑坐标（y 向下绘制；方向无语义，仅示意运动） */

  var canvas = document.createElement("canvas");
  canvas.className = "chm-pview-cv";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", sub.name + "微观粒子运动示意");
  box.appendChild(canvas);

  var parts = [];
  function seed(n) {
    parts = [];
    for (var i = 0; i < n; i++) {
      parts.push({
        x: 6 + Math.random() * (W - 12), y: 6 + Math.random() * (H - 12),
        a: Math.random() * Math.PI * 2, ph: Math.random() * Math.PI * 2,
        gx: 0, gy: 0
      });
    }
    /* 固态格点 */
    var cols = Math.ceil(Math.sqrt(n * W / H)), rows = Math.ceil(n / cols);
    for (var k = 0; k < n; k++) {
      parts[k].gx = 6 + (k % cols) * ((W - 12) / Math.max(1, cols - 1));
      parts[k].gy = 6 + Math.floor(k / cols) * ((H - 12) / Math.max(1, rows - 1));
    }
  }
  seed(N);

  var temp = tInit;
  var stateMode = p.stateMode || "auto";
  var fixedState = "liquid";
  function curState() {
    if (stateMode === "fixed-solid") return "solid";
    if (stateMode === "fixed-liquid") return "liquid";
    if (stateMode === "fixed-gas") return "gas";
    if (temp < sub.meltC) return "solid";
    if (temp > sub.boilC) return "gas";
    return "liquid";
  }
  function stateName(st) {
    /* "以水为例"（常见坑 2）：水的三态名特殊，其他物质用"名（态）" */
    if (sub.name === "水") {
      return st === "solid" ? "固态（冰）" : st === "liquid" ? "液态（水）" : "气态（水蒸气）";
    }
    return (st === "solid" ? "固态" : st === "liquid" ? "液态" : "气态") +
      "（" + sub.name + "）";
  }
  var badge = el("div", "chm-state", "");
  box.appendChild(badge);

  function speedOf() {
    var TK = temp + 273.15;
    return 9 * Math.sqrt(TK / 293.15);  /* 示意：速率 ∝ √T */
  }
  var lastBadge = "";
  function draw(t) {
    var dpr = 1;
    try { dpr = Math.min(2, window.devicePixelRatio || 1); } catch (e) {}
    var cw = canvas.clientWidth || 300, ch = canvas.clientHeight || 180;
    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
    }
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    var sx = cw / W, sy = ch / H;
    var st = curState(), sp = speedOf();
    var label = stateName(st);
    if (label !== lastBadge) {
      var icon = st === "solid" ? "❄" : st === "liquid" ? "💧" : "☁️";
      badge.className = "chm-state chm-state-ok";
      badge.textContent = icon + " " + label;
      flash(badge); lastBadge = label;
    }
    ctx.fillStyle = "#0072B2";
    var dt = 1 / 60;
    for (var i = 0; i < parts.length; i++) {
      var q = parts[i];
      if (st === "solid") {
        /* 格点振动（放大显示，配小字说明） */
        var amp = 1.6;
        q.x = q.gx + amp * Math.sin(t * 0.004 * sp + q.ph);
        q.y = q.gy + amp * Math.cos(t * 0.003 * sp + q.ph);
      } else {
        q.x += Math.cos(q.a) * sp * dt * (st === "gas" ? 1.6 : 0.7);
        q.y += Math.sin(q.a) * sp * dt * (st === "gas" ? 1.6 : 0.7);
        if (q.x < 3 || q.x > W - 3) { q.a = Math.PI - q.a; q.x = Math.max(3, Math.min(W - 3, q.x)); }
        if (q.y < 3 || q.y > H - 3) { q.a = -q.a; q.y = Math.max(3, Math.min(H - 3, q.y)); }
        if (Math.random() < 0.01) q.a += (Math.random() - 0.5) * 0.6;
      }
      ctx.beginPath();
      ctx.arc(q.x * sx, q.y * sy, (st === "gas" ? 2.2 : 2.8), 0, Math.PI * 2);
      ctx.fill();
    }
  }
  var rafId = 0, t0 = Date.now();
  function loop() {
    if (!document.hidden) draw(Date.now() - t0);
    rafId = requestAnimationFrame(loop);
  }
  loop();

  /* 温度滑块（熔/沸点刻度只读标记） */
  var slider = uiSlider({
    label: "温度", min: tMin, max: tMax, step: tStep, init: tInit,
    unit: tUnit,
    fmt: function (v) { return "T = " + fmtN(v, 0) + " " + tUnit; }
  });
  slider.on(function (v) { temp = v; });
  box.appendChild(slider.row);
  /* 熔/沸点只读刻度 */
  var ticks = el("div", "chm-pview-ticks", "");
  function placeTick(c, txt) {
    var pct = (c - tMin) / (tMax - tMin) * 100;
    if (pct < 0 || pct > 100) return;
    var m = el("span", "chm-pview-tick", txt);
    m.style.left = pct + "%";
    ticks.appendChild(m);
  }
  placeTick(sub.meltC, "熔点 " + sub.meltC + tUnit);
  placeTick(sub.boilC, "沸点 " + sub.boilC + tUnit);
  box.appendChild(ticks);

  /* 加热/制冷长按按钮（与滑块双向同步） */
  if (p.heatButtons !== false) {
    var hb = el("div", "chm-btn-row", "");
    var bHeat = el("button", "", "🔥 加热（长按）");
    var bCool = el("button", "", "❄ 制冷（长按）");
    bHeat.type = "button"; bCool.type = "button";
    function hold(btn, dir) {
      var iv = null;
      function tick() { slider.set(slider.get() + dir * tStep); }
      btn.addEventListener("pointerdown", function (e) {
        e.preventDefault(); tick();
        iv = setInterval(tick, 140);
      });
      ["pointerup", "pointerleave", "pointercancel"].forEach(function (ev) {
        btn.addEventListener(ev, function () {
          if (iv) { clearInterval(iv); iv = null; }
        });
      });
    }
    hold(bHeat, 1); hold(bCool, -1);
    hb.appendChild(bHeat); hb.appendChild(bCool);
    box.appendChild(hb);
  }
  /* fixed 三态切换 */
  if (stateMode !== "auto") {
    var sm = el("div", "chm-btn-row", "");
    [["solid", "固态"], ["liquid", "液态"], ["gas", "气态"]].forEach(function (s) {
      var b = el("button", "", s[1]);
      b.type = "button";
      b.setAttribute("aria-pressed", fixedState === s[0] ? "true" : "false");
      b.addEventListener("click", function () {
        fixedState = s[0]; stateMode = "fixed-" + s[0];
        var bs = sm.querySelectorAll("button");
        for (var i = 0; i < bs.length; i++)
          bs[i].setAttribute("aria-pressed", "false");
        b.setAttribute("aria-pressed", "true");
      });
      sm.appendChild(b);
    });
    box.appendChild(sm);
  }
  /* 温度读数（MathML） */
  var tread = el("div", "chm-readline", "");
  function updRead() {
    tread.innerHTML = mathmlOK()
      ? '<math><mi>T</mi><mo>=</mo><mn>' + fmtN(temp, 0) +
        '</mn><mtext>' + esc(tUnit) + '</mtext></math>'
      : "T = " + fmtN(temp, 0) + " " + tUnit;
  }
  slider.on(updRead); updRead();
  box.appendChild(tread);
  if (curState() === "solid")
    box.appendChild(el("div", "chm-note", "分子永不停息地运动——固态振动已放大显示。"));
  /* B4 常驻（不可关闭） */
  box.appendChild(scaleNote(p));
  return box;
}

/* ============================================================
 * C2 · molecule-build（分子模型拼搭）
 * 托盘取原子 → 拖到画布 → 近距吸附成键 → 成键数校验 → 目标判定。
 * B4 常驻。离子化合物不拼分子（页内文案由数据配，见 cm04 点）。
 * ============================================================ */
function widgetMoleculeBuild(p) {
  p = p || {};
  var target = p.target || null;
  var mode = p.mode || "target";
  var tray = p.tray || [];
  var bondLen = p.bondLength || 14;
  var VW = 100, VH = 62;

  var box = el("div", "chm-widget chm-mbuild", "");
  var warnSlot = el("div", "", "");
  box.appendChild(warnSlot);
  function warn(msg) {
    warnSlot.innerHTML = "";
    var w = el("div", "chm-state chm-state-bad", "⚠ " + msg);
    warnSlot.appendChild(w); flash(w); vib(30);
  }

  /* 托盘 */
  var trayBar = el("div", "chm-mb-tray", "");
  var used = {};  /* element → 已取数 */
  tray.forEach(function (t) { used[t.element] = 0; });
  var trayBtns = {};
  tray.forEach(function (t) {
    var st = atomStyle(t.element);
    var b = el("button", "chm-mb-chip", "");
    b.type = "button";
    b.setAttribute("data-drop", "tray");
    b.setAttribute("data-element", t.element);
    b.innerHTML = '<span class="chm-mb-ball" style="background:' + st.bg +
      ";color:" + st.fg + '">' + esc(t.element) + "</span>" +
      '<span class="chm-mb-count"></span>';
    b.setAttribute("aria-label", "取一个 " + t.element + " 原子（拖到画布）");
    function upd() {
      var left = t.count - (used[t.element] || 0);
      b.querySelector(".chm-mb-count").textContent = "×" + left;
      b.disabled = left <= 0;
    }
    upd(); trayBtns[t.element] = upd;
    b.addEventListener("click", function () {
      if (b.__justDropped) return;
      if ((used[t.element] || 0) >= t.count) {
        warn(t.element + " 用完了（托盘共 " + t.count + " 个）。"); return;
      }
      used[t.element] = (used[t.element] || 0) + 1;
      trayBtns[t.element]();
      addAtom(t.element, VW / 2 + (Math.random() - 0.5) * 20,
        VH / 2 + (Math.random() - 0.5) * 12, t.maxBonds);
    });
    trayBar.appendChild(b);
    dragFrom(b, {
      ghost: function () {
        var g = el("span", "chm-mb-ball", esc(t.element));
        g.style.cssText = "background:" + st.bg + ";color:" + st.fg +
          ";width:44px;height:44px;display:inline-flex;align-items:center;" +
          "justify-content:center;border-radius:50%;font-weight:700;";
        return g;
      },
      canDrop: function (x, y) {
        var r = svg.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return svg;
        return null;
      },
      onDrop: function () {
        if ((used[t.element] || 0) >= t.count) {
          warn(t.element + " 用完了（托盘共 " + t.count + " 个）。"); return;
        }
        used[t.element] = (used[t.element] || 0) + 1;
        trayBtns[t.element]();
        addAtom(t.element, VW / 2 + (Math.random() - 0.5) * 20,
          VH / 2 + (Math.random() - 0.5) * 12, t.maxBonds);
      }
    });
  });
  box.appendChild(trayBar);
  box.appendChild(el("div", "chm-note", "从托盘拖（或点）原子球到画布；两球靠近自动成键；把原子拖回托盘可删除。"));

  var svg = svgEl("svg", {
    viewBox: "0 0 " + VW + " " + VH, role: "img",
    "aria-label": "分子拼搭画布", "class": "chm-mb-canvas"
  });
  box.appendChild(svg);

  var atoms = [];  /* {id, element, x, y, maxBonds, g, circle} */
  var bonds = [];  /* {a, b, line} */
  var aid = 0;
  function maxBondsOf(element) {
    for (var i = 0; i < tray.length; i++)
      if (tray[i].element === element) return tray[i].maxBonds;
    return 4;
  }
  function bondCount(a) {
    var n = 0;
    bonds.forEach(function (bd) { if (bd.a === a || bd.b === a) n++; });
    return n;
  }
  /* client 坐标 → SVG 逻辑坐标：计入 preserveAspectRatio(xMidYMid meet) 留白。
     SVG 元素宽高比 ≠ viewBox 宽高比时，内容等比居中，两侧/上下有留白；
     直接按整元素线性换算会使拖拽"打滑"（修 2026-10-15）。 */
  function clientToSvg(x, y) {
    var r = svg.getBoundingClientRect();
    var s = Math.min(r.width / VW, r.height / VH);
    var ox = r.left + (r.width - VW * s) / 2, oy = r.top + (r.height - VH * s) / 2;
    return [(x - ox) / s, (y - oy) / s];
  }
  function addAtom(element, x, y, mb) {
    var st = atomStyle(element);
    var g = svgEl("g", { "class": "chm-mb-atom", "data-aid": aid });
    var c = svgEl("circle", {
      cx: x, cy: y, r: 6, fill: st.bg, stroke: "#00000055", "stroke-width": 0.6
    });
    g.appendChild(c);
    var t = svgEl("text", {
      x: x, y: y + 2.6, "text-anchor": "middle", "font-size": 5.4,
      "font-weight": "700", fill: st.fg, "pointer-events": "none"
    });
    t.textContent = element;
    g.appendChild(t);
    /* 热区外扩 50%（W-C5）：透明大圆 */
    var hot = svgEl("circle", { cx: x, cy: y, r: 9, fill: "transparent" });
    g.appendChild(hot);
    svg.appendChild(g);
    var A = { id: aid++, element: element, x: x, y: y, maxBonds: mb, g: g, c: c };
    /* 拖动原子 */
    var dragging = false, sx = 0, sy = 0, ox = 0, oy = 0, moved = false;
    g.style.touchAction = "none";
    g.addEventListener("pointerdown", function (e) {
      e.preventDefault(); dragging = true; moved = false;
      var p0 = clientToSvg(e.clientX, e.clientY);
      sx = p0[0]; sy = p0[1]; ox = A.x; oy = A.y;
      try { g.setPointerCapture(e.pointerId); } catch (err) {}
    });
    g.addEventListener("pointermove", function (e) {
      if (!dragging) return;
      var p = clientToSvg(e.clientX, e.clientY);
      var dx = p[0] - sx, dy = p[1] - sy;
      if (Math.abs(dx) + Math.abs(dy) > 0.5) moved = true;
      A.x = Math.max(6, Math.min(VW - 6, ox + dx));
      A.y = Math.max(6, Math.min(VH - 6, oy + dy));
      paintAtom(A);
    });
    function endDrag(e) {
      if (!dragging) return;
      dragging = false;
      if (!moved) return;
      /* 拖回托盘 → 删除 */
      var tr = trayBar.getBoundingClientRect();
      if (e.clientX >= tr.left && e.clientX <= tr.right &&
          e.clientY >= tr.top && e.clientY <= tr.bottom) {
        removeAtom(A); return;
      }
      tryBond(A);
      paintAtom(A);
      checkTarget();
    }
    g.addEventListener("pointerup", endDrag);
    g.addEventListener("pointercancel", endDrag);
    atoms.push(A);
    paintAtom(A);
    checkTarget();
    return A;
  }
  function paintAtom(A) {
    A.c.setAttribute("cx", A.x); A.c.setAttribute("cy", A.y);
    var kids = A.g.childNodes;
    for (var i = 0; i < kids.length; i++) {
      var k = kids[i];
      if (k.tagName === "text") { k.setAttribute("x", A.x); k.setAttribute("y", A.y + 2.6); }
      if (k.tagName === "circle" && k !== A.c) { k.setAttribute("cx", A.x); k.setAttribute("cy", A.y); }
    }
    bonds.forEach(function (bd) {
      if (bd.a === A || bd.b === A) {
        bd.line.setAttribute("x1", bd.a.x); bd.line.setAttribute("y1", bd.a.y);
        bd.line.setAttribute("x2", bd.b.x); bd.line.setAttribute("y2", bd.b.y);
      }
    });
  }
  function removeAtom(A) {
    bonds = bonds.filter(function (bd) {
      if (bd.a === A || bd.b === A) {
        if (bd.line.parentNode) bd.line.parentNode.removeChild(bd.line);
        return false;
      }
      return true;
    });
    if (A.g.parentNode) A.g.parentNode.removeChild(A.g);
    atoms = atoms.filter(function (a) { return a !== A; });
    used[A.element] = Math.max(0, (used[A.element] || 1) - 1);
    if (trayBtns[A.element]) trayBtns[A.element]();
    hideBondTip();
    checkTarget();
  }
  function bonded(a, b) {
    return bonds.some(function (bd) {
      return (bd.a === a && bd.b === b) || (bd.a === b && bd.b === a);
    });
  }
  function tryBond(A) {
    for (var i = 0; i < atoms.length; i++) {
      var B = atoms[i];
      if (B === A || bonded(A, B)) continue;
      var d = Math.hypot(A.x - B.x, A.y - B.y);
      if (d < 8) {
        if (bondCount(A) >= A.maxBonds) {
          warn(A.element + "（" + A.element + "）只能形成 " + A.maxBonds +
            " 个共价键——成键数是元素的\"脾气\"。");
          flash(A.g); continue;
        }
        if (bondCount(B) >= B.maxBonds) {
          warn(B.element + "（" + B.element + "）只能形成 " + B.maxBonds +
            " 个共价键——成键数是元素的\"脾气\"。");
          flash(B.g); continue;
        }
        var line = svgEl("line", {
          x1: A.x, y1: A.y, x2: B.x, y2: B.y,
          stroke: "var(--chm-apparatus)", "stroke-width": 1.4,
          "class": "chm-mb-bond", "data-bond": "1"
        });
        svg.insertBefore(line, svg.firstChild);
        (function (ln) {
          ln.style.pointerEvents = "stroke";
          ln.addEventListener("click", function (e) {
            e.stopPropagation();
            showBondTip(ln);
          });
        })(line);
        bonds.push({ a: A, b: B, line: line });
        flash(A.g); vib(15);
      }
    }
  }
  /* 点键 → "断开"气泡（≥44px，不直接点细线误触） */
  var bondTip = null;
  function hideBondTip() {
    if (bondTip && bondTip.parentNode) bondTip.parentNode.removeChild(bondTip);
    bondTip = null;
  }
  function showBondTip(line) {
    hideBondTip();
    bondTip = el("div", "chm-mb-bondtip", "");
    var b = el("button", "", "断开这根键");
    b.type = "button";
    b.addEventListener("click", function () {
      bonds = bonds.filter(function (bd) {
        if (bd.line === line) {
          if (line.parentNode) line.parentNode.removeChild(line);
          return false;
        }
        return true;
      });
      hideBondTip(); checkTarget();
    });
    bondTip.appendChild(b);
    box.appendChild(bondTip);
  }
  svg.addEventListener("click", function (e) {
    if (e.target === svg) hideBondTip();
  });

  /* 目标判定：原子种类/数目 + 连接关系（元素对多重集）一致 */
  var doneBadge = el("div", "chm-state", "");
  doneBadge.style.display = "none";
  box.appendChild(doneBadge);
  function pairKey(a, b) {
    var s = [a.element, b.element].sort();
    return s[0] + "-" + s[1];
  }
  function checkTarget() {
    if (mode !== "target" || !target) return;
    var want = target.atoms || {}, got = {};
    atoms.forEach(function (a) { got[a.element] = (got[a.element] || 0) + 1; });
    var keys = {};
    Object.keys(want).forEach(function (k) { keys[k] = 1; });
    Object.keys(got).forEach(function (k) { keys[k] = 1; });
    var atomOk = Object.keys(keys).every(function (k) {
      return (want[k] || 0) === (got[k] || 0);
    });
    var wantPairs = {};
    (target.bonds || []).forEach(function (pr) {
      var s = [pr[0], pr[1]].sort(), k = s[0] + "-" + s[1];
      wantPairs[k] = (wantPairs[k] || 0) + 1;
    });
    var gotPairs = {};
    bonds.forEach(function (bd) {
      var k = pairKey(bd.a, bd.b);
      gotPairs[k] = (gotPairs[k] || 0) + 1;
    });
    var pk = {};
    Object.keys(wantPairs).forEach(function (k) { pk[k] = 1; });
    Object.keys(gotPairs).forEach(function (k) { pk[k] = 1; });
    var bondOk = Object.keys(pk).every(function (k) {
      return (wantPairs[k] || 0) === (gotPairs[k] || 0);
    });
    if (atomOk && bondOk && atoms.length > 0) {
      doneBadge.style.display = "";
      doneBadge.className = "chm-state chm-state-ok";
      doneBadge.innerHTML = "";
      doneBadge.appendChild(el("span", "", "✓ 拼搭成功！"));
      doneBadge.appendChild(renderFormulaToks(target.formula || "", false, function () {}));
      flash(doneBadge); vib(20);
    } else {
      doneBadge.style.display = "none";
    }
  }
  /* 键数读数行 */
  var bondRead = el("div", "chm-note", "");
  box.appendChild(bondRead);
  setInterval(function () {
    var parts = atoms.map(function (a) {
      return a.element + " " + bondCount(a) + "/" + a.maxBonds;
    });
    bondRead.textContent = parts.length ? "成键数：" + parts.join("　") : "";
  }, 600);
  /* 正四面体提示（CH₄ 页） */
  if (p.showTetraHint) {
    var hint = el("div", "chm-note",
      "109.5° 键角示意（虚线）：甲烷是正四面体，不是平面正方形。");
    box.appendChild(hint);
  }
  /* B4 常驻 */
  box.appendChild(scaleNote(p));
  return box;
}

/* ============================================================
 * C4 · periodic-explore（周期表探索）
 * 18 列网格（1–36 号；镧系/锕系占位"此处省略"）+ 详情卡
 * （原子结构示意 + 质子数 + 电子排布 + 相对原子质量）。
 * 390px 点选补偿：详情卡 ←/→ 切换 + 网格容器最近格心命中。
 * ============================================================ */
function widgetPeriodicExplore(p) {
  p = p || {};
  var range = p.range || [1, 20];
  var mode = p.highlightMode || "none";
  var showDetail = p.showDetail !== false;

  var box = el("div", "chm-widget chm-ptab", "");

  function posOf(z) {
    if (z === 1) return [1, 1];
    if (z === 2) return [1, 18];
    if (z >= 3 && z <= 10) return [2, z - 2];
    if (z >= 11 && z <= 18) return [3, z - 10];
    if (z >= 19 && z <= 36) return [4, z - 18];
    return null;
  }
  function groupOf(col) {
    if (col === 1) return "ⅠA"; if (col === 2) return "ⅡA";
    if (col >= 3 && col <= 7) return ["ⅢB", "ⅣB", "ⅤB", "ⅥB", "ⅦB"][col - 3];
    if (col >= 8 && col <= 10) return "Ⅷ";
    if (col === 11) return "ⅠB"; if (col === 12) return "ⅡB";
    if (col === 13) return "ⅢA"; if (col === 14) return "ⅣA";
    if (col === 15) return "ⅤA"; if (col === 16) return "ⅥA";
    if (col === 17) return "ⅦA"; return "0 族";
  }
  var grid = el("div", "chm-ptab-grid", "");
  grid.setAttribute("role", "group");
  grid.setAttribute("aria-label", "元素周期表（" + range[0] + "–" + range[1] + " 号）");
  var cells = {};  /* z → button */
  for (var z = range[0]; z <= range[1]; z++) {
    (function (zz) {
      var E = chemElement(zz);
      var pos = posOf(zz);
      if (!E || !pos) return;
      var b = el("button", "chm-ptab-cell", "");
      b.type = "button";
      b.style.gridRow = pos[0]; b.style.gridColumn = pos[1];
      b.setAttribute("data-z", zz);
      b.setAttribute("aria-label", zz + " 号 " + E.n + "（" + E.s + "）");
      var cls = "chm-ptab-cell";
      if (mode === "metal") {
        cls += E.metal === "金" ? " z-metal" : E.metal === "非" ? " z-nonmetal" : " z-metalloid";
      } else if (mode === "period") {
        cls += " z-p" + pos[0];
      } else if (mode === "group") {
        var col = pos[1];
        cls += (col >= 8 && col <= 10) ? " z-g8" : " z-g" + col;
      }
      b.className = cls;
      b.innerHTML = '<span class="chm-ptab-z">' + zz + "</span>" +
        '<span class="chm-ptab-s">' + esc(E.s) + "</span>" +
        (mode === "metal" ? '<span class="chm-ptab-m">' + E.metal + "</span>" : "");
      b.addEventListener("click", function () { select(zz); });
      grid.appendChild(b);
      cells[zz] = b;
    })(z);
  }
  /* 最近格心命中（热区外扩至 44px，重叠取最近格心；W-C5） */
  grid.addEventListener("pointerdown", function (e) {
    if (e.target !== grid) return;
    var best = null, bestD = 1e9;
    for (var zz in cells) {
      var r = cells[zz].getBoundingClientRect();
      var dx = e.clientX - (r.left + r.width / 2),
          dy = e.clientY - (r.top + r.height / 2);
      var d = dx * dx + dy * dy;
      if (d < bestD) { bestD = d; best = zz; }
    }
    if (best && bestD < 60 * 60) select(parseInt(best, 10));
  });
  box.appendChild(grid);

  /* 图例 */
  var legend = el("div", "chm-ptab-legend", "");
  if (mode === "metal") {
    legend.innerHTML =
      '<span class="lg z-metal">橙·<b>金</b>属</span>' +
      '<span class="lg z-nonmetal">天蓝·<b>非</b>金属</span>' +
      '<span class="lg z-metalloid">灰·<b>类</b>金属</span>';
  } else if (mode === "group") {
    legend.textContent = "第Ⅷ族占三列（8、9、10 列同属第Ⅷ族）。";
  } else if (mode === "period") {
    legend.textContent = "按周期着色：电子层数 = 周期数。";
  }
  if (legend.textContent || legend.children.length) box.appendChild(legend);

  /* 递变箭头 */
  if (p.trendArrows) {
    var tr = el("div", "chm-ptab-trend", "");
    tr.appendChild(el("span", "chm-ptab-arrow", "→"));
    tr.appendChild(el("span", "", esc(p.trend || "")));
    box.appendChild(tr);
  }

  /* 详情卡 */
  var card = el("div", "chm-ptab-card", "");
  card.style.display = "none";
  box.appendChild(card);
  var curZ = range[0];
  function atomDiagram(E) {
    var svg = svgEl("svg", {
      viewBox: "0 0 100 100", role: "img",
      "aria-label": E.n + "原子结构示意图", "class": "chm-ptab-atom"
    });
    var nShell = E.cfg.length;
    var R = [14, 24, 34, 44].slice(0, nShell);
    for (var i = 0; i < nShell; i++) {
      svg.appendChild(svgEl("circle", {
        cx: 50, cy: 50, r: R[i], fill: "none",
        stroke: "var(--chm-apparatus)", "stroke-width": 1
      }));
      var cnt = E.cfg[i];
      for (var k = 0; k < cnt; k++) {
        var a = (k / cnt) * Math.PI * 2 - Math.PI / 2;
        svg.appendChild(svgEl("circle", {
          cx: 50 + R[i] * Math.cos(a), cy: 50 + R[i] * Math.sin(a),
          r: 2.6, fill: "var(--chm-electron)", stroke: "none"
        }));
      }
    }
    /* 圈内数字 = 质子数（CHEM-R48），旁注"质子数" */
    var t = svgEl("text", {
      x: 50, y: 56, "text-anchor": "middle", "font-size": 13,
      "font-weight": "700", fill: "var(--chm-ink)"
    });
    t.textContent = E.z;
    svg.appendChild(t);
    var cap = svgEl("text", {
      x: 50, y: 70, "text-anchor": "middle", "font-size": 6.5, fill: "var(--chm-ink)"
    });
    cap.textContent = "质子数";
    svg.appendChild(cap);
    return svg;
  }
  function select(zz) {
    var E = chemElement(zz);
    if (!E) return;
    curZ = zz;
    for (var k in cells) cells[k].classList.remove("sel");
    if (cells[zz]) cells[zz].classList.add("sel");
    if (!showDetail) return;
    card.style.display = "";
    card.innerHTML = "";
    var head = el("div", "chm-ptab-chead", "");
    var prev = el("button", "", "←");
    var next = el("button", "", "→");
    prev.type = "button"; next.type = "button";
    prev.setAttribute("aria-label", "上一个元素");
    next.setAttribute("aria-label", "下一个元素");
    prev.disabled = zz <= range[0]; next.disabled = zz >= range[1];
    prev.addEventListener("click", function () { select(zz - 1); });
    next.addEventListener("click", function () { select(zz + 1); });
    head.appendChild(prev);
    var title = el("div", "chm-ptab-ctitle", "");
    title.innerHTML = '<span class="sym">' + esc(E.s) + '</span>' +
      '<span class="nm">' + esc(E.n) + "（" + zz + " 号）</span>";
    head.appendChild(title);
    head.appendChild(next);
    card.appendChild(head);
    card.appendChild(atomDiagram(E));
    var info = el("div", "chm-ptab-cinfo", "");
    var pos = posOf(zz);
    info.innerHTML =
      "<div>质子数 ＝ " + E.z + "（圈内数字）</div>" +
      "<div>核外电子排布（简化）：K L M N → " + E.cfg.join("、") + "</div>" +
      "<div>相对原子质量：" + E.m + "</div>" +
      "<div>分区：" + (E.metal === "金" ? "金属" : E.metal === "非" ? "非金属" : "类金属") +
      "　|　第 " + pos[0] + " 周期，" + groupOf(pos[1]) + " 族</div>";
    card.appendChild(info);
    if (zz > 20) {
      /* CHEM-R50：21–36 号简化声明 */
      card.appendChild(el("div", "chm-note",
        "简化示意：过渡元素电子排布涉及能级交错，此处为简化画法。"));
    }
    flash(card);
  }
  if (showDetail) select(range[0]);
  box.appendChild(el("div", "chm-note", "镧系/锕系：此处省略（本表只到 36 号）。"));
  return box;
}

/* ============================================================
 * C5 · lab-assemble（实验装置组装与步骤回放）
 *
 * 仪器托盘 → 拖到槽位（accepts 校验）→ 规范硬校验 →
 * 安全检查点 → 步骤回放。realityNote 必填常驻。
 *
 * 坐标说明（供审计 CHEM-R31）：SVG 视口 0 0 100 66，y 向下
 * （屏幕坐标）。"漏斗下端伸入液面下" = 漏斗管下端屏幕 y >
 * 液面线屏幕 y（画得更靠下）。co2/o2-liquid 模板：液面 y=44，
 * 漏斗管下端 y=50 → 伸入液面下 ✓。
 * ============================================================ */
var LAB_KIND_ROLE = {
  testTube: "vessel", flask: "vessel",
  funnel: "funnel", sepFunnel: "funnel",
  plug: "mouth", tube: "tube",
  gasJar: "collect", trough: "collect",
  lamp: "lamp", stand: "stand",
  balloon: "tail", naohBottle: "absorb"
};
/* 槽位布局（逻辑 0–100，y 向下为屏幕坐标） */
var LAB_ROLE_BOX = {
  vessel:  { x: 8,  y: 28, w: 30, h: 28 },
  funnel:  { x: 14, y: 2,  w: 18, h: 26 },
  mouth:   { x: 19, y: 24, w: 8,  h: 6  },
  tube:    { x: 38, y: 12, w: 24, h: 30 },
  collect: { x: 64, y: 28, w: 28, h: 28 },
  lamp:    { x: 15, y: 56, w: 14, h: 8  },
  stand:   { x: 1,  y: 20, w: 7,  h: 38 },
  tail:    { x: 82, y: 6,  w: 14, h: 14 },
  absorb:  { x: 64, y: 44, w: 28, h: 16 }
};
function widgetLabAssemble(p) {
  p = p || {};
  var pieces = p.pieces || [], slots = p.slots || [];
  var steps = p.steps || [], checks = p.safetyChecks || [];
  var mode = p.mode || "assemble";

  var box = el("div", "chm-widget chm-lab", "");
  var warnSlot = el("div", "", "");
  box.appendChild(warnSlot);
  function warn(msg) {
    warnSlot.innerHTML = "";
    var w = el("div", "chm-state chm-state-bad", "⚠ " + msg);
    warnSlot.appendChild(w); flash(w); vib(30);
  }

  /* 槽位 → 角色 */
  var slotRole = {};
  slots.forEach(function (s) {
    var k = (s.accepts || [])[0];
    slotRole[s.id] = LAB_KIND_ROLE[k] || "vessel";
  });
  var placed = {};   /* slotId → piece */
  var trayLeft = {};
  pieces.forEach(function (pc) { trayLeft[pc.id] = pc; });

  var svg = svgEl("svg", {
    viewBox: "0 0 100 66", role: "img",
    "aria-label": "实验装置组装区", "class": "chm-lab-canvas"
  });
  var slotLayer = svgEl("g", {}), pieceLayer = svgEl("g", {});
  svg.appendChild(slotLayer); svg.appendChild(pieceLayer);
  box.appendChild(svg);

  /* ---- 仪器绘制（示意） ---- */
  function drawPiece(kind, role) {
    var g = svgEl("g", { "class": "chm-lab-piece" });
    var S = "var(--chm-apparatus)";
    if (role === "vessel") {
      if (kind === "flask") {
        g.appendChild(svgEl("path", {
          d: "M16,30 L30,30 L36,56 L10,56 Z", fill: "none", stroke: S, "stroke-width": 1.2
        }));
        /* 液面 y=44（屏幕坐标，y 向下） */
        g.appendChild(svgEl("line", {
          x1: 12.6, y1: 44, x2: 33.4, y2: 44, stroke: "var(--chm-known)", "stroke-width": 1.4
        }));
        g.appendChild(svgEl("path", {
          d: "M12.6,44 L33.4,44 L36,56 L10,56 Z",
          fill: "var(--chm-known)", opacity: 0.18, stroke: "none"
        }));
        var lt = svgEl("text", { x: 23, y: 63, "text-anchor": "middle", "font-size": 4.4, fill: "var(--chm-ink)" });
        lt.textContent = "锥形瓶（液面———）";
        g.appendChild(lt);
      } else { /* testTube */
        g.appendChild(svgEl("rect", {
          x: 18, y: 30, width: 12, height: 26, rx: 5, fill: "none", stroke: S, "stroke-width": 1.2
        }));
        g.appendChild(svgEl("line", {
          x1: 18, y1: 46, x2: 30, y2: 46, stroke: "var(--chm-known)", "stroke-width": 1.4
        }));
        var lt2 = svgEl("text", { x: 24, y: 63, "text-anchor": "middle", "font-size": 4.4, fill: "var(--chm-ink)" });
        lt2.textContent = "试管";
        g.appendChild(lt2);
      }
    } else if (role === "funnel") {
      if (kind === "sepFunnel") {
        g.appendChild(svgEl("path", {
          d: "M17,4 Q23,2 29,4 L27,12 Q23,14 19,12 Z", fill: "none", stroke: S, "stroke-width": 1.2
        }));
        g.appendChild(svgEl("line", {
          x1: 23, y1: 14, x2: 23, y2: 30, stroke: S, "stroke-width": 1.6
        }));
        var lt3 = svgEl("text", { x: 23, y: 34, "text-anchor": "middle", "font-size": 4.4, fill: "var(--chm-ink)" });
        lt3.textContent = "分液漏斗";
        g.appendChild(lt3);
      } else {
        g.appendChild(svgEl("path", {
          d: "M14,4 L32,4 L23,16 Z", fill: "none", stroke: S, "stroke-width": 1.2
        }));
        /* 漏斗管：下端 y=50，液面 y=44 → 伸入液面下（CHEM-R31） */
        g.appendChild(svgEl("line", {
          x1: 23, y1: 16, x2: 23, y2: 50, stroke: S, "stroke-width": 1.6
        }));
        var lt4 = svgEl("text", { x: 33, y: 52, "font-size": 4.2, fill: "var(--chm-ink)" });
        lt4.textContent = "长颈漏斗（下端伸入液面下）";
        g.appendChild(lt4);
      }
    } else if (role === "mouth") {
      g.appendChild(svgEl("rect", {
        x: 19, y: 24, width: 8, height: 6, fill: "var(--chm-apparatus)", opacity: 0.7
      }));
      var lt5 = svgEl("text", { x: 23, y: 22, "text-anchor": "middle", "font-size": 4.2, fill: "var(--chm-ink)" });
      lt5.textContent = "塞";
      g.appendChild(lt5);
    } else if (role === "tube") {
      g.appendChild(svgEl("path", {
        d: "M27,26 C40,18 52,16 66,28", fill: "none", stroke: S, "stroke-width": 1.6
      }));
      var lt6 = svgEl("text", { x: 46, y: 12, "text-anchor": "middle", "font-size": 4.2, fill: "var(--chm-ink)" });
      lt6.textContent = "导管";
      g.appendChild(lt6);
    } else if (role === "collect") {
      if (kind === "trough") {
        g.appendChild(svgEl("rect", {
          x: 62, y: 46, width: 32, height: 12, fill: "none", stroke: S, "stroke-width": 1.2
        }));
        g.appendChild(svgEl("line", {
          x1: 62, y1: 50, x2: 94, y2: 50, stroke: "var(--chm-known)", "stroke-width": 1.2
        }));
        var lt7 = svgEl("text", { x: 78, y: 63, "text-anchor": "middle", "font-size": 4.4, fill: "var(--chm-ink)" });
        lt7.textContent = "水槽";
        g.appendChild(lt7);
      } else {
        g.appendChild(svgEl("rect", {
          x: 66, y: 28, width: 24, height: 24, fill: "none", stroke: S, "stroke-width": 1.2
        }));
        var lt8 = svgEl("text", { x: 78, y: 63, "text-anchor": "middle", "font-size": 4.4, fill: "var(--chm-ink)" });
        lt8.textContent = "集气瓶";
        g.appendChild(lt8);
      }
    } else if (role === "lamp") {
      g.appendChild(svgEl("rect", {
        x: 17, y: 56, width: 12, height: 7, rx: 1.5, fill: "none", stroke: S, "stroke-width": 1.2
      }));
      g.appendChild(svgEl("path", {
        d: "M23,56 q-2.4,-4 0,-7 q2.4,3 0,7", fill: "var(--chm-lose-e)", stroke: "none"
      }));
      var lt9 = svgEl("text", { x: 23, y: 52, "text-anchor": "middle", "font-size": 4.2, fill: "var(--chm-ink)" });
      lt9.textContent = "酒精灯";
      g.appendChild(lt9);
    } else if (role === "stand") {
      g.appendChild(svgEl("line", { x1: 4, y1: 20, x2: 4, y2: 58, stroke: S, "stroke-width": 1.6 }));
      g.appendChild(svgEl("line", { x1: 1, y1: 58, x2: 9, y2: 58, stroke: S, "stroke-width": 1.6 }));
      g.appendChild(svgEl("line", { x1: 4, y1: 34, x2: 20, y2: 34, stroke: S, "stroke-width": 1 }));
      var lt10 = svgEl("text", { x: 5, y: 64, "font-size": 4.2, fill: "var(--chm-ink)" });
      lt10.textContent = "铁架台";
      g.appendChild(lt10);
    } else if (role === "tail") {
      g.appendChild(svgEl("ellipse", {
        cx: 89, cy: 13, rx: 6, ry: 7, fill: "none", stroke: S, "stroke-width": 1.2
      }));
      var lt11 = svgEl("text", { x: 89, y: 26, "text-anchor": "middle", "font-size": 4.2, fill: "var(--chm-ink)" });
      lt11.textContent = "气球（尾气收集）";
      g.appendChild(lt11);
    } else if (role === "absorb") {
      g.appendChild(svgEl("rect", {
        x: 68, y: 44, width: 20, height: 16, fill: "none", stroke: S, "stroke-width": 1.2
      }));
      g.appendChild(svgEl("line", {
        x1: 68, y1: 52, x2: 88, y2: 52, stroke: "var(--chm-known)", "stroke-width": 1.2
      }));
      var lt12 = svgEl("text", { x: 78, y: 63, "text-anchor": "middle", "font-size": 4.2, fill: "var(--chm-ink)" });
      lt12.textContent = "NaOH 吸收瓶";
      g.appendChild(lt12);
    }
    return g;
  }

  /* 槽位虚线框 */
  var slotNodes = {};
  slots.forEach(function (s) {
    var role = slotRole[s.id], rb = LAB_ROLE_BOX[role];
    var g = svgEl("g", { "data-slot": s.id, "data-drop": "slot", "class": "chm-lab-slot" });
    var r = svgEl("rect", {
      x: rb.x, y: rb.y, width: rb.w, height: rb.h, fill: "none",
      stroke: "var(--chm-ink-soft)", "stroke-width": 0.8, "stroke-dasharray": "2.4,1.8"
    });
    g.appendChild(r);
    var t = svgEl("text", {
      x: rb.x + rb.w / 2, y: rb.y + rb.h / 2, "text-anchor": "middle",
      "font-size": 4, fill: "var(--chm-ink-soft)"
    });
    t.textContent = s.hint || "槽位";
    g.appendChild(t);
    slotLayer.appendChild(g);
    slotNodes[s.id] = g;
  });

  /* 托盘 */
  var trayBar = el("div", "chm-lab-tray", "");
  box.appendChild(trayBar);
  function renderTray() {
    trayBar.innerHTML = "";
    pieces.forEach(function (pc) {
      if (!trayLeft[pc.id]) return;
      var b = el("button", "chm-lab-chip", pc.label);
      b.type = "button";
      b.setAttribute("aria-label", "拖动" + pc.label + "到槽位");
      trayBar.appendChild(b);
      dragFrom(b, {
        canDrop: function (x, y) { return hitDrop(x, y); },
        onDrop: function (target) {
          var sid = target.getAttribute("data-slot");
          placePiece(pc, sid);
        }
      });
    });
    if (!trayBar.children.length)
      trayBar.appendChild(el("div", "chm-note", "托盘已空。"));
  }
  function placePiece(pc, sid) {
    var s = null;
    slots.forEach(function (x) { if (x.id === sid) s = x; });
    if (!s) return;
    if ((s.accepts || []).indexOf(pc.kind) < 0) {
      warn("放错了：" + pc.label + "不属于「" + (s.hint || sid) +
        "」——看看槽位提示。");
      return;
    }
    /* 槽位已有部件 → 换回托盘 */
    if (placed[sid]) {
      trayLeft[placed[sid].id] = placed[sid];
    }
    placed[sid] = pc;
    delete trayLeft[pc.id];
    var role = slotRole[sid];
    var old = pieceLayer.querySelector('[data-prole="' + role + "_" + sid + '"]');
    if (old) old.parentNode.removeChild(old);
    var g = drawPiece(pc.kind, role);
    g.setAttribute("data-prole", role + "_" + sid);
    pieceLayer.appendChild(g);
    /* 槽位框变实线 */
    var sn = slotNodes[sid];
    if (sn) {
      var rect = sn.querySelector("rect");
      if (rect) {
        rect.setAttribute("stroke", "var(--chm-corr-c, #009E73)");
        rect.removeAttribute("stroke-dasharray");
      }
    }
    flash(g); vib(15);
    renderTray();
    checkDone();
  }
  var doneBadge = el("div", "chm-state", "");
  doneBadge.style.display = "none";
  box.appendChild(doneBadge);
  function checkDone() {
    var ok = slots.every(function (s) { return !!placed[s.id]; });
    if (ok) {
      doneBadge.style.display = "";
      doneBadge.className = "chm-state chm-state-ok";
      doneBadge.textContent = "✓ 装置组装正确";
      flash(doneBadge);
    }
  }
  renderTray();

  /* ---- 安全检查点（确认式，不判错，只拦住） ---- */
  var confirmed = {};
  if (checks.length) {
    var chkBox = el("div", "chm-lab-checks", "");
    chkBox.appendChild(el("div", "chm-lab-checks-t", "安全检查点（逐项确认后继续）："));
    checks.forEach(function (c) {
      var row = el("div", "chm-lab-check", "");
      var b = el("button", "", "我已确认");
      b.type = "button";
      if (c.mustPass) b.className = "chm-big";
      row.appendChild(el("span", "", esc(c.text)));
      row.appendChild(b);
      b.addEventListener("click", function () {
        confirmed[c.id] = true;
        b.disabled = true;
        b.textContent = "✓ 已确认";
        row.classList.add("done");
        flash(row);
      });
      chkBox.appendChild(row);
    });
    box.appendChild(chkBox);
  }
  function safetyOK() {
    return checks.every(function (c) { return !c.mustPass || confirmed[c.id]; });
  }

  /* ---- 步骤回放 ---- */
  var replayBox = el("div", "chm-lab-replay", "");
  replayBox.style.display = "none";
  var idx = 0, playing = false, timer = null;
  var stepTag = el("div", "chm-replay-step", "");
  var caption = el("div", "chm-replay-caption", "");
  replayBox.appendChild(stepTag);
  replayBox.appendChild(caption);
  var bar = el("div", "chm-playbar", "");
  var prevB = el("button", "", "‹"), playB = el("button", "", "▶"),
      reB = el("button", "", "↺"), nextB = el("button", "", "›");
  [prevB, playB, reB, nextB].forEach(function (b) { b.type = "button"; });
  playB.setAttribute("aria-label", "播放步骤");
  function isHeatStep(i) {
    var c = (steps[i] && steps[i].caption) || "";
    return /加热|点火|点燃/.test(c);
  }
  function renderStep() {
    var st = steps[idx] || {};
    stepTag.textContent = "第 " + (idx + 1) + " 步 / 共 " + steps.length + " 步";
    caption.textContent = st.caption || "";
    /* CHEM-R38：字幕点名的部件 ∈ highlight 槽位 */
    (st.highlight || []).forEach(function (sid) {
      var sn = slotNodes[sid];
      if (sn) flash(sn);
    });
    playB.textContent = playing ? "⏸" : "▶";
    prevB.disabled = idx === 0;
    nextB.disabled = idx === steps.length - 1;
    if (isHeatStep(idx) && !safetyOK()) {
      nextB.disabled = true;
      caption.textContent += "（先通过上方安全检查点，才能进入加热/点火步骤）";
    }
  }
  function stop() {
    playing = false;
    if (timer) { clearInterval(timer); timer = null; }
    renderStep();
  }
  prevB.addEventListener("click", function () { stop(); if (idx > 0) { idx--; renderStep(); } });
  nextB.addEventListener("click", function () {
    if (isHeatStep(idx + 1) && !safetyOK()) {
      warn("先确认安全检查点，才能进入加热/点火步骤。");
      return;
    }
    stop(); if (idx < steps.length - 1) { idx++; renderStep(); }
  });
  playB.addEventListener("click", function () {
    if (playing) { stop(); return; }
    if (idx >= steps.length - 1) idx = 0;
    playing = true; renderStep();
    timer = setInterval(function () {
      if (isHeatStep(idx + 1) && !safetyOK()) { stop(); warn("先确认安全检查点，才能继续。"); return; }
      if (idx < steps.length - 1) { idx++; renderStep(); }
      else stop();
    }, 3000);
  });
  reB.addEventListener("click", function () { stop(); idx = 0; renderStep(); });
  bar.appendChild(prevB); bar.appendChild(playB);
  bar.appendChild(reB); bar.appendChild(nextB);
  replayBox.appendChild(bar);
  box.appendChild(replayBox);

  var modeBtn = el("button", "chm-q-check", "");
  modeBtn.type = "button";
  function syncModeBtn() {
    modeBtn.textContent = replayBox.style.display === "none" ? "▶ 看步骤回放" : "✎ 回到组装";
  }
  modeBtn.addEventListener("click", function () {
    var show = replayBox.style.display === "none";
    replayBox.style.display = show ? "" : "none";
    if (show) { stop(); idx = 0; renderStep(); }
    syncModeBtn();
  });
  syncModeBtn();
  box.appendChild(modeBtn);
  if (mode === "replay") modeBtn.click();

  /* realityNote 必填（CHEM-R37）；缺失则显式告警占位 */
  box.appendChild(el("div", "chm-note",
    "现实差异：" + (p.realityNote || "（缺少 realityNote——数据待补）")));
  box.appendChild(el("div", "chm-note", "气泡/液面为示意动画，非真实流体模拟。"));
  return box;
}

/* ============================================================
 * C6 · solution-mix（溶液配制模拟）
 * prepare：计算 → 称量 → 量取 → 溶解；dilute：计算 → 量取浓溶液 →
 * 加水 → 混匀（m₁w₁=m₂w₂，"溶质质量不变"徽章）。
 * 校验只给提示不判错；有效数字 sigFig（B2，默认 3）。
 * ============================================================ */
function widgetSolutionMix(p) {
  p = p || {};
  var mode = p.mode || "prepare";
  var solute = p.solute || { name: "溶质" };
  var target = p.target || {};
  var sigFig = p.sigFig || 3;
  var calcCheck = p.calcCheck !== false;

  var box = el("div", "chm-widget chm-sol", "");
  function sig(x) {
    if (!isFinite(x)) return "—";
    return Number(x).toPrecision(sigFig).replace(/\.?0+$/, function (m, off, s) {
      return s.indexOf(".") >= 0 && off === s.length - m.length ? "" : m;
    });
  }
  function sigFmt(x) {
    /* 有效数字 n 位：用 toPrecision，去多余尾零但保留精度语义 */
    if (!isFinite(x)) return "—";
    var s = Number(x).toPrecision(sigFig);
    if (s.indexOf("e") >= 0 || s.indexOf("E") >= 0) return s;
    if (s.indexOf(".") >= 0) s = s.replace(/0+$/, "").replace(/\.$/, "");
    return s;
  }

  var soluteMass, waterVol, concMass;  /* 标准值 */
  if (mode === "prepare") {
    soluteMass = target.mass * target.percent / 100;
    waterVol = target.mass - soluteMass;  /* 水密度 1g/mL（初中约定，注小字） */
  } else {
    /* dilute：{mass, percent, percentTarget} */
    concMass = target.mass * target.percentTarget / target.percent;
  }

  var title = el("div", "chm-sol-title", "");
  if (mode === "prepare") {
    title.textContent = "配制 " + target.mass + "g " + target.percent + "% " +
      solute.name + " 溶液";
  } else {
    title.textContent = "把 " + target.percent + "% " + solute.name + " 溶液稀释成 " +
      target.percentTarget + "%（共 " + target.mass + "g）";
  }
  box.appendChild(title);
  if (solute.hydrate) {
    box.appendChild(el("div", "chm-state chm-state-warn",
      "⚠ 溶质是 " + solute.name + "（无水物），不是晶体 " +
      (solute.hydrate || "") + " 本身。"));
  }

  var steps = mode === "prepare"
    ? ["计算", "称量", "量取", "溶解"]
    : ["计算", "量取浓溶液", "加水", "混匀"];
  var stepIdx = 0;
  var stepBar = el("div", "chm-sol-steps", "");
  function renderSteps() {
    stepBar.innerHTML = "";
    steps.forEach(function (s, i) {
      var d = el("span", "chm-sol-step" + (i < stepIdx ? " done" : i === stepIdx ? " cur" : ""),
        (i < stepIdx ? "✓ " : "") + (i + 1) + "·" + s);
      stepBar.appendChild(d);
    });
  }
  renderSteps();
  box.appendChild(stepBar);
  var stage = el("div", "chm-sol-stage", "");
  box.appendChild(stage);
  var fb = el("div", "chm-q-fb", "");
  box.appendChild(fb);
  function say(ok, msg) {
    fb.innerHTML = (ok ? '<span class="ok">✓ </span>' : '<span class="bad">✗ </span>') +
      esc(msg);
    flash(box);
  }
  function nextBtn(label, fn) {
    var b = el("button", "chm-q-check", label || "下一步 →");
    b.type = "button";
    b.addEventListener("click", fn);
    return b;
  }
  function numInput(ph) {
    var inp = document.createElement("input");
    inp.type = "text"; inp.inputMode = "decimal";
    inp.placeholder = ph || "";
    inp.setAttribute("aria-label", ph || "输入数值");
    inp.className = "chm-sol-input";
    return inp;
  }
  function closeEnough(a, b, tol) {
    return Math.abs(a - b) <= tol + 1e-9;
  }

  function showCalc() {
    stage.innerHTML = "";
    stage.appendChild(el("div", "chm-sol-h", "第 1 步 · 计算（先算对，再动手）"));
    if (!calcCheck) {
      if (mode === "prepare") {
        stage.appendChild(el("div", "chm-text",
          "溶质质量 = " + target.mass + "g × " + target.percent + "% = " +
          sigFmt(soluteMass) + "g；水 = " + target.mass + " − " +
          sigFmt(soluteMass) + " = " + sigFmt(waterVol) + "mL。"));
      } else {
        stage.appendChild(el("div", "chm-text",
          "需浓溶液质量 = " + target.mass + "g × " + target.percentTarget + "% ÷ " +
          target.percent + "% = " + sigFmt(concMass) + "g；加水 " +
          sigFmt(target.mass - concMass) + "g。"));
      }
      stage.appendChild(nextBtn("已理解，下一步 →", function () {
        stepIdx = 1; renderSteps(); showWeigh();
      }));
      return;
    }
    if (mode === "prepare") {
      stage.appendChild(el("div", "chm-text", "需要称取 " + solute.name + " 多少克？"));
      var i1 = numInput("溶质质量 / g");
      stage.appendChild(i1);
      stage.appendChild(el("div", "chm-text", "需要量取水多少毫升？（水的密度按 1g/mL）"));
      var i2 = numInput("水的体积 / mL");
      stage.appendChild(i2);
      var b = nextBtn("核对", function () {
        var v1 = parseFloat(i1.value), v2 = parseFloat(i2.value);
        var ok1 = closeEnough(v1, soluteMass, 0.1), ok2 = closeEnough(v2, waterVol, 0.1);
        if (ok1 && ok2) {
          say(true, "算对了：" + sigFmt(soluteMass) + "g " + solute.name +
            " + " + sigFmt(waterVol) + "mL 水。");
          record();
          stage.appendChild(nextBtn("下一步：称量 →", function () {
            stepIdx = 1; renderSteps(); showWeigh();
          }));
          b.disabled = true;
        } else {
          say(false, "再想想：溶质质量 = 溶液质量 × 质量分数；水 = 溶液 − 溶质。");
        }
      });
      stage.appendChild(b);
    } else {
      stage.appendChild(el("div", "chm-text", "需要量取 " + target.percent + "% 浓溶液多少克？"));
      var i3 = numInput("浓溶液质量 / g");
      stage.appendChild(i3);
      var b2 = nextBtn("核对", function () {
        var v = parseFloat(i3.value);
        if (closeEnough(v, concMass, 0.1)) {
          say(true, "算对了：量取 " + sigFmt(concMass) + "g 浓溶液，再加水至 " +
            target.mass + "g。");
          stage.appendChild(nextBtn("下一步：量取 →", function () {
            stepIdx = 1; renderSteps(); showWeigh();
          }));
          b2.disabled = true;
        } else {
          say(false, "再想想：m(浓)×w(浓) = m(稀)×w(稀)，先求浓溶液质量。");
        }
      });
      stage.appendChild(b2);
    }
  }
  function showWeigh() {
    stage.innerHTML = "";
    if (mode === "prepare") {
      stage.appendChild(el("div", "chm-sol-h", "第 2 步 · 称量（托盘天平示意）"));
      stage.appendChild(el("div", "chm-text",
        "天平读数 = 砝码 + 游码。目标：" + sigFmt(soluteMass) + "g " + solute.name + "。"));
      /* 砝码按钮 + 游码滑块（示意；规范读数练习见仪表读数器） */
      var weights = [10, 5, 2, 1];
      var picked = [];
      var wrow = el("div", "chm-btn-row", "");
      weights.forEach(function (w) {
        var b = el("button", "", w + "g");
        b.type = "button";
        b.setAttribute("aria-pressed", "false");
        b.addEventListener("click", function () {
          var i = picked.indexOf(w);
          if (i >= 0) { picked.splice(i, 1); b.setAttribute("aria-pressed", "false"); }
          else { picked.push(w); b.setAttribute("aria-pressed", "true"); }
          updW();
        });
        wrow.appendChild(b);
      });
      stage.appendChild(wrow);
      var rider = uiSlider({
        label: "游码", min: 0, max: 1, step: 0.1, init: 0, unit: "g",
        fmt: function (v) { return fmtN(v, 1) + " g"; }
      });
      stage.appendChild(rider.row);
      var wread = el("div", "chm-readline", "");
      stage.appendChild(wread);
      function total() {
        var s = rider.get();
        picked.forEach(function (w) { s += w; });
        return Math.round(s * 10) / 10;
      }
      function updW() {
        wread.innerHTML = "天平读数：" + fmtN(total(), 1) + " g（估读到下一位）";
      }
      rider.on(updW); updW();
      stage.appendChild(nextBtn("称量完成 →", function () {
        if (closeEnough(total(), soluteMass, 0.1)) {
          say(true, "称量 ✓：" + fmtN(total(), 1) + "g。");
          stepIdx = 2; renderSteps(); showMeasure();
        } else {
          say(false, "读数还不对（目标 " + sigFmt(soluteMass) +
            "g，容差 ±0.1g）——调砝码和游码。");
        }
      }));
    } else {
      /* dilute 第 2 步：量取浓溶液（简化为读数确认） */
      stage.innerHTML = "";
      stage.appendChild(el("div", "chm-sol-h", "第 2 步 · 量取浓溶液"));
      stage.appendChild(el("div", "chm-text",
        "用量筒量取 " + sigFmt(concMass) + "g 浓溶液（稀溶液密度近似按 1g/mL，" +
        "即 " + sigFmt(concMass) + "mL；体积稀释以后再学）。"));
      stage.appendChild(nextBtn("已量取，下一步 →", function () {
        stepIdx = 2; renderSteps(); showAddWater();
      }));
    }
  }
  function showMeasure() {
    stage.innerHTML = "";
    stage.appendChild(el("div", "chm-sol-h", "第 3 步 · 量取（量筒示意）"));
    stage.appendChild(el("div", "chm-text",
      "目标：" + sigFmt(waterVol) + "mL 水。视线要水平——俯视偏大、仰视偏小。"));
    var cyl = uiSlider({
      label: "量筒读数", min: 0, max: Math.ceil(waterVol * 1.4),
      step: 1, init: 0, unit: "mL",
      fmt: function (v) { return fmtN(v, 0) + " mL"; }
    });
    stage.appendChild(cyl.row);
    stage.appendChild(nextBtn("量取完成 →", function () {
      if (closeEnough(cyl.get(), waterVol, 1)) {
        say(true, "量取 ✓：" + fmtN(cyl.get(), 0) + "mL。");
        stepIdx = 3; renderSteps(); showDissolve();
      } else {
        say(false, "还不对（目标 " + sigFmt(waterVol) + "mL，容差 ±1mL）——再调。");
      }
    }));
  }
  function showAddWater() {
    stage.innerHTML = "";
    stage.appendChild(el("div", "chm-sol-h", "第 3 步 · 加水"));
    stage.appendChild(el("div", "chm-text",
      "向浓溶液中加水至总质量 " + target.mass + "g（加水 " +
      sigFmt(target.mass - concMass) + "g），边加边搅拌。"));
    stage.appendChild(nextBtn("加水完成 →", function () {
      stepIdx = 3; renderSteps(); showDissolve();
    }));
  }
  function showDissolve() {
    stage.innerHTML = "";
    stage.appendChild(el("div", "chm-sol-h",
      "第 4 步 · " + (mode === "prepare" ? "溶解" : "混匀")));
    var b = nextBtn(mode === "prepare" ? "搅拌溶解" : "搅拌混匀", function () {
      b.disabled = true;
      var done = el("div", "chm-state chm-state-ok", "");
      if (mode === "prepare") {
        done.textContent = "✓ " + target.mass + "g " + target.percent + "% " +
          solute.name + " 溶液配制完成";
      } else {
        done.innerHTML = "";
        done.appendChild(el("div", "",
          "✓ 稀释完成：" + target.mass + "g " + target.percentTarget + "% 溶液"));
        if (mathmlOK()) {
          var mm = document.createElement("div");
          mm.innerHTML = "<math><mrow><mi>m</mi><mo>(</mo><mi>浓</mi><mo>)</mo>" +
            "<mo>×</mo><mi>w</mi><mo>(</mo><mi>浓</mi><mo>)</mo><mo>=</mo>" +
            "<mi>m</mi><mo>(</mo><mi>稀</mi><mo>)</mo><mo>×</mo><mi>w</mi>" +
            "<mo>(</mo><mi>稀</mi><mo>)</mo></mrow></math>";
          done.appendChild(mm);
        } else {
          done.appendChild(el("div", "", "m(浓)×w(浓) = m(稀)×w(稀)"));
        }
        done.appendChild(el("div", "", "✓ 稀释前后溶质质量不变"));
      }
      stage.appendChild(done);
      flash(done); vib(20);
      say(true, mode === "prepare"
        ? "配制四步走完：计算、称量、量取、溶解。"
        : "稀释四步走完：计算、量取浓溶液、加水、混匀。加的是水，溶质一分没多。");
      record();
    });
    stage.appendChild(b);
  }
  function record() {
    if (p.recordKey) store(p.recordKey, { done: true, ts: Date.now() });
  }
  showCalc();
  box.appendChild(el("div", "chm-note", "量取水的 mL 数按密度 1g/mL 换算（初中约定）。"));
  return box;
}

/* ============================================================
 * C7 · reaction-particle（反应过程粒子动画）
 *
 * 关键帧插值示意（非分子动力学模拟，降级声明常驻）。
 * 计数器表头写"原子个数"（CHEM-R41）；全等 → "原子种类、个数都不变 ✓"。
 * 计数口径：左 = 反应物粒子原子数；右 = 生成物粒子原子数，
 *   其中生成物侧"分子/离子优先"（中间态原子不计入，避免 cm01
 *   水电解"拆开原子 + 重组分子"双列导致的重复计数）；
 *   某元素只在原子态生成物中出现时（如 Cu）计入原子态。
 * B4 常驻；粒子只读（不可拖，W-C6）。
 * ============================================================ */
function widgetReactionParticle(p) {
  p = p || {};
  var reaction = p.reaction || {};
  var particles = p.particles || [];
  var keyframes = p.keyframes || [];
  var counter = p.counter !== false;
  var spectatorFade = p.spectatorFade !== false;
  var slowmo = p.slowmo !== false;
  var VW = 100, VH = 60;

  var box = el("div", "chm-widget chm-rp", "");
  /* 方程式头 */
  var eqHead = el("div", "chm-rp-eq", "");
  if (reaction.equation && mathmlOK()) eqHead.innerHTML = reaction.equation;
  else eqHead.textContent = reaction.equationText || "";
  box.appendChild(eqHead);

  var svg = svgEl("svg", {
    viewBox: "0 0 " + VW + " " + VH, role: "img",
    "aria-label": "反应微观过程示意", "class": "chm-rp-stage"
  });
  box.appendChild(svg);

  /* 粒子实例：particles × count 展开 */
  var insts = [];  /* {pid, def, x, y, hx, hy, g, visible, merged} */
  (function layout() {
    var left = [], right = [];
    particles.forEach(function (pd) {
      for (var c = 0; c < (pd.count || 1); c++) {
        var it = { pid: pd.id, def: pd, x: 0, y: 0, hx: 0, hy: 0, visible: true, merged: false };
        (pd.role === "product" ? right : left).push(it);
        insts.push(it);
      }
    });
    function spread(arr, x0, x1) {
      arr.forEach(function (it, i) {
        var n = arr.length;
        it.x = it.hx = n === 1 ? (x0 + x1) / 2 : x0 + (x1 - x0) * (i / (n - 1));
        it.y = it.hy = VH / 2 + ((i % 2) ? -9 : 9) + ((i % 3) - 1) * 4;
      });
    }
    spread(left, 8, 42); spread(right, 58, 92);
  })();

  function ballLook(def) {
    var label = def.label || "", ch = def.charge;
    var txt = label + fmtCharge(ch);
    if (def.kind === "ion") {
      var cs = chargeSign(ch);
      return {
        bg: cs >= 0 ? "var(--chm-cation)" : "var(--chm-anion)",
        fg: "#FFFFFF", txt: txt, r: 6.5
      };
    }
    if (def.kind === "molecule") {
      return { bg: "#CFCFCF", fg: "#1A1A1A", txt: label, r: 7, formula: true };
    }
    var st = atomStyle(firstElement(label));
    return { bg: st.bg, fg: st.fg, txt: txt, r: 6, formula: !ch };
  }
  function paintInstance(it) {
    var g = svgEl("g", { "class": "chm-rp-p" });
    var lk = ballLook(it.def);
    g.appendChild(svgEl("circle", {
      cx: it.x, cy: it.y, r: lk.r, fill: lk.bg,
      stroke: "#00000055", "stroke-width": 0.6,
      opacity: it.visible ? 1 : 0.14
    }));
    if (lk.formula) {
      svgFormulaText(g, it.x, it.y + 2.2, lk.txt, 5, lk.fg);
      g.lastChild.setAttribute("opacity", it.visible ? 1 : 0.14);
    } else {
      var t = svgEl("text", {
        x: it.x, y: it.y + 2.4, "text-anchor": "middle", "font-size": 4.8,
        "font-weight": "700", fill: lk.fg, opacity: it.visible ? 1 : 0.14
      });
      t.textContent = lk.txt;
      g.appendChild(t);
    }
    /* 旁观离子标注（spectatorFade:false 时保留 + 文字标注，CHEM-R46） */
    if (it.def.role === "spectator" && !spectatorFade && it.visible) {
      var s = svgEl("text", {
        x: it.x, y: it.y - lk.r - 2, "text-anchor": "middle",
        "font-size": 3.6, fill: "var(--chm-ink-soft)"
      });
      s.textContent = "旁观离子";
      g.appendChild(s);
    }
    return g;
  }
  /* 关键帧状态：frame i → {pos, vis, mergedLabel} */
  function frameState(i) {
    var st = {};
    insts.forEach(function (it) {
      st[it.pid + "@" + insts.indexOf(it)] = {
        x: it.hx, y: it.hy, vis: true, merged: null, k: insts.indexOf(it)
      };
    });
    function key(it) { return it.pid + "@" + insts.indexOf(it); }
    for (var f = 0; f <= i && f < keyframes.length; f++) {
      var kf = keyframes[f];
      (kf.moves || []).forEach(function (mv) {
        insts.forEach(function (it) {
          if (it.pid === mv.id) {
            /* from/to 为逻辑坐标（y 向下绘制；方向无化学语义） */
            st[key(it)].x = mv.to ? mv.to[0] : st[key(it)].x;
            st[key(it)].y = mv.to ? mv.to[1] : st[key(it)].y;
          }
        });
      });
      (kf.fade || []).forEach(function (pid) {
        insts.forEach(function (it) {
          if (it.pid === pid) st[key(it)].vis = spectatorFade ? false : true;
        });
      });
      (kf.form || []).forEach(function (fm) {
        var cx = 0, cy = 0, n = 0;
        (fm.ids || []).forEach(function (pid) {
          insts.forEach(function (it) {
            if (it.pid === pid && st[key(it)].vis !== false) {
              cx += st[key(it)].x; cy += st[key(it)].y; n++;
              st[key(it)].vis = false;
            }
          });
        });
        if (n > 0) {
          st["__form" + f + fm.label] = {
            x: cx / n, y: cy / n, vis: true, merged: fm.label, k: -1
          };
        }
      });
    }
    return st;
  }
  var curFrame = 0, playing = false, timer = null, speed = 1;
  var caption = el("div", "chm-replay-caption", "");
  var stepTag = el("div", "chm-replay-step", "");
  var mergedLayer = null;

  function renderFrame(animate) {
    var st = frameState(curFrame);
    svg.innerHTML = "";
    var order = Object.keys(st).sort(function (a, b) {
      return st[a].k - st[b].k;
    });
    order.forEach(function (k) {
      var s = st[k];
      if (s.merged) {
        var g = svgEl("g", {});
        g.appendChild(svgEl("circle", {
          cx: s.x, cy: s.y, r: 7.5, fill: "#CFCFCF",
          stroke: "#00000055", "stroke-width": 0.6
        }));
        svgFormulaText(g, s.x, s.y + 2.4, s.merged, 5.2, "#1A1A1A");
        svg.appendChild(g);
        return;
      }
      var it = insts[s.k];
      if (!it) return;
      var lk = ballLook(it.def);
      var g2 = svgEl("g", {});
      g2.appendChild(svgEl("circle", {
        cx: s.x, cy: s.y, r: lk.r, fill: lk.bg,
        stroke: "#00000055", "stroke-width": 0.6,
        opacity: s.vis ? 1 : (spectatorFade && it.def.role === "spectator" ? 0.14 : 1)
      }));
      if (lk.formula) {
        var gg = svgEl("g", {});
        svgFormulaText(gg, s.x, s.y + 2.2, lk.txt, 5, lk.fg);
        g2.appendChild(gg);
      } else {
        var t = svgEl("text", {
          x: s.x, y: s.y + 2.4, "text-anchor": "middle", "font-size": 4.8,
          "font-weight": "700", fill: lk.fg
        });
        t.textContent = lk.txt;
        g2.appendChild(t);
      }
      if (it.def.role === "spectator" && !spectatorFade && s.vis) {
        var sp = svgEl("text", {
          x: s.x, y: s.y - lk.r - 2, "text-anchor": "middle",
          "font-size": 3.6, fill: "var(--chm-ink-soft)"
        });
        sp.textContent = "旁观离子";
        g2.appendChild(sp);
      }
      svg.appendChild(g2);
    });
    /* 电子转移（eTransfer）：箭头从失电子元素指向得电子元素（CHEM-R47） */
    if (reaction.eTransfer) {
      var arrow = reaction.arrow || null;
      /* e⁻ 小点（示意） */
      for (var d = 0; d < 3; d++) {
        svg.appendChild(svgEl("circle", {
          cx: 44 + d * 4, cy: 12, r: 1.6, fill: "var(--chm-electron)", stroke: "none"
        }));
      }
      var et = svgEl("text", {
        x: 50, y: 8, "text-anchor": "middle", "font-size": 4.4,
        fill: "var(--chm-ink)"
      });
      et.textContent = "e⁻（示意）";
      svg.appendChild(et);
      if (arrow && arrow.from && arrow.to) {
        /* 起点：含 from 标签的反应物实例中心；终点：含 to 标签的实例中心 */
        function centerOf(label, role) {
          var cx = 0, cy = 0, n = 0;
          insts.forEach(function (it) {
            if (it.def.label === label && (!role || it.def.role === role)) {
              var s2 = frameState(curFrame)[it.pid + "@" + insts.indexOf(it)];
              if (s2 && s2.vis !== false) { cx += s2.x; cy += s2.y; n++; }
            }
          });
          return n ? [cx / n, cy / n] : null;
        }
        var A = centerOf(arrow.from, "reactant") || centerOf(arrow.from);
        var B = centerOf(arrow.to, "product") || centerOf(arrow.to);
        if (A && B) {
          var dx = B[0] - A[0], dy = B[1] - A[1], L = Math.hypot(dx, dy) || 1;
          var ux = dx / L, uy = dy / L;
          var x1 = A[0] + ux * 8, y1 = A[1] + uy * 8;
          var x2 = B[0] - ux * 8, y2 = B[1] - uy * 8;
          svg.appendChild(svgEl("line", {
            x1: x1, y1: y1, x2: x2, y2: y2,
            stroke: "var(--chm-lose-e)", "stroke-width": 1.6
          }));
          var ah = 3;
          svg.appendChild(svgEl("path", {
            d: "M" + x2 + "," + y2 + " l" + (-ux * ah - uy * ah * 0.6) + "," +
              (-uy * ah + ux * ah * 0.6) + " l" + (uy * ah * 1.2) + "," +
              (-ux * ah * 1.2) + " Z",
            fill: "var(--chm-lose-e)", stroke: "none"
          }));
          var at = svgEl("text", {
            x: (x1 + x2) / 2, y: (y1 + y2) / 2 - 3, "text-anchor": "middle",
            "font-size": 4.2, fill: "var(--chm-ink)"
          });
          at.textContent = "电子：从" + arrow.from + "（失）→ " + arrow.to + "（得）";
          svg.appendChild(at);
        }
      }
    }
    var kf = keyframes[curFrame] || {};
    caption.textContent = kf.caption || "";
    stepTag.textContent = keyframes.length ?
      "第 " + (curFrame + 1) + " 帧 / 共 " + keyframes.length + " 帧" : "";
    if (playB) {
      playB.textContent = playing ? "⏸" : "▶";
      prevB.disabled = curFrame === 0;
      nextB.disabled = curFrame === keyframes.length - 1;
      if (scrub) { scrub.max = Math.max(0, keyframes.length - 1); scrub.value = curFrame; }
    }
  }
  /* 播放控制（▶/⏸/↺/scrubber + 慢放 0.5× + 逐帧，W-C6） */
  var bar = el("div", "chm-playbar", "");
  var prevB = el("button", "", "‹"), playB = el("button", "", "▶"),
      reB = el("button", "", "↺"), nextB = el("button", "", "›");
  [prevB, playB, reB, nextB].forEach(function (b) { b.type = "button"; });
  var scrub = document.createElement("input");
  scrub.type = "range"; scrub.className = "chm-slider chm-scrub";
  scrub.min = 0; scrub.step = 1; scrub.value = 0;
  scrub.setAttribute("aria-label", "动画进度");
  scrub.addEventListener("input", function () {
    stop(); curFrame = parseInt(scrub.value, 10) || 0; renderFrame();
  });
  var slowB = el("button", "", "0.5× 慢放");
  slowB.type = "button";
  slowB.setAttribute("aria-pressed", "false");
  slowB.addEventListener("click", function () {
    speed = speed === 1 ? 0.5 : 1;
    slowB.setAttribute("aria-pressed", speed === 0.5 ? "true" : "false");
    slowB.textContent = speed === 0.5 ? "0.5× 慢放（开）" : "0.5× 慢放";
    if (playing) { stop(); play(); }
  });
  function stop() {
    playing = false;
    if (timer) { clearInterval(timer); timer = null; }
    renderFrame();
  }
  function play() {
    if (curFrame >= keyframes.length - 1) curFrame = 0;
    playing = true; renderFrame();
    timer = setInterval(function () {
      if (curFrame < keyframes.length - 1) { curFrame++; renderFrame(); }
      else stop();
    }, Math.round(2600 / speed));
  }
  prevB.addEventListener("click", function () {
    stop(); if (curFrame > 0) { curFrame--; renderFrame(); }
  });
  nextB.addEventListener("click", function () {
    stop(); if (curFrame < keyframes.length - 1) { curFrame++; renderFrame(); }
  });
  playB.addEventListener("click", function () { if (playing) stop(); else play(); });
  playB.setAttribute("aria-label", "播放/暂停");
  reB.addEventListener("click", function () { stop(); curFrame = 0; renderFrame(); });
  reB.setAttribute("aria-label", "从头播放");
  bar.appendChild(prevB); bar.appendChild(playB);
  bar.appendChild(reB); bar.appendChild(nextB);
  bar.appendChild(scrub);
  if (slowmo) bar.appendChild(slowB);
  box.appendChild(stepTag);
  box.appendChild(caption);
  box.appendChild(bar);
  box.appendChild(el("div", "chm-note", "示意动画，非真实速率；粒子只读，不可拖拽。"));

  /* 计数器（CHEM-R41：表头"原子个数"；CHEM-R42：左右全等） */
  if (counter && particles.length) {
    function sideCounts(role) {
      var hasMolIon = {};
      particles.forEach(function (pd) {
        if (pd.role !== role) return;
        if (pd.kind === "molecule" || pd.kind === "ion") {
          var c = countAtoms(pd.label);
          for (var e in c) hasMolIon[e] = 1;
        }
      });
      var counts = {};
      particles.forEach(function (pd) {
        if (pd.role !== role) return;
        var use = true;
        if (pd.kind === "atom") {
          /* 生成物侧：某元素已有分子/离子态时，中间态原子不计入 */
          var c = countAtoms(pd.label);
          use = !Object.keys(c).every(function (e) { return hasMolIon[e]; });
          if (role !== "product") use = true;
        }
        if (!use) return;
        var cc = countAtoms(pd.label), n = pd.count || 1;
        for (var e2 in cc) counts[e2] = (counts[e2] || 0) + cc[e2] * n;
      });
      return counts;
    }
    var L = sideCounts("reactant"), R = sideCounts("product");
    /* spectator 也属于 product 角色，已在 particles role 中体现 */
    var elems = {};
    Object.keys(L).forEach(function (e) { elems[e] = 1; });
    Object.keys(R).forEach(function (e) { elems[e] = 1; });
    var tbl = el("table", "chm-count-table", "");
    tbl.appendChild(el("tr", "",
      "<th>元素</th><th>反应前 · 原子个数</th><th>反应后 · 原子个数</th><th></th>"));
    var allEq = true;
    Object.keys(elems).sort().forEach(function (e) {
      var l = L[e] || 0, r = R[e] || 0, same = l === r;
      if (!same) allEq = false;
      tbl.appendChild(el("tr", "",
        "<td>" + esc(e) + "</td><td>" + l + "</td><td>" + r + "</td>" +
        '<td class="' + (same ? "chm-eq-ok" : "") + '">' + (same ? "✓" : "✗") + "</td>"));
    });
    box.appendChild(tbl);
    if (allEq && Object.keys(elems).length) {
      box.appendChild(el("div", "chm-state chm-state-ok", "✓ 原子种类、个数都不变"));
    }
  }
  renderFrame();  /* 初始渲染：舞台第一帧（修：此前漏调，SVG 为空） */
  /* B4 常驻 */
  box.appendChild(scaleNote(p));
  return box;
}

/* ============================================================
 * C8 · ph-scale（pH 试纸/标尺）
 * 拖溶液到试纸 → 试纸变色 + pH 读数（无单位）+ 酸碱性文字徽章；
 * pH 滑块联动 c(H⁺) 对数条（pH 差 1 ↔ 条长 ×10/÷10，CHEM-R20）。
 * 与 Y10 分工：C8 练 pH 含义，Y10 练读数规范。
 * ============================================================ */
function widgetPhScale(p) {
  p = p || {};
  var solutions = p.solutions || [];
  var mode = p.mode || "intuitive";
  var tenfold = p.tenfoldViz !== false;
  var colors = p.paperColors || PH_COLORS;
  var phS = (p.phSlider || {});
  var cur = phS.init != null ? phS.init : 7;

  var box = el("div", "chm-widget chm-ph", "");
  /* 溶液瓶托盘 */
  var tray = el("div", "chm-ph-tray", "");
  solutions.forEach(function (s) {
    var b = el("button", "chm-ph-bottle", "🧪 " + s.name);
    b.type = "button";
    b.setAttribute("aria-label", "把" + s.name + "滴到试纸上（pH " + s.ph + "）");
    b.addEventListener("click", function () { setPh(s.ph); });
    dragFrom(b, {
      canDrop: function (x, y) {
        var r = paperZone.getBoundingClientRect();
        if (x >= r.left && x <= r.right && y >= r.top && y <= r.bottom) return paperZone;
        return null;
      },
      onDrop: function () { setPh(s.ph); flash(paperZone); }
    });
    tray.appendChild(b);
  });
  box.appendChild(tray);

  /* 试纸区 */
  var paperZone = el("div", "chm-ph-paperzone", "");
  paperZone.setAttribute("data-drop", "paper");
  var paper = el("div", "chm-ph-paper", "pH 试纸");
  paperZone.appendChild(paper);
  var readout = el("div", "chm-readline", "");
  paperZone.appendChild(readout);
  var badge = el("div", "chm-state", "");
  paperZone.appendChild(badge);
  box.appendChild(paperZone);

  function acidBase(ph) {
    if (ph < 7) return { t: "酸性", cls: "chm-ph-acid" };
    if (ph > 7) return { t: "碱性", cls: "chm-ph-base" };
    return { t: "中性", cls: "chm-ph-neutral" };
  }
  function setPh(v) {
    cur = Math.max(0, Math.min(14, Math.round(v)));
    slider.set(cur, true);
    paint();
  }
  function paint() {
    var c = colors[cur] || "#CCCCCC";
    paper.style.background = c;
    paper.style.color = "#1A1A1A";
    var ab = acidBase(cur);
    badge.className = "chm-state " + ab.cls;
    badge.textContent = ab.t + "（pH = " + cur + "）";
    /* 读数行 MathML：pH 无单位（CHEM-R18） */
    readout.innerHTML = mathmlOK()
      ? "<math><mi>pH</mi><mo>=</mo><mn>" + cur + "</mn></math>"
      : "pH = " + cur;
    if (mode === "strict") {
      var ch = Math.pow(10, -cur);
      var cr = el("div", "chm-readline", "");
      cr.innerHTML = mathmlOK()
        ? "<math><mrow><mi>c</mi><mo>(</mo><msup><mi>H</mi><mo>+</mo></msup>" +
          "<mo>)</mo><mo>=</mo><mn>10</mn><msup><mrow></mrow><mn>" + (-cur) +
          "</mn></msup><mtext> mol/L</mtext></mrow></math>"
        : "c(H⁺) = 10^(" + (-cur) + ") mol/L";
      readout.appendChild(cr);
    }
    paintTenfold();
  }
  /* c(H⁺) 10 倍条（对数刻度，CHEM-R20） */
  var tenBox = el("div", "chm-ph-ten", "");
  box.appendChild(tenBox);
  function paintTenfold() {
    tenBox.innerHTML = "";
    if (!tenfold) return;
    /* 条长 ∝ 10^(7−pH)：pH 差 1 → ×10/÷10（相对偏差 0，精确对数） */
    var rel = Math.pow(10, 7 - cur);
    var wPct = Math.max(2, Math.min(100, 8 * Math.pow(10, (7 - cur) / 7) * 12.5));
    /* 简化映射：pH=7 → 约 50%；每差 1 个 pH 条长 ×10^(1/2)（视觉可辨），
     * 文字标注精确倍数（教学诚实：条为示意，倍数精确）。 */
    wPct = Math.max(3, Math.min(100, 50 * Math.pow(Math.sqrt(10), 7 - cur) / 8));
    var bar = el("div", "chm-ph-tenbar", "");
    bar.style.width = wPct + "%";
    tenBox.appendChild(el("div", "chm-ph-tenlab",
      "c(H⁺) 相对大小（对数条，示意）："));
    tenBox.appendChild(bar);
    tenBox.appendChild(el("div", "chm-ph-tennum",
      "pH = " + cur + " 时，c(H⁺) 是 pH = 7 时的 " +
        (rel >= 1 ? rel.toLocaleString("en-US") : "1/" + Math.round(1 / rel)) +
        " 倍"));
    tenBox.appendChild(el("div", "chm-note",
      "pH 差 1，c(H⁺) 差 10 倍——pH 是\"浓度的密码\"。"));
  }

  /* pH 滑块（± 步进） */
  var slider = uiSlider({
    label: "pH", min: phS.min != null ? phS.min : 0,
    max: phS.max != null ? phS.max : 14, step: phS.step || 1, init: cur, unit: "",
    fmt: function (v) { return "pH = " + v; }
  });
  slider.on(function (v) { cur = v; paint(); });
  box.appendChild(slider.row);
  var stepRow = el("div", "chm-btn-row", "");
  var mBtn = el("button", "", "−"), pBtn = el("button", "", "＋");
  mBtn.type = "button"; pBtn.type = "button";
  mBtn.setAttribute("aria-label", "pH 减 1"); pBtn.setAttribute("aria-label", "pH 加 1");
  mBtn.addEventListener("click", function () { setPh(cur - 1); });
  pBtn.addEventListener("click", function () { setPh(cur + 1); });
  stepRow.appendChild(mBtn); stepRow.appendChild(pBtn);
  box.appendChild(stepRow);

  paint();
  box.appendChild(el("div", "chm-note", "试纸测大概，精确用 pH 计。（W-C20）"));
  box.appendChild(el("div", "chm-note",
    "0–14 是常用范围；超浓酸的 pH 可小于 0（直观版）。"));
  return box;
}

/* ============================================================
 * C9 · rate-equilibrium（速率与平衡）
 *
 * v–t 示意曲线（指数趋近，B3 冻结公式，非真实动力学模拟）：
 *   v(t) = v∞(1−e^(−kt))；k 取值、v∞ 与滑块映射公式冻结见下。
 * 徽章 "v(正) = v(逆) ≠ 0 · 动态平衡 ✓"（≠0 必须渲染，CHEM-R59）。
 * 催化剂开关：两线同等变陡、平衡位置（vEq 高度）不动（CHEM-R63）。
 * 定量模式：K 只随温度变（kTable 配表，B13.7），Qc 随浓度/压强变。
 *
 * ---- 冻结映射公式（B3，白队可独立重算） ----
 * 设滑块归一化：cn = conc/initC，tn = (temp−initT)/100，pn = pressure/initP。
 * vF∞ = 50·cn·(1+0.3·tn)·pn^((fwd−rev)/4)
 * vR∞ = 50·(1+0.3·tn)·pn^((rev−fwd)/4)
 * vEq = (vF∞ + vR∞)/2；显示线按 F += (vF∞−F)·a 等指数趋近。
 * 催化剂开：a ×2（两线同等变陡），vEq 不变。
 * 定量：K = kTable 在温度点的配表值（线性插值）；Qc = K0·(initC/conc)^fwd
 *   （K0 = 初始温度点 K 值；仅随浓度/压强变，不随温度变）。
 * ============================================================ */
function widgetRateEquilibrium(p) {
  p = p || {};
  var reaction = p.reaction || {};
  var sliders = p.sliders || {};
  var mode = p.mode || "qualitative";
  var gs = reaction.gasStoich || { fwd: 1, rev: 1 };
  var kTable = p.kTable || null;
  var catalystOn = false;

  var box = el("div", "chm-widget chm-c9", "");
  var eqLine = el("div", "chm-c9-eq", esc(reaction.equationText || ""));
  box.appendChild(eqLine);

  var canvas = document.createElement("canvas");
  canvas.className = "chm-c9-cv";
  canvas.setAttribute("role", "img");
  canvas.setAttribute("aria-label", "v(正)/v(逆) 随时间变化示意曲线");
  box.appendChild(canvas);
  /* 图例（双编码：颜色 + 线型 + 文字，CHEM-R27） */
  var legend = el("div", "chm-c9-legend", "");
  legend.innerHTML =
    '<span class="lg-f"><span class="sw solid"></span>v(正)（实线）</span>' +
    '<span class="lg-r"><span class="sw dash"></span>v(逆)（虚线）</span>';
  box.appendChild(legend);

  var badge = el("div", "chm-state", "");
  badge.style.minHeight = "44px";  /* 徽章区固定高度，防抖动 */
  box.appendChild(badge);
  var shiftLine = el("div", "chm-note", "");
  box.appendChild(shiftLine);
  var readLine = el("div", "chm-readline", "");
  box.appendChild(readLine);

  /* 滑块 */
  var sVals = {}, sDefs = {};
  Object.keys(sliders).forEach(function (k) {
    var sd = sliders[k];
    sDefs[k] = sd;
    var sl = uiSlider({
      label: sd.label || k, min: sd.min, max: sd.max, step: sd.step,
      init: sd.init, unit: "",
      fmt: function (v) { return fmtN(v, 0); }
    });
    if (k === "pressure" && !(gs.fwd && gs.rev)) {
      sl.input.disabled = true;
      var nz = el("div", "chm-note", "压强只影响有气体参与的平衡（本反应无气体计量数，滑块置灰）。");
      box.appendChild(nz);
    }
    sl.on(function () { disturb(); });
    sVals[k] = sl;
    box.appendChild(sl.row);
  });
  function gv(k) { return sVals[k] ? sVals[k].get() : (sDefs[k] || {}).init || 1; }
  function gi(k) { return (sDefs[k] || {}).init || 1; }

  /* 冻结映射 */
  function targets() {
    var cn = gv("conc") / gi("conc");
    var tn = (gv("temp") - gi("temp")) / 100;
    var pn = gv("pressure") / gi("pressure");
    var eF = (gs.fwd - gs.rev) / 4, eR = (gs.rev - gs.fwd) / 4;
    var vF = 50 * cn * (1 + 0.3 * tn) * Math.pow(pn, eF);
    var vR = 50 * (1 + 0.3 * tn) * Math.pow(pn, eR);
    return { vF: vF, vR: vR, vEq: (vF + vR) / 2 };
  }
  var F = 50, R = 50, vEq = 50, tF = 50, tR = 50;
  var hist = [];  /* strip chart: [{f, r}] */
  var moving = false, moveTimer = 0;
  function disturb() {
    var t = targets();
    /* 扰动：两线瞬间跳到新 v∞，再指数趋近新 vEq（经典 v–t 图像） */
    F = t.vF; R = t.vR; vEq = t.vEq; tF = t.vF; tR = t.vR;
    moving = true; moveTimer = 0;
    paintBadge();
    paintReadout();
  }
  function kOfTemp(T) {
    if (!kTable || !kTable.length) return null;
    var pts = kTable.slice().sort(function (a, b) { return a.temp - b.temp; });
    if (T <= pts[0].temp) return pts[0].K;
    for (var i = 1; i < pts.length; i++) {
      if (T <= pts[i].temp) {
        var a = pts[i - 1], b = pts[i];
        return a.K + (b.K - a.K) * (T - a.temp) / (b.temp - a.temp);
      }
    }
    return pts[pts.length - 1].K;
  }
  var K0 = kOfTemp(gi("temp"));
  function paintBadge() {
    var diff = Math.abs(F - R) / Math.max(1, vEq);
    if (moving && diff > 0.03) {
      badge.className = "chm-state chm-state-warn";
      badge.textContent = "平衡移动中…（两线分开）";
    } else {
      moving = false;
      badge.className = "chm-state chm-state-ok";
      /* CHEM-R59：≠0 必须渲染 */
      badge.textContent = "✓ v(正) = v(逆) ≠ 0 · 动态平衡";
    }
  }
  function paintReadout() {
    if (mode !== "quantitative") { readLine.textContent = ""; return; }
    var K = kOfTemp(gv("temp"));
    var Qc = K0 != null ? K0 * Math.pow(gi("conc") / gv("conc"), gs.fwd || 1) : null;
    var html = "";
    if (mathmlOK()) {
      html = "<math><mi>K</mi><mo>=</mo><mn>" + (K != null ? fmtN(K, 3) : "—") +
        "</mn></math>　<math><msub><mi>Q</mi><mi>c</mi></msub><mo>=</mo><mn>" +
        (Qc != null ? fmtN(Qc, 3) : "—") + "</mn></math>";
    } else {
      html = "K = " + (K != null ? fmtN(K, 3) : "—") +
        "　Qc = " + (Qc != null ? fmtN(Qc, 3) : "—");
    }
    readLine.innerHTML = html + "（K 只与温度有关）";
  }
  /* 催化剂开关（CHEM-R63：两线同等变陡、平衡位置不动） */
  if (p.catalystSwitch) {
    var catRow = el("div", "chm-btn-row", "");
    var catB = el("button", "", "催化剂：关");
    catB.type = "button";
    catB.setAttribute("aria-pressed", "false");
    catB.addEventListener("click", function () {
      catalystOn = !catalystOn;
      catB.setAttribute("aria-pressed", catalystOn ? "true" : "false");
      catB.textContent = "催化剂：" + (catalystOn ? "开" : "关");
      /* 开：两线同等变陡（趋近速率 ×2），vEq 不动 */
      moving = true; moveTimer = 0;
      paintBadge();
      shiftLine.textContent = catalystOn
        ? "催化剂开：两条线一起变陡——正逆速率都加快，平衡位置不动（催化剂不改 K）。"
        : "";
      flash(badge);
    });
    catRow.appendChild(catB);
    box.appendChild(catRow);
  }

  function draw() {
    var dpr = 1;
    try { dpr = Math.min(2, window.devicePixelRatio || 1); } catch (e) {}
    var cw = canvas.clientWidth || 300, ch = canvas.clientHeight || 150;
    if (canvas.width !== Math.round(cw * dpr) || canvas.height !== Math.round(ch * dpr)) {
      canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
    }
    var ctx = canvas.getContext("2d");
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, cw, ch);
    /* 动力学：指数趋近（示意） */
    var a = (catalystOn ? 0.09 : 0.045);
    F += (vEq - F) * a; R += (vEq - R) * a;
    hist.push({ f: F, r: R });
    if (hist.length > 120) hist.shift();
    if (moving) {
      moveTimer++;
      if (moveTimer > 40) paintBadge();
    }
    var maxV = 120;
    function X(i) { return 8 + (i / 119) * (cw - 16); }
    function Y(v) { return ch - 8 - (v / maxV) * (ch - 20); }
    /* 坐标轴 */
    ctx.strokeStyle = "#888"; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(8, 6); ctx.lineTo(8, ch - 8); ctx.lineTo(cw - 6, ch - 8); ctx.stroke();
    ctx.fillStyle = "#888"; ctx.font = "9px sans-serif";
    ctx.fillText("v", 2, 12); ctx.fillText("t", cw - 12, ch - 2);
    /* vEq 参考线（平衡位置） */
    ctx.strokeStyle = "#AAAAAA"; ctx.setLineDash([3, 3]);
    ctx.beginPath(); ctx.moveTo(8, Y(vEq)); ctx.lineTo(cw - 6, Y(vEq)); ctx.stroke();
    ctx.setLineDash([]);
    /* v(正) 实线橙 */
    ctx.strokeStyle = "#E69F00"; ctx.lineWidth = 2;
    ctx.beginPath();
    hist.forEach(function (pt, i) {
      var x = X(i + 120 - hist.length), y = Y(pt.f);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    /* v(逆) 虚线天蓝 */
    ctx.strokeStyle = "#56B4E9"; ctx.lineWidth = 2;
    ctx.setLineDash([5, 3]);
    ctx.beginPath();
    hist.forEach(function (pt, i) {
      var x = X(i + 120 - hist.length), y = Y(pt.r);
      if (i === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
    });
    ctx.stroke();
    ctx.setLineDash([]);
    /* 平衡位置标注 */
    ctx.fillStyle = "#888"; ctx.font = "9px sans-serif";
    ctx.fillText("平衡位置 vEq", 10, Y(vEq) - 3);
  }
  var rafId = 0;
  (function loop() {
    if (!document.hidden) draw();
    rafId = requestAnimationFrame(loop);
  })();
  if (p.shiftNote) shiftLine.textContent = p.shiftNote;
  if (p.recordKey) {
    /* 记录平衡移动观察（B10） */
    Object.keys(sVals).forEach(function (k) {
      sVals[k].on(function () { store(p.recordKey, { ts: Date.now() }); });
    });
  }
  paintBadge(); paintReadout();
  box.appendChild(el("div", "chm-note", "曲线为示意，非真实动力学模拟（B3 冻结公式）。"));
  return box;
}

/* ============================================================
 * C10 · redox-track（氧化还原电子追踪）
 * 点元素标化合价 → 校验；点起点/终点画电子得失箭头（tap 冻结）→
 * 方向校验；填得失电子数 → 电子守恒校验；
 * "升失氧、降得还"四步对照表一次呈现。
 * ============================================================ */
var VALENCE_CHOICES = ["−2", "−1", "0", "+1", "+2", "+3", "+4", "+5", "+6", "+7"];
function widgetRedoxTrack(p) {
  p = p || {};
  var eq = p.equation || {};
  var reactants = eq.reactants || [], products = eq.products || [];
  var all = reactants.concat(products), nR = reactants.length;
  var valences = p.valences || {};
  var transfer = p.transfer || null;
  var motto = p.motto || [];

  var box = el("div", "chm-widget chm-redox", "");
  box.appendChild(el("div", "chm-note", "单质中元素化合价为 0（先立规矩）。"));
  var warnSlot = el("div", "", "");
  box.appendChild(warnSlot);
  function warn(msg) {
    warnSlot.innerHTML = "";
    var w = el("div", "chm-state chm-state-bad", "⚠ " + msg);
    warnSlot.appendChild(w); flash(w); vib(30);
  }

  /* 方程式：元素可点 */
  var eqLine = el("div", "chm-eq-line", "");
  box.appendChild(eqLine);
  var marked = {};   /* "式.元素" → 用户标的价 */
  var elBtns = {};   /* "式.元素" → [{btn, side}] */
  function vKey(formula, elem) { return formula + "." + elem; }
  all.forEach(function (sp, i) {
    if (i > 0) {
      eqLine.appendChild(el("span", "chm-eq-op",
        i === nR ? " ＝ " : " ＋ "));
    }
    var fwrap = el("span", "chm-rx-formula", "");
    parseFormula(sp.formula).forEach(function (tk) {
      if (tk.t === "el") {
        var key = vKey(sp.formula, tk.v);
        var b = el("button", "chm-rx-el", esc(tk.v));
        b.type = "button";
        b.setAttribute("data-vkey", key);
        b.setAttribute("aria-label", "给 " + sp.formula + " 中的 " + tk.v + " 标化合价");
        (elBtns[key] = elBtns[key] || []).push({ btn: b, side: i < nR ? "r" : "p" });
        b.addEventListener("click", function () { openPicker(key, b); });
        fwrap.appendChild(b);
      } else {
        fwrap.appendChild(el("span", "chm-sub-plain", esc(tk.v)));
      }
    });
    eqLine.appendChild(fwrap);
  });

  /* 化合价选择器（点选预设，B9 冻结） */
  var picker = null;
  function openPicker(key, btn) {
    closePicker();
    picker = el("div", "chm-rx-picker", "");
    picker.appendChild(el("div", "chm-rx-pickert",
      "给 " + key + " 标化合价："));
    VALENCE_CHOICES.forEach(function (v) {
      var b = el("button", "", v);
      b.type = "button";
      b.addEventListener("click", function () {
        marked[key] = v;
        var std = (valences.reactants && valences.reactants[key]) ||
                  (valences.products && valences.products[key]);
        /* valences 键按反应物/生成物分区存放 */
        var ok = norm(v) === norm(std || "");
        btn.classList.remove("ok", "bad");
        btn.classList.add(ok ? "ok" : "bad");
        btn.innerHTML = esc(key.split(".")[1]) +
          '<span class="chm-rx-v">' + esc(v) + "</span>";
        if (ok) { flash(btn); vib(10); }
        else warn(key + " 的化合价不是 " + v + "——再想想（单质为 0 记住了吗？）。");
        closePicker();
        checkMotto();
      });
      picker.appendChild(b);
    });
    var c = el("button", "", "取消");
    c.type = "button";
    c.addEventListener("click", closePicker);
    picker.appendChild(c);
    box.appendChild(picker);
  }
  function closePicker() {
    if (picker && picker.parentNode) picker.parentNode.removeChild(picker);
    picker = null;
  }

  /* 电子得失箭头（tap：点起点 → 点终点，不许手绘） */
  var arrowBox = el("div", "chm-rx-arrowzone", "");
  box.appendChild(arrowBox);
  var arrowSvg = svgEl("svg", {
    viewBox: "0 0 100 26", "class": "chm-rx-arrowsvg", role: "img",
    "aria-label": "电子转移箭头"
  });
  arrowBox.appendChild(arrowSvg);
  var tapStart = null;
  var arrowMsg = el("div", "chm-note",
    "画箭头：先点失电子的元素（起点），再点得电子的元素（终点）。");
  arrowBox.appendChild(arrowMsg);
  Object.keys(elBtns).forEach(function (key) {
    elBtns[key].forEach(function (rec) {
      rec.btn.addEventListener("click", function () {
        /* 与标价选择器共存：点元素既开选择器也记 tap；tap 逻辑独立 */
        if (!tapStart) {
          tapStart = { key: key, btn: rec.btn };
          rec.btn.classList.add("tap-src");
          arrowMsg.textContent = "起点：" + key + " → 再点终点元素。";
        } else if (tapStart.key === key) {
          tapStart.btn.classList.remove("tap-src");
          tapStart = null;
          arrowMsg.textContent = "已取消起点。先点失电子的元素（起点），再点得电子的元素（终点）。";
        } else {
          drawArrow(tapStart.key, key);
          tapStart.btn.classList.remove("tap-src");
          tapStart = null;
        }
      });
    });
  });
  function drawArrow(fromKey, toKey) {
    arrowSvg.innerHTML = "";
    var fromEl = fromKey.split(".")[1], toEl = toKey.split(".")[1];
    var ok = transfer &&
      ((transfer.from === fromEl && transfer.to === toEl));
    /* 箭头：从起点画向终点（示意位置：左 → 右） */
    var x1 = 14, x2 = 86, y = 13;
    arrowSvg.appendChild(svgEl("line", {
      x1: x1, y1: y, x2: x2, y2: y,
      stroke: ok ? "var(--chm-lose-e)" : "var(--chm-ink-soft)", "stroke-width": 1.8
    }));
    arrowSvg.appendChild(svgEl("path", {
      d: "M" + x2 + "," + y + " l-5,-2.6 l0,5.2 Z",
      fill: ok ? "var(--chm-lose-e)" : "var(--chm-ink-soft)", stroke: "none"
    }));
    var t1 = svgEl("text", {
      x: x1, y: y - 4, "text-anchor": "middle", "font-size": 5, fill: "var(--chm-ink)"
    });
    t1.textContent = fromEl + "（失 " + (transfer ? transfer.electrons : "?") + "e⁻）";
    var t2 = svgEl("text", {
      x: x2, y: y - 4, "text-anchor": "middle", "font-size": 5, fill: "var(--chm-ink)"
    });
    t2.textContent = toEl + "（得 " + (transfer ? transfer.electrons : "?") + "e⁻）";
    arrowSvg.appendChild(t1); arrowSvg.appendChild(t2);
    if (ok) {
      arrowMsg.className = "chm-state chm-state-ok";
      arrowMsg.textContent = "✓ 箭头方向正确：电子从失电子的 " + fromEl +
        " 流向得电子的 " + toEl + "。";
      flash(arrowMsg); vib(15);
    } else {
      arrowMsg.className = "chm-state chm-state-bad";
      arrowMsg.textContent = "⚠ 箭头指反了：电子从失电子的元素流向得电子的元素——重画一次。";
      flash(arrowMsg); vib(30);
    }
  }

  /* 四步对照表（一次呈现，CHEM-R55） */
  var mottoBox = el("div", "chm-rx-motto", "");
  box.appendChild(mottoBox);
  function checkMotto() {
    mottoBox.innerHTML = "";
    if (!motto.length) return;
    var tbl = el("table", "chm-count-table", "");
    tbl.appendChild(el("tr", "",
      "<th>元素</th><th>化合价</th><th>得失电子</th><th>反应</th><th>剂</th><th></th>"));
    var allOk = true;
    motto.forEach(function (m) {
      /* 该元素反应物/生成物两处价态是否都标对 */
      var keys = Object.keys(elBtns).filter(function (k) {
        return k.split(".")[1] === m.element;
      });
      var ok = keys.length > 0 && keys.every(function (k) {
        var std = (valences.reactants && valences.reactants[k]) ||
                  (valences.products && valences.products[k]);
        return marked[k] != null && norm(marked[k]) === norm(std || "");
      });
      if (!ok) allOk = false;
      var chTxt = m.change === "升高" ? "↑ 升高" : "↓ 降低";
      tbl.appendChild(el("tr", "",
        "<td>" + esc(m.element) + "</td>" +
        "<td>" + esc(chTxt) + "</td>" +
        "<td>" + esc(m.e) + "</td>" +
        "<td>" + esc(m.reaction) + "</td>" +
        "<td>" + esc(m.role) + "</td>" +
        '<td class="' + (ok ? "chm-eq-ok" : "") + '">' + (ok ? "✓" : "·") + "</td>"));
    });
    mottoBox.appendChild(tbl);
    if (allOk) {
      var badge = el("div", "chm-state chm-state-ok", "✓ 升失氧、降得还——四位一体，一次记全");
      mottoBox.appendChild(badge);
      flash(badge);
    }
  }
  checkMotto();

  /* 得失电子数填写（CHEM-R57：电子守恒第二检查） */
  if (transfer) {
    var eRow = el("div", "chm-rx-erow", "");
    eRow.appendChild(el("span", "", "得失电子数：失 "));
    var inp = document.createElement("input");
    inp.type = "text"; inp.inputMode = "numeric";
    inp.className = "chm-sol-input"; inp.style.width = "4em";
    inp.setAttribute("aria-label", "失电子数");
    eRow.appendChild(inp);
    eRow.appendChild(el("span", "", " e⁻ ＝ 得 "));
    var inp2 = document.createElement("input");
    inp2.type = "text"; inp2.inputMode = "numeric";
    inp2.className = "chm-sol-input"; inp2.style.width = "4em";
    inp2.setAttribute("aria-label", "得电子数");
    eRow.appendChild(inp2);
    eRow.appendChild(el("span", "", " e⁻"));
    var eb = el("button", "chm-q-check", "检查电子守恒");
    eb.type = "button";
    eb.addEventListener("click", function () {
      var a = parseInt(inp.value, 10), b2 = parseInt(inp2.value, 10);
      var ok = a === transfer.electrons && b2 === transfer.electrons;
      var msg = el("div", "chm-state" + (ok ? " chm-state-ok" : ""), "");
      msg.textContent = ok
        ? "✓ 得失电子守恒：得电子总数 ＝ 失电子总数 ＝ " + transfer.electrons + " e⁻"
        : "✗ 还不对：失电子总数要 ＝ 得电子总数，再数数。";
      eRow.appendChild(msg);
      flash(msg);
      if (ok) vib(15); else vib(30);
    });
    eRow.appendChild(eb);
    box.appendChild(eRow);
  }
  return box;
}

/* ============================================================
 * Y2 · safety-badge（实验安全徽章）
 * 纯渲染组件：交互区顶部常驻，不随交互消失（W-C12/CHEM-R72）；
 * 话术为"虚拟/现实"对比句式（黄队定稿）。
 * ============================================================ */
function widgetSafetyBadge(p) {
  p = p || {};
  var box = el("div", "chm-widget chm-sbadge", "");
  var level = p.level || "warn";
  var badge = el("div",
    "chm-state " + (level === "danger" ? "chm-state-bad" : "chm-state-warn"),
    "");
  badge.innerHTML = "⚠ " + esc(p.text || "");
  box.appendChild(badge);
  if (p.realityNote) {
    box.appendChild(el("div", "chm-note", "现实差异：" + p.realityNote));
  }
  return box;
}

/* ============================================================
 * Y4 · ion-split（离子方程式拆写练习）
 * "写 → 拆 → 删 → 查"四步点选练习（给定例题，冻结边界：
 * 不做自由输入方程式的自动解析与拆写）。
 * split: {ions:[拆成离子的物质], formulas:[写化学式的物质]}
 * （兼容中文键 {拆成离子的物质, 写化学式的物质}）。
 * "查"步骤：解析 fullIonic 字符串做真正的电荷/原子双守恒验算。
 * ============================================================ */
function widgetIonSplit(p) {
  p = p || {};
  var eq = p.equation || {};
  var reactants = eq.reactants || [], products = eq.products || [];
  var all = reactants.concat(products);
  var split = p.split || {};
  var ionsAns = split.ions || split["拆成离子的物质"] || [];
  var formulasAns = split.formulas || split["写化学式的物质"] || [];
  var spectators = p.spectators || [];

  var box = el("div", "chm-widget chm-ion", "");
  var stepTag = el("div", "chm-replay-step", "");
  var stage = el("div", "chm-ion-stage", "");
  var fb = el("div", "chm-q-fb", "");
  box.appendChild(stepTag);
  box.appendChild(stage);
  box.appendChild(fb);
  function say(ok, msg) {
    fb.innerHTML = (ok ? '<span class="ok">✓ </span>' : '<span class="bad">✗ </span>') +
      esc(msg);
    flash(box);
  }
  var stepIdx = 0;
  var splitChoice = {};  /* formula → "ion" | "formula" */
  var delChoice = {};    /* ionLabel → true(旁观) */

  function eqText() {
    function side(list) {
      return list.map(function (sp, i) {
        var c = (p.coefficients || [])[i === 0 ? 0 : 0];
        return sp.formula;
      }).join(" ＋ ");
    }
    var co = p.coefficients || [];
    function withCo(list, off) {
      return list.map(function (sp, i) {
        var c = co[off + i];
        return (c && c !== 1 ? c : "") + sp.formula;
      }).join(" ＋ ");
    }
    return withCo(reactants, 0) + " ＝ " + withCo(products, reactants.length);
  }

  function render() {
    stage.innerHTML = ""; fb.innerHTML = "";
    stepTag.textContent = "第 " + (stepIdx + 1) + " 步 / 共 4 步 · 写 → 拆 → 删 → 查";
    if (stepIdx === 0) renderWrite();
    else if (stepIdx === 1) renderSplit();
    else if (stepIdx === 2) renderDelete();
    else renderCheck();
  }
  function nextBtn(label, fn) {
    var b = el("button", "chm-q-check", label);
    b.type = "button";
    b.addEventListener("click", fn);
    return b;
  }
  /* 第 1 步 · 写：分子方程式 */
  function renderWrite() {
    stage.appendChild(el("div", "chm-ion-h", "第 1 步 · 写：写出分子方程式"));
    var e = el("div", "chm-ion-eq", esc(eqText()));
    stage.appendChild(e);
    stage.appendChild(el("div", "chm-note",
      "口诀\"四留三拆\"：强酸、强碱、可溶性盐拆成离子；" +
      "弱电解质、沉淀、气体、氧化物写化学式。"));
    stage.appendChild(nextBtn("下一步：拆 →", function () { stepIdx = 1; render(); }));
  }
  /* 第 2 步 · 拆：点选每种物质"拆成离子 / 写化学式" */
  function renderSplit() {
    stage.appendChild(el("div", "chm-ion-h", "第 2 步 · 拆：点每种物质，选\"拆成离子\"还是\"写化学式\""));
    all.forEach(function (sp) {
      var row = el("div", "chm-ion-row", "");
      row.appendChild(el("span", "chm-ion-formula", sp.formula));
      var cur = splitChoice[sp.formula];
      [["ion", "拆成离子"], ["formula", "写化学式"]].forEach(function (opt) {
        var b = el("button", "", opt[1]);
        b.type = "button";
        b.setAttribute("aria-pressed", cur === opt[0] ? "true" : "false");
        b.addEventListener("click", function () {
          splitChoice[sp.formula] = opt[0];
          render();
        });
        row.appendChild(b);
      });
      stage.appendChild(row);
    });
    stage.appendChild(nextBtn("检查拆写", function () {
      var bad = [];
      all.forEach(function (sp) {
        var want = ionsAns.indexOf(sp.formula) >= 0 ? "ion" : "formula";
        if (splitChoice[sp.formula] !== want) bad.push(sp.formula);
      });
      if (!bad.length) {
        say(true, "拆写全对！" + (p.fullIonic ? "离子方程式：" + p.fullIonic : ""));
        if (p.fullIonic) stage.appendChild(el("div", "chm-ion-eq", p.fullIonic));
        stage.appendChild(nextBtn("下一步：删 →", function () { stepIdx = 2; render(); }));
      } else {
        say(false, "这几处拆错了：" + bad.join("、") +
          "——再想想\"四留三拆\"：强酸/强碱/可溶性盐拆，沉淀/气体/弱电解质/氧化物留。");
      }
    }));
  }
  /* 第 3 步 · 删：点选旁观离子 */
  function renderDelete() {
    stage.appendChild(el("div", "chm-ion-h", "第 3 步 · 删：点出旁观离子（反应前后都没变的）"));
    /* 候选离子：从 fullIonic 解析，或给常见离子 */
    var cands = ionsFromFullIonic();
    if (!cands.length) {
      stage.appendChild(el("div", "chm-note",
        spectators.length ? "（按你的判断点选）" : "本例无旁观离子——全部参加反应。"));
    }
    cands.forEach(function (ion) {
      var b = el("button", "", ion);
      b.type = "button";
      b.setAttribute("aria-pressed", delChoice[ion] ? "true" : "false");
      b.addEventListener("click", function () {
        delChoice[ion] = !delChoice[ion];
        render();
      });
      stage.appendChild(b);
    });
    stage.appendChild(nextBtn("检查", function () {
      var picked = Object.keys(delChoice).filter(function (k) { return delChoice[k]; });
      var want = spectators.slice().sort().join("|");
      var got = picked.slice().sort().join("|");
      if (want === got) {
        say(true, spectators.length
          ? "删对了：旁观离子 " + spectators.join("、") + " 两边划掉。"
          : "对，本例无旁观离子。");
        if (p.netIonic) stage.appendChild(el("div", "chm-ion-eq", "离子方程式：" + p.netIonic));
        stage.appendChild(nextBtn("下一步：查 →", function () { stepIdx = 3; render(); }));
      } else {
        say(false, "旁观离子找得不对——反应前后都没变（种类、个数、电荷）的才是旁观离子。");
      }
    }));
  }
  /* 从 fullIonic 解析离子候选（"Ba²⁺ + 2OH⁻ + …" → ["Ba²⁺","OH⁻",...]） */
  function ionsFromFullIonic() {
    var s = p.fullIonic || "";
    var left = s.split("＝")[0] || s;
    var out = [];
    left.split(/[＋+]/).forEach(function (term) {
      term = term.trim().replace(/[↓↑]/g, "");
      var m = term.match(/^(\d+)?(.+)$/);
      if (m && /[⁺⁻\+\-]/.test(m[2])) {
        var label = m[2].trim();
        if (out.indexOf(label) < 0) out.push(label);
      }
    });
    return out;
  }
  /* 第 4 步 · 查：电荷守恒 + 原子守恒（真验算，非摆设） */
  function renderCheck() {
    stage.appendChild(el("div", "chm-ion-h", "第 4 步 · 查：电荷守恒 + 原子守恒"));
    var res = verifyIonic(p.netIonic || p.fullIonic || "");
    var tbl = el("table", "chm-count-table", "");
    tbl.appendChild(el("tr", "", "<th>检查项</th><th>左边</th><th>右边</th><th></th>"));
    tbl.appendChild(el("tr", "",
      "<td>电荷</td><td>" + res.qL + "</td><td>" + res.qR + "</td>" +
      '<td class="' + (res.qOk ? "chm-eq-ok" : "") + '">' + (res.qOk ? "✓" : "✗") + "</td>"));
    var atomRows = Object.keys(res.atoms).sort().map(function (e) {
      var a = res.atoms[e], same = a[0] === a[1];
      return "<tr><td>" + esc(e) + " 原子</td><td>" + a[0] + "</td><td>" + a[1] +
        '</td><td class="' + (same ? "chm-eq-ok" : "") + '">' +
        (same ? "✓" : "✗") + "</td></tr>";
    }).join("");
    var tmp = el("tbody", "", atomRows);
    /* 把原子行并入同一表 */
    tbl.appendChild(tmp);
    stage.appendChild(tbl);
    if (res.qOk && res.aOk) {
      var ok = el("div", "chm-state chm-state-ok",
        "✓ 双守恒通过：电荷守恒 + 原子守恒——离子方程式写对了！");
      stage.appendChild(ok); flash(ok);
      say(true, "四步走完：写 → 拆 → 删 → 查。");
    } else {
      say(false, "守恒检查没通过——回头看看拆写步骤。");
    }
  }
  /* 离子方程式字符串验算：
   * "Ba²⁺ + 2OH⁻ + 2H⁺ + SO₄²⁻ ＝ BaSO₄↓ + 2H₂O"
   * → {qL, qR, qOk, atoms:{e:[左,右]}, aOk} */
  function verifyIonic(s) {
    var res = { qL: 0, qR: 0, qOk: false, atoms: {}, aOk: false };
    try {
      var sides = String(s).split("＝");
      if (sides.length < 2) sides = String(s).split("=");
      if (sides.length < 2) return res;
      function parseSide(str) {
        var charge = 0, atoms = {};
        str.split(/[＋+]/).forEach(function (term) {
          term = term.trim().replace(/[↓↑（）()]/g, "").replace(/（.*/, "");
          if (!term) return;
          var m = term.match(/^(\d+)?(.+)$/);
          var coef = m[1] ? parseInt(m[1], 10) : 1;
          var body = m[2].trim();
          /* 尾部电荷：⁺/⁻/²⁺/²⁻/+/- */
          var cm = body.match(/([⁰¹²³⁴⁵⁶⁷⁸⁹]*[⁺⁻]|[\+\-])$/);
          var q = 0;
          if (cm) {
            var cs = cm[1];
            var num = (cs.match(/[⁰¹²³⁴⁵⁶⁷⁸⁹]/g) || []).map(function (d) {
              return "⁰¹²³⁴⁵⁶⁷⁸⁹".indexOf(d);
            }).join("");
            var n = num === "" ? 1 : parseInt(num, 10);
            var sign = /[⁺\+]/.test(cs) ? 1 : -1;
            q = sign * n;
            body = body.slice(0, body.length - cm[1].length);
          }
          charge += q * coef;
          var ca = countAtoms(body);
          for (var e in ca) atoms[e] = (atoms[e] || 0) + ca[e] * coef;
        });
        return { charge: charge, atoms: atoms };
      }
      var L = parseSide(sides[0]), R = parseSide(sides[1]);
      res.qL = L.charge; res.qR = R.charge;
      res.qOk = L.charge === R.charge;
      var keys = {};
      Object.keys(L.atoms).forEach(function (e) { keys[e] = 1; });
      Object.keys(R.atoms).forEach(function (e) { keys[e] = 1; });
      res.aOk = true;
      Object.keys(keys).forEach(function (e) {
        var l = L.atoms[e] || 0, r = R.atoms[e] || 0;
        res.atoms[e] = [l, r];
        if (l !== r) res.aOk = false;
      });
    } catch (e) { /* 解析失败 → 判不通过，不抛错 */ }
    return res;
  }
  render();
  return box;
}

/* ============================================================
 * Y6 · tri-rep（三重表征切换器）
 * 宏观 / 微观 / 符号三视图切换；顶部"现在看：××"常驻；
 * 默认单视图；分区底色冻结（宏观浅黄 / 微观浅蓝 / 符号浅绿）。
 * ============================================================ */
function widgetTriRep(p) {
  p = p || {};
  var views = p.views || {};
  var badgeText = p.badgeText || {};
  var cur = p.defaultView || "macro";
  var order = ["macro", "micro", "symbol"];
  var names = { macro: "宏观", micro: "微观", symbol: "符号" };

  var box = el("div", "chm-widget chm-tri", "");
  box.appendChild(el("div", "chm-tri-topic", esc(p.topic || "")));
  var tabs = el("div", "chm-btn-row chm-tri-tabs", "");
  order.forEach(function (v) {
    if (!views[v]) return;
    var b = el("button", "", names[v]);
    b.type = "button";
    b.setAttribute("aria-pressed", v === cur ? "true" : "false");
    b.addEventListener("click", function () { cur = v; paint(); });
    tabs.appendChild(b);
  });
  box.appendChild(tabs);
  /* 视角徽章常驻（W-C15） */
  var badge = el("div", "chm-state", "");
  box.appendChild(badge);
  var body = el("div", "chm-tri-body", "");
  box.appendChild(body);
  function paint() {
    var bs = tabs.querySelectorAll("button");
    for (var i = 0; i < bs.length; i++)
      bs[i].setAttribute("aria-pressed", "false");
    var idx = 0;
    order.forEach(function (v, i) { if (views[v] && v === cur) idx = i; });
    var vis = tabs.querySelectorAll("button");
    /* 按顺序找第 idx 个可见 tab */
    var vi = 0;
    for (var j = 0; j < vis.length; j++) {
      var vv = order.filter(function (x) { return views[x]; })[j];
      if (vv === cur) vis[j].setAttribute("aria-pressed", "true");
    }
    badge.textContent = badgeText[cur] || ("现在看：" + (names[cur] || cur));
    badge.className = "chm-state chm-tri-badge-" + cur;
    body.className = "chm-tri-body chm-tri-" + cur;
    body.innerHTML = "";
    var v = views[cur] || {};
    if (cur === "symbol" && v.mathml && mathmlOK()) {
      var mm = el("div", "chm-tri-symbol", v.mathml);
      body.appendChild(mm);
    } else if (cur === "symbol" && v.mathml) {
      body.appendChild(el("div", "chm-tri-symbol", esc(v.gloss || "")));
    }
    if (v.text) body.appendChild(el("div", "chm-text", esc(v.text)));
    if (cur === "symbol" && v.gloss && !(v.mathml && !mathmlOK()))
      body.appendChild(el("div", "chm-note", esc(v.gloss)));
    if (cur === "micro" && v.anim)
      body.appendChild(el("div", "chm-note", "（微观粒子动画见本课粒子页，此处为文字描述）"));
    flash(body);
  }
  paint();
  return box;
}

/* ============================================================
 * Y10 · read-gauge-chem（化学仪表读数）
 * 物理 Y2 口径：容差 = 分度值×1（冻结，B13.4）、估读到下一位。
 * 四 gauge：cylinder（量筒：视线水平/俯视/仰视）/ balance（托盘天平）/
 * ph-paper（pH 试纸比色）/ burette（滴定管）。
 * 与 C8 分工：Y10 练读数规范，C8 练 pH 含义。
 * ============================================================ */
function widgetReadGaugeChem(p) {
  p = p || {};
  var gauge = p.gauge || "cylinder";
  var division = p.division != null ? p.division : 0.1;
  var tolerance = p.tolerance != null ? p.tolerance : division;  /* 冻结：分度值×1 */
  var estimateNext = p.estimateNext !== false;
  var sightDemo = !!p.sightDemo;
  var target = p.targetValue;

  var box = el("div", "chm-widget chm-gauge", "");
  var stage = el("div", "chm-gauge-stage", "");
  box.appendChild(stage);
  var fb = el("div", "chm-q-fb", "");
  box.appendChild(fb);
  var judged = false;
  function say(ok, msg) {
    fb.innerHTML = (ok ? '<span class="ok">✓ 读对了</span> ' : '<span class="bad">✗ </span> ') +
      esc(msg);
    flash(box);
    if (ok) { vib(15); judged = true; record(); }
    else vib(30);
  }
  function record() {
    if (p.recordKey) store(p.recordKey, { ok: true, ts: Date.now() });
  }
  function numInput(ph) {
    var inp = document.createElement("input");
    inp.type = "text"; inp.inputMode = "decimal";
    inp.placeholder = ph || "";
    inp.className = "chm-sol-input";
    inp.setAttribute("aria-label", ph || "输入读数");
    return inp;
  }
  function checkBtn(label, fn) {
    var b = el("button", "chm-q-check", label);
    b.type = "button";
    b.addEventListener("click", fn);
    return b;
  }
  function parseTarget() {
    if (typeof target === "number") return target;
    var m = String(target).match(/[\d.]+/);
    return m ? parseFloat(m[0]) : NaN;
  }

  if (gauge === "cylinder") {
    /* 量筒：SVG 筒 + 液面滑块；视线三档演示 */
    var sight = "level";  /* level / over / under */
    var svg = svgEl("svg", {
      viewBox: "0 0 100 66", "class": "chm-gauge-svg", role: "img",
      "aria-label": "量筒读数示意"
    });
    stage.appendChild(svg);
    var T = parseTarget();
    var maxV = Math.ceil((T + division * 4) / 10) * 10 || 20;
    function drawCyl(reading) {
      svg.innerHTML = "";
      var x0 = 30, x1 = 70, yTop = 8, yBot = 58;
      svg.appendChild(svgEl("rect", {
        x: x0, y: yTop, width: x1 - x0, height: yBot - yTop,
        fill: "none", stroke: "var(--chm-apparatus)", "stroke-width": 1.4
      }));
      /* 刻度 */
      for (var v = 0; v <= maxV; v += division * 5) {
        var y = yBot - (v / maxV) * (yBot - yTop);
        var major = Math.round(v / (division * 10)) === v / (division * 10);
        svg.appendChild(svgEl("line", {
          x1: x0, y1: y, x2: x0 + (major ? 10 : 6), y2: y,
          stroke: "var(--chm-ink)", "stroke-width": major ? 1 : 0.6
        }));
        if (major) {
          var t = svgEl("text", {
            x: x0 - 2, y: y + 2.4, "text-anchor": "end",
            "font-size": 4.6, fill: "var(--chm-ink)"
          });
          t.textContent = fmtN(v, 0);
          svg.appendChild(t);
        }
      }
      /* 液面（凹液面最低处读数） */
      var ly = yBot - (reading / maxV) * (yBot - yTop);
      svg.appendChild(svgEl("rect", {
        x: x0, y: ly, width: x1 - x0, height: yBot - ly,
        fill: "var(--chm-known)", opacity: 0.35, stroke: "none"
      }));
      svg.appendChild(svgEl("path", {
        d: "M" + x0 + "," + ly + " Q" + ((x0 + x1) / 2) + "," + (ly + 2.4) +
          " " + x1 + "," + ly,
        fill: "none", stroke: "var(--chm-known)", "stroke-width": 1.4
      }));
      /* 视线 */
      var sy = sight === "over" ? ly - 8 : sight === "under" ? ly + 8 : ly;
      svg.appendChild(svgEl("line", {
        x1: 4, y1: sy, x2: x0 - 4, y2: sy,
        stroke: "var(--chm-lose-e)", "stroke-width": 1, "stroke-dasharray": "2,1.6"
      }));
      var sl = svgEl("text", {
        x: 4, y: sy - 3, "font-size": 4.4, fill: "var(--chm-ink)"
      });
      sl.textContent = sight === "over" ? "俯视" : sight === "under" ? "仰视" : "视线水平";
      svg.appendChild(sl);
      var unit = svgEl("text", {
        x: (x0 + x1) / 2, y: 64, "text-anchor": "middle",
        "font-size": 4.6, fill: "var(--chm-ink)"
      });
      unit.textContent = "mL（分度值 " + division + "mL）";
      svg.appendChild(unit);
    }
    var slider = uiSlider({
      label: "液面位置", min: 0, max: maxV, step: division, init: 0, unit: "mL",
      fmt: function (v) { return fmtN(v, 1) + " mL"; }
    });
    slider.on(function (v) { drawCyl(v); });
    stage.appendChild(slider.row);
    drawCyl(0);
    if (sightDemo) {
      var srow = el("div", "chm-btn-row", "");
      [["level", "视线水平"], ["over", "俯视"], ["under", "仰视"]].forEach(function (s) {
        var b = el("button", "", s[1]);
        b.type = "button";
        b.setAttribute("aria-pressed", s[0] === "level" ? "true" : "false");
        b.addEventListener("click", function () {
          sight = s[0];
          var bs = srow.querySelectorAll("button");
          for (var i = 0; i < bs.length; i++) bs[i].setAttribute("aria-pressed", "false");
          b.setAttribute("aria-pressed", "true");
          drawCyl(slider.get());
        });
        srow.appendChild(b);
      });
      stage.appendChild(srow);
      stage.appendChild(el("div", "chm-note",
        "先选\"视线水平\"再读数：俯视偏大、仰视偏小——规范不是讲究，是准确。"));
    }
    stage.appendChild(el("div", "chm-note",
      "量筒读数估读到下一位（分度值 " + division + "mL，估读到 0.0" +
      (division === 0.1 ? "1" : "") + "mL）。"));
    var inp = numInput("输入你的读数 / mL");
    stage.appendChild(inp);
    stage.appendChild(checkBtn("检查读数", function () {
      var v = parseFloat(inp.value);
      if (sightDemo && sight !== "level") {
        say(false, "视线还没水平！先把视线调到\"视线水平\"再读数。");
        return;
      }
      if (!isFinite(v)) { say(false, "先输入一个读数。"); return; }
      if (Math.abs(v - T) <= tolerance + 1e-9)
        say(true, "读数 " + fmtN(v, 2) + " mL 在容差内（标准 " + T +
          " mL，容差 ±" + tolerance + "mL）。");
      else
        say(false, "差太多了（容差 ±" + tolerance + "mL）——看凹液面最低处，估读到下一位。");
    }));
  } else if (gauge === "balance") {
    /* 托盘天平：砝码 + 游码 */
    var T2 = parseTarget();
    stage.appendChild(el("div", "chm-text",
      "托盘天平读数 = 砝码 + 游码（分度值 " + division + "g，估读到下一位）。"));
    var weights = [10, 5, 2, 1];
    var picked = [];
    var wrow = el("div", "chm-btn-row", "");
    weights.forEach(function (w) {
      var b = el("button", "", w + "g");
      b.type = "button";
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", function () {
        var i = picked.indexOf(w);
        if (i >= 0) { picked.splice(i, 1); b.setAttribute("aria-pressed", "false"); }
        else { picked.push(w); b.setAttribute("aria-pressed", "true"); }
        upd();
      });
      wrow.appendChild(b);
    });
    stage.appendChild(wrow);
    var rider = uiSlider({
      label: "游码", min: 0, max: 1, step: division, init: 0, unit: "g",
      fmt: function (v) { return fmtN(v, 1) + " g"; }
    });
    rider.on(upd);
    stage.appendChild(rider.row);
    var rd = el("div", "chm-readline", "");
    stage.appendChild(rd);
    function total() {
      var s = rider.get();
      picked.forEach(function (w) { s += w; });
      return Math.round(s * 10) / 10;
    }
    function upd() { rd.textContent = "当前读数：" + fmtN(total(), 1) + " g"; }
    upd();
    stage.appendChild(checkBtn("检查读数", function () {
      if (Math.abs(total() - T2) <= tolerance + 1e-9)
        say(true, "读数 " + fmtN(total(), 1) + " g ✓（标准 " + T2 + "g）。");
      else
        say(false, "还不对（容差 ±" + tolerance + "g）——左物右码，游码估读到下一位。");
    }));
  } else if (gauge === "ph-paper") {
    /* pH 试纸比色：标准比色卡 0–14，点选档位 */
    var T3 = parseTarget();
    stage.appendChild(el("div", "chm-text", "把试纸的颜色跟标准比色卡对一对，选最接近的 pH 档。"));
    var strip = el("div", "chm-ph-paper", "试纸");
    strip.style.background = PH_COLORS[Math.round(T3)] || "#CCCCCC";
    stage.appendChild(strip);
    var card = el("div", "chm-gauge-card", "");
    for (var ph = 0; ph <= 14; ph++) {
      (function (pv) {
        var b = el("button", "chm-gauge-ph", String(pv));
        b.type = "button";
        b.style.background = PH_COLORS[pv];
        b.setAttribute("aria-label", "pH " + pv);
        b.addEventListener("click", function () {
          var bs = card.querySelectorAll("button");
          for (var i = 0; i < bs.length; i++) bs[i].classList.remove("sel");
          b.classList.add("sel");
          card.setAttribute("data-pick", pv);
        });
        card.appendChild(b);
      })(ph);
    }
    stage.appendChild(card);
    stage.appendChild(checkBtn("检查读数", function () {
      var pick = parseInt(card.getAttribute("data-pick"), 10);
      if (!isFinite(pick)) { say(false, "先在比色卡上点一个最接近的档。"); return; }
      if (Math.abs(pick - T3) <= tolerance + 1e-9)
        say(true, "pH ≈ " + pick + " ✓（标准 " + target + "）。" +
          (pick < 7 ? "酸性" : pick > 7 ? "碱性" : "中性") + "。");
      else
        say(false, "差太多了（容差 ±" + tolerance + " 档）——颜色 + 文字一起看，别只靠颜色。");
    }));
    stage.appendChild(el("div", "chm-note", "试纸测大概，精确用 pH 计。（W-C20）"));
  } else if (gauge === "burette") {
    /* 滴定管：0 刻度在上；读数 = 初读数 − 末读数在此简化为直接读液面 */
    var T4 = parseTarget();
    stage.appendChild(el("div", "chm-text",
      "滴定管 0 刻度在上（分度值 " + division + "mL，估读到下一位）。调液面到目标读数附近，再输入读数。"));
    var svg2 = svgEl("svg", {
      viewBox: "0 0 100 66", "class": "chm-gauge-svg", role: "img",
      "aria-label": "滴定管读数示意"
    });
    stage.appendChild(svg2);
    var maxB = 30;
    function drawB(v) {
      svg2.innerHTML = "";
      var x0 = 40, x1 = 60, yTop = 6, yBot = 58;
      svg2.appendChild(svgEl("rect", {
        x: x0, y: yTop, width: x1 - x0, height: yBot - yTop,
        fill: "none", stroke: "var(--chm-apparatus)", "stroke-width": 1.4
      }));
      for (var vv = 0; vv <= maxB; vv += 1) {
        var y = yTop + (vv / maxB) * (yBot - yTop);
        var major = vv % 5 === 0;
        svg2.appendChild(svgEl("line", {
          x1: x0, y1: y, x2: x0 + (major ? 9 : 5), y2: y,
          stroke: "var(--chm-ink)", "stroke-width": major ? 1 : 0.6
        }));
        if (major) {
          var t = svgEl("text", {
            x: x0 - 2, y: y + 2.4, "text-anchor": "end",
            "font-size": 4.4, fill: "var(--chm-ink)"
          });
          t.textContent = vv;
          svg2.appendChild(t);
        }
      }
      var ly = yTop + (v / maxB) * (yBot - yTop);
      svg2.appendChild(svgEl("rect", {
        x: x0, y: ly, width: x1 - x0, height: yBot - ly,
        fill: "var(--chm-known)", opacity: 0.35, stroke: "none"
      }));
      svg2.appendChild(svgEl("line", {
        x1: x0, y1: ly, x2: x1, y2: ly,
        stroke: "var(--chm-known)", "stroke-width": 1.4
      }));
      var un = svgEl("text", {
        x: 50, y: 64, "text-anchor": "middle", "font-size": 4.4, fill: "var(--chm-ink)"
      });
      un.textContent = "mL（0 刻度在上）";
      svg2.appendChild(un);
    }
    var bsl = uiSlider({
      label: "液面", min: 0, max: maxB, step: division, init: 20, unit: "mL",
      fmt: function (v) { return fmtN(v, 2) + " mL"; }
    });
    bsl.on(function (v) { drawB(v); });
    stage.appendChild(bsl.row);
    drawB(20);
    var inp2 = numInput("输入你的读数 / mL");
    stage.appendChild(inp2);
    stage.appendChild(checkBtn("检查读数", function () {
      var v = parseFloat(inp2.value);
      if (!isFinite(v)) { say(false, "先输入一个读数。"); return; }
      if (Math.abs(v - T4) <= tolerance + 1e-9)
        say(true, "读数 " + fmtN(v, 2) + " mL ✓（标准 " + T4 + "mL，估读到下一位）。");
      else
        say(false, "差太多了（容差 ±" + tolerance + "mL）——0 刻度在上，别读反。");
    }));
  }
  return box;
}

/* ============================================================
 * Y11 · side-compare（化学对照表）
 * 复用物理 Y5 对照表范式（B13.8），不新增类型：
 * params: {title, columns:[A,B], rows:[{dim,a,b}], highlightDiff}。
 * 390px 不横向溢出：维度作行头，A/B 纵向堆叠。
 * ============================================================ */
function widgetSideCompare(p) {
  p = p || {};
  var box = el("div", "chm-widget chm-compare", "");
  box.appendChild(el("div", "chm-compare-title", esc(p.title || "对照表")));
  var cols = p.columns || [];
  var tbl = el("table", "chm-compare-table", "");
  var head = el("tr", "",
    "<th>对照维度</th>" +
    cols.map(function (c) { return "<th>" + esc(c) + "</th>"; }).join(""));
  tbl.appendChild(head);
  (p.rows || []).forEach(function (r) {
    var diff = p.highlightDiff !== false && norm(r.a) !== norm(r.b);
    var tr = el("tr", diff ? "diff" : "", "");
    var tds = "<td><b>" + esc(r.dim || "") + "</b></td>" +
      "<td>" + esc(r.a == null ? "" : r.a) + "</td>" +
      "<td>" + esc(r.b == null ? "" : r.b) + "</td>";
    tr.innerHTML = tds;
    if (diff) {
      var tag = el("span", "chm-compare-difftag", "不同");
      tr.children[0].appendChild(tag);
    }
    tbl.appendChild(tr);
  });
  box.appendChild(tbl);
  box.appendChild(el("div", "chm-note", "差异行已标\"不同\"（颜色 + 文字双编码）。"));
  return box;
}

/* ============================================================
 * Y12 · stoich-steps（计算步骤展示）
 * 设/写/找/列/解/答分步填空 + checkTable 查表校验（数值归一化，
 * 不做语义解析，B13.5）+ 答案三级折叠 + 自查清单（CHEM-R21）。
 * 评估增 checklist 字段：params.checklist 可覆写，默认三条。
 * ============================================================ */
function widgetStoichSteps(p) {
  p = p || {};
  var steps = p.steps || [];
  var checkTable = p.checkTable || {};
  var foldLevels = p.foldLevels || 3;
  var sigFig = p.sigFig || 3;

  var box = el("div", "chm-widget chm-stoich", "");
  box.appendChild(el("div", "chm-stoich-title", esc(p.title || "")));
  var fb = el("div", "chm-q-fb", "");
  function say(ok, msg) {
    fb.innerHTML = (ok ? '<span class="ok">✓ </span>' : '<span class="bad">✗ </span>') +
      esc(msg);
    flash(box);
  }
  var doneSteps = {};
  steps.forEach(function (st, i) {
    var row = el("div", "chm-stoich-step", "");
    var key = el("span", "chm-stoich-key", esc(st.key || ("步骤" + (i + 1))));
    row.appendChild(key);
    var body = el("div", "chm-stoich-body", "");
    body.appendChild(el("div", "chm-text", esc(st.prompt || "")));
    var std = checkTable[st.key];
    var inp = document.createElement("input");
    inp.type = "text"; inp.className = "chm-sol-input";
    inp.setAttribute("aria-label", (st.key || "") + "步骤填空");
    body.appendChild(inp);
    var brow = el("div", "chm-btn-row", "");
    if (st.hint) {
      var hb = el("button", "", "提示");
      hb.type = "button";
      hb.addEventListener("click", function () {
        say(true, "提示（" + st.key + "）：" + st.hint);
      });
      brow.appendChild(hb);
    }
    if (std != null) {
      var cb = el("button", "chm-q-check", "核对");
      cb.type = "button";
      cb.addEventListener("click", function () {
        var v = norm(inp.value), want = norm(std);
        var ok = v === want || numEq(inp.value, std);
        if (ok && !doneSteps[st.key]) {
          doneSteps[st.key] = true;
          key.classList.add("done");
          key.textContent = "✓ " + st.key;
        }
        say(ok, ok ? st.key + "步骤 ✓" : "再想想（" + st.key + "）——看看提示。");
        if (ok) record();
      });
      brow.appendChild(cb);
    }
    body.appendChild(brow);
    row.appendChild(body);
    box.appendChild(row);
  });
  /* 数值归一化比对（B2：如 "2.45" vs "2.450" 按数值判等） */
  function numEq(a, b) {
    function num(s) {
      var m = String(s).replace(/,/g, "").match(/-?[\d.]+/);
      return m ? parseFloat(m[0]) : NaN;
    }
    var x = num(a), y = num(b);
    if (!isFinite(x) || !isFinite(y)) return false;
    return Math.abs(x - y) <= Math.max(1e-9, Math.abs(y) * 1e-6);
  }
  function record() {
    if (p.recordKey) store(p.recordKey, { progress: doneSteps, ts: Date.now() });
  }
  box.appendChild(fb);

  /* 答案三级折叠（B13.5）：思路提示 → 关键步骤 → 完整答案 */
  var fold = el("div", "chm-stoich-fold", "");
  var levels = [
    { t: "第 1 级 · 思路提示", c: steps.map(function (s) { return s.key + "：" + (s.prompt || ""); }).join("；") },
    { t: "第 2 级 · 关键步骤", c: steps.map(function (s) { return s.key + "：" + (s.hint || s.prompt || ""); }).join("；") },
    { t: "第 3 级 · 完整答案", c: Object.keys(checkTable).map(function (k) { return k + "：" + checkTable[k]; }).join("；") }
  ];
  var opened = 0;
  var foldBody = el("div", "chm-stoich-foldbody", "");
  fold.appendChild(foldBody);
  function paintFold() {
    foldBody.innerHTML = "";
    levels.slice(0, Math.min(foldLevels, 3)).forEach(function (lv, i) {
      var b = el("button", "", (i < opened ? "▾ " : "▸ ") + lv.t);
      b.type = "button";
      b.setAttribute("aria-expanded", i < opened ? "true" : "false");
      b.addEventListener("click", function () {
        opened = opened > i ? i : i + 1;
        paintFold();
      });
      foldBody.appendChild(b);
      if (i < opened) foldBody.appendChild(el("div", "chm-text", lv.c));
    });
  }
  paintFold();
  box.appendChild(fold);

  /* 自查清单（CHEM-R21；params.checklist 可覆写） */
  var checklist = p.checklist || [
    "方程式配平了吗？",
    "代入的是纯净物质量吗？",
    "单位写对了吗？"
  ];
  var cl = el("div", "chm-stoich-check", "");
  cl.appendChild(el("div", "chm-stoich-checkt", "自查清单（交卷前逐项打勾）："));
  checklist.forEach(function (item) {
    var row = el("label", "chm-check-item", "");
    var cb = document.createElement("input");
    cb.type = "checkbox";
    row.appendChild(cb);
    row.appendChild(el("span", "", esc(item)));
    cl.appendChild(row);
  });
  box.appendChild(cl);
  return box;
}

/* ============================================================
 * Y13 · safety-quiz（安全闯关）
 * 情景点选；错一步即警示（warnText）+ 正确做法（correctDo）；
 * 不记分不排名（B13.6 冻结）；话术与 C5/Y2 对齐由黄队定稿。
 * ============================================================ */
function widgetSafetyQuiz(p) {
  p = p || {};
  var scenarios = p.scenarios || [];
  var box = el("div", "chm-widget chm-squiz", "");
  box.appendChild(el("div", "chm-squiz-title", esc(p.title || "安全闯关")));
  var prog = el("div", "chm-replay-step", "");
  var stage = el("div", "chm-squiz-stage", "");
  var fb = el("div", "chm-q-fb", "");
  box.appendChild(prog);
  box.appendChild(stage);
  box.appendChild(fb);
  var idx = 0;
  function render() {
    fb.innerHTML = "";
    var sc = scenarios[idx];
    if (!sc) {
      prog.textContent = "全部通过";
      stage.innerHTML = "";
      stage.appendChild(el("div", "chm-state chm-state-ok",
        "✓ 安全闯关完成：规范每一条背后，都是一个真实事故——" +
        "让你\"犯错\"在虚拟里，别犯错在现实里。"));
      if (p.recordKey) store(p.recordKey, { done: true, ts: Date.now() });
      return;
    }
    prog.textContent = "第 " + (idx + 1) + " 关 / 共 " + scenarios.length + " 关";
    stage.innerHTML = "";
    stage.appendChild(el("div", "chm-squiz-scene", esc(sc.scene)));
    var opts = el("div", "chm-q-opts", "");
    (sc.options || []).forEach(function (op) {
      var b = el("button", "", esc(op.text));
      b.type = "button";
      b.addEventListener("click", function () {
        if (op.id === sc.correctId) {
          b.classList.add("judged-ok");
          fb.innerHTML = '<span class="ok">✓ 做对了</span> ' + esc(sc.correctDo || "");
          flash(box); vib(15);
          var nb = el("button", "chm-q-check", idx === scenarios.length - 1 ? "完成 ✓" : "下一关 →");
          nb.type = "button";
          nb.addEventListener("click", function () { idx++; render(); });
          fb.appendChild(document.createElement("br"));
          fb.appendChild(nb);
          nb.focus();
        } else {
          /* 错一步即警示 + 给正确做法（CHEM-R69） */
          b.classList.add("judged-bad");
          b.disabled = true;
          fb.innerHTML = '<span class="bad">' + esc(sc.warnText || "⚠ 错了") +
            "</span><br>正确做法：" + esc(sc.correctDo || "");
          flash(box); vib(40);
        }
      });
      opts.appendChild(b);
    });
    stage.appendChild(opts);
  }
  render();
  return box;
}

/* ---------------- 阶段三注册（类型名冻结，不得自创） ---------------- */
var CHEM_NEW_WIDGETS = {
  "particle-view": widgetParticleView,
  "molecule-build": widgetMoleculeBuild,
  "periodic-explore": widgetPeriodicExplore,
  "lab-assemble": widgetLabAssemble,
  "solution-mix": widgetSolutionMix,
  "reaction-particle": widgetReactionParticle,
  "ph-scale": widgetPhScale,
  "rate-equilibrium": widgetRateEquilibrium,
  "redox-track": widgetRedoxTrack,
  "safety-badge": widgetSafetyBadge,
  "ion-split": widgetIonSplit,
  "tri-rep": widgetTriRep,
  "read-gauge-chem": widgetReadGaugeChem,
  "stoich-steps": widgetStoichSteps,
  "safety-quiz": widgetSafetyQuiz,
  "side-compare": widgetSideCompare
};

  /* ---------------- 组件注册表 ---------------- */
  var WIDGETS = {
    "equation-balance": widgetEquationBalance,
    "formula-read": widgetFormulaRead,
    "balance-replay": widgetBalanceReplay,
    "particle-view": widgetParticleView,
    "molecule-build": widgetMoleculeBuild,
    "periodic-explore": widgetPeriodicExplore,
    "lab-assemble": widgetLabAssemble,
    "solution-mix": widgetSolutionMix,
    "reaction-particle": widgetReactionParticle,
    "ph-scale": widgetPhScale,
    "rate-equilibrium": widgetRateEquilibrium,
    "redox-track": widgetRedoxTrack,
    "safety-badge": widgetSafetyBadge,
    "ion-split": widgetIonSplit,
    "tri-rep": widgetTriRep,
    "read-gauge-chem": widgetReadGaugeChem,
    "stoich-steps": widgetStoichSteps,
    "safety-quiz": widgetSafetyQuiz,
    "side-compare": widgetSideCompare
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
