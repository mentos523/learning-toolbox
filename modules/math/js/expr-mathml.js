/* ============================================================
 * 学习工具箱 · 数学模块 · 交互内表达式渲染器（蓝队）
 *
 * 背景：页面级公式走预渲染管线（tools/render-mathml.mjs →
 * data/chNN.formulas.js → math.js#formulaHtml），但交互组件
 * （interactions.js）里的表达式用的是 ASCII 写法（x^2、2*x+1、
 * 1/2^n——给 evalExpr 求值用的），直接 esc() 塞裸文本，从未
 * 经过数学排版管线，导致交互框内出现 x^2 裸文本。
 *
 * 本模块：ASCII 数学子集 → AST → MathML（MathML 可用时）/
 * HTML <sup>/<sub>（降级）。解析失败（如中文混排 label）
 * 时回退为转义纯文本，保证永不抛错、不破坏布局。
 *
 * 零依赖，file:// 可用。核心为纯字符串函数，可在 node 下
 * require 做单元测试（见文件尾自检说明）。
 *
 * 支持的 ASCII 子集：
 *   四则 + - * /（* 渲染为 ⋅，/ 渲染为分式）
 *   上下标 ^ _（含 Unicode 上下标 ²₃ᵐ 等直接写法）
 *   括号 ()、一元负号、求导撇 '
 *   函数：sin cos tan log ln lg log2 exp sqrt（调用形式；sqrt 渲染为根号）
 *   标识符：拉丁字母、希腊字母（π ε Δ…）、隐式乘法（2x、2(x+1)、(a)(b)）
 *   关系符：= < > ≤ ≥ ≠ ≈ ± →
 * 对外：window.MathExpr = { html(expr), toMathML(expr), supported() }
 * ============================================================ */
(function () {
  "use strict";

  /* ---------------- 工具 ---------------- */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;")
      .replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }

  /* Unicode 上下标 → 普通字符（²→2、ᵐ→m、₂→2 …） */
  var SUPER_MAP = {
    "⁰": "0", "¹": "1", "²": "2", "³": "3", "⁴": "4",
    "⁵": "5", "⁶": "6", "⁷": "7", "⁸": "8", "⁹": "9",
    "ᵃ": "a", "ᵇ": "b", "ᶜ": "c", "ᵈ": "d", "ᵉ": "e",
    "ᶠ": "f", "ᵍ": "g", "ʰ": "h", "ⁱ": "i", "ʲ": "j",
    "ᵏ": "k", "ˡ": "l", "ᵐ": "m", "ⁿ": "n", "ᵒ": "o",
    "ᵖ": "p", "ʳ": "r", "ˢ": "s", "ᵗ": "t", "ᵘ": "u",
    "ᵛ": "v", "ʷ": "w", "ˣ": "x", "ʸ": "y", "ᶻ": "z",
    "⁺": "+", "⁻": "-", "⁼": "=", "⁽": "(", "⁾": ")"
  };
  var SUB_MAP = {
    "₀": "0", "₁": "1", "₂": "2", "₃": "3", "₄": "4",
    "₅": "5", "₆": "6", "₇": "7", "₈": "8", "₉": "9",
    "ₐ": "a", "ₑ": "e", "ₕ": "h", "ᵢ": "i", "ⱼ": "j",
    "ₖ": "k", "ₗ": "l", "ₘ": "m", "ₙ": "n", "ₒ": "o",
    "ₚ": "p", "ᵣ": "r", "ₛ": "s", "ₜ": "t", "ᵤ": "u",
    "ᵥ": "v", "ₓ": "x",
    "₊": "+", "₋": "-", "₌": "=", "₍": "(", "₎": ")"
  };
  var GREEK_RE = /[α-ωΑ-Ω]/;  // 希腊字母（含 π ε Δ 等字面量）
  var FUNC_NAMES = { sin: 1, cos: 1, tan: 1, log: 1, ln: 1, lg: 1, log2: 1, exp: 1,
    sqrt: 1 };  // 蓝队 2026-10-11：ladder-slide 的 h=√(L²−x²) 需要 sqrt（渲染为根号）

  /* ---------------- 词法 ---------------- */
  // token: {k:'num'|'id'|'sup'|'sub'|'usup'|'usub'|'add'|'mul'|'div'|'rel'|'lp'|'rp'|'prime'|'comma', v}
  function tokenize(src) {
    var toks = [], i = 0, n = src.length;
    function isLetter(c) {
      return (c >= "a" && c <= "z") || (c >= "A" && c <= "Z") || GREEK_RE.test(c);
    }
    while (i < n) {
      var c = src[i];
      if (c === " " || c === "\t" || c === "\n" || c === "\r") { i++; continue; }
      if (c >= "0" && c <= "9") {
        var j = i;
        while (j < n && src[j] >= "0" && src[j] <= "9") j++;
        if (src[j] === "." && j + 1 < n && src[j + 1] >= "0" && src[j + 1] <= "9") {
          j++;
          while (j < n && src[j] >= "0" && src[j] <= "9") j++;
        }
        toks.push({ k: "num", v: src.slice(i, j) }); i = j; continue;
      }
      if (isLetter(c)) {
        var k = i;
        while (k < n && (isLetter(src[k]) || (src[k] >= "0" && src[k] <= "9"))) k++;
        // 注意：log2 的 2 并入标识符（函数名识别用）
        toks.push({ k: "id", v: src.slice(i, k) }); i = k; continue;
      }
      if (SUPER_MAP[c] !== undefined) { toks.push({ k: "usup", v: SUPER_MAP[c] }); i++; continue; }
      if (SUB_MAP[c] !== undefined) { toks.push({ k: "usub", v: SUB_MAP[c] }); i++; continue; }
      if (c === "^") { toks.push({ k: "sup" }); i++; continue; }
      if (c === "_") { toks.push({ k: "sub" }); i++; continue; }
      if (c === "+" || c === "-") { toks.push({ k: "add", v: c }); i++; continue; }
      if (c === "−") { toks.push({ k: "add", v: "-" }); i++; continue; }  // U+2212
      if (c === "*") { toks.push({ k: "mul", v: "*" }); i++; continue; }
      if (c === "×" || c === "⋅") { toks.push({ k: "mul", v: "*" }); i++; continue; }
      if (c === "/") { toks.push({ k: "div" }); i++; continue; }
      if (c === "(") { toks.push({ k: "lp" }); i++; continue; }
      if (c === ")") { toks.push({ k: "rp" }); i++; continue; }
      if (c === "=" || c === "<" || c === ">") { toks.push({ k: "rel", v: c }); i++; continue; }
      if (c === "≤" || c === "≥" || c === "≠" || c === "≈" || c === "±") {
        toks.push({ k: "rel", v: c }); i++; continue;
      }
      if (c === "→") { toks.push({ k: "rel", v: "→" }); i++; continue; }
      if (c === "'") { toks.push({ k: "prime" }); i++; continue; }  // 求导撇
      if (c === "′") { toks.push({ k: "prime" }); i++; continue; }  // U+2032
      if (c === ",") { toks.push({ k: "comma" }); i++; continue; }
      throw new Error("不支持的字符 " + JSON.stringify(c));
    }
    return toks;
  }

  /* ---------------- 语法（递归下降） ----------------
   * expr := add (rel add)*          关系式
   * add  := mul (add mul)*          加减
   * mul  := pow ((mul|div) pow | 隐式乘 pow)*
   * pow  := unary ((sup|sub|usup|usub) unary)*   上下标（左结合；数据中无连续 ^）
   * unary:= add? postfix            一元负号（-x^2 = -(x^2)）
   * postfix := primary prime*
   * primary := num | id | funcCall | '(' expr ')'
   * funcCall := id '(' expr ')'     已知名 → 函数；未知 → 函数应用（不加 ⋅）
   * 隐式乘：num/id/rp 后紧跟 num/id/lp（id+lp 除外，已作函数应用）
   */
  function Parser(toks, src) {
    this.toks = toks; this.i = 0; this.src = src;
  }
  Parser.prototype.peek = function () { return this.toks[this.i]; };
  Parser.prototype.next = function () { return this.toks[this.i++]; };
  Parser.prototype.fail = function (msg) {
    throw new Error("表达式解析失败 [" + msg + "] in " + JSON.stringify(this.src));
  };
  Parser.prototype.parseExpr = function () {
    var left = this.parseAdd();
    var items = [left];
    for (;;) {
      var t = this.peek();
      if (t && t.k === "rel") { this.next(); items.push({ t: "op", v: t.v }); items.push(this.parseAdd()); }
      else if (t && t.k === "comma") { this.next(); items.push({ t: "op", v: "," }); items.push(this.parseAdd()); }
      else break;
    }
    return items.length === 1 ? left : { t: "row", items: items };
  };
  Parser.prototype.parseAdd = function () {
    var left = this.parseMul();
    var items = [left];
    for (;;) {
      var t = this.peek();
      if (t && t.k === "add") { this.next(); items.push({ t: "op", v: t.v }); items.push(this.parseMul()); }
      else break;
    }
    return items.length === 1 ? left : { t: "row", items: items };
  };
  Parser.prototype.parseMul = function () {
    var left = this.parsePow();
    var items = [left];
    for (;;) {
      var t = this.peek();
      if (t && (t.k === "mul" || t.k === "div")) {
        this.next();
        var right = this.parsePow();
        if (t.k === "div") {
          // a/b → 分式；操作数若为纯括号组则去括号（(x^2-1)/(x-1) → 分式上下）
          var l = items.pop();
          items.push({ t: "frac", n: unwrapParen(l), d: unwrapParen(right) });
        } else {
          items.push({ t: "op", v: "*" }); items.push(right);
        }
      } else if (t && canStartPrimary(t)) {
        // 隐式乘法：2x、2(x+1)、(a)(b)
        // （id 后紧跟 ( 已在 parsePrimary 中按函数调用消费，不会走到这里）
        items.push({ t: "op", v: "⁢" }); items.push(this.parsePow());
      } else break;
    }
    return items.length === 1 ? items[0] : { t: "row", items: items };
  };
  // 上下标：底数不含一元负号（-x^2 = -(x^2)，与 LaTeX 一致）；
  // 指数位置允许一元负号（x^-2）。
  Parser.prototype.parsePow = function () {
    var neg = false;
    var t0 = this.peek();
    if (t0 && t0.k === "add") { this.next(); neg = (t0.v === "-"); }
    var base = this.parsePostfix();
    var sub = null, sup = null;
    for (;;) {
      var t = this.peek();
      if (t && (t.k === "sup" || t.k === "usup")) {
        this.next();
        if (sup) this.fail("重复上标");
        sup = scriptNode(t.k === "usup" ? scriptAtom(t.v) : this.parseUnary());
      } else if (t && (t.k === "sub" || t.k === "usub")) {
        this.next();
        if (sub) this.fail("重复下标");
        sub = scriptNode(t.k === "usub" ? scriptAtom(t.v) : this.parseUnary());
      } else break;
    }
    // log₂(x)、sin^2(x)：带上下标的已知函数名后紧跟 ( → 函数调用（下标只作用于函数名）
    var pk = this.peek();
    if ((sub || sup) && base.t === "id" && FUNC_NAMES[base.v] && pk && pk.k === "lp") {
      this.next();
      var arg = this.parseExpr();
      var rp = this.next();
      if (!rp || rp.k !== "rp") this.fail("函数调用缺少 )");
      return wrapNeg({ t: "sfunc", v: base.v, s: sub, e: sup, arg: arg });
    }
    if (sub && sup) return wrapNeg({ t: "subsup", b: base, s: sub, e: sup });
    if (sub) return wrapNeg({ t: "sub", b: base, s: sub });
    if (sup) return wrapNeg({ t: "sup", b: base, e: sup });
    return wrapNeg(base);

    function wrapNeg(node) { return neg ? { t: "neg", e: node } : node; }
  };
  // Unicode 上下标原子：纯数字 → num，其余 → id
  function scriptAtom(v) {
    return /^[0-9]+$/.test(v) ? { t: "num", v: v } : { t: "id", v: v };
  }
  Parser.prototype.parseUnary = function () {
    var t = this.peek();
    if (t && t.k === "add" && (t.v === "-" )) {
      this.next();
      return { t: "neg", e: this.parsePostfix() };
    }
    if (t && t.k === "add" && t.v === "+") { this.next(); return this.parsePostfix(); }
    return this.parsePostfix();
  };
  Parser.prototype.parsePostfix = function () {
    var base = this.parsePrimary();
    while (this.peek() && this.peek().k === "prime") {
      this.next();
      base = { t: "prime", b: base };
    }
    return base;
  };
  Parser.prototype.parsePrimary = function () {
    var t = this.next();
    if (!t) this.fail("意外结束");
    if (t.k === "num") return { t: "num", v: t.v };
    if (t.k === "id") {
      if (this.peek() && this.peek().k === "lp") {
        this.next(); // (
        var arg = this.parseExpr();
        var c = this.next();
        if (!c || c.k !== "rp") this.fail("函数调用缺少 )");
        return { t: "func", v: t.v, arg: arg, known: !!FUNC_NAMES[t.v] };
      }
      return { t: "id", v: t.v };
    }
    if (t.k === "lp") {
      var inner = this.parseExpr();
      var r = this.next();
      if (!r || r.k !== "rp") this.fail("缺少 ) 配对");
      return { t: "paren", inner: inner };
    }
    this.fail("意外的记号 " + t.k);
  };

  function canStartPrimary(t) {
    return t.k === "num" || t.k === "id" || t.k === "lp";
  }
  // 分式/上下标位置的纯括号组去括号：(x^2-1)/(x-1) 的分子分母不保留外层括号
  function unwrapParen(node) {
    return (node && node.t === "paren") ? node.inner : node;
  }
  // 上下标参数：括号组去括号（2^(n-1) 上标不带括号）
  function scriptNode(node) {
    return unwrapParen(node);
  }

  function parse(src) {
    var toks = tokenize(src);
    if (!toks.length) throw new Error("空表达式");
    var p = new Parser(toks, src);
    var ast = p.parseExpr();
    if (p.peek()) p.fail("多余的记号");
    return ast;
  }

  /* ---------------- 发射器：MathML ---------------- */
  var OP_MML = { "+": "+", "-": "−", "*": "⋅", "⁢": "⁢",
    "=": "=", "<": "&lt;", ">": "&gt;",
    "≤": "≤", "≥": "≥", "≠": "≠", "≈": "≈", "±": "±",
    "→": "→", ",": "," };
  function emitMML(node) {
    switch (node.t) {
      case "num": return "<mn>" + esc(node.v) + "</mn>";
      case "id": return "<mi>" + esc(node.v) + "</mi>";
      case "op": return "<mo>" + (OP_MML[node.v] || esc(node.v)) + "</mo>";
      case "frac":
        return "<mfrac>" + wrapRowMML(node.n) + wrapRowMML(node.d) + "</mfrac>";
      case "sup": return "<msup>" + emitMML(node.b) + emitMML(node.e) + "</msup>";
      case "sub": return "<msub>" + emitMML(node.b) + emitMML(node.s) + "</msub>";
      case "subsup":
        return "<msubsup>" + emitMML(node.b) + emitMML(node.s) +
          emitMML(node.e) + "</msubsup>";
      case "row":
        return "<mrow>" + node.items.map(emitMML).join("") + "</mrow>";
      case "paren":
        return "<mrow><mo>(</mo>" + emitMML(node.inner) + "<mo>)</mo></mrow>";
      case "func":
        // sqrt → 真根号（ladder-slide 高度公式用）；其余函数名 + 括号
        if (node.v === "sqrt") return "<msqrt>" + emitMML(node.arg) + "</msqrt>";
        return "<mrow><mi>" + esc(node.v) + "</mi><mo>(</mo>" +
          emitMML(node.arg) + "<mo>)</mo></mrow>";
      case "sfunc": {  // 带上下标的函数调用：log₂(x)、sin^2(x)
        var nm = "<mi>" + esc(node.v) + "</mi>";
        if (node.s && node.e) nm = "<msubsup>" + nm + emitMML(node.s) + emitMML(node.e) + "</msubsup>";
        else if (node.s) nm = "<msub>" + nm + emitMML(node.s) + "</msub>";
        else if (node.e) nm = "<msup>" + nm + emitMML(node.e) + "</msup>";
        return "<mrow>" + nm + "<mo>(</mo>" + emitMML(node.arg) + "<mo>)</mo></mrow>";
      }
      case "prime":
        return "<msup>" + emitMML(node.b) + "<mo>′</mo></msup>";
      case "neg":
        return "<mrow><mo>−</mo>" + emitMML(node.e) + "</mrow>";
      default: throw new Error("未知 AST 节点 " + node.t);
    }
  }

  // 分式操作数已是 row 时不再套 mrow，避免冗余嵌套
  function wrapRowMML(node) {
    return node.t === "row" ? emitMML(node) : "<mrow>" + emitMML(node) + "</mrow>";
  }

  /* ---------------- 发射器：HTML 降级（MathML 不可用时） ----------------
   * 用 <sup>/<sub> 与 CSS 分式，保证"至少标准 HTML 数学排版"。 */
  function emitHTML(node) {
    switch (node.t) {
      case "num": return '<span class="mx-mn">' + esc(node.v) + "</span>";
      case "id": return '<i class="mx-mi">' + esc(node.v) + "</i>";
      case "op": {
        var m = { "*": "⋅", "-": "−", "<": "&lt;", ">": "&gt;" };
        return '<span class="mx-mo">' + (m[node.v] || esc(node.v)) + "</span>";
      }
      case "frac":
        return '<span class="mx-frac"><span class="mx-n">' + emitHTML(node.n) +
          '</span><span class="mx-d">' + emitHTML(node.d) + "</span></span>";
      case "sup": return emitHTML(node.b) + "<sup>" + emitHTML(node.e) + "</sup>";
      case "sub": return emitHTML(node.b) + "<sub>" + emitHTML(node.s) + "</sub>";
      case "subsup":
        return emitHTML(node.b) + "<sub>" + emitHTML(node.s) + "</sub><sup>" +
          emitHTML(node.e) + "</sup>";
      case "row":
        return "<span>" + node.items.map(emitHTML).join("") + "</span>";
      case "paren":
        return "<span>(</span>" + emitHTML(node.inner) + "<span>)</span>";
      case "func":
        if (node.v === "sqrt")
          return '<span class="mx-mo">√</span><span>(</span>' +
            emitHTML(node.arg) + "<span>)</span>";
        return '<i class="mx-mi">' + esc(node.v) + "</i><span>(</span>" +
          emitHTML(node.arg) + "<span>)</span>";
      case "sfunc": {
        var hn = '<i class="mx-mi">' + esc(node.v) + "</i>";
        if (node.s && node.e) hn += "<sub>" + emitHTML(node.s) + "</sub><sup>" + emitHTML(node.e) + "</sup>";
        else if (node.s) hn += "<sub>" + emitHTML(node.s) + "</sub>";
        else if (node.e) hn += "<sup>" + emitHTML(node.e) + "</sup>";
        return "<span>" + hn + "<span>(</span>" + emitHTML(node.arg) + "<span>)</span></span>";
      }
      case "prime":
        return emitHTML(node.b) + "<sup>′</sup>";
      case "neg":
        return '<span class="mx-mo">−</span>' + emitHTML(node.e);
      default: throw new Error("未知 AST 节点 " + node.t);
    }
  }

  /* ---------------- 对外接口 ---------------- */
  function supported() {
    return !!(typeof window !== "undefined" && window.MathMLCheck &&
      window.MathMLCheck.supported);
  }
  function toMathML(expr) {
    var ast = parse(String(expr == null ? "" : expr));
    return '<math xmlns="http://www.w3.org/1998/Math/MathML" display="inline"><mrow>' +
      emitMML(ast) + "</mrow></math>";
  }
  // 主入口：MathML 可用 → MathML；否则 → HTML 降级；解析失败 → 转义纯文本
  function html(expr) {
    var s = String(expr == null ? "" : expr);
    if (!s.trim()) return "";
    try {
      var ast = parse(s);
      return supported()
        ? '<math display="inline"><mrow>' + emitMML(ast) + "</mrow></math>"
        : '<span class="mx">' + emitHTML(ast) + "</span>";
    } catch (e) {
      return esc(s);
    }
  }

  var MathExpr = {
    html: html,
    toMathML: toMathML,
    supported: supported,
    _parse: parse  // 测试用
  };

  if (typeof window !== "undefined") window.MathExpr = MathExpr;
  // node 下可 require 做单元测试
  if (typeof module !== "undefined" && module.exports) module.exports = MathExpr;
})();
