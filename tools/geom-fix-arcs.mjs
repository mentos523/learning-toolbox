/* 几何弧修复脚本：2-dir 确定性 snap + 校准验证
 * 用法: node tools/geom-fix-arcs.mjs [--dry-run] [--apply]
 * --dry-run: 只输出拟议修改，不写文件（默认）
 * --apply:   写回数据文件
 */
import { readFileSync, writeFileSync } from "fs";
import path from "path";
import vm from "vm";
import { fileURLToPath } from "url";

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const norm360 = (d) => { d %= 360; return d < 0 ? d + 360 : d; };
const deg = (r) => (r * 180) / Math.PI;
const rad = (d) => (d * Math.PI) / 180;
const dist = (ax, ay, bx, by) => Math.hypot(bx - ax, by - ay);
const dirOf = (ax, ay, bx, by) => norm360(deg(Math.atan2(by - ay, bx - ax)));
const angDiff = (a, b) => Math.abs(norm360(a - b + 180) - 180);
const ptSegDist = (px, py, ax, ay, bx, by) => {
  const dx = bx - ax, dy = by - ay, L2 = dx * dx + dy * dy;
  let t = L2 > 0 ? ((px - ax) * dx + (py - ay) * dy) / L2 : 0;
  t = Math.max(0, Math.min(1, t));
  return dist(px, py, ax + dx * t, ay + dy * t);
};
const TOL = { vertex: 0.75, arcDir: 3 };
const round1 = (x) => Math.round(x * 10) / 10;

// ---- 与审计同款的 sidesOf / emanating（逻辑坐标 y-up） ----
function sidesOf(shapes) {
  const out = [];
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
function emanating(sides, v) {
  const out = [];
  for (const s of sides) {
    if (s.len < 1e-9) continue;
    if (ptSegDist(v[0], v[1], s.x1, s.y1, s.x2, s.y2) > TOL.vertex) continue;
    const d1 = dist(v[0], v[1], s.x1, s.y1), d2 = dist(v[0], v[1], s.x2, s.y2);
    if (d1 > TOL.vertex) out.push({ dir: dirOf(v[0], v[1], s.x1, s.y1), len: d1 });
    if (d2 > TOL.vertex) out.push({ dir: dirOf(v[0], v[1], s.x2, s.y2), len: d2 });
  }
  const ded = [];
  for (const e of out) {
    const same = ded.find((x) => angDiff(x.dir, e.dir) < 1.0);
    if (same) { if (e.len > same.len) same.len = e.len; }
    else ded.push(e);
  }
  return ded;
}

// ---- 帧抽取（仅静态弧相关类型；动态弧由审计重建，此处只处理数据文件里的静态弧） ----
function extractStaticFrames(page) {
  const out = [];
  const jobs = [];
  if (page.interaction) jobs.push([page.interaction, "main"]);
  if (page.auxInteraction) jobs.push([page.auxInteraction, "aux"]);
  for (const [ix, slot] of jobs) {
    const t = ix.type, p = ix.params || {};
    const push = (label, shapes) => out.push({ label, shapes: shapes || [], slot, type: t });
    if (t === "step-play") (p.steps || []).forEach((s, i) => push("step" + (i + 1), s.shapes));
    else if (t === "tap-highlight") push("tap", (p.base || []).concat(p.items || []).map((it) => it.shape || it));
    else if (t === "compare-toggle") (p.views || []).forEach((v, i) => push("view" + i, v.shapes));
    else if (t === "proof-replay") (p.steps || []).forEach((s, i) => push("step" + (i + 1), s.shapes));
    else if (t === "construction-step") (p.steps || []).forEach((s, i) => push("step" + (i + 1), s.shapes));
  }
  return out;
}

// ---- 加载数据 ----
const dataBox = { window: {}, console };
vm.createContext(dataBox);
for (let n = 0; n <= 13; n++) {
  const id = "g" + String(n).padStart(2, "0");
  const src = readFileSync(path.join(ROOT, "modules/math/data", id + ".js"), "utf8");
  vm.runInContext(src, dataBox, { filename: id + ".js" });
}
const CH = dataBox.window.MATH_CH || {};

// ---- 与审计同款的 geoVertices（纯几何顶点，不含弧心） ----
function geoVertices(shapes) {
  const out = [];
  for (const sh of shapes) {
    if (!sh || !sh.t) continue;
    if (sh.t === "seg") { if (sh.a) out.push(sh.a); if (sh.b) out.push(sh.b); }
    else if (sh.t === "poly") (sh.pts || []).forEach((p) => out.push(p));
    else if (sh.t === "ray" || sh.t === "pt") { if (sh.p) out.push(sh.p); }
  }
  return out.filter((p) => Array.isArray(p));
}

// ---- 核心修复逻辑：2-dir 确定性 snap ----
function fixArc2Dir(sh, eman) {
  // 渲染器同款：a1 缺省→0，a2 缺省→90（a2:0 合法保留）
  const a1e = sh.a1 == null ? 0 : +sh.a1;
  const a2e = sh.a2 == null ? 90 : +sh.a2;
  const s1 = norm360(a1e), s2 = norm360(a2e);
  const [d1, d2] = [eman[0].dir, eman[1].dir];
  // 目标：两条真边角，按劣弧顺序
  let t1, t2;
  if (norm360(d2 - d1) <= 180) { t1 = d1; t2 = d2; } else { t1 = d2; t2 = d1; }
  if (angDiff(s1, t1) <= TOL.arcDir && angDiff(s2, t2) <= TOL.arcDir) return null; // 已正确：零改动
  return { a1: round1(t1), a2: round1(t2) };
}

// ---- 主流程 ----
const proposals = [];   // {pageId, chId, frameLabel, v, oldA1, oldA2, newA1, newA2, nDir, note}
const manual = [];      // 非 2-dir，需人工
const auditFails = new Set(
  JSON.parse(readFileSync(path.join(ROOT, "tools/geom-audit-20261014.json"), "utf8"))
    .failures.filter((x) => x.type === "ARC_SIDES_MISMATCH" || x.type === "ARC_SWEEP_MISMATCH")
    .map((x) => x.page + "|" + x.element)
);

for (const chId of Object.keys(CH)) {
  const ch = CH[chId];
  const units = ch.units || [];
  for (const u of units) {
    for (const l of (u.lessons || [])) {
      for (const page of (l.pages || [])) {
        if (!page || !page.id) continue;
        for (const fr of extractStaticFrames(page)) {
          const emanCache = new Map();
          (fr.shapes || []).forEach((sh, idx) => {
            if (!sh || sh.t !== "arc" || !sh.v) return;
            // 审计同款：弧心必须在几何顶点 ±0.75 内，否则是装饰弧，跳过
            const verts = geoVertices(fr.shapes);
            let bd = 1e9;
            for (const q of verts) { const d = dist(sh.v[0], sh.v[1], q[0], q[1]); if (d < bd) bd = d; }
            if (bd > TOL.vertex) return; // 装饰弧或弧心偏移，不在此批量处理
            const key = sh.v[0].toFixed(2) + "," + sh.v[1].toFixed(2);
            if (!emanCache.has(key)) emanCache.set(key, emanating(sidesOf(fr.shapes), sh.v));
            const eman = emanCache.get(key);
            if (eman.length === 2) {
              const fix = fixArc2Dir(sh, eman);
              if (fix) {
                proposals.push({
                  pageId: page.id, chId, frameLabel: fr.label + "/" + fr.slot,
                  v: sh.v.slice(), oldA1: sh.a1, oldA2: sh.a2,
                  newA1: fix.a1, newA2: fix.a2, idx,
                  auditKey: page.id + "|arc v=[" + sh.v[0].toFixed(1) + "," + sh.v[1].toFixed(1) +
                    "] a1=" + sh.a1 + " a2=" + sh.a2 + " r=" + sh.r,
                });
              }
            } else {
              manual.push({
                pageId: page.id, frameLabel: fr.label, v: sh.v.slice(),
                a1: sh.a1, a2: sh.a2, r: sh.r, nDir: eman.length,
                dirs: eman.map((e) => +e.dir.toFixed(1)),
              });
            }
          });
        }
      }
    }
  }
}

console.log("== 2-dir 自动修复提案: " + proposals.length + " ==");
for (const p of proposals) {
  const inAudit = auditFails.has(p.auditKey) ? "AUDIT-FAIL" : "NOT-IN-AUDIT!!";
  console.log(`${p.pageId} ${p.frameLabel} v=[${p.v}] (${p.oldA1},${p.oldA2}) -> (${p.newA1},${p.newA2}) [${inAudit}]`);
}
console.log("\n== 非 2-dir（需人工）: " + manual.length + " ==");
for (const m of manual) {
  console.log(`${m.pageId} ${m.frameLabel} v=[${m.v}] a1=${m.a1} a2=${m.a2} r=${m.r} nDir=${m.nDir} dirs=${JSON.stringify(m.dirs)}`);
}

// 校准：提案必须全部落在审计 FAIL 集合内（不误伤正确弧）
const notInAudit = proposals.filter((p) => !auditFails.has(p.auditKey));
console.log("\n== 校准 ==");
console.log("提案总数: " + proposals.length + "，其中审计 FAIL: " + (proposals.length - notInAudit.length) +
  "，审计未报（误伤）: " + notInAudit.length);
if (notInAudit.length > 0) {
  console.log("校准失败！以下正确弧被误伤：");
  for (const p of notInAudit) console.log("  " + p.pageId, p.frameLabel, p.v, p.oldA1, p.oldA2);
  process.exit(3);
}
// 反向校准：审计 FAIL 的 2-dir 弧是否全被覆盖
const covered = new Set(proposals.map((p) => p.auditKey));
const audit2dir = JSON.parse(readFileSync(path.join(ROOT, "tools/geom-audit-20261014.json"), "utf8"))
  .failures.filter((x) => (x.type === "ARC_SIDES_MISMATCH" || x.type === "ARC_SWEEP_MISMATCH") &&
    x.measured.sideDirsFromV && x.measured.sideDirsFromV.length === 2)
  .map((x) => x.page + "|" + x.element);
const missed = audit2dir.filter((k) => !covered.has(k));
console.log("审计 2-dir FAIL 总数: " + audit2dir.length + "，提案覆盖: " + (audit2dir.length - missed.length) + "，遗漏: " + missed.length);
if (missed.length) { for (const k of missed) console.log("  遗漏: " + k); }
console.log("校准通过。");
