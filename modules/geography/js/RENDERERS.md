# 地理模块渲染器清单（蓝队 · 批 2）

> 注册表：`js/geography.js` 内 `WIDGETS`（经 `window.GEO.registerWidget` 注册）。
> 本文件 6 个类型全部在 `js/geo-batch2-widgets.js` 实现（模块层；
> 未达引擎层通用原语标准，不注册 `window.Eng.*`）。
> 渲染器返回视图对象 `{state(), truth?(), resize(), destroy(), labelFonts()}`；
> `geography.js` 将其挂载为 `box._geoView` 供白队/QA 程序断言。
> 纯函数真值层暴露为 `window.GeoBatch2`（`judgeZone / classifySeason /
> judgeClimate / calcTimezone / calcScale / scaleTextOf`）——
> 课页渲染与白队断言共用同一函数（GEO-R30）。

通用：零外部请求；深浅双色走 `--geog-*`；触摸热区 ≥44px；
记录键 `geog_<类型>_<课号>`（B1）；canvas 文字字号只用 V8 阶梯
`{12.48, 13.6, 15.2, 16, 16.8, 20, 24}px`；HTML 文字用 `.fs-078…` 工具类；
SVG 矢量文字随视口缩放（非 px 固定，不适用阶梯）。

## 1. globe-spin（G1 · 自绘示意地球仪）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mode` | string | — | `"explore"` | `"explore"`（自由旋转＋点读坐标）/`"find"`（按 `targets` 点选闯关） |
| `targets` | array | find 必填 | `[]` | `{name, lat, lon}`（度；东经/北纬为正；先纬后经） |
| `graticuleStep` | number | — | `30` | 经纬网间隔（15/30 二选一） |
| `showGraticule` | boolean | — | `true` | 经纬线开关（可配初始态） |
| `showLabels` | boolean | — | `true` | 赤道/本初子午线/回归线/极圈文字标注 |
| `polarView` | boolean | — | `false` | 极点视角按钮（北极俯视/南极俯视/复原） |
| `tolerance` | number | — | `5` | find 点选容差（度，B6 ±5°） |
| `spinHint` | boolean | — | `true` | “拖一拖，转地球”提示（3 秒消失） |
| `labels` | array | — | 全部 | 大洲名标注白名单（如 `["亚洲","非洲"]`） |
| `landStyle` | string | — | `"schematic"` | 冻结：示意色块，不画国界线（GEO-R23） |
| `recordKey` | string | — | `geog_globe-spin_<页id>` | |

- 正射投影解析式（拖拽旋转＋惯性 ≤600ms；reduced-motion 跳过惯性）；
  点按反算经纬度 → 读数徽章（先纬后经，GEO-R38）＋小字“经线指示南北 · 纬线指示东西”（GEO-R35）。
- 极点视角自转箭头沿经度增大方向绘制 → 北极逆时针/南极顺时针（GEO-R37）。
- `state()` → `{rotation:{lon,lat}, tap:{lat,lon}|null, find:{idx,done,total}|null}`。

## 2. scale-calc（G8 · 比例尺换算）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mode` | string | — | `"calc"` | `"convert"`（三式互换）/`"calc"`（图上↔实地）/`"compare"`（大详小略） |
| `scales` | array | ✅ | — | `{rep:"1:50000", text:"图上 1 厘米代表实地 500 米", bar:{unit:"cm",segments:4}}` |
| `problem` | object | calc | `{mapDistCm:2}` | 图上距离（cm）；期望答案由 `rep` 分母算出 |
| `compareMaps` | array | compare | — | `{denom, label}` 两幅（示意） |
| `tolerance` | string | — | `"1%"` | 换算容差 ±1%（GEO-R21） |
| `recordKey` | string | — | `geog_scale-calc_<页id>` | |

- calc 分步：①公式（选择）→ ②代入（cm）→ ③换算单位（桥梁句“1千米=100000厘米”，GEO-R20），每步可验证。
- 口诀「大详小略」＋换算句「分母越小、比例尺越大」逐字（GEO-R18/19）；compare 滑块联动范围框＋“范围/详细程度”双读数，示意声明常驻。
- `state()` → `{mode, denom, mapDistCm, expected:{cm, final, unit}}`（calc）。

## 3. profile-draw（地形剖面绘制）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `line` | object | ✅ | — | 剖面线 `{from:[x1,y1], to:[x2,y2]}`（逻辑坐标 0–100，y 向上） |
| `samples` | number | — | `7` | 采样点数 |
| `verticalExaggeration` | number | — | `2` | 垂直夸大倍数（标注常驻，GEO-R28） |
| `toleranceM` | number | — | `40` | 判分容差（米）：\|你的高程−真值\| ≤ 容差 |
| `recordKey` | string | — | `geog_profile-draw_<页id>` | |

- 真值＝`Eng.ContourField.elevationAt`（与 contour-3d 同一函数，GEO-R30）。
- 学生拖采样点描绘起伏 → 提交判分 → 真值虚线对照。
- `truth()` → 场函数真值（场层）；`state()` → 学生值＋逐点误差（UI 可达）；两者分开上报。

## 4. climate-chart（G4 · 气候判读器）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `stations` | array | — | 气候站点表 12 站 | `{name, temp[12], precip[12], year}`（`year` 必填，GEO-R16） |
| `mode` | string | — | `"guided"` | `"guided"`（第②步完成第①步前锁定）/`"free"`（可跳步，顺序反提示） |
| `stepOrder` | string | — | `"temp-first"` | 判读步序（`"temp-first"`：先温后水，GEO-R13） |
| `axisNote` | string | — | — | 坐标轴/图例诚实注记（GEO-R16/17 常驻文案） |
| `compareMode` | boolean | — | `false` | 三地对比（纵向排布，自动判读徽章） |
| `climateLib` | string | — | `"内置"` | 类型库引用名（只传引用，不内嵌规则） |
| `recordKey` | string | — | `geog_climate-chart_<页id>` | |

- 第①步点气温曲线最低点 → 最冷月读数 → 温度带徽章（GEO-R14 阈值逐字）；
  第②步点降水柱 → 年降水“约 Nmm”（GEO-R54）＋季节分配五选一
  （GEO-RULING-2026-10-17-07）→ 类型徽章（与类型库一致，GEO-R15）。
- 伦敦站走 `needsRuling` 例外路径：先示口诀直读，再“看分布与成因”定温带
  （GEO-RULING-2026-10-17-04）；拉萨站走 `isPlateau` 路径（看海拔，口诀之外）。
- 图例“红=气温、蓝=降水”常驻（GEO-R16/17）。
- `state()` → `{station, mode, step1, step2, auto:{zone, season, typeId, typeName, via}}`；
  `auto` 即 `GeoBatch2.judgeClimate(station)`（渲染与断言同一函数）。

## 5. timezone-calc（G6 · 区时计算）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `cities` | array | — | 时区城市表 14 城 | `{name, zone, lon}`（冻结字段，B7） |
| `knownCity` | string | ✅ | — | 已知地（`cities` 中的 name） |
| `knownTime` | object | ✅ | — | `{hour, minute}`（24 小时制） |
| `knownDate` | object | — | — | `{month, day}`（可选；无则显示 当日/次日/前日） |
| `recordKey` | string | — | `geog_timezone-calc_<页id>` | |

- 四步冻结「定时区 → 定东西 → 加减小时 → 看日期」（GEO-R09），一步一核对。
- 定东西按经度增大方向（自转方向），箭头画在时区盘上＋“东/西”文字，不以屏幕左右为准（GEO-R08）；
  冻结方向基准文案；`dateLineAlert` 常开不可关：时区差 >12h 即提示跨 180°，
  “自西向东越过日界线日期减一天 / 自东向西加一天”（GEO-R10）。
- “北京时间 = 东八区区时，不是北京的地方时”（GEO-R11）；整小时教学口径（GEO-R12）。
- `state()` → `{known, target, steps:[{n, unlocked}], result:{timeStr, dayOffset, crossed180}|null}`；
  `GeoBatch2.calcTimezone` 为纯函数（README §2.3 洛杉矶→苏瓦样例：10/17 10:00 → 10/18 06:00）。

## 6. plate-puzzle（G9 · 板块拼图）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `mode` | string | — | `"drift"` | `"drift"`（南美—非洲拼合）/`"plates"`（六大板块＋边界箭头） |
| `pieces` | array | — |  sa/af | drift 拼块 `[{id}]`（示意轮廓，无国界线） |
| `evidences` | array | — | 3 项 | `{kind:"fossil"/"strata"/"glacier", label, at:[x,y]}` |
| `boundaries` | array | — | 3 项 | `{kind:"convergent"/"divergent", label, at:[x,y]}` |
| `driftAnim` | boolean | — | `true` | 漂移示意两帧切换（“示意，非真实速度”） |
| `recordKey` | string | — | `geog_plate-puzzle_<页id>` | |

- 拼合判定：拼块中心距槽位 ≤8 逻辑单位 → 吸附＋“严丝合缝 ✓”；两块拼好后三证据点亮（点看一句说明）。
- plates：六色定版（亚欧黄/非洲橙/印度洋红/太平洋蓝/美洲绿/南极洲灰）＋板块名文字；
  边界箭头“挤压”（相向）/“张裂”（相背）＋文字（双编码）；不用“消亡/生长边界”（超纲词）。
- 数量级徽章冻结「板块一年移动几厘米——指甲长的速度」（GEO-R55/B9）；
  “软流层是塑性固体…”边界句常驻。
- `state()` → drift `{pieces:{id:{x,y,snapped}}, bothSnapped, evidencesLit[]}` /
  plates `{selectedBoundary, boundaries}`。

## 7. schematic-toggle（批 3 · P1 · 世界政区示意多版着色切换）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `title` | string | — | `"世界政区示意"` | 组件标题 |
| `blurb` | string | — | — | 说明文字（切换引导） |
| `views` | array | ✅ | — | `[{id, label}]`；`id` ∈ `"area"`（按面积分档着色）/`"pop"`（按人口分档着色）/`"dev"`（发达/发展中二分着色） |
| `regions` | array | ✅ | — | `{name, x, y, area?, pop?, dev?, note?, lab?}`；`x/y` 为 0–100 示意坐标；`area` 万 km²（约）；`pop` 亿（约，2024）；`dev` 为 `"developed"`/`"developing"`；`note` 读数补充（允许 `<strong>`）；`lab` 为 `[dx,dy]` 标签防撞偏移 |
| `valueNote` | string | — | — | 数据年份/来源声明（GEO-R52 常驻） |
| `mapNote` | string | — | B14 变体 | 示意声明（GEO-R24 常驻） |
| `recordKey` | string | — | `geog_schematic-toggle_<view>` | 新前缀 `ltb-geo-` 直写 |

- 自绘示意：大洲示意色块（虚线框）＋国家示意圆点，**不画国界线**（GEO-R23/批 5 前审定缺口）；赤道示意线常驻。
- area 视图三档：`<100` / `100–900` / `≥900`（万 km²）；pop 视图三档：`<1` / `1–10` / `≥10`（亿）；dev 视图：蓝 = 发达、橙 = 发展中。
- 交互：顶部视图切换按钮（`aria-pressed`）＋圆点点击（透明命中圆 r=6.5）＋下方区域按钮列表（≥44px，键盘可达）；读数面板显示名称＋本视图数值＋`note`。
- `state()` → `{view, region, regions}`；`_select(i)` / `_setView(id)` 供程序断言。
- 落点：dg05.1.1-p2（面积/人口两版）、dg05.1.2-p2（发达/发展中南北格局）。

## 8. americas-profile（批 3 · P2 · 美洲西—中—东三段式示意剖面）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `samples` | number | — | `7` | 采样点数（沿西→东等距） |
| `verticalExaggeration` | number | — | `2` | 垂直夸大倍数（标注常驻，GEO-R28） |
| `toleranceM` | number | — | `400` | 判分容差（米，示意数故放宽）：\|你的高程−示意真值\| ≤ 容差 |
| `segments` | array | — | 西/中/东三段 | `{from, to, label, sub}`（x∈0–100 示意距离） |
| `recordKey` | string | — | `geog_americas-profile_<页id>` | |

- 真值＝`window.GeoBatch3.americasElev(x)`（教学示意高程函数，**非真实美洲 DEM**）：
  西部高山系示意主峰 ~3200m（x=14）/ 中部平原示意 ~150m / 东部高原山地示意 ~1100m（x=82）——
  只保证"西高—中低—东中"三段趋势，数值不许当真实高程引用（GEO-R30 类比：渲染与断言共用同一函数）。
- 学生拖采样点描绘三段起伏 → 提交判分 → 示意真值虚线对照；`truth()`（场层）与 `state()`（UI 可达）分开上报（GEO-RULING-2026-10-17-03）。
- 三重诚实显性化：徽章"示意｜非精确比例｜示意高程"＋诚实清单（教学示意模型、示意数只看趋势不记数值、横轴示意距离）＋课页文案；`state()` → `{submitted, score, total, toleranceM, points[]}`。
- 落点：dg06.2.2-p2（西—中—东三段式示意剖面练习，真交互）。
- 注：批 2 profile-draw 的真值为 dg01.3.3 教学示意高程场，沿西→东线剖面呈随机起伏（实测如 [0,1,11,-169,74,21,15]），与"西高—中低—东中"趋势不符——
  用其教美洲三段式会歪曲所教规律（GEO-R26），故本渲染器另立示意真值，不复用 profile-draw。

## 9. factor-scale（批 4 · 单因子滑块 → 分档读数）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `title` | string | — | `"单因子实验"` | 组件标题 |
| `intro` | string | — | — | 操作引导 |
| `glyph` | string | — | `"none"` | 示意配图：`"monsoon"`（西南季风箭头，粗细随值）/`"latitude"`（纵向温度梯度条＋纬度标记）/`"forest"`（树冠随破坏消退）/`"none"`（无配图） |
| `factor` | object | ✅ | — | `{name, min, max, init, unit, lowLabel, highLabel}`（滑块定义；`init` 越界自动钳制） |
| `bands` | array | ✅ | — | `[{max, label, outcome, note?}]`（按 `max` 升序；值落首个 `v<=max` 档） |
| `modelNote` | string | — | — | 模型诚实声明（GEO-AX01 必填项：只看一个因子＋多因边界） |
| `recordKey` | string | — | `geog_factor-scale` | 记录键（运行时加 `ltb-geo-` 前缀） |

- 真值＝`window.GeoBatch4.bandOf(params, value)` 纯函数（场层，任意值可算，含非滑块步进值）；
  `truth()` → `{bands, bandOf}`；`state()` → `{value, bandIndex, bandLabel}`（UI 可达）——
  两类分开上报（GEO-RULING-2026-10-17-03）。
- 徽章"示意｜非精确比例｜只看一个因子"常驻（GEO-R24）；glyph 为 SVG 矢量示意（随视口缩放）；
  滑块 `input` 事件实时重算＋落盘（`ltb-geo-`＋recordKey）。
- 落点：dg07.1.3-p2（西南季风强度→旱涝）、dg07.1.4-p2（纬度→寒冷→人口）、dg07.2.4-p2（雨林破坏程度→生态后果）。

## 10. cause-chain（批 4 · 因果链拼装）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `title` | string | — | `"因果链拼装"` | 组件标题 |
| `intro` | string | — | — | 操作引导 |
| `mode` | string | — | `"sequence"` | `"sequence"`（点卡片排序）/`"match"`（左因右果配对） |
| `cards` | array | sequence 必填 | — | `{id, text}`（展示顺序由作者打乱，`answer` 给正确顺序） |
| `answer` | array | sequence 必填 | — | 正确卡片 id 序列 |
| `causes` / `effects` | array | match 必填 | — | `{id, text}`（左栏因／右栏果） |
| `causeLabel` / `effectLabel` | string | — | `"因"`/`"果"` | match 模式左右栏标题 |
| `pairs` | array | match 必填 | — | `[[causeId, effectId]]`（正确配对，顺序无关） |
| `chainNote` | string | — | — | 因果检查口诀（如 G13"先问这个产业最怕缺什么"） |
| `recordKey` | string | — | `geog_cause-chain` | 记录键（运行时加 `ltb-geo-` 前缀） |

- 真值＝`window.GeoBatch4.chainScore(params, picked)` 纯函数：sequence 逐位置比对、
  match 逐对集合比对（顺序无关）；`truth()` → `{mode, answer}`/`{mode, pairs}`（场层）；
  `state()` → `{mode, chain/pairs, submitted, score, total}`（UI 可达）——
  两类分开上报（GEO-RULING-2026-10-17-03）。
- 因果方向徽章"因果方向：自然→人文，不许颠倒（GEO-R40）"常驻；sequence 未排满禁止提交；
  match 配对前须先选"因"；提交后逐位置/逐对 ✓/✗ 反馈＋正解（双编码）。
- 落点：dg07.1.1-p2（日本临海型布局 sequence）、dg07.2.3-p2（美国自然条件→农业带 match）。

## 11. geo-map（批 5 · 中国疆域/政区/专题示意图，13 modes）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `assetId` | string | — | 按 mode 取默认映射（见下） | `geo-schematic-paths.js` 中的资产 id：`cn-territory`(A)/`cn-admin`(A)/`cn-silhouette`(C)/`cn-terrain`(B)/`cn-precip`(B)/`cn-landuse`(B)/`cn-watertransfer`(B)/`cn-marine`(A) |
| `mode` | string | ✅ | — | 13 种之一（下表）；未知 mode 渲染 trap 提示 |
| `declare` | string | — | — | 课页附加声明，与 grade 冻结文案合并渲染为角落小字（不可关闭）；`admin-puzzle` 缺省「形状经简化，相邻关系不变」 |
| `recordKey` | string | — | `geog_<mode>` | 记录键（运行时加 `ltb-geo-` 前缀） |

- 审定口径（GEO-RULING-2026-10-17-08）：底图几何全部来自 `data/geo-schematic-paths.js`
 （省界审定版本号 `CN-PROV-v1`，状态 `pending-expert-signoff`）；每个 mode 按资产 grade 定级渲染；
  角落小字不可关闭——A/B 级冻结文案「示意｜非精确比例｜界线画法依据人教版地理教材插图，非标准地图」，
  C 级冻结文案「示意｜非精确比例｜方向仅供参考」；严禁虚构审图号、严禁自称「标准地图」。
- 真值＝`window.GeoBatch5.*`（场层：四至点/胡焕庸线/五大自治区/阶梯/山脉/降水站点/灾害路径/
  长江/黄河/土地利用/南水北调/海域带，人教版八上口径）；`truth()` → `{assetId, grade, mapTitle, mode, declare, signoff, ruling}`（场层）；
  `state()` → 各 mode 的 UI 可达值（见下表）——两类分开上报（GEO-RULING-2026-10-17-03）。
- SVG 文本元素字号 ≥12.5px（≈V8 fs-078），豁免口径见 `~/workspace/geo-audit/batch5-maps/` 卷宗；
  HTML 文字只用 V8 阶梯类；触摸热区 ≥44px；零外部请求，file:// 可跑。

| mode | 落点 | 默认资产(grade) | 交互 | `state()` |
|---|---|---|---|---|
| `position-switch` | dg08.1.1 | cn-territory(A) | 半球/纬度/海陆三按钮切换叠加层 | `{mode, tab}` |
| `four-points` | dg08.1.2 | cn-territory(A) | 点四至点标记，读经纬度+邻国方位+跨度 | `{mode, selected}` |
| `admin-puzzle` | dg08.1.3 | cn-admin(A) | 8 轮三配对闯关（简称/行政中心/省名点选），答错不推进 | `{mode, round, score, total}` |
| `huhuan-yong` | dg08.2.1 | cn-silhouette(C) | 点线两侧，读面积/人口占比对比 | `{mode}` |
| `ethnic-match` | dg08.2.2 | cn-admin(A) | 5 大自治区对号入座（名+主要少数民族+行政中心点选） | `{mode, round, score, total}` |
| `terrain-3d` | dg09.1.1 | cn-terrain(B) | 三级阶梯剖面描画动画＋山脉点读走向＋走向速查 | `{mode, played, mountain}` |
| `precip` | dg09.2.2 | cn-precip(B) | 800/400/200mm 等降水量线＋6 站点点读 | `{mode, station}` |
| `disaster-path` | dg09.2.3 | cn-silhouette(C) | 台风/寒潮路径切换＋流动虚线动画 | `{mode, disaster, played}` |
| `river-profile` | dg09.3.2 | cn-silhouette(C) | 长江干流示意剖面，上/中/下游分段点读（宜昌/湖口分界） | `{mode, seg}` |
| `yellow-river` | dg09.3.3 | cn-silhouette(C) | 地上河横剖面泥沙淤积动画＋上/中/下游点读 | `{mode, seg}` |
| `landuse` | dg10.1.2 | cn-landuse(B) | 耕地/林地/草地/荒漠分区点读 | `{mode, type}` |
| `water-transfer` | dg10.2.1 | cn-watertransfer(B) | 东/中/西三线点读（西线虚线=规划中）＋水流向动画 | `{mode, line}` |
| `marine` | dg10.2.2 | cn-marine(A) | 领海/毗连区/专属经济区示意带＋大陆架点读（示意带不表达实际划界） | `{mode, zone}` |

- 引入顺序：`data/geo-schematic-paths.js` → `js/geography.js` → `js/geo-batch5-widgets.js`
 （在 `modules/geography/index.html` 中按此顺序加两行 `<script>`；批 5 装配时由内容/装配方加入）。

## 12. thematic-map（批 6 · C 级剪影底图专题示意）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `theme` | string | ✅ | — | `"agri"`（农业类型分区）/`"industry"`（四大工业基地）/`"railway"`（五纵三横连线闯关）/`"qinling"`（秦岭—淮河一线六义）/`"hmt"`（港澳台位置） |
| `intro` | string | — | — | 操作引导 |
| `recordKey` | string | — | `geog_thematic-map_<theme>` | 记录键（运行时加 `ltb-geo-` 前缀） |

- 底图复用 `data/geo-schematic-paths.js` 已签发 C 级剪影几何（CN-PROV-v1，expert-signed）：
  中国全境轮廓，不叠加省界/国界线/十段线；台湾岛、海南岛单独绘制不可缺；
  角落冻结文案 E.3「示意｜非精确比例｜方向仅供参考」不可关闭。
  本渲染器不新增任何涉国界/省界矢量几何，不触发 -08 审定签发流程。
- 真值＝`window.GeoBatch6.*`（场层：AGRI_ZONES/INDUSTRY_BASES/RAILWAYS/
  QINLING_LINE+QINLING_MEANINGS/HMT，人教版八下口径）；`truth()` → `{theme, assetId:"cn-silhouette", grade:"C", declare, signoff, ruling}`（场层）；
  `state()` → 各 theme 的 UI 可达值（agri/industry/hmt `{selected}`；railway `{round,score,total,done}`；qinling `{selected, meaningVisible}`）——
  两类分开上报（GEO-RULING-2026-10-17-03）。
- agri：5 分区示意多边形（虚线边）＋点读「自然条件→农业类型」因果（GEO-R40）；
  industry：4 基地点位（≥44px 命中圆）＋点读特点/主导区位因素；
  railway：8 条干线示意折线（固定伪随机出题顺序，见 truth.quizOrder），点选判分、8 条全对过关；
  qinling：基线＋6 条示意分界线（开关按钮 ≥44px，`aria-pressed`），配过渡带徽章
  「分界线是渐变带的中心线」（GEO-AX01；pedagogy T10）；
  hmt：香港/澳门符号点＋台湾岛高亮（与大陆同色，只加轮廓与「台湾省」注记，审定书 B.4 精神），
  配表述红线条（HMT_REDLINE）。
- 落点：dg11.1.1-p2（agri）、dg11.1.2-p2（industry）、dg11.2.1-p2（railway）、
  dg12.1.1-p2（qinling）、dg13.1.2-p2（hmt）。

## 13. region-compare（批 6 · 地区对照表）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `title` | string | — | — | 表标题 |
| `intro` | string | — | — | 操作引导 |
| `columns` | array | ✅ | — | 列头（如 `["北方地区"]` 或 `["北方地区","南方地区"]`） |
| `rowHead` | string | — | `"方面"` | 行头列标题 |
| `rows` | array | ✅ | — | `{label, cells[], detail}`（`cells` 与 `columns` 等长；`detail` 为点行详解） |
| `recordKey` | string | — | `geog_region-compare` | 记录键（运行时加 `ltb-geo-` 前缀） |

- 表格横向可滚（窄屏不溢出）；行可点选（键盘可达），下方详解条显示 `detail`；
  HTML 文字只用 V8 阶梯类。
- `state()` → `{selectedRow}`；`truth()` → `{columns, rows}`（场层）。
- 落点：dg12.1.2-p2（北方对照表）、dg12.1.3-p2（南北双栏表）、dg13.2.3-p1（深圳河两岸对照）。

## 14. geo-schematic（批 6 · 城市/区域职能示意）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `board` | string | ✅ | — | `"beijing"`（北京城市职能）/`"yrd"`（长三角城市群格局）/`"prd"`（珠三角与港澳合作）/`"sjy"`（三江源水系） |
| `recordKey` | string | — | `geog_geo-schematic_<board>` | 记录键（运行时加 `ltb-geo-` 前缀） |

- 板子几何冻结于 `window.GeoBatch6.BOARDS`（`{title, intro, vb, declare, axis?, areas[], nodes[], links[], foot?}`）；
  城市/区域内部职能示意（非政区图），不涉国界/省界绘制；角落示意声明不可关闭（GEO-R24）。
- 区域（rect）/节点（circle，问题节点用警示色）/连线（动画虚线，河流带箭头）均可点读
  （透明命中区 ≥44px，键盘可达）；`state()` → `{selected}`（场层/UI 分开上报）。
- 落点：dg13.1.1-p2（beijing）、dg13.1.3-p2（yrd）、dg13.1.4-p2（prd）、dg13.2.2-p2（sjy）。

## 15. process-stages（批 6 · 分阶段过程动画）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `process` | string | ✅ | — | `"loess"`（黄土高原沟壑演变；唯一取值） |
| `recordKey` | string | — | `geog_process-stages` | 记录键（运行时加 `ltb-geo-` 前缀） |

- 四阶段冻结于 `window.GeoBatch6.LOESS_STAGES`（①平坦黄土塬 ②暴雨＋植被破坏
  ③沟壑下切加深 ④支离破碎＋治理）；上一步/下一步/播放（2.2s 自动步进）；
  第③阶段含等高线密集示意（沟壑＝密集山谷、等高线密集＝坡陡，红线辨析①回填）。
- 阶段场景为教学示意分期（GEO-AX01 当页显性化）；`state()` → `{stage, playing}`；
  `truth()` → `{process, stages}`（场层）。
- 落点：dg13.2.1-p2。

## 16. scale-switcher（批 6 · 多尺度地图切换）

| 参数 | 类型 | 必填 | 默认 | 说明 |
|---|---|---|---|---|
| `recordKey` | string | — | `geog_scale-switcher` | 记录键（运行时加 `ltb-geo-` 前缀） |

- 三档冻结于 `window.GeoBatch6.SCALE_LEVELS`（街区 1:10000/城市 1:500000/
  城市群 1:2000000，均为示意值）；按钮切换（≥44px，`aria-pressed`）→
  示意场景＋比例尺读数＋「分母越小、比例尺越大、越详细（大详小略，GEO-R18/19）」。
- `state()` → `{level}`；`truth()` → `{levels}`（场层）。
- 落点：dg13.2.3-p1（红线辨析④回填：多尺度地图切换）。
