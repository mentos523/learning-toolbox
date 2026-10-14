#!/usr/bin/env node
/* ============================================================================
 * 白队 · 几何绘图程序化审计（2026-10-14）
 *
 * 背景：用户目检发现两类绘图错误——①"角的绘图位置不对"；②"直线延长线虚线
 * 部分都不在一条直线上"。本脚本做全量数值审计，只审计、不修复。
 *
 * 方法（供绿队对抗复核）：
 *  1. 原语级：在 vm + DOM 桩里加载 modules/math/js/geom-primitives.js，对
 *     angleArc / circleArc / polar / angleOf / rightAngle 做单元断言——验证
 *     SVG arc 的 large-arc / sweep 标志与起止点是否符合数学惯例（y 翻转已计入）。
 *     用 SVG 规范 F.6.5 端点→圆心换算反推圆心，再验证弧中点落在预期位置，
 *     证明"画出来的弧"确实是从 a1 沿逆时针到 a2 的那一段。
 *  2. 数据级：加载 modules/math/data/g00.js…g13.js（window.MATH_CH），遍历
 *     全部页面（含习题页、auxInteraction），按 interaction 类型抽取"帧"
 *     （step-play/tap-highlight/compare-toggle/proof-replay/construction-step
 *     的 DSL shapes；vertex-drag/angle-protractor/pythag-grow/ladder-slide/
 *     ratio-slider 按渲染器同款数学重建几何；net-fold/cut-reassemble 专项）。
 *  3. 断言全部在逻辑坐标（0–100，y 向上）下进行——渲染链 geoFrame 及各交互
 *     自建帧均为均匀缩放+平移（唯一例外：angle-protractor 的 Y 缩放 2.94 vs
 *     X 3.32，但其角度几何全在像素空间按"度"构造，自洽，不影响角度正确性），
 *     均匀变换保持共线/角度/比例，故逻辑坐标断言等价于像素断言。
 *
 * 容差（TOL，审计口径，详见报告）：
 *  - 逻辑单位 1 ≈ 标准帧 3.32px；手写坐标精度通常 0.1–1。
 *  - vertex 0.75：端点重合判定（≈2.5px）。
 *  - arcDir 3°：弧端点方向 vs 边方向（r=13 时端点偏移 ≈0.7 单位≈2.3px，临界可见）。
 *  - ext 2°：延长线共线判定（与 180° 的偏差）。
 *  - right 2°：直角 90±2°。
 *  - labelDeg 2.5°：标注度数 vs 实际 sweep。
 * 输出：本脚本同目录 geom-audit-20261014.json（机器可读失败清单）。
 * 用法：node tools/geom-audit-20261014.mjs [--json-only]
 * ========================================================================== */
import { readFileSync, writeFileSync } from "node:fs";
import vm from "node:vm";
import path from "node:path";
import { fileURLToPath } from "node:url";

const HERE = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(HERE, "..");

const TOL = {
  vertex: 0.75,      // 端点重合（逻辑单位）
  arcDir: 3.0,       // 弧端点方向 vs 边方向（度）
  ext: 2.0,          // 延长线共线：与 180° 的偏差（度）
  right: 2.0,        // 直角 90±2（度）
  labelDeg: 2.5,     // 标注度数 vs 实际（度）
  extWarn: 8.0,      // 延长线偏差 warn 上限（度）
  ptCircle: 1.5,     // 圆上点偏差 warn（逻辑单位）
  ptCircleNear: 4.0, // "靠近圆周"判定带（逻辑单位）
  squareSide: 0.5,   // 正方形边长一致性（逻辑单位）
  foldEdge: 1e-4,    // 折叠轴落在面顶点（逻辑单位）
  cutCongruent: 0.75,// 拼块全等（逻辑单位）
  segZero: 1e-9,
};

/* ================= 0. 数学小工具（逻辑坐标 y 向上，角度数学惯例度） ========= */
const rad = (d) => (d * Math.PI) / 180;
const deg = (r) => (r * 180) / Math.PI;
const norm360 = (d) => { d %= 360; return d < 0 ? d + 360 : d; };
const dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
const dirOf = (ax, ay, bx, by) => norm360(deg(Math.atan2(by - ay, bx - ax))); // 逻辑坐标 y 向上：数学角 = atan2(dy,dx)，无取反。注意 G.angleOf 是对 y-down 像素坐标做取反，两者不可混用（2026-10-14 曾有人在此加负号致 206 处误改，已回滚）
const angDiff = (a, b) => Math.abs(norm360(a - b + 180) - 180); // [0,180]
const ptSegDist = (px, py, ax, ay, bx, by) => { // 点到线段距离
  const dx = bx - ax, dy = by - ay;
  const L2 = dx * dx + dy * dy;
  let t = L2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  return dist(px, py, ax + dx * t, ay + dy * t);
};

/* ================= 1. DOM 桩 + 原语加载 ===================================== */
function makeEl(tag) {
  const e = {
    tag, attrs: {}, children: [], textContent: "", innerHTML: "",
    parentNode: null, style: {},
    setAttribute(k, v) { this.attrs[k] = String(v); },
    getAttribute(k) { return this.attrs[k]; },
    appendChild(c) { this.children.push(c); c.parentNode = this; return c; },
    insertBefore(c) { this.children.unshift(c); c.parentNode = this; return c; },
    removeChild(c) {
      const i = this.children.indexOf(c);
      if (i >= 0) this.children.splice(i, 1);
      c.parentNode = null; return c;
    },
    replaceChild(n, o) {
      const i = this.children.indexOf(o);
      if (i >= 0) this.children[i] = n;
      n.parentNode = this; return o;
    },
    querySelector() { return null; },
    classList: { add() {}, remove() {} },
  };
  Object.defineProperty(e, "firstChild", { get() { return this.children[0] || null; } });
  return e;
}
const documentStub = { createElementNS(ns, tag) { return makeEl(tag); } };

const primSrc = readFileSync(path.join(ROOT, "modules/math/js/geom-primitives.js"), "utf8");
const primBox = { window: {}, document: documentStub, navigator: {}, console };
vm.createContext(primBox);
vm.runInContext(primSrc, primBox, { filename: "geom-primitives.js" });
const G = primBox.window.GEOM;
if (!G) { console.error("FATAL: GEOM 未挂载"); process.exit(2); }

/* ================= 2. 原语级单元断言 ========================================
 * 2a. polar/angleOf 互逆；2b. angleArc/circleArc 的 path 断言：
 *     起止点 == polar() 期望；large-arc/sweep 标志符合 sweep；
 *     再用 SVG F.6.5 端点→圆心公式反推圆心，验证弧中点
 *     polar(a1+sweep/2) 确实在"画出来的那段弧"上（端到端验证 y 翻转处理）。
 * ========================================================================== */
const primFails = [];
let primChecks = 0;
function primFail(test, detail) { primFails.push(Object.assign({ test }, detail)); }

function parseArcD(d) {
  const m = String(d).match(
    /^M(-?[\d.]+),(-?[\d.]+) A(-?[\d.]+),(-?[\d.]+) 0 ([01]) ([01]) (-?[\d.]+),(-?[\d.]+)$/);
  if (!m) return null;
  return {
    sx: +m[1], sy: +m[2], rx: +m[3], ry: +m[4],
    large: +m[5], sweep: +m[6], ex: +m[7], ey: +m[8],
  };
}
// SVG 规范 F.6.5：端点参数 → 圆心（φ=0，rx=ry=r）
function arcCenter(sx, sy, ex, ey, r, large, sweep) {
  const x1p = (sx - ex) / 2, y1p = (sy - ey) / 2;
  let rr = r;
  const lam = (x1p * x1p + y1p * y1p) / (r * r);
  if (lam > 1) rr = r * Math.sqrt(lam);
  const num = Math.max(0, rr ** 4 - rr * rr * x1p * x1p - rr * rr * y1p * y1p);
  const den = Math.max(1e-12, rr * rr * x1p * x1p + rr * rr * y1p * y1p);
  const f = Math.sqrt(num / den) * (large !== sweep ? 1 : -1);
  return [f * y1p + (sx + ex) / 2, f * -x1p + (sy + ey) / 2];
}

(function primitiveTests() {
  // 2a. polar/angleOf 互逆
  for (const a of [0, 30, 90, 137.5, 180, 270, 359.9, -45, 735]) {
    primChecks++;
    const [px, py] = G.polar(200, 150, 40, a);
    const back = G.angleOf(200, 150, px, py);
    if (angDiff(back, norm360(a)) > 1e-9)
      primFail("T-POLAR", { a, back, diff: angDiff(back, norm360(a)) });
  }
  // 2b. angleArc：[a1, a2] 采样
  const arcCases = [
    [0, 90], [90, 0], [0, 180], [0, 200], [322, 90], [208, 332], [300, 60],
  ];
  for (const [a1, a2] of arcCases) {
    for (const grp of [1, 3]) {
      primChecks++;
      const vx = 200, vy = 150, r = 40;
      const root = makeEl("svg");
      G.angleArc(root, vx, vy, a1, a2, r, { group: grp });
      let sweep = norm360(a2 - a1); if (sweep === 0) sweep = 360;
      const paths = root.children[0].children; // g > path…
      if (paths.length !== grp) {
        primFail("T-ARC-GROUP", { a1, a2, grp, got: paths.length }); continue;
      }
      for (let k = 0; k < grp; k++) {
        const rk = r + k * 5;
        const pc = parseArcD(paths[k].attrs.d);
        if (!pc) { primFail("T-ARC-PARSE", { a1, a2, d: paths[k].attrs.d }); continue; }
        const [esx, esy] = G.polar(vx, vy, rk, a1);
        const [eex, eey] = G.polar(vx, vy, rk, a1 + sweep);
        const expLarge = sweep > 180 ? 1 : 0;
        const errs = [];
        if (dist(pc.sx, pc.sy, esx, esy) > 0.06) errs.push("start");
        if (dist(pc.ex, pc.ey, eex, eey) > 0.06) errs.push("end");
        if (pc.large !== expLarge) errs.push("large:" + pc.large + "!=" + expLarge);
        if (pc.sweep !== 0) errs.push("sweep:" + pc.sweep + "!=0");
        if (Math.abs(pc.rx - rk) > 0.06 || Math.abs(pc.ry - rk) > 0.06) errs.push("r");
        if (errs.length) { primFail("T-ARC-FLAGS", { a1, a2, grp, k, errs }); continue; }
        // 端到端：反推圆心，验证弧中点在画出的弧上
        if (sweep < 360) {
          primChecks++;
          const [cx, cy] = arcCenter(pc.sx, pc.sy, pc.ex, pc.ey, rk, pc.large, pc.sweep);
          const [mx, my] = G.polar(vx, vy, rk, a1 + sweep / 2);
          if (Math.abs(dist(cx, cy, mx, my) - rk) > 0.6) {
            primFail("T-ARC-MID-R", { a1, a2, k, d: Math.abs(dist(cx, cy, mx, my) - rk) });
            continue;
          }
          // 中点须在"从起点沿 sweep 方向走 sweep/2"的位置（屏幕坐标 y 向下，
          // sweep-flag=0 = 逆时针 = 角度递减方向）
          const aS = norm360(deg(Math.atan2(pc.sy - cy, pc.sx - cx)));
          const aM = norm360(deg(Math.atan2(my - cy, mx - cx)));
          const got = norm360(aS - aM); // 沿逆时针走过的角度
          if (Math.abs(got - sweep / 2) > 2)
            primFail("T-ARC-MID-DIR", { a1, a2, k, got, want: sweep / 2 });
        }
      }
    }
  }
  // 2c. circleArc 同理抽查
  for (const [a1, a2] of [[0, 90], [0, 200], [90, 0]]) {
    primChecks++;
    const root = makeEl("svg");
    G.circleArc(root, 100, 100, 50, a1, a2, {});
    const pc = parseArcD(root.children[0].attrs.d);
    let sweep = norm360(a2 - a1); if (sweep === 0) sweep = 360;
    if (!pc || pc.large !== (sweep > 180 ? 1 : 0) || pc.sweep !== 0)
      primFail("T-CIRCLEARC", { a1, a2, d: root.children[0].attrs.d });
  }
  // 2d. rightAngle：输出三点必须精确等于 v+u1*s / +u2*s（原语不强制 90°，只跟随 p/q）
  primChecks++;
  {
    const root = makeEl("svg");
    G.rightAngle(root, 100, 100, 200, 100, 100, 200, 12, {});
    const d = root.children[0].attrs.d;
    if (d !== "M112.0,100.0 L112.0,112.0 L100.0,112.0")
      primFail("T-RIGHT-PTS", { d });
  }
  primChecks++;
  { // 非直角输入 → 原语画平行四边形（记录行为：直角与否是数据的责任）
    const root = makeEl("svg");
    G.rightAngle(root, 0, 0, 10, 0, 5, 8.660254, 10, {});
    const d = root.children[0].attrs.d; // 按实际方向画，不纠正为 90°
    if (!/^M10\.0,0\.0 L15\.0,8\.7 L5\.0,8\.7$/.test(d))
      primFail("T-RIGHT-SKEW", { d, note: "原语应跟随 p/q 方向（此处 60°）" });
  }
})();

/* ================= 3. 数据加载 ================================================= */
const dataBox = { window: {}, console };
vm.createContext(dataBox);
const CH_IDS = [];
for (let n = 0; n <= 13; n++) {
  const id = "g" + String(n).padStart(2, "0");
  CH_IDS.push(id);
  const src = readFileSync(path.join(ROOT, "modules/math/data", id + ".js"), "utf8");
  vm.runInContext(src, dataBox, { filename: id + ".js" });
}
const CH = dataBox.window.MATH_CH || {};

/* ================= 4. 帧抽取 ==================================================
 * 每帧 = {label, shapes:[DSL…], meta}，全部换算到逻辑坐标（y 向上）。
 * 动态交互按渲染器同款数学重建（初值状态）。
 * ============================================================================ */
function triSegs(vertices) { // vertex-drag 初始三角形（三条实线边）
  const vs = (vertices || []).slice(0, 3).map((v) => ({
    x: Math.min(98, Math.max(2, Number(v.x))),
    y: Math.min(98, Math.max(2, Number(v.y))),
  }));
  if (vs.length !== 3) return [];
  const out = [];
  for (const [i, j] of [[0, 1], [1, 2], [2, 0]])
    out.push({ t: "seg", a: [vs[i].x, vs[i].y], b: [vs[j].x, vs[j].y], _dyn: "tri" });
  return out;
}
function protractorShapes(p) { // angle-protractor：V + 两条射线 + 弧（渲染器同款）
  const A = Number(p.angle);
  const vx = (p.vertex && p.vertex.x) != null ? +p.vertex.x : 50;
  const vy = (p.vertex && p.vertex.y) != null ? +p.vertex.y : 56;
  const dir1 = p.dir1 != null ? +p.dir1 : 180;
  const dir2 = norm360(dir1 - A);
  const RL = 44, AR = 15 / 3.32; // rayLen=44*S 像素 → 44 逻辑；弧 r=15px → 逻辑
  const ray = (d) => ({
    t: "seg",
    a: [vx, vy],
    b: [vx + RL * Math.cos(rad(d)), vy + RL * Math.sin(rad(d))], // 逻辑坐标 y 向上：数学角 d 的方向向量 = (cos d, +sin d)。渲染器在像素系调 G.polar（内含 y 取反），逻辑重建此处须用 +sin（曾有人改 -sin，已回滚）
    _dyn: "ray",
  });
  return [
    ray(dir1), ray(dir2),
    { t: "arc", v: [vx, vy], a1: dir2, a2: dir2 + A, r: AR, _dyn: "arc" },
  ];
}
function pythagShapes(p) { // pythag-grow 初值
  const a = +(p.aInit != null ? p.aInit : p.aMin);
  const b = +(p.bInit != null ? p.bInit : p.bMin);
  const c = Math.hypot(a, b);
  // 2026-10-14 蓝队：渲染器已修复——斜边正方形取真外法向 (b/c, a/c)，
  // 旧模型"O→斜边中点"方向仅 a=b 成立，此处同步
  const nx = b / c, ny = a / c;
  const sqC = [[a, 0], [0, b], [nx * c, b + ny * c], [a + nx * c, ny * c]];
  const segs = [];
  for (const [i, j] of [[0, 1], [1, 2], [2, 0]]) {
    const P = [[0, 0], [a, 0], [0, b]];
    segs.push({ t: "seg", a: P[i], b: P[j], _dyn: "tri" });
  }
  return segs.concat([
    { t: "poly", pts: [[0, 0], [a, 0], [a, -a], [0, -a]], _dyn: "sqA" },
    { t: "poly", pts: [[0, 0], [0, b], [-b, b], [-b, 0]], _dyn: "sqB" },
    { t: "poly", pts: sqC, _dyn: "sqC" },
    { t: "right", v: [0, 0], p: [a, 0], q: [0, b], size: 3, _dyn: "right" },
  ]);
}
function ladderShapes(p) { // ladder-slide 初值
  const L = +p.length, xMax = +p.xMax, xMin = +(p.xMin || 0);
  let x = p.xInit != null ? +p.xInit : xMin;
  x = Math.min(xMax, Math.max(xMin, x));
  const h = Math.sqrt(Math.max(0, L * L - x * x));
  const hMax = Math.sqrt(Math.max(0, L * L - xMin * xMin));
  return [
    { t: "seg", a: [-1.4, 0], b: [xMax + 0.9, 0], _dyn: "ground" },
    { t: "seg", a: [0, -0.9], b: [0, hMax + 0.9], _dyn: "wall" },
    { t: "seg", a: [x, 0], b: [0, h], _dyn: "ladder" },
    { t: "right", v: [0, 0], p: [x, 0], q: [0, h], size: 2, _dyn: "right" },
  ];
}
function ratioShapes(p) { // ratio-slider 初值（markAngles 同款：取小弧）
  const k = +(p.kInit != null ? p.kInit : 1);
  const A = [0, 0], B = [30, 0], C = [10, 20];
  const A2 = [42, 0], B2 = [42 + 30 * k, 0], C2 = [42 + 10 * k, 20 * k];
  const out = [];
  for (const T of [[A, B, C], [A2, B2, C2]])
    for (const [i, j] of [[0, 1], [1, 2], [2, 0]])
      out.push({ t: "seg", a: T[i], b: T[j], _dyn: "tri" });
  const mark = (V, E1, E2) => {
    const a = dirOf(V[0], V[1], E1[0], E1[1]);
    const b = dirOf(V[0], V[1], E2[0], E2[1]);
    // 2026-10-14 蓝队：渲染器已修复——取劣弧（norm360 取模后取 min(sweep,360−sweep)）
    let d = ((b - a) % 360 + 360) % 360;
    let a1 = a, dd = d;
    if (d > 180) { a1 = b; dd = 360 - d; }
    out.push({ t: "arc", v: V, a1, a2: a1 + dd, r: 2.2, _dyn: "arc" });
  };
  mark(A, B, C); mark(B, A, C); mark(C, A, B);
  mark(A2, B2, C2); mark(B2, A2, C2); mark(C2, A2, B2);
  return out;
}

function extractFrames(page) {
  const out = [];
  const jobs = [];
  if (page.interaction) jobs.push([page.interaction, "main"]);
  if (page.auxInteraction) jobs.push([page.auxInteraction, "aux"]);
  for (const [ix, slot] of jobs) {
    const t = ix.type, p = ix.params || {};
    const push = (label, shapes, meta) =>
      out.push({ label, shapes: shapes || [], meta: Object.assign({ slot, type: t }, meta) });
    switch (t) {
      case "step-play":
        (p.steps || []).forEach((s, i) =>
          push("step" + (i + 1), s.shapes, { caption: s.caption || "" })); break;
      case "tap-highlight":
        push("tap", (p.base || []).concat((p.items || []).map((it) =>
          Object.assign({ _item: it.id || it.label || "?" }, it.shape))), {});
        break;
      case "compare-toggle":
        (p.views || []).forEach((v, i) => push("view:" + (v.label || "#" + i), v.shapes, {})); break;
      case "proof-replay":
        (p.steps || []).forEach((s, i) =>
          push("step" + (i + 1), s.shapes, { caption: s.caption || s.card || "" })); break;
      case "construction-step":
        (p.steps || []).forEach((s, i) =>
          push("step" + (i + 1), s.shapes, { text: s.text || "" })); break;
      case "vertex-drag": push("base+tri", (p.base || []).concat(triSegs(p.vertices)), {}); break;
      case "angle-protractor": push("protractor", protractorShapes(p), { angle: p.angle }); break;
      case "pythag-grow": push("pythag", pythagShapes(p), {}); break;
      case "ladder-slide": push("ladder", ladderShapes(p), {}); break;
      case "ratio-slider": push("ratio", ratioShapes(p), {}); break;
      case "net-fold":
        push("net", (p.net || []).map((f) =>
          ({ t: "poly", pts: f.pts, _dyn: "face:" + f.id })), { fold: p.foldSequence || [] });
        break;
      case "cut-reassemble":
        push("cut",
          (p.pieces || []).map((pc) => ({ t: "poly", pts: pc.pts, _dyn: "piece:" + pc.id }))
            .concat((p.targets || []).map((tg) => ({ t: "poly", pts: tg.pts, _dyn: "target:" + tg.id }))),
          { cut: p });
        break;
      case "shape-area": // g11：SVG rect 正方形，构造即正方形，无需几何审计
        push("shape-area", [], { note: "rect-based, skip" }); break;
      default: push("unknown-type", [], { note: "未知 interaction type: " + t });
    }
  }
  return out;
}

/* ================= 5. 断言 ==================================================== */
const failures = [];
const counts = {
  pages: 0, frames: 0, noInteraction: 0,
  arcAtVertex: 0, arcMatched: 0, arcDecor: 0, arcReversed: 0,
  extPass: 0, rightChecks: 0, ptNearCircle: 0, ticksChecks: 0,
};
function mkFail(pageId, chId, frame, type, severity, element, measured, expected, note) {
  return {
    page: pageId, chapter: chId,
    frame: frame.label + " [" + frame.meta.slot + "/" + frame.meta.type + "]",
    caption: frame.meta.caption || frame.meta.text || "",
    type, severity, element, measured, expected, note: note || "",
  };
}
/* 定向白名单（2026-10-14 裁决）：旋转示意弧无边可依，数据不许动，此处豁免。
 * 不开全局口子：仅匹配"页 id + 弧特征（v/a1/a2/r）"。
 * - g10-u1-l6-p1 step4："绕 O 转过去"的旋转动作指示弧（sweep=220°），无边可依。 */
const ARC_EXEMPT = [
  { page: "g10-u1-l6-p1", v: [50, 52], a1: 160, a2: 20, r: 18 },
];
function isExemptArc(pageId, sh) {
  if (!sh || sh.t !== "arc" || !sh.v) return false;
  return ARC_EXEMPT.some((e) =>
    e.page === pageId &&
    Math.abs(e.v[0] - sh.v[0]) < 1e-9 && Math.abs(e.v[1] - sh.v[1]) < 1e-9 &&
    e.a1 === sh.a1 && e.a2 === sh.a2 && +e.r === +sh.r);
}
/* 跨顶点求和标注启发式（2026-10-14 修）：标签形如"∠A + ∠ABC + ∠C = 180°"
 * （≥2 个 ∠X 用 + 连接）时，不应拿单个弧的 sweep 去比对，而应把帧内
 * 各顶点弧的 sweep 加总后比对（如 g03-u1-l4-p2 step3 的内角和标注）。 */
function isAngleSumLabel(text) {
  if (!text || !text.includes("+")) return false;
  const toks = text.match(/∠[A-Za-z][A-Za-z'′]*/g) || [];
  return toks.length >= 2;
}
function vertexArcSweepSum(shapes) {
  const verts = geoVertices(shapes);
  let sum = 0;
  for (const s of shapes) {
    if (!s || s.t !== "arc" || !s.v) continue;
    let bd = 1e9;
    for (const q of verts) { const d = dist(s.v[0], s.v[1], q[0], q[1]); if (d < bd) bd = d; }
    if (bd > TOL.vertex) continue; // 装饰弧不计入求和
    let sw = norm360((s.a2 == null ? 90 : s.a2) - (s.a1 || 0)); if (sw === 0) sw = 360;
    sum += sw;
  }
  return sum;
}
// 帧内几何索引
function sidesOf(shapes) {  const out = [];
  const push = (x1, y1, x2, y2, dashed, sh) => {
    const len = dist(x1, y1, x2, y2);
    out.push({ x1, y1, x2, y2, len, dashed: !!dashed, sh });
  };
  for (const sh of shapes) {
    if (!sh || !sh.t) continue;
    if (sh.t === "seg" && sh.a && sh.b) push(sh.a[0], sh.a[1], sh.b[0], sh.b[1], sh.dash, sh);
    else if (sh.t === "poly" && Array.isArray(sh.pts)) {
      const pts = sh.pts, n = pts.length;
      const m = sh.close !== false ? n : Math.max(0, n - 1);
      for (let i = 0; i < m; i++) {
        const p1 = pts[i], p2 = pts[(i + 1) % n];
        if (p1 && p2) push(p1[0], p1[1], p2[0], p2[1], sh.dash, sh);
      }
    } else if (sh.t === "ray" && sh.p) {
      const L = +sh.len || 30, a = rad(+sh.ang || 0);
      push(sh.p[0], sh.p[1], sh.p[0] + L * Math.cos(a), sh.p[1] + L * Math.sin(a), false, sh);
    }
  }
  return out;
}
function geoVertices(shapes) {
  // 纯几何顶点：seg 端点 / poly 顶点 / ray 起点 / pt 位置。
  // 不含 arc 弧心（避免弧匹配到自身）、circle 圆心、txt/right 标注点。
  const out = [];
  for (const sh of shapes) {
    if (!sh || !sh.t) continue;
    if (sh.t === "seg") { if (sh.a) out.push(sh.a); if (sh.b) out.push(sh.b); }
    else if (sh.t === "poly") (sh.pts || []).forEach((p) => out.push(p));
    else if (sh.t === "ray" || sh.t === "pt") { if (sh.p) out.push(sh.p); }
  }
  return out.filter((p) => Array.isArray(p));
}
function verticesOf(shapes) { return geoVertices(shapes); } // 兼容别名
// 从顶点 v 出发的各边（方向=远离 v）。
// 关键：v 可能是某条线段的内点（如三线八角的交点在线段中部），此时该线段
// 的两个方向都要注册；长度取 v 到该方向端点的剩余长度（弧半径须小于它）。
function emanating(sides, v) {
  const out = [];
  for (const s of sides) {
    if (s.len < TOL.segZero) continue;
    const dp = ptSegDist(v[0], v[1], s.x1, s.y1, s.x2, s.y2);
    if (dp > TOL.vertex) continue;
    const d1 = dist(v[0], v[1], s.x1, s.y1), d2 = dist(v[0], v[1], s.x2, s.y2);
    if (d1 > TOL.vertex)
      out.push({ dir: dirOf(v[0], v[1], s.x1, s.y1), len: d1, dashed: s.dashed });
    if (d2 > TOL.vertex)
      out.push({ dir: dirOf(v[0], v[1], s.x2, s.y2), len: d2, dashed: s.dashed });
  }
  // 按方向去重（多条重叠线段），保留最长者
  const ded = [];
  for (const e of out) {
    const same = ded.find((x) => angDiff(x.dir, e.dir) < 1.0);
    if (same) { if (e.len > same.len) same.len = e.len; }
    else ded.push(e);
  }
  return ded;
}
const shapestr = (sh) => {
  if (!sh) return "?";
  const q = (p) => "[" + (+p[0]).toFixed(1) + "," + (+p[1]).toFixed(1) + "]";
  if (sh.t === "arc") return `arc v=${q(sh.v)} a1=${sh.a1} a2=${sh.a2} r=${sh.r}` + (sh._item ? " item=" + sh._item : "");
  if (sh.t === "seg") return `seg a=${q(sh.a)} b=${q(sh.b)}` + (sh.dash ? " dash=" + sh.dash : "");
  if (sh.t === "right") return `right v=${q(sh.v)} p=${q(sh.p)} q=${q(sh.q)}`;
  return sh.t;
};

/* ---- 5a. 角弧线 ---- */
function auditArc(pageId, chId, frame, sh) {
  const v = sh.v, fs = [];
  let decorSweep = null;
  // 渲染器同款：arc 的 a2 缺省→90；2026-10-14 蓝队已修 sh.a2||90 篡改 a2:0 的 bug，
  // 此处同步修复后行为（a2:0 合法保留）
  const a1e = sh.a1 || 0, a2e = sh.a2 == null ? 90 : sh.a2;
  let sweep = norm360(a2e - a1e); if (sweep === 0) sweep = 360;
  const s1 = norm360(a1e), s2 = norm360(a2e);
  if (sh.a2 === 0) {
    // 渲染器已修复：a2:0 按 0° 方向绘制，不再篡改为 90°——数据合法，无需告警
    void sweep;
  }
  const verts = geoVertices(frame.shapes);
  let bd = 1e9, best = null;
  for (const q of verts) { const d = dist(v[0], v[1], q[0], q[1]); if (d < bd) { bd = d; best = q; } }
  // 圆弧高亮：弧心 = 某圆圆心（±0.75），弧半径 ≈ 圆半径（±8 高亮偏移带）
  const circles = frame.shapes.filter((c) => c && c.t === "circle" && c.c);
  const hl = circles.find((c) =>
    dist(v[0], v[1], c.c[0], c.c[1]) <= TOL.vertex && Math.abs(r0(c) - (+sh.r || 12)) <= 8);
  function r0(c) { return +c.r || 10; }
  if (hl) {
    counts.arcCircleHL = (counts.arcCircleHL || 0) + 1;
    // 高亮弧须覆盖圆上已标点（seg 端点或 pt）的两个端点方向；
    // 半圆/整圆高亮自明，无需端点。
    const ends = [];
    for (const s of sidesOf(frame.shapes)) {
      for (const p of [[s.x1, s.y1], [s.x2, s.y2]])
        if (Math.abs(dist(p[0], p[1], hl.c[0], hl.c[1]) - r0(hl)) <= 1.5)
          ends.push(dirOf(hl.c[0], hl.c[1], p[0], p[1]));
    }
    for (const t of frame.shapes) {
      if (t && t.t === "pt" && t.p &&
          Math.abs(dist(t.p[0], t.p[1], hl.c[0], hl.c[1]) - r0(hl)) <= 1.5)
        ends.push(dirOf(hl.c[0], hl.c[1], t.p[0], t.p[1]));
    }
    const ok1 = ends.some((d) => angDiff(d, s1) <= TOL.arcDir);
    const ok2 = ends.some((d) => angDiff(d, s2) <= TOL.arcDir);
    const semi = Math.abs(sweep - 180) <= 2 || sweep >= 358;
    if (!(ok1 && ok2) && !semi)
      fs.push(mkFail(pageId, chId, frame, "ARC_HL_UNVERIFIED", "warn", shapestr(sh),
        { arcDirs: [+s1.toFixed(1), +s2.toFixed(1)], markedDirs: ends.map((d) => +d.toFixed(1)) },
        "人工确认", "圆弧高亮的起止在帧内无标注点对应（如跨步沿用的 A/B 点），需人眼复核"));
    return { fails: fs, decorSweep: null };
  }
  if (bd > TOL.vertex) {
    if (bd <= 8)
      fs.push(mkFail(pageId, chId, frame, "ARC_CENTER_OFF", "fail", shapestr(sh),
        { center: v.map((x) => +x.toFixed(1)), nearestVertex: best.map((x) => +x.toFixed(1)), offset: +bd.toFixed(2) },
        "offset≈0（弧心须与角顶点重合）", "弧心不在任何顶点上——用户看到的“角位置不对”"));
    else {
      counts.arcDecor++; decorSweep = sweep; // 装饰性弧（如撕角拼角），无边可依
      if (sweep > 180 || sweep === 360)
        fs.push(mkFail(pageId, chId, frame, "ARC_DECOR_SWEEP", "warn", shapestr(sh),
          "sweep=" + sweep + "°", "sweep∈(0,180]", "装饰弧扫过钝角/整圆，疑似起止写反"));
    }
    return { fails: fs, decorSweep };
  }
  counts.arcAtVertex++;
  const eman = emanating(sidesOf(frame.shapes), v);
  let match = null;
  for (const e1 of eman) for (const e2 of eman) {
    if (e1 === e2) continue;
    if (angDiff(e1.dir, s1) <= TOL.arcDir && angDiff(e2.dir, s2) <= TOL.arcDir) { match = { e1, e2 }; break; }
  }
  if (!match) {
    let swapped = null;
    for (const e1 of eman) for (const e2 of eman) {
      if (e1 === e2) continue;
      if (angDiff(e1.dir, s2) <= TOL.arcDir && angDiff(e2.dir, s1) <= TOL.arcDir) { swapped = true; break; }
    }
    // 诊断：是否"镜像"吻合（作者按屏幕坐标 y-down 顺时针写角度，原语按数学惯例）
    let mirror = false;
    const ms1 = norm360(-s1), ms2 = norm360(-s2);
    for (const e1 of eman) for (const e2 of eman) {
      if (e1 === e2) continue;
      if (angDiff(e1.dir, ms1) <= TOL.arcDir && angDiff(e2.dir, ms2) <= TOL.arcDir) { mirror = true; break; }
    }
    if (swapped) {
      counts.arcReversed++;
      fs.push(mkFail(pageId, chId, frame, "ARC_REVERSED", "fail", shapestr(sh),
        { arcDirs: [+s1.toFixed(1), +s2.toFixed(1)], note: "起止与两边反向对应" },
        "a1→a2 逆时针恰为内角", "起止写反：画出的是 reflex 外角而非内角"));
    } else {
      // 2026-10-14 裁决豁免：旋转示意弧无边可依（见 ARC_EXEMPT），不碰数据
      if (isExemptArc(pageId, sh)) {
        counts.arcExempt = (counts.arcExempt || 0) + 1;
        return { fails: fs, decorSweep: null };
      }
      fs.push(mkFail(pageId, chId, frame, "ARC_SIDES_MISMATCH", "fail", shapestr(sh),
        {
          arcDirs: [+s1.toFixed(1), +s2.toFixed(1)], sweep: +sweep.toFixed(1),
          sideDirsFromV: eman.map((e) => +e.dir.toFixed(1)),
          mirrorMatch: mirror,
        },
        "弧起止方向落在角的两条边上（±" + TOL.arcDir + "°）",
        mirror
          ? "弧端点不在边上，但与“屏幕坐标系（y 下、顺时针）角度”吻合——疑似角度约定写反（见报告根因②）"
          : "弧端点不在任何两条边的方向上——用户看到的“角位置/方向不对”"));
    }
    return { fails: fs, decorSweep: null };
  }
  counts.arcMatched++;
  // T1（2026-10-14 绿队对抗发现）：弧 sweep 必须等于两条匹配边的内角（劣弧）。
  // 防 g10-u1-l5-p1 类错误：起止方向落在边上、但扫成优弧（a1=90,a2=0 扫 270° 而内角 90°）。
  // 全量扫描确认数据集无合法优角意图弧；a1≡a2（整圆意图）跳过。
  if (norm360(a2e - a1e) !== 0) {
    const interior = Math.min(norm360(match.e2.dir - match.e1.dir), norm360(match.e1.dir - match.e2.dir));
    if (Math.abs(sweep - interior) > TOL.arcDir)
      fs.push(mkFail(pageId, chId, frame, "ARC_SWEEP_MISMATCH", "fail", shapestr(sh),
        { sweep: +sweep.toFixed(1), interior: +interior.toFixed(1),
          sideDirs: [+match.e1.dir.toFixed(1), +match.e2.dir.toFixed(1)] },
        "弧 sweep = 两边内角（劣弧）±" + TOL.arcDir + "°",
        "起止方向落在边上但扫错方向（优弧/方向反）——g10-u1-l5-p1 同类"));
  }
  const r = +(sh.r || 12);
  const minLen = Math.min(match.e1.len, match.e2.len);
  if (r > minLen + 0.5)
    fs.push(mkFail(pageId, chId, frame, "ARC_RADIUS_TOO_BIG", "fail", shapestr(sh),
      { r, minSideLen: +minLen.toFixed(1) }, "r < 两边边长", "弧半径超出边长，弧端点落在边的延长线上"));
  // 度数标注：弧心附近 r+14 内的 ° 文本。
  // 若数字 ≈ 同顶点各弧 sweep 之和 → 是"总和标注"（如拼成 180°），跳过单弧比对。
  let bl = null, bld = 1e9;
  for (const t of frame.shapes) {
    if (!t || t.t !== "txt" || !/(\d+(\.\d+)?)\s*°/.test(t.text || "")) continue;
    const d = dist(v[0], v[1], t.p[0], t.p[1]);
    if (d <= r + 14 && d < bld) { bld = d; bl = t; }
  }
  if (bl) {
    const num = parseFloat(bl.text.match(/(\d+(\.\d+)?)\s*°/)[1]);
    const sibSum = frame.shapes
      .filter((s) => s && s.t === "arc" && s.v &&
        dist(v[0], v[1], s.v[0], s.v[1]) <= TOL.vertex)
      .reduce((acc, s) => {
        // 同步渲染器修复后行为：a2 缺省→90，a2:0 合法保留
        let sw = norm360((s.a2 == null ? 90 : s.a2) - (s.a1 || 0)); if (sw === 0) sw = 360;
        return acc + sw;
      }, 0);
    if (Math.abs(num - sibSum) <= TOL.labelDeg) {
      /* 总和标注，与单弧无关 */ }
    else if (isAngleSumLabel(bl.text) &&
             Math.abs(num - vertexArcSweepSum(frame.shapes)) <= TOL.labelDeg) {
      /* 跨顶点求和标注（如 ∠A+∠ABC+∠C=180°）：帧内各顶点弧 sweep 之和即总数，与单弧无关 */ }
    else if (Math.abs(num - sweep) > TOL.labelDeg)
      fs.push(mkFail(pageId, chId, frame, "ARC_LABEL_MISMATCH", "fail", shapestr(sh),
        { labeled: num + "°", actualSweep: +sweep.toFixed(1) + "°", labelPos: bl.p },
        "标注度数 = 两边实际夹角 ±" + TOL.labelDeg + "°",
        "就近 ° 标注与弧实际扫过角度不符（启发式关联，需人眼复核）"));
  }
  return { fails: fs, decorSweep: null };
}

/* ---- 5a2. 撕角一致性（帧级）：虚线三角形 + 装饰弧，角度多重集须一致 ---- */
function auditTornAngles(pageId, chId, frame, decorSweeps) {
  const fs = [];
  if (!decorSweeps.length) return fs;
  const ghostTris = frame.shapes.filter((sh) =>
    sh && sh.t === "poly" && sh.dash && Array.isArray(sh.pts) && sh.pts.length === 3 &&
    (sh.close !== false));
  if (!ghostTris.length) return fs;
  const triAngles = (pts) => {
    const angs = [];
    for (let i = 0; i < 3; i++) {
      const d1 = dirOf(pts[i][0], pts[i][1], pts[(i + 1) % 3][0], pts[(i + 1) % 3][1]);
      const d2 = dirOf(pts[i][0], pts[i][1], pts[(i + 2) % 3][0], pts[(i + 2) % 3][1]);
      angs.push(angDiff(d1, d2));
    }
    return angs.sort((x, y) => x - y);
  };
  for (const gt of ghostTris) {
    const want = triAngles(gt.pts);
    const got = decorSweeps.slice().sort((x, y) => x - y);
    if (got.length !== 3) continue;
    const dev = Math.max(...got.map((g, i) => Math.abs(g - want[i])));
    if (dev > TOL.arcDir)
      fs.push(mkFail(pageId, chId, frame, "TORN_ANGLES_MISMATCH", "warn",
        "decorSweeps=[" + got.map((x) => +x.toFixed(1)).join(",") + "]",
        { ghostTriangleAngles: want.map((x) => +x.toFixed(1)), maxDev: +dev.toFixed(2) + "°" },
        "撕下角的度数多重集 = 原三角形三角度数（±" + TOL.arcDir + "°）",
        "拼角示意的装饰弧与原三角形角度对不上"));
  }
  return fs;
}

/* ---- 5b. 直角标记 ---- */
function auditRight(pageId, chId, frame, sh) {
  const fs = [], v = sh.v;
  counts.rightChecks++;
  const d1 = dirOf(v[0], v[1], sh.p[0], sh.p[1]);
  const d2 = dirOf(v[0], v[1], sh.q[0], sh.q[1]);
  const ang = angDiff(d1, d2);
  if (Math.abs(ang - 90) > TOL.right)
    fs.push(mkFail(pageId, chId, frame, "RIGHT_NOT_90", "fail", shapestr(sh),
      +ang.toFixed(2) + "°", "90±" + TOL.right + "°", "原语跟随 p/q 方向画方块，不纠正角度"));
  else {
    const eman = emanating(sidesOf(frame.shapes), v);
    const ok1 = eman.some((e) => angDiff(e.dir, d1) <= 6);
    const ok2 = eman.some((e) => angDiff(e.dir, d2) <= 6);
    if (!(ok1 && ok2))
      fs.push(mkFail(pageId, chId, frame, "RIGHT_FLOATING", "warn", shapestr(sh),
        { pDir: +d1.toFixed(1), qDir: +d2.toFixed(1), sideDirs: eman.map((e) => +e.dir.toFixed(1)) },
        "标记两边方向与顶点处实画边方向一致（±6°）", "方块方向与图中边对不上，看似“位置不对”"));
  }
  return fs;
}

/* ---- 5c. 延长线（虚线 seg）----
 * 两阶段：先对每条虚线 seg 算几何信息（extInfo），再在帧级按"意图证据"判定：
 *  - 与共点实线共线（同向重叠 dev≈0° 或反向延长 dev≈180°，容差 TOL.ext）→ 通过；
 *  - caption 含"延长" 且 帧内无已通过的延长线 且 远端在自由空间 且 不共线 → FAIL；
 *  - 其余（叠角对比、直径、高线、中线、辅助半径……）→ warn 或静默（见判定表）。
 */
function extInfo(frame, sh) {
  const a = sh.a, b = sh.b;
  const solids = sidesOf(frame.shapes).filter((s) => !s.dashed);
  const shared = [];
  for (const s of solids) {
    const ends = [[s.x1, s.y1], [s.x2, s.y2]];
    for (const dEnd of [a, b]) for (const sEnd of ends) {
      if (dist(dEnd[0], dEnd[1], sEnd[0], sEnd[1]) <= TOL.vertex) {
        const f = dEnd === a ? b : a;
        const g = (sEnd[0] === s.x1 && sEnd[1] === s.y1) ? [s.x2, s.y2] : [s.x1, s.y1];
        shared.push({ e: dEnd, f, g, s });
      }
    }
  }
  let best = null;
  for (const c of shared) {
    const dD = dirOf(c.e[0], c.e[1], c.f[0], c.f[1]);
    const dS = dirOf(c.e[0], c.e[1], c.g[0], c.g[1]);
    const ad = angDiff(dD, dS);
    const colDev = Math.min(ad, Math.abs(ad - 180)); // 0=重叠同向，180=反向延长
    const cross = +(((c.f[0] - c.e[0]) * (c.g[1] - c.e[1]) -
      (c.f[1] - c.e[1]) * (c.g[0] - c.e[0])).toFixed(1));
    if (!best || colDev < best.colDev) best = { c, dD, dS, ad, colDev, cross };
  }
  let farFree = true, freeEnd = null;
  if (best) {
    const f = best.c.f;
    freeEnd = f;
    for (const s of solids) {
      if (s === best.c.s) continue;
      if (ptSegDist(f[0], f[1], s.x1, s.y1, s.x2, s.y2) <= 3.0) { farFree = false; break; }
      if (dist(f[0], f[1], s.x1, s.y1) <= 1.5 || dist(f[0], f[1], s.x2, s.y2) <= 1.5) { farFree = false; break; }
    }
  }
  return { sh, el: shapestr(sh), shared, best, farFree, freeEnd };
}
function auditExtFrame(pageId, chId, frame, infos) {
  const fs = [];
  const hasYanchang = /延长/.test(frame.meta.caption || "");
  const hasPassing = infos.some((i) => i.best && i.best.colDev <= TOL.ext);
  for (const inf of infos) {
    const { el, shared, best, farFree } = inf;
    if (!shared.length) {
      // 无公共端点：共线贴合但"悬空" → 接缝检查；平行分离 → 辅助线，跳过。
      // 缺陷定义：虚线两端投影都落在实线段同侧之外（即虚线没有从实线端点起接、
      // 也没有压住实线），且最近距离 > 1。
      const a = inf.sh.a, b = inf.sh.b;
      const solids = sidesOf(frame.shapes).filter((s) => !s.dashed);
      for (const s of solids) {
        const dAng = angDiff(dirOf(a[0], a[1], b[0], b[1]), dirOf(s.x1, s.y1, s.x2, s.y2));
        const col = Math.min(dAng, Math.abs(dAng - 180));
        if (col > TOL.ext) continue;
        const pld = Math.min(ptSegDist(a[0], a[1], s.x1, s.y1, s.x2, s.y2),
          ptSegDist(b[0], b[1], s.x1, s.y1, s.x2, s.y2));
        if (pld > TOL.vertex) continue;
        const dx = s.x2 - s.x1, dy = s.y2 - s.y1, L2 = dx * dx + dy * dy || 1;
        const ta = ((a[0] - s.x1) * dx + (a[1] - s.y1) * dy) / L2;
        const tb = ((b[0] - s.x1) * dx + (b[1] - s.y1) * dy) / L2;
        const outA = ta < 0 ? -1 : ta > 1 ? 1 : 0;
        const outB = tb < 0 ? -1 : tb > 1 ? 1 : 0;
        if (outA !== 0 && outA === outB) { // 同侧悬空
          const near = outA < 0 ? [s.x1, s.y1] : [s.x2, s.y2];
          const gap = Math.min(dist(a[0], a[1], near[0], near[1]),
            dist(b[0], b[1], near[0], near[1]));
          if (gap > 1.0)
            fs.push(mkFail(pageId, chId, frame, "EXT_GAP", "fail", el,
              { gap: +gap.toFixed(2) }, "gap≈0（虚线须从实线端点起接）",
              "延长虚线与实线端点脱开一截"));
        }
      }
      continue;
    }
    if (best.colDev <= TOL.ext) { counts.extPass++; continue; } // 正常延长线/重叠
    const m = {
      colDev: +best.colDev.toFixed(2) + "°", cross: best.cross,
      dirDashed: +best.dD.toFixed(1) + "°", dirSolid: +best.dS.toFixed(1) + "°",
      sharedEndpoint: best.c.e.map((x) => +x.toFixed(1)),
    };
    if (hasYanchang && !hasPassing && farFree)
      fs.push(mkFail(pageId, chId, frame, "EXT_NOT_COLLINEAR", "fail", el, m,
        "虚线与实线共线（偏差≤" + TOL.ext + "°）",
        "用户报告的“延长线虚线不在一条直线上”：caption 明确写延长，虚线方向偏离"));
    else if (hasYanchang && !hasPassing && !farFree)
      fs.push(mkFail(pageId, chId, frame, "EXT_SUSPICIOUS", "warn", el, m,
        "人工确认意图", "写明延长但虚线不共线、远端落在图形上——需人眼复核"));
    else if (best.colDev <= TOL.extWarn)
      fs.push(mkFail(pageId, chId, frame, "EXT_NEAR_MISS", "warn", el, m,
        "偏差≤" + TOL.ext + "°", "接近共线但超容差，疑似手算斜率误差"));
    else if (!farFree)
      fs.push(mkFail(pageId, chId, frame, "EXT_SUSPICIOUS", "warn", el, m,
        "人工确认意图", "虚线远端落在实画图形上，可能是有意辅助线（中线/高线/对角线/半径），需人眼复核"));
    else counts.extOther = (counts.extOther || 0) + 1; // 有意构造（叠角对比/直径/高线…），静默
  }
  return fs;
}

/* ---- 5d. 附带：ticks 记号 / 圆上点 / 退化形 / 正方形 ---- */
function auditTicks(pageId, chId, frame, sh) {
  const fs = [];
  counts.ticksChecks++;
  const ok = sidesOf(frame.shapes).some((s) =>
    (dist(sh.a[0], sh.a[1], s.x1, s.y1) <= TOL.vertex && dist(sh.b[0], sh.b[1], s.x2, s.y2) <= TOL.vertex) ||
    (dist(sh.a[0], sh.a[1], s.x2, s.y2) <= TOL.vertex && dist(sh.b[0], sh.b[1], s.x1, s.y1) <= TOL.vertex));
  if (!ok)
    fs.push(mkFail(pageId, chId, frame, "TICKS_FLOATING", "warn",
      `ticks a=[${sh.a}] b=[${sh.b}]`, "记号落在某条实画边上（端点±" + TOL.vertex + "）",
      "等长/平行记号没画在边上", "记号位置合理性"));
  return fs;
}
function auditPtCircle(pageId, chId, frame, sh) {
  const fs = [];
  for (const c of frame.shapes) {
    if (!c || c.t !== "circle") continue;
    const dc = Math.abs(dist(sh.p[0], sh.p[1], c.c[0], c.c[1]) - (+c.r || 10));
    if (dc <= TOL.ptCircleNear) {
      counts.ptNearCircle++;
      if (dc > TOL.ptCircle)
        fs.push(mkFail(pageId, chId, frame, "PT_OFF_CIRCLE", "warn",
          `pt [${sh.p}] vs circle c=[${c.c}] r=${c.r}`,
          { deviation: +dc.toFixed(2) }, "点到圆心距离 = 半径 ±" + TOL.ptCircle,
          "点靠近圆周但不在圆上（g07 类布点），需人眼复核是否为有意"));
    }
  }
  return fs;
}
function auditShapeSanity(pageId, chId, frame, sh) {
  const fs = [];
  if (sh.t === "seg" && dist(sh.a[0], sh.a[1], sh.b[0], sh.b[1]) < TOL.segZero)
    fs.push(mkFail(pageId, chId, frame, "SEG_ZERO", "fail", shapestr(sh), "len=0", "len>0", "零长度线段"));
  if (sh.t === "poly" && (!sh.pts || sh.pts.length < 3))
    fs.push(mkFail(pageId, chId, frame, "POLY_DEGENERATE", "fail", shapestr(sh),
      "pts=" + (sh.pts || []).length, "≥3", "退化多边形"));
  if (sh.t === "arcpath" && !(+sh.r > 0))
    fs.push(mkFail(pageId, chId, frame, "ARCPATH_R", "fail", shapestr(sh), "r=" + sh.r, "r>0", ""));
  return fs;
}
function auditSquare(pageId, chId, frame, sh) { // 动态重建的正方形自检
  const fs = [], P = sh.pts;
  if (!P || P.length !== 4) return fs;
  const L = [];
  for (let i = 0; i < 4; i++) L.push(dist(P[i][0], P[i][1], P[(i + 1) % 4][0], P[(i + 1) % 4][1]));
  const mx = Math.max(...L), mn = Math.min(...L);
  if (mx - mn > TOL.squareSide)
    fs.push(mkFail(pageId, chId, frame, "SQUARE_DEFORMED", "fail", sh._dyn || "square",
      { sides: L.map((x) => +x.toFixed(2)) }, "四边等（±" + TOL.squareSide + "）", "正方形边长不一"));
  for (let i = 0; i < 4; i++) {
    const d1 = dirOf(P[i][0], P[i][1], P[(i + 1) % 4][0], P[(i + 1) % 4][1]);
    const d2 = dirOf(P[(i + 1) % 4][0], P[(i + 1) % 4][1], P[(i + 2) % 4][0], P[(i + 2) % 4][1]);
    if (Math.abs(angDiff(d1, d2) - 90) > 1)
      fs.push(mkFail(pageId, chId, frame, "SQUARE_DEFORMED", "fail", sh._dyn || "square",
        { corner: i, angle: +angDiff(d1, d2).toFixed(2) }, "四角 90±1°", "正方形角非直角"));
  }
  return fs;
}
function auditFold(pageId, chId, label, seq, net) { // net-fold 折叠轴
  const fs = [];
  const faces = {};
  (net || []).forEach((f) => { faces[f.id] = f.pts; });
  for (const st of seq || []) {
    const e = st.edge, fp = faces[st.face];
    if (!fp) { fs.push(mkFail(pageId, chId, { label, meta: { slot: "main", type: "net-fold" } }, "FOLD_FACE_MISSING", "fail", "face=" + st.face, "—", "面 id 不存在", "")); continue; }
    const onFace = (pts) => e.every((ep) => pts.some((q) => dist(ep[0], ep[1], q[0], q[1]) <= TOL.foldEdge));
    if (!onFace(fp))
      fs.push(mkFail(pageId, chId, { label, meta: { slot: "main", type: "net-fold" } }, "FOLD_EDGE_NOT_ON_FACE", "fail",
        "face=" + st.face + " edge=" + JSON.stringify(e), "轴端点 = 面顶点（±" + TOL.foldEdge + "）", "折叠轴不是该面的边"));
    const other = Object.keys(faces).filter((id) => id !== st.face);
    if (!other.some((id) => onFace(faces[id])))
      fs.push(mkFail(pageId, chId, { label, meta: { slot: "main", type: "net-fold" } }, "FOLD_EDGE_NO_PARENT", "warn",
        "face=" + st.face + " edge=" + JSON.stringify(e), "轴为两面公共边", "找不到共用此轴的父面（渲染器会报错）"));
  }
  return fs;
}
function auditCut(pageId, chId, label, p) { // cut-reassemble 全等
  const fs = [];
  const tg = {};
  (p.targets || []).forEach((t) => { tg[t.id] = t.pts; });
  const dl = (P, i, j) => dist(P[i][0], P[i][1], P[j][0], P[j][1]);
  const sarea = (P) => { let s = 0; for (let i = 0; i < P.length; i++) { const q = P[(i + 1) % P.length]; s += P[i][0] * q[1] - q[0] * P[i][1]; } return s; };
  for (const pc of p.pieces || []) {
    const B = tg[pc.id];
    if (!B) { fs.push(mkFail(pageId, chId, { label, meta: { slot: "main", type: "cut-reassemble" } }, "CUT_TARGET_MISSING", "fail", "piece=" + pc.id, "—", "同名 target", "")); continue; }
    const A = pc.pts;
    if (A.length !== B.length) { fs.push(mkFail(pageId, chId, { label, meta: { slot: "main", type: "cut-reassemble" } }, "CUT_VERT_MISMATCH", "fail", "piece=" + pc.id, A.length + " vs " + B.length, "顶点数一致", "")); continue; }
    let maxDev = 0;
    for (let i = 0; i < A.length; i++) for (let j = i + 1; j < A.length; j++)
      maxDev = Math.max(maxDev, Math.abs(dl(A, i, j) - dl(B, i, j)));
    if (Math.sign(sarea(A)) !== Math.sign(sarea(B)))
      fs.push(mkFail(pageId, chId, { label, meta: { slot: "main", type: "cut-reassemble" } }, "CUT_ORDER_FLIPPED", "fail",
        "piece=" + pc.id, "顶点环向相反", "散块与目标顶点顺序一致", "吸附会把块“拧”进轮廓"));
    else if (maxDev > TOL.cutCongruent)
      fs.push(mkFail(pageId, chId, { label, meta: { slot: "main", type: "cut-reassemble" } }, "CUT_NOT_CONGRUENT", "fail",
        "piece=" + pc.id, { maxPairwiseDev: +maxDev.toFixed(2) }, "对应点距全等（±" + TOL.cutCongruent + "）", "散块与目标不全等，吸附错位"));
  }
  return fs;
}
function auditProtractorParams(pageId, chId, frame, p) {
  const fs = [];
  const A = Number(p.angle);
  if (!(A > 0 && A < 180))
    fs.push(mkFail(pageId, chId, frame, "PROTRACTOR_ANGLE", "fail", "angle=" + p.angle, "—", "angle∈(0,180)", "量角器渲染器将报错不渲染"));
  return fs;
}

/* ================= 6. 主流程 ================================================== */
const byType = {};
for (const chId of CH_IDS) {
  const ch = CH[chId];
  if (!ch) { console.error("WARN: 章节缺失 " + chId); continue; }
  for (const u of ch.units || []) for (const l of u.lessons || []) for (const pg of l.pages || []) {
    counts.pages++;
    const frames = extractFrames(pg);
    if (!frames.length) { counts.noInteraction++; continue; }
    for (const fr of frames) {
      counts.frames++;
      const ixType = fr.meta.type;
      byType[ixType] = (byType[ixType] || 0) + 1;
      if (ixType === "angle-protractor")
        failures.push(...auditProtractorParams(pg.id, chId, fr, (pg.interaction || {}).params || {}));
      if (fr.meta.fold) failures.push(...auditFold(pg.id, chId, fr.label, fr.meta.fold, ((pg.interaction || {}).params || {}).net));
      if (fr.meta.cut) failures.push(...auditCut(pg.id, chId, fr.label, fr.meta.cut));
      const decorSweeps = [];
      for (const sh of fr.shapes) {
        if (!sh || !sh.t) continue;
        failures.push(...auditShapeSanity(pg.id, chId, fr, sh));
        if (sh.t === "arc") {
          const r = auditArc(pg.id, chId, fr, sh);
          failures.push(...r.fails);
          if (r.decorSweep != null) decorSweeps.push(r.decorSweep);
        }
        else if (sh.t === "right") failures.push(...auditRight(pg.id, chId, fr, sh));
        else if (sh.t === "ticks") failures.push(...auditTicks(pg.id, chId, fr, sh));
        else if (sh.t === "pt") failures.push(...auditPtCircle(pg.id, chId, fr, sh));
        if (sh._dyn && String(sh._dyn).startsWith("sq")) failures.push(...auditSquare(pg.id, chId, fr, sh));
      }
      failures.push(...auditTornAngles(pg.id, chId, fr, decorSweeps));
      // 延长线帧级判定（虚线 seg）
      const extShs = fr.shapes.filter((sh) => sh && sh.t === "seg" && sh.dash);
      if (extShs.length)
        failures.push(...auditExtFrame(pg.id, chId, fr, extShs.map((sh) => extInfo(fr, sh))));
    }
  }
}

const result = {
  meta: {
    date: "2026-10-14", tool: "tools/geom-audit-20261014.mjs",
    tolerances: TOL,
    scope: "modules/math/data/g00.js…g13.js 全量页面（含习题页、auxInteraction）",
    coordinateNote: "断言在逻辑坐标（0–100，y 向上）下进行；渲染链为均匀缩放+平移，"
      + "逻辑坐标结论等价于像素结论（angle-protractor 的 Y 缩放 2.94 vs X 3.32 为唯一非均匀处，"
      + "但其角度几何全在像素空间按度构造，自洽——见报告）",
  },
  primitiveTests: { checks: primChecks, failures: primFails },
  counts, interactionFrames: byType,
  failures,
};
const jsonOnly = process.argv.includes("--json-only");
const outPath = path.join(HERE, "geom-audit-20261014.json");
writeFileSync(outPath, JSON.stringify(result, null, 1));

if (!jsonOnly) {
  const fails = failures.filter((f) => f.severity === "fail");
  const warns = failures.filter((f) => f.severity === "warn");
  console.log("=== 白队几何绘图审计 2026-10-14 ===");
  console.log(`原语单元断言: ${primChecks} 项, 失败 ${primFails.length}`);
  for (const f of primFails) console.log("  PRIM-FAIL", JSON.stringify(f));
  console.log(`页面: ${counts.pages}（无交互 ${counts.noInteraction}）, 帧: ${counts.frames}`);
  console.log("帧类型分布:", JSON.stringify(byType));
  console.log(`角弧线: 顶点处 ${counts.arcAtVertex}（匹配 ${counts.arcMatched}，起止反向 ${counts.arcReversed}，装饰弧 ${counts.arcDecor}）`);
  console.log(`延长线通过: ${counts.extPass}, 直角检查: ${counts.rightChecks}, 记号检查: ${counts.ticksChecks}, 近圆点: ${counts.ptNearCircle}`);
  console.log(`\n失败(FAIL): ${fails.length}  WARN: ${warns.length}`);
  const byT = {};
  for (const f of failures) byT[f.type] = (byT[f.type] || 0) + 1;
  console.log("按类型:", JSON.stringify(byT, null, 1));
  const pages = {};
  for (const f of fails) (pages[f.page] = pages[f.page] || []).push(f.type);
  console.log("\nFAIL 页面清单（页 id: 失败类型）:");
  for (const p of Object.keys(pages).sort()) console.log(" ", p, "→", [...new Set(pages[p])].join(", "));
  console.log("\nJSON:", outPath);
}
