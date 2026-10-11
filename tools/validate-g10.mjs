#!/usr/bin/env node
// 黄队：g10 数据专项校验（仿 tools/validate-g12.mjs 口径）+ 绿队 5 条轻微问题回归检查
// 用法：node tools/validate-g10.mjs
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

/* 1. chapters.js: g10 条目存在，status=ready */
load("modules/math/data/chapters.js");
const g10meta = sandbox.window.MATH_CHAPTERS.find((c) => c.id === "g10");
ok(!!g10meta, "chapters.js 中有 g10 条目");
ok(g10meta && g10meta.file === "data/g10.js", "g10 file 指向 data/g10.js");
ok(g10meta && g10meta.status === "ready", "g10 status=ready");

/* 2. 加载 g10 数据：1 单元 / 7 课 / 25 页 */
load("modules/math/data/g10.js");
const ch = sandbox.window.MATH_CH.g10;
ok(!!ch && ch.id === "g10", "window.MATH_CH.g10 加载成功");
const pages = [];
for (const u of ch.units) for (const l of u.lessons) for (const p of l.pages) pages.push(p);
ok(pages.length === 25, "页总数 = 25（实际 " + pages.length + "）");
ok(ch.units[0].lessons.length === 7, "课数 = 7（实际 " + ch.units[0].lessons.length + "）");

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
ok(chainBad.length === 0, "prev/next 链完整连续 25 页" + (chainBad.length ? " 断裂: " + chainBad.join(",") : ""));

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
const LATEX_ALLOW = new Set(["text", "Rightarrow", "angle", "circ", "cong", "frac", "perp", "triangle"]);
let noTr = [], badLx = [];
for (const p of pages) for (const f of (p.formulas || [])) {
  if (!f.translation) noTr.push(p.id + "#" + f.id);
  const cmds = [...(f.latex.match(/\\([a-zA-Z]+)/g) || [])].map((s) => s.slice(1));
  const unknown = cmds.filter((c) => !LATEX_ALLOW.has(c));
  if (unknown.length) badLx.push(`${p.id}#${f.id}:\\${unknown.join(",\\")}`);
}
ok(noTr.length === 0, "公式 translation 全必填");
ok(badLx.length === 0, "LaTeX 仅用支持子集" + (badLx.length ? " 未知命令: " + badLx.join(";") : ""));

/* 7. 交互类型已在 interactions.js 注册（g10 只用 4 种已实现类型） */
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

/* 9. 绿队 5 条轻微问题回归检查 */
const raw = D("modules/math/data/g10.js");
const page = (id) => pages.find((p) => p.id === id);
// ① 两个图形 vs 轴对称图形：P3 有统一口径句
const p13h = (page("g10-u1-l1-p3").hints || []).join("");
ok(p13h.includes("两个图形") && p13h.includes("成轴对称") && p13h.includes("轴对称图形"),
  "① g10-u1-l1-p3 补“两个图形(成)轴对称 ↔ 轴对称图形”统一口径");
// ② g10.1.6 P3 配图两三角形真全等（第 1 步两个 poly 三边分别相等）
{
  const s1 = page("g10-u1-l6-p3").interaction.params.steps[0].shapes
    .filter((s) => s.t === "poly").map((s) => s.pts);
  const d = (a, b) => Math.hypot(a[0] - b[0], a[1] - b[1]);
  const sides = (pts) => [[0, 1], [1, 2], [2, 0]].map(([i, j]) => d(pts[i], pts[j]).toFixed(6)).sort().join(",");
  ok(s1.length === 2 && sides(s1[0]) === sides(s1[1]),
    "② g10-u1-l6-p3 第 1 步两三角形真全等（三边 " + (s1.length === 2 ? sides(s1[0]) : "?") + "）");
}
// ③ H17 偶函数一半补齐
const p23h = (page("g10-u1-l2-p3").hints || []).join("");
ok(p23h.includes("偶函数"), "③ g10-u1-l2-p3 hints 含“偶函数”（H17 两半齐）");
// ④ “转 6 次 vs 转 2 次回原样”并置对比
const p55h = (page("g10-u1-l5-p5").hints || []).join("");
ok(p55h.includes("转 6 次") && p55h.includes("转 2 次"),
  "④ g10-u1-l5-p5 hints 点明“转 6 次 vs 转 2 次回原样”对比");
// ⑤ “荡秋千”已移除
ok(!raw.includes("荡秋千"), "⑤ g10.js 无“荡秋千”（已换严谨旋转实例）");

console.log("\n" + (fails.length ? "FAIL: " + fails.length + " 项" : "全部通过"));
process.exit(fails.length ? 1 : 0);
