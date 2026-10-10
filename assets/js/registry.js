/* ============================================================
 * 学习工具箱 · 学科注册表
 *
 * 新增一个学科，只需两步：
 *   1. 在 modules/ 下新建一个文件夹，里面放该学科的 index.html
 *   2. 在下面的 TOOLBOX_MODULES 数组里追加一条记录
 *
 * 注意：
 * - path 必须用相对路径，这样整个项目可以放在任意站点的
 *   任意子目录下，也支持 file:// 协议直接双击打开。
 * - 这里用 .js 而不用 .json 存注册表，是因为浏览器在
 *   file:// 协议下不允许 fetch 本地 json，而 <script> 可以。
 * ============================================================ */
window.TOOLBOX_MODULES = [
  {
    slug: "english",
    name: "英语",
    tagline: "词根词缀",
    description: "拨一拨词根，单词自己长出来：变形拨盘、词根词义对齐、真人发音。",
    icon: "abc",                       // 图标见 app.js 中的 ICONS
    color: "#3b82f6",                  // 卡片主题色
    path: "modules/english/index.html",
    status: "ready"                    // ready=可用，soon=筹备中
  },
  {
    slug: "math",
    name: "数学",
    tagline: "代数 · 几何",
    description: "从五六年级出发：代数从方程一路到微积分，几何到高中。",
    icon: "pi",
    color: "#f59e0b",
    path: "modules/math/index.html",
    status: "soon"
  }
];
