# 数学重构试点 · 分支本地标记（非发布版号）

- 试点：数学学科重构试点，代数 ch00-u1-l1《从猜数字到天平》4 页。
- 基线：分支 refactor/math，基线提交 a0d3a86a（线上版本 2026.10.20.3，2026-10-20 后静止）。
- 日期：2026-10-25。
- 性质：**分支试点，不合并进 main，不发布**。主线 version.json 与发布同步集一律不动；Pages 只部署 main，分支天然不碰线上。
- 框架：Vue 3.4.38 全局构建（vendoring，MIT）＋ marked 12.0.0（仅构建期，MIT）；零 CDN，全相对路径，file:// 可跑。
- 质量门：白队 QA（首轮 7/8 PASS → 第 4 项修复＋复测关闭 → 直载公式缺陷修复＋复测关闭）→ 独立复验 554 项断言（FAIL-1 SVG 拖拽物尺寸书面豁免，见批次证据 exemption-fail1.md；vibrate console error 已知 WARN 单列，另立批次清理）。
- 本文件由协调者在复验后追加的元数据，不参与渲染；复验的 14 个文件推送时字节一致，详见推送清单。

---

## Batch 0 泛化附记（2026-10-25，搭建者，未推送）

- 单课壳泛化为多课壳：路由 `#/` 数学总览、`#/l/<课>` 课总览、`#/p/<页>` 卡片页；
  课 bundle 改为 `window.MATH_BUNDLES['<课>']` 按需 `<script>` 注入；
  转换器逐课产 bundle＋freshness，另产 `bundle/manifest.json` 与
  `bundle/manifest.bundle.js`（章→单元→课→页，结构源 `content/meta.json`）。
- 新增第二课 `ch00-ux-l1`《第零章习题》1 页；试点课 `ch00-u1-l1` 页对象
  与试点 bundle 逐页深比对一致（包装字段除外）。
- 本文件其余试点行保持原样；Batch 0 证据见工作区 `batches/batch0/`。
