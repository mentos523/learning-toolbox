/* 电磁真值断言门禁（引擎层，物理推广批4）
 * 口径：~/workspace/phy-audit/em-truth-criteria.md v1.0（EM-01…EM-30 纯函数部分；
 *   页级行为见同文档 §六，白队 headless 页级实测 tools/qa-em-pages.mjs）
 * 方法：Node 直载 assets/engine/core.js + em.js（window 垫片，无 DOM），
 *   期望值全部物理专家队独立手算硬编码（见口径文档"手算期望"表），非恒真式；
 *   FAIL>0 非零退出。白队独立复验用此脚本放行；实现队自查不计入放行依据。
 * 备注：EM-08/09/10 手算稿曾笔误（0.11379722），Python 独立复算纠正为 0.11379153，
 *   以本脚本与口径文档修正值为准。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const window = {};
for (const f of ["assets/engine/core.js", "assets/engine/em.js"]) {
  new Function("window", fs.readFileSync(path.join(ROOT, f), "utf8"))(window);
}
const EM = window.Eng && window.Eng.EM;
if (!EM) { console.error("FATAL: Eng.EM 未挂载"); process.exit(2); }

const FAIL = [];
let n = 0;
function ok(no, cond, meas, exp) {
  n++;
  if (!cond) FAIL.push({ no, measured: meas, expected: exp });
}
const near = (a, b, t) => Math.abs(a - b) <= t;

/* ---------- 一、静电场 ---------- */
let e1 = new EM.ElectricField({ charges: [{ x: 30, y: 50, q: 1 }] });
let f1 = e1.fieldAt(50, 50);
ok("EM-01", near(f1.x, 0.0025, 1e-9) && near(f1.y, 0, 1e-12),
  `E=(${f1.x},${f1.y})`, "(0.0025, 0)");

let e2 = new EM.ElectricField({ charges: [{ x: 30, y: 50, q: 1 }, { x: 70, y: 50, q: -1 }] });
let f2 = e2.fieldAt(50, 50), pr2 = e2.probe(50, 50);
ok("EM-02", near(f2.x, 0.005, 1e-9) && near(f2.y, 0, 1e-12) &&
  pr2.dirText === "向右" && pr2.strength === "弱",
  `E=(${f2.x},${f2.y}),probe=${pr2.dirText}·${pr2.strength}`, "E=(0.005,0), 向右·弱");

let e3 = new EM.ElectricField({ charges: [{ x: 50, y: 50, q: 1 }] });
let pr3 = e3.probe(50, 60);
ok("EM-03", pr3.angleDeg === 90 && pr3.dirText === "向上" && pr3.strength === "弱",
  `ang=${pr3.angleDeg},${pr3.dirText}·${pr3.strength}`, "90°, 向上·弱");
ok("EM-04a", e3.probe(50, 51).strength === "强", e3.probe(50, 51).strength, "强");
ok("EM-04b", e3.probe(50, 52.5).strength === "中", e3.probe(50, 52.5).strength, "中");
ok("EM-04c", e3.probe(50, 55).strength === "弱", e3.probe(50, 55).strength, "弱");

let e5 = new EM.ElectricField({ charges: [{ x: 10, y: 10, q: 1 }, { x: 20, y: 10, q: 1 }, { x: 30, y: 10, q: -1 }, { x: 40, y: 10, q: 1 }] });
let rLim = e5.addCharge({ x: 50, y: 50, q: 1 });
let e5b = new EM.ElectricField({ charges: [{ x: 50, y: 55, q: 1 }] });
let rOvl = e5b.addCharge({ x: 50, y: 50, q: 1 });
let rmId = e5b.getState().charges[0].id, rmOk = e5b.removeCharge(rmId);
let rOk = e5b.addCharge({ x: 50, y: 50, q: -1 });
ok("EM-05", rLim.ok === false && rLim.key === "limit" &&
  rOvl.ok === false && rOvl.key === "overlap" && rmOk === true && rOk.ok === true,
  `limit=${rLim.key},overlap=${rOvl.key},rm=${rmOk},add=${rOk.ok}`, "limit/overlap 拒，删后可放");

let t6 = e3.traceLine(50, 53.2, 1), l6 = t6[t6.length - 1];
ok("EM-06", t6.length === 41 && near(l6.x, 50, 1e-9) && near(l6.y, 97.2, 1e-6),
  `n=${t6.length},last=(${l6.x},${l6.y})`, "41 点，末点 (50,97.2)");
let t7 = e2.traceLine(33.2, 50, 1), l7 = t7[t7.length - 1];
ok("EM-07", t7.length === 31 && near(l7.x, 66.2, 1e-6) && near(l7.y, 50, 1e-9),
  `n=${t7.length},last=(${l7.x},${l7.y})`, "31 点，末点 (66.2,50)，止于异号电荷");

let fl = e2.fieldLines();
let posLines = fl.filter(l => l.q > 0), negLines = fl.filter(l => l.q < 0);
let nl = negLines[0].pts, nlFirst = nl[0], nlLast = nl[nl.length - 1];
let dFirst = Math.hypot(nlFirst.x - 70, nlFirst.y - 50), dLast = Math.hypot(nlLast.x - 70, nlLast.y - 50);
ok("EM-25", posLines.length === 16 && negLines.length === 16 &&
  near(posLines[0].pts[0].x, 33.2, 1e-9) && near(posLines[0].pts[0].y, 50, 1e-9) &&
  dFirst > 25 && near(dLast, 3.2, 1e-6),
  `正${posLines.length}/负${negLines.length}条，负首点距=${dFirst.toFixed(1)}，负末点距=${dLast.toFixed(4)}`,
  "各 16 条；负电荷点列反转：首点远端，末点=种子 3.2");

/* ---------- 二、静磁场 ---------- */
let d = new EM.DipoleField({ magnet: { x: 50, y: 50, angleDeg: 0 } });
let b8 = d.fieldAt(76, 50);
ok("EM-08", near(b8.x, 0.22758307, 1e-6) && near(b8.y, 0, 1e-12) && d.needleAngle(76, 50) === 0,
  `B=(${b8.x},${b8.y}),ang=${d.needleAngle(76, 50)}`, "B=(0.22758307,0), 0°");
let b9 = d.fieldAt(50, 76);
ok("EM-09", near(b9.x, -0.11379153, 1e-6) && near(b9.y, 0, 1e-12) && d.needleAngle(50, 76) === 180,
  `B=(${b9.x},${b9.y}),ang=${d.needleAngle(50, 76)}`, "B=(-0.11379153,0), 180°");
let d2 = new EM.DipoleField({ magnet: { x: 50, y: 50, angleDeg: 90 } });
let b10 = d2.fieldAt(76, 50);
ok("EM-10", near(b10.y, -0.11379153, 1e-6) && d2.needleAngle(76, 50) === 90,
  `B=(${b10.x},${b10.y}),ang=${d2.needleAngle(76, 50)}`, "B.y=-0.11379153, 90°");
let b11 = d.fieldAt(51, 50);
ok("EM-11", b11.x === 0 && b11.y === 0, `B=(${b11.x},${b11.y})`, "(0,0)");
let fd1 = JSON.stringify(d.filingsDots()), fd2 = JSON.stringify(d.filingsDots());
let fdPts = d.filingsDots();
ok("EM-12", fd1 === fd2 && fdPts.length > 0 &&
  fdPts.every(p => p.x >= 2 && p.x <= 98 && p.y >= 2 && p.y <= 98),
  `两次一致=${fd1 === fd2},点数=${fdPts.length}`, "确定性静态纹理");

/* ---------- 三、换向器 ---------- */
let c = new EM.Commutator({});
let s13 = c.getState();
ok("EM-13", s13.angleDeg === 0 && s13.phase === 0 && s13.half === 0 &&
  s13.currentLabel === "电流：上→右" && s13.phaseText.startsWith("①"),
  `phase=${s13.phase},${s13.currentLabel}`, "phase 0, 电流：上→右, ①");
c.setAngle(90);
ok("EM-14", c.phase() === 1 && c.half() === 0 && c.currentLabel() === "电流：上→右",
  `phase=${c.phase()},${c.currentLabel()}`, "phase 1, 电流不变");
c.setAngle(180);
ok("EM-15", c.phase() === 2 && c.half() === 1 && c.currentLabel() === "电流：上→左",
  `phase=${c.phase()},${c.currentLabel()}`, "phase 2, 电流：上→左");
c.setAngle(270);
let p3ok = c.phase() === 3 && c.half() === 1;
c.setAngle(360);
ok("EM-16", p3ok && c.phase() === 0 && c.half() === 0 && c.currentLabel() === "电流：上→右",
  `270°→phase3=${p3ok},360°→phase=${c.phase()},${c.currentLabel()}`, "半圈翻转，整圈回位");
let c2 = new EM.Commutator({});
c2.advance(1.0);
let s17 = c2.getState();
ok("EM-17", near(s17.angleDeg, 72, 1e-9) && near(s17.turns, 0.2, 1e-9) && s17.slowFactor === 0.2,
  `ang=${s17.angleDeg},turns=${s17.turns},slow=${s17.slowFactor}`, "72°, 0.2 圈, ×0.2");
ok("EM-18", EM.Commutator.PHASES.length === 4 && EM.Commutator.PHASES[2].includes("换向器切换"),
  EM.Commutator.PHASES.join("|").slice(0, 20) + "…", "四步文字与旧 PHASES 一致");

/* ---------- 四、电磁感应 ---------- */
let ind = new EM.Induction({ pole: "N" });
ind.update(28);
let r19 = ind.update(38);
ok("EM-19", r19.dir === "in" && r19.top === "⊗" && r19.bot === "⊙" &&
  near(r19.dPhi, 3.344482, 1e-5) && r19.statusText.includes("逆时针"),
  `dir=${r19.dir},${r19.top}/${r19.bot},dPhi=${r19.dPhi.toFixed(5)}`, "in, ⊗/⊙, dPhi=3.344482");
let r20 = ind.update(28);
ok("EM-20", r20.dir === "out" && r20.top === "⊙" && r20.bot === "⊗" && r20.statusText.includes("顺时针"),
  `dir=${r20.dir},${r20.top}/${r20.bot}`, "out, ⊙/⊗, 拔出顺时针");
let indS = new EM.Induction({ pole: "S" });
indS.update(28);
ok("EM-21", indS.update(38).dir === "out", indS.update(38).dir, "S 极插入 → out（镜像）");
let r22 = ind.update(28);
ok("EM-22", r22.dir === "none" && r22.statusText === "磁铁不动：Φ 不变 → 无感应电流",
  r22.statusText, "无电流");
let indW = new EM.Induction({ pole: "N" });
indW.update(28);
let r23 = indW.update(28.1);
ok("EM-23", r23.dir === "none" && near(r23.dPhi, 0.018986, 1e-5),
  `dir=${r23.dir},dPhi=${r23.dPhi.toFixed(6)}`, "阈下 0.018986 → none");
let indC = new EM.Induction({});
indC.setMagnetX(10);
let cx1 = indC.getState().magnetX, phi1 = indC.phi();
indC.setMagnetX(60);
ok("EM-24", cx1 === 14 && near(phi1, 2.702703, 1e-6) && indC.getState().magnetX === 50,
  `clamp=${cx1}/${indC.getState().magnetX},phi=${phi1.toFixed(6)}`, "钳制 14/50, φ=2.702703");

/* ---------- 五、AX01 与工程口径 ---------- */
let axE = e1.getState().ax;
ok("EM-26", axE.assumptions.join("").includes("q=±1") && e1.getState().approxTag === "点电荷模型·q=±1示意单位",
  e1.getState().approxTag, "q=±1 显性化");
let axB = d.getState().ax;
ok("EM-27", (axB.assumptions.join("") + axB.approximations.join("")).includes("静磁场示意") &&
  d.getState().approxTag === "静磁场示意·偶极子近似",
  d.getState().approxTag, "静磁场示意显性化");
let threw = 0;
try { new EM.ElectricField({ charges: [{ x: 1, y: 2 }] }); } catch (e) { threw++; }
try { e1.addCharge({ x: "a", y: 1, q: 1 }); } catch (e) { threw++; }
try { new EM.Induction({ pole: "X" }); } catch (e) { threw++; }
try { c.advance("x"); } catch (e) { threw++; }
try { d.needleAngle(NaN, 1); } catch (e) { threw++; }
try { e1.traceLine(1, 1, 0); } catch (e) { threw++; }
ok("EM-28", threw === 6, `抛错 ${threw}/6`, "6/6 非法输入抛错");
let stCopy = e3.getState();
stCopy.charges[0].x = 999;
ok("EM-29", e3.getState().charges[0].x === 50, `内部 x=${e3.getState().charges[0].x}`, "防御性拷贝");
let snap = e3.snapshot();
e3.setCharges([{ x: 1, y: 1, q: -1 }]);
e3.restore(snap);
let rs = e3.getState();
ok("EM-30", rs.count === 1 && rs.charges[0].x === 50 && rs.charges[0].q === 1,
  `count=${rs.count},x=${rs.charges[0].x}`, "快照往返逐位");

console.log(`EM 真值断言：${n} 条，FAIL ${FAIL.length}`);
if (FAIL.length) {
  for (const f of FAIL) console.log(`FAIL ${f.no}: measured=${f.measured} expected=${f.expected}`);
  process.exit(1);
}
console.log("PASS");
