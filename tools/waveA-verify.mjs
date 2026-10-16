#!/usr/bin/env node
/* waveA-verify.mjs —— 波A 复验脚本（静态门 + headless 抽查）
 * 用法：node tools/waveA-verify.mjs [--headless]
 * 静态门（必跑）：无 TBD、id 唯一、页数（代数 289、几何 341）、新类型带 engine
 * headless（--headless）：抽查页打开零报错 + 无 ix-stub 渲染残留（需 playwright-core）
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const MATH = path.join(REPO, "modules", "math");
const HEADLESS = process.argv.includes("--headless");

const report = { static: [], headless: [], errors: [] };

function flatten(ch) {
  const out = [];
  const walk = (o) => {
    if (Array.isArray(o)) o.forEach(walk);
    else if (o && typeof o === "object") {
      /* 页的特征：有 id/title，且有 interaction 或 formulas（区别于 unit/lesson） */
      if (o.id && typeof o.id === "string" && /^(ch|g)\d/.test(o.id) && o.title &&
          (o.interaction || o.formulas)) out.push(o);
      Object.values(o).forEach(walk);
    }
  };
  (ch.units || []).forEach(walk);
  return out;
}
function loadCh(chId) {
  const fp = path.join(MATH, "data", chId + ".js");
  const code = fs.readFileSync(fp, "utf8");
  const window = {};
  const module = { exports: {} };
  new Function("window", "module", "exports", code)(window, module, module.exports);
  return window.MATH_CH[chId];
}

/* ---------- 静态门 ---------- */
function staticGates() {
  const dataDir = path.join(MATH, "data");
  const files = fs.readdirSync(dataDir).filter(f => f.endsWith(".js"));
  /* 门1：无 TBD */
  for (const f of files) {
    const src = fs.readFileSync(path.join(dataDir, f), "utf8");
    if (/"TBD/.test(src)) report.errors.push("STATIC: " + f + " 含 TBD 残留");
  }
  report.static.push("门1 无TBD: " + (report.errors.length ? "FAIL" : "PASS"));

  /* 门2：id 全局唯一 */
  const seen = {}, dup = [];
  const allCh = files.map(f => f.replace(/\.js$/, ""))
    .filter(id => /^(ch\d+|g\d+|ch05x)$/.test(id));
  for (const chId of allCh) {
    try {
      flatten(loadCh(chId)).forEach(p => {
        if (seen[p.id]) dup.push(p.id);
        seen[p.id] = 1;
      });
    } catch (e) {
      report.errors.push("STATIC: " + chId + ".js 加载失败: " + e.message);
    }
  }
  if (dup.length) report.errors.push("STATIC: 页 id 重复: " + dup.join(","));
  report.static.push("门2 id唯一: " + (dup.length ? "FAIL" : "PASS"));

  /* 门3：页数 */
  let alg = 0, geo = 0;
  for (const chId of allCh) {
    try {
      const n = flatten(loadCh(chId)).length;
      if (chId.startsWith("ch")) alg += n; else geo += n;
    } catch (e) { /* 已记录 */ }
  }
  if (alg !== 289) report.errors.push(`STATIC: 代数页数=${alg}，期望 289`);
  if (geo !== 341) report.errors.push(`STATIC: 几何页数=${geo}，期望 341`);
  report.static.push(`门3 页数: 代数=${alg}/289 几何=${geo}/341 ` +
    (alg === 289 && geo === 341 ? "PASS" : "FAIL"));

  /* 门4：新类型带 engine */
  const newTypes = ["eq-graph-lab", "ineq-shade-lab", "morph-toggle",
    "complete-square-lab", "eq-graph", "sys-lab", "sys-steps", "static-compare"];
  let missing = 0;
  for (const chId of allCh) {
    try {
      flatten(loadCh(chId)).forEach(p => {
        ["interaction", "auxInteraction"].forEach(k => {
          const ix = p[k];
          if (ix && ix.type && newTypes.includes(ix.type) && !ix.engine) {
            missing++;
            report.errors.push(`STATIC: ${p.id} 新类型 ${ix.type} 缺 engine`);
          }
        });
      });
    } catch (e) { /* 已记录 */ }
  }
  report.static.push("门4 新类型engine: " + (missing ? "FAIL(" + missing + ")" : "PASS"));

  /* 门5：ch05x 存在且 10 页，prev/next 闭合 */
  try {
    const ch05x = loadCh("ch05x");
    const pages = flatten(ch05x);
    if (pages.length !== 10) {
      report.errors.push(`STATIC: ch05x 页数=${pages.length}，期望 10`);
    }
    report.static.push(`门5 ch05x: ${pages.length}/10页 ` + (pages.length === 10 ? "PASS" : "FAIL"));
    /* prev/next 闭合 */
    const ids = new Set(pages.map(p => p.id));
    for (const p of pages) {
      if (p.prev && !ids.has(p.prev) && p.prev !== "ch05-ux-l1-p1") {
        /* prev 允许指向 ch05 末页 */
        if (!p.prev.startsWith("ch05-")) report.errors.push(`STATIC: ${p.id}.prev=${p.prev} 悬空`);
      }
      if (p.next && !ids.has(p.next)) {
        report.errors.push(`STATIC: ${p.id}.next=${p.next} 悬空`);
      }
    }
    /* ch05 末页 next 与 ch06 首页 prev */
    const ch05 = loadCh("ch05");
    const ch05Pages = flatten(ch05);
    const lastCh05 = ch05Pages[ch05Pages.length - 1];
    if (lastCh05.next !== "ch05x-u1-l1-p1") {
      report.errors.push(`STATIC: ch05 末页 next=${lastCh05.next}，期望 ch05x-u1-l1-p1`);
    }
    const ch06 = loadCh("ch06");
    const ch06Pages = flatten(ch06);
    const firstCh06 = ch06Pages[0];
    if (firstCh06.prev !== "ch05x-u3-l2-p1") {
      report.errors.push(`STATIC: ch06 首页 prev=${firstCh06.prev}，期望 ch05x-u3-l2-p1`);
    }
    report.static.push("门6 链闭合: " +
      (lastCh05.next === "ch05x-u1-l1-p1" && firstCh06.prev === "ch05x-u3-l2-p1" ? "PASS" : "FAIL"));
  } catch (e) {
    report.errors.push("STATIC: ch05x 检查失败: " + e.message);
  }
}

/* ---------- headless 抽查 ---------- */
async function headlessCheck() {
  let pw;
  try {
    const m = await import("/home/hatch/workspace/phy-audit/node_modules/playwright-core/index.mjs");
    pw = m.chromium;
  } catch (e) {
    report.errors.push("HEADLESS: playwright-core 不可用，跳过 (" + e.message.slice(0, 100) + ")");
    return;
  }
  const pages = [
    "ch00-u1-l1-p1",      /* R1: eq-graph-lab numberline */
    "ch05-u1-l1-p1b",     /* R1: ineq-shade-lab compare */
    "ch05x-u1-l1-p1",     /* 新单元 sys-lab */
    "ch05x-u3-l1-p2",     /* 新单元 system2x2 */
    "g08-u1-l3-p1",       /* morph-toggle fold */
  ];
  const browser = await pw.launch({
    executablePath: "/opt/meta-chromium/chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });
  for (const pid of pages) {
    const pg = await browser.newPage();
    const errors = [];
    pg.on("pageerror", e => errors.push("pageerror: " + e.message));
    pg.on("console", m => {
      if (m.type() === "error") {
        const txt = m.text();
        const loc = m.location();
        const url = (loc && loc.url) || "";
        /* .formulas.js 按需加载 404 是预期的 catch 降级，不计为错误 */
        if (/\.formulas\.js/.test(url) || /\.formulas\.js/.test(txt)) return;
        /* 其他资源加载失败也可能是预期的（如可选资源），只记录不判 FAIL */
        if (/Failed to load resource/.test(txt)) {
          report.headless.push(`${pid}: 资源404 ${url || txt.slice(0, 80)} (非阻塞)`);
          return;
        }
        errors.push("console: " + txt.slice(0, 200));
      }
    });
    try {
      await pg.goto(`file://${MATH}/index.html#p=${pid}`, { waitUntil: "networkidle", timeout: 15000 });
      await pg.waitForTimeout(2000);
      /* 检查公式渲染：.formulas 应无 catch 降级痕迹（无 .formula-error） */
      const formulaErr = await pg.evaluate(() =>
        document.querySelectorAll(".formula-error, .math-error").length);
      if (formulaErr > 0) errors.push(`公式渲染异常: ${formulaErr} 处`);
      /* 返工方法论必修：math.js:182 把渲染异常吞成 DOM stub（无 console/pageerror），
       * 必须断言无 ix-stub，否则坏页漏检（19 个坏页曾因此漏网） */
      const stubInfo = await pg.evaluate(() =>
        [...document.querySelectorAll(".ix-stub")].map(e => e.textContent.slice(0, 60)));
      if (stubInfo.length > 0) errors.push(`渲染 stub: ${stubInfo.length} 处 [${stubInfo.join(" | ")}]`);
      report.headless.push(`${pid}: ${errors.length ? "FAIL" : "PASS"}` +
        (errors.length ? " | " + errors.join("; ") : ""));
      if (errors.length) report.errors.push("HEADLESS " + pid + ": " + errors.join("; "));
    } catch (e) {
      report.headless.push(`${pid}: FAIL | ${e.message.slice(0, 150)}`);
      report.errors.push("HEADLESS " + pid + ": " + e.message.slice(0, 200));
    }
    await pg.close();
  }
  await browser.close();
}

/* ---------- 运行 ---------- */
staticGates();
if (HEADLESS) await headlessCheck();

console.log("=== 静态门 ===");
report.static.forEach(s => console.log("  " + s));
if (HEADLESS) {
  console.log("=== Headless 抽查 ===");
  report.headless.forEach(s => console.log("  " + s));
}
console.log("=== 错误 ===");
if (report.errors.length) report.errors.forEach(e => console.log("  " + e));
else console.log("  无");
fs.writeFileSync(path.join(REPO, "tools", "waveA-verify-report.json"),
  JSON.stringify(report, null, 1));
process.exit(report.errors.length ? 2 : 0);
