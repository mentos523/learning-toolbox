# 基础引擎层 · 第三方库 Vendoring 说明

- 维护者：基础引擎层（`assets/engine/`）
- 取证日期：2026-10-16（随联调原型 `~/workspace/engine-proto/vendor-manifest.md` 原样迁入）
- 引用口径：ENG 真值清单附"原型 6 坑 → 口径条目对照"坑 6：三库 vendored 总量 gzip ≤ 400KB

| 库 | 版本 | vendored 文件 | 字节 | gzip -9 | SHA-256 | 全局变量 | 许可证 |
|---|---|---|---|---|---|---|---|
| Planck.js | 1.5.1 | planck.min.js | 297211 | 54798 | `d8969bbbc62bfd1d6692e71f8d832a6de6d41aa6143e4c16062ab1f9741e94c4` | `planck` | MIT（全文 licenses/planck-LICENSE.txt） |
| Konva.js | 10.9.0 | konva.min.js | 196260 | 58330 | `5445b122b332b99530a0ed43ae514ad8121d661d7b7f5d938ae1d5932ed64334` | `Konva` | MIT（全文 licenses/konva-LICENSE） |
| JSXGraph | 1.14.0 | jsxgraphcore.js | 993978 | 257331 | `72481cfa439d74c4eb517dbc1c7e948ecbfcfafa07a69bb116f38c04065fa56b` | `JXG` | **LGPL-3.0-or-later / MIT 双授权二选一，选用 MIT**（见下） |
| JSXGraph CSS | 1.14.0 | jsxgraph.css | 4822 | 1642 | `ec20cf945b24635586faf6eea865cf2d0ab23e7156f3c08b37abf70a501bb375` | — | 同上 |

三库 gzip 合计 370,429 字节 ≈ 362KB（含 css），≤ 400KB 上限。

## 来源

全部经 npm 官方 registry 当日 `npm pack` 取得，未做任何修改：

- https://registry.npmjs.org/planck/-/planck-1.5.1.tgz（取包内 `dist/planck.min.js`）
- https://registry.npmjs.org/konva/-/konva-10.9.0.tgz（取包内 `konva.min.js`）
- https://registry.npmjs.org/jsxgraph/-/jsxgraph-1.14.0.tgz（取包内 `distrib/jsxgraphcore.js`、`distrib/jsxgraph.css`）

## 许可证选用说明（JSXGraph）

JSXGraph 官方声明为双授权二选一：`"(MIT OR LGPL-3.0-or-later)"`（package.json license 字段；`jsxgraphcore.js` 文件头注明 dual licensed）。
本仓库为 MIT 仓库，**选用 MIT 一项**，两份许可证全文均收录于 `licenses/`（`jsxgraph-LICENSE.MIT`、`jsxgraph-LICENSE.LGPL`），LGPL 文本仅作来源备查，不构成对本仓库的 LGPL 义务。
Planck 与 Konva 均为 MIT，全文见 `licenses/`。

## 完整性校验

```bash
sha256sum planck.min.js konva.min.js jsxgraphcore.js jsxgraph.css
# 必须与上表 SHA-256 逐位一致；任一不一致即停止使用并上报。
```

## 加载顺序

课页 / 验证页按以下顺序用经典 `<script>` 引入（零构建、无模块）：

```html
<script src="assets/vendor/planck.min.js"></script>
<script src="assets/vendor/konva.min.js"></script>
<script src="assets/vendor/jsxgraphcore.js"></script>
<script src="assets/engine/core.js"></script>
<!-- …其余 engine 文件… -->
```

file:// 与 http 双环境均可直接打开（已随联调原型实证）。
