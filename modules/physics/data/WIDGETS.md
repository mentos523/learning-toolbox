# 物理 · 组件 API 目录（蓝队 2026-10-15，v1.0）

> 阶段三批量生产（127 课）的数据依据。全部 `interaction = { type, params }`
> 范式；`type` 即组件英文名（大小写敏感），与渲染器
> `PHYSICS_INTERACTION_TYPES`（见 `modules/physics/js/physics.js`）同步。
>
> 通用铁律（`docs/physics-interactions.md` §0.3，全局执行）：
> - `params` 禁硬编码色值：只用 `colorRole` 语义名（渲染器映射 `var(--phy-*)`）；
>   深色模式自动跟随，无需重绘画布。
> - 逻辑单位 0–100（y 向上为物理惯例；各组件内自行做屏幕映射）。
> - 触控目标 ≥44px；拖拽手柄 ≥6 逻辑单位，热区再外扩 50%。
> - 双编码：颜色 + 形状/文字/线型；状态（通断/平衡/守恒）一律配文字徽章。
> - 读数行走 MathML（物理量符号斜体），单位与数值同行；零音频文件。
> - 每个可调参组件的 `params.badge.invariant` 写清"没变的是：××"（黄队文案）；
>   为空时不渲染该行、不留空位。
> - 反馈走 M6：落定视觉 flash 必选，`navigator.vibrate` 与合成音效可选。
>
> 读数徽章（冻结 spec）：`badge: { quantityMathml?, quantityText?, unit?, invariant? }`。
> 渲染器另支持整行读数替换（组件内部用）：`F合 = 6 N` 这类"符号=数值 单位"
> 走 MathML，MathML 不可用时降级纯文本。
>
> 安全徽章（W-P20）：凡涉及电/激光/高温/高压的组件，`params.safety` 给一句话术
> （"虚拟/现实"对比句式，黄队定稿），渲染器常驻交互区顶部、不随交互消失。
> 如 `{ type: "circuit-build", params: { safety: "虚拟电路随便短路，真实电路短路会烧坏电源——绝不许试", … } }`。
>
> 本目录示例可直接粘进 `data/pNN.js` 的 `widgets: [{ type, params }]`。

---

## P1 · force-drag（受力示意拖拽）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `body` | object | ✅ | — | `{x, y, size, label?}`；逻辑坐标 0–100；`size` 方块边长（建议 12–18） |
| `forces` | array | ✅ | — | 非空；每项见下 |
| `forces[].id` | string | ✅ | — | 力 id |
| `forces[].kind` | string | ✅ | — | `gravity`（重力，恒 A 组橙）/ `normal`（支持力，B 组）/ `pull`（拉力/推力，B 组）/ `friction`（摩擦力，C 组）/ `custom`（C 组） |
| `forces[].label` | string | ✅ | — | 力标签（G/N/T/f，MathML 斜体由渲染器处理） |
| `forces[].angleDeg` | number | ✅ | — | 初始方向角（度；0° 朝右、90° 朝上；`friction` 只作初始示意，渲染器按合力趋势自动反向） |
| `forces[].mag` | number | ✅ | — | 初始大小（N，>0） |
| `forces[].min`/`max` | number | — | `0`/`20` | 可拖范围（N） |
| `forces[].fixed` | boolean | — | `false` | `true` 锁定（灰色虚线、不可拖；页内须有一句"重力大小方向不变"） |
| `showResultant` | boolean | — | `true` | 合力矢量（朱红加粗 + `F合` 标签） |
| `surface` | string | — | `"horizontal"` | `"horizontal"` / `"incline"`（斜面，需配 `inclineDeg`） |
| `inclineDeg` | number | — | `0` | 斜面倾角 0–45° |
| `unit` | string | — | `"N"` | 单位说明 |
| `badge` | object | — | — | 读数徽章（`invariant` 必填黄队文案，如"没变的是：质量"） |

```js
{ type: "force-drag", params: {
  body: { x: 50, y: 40, size: 15, label: "木块" },
  forces: [
    { id: "g", kind: "gravity", label: "G", angleDeg: 270, mag: 10, fixed: true },
    { id: "n", kind: "normal",  label: "N", angleDeg: 90,  mag: 10, fixed: true },
    { id: "t", kind: "pull",    label: "T", angleDeg: 0,   mag: 6, min: 0, max: 20 },
    { id: "f", kind: "friction",label: "f", angleDeg: 180, mag: 6 }
  ],
  showResultant: true, surface: "horizontal", unit: "N",
  badge: { invariant: "没变的是：质量" }
} }
```

交互：拖箭头端点改大小+方向；拖箭身只改方向；松手 150ms 缓动 + flash。
输出：`F合 = … N`（MathML）+ 趋势徽章（"静止（合力为零）"/"向右加速"/"向左加速"/"向上加速"/"向下加速"）。

---

## P2 · motion-sim（运动轨迹模拟）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mode` | string | ✅ | — | `"projectile"`（抛体）/ `"circle"`（匀速圆周） |
| `v0` | object | △ | — | `{min,max,step,init}`（m/s，>0）；`projectile` 必填 |
| `angle` | object | △ | — | `{min,max,step,init}`（度，5–85）；`projectile` 必填 |
| `omega` | object | △ | — | `{min,max,step,init}`（rad/s）；`circle` 必填 |
| `g` | number | — | `9.8` | 重力加速度（m/s²） |
| `dragHandle` | boolean | — | `true` | 发射手柄（蓝色圆点）↔ 滑块双向同步 |
| `timeScale` | number | — | `1` | <1 为慢放；动画角常驻"慢放 ×0.5（非真实时间）" |
| `showReadouts` | boolean | — | `true` | 读数行 |
| `maxFrames` | number | — | `120` | 轨迹点数上限（钳制 ≤300） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "motion-sim", params: {
  mode: "projectile",
  v0: { min: 5, max: 30, step: 1, init: 15 },
  angle: { min: 15, max: 75, step: 5, init: 45 },
  g: 9.8, dragHandle: true, timeScale: 0.5, showReadouts: true,
  badge: { invariant: "没变的是：小球质量" }
} }
```

读数（MathML）：抛体 `R = … m，H = … m，T = … s`；圆周 `T = 2π/ω = … s` + 向心力箭头（朱红 + `F向` 标签，实时指向圆心）。
坑：`v0=0` 时播放置灰、读数"—"、提示"初速度不能为 0"；θ→90° 画竖线 + "竖直上抛是抛体的特例"。

---

## P3 · circuit-build（电路搭建）

降级后 spec：**只做单回路串联解析求解**（`I = U/ΣR`）+ `allowParallel` 固定双支路模板（两支路各一灯泡）；元件 ≤8；不做通用节点分析。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `grid` | object | ✅ | — | `{cols, rows}`（如 6×4；格点间距 ≥13 逻辑单位） |
| `components` | array | ✅ | — | 初始元件（可空）；`{id, kind, cell:[col,row], value?}` |
| `components[].kind` | string | ✅ | — | `battery`/`bulb`/`switch`/`ammeter`/`resistor`/`wire` |
| `components[].value` | number | — | — | 灯泡默认 12Ω、电阻默认 20Ω（Ω）；电流表内阻视为 0（小字注明） |
| `tray` | array | — | 全种类 | 元件库清单（`kind` 数组） |
| `battery` | object | — | `{voltage:3}` | 电源电压（V，>0）；单电源 |
| `goal` | string | — | — | 任务目标（一句话） |
| `allowParallel` | boolean | — | `false` | `true` 仅开放固定双支路模板（文案写"试试两条支路"，不写"自由并联"） |
| `showCurrent` | boolean | — | `true` | 电流方向箭头（蓝绿 + 箭头 + `I` 标签） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "circuit-build", params: {
  grid: { cols: 6, rows: 4 },
  components: [
    { id: "bat1", kind: "battery", cell: [1, 2] },
    { id: "sw1",  kind: "switch",  cell: [4, 2] }
  ],
  tray: ["bulb", "ammeter", "resistor", "wire"],
  battery: { voltage: 3 },
  goal: "从元件库拖灯泡和导线，连一个能让灯泡亮的电路",
  allowParallel: false, showCurrent: true,
  badge: { invariant: "没变的是：电源电压" }
} }
```

判定：通路 / 断路（开关没闭合）/ 断路（电路未闭合）/ **短路！**（导线直连电源两极 → 红色警告徽章 + ⚠ + 断路态）/ **烧表警告**（电流表并联在用电器/电源两端 → ⚠ 徽章，话术占位"待黄队定"，断路态）。
灯泡三档：暗 / 亮 / 很亮（各有文字）；电流表读数 `I = … A`（MathML）。
拖拽：只支持"库→画布"和"画布→库"；点开关切换开合；附"一键连好示范电路"按钮。
元件符号符合 GB/T 4728（国标电路符号，符号本身即第一编码）。

---

## P4 · optics-ray（光路作图）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mode` | string | ✅ | — | `"lens"`（透镜）/ `"mirror"`（平面镜反射） |
| `lens` | object | △ | — | `lens` 必填：`{x, f}`；`x` 透镜中心横坐标，`f` 焦距（可配 `focal` 滑块） |
| `focal` | object | — | — | 焦距滑块 `{min,max,step,init}`（逻辑单位，>0） |
| `source` | object | ✅ | — | `{x, y}` 可拖拽（箭头状物体） |
| `rays` | array | — | 全开 | `"parallel"`/`"center"`/`"focus"` 子集（初学建议只开前两条） |
| `showImage` | boolean | — | `true` | 像（实像实线 / 虚像虚线 + 性质徽章） |
| `mirrorX` | number | △ | — | `mirror` 必填：平面镜横坐标 |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "optics-ray", params: {
  mode: "lens",
  lens: { x: 50, f: 15 },
  focal: { min: 8, max: 25, step: 1, init: 15 },
  source: { x: 22, y: 62 },
  rays: ["parallel", "center", "focus"],
  showImage: true,
  badge: { invariant: "没变的是：焦距" }
} }
```

计算：薄透镜公式 `1/f = 1/u + 1/v`（MathML 数值验算行）；`u=f` → 徽章"不成像（u=f）"，不硬画线。
像性质徽章："倒立缩小实像" / "倒立放大实像" / "正立放大虚像" / "正立等大虚像"（mirror）。
焦点 F 为只读标记（不可拖）；法线灰虚线。

---

## P5 · wave-tune（波形调节）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `amp` | object | ✅ | — | 振幅滑块 `{min,max,step,init}`（>0） |
| `freq` | object | ✅ | — | 频率滑块 `{min,max,step,init}`（Hz，>0；**step:10**，保证 440Hz 可达） |
| `phase` | object | — | `{min:0,max:360,step:15,init:0}` | 相位滑块（0°=360° 循环回绕） |
| `waveB` | object | — | — | 第二列波：固定值 `{amp,freq,phase}` 或同构滑块组 |
| `showSum` | boolean | — | `false` | 合成波（`waveB` 存在时有效；朱红粗线） |
| `playSound` | boolean | — | `true` | "听一听"按钮（Web Audio 合成，零音频文件；需用户手势触发） |
| `audibleMax` | number | — | `2000` | 发声上限（Hz）；超限/低于 20Hz 只画波形不发声（听力保护） |
| `showLabels` | boolean | — | `true` | 波峰/波谷标注（圆点 + "峰"/"谷"） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "wave-tune", params: {
  amp: { min: 1, max: 5, step: 0.5, init: 3 },
  freq: { min: 100, max: 1000, step: 10, init: 440 },
  phase: { min: 0, max: 360, step: 15, init: 0 },
  playSound: true, audibleMax: 2000, showLabels: true,
  badge: { invariant: "没变的是：介质" }
} }
```

读数（MathML）：`A = …，f = … Hz，λ = v/f = … m`（v=340m/s，文案注明"声速"）。
约束：滑块拖动中不发声（只响应按钮）；波形动画频闪 ≤3Hz；频率配 −/+ 步进按钮。
双编码：波 A 橙实线 / 波 B 天蓝虚线 + 图例文字"波 A"/"波 B"。

---

## P6 · pulley-lever（滑轮杠杆）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mode` | string | ✅ | — | `"lever"`（杠杆）/ `"pulley"`（滑轮） |
| `fulcrumX` | object | △ | — | `lever` 必填：支点滑块/拖拽 `{min,max,step,init}` |
| `load` | object | ✅ | — | `{weight（N）, armInit}`；阻力大小固定（钩码） |
| `effortArm` | object | — | — | 动力作用点滑块 `{min,max,step,init}`（不填则固定在杠杆右端） |
| `pulleyKind` | string | △ | — | `pulley` 必填：`"fixed"`（定滑轮）/ `"movable"`（动滑轮） |
| `showEquation` | boolean | — | `true` | `F₁L₁ = F₂L₂` 实时验算行（MathML，`✓` 标记） |
| `unit` | string | — | `"N"` | 单位 |
| `badge` | object | — | — | 读数徽章（`F₁ = … N`） |

```js
{ type: "pulley-lever", params: {
  mode: "lever",
  fulcrumX: { min: 30, max: 70, step: 1, init: 50 },
  load: { weight: 10, armInit: 20 },
  showEquation: true, unit: "N",
  badge: { invariant: "没变的是：阻力（钩码重量）" }
} }
```

杠杆：动力 `F₁`（朱红待求）/ 阻力 `F₂`（橙已知）；力臂单弧/双弧双编码；平衡判定 `|F₁L₁−F₂L₂|/max < 2%` → "平衡 ✓"（文案"基本平衡"），否则倾斜（钳制 ±15°，300ms 缓动）+ 省力/费力徽章；力臂→0 时读数"—" + "支点不能压在端点上"。
滑轮：拉绳手柄可拖（蓝色）；动滑轮徽章 `"F = G/2（省一半力，但要多拉一倍绳子）"`。

---

## P7 · collision-lab（碰撞实验）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `m1`/`m2` | object | ✅ | — | 质量滑块 `{min,max,step,init}`（kg，>0） |
| `v1`/`v2` | object | ✅ | — | 初速度滑块 `{min,max,step,init}`（m/s，可为负；至少一车非 0） |
| `restitution` | number | — | `1` | 恢复系数 e（0–1）；初中页锁定 1（不暴露该参数） |
| `showMomentumBars` | boolean | — | `true` | 动量条（碰前/碰后两组） |
| `maxFrames` | number | — | `120` | 动画帧数上限（钳制 ≤200） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "collision-lab", params: {
  m1: { min: 1, max: 5, step: 0.5, init: 2 },
  m2: { min: 1, max: 5, step: 0.5, init: 2 },
  v1: { min: -5, max: 5, step: 0.5, init: 4 },
  v2: { min: -5, max: 5, step: 0.5, init: 0 },
  restitution: 1, showMomentumBars: true,
  badge: { invariant: "没变的是：两车总质量" }
} }
```

求解：一维碰撞解析解（动量守恒 + 恢复系数定义式联立）；读数 `p前 = p后 = … kg·m/s ✓`（MathML）。
播放：▶/⏸/↺/scrubber；碰撞瞬间两车 flash + 动量条高亮；等质量 e=1 对心撞 → "交换速度 ✓" 徽章。
动量条：①灰（`--phy-momentum-a`）/ ②常规描边色（`--phy-momentum-b`，中性色，不与力矢量复用）+ ①②编号 + 数值；`p=0` 不画条、配文字"p=0"。
坑：两车都静止 → 播放置灰，"两车都不动，撞不起来"。

---

## P8 · field-viz（电场/磁场可视化）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mode` | string | ✅ | — | `"efield"`（电场）/ `"bfield"`（磁场） |
| `charges` | array | — | `[]` | `efield` 初始电荷 `[{x, y, q}]`；`q` = +1/−1（示意单位） |
| `lineCount` | number | — | `32` | 场线条数上限（钳制 ≤48；低端机渲染器内部降到 24） |
| `probeDrag` | boolean | — | `true` | 探测手柄：场强方向箭头 + 方向文字（"向右偏上"）+ 强/中/弱 |
| `magnet` | object | △ | — | `bfield` 必填：`{x, y, angle}`（可拖可转） |
| `needleCount` | number | — | `8` | 小磁针数（钳制 ≤12，环形布置） |
| `showFieldLines` | boolean | — | `true` | 磁感线（天蓝 + 箭头） |
| `ironFilings` | boolean | — | `false` | `bfield` "撒铁屑"开关：铁屑沿磁感线排布**示意**（静态纹理，非真实随机模拟） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "field-viz", params: {
  mode: "efield",
  charges: [ { x: 35, y: 50, q: 1 }, { x: 65, y: 50, q: -1 } ],
  lineCount: 32, probeDrag: true,
  badge: { invariant: "没变的是：电荷的正负" }
} }
```

电场：点选空白处放置（≤4 个，超限提示；两电荷中心距 <8 逻辑单位不许放）；拖动电荷**松手后**重算场线（拖动中只移动圆点，防卡顿）；双击删除；场线 RK2 追踪（终止于异号电荷/边界，不穿电荷）。
电荷：正电荷朱红圆 + "+"，负电荷蓝圆 + "−"。
磁场：条形磁铁偶极子场解析式（静磁场示意）；小磁针 N 极（朱红 + "N"）指向该点磁感应方向，S 极蓝 + "S"。
坑：探测手柄只给方向文字 + 相对强弱，不给 E 绝对数值（q=±1 是示意单位，文案注明"示意"）。

---

## P9 · thermo-sim（热学模拟）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `temp` | object | ✅ | — | `{min,max,step,init,unit}`（如 `{min:-20,max:120,step:5,init:20,unit:"℃"}`） |
| `particleCount` | number | — | `120` | 分子数（钳制 ≤400，超限 console 告警） |
| `showStates` | boolean | — | `true` | 物态徽章（固态/液态/气态 + 熔点 0℃/沸点 100℃ 标注，**以水为例**） |
| `heatButtons` | boolean | — | `true` | "加热 🔥 / 制冷 ❄"长按按钮（≥56px，与滑块双向同步） |
| `speedScale` | number | — | `1` | 归一化系数（高温粒子太快时渲染器自动降速并标注"已慢放"） |
| `brownian` | boolean | — | `false` | 布朗运动示意：大颗粒随机游走（文案注明"示意，非真实碰撞"） |
| `badge` | object | — | — | 读数徽章（`T = … ℃`） |

```js
{ type: "thermo-sim", params: {
  temp: { min: -20, max: 120, step: 5, init: 20, unit: "℃" },
  particleCount: 120, showStates: true, heatButtons: true,
  badge: { invariant: "没变的是：分子总数" }
} }
```

分子模型（示意）：速率 ∝ √T（T 取开尔文，内部换算，params 只暴露摄氏度），方向随机，边界弹性反射；无分子间作用力。
双编码：慢速蓝圆 / 中速橙三角 / 快速朱红方 + "慢/中/快"文字图例（灰度可辨）。
物态徽章：`T<0` → "固态（冰）"；`0≤T<100` → "液态（水）"；`T≥100` → "气态（水蒸气）"；0℃/100℃ 刻度线高亮，徽章切换 flash。
播放：▶/⏸/↺（W-P6）；`T≤0` 配小字"分子仍在振动，动画已放大显示"。

---

## P10 · spring-shm（弹簧振子）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `k` | object | ✅ | — | 劲度系数滑块 `{min,max,step,init}`（N/m，>0） |
| `m` | object | ✅ | — | 质量滑块 `{min,max,step,init}`（kg，>0） |
| `dragAmp` | boolean | — | `true` | 振子可拖拽改振幅（松手即从该位置释放，初相位=0） |
| `showXTGraph` | boolean | — | `true` | x-t 联动图像（下方小画布，≤300 点，当前时刻游标线） |
| `showEquation` | boolean | — | `true` | `T = 2π√(m/k) = … s` 实时验算行（MathML） |
| `damping` | boolean | — | `false` | 阻尼演示：仅定性"振幅渐小"示意（文案"振幅慢慢变小（示意）"） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "spring-shm", params: {
  k: { min: 10, max: 200, step: 10, init: 50 },
  m: { min: 0.5, max: 5, step: 0.5, init: 1 },
  dragAmp: true, showXTGraph: true, showEquation: true,
  badge: { invariant: "没变的是：振子质量" }
} }
```

振动：解析解 `x = A·cos(ωt)`，`ω = √(k/m)`；T 极端时动画归一化并常驻"动画已调速，非真实时间"。
平衡位置：灰虚线 + `O`；振幅：双箭头 + 读数 `A = …`。
调参后振动自动从新振幅/新周期重起（不许按旧周期跑）。

---

## Y1 · guess-verify（先猜后验）

页面级 widget：交互实验页配"猜一猜"。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `question` | string | ✅ | — | 题干（≤30 字） |
| `options` | array | ✅ | — | 2–4 个选项（字符串数组） |
| `recordKey` | string | ✅ | — | 记录键，**字段名冻结**为 `phy_guess_<课号>`（如 `phy_guess_p05.2.1`）；存 `ltb-phy-<recordKey>`，供学习报告读取 |
| `showAfter` | string | — | `"manual"` | 固定 `"manual"`：学生手动点"动手验证"后才可看到现象 |

```js
{ type: "guess-verify", params: {
  question: "拉力再大一点，木块会怎样？",
  options: ["还是不动", "动起来", "先不动，突然动"],
  recordKey: "phy_guess_p05.2.1",
  showAfter: "manual"
} }
```

铁律：**不判对错、无红叉**，只记录选项；localStorage 禁用时降级为内存记录，不报错；验证后猜测条折叠。

---

## Y2 · read-gauge（仪表读数练习器）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `gauge` | string | ✅ | — | `ruler`（刻度尺）/ `thermometer`（温度计）/ `ammeter`（电流表）/ `voltmeter`（电压表）/ `balance`（天平游码） |
| `range` | object | ✅ | — | 量程 `{min, max, unit}`（如 `{min:-20, max:120, unit:"℃"}`） |
| `divisions` | number | ✅ | — | 分度值（如 1℃、0.1A）；`estimate` 为真时估读到分度值下一位 |
| `estimate` | boolean | — | `true` | 估读到分度值下一位（多写不算对，文案写清"估读一位"） |
| `eyeLine` | boolean | — | `true` | 视线练习：俯视/仰视/平视三选一，选错给提示（不判错） |
| `trialTouch` | boolean | — | `false` | 仅电流表：大量程试触 → 选合适量程两步流程（直接小量程接入出提示） |
| `tolerance` | string | — | `"1division"` | 容差：分度值 ×1（±1 个分度值内算读对） |

```js
{ type: "read-gauge", params: {
  gauge: "thermometer",
  range: { min: -20, max: 120, unit: "℃" },
  divisions: 1, estimate: true, eyeLine: true,
  tolerance: "1division"
} }
```

流程：随机出题 →（刻度尺：先选视线）→（电流表 + `trialTouch`：先大量程试触）→ 输入读数 → 检查（±1 分度值；估读只到下一位）→ "🔀 换一题"。
温度计零下：符号 + 读数双练（− 号必填）；天平游码 = 线性拖拽（滑块双向同步）。
口径冻结（`docs/physics-freeze-report.md`）：容差=分度值×1、估读到下一位；v1.0，生产前黄队可微调。

---

## Y3 · formula-id（公式身份证卡片）

纯渲染组件：固定版式——公式 | 成立条件 | 反例（什么时候失效） | 量纲检查，全书统一。
**两种形态**：讲解页块类型 `{ type: "formula-id", formula, conditions, counterexample, dimension, units }`（已存在，试点 p04.1.2-p3 在用）；交互页 widget 形态 `{ type: "formula-id", params: {...} }`（本目录规范，同一渲染器）。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `formula` | object | ✅ | — | `{mathml?, translation}`；**`translation` 必填**（MathML 降级用人话文本） |
| `conditions` | array | ✅ | — | 成立条件列表（与 curriculum 审计清单第 3 条逐字一致） |
| `counterexample` | string | ✅ | — | "什么时候失效"一句话 |
| `dimension` | string | ✅ | — | 量纲检查行（如 `A = V/Ω ✓`） |
| `units` | object | — | — | 物理扩展：`{si, common, note}`（每个公式必须注明 SI 单位，审计清单第 1 条） |

```js
{ type: "formula-id", params: {
  formula: { mathml: "<math><mi>I</mi><mo>=</mo><mfrac><mi>U</mi><mi>R</mi></mfrac></math>",
             translation: "电流 = 电压 ÷ 电阻" },
  conditions: ["金属导体", "纯电阻", "温度不变"],
  counterexample: "小灯泡：灯丝热了电阻变了，I–U 图像弯了，不成立",
  dimension: "A = V/Ω ✓",
  units: { si: "A", common: "mA", note: "1A = 1000mA" }
} }
```

---

## Y4 · graph-reader（图像三读法）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `source` | object | ✅ | — | `{kind, expr/points, xLabel, yLabel}`；`kind`: `"function"`（解析式，用 `expr` 如 `"v = 2*t + 1"`）/ `"points"`（散点，用 `points: [{x,y}…]` 或 `[[x,y]…]`） |
| `steps` | array | — | 全开 | `"slope"`（读斜率）/ `"area"`（读面积）/ `"intercept"`（读截距）子集 |
| `areaSlices` | number | — | `40` | 面积分割慢动作切片数（钳制 ≤60，超限 console 告警） |
| `xRange` | array | — | `[-5,5]` | `function` 数据源的 x 范围（`points` 时自动取点列范围） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "graph-reader", params: {
  source: { kind: "function", expr: "v = 2*t + 1", xLabel: "t/s", yLabel: "v/(m/s)" },
  steps: ["slope", "area", "intercept"],
  areaSlices: 40,
  badge: { invariant: "没变的是：坐标轴的物理意义" }
} }
```

斜率：直线段给精确值；曲线段标注"近似"（切线斜率示意，文案提醒别当精确值抄）。
面积：切片条动画；跨横轴分段着色 + "轴上为正 / 轴下为负"文字（话术待黄队定稿）。
口径冻结：函数/点列两类数据源（`docs/physics-freeze-report.md`）。

---

## Y5 · side-compare（对照表）

静态组件：左右两栏对照 + 中间结论行。

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `left` | object | ✅ | — | `{title, rows[]}`；每行字符串或 `{k, v}` 键值对 |
| `right` | object | ✅ | — | `{title, rows[]}` 同构 |
| `verdict` | string | ✅ | — | 中间结论行（一句话） |

```js
{ type: "side-compare", params: {
  left: { title: "电动机", rows: ["电 → 机械能", "通电导体在磁场中受力"] },
  right: { title: "发电机", rows: ["机械能 → 电", "闭合电路 + 磁通量变化"] },
  verdict: "名字像双胞胎，原理是反的"
} }
```

390px 下两栏转上下堆叠（`verdict` 置顶，CSS 媒体查询，渲染器内部实现）；行数建议 ≤6 行/栏（一屏预算）。

---

## 试点组件（p04.1.2 已有，保留）

### mv-lab（m–V 图像虚拟实验）
`params: { materials:[{id,name,rho,colorRole}], mMax, mInit, step, unitM, unitV, unitRho, badge, source:{kind:"points", xLabel, yLabel, steps:["slope"]} }`

### slope-compare（斜率直观版）
`params: { materials:[{id,name,rho,colorRole}], order:[ids], unitRho }`

---

## 章末习题页约定（v1.0）

每章末单元追加一课 **`pXX.n.0 章末小结与习题`**（n = 该章最后一个单元序号；如 p04 有 2 个单元则为 `p04.2.0`），`pages` **全为 `kind:"quiz"`**，约 2 页：

- 第 1 页：小结 —— `questions` 全为新增题型 `"review"`（静态小结块，无判分）：
  ```js
  { id: "pXX.n.0-p1", kind: "quiz", title: "本章小结",
    questions: [ { type: "review", html: "…" } ],  // html 可含 phy-f 公式占位
    point: "…" }
  ```
- 第 2 页：综合习题 —— `choice` / `fill`（判分口径复用语法 Y3：归一化大小写/空白，上标³接受纯文本变体；错 2 次给 tip）。
- `formulas` 注册表沿用（小结 `html` 中的 `<span class="phy-f" data-f="key">` 照常替换）。
- 章末习题课计入该章页数（冻结口径：每章约 2 页习题，含小结；页数以实测为准）。

引擎支持：`renderQuestion` 已实现 `type:"review"`；`renderZone` 照常渲染 `kind:"quiz"`。

---

## 引擎调试接口

- `PHY.widget(type, params)`：渲染单个组件（返回 DOM 节点），供阶段三冒烟与黄队预演用。
- `PHY.types`：`PHYSICS_INTERACTION_TYPES` 数组（与本目录同步；校验清单第 8 条）。
- 未知 `type` → 渲染占位提示 + `console.warn`，不抛错、不白屏。
