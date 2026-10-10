# 英语词根词缀工具 · 红白蓝对抗记录

三轮对抗于 2026-10-10 完成。红队（英语教学专家）审计数据层，
白队（前端/健壮性）审计代码层，蓝队负责修复。每轮提交独立推送到 main。

当前数据规模：99 词根 / 312 词（人工逐条核对的种子库）。
目标 3000–5000 词，按"中考考纲词表倒排"分批扩充（见 data/roots.js 头部路线图）。

## R1（commit 2d6e120）

红队：
- 严重：移除构词逻辑错误的 uncover（un-）、defend（de-）
- 中等：修正 spectacle / state / report 翻译与词性；修正 cord/grad/cur/quer 变形展示
- 中等：补 20 个初中高频遗漏词（phone/headphone/design/remember/mistake/internet/activity/actual/product/record/submit/concept/public/symbol/conference/infer/exist/assistant/promote/emotion）
- 轻微：优化 10 处翻译（vision/audience/grade/serve/project/discourage/minute/prime/persist/spond）；清理无对应单词的变形、补全 co-/in- 展示

白队：
- 严重：右侧设置栏加 ✕ 关闭按钮（桌面+平板）
- 中等：拨盘行高 resize 重算、对比度（--accent-strong）、空词根/mi 越界防御、HTML 转义、动态序号、语速钳制、hashchange、自动朗读需用户手势、平板滚动区修复、手机拨盘对齐
- 轻微：:focus-visible、拨盘选中改 transform 缩放

## R2（commit 7de3490）

红队：复查通过；headphone→headphones；增补 remote/publish/destroy/nonsense（4 初中高频词）；修正 remote/destroy 的 mi 序号。

白队：
- 中等：fab 兄弟选择器修复（桌面端侧栏可重开）；暗夜 --accent-strong 加深至 #3b6fd4；新增 --accent-text（三主题文字对比度达标）；selectRoot 写回 URL hash；收起抽屉加 inert
- 轻微：朗读序号守卫（防 cancel 竞态）；高亮底 tag 对比度；speaking 态用 accent-strong；语速钳制回写存储；hash 目标被过滤时清空搜索；version-note 改用主题变量

## R3（终轮）

红队：30 词随机抽样 + 7 个多义词根 mi 指派全量复核，全部通过，未发现新问题。

白队：实测通过（桌面 fab 重开、暗夜走查、拨盘像素对齐、控制台零报错、file:// 全流程、平板/手机/hash）。
- 轻微：加内联 SVG favicon（data URI，零依赖），消除控制台 404。

## 已知局限（诚实记录）

1. 词量 373，词根求精不求多：只收常见词根及初中常见成词（用户 2026-10-10 拍板，
   不再追求 3000–5000 的数字目标）。
2. ~~朗读用浏览器 speechSynthesis 合成语音~~ → 已解决：v1.1 起全部单词预生成
   本地真人声音频（美音 Aria / 英音 Isabella），存于 `modules/english/audio/{us,gb}/`，
   播放器优先播本地音频、缺文件降级合成语音；中国大陆零网络依赖，file:// 可用。

## 扩词 R1（2026-10-10，用户定调"不求多、求常见"后）

- 方法：初中/高中词表（KyleBing/english-vocabulary，BSD 协议）实测 99 词根仅覆盖
  7% 初中词（多为日耳曼原生词，无词根可拆）；改走"人工精选高频词根"路线。
- 新增 20 个常见词根：ven、tend、pass、medi、oper、solv、nunci、mod、fort、terr、
  loc、vac、spir、pac、gen、vinc、typ、labor、norm、fus；共 119 词根 / 373 词。
- 红队审计：20 词根词源全过；揪出 content 误归 tend-（实为 tenere"持"家族），
  已移入 tain-；invention 改"发明"；其余 56 成词逐条通过。
- 音频：61 新词 × 美/英音已生成（generous 英音因 TTS 后端瞬时故障缺失，
  已安排定时重试，缺失期间自动降级合成语音）。
