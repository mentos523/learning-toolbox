// 学习工具箱 · 数学重构 · md → bundle 转换器（仅构建期使用，多课壳 Batch 0 泛化）
//
// 用法（在 refactor/ 目录或任意位置）：
//   node tools/convert.mjs
// 读 content/<课>/ 下每页一个 md，逐课写 bundle/<课>.bundle.js
// （window.MATH_BUNDLES['<课>']，多课不冲突）与 bundle/<课>.freshness.json，
// 另产 bundle/manifest.json（章→课→页）。
// 章/课结构事实源是 content/meta.json（章标题、单元标题、课标题与归属；
// 页标题仍以各页 md frontmatter 为准，转换器核对 meta 课标题与 md 所属课
// 的页集合，不以 meta 改写页字段）。
// 运行时（浏览器）不依赖 marked，只用 <script> 引入 bundle
// （file:// 安全，与旧站 window.*_CH 形态同构）。
// 旧单课产物名 content.bundle.js / PILOT_BUNDLE 已废弃：转换器每次重跑前
// 清理 bundle/ 下旧产物（含 legacy 名），避免多课并存时旧 bundle 残留误导。
//
// md 格式约定（见 pilot/README.md）：
//   frontmatter：--- 包围，每行 `key: JSON值`，必填 id/title/concept/prev/next；
//   正文：## 讲解 下的段落必须与 data.hints 逐字逐条一致（转换器断言）；
//   ```interaction：主交互对象（必填，含 type/params，engine 声明随旧数据原样带）；
//   ```auxInteraction：辅交互对象或 null（必填，缺失即 FAIL，不许默认补 null）；
//   ```formulas：公式数组（必填，每条含 id/latex/translation）；
//   ```data：{ hints, examples }（必填）。
// 缺失任一结构化字段、或讲解段落与 hints 不一致，转换器以非零退出码失败，
// 不写 bundle——这是可行性分析 §2 要求的“产物新鲜度”前置断言的试点实现。
//
// 正文解析用构建期 vendored 的 marked 12.0.0（tools/vendor/marked.umd.js）：
// 以 marked.lexer 取段落与围栏 token，另跑一次 marked.parse 作解析校验。
// marked 不进运行时依赖、不进 bundle。

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const HERE = path.dirname(fileURLToPath(import.meta.url));
const require = createRequire(import.meta.url);
const marked = require(path.join(HERE, 'vendor/marked.umd.js'));

const FM_KEYS = ['id', 'title', 'concept', 'prev', 'next'];
const PAGE_FIELDS = ['id', 'title', 'concept', 'formulas', 'interaction', 'auxInteraction', 'hints', 'examples', 'prev', 'next'];

function fail(msg) {
  console.error('[convert] FAIL: ' + msg);
  process.exitCode = 1;
  throw new Error(msg);
}

export function parseMdFile(file) {
  const raw = fs.readFileSync(file, 'utf8');
  const errors = [];
  const name = path.basename(file, '.md');

  // ---- frontmatter：首行 --- 至下一行 ---，每行 `key: JSON值` ----
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n/);
  if (!fmMatch) fail(`${name}: 缺少 frontmatter（--- 包围块）`);
  const fm = {};
  for (const line of fmMatch[1].split(/\r?\n/)) {
    if (!line.trim()) continue;
    const idx = line.indexOf(': ');
    if (idx < 0) { errors.push(`frontmatter 行无法解析：${line}`); continue; }
    const key = line.slice(0, idx);
    try { fm[key] = JSON.parse(line.slice(idx + 2)); }
    catch (e) { errors.push(`frontmatter ${key} 不是合法 JSON 值：${e.message}`); }
  }
  for (const k of FM_KEYS) {
    if (!(k in fm)) errors.push(`frontmatter 缺少 ${k}`);
  }
  if (fm.id !== undefined && fm.id !== name) {
    errors.push(`frontmatter id(${fm.id}) 与文件名(${name})不一致`);
  }

  // ---- 正文：marked 词法 token ----
  const body = raw.slice(fmMatch[0].length);
  let tokens;
  try {
    tokens = marked.lexer(body);
    const html = marked.parse(body);
    if (typeof html !== 'string' || !html.length) errors.push('marked.parse 未产出 HTML');
  } catch (e) {
    fail(`${name}: marked 解析失败：${e.message}`);
  }
  const fences = {};
  const prose = [];
  let inProse = false;
  for (const t of tokens) {
    if (t.type === 'heading') { inProse = (t.depth === 2 && t.text.trim() === '讲解'); continue; }
    if (t.type === 'code') {
      if (['interaction', 'auxInteraction', 'formulas', 'data'].includes(t.lang)) {
        if (t.lang in fences) errors.push(`重复的 \`\`\`${t.lang} 围栏`);
        try { fences[t.lang] = JSON.parse(t.text); }
        catch (e) { errors.push(`\`\`\`${t.lang} 不是合法 JSON：${e.message}`); }
      }
      continue;
    }
    if (inProse && t.type === 'paragraph') prose.push(t.text);
  }
  for (const k of ['interaction', 'auxInteraction', 'formulas', 'data']) {
    if (!(k in fences)) errors.push(`缺失 \`\`\`${k} 围栏`);
  }
  if ('interaction' in fences) {
    const ix = fences.interaction;
    if (!ix || typeof ix !== 'object' || !ix.type || !ix.params) {
      errors.push('interaction 须为含 type/params 的对象');
    }
  }
  if ('auxInteraction' in fences) {
    const aux = fences.auxInteraction;
    if (aux !== null && (typeof aux !== 'object' || !aux.type || !aux.params)) {
      errors.push('auxInteraction 须为 null 或含 type/params 的对象');
    }
  }
  if ('formulas' in fences) {
    if (!Array.isArray(fences.formulas)) errors.push('formulas 须为数组');
    else fences.formulas.forEach((f, i) => {
      if (!f || typeof f.id !== 'string' || typeof f.latex !== 'string' || typeof f.translation !== 'string') {
        errors.push(`formulas[${i}] 须含 id/latex/translation 字符串`);
      }
    });
  }
  if ('data' in fences) {
    const d = fences.data;
    if (!d || !Array.isArray(d.hints) || !Array.isArray(d.examples)) {
      errors.push('data 须含 hints 数组与 examples 数组');
    } else {
      // 讲解段落与 hints 逐字逐条一致：md 既是可读文档、又是机器事实源，
      // 两处文本若悄悄分叉，转换器必须拦住而不是任选其一。
      const same = prose.length === d.hints.length &&
        prose.every((p, i) => p === d.hints[i]);
      if (!same) {
        errors.push(`讲解段落（${prose.length}段）与 data.hints（${d.hints.length}条）逐字不一致`);
      }
    }
  }

  if (errors.length) fail(`${name}: ${errors.join('；')}`);

  const page = {
    id: fm.id,
    title: fm.title,
    concept: fm.concept,
    formulas: fences.formulas,
    interaction: fences.interaction,
    auxInteraction: fences.auxInteraction,
    hints: fences.data.hints,
    examples: fences.data.examples,
    prev: fm.prev,
    next: fm.next,
  };
  return { page, raw };
}

// 按 prev/next 链排页序（多课泛化）：起点是 prev===null 或 prev 指向
// 课外页的页（跨课链的课首，如习题课首页 prev 指向上课末页），恰为 1 页；
// 从起点跟 next 走，链尾 next 为 null 或课外页时结束；
// 每步还断言后一页的 prev 指回前一页（双向一致）。
// 页数、重访、断链、孤页、双向不一致均为 FAIL。
export function orderPages(pages) {
  const byId = new Map(pages.map(p => [p.id, p]));
  const starts = pages.filter(p => p.prev === null || !byId.has(p.prev));
  if (starts.length !== 1) fail(`课内起点页（prev 为 null 或课外页）须恰为 1 页，实得 ${starts.length} 页`);
  const ordered = [];
  const seen = new Set();
  let cur = starts[0];
  let prevId = null;
  while (cur) {
    if (seen.has(cur.id)) fail(`prev/next 链成环于 ${cur.id}`);
    if (ordered.length > 0 && cur.prev !== prevId) {
      fail(`prev/next 双向不一致：${cur.id} 的 prev 为 ${cur.prev}，链上前一页为 ${prevId}`);
    }
    seen.add(cur.id);
    ordered.push(cur);
    prevId = cur.id;
    const nxt = cur.next;
    if (nxt === null || !byId.has(nxt)) break; // null 或课外页：链结束
    cur = byId.get(nxt);
  }
  if (ordered.length !== pages.length) {
    fail(`prev/next 链只覆盖 ${ordered.length}/${pages.length} 页，存在孤页或断链`);
  }
  return ordered;
}

// 读 content/meta.json：章→单元→课结构。meta 只定结构与课标题，
// 不承载页字段；页字段一律来自 md。meta 与 content/ 目录双向核对：
// meta 有课而目录缺失、或目录有课而 meta 未登记，均为 FAIL。
function readMeta(contentDir) {
  const metaFile = path.join(contentDir, 'meta.json');
  if (!fs.existsSync(metaFile)) fail(`缺少 content/meta.json（章→课结构事实源）：${metaFile}`);
  let meta;
  try { meta = JSON.parse(fs.readFileSync(metaFile, 'utf8')); }
  catch (e) { fail(`content/meta.json 不是合法 JSON：${e.message}`); }
  if (!meta || !Array.isArray(meta.chapters) || !meta.chapters.length) {
    fail('content/meta.json 须含非空 chapters 数组');
  }
  const lessons = [];
  const seenLesson = new Set();
  for (const ch of meta.chapters) {
    if (typeof ch.id !== 'string' || typeof ch.title !== 'string' || !Array.isArray(ch.units)) {
      fail('meta 章须含 id/title 字符串与 units 数组');
    }
    for (const u of ch.units) {
      if (typeof u.id !== 'string' || typeof u.title !== 'string' || !Array.isArray(u.lessons)) {
        fail(`meta 章 ${ch.id} 的单元须含 id/title 字符串与 lessons 数组`);
      }
      for (const l of u.lessons) {
        if (typeof l.id !== 'string' || typeof l.title !== 'string') {
          fail(`meta 章 ${ch.id} 单元 ${u.id} 的课须含 id/title 字符串`);
        }
        if (seenLesson.has(l.id)) fail(`meta 中课 ${l.id} 重复登记`);
        seenLesson.add(l.id);
        lessons.push({ id: l.id, title: l.title, chapterId: ch.id, chapterTitle: ch.title, unitId: u.id, unitTitle: u.title });
      }
    }
  }
  return { meta, lessons };
}

export function convert(contentDir, bundleDir) {
  const { meta, lessons } = readMeta(contentDir);
  const dirs = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory()).map(d => d.name).sort();
  const metaIds = new Set(lessons.map(l => l.id));
  for (const id of dirs) {
    if (!metaIds.has(id)) fail(`content/ 下课目录 ${id} 未在 content/meta.json 登记`);
  }
  for (const l of lessons) {
    if (!dirs.includes(l.id)) fail(`meta 登记的课 ${l.id} 在 content/ 下无目录`);
  }
  // 先全量解析与断言（任一课 FAIL 时不写任何产物，避免半成品残留），
  // 通过后再清理旧产物并写盘。
  const perLesson = [];
  for (const lesson of lessons) {
    const lessonDir = path.join(contentDir, lesson.id);
    const files = fs.readdirSync(lessonDir).filter(f => f.endsWith('.md')).sort();
    if (!files.length) fail(`${lessonDir} 下无 md 文件`);
    const parsed = files.map(f => parseMdFile(path.join(lessonDir, f)));
    const pages = orderPages(parsed.map(p => p.page));
    // bundle 页对象字段顺序固定，保证重跑字节一致（除 freshness 时间戳外）。
    const bundlePages = pages.map(p => {
      const o = {};
      for (const k of PAGE_FIELDS) o[k] = p[k];
      return o;
    });
    const bundle = { lessonId: lesson.id, lessonTitle: lesson.title, chapterId: lesson.chapterId, pages: bundlePages };
    const bundleJs = 'window.MATH_BUNDLES = window.MATH_BUNDLES || {};\n' +
      `window.MATH_BUNDLES[${JSON.stringify(lesson.id)}] = ` + JSON.stringify(bundle, null, 2) + ';\n';
    const bundleFile = `${lesson.id}.bundle.js`;
    const freshness = {
      generatedAt: new Date().toISOString(),
      lessonId: lesson.id,
      bundleFile,
      bundleSha256: crypto.createHash('sha256').update(bundleJs).digest('hex'),
      pages: parsed
        .map(({ page, raw }) => ({ id: page.id, file: `content/${lesson.id}/${page.id}.md`, sha256: crypto.createHash('sha256').update(raw).digest('hex') }))
        .sort((a, b) => a.id < b.id ? -1 : 1),
    };
    const freshnessFile = `${lesson.id}.freshness.json`;
    perLesson.push({ lesson, pages: bundlePages, bundleFile, bundleJs, freshnessFile, freshness });
  }
  // 清理旧产物（含试点 legacy 名 content.bundle.js / freshness.json），
  // 保证重跑后 bundle/ 与 content/ 严格对应。
  fs.mkdirSync(bundleDir, { recursive: true });
  for (const f of fs.readdirSync(bundleDir)) {
    if (f.endsWith('.bundle.js') || f.endsWith('.freshness.json') || f === 'manifest.json' ||
        f === 'content.bundle.js' || f === 'freshness.json') {
      fs.unlinkSync(path.join(bundleDir, f));
    }
  }
  for (const r of perLesson) {
    fs.writeFileSync(path.join(bundleDir, r.bundleFile), r.bundleJs);
    fs.writeFileSync(path.join(bundleDir, r.freshnessFile), JSON.stringify(r.freshness, null, 2) + '\n');
  }
  // manifest：章→单元→课→页（页标题来自 md），另附 lessons 平铺表供壳路由反查。
  const byLesson = new Map(perLesson.map(r => [r.lesson.id, r]));
  const manifestChapters = meta.chapters.map(ch => ({
    id: ch.id,
    title: ch.title,
    units: ch.units.map(u => ({
      id: u.id,
      title: u.title,
      lessons: u.lessons.map(l => {
        const r = byLesson.get(l.id);
        return {
          id: l.id,
          title: l.title,
          chapterId: ch.id,
          chapterTitle: ch.title,
          unitId: u.id,
          unitTitle: u.title,
          bundle: r.bundleFile,
          freshness: r.freshnessFile,
          pages: r.pages.map(p => ({ id: p.id, title: p.title })),
        };
      }),
    })),
  }));
  const manifest = {
    generatedAt: new Date().toISOString(),
    chapters: manifestChapters,
    lessons: perLesson.map(r => ({
      id: r.lesson.id,
      title: r.lesson.title,
      chapterId: r.lesson.chapterId,
      chapterTitle: r.lesson.chapterTitle,
      unitId: r.lesson.unitId,
      unitTitle: r.lesson.unitTitle,
      bundle: r.bundleFile,
      freshness: r.freshnessFile,
      pages: r.pages.map(p => ({ id: p.id, title: p.title })),
    })),
  };
  fs.writeFileSync(path.join(bundleDir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n');
  // manifest 脚本版：file:// 下壳不能 fetch JSON，故转换器同步产出
  // bundle/manifest.bundle.js（window.MATH_MANIFEST），index.html 以
  // <script> 引入；内容与 manifest.json 同源（仅 generatedAt 随生成时间变）。
  fs.writeFileSync(path.join(bundleDir, 'manifest.bundle.js'),
    'window.MATH_MANIFEST = ' + JSON.stringify(manifest, null, 2) + ';\n');
  return { lessons: perLesson, manifest };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const contentDir = path.join(HERE, '..', 'content');
  const bundleDir = path.join(HERE, '..', 'bundle');
  try {
    const r = convert(contentDir, bundleDir);
    for (const l of r.lessons) {
      console.log(`[convert] OK: ${l.lesson.id} ${l.pages.length}页 → bundle/${l.bundleFile}`);
      console.log('[convert] 页序：' + l.pages.map(p => p.id).join(' → '));
    }
    console.log('[convert] OK: manifest → bundle/manifest.json（' + r.manifest.lessons.length + '课）');
  } catch (e) {
    if (!process.exitCode) process.exitCode = 1;
    console.error('[convert] 未写 bundle。');
  }
}
