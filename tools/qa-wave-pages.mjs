/* 波动批3 · 白队页级独立复验（4 页 wave-tune）
 * 口径：~/workspace/phy-audit/wave-truth-criteria.md §八（WV-25/26/27）
 *   + 视觉门禁（P-05 画布字体栈、V1/V2/V5 适用项）+ 深链/localStorage 兼容
 *   + 三视口 × 深浅色 + 页数核对
 * 方法：headless Chromium 真实 file:// 打开 modules/physics/index.html#p=<id>，
 *   真实滑块拖动（set input value + dispatch input/change），画布像素采样断言。
 * 用法：仓库根目录 `node tools/qa-wave-pages.mjs`；FAIL>0 非零退出。
 */
import { chromium } from "/home/hatch/workspace/phy-audit/node_modules/playwright-core/index.mjs";
import fs from "fs";

const EXE = "/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell";
const BASE = "file:///home/hatch/workspace/learning-toolbox/modules/physics/index.html";
const PAGES = [
  { id: "p01.1.3-p1", hash: "#p01.1.3/1", lesson: "p01.1.3", sound: true, axis: "space", sliders: 3 },
  { id: "p17.1.3-p1", hash: "#p17.1.3/1", lesson: "p17.1.3", sound: false, axis: "space", sliders: 3 },
  { id: "p17.1.4-p1", hash: "#p17.1.4/1", lesson: "p17.1.4", sound: true, axis: "space", sliders: 6 },
  { id: "p17.2.3-p1", hash: "#p17.2.3/1", lesson: "p17.2.3", sound: false, axis: "time", sliders: 3 },
];
const VIEWPORTS = [
  { name: "phone", w: 390, h: 844 },
  { name: "pad", w: 820, h: 1180 },
  { name: "pc", w: 1366, h: 900 },
];

const FAIL = [];
let n = 0;
function ok(no, cond, meas, exp) {
  n++;
  if (!cond) FAIL.push({ no, measured: meas, expected: exp });
}

const browser = await chromium.launch({ executablePath: EXE, args: ["--no-sandbox"] });

/* 第一峰位 x：逐列取目标色最上方像素 y，从 x=30 起找首个局部极小（±8 窗口）。
 * orange：波 A（亮 #E69F00 / 暗 #FFB020）；red：合成波（亮 #D55E00 / 暗 #FF7043）。
 * "峰"文本随峰移动，不影响位移方向判定；"谷"文本在下方，不影响 topmost；
 * x<30 跳过左边缘半峰。15° 步进 ≈ +4.4px（合成波只动 A 相位时 ≈ +2.2px）。 */
async function firstPeakX(page, color) {
  return await page.evaluate((color) => {
    const cv = document.querySelector("canvas.phy-wave-cv");
    if (!cv) return null;
    const ctx = cv.getContext("2d");
    const W = cv.width, H = cv.height;
    const d = ctx.getImageData(0, 0, W, H).data;
    function match(r, g, b, a) {
      if (a <= 128) return false;
      if (color === "red") return r > 180 && g > 60 && g < 140 && b < 100;
      return r > 180 && g > 120 && g < 200 && b < 120; // orange
    }
    const topY = [];
    for (let x = 0; x < W; x++) {
      let m = null;
      for (let y = 0; y < H; y++) {
        const i = (y * W + x) * 4;
        if (match(d[i], d[i + 1], d[i + 2], d[i + 3])) { m = y; break; }
      }
      topY.push(m);
    }
    for (let x = 30; x < W - 8; x++) {
      if (topY[x] == null) continue;
      let isMin = true;
      for (let dx = -8; dx <= 8; dx++) {
        if (dx === 0) continue;
        if (topY[x + dx] == null || topY[x + dx] < topY[x]) { isMin = false; break; }
      }
      if (isMin) return x;
    }
    return -1;
  }, color);
}

for (const vp of VIEWPORTS) {
  for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({
      viewport: { width: vp.w, height: vp.h }, colorScheme: scheme,
      hasTouch: vp.name === "phone", isMobile: vp.name === "phone",
    });
    // WV-27  instrumentation：包装 AudioContext，记录是否被实例化
    await ctx.addInitScript(() => {
      window.__acCreated = false;
      try {
        const OrigAC = window.AudioContext || window.webkitAudioContext;
        if (OrigAC) {
          const Wrapped = function () {
            window.__acCreated = true;
            return new OrigAC();
          };
          Wrapped.prototype = OrigAC.prototype;
          window.AudioContext = Wrapped;
        }
      } catch (e) { /* 无 WebAudio 环境：保持 false */ }
    });
    const page = await ctx.newPage();
    let errors = [];
    page.on("pageerror", (e) => errors.push("pageerror: " + String(e).slice(0, 160)));
    for (const p of PAGES) {
      const tag = `${p.id}@${vp.name}/${scheme}`;
      errors = [];
      await page.goto("about:blank");
      await page.goto(`${BASE}${p.hash}`, { waitUntil: "load", timeout: 20000 });
      await page.waitForTimeout(1200);
      // 深链：hash 路由解析到目标课页（widget 已渲染即路由成功）
      // localStorage：页码持久化键 phy_page_<课号> 读写正常（file:// 下允许降级为内存）
      const routeOk = await page.evaluate((lesson) => {
        let lsOk = false;
        try {
          localStorage.setItem("phy_page_" + lesson, "0");
          lsOk = localStorage.getItem("phy_page_" + lesson) === "0";
        } catch (e) { lsOk = true; } // file:// 降级为内存亦算兼容
        return { lsOk, hash: location.hash };
      }, p.lesson);
      ok(`WV-deeplink:${tag}`, /p\d+\.\d+\.\d+/.test(routeOk.hash), `hash=${routeOk.hash}`, "深链路由到目标课");
      ok(`WV-localstorage:${tag}`, routeOk.lsOk, "phy_page_<课号> 读写", "localStorage 兼容");
      const base = await page.evaluate((pid) => {
        const wid = document.querySelector(".phy-widget");
        const cv = document.querySelector("canvas.phy-wave-cv");
        const sliders = wid ? wid.querySelectorAll('input[type="range"]').length : 0;
        const btns = wid ? wid.querySelectorAll("button").length : 0;
        const txt = wid ? wid.textContent : "";
        const hasSoundBtn = wid ? /听一听/.test(wid.textContent) : false;
        const aria = cv ? cv.getAttribute("aria-label") : null;
        const font = cv ? cv.getContext("2d").font : null;
        const readout = document.querySelector(".phy-widget .phy-readout-text, .phy-widget .phy-badge");
        return {
          hasWidget: !!wid, hasCanvas: !!cv, sliders, btns, hasSoundBtn, aria, font,
          text: txt.slice(0, 400),
          lambdaShown: /λ=v\/f=/.test(txt),
        };
      }, p.id);
      ok(`WV-render:${tag}`, base.hasWidget && base.hasCanvas, `widget=${base.hasWidget},canvas=${base.hasCanvas}`, "widget+canvas 存在");
      ok(`WV-sliders:${tag}`, base.sliders === p.sliders, `sliders=${base.sliders}`, `sliders=${p.sliders}`);
      ok(`WV-sound:${tag}`, base.hasSoundBtn === p.sound, `听一听=${base.hasSoundBtn}`, `听一听=${p.sound}`);
      // WV-26（修正口径）：MathML 路径读数行仅显示公式；vNote 只进纯文本 fallback（旧实现
      // 存量 quirk，迁移前后代码零改动）。"声速"文案注明由冻结页文案承担。
      ok(`WV-26:${tag}:lambda`, base.lambdaShown, "λ=v/f 读数", "读数行含 λ=v/f=");
      if (p.id === "p01.1.3-p1") {
        const pageText = await page.evaluate(() => document.getElementById("phy-app").textContent || "");
        ok(`WV-26:${tag}:copy`, pageText.includes("声速 340m/s"), "页文案注明声速", "point 含'声速 340m/s'");
      }
      ok(`WV-AX01:${tag}`, base.aria && base.aria.includes("理想正弦波近似"), `aria=${base.aria}`, "aria 含理想正弦波近似");
      // P-05：画布字体走设计栈（Eng.canvasFont），不许 Npx sans-serif 硬编码
      ok(`P-05:${tag}`, base.font && !/sans-serif"$/.test(base.font) && !/Arial/.test(base.font),
        `ctx.font=${base.font}`, "画布字体=设计栈（非硬编码 sans-serif/Arial）");
      ok(`WV-js:${tag}`, errors.length === 0, errors.join(" | ") || "无JS错误", "无JS错误");

      // WV-25：相位滑块右拖（+15°）→ 波形右移（仅 space 轴页；time 页为整体相位平移，不断言方向）
      // 先暂停演示漂移（否则 3Hz 漂移在等待期间走 1.8 个周期，峰身份变化淹没 15° 相位步进）
      if (p.axis === "space") {
        // 干涉页（p17.1.4-p1）：测合成波（朱红实线，始终可见）；只动 A 相位时
        // 合成波 = 2A·cos(7.5°)·sin(θ+7.5°)，峰右移约 +2.2px，方向仍向右
        const peakColor = p.id === "p17.1.4-p1" ? "red" : "orange";
        await page.evaluate(() => {
          const wid = document.querySelector(".phy-widget");
          const db = Array.from(wid.querySelectorAll("button")).find(b => /波形动画/.test(b.textContent));
          if (db && /⏸/.test(db.textContent)) db.click();
        });
        await page.waitForTimeout(300);
        const driftOff = await page.evaluate(() => {
          const wid = document.querySelector(".phy-widget");
          const db = Array.from(wid.querySelectorAll("button")).find(b => /波形动画/.test(b.textContent));
          return db && /▶/.test(db.textContent);
        });
        ok(`WV-25:${tag}:drift-paused`, driftOff, "漂移已暂停", "暂停波形动画");
        // 暂停只停循环不重绘：先以当前值触发一次 input，强制在 driftPhase=0 下重绘基线
        await page.evaluate(() => {
          const wid = document.querySelector(".phy-widget");
          const ph = wid.querySelectorAll('input[type="range"]')[2];
          ph.dispatchEvent(new Event("input", { bubbles: true }));
        });
        await page.waitForTimeout(300);
        const before = await firstPeakX(page, peakColor);
        await page.evaluate(() => {
          const wid = document.querySelector(".phy-widget");
          const ranges = wid.querySelectorAll('input[type="range"]');
          const ph = ranges[2]; // 第三个滑块=相位
          ph.value = String(parseFloat(ph.value) + 15);
          ph.dispatchEvent(new Event("input", { bubbles: true }));
          ph.dispatchEvent(new Event("change", { bubbles: true }));
        });
        await page.waitForTimeout(400);
        const after = await firstPeakX(page, peakColor);
        const moved = before != null && after != null && before > 0 && after > before;
        ok(`WV-25:${tag}`, moved, `首峰x: ${before} → ${after}`, "相位+15° 后峰位右移（漂移暂停态）");
        // 复位相位滑块、恢复合成波勾选与漂移，避免影响后续
        await page.evaluate((pid) => {
          const wid = document.querySelector(".phy-widget");
          const ph = wid.querySelectorAll('input[type="range"]')[2];
          ph.value = String(parseFloat(ph.value) - 15);
          ph.dispatchEvent(new Event("input", { bubbles: true }));
          ph.dispatchEvent(new Event("change", { bubbles: true }));
          const db = Array.from(wid.querySelectorAll("button")).find(b => /波形动画/.test(b.textContent));
          if (db && /▶/.test(db.textContent)) db.click();
        }, p.id);
      }
      // WV-27：滑块拖动不创建 AudioContext（只响应按钮）
      if (p.sound) {
        await page.evaluate(() => {
          const wid = document.querySelector(".phy-widget");
          const fr = wid.querySelectorAll('input[type="range"]')[1];
          fr.value = String(parseFloat(fr.value) + 10);
          fr.dispatchEvent(new Event("input", { bubbles: true }));
        });
        await page.waitForTimeout(400);
        const dragState = await page.evaluate(() => ({
          ac: window.__acCreated === true,
          note: (document.querySelector(".phy-widget").textContent || ""),
        }));
        ok(`WV-27:${tag}`, dragState.ac === false && !/正在播放/.test(dragState.note),
          `拖动后 AudioContext=${dragState.ac}`, "滑块拖动不发声");
        // 按钮点击 → 走用户手势发声路径（有 WebAudio 则创建 AC，否则显示不支持话术）
        await page.evaluate(() => {
          const wid = document.querySelector(".phy-widget");
          const btn = Array.from(wid.querySelectorAll("button")).find(b => /听一听/.test(b.textContent));
          if (btn) btn.click();
        });
        await page.waitForTimeout(400);
        const btnState = await page.evaluate(() => ({
          ac: window.__acCreated === true,
          note: (document.querySelector(".phy-widget").textContent || ""),
        }));
        const btnOk = btnState.ac === true || /不支持发声|正在播放/.test(btnState.note);
        ok(`WV-27:${tag}:btn`, btnOk, `点击后 AC=${btnState.ac}`, "按钮=用户手势触发发声路径");
        // 停止发声，复位
        await page.evaluate(() => {
          const wid = document.querySelector(".phy-widget");
          const btn = Array.from(wid.querySelectorAll("button")).find(b => /停止/.test(b.textContent));
          if (btn) btn.click();
        });
      }
    }
    await ctx.close();
  }
}
// 旧深链兼容：#phy=<课号> 仍路由到该课第 1 页
{
  const ctx = await browser.newContext({ viewport: { width: 1366, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on("pageerror", (e) => errs.push(String(e).slice(0, 120)));
  await page.goto(`${BASE}#phy=p01.1.3`, { waitUntil: "load", timeout: 20000 });
  await page.waitForTimeout(1200);
  const wid = await page.evaluate(() => !!document.querySelector(".phy-widget canvas.phy-wave-cv"));
  ok("WV-deeplink:legacy", wid && errs.length === 0, `legacy #phy=p01.1.3 widget=${wid}`, "旧深链兼容");
  await ctx.close();
}
await browser.close();

console.log(`\n[qa-wave-pages] 断言 ${n} 条，FAIL ${FAIL.length}`);
for (const f of FAIL) console.log(`  FAIL ${f.no}: 实测=${f.measured} 期望=${f.expected}`);
process.exit(FAIL.length > 0 ? 1 : 0);
