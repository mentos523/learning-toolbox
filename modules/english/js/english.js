/* ============================================================
 * 词根词缀学习工具 · 应用逻辑
 * 单列纵向流：词根选择（折叠）/ 拨盘学习区 / 设置（折叠）
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
    updateSettingsSub();
  }

  /* ---------------- 抽屉 ----------------
   * 桌面：贴边窄条，鼠标靠近（悬停）滑出，离开收起；
   * 手机：收成上下栏，点击展开/收起。
   * 开合状态持久化到本地。
   */
  var DRAWER_KEY = "ltb-en-drawer";
  function loadDrawer() {
    try { return Object.assign({ left: false, right: false },
      JSON.parse(localStorage.getItem(DRAWER_KEY) || "{}")); }
    catch (e) { return { left: false, right: false }; }
  }
  function saveDrawer(d) {
    try { localStorage.setItem(DRAWER_KEY, JSON.stringify(d)); } catch (e) {}
  }
  var drawerState = loadDrawer();
  var hoverTimer = null;
  function setDrawer(name, open) {
    drawerState[name] = open;
    saveDrawer(drawerState);
    var sec = document.getElementById(name === "left" ? "drawer-left" : "drawer-right");
    var tab = document.getElementById(name === "left" ? "tab-left" : "tab-right");
    if (sec) sec.classList.toggle("open", open);
    if (tab) tab.setAttribute("aria-expanded", open ? "true" : "false");
  }
  function bindDrawer(name) {
    var sec = document.getElementById(name === "left" ? "drawer-left" : "drawer-right");
    var tab = document.getElementById(name === "left" ? "tab-left" : "tab-right");
    if (!sec || !tab) return;
    // 靠近滑出：悬停意图延迟，避免鼠标路过时误触
    sec.addEventListener("mouseenter", function () {
      if (window.innerWidth < 1024) return;   // 手机走点击
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () { setDrawer(name, true); }, 120);
    });
    sec.addEventListener("mouseleave", function () {
      if (window.innerWidth < 1024) return;
      clearTimeout(hoverTimer);
      hoverTimer = setTimeout(function () { setDrawer(name, false); }, 280);
    });
    // 点击切换：触屏 / 键盘可达
    tab.addEventListener("click", function () { setDrawer(name, !drawerState[name]); });
  }
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { setDrawer("left", false); setDrawer("right", false); }
  });
  function updateRootsSub() {
    var mainForm = "";
    if (state.root) {
      mainForm = (state.root.v && state.root.v[0]) ? state.root.v[0] + "-" : state.root.d;
    }
    var sub = document.getElementById("drawer-roots-sub");
    if (sub) {
      sub.innerHTML = state.root
        ? "<b>" + esc(mainForm) + "</b> · " + esc(state.root.m[0]) : "";
    }
    var cur = document.getElementById("tab-left-cur");
    if (cur) cur.textContent = mainForm;
  }
  function updateSettingsSub() {
    var themeName = { light: "明亮", soft: "护眼", dark: "暗夜" }[settings.theme] || "";
    var voiceName = settings.voice === "gb" ? "英音" : "美音";
    var txt = themeName + " · " + voiceName + " · " + Number(settings.rate).toFixed(1) + "x";
    var sub = document.getElementById("drawer-settings-sub");
    if (sub) sub.textContent = txt;
    var cur = document.getElementById("tab-right-cur");
    if (cur) cur.textContent = voiceName;
  }

  /* 单词内词根词形高亮：前缀型加连字符（dict-ate），中缀型只标红（ex**pect**） */
  function heroWordHtml(word, variants) {
    var w = String(word == null ? "" : word);
    var lw = w.toLowerCase();
    var best = "", bestLen = 0;
    function consider(lv) {
      if (lv && lw.indexOf(lv) !== -1 && lv.length > bestLen) { best = lv; bestLen = lv.length; }
    }
    (variants || []).forEach(function (v) {
      var lv = String(v).toLowerCase();
      consider(lv);
      if (lv.length >= 5) consider(lv.slice(1));   // 音变兜底：spect→pect
    });
    if (!best) return esc(w);
    var i = lw.indexOf(best);
    var morph = esc(w.slice(i, i + best.length));
    var before = esc(w.slice(0, i));
    var after = esc(w.slice(i + best.length));
    if (i === 0) {
      return '<span class="morph">' + morph + '</span><span class="hyph">-</span>' + after;
    }
    return before + '<span class="morph">' + morph + "</span>" + after;
  }
  /* 电影感转场：快速连播时跳过，避免闪烁 */
  var lastCine = 0;
  function cineRestart(el) {
    if (!el) return;
    var now = Date.now();
    if (now - lastCine < 250) return;
    lastCine = now;
    el.classList.remove("cine");
    void el.offsetWidth;
    el.classList.add("cine");
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
  var state = { root: null, rootIdx: 0, word: 0 };
  var rootWheel, wordWheel;
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
    var idx = DATA.indexOf(rt);
    // 左拨盘同步（抽屉/搜索触发时）
    if (idx !== -1 && idx !== state.rootIdx) {
      state.rootIdx = idx;
      if (rootWheel && rootWheel.index !== idx) rootWheel.go(idx, true);
    } else if (idx !== -1) {
      state.rootIdx = idx;
    }
    state.root = rt;
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
    // 右拨盘：当前词根的单词
    wordWheel.setItems(rt.w.map(function (wd) { return { label: wd[0] }; }));
    renderHero();
    updateRootsSub();
    // 深链接写回：刷新/分享后回到当前词根（replaceState 不污染历史栈）
    try { history.replaceState(null, "", "#r=" + rt.r); } catch (e) {}
    // 选完词根后收起抽屉（除非调用方要求保持展开）
    if (!(opts && opts.keepOpen)) setDrawer("left", false);
  }

  /* ---------------- Hero 渲染 ---------------- */
  function currentWord() {
    if (!state.root || !state.root.w.length) return null;
    return state.root.w[Math.max(0, Math.min(state.root.w.length - 1, state.word))];
  }
  function renderHero() {
    var rt = state.root;
    var heroWord = document.getElementById("hero-word");
    var heroZh = document.getElementById("hero-zh");
    var meanLine = document.getElementById("mean-line");
    if (!rt || !rt.w.length) {
      heroWord.textContent = "—";
      heroZh.textContent = "";
      meanLine.textContent = "该词根暂无收词";
      return;
    }
    var wd = currentWord();
    // 焦点大字：词根词形标红（前缀型加连字符，如 dict-ate）
    heroWord.innerHTML = heroWordHtml(wd[0], rt.v);
    cineRestart(heroWord);
    // 单词中文
    heroZh.textContent = wd[2];
    cineRestart(heroZh);
    // 词义一行：词根意思① → 单词词性中文
    var mi = Math.min(Math.max(0, wd[3] || 0), rt.m.length - 1);
    meanLine.innerHTML = '<span class="num">' + num(mi) + "</span>" + esc(rt.m[mi]) +
      ' &nbsp;→&nbsp; <b>' + esc(wd[1]) + " " + esc(wd[2]) + "</b>";
    // 自动朗读：仅在用户已交互过页面后触发（避免刷新即播）
    if (settings.auto && userInteracted) speak(wd[0]);
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
    // 抽屉：绑定悬停/点击 + 恢复上次开合状态（默认都收起）
    bindDrawer("left");
    bindDrawer("right");
    setDrawer("left", !!drawerState.left);
    setDrawer("right", !!drawerState.right);
    // 左拨盘：全部词根（上下拨切换词根）
    rootWheel = new Wheel("root-wheel-wrap", {
      itemH: wheelItemH(),
      onSelect: function (i) {
        if (i !== state.rootIdx) selectRoot(DATA[i]);
      }
    });
    // 右拨盘：当前词根的单词
    wordWheel = new Wheel("word-wheel-wrap", {
      itemH: wheelItemH(),
      onSelect: function (i) { state.word = i; renderHero(); }
    });
    rootWheel.setItems(DATA.map(function (rt) { return { label: rt.d }; }));
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
      var ttsNote = document.getElementById("tts-note");
      if (ttsNote) ttsNote.textContent = "当前浏览器不支持语音朗读";
      toast("当前浏览器不支持语音朗读");
      document.getElementById("tts-us").disabled = true;
      document.getElementById("tts-gb").disabled = true;
    }
    window.addEventListener("resize", function () {
      // 跨断点（767px）重算拨盘行高，避免选中错位
      var h = wheelItemH();
      [rootWheel, wordWheel].forEach(function (w) {
        if (w && w.itemH !== h) { w.itemH = h; w._settle(); }
      });
    });
    // 分享链接：#r=xxx 变化时切换词根
    window.addEventListener("hashchange", function () {
      var m = (location.hash || "").match(/#r=([a-z]+)/);
      if (m && findRoot(m[1]) && (!state.root || state.root.r !== m[1])) {
        selectRoot(m[1]);
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
    // 默认选中：优先 URL hash（#r=re），否则第一个词根
    var hm = (location.hash || "").match(/#r=([a-z]+)/);
    var first = (hm && findRoot(hm[1])) ? hm[1] : (DATA.length ? DATA[0].r : null);
    if (first) selectRoot(first, { keepOpen: true });  // 初始化不碰面板开合（尊重持久化状态）
  }

  function wheelItemH() {
    return window.innerWidth <= 767 ? 46 : 54;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
