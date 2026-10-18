/* ============================================================
 * 学习工具箱 · 地理 · 主引擎（骨架 + 组件渲染）
 *
 * 全站入口标准（对标 modules/physics/index.html/js）：
 * 概览在前 + 学段卡片 + 目录可唤出 + 继续学习/进度 +
 * `#课号/页码` 持久化；localStorage 键 `ltb-geo-*` 与既有学科隔离；
 * 深色模式跟随系统（独立断言）。
 * 导航标配（playbook ④）：顶栏「目录」按钮 + 左缘划出手势双开；
 * 点遮罩/左划/按钮再点/Esc 关闭；学习页目录默认收起；
 * fixed 覆盖层不挤压主内容；每课页码持久化、重进恢复。
 * ============================================================ */
(function () {
  "use strict";

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
  var memStore = {};
  function store(k, v) {
    try { localStorage.setItem("ltb-geo-" + k, JSON.stringify(v)); }
    catch (e) { memStore["ltb-geo-" + k] = JSON.stringify(v); }
  }
  function load(k, fb) {
    try {
      var v = localStorage.getItem("ltb-geo-" + k);
      if (v != null) return JSON.parse(v);
    } catch (e) {}
    try {
      var m = memStore["ltb-geo-" + k];
      if (m != null) return JSON.parse(m);
    } catch (e2) {}
    return fb;
  }

  /* 批 3 P1：记录键前缀统一（双读 + 一次性迁移）。
   * 老键：批 1 guess-verify/contour-quest 经 store("rec-" + recordKey)
   *   写入，实际键为 "ltb-geo-rec-<recordKey>"；
   * 新键：直接 "ltb-geo-<recordKey>"。
   * 启动时一次性把老键搬到新键（新键已有值则保留新键，不覆盖），
   * 随后删除老键，不丢学习进度。幂等：老键搬完即删，重复运行无操作。 */
  var _geoMigrated = false;
  function migrateLegacyRecords() {
    if (_geoMigrated) return; _geoMigrated = true;
    var olds = [];
    try {
      for (var i = 0; i < localStorage.length; i++) {
        var k = localStorage.key(i);
        if (k && k.indexOf("ltb-geo-rec-") === 0) olds.push(k);
      }
    } catch (e) { return; }
    olds.forEach(function (ok) {
      var nk = "ltb-geo-" + ok.slice("ltb-geo-rec-".length);
      try {
        if (localStorage.getItem(nk) == null) localStorage.setItem(nk, localStorage.getItem(ok));
        localStorage.removeItem(ok);
      } catch (e) {}
    });
  }

  /* ---------------- 数据 ---------------- */
  var GEO_TRACKS = [
    { id: "junior", name: "初中", desc: "七年级 → 八年级：地图、气候、中国地理", chapters: ["dg00","dg01","dg02","dg03","dg04","dg05","dg06","dg07","dg08","dg09","dg10","dg11","dg12","dg13"] },
    { id: "senior", name: "高中", desc: "必修 + 选择性必修：地球运动、人地关系", chapters: ["dg14","dg15"] }
  ];
  function meta() { return (window.GEO_META && window.GEO_META.chapters) || []; }
  function readyChapters() {
    var data = window.GEOGRAPHY_DATA || {};
    return meta().filter(function (c) { return !!data[c.id]; });
  }
  function findLesson(lessonId) {
    var data = window.GEOGRAPHY_DATA || {};
    var found = null;
    Object.keys(data).forEach(function (chId) {
      ((data[chId].units) || []).forEach(function (u) {
        ((u.lessons) || []).forEach(function (l) {
          if (l.id === lessonId) {
            var ch = null;
            meta().forEach(function (c) { if (c.id === chId) ch = c; });
            found = { chapter: ch || { id: chId, title: chId }, unit: u, lesson: l };
          }
        });
      });
    });
    return found;
  }
  function hasLesson(id) { return !!findLesson(id); }
  function trackOf(chId) {
    for (var i = 0; i < GEO_TRACKS.length; i++) {
      if (GEO_TRACKS[i].chapters.indexOf(chId) >= 0) return GEO_TRACKS[i];
    }
    return GEO_TRACKS[0];
  }

  /* ---------------- 顶栏 / 视图根 ---------------- */
  var browseRoot = null, appRoot = null, topbar = null, cur = null;

  function renderTopbar() {
    topbar.innerHTML = "";
    var btn = el("button", "geog-btn", "☰ 目录");
    btn.setAttribute("aria-label", "打开目录");
    btn.setAttribute("aria-expanded", "false");
    btn.addEventListener("click", function () {
      if (drawerOpen) closeDrawer(); else openDrawer();
    });
    drawerBtn = btn;
    topbar.appendChild(btn);
    var h = el("h1", "", cur && cur.found ? esc(cur.found.lesson.title) : "地理 · 选择板块");
    topbar.appendChild(h);
    if (cur && cur.found) {
      var pages = cur.found.lesson.pages || [];
      topbar.appendChild(el("span", "geog-page-ind", (cur.pageIdx + 1) + " / " + pages.length));
    }
  }

  /* ---------------- 概览（学段卡片 + 继续学习） ---------------- */
  function showBrowser() {
    cur = null;
    renderTopbar();
    browseRoot.hidden = false;
    appRoot.hidden = true;
    browseRoot.innerHTML = "";
    var hero = el("div", "geog-hero",
      "<h2>地理 · 选择板块</h2>" +
      "<p>地图是地理的第二语言：先学会“读”，再学“说”。从七年级出发，一路到高中。</p>");
    browseRoot.appendChild(hero);
    // 继续学习
    var visited = load("visited", {});
    var best = null;
    Object.keys(visited).forEach(function (lid) {
      if (!hasLesson(lid)) return;
      if (!best || (visited[lid].ts || 0) > (visited[best].ts || 0)) best = lid;
    });
    if (best) {
      var f = findLesson(best);
      var card = el("button", "geog-card tb-card",
        "<h3>继续学习</h3><p>" + esc(f.lesson.id + " " + f.lesson.title) + "</p>" +
        '<span class="go">接着上次的页码进入 →</span>');
      card.addEventListener("click", function () { goLesson(best); });
      browseRoot.appendChild(card);
    }
    // 学段卡片
    browseRoot.appendChild(el("h3", "geog-sec-title", "选学段"));
    var cards = el("div", "geog-cards");
    GEO_TRACKS.forEach(function (t) {
      var ready = readyChapters().filter(function (c) { return t.chapters.indexOf(c.id) >= 0; });
      if (!ready.length) return;
      var n = 0;
      ready.forEach(function (c) {
        (((window.GEOGRAPHY_DATA[c.id] || {}).units) || []).forEach(function (u) {
          n += ((u.lessons) || []).length;
        });
      });
      var c = el("button", "geog-card tb-card",
        "<h3>" + esc(t.name) + "</h3><p>" + esc(t.desc) + "</p>" +
        '<p class="go">' + ready.length + " 章 · " + n + " 课已就位 →</p>");
      (function (tid) {
        c.addEventListener("click", function () { showTrackBrowser(tid); });
      })(t.id);
      cards.appendChild(c);
    });
    browseRoot.appendChild(cards);
  }

  function showTrackBrowser(trackId) {
    var t = null;
    GEO_TRACKS.forEach(function (x) { if (x.id === trackId) t = x; });
    if (!t) { showBrowser(); return; }
    renderTopbar();
    browseRoot.hidden = false;
    appRoot.hidden = true;
    browseRoot.innerHTML = "";
    var back = el("button", "geog-btn", "← 学段");
    back.addEventListener("click", showBrowser);
    browseRoot.appendChild(back);
    browseRoot.appendChild(el("h3", "geog-sec-title", esc(t.name) + " · 章节"));
    var ready = readyChapters().filter(function (c) { return t.chapters.indexOf(c.id) >= 0; });
    ready.forEach(function (c) {
      browseRoot.appendChild(el("div", "geog-drawer-ch", esc(c.id + " " + c.title)));
      var data = (window.GEOGRAPHY_DATA || {})[c.id] || {};
      ((data.units) || []).forEach(function (u) {
        ((u.lessons) || []).forEach(function (l) {
          var pages = (l.pages || []).length;
          var row = el("button", "geog-lesson-row",
            '<span class="t">' + esc(l.id + " " + l.title) +
            '<br><span class="sub">' + pages + " 页 · " + esc(l.time || "") + "</span></span>" +
            (load("done-" + l.id, false) ? '<span class="geog-done-mark">✓</span>' : "") +
            '<span class="go">→</span>');
          (function (lid) { row.addEventListener("click", function () { goLesson(lid); }); })(l.id);
          browseRoot.appendChild(row);
        });
      });
    });
  }

  /* ---------------- 学习页渲染 ---------------- */
  /* 批 3 P1：physicslink 跨模块深链（GEO-R51 A 案，仿 chemistry.js xlinkify 范式）。
   * 物理目标用物理模块既有 hash 格式 #<课号>/<页码>（physics.js parseHash
   * 原生支持 "#p00.1.4/1"；注意是 /1 不是 /p1）。从地理模块 index.html
   * 用相对路径 ../physics/index.html（与 modules/physics/index.html 同级），
   * file:// 与 GitHub Pages 子目录均兼容。token 逐个核实存在；
   * 无匹配的文本保持纯文本（不造死链）。data-xlink-target 供程序断言。 */
  var XLINK_PHY_GEO = { "物理 p00.1.4": "p00.1.4" };
  function physicslinkify(text) {
    var t = esc(String(text == null ? "" : text));
    Object.keys(XLINK_PHY_GEO).forEach(function (tok) {
      if (t.indexOf(tok) < 0) return;
      var href = "../physics/index.html#" + XLINK_PHY_GEO[tok] + "/1";
      t = t.split(tok).join('<a class="geog-physicslink-a" data-xlink-target="' +
        XLINK_PHY_GEO[tok] + '" href="' + href + '">' + tok + "</a>");
    });
    return t;
  }
  function renderBlock(b) {
    var d = el("div", "geog-block " + (b.type || "text"));
    if (b.type === "physicslink") { d.innerHTML = physicslinkify(b.text); return d; }
    if (b.html != null) d.innerHTML = b.html;
    else d.textContent = b.text || "";
    return d;
  }
  var WIDGETS = {};
  function renderPage() {
    appRoot.innerHTML = "";
    var f = cur.found, lesson = f.lesson;
    var pages = lesson.pages || [];
    var pg = pages[cur.pageIdx];
    if (!pg) return;
    renderTopbar();
    var wrap = el("div", "geog-app");
    wrap.appendChild(el("div", "geog-crumb",
      esc(f.chapter.id + " " + f.chapter.title) + " · " + esc(f.unit.title)));
    wrap.appendChild(el("h2", "geog-lesson-title", esc(lesson.id + " " + lesson.title)));
    if (lesson.prereq) wrap.appendChild(el("div", "geog-crumb", "前置：" + esc(lesson.prereq)));
    wrap.appendChild(el("h3", "geog-page-title", esc(pg.title)));
    if (pg.exploreTip) wrap.appendChild(el("div", "geog-explore", esc(pg.exploreTip)));
    ((pg.widgets) || []).forEach(function (w) {
      var box = el("div", "geog-widget");
      wrap.appendChild(box);
      var fn = WIDGETS[w.type];
      if (fn) {
        try {
          var vw = fn(box, w.params || {}, pg);
          /* 批 2 扩展：渲染器可返回视图对象（{resize,destroy,state}），
             挂载到 box._geoView 供白队/QA 程序断言，并纳入 activeViews
             统一 resize/销毁。返回 undefined 的旧渲染器不受影响。 */
          box._geoView = vw || null;
          if (vw && (vw.destroy || vw.resize)) activeViews.push(vw);
        } catch (e) { box.appendChild(el("div", "geog-block trap", "⚠️ 组件加载失败：" + esc(e.message))); }
      }
      else box.appendChild(el("div", "geog-block trap", "⚠️ 未知组件类型：" + esc(w.type)));
    });
    ((pg.blocks) || []).forEach(function (b) { wrap.appendChild(renderBlock(b)); });
    if (pg.point) wrap.appendChild(el("div", "geog-point", esc(pg.point)));
    var pager = el("div", "geog-pager");
    var prev = el("button", "geog-btn", "← 上一页");
    prev.disabled = cur.pageIdx <= 0;
    prev.addEventListener("click", function () { goPage(cur.pageIdx - 1); });
    var next = el("button", "geog-btn geog-btn-primary", cur.pageIdx < pages.length - 1 ? "下一页 →" : "完成本课 ✓");
    next.addEventListener("click", function () {
      if (cur.pageIdx < pages.length - 1) goPage(cur.pageIdx + 1);
      else { store("done-" + lesson.id, true); showTrackBrowser(trackOf(f.chapter.id).id); }
    });
    pager.appendChild(prev); pager.appendChild(next);
    wrap.appendChild(pager);
    appRoot.appendChild(wrap);
    /* 组件在 wrap 脱离文档时构造（clientWidth=0），挂载后统一重算画布尺寸 */
    activeViews.forEach(function (v) { v.resize(); });
  }

  /* ---------------- hash / 页码持久化 ---------------- */
  function parseHash() {
    var h = location.hash || "";
    var m = h.match(/^#(dg\d+\.\d+\.\d+)(?:\/(\d+))?$/);
    if (m) return { lesson: m[1], page: m[2] ? parseInt(m[2], 10) - 1 : 0 };
    return null;
  }
  var pageMem = {};
  function savePage(lessonId, pageIdx) {
    try { localStorage.setItem("ltb-geo-page-" + lessonId, String(pageIdx)); }
    catch (e) { pageMem[lessonId] = pageIdx; }
  }
  function loadPage(lessonId) {
    try {
      var v = parseInt(localStorage.getItem("ltb-geo-page-" + lessonId), 10);
      return isFinite(v) && v >= 0 ? v : 0;
    } catch (e) { return pageMem[lessonId] || 0; }
  }
  function markVisited(lessonId) {
    var v = load("visited", {});
    if (!v[lessonId]) { v[lessonId] = { ts: Date.now() }; store("visited", v); }
  }
  function syncHash(replace) {
    if (!cur || !cur.found) return;
    var url = "#" + cur.found.lesson.id + "/" + (cur.pageIdx + 1);
    try {
      if (replace) history.replaceState(null, "", url);
      else history.pushState(null, "", url);
    } catch (e) {}
  }
  function goPage(idx) {
    if (!cur || !cur.found) return;
    var pages = cur.found.lesson.pages || [];
    idx = Math.max(0, Math.min(pages.length - 1, idx));
    if (idx === cur.pageIdx) return;
    cur.pageIdx = idx;
    savePage(cur.found.lesson.id, idx);
    renderPage();
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
    renderPage();
    try { window.scrollTo(0, 0); } catch (e) {}
    syncHash(!push);
    return true;
  }
  function goLesson(lessonId) { openLesson(lessonId, undefined, true); }
  function route() {
    var h = parseHash();
    if (h && hasLesson(h.lesson)) {
      var pages = (findLesson(h.lesson).lesson.pages || []).length;
      var idx = Math.max(0, Math.min(pages - 1, h.page || 0));
      if (cur && cur.found && cur.found.lesson.id === h.lesson && cur.pageIdx === idx) return;
      openLesson(h.lesson, idx, false);
    } else {
      showBrowser();
    }
  }

  /* ---------------- 目录抽屉（按钮 + 左缘划出双开） ---------------- */
  var drawer = null, drawerMask = null, drawerBtn = null;
  var drawerOpen = false, drawerAnim = false, lastFocus = null, drawerBuilt = false;
  function buildDrawer() {
    if (drawerBuilt) return;
    drawerBuilt = true;
    drawerMask = el("div", "geog-drawer-mask");
    drawerMask.addEventListener("click", closeDrawer);
    drawer = el("div", "geog-drawer");
    drawer.setAttribute("role", "dialog");
    drawer.setAttribute("aria-label", "目录");
    drawer.setAttribute("aria-hidden", "true");
    drawer.addEventListener("keydown", function (e) {
      if (e.key === "Escape") { closeDrawer(); return; }
      if (e.key !== "Tab") return;
      var btns = drawer.querySelectorAll("button");
      if (!btns.length) return;
      var first = btns[0], last = btns[btns.length - 1];
      if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    });
    drawer.addEventListener("touchstart", function (e) {
      var t = e.touches[0];
      drawer._sx = t.clientX; drawer._sy = t.clientY;
    }, { passive: true });
    drawer.addEventListener("touchend", function (e) {
      if (drawer._sx == null) return;
      var t = e.changedTouches[0];
      var dx = t.clientX - drawer._sx, dy = t.clientY - drawer._sy;
      drawer._sx = null;
      if (dx <= -40 && Math.abs(dy) < 30) closeDrawer();
    }, { passive: true });
    document.body.appendChild(drawerMask);
    document.body.appendChild(drawer);
  }
  function renderDrawer() {
    drawer.innerHTML = "";
    var head = el("div", "geog-drawer-head");
    head.appendChild(el("div", "t", cur && cur.found ? esc(cur.found.lesson.title) : "目录"));
    var close = el("button", "geog-btn", "✕");
    close.setAttribute("aria-label", "关闭目录");
    close.addEventListener("click", closeDrawer);
    head.appendChild(close);
    drawer.appendChild(head);
    var list = el("div", "geog-drawer-list");
    readyChapters().forEach(function (c) {
      list.appendChild(el("div", "geog-drawer-ch", esc(c.id + " " + c.title)));
      var data = (window.GEOGRAPHY_DATA || {})[c.id] || {};
      ((data.units) || []).forEach(function (u) {
        ((u.lessons) || []).forEach(function (l) {
          var b = el("button", "geog-drawer-lesson" + ((cur && cur.found && cur.found.lesson.id === l.id) ? " cur" : ""),
            '<span class="id">' + esc(l.id) + '</span><span>' + esc(l.title) + "</span>");
          (function (lid) {
            b.addEventListener("click", function () { closeDrawer(); goLesson(lid); });
          })(l.id);
          list.appendChild(b);
        });
      });
    });
    drawer.appendChild(list);
  }
  function openDrawer() {
    if (drawerOpen || drawerAnim) return;
    buildDrawer();
    drawerAnim = true;
    setTimeout(function () { drawerAnim = false; }, 280);
    drawerOpen = true;
    renderDrawer();
    drawerMask.classList.add("open");
    drawer.classList.add("open");
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
  }
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
    migrateLegacyRecords(); /* 批3 P1：老前缀记录键一次性迁移 */
    topbar = document.getElementById("geog-topbar");
    browseRoot = document.getElementById("geog-browser");
    appRoot = document.getElementById("geog-app");
    if (!topbar || !browseRoot || !appRoot) return;
    buildDrawer();
    bindDrawerGesture();
    if (window.addEventListener) window.addEventListener("hashchange", route);
    // 深色切换时重绘（canvas 颜色跟随主题）
    try {
      var mq = window.matchMedia("(prefers-color-scheme: dark)");
      var onTheme = function () { if (cur) renderPage(); };
      if (mq.addEventListener) mq.addEventListener("change", onTheme);
      else if (mq.addListener) mq.addListener(onTheme);
    } catch (e) {}
    route();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
  window.GEO = {
    hasLesson: hasLesson, open: openLesson,
    /* 批 2 扩展：允许 js/ 下其他文件按同一 WIDGETS 注册表注册新渲染器
       （模块层惯例；geo-batch2-widgets.js 在本文件之后引入）。 */
    registerWidget: function (type, fn) { WIDGETS[type] = fn; },
    getWidget: function (type) { return WIDGETS[type] || null; },
    widgetTypes: function () { return Object.keys(WIDGETS); },
    /* 2026-10-17 修复 F2（白队 QA 首轮）：批 2 渲染器 destroy 经此从 activeViews
       摘除自身——约定同批 1 MapView.prototype.destroy（:611-612）；
       跨文件无闭包访问，故以接口暴露。缺此摘除时，翻页/主题切换触发的
       renderPage 包装 while (activeViews.length) 永真 → 主线程死循环卡死。 */
    unregisterView: function (view) {
      var i = activeViews.indexOf(view);
      if (i >= 0) activeViews.splice(i, 1);
    }
  };

  /* ============================================================
   * 地图组件层：GeoMap（2D 等高线 + 3D 示意山体）
   * 真值全部来自 Eng.ContourField（assets/engine/contour.js）；
   * 本层只做渲染（消费读回），不重算真值。
   * ============================================================ */
  var activeViews = [];
  function cssVar(name) {
    try { return getComputedStyle(document.body).getPropertyValue(name).trim(); }
    catch (e) { return ""; }
  }
  function cssColor(name, fb) { var v = cssVar(name); return v || fb; }

  var KIND_CN = { valley: "山谷", ridge: "山脊", peak: "山顶", saddle: "鞍部", cliff: "陡崖" };
  var KIND_WHY = {
    valley: "等高线向高处凸——“凸高为谷、凸低为脊”",
    ridge: "等高线向低处凸——“凸高为谷、凸低为脊”",
    peak: "闭合等高线的中心，标高点 ≈380m",
    saddle: "南北两峰之间的马鞍形过渡带",
    cliff: "等高线重合——“楼层叠在一起”"
  };
  /* F3/F4 修复：点选判分改用逻辑坐标特征区域命中 + 优先级
     （GEO-RULING-2026-10-17-02 裁决五 C7c；废弃绝对像素阈值 d<=44）。
     优先级：陡崖 > 山顶 > 鞍部 > 山谷 > 山脊；<= 含边界判入。 */
  function judgeKind(lx, ly) {
    function d(x, y) { return Math.hypot(lx - x, ly - y); }
    if (lx >= 86) return "cliff";                 // 陡崖：东缘壁带
    if (d(70, 52) <= 3) return "peak";            // 主峰盘
    if (d(30, 78) <= 2.5) return "peak";          // 脊上北峰盘
    if (d(30, 28) <= 2.5) return "peak";          // 脊上南峰盘
    if (d(30, 53) <= 1.5) return "saddle";        // 鞍部盘（优先级高于山脊带）
    if (Math.abs(lx - 52) <= 2) return "valley";  // 山谷带（谷线 x=52）
    if (Math.abs(lx - 30) <= 3) return "ridge";   // 山脊带（脊线 x=30）
    return null;                                  // 未命中任何部位
  }
  // 分层设色（教材约定色，pedagogy 第八章；配图例文字，GEO-R07）
  function reliefColor(z) {
    if (z < 0) return "#9fc5e8";
    if (z < 150) return "#8fce6e";
    if (z < 350) return "#e8d44f";
    if (z < 550) return "#c98a4b";
    return "#8a5a2b";
  }
  function shade(hex, f) {
    var n = parseInt(hex.slice(1), 16);
    var r = (n >> 16) & 255, g = (n >> 8) & 255, b = n & 255;
    r = Math.max(0, Math.min(255, Math.round(r * f)));
    g = Math.max(0, Math.min(255, Math.round(g * f)));
    b = Math.max(0, Math.min(255, Math.round(b * f)));
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  function MapView(box, params) {
    this.params = params || {};
    var wInit = (params.waterInit != null ? params.waterInit : -250);
    this.field = new Eng.ContourField({
      interval: 50, waterLevel: wInit,
      assumptions: Eng.ContourField.AX_DEFAULTS().assumptions,
      approximations: Eng.ContourField.AX_DEFAULTS().approximations,
      errorEstimate: Eng.ContourField.AX_DEFAULTS().errorEstimate
    });
    this.mode = "2d";
    this.annotated = false;
    this.quiz = null; // 由 contour-quest 挂载
    this._build(box);
    activeViews.push(this);
  }
  MapView.prototype._build = function (box) {
    var self = this, P = this.params;
    var wrap = el("div", "geog-map-wrap");
    var stage = el("div", "geog-map-stage");
    this.stage = stage;
    this.c2d = el("canvas"); this.c3d = el("canvas");
    this.c3d.style.display = "none";
    this.c3d.setAttribute("aria-label", "3D 示意山体：垂直夸大 ×2（示意），看趋势不量高度");
    stage.appendChild(this.c2d); stage.appendChild(this.c3d);
    var badge = el("div", "geog-map-badge", "示意 · 教学模型，非真实地形");
    stage.appendChild(badge);
    wrap.appendChild(stage);
    // 工具区
    var tools = el("div", "geog-map-tools");
    if (P.waterSlider) {
      var wr = el("div", "geog-slider-row");
      var wInit = (P.waterInit != null ? P.waterInit : -250);
      wr.appendChild(el("label", "", "水位（米） <output>" + wInit + "</output>"));
      var ws = el("input"); ws.type = "range";
      ws.step = "50"; ws.value = String(wInit); // min/max 由 _syncWaterSlider 随等高距动态绑定（裁决一 C2）
      ws.setAttribute("aria-label", "水位滑块：水位上升，等高线从低到高逐条显现");
      var out = wr.querySelector("output");
      ws.addEventListener("input", function () {
        out.textContent = ws.value;
        self.field.setWaterLevel(parseInt(ws.value, 10));
        self.redraw();
        self._readout("水位 ≈ " + ws.value + "m：已显现 " +
          self.field.contoursForWater(self.field.state().waterLevel).length +
          " 条等高线（先出来的是低处）");
      });
      wr.appendChild(ws);
      tools.appendChild(wr);
      this._waterOut = out; this._waterSlider = ws;
    }
    if (P.intervalSlider) {
      var ir = el("div", "geog-slider-row");
      ir.appendChild(el("label", "", "等高距（米）"));
      var seg = el("div", "");
      seg.style.display = "flex"; seg.style.gap = "8px";
      [25, 50, 100].forEach(function (iv) {
        var b = el("button", "geog-btn" + (iv === 50 ? " geog-btn-primary" : ""), String(iv));
        b.style.flex = "1"; b.style.minHeight = "44px";
        b.setAttribute("aria-label", "等高距 " + iv + " 米");
        b.addEventListener("click", function () {
          self.field.setInterval(iv);
          self._syncWaterSlider(); // 裁决一 C2：min/max 随等高距取层级端点
          Array.prototype.forEach.call(seg.querySelectorAll("button"), function (x) {
            x.classList.remove("geog-btn-primary");
          });
          b.classList.add("geog-btn-primary");
          self.redraw();
          self._readout("等高距 " + iv + "m：同一张图里等高距处处相等");
        });
        seg.appendChild(b);
      });
      ir.appendChild(seg);
      tools.appendChild(ir);
    }
    if (P.annotate) {
      var ab = el("button", "geog-btn", "一键标注山脊/山谷");
      ab.addEventListener("click", function () {
        self.annotated = !self.annotated;
        ab.textContent = self.annotated ? "取消标注" : "一键标注山脊/山谷";
        ab.classList.toggle("geog-btn-primary", self.annotated);
        self.redraw();
      });
      tools.appendChild(ab);
    }
    if (P.flip3D) {
      var fb = el("button", "geog-btn", "翻转看 3D");
      fb.addEventListener("click", function () { self.flip(); });
      tools.appendChild(fb);
      this._flipBtn = fb;
    }
    wrap.appendChild(tools);
    this.readoutEl = el("div", "geog-readout");
    wrap.appendChild(this.readoutEl);
    // 图例（三要素条：方向｜比例尺｜图例，GEO-R27）
    var lg = el("div", "geog-legend",
      '<span><span class="sw"></span>等高线（等高距 <span class="geog-iv">50</span>m）</span>' +
      (P.river ? '<span><span class="sw river"></span>河流（示意）</span>' : "") +
      '<span>N↑ 方向</span><span>比例尺：示意，不按比例</span>');
    wrap.appendChild(lg);
    this._legendIv = lg.querySelector(".geog-iv");
    wrap.appendChild(el("div", "geog-ax-note",
      "诚实清单：地形为教学示意模型（非真实 DEM）；3D 山体“垂直夸大 ×2（示意）”，看趋势不量高度；" +
      (P.river ? "河流为示意水系，只看“河流在山谷里”；" : "") + "等高线由高程函数生成（GEO-R30）。"));
    box.appendChild(wrap);
    // 3D 旋转（拖拽）+ 2D 点选
    this._bindPointer();
    this._onResize = function () { self.resize(); };
    if (window.addEventListener) window.addEventListener("resize", this._onResize);
    this._syncWaterSlider(wInit); // 初始端点与默认 50m 档层级对齐（-250/650），
    // 以 wInit（而非被 0/100 默认 min/max 钳过的 ws.value）作为期望初值
    this.resize();
  };
  MapView.prototype.destroy = function () {
    if (window.removeEventListener && this._onResize) window.removeEventListener("resize", this._onResize);
    var i = activeViews.indexOf(this);
    if (i >= 0) activeViews.splice(i, 1);
  };
  MapView.prototype._readout = function (t) { this.readoutEl.textContent = t; };
  // 裁决一 C2：水位滑块 min/max 随等高距动态绑定到当前层级集合端点
  // （25m→-275/675、50m→-250/650、100m→-200/600），当前水位 clamp 到 [min,max]
  // C2 回归修复（2026-10-17 第三轮）：L516 先设 ws.value 时 min/max 仍为浏览器默认 0/100，
  // wInit（-250/650）被钳制丢失，随后的 _syncWaterSlider 读到的已是被钳值。
  // 修复：以 desired 参数带入真实初值（interval 切换时不传则沿用滑块当前值），
  // 先改 min/max → 再设值 → 读回浏览器吸附后的值（step=50 的 Chrome 原生吸附，
  // 专家裁决冻结不许"修"，只取吸附后值）→ setWaterLevel(吸附值)。
  MapView.prototype._syncWaterSlider = function (desired) {
    var ws = this._waterSlider;
    if (!ws) return;
    var lv = this.field.levels();
    ws.min = String(lv[0]);
    ws.max = String(lv[lv.length - 1]);
    var raw = (desired != null ? desired : parseInt(ws.value, 10));
    if (isNaN(raw)) raw = lv[0];
    ws.value = String(raw); // 先设值（超范围浏览器自动钳）
    var v = parseInt(ws.value, 10); // 读回吸附值（Chrome 原生 step 吸附）
    if (isNaN(v)) v = lv[0];
    this.field.setWaterLevel(v);
    if (this._waterOut) this._waterOut.textContent = String(v);
    this.redraw();
  };
  MapView.prototype.resize = function () {
    var w = this.stage.clientWidth;
    if (!w) return;
    var dpr = Math.min(2, window.devicePixelRatio || 1);
    [this.c2d, this.c3d].forEach(function (c) {
      c.width = Math.round(w * dpr); c.height = Math.round(w * dpr);
    });
    this._cssW = w; this._dpr = dpr;
    this.redraw();
  };
  // 逻辑坐标（0–100，y 向上）↔ 像素
  MapView.prototype._pad = 7;
  MapView.prototype.l2p = function (x, y) {
    var s = this._cssW / (100 + 2 * this._pad);
    return { x: (x + this._pad) * s, y: this._cssW - (y + this._pad) * s, s: s };
  };
  MapView.prototype.p2l = function (px, py) {
    var s = this._cssW / (100 + 2 * this._pad);
    return { x: px / s - this._pad, y: (this._cssW - py) / s - this._pad };
  };
  // W-b 修复：2D/3D 翻转交叉淡入淡出 400ms（GEO-RULING-2026-10-17-02 裁决三）。
  // 翻转中防抖（_flipping 期间忽略重复触发）；prefers-reduced-motion 下瞬时切换。
  MapView.prototype.flip = function (to) {
    var next = to || (this.mode === "2d" ? "3d" : "2d");
    if (next === this.mode || this._flipping) return;
    var self = this;
    var show = next === "2d" ? this.c2d : this.c3d;
    var hide = next === "2d" ? this.c3d : this.c2d;
    this.mode = next;
    this.redraw(); // 先把目标面画好：动画终态与瞬时切换完全一致
    if (this._flipBtn) this._flipBtn.textContent = next === "2d" ? "翻转看 3D" : "翻回等高线图";
    if (this._chipRow) this._chipRow.style.display = next === "3d" ? "" : "none";
    var reduced = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      show.style.display = ""; show.style.opacity = "";
      hide.style.display = "none"; hide.style.opacity = ""; hide.style.position = "";
      return;
    }
    this._flipping = true;
    show.style.display = "";
    show.style.opacity = "0";
    hide.style.position = "absolute"; // 流出画布脱离文档流，叠在目标面上
    hide.style.left = "0"; hide.style.top = "0";
    hide.style.width = "100%"; hide.style.height = "100%";
    void show.offsetWidth; // 强制重排，使 transition 生效
    show.style.opacity = "1";
    hide.style.opacity = "0";
    setTimeout(function () {
      hide.style.display = "none";
      hide.style.position = ""; hide.style.opacity = "";
      show.style.opacity = "";
      self._flipping = false;
      self.redraw();
    }, 400);
  };
  MapView.prototype.redraw = function () {
    if (!this._cssW) return;
    if (this.mode === "2d") this._draw2D(); else this._draw3D();
  };

  /* ---------- 2D 等高线图 ---------- */
  MapView.prototype._draw2D = function () {
    var ctx = this.c2d.getContext("2d"), self = this;
    var W = this._cssW, dpr = this._dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, W);
    var st = this.field.state(), water = st.waterLevel;
    var contourColor = cssColor("--geog-contour", "#1a1a1a");
    var hiColor = cssColor("--geog-contour-hi", "#E69F00");
    var riverColor = cssColor("--geog-river", "#0072B2");
    var softColor = cssColor("--geog-ink-soft", "#4a4a4a");
    var drawn = this.field.contoursForWater(water);
    if (this._legendIv) this._legendIv.textContent = st.interval;
    // 等高线
    drawn.forEach(function (cl) {
      var sel = (st.selectedLevel === cl.level);
      ctx.strokeStyle = sel ? hiColor : contourColor;
      ctx.lineWidth = sel ? 3 : 1.4;
      ctx.beginPath();
      cl.paths.forEach(function (p) {
        p.pts.forEach(function (pt, k) {
          var q = self.l2p(pt.x, pt.y);
          if (k === 0) ctx.moveTo(q.x, q.y); else ctx.lineTo(q.x, q.y);
        });
      });
      ctx.stroke();
      // 高程注记（GEO-R06：注高程值；每条线标一次，取最长折线中点）
      var best = null, bestLen = 0;
      cl.paths.forEach(function (p) {
        if (p.pts.length > bestLen) { bestLen = p.pts.length; best = p; }
      });
      if (best && bestLen > 8) {
        var mid = best.pts[Math.floor(bestLen / 2)];
        var m = self.l2p(mid.x, mid.y);
        ctx.font = "12.5px system-ui, sans-serif";
        var label = (cl.level < 0 ? "−" : "") + Math.abs(cl.level) + "m";
        var tw = ctx.measureText(label).width;
        ctx.fillStyle = cssColor("--geog-bg", "#ffffff");
        ctx.fillRect(m.x - tw / 2 - 3, m.y - 9, tw + 6, 15);
        ctx.fillStyle = sel ? hiColor : contourColor;
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText(label, m.x, m.y - 1);
      }
    });
    // 河流（示意）：沿谷线 x=52，南北走向（口径 §13.2 F8）
    if (this.params.river) {
      ctx.strokeStyle = riverColor; ctx.lineWidth = 2.6;
      ctx.beginPath();
      var r0 = this.l2p(52, 4), r1 = this.l2p(52, 96);
      ctx.moveTo(r0.x, r0.y); ctx.lineTo(r1.x, r1.y);
      ctx.stroke();
      // 流向箭头（向南，即 -y 方向）
      ctx.fillStyle = riverColor;
      [78, 60, 42, 24].forEach(function (yy) {
        var a = self.l2p(52, yy);
        ctx.beginPath();
        ctx.moveTo(a.x, a.y + 9); ctx.lineTo(a.x - 6, a.y - 3); ctx.lineTo(a.x + 6, a.y - 3);
        ctx.closePath(); ctx.fill();
      });
      var rl = this.l2p(52, 88);
      ctx.font = "13.6px system-ui, sans-serif";
      ctx.fillStyle = riverColor; ctx.textAlign = "left"; ctx.textBaseline = "middle";
      ctx.fillText("河流（示意）", rl.x + 10, rl.y);
    }
    // 一键标注（口径 §13.2 已知特征；标签错位避让，不压线）
    if (this.annotated) {
      var feats = Eng.ContourField.KNOWN_FEATURES();
      var place = {
        ridge:  { align: "right", dx: -14, dy: -8 },
        valley: { align: "left",  dx: 14,  dy: -8 },
        saddle: { align: "left",  dx: 14,  dy: 40 },
        peak:   { align: "left",  dx: 14,  dy: -8 },
        cliff:  { align: "right", dx: -14, dy: -8 }
      };
      ctx.font = "13.6px system-ui, sans-serif";
      feats.forEach(function (ft) {
        var p = self.l2p(ft.x, ft.y);
        var pl = place[ft.kind] || { align: "left", dx: 14, dy: -8 };
        ctx.fillStyle = (ft.kind === "ridge" || ft.kind === "valley") ? hiColor : contourColor;
        ctx.beginPath(); ctx.arc(p.x, p.y, 6, 0, 7); ctx.fill();
        ctx.strokeStyle = cssColor("--geog-bg", "#ffffff"); ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(p.x, p.y, 9, 0, 7); ctx.stroke();
        ctx.fillStyle = (ft.kind === "ridge" || ft.kind === "valley") ? hiColor : softColor;
        ctx.textAlign = pl.align; ctx.textBaseline = "bottom";
        var txt = ft.label + (ft.note ? " · " + ft.note : "");
        ctx.fillText(txt, p.x + pl.dx, p.y + pl.dy);
      });
    }
    // 闪烁（3D 联动回指，GEO-R33）
    if (this._flash && Date.now() < this._flash.until) {
      var fp = this.l2p(this._flash.x, this._flash.y);
      var t = (this._flash.until - Date.now()) / 1200;
      ctx.strokeStyle = hiColor; ctx.lineWidth = 3;
      ctx.beginPath(); ctx.arc(fp.x, fp.y, 14 + 10 * (1 - t), 0, 7); ctx.stroke();
      if (this._flash.text) {
        ctx.font = "13.6px system-ui, sans-serif";
        ctx.fillStyle = hiColor; ctx.textAlign = "center";
        ctx.fillText(this._flash.text, fp.x, fp.y - 30);
      }
      var self2 = this;
      requestAnimationFrame(function () { if (self2.mode === "2d") self2._draw2D(); });
    } else this._flash = null;
    // 指北针 + 比例尺注（GEO-R27 三要素条）
    ctx.fillStyle = softColor; ctx.textAlign = "right"; ctx.textBaseline = "top";
    ctx.font = "16px system-ui, sans-serif";
    ctx.fillText("N↑", W - 10, 26);
    ctx.font = "12.5px system-ui, sans-serif";
    ctx.fillText("示意，不按比例", W - 10, W - 22);
  };

  MapView.prototype.flashAt = function (x, y, text) {
    this._flash = { x: x, y: y, text: text, until: Date.now() + 1200 };
    if (this.mode !== "2d") this.flip("2d");
    else this._draw2D();
  };

  /* ---------- 3D 示意山体（2.5D 斜投影） ---------- */
  MapView.prototype._draw3D = function () {
    var ctx = this.c3d.getContext("2d"), self = this;
    var W = this._cssW, dpr = this._dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, W);
    var st = this.field.state(), water = st.waterLevel;
    var view = {
      azimuthDeg: st.azimuthDeg, tiltDeg: 60,
      cx: W / 2, cy: W * 0.66, scale: W / 135,
      zScale: (W * 0.42) / 980, zBase: -300
    };
    var n = 44, rows = this.field.meshGrid(n);
    var P = [];
    for (var j = 0; j <= n; j++) {
      P[j] = [];
      for (var i = 0; i <= n; i++) {
        var c = rows[j][i];
        var pr = this.field.project3D(c.x, c.y, c.z, view);
        P[j][i] = { sx: pr.sx, sy: pr.sy, depth: pr.depth, z: c.z, x: c.x, y: c.y };
      }
    }
    // 画家算法：按 depth（yr）由远及近
    var quads = [];
    for (var qj = 0; qj < n; qj++) for (var qi = 0; qi < n; qi++) {
      var d = (P[qj][qi].depth + P[qj][qi + 1].depth + P[qj + 1][qi].depth + P[qj + 1][qi + 1].depth) / 4;
      quads.push({ qi: qi, qj: qj, d: d });
    }
    quads.sort(function (a, b) { return b.d - a.d; });
    quads.forEach(function (q) {
      var a = P[q.qj][q.qi], b = P[q.qj][q.qi + 1], c2 = P[q.qj + 1][q.qi + 1], d = P[q.qj + 1][q.qi];
      var zm = (a.z + b.z + c2.z + d.z) / 4;
      var g = self.field.gradientAt((a.x + c2.x) / 2, (a.y + c2.y) / 2);
      var gl = Math.sqrt(g.gx * g.gx + g.gy * g.gy);
      var bright = 0.86 + 0.14 * ((-g.gx * 0.6 + g.gy * 0.8) / (gl + 10));
      ctx.fillStyle = shade(reliefColor(zm), bright);
      ctx.beginPath();
      ctx.moveTo(a.sx, a.sy); ctx.lineTo(b.sx, b.sy); ctx.lineTo(c2.sx, c2.sy); ctx.lineTo(d.sx, d.sy);
      ctx.closePath(); ctx.fill();
    });
    // 等高线 draped（≤水位；选中高亮，GEO-R33）
    var hiColor = cssColor("--geog-contour-hi", "#E69F00");
    this.field.contoursForWater(water).forEach(function (cl) {
      var sel = (st.selectedLevel === cl.level);
      ctx.strokeStyle = sel ? hiColor : "rgba(40,30,20,0.55)";
      ctx.lineWidth = sel ? 3.2 : 1;
      ctx.beginPath();
      cl.paths.forEach(function (p) {
        p.pts.forEach(function (pt, k) {
          var pr = self.field.project3D(pt.x, pt.y, cl.level + 4, view);
          if (k === 0) ctx.moveTo(pr.sx, pr.sy); else ctx.lineTo(pr.sx, pr.sy);
        });
      });
      ctx.stroke();
    });
    // 河流 draped
    if (this.params.river) {
      ctx.strokeStyle = cssColor("--geog-river", "#0072B2"); ctx.lineWidth = 2.6;
      ctx.beginPath();
      for (var ry = 4; ry <= 96; ry += 4) {
        var pr = this.field.project3D(52, ry, this.field.elevationAt(52, ry) + 6, view);
        if (ry === 4) ctx.moveTo(pr.sx, pr.sy); else ctx.lineTo(pr.sx, pr.sy);
      }
      ctx.stroke();
    }
    // 特征标注
    var softColor = cssColor("--geog-ink-soft", "#4a4a4a");
    ctx.font = "13.6px system-ui, sans-serif";
    Eng.ContourField.KNOWN_FEATURES().forEach(function (ft) {
      var z = self.field.elevationAt(ft.x, ft.y);
      var pr = self.field.project3D(ft.x, ft.y, z + 8, view);
      ctx.fillStyle = (ft.kind === "ridge" || ft.kind === "valley") ? hiColor : "#333333";
      ctx.beginPath(); ctx.arc(pr.sx, pr.sy, 5, 0, 7); ctx.fill();
      ctx.fillStyle = softColor; ctx.textAlign = "left"; ctx.textBaseline = "bottom";
      ctx.fillText(ft.label, pr.sx + 8, pr.sy + 2);
    });
    // 角落声明（GEO-R24/R28 常驻，不可关）
    ctx.fillStyle = softColor; ctx.textAlign = "left"; ctx.textBaseline = "bottom";
    ctx.font = "12.5px system-ui, sans-serif";
    ctx.fillText("示意", 10, W - 26);
    ctx.fillText("垂直夸大 ×2（示意）·看趋势，不量高度", 10, W - 8);
    ctx.textAlign = "right";
    ctx.fillText("拖动旋转", W - 10, W - 8);
  };

  /* ---------- 点选 / 拖拽 ---------- */
  MapView.prototype._bindPointer = function () {
    var self = this;
    function pos(e, canvas) {
      var r = canvas.getBoundingClientRect();
      var t = e.touches ? e.touches[0] : (e.changedTouches ? e.changedTouches[0] : e);
      return { x: t.clientX - r.left, y: t.clientY - r.top };
    }
    // 2D：点选等高线（GEO-R33 正向联动）或闯关作答
    this.c2d.addEventListener("click", function (e) {
      var p = pos(e, self.c2d), ll = self.p2l(p.x, p.y);
      if (self.quiz) { self.quiz.answerAt(ll.x, ll.y, p.x, p.y); return; }
      // 等高线命中（热区 8px）
      var st = self.field.state();
      var bestLv = null, bestD = 8;
      self.field.contoursForWater(st.waterLevel).forEach(function (cl) {
        cl.paths.forEach(function (path) {
          path.pts.forEach(function (pt) {
            var q = self.l2p(pt.x, pt.y);
            var d = Math.hypot(q.x - p.x, q.y - p.y);
            if (d < bestD) { bestD = d; bestLv = cl.level; }
          });
        });
      });
      if (bestLv != null) {
        self.field.selectLevel(bestLv);
        self.redraw();
        self._readout("选中 " + bestLv + "m 等高线——点“翻转看 3D”，看它在山体上是第几圈（高差对应 ≤1 个等高距）。");
      }
    });
    // 3D：拖拽旋转方位角
    var dragging = false, lastX = 0;
    function down(e) { dragging = true; lastX = pos(e, self.c3d).x; }
    function move(e) {
      if (!dragging || self.mode !== "3d") return;
      var x = pos(e, self.c3d).x, dx = x - lastX; lastX = x;
      self.field.setAzimuth(self.field.state().azimuthDeg + dx * 0.4);
      if (!self._raf) self._raf = requestAnimationFrame(function () { self._raf = 0; self._draw3D(); });
    }
    function up() { dragging = false; }
    this.c3d.addEventListener("pointerdown", down);
    this.c3d.addEventListener("pointermove", move);
    this.c3d.addEventListener("pointerup", up);
    this.c3d.addEventListener("pointercancel", up);
  };

  /* ============================================================
   * 组件：contour-3d / contour-quest / guess-verify
   * ============================================================ */
  WIDGETS["contour-3d"] = function (box, params) {
    var mv = new MapView(box, params);
    // 3D 点山脊/山谷 → 等高线图对应凸起闪烁 + 口诀浮现（GEO-R33 反向联动）
    if (params.showFeatures) {
      var chips = el("div", "geog-map-tools");
      chips.style.display = "none";
      [["ridge", 30, 55, "山脊：等高线向低处凸——“凸高为谷、凸低为脊”"],
       ["valley", 52, 55, "山谷：等高线向高处凸——“凸高为谷、凸低为脊”"]].forEach(function (c) {
        var b = el("button", "geog-btn", "3D 里点“" + KIND_CN[c[0]] + "”");
        b.addEventListener("click", function () {
          mv.flashAt(c[1], c[2], c[3]);
          mv._readout("已翻回等高线图：看闪烁处——" + c[3]);
        });
        chips.appendChild(b);
      });
      box.querySelector(".geog-map-wrap").appendChild(chips);
      mv._chipRow = chips;
    }
    return mv;
  };

  WIDGETS["contour-quest"] = function (box, params) {
    var mv = new MapView(box, params);
    var quiz = params.quiz || [];
    var qi = 0, doneCount = 0, missStreak = 0; // W-a：按题连续答错计数（换题/答对清零）
    var panel = el("div", "geog-quiz-panel");
    var prog = el("div", "geog-quiz-progress");
    var qEl = el("div", "geog-quiz-q");
    var fb = el("div", "geog-quiz-feedback");
    var nextBtn = el("button", "geog-btn geog-btn-primary", "下一题 →");
    nextBtn.style.display = "none";
    function renderQ() {
      missStreak = 0; // W-a：换题后连错计数清零
      if (qi >= quiz.length) {
        qEl.textContent = "🎉 5/5 闯关完成！";
        fb.className = "geog-quiz-feedback ok";
        fb.textContent = "五种地形部位一次点对——口诀“凸高为谷、凸低为脊”过关。";
        nextBtn.style.display = "none";
        store((params.recordKey || "geog_quest"), { done: quiz.length, ts: Date.now() }); /* 批3 P1：记录键前缀统一，老键 ltb-geo-rec-* 由 migrateLegacyRecords 迁移 */
        return;
      }
      var q = quiz[qi];
      prog.textContent = "第 " + (qi + 1) + " / " + quiz.length + " 题 · 已答对 " + doneCount + " 题";
      qEl.textContent = q.prompt;
      fb.textContent = "在图上点一点。"; // 裁决五 §4 文案订正（§十二 规则二书面授权，GEO-RULING-2026-10-17-02）：删「点选热区 ≥44px」半句
      fb.className = "geog-quiz-feedback";
      nextBtn.style.display = "none";
    }
    nextBtn.addEventListener("click", function () { qi++; renderQ(); });
    panel.appendChild(prog); panel.appendChild(qEl); panel.appendChild(fb); panel.appendChild(nextBtn);
    box.querySelector(".geog-map-wrap").appendChild(panel);
    mv.quiz = {
      answerAt: function (lx, ly, px, py) {
        if (qi >= quiz.length) return;
        var q = quiz[qi];
        if (judgeKind(lx, ly) === q.kind) { // 裁决五 C7c：逻辑坐标特征区域命中 + 优先级
          doneCount++;
          missStreak = 0;
          fb.className = "geog-quiz-feedback ok";
          fb.textContent = "✓ " + KIND_CN[q.kind] + "！" + KIND_WHY[q.kind] + "。";
          store((params.recordKey || "geog_quest") + "-" + q.id, { ok: true, ts: Date.now() }); /* 批3 P1：同上 */
          if (qi === quiz.length - 1) { qi++; renderQ(); }
          else nextBtn.style.display = "";
          prog.textContent = "第 " + (qi + 1) + " / " + quiz.length + " 题 · 已答对 " + doneCount + " 题";
        } else {
          missStreak++;
          fb.className = "geog-quiz-feedback no";
          var t = "✗ 再想想——先问水往哪流。已翻到 3D 那面：看蓝色河流，再翻回来点一次（不扣分）。";
          // W-a：同一题连续答错 2 次 → 追加黄队 W1 冻结措辞（逐字，不许改写）
          if (missStreak >= 2) t += "等高线往高处凸的那边，水会顺着流下去。";
          fb.textContent = t;
          mv.flip("3d");
        }
      }
    };
    renderQ();
    return mv;
  };

  WIDGETS["guess-verify"] = function (box, params) {
    var wrap = el("div", "geog-gv");
    wrap.appendChild(el("div", "q", esc(params.question || "")));
    var opts = el("div", "opts");
    var fb = el("div", "fb");
    (params.options || []).forEach(function (op, i) {
      var b = el("button", "geog-btn", esc(op));
      b.addEventListener("click", function () {
        var ok = (i === params.answer);
        fb.className = "fb " + (ok ? "ok" : "no");
        fb.textContent = (ok ? "✓ 答对了。" : "✗ 再想想。") + (params.explain ? params.explain : "");
        store((params.recordKey || "geog_quiz"), { choice: i, ok: ok, ts: Date.now() }); /* 批3 P1：记录键前缀统一，老键 ltb-geo-rec-* 由 migrateLegacyRecords 迁移 */
      });
      opts.appendChild(b);
    });
    wrap.appendChild(opts); wrap.appendChild(fb);
    box.appendChild(wrap);
  };

  /* 翻页/重渲染时销毁旧地图视图（解绑 resize） */
  var _origRenderPage = renderPage;
  renderPage = function () {
    while (activeViews.length) activeViews[0].destroy();
    _origRenderPage();
  };
})();
