#!/usr/bin/env node
/* ============================================================
 * 学习工具箱 · 数学模块 · 公式预渲染管线（蓝队）
 *
 * 决议来源：docs/math-design-review.md（W2/B1/B4/B6）
 *  三层结构：源 LaTeX + translation → 构建预渲染 → 派生文件
 *  运行时零依赖，原生 <math> 渲染；构建只发生在维护者本地。
 *
 * 用法：
 *   node tools/render-mathml.mjs --all        渲染全部章节派生文件
 *   node tools/render-mathml.mjs --ch ch00    只渲染指定章
 *   node tools/render-mathml.mjs --validate   只校验不写文件
 *   node tools/render-mathml.mjs --test       运行转换器自检
 *
 * 支持的 LaTeX 子集（超出即构建阻断并报错）：
 *   分组 {} ｜ \frac{a}{b} ｜ \sqrt{x} \sqrt[n]{x}
 *   上下标 ^ _（含 \sum \int 的上下限） ｜ \text{...}
 *   \left( \right) 等定界符（. 表示空）
 *   希腊字母：\alpha \beta \gamma \delta \epsilon \theta \lambda
 *             \mu \pi \sigma \phi \omega \Delta \Sigma \Omega
 *   运算符：\times \div \pm \cdot \leq \geq \neq \approx \in
 *           \to \rightarrow \infty
 *   大运算符：\sum \prod \int ｜ 函数名：\log \ln \lg \sin \cos \tan \lim \exp
 *   数字/字母/+-=<>()[]|,;:!? 与 '（求导撇）
 * ============================================================ */
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const DATA_DIR = join(ROOT, "modules", "math", "data");
const MATHML_NS = "http://www.w3.org/1998/Math/MathML";

/* ---------------- 交互类型（与 docs/math-interaction-params.md、
 * docs/math-geometry-params.md 同步） ---------------- */
const INTERACTION_TYPES = {
  // 代数（原有）
  "slider-lab": ["min", "max", "step", "label", "expr"],
  "balance-drag": ["left", "right", "goal"],
  "linked-dashboard": ["source", "views"],
  "plot-points": ["fn", "xMin", "xMax", "step"],
  "zoomer": ["fn", "center", "levels", "window"],
  "numeric-lab": ["mode", "maxSteps"],
  "subdivision": ["fn", "a", "b", "steps"],
  "placeholder-morph": ["stages", "expr"],
  "side-compare": ["left", "right"],
  "slow-replay": ["frames", "duration", "draw"],
  "shape-area": ["min", "max", "step"],
  // 几何（蓝队 2026-10-11：必填参数按 docs/math-geometry-params.md Schema）
  "vertex-drag": ["vertices"],
  "angle-protractor": ["angle"],
  "step-play": ["steps"],
  "tap-highlight": ["items", "groups"],
  "compare-toggle": ["views"],
};

/* ============================================================
 * LaTeX 子集 → MathML 转换器（递归下降）
 * ============================================================ */
const GREEK = {
  alpha: "α", beta: "β", gamma: "γ", delta: "δ", epsilon: "ε",
  theta: "θ", lambda: "λ", mu: "μ", pi: "π", sigma: "σ",
  phi: "φ", omega: "ω", Delta: "Δ", Sigma: "Σ", Omega: "Ω",
};
const BINOP = {
  times: "×", div: "÷", pm: "±", cdot: "⋅", leq: "≤", geq: "≥",
  neq: "≠", approx: "≈", in: "∈", to: "→", rightarrow: "→",
};
const FUNCNAMES = new Set(["log", "ln", "lg", "sin", "cos", "tan", "lim", "exp", "max", "min"]);

function escXml(s) {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function tokenize(src) {
  const toks = [];
  let i = 0;
  while (i < src.length) {
    const c = src[i];
    if (/\s/.test(c)) { i++; continue; }
    if (c === "\\") {
      const pos = i; i++;
      if (i < src.length && /[a-zA-Z]/.test(src[i])) {
        let j = i;
        while (j < src.length && /[a-zA-Z]/.test(src[j])) j++;
        toks.push({ t: "cmd", v: src.slice(i, j), pos });
        i = j;
      } else if (i < src.length) {
        toks.push({ t: "cmd", v: src[i], pos }); i++;
      } else {
        throw new Error(`LaTeX 解析失败 [行尾多余反斜杠] in "${src}"`);
      }
    } else if (c === "{") { toks.push({ t: "lbrace", pos: i }); i++; }
    else if (c === "}") { toks.push({ t: "rbrace", pos: i }); i++; }
    else if (c === "^") { toks.push({ t: "sup", pos: i }); i++; }
    else if (c === "_") { toks.push({ t: "sub", pos: i }); i++; }
    else if (c === "[") { toks.push({ t: "lbrack", pos: i }); i++; }
    else if (c === "]") { toks.push({ t: "rbrack", pos: i }); i++; }
    else { toks.push({ t: "char", v: c, pos: i }); i++; }
  }
  return toks;
}

class Parser {
  constructor(toks, src) { this.toks = toks; this.i = 0; this.src = src; }
  peek() { return this.toks[this.i]; }
  next() { return this.toks[this.i++]; }
  fail(msg) {
    const t = this.peek();
    throw new Error(`LaTeX 解析失败 [${msg}] @${t ? t.pos : this.src.length} in "${this.src}"`);
  }
  /* row := 带上下标的原子序列，遇到 rbrace/rbrack/EOF 停止 */
  parseRow() {
    let out = "";
    for (;;) {
      const t = this.peek();
      if (!t || t.t === "rbrace" || t.t === "rbrack") break;
      out += this.parseAtomWithScripts();
    }
    return out;
  }
  /* { row } → <mrow> */
  parseGroup() {
    const t = this.next();
    if (!t || t.t !== "lbrace") this.fail("需要 {");
    const inner = this.parseRow();
    const c = this.next();
    if (!c || c.t !== "rbrace") this.fail("需要 } 配对");
    return `<mrow>${inner}</mrow>`;
  }
  /* 上下标参数：{...} 或单个字符（LaTeX 标准语义：无括号时只取一个字符） */
  parseScriptArg() {
    const t = this.peek();
    if (t && t.t === "lbrace") return this.parseGroup();
    const a = this.next();
    if (!a) this.fail("^/_ 后缺少参数");
    if (a.t === "char") return this.parseChar(a.v, true); // 单字符，不贪婪吞连续同类
    if (a.t === "cmd") return this.parseCmd(a.v);
    this.fail(`^/_ 后意外的记号 "${a.t}"`);
  }
  parseAtomWithScripts() {
    let base = this.parseAtom();
    if (base == null) this.fail("意外结束");
    let sub = null, sup = null;
    for (;;) {
      const t = this.peek();
      if (t && t.t === "sub") { this.next(); if (sub) this.fail("重复下标"); sub = this.parseScriptArg(); }
      else if (t && t.t === "sup") { this.next(); if (sup) this.fail("重复上标"); sup = this.parseScriptArg(); }
      else break;
    }
    // 大运算符：极限上下标用 munder/mover，积分恒用 msubsup
    if (typeof base === "object" && base.bigop) {
      const op = `<mo>${base.bigop}</mo>`;
      if (base.intop) {
        if (sub && sup) return `<msubsup>${op}${sub}${sup}</msubsup>`;
        if (sub) return `<msub>${op}${sub}</msub>`;
        if (sup) return `<msup>${op}${sup}</msup>`;
        return op;
      }
      if (sub && sup) return `<munderover>${op}${sub}${sup}</munderover>`;
      if (sub) return `<munder>${op}${sub}</munder>`;
      if (sup) return `<mover>${op}${sup}</mover>`;
      return op;
    }
    // 上下标底数绑定修正（LaTeX 语义：^/_ 只绑最后一个字符）
    // 多字符 <mi> 由连续字母合并而成（如 ax、nx）：遇 ^/_ 时拆成
    // "<mi>前部</mi> + 末字符带上下标"，使上下标只作用于末字符。
    // 只拆 <mi>：<mn>（如 10^2）整体为底绝不拆；函数名（log/sin/lim…）
    // 是整体单位绝不拆；无上下标时（如 bx）保持合并 <mi>bx</mi> 不变。
    // 大运算符（bigop 对象）走上面的分支，不受影响。
    if (typeof base === "string" && (sub || sup)) {
      const m = /^<mi>([a-zA-Z]{2,})<\/mi>$/.exec(base);
      if (m && !FUNCNAMES.has(m[1])) {
        const name = m[1];
        const head = `<mi>${name.slice(0, -1)}</mi>`;
        const last = `<mi>${name.slice(-1)}</mi>`;
        if (sub && sup) return `${head}<msubsup>${last}${sub}${sup}</msubsup>`;
        if (sub) return `${head}<msub>${last}${sub}</msub>`;
        return `${head}<msup>${last}${sup}</msup>`;
      }
    }
    if (sub && sup) return `<msubsup>${base}${sub}${sup}</msubsup>`;
    if (sub) return `<msub>${base}${sub}</msub>`;
    if (sup) return `<msup>${base}${sup}</msup>`;
    return base;
  }
  parseAtom() {
    const t = this.next();
    if (!t) return null;
    if (t.t === "lbrace") {
      this.i--; // 回退，让 parseGroup 处理
      return this.parseGroup();
    }
    if (t.t === "char") return this.parseChar(t.v);
    if (t.t === "cmd") return this.parseCmd(t.v);
    this.fail(`意外的记号 "${t.t}"`);
  }
  parseChar(c, single = false) {
    if (/[0-9]/.test(c)) {
      let num = c;
      if (!single) {
        while (this.peek() && this.peek().t === "char" && /[0-9]/.test(this.peek().v)) num += this.next().v;
        if (this.peek() && this.peek().t === "char" && this.peek().v === "." &&
            this.toks[this.i + 1] && this.toks[this.i + 1].t === "char" && /[0-9]/.test(this.toks[this.i + 1].v)) {
          num += this.next().v;
          while (this.peek() && this.peek().t === "char" && /[0-9]/.test(this.peek().v)) num += this.next().v;
        }
      }
      return `<mn>${num}</mn>`;
    }
    if (/[a-zA-Z]/.test(c)) {
      let id = c;
      if (!single) {
        while (this.peek() && this.peek().t === "char" && /[a-zA-Z]/.test(this.peek().v)) id += this.next().v;
      }
      return `<mi>${id}</mi>`;
    }
    const moMap = { "+": "+", "=": "=", "<": "&lt;", ">": "&gt;", "(": "(", ")": ")",
      "[": "[", "]": "]", "|": "|", ",": ",", ";": ";", ":": ":", "!": "!", "?": "?",
      "*": "×", "'": "′" };
    if (c === "-") return "<mo>−</mo>"; // U+2212 减号
    if (c === ".") return "<mo>.</mo>";
    if (moMap[c] !== undefined) return `<mo>${moMap[c]}</mo>`;
    this.fail(`不支持的字符 "${c}"`);
  }
  parseCmd(name) {
    if (GREEK[name]) return `<mi>${GREEK[name]}</mi>`;
    if (BINOP[name]) return `<mo>${BINOP[name]}</mo>`;
    if (name === "infty") return "<mi>∞</mi>";
    if (name === "sum") return { bigop: "∑" };
    if (name === "prod") return { bigop: "∏" };
    if (name === "int") return { bigop: "∫", intop: true };
    if (FUNCNAMES.has(name)) return `<mi>${name}</mi>`;
    if (name === "frac") {
      const a = this.parseGroup(), b = this.parseGroup();
      return `<mfrac>${a}${b}</mfrac>`;
    }
    if (name === "sqrt") {
      let n = null;
      if (this.peek() && this.peek().t === "lbrack") {
        this.next();
        n = `<mrow>${this.parseRow()}</mrow>`;
        const c = this.next();
        if (!c || c.t !== "rbrack") this.fail("\\sqrt[n] 缺少 ]");
      }
      const rad = this.parseGroup();
      return n ? `<mroot>${rad}${n}</mroot>` : `<msqrt>${rad}</msqrt>`;
    }
    if (name === "text") {
      const t = this.next();
      if (!t || t.t !== "lbrace") this.fail("\\text 需要 {");
      let raw = "";
      let depth = 1;
      while (depth > 0) {
        const k = this.next();
        if (!k) this.fail("\\text 缺少 }");
        if (k.t === "lbrace") { depth++; raw += "{"; }
        else if (k.t === "rbrace") { depth--; if (depth > 0) raw += "}"; }
        else if (k.t === "cmd") raw += "\\" + k.v;
        else if (k.v !== undefined) raw += k.v;
      }
      return `<mtext>${escXml(raw)}</mtext>`;
    }
    if (name === "left" || name === "right") {
      const d = this.next();
      if (!d) this.fail(`\\${name} 后缺少定界符`);
      if (d.t === "cmd" && d.v === ".") return ""; // 空定界符
      const ch = d.t === "char" ? d.v : null;
      const map = { "(": "(", ")": ")", "[": "[", "]": "]", "{": "{", "}": "}", "|": "|", "<": "⟨", ">": "⟩" };
      if (ch && map[ch]) return `<mo>${map[ch]}</mo>`;
      this.fail(`\\${name} 不支持定界符`);
    }
    this.fail(`未知命令 \\${name}（仅支持子集，见文件头文档）`);
  }
}

export function latexToMathML(latex) {
  const toks = tokenize(latex);
  const p = new Parser(toks, latex);
  const body = p.parseRow();
  if (p.peek()) p.fail("多余的 } 或 ]");
  if (!body.trim()) throw new Error(`空公式 in "${latex}"`);
  return `<math xmlns="${MATHML_NS}" display="block"><mrow>${body}</mrow></math>`;
}

/* ============================================================
 * 数据加载 / 校验 / 派生文件生成
 * ============================================================ */
function loadWindowJs(path) {
  const sandbox = { window: {} };
  vm.createContext(sandbox);
  vm.runInContext(readFileSync(path, "utf8"), sandbox, { filename: path });
  return sandbox.window;
}

function collectPages(dataDir) {
  const chapters = loadWindowJs(join(dataDir, "chapters.js")).MATH_CHAPTERS || [];
  const pages = []; // {chId, page, lessonTitle}
  const seen = new Set();
  for (const ch of chapters) {
    const fp = join(dataDir, ch.id + ".js");
    if (!existsSync(fp)) continue; // 筹备中章节无数据文件时跳过
    const CH = loadWindowJs(fp).MATH_CH || {};
    const chData = CH[ch.id];
    if (!chData) throw new Error(`${fp} 缺少 window.MATH_CH.${ch.id}`);
    for (const u of chData.units || []) {
      for (const l of u.lessons || []) {
        for (const p of l.pages || []) {
          if (seen.has(p.id)) throw new Error(`页 id 重复: ${p.id}`);
          seen.add(p.id);
          pages.push({ chId: ch.id, page: p, lessonTitle: l.title });
        }
      }
    }
  }
  return pages;
}

const errors = [];
const warnings = [];
function err(msg) { errors.push(msg); }
function warn(msg) { warnings.push(msg); }

function validateInteraction(pageId, ix, role) {
  if (!ix) { if (role === "主") err(`${pageId}: 缺少主交互`); return; }
  const req = INTERACTION_TYPES[ix.type];
  if (!req) { err(`${pageId}: 未知交互类型 "${ix.type}"`); return; }
  for (const k of req) {
    if (ix.params == null || ix.params[k] === undefined) {
      err(`${pageId}: 交互 ${ix.type} 缺少必填参数 "${k}"`);
    }
  }
  if (ix.type === "side-compare") {
    for (const side of ["left", "right"]) {
      const sub = ix.params && ix.params[side];
      if (sub && sub.kind === "side-compare") err(`${pageId}: side-compare 禁止嵌套`);
    }
  }
}

function validate(pages) {
  for (const { chId, page: p } of pages) {
    const tag = p.id || "(无id)";
    if (!p.id) { err(`${chId}: 页缺少 id`); continue; }
    if (!p.title) warn(`${tag}: 缺少 title`);
    // 公式
    let fi = 0;
    for (const f of p.formulas || []) {
      fi++;
      if (!f.latex) err(`${tag}: 公式 f${fi} 缺少 latex`);
      if (!f.translation) { err(`${tag}: 公式 ${f.id || "f" + fi} 缺少 translation（必填，阻断）`); continue; }
      try { latexToMathML(f.latex); }
      catch (e) { err(`${tag}: 公式 ${f.id || "f" + fi} LaTeX 错误: ${e.message}`); }
    }
    if ((p.formulas || []).length > 3) warn(`${tag}: 公式超过 3 个`);
    // 交互
    validateInteraction(tag, p.interaction, "主");
    if (p.auxInteraction) validateInteraction(tag, p.auxInteraction, "辅");
    // 文字量（蓝队 2026-10-11：讲解页按教学设计可写到约 300 字，不适用 150 字上限）
    const text = [p.title, ...(p.hints || [])].join("");
    const cjkCount = (text.match(/[\u4e00-\u9fff]/g) || []).length;
    if (p.pageKind !== "explain" && cjkCount > 150) warn(`${tag}: 文字约 ${cjkCount} 字，超过 150 上限`);
  }
}

function render(pages, onlyCh) {
  const byCh = {};
  for (const { chId, page } of pages) {
    if (onlyCh && chId !== onlyCh) continue;
    byCh[chId] = byCh[chId] || [];
    for (const f of page.formulas || []) {
      const key = `${page.id}#${f.id}`;
      byCh[chId].push(`window.MATH_MML[${JSON.stringify(key)}] = ${JSON.stringify(latexToMathML(f.latex))};`);
    }
  }
  for (const [chId, lines] of Object.entries(byCh)) {
    const out = [
      `// 由 tools/render-mathml.mjs 自动生成，请勿手工编辑`,
      `// 源：modules/math/data/${chId}.js`,
      `window.MATH_MML = window.MATH_MML || {};`,
      ...lines,
      "",
    ].join("\n");
    writeFileSync(join(DATA_DIR, `${chId}.formulas.js`), out, "utf8");
    console.log(`✓ ${chId}.formulas.js (${lines.length} 公式)`);
  }
}

/* ---------------- 自检 ---------------- */
function runTests() {
  const cases = [
    ["x + 5 = 12", ["<mi>x</mi>", "<mn>5</mn>", "<mn>12</mn>", "<mo>=</mo>"]],
    ["\\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
      ["<mfrac>", "<msqrt>", "<msup>", "±", "−"]],
    ["x = \\frac{-b \\pm \\sqrt{b^2-4ac}}{2a}", ["<mfrac>"]],
    ["\\int_{a}^{b} f(x) dx", ["<msubsup>", "∫"]],
    ["\\sum_{i=1}^{n} i", ["<munderover>", "∑"]],
    ["\\lim_{x \\to 0} \\frac{\\sin x}{x}", ["<msub>", "<mi>lim</mi>", "→"]],
    ["y = \\log_{2} 8", ["<msub>", "<mi>log</mi>"]],
    ["f'(x)", ["′"]],
    ["\\sqrt[3]{27} = 3", ["<mroot>"]],
    ["\\alpha + \\beta = \\pi", ["α", "β", "π"]],
    ["\\left( x + 1 \\right)^2", ["<msup>", "<mo>(</mo>"]],
    ["a \\leq b, c \\neq d", ["≤", "≠"]],
    // 上下标底数绑定：多字符 <mi> 只绑末字符；<mn>/函数名整体为底
    ["y = ax^2 + bx", ["<mi>a</mi><msup><mi>x</mi><mn>2</mn></msup>", "<mi>bx</mi>"]],
    ["(x^n)' = n x^{n-1}", ["<mi>n</mi><msup><mi>x</mi>", "<msup><mi>x</mi><mi>n</mi></msup>"]],
    ["2^3", ["<msup><mn>2</mn><mn>3</mn></msup>"]],
    ["10^2", ["<msup><mn>10</mn><mn>2</mn></msup>"]],
    ["a_1 + b_{23}", ["<msub><mi>a</mi><mn>1</mn></msub>"]],
    ["\\sin^2 x + \\cos^2 x = 1", ["<msup><mi>sin</mi>", "<msup><mi>cos</mi>"]],
  ];
  let pass = 0;
  for (const [latex, wants] of cases) {
    let out;
    try { out = latexToMathML(latex); }
    catch (e) { console.error(`✗ FAIL(throw) ${latex}: ${e.message}`); process.exitCode = 1; continue; }
    const missing = wants.filter((w) => !out.includes(w));
    if (missing.length) {
      console.error(`✗ FAIL ${latex}: 缺少 ${missing.join(",")}\n  → ${out}`);
      process.exitCode = 1;
    } else { pass++; }
  }
  // 反例：未知命令必须抛错
  try { latexToMathML("\\unknowncmd{x}"); console.error("✗ FAIL: 未知命令未抛错"); process.exitCode = 1; }
  catch (e) { pass++; }
  try { latexToMathML("\\frac{a}"); console.error("✗ FAIL: 缺参数未抛错"); process.exitCode = 1; }
  catch (e) { pass++; }
  console.log(`自检通过 ${pass}/${cases.length + 2}`);
}

/* ---------------- 入口 ---------------- */
const args = process.argv.slice(2);
if (args.includes("--test")) {
  runTests();
} else {
  const pages = collectPages(DATA_DIR);
  validate(pages);
  if (warnings.length) {
    console.log("--- 告警 ---");
    warnings.forEach((w) => console.log("⚠ " + w));
  }
  if (errors.length) {
    console.log("--- 错误（构建阻断） ---");
    errors.forEach((e) => console.log("✗ " + e));
    process.exit(1);
  }
  if (args.includes("--validate")) {
    console.log(`校验通过：${pages.length} 页`);
  } else {
    const chArg = args[args.indexOf("--ch") + 1];
    render(pages, args.includes("--ch") ? chArg : null);
    console.log(`完成：${pages.length} 页`);
  }
}
