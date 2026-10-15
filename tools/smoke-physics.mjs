#!/usr/bin/env node
// 物理引擎烟雾测试：用最小 DOM stub 真实加载 data/chapters.js +
// data/p04.js + js/physics.js，打开试点课 p04.1.2，逐页翻页并触发
// 关键交互，断言渲染与判分逻辑。
// 用法：仓库根目录 `node tools/smoke-physics.mjs`
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
  function walk(e) {
    for (const c of e.children || []) {
      if (parts.length === 1) {
        if (matchSimple(c, parts[0])) out.push(c);
      } else if (parts.length === 2) {
        if (matchSimple(c, parts[1])) {
          let p = e, found = false;
          while (p) { if (matchSimple(p, parts[0])) { found = true; break; } p = p.parent; }
          if (found) out.push(c);
        }
      }
      walk(c);
    }
  }
  walk(root);
  return out;
}
/* 迷你 HTML 解析器：把 innerHTML 字符串建成真实子元素树
 *（浏览器原生行为；白队 smoke 需要它来忠实断言嵌套渲染） */
const VOID_TAGS = new Set(["input", "br", "img", "hr", "mspace", "wbr"]);
function parseAttrs(s) {
  const attrs = {};
  const re = /([a-zA-Z][a-zA-Z0-9-]*)(?:="([^"]*)")?/g;
  let m;
  while ((m = re.exec(s))) attrs[m[1]] = m[2] === undefined ? "" : m[2];
  return attrs;
}
function parseHTML(html, parent) {
  const re = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)([^>]*?)(\/?)>|([^<]+)/g;
  const stack = [parent];
  let m;
  while ((m = re.exec(html))) {
    if (m[5] !== undefined) {
      const t = m[5].replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&amp;/g, "&");
      if (t.trim()) stack[stack.length - 1]._text += t;
      continue;
    }
    const closing = m[1] === "/", tag = m[2].toLowerCase(), selfClose = m[4] === "/";
    if (closing) {
      while (stack.length > 1 && stack[stack.length - 1].tag !== tag) stack.pop();
      if (stack.length > 1) stack.pop();
      continue;
    }
    const child = makeEl(tag);
    const attrs = parseAttrs(m[3]);
    for (const k in attrs) child.setAttribute(k, attrs[k]);
    stack[stack.length - 1].appendChild(child);
    if (!selfClose && !VOID_TAGS.has(tag)) stack.push(child);
  }
}
function makeEl(tag) {
  const e = {
    tag, children: [], _cls: new Set(), dataset: {}, style: {},
    _attrs: {}, _text: "", _html: "", parent: null, _handlers: {},
    hidden: false, disabled: false, value: "",
    get offsetWidth() { return 0; },
    classList: null,
    set className(v) { e._cls = new Set(String(v).split(/\s+/).filter(Boolean)); },
    get className() { return [...e._cls].join(" "); },
    set innerHTML(v) {
      e._html = String(v); e.children = []; e._text = "";
      try { parseHTML(e._html, e); } catch (err) {}
    },
    get innerHTML() { return e._html; },
    set textContent(v) { e._text = String(v); e.children = []; },
    get textContent() { return e._text; },
    appendChild(c) { e.children.push(c); c.parent = e; return c; },
    setAttribute(k, v) {
      e._attrs[k] = String(v);
      if (k === "class") e._cls = new Set(String(v).split(/\s+/).filter(Boolean));
    },
    getAttribute(k) { return e._attrs[k]; },
    addEventListener(t, fn) { (e._handlers[t] = e._handlers[t] || []).push(fn); },
    click() { (e._handlers.click || []).forEach(fn => fn({ stopPropagation() {}, preventDefault() {} })); },
    fire(t) { (e._handlers[t] || []).forEach(fn => fn({})); },
    getBoundingClientRect() { return { width: 0, height: 0 }; },
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
function makeSandbox(hash) {
  const appRoot = makeEl("div");
  const browseRoot = makeEl("div");
  const body = makeEl("body");
  const store = {};
  const sandbox = {
    window: {},
    document: {
      createElement: (t) => makeEl(t),
      createElementNS: (ns, t) => makeEl(t),
      getElementById: (id) => (id === "phy-app" ? appRoot : id === "phy-browser" ? browseRoot : null),
      querySelector: () => null,
      querySelectorAll: () => [],
      body,
      readyState: "complete",
    },
    location: { hash, pathname: "/modules/physics/index.html", search: "" },
    history: { replaceState() {} },
    localStorage: {
      getItem: (k) => (k in store ? store[k] : null),
      setItem: (k, v) => { store[k] = String(v); },
    },
    navigator: {},
    console,
    __store: store,
  };
  sandbox.window = sandbox;
  sandbox.globalThis = sandbox;
  vm.createContext(sandbox);
  const run = (f) => vm.runInContext(readFileSync(join(ROOT, f), "utf8"), sandbox, { filename: f });
  run("modules/physics/data/chapters.js");
  run("modules/physics/data/p04.js");
  run("modules/physics/js/physics.js");
  return { sandbox, appRoot, browseRoot };
}
function serialize(e) {
  let s = "<" + e.tag + (e._cls.size ? ' class="' + [...e._cls].join(" ") + '"' : "") + ">";
  s += e._text || "";
  if (e._html && !e.children.length) s += e._html;
  for (const c of e.children || []) s += serialize(c);
  return s + "</" + e.tag + ">";
}

let fails = 0;
const ok = (m) => console.log("  [OK] " + m);
const fail = (m) => { console.log("  [FAIL] " + m); fails++; };

/* ---------- 第一轮：MathML 不可用 → 降级路径 ---------- */
{
  const { sandbox, appRoot } = makeSandbox("#phy=p04.1.2");
  const P = sandbox.window.PHY;
  const html = () => serialize(appRoot);
  const findBtn = (text) => queryAll(appRoot, "button")
    .find(b => ((b._text || "") + (b._html || "")).includes(text));

  P.hasLesson("p04.1.2") ? ok("hasLesson(p04.1.2)=true") : fail("hasLesson 失败");
  P.hasLesson("p99.9.9") === false ? ok("hasLesson(不存在)=false") : fail("hasLesson 误报");
  P.open("p04.1.2") ? ok("open 成功（深链冷启动同路径）") : fail("open 失败");

  // p1：mv-lab
  let h = html();
  h.includes("phy-tabs") ? ok("p1 材料三选（铝/铁/水）") : fail("p1 材料 tabs 缺失");
  h.includes("phy-plot") ? ok("p1 m–V 坐标图") : fail("p1 坐标图缺失");
  h.includes('type="range"') || queryAll(appRoot, "input").length > 0 ? ok("p1 质量滑块") : fail("p1 滑块缺失");
  h.includes("没变的是") ? ok("p1 读数徽章“没变的是”") : fail("p1 徽章 invariant 缺失");
  h.includes("phy-formula-fallback") ? ok("p1 徽章 MathML 降级为人话文本") : fail("p1 降级路径异常");
  // 切换铁块：ρ 徽章从 2.7 → 7.9，invariant 不变
  const ironBtn = findBtn("铁块");
  ironBtn ? (ironBtn.click(), ok("p1 材料切换可点")) : fail("p1 铁块按钮缺失");
  h = html();
  h.includes("7.9") ? ok("p1 切铁块后徽章 ρ=7.9") : fail("p1 徽章读数未更新");
  // 拖滑块：m=800 → V=800/7.9≈101.3，点坐标更新
  const slider = queryAll(appRoot, "input")[0];
  if (slider) {
    slider.value = "800"; slider.fire("input");
    const dot = queryAll(appRoot, "circle")[0];
    const cx = dot ? parseFloat(dot.getAttribute("cx")) : NaN;
    (cx > 10 && cx < 25) ? ok(`p1 滑块联动（V≈101.3 → cx=${cx.toFixed(1)}）`) : fail("p1 滑块联动异常 cx=" + cx);
  } else fail("p1 滑块元素缺失");
  // 铝线斜率标签
  html().includes("ρ=2.7") ? ok("p1 斜率标签 ρ=2.7（Y4 直线段精确值）") : fail("p1 斜率标签缺失");

  // p2：slope-compare
  findBtn("下一页").click();
  h = html();
  (queryAll(appRoot, "button").filter(b => b._cls.has("phy-slope-row")).length === 3)
    ? ok("p2 斜率直观版三行（排名徽章+色条+ρ）") : fail("p2 直观版缺失");
  const ironRow = findBtn("铁");
  if (ironRow) {
    ironRow.click();
    html().includes("密度最大") ? ok("p2 点铁行 → “密度最大”") : fail("p2 点选反馈缺失");
  } else fail("p2 铁行缺失");
  html().includes("正比例函数") ? ok("p2 不讲定义、只注代数 6.2（方案 B）") : fail("p2 数学呼应缺失");

  // p3：formula-id
  findBtn("下一页").click();
  h = html();
  h.includes("公式身份证") ? ok("p3 Y3 公式身份证卡片") : fail("p3 身份证缺失");
  (h.includes("成立条件") && h.includes("什么时候失效") && h.includes("量纲检查"))
    ? ok("p3 身份证四行齐全") : fail("p3 身份证行缺失");
  h.includes("kg/m³") ? ok("p3 SI 单位 kg/m³") : fail("p3 单位缺失");
  h.includes("等号不代表因果") ? ok("p3 口诀“等号不代表因果”") : fail("p3 口诀缺失");
  h.includes("别搞混") ? ok("p3 误区警示") : fail("p3 误区缺失");
  h.includes("p08.2.2") ? ok("p3 认旧友 p08.2.2（R=U/I 预演）") : fail("p3 认旧友缺失");

  // p4：quiz
  findBtn("下一页").click();
  h = html();
  (h.match(/phy-q-stem/g) || []).length >= 5 ? ok("p4 5 道题渲染") : fail("p4 题数不足");
  const q1right = findBtn("不变");
  if (q1right) {
    q1right.click();
    html().includes("✓ 答对了") ? ok("p4 选择题判分（切半密度不变）") : fail("p4 选择判分缺失");
  } else fail("p4 选项“不变”缺失");
  const q2wrong = findBtn("密度与质量成正比");
  if (q2wrong) {
    q2wrong.click(); q2wrong.click();
    const hh = html();
    (hh.includes("✗ 不对") && hh.includes("等号不代表因果"))
      ? ok("p4 错2次给提示（比值定义陷阱）") : fail("p4 错选提示缺失");
  } else fail("p4 陷阱选项缺失");
  // 填空：逐题断言各自反馈（白队 2026-10-15：旧断言用全局正则数
  // "✓ 答对了|单位正确" 命中数，单个正确反馈即含两处命中，Q3 canonical
  // 被判错时仍误报通过。现逐题取其 .phy-q-fb，任一题判错即红；
  // 若判分逻辑回退为 (q.accept || [q.answer])，kg/m³（canonical）必红。）
  const inputs = queryAll(appRoot, "input").filter(i => i.getAttribute("type") === "text");
  const checks = queryAll(appRoot, "button").filter(b => (b._text || "").includes("检查"));
  const fbOf = (inputEl) => {
    let p = inputEl.parent;
    while (p && !(p._cls && p._cls.has("phy-q"))) p = p.parent;
    return p ? (queryAll(p, ".phy-q-fb")[0] || null) : null;
  };
  if (inputs.length >= 2 && checks.length >= 2) {
    inputs[0].value = "kg/m³"; checks[0].click();   // Q3：canonical 答案
    inputs[1].value = "g/cm3"; checks[1].click();   // Q4：accept 变体
    const fb1 = serialize(fbOf(inputs[0]) || makeEl("div"));
    const fb2 = serialize(fbOf(inputs[1]) || makeEl("div"));
    const ok1 = fb1.includes("✓ 答对了"), ok2 = fb2.includes("✓ 答对了");
    (ok1 && ok2)
      ? ok("p4 填空判分（Q3 canonical kg/m³ ✓，Q4 变体 g/cm3 ✓，逐题反馈）")
      : fail(`p4 填空判分缺失（Q3反馈${ok1 ? "✓" : "✗"}，Q4反馈${ok2 ? "✓" : "✗"}）`);
  } else fail("p4 填空题元素缺失");
  // 完成 → 进度落盘 ltb-phy-*
  findBtn("完成") ? ok("末页“完成 ✓”按钮") : fail("末页完成按钮缺失");
  findBtn("完成").click();
  const prog = JSON.parse(sandbox.__store["ltb-phy-progress"] || "{}");
  prog["p04.1.2"] && prog["p04.1.2"].done ? ok("完成落盘 ltb-phy-progress") : fail("进度未落盘");
  // localStorage 键命名空间隔离
  const keys = Object.keys(sandbox.__store);
  keys.every(k => k.startsWith("ltb-phy-")) ? ok("localStorage 仅 ltb-phy-*（零触碰 ltb-en-/ltb-math-）") : fail("键污染：" + keys);
}

/* ---------- 第二轮：MathML 可用 → 原生渲染 ---------- */
{
  const { sandbox, appRoot } = makeSandbox("");
  sandbox.window.MathMLCheck = { supported: true, reason: "" };
  const P = sandbox.window.PHY;
  P.open("p04.1.2");
  const findBtn = (text) => queryAll(appRoot, "button")
    .find(b => ((b._text || "") + (b._html || "")).includes(text));
  findBtn("下一页").click(); // p2
  findBtn("下一页").click(); // p3
  const h = serialize(appRoot);
  h.includes("<math>") ? ok("MathML 可用时原生渲染 <math>") : fail("MathML 原生渲染缺失");
  !h.includes("phy-formula-fallback") ? ok("MathML 可用时无降级文本") : fail("不应降级却降级了");
}

/* ---------- 第三轮：无深链 → 章节浏览器 ---------- */
{
  const { sandbox, browseRoot } = makeSandbox("");
  const html = serialize(browseRoot);
  (html.includes("p04") && html.includes("质量与密度"))
    ? ok("浏览器显示 p04（仅已就位章节）") : fail("浏览器章节缺失");
  !html.includes("p05") ? ok("未就位章节不显示（p05）") : fail("未就位章节泄露");
}

console.log(fails === 0 ? "\n[PASS] 物理引擎烟雾测试全部通过" : `\n[FAIL] ${fails} 项未通过`);
process.exit(fails === 0 ? 0 : 1);
