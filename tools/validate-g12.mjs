#!/usr/bin/env node
// 黄队：g12 数据专项校验（仿 tools/validate-g05.mjs 口径）
// 用法：node tools/validate-g12.mjs
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

/* 1. chapters.js: g12 条目存在；net-fold 未实现前保持 planned */
load("modules/math/data/chapters.js");
const g12meta = sandbox.window.MATH_CHAPTERS.find((c) => c.id === "g12");
ok(!!g12meta, "chapters.js 中有 g12 条目");
ok(g12meta && g12meta.file === "data/g12.js", "g12 file 指向 data/g12.js");
ok(g12meta && g12meta.status === "planned",
  "g12 status=planned（net-fold 待蓝队实现，暂不翻 ready）");

/* 2. 交互注册表：除 net-fold 外全部已注册；net-fold 明确未注册（蓝队待办） */
sandbox.window.MATH_INTERACTIONS = {
  _m: {},
  register(t, f) { this._m[t] = f; },
  has(t) { return t in this._m; },
};
load("modules/math/js/interactions.js");
const reg = sandbox.window.MATH_INTERACTIONS;
ok(!!reg, "window.MATH_INTERACTIONS 存在");

/* 3. 加载 g12 数据 */
load("modules/math/data/g12.js");
const ch = sandbox.window.MATH_CH.g12;
ok(!!ch && ch.id === "g12", "window.MATH_CH.g12 加载成功");

const pages = [];
for (const u of ch.units) for (const l of u.lessons) for (const p of l.pages) pages.push(p);
ok(pages.length === 22, "页总数 = 22（实际 " + pages.length + "）");
ok(ch.units[0].lessons.length === 5, "课数 = 5（实际 " + ch.units[0].lessons.length + "）");

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
ok(chainBad.length === 0, "prev/next 链完整连续 22 页" + (chainBad.length ? " 断裂: " + chainBad.join(",") : ""));

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

/* 7. 公式：translation 必填；LaTeX 仅用构建器支持的子集 */
const LATEX_ALLOW = new Set(["text", "parallel", "perp", "to", "neq", "leq", " ", "quad"]);
let noTr = [], badLx = [];
for (const p of pages) for (const f of (p.formulas || [])) {
  if (!f.translation) noTr.push(p.id + "#" + f.id);
  const cmds = [...(f.latex.match(/\\([a-zA-Z]+| )/g) || [])].map((s) => s.slice(1));
  const unknown = cmds.filter((c) => !LATEX_ALLOW.has(c));
  if (unknown.length) badLx.push(`${p.id}#${f.id}:\\${unknown.join(",\\")}`);
}
ok(noTr.length === 0, "公式 translation 全必填");
ok(badLx.length === 0, "LaTeX 仅用支持子集" + (badLx.length ? " 未知命令: " + badLx.join(";") : ""));

/* 8. 交互类型：21 页用已实现类型；仅 l3-p1 用 net-fold（待蓝队） */
const IMPLEMENTED = new Set(["vertex-drag", "angle-protractor", "step-play", "tap-highlight",
  "compare-toggle", "proof-replay", "construction-step", "cut-reassemble", "pythag-grow", "ladder-slide"]);
const netFoldPages = pages.filter((p) => p.interaction && p.interaction.type === "net-fold");
ok(netFoldPages.length === 1 && netFoldPages[0].id === "g12-u1-l3-p1",
  "仅 g12-u1-l3-p1 使用 net-fold（技术验证页）");
let regBad = pages.filter((p) => p.interaction && IMPLEMENTED.has(p.interaction.type)
  && !(reg.has && reg.has(p.interaction.type))).map((p) => p.id);
ok(regBad.length === 0, "其余 21 页交互类型已在 interactions.js 注册");
ok(!(reg.has && reg.has("net-fold")), "net-fold 尚未注册（蓝队待实现，此为预期）");

/* 9. net-fold 提案参数完备性（待蓝队冻结 schema） */
const nf = netFoldPages[0] && netFoldPages[0].interaction.params;
const nfNeed = ["net", "foldSequence", "views"];
const nfMiss = nfNeed.filter((k) => !(nf && nf[k] !== undefined));
ok(nfMiss.length === 0, "net-fold 提案参数齐全（net/foldSequence/views）" + (nfMiss.length ? " 缺: " + nfMiss.join(",") : ""));
ok(nf && nf.net.length === 6, "net 含 6 个面（正方体）");
ok(nf && nf.foldSequence.length > 0, "foldSequence 非空（折叠轴序列）");
ok(nf && nf.views.length >= 3 && nf.views.length <= 6, "views 为 3–6 个固定视角档位");

/* 10. step-play / tap-highlight 参数完备性 */
let spBad = [], thBad = [];
for (const p of pages) {
  const ix = p.interaction; if (!ix) { spBad.push(p.id + ":缺主交互"); continue; }
  if (ix.type === "step-play") {
    const steps = (ix.params && ix.params.steps) || [];
    if (!steps.length) spBad.push(p.id + ":steps空");
    for (const s of steps) if (s.caption && [...s.caption].length > 60) spBad.push(p.id + ":caption超60字");
  }
  if (ix.type === "tap-highlight") {
    const groups = (ix.params && ix.params.groups) || [];
    const items = (ix.params && ix.params.items) || [];
    if (!groups.length || !items.length) thBad.push(p.id + ":groups/items空");
    if (groups.length > 3) thBad.push(p.id + ":groups超3组");
    const gnames = new Set(groups.map((g) => g.name));
    for (const it of items) {
      const g = typeof it.group === "number" ? groups[it.group] : groups.find((x) => x.name === it.group);
      if (!g) thBad.push(p.id + ":" + it.id + "组引用无效");
    }
    void gnames;
  }
}
ok(spBad.length === 0, "step-play 参数完备（steps 非空、caption≤60字）" + (spBad.length ? " 问题: " + spBad.join(";") : ""));
ok(thBad.length === 0, "tap-highlight 参数完备（groups≤3、items 组引用有效）" + (thBad.length ? " 问题: " + thBad.join(";") : ""));

console.log("\n" + (fails.length ? "FAIL: " + fails.length + " 项" : "全部通过"));
process.exit(fails.length ? 1 : 0);
