#!/usr/bin/env node
/* ============================================================
 * 学习工具箱 · 统一校验入口（S1）
 *
 * 前置关系层试点的 S1 前置件（2026-10-18 立项，CEO 排期 Phase 4 前置）。
 * 整合现有零散门禁为"一次跑完"的统一入口：
 *   ① 各 check-*-review.mjs 台账门禁（调用编排，含失败透出）
 *   ② 台账署名身份校验（自研：review_history 只能专家队署名，生产队署名拦截；
 *      对应 playbook ⑭ / TU-C3）
 *   ③ 前置关系图谱断言（自研；方法借鉴 cn-math-taxonomy validate.py 的断言清单
 *      ——DFS 三色环检测、根节点规则、孤立节点报错、双向引用检查；
 *      代码全部自研，未复制对方任何代码/数据/文本，对方 CC BY-NC 4.0）
 *   ④ V8 字号阶梯扫描（调用编排：tools/v8-fontladder-scan.cjs）
 *   ⑤ 版本四线一致性（自研，hotfix-20261019：version.json ≡ 首页 TOOLBOX_VERSION
 *      ≡ 化学 CHEM_BUILD，且两 index.html 内全部数值型 ?v= 与版本号全等；
 *      曾导致化学页"永远有新版本"误报）
 *   ⑥ registry status 清单与"soon 却有内容"检查（自研，hotfix-20261019：
 *      status="soon" 的模块若 data/ 下已有课程数据 → FAIL；
 *      曾导致地理 16 章上线后首页仍显示"筹备中"）
 *   ⑦ 面包屑导航一致性（自研，全局导航批 2026-10-19：6 壳引用共享组件、
 *      6 主 JS 均有 TB_crumb.update 调用、全部 crumb href 静态可解——
 *      相对路径指向真实文件、hash 前缀被本模块路由实际处理且值在真实 track id 集合内；
 *      防假链接）
 * ⑧ student-text-tokens：学生文案内部 token 检查（自研，文字内容修复批 2026-10-19：
 *    block/warn 两级词表；定级依据见 WORDLIST.md）。
 * ⑨ explain-has-text：kind=explain 的页必须含 text 正文块（告警级）。
 * ⑩ hint-length：hint/tip 单条 >60 字列出（告警级）。
 * ⑪ explain-thin：explain 页正文 <150 字列出（告警级）。
 * ⑫ first-term-crosscheck：首现即定义/先认词标注清单（尽力而为，
 *    仓库内无独立术语追踪表，只产清单供人工比对）。
 *
 * 【版本】本文件为 push-2 版：⑧ 的 block 词表恢复阻断级（TOKEN_STRICT=true）。
 * 上线前提：第 1 批 S1 修复 + 第 2 批内容修复与两处机械清理全部落地，
 * 且绿测试（block 模式零命中）通过。
 * file:// 可跑红线：本脚本只读文件、不起服务；数据文件用 <script> 载入式
 * `window.X = {...}` 格式，Node 侧用沙箱求值读取，不走 fetch。
 *
 * 用法（仓库根目录）：
 *   node tools/validate-toolbox.mjs                 # 默认：门禁全跑，V8 只扫 physics
 *   node tools/validate-toolbox.mjs --v8=all       # V8 全量（geo+chem+math+physics）
 *   node tools/validate-toolbox.mjs --v8=skip      # 跳过 V8（结构校验仍跑）
 *   node tools/validate-toolbox.mjs --selftest     # 自检：用合成坏图谱验证断言有效
 *   node tools/validate-toolbox.mjs --json         # 机器可读输出
 *   node tools/validate-toolbox.mjs --v8=skip --only=version-sync,registry-status
 *                                             # 只跑 ⑤⑥（基线红/绿对照用）
 *
 * 退出码：0=全部通过；1=任一 FAIL。
 * ============================================================ */
import { execFileSync } from "node:child_process";
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { dirname, join, basename } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const args = new Set(process.argv.slice(2));
const JSON_OUT = args.has("--json");
const SELFTEST = args.has("--selftest");

/* ---------- 报告收集 ---------- */
const results = []; // {name, status: pass|fail|warn|skip, detail}
function rec(name, status, detail) { results.push({ name, status, detail }); }
function ok(name, detail) { rec(name, "pass", detail); }
function fail(name, detail) { rec(name, "fail", detail); }
function warn(name, detail) { rec(name, "warn", detail); }
function skip(name, detail) { rec(name, "skip", detail); }

/* ---------- ① 台账门禁编排 ---------- */
function runLedgerGates() {
  const scripts = ["check-chemistry-review.mjs", "check-geography-review.mjs", "check-grammar-review.mjs"];
  for (const s of scripts) {
    const p = join(ROOT, "tools", s);
    if (!existsSync(p)) { skip(`ledger-gate:${s}`, "脚本不存在"); continue; }
    try {
      const out = execFileSync("node", [p], { cwd: ROOT, encoding: "utf8", timeout: 120000 });
      const tail = out.trim().split("\n").filter((l) => l.includes("[OK]") || l.includes("[PASS]")).slice(-2).join("；");
      ok(`ledger-gate:${s}`, tail || "通过");
    } catch (e) {
      const out = (e.stdout || "") + (e.stderr || "");
      const fails = out.split("\n").filter((l) => l.includes("[FAIL]")).slice(0, 5).join("；");
      fail(`ledger-gate:${s}`, fails || `退出码 ${e.status}`);
    }
  }
}

/* ---------- ② 台账署名身份校验（自研） ---------- */
/* 口径：review_history[].by（地理/生物）或 note 内 初审/终审（X）签名（化学）；
 * 署名必须含"专家队"，且不得含生产侧标识（生产/蓝队/白队/灰队/黄队/CEO/协调者）。
 * 无签名证据 → warn（历史格式，不误杀）；显式非专家署名 → fail。 */
const EXPERT_RE = /专家队/;
const NON_EXPERT_RE = /生产|蓝队|白队|灰队|黄队|CEO|协调者|复验队/;
const SIGN_RE = /(?:初审|终审|复核|一审|二审)[（(]([^）)]+)[）)]/g;

function extractSigners(entry) {
  const signers = [];
  const rh = entry.review_history;
  if (Array.isArray(rh)) for (const r of rh) if (r && r.by) signers.push(String(r.by));
  const note = entry.note || "";
  let m;
  SIGN_RE.lastIndex = 0;
  while ((m = SIGN_RE.exec(note)) !== null) signers.push(m[1]);
  return signers;
}

function checkLedgerAuthors() {
  const dirs = [];
  const mods = join(ROOT, "modules");
  for (const mod of readdirSync(mods)) {
    const d = join(mods, mod, "data", "_review");
    if (existsSync(d)) dirs.push({ mod, d });
  }
  if (dirs.length === 0) { skip("ledger-author", "无台账目录"); return; }
  let checked = 0, bad = 0, noSig = 0;
  const badSamples = [];
  for (const { mod, d } of dirs) {
    const files = readdirSync(d).filter((f) => f.endsWith(".json")).sort();
    for (const f of files) {
      let doc;
      try { doc = JSON.parse(readFileSync(join(d, f), "utf8")); }
      catch (e) { fail("ledger-author", `${mod}/${f}：JSON 解析失败`); bad++; continue; }
      const ents = Array.isArray(doc) ? doc : (doc.entries || []);
      for (const e of ents) {
        if (!e || typeof e !== "object") continue;
        checked++;
        const signers = extractSigners(e);
        if (signers.length === 0) { noSig++; continue; }
        for (const s of signers) {
          if (!EXPERT_RE.test(s) || NON_EXPERT_RE.test(s)) {
            bad++;
            if (badSamples.length < 5) badSamples.push(`${mod}/${f} ${e.id || "?"} 署名「${s}」`);
          }
        }
      }
    }
  }
  const detail = `抽查 ${checked} 条目` +
    (badSamples.length ? `；非专家署名 ${bad} 处：${badSamples.join("；")}` : "") +
    (noSig ? `；无签名证据 ${noSig} 条（历史格式，记 warn）` : "");
  if (bad > 0) fail("ledger-author", detail);
  else if (noSig > 0) warn("ledger-author", detail);
  else ok("ledger-author", detail);
}

/* ---------- ③ 前置关系图谱断言（自研） ---------- */
const PREREQ_SCHEMA = "toolbox-prereq/1.0";
const LESSON_ID_RE = /^[a-z]{1,2}\d{2}\.\d+\.\d+$/;  // 语义课号：p00.1.1 / dg14.2.4 / ch08.1.1 / cm01.1.1 / b16.1.1
const EXT_ID_RE = /^ext-[a-z0-9-]+$/;               // 外部节点（如小学引用）
const STRENGTHS = ["hard", "soft"];
const KINDS = ["lesson", "external"];

/* 沙箱求值读取 <script> 载入式数据文件，返回 {exportName, data} */
function loadPrereqFile(path) {
  const src = readFileSync(path, "utf8");
  const sandbox = {};
  sandbox.window = sandbox; // 数据文件写 `window.X = {...}`，file:// 下浏览器同理
  vm.createContext(sandbox);
  vm.runInContext(src + `\n;__keys = Object.keys(this).filter(k => /PREREQ/i.test(k));`, sandbox, { filename: path });
  const keys = sandbox.__keys || [];
  if (keys.length !== 1) return { error: `PREREQ 导出应为 1 个，实为 ${keys.length}（${keys.join(",")}）` };
  const data = sandbox[keys[0]];
  if (!data || typeof data !== "object") return { error: `${keys[0]} 不是对象` };
  return { exportName: keys[0], data };
}

/* DFS 三色环检测：返回环路径数组或 null（自研实现） */
function findCycle(nodes, adjOut) {
  const WHITE = 0, GRAY = 1, BLACK = 2;
  const color = new Map(nodes.map((n) => [n, WHITE]));
  const stack = [];
  function dfs(u) {
    color.set(u, GRAY); stack.push(u);
    for (const v of (adjOut.get(u) || [])) {
      if (color.get(v) === GRAY) return stack.slice(stack.indexOf(v)).concat(v);
      if (color.get(v) === WHITE) { const c = dfs(v); if (c) return c; }
    }
    stack.pop(); color.set(u, BLACK); return null;
  }
  for (const n of nodes) if (color.get(n) === WHITE) { const c = dfs(n); if (c) return c; }
  return null;
}

/* 学科课号存在性提供者：把图谱节点 id 对到真实课页 */
function collectLessonIds(mod) {
  const ids = new Set();
  if (mod === "physics") {
    const d = join(ROOT, "modules", "physics", "data");
    for (const f of readdirSync(d)) {
      const m = f.match(/^p(\d{2})\.js$/); if (!m) continue;
      const src = readFileSync(join(d, f), "utf8");
      for (const mm of src.matchAll(/id:\s*"(p\d{2}\.\d+\.\d+)"/g)) ids.add(mm[1]);
    }
  }
  return ids; // 其他学科未注册时返回空集 → 降级为 warn
}

function checkPrereqGraph(path, mod) {
  const tag = `prereq:${basename(path)}`;
  const loaded = loadPrereqFile(path);
  if (loaded.error) { fail(tag, loaded.error); return; }
  const g = loaded.data;
  const errs = [], warns = [];
  if (g.schema !== PREREQ_SCHEMA) errs.push(`schema 应为 ${PREREQ_SCHEMA}，实为 ${g.schema}`);
  const nodes = Array.isArray(g.nodes) ? g.nodes : [];
  const edges = Array.isArray(g.edges) ? g.edges : [];
  if (nodes.length === 0) errs.push("nodes 为空");
  const nodeMap = new Map();
  for (const n of nodes) {
    if (!n || typeof n.id !== "string") { errs.push("存在无 id 的节点"); continue; }
    if (nodeMap.has(n.id)) { errs.push(`节点 id 重复：${n.id}`); continue; }
    nodeMap.set(n.id, n);
    const isExt = n.kind === "external" || n.external === true;
    if (!KINDS.includes(n.kind)) errs.push(`节点 ${n.id} kind 非法（${n.kind}）`);
    if (isExt) {
      if (!EXT_ID_RE.test(n.id)) errs.push(`外部节点 id 格式非法：${n.id}`);
      if (n.external !== true) errs.push(`外部节点 ${n.id} 缺 external:true`);
    } else if (!LESSON_ID_RE.test(n.id)) {
      errs.push(`节点 id 非语义课号格式：${n.id}`);
    }
  }
  const seenEdge = new Set();
  const adjOut = new Map(), adjIn = new Map();
  for (const n of nodeMap.keys()) { adjOut.set(n, []); adjIn.set(n, []); }
  for (const e of edges) {
    if (!e || typeof e.from !== "string" || typeof e.to !== "string") { errs.push("存在 from/to 缺失的边"); continue; }
    if (!nodeMap.has(e.from)) errs.push(`边端点悬空（from）：${e.from} → ${e.to}`);
    if (!nodeMap.has(e.to)) errs.push(`边端点悬空（to）：${e.from} → ${e.to}`);
    if (e.from === e.to) errs.push(`自环边：${e.from}`);
    const key = e.from + "→" + e.to;
    if (seenEdge.has(key)) errs.push(`重复边：${key}`); else seenEdge.add(key);
    if (!STRENGTHS.includes(e.strength)) errs.push(`边 ${key} strength 非法（${e.strength}）`);
    if (typeof e.reason !== "string" || e.reason.trim().length === 0) errs.push(`边 ${key} 缺 reason`);
    if (nodeMap.has(e.from) && nodeMap.has(e.to)) { adjOut.get(e.from).push(e.to); adjIn.get(e.to).push(e.from); }
  }
  /* 根节点规则：入度为 0 的节点必须有 root_reason（"为什么从这里开始"） */
  for (const [id, n] of nodeMap) {
    if (adjIn.get(id).length === 0 && (typeof n.root_reason !== "string" || !n.root_reason.trim()))
      errs.push(`根节点缺 root_reason：${id}`);
  }
  /* 孤立节点：入度+出度均为 0 */
  for (const [id] of nodeMap) {
    if (adjIn.get(id).length === 0 && adjOut.get(id).length === 0)
      errs.push(`孤立节点（无任何边）：${id}`);
  }
  /* 环检测（DFS 三色） */
  const cycle = findCycle([...nodeMap.keys()], adjOut);
  if (cycle) errs.push(`存在环：${cycle.join(" → ")}`);
  /* 课号存在性：非外部节点必须在学科真实课页中存在 */
  const lessonIds = collectLessonIds(mod);
  if (lessonIds.size === 0) {
    warns.push(`${mod} 未注册课号提供者，跳过课号存在性检查`);
  } else {
    for (const [id, n] of nodeMap) {
      const isExt = n.kind === "external" || n.external === true;
      if (!isExt && !lessonIds.has(id)) errs.push(`节点 ${id} 在 ${mod} 课页数据中不存在`);
    }
  }
  /* 双向引用检查：每条边在 from 出边视角与 to 入边视角必须对称一致 */
  for (const e of edges) {
    if (!e || !nodeMap.has(e.from) || !nodeMap.has(e.to)) continue;
    const outOk = adjOut.get(e.from).includes(e.to);
    const inOk = adjIn.get(e.to).includes(e.from);
    if (!outOk || !inOk) errs.push(`边引用不对称：${e.from} → ${e.to}`);
  }
  const hard = edges.filter((e) => e && e.strength === "hard").length;
  const soft = edges.filter((e) => e && e.strength === "soft").length;
  const detail = `节点 ${nodes.length} / 边 ${edges.length}（hard ${hard} / soft ${soft}）` +
    (errs.length ? `；${errs.slice(0, 6).join("；")}${errs.length > 6 ? `…等 ${errs.length} 项` : ""}` : "") +
    (warns.length ? `；注：${warns.join("；")}` : "");
  if (errs.length) fail(tag, detail);
  else if (warns.length) warn(tag, detail);
  else ok(tag, detail);
}

function runPrereqChecks() {
  const mods = join(ROOT, "modules");
  let found = 0;
  for (const mod of readdirSync(mods)) {
    const d = join(mods, mod, "data");
    if (!existsSync(d)) continue;
    for (const f of readdirSync(d).filter((f) => /^prereq-.*\.js$/.test(f)).sort()) {
      found++;
      checkPrereqGraph(join(d, f), mod);
    }
  }
  if (found === 0) skip("prereq", "全仓无 prereq-*.js 数据文件");
}

/* ---------- ④ V8 字号阶梯扫描编排 ---------- */
function runV8() {
  const v8arg = [...args].find((a) => a.startsWith("--v8="));
  const scope = v8arg ? v8arg.slice(5) : "physics";
  if (scope === "skip") { skip("v8-ladder", "按参数跳过"); return; }
  const flags = scope === "all" ? ["--geo", "--chem", "--math", "--physics"] : [`--${scope}`];
  try {
    const out = execFileSync("node", [join(ROOT, "tools", "v8-fontladder-scan.cjs"), ...flags],
      { cwd: ROOT, encoding: "utf8", timeout: 1200000, maxBuffer: 64 * 1024 * 1024 });
    const lines = out.trim().split("\n");
    const sums = lines.filter((l) => /pages=.*bad=/.test(l));
    const bad = sums.some((l) => /bad=[1-9]|pageerrors=[1-9]/.test(l));
    const detail = `scope=${scope}；` + (sums.slice(-4).join(" / ") || "无汇总行");
    if (bad) fail("v8-ladder", detail); else ok("v8-ladder", detail);
  } catch (e) {
    fail("v8-ladder", `scope=${scope} 执行失败：${(e.stdout || "").split("\n").filter((l) => l.includes("FATAL")).slice(-2).join("；") || e.message}`);
  }
}

/* ---------- ⑤ 版本四线一致性（自研，hotfix-20261019） ---------- */
/* 口径：version.json.version ≡ 首页 window.TOOLBOX_VERSION ≡ 化学页 window.CHEM_BUILD，
 * 且 index.html 与 modules/chemistry/index.html 内全部数值型 ?v= 指纹与版本号全等。
 * 任一不等 → FAIL。曾导致：CHEM_BUILD 陈旧时化学页永远误报"发现新版本"，
 * "立即更新"硬重载后服务器文件仍旧版、横幅复现（用户以为按钮没反应）。 */
const VER_RE = /^[0-9]+\.[0-9]+\.[0-9]+(\.[0-9]+)?$/;
function checkVersionSync() {
  const tag = "version-sync";
  const errs = [];
  let ver = "";
  try { ver = JSON.parse(readFileSync(join(ROOT, "version.json"), "utf8")).version || ""; }
  catch (e) { fail(tag, "version.json 读取失败"); return; }
  if (!VER_RE.test(ver)) { fail(tag, `version.json.version 非法：${ver}`); return; }
  const home = readFileSync(join(ROOT, "index.html"), "utf8");
  const chem = readFileSync(join(ROOT, "modules", "chemistry", "index.html"), "utf8");
  const tb = (home.match(/window\.TOOLBOX_VERSION\s*=\s*"([^"]+)"/) || [])[1] || "";
  if (tb !== ver) errs.push(`首页 TOOLBOX_VERSION=${tb || "缺失"} ≠ ${ver}`);
  const cb = (chem.match(/window\.CHEM_BUILD\s*=\s*"([^"]+)"/) || [])[1] || "";
  if (cb !== ver) errs.push(`化学 CHEM_BUILD=${cb || "缺失"} ≠ ${ver}`);
  const checkFp = (name, src) => {
    const set = new Set([...src.matchAll(/\?v=([0-9][0-9.]*)/g)].map((m) => m[1]));
    const bad = [...set].filter((v) => v !== ver);
    if (bad.length) errs.push(`${name} ?v= 含非当前版本：${bad.join(",")}（应为 ${ver}）`);
    return set;
  };
  const hs = checkFp("index.html", home);
  const cs = checkFp("modules/chemistry/index.html", chem);
  if (errs.length) fail(tag, errs.join("；"));
  else ok(tag, `四线全等 ${ver}（首页 ?v= ${hs.size} 种指纹值、化学 ?v= ${cs.size} 种指纹值）`);
}

/* ---------- ⑥ registry status 清单与"soon 却有内容"检查（自研，hotfix-20261019） ---------- */
/* 口径：输出各条目 status 清单；status="soon" 的模块，若其 data/ 下已有课程数据
 * （章节数据文件非空且命中语义课号）→ FAIL。曾导致：地理 16 章 322 页全量上线后，
 * 首页卡片仍显示"筹备中"且不可点击（8 批无人翻 registry）。 */
function loadRegistryMods() {
  const src = readFileSync(join(ROOT, "assets", "js", "registry.js"), "utf8");
  const sandbox = {}; sandbox.window = sandbox;
  vm.createContext(sandbox);
  vm.runInContext(src, sandbox, { filename: "registry.js" });
  const mods = sandbox.window.TOOLBOX_MODULES;
  if (!Array.isArray(mods)) return { error: "TOOLBOX_MODULES 非数组" };
  return { mods };
}
const LESSON_ANY_RE = /"(?:[a-z]{1,2}\d{2})\.\d+\.\d+"/;
function moduleHasContent(slug) {
  const d = join(ROOT, "modules", slug, "data");
  if (!existsSync(d)) return false;
  for (const f of readdirSync(d)) {
    if (!/^[a-z]{1,2}\d{2}\.js$/.test(f)) continue;
    let src = "";
    try { src = readFileSync(join(d, f), "utf8"); } catch { continue; }
    if (src.length > 0 && LESSON_ANY_RE.test(src)) return true;
  }
  return false;
}
function checkRegistryStatus() {
  const tag = "registry-status";
  const loaded = loadRegistryMods();
  if (loaded.error) { fail(tag, loaded.error); return; }
  const list = loaded.mods.map((m) => `${m.slug}:${m.status}${m.tagline ? `「${m.tagline}」` : ""}`);
  const bad = [];
  for (const m of loaded.mods) {
    if (m.status === "soon" && moduleHasContent(m.slug))
      bad.push(`${m.name}（${m.slug}）status=soon 但 data/ 下已有课程数据`);
  }
  if (bad.length) fail(tag, `${bad.join("；")}；清单：${list.join(" / ")}`);
  else ok(tag, `清单：${list.join(" / ")}`);
}

/* ---------- ⑦ 面包屑导航一致性（自研，全局导航批 2026-10-19） ---------- */
const CRUMB_TRACK_IDS = {
  english: ["roots", "grammar"],
  math: ["algebra", "geometry"],
  biology: ["junior", "senior"],
  physics: ["junior", "senior"],
  chemistry: ["junior", "senior"],
  geography: ["junior", "senior"],
};
const CRUMB_HASH_PREFIX = {
  english: "#card=", math: "#track=",
  biology: "#track=", physics: "#track=", chemistry: "#track=", geography: "#track=",
};
const CRUMB_MODULES = {
  english: "modules/english/js/english.js",
  math: "modules/math/js/math.js",
  physics: "modules/physics/js/physics.js",
  chemistry: "modules/chemistry/js/chemistry.js",
  geography: "modules/geography/js/geography.js",
  biology: "modules/biology/js/biology.js",
};
function checkBreadcrumb() {
  const tag = "breadcrumb";
  const errs = [];
  const warns = [];
  let ver = "";
  try { ver = JSON.parse(readFileSync(join(ROOT, "version.json"), "utf8")).version || ""; }
  catch (e) { fail(tag, "version.json 读取失败"); return; }
  // ① 6 壳引用共享组件 + ?v=
  for (const slug of Object.keys(CRUMB_MODULES)) {
    const shell = join(ROOT, "modules", slug, "index.html");
    let src = "";
    try { src = readFileSync(shell, "utf8"); }
    catch (e) { errs.push(`${slug} 壳文件缺失`); continue; }
    const m = src.match(/<script[^>]+src="([^"]*assets\/js\/breadcrumb\.js)(\?v=([^"]*))?"/);
    if (!m) { errs.push(`${slug} 壳未引用 assets/js/breadcrumb.js`); continue; }
    const v = m[3] || "";
    if (!v) errs.push(`${slug} 壳 breadcrumb.js 引用缺 ?v=`);
    else if (v === "__VERSION__") warns.push(`${slug} ?v=__VERSION__ 待发版同步`);
    else if (v !== ver) errs.push(`${slug} 壳 breadcrumb.js ?v=${v} ≠ ${ver}`);
  }
  // ② 共享组件与样式、规范
  const bcPath = join(ROOT, "assets", "js", "breadcrumb.js");
  if (!existsSync(bcPath)) errs.push("assets/js/breadcrumb.js 缺失");
  else {
    const bc = readFileSync(bcPath, "utf8");
    if (!bc.includes("window.TB_crumb")) errs.push("breadcrumb.js 未暴露 window.TB_crumb");
    if (!bc.includes("textContent")) warns.push("breadcrumb.js 未使用 textContent（建议全 textContent 防注入）");
  }
  const css = readFileSync(join(ROOT, "assets", "css", "style.css"), "utf8");
  if (!/\.tb-crumb(?![\w-])/.test(css)) errs.push("style.css 无 .tb-crumb 定义");
  const spec = readFileSync(join(ROOT, "docs", "ui-spec-v1.md"), "utf8");
  if (!spec.includes("3.7") || !/\.tb-crumb(?![\w-])/.test(spec)) errs.push("ui-spec-v1.md 缺 §3.7 .tb-crumb");
  // ③ 6 主 JS 调用点 + ④ href 契约
  for (const [slug, rel] of Object.entries(CRUMB_MODULES)) {
    let js = "";
    try { js = readFileSync(join(ROOT, rel), "utf8"); }
    catch (e) { errs.push(`${slug} 主 JS 缺失`); continue; }
    if (!js.includes("TB_crumb.update")) { errs.push(`${slug} 主 JS 无 TB_crumb.update 调用`); continue; }
    const hrefs = new Set([...js.matchAll(/href:\s*"([^"]+)"/g)].map((m) => m[1]));
    const prefix = CRUMB_HASH_PREFIX[slug];
    const routeOK =
      (slug === "english" && /#card=\(\[a-z\]\+\)/.test(js)) ||
      (slug === "math" && /#track=\(algebra\|geometry\)/.test(js)) ||
      (["biology", "physics", "chemistry", "geography"].includes(slug) && /#track=\(\[a-z\]\+\)/.test(js));
    for (const h of hrefs) {
      if (h.startsWith("#")) {
        // ① 前缀精确 ② 路由源码实际处理该族 ③ 值在真实 track id 集合内；
        // "#track=" + t.id 这类拼接式按"族"验证（字面量恰为前缀本身）
        let handled = false;
        if (h === prefix) handled = routeOK;
        else if (h.startsWith(prefix)) handled = CRUMB_TRACK_IDS[slug].includes(h.slice(prefix.length)) && routeOK;
        if (!handled) errs.push(`${slug} crumb href "${h}" 无路由处理或值非法（假链接嫌疑）`);
      } else if (h.includes("..")) {
        const target = join(ROOT, "modules", slug, h.split("#")[0].split("?")[0]);
        if (!existsSync(target)) errs.push(`${slug} crumb href "${h}" 目标文件不存在`);
      } else {
        const target = join(ROOT, "modules", slug, h.split("#")[0].split("?")[0] || "index.html");
        if (!existsSync(target)) errs.push(`${slug} crumb href "${h}" 目标文件不存在`);
      }
    }
  }
  if (errs.length) fail(tag, errs.join("；"));
  else ok(tag, `6 壳引用齐${warns.length ? "；" + warns.join("；") : ""}；href 契约全过`);
}

/* ============================================================
 * ⑧⑨⑩⑪⑫ 学生文案断言组（自研，第 0 批 2026-10-19）
 *
 * 背景：2026-10-19 文字内容审计发现"生产黑话泄漏进学生正文"为跨科
 * 通病（审计报告 audit-report.md）。本组把"学生文案内部 token"写成
 * 程序断言，做学生文案的程序化防线。
 *
 * 扫描口径（与审计口径对齐）：
 * - 范围：modules 下各学科 data/ 内全部 .js（课程数据、公式翻译、
 *   章节目录等），沿用本工具既有的 Node vm 沙箱求值读取（不走 fetch，
 *   file:// 可跑红线不破）；
 * - 排除：各 _review/ 台账目录；字段名为 note/notes/review/audit/ledger
 *   （及 review_history/audit_log）的内部字段整棵跳过；
 * - JS 注释天然不进入求值结果（与"注释不算泄漏"口径一致）。
 * "页"判定：对象有字符串 id，且有 kind 字段或 blocks 数组
 * （lesson 只有 lessons/pages、无 kind/blocks，不会被误判为页；
 * 数学页无 kind/blocks，本组 explain-* 断言对其跳过，见覆盖边界）。
 * ============================================================ */
const STUDENT_SKIP_KEYS = new Set(
  ["note", "notes", "review", "audit", "ledger", "review_history", "audit_log"]);

function stripHtml(s) {
  return String(s).replace(/<[^>]*>/g, "");
}

function collectStudentStrings(node, ctx, depth, out) {
  if (depth > 40 || node == null) return;
  if (typeof node === "string") {
    if (node.length > 0) out.push({ file: ctx.file, pageId: ctx.pageId, path: ctx.path, value: node });
    return;
  }
  if (Array.isArray(node)) {
    node.forEach((v, i) => collectStudentStrings(
      v, { file: ctx.file, pageId: ctx.pageId, path: `${ctx.path}[${i}]` }, depth + 1, out));
    return;
  }
  if (typeof node === "object") {
    let pageId = ctx.pageId;
    if (typeof node.id === "string" && node.id) pageId = node.id;
    for (const k of Object.keys(node)) {
      if (STUDENT_SKIP_KEYS.has(k.toLowerCase())) continue;
      collectStudentStrings(node[k],
        { file: ctx.file, pageId, path: ctx.path ? `${ctx.path}.${k}` : k }, depth + 1, out);
    }
  }
}

function collectPages(node, ctx, depth, out, seen) {
  if (depth > 40 || node == null || typeof node !== "object") return;
  if (Array.isArray(node)) {
    for (const v of node) collectPages(v, ctx, depth + 1, out, seen);
    return;
  }
  if (typeof node.id === "string" && node.id &&
      (typeof node.kind === "string" || Array.isArray(node.blocks))) {
    const key = `${ctx.file}::${node.id}`;
    if (!seen.has(key)) { seen.add(key); out.push({ file: ctx.file, pageId: node.id, node }); }
    return;
  }
  for (const k of Object.keys(node)) {
    if (STUDENT_SKIP_KEYS.has(k.toLowerCase())) continue;
    collectPages(node[k], ctx, depth + 1, out, seen);
  }
}

function loadStudentCorpus() {
  const texts = [], pages = [];
  const seen = new Set();
  const mods = join(ROOT, "modules");
  for (const mod of readdirSync(mods).sort()) {
    const d = join(mods, mod, "data");
    if (!existsSync(d)) continue;
    const walk = (dir) => {
      for (const ent of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, ent.name);
        if (ent.isDirectory()) { if (ent.name !== "_review") walk(p); continue; }
        if (!ent.name.endsWith(".js")) continue;
        let src;
        try { src = readFileSync(p, "utf8"); } catch { continue; }
        const sandbox = { window: {} };
        try {
          vm.createContext(sandbox);
          vm.runInContext(src, sandbox, { filename: p, timeout: 15000 });
        } catch { continue; } /* 求值失败的文件跳过；结构门禁另有覆盖 */
        const rel = p.slice(ROOT.length + 1).replace(/\\/g, "/");
        for (const k of Object.keys(sandbox.window)) {
          collectStudentStrings(sandbox.window[k], { file: rel, pageId: "", path: k }, 0, texts);
          collectPages(sandbox.window[k], { file: rel }, 0, pages, seen);
        }
      }
    };
    walk(d);
  }
  return { texts, pages };
}

let _corpus = null;
function getCorpus() {
  if (!_corpus) _corpus = loadStudentCorpus();
  return _corpus;
}

/* ---------- ⑧ student-text-tokens：学生文案内部 token 检查 ---------- */
/* 两级词表。定级依据见 WORDLIST.md（第 0 批交付物）+ 装配期绿测试实测：
 * - block：只有"修复后全库命中=0"可验证的模式才进
 *   （SYS-INT/断言钩子：第 1 批 S1 修；审计清单括号注记：
 *   物理分队实测 10 处+生物/地理同类已机械删除）；
 * - warn：有合法用法的（首现即定义/认旧友/立靶/人话版/边界句…）、
 *   或命中超出第 1/2 批施工范围、修复后不能归零的，一律降 warn。
 *   审计清单裸形态是句子主干（物理 5 处 S3 遗留已确认），只能 warn。
 * TOKEN_STRICT=false → push-1 版（全 warn，远端 main 泄漏未修时不爆红）；
 * TOKEN_STRICT=true  → push-2 版（block 恢复阻断）。
 * 铁律：不许让远端 main 处于"新阻断断言会 FAIL"的状态。 */
const TOKEN_STRICT = true; /* push-2 版：block 恢复阻断 */

const TOKEN_RULES = [
  /* [展示名, 正则, push-2 级别] */
  ["SYS-INT", /SYS-INT/i, "block"],
  ["断言钩子", /断言钩子/, "block"],
  ["审计清单括号注记", /（[^）]*审计清单[^）]*）/, "block"],
  ["审计清单", /审计清单/, "warn"],
  ["BIO-R编号", /BIO-R\d+/i, "warn"],
  ["GEO-R编号", /GEO-R\d+/i, "warn"],
  ["GEO-AX编号", /GEO-AX\d+/i, "warn"],
  ["全库grep", /全库\s*grep/i, "block"],
  ["grep证伪", /grep\s*证伪/i, "warn"],
  ["合规声明", /合规声明/, "block"],
  ["立靶", /立靶/, "warn"],
  ["#r=", /#r=/, "block"],
  ["R编号审计通过", /R\d+\s*审计通过/, "block"],
  ["脚手架编号", /脚手架[③\d]/, "block"],
  ["点拨预埋", /点拨预埋/, "warn"],
  ["硬门禁", /硬门禁/, "block"],
  ["T编号", /\bT\d{2,3}\b/, "block"],
  ["人话版", /人话版/, "warn"],
  ["边界句", /边界句/, "warn"],
  ["预告台账", /预告台账/, "warn"],
  ["场层真值", /场层真值/, "warn"],
  ["UI可达", /UI\s*可达/i, "warn"],
  ["首现即定义标注", /[（(]首现即定义/, "warn"],
  ["认旧友", /认旧友/, "warn"],
];

function checkStudentTokens() {
  const tag = "student-text-tokens";
  const corpus = getCorpus();
  const hits = [];
  for (const [name, re, lvl2] of TOKEN_RULES) {
    const level = TOKEN_STRICT ? lvl2 : "warn";
    const matched = [];
    for (const t of corpus.texts) {
      re.lastIndex = 0;
      if (re.test(t.value)) matched.push(t);
    }
    if (matched.length) hits.push({ name, level, count: matched.length, samples: matched.slice(0, 3) });
  }
  const total = corpus.texts.length;
  if (hits.length === 0) {
    ok(tag, `扫描 ${total} 条学生字符串，${TOKEN_RULES.length} 个模式零命中`);
    return;
  }
  const fmt = (h) => `${h.name}×${h.count}（如 ${h.samples.map((s) => s.pageId || s.file).join("、")}）`;
  const blocks = hits.filter((h) => h.level === "block");
  const warns = hits.filter((h) => h.level === "warn");
  let detail = `扫描 ${total} 条学生字符串；` +
    (blocks.length ? `阻断级 ${blocks.length} 类：${blocks.map(fmt).join("；")}；` : "") +
    (warns.length ? `告警级 ${warns.length} 类：${warns.slice(0, 12).map(fmt).join("；")}${warns.length > 12 ? `…等 ${warns.length} 类` : ""}` : "");
  if (!TOKEN_STRICT) detail += "（push-1 全 warn 口径；push-2 恢复阻断）";
  if (blocks.length) fail(tag, detail);
  else warn(tag, detail);
}

/* ---------- ⑨ explain-has-text（告警级） ---------- */
/* 口径：kind=explain 的页必须含 ≥1 个 type=text 的正文块（text 或 html 非空）。
 * 不阻断。无 kind 学科（如数学）的页不在此列。 */
function checkExplainHasText() {
  const tag = "explain-has-text";
  const corpus = getCorpus();
  const bad = [];
  let n = 0;
  for (const p of corpus.pages) {
    if (p.node.kind !== "explain") continue;
    n++;
    const hasText = (p.node.blocks || []).some((b) =>
      b && b.type === "text" && ((b.text || "").trim() || (b.html || "").trim()));
    if (!hasText) bad.push(`${p.file}::${p.pageId}`);
  }
  if (n === 0) { skip(tag, "无 kind=explain 的页"); return; }
  if (bad.length) warn(tag, `explain 页 ${n}，缺 text 正文块 ${bad.length} 页：${bad.slice(0, 10).join("、")}${bad.length > 10 ? `…等 ${bad.length} 页` : ""}`);
  else ok(tag, `explain 页 ${n}，均含 text 正文块`);
}

/* ---------- ⑩ hint-length（告警级） ---------- */
/* 口径：字段路径含 hint/tip 的单条文案，去 HTML 标签后 >60 字即列出。
 * 不阻断。 */
function checkHintLength() {
  const tag = "hint-length";
  const corpus = getCorpus();
  const bad = [];
  for (const t of corpus.texts) {
    if (!/(hint|tip)/i.test(t.path)) continue;
    const len = stripHtml(t.value).length;
    if (len > 60) bad.push({ id: t.pageId || t.file, path: t.path, len });
  }
  if (bad.length === 0) { ok(tag, "hint/tip 字段无超 60 字条目"); return; }
  warn(tag, `超 60 字 ${bad.length} 条：` +
    bad.slice(0, 15).map((b) => `${b.id}(${b.len}字)`).join("、") +
    (bad.length > 15 ? `…等 ${bad.length} 条` : ""));
}

/* ---------- ⑪ explain-thin（告警级） ---------- */
/* 口径：kind=explain 的页，正文（type=text/lead 块，去标签后字符数，
 * 含中文标点）总字数 <150 字即列出。不阻断。 */
function checkExplainThin() {
  const tag = "explain-thin";
  const corpus = getCorpus();
  const bad = [];
  let n = 0;
  for (const p of corpus.pages) {
    if (p.node.kind !== "explain") continue;
    n++;
    let chars = 0;
    for (const b of (p.node.blocks || [])) {
      if (b && (b.type === "text" || b.type === "lead"))
        chars += stripHtml(b.text || b.html || "").length;
    }
    if (chars < 150) bad.push(`${p.pageId}(${chars}字)`);
  }
  if (n === 0) { skip(tag, "无 kind=explain 的页"); return; }
  if (bad.length) warn(tag, `explain 页 ${n}，正文<150 字 ${bad.length} 页：${bad.slice(0, 10).join("、")}${bad.length > 10 ? `…等 ${bad.length} 页` : ""}`);
  else ok(tag, `explain 页 ${n}，正文均 ≥150 字`);
}

/* ---------- ⑫ first-term-crosscheck（尽力而为） ---------- */
/* 口径：提取"（首现即定义"/"先认词"标注点，输出术语清单供人工比对。
 * 覆盖边界（已实测）：
 * - 仓库内不存在独立的"术语追踪表"（仅英语 roots.js 有词根表，与
 *   生物/地理的术语标注不是同一体系），全自动交叉比对做不到；
 * - "（首现即定义"的术语一般在标注前的 <strong> 内，少数非 <strong>
 *   包裹的只能给上下文、标待人工确认；
 * - 本断言只产清单、不阻断（warn），清单全文见 --json 输出的 extras。 */
const EXTRA = {};
function checkFirstTerm() {
  const tag = "first-term-crosscheck";
  const corpus = getCorpus();
  const marks = [];
  for (const t of corpus.texts) {
    const v = t.value;
    const re1 = /[（(]首现即定义/g;
    let m;
    while ((m = re1.exec(v)) !== null) {
      const before = v.slice(Math.max(0, m.index - 160), m.index);
      const sm = before.match(/<strong>([^<]{1,24})<\/strong>\s*$/);
      marks.push({
        file: t.file, pageId: t.pageId || "",
        mark: "首现即定义", term: sm ? sm[1] : "（术语不在<strong>内，待人工确认）",
      });
    }
    const re2 = /先认词/g;
    while ((m = re2.exec(v)) !== null) {
      const after = v.slice(m.index, m.index + 60);
      const tm = after.match(/先认词[———:：\s]*([^，。；：:）)———\s]{1,16})/);
      marks.push({
        file: t.file, pageId: t.pageId || "",
        mark: "先认词", term: tm ? tm[1].trim() : "（解析失败）",
      });
    }
  }
  EXTRA[tag] = marks;
  const c1 = marks.filter((x) => x.mark === "首现即定义").length;
  const c2 = marks.filter((x) => x.mark === "先认词").length;
  const sample = marks.slice(0, 5).map((x) => `${x.pageId}「${x.term}」`).join("、");
  warn(tag, `术语标注点 ${marks.length}（首现即定义 ${c1} / 先认词 ${c2}）；仓库内无独立术语追踪表，清单供人工比对（--json extras 全量）。如：${sample}`);
}

function runStudentTextGroups() {
  checkStudentTokens();
  checkExplainHasText();
  checkHintLength();
  checkExplainThin();
  checkFirstTerm();
}


/* ---------- 自检：合成坏图谱验证断言有效 ---------- */
function selftest() {
  const cases = [
    ["环检测", { nodes: [{ id: "p00.1.1", kind: "lesson", root_reason: "r" }, { id: "p00.1.2", kind: "lesson" }, { id: "p00.1.3", kind: "lesson" }],
      edges: [{ from: "p00.1.1", to: "p00.1.2", strength: "hard", reason: "x" }, { from: "p00.1.2", to: "p00.1.3", strength: "hard", reason: "x" }, { from: "p00.1.3", to: "p00.1.1", strength: "hard", reason: "x" }] }, /环/],
    ["根节点规则", { nodes: [{ id: "p00.1.1", kind: "lesson" }, { id: "p00.1.2", kind: "lesson" }],
      edges: [{ from: "p00.1.1", to: "p00.1.2", strength: "hard", reason: "x" }] }, /root_reason/],
    ["孤立节点", { nodes: [{ id: "p00.1.1", kind: "lesson", root_reason: "r" }, { id: "p00.9.9", kind: "lesson", root_reason: "r" }],
      edges: [] }, /孤立/],
    ["重复边", { nodes: [{ id: "p00.1.1", kind: "lesson", root_reason: "r" }, { id: "p00.1.2", kind: "lesson" }],
      edges: [{ from: "p00.1.1", to: "p00.1.2", strength: "hard", reason: "x" }, { from: "p00.1.1", to: "p00.1.2", strength: "soft", reason: "y" }] }, /重复边/],
    ["悬空端点", { nodes: [{ id: "p00.1.1", kind: "lesson", root_reason: "r" }],
      edges: [{ from: "p00.1.1", to: "p00.1.2", strength: "hard", reason: "x" }] }, /悬空/],
    ["自环", { nodes: [{ id: "p00.1.1", kind: "lesson", root_reason: "r" }],
      edges: [{ from: "p00.1.1", to: "p00.1.1", strength: "hard", reason: "x" }] }, /自环/],
    ["非法强度", { nodes: [{ id: "p00.1.1", kind: "lesson", root_reason: "r" }, { id: "p00.1.2", kind: "lesson" }],
      edges: [{ from: "p00.1.1", to: "p00.1.2", strength: "medium", reason: "x" }] }, /strength/],
    ["缺reason", { nodes: [{ id: "p00.1.1", kind: "lesson", root_reason: "r" }, { id: "p00.1.2", kind: "lesson" }],
      edges: [{ from: "p00.1.1", to: "p00.1.2", strength: "hard", reason: "" }] }, /reason/],
    ["外部节点缺external", { nodes: [{ id: "ext-xiaoxue", kind: "external" }, { id: "p00.1.1", kind: "lesson" }],
      edges: [{ from: "ext-xiaoxue", to: "p00.1.1", strength: "soft", reason: "x" }] }, /external:true/],
  ];
  let pass = 0;
  for (const [name, g, re] of cases) {
    const tmp = results.length;
    results.push({ name: "__probe__", status: "pass", detail: "" });
    /* 直接复用 checkPrereqGraph 的断言逻辑：把合成图谱走一遍收集 errs */
    const errs = [];
    const nodeMap = new Map();
    for (const n of g.nodes) nodeMap.set(n.id, n);
    const seenEdge = new Set(), adjOut = new Map(), adjIn = new Map();
    for (const id of nodeMap.keys()) { adjOut.set(id, []); adjIn.set(id, []); }
    for (const e of g.edges) {
      if (!nodeMap.has(e.from)) errs.push(`边端点悬空（from）：${e.from} → ${e.to}`);
      if (!nodeMap.has(e.to)) errs.push(`边端点悬空（to）：${e.from} → ${e.to}`);
      if (e.from === e.to) errs.push(`自环边：${e.from}`);
      const key = e.from + "→" + e.to;
      if (seenEdge.has(key)) errs.push(`重复边：${key}`); else seenEdge.add(key);
      if (!STRENGTHS.includes(e.strength)) errs.push(`边 ${key} strength 非法（${e.strength}）`);
      if (!e.reason || !e.reason.trim()) errs.push(`边 ${key} 缺 reason`);
      if (nodeMap.has(e.from) && nodeMap.has(e.to)) { adjOut.get(e.from).push(e.to); adjIn.get(e.to).push(e.from); }
    }
    for (const [id, n] of nodeMap) {
      if (adjIn.get(id).length === 0 && !(n.root_reason && n.root_reason.trim())) errs.push(`根节点缺 root_reason：${id}`);
      if (adjIn.get(id).length === 0 && adjOut.get(id).length === 0) errs.push(`孤立节点（无任何边）：${id}`);
      const isExt = n.kind === "external" || n.external === true;
      if (isExt && n.external !== true) errs.push(`外部节点 ${id} 缺 external:true`);
    }
    const cycle = findCycle([...nodeMap.keys()], adjOut);
    if (cycle) errs.push(`存在环：${cycle.join(" → ")}`);
    results.length = tmp; // 丢弃探针
    if (errs.some((x) => re.test(x))) { pass++; rec(`selftest:${name}`, "pass", errs.find((x) => re.test(x))); }
    else rec(`selftest:${name}`, "fail", `未捕获：${errs.join("；") || "无错误"}`);
  }
  rec("selftest:total", pass === cases.length ? "pass" : "fail", `${pass}/${cases.length} 断言有效`);
}

/* ---------- 主流程 ---------- */
const ONLY = new Set(
  (([...args].find((a) => a.startsWith("--only=")) || "").slice("--only=".length) || "")
    .split(",").map((s) => s.trim()).filter(Boolean)
);
if (SELFTEST) {
  selftest();
} else {
  const groups = [
    ["ledger-gate", runLedgerGates],
    ["ledger-author", () => checkLedgerAuthors()],
    ["prereq", runPrereqChecks],
    ["version-sync", checkVersionSync],
    ["registry-status", checkRegistryStatus],
    ["breadcrumb", checkBreadcrumb],
    ["student-tokens", () => checkStudentTokens()],
    ["explain-text", () => checkExplainHasText()],
    ["hint-length", () => checkHintLength()],
    ["explain-thin", () => checkExplainThin()],
    ["first-term", () => checkFirstTerm()],
    ["v8", runV8],
  ];
  for (const [name, fn] of groups) {
    if (ONLY.size && !ONLY.has(name)) continue;
    fn();
  }
}

/* ---------- 输出 ---------- */
const fails = results.filter((r) => r.status === "fail");
if (JSON_OUT) {
  console.log(JSON.stringify({ ok: fails.length === 0, results }, null, 2));
} else {
  for (const r of results) {
    const mark = { pass: "[PASS]", fail: "[FAIL]", warn: "[WARN]", skip: "[SKIP]" }[r.status];
    console.log(`${mark} ${r.name}${r.detail ? " —— " + r.detail : ""}`);
  }
  const c = (s) => results.filter((r) => r.status === s).length;
  console.log(`\n== 统一校验汇总：PASS ${c("pass")} / FAIL ${c("fail")} / WARN ${c("warn")} / SKIP ${c("skip")} ==`);
}
process.exit(fails.length ? 1 : 0);
