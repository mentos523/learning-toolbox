/* 波动真值断言门禁（引擎层，物理推广批3）
 * 口径：~/workspace/phy-audit/wave-truth-criteria.md v1.0（WV-01…WV-24 纯函数部分；
 *   WV-25/26/27 为页级行为，白队 headless 页级实测）
 * 方法：Node 直载 assets/engine/core.js + wave.js（window 垫片，无 DOM），
 *   期望值全部独立手算硬编码（见口径文档"手算过程"节），非恒真式；FAIL>0 非零退出。
 * 白队独立复验用此脚本放行；实现队自查不计入放行依据。
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const window = {};
for (const f of ["assets/engine/core.js", "assets/engine/wave.js"]) {
  new Function("window", fs.readFileSync(path.join(ROOT, f), "utf8"))(window);
}
const W = window.Eng && window.Eng.Wave;
if (!W) { console.error("FATAL: Eng.Wave 未挂载"); process.exit(2); }

const FAIL = [];
let n = 0;
function ok(no, cond, meas, exp) {
  n++;
  if (!cond) FAIL.push({ no, measured: meas, expected: exp });
}
const near = (a, b, t) => Math.abs(a - b) <= t;

/* ---------- 一、解析式与全参数化 ---------- */
let w = new W({ A: 3, f: 440, phiDeg: 0, v: 340 });
ok("WV-01", near(w.getState().lambda, 0.77272727, 1e-6), `lambda=${w.getState().lambda}`, "0.77272727");
let w60 = new W({ A: 3, f: 60, phiDeg: 0, v: 340 });
ok("WV-02", near(w60.getState().lambda, 5.66666667, 1e-6), `lambda=${w60.getState().lambda}`, "5.66666667");
ok("WV-03", near(w.valueAt(0.1, 0.002), -2.99997951, 1e-6), `y=${w.valueAt(0.1, 0.002)}`, "-2.99997951");
ok("WV-03b", near(w.valueAt(0.25, 0), -2.68548987, 1e-6), `y=${w.valueAt(0.25, 0)}`, "-2.68548987");
ok("WV-04", near(w.getState().k, 8.13118099, 1e-6) && near(w.getState().omega, 2764.60153516, 1e-6),
  `k=${w.getState().k},omega=${w.getState().omega}`, "k=8.13118099,omega=2764.60153516");
w.set({ A: 4.5, phiDeg: 45 });
ok("WV-05", w.getState().A === 4.5 && w.getState().phiDeg === 45, `A=${w.getState().A},phi=${w.getState().phiDeg}`, "A=4.5,phi=45");
let w3 = new W({ A: 3, f: 440, phiDeg: 45, v: 340 });
ok("WV-05", near(w3.valueAt(0, 0), 2.12132034, 1e-6), `y(0,0)=${w3.valueAt(0, 0)}`, "2.12132034");
let w440 = new W({ A: 3, f: 440, phiDeg: 0, v: 340 });
let w880 = new W({ A: 3, f: 880, phiDeg: 0, v: 340 });
ok("WV-06", near(w440.valueAt(0.05, 0.001), 2.11739653, 1e-6) && near(w880.valueAt(0.05, 0.001), -2.99997951, 1e-6),
  `y440=${w440.valueAt(0.05, 0.001)},y880=${w880.valueAt(0.05, 0.001)}`, "y440=2.11739653,y880=-2.99997951");
ok("WV-06", near(w440.getState().lambda / w880.getState().lambda, 2.0, 1e-12),
  `lam比=${w440.getState().lambda / w880.getState().lambda}`, "λ1/λ2=f2/f1=2");

/* ---------- 二、相位回绕 ---------- */
ok("WV-07", W.phaseWrap(360) === 0 && W.phaseWrap(370) === 10 && W.phaseWrap(-15) === 345 && W.phaseWrap(720.5) === 0.5,
  `wrap=${[W.phaseWrap(360), W.phaseWrap(370), W.phaseWrap(-15), W.phaseWrap(720.5)]}`, "0,10,345,0.5");
let w0 = new W({ A: 3, f: 440, phiDeg: 0, v: 340 });
let w360 = new W({ A: 3, f: 440, phiDeg: 360, v: 340 });
ok("WV-08", near(w0.valueAt(0.05, 0.001), w360.valueAt(0.05, 0.001), 1e-12) && near(w0.valueAt(0.05, 0.001), 2.11739653, 1e-6),
  `y0=${w0.valueAt(0.05, 0.001)},y360=${w360.valueAt(0.05, 0.001)}`, "0°≡360°，y=2.11739653");

/* ---------- 三、双波合成 ---------- */
let wA = new W({ A: 3, f: 440, phiDeg: 0, v: 340 });
let wB = new W({ A: 2, f: 440, phiDeg: 180, v: 340 });
{
  const xs = wA.getState().xSpanM, u = 0.05 / xs, dp = 2 * Math.PI * 440 * 0.001;
  const s = W.superpose([wA, wB], u, dp);
  ok("WV-09", near(s, 0.70579884, 1e-6), `sum=${s}`, "0.70579884");
}
let wA2 = new W({ A: 3, f: 440, phiDeg: 30, v: 340 });
let wB2 = new W({ A: 2, f: 440, phiDeg: 210, v: 340 });
{
  const xs = wA2.getState().xSpanM, u = 0.12 / xs, dp = 2 * Math.PI * 440 * 0.003;
  const s = W.superpose([wA2, wB2], u, dp);
  ok("WV-10", near(s, 0.99992411, 1e-6), `sum=${s}`, "0.99992411");
}

/* ---------- 四、发声边界 ---------- */
ok("WV-11", W.audible(19.9, 2000).ok === false && W.audible(19.9, 2000).key === "too-low" && W.audible(20, 2000).ok === true,
  `19.9=${JSON.stringify(W.audible(19.9, 2000))},20=${JSON.stringify(W.audible(20, 2000))}`, "19.9→too-low,20→ok");
ok("WV-12", W.audible(2000, 2000).ok === true && W.audible(2000.1, 2000).key === "too-high",
  `2000=${JSON.stringify(W.audible(2000, 2000))},2000.1=${JSON.stringify(W.audible(2000.1, 2000))}`, "2000→ok,2000.1→too-high");
ok("WV-13", W.audible(1500, 1200).key === "too-high", `1500/1200=${JSON.stringify(W.audible(1500, 1200))}`, "上限取配置值");

/* ---------- 五、频闪 ---------- */
ok("WV-15", W.driftRateHz(440) === 3 && W.driftRateHz(1000) === 3 && W.driftRateHz(2) === 2 && W.driftRateHz(0.5) === 0.5,
  `drift=${[W.driftRateHz(440), W.driftRateHz(1000), W.driftRateHz(2), W.driftRateHz(0.5)]}`, "3,3,2,0.5（恒≤3）");
ok("WV-16", near(W.demoPhase(3, 1), 18.84955592, 1e-6), `demoPhase=${W.demoPhase(3, 1)}`, "18.84955592");

/* ---------- 六、显示映射 ---------- */
let wsp = new W({ A: 3, f: 440, phiDeg: 0, v: 340, axis: "space", NP: 3, fRef: 440 });
ok("WV-17", near(wsp.getState().xSpanM, 2.31818182, 1e-6) && near(wsp.displayPhase(1), -18.84955592, 1e-6),
  `xSpan=${wsp.getState().xSpanM},phase(1)=${wsp.displayPhase(1)}`, "xSpan=2.31818182,phase(1)=-18.84955592");
ok("WV-18", near(w880.getState().k / w440.getState().k, 2.0, 1e-12),
  `k比=${w880.getState().k / w440.getState().k}`, "k2/k1=f2/f1=2");
let wtm = new W({ A: 3, f: 50, phiDeg: 0, v: 340, axis: "time", NP: 3, fRef: 50 });
ok("WV-19", near(wtm.getState().tSpanS, 0.06, 1e-12) && near(wtm.displayPhase(1), 18.84955592, 1e-6),
  `tSpan=${wtm.getState().tSpanS},phase(1)=${wtm.displayPhase(1)}`, "tSpan=0.06,phase(1)=18.84955592");

/* ---------- 七、契约与鲁棒 ---------- */
let threw = 0;
for (const bad of [{ A: 3, f: 0 }, { A: -1, f: 440 }, { A: 3, f: 440, v: 0 }, { A: 3, f: 440, phiDeg: NaN }, { A: 3, f: 440, axis: "zzz" }]) {
  try { new W(bad); } catch (e) { threw++; }
}
ok("WV-20", threw === 5, `抛错${threw}/5`, "5/5 非法输入抛错");
let wsnap = new W({ A: 3, f: 440, phiDeg: 30, v: 340 });
const snap = wsnap.snapshot();
wsnap.set({ A: 9, f: 100, phiDeg: 90 });
wsnap.restore(snap);
ok("WV-21", wsnap.getState().A === 3 && wsnap.getState().f === 440 && wsnap.getState().phiDeg === 30,
  `restore后A=${wsnap.getState().A},f=${wsnap.getState().f},phi=${wsnap.getState().phiDeg}`, "A=3,f=440,phi=30");
let wdc = new W({ A: 3, f: 440, phiDeg: 0, v: 340 });
const stc = wdc.getState();
stc.A = 999; stc.ax.assumptions.push("污染");
ok("WV-22", wdc.getState().A === 3 && wdc.getState().ax.assumptions.length === 4, "改返回对象不影响实例", "防御性拷贝");
const stx = new W({ A: 3, f: 440 }).getState();
ok("WV-23", stx.approxTag === "理想正弦波近似" && Array.isArray(stx.ax.assumptions) && stx.ax.assumptions.length > 0
  && Array.isArray(stx.ax.approximations) && stx.ax.approximations.length > 0
  && typeof stx.ax.errorEstimate === "string" && stx.ax.errorEstimate.length > 0,
  `approxTag=${stx.approxTag},AX01三字段就位`, "理想正弦波近似+AX01");
let wdet = new W({ A: 3, f: 440, phiDeg: 30, v: 340 });
ok("WV-24", wdet.valueAt(0.1, 0.002) === wdet.valueAt(0.1, 0.002) && wdet.displayPhase(0.5) === wdet.displayPhase(0.5),
  "同输入逐位一致", "确定性");

console.log(`\n[qa-wave-truth] 断言 ${n} 条，FAIL ${FAIL.length}`);
for (const f of FAIL) console.log(`  FAIL ${f.no}: 实测=${f.measured} 期望=${f.expected}`);
process.exit(FAIL.length > 0 ? 1 : 0);
