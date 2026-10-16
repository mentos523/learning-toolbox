# 基础引擎层 · 架构与 API 契约（ENGINE.md）

- 版本：2026.10.16.1-dev（目标升版 2026.10.16.1）
- 地位：学习工具箱全学科交互仿真的统一地基。方案 A（用户 2026-10-16 拍板）：
  Planck.js 1.5.1（力学）+ Konva.js 10.9.0（交互渲染）+ JSXGraph 1.14.0（数学作图，MIT 选用）
  三件套地基 + 自研 8 类教育原语层。
- 真值口径：`~/workspace/engine-build/eng-truth-criteria.md`（ENG-01~ENG-69 + ENG-NC01~NC05）
- 教学需求：`~/workspace/engine-build/eng-pedagogy-requirements.md`（YP-01~YP-42）
- 联调原型实证：`~/workspace/engine-proto/PROTO-REPORT.md`（4 原型全 PASS + 6 坑位，全部规避）
- **红线**：本轮零改现有课页；光路/电路本轮只立接口（ENG-69：engine 目录不许出现半成品实现）。

---

## 一、架构（文字图）

```
课页（HTML）
  │  经典 <script> 引入，零构建，file:// 可跑
  ▼
┌─────────────────────────────────────────────────────────────┐
│ assets/engine/  自研教育原语层（单一全局命名空间 window.Eng） │
│                                                             │
│  core.js      Eng.VERSION / 深拷贝 / 播种RNG / AX01校验 /      │
│               误差预算公式 / DataDock / 对比度                │
│  coords.js    ViewportMapper：逻辑(y↑)↔像素 双向换算（ENG-01~05）│
│  driver.js    Driver：固定 dt（默认1/240）/ play/pause/       │
│               step(n)/reset / simTime=N·dt / 快照深拷贝        │
│               （ENG-06~12，原型坑1防御性拷贝）                  │
│  konva-view.js KonvaView：Stage/Layer/DPR/三视口/深色/引导层/   │
│               空态 / renderDataset(数据集)纯函数（ENG-64）     │
│  input.js     Input：pointer统一 / ≥44px命中区 / 拖拽绑定       │
│               （ENG-55~58，原型P2实证）                        │
│  mech.js      力学原语：RigidBody / Incline / SpringMass /     │
│               Pendulum / Pulley / Lever / Collision1D         │
│               （ENG-17~34；原型坑2/3/5规避）                   │
│  meters.js    仪表原语：Ammeter / Voltmeter / Ruler /          │
│               Protractor / Thermometer / Balance / Stopwatch / │
│               GraduatedCylinder / Burette（ENG-35~48；        │
│               估读口径 ENG-38，读数由状态驱动）                 │
│  plot.js      PlotBoard（JSXGraph封装，ENG-49~54；原型坑4     │
│               glider投影语义）/ DataChart（ENG-64~66）         │
│  steps.js     StepPlayer：next/prev/replay/慢放/结论位/键盘    │
│               （ENG-59~63；WeduLab时间轴回放落地）              │
│  guides.js    默认引导文案（YP-01/02/06：动词开头、可覆盖、    │
│               不可清空）                                      │
└─────────────────────────────────────────────────────────────┘
  │  消费（不重算真值，渲染只消费状态）
  ▼
┌─────────────────────────────────────────────────────────────┐
│ assets/vendor/  第三方库（原样 vendoring，见 VENDOR.md）       │
│  planck.min.js  1.5.1  MIT   全局 planck                      │
│  konva.min.js   10.9.0 MIT   全局 Konva                       │
│  jsxgraphcore.js 1.14.0 MIT(双授权选用) 全局 JXG               │
│  jsxgraph.css                                               │
│  三库 gzip 合计 362KB ≤ 400KB 上限（ENG 坑6）                  │
└─────────────────────────────────────────────────────────────┘

加载顺序（缺一不可）：
  planck.min.js → konva.min.js → jsxgraphcore.js →
  core.js → coords.js → driver.js → konva-view.js → input.js →
  mech.js → meters.js → plot.js → steps.js → guides.js
```

### 设计铁律（playbook 落地）

1. **真值断言先于生产**：每个原语构造即带真值参数，真值参数与渲染参数分离存储，
   渲染只消费状态、不重算真值（ENG 总则 1）。
2. **读回一律防御性拷贝**：`state()` / `snapshot()` 返回深拷贝，不许返回活引用
   （ENG-10，原型坑 1：Planck `getPosition()` 返回内部 Vec2）。
3. **确定性**：同场景同序列两次运行快照逐位一致；file:// 与 http 双环境逐位一致
   （ENG-09/11）。物理路径禁用 `Date.now()` / `Math.random()`；教学随机走 `Eng.SeededRNG`。
4. **误差可量化、可文档化**：半隐式欧拉匀加速相对误差恒为 1/N（ENG-13）；
   容差 = 解析容差 + 1/N + 0.05%（ENG-14）；dt↔N 对应表见 core.js `Eng.DT_BUDGET_TABLE`。
5. **近似对学生显性化**：每个原语自带 `assumptions` / `approximations` / `errorEstimate`
   三字段（YP-25），缺一构造即抛错；课页文案直接引用。
6. **命名含单位**（YP-30）：`angleDeg` 不许 `theta`；`gravityMps2` 不许 `g`；
   `lengthM` / `massKg` / `timeSec` / `springConstantNpm` ……
7. **默认值 = 课堂常见配置**（YP-31）：g=9.8、摆长 1m、倾角 30°、电表 0.6A/3V 档等。
8. **求解细节不暴露**（YP-34）：课页作者 API 只见教学语义参数；唯一的例外是 `dt`
   （步长）——按 ENG-06/16 要求显式可配且文档化（误差预算诚实），默认值 1/240，
   课页作者通常无需触碰。

---

## 二、API 契约（按原语）

### 2.1 核心与坐标

| API | 参数 | 读回 | 口径 |
|---|---|---|---|
| `Eng.ViewportMapper({bounds, viewport})` | bounds{xMin,xMax,yMin,yMax}（逻辑单位；力学 1=1m），viewport{w,h}px | `params()` → {scale:px/逻辑, offset:{x,y}px} | ENG-01/02 |
| `logicalToPixel(x,y)` / `pixelToLogical(px,py)` | — | — | ENG-02 公式；往返 ≤0.5px / ≤1e-9（ENG-03） |
| `Eng.Driver({dt, gravityMps2, assumptions, approximations, errorEstimate})` | dt 默认 1/240（ENG-06），gravityMps2 默认 9.8 | `simTimeSec()` = N·dt 精确；`stepCountN()`；`isPlaying()` | ENG-06~12 |
| `driver.step(n)` / `play()` / `pause()` / `reset()` | n 非负整数，恰好 n 步 | — | ENG-07 |
| `driver.snapshot()` / `restore(s)` | — | 深拷贝快照 | ENG-09/10 |
| `Eng.SeededRNG(seed)` | seed 整数 | `seed` 可读回 | ENG-11 |
| `Eng.DataDock` | — | `record(label,value,unit)` / `entries()` / `toCSV()` | YP-17 |
| `Eng.eulerRelErr1overN(N)` / `Eng.tolerance3(解析容差,N)` | — | 1/N；三项和 | ENG-13/14 |

### 2.2 力学原语（mech.js）

通用：构造参数含真值参数 + 初始状态 + `dt` + `material:{friction, restitution}`（ENG-17）；
`state()` 每步可读 positionM/angleRad/velocityMps/angularVelocityRadps/simTimeSec（ENG-19，深拷贝）；
`setTransform({xM,yM,angleRad})` / `setVelocity({vxMps,vyMps,omegaRadps})` 精度 ≤1e-9（ENG-18）。

| 原语 | 关键构造参数（真值） | 读回字段（单位） | 解析对账 | 容差 |
|---|---|---|---|---|
| `RigidBody(driver, {shape:'box', sizeWM, sizeHM})` | 全宽全高（m）；内部 `Box(w/2,h/2)`（ENG-20，原型坑2） | state() 全套 | 自由落体 y=y₀−½gt²（ENG-22；P1 锚点 5.07958m/0.400%） | 0+1/N+0.05%，门限<1% |
| `RigidBody(driver, {shape:'circle', radiusM})` | radiusM（m），读回逐位一致（ENG-21） | 同上 | — | — |
| `Incline(driver, {angleDeg, simTimeSec})` | 倾角（°，默认30）；模拟时长 T_sim（只用于配边长） | sAlongM/sAbsM（m）、angleDeviationDeg、inContact、normalGapM | s=½g·sinα·t²（ENG-23；P4 锚点 9.84083m/0.417%） | 0+1/N+0.05%，门限<2% |
| 边长公式（ENG-24，原型坑5） | `L = ½·g·sinα·T_sim² + marginM`（margin≥2m） | rampLengthM | 断言 T_sim 内始终接触 | — |
| 姿态（ENG-25） | — | angleDeviationDeg ≤ 1°（P4 校准 0.024°） | — | — |
| `SpringMass(driver(g=0), {springConstantNpm, massKg, equilibriumXM, amplitudeM})` | k（N/m）默认10，m（kg）默认1 | displacementM、springForceN（读回位置的瞬时胡克力） | ENG-26：\|F+k(x−x₀)\| ≤ 1e-9 | 精确 |
| 周期（ENG-27） | — | `measurePeriodSec()`（过零点法） | T=2π√(m/k) | (ωdt)²/24+0.05% |
| `Pendulum(driver, {lengthM, initialAngleRad, pivotM})` | 摆长（m）默认1，初摆角默认 0.08rad（≤5°） | angleRad + angleDeg 双读回 | ENG-28：T=2π√(L/g)（P1 锚点 2.84002s/0.055%） | θ₀²/16+0.02%+0.05%，门限<2% |
| 大摆角（ENG-29） | θ₀>5° → `beyondSmallAngle=true`，供文案显性化 | beyondSmallAngle | — | — |
| `Pulley({ropeSegmentsN, loadWeightN})`（理想解析） | 绳段数 n（整数≥1），负载 G（N） | tensionN=G/n（ENG-30，≤1%）；`pullRopeM(d)` 后 loadRiseM | s绳=n·s物 逐位（ENG-31，≤1e-9） | 解析精确 |
| `Lever({arm1M, arm2M, force1N, force2N})`（理想静态） | 力臂（m），力（N）；默认 0.3/0.6/20/10（平衡） | torque1Nm/torque2Nm/netTorqueNm（逆时针为正）、isBalanced、tipDirection、angleDeg | ENG-32：平衡摆位静置2s偏离≤1°；失衡方向断言 | 解析精确 |
| 力矩（ENG-33） | — | \|τ读回−rF·sinθ\| ≤ 1e-9 N·m | — | — |
| `Collision1D({mass1Kg, mass2Kg, velocity1Mps, velocity2Mps, initialGapM, radiusM})`（解析，可选） | v1>v2（否则抛错） | momentumBefore/After、analyticV1pMps/V2pMps、hasCollided | ENG-34：动量守恒 ≤1e-6；末速度 ≤2% | 解析精确 |

> 超出"一维、完全弹性"的碰撞演示按 ENG-NC01 标不可对账（定性演示，只验确定性）。

### 2.3 仪表原语（meters.js）

通用：`getValue`（被测对象状态回调，ENG-35，不许写死）；
`dataSource{kind, ref}`（ENG-65）；AX01 三字段；`readValue()` / `readText()` /
`claimValue()`（YP-16 数值宣称）/ `recordData(label)`（YP-17）/
`pointerAngleDeg(v)` / `valueFromPointerDeg(a)`（ENG-47 ≤0.5分度）；
引导文案可覆盖、不可清空（YP-06）。

| 仪表 | 构造（制式） | 估读口径（ENG-38） | 读回示例 |
|---|---|---|---|
| `Ammeter({rangeMaxA: 0.6\|3, getValue})` | 分度 0.02 / 0.1 | 0.01 A / 0.01 A（2 位） | 0.356A→"0.36 A"；接线柱 "0.6A"（ENG-40） |
| `Voltmeter({rangeMaxV: 3\|15, getValue})` | 分度 0.1 / 0.5 | 0.01 V / 0.1 V | 2.456V→"2.46 V"；接线柱 "3V"（ENG-39） |
| `Ruler({divisionMm, wornZero, sight})` | 分度默认 1mm | 0.1 mm | 磨损尺两端读数法（PHY-R05）；视线 over/under 真实偏差 ±0.2·分度并标注（YP-14） |
| `Protractor({divisionDeg, clockwise})` | 分度默认 1° | 0.1° | 内外圈由 clockwise 声明（读反=FAIL） |
| `Thermometer({divisionC, rangeMinC, rangeMaxC})` | 分度默认 1℃ | 0.1℃ | 零下带负号（PHY-R06） |
| `Balance({weightsG, riderG})` | 游码分度 0.1g | **不估读**，读到 0.1g（ENG-38 特例） | 游码以左侧刻线为准（PHY-R07） |
| `Stopwatch({driver})` | 读数=floor(simTime×10)/10 | **不估读**，读到 0.1s | 由 simTime 驱动（ENG-43） |
| `GraduatedCylinder({getValue})` | 分度强制 1mL（0.1mL 构造即抛错，ENG-44 🔴） | 0.1 mL | 视线平视（PHY-R04） |
| `Burette({getValue})` | 分度 0.1mL | 0.01 mL（ENG-45） | — |

估读总规则（ENG-38）：分度值十进制首位为 1 → 估读到下一位；为 2/5 → 估读到本位；
天平/停表特例不估读。实现：`Eng.estimateReading(value, division, {noEstimate})`。

### 2.4 作图原语（plot.js）

| API | 说明 | 口径 |
|---|---|---|
| `PlotBoard({containerId, bounds, viewportWPx, viewportHPx})` | JSXGraph 封装；内部 boundingbox 按 mapper 等比参数反推，换算与渲染层同源 | ENG-05（≤0.5px） |
| `functionGraph({fn, domain, name})` + `checkFunctionSamples(rec, 21)` | 21 点采样 \|y−f(x)\| ≤ 1e-9 | ENG-49 |
| `point/line/circle/polygon/angle` + `readPoint(p)` | 构造关系逐项验证（≤1e-9）；坐标读回 1e-9 | ENG-50/52 |
| `slider({min,max,step,initial,pos,name})` | `setValue(v)` 后 `value()` 逐位一致；绑定点 (v,f(v)) | ENG-51（P3 校准） |
| `gliderOnCurve(rec, x0, y0)` + `checkGliderProjection(g, rec, drop)` | **最近点投影语义**（原型坑4）：\|Qy−f(Qx)\|≤1e-9；Q 为落点最近点 ±1e-9 | ENG-53/54 |
| `DataChart(view, {chartKind, valueMin, valueMax, dataSource})` | 图=render(数据集)；非法输入拒绝渲染+错误态 | ENG-64/65/66 |

### 2.5 分步播放器（steps.js）

| API | 说明 | 口径 |
|---|---|---|
| `StepPlayer({primitive, stepsPerFrame=1, totalFrames, stepSummaries[], onBeforeNext})` | 缺任一步结论即抛错（YP-22）；预测钩子（YP-19） | ENG-59~63 |
| `next()` / `prev()` / `gotoFrame(i)` / `replay()` | prev 回精确快照；replay=reset+重放到末帧（末帧逐位一致） | ENG-59/60 |
| `frameIndex()` / `totalFramesCount()` / `stepSummary(i)` | frameIndex = stepCount/stepsPerFrame（整除） | ENG-61 |
| `frameSnapshot(i)` | = 驱动器同一步数快照（逐位一致） | ENG-62 |
| `setSpeed(r)`（0<r≤1） | 只改变 wall-time 步数，不改变 dt | ENG-63 |
| `bindKeys(el)` | ←→ 步进、空格 播放/暂停、R 重播（YP-11） | — |

后退/重播不清空学生数据坞（YP-20/21：player 不碰 DataDock）。

### 2.6 输入与渲染基座

| API | 说明 | 口径 |
|---|---|---|
| `KonvaView({containerId, bounds, viewportWPx, viewportHPx, theme})` | Stage/Layer；H 按 16:10 取整；`setViewportW(390/820/1366)`；深色主题；DPR | ENG-04 |
| `view.showGuide(text)` / `showEmpty(hint)` | 引导层（动词开头；空白回退默认，YP-06）；空态占位（YP-03） | YP-01/02/03 |
| `view.renderDataset(dataset, renderFn, dataSource)` | 图=render(数据集)纯函数；缺声明抛错 | ENG-64/65 |
| `Input(view)` + `bindDrag(node, {onEnd})` + `ensureHitArea(node)` | pointer 统一鼠标/触控；命中区 ≥44px（ENG-56）；拖拽落点=读回位置（ENG-57） | ENG-55~58 |
| `Eng.prefersReducedMotion()` | reduced-motion 时用分步播放器等效替代连续动画（YP-09） | — |

### 2.7 补间原语（tween.js）

| API | 说明 | 口径 |
|---|---|---|
| `Eng.Tween({durationMs, onUpdate, onDone, ease, deterministic, reducedMotion})` | 通用补间；`onUpdate(u)` 签名与 geom-process.js §B 一致；`ease` 默认 easeInOutCubic | ENG-70~72 |
| `tw.start()` / `cancel()` / `seek(u)` / `replay()` | `start` 前先 `cancel` 旧循环（不许残留双 rAF）；`seek` 精确定位；`replay`=回 0 再播 | ENG-71 |
| `tw.sample(u)` / `tw.u()` / `tw.isDone()` / `tw.isReduced()` | `sample(u)`：u→状态纯函数（deterministic 断言入口）；`reducedMotion` 可注入供断言 | ENG-70/72 |
| `Eng.Tween.easeInOutCubic` | 默认缓动纯函数；断言可独立计算期望 | ENG-70 |

> 来源：B 期从 `modules/math/js/geom-process.js` §B 提升（waveA-design.md §6.2）。
> 不进引擎的（探针反写映射 / petal-strip / complete-square-lab）留数学侧，不许硬塞。

---

## 三、真值口径摘要（引用 ENG 编号）

- 坐标：ENG-01（y 向上）/02（换算公式）/03（往返 ≤0.5px / ≤1e-9）/04（三视口）/05（双层同源 ≤0.5px）。
- 驱动器：ENG-06（固定 dt，默认 1/240）/07（播放语义）/08（simTime=N·dt）/09（逐位一致）
  /10（防御性拷贝）/11（双环境一致）/12（reset 语义）。
- 误差：ENG-13（ε=1/N 闭式）/14（容差三项和 + dt↔N 对应表）/15（AX01 文案显性化）
  /16（文档声明 dt/N/预算/锚点）。
- 力学：ENG-17（构造规范）/18（摆位 ≤1e-9）/19（每步读回）/20（Box 半宽半高）/21（圆半径）
  /22（自由落体，P1 锚点）/23（斜面，P4 锚点）/24（边长公式）/25（姿态 ≤1°）
  /26（胡克 ≤1e-9）/27（弹簧周期）/28（单摆周期，P1 锚点）/29（摆角边界）
  /30（F=G/n）/31（s绳=n·s物）/32（平衡条件）/33（力矩）/34（一维弹性碰撞）。
- 仪表：ENG-35（状态驱动）/36（刻度尺）/37（量角器）/38（估读总规则）
  /39（电压表）/40（电流表）/41（温度计）/42（天平）/43（停表）/44（量筒）/45（滴定管）
  /46（刻度均匀 ≤5%）/47（指针一致 ≤0.5 分度）/48（深色/无障碍 WARN）。
- 作图：ENG-49（函数采样）/50（构造关系）/51（滑杆）/52（坐标读回）/53（glider 投影）
  /54（拖拽约束保持）。
- 输入：ENG-55（触控鼠标同一语义）/56（≥44px）/57（落点分毫不差）/58（命中测试）。
- 播放器：ENG-59（前进/后退）/60（重播）/61（步数读回）/62（帧快照一致）/63（慢放）。
- 数据驱动：ENG-64（图=render(数据)）/65（数据源声明）/66（非法输入拒绝）。
- 补间：ENG-70（确定性：同 u 逐位一致）/71（可中断：start 前 cancel 旧循环）
  /72（reduced-motion 降级为首末两态）。
- 光路/电路：ENG-67/68（接口文档）；ENG-69（禁半成品实现）。
- 不可对账：ENG-NC01（多体堆积/非弹性/二维斜碰）/NC02（教学故意反例须配说明）
  /NC03（流体浮力近似力场）/NC04（波动干涉可视化）/NC05（自由数据输入）。

校准锚点（验证套件必须复现）：单摆 2.84002s（0.055%）/ 自由落体 5.07958m（0.400%）/
斜面 9.84083m（0.417%）/ 拖拽 (580,380) 分毫不差 / 滑杆 (2.5,6.25) 精确 / glider 投影精确 /
reset→step(60)→0.5s 精确 / 双环境逐位一致。

---

## 四、误差与近似显性化口径

1. **半隐式欧拉误差是已知、可控、可文档化的行为，不是缺陷**（原型坑 3）。
   匀加速相对误差恒为 ε=1/N（ENG-13），与加速度无关。
2. 每个力学原语的文档节必须声明：所用 dt、对账时长 T、1/N 预算值、实测校准锚点（ENG-16）。
3. 凡向学生展示数值仿真结果的页面，须配"数值积分近似，误差约 1/N 量级"量级的说明
   （ENG-15，措辞黄队终审）。
4. 理想化假设（无摩擦/轻绳/轻滑轮/轻质杠杆/小角度近似/无阻尼/理想电表……）必须以学生语言
   出现在课页文案，API 字段提供原文，课页作者直接引用（YP-27）。
5. 已知近似的失效边界要写出来（如"摆角 <5°"）；写不出的声明"边界未知、仅用于定性理解"
   （YP-28）。
6. 课页文案禁止宣称"精确值"（YP-26）；数值宣称必须走 `claimValue()` / `readValue()`，
   可被断言校验（YP-16，playbook"数值宣称"门禁）。

---

## 五、迁移指南（课页从旧组件切到引擎原语）

1. **数据格式加 `engine` 字段**：课页/模块数据声明所用原语与真值参数，例如
   ```json
   { "engine": { "primitive": "Pendulum", "version": "2026.10.16.1",
                 "params": { "lengthM": 1.0, "initialAngleRad": 0.08 } } }
   ```
   旧渲染器保留为兼容层，直到其章节全部迁移完毕再退役（方案 A 迁移路线）。
2. **读数/判分走真值 API**：练习判分按容差判定（±1 估读位，YP-15），不许精确字符串匹配；
   课页文案中的数值必须能从 `readValue()` / `claimValue()` 对上（YP-16）。
   数学探针的"读数走真值 API"口径已在 `modules/math/js/eq-bind.js` 落地：
   读数行 `readout: function () { return evalR(state.x); }`——读数走解析求值器（真值），
   不读 DOM 渲染文本；各学科复用此口径。
3. **引导文案**：沿用原语默认引导（YP-01/02），可覆盖、不可清空（YP-06）；
   文案承诺的"点/拖/试"必须真实可交互（YP-04）。
4. **图表**：一律经 `DataChart`（数据源声明），不许手绘无源图（YP-17，ENG-64/65）。
5. **验证**：迁移后的课页跑 `tools/engine-verify/` 对应验证页 + 位图正确性断言
   （playbook 新规：位图正确性必须写成程序断言，列为上线门槛）。

---

## 六、光路 / 电路原语接口规范（光路仍只立接口；电路已于 2026.10.16.8 落地实现，ENG-67/68/69）

> 本轮交付物为接口签名与序列化 schema，不含求解代码。
> `assets/engine/` 中不许出现光路/电路的半成品实现（ENG-69）。

### 6.1 光路（ENG-67）

```js
// 未来：Eng.OpticsScene（封装 Ray Optics Simulation 场景 JSON，Apache-2.0）
var scene = Eng.OpticsScene({
  containerId: '...',
  elements: [
    { type: 'laser', xM: 0, yM: 0, angleDeg: 0 },       // 激光
    { type: 'mirror', x1M:.., y1M:.., x2M:.., y2M:.. }, // 反射镜
    { type: 'lens', xM:.., yM:.., focalLengthM:.. },   // 透镜
    { type: 'prism', pointsM: [[..],[..],[..]] },      // 棱镜
    { type: 'screen', x1M:.., y1M:.., x2M:.., y2M:.. } // 光屏
  ],
  assumptions: [...], approximations: [...], errorEstimate: '...' // YP-25 预留
});
// 序列化（摆位）：scene.toJSON() / Eng.OpticsScene.fromJSON(json)
// 读回：scene.rayPaths() → [{pointsM:[{x,y}...], wavelengthNm}]（SI 单位）
```

### 6.2 电路（ENG-68）——2026.10.16.8 已落地实现（`assets/engine/circuit.js`）

> 实现：`Eng.Circuit`（求解器）+ `Eng.CircuitUI`（Konva 交互层，解耦：UI 只消费
> `ckt.snapshot()`）。真值口径：`~/workspace/circuit-build/design/circuit-truth-criteria.md`
>（CIR-01~48，独立复验 56/56 PASS）。physics.js 课页迁移接线待后续版本。

```js
var ckt = Eng.Circuit({
  elements: [
    { type: 'source', voltageV: 6 },                    // 电源（本期仅单电源）
    { type: 'resistor', resistanceOhm: 10 },            // 电阻
    { type: 'bulb', resistanceOhm: 5 },                // 灯泡（阻值视常量，NC-3）
    { type: 'switch', closed: true },                  // 开关
    { type: 'wire', from: 'n1', to: 'n2' }             // 导线
  ],
  topology: { nodes: ['n0','n1','n2'], connections: [...] },  // 显式拓扑：每元件恰一条 connection
  assumptions: ['导线电阻视为 0', '电源无内阻', ...],          // AX01 字段，课页直接引用
  approximations: ['集总参数模型', ...],
  errorEstimate: '...' // YP-25 预留
});
```

- **求解器范围**：二期简化求解器——欧姆定律 + 串并联公式直算；纯函数
  `Eng.Circuit.solve(elements, topology, contract) → result`；直流稳态、集总参数、
  单电源；电流方向以 connection 的 from→to 为正；浮点比对容差 1e-9。
- **读回 API**：`ckt.nodeVoltageV(nodeId)` → V；`ckt.branchCurrentA(branchId)` → A；
  `ckt.ammeterReadA(meterId)` / `ckt.voltmeterReadV(meterId)` → 一律走
  `Eng.estimateReading` 按 ENG-38 估读；`ckt.snapshot()`（深拷贝，ENG-10）；
  `ckt.reductionLog()`（归约回放，CIR-10 对账用）；`snapshot().prunedEdges`（死边剪枝清单）。
- **topology 形态**：`{ nodes: [...], connections: [...] }` 显式拓扑；悬空开关/断口
  按 CIR-11/CIR-14/CIR-40 判 `open`（不许悬空仍显示通路）；死边剪枝不误判 unsupported。
- **状态全集**：`closed` / `open` / `short` / `burned` / `unsupported` / `no-source`；
  `open` 时支路电流 0，浮空节点电压 NaN；`unsupported`/`no-source` 时数值读回全 NaN、
  表计读回 unreadable（不给假数，ENG-69）。
- **6 类 unsupported 诚实返回**：NC-1 不可串并联归约拓扑（电桥/Δ形）→ `unsupported`；
  NC-2 多电源（≥2）→ `unsupported`；NC-3 非线性元件（灯丝温度特性，阻值视常量）；
  NC-4 交流/暂态/电容/电感不建模；NC-5 表计非理想内阻（电流表内阻 0 / 电压表内阻 ∞，
  assumptions 显性化）；NC-6 导线电阻/接触电阻/电源负载特性（视 0 / 理想恒定）。
  NC-1/NC-2 为"诚实拒绝"，读回全 NaN，不许给假读数（ENG-69 的具体落实）。

### 6.3 数学侧新原语契约摘要（eq-bind.js / geom-process.js，波 A 落地）

> 数学侧自实现（waveA-design.md §6.3 结论：不扩展 Eng.PlotBoard，引擎只收敛
> tween/探针口径）。以下 6 原语已随波 A 上线（2026.10.16.6），契约摘要备查；
> 探针反写映射 / petal-strip / complete-square-lab 留数学侧，不进引擎（§6.2 口径）。

| 原语（注册名） | 位置 | 读回/钩子 | 真值口径 |
|---|---|---|---|
| EqGraphLab（`eq-graph-lab`，含 kind=system2x2） | eq-bind.js | `__eqbind.setX/sliderValue/readout/probeCount/probeX/dragProbeTo/solutionMarks`；`sysSolution/sysSetCoeff/sysDragTo/sysDegenerate/sysResiduals` | 解析闭式（求根公式/二分 1e-9）；读数走 `evalR` 真值求值器（YP-16）；拖探针走同一 `setX` 入口 |
| IneqShadeLab（`ineq-shade-lab`） | eq-bind.js | `__eqbind.ineqSetSource/ineqSolutions/ineqHoldsAt` | 边界开/闭与方向按 (b, 左邻, 右邻) shading 判定 |
| MorphToggle（`morph-toggle`） | geom-process.js | `__geomproc.seek/u/play/straightness/shapeCount/keyGeom`；tween 层已 promotion 为 `Eng.Tween`（§2.7） | 中间态 = 线性插值期望（容差）；末态与 compare-toggle 旧 view1 截图一致 |
| SysLab（`sys-lab`） | eq-bind.js | `__eqbind.syslabSet/syslabReadouts/syslabPoint` | 读数走表达式真值求值；点位 = 独立求值逐位一致 |
| SysSteps（`sys-steps`） | eq-bind.js | 分步播放器语义 | 与 Eng.StepPlayer 同步（ENG-59~63 口径参照） |
| StaticCompare（`static-compare`） | eq-bind.js | 静态对照渲染 | 基线截图存档，morph 必须"到达"原终态 |

正式复验脚本：`tools/waveA-verify.mjs`（静态门 + headless 抽查）、
`tools/waveA-sysint-verify.mjs`（SYS-INT 7 钩子正式断言，8/8 PASS）。

## 七、文件清单

```
assets/vendor/
  planck.min.js  konva.min.js  jsxgraphcore.js  jsxgraph.css
  licenses/（4 份许可证全文）  VENDOR.md
assets/engine/
  core.js  coords.js  driver.js  konva-view.js  input.js
  mech.js  meters.js  plot.js  steps.js  guides.js
  tween.js  circuit.js
docs/ENGINE.md（本文件）
tools/engine-verify/
  verify.css  verify-lib.js  run-verify.cjs
  v-coords.html  v-driver.html
  v-mech-rigidbody.html  v-mech-incline.html  v-mech-spring.html
  v-mech-pendulum.html  v-mech-pulley-lever.html  v-mech-collision.html
  v-meters-electrical.html  v-meters-length-angle.html
  v-meters-thermo-balance.html  v-meters-lab.html
  v-plot.html  v-input.html  v-steps.html  v-data-chart.html  v-konva-view.html
  v-tween.html
```

验证：`node tools/engine-verify/run-verify.cjs`（headless Chromium 真实 file:// 打开；
结果与截图见 `~/workspace/engine-build/evidence/`）。
