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
    tagline: "讲词根 · 语法",
    description: "拨一拨词根，单词自己长出来：变形拨盘、词根词义对齐、合成语音朗读。",
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
    status: "ready"                  // 试点 4 页已上线
  },
  {
    slug: "physics",
    name: "物理",
    tagline: "18 章 · 135 课",
    description: "从八年级出发：每个公式都有身份证（适用条件），31 种虚拟实验，讲透到高中。",
    icon: "atom",
    color: "#10b981",
    path: "modules/physics/index.html",
    status: "ready"
  },
  {
    slug: "chemistry",
    name: "化学",
    tagline: "22 章 · 130 课",
    description: "从九年级出发，一路到高中：宏观—微观—符号三重表征全程对齐，130 课虚拟实验探究。",
    icon: "flask",
    color: "#8b5cf6",
    path: "modules/chemistry/index.html",
    status: "ready"
  },
  {
    slug: "geography",
    name: "地理",
    tagline: "16 章 · 113 课",
    description: "从七年级出发：等高线读出地形，时区算出时间，气候两步判定——地图是地理的第二语言。",
    icon: "box",
    color: "#0ea5e9",
    path: "modules/geography/index.html",
    status: "ready"                   // 批 1–8 全量上线（16 章 · 113 课 · 322 页），hotfix-20261019 由 soon 翻为 ready
  },
  {
    slug: "biology",
    name: "生物",
    tagline: "26 章 · 129 课",
    description: "从七年级出发：结构—功能对问贯穿始终，遗传、稳态、生态讲透到高中。",
    icon: "box",                       // ICONS 5 个名额已占满（abc/pi/atom/flask/box），暂与地理共用通用图标；专用图标需改 app.js（共享文件，本次不动）
    color: "#00b5a5",                  // 青绿；与地理 #0ea5e9 / 物理 #10b981 / 化学 #8b5cf6 区分
    path: "modules/biology/index.html",
    status: "ready"                    // 试点 b18.1.3（4 页）+ P1 b16 细胞的生命历程（15 页）+ P2 b17 遗传规律（15 页）+ P3 b18 整章（14 页）+ P4 b19 DNA 复制与基因表达（15 页）已就位 + P5 b20 变异与育种（11 页）已就位 + P6 b21 生物的进化（13 页）已就位 + P7 b03 绿色植物（16 页）已就位 + P8 b05 人体的营养与消化（12 页）+ b13 细胞代谢：酶与 ATP（11 页）已就位 + P9 b06 呼吸、循环与废物排出（16 页）+ b14 光合作用机理（15 页）已就位 + P10 b07 神经调节与激素（12 页）+ b15 呼吸作用机理（11 页）已就位
  }
];
