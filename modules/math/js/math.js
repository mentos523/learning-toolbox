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

  /* 渲染异常上报（N-2 口径：不许静默吞没）。
   * 任何组件渲染失败必须同时满足：(a) console.error 输出异常详情
   * （含组件位置与 pageId，便于 headless 断言捕获）；(b) 在该组件的
   * 页面位置给出可见降级提示；(c) 不中断其余组件、不整页白屏。 */
  function renderError(where, pageId, e) {
    try {
      if (typeof console !== "undefined" && console.error) {
        console.error("[math-render] " + where + " 失败 page=" + pageId +
          " :: " + (e && e.stack ? e.stack : String(e)));
      }
    } catch (ignore) {}
  }

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

  /* ---------------- 板块（蓝队 2026-10-13）：代数 / 几何 ----------------
   * 进入数学板块先选板块卡片；深链接 #p=xxx 直接进对应板块。
   * 上次板块记 localStorage，下次在卡片上标"上次进入"。 */
  var TRACK_KEY = "ltb-math-track";
  function trackOfChapter(chId) {
    return /^g/i.test(chId || "") ? "geometry" : "algebra";
  }
  function trackMeta(id) {
    return (window.MATH_TRACKS || []).filter(function (t) { return t.id === id; })[0];
  }
  function trackIcon(t) {
    var c = t.color || "#f59e0b";
    var glyph = t.icon === "tri" ? "△" : "ƒx";
    return '<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">' +
      '<rect x="4" y="8" width="40" height="32" rx="6" fill="' + c + '" opacity="0.15"/>' +
      '<text x="24" y="33" text-anchor="middle" font-size="19" font-weight="bold" fill="' + c +
      '">' + glyph + "</text></svg>";
  }
  function renderTracks() {
    var grid = $("track-grid");
    if (!grid) return;
    var last = null;
    try { last = localStorage.getItem(TRACK_KEY); } catch (e) {}
    grid.innerHTML = (window.MATH_TRACKS || []).map(function (t) {
      var badge = (t.id === last) ? '<span class="m-track-last">上次进入</span>' : "";
      return '<a class="m-track-card" style="--track-color:' + esc(t.color || "#f59e0b") + '"' +
        ' href="#track=' + esc(t.id) + '" data-track="' + esc(t.id) + '"' +
        ' aria-label="进入' + esc(t.name) + '板块">' +
        '<div class="m-track-icon">' + trackIcon(t) + "</div>" +
        "<h2>" + esc(t.name) + " <small>· " + esc(t.tagline || "") + "</small>" + badge + "</h2>" +
        "<p>" + esc(t.description || "") + "</p>" +
        '<div class="m-track-meta">' + (t.pages ? "约 " + t.pages + " 页" : "") + "</div>" +
        '<span class="m-track-btn">进入学习 →</span></a>';
    }).join("");
    Array.prototype.forEach.call(grid.querySelectorAll(".m-track-card"), function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        enterTrack(a.dataset.track);
      });
    });
  }
  function showTracks() {
    state.track = null;
    state.chapterId = null; state.pageId = null; state.flat = []; state.index = -1;
    renderTracks();
    $("tracks").hidden = false;
    $("main").hidden = true;
    try { history.replaceState(null, "", location.pathname); } catch (e) {}
  }
  function enterTrack(trackId, opts) {
    var meta = trackMeta(trackId);
    if (!meta) return;
    state.track = trackId;
    try { localStorage.setItem(TRACK_KEY, trackId); } catch (e) {}
    $("tracks").hidden = true;
    $("main").hidden = false;
    $("m-title").textContent = "数学 · " + meta.name;
    renderSidebar();
    if (!(opts && opts.keepPage)) {
      $("p-title").textContent = "从左侧目录选择一课开始";
      var hint = trackId === "geometry"
        ? "<p>💡 建议从「导论——几何是什么」开始，先建立图形直觉。</p>"
        : "<p>💡 建议从第零章「导论」开始，10 分钟建立代数直觉。</p>";
      $("p-hints").innerHTML = hint;
      $("btn-prev").disabled = true;
      $("btn-next").disabled = true;
    }
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

  /* ---------------- 交互区溢出兜底（蓝队 2026-10-11 g10 白队复验） ----------
   * .m-interaction 默认 flex 居中 + overflow:hidden：内容超高时上下对称
   * 静默裁剪，关键控件不可见且无滚动可达。检测到 scrollHeight >
   * clientHeight 则加 .overflows（CSS 改 block 顶部对齐 + 区内滚动），
   * 保证所有控件可达；未溢出页面不受影响。 */
  function fitInteraction() {
    var ixBox = $("p-interaction");
    if (!ixBox) return;
    ixBox.classList.remove("overflows");
    if (ixBox.scrollHeight > ixBox.clientHeight + 1) {
      ixBox.classList.add("overflows");
    }
  }

  /* ---------------- 页面渲染 ----------------
   * renderPage 为守卫壳：renderPageInner 任一组件抛错都不许整页白屏，
   * 兜底为可见错误横幅 + console.error（不许静默）。 */
  function renderPage() {
    var cur = state.flat[state.index];
    if (!cur) return;
    var page = cur.page;
    try {
      renderPageInner(cur, page);
    } catch (e) {
      renderError("页面整体", page.id, e);
      var t = $("p-title");
      if (t) t.textContent = "页面渲染失败";
      var hb = $("p-hints");
      if (hb) {
        hb.className = "m-hints";
        hb.innerHTML = '<p class="render-error" style="color:#b3261e;border:1px dashed ' +
          '#b3261e;padding:6px 10px;border-radius:4px;">页面渲染失败：' +
          esc(e && e.message) + '（已记录到控制台，不影响翻页）</p>';
      }
      try { fitInteraction(); } catch (ignore) {}
    }
  }

  function renderPageInner(cur, page) {
    $("p-title").textContent = page.title || "";
    $("page-ind").textContent =
      (state.index + 1) + " / " + state.flat.length + " · " + cur.lessonTitle;

    // 公式（单条公式失败只降级该条：console.error + 可见标记，不中断整页）
    var fh = "";
    (page.formulas || []).forEach(function (f) {
      try { fh += formulaHtml(f, page.id); }
      catch (e) {
        renderError("公式", page.id, e);
        fh += '<span class="formula-error" style="color:#b3261e;border:1px dashed ' +
          '#b3261e;padding:2px 6px;border-radius:4px;">公式渲染失败（已记录到控制台）</span>';
      }
    });
    $("p-formulas").innerHTML = fh;

    // 主交互
    var ixBox = $("p-interaction");
    ixBox.innerHTML = "";
    ixBox.classList.remove("has-aux");
    if (page.interaction && page.interaction.type) {
      var fn = ixRenderers[page.interaction.type];
      if (fn) {
        try { fn(ixBox, page.interaction.params || {}, page); }
        catch (e) {
          renderError("主交互 " + page.interaction.type, page.id, e);
          ixBox.innerHTML = '<div class="ix-stub ix-render-error" style="border-left:4px solid ' +
            '#b3261e;color:#b3261e;">交互渲染出错：' +
            esc(e.message) + "<br>（已记录到控制台）</div>";
        }
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
        catch (e) {
          renderError("辅交互 " + page.auxInteraction.type, page.id, e);
          auxBox.innerHTML = '<div class="ix-stub ix-render-error" style="border-left:4px solid ' +
            '#b3261e;color:#b3261e;">辅交互渲染出错：' +
            esc(e.message) + "<br>（已记录到控制台）</div>";
        }
      } else {
        auxBox.innerHTML = '<div class="ix-stub">辅交互占位：' + esc(page.auxInteraction.type) +
          "<br>（渲染器待实现，不影响浏览）</div>";
      }
    }

    // 点拨
    // （白队 2026-10-11 g10 复验：fitInteraction 排序修复）注意：溢出检测
    // 必须放在本函数末尾（hints/答案渲染之后）。hints 区是 flex:none，
    // 习题页可达 250px，会把 flex:1 的交互区往下压；若在 hints 渲染前检测，
    // 量到的是"旧 hints 高度下"的交互区尺寸，之后 hints 变高导致的新溢出
    // 将被漏检 → 静默裁剪。见函数末尾调用。
    // （蓝队 2026-10-10 缺陷A修复）习题页（concept === "本章习题"）：
    // 题目区加 exercise 类变为可滚动（CSS .m-hints.exercise），
    // examples 作为"核对答案"折叠渲染——此前 examples 从未被渲染，答案用户永远看不到。
    // （蓝队 2026-10-11）讲解页（page.pageKind === "explain"）：
    // 讲透需要 300 字（pedagogy §5.2），点拨区加 explain 类变为
    // 可滚动（CSS .m-hints.explain / .explain-scroll，复用习题页模式）。
    var isExercise = page.concept === "本章习题";
    var isExplain = page.pageKind === "explain";
    try {
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
        // （蓝队 2026-10-15 自学审计优化“章末习题补解析”）折叠标题取自
        // examples 条目的 figure 字段；既有 27 条 figure 均为“核对答案”，输出不变。
        sum.textContent = "📝 " + (ex.figure || "核对答案") + "（点开展开）";
        det.appendChild(sum);
        var ap = document.createElement("p");
        ap.textContent = ex.text;
        det.appendChild(ap);
        hintsBox.appendChild(det);
      });
    }
    } catch (e) {
      renderError("点拨/答案", page.id, e);
      var hb2 = $("p-hints");
      if (hb2) hb2.innerHTML = '<p class="render-error" style="color:#b3261e;border:1px dashed ' +
        '#b3261e;padding:6px 10px;border-radius:4px;">点拨区渲染失败（已记录到控制台）</p>';
    }

    // 翻页按钮
    $("btn-prev").disabled = state.index <= 0;
    $("btn-next").disabled = state.index >= state.flat.length - 1;

    // 进度打勾 + URL
    progress[page.id] = 1;
    saveProgress();
    try { history.replaceState(null, "", "#p=" + page.id); } catch (e) {}
    markActiveLesson(page.id);

    // 交互区溢出检测（见 fitInteraction 定义处注释）。
    // （白队 2026-10-11 g10 复验）必须在 hints/答案全部渲染后执行：
    // 此时 flex 布局已最终确定，量到的才是交互区的真实可用高度。
    // scrollHeight 的读取会强制同步布局，无需额外 rAF。
    fitInteraction();
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
      // 板块过滤：只显示当前板块的章节（未选板块时全显，兜底）
      if (state.track && trackOfChapter(c.id) !== state.track) return;
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

    // 横竖屏/窗口尺寸变化时重算交互区是否溢出（防抖 150ms）
    var rsT = null;
    window.addEventListener("resize", function () {
      if (rsT) clearTimeout(rsT);
      rsT = setTimeout(fitInteraction, 150);
    });

    // （白队 2026-10-11 g10 复验）习题页"核对答案"折叠展开/收起会改变
    // hints 区高度（flex:none，上限 250px），从而改变 flex:1 交互区的可用
    // 高度；toggle 事件不冒泡，用捕获阶段委托监听，展开后重算溢出。
    // （蓝队 2026-10-13 几何审计严重项）proof-replay 播完自动展开证明书
    // （stop(true) 里 cert.open=true，同样触发 toggle）与"为什么可以"
    // （.ix-why）折叠展开都会改变交互区内容高度；此前从不重算溢出，
    // 390px 下展开内容被静默裁剪且无法滚动到达。此处统一委托重算。
    document.addEventListener("toggle", function (e) {
      if (e.target && e.target.classList &&
          (e.target.classList.contains("m-answers") ||
           e.target.classList.contains("ix-proof-cert") ||
           e.target.classList.contains("ix-why"))) {
        fitInteraction();
      }
    }, true);

    // 深链接：#p=<pageId>（兼容旧链接）→ 按章节前缀判定板块直接进入
    var m = (location.hash || "").match(/#p=([\w-]+)/);
    if (m) {
      // 从 pageId 反查章节：ch00-u1-l1-p1 → ch00
      var chId = m[1].split("-")[0];
      enterTrack(trackOfChapter(chId), { keepPage: true });
      openLesson(chId, null, m[1]);
    } else {
      // 无深链接：先选板块卡片
      showTracks();
    }
    $("tracks-back").addEventListener("click", showTracks);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
