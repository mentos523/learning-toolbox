#!/usr/bin/env node
/* waveA-sysint-verify.mjs —— SYS-INT 正式复验断言（白队）
 * 出处：~/workspace/math-rectify/waveA-impl-report.md 五-4
 *      「ch05x SYS-INT 断言转正：7 条页面内钩子待白队转为正式复验断言」；
 *      断言规格见 modules/math/data/ch05x.js（ch05x-u3-l1-p2 hints「SYS-INT 断言钩子」行）。
 * 用法：node tools/waveA-sysint-verify.mjs
 * 方式：headless Chromium 真实 file:// 打开数学模块页，经 window.__eqbind
 *      7 钩子（sysSolution/sysSetCoeff/sysDragTo/sysDegenerate/sysResiduals/
 *      syslabSet+syslabReadouts/syslabPoint）断言；0 FAIL 才算通过。
 * 约定：沿 tools/waveA-verify.mjs 惯例（playwright-core 复用
 *      ~/workspace/phy-audit/node_modules，executablePath /opt/meta-chromium/chrome）。
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createRequire } from "node:module";

const require = createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");

const SYS_PAGE = "ch05x-u3-l1-p2";   /* system2x2：方程组的解 = 两直线交点 */
const SYSLAB_PAGE = "ch05x-u1-l1-p1"; /* sys-lab：x+y=10 组合实验台 */

const results = [];
function check(id, name, cond, expected, actual) {
  results.push({ id, name, pass: !!cond, expected: String(expected), actual: String(actual) });
  console.log((cond ? "PASS " : "FAIL ") + id + " - " + name + (cond ? "" : " | 期望: " + expected + " | 实际: " + actual));
}

/* 独立复算（与实现无关的克拉默法则，供 SYSINT-01/02 对账） */
function cramer(a1, b1, c1, a2, b2, c2) {
  const D = a1 * b2 - a2 * b1;
  return { x: (c1 * b2 - b1 * c2) / D, y: (a1 * c2 - c1 * a2) / D };
}
/* 独立求值（sys-lab 读数/点位表达式，供 SYSINT-06/07 对账；仅允许数字与 x/y 四则） */
function evalExpr(expr, vars) {
  if (!/^[0-9xy+\-*/().\s]+$/.test(expr)) throw new Error("非法表达式: " + expr);
  return Function("x", "y", '"use strict";return(' + expr + ")")(vars.x, vars.y);
}

async function main() {
  let pw;
  try {
    pw = require("/home/hatch/workspace/phy-audit/node_modules/playwright-core");
  } catch (e) {
    console.log("SKIP: playwright-core 不可用 (" + e.message.slice(0, 80) + ")");
    process.exit(2);
  }
  const browser = await pw.chromium.launch({
    executablePath: "/opt/meta-chromium/chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"]
  });

  async function openPage(pageId) {
    const pg = await browser.newPage();
    const errors = [];
    pg.on("pageerror", e => errors.push("pageerror: " + e.message));
    await pg.goto("file://" + path.join(REPO, "modules", "math", "index.html") + "#p=" + pageId,
      { waitUntil: "load", timeout: 30000 });
    await pg.waitForTimeout(1200);
    const hooks = await pg.evaluate(() => {
      const h = window.__eqbind || {};
      return ["sysSolution", "sysSetCoeff", "sysDragTo", "sysDegenerate",
        "sysResiduals", "syslabSet", "syslabReadouts", "syslabPoint"]
        .map(k => k + ":" + (typeof h[k]));
    });
    return { pg, errors, hooks };
  }
  const eq = (a, b) => Object.is(a, b);

  /* ---- SYSINT-00：钩子存在门 ---- */
  {
    const { pg, errors, hooks } = await openPage(SYS_PAGE);
    const missing = hooks.filter(h => !/:function$/.test(h));
    check("SYSINT-00", "7 钩子全部存在且为函数", missing.length === 0 && errors.length === 0,
      "7/7 function, 无 pageerror", hooks.join(", ") + (errors.length ? " || " + errors.join("||") : ""));
    await pg.close();
  }

  /* ---- SYSINT-01：默认解 (6,4) vs 克拉默独立复算，逐位一致 ---- */
  {
    const { pg, errors } = await openPage(SYS_PAGE);
    const sol = await pg.evaluate(p => window.__eqbind.sysSolution(p), SYS_PAGE);
    const exp = cramer(1, 1, 10, 2, -1, 8);
    check("SYSINT-01", "默认解 = 克拉默独立复算（逐位）",
      sol && eq(sol.x, exp.x) && eq(sol.y, exp.y) && errors.length === 0,
      JSON.stringify(exp), JSON.stringify(sol));
    await pg.close();
  }

  /* ---- SYSINT-02：a1 1→2 → 解变 (4.5, 1)（数据 hints 规格） ---- */
  {
    const { pg, errors } = await openPage(SYS_PAGE);
    await pg.evaluate(p => window.__eqbind.sysSetCoeff(p, "a1", 2), SYS_PAGE);
    const sol = await pg.evaluate(p => window.__eqbind.sysSolution(p), SYS_PAGE);
    const exp = cramer(2, 1, 10, 2, -1, 8);
    check("SYSINT-02", "sysSetCoeff(a1,2) 后解 = (4.5,1)（逐位）",
      sol && eq(sol.x, 4.5) && eq(sol.y, 1) && eq(sol.x, exp.x) && eq(sol.y, exp.y) && errors.length === 0,
      "{x:4.5,y:1}", JSON.stringify(sol));
    await pg.close();
  }

  /* ---- SYSINT-03：拖交点到 (2,1) → 解反写为 (2,1)，c1=c2=3 ---- */
  {
    const { pg, errors } = await openPage(SYS_PAGE);
    await pg.evaluate(p => window.__eqbind.sysDragTo(p, 2, 1), SYS_PAGE);
    const sol = await pg.evaluate(p => window.__eqbind.sysSolution(p), SYS_PAGE);
    /* 反写语义：c1=a1*x+b1*y=3, c2=a2*x+b2*y=3 → 解恒为拖放点 */
    check("SYSINT-03", "sysDragTo(2,1) 后解 = (2,1)（逐位，反写 c1=c2=3）",
      sol && eq(sol.x, 2) && eq(sol.y, 1) && errors.length === 0,
      "{x:2,y:1}", JSON.stringify(sol));
    await pg.close();
  }

  /* ---- SYSINT-04：D=0 判平行/重合/非法 ---- */
  {
    const { pg, errors } = await openPage(SYS_PAGE);
    const set = (nm, v) => pg.evaluate(([p, n, val]) => window.__eqbind.sysSetCoeff(p, n, val), [SYS_PAGE, nm, v]);
    const deg = () => pg.evaluate(p => window.__eqbind.sysDegenerate(p), SYS_PAGE);
    const sol = () => pg.evaluate(p => window.__eqbind.sysSolution(p), SYS_PAGE);
    await set("a2", 1); await set("b2", 1); await set("c1", 4); await set("c2", 7);
    const dPar = await deg(), sPar = await sol();
    await set("c2", 8); await set("a2", 2); await set("b2", 2);
    const dCoi = await deg(), sCoi = await sol();
    await set("a1", 0); await set("b1", 0);
    const dInv = await deg();
    const ok = dPar === "parallel" && sPar === null &&
               dCoi === "coincident" && sCoi === null &&
               dInv === "invalid" && errors.length === 0;
    check("SYSINT-04", "D=0 判平行/重合，a1=b1=0 判非法（解均为 null）", ok,
      "parallel/coincident/invalid", [dPar, dCoi, dInv].join("/"));
    await pg.close();
  }

  /* ---- SYSINT-05：几何一致性残差 <1e-6（数据 hints 规格） ---- */
  {
    const { pg, errors } = await openPage(SYS_PAGE);
    const r = await pg.evaluate(p => window.__eqbind.sysResiduals(p), SYS_PAGE);
    const ok = Array.isArray(r) && r.length === 2 &&
               Math.abs(r[0]) < 1e-6 && Math.abs(r[1]) < 1e-6 && errors.length === 0;
    check("SYSINT-05", "默认解代入残差 <1e-6", ok, "|r|<1e-6",
      r ? r.map(x => x.toExponential(1)).join(", ") : String(r));
    await pg.close();
  }

  /* ---- SYSINT-06：syslab 设滑块 → 读数与独立求值一致 ---- */
  {
    const { pg, errors } = await openPage(SYSLAB_PAGE);
    await pg.evaluate(p => window.__eqbind.syslabSet(p, "x", 3), SYSLAB_PAGE);
    await pg.evaluate(p => window.__eqbind.syslabSet(p, "y", 4), SYSLAB_PAGE);
    const ro = await pg.evaluate(p => window.__eqbind.syslabReadouts(p), SYSLAB_PAGE);
    const exp = evalExpr("x + y - 10", { x: 3, y: 4 });
    check("SYSINT-06", "syslabSet(x=3,y=4) 后读数 = 独立求值 (-3)",
      Array.isArray(ro) && eq(ro[0], exp) && errors.length === 0,
      "[" + exp + "]", JSON.stringify(ro));
    /* ---- SYSINT-07：点位 = 独立求值 (3, 7) ---- */
    const pt = await pg.evaluate(p => window.__eqbind.syslabPoint(p), SYSLAB_PAGE);
    const ex = evalExpr("x", { x: 3, y: 4 }), ey = evalExpr("10 - x", { x: 3, y: 4 });
    check("SYSINT-07", "syslabPoint() = 独立求值 (3,7)（逐位）",
      Array.isArray(pt) && eq(pt[0], ex) && eq(pt[1], ey) && errors.length === 0,
      "[3,7]", JSON.stringify(pt));
    await pg.close();
  }

  await browser.close();
  const fail = results.filter(r => !r.pass).length;
  fs.writeFileSync(path.join(REPO, "tools", "waveA-sysint-report.json"),
    JSON.stringify({ date: new Date().toISOString().slice(0, 10), results }, null, 1) + "\n");
  console.log(fail === 0 ? "ALL PASS" : fail + " FAIL");
  process.exit(fail ? 1 : 0);
}

main().catch(e => { console.error("SCRIPT ERROR", e.message); process.exit(2); });
