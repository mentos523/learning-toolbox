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
| `components[].kind` | string | ✅ | — | `battery`/`bulb`/`switch`/`ammeter`/`voltmeter`/`resistor`/`rheostat`/`wire` |
| `components[].value` | number | — | — | 灯泡默认 12Ω、电阻默认 20Ω（Ω）；电流表内阻视为 0（小字注明） |
| `components[].min`/`max`/`init`/`step` | number | — | `0`/`50`/`=max`/自适应 | 仅 `rheostat`（滑动变阻器）：接入电阻范围 / 初始值 / 滑块步进（Ω）；`init` 缺省=最大值（规范动作：闭合开关前滑片移到阻值最大处） |
| `components[].across` | string | — | — | 仅 `voltmeter`（电压表）：被测用电器元件 `id`（`bulb`/`resistor`/`rheostat`/`battery`）；从元件库拖入时自动连最近用电器 |
| `components[].range`/`divisions` | object/number | — | `{max:15}`/`0.5` | 仅 `voltmeter`：量程 `{max}`（V）/ 分度值（V）；超量程出 ⚠ 警告"换大量程再测" |
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

判定：通路 / 断路（开关没闭合）/ 断路（电路未闭合）/ **短路！**（导线直连电源两极 → 红色警告徽章 + ⚠ + 断路态）/ **烧表警告**（电流表并联在用电器/电源两端 → ⚠ 徽章，断路态）/ **断路（电压表串联≈断路）**（电压表内阻极大，串进回路等于断路，只能并联）。
灯泡三档：暗 / 亮 / 很亮（各有文字）；电流表读数 `I = … A`（MathML）；有滑动变阻器时读数行追加 `R滑 = … Ω`（MathML）。
拖拽：只支持"库→画布"和"画布→库"；点开关切换开合；附"一键连好示范电路"按钮。
滑动变阻器：GB/T 4728 符号（电阻框 + 斜箭头）；滑片两种调法双向同步——① 符号上拖橙色手柄（隐形热区 r=7，直径 14 ≥ 6 逻辑单位）；② 下方滑块行（原生 range ≥44px + −/+ 步进，W-P9）；拖动中电流表读数实时联动（`I=U/ΣR`），松手后全量重算（灯泡档位/电流箭头/备注）。
电压表：GB/T 4728 符号（圆圈 V）；表笔虚线 + "测×"文字连到 `across` 指定的用电器；读数行 `U_被测 = … V`（MathML，`U=I·R_被测`，被测为电源时读电源电压）；量程/分度值可配，超量程 ⚠ 警告；被测元件不在回路中时读数 "—"。
元件符号符合 GB/T 4728（国标电路符号，符号本身即第一编码）。

```js
{ type: "circuit-build", params: {
  grid: { cols: 6, rows: 4 },
  components: [
    { id: "bat1", kind: "battery", cell: [2, 1] },
    { id: "sw1",  kind: "switch",  cell: [3, 1] },
    { id: "rh1",  kind: "rheostat", cell: [3, 2], min: 0, max: 50, init: 50 },
    { id: "a1",   kind: "ammeter", cell: [2, 2] },
    { id: "v1",   kind: "voltmeter", cell: [4, 1], across: "rh1",
      range: { max: 15 }, divisions: 0.5 }
  ],
  tray: ["bulb", "resistor", "rheostat", "voltmeter", "wire"],
  battery: { voltage: 6 },
  goal: "闭合开关，拖动滑片——接入电阻变，电流表读数跟着变",
  badge: { invariant: "没变的是：电源电压" }
} }
```
布局铁律：预置回路用 2×2 方形（或无弦 U 形）——回路中非相邻元件在网格上不得相邻，否则形成零电阻"弦"回路被误判短路。

---

## P4 · optics-ray（光路作图）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mode` | string | ✅ | — | `"lens"`（透镜）/ `"mirror"`（平面镜反射）/ `"refraction"`（折射：激光斜射入水） |
| `lens` | object | △ | — | `lens` 必填：`{x, f}`；`x` 透镜中心横坐标，`f` 焦距（可配 `focal` 滑块） |
| `focal` | object | — | — | 焦距滑块 `{min,max,step,init}`（逻辑单位，>0） |
| `source` | object | ✅ | — | `{x, y}` 可拖拽（箭头状物体）；`lens`/`mirror` 用 |
| `rays` | array | — | 全开 | `"parallel"`/`"center"`/`"focus"` 子集（初学建议只开前两条） |
| `showImage` | boolean | — | `true` | 像（实像实线 / 虚像虚线 + 性质徽章） |
| `mirrorX` | number | △ | — | `mirror` 必填：平面镜横坐标 |
| `angle` | object | △ | — | `refraction` 必填：入射角滑块 `{min,max,step,init}`（度，0–80） |
| `n1`/`n2` | number | — | `1`/`1.33` | `refraction`：两种介质折射率（默认空气→水） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "optics-ray", params: {
  mode: "refraction",
  angle: { min: 0, max: 80, step: 1, init: 30 },
  n1: 1, n2: 1.33,
  badge: { invariant: "没变的是：两种介质" }
} }
```

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
折射模式：斯涅尔定律 `n₁·sin i = n₂·sin r`（公式行 MathML，降级纯文本）；入射角滑块联动折射光线 + `i`/`r` 角度弧线；`i=0` → "垂直入射：不偏折"；读数 `i = …°，r = …°`（MathML）。

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

## 补充 · mv-lab（m–V 图像虚拟实验）

（白队 P3-8：原试点组件补入主目录。Y4 口径：点列数据源。）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `materials` | array | ✅ | — | 非空；每项 `{id, name, rho, colorRole}`（`rho` 密度，`colorRole` 语义色名） |
| `mMax` | number | — | `1000` | 质量轴上限（g） |
| `mInit` | number | — | `400` | 质量滑块初值（g） |
| `step` | number | — | `10` | 质量滑块步进（g） |
| `unitM`/`unitV`/`unitRho` | string | — | `"g"`/`"cm³"`/`""` | 质量 / 体积 / 密度单位说明 |
| `source` | object | — | — | `{kind:"points", xLabel, yLabel, steps:["slope"]}`；`xLabel` 默认 `"V/cm³"`，`yLabel` 默认 `"m/g"` |
| `badge` | object | — | — | 读数徽章（当前材料 ρ 读数 + `invariant` 黄队文案） |

```js
{ type: "mv-lab", params: {
  materials: [
    { id: "al", name: "铝块", rho: 2.7, colorRole: "force-a" },
    { id: "fe", name: "铁块", rho: 7.9, colorRole: "target" },
    { id: "w",  name: "水",   rho: 1.0, colorRole: "known" }
  ],
  mMax: 1000, mInit: 400, step: 10, unitM: "g", unitV: "cm³", unitRho: "g/cm³",
  source: { kind: "points", xLabel: "V/cm³", yLabel: "m/g", steps: ["slope"] },
  badge: { invariant: "没变的是：每种材料的密度" }
} }
```

交互：材料三选（tabs，`aria-pressed`）→ 高亮对应直线；质量滑块 → 活动点沿直线走，读数 `V = m/ρ`；斜率标签 `ρ=…`（Y4：直线段给精确值）。
触控：滑块原生 range（≥44px）；材料 tabs 为按钮组（≥44px）。
双编码：三条线颜色 + 斜率标签文字 `ρ=…`。

---

## 补充 · slope-compare（斜率直观版）

（白队 P3-8：原试点组件补入主目录。）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `materials` | array | ✅ | — | 非空；每项 `{id, name, rho, colorRole}` |
| `order` | array | ✅ | — | 材料 id 数组，按"线最陡 → 最平缓"排序（即 ρ 从大到小） |
| `unitRho` | string | — | `""` | 密度单位说明 |

```js
{ type: "slope-compare", params: {
  materials: [
    { id: "fe", name: "铁块", rho: 7.9, colorRole: "target" },
    { id: "al", name: "铝块", rho: 2.7, colorRole: "force-a" },
    { id: "w",  name: "水",   rho: 1.0, colorRole: "known" }
  ],
  order: ["fe", "al", "w"], unitRho: "g/cm³"
} }
```

交互：点选每行（`aria-pressed` 单选）→ 下方文案"×：ρ = …，线最陡/次之/最平缓 → 密度最大/居中/最小" + flash。
触控：每行 ≥52px 高按钮。
双编码：排名数字徽章 + 色条 + ρ 数值文字。

---

## 阶段四新增（黄队 P0/P1，蓝队 2026-10-15）

> P0 = 策略路径断裂必补（写得再好也讲不透）；P1 = 核心定量无载体必补。
> 全部遵守 §0.3 全局铁律。`pXX` 为内容侧复用课号（内容代理接线用）。

---

### P0 · tuning-fork（音叉溅水花）—— p01.1.1

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `badge` | object | — | — | 读数徽章（`invariant` 黄队文案，如"没变的是：音叉本身"） |

```js
{ type: "tuning-fork", params: {
  badge: { invariant: "没变的是：音叉本身" }
} }
```

交互："🔨 敲一下音叉"按钮（`phy-mini`，≥44px）→ 两臂反向振动（振幅指数衰减，5Hz 示意非真实频率）+ 水花粒子抛物线溅起（2.5s 内自停）+ 振动弧线示意。
输出：状态徽章"振动中…：水花被溅起来了" / "静止"；读数行"音叉在振动 → 水花溅起（发声的物体在振动）"。
双编码：振动弧线 + 状态文字。

---

### P0 · vacuum-chamber（真空罩抽气）—— p01.1.2

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `air` | object | — | `{min:0,max:100,step:5,init:100}` | 罩内空气量滑块（%） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "vacuum-chamber", params: {
  air: { min: 0, max: 100, step: 5, init: 100 },
  badge: { invariant: "没变的是：铃铛还在响" }
} }
```

交互：滑块抽气 → 罩内空气分子点减少 → 铃铛声波纹减少（0–4 道弧线）。
输出三档：`≥40%` "铃声清晰" / `<40%` "铃声变小（介质减少）" / `0%` "几乎听不见：真空不能传声"。
双编码：波纹数量 + 状态文字。

---

### P0 · pinhole-camera（小孔成像）—— p02.1.1

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `aperture` | object | — | `{min:1,max:6,step:0.5,init:2}` | 小孔孔径滑块（示意单位） |
| `objDist` | object | — | `{min:12,max:38,step:1,init:24}` | 物距滑块（逻辑单位） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "pinhole-camera", params: {
  aperture: { min: 1, max: 6, step: 0.5, init: 2 },
  objDist: { min: 12, max: 38, step: 1, init: 24 },
  badge: { invariant: "没变的是：像距（光屏位置）" }
} }
```

几何：过孔心两条光线（蜡烛顶→像底、蜡烛底→像顶），像高 = 物高 × 像距/物距；孔径 → 光线粗细（亮度）。
输出：读数 `m = 像距/物距 = …`（MathML，附"缩小/等大/放大"）；孔径 >3.5 叠虚影线 + "孔太大：变亮但变模糊"警告态。
双编码：倒像方向 + 状态文字。

---

### P0 · overflow-cup（溢水杯）—— p06.2.2

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `objVolume` | object | — | `{max:200,step:10,init:0}` | 物体浸入体积滑块（cm³；`min` 固定 0） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "overflow-cup", params: {
  objVolume: { max: 200, step: 10, init: 0 },
  badge: { invariant: "没变的是：杯里水面的高度（与溢水口齐平）" }
} }
```

交互：滑块 → 物体下压深度 → 溢水口滴水 → 小烧杯水位上升。
输出：读数 `V溢 = … cm³ = 排开水的体积`（MathML）；状态"溢出的水，正好等于物体排开的水"。
双编码：烧杯水位 + 读数文字。

---

### P0 · em-induction（电磁感应）—— p10.1.4（复用 p16.3.1/p16.3.3）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `pole` | string | — | `"N"` | 朝向线圈的磁极 `"N"`/`"S"`（S 极时方向口径镜像） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "em-induction", params: {
  pole: "N",
  badge: { invariant: "没变的是：线圈" }
} }
```

交互：拖磁铁（`phy-handle` 热区）→ Φ 条（∝1/距离）→ Φ 变化率判电流。
方向口径（楞次定律，N 极朝向线圈）：插入（Φ 增大）→ 从磁铁一侧看逆时针，上导线 ⊗（入纸）下导线 ⊙（出纸）；拔出反向；不动 → "Φ 不变 → 无感应电流（"变"才是条件）"。
双编码：⊙/⊗ 符号 + 方向文字；线圈天蓝三匝，磁铁 N/S 两色 + 文字。

---

### P0 · displacement-arrow（位移箭头绘制）—— p11.1.2

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "displacement-arrow", params: {
  badge: { invariant: "没变的是：起点" }
} }
```

交互：起点固定（蓝点），拖终点手柄（朱红，r=6 ≥ 6 逻辑单位）→ 位移箭头 + 分量虚线。
输出：读数 `Δx = … 格（只看起点→终点的直线）`（MathML）；状态"位移只看起点→终点：Δx = … 格（方向：箭头指向）"。
双编码：箭头方向 + "位移"文字标签。

---

### P0 · spring-scale-pull（两弹簧秤对拉）—— p12.2.3

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `force` | object | — | `{min:0,max:10,step:0.5,init:4}` | 拉力滑块（N） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "spring-scale-pull", params: {
  force: { min: 0, max: 10, step: 0.5, init: 4 },
  badge: { invariant: "没变的是：两个秤都没换" }
} }
```

交互：滑块 → 两弹簧伸长量相同 → 读数永远相等。
输出：读数 `F甲 = F乙 = … N`（MathML）；状态"甲拉乙的力 = 乙拉甲的力：大小相等、方向相反"。
双编码：弹簧伸长量 + 读数文字。

---

### P1 · heat-compare（水 vs 沙子双加热曲线）—— p03.2.2

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mass` | object | — | `{min:0.5,max:2,step:0.5,init:1}` | 质量滑块（kg，水/沙子同质量） |
| `power` | number | — | `500` | 加热功率（W；`c水=4200、c沙=920 J/(kg·℃)` 冻结） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "heat-compare", params: {
  mass: { min: 0.5, max: 2, step: 0.5, init: 1 }, power: 500,
  badge: { invariant: "没变的是：加热功率、质量、初温" }
} }
```

交互：▶/⏸/↺ 播放条（scrubber 隐藏）→ 双 T-t 曲线（沙子橙实线陡、水蓝虚线缓），动画加速 ×20（文案注明"非真实时间"），300s 播完自停。
输出：读数 `加热 …s：水 +…℃，沙子 +…℃`；终态"沙子升温是水的约 4.6 倍"。
双编码：线色 + 线型 + 图例文字。

---

### P1 · sponge-dent（海绵凹陷）—— p06.1.1

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `pressure` | object | — | `{min:0,max:20,step:1,init:8}` | 压力滑块（N；`min` 缺省 0） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "sponge-dent", params: {
  pressure: { min: 0, max: 20, step: 1, init: 8 },
  badge: { invariant: "没变的是：海绵这块" }
} }
```

交互：滑块 → 海绵顶部凹陷曲线深度（∝ 压力）+ 双向箭头标注凹陷量。
输出：读数 `压力 … N → 凹陷 …（示意单位）`；状态"压力越大，海绵凹陷越深（压力作用效果越明显）"。
双编码：凹陷形状 + 深度数字标注。

---

### P1 · paper-blow（吹纸 / 机翼流线）—— p06.1.4

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mode` | string | — | `"paper"` | `"paper"`（吹纸条）/ `"wing"`（机翼流线） |
| `blow` | object | — | `{min:0,max:10,step:1,init:4}` | 吹气强度滑块（档） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "paper-blow", params: {
  mode: "paper", blow: { min: 0, max: 10, step: 1, init: 4 },
  badge: { invariant: "没变的是：纸条/机翼" }
} }
```

`paper`：吹气 → 纸条上飘角度（0–50°）；气流线粗细 ∝ 强度；状态"纸条上方流速快、压强小，被"吸"了起来"。
`wing`：机翼剖面 + 上方 3 条密流线（快）/ 下方 2 条疏流线（慢）+ 升力箭头（长度 ∝ 强度）。
双编码：流线疏密 + "快/慢"文字。

---

### P1 · joule-heating（电流热效应）—— p09.1.3

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `current` | object | — | `{min:0.5,max:3,step:0.1,init:1}` | 电流滑块（A） |
| `resistance` | object | — | `{min:5,max:50,step:1,init:20}` | 电阻滑块（Ω） |
| `time` | object | — | `{min:0,max:60,step:1,init:10}` | 时间滑块（s；`min` 缺省 0） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "joule-heating", params: {
  current: { min: 0.5, max: 3, step: 0.1, init: 1 },
  resistance: { min: 5, max: 50, step: 1, init: 20 },
  time: { min: 0, max: 60, step: 1, init: 10 },
  badge: { invariant: "没变的是：这根电阻丝" }
} }
```

输出：读数 `Q = I²Rt = … J`（MathML，`I²` 上标）；热量条（∝ Q/最大值）；状态"电流翻倍 → 热量变 4 倍；电阻/时间翻倍 → 热量变 2 倍"。
双编码：热量条长度 + 读数文字。

---

### P1 · motor-commutator（电动机换向器慢动作）—— p10.1.3

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "motor-commutator", params: {
  badge: { invariant: "没变的是：磁铁、电源" }
} }
```

交互：▶/⏸/↺（慢放 ×0.2，文案注明"非真实转速"）→ 线圈在 N/S 磁场中转动；换向器两半环（橙 A / 天蓝 B，随线圈转）+ 固定电刷（+ / −）；电流方向每半圈翻转（青绿箭头 + "电流：上→右/上→左"文字）。
输出四步状态：①受力转动 → ②惯性过平衡位置 → ③换向器切换、电流反向（警告态高亮）→ ④继续同向转；读数"已转 … 圈（慢放示意）"。
双编码：半环颜色 + 步骤文字。

---

### P1 · vacuum-tube（真空管：羽毛 vs 硬币）—— p11.2.3

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "vacuum-tube", params: {
  badge: { invariant: "没变的是：管子、羽毛、硬币" }
} }
```

交互："有空气 / 抽成真空"二选（`aria-pressed`，≥44px）→ ▶ 下落：硬币 1.2s 落地；羽毛有空气 3.6s + 左右飘摆、真空 1.2s。
输出：有空气"硬币先落地：空气阻力拖住了羽毛"（警告态）；真空"同时落地 ✓：真空里只受重力，下落一样快"。
双编码：下落快慢 + 结论文字。

---

### P1 · pendulum（虚拟摆）—— p00.1.2（复用 p17.1.2）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `length` | object | — | `{min:0.2,max:1.5,step:0.1,init:1}` | 摆长滑块（m） |
| `mass` | object | — | `{min:0.1,max:1,step:0.1,init:0.5}` | 摆球质量滑块（kg；只影响球大小示意） |
| `angle` | object | — | `{min:5,max:30,step:1,init:15}` | 摆角滑块（°；改动后从该角释放） |
| `badge` | object | — | — | 读数徽章 |

```js
{ type: "pendulum", params: {
  length: { min: 0.2, max: 1.5, step: 0.1, init: 1 },
  mass: { min: 0.1, max: 1, step: 0.1, init: 0.5 },
  angle: { min: 5, max: 30, step: 1, init: 15 },
  badge: { invariant: "没变的是：重力加速度 g" }
} }
```

交互：三滑块 + ▶/⏸/↺（默认播放）；摆角滑块改动后从该角释放（`tV=0`）。
输出：读数 `T = 2π√(L/g) = … s`（MathML）；状态"换摆球质量 / 摆角 → 周期不变；摆长变 → 周期变"。
口径：小角度（≤10°）公式最准（文案注明）；`g=9.8`。
双编码：摆动 + 读数文字。

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
