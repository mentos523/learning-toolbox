# 学习工具箱 · UI 统一规范 v1

> 状态：v1.0 已批准生效（总负责 2026-10-18）。v1.1 修订：新增 §3.7 `.tb-crumb`
> 面包屑导航（全局导航批 2026-10-19，用户亲批），旧节一字未动。
> 决策依据：`~/workspace/ceo-team/ui-unification-plan.md`（CEO 队 2026-10-18 决策文件）
> 生效范围：首页 + 六模块（数学 / 英语 / 物理 / 化学 / 地理 / 生物）**入口层**
> （课页内部教学组件、引擎层样式不在本规范范围内，红线见 §8）

---

## 一、设计原则（总纲）

1. **只增不删**：所有新 token、新组件类都是"增量"；任何既有变量、类名、DOM 结构、
   JS 钩子一律原样保留（旧类进入"冻结"状态，不再新增引用，自然淘汰）。
2. **相对路径、零外部请求**：logo、favicon 全部走本地相对路径；file:// 可跑。
3. **深色主题机制不动**：`document.body[data-theme]` + 跟随系统 `prefers-color-scheme`
   不变；新增 token 必须提供 `body[data-theme="dark"]` 下的配对值。
4. **交互逻辑不动**：抽屉/目录/导航只换皮（抽屉头部、关闭按钮、遮罩），行为代码不动。
5. **中文第一**：所有文案中文；组件语义以中文注释说明。

---

## 二、语义 token（只增不删，全部落在共享 `assets/css/style.css`）

### 2.1 现有 token（冻结，严禁修改/删除）

`:root` 现有 8 个：`--bg / --ink / --ink-soft / --card-bg / --radius / --shadow / --shadow-hover`。
以及 `--card-color`（各模块入口卡片按学科主题色覆盖，作为局部变量使用）。
**一律不动。**

### 2.2 新增品牌色阶（品牌蓝取自 forum logo 源图主色）

logo 源图（`ceo-team/ui-audit/forum-logo-source.png`，60×60）中心像素取样
RGB(56,159,254) ≈ `#3899ff`，以此为基准色：

| token | 值（light） | 值（dark） | 用途 |
|---|---|---|---|
| `--brand-50` | `#eef6ff` | `#12263a` | 浅色浅面 |
| `--brand-100` | `#d9ebff` | `#1b3a5c` | 浅色悬停面 |
| `--brand-500` | `#3899ff` | `#5aa8ff` | 品牌基准色（=logo 蓝） |
| `--brand-600` | `#1f7fe6` | `#7ab8ff` | 主按钮背景（白字 ≥4.5:1 对比） |
| `--brand-700` | `#1668c4` | `#9ccbff` | 主按钮 hover/激活 |

### 2.3 新增语义 token

| token | 值（light） | 值（dark） | 用途 |
|---|---|---|---|
| `--btn-primary-bg` | `var(--brand-600)` | `var(--brand-600)` | 主按钮（进入学习/确定）背景 |
| `--btn-primary-ink` | `#ffffff` | `#0b1622` | 主按钮文字色（dark 下为深字以保对比） |
| `--btn-secondary-border` | `var(--brand-500)` | `var(--brand-500)` | 次按钮描边色 |
| `--btn-secondary-ink` | `var(--brand-700)` | `var(--brand-500)` | 次按钮文字色 |
| `--card-border` | `#e7e0cf` | `#3a3730` | 入口卡片描边（白卡风收敛用） |
| `--topbar-bg` | `#ffffff` | `#1f1c17` | 品牌顶栏背景 |
| `--footer-border` | `#e5dcc8` | `#3a3730` | 页脚分隔线 |

### 2.4 补全悬空变量（曾在 `:root` 未定义而被引用的）

现状（实测）：`.version-note` 用到 `var(--accent-soft)` / `var(--accent)`
（style.css 第 217–218 行，无回退）；`.update-btn` 用到 `var(--line, #e5e0d5)`
（第 238 行，有回退但值仍应显式定义）。补全如下，**不改变现有回退行为**：

| token | 值（light） | 值（dark） | 说明 |
|---|---|---|---|
| `--accent` | `#b45309` | `#d6a05a` | 与现有 `.badge-soon` 色系一致的强调色 |
| `--accent-soft` | `#fef3c7` | `#3a2f18` | 强调浅底 |
| `--line` | `#e5e0d5` | `#3a3730` | 与 `.update-btn` 现有回退值一致 |

> 冻结说明：补全的是"定义缺口"，不改动任何已有引用点的渲染语义
> （`--line` 的值与原回退值相同，视觉无变化）。

### 2.5 dark 配对机制

所有新增 token 必须在 `body[data-theme="dark"]` 下给出配对值（见上表 dark 列），
由蓝队在共享 css 中统一定义。模块自有 `--xxx-*` 前缀变量保持隔离，不强制迁移。

---

## 三、组件类（只增不删旧类）

全部新增类以 `tb-` 前缀命名，落在共享 `assets/css/style.css`。
旧类（`.card-btn`、`.back-link`、`.topbar`、`phy-back`、`chm-*`、`bio-*`、
`geog-*`、`m-*`、`e-*` 等）**一律保留原样**，进入冻结状态（§7.2）。

### 3.1 `.tb-brand-head`（品牌头插槽容器）

统一品牌头：logo + 「学习工具箱」+ 学科名。视觉：`--topbar-bg` 底、左对齐、
粘性顶栏（`position: sticky`）。结构固定为：

```html
<!-- TB:brand-head -->
<div class="tb-brand-head">
  <img class="tb-brand-logo" src="../../assets/img/logo-64.png" width="32" height="32" alt="学习工具箱">
  <span class="tb-brand-name">学习工具箱</span>
  <span class="tb-brand-sep" aria-hidden="true">·</span>
  <span class="tb-brand-subject">数学</span>
</div>
<!-- /TB:brand-head -->
```

- `src` 路径按页面相对层级调整（模块 index.html 为 `../../assets/img/logo-64.png`，
  首页为 `assets/img/logo-64.png`）；显示 32px，用 64px 图做 2x 保证清晰度。
- `.tb-brand-name` 用 `--ink`；`.tb-brand-subject` 用 `--brand-600` 加粗。
- 地理现有 `geog-topbar` 保留（JS 渲染课页顶栏不动），入口浏览层叠加 `.tb-brand-head`。

### 3.2 `.tb-btn-primary` / `.tb-btn-secondary`（按钮）

- `.tb-btn-primary`：实心胶囊。`background: var(--btn-primary-bg); color: var(--btn-primary-ink);`
  `border-radius: 999px; padding: 10px 26px;` 最小触控高度 44px（沿用窄屏纪律）。
- `.tb-btn-secondary`：描边胶囊。`border: 1.5px solid var(--btn-secondary-border);`
  `color: var(--btn-secondary-ink); background: transparent;`
- 迁移目标：首页 `.card-btn`、英/数实心小胶囊、物/化/生描边胶囊统一语义
  （主=实心「进入学习→」，次=描边）。旧类名原样保留，不改动旧页引用。

### 3.3 `.tb-back`（返回控件）

统一返回控件样式：胶囊描边（英/数胶囊风收敛）。

```css
.tb-back {
  display: inline-flex; align-items: center; min-height: 44px;
  padding: 6px 18px; border-radius: 999px;
  border: 1.5px solid var(--btn-secondary-border);
  color: var(--btn-secondary-ink); text-decoration: none; background: transparent;
}
```

- 英/数原有胶囊返回 → 语义直接对齐 `.tb-back`。
- 物/化/生原有纯文本「← 返回」→ 换上 `.tb-back`（视觉变胶囊，行为/文案可保留「← 返回」字样）。
- 地理顶栏「☰ 目录」按钮不动（抽屉交互钩子）。

### 3.4 `.tb-card`（入口卡片）

统一入口卡片：白底（`--card-bg`）+ `--card-border` 1px 描边 + `--radius` 圆角 +
`--shadow` 阴影，保留学科主题色顶边（`border-top: 6px solid var(--card-color, …)`，
沿用现有 `.card` 的学科色机制）。

```css
.tb-card {
  background: var(--card-bg); border: 1px solid var(--card-border);
  border-radius: var(--radius); box-shadow: var(--shadow);
  border-top: 6px solid var(--card-color, var(--brand-500));
}
```

- 首页 `.card`（A 风：暖底彩色顶边）→ 叠加 `.tb-card` 语义。
- 物/化/生白卡风（灰线框）→ 直接对齐 `.tb-card`。

### 3.5 `.tb-progress`（进度条）

按数学范式落地「继续学习 / 已学进度」进度组件：

```css
.tb-progress { height: 8px; border-radius: 999px; background: var(--brand-100); overflow: hidden; }
.tb-progress > i { display: block; height: 100%; border-radius: 999px;
  background: linear-gradient(90deg, var(--brand-500), var(--brand-600)); }
```

- 条形容器 `.tb-progress`，内层 `<i style="width: x%">` 表进度。
- 数学现有进度实现保留（冻结），新页面按本类写；存量模块入口页的"继续学习"卡片迁移时换上。

### 3.6 `.tb-footer`（页脚）

```css
.tb-footer { text-align: center; color: var(--ink-soft); font-size: 0.85rem;
  padding: 18px; border-top: 1px solid var(--footer-border); }
```

内容：`学习工具箱 · <学科名> · 版本 <version>` + 已有页脚链接（如有）原样保留。

### 3.7 `.tb-crumb`（面包屑导航，全局导航批 2026-10-19 新增）

```html
<nav class="tb-crumb" aria-label="面包屑导航"><ol>
  <li><a href="../../index.html">学习工具箱</a></li>
  <li><a href="index.html">生物</a></li>
  <li><a href="#track=junior">初中生物</a></li>
  <li><span class="tb-crumb-text">b19 · 章名</span></li>
  <li><span aria-current="page">课名</span></li>
</ol></nav>
```

- 层级口径：`学习工具箱 / 学科 /（学段｜子卡｜板块）/ 章 / 课`，按模块实际结构裁剪；
  入口层名称照搬模块内真实名（初中物理/讲词根/代数…），章段文本与本模块章列表叫法一字不差。
- 每段（除当前页）可点直达真实目标；无真实目标的段渲染为 `span.tb-crumb-text`
  纯文本，**不许造假链接**；当前页为 `span[aria-current="page"]`，视觉彻底无按钮态。
- 组件：`assets/js/breadcrumb.js`（`window.TB_crumb.update(items)`），样式见
  `assets/css/style.css` §3.7；分隔符 `›` 纯 CSS 绘制；390px 允许换行+超长省略；
  触控命中区 ≥40px；深色主题配对。
- `.tb-back` 保留（单级返回仍有用），面包屑是新增层级导航，不替换旧控件。

---

## 四、logo 与 favicon 资源规格

| 文件 | 规格 | 用途 |
|---|---|---|
| `assets/img/logo-32.png` | 32×32 PNG（由 60×60 源图下采样） | favicon（六模块统一派生，见 4.2） |
| `assets/img/logo-48.png` | 48×48 PNG | 首页 hero，**替代 🧰 emoji** |
| `assets/img/logo-64.png` | 64×64 PNG | 模块品牌头，32px 显示用 2x 图 |

- 源图：`ceo-team/ui-audit/forum-logo-source.png`（60×60 蓝色圆角方块 + "EDU://" 白字，
  用户自有资产；**不入库源图本身**，只入库三张派生图）。
- 引用全部相对路径：首页 `assets/img/…`，模块页 `../../assets/img/…`。
- 零外部请求；深色模式下蓝色块深浅两色均可辨（验收实测项）。

### 4.2 favicon 统一

六模块现有内联 `data:image/svg+xml` 方块字 favicon（π/物/化/Aa/地/生，色块各异）
**原样保留**（冻结，不删除），迁移时统一替换为：

```html
<link rel="icon" href="../../assets/img/logo-32.png" type="image/png">
```

（首页为 `assets/img/logo-32.png`。）化学已有 `?v=` 缓存指纹惯例：
UI 批改动的共享资源引用统一加 `?v=<版号>` 指纹（见 §6）。

---

## 五、标题口径统一清单（六模块）

### 5.1 现状取证（2026-10-18 实测）

| 模块 | 页面主标题现状 | `<title>` 现状 |
|---|---|---|
| 首页 | `🧰 学习工具箱`（h1） | `学习工具箱` |
| 数学 | `数学 · {板块名}`（JS 动态，h1#m-title） | `数学 · 代数与几何 — 学习工具箱` |
| 英语 | `英语 · 选择子卡`（静态 h2.e-tracks-title） | `英语 · 讲词根 / 语法 — 学习工具箱` |
| 物理 | `物理`（JS，h1） | `物理 — 学习工具箱` |
| 化学 | `化学`（JS，h1） | `化学 — 学习工具箱` |
| 地理 | `地理 · 学习工具箱`（JS 顶栏 h1 + hero h2） | `地理 — 学习工具箱` |
| 生物 | `生物`（JS，renderSelection h1） | `生物 — 学习工具箱` |

### 5.2 统一目标（迁移后）

- 页面主标题（入口浏览层）：**`学科 · 选择板块`**。
  - 数学：`数学 · 选择板块`（进入子板块后恢复 `数学 · {板块名}`）。
  - 物理：`物理 · 选择板块`；化学：`化学 · 选择板块`；
    地理：`地理 · 选择板块`；生物：`生物 · 选择板块`。
  - **英语为例外保留：`英语 · 选择子卡`**（方案 §1.2 第 9 条裁决：英语子卡例外保留）。
- `<title>`：`学科 · 选择板块 — 学习工具箱`（英语：`英语 · 选择子卡 — 学习工具箱`）。
- 首页：h1 改为 logo 图 + `学习工具箱`（§4）；`<title>学习工具箱</title>` 不变。
- 课页内部标题（课名、章节名）**不在本规范范围**，一律不动。

---

## 六、index.html 插槽标记与缓存指纹

### 6.1 插槽标记

各模块 `index.html` 与首页 `index.html` 在 `<body>` 首、尾插入固定注释标记：

```html
<!-- TB:brand-head -->
…品牌头节点（见 §3.1）…
<!-- /TB:brand-head -->

…

<!-- TB:footer -->
…页脚节点（见 §3.6）…
<!-- /TB:footer -->
```

规则（红线）：

1. 只允许在两处标记之间写入**新增**节点；**不增减、不改名、不移位任何已有节点**。
2. 不改动任何 JS 钩子（id / class 选择器所依赖的类名），不改动抽屉/导航交互逻辑。
3. 首页现有 `.hero`、`.card-grid` 结构不动，仅替换 hero 内 emoji 为 logo 图。

### 6.2 缓存指纹

UI 批改动的共享资源引用（css/img）沿用化学 `?v=` 惯例，
`?v=` 值取升版版号（如 `?v=2026.10.18.6`），由发布时统一写。

---

## 七、只增项 / 冻结项清单

### 7.1 只增项（本批新增）

- token：`--brand-50/100/500/600/700`、`--btn-primary-bg`、`--btn-primary-ink`、
  `--btn-secondary-border`、`--btn-secondary-ink`、`--card-border`、`--topbar-bg`、
  `--footer-border`（§2.2–2.3）
- token 补全（定义缺口）：`--accent`、`--accent-soft`、`--line`（§2.4）
- 组件类：`.tb-brand-head`、`.tb-brand-logo`、`.tb-brand-name`、`.tb-brand-sep`、
  `.tb-brand-subject`、`.tb-btn-primary`、`.tb-btn-secondary`、`.tb-back`、
  `.tb-card`、`.tb-progress`、`.tb-footer`（§3）
- 资源：`assets/img/logo-32.png`、`logo-48.png`、`logo-64.png`（§4）
- 插槽注释：`<!-- TB:brand-head -->`、`<!-- TB:footer -->`（§6.1）
- 组件类：`.tb-crumb`、`.tb-crumb-text`（§3.7，全局导航批 2026-10-19 新增）；
  共享脚本 `assets/js/breadcrumb.js`（`window.TB_crumb`）

### 7.2 冻结项（原样保留，不再新增引用）

- 共享 css 既有 token：`--bg / --ink / --ink-soft / --card-bg / --radius / --shadow / --shadow-hover`、
  `--card-color`（局部覆盖机制）。
- 既有组件类：`.hero`、`.card`、`.card-btn`、`.card-btn-disabled`、`.badge*`、
  `.topbar`、`.back-link`、`.search-box`、`.root-grid`、`.root-card`、
  `.version-note`、`.update-row/.update-btn*`、`.version-label`、`.update-dot`、
  `.update-banner`、`.footer` 及其触控热区规则。
- 各模块自有类（`m-*`、`e-*`、`phy-*`、`chm-*`、`geog-*`、`bio-*` 等）与
  各自 `--xxx-*` 变量前缀（隔离是设计意图）。
- 六模块内联 SVG favicon（data URI 方块字）原样保留文件内注释或移除？
  **决定：替换时保留旧 data URI 为 HTML 注释备查一行**，不删除痕迹。
- `assets/js/registry.js`：UI 批不动（按 hunk 精确 stage 仍由总负责做）。

### 7.3 本批顺带修复（任务书明确授权，仅此一项）

`modules/biology/js/biology.js` → `renderSelection()`：
学段卡片 `trackChapters(t.id)` 为空时，原渲染 `0 章 · 0 课`（与页头
`4 章 · 20 课 · 59 页` 矛盾，见方案 §1.2 #12）。
改为：为空时显示「敬请期待」文案。**只改这一行文案逻辑，不碰数据与交互。**

---

## 八、红线（本批禁区）

1. 不动深色主题机制（`data-theme` 挂 `document.body`，跟随系统 `prefers-color-scheme`，
   无手动切换按钮）。
2. 不动抽屉/目录/导航交互逻辑与 JS 钩子（只换皮：抽屉头部样式、关闭按钮、遮罩）。
3. 不动字号阶梯（V8）断言与 `tools/v8-fontladder-scan.cjs`。
4. 不动课页内部教学组件样式与引擎层样式（`window.Eng` 相关）。
5. 不动 `assets/js/registry.js`。
6. 共享 `assets/css/style.css` 由蓝队独占写入（生物线 P5+ 冻结共享样式，只用新规范类）；
   改动不得破坏 `modules/biology` 在产页面。
7. 全部工作停在工作树；**未经总负责明确指令不得 commit、不得推送**。

---

## 九、迁移验收引用

- 白队：三视口（1440 / 820 / 390）回归——零横向溢出、可点目标 ≥44px、
  深浅两色主题独立断言、file:// 可跑、零外部资源。
- 灰队：改前/改后同视口截图像素对照（UI 批开始前先留改前基线截图）。
- 稽核：对照报告（改了哪些文件、每处改前改后截图可查）+ 版号三线对账 + 远端 SHA 核对。

---

*规范起草：蓝队（UI 统一专项组·执行）· 2026-10-18 · 待总负责确认后进入迁移执行*
