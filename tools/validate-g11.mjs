#!/usr/bin/env node
// 蓝队：g11 面积与体积专项校验（仿 tools/validate-g13.mjs 口径）
// 用法：node tools/validate-g11.mjs
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

/* 1. chapters.js: g11 条目存在，status=ready */
load("modules/math/data/chapters.js");
const g11meta = sandbox.window.MATH_CHAPTERS.find((c) => c.id === "g11");
ok(!!g11meta, "chapters.js 中有 g11 条目");
ok(g11meta && g11meta.file === "data/g11.js", "g11 file 指向 data/g11.js");
ok(g11meta && g11meta.status === "ready", "g11 status=ready（渲染接入）");
ok(g11meta && g11meta.title === "面积与体积", "g11 标题=面积与体积");

/* 2. 交互注册表：g11 使用的五种类型全部已注册 */
sandbox.window.MATH_INTERACTIONS = {
  _m: {},
  register(t, f) { this._m[t] = f; },
  has(t) { return t in this._m; },
};
load("modules/math/js/interactions.js");
const reg = sandbox.window.MATH_INTERACTIONS;
for (const t of ["step-play", "cut-reassemble", "compare-toggle", "shape-area", "tap-highlight"]) {
  ok(reg.has && reg.has(t), "交互类型已注册: " + t);
}

/* 3. 加载 g11 数据：1 单元 / 10 课 / 35 页 / 44 公式 */
load("modules/math/data/g11.js");
const ch = sandbox.window.MATH_CH.g11;
ok(!!ch && ch.id === "g11", "window.MATH_CH.g11 加载成功");

const pages = [];
for (const u of ch.units) for (const l of u.lessons) for (const p of l.pages) pages.push(p);
ok(ch.units.length === 1, "单元数 = 1");
ok(pages.length === 35, "页总数 = 35（实际 " + pages.length + "）");
ok(ch.units[0].lessons.length === 10, "课数 = 10（实际 " + ch.units[0].lessons.length + "）");
let nForm = 0; for (const p of pages) nForm += (p.formulas || []).length;
ok(nForm === 44, "公式总数 = 44（实际 " + nForm + "）");

/* 4. id 唯一 + prev/next 链 */
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
ok(chainBad.length === 0, "prev/next 链完整连续 35 页" + (chainBad.length ? " 断裂: " + chainBad.join(",") : ""));

/* 5. 标题/点拨/例子/公式数量约束 */
let titleBad = pages.filter((p) => [...p.title].length > 20).map((p) => p.id);
ok(titleBad.length === 0, "标题 ≤ 20 字" + (titleBad.length ? " 超: " + titleBad.join(",") : ""));
let hintBad = [];
for (const p of pages) for (const h of (p.hints || [])) if ([...h].length > 60) hintBad.push(p.id);
ok(hintBad.length === 0, "hints 每条 ≤ 60 字" + (hintBad.length ? " 超: " + hintBad.join(",") : ""));
let exBad = pages.filter((p) => (p.examples || []).length > 2).map((p) => p.id);
ok(exBad.length === 0, "examples ≤ 2 个/页");
let fmBad = pages.filter((p) => (p.formulas || []).length > 3).map((p) => p.id);
ok(fmBad.length === 0, "formulas ≤ 3 个/页");

/* 6. 文字量：交互页 title+hints CJK ≤ 150；讲解页 ≤ 300 */
let wordBad = [];
for (const p of pages) {
  const n = cjk([p.title, ...(p.hints || [])].join(""));
  const lim = p.pageKind === "explain" ? 300 : 150;
  if (n > lim) wordBad.push(`${p.id}:${n}/${lim}`);
}
ok(wordBad.length === 0, "文字量合规（交互页≤150/讲解页≤300 CJK）" + (wordBad.length ? " 超: " + wordBad.join(";") : ""));

/* 7. 公式：translation 必填 */
let noTr = [];
for (const p of pages) for (const f of (p.formulas || [])) {
  if (!f.translation) noTr.push(p.id + "#" + f.id);
}
ok(noTr.length === 0, "公式 translation 全必填");

/* 8. 交互类型：仅用五种已注册类型；参数 schema 完备 */
const ALLOWED = ["step-play", "cut-reassemble", "compare-toggle", "shape-area", "tap-highlight"];
let typeBad = pages.filter((p) => p.interaction && !ALLOWED.includes(p.interaction.type)).map((p) => p.id);
ok(typeBad.length === 0, "交互类型仅用 step-play / cut-reassemble / compare-toggle / shape-area / tap-highlight" +
  (typeBad.length ? " 越界: " + typeBad.join(",") : ""));
let spBad = [], crBad = [], ctBad = [], saBad = [], thBad = [];
const typeCount = {};
for (const p of pages) {
  const ix = p.interaction; if (!ix) { spBad.push(p.id + ":缺主交互"); continue; }
  typeCount[ix.type] = (typeCount[ix.type] || 0) + 1;
  const pm = ix.params || {};
  if (ix.type === "step-play") {
    const steps = pm.steps || [];
    if (!steps.length) spBad.push(p.id + ":steps空");
    for (const s of steps) if (s.caption && [...s.caption].length > 60) spBad.push(p.id + ":caption超60字");
  }
  if (ix.type === "cut-reassemble") {
    const pieces = pm.pieces || [], targets = pm.targets || [];
    if (!pieces.length) crBad.push(p.id + ":pieces空");
    if (!targets.length) crBad.push(p.id + ":targets空");
    for (const pc of pieces) if (!pc.id || !pc.pts || !pc.pts.length) crBad.push(p.id + ":piece缺id/pts");
    for (const t of targets) if (!t.id || !t.pts || !t.pts.length) crBad.push(p.id + ":target缺id/pts");
  }
  if (ix.type === "compare-toggle") {
    const views = pm.views || [];
    if (views.length !== 2) ctBad.push(p.id + ":views不是2个（实际" + views.length + "）");
    for (const v of views) if (!v.label) ctBad.push(p.id + ":view缺label");
  }
  if (ix.type === "shape-area") {
    const { min, max, step } = pm;
    if (!(min !== undefined && max !== undefined && step !== undefined && 0 <= min && min < max && step > 0))
      saBad.push(p.id + ":min/max/step非法（" + min + "/" + max + "/" + step + "）");
  }
  if (ix.type === "tap-highlight") {
    if (!pm.items || !pm.items.length) thBad.push(p.id + ":items空");
    if (!pm.groups || !pm.groups.length) thBad.push(p.id + ":groups空");
  }
}
ok(spBad.length === 0, "step-play 参数完备（steps 非空、caption≤60字）" + (spBad.length ? " 问题: " + spBad.join(";") : ""));
ok(crBad.length === 0, "cut-reassemble 参数完备（pieces/targets 非空、id/pts 齐全）" + (crBad.length ? " 问题: " + crBad.join(";") : ""));
ok(ctBad.length === 0, "compare-toggle 参数完备（views 恰好 2 个、label 齐全）" + (ctBad.length ? " 问题: " + ctBad.join(";") : ""));
ok(saBad.length === 0, "shape-area 参数完备（min/max/step 合法）" + (saBad.length ? " 问题: " + saBad.join(";") : ""));
ok(thBad.length === 0, "tap-highlight 参数完备（items/groups 非空）" + (thBad.length ? " 问题: " + thBad.join(";") : ""));
console.log("  (交互类型分布: " + Object.entries(typeCount).map(([t, n]) => `${t}×${n}`).join("、") + ")");

/* 9. 派生公式 MathML：44 键全覆盖；XML 良好；无裸文本 */
load("modules/math/data/g11.formulas.js");
const MML = sandbox.window.MATH_MML || {};
const keys = Object.keys(MML);
ok(keys.length === 44, "MATH_MML 键数 = 44（实际 " + keys.length + "）");
let miss = [];
for (const p of pages) for (const f of (p.formulas || [])) {
  const k = p.id + "#" + f.id;
  if (!MML[k]) miss.push(k);
}
ok(miss.length === 0, "每页公式都有 MathML 派生（page#f 全命中）" + (miss.length ? " 缺: " + miss.join(",") : ""));

let xmlBad = [], bareBad = [], bsBad = [];
for (const [k, v] of Object.entries(MML)) {
  const opens = [...v.matchAll(/<(?!\/)(mrow|math|mtext|mi|mn|mo|msup|msub|mfrac|msqrt|mover|munder|mtable|mtr|mtd)(?=[\s>])/g)].map((m) => m[1]);
  const closes = [...v.matchAll(/<\/(mrow|math|mtext|mi|mn|mo|msup|msub|mfrac|msqrt|mover|munder|mtable|mtr|mtd)>/g)].map((m) => m[1]);
  const count = (a) => a.reduce((o, t) => (o[t] = (o[t] || 0) + 1, o), {});
  const co = count(opens), cc = count(closes);
  const all = new Set([...Object.keys(co), ...Object.keys(cc)]);
  const paired = [...all].every((t) => co[t] === cc[t]);
  if (!paired) { xmlBad.push(k); continue; }
  if (/\\[a-zA-Z]/.test(v)) { bsBad.push(k); continue; }
  let tmp = v.replace(/<mtext[^>]*>[\s\S]*?<\/mtext>/g, "")
             .replace(/<mi[^>]*>[\s\S]*?<\/mi>/g, "")
             .replace(/<mn[^>]*>[\s\S]*?<\/mn>/g, "")
             .replace(/<mo[^>]*>[\s\S]*?<\/mo>/g, "");
  tmp = tmp.replace(/<[^>]+>/g, "").replace(/&(amp|lt|gt|quot);/g, "").trim();
  if (tmp) bareBad.push(k + ":「" + tmp.slice(0, 20) + "」");
}
ok(xmlBad.length === 0, "MathML 标签全部配对" + (xmlBad.length ? " 坏: " + xmlBad.join(",") : ""));
ok(bsBad.length === 0, "MathML 无残留 LaTeX 反斜杠" + (bsBad.length ? " 坏: " + bsBad.join(",") : ""));
ok(bareBad.length === 0, "MathML 无裸文本（文本都在 mtext/mi/mn/mo 内）" + (bareBad.length ? " 坏: " + bareBad.join(",") : ""));

console.log("\n" + (fails.length ? "FAIL: " + fails.length + " 项" : "全部通过"));
process.exit(fails.length ? 1 : 0);
