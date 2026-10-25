# 数学重构试点 · 从猜数字到天平（ch00-u1-l1，4 页）

> 试点性质：**加法 only**。本目录将原样推送到分支 `refactor/math` 的
> `modules/math/refactor/` 目录；不改动 `modules/math/js`、`css`、`data`
> 或任何共享文件，不改动 `modules/math/index.html`，不合并、不推送 main。
> 试点入口是独立应用壳，与旧站并存、互不干扰。

## 1. 试点单元与页清单

- 课：代数第零章《导论——从算术到代数》→ 单元“代数是什么”→
  《从猜数字到天平》（`ch00-u1-l1`）。
- 4 页（页级卡，卡＝页）：
  1. `ch00-u1-l1-p1`《我想了一个数，加 5 得 12，它是几？》（概念：未知数；主交互 `eq-graph-lab`）
  2. `ch00-u1-l1-p1b`《x+5=12：一步步算出 x》（概念：讲解：解 x+5=12；主交互 `balance-drag`，辅交互 `eq-graph`）
  3. `ch00-u1-l1-p2`《= 是"两边一样重"，不是"得出答案"》（概念：等式；主交互 `balance-drag`，辅交互 `eq-graph`）
  4. `ch00-u1-l1-p2b`《天平解方程：两边同减 3》（概念：讲解：等式性质解方程；主交互 `eq-graph-lab`）
- 页字段与远端 `ch00.js` 逐字一致，见 `~/workspace/math-refactor/evidence/fidelity-ch00-u1-l1.md`
  （保真对照表；试点交付时该证据文件随包附在工作区，不进分支）。

## 2. 目录结构

```
refactor/                      ← 本目录（pilot/）原样推送后的位置
├── index.html                 Vue 壳入口（file:// 入口，相对路径引用全部资源）
├── app.js                     Vue 应用：hash 路由、卡片导航、挂载分支渲染器
├── app.css                    壳与卡片样式（只写 chrome，不覆盖 .m-* 字号与尺寸）
├── vendor/vue.global.prod.js  Vue 3.4.38 全局构建（vendoring，见 VENDOR.md）
├── content/ch00-u1-l1/*.md    每页一个 md：作者事实源（格式见 §3）
├── tools/convert.mjs          Node 转换器（构建期）：md → bundle
├── tools/vendor/marked.umd.js marked 12.0.0（仅构建期使用，不进运行时）
├── bundle/content.bundle.js   转换器产物（运行时直接 <script> 引入）
├── bundle/freshness.json      转换器产物：每页 md 的 sha256 + 生成时间
├── README.md                  本文件
└── VENDOR.md                  Vue / marked 来源与许可证登记
```

## 3. md 格式（作者事实源，一种定法）

每页一个 md 文件，文件名 = 页 id（如 `ch00-u1-l1-p1.md`）：

- **frontmatter**（`---` 包围）：每行 `key: JSON值`，必填
  `id/title/concept/prev/next`（`prev/next` 无页时写 `null`）。
  用“JSON值”而不用裸 YAML，是因为标题含 `=` 与双引号（如 p2 标题），
  裸 YAML 易解析走样；转换器按首个 `: ` 切分后 `JSON.parse`。
- **正文**：`## 讲解` 下的段落 = 讲解 prose。**定法：讲解段落与
  `data.hints` 逐字逐条一致**，转换器断言二者相等，不一致即 FAIL。
  这样专家只写一处文本，机器字段与可读文档不可能悄悄分叉。
- **结构化字段（同文件承载，缺失即转换器 FAIL）**：
  - ```` ```interaction ````：主交互对象（`type/params/engine` 原样）。
  - ```` ```auxInteraction ````：辅交互对象，或 `null`（无辅交互时必须
    显式写 `null`，不许省略围栏后由转换器默认补）。
  - ```` ```formulas ````：公式数组，每条 `{id, latex, translation}`。
  - ```` ```data ````：`{ hints, examples }`。
- 课内页序不由文件名决定：转换器按 `prev/next` 链排序（从
  `prev === null` 的页起跟 `next` 走）；链尾 `next` 可指向课外页。

## 4. 如何 file:// 打开（自测）

**不要直接双击本目录的 `index.html`**：它的相对路径是按分支位置
（`modules/math/refactor/index.html`）写的，在 `pilot/` 原位置打不开
分支 js/css。正确做法是打开 mirror 布局里的同一文件：

```
~/workspace/math-refactor/mirror/modules/math/refactor/index.html
```

mirror 布局按分支相对布局组装（`mirror/modules/math/js|css|data`、
`mirror/assets/css`、以及 `mirror/modules/math/refactor/` ← 本目录的复制），
只用于本地测试，**不推送**。打开后：

- `#/` 为课总览（4 张卡）；`#/p/<pageId>` 直达某页；
- 上一页/下一页、页指示器、键盘左右键、触摸左右滑（位移 ≥60px 且
  横向主导）均可翻页；末页“下一页”禁用，并注明下一站是课外章习题页。

## 5. 如何重跑转换器

```sh
cd pilot/
node tools/convert.mjs
# 输出：OK + 页序；产物写 bundle/content.bundle.js 与 bundle/freshness.json
```

- 转换器幂等：重跑后 `content.bundle.js` 字节一致；`freshness.json`
  仅 `generatedAt` 变化（各页 sha256 与 `bundleSha256` 不变）。
- 改了 md 必须重跑转换器再打开页面，否则页面仍是旧 bundle——
  这正是可行性分析 §2 要求的“产物新鲜度”试点口径：
  对照时以 `freshness.json` 的 sha256 与 md 现状核对。
- 静态自检：`node --check tools/convert.mjs app.js`（bundle 由转换器生成，
  同样可用 `node --check` 校验）。

## 6. 与旧版对照方法

1. 旧版事实源：远端分支 `refactor/math` 的 `modules/math/data/ch00.js`
   中 `ch00-u1-l1` 的 4 页（本地基线副本见工作区 `baseline/ch00.remote.js`）。
2. 三方对账：远端旧数据 → md 源 → bundle，逐页逐字段比对
   `id/title/concept/formulas（latex＋translation 逐字）/interaction
   （type＋params 全量＋engine 声明）/auxInteraction/hints/examples/prev/next`。
   对账脚本与结论见工作区 `evidence/fidelity-ch00-u1-l1.md`。
3. 渲染对照：mirror 入口与旧站同课页面并排打开，核对标题、公式、
   交互行为（滑块找解、天平拖拽）、点拨文字；差异只允许出现在壳
   chrome（顶栏/总览/导航皮），页内容不许有差异。

## 7. 接入缝（位置、假设、缺口）

**缝的位置**（`index.html` 内联脚本 + `app.js`）：

1. **交互注册表捕获**：`index.html` 在加载分支交互文件之前，先立一个
   与旧站同接口的 `window.MATH_INTERACTIONS`（`register/types`），
   注册时把原函数记入 `window.PILOT_IX`，`app.js` 挂载时直接调用
   该原函数（`eq-graph-lab` 来自 `js/eq-bind.js`，`balance-drag` 来自
   `js/interactions.js`，`eq-graph` 来自 `js/eq-bind.js` 的 numberline 预设）。
   交互实现本身零复制、零改写。
2. **公式查表**：`app.js` 的 `formulaHtmlList` 沿用旧渲染器
   `formulaHtml` 的查表契约——`window.MATH_MML[pageId#fId]` 且
   `window.MathMLCheck.supported` 时用 MathML，否则用 `translation`
   纯文本（`.formula-fallback`）。
3. **样式复用**：卡片直接用分支 `math.css` 的
   `.m-page/.m-title/.m-formulas/.m-interaction/.m-hints/.m-nav` 类；
   `app.css` 只写壳 chrome，不覆盖任何 `.m-*` 字号与尺寸声明，
   一屏约束与 V8 字号阶梯由分支样式本身保证。
4. **点拨与溢出**：点拨首条加 💡、交互区超高加 `.overflows` 区内滚动，
   均与旧渲染器可见行为一致；键盘导航在焦点位于表单控件时不劫持
   方向键（旧站是全局劫持，此处为壳 chrome 的有意微差，不影响内容）。

**为什么没走“先置 `window.MATH_CH` 再走渲染器页面流程”**（已实测源码，
不是猜测；结论供协调者裁处，不由试点擅自改）：

- 旧站 `modules/math/js/math.js` 的 `renderPageInner`、`renderPage`、
  `openLesson` 全部是 IIFE 内私有函数，外部无法调用；
  `window.MATH_INTERACTIONS` 只有 `register/types`，没有 getter，
  注册进去的函数取不出来（`math.js` 约 143–146 行，`interactions.js`
  约 4806–4811 行的同源内表同样私有）。
- `math.js` 的 `init` 是 SPA 级的：无 `#p=` hash 时走 `showTracks()`，
  其中 `history.replaceState` 会清空 Vue 的 `#/p/...` 路由；
  有 `#p=` hash 时则按整章展平渲染，与试点“只含 4 页”的 bundle 冲突。
- 因此试点**不加载 `math.js` 的 SPA init**（该文件本身未被改动、
  未被复制；分支上的旧站入口继续用它，不受影响）。
  上游若希望后续批次“真正复用 math.js 页面流程”，需要在 math.js
  侧导出一个公开入口（如 `openLesson` 或渲染器 getter）——那是
  协调者决策的改动项，不在本试点“不改共享文件”的授权内，试点不擅动。

**假设清单**：① 分支交互文件只依赖 `MATH_INTERACTIONS.register`、
`MathExpr`、`MathMLCheck` 三个全局（已按其文件头核对）；
② `ch00.formulas.js` 的 MathML 查表键为 `pageId#fId`（与旧渲染器一致）；
③ bundle 页序 = `prev/next` 链序（转换器断言）。

## 8. 自测已修复项与已知限制（白队 QA 请重点核）

- **已修复（自测捕获）**：固定 footer（`.tb-footer-fixed`，约 57px 高）
  曾遮挡卡片翻页按钮、拦截点击；壳在 `#pilot-app` 预留 64px 底边距
  后重测通过。旧站课页视图是靠 CSS `:has` 隐藏该 footer，试点壳
  选择保留 footer 可见＋预留空间，不动分支样式。

## 9. 已知限制（白队 QA 请重点核）

- **滑动手势已实现**（触摸横向位移 ≥60px 翻页），但未在真机 390px
  上实测——390px 真机手势复核是跨学科存量缺口，本试点同样待真机核。
- **p2b 的 `next` 指向课外页**（`ch00-ux-l1-p1` 章习题页）：试点内
  无此页，卡片末页禁用“下一页”并文字注明；字段本身未改写。
- **examples 不在卡片可见区渲染**：与旧渲染器一致（仅习题页渲染
  examples 折叠区）；本课 4 页均非习题页，字段仅在 bundle 中供对照。
- **课总览的课名是壳 chrome 文案**（`app.js` 内 `LESSON_TITLE`），
  不属于页字段；课名事实源仍是远端 `ch00.js` 的 lesson 对象。
  后续多课推广时，课名应移入 bundle 的 lesson 元数据（转换器扩展项）。
- **深色模式**与旧站同款（跟随系统 `prefers-color-scheme`，无按钮）。
- **视频**：试点无视频；音频：试点不涉及。均按任务书口径（外链/不涉及）。
