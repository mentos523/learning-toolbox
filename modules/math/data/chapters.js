/* ============================================================
 * 学习工具箱 · 数学 · 代数 章注册表
 *
 * 13 章结构来自绿队课程体系 docs/math-algebra-curriculum.md。
 * 注意：绿队 v2.0（105 课 / 112 页）待更新，本注册表为 v1.0 框架版，
 * 章标题以 v2.0 发布为准，届时整体替换。
 *
 * status: ready=可学 / planned=筹备中。侧边栏据此渲染。
 * ============================================================ */
window.MATH_CHAPTERS = [
  /* ---------------- 代数 ch00–ch12 ---------------- */
  { id: "ch00", title: "导论——从算术到代数",     file: "data/ch00.js", status: "ready" },
  { id: "ch01", title: "一元一次方程",             file: "data/ch01.js", status: "ready" },
  { id: "ch02", title: "整式与因式分解",           file: "data/ch02.js", status: "ready" },
  { id: "ch03", title: "分式",                     file: "data/ch03.js", status: "ready" },
  { id: "ch04", title: "一元二次方程",             file: "data/ch04.js", status: "ready" },
  { id: "ch05", title: "不等式",                   file: "data/ch05.js", status: "ready" },
  { id: "ch06", title: "函数与一次函数",           file: "data/ch06.js", status: "ready" },
  { id: "ch07", title: "二次函数与反比例函数",     file: "data/ch07.js", status: "ready" },
  { id: "ch08", title: "指数与对数",               file: "data/ch08.js", status: "ready" },
  { id: "ch09", title: "数列",                     file: "data/ch09.js", status: "ready" },
  { id: "ch10", title: "极限与连续",               file: "data/ch10.js", status: "ready" },
  { id: "ch11", title: "导数",                     file: "data/ch11.js", status: "ready" },
  { id: "ch12", title: "定积分与微积分基本定理",   file: "data/ch12.js", status: "ready" },
  /* ---------------- 几何 g00–g13（蓝队 2026-10-11 接入） ----------------
   * 14 章结构来自绿队课程体系 docs/math-geometry-curriculum.md v1.1。
   * 章标题以课程体系为准；g05 及以后待生产时把 status 改为 ready
   * 并补齐 data/gNN.js 数据文件。 */
  { id: "g00", title: "导论——几何是什么",         file: "data/g00.js", status: "ready" },
  { id: "g01", title: "点、线、面、角",             file: "data/g01.js", status: "ready" },
  { id: "g02", title: "相交线与平行线",             file: "data/g02.js", status: "ready" },
  { id: "g03", title: "三角形（一）——认识三角形",  file: "data/g03.js", status: "ready" },
  { id: "g04", title: "全等三角形",                 file: "data/g04.js", status: "ready" },
  { id: "g05", title: "勾股定理",                   file: "data/g05.js", status: "planned" },
  { id: "g06", title: "四边形",                     file: "data/g06.js", status: "planned" },
  { id: "g07", title: "圆（一）——圆的基本性质",    file: "data/g07.js", status: "planned" },
  { id: "g08", title: "圆（二）——切线与圆的方程",  file: "data/g08.js", status: "planned" },
  { id: "g09", title: "图形的相似",                 file: "data/g09.js", status: "planned" },
  { id: "g10", title: "图形的变换——对称与旋转",   file: "data/g10.js", status: "planned" },
  { id: "g11", title: "面积与体积",                 file: "data/g11.js", status: "planned" },
  { id: "g12", title: "立体几何初步",               file: "data/g12.js", status: "planned" },
  { id: "g13", title: "解析几何入门",               file: "data/g13.js", status: "planned" }
];
