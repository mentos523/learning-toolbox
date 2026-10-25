# 试点 vendoring 登记（零 CDN 纪律）

本试点运行时与构建期引入的第三方代码全部整包 vendoring 进本目录，
不走 CDN、不走外部链接；许可证头保留在各文件首行原样。

| 文件 | 版本 | 许可证 | 用途 | 来源说明 |
|---|---|---|---|---|
| `vendor/vue.global.prod.js` | Vue 3.4.38（文件头自述 `vue v3.4.38`） | MIT（文件头 `@license MIT`，© Yuxi (Evan) You and Vue contributors） | 运行时：应用壳框架（全局构建，`script` 标签引入，无构建工具链） | 协调者提供的基线副本（`baseline/vue.global.prod.js`，146,843 字节），原样复制，头保留 |
| `tools/vendor/marked.umd.js` | marked 12.0.0（文件头自述 `marked v12.0.0`） | MIT（文件头 `MIT Licensed`，© Christopher Jeffrey；项目地址见文件头 https://github.com/markedjs/marked） | 仅构建期：转换器用其 lexer 解析 md 正文、parse 作校验；不进运行时依赖、不进 bundle | 协调者提供的基线副本（`baseline/marked.umd.js`），原样复制，头保留 |

分支自有文件（`modules/math/js|css|data`、`assets/css/style.css`）不是
第三方 vendoring：试点以相对路径原样引用分支文件，不复制进本目录，
故不在此登记；其许可证与归属以学习工具箱仓库本身为准。

选型理由一句话（详见任务书框架选型）：Vue 全局构建单文件引入、
无构建工具链、`file://` 可跑、应用壳＋路由＋状态能力齐全；
marked 仅构建期预解析，运行时依赖最少；取舍是全局构建无 SFC、
组件用模板字符串，体积约 147KB（gzip 后更小，可接受）。
