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
