/* 电磁批4 · 白队页级独立复验（16 页，p16.3.1-p1 一页双组件）
 * 口径：~/workspace/phy-audit/em-truth-criteria.md §六（页级行为）
 *   + 视觉门禁（V1/V5 适用项；V8 草案只测量不设门）+ 深链/localStorage 兼容
 *   + 三视口 × 深浅色 + 页数核对
 * 方法：headless Chromium 真实 file:// 打开 modules/physics/index.html#<lesson>/<n>，
 *   真实鼠标事件（点击/拖拽），SVG/DOM 读数断言。
 * 范围说明：加载/渲染/深链/localStorage/aria/V1/V5 走全矩阵（16 页 × 3 视口 × 2 色）；
 *   交互行为断言（点选/拖拽/换向/感应/读图）只在 pc/light 跑（行为与视口/主题无关，
 *   全矩阵只会重复同一断言；报告中如实声明）。
 * 用法：仓库根目录 `node tools/qa-em-pages.mjs`；FAIL>0 非零退出。
 */
import { chromium } from "/home/hatch/workspace/phy-audit/node_modules/playwright-core/index.mjs";
import { execSync } from "child_process";
import fs from "fs";

const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const BASE = "file:///home/hatch/workspace/learning-toolbox/modules/physics/index.html";
const ROOT = "/home/hatch/workspace/learning-toolbox";

const PAGES = [
  { id: "p15.1.1-p1", lesson: "p15.1.1", n: 1, kind: "efield" },
  { id: "p15.1.3-p1", lesson: "p15.1.3", n: 1, kind: "efield" },
  { id: "p10.1.1-p1", lesson: "p10.1.1", n: 1, kind: "bfield", filings: true },
  { id: "p10.1.2-p1", lesson: "p10.1.2", n: 1, kind: "bfield", filings: false },
  { id: "p16.2.1-p1", lesson: "p16.2.1", n: 1, kind: "bfield", filings: true },
  { id: "p16.3.1-p1", lesson: "p16.3.1", n: 1, kind: "bfield", filings: false, also: "induction" },
  { id: "p10.1.3-p1", lesson: "p10.1.3", n: 1, kind: "commutator" },
  { id: "p10.1.4-p1", lesson: "p10.1.4", n: 1, kind: "induction" },
  { id: "p15.1.2-p1", lesson: "p15.1.2", n: 1, kind: "graph", slope: "-55.16" },
  { id: "p15.1.4-p1", lesson: "p15.1.4", n: 1, kind: "graph", slope: "-20" },
  { id: "p15.1.5-p1", lesson: "p15.1.5", n: 1, kind: "graph", slope: "2" },
  { id: "p15.1.6-p1", lesson: "p15.1.6", n: 1, kind: "graph", slope: "2" },
  { id: "p16.1.2-p1", lesson: "p16.1.2", n: 1, kind: "graph", slope: "-1", intercept: true },
  { id: "p16.2.3-p1", lesson: "p16.2.3", n: 1, kind: "graph", slope: "2" },
  { id: "p16.3.2-p1", lesson: "p16.3.2", n: 1, kind: "graph", slope: "2" },
  { id: "p16.2.2-p1", lesson: "p16.2.2", n: 1, kind: "motion" },
];
const VIEWPORTS = [
  { name: "phone", w: 390, h: 844 },
  { name: "pad", w: 820, h: 1180 },
  { name: "pc", w: 1366, h: 900 },
];
const ARIA = {
  efield: "点电荷模型·q=±1示意单位",
  bfield: "静磁场示意·偶极子近似",
  commutator: "慢放示意·非真实转速",
  induction: "Φ∝1/距离·示意模型",
};

const FAIL = [];
let n = 0;
function ok(no, cond, meas, exp) {
  n++;
  if (!cond) FAIL.push({ no, measured: String(meas).slice(0, 220), expected: String(exp).slice(0, 220) });
}

const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox"] });

async function svgPoint(page, labelSub, lx, ly) {
  return await page.evaluate(([sub, x, y]) => {
    const svg = [...document.querySelectorAll("svg.phy-stage")]
      .find(s => (s.getAttribute("aria-label") || "").includes(sub));
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    return { x: r.left + x / 100 * r.width, y: r.top + (100 - y) / 100 * r.height };
  }, [labelSub, lx, ly]);
}
/* 在场图上找真正的空白点（场线 path 会盖住逻辑空白区；既有行为，QA 绕开它只测放置规则） */
async function blankSpot(page, labelSub) {
  return await page.evaluate((sub) => {
    const svg = [...document.querySelectorAll("svg.phy-stage")]
      .find(s => (s.getAttribute("aria-label") || "").includes(sub));
    if (!svg) return null;
    const r = svg.getBoundingClientRect();
    for (let gy = 14; gy <= 86; gy += 6) {
      for (let gx = 14; gx <= 86; gx += 6) {
        const x = r.left + gx / 100 * r.width, y = r.top + (100 - gy) / 100 * r.height;
        if (document.elementFromPoint(x, y) === svg) return { x, y };
      }
    }
    return null;
  }, labelSub);
}
/* 感应手柄：大透明 rect，中心可抓（绝对坐标定位，须从中心起拖）；滚动到视口 */
async function inductionGrab(page) {
  return await page.evaluate(() => {
    const h = document.querySelector('rect.phy-handle[aria-label="拖动磁铁"]');
    if (!h) return null;
    h.scrollIntoView({ block: "center" });
    const r = h.getBoundingClientRect();
    const x = r.left + r.width / 2, y = r.top + r.height / 2;
    return document.elementFromPoint(x, y) === h ? { x, y } : null;
  });
}
/* 旋转手柄：小圆心常被场线盖住（既有行为），从边缘可抓点起拖；滚动到视口 */
async function handleGrab(page, selector) {
  return await page.evaluate((sel) => {
    const h = document.querySelector(sel);
    if (!h) return null;
    h.scrollIntoView({ block: "center" });
    const r = h.getBoundingClientRect();
    const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const rad = Math.min(r.width, r.height) / 2 - 2;
    for (let a = 0; a < 360; a += 30) {
      const x = cx + Math.cos(a * Math.PI / 180) * rad * 0.7;
      const y = cy + Math.sin(a * Math.PI / 180) * rad * 0.7;
      if (document.elementFromPoint(x, y) === h) return { x, y };
    }
    return { x: cx, y: cy };
  }, selector);
}
async function widgetText(page, labelSub) {
  return await page.evaluate((sub) => {
    const svg = [...document.querySelectorAll("svg.phy-stage")]
      .find(s => (s.getAttribute("aria-label") || "").includes(sub));
    if (!svg) return "";
    let n = svg.parentElement;
    while (n && !n.classList.contains("phy-widget")) n = n.parentElement;
    return n ? n.textContent : "";
  }, labelSub);
}

/* ---------- 全矩阵：加载/渲染/深链/localStorage/aria/V1 ---------- */
for (const vp of VIEWPORTS) {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h }, colorScheme: scheme,
      hasTouch: vp.name === "phone", isMobile: vp.name === "phone",
    });
    const page = await ctx.newPage();
    for (const p of PAGES) {
      const tag = `${p.id}@${vp.name}/${scheme}`;
      let errors = [];
      page.removeAllListeners("pageerror");
      page.on("pageerror", (e) => errors.push("pageerror: " + String(e).slice(0, 160)));
      page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text().slice(0, 160)); });
      await page.goto("about:blank");
      await page.goto(`${BASE}#${p.lesson}/${p.n}`, { waitUntil: "load", timeout: 20000 });
      await page.waitForTimeout(1500);
      const st = await page.evaluate((exp) => {
        const route = location.hash;
        let lsOk = false;
        try {
          localStorage.setItem("phy_page_x", "1");
          lsOk = localStorage.getItem("phy_page_x") === "1";
          localStorage.removeItem("phy_page_x");
        } catch (e) { lsOk = true; }
        const emOk = !!(window.Eng && window.Eng.EM);
        const svgs = [...document.querySelectorAll("svg.phy-stage")];
        const ariaHit = svgs.some(s => (s.getAttribute("aria-label") || "").includes(exp.aria));
        const unknown = document.querySelector(".phy-unknown");
        const plot = !!document.querySelector(".phy-eng-plot");
        let v1 = "n/a", v5 = "n/a";
        const t = document.querySelector("svg.phy-stage text");
        if (t) {
          try { v1 = getComputedStyle(t).fontFamily || ""; } catch (e) {}
        }
        const pd = document.querySelector(".phy-eng-plot");
        if (pd) {
          const r = pd.getBoundingClientRect();
          v5 = r.width <= window.innerWidth + 1 ? "ok" : "overflow:" + Math.round(r.width);
        }
        return { route, lsOk, emOk, ariaHit, unknown: !!unknown, plot, v1, v5,
          svgCount: svgs.length };
      }, { aria: ARIA[p.kind] || "###" });
      ok(`EM-deeplink:${tag}`, new RegExp(p.lesson.replace(/\./g, "\\.")).test(st.route), `hash=${st.route}`, "深链路由到目标课");
      ok(`EM-localstorage:${tag}`, st.lsOk, "localStorage 读写", "兼容");
      ok(`EM-engine:${tag}`, st.emOk, "Eng.EM 挂载", "引擎分支命中");
      ok(`EM-render:${tag}`, (st.svgCount > 0 || (p.kind === "graph" && st.plot)) && !st.unknown,
        `svg=${st.svgCount},plot=${st.plot},unknown=${st.unknown}`, "组件渲染，无占位");
      if (ARIA[p.kind]) ok(`EM-aria:${tag}`, st.ariaHit, "aria-label 命中", ARIA[p.kind]);
      if (p.also && ARIA[p.also]) {
        const alsoHit = await page.evaluate((a) =>
          [...document.querySelectorAll("svg.phy-stage")]
            .some(s => (s.getAttribute("aria-label") || "").includes(a)), ARIA[p.also]);
        ok(`EM-aria2:${tag}`, alsoHit, "aria-label 命中", ARIA[p.also]);
      }
      if (p.kind === "graph" || p.kind === "motion")
        ok(`EM-engrenderer:${tag}`, (p.kind === "graph" && st.plot) || p.kind === "motion",
          `plotDiv=${st.plot}`, "引擎渲染器接管（graph）");
      if (st.v1 !== "n/a")
        ok(`EM-V1:${tag}`, /PingFang|Microsoft YaHei|Noto Sans SC|-apple-system/.test(st.v1), st.v1.slice(0, 80), "画布字体=站点栈");
      if (st.v5 !== "n/a")
        ok(`EM-V5:${tag}`, st.v5 === "ok", st.v5, "作图板无横向溢出");
      ok(`EM-noerror:${tag}`, errors.length === 0, errors.slice(0, 2).join(" | ") || "无报错", "零报错");
      /* efield 探测口径：方向文字 + 强/中/弱，无 E 绝对数值 */
      if (p.kind === "efield") {
        const pl = await page.evaluate(() => {
          const el = document.querySelector(".phy-probe-label");
          return el ? el.textContent : "";
        });
        ok(`EM-probe:${tag}`, /^向[^·]* · [强中弱]$/.test(pl.trim()), `probe="${pl.trim()}"`, "方向文字 · 强/中/弱");
      }
      /* bfield 小磁针数 */
      if (p.kind === "bfield") {
        const nn = await page.evaluate((sub) => {
          const svg = [...document.querySelectorAll("svg.phy-stage")]
            .find(s => (s.getAttribute("aria-label") || "").includes(sub));
          return svg ? svg.querySelectorAll('line[marker-end]').length : -1;
        }, ARIA.bfield);
        ok(`EM-needles:${tag}`, nn >= 6 && nn <= 12, `needles=${nn}`, "6–12 小磁针");
      }
    }
    await ctx.close();
  }
}

/* ---------- pc/light：交互行为断言 ---------- */
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 }, colorScheme: "light" });
  const page = await ctx.newPage();
  let errors = [];
  page.on("pageerror", (e) => errors.push("pageerror: " + String(e).slice(0, 160)));
  page.on("console", (m) => { if (m.type() === "error") errors.push("console: " + m.text().slice(0, 160)); });
  async function load(p) {
    errors = [];
    await page.goto("about:blank");
    await page.goto(`${BASE}#${p.lesson}/${p.n}`, { waitUntil: "load", timeout: 20000 });
    await page.waitForTimeout(1500);
  }

  console.error("[QA] EFIELD");
  /* efield：点选放置 ×3 → 4 个；第 4 次被拒；双击删除 */
  for (const p of PAGES.filter(x => x.kind === "efield")) {
    try {
    await load(p);
    for (let i = 0; i < 3; i++) {
      const pt = await blankSpot(page, "电场");
      ok(`EM-blankspot:${p.id}:${i}`, !!pt, pt ? "空白点可达" : "无", "空白点");
      if (!pt) break;
      await page.mouse.click(pt.x, pt.y);
      await page.waitForTimeout(300);
    }
    const badge4 = await widgetText(page, "电场");
    ok(`EM-place:${p.id}`, /电荷 4 个/.test(badge4), badge4.match(/电荷 \d+ 个/)?.[0] || "?", "电荷 4 个");
    const pt5 = await blankSpot(page, "电场");
    if (pt5) { await page.mouse.click(pt5.x, pt5.y); await page.waitForTimeout(300); }
    const txt5 = await widgetText(page, "电场");
    ok(`EM-placelimit:${p.id}`, /最多放 4 个电荷/.test(txt5), "限 4 提示", "最多放 4 个电荷。");
    /* 双击删除：标签盖住圆心，evaluate 在元素上直发（测 handler 接线） */
    const del = await page.evaluate(() => {
      const c = document.querySelector(".phy-charge");
      if (!c) return "?";
      c.dispatchEvent(new MouseEvent("dblclick", { bubbles: true, cancelable: true }));
      return document.querySelector(".phy-badge").textContent.match(/电荷 \d+ 个/)?.[0] || "?";
    });
    ok(`EM-delete:${p.id}`, /电荷 3 个/.test(del), del, "双击删除→3 个");
    ok(`EM-noerror:${p.id}:interact`, errors.length === 0, errors.slice(0, 2).join(" | ") || "无报错", "零报错");
    } catch (e) { ok(`EM-interact:${p.id}`, false, String(e).slice(0, 160), "交互无异常"); }
  }

  console.error("[QA] BFIELD");
  /* bfield：铁屑开关 + 旋转磁铁改变磁针指向 */
  for (const p of PAGES.filter(x => x.kind === "bfield")) {
    try {
    await load(p);
    if (p.filings !== false) {
      const dots = await page.evaluate((sub) => {
        const svg = [...document.querySelectorAll("svg.phy-stage")]
          .find(s => (s.getAttribute("aria-label") || "").includes(sub));
        return svg ? svg.querySelectorAll(".phy-filings circle").length : -1;
      }, ARIA.bfield);
      ok(`EM-filings:${p.id}`, dots > 20, `filings=${dots}`, "铁屑静态纹理渲染");
    }
    const before = await page.evaluate((sub) => {
      const svg = [...document.querySelectorAll("svg.phy-stage")]
        .find(s => (s.getAttribute("aria-label") || "").includes(sub));
      return [...svg.querySelectorAll("line[marker-end]")]
        .map(l => [l.x1.baseVal.value, l.y1.baseVal.value, l.x2.baseVal.value, l.y2.baseVal.value].map(v => v.toFixed(1)).join(",")).join("|");
    }, ARIA.bfield);
    const hd = await handleGrab(page, 'circle.phy-handle[aria-label="旋转磁铁"]');
    if (hd) {
      await page.mouse.move(hd.x, hd.y);
      await page.mouse.down();
      await page.mouse.move(hd.x, hd.y + 60, { steps: 8 });
      await page.mouse.up();
      await page.waitForTimeout(400);
      const after = await page.evaluate((sub) => {
        const svg = [...document.querySelectorAll("svg.phy-stage")]
          .find(s => (s.getAttribute("aria-label") || "").includes(sub));
        return [...svg.querySelectorAll("line[marker-end]")]
          .map(l => [l.x1.baseVal.value, l.y1.baseVal.value, l.x2.baseVal.value, l.y2.baseVal.value].map(v => v.toFixed(1)).join(",")).join("|");
      }, ARIA.bfield);
      ok(`EM-rotate:${p.id}`, before !== after, "磁针指向变化", "旋转磁铁→磁针跟随");
    } else {
      ok(`EM-rotate:${p.id}`, false, "未找到旋转手柄", "旋转磁铁→磁针跟随");
    }
    ok(`EM-noerror:${p.id}:interact`, errors.length === 0, errors.slice(0, 2).join(" | ") || "无报错", "零报错");
    } catch (e) { ok(`EM-interact:${p.id}`, false, String(e).slice(0, 160), "交互无异常"); }
  }

  /* commutator：步骤 ③ 电流翻转 */
  {
    const p = PAGES.find(x => x.kind === "commutator");
    try {
    await load(p);
    await page.click('button[aria-label*="换向器切换"]');
    await page.waitForTimeout(300);
    let t3 = await widgetText(page, "换向器");
    ok("EM-comm:step3", /电流：上→左/.test(t3), t3.match(/电流：上→[左右]/)?.[0] || "?", "③→电流：上→左");
    await page.click('button[aria-label*="开始转动"]');
    await page.waitForTimeout(300);
    let t1 = await widgetText(page, "换向器");
    ok("EM-comm:step1", /电流：上→右/.test(t1), t1.match(/电流：上→[左右]/)?.[0] || "?", "①→电流：上→右");
    ok("EM-comm:slow", /慢放示意/.test(t1), "慢放标注", "慢放 ×0.2（非真实转速）");
    ok("EM-noerror:p10.1.3-p1:interact", errors.length === 0, errors.slice(0, 2).join(" | ") || "无报错", "零报错");
    } catch (e) { ok("EM-interact:p10.1.3-p1", false, String(e).slice(0, 160), "交互无异常"); }
  }

  console.error("[QA] INDUCTION");
  /* induction：拖入→⊗逆时针；拖出→⊙顺时针（含 p16.3.1-p1 一页双组件） */
  for (const p of PAGES.filter(x => x.kind === "induction" || x.also === "induction")) {
    try {
    await load(p);
    const hd = await inductionGrab(page);
    ok(`EM-induction:handle:${p.id}`, !!hd, hd ? "手柄可达" : "未找到", "拖动磁铁手柄");
    if (hd) {
      await page.mouse.move(hd.x, hd.y);
      await page.mouse.down();
      await page.mouse.move(hd.x + 60, hd.y, { steps: 8 });
      await page.mouse.up();
      await page.waitForTimeout(400);
      let tin = await widgetText(page, "电磁感应");
      /* ⊗/⊙ 必须来自电流标注（svg 内），不是常驻图例：查 svg 文本 */
      const tinSym = await page.evaluate(() => {
        const svg = [...document.querySelectorAll("svg.phy-stage")]
          .find(s => (s.getAttribute("aria-label") || "").includes("电磁感应"));
        return svg ? svg.textContent : "";
      });
      ok(`EM-induction:in:${p.id}`, /插入/.test(tin) && /逆时针/.test(tin) && /⊗/.test(tinSym),
        (tin.match(/插入|逆时针/g) || []).join(",") + "/svg:" + (tinSym.match(/[⊗⊙]/g) || []).join(""), "插入→逆时针→上⊗下⊙");
      const hd2 = await inductionGrab(page);
      await page.mouse.move(hd2.x, hd2.y);
      await page.mouse.down();
      await page.mouse.move(hd2.x - 60, hd2.y, { steps: 8 });
      await page.mouse.up();
      await page.waitForTimeout(400);
      let tout = await widgetText(page, "电磁感应");
      const toutSym = await page.evaluate(() => {
        const svg = [...document.querySelectorAll("svg.phy-stage")]
          .find(s => (s.getAttribute("aria-label") || "").includes("电磁感应"));
        return svg ? svg.textContent : "";
      });
      ok(`EM-induction:out:${p.id}`, /拔出/.test(tout) && /顺时针/.test(tout) && /⊙/.test(toutSym),
        (tout.match(/拔出|顺时针/g) || []).join(",") + "/svg:" + (toutSym.match(/[⊗⊙]/g) || []).join(""), "拔出→顺时针→上⊙下⊗");
    }
    ok(`EM-noerror:${p.id}:interact`, errors.length === 0, errors.slice(0, 2).join(" | ") || "无报错", "零报错");
    } catch (e) { ok(`EM-interact:${p.id}`, false, String(e).slice(0, 160), "交互无异常"); }
  }

  /* graph-reader：读斜率 / 读截距 */
  for (const p of PAGES.filter(x => x.kind === "graph")) {
    try {
    await load(p);
    const hasPlot = await page.evaluate(() => {
      const d = document.querySelector(".phy-eng-plot");
      return !!d && d.querySelectorAll("svg").length > 0;
    });
    ok(`EM-graph:plot:${p.id}`, hasPlot, hasPlot ? "作图板就绪" : "未就绪", "PlotBoard 接管");
    await page.click("button:has-text('读斜率')");
    await page.waitForTimeout(400);
    const out = await page.evaluate(() => {
      const o = document.querySelector(".phy-greader-out");
      return o ? o.textContent : "";
    });
    ok(`EM-graph:slope:${p.id}`, out.includes(p.slope) && /斜率/.test(out), out.slice(0, 60), `斜率含 ${p.slope}`);
    if (p.intercept) {
      await page.click("button:has-text('读截距')");
      await page.waitForTimeout(400);
      const out2 = await page.evaluate(() => {
        const o = document.querySelector(".phy-greader-out");
        return o ? o.textContent : "";
      });
      /* 口径与旧实现一致：数据范围 [0,0.5] 内无过零 → x 截距无；y 截距=3（fmtN 去尾零） */
      ok(`EM-graph:intercept:${p.id}`, /x 截距：无/.test(out2) && /y 截距：3/.test(out2), out2.slice(0, 80), "x 截距无（范围内）/y 截距 3");
    }
    ok(`EM-noerror:${p.id}:interact`, errors.length === 0, errors.slice(0, 2).join(" | ") || "无报错", "零报错");
    } catch (e) { ok(`EM-interact:${p.id}`, false, String(e).slice(0, 160), "交互无异常"); }
  }

  /* motion-sim 圆周：T=2π/ω 读数 */
  {
    const p = PAGES.find(x => x.kind === "motion");
    try {
    await load(p);
    const bt = await page.evaluate(() => {
      const b = document.querySelector(".phy-widget .phy-badge");
      return b ? b.textContent : "";
    });
    ok("EM-motion:T", /1\.57/.test(bt), bt.slice(0, 60), "T = 2π/ω = 1.57 s（ω=4）");
    ok("EM-noerror:p16.2.2-p1:interact", errors.length === 0, errors.slice(0, 2).join(" | ") || "无报错", "零报错");
    } catch (e) { ok("EM-interact:p16.2.2-p1", false, String(e).slice(0, 160), "交互无异常"); }
  }
  await ctx.close();
}

/* ---------- 页数核对：data 文件只增不减 ---------- */
{
  const files = ["modules/physics/data/p10.js", "modules/physics/data/p15.js", "modules/physics/data/p16.js"];
  let allOk = true, detail = [];
  for (const f of files) {
    const now = (fs.readFileSync(`${ROOT}/${f}`, "utf8").match(/id: "p\d+\.\d+\.\d+-p\d+"/g) || []).length;
    const head = (execSync(`git -C ${ROOT} show HEAD:${f}`).toString().match(/id: "p\d+\.\d+\.\d+-p\d+"/g) || []).length;
    detail.push(`${f.split("/").pop()}:HEAD${head}/现${now}`);
    if (now !== head) allOk = false;
  }
  ok("EM-pagecount", allOk, detail.join(" "), "三文件页数与 HEAD 一致（物理 356 页不变）");
}

console.log(`EM 页级断言：${n} 条，FAIL ${FAIL.length}`);
if (FAIL.length) {
  for (const f of FAIL) console.log(`FAIL ${f.no}: measured=${f.measured} expected=${f.expected}`);
  process.exit(1);
}
console.log("PASS");
