/* ============================================================
 * 词根词缀学习工具 · 应用逻辑
 * 单页应用：左侧词根列表 / 中央拨盘学习区 / 右侧设置
 * ============================================================ */
(function () {
  "use strict";

  var DATA = window.ROOTS_DATA || [];

  /* 序号：①-⑳，超出用 "21." 形式兜底 */
  var CIRCLED = ["①","②","③","④","⑤","⑥","⑦","⑧","⑨","⑩",
                 "⑪","⑫","⑬","⑭","⑮","⑯","⑰","⑱","⑲","⑳"];
  function num(i) { return CIRCLED[i] || ((i + 1) + "."); }

  /* HTML 转义：数据直接拼 innerHTML 时的纵深防御 */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* ---------------- 设置 ---------------- */
  var DEFAULTS = { theme: "light", font: "sys", size: "normal", voice: "us", rate: 0.9, auto: false };
  var settings = loadSettings();

  function loadSettings() {
    try {
      var s = JSON.parse(localStorage.getItem("ltb-en-settings") || "{}");
      return Object.assign({}, DEFAULTS, s);
    } catch (e) { return Object.assign({}, DEFAULTS); }
  }
  function saveSettings() {
    try { localStorage.setItem("ltb-en-settings", JSON.stringify(settings)); } catch (e) {}
  }
  function applySettings() {
    document.body.dataset.theme = settings.theme;
    document.body.dataset.font = settings.font;
    document.body.dataset.size = settings.size;
    document.querySelectorAll("[data-set]").forEach(function (el) {
      var key = el.dataset.set, val = el.dataset.val;
      if (el.tagName === "BUTTON") el.classList.toggle("on", settings[key] === val);
    });
    var rate = document.getElementById("set-rate");
    if (rate) { rate.value = settings.rate; }
    var rateVal = document.getElementById("set-rate-val");
    var safeRate = Math.min(1.5, Math.max(0.5, Number(settings.rate)));
    if (!isFinite(safeRate)) safeRate = 0.9;
    settings.rate = Math.round(safeRate * 10) / 10;
    saveSettings();   // 钳制后回写，避免脏值残留
    if (rateVal) { rateVal.textContent = settings.rate.toFixed(1) + "x"; }
    var auto = document.getElementById("set-auto");
    if (auto) { auto.checked = !!settings.auto; }
    var ttsRate = document.getElementById("tts-rate");
    if (ttsRate) { ttsRate.textContent = Number(settings.rate).toFixed(1) + "x"; }
  }

  /* ---------------- Toast ---------------- */
  var toastTimer = null;
  function toast(msg) {
    var t = document.getElementById("toast");
    t.textContent = msg;
    t.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { t.classList.remove("show"); }, 2200);
  }

  /* ---------------- 拨盘组件 ---------------- */
  function Wheel(wrapId, opts) {
    this.wrap = document.getElementById(wrapId);
    this.list = this.wrap.querySelector(".wheel");
    this.itemH = opts.itemH || 54;
    this.items = [];
    this.index = -1;
    this.onSelect = opts.onSelect || function () {};
    this._settleTimer = null;
    var self = this;
    var ticking = false;
    this.list.addEventListener("scroll", function () {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(function () { ticking = false; self._onScroll(); });
      }
    }, { passive: true });
    this.list.addEventListener("click", function (e) {
      var it = e.target.closest(".wheel-item");
      if (it && it.dataset.i !== undefined) self.go(+it.dataset.i);
    });
    // 键盘支持
    this.list.setAttribute("tabindex", "0");
    this.list.addEventListener("keydown", function (e) {
      if (e.key === "ArrowDown" || e.key === "ArrowRight") { self.go(self.index + 1); e.preventDefault(); }
      if (e.key === "ArrowUp" || e.key === "ArrowLeft") { self.go(self.index - 1); e.preventDefault(); }
    });
  }
  Wheel.prototype.setItems = function (items) {
    // items: [{label, sub}]
    this.items = items;
    var html = '<div class="wheel-pad"></div>';
    for (var i = 0; i < items.length; i++) {
      var sub = items[i].sub ? '<span class="w-zh">' + esc(items[i].sub) + "</span>" : "";
      html += '<div class="wheel-item" data-i="' + i + '" role="option">' +
              "<span>" + esc(items[i].label) + "</span>" + sub + "</div>";
    }
    html += '<div class="wheel-pad"></div>';
    this.list.innerHTML = html;
    this.list.scrollTop = 0;
    this.index = -1;
    if (items.length) this.go(0, true);
  };
  Wheel.prototype._onScroll = function () {
    var self = this;
    clearTimeout(this._settleTimer);
    this._settleTimer = setTimeout(function () { self._settle(); }, 140);
  };
  Wheel.prototype._settle = function () {
    if (!this.items.length) return;
    var i = Math.round(this.list.scrollTop / this.itemH);
    i = Math.max(0, Math.min(this.items.length - 1, i));
    var target = i * this.itemH;
    if (Math.abs(this.list.scrollTop - target) > 1) {
      this.list.scrollTo({ top: target, behavior: "smooth" });
    }
    this._select(i);
  };
  Wheel.prototype._select = function (i) {
    if (i === this.index) return;
    this.index = i;
    var els = this.list.querySelectorAll(".wheel-item");
    for (var k = 0; k < els.length; k++) {
      els[k].classList.toggle("selected", k === i);
      els[k].setAttribute("aria-selected", k === i ? "true" : "false");
    }
    this.onSelect(i, this.items[i]);
  };
  Wheel.prototype.go = function (i, instant) {
    if (!this.items.length) return;
    i = Math.max(0, Math.min(this.items.length - 1, i));
    this.list.scrollTo({ top: i * this.itemH, behavior: instant ? "auto" : "smooth" });
    // 立即高亮，不等滚动稳定（体验更跟手）
    this._select(i);
  };

  /* ---------------- 语音朗读 ---------------- */
  var VOICES = { us: null, gb: null };
  function pickVoice(vs, lang) {
    return vs.find(function (v) { return v.lang === lang && /google/i.test(v.name); })
        || vs.find(function (v) { return v.lang === lang; })
        || vs.find(function (v) { return v.lang && v.lang.toLowerCase().indexOf(lang.slice(0, 2).toLowerCase()) === 0; })
        || null;
  }
  function loadVoices() {
    if (!("speechSynthesis" in window)) return;
    var vs = speechSynthesis.getVoices();
    if (!vs.length) return;
    VOICES.us = pickVoice(vs, "en-US");
    VOICES.gb = pickVoice(vs, "en-GB");
  }
  /* 朗读序号：防止竞态抹掉新按钮高亮 */
  var speakSeq = 0;
  var audioEl = null;

  /* 本地真人声音频优先，缺文件/播不了则降级到系统合成语音 */
  function speak(text, forceVoice) {
    if (!text) return;
    var mode = forceVoice || settings.voice;   // 'us' 美音 / 'gb' 英音
    var sub = (mode === "gb") ? "gb" : "us";
    var rate = Math.min(1.5, Math.max(0.5, Number(settings.rate) || 0.9));
    var myId = ++speakSeq;
    var btn = document.getElementById(mode === "gb" ? "tts-gb" : "tts-us");
    var hl = function (on) {
      if (myId !== speakSeq) return;
      document.querySelectorAll(".tts-btn").forEach(function (b) {
        b.classList.toggle("speaking", on && b === btn);
      });
    };
    try {
      if (audioEl) { try { audioEl.pause(); } catch (e) {} }
      audioEl = new Audio("audio/" + sub + "/" + text.toLowerCase() + ".mp3");
      audioEl.playbackRate = rate;   // 语速设置同样生效
      audioEl.onended = function () { hl(false); };
      audioEl.onerror = function () { speakSynth(text, mode, rate, myId); };
      hl(true);
      var p = audioEl.play();
      if (p && p.catch) p.catch(function () { speakSynth(text, mode, rate, myId); });
    } catch (e) { speakSynth(text, mode, rate, myId); }
  }

  /* 降级：系统合成语音 */
  function speakSynth(text, mode, rate, myId) {
    if (!("speechSynthesis" in window)) {
      if (myId === speakSeq) {
        document.querySelectorAll(".tts-btn").forEach(function (b) { b.classList.remove("speaking"); });
        toast("当前浏览器不支持朗读");
      }
      return;
    }
    try {
      speechSynthesis.cancel();
      var u = new SpeechSynthesisUtterance(text);
      var v = mode === "gb" ? VOICES.gb : VOICES.us;
      if (v) { u.voice = v; u.lang = v.lang; }
      else { u.lang = mode === "gb" ? "en-GB" : "en-US"; }
      u.rate = rate;
      u.onend = u.onerror = function () {
        if (myId !== speakSeq) return;
        document.querySelectorAll(".tts-btn").forEach(function (b) { b.classList.remove("speaking"); });
      };
      speechSynthesis.speak(u);
    } catch (e) { toast("朗读失败，请重试"); }
  }

  /* ---------------- 状态 ---------------- */
  var state = { root: null, variant: 0, word: 0 };
  var variantWheel, wordWheel;
  // 用户是否已与页面交互（自动朗读需手势后才允许，避免刷新即播）
  var userInteracted = false;
  window.addEventListener("pointerdown", function () { userInteracted = true; }, { once: true });
  window.addEventListener("keydown", function () { userInteracted = true; }, { once: true });

  function findRoot(r) {
    for (var i = 0; i < DATA.length; i++) if (DATA[i].r === r) return DATA[i];
    return null;
  }

  /* ---------------- 左侧词根列表 ---------------- */
  function renderRootList(filter) {
    var ul = document.getElementById("root-list");
    var f = (filter || "").trim().toLowerCase();
    var html = "";
    var firstMatch = null;
    DATA.forEach(function (rt) {
      var hay = (rt.d + rt.m.join("") + rt.r).toLowerCase();
      if (f && hay.indexOf(f) === -1) return;
      if (!firstMatch) firstMatch = rt;
      html += '<li data-r="' + esc(rt.r) + '"' + (state.root === rt ? ' class="active"' : "") + ">" +
              '<span class="r-name">' + esc(rt.d) + '</span>' +
              '<span class="r-mean">' + esc(rt.m[0]) + "</span>" +
              '<span class="r-count">' + rt.w.length + "</span></li>";
    });
    ul.innerHTML = html || '<li class="empty-tip">没有找到，换个词试试</li>';
    ul._firstMatch = firstMatch;
  }

  function selectRoot(r, opts) {
    var rt = typeof r === "string" ? findRoot(r) : r;
    if (!rt) return;
    state.root = rt;
    state.variant = 0;
    state.word = 0;
    document.querySelectorAll("#root-list li").forEach(function (li) {
      li.classList.toggle("active", li.dataset.r === rt.r);
    });
    // 若目标词根被搜索过滤掉了，清空搜索重渲染，保证高亮可见
    if (!document.querySelector('#root-list li[data-r="' + rt.r + '"]')) {
      var search = document.getElementById("root-search");
      search.value = "";
      renderRootList("");
      document.querySelectorAll("#root-list li").forEach(function (li) {
        li.classList.toggle("active", li.dataset.r === rt.r);
      });
    }
    // 词根拨盘：字母变形
    variantWheel.setItems(rt.v.map(function (x) { return { label: x + "-" }; }));
    // 词根意思分列
    var mc = document.getElementById("mean-cols");
    mc.innerHTML = rt.m.map(function (mm, i) {
      return '<div class="mean-col" data-mi="' + i + '"><span class="num">' + num(i) + "</span>" + esc(mm) + "</div>";
    }).join("");
    // 单词拨盘
    wordWheel.setItems(rt.w.map(function (wd) { return { label: wd[0] }; }));
    renderWord();
    // 深链接写回：刷新/分享后回到当前词根（replaceState 不污染历史栈）
    try { history.replaceState(null, "", "#r=" + rt.r); } catch (e) {}
    if (window.innerWidth <= 1100 && !(opts && opts.keepOpen)) closeLeft();
  }

  /* ---------------- 单词区渲染 ---------------- */
  function currentWord() {
    if (!state.root || !state.root.w.length) return null;
    return state.root.w[Math.max(0, Math.min(state.root.w.length - 1, state.word))];
  }
  function renderWord() {
    var rt = state.root;
    var comboZh = document.getElementById("combo-zh");
    var wordMeta = document.getElementById("word-meta");
    var map = document.getElementById("mapping");
    // 防御：词根无收词
    if (!rt || !rt.w.length) {
      comboZh.innerHTML = "<small>组合词中文</small>—";
      wordMeta.innerHTML = "该词根暂无收词";
      map.innerHTML = "";
      document.querySelectorAll("#mean-cols .mean-col").forEach(function (el) {
        el.classList.remove("hl");
      });
      return;
    }
    var wd = currentWord();
    // 单词上方：组合词中文大字
    comboZh.innerHTML = "<small>组合词中文</small>" + esc(wd[2]);
    // 单词信息
    wordMeta.innerHTML = "<b>" + esc(wd[0]) + "</b> · " + esc(wd[1]);
    // 对齐映射：单词中文 ↔ 词根意思行（mi 钳制防越界）
    var mi = Math.min(Math.max(0, wd[3] || 0), rt.m.length - 1);
    var html = '<div class="map-head">词根意思</div><div class="map-head">单词意思</div>';
    rt.m.forEach(function (mm, i) {
      html += '<div class="map-cell left' + (i === mi ? " hl" : "") + '" style="grid-row:' + (i + 2) + '">' +
              '<span class="num">' + num(i) + "</span>" + esc(mm) + "</div>";
    });
    html += '<div class="map-cell right hl" style="grid-row:' + (mi + 2) + '">' +
            '<span class="tag">← 词根意思' + num(mi) + "</span>" + esc(wd[2]) + "</div>";
    map.innerHTML = html;
    // 词根意思分列同步高亮
    document.querySelectorAll("#mean-cols .mean-col").forEach(function (el) {
      el.classList.toggle("hl", +el.dataset.mi === mi);
    });
    // 自动朗读：仅在用户已交互过页面后触发（避免刷新即播）
    if (settings.auto && userInteracted) speak(wd[0]);
  }

  /* ---------------- 抽屉 ---------------- */
  function closeLeft() { document.getElementById("app").classList.add("left-closed"); syncScrim(); }
  function closeRight() { document.getElementById("app").classList.add("right-closed"); syncScrim(); }
  function toggleLeft() { document.getElementById("app").classList.toggle("left-closed"); syncScrim(); }
  function toggleRight() { document.getElementById("app").classList.toggle("right-closed"); syncScrim(); }
  function syncScrim() {
    var app = document.getElementById("app");
    var scrim = document.getElementById("scrim");
    var need = window.innerWidth <= 1100 &&
      (!app.classList.contains("left-closed") || !app.classList.contains("right-closed"));
    scrim.style.display = need ? "block" : "none";
    // 收起的抽屉移出 Tab 序列与无障碍树（动画不受影响）
    var sb = document.querySelector(".sidebar");
    var st = document.querySelector(".settings");
    if (sb) sb.inert = app.classList.contains("left-closed");
    if (st) st.inert = app.classList.contains("right-closed");
  }

  /* ---------------- 统计 ---------------- */
  function renderStats() {
    var n = 0;
    DATA.forEach(function (rt) { n += rt.w.length; });
    var txt = "共 " + DATA.length + " 个词根 · " + n + " 个单词";
    document.getElementById("stats").textContent = txt;
    var s2 = document.getElementById("stats2");
    if (s2) s2.textContent = txt;
  }

  /* ---------------- 初始化 ---------------- */
  function init() {
    // 拨盘
    variantWheel = new Wheel("variant-wheel-wrap", {
      itemH: wheelItemH(),
      onSelect: function (i) { state.variant = i; }
    });
    wordWheel = new Wheel("word-wheel-wrap", {
      itemH: wheelItemH(),
      onSelect: function (i) { state.word = i; renderWord(); }
    });
    // 列表
    renderRootList("");
    renderStats();
    var search = document.getElementById("root-search");
    search.addEventListener("input", function () { renderRootList(search.value); });
    search.addEventListener("keydown", function (e) {
      if (e.key === "Enter") {
        var ul = document.getElementById("root-list");
        if (ul._firstMatch) selectRoot(ul._firstMatch);
      }
    });
    document.getElementById("root-list").addEventListener("click", function (e) {
      var li = e.target.closest("li[data-r]");
      if (li) selectRoot(li.dataset.r);
    });
    // 朗读
    document.getElementById("tts-us").addEventListener("click", function () {
      var wd = currentWord(); if (wd) speak(wd[0], "us");
    });
    document.getElementById("tts-gb").addEventListener("click", function () {
      var wd = currentWord(); if (wd) speak(wd[0], "gb");
    });
    if ("speechSynthesis" in window) {
      loadVoices();
      speechSynthesis.onvoiceschanged = loadVoices;
    } else {
      document.getElementById("tts-note").textContent = "当前浏览器不支持语音朗读";
      document.getElementById("tts-us").disabled = true;
      document.getElementById("tts-gb").disabled = true;
    }
    // 抽屉开关
    document.getElementById("btn-left").addEventListener("click", toggleLeft);
    document.getElementById("btn-right").addEventListener("click", toggleRight);
    document.getElementById("btn-left-close").addEventListener("click", closeLeft);
    document.getElementById("btn-right-close").addEventListener("click", closeRight);
    document.getElementById("fab-left").addEventListener("click", toggleLeft);
    document.getElementById("fab-right").addEventListener("click", toggleRight);
    document.getElementById("scrim").addEventListener("click", function () { closeLeft(); closeRight(); });
    window.addEventListener("resize", function () {
      syncScrim();
      // 跨断点（767px）重算拨盘行高，避免选中错位
      var h = wheelItemH();
      [variantWheel, wordWheel].forEach(function (w) {
        if (w && w.itemH !== h) { w.itemH = h; w._settle(); }
      });
    });
    // 分享链接：#r=xxx 变化时切换词根
    window.addEventListener("hashchange", function () {
      var m = (location.hash || "").match(/#r=([a-z]+)/);
      if (m && findRoot(m[1]) && (!state.root || state.root.r !== m[1])) {
        selectRoot(m[1], { keepOpen: window.innerWidth > 1100 });
      }
    });
    // 设置
    document.querySelectorAll("[data-set]").forEach(function (el) {
      el.addEventListener("click", function () {
        settings[el.dataset.set] = el.dataset.val;
        saveSettings(); applySettings();
      });
    });
    var rate = document.getElementById("set-rate");
    rate.addEventListener("input", function () {
      settings.rate = parseFloat(rate.value);
      saveSettings(); applySettings();
    });
    document.getElementById("set-auto").addEventListener("change", function (e) {
      settings.auto = e.target.checked;
      saveSettings();
    });
    applySettings();
    // 桌面端默认展开两侧，窄屏默认收起为抽屉
    var app = document.getElementById("app");
    if (window.innerWidth > 1100) {
      app.classList.remove("left-closed", "right-closed");
    } else {
      closeLeft(); closeRight();
    }
    syncScrim();
    // 默认选中：优先 URL hash（#r=re），否则第一个词根
    var hm = (location.hash || "").match(/#r=([a-z]+)/);
    var first = (hm && findRoot(hm[1])) ? hm[1] : (DATA.length ? DATA[0].r : null);
    if (first) selectRoot(first, { keepOpen: window.innerWidth > 1100 });
  }

  function wheelItemH() {
    return window.innerWidth <= 767 ? 46 : 54;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
