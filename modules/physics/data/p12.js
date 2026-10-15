/* ============================================================
 * 学习工具箱 · 物理 · 第十二章数据（物理批 3，2026-10-15）
 * p12 相互作用与牛顿运动定律：8 课 + 章末小结与习题 p12.2.0
 *
 * schema v1.0（见 p04.js 文件头冻结版）；组件 API 见 WIDGETS.md。
 * 内容分工：概念表述=物理专家队；教学流/话术=黄队。
 *
 * 本章红线兑现：
 * - 矢量运算必交代方向处理：平行四边形定则（p12.1.3）、正交分解（p12.1.4）
 * - f=μN 限滑动摩擦；静摩擦 0<f≤fmax 由平衡条件定（p12.1.2）
 * - 牛顿定律适用条件：宏观、低速、惯性系（p12.2.2）；F=ma 因果讲清（审计清单第 6 条）
 * - 回填点兑现：p12.2.1 认旧友 p05.2.1（理想实验→惯性系表述）；
 *   p12.2.3 认旧友 p05.2.3（平衡力 vs 作用反作用再辨析，马拉车问题）
 * - 分力是等效替代：受力分析图不画分力（全书级规范，p12.1.4）
 * - 超重是视重变大，重力没变（p12.2.4）
 * - 估算锚点：1N ≈ 托起两个鸡蛋（p12.2.2）
 * 缺口上报：两弹簧秤对拉组件、电梯超重失重组件（暂用 Y1/P1 载体）。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p12"] = {
  id: "p12",
  units: [
    {
      id: "p12.1",
      title: "相互作用",
      lessons: [
        {
          id: "p12.1.1",
          title: "重力与弹力（高中深化）",
          prereq: "p05 力；p11 矢量",
          time: "40–60 分钟",
          formulas: {
            kx: {
              mathml: "<math><mi>F</mi><mo>=</mo><mi>k</mi><mi>x</mi></math>",
              translation: "弹力 = 劲度系数 × 形变量"
            },
            gm: {
              mathml: "<math><mi>G</mi><mo>=</mo><mi>m</mi><mi>g</mi></math>",
              translation: "重力 = 质量 × 重力加速度"
            }
          },
          pages: [
            {
              id: "p12.1.1-p1",
              kind: "interact",
              title: "F–x 图像：斜率就是 k",
              exploreTip: "点“读斜率”：F–x 图线的斜率 = 劲度系数 k——k 是弹簧的“脾气”。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "function", expr: "F = 50*t", xLabel: "x/m", yLabel: "F/N" },
                    steps: ["slope"], xRange: [0, 0.2],
                    badge: { invariant: "没变的是：弹簧的劲度系数" }
                  }
                }
              ],
              point: "k 是弹簧的脾气：F–x 图像越陡，弹簧越“硬”。"
            },
            {
              id: "p12.1.1-p2",
              kind: "explain",
              title: "胡克定律严格版",
              blocks: [
                { type: "lead", text: "弹簧的脾气叫劲度系数 k：k 大的硬，k 小的软。F–x 图像的斜率，就是 k。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>F</mi><mo>=</mo><mi>k</mi><mi>x</mi></math>",
                    translation: "弹力 = 劲度系数 × 形变量"
                  },
                  conditions: ["弹性限度内", "弹簧（x 是形变量，不是弹簧长度！）"],
                  counterexample: "拉过头：超出弹性限度，F–x 弯了，不成正比（p05.1.2 老朋友）",
                  dimension: "N = (N/m)·m ✓",
                  units: { si: "N", note: "k 的单位是 N/m" }
                },
                { type: "text", html: "弹力方向：与形变恢复方向相同（压弹簧，弹力向上顶）。绳/杆/弹簧模型：绳只能拉（不能推）；杆可推可拉；弹簧可推可拉——模型边界，用前先问“它能干嘛”。" },
                { type: "trap", text: "⚠️ 别搞混：放在桌面上的物体对桌面“没有”弹力——错。形变微小但存在。绳子能提供推力——错，绳只能拉。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 一次函数（奠基）——F–x 图像斜率 = k，物理为数学打的第二个样板。" },
                { type: "slogan", text: "k 是弹簧的脾气。" }
              ],
              point: "F=kx 限弹性限度内；x 是形变量；绳只能拉，杆可推可拉。"
            }
          ]
        },
        {
          id: "p12.1.2",
          title: "摩擦力（高中深化）",
          prereq: "p12.1.1 重力与弹力",
          time: "40–60 分钟",
          formulas: {
            f: {
              mathml: "<math><mi>f</mi><mo>=</mo><mi>μ</mi><mi>N</mi></math>",
              translation: "滑动摩擦力 = 动摩擦因数 × 正压力"
            }
          },
          pages: [
            {
              id: "p12.1.2-p1",
              kind: "interact",
              title: "推箱子：f 跟着 F 走",
              exploreTip: "看 f–F 图像：F 小时 f 跟着 F 走（静摩擦）；F 过了转折点，f 掉下来不动了（滑动摩擦）。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "points", points: [[0, 0], [2, 2], [4, 4], [5, 5], [5.5, 3], [7, 3], [9, 3]], xLabel: "F/N", yLabel: "f/N" },
                    steps: [],
                    badge: { invariant: "没变的是：接触面的粗糙程度" }
                  }
                }
              ],
              point: "静摩擦跟着推力走，≤μN；过了最大静摩擦，才轮到滑动摩擦登场。"
            },
            {
              id: "p12.1.2-p2",
              kind: "explain",
              title: "静摩擦：≤μN，由平衡定",
              blocks: [
                { type: "lead", text: "推箱子用 10N，箱子不动——摩擦力是多少？10N。不是 μN，是 10N。" },
                { type: "text", html: "静摩擦：0 < f ≤ fmax，有相对运动趋势就有，大小由平衡条件定（推多大，摩擦多大）。fmax = μN 是上限——不到这个数，μN 不出场。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>f</mi><mo>=</mo><mi>μ</mi><mi>N</mi></math>",
                    translation: "滑动摩擦力 = 动摩擦因数 × 正压力"
                  },
                  conditions: ["滑动摩擦：两接触面有相对滑动"],
                  counterexample: "静摩擦：f 由平衡条件定，0<f≤fmax——μN 是上限，不是恒值",
                  dimension: "N = 1·N ✓（μ 无单位）",
                  units: { si: "N" }
                },
                { type: "trap", text: "⚠️ 别搞混：静摩擦力恒等于 μN——错！是 ≤μN，由平衡条件定。f=μN 只管滑动摩擦（条件！审计清单第 3 条）。" },
                { type: "mathlink", text: "数学呼应：代数 ch05 不等式（奠基）——0<f≤fmax，物理第一次用上不等式。" },
                { type: "slogan", text: "静摩擦看平衡，滑动才用 μN。" }
              ],
              point: "静摩擦 0<f≤fmax，由平衡条件定；f=μN 限滑动摩擦——条件别用错。"
            },
            {
              id: "p12.1.2-p3",
              kind: "explain",
              title: "方向：看相对运动趋势",
              blocks: [
                { type: "lead", text: "走路时，脚蹬地向后，摩擦力向前——摩擦力是动力！传送带运货，摩擦力带着货走。" },
                { type: "text", html: "方向判定：与相对运动 / 相对运动趋势方向相反。注意“相对”两个字：走路是脚相对地面向后蹬，摩擦力向前——跟“运动方向”不是一回事。" },
                { type: "trap", text: "⚠️ 别搞混：摩擦力方向与运动方向相反——错。是与相对运动/趋势方向相反。摩擦力总是阻力——错，走路、传送带里它是动力。" },
                { type: "text", html: "N 是正压力（垂直于接触面），不是重力：斜面上的 N = Gcosθ——别一提 N 就写 mg。" },
                { type: "slogan", text: "方向看相对，不是看运动。" }
              ],
              point: "摩擦力方向：与相对运动/趋势方向相反——走路时它是动力。"
            }
          ]
        },
        {
          id: "p12.1.3",
          title: "力的合成",
          prereq: "p12.1.2 摩擦力",
          time: "40–60 分钟",
          formulas: {
            fr: {
              mathml: "<math><mrow><mo>|</mo><msub><mi>F</mi><mn>1</mn></msub><mo>−</mo><msub><mi>F</mi><mn>2</mn></msub><mo>|</mo><mo>≤</mo><mi>F</mi><mo>≤</mo><msub><mi>F</mi><mn>1</mn></msub><mo>+</mo><msub><mi>F</mi><mn>2</mn></msub></mrow></math>",
              translation: "合力范围：两分力之差 ≤ 合力 ≤ 两分力之和"
            }
          },
          pages: [
            {
              id: "p12.1.3-p1",
              kind: "interact",
              title: "合力滑块：夹角决定一切",
              exploreTip: "拖两个力的箭头：改大小、改夹角，看合力箭头（朱红加粗）怎么变——合力一定比分力大吗？",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 45, size: 15, label: "木块" },
                    forces: [
                      { id: "f1", kind: "pull", label: "F₁", angleDeg: 30, mag: 8, min: 0, max: 15 },
                      { id: "f2", kind: "pull", label: "F₂", angleDeg: 150, mag: 8, min: 0, max: 15 }
                    ],
                    showResultant: true, surface: "horizontal", unit: "N",
                    badge: { invariant: "没变的是：分力的个数（两个）" }
                  }
                }
              ],
              point: "两个 10N 的力反向拉，合力是 0——合力可大可小，夹角说了算。"
            },
            {
              id: "p12.1.3-p2",
              kind: "explain",
              title: "平行四边形定则",
              blocks: [
                { type: "lead", text: "两个力合成：以它们为邻边作平行四边形，对角线就是合力——这就是矢量加法的几何规矩。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mrow><mo>|</mo><msub><mi>F</mi><mn>1</mn></msub><mo>−</mo><msub><mi>F</mi><mn>2</mn></msub><mo>|</mo><mo>≤</mo><mi>F</mi><mo>≤</mo><msub><mi>F</mi><mn>1</mn></msub><mo>+</mo><msub><mi>F</mi><mn>2</mn></msub></mrow></math>",
                    translation: "合力范围：两分力之差 ≤ 合力 ≤ 两分力之和"
                  },
                  conditions: ["两个分力", "共点力"],
                  counterexample: "三个力合成：范围要逐对分析，不能直接套",
                  dimension: "N = N ✓",
                  units: { si: "N" }
                },
                { type: "trap", text: "⚠️ 别搞混：合力一定比分力大——错。夹角决定：同向最大（相加），反向最小（相减，可到 0）。“1+1=2”式合成——错，矢量合成不是代数相加。" },
                { type: "mathlink", text: "数学呼应：几何 g06 平行四边形（奠基）；几何 g13 解析几何（坐标法，奠基）——矢量加法的几何底。" },
                { type: "slogan", text: "合力看夹角，不是 1+1=2。" }
              ],
              point: "平行四边形定则：合力可大可小——同向相加，反向相减。"
            },
            {
              id: "p12.1.3-p3",
              kind: "explain",
              title: "拔河与斜拉箱子",
              blocks: [
                { type: "lead", text: "拔河：两边都 500N，绳子中间的合力是 0——所以绳子不动。不是“力消失了”，是合力为零。" },
                { type: "text", html: "斜拉箱子：拉力斜向上——先画全箭头（拉力、重力、支持力、摩擦力），再合成。少画一个力，合力就错。箭头先行，永远是第一步。" },
                { type: "text", html: "多人拔河：多个力合成，先两两合成再继续——顺序不影响结果（矢量加法满足交换律）。" },
                { type: "slogan", text: "先画全箭头，再合成。" }
              ],
              point: "合力为零≠没有力——拔河两边 500N，绳子受力不小，只是合力为零。"
            }
          ]
        },
        {
          id: "p12.1.4",
          title: "力的分解与正交分解",
          prereq: "p12.1.3 力的合成",
          time: "40–60 分钟",
          formulas: {
            g1: {
              mathml: "<math><msub><mi>G</mi><mn>1</mn></msub><mo>=</mo><mi>G</mi><mi mathvariant=\"normal\">sin</mi><mi>θ</mi></math>",
              translation: "斜面下滑分力 = 重力 × sinθ"
            },
            g2: {
              mathml: "<math><msub><mi>G</mi><mn>2</mn></msub><mo>=</mo><mi>G</mi><mi mathvariant=\"normal\">cos</mi><mi>θ</mi></math>",
              translation: "垂直斜面分力 = 重力 × cosθ"
            }
          },
          pages: [
            {
              id: "p12.1.4-p1",
              kind: "interact",
              title: "斜面上的重力：一个变两个",
              exploreTip: "看斜面上的木块：G 竖直向下（大小方向不变），怎么“等效”成沿斜面和垂直斜面的两个效果？",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 55, size: 14, label: "木块" },
                    forces: [
                      { id: "g", kind: "gravity", label: "G", angleDeg: 270, mag: 10, fixed: true },
                      { id: "n", kind: "normal", label: "N", angleDeg: 60, mag: 8.7, fixed: true }
                    ],
                    showResultant: false, surface: "incline", inclineDeg: 30, unit: "N",
                    badge: { invariant: "没变的是：重力 G（大小方向都不变）" }
                  }
                }
              ],
              point: "斜面上：重力“等效”成下滑效果 + 压斜面效果——分力是等效替代。"
            },
            {
              id: "p12.1.4-p2",
              kind: "explain",
              title: "按效果分解：刀劈木柴",
              blocks: [
                { type: "lead", text: "刀劈木柴：一个向下的力，劈出两个向两边的分力——分力比合力还大，这就是楔子的威力。" },
                { type: "text", html: "斜面上重力分解：<span class=\"phy-f\" data-f=\"g1\"></span>（下滑效果）；<span class=\"phy-f\" data-f=\"g2\"></span>（压紧斜面效果）。θ 越大，下滑分力越大——盘山公路修得缓，就是减小 θ。" },
                { type: "trap", text: "⚠️ 别搞混：分力是真实存在的力——错！分力是“等效替代”，受力分析图上不画分力，只画真实的力（全书级规范）。" },
                { type: "trap", text: "⚠️ 别搞混：力的分解结果唯一——错。按效果分解不唯一；正交分解才是“规定动作”（下一页）。" },
                { type: "slogan", text: "分力是等效，不画分力图。" }
              ],
              point: "分力是等效替代：受力分析图上不画分力——只画真实存在的力。"
            },
            {
              id: "p12.1.4-p3",
              kind: "explain",
              title: "正交分解：建系→分解→列方程",
              blocks: [
                { type: "lead", text: "正交分解是“规定动作”：建坐标系 → 把每个力分解到 x、y 轴 → 分别列方程。三步，练成条件反射。" },
                { type: "text", html: "建系技巧：x 轴一般取加速度方向（或运动方向），这样一轴的方程最简单。“正交分解是规定，不是发现”——坐标系是我们选的，不是大自然给的。" },
                { type: "text", html: "分解用三角函数：邻边 cosθ、对边 sinθ——θ 是力与坐标轴的夹角，找对 θ 是关键。" },
                { type: "mathlink", text: "数学呼应：几何 g13 坐标系（奠基）；代数 8.3 三角初探（奠基）——sin/cos 分解，数学工具的物理还魂。" },
                { type: "slogan", text: "建系分解列方程，三步。" }
              ],
              point: "正交分解三步：建系→分解→列方程——x 轴取加速度方向最省事。"
            }
          ]
        }
      ]
    }
,
    {
      id: "p12.2",
      title: "牛顿运动定律",
      lessons: [
        {
          id: "p12.2.1",
          title: "牛顿第一定律（高中版）",
          prereq: "p05.2.1 回填；p12.1 相互作用",
          time: "40–60 分钟",
          pages: [
            {
              id: "p12.2.1-p1",
              kind: "interact",
              title: "高铁上能测出车在动吗？",
              exploreTip: "先猜：在匀速行驶的高铁上（窗帘拉上），做力学实验能判断车在动吗？",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "匀速行驶的高铁上（窗帘拉上），你能用力学实验判断车在动吗？",
                    options: ["能，感觉得到", "不能，牛顿定律照样成立", "看手机 GPS 才行"],
                    recordKey: "phy_guess_p12.2.1",
                    showAfter: "manual"
                  }
                }
              ],
              point: "匀速直线运动的车厢里，牛顿定律照样成立——这就是惯性系。"
            },
            {
              id: "p12.2.1-p2",
              kind: "explain",
              title: "第一定律：定义惯性系",
              blocks: [
                { type: "oldfriend", text: "认旧友：p05.2.1 斜面小车实验外推“无摩擦”；高中升级：第一定律定义“惯性系”——牛顿定律成立的“看台”。" },
                { type: "lead", text: "牛顿第一定律（惯性定律）：一切物体总保持静止或匀速直线运动，除非外力迫使它改变。" },
                { type: "text", html: "惯性：物体“懒”，不想改变运动状态；量度是质量——质量越大，惯性越大。惯性不是力！" },
                { type: "text", html: "惯性系（点到为止）：牛顿定律成立的参考系。地面、匀速高铁近似是；急刹车、转弯的车不是——里面定律会“失灵”。" },
                { type: "trap", text: "⚠️ 别搞混：“第一定律是第二定律 F=0 的特例”——错！第一定律定义惯性系（牛顿定律在哪儿成立），第二定律定量——两个独立定律。" },
                { type: "slogan", text: "第一定律定看台，第二定律定量。" }
              ],
              point: "第一定律定义“惯性系”——牛顿定律成立的“看台”。"
            }
          ]
        },
        {
          id: "p12.2.2",
          title: "牛顿第二定律",
          prereq: "p12.2.1 牛顿第一定律",
          time: "40–60 分钟",
          formulas: {
            ma: {
              mathml: "<math><mi>F</mi><mo>=</mo><mi>m</mi><mi>a</mi></math>",
              translation: "合外力 = 质量 × 加速度"
            }
          },
          pages: [
            {
              id: "p12.2.2-p1",
              kind: "interact",
              title: "a–F 图像：控制变量",
              exploreTip: "点“读斜率”：m 一定时，a–F 是过原点的直线——斜率 = 1/m。质量越大，线越平。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "function", expr: "a = 2*t", xLabel: "F/N", yLabel: "a/(m/s²)" },
                    steps: ["slope"], xRange: [0, 5],
                    badge: { invariant: "没变的是：物体的质量" }
                  }
                }
              ],
              point: "m 一定，a 与 F 成正比——控制变量，图像法，这是实验的结论。"
            },
            {
              id: "p12.2.2-p2",
              kind: "explain",
              title: "F=ma：因果律，不是乘法",
              blocks: [
                { type: "lead", text: "F=ma 是全书的心脏：力是改变运动状态的原因——F 是原因，a 是结果。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>F</mi><mo>=</mo><mi>m</mi><mi>a</mi></math>",
                    translation: "合外力 = 质量 × 加速度"
                  },
                  conditions: ["宏观物体", "低速（远小于光速）", "惯性系", "F 是合外力"],
                  counterexample: "电子绕原子核：微观高速，牛顿定律失效——量子力学登场（附录 C 留白）",
                  dimension: "N = kg·m/s² ✓",
                  units: { si: "N", note: "1 N = 1 kg·m/s²（N 的定义）" }
                },
                { type: "text", html: "三性口诀：矢量性（F 与 a 同向）；瞬时性（同时产生、同时消失、同时变化）；同一性（F、m、a 是同一物体的）。" },
                { type: "trap", text: "⚠️ 别搞混：先有加速度后有力——错。同时产生、同时消失——F 是 a 的原因，不是 a 先出场。F=ma 是“乘法口诀”——错，是因果律（审计清单第 6 条）。" },
                { type: "slogan", text: "力是原因，加速度是结果。" }
              ],
              point: "F=ma：矢量性、瞬时性、同一性——F 与 a 同时产生、同时消失。"
            },
            {
              id: "p12.2.2-p3",
              kind: "explain",
              title: "质量是惯性量度，N 的定义",
              blocks: [
                { type: "lead", text: "a–m 图像：F 一定时，m 越大 a 越小——质量是“懒”的量度，不是“阻力”。" },
                { type: "text", html: "单位制：1N = 1kg·m/s²——使 1kg 物体产生 1m/s² 加速度的力，就是 1N。估算锚点：托起两个鸡蛋约 1N；你的体重约 500N。" },
                { type: "trap", text: "⚠️ 别搞混：m 越大 a 越小，所以质量是“阻力”——错。质量是惯性量度：难改变运动状态，不是“挡路”。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 一次函数（奠基）——a–F 正比图像，斜率 = 1/m。" },
                { type: "slogan", text: "质量量惯性，1N 托两蛋。" }
              ],
              point: "质量是惯性量度不是阻力；1N = 1kg·m/s²——托起两个鸡蛋约 1N。"
            }
          ]
        },
        {
          id: "p12.2.3",
          title: "牛顿第三定律",
          prereq: "p12.2.2 牛顿第二定律",
          time: "40–60 分钟",
          pages: [
            {
              id: "p12.2.3-p1",
              kind: "interact",
              title: "马拉车：谁的力大？",
              exploreTip: "先猜：马拉车的力 vs 车拉马的力，谁大？答案可能跟你的直觉反着来——车的运动，看车的受力。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "马拉车：马拉车的力 vs 车拉马的力，谁大？",
                    options: ["马拉车的大", "车拉马的大", "一样大"],
                    recordKey: "phy_guess_p12.2.3",
                    showAfter: "manual"
                  }
                }
              ],
              point: "马拉车 vs 车拉马：一样大——车的运动，看车自己的受力。"
            },
            {
              id: "p12.2.3-p2",
              kind: "explain",
              title: "作用力与反作用力",
              blocks: [
                { type: "oldfriend", text: "认旧友：p05.2.3 二力平衡——平衡力作用在同一物体；今天这对力一人一个物体：马拉车（作用在车上），车拉马（作用在马上）。" },
                { type: "lead", text: "牛顿第三定律：作用力与反作用力——异体、等大、反向、共线、同性质、同时，六条一条不能少。" },
                { type: "text", html: "两弹簧秤对拉：示数恒等——你拉我 5N，我拉你也是 5N，同时生、同时灭。马拉车：马拉车的力 = 车拉马的力；车能不能走看车的受力：马拉车的力 vs 地面摩擦力——合力向前，车就走。" },
                { type: "trap", text: "⚠️ 别搞混：“作用力与反作用力抵消”——错！异体，不抵消。“马拉车力大所以车走”——错，一样大；车走因车受的合力向前。" },
                { type: "slogan", text: "异体等大反向，不抵消。" }
              ],
              point: "作用反作用：异体、等大、反向——作用在不同物体，不抵消；车走看车的合力。"
            }
          ]
        },
        {
          id: "p12.2.4",
          title: "超重失重与连接体",
          prereq: "p12.2.3 牛顿第三定律",
          time: "40–60 分钟",
          formulas: {
            sw: {
              mathml: "<math><mi>N</mi><mo>=</mo><mi>m</mi><mo>(</mo><mi>g</mi><mo>+</mo><mi>a</mi><mo>)</mo></math>",
              translation: "视重 = 质量 ×（g + 加速度）（超重，加速度向上）"
            }
          },
          pages: [
            {
              id: "p12.2.4-p1",
              kind: "interact",
              title: "电梯里：体重计的示数",
              exploreTip: "拖 N 箭头：N 变大 = 超重，N 变小 = 失重——G 可是纹丝不动。视重变的不是重力。",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 45, size: 15, label: "人" },
                    forces: [
                      { id: "g", kind: "gravity", label: "G", angleDeg: 270, mag: 10, fixed: true },
                      { id: "n", kind: "normal", label: "N", angleDeg: 90, mag: 10, min: 5, max: 15 }
                    ],
                    showResultant: true, surface: "horizontal", unit: "N",
                    badge: { invariant: "没变的是：人的重力 G" }
                  }
                }
              ],
              point: "超重失重变的都是 N（视重）——G 纹丝不动，重力没变。"
            },
            {
              id: "p12.2.4-p2",
              kind: "explain",
              title: "超重：视重变大，重力没变",
              blocks: [
                { type: "lead", text: "电梯加速上升，你“觉得”变重了——体重计示数变大。但地球拉你的力，一点没变。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>N</mi><mo>=</mo><mi>m</mi><mo>(</mo><mi>g</mi><mo>+</mo><mi>a</mi><mo>)</mo></math>",
                    translation: "视重 = 质量 ×（g + 加速度）（超重，加速度向上）"
                  },
                  conditions: ["加速度向上（超重）", "失重时 N=m(g−a)"],
                  counterexample: "完全失重（a=g 向下）：N=0——不是重力没了，是视重为零",
                  dimension: "N = kg·m/s² ✓",
                  units: { si: "N" }
                },
                { type: "text", html: "视重 vs 实重：视重 = 体重计的示数（N）；实重 = 重力 G（恒定）。a 向上 → 超重（N>G）；a 向下 → 失重（N<G）。" },
                { type: "trap", text: "⚠️ 别搞混：超重时重力变大——错。重力没变，变的是视重。电梯加速上升，你“觉得”重了，地球拉你还是那些力。" },
                { type: "slogan", text: "超重是视重，重力没变。" }
              ],
              point: "超重失重：变的是视重（N），重力 G 不变——a 向上超重，a 向下失重。"
            },
            {
              id: "p12.2.4-p3",
              kind: "explain",
              title: "整体法与隔离法",
              blocks: [
                { type: "lead", text: "两本书叠在一起被推——想求加速度，把两本看成“一本”（整体法）；想求书之间的摩擦力，把一本“隔离”出来（隔离法）。" },
                { type: "text", html: "整体法：系统加速度一致时，把系统看成一个整体，内力不用管——先求 a。隔离法：把要研究的物体单独拿出来画受力图——再求内力。等效替代思想：曹冲称象的老朋友（大象换石头，整体换单体）。" },
                { type: "trap", text: "⚠️ 别搞混：整体法“内部作用力不用管”无条件——错！系统加速度一致才可用整体法（条件！）。加速度不一样，各算各的。" },
                { type: "mathlink", text: "数学呼应：代数 ch01 方程组（奠基）——整体列一个方程，隔离再列一个，联立求解。" },
                { type: "slogan", text: "先整体求 a，再隔离求内力。" }
              ],
              point: "整体法限系统加速度一致；先整体求加速度，再隔离求内力——两步走。"
            }
          ]
        },
        {
          id: "p12.2.0",
          title: "章末小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          pages: [
            {
              id: "p12.2.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "<p>三种力：重力（G=mg，竖直向下）；弹力（F=kx，限弹性限度；绳只能拉）；摩擦力（静摩擦 0<f≤fmax 由平衡定；滑动摩擦 f=μN，限滑动；方向看相对运动趋势）。</p><p>矢量运算：平行四边形定则（合力可大可小）；正交分解三步（建系→分解→列方程）；分力是等效替代，受力图不画分力。</p><p>牛顿三定律：第一定律定义惯性系（独立定律，不是 F=0 的特例）；第二定律 F=ma（矢量性、瞬时性、同一性；宏观低速惯性系）；第三定律（异体等大反向，不抵消）。</p><p>超重失重：变的是视重，重力没变；整体法限系统加速度一致。</p>"
                }
              ],
              point: "本章一句话：受力分析 + 正交分解 + 牛顿第二定律列方程——高中力学的操作系统。"
            },
            {
              id: "p12.2.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "静摩擦力的大小——",
                  options: ["恒等于 μN", "由平衡条件定，≤μN", "等于正压力"],
                  answer: 1,
                  tip: "静摩擦 0<f≤fmax，由平衡条件定——μN 是上限，不是恒值。"
                },
                {
                  type: "choice",
                  stem: "关于牛顿第一定律，正确的是——",
                  options: ["它是 F=ma 在 F=0 时的特例", "它定义了惯性系，是独立定律", "它只适用于静止物体"],
                  answer: 1,
                  tip: "第一定律定义惯性系（定性），第二定律定量——两个独立定律。"
                },
                {
                  type: "choice",
                  stem: "马拉车加速前进，是因为——",
                  options: ["马拉车的力大于车拉马的力", "车受到的合外力向前（看车的受力）", "作用力与反作用力抵消了"],
                  answer: 1,
                  tip: "马拉车 = 车拉马（作用反作用）；车走是因为车受的合力向前——看车的受力。"
                },
                {
                  type: "choice",
                  stem: "电梯加速上升时——",
                  options: ["重力变大了", "视重变大，重力不变", "失重"],
                  answer: 1,
                  tip: "超重：视重变大，重力没变——a 向上超重，a 向下失重。"
                },
                {
                  type: "fill",
                  stemBefore: "滑动摩擦力 f=μN 只适用于",
                  stemAfter: "摩擦",
                  answer: "滑动",
                  accept: ["滑动摩擦"],
                  hint: "（两个字）",
                  tip: "f=μN 限滑动摩擦；静摩擦由平衡条件定，0<f≤fmax。"
                },
                {
                  type: "choice",
                  stem: "【估算】一个 60kg 的人站在电梯里，电梯以 2m/s² 加速上升，人对地板的压力约——（数量级对即满分）",
                  options: ["约 480N", "约 600N", "约 720N", "约 1200N"],
                  answer: 2,
                  tip: "依据链：N − mg = ma，N = 60×(10+2) = 720N——10² 量级。超重：视重比真重大。"
                }
              ],
              point: "p12 收官：受力分析 + 正交分解 + F=ma——后面所有章节的通用操作系统。"
            }
          ]
        }
      ]
    }
  ]
};
