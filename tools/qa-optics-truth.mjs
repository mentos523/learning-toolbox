/* 光学真值断言门禁（引擎层）
 * 口径：~/workspace/phy-audit/optics-truth-criteria.md v1.0（OPT-L/M/R/P）
 * 方法：Node 直载 assets/engine/core.js + optics.js（window 垫片，无 DOM），
 *   期望值全部独立手算硬编码（见口径文档 §五），非恒真式；FAIL>0 非零退出。
 * 白队独立复验用此脚本放行；实现队自查不计入放行依据。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const window = {};
for (const f of ["assets/engine/core.js", "assets/engine/optics.js"]) {
  new Function("window", fs.readFileSync(path.join(ROOT, f), "utf8"))(window);
}
const O = window.Eng && window.Eng.Optics;
if (!O) { console.error("FATAL: Eng.Optics 未挂载"); process.exit(2); }

const FAIL = [];
let n = 0;
function ok(no, cond, meas, exp) {
  n++;
  if (!cond) FAIL.push({ no, measured: meas, expected: exp });
}
const near = (a, b, t) => Math.abs(a - b) <= t;
const finiteSeg = (s) => [s.x1, s.y1, s.x2, s.y2].every(Number.isFinite);

/* ---------- 透镜 ---------- */
let L = O.solveLens({ lensX: 50, f: 15, objX: 22, objTopY: 40, axisY: 52 });
ok("OPT-L01", near(L.v, 32.3077, 1e-4) && L.kind === "real", `v=${L.v},kind=${L.kind}`, "v=32.3077,kind=real");
ok("OPT-L01", near(L.m, -1.15385, 1e-4) && L.imageNature === "倒立放大实像", `m=${L.m},${L.imageNature}`, "m=-1.15385,倒立放大实像");
ok("OPT-L01", near(L.imageTip.x, 82.3077, 1e-4) && near(L.imageTip.y, 65.8462, 1e-4), JSON.stringify(L.imageTip), "{x:82.3077,y:65.8462}");

L = O.solveLens({ lensX: 50, f: 15, objX: 20, objTopY: 40, axisY: 52 });
ok("OPT-L02", near(L.v, 30, 1e-9) && L.imageNature === "倒立等大实像", `v=${L.v},${L.imageNature}`, "v=30,倒立等大实像");

L = O.solveLens({ lensX: 50, f: 15, objX: -10, objTopY: 40, axisY: 52 });
ok("OPT-L03", near(L.v, 20, 1e-9) && near(L.m, -1 / 3, 1e-9) && L.imageNature === "倒立缩小实像",
  `v=${L.v},m=${L.m},${L.imageNature}`, "v=20,m=-0.3333,倒立缩小实像");

L = O.solveLens({ lensX: 50, f: 15, objX: 35, objTopY: 40, axisY: 52 });
ok("OPT-L04", L.v === Infinity && L.kind === "none" && L.imageNature === "不成像（u=f）" && L.imageTip === null,
  `v=${L.v},kind=${L.kind},${L.imageNature}`, "v=Infinity,none,不成像（u=f）,imageTip=null");
const fRay = L.rays.find(r => r.name === "focus");
ok("OPT-L08", fRay && fRay.degenerate === true && fRay.segments.length === 0, JSON.stringify(fRay), "focus 退化、空段");

L = O.solveLens({ lensX: 50, f: 15, objX: 42, objTopY: 40, axisY: 52 });
ok("OPT-L05", near(L.v, -17.1429, 1e-4) && L.kind === "virtual" && near(L.m, 2.14286, 1e-4) && L.imageNature === "正立放大虚像",
  `v=${L.v},kind=${L.kind},m=${L.m},${L.imageNature}`, "v=-17.1429,virtual,m=2.14286,正立放大虚像");
ok("OPT-L05", near(L.imageTip.x, 32.8571, 1e-4) && near(L.imageTip.y, 26.2857, 1e-4), JSON.stringify(L.imageTip), "{x:32.8571,y:26.2857}");
// OPT-L06：交点一致性（自线段端点重算交点，非恒真式）
function intersect(s1, s2) {
  const d = (s1.x1 - s1.x2) * (s2.y1 - s2.y2) - (s1.y1 - s1.y2) * (s2.x1 - s2.x2);
  const px = ((s1.x1 * s1.y2 - s1.y1 * s1.x2) * (s2.x1 - s2.x2) - (s1.x1 - s1.x2) * (s2.x1 * s2.y2 - s2.y1 * s2.x2)) / d;
  const py = ((s1.x1 * s1.y2 - s1.y1 * s1.x2) * (s2.y1 - s2.y2) - (s1.y1 - s1.y2) * (s2.x1 * s2.y2 - s2.y1 * s2.x2)) / d;
  return { x: px, y: py };
}
for (const [ux, desc] of [[22, "L01实像"], [42, "L05虚像"]]) {
  const S = O.solveLens({ lensX: 50, f: 15, objX: ux, objTopY: 40, axisY: 52 });
  const pExit = S.rays.find(r => r.name === "parallel").segments[1];
  const ctr = S.rays.find(r => r.name === "center").segments[0];
  const ip = intersect(pExit, ctr);
  ok("OPT-L06", near(ip.x, S.imageTip.x, 1e-9) && near(ip.y, S.imageTip.y, 1e-9), `${desc}交点=${JSON.stringify(ip)}`, `imageTip=${JSON.stringify(S.imageTip)}`);
  const objSide = Math.sign(40 - 52), imgSide = Math.sign(S.imageTip.y - 52);
  ok("OPT-L06", S.kind === "real" ? imgSide === -objSide : imgSide === objSide, `${desc}像侧=${imgSide}`, S.kind === "real" ? "异侧（倒立）" : "同侧（正立）");
}
L = O.solveLens({ lensX: 50, f: 15, objX: 22, objTopY: 40, axisY: 52 });
ok("OPT-L07", L.focusPts.length === 2 && near(L.focusPts[0].x, 35, 1e-9) && near(L.focusPts[1].x, 65, 1e-9) && L.focusPts[0].y === 52,
  JSON.stringify(L.focusPts), "[{x:35,y:52},{x:65,y:52}]（只读数据，不含拖拽语义）");
// 脏线回归：所有返回线段坐标有限
for (const ux of [22, 20, -10, 35, 42]) {
  const S = O.solveLens({ lensX: 50, f: 15, objX: ux, objTopY: 40, axisY: 52 });
  const bad = S.rays.flatMap(r => r.segments).filter(s => !finiteSeg(s));
  ok("OPT-L08", bad.length === 0, `${ux}: 脏线段=${bad.length}`, "0");
}
// 非法输入拒绝（ENG-66）
let threw = false;
try { O.solveLens({ lensX: 50, f: -5, objX: 22, objTopY: 40, axisY: 52 }); } catch (e) { threw = true; }
ok("OPT-ENG66", threw, "f=-5 未抛错", "抛错");

/* ---------- 平面镜 ---------- */
let M = O.solveMirror({ mirrorX: 50, fromX: 25, fromY: 58, hitX: 50, hitY: 61 });
ok("OPT-M01", near(M.iDeg, 6.8428, 1e-3) && near(M.rDeg, M.iDeg, 1e-9), `i=${M.iDeg},r=${M.rDeg}`, "i=6.8428,r=i");
ok("OPT-M01", M.reflected.to.x === 25 && M.reflected.to.y === 64, JSON.stringify(M.reflected.to), "{x:25,y:64}（水平分量反向）");
ok("OPT-M02", M.imageX === 75 && M.imageDist === 25 && M.imageNature === "正立等大虚像",
  `imageX=${M.imageX},dist=${M.imageDist},${M.imageNature}`, "imageX=75,dist=25,正立等大虚像");
ok("OPT-M02", M.virtualExt.to.x === 75 && M.virtualExt.to.y === 58, JSON.stringify(M.virtualExt.to), "{x:75,y:58}");
M = O.solveMirror({ mirrorX: 50, fromX: 30, fromY: 58, hitX: 50, hitY: 61 });
ok("OPT-M02", M.imageX === 70 && M.imageDist === 20, `imageX=${M.imageX},dist=${M.imageDist}`, "imageX=70,dist=20");

/* ---------- 折射 ---------- */
let R = O.solveRefraction({ iDeg: 30, n1: 1, n2: 1.33 });
ok("OPT-R01", near(R.rDeg, 22.0824, 1e-3) && R.tir === false, `r=${R.rDeg}`, "r=22.0824");
R = O.solveRefraction({ iDeg: 60, n1: 1, n2: 1.33 });
ok("OPT-R02", near(R.rDeg, 40.6287, 1e-3), `r=${R.rDeg}`, "r=40.6287");
R = O.solveRefraction({ iDeg: 0, n1: 1, n2: 1.33 });
ok("OPT-R03", R.rDeg === 0 && R.stateText === "垂直入射：不偏折（i = r = 0）", `${R.rDeg},${R.stateText}`, "r=0,垂直入射：不偏折（i = r = 0）");
R = O.solveRefraction({ iDeg: 80, n1: 1, n2: 1.33 });
ok("OPT-R04", near(R.rDeg, 47.7704, 1e-3), `r=${R.rDeg}`, "r=47.7704");
for (const id of [30, 60, 80]) {
  R = O.solveRefraction({ iDeg: id, n1: 1, n2: 1.33 });
  ok("OPT-R05", R.rDeg < id && R.bentTowardNormal && R.stateText.includes("向法线偏折（r < i）"),
    `i=${id},r=${R.rDeg}`, "r<i,向法线偏折");
  // 方向向量几何自洽：折射单位向量与法线夹角满足斯涅尔
  const angR = Math.asin(Math.min(1, Math.abs(R.refractedUnit.x))) * 180 / Math.PI;
  ok("OPT-R05", near(Math.sin(angR * Math.PI / 180), Math.sin(id * Math.PI / 180) / 1.33, 1e-9), `i=${id}向量角=${angR}`, "sin r = sin i/1.33");
}
R = O.solveRefraction({ iDeg: 60, n1: 1.33, n2: 1 });
ok("OPT-R06", R.tir === true && R.rDeg === null && R.refractedUnit === null, `tir=${R.tir},r=${R.rDeg}`, "tir=true,r=null（不给假数）");

/* ---------- 小孔成像 ---------- */
let P = O.solvePinhole({ objX: 31, objTopY: 39, objBaseY: 61, holeX: 55, holeY: 50, scrX: 88, aperture: 2 });
ok("OPT-P01", near(P.m, 1.375, 1e-9) && P.zoomWord === "放大", `m=${P.m},${P.zoomWord}`, "m=1.375,放大");
ok("OPT-P01", near(P.imgTopY, 34.875, 1e-9) && near(P.imgBottomY, 65.125, 1e-9), `${P.imgTopY},${P.imgBottomY}`, "34.875,65.125");
ok("OPT-P01", P.stateText === "倒立的实像（孔小：暗但清晰）" && P.blur === false, P.stateText, "倒立的实像（孔小：暗但清晰）");
P = O.solvePinhole({ objX: 22, objTopY: 39, objBaseY: 61, holeX: 55, holeY: 50, scrX: 88, aperture: 2 });
ok("OPT-P02", near(P.m, 1, 1e-9) && P.zoomWord === "等大", `m=${P.m},${P.zoomWord}`, "m=1,等大");
P = O.solvePinhole({ objX: 43, objTopY: 39, objBaseY: 61, holeX: 55, holeY: 50, scrX: 88, aperture: 2 });
ok("OPT-P03", near(P.m, 2.75, 1e-9) && P.zoomWord === "放大", `m=${P.m}`, "m=2.75");
P = O.solvePinhole({ objX: 17, objTopY: 39, objBaseY: 61, holeX: 55, holeY: 50, scrX: 88, aperture: 2 });
ok("OPT-P04", near(P.m, 0.868421, 1e-5) && P.zoomWord === "缩小", `m=${P.m},${P.zoomWord}`, "m=0.8684,缩小");
// OPT-P05：过孔心交叉（自线段端点重算 x=55 处 y）
P = O.solvePinhole({ objX: 31, objTopY: 39, objBaseY: 61, holeX: 55, holeY: 50, scrX: 88, aperture: 2 });
for (const ry of P.rays) {
  const s = ry.segments[0];
  const yAt55 = s.y1 + (s.y2 - s.y1) * ((55 - s.x1) / (s.x2 - s.x1));
  ok("OPT-P05", near(yAt55, 50, 1e-9), `${ry.name}:x=55处y=${yAt55}`, "50.0（过孔心）");
}
ok("OPT-P05", P.imgBottomY > 50 && 50 > P.imgTopY, "像底>孔>像顶", "倒立");
P = O.solvePinhole({ objX: 31, objTopY: 39, objBaseY: 61, holeX: 55, holeY: 50, scrX: 88, aperture: 3.5 });
ok("OPT-P06", P.blur === false, "aperture=3.5,blur=false", "边界不警告");
P = O.solvePinhole({ objX: 31, objTopY: 39, objBaseY: 61, holeX: 55, holeY: 50, scrX: 88, aperture: 4 });
ok("OPT-P06", P.blur === true && P.stateText.includes("孔太大：变亮但变模糊"), P.stateText, "blur=true,警告文本");

/* ---------- AX01 ---------- */
const ax = O.ax();
ok("OPT-AX01", Array.isArray(ax.assumptions) && ax.assumptions.length > 0 && Array.isArray(ax.approximations) && ax.approximations.length > 0 && typeof ax.errorEstimate === "string" && ax.errorEstimate.length > 0,
  "AX01 三字段就位", "assumptions/approximations/errorEstimate 非空");
ok("OPT-AX01", ax.assumptions.some(t => t.includes("薄透镜")) && ax.assumptions.some(t => t.includes("近轴")),
  "含薄透镜/近轴声明", "薄透镜近似+近轴光线显性化");

console.log(`\n[qa-optics-truth] 断言 ${n} 条，FAIL ${FAIL.length}`);
for (const f of FAIL) console.log(`  FAIL ${f.no}: 实测=${f.measured} 期望=${f.expected}`);
process.exit(FAIL.length > 0 ? 1 : 0);
