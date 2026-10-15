/* ============================================================
 * 学习工具箱 · 物理 · 第十七章数据（物理批5，2026-10-15）
 *
 * 章：p17 振动、波、光与近代物理（单元 p17.1/p17.2/p17.3）
 * 课：p17.1.1–p17.3.2 + p17.3.0 章末小结与习题（共 10 课 / 28 页）
 * Schema：冻结版 v1.0（见 p04.js 文件头）；组件 API 见 WIDGETS.md。
 *
 * 内容要点：
 * - 回填点兑现：p17.2.1（p02.2.1 "折射角<入射角"条件严格化+全反射两条件）。
 * - 公式身份证：单摆周期（限小角度）、v=λf、有效值（限正弦式）。
 * - 附录 C 有意留白逐字遵守：p17.3.2 相对论只到质能关系定性；
 *   光电效应/能级只做定性（波函数/薛定谔/不确定性关系不写）；
 *   量子场论/标准模型、麦克斯韦速率分布/熵统计、力矩/角动量、
 *   容抗/感抗/RLC/谐振、显微镜/望远镜成像原理均不写。
 * - eV vs V 辨析（p17.3.2）；核辐射防护（p17.3.2）；y–x vs x–t 辨析。
 * - 交互：P10 spring-shm、P5 wave-tune ×3、P9 thermo-sim、Y4 ×6。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p17"] = {
  id: "p17",
  units: [
    {
      id: "p17.1",
      title: "机械振动与机械波",
      lessons: [
        /* ================= p17.1.1 简谐运动（3 页） ================= */
        {
          id: "p17.1.1",
          title: "简谐运动",
          prereq: "p12 牛顿定律；p01 波形",
          time: "40–60 分钟",
          formulas: {
            F: {
              mathml: '<math><mi>F</mi><mo>=</mo><mo>−</mo><mi>k</mi><mi>x</mi></math>',
              translation: "回复力 = −k×位移（负号表方向）"
            }
          },
          pages: [
            {
              id: "p17.1.1-p1",
              kind: "interact",
              title: "弹簧振子：k 大 T 变小？",
              exploreTip: "k 调大：周期 T 变小；m 调大：T 变大。看下方 x–t 图像：振子跑直线，图像画正弦。",
              widgets: [
                {
                  type: "spring-shm",
                  params: {
                    k: { min: 10, max: 200, step: 10, init: 50 },
                    m: { min: 0.5, max: 5, step: 0.5, init: 1 },
                    dragAmp: true,
                    showXTGraph: true,
                    showEquation: true,
                    badge: { invariant: "没变的是：振子质量（调 k 时）" }
                  }
                }
              ],
              point: "x–t 图像是正弦曲线——但振子只在直线上跑：图像不是轨迹！"
            },
            {
              id: "p17.1.1-p2",
              kind: "explain",
              title: "简谐运动：F=−kx",
              blocks: [
                { type: "lead", text: "第 1 页：振子来回跑，x–t 画出正弦曲线——记录'位置随时间'，不是'跑的路线'。" },
                { type: "text", html: '简谐运动：回复力与位移成正比、方向相反：<span class="phy-f" data-f="F"></span>——负号表方向（矢量性！）。' },
                { type: "text", html: "x–t 图像是正弦曲线：振幅 A（偏离平衡位置的最大距离）、周期 T（全振动一次的时间）、频率 f=1/T。" },
                { type: "trap", text: "⚠️ 别搞混：振动图像是运动轨迹——错！是 x–t 图像（p11.2.2 再现）；F=−kx 负号可省略——错！负号表示方向。" },
                { type: "oldfriend", text: "认旧友：p11.2.2——'图像≠轨迹'第二次；p01.1.3——正弦曲线第一次亮相。" },
                { type: "mathlink", text: "数学呼应：代数 8.3.2 正弦图像（奠基）——x–t 即正弦曲线（呼应点 3）。" },
                { type: "slogan", text: "图像是时间的录像，不是跑的路线。" }
              ],
              point: "F=−kx：负号是方向——简谐运动的'身份证'。"
            },
            {
              id: "p17.1.1-p3",
              kind: "explain",
              title: "振幅、周期、频率",
              blocks: [
                { type: "lead", text: "x–t 图像会认了，现在读三个数：振幅、周期、频率——振动的'三围'。" },
                { type: "text", html: "振幅 A：偏离平衡位置的最大距离——振动的'幅度'。周期 T：全振动一次的时间。频率 f=1/T：1 秒振动几次。k 大→T 小（硬弹簧跑得快），m 大→T 大（胖子跑得慢）——第 1 页你亲手验证过。" },
                { type: "text", html: "生活例：秋千（振幅大荡得高，周期只跟绳长有关）；实验例：第 1 页的 x–t 图——数'峰峰间距'得 T；反例：振幅≠路程——一个周期内路程=4A，别搞混。" },
                { type: "trap", text: "⚠️ 别搞混：频率越大振幅越大——错！f 由 k、m 定，A 由初始释放位置定，互不相干。" },
                { type: "slogan", text: "振幅看'多远'，周期看'多久'。" }
              ],
              point: "A、T、f：振动的'三围'——互不相干，各管各的。"
            }
          ]
        },
        /* ================= p17.1.2 单摆（3 页） ================= */
        {
          id: "p17.1.2",
          title: "单摆",
          prereq: "p17.1.1 简谐运动",
          time: "40–60 分钟",
          formulas: {
            T: {
              mathml: '<math><mi>T</mi><mo>=</mo><mn>2</mn><mi>&#960;</mi><msqrt><mfrac><mi>l</mi><mi>g</mi></mfrac></msqrt></math>',
              translation: "单摆周期 = 2π√(l/g)"
            }
          },
          pages: [
            {
              id: "p17.1.2-p1",
              kind: "interact",
              title: "摆球加重，周期变不变？",
              exploreTip: "先猜：摆球换更重的，周期变大还是不变？再拖三个滑块验证：质量滑块只改球大小。再看图：T²–l 是过原点的直线。",
              widgets: [
                {
                  type: "pendulum",
                  params: {
                    length: { min: 0.2, max: 1.5, step: 0.1, init: 1 },
                    mass: { min: 0.1, max: 1, step: 0.1, init: 0.5 },
                    angle: { min: 5, max: 30, step: 1, init: 15 },
                    badge: { invariant: "没变的是：重力加速度 g" }
                  }
                },
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "points", points: [[0.25, 1.0], [0.5, 2.0], [0.75, 3.0], [1.0, 4.0]], xLabel: "l/m", yLabel: "T²/s²" },
                    steps: ["slope"],
                    badge: { invariant: "没变的是：g（同一地点）" }
                  }
                }
              ],
              point: "T² 与 l 成正比——周期只跟摆长和 g 有关，跟质量无关！"
            },
            {
              id: "p17.1.2-p2",
              kind: "explain",
              title: "单摆周期：T=2π√(l/g)",
              blocks: [
                { type: "lead", text: "第 1 页的直线：T² 与 l 成正比——现在办身份证，条件是重点。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>T</mi><mo>=</mo><mn>2</mn><mi>&#960;</mi><msqrt><mfrac><mi>l</mi><mi>g</mi></mfrac></msqrt></math>',
                    translation: "单摆周期 = 2π√(l/g)"
                  },
                  conditions: ["摆角 < 5°（小角度近似）", "摆长远大于球直径", "同一地点（g 一定）"],
                  counterexample: "摆角 30°：不再是简谐运动，公式失效",
                  dimension: "s = √(m/(m/s²)) ✓",
                  units: { si: "s", note: "摆角<5°，小角度近似" }
                },
                { type: "text", html: "单摆等时性：周期与摆球质量、振幅（小角度内）无关——摆钟走得准，靠的就是它。" },
                { type: "trap", text: "⚠️ 别搞混：周期与摆球质量有关——错！无关；大角度仍是简谐运动——错！小角度近似。" },
                { type: "mathlink", text: "数学呼应：代数 7.1 二次函数（奠基）——T²–l 成正比，二次关系的实验验证（呼应点 27）。" },
                { type: "slogan", text: "周期看摆长，不看摆球。" }
              ],
              point: "T=2π√(l/g)：条件是灵魂——小角度、摆长≫球直径。"
            },
            {
              id: "p17.1.2-p3",
              kind: "explain",
              title: "摆钟：等时性的上班",
              blocks: [
                { type: "lead", text: "公式会背了，看它'上班'：摆钟用单摆的等时性'数时间'。" },
                { type: "text", html: "摆钟：摆长定，周期定——摆一下 1 秒（秒摆 l≈1m），齿轮数着摆的次数走。冬天摆杆冷缩→l 变短→T 变小→钟走快——热胀冷缩的日常版。" },
                { type: "text", html: "生活例：秋千（绳长定周期，荡多高不影响）；实验例：第 1 页的 T²–l 直线——斜率=4π²/g，还能'称'出 g；反例：摆角 30° 的'摆钟'——不是简谐运动，走不准。" },
                { type: "trap", text: "⚠️ 别搞混：摆钟走快调长摆杆——对！T=2π√(l/g)，l 大 T 大，走慢。" },
                { type: "slogan", text: "摆长定周期，等时数时间。" }
              ],
              point: "单摆等时性：摆钟、秋千——周期只认摆长和 g。"
            }
          ]
        },
        /* ================= p17.1.3 机械波（3 页） ================= */
        {
          id: "p17.1.3",
          title: "机械波",
          prereq: "p17.1.1 简谐运动",
          time: "40–60 分钟",
          formulas: {
            v: {
              mathml: '<math><mi>v</mi><mo>=</mo><mi>&#955;</mi><mi>f</mi></math>',
              translation: "波速 = 波长×频率"
            }
          },
          pages: [
            {
              id: "p17.1.3-p1",
              kind: "interact",
              title: "波形在走，质点走不走？",
              exploreTip: "拖相位滑块：波形向右'走'——走的是形状，质点只在原地振动（记住：振动在传播，质点不迁移）。",
              widgets: [
                {
                  type: "wave-tune",
                  params: {
                    amp: { min: 1, max: 5, step: 0.5, init: 3 },
                    freq: { min: 20, max: 200, step: 10, init: 60 },
                    playSound: false,
                    showLabels: true,
                    badge: { invariant: "没变的是：介质（波速由介质定）" }
                  }
                }
              ],
              point: "y–x 是空间照片，x–t 是时间录像——波形图 ≠ 振动图。"
            },
            {
              id: "p17.1.3-p2",
              kind: "explain",
              title: "波：振动在传播",
              blocks: [
                { type: "lead", text: "第 1 页：波形在走，质点没走——现在把'波'说明白。" },
                { type: "text", html: "机械波：振动在介质中的传播。质点只在原地振动，不随波迁移——传出去的是'接力'，不是质点。" },
                { type: "text", html: "y–x vs x–t：y–x 是'空间照片'（某时刻各质点的位置）；x–t 是'时间录像'（一个质点的位置随时间）。因果链：v 由介质定，f 由波源定，λ=v/f 被决定。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>v</mi><mo>=</mo><mi>&#955;</mi><mi>f</mi></math>',
                    translation: "波速 = 波长×频率"
                  },
                  conditions: ["同一均匀介质"],
                  counterexample: "波从绳子进入更密的介质：v 变了，f 不变，λ 跟着变",
                  dimension: "m/s = m·(1/s) ✓",
                  units: { si: "m/s", note: "f 的单位是 Hz" }
                },
                { type: "trap", text: "⚠️ 别搞混：波形图=振动图——错！y–x 是照片，x–t 是录像；波速无条件 v=λf——因果链：v 介质定、f 波源定。" },
                { type: "mathlink", text: "数学呼应：代数 8.3.2（奠基）——波形即正弦曲线。" },
                { type: "slogan", text: "振动在传播，质点不迁移。" }
              ],
              point: "v=λf：v 介质定、f 波源定、λ 被决定——因果链别反。"
            },
            {
              id: "p17.1.3-p3",
              kind: "explain",
              title: "波的'接力'现场",
              blocks: [
                { type: "lead", text: "波是'接力'：前一个质点带着后一个动——这个画面，值得慢放看三遍。" },
                { type: "text", html: "绳波接力：手抖一下，第一个质点上下动，拽着第二个、第三个……'抖'传到了绳那头，但每个质点都没离开原地。体育场的'人浪'就是大型接力现场。" },
                { type: "text", html: "生活例：地震波（P 波 S 波，介质不迁移）；实验例：第 1 页的波形——峰/谷标注帮你认'形状'；反例：水波上的树叶——上下浮动，不被推走（质点不迁移的证据）。" },
                { type: "trap", text: "⚠️ 别搞混：波把质点从波源带到远方——错！质点不迁移；没有介质也有波——错！机械波需要介质（光波不需要，p17.2 预告）。" },
                { type: "slogan", text: "波传的是振动，不是质点。" }
              ],
              point: "人浪、水波、地震波——传的都是'振动'，不是'人'。"
            }
          ]
        },
        /* ================= p17.1.4 波的干涉与衍射（2 页） ================= */
        {
          id: "p17.1.4",
          title: "波的干涉与衍射",
          prereq: "p17.1.3 机械波",
          time: "40–60 分钟",
          pages: [
            {
              id: "p17.1.4-p1",
              kind: "interact",
              title: "两列波叠出'花纹'",
              exploreTip: "两列波同频：看合成波（朱红）——有的地方永远强，有的地方永远弱。调偏波 B 频率：花纹乱了。",
              widgets: [
                {
                  type: "wave-tune",
                  params: {
                    amp: { min: 1, max: 5, step: 0.5, init: 3 },
                    freq: { min: 100, max: 1000, step: 10, init: 440 },
                    waveB: {
                      amp: { min: 1, max: 5, step: 0.5, init: 3 },
                      freq: { min: 100, max: 1000, step: 10, init: 440 },
                      phase: { min: 0, max: 360, step: 15, init: 0 }
                    },
                    showSum: true,
                    playSound: true,
                    badge: { invariant: "没变的是：两列波的频率（同频才稳定）" }
                  }
                }
              ],
              point: "干涉条件：频率相同、相位差恒定——加强点振幅大。"
            },
            {
              id: "p17.1.4-p2",
              kind: "explain",
              title: "干涉与衍射",
              blocks: [
                { type: "lead", text: "第 1 页你看到了：同频的两列波叠出'永远强、永远弱'的花纹——频率一偏，花纹就乱了。" },
                { type: "text", html: "干涉：两列波叠加，出现稳定的加强/减弱分布。条件：频率相同、相位差恒定。加强点：振幅大（位移仍随时间变，不是'一直顶在最高'）。" },
                { type: "text", html: "衍射：波绕过障碍物、穿过狭缝继续传。一切波都能衍射；明显的条件：障碍物/缝的尺寸与波长差不多或更小。" },
                { type: "trap", text: "⚠️ 别搞混：干涉加强点始终位移最大——错！位移随时间变，加强指振幅大；只有缝很小才有衍射——错！一切波都能衍射。" },
                { type: "oldfriend", text: "认旧友：p01.1.3 声音——降噪耳机（反相波抵消）就是干涉的应用。" },
                { type: "slogan", text: "同频恒相位，干涉才稳定。" }
              ],
              point: "干涉要同频，衍射看尺寸——波的'个性签名'。"
            }
          ]
        }
      ]
    },
    {
      id: "p17.2",
      title: "光与交变电流",
      lessons: [
        /* ================= p17.2.1 光的折射与全反射（高中深化，3 页）· 回填 p02.2.1 ================= */
        {
          id: "p17.2.1",
          title: "光的折射与全反射（高中深化）",
          prereq: "p02 光现象",
          time: "40–60 分钟",
          formulas: {
            n: {
              mathml: '<math><mi>n</mi><mo>=</mo><mfrac><mi>c</mi><mi>v</mi></mfrac></math>',
              translation: "折射率 = 光速 ÷ 介质中光速"
            },
            sinC: {
              mathml: '<math><mi mathvariant="normal">sin</mi><mi>C</mi><mo>=</mo><mfrac><mn>1</mn><mi>n</mi></mfrac></math>',
              translation: "临界角正弦 = 1 ÷ 折射率"
            }
          },
          pages: [
            {
              id: "p17.2.1-p1",
              kind: "interact",
              title: "入射角多大，折射光消失？",
              exploreTip: "先猜再看图：i 增大，r 长得更快——i=48.6° 时 r=90°（贴水面），再大：折射光消失！",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "i 超过临界角后，折射光线？",
                    options: ["消失（全反射）", "越来越亮", "拐回去"],
                    recordKey: "phy_guess_p17.2.1",
                    showAfter: "manual"
                  }
                },
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "points", points: [[0, 0], [10, 13.3], [20, 27.9], [30, 44.4], [40, 79.1], [48.6, 90]], xLabel: "入射角 i/°", yLabel: "折射角 r/°" },
                    steps: ["slope"],
                    badge: { invariant: "没变的是：水的折射率 n=1.33" }
                  }
                }
              ],
              point: "sinC=1/n：i≥C 时折射光消失——全反射两条件：光密→光疏+i≥C。"
            },
            {
              id: "p17.2.1-p2",
              kind: "explain",
              title: "全反射：两条件缺一不可",
              blocks: [
                { type: "lead", text: "第 1 页的图：i=48.6° 时折射光'贴水面跑'——再大，它直接'回家'。" },
                { type: "text", html: '折射率 <span class="phy-f" data-f="n"></span>：c 与介质中光速 v 的比值——n 越大，光跑得越慢。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi mathvariant="normal">sin</mi><mi>C</mi><mo>=</mo><mfrac><mn>1</mn><mi>n</mi></mfrac></math>',
                    translation: "临界角正弦 = 1 ÷ 折射率"
                  },
                  conditions: ["光从光密介质射向光疏介质", "入射角 i≥C"],
                  counterexample: "光从空气射向水（光疏→光密）：永远有折射光，无全反射",
                  dimension: "无量纲 ✓（比值）",
                  units: { si: "无单位", note: "C 的单位是度" }
                },
                { type: "text", html: "全反射两条件缺一不可：① 光密→光疏；② i≥C。应用：光导纤维——光在纤维里不断全反射，拐弯也不漏。" },
                { type: "text", html: "回填 p02.2.1：'折射角 < 入射角'限光疏→光密！反向时折射角 > 入射角。" },
                { type: "trap", text: "⚠️ 别搞混：全反射只要入射角大——错！两条件缺一不可；C 与 n 无关——错！sinC=1/n。" },
                { type: "mathlink", text: "数学呼应：几何 g02（奠基）；代数 8.3（奠基）——sinC=1/n。" },
                { type: "slogan", text: "光密到光疏，角大就全反。" }
              ],
              point: "全反射：光密→光疏 + i≥C——两条件缺一不可。"
            },
            {
              id: "p17.2.1-p3",
              kind: "explain",
              title: "光导纤维：光的'高速公路'",
              blocks: [
                { type: "lead", text: "全反射会判了，看它'上班'：光导纤维让光拐弯也不漏——信息的高速公路。" },
                { type: "text", html: "光导纤维：纤芯（光密）+ 包层（光疏）——光以大于临界角入射，在纤芯里不断全反射，一路'弹'到终点。一根头发丝细的纤维，能传上万路电话。" },
                { type: "text", html: "生活例：胃镜（纤维传光进身体看病灶）；海底光缆（你的每条消息都走过它）；实验例：第 1 页的 i–r 图——C=48.6° 是水，玻璃的 C 更小（n 更大）；反例：弯得太狠的纤维——入射角 < C，光漏了（全反射条件时刻在线）。" },
                { type: "trap", text: "⚠️ 别搞混：光纤里光走直线——错！不断全反射'弹'着走；光纤传的是电——错！传的是光信号。" },
                { type: "slogan", text: "光纤：让光拐弯的高速公路。" }
              ],
              point: "光导纤维=全反射的应用——临界角越小，越容易'关住'光。"
            }
          ]
        },
        /* ================= p17.2.2 光的干涉与衍射（3 页） ================= */
        {
          id: "p17.2.2",
          title: "光的干涉与衍射",
          prereq: "p17.1.4 干涉",
          time: "40–60 分钟",
          formulas: {
            dx: {
              mathml: '<math><mi>&#916;</mi><mi>x</mi><mo>=</mo><mfrac><mrow><mi>l</mi><mi>&#955;</mi></mrow><mi>d</mi></mfrac></math>',
              translation: "条纹间距 = lλ ÷ d"
            }
          },
          pages: [
            {
              id: "p17.2.2-p1",
              kind: "interact",
              title: "波长翻倍，条纹变多宽？",
              exploreTip: "λ 翻倍，Δx 跟着翻倍（Δx=lλ/d）——点'读斜率'：斜率 = l/d。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "function", expr: "x = 2*t", xLabel: "λ", yLabel: "Δx" },
                    xRange: [0, 5],
                    steps: ["slope"],
                    badge: { invariant: "没变的是：l（缝屏距）、d（缝间距）" }
                  }
                }
              ],
              point: "Δx=lλ/d：λ 越大条纹越宽——用条纹'量'波长。"
            },
            {
              id: "p17.2.2-p2",
              kind: "explain",
              title: "双缝干涉：条纹是尺子",
              blocks: [
                { type: "lead", text: "第 1 页直线：λ 翻倍，Δx 跟着翻倍——条纹是“量”波长的尺子。" },
                { type: "text", html: '双缝干涉：两束相干光叠出明暗条纹<span class="phy-f" data-f="dx"></span>——λ、l 越大，d 越小，条纹越宽。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>&#916;</mi><mi>x</mi><mo>=</mo><mfrac><mrow><mi>l</mi><mi>&#955;</mi></mrow><mi>d</mi></mfrac></math>',
                    translation: "条纹间距 = lλ ÷ d"
                  },
                  conditions: ["相干光源（同频、相位差恒定）", "l≫d"],
                  counterexample: "两盏普通灯泡：非相干光，叠不出稳定条纹",
                  dimension: "m = m·m/m ✓",
                  units: { si: "m", common: "mm", note: "λ 常用 nm" }
                },
                { type: "text", html: "薄膜干涉：肥皂泡的彩色——前后表面反射光干涉。波粒二象性（定性）：干涉证波动性、光电效应证粒子性——不是非此即彼。" },
                { type: "trap", text: "⚠️ 别搞混：“条纹间距只与波长有关”——错！还与 l、d 有关；“干涉证光是波所以不是粒子”——错！波粒二象性。" },
                { type: "oldfriend", text: "认旧友：p17.1.4——机械波的干涉条件，今天换成光。" },
                { type: "mathlink", text: "数学呼应：代数 ch02（奠基）——Δx=lλ/d。" },
                { type: "slogan", text: "条纹是量波长的尺子。" }
              ],
              point: "Δx=lλ/d：相干是前提。"
            },
            {
              id: "p17.2.2-p3",
              kind: "explain",
              title: "肥皂泡为什么是彩色的",
              blocks: [
                { type: "lead", text: "公式会背了，看它'上班'：肥皂泡的彩色，是薄膜干涉的现场。" },
                { type: "text", html: "薄膜干涉：光照到肥皂膜，前表面反射一束，后表面反射一束——两束光'差'了薄膜厚度的两倍光程。某些颜色加强、某些减弱——彩色就这么来的。" },
                { type: "text", html: "生活例：水面上的油膜（彩色花纹）；相机镜头的镀膜（减弱反射，多让光进去）；实验例：第 1 页的 Δx–λ 直线——红光条纹比紫光宽（λ 大）；反例：白光干涉条纹是彩色的——不是'只有一种颜色才干涉'。" },
                { type: "trap", text: "⚠️ 别搞混：肥皂泡的彩色是颜料——错！是干涉；只有激光才能干涉——错！相干就行（双缝+单色光）。" },
                { type: "slogan", text: "彩色泡泡，是光在'叠罗汉'。" }
              ],
              point: "薄膜干涉：肥皂泡、油膜、镀膜——都是'两束光叠罗汉'。"
            }
          ]
        },
        /* ================= p17.2.3 交变电流（3 页） ================= */
        {
          id: "p17.2.3",
          title: "交变电流",
          prereq: "p16.3 电磁感应",
          time: "40–60 分钟",
          formulas: {
            e: {
              mathml: '<math><mi>e</mi><mo>=</mo><msub><mi>E</mi><mi>m</mi></msub><mi mathvariant="normal">sin</mi><mi>&#969;</mi><mi>t</mi></math>',
              translation: "瞬时电动势 = 最大值×sin(ωt)"
            },
            eff: {
              mathml: '<math><mi>E</mi><mo>=</mo><mfrac><msub><mi>E</mi><mi>m</mi></msub><msqrt><mn>2</mn></msqrt></mfrac></math>',
              translation: "有效值 = 最大值 ÷ √2（限正弦式）"
            }
          },
          pages: [
            {
              id: "p17.2.3-p1",
              kind: "interact",
              title: "e–t 图像：正弦曲线！",
              exploreTip: "读成 e–t 图像（纵轴=e，横轴=t）：调频率=调转速（曲线变密）；调振幅=调 Em（相当于 N、B、S 变'猛'）。",
              widgets: [
                {
                  type: "wave-tune",
                  params: {
                    amp: { min: 1, max: 5, step: 0.5, init: 3 },
                    freq: { min: 10, max: 100, step: 10, init: 50 },
                    playSound: false,
                    showLabels: true,
                    badge: { invariant: "没变的是：N、B、S（Em=NBSω 的'配方'）" }
                  }
                }
              ],
              point: "e=Em sinωt：交变电流的 e–t 图像就是正弦曲线。"
            },
            {
              id: "p17.2.3-p2",
              kind: "explain",
              title: "交变电流：e=Em sinωt",
              blocks: [
                { type: "lead", text: "第 1 页你把正弦曲线读成了 e–t 图像——现在回答：家里的 220V，是最大值吗？" },
                { type: "text", html: '交变电流：线圈在匀强磁场中匀速转动，产生 <span class="phy-f" data-f="e"></span>——Em=NBSω 是最大值。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>e</mi><mo>=</mo><msub><mi>E</mi><mi>m</mi></msub><mi mathvariant="normal">sin</mi><mi>&#969;</mi><mi>t</mi></math>',
                    translation: "瞬时电动势 = 最大值×sin(ωt)"
                  },
                  conditions: ["线圈在匀强磁场中匀速转动", "从中性面开始计时"],
                  counterexample: "从与中性面垂直的位置开始：e=Em cosωt",
                  dimension: "V ✓",
                  units: { si: "V", note: "ω 的单位是 rad/s" }
                },
                { type: "text", html: '有效值按热效应定义：正弦式 <span class="phy-f" data-f="eff"></span>。限正弦式（条件！）——非正弦式另算。' },
                { type: "text", html: "家庭用电 220V/50Hz：220V 是有效值，最大值约 311V。" },
                { type: "trap", text: "⚠️ 别搞混：有效值=平均值——错！方均根，按热效应定义；Em 与转速无关——错！Em=NBSω，与 ω 成正比。" },
                { type: "mathlink", text: "数学呼应：代数 8.3.2 正弦函数（奠基）——e–t 图像即正弦曲线（呼应点 4）。" },
                { type: "slogan", text: "220V 是有效值，不是最大值。" }
              ],
              point: "有效值限正弦式——220V 是有效值，最大值约 311V。"
            },
            {
              id: "p17.2.3-p3",
              kind: "explain",
              title: "中性面：计时的'起点'",
              blocks: [
                { type: "lead", text: "e=Em sinωt 还是 Em cosωt？看你从哪儿开始计时——'中性面'说了算。" },
                { type: "text", html: "中性面：线圈平面与磁场垂直的位置——Φ 最大，E=0（'最堵'的时候反而没电）。从中性面开始转：e=Em sinωt；转 90°（与中性面垂直）开始：e=Em cosωt。" },
                { type: "text", html: "生活例：发电机——线圈转起来，e 按正弦规律变；实验例：第 1 页 e–t 图——过零点即经过中性面；反例：'中性面电流最大'——错！中性面 E=0。" },
                { type: "trap", text: "⚠️ 别搞混：sin 还是 cos 无所谓——有所谓！看计时起点；中性面 Φ=0——错！中性面 Φ 最大、E=0。" },
                { type: "slogan", text: "中性面：Φ 最大，E 为零。" }
              ],
              point: "计时起点定 sin/cos——中性面是 Φ 最大、E 为零的位置。"
            }
          ]
        }
      ]
    },
    {
      id: "p17.3",
      title: "热学深化与近代物理",
      lessons: [
        /* ================= p17.3.1 气体实验定律与热力学定律（3 页） ================= */
        {
          id: "p17.3.1",
          title: "气体实验定律与热力学定律",
          prereq: "p03 热现象",
          time: "40–60 分钟",
          formulas: {
            gas: {
              mathml: '<math><mfrac><mrow><mi>p</mi><mi>V</mi></mrow><mi>T</mi></mfrac><mo>=</mo><mi>C</mi></math>',
              translation: "pV÷T = 常量（质量一定）"
            },
            dU: {
              mathml: '<math><mi>&#916;</mi><mi>U</mi><mo>=</mo><mi>W</mi><mo>+</mo><mi>Q</mi></math>',
              translation: "内能增量 = 做功 + 吸热"
            }
          },
          pages: [
            {
              id: "p17.3.1-p1",
              kind: "interact",
              title: "加热：分子'疯'了？",
              exploreTip: "加热/制冷：看分子跑多快、物态徽章怎么变——温度是分子平均动能的标志。",
              widgets: [
                {
                  type: "thermo-sim",
                  params: {
                    temp: { min: -20, max: 120, step: 5, init: 20, unit: "℃" },
                    particleCount: 120,
                    showStates: true,
                    heatButtons: true,
                    badge: { invariant: "没变的是：分子总数（质量一定）" }
                  }
                }
              ],
              point: "T 是分子平均动能的标志：加热，分子跑得更快——总数不变。"
            },
            {
              id: "p17.3.1-p2",
              kind: "explain",
              title: "pV/T=C：三定律合体",
              blocks: [
                { type: "lead", text: "第 1 页你看到了：温度一高，分子就'疯'——现在把气体定律量化。" },
                { type: "text", html: '三定律（质量一定）：玻意耳（T 不变，p–V 反比）、查理（V 不变，p–T 正比）、盖-吕萨克（p 不变，V–T 正比）。合体：<span class="phy-f" data-f="gas"></span>。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mfrac><mrow><mi>p</mi><mi>V</mi></mrow><mi>T</mi></mfrac><mo>=</mo><mi>C</mi></math>',
                    translation: "pV÷T = 常量（质量一定）"
                  },
                  conditions: ["理想气体", "质量一定"],
                  counterexample: "高压低温的真实气体：分子体积、相互作用不能忽略，偏离",
                  dimension: "Pa·m³/K = J/K ✓",
                  units: { si: "p:Pa、V:m³、T:K", note: "T 必须用开尔文！℃ vs K" }
                },
                {
                  type: "widget",
                  widget: {
                    type: "graph-reader",
                    params: {
                      source: { kind: "function", expr: "p = 300/t", xLabel: "V", yLabel: "p" },
                      xRange: [1, 10],
                      steps: ["slope"],
                      badge: { invariant: "没变的是：T（等温线）" }
                    }
                  }
                },
                { type: "trap", text: "⚠️ 别搞混：p–V 图像是直线——错！是双曲线（反比）；T 用摄氏度——错！必须开尔文。" },
                { type: "mathlink", text: "数学呼应：代数 6.2/7.2（奠基）——p–V 反比、V–T 正比图像。" },
                { type: "slogan", text: "三定律合体：pV/T=C。" }
              ],
              point: "pV/T=C：质量一定、理想气体——T 必须用开尔文。"
            },
            {
              id: "p17.3.1-p3",
              kind: "explain",
              title: "能量账：ΔU=W+Q",
              blocks: [
                { type: "lead", text: "气体定律会用了，现在看能量账：做功和传热都能改变内能。" },
                { type: "text", html: '热力学第一定律 <span class="phy-f" data-f="dU"></span>：内能增量=做功+吸热。符号法则：W——外界对系统做功为正；Q——系统吸热为正。' },
                { type: "text", html: "理想气体是模型：忽略分子体积与相互作用——'理想'两个字就是告诉你它是假想的。生活例：轮胎打气发热（做功改变内能）；反例：'理想气体是真实气体'——错！是模型。" },
                { type: "trap", text: "⚠️ 别搞混：ΔU 符号混乱——W 外界对系统做功为正，Q 吸热为正（规范！）；做功一定改变内能——不完全！W 和 Q 共同决定 ΔU。" },
                { type: "oldfriend", text: "认旧友：p03.2 内能——初中只认'做功和热传递能改变内能'，今天定量到 ΔU=W+Q。" },
                { type: "slogan", text: "能量账：做功加吸热。" }
              ],
              point: "ΔU=W+Q：符号法则规范——外界做功为正，吸热为正。"
            }
          ]
        },
        /* ================= p17.3.2 原子结构与原子核（3 页）· 附录 C 留白 ================= */
        {
          id: "p17.3.2",
          title: "原子结构与原子核",
          prereq: "p03 分子动理论",
          time: "40–60 分钟",
          formulas: {
            mc2: {
              mathml: '<math><mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></math>',
              translation: "能量 = 质量×光速平方（定性）"
            }
          },
          pages: [
            {
              id: "p17.3.2-p1",
              kind: "interact",
              title: "光电效应：看频率还是看强度？",
              exploreTip: "先猜：红光再强打不出，弱紫光却打出——决定因素是？再看图：ν 太小，Ek 变负——电子'欠费'，出不来。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "红光再强打不出，弱紫光打出，决定因素是？",
                    options: ["频率", "强度", "照射时间"],
                    recordKey: "phy_guess_p17.3.2",
                    showAfter: "manual"
                  }
                },
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "points", points: [[3, -1], [4, 0], [5, 1], [6, 2], [7, 3]], xLabel: "ν（×10¹⁴Hz）", yLabel: "Ek（eV）" },
                    steps: ["intercept"],
                    badge: { invariant: "没变的是：金属的截止频率（材料定）" }
                  }
                }
              ],
              point: "光电效应看频率：低于截止频率，再强的光也打不出电子。"
            },
            {
              id: "p17.3.2-p2",
              kind: "explain",
              title: "光电效应看频率",
              blocks: [
                { type: "lead", text: "第 1 页的图：频率不够，电子'欠费'出不来——光的粒子性，实锤。" },
                { type: "text", html: "光电效应（定性）：光照金属打出电子。看频率：低于截止频率，再强的光也打不出；频率够了，光越强打出的越多。" },
                { type: "text", html: "能级（定性）：电子只能待在特定的'楼层'上，跃迁时吸收/放出光子——霓虹灯的彩色就这么来的。" },
                { type: "text", html: "eV vs V：eV 是能量单位（电子伏），V 是电压单位（伏特）——1eV=1.6×10⁻¹⁹J，一字之差，天壤之别。" },
                { type: "trap", text: "⚠️ 别搞混：光越强打出电子越多——错！先看频率；eV 是电压单位——错！是能量单位。" },
                { type: "oldfriend", text: "认旧友：p17.2.2 波粒二象性——干涉证波动性，光电效应证粒子性，今天实锤。" },
                { type: "slogan", text: "光电效应看频率。" }
              ],
              point: "光电效应：频率是'门票'，强度是'人数'——缺门票，人再多也进不去。"
            },
            {
              id: "p17.3.2-p3",
              kind: "explain",
              title: "质能关系与核辐射防护",
              blocks: [
                { type: "lead", text: "光的粒子性实锤了，现在看原子核：微小质量藏着巨大能量——定性介绍（附录 C 留白）。" },
                { type: "text", html: '质能关系（定性）：<span class="phy-f" data-f="mc2"></span>——质量与能量是同一实在的两面。c² 巨大：1g 质量 ↔ 9×10¹³J（约 2500 万度电）——核能的来源。' },
                { type: "text", html: "核辐射防护：天然辐射无处不在——剂量决定危害。防护：时间、距离、屏蔽。⚠ 核辐射现实中由专业人员操作，保持距离。" },
                { type: "trap", text: "⚠️ 别搞混：质量'消失'变成了能量——错！同一实在的两面；谈核色变——错！剂量决定危害，天然辐射无处不在。" },
                { type: "mathlink", text: "数学呼应：代数 ch00 数量级（奠基）——c² 巨大，微小质量 ↔ 巨大能量。" },
                { type: "slogan", text: "剂量决定危害，谈核不色变。" }
              ],
              point: "E=mc² 定性：质量与能量同一实在两面——防护看剂量。"
            }
          ]
        },
        /* ================= p17.3.0 章末小结与习题（2 页） ================= */
        {
          id: "p17.3.0",
          title: "本章小结与习题",
          prereq: "本章全部课程",
          time: "40–60 分钟",
          formulas: {
            v: {
              mathml: '<math><mi>v</mi><mo>=</mo><mi>&#955;</mi><mi>f</mi></math>',
              translation: "波速 = 波长×频率"
            },
            dx: {
              mathml: '<math><mi>&#916;</mi><mi>x</mi><mo>=</mo><mfrac><mrow><mi>l</mi><mi>&#955;</mi></mrow><mi>d</mi></mfrac></math>',
              translation: "条纹间距 = lλ ÷ d"
            },
            e: {
              mathml: '<math><mi>e</mi><mo>=</mo><msub><mi>E</mi><mi>m</mi></msub><mi mathvariant="normal">sin</mi><mi>&#969;</mi><mi>t</mi></math>',
              translation: "瞬时电动势 = 最大值×sin(ωt)"
            },
            mc2: {
              mathml: '<math><mi>E</mi><mo>=</mo><mi>m</mi><msup><mi>c</mi><mn>2</mn></msup></math>',
              translation: "能量 = 质量×光速平方（定性）"
            }
          },
          pages: [
            {
              id: "p17.3.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: '本章四句话：① 振动：F=−kx，x–t 图像是正弦曲线（图像≠轨迹）；单摆 T=2π√(l/g)（限小角度）；② 波：<span class="phy-f" data-f="v"></span>（v 介质定、f 波源定），y–x 是照片、x–t 是录像；干涉要同频；③ 光：全反射两条件，<span class="phy-f" data-f="dx"></span>，<span class="phy-f" data-f="e"></span>（有效值限正弦式）；④ 热与近代：pV/T=C（理想气体是模型），光电效应看频率，<span class="phy-f" data-f="mc2"></span>（定性）——剂量决定危害。'
                }
              ],
              point: "带上'y–x vs x–t'和'条件意识'，进习题。"
            },
            {
              id: "p17.3.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "关于振动图像，正确的是——",
                  options: ["是振子的运动轨迹", "是 x–t 图像，记录位置随时间", "是速度随时间的变化"],
                  answer: 1,
                  tip: "图像是时间的录像，不是跑的路线——p11.2.2 再现。"
                },
                {
                  type: "choice",
                  stem: "单摆周期与___有关——",
                  options: ["摆球质量", "摆长和 g", "振幅（大角度）"],
                  answer: 1,
                  tip: "T=2π√(l/g)：看摆长，不看摆球——小角度才成立。"
                },
                {
                  type: "choice",
                  stem: "全反射的条件是——",
                  options: ["只要入射角大", "光密→光疏 + 入射角≥临界角", "只要光从光密介质射出"],
                  answer: 1,
                  tip: "两条件缺一不可——p02.2.1 回填。"
                },
                {
                  type: "fill",
                  stemBefore: "1g 质量完全转化为能量，约为",
                  stemAfter: "J（数量级）",
                  answer: "9×10¹³",
                  accept: ["9e13", "9×10^13", "9*10^13"],
                  hint: "（E=mc²，c=3×10⁸m/s）",
                  tip: "9×10¹³J ≈ 2500 万度电——c² 巨大，微小质量 ↔ 巨大能量。"
                },
                {
                  type: "choice",
                  stem: "家庭用电 220V 指的是——",
                  options: ["最大值", "有效值", "平均值"],
                  answer: 1,
                  tip: "220V 是有效值（按热效应定义，限正弦式），最大值约 311V。"
                },
                {
                  type: "choice",
                  stem: "光电效应中，决定能否打出电子的是——",
                  options: ["光的强度", "光的频率", "照射时间"],
                  answer: 1,
                  tip: "看频率！低于截止频率，再强的光也打不出。"
                },
                {
                  type: "choice",
                  stem: "【估算】人耳可听声波频率约 20Hz–20000Hz，声速 340m/s，可听声波波长范围约——（数量级对即满分）",
                  options: ["约 1.7cm–17m", "约 17cm–1.7m", "约 1.7m–170m", "约 17m–1700m"],
                  answer: 0,
                  tip: "依据链：λ = v/f，340÷20000 = 0.017m，340÷20 = 17m——厘米到十米量级。"
                }
              ],
              point: "全书完——从声光热到电与磁、近代物理，条件意识常在。"
            }
          ]
        }
      ]
    }
  ]
};


