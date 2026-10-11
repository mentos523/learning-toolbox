#!/usr/bin/env node
// 蓝队：g05 渲染接入专项校验
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

/* 1. chapters.js: g05 ready */
load("modules/math/data/chapters.js");
const g05meta = sandbox.window.MATH_CHAPTERS.find((c) => c.id === "g05");
ok(g05meta && g05meta.status === "ready", "chapters.js 中 g05 status=ready");

/* 2. 交互注册表 */
sandbox.window.MATH_INTERACTIONS = {
  _m: {},
  register(t, f) { this._m[t] = f; },
  has(t) { return t in this._m; },
};
load("modules/math/js/interactions.js");
const reg = sandbox.window.MATH_INTERACTIONS;
ok(!!reg, "window.MATH_INTERACTIONS 存在");
for (const t of ["cut-reassemble", "pythag-grow", "ladder-slide"]) {
  ok(reg && reg.has && reg.has(t), "交互已注册: " + t);
}

/* 3. 加载 g05 数据 + 公式 */
load("modules/math/data/g05.js");
load("modules/math/data/g05.formulas.js");
const ch = sandbox.window.MATH_CH.g05;
const MML = sandbox.window.MATH_MML;

const pages = [];
for (const u of ch.units) for (const l of u.lessons) for (const p of l.pages) pages.push(p);
ok(pages.length === 23, "页总数 = 23（实际 " + pages.length + "）");

/* 4. 公式覆盖 + MathML 无裸文本 */
const srcFormulas = [];
for (const p of pages) for (const f of (p.formulas || [])) srcFormulas.push(p.id + "#" + f.id);
ok(srcFormulas.length === 32, "源公式总数 = 32（实际 " + srcFormulas.length + "）");
const mmlKeys = Object.keys(MML).filter((k) => k.startsWith("g05-"));
const missing = srcFormulas.filter((k) => !MML[k]);
const extra = mmlKeys.filter((k) => !srcFormulas.includes(k));
ok(missing.length === 0, "公式 MATH_MML 全覆盖" + (missing.length ? " 缺失: " + missing.join(",") : ""));
ok(extra.length === 0, "无多余 MATH_MML 条目" + (extra.length ? " 多余: " + extra.join(",") : ""));

// 无裸文本：MathML 内不得含反斜杠（未转换的 LaTeX）或 <math> 之外裸文本
let badMml = [];
for (const [k, v] of Object.entries(MML)) {
  if (!k.startsWith("g05-")) continue;
  if (/\\/.test(v)) badMml.push(k + ":含反斜杠");
  if (!/^<math[^>]*>.*<\/math>$/.test(v)) badMml.push(k + ":非完整<math>包裹");
  // 标签均衡性（简单检查）
  const opens = (v.match(/<(m[a-z]+|math|mfrac|mrow|msup|msub|msqrt|mtext|mo|mi|mn|mspace)([\s>])/g) || []).length;
  const closes = (v.match(/<\/(math|m[a-z]+)>/g) || []).length;
  const selfc = (v.match(/\/>/g) || []).length;
  if (opens !== closes + selfc) badMml.push(k + ":标签不均衡");
}
ok(badMml.length === 0, "32 公式 MathML 无裸文本/无残留 LaTeX" + (badMml.length ? " 问题: " + badMml.join(";") : ""));

// translation 必填（schema 要求）
let noTr = [];
for (const p of pages) for (const f of (p.formulas || [])) if (!f.translation) noTr.push(p.id + "#" + f.id);
ok(noTr.length === 0, "公式 translation 全必填");

/* 5. prev/next 导航链 */
let chainBad = [];
const idSet = new Set(pages.map((p) => p.id));
pages.forEach((p, i) => {
  const expPrev = i === 0 ? null : pages[i - 1].id;
  const expNext = i === pages.length - 1 ? null : pages[i + 1].id;
  if (p.prev !== expPrev || p.next !== expNext) chainBad.push(p.id);
  if (p.prev && !idSet.has(p.prev)) chainBad.push(p.id + ":prev指向不存在");
  if (p.next && !idSet.has(p.next)) chainBad.push(p.id + ":next指向不存在");
});
const dupIds = pages.map((p) => p.id).filter((id, i, a) => a.indexOf(id) !== i);
ok(chainBad.length === 0 && dupIds.length === 0, "prev/next 链完整连续 23 页" + (chainBad.length ? " 断裂: " + chainBad.join(",") : "") + (dupIds.length ? " 重复id: " + dupIds.join(",") : ""));

/* 6. 三新交互页接入 + 参数完备性 */
const ixPages = {
  "g05-u1-l1-p2": { type: "pythag-grow", need: ["aMin", "aMax", "bMin", "bMax", "lockRight"] },
  "g05-u1-l2-p1": { type: "cut-reassemble", need: ["pieces", "targets"] },
  "g05-u1-l3-p1": { type: "ladder-slide", need: ["length", "xMin", "xMax"] },
};
for (const [pid, spec] of Object.entries(ixPages)) {
  const p = pages.find((x) => x.id === pid);
  ok(p && p.interaction && p.interaction.type === spec.type, pid + " 使用 " + spec.type);
  const params = (p && p.interaction && p.interaction.params) || {};
  const missP = spec.need.filter((k) => !(k in params));
  ok(missP.length === 0, pid + " 参数完备" + (missP.length ? " 缺: " + missP.join(",") : ""));
}
// pythag-grow lockRight 硬约束
const pg = pages.find((x) => x.id === "g05-u1-l1-p2");
ok(pg.interaction.params.lockRight === true, "pythag-grow lockRight=true 硬约束");
// ladder-slide xMax < length 硬约束
const ls = pages.find((x) => x.id === "g05-u1-l3-p1");
ok(ls.interaction.params.xMax < ls.interaction.params.length, "ladder-slide xMax < length 硬约束");

console.log("\n" + (fails.length ? "FAIL: " + fails.length + " 项" : "全部通过"));
process.exit(fails.length ? 1 : 0);
