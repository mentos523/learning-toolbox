#!/usr/bin/env node
/* ============================================================
 * 波 A 数据改造脚本（tools/waveA-transform.mjs）
 *
 * 机械变换 75 页（slider-lab→新类型 + graph:{kind}），禁止手改。
 * 设计依据：~/workspace/math-rectify/waveA-design.md §4.1（R1–R4）
 * 运行：node tools/waveA-transform.mjs [--dry-run] [--write]
 * 缺省 dry-run（只校验不写文件）；--write 才落盘。
 * ============================================================ */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const REPO = path.resolve(__dirname, "..");
const MATH = path.join(REPO, "modules", "math");
const DRY = !process.argv.includes("--write");

/* ================= §1 求值器（与 eq-bind.js 同源） ================= */
function evalExpr(expr, varName, varValue) {
  let e = String(expr == null ? "" : expr);
  e = e.replace(/\^/g, "**");
  e = e.replace(/\bsin\s*\(/g, "Math.sin(")
       .replace(/\bcos\s*\(/g, "Math.cos(")
       .replace(/\btan\s*\(/g, "Math.tan(")
       .replace(/\blog2\s*\(/g, "Math.log2(")
       .replace(/\blog\s*\(/g, "Math.log(")
       .replace(/\bln\s*\(/g, "Math.log(")
       .replace(/\bsqrt\s*\(/g, "Math.sqrt(")
       .replace(/\u03C0/g, "Math.PI");
  const escName = String(varName).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  e = e.replace(new RegExp("\\b" + escName + "\\b", "g"), "(" + Number(varValue) + ")");
  const check = e.replace(/\bMath\.(sin|cos|tan|log2|log|sqrt|PI)\b/g, "");
  if (!/^[0-9+\-*/().\s]*$/.test(check)) return NaN;
  try {
    const v = Function('"use strict"; return (' + e + ")")();
    return (typeof v === "number" && isFinite(v)) ? v : NaN;
  } catch { return NaN; }
}

/* ================= §2 配置 ================= */
/* kind 映射（waveA-design.md 附录 A + §4.1 R1） */
const KIND_BY_CHAPTER = {
  ch00: "numberline", ch01: "numberline",
  ch03: "rational",
  ch04: "parabola",
  ch06: "line",       /* 仅 ch06-u2-l5-p1 一页 */
  ch07: "vertex",
  ch08: "exp",
};
/* ch11 仅 u3 → zero（由页 id 前缀判定） */

/* 75 页主清单（inventory-algebra.md 第三节） */
const MAIN75 = [
  // ch00
  "ch00-u1-l1-p1", "ch00-u1-l1-p2b",
  // ch01（15）
  "ch01-u1-l1-p1", "ch01-u1-l1-p3", "ch01-u1-l2-p2", "ch01-u1-l2-p2b",
  "ch01-u2-l1-p2", "ch01-u2-l1-p2b", "ch01-u2-l2-p1", "ch01-u2-l2-p1b",
  "ch01-u2-l2-p2", "ch01-u2-l2-p2b", "ch01-u2-l3-p1", "ch01-u2-l3-p1b",
  "ch01-u2-l4-p1", "ch01-u2-l4-p1b", "ch01-u2-l5-p1",
  // ch03（7）
  "ch03-u1-l1-p2", "ch03-u1-l1-p2b", "ch03-u2-l3-p1", "ch03-u2-l3-p1b",
  "ch03-u2-l3-p2", "ch03-u2-l3-p2b", "ch03-ux-l1-p1",
  // ch04（15，含 P0）
  "ch04-u1-l1-p1", "ch04-u1-l1-p1b", "ch04-u1-l2-p1", "ch04-u1-l2-p2",
  "ch04-u1-l2-p2b", "ch04-u1-l3-p1", "ch04-u1-l3-p1b", "ch04-u1-l4-p1",
  "ch04-u1-l4-p1b", "ch04-u2-l2-p1", "ch04-u2-l2-p1b", "ch04-u2-l3-p1",
  "ch04-u2-l3-p1b", "ch04-u2-l4-p1", "ch04-ux-l1-p1",
  // ch05（17）
  "ch05-u1-l1-p1", "ch05-u1-l1-p1b", "ch05-u1-l2-p1", "ch05-u1-l2-p1b",
  "ch05-u1-l1-p2", "ch05-u1-l1-p2b", "ch05-u1-l1-p3", "ch05-u1-l1-p3b",
  "ch05-u1-l3-p1", "ch05-u1-l3-p1b", "ch05-u2-l1-p2", "ch05-u2-l1-p2b",
  "ch05-u2-l2-p1b", "ch05-u2-l3-p1", "ch05-u2-l3-p1b", "ch05-u2-l4-p1",
  "ch05-ux-l1-p1",
  // ch06（1）
  "ch06-u2-l5-p1",
  // ch07（5）
  "ch07-u1-l2-p1b", "ch07-u1-l3-p1", "ch07-u1-l3-p1b",
  "ch07-u1-l4-p1", "ch07-u1-l4-p1b",
  // ch08（9）
  "ch08-u1-l1-p1", "ch08-u1-l1-p1b", "ch08-u1-l2-p1", "ch08-u1-l2-p1b",
  "ch08-u2-l1-p1", "ch08-u2-l1-p1b", "ch08-u2-l2-p1", "ch08-u2-l2-p1b",
  "ch08-ux-l1-p1",
  // ch11-u3（4）
  "ch11-u3-l2-p1", "ch11-u3-l2-p1b", "ch11-u3-l3-p1", "ch11-u3-l3-p1b",
];

/* ch05 ineq 表（ineq-directions.md §4 机器 JSON + 协调者决议）
 * p1/p1b：决议按 compare 双 set（x>5 与 x<5 同一数轴） */
const INEQ = {
  "ch05-u1-l1-p1": { mode: "compare",
    sets: [
      { expr: "x-5", ineq: ">", label: "x>5（左边沉）" },
      { expr: "5-x", ineq: ">", label: "x<5（右边沉）" }
    ],
    note: "同一数轴同时呈现 x>5 与 x<5 两个区域：开口朝大的一边" },
  "ch05-u1-l1-p1b": { mode: "compare",
    sets: [
      { expr: "x-5", ineq: ">", label: "x>5：开口朝左，左边大" },
      { expr: "x-5", ineq: "<", label: "x<5：开口朝右，右边大" }
    ],
    note: "同一数轴同时呈现 x>5 与 x<5 两个区域：> 左边大，< 右边大" },
  "ch05-u1-l1-p2": { mode: "compare",
    sets: [
      { expr: "5-8", ineq: "<", label: "变形前：5<8" },
      { expr: "(5+a)-(8+a)", ineq: "<", label: "变形后：5+a<8+a" }
    ],
    note: "方向不变 ✅：两边加减同一个数，小的还是小的" },
  "ch05-u1-l1-p2b": { mode: "compare",
    sets: [
      { expr: "3-7", ineq: "<", label: "变形前：3<7" },
      { expr: "(3-5)-(7-5)", ineq: "<", label: "变形后：3−5<7−5" }
    ],
    note: "方向不变 ✅：性质一，两边加减同一个数" },
  "ch05-u1-l1-p3": { mode: "compare",
    sets: [
      { expr: "4-6", ineq: "<", label: "变形前：4<6" },
      { expr: "4*k-6*k", ineq: ">", label: "变形后：4k>6k（k<0）" }
    ],
    note: "方向反转 ⚠️：两边乘同一个负数，不等号翻面" },
  "ch05-u1-l1-p3b": { mode: "compare",
    sets: [
      { expr: "2-5", ineq: "<", label: "变形前：2<5" },
      { expr: "2*k-5*k", ineq: ">", label: "变形后：2k>5k（k<0）" }
    ],
    note: "方向反转 ⚠️：两边同乘 −3，−6>−15" },
  "ch05-u1-l2-p1": { mode: "single",
    sets: [ { expr: "2*x+1-7", ineq: ">", label: "2x+1>7" } ] },
  "ch05-u1-l2-p1b": { mode: "single",
    sets: [
      { expr: "3*x-5-10", ineq: "<", label: "3x−5<10" },
      { expr: "-4*x-12", ineq: ">=", label: "−4x≥12（实心端点演示）" }
    ] },
  "ch05-u1-l3-p1": { mode: "system",
    sets: [
      { expr: "x-2", ineq: ">", label: "x>2" },
      { expr: "5-x", ineq: ">", label: "x<5" }
    ] },
  "ch05-u1-l3-p1b": { mode: "system",
    sets: [
      { expr: "x-3", ineq: ">", label: "x>3（x+1>4 解得）" },
      { expr: "5-x", ineq: ">", label: "x<5（2x<10 解得）" }
    ] },
  "ch05-u2-l1-p2": { mode: "compare",
    sets: [
      { expr: "x^2+2*x+1", ineq: ">", label: "相切：x²+2x+1>0" },
      { expr: "x^2+x+1", ineq: ">", label: "悬空：x²+x+1>0" }
    ],
    note: "方向同、解集异：相切时 x≠−1；悬空时恒成立（全体实数）" },
  "ch05-u2-l1-p2b": { mode: "compare",
    sets: [
      { expr: "x^2-4*x+4", ineq: "<", label: "相切：x²−4x+4<0（无解）" },
      { expr: "x^2+1", ineq: ">", label: "悬空：x²+1>0（恒成立）" }
    ],
    note: "左：(x−2)²<0 无解；右：x²+1>0 恒成立" },
  "ch05-u2-l2-p1b": { mode: "param-sweep",
    sets: [ { expr: "(x-2)*(x-a)", ineq: ">", label: "(x−2)(x−a)>0" } ],
    xAxis: { min: -1, max: 7 },
    note: "a>2：x<2 或 x>a；a=2：x≠2；a<2：x<a 或 x>2" },
  "ch05-u2-l4-p1": { mode: "single",
    sets: [ { expr: "x^2-3*x+2", ineq: ">", label: "x²−3x+2>0" } ] },
};
/* ch05 vertex 三页（最值，非 ineq） */
const CH05_VERTEX = ["ch05-u2-l3-p1", "ch05-u2-l3-p1b", "ch05-ux-l1-p1"];

/* 分式 forbidAt（waveA-design.md 附录 B，绿队签字表） */
const FORBID = {
  "ch03-u1-l1-p2": [],
  "ch03-u1-l1-p2b": [],
  "ch03-u2-l3-p1": [0],
  "ch03-u2-l3-p1b": [0],
  "ch03-u2-l3-p2": [],
  "ch03-u2-l3-p2b": [],
  "ch03-ux-l1-p1": [0],
};
/* 增根标记（文案要求在 x=2/3 处打 ✕；forbidAt=[] 故用独立字段） */
const MARKX = {
  "ch03-u2-l3-p2": [2],
  "ch03-u2-l3-p2b": [3],
};

/* 批次二 R1 9 页 aux（eq-graph 数轴解点联动；主交互不动） */
const BATCH2_AUX = {
  "ch00-u1-l1-p1b": { min: 0, max: 14, expr: "x + 5", target: 12,
    targetLabel: "x + 5 = 12 的解",
    caption: "天平上把 x 单独留下——解点在数轴上的位置" },
  "ch00-u1-l1-p2": { min: 0, max: 10, expr: "x + 3", target: 8,
    targetLabel: "x + 3 = 8 的解",
    caption: "等式 x+3=8 的解 x=5，在数轴上就是这个点" },
  "ch01-u1-l1-p1b": { min: 0, max: 12, expr: "2*x + 1", target: 11,
    targetLabel: "2x + 1 = 11 的解",
    caption: "天平上 2x+1=11 的解 x=5，在数轴上就是这个点" },
  "ch01-u1-l2-p1": { min: 0, max: 10, expr: "x + 3", target: 8,
    targetLabel: "x + 3 = 8 的解",
    caption: "两边同减 3 后 x=5：解点在数轴上不动，变的只是写法" },
  "ch01-u1-l2-p1b": { min: 0, max: 16, expr: "x + 7", target: 15,
    targetLabel: "x + 7 = 15 的解",
    caption: "性质 1：两边加减同一数，解点在数轴上的位置不变" },
  "ch01-u2-l1-p1": { min: 0, max: 14, expr: "x + 5", target: 12,
    targetLabel: "x + 5 = 12 的解",
    caption: "把 x 单独留下：解 x=7 在数轴上的位置" },
  "ch01-u2-l1-p1b": { min: 0, max: 8, expr: "2*x - 8", target: 0,
    targetLabel: "2x − 8 = 0 的解（x+8=3x 移项得）",
    caption: "移项：+8 搬到右边变 −8，解 x=4 落在数轴这里" },
  "ch01-ux-l1-p1": { min: 0, max: 8, expr: "3*x - 12", target: 0,
    targetLabel: "3x − 12 = 0 的解（5x−3=2x+9 移项得）",
    caption: "第 4 题 5x−3=2x+9：移项得 3x=12，解 x=4" },
};
/* 批次二判别式页（按设计转抛物线联动；原页无 target，补 target=0 即横轴） */
const DISCRIMINANT = "ch04-u2-l1-p1b";

/* 几何 5 页 morph 描述子（waveA-design.md §3.1 人工编写） */
const MORPHS = {
  "g00-u1-l3-p1": {
    kind: "assemble", durationMs: 1400,
    pairs: [[1, 1], [2, 2], [3, 3]],
    stagger: 0.15,
    readout: { template: "∠1+∠2+∠3 = {v}°", from: 0, to: 180, decimals: 0 }
  },
  "g02-u2-l4-p3": {
    kind: "translate", durationMs: 1200,
    pairs: [[0, 1]],
    readout: { template: "y = x + {v}", from: 0, to: 2, decimals: 1 }
  },
  "g08-u1-l3-p1": {
    kind: "fold", durationMs: 1400,
    axis: [[45, 55], [88, 30]],
    moving: [5, 3],   /* PA 线段(idx5)与 A 点(idx3)；已按实际 shapes 核对 */
    hide1: [4]         /* view1 的 PA 实线由 moving 提供（折叠后位置） */
  },
  "g11-u1-l5-p3": {
    kind: "discrete-steps", durationMs: 750,
    steps: [8, 16, 32, 64, 128],
    generator: "petal-strip",
    genParams: { cx: 50, cy: 41, R: 38 }
  },
  "g13-u1-l7-p2": {
    kind: "translate", durationMs: 1200,
    pairs: [[0, 0], [1, 1]],  /* 设计写 [[0,0]]；加 [1,1] 实现"圆心点同步" */
    readout: { template: "(x−{a})²+(y−{b})²=r²",
               a: { from: 0, to: 1 }, b: { from: 0, to: 1 }, decimals: 1 }
  },
};

/* ch06 回链（hint 追加，文本深链引用） */
const CH06_BACKLINKS = {
  "ch06-u2-l4-p1": "大会师回看：#p=ch05x-u3-l1-p2「方程组的解 = 两条直线的交点」——交点即解的思想从这里来。",
  "ch06-u2-l4-p1b": "交点即解的完整形态见 #p=ch05x-u3-l1-p2：二元一次方程组的解就是两条直线交点的坐标。",
  "ch06-u0-l1-p1": "预告回音：#p=ch05x-u3-l2-p1 说过，下一章这些直线会有新名字——一次函数。",
  "ch06-u0-l1-p1b": "预告回音：#p=ch05x-u3-l2-p1 说过，下一章这些直线会有新名字——一次函数。",
};

/* ================= §3 文件手术工具 ================= */
function maskSrc(src) {
  /* 把字符串/注释替换为空格（保留长度与换行），供 brace 匹配 */
  let out = "", i = 0, n = src.length;
  let st = null; // "'", '"', "`", "//", "/*"
  while (i < n) {
    const c = src[i], nx = src[i + 1];
    if (!st) {
      if (c === "/" && nx === "/") { st = "//"; out += "  "; i += 2; continue; }
      if (c === "/" && nx === "*") { st = "/*"; out += "  "; i += 2; continue; }
      if (c === "'" || c === '"' || c === "`") { st = c; out += " "; i++; continue; }
      out += c; i++; continue;
    }
    if (st === "//") {
      if (c === "\n") { st = null; out += c; } else out += " ";
      i++; continue;
    }
    if (st === "/*") {
      if (c === "*" && nx === "/") { st = null; out += "  "; i += 2; }
      else { out += (c === "\n" ? "\n" : " "); i++; }
      continue;
    }
    /* string */
    if (c === "\\") { out += "  "; i += 2; continue; }
    if (c === st) { st = null; out += " "; i++; continue; }
    /* 模板字符串的 ${} 保留 brace 供匹配 */
    if (st === "`" && c === "$" && nx === "{") { out += "${"; i += 2; continue; }
    out += (c === "\n" ? "\n" : " ");
    i++;
  }
  return out;
}
function matchBrace(masked, openIdx) {
  /* openIdx 指向 '{'；返回对应的 '}' 下标（含） */
  let d = 0;
  for (let i = openIdx; i < masked.length; i++) {
    if (masked[i] === "{") d++;
    else if (masked[i] === "}") { d--; if (d === 0) return i; }
  }
  return -1;
}
function matchBracket(masked, openIdx) {
  /* openIdx 指向 '['；返回对应的 ']' 下标（含） */
  let d = 0;
  for (let i = openIdx; i < masked.length; i++) {
    if (masked[i] === "[") d++;
    else if (masked[i] === "]") { d--; if (d === 0) return i; }
  }
  return -1;
}
function findPageSpan(src, masked, pageId) {
  const m = new RegExp("\\bid\\s*:\\s*\"" + pageId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\"").exec(src);
  if (!m) return null;
  /* 反向找包围 id 的 '{' */
  let d = 0, open = -1;
  for (let i = m.index - 1; i >= 0; i--) {
    const c = masked[i];
    if (c === "}") d++;
    else if (c === "{") { if (d === 0) { open = i; break; } d--; }
  }
  if (open < 0) return null;
  const close = matchBrace(masked, open);
  if (close < 0) return null;
  return { open, close };
}
function findFieldSpan(src, masked, pageSpan, field) {
  /* 在页对象内找 field: value（顶层字段），返回值块 span；value 可为 {} / [] / 标量 */
  const sub = masked.slice(pageSpan.open, pageSpan.close + 1);
  const re = new RegExp("\\b" + field + "\\s*:");
  const m = re.exec(sub);
  if (!m) return null;
  /* 确认是顶层：统计 m.index 之前的 brace 深度（相对页对象） */
  let d = 0;
  for (let i = 0; i < m.index; i++) {
    if (sub[i] === "{") d++;
    else if (sub[i] === "}") d--;
  }
  if (d !== 1) return null;  /* 不在页对象顶层 */
  const colon = pageSpan.open + m.index + m[0].length;
  /* 值起始：跳过空白 */
  let vs = colon;
  while (vs <= pageSpan.close && /\s/.test(masked[vs])) vs++;
  const openCh = masked[vs];
  let ve;
  if (openCh === "{") ve = matchBrace(masked, vs);
  else if (openCh === "[") ve = matchBracket(masked, vs);
  else {
    /* 标量：到逗号或闭括号 */
    const tail = masked.slice(vs, pageSpan.close + 1);
    const em = /[,}\]]/.exec(tail);
    if (!em) return null;
    ve = vs + em.index - 1;
  }
  if (ve < 0) return null;
  return { start: vs, end: ve };
}

/* JS 对象序列化（文件风格：2 空格缩进，合法标识符不加引号） */
function isIdKey(k) { return /^[A-Za-z_$][A-Za-z0-9_$]*$/.test(k); }
function serVal(v, ind) {
  const pad = "  ".repeat(ind);
  if (v === null || v === undefined) return "null";
  if (typeof v === "number") return String(v);
  if (typeof v === "boolean") return String(v);
  if (typeof v === "string") return JSON.stringify(v);
  if (Array.isArray(v)) {
    if (!v.length) return "[]";
    const items = v.map(x => serVal(x, ind + 1));
    /* 短数组单行 */
    if (items.every(s => !s.includes("\n")) && items.join(", ").length < 60)
      return "[ " + items.join(", ") + " ]";
    return "[\n" + items.map(s => pad + "  " + s).join(",\n") + "\n" + pad + "]";
  }
  const ks = Object.keys(v);
  if (!ks.length) return "{}";
  return "{\n" + ks.map(k =>
    pad + "  " + (isIdKey(k) ? k : JSON.stringify(k)) + ": " + serVal(v[k], ind + 1)
  ).join(",\n") + "\n" + pad + "}";
}
function serializeInteraction(ix, baseIndent) {
  const body = serVal(ix, 0);
  /* baseIndent: "interaction:" 所在行的缩进 */
  return body.split("\n").map((ln, i) => i === 0 ? ln : baseIndent + ln).join("\n");
}

/* ================= §4 数据加载 ================= */
function loadCh(chId) {
  const code = fs.readFileSync(path.join(MATH, "data", chId + ".js"), "utf8");
  const window = {};
  const fn = new Function("window", code);
  fn(window);
  return window.MATH_CH[chId];
}
function flatten(ch) {
  const out = [];
  for (const u of ch.units) for (const l of u.lessons) for (const p of l.pages)
    out.push(p);
  return out;
}

/* ================= §5 变换 ================= */
const report = { transformed: [], needsReview: [], errors: [], auxAdded: [],
                 morph: [], backlinks: [], fieldEdits: [] };

function fitParabola(expr, label) {
  const f = x => evalExpr(expr, label, x);
  const c = f(0), b = (f(1) - f(-1)) / 2, a = (f(1) - 2 * f(0) + f(-1)) / 2;
  if (![a, b, c].every(isFinite)) return null;
  for (let x = -3; x <= 3; x++) {
    const expect = a * x * x + b * x + c, got = f(x);
    if (!isFinite(got) || Math.abs(expect - got) > 1e-9) return null;
  }
  return { a, b, c };
}

function buildEqGraphLab(oldParams, kind, extraGraph) {
  const p = {
    min: oldParams.min, max: oldParams.max,
    step: oldParams.step == null ? 1 : oldParams.step,
    label: oldParams.label || "x",
    expr: oldParams.expr,
    target: oldParams.target,
  };
  if (oldParams.targetLabel) p.targetLabel = oldParams.targetLabel;
  if (oldParams.unit) p.unit = oldParams.unit;
  if (oldParams.initial != null) p.initial = oldParams.initial;
  p.graph = Object.assign({ kind }, extraGraph || {});
  const engine = { primitive: "EqGraphLab", version: "2026.10.16.A",
                   params: Object.assign({ kind }, extraGraph || {}) };
  return { type: "eq-graph-lab", params: p, engine };
}

function transformPage(pageId, ix) {
  const pr = ix.params || {};
  const ch = pageId.split("-")[0];

  /* ---- P0: complete-square-lab ---- */
  if (pageId === "ch04-u1-l2-p1") {
    const L = pr.left.params, R = pr.right.params;
    return {
      type: "complete-square-lab",
      params: {
        min: L.min, max: L.max, step: L.step || 1, label: L.label || "x",
        initial: 2, half: 3,
        exprLeft: L.expr, exprRight: R.expr,
        labels: pr.labels || ["配方前", "配方后"],
      },
      engine: { primitive: "CompleteSquareLab", version: "2026.10.16.A",
                params: { half: 3 } },
    };
  }
  /* ---- ch05 ineq ---- */
  if (ch === "ch05" && INEQ[pageId]) {
    const cfg = INEQ[pageId];
    let source;
    if (ix.type === "slider-lab") {
      source = { label: pr.label || "x", min: pr.min, max: pr.max,
                 step: pr.step == null ? 1 : pr.step };
    } else if (ix.type === "side-compare") {
      const L = pr.left.params, Rr = pr.right.params;
      source = { label: L.label || "x",
                 min: Math.min(L.min, Rr.min), max: Math.max(L.max, Rr.max),
                 step: L.step == null ? 1 : L.step };
    } else if (ix.type === "linked-dashboard") {
      source = Object.assign({}, pr.source);
    }
    const p = { source, mode: cfg.mode, sets: cfg.sets, showProbe: true };
    if (cfg.xAxis) p.xAxis = cfg.xAxis;
    if (cfg.note) p.note = cfg.note;
    if (ix.type === "side-compare" && pr.labels) p.compareLabels = pr.labels.slice();
    const engine = { primitive: "IneqShadeLab", version: "2026.10.16.A",
                     params: { mode: cfg.mode, sets: cfg.sets } };
    return { type: "ineq-shade-lab", params: p, engine };
  }
  /* ---- ch05 vertex ---- */
  if (CH05_VERTEX.includes(pageId)) {
    const fit = fitParabola(pr.expr, pr.label || "x");
    if (!fit) { report.needsReview.push(pageId + ": 抛物线拟合失败"); return null; }
    return buildEqGraphLab(pr, "vertex", { a: fit.a, b: fit.b, c: fit.c });
  }
  /* ---- 其余：按章 kind ---- */
  let kind = KIND_BY_CHAPTER[ch];
  if (ch === "ch11") kind = pageId.startsWith("ch11-u3-") ? "zero" : null;
  if (ch === "ch06" && pageId !== "ch06-u2-l5-p1") kind = null;
  if (!kind) return null;  /* 非目标页，不动 */

  if (ix.type !== "slider-lab") {
    report.errors.push(pageId + ": 预期 slider-lab，实际 " + ix.type + "，跳过");
    return null;
  }
  const extra = {};
  if (kind === "parabola" || kind === "vertex") {
    const fit = fitParabola(pr.expr, pr.label || "x");
    if (!fit) { report.needsReview.push(pageId + ": 抛物线拟合失败（NEEDS-REVIEW）"); return null; }
    extra.a = fit.a; extra.b = fit.b; extra.c = fit.c;
  }
  if (kind === "rational") {
    extra.forbidAt = FORBID[pageId] !== undefined ? FORBID[pageId] : "TBD";
    if (MARKX[pageId]) extra.markX = MARKX[pageId];
    if (extra.forbidAt === "TBD") {
      report.needsReview.push(pageId + ": forbidAt TBD 阻断");
      return null;
    }
  }
  return buildEqGraphLab(pr, kind, extra);
}

/* ================= §6 主驱动 ================= */
const CH_FILES = {
  ch00: "ch00.js", ch01: "ch01.js", ch03: "ch03.js", ch04: "ch04.js",
  ch05: "ch05.js", ch06: "ch06.js", ch07: "ch07.js", ch08: "ch08.js",
  ch11: "ch11.js", g00: "g00.js", g02: "g02.js", g08: "g08.js",
  g11: "g11.js", g13: "g13.js",
};
const fileOf = pid => CH_FILES[pid.split("-")[0]];

function replaceField(src, masked, pageSpan, field, newObj) {
  const fspan = findFieldSpan(src, masked, pageSpan, field);
  if (!fspan) return { ok: false, reason: "字段 " + field + " 未找到" };
  const lineStart = src.lastIndexOf("\n", fspan.start) + 1;
  const baseIndent = src.slice(lineStart, fspan.start).match(/^\s*/)[0];
  const body = serializeInteraction(newObj, baseIndent);
  const out = src.slice(0, fspan.start) + body + src.slice(fspan.end + 1);
  return { ok: true, out };
}

function processFile(chId) {
  const fp = path.join(MATH, "data", CH_FILES[chId]);
  let src = fs.readFileSync(fp, "utf8");
  const masked = maskSrc(src);
  const ch = loadCh(chId);
  const pages = flatten(ch);
  const byId = {};
  pages.forEach(p => { byId[p.id] = p; });

  let changed = 0;
  const doReplace = (pageId, field, newObj, tag) => {
    const span = findPageSpan(src, maskSrc(src), pageId);
    if (!span) { report.errors.push(pageId + ": 页对象定位失败"); return; }
    const r = replaceField(src, maskSrc(src), span, field, newObj);
    if (!r.ok) { report.errors.push(pageId + ": " + r.reason); return; }
    src = r.out;
    changed++;
    report.transformed.push(tag + " " + pageId);
  };

  /* ---- 75 页主变换 ---- */
  for (const pid of MAIN75) {
    if (fileOf(pid) !== CH_FILES[chId]) continue;
    const page = byId[pid];
    if (!page) { report.errors.push(pid + ": 数据中未找到"); continue; }
    const newIx = transformPage(pid, page.interaction || {});
    if (!newIx) continue;  /* needsReview/errors 已记录 */
    doReplace(pid, "interaction", newIx, "R1");
  }

  /* ---- 批次二 R1：aux 追加（主交互不动） ---- */
  for (const pid of Object.keys(BATCH2_AUX)) {
    if (fileOf(pid) !== CH_FILES[chId]) continue;
    const cfg = BATCH2_AUX[pid];
    const aux = {
      type: "eq-graph",
      params: {
        min: cfg.min, max: cfg.max, step: 1, label: "x",
        expr: cfg.expr, target: cfg.target,
        targetLabel: cfg.targetLabel, caption: cfg.caption,
      },
      engine: { primitive: "EqGraph", version: "2026.10.16.A",
                params: { kind: "numberline", expr: cfg.expr, target: cfg.target } },
    };
    /* auxInteraction 当前为 null：直接替换 "auxInteraction: null" */
    const span = findPageSpan(src, maskSrc(src), pid);
    if (!span) { report.errors.push(pid + ": 页对象定位失败"); continue; }
    const sub = src.slice(span.open, span.close + 1);
    const m = /\bauxInteraction\s*:\s*null\b/.exec(sub);
    if (!m) { report.errors.push(pid + ": auxInteraction 非 null，跳过（防覆盖）"); continue; }
    const absStart = span.open + m.index;
    const lineStart = src.lastIndexOf("\n", absStart) + 1;
    const baseIndent = src.slice(lineStart, absStart).match(/^\s*/)[0];
    const body = serializeInteraction(aux, baseIndent);
    src = src.slice(0, absStart) + "auxInteraction: " + body + src.slice(absStart + m[0].length);
    changed++;
    report.auxAdded.push(pid);
  }

  /* ---- 批次二判别式页 ---- */
  if (chId === "ch04") {
    const page = byId[DISCRIMINANT];
    if (page) {
      const pr = page.interaction.params || {};
      const fit = fitParabola(pr.expr, pr.label || "x");
      if (!fit) { report.needsReview.push(DISCRIMINANT + ": 拟合失败"); }
      else {
        const newIx = buildEqGraphLab(
          Object.assign({}, pr, { target: 0, targetLabel: "y = 0（横轴）" }),
          "parabola", { a: fit.a, b: fit.b, c: fit.c });
        doReplace(DISCRIMINANT, "interaction", newIx, "R4-disc");
      }
    }
  }

  /* ---- 几何 5 页：type 替换 + morph ---- */
  for (const pid of Object.keys(MORPHS)) {
    if (fileOf(pid) !== CH_FILES[chId]) continue;
    const page = byId[pid];
    if (!page) { report.errors.push(pid + ": 数据中未找到"); continue; }
    const ix = page.interaction || {};
    if (ix.type !== "compare-toggle") {
      report.errors.push(pid + ": 预期 compare-toggle，实际 " + ix.type); continue;
    }
    const newIx = {
      type: "morph-toggle",
      params: {
        views: ix.params.views,
        morph: MORPHS[pid],
        controls: { play: true, scrub: true, step: true, replay: true },
      },
      engine: { primitive: "MorphToggle", version: "2026.10.16.A",
                params: { kind: MORPHS[pid].kind } },
    };
    doReplace(pid, "interaction", newIx, "R4-geom");
    report.morph.push(pid);
  }

  /* ---- ch05 末页 next / ch06 首页 prev（字段级） ---- */
  if (chId === "ch05" || chId === "ch06") {
    const edits = chId === "ch05"
      ? [{ pid: "ch05-ux-l1-p1", field: "next", value: "ch05x-u1-l1-p1" }]
      : [{ pid: "ch06-u0-l1-p1", field: "prev", value: "ch05x-u3-l2-p1" }];
    for (const e of edits) {
      const span = findPageSpan(src, maskSrc(src), e.pid);
      if (!span) { report.errors.push(e.pid + ": 页对象定位失败"); continue; }
      const sub = src.slice(span.open, span.close + 1);
      const m = new RegExp("\\b" + e.field + "\\s*:\\s*([a-zA-Z0-9_\"'$.\\[\\] ]+)").exec(sub);
      if (!m) { report.errors.push(e.pid + ": 字段 " + e.field + " 未找到"); continue; }
      const absStart = span.open + m.index + m[0].indexOf(m[1]);
      const absEnd = absStart + m[1].length;
      src = src.slice(0, absStart) + JSON.stringify(e.value) + src.slice(absEnd);
      changed++;
      report.fieldEdits.push(e.pid + "." + e.field + " → " + e.value);
    }
  }

  /* ---- ch06 回链 hints（追加一条） ---- */
  if (chId === "ch06") {
    for (const pid of Object.keys(CH06_BACKLINKS)) {
      const span = findPageSpan(src, maskSrc(src), pid);
      if (!span) { report.errors.push(pid + ": 页对象定位失败"); continue; }
      const m2 = maskSrc(src);
      const fspan = findFieldSpan(src, m2, span, "hints");
      if (!fspan) { report.errors.push(pid + ": hints 字段未找到"); continue; }
      /* 在数组末尾追加：逗号接在最后一个元素后，新元素独占一行 */
      const arrText = src.slice(fspan.start, fspan.end + 1);
      const closeIdx = arrText.lastIndexOf("]");
      const insAt = fspan.start + closeIdx;
      const lineStart = src.lastIndexOf("\n", insAt) + 1;
      const baseIndent = src.slice(lineStart, insAt).match(/^\s*/)[0];
      /* 找到最后一个元素的结尾（] 前最后一个 "） */
      let elemEnd = insAt - 1;
      while (elemEnd > fspan.start && src[elemEnd] !== '"') elemEnd--;
      const newHint = JSON.stringify(CH06_BACKLINKS[pid]);
      const insertion = ",\n" + baseIndent + "  " + newHint;
      src = src.slice(0, elemEnd + 1) + insertion + src.slice(elemEnd + 1);
      changed++;
      report.backlinks.push(pid);
    }
  }

  if (changed && !DRY) fs.writeFileSync(fp, src);
  return changed;
}

/* ================= §7 校验门 ================= */
function gate() {
  const errs = [];
  const dataDir = path.join(MATH, "data");
  const allCh = fs.readdirSync(dataDir)
    .filter(f => /^ch\d+\.js$/.test(f) || /^g\d+\.js$/.test(f))
    .map(f => f.replace(/\.js$/, ""));
  const loadAny = chId => {
    const fp = path.join(dataDir, chId + ".js");
    const code = fs.readFileSync(fp, "utf8");
    const window = {};
    const module = { exports: {} };
    const fn = new Function("window", "module", "exports", code + "\nreturn window.MATH_CH ? window.MATH_CH['" + chId + "'] : module.exports;");
    return fn(window, module, module.exports);
  };
  /* 门1/2：无 TBD（forbidAt/ineq/morph） */
  for (const chId of allCh) {
    const src = fs.readFileSync(path.join(dataDir, chId + ".js"), "utf8");
    if (/"TBD/.test(src)) errs.push(chId + ".js 含 TBD 残留");
  }
  /* 门4：页 id 全局唯一 */
  const seen = {}, dup = [];
  for (const chId of allCh) {
    const ch = loadAny(chId);
    flatten(ch).forEach(p => {
      if (seen[p.id]) dup.push(p.id); seen[p.id] = 1;
    });
  }
  if (dup.length) errs.push("页 id 重复: " + dup.join(","));
  /* 门5：页数（ch05x 未建时：代数 279、几何 341） */
  let alg = 0, geo = 0;
  for (const chId of allCh) {
    const n = flatten(loadAny(chId)).length;
    if (chId.startsWith("ch")) alg += n; else geo += n;
  }
  if (alg !== 279) errs.push("代数页数=" + alg + "，期望 279");
  if (geo !== 341) errs.push("几何页数=" + geo + "，期望 341");
  /* 新类型必须带 engine 声明 */
  const newTypes = ["eq-graph-lab", "ineq-shade-lab", "morph-toggle",
    "complete-square-lab", "eq-graph"];
  for (const chId of allCh) {
    const ch = loadAny(chId);
    flatten(ch).forEach(p => {
      ["interaction", "auxInteraction"].forEach(k => {
        const ix = p[k];
        if (ix && ix.type && newTypes.includes(ix.type) && !ix.engine) {
          errs.push(p.id + ": 新类型 " + ix.type + " 缺 engine 声明");
        }
      });
    });
  }
  return errs;
}

/* ================= §8 运行 ================= */
let totalChanged = 0;
for (const chId of Object.keys(CH_FILES)) {
  totalChanged += processFile(chId);
}
const gateErrs = gate();
report.errors.push(...gateErrs.map(e => "GATE: " + e));

const out = {
  dryRun: DRY,
  filesChanged: totalChanged,
  transformed: report.transformed.length,
  auxAdded: report.auxAdded,
  morph: report.morph,
  backlinks: report.backlinks,
  fieldEdits: report.fieldEdits,
  needsReview: report.needsReview,
  errors: report.errors,
};
console.log(JSON.stringify(out, null, 1));
fs.writeFileSync(path.join(REPO, "tools", "waveA-transform-report.json"),
  JSON.stringify(out, null, 1));
if (report.errors.length || report.needsReview.length) process.exit(2);
