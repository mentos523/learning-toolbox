#!/usr/bin/env node
// 英语专家队：D3 例句三审台账门禁
// 扫描 modules/english/data/_review/ledger-grNN.json，输出三审状态统计；
// 任一条目未终审（状态非 final_passed）→ 列出清单并以非零退出码失败（上线门禁）。
// 空台账（0 条目）视为通过。用法：仓库根目录执行 `node tools/check-grammar-review.mjs`
import { readdirSync, readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DIR = join(ROOT, "modules/english/data/_review");
const EXPECTED_SCHEMA = "grammar-review-ledger/1.0";

const ID_RE = /^gr(\d{2})\.(\d+)\.(\d+)-e(\d+)$/;
const FILE_RE = /^ledger-gr(\d{2})\.json$/;
const LEGAL_STATUS = ["drafted", "in_first", "first_passed", "in_final", "final_passed", "rejected"];
const STATUS_CN = {
  drafted: "已撰写（待初审）",
  in_first: "初审中",
  first_passed: "初审通过（待终审）",
  in_final: "终审中",
  final_passed: "终审通过·已入库",
  rejected: "打回（待重写）",
};
const REQUIRED = ["id", "lesson", "en", "zh", "register", "rule", "vocab",
  "written_at", "written_by", "status", "revision"];

const fails = [];
const fail = (msg) => { console.log("  [FAIL] " + msg); fails.push(msg); };
const ok = (msg) => { console.log("  [OK] " + msg); };

let files;
try {
  files = readdirSync(DIR).filter((f) => FILE_RE.test(f)).sort();
} catch (e) {
  console.log(`[FAIL] 无法读取台账目录 ${DIR}：${e.message}`);
  process.exit(1);
}
if (files.length === 0) fail("台账目录下没有 ledger-grNN.json 文件");

const entries = []; // {file, e}
const seenIds = new Map();

for (const f of files) {
  const chapter = "gr" + f.match(FILE_RE)[1];
  let doc;
  try {
    doc = JSON.parse(readFileSync(join(DIR, f), "utf8"));
  } catch (e) {
    fail(`${f}：JSON 解析失败（${e.message}）`);
    continue;
  }
  if (doc.schema !== EXPECTED_SCHEMA) fail(`${f}：schema=${doc.schema}，期望 ${EXPECTED_SCHEMA}`);
  if (doc.chapter !== chapter) fail(`${f}：chapter=${doc.chapter}，与文件名 ${chapter} 不一致`);
  if (!Array.isArray(doc.entries)) { fail(`${f}：entries 不是数组`); continue; }
  for (const e of doc.entries) {
    entries.push({ file: f, e });
    const m = typeof e.id === "string" && e.id.match(ID_RE);
    if (!m) { fail(`${f}：例句 id 非法（${JSON.stringify(e.id)}），应为 gr{NN}.{U}.{L}-e{n}`); continue; }
    if (m[1] !== chapter.slice(2)) fail(`${f}：${e.id} 章号与文件 ${chapter} 不一致`);
    if (seenIds.has(e.id)) fail(`${f}：例句 id 重复（${e.id}，首次见于 ${seenIds.get(e.id)}）`);
    else seenIds.set(e.id, f);
    for (const k of REQUIRED) {
      if (e[k] === undefined || e[k] === null || e[k] === "") fail(`${f}：${e.id} 缺必填字段 ${k}`);
    }
    if (e.status && !LEGAL_STATUS.includes(e.status)) fail(`${f}：${e.id} 状态非法（${e.status}）`);
    if (e.lesson && !String(e.lesson).startsWith(chapter + ".")) fail(`${f}：${e.id} 课号 ${e.lesson} 与章号不一致`);
  }
}
ok(`共读取 ${files.length} 个台账文件，${entries.length} 条例句`);

const byStatus = Object.fromEntries(LEGAL_STATUS.map((s) => [s, 0]));
for (const { e } of entries) if (LEGAL_STATUS.includes(e.status)) byStatus[e.status]++;

const total = entries.length;
const done = byStatus.final_passed;
const pendingFirst = byStatus.drafted + byStatus.in_first;
const pendingFinal = byStatus.first_passed + byStatus.in_final;
const rejected = byStatus.rejected;
const notFinal = total - done;

console.log("\n— 三审状态统计 —");
console.log(`  总数：${total}`);
console.log(`  已终审（final_passed）：${done}`);
console.log(`  待初审（drafted+in_first）：${pendingFirst}`);
console.log(`  待终审（first_passed+in_final）：${pendingFinal}`);
console.log(`  打回（rejected）：${rejected}`);

if (notFinal > 0) {
  console.log(`\n— 未终审例句清单（${notFinal} 条）—`);
  for (const { file, e } of entries) {
    if (e.status !== "final_passed") {
      console.log(`  [${STATUS_CN[e.status] || e.status}] ${e.id}（${e.lesson}，${file}）`);
    }
  }
  console.log(`\n[FAIL] 未终审例句 ${notFinal} 条，门禁不通过（课程页面不得引用未终审例句）`);
  process.exit(1);
}

if (fails.length > 0) {
  console.log(`\n[FAIL] 台账校验 ${fails.length} 项失败`);
  process.exit(1);
}

console.log("\n[PASS] 台账校验通过：无未终审例句" + (total === 0 ? "（空台账）" : ""));
process.exit(0);
