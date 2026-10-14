#!/usr/bin/env node
// 蓝队 2026-10-15：语法章节浏览器端到端流程测试（DOM stub）。
// 加载全部 20 章数据 + grammar.js + english.js，模拟完整点击流：
//   子卡→语法→章列表→课列表→开课→返回→回章列表→回子卡；
//   #card=grammar&test=gr05.1.1 直达；#r=just 讲词根回归。
// 用法：仓库根目录 `node tools/qa-grammar-flow.mjs`
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- 元素 stub ---------- */
function parseButtons(html, attr) {
  // 找出所有带指定 data-* 属性的 <button>/<a>，返回 stub
  const out = [];
  const re = new RegExp("<(button|a)\\b([^>]*?)" + attr + '="([^"]*)"([^>]*)>', "gi");
  let m;
  while ((m = re.exec(html))) {
    const ds = {};
    const dre = /data-([a-z-]+)="([^"]*)"/gi;
    let dm;
    while ((dm = dre.exec(m[0]))) {
      const k = dm[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      ds[k] = dm[2];
    }
    out.push(makeButton(ds));
  }
  return out;
}
function parseClass(html, cls) {
  const out = [];
  const re = new RegExp('<(button|a|div|li|span)\\b[^>]*class="([^"]*\\b' + cls + '\\b[^"]*)"[^>]*>', "gi");
  let m;
  while ((m = re.exec(html))) {
    const allAttrs = m[0];
    const ds = {};
    const dre = /data-([a-z-]+)="([^"]*)"/gi;
    let dm;
    while ((dm = dre.exec(allAttrs))) {
      const k = dm[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase());
      ds[k] = dm[2];
    }
    out.push(makeButton(ds));
  }
  return out;
}
function makeButton(dataset, rawAttrs, cls) {
  const handlers = {};
  return {
    tag: "button", dataset: dataset || {}, _rawAttrs: rawAttrs || [], _cls: new Set((cls || "").split(/\s+/).filter(Boolean)), style: {},
    classList: {
      add: (...c) => c.forEach(x => undefined),
      remove: (...c) => undefined,
      toggle: () => undefined, contains: () => false,
    },
    addEventListener(t, fn) { (handlers[t] = handlers[t] || []).push(fn); },
    click() { (handlers.click || []).forEach(fn => fn({ preventDefault() {}, stopPropagation() {} })); },
    setAttribute() {}, getAttribute() { return null; },
    querySelector() { return null; }, querySelectorAll() { return []; },
    get clientHeight() { return 0; },
    scrollTo() {},
  };
}
function makeEl(id) {
  const el = {
    tag: "div", id, children: [], _html: "", _text: "",
    hidden: false, dataset: {}, style: {}, value: "", checked: false, disabled: false,
    _handlers: {}, _btnCache: [],
    set innerHTML(v) {
      this._html = String(v);
      // 缓存解析出的按钮：english.js 绑定的与测试点击的是同一批 stub
      this._btnCache = [];
      const re = /<(button|a)\b([^>]*)>/gi;
      let m;
      while ((m = re.exec(this._html))) {
        const attrs = m[2];
        const ds = {}, raw = [];
        const dre = /data-([a-z-]+)(?:="([^"]*)")?/gi;
        let dm;
        while ((dm = dre.exec(attrs))) {
          raw.push("data-" + dm[1]);
          const k = dm[1].replace(/-([a-z])/g, (_, c) => c.toUpperCase());
          ds[k] = dm[2] == null ? "" : dm[2];
        }
        const cm = attrs.match(/class="([^"]*)"/);
        this._btnCache.push(makeButton(ds, raw, cm ? cm[1] : ""));
      }
    },
    get innerHTML() { return this._html; },
    set textContent(v) { this._text = String(v); },
    get textContent() { return this._text; },
    classList: {
      add: () => {}, remove: () => {}, toggle: () => {}, contains: () => false,
    },
    addEventListener(t, fn) { (this._handlers[t] = this._handlers[t] || []).push(fn); },
    click() { (this._handlers.click || []).forEach(fn => fn({ preventDefault() {}, stopPropagation() {} })); },
    setAttribute() {}, getAttribute() { return null; },
    querySelector(s) { return this.querySelectorAll(s)[0] || null; },
    querySelectorAll(s) {
      if (s === ".wheel") return [makeEl(id + "-wheel")];
      if (s === ".wheel-item") return parseClass(this._html, "wheel-item");
      if (s.startsWith("[data-")) {
        return this._btnCache.filter(b => b._rawAttrs.includes(s.slice(1, -1)));
      }
      if (s.startsWith(".")) {
        const cls = s.slice(1);
        return this._btnCache.filter(b => b._cls.has(cls));
      }
      return [];
    },
    appendChild(c) { return c; },
    get clientHeight() { return 0; },
    scrollTo() {},
  };
  return el;
}

/* ---------- 全局 stub ---------- */
const ids = {};
function $(id) { return ids[id] || (ids[id] = makeEl(id)); }
const winHandlers = {};
const store = {};
const sandbox = {
  console,
  document: {
    readyState: "complete",
    body: { dataset: {} },
    createElement: (t) => makeEl("dyn"),
    getElementById: (id) => $(id),
    querySelector: () => null,
    querySelectorAll: () => [],
    addEventListener() {},
  },
  location: { hash: "#card=grammar", pathname: "/modules/english/index.html" },
  history: {
    replaceState(s, t, url) {
      const i = String(url).indexOf("#");
      sandbox.location.hash = i === -1 ? "" : String(url).slice(i);
    },
  },
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
    removeItem: (k) => { delete store[k]; },
  },
  requestAnimationFrame: (fn) => { fn(); return 1; },
  setTimeout: (...a) => setTimeout(...a),
  clearTimeout: (...a) => clearTimeout(...a),
  setInterval: (...a) => setInterval(...a),
  clearInterval: (...a) => clearInterval(...a),
  innerWidth: 1200,
  navigator: {},
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
sandbox.addEventListener = (t, fn) => { (winHandlers[t] = winHandlers[t] || []).push(fn); };
sandbox.dispatchEvent = (e) => { (winHandlers[e.type] || []).forEach(fn => fn(e)); return true; };
sandbox.CustomEvent = class { constructor(type) { this.type = type; } };
vm.createContext(sandbox);
const run = (f) => vm.runInContext(readFileSync(join(ROOT, f), "utf8"), sandbox, { filename: f });

for (let i = 0; i < 20; i++) run(`modules/english/data/gr${String(i).padStart(2, "0")}.js`);
run("modules/english/data/roots.js");
run("modules/english/data/standalone.js");
run("modules/english/data/phon.js");
run("modules/english/js/grammar.js");
/* 给 ENG_GRAMMAR.open 加调用记录（g-app 在 stub 下的渲染细节不测，引擎渲染由 smoke 覆盖） */
{
  const G = sandbox.window.ENG_GRAMMAR;
  const origOpen = G.open;
  G.openedWith = [];
  G.open = function (id) { G.openedWith.push(id); return origOpen.call(G, id); };
}
run("modules/english/js/english.js");

/* ---------- 断言 ---------- */
let fails = 0;
const ok = (m) => console.log("  [OK] " + m);
const fail = (m) => { console.log("  [FAIL] " + m); fails++; };
const browser = () => $("grammar-browser").innerHTML;
const fireHash = () => sandbox.dispatchEvent({ type: "hashchange" });
function clickDataAttr(el, attr, val) {
  const btns = el.querySelectorAll(`[data-${attr}]`);
  const b = btns.find(x => x.dataset[attr] === val);
  if (!b) { fail(`找不到 [data-${attr}="${val}"] 按钮`); return false; }
  b.click();
  return true;
}

/* 1. 初始 #card=grammar → 章列表 */
let h = browser();
const chCount = (h.match(/data-chapter="/g) || []).length;
chCount === 20 ? ok(`章列表 20 章 (data-chapter x${chCount})`) : fail(`章列表章数=${chCount}，期望 20`);
(h.includes("gr00") && h.includes("导论——句子是什么") && h.includes("4 课"))
  ? ok("章列表含 gr00 导论——句子是什么 · 4 课") : fail("章列表 gr00 条目异常");
(h.includes("gr19") && h.includes("语篇语法与总复习"))
  ? ok("章列表含 gr19 末章") : fail("章列表 gr19 缺失");
$("grammar").hidden === false ? ok("#grammar 显示") : fail("#grammar 未显示");
$("grammar-app").hidden === true ? ok("#grammar-app 隐藏") : fail("#grammar-app 应隐藏");
$("tracks").hidden === true ? ok("子卡选择页隐藏") : fail("tracks 应隐藏");

/* 2. 点 gr05 → 课列表 */
if (clickDataAttr($("grammar-browser"), "chapter", "gr05")) {
  h = browser();
  const lessonCount = (h.match(/data-lesson="/g) || []).length;
  lessonCount === 8 ? ok(`gr05 课列表 8 课`) : fail(`gr05 课数=${lessonCount}，期望 8`);
  (h.includes("gr05.1.1") && h.includes("一般现在时：三单现"))
    ? ok("课列表含 gr05.1.1 一般现在时：三单现") : fail("gr05.1.1 条目异常");
  h.includes("一般现在时与一般过去时") ? ok("课列表按单元分组（单元标题存在）") : fail("单元标题缺失");
  h.includes("data-gram-back") ? ok("课列表有 ← 返回章节列表") : fail("课列表返回按钮缺失");
}

/* 3. 点 gr05.1.1 → 开课 */
if (clickDataAttr($("grammar-browser"), "lesson", "gr05.1.1")) {
  $("grammar").hidden === true ? ok("开课后 #grammar 隐藏") : fail("开课后 #grammar 应隐藏");
  $("grammar-app").hidden === false ? ok("开课后 #grammar-app 显示") : fail("#grammar-app 应显示");
  const G = sandbox.window.ENG_GRAMMAR;
  G.openedWith.includes("gr05.1.1") ? ok("ENG_GRAMMAR.open(gr05.1.1) 被调用") : fail("ENG_GRAMMAR.open 未被调用");
  sandbox.location.hash === "#card=grammar&test=gr05.1.1"
    ? ok("开课写 hash #card=grammar&test=gr05.1.1") : fail("开课 hash=" + sandbox.location.hash);
}

/* 4. 课内 ← 返回（eng-grammar-exit）→ 回到 gr05 课列表 */
sandbox.dispatchEvent(new sandbox.CustomEvent("eng-grammar-exit"));
h = browser();
$("grammar-app").hidden === true ? ok("退出后 #grammar-app 隐藏") : fail("退出后 #grammar-app 应隐藏");
$("grammar").hidden === false ? ok("退出后回到 #grammar 浏览器") : fail("退出后 #grammar 应显示");
(h.includes("data-lesson=") && h.includes("gr05.1.1") && !h.includes("data-chapter="))
  ? ok("退出后回到 gr05 课列表（非章列表）") : fail("退出后位置错误，应为 gr05 课列表");
sandbox.location.hash === "#card=grammar"
  ? ok("退出清掉 test 参数") : fail("退出后 hash=" + sandbox.location.hash);

/* 5. 课列表 ← 返回 → 章列表 */
{
  const back = $("grammar-browser").querySelector("[data-gram-back]");
  back ? (back.click(), ok("点击 ← 返回章节列表")) : fail("找不到返回按钮");
  h = browser();
  (h.match(/data-chapter="/g) || []).length === 20
    ? ok("回到章列表（20 章）") : fail("未回到章列表");
}

/* 6. 章列表 ← 返回子卡选择 → 子卡页 */
{
  const toTracks = $("grammar-browser").querySelector("[data-gram-tracks]");
  toTracks ? (toTracks.click(), ok("点击 ← 返回子卡选择")) : fail("找不到子卡返回按钮");
  $("tracks").hidden === false ? ok("回到子卡选择页") : fail("tracks 应显示");
  $("grammar").hidden === true ? ok("#grammar 隐藏") : fail("#grammar 应隐藏");
  const cards = $("track-grid").innerHTML;
  (cards.includes("讲词根") && cards.includes("125 课") && cards.includes("占位，待红队定稿"))
    ? ok("子卡页语法卡文案为占位（tagline=125 课）") : fail("子卡页文案异常: " + cards.slice(0, 120));
}

/* 6b. 子卡页点语法卡 → 章节浏览器（卡片点击路径） */
{
  const cards = $("track-grid").querySelectorAll(".e-track-card");
  const gcard = cards.find(c => c.dataset.track === "grammar");
  gcard ? (gcard.click(), ok("点击语法子卡")) : fail("找不到语法子卡");
  const n = (browser().match(/data-chapter="/g) || []).length;
  n === 20 ? ok("子卡点击进入后章列表 20 章") : fail("子卡点击后章列表异常 n=" + n);
  sandbox.location.hash === "#card=grammar"
    ? ok("子卡点击后 hash=#card=grammar") : fail("hash=" + sandbox.location.hash);
}
/* 7. 直达路由 #card=grammar&test=gr05.1.1 */
sandbox.location.hash = "#card=grammar&test=gr05.1.1";
fireHash();
const G2 = sandbox.window.ENG_GRAMMAR;
($("grammar-app").hidden === false && G2.openedWith.includes("gr05.1.1") && G2.openedWith.length >= 2)
  ? ok("#card=grammar&test=gr05.1.1 直达开课") : fail("直达路由未开课");

/* 8. 讲词根回归：#r=just */
sandbox.location.hash = "#r=just";
fireHash();
$("app").hidden === false ? ok("#r=just 进入讲词根（拨盘页显示）") : fail("#r=just 未进讲词根");
$("tracks").hidden === true ? ok("#r=just 时子卡页隐藏") : fail("tracks 应隐藏");
($("hero-word").innerHTML.includes("just") || $("hero-word").textContent.includes("just"))
  ? ok("#r=just 拨盘选中 just 词根并渲染") : fail("hero 未渲染 just，内容=" + $("hero-word").innerHTML.slice(0, 80));

/* 9. 无效 test 参数 → 回退浏览器，不开课 */
sandbox.location.hash = "#card=grammar&test=gr99.9.9";
fireHash();
($("grammar").hidden === false && $("grammar-app").hidden === true)
  ? ok("无效 test 参数回退到章节浏览器") : fail("无效 test 参数处理异常");

/* 10. 125 课总数（20 章数据全挂载） */
{
  const CH = sandbox.window.ENG_CH;
  let n = 0; const chIds = Object.keys(CH).filter(k => /^gr\d\d$/.test(k));
  chIds.forEach(k => (CH[k].units || []).forEach(u => { n += (u.lessons || []).length; }));
  (chIds.length === 20 && n === 125)
    ? ok(`ENG_CH 挂载 20 章 / ${n} 课`) : fail(`ENG_CH 章=${chIds.length} 课=${n}`);
}

console.log(fails === 0 ? "\n[PASS] 语法浏览器流程测试全部通过" : `\n[FAIL] ${fails} 项未通过`);
process.exit(fails === 0 ? 0 : 1);
