/* 化学真值断言门禁（数据层）
 * 源自化学深度审计·新白队 truth-assert.mjs（2026-10-15），转正为上线门禁。
 * 变更：路径相对仓库根；R03 文本扫描按深审 §2.3 排除口径收紧；新增 S1 测量口径断言；
 * FAIL>0 时非零退出。启发式桶（R05-复核/AX01-复核/R03-warn）仍需人工复核。
/* 化学深度审计·新白队·真值断言独立重跑（数据层）
 * 口径：~/workspace/chem-audit/chemistry-truth-criteria.md v1.0
 * 数据源：modules/chemistry/data/cm00..cm21.js（直接解析，不引用生产脚本/结论）
 * 输出：evidence/truth-assert-data.json
 */
import fs from "fs";

import { fileURLToPath } from "url";
import path from "path";
const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DATA = path.join(ROOT, "modules/chemistry/data");
const OUT = process.env.QA_OUT || "";  /* 传 QA_OUT=<目录> 则落盘 JSON，否则只打印 */
const window = {};
for (let i = 0; i <= 21; i++) {
  const n = String(i).padStart(2, "0");
  new Function("window", fs.readFileSync(`${DATA}/cm${n}.js`, "utf8"))(window);
}
const CH = window.CHEM_CH;

const FAIL = [], WARN = [], INFO = [];
const fail = (no, page, el, meas, exp, root) => FAIL.push({ no, page, element: el, measured: meas, expected: exp, root });
const warn = (no, page, el, meas, exp) => WARN.push({ no, page, element: el, measured: meas, expected: exp });

/* ---------- 工具 ---------- */
const SUB = { "₀": 0, "₁": 1, "₂": 2, "₃": 3, "₄": 4, "₅": 5, "₆": 6, "₇": 7, "₈": 8, "₉": 9 };
const SUP = { "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9 };
const ELEMENTS = new Set(("H,He,Li,Be,B,C,N,O,F,Ne,Na,Mg,Al,Si,P,S,Cl,Ar,K,Ca,Sc,Ti,V,Cr,Mn,Fe,Co,Ni,Cu,Zn,Ga,Ge,As,Se,Br,Kr,Rb,Sr,Y,Zr,Nb,Mo,Tc,Ru,Rh,Pd,Ag,Cd,In,Sn,Sb,Te,I,Xe,Cs,Ba,La,Ce,Pr,Nd,Pm,Sm,Eu,Gd,Tb,Dy,Ho,Er,Tm,Yb,Lu,Hf,Ta,W,Re,Os,Ir,Pt,Au,Hg,Tl,Pb,Bi,Po,At,Rn,Fr,Ra,Ac,Th,Pa,U,Np,Pu").split(","));
// 必须小写的双字母符号（正确形 Xx）
const XX = ["He", "Li", "Be", "Ne", "Na", "Mg", "Al", "Si", "Cl", "Ar", "Ca", "Sc", "Ti", "Cr", "Mn", "Fe", "Co", "Ni", "Cu", "Zn", "Ga", "Ge", "As", "Se", "Br", "Kr", "Rb", "Sr", "Zr", "Nb", "Mo", "Tc", "Ru", "Rh", "Pd", "Ag", "Cd", "In", "Sn", "Sb", "Te", "Xe", "Cs", "Ba", "La", "Ce", "Pr", "Nd", "Pm", "Sm", "Eu", "Gd", "Tb", "Dy", "Ho", "Er", "Tm", "Yb", "Lu", "Hf", "Ta", "Re", "Os", "Ir", "Pt", "Au", "Hg", "Tl", "Pb", "Bi", "Po", "At", "Rn", "Fr", "Ra", "Ac", "Th", "Pa", "Np", "Pu", "Am", "Cm", "Bk", "Cf", "Es", "Fm", "Md", "No", "Lr", "Rf", "Db", "Sg", "Bh", "Hs", "Mt", "Ds", "Rg", "Cn", "Nh", "Fl", "Mc", "Lv", "Ts", "Og"];

// 化学式解析：Unicode 下标/上标、括号、水合点号；返回 {elem:count}（电荷部分剥离）
function parseFormula(f) {
  let s = String(f).trim();
  s = s.replace(/[⁺⁻][⁰¹²³⁴⁵⁶⁷⁸⁹]*$/u, "").replace(/[+-]\d*$/, ""); // 去电荷
  s = s.replace(/·\d*[A-Za-z].*$/, m => { // 水合：·5H₂O 拆出
    const inner = m.slice(1); const mm = inner.match(/^(\d+)(.*)$/); return mm ? "+" + mm[1] + "*" + mm[2] : "+" + inner;
  });
  const tokens = [];
  let i = 0;
  const readNum = () => { let n = ""; while (i < s.length && (SUB[s[i]] !== undefined || /\d/.test(s[i]))) { n += SUB[s[i]] !== undefined ? SUB[s[i]] : s[i]; i++; } return n === "" ? 1 : parseInt(n, 10); };
  function readGroup() {
    const acc = {};
    while (i < s.length) {
      const c = s[i];
      if (c === "(" || c === "（") { i++; const g = readGroup(); if (s[i] === ")" || s[i] === "）") i++; const m = readNum(); for (const e in g) acc[e] = (acc[e] || 0) + g[e] * m; }
      else if (c === ")" || c === "）") break;
      else if (c === "+") { i++; const mm = s.slice(i).match(/^(\d+)\*/); let mult = 1; if (mm) { mult = parseInt(mm[1], 10); i += mm[0].length; } const g = readGroup(); for (const e in g) acc[e] = (acc[e] || 0) + g[e] * mult; break; }
      else if (/[A-Z]/.test(c)) { let sym = c; i++; if (i < s.length && /[a-z]/.test(s[i])) { sym += s[i]; i++; } const m = readNum(); acc[sym] = (acc[sym] || 0) + m; }
      else if (c === "·" || c === "." || c === " ") { i++; }
      else i++;
    }
    return acc;
  }
  return readGroup();
}
function stripTags(h) { return String(h).replace(/<[^>]*>/g, " "); }
function collectText(obj, out, depth) {
  out = out || []; depth = depth || 0; if (depth > 8 || obj == null) return out;
  if (typeof obj === "string") { const t = stripTags(obj).replace(/\s+/g, " ").trim(); if (t.length > 1) out.push(t); }
  else if (Array.isArray(obj)) obj.forEach(x => collectText(x, out, depth + 1));
  else if (typeof obj === "object") for (const k of Object.keys(obj)) { if (/^(id|kind|type)$/.test(k)) continue; collectText(obj[k], out, depth + 1); }
  return out;
}
const pages = [];
for (const k of Object.keys(CH).sort())
  for (const u of CH[k].units || [])
    for (const l of u.lessons || [])
      for (const p of l.pages || [])
        pages.push({ id: p.id, lesson: l.id, chapter: k, kind: p.kind, page: p, text: collectText(p).join("\n") });
const widgetsOf = p => (p.page.widgets || []);
const wtype = (p, t) => widgetsOf(p).filter(w => w.type === t);
INFO.push({ pages: pages.length });

/* ---------- R01 配平只调系数 ---------- */
for (const p of pages) for (const w of [...wtype(p, "equation-balance"), ...wtype(p, "ion-split")]) {
  const eq = (w.params || {}).equation; if (!eq) continue;
  const species = [...(eq.reactants || []), ...(eq.products || [])];
  for (const s of species) {
    if (!s.atoms || !Object.keys(s.atoms).length) { fail("R01", p.id, s.formula, "atoms 缺失", "atoms 锁定真值必填", "数据缺失"); continue; }
    for (const e of Object.keys(s.atoms)) if (!ELEMENTS.has(e)) fail("R01", p.id, s.formula, "未知元素 " + e, "合法元素符号", "数据错");
    try {
      const parsed = parseFormula(s.formula);
      const keys = new Set([...Object.keys(parsed), ...Object.keys(s.atoms)]);
      for (const e of keys) if ((parsed[e] || 0) !== (s.atoms[e] || 0))
        fail("R01", p.id, s.formula, `解析=${JSON.stringify(parsed)} atoms=${JSON.stringify(s.atoms)}`, "化学式原子数=atoms", "数据错");
    } catch (e) { warn("R01", p.id, s.formula, "解析异常 " + e.message, "可解析化学式"); }
  }
  if (w.type === "equation-balance") {
    const pr = w.params;
    if (pr.trapSubscript && (!pr.trapText || pr.trapText.length < 20 || /TODO|占位|待补充/.test(pr.trapText)))
      fail("R01", p.id, "trapText", String((pr.trapText || "").length) + "字", "非占位红线警告文案", "数据缺失");
  }
}

/* ---------- R02/R06 配平判定 ---------- */
const gcd = (a, b) => b ? gcd(b, a % b) : a;
for (const p of pages) for (const w of wtype(p, "equation-balance")) {
  const pr = w.params, eq = pr.equation; if (!eq || !pr.answer) continue;
  const species = [...(eq.reactants || []), ...(eq.products || [])];
  if (pr.answer.length !== species.length) { fail("R02", p.id, "answer", pr.answer.length + "个系数", species.length + "个物种", "数据错"); continue; }
  const L = {}, R = {};
  species.forEach((s, i) => { const side = i < eq.reactants.length ? L : R; for (const e in s.atoms) side[e] = (side[e] || 0) + s.atoms[e] * pr.answer[i]; });
  const keys = new Set([...Object.keys(L), ...Object.keys(R)]);
  for (const e of keys) if ((L[e] || 0) !== (R[e] || 0))
    fail("R02", p.id, "answer=" + pr.answer.join(","), `${e}: 左${L[e] || 0}≠右${R[e] || 0}`, "answer 必须配平", "数据错");
  const g = pr.answer.reduce(gcd);
  if (g > 1) fail("R06", p.id, "answer=" + pr.answer.join(","), "公约数 " + g, "最小整数比", "数据错");
}

/* ---------- R03 方程式用等号（门禁版收紧） ----------
 * 深审报告 §2.3 人工复核结论编码为例外规则（不放宽标准，只剔除非方程式语境）：
 * ① 通式类（酸/碱/盐/氧化物/单质/化合物/金属/氮肥等类别词）② 半反应/电极反应（e⁻）
 * ③ 化合价变化记号（数字→）④ 正文逻辑/流程箭头（→ 左侧非化学式字符，或行内已有 =/＝/⇌）
 * ⑤ 故意反例（页内含"大错/故意/纠错"文案）。待配平示意仍走原口径转 WARN。 */
const R03_CAT = /酸|碱|盐|氧化物|单质|化合物|金属|氮肥/;
const R03_FORMULA_CHAR = /[A-Za-z0-9₀₁₂₃₄₅₆₇₈₉⁺⁻]$/;
for (const p of pages) {
  const hits = [];
  p.text.split("\n").forEach(line => {
    if (!(/→|->/.test(line) && /[＋+]/.test(line) && /[A-Za-z₀₁₂₃₄₅₆₇₈₉]/.test(line))) return;
    if (/e⁻/.test(line)) return;                       // 半反应/电极反应惯例记号
    if (/[0-9]\s*→/.test(line)) return;               // 化合价变化记号（+2 → 0）
    if (R03_CAT.test(line)) return;                    // 通式类规律表述
    const noDB = line.replace(/[A-Za-z][₀₁₂₃₄₅₆₇₈₉]*=[A-Za-z]/g, "");  // 剔除 C=C 双键记号的 =
    if (/[=＝⇌]/.test(noDB)) return;                // 行内已有正式连接符，→ 为推导/逻辑
    if (/大错|故意|纠错/.test(p.text)) return;         // 故意反例（配纠错文案）
    const m = line.match(/^(.*?)→/);
    if (m && !R03_FORMULA_CHAR.test(m[1].replace(/\s+$/, ""))) return;  // → 左侧非化学式
    hits.push(line.slice(0, 80));
  });
  for (const h of hits.slice(0, 4)) {
    if (/待配平/.test(p.text)) warn("R03", p.id, h, "箭头+待配平文字", "正式方程式区不得出现箭头");
    else fail("R03", p.id, h, "含 →/->", "方程式连接符用 =（可逆 ⇌）", "数据错");
  }
}
// 渲染层 equationText 专项
for (const p of pages) for (const w of widgetsOf(p)) {
  const eq = (w.params || {}).equation;
  if (eq && typeof eq === "object" && eq.equationText && /→/.test(eq.equationText) && !/待配平/.test(eq.equationText))
    fail("R03", p.id, "equationText", eq.equationText.slice(0, 60), "用 = / ⇌", "数据错");
}

/* ---------- R04 条件 ---------- */
for (const p of pages) for (const w of widgetsOf(p)) {
  const eq = (w.params || {}).equation;
  if (eq && eq.equationText && /点燃|加热|催化剂|通电|高温|光照/.test(eq.equationText)) {
    if (!eq.conditions) warn("R04", p.id, eq.equationText.slice(0, 50), "equationText 含条件词但 conditions 为空", "条件文字标等号上下");
  }
}

/* ---------- R05 ↑↓ 清单（人工复核） ---------- */
for (const p of pages) {
  p.text.split("\n").forEach(line => {
    if (/[↑↓]/.test(line) && /[A-Za-z]/.test(line)) WARN.push({ no: "R05-复核", page: p.id, element: line.slice(0, 90), measured: "含↑↓", expected: "↑仅气体产物/↓仅无固体反应物的沉淀" });
  });
}

/* ---------- R08 系数范围 ---------- */
for (const p of pages) for (const w of wtype(p, "equation-balance")) {
  const pr = w.params;
  if (pr.coeffMax > 9) fail("R08", p.id, "coeffMax", pr.coeffMax, "≤9", "数据错");
  if ((pr.answer || []).some(c => c < 1)) fail("R08", p.id, "answer", pr.answer.join(","), "系数≥1", "数据错");
  if ((pr.coeffInit || []).some(c => c < 1)) fail("R08", p.id, "coeffInit", pr.coeffInit.join(","), "系数≥1", "数据错");
}

/* ---------- R09 元素符号大小写 ---------- */
{
  const pat = new RegExp("(?<![A-Za-z])(" + XX.map(s => s.toUpperCase()).join("|") + ")(?![A-Za-z])", "g");
  for (const p of pages) {
    const seen = new Set();
    p.text.split("\n").forEach(line => {
      let m; pat.lastIndex = 0;
      while ((m = pat.exec(line))) {
        const key = m[1]; if (seen.has(key)) continue; seen.add(key);
        if (/github|http|www|API|TODO/i.test(line)) continue;
        const after = line.slice(m.index + key.length, m.index + key.length + 2);
        if (/[₀₁₂₃₄₅₆₇₈₉0-9]/.test(after)) continue; // 化学式语境（如 CO₂ 中的 CO）
        if (/^(CO|NO|HF)$/.test(key)) continue; // 分子语境正确用法（一氧化碳/一氧化氮/氟化氢），深审 §2.4 已人工复核
        if (p.id === "cm03.2.2-p3" && /不是/.test(line)) { warn("R09", p.id, line.slice(0, 60), "教学反例", "已配纠错文案合规"); continue; }
        if (p.id === "cm03.2.4-p2" && /应该写成/.test(line)) { warn("R09", p.id, line.slice(0, 60), "quiz 干扰项", "已配纠错文案合规，深审 §2.4"); continue; }
        fail("R09", p.id, line.slice(Math.max(0, m.index - 20), m.index + 30).trim(), `全大写 ${key}`, `应为 ${XX.find(s => s.toUpperCase() === key)}`, "数据错");
      }
    });
  }
}

/* ---------- R10 原子团括号 ---------- */
const GROUPS = ["OH", "SO4", "NO3", "CO3", "PO4", "NH4", "SO3", "ClO3"];
for (const p of pages) for (const w of widgetsOf(p)) {
  const eq = (w.params || {}).equation; if (!eq) continue;
  for (const s of [...(eq.reactants || []), ...(eq.products || [])]) {
    const f = String(s.formula);
    for (const g of GROUPS) {
      // g + 下标数字>1 且不在括号内
      const re = new RegExp(g.replace(/4/g, "[₄4]").replace(/3/g, "[₃3]") + "([₂₃₄₅₆₇₈₉2-9])", "g");
      let m;
      while ((m = re.exec(f))) {
        const before = f.slice(0, m.index);
        const open = (before.match(/\(/g) || []).length, close = (before.match(/\)/g) || []).length;
        if (open <= close) fail("R10", p.id, f, `原子团 ${g}×${m[1]} 无括号`, "如 Ca(OH)₂ 加括号", "数据错");
      }
    }
  }
}

/* ---------- R11/R12 化合价 ---------- */
for (const p of pages) for (const w of wtype(p, "redox-track")) {
  const pr = w.params, v = pr.valences; if (!v) continue;
  const all = { ...(v.reactants || {}), ...(v.products || {}) };
  const byFormula = {};
  for (const k of Object.keys(all)) { const f = k.split(".")[0]; (byFormula[f] = byFormula[f] || []).push([k, all[k]]); }
  for (const f of Object.keys(byFormula)) {
    const atomN = parseFormula(f);
    const sum = byFormula[f].reduce((a, [k, val]) => { const elName = k.split(".")[1]; return a + parseVal(val) * (atomN[elName] || 1); }, 0);
    const isElement = Object.keys(parseFormula(f)).length === 1;
    if (isElement) {
      if (byFormula[f].some(([, val]) => parseVal(val) !== 0))
        fail("R12", p.id, f, JSON.stringify(byFormula[f].map(x => x[1])), "单质化合价=0", "数据错");
    } else if (sum !== 0) {
      fail("R11", p.id, f, "代数和=" + sum, "化合物化合价代数和=0", "数据错");
    }
  }
  function parseVal(x) { return parseInt(String(x).replace(/[+＋]/g, "").replace(/[−-]/g, "-"), 10) || 0; }
}

/* ---------- R14 离子电荷数在前 ---------- */
for (const p of pages) {
  p.text.split("\n").forEach(line => {
    if (/[A-Z][a-z]?[⁺⁻][²³⁴⁵⁶⁷⁸⁹0-9]/.test(line) && !/[²³⁴⁵⁶⁷⁸⁹][⁺⁻]/.test(line.replace(/[A-Z][a-z]?[⁺⁻][²³⁴⁵⁶⁷⁸⁹]/g, ""))) {
      // 形如 Mg⁺²（号在前数在后）
      if (/[A-Z][a-z]?[⁺⁻][²³⁴⁵⁶⁷⁸⁹]/.test(line)) fail("R14", p.id, line.slice(0, 70), "电荷数在后", "离子电荷数在前如 Mg²⁺", "数据错");
    }
    if (/[A-Z][a-z]?[+-]\d/.test(line)) fail("R14", p.id, line.slice(0, 70), "Mg+2 形", "Mg²⁺ 形", "数据错");
  });
}

/* ---------- R16 摩尔质量单位 ---------- */
for (const p of pages) {
  p.text.split("\n").forEach(line => {
    if (/摩尔质量/.test(line) && /(\d+)\s*g\b(?!\s*\/\s*mol)/.test(line) && !/g\/mol/.test(line))
      fail("R16", p.id, line.slice(0, 80), "单位 g", "g/mol", "数据错");
  });
}

/* ---------- R17 22.4 限标准状况 ---------- */
for (const p of pages) {
  if (/22\.4/.test(p.text) && !/标准状况|0\s*℃|101\s*kPa/.test(p.text))
    fail("R17", p.id, "22.4 L/mol", "无标准状况声明", "须同时出现标准状况（0℃、101kPa）", "数据错");
  else if (/22\.4/.test(p.text) && /标准状况/.test(p.text) && !/0\s*℃|101\s*kPa/.test(p.text))
    warn("R17", p.id, "22.4 L/mol", "有标准状况无温度压强值", "AX01: 有交代无边界→WARN");
}

/* ---------- R18 pH 无单位 ---------- */
for (const p of pages) {
  p.text.split("\n").forEach(line => {
    if (/pH\s*[=＝]?\s*\d+(\.\d+)?\s*(mol|g|mg|L|mL|%|M)\b/.test(line))
      fail("R18", p.id, line.slice(0, 70), "pH 带单位", "pH 无单位", "数据错");
  });
}

/* ---------- R20 pH 差1↔10倍文字 ---------- */
for (const p of pages) {
  if (/pH.*(差\s*1|相差\s*1|每差\s*1)/.test(p.text) && !/10\s*倍/.test(p.text))
    warn("R20", p.id, "pH 差1", "缺「差10倍」文字", "须配文字说明");
}

/* R21：引擎渲染自查清单，已转渲染层验证（forensic-render.mjs） */
/* ---------- R22 系数比≠质量比 ---------- */
for (const p of pages) {
  p.text.split("\n").forEach(line => {
    if (/系数比.{0,10}(就是|即|等于).{0,10}质量比/.test(line) && !/摩尔质量/.test(line))
      fail("R22", p.id, line.slice(0, 80), "系数比直接当质量比", "质量比=系数比×摩尔质量比", "数据错");
  });
}

/* ---------- R24 K 配表 ---------- */
for (const p of pages) for (const w of wtype(p, "rate-equilibrium")) {
  const pr = w.params || {};
  if (pr.mode === "quantitative" && !pr.kTable && !/配表|K值表/.test(p.text))
    fail("R24", p.id, "K值", "无配表来源", "定量模式 K 须来自黄队配表", "数据缺失");
}
/* R25/R27/R59：引擎渲染，已转渲染层验证 */

/* ---------- R32/R33/R34/R35/R36/R37/R38 装置 ---------- */
const TOXIC = ["co", "cl2", "no2", "so2"];
for (const p of pages) for (const w of wtype(p, "lab-assemble")) {
  const pr = w.params || {};
  if (pr.steps && pr.steps[0] && !/气密性/.test(pr.steps[0].caption || ""))
    fail("R32", p.id, "steps[0]", (pr.steps[0].caption || "").slice(0, 40), "第一步须为气密性检查", "数据错");
  const capAll = (pr.steps || []).map(s => s.caption || "").join(" ");
  if (/浓硫酸/.test(capAll) && /稀释|加水/.test(capAll)) {
    if (!/酸入水|浓硫酸倒入水中|把浓硫酸.*倒入.*水/.test(capAll))
      fail("R33", p.id, "稀释步骤", "未见酸入水", "酸入水", "数据错");
    if (/把水倒入浓硫酸|水入酸/.test(capAll))
      fail("R33", p.id, "稀释步骤", "水入酸", "酸入水", "数据错");
  }
  if (TOXIC.includes(pr.apparatus)) {
    const kinds = (pr.pieces || []).map(x => x.kind).join(",");
    if (!/balloon|naohBottle|吸收/.test(kinds))
      fail("R34", p.id, pr.apparatus, "pieces=" + kinds, "须含气球/NaOH吸收瓶", "数据缺失");
  }
  if (pr.apparatus === "h2") {
    const sc = JSON.stringify(pr.safetyChecks || []);
    if (!/验纯/.test(sc)) fail("R35", p.id, "safetyChecks", "缺验纯", "须含验纯检查点 mustPass", "数据缺失");
    else if (!(pr.safetyChecks || []).some(c => /验纯/.test(c.text || c.label || "") && c.mustPass))
      fail("R35", p.id, "safetyChecks", "验纯非 mustPass", "mustPass:true", "数据错");
  }
  if (pr.apparatus === "c2h2") {
    const sc = JSON.stringify(pr.safetyChecks || []);
    if (!/防倒吸/.test(sc)) fail("R36", p.id, "safetyChecks", "缺防倒吸", "须独立防倒吸检查点", "数据缺失");
  }
  if (!pr.realityNote || pr.realityNote.length < 10)
    fail("R37", p.id, "realityNote", "缺失/过短", "一句现实差异+安全事项", "数据缺失");
  const slotIds = new Set((pr.slots || []).map(s => s.id));
  (pr.steps || []).forEach((s, i) => {
    (s.highlight || []).forEach(h => { if (!slotIds.has(h)) fail("R38", p.id, `steps[${i}].highlight`, h, "须为合法槽位", "数据错"); });
  });
}

/* ---------- R40/R41/R42/R43/R45/R46 微观 ---------- */
for (const p of pages) for (const w of wtype(p, "tri-rep")) {
  if (!(w.params || {}).badgeText) fail("R40", p.id, "badgeText", "缺失", "常驻视角徽章", "数据缺失");
}
for (const p of pages) for (const w of wtype(p, "reaction-particle")) {
  const pr = w.params || {};
  if (pr.counter) {
    // R42 独立重算（含渲染器同款中间态排除规则）
    const parts = pr.particles || [];
    const side = role => {
      const molIon = {};
      parts.forEach(pd => { if (pd.role === role && (pd.kind === "molecule" || pd.kind === "ion")) { const c = parseFormula(pd.label); for (const e in c) molIon[e] = 1; } });
      const counts = {};
      parts.forEach(pd => {
        if (pd.role !== role) return;
        let use = true;
        if (pd.kind === "atom") { const c = parseFormula(pd.label); use = !Object.keys(c).every(e => molIon[e]); if (role !== "product") use = true; }
        if (!use) return;
        const cc = parseFormula(pd.label), n = pd.count || 1;
        for (const e in cc) counts[e] = (counts[e] || 0) + cc[e] * n;
      });
      return counts;
    };
    const L = side("reactant"), R = side("product");
    const keys = new Set([...Object.keys(L), ...Object.keys(R)]);
    for (const e of keys) if ((L[e] || 0) !== (R[e] || 0))
      fail("R42", p.id, "counter", `${e}: 前${L[e] || 0}≠后${R[e] || 0}`, "反应前后原子三不变", "数据错");
  }
  if (pr.spectatorFade !== true && !/旁观离子/.test(p.text) && /中和|复分解/.test(p.text))
    fail("R46", p.id, "旁观离子", "无淡出/标注", "须淡出或标注", "数据缺失");
}
/* R43：引擎渲染 B4 声明，已转渲染层验证 */
const IONIC = ["NaCl", "KCl", "MgO", "CaO", "CaCl₂", "BaCl₂", "Na₂O", "K₂O", "MgCl₂", "Al₂O₃", "Fe₂O₃", "CuO", "ZnO"];
for (const p of pages) for (const w of wtype(p, "molecule-build")) {
  const formulas = JSON.stringify(w.params || {});
  for (const f of IONIC) if (formulas.includes(f)) fail("R45", p.id, "molecule-build", "含 " + f, "离子化合物不拼分子", "数据错");
  if (!/离子化合物不拼分子|离子化合物.*分子/.test(p.text)) warn("R45", p.id, "声明", "缺「离子化合物不拼分子」", "须有一句声明");
}

/* ---------- R44 组成/构成 ---------- */
for (const p of pages) {
  p.text.split("\n").forEach(line => {
    if (/由[^，。；]*?(原子|分子|离子)组成/.test(line))
      WARN.push({ no: "R44-复核", page: p.id, element: line.slice(0, 80), measured: "…原子/分子/离子…组成", expected: "应为「构成」" });
    if (/由[^，。；]*?元素构成/.test(line))
      WARN.push({ no: "R44-复核", page: p.id, element: line.slice(0, 80), measured: "…元素…构成", expected: "应为「组成」" });
  });
}

/* ---------- R47/R54 transfer ---------- */
for (const p of pages) for (const w of [...wtype(p, "redox-track"), ...wtype(p, "reaction-particle")]) {
  const t = (w.params || {}).transfer || (w.params || {}).eTransfer;
  if (t) {
    if (!ELEMENTS.has(t.from) || !ELEMENTS.has(t.to)) fail("R54", p.id, "transfer", JSON.stringify(t), "from/to 为合法元素", "数据错");
    if (t.from === t.to) fail("R54", p.id, "transfer", JSON.stringify(t), "from≠to", "数据错");
  }
}

/* ---------- R55 四步对照 / R58 单质价0声明 ---------- */
for (const p of pages) for (const w of wtype(p, "redox-track")) {
  const t = p.text;
  const cols = [/化合价升|升.*化合价/, /失.*电子|电子.*失/, /氧化反应|被氧化/, /氧化剂/];
  if (!(/升失氧|降得还/.test(t) || cols.every(re => re.test(t))))
    fail("R55", p.id, "四步对照", "缺列", "升失氧、降得还四列一次呈现", "数据缺失");
  if (!/单质中元素化合价为\s*0/.test(t)) warn("R58", p.id, "声明", "缺「单质中元素化合价为0」", "C10 页内须有一句");
}

/* ---------- R59 ≠0 / R62 减弱/抵消 / R63 催化剂 ---------- */
for (const p of pages) for (const w of wtype(p, "rate-equilibrium")) {
  if (/抵消/.test(p.text) && !/不.*抵消|不是抵消/.test(p.text)) fail("R62", p.id, "勒夏特列", "用「抵消」", "须用「减弱这种改变」", "数据错");
}
/* R59：引擎渲染 ≠0 徽章，已转渲染层验证 */
for (const p of pages) {
  if (/催化剂/.test(p.text) && /rate-equilibrium|平衡/.test(p.text) && !/催化剂不改K|催化剂不改变/.test(p.text))
    warn("R63", p.id, "催化剂文案", "缺「催化剂不改K」", "cm18.2.3 配文案");
}

/* ---------- R64 离子方程式拆写 ---------- */
const STRONG_ACID = ["HCl", "H₂SO₄", "HNO₃", "HBr", "HI"];
const STRONG_BASE = ["NaOH", "KOH", "Ba(OH)₂", "Ca(OH)₂"];
const WEAK = ["H₂O", "H₂CO₃", "CH₃COOH", "HF", "H₂S", "HClO", "NH₃·H₂O"];
const PRECIP = ["BaSO₄", "AgCl", "CaCO₃", "Mg(OH)₂", "Fe(OH)₃", "Cu(OH)₂", "Al(OH)₃"];
const GAS = ["CO₂", "SO₂", "NH₃"];
for (const p of pages) for (const w of wtype(p, "ion-split")) {
  const sp = (w.params || {}).split || {};
  { const allS = [...((w.params||{}).equation.reactants||[]), ...((w.params||{}).equation.products||[])].map(s=>s.formula);
    const cov = new Set([...(sp.ions||[]), ...(sp.formulas||[])]);
    for (const f of allS) if (!cov.has(f)) fail("R64", p.id, "split覆盖", "缺 " + f, "全部物种须进 ions/formulas", "数据缺失"); }
  for (const f of (sp.ions || [])) {
    const norm = f;
    const ok = STRONG_ACID.includes(norm) || STRONG_BASE.includes(norm) || (/Cl$|NO₃$|SO₄$|₂SO₄/.test(norm) && !PRECIP.includes(norm));
    if (!ok) warn("R64", p.id, "拆 " + f, "不在强酸/强碱/可溶盐参考集", "人工核：四留三拆");
  }
  for (const f of (sp.formulas || [])) {
    const ok = WEAK.includes(f) || PRECIP.includes(f) || GAS.includes(f) || /O$/.test(f) || f === "H₂O";
    if (!ok) warn("R64", p.id, "留 " + f, "不在弱/沉淀/气体/氧化物参考集", "人工核：四留三拆");
  }
/* R65：引擎第4步渲染双守恒，已转渲染层验证 */
}

/* ---------- R66/R67 电解质/导电 ---------- */
for (const p of pages) {
  p.text.split("\n").forEach(line => {
    if (/(铜|铁|单质|混合物|Cu|Fe)[^，。；]{0,8}(?<!不)是电解质/.test(line) && !/不是电解质/.test(line))
      fail("R66", p.id, line.slice(0, 70), "单质/混合物称电解质", "电解质须为化合物", "数据错");
    if (/固体(NaCl|氯化钠).{0,6}导电|(NaCl|氯化钠)固体.{0,6}导电/.test(line) && !/不导电/.test(line))
      fail("R67", p.id, line.slice(0, 70), "固体NaCl导电", "须配「水溶液中或熔融态」", "数据错");
  });
}

/* ---------- R68 危险操作提示 / R69 / R70 安全 ---------- */
for (const p of pages) {
  const danger = /加热|点火|有毒|浓硫酸|浓硝酸|浓盐酸/.test(p.text);
  const isLab = widgetsOf(p).some(w => w.type === "lab-assemble");
  if ((danger && isLab) || (isLab && /加热|点火/.test(JSON.stringify(wtype(p, "lab-assemble")[0].params || {})))) {
    if (!/现实中|通风橱|老师指导/.test(p.text))
      fail("R68", p.id, "危险操作提示", "缺失", "现实中不可如此操作/通风橱/老师指导", "数据缺失");
  }
}
for (const p of pages) for (const w of wtype(p, "safety-quiz")) {
  for (const q of ((w.params || {}).questions || [])) {
    (q.options || []).forEach((op, i) => {
      if (i !== q.answer && (!op.warnText || !op.correctDo))
        fail("R69", p.id, "选项" + i, "缺warnText/correctDo", "错一步即警示+给正确做法", "数据缺失");
    });
  }
  if (/分数|排名|排行榜/.test(p.text)) fail("R70", p.id, "Y13", "出现分数/排名", "不记分不排名", "数据错");
}

/* ---------- AX01 近似显性化（关键词命中→人工复核） ---------- */
const AX = [
  ["22.4", /22\.4/, /标准状况/],
  ["稀释", /稀释/, /溶质质量不变/],
  ["金属活动性", /金属活动性顺序/, /溶液中|前置后|与水反应|盐.*可溶/],
  ["溶解度", /溶解度/, /一定温度|100g水|饱和/],
  ["pH试纸", /pH试纸|pH 试纸/, /大概|近似|精确.*pH计/],
  ["常温", /常温/, /25\s*℃/],
  ["完全反应", /完全反应/, /恰好|限量|过量/],
  ["纯净物代入", /代入.*计算|根据.*计算/, /纯净物|纯量/],
  ["曲线", /曲线/, /示意/],
];
for (const p of pages) {
  for (const [name, trig, disc] of AX) {
    if (trig.test(p.text) && !disc.test(p.text))
      WARN.push({ no: "AX01-复核", page: p.id, element: name, measured: "触发词命中但无显性化交代", expected: "假设/条件+边界显性化" });
  }
}


/* ---------- S1 测量口径断言（2026-10-15 深审黄队 S1 终裁，列为上线门禁） ----------
 * 中考/人教版口径：量筒分度值 1mL（估读到 0.1mL）、托盘天平读到 0.1g（不估读到下一位）；
 * 滴定管分度值 0.1mL（估读到 0.01mL）保留。量筒/天平页文案不得出现"估读到下一位"/"分度值 0.1mL"。 */
for (const p of pages) for (const w of wtype(p, "read-gauge-chem")) {
  const pr = w.params || {}, g = pr.gauge, d = pr.division;
  if (g === "cylinder" && d !== 1)
    fail("S1", p.id, "cylinder division", String(d), "量筒分度值=1（估读到 0.1mL，中考口径）", "数据错");
  if (g === "burette" && d !== 0.1)
    fail("S1", p.id, "burette division", String(d), "滴定管分度值=0.1（估读到 0.01mL）", "数据错");
  if (g === "cylinder" && /分度值 0\.1mL/.test(p.text))
    fail("S1", p.id, "量筒文案", "分度值 0.1mL", "分度值 1mL", "数据错");
  if ((g === "cylinder" || g === "balance") && /估读到下一位/.test(p.text))
    fail("S1", p.id, "估读文案", "含'估读到下一位'", "量筒/天平按中考口径表述", "数据错");
}

if (OUT) fs.writeFileSync(path.join(OUT, "truth-assert-data.json"), JSON.stringify({ FAIL, WARN, info: INFO }, null, 1));
console.log("FAIL:", FAIL.length, "WARN:", WARN.length);
const byNo = {};
for (const f of FAIL) byNo[f.no] = (byNo[f.no] || 0) + 1;
console.log(JSON.stringify(byNo, null, 1));
if (FAIL.length) {
  console.log("--- FAIL 明细 ---");
  for (const f of FAIL) console.log(`[${f.no}] ${f.page} | ${f.element} | 实测=${f.measured} | 期望=${f.expected}`);
  process.exit(1);
}
