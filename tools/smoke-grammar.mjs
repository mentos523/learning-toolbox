#!/usr/bin/env node
// 语法引擎烟雾测试：用最小 DOM stub 真实加载 data/gr05.js + js/grammar.js，
// 打开试点课 gr05.1.1，逐页翻页并触发关键交互，断言渲染与判分逻辑。
// 用法：仓库根目录 `node tools/smoke-grammar.mjs`
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- 最小 DOM stub ---------- */
function queryAll(root, sel) {
  const out = [];
  const parts = sel.trim().split(/\s+/);
  function matchSimple(e, s) {
    if (s.startsWith(".")) return e._cls.has(s.slice(1));
    if (s === "input") return e.tag === "input";
    return e.tag === s;
  }
  function walk(e, depth) {
    for (const c of e.children || []) {
      if (parts.length === 1) {
        if (matchSimple(c, parts[0])) out.push(c);
      } else if (parts.length === 2) {
        // 祖先 .a 后代 .b：递归检查
        if (matchSimple(c, parts[1])) {
          let p = e, found = false;
          while (p) { if (matchSimple(p, parts[0])) { found = true; break; } p = p.parent; }
          if (found) out.push(c);
        }
      }
      walk(c, depth + 1);
    }
    // innerHTML 里声明的子元素（只写场景）：解析简单 <tag class="x">
    if (e._html) {
      const re = /<([a-z]+)([^>]*)>/g;
      let m;
      while ((m = re.exec(e._html))) {
        const cls = (m[2].match(/class="([^"]*)"/) || [])[1] || "";
        const pseudo = {
          tag: m[1], _cls: new Set(cls.split(/\s+/).filter(Boolean)),
          _text: "", _html: "", _attrs: {}, value: "",
          set textContent(v) { this._text = String(v); },
          get textContent() { return this._text; },
          addEventListener() {}, click() {},
        };
        if (parts.length === 1 && matchSimple(pseudo, parts[0])) out.push(pseudo);
      }
    }
  }
  walk(root, 0);
  return out;
}
function makeEl(tag) {
  const e = {
    tag, children: [], _cls: new Set(), dataset: {}, style: {},
    _attrs: {}, _text: "", _html: "", parent: null, _handlers: {},
    get offsetWidth() { return 0; },
    classList: null, // below
    set className(v) { e._cls = new Set(String(v).split(/\s+/).filter(Boolean)); },
    get className() { return [...e._cls].join(" "); },
    set innerHTML(v) { e._html = String(v); e.children = []; },
    get innerHTML() { return e._html; },
    set textContent(v) { e._text = String(v); e.children = []; },
    get textContent() { return e._text; },
    appendChild(c) { e.children.push(c); c.parent = e; return c; },
    setAttribute(k, v) { e._attrs[k] = String(v); },
    getAttribute(k) { return e._attrs[k]; },
    addEventListener(t, fn) { (e._handlers[t] = e._handlers[t] || []).push(fn); },
    click() { (e._handlers.click || []).forEach(fn => fn({ stopPropagation() {}, preventDefault() {} })); },
    querySelector(s) { return queryAll(e, s)[0] || null; },
    querySelectorAll(s) { return queryAll(e, s); },
  };
  e.classList = {
    add: (...c) => c.forEach(x => e._cls.add(x)),
    remove: (...c) => c.forEach(x => e._cls.delete(x)),
    toggle: (c, f) => { (f === undefined ? !e._cls.has(c) : f) ? e._cls.add(c) : e._cls.delete(c); },
    contains: (c) => e._cls.has(c),
  };
  return e;
}
const gapp = makeEl("div");
const store = {};
const sandbox = {
  window: {},
  document: {
    createElement: (t) => makeEl(t),
    getElementById: (id) => (id === "g-app" ? gapp : null),
    querySelector: () => null,
    querySelectorAll: () => [],
  },
  localStorage: {
    getItem: (k) => (k in store ? store[k] : null),
    setItem: (k, v) => { store[k] = String(v); },
  },
  navigator: {},
  console,
};
sandbox.window = sandbox;
sandbox.globalThis = sandbox;
vm.createContext(sandbox);

function run(file) {
  vm.runInContext(readFileSync(join(ROOT, file), "utf8"), sandbox, { filename: file });
}
run("modules/english/data/gr05.js");
run("modules/english/js/grammar.js");

let fails = 0;
const ok = (m) => console.log("  [OK] " + m);
const fail = (m) => { console.log("  [FAIL] " + m); fails++; };
const G = sandbox.window.ENG_GRAMMAR;

function serialize(e) {
  let s = "<" + e.tag + (e._cls.size ? ' class="' + [...e._cls].join(" ") + '"' : "") + ">";
  s += e._text || "";
  if (e._html && !e.children.length) s += e._html;
  for (const c of e.children || []) s += serialize(c);
  return s + "</" + e.tag + ">";
}
function findBtn(text) {
  const all = queryAll(gapp, "button");
  return all.find(b => ((b._text || "") + (b._html || "")).includes(text));
}
function html() { return serialize(gapp); }

G.hasLesson("gr05.1.1") ? ok("hasLesson(gr05.1.1)=true") : fail("hasLesson 失败");
G.hasLesson("gr99.9.9") === false ? ok("hasLesson(不存在)=false") : fail("hasLesson 误报");
G.open("gr05.1.1") ? ok("open 成功") : fail("open 失败");

// p1 观察页
let h = html();
h.includes("She likes apples") ? ok("p1 渲染例句") : fail("p1 例句缺失");
h.includes("g-guess") ? ok("p1 Y1 先猜后验") : fail("p1 猜测条缺失");
(h.includes("主语") && h.includes("谓语")) ? ok("p1 分块标注（色块+文字标签）") : fail("p1 分块标注缺失");
// Y1：点选记录
const guessBtn = findBtn("动词多了个");
guessBtn ? (guessBtn.click(), ok("Y1 猜测可点选")) : fail("Y1 选项按钮缺失");

// p2 交互页
findBtn("下一页").click();
h = html();
h.includes("g-signal") ? ok("p2 信号灯组件") : fail("p2 信号灯缺失");
h.includes("g-tag") ? ok("p2 G1 标签池") : fail("p2 标签池缺失");
// G1：点标签→点词块，判分
const tagBtn = findBtn("主语");
const chunkHe = queryAll(gapp, "span").find(s => (s._attrs["aria-label"] || "").includes("词块：He"));
if (tagBtn && chunkHe) {
  tagBtn.click(); chunkHe.click();
  html().includes("✓ 对了") ? ok("G1 点选标注判分正确") : fail("G1 判分反馈缺失");
} else fail("G1 交互元素缺失");
// G1：故意放错一次
const tagAdv = findBtn("状语");
if (tagAdv && chunkHe) {
  // chunkHe 已完成，换一个未完成的词块
  const chunkGoes = queryAll(gapp, "span").find(s => (s._attrs["aria-label"] || "").includes("词块：goes"));
  tagAdv.click(); chunkGoes.click();
  html().includes("✗ 不对") ? ok("G1 放错即时反馈") : fail("G1 放错无反馈");
} else fail("G1 错放测试元素缺失");

// p3 讲解页
findBtn("下一页").click();
h = html();
h.includes("g-idcard") ? ok("p3 G7 规则身份证") : fail("p3 身份证缺失");
h.includes("g-contrast") ? ok("p3 G8 中式对拍") : fail("p3 对拍缺失");
h.includes("拆桥") ? ok("p3 汉语桥+拆桥") : fail("p3 拆桥缺失");
(h.includes("He go to school") && h.includes("Does he likes music"))
  ? ok("p3 两条反例齐全") : fail("p3 反例缺失");
// G7 翻面
const flip = findBtn("翻面");
if (flip) { flip.click(); html().includes("只在一般现在时成立") ? ok("G7 翻面见条件") : fail("G7 翻面异常"); }
else fail("G7 翻面按钮缺失");

// p4 练习页
findBtn("下一页").click();
h = html();
(h.includes("g-q-check") || h.includes("g-q-opts")) ? ok("p4 Y3 练习题渲染") : fail("p4 练习缺失");
// Y3 选择题：点正确答案
const rightOpt = findBtn("He goes to school.");
if (rightOpt) { rightOpt.click(); html().includes("✓ 答对了") ? ok("Y3 选择题判分") : fail("Y3 选择判分缺失"); }
else fail("Y3 选项缺失");
// Y3 选择题：点错误答案 → 再想想
const wrongOpt = findBtn("He go to school.");
if (wrongOpt) {
  wrongOpt.click(); wrongOpt.click();
  const hh = html();
  hh.includes("✗ 不对") ? ok("Y3 错选反馈") : fail("Y3 错选无反馈");
  hh.includes("主语是 he") ? ok("Y3 错2次给提示") : fail("Y3 错2次未给提示");
} else fail("Y3 错误选项缺失");

// 最后一页"完成"按钮存在
findBtn("完成") ? ok("末页'完成'按钮") : fail("末页完成按钮缺失");

console.log(fails === 0 ? "\n[PASS] 语法引擎烟雾测试全部通过" : `\n[FAIL] ${fails} 项未通过`);
process.exit(fails === 0 ? 0 : 1);
