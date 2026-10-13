/* ============================================================
* 学习工具箱 · 数学 · 几何 g11：面积与体积
*
* 黄队（教育教学专家）生产：1 单元 / 10 课 / 35 页。
* 课程体系：docs/math-geometry-curriculum.md v1.1（g11 章，面积公式链）
* 教学设计：docs/math-geometry-pedagogy.md v1.1（跃升 8 回链：数格子；G5 切割拼补主战场）
* 参数手册：docs/math-geometry-params.md v1.3
* 白队一屏预算评审：sandbox://workspace/geo-g08-g13-screen-budget-review.md
* （g11 25→35 页；g11.1.6、g11.1.7 "一课两公式"中风险已按拆分建议拆页）
*
* 页构成：
* g11.1.1 矩形与正方形面积 4 页 P1 step-play（数格子：面积单位）
* P2 讲解（S=ab：乘法是数格子的快算法）
* P3 shape-area（用户钦定 x² 单开页，H5）
* P4 compare-toggle（H14：a(b+c)=ab+ac 两种读法）
* g11.1.2 平行四边形面积 3 页 P1 cut-reassemble（剪一刀拼成矩形）
* P2 讲解（S=ah + 等底等高 + H14 平方差呼应）
* P3 step-play（伸缩门：高变了面积变）
* g11.1.3 三角形面积 4 页 P1 cut-reassemble（两全等三角形拼平行四边形）
* P2 讲解（S=ah/2 + 钝角高在形外反例）
* P3 step-play（同底等高面积相等）
* P4 例题（自查三问）
* g11.1.4 梯形面积 3 页 P1 cut-reassemble（两全等梯形拼平行四边形）
* P2 讲解（S=(a+b)h/2）
* P3 例题（水坝横截面）
* g11.1.5 圆的面积：化圆为方 4 页 P1 step-play（极限动画：8→16→64→128 瓣）
* P2 讲解（S=πr² 推导：长=πr、宽=r）
* P3 compare-toggle（H6：极限三步 + 互链代数 ch12）
* P4 例题
* g11.1.6 弧长与扇形面积 4 页 P1 step-play（圆心角 n 拖动：扇形占 n/360）
* P2 讲解（弧长 l=nπr/180）
* P3 讲解（扇形 S=nπr²/360）
* P4 例题
* g11.1.7 柱体表面积与体积 5 页 P1 step-play（长方体纸盒展开）
* P2 讲解（棱柱表面积：2(ab+bc+ca)）
* P3 step-play（圆柱侧面展开成矩形·重点动画）
* P4 讲解（圆柱表面积 S=2πr²+2πrh）
* P5 讲解（柱体体积 V=Sh + 水箱例题）
* g11.1.8 锥体体积 3 页 P1 step-play（沙漏实验：三杯沙装满一柱）
* P2 讲解（V=Sh/3 + 等底等高前提）
* P3 例题
* g11.1.9 球的表面积与体积 3 页 P1 step-play（橘子瓣拼球面）
* P2 讲解（S=4πr²、V=4πr³/3 + 回填点）
* P3 例题
* g11.1.10 本章小结与习题 2 页 P1 小结（讲解页：面积链/体积链/三种思想）
* P2 习题（tap-highlight 柱锥球分类 + 6 道题）
*
* 呼应点落实：
* H5 g11.1.1 P3：x² 单开图形动画页（shape-area，边长滑块→面积 x² 实时）
* ——代数 2.2.2 完全平方、4.0.1/4.1.2 配方法"补正方形"的几何地基；
* 与 g00.1.4 预告页分工：g00 是"两种样子"对照，g11 是正式面积页
* H14 g11.1.1 P4：a(b+c)=ab+ac 矩形拼图（代数 ch00 0.1.4 分配律，同一张图两种读法）；
* g11.1.2 P2：平方差大正方形挖小正方形（代数 2.2.1，点拨呼应）
* H6 g11.1.5 P3：割圆术"分割→近似→极限"——代数 ch12 曲边梯形面积的几何预演
*
* 蓝队交互使用（均为已实现类型）：
* step-play / cut-reassemble / compare-toggle / shape-area / tap-highlight
* ——本章无新增交互类型需求
*
* 全局约定：params 只用语义色名（known=已知蓝 / target=求证红 / corrA·corrB·corrC=对应组 /
* corrAngle=对应角 / line=普通线 / aux=辅助线灰虚线），不出现具体色值；逻辑坐标 0–100，y 向上。
* ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g11"] = {
id: "g11",
title: "面积与体积",
units: [
{
id: "g11-u1",
title: "面积与体积",
lessons: [
/* ============ g11.1.1 矩形与正方形面积（4 页） ============ */
{
id: "g11-u1-l1",
title: "矩形与正方形面积",
pages: [
{
id: "g11-u1-l1-p1",
title: "数格子：面积的单位",
concept: "面积单位",
formulas: [
{
id: "f1",
latex: "1\\text{厘米} \\times 1\\text{厘米} = 1\\text{平方厘米}",
translation: "1 厘米乘 1 厘米等于 1 平方厘米"
}
],
interaction: {
type: "step-play",
params: {
interval: 1800,
steps: [
{
caption: "第 1 步：边长 1 厘米的小正方形——它的面积就是 1 平方厘米，面积的“尺子”。",
shapes: [
{ t: "poly", pts: [[35,35],[65,35],[65,65],[35,65]], color: "known", width: 3},
{ t: "txt", p: [50,50], text: "1cm²", size: 16, bold: true},
{ t: "txt", p: [50,24], text: "边长 1cm", size: 13}
]
},
{
caption: "第 2 步：用小格子铺满这个矩形——一行 4 格，一共 3 行。",
shapes: [
{ t: "poly", pts: [[30,30],[70,30],[70,60],[30,60]], color: "line", width: 3},
{ t: "seg", a: [40,30], b: [40,60], color: "aux", width: 1.5},
{ t: "seg", a: [50,30], b: [50,60], color: "aux", width: 1.5},
{ t: "seg", a: [60,30], b: [60,60], color: "aux", width: 1.5},
{ t: "seg", a: [30,40], b: [70,40], color: "aux", width: 1.5},
{ t: "seg", a: [30,50], b: [70,50], color: "aux", width: 1.5},
{ t: "txt", p: [50,72], text: "一行 4 格 × 3 行", size: 13}
]
},
{
caption: "第 3 步：数一数：4+4+4=12 格——这个矩形的面积是 12 平方厘米。",
shapes: [
{ t: "poly", pts: [[30,30],[70,30],[70,60],[30,60]], color: "known", width: 2.5},
{ t: "seg", a: [40,30], b: [40,60], color: "aux", width: 1},
{ t: "seg", a: [50,30], b: [50,60], color: "aux", width: 1},
{ t: "seg", a: [60,30], b: [60,60], color: "aux", width: 1},
{ t: "seg", a: [30,40], b: [70,40], color: "aux", width: 1},
{ t: "seg", a: [30,50], b: [70,50], color: "aux", width: 1},
{ t: "txt", p: [50,72], text: "面积 = 12cm²", size: 15, bold: true, color: "known"}
]
}
]
}
},
auxInteraction: null,
hints: [
"面积就是“数小格子”：看一个图形里能装下几个 1 平方厘米。",
"数格子太慢了——下一页找个“快算法”。"
],
examples: [
{ text: "数地砖：数砖块就知道房间面积", figure: "实物"}
],
prev: null,
next: "g11-u1-l1-p2"
},
{
id: "g11-u1-l1-p2",
title: "矩形面积：长乘宽",
pageKind: "explain",
concept: "矩形面积公式",
formulas: [
{
id: "f1",
latex: "S = a \\times b",
translation: "矩形面积等于长乘宽"
},
{
id: "f2",
latex: "S = a^2",
translation: "正方形是特殊的矩形，面积等于边长的平方"
}
],
interaction: {
type: "step-play",
params: {
steps: [
{
caption: "矩形：长是 a（一行 a 格），宽是 b（铺 b 行）——面积 = a×b。",
shapes: [
{ t: "poly", pts: [[25,35],[75,35],[75,65],[25,65]], color: "known", width: 2.5},
{ t: "seg", a: [25,50], b: [75,50], color: "aux", width: 1, dash: "5,4"},
{ t: "txt", p: [50,27], text: "长 a：每行 a 格", size: 13},
{ t: "txt", p: [84,50], text: "宽 b：铺 b 行", size: 13},
{ t: "txt", p: [50,78], text: "S = a × b", size: 15, bold: true, color: "known"}
]
}
]
}
},
auxInteraction: null,
hints: [
"还记得吗？你铺格子时，一行 4 格、铺了 3 行——4×3=12。",
"矩形面积 = 长 × 宽：乘法就是数格子的“快算法”。",
"生活例：教室地砖每行 8 块、铺 6 行，面积=8×6=48 块砖。",
"图形例：长 5cm、宽 3cm 的矩形，面积 15cm²。",
"反例：“长”必须沿着边量——斜着量出来的数，乘出来不是面积。",
"⚠️ 别搞混：周长是“绕一圈”（加法），面积是“铺满”（乘法）——求面积别把四条边加起来。",
"记住一句话：面积是乘法，周长是加法。"
],
examples: [
{ text: "地砖：8×6=48", figure: "实物"}
],
prev: "g11-u1-l1-p1",
next: "g11-u1-l1-p3"
},
{
id: "g11-u1-l1-p3",
title: "x² 是一个正方形",
concept: "x² 的几何意义",
formulas: [
{
id: "f1",
latex: "S = x^2",
translation: "边长为 x 的正方形，面积是 x 的平方"
},
{
id: "f2",
latex: "3^2 = 9",
translation: "边长 3，面积 9：数一数格子，正好 9 格"
}
],
interaction: {
type: "shape-area",
params: {
min: 1, max: 6, step: 1,
label: "x", initial: 3, unit: "cm",
showGrid: true
}
},
auxInteraction: null,
hints: [
"拖右下角的手柄：边长 x 变大，正方形跟着长大，面积读数实时跳。",
"边长是整数时格子会自动出现——数一数，格子数正好等于 x²。",
"x² 你在代数里见过（x 乘以自己）；现在它有了“长相”：一个正方形。",
"呼应 H5：代数 2.2.2 的完全平方、配方法“补正方形”，地基都在这一页。"
],
examples: [
{ text: "x=3：代数算 3×3=9，几何看边长 3 的正方形", figure: "数形"}
],
prev: "g11-u1-l1-p2",
next: "g11-u1-l1-p4"
},
{
id: "g11-u1-l1-p4",
title: "分配律的面积读法",
concept: "a(b+c)=ab+ac 的几何意义",
formulas: [
{
id: "f1",
latex: "a(b+c) = ab + ac",
translation: "a 乘以 b 加 c 的和，等于 ab 加 ac"
}
],
interaction: {
type: "compare-toggle",
params: {
views: [
{
label: "整体读",
caption: "把大矩形看成一个整体：宽是 a，长是 b+c——面积 = a(b+c)。",
shapes: [
{ t: "poly", pts: [[20,30],[80,30],[80,70],[20,70]], color: "line", width: 3},
{ t: "seg", a: [50,30], b: [50,70], color: "aux", width: 1.5, dash: "5,4"},
{ t: "txt", p: [12,50], text: "a", size: 14},
{ t: "txt", p: [35,22], text: "b", size: 14},
{ t: "txt", p: [65,22], text: "c", size: 14},
{ t: "txt", p: [50,82], text: "面积 = a(b+c)", size: 14, bold: true}
]
},
{
label: "两块读",
caption: "把大矩形看成左右两块：面积 = ab + ac——同一张图，两种读法。",
shapes: [
{ t: "poly", pts: [[20,30],[50,30],[50,70],[20,70]], color: "corrA", width: 2.5, fill: "corrA", opacity: 0.25},
{ t: "poly", pts: [[50,30],[80,30],[80,70],[50,70]], color: "corrB", width: 2.5, fill: "corrB", opacity: 0.25},
{ t: "txt", p: [35,50], text: "ab", size: 14, bold: true, color: "corrA"},
{ t: "txt", p: [65,50], text: "ac", size: 14, bold: true, color: "corrB"},
{ t: "txt", p: [50,82], text: "面积 = ab + ac", size: 14, bold: true}
]
}
]
}
},
auxInteraction: null,
hints: [
"同一张图，两种读法：整体读是 a(b+c)，两块读是 ab+ac——它们相等，这就是分配律。",
"代数 ch00 0.1.4 用这张图“证明”分配律；我们反过来，用分配律“算”面积。",
"数的部分回代数页复习——几何只管“形”的这一半。"
],
examples: [
{ text: "a=2,b=3,c=4：2×7=14，2×3+2×4=14", figure: "算式"}
],
prev: "g11-u1-l1-p3",
next: "g11-u1-l2-p1"
}
]
},
/* ============ g11.1.2 平行四边形面积（3 页） ============ */
{
id: "g11-u1-l2",
title: "平行四边形面积",
pages: [
{
id: "g11-u1-l2-p1",
title: "剪一刀，拼成矩形",
concept: "割补法求平行四边形面积",
formulas: [
{
id: "f1",
latex: "\\text{割补前后，面积不变}",
translation: "把平行四边形剪拼成矩形，面积没有变化"
}
],
interaction: {
type: "cut-reassemble",
params: {
pieces: [
{ id: "t1", label: "①", pts: [[8,14],[23,14],[23,54]]},
{ id: "t2", label: "②", pts: [[40,8],[65,8],[80,48],[40,48]]}
],
targets: [
{ id: "t1", pts: [[55,30],[70,30],[70,70]]},
{ id: "t2", pts: [[30,30],[55,30],[70,70],[30,70]]}
],
autoAssemble: true,
doneText: "拼成矩形了！面积没变！"
}
},
auxInteraction: null,
hints: [
"把左边的三角形剪下来，拖到右边的虚线轮廓里。",
"拼好后：长方形！它的长就是平行四边形的底，高就是平行四边形的高。",
"没变的是：面积——这就是“割补法”。"
],
examples: [
{ text: "剪纸：剪一刀拼一拼，纸的面积不变", figure: "实物"}
],
prev: "g11-u1-l1-p4",
next: "g11-u1-l2-p2"
},
{
id: "g11-u1-l2-p2",
title: "平行四边形面积公式",
pageKind: "explain",
concept: "平行四边形面积公式",
formulas: [
{
id: "f1",
latex: "S = a \\times h",
translation: "平行四边形面积等于底乘以高"
},
{
id: "f2",
latex: "\\text{等底等高} \\Rightarrow \\text{面积相等}",
translation: "底和高都相等的平行四边形，面积相等"
}
],
interaction: {
type: "compare-toggle",
params: {
views: [
{
label: "站得直",
caption: "底是 a，高是 h——面积 = ah。",
shapes: [
{ t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "corrA", width: 2.5},
{ t: "seg", a: [50,30], b: [50,70], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [50,22], text: "底 a", size: 13},
{ t: "txt", p: [56,50], text: "高 h", size: 13},
{ t: "txt", p: [50,82], text: "S = ah", size: 14, bold: true, color: "corrA"}
]
},
{
label: "斜得厉害",
caption: "底还是 a，高还是 h——面积还是 ah。形状变了，面积没变。",
shapes: [
{ t: "poly", pts: [[20,30],[60,30],[80,70],[40,70]], color: "corrB", width: 2.5},
{ t: "seg", a: [40,30], b: [40,70], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [40,22], text: "底 a", size: 13},
{ t: "txt", p: [46,50], text: "高 h", size: 13},
{ t: "txt", p: [50,82], text: "S = ah", size: 14, bold: true, color: "corrB"}
]
}
]
}
},
auxInteraction: null,
hints: [
"还记得吗？你剪下三角形拼到右边，长方形出现了——长是底 a，宽是高 h。",
"平行四边形面积 = 底 × 高：S=ah。注意这个 h 必须是“垂直”的那条高——斜边不算。",
"生活例：伸缩门拉来拉去，底没变、高变了，面积跟着变。图形例：等底等高的两个平行四边形，一个正、一个斜，面积都是 ah。",
"反例：底一样但高不一样，面积就不一样——“等底” alone 不够，还得“等高”。",
"⚠️ 别搞混：高是“垂直距离”，不是斜边的长——斜边永远比高长，别拿斜边当高乘。",
"呼应代数 2.2.1 平方差：大正方形挖小正方形，剩下 a²−b²=(a+b)(a−b)——同一张图，两种读法。",
"记住一句话：底乘高，高的“高”是垂直的“高”。"
],
examples: [
{ text: "底 6cm、高 4cm：面积 24cm²", figure: "算式"}
],
prev: "g11-u1-l2-p1",
next: "g11-u1-l2-p3"
},
{
id: "g11-u1-l2-p3",
title: "伸缩门：高变了",
concept: "面积随高的变化",
formulas: [
{
id: "f1",
latex: "S = a \\times h",
translation: "底不变，高变小，面积跟着变小"
}
],
interaction: {
type: "step-play",
params: {
steps: [
{
caption: "伸缩门撑开：底是 a，高是 h——面积 = ah。",
shapes: [
{ t: "poly", pts: [[30,25],[70,25],[70,75],[30,75]], color: "known", width: 2.5},
{ t: "seg", a: [50,25], b: [50,75], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [50,17], text: "底 a", size: 13},
{ t: "txt", p: [56,50], text: "高 h", size: 13},
{ t: "txt", p: [50,87], text: "S = ah", size: 14, bold: true}
]
},
{
caption: "伸缩门压扁：底还是 a，高变小了——面积也变小了。",
shapes: [
{ t: "poly", pts: [[20,40],[60,40],[80,60],[40,60]], color: "target", width: 2.5},
{ t: "seg", a: [50,40], b: [50,60], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [40,34], text: "底 a", size: 13},
{ t: "txt", p: [56,50], text: "高变小", size: 13, color: "target"},
{ t: "txt", p: [50,72], text: "面积变小", size: 14, bold: true, color: "target"}
]
}
]
}
},
auxInteraction: null,
hints: [
"底没变，高变了，面积就变了——面积公式 S=ah 里，a 和 h 缺一不可。",
"做题自查：我乘的 h，真的是“垂直”的那条吗？"
],
examples: [
{ text: "小区伸缩门：拉扁后占地面积变小", figure: "实物"}
],
prev: "g11-u1-l2-p2",
next: "g11-u1-l3-p1"
}
]
},
/* ============ g11.1.3 三角形面积（4 页） ============ */
{
id: "g11-u1-l3",
title: "三角形面积",
pages: [
{
id: "g11-u1-l3-p1",
title: "两个三角形拼一拼",
concept: "三角形面积是平行四边形的一半",
formulas: [
{
id: "f1",
latex: "\\text{两个全等三角形} \\Rightarrow \\text{平行四边形}",
translation: "两个完全一样的三角形能拼成一个平行四边形"
}
],
interaction: {
type: "cut-reassemble",
params: {
pieces: [
{ id: "t1", label: "①", pts: [[8,12],[48,12],[23,52]]},
{ id: "t2", label: "②", pts: [[58,52],[18,52],[43,12]]}
],
targets: [
{ id: "t1", pts: [[20,30],[60,30],[35,70]]},
{ id: "t2", pts: [[75,70],[35,70],[60,30]]}
],
autoAssemble: true,
doneText: "拼成平行四边形了！"
}
},
auxInteraction: null,
hints: [
"把两个一模一样的三角形拖进虚线轮廓——它们拼成了一个平行四边形。",
"三角形只占拼成图形的一半——所以面积公式里有个“除以 2”。",
"没变的是：两个三角形的面积加起来 = 平行四边形的面积。"
],
examples: [
{ text: "三明治对角切：两块三角形拼回一个长方形三明治", figure: "实物"}
],
prev: "g11-u1-l2-p3",
next: "g11-u1-l3-p2"
},
{
id: "g11-u1-l3-p2",
title: "三角形面积：底乘高除以 2",
pageKind: "explain",
concept: "三角形面积公式",
formulas: [
{
id: "f1",
latex: "S = \\frac{a \\times h}{2}",
translation: "三角形面积等于底乘高除以 2"
},
{
id: "f2",
latex: "\\text{钝角三角形的高在形外}",
translation: "钝角三角形有一条高画在图形外面"
}
],
interaction: {
type: "step-play",
params: {
steps: [
{
caption: "正例：锐角三角形的高在形内——从顶点垂直画到底边。",
shapes: [
{ t: "poly", pts: [[25,30],[75,30],[50,70]], color: "known", width: 2.5},
{ t: "seg", a: [50,30], b: [50,70], color: "aux", width: 2, dash: "5,4"},
{ t: "right", v: [50,30], p: [25,30], q: [50,70], size: 5, color: "corrAngle"},
{ t: "txt", p: [50,80], text: "高在形内 ✓", size: 13, color: "known"}
]
},
{
caption: "反例：钝角三角形的高在形外——底边要“延长”出去接住它。❌ 别画到形里去。",
shapes: [
{ t: "poly", pts: [[20,55],[60,55],[80,25]], color: "line", width: 2.5},
{ t: "seg", a: [60,55], b: [88,55], color: "aux", width: 2, dash: "5,4"},
{ t: "seg", a: [80,25], b: [80,55], color: "target", width: 2.5, dash: "5,4"},
{ t: "right", v: [80,55], p: [60,55], q: [80,25], size: 5, color: "corrAngle"},
{ t: "txt", p: [74,63], text: "底边延长线", size: 11, color: "aux"},
{ t: "txt", p: [50,80], text: "高在形外：延长底边来接", size: 13, color: "target"}
]
}
]
}
},
auxInteraction: null,
hints: [
"还记得吗？两个三角形拼成平行四边形（面积 ah）——一个三角形就是它的一半：S=ah/2。",
"三角形面积 = 底 × 高 ÷ 2：先乘再除以 2——别忘了除以 2！",
"生活例：三明治对角切，一块就是半个长方形。图形例：底 6、高 4，面积=6×4÷2=12。",
"反例：钝角三角形的高在形外——底边延长出去接住它，别画到形里。",
"⚠️ 别搞混：“除以 2”是三角形的专属——平行四边形不用除，梯形也要除。",
"记住一句话：三角形面积，底乘高再砍一半。"
],
examples: [
{ text: "底 6cm、高 4cm：面积 12cm²", figure: "算式"}
],
prev: "g11-u1-l3-p1",
next: "g11-u1-l3-p3"
},
{
id: "g11-u1-l3-p3",
title: "同底等高，面积相等",
concept: "等底等高的三角形面积相等",
formulas: [
{
id: "f1",
latex: "S_1 = S_2 = \\frac{a \\times h}{2}",
translation: "底和高都相等，面积一定相等"
}
],
interaction: {
type: "step-play",
params: {
steps: [
{
caption: "第 1 个：底是 a，高是 h——面积 = ah/2。",
shapes: [
{ t: "poly", pts: [[20,30],[60,30],[40,65]], color: "corrA", width: 2.5},
{ t: "seg", a: [40,30], b: [40,65], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [50,78], text: "S = ah/2", size: 14, bold: true, color: "corrA"}
]
},
{
caption: "第 2 个：顶点挪了位置，底还是 a、高还是 h——面积还是 ah/2。",
shapes: [
{ t: "poly", pts: [[20,30],[60,30],[68,65]], color: "corrB", width: 2.5},
{ t: "seg", a: [60,30], b: [72,30], color: "aux", width: 1.5, dash: "5,4"},
{ t: "seg", a: [68,30], b: [68,65], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [50,78], text: "S = ah/2", size: 14, bold: true, color: "corrB"}
]
},
{
caption: "第 3 个：顶点再挪，底高不变——面积永远是 ah/2。没变的是：面积。",
shapes: [
{ t: "poly", pts: [[20,30],[60,30],[28,65]], color: "corrC", width: 2.5},
{ t: "seg", a: [28,30], b: [28,65], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [50,78], text: "S = ah/2", size: 14, bold: true, color: "corrC"}
]
}
]
}
},
auxInteraction: null,
hints: [
"三个三角形长得不一样，但底都是 a、高都是 h——面积全是 ah/2。",
"变化的是：顶点的位置、三角形的形状；没变的是：面积。",
"这就是几何的灵魂：变化中找不变。"
],
examples: [
{ text: "同底等高的三角形：形状不同，面积相同", figure: "图形"}
],
prev: "g11-u1-l3-p2",
next: "g11-u1-l3-p4"
},
{
id: "g11-u1-l3-p4",
title: "算一算三角形面积",
concept: "三角形面积计算",
formulas: [
{
id: "f1",
latex: "S = \\frac{6 \\times 4}{2} = 12",
translation: "底 6、高 4 的三角形面积是 12"
}
],
interaction: {
type: "step-play",
params: {
steps: [
{
caption: "例题：底 6cm、高 4cm——面积 = 6×4÷2 = 12cm²。",
shapes: [
{ t: "poly", pts: [[25,35],[75,35],[50,70]], color: "known", width: 2.5},
{ t: "seg", a: [50,35], b: [50,70], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [50,27], text: "底 = 6", size: 13},
{ t: "txt", p: [56,52], text: "高 = 4", size: 13},
{ t: "txt", p: [50,82], text: "S = 6×4÷2 = 12", size: 15, bold: true, color: "known"}
]
}
]
}
},
auxInteraction: null,
hints: [
"例题：底 6cm、高 4cm 的三角形，面积 = 6×4÷2 = 12cm²。",
"自查三问：底找对了吗？高垂直吗？除以 2 了吗？",
"下一课：两个梯形拼一拼，猜猜公式长什么样。"
],
examples: [
{ text: "三明治：长方形 6×4，对角切一块 12", figure: "实物"}
],
prev: "g11-u1-l3-p3",
next: "g11-u1-l4-p1"
}
]
},
/* ============ g11.1.4 梯形面积（3 页） ============ */
{
id: "g11-u1-l4",
title: "梯形面积",
pages: [
{
id: "g11-u1-l4-p1",
title: "两个梯形拼一拼",
concept: "梯形面积是平行四边形的一半",
formulas: [
{
id: "f1",
latex: "\\text{两个全等梯形} \\Rightarrow \\text{平行四边形}",
translation: "两个完全一样的梯形能拼成一个平行四边形"
}
],
interaction: {
type: "cut-reassemble",
params: {
pieces: [
{ id: "t1", label: "①", pts: [[8,10],[48,10],[38,50],[18,50]]},
{ id: "t2", label: "②", pts: [[48,50],[8,50],[18,10],[38,10]]}
],
targets: [
{ id: "t1", pts: [[25,30],[65,30],[55,70],[35,70]]},
{ id: "t2", pts: [[95,70],[55,70],[65,30],[85,30]]}
],
autoAssemble: true,
doneText: "拼成平行四边形了！"
}
},
auxInteraction: null,
hints: [
"把两个一模一样的梯形拖进虚线轮廓——拼成了一个平行四边形。",
"拼成的平行四边形：底 = 上底 + 下底，高 = 梯形的高。",
"梯形只占一半——公式里又有“除以 2”。"
],
examples: [
{ text: "水渠横截面：两个拼成一个平行四边形", figure: "实物"}
],
prev: "g11-u1-l3-p4",
next: "g11-u1-l4-p2"
},
{
id: "g11-u1-l4-p2",
title: "梯形面积公式",
pageKind: "explain",
concept: "梯形面积公式",
formulas: [
{
id: "f1",
latex: "S = \\frac{(a+b) \\times h}{2}",
translation: "梯形面积等于上底加下底的和乘高除以 2"
}
],
interaction: {
type: "step-play",
params: {
steps: [
{
caption: "梯形：上底 a、下底 b、高 h——两个拼成平行四边形，底是 a+b。",
shapes: [
{ t: "poly", pts: [[30,35],[70,35],[60,65],[40,65]], color: "known", width: 2.5},
{ t: "seg", a: [50,35], b: [50,65], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [50,28], text: "上底 a", size: 13},
{ t: "txt", p: [50,72], text: "下底 b", size: 13},
{ t: "txt", p: [56,50], text: "高 h", size: 13},
{ t: "txt", p: [50,84], text: "S = (a+b)h/2", size: 15, bold: true, color: "known"}
]
}
]
}
},
auxInteraction: null,
hints: [
"还记得吗？两个梯形拼成平行四边形——它的底是“上底+下底”，高是 h。",
"梯形面积 =（上底 + 下底）× 高 ÷ 2：先把上下底加起来，再乘高，最后除以 2。",
"生活例：水渠横截面是梯形，上底 3m、下底 5m、深 2m，面积=(3+5)×2÷2=8㎡。",
"图形例：上底 2、下底 4、高 3，面积=9。",
"反例：只加下底、忘了上底——公式里的 (a+b) 是“两底之和”，少一个不行。",
"⚠️ 别搞混：梯形的“高”是两底之间的垂直距离，不是腰的长度——腰是斜的。",
"记住一句话：梯形面积，两底之和乘高除以 2。"
],
examples: [
{ text: "公式三种记法：(a+b)h/2，认一种就行", figure: "算式"}
],
prev: "g11-u1-l4-p1",
next: "g11-u1-l4-p3"
},
{
id: "g11-u1-l4-p3",
title: "算一算梯形面积",
concept: "梯形面积计算",
formulas: [
{
id: "f1",
latex: "S = \\frac{(3+5) \\times 2}{2} = 8",
translation: "上底 3、下底 5、高 2 的梯形面积是 8"
}
],
interaction: {
type: "step-play",
params: {
steps: [
{
caption: "例题：水坝横截面——上底 3m、下底 5m、高 2m，面积 8㎡。",
shapes: [
{ t: "poly", pts: [[30,40],[70,40],[60,65],[40,65]], color: "known", width: 2.5},
{ t: "seg", a: [50,40], b: [50,65], color: "aux", width: 2, dash: "5,4"},
{ t: "txt", p: [50,33], text: "上底 3", size: 13},
{ t: "txt", p: [50,72], text: "下底 5", size: 13},
{ t: "txt", p: [56,52], text: "高 2", size: 13},
{ t: "txt", p: [50,84], text: "S = (3+5)×2÷2 = 8", size: 15, bold: true, color: "known"}
]
}
]
}
},
auxInteraction: null,
hints: [
"例题：水坝横截面，上底 3m、下底 5m、高 2m——面积=(3+5)×2÷2=8㎡。",
"自查：两底都加了吗？高垂直吗？除以 2 了吗？",
"下一课：圆的面积——剪成小扇形，拼成“长方形”。"
],
examples: [
{ text: "梯子横截面、水坝：生活中找梯形", figure: "实物"}
],
prev: "g11-u1-l4-p2",
next: "g11-u1-l5-p1"
}
]
},
        /* ============ g11.1.5 圆的面积：化圆为方（4 页） ============ */
        {
          id: "g11-u1-l5",
          title: "圆的面积：化圆为方",
          pages: [
            {
              id: "g11-u1-l5-p1",
              title: "把圆切成小扇形",
              concept: "化圆为方（极限思想）",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{瓣越多} \\Rightarrow \\text{越像长方形}",
                  translation: "切成的扇形瓣数越多，拼出来的图形越接近长方形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  autoplay: true,
                  steps: [
                    {
                      caption: "第 1 步：把圆平均切成 8 瓣——每瓣像一块小披萨。",
                      shapes: [
                        { t: "circle", c: [50,55], r: 25, color: "line", width: 2.5 },
                        { t: "ray", p: [50,55], ang: 0, len: 25, color: "aux", width: 1.5 },
                        { t: "ray", p: [50,55], ang: 45, len: 25, color: "aux", width: 1.5 },
                        { t: "ray", p: [50,55], ang: 90, len: 25, color: "aux", width: 1.5 },
                        { t: "ray", p: [50,55], ang: 135, len: 25, color: "aux", width: 1.5 },
                        { t: "ray", p: [50,55], ang: 180, len: 25, color: "aux", width: 1.5 },
                        { t: "ray", p: [50,55], ang: 225, len: 25, color: "aux", width: 1.5 },
                        { t: "ray", p: [50,55], ang: 270, len: 25, color: "aux", width: 1.5 },
                        { t: "ray", p: [50,55], ang: 315, len: 25, color: "aux", width: 1.5 },
                        { t: "txt", p: [50,90], text: "8 瓣", size: 14, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：8 瓣上下交错拼起来——像一条波浪形的带子。",
                      shapes: [
                        { t: "poly", pts: [[14,30],[31.3,30],[22.6,52]], color: "known", width: 1.5 },
                        { t: "poly", pts: [[31.3,30],[48.6,30],[39.9,52]], color: "known", width: 1.5 },
                        { t: "poly", pts: [[48.6,30],[65.8,30],[57.2,52]], color: "known", width: 1.5 },
                        { t: "poly", pts: [[65.8,30],[83.1,30],[74.5,52]], color: "known", width: 1.5 },
                        { t: "poly", pts: [[22.6,30],[39.9,30],[31.3,52]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[39.9,30],[57.2,30],[48.6,52]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[57.2,30],[74.5,30],[65.8,52]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[74.5,30],[91.8,30],[83.1,52]], color: "corrA", width: 1.5 },
                        { t: "txt", p: [50,66], text: "8 瓣拼成的带子", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：切成 16 瓣再拼——瓣变细了，带子变“平”了。",
                      shapes: [
                        { t: "poly", pts: [[14,30],[22.6,30],[18.3,52]], color: "known", width: 1 },
                        { t: "poly", pts: [[22.6,30],[31.3,30],[27,52]], color: "known", width: 1 },
                        { t: "poly", pts: [[31.3,30],[39.9,30],[35.6,52]], color: "known", width: 1 },
                        { t: "poly", pts: [[39.9,30],[48.6,30],[44.2,52]], color: "known", width: 1 },
                        { t: "poly", pts: [[48.6,30],[57.2,30],[52.9,52]], color: "known", width: 1 },
                        { t: "poly", pts: [[57.2,30],[65.8,30],[61.5,52]], color: "known", width: 1 },
                        { t: "poly", pts: [[65.8,30],[74.5,30],[70.2,52]], color: "known", width: 1 },
                        { t: "poly", pts: [[74.5,30],[83.1,30],[78.8,52]], color: "known", width: 1 },
                        { t: "poly", pts: [[18.3,30],[27,30],[22.6,52]], color: "corrA", width: 1 },
                        { t: "poly", pts: [[27,30],[35.6,30],[31.3,52]], color: "corrA", width: 1 },
                        { t: "poly", pts: [[35.6,30],[44.2,30],[39.9,52]], color: "corrA", width: 1 },
                        { t: "poly", pts: [[44.2,30],[52.9,30],[48.6,52]], color: "corrA", width: 1 },
                        { t: "poly", pts: [[52.9,30],[61.5,30],[57.2,52]], color: "corrA", width: 1 },
                        { t: "poly", pts: [[61.5,30],[70.2,30],[65.8,52]], color: "corrA", width: 1 },
                        { t: "poly", pts: [[70.2,30],[78.8,30],[74.5,52]], color: "corrA", width: 1 },
                        { t: "poly", pts: [[78.8,30],[87.4,30],[83.1,52]], color: "corrA", width: 1 },
                        { t: "txt", p: [50,66], text: "16 瓣：更平了", size: 13 }
                      ]
                    },
                    {
                      caption: "第 4 步：64 瓣拼起来——瓣细得像牙签，直接看“带子”：已经很像长方形了。",
                      shapes: [
                        { t: "poly", pts: [[14,30],[87,30],[87,52],[14,52]], color: "known", width: 2 },
                        { t: "seg", a: [23,30], b: [23,52], color: "aux", width: 1, dash: "4,3" },
                        { t: "seg", a: [32,30], b: [32,52], color: "aux", width: 1, dash: "4,3" },
                        { t: "seg", a: [41,30], b: [41,52], color: "aux", width: 1, dash: "4,3" },
                        { t: "seg", a: [50,30], b: [50,52], color: "aux", width: 1, dash: "4,3" },
                        { t: "seg", a: [59,30], b: [59,52], color: "aux", width: 1, dash: "4,3" },
                        { t: "seg", a: [68,30], b: [68,52], color: "aux", width: 1, dash: "4,3" },
                        { t: "seg", a: [77,30], b: [77,52], color: "aux", width: 1, dash: "4,3" },
                        { t: "txt", p: [50,66], text: "64 瓣：很像长方形了", size: 13 }
                      ]
                    },
                    {
                      caption: "第 5 步：128 瓣——拼出来几乎就是长方形！长≈πr（半个圆周），宽=r。",
                      shapes: [
                        { t: "poly", pts: [[14,30],[87,30],[87,52],[14,52]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,64], text: "长 ≈ πr（圆周长的一半）", size: 13 },
                        { t: "txt", p: [93,41], text: "宽=r", size: 13 },
                        { t: "txt", p: [50,78], text: "128 瓣：几乎长方形", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点播放：看圆被切成越来越细的瓣，拼成的带子越来越“方”。",
                "瓣数 8→16→64→128：变的是瓣的粗细和带子的“方”度；没变的是：面积。",
                "这就是“化圆为方”——下一页算出它到底等于多少。"
              ],
              examples: [
                { text: "披萨切瓣：瓣越多，拼得越方", figure: "实物" }
              ],
              prev: "g11-u1-l4-p3",
              next: "g11-u1-l5-p2"
            },
            {
              id: "g11-u1-l5-p2",
              title: "圆面积公式的由来",
              pageKind: "explain",
              concept: "圆面积公式",
              formulas: [
                {
                  id: "f1",
                  latex: "S = \\pi r^2",
                  translation: "圆面积等于圆周率乘以半径的平方"
                },
                {
                  id: "f2",
                  latex: "\\text{长} = \\pi r, \\text{宽} = r",
                  translation: "拼成的近似长方形，长是 πr，宽是 r"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "近似长方形：长 = 圆周长的一半 = πr，宽 = 半径 r——面积 = πr×r = πr²。",
                      shapes: [
                        { t: "poly", pts: [[14,32],[86,32],[86,58],[14,58]], color: "known", width: 2.5 },
                        { t: "txt", p: [50,70], text: "长 = πr（圆周长的一半）", size: 13 },
                        { t: "txt", p: [92,45], text: "宽=r", size: 13 },
                        { t: "txt", p: [50,82], text: "S = πr × r = πr²", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？128 瓣拼成了近似长方形——它的长是圆周长的一半：2πr÷2=πr，宽是半径 r。",
                "圆面积 = πr × r = πr²：圆周率乘以半径的平方。",
                "生活例：披萨 9 寸（半径约 11cm），面积≈3.14×121≈380cm²。图形例：r=3，面积=9π。",
                "反例：公式里是 r²（半径的平方）——别把直径当半径代进去，直径要先除以 2。",
                "⚠️ 别搞混：圆周长是 2πr（一圈的“线”），圆面积是 πr²（一整块“面”）——长得像，意思完全不同。",
                "记住一句话：圆面积，π 乘以半径的平方。"
              ],
              examples: [
                { text: "r=2：面积=4π≈12.56", figure: "算式" }
              ],
              prev: "g11-u1-l5-p1",
              next: "g11-u1-l5-p3"
            },
            {
              id: "g11-u1-l5-p3",
              title: "极限：先看到，再算到",
              pageKind: "explain",
              concept: "极限思想的几何预演",
              formulas: [
                {
                  id: "f1",
                  latex: "S = \\pi r^2",
                  translation: "这个公式，是“分割→近似→极限”三步走出来的"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "8 瓣拼",
                      caption: "8 瓣拼成的带子：波浪边很明显，还不太“方”。",
                      shapes: [
                        { t: "poly", pts: [[14,30],[31.3,30],[22.6,52]], color: "known", width: 1.5 },
                        { t: "poly", pts: [[31.3,30],[48.6,30],[39.9,52]], color: "known", width: 1.5 },
                        { t: "poly", pts: [[48.6,30],[65.8,30],[57.2,52]], color: "known", width: 1.5 },
                        { t: "poly", pts: [[65.8,30],[83.1,30],[74.5,52]], color: "known", width: 1.5 },
                        { t: "poly", pts: [[22.6,30],[39.9,30],[31.3,52]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[39.9,30],[57.2,30],[48.6,52]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[57.2,30],[74.5,30],[65.8,52]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[74.5,30],[91.8,30],[83.1,52]], color: "corrA", width: 1.5 },
                        { t: "txt", p: [50,66], text: "8 瓣：波浪边明显", size: 13 }
                      ]
                    },
                    {
                      label: "128 瓣拼",
                      caption: "128 瓣拼成的带子：几乎就是长方形——瓣越多，越接近。",
                      shapes: [
                        { t: "poly", pts: [[14,30],[87,30],[87,52],[14,52]], color: "target", width: 2.5 },
                        { t: "txt", p: [50,41], text: "≈ 长方形", size: 14, bold: true },
                        { t: "txt", p: [50,66], text: "128 瓣：几乎长方形", size: 13, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三步：分割（切成瓣）→近似（拼成长方形）→极限（瓣越多越像）——这就是“极限”思想。",
                "“极限”是说：瓣数一直加下去，拼出来的图形和长方形之间的差别可以小到忽略不计。",
                "预告 H6：代数第十二章算“曲边梯形面积”时，会把这三步变成真正的计算——几何先让你“看到”，代数再让你“算到”。",
                "记住一句话：先在图形上看到极限，再在代数里算出极限。"
              ],
              examples: [
                { text: "H6 互链：代数 ch12 曲边梯形面积", figure: "互链" }
              ],
              prev: "g11-u1-l5-p2",
              next: "g11-u1-l5-p4"
            },
            {
              id: "g11-u1-l5-p4",
              title: "算一算圆的面积",
              concept: "圆面积计算",
              formulas: [
                {
                  id: "f1",
                  latex: "S = \\pi \\times 3^2 = 9\\pi",
                  translation: "半径 3 的圆，面积是 9π"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "例题：半径 3cm 的圆——面积 = π×3² = 9π ≈ 28.26cm²。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 25, color: "known", width: 2.5 },
                        { t: "seg", a: [50,50], b: [75,50], color: "target", width: 2.5 },
                        { t: "pt", p: [50,50], label: "O", color: "known" },
                        { t: "txt", p: [63,42], text: "r=3", size: 13, color: "target" },
                        { t: "txt", p: [50,85], text: "S = π×9 = 9π", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "例题：半径 3cm 的圆，面积 = π×3² = 9π ≈ 28.26cm²。",
                "π 取 3.14 是近似——题目没说时，保留 π 更精确。",
                "下一课：只取圆的“一块”——弧长和扇形面积。"
              ],
              examples: [
                { text: "井盖：半径 30cm，面积≈2826cm²", figure: "实物" }
              ],
              prev: "g11-u1-l5-p3",
              next: "g11-u1-l6-p1"
            }
          ]
        },
        /* ============ g11.1.6 弧长与扇形面积（4 页，白队要求拆页） ============ */
        {
          id: "g11-u1-l6",
          title: "弧长与扇形面积",
          pages: [
            {
              id: "g11-u1-l6-p1",
              title: "圆心角越大，扇形越大",
              concept: "弧长与扇形面积跟圆心角成正比",
              formulas: [
                {
                  id: "f1",
                  latex: "\\frac{n}{360}",
                  translation: "圆心角是 n 度，扇形就占整个圆的 n 比 360"
                },
                {
                  id: "f2",
                  latex: "\\frac{60}{360}=\\frac{1}{6}",
                  translation: "n=60°：扇形占圆的 60 比 360，约成六分之一"
                },
                {
                  id: "f3",
                  latex: "\\frac{120}{360}=\\frac{1}{3}",
                  translation: "n=120°：扇形占圆的 120 比 360，约成三分之一"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "n=60°：扇形占圆的六分之一。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "line", width: 2 },
                        { t: "poly", pts: [[50,50],[50,78],[74.2,64]], color: "target", width: 2, fill: "target", opacity: 0.25 },
                        { t: "txt", p: [50,88], text: "60/360=1/6", size: 13, math: true }
                      ]
                    },
                    {
                      caption: "n=120°：扇形占圆的三分之一。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "line", width: 2 },
                        { t: "poly", pts: [[50,50],[50,78],[74.2,36]], color: "target", width: 2, fill: "target", opacity: 0.25 },
                        { t: "txt", p: [50,88], text: "120/360=1/3", size: 13, math: true }
                      ]
                    },
                    {
                      caption: "n=180°：占一半——半圆。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "line", width: 2 },
                        { t: "poly", pts: [[50,50],[50,78],[50,22],[78,50]], color: "target", width: 2, fill: "target", opacity: 0.25 },
                        { t: "txt", p: [50,88], text: "n=180°，占一半", size: 13 }
                      ]
                    },
                    {
                      caption: "n=360°：占全部——整个圆。弧长和扇形面积都跟 n 成正比。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "target", width: 2.5, fill: "target", opacity: 0.25 },
                        { t: "txt", p: [50,88], text: "n=360°，占全部", size: 13, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一步步点：圆心角 n 从 60° 长到 360°，扇形“吃掉”圆的比例 = n/360。",
                "变的是：n 和扇形大小；没变的是：比例关系——弧长和面积都跟 n 成正比。",
                "n 是“几份”：把圆 360 等份，取其中 n 份。"
              ],
              examples: [
                { text: "披萨切 6 块：每块圆心角 60°", figure: "实物" }
              ],
              prev: "g11-u1-l5-p4",
              next: "g11-u1-l6-p2"
            },
            {
              id: "g11-u1-l6-p2",
              title: "弧长公式",
              pageKind: "explain",
              concept: "弧长公式",
              formulas: [
                {
                  id: "f1",
                  latex: "l = \\frac{n \\pi r}{180}",
                  translation: "弧长等于 n 乘 π 乘 r 除以 180"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "弧长 = 圆周长 × n/360 = 2πr×n/360 = nπr/180。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "line", width: 2 },
                        { t: "poly", pts: [[50,50],[50,78],[74.2,64]], color: "target", width: 2.5, fill: "target", opacity: 0.2 },
                        { t: "seg", a: [50,50], b: [74.2,64], color: "known", width: 2 },
                        { t: "txt", p: [64,52], text: "r", size: 13, color: "known" },
                        { t: "txt", p: [50,30], text: "n", size: 13 },
                        { t: "txt", p: [50,88], text: "弧长 l = nπr/180", size: 15, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？n 度的弧占整个圆的 n/360——圆周长是 2πr。",
                "弧长 = 2πr × n/360 = nπr/180：圆周长按比例切 n 份。",
                "生活例：半径 10m 的圆形花坛，走 90° 的弧，路程=90×π×10÷180=5π≈15.7m。",
                "图形例：n=180，弧长=πr（半圆周）。",
                "反例：n 用的是“度数”——v1.0 不讲弧度制，别混进来。",
                "⚠️ 别搞混：分母 180 不是 360——因为 2πr×n/360 化简后 2 和 360 约掉了。",
                "记住一句话：弧长，nπr 除以 180。"
              ],
              examples: [
                { text: "n=90,r=4：弧长=2π", figure: "算式" }
              ],
              prev: "g11-u1-l6-p1",
              next: "g11-u1-l6-p3"
            },
            {
              id: "g11-u1-l6-p3",
              title: "扇形面积公式",
              pageKind: "explain",
              concept: "扇形面积公式",
              formulas: [
                {
                  id: "f1",
                  latex: "S = \\frac{n \\pi r^2}{360}",
                  translation: "扇形面积等于 n 乘 π 乘 r 的平方除以 360"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "扇形面积 = 圆面积 × n/360 = πr²×n/360 = nπr²/360。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "line", width: 2 },
                        { t: "poly", pts: [[50,50],[50,78],[74.2,64]], color: "corrA", width: 2.5, fill: "corrA", opacity: 0.25 },
                        { t: "seg", a: [50,50], b: [74.2,64], color: "known", width: 2 },
                        { t: "txt", p: [64,52], text: "r", size: 13, color: "known" },
                        { t: "txt", p: [50,30], text: "n", size: 13 },
                        { t: "txt", p: [50,88], text: "S = nπr²/360", size: 15, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "同样套路：n 度的扇形占整个圆的 n/360——圆面积是 πr²。",
                "扇形面积 = πr² × n/360 = nπr²/360：圆面积按比例切 n 份。",
                "生活例：披萨切 6 块，每块是 n=60° 的扇形。图形例：n=90、r=4，面积=90×π×16÷360=4π。",
                "反例：别把弧长公式的分母 180 搬过来——面积的分母是 360。",
                "⚠️ 别搞混：弧长是“线”（分母 180），扇形是“面”（分母 360）——量纲不同，公式不同。",
                "记住一句话：扇形面积，nπr² 除以 360。"
              ],
              examples: [
                { text: "n=60,r=6：面积=6π", figure: "算式" }
              ],
              prev: "g11-u1-l6-p2",
              next: "g11-u1-l6-p4"
            },
            {
              id: "g11-u1-l6-p4",
              title: "算一算弧长和扇形",
              concept: "弧长与扇形面积计算",
              formulas: [
                {
                  id: "f1",
                  latex: "l = 2\\pi, S = 4\\pi",
                  translation: "n=90°、r=4：弧长 2π，扇形面积 4π"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "例题：n=90°、r=4cm——弧长=2π，扇形面积=4π。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "line", width: 2 },
                        { t: "poly", pts: [[50,50],[50,78],[78,50]], color: "target", width: 2.5, fill: "target", opacity: 0.2 },
                        { t: "seg", a: [50,50], b: [78,50], color: "known", width: 2 },
                        { t: "txt", p: [65,42], text: "r=4", size: 13, color: "known" },
                        { t: "txt", p: [42,62], text: "n=90°", size: 13 },
                        { t: "txt", p: [50,88], text: "l=2π，S=4π", size: 15, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "例题：n=90°、r=4cm——弧长=90×π×4÷180=2π；扇形面积=90×π×16÷360=4π。",
                "自查：n 是度数吗？r 是半径吗？分母没拿错吗？",
                "下一课：从平面到立体——柱体的表面积和体积。"
              ],
              examples: [
                { text: "钟表分针：走 15 分钟扫过 90°", figure: "实物" }
              ],
              prev: "g11-u1-l6-p3",
              next: "g11-u1-l7-p1"
            }
          ]
        },
        /* ============ g11.1.7 柱体的表面积与体积（5 页，白队要求拆页） ============ */
        {
          id: "g11-u1-l7",
          title: "柱体的表面积与体积",
          pages: [
            {
              id: "g11-u1-l7-p1",
              title: "纸盒展开：表面积",
              concept: "表面积等于展开图面积",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{表面积} = \\text{展开图的面积}",
                  translation: "立体图形的表面积就是把它展开铺平后的面积"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：一个长方体纸盒——6 个面围起来。",
                      shapes: [
                        { t: "poly", pts: [[30,35],[70,35],[70,65],[30,65]], color: "line", width: 2.5 },
                        { t: "poly", pts: [[30,65],[40,75],[80,75],[70,65]], color: "line", width: 1.5 },
                        { t: "poly", pts: [[70,35],[80,45],[80,75],[70,65]], color: "line", width: 1.5 },
                        { t: "txt", p: [50,88], text: "6 个面围成", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：沿棱剪开——剪开的边用虚线标出来。",
                      shapes: [
                        { t: "poly", pts: [[30,35],[70,35],[70,65],[30,65]], color: "line", width: 2 },
                        { t: "seg", a: [30,35], b: [30,65], color: "target", width: 2, dash: "5,4" },
                        { t: "seg", a: [70,35], b: [70,65], color: "target", width: 2, dash: "5,4" },
                        { t: "seg", a: [30,65], b: [70,65], color: "target", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,88], text: "沿虚线剪开", size: 13, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：摊平——6 个面躺在桌面上。",
                      shapes: [
                        { t: "poly", pts: [[40,15],[60,15],[60,30],[40,30]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[40,30],[60,30],[60,45],[40,45]], color: "corrB", width: 1.5 },
                        { t: "poly", pts: [[40,45],[60,45],[60,60],[40,60]], color: "corrC", width: 1.5 },
                        { t: "poly", pts: [[40,60],[60,60],[60,75],[40,75]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[25,45],[40,45],[40,60],[25,60]], color: "corrB", width: 1.5 },
                        { t: "poly", pts: [[60,45],[75,45],[75,60],[60,60]], color: "corrC", width: 1.5 },
                        { t: "txt", p: [50,88], text: "6 个面摊平", size: 13 }
                      ]
                    },
                    {
                      caption: "第 4 步：表面积 = 6 个面的面积加起来——展开前后，面积没变。",
                      shapes: [
                        { t: "poly", pts: [[40,15],[60,15],[60,30],[40,30]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[40,30],[60,30],[60,45],[40,45]], color: "corrB", width: 1.5 },
                        { t: "poly", pts: [[40,45],[60,45],[60,60],[40,60]], color: "corrC", width: 1.5 },
                        { t: "poly", pts: [[40,60],[60,60],[60,75],[40,75]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[25,45],[40,45],[40,60],[25,60]], color: "corrB", width: 1.5 },
                        { t: "poly", pts: [[60,45],[75,45],[75,60],[60,60]], color: "corrC", width: 1.5 },
                        { t: "txt", p: [50,88], text: "表面积 = 展开图面积", size: 14, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点播放：看纸盒被“剥开”摊平——立体变平面。",
                "没变的是：面积——表面积就是展开图的面积。",
                "下一页：算出长方体的表面积公式。"
              ],
              examples: [
                { text: "快递纸箱：展开就是一张大纸板", figure: "实物" }
              ],
              prev: "g11-u1-l6-p4",
              next: "g11-u1-l7-p2"
            },
            {
              id: "g11-u1-l7-p2",
              title: "棱柱的表面积",
              pageKind: "explain",
              concept: "棱柱表面积公式",
              formulas: [
                {
                  id: "f1",
                  latex: "S = 2(ab + bc + ca)",
                  translation: "长方体表面积等于 2 乘以长宽、宽高、长高的和"
                },
                {
                  id: "f2",
                  latex: "S_{\\text{柱}} = 2S_{\\text{底}} + S_{\\text{侧}}",
                  translation: "柱体表面积等于 2 个底面积加侧面积"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "长方体：长 a、宽 b、高 c——三组对面，每组 2 个。",
                      shapes: [
                        { t: "poly", pts: [[40,30],[60,30],[60,45],[40,45]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[40,45],[60,45],[60,60],[40,60]], color: "corrB", width: 1.5 },
                        { t: "poly", pts: [[25,45],[40,45],[40,60],[25,60]], color: "corrC", width: 1.5 },
                        { t: "txt", p: [50,22], text: "ab × 2", size: 12, color: "corrA" },
                        { t: "txt", p: [50,68], text: "bc × 2", size: 12, color: "corrB" },
                        { t: "txt", p: [16,52], text: "ca × 2", size: 12, color: "corrC" },
                        { t: "txt", p: [50,84], text: "S = 2(ab+bc+ca)", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？纸盒摊平是 6 个面——长方体：长 a、宽 b、高 c，6 个面两两相同。",
                "长方体表面积 = 2(ab+bc+ca)：三组对面，每组 2 个。",
                "一般棱柱：表面积 = 2×底面积 + 侧面积——两个底 + 一圈侧面。",
                "生活例：粉刷长方体水池（无盖）——5 个面，别把 6 个全算上。",
                "图形例：a=3,b=4,c=5，表面积=2(12+20+15)=94。",
                "反例：无盖/无底的盒子——先数有几个面，再套公式。",
                "⚠️ 别搞混：表面积是“所有面的面积之和”——漏一个面，结果就错了。"
              ],
              examples: [
                { text: "魔方：6 个面，每个 9 格", figure: "实物" }
              ],
              prev: "g11-u1-l7-p1",
              next: "g11-u1-l7-p3"
            },
            {
              id: "g11-u1-l7-p3",
              title: "圆柱侧面展开",
              concept: "圆柱侧面展开是矩形",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{侧面展开} \\Rightarrow \\text{矩形}",
                  translation: "圆柱的侧面沿一条母线剪开展平，得到一个矩形"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：一个圆柱——两个底圆 + 一圈侧面。",
                      shapes: [
                        { t: "poly", pts: [[35,35],[65,35],[65,65],[35,65]], color: "line", width: 2.5 },
                        { t: "poly", pts: [[35,35],[65,35],[62,40],[38,40]], color: "line", width: 1.5 },
                        { t: "poly", pts: [[35,65],[65,65],[62,60],[38,60]], color: "line", width: 1.5 },
                        { t: "txt", p: [50,80], text: "两个底圆 + 侧面", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：沿一条母线（竖直的边）剪开。",
                      shapes: [
                        { t: "poly", pts: [[35,35],[65,35],[65,65],[35,65]], color: "line", width: 2 },
                        { t: "seg", a: [50,35], b: [50,65], color: "target", width: 2.5, dash: "5,4" },
                        { t: "txt", p: [50,80], text: "沿这条线剪开", size: 13, color: "target" }
                      ]
                    },
                    {
                      caption: "第 3 步：侧面“剥”下来摊平——是个矩形！",
                      shapes: [
                        { t: "poly", pts: [[20,35],[80,35],[80,65],[20,65]], color: "known", width: 2.5 },
                        { t: "txt", p: [50,80], text: "侧面摊平：矩形！", size: 14, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 4 步：矩形的长 = 底面周长 2πr，宽 = 圆柱的高 h——侧面积 = 2πrh。",
                      shapes: [
                        { t: "poly", pts: [[20,35],[80,35],[80,65],[20,65]], color: "known", width: 2.5 },
                        { t: "txt", p: [50,75], text: "长 = 2πr（绕底圆一圈）", size: 13 },
                        { t: "txt", p: [88,50], text: "宽=h", size: 13 },
                        { t: "txt", p: [50,88], text: "侧面积 = 2πrh", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点播放：看圆柱的侧面被“剥”下来——卷着的面摊平了。",
                "关键：矩形的长正好绕底圆一圈——长=2πr，宽=h。",
                "这是本课最重要的动画：侧面积 = 2πrh 就藏在这里。"
              ],
              examples: [
                { text: "卷纸筒剪开：侧面是一张长方形纸", figure: "实物" }
              ],
              prev: "g11-u1-l7-p2",
              next: "g11-u1-l7-p4"
            },
            {
              id: "g11-u1-l7-p4",
              title: "圆柱的表面积",
              pageKind: "explain",
              concept: "圆柱表面积公式",
              formulas: [
                {
                  id: "f1",
                  latex: "S = 2\\pi r^2 + 2\\pi rh",
                  translation: "圆柱表面积等于 2 个底圆面积加侧面积"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "圆柱 = 两个底圆 + 一个侧面矩形——三部分加起来。",
                      shapes: [
                        { t: "circle", c: [28,50], r: 12, color: "corrA", width: 2 },
                        { t: "circle", c: [52,50], r: 12, color: "corrA", width: 2 },
                        { t: "poly", pts: [[70,38],[92,38],[92,62],[70,62]], color: "corrB", width: 2 },
                        { t: "txt", p: [28,68], text: "πr²", size: 12, color: "corrA" },
                        { t: "txt", p: [52,68], text: "πr²", size: 12, color: "corrA" },
                        { t: "txt", p: [81,68], text: "2πrh", size: 12, color: "corrB" },
                        { t: "txt", p: [55,84], text: "S = 2πr² + 2πrh", size: 14, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？圆柱 = 两个底圆 + 一个侧面矩形——三部分加起来。",
                "圆柱表面积 = 2πr² + 2πrh：两个底圆（πr²×2）+ 侧面（2πr×h）。",
                "生活例：易拉罐贴标签——只算侧面 2πrh，不用算顶底。",
                "图形例：r=2、h=5，表面积=2π×4+2π×10=28π。",
                "反例：无盖水桶——1 个底圆 + 侧面，别算 2 个底。",
                "⚠️ 别搞混：2πr² 是两个“面”，2πrh 是一个“面”——r² 和 rh 别抄混。",
                "记住一句话：圆柱表面积，两底加侧面。"
              ],
              examples: [
                { text: "茶叶罐：r=5cm,h=12cm", figure: "实物" }
              ],
              prev: "g11-u1-l7-p3",
              next: "g11-u1-l7-p5"
            },
            {
              id: "g11-u1-l7-p5",
              title: "柱体体积：底面积乘高",
              pageKind: "explain",
              concept: "柱体体积公式",
              formulas: [
                {
                  id: "f1",
                  latex: "V = S \\times h",
                  translation: "柱体体积等于底面积乘以高"
                },
                {
                  id: "f2",
                  latex: "V_{\\text{圆柱}} = \\pi r^2 h",
                  translation: "圆柱体积等于 π 乘 r 的平方乘 h"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "第 1 步：底面积是 S 的薄片，摞 h 这么高——体积 = S×h。",
                      shapes: [
                        { t: "poly", pts: [[30,60],[70,60],[70,66],[30,66]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[30,52],[70,52],[70,58],[30,58]], color: "corrA", width: 1.5 },
                        { t: "poly", pts: [[30,44],[70,44],[70,50],[30,50]], color: "corrA", width: 1.5 },
                        { t: "txt", p: [78,55], text: "摞 h 层", size: 13 },
                        { t: "txt", p: [50,78], text: "V = S×h", size: 15, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：圆柱也一样——底面积 πr²，高 h，体积 = πr²h。",
                      shapes: [
                        { t: "poly", pts: [[30,44],[70,44],[70,66],[30,66]], color: "known", width: 2 },
                        { t: "poly", pts: [[30,44],[70,44],[66,50],[34,50]], color: "known", width: 1.5 },
                        { t: "txt", p: [50,36], text: "底面积 = πr²", size: 13 },
                        { t: "txt", p: [78,55], text: "高 h", size: 13 },
                        { t: "txt", p: [50,78], text: "V = πr²h", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "体积是“摞”出来的：底面积 S 的薄片摞 h 层——V=Sh，棱柱圆柱通用。",
                "圆柱：底面积是 πr²——V=πr²h。",
                "生活例：水箱注水——底面积 2㎡、高 1.5m，能装 3m³ 水。",
                "图形例：r=3、h=4 的圆柱，V=π×9×4=36π。",
                "反例：别把表面积公式拿来算体积——一个是“面”（平方），一个是“体”（立方）。",
                "⚠️ 别搞混：体积单位是“立方”（cm³）——1cm³ 是一块小方糖。",
                "记住一句话：柱体体积，底面积乘高。"
              ],
              examples: [
                { text: "水箱：2×1.5=3 立方米", figure: "实物" }
              ],
              prev: "g11-u1-l7-p4",
              next: "g11-u1-l8-p1"
            }
          ]
        },
        /* ============ g11.1.8 锥体体积（3 页） ============ */
        {
          id: "g11-u1-l8",
          title: "锥体体积",
          pages: [
            {
              id: "g11-u1-l8-p1",
              title: "沙漏实验：三杯沙",
              concept: "锥体体积是等底等高柱体的三分之一",
              formulas: [
                {
                  id: "f1",
                  latex: "V_{\\text{锥}} = \\frac{1}{3} V_{\\text{柱}}",
                  translation: "等底等高的锥体体积是柱体体积的三分之一"
                },
                {
                  id: "f2",
                  latex: "\\frac{2}{3}",
                  translation: "两杯沙占柱体体积的三分之二"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：一个空圆柱，和一个等底等高的圆锥装满沙。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "line", width: 2.5 },
                        { t: "txt", p: [50,22], text: "空圆柱", size: 13 },
                        { t: "poly", pts: [[30,30],[70,30],[50,70]], color: "corrA", width: 2, fill: "corrA", opacity: 0.3 },
                        { t: "txt", p: [50,82], text: "一满杯锥体沙（等底等高）", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：第一杯沙倒进圆柱——只占三分之一。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "line", width: 2.5 },
                        { t: "poly", pts: [[30,56.7],[70,56.7],[70,70],[30,70]], color: "corrA", width: 1.5, fill: "corrA", opacity: 0.5 },
                        { t: "txt", p: [50,82], text: "1/3", size: 14, math: true }
                      ]
                    },
                    {
                      caption: "第 3 步：第二杯沙——占到三分之二。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "line", width: 2.5 },
                        { t: "poly", pts: [[30,43.3],[70,43.3],[70,70],[30,70]], color: "corrA", width: 1.5, fill: "corrA", opacity: 0.5 },
                        { t: "txt", p: [50,82], text: "2/3", size: 14, math: true }
                      ]
                    },
                    {
                      caption: "第 4 步：第三杯沙——圆柱恰好装满！V锥 = V柱÷3。",
                      shapes: [
                        { t: "poly", pts: [[30,30],[70,30],[70,70],[30,70]], color: "target", width: 2.5, fill: "target", opacity: 0.3 },
                        { t: "txt", p: [50,82], text: "第 3 杯：满了！V锥=V柱÷3", size: 14, bold: true, color: "target" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点播放：三杯锥体沙，恰好装满一个等底等高的柱体。",
                "变的是：沙的杯数；没变的是：每杯一样多——三杯=一柱。",
                "前提：等底等高——底和高都一样，才能这么比。"
              ],
              examples: [
                { text: "沙漏：上面的沙漏完，正好是下面的体积", figure: "实物" }
              ],
              prev: "g11-u1-l7-p5",
              next: "g11-u1-l8-p2"
            },
            {
              id: "g11-u1-l8-p2",
              title: "锥体体积公式",
              pageKind: "explain",
              concept: "锥体体积公式",
              formulas: [
                {
                  id: "f1",
                  latex: "V = \\frac{S \\times h}{3}",
                  translation: "锥体体积等于底面积乘高除以 3"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "圆锥、棱锥都一样：V = Sh÷3——柱体体积砍成三份。",
                      shapes: [
                        { t: "poly", pts: [[20,55],[45,55],[32.5,30]], color: "corrA", width: 2 },
                        { t: "poly", pts: [[55,55],[80,55],[80,30],[55,30]], color: "corrB", width: 2 },
                        { t: "txt", p: [32,66], text: "圆锥", size: 12, color: "corrA" },
                        { t: "txt", p: [67,66], text: "棱锥", size: 12, color: "corrB" },
                        { t: "txt", p: [50,82], text: "V = Sh ÷ 3", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？三杯沙装满一柱——锥体体积 = 柱体体积 ÷ 3。",
                "锥体体积 = Sh÷3：底面积乘高，再除以 3——圆锥、棱锥都一样。",
                "生活例：冰淇淋蛋筒（圆锥）装冰淇淋。图形例：底面积 12、高 5 的棱锥，V=12×5÷3=20。",
                "反例：底和高不一样的锥和柱——不能直接除以 3，“等底等高”是前提。",
                "⚠️ 别搞混：除以 3 是锥体的专属——柱体不用除，球体有自己的公式。",
                "记住一句话：锥体体积，底面积乘高除以 3。"
              ],
              examples: [
                { text: "金字塔：方锥体，V=Sh/3", figure: "实物" }
              ],
              prev: "g11-u1-l8-p1",
              next: "g11-u1-l8-p3"
            },
            {
              id: "g11-u1-l8-p3",
              title: "算一算锥体体积",
              concept: "锥体体积计算",
              formulas: [
                {
                  id: "f1",
                  latex: "V = \\frac{\\pi \\times 3^2 \\times 4}{3} = 12\\pi",
                  translation: "底面半径 3、高 4 的圆锥体积是 12π"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "例题：圆锥 r=3cm、h=4cm——底面积=9π，体积=9π×4÷3=12π cm³。",
                      shapes: [
                        { t: "poly", pts: [[30,65],[70,65],[50,30]], color: "known", width: 2.5 },
                        { t: "seg", a: [30,65], b: [70,65], color: "known", width: 2 },
                        { t: "seg", a: [50,30], b: [50,65], color: "aux", width: 2, dash: "5,4" },
                        { t: "txt", p: [50,72], text: "r=3", size: 13 },
                        { t: "txt", p: [56,47], text: "h=4", size: 13 },
                        { t: "txt", p: [50,84], text: "V = 12π", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "例题：圆锥 r=3cm、h=4cm——底面积=9π，体积=9π×4÷3=12π cm³。",
                "自查：底面积算对了吗（πr²）？除以 3 了吗？",
                "下一课：最“圆”的立体——球的表面积和体积。"
              ],
              examples: [
                { text: "蛋筒：r=3cm,h=10cm 能装多少冰淇淋", figure: "实物" }
              ],
              prev: "g11-u1-l8-p2",
              next: "g11-u1-l9-p1"
            }
          ]
        },
        /* ============ g11.1.9 球的表面积与体积（3 页） ============ */
        {
          id: "g11-u1-l9",
          title: "球的表面积与体积",
          pages: [
            {
              id: "g11-u1-l9-p1",
              title: "橘子瓣拼球面",
              concept: "球表面积的直观",
              formulas: [
                {
                  id: "f1",
                  latex: "S_{\\text{球}} = 4\\pi r^2",
                  translation: "球的表面积等于 4 倍的大圆面积"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1800,
                  steps: [
                    {
                      caption: "第 1 步：一个球——像个大橘子。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "line", width: 2.5 },
                        { t: "txt", p: [50,88], text: "一个球", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：像切橘子一样，把球切成 8 瓣。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "line", width: 2 },
                        { t: "seg", a: [50,22], b: [50,78], color: "aux", width: 1.5 },
                        { t: "seg", a: [22,50], b: [78,50], color: "aux", width: 1.5 },
                        { t: "seg", a: [30,30], b: [70,70], color: "aux", width: 1.5 },
                        { t: "seg", a: [30,70], b: [70,30], color: "aux", width: 1.5 },
                        { t: "txt", p: [50,88], text: "切成 8 瓣", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：取一瓣看它的“皮”——瓣越多，皮越接近平面。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 28, color: "line", width: 1.5, dash: "5,4" },
                        { t: "poly", pts: [[50,50],[50,78],[69.8,69.8]], color: "target", width: 2.5, fill: "target", opacity: 0.3 },
                        { t: "txt", p: [50,88], text: "一瓣的“皮”", size: 13, color: "target" }
                      ]
                    },
                    {
                      caption: "第 4 步：所有瓣的皮拼起来，差不多能铺满 4 个大圆——S=4πr²。",
                      shapes: [
                        { t: "circle", c: [20,50], r: 13, color: "corrA", width: 2 },
                        { t: "circle", c: [47,50], r: 13, color: "corrA", width: 2 },
                        { t: "circle", c: [74,50], r: 13, color: "corrA", width: 2 },
                        { t: "circle", c: [50,76], r: 13, color: "corrA", width: 2 },
                        { t: "txt", p: [50,30], text: "≈ 4 个大圆", size: 13 },
                        { t: "txt", p: [50,94], text: "S = 4πr²", size: 15, bold: true, color: "corrA" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点播放：球切成瓣，瓣的皮拼成 4 个大圆——球表面积 = 4πr²。",
                "这是“结论+直观”：严格证明要用到积分，我们先在图形上“看到”它。",
                "回填点：学完代数第十二章（定积分），回来补证明。"
              ],
              examples: [
                { text: "橘子：剥下的皮拼一拼", figure: "实物" }
              ],
              prev: "g11-u1-l8-p3",
              next: "g11-u1-l9-p2"
            },
            {
              id: "g11-u1-l9-p2",
              title: "球的表面积和体积",
              pageKind: "explain",
              concept: "球的表面积与体积公式",
              formulas: [
                {
                  id: "f1",
                  latex: "S = 4\\pi r^2",
                  translation: "球表面积等于 4π 乘以半径的平方"
                },
                {
                  id: "f2",
                  latex: "V = \\frac{4}{3}\\pi r^3",
                  translation: "球体积等于三分之四 π 乘以半径的立方"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "球：表面积 S=4πr²（4 倍大圆），体积 V=4πr³/3——先记住、用熟，证明以后补。",
                      shapes: [
                        { t: "circle", c: [50,48], r: 26, color: "known", width: 2.5 },
                        { t: "seg", a: [50,48], b: [76,48], color: "target", width: 2 },
                        { t: "txt", p: [64,40], text: "r", size: 13, color: "target" },
                        { t: "txt", p: [50,84], text: "S=4πr²，V=4πr³/3", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？球的皮≈4 个大圆——S=4πr²：4 倍的大圆面积。",
                "球体积 V=4πr³/3：三分之四 π 乘以半径的立方——先记住、用熟，证明以后补。",
                "生活例：足球、篮球算用料（表面积）、算容积（体积）。",
                "图形例：r=3，S=4π×9=36π，V=4π×27÷3=36π——数一样，单位不同！",
                "反例：r³ 是“立方”——别写成 r²，体积和面积量纲不同。",
                "⚠️ 别搞混：4πr²（面）和 4πr³/3（体）——一个 r²、一个 r³，抄公式时看清。",
                "回填点：严格推导要定积分——学完代数 ch12 回来，这里等你。",
                "记住一句话：球面四倍大圆，球体三分之四 πr³。"
              ],
              examples: [
                { text: "r=1 的球：S=4π，V=4π/3", figure: "算式" }
              ],
              prev: "g11-u1-l9-p1",
              next: "g11-u1-l9-p3"
            },
            {
              id: "g11-u1-l9-p3",
              title: "算一算球的体积",
              concept: "球体积计算",
              formulas: [
                {
                  id: "f1",
                  latex: "V = \\frac{4}{3}\\pi \\times 2^3 = \\frac{32}{3}\\pi",
                  translation: "半径 2 的球体积是 32π/3"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "例题：半径 2cm 的实心球——V=4π×8÷3=32π/3≈33.5cm³。",
                      shapes: [
                        { t: "circle", c: [50,50], r: 26, color: "known", width: 2.5, fill: "known", opacity: 0.15 },
                        { t: "seg", a: [50,50], b: [76,50], color: "target", width: 2 },
                        { t: "txt", p: [64,42], text: "r=2", size: 13, color: "target" },
                        { t: "txt", p: [50,86], text: "V = 32π/3", size: 15, bold: true, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "例题：半径 2cm 的实心球——V=4π×8÷3=32π/3≈33.5cm³。",
                "自查：r³ 算对了吗（2³=8）？乘的是 4/3 不是 4 吗？",
                "下一课：本章小结——把面积公式链串起来。"
              ],
              examples: [
                { text: "玻璃弹珠：r=1cm，V≈4.19cm³", figure: "实物" }
              ],
              prev: "g11-u1-l9-p2",
              next: "g11-u1-l10-p1"
            }
          ]
        },
        /* ============ g11.1.10 本章小结与习题（2 页） ============ */
        {
          id: "g11-u1-l10",
          title: "本章小结与习题",
          pages: [
            {
              id: "g11-u1-l10-p1",
              title: "本章小结：面积公式链",
              pageKind: "explain",
              concept: "全章串讲",
              formulas: [
                {
                  id: "f1",
                  latex: "S = ab \\Rightarrow ah \\Rightarrow \\frac{ah}{2} \\Rightarrow \\frac{(a+b)h}{2} \\Rightarrow \\pi r^2",
                  translation: "面积公式一条链：矩形→平行四边形→三角形→梯形→圆"
                },
                {
                  id: "f2",
                  latex: "V = Sh, V = \\frac{Sh}{3}",
                  translation: "柱体体积是底面积乘高，锥体是它的三分之一"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "面积链：矩形（ab）→ 割补 → 平行四边形（ah）→ 对半 → 三角形（ah/2）。",
                      shapes: [
                        { t: "poly", pts: [[12,40],[28,40],[28,56],[12,56]], color: "corrA", width: 2 },
                        { t: "txt", p: [20,66], text: "ab", size: 12, color: "corrA" },
                        { t: "txt", p: [34,48], text: "→", size: 14 },
                        { t: "poly", pts: [[38,40],[54,40],[58,56],[42,56]], color: "corrB", width: 2 },
                        { t: "txt", p: [48,66], text: "ah", size: 12, color: "corrB" },
                        { t: "txt", p: [62,48], text: "→", size: 14 },
                        { t: "poly", pts: [[66,40],[86,40],[76,56]], color: "corrC", width: 2 },
                        { t: "txt", p: [76,66], text: "ah/2", size: 12, color: "corrC" },
                        { t: "txt", p: [50,80], text: "割补 + 对半", size: 13 }
                      ]
                    },
                    {
                      caption: "梯形（(a+b)h/2）：两个拼成平行四边形再对半——还是割补。",
                      shapes: [
                        { t: "poly", pts: [[30,40],[70,40],[60,58],[40,58]], color: "known", width: 2.5 },
                        { t: "txt", p: [50,68], text: "(a+b)h/2", size: 14, bold: true, color: "known" },
                        { t: "txt", p: [50,80], text: "两个拼一拼，再对半", size: 13 }
                      ]
                    },
                    {
                      caption: "圆（πr²）：切成瓣拼成长方形——“化圆为方”，极限思想。",
                      shapes: [
                        { t: "circle", c: [30,49], r: 14, color: "line", width: 2 },
                        { t: "txt", p: [50,49], text: "→", size: 16 },
                        { t: "poly", pts: [[58,37],[88,37],[88,61],[58,61]], color: "target", width: 2 },
                        { t: "txt", p: [73,72], text: "πr²", size: 13, bold: true, color: "target" },
                        { t: "txt", p: [50,84], text: "分割→近似→极限", size: 13 }
                      ]
                    },
                    {
                      caption: "体积链：柱体 V=Sh → 锥体 V=Sh/3（三杯沙）→ 球（S=4πr²，V=4πr³/3）。",
                      shapes: [
                        { t: "poly", pts: [[14,42],[30,42],[30,60],[14,60]], color: "corrA", width: 2 },
                        { t: "txt", p: [22,70], text: "Sh", size: 12, color: "corrA" },
                        { t: "poly", pts: [[40,60],[60,60],[50,42]], color: "corrB", width: 2 },
                        { t: "txt", p: [50,70], text: "Sh/3", size: 12, color: "corrB", math: true },
                        { t: "circle", c: [76,51], r: 11, color: "corrC", width: 2 },
                        { t: "txt", p: [76,70], text: "球", size: 12, color: "corrC" },
                        { t: "txt", p: [50,84], text: "体积靠“摞”", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "一句话串全章：面积靠“割补”（平行四边形→三角形→梯形），圆靠“极限”（化圆为方）。",
                "体积靠“摞”：柱体 V=Sh，锥体是它的三分之一，球单记两个公式。",
                "三种思想：割补（面积守恒）、极限（越来越像）、摞（体积=底面积×高）。",
                "记住一句话：割补算面积，极限化圆方，摞出体积来。"
              ],
              examples: [
                { text: "全章知识图谱", figure: "图表" }
              ],
              prev: "g11-u1-l9-p3",
              next: "g11-u1-l10-p2"
            },
            {
              id: "g11-u1-l10-p2",
              title: "本章习题：8 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "S = ah, V = Sh",
                  translation: "用面积公式和体积公式解题"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  base: [
                    { t: "txt", p: [50,90], text: "点一点，分进三篮", size: 14 }
                  ],
                  groups: [
                    { name: "柱体", color: "corrA" },
                    { name: "锥体", color: "corrB" },
                    { name: "球", color: "corrC" }
                  ],
                  items: [
                    { id: "q1", label: "长方体", group: 0, anchor: [18,70],
                      shape: { t: "poly", pts: [[8,62],[28,62],[28,78],[8,78]], color: "corrA", width: 2.5 } },
                    { id: "q2", label: "圆柱", group: 0, anchor: [50,70],
                      shape: { t: "poly", pts: [[40,62],[60,62],[60,78],[40,78]], color: "corrA", width: 2.5 } },
                    { id: "q3", label: "正方体", group: 0, anchor: [82,70],
                      shape: { t: "poly", pts: [[74,62],[90,62],[90,78],[74,78]], color: "corrA", width: 2.5 } },
                    { id: "q4", label: "圆锥", group: 1, anchor: [18,40],
                      shape: { t: "poly", pts: [[8,48],[28,48],[18,32]], color: "corrB", width: 2.5 } },
                    { id: "q5", label: "四棱锥", group: 1, anchor: [50,40],
                      shape: { t: "poly", pts: [[40,48],[60,48],[50,32]], color: "corrB", width: 2.5 } },
                    { id: "q6", label: "球", group: 2, anchor: [82,40],
                      shape: { t: "circle", c: [82,40], r: 9, color: "corrC", width: 2.5 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "认图：6 个立体图形分进三篮：柱体 / 锥体 / 球。",
                "1．平行四边形底 8cm、高 5cm，面积？",
                "2．三角形底 10cm、高 6cm，面积？",
                "3．梯形上底 4cm、下底 8cm、高 5cm，面积？",
                "4．圆半径 5cm，面积？（保留 π）",
                "5．圆柱 r=2cm、h=6cm，体积？",
                "6．等底等高的圆锥，体积是圆柱的几分之几？",
                "7．已知圆柱体积是 24πcm³、高 6cm，底面半径 r 是多少？（逆向：从体积反求半径）",
                "8．一个圆柱和一个圆锥等底等高，体积加起来是 48cm³，圆锥的体积是多少？（想想 1 份和 3 份）"
              ],
              examples: [
                { figure: "核对答案", text: "认图：长方体/圆柱/正方体是柱体，圆锥/四棱锥是锥体，球是球；1．40cm²；2．30cm²；3．30cm²；4．25π cm²；5．24π cm³；6．三分之一；7．r=2cm（πr²×6=24π）；8．12cm³（圆锥 1 份、圆柱 3 份，共 4 份）" }
              ],
              prev: "g11-u1-l10-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
