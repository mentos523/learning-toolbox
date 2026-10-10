# 数学 · 代数 交互参数定义模板（蓝队 v1.1，新增 shape-area）

> 来源：黄队 `docs/math-algebra-pedagogy.md` 第五章"交互动画类型清单"。
> 每页 `interaction = { type, params }`，`params` 必须符合本文件对应类型的 schema。
> 校验：`tools/render-mathml.mjs --validate` 会逐页校验（类型存在性 + 必填参数）。

通用约定：
- 长度/坐标一律用**逻辑单位**（由渲染器映射到画布像素），不写死 px。
- 颜色使用 CSS 变量，`params` 中不出现具体色值。
- 所有数值参数必须带单位注释或为无量纲数。

---

## 1. slider-lab（滑块实验）

拖参数，看结果实时变。适用：系数对图像的影响、变化率。

```js
{
  min: 0,            // 必填，滑块下限
  max: 20,           // 必填，滑块上限（必须 > min）
  step: 1,           // 必填，步长
  label: "x",        // 必填，滑块变量名（LaTeX 子集）
  expr: "x + 5",     // 必填，表达式（LaTeX 子集，可含 label 变量）
  target: 12,        // 可选，目标值；达到时触发"咔哒"反馈
  targetLabel: "目标 12", // 可选，target 存在时建议填
  unit: ""           // 可选，单位说明
}
```

## 2. balance-drag（拖拽天平）

拖砝码/盒子，保持平衡。适用：等式、移项、合并同类项。

```js
{
  left: [            // 必填，左盘物品数组（非空）
    { kind: "unknown", id: "x", label: "x" },  // 未知数盒子
    { kind: "weight", value: 3 }              // 砝码（value > 0）
  ],
  right: [           // 必填，右盘物品数组（非空）
    { kind: "weight", value: 8 }
  ],
  goal: "把 x 单独留在左边",  // 必填，任务目标（一句话）
  rule: "两边同时拿走同样多，天平依然平衡" // 可选，规则说明（默认上句）
}
```

`kind` 枚举：`unknown`（未知数盒子）/ `weight`（砝码）。
渲染器职责：实时计算两边总重，平衡时高亮天平横梁。

## 3. linked-dashboard（联动仪表盘）

一个量变，多个表示同步变。适用：函数（x→y→点）、导数（点→切线→斜率）。

```js
{
  source: {          // 必填，数据源（拖动端）
    label: "x", min: -5, max: 5, step: 0.1, initial: 0
  },
  views: [           // 必填，联动视图数组（1–3 个）
    { kind: "readout", expr: "2*x + 1", label: "y" },   // 数值读数
    { kind: "point", xExpr: "x", yExpr: "2*x + 1" }      // 坐标点；可选 axisLabelX/axisLabelY 覆盖轴标签
  ]
}
```

`views[].kind` 枚举：`readout`（数值）/ `point`（坐标点）/ `tangent`（切线）。
约束：单一数据源，多视图订阅；`expr` 均为 LaTeX 子集。

## 4. plot-points（描点成像）

逐点绘制，点连成线。适用：二次函数、指数函数图像生成。

```js
{
  fn: "x^2",         // 必填，函数表达式（LaTeX 子集，自变量为 x）
  xMin: -3,          // 必填
  xMax: 3,           // 必填
  step: 0.5,         // 必填，描点步长
  autoPlay: true,    // 可选，是否自动逐点播放（默认 true）
  speed: 800         // 可选，每点间隔毫秒（默认 800）
}
```

## 5. zoomer（放大镜 zoom）

局部不断放大，看"变直"。适用：瞬时变化率、极限。

```js
{
  fn: "x^2",         // 必填，函数表达式
  center: 1,         // 必填，放大中心 x 坐标
  levels: 4,         // 必填，放大级数（2–6）
  window: 2,         // 必填，初始半宽
  caption: "放大到足够大，曲线看起来像直线了" // 可选，每级配文
}
```

渲染器职责：每级窗口减半并重采样绘制，配斜率读数。

## 6. numeric-lab（数值实验台）

点按钮/输数，看趋势。适用：极限、无穷级数。

```js
{
  mode: "accumulate", // 必填，枚举：accumulate（累加）/ iterate（迭代）/ input（输入）
  term: "1/2^n",     // mode=accumulate/iterate 时必填，通项（LaTeX 子集，n 从 1 起）
  maxSteps: 20,      // 必填，最大步数（≤ 50）
  buttonLabel: "加一项", // 可选
  showTrend: true    // 可选，是否绘制趋势点列（默认 true）
}
```

## 7. subdivision（细分动画）

份数滑块，矩形越分越细。适用：积分、圆面积公式溯源。

```js
{
  fn: "x^2",         // 必填，被积函数
  a: 0,              // 必填，积分下限
  b: 2,              // 必填，积分上限（必须 > a）
  steps: [4, 16, 64, 256], // 必填，份数档位数组（递增，≤ 4 档）
  showError: true    // 可选，是否显示误差条（默认 true）
}
```

渲染器职责：每档重绘 n 个矩形，实时显示面积和与误差。

## 8. placeholder-morph（占位符 morph）

□→△→x 渐变。适用：算术→方程过渡。

```js
{
  stages: ["□", "△", "x"], // 必填，2–4 个阶段符号
  expr: "□ + 5 = 12",      // 必填，含占位符的表达式（首阶段符号）
  autoPlay: true,          // 可选，自动渐变（默认 true）
  interval: 1200           // 可选，每阶段毫秒（默认 1200）
}
```

约束：`expr` 中的占位符必须与 `stages[0]` 一致。

## 9. side-compare（对比并排）

左右两图同步变。适用：一次 vs 二次、平均 vs 瞬时。

```js
{
  left: {            // 必填，左图配置
    kind: "slider-lab",   // 复用任一交互类型
    params: { /* 对应类型的 params */ }
  },
  right: {           // 必填，右图配置（结构同 left）
    kind: "slider-lab",
    params: { /* 对应类型的 params */ }
  },
  sync: ["a"],      // 可选，同步联动的参数名数组
  labels: ["一次函数", "二次函数"] // 可选，两图标题
}
```

约束：`left.kind` / `right.kind` 不得为 `side-compare`（禁止嵌套）。

## 10. slow-replay（慢动作回放）

轨迹逐帧播放。适用：抛物线、追及问题。

```js
{
  frames: 60,        // 必填，总帧数（≤ 120）
  duration: 3000,    // 必填，毫秒（≤ 5000）
  draw: {            // 必填，每帧绘制指令
    kind: "projectile",   // 枚举：projectile（抛物线）/ pursuit（追及）
    params: { v0: 20, angle: 60, g: 9.8 }  // projectile 参数
    // pursuit 参数：{ vFront: 10, vBack: 15, gap: 50 }
    //   vFront 前车速度 m/s（≥0），vBack 后车速度 m/s（必须 > vFront），gap 初始距离 m（≥0）
  },
  scrubber: true     // 可选，是否显示时间轴 scrubber（默认 true）
}
```

播放控制：▶ 播放/⏸ 暂停、⏮ 重播、◀/▶ 单步；关键事件（落地/追上）高亮 + 音效震动。

## 11. shape-area（图形面积）

可拖动的正方形：边长变，面积实时变。适用：平方的几何意义、幂的直观。

```js
{
  min: 1,            // 必填，边长下限（≥ 0）
  max: 8,            // 必填，边长上限（必须 > min）
  step: 1,           // 必填，步长
  label: "x",        // 可选，边长变量名（默认 "x"）
  initial: 3,        // 可选，初始边长（默认 min）
  unit: "",          // 可选，单位说明
  showGrid: true     // 可选，整数边长（1–10）时是否叠加单位网格（默认 true）
}
```

渲染器职责：SVG 正方形（边长按 min–max 映射像素），右下角手柄拖拽
与下方滑块双向同步；读数行"边长 x = … / 面积 = x² = …"走统一数学
排版（MathML / 降级 sup-sub）；整数边长 1–10 时内部画单位网格，
可数格子验证"面积 = 边长²"。

---

## 校验规则（构建脚本执行）

1. `type` 必须在以上 11 种之中，否则阻断。
2. 标"必填"的参数缺失或类型不符 → 阻断并报错（页 id + 参数名）。
3. 数值范围约束（如 `max > min`、`steps` 递增）违反 → 告警（不阻断）。
4. `side-compare` 嵌套自身 → 阻断。
