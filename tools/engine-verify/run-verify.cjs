// tools/engine-verify/run-verify.cjs
// 基础引擎层验证跑道：headless Chromium 真实 file:// 打开每个验证页，
// 真实鼠标/触控事件（v-plot / v-input），数值读回与 ENG 断言对账，
// 输出 JSON + 三视口截图留证。审计产物写入 ~/workspace/engine-build/evidence/。
// 本机 Chromium: ~/.cache/ms-playwright/chromium_headless_shell-1243
// playwright-core: ~/workspace/phy-audit/node_modules
const { chromium } = require('/home/hatch/workspace/phy-audit/node_modules/playwright-core');
const fs = require('fs');
const path = require('path');
const http = require('http');

const REPO = '/home/hatch/workspace/learning-toolbox';
const VERIFY_DIR = path.join(REPO, 'tools/engine-verify');
const EVIDENCE = '/home/hatch/workspace/engine-build/evidence';
const SHOTS = path.join(EVIDENCE, 'screenshots');
const EXE = '/home/hatch/.cache/ms-playwright/chromium_headless_shell-1243/chrome-headless-shell-linux64/chrome-headless-shell';
const HTTP_PORT = 8932;

const PAGES = [
  'v-coords.html',
  'v-driver.html',
  'v-mech-rigidbody.html',
  'v-mech-incline.html',
  'v-mech-spring.html',
  'v-mech-pendulum.html',
  'v-mech-pulley-lever.html',
  'v-mech-collision.html',
  'v-meters-electrical.html',
  'v-meters-length-angle.html',
  'v-meters-thermo-balance.html',
  'v-meters-lab.html',
  'v-plot.html',
  'v-input.html',
  'v-steps.html',
  'v-data-chart.html',
  'v-konva-view.html',
  'v-motion.html',
  'v-phenom.html'
];
// ENG-11 双环境逐位一致：以下页面在 file:// 与 http 下结果 JSON 必须 deep-equal
const DETERMINISM_PAGES = [
  'v-driver.html',
  'v-mech-rigidbody.html',
  'v-mech-incline.html',
  'v-mech-spring.html',
  'v-mech-pendulum.html',
  'v-mech-pulley-lever.html',
  'v-mech-collision.html'
];
// 三视口截图留证的代表页
const SHOT_PAGES = ['v-coords.html', 'v-meters-electrical.html', 'v-plot.html', 'v-input.html'];
const SHOT_WIDTHS = [390, 820, 1366];

const results = {
  generated_at: new Date().toISOString(),
  engine_version: null,
  pages: {},
  determinism: {},
  screenshots: [],
  pageErrors: []
};

function fileUrl(p) { return 'file://' + path.join(VERIFY_DIR, p); }
function httpUrl(p) { return `http://127.0.0.1:${HTTP_PORT}/tools/engine-verify/${p}`; }

function startServer() {
  return new Promise((resolve) => {
    const srv = http.createServer((req, res) => {
      const fp = path.join(REPO, decodeURIComponent(req.url.split('?')[0]));
      fs.readFile(fp, (err, data) => {
        if (err) { res.writeHead(404); res.end('nf'); return; }
        const ext = path.extname(fp);
        const ct = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css' }[ext] || 'application/octet-stream';
        res.writeHead(200, { 'Content-Type': ct });
        res.end(data);
      });
    });
    srv.listen(HTTP_PORT, '127.0.0.1', () => resolve(srv));
  });
}

async function drag(page, from, to, slow) {
  await page.mouse.move(from.clientX, from.clientY);
  await page.mouse.down();
  if (slow) {
    // JSXGraph 的 mouseMoveListener 有 checkFrameRate 限帧门（默认 maxframerate 下事件间隔须 ≥约33ms），
    // 快速 CDP 拖拽会被丢事件导致落点竞态；慢速拖拽保证每个事件都被处理（实证 5/5 确定性）。
    const steps = 6;
    for (let i = 1; i <= steps; i++) {
      await page.mouse.move(
        from.clientX + ((to.clientX - from.clientX) * i) / steps,
        from.clientY + ((to.clientY - from.clientY) * i) / steps
      );
      await page.waitForTimeout(80);
    }
  } else {
    await page.mouse.move(to.clientX, to.clientY, { steps: 12 });
  }
  await page.mouse.up();
}

async function runPage(browser, pageFile, env) {
  const out = { page: pageFile, env, pass: false };
  const ctx = await browser.newContext({ hasTouch: true });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + String(e).slice(0, 300)));
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text().slice(0, 300)); });
  try {
    await page.goto(env === 'file' ? fileUrl(pageFile) : httpUrl(pageFile), { waitUntil: 'load' });

    if (pageFile === 'v-plot.html') {
      await page.waitForFunction('window.__PLOT && window.__PLOT.ready === true', null, { timeout: 20000 });
      const g = await page.evaluate('window.__PLOT.gliderScreenXY()');
      const dpt = await page.evaluate('window.__PLOT.dropScreenXY()');
      await drag(page, g, dpt, true); // 慢速：过 JXG 限帧门
      await page.evaluate('window.__PLOT.finishDrop()');
      const p2 = await page.evaluate('window.__PLOT.pointScreenXY()');
      const p2d = await page.evaluate('window.__PLOT.pointDropScreenXY()');
      await drag(page, p2, p2d, true); // 慢速：过 JXG 限帧门
      await page.evaluate('window.__PLOT.finishPointDrag()');
    } else if (pageFile === 'v-input.html') {
      await page.waitForFunction('window.__INPUT && window.__INPUT.ready === true', null, { timeout: 20000 });
      const b0 = await page.evaluate('window.__INPUT.ballScreenXY()');
      const b = { clientX: Math.round(b0.clientX), clientY: Math.round(b0.clientY) }; // 起点取整：CDP 小数量化
      await drag(page, b, { clientX: 580, clientY: 380 });
      await page.evaluate(`window.__INPUT.finishDrag({clientX: 580, clientY: 380}, {clientX: ${b.clientX}, clientY: ${b.clientY}})`);
      await page.touchscreen.tap(450, 310);
      await page.evaluate('window.__INPUT.finishTap()');
    } else {
      await page.waitForFunction('window.__VERIFY && window.__VERIFY.ready === true', null, { timeout: 30000 });
    }

    await page.waitForFunction('window.__VERIFY && window.__VERIFY.ready === true', null, { timeout: 30000 });
    const v = await page.evaluate('window.__VERIFY');
    out.verify = v;
    out.pass = v.pass === true && errors.length === 0;
    out.errors = errors;
    if (v.summary) out.summary = v.summary;
    if (!results.engine_version) {
      try { results.engine_version = await page.evaluate('window.Eng && window.Eng.VERSION'); } catch (e) { /* ignore */ }
    }
  } catch (e) {
    out.error = String(e).slice(0, 500);
    out.errors = errors;
    out.pass = false;
  }
  if (errors.length) results.pageErrors.push({ page: pageFile, env, errors });
  await ctx.close();
  return out;
}

async function screenshot(browser, pageFile, width) {
  const ctx = await browser.newContext({ viewport: { width, height: 900 } });
  const page = await ctx.newPage();
  try {
    await page.goto(fileUrl(pageFile), { waitUntil: 'load' });
    if (pageFile === 'v-plot.html') {
      await page.waitForFunction('window.__PLOT && window.__PLOT.ready === true', null, { timeout: 20000 });
    } else if (pageFile === 'v-input.html') {
      await page.waitForFunction('window.__INPUT && window.__INPUT.ready === true', null, { timeout: 20000 });
    } else {
      await page.waitForFunction('window.__VERIFY && window.__VERIFY.ready === true', null, { timeout: 30000 });
    }
    await page.waitForTimeout(400);
    const name = `${pageFile.replace('.html', '')}-${width}.png`;
    await page.screenshot({ path: path.join(SHOTS, name), fullPage: true });
    results.screenshots.push(name);
    console.log('  shot', name);
  } catch (e) {
    console.log('  shot FAIL', pageFile, width, String(e).slice(0, 120));
  }
  await ctx.close();
}

async function main() {
  fs.mkdirSync(EVIDENCE, { recursive: true });
  fs.mkdirSync(SHOTS, { recursive: true });
  const server = await startServer();
  const browser = await chromium.launch({ executablePath: EXE });

  console.log('===== file:// 全量 =====');
  for (const p of PAGES) {
    const r = await runPage(browser, p, 'file');
    results.pages[p] = { file: r };
    console.log(`${r.pass ? 'PASS' : 'FAIL'}  ${p}` +
      (r.summary ? `  (${r.summary.pass}/${r.summary.total})` : '') +
      (r.error ? `  ERROR: ${r.error}` : ''));
  }

  console.log('===== http 双环境（ENG-11 确定性） =====');
  for (const p of DETERMINISM_PAGES) {
    const r = await runPage(browser, p, 'http');
    const a = JSON.stringify(results.pages[p].file.verify && results.pages[p].file.verify.results);
    const b = JSON.stringify(r.verify && r.verify.results);
    const same = a === b && r.pass;
    results.determinism[p] = { httpPass: r.pass, bitwiseEqual: a === b, pass: same };
    results.pages[p].http = r;
    console.log(`${same ? 'PASS' : 'FAIL'}  ${p}  (httpPass=${r.pass}, equal=${a === b})`);
  }

  console.log('===== 三视口截图 =====');
  for (const p of SHOT_PAGES) {
    for (const w of SHOT_WIDTHS) await screenshot(browser, p, w);
  }

  await browser.close();
  server.close();

  const allPagesPass = PAGES.every((p) => results.pages[p].file.pass);
  const allDetPass = DETERMINISM_PAGES.every((p) => results.determinism[p].pass);
  results.allPass = allPagesPass && allDetPass;
  fs.writeFileSync(path.join(EVIDENCE, 'verify-results.json'), JSON.stringify(results, null, 2));
  console.log('\n总判定:', results.allPass ? 'ALL PASS' : 'FAIL');
  console.log('结果已写入', path.join(EVIDENCE, 'verify-results.json'));
  process.exit(results.allPass ? 0 : 1);
}

main().catch((e) => { console.error(e); process.exit(2); });
