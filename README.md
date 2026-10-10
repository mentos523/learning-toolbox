# 学习工具箱

给孩子的学习工具箱：一个学科一个工具，慢慢把箱子装满。

## 现在有什么

| 学科 | 状态 | 说明 |
|------|------|------|
| 英语 · 词根词缀学习工具 | v1.1（119 词根 / 373 词，本地真人声美音/英音） | 词根求精不求多：只收常见词根及初中常见成词，见 docs/english-audit-log.md |
| 数学 · 代数/几何 | 筹备中 | 路线图：代数从方程到微积分，几何到高中；起点五六年级 |

## 特点

- **纯静态、零依赖**：只有 HTML / CSS / JS，不用装任何东西，不请求任何外部资源（无 CDN、无在线字体）。
- **随处可跑**：全站使用相对路径，可以放在任何网站的任意子目录下，也支持 `file://` 协议直接双击打开。
- **学科可插拔**：新学科 = 新建一个文件夹 + 在注册表加一行，首页自动出现卡片。

## 如何新增一个学科

1. 在 `modules/` 下新建文件夹，例如 `modules/physics/`，里面放该学科的 `index.html`（可直接复用 `assets/css/style.css` 里的基础样式）；
2. 打开 `assets/js/registry.js`，在 `TOOLBOX_MODULES` 数组末尾追加一条：

```js
{
  slug: "physics",
  name: "物理",
  tagline: "力学",
  description: "一句话介绍",
  icon: "box",                  // abc | pi | box，或在 app.js 的 ICONS 里加
  color: "#10b981",             // 卡片主题色
  path: "modules/physics/index.html",
  status: "ready"               // ready=可用，soon=筹备中
}
```

3. 刷新首页，新卡片自动出现。不需要改其他任何文件。

> 为什么注册表用 `.js` 而不用 `.json`：浏览器在 `file://` 协议下不允许 `fetch` 本地 json，
> 而 `<script>` 标签可以，这样才能保证双击打开也能跑。

## 本地预览

```bash
# 方式一：直接双击 index.html（file:// 协议，全部功能可用）
# 方式二：任意静态服务器，例如
python3 -m http.server 8000
# 然后访问 http://127.0.0.1:8000/
```

## 部署方法

纯静态站点，部署 = 把文件放到能对外提供 HTTP 访问的地方。以下任选一种：

### 方式一：自己的服务器（Nginx / Apache / Caddy）

1. 把整个 `learning-toolbox` 文件夹上传到服务器，例如 `/var/www/learning-toolbox/`；
2. Nginx 配置示例（Apache / Caddy 同理，只需指向目录）：

```nginx
server {
    listen 80;
    server_name tools.example.com;
    root /var/www/learning-toolbox;
    index index.html;
}
```

3. 访问 `http://tools.example.com/` 即可。放在子目录也行，
   例如 `root /var/www/html;` 下放文件夹后访问 `http://tools.example.com/learning-toolbox/`，
   全站相对路径，自动适配。

### 方式二：GitHub Pages（免费）

1. 推送到 GitHub 仓库后，进仓库 Settings → Pages；
2. Source 选 `Deploy from a branch`，分支选 `main`，目录选 `/ (root)`；
3. 保存后约 1 分钟生效，访问 `https://<用户名>.github.io/learning-toolbox/`。

### 方式三：对象存储静态网站托管（阿里云 OSS / 腾讯云 COS）

1. 新建存储桶，开通"静态网站托管"，默认首页填 `index.html`；
2. 把整个文件夹（含子目录结构）原样上传；
3. 用分配的测试域名或绑定的自定义域名访问。

### 部署注意事项

- **不要打散目录结构**：`modules/english/audio/` 下是 700+ 个单词真人声音频文件
  （美音/英音，约 8MB），必须随页面一起上传，否则朗读会降级为系统合成语音。
- **子目录部署**：全站使用相对路径，放在 `https://域名/任意子目录/` 下开箱即用，无需改配置。
- **file:// 也可用**：直接双击 `index.html`，离线环境（无网络）下除在线部署外全部功能正常，
  音频为本地文件，同样离线可播。
- **无构建步骤**：改完文件直接上传覆盖即可，没有打包、没有依赖安装。

## 路线图

- [x] 项目立项：首页 + 学科注册表机制
- [x] 英语 · 词根词缀学习工具 v1.0（99 词根 / 312 词，三轮红白蓝对抗完成，见 docs/english-audit-log.md）
- [x] 英语 v1.1：扩词 R1（+20 常见词根，119 词根 / 373 词，红队词源审计通过）；本地真人声音频（美音/英音，离线可用）
- [ ] 英语 · 后续扩词（按"常见优先"原则小步快跑，每批红队审计）
- [ ] 数学 · 代数部分（方程 → 微积分）
- [ ] 数学 · 几何部分（五六年级 → 高中）
- [ ] 更多学科（语文、科学……）
