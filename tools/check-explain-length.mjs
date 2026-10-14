#!/usr/bin/env node
// 检查各课讲解页可见文本长度（白队 QA 口径：从加载的数据对象提取可见文本，中文字符 + 英文单词折半 ≤300）
// 用法：node tools/check-explain-length.mjs [课id...]
// 无参数时扫描全部 125 课并列出超标页
import { readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const LIMIT = 300;

function loadChapter(n) {
  const sb = { window: {} };
  vm.createContext(sb);
  vm.runInContext(readFileSync(join(ROOT, "modules/english/data", n + ".js"), "utf8"), sb, { filename: n + ".js" });
  return sb.window.ENG_CH[n];
}

// 与白队 qa-static.mjs 同口径：从数据对象提取页面可见文本
function visText(p) {
  const out = [];
  const push = (v) => { if (typeof v === "string") out.push(v); else if (Array.isArray(v)) v.forEach(push); };
  push(p.title); push(p.point); push(p.lead); push(p.exploreTip);
  for (const s of (p.sentences || [])) { push(s.en); push(s.zh); for (const c of (s.tagged || [])) { push(c.w); push(c.label); } }
  if (p.guess) { push(p.guess.q); push(p.guess.options); push(p.guess.note); }
  for (const w of (p.widgets || [])) {
    const m = w.params || {};
    push(m.hint); push(m.doneNote);
    if (w.type === "tagging") { for (const c of (m.sentence || [])) push(c.w); for (const t of (m.slots || [])) push(t.label); }
    if (w.type === "signal-light") { for (const s of (m.subjects || [])) { push(s.s); push(s.verb); } push(m.lampOn); push(m.lampOff); }
    if (w.type === "sentence-builder") { for (const b of (m.blocks || [])) push(b.w); }
    if (w.type === "clause-slots") { push(m.main); for (const s of (m.mainSlots || [])) push(s.label); for (const c of (m.clauseBlocks || [])) push(c.text); }
    if (w.type === "morph-dressup") { push(m.root); push(m.rootPos); for (const s of (m.suffixes || [])) { push(s.suf); push(s.pos); push(s.word); } for (const t of (m.traps || [])) { push(t.suf); push(t.pos); push(t.note); } }
    if (w.type === "constituent-quiz") { for (const it of (m.items || [])) for (const c of (it.sentence || [])) push(c.w); for (const s of (m.slots || [])) push(s.label); }
  }
  for (const b of (p.blocks || [])) {
    push(b.note); push(b.rule); push(b.condition); push(b.zh); push(b.en); push(b.unbridge);
    push(b.title); push(b.items); push(b.wrong); push(b.wrongZh); push(b.right); push(b.why);
  }
  for (const q of (p.questions || [])) { push(q.stem); push(q.stemBefore); push(q.stemAfter); push(q.hint); push(q.options); push(q.tip); }
  return out.join(" ");
}
const words = (s) => {
  const zh = (s.match(/[一-鿿]/g) || []).length;
  const en = (s.match(/[A-Za-z]+/g) || []).length;
  return zh + Math.round(en / 2);
};

const only = process.argv.slice(2);
const files = readdirSync(join(ROOT, "modules/english/data")).filter(f => /^gr\d\d\.js$/.test(f)).sort();
let over = 0, total = 0;
const overList = [];
for (const f of files) {
  const n = f.replace(".js", "");
  const ch = loadChapter(n);
  for (const u of (ch.units || [])) for (const l of (u.lessons || [])) {
    if (only.length && !only.includes(l.id)) continue;
    total++;
    const pg = (l.pages || []).find(p => p.kind === "explain");
    if (!pg) { console.log(`${l.id}: 无讲解页`); continue; }
    const len = words(visText(pg));
    if (len > LIMIT) { over++; overList.push([l.id, len]); console.log(`超标 ${l.id} 约 ${len} 字（超 ${len - LIMIT}）`); }
    else if (only.length) console.log(`OK ${l.id} 约 ${len} 字`);
  }
}
if (!only.length) console.log(`\n共 ${total} 课，${over} 页超标（>${LIMIT}）`);
process.exit(over && !only.length ? 1 : 0);
