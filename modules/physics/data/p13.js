/* ============================================================
 * 学习工具箱 · 物理 · 第十三章数据（物理批 4，2026-10-15）
 * p13 抛体运动、圆周运动与万有引力：8 课 + 章末小结与习题 p13.2.0
 *
 * schema v1.0（见 p04.js 文件头冻结版）；组件 API 见 WIDGETS.md。
 * 内容分工：概念表述=物理专家队；教学流/话术=黄队。
 *
 * 本章红线兑现：
 * - 比值定义法四辨析：本章无新落点；向心力 F=mv²/r 是定律
 *   （因果关系），非比值定义——相关表述已避开"比值即正反比"话术
 * - 向心力是效果力（全书级规范）：受力分析不画"向心力"（p13.2.2）
 * - 弧度制一页通保留（Y-M3 收尾决议）：p13.2.1 自带，与代数 8.3
 *   互相印证（p13.2.1-p2）
 * - P-M4：p13.1 自学路径以平抛探究为主；斜抛降级为"拓展玩一玩
 *   （不讲结论）"，未引入课程体系未设课的斜抛结论（p13.1.3-p1/p3）
 * - 万有引力适用条件：质点/均匀球体，r 取质心距（p13.2.3）
 * - 估算锚点：第一宇宙速度 7.9 km/s（p13.2.4，附录 A5）
 *
 * 缺口上报（WIDGETS.md 无对应组件，页内用最接近组件承载）：
 * 1. p13.1.1：F 方向可调的曲线运动条件虚拟演示 → 用 P2
 *    motion-sim 抛体模式（拖手柄改初速度方向）承载
 * 2. p13.1.2：小船过河虚拟实验（船速/水速可调）→ 用 P2
 *    motion-sim 抛体模式 + Y1 guess-verify 承载"化曲为直"
 * 3. p13.2.2：圆锥摆 F 供需关系虚拟实验 → 用 P2 motion-sim
 *    圆周模式（调 ω 看向心力箭头）承载
 * 4. p13.2.3：卡文迪什扭秤思想实验动画 → 用 Y1 guess-verify
 *    （月地检验）+ Y5 side-compare（平方反比双胞胎）承载
 * 5. p13.2.4：第一宇宙速度推导 + 估算组件 → 用 Y1 guess-verify
 *    + Y5 side-compare（三宇宙速度）承载
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p13"] = {
  id: "p13",
  units: [
    {
      id: "p13.1",
      title: "抛体运动",
      lessons: [
        {
          id: "p13.1.1",
          title: "曲线运动",
          prereq: "p12 牛顿运动定律",
          time: "40–60 分钟",
          pages: [
            {
              id: "p13.1.1-p1",
              kind: "interact",
              title: "怎么扔，轨迹都是弯的",
              exploreTip: "拖蓝色手柄换个方向扔：不管初速度朝哪，轨迹总是弯的——是谁让它“拐弯”的？",
              widgets: [
                {
                  type: "motion-sim",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.Tween+Kinematics */
                    engine: {
                      primitive: "Tween+Kinematics", version: "2026.10.17.2",
                      params: { mode: "projectile", v0Init: 15, angleDegInit: 45, g: 9.8 }
                    },
                    
                    mode: "projectile",
                    v0: { min: 5, max: 30, step: 1, init: 15 },
                    angle: { min: 0, max: 75, step: 5, init: 45 },
                    g: 9.8, dragHandle: true, timeScale: 0.5, showReadouts: true,
                    badge: { invariant: "没变的是：小球受到的重力（变的是初速度方向→轨迹的弯法）" }
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "小球在空中拐弯，是因为——",
                    options: ["初速度的方向", "受到的力跟速度方向不共线"],
                    recordKey: "phy_guess_p13.1.1",
                    showAfter: "manual"
                  }
                }
              ],
              point: "拐弯的原因不在初速度，在“力跟速度不共线”——这就是曲线运动的条件。小提示：这个虚拟小球没算空气阻力——\"只受重力\"是理想情况；羽毛、纸片可不会这么飞（下一页点名这个\"忽略\"）。"
            },
            {
              id: "p13.1.1-p2",
              kind: "explain",
              title: "力速不共线，就拐弯",
              blocks: [
                { type: "lead", text: "小球出手后只受重力（忽略空气）。力竖直向下，速度斜向上——不共线，所以拐弯。" },
                { type: "lead", text: "‘忽略空气阻力’这句说明，只在重而小的物体上成立——羽毛、纸片这类轻飘的东西，阻力躲不掉，结论会‘罢工’。" },
                { type: "text", html: "曲线运动的速度方向：沿轨迹的切线方向，时刻在变——所以曲线运动一定是变速运动。条件：物体所受合力方向与速度方向不共线，物体就做曲线运动；共线则做直线运动（加速或减速）。" },
                { type: "trap", text: "⚠️ 别搞混：曲线运动一定是变速，但加速度不一定变——平抛加速度恒定（只受重力），圆周运动加速度时刻变。加速度变不变，看合力变不变。" },
                { type: "slogan", text: "力速不共线，就拐弯。" }
              ],
              point: "先直觉：拐弯看“力与速度的夹角”；严格表述：合力方向与速度方向不共线。"
            }
          ]
        },
        {
          id: "p13.1.2",
          title: "运动的合成与分解",
          prereq: "p13.1.1 曲线运动",
          time: "40–60 分钟",
          pages: [
            {
              id: "p13.1.2-p1",
              kind: "interact",
              title: "化曲为直",
              exploreTip: "一个弯的轨迹，能拆成水平、竖直两个直的运动来看吗？先猜，再动手验证。",
              widgets: [
                {
                  type: "motion-sim",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.Tween+Kinematics */
                    engine: {
                      primitive: "Tween+Kinematics", version: "2026.10.17.2",
                      params: { mode: "projectile", v0Init: 15, angleDegInit: 45, g: 9.8 }
                    },
                    
                    mode: "projectile",
                    v0: { min: 5, max: 30, step: 1, init: 15 },
                    angle: { min: 0, max: 75, step: 5, init: 45 },
                    g: 9.8, dragHandle: true, timeScale: 0.5, showReadouts: true,
                    badge: { invariant: "没变的是：重力加速度（变的是观察视角→水平与竖直两个分运动）" }
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "弯轨迹拆成两个直的运动，两个分运动花的时间——",
                    options: ["一样长", "水平先走完", "竖直先走完"],
                    recordKey: "phy_guess_p13.1.2",
                    showAfter: "manual"
                  }
                }
              ],
              point: "化曲为直：一个难算的弯运动，拆成两个好算的直运动——这就是“降维打击”。"
            },
            {
              id: "p13.1.2-p2",
              kind: "explain",
              title: "等时性与独立性",
              blocks: [
                { type: "lead", text: "小船过河：船头指向对岸（一个分运动），河水把船往下游带（另一个分运动）——船实际走的是斜线。" },
                { type: "text", html: "合成与分解两条铁律：①等时性——合运动与分运动时间相同；②独立性——分运动互不影响，各走各的。小船最短过河时间：船头正对对岸（t=d/v船）；最短位移：合速度正对对岸（船速够大时）。" },
                { type: "mathlink", text: "数学呼应：几何 g13 矢量坐标分解（奠基）——分解就是给矢量找两个互相垂直的“影子”。" }
              ],
              point: "时间相同、互不影响——这是分解合法的底气。"
            },
            {
              id: "p13.1.2-p3",
              kind: "explain",
              title: "矢量合成，不看数字",
              blocks: [
                { type: "lead", text: "小船斜着过河：船往对岸开，水把船往下游冲——两个速度能直接把数字加起来吗？" },
                { type: "text", html: "合速度是矢量合成：用平行四边形定则（或正交分解），不是把速度数值相加。方向不同，结果完全不同。" },
                { type: "trap", text: "⚠️ 别搞混：合运动 = 分运动速度代数相加——错！速度是矢量，合成看方向。矢量当标量代公式，是红线。" },
                { type: "slogan", text: "矢量合成，不看数字看方向。" }
              ],
              point: "数值相加是标量的玩法；矢量合成，先看方向。"
            }
          ]
        },
        {
          id: "p13.1.3",
          title: "平抛运动",
          prereq: "p13.1.2 运动的合成与分解",
          time: "40–60 分钟",
          formulas: {
            traj: {
              mathml: "<math><mi>y</mi><mo>=</mo><mi>a</mi><msup><mi>x</mi><mn>2</mn></msup></math>",
              translation: "轨迹方程：y = a·x²（抛物线）"
            },
            range: {
              mathml: "<math><mi>x</mi><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mi>t</mi></math>",
              translation: "射程 = 初速度 × 飞行时间"
            }
          },
          pages: [
            {
              id: "p13.1.3-p1",
              kind: "interact",
              title: "初速度越大，射程越远",
              exploreTip: "发射角调到 0°（水平抛）：只调初速度，看射程怎么变。θ 调大就是斜抛——拓展区，随便玩，不记结论。",
              widgets: [
                {
                  type: "motion-sim",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.Tween+Kinematics */
                    engine: {
                      primitive: "Tween+Kinematics", version: "2026.10.17.2",
                      params: { mode: "projectile", v0Init: 15, angleDegInit: 0, g: 9.8 }
                    },
                    
                    mode: "projectile",
                    v0: { min: 5, max: 30, step: 1, init: 15 },
                    angle: { min: 0, max: 60, step: 5, init: 0 },
                    g: 9.8, dragHandle: true, timeScale: 0.5, showReadouts: true,
                    badge: { invariant: "没变的是：重力加速度（变的是初速度→射程）" }
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "水平抛出，初速度越大，射程——",
                    options: ["越远", "越近", "不变"],
                    recordKey: "phy_guess_p13.1.3",
                    showAfter: "manual"
                  }
                }
              ],
              point: "初速度越大，射程越远——水平方向没人拦它，飞得越快越远。\"没人拦它\"有个前提：忽略了空气阻力——实心球可以这么说，换成羽毛球，阻力大了射程会\"缩水\"。"
            },
            {
              id: "p13.1.3-p2",
              kind: "explain",
              title: "水平匀速，竖直落体",
              blocks: [
                { type: "lead", text: "水平扔出的粉笔头：水平方向不受力（忽略空气），竖直方向只受重力。" },
                { type: "trap", text: "\"水平方向不受力\"是忽略了空气阻力——只对重而小的物体成立；轻飘物体阻力不可忽略，\"水平匀速\"就不成立了。" },
                { type: "text", html: "平抛 = 水平匀速直线 + 竖直自由落体。水平：不受力，惯性保持匀速；竖直：只受重力，自由落体。等时性：落地时间只由高度定，t=√(2h/g)，跟初速度无关。" },
                { type: "trap", text: "⚠️ 别搞混：平抛水平方向“受惯性力”——错！惯性不是力。水平方向不受力，匀速是惯性“保持”的结果。" }
              ],
              point: "分解之后，平抛就是两个你早就认识的老朋友。"
            },
            {
              id: "p13.1.3-p3",
              kind: "explain",
              title: "轨迹是条抛物线",
              blocks: [
                { type: "trap", text: "这条抛物线是\"忽略空气阻力\"算出来的——实心球画得标准，羽毛、纸团可画不出这么标准的抛物线。" },
                { type: "text", html: "轨迹方程 <span class=\"phy-f\" data-f=\"traj\"></span>（a=g/2v₀²）：一条抛物线。<span class=\"phy-f\" data-f=\"range\"></span>——射程由初速度和高度共同决定。" },
                { type: "mathlink", text: "数学呼应：代数 7.1 二次函数（奠基）——同一条抛物线，物理读“轨迹”、数学读“图像”，互相印证。" },
                { type: "oldfriend", text: "认旧友：斜抛（θ≠0）本课不讲结论，只在第 1 页拓展区玩一玩——课程表里没有它的结论页，别自己下结论（P-M4）。" },
                { type: "slogan", text: "水平匀速，竖直落体。" }
              ],
              point: "物理轨迹 ↔ 数学图像：同一条抛物线，两种读法。"
            }
          ]
        }
      ]
    },
    {
      id: "p13.2",
      title: "圆周运动与万有引力",
      lessons: [
        {
          id: "p13.2.1",
          title: "圆周运动",
          prereq: "p13.1.3 平抛运动",
          time: "40–60 分钟",
          formulas: {
            vr: {
              mathml: "<math><mi>v</mi><mo>=</mo><mi>&#969;</mi><mi>r</mi></math>",
              translation: "线速度 = 角速度 × 半径"
            },
            tt: {
              mathml: "<math><mi>T</mi><mo>=</mo><mfrac><mrow><mn>2</mn><mi>&#960;</mi></mrow><mi>&#969;</mi></mfrac></math>",
              translation: "周期 = 2π ÷ 角速度"
            },
            an: {
              mathml: "<math><msub><mi>a</mi><mi>n</mi></msub><mo>=</mo><mfrac><msup><mi>v</mi><mn>2</mn></msup><mi>r</mi></mfrac></math>",
              translation: "向心加速度 = 线速度平方 ÷ 半径"
            }
          },
          pages: [
            {
              id: "p13.2.1-p1",
              kind: "interact",
              title: "向心力箭头永远指圆心",
              exploreTip: "拖 ω（ω 读作“欧米伽”，表示转动的角速度）：转速变了，周期 T=2π/ω 怎么变？盯住朱红箭头——它永远指圆心。",
              widgets: [
                {
                  type: "motion-sim",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.Tween+Kinematics */
                    engine: {
                      primitive: "Tween+Kinematics", version: "2026.10.17.2",
                      params: { mode: "circle", omegaInit: 1 }
                    },
                    
                    mode: "circle",
                    omega: { min: 0.5, max: 3, step: 0.5, init: 1 },
                    g: 9.8, dragHandle: true, timeScale: 1, showReadouts: true,
                    badge: { invariant: "没变的是：圆周半径（变的是转速 ω→周期 T）" }
                  }
                }
              ],
              point: "向心力箭头永远指圆心——圆周运动的合力方向，时刻指向圆心。"
            },
            {
              id: "p13.2.1-p2",
              kind: "explain",
              title: "弧度制一页通",
              blocks: [
                { type: "lead", text: "量角器的“度”是人为定的（圆分成 360 份）。物理想要一个“天然”的角度单位。" },
                { type: "text", html: "弧度制：圆心角 θ = 弧长 l ÷ 半径 r。在单位圆（r=1）上，弧长是多少，角度就是多少弧度——弧长即角度。半圈弧长 πr → 180°=π 弧度；一圈 = 2π 弧度。" },
                { type: "oldfriend", text: "认旧友：代数 8.3 弧度制——代数课也有，互相印证。这里先借直觉用，严格定义代数课再补（Y-M3 决议保留本页）。" },
                { type: "slogan", text: "弧长即角度，180°=π。" }
              ],
              point: "角速度 ω=Δθ/Δt 里，θ 用弧度——单位是 rad/s。"
            },
            {
              id: "p13.2.1-p3",
              kind: "explain",
              title: "转得多快，怎么量",
              blocks: [
                { type: "lead", text: "转盘上一点：线速度 v（走多快），角速度 ω（转多快），周期 T（转一圈多久）。" },
                { type: "text", html: "<span class=\"phy-f\" data-f=\"vr\"></span> 是线速度：转得越快、半径越大，跑得越快（θ 用弧度——弧度把角度写成弧长，这个公式才这么干净）；<span class=\"phy-f\" data-f=\"tt\"></span> 是周期：转一圈（2π 弧度）要花的时间。向心加速度 <span class=\"phy-f\" data-f=\"an\"></span>=ω²r，方向时刻指向圆心。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><msub><mi>a</mi><mi>n</mi></msub><mo>=</mo><mfrac><msup><mi>v</mi><mn>2</mn></msup><mi>r</mi></mfrac></math>",
                    translation: "向心加速度 = 线速度平方 ÷ 半径"
                  },
                  conditions: ["匀速圆周运动"],
                  counterexample: "非匀速圆周：各点速率不同，向心加速度大小也跟着变——公式只管匀速",
                  dimension: "(m/s)²/m = m/s² ✓",
                  units: { si: "m/s²", common: "m/s²", note: "方向时刻指向圆心" }
                },
                { type: "trap", text: "⚠️ 别搞混：“匀速”圆周运动是匀速——错！速度方向时刻变，是变速；加速度方向也时刻变，是变加速运动。" }
              ],
              point: "记住三个量（v、ω、T）和一个方向（永远指圆心）。"
            }
          ]
        },
        {
          id: "p13.2.2",
          title: "向心力",
          prereq: "p13.2.1 圆周运动",
          time: "40–60 分钟",
          formulas: {
            fn: {
              mathml: "<math><msub><mi>F</mi><mi>n</mi></msub><mo>=</mo><mi>m</mi><mfrac><msup><mi>v</mi><mn>2</mn></msup><mi>r</mi></mfrac><mo>=</mo><mi>m</mi><msup><mi>&#969;</mi><mn>2</mn></msup><mi>r</mi></math>",
              translation: "向心力 = 质量 × 线速度平方 ÷ 半径 = 质量 × 角速度平方 × 半径"
            }
          },
          pages: [
            {
              id: "p13.2.2-p1",
              kind: "interact",
              title: "转越快，需要的力越大",
              exploreTip: "拖 ω 看朱红箭头变长变短：转速、半径变了，“需要”的向心力怎么变？",
              widgets: [
                {
                  type: "motion-sim",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.Tween+Kinematics */
                    engine: {
                      primitive: "Tween+Kinematics", version: "2026.10.17.2",
                      params: { mode: "circle", omegaInit: 1 }
                    },
                    
                    mode: "circle",
                    omega: { min: 0.5, max: 3, step: 0.5, init: 1 },
                    g: 9.8, dragHandle: true, timeScale: 1, showReadouts: true,
                    badge: { invariant: "没变的是：圆周半径（变的是转速 ω→向心力箭头的长短）" }
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "转得越快（ω 变大），需要的向心力——",
                    options: ["变大", "变小", "不变"],
                    recordKey: "phy_guess_p13.2.2",
                    showAfter: "manual"
                  }
                }
              ],
              point: "需要的向心力变了——“供”跟不上“需”，运动状态就变。"
            },
            {
              id: "p13.2.2-p2",
              kind: "explain",
              title: "向心力是“岗位”不是“员工”",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><msub><mi>F</mi><mi>n</mi></msub><mo>=</mo><mi>m</mi><mfrac><msup><mi>v</mi><mn>2</mn></msup><mi>r</mi></mfrac><mo>=</mo><mi>m</mi><msup><mi>&#969;</mi><mn>2</mn></msup><mi>r</mi></math>",
                    translation: "向心力 = 质量 × 线速度平方 ÷ 半径 = 质量 × 角速度平方 × 半径"
                  },
                  conditions: ["做圆周运动的物体", "F 指“需要”的向心力大小"],
                  counterexample: "直线运动：不需要向心力，公式无用武之地——别硬套",
                  dimension: "kg·(m/s)²/m = N ✓",
                  units: { si: "N", note: "效果力，不是新加的性质力" }
                },
                { type: "text", html: "向心力是效果力：按“让物体转弯”这个效果起的名字。提供者是重力、弹力、摩擦力这些老熟人——受力分析时只画真正施力的物体给的力，不许再画一个“向心力”，那是重复记账。" },
                { type: "trap", text: "⚠️ 别搞混：向心力是新增的一种性质力——错！它是效果力。全书级规范：受力图上不画“向心力”三个字。" }
              ],
              point: "向心力是“岗位”，重力弹力摩擦力是来“应聘”的员工。"
            },
            {
              id: "p13.2.2-p3",
              kind: "explain",
              title: "供需关系：供不上就外甩",
              blocks: [
                { type: "lead", text: "圆锥摆：绳拉力与重力的合力，恰好提供向心力——“供”=“需”，小球乖乖转圈。" },
                { type: "text", html: "供需关系：提供的合力 = 需要的 mv²/r，匀速圆周；供小于需：合力拉不住，物体做离心运动（外甩）——洗衣机脱水就是这么甩干的；供大于需：被拉向圆心。" },
                { type: "trap", text: "⚠️ 别搞混：圆周运动需要“向心力”和“离心力”平衡——错！离心力不是真实的力，是惯性视角下的说法；惯性系里只有向心力。" },
                { type: "mathlink", text: "数学呼应：代数 7.2 正比/反比（奠基）——F 随 v² 增大、随 r 增大而减小，这是定律给出的因果关系，不是比值定义。" },
                { type: "slogan", text: "供得上就转，供不上就甩。" }
              ],
              point: "拐弯要“供需平衡”；开车过弯减速，就是给“供”减负。"
            }
          ]
        },
        {
          id: "p13.2.3",
          title: "万有引力定律",
          prereq: "p13.2.2 向心力",
          time: "40–60 分钟",
          formulas: {
            grav: {
              mathml: "<math><mi>F</mi><mo>=</mo><mi>G</mi><mfrac><mrow><msub><mi>m</mi><mn>1</mn></msub><msub><mi>m</mi><mn>2</mn></msub></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></math>",
              translation: "万有引力 = G × 两质量乘积 ÷ 距离平方"
            }
          },
          pages: [
            {
              id: "p13.2.3-p1",
              kind: "interact",
              title: "月亮为什么不掉下来",
              exploreTip: "先猜月亮为什么不掉。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "苹果落地，月亮为什么不掉？",
                    options: ["不受地球引力", "引力拉着它绕圈转", "太轻了，拉不住"],
                    recordKey: "phy_guess_p13.2.3",
                    showAfter: "manual"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: { title: "万有引力", rows: ["F=Gm₁m₂/r²", "质量大、距离近，引力大", "管天体也管苹果"] },
                    right: { title: "库仑定律（预告）", rows: ["F=kq₁q₂/r²", "电荷大、距离近，力大", "p15 细讲"] },
                    verdict: "平方反比双胞胎，类比学"
                  }
                }
              ],
              point: "月亮也在“掉”——掉成了绕地圆圈。小提示：这页的 F=Gm₁m₂/r² 有\"身份证\"——只对质点或均匀球体成立，r 是质心距；不规则的、贴太近的不能直接套（第 2 页细讲）。"
            },
            {
              id: "p13.2.3-p2",
              kind: "explain",
              title: "天上地下的同一个力",
              blocks: [
                { type: "lead", text: "牛顿把苹果落地和月亮绕地看成一件事：任何两个物体之间都有相互吸引的力，这就是万有引力定律。" },
                { type: "text", html: "定律陈述：自然界中任何两个物体都相互吸引，引力的大小跟两物体质量的乘积成正比、跟它们之间距离的平方成反比。公式里 r 是质心距——它只对质点或均匀球体直接成立；不规则的、贴得太近的，都不能直接套。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>F</mi><mo>=</mo><mi>G</mi><mfrac><mrow><msub><mi>m</mi><mn>1</mn></msub><msub><mi>m</mi><mn>2</mn></msub></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></math>",
                    translation: "万有引力 = G × 两质量乘积 ÷ 距离平方"
                  },
                  conditions: ["质点", "质量分布均匀的球体（r 取质心距）"],
                  counterexample: "不规则大石块：各部分到你的距离不一样，不能直接套公式",
                  dimension: "N·m²/kg²·kg²/m² = N ✓",
                  units: { si: "N", note: "G=6.67×10⁻¹¹ N·m²/kg²，卡文迪什测得" }
                },
                { type: "trap", text: "⚠️ 别搞混：G 能直接算任意两物体引力——错！r 是质心距；不规则物体、距离太近（r→0）都不能直接套。" }
              ],
              point: "公式有“身份证”：条件是质点或均匀球体，r 是质心距。"
            },
            {
              id: "p13.2.3-p3",
              kind: "explain",
              title: "月地检验与扭秤",
              blocks: [
                { type: "lead", text: "牛顿的月地检验：月亮绕地转需要的向心力，恰好等于万有引力算出的值——天上地下的力，是同一个。" },
                { type: "text", html: "卡文迪什扭秤：引力太小看不见，就把“小转角”放大成“光斑大位移”——放大微小量的思想。测出 G，就“称”出了地球质量。" },
                { type: "trap", text: "⚠️ 别搞混：引力只与质量有关——错！还与距离平方成反比：距离翻倍，引力只剩四分之一。" },
                { type: "mathlink", text: "数学呼应：代数 7.2 反比例函数（奠基）——平方反比是数学形式，“只对质点/均匀球体”是物理条件。" }
              ],
              point: "苹果落地与月亮绕行，是同一个公式——这就是“月地检验”。"
            }
          ]
        },
        {
          id: "p13.2.4",
          title: "宇宙航行",
          prereq: "p13.2.3 万有引力定律",
          time: "40–60 分钟",
          formulas: {
            vsat: {
              mathml: "<math><mi>v</mi><mo>=</mo><msqrt><mfrac><mrow><mi>G</mi><mi>M</mi></mrow><mi>r</mi></mfrac></msqrt></math>",
              translation: "卫星速度 = 根号(GM ÷ 轨道半径)"
            }
          },
          pages: [
            {
              id: "p13.2.4-p1",
              kind: "interact",
              title: "三道“门槛”",
              exploreTip: "先猜最小环绕速度。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "贴地面飞不掉下来的最小速度——",
                    options: ["7.9 km/s", "11.2 km/s", "16.7 km/s"],
                    recordKey: "phy_guess_p13.2.4",
                    showAfter: "manual"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: { title: "第一宇宙速度 7.9 km/s", rows: ["贴地面绕行", "再慢就掉下来", "卫星的起跑线"] },
                    right: { title: "第二/三宇宙速度", rows: ["11.2：脱离地球", "16.7：飞出太阳系", "越大走得越远"] },
                    verdict: "三道门槛：环绕、脱离、逃逸"
                  }
                }
              ],
              point: "7.9 km/s——贴地面飞行的“起跑线”。"
            },
            {
              id: "p13.2.4-p2",
              kind: "explain",
              title: "越高越慢",
              blocks: [
                { type: "lead", html: "卫星：引力提供向心力，GMm/r²=mv²/r，解出 <span class=\"phy-f\" data-f=\"vsat\"></span>。" },
                { type: "text", html: "越高越慢：r 越大，v 越小——高轨卫星跑得慢，低轨跑得快。同步卫星：周期 24h，相对地面静止——但它仍在绕地心转，不是真“静止”。" },
                { type: "trap", text: "⚠️ 别搞混：卫星越高飞得越快——错！v=√(GM/r)，越高越慢。同步卫星“静止”只是相对地面。" },
                { type: "slogan", text: "越高越慢，同步仍在转。" }
              ],
              point: "v=√(GM/r)：r 在分母——半径越大，速度越小。"
            }
          ]
        },
        {
          id: "p13.2.0",
          title: "章末小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          formulas: {
            traj: {
              mathml: "<math><mi>y</mi><mo>=</mo><mi>a</mi><msup><mi>x</mi><mn>2</mn></msup></math>",
              translation: "轨迹方程：y = a·x²（抛物线）"
            },
            an2: {
              mathml: "<math><msub><mi>a</mi><mi>n</mi></msub><mo>=</mo><mfrac><msup><mi>v</mi><mn>2</mn></msup><mi>r</mi></mfrac></math>",
              translation: "向心加速度 = 线速度平方 ÷ 半径"
            },
            grav2: {
              mathml: "<math><mi>F</mi><mo>=</mo><mi>G</mi><mfrac><mrow><msub><mi>m</mi><mn>1</mn></msub><msub><mi>m</mi><mn>2</mn></msub></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></math>",
              translation: "万有引力 = G × 两质量乘积 ÷ 距离平方"
            }
          },
          pages: [
            {
              id: "p13.2.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "<p>抛体：运动的合成与分解（等时性、独立性；合速度是矢量合成）。平抛 = 水平匀速 + 竖直落体，轨迹 <span class=\"phy-f\" data-f=\"traj\"></span>（与代数 7.1 互相印证）。</p><p>圆周：弧度制（弧长即角度，180°=π）；v=ωr，T=2π/ω；<span class=\"phy-f\" data-f=\"an2\"></span>，方向永远指圆心。</p><p>向心力是效果力：受力图不画“向心力”；供需关系决定转、甩还是被拉回。</p><p>万有引力 <span class=\"phy-f\" data-f=\"grav2\"></span>：只对质点/均匀球体，r 取质心距。宇宙航行：第一宇宙速度 7.9 km/s；越高越慢；同步卫星相对地面静止、仍在绕地心转。</p>"
                }
              ],
              point: "本章一句话：会分解（抛体），认方向（圆周），守条件（万有引力）。"
            },
            {
              id: "p13.2.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "物体做曲线运动的条件是——",
                  options: ["速度变了就行", "合力方向与速度方向不共线", "加速度变了"],
                  answer: 1,
                  tip: "拐弯看“力与速度的夹角”：不共线就拐弯，共线走直线。"
                },
                {
                  type: "choice",
                  stem: "关于向心力，正确的是——",
                  options: ["一种新的性质力", "效果力，受力图上不画", "与离心力平衡"],
                  answer: 1,
                  tip: "全书级规范：向心力是“岗位”不是“员工”；离心力不是真实的力。"
                },
                {
                  type: "choice",
                  stem: "万有引力公式可以直接套用的情形是——",
                  options: ["任意两物体", "质点或均匀球体（r 取质心距）", "只限天体"],
                  answer: 1,
                  tip: "条件：质点/均匀球体；r 是质心距；不规则物体不行。"
                },
                {
                  type: "fill",
                  stemBefore: "第一宇宙速度约为 ",
                  stemAfter: " km/s",
                  answer: "7.9",
                  accept: ["7.91", "7.9 km/s", "8"],
                  hint: "（约 8）",
                  tip: "7.9 km/s——贴地面绕行的“起跑线”，本章估算锚点。"
                },
                {
                  type: "choice",
                  stem: "关于同步卫星，正确的是——",
                  options: ["相对地心静止", "相对地面静止，但仍在绕地心转", "轨道越高飞得越快"],
                  answer: 1,
                  tip: "“静止”只是相对地面；v=√(GM/r)，越高越慢。"
                },
                {
                  type: "choice",
                  stem: "【估算】同步卫星距地心约 4.2×10⁷m、周期 24h，其向心加速度约——（数量级对即满分）",
                  options: ["约 0.02m/s²", "约 0.2m/s²", "约 2m/s²", "约 20m/s²"],
                  answer: 1,
                  tip: "依据链：a = 4π²r/T² ≈ 4×10×4.2×10⁷÷(86400)² ≈ 0.22m/s²——10⁻¹ 量级。比地面 g 小得多。"
                }
              ],
              point: "下一章认旧友：p14 能量与动量——牛顿定律之外的两条新路。"
            }
          ]
        }
      ]
    }
  ]
};
