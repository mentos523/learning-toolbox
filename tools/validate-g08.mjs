#!/usr/bin/env node
// 黄队：g08 数据生产校验（仿蓝队 tools/validate-g05.mjs 口径）
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
const warns = [];
const ok = (cond, msg) => { console.log((cond ? "  [OK] " : "  [FAIL] ") + msg); if (!cond) fails.push(msg); };
const warn = (cond, msg) => { if (!cond) { console.log("  [WARN] " + msg); warns.push(msg); } };

/* 1. chapters.js: g08 ready */
load("modules/math/data/chapters.js");
const g08meta = sandbox.window.MATH_CHAPTERS.find((c) => c.id === "g08");
ok(g08meta && g08meta.status === "ready", "chapters.js 中 g08 status=ready");

/* 2. 加载 g08 数据 + 公式 */
load("modules/math/data/g08.js");
load("modules/math/data/g08.formulas.js");
const ch = sandbox.window.MATH_CH.g08;
const MML = sandbox.window.MATH_MML;
ok(ch && ch.id === "g08", "window.MATH_CH.g08 存在");

const pages = [];
const perLesson = [];
for (const u of ch.units) for (const l of u.lessons) {
  perLesson.push(`${l.id}:${l.pages.length}`);
  for (const p of l.pages) pages.push(p);
}
ok(pages.length === 23, `页总数 = 23（实际 ${pages.length}）`);
ok(perLesson.join(" ") === "g08-u1-l1:4 g08-u1-l2:4 g08-u1-l3:4 g08-u1-l4:5 g08-u1-l5:4 g08-u1-l6:2",
  "分课页数 = 4/4/4/5/4/2（白队评审拆分方案）");

/* 3. 公式覆盖 + MathML 无裸文本 */
const srcFormulas = [];
for (const p of pages) for (const f of (p.formulas || [])) srcFormulas.push(p.id + "#" + f.id);
const mmlKeys = Object.keys(MML).filter((k) => k.startsWith("g08-"));
const missing = srcFormulas.filter((k) => !MML[k]);
const extra = mmlKeys.filter((k) => !srcFormulas.includes(k));
ok(missing.length === 0, "公式 MATH_MML 全覆盖" + (missing.length ? " 缺失: " + missing.join(",") : ""));
ok(extra.length === 0, "无多余 MATH_MML 条目" + (extra.length ? " 多余: " + extra.join(",") : ""));

let badMml = [];
for (const [k, v] of Object.entries(MML)) {
  if (!k.startsWith("g08-")) continue;
  if (/\\/.test(v)) badMml.push(k + ":含反斜杠");
  if (!/^<math[^>]*>.*<\/math>$/.test(v)) badMml.push(k + ":非完整<math>包裹");
}
ok(badMml.length === 0, `${srcFormulas.length} 公式 MathML 无裸文本/无残留 LaTeX`);

let noTr = [];
for (const p of pages) for (const f of (p.formulas || [])) if (!f.translation) noTr.push(p.id + "#" + f.id);
ok(noTr.length === 0, "公式 translation 全必填");
let over3 = pages.filter((p) => (p.formulas || []).length > 3).map((p) => p.id);
ok(over3.length === 0, "每页公式 ≤ 3 个");

/* 4. prev/next 导航链 + id 唯一 */
const idSet = new Set(pages.map((p) => p.id));
let chainBad = [];
pages.forEach((p, i) => {
  const expPrev = i === 0 ? null : pages[i - 1].id;
  const expNext = i === pages.length - 1 ? null : pages[i + 1].id;
  if (p.prev !== expPrev || p.next !== expNext) chainBad.push(p.id);
  if (p.prev && !idSet.has(p.prev)) chainBad.push(p.id + ":prev指向不存在");
  if (p.next && !idSet.has(p.next)) chainBad.push(p.id + ":next指向不存在");
});
const dupIds = pages.map((p) => p.id).filter((id, i, a) => a.indexOf(id) !== i);
ok(chainBad.length === 0 && dupIds.length === 0, "prev/next 链完整连续 23 页" + (chainBad.length ? " 断裂: " + chainBad.join(",") : ""));

/* 5. 交互类型合法 + 必填参数 */
const INTERACTION_TYPES = {
  "slider-lab": ["min", "max", "step", "label", "expr"],
  "balance-drag": ["left", "right", "goal"],
  "linked-dashboard": ["source", "views"],
  "plot-points": ["fn", "xMin", "xMax", "step"],
  "zoomer": ["fn", "center", "levels", "window"],
  "numeric-lab": ["mode", "maxSteps"],
  "subdivision": ["fn", "a", "b", "steps"],
  "placeholder-morph": ["stages", "expr"],
  "side-compare": ["left", "right"],
  "slow-replay": ["frames", "duration", "draw"],
  "shape-area": ["min", "max", "step"],
  "vertex-drag": ["vertices"],
  "angle-protractor": ["angle"],
  "step-play": ["steps"],
  "tap-highlight": ["items", "groups"],
  "compare-toggle": ["views"],
  "proof-replay": ["steps"],
  "construction-step": ["steps"],
  "cut-reassemble": ["pieces", "targets"],
  "pythag-grow": ["aMin", "aMax", "bMin", "bMax"],
  "ladder-slide": ["length", "xMin", "xMax", "expr"],
};
let ixBad = [];
const typeCount = {};
for (const p of pages) {
  const ix = p.interaction;
  if (!ix) { ixBad.push(p.id + ":缺少主交互"); continue; }
  const req = INTERACTION_TYPES[ix.type];
  if (!req) { ixBad.push(p.id + ":未知类型 " + ix.type); continue; }
  typeCount[ix.type] = (typeCount[ix.type] || 0) + 1;
  for (const k of req) if (!ix.params || ix.params[k] === undefined) ixBad.push(p.id + ":缺参数 " + k);
}
ok(ixBad.length === 0, "交互类型合法、必填参数完备" + (ixBad.length ? " 问题: " + ixBad.join(";") : ""));
console.log("  (交互类型分布: " + Object.entries(typeCount).map(([t, n]) => `${t}×${n}`).join("、") + ")");

/* 6. 文字量：交互页 ≤150 字，讲解页 ≤300 字；标题 ≤20 字；hints ≤60 字/条；examples ≤2 */
const cjk = (s) => (s.match(/[\u4e00-\u9fff]/g) || []).length;
let longTitle = pages.filter((p) => [...p.title].length > 20).map((p) => p.id);
ok(longTitle.length === 0, "标题 ≤ 20 字");
let longHint = [];
for (const p of pages) for (const h of (p.hints || [])) if ([...h].length > 60) longHint.push(p.id);
ok(longHint.length === 0, "hints 每条 ≤ 60 字");
let manyEx = pages.filter((p) => (p.examples || []).length > 2).map((p) => p.id);
ok(manyEx.length === 0, "examples ≤ 2 个/页");
for (const p of pages) {
  const n = cjk([p.title, ...(p.hints || [])].join(""));
  const limit = p.pageKind === "explain" ? 300 : 150;
  warn(n <= limit, `${p.id}: 文字约 ${n} 字，超过${limit}上限`);
}
// proof-replay 步骤 ≤5；step-play caption ≤60 字；card ≤40 字
let prBad = [];
for (const p of pages) {
  const ix = p.interaction;
  if (ix && ix.type === "proof-replay" && ix.params.steps.length > 5) prBad.push(p.id);
  if (ix && ix.type === "step-play") for (const s of ix.params.steps) {
    if (s.caption && [...s.caption].length > 60) prBad.push(p.id + ":caption超60字");
    if (s.card && [...s.card].length > 40) prBad.push(p.id + ":card超40字");
  }
}
ok(prBad.length === 0, "proof-replay ≤5 步、caption ≤60 字、card ≤40 字");

/* 7. 黄队铁律抽查 */
// 7a. 切线判定与性质分开：l2 必须有"判定"页和"性质"页各一
const l2 = pages.filter((p) => p.id.startsWith("g08-u1-l2-"));
ok(l2.some((p) => p.concept.includes("判定")) && l2.some((p) => p.concept.includes("性质")),
  "g08.1.2 判定/性质各占一页（两定理分别处理）");
// 7b. 外心/内心各配交互+讲解
const l4 = pages.filter((p) => p.id.startsWith("g08-u1-l4-"));
ok(l4.filter((p) => p.concept.includes("外心")).length >= 2 && l4.filter((p) => p.concept.includes("内心")).length >= 2,
  "g08.1.4 外心/内心各有交互+讲解");
// 7c. H3 里程碑：惊奇感标题 + 不变量徽章 + 代数回链
const mile = pages.find((p) => p.id === "g08-u1-l5-p1");
ok(mile && /？$/.test(mile.title), "g08.1.5 P1 标题制造惊奇感：" + (mile ? mile.title : "缺失"));
ok(mile && mile.hints.some((h) => h.includes("没变的是") && h.includes("到原点")),
  "g08.1.5 P1 不变量徽章：没变的是到原点距离=r");
const h3 = pages.find((p) => p.id === "g08-u1-l5-p4");
ok(h3 && (h3.examples || []).some((e) => e.figure === "回链" && e.text.includes("ch06")),
  "g08.1.5 P4 页尾回链代数 ch06（H3 双向链几何侧）");
// 7d. 概念讲解页必有生活/图形/反例三类（例题/小结/呼应页豁免）
let explainNo3 = [];
for (const p of pages) {
  if (p.pageKind !== "explain") continue;
  if (/例题|总结|习题|握手/.test(p.title)) continue;
  const text = (p.hints || []).join("");
  const hasLife = /生活例/.test(text), hasFig = /图形例/.test(text), hasAnti = /反例/.test(text);
  if (!(hasLife && hasFig && hasAnti)) explainNo3.push(p.id);
}
ok(explainNo3.length === 0, "概念讲解页生活/图形/反例三类齐全" + (explainNo3.length ? " 缺: " + explainNo3.join(",") : ""));

console.log("\n" + (fails.length ? "FAIL: " + fails.length + " 项" : "全部通过") + (warns.length ? `（${warns.length} 条告警）` : ""));
process.exit(fails.length ? 1 : 0);
