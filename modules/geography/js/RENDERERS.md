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
