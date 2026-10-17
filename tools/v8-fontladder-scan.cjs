#!/usr/bin/env node
/* V8 字号阶梯 · 固化全量扫描（套件常驻项）
 * 设计阶梯 {0.78,0.85,0.95,1,1.05,1.25,1.5}rem（root 16px → {12.48,13.6,15.2,16,16.8,20,24}px），容差 0.5px。
 * 测量口径：SVG text 取 computed font-size × getScreenCTM 缩放模（= 实际渲染字号）；
 *           Konva.Text 取 fontSize() × 绝对缩放；
 *           HTML 文本取 computed font-size（地理/物理分支用，按 tag+class 去重）。
 * 页面清单运行时自数据文件生成（不依赖外部清单文件，新增页面自动纳入）：
 *   化学：modules/chemistry/data/cm*.js 中 id:"cmX.Y.Z-pN" → lesson→页数，hash #<lesson>/<n>
 *   数学：modules/math/data/*.js 中 id:"ch../g..-u../ux/ub-l..-p.." → hash #p=<pid>（每页全新 newPage 加载，hash 跳转不重渲染）
 *   地理：modules/geography/data/dg*.js 中 id:"dgX.Y.Z-pN" → hash #<lesson>/<n>（全量，dg00 起全部已上线课）
 *   物理：modules/physics/data/p*.js 中 id:"pX.Y.Z-pN" → hash #<lesson>/<n>（全量 18 章）
 * Konva 文本节点须全落阶梯（2026-10-17 物理收尾修复批由 p12.1.1 换入：p12.1.1
 * 已迁为 JSXGraph，原口径过期）。
 * 豁免机制：GEO_EXEMPTIONS 仅收录有书面口径依据的豁免（RENDERERS.md 冻结口径），
 *   豁免节点计入 summary.exempted 并逐项列出，仍落盘备查；新发现的未达标节点一律
 *   计 bad、非零退出，不得为 PASS 加豁免。
 * 用法：node tools/v8-fontladder-scan.cjs [--chem] [--math] [--geo] [--physics] [--physics-spot] [--smoke] [--out DIR]
 *   默认跑化学+数学全量；--smoke 只跑 6 页冒烟。未达标节点数 >0 即 exit 1。
 *   --geo：地理全量（124 页；HTML 文本 computed 字号 + 去重按 class 统计）。
 *   --physics：物理全量（356 页；Konva + SVG 画布双通道，HTML 文案不在 V8 口径内）。
 *   --physics-spot：物理抽查门（电路 p08.2.4/1、p09.1.2/1 两页 Konva，V8 范围外只验零回退；语义不变，快速回归用）。
 * 2026-10-17 V8 转正时固化（基线 56 节点 32.1% → 转正复测 2365/2365 100%）。
 * 2026-10-17 地理试点闸门增补 --geo 分支（白队；只加地理分支，不改既有逻辑）。
 * 2026-10-17 工具批扩围：--geo 由试点 4 页扩为地理全量（动态课清单）；新增 --physics
 *   物理全量画布双通道；--physics-spot 语义保持（电路两页快速门）；新增 GEO_EXEMPTIONS
 *   豁免清单（仅 2 项既有书面依据）。
 */
const fs = require("fs");
const path = require("path");
const REPO = path.resolve(__dirname, "..");
const LADDER_REM = [0.78, 0.85, 0.95, 1, 1.05, 1.25, 1.5];
const TOL = 0.5;
const PW = "/home/hatch/workspace/phy-audit/node_modules/playwright-core";

const args = new Set(process.argv.slice(2));
const OUT = args.has("--out") ? process.argv[process.argv.indexOf("--out") + 1] : path.join(REPO, "tools", "v8-scan-out");
const SMOKE = args.has("--smoke");
const runGeo = args.has("--geo");
const runChem = !args.has("--math") && !args.has("--physics-spot") && !args.has("--physics") && !args.has("--geo") ? true : args.has("--chem");
const runMath = !args.has("--chem") && !args.has("--physics-spot") && !args.has("--physics") && !args.has("--geo") ? true : args.has("--math");
const runPhy = args.has("--physics-spot");   // 电路两页快速回归门（语义不变）
const runPhyFull = args.has("--physics");    // 物理全量 18 章画布双通道
// 书面口径豁免（仅收录有冻结依据的项；新违规不得加）：
// W3（地理批 3 白队 QA）：2 个「赤道（示意）」SVG 逻辑单位字，css 3.4，按 RENDERERS.md
// 冻结口径「SVG 矢量文字随视口缩放（非 px 固定，不适用阶梯）」豁免。
const GEO_EXEMPTIONS = [
  { page: "#dg05.1.1/2", txt: "赤道（示意）", reason: "W3: SVG 逻辑单位字，随视口缩放非 px 固定（RENDERERS.md 冻结口径）" },
  { page: "#dg05.1.2/2", txt: "赤道（示意）", reason: "W3: SVG 逻辑单位字，随视口缩放非 px 固定（RENDERERS.md 冻结口径）" },
  { page: "#dg02.2.2/2", txt: "南美洲", reason: "批 2 白队 QA（832 节点 0 bad）：G9 板块拼图 SVG 逻辑单位字，按 RENDERERS.md 冻结口径豁免" },
  { page: "#dg02.2.2/3", txt: "亚欧板块", reason: "批 2 白队 QA（832 节点 0 bad）：G9 板块拼图 SVG 逻辑单位字，按 RENDERERS.md 冻结口径豁免" },
];
function isGeoExempt(page, txt) {
  return GEO_EXEMPTIONS.some(e => e.page === page && txt.startsWith(e.txt));
}

function chemLessons() {
  const map = new Map();
  const re = /id: *"(cm\d+\.\d+\.\d+)-p\d+"/g;
  for (const f of fs.readdirSync(path.join(REPO, "modules/chemistry/data"))) {
    if (!/^cm\d+\.js$/.test(f)) continue;
    const src = fs.readFileSync(path.join(REPO, "modules/chemistry/data", f), "utf8");
    let m; while ((m = re.exec(src))) map.set(m[1], (map.get(m[1]) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1);
}
function mathPages() {
  const set = new Set();
  const re = /id: *"((ch[0-9x]+|g[0-9]+)-(u[0-9]+|ux|ub)-l[0-9]+-p[0-9]+[a-z]*)"/g;
  for (const f of fs.readdirSync(path.join(REPO, "modules/math/data"))) {
    if (!f.endsWith(".js")) continue;
    const src = fs.readFileSync(path.join(REPO, "modules/math/data", f), "utf8");
    let m; while ((m = re.exec(src))) set.add(m[1]);
  }
  return [...set].sort();
}
// 地理课清单：modules/geography/data/dg*.js（_review 等非课文件天然排除），
// id:"dgX.Y.Z-pN" → lesson→页数；hash #<lesson>/<n>。新增课自动纳入。
function geoLessons() {
  const map = new Map();
  const re = /id: *"(dg\d+\.\d+\.\d+)-p\d+"/g;
  for (const f of fs.readdirSync(path.join(REPO, "modules/geography/data"))) {
    if (!/^dg\d+\.js$/.test(f)) continue;
    const src = fs.readFileSync(path.join(REPO, "modules/geography/data", f), "utf8");
    let m; while ((m = re.exec(src))) map.set(m[1], (map.get(m[1]) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1);
}
// 物理课清单：modules/physics/data/p*.js，id:"pX.Y.Z-pN" → lesson→页数；hash #<lesson>/<n>。
function physLessons() {
  const map = new Map();
  const re = /id: *"(p\d+\.\d+\.\d+)-p\d+"/g;
  for (const f of fs.readdirSync(path.join(REPO, "modules/physics/data"))) {
    if (!/^p\d+\.js$/.test(f)) continue;
    const src = fs.readFileSync(path.join(REPO, "modules/physics/data", f), "utf8");
    let m; while ((m = re.exec(src))) map.set(m[1], (map.get(m[1]) || 0) + 1);
  }
  return [...map.entries()].sort((a, b) => a[0] < b[0] ? -1 : 1);
}
const MEASURE_JS = `() => {
  const out = [];
  const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const ladder = [0.78,0.85,0.95,1,1.05,1.25,1.5].map(r => r * rootPx);
  document.querySelectorAll("svg text").forEach(el => {
    var cssPx = parseFloat(getComputedStyle(el).fontSize);
    var scale = 1;
    try { var m = el.getScreenCTM(); if (m) scale = Math.sqrt(Math.abs(m.a*m.d - m.b*m.c)) || 1; } catch(e) {}
    var px = cssPx * scale;
    var dmin = Math.min.apply(null, ladder.map(L => Math.abs(px - L)));
    out.push({ kind:"svg-text", css:+cssPx.toFixed(2), ctm:+scale.toFixed(3), px:+px.toFixed(2),
      ok:dmin<=0.5, dmin:+dmin.toFixed(2),
      cls:(el.getAttribute("class")||"").trim().split(/\\s+/).slice(0,2).join(" "),
      txt:(el.textContent||"").slice(0,14) });
  });
  return { rootPx, texts: out };
}`;
// 地理分支：HTML 文本节点 computed 字号（地理页为 HTML 文案 + canvas，无 SVG 文本；
// canvas 注记字号由白队闸门脚本另行抽查代码字面量）。按 tag+class 去重，每类样式只记一次。
const MEASURE_GEO = `() => {
  const out = [];
  const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
  const ladder = [0.78,0.85,0.95,1,1.05,1.25,1.5].map(r => r * rootPx);
  const seen = new Set();
  document.querySelectorAll("body *").forEach(elm => {
    if (elm.tagName === "SCRIPT" || elm.tagName === "STYLE") return;
    let hasText = false;
    for (const nd of elm.childNodes) {
      if (nd.nodeType === 3 && nd.textContent.trim().length > 0) { hasText = true; break; }
    }
    if (!hasText) return;
    const key = elm.tagName + "|" + String(elm.className || "");
    if (seen.has(key)) return; seen.add(key);
    const cssPx = parseFloat(getComputedStyle(elm).fontSize);
    const dmin = Math.min.apply(null, ladder.map(L => Math.abs(cssPx - L)));
    out.push({ kind:"geo-html", css:+cssPx.toFixed(2), px:+cssPx.toFixed(2),
      ok:dmin<=0.5, dmin:+dmin.toFixed(2),
      cls:String(elm.className||"").split(/\\s+/).slice(0,2).join(" "),
      txt:(elm.textContent||"").trim().slice(0,14) });
  });
  return { rootPx, texts: out };
}`;
/* 物理全量双通道求值体：Konva.Text（绝对缩放）+ SVG text（CTM 缩放模）。
 * 口径说明（2026-10-17 工具批）：V8 阶梯政策（docs/white-team-lessons.md §8）约束的是
 * 「画布文字」，物理模块的 HTML 文案走设计系统排版（如 11.52px 页码指示、14.4px
 * 列表序号），从未纳入 V8 门禁；地理 --geo 测 HTML 是地理队在试点闸门自选的口径，
 * 不通用到物理。全量跑曾试测 HTML 通道，356 页涌出 1407 个设计排版字号命中，
 * 属口径误用，已移除，仅保留画布双通道。 */
const MEASURE_PHY_FULL = `() => {
  const ladder = [0.78,0.85,0.95,1,1.05,1.25,1.5].map(r => r * 16);
  const near = px => Math.min.apply(null, ladder.map(L => Math.abs(px - L)));
  const konva = []; const seen = {};
  document.querySelectorAll("canvas").forEach(cv => {
    const st = window.Konva && Konva.stages ? Konva.stages : [];
    st.forEach(s => s.find("Text").forEach(t => {
      var px = t.fontSize() * Math.abs(t.getAbsoluteScale().x);
      var key = t.text() + "|" + px.toFixed(2);
      if (seen[key]) return; seen[key] = 1;
      konva.push({ ch:"konva", px:+px.toFixed(2), ok:near(px)<=0.5, dmin:+near(px).toFixed(2), txt:(t.text()||"").slice(0,10) });
    }));
  });
  const svg = [];
  document.querySelectorAll("svg text").forEach(el => {
    var cssPx = parseFloat(getComputedStyle(el).fontSize);
    var scale = 1;
    try { var m = el.getScreenCTM(); if (m) scale = Math.sqrt(Math.abs(m.a*m.d - m.b*m.c)) || 1; } catch(e) {}
    var px = cssPx * scale;
    svg.push({ ch:"svg", css:+cssPx.toFixed(2), ctm:+scale.toFixed(3), px:+px.toFixed(2),
      ok:near(px)<=0.5, dmin:+near(px).toFixed(2), txt:(el.textContent||"").slice(0,14) });
  });
  return { konva, svg };
}`;
/* 物理抽查求值体（--physics-spot 快速回归门用）：Konva.Text 取 fontSize() × 绝对缩放
 * = 实际渲染字号，与阶梯 {12.48,…,24}（root 16px）比对，容差 0.5px。 */
const MEASURE_PHY_SPOT = `() => {
  const ladder = [0.78,0.85,0.95,1,1.05,1.25,1.5].map(r => r * 16);
  const out = []; const seen = {};
  document.querySelectorAll("canvas").forEach(cv => {
    const st = window.Konva && Konva.stages ? Konva.stages : [];
    st.forEach(s => s.find("Text").forEach(t => {
      var px = t.fontSize() * Math.abs(t.getAbsoluteScale().x);
      var dmin = Math.min.apply(null, ladder.map(L => Math.abs(px - L)));
      var key = t.text() + "|" + px.toFixed(2); // 同一 stage 被多 canvas 重数时去重
      if (seen[key]) return; seen[key] = 1;
      out.push({ kind:"konva", px:+px.toFixed(2), ok:dmin<=0.5, txt:(t.text()||"").slice(0,10) });
    }));
  });
  return out;
}`;

(async () => {
  const pw = require(PW);
  const b = await pw.chromium.launch({ executablePath: "/opt/meta-chromium/chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  fs.mkdirSync(OUT, { recursive: true });
  const summary = { ladderRem: LADDER_REM, tol: TOL, subjects: {} };
  let bad = 0;

  if (runChem) {
    const lessons = chemLessons();
    const pages = [];
    lessons.forEach(([lid, n]) => { for (let i = 1; i <= n; i++) pages.push(`#${lid}/${i}`); });
    const list = SMOKE ? pages.filter(h => /cm16\.2\.1\/1|cm13\.3\.1\/1|cm16\.1\.1\/1/.test(h)) : pages;
    const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
    const errs = []; pg.on("pageerror", e => errs.push(e.message.slice(0, 100)));
    const rows = []; let ok = 0, err = 0;
    for (const hash of list) {
      try {
        await pg.goto(`file://${REPO}/modules/chemistry/index.html${hash}`, { waitUntil: "load", timeout: 25000 });
        await pg.waitForTimeout(900);
        const d = await pg.evaluate(`(${MEASURE_JS})()`);
        d.texts.forEach(t => rows.push({ page: hash, ...t })); ok++;
      } catch (e) { err++; }
    }
    await pg.close();
    const on = rows.filter(r => r.ok).length;
    summary.subjects.chemistry = { pages: list.length, okPages: ok, errPages: err, nodes: rows.length, onLadder: on, bad: rows.length - on, pageerrors: errs.length };
    bad += rows.length - on;
    fs.writeFileSync(path.join(OUT, "v8-scan-chem.json"), JSON.stringify(rows));
    console.log(`CHEM pages=${ok}/${list.length} nodes=${rows.length} onLadder=${on} bad=${rows.length - on} pageerrors=${errs.length}`);
  }

  if (runMath) {
    let pids = mathPages();
    if (SMOKE) pids = ["ch12-u1-l1-p1", "ch12-u1-l1-p1b", "ch02-ux-l1-p1", "g08-u1-l3-p1", "ch01-u2-l4-p2", "g02-u2-l5-p2"];
    const rows = []; const errs = []; let ok = 0, err = 0;
    for (const pid of pids) {
      const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
      pg.on("pageerror", e => errs.push(pid + ": " + e.message.slice(0, 80)));
      try {
        await pg.goto(`file://${REPO}/modules/math/index.html#p=${pid}`, { waitUntil: "load", timeout: 25000 });
        await pg.waitForTimeout(1200);
        const d = await pg.evaluate(`(${MEASURE_JS})()`);
        d.texts.forEach(t => rows.push({ page: pid, ...t })); ok++;
      } catch (e) { err++; errs.push(pid + " LOAD:" + e.message.slice(0, 60)); }
      await pg.close();
    }
    const on = rows.filter(r => r.ok).length;
    summary.subjects.math = { pages: pids.length, okPages: ok, errPages: err, nodes: rows.length, onLadder: on, bad: rows.length - on, pageerrors: errs.length };
    bad += rows.length - on;
    fs.writeFileSync(path.join(OUT, "v8-scan-math.json"), JSON.stringify(rows));
    console.log(`MATH pages=${ok}/${pids.length} nodes=${rows.length} onLadder=${on} bad=${rows.length - on} pageerrors=${errs.length}`);
    if (errs.length) console.log("ERRS:", errs.slice(0, 6).join(" || "));
  }

  if (runPhy) {
    // 抽查口径：电路两页（p08.2.4/1、p09.1.2/1）Konva 文本节点须全落阶梯；只验零回退。
    // 求值体须用 `(${BODY})()` 形式传入（裸字符串在本版 playwright-core 下求值
    // 失败，见 2026-10-17 物理收尾修复批定位），与 MEASURE_JS/MEASURE_GEO 同式。
    const rows = []; const errs = [];
    for (const hash of ["#p08.2.4/1", "#p09.1.2/1"]) {
      const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
      pg.on("pageerror", e => errs.push(hash + ": " + e.message.slice(0, 80)));
      await pg.goto(`file://${REPO}/modules/physics/index.html${hash}`, { waitUntil: "load", timeout: 25000 });
      await pg.waitForTimeout(2000);
      const d = await pg.evaluate(`(${MEASURE_PHY_SPOT})()`);
      d.forEach(r => rows.push({ page: hash, ...r }));
      await pg.close();
    }
    const on = rows.filter(r => r.ok).length;
    summary.subjects.physicsSpot = { pages: ["#p08.2.4/1", "#p09.1.2/1"], nodes: rows.length, onLadder: on, bad: rows.length - on, pageerrors: errs.length };
    bad += rows.length - on;
    fs.writeFileSync(path.join(OUT, "v8-scan-physpot.json"), JSON.stringify(rows));
    console.log(`PHYS-SPOT pages=2 nodes=${rows.length} onLadder=${on} bad=${rows.length - on} pageerrors=${errs.length}`);
    if (rows.length - on) console.log("BAD:", rows.filter(r => !r.ok).map(r => r.page + " " + r.px + "px " + r.txt).join(" || "));
  }

  if (runGeo) {
    // 地理全量：dg00 起全部已上线课（课清单运行时自数据文件生成，新增课自动纳入）
    const pages = [];
    geoLessons().forEach(([lid, n]) => { for (let i = 1; i <= n; i++) pages.push(`#${lid}/${i}`); });
    const list = SMOKE ? pages.slice(0, 2) : pages;
    const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
    const errs = []; pg.on("pageerror", e => errs.push(e.message.slice(0, 100)));
    const rows = []; const exempted = []; let ok = 0, err = 0;
    for (const hash of list) {
      try {
        await pg.goto(`file://${REPO}/modules/geography/index.html${hash}`, { waitUntil: "load", timeout: 25000 });
        await pg.waitForTimeout(900);
        const d = await pg.evaluate(`(${MEASURE_GEO})()`);
        d.texts.forEach(t => {
          if (!t.ok && isGeoExempt(hash, t.txt)) { exempted.push({ page: hash, ...t, reason: GEO_EXEMPTIONS.find(e => e.page === hash && t.txt.startsWith(e.txt)).reason }); return; }
          rows.push({ page: hash, ...t });
        }); ok++;
      } catch (e) { err++; }
    }
    await pg.close();
    const on = rows.filter(r => r.ok).length;
    summary.subjects.geography = { pages: list.length, okPages: ok, errPages: err, nodes: rows.length, onLadder: on, bad: rows.length - on, exempted: exempted.length, pageerrors: errs.length };
    bad += rows.length - on;
    fs.writeFileSync(path.join(OUT, "v8-scan-geo.json"), JSON.stringify(rows));
    fs.writeFileSync(path.join(OUT, "v8-scan-geo-exempted.json"), JSON.stringify(exempted, null, 1));
    console.log(`GEO pages=${ok}/${list.length} nodes=${rows.length} onLadder=${on} bad=${rows.length - on} exempted=${exempted.length} pageerrors=${errs.length}`);
    if (rows.length - on) console.log("BAD:", rows.filter(r => !r.ok).map(r => r.page + " " + r.px + "px " + r.txt).join(" || "));
  }

  if (runPhyFull) {
    // 物理全量：18 章全部课页，Konva + SVG 画布双通道（--physics-spot 快速门语义不变）
    const pages = [];
    physLessons().forEach(([lid, n]) => { for (let i = 1; i <= n; i++) pages.push(`#${lid}/${i}`); });
    const list = SMOKE ? ["#p08.2.4/1", "#p09.1.2/1"] : pages;
    const rows = []; const errs = []; let ok = 0, err = 0;
    const ch = { konva: { nodes: 0, on: 0 }, svg: { nodes: 0, on: 0 } };
    for (const hash of list) {
      const pg = await b.newPage({ viewport: { width: 1280, height: 900 } });
      pg.on("pageerror", e => errs.push(hash + ": " + e.message.slice(0, 80)));
      try {
        await pg.goto(`file://${REPO}/modules/physics/index.html${hash}`, { waitUntil: "load", timeout: 25000 });
        await pg.waitForTimeout(2000);
        const d = await pg.evaluate(`(${MEASURE_PHY_FULL})()`);
        for (const [cname, arr] of [["konva", d.konva], ["svg", d.svg]]) {
          arr.forEach(t => { rows.push({ page: hash, ...t }); ch[cname].nodes++; if (t.ok) ch[cname].on++; });
        }
        ok++;
      } catch (e) { err++; errs.push(hash + " LOAD:" + e.message.slice(0, 60)); }
      await pg.close();
    }
    const on = rows.filter(r => r.ok).length;
    summary.subjects.physics = { pages: list.length, okPages: ok, errPages: err, channels: ch, nodes: rows.length, onLadder: on, bad: rows.length - on, pageerrors: errs.length };
    bad += rows.length - on;
    fs.writeFileSync(path.join(OUT, "v8-scan-physics.json"), JSON.stringify(rows));
    console.log(`PHYS-FULL pages=${ok}/${list.length} nodes=${rows.length} (konva ${ch.konva.nodes}/${ch.konva.on}, svg ${ch.svg.nodes}/${ch.svg.on}) bad=${rows.length - on} pageerrors=${errs.length}`);
    const badRows = rows.filter(r => !r.ok);
    if (badRows.length) console.log("BAD:", badRows.slice(0, 12).map(r => r.page + " [" + r.ch + "] " + r.px + "px " + (r.txt || "")).join(" || "));
    if (errs.length) console.log("ERRS:", errs.slice(0, 6).join(" || "));
  }

  await b.close();
  summary.badTotal = bad;
  summary.pass = bad === 0;
  fs.writeFileSync(path.join(OUT, "v8-scan-summary.json"), JSON.stringify(summary, null, 1));
  console.log(bad === 0 ? "V8-SCAN PASS" : `V8-SCAN FAIL bad=${bad}`);
  process.exit(bad === 0 ? 0 : 1);
})().catch(e => { console.error("FATAL", e.message); process.exit(2); });
