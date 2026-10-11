# 数学 · 几何 交互参数编写手册（蓝队 v1.3）

> 给黄队：按本手册写几何页的 `interaction.params`，不用关心 SVG/CSS 实现。
> v1.3（2026-10-11，几何 g05 接入）：
> 新增 `cut-reassemble`（切割拼补） / `pythag-grow`（正方形生长滑块） /
> `ladder-slide`（梯子滑块）三种交互；expr-mathml.js 新增 `sqrt` 函数
> （ASCII `sqrt(…)` → MathML 真根号，ladder-slide 高度公式用）。
> v1.2（2026-10-11，几何 g01–g04 接入）：
> 新增 `proof-replay`（证明慢放机） / `construction-step`（作图步骤机）两种交互；
> LaTeX 子集新增几何符号（`\angle \triangle \cong \Rightarrow \parallel \perp \subset \circ`、
> `\␣` 空格、`\quad`、中文标点 `、，。；` 与 `/`）。
> v1.1（2026-10-11，白队一屏预算评审阻塞项修复）：
> 新增 `step-play` / `tap-highlight` / `compare-toggle` 三种通用交互；
> 新增**讲解页口径**（§"讲解页口径"）：`pageKind: "explain"` + 文字上限 300 字 +
> 点拨区 36vh 内滚动（复用习题页模式）。
> 全局铁律（沿用代数 `docs/math-interaction-params.md` + `docs/math-geometry-style.md`）：
> 1. `params` 里**不出现具体色值**，只用语义（known/target/对应组）；颜色由 CSS 变量 `--geo-*` 决定，深色模式自动切换。
> 2. **逻辑单位 0–100**（y 向上），不写死 px；渲染器按画布自适应缩放。
> 3. 反馈走 M6 规范：视觉必选（flash/ripple 已内置），震动可选。
> 4. 双编码：等长/等角/平行/直角等关系用原语自带标记表达，不要只靠颜色。

---

## G1 · vertex-drag（顶点拖拽）

拖动三角形的三个顶点，边长与角度读数实时更新。某角被拖到 ≈90°（±0.8°）
时自动画出直角方块标记。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `vertices` | array | ✅ | — | 恰好 3 个顶点：`{x, y, label}`。`x/y` 为逻辑坐标 0–100（y 向上）；`label` 为顶点字母，缺省为 A/B/C |
| `showLengths` | boolean | — | `true` | 是否显示边长标注与顶部边长读数 |
| `showAngles` | boolean | — | `true` | 是否显示角度标注与顶部角度读数 |

- 边长单位是"逻辑单位"，读数保留 1 位小数；教学中可约定"1 逻辑单位 = 1 厘米"。
- 边命名固定：顶点 A 的对边记作 `a`，B 的对边记作 `b`，C 的对边记作 `c`。
- 顶点颜色固定为"已知蓝"（可拖拽的视觉约定），不要在 params 里改。

### 示例

```js
interaction: {
  type: "vertex-drag",
  params: {
    vertices: [
      { x: 20, y: 75, label: "A" },
      { x: 80, y: 75, label: "B" },
      { x: 55, y: 25, label: "C" }
    ],
    showLengths: true,
    showAngles: true
  }
}
```

### 常见坑

1. **顶点必须恰好 3 个**：多于/少于 3 个渲染器直接报错提示，不画三角形。
2. **顶点不要共线或重合**：三点几乎共线时角度算不出（显示"—"）；初始布局请给"像三角形"的样子（如上例：底边两点 + 上方一点）。
3. **坐标范围 0–100**：超出会被钳制到 2–98；尽量让三角形占满画布（x 取 15–85，y 取 20–80），太小不好拖。
4. **直角方块是自动的**：±0.8° 内出现，不要在文案里写"拖到 90° 会出现方块"以外的承诺（阈值是实现细节）。
5. **只读模式**：`showLengths: false, showAngles: false` 可做纯拖拽观察页，但至少保留一种读数，否则页就没有"数"了。

---

## G6 · angle-protractor（量角器）

可旋转的半圆量角器。学生拖动量角器，把 0° 刻度线对准一条边，
读另一条边压住的刻度；松手时读数与真实角度差 ≤ `tolerance` 即吸附落定：
角弧线高亮闪烁（flash）+ 落点扩散圆环（ripple）+ 可选震动/音效（M6）。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `angle` | number | ✅ | — | 真实角度，度；必须在 (0, 180) 区间内 |
| `vertex` | object | — | `{x:50, y:56, label:"O"}` | 角顶点：逻辑坐标 + 字母标签 |
| `dir1` | number | — | `180` | 第一条边的方向角（度，数学惯例：0° 朝右、90° 朝上）；另一条边自动为 `dir1 − angle`（开口朝上） |
| `rayLabels` | array | — | `["A","B"]` | 两条边末端的字母标签（`[dir1边, 另一边]`） |
| `tolerance` | number | — | `2` | 落定容差（度），钳制在 0.5–10 之间 |
| `feedback` | object | — | 见下 | 反馈微调：`{vibrate, beep}` |

- `feedback.vibrate`：落定震动模式，默认 `[20, 30, 20]`；设为 `null` 关闭震动（只留视觉反馈）。
- `feedback.beep`：`true` 则落定配一声短促合成音（默认关闭；全站零音频文件，Web Audio 现场合成）。
- 读数规则：量角器是**单刻度**（0–180 从 0° 端向内递增），读数 = 另一条边压住的刻度数；学生把 0° 对准任一条边都能读对。
- 量角器初始偏转约 38°（0° 故意不对准），学生必须自己转。

### 示例

```js
interaction: {
  type: "angle-protractor",
  params: {
    angle: 60,
    vertex: { x: 50, y: 56, label: "O" },
    dir1: 180,
    rayLabels: ["A", "B"],
    tolerance: 2
  }
}
```

对应文案要素（黄队写 hints 时参考）：顶点 O、边 OA（0° 对准边）、边 OB（读数边）、
真实 60°。公式示例：`\\text{角} AOB = 60 \\text{度}`（translation 必填中文）。

### 常见坑

1. **`angle` 必须在 (0, 180) 内**：0°/180°/负数/≥180° 直接报错不渲染。想练钝角就写 120，想练锐角就写 35、60。
2. **`dir1` 别乱改**：默认 180（第一条边水平朝左、开口朝上）是最好认的摆法；改成别的值（如 90）角会转方向，文案里的"左右/上下"描述要跟着改。
3. **顶点位置**：默认 (50, 56) 给量角器（半径约占画布 1/4）留足了四周空间；顶点太靠边会导致量角器被裁。
4. **`tolerance` 别太小**：< 1° 手指很难一次对准，学生会挫败；默认 2° 即可，低年级可放宽到 3。
5. **落定后锁定**：量角器定住后不能再转，右下角"↺ 重量"按钮可重来；文案不要写"可以反复量"。
6. **读数是四舍五入到 0.1°**：落定成功面板显示的是真实角度（如 60°），不是学生的实际读数（如 59.8°）——这是"吸附"的含义，文案里说"量角器读数 60°"即可。
7. **震动在 iPhone 上无效**：这是系统限制，不是 bug；视觉反馈（发光 + 圆环）在所有设备上都有。

---

## step-play · 分步播放

折叠/撕角/平移/作图步骤：每步一帧 SVG + 一句说明，◀/▶ 步进、
▶/⏸ 自动播放（可落页即播）、↺ 重头。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `steps` | array | ✅ | — | 非空；每步 `{caption?, shapes}`。`caption` ≤ 60 字；`shapes` 为帧 DSL 数组（见下） |
| `interval` | number | — | `1500` | 自动播放间隔（毫秒），钳制 800–4000 |
| `autoplay` | boolean | — | `false` | `true` 则落页即自动播放 |
| `loop` | boolean | — | `false` | `true` 则播到末尾循环；默认播完自动停 |

### 帧 DSL（`shapes` 元素，逻辑坐标 0–100 / y 向上）

| `t` | 字段 | 说明 |
|---|---|---|
| `seg` | `a`,`b`(端点),`color?`,`width?`,`dash?`,`arrows?`(1-3 平行箭头),`ticks?`(1-3 等长刻度),`label?`(中点标注) | 线段 |
| `poly` | `pts`,`color?`,`width?`,`dash?`,`close?`(默认 true),`fill?`(语义色名),`opacity?` | 多边形/折线 |
| `circle` | `c`(圆心),`r`(逻辑半径),`color?`,`width?`,`dash?`,`fill?`,`opacity?` | 圆 |
| `pt` | `p`,`label?`,`color?`,`r?` | 点 |
| `txt` | `p`,`text`,`size?`,`color?`,`anchor?`,`math?`,`bold?` | 文本（`math:true` 走 MathExpr 排版） |
| `arc` | `v`,`a1`,`a2`(数学惯例度),`r`(逻辑),`group?`(1-3 弧数),`color?` | 角弧线 |
| `ticks` | `a`,`b`,`count?`(1-3),`color?` | 等长刻度线 |
| `right` | `v`,`p`,`q`,`size?`(逻辑),`color?` | 直角方块 |
| `ray` | `p`,`ang`(数学惯例度),`len`(逻辑),`color?`,`width?` | 射线 |

- `color`/`fill` 只填语义名（`known`/`target`/`corrA`/`corrB`/`corrC`/`corrAngle`/`line`/`aux`），不出现具体色值。
- `anchor`：该步图形的点击无关定位点，缺省为图形几何中心。

### 示例（撕角拼内角和：第 2 步）

```js
interaction: {
  type: "step-play",
  params: {
    interval: 1600,
    steps: [
      { caption: "第 1 步：完整的三角形，三个角都在。",
        shapes: [
          { t: "poly", pts: [[20,70],[80,70],[50,25]], color: "line", width: 3 },
          { t: "arc", v: [20,70], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
          { t: "arc", v: [80,70], a1: 125, a2: 180, r: 10, group: 2, color: "corrAngle" },
          { t: "arc", v: [50,25], a1: 208, a2: 332, r: 10, group: 3, color: "corrAngle" }
        ] },
      { caption: "第 2 步：把三个角撕下来，顶点拼到一起。",
        shapes: [
          { t: "poly", pts: [[20,70],[80,70],[50,25]], color: "line", width: 1.5, dash: "5,4" },
          { t: "arc", v: [50,45], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
          { t: "arc", v: [50,45], a1: 55, a2: 125, r: 12, group: 2, color: "corrAngle" },
          { t: "arc", v: [50,45], a1: 125, a2: 180, r: 14, group: 3, color: "corrAngle" },
          { t: "seg", a: [28,45], b: [72,45], color: "aux", dash: "5,4" }
        ] },
      { caption: "第 3 步：三个角拼成一条直线——内角和是 180°。",
        shapes: [
          { t: "seg", a: [20,45], b: [80,45], color: "line", width: 3 },
          { t: "arc", v: [50,45], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
          { t: "arc", v: [50,45], a1: 55, a2: 125, r: 12, group: 2, color: "corrAngle" },
          { t: "arc", v: [50,45], a1: 125, a2: 180, r: 14, group: 3, color: "corrAngle" },
          { t: "txt", p: [50,28], text: "三个角拼成平角", size: 15, bold: true }
        ] }
    ]
  }
}
```

### 常见坑

1. **`steps` 非空**：空数组直接报错不渲染；单步也合法（退化为静态帧 + 说明，控制条只剩 ↺）。
2. **每步独立成帧**：帧之间不继承——第 2 步想保留第 1 步的三角形，要把它的 DSL 再写一遍（可用虚线表示"原来的位置"，如上例）。
3. **`caption` 别写过程承诺**：只描述"这一步画面是什么"，不写"下一步会…"（自动播放时用户可能跳着看）。
4. **`interval` 别太短**：< 800ms 会被钳制；折叠类步骤建议 1500–2000ms，给学生看清的时间。
5. **组数 ≤ 3**：`arc.group` / `seg.arrows` / `seg.ticks` 都是 1-3，超过 3 组用"同色 + 编号"另行设计（见 style.md 双编码）。

---

## tap-highlight · 点击点亮分类

三线八角、三角形三线（高/中线/角平分线）区分：点图形元素 →
高亮为组色 + 编号徽章（双编码：颜色 + 数字，色盲可辨）+ 状态栏显示归类；
顶部组标签支持"一次只显示一组"（其余组淡化到 0.22）。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `items` | array | ✅ | — | 非空；每项 `{id?, label?, group, shape, anchor?}`。`label` 如"∠3"；`group` 为组序号（0 起）或组名；`shape` 为帧 DSL（同 step-play） |
| `groups` | array | ✅ | — | 每组 `{name, color}`；`color` 为语义色名（建议 `corrA`/`corrB`/`corrC` 三色，最多 3 组） |
| `base` | array | — | `[]` | 背景静态图形（帧 DSL 数组，如三线八角的三条直线本身） |

- 点亮后元素描边变为组色，并加**编号徽章**（圆圈 + 组序号，如 ①②③ 效果，数字不依赖颜色）与"标签 → 组名"文字。
- 点击已点亮元素：闪烁一下 + 状态栏提示"已在某组"，不重复计数。
- 顶部读数：`已点亮 X / N`；全部点亮显示"全部点亮！"。

### 示例（三线八角分类）

```js
interaction: {
  type: "tap-highlight",
  params: {
    base: [
      { t: "seg", a: [15,75], b: [85,75], color: "line", width: 3 },   // 直线 a
      { t: "seg", a: [15,35], b: [85,35], color: "line", width: 3 },   // 直线 b
      { t: "seg", a: [30,85], b: [70,25], color: "aux", width: 2 },    // 截线 c
      { t: "txt", p: [88,75], text: "a" }, { t: "txt", p: [88,35], text: "b" },
      { t: "txt", p: [72,28], text: "c" }
    ],
    groups: [
      { name: "同位角", color: "corrA" },
      { name: "内错角", color: "corrB" },
      { name: "同旁内角", color: "corrC" }
    ],
    items: [
      { id: "a1", label: "∠1", group: 0,
        shape: { t: "arc", v: [36,75], a1: 300, a2: 360, r: 9, color: "corrAngle" } },
      { id: "a3", label: "∠3", group: 1,
        shape: { t: "arc", v: [64,35], a1: 120, a2: 180, r: 9, color: "corrAngle" } }
      // ……其余 6 个角同理
    ]
  }
}
```

### 常见坑

1. **`group` 引用方式**：写序号（0 起）或组名都行；序号越界/组名对不上时自动归第 0 组——写完对照 groups 数一遍。
2. **最多 3 组**：徽章编号 = 组序号 + 1；超过 3 组色板不够用，要拆成两页。
3. **细线条也要能点**：每个元素自带透明点击热区（半径约 22px），`arc`/`seg` 再细也点得中；但两个元素的 `anchor` 别重叠，否则热区打架。
4. **"一次只显示一组"是淡化不是删除**：切组标签时其余组透明度 0.22，底图 `base` 不受影响；文案里说"只看同位角"即可。
5. **点亮不可撤销**：点错组没有"取消点亮"——黄队写 items 时 `group` 必须先跟绿队对准答案。

---

## compare-toggle · 对比切换

SSS 稳定性双图对比：两个视图按钮切换（同一画布），或 `layout: "stack"` 上下堆叠。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `views` | array | ✅ | — | **恰好 2 个**：`{label, caption?, shapes}`。`label` 为切换按钮文字（如"拉四边形"/"拉三角形"）；`caption` 为该视图下说明；`shapes` 为帧 DSL 数组 |
| `layout` | string | — | `"toggle"` | `"toggle"`（按钮切换）或 `"stack"`（上下堆叠，各带标题与说明） |

### 示例（三角形稳定性的对比）

```js
interaction: {
  type: "compare-toggle",
  params: {
    views: [
      { label: "拉四边形",
        caption: "四根木条钉成的四边形，一拉就变形——边长定了，形状没定。",
        shapes: [
          { t: "poly", pts: [[25,65],[65,70],[60,35],[20,30]], color: "target", width: 3.5 },
          { t: "seg", a: [25,65], b: [65,70], ticks: 1, color: "target" },
          { t: "txt", p: [45,80], text: "会晃", size: 15, bold: true, color: "target" }
        ] },
      { label: "拉三角形",
        caption: "三根木条钉成的三角形，怎么拉都不变形——三边定了，形状就定了。",
        shapes: [
          { t: "poly", pts: [[25,35],[65,35],[45,65]], color: "known", width: 3.5 },
          { t: "seg", a: [25,35], b: [65,35], ticks: 1, color: "known" },
          { t: "seg", a: [65,35], b: [45,65], ticks: 2, color: "known" },
          { t: "seg", a: [45,65], b: [25,35], ticks: 3, color: "known" },
          { t: "txt", p: [45,80], text: "纹丝不动", size: 15, bold: true, color: "known" }
        ] }
    ]
  }
}
```

### 常见坑

1. **`views` 必须恰好 2 个**：1 个或 3 个直接报错不渲染。三个对比拆成两页。
2. **两视图画布同尺寸**：切换时是同一画布重绘，图形位置尽量对齐（如上例两个图形都在 y 30–70 区间），学生一眼看出差别。
3. **`caption` 跟视图走**：toggle 模式下 caption 随按钮切换；文案不要写"左图/右图"，要写视图 label（"拉四边形时…"）。
4. **`stack` 模式无切换按钮**：两视图上下堆叠（每视图画布高 300），适合打印式对照；一屏预算紧张时优先用 `toggle`。

---

## proof-replay · 证明慢放机（v1.2 新增）

教学设计 §4.2：证明不是"读文字"，是"看动作"。每个证明步骤 =
**画布上的一个动作** + **一张人话卡片** + **"为什么可以？"折叠**
（每个"因为"都有出处，不许"显然"）。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `given` | string | — | — | 已知（页首蓝色"已知"徽章 + 公式，公式走 MX 排版） |
| `goal` | string | — | — | 求证（页首红色"求证"徽章 + 公式） |
| `steps` | array | ✅ | — | 非空，**≤ 5 步**（超 5 步拆页，拆页点选在"阶段性结论"处）；每步 `{caption?, card?, shapes, why?/reason?}` |
| `steps[].caption` | string | — | — | 步骤说明（"第 N 步：……"）；与 `card` 二选一必填 |
| `steps[].card` | string | — | — | 人话卡片：**≤ 40 字**，说"这一步在干什么"。`caption` 与 `card` 都写且不同时，`card` 另出高亮卡片 |
| `steps[].shapes` | array | ✅ | — | 本步画布：帧 DSL 数组（当前步涉及的边/角/线用高亮色/加粗） |
| `steps[].why` / `steps[].reason` | string | — | — | "为什么可以？"折叠内容：依据出处——"已知条件" / "定理：××（第 X 页）" / 作图痕迹。**二选一**，强烈建议写 |
| `interval` | number | — | `2200` | 自动播放间隔（毫秒），钳制 1000–5000（证明步比 step-play 慢，给学生看依据的时间） |
| `summary` | array | — | — | 两栏式"证明书"收尾：`{statement（陈述：做了什么）, reason（理由：凭什么）}`；播完自动展开 |

- 主文案规则：`caption || card` 为步骤主说明；黄队 g02/g03 用 `{caption, why}`，
  g04 用 `{card, reason}`——两种写法渲染器都认。
- 控制条：◀ 上一步 / ▶ 播放（播完自动停并展开"证明书"，不循环）/ 下一步 ▶ / ↺ 重头；
  切步带淡入 + 闪烁反馈（M6）。
- 公式走 MX（MathML / 降级）：`given`/`goal`/`summary` 里的表达式自动排版，不许裸文本。

### 示例（三角形内角和证明：第 1 步 + 证明书）

```js
interaction: {
  type: "proof-replay",
  params: {
    given: "△ABC",
    goal: "∠A + ∠B + ∠C = 180°",
    steps: [
      { caption: "第 1 步：过点 C 作直线 DE，使 DE ∥ AB。",
        card: "画一条辅助线：过 C 作 AB 的平行线——给三个角搭个“舞台”。",
        why: "依据：平行公理——过直线外一点，有且只有一条直线与已知直线平行。",
        shapes: [
          { t: "poly", pts: [[18,28],[82,28],[58,72]], color: "line", width: 3 },
          { t: "seg", a: [20,72], b: [88,72], color: "aux", width: 2.5, dash: "6,4", arrows: 2 },
          { t: "txt", p: [13,68], text: "D", size: 13 },
          { t: "txt", p: [95,68], text: "E", size: 13 }
        ] },
      /* ……第 2–5 步同理 …… */
    ],
    summary: [
      { statement: "过点 C 作直线 DE ∥ AB", reason: "平行公理" },
      { statement: "∠A = ∠ACD", reason: "平行线性质：内错角相等" },
      { statement: "∴ ∠A + ∠B + ∠C = 180°", reason: "等量代换" }
    ]
  }
}
```

### 常见坑

1. **步骤数 ≤ 5**：超 5 步必须拆页；拆页点选在"阶段性结论"处（如证完"△ABE ≌ △CDF"先停一页）。
2. **"为什么可以？"不许空**：每一步的动作都要能点开看到依据；写"显然""易得"等于没写。
3. **基本事实不证明**：如 SAS 判定是基本事实——叠合动画只做直观验证（用 step-play），
   不配 proof-replay；真证明位置留给 AAS 等可证内容。
4. **`given`/`goal` 的公式写法**：纯 ASCII/符号（如 `△ABC`、`∠A + ∠B = 180°`），
   走 MX 自动排版；中文混排会降级为纯文本，不报错但不好看。
5. **`summary` 与 `steps` 对齐**：证明书行数一般 = 步骤数，每行陈述对应一步的动作。

---

## construction-step · 作图步骤机（v1.2 新增）

教学设计 §4.1/§9.2：作图教学 = "看一遍 → 跟一遍 → 自己来一遍"，
三遍可在同一页完成（观看/跟做两种模式一键切换）。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `steps` | array | ✅ | — | 非空，**≤ 6 步**（超 6 步拆成两页，第一页终点是第二页起点，"未完待续"式衔接）；每步 `{text, why?, shapes}` |
| `steps[].text` | string | ✅ | — | 本步一句话指令：**≤ 15 字，动词开头**（"以 B 为圆心、b 为半径画弧"）；不许"显然""作""得"式黑话省略 |
| `steps[].why` | string | — | — | "为什么这样画？"折叠：人话解释（"圆规保证：弧上每一点到 B 的距离都是 b"）。强烈建议写 |
| `steps[].shapes` | array | ✅ | — | 本步作图帧：帧 DSL 数组（**累积写法**：把之前步骤的图形也写上，作图痕迹保留） |
| `interval` | number | — | `1800` | 自动播放间隔（毫秒），钳制 1000–4000 |

- 控制条：◀ 上一步 / ▶ 播放 / 下一步 ▶ / ↺ 倒带；顶部"观看/跟做"模式切换。
- **跟做模式**：点"下一步"时画布进入"待画"状态（遮罩 + 本步指令），
  学生先在纸上/心里比划，再点"我画好了，看这一步"揭晓验证；
  验证失败不惩罚（无扣分、无红叉，另有 ◀ 可"再看一遍上一步"）。
- 描红/虚线轨迹等"一笔画"特殊处理（§4.1）暂不在本机实现，需要时用 step-play 另写页。

### 示例（已知三边作三角形：第 2 步）

```js
interaction: {
  type: "construction-step",
  params: {
    steps: [
      { text: "画线段 BC，等于最长的边 a",
        why: "先定一条边当“地基”；作线段等于已知线段",
        shapes: [
          { t: "seg", a: [25,45], b: [65,45], color: "known", width: 3.5 },
          { t: "pt", p: [25,45], label: "B", color: "known" },
          { t: "pt", p: [65,45], label: "C", color: "known" }
        ] },
      { text: "以 B 为圆心、b 为半径画弧",
        why: "圆规保证：弧上每一点到 B 的距离都是 b",
        shapes: [
          { t: "seg", a: [25,45], b: [65,45], color: "line", width: 2 },
          { t: "circle", c: [25,45], r: 28, color: "aux", dash: "5,4" },
          { t: "txt", p: [25,80], text: "半径 = b", size: 13 }
        ] },
      /* ……后续步骤同理（累积写法）…… */
    ]
  }
}
```

### 常见坑

1. **步骤数 ≤ 6**：超 6 步拆两页；页尾写"下一步：……"做衔接。
2. **`text` 动词开头、≤ 15 字**：写"画/以…为圆心/标出/连接……"，不写"然后我们得到…"。
3. **帧用累积写法**：每步的 `shapes` 把前面步骤的图形也带上（作图痕迹保留），
   当前步新画的线用 `known`/`target` 高亮色，旧痕迹用 `line`/`aux` 退后。
4. **跟做模式是默认体验的一部分**：写页时假设学生会点"跟做"——`text` 必须自足
   （不依赖上一页的图也能看懂这一步要干什么）。

---

## cut-reassemble · 切割拼补（v1.3 新增）

拖动多边形散块，拼进虚线目标轮廓。适用：弦图拼图、撕角拼角、面积割补
（pedagogy G5：块编号、切割线预览、一键拼好兜底）。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `pieces` | array | ✅ | — | 非空；散块数组，每项 `{id, label, pts}`。`pts` 为散放位置的顶点数组（逻辑坐标 0–100，y 向上）；**顶点顺序必须与对应 target 一致**（如都按顺时针） |
| `targets` | array | ✅ | — | 非空；目标轮廓数组，每项 `{id, pts}`。`pts` 为目标位置顶点数组 |
| `autoAssemble` | boolean | — | `true` | 是否显示"✨ 一键拼好"按钮 |
| `snapDist` | number | — | `12` | 吸附半径（逻辑单位）：散块质心与目标质心距离 ≤ 此值时，松手即吸附对齐 |
| `doneText` | string | — | `"拼好了！🎉"` | 全部拼好后的横幅文案 |

- 散块与目标按**顶点数**匹配：三角形（3 顶点）只进三角形轮廓，正方形（4 顶点）只进正方形轮廓；顶点数相同的目标之间可互换（如弦图的 4 个全等三角形，任意一块可进任意三角轮廓）。
- 散块拖拽只做平移（不旋转）；吸附时按目标形状**精确落位**（顶点一一对应）。
- 散块配色自动按 corrA/corrB/corrC/known/target 循环 + 编号标签（双编码：颜色 + 编号），不要在 params 里指定颜色。
- 已拼好的块锁定（不可再拖）；落定走 M6 反馈（flash + ripple + 震动，能力检测静默跳过）；右下角"↺ 复原"回到散放状态。

### 示例（赵爽弦图：4 个直角三角形 + 1 个小正方形）

```js
interaction: {
  type: "cut-reassemble",
  params: {
    pieces: [
      { id: "t1", label: "①", pts: [[16.4,48.8],[2,68],[42,68]] },
      { id: "t2", label: "②", pts: [[37.2,20.4],[18,6],[18,46]] },
      { id: "t3", label: "③", pts: [[71.6,45.2],[86,26],[46,26]] },
      { id: "t4", label: "④", pts: [[48.8,79.6],[68,94],[68,54]] },
      { id: "sq", label: "c", pts: [[10,18],[50,18],[50,58],[10,58]] }
    ],
    targets: [
      { id: "t1", pts: [[44.4,10.8],[30,30],[70,30]] },
      { id: "t2", pts: [[89.2,44.4],[70,30],[70,70]] },
      { id: "t3", pts: [[55.6,89.2],[70,70],[30,70]] },
      { id: "t4", pts: [[10.8,55.6],[30,70],[30,30]] },
      { id: "sq", pts: [[30,30],[70,30],[70,70],[30,70]] }
    ],
    autoAssemble: true
  }
}
```

### 常见坑

1. **散块顶点顺序必须与目标一致**：吸附是"顶点一一对应精确落位"，顺序写反/写乱会导致块"拧"进轮廓。写法：目标画好后，把散块的 `pts` 按同样顺序（如顺时针）抄一遍，再整体平移散开。
2. **散块别出画布**：`pts` 坐标钳制在 2–98；散块之间允许轻微重叠（像真的散放在一起），但别五个全叠成一坨。
3. **顶点数是匹配依据**：学生把三角形往正方形轮廓里放时不吸附——这是设计（形状不对），不是 bug。
4. **块的最小边 ≥ 13 逻辑单位**：约 44px 可点（pedagogy G5 要求），手机手指点得中。
5. **至少 2 个散块**：1 个块的"拼图"没有拼的意义，换 step-play。

---

## pythag-grow · 正方形生长滑块（v1.3 新增）

双滑块调直角边 a、b，三边上的正方形实时生长，面积徽章实时验算。
适用：勾股定理的发现（a²+b²=c² 猜想）。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `aMin` | number | ✅ | — | 直角边 a 下限（>0） |
| `aMax` | number | ✅ | — | 直角边 a 上限（必须 > aMin） |
| `bMin` | number | ✅ | — | 直角边 b 下限（>0） |
| `bMax` | number | ✅ | — | 直角边 b 上限（必须 > bMin） |
| `aStep` / `bStep` | number | — | `1` | 滑块步长（>0） |
| `aInit` / `bInit` | number | — | 下限 | 初始值（钳制到上下限内） |
| `lockRight` | boolean | — | `true` | **硬约束**：必须为 `true`；直角由构造保证（两直角边分别沿水平/竖直方向），直角标记恒显示；传 `false` 直接报错不渲染 |
| `showAreas` | boolean | — | `true` | 是否在正方形内显示面积数 |
| `badge` | string | — | — | 条件徽章文案，如 `"直角三角形中，两小块面积和=大块面积"`。纯中文按纯文本显示；纯 ASCII 公式（如 `"a^2+b^2=c^2"`）走 MathML；中英混排降级为纯文本 |

- 每个滑块上方有表达式行（如 `a² = 9`，该边正方形的面积，MathML），滑块行显示边长。
- 读数行：`a²+b²=c²`（MathML）+ 实时数值验算（如 `9+16=25 ✓`）。
- 正方形颜色：两直角边上为 known（蓝），斜边上为 target（红）；边标签 a/b/c 与面积数自动标注。
- 画布按三个正方形的包围盒自适应缩放，a、b 取值再大也不会出画布。

### 示例

```js
interaction: {
  type: "pythag-grow",
  params: {
    aMin: 1, aMax: 6, bMin: 1, bMax: 6,
    aInit: 3, bInit: 4,
    lockRight: true, showAreas: true,
    badge: "直角三角形中，两小块面积和=大块面积"
  }
}
```

### 常见坑

1. **`lockRight` 别写 `false`**：这个交互的身份就是"直角三角形"，传 `false` 会报错；想做一般三角形用 vertex-drag。
2. **上下限别太大**：a、b 到 20 时斜边正方形巨大，画布自适应后三角形缩得很小；建议 ≤ 8。
3. **步长与"勾股数"**：步长 1 时 a=3、b=4 得 c=5（整数，好讲）；步长 0.5 更平滑但面积出现小数——按教学目标选。
4. **badge 是条件陈述，不是证明**：徽章写"直角三角形中，……"这类条件句；证明放 proof-replay。

---

## ladder-slide · 梯子滑块（v1.3 新增）

拖梯子底端（画布手柄）或拖滑块，梯子（线段）实时转动，顶端高度
h=√(L²−x²) 走 MathML 实时显示。适用：勾股定理的应用（梯子靠墙）。

### Schema

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `length` | number | ✅ | — | 梯长 L（>0）；可用别名 `ladderLen` |
| `xMin` | number | ✅ | — | 底端离墙距离下限（≥0） |
| `xMax` | number | ✅ | — | 底端离墙距离上限（必须 > xMin 且 < length，否则 h=0 无意义） |
| `xStep` | number | — | `0.5` | 滑块步长（>0）；画布拖动手柄按此步长取整 |
| `xInit` | number | — | `xMin` | 初始 x（钳制到上下限内） |
| `expr` | string | ✅ | — | 高度公式（ASCII 子集，**自变量必须为 `x`**），如 `"sqrt(100-x^2)"`；显示（MathML 真根号）与求值共用。缺省为 `"sqrt(L²-x^2)"`（L 取 length 的平方数） |
| `unit` | string | — | `""` | 单位说明（如 `"米"`） |
| `showTriangle` | boolean | — | `true` | 是否画出直角三角形（墙/地面/梯子 + 直角标记 + 浅色填充） |
| `showCheck` | boolean | — | `true` | 是否显示 `x²+h²=L²` 实时验算行 |

- 滑块表达式行显示 `√(L²−x²) = …`（MathML 真根号，expr-mathml.js 的 `sqrt` 支持），滑块行显示 `x = …`。
- 画布手柄：梯子底端的蓝色圆点可横向拖拽，与滑块双向同步。
- 约束：x 超出范围会被钳制；`xMax ≥ length` 时渲染器自动钳制到 0.999L（保证 h>0），但 params 里就该写对。

### 示例（10 米梯子靠墙）

```js
interaction: {
  type: "ladder-slide",
  params: {
    length: 10, xMin: 2, xMax: 8, xStep: 0.5, xInit: 6,
    expr: "sqrt(100-x^2)",
    unit: "米",
    showTriangle: true, showCheck: true
  }
}
```

### 常见坑

1. **`expr` 必须用 ASCII**：写 `"sqrt(100-x^2)"`，不要写 LaTeX `"\\sqrt{100-x^2}"`（交互内公式走 expr-mathml.js 的 ASCII 子集，LaTeX 会降级为纯文本）。
2. **`expr` 自变量必须叫 `x`**：求值按变量名 `x` 代入；写成别的字母读数是 NaN。
3. **`xMax` 别 ≥ 梯长**：x=L 时 h=0（梯子躺平），x>L 时无实数解；渲染器会钳制，但 params 里就该写对。
4. **别把 `unit` 写进 `expr`**：单位走 `unit` 参数，公式保持干净。

---

## 讲解页口径（v1.1 新增）

用户铁律：讲解页要"讲透"（反复举例：生活例 → 图形例 → 反例，pedagogy §5.2 五段式）。
旧 schema"全页 ≤ 150 字"+ `.m-hints` 6.5em 截断装不下，新口径如下：

| 项目 | 口径 |
|---|---|
| 页标识 | `pageKind: "explain"`（页对象可选字段；讲解页必须写，交互页/习题页不写） |
| 文字上限 | **全页 ≤ 300 字**（不含按钮标签；对齐 `docs/math-geometry-pedagogy.md` §5.2） |
| 点拨区样式 | `math.js` 检测到 `pageKind === "explain"` 自动给点拨区加 `explain` 类 → `.m-hints.explain`（`math.css`）：**36vh 内滚动区**，复用习题页 `.exercise` 模式；页面本身仍一屏无滚动 |
| hints 约束 | 每条仍建议 ≤ 60 字；条数不限（滚动区装得下），但五段式结构优先 |
| interaction | 仍必填；推荐 `step-play`（关键帧定格 + 反复讲解）或 `compare-toggle`（正例/反例对照）；纯文字讲解页可用单步 `step-play` 做静态配图 |

示例：

```js
{
  id: "g05-u1-l2-p3",
  title: "全等：能完全重合的两个图形",
  pageKind: "explain",          // ← 讲解页标识
  concept: "全等",
  formulas: [ { id: "f1", latex: "\\text{全等} \\iff \\text{完全重合}",
                translation: "全等就是能完全重合" } ],
  interaction: { type: "step-play", params: { steps: [ /* 关键帧 */ ] } },
  hints: [ "还记得吗？你把两个三角形叠到一起时，它们严丝合缝——这就是全等。",
           "全等，就是“能完全重合”——像复印机印出来的两张纸。",
           "生活例：两扇一模一样的门；图形例：三边三标记同色的两个三角形。",
           "反例：大小不一样的两扇门，形状一样但不能重合——那叫相似，不是全等。",
           "⚠️ 别搞混：全等不是相似，因为全等要求大小也一样。",
           "记住一句话：全等要重合，相似只同形。" ],
  examples: [ { text: "复印机印出的两张纸", figure: "实物" } ],
  prev: "g05-u1-l2-p2", next: "g05-u1-l2-p4"
}
```

---

## 样本页

- `modules/math/data/g00.js`：G1、G6 各 1 个完整样本页（公式 + 中文讲解 + params），可直接对照抄写结构。
- `modules/math/data/g05.js`（v1.3 新增交互样本页）：
  `g05-u1-l1-p2`（pythag-grow）/ `g05-u1-l2-p1`（cut-reassemble）/
  `g05-u1-l3-p1`（ladder-slide）——三页均为"公式 + 中文讲解 + params"完整页，
  可直接对照抄写结构。
- 样本章**已接入** `data/chapters.js`（g00–g07 `status: "ready"`）；正式几何章节按 `gNN.js` 命名、黄队写页、蓝队实现后由维护者接入注册表。

## 校验清单（提交页数据前）

1. `node --check` 数据文件语法通过。
2. `interaction.type` 为 10 种之一（大小写敏感）：`vertex-drag` / `angle-protractor` / `step-play` / `tap-highlight` / `compare-toggle` / `proof-replay` / `construction-step` / `cut-reassemble` / `pythag-grow` / `ladder-slide`（与 `tools/render-mathml.mjs` 的 `INTERACTION_TYPES` 同步）。
3. `formulas[].translation` 非空；LaTeX 只用构建器支持的子集（`\\text{}` 可写中文）。
4. `hints` 每条 ≤ 60 字，`examples` ≤ 2 个；**全页文字：交互页 ≤ 150 字，讲解页（`pageKind: "explain"`）≤ 300 字**（沿用代数 schema 约束 + pedagogy §5.2）。
5. 本手册"常见坑"逐条过一遍。
