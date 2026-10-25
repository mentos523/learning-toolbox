// 学习工具箱 · 数学重构试点 · md → bundle 转换器（仅构建期使用）
//
// 用法（在 pilot/ 目录或任意位置）：
//   node tools/convert.mjs
// 读 pilot/content/<课>/ 下每页一个 md，写 pilot/bundle/content.bundle.js
// 与 pilot/bundle/freshness.json。运行时（浏览器）不依赖 marked，
// 只用 <script> 引入 bundle（file:// 安全，与旧站 window.*_CH 形态同构）。
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

// 按 prev/next 链排页序：从 prev===null 的页起跟 next 走；
// 链尾 next 可指向课外页（如本课 p2b → 章习题页），此时链结束。
// 页数、重访、断链、孤页均为 FAIL。
export function orderPages(pages) {
  const byId = new Map(pages.map(p => [p.id, p]));
  const starts = pages.filter(p => p.prev === null);
  if (starts.length !== 1) fail(`课内 prev===null 的页须恰为 1 页，实得 ${starts.length} 页`);
  const ordered = [];
  const seen = new Set();
  let cur = starts[0];
  while (cur) {
    if (seen.has(cur.id)) fail(`prev/next 链成环于 ${cur.id}`);
    seen.add(cur.id);
    ordered.push(cur);
    const nxt = cur.next;
    if (nxt === null || !byId.has(nxt)) break; // null 或课外页：链结束
    cur = byId.get(nxt);
  }
  if (ordered.length !== pages.length) {
    fail(`prev/next 链只覆盖 ${ordered.length}/${pages.length} 页，存在孤页或断链`);
  }
  return ordered;
}

export function convert(contentDir, bundleDir) {
  const lessons = fs.readdirSync(contentDir, { withFileTypes: true })
    .filter(d => d.isDirectory()).map(d => d.name).sort();
  if (!lessons.length) fail(`content/ 下无课目录：${contentDir}`);
  // 试点只含一课；多课出现时不静默合并，要求显式分批处理。
  if (lessons.length !== 1) fail(`试点转换器一次只处理一课，实得 ${lessons.length} 课：${lessons.join(', ')}`);
  const lessonId = lessons[0];
  const lessonDir = path.join(contentDir, lessonId);
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
  const bundle = { lessonId, pages: bundlePages };
  const bundleJs = 'window.PILOT_BUNDLE = ' + JSON.stringify(bundle, null, 2) + ';\n';
  fs.mkdirSync(bundleDir, { recursive: true });
  fs.writeFileSync(path.join(bundleDir, 'content.bundle.js'), bundleJs);
  const freshness = {
    generatedAt: new Date().toISOString(),
    lessonId,
    bundleSha256: crypto.createHash('sha256').update(bundleJs).digest('hex'),
    pages: parsed
      .map(({ page, raw }) => ({ id: page.id, file: `content/${lessonId}/${page.id}.md`, sha256: crypto.createHash('sha256').update(raw).digest('hex') }))
      .sort((a, b) => a.id < b.id ? -1 : 1),
  };
  fs.writeFileSync(path.join(bundleDir, 'freshness.json'), JSON.stringify(freshness, null, 2) + '\n');
  return { lessonId, pages: bundlePages, freshness };
}

const isMain = process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
  const contentDir = path.join(HERE, '..', 'content');
  const bundleDir = path.join(HERE, '..', 'bundle');
  try {
    const r = convert(contentDir, bundleDir);
    console.log(`[convert] OK: ${r.lessonId} ${r.pages.length}页 → bundle/content.bundle.js`);
    console.log('[convert] 页序：' + r.pages.map(p => p.id).join(' → '));
  } catch (e) {
    if (!process.exitCode) process.exitCode = 1;
    console.error('[convert] 未写 bundle。');
  }
}
