/* ============================================================
 * 生物 SPA 引擎（生物生产队 2026-10-17，骨架 + 试点 b18.1.3）
 *
 * 命名空间隔离铁律：本文件只使用 window.BIO_META（章注册表）、
 * window.BIO_CH（章数据）与 window.BIO（对外 API），只渲染
 * #biology-app 容器内；不读取、不调用其他学科引擎的任何变量
 * 与函数；CSS 类名前缀 bio-，见 css/biology.css。
 * localStorage 键一律 ltb-bio-* 命名空间；ltb-phy-* / ltb-chm-* /
 * ltb-math-* 与旧深链零触碰。
 *
 * 数据驱动：页面全部来自 window.BIO_CH[bNN].units[].lessons[]
 * .pages[]，pageKind = interact / explain / quiz；数据 schema
 * 见 data/b18.js 文件头（生物冻结版 v1.0，批量生产复用）。
 * 路由：#课号/页码（如 #b18.1.3/2）；旧 hash #bio=<课号> 兼容。
 * 一屏口径（白队 F1–F3）：.bio-zone 是唯一滚动容器
 * （overflow-y:auto + overscroll-behavior-y:contain），
 * 配套「下滑查看更多」提示；body 永不滚动；无 scrollIntoView。
 * 公式：原生 MathML（方案 A），window.MathMLCheck 不可用时
 * 本地兜底检测；不支持时降级为 translation 人话文本。
 *
 * 框架结构对标 modules/physics/js/physics.js（2026-10-17 现行）：
 * 选择层→学段目录→课；目录抽屉（按钮+左缘划出双开）；hash 路由；
 * 每课页码持久化 ltb-bio-page_<课号>；讲解块类型 lead/text/trap/
 * oldfriend/mathlink/slogan/widget；练习题 choice/fill/review。
 * 生物专属交互一律走 window.BIO_ENGINE（js/biology-engine.js），
 * 本文件不实现任何学科组件。
 * ============================================================ */
(function () {
  "use strict";

  var SVG_NS = "http://www.w3.org/2000/svg";
  var curPageId = ""; /* 当前页 id（课号-pN），组件实例 id 后缀用 */

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
    node.classList.remove("bio-flash");
    void node.offsetWidth;
    node.classList.add("bio-flash");
  }
  function store(k, v) {
    try { localStorage.setItem("ltb-bio-" + k, JSON.stringify(v)); }
    catch (e) { memStore["ltb-bio-" + k] = JSON.stringify(v); } /* Y1：禁用时内存降级 */
  }
  var memStore = {};
  function load(k, fb) {
    try {
      var v = JSON.parse(localStorage.getItem("ltb-bio-" + k));
      return v == null ? fb : v;
    } catch (e) {
      try {
        var m = JSON.parse(memStore["ltb-bio-" + k]);
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
    return "var(--bio-" + role + ")";
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
    return '<span class="bio-formula-fallback">' + esc(f.translation || "") + "</span>";
  }
  /* 正文块内的 <span class="bio-f" data-f="key"> 占位替换 */
  function hydrateFormulas(root, formulas) {
    var spans = root.querySelectorAll(".bio-f");
    for (var i = 0; i < spans.length; i++) {
      var key = spans[i].getAttribute("data-f");
      spans[i].innerHTML = formulaHtml(formulas, key);
    }
  }

  /* ---------------- 数据查找 ---------------- */
  function readyChapters() {
    var meta = (window.BIO_META && window.BIO_META.chapters) || [];
    return meta.filter(function (c) {
      var ch = (window.BIO_CH || {})[c.id];
      return ch && (ch.units || []).length > 0;
    });
  }
  function findLesson(lessonId) {
    var CH = window.BIO_CH || {};
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

  /* ---------------- 入口选择层（E-01 黄队裁决 2026-10-16，裁决记录见
   * bio-audit/engine-visual-20261016/FIX-REPORT.md） ----------------
   * 动线：选择层（默认）→ 学段目录（可返回选择层）→ 课；深链直达课不变。
   * 学段划分对齐课程标准：p00–p10 初中（八年级起步→九年级），
   * p11–p17 高中（必修一 Ch1–2 起）。章 id 字符串比较（p09<p10<p11 成立）。 */
  var browseRoot = null, appRoot = null, cur = null, curTrack = null;
  var BIO_TRACKS = [
    { id: "junior", name: "初中生物", tagline: "七年级起步",
      desc: "从身边的生物看起：细胞、植物、人体、动物、微生物——结构—功能对问贯穿始终。",
      chFrom: "b00", chTo: "b10" },
    { id: "senior", name: "高中生物", tagline: "必修＋选择性必修",
      desc: "分子与细胞、遗传、稳态、生态——从机制讲到系统。",
      chFrom: "b11", chTo: "b25" }
  ];
  function bioTrackOf(id) {
    for (var i = 0; i < BIO_TRACKS.length; i++)
      if (BIO_TRACKS[i].id === id) return BIO_TRACKS[i];
    return null;
  }
  function trackChapters(trackId) {
    var t = bioTrackOf(trackId);
    if (!t) return [];
    return readyChapters().filter(function (c) {
      return c.id >= t.chFrom && c.id <= t.chTo;
    });
  }
  function chapterDoneCount(ch) {
    var n = 0, done = 0;
    ((window.BIO_CH[ch.id] || {}).units || []).forEach(function (u) {
      ((u.lessons || [])).forEach(function (l) {
        n++;
        if (isDone(l.id)) done++;
      });
    });
    return { n: n, done: done };
  }
  function browseCounts() {
    var nLessons = 0, nPages = 0;
    readyChapters().forEach(function (c) {
      (((window.BIO_CH[c.id] || {}).units) || []).forEach(function (u) {
        (((u.lessons) || [])).forEach(function (l) {
          nLessons++;
          nPages += ((l.pages || []).length);
        });
      });
    });
    return { ch: readyChapters().length, lessons: nLessons, pages: nPages };
  }
  /* E-03：返回工具箱首页（与数学/英语入口一致） */
  function homeLink(cls) {
    var a = el("a", cls || "bio-home-link", "← 返回工具箱首页");
    a.href = "../../index.html";
    a.setAttribute("aria-label", "返回工具箱首页");
    return a;
  }
  /* E-02：继续学习卡片（对齐化学 G2；键沿用生物既有约定
   * ltb-bio-visited / ltb-bio-page_<课号>，只读不写） */
  function continueCard() {
    var visited = load("visited", {});
    var best = null, bestTs = 0;
    Object.keys(visited).forEach(function (lid) {
      var ts = (visited[lid] || {}).ts || 0;
      if (ts > bestTs && findLesson(lid)) { bestTs = ts; best = lid; }
    });
    if (!best) return null;
    var f = findLesson(best);
    var pg = loadPage(best) || 0;
    var card = el("button", "bio-continue", "");
    card.type = "button";
    card.innerHTML = '<span class="bio-continue-t">▶ 继续学习</span>' +
      '<span class="bio-continue-l">' + esc(best) + "《" + esc(f.lesson.title || "") + "》" +
      "（上次看到第 " + (pg + 1) + " 页）</span>";
    card.addEventListener("click", function () { goLesson(best); });
    return card;
  }
  /* E-01：选择层（默认入口） */
  function renderSelection() {
    browseRoot.innerHTML = "";
    curTrack = null;
    var wrap = el("div", "bio-browse bio-select");
    wrap.appendChild(el("h1", "", "生物 · 选择板块"));
    var bc = browseCounts();
    wrap.appendChild(el("p", "bio-browse-sub",
      bc.ch + " 章 · " + bc.lessons + " 课 · " + bc.pages + " 页"));
    wrap.appendChild(homeLink());
    var cc = continueCard();
    if (cc) wrap.appendChild(cc);
    var grid = el("div", "bio-track-grid");
    BIO_TRACKS.forEach(function (t) {
      var chs = trackChapters(t.id);
      var nL = 0, done = 0;
      chs.forEach(function (c) {
        var dc = chapterDoneCount(c);
        nL += dc.n; done += dc.done;
      });
      var card = el("button", "bio-track-card tb-card", "");
      card.type = "button";
      card.setAttribute("aria-label", "进入" + t.name);
      card.innerHTML =
        '<span class="bio-track-name">' + esc(t.name) +
        ' <small>· ' + esc(t.tagline) + "</small></span>" +
        '<span class="bio-track-desc">' + esc(t.desc) + "</span>" +
        '<span class="bio-track-meta">' + (chs.length ? chs.length + " 章 · " + nL + " 课" +
        (done > 0 ? ' · <span class="bio-track-done">已学完 ' + done + " 课</span>" : "") : "敬请期待") +
        "</span>" +
        '<span class="tb-btn-primary" style="align-self:flex-start">进入学习 →</span>';
      (function (tid) {
        card.addEventListener("click", function () { showTrackBrowser(tid); });
      })(t.id);
      grid.appendChild(card);
    });
    wrap.appendChild(grid);
    browseRoot.appendChild(wrap);
  }
  /* E-01：学段目录（由选择层唤出，可返回选择层） */
  function renderTrackBrowser(trackId) {
    var t = bioTrackOf(trackId);
    if (!t) { renderSelection(); return; }
    curTrack = trackId;
    browseRoot.innerHTML = "";
    var wrap = el("div", "bio-browse");
    var back = el("button", "tb-back", "← 返回选择");
    back.type = "button";
    back.addEventListener("click", function () { showSelection(); });
    wrap.appendChild(back);
    wrap.appendChild(el("h1", "", "生物 · " + t.name));
    var chs = trackChapters(trackId);
    var list = el("ul", "bio-ch-list");
    chs.forEach(function (c) {
      var ch = window.BIO_CH[c.id];
      var dc = chapterDoneCount(c);
      var li = el("li", "");
      var btn = el("button", "bio-ch-btn",
        '<span class="bio-ch-id">' + esc(c.id) + "</span>" +
        '<span class="bio-ch-title">' + esc(c.title) + "</span>" +
        '<span class="bio-ch-count">' + dc.done + "/" + dc.n + " 课</span>");
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
        sub.appendChild(el("h3", "bio-unit", esc(u.id) + " · " + esc(u.title)));
        var ul = el("ul", "bio-lesson-list");
        (u.lessons || []).forEach(function (l) {
          var done = isDone(l.id) ? '<span class="bio-done">✓ 已学完</span>' : "";
          var lb = el("button", "bio-lesson-btn",
            '<span class="bio-lesson-id">' + esc(l.id) + "</span>" +
            '<span class="bio-lesson-title">' + esc(l.title) + "</span>" +
            done + '<span class="bio-lesson-go">进入 →</span>');
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
  function showSelection() {
    cur = null;
    if (appRoot) appRoot.hidden = true;
    if (browseRoot) {
      browseRoot.hidden = false;
      renderSelection();
    }
    try {
      if (parseHash()) history.replaceState(null, "", location.pathname + location.search);
    } catch (e) {}
  }
  function showTrackBrowser(trackId) {
    cur = null;
    if (appRoot) appRoot.hidden = true;
    if (browseRoot) {
      browseRoot.hidden = false;
      renderTrackBrowser(trackId);
    }
    try {
      if (parseHash()) history.replaceState(null, "", location.pathname + location.search);
    } catch (e) {}
  }
  /* 课页"← 返回"/抽屉"← 课程首页"/学完回退：回到学段目录（深链进入则回选择层） */
  function showBrowser() {
    if (curTrack) showTrackBrowser(curTrack);
    else showSelection();
  }
  function renderBlock(b, formulas) {
    if (b.type === "lead") return el("p", "bio-lead", esc(b.text));
    if (b.type === "text") {
      var t = el("p", "bio-text", b.html || "");
      hydrateFormulas(t, formulas);
      return t;
    }
    if (b.type === "trap") return el("div", "bio-trap", esc(b.text));
    /* 适用边界/声明小字（常驻，如 B-F6 scopeNote；BIO-AX01 当页显性化） */
    if (b.type === "note") return el("div", "bio-note", esc(b.text));
    if (b.type === "oldfriend") {
      var o = el("div", "bio-oldfriend", b.text || "");
      hydrateFormulas(o, formulas);
      return o;
    }
    /* R-P2（2026-10-15 自学审计整改）：mathlink 自动转跨科深链。
     * 数学目标用数学模块既有 hash 格式 #p=<pageId>（modules/math/js/math.js
     * L411 原生支持，不自创格式）；生物内部课号（如 p12.1.3）转本模块 #课号。
     * token 按长度降序匹配，避免 "代数 8.3" 误吞 "代数 8.3.2"；
     * 无匹配的文本保持纯文本（不造死链）。 */
    var XLINK_MATH = {
      "代数 8.3.2": "ch08-u3-l2-p1", "代数 8.3": "ch08-u3-l1-p1",
      "代数 8.1": "ch08-u1-l1-p1", "代数 8.2": "ch08-u2-l1-p1",
      "代数 6.1": "ch06-u1-l1-p1", "代数 6.2": "ch06-u2-l1-p1",
      "代数 7.1": "ch07-u1-l1-p1", "代数 7.2": "ch07-u2-l1-p1",
      "代数 11.1": "ch11-u1-l1-p1", "代数 12.1": "ch12-u1-l1-p1",
      "代数 ch00": "ch00-u1-l1-p1", "代数 ch01": "ch01-u1-l1-p1",
      "代数 ch02": "ch02-u1-l1-p1", "代数 ch03": "ch03-u1-l1-p1",
      "代数 ch05": "ch05-u1-l1-p1", "代数 ch10": "ch10-u0-l1-p1",
      "几何 g01–g04": "g01-u1-l1-p1",
      "几何 g01": "g01-u1-l1-p1", "几何 g02": "g02-u1-l1-p1",
      "几何 g06": "g06-u1-l1-p1", "几何 g07": "g07-u1-l1-p1",
      "几何 g09.1.1": "g09-u1-l1-p1", "几何 g09": "g09-u1-l1-p1",
      "几何 g10": "g10-u1-l1-p1", "几何 g13": "g13-u1-l0-p1"
    };
    /* 组合 token（p17.3.1-p2 "代数 6.2/7.2"）：拆成两个锚点，"/" 留原文 */
    var XLINK_COMBO = {
      "代数 8.1/8.2.1": [
        ["代数 8.1", "../math/index.html#p=ch08-u1-l1-p1"],
        ["8.2.1", "../math/index.html#p=ch08-u2-l1-p1"]
      ],
      "代数 6.2/7.2": [
        ["代数 6.2", "../math/index.html#p=ch06-u2-l1-p1"],
        ["7.2", "../math/index.html#p=ch07-u2-l1-p1"]
      ]
    };
    var XLINK_BIO = { "b18.1.1": 1, "b18.1.2": 1, "b18.1.3": 1, "b18.1.4": 1, "b18.1.5": 1, "b16.1.1": 1, "b16.1.2": 1, "b16.1.3": 1, "b16.1.4": 1, "b16.1.5": 1, "b17.1.1": 1, "b17.1.2": 1, "b17.1.3": 1, "b17.1.4": 1, "b17.1.5": 1, "b19.1.1": 1, "b19.1.2": 1, "b19.1.3": 1, "b19.1.4": 1, "b19.1.5": 1, "b20.1.1": 1, "b20.1.2": 1, "b20.1.3": 1, "b20.1.4": 1, "b21.1.1": 1, "b21.1.2": 1, "b21.1.3": 1, "b21.1.4": 1, "b21.1.5": 1, "b03.1.1": 1, "b03.1.2": 1, "b03.1.3": 1, "b03.1.4": 1, "b03.1.5": 1, "b03.1.6": 1, "b05.1.1": 1, "b05.1.2": 1, "b05.1.3": 1, "b05.1.4": 1, "b13.1.1": 1, "b13.1.2": 1, "b13.1.3": 1, "b13.1.4": 1, "b06.1.1": 1, "b06.2.1": 1, "b06.2.2": 1, "b06.2.3": 1, "b06.2.4": 1, "b14.1.1": 1, "b14.1.2": 1, "b14.1.3": 1, "b14.1.4": 1, "b14.1.5": 1 }; /* 本模块课号 → #课号；未生产课号不许入表（门禁⑨；P3 新增 b18.1.1/1.2/1.4/1.5；P4 新增 b19.1.1–1.5；P5 新增 b20.1.1–1.4；P6 新增 b21.1.1–1.5；P7 新增 b03.1.1–1.6；P8 新增 b05.1.1–1.4/b13.1.1–1.4；P9 新增 b06.1.1/b06.2.1–2.4/b14.1.1–1.5） */
    function xlinkHref(token) {
      if (XLINK_BIO[token]) return "#" + token;
      var pid = XLINK_MATH[token];
      return pid ? "../math/index.html#p=" + pid : null;
    }
    function renderMathlink(b) {
      var div = el("div", "bio-mathlink", null);
      var segs = [{ t: String(b.text || ""), link: null }];
      var tokens = Object.keys(XLINK_COMBO).concat(Object.keys(XLINK_MATH), Object.keys(XLINK_BIO))
        .sort(function (a, c) { return c.length - a.length; });
      tokens.forEach(function (tok) {
        var combo = XLINK_COMBO[tok];
        var next = [];
        segs.forEach(function (s) {
          if (s.link || s.t.indexOf(tok) < 0) { next.push(s); return; }
          var parts = s.t.split(tok);
          for (var i = 0; i < parts.length; i++) {
            if (i > 0) {
              if (combo) {
                next.push({ t: combo[0][0], link: combo[0][1] });
                next.push({ t: "/", link: null });
                next.push({ t: combo[1][0], link: combo[1][1] });
              } else {
                next.push({ t: tok, link: xlinkHref(tok) });
              }
            }
            if (parts[i]) next.push({ t: parts[i], link: null });
          }
        });
        segs = next;
      });
      segs.forEach(function (s) {
        if (s.link) {
          var a = document.createElement("a");
          a.className = "bio-xlink";
          a.href = s.link;
          a.textContent = s.t;
          div.appendChild(a);
        } else {
          div.appendChild(document.createTextNode(s.t));
        }
      });
      return div;
    }
    if (b.type === "mathlink") return renderMathlink(b);
    if (b.type === "slogan") return el("div", "bio-slogan", esc(b.text));
    if (b.type === "widget") {
      return renderWidget((b.widget || {}).type, (b.widget || {}).params, curPageId + "-wb");
    }
    return el("div", "", "");
  }

  /* ---------------- 练习题（Y3 判分口径） ---------------- */
  function renderQuestion(q) {
    /* 章末小结与习题约定（WIDGETS.md §章末习题）：type "review" 为静态
     * 小结块（无判分），与 choice/fill 同属 kind:"quiz" 页。 */
    if (q.type === "review") {
      var rv = el("div", "bio-review");
      rv.appendChild(el("div", "bio-review-head", "📝 本章小结"));
      var rb = el("div", "bio-review-body", q.html || "");
      hydrateFormulas(rb, {});
      rv.appendChild(rb);
      return rv;
    }
    var box = el("div", "bio-q");
    var fb = el("div", "bio-q-fb", "");
    var wrong = 0;
    function say(ok, msg, showTip) {
      fb.innerHTML = (ok ? '<span class="ok">✓ 答对了</span> ' : '<span class="bad">✗ 不对</span> ') +
        esc(msg) + (showTip && q.tip ? '<br><span class="tip">💡 ' + esc(q.tip) + "</span>" : "");
      flash(box);
    }
    if (q.type === "choice") {
      box.appendChild(el("div", "bio-q-stem", esc(q.stem)));
      var opts = el("div", "bio-q-opts");
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
            /* R-P5（2026-10-15 自学审计整改）：首次答错即给诊断 tip，
             * 不许只"再想想"（零基础学生第一次错时就需要方向） */
            say(false, "再想想。", true);
          }
        });
        opts.appendChild(b);
      });
      box.appendChild(opts);
    } else if (q.type === "fill") {
      var stem = el("div", "bio-q-stem", "");
      stem.innerHTML = esc(q.stemBefore || "") +
        ' <input type="text" style="width:7em;display:inline-block;" aria-label="填空">' +
        " " + esc(q.stemAfter || "") +
        (q.hint ? ' <span style="color:var(--bio-ink-soft);font-size:0.82rem;">' + esc(q.hint) + "</span>" : "");
      box.appendChild(stem);
      var input = stem.querySelector("input");
      var btn = el("button", "bio-q-check", "检查");
      btn.type = "button";
      btn.addEventListener("click", function () {
        var v = norm(input.value);
        /* R2（2026-10-15）：候选集 = canonical + accept 全集；
         * 旧式 (q.accept || [q.answer]) 在 accept 存在时丢弃 canonical，
         * 致 Q3 填 kg/m³（canonical）被判错。 */
        var candidates = [q.answer].concat(q.accept || []);
        var ok = candidates.some(function (a) { return norm(a) === v; });
        if (ok) say(true, "单位正确。", true);
        /* R-P5（2026-10-15 自学审计整改）：首次答错即给诊断 tip，见上 */
        else { wrong++; say(false, "再想想。", true); }
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
  }  /* ---------------- 通用 UI 工件 ---------------- */
  function fmtN(n, d) {
    if (!isFinite(n)) return "—";
    var s = Number(n).toFixed(d == null ? 1 : d);
    return s.replace(/\.0+$/, "").replace(/(\.\d*?)0+$/, "$1");
  }
  /* Canvas 取色：解析主题变量（深色自动跟随）；无 getComputedStyle
   *（如 smoke stub）时回退 Okabe-Ito 字面值——回退只在渲染器内部，
   * params 里永不出现色值。 */
  var CSSVAR_FALLBACK = {
    "--bio-known": "#0072B2", "--bio-target": "#D55E00",
    "--bio-substrate": "#E69F00", "--bio-product": "#56B4E9",
    "--bio-organelle": "#009E73", "--bio-gene": "#CC79A7",
    "--bio-membrane": "#1A1A1A", "--bio-highlight": "#F0E442",
    "--bio-aux": "#7A7A7A", "--bio-text": "#1A1A1A", "--bio-bg": "#FFFFFF"
  };
  function cssVar(name) {
    try {
      if (typeof window.getComputedStyle === "function" && document.getElementById) {
        var host = document.getElementById("bio-app") || document.body;
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
  /* 滑块行：原生 range（轨道 ≥44px）+ −/+ 步进按钮（W-P9：440Hz 这类  /* ---------------- 生物组件分发 ----------------
   * 全部生物专属交互走 window.BIO_ENGINE（js/biology-engine.js），
   * 该渲染器基于 window.Eng 原语（konva-view / input / steps）实现，
   * 不得回退手搓一次性组件（见 docs/ENGINE.md §五迁移指南）。
   * 未知类型 → 警告占位，不静默吞掉（白队可检）。 */
  var BIOLOGY_INTERACTION_TYPES = [
    "pedigree-quest", "mitosis-stage", "punnett-lab"
  ];
  function renderWidget(type, params, wid) {
    if (window.BIO_ENGINE && typeof window.BIO_ENGINE.render === "function") {
      var node = window.BIO_ENGINE.render(type, params || {}, wid || "bio-w");
      if (node) return node;
    }
    if (typeof console !== "undefined" && console.warn)
      console.warn("[biology] 未支持的组件类型：" + type + "（BIO_ENGINE 未加载或无此渲染器）");
    return el("div", "bio-unknown", "未支持的组件：" + esc(type));
  }

  function pageKindLabel(kind) {
    return { interact: "交互", explain: "讲解", quiz: "练习" }[kind] || kind;
  }
  function renderZone(page, formulas) {
    var zone = el("div", "bio-zone");
    if (page.kind === "interact") {
      if (page.exploreTip) zone.appendChild(el("div", "bio-tip", "🖐 " + esc(page.exploreTip)));
      (page.widgets || []).forEach(function (w, wi) {
        zone.appendChild(renderWidget(w.type, w.params, curPageId + "-w" + wi));
      });
      /* 交互页可带讲解块（如 b18.1.3-p4 的辨析②回填），渲染在组件之后 */
      (page.blocks || []).forEach(function (b) { zone.appendChild(renderBlock(b, page.formulas || {})); });
    } else if (page.kind === "explain") {
      (page.blocks || []).forEach(function (b) { zone.appendChild(renderBlock(b, formulas)); });
    } else if (page.kind === "quiz") {
      /* 引擎试点：YP-05/YP-15 练习判分器（page.engine.grader 字段） */
      if (page.engine && page.engine.grader && window.BIO_ENGINE &&
          typeof window.BIO_ENGINE.renderQuizPage === "function") {
        zone.appendChild(window.BIO_ENGINE.renderQuizPage(page, curPageId));
      } else {
        (page.questions || []).forEach(function (q) { zone.appendChild(renderQuestion(q)); });
      }
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

    var head = el("header", "bio-head");
    /* 目录抽屉入口（ux-review §2.1）：☰ + "目录"文字，≥44px，aria-expanded 同步 */
    var menuBtn = el("button", "bio-menu-btn", "☰ 目录");
    menuBtn.type = "button";
    menuBtn.setAttribute("aria-label", "打开目录");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.addEventListener("click", function () {
      if (drawerOpen) closeDrawer(); else openDrawer();
    });
    head.appendChild(menuBtn);
    drawerBtn = menuBtn;
    var back = el("button", "bio-back", "← 返回");
    back.type = "button";
    back.setAttribute("aria-label", "返回章节浏览");
    back.addEventListener("click", function () { showBrowser(); });
    head.appendChild(back);
    head.appendChild(el("h1", "", esc(found.lesson.title)));
    head.appendChild(el("span", "bio-page-tag",
      pageKindLabel(page.kind) + " " + (cur.pageIdx + 1) + "/" + pages.length));
    appRoot.appendChild(head);

    appRoot.appendChild(el("div", "bio-crumb",
      esc(found.chapter.id) + " · " + esc(found.unit.title) + " · " + esc(found.lesson.id)));

    var main = el("main", "bio-main");
    main.appendChild(el("h2", "bio-title", esc(page.title)));
    curPageId = found.lesson.id + "-p" + (cur.pageIdx + 1);
    var zone = renderZone(page, formulas);
    var zoneWrap = el("div", "bio-zone-wrap");
    zoneWrap.appendChild(zone);
    var more = el("button", "bio-more", "");
    more.type = "button";
    more.innerHTML =
      '<span class="bio-more-pill"><span>↓ 下面还有</span>' +
      '<span class="arr">↓</span></span>';
    more.setAttribute("aria-label", "滚动到底部操作区");
    more.addEventListener("click", function () {
      try { zone.scrollTo({ top: zone.scrollHeight, behavior: "smooth" }); }
      catch (e) { zone.scrollTop = zone.scrollHeight; }
    });
    zoneWrap.appendChild(more);
    main.appendChild(zoneWrap);
    if (page.point) {
      main.appendChild(el("p", "bio-point" + (page.pointScroll ? " scroll" : ""),
        "💡 " + esc(page.point)));
    }
    appRoot.appendChild(main);

    var pager = el("nav", "bio-pager");
    var prev = el("button", "", "← 上一页");
    var next = el("button", "bio-next", cur.pageIdx === pages.length - 1 ? "完成 ✓" : "下一页 →");
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
    var m = h.match(/^#(b\d+\.\d+\.\d+)(?:\/(\d+))?$/);
    if (m) return { lesson: m[1], page: m[2] ? parseInt(m[2], 10) - 1 : 0 };
    var m2 = h.match(/[#&?]bio=([a-z0-9.]+)/i);
    if (m2) return { lesson: m2[1], page: 0, legacy: true }; /* 旧 hash 兼容：进第 1 页 */
    return null;
  }
  /* 每课页码持久化 `ltb-bio-page_<课号>`；file:// 下降级为内存（不报错） */
  var pageMem = {};
  function savePage(lessonId, pageIdx) {
    try { localStorage.setItem("ltb-bio-page_" + lessonId, String(pageIdx)); }
    catch (e) { pageMem[lessonId] = pageIdx; }
  }
  function loadPage(lessonId) {
    try {
      var v = parseInt(localStorage.getItem("ltb-bio-page_" + lessonId), 10);
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
    try { return localStorage.getItem("bio_done_" + lessonId) === "1"; }
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
  /* showBrowser 已上移为"回学段目录/选择层"分发器（E-01），此处不再重复定义 */
  function route() {
    var h = parseHash();
    if (h && hasLesson(h.lesson)) {
      var pages = (findLesson(h.lesson).lesson.pages || []).length;
      var idx = Math.max(0, Math.min(pages - 1, h.page || 0));
      /* 已在该课该页 → 不重渲染（抽屉开关不触发，保证组件状态）；
         但原始页码越界被钳制时仍归一 URL，避免地址栏停留在非法页码 */
      if (cur && cur.found && cur.found.lesson.id === h.lesson && cur.pageIdx === idx) {
        if ((h.page || 0) !== idx) syncHash(true);
        return;
      }
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
    drawerMask = el("div", "bio-drawer-mask");
    drawerMask.addEventListener("click", closeDrawer);
    drawer = el("div", "bio-drawer");
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
    var head = el("div", "bio-drawer-head");
    if (cur && cur.found) {
      head.appendChild(el("div", "bio-drawer-ch", esc(cur.found.chapter.title)));
      head.appendChild(el("div", "bio-drawer-page",
        "第 " + (cur.pageIdx + 1) + " 页 / 共 " + (cur.found.lesson.pages || []).length + " 页"));
    } else {
      head.appendChild(el("div", "bio-drawer-ch", "目录"));
    }
    var close = el("button", "bio-drawer-close", "✕");
    close.type = "button";
    close.setAttribute("aria-label", "关闭目录");
    close.addEventListener("click", closeDrawer);
    head.appendChild(close);
    drawer.appendChild(head);
    var list = el("div", "bio-drawer-list");
    var visited = load("visited", {});
    var curLessonBtn = null, curChBox = null;
    readyChapters().forEach(function (c) {
      var ch = window.BIO_CH[c.id];
      if (!ch) return;
      var chBox = el("div", "bio-drawer-chbox");
      var isCur = c.id === curChId;
      var chBtn = el("button", "bio-drawer-chbtn", "");
      chBtn.type = "button";
      chBtn.innerHTML = "<span>" + esc(c.id) + " · " + esc(c.title) + "</span>" +
        '<span class="bio-drawer-arrow">' + (isCur ? "▾" : "▸") + "</span>";
      chBtn.setAttribute("aria-expanded", isCur ? "true" : "false");
      var lessonsBox = el("div", "bio-drawer-lessons");
      lessonsBox.style.display = isCur ? "" : "none";
      (function (cb, lb, ab) {
        cb.addEventListener("click", function () {
          var open = lb.style.display !== "none";
          lb.style.display = open ? "none" : "";
          cb.setAttribute("aria-expanded", open ? "false" : "true");
          ab.textContent = open ? "▸" : "▾";
        });
      })(chBtn, lessonsBox, chBtn.querySelector(".bio-drawer-arrow"));
      chBox.appendChild(chBtn);
      (ch.units || []).forEach(function (u) {
        (u.lessons || []).forEach(function (l) {
          var lb = el("button", "bio-drawer-lesson", "");
          lb.type = "button";
          var isCurL = l.id === curId;
          /* 三编码：背景高亮 + 左侧 4px 指示条 + "当前"文字徽章；
           * 状态点：当前课实心圆 / 已访问空心圆（首版口径） */
          var mark = isCurL ? '<span class="bio-dot-cur" aria-hidden="true"></span>'
            : visited[l.id] ? '<span class="bio-dot-seen" aria-hidden="true"></span>' : "";
          lb.innerHTML = mark + '<span class="bio-drawer-lt">' + esc(l.title) + "</span>" +
            (isCurL ? '<span class="bio-drawer-cur">当前</span>' : "");
          if (isCurL) { lb.classList.add("bio-drawer-cur-lesson"); curLessonBtn = lb; }
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
    var foot = el("div", "bio-drawer-foot");
    var home = el("button", "bio-mini", "← 课程首页");
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
    drawer.classList.add("bio-drawer-anim");
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
    browseRoot = document.getElementById("bio-browser");
    appRoot = document.getElementById("bio-app");
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

  window.BIO = {
    hasLesson: hasLesson,
    open: openLesson,
    close: function () { cur = null; },
    /* 阶段三批量生产用：渲染单个组件（冒烟/调试）；types 与校验清单同步 */
    widget: renderWidget,
    types: BIOLOGY_INTERACTION_TYPES
  };
})();
