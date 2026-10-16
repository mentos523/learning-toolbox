#!/usr/bin/env node
/* 白队实测：V8 字号阶梯 —— 画布文字渲染字号 vs 设计阶梯
 * 设计阶梯 {0.78,0.85,0.95,1,1.05,1.25,1.5}rem，容差 0.5px
 * 测量：SVG text 取 computed font-size × getScreenCTM 缩放（= 实际渲染字号）；
 *      Konva.Text 取 fontSize() × 绝对缩放。
 * 用法：node tools/v8-fontladder-measure.cjs
 * 首测 2026-10-16（波 B 阶段二）：56 节点仅 18 落阶梯（32.1%）→ 未达转正线，
 * 仍为草案；阻塞点见 docs/white-team-lessons.md 第十节第 8 条。
 */
const pw = require("/home/hatch/workspace/phy-audit/node_modules/playwright-core");
const LADDER_REM = [0.78, 0.85, 0.95, 1, 1.05, 1.25, 1.5];
const TOL = 0.5;
const PAGES = [
  { mod: "math", hash: "#p=g08-u1-l3-p1", desc: "数学 morph-toggle（SVG）" },
  { mod: "physics", hash: "#p12.1.1/1", desc: "物理 p12.1.1 受力图（Konva）" },
  { mod: "chemistry", hash: "#cm16.2.1/1", desc: "化学 cm16.2.1 分子（widget）" },
];
(async () => {
  const b = await pw.chromium.launch({
    executablePath: "/opt/meta-chromium/chrome",
    args: ["--no-sandbox", "--disable-dev-shm-usage"] });
  const all = [];
  for (const p of PAGES) {
    const pg = await b.newPage();
    const errs = [];
    pg.on("pageerror", e => errs.push(e.message.slice(0, 80)));
    const path = require("path");
const REPO = path.resolve(__dirname, "..");
await pg.goto("file://" + REPO + "/modules/" + p.mod +
      "/index.html" + p.hash, { waitUntil: "load", timeout: 30000 });
    await pg.waitForTimeout(2500);
    const data = await pg.evaluate(() => {
      const out = [];
      const rootPx = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      // 1) SVG text（计入祖先 transform 缩放：rendered = css × |CTM| 缩放）
      document.querySelectorAll("svg text").forEach(el => {
        var cssPx = parseFloat(getComputedStyle(el).fontSize);
        var scale = 1;
        try {
          var m = el.getScreenCTM();
          if (m) scale = Math.sqrt(Math.abs(m.a * m.d - m.b * m.c)) || 1;
        } catch (e) {}
        out.push({ kind: "svg-text", px: cssPx * scale,
          txt: (el.textContent || "").slice(0, 12) });
      });
      // 2) Konva.Text（遍历所有 stage）
      try {
        var stages = [];
        if (window.Konva && Konva.stages) { try { stages = Konva.stages.slice(); } catch (e) {} }
        document.querySelectorAll("canvas").forEach(cv => {
          var st = cv._konvaStage || (cv.parentNode && cv.parentNode._konvaStage);
          if (st && stages.indexOf(st) < 0) stages.push(st);
        });
        stages.forEach(st => {
          try {
            st.find("Text").forEach(t => {
              var s = t.getAbsoluteScale ? t.getAbsoluteScale().x : 1;
              out.push({ kind: "konva-text", px: t.fontSize() * s,
                txt: (t.text() || "").slice(0, 12) });
            });
          } catch (e) {}
        });
      } catch (e) {}
      // 3) 2D canvas 文字无法逐字读：记录 canvas 存在数（阻塞点说明用）
      var canvases = document.querySelectorAll("canvas").length;
      return { rootPx, texts: out, canvases, nStages: 0 };
    });
    console.log("== " + p.desc + " | root=" + data.rootPx + "px | pageerror=" +
      (errs.length ? errs.join("||") : "无"));
    const ladder = LADDER_REM.map(r => r * data.rootPx);
    let on = 0;
    data.texts.forEach(t => {
      const dmin = Math.min.apply(null, ladder.map(L => Math.abs(t.px - L)));
      const ok = dmin <= TOL;
      if (ok) on++;
      all.push({ page: p.desc, kind: t.kind, px: +t.px.toFixed(2), ok, dmin: +dmin.toFixed(2), txt: t.txt });
    });
    console.log("   文本节点 " + data.texts.length + " 个，落阶梯 " + on + " 个；canvas 元素 " + data.canvases + " 个");
    await pg.close();
  }
  await b.close();
  const fs = require("fs");
  fs.writeFileSync("/tmp/v8-measure.json", JSON.stringify(all, null, 1));
  const on = all.filter(t => t.ok).length;
  console.log("\n总计 " + all.length + " 个画布文本节点，落阶梯±0.5px: " + on +
    " (" + (all.length ? (100 * on / all.length).toFixed(1) : 0) + "%)");
  const off = all.filter(t => !t.ok);
  if (off.length) {
    const hist = {};
    off.forEach(t => { const k = t.px.toFixed(1) + "px"; hist[k] = (hist[k] || 0) + 1; });
    console.log("未落阶梯的字号分布:", JSON.stringify(hist));
  }
})().catch(e => { console.error("ERR", e.message); process.exit(2); });
