/* ============================================================
 * 学习工具箱 · 数学模块 · 主渲染框架
 *
 * SPA 数据驱动（白队 W1 决议：拒绝 97 独立页面）。
 * 数据：data/chapters.js（注册表）→ data/chNN.js（章数据，按需加载）
 *      → data/chNN.formulas.js（派生 MathML，构建生成，按需加载）。
 * 公式渲染：查 window.MATH_MML；缺失或 MathML 不支持时降级为
 *      translation 纯文本（见 _schema.md §4）。
 * 交互：window.MATH_INTERACTIONS 注册表，各类型渲染器后续实现，
 *      未注册时显示占位（不阻塞页面）。
 * ============================================================ */
(function () {
  "use strict";

  /* ---------------- 工具 ---------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function $(id) { return document.getElementById(id); }

  function loadScript(src) {
    return new Promise(function (resolve, reject) {
      // 已加载则跳过（幂等）
      var existed = Array.prototype.some.call(
        document.scripts, function (s) { return s.getAttribute("src") === src; });
      if (existed) return resolve();
      var el = document.createElement("script");
      el.src = src;
      el.onload = function () { resolve(); };
      el.onerror = function () { reject(new Error("脚本加载失败: " + src)); };
      document.head.appendChild(el);
    });
  }

  /* ---------------- 进度（内存 + localStorage 尝试） ---------------- */
  var PROG_KEY = "ltb-math-progress";
  var progress = {};
  try {
    progress = JSON.parse(localStorage.getItem(PROG_KEY) || "{}");
  } catch (e) { progress = {}; }
  function saveProgress() {
    try { localStorage.setItem(PROG_KEY, JSON.stringify(progress)); } catch (e) {}
  }

  /* ---------------- 状态 ---------------- */
  var state = {
    chapterId: null,     // 当前章
    pageId: null,        // 当前页
    flat: [],            // 当前章展平的页列表 [{page, lessonTitle}]
    index: -1            // flat 下标
  };
  var loadedChapters = {};  // chId -> true（数据已加载）

  /* ---------------- 交互渲染器注册表 ----------------
   * 各类型渲染函数签名：function (container, params, page) {}
   * 后续按 docs/math-interaction-params.md 逐个实现并 register。
   * 未注册的类型显示占位，不阻塞页面渲染。 */
  var ixRenderers = {};
  window.MATH_INTERACTIONS = {
    register: function (type, fn) { ixRenderers[type] = fn; },
    types: function () { return Object.keys(ixRenderers); }
  };

  /* ---------------- 公式渲染 ---------------- */
  function formulaHtml(f, pageId) {
    var key = pageId + "#" + f.id;
    var mml = (window.MATH_MML || {})[key];
    var ok = window.MathMLCheck && window.MathMLCheck.supported;
    if (mml && ok) return mml;
    // 降级：人话翻译纯文本（translation 为必填字段）
    return '<span class="formula-fallback">' + esc(f.translation || f.latex || "") + "</span>";
  }

  /* ---------------- 页面渲染 ---------------- */
  function renderPage() {
    var cur = state.flat[state.index];
    if (!cur) return;
    var page = cur.page;

    $("p-title").textContent = page.title || "";
    $("page-ind").textContent =
      (state.index + 1) + " / " + state.flat.length + " · " + cur.lessonTitle;

    // 公式
    var fh = "";
    (page.formulas || []).forEach(function (f) { fh += formulaHtml(f, page.id); });
    $("p-formulas").innerHTML = fh;

    // 主交互
    var ixBox = $("p-interaction");
    ixBox.innerHTML = "";
    ixBox.classList.remove("has-aux");
    if (page.interaction && page.interaction.type) {
      var fn = ixRenderers[page.interaction.type];
      if (fn) {
        try { fn(ixBox, page.interaction.params || {}, page); }
        catch (e) { ixBox.innerHTML = '<div class="ix-stub">交互渲染出错：' + esc(e.message) + "</div>"; }
      } else {
        ixBox.innerHTML = '<div class="ix-stub">交互占位：' + esc(page.interaction.type) +
          "<br>（渲染器待实现，不影响浏览）</div>";
      }
    } else {
      ixBox.innerHTML = '<div class="ix-stub">本页无交互</div>';
    }

    // 辅交互（可选，≤1 个，结构同 interaction）：主交互下方紧凑容器
    // （白队 W：ch08 等页面的 auxInteraction 此前从未被渲染）
    if (page.auxInteraction && page.auxInteraction.type) {
      var auxFn = ixRenderers[page.auxInteraction.type];
      var auxBox = document.createElement("div");
      auxBox.className = "m-aux-interaction";
      ixBox.appendChild(auxBox);
      ixBox.classList.add("has-aux");  // 竖向堆叠：主交互在上，辅交互在下
      if (auxFn) {
        try { auxFn(auxBox, page.auxInteraction.params || {}, page); }
        catch (e) { auxBox.innerHTML = '<div class="ix-stub">辅交互渲染出错：' + esc(e.message) + "</div>"; }
      } else {
        auxBox.innerHTML = '<div class="ix-stub">辅交互占位：' + esc(page.auxInteraction.type) +
          "<br>（渲染器待实现，不影响浏览）</div>";
      }
    }

    // 点拨
    // （蓝队 2026-10-10 缺陷A修复）习题页（concept === "本章习题"）：
    // 题目区加 exercise 类变为可滚动（CSS .m-hints.exercise），
    // examples 作为"核对答案"折叠渲染——此前 examples 从未被渲染，答案用户永远看不到。
    // （蓝队 2026-10-11）讲解页（page.pageKind === "explain"）：
    // 讲透需要 300 字（pedagogy §5.2），点拨区加 explain 类变为
    // 可滚动（CSS .m-hints.explain / .explain-scroll，复用习题页模式）。
    var isExercise = page.concept === "本章习题";
    var isExplain = page.pageKind === "explain";
    var hh = "";
    (page.hints || []).forEach(function (h, i) {
      hh += "<p>" + (i === 0 ? '<span class="point">💡</span> ' : "") + esc(h) + "</p>";
    });
    var hintsBox = $("p-hints");
    hintsBox.className = "m-hints" + (isExercise ? " exercise" : "") + (isExplain ? " explain" : "");
    hintsBox.innerHTML = hh;
    if (isExercise) {
      (page.examples || []).forEach(function (ex) {
        if (!ex || !ex.text) return;
        var det = document.createElement("details");
        det.className = "m-answers";
        var sum = document.createElement("summary");
        sum.textContent = "📝 核对答案（点开展开）";
        det.appendChild(sum);
        var ap = document.createElement("p");
        ap.textContent = ex.text;
        det.appendChild(ap);
        hintsBox.appendChild(det);
      });
    }

    // 翻页按钮
    $("btn-prev").disabled = state.index <= 0;
    $("btn-next").disabled = state.index >= state.flat.length - 1;

    // 进度打勾 + URL
    progress[page.id] = 1;
    saveProgress();
    try { history.replaceState(null, "", "#p=" + page.id); } catch (e) {}
    markActiveLesson(page.id);
  }

  function go(d) {
    var ni = state.index + d;
    if (ni < 0 || ni >= state.flat.length) return;
    state.index = ni;
    state.pageId = state.flat[ni].page.id;
    renderPage();
  }

  /* ---------------- 侧边栏目录 ---------------- */
  function ensureChapterData(chId) {
    if (loadedChapters[chId]) return Promise.resolve();
    var meta = (window.MATH_CHAPTERS || []).filter(function (c) { return c.id === chId; })[0];
    if (!meta) return Promise.reject(new Error("未知章节: " + chId));
    // 章数据 + 派生公式文件（派生缺失不阻塞，公式降级为 translation）
    return loadScript(meta.file).then(function () {
      loadedChapters[chId] = true;
      return loadScript(meta.file.replace(/\.js$/, ".formulas.js")).catch(function () {});
    });
  }

  function flattenChapter(ch) {
    var flat = [];
    (ch.units || []).forEach(function (u) {
      (u.lessons || []).forEach(function (l) {
        (l.pages || []).forEach(function (p) {
          flat.push({ page: p, lessonTitle: l.title, lessonId: l.id });
        });
      });
    });
    return flat;
  }

  function openLesson(chId, lessonId, pageId) {
    ensureChapterData(chId).then(function () {
      var ch = (window.MATH_CH || {})[chId];
      if (!ch) return;
      state.chapterId = chId;
      state.flat = flattenChapter(ch);
      var idx = 0;
      if (pageId) {
        for (var i = 0; i < state.flat.length; i++) {
          if (state.flat[i].page.id === pageId) { idx = i; break; }
        }
      } else if (lessonId) {
        for (var j = 0; j < state.flat.length; j++) {
          if (state.flat[j].lessonId === lessonId) { idx = j; break; }
        }
      }
      state.index = idx;
      state.pageId = state.flat[idx] ? state.flat[idx].page.id : null;
      renderPage();
      if (window.innerWidth < 1024) $("drawer").classList.remove("open");
    }).catch(function (e) {
      $("p-title").textContent = "章节加载失败";
      $("p-hints").innerHTML = "<p>" + esc(e.message) + "</p>";
    });
  }

  function markActiveLesson(pageId) {
    Array.prototype.forEach.call(
      document.querySelectorAll(".m-lesson"),
      function (el) { el.classList.toggle("active", el.dataset.page === pageId); });
  }

  function renderSidebar() {
    var tree = $("tree");
    var html = "";
    (window.MATH_CHAPTERS || []).forEach(function (c) {
      var planned = c.status !== "ready";
      html += '<div class="m-ch' + (planned ? " planned" : "") + '" data-ch="' + esc(c.id) + '">' +
        '<div class="m-ch-title"><span>' + esc(c.title) + "</span><span>" +
        (planned ? "筹备中" : "▾") + "</span></div>" +
        '<div class="m-units" data-units></div></div>';
    });
    tree.innerHTML = html;

    Array.prototype.forEach.call(tree.querySelectorAll(".m-ch"), function (chEl) {
      var chId = chEl.dataset.ch;
      chEl.querySelector(".m-ch-title").addEventListener("click", function () {
        var meta = (window.MATH_CHAPTERS || []).filter(function (c) { return c.id === chId; })[0];
        if (!meta || meta.status !== "ready") return;
        var wasOpen = chEl.classList.contains("open");
        Array.prototype.forEach.call(tree.querySelectorAll(".m-ch.open"),
          function (o) { o.classList.remove("open"); });
        if (wasOpen) return;
        chEl.classList.add("open");
        ensureChapterData(chId).then(function () {
          var ch = (window.MATH_CH || {})[chId];
          var uh = "";
          (ch.units || []).forEach(function (u) {
            uh += '<div class="m-unit-title">' + esc(u.title) + "</div>";
            (u.lessons || []).forEach(function (l) {
              var firstPage = (l.pages || [])[0];
              var done = firstPage && progress[firstPage.id] ? '<span class="done">✓</span>' : "";
              uh += '<button class="m-lesson" data-ch="' + esc(chId) + '" data-lesson="' +
                esc(l.id) + '" data-page="' + esc(firstPage ? firstPage.id : "") + '">' +
                done + esc(l.title) + "</button>";
            });
          });
          chEl.querySelector("[data-units]").innerHTML = uh;
          Array.prototype.forEach.call(chEl.querySelectorAll(".m-lesson"), function (btn) {
            btn.addEventListener("click", function () {
              openLesson(btn.dataset.ch, btn.dataset.lesson, btn.dataset.page || null);
            });
          });
          if (state.pageId) markActiveLesson(state.pageId);
        });
      });
    });
  }

  /* ---------------- 启动 ---------------- */
  function init() {
    renderSidebar();

    $("btn-prev").addEventListener("click", function () { go(-1); });
    $("btn-next").addEventListener("click", function () { go(1); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "ArrowLeft") go(-1);
      if (e.key === "ArrowRight") go(1);
    });
    $("menu-btn").addEventListener("click", function () {
      $("drawer").classList.toggle("open");
    });

    // 深链接：#p=<pageId>
    var m = (location.hash || "").match(/#p=([\w-]+)/);
    if (m) {
      // 从 pageId 反查章节：ch00-u1-l1-p1 → ch00
      var chId = m[1].split("-")[0];
      openLesson(chId, null, m[1]);
    } else {
      $("p-title").textContent = "从左侧目录选择一课开始";
      $("p-hints").innerHTML = "<p>💡 建议从第零章「导论」开始，10 分钟建立代数直觉。</p>";
      $("btn-prev").disabled = true;
      $("btn-next").disabled = true;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
