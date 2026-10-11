#!/usr/bin/env node
// 黄队：g09 数据专项校验（仿 tools/validate-g12.mjs 口径）+ 本次 toggle 修改断言
// 用法：node tools/validate-g09.mjs
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const D = (p) => readFileSync(join(ROOT, p), "utf8");
const sandbox = { window: {} };
vm.createContext(sandbox);
const load = (p) => vm.runInContext(D(p), sandbox, { filename: p });

const fails = [];
const ok = (cond, msg) => { console.log((cond ? "  [OK] " : "  [FAIL] ") + msg); if (!cond) fails.push(msg); };
const cjk = (s) => (s.match(/[\u4e00-\u9fff]/g) || []).length;

/* 1. chapters.js: g09 条目存在，status=ready */
load("modules/math/data/chapters.js");
const g09meta = sandbox.window.MATH_CHAPTERS.find((c) => c.id === "g09");
ok(!!g09meta, "chapters.js 中有 g09 条目");
ok(g09meta && g09meta.file === "data/g09.js", "g09 file 指向 data/g09.js");
ok(g09meta && g09meta.status === "ready", "g09 status=ready");

/* 2. 加载 g09 数据：1 单元 / 8 课 / 29 页 */
load("modules/math/data/g09.js");
const ch = sandbox.window.MATH_CH.g09;
ok(!!ch && ch.id === "g09", "window.MATH_CH.g09 加载成功");
const pages = [];
for (const u of ch.units) for (const l of u.lessons) for (const p of l.pages) pages.push(p);
ok(pages.length === 29, "页总数 = 29（实际 " + pages.length + "）");
ok(ch.units[0].lessons.length === 8, "课数 = 8（实际 " + ch.units[0].lessons.length + "）");

/* 3. id 唯一 + prev/next 链 */
const idSet = new Set(pages.map((p) => p.id));
ok(idSet.size === pages.length, "页 id 全局唯一");
let chainBad = [];
pages.forEach((p, i) => {
  const expPrev = i === 0 ? null : pages[i - 1].id;
  const expNext = i === pages.length - 1 ? null : pages[i + 1].id;
  if (p.prev !== expPrev || p.next !== expNext) chainBad.push(p.id);
  if (p.prev && !idSet.has(p.prev)) chainBad.push(p.id + ":prev指向不存在");
  if (p.next && !idSet.has(p.next)) chainBad.push(p.id + ":next指向不存在");
});
ok(chainBad.length === 0, "prev/next 链完整连续 29 页" + (chainBad.length ? " 断裂: " + chainBad.join(",") : ""));

/* 4. 标题/点拨/例子/公式数量约束 */
let titleBad = pages.filter((p) => [...p.title].length > 20).map((p) => p.id);
ok(titleBad.length === 0, "标题 ≤ 20 字" + (titleBad.length ? " 超: " + titleBad.join(",") : ""));
let hintBad = [];
for (const p of pages) for (const h of (p.hints || [])) if ([...h].length > 60) hintBad.push(p.id);
ok(hintBad.length === 0, "hints 每条 ≤ 60 字" + (hintBad.length ? " 超: " + hintBad.join(",") : ""));
let exBad = pages.filter((p) => (p.examples || []).length > 2).map((p) => p.id);
ok(exBad.length === 0, "examples ≤ 2 个/页");
let fmBad = pages.filter((p) => (p.formulas || []).length > 3).map((p) => p.id);
ok(fmBad.length === 0, "formulas ≤ 3 个/页");

/* 5. 文字量：交互页 title+hints CJK ≤ 150；讲解页 ≤ 300 */
let wordBad = [];
for (const p of pages) {
  const n = cjk([p.title, ...(p.hints || [])].join(""));
  const lim = p.pageKind === "explain" ? 300 : 150;
  if (n > lim) wordBad.push(`${p.id}:${n}/${lim}`);
}
ok(wordBad.length === 0, "文字量合规（交互页≤150/讲解页≤300 CJK）" + (wordBad.length ? " 超: " + wordBad.join(";") : ""));

/* 6. 公式：translation 必填；LaTeX 仅用构建器支持的子集 */
// 以 tools/render-mathml.mjs 的真实支持集为准（BINOP + GEOMSYM + FUNCNAMES + 结构命令）
const LATEX_ALLOW = new Set([
  "text", "frac", "sqrt", "sum", "prod", "int", "lim", "left", "right", "quad", "infty",
  "times", "div", "pm", "cdot", "leq", "geq", "neq", "approx", "in", "to", "rightarrow",
  "angle", "triangle", "cong", "Rightarrow", "parallel", "perp", "subset", "circ",
  "log", "ln", "lg", "sin", "cos", "tan", "exp", "max", "min"
]);
let noTr = [], badLx = [];
for (const p of pages) for (const f of (p.formulas || [])) {
  if (!f.translation) noTr.push(p.id + "#" + f.id);
  const cmds = [...(f.latex.match(/\\([a-zA-Z]+)/g) || [])].map((s) => s.slice(1));
  const unknown = cmds.filter((c) => !LATEX_ALLOW.has(c));
  if (unknown.length) badLx.push(`${p.id}#${f.id}:\\${unknown.join(",\\")}`);
}
ok(noTr.length === 0, "公式 translation 全必填");
ok(badLx.length === 0, "LaTeX 仅用支持子集" + (badLx.length ? " 未知命令: " + badLx.join(";") : ""));

/* 7. 交互类型已在 interactions.js 注册（g09 只用 4 种已实现类型） */
sandbox.window.MATH_INTERACTIONS = {
  _m: {},
  register(t, f) { this._m[t] = f; },
  has(t) { return t in this._m; },
};
load("modules/math/js/interactions.js");
const reg = sandbox.window.MATH_INTERACTIONS;
const types = new Set(pages.map((p) => p.interaction && p.interaction.type).filter(Boolean));
ok([...types].every((t) => reg.has(t)), "交互类型全已注册（" + [...types].join("/") + "）");

/* 8. step-play / tap-highlight / compare-toggle / construction-step 参数完备性 */
let spBad = [], thBad = [], ctBad = [], csBad = [];
for (const p of pages) {
  const ix = p.interaction; if (!ix) { spBad.push(p.id + ":缺主交互"); continue; }
  const steps = (ix.params && ix.params.steps) || [];
  if (["step-play", "construction-step"].includes(ix.type)) {
    if (!steps.length) spBad.push(p.id + ":steps空");
    for (const s of steps) if (s.caption && [...s.caption].length > 60) spBad.push(p.id + ":caption超60字");
  }
  if (ix.type === "tap-highlight") {
    const groups = (ix.params && ix.params.groups) || [];
    const items = (ix.params && ix.params.items) || [];
    if (!groups.length || !items.length) thBad.push(p.id + ":groups/items空");
    if (groups.length > 3) thBad.push(p.id + ":groups超3组");
    for (const it of items) {
      const g = typeof it.group === "number" ? groups[it.group] : groups.find((x) => x.name === it.group);
      if (!g) thBad.push(p.id + ":" + it.id + "组引用无效");
    }
  }
  if (ix.type === "compare-toggle") {
    const views = (ix.params && ix.params.views) || [];
    if (views.length !== 2) ctBad.push(p.id + ":views非2");
    for (const v of views) if (!v.label || !v.caption) ctBad.push(p.id + ":view缺label/caption");
  }
}
ok(spBad.length === 0, "step-play/construction-step 参数完备" + (spBad.length ? " 问题: " + spBad.join(";") : ""));
ok(thBad.length === 0, "tap-highlight 参数完备" + (thBad.length ? " 问题: " + thBad.join(";") : ""));
ok(ctBad.length === 0, "compare-toggle 参数完备" + (ctBad.length ? " 问题: " + ctBad.join(";") : ""));

/* 9. 本次修改断言：g09-u1-l4-p5 为 toggle 模式（layout 删除即默认） */
const page = (id) => pages.find((p) => p.id === id);
const p45 = page("g09-u1-l4-p5");
ok(!!p45, "g09-u1-l4-p5 存在");
ok(p45.interaction && p45.interaction.type === "compare-toggle", "g09-u1-l4-p5 主交互=compare-toggle");
const px = p45.interaction.params || {};
ok(px.layout === undefined, "params.layout 已删除（toggle 为默认）");
ok((px.views || []).length === 2, "views 保持 2 个未动");
ok(px.views[0].label === "全等四判定（g04）" && px.views[1].label === "相似三判定（g09）", "views.label 未动");
ok((px.views[0].shapes || []).length === 5 && (px.views[1].shapes || []).length === 5, "shapes 保持 5+5 未动");
ok(px.views[0].caption && px.views[1].caption, "caption 未动");
ok((p45.hints || []).length === 3, "hints 保持 3 条未动");
ok((p45.examples || []).length === 1, "examples 保持 1 条未动");
ok((p45.formulas || []).length === 2, "formulas 保持 2 个未动");
ok(p45.prev === "g09-u1-l4-p4" && p45.next === "g09-u1-l5-p1", "prev/next 未动");

console.log("\n" + (fails.length ? "FAIL: " + fails.length + " 项" : "全部通过"));
process.exit(fails.length ? 1 : 0);
