/* 将 2-dir 弧修复提案写回数据文件（单遍扫描，处理重复弧）。
 * 用法: node tools/geom-apply-arcs.mjs [--dry-run] [--only=chId]
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { execSync } from "child_process";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const dryRun = process.argv.includes("--dry-run");
const onlyArg = (process.argv.find((a) => a.startsWith("--only=")) || "").slice(7);

const out = execSync("node tools/geom-fix-arcs.mjs", { cwd: ROOT, encoding: "utf8" });
const proposals = [];
for (const line of out.split("\n")) {
  const m = line.match(/^(g\d\d-u\d+-l\d+-p\d+) \S+ v=\[([\d.,\-]+)\] \(([^,]+),([^)]+)\) -> \(([^,]+),([^)]+)\) \[AUDIT-FAIL\]/);
  if (m) proposals.push({
    pageId: m[1], ch: m[1].slice(0, 3),
    vx: +m[2].split(",")[0], vy: +m[2].split(",")[1],
    oldA1: m[3].trim(), oldA2: m[4].trim(),
    newA1: m[5].trim(), newA2: m[6].trim(),
  });
}
// key: ch|pageId|vx|vy|oldA1|oldA2 -> {newA1,newA2}
const pmap = new Map();
for (const p of proposals) {
  const k = `${p.ch}|${p.pageId}|${p.vx}|${p.vy}|${p.oldA1}|${p.oldA2}`;
  pmap.set(k, p);
}
console.log("提案数: " + proposals.length);

const files = [...new Set(proposals.map((p) => p.ch))].filter((c) => !onlyArg || c === onlyArg);
let total = 0, unmatched = [];
for (const ch of files) {
  const fp = path.join(ROOT, "modules/math/data", ch + ".js");
  const text = readFileSync(fp, "utf8");
  // 找到所有页标记位置
  const pageMarks = [];
  const idRe = /id:\s*"(g\d\d-u\d+-l\d+-p\d+)"/g;
  let im;
  while ((im = idRe.exec(text))) pageMarks.push({ id: im[1], idx: im.index });
  const pageOf = (pos) => {
    let cur = null;
    for (const pm of pageMarks) { if (pm.idx <= pos) cur = pm.id; else break; }
    return cur;
  };
  // 找到所有 arc 字面量
  const arcRe = /\{\s*t:\s*"arc",\s*v:\s*\[(-?[\d.]+),(-?[\d.]+)\]((?:[^{}]|\{[^{}]*\})*?)\}/g;
  const edits = []; // {pos, len, newA1, newA2, oldText}
  let am;
  while ((am = arcRe.exec(text))) {
    const vx = +am[1], vy = +am[2], rest = am[3];
    const a1m = rest.match(/a1:\s*(-?[\d.]+)/), a2m = rest.match(/a2:\s*(-?[\d.]+)/);
    if (!a1m || !a2m) continue;
    const pid = pageOf(am.index);
    const k = `${ch}|${pid}|${vx}|${vy}|${a1m[1]}|${a2m[1]}`;
    const p = pmap.get(k);
    if (p) {
      edits.push({ pos: am.index, old: am[0], vx, vy, a1: a1m[1], a2: a2m[1], newA1: p.newA1, newA2: p.newA2, pid });
    }
  }
  // 检查提案是否都被匹配
  for (const p of proposals.filter((x) => x.ch === ch)) {
    const k = `${p.ch}|${p.pageId}|${p.vx}|${p.vy}|${p.oldA1}|${p.oldA2}`;
    const n = edits.filter((e) => `${ch}|${e.pid}|${e.vx}|${e.vy}|${e.a1}|${e.a2}` === k).length;
    if (n === 0) unmatched.push(k);
  }
  // 从后往前替换
  let newText = text;
  edits.sort((a, b) => b.pos - a.pos);
  for (const e of edits) {
    let s = e.old;
    // 替换 a1 和 a2（注意 a1: 0 与 a2: 0 的区分；用正则按序替换）
    s = s.replace(/a1:\s*(-?[\d.]+)/, "a1: " + e.newA1).replace(/a2:\s*(-?[\d.]+)/, "a2: " + e.newA2);
    newText = newText.slice(0, e.pos) + s + newText.slice(e.pos + e.old.length);
    total++;
    if (dryRun) console.log(`  ${e.pid} v=[${e.vx},${e.vy}] (${e.a1},${e.a2})->(${e.newA1},${e.newA2})`);
  }
  if (!dryRun) writeFileSync(fp, newText, "utf8");
  console.log(`${ch}.js: 替换 ${edits.length} 处`);
}
console.log("总计替换: " + total);
if (unmatched.length) { console.log("未匹配提案: " + unmatched.length); for (const u of unmatched) console.log("  " + u); }
