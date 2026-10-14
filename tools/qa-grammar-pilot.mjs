#!/usr/bin/env node
// 白队静态 QA：语法试点页（gr05.1.1）门禁前置检查
// 无 headless 浏览器时做静态断言；真机三视口复核仍需人工/设备。
// 用法：仓库根目录 `node tools/qa-grammar-pilot.mjs`
import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const css = readFileSync(join(ROOT, "modules/english/css/grammar.css"), "utf8");
const eng = readFileSync(join(ROOT, "modules/english/js/grammar.js"), "utf8");
const dat = readFileSync(join(ROOT, "modules/english/data/gr05.js"), "utf8");
const html = readFileSync(join(ROOT, "modules/english/index.html"), "utf8");
const ledger = JSON.parse(readFileSync(join(ROOT, "modules/english/data/_review/ledger-gr05.json"), "utf8"));

let fails = 0;
const ok = (m) => console.log("  [OK] " + m);
const fail = (m) => { console.log("  [FAIL] " + m); fails++; };

// W-G1/W-G10/W-G11：触控目标 ≥44px
for (const sel of [".g-tag", ".g-subj", ".g-chunk", ".g-q-opts button", ".g-q-check",
                   ".g-speak", ".g-guess-opts button", ".g-back", ".g-pager button",
                   '.g-q input[type="text"]']) {
  const re = new RegExp(sel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&") + "\\s*\\{[^}]*min-(?:width|height):\\s*44px", "s");
  re.test(css) ? ok(`触控 ${sel} ≥44px`) : fail(`触控 ${sel} 未见 min 44px 声明`);
}

// params 不出现具体色值（只用 role 语义名）
const colorRe = /params:\s*\{[^}]*#[0-9a-fA-F]{3,6}/s;
!colorRe.test(dat) ? ok("数据 params 无硬编码色值") : fail("数据 params 出现色值");

// 例句 id 引用一致性：讲解页 ids 数组引用的 id 必须在 sentences 索引与台账中存在且终审通过
const defined = [...dat.matchAll(/^\s*"(gr05\.1\.1-e\d+)":\s*\{/gm)].map(m => m[1]);
const finalIds = new Set(ledger.entries.filter(e => e.status === "final_passed").map(e => e.id));
const usedInPages = [...new Set([...dat.matchAll(/ids:\s*\[([^\]]*)\]/g)]
  .flatMap(m => [...m[1].matchAll(/gr05\.1\.1-e\d+/g)].map(x => x[0])))];
let refOk = true;
for (const id of usedInPages) {
  if (!defined.includes(id)) { fail(`页面引用例句 ${id} 在 sentences 索引中缺失`); refOk = false; }
  if (!finalIds.has(id)) { fail(`页面引用例句 ${id} 未终审通过`); refOk = false; }
}
if (refOk) ok(`例句引用一致（${usedInPages.length} 处引用，全部已终审）`);

// 每条规则 ≥3 条正例（课程行：三单 -s / do→does（含 does 还原）/ have→has）
const rules = {};
for (const e of ledger.entries) {
  if (e.lesson !== "gr05.1.1" || !e.rule.includes("正例")) continue;
  const k = e.rule.includes("三单现") ? "三单现 -s" : /do→does|does/.test(e.rule) ? "do→does（含还原）" : "have→has";
  rules[k] = (rules[k] || 0) + 1;
}
for (const [k, n] of Object.entries(rules)) n >= 3 ? ok(`规则「${k}」正例 ${n} 条 ≥3`) : fail(`规则「${k}」正例仅 ${n} 条`);

// 讲解页 ≤300 字（中文字符计数，英文单词折半）
const explainBlock = dat.match(/kind:\s*"explain"[\s\S]*?pointScroll/);
if (explainBlock) {
  const zh = (explainBlock[0].match(/[\u4e00-\u9fa5]/g) || []).length;
  const en = (explainBlock[0].match(/[A-Za-z]+/g) || []).length;
  const total = zh + Math.round(en / 2);
  total <= 300 ? ok(`讲解页约 ${total} 字 ≤300`) : fail(`讲解页约 ${total} 字超 300`);
} else fail("未找到讲解页");

// 交互页 ≤150 字
const interBlock = dat.match(/kind:\s*"interact"[\s\S]*?point:\s*"([^"]+)"/);
if (interBlock) {
  const zh = (interBlock[0].match(/[\u4e00-\u9fa5]/g) || []).length;
  zh <= 150 ? ok(`交互页约 ${zh} 中文字 ≤150`) : fail(`交互页约 ${zh} 中文字超 150`);
}

// 双编码：✗/✓ 必须配文字（G8/W-G4）
(/✗ 错句/.test(eng) && /✓ 对句/.test(eng)) ? ok("对拍组件 ✗/✓ 配文字") : fail("对拍组件缺文字标签");
(/<span class="ok">✓/.test(eng) && /<span class="bad">✗/.test(eng)) ? ok("判分反馈 ✓/✗ 配文字") : fail("判分反馈缺文字");

// 深色模式：--eng-* 有 dark 覆盖
(/body\[data-theme="dark"\]\s*#grammar-app/.test(css) && (css.match(/--eng-/g) || []).length >= 20)
  ? ok("深色模式 --eng-* 覆盖完整") : fail("深色模式覆盖不完整");

// 路由：测试路由存在；公开展示路径不受影响
(/test=\(\[a-z0-9.\]\+\)/.test(readFileSync(join(ROOT, "modules/english/js/english.js"), "utf8")))
  ? ok("测试路由 #card=grammar&test=<课号> 已接入") : fail("测试路由缺失");
(html.includes('id="grammar-app"') && html.includes("js/grammar.js") && html.includes("data/gr05.js") && html.includes("css/grammar.css"))
  ? ok("index.html 接线完整（css/js/data/容器）") : fail("index.html 接线缺失");
// 命名空间隔离：grammar.js 不引用 MATH_/ROOTS_DATA（注释除外）
const engCode = eng.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/.*$/gm, "");
(!/MATH_|ROOTS_DATA|STANDALONE_DICT|WORD_PHON/.test(engCode))
  ? ok("grammar.js 无数学/讲词根交叉引用") : fail("grammar.js 出现跨命名空间引用");
// 旧深链 #r= 逻辑保留
(/match\(\/#r=\(\[a-z\]\+\)\/\)/.test(readFileSync(join(ROOT, "modules/english/js/english.js"), "utf8")))
  ? ok("旧深链 #r= 逻辑保留") : fail("旧深链逻辑疑似被改");

// Y3 归一化比对存在
(/function norm\(s\)/.test(eng) && /toLowerCase\(\).replace\(/.test(eng))
  ? ok("Y3 填空归一化比对（大小写不敏感/空格容忍）") : fail("Y3 归一化缺失");
// Y2 降级：不支持时隐藏
(/if \(!speakOK\) return null/.test(eng))
  ? ok("Y2 降级：speechSynthesis 不可用时隐藏按钮") : fail("Y2 降级缺失");

console.log(fails === 0 ? "\n[PASS] 语法试点静态 QA 全部通过" : `\n[FAIL] ${fails} 项未通过`);
process.exit(fails === 0 ? 0 : 1);
