/* ============================================================
* 学习工具箱 · 物理 · 第一章数据（阶段三批 1，2026-10-15）
*
* 章 p01 声现象：单元 p01.1 声音的产生、传播与特性（5 课 + 章末）。
* Schema 冻结版 v1.0（见 data/p04.js 文件头），组件 API 见
* data/WIDGETS.md。p01.1.3 用 P5 wave-tune；数学呼应按课表加注
* “只看波形、不出现'正弦'术语（预告）”。
* ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p01"] = {
id: "p01",
units: [
{
id: "p01.1",
title: "声音的产生、传播与特性",
lessons: [
{
id: "p01.1.1",
title: "声音的产生",
prereq: "p00 导论",
time: "40–60 分钟",
pages: [
/* ---------- p1：交互页（音叉溅水花·先猜后验；放大观察演示为缺口，上报） ---------- */
{
id: "p01.1.1-p1",
kind: "interact",
title: "敲一下，水花呢？",
exploreTip: "先猜：敲响的音叉碰到水面，水面会怎样？再点“敲一下音叉”看水花：振动看不见，水花看得见。猜完看第 2 页的放大观察。",
widgets: [
{
type: "tuning-fork",
params: {
badge: { invariant: "没变的是：音叉本身" }
}
}
],
point: "看不见振动，不等于没有振动——把微小量放大，就看得见了。"
},
/* ---------- p2：讲解页 ---------- */
{
id: "p01.1.1-p2",
kind: "explain",
title: "一切发声体都在振动",
blocks: [
{ type: "lead", text: "音叉的振动太小太快，肉眼看不清——碰到水面，溅起的水花就是“放大的振动”。"},
{ type: "text", html: "一切发声的物体都在<strong>振动</strong>：敲桌子，桌上的纸屑会跳；说话时摸喉咙，能感到颤动。振动停止，发声也停止。"},
{ type: "text", html: "反例：收音机没“动”却在响——拆开看，里面有个纸盆在飞快振动。“没看见动”是因为动得太小太快，不是没动。"},
{ type: "trap", text: "⚠️ 别搞混：“看不见振动就不是振动”——错。微小量要放大看：水花、纸屑都是“放大镜”。"},
{ type: "slogan", text: "发声必振动，停振必停声。"}
],
point: "记住“微小量放大”的思想：后面库仑扭秤、真空罩都要用它。"
},
/* ---------- p3：讲解页 ---------- */
{
id: "p01.1.1-p3",
kind: "explain",
title: "振动是“源头”",
blocks: [
{ type: "lead", text: "振动是声音的源头。后面的传播、音调、响度，全是从这个源头长出来的。"},
{ type: "text", html: "声源：正在发声的物体。人说话——声带振动；吉他——琴弦振动；鼓——鼓面振动。找到声源，就是找到“谁在振动”。"},
{ type: "text", html: "生活例：医生用听诊器听心跳——心脏在振动；次例：蜜蜂“嗡嗡”——翅膀每秒振动几百次；反例：录音机里的人声——振动早就停了，存的是“振动的记录”，不是振动本身。"},
{ type: "slogan", text: "找声音，先找谁在振动。"}
],
point: "下一课：振动有了，声音怎么“走”到你耳朵里？"
}
]
},
{
id: "p01.1.2",
title: "声音的传播",
prereq: "p01.1.1 声音的产生",
time: "40–60 分钟",
formulas: {
svt: {
mathml: "<math><mi>s</mi><mo>=</mo><mi>v</mi><mi>t</mi></math>",
translation: "路程 = 速度 × 时间"
},
echo: {
mathml: "<math><mi>s</mi><mo>=</mo><mfrac><mrow><mi>v</mi><mi>t</mi></mrow><mn>2</mn></mfrac></math>",
translation: "距离 = 声速 × 时间 ÷ 2（声音走了个来回）"
}
},
pages: [
/* ---------- p1：交互页（真空罩·先猜后验；抽气演示为缺口，上报） ---------- */
{
id: "p01.1.2-p1",
kind: "interact",
title: "抽走空气会怎样？",
exploreTip: "先猜：把罩里空气慢慢抽走，铃铛声会怎样？再拖动滑块抽气：空气越少，声波纹越少。猜完看第 2 页。",
widgets: [
{
type: "vacuum-chamber",
params: {
air: { min: 0, max: 100, step: 5, init: 100 },
badge: { invariant: "没变的是：铃铛还在响" }
}
}
],
point: "空气越少声越小——声音的传播需要“搭车”的介质。"
},
/* ---------- p2：讲解页 ---------- */
{
id: "p01.1.2-p2",
kind: "explain",
title: "声音要“搭车”",
blocks: [
{ type: "lead", text: "揭晓：第 1 页实验里，空气越抽越少、铃声越来越弱——但抽不成绝对真空（注明理想化）。"},
{ type: "text", html: "声音传播需要<strong>介质</strong>：固、液、气都能“搭车”，<strong>真空不能传声</strong>——振动要传远，得有东西接着传。"},
{
type: "formula-id",
formula: {
mathml: "<math><mi>v</mi><mo>=</mo><mn>340</mn><mspace width=\"0.2em\"/><mi mathvariant=\"normal\">m</mi><mo>/</mo><mi mathvariant=\"normal\">s</mi></math>",
translation: "声速 = 340 米每秒（15℃ 空气中）"
},
conditions: ["15℃ 空气中", "介质、温度一定"],
counterexample: "水中声速约 1500m/s——“声速永远 340m/s”这条一换介质就失效",
dimension: "m/s = m ÷ s ✓",
units: { si: "m/s", common: "km/h", note: "340 m/s ≈ 1224 km/h"}
},
{ type: "text", html: "声速（标量）：15℃ 空气中约 340m/s；水中约 1500m/s，钢铁中约 5200m/s——介质越“硬”传得越快。"},
{ type: "trap", text: "⚠️ 别搞混：“真空能传声”——错；“声速恒为 340m/s”——错（跟介质、温度有关）。"},
{ type: "mathlink", text: "数学呼应：代数 6.2 一次函数（奠基）——s=vt，s 跟 t 成正比。"},
{ type: "slogan", text: "无介质，不传声。"}
],
point: "记住 340m/s 的条件：15℃、空气中——换介质就换数。"
},
/* ---------- p3：讲解页 ---------- */
{
id: "p01.1.2-p3",
kind: "explain",
title: "回声测距",
blocks: [
{ type: "lead", text: "对着山谷喊一嗓子，几秒后听到回声——这段“来回”的时间，能量出你离山多远。"},
{ type: "text", html: "公式 <span class=\"phy-f\" data-f=\"svt\"></span>（条件：声速可看作匀速，t 内不变）只算“走过的总路程”。回声是去了一趟又回来，所以距离要除以 2：<span class=\"phy-f\" data-f=\"echo\"></span>。"},
{ type: "text", html: "生活例：3 秒后听到回声，s = 340×3÷2 = 510m。次例：倒车雷达、声呐都是这个原理；反例：教室里喊听不到回声——距离太短，回声跟原声混在一起了（人耳分辨要 0.1s 以上）。"},
{ type: "slogan", text: "回声测距，除以二。"}
],
point: "除以 2 是因为声音走了个来回——画个“去—回”箭头就不会忘。"
}
]
},
{
id: "p01.1.3",
title: "声音的特性",
prereq: "p01.1.2 声音的传播",
time: "40–60 分钟",
formulas: {
tf: {
mathml: "<math><mi>T</mi><mo>=</mo><mfrac><mn>1</mn><mi>f</mi></mfrac></math>",
translation: "周期 = 1 ÷ 频率"
}
},
pages: [
/* ---------- p1：交互页（P5 波形调参台） ---------- */
{
id: "p01.1.3-p1",
kind: "interact",
title: "波形调参台",
exploreTip: "只拖频率滑块，听音调怎么变、看波形怎么变；再只拖振幅，听响度怎么变。",
widgets: [
{
type: "wave-tune",
params: {
amp: { min: 1, max: 5, step: 0.5, init: 3},
freq: { min: 100, max: 1000, step: 10, init: 440},
playSound: true,
audibleMax: 2000,
showLabels: true,
badge: { invariant: "没变的是：介质（空气）"}
}
}
],
point: "耳朵听 + 眼睛看：频率管音调，振幅管响度——双通道一起记。"
},
/* ---------- p2：讲解页 ---------- */
{
id: "p01.1.3-p2",
kind: "explain",
title: "音调·响度·音色",
blocks: [
{ type: "lead", text: "第 1 页你亲手验证了：频率只管音调，振幅只管响度——两个滑块，互不串台。"},
{ type: "text", html: "<strong>音调</strong>：声音的高低，由<strong>频率 f</strong>（标量，单位<strong>赫兹 Hz</strong>，SI）决定——1 秒振动几次，越高越尖。<strong>响度</strong>：声音的大小，由<strong>振幅</strong>决定——振得越“开”越大声。<strong>音色</strong>：声音的“长相”，由<strong>波形</strong>决定——钢琴和小提琴奏同一个音，听着不一样。"},
{ type: "trap", text: "⚠️ 别搞混：音调 = 响度——错！“高音”≠“大声”：这是中文日常用语挖的大坑，重点纠。女高音可以唱得很轻，男低音也可以吼很大。"},
{ type: "mathlink", text: "数学呼应：代数 8.3.2 正弦图像（预告）——只看波形、不出现“正弦”术语；波形长什么样，代数课再严格讲。"},
{ type: "slogan", text: "频率管高低，振幅管大小。"}
],
point: "三问自查：多高（频率）？多大（振幅）？谁发的（波形）？"
},
/* ---------- p3：讲解页 ---------- */
{
id: "p01.1.3-p3",
kind: "explain",
title: "周期也认识一下",
blocks: [
{ type: "lead", text: "频率 f 是“1 秒振几次”，反过来问“振一次要几秒”，就是周期 T。"},
{ type: "text", html: "周期 T（标量，单位<strong>秒 s</strong>，SI）与频率 f 互为倒数：<span class=\"phy-f\" data-f=\"tf\"></span>（条件：匀速周期性振动）。f = 440Hz 的音，T ≈ 0.0023s——振动一次只要两毫秒。"},
{ type: "text", html: "生活例：蜜蜂翅膀约 400Hz（高频→尖细的嗡嗡），牛叫约 100Hz（低频→低沉的哞哞）；反例：“声音振动得快所以传得快”——错，频率管音调，声速只跟介质、温度有关。"},
{ type: "slogan", text: "T 与 f，互为倒数。"}
],
point: "频率和声速是两回事：一个管“多高”，一个管“多快到”。"
}
]
},
{
id: "p01.1.4",
title: "噪声的危害和控制",
prereq: "p01.1.3 声音的特性",
time: "40–60 分钟",
pages: [
/* ---------- p1：交互页（分贝标尺·先猜后验；标尺演示为缺口，上报） ---------- */
{
id: "p01.1.4-p1",
kind: "interact",
title: "0dB 是没声音吗？",
exploreTip: "先猜：0dB 表示什么？猜完看第 2 页的分贝标尺。",
widgets: [
{
type: "guess-verify",
params: {
question: "0dB 表示——",
options: ["完全没有声音", "基准声压（非常非常小）", "人耳听力的上限"],
recordKey: "phy_guess_p01.1.4",
showAfter: "manual"
}
}
],
point: "生活分贝标尺：耳语约 30dB，电锯约 110dB——0dB 不是零，是起点。"
},
/* ---------- p2：讲解页 ---------- */
{
id: "p01.1.4-p2",
kind: "explain",
title: "三招治噪声",
blocks: [
{ type: "lead", text: "分贝（dB）是响度的单位。0dB 不是“没有声音”，是人耳刚能听到的基准声压——标尺的起点，不是零。"},
{ type: "text", html: "减弱噪声三途径：① <strong>声源处</strong>（给机器装消声器）；② <strong>传播途中</strong>（路边隔音墙、关窗）；③ <strong>人耳处</strong>（戴耳塞）。"},
{ type: "text", html: "生活例：考场周围禁鸣笛（声源处）；次例：卧室装双层玻璃（传播途中）；反例：“把耳朵捂住就没噪声了”——捂住只挡了人耳处这一招，噪声还在。"},
{ type: "trap", text: "⚠️ 别搞混：0dB = 没有声音——错（0dB 是基准声压，不是零）；分贝数翻倍 = 响度翻倍——错（分贝是对数标度，点到为止）。"},
{ type: "mathlink", text: "数学呼应：代数 8.2 对数（预告）——分贝是对数标度，严格定义等代数课。"},
{ type: "slogan", text: "治噪声，看三处。"}
],
point: "看到噪声题，先问：声源、传播、人耳——卡住的是哪一处？"
}
]
},
{
id: "p01.1.5",
title: "超声波与次声波",
prereq: "p01.1.4 噪声的危害和控制",
time: "40–60 分钟",
pages: [
/* ---------- p1：交互页 ---------- */
{
id: "p01.1.5-p1",
kind: "interact",
title: "“超”的是什么？",
exploreTip: "先猜：“超声波”的“超”，超的是速度还是频率？",
widgets: [
{
type: "guess-verify",
params: {
question: "超声波“超”的是——",
options: ["速度（比声速快）", "频率（超出人耳上限）", "响度（特别大声）"],
recordKey: "phy_guess_p01.1.5",
showAfter: "manual"
}
}
],
point: "“超”的是频率上限，不是速度——名字是频率党起的。"
},
/* ---------- p2：讲解页 ---------- */
{
id: "p01.1.5-p2",
kind: "explain",
title: "听不见的声波",
blocks: [
{ type: "lead", text: "人耳能听到的频率范围约 20Hz–20000Hz。超出这个范围的，耳朵“罢工”，但它们还是声波。"},
{ type: "text", html: "<strong>超声波</strong>：高于 20000Hz。方向性好、穿透力强——B 超看身体、倒车雷达测距、声呐探鱼群。<strong>次声波</strong>：低于 20Hz。传得远、能量大——地震、海啸前会有次声波，动物比人先“听到”灾难。"},
{ type: "text", html: "生活例：蝙蝠发超声波“看”路（回声定位）；次例：大象用次声波远距离“聊天”；反例：超声波“超”的是速度——错，超的是频率上限。"},
{ type: "trap", text: "⚠️ 别搞混：超声波“超”的是速度——错（超的是频率）；听不见 = 不存在——错（仪器能“听见”）。"},
{ type: "slogan", text: "超声高频，次声低频。"}
],
point: "记住两个数：20000Hz 和 20Hz——人耳的“上下班打卡线”。"
}
]
},
/* ---------- 章末：p01.1.0 章末小结与习题 ---------- */
{
id: "p01.1.0",
title: "章末小结与习题",
prereq: "本章全部",
time: "40–60 分钟",
pages: [
{
id: "p01.1.0-p1",
kind: "quiz",
title: "本章小结",
questions: [
{
type: "review",
html: "① <strong>一切发声体都在振动</strong>；看不见振动 ≠ 不振动（微小量放大：水花、纸屑）。② 传播需要<strong>介质</strong>，<strong>真空不能传声</strong>；声速（标量）15℃ 空气中 <strong>340m/s</strong>，跟介质、温度有关；回声测距 <strong>s=vt/2</strong>。③ 特性三兄弟：<strong>音调</strong>（频率 f，Hz）管高低、<strong>响度</strong>（振幅）管大小、<strong>音色</strong>（波形）管“长相”；T=1/f；“高音”≠“大声”。④ 噪声：0dB 是基准声压不是零；减弱看三处（声源/传播/人耳）。⑤ 超声波 >20000Hz、次声波 <20Hz；“超”的是频率。"
}
],
point: "小结自查：振动、介质 340、三兄弟、三处、两个数——都能讲出来吗？"
},
{
id: "p01.1.0-p2",
kind: "quiz",
title: "综合习题",
questions: [
{
type: "choice",
stem: "敲鼓时，鼓面上的纸屑跳了起来。这说明——",
options: ["纸屑有魔力", "发声的鼓面在振动", "声音把纸屑吹起来了"],
answer: 1,
tip: "纸屑是“放大镜”：跳动的纸屑证明鼓面在振动。"
},
{
type: "choice",
stem: "下列说法正确的是——",
options: ["真空也能传声", "声速在任何介质中都是 340m/s", "15℃ 空气中声速约 340m/s", "频率越高声速越快"],
answer: 2,
tip: "340m/s 有两个条件：15℃、空气中；频率管音调，不管声速。"
},
{
type: "choice",
stem: "女高音唱得很轻，男低音吼得很大。下列正确的是——",
options: ["女高音响度大", "男低音音调高", "音调和响度是两回事", "频率决定响度"],
answer: 2,
tip: "“高音”≠“大声”：音调看频率，响度看振幅。"
},
{
type: "fill",
stemBefore: "对着山谷喊，2s 后听到回声，人离山约",
stemAfter: "m。（声速取 340m/s）",
answer: "340",
accept: ["340m"],
hint: "（s=vt/2）",
tip: "s = 340×2÷2 = 340m——别忘了除以 2（走了个来回）。"
},
{
type: "choice",
stem: "学校附近施工太吵。下列属于“在声源处”减弱噪声的是——",
options: ["学生戴耳塞", "教室关窗", "给施工机器装消声器"],
answer: 2,
tip: "消声器装在机器（声源）上；关窗是传播途中，耳塞是人耳处。"
},
{
type: "choice",
stem: "你家到学校约 2km，上课铃声（声速 340m/s）传到你家要多久？（数量级对即满分）",
options: ["约 0.06 秒", "约 6 秒", "约 60 秒", "约 6 分钟"],
answer: 1,
tip: "t = 2000÷340 ≈ 6s——数量级 10⁰ 秒。别被“2km 很远”吓住，声速很快。"
}
],
point: "条件意识自查：340m/s 的两个条件、回声除以 2、0dB 不是零。"
}
]
}
]
}
]
};
