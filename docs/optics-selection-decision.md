# 光路原语选型裁决书（批2 · ENG-67 落地）

> 裁决方：物理专家队（物理维度）+ 蓝队（工程与许可维度）· 2026-10-17
> 候选：A. 吸收 Ray Optics Simulation 内核（二次封装，vendoring） / B. 自研纯几何实现
> **裁决：B（自研纯几何实现）**。原语落 `assets/engine/optics.js`（`Eng.Optics`），
> 不引入 `assets/vendor/` 新增项，`VENDOR.md` 无需更新。

## 一、候选 A 画像（Ray Optics Simulation，ricktu288/ray-optics）

经 2026-10-17 实测核查（github.com/ricktu288/ray-optics，README"License"节）：

- 许可证：**Apache License 2.0**（Copyright 2016–2026 The Ray Optics Simulation authors and contributors）。
- 形态：完整 Web 应用，ES6 + Webpack 构建；可复用形态为 `npm run build-node` 产出的
  `dist-node/rayOptics.js`（Node 模块版，供其图片生成脚本使用），另有 WebGPU 测试版光线追迹引擎。
- 能力：通用 2D 几何光学场景数值追迹（光源/曲面镜/棱镜/梯度折射率/色散/光栅……）。

## 二、许可证兼容性论证（蓝队）

1. **Apache-2.0 与 MIT 仓库兼容**：两者均为 permissive 许可证。MIT 许可的仓库可以包含
   Apache-2.0 许可的代码：Apache-2.0 不是 copyleft，不要求衍生作品整体改用 Apache-2.0；
   义务仅为保留其 LICENSE 全文、版权声明与 NOTICE（如有），并注明修改之处。
   结论：**许可证不构成吸收的障碍**——若选 A，只需在 `assets/vendor/licenses/` 收录
   Apache-2.0 全文并在 `VENDOR.md` 登记来源/SHA/修改说明即可（参照 JSXGraph 双授权
   选用 MIT 的既有登记体例）。
2. 但"兼容"≠"合适"。许可放行只是必要条件，本次否决 A 的理由是工程性的（见 §三），
   非许可障碍。如实记录，避免后人误以为"Apache-2.0 不能进 MIT 仓库"。

## 三、否决 A 的工程理由（蓝队，逐项）

1. **真值口径相斥**：本批硬要求"光学定律计算驱动、读回字段可被断言逐位核对"
   （`v = 420/13 = 32.3077` 这类精确值）。A 是通用数值光线追迹器，给出的是
   追迹采样点而非公式闭式解；要得到 `1/f = 1/u + 1/v` 的精确读数，还得在外层
   另写公式层——那就等于 B + 一个沉重的追迹器。
2. **体量与可 vendoring 性**：A 的可复用形态需 Node + Webpack 构建产出（`npm run build-node`，
   其 README 注明全量构建约半小时），产物为数 MB 级 bundle；与本仓库
   "零构建、file:// 可跑"（VENDOR.md 加载顺序节）及"vendored 原样迁入、SHA 登记"
   体例冲突，且会冲破"三库 gzip ≤ 400KB"的既有引用口径（坑 6）。
3. **范围错配**：p02 范围 = 凸透镜三条特殊光线 / 平面镜 / 空气→水折射 / 小孔成像，
   全部是闭式解析（物理专家队 §七）。A 的曲面/梯度/色散/光栅能力在本批零使用，
   引入即违反"最小依赖"与 ENG-69（禁半成品——反过来，引入用不上的大半成品亦然）。
4. **可测试性**：`Eng.Optics` 须在无 DOM 的 Node 环境被 `tools/qa-optics-truth.mjs`
   独立断言；A 的 dist-node 为其图片生成管线设计，拖带 node-canvas 等系统依赖
   （其 README"Installation"节明示），与"纯函数可独立测试（Node/无 DOM 只需 core.js）"
   的 circuit.js 体例（ENG-68）相悖。

## 四、选择 B 的理由（联合）

- 四类现象均为闭式几何：薄透镜公式、反射定律（水平分量反向）、斯涅尔定律、
  小孔成像相似三角形——解析解天然精确，满足"逐位核对"；
- 确定性：同输入逐位一致（ENG-70），无数值噪声；
- 零依赖、单文件（预计 < 15KB）、file:// 可跑、无构建，与现有 `assets/engine/*`
  体例一致；
- 读回字段（光线各段端点 / 像距 / 像性质 / i、r 角度）由公式直接给出，可断言；
- 不可用范围诚实返回：全反射（`tir: true`，`r: null`，不给假数，ENG-69；
  本批课页未用，为引擎完备性）。

## 五、与 ENG-67 接口文档的关系

ENGINE.md §6.1 原文为"未来：`Eng.OpticsScene`（封装 Ray Optics Simulation 场景 JSON，
Apache-2.0）"。本次裁决后，§6.1 改写为已落地的 `Eng.Optics` 契约（读回字段/容差/AX01），
`Eng.OpticsScene` 名称退役（从未有实现代码，不存在兼容负担）。

## 六、AX01 显性化口径（随原语交付）

`Eng.Optics` 内置 `AX_DEFAULTS`，课页可直接引用原文（YP-27）：

- 假设（assumptions）：薄透镜近似（透镜厚度忽略不计）；近轴光线（光线与主光轴夹角很小，
  三条特殊光线作图法仅在此成立）；光线模型（忽略波动性，见 p02.1.1-p2"光线是个模型"）；
  平面镜为理想平面；折射界面为理想平面、介质均匀（n₁=1 空气、n₂=1.33 水为示意值）。
- 近似（approximations）：小孔成像按几何直线传播，未计衍射（孔过小反而模糊，见"光线是个模型"模型三问③）；
  孔径→亮度为示意映射非光度学计算。
- 误差估计（errorEstimate）：纯解析闭式计算，无数值积分误差；读数误差仅来自
  ENG-38 估读（末位 ±1 个估读单位）；SVG 绘制坐标保留 1 位小数（角度断言容差 ≤1°）。

学生语言版本已由黄队在课页文案中覆盖（p02.2.2-p3"身份证" conditions：薄透镜、近轴光线；
p02.2.3-p1 point 回引），本批文案冻结、不新增。
