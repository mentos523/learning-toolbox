# 数学重构 · 多课壳（Batch 0 泛化，试点壳的后继）

> 性质：**加法 only**。本目录将原样推送到分支 `refactor/math` 的
> `modules/math/refactor/` 目录；不改动 `modules/math/js`、`css`、`data`
> 或任何共享文件，不改动 `modules/math/index.html`，不合并、不推送 main。
> 本批只搭建、不推送（推送由协调者统一做）；不做教学内容改写。
> 试点（单课壳，`window.PILOT_BUNDLE`＋`bundle/content.bundle.js`）
> 已被本多课壳取代：课 bundle 改为 `window.MATH_BUNDLES['<课>']`，
> 旧单课产物名不再产出，转换器重跑时会清理旧产物（含 legacy 名）。

## 1. 已迁移范围（Batch 0 结束时）

- 章：代数第零章《导论——从算术到代数》（`ch00`）
  - 单元“代数是什么”→《从猜数字到天平》（`ch00-u1-l1`，4 页，试点原样迁移，
    页对象与试点 bundle 逐页深比对一致）
  - 单元“本章习题”→《第零章习题》（`ch00-ux-l1`，1 页：`ch00-ux-l1-p1`
    《第零章习题：猜数字与天平》，主交互 `placeholder-morph`）
- 合计：2 课 5 页。未列出的课不在本壳内。

## 2. 目录结构

```
refactor/                      ← 本目录原样推送后的位置
├── index.html                 Vue 壳入口（file:// 入口，相对路径引用全部资源）
├── app.js                     Vue 应用：三级 hash 路由、卡片导航、挂载分支渲染器
├── app.css                    壳与卡片样式（只写 chrome，不覆盖 .m-* 字号与尺寸；
│                              例外：试点修复的 .m-nav button 与 .pilot-head-btn
│                              min-height:44px，分支 math.css 本身不动）
├── vendor/vue.global.prod.js  Vue 3.4.38 全局构建（vendoring，见 VENDOR.md）
├── content/meta.json          章→单元→课结构事实源（章/单元/课标题与归属；
│                              页标题仍以各页 md 为准）
├── content/<课>/*.md          每页一个 md：作者事实源（格式见 §3）
├── tools/convert.mjs          Node 转换器（构建期）：md＋meta → bundle＋manifest
├── tools/vendor/marked.umd.js marked 12.0.0（仅构建期使用，不进运行时）
├── bundle/<课>.bundle.js      转换器产物（运行时按需 <script> 引入）
├── bundle/<课>.freshness.json 转换器产物：每页 md 的 sha256＋bundle 哈希＋生成时间
├── bundle/manifest.json       转换器产物：章→单元→课→页（JSON 版，供核对）
├── bundle/manifest.bundle.js  转换器产物：与 manifest.json 同源的 <script> 版
│                              （file:// 下壳不能 fetch JSON，故以 script 引入；
│                              内容与 manifest.json 一致，仅 generatedAt 随生成时间变）
├── README.md                  本文件
├── VENDOR.md                  Vue / marked 来源与许可证登记
└── VERSION.md                 分支本地标记（元数据，不参与渲染）
```

## 3. md 格式（作者事实源，一种定法，试点原样沿用）

每页一个 md 文件，文件名 = 页 id（如 `ch00-ux-l1-p1.md`）：

- **frontmatter**（`---` 包围）：每行 `key: JSON值`，必填
  `id/title/concept/prev/next`（`prev/next` 无页时写 `null`）。
  用“JSON值”而不用裸 YAML，是因为标题含 `=` 与双引号，裸 YAML 易解析走样；
  转换器按首个 `: ` 切分后 `JSON.parse`。
- **正文**：`## 讲解` 下的段落 = 讲解 prose。**定法：讲解段落与
  `data.hints` 逐字逐条一致**，转换器断言二者相等，不一致即 FAIL。
- **结构化字段（同文件承载，缺失即转换器 FAIL）**：
  - ```` ```interaction ````：主交互对象（`type/params/engine` 原样；无 engine
    字段的页（如习题页 `placeholder-morph`）按远端原样不补 engine）。
  - ```` ```auxInteraction ````：辅交互对象，或 `null`（无辅交互时必须
    显式写 `null`，不许省略围栏后由转换器默认补）。
  - ```` ```formulas ````：公式数组，每条 `{id, latex, translation}`。
  - ```` ```data ````：`{ hints, examples }`。
- **课内页序与跨课链**：转换器按 `prev/next` 链排序。课起点是
  `prev === null` 或 `prev` 指向课外页的页（跨课链的课首，如习题课首页
  `prev` 指向上课末页），恰为 1 页；链尾 `next` 为 `null` 或课外页时结束；
  每步断言后一页的 `prev` 指回前一页（双向一致）。成环、孤页、断链、
  双向不一致均为 FAIL。转换器先全量解析断言、通过后才写盘，
  任一课 FAIL 时不留半成品 bundle。

## 4. 壳用法（路由与跨课导航规则）

- 路由三级：`#/` 数学总览（章列表→单元→课列表）；
  `#/l/<课>` 课总览（页列表）；`#/p/<页>` 卡片页（课由 manifest 反查）。
- 课 bundle 按需加载：进入卡片页时 app.js 以 `<script>` 注入
  `bundle/<课>.bundle.js`（file:// 安全，不用 fetch）；总览与课总览
  只读 manifest，不预载课 bundle。注入失败时卡片留可见错误，不白屏、
  不静默回总览。
- **跨课导航规则（本批核心口径，试点“课外页禁用”的泛化）**：
  卡片内上一页/下一页走页字段 `prev/next`——课内相邻页优先；
  课界处若 `prev/next` 指向已迁移的课内/跨课页则直接跳该页
  （Batch 0 实证：`ch00-u1-l1-p2b` 的下一页 `ch00-ux-l1-p1` 现在可跳，
  反向 `ch00-ux-l1-p1` 的上一页回 `ch00-u1-l1-p2b`）；
  若指向未迁移课的页则按钮禁用并文字注明（“尚未迁移进本壳”），
  绝不链向不存在的页。`next === null` 的链尾页注记“无下一页”。
- 总览与课总览的按钮/链接一律 ≥44px（实测：数学总览课链接
  49.19px、课总览页链接 50px、翻页按钮与顶栏按钮 44px，
  1366 与 390 视口均通过）。
- 卡片可见结构与旧站渲染器一致：标题 / 公式（MathML 查表，
  缺失降级 translation）/ 主交互 / 辅交互 / 点拨（首条加 💡）/
  习题页核对答案（concept === “本章习题”时，hints 区加 `exercise` 类，
  每条 example 一个 `<details class="m-answers">`，summary 取 figure 字段，
  与分支 `math.js` 的 renderPageInner 同款；非习题页 examples 不渲染可见区，
  字段仍在 bundle 中供保真对照）。

## 5. 如何 file:// 打开（自测）

**不要直接双击本目录的 `index.html`**：它的相对路径是按分支位置
（`modules/math/refactor/index.html`）写的，在工作区原位置打不开
分支 js/css。正确做法是打开 mirror 布局里的同一文件：

```
~/workspace/math-refactor-expansion/mirror/modules/math/refactor/index.html
```

mirror 布局按分支相对布局组装（`mirror/modules/math/js|css|data`、
`mirror/assets/css`、以及 `mirror/modules/math/refactor/` ← 本目录的复制，
其中 js/css/data 均取自远端分支 `refactor/math` 当轮 API 回读），
只用于本地测试，**不推送**。打开后：

- `#/` 为数学总览（章→课）；`#/l/<课>` 为课总览；`#/p/<页>` 直达某页；
- 上一页/下一页、页指示器、键盘左右键、触摸左右滑（位移 ≥60px 且
  横向主导）均可翻页；跨课页按 §4 规则跳转或禁用注明。

## 6. 如何重跑转换器

```sh
cd refactor/   # 本目录（或 shell/ 工作区副本）
node tools/convert.mjs
# 输出：每课 OK＋页序＋manifest OK；产物写 bundle/<课>.bundle.js、
# bundle/<课>.freshness.json、bundle/manifest.json、bundle/manifest.bundle.js
```

- 转换器幂等：重跑后各课 `.bundle.js` 字节一致；`freshness.json` 与
  `manifest*.json/js` 仅 `generatedAt` 变化（各页 sha256 与 `bundleSha256` 不变）。
- 改了 md 或 meta.json 必须重跑转换器再打开页面，否则页面仍是旧 bundle——
  对照时以各课 `freshness.json` 的 sha256 与 md 现状核对。
- 静态自检：`node --check tools/convert.mjs app.js`（bundle 由转换器生成，
  同样可用 `node --check` 校验）。
- 新增一课的步骤：① 在 `content/meta.json` 的正确章/单元下登记课
  （id/title）；② 在 `content/<课>/` 下按 §3 写每页 md；③ 重跑转换器；
  ④ 按 §5 做 mirror 双路径自测（直载＋总览进入）与保真对照。

## 7. 与旧版对照方法

1. 旧版事实源：远端分支 `refactor/math` 的 `modules/math/data/*.js`
   （本批为 `ch00.js`；本地取数副本见批次工作区 `work/ch00.remote.js`，
   由当轮 `gh api` 回读，非本地旧文件）。
2. 三方对账：远端旧数据 → md 源 → bundle，逐页逐字段比对
   `id/title/concept/formulas（latex＋translation 逐字）/interaction
   （type＋params 全量＋engine 声明）/auxInteraction/hints/examples/prev/next`。
   对账脚本与结论见批次报告 `batches/batch0/fidelity-ch00-ux-l1.md`。
3. 渲染对照：mirror 入口与旧站同课页面并排打开，核对标题、公式、
   交互行为、点拨文字；差异只允许出现在壳 chrome（顶栏/总览/导航皮），
   页内容不许有差异。

## 8. 接入缝（位置、假设、缺口，试点原样沿用）

**缝的位置**（`index.html` 内联脚本 + `app.js`）：

1. **交互注册表捕获**：`index.html` 在加载分支交互文件之前，先立一个
   与旧站同接口的 `window.MATH_INTERACTIONS`（`register/types`），
   注册时把原函数记入 `window.PILOT_IX`（名称沿用试点，widget 覆盖
   验证即读此表），`app.js` 挂载时直接调用该原函数。
   交互实现本身零复制、零改写。分支交互文件内有一处动态注册
   （`interactions.js` 的 `ixRegister(type, fn)` 变量形式转发），
   因此覆盖验证必须以浏览器实测注册表为准，不许只 grep 下结论。
2. **公式查表**：`app.js` 的 `formulaHtmlList` 沿用旧渲染器
   `formulaHtml` 的查表契约——`window.MATH_MML[pageId#fId]` 且
   `window.MathMLCheck.supported` 时用 MathML，否则用 `translation`
   纯文本（`.formula-fallback`）。
3. **样式复用**：卡片直接用分支 `math.css` 的
   `.m-page/.m-title/.m-formulas/.m-interaction/.m-hints/.m-nav` 类；
   `app.css` 只写壳 chrome，不覆盖任何 `.m-*` 字号与尺寸声明，
   例外见 §2（试点修复的按钮 min-height，分支 css 本身不动）。
4. **点拨与溢出**：点拨首条加 💡、交互区超高加 `.overflows` 区内滚动，
   均与旧渲染器可见行为一致；键盘导航在焦点位于表单控件时不劫持
   方向键（旧站是全局劫持，此处为壳 chrome 的有意微差，不影响内容）。

**为什么没走“先置 `window.MATH_CH` 再走渲染器页面流程”**（试点实测结论，
本批沿用，不擅动）：旧站 `modules/math/js/math.js` 的 `renderPageInner`、
`renderPage`、`openLesson` 全部是 IIFE 内私有函数，外部无法调用；
`window.MATH_INTERACTIONS` 只有 `register/types`，没有 getter；
`math.js` 的 SPA init 会接管 hash，与 Vue 路由冲突。
因此本壳**不加载 `math.js` 的 SPA init**（该文件本身未被改动、未被复制；
分支上的旧站入口继续用它，不受影响）。上游若希望后续批次“真正复用
math.js 页面流程”，需要在 math.js 侧导出一个公开入口——那是协调者决策
的改动项，不在本批“不改共享文件”的授权内，本批不擅动。

**假设清单**：① 分支交互文件只依赖 `MATH_INTERACTIONS.register`、
`MathExpr`、`MathMLCheck` 三个全局（已按其文件头核对）；
② `ch00.formulas.js` 的 MathML 查表键为 `pageId#fId`（与旧渲染器一致）；
③ bundle 页序 = `prev/next` 链序（转换器断言）；
④ 异步注入的课 bundle 不是 Vue 响应式源：`app.js` 以 `bundleTick`
计数翻转使计算属性失效重算，否则加载完成仍缓存为 null（本批实测
钉死的点，已修复，见批次 mirror 记录）。

## 9. 已验证的 27 类 widget 清单（浏览器实测注册表，Batch 0）

验证方法：Playwright 自带 Chrome 153 加载 mirror 壳＋分支 js 原文件，
读 `window.PILOT_IX` 逐类核对（脚本与原始数据见批次报告
`batches/batch0/widget-coverage.md`）。结论：**27 类全部注册，无阻塞项**。

| # | 类型 | # | 类型 | # | 类型 |
|---|---|---|---|---|---|
| 1 | angle-protractor | 10 | linked-dashboard | 19 | slider-lab |
| 2 | balance-drag | 11 | morph-toggle | 20 | slow-replay |
| 3 | compare-toggle | 12 | numeric-lab | 21 | static-compare |
| 4 | complete-square-lab | 13 | placeholder-morph | 22 | step-play |
| 5 | construction-step | 14 | plot-points | 23 | subdivision |
| 6 | cut-reassemble | 15 | proof-replay | 24 | sys-lab |
| 7 | eq-graph-lab | 16 | pythag-grow | 25 | sys-steps |
| 8 | ineq-shade-lab | 17 | shape-area | 26 | tap-highlight |
| 9 | ladder-slide | 18 | side-compare | 27 | zoomer |

附注（非阻塞）：实测注册表共 31 项，除上述 27 类外另有 3 项——
`eq-graph`（辅交互数轴预设，非页主交互类型）、`net-fold`、
`ratio-slider`（分支 `interactions.js` 内已注册，但不在本批 27 类
census 清单内）。三者均为“清单外已注册”，不是缺失；不写新实现、
不复制旧代码，交协调者决定是否扩 census 清单。

## 10. 已知限制（沿用试点口径，白队 QA／复验请重点核）

- **滑动手势已实现**（触摸横向位移 ≥60px 翻页），但未在真机 390px
  上实测——390px 真机手势复核是跨学科存量缺口，本批同样待真机核。
- **直载 vibrate console error**（试点已知 WARN-1，源头共享 hapticTick，
  修复前已存在）：本批 mirror 实测中直载起手的序列出现 1 条同款 error
  （`Blocked call to navigator.vibrate because user hasn't tapped…`），
  总览进入序列 0 条；单列已知 WARN，不阻塞；共享文件侧清理另立批次。
- **FAIL-1 豁免沿用**：SVG 天平拖拽物尺寸问题（试点书面豁免）未在本批
  改动，仍挂账为共享代码清理候选批次；本批不改共享 `interactions.js`。
- **试点课仍在其中正常工作**：`ch00-u1-l1` 4 页页对象与试点 bundle
  逐页深比对一致；mirror 实测 p2b 卡片 MathML 正常、交互 SVG 正常。
- **视频**：本批无视频；音频：本批不涉及。均按任务书口径。
