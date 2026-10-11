#!/usr/bin/env node
/* 蓝队：net-fold 渲染器无头验证（g12.1.3 P1 真实 params）
 * 用法：node tools/test-netfold.mjs
 * 校验：
 *  1. 真实 P1 params 下渲染器无异常执行
 *  2. P=1 时 12 条棱两两重合（正方体闭合，容差 0.8px）
 *  3. 全部视角 × P=0/P=1 下每面可点区域 ≥44px
 *  4. 播放总时长 ≤3000ms；可逆（折叠→展开）可用
 *  5. 读数含 MathML（无裸文本公式）；SVG 无 NaN
 */
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const D = (p) => readFileSync(join(ROOT, p), "utf8");

/* ---------- 极简 DOM shim ---------- */
function makeEl(tag, ns) {
  const e = {
    tag, ns: ns || null, attrs: {}, children: [], parent: null,
    _text: "", _innerHTML: "", style: {}, className: "",
    disabled: false, value: "", type: "", _listeners: {},
    setAttribute(k, v) { this.attrs[k] = String(v); },
    getAttribute(k) { return this.attrs[k]; },
    appendChild(c) { this.children.push(c); c.parent = this; return c; },
    removeChild(c) { const i = this.children.indexOf(c); if (i >= 0) this.children.splice(i, 1); return c; },
    get firstChild() { return this.children[0] || null; },
    addEventListener(t, f) { (this._listeners[t] = this._listeners[t] || []).push(f); },
    dispatchEvent(ev) { (this._listeners[ev.type] || []).forEach((f) => f.call(this, ev)); return true; },
    set innerHTML(v) { this._innerHTML = String(v); this._text = String(v); },
    get innerHTML() { return this._innerHTML; },
    set textContent(v) { this._text = String(v); this._innerHTML = String(v); },
    get textContent() { return this._text; },
  };
  return e;
}
function walk(el, out) {
  out.push(el);
  for (const c of el.children) walk(c, out);
  return out;
}

const rafQueue = [];
const sandbox = {
  window: {},
  document: {
    createElement: (t) => makeEl(t),
    createElementNS: (ns, t) => makeEl(t, ns),
  },
  requestAnimationFrame: (fn) => { rafQueue.push(fn); return rafQueue.length; },
  cancelAnimationFrame: () => { rafQueue.length = 0; },
  setTimeout: (fn) => 0, clearTimeout: () => {},
  console,
};
sandbox.window = sandbox;
sandbox.MATH_INTERACTIONS = {
  _m: {},
  register(t, f) { this._m[t] = f; },
  has(t) { return t in this._m; },
};
vm.createContext(sandbox);
vm.runInContext(D("modules/math/js/geom-primitives.js"), sandbox, { filename: "geom-primitives.js" });
vm.runInContext(D("modules/math/js/interactions.js"), sandbox, { filename: "interactions.js" });
vm.runInContext(D("modules/math/data/g12.js"), sandbox, { filename: "g12.js" });

const fails = [];
const ok = (c, m) => { console.log((c ? "  [OK] " : "  [FAIL] ") + m); if (!c) fails.push(m); };

/* ---------- 取 P1 params ---------- */
const ch = sandbox.window.MATH_CH.g12;
let p1 = null;
for (const u of ch.units) for (const l of u.lessons) for (const p of l.pages)
  if (p.id === "g12-u1-l3-p1") p1 = p;
ok(!!p1, "找到 g12-u1-l3-p1");
const params = p1.interaction.params;
const render = sandbox.window.MATH_INTERACTIONS._m["net-fold"];
ok(typeof render === "function", "net-fold 渲染器已注册");

/* ---------- 渲染 ---------- */
const container = makeEl("div");
let threw = null;
try { render(container, params); } catch (e) { threw = e; }
ok(!threw, "渲染器执行无异常" + (threw ? ": " + threw.stack : ""));
const all = walk(container, []);
const svg = all.find((e) => e.tag === "svg");
ok(!!svg, "生成 SVG 画布");
const btns = all.filter((e) => e.tag === "button").map((b) => b.innerHTML);
ok(btns.includes("▶ 折叠") && btns.includes("↺ 重播") && btns.includes("⇄ 折叠"), "主控按钮齐全: " + btns.join(" "));
ok(["等轴", "正视", "俯视"].every((l) => btns.includes(l)), "视角按钮齐全（等轴/正视/俯视）");
const scrub = all.find((e) => e.tag === "input" && e.className === "ix-range");
ok(!!scrub, "scrubber 进度条存在");

/* ---------- 抽取面多边形 ---------- */
function facePolys() {
  // 面 <g>：首个子 polygon 且 fill-opacity=0.32；编号在 text 子元素
  const res = [];
  for (const g of svg.children) {
    if (g.tag !== "g" || !g.children.length) continue;
    const pg = g.children[0];
    if (pg.tag !== "polygon" || pg.attrs["fill-opacity"] !== "0.32") continue;
    const tx = g.children.find((c) => c.tag === "text");
    const pts = pg.attrs.points.trim().split(" ").map((s) => s.split(",").map(Number));
    res.push({ num: Number(tx.textContent), pts });
  }
  return res.sort((a, b) => a.num - b.num);
}
function setScrub(v) { scrub.value = String(v); scrub.dispatchEvent({ type: "input" }); }
function clickBtn(label) {
  const b = all.find((e) => e.tag === "button" && e.innerHTML === label);
  if (!b) throw new Error("按钮不存在: " + label);
  b.dispatchEvent({ type: "click" });
}
function stepRaf(msTotal, stepMs = 16.7) {
  let t = 0, frames = 0;
  while (rafQueue.length && t < msTotal + 500) {
    t += stepMs; frames++;
    const fns = rafQueue.splice(0);
    fns.forEach((fn) => fn(t));
  }
  return { ms: t, frames, drained: rafQueue.length === 0 };
}
const noNaN = (polys) => polys.every((f) => f.pts.every((p) => p.every((v) => isFinite(v))));

/* ---------- P=0：展开图 ---------- */
setScrub(0);
let polys = facePolys();
ok(polys.length === 6, "P=0 时 6 个面多边形");
ok(noNaN(polys), "P=0 SVG 无 NaN");

/* ---------- 播放：总时长 ≤3000ms ---------- */
clickBtn("▶ 折叠");
const play = stepRaf(10000);
ok(play.drained, "折叠动画正常结束（rAF 排空）");
ok(play.ms <= 3000, `折叠总时长 ≤3000ms（实测约 ${Math.round(play.ms)}ms，${play.frames} 帧）`);
ok(scrub.value === "1000", "播完进度=1000（P=1）");
const readout = all.find((e) => e.className === "ix-geo-readout");
ok(readout.innerHTML.includes("折好了"), "播完读数显示[折好了]");
ok(!/NaN|undefined/.test(svg.children.map((c) => JSON.stringify(c.attrs)).join("")), "P=1 SVG 无 NaN");

/* ---------- P=1：12 条棱重合（正方体闭合） ---------- */
polys = facePolys();
ok(polys.length === 6, "P=1 时 6 个面");
// 面编号→net 顺序：F1..F6；flat 顶点索引用于定位棱端点
const netFaces = params.net;
function vIdx(faceNum, xy) {
  const pts = netFaces[faceNum - 1].pts;
  const i = pts.findIndex((p) => Math.abs(p[0] - xy[0]) < 1e-9 && Math.abs(p[1] - xy[1]) < 1e-9);
  if (i < 0) throw new Error("顶点未找到");
  return i;
}
// 12 条棱：[面A, 边端点A(flat)] ↔ [面B, 边端点B(flat)]（-z 折叠闭合）
const EDGES = [
  [1, [[30,60],[40,60]], 5, [[40,60],[40,70]]],
  [1, [[30,50],[40,50]], 6, [[40,50],[40,40]]],
  [1, [[30,50],[30,60]], 4, [[70,50],[70,60]]],
  [3, [[50,60],[60,60]], 5, [[50,60],[50,70]]],
  [3, [[50,50],[60,50]], 6, [[50,50],[50,40]]],
  [3, [[60,50],[60,60]], 4, [[60,50],[60,60]]],
  [5, [[40,70],[50,70]], 4, [[60,60],[70,60]]],
  [6, [[40,40],[50,40]], 4, [[60,50],[70,50]]],
  [2, [[40,50],[40,60]], 1, [[40,50],[40,60]]],
  [2, [[50,50],[50,60]], 3, [[50,50],[50,60]]],
  [2, [[40,60],[50,60]], 5, [[40,60],[50,60]]],
  [2, [[40,50],[50,50]], 6, [[40,50],[50,50]]],
];
let edgeBad = 0;
for (const [fa, ea, fb, eb] of EDGES) {
  const pa = polys[fa - 1].pts, pb = polys[fb - 1].pts;
  const a1 = pa[vIdx(fa, ea[0])], a2 = pa[vIdx(fa, ea[1])];
  const b1 = pb[vIdx(fb, eb[0])], b2 = pb[vIdx(fb, eb[1])];
  const d1 = Math.hypot(a1[0] - b1[0], a1[1] - b1[1]) + Math.hypot(a2[0] - b2[0], a2[1] - b2[1]);
  const d2 = Math.hypot(a1[0] - b2[0], a1[1] - b2[1]) + Math.hypot(a2[0] - b1[0], a2[1] - b1[1]);
  if (Math.min(d1, d2) > 0.8) { edgeBad++; console.log(`    棱未重合: F${fa}-F${fb} 偏差 ${Math.min(d1, d2).toFixed(2)}px`); }
}
ok(edgeBad === 0, "P=1 时 12 条棱两两重合（正方体闭合，容差 0.8px）");

/* ---------- 可点区域 ≥44px：全视角 × P=0/P=1 ---------- */
function minTouch(polysArr) {
  let m = 1e9;
  for (const f of polysArr) {
    const xs = f.pts.map((p) => p[0]), ys = f.pts.map((p) => p[1]);
    m = Math.min(m, Math.max(Math.max(...xs) - Math.min(...xs), Math.max(...ys) - Math.min(...ys)));
  }
  return m;
}
let touchBad = [];
for (const vl of ["等轴", "正视", "俯视"]) {
  clickBtn(vl);
  for (const [pv, name] of [[0, "展开"], [1000, "折叠"]]) {
    setScrub(pv);
    const t = minTouch(facePolys());
    if (t < 44) touchBad.push(`${vl}/${name}:${t.toFixed(1)}px`);
  }
}
ok(touchBad.length === 0, "全视角×展开/折叠态 每面可点区域 ≥44px" + (touchBad.length ? " 不足: " + touchBad.join(";") : ""));

/* ---------- 中途读数：MathML ---------- */
setScrub(100); // P=0.1，第 1 步进行中
ok(readout.innerHTML.includes("<math") && readout.innerHTML.includes("°"),
  "折叠中读数含 MathML 角度（无裸文本公式）");
ok(readout.innerHTML.includes("第 1 步"), "折叠中读数显示当前步骤");

/* ---------- 可逆：折叠→展开 ---------- */
setScrub(1000);
clickBtn("⇄ 展开");
const rev = stepRaf(10000);
ok(rev.drained && scrub.value === "0", "⇄ 展开可逆播回 P=0");
ok(readout.innerHTML.includes("展开图"), "展开后读数恢复");

/* ---------- 重播 ---------- */
clickBtn("↺ 重播");
const rp = stepRaf(10000);
ok(rp.drained && scrub.value === "1000", "↺ 重播可用");

/* ---------- 错误 params 保护 ---------- */
function expectErr(p, label) {
  const c = makeEl("div");
  try { render(c, p); } catch (e) { fails.push(label + " 抛异常: " + e.message); return; }
  const kids = walk(c, []);
  const hasErr = kids.some((e) => e.className === "ix-stub" && /参数错误/.test(e.innerHTML));
  ok(hasErr, label);
}
expectErr({ net: [], foldSequence: params.foldSequence, views: params.views }, "net 空 → 参数错误提示");
expectErr({ net: params.net, foldSequence: [], views: params.views }, "foldSequence 空 → 参数错误提示");
expectErr({ net: params.net, foldSequence: params.foldSequence, views: ["iso"] }, "views 不足 3 个 → 参数错误提示");
expectErr({
  net: params.net,
  foldSequence: params.foldSequence.map((s, i) => i === 0 ? { ...s, edge: [[0, 0], [1, 1]] } : s),
  views: params.views,
}, "edge 非公共边 → 参数错误提示");

console.log("\n" + (fails.length ? "FAIL: " + fails.length + " 项" : "全部通过"));
process.exit(fails.length ? 1 : 0);
