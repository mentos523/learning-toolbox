/* ============================================================
 * 学习工具箱 · 物理 · 第十四章数据（物理批 4，2026-10-15）
 * p14 机械能守恒与动量：8 课 + 章末小结与习题 p14.2.0
 *
 * schema v1.0（见 p04.js 文件头冻结版）；组件 API 见 WIDGETS.md。
 * 内容分工：概念表述=物理专家队；教学流/话术=黄队。
 *
 * 本章红线兑现：
 * - 比值定义法四辨析：本章无新落点；动量 p=mv、动能 Ek=½mv²
 *   均为定义/定律表述，相关课未出现"比值即正反比"错误表述
 * - 公式适用条件逐公式注明：W=Fl 限恒力（p14.1.1）、机械能守恒
 *   限只有重力/弹力做功（p14.1.4）、动量守恒限合外力为零
 *   （p14.1.2/p14.2.2）、单摆周期本章不涉及（p17.1.2）
 * - 矢量性：动量首次标注矢量（p14.2.1）；动量守恒先定正方向
 *   （p14.2.2）；冲量 F 强调是合外力（p14.2.1）
 * - 回填点兑现（附录 B，批 4 责任）：
 *   ① p14.1.1 回填 p07.1.2：P=Fv 中 v 的平均/瞬时区分、变力功
 *   ② p14.1.4 回填 p07.2.2：机械能守恒初中定性 → 高中条件严格化
 * - 本章最大观念点：能量与动量是两个独立守恒量，互不蕴含
 *   （p14.2.2-p3）
 *
 * 缺口上报（WIDGETS.md 无对应组件，页内用最接近组件承载）：
 * 1. p14.1.3：零势能面切换虚拟演示（Ep 正负联动）→ 用 Y1
 *    guess-verify + Y5 side-compare（重力/弹性势能对照）承载
 * 2. p14.1.4：单摆 + 弹簧振子能量转化虚拟演示（动能/势能柱状图
 *    联动）→ 用 P10 spring-shm 承载（无能量柱状图）
 * 3. p14.2.3：碰撞参数调节（弹性系数滑块）→ P7 collision-lab
 *    的 restitution 为固定 number、无滑块，用固定值 + Y5
 *    side-compare（三类碰撞对照）承载
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p14"] = {
  id: "p14",
  units: [
    {
      id: "p14.1",
      title: "机械能守恒",
      lessons: [
        {
          id: "p14.1.1",
          title: "功与功率（高中版）",
          prereq: "p07 功；p12 力的分解",
          time: "40–60 分钟",
          formulas: {
            work: {
              mathml: "<math><mi>W</mi><mo>=</mo><mi>F</mi><mi>l</mi><mi>cos</mi><mi>&#945;</mi></math>",
              translation: "功 = 力 × 位移 × cos夹角"
            },
            pfv: {
              mathml: "<math><mi>P</mi><mo>=</mo><mi>F</mi><mi>v</mi></math>",
              translation: "功率 = 力 × 速度"
            }
          },
          pages: [
            {
              id: "p14.1.1-p1",
              kind: "interact",
              title: "变力的功，看面积",
              exploreTip: "点“读面积”：看切片怎么填满曲线下面——变力的功，就是这块面积。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.PlotBoard */
                    engine: {
                      primitive: "PlotBoard", version: "2026.10.17.2",
                      params: { sourceKind: "function", expr: "F = 10*t*t + 20" }
                    },
                    
                    source: { kind: "function", expr: "F = 10*t*t + 20", xLabel: "l/m", yLabel: "F/N" },
                    steps: ["area"],
                    areaSlices: 40,
                    xRange: [0, 4],
                    badge: { invariant: "没变的是：面积 = 功（变的是力与位移→面积的读数）" }
                  }
                }
              ],
              point: "F–l 图像的面积就是功——恒力是矩形，变力是“数格子”。"
            },
            {
              id: "p14.1.1-p2",
              kind: "explain",
              title: "W=Fl 只管恒力",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>W</mi><mo>=</mo><mi>F</mi><mi>l</mi><mi>cos</mi><mi>&#945;</mi></math>",
                    translation: "功 = 力 × 位移 × cos夹角"
                  },
                  conditions: ["恒力"],
                  counterexample: "变力：F 一直在变，W=Fl 直接失效——看 F–l 图像面积",
                  dimension: "N·m = J ✓",
                  units: { si: "J", common: "J", note: "1 J = 1 N·m" }
                },
                { type: "oldfriend", text: "认旧友·回填 p07.1.2：初中 P=Fv 里的 v 没细说——高中分清：P=Fv̄（平均功率，用平均速度）vs P=Fv（瞬时功率，用瞬时速度）。汽车爬坡挂低挡：功率一定，v 小则牵引力 F 大。" },
                { type: "text", html: "所谓恒力，是“大小和方向都不变”的力——手推桌子时只要忽大忽小，W=Fl 就不能直接套。变力怎么办？看 F–l 图像的面积：面积就是功，恒力对应矩形，变力是“数格子”。所以 W=Fl 只是面积法的特例——恒力对应矩形面积。" },
                { type: "trap", text: "⚠️ 别搞混：W=Fl 无条件成立——错！限恒力。F 变了，就看图像面积。" }
              ],
              point: "背公式先背条件：W=Fl 的身份证上写着“恒力专享”。"
            },
            {
              id: "p14.1.1-p3",
              kind: "explain",
              title: "正功负功与微元思想",
              blocks: [
                { type: "lead", text: "α<90° 做正功（推着走），α>90° 做负功（拖后腿），α=90° 不做功。" },
                { type: "text", html: "变力功：F–l 图像面积。微元思想——切成无数小段，每段近似恒力，再求和。这是积分思想的萌芽：先切碎，再求和。" },
                { type: "mathlink", text: "数学呼应：代数 8.3 三角 cosα（奠基）；代数 12.1 积分思想（预告）——面积=功是积分的第二次物理亮相。" },
                { type: "slogan", text: "恒力套公式，变力看面积。" }
              ],
              point: "正功负功看夹角；变力做功看面积——“切碎再求和”。"
            }
          ]
        },
        {
          id: "p14.1.2",
          title: "动能定理",
          prereq: "p14.1.1 功与功率",
          time: "40–60 分钟",
          formulas: {
            ekt: {
              mathml: "<math><msub><mi>W</mi><mi>&#21512;</mi></msub><mo>=</mo><mi>&#916;</mi><msub><mi>E</mi><mi>k</mi></msub></math>",
              translation: "合外力的功 = 动能变化量"
            },
            ek: {
              mathml: "<math><msub><mi>E</mi><mi>k</mi></msub><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>m</mi><msup><mi>v</mi><mn>2</mn></msup></math>",
              translation: "动能 = 1/2 × 质量 × 速度平方"
            }
          },
          pages: [
            {
              id: "p14.1.2-p1",
              kind: "interact",
              title: "同一题，两种解法",
              exploreTip: "先猜哪种解法省事，再看左右对照。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "刹车题：动能定理 vs 牛顿定律，谁省事？",
                    options: ["动能定理：只看初末", "牛顿定律：步步算", "都一样"],
                    recordKey: "phy_guess_p14.1.2",
                    showAfter: "manual"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: { title: "牛顿法", rows: ["F=ma 步步算", "要过程细节", "先算 a 再算 x"] },
                    right: { title: "动能定理法", rows: ["W合=ΔEk 只看初末", "不要过程细节", "一步到位"] },
                    verdict: "不问过程，能量法更快"
                  }
                }
              ],
              point: "不问中间过程，能量法一步到位。"
            },
            {
              id: "p14.1.2-p2",
              kind: "explain",
              title: "合外力的功",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><msub><mi>W</mi><mi>&#21512;</mi></msub><mo>=</mo><mi>&#916;</mi><msub><mi>E</mi><mi>k</mi></msub></math>",
                    translation: "合外力的功 = 动能变化量"
                  },
                  conditions: ["W合 是合外力做的功（一个力不许漏）"],
                  counterexample: "漏了摩擦力：W合 算少了，ΔEk 对不上——先受力分析再列式",
                  dimension: "J = J ✓",
                  units: { si: "J", note: "Ek 是标量，没有方向" }
                },
                { type: "text", html: "合外力做的功，就是把每一个分力各自做的功加起来——正功取正、负功取负，代数相加：W合=W₁+W₂+…。它和“先求合力再算功”是一回事：恒力情况下，W合=F合·l·cosα。算账口诀：一个分力不许漏，负功也要带负号一起加。" },
                { type: "trap", text: "⚠️ 别搞混：W合 漏力 / 动能定理与机械能守恒混用——动能定理看“功”（合外力做功），机械能守恒看“条件”，两码事。" }
              ],
              point: "W合 的“合”字是命门：漏一个力，账就对不上。"
            },
            {
              id: "p14.1.2-p3",
              kind: "explain",
              title: "牛顿定律的“马甲”",
              blocks: [
                { type: "lead", text: "推导思路：牛顿第二定律 + 运动学公式，消去加速度，就得到 W合=ΔEk——动能定理是牛顿定律的“马甲”，换了个样子。" },
                { type: "text", html: "动能 <span class=\"phy-f\" data-f=\"ek\"></span> 是标量，没有方向。解题三步：①定对象；②受力分析找 W合；③列 W合=ΔEk。" },
                { type: "slogan", text: "合外力做功，动能跟着变。" }
              ],
              point: "动能定理不问过程——这是它比牛顿法省事的根源。"
            }
          ]
        },
        {
          id: "p14.1.3",
          title: "重力势能与弹性势能",
          prereq: "p14.1.2 动能定理",
          time: "40–60 分钟",
          formulas: {
            epg: {
              mathml: "<math><msub><mi>E</mi><mi>p</mi></msub><mo>=</mo><mi>m</mi><mi>g</mi><mi>h</mi></math>",
              translation: "重力势能 = 质量 × g × 高度"
            },
            epe: {
              mathml: "<math><msub><mi>E</mi><mi>p</mi></msub><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>k</mi><msup><mi>x</mi><mn>2</mn></msup></math>",
              translation: "弹性势能 = 1/2 × 劲度系数 × 形变量平方"
            }
          },
          pages: [
            {
              id: "p14.1.3-p1",
              kind: "interact",
              title: "换个零点，值就变",
              exploreTip: "先猜换零点 Ep 变不变，再看左右对照。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "零势能面从地面换到桌面，Ep——",
                    options: ["变了", "没变", "说不清"],
                    recordKey: "phy_guess_p14.1.3",
                    showAfter: "manual"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: { title: "重力势能 Ep=mgh", rows: ["看高度 h", "零点一换值就变", "h 可负"] },
                    right: { title: "弹性势能 Ep=½kx²", rows: ["看形变量 x", "原长处为零", "拉压都一样"] },
                    verdict: "一个看高度，一个看形变"
                  }
                }
              ],
              point: "势能是相对的：零点一换，数值跟着换。"
            },
            {
              id: "p14.1.3-p2",
              kind: "explain",
              title: "势能是相对的",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><msub><mi>E</mi><mi>p</mi></msub><mo>=</mo><mi>m</mi><mi>g</mi><mi>h</mi></math>",
                    translation: "重力势能 = 质量 × g × 高度"
                  },
                  conditions: ["h 相对零势能面"],
                  counterexample: "不说零势能面就报 Ep 值：没意义——先约定位面",
                  dimension: "kg·m/s²·m = J ✓",
                  units: { si: "J", note: "Ep 正负表大小，不表方向" }
                },
                { type: "text", html: "弹性势能 <span class=\"phy-f\" data-f=\"epe\"></span>（定性掌握）：与形变量平方成正比——拉长一倍，势能变四倍。保守力做功特点：只与初末位置有关，与路径无关。" },
                { type: "trap", text: "⚠️ 别搞混：势能是物体的“绝对”属性——错！相对零势能面；Ep 的正负表大小，不表方向。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 一次函数（奠基）——Ep–h 图像是直线，斜率=mg。" }
              ],
              point: "先约定位面，再谈势能——这是势能的“入场券”。"
            }
          ]
        },
        {
          id: "p14.1.4",
          title: "机械能守恒定律",
          prereq: "p14.1.3 重力势能与弹性势能",
          time: "40–60 分钟",
          formulas: {
            mech: {
              mathml: "<math><mi>E</mi><mo>=</mo><msub><mi>E</mi><mi>k</mi></msub><mo>+</mo><msub><mi>E</mi><mi>p</mi></msub><mo>=</mo><mi>&#24658;&#37327;</mi></math>",
              translation: "机械能 = 动能 + 势能，保持不变"
            }
          },
          pages: [
            {
              id: "p14.1.4-p1",
              kind: "interact",
              title: "来回倒，总数不变",
              exploreTip: "拖振子松手：动能、势能来回倒，但总数不变——总数变的条件，第 2 页讲。",
              widgets: [
                {
                  type: "spring-shm",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.SpringMass */
                    engine: {
                      primitive: "SpringMass", version: "2026.10.17.2",
                      params: { kInit: 50, mInit: 1, damping: false }
                    },
                    
                    k: { min: 10, max: 200, step: 10, init: 50 },
                    m: { min: 0.5, max: 5, step: 0.5, init: 1 },
                    dragAmp: true, showXTGraph: false, showEquation: false,
                    badge: { invariant: "没变的是：系统的总机械能（变的是动能↔势能的来回倒）" }
                  }
                }
              ],
              point: "动能、势能互相倒，总数不动——这就是“守恒”的样子。"
            },
            {
              id: "p14.1.4-p2",
              kind: "explain",
              title: "守恒是有条件的",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>E</mi><mo>=</mo><msub><mi>E</mi><mi>k</mi></msub><mo>+</mo><msub><mi>E</mi><mi>p</mi></msub><mo>=</mo><mi>&#24658;&#37327;</mi></math>",
                    translation: "机械能 = 动能 + 势能，保持不变"
                  },
                  conditions: ["只有重力做功", "或只有弹力做功"],
                  counterexample: "有摩擦：摩擦力做负功，机械能变少——守恒失效",
                  dimension: "J = J + J ✓",
                  units: { si: "J", note: "系统：看研究对象是谁" }
                },
                { type: "text", html: "判定实例：人从高处跳进沙坑，问“下落加着陆这段时间机械能守恒吗”。先看系统——取“人”为研究对象，沙子对人的阻力做了负功，条件不满足，人的机械能不守恒（少了的部分变成了内能）。系统定了，“条件满不满”才问得清；先定对象、再看条件，顺序别反。" },
                { type: "trap", text: "⚠️ 别搞混：机械能守恒 = 能量守恒——错！前者是后者的特例：有摩擦时机械能不守恒，但总能量仍守恒（变成了内能）。" }
              ],
              point: "“守恒”不是无条件的——先看系统，再看条件。"
            },
            {
              id: "p14.1.4-p3",
              kind: "explain",
              title: "从定性到严格",
              blocks: [
                { type: "oldfriend", text: "认旧友·回填 p07.2.2：初中说“忽略摩擦时机械能守恒”——高中严格化：条件是“只有重力（弹力）做功”。“忽略摩擦”只是这个条件的特例说法。" },
                { type: "text", html: "应用：单摆（最高点↔最低点）、自由落体、弹簧振子——先看条件，再列 E₁=E₂。单摆摆角太大（>5°）另有讲究，周期公式以后再说。" },
                { type: "slogan", text: "先看条件，再列等式。" }
              ],
              point: "初中是“定性版”，高中是“条件严格版”——升级的是条件意识。"
            }
          ]
        }
      ]
    },
    {
      id: "p14.2",
      title: "动量",
      lessons: [
        {
          id: "p14.2.1",
          title: "动量定理",
          prereq: "p12 牛顿运动定律",
          time: "40–60 分钟",
          formulas: {
            mom: {
              mathml: "<math><mi>p</mi><mo>=</mo><mi>m</mi><mi>v</mi></math>",
              translation: "动量 = 质量 × 速度"
            },
            imp: {
              mathml: "<math><mi>I</mi><mo>=</mo><mi>F</mi><mi>t</mi><mo>=</mo><mi>&#916;</mi><mi>p</mi></math>",
              translation: "合外力的冲量 = 动量变化量"
            }
          },
          pages: [
            {
              id: "p14.2.1-p1",
              kind: "interact",
              title: "缓冲：把面积摊薄",
              exploreTip: "安全气囊：点“读面积”——同样的冲量，时间拉长，平均力就小。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.PlotBoard */
                    engine: {
                      primitive: "PlotBoard", version: "2026.10.17.2",
                      params: { sourceKind: "function", expr: "F = 200*t + 100" }
                    },
                    
                    source: { kind: "function", expr: "F = 200*t + 100", xLabel: "t/s", yLabel: "F/N" },
                    steps: ["area"],
                    areaSlices: 40,
                    xRange: [0, 5],
                    badge: { invariant: "没变的是：面积 = 冲量（变的是作用时间→平均力的大小）" }
                  }
                }
              ],
              point: "F–t 图像的面积是冲量——缓冲就是“把面积摊薄”。"
            },
            {
              id: "p14.2.1-p2",
              kind: "explain",
              title: "动量是矢量",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>p</mi><mo>=</mo><mi>m</mi><mi>v</mi></math>",
                    translation: "动量 = 质量 × 速度"
                  },
                  conditions: ["速度是矢量——动量也是矢量，有方向（动量首次标注矢量）"],
                  counterexample: "只比大小不看方向：两车对撞，动量“一样大”但方向相反——矢量相加会抵消",
                  dimension: "kg·m/s ✓",
                  units: { si: "kg·m/s", note: "矢量！方向与速度同向" }
                },
                { type: "text", html: "动量的方向就是速度的方向：两个小球质量相同、速率相同，一个向东、一个向西——它们的动量不是同一个量。方向不同，动量就不同。做动量题时，先定正方向，与正方向相同的取正、相反的取负，再列方程。只比大小不看方向，矢量运算必翻车。" },
                { type: "trap", text: "⚠️ 别搞混：“动量大”即“动能大”——错！p=√(2mEk)：同样动能，质量大的动量大。“刹住它”有多难，看动量。" },
                { type: "mathlink", text: "数学呼应：代数 ch02（奠基）——冲量 Ft 的量纲 N·s = kg·m/s，与动量一致，量纲先验货。" }
              ],
              point: "动量 = 质量 × 速度——有大小，更有方向。"
            },
            {
              id: "p14.2.1-p3",
              kind: "explain",
              title: "冲量：F 是合外力",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>I</mi><mo>=</mo><mi>F</mi><mi>t</mi><mo>=</mo><mi>&#916;</mi><mi>p</mi></math>",
                    translation: "合外力的冲量 = 动量变化量"
                  },
                  conditions: ["F 是合外力"],
                  counterexample: "只算推力不算摩擦力：冲量算多了，Δp 对不上——先求合外力",
                  dimension: "N·s = kg·m/s ✓",
                  units: { si: "N·s", common: "N·s", note: "= kg·m/s" }
                },
                { type: "text", html: "冲量的定义：力与时间的乘积，I=Ft——这里的 F 必须是合外力。“某个力的冲量”和“合外力的冲量”要分清：只算推力、不算摩擦力，冲量就多算了，Δp 对不上。缓冲就是冲量的应用：Δp 一定，t 拉长，平均力就变小。" },
                { type: "text", html: "缓冲实例：安全气囊、跳远沙坑、接球后撤——Δp 一定，t 拉长则平均力 F̄ 变小。" },
                { type: "slogan", text: "时间拉长，力气变小。" }
              ],
              point: "动量定理的 F 是合外力——“某个力”不够，要“合”。"
            }
          ]
        },
        {
          id: "p14.2.2",
          title: "动量守恒定律",
          prereq: "p14.2.1 动量定理",
          time: "40–60 分钟",
          formulas: {
            momcons: {
              mathml: "<math><msub><mi>p</mi><mi>&#24635;</mi></msub><mo>=</mo><mi>&#24658;&#37327;</mi></math>",
              translation: "系统总动量保持不变"
            }
          },
          pages: [
            {
              id: "p14.2.2-p1",
              kind: "interact",
              title: "p前 = p后",
              exploreTip: "先定正方向（向右为正），再播放：看 p前 = p后 那行读数。",
              widgets: [
                {
                  type: "collision-lab",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.Collision1D */
                    engine: {
                      primitive: "Collision1D", version: "2026.10.17.2",
                      params: { restitution: 1 }
                    },
                    
                    m1: { min: 1, max: 5, step: 0.5, init: 2 },
                    m2: { min: 1, max: 5, step: 0.5, init: 2 },
                    v1: { min: -5, max: 5, step: 0.5, init: 4 },
                    v2: { min: -5, max: 5, step: 0.5, init: 0 },
                    restitution: 1, showMomentumBars: true,
                    badge: { invariant: "没变的是：系统总动量（变的是碰撞前后→各自动量的分配）" }
                  }
                }
              ],
              point: "p前 = p后 ✓——碰撞前后，系统总动量不变。提醒：这页的碰撞是\"孤立系统\"的理想情况——没算外力；真实碰撞多少受点外力（摩擦、重力），\"p前=p后\"是近似成立（第 2 页办\"身份证\"）。"
            },
            {
              id: "p14.2.2-p2",
              kind: "explain",
              title: "先定正方向",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><msub><mi>p</mi><mi>&#24635;</mi></msub><mo>=</mo><mi>&#24658;&#37327;</mi></math>",
                    translation: "系统总动量：碰前 = 碰后"
                  },
                  conditions: ["系统合外力为零", "或内力远大于外力（近似守恒）"],
                  counterexample: "粗糙地面上的碰撞：摩擦力不可忽略，动量不守恒——先看条件",
                  dimension: "kg·m/s = kg·m/s ✓",
                  units: { si: "kg·m/s", note: "矢量运算：先定正方向！" }
                },
                { type: "text", html: "矢量性：先定正方向，与正方向相同的取正、相反的取负，再列方程——这是动量题的“开场白”，审计清单第 5 条。" },
                { type: "trap", text: "⚠️ 别搞混：某方向合外力不为零，该方向也守恒——错！哪个方向合外力为零，哪个方向才守恒（分量守恒，有条件）。" }
              ],
              point: "动量守恒第一步不是列方程，是定正方向。"
            },
            {
              id: "p14.2.2-p3",
              kind: "explain",
              title: "两个守恒，各记各的账",
              blocks: [
                { type: "lead", text: "本章最大观念点：能量与动量是两个独立守恒量，互不蕴含。" },
                { type: "text", html: "完全非弹性碰撞（粘在一起）：动量守恒，机械能损失最大——动量守恒推不出机械能守恒，反过来也不行。两个账本，各记各的。" },
                { type: "mathlink", text: "数学呼应：代数 ch01 方程组（奠基）——动量方程 + 能量方程联立，方程组的物理综合应用。" },
                { type: "slogan", text: "两个守恒，各记各的账。" }
              ],
              point: "动量守恒 ≠ 机械能守恒——独立的两本账，别互相推导。"
            }
          ]
        },
        {
          id: "p14.2.3",
          title: "碰撞",
          prereq: "p14.2.2 动量守恒定律",
          time: "40–60 分钟",
          formulas: {
            elast: {
              mathml: "<math><msub><mi>v</mi><mn>1</mn></msub><mo>&#8596;</mo><msub><mi>v</mi><mn>2</mn></msub></math>",
              translation: "等质量弹性对心碰撞：交换速度"
            }
          },
          pages: [
            {
              id: "p14.2.3-p1",
              kind: "interact",
              title: "等质量对心撞：交换速度",
              exploreTip: "等质量对心撞：看“交换速度 ✓”徽章——这是“一动碰一静”的招牌结论。",
              widgets: [
                {
                  type: "collision-lab",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.Collision1D */
                    engine: {
                      primitive: "Collision1D", version: "2026.10.17.2",
                      params: { restitution: 1 }
                    },
                    
                    m1: { min: 1, max: 5, step: 0.5, init: 2 },
                    m2: { min: 1, max: 5, step: 0.5, init: 2 },
                    v1: { min: -5, max: 5, step: 0.5, init: 4 },
                    v2: { min: -5, max: 5, step: 0.5, init: 0 },
                    restitution: 1, showMomentumBars: true,
                    badge: { invariant: "没变的是：系统总动量（变的是碰撞→两车速度的交换）" }
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: { title: "弹性碰撞", rows: ["动量守恒", "机械能也守恒", "碰后分开"] },
                    right: { title: "完全非弹性碰撞", rows: ["动量守恒", "机械能损失最大", "粘在一起走"] },
                    verdict: "中间还有“非弹性”：动量守恒，机械能损失一部分"
                  }
                }
              ],
              point: "等质量弹性对心撞：交换速度——台球“定杆”的原理。提醒：\"交换速度\"是理想弹性碰撞+无外力时的结论——真实碰撞多少会丢点机械能（变热/变形），完全理想的弹性碰撞现实中不存在。"
            },
            {
              id: "p14.2.3-p2",
              kind: "explain",
              title: "三类碰撞",
              blocks: [
                { type: "lead", text: "“一动碰一静”弹性碰撞：m₁=m₂ 时交换速度；m₁≫m₂ 时 m₁ 几乎不停、m₂ 以近 2v₁ 弹开。" },
                { type: "text", html: "三类：弹性（动量 + 机械能都守恒）、非弹性（动量守恒、机械能损失一部分）、完全非弹性（粘连，机械能损失最大）。" },
                { type: "slogan", text: "先看粘不粘，再看能量丢多少。" }
              ],
              point: "分类看两条：粘不粘（动量都守恒），能量丢多少。"
            },
            {
              id: "p14.2.3-p3",
              kind: "explain",
              title: "“近似守恒”也有条件",
              blocks: [
                { type: "text", html: "碰撞过程动量“近似”守恒：碰撞时间极短，内力远大于外力（如重力、摩擦），外力冲量可忽略——有条件，不是无条件。" },
                { type: "trap", text: "⚠️ 别搞混：碰撞后两物体一定分开——错！完全非弹性碰撞粘在一起走；“近似守恒”也要条件（内力远大于外力）。" }
              ],
              point: "“近似”不是“随便”——内力远大于外力，才许近似。"
            }
          ]
        },
        {
          id: "p14.2.0",
          title: "章末小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          formulas: {
            ekt2: {
              mathml: "<math><msub><mi>W</mi><mi>&#21512;</mi></msub><mo>=</mo><mi>&#916;</mi><msub><mi>E</mi><mi>k</mi></msub></math>",
              translation: "合外力的功 = 动能变化量"
            },
            imp2: {
              mathml: "<math><mi>I</mi><mo>=</mo><mi>F</mi><mi>t</mi><mo>=</mo><mi>&#916;</mi><mi>p</mi></math>",
              translation: "合外力的冲量 = 动量变化量"
            }
          },
          pages: [
            {
              id: "p14.2.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "<p>三条主线在此汇合：牛顿定律 / 能量 / 动量。功：W=Flcosα（限恒力），变力看 F–l 图像面积；P=Fv 区分平均/瞬时（回填 p07.1.2）。</p><p>动能定理 <span class=\"phy-f\" data-f=\"ekt2\"></span>（W合 不许漏力）；机械能守恒条件：只有重力（弹力）做功 ≠ 能量守恒（回填 p07.2.2）。</p><p>动量 p=mv（矢量，首次标注）；动量定理 <span class=\"phy-f\" data-f=\"imp2\"></span>（F 是合外力）。动量守恒条件：合外力为零，先定正方向。</p><p>最大观念点：能量与动量是两个独立守恒量，互不蕴含。碰撞三类：弹性 / 非弹性 / 完全非弹性（粘连，能量损失最大）。</p><p>数量级锚点：人步行动量约 10² kg·m/s 量级；子弹动能约 10³J 量级；一度电 3.6×10⁶J——估算先有锚。</p>"
                }
              ],
              point: "本章一句话：能量看“功”，动量看“冲量”，守恒都要先看条件。"
            },
            {
              id: "p14.2.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "W=Flcosα 成立的条件是——",
                  options: ["任何力都行", "限恒力", "只限重力"],
                  answer: 1,
                  tip: "限恒力——变力的功看 F–l 图像面积。"
                },
                {
                  type: "choice",
                  stem: "机械能守恒的条件是——",
                  options: ["没有摩擦", "只有重力（弹力）做功", "速度不变"],
                  answer: 1,
                  tip: "只有重力（弹力）做功。“没有摩擦”只是特例说法。"
                },
                {
                  type: "choice",
                  stem: "用动量守恒列方程，第一步是——",
                  options: ["直接列 p前=p后", "先定正方向", "先统一单位"],
                  answer: 1,
                  tip: "矢量运算先定正方向——动量题的“开场白”。"
                },
                {
                  type: "fill",
                  stemBefore: "动量的 SI 单位是 ",
                  stemAfter: "",
                  answer: "kg·m/s",
                  accept: ["kg*m/s", "千克米每秒"],
                  hint: "（千克·米/秒）",
                  tip: "kg·m/s = N·s——冲量与动量量纲一致，动量定理的量纲验货。"
                },
                {
                  type: "choice",
                  stem: "关于完全非弹性碰撞，正确的是——",
                  options: ["动量不守恒", "动量守恒、机械能损失最大", "两物体一定分开"],
                  answer: 1,
                  tip: "粘在一起走：动量守恒，机械能损失最大——能量与动量各记各的账。"
                },
                {
                  type: "choice",
                  stem: "【估算】一颗 10g 的子弹以 800m/s 射出，其动能约——（数量级对即满分）",
                  options: ["约 32J", "约 320J", "约 3200J", "约 32000J"],
                  answer: 2,
                  tip: "依据链：Ek = ½mv² = 0.5×0.01×800² = 3200J——10³ 量级。记住这个锚点：子弹动能约 10³J。"
                }
              ],
              point: "高中力学收官：下一章 p15 静电场，“平方反比双胞胎”再相见。"
            }
          ]
        }
      ]
    }
  ]
};
