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
    // 手机端：开一个抽屉时收起另一个，避免互相遮挡
    if (open && window.innerWidth < 1024) {
      var other = name === "left" ? "right" : "left";
      drawerState[other] = false;
      var otherSec = document.getElementById(other === "left" ? "drawer-left" : "drawer-right");
      var otherTab = document.getElementById(other === "left" ? "tab-left" : "tab-right");
      if (otherSec) otherSec.classList.remove("open");
      if (otherTab) otherTab.setAttribute("aria-expanded", "false");
    }
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

  /* 对称词素切分：单词 = 词根词素 + 另一部分（前缀或后缀）
   * 返回 {morph, idx, len, other, pos}，pos: "prefix"|"suffix"|"mid"|"none" */
  function splitPair(word, root) {
    var w = String(word == null ? "" : word);
    var lw = w.toLowerCase();
    var bestLen = 0, bestIdx = -1;
    function consider(lv) {
      var idx = lw.indexOf(lv);
      if (lv && idx !== -1 && lv.length > bestLen) { bestLen = lv.length; bestIdx = idx; }
    }
    (root.v || []).forEach(function (v) {
      var lv = String(v).toLowerCase();
      consider(lv);
      if (lv.length >= 5) consider(lv.slice(1));   // 音变兜底：spect→pect
    });
    if (bestLen === 0) return { morph: "", idx: -1, len: 0, other: w, pos: "none", full: w };
    var morph = w.slice(bestIdx, bestIdx + bestLen);
    var before = w.slice(0, bestIdx);
    var after = w.slice(bestIdx + bestLen);
    var pos, other;
    if (bestIdx === 0) { pos = "suffix"; other = after; }          // tele-phone
    else if (bestIdx + bestLen === w.length) { pos = "prefix"; other = before; }  // pro-ject（从ject看）
    else { pos = "mid"; other = w; }                               // 中缀：右拨盘显示整词
    // 整词即词素时（如 test@test），other 为空，右拨盘显示整词避免落空
    if (!other) { other = w; pos = "none"; }
    return { morph: morph, idx: bestIdx, len: bestLen, other: other, pos: pos, full: w };
  }

  /* 词素意思查找：在词根库中找对应词素（如 pro→pro-，ject→ject-，phone→phon-） */
  function findMorpheme(part) {
    var p = String(part || "").toLowerCase().replace(/-/g, "");
    if (!p) return null;
    var rt = findRoot(p);
    if (rt) return rt;
    if (p.slice(-1) === "e") { rt = findRoot(p.slice(0, -1)); if (rt) return rt; }  // phone→phon
    for (var i = 0; i < DATA.length; i++) {
      var r = DATA[i];
      for (var j = 0; j < r.v.length; j++) {
        if (p === r.v[j].toLowerCase()) return r;
      }
    }
    return null;
  }

  /* 单词内词根词形高亮：词素前后加"·"分隔（react→re·act，interaction→inter·act·ion） */
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
    var dot = '<span class="hyph">·</span>';
    var html = '<span class="morph">' + morph + '</span>';
    if (before) html = before + dot + html;   // 前有词素才加前点
    if (after) html = html + dot + after;     // 后有词素才加后点
    return html;
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
  /* 卡塔音效：Web Audio 合成短促滴答，无需外部文件 */
  var tickCtx = null;
  function ensureTickCtx() {
    try {
      if (!tickCtx) tickCtx = new (window.AudioContext || window.webkitAudioContext)();
      if (tickCtx.state === "suspended") tickCtx.resume();
    } catch (e) {}
  }
  // iOS：首次触摸时预热 AudioContext（iOS 要求手势内创建/恢复）
  document.addEventListener("touchstart", ensureTickCtx, { passive: true, once: true });
  document.addEventListener("touchend", ensureTickCtx, { passive: true });
  function tickSound() {
    try {
      ensureTickCtx();
      if (!tickCtx || tickCtx.state !== "running") return;
      var t = tickCtx.currentTime;
      var o = tickCtx.createOscillator();
      var g = tickCtx.createGain();
      o.type = "triangle";
      o.frequency.setValueAtTime(2400, t);
      o.frequency.exponentialRampToValueAtTime(1200, t + 0.03);
      g.gain.setValueAtTime(0.04, t);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.04);
      o.connect(g); g.connect(tickCtx.destination);
      o.start(t); o.stop(t + 0.05);
    } catch (e) {}
  }
  /* 微弱震动：仅移动端支持 */
  function hapticTick() {
    try { if (navigator.vibrate) navigator.vibrate(8); } catch (e) {}
  }
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
    // 弹性高度：容器变化时重算上下垫片，保证选中项永远居中对齐高亮框
    if ("ResizeObserver" in window) {
      var ro = new ResizeObserver(function () { self.fit(); });
      ro.observe(this.list);
    }
  }
  /* 垫片高度 = (容器高 - 行高) / 2，使 scrollTop = i*itemH 时第 i 项恰好居中 */
  Wheel.prototype.fit = function () {
    var H = this.list.clientHeight;
    if (!H) return;
    var pad = Math.max(0, (H - this.itemH) / 2);
    var pads = this.list.querySelectorAll(".wheel-pad");
    for (var i = 0; i < pads.length; i++) pads[i].style.height = pad + "px";
    if (this.index >= 0) this.list.scrollTop = this.index * this.itemH;
  };
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
    var selfFit = this;
    requestAnimationFrame(function () { selfFit.fit(); });
    if (items.length) this.go(0, true, true);  // 初始选中静默，不播音效
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
  Wheel.prototype._select = function (i, quiet) {
    if (i === this.index) return;
    this.index = i;
    var els = this.list.querySelectorAll(".wheel-item");
    for (var k = 0; k < els.length; k++) {
      var d = Math.abs(k - i);
      els[k].classList.toggle("selected", k === i);
      els[k].setAttribute("aria-selected", k === i ? "true" : "false");
      // 透视：离选中项越远越小、越透（最多显示约 7 个）
      var op = d === 0 ? 1 : Math.max(0.08, 1 - d * 0.3);
      var sc = d === 0 ? 1.22 : Math.max(0.68, 1 - d * 0.1);
      els[k].style.opacity = op;
      els[k].style.transform = d === 0 ? "" : "scale(" + sc.toFixed(2) + ")";
      els[k].style.filter = d >= 3 ? "blur(1px)" : "";
      // 卡入效果：选中项播放回弹动画
      if (k === i && !quiet) {
        els[k].classList.remove("snapped");
        void els[k].offsetWidth;  // 强制重排，重启动画
        els[k].classList.add("snapped");
      }
    }
    // 卡塔音效 + 微弱震动（初始加载静默）
    if (!quiet) { tickSound(); hapticTick(); }
    this.onSelect(i, this.items[i]);
  };
  Wheel.prototype.go = function (i, instant, quiet) {
    if (!this.items.length) return;
    i = Math.max(0, Math.min(this.items.length - 1, i));
    this.list.scrollTo({ top: i * this.itemH, behavior: instant ? "auto" : "smooth" });
    // 立即高亮，不等滚动稳定（体验更跟手）
    this._select(i, quiet);
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

  /* 系统合成语音（2026-10-10 起唯一朗读通道，零 MP3） */
  function speak(text, forceVoice) {
    if (!text) return;
    var now = Date.now();
    // 去重：300ms 内相同文本只读一次（selectRoot 会经 setItems+显式调用双触发 renderHero）
    if (text === speak._lastText && now - speak._lastTime < 300) return;
    speak._lastText = text;
    speak._lastTime = now;
    var mode = forceVoice || settings.voice;   // 'us' 美音 / 'gb' 英音
    var rate = Math.min(1.5, Math.max(0.5, Number(settings.rate) || 0.9));
    var myId = ++speakSeq;
    // 全合成语音（2026-10-10 用户决策：零 MP3，扩词不再生成音频）
    speakSynth(text, mode, rate, myId);
  }

  /* 系统合成语音（唯一朗读通道） */
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
      var btn = document.getElementById(mode === "gb" ? "tts-gb" : "tts-us");
      if (myId === speakSeq) {
        document.querySelectorAll(".tts-btn").forEach(function (b) {
          b.classList.toggle("speaking", b === btn);
        });
      }
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
  var state = { card: null, root: null, rootIdx: 0, word: 0 };
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
    // 右拨盘：单词去掉词根词素后的另一部分（如 phone/pro/ject；中缀型显示整词）
    wordWheel.setItems(rt.w.map(function (wd) {
      var sp = splitPair(wd[0], rt);
      return { label: sp.other, full: wd[0] };
    }));
    renderHero();
    updateRootsSub();
    // 深链接写回：刷新/分享后回到当前词根（replaceState 不污染历史栈）
    try { history.replaceState(null, "", "#r=" + rt.r); } catch (e) {}
    // 选完词根后收起抽屉：仅手机端自动收起，桌面端由用户手动控制（避免抽屉被锁死）
    if (!(opts && opts.keepOpen) && window.innerWidth < 1024) setDrawer("left", false);
  }

  function currentWord() {
    if (!state.root || !state.root.w.length) return null;
    return state.root.w[Math.max(0, Math.min(state.root.w.length - 1, state.word))];
  }
  /* 词根多义显示：当前义高亮，其余义淡化放下面对齐 */
  function meaningsHtml(meanings, curIdx) {
    var html = "";
    for (var i = 0; i < meanings.length; i++) {
      var cls = i === curIdx ? "mean-cur" : "mean-other";
      html += '<div class="mean-row ' + cls + '"><span class="num">' + num(i) + "</span><span>" + esc(meanings[i]) + "</span></div>";
    }
    return html;
  }

  /* ---------------- Hero 渲染：整个单词 + 单词意思 ---------------- */
  function renderHero() {
    var rt = state.root;
    var heroWord = document.getElementById("hero-word");
    var heroMean = document.getElementById("hero-mean");
    var rootMean = document.getElementById("root-mean");
    var wordMean = document.getElementById("word-mean");
    if (!rt || !rt.w.length) {
      heroWord.textContent = "—";
      heroMean.textContent = "";
      if (rootMean) rootMean.textContent = "";
      if (wordMean) wordMean.textContent = "该词根暂无收词";
      return;
    }
    var wd = currentWord();
    // 音标（顶部）
    var heroPhon = document.getElementById("hero-phon");
    var phon = (window.WORD_PHON && window.WORD_PHON[wd[0]]) || "";
    heroPhon.textContent = phon;
    heroPhon.style.display = phon ? "" : "none";
    // 顶部：整个单词（词根词素标红）
    heroWord.innerHTML = heroWordHtml(wd[0], rt.v);
    cineRestart(heroWord);
    // 单词意思：词性 + 中文
    heroMean.innerHTML = '<span class="pos">' + esc(wd[1]) + "</span><b>" + esc(wd[2]) + "</b>";
    cineRestart(heroMean);
    // 词义分解：各部分意思用 · 分隔（如 [再；重新]·[带；运送]·[形容词后缀]）
    var heroParts = document.getElementById("hero-parts");
    if (heroParts) {
      var sp = splitPair(wd[0], rt);
      var parts = [];
      // 简化词义：取核心部分，去掉举例
      function shortMean(s) {
        if (!s) return "";
        // 去掉"如…"举例部分（中英文括号）
        var idx = s.indexOf("，如");
        if (idx === -1) idx = s.indexOf(", 如");
        if (idx === -1) idx = s.indexOf("（如");
        if (idx === -1) idx = s.indexOf("(如");
        if (idx !== -1) s = s.slice(0, idx);
        // 去掉"表示"前缀，保留核心
        s = s.replace(/^(前缀|后缀|名词后缀|形容词后缀|动词后缀|副词后缀)，表示/, "$1");
        return s.trim();
      }
      var seenParts = {};
      // 用 splitPair 已算出的最长变体位置（sp.idx/sp.len）直接切片，保证与顶部标红一致
      if (sp.idx !== -1 && sp.len > 0) {
        var w = wd[0];
        if (sp.idx > 0) {
          // 前缀部分
          var before = w.slice(0, sp.idx);
          var bm = window.STANDALONE_DICT && window.STANDALONE_DICT[before.toLowerCase()];
          if (bm) parts.push("[" + shortMean(bm) + "]");
        }
        // 词根部分
        var mi2 = Math.min(Math.max(0, wd[3] || 0), rt.m.length - 1);
        parts.push("[" + rt.m[mi2] + "]");
        if (sp.idx + sp.len < w.length) {
          // 后缀部分
          var after = w.slice(sp.idx + sp.len);
          var am = window.STANDALONE_DICT && window.STANDALONE_DICT[after.toLowerCase()];
          if (am) parts.push("[" + shortMean(am) + "]");
        }
      } else {
        // 整词即词素或无法切分：只显示词根意思
        var mi3 = Math.min(Math.max(0, wd[3] || 0), rt.m.length - 1);
        parts.push("[" + rt.m[mi3] + "]");
      }
      heroParts.textContent = parts.join("·");
      heroParts.style.display = parts.length > 1 ? "" : "none";
    }
    // 左拨盘下方：词根意思（多义时当前义高亮，其余淡化对齐）
    var mi = Math.min(Math.max(0, wd[3] || 0), rt.m.length - 1);
    if (rootMean) rootMean.innerHTML = meaningsHtml(rt.m, mi);
    // 右拨盘下方：选中词素的意思（多义同样处理，默认取第一义）
    // 若另一部分不是已知词根：查独立单词词典（如 school→学校）；查不到则不显示
    // 中间型（如 submarine）：分别解释前后两部分（sub + ne）
    if (wordMean) {
      var sp = splitPair(wd[0], rt);
      var mRoot = findMorpheme(sp.other);
      if (mRoot && sp.pos !== "none" && sp.pos !== "mid") {
        wordMean.innerHTML = meaningsHtml(mRoot.m, 0);
      } else if (sp.pos === "none" && sp.other === wd[0]) {
        // 整词即词素：显示词根本义
        wordMean.innerHTML = meaningsHtml(rt.m, mi);
      } else if (sp.pos === "mid") {
        // 中间型：分别查前后两部分
        var w = wd[0], lw = w.toLowerCase();
        var before = "", after = "";
        (rt.v || []).forEach(function (v) {
          var lv = String(v).toLowerCase();
          var idx = lw.indexOf(lv);
          if (lv && idx > 0 && idx + lv.length < w.length) {
            before = w.slice(0, idx); after = w.slice(idx + lv.length);
          }
        });
        var html = "";
        if (before) {
          var bm = window.STANDALONE_DICT && window.STANDALONE_DICT[before.toLowerCase()];
          html += '<div><b>' + esc(before) + "</b>：" + esc(bm || "—") + "</div>";
        }
        if (after) {
          var am = window.STANDALONE_DICT && window.STANDALONE_DICT[after.toLowerCase()];
          html += '<div><b>' + esc(after) + "</b>：" + esc(am || "—") + "</div>";
        }
        wordMean.innerHTML = html;
      } else {
        var stMean = window.STANDALONE_DICT && window.STANDALONE_DICT[sp.other.toLowerCase()];
        wordMean.innerHTML = stMean ? "<b>" + esc(stMean) + "</b>" : "";
      }
    }
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

  /* ---------------- 子卡（蓝队 2026-10-14）：讲词根 / 语法 ----------------
   * 进入英语先选子卡；深链 #card=roots|grammar 直达对应子卡；
   * 旧深链 #r=xxx（已分享）直接进讲词根对应词根，行为与原来一致。
   * 上次进入的子卡记 localStorage "ltb-en-track"，选择页打"上次进入"徽标。
   * 讲词根拨盘应用本身内容与行为零改动。
   *
   * hash 约定：
   *   #card=roots   → 讲词根（入口用；进入后 selectRoot 会按原逻辑写回 #r=xxx，
   *                     与旧分享链格式一致，故不再重复写 #card=roots）
   *   #card=grammar → 语法筹备中外壳
   *   #r=xxx        → 讲词根对应词根（旧链，优先级高于 #card=）
   *   无 hash       → 子卡选择页
   * 与既有 #r= 无冲突："#card=roots" 中不含 "#r=" 子串。 */
  var EN_TRACKS = [
    {
      id: "roots",
      name: "讲词根",
      tagline: "拨盘识词",
      description: "拨一拨词根，单词自己长出来：变形拨盘、词根词义对齐、合成语音朗读。",
      glyph: "Aa",
      color: "#1d4ed8",
      cta: "进入学习 →"
    },
    {
      id: "grammar",
      name: "语法",
      tagline: "筹备中",
      description: "语法板块正在按课程体系筹备，内容尚未上线，先看筹备说明。",
      glyph: "？",
      color: "#b45309",
      cta: "查看说明 →"
    }
  ];
  var TRACK_KEY = "ltb-en-track";
  function trackIcon(t) {
    var c = t.color || "#1d4ed8";
    return '<svg viewBox="0 0 48 48" width="44" height="44" aria-hidden="true">' +
      '<rect x="4" y="8" width="40" height="32" rx="6" fill="' + c + '" opacity="0.15"/>' +
      '<text x="24" y="33" text-anchor="middle" font-size="19" font-weight="bold" fill="' + c +
      '" font-family="sans-serif">' + esc(t.glyph || "Aa") + "</text></svg>";
  }
  function renderTracks() {
    var grid = document.getElementById("track-grid");
    if (!grid) return;
    var last = null;
    try { last = localStorage.getItem(TRACK_KEY); } catch (e) {}
    grid.innerHTML = EN_TRACKS.map(function (t) {
      var badge = (t.id === last) ? '<span class="e-track-last">上次进入</span>' : "";
      return '<a class="e-track-card" style="--track-color:' + esc(t.color || "#1d4ed8") + '"' +
        ' href="#card=' + esc(t.id) + '" data-track="' + esc(t.id) + '"' +
        ' aria-label="进入' + esc(t.name) + '子卡">' +
        '<div class="e-track-icon">' + trackIcon(t) + "</div>" +
        "<h2>" + esc(t.name) + " <small>· " + esc(t.tagline || "") + "</small>" + badge + "</h2>" +
        "<p>" + esc(t.description || "") + "</p>" +
        '<span class="e-track-btn">' + esc(t.cta || "进入学习 →") + "</span></a>";
    }).join("");
    Array.prototype.forEach.call(grid.querySelectorAll(".e-track-card"), function (a) {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        enterCard(a.dataset.track);
      });
    });
  }
  /* 回子卡选择页：清 hash（类比数学 showTracks），下次进入重新选 */
  function showTracks() {
    state.card = null;
    renderTracks();
    document.getElementById("tracks").hidden = false;
    document.getElementById("app").hidden = true;
    document.getElementById("grammar").hidden = true;
    try { history.replaceState(null, "", location.pathname); } catch (e) {}
  }
  function enterRoots() {
    state.card = "roots";
    try { localStorage.setItem(TRACK_KEY, "roots"); } catch (e) {}
    document.getElementById("tracks").hidden = true;
    document.getElementById("grammar").hidden = true;
    document.getElementById("app").hidden = false;
    // 默认选中：优先 URL hash（#r=re），否则第一个词根（原初始化逻辑原样搬入）；
    // selectRoot 会按原逻辑写回 #r=xxx，与旧分享链格式一致
    var hm = (location.hash || "").match(/#r=([a-z]+)/);
    var first = (hm && findRoot(hm[1])) ? hm[1] : (DATA.length ? DATA[0].r : null);
    if (first) selectRoot(first, { keepOpen: true });  // 初始化不碰面板开合（尊重持久化状态）
    // 无 RO 兜底（蓝队 2026-10-14 修白队 M1）：隐藏初始化（选择页先显示）时 Wheel.fit
    // 因 clientHeight=0 提前返回；无 ResizeObserver 的浏览器收不到 unhide 通知，
    // 垫片永久错位。此处在 unhide 后显式补一次，不依赖 RO（拨盘逻辑本身零改动）。
    // 深链路由（init 深链 / hashchange / 语法外壳入口）全部经 enterRoots，是唯一 unhide 点。
    if (rootWheel) rootWheel.fit();
    if (wordWheel) wordWheel.fit();
  }
  function enterGrammar() {
    state.card = "grammar";
    try { localStorage.setItem(TRACK_KEY, "grammar"); } catch (e) {}
    document.getElementById("tracks").hidden = true;
    document.getElementById("app").hidden = true;
    document.getElementById("grammar").hidden = false;
    try { history.replaceState(null, "", "#card=grammar"); } catch (e) {}
  }
  function enterCard(id) {
    if (id === "grammar") enterGrammar();
    else if (id === "roots") enterRoots();
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
    // 分享链接：#r=xxx 变化时切换词根；#card=xxx 变化时切换子卡
    window.addEventListener("hashchange", function () {
      var h = location.hash || "";
      var cm = h.match(/#card=([a-z]+)/);
      if (cm && (cm[1] === "roots" || cm[1] === "grammar")) {
        if (state.card !== cm[1]) enterCard(cm[1]);
        return;
      }
      var m = h.match(/#r=([a-z]+)/);
      if (m && findRoot(m[1])) {
        if (state.card !== "roots") enterCard("roots");
        else if (!state.root || state.root.r !== m[1]) selectRoot(m[1]);
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
    // 子卡返回按钮（拨盘页 header / 语法外壳）：回子卡选择页
    document.querySelectorAll("[data-card-back]").forEach(function (el) {
      el.addEventListener("click", showTracks);
    });
    // 语法外壳里的真实入口：去讲词根
    var goRoots = document.querySelector("[data-goto-roots]");
    if (goRoots) goRoots.addEventListener("click", function () { enterCard("roots"); });
    applySettings();
    // 深链路由：#r=xxx（旧分享链）→ 讲词根对应词根；#card=grammar → 语法外壳；
    // #card=roots → 讲词根；无 → 子卡选择页
    var _h = location.hash || "";
    var _rm = _h.match(/#r=([a-z]+)/);
    var _cm = _h.match(/#card=([a-z]+)/);
    if (_rm && findRoot(_rm[1])) {
      enterCard("roots");
    } else if (_cm && _cm[1] === "grammar") {
      enterCard("grammar");
    } else if (_cm && _cm[1] === "roots") {
      enterCard("roots");
    } else {
      showTracks();
    }
  }

  function wheelItemH() {
    return window.innerWidth <= 767 ? 46 : 54;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
