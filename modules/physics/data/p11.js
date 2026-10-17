/* ============================================================
 * 学习工具箱 · 物理 · 第十一章数据（物理批 3，2026-10-15）
 * p11 运动的描述与匀变速直线运动：7 课 + 章末小结与习题 p11.2.0
 *
 * schema v1.0（见 p04.js 文件头冻结版）；组件 API 见 WIDGETS.md。
 * 内容分工：概念表述=物理专家队；教学流/话术=黄队。
 *
 * 本章红线兑现：
 * - 初中到高中的第一次“升级”：矢量化。位移/速度/加速度首次出现即标注矢量（A2）
 * - p11.2.1 矢量式先定正方向；代入公式必先处理方向
 * - 比值定义法四辨析：a=Δv/Δt 处设 trap，杜绝“比值即正反比”（p11.1.3）
 * - v–t 图像：图像≠轨迹（全书级易错）；面积=位移讲清“分割求和”过程（跃升 10）
 * - g≈9.8m/s²：矢量（方向竖直向下）；N/kg = m/s²；忽略空气阻力才同时落地
 * - 追及相遇：相遇是位移相等（矢量），不是路程相等
 * 缺口上报：位移有向线段绘制组件、P2 motion-sim 的 v–t 模式（图像+小车联动）、
 *   自由落体真空管组件、追及相遇双 v–t 曲线交点组件（暂用 Y1/Y4 载体）。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p11"] = {
  id: "p11",
  units: [
    {
      id: "p11.1",
      title: "运动的描述",
      lessons: [
        {
          id: "p11.1.1",
          title: "质点与参考系",
          prereq: "p05 力与运动",
          time: "40–60 分钟",
          pages: [
            {
              id: "p11.1.1-p1",
              kind: "interact",
              title: "地球能看作质点吗？",
              exploreTip: "先猜，再看对照表：能不能当质点，看问题，不看大小。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "地球公转（四季变化），地球能看作质点吗？",
                    options: ["能", "不能", "看心情"],
                    recordKey: "phy_guess_p11.1.1",
                    showAfter: "manual"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: { title: "能看作质点", rows: ["地球公转（看轨道）", "火车跑全程（看位置）"] },
                    right: { title: "不能看作质点", rows: ["地球自转（看昼夜）", "体操打分（看姿态）"] },
                    verdict: "能不能当质点，看问题，不看大小"
                  }
                }
              ],
              point: "质点是理想模型：有质量、无大小。"
            },
            {
              id: "p11.1.1-p2",
              kind: "explain",
              title: "模型边界：忽略了什么",
              blocks: [
                { type: "lead", text: "研究地球公转，地球大不大？大。但跟“日地距离”一比，它就是个点——这就是质点。" },
                { type: "text", html: "质点（理想模型）：有质量、无大小、无形状。模型三问：忽略了形状和大小；物体线度远小于研究尺度时用；研究转动、姿态时不能用。" },
                { type: "text", html: "参考系：描述运动要先选“看台”。同一辆车，站在路边看它向前跑，坐在车里看它静止——运动是相对的，先选参考系再谈运动。" },
                { type: "trap", text: "⚠️ 别搞混：小的物体就是质点——错。看研究问题：公转可、自转不可。大的物体也可以是质点。" },
                { type: "oldfriend", text: "认旧友：p02.1.1 光线——质点是“模型边界意识”的第一次正式亮相，用的还是那份模型说明书。" },
                { type: "slogan", text: "看问题，不看大小。" }
              ],
              point: "质点：忽略形状大小的理想模型；参考系：描述运动前先选“看台”。"
            }
          ]
        },
        {
          id: "p11.1.2",
          title: "位移与路程",
          prereq: "p11.1.1 质点与参考系",
          time: "40–60 分钟",
          pages: [
            {
              id: "p11.1.2-p1",
              kind: "interact",
              title: "跑一圈，位移是多少？",
              exploreTip: "先猜：小明绕 400m 操场跑了一圈——他“走了多远”，和“位移”是多少，是两回事。再拖红色终点手柄：看位移箭头和 Δx 读数。",
              widgets: [
                {
                  type: "displacement-arrow",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.KonvaView+Input */
                    engine: {
                      primitive: "KonvaView+Input", version: "2026.10.17.2",
                      params: { startFixed: [20,70], endInit: [68,34], unit: "格" }
                    },
                    
                    badge: { invariant: "没变的是：起点（变的是终点手柄→位移箭头与 Δx 读数）" }
                  }
                }
              ],
              point: "跑一圈回到起点：路程 400m，位移 0——起点和终点重合了。"
            },
            {
              id: "p11.1.2-p2",
              kind: "explain",
              title: "位移是矢量：箭头先行",
              blocks: [
                { type: "lead", text: "出租车计价按路程（走了多远），地图导航看位移（直线距离）——两个“距离”，两种算法。" },
                { type: "text", html: "位移（矢量）：从起点指向终点的有向线段——有方向，有大小。路程（标量）：走过的路径长度——只有大小。教学顺序：先看箭头指哪（方向）→ 再看箭头多长（大小）→ 最后看数字。" },
                { type: "trap", text: "⚠️ 别搞混：位移 = 路程——错。只有单向直线运动，两者才等大。位移的负号表示方向，不是“比零小”：−5m 的负号是说“箭头反了”。" },
                { type: "mathlink", text: "数学呼应：几何 g01 有向线段（奠基）——位移就是有向线段的物理还魂，箭头先行。" },
                { type: "slogan", text: "箭头先行，再看数字。" }
              ],
              point: "位移是矢量（有向线段），路程是标量——负号是方向，不是比零小。"
            },
            {
              id: "p11.1.2-p3",
              kind: "explain",
              title: "矢量 vs 标量对照表",
              blocks: [
                { type: "lead", text: "从这一课起，物理量分两大家族——见面先问：你是矢量还是标量？" },
                {
                  type: "widget",
                  widget: {
                    type: "side-compare",
                    params: {
                      left: { title: "位移（矢量）", rows: ["有向线段", "有方向，有大小", "可正可负（方向）"] },
                      right: { title: "路程（标量）", rows: ["路径长度", "只有大小", "恒为正"] },
                      verdict: "箭头先行：先看方向，再看数字"
                    }
                  }
                },
                { type: "text", html: "矢量家族本章扩员：位移、速度、加速度——全是矢量。运算规则：矢量不能直接代数相加减，要先处理方向（规定正方向 / 平行四边形定则 / 正交分解）。" },
                { type: "trap", text: "⚠️ 别搞混：矢量当标量代公式——禁令。凡代公式必先处理方向，这是审计清单第 2 条。" },
                { type: "slogan", text: "矢量先问方向。" }
              ],
              point: "位移、速度、加速度全是矢量——代公式前，先处理方向。"
            }
          ]
        },
        {
          id: "p11.1.3",
          title: "速度与加速度",
          prereq: "p11.1.2 位移与路程",
          time: "40–60 分钟",
          formulas: {
            v: {
              mathml: "<math><mi>v</mi><mo>=</mo><mfrac><mrow><mi>Δ</mi><mi>x</mi></mrow><mrow><mi>Δ</mi><mi>t</mi></mrow></mfrac></math>",
              translation: "速度 = 位移 ÷ 时间"
            },
            a: {
              mathml: "<math><mi>a</mi><mo>=</mo><mfrac><mrow><mi>Δ</mi><mi>v</mi></mrow><mrow><mi>Δ</mi><mi>t</mi></mrow></mfrac></math>",
              translation: "加速度 = 速度变化量 ÷ 时间"
            }
          },
          pages: [
            {
              id: "p11.1.3-p1",
              kind: "interact",
              title: "纸带点迹（示意数据）→ 读斜率",
              exploreTip: "点“读斜率”：v–t 图上直线的斜率，就是加速度——点越密，车越慢。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.PlotBoard */
                    engine: {
                      primitive: "PlotBoard", version: "2026.10.17.2",
                      params: { sourceKind: "points", note: "points-inline" }
                    },
                    
                    source: { kind: "points", points: [[0, 0], [1, 2], [2, 4], [3, 7], [4, 11], [5, 16]], xLabel: "t/s", yLabel: "v/(m/s)" },
                    steps: ["slope"],
                    badge: { invariant: "没变的是：坐标轴的物理意义（变的是直线的斜率→加速度读数）" }
                  }
                }
              ],
              point: "打点计时器的纸带画成 v–t 图：斜率 = 加速度——图像会说话。"
            },
            {
              id: "p11.1.3-p2",
              kind: "explain",
              title: "速度：多快；加速度：变多快",
              blocks: [
                { type: "lead", text: "百米冲刺：起跑时加速度大、途中速度大——“快”和“变快”是两回事。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>v</mi><mo>=</mo><mfrac><mrow><mi>Δ</mi><mi>x</mi></mrow><mrow><mi>Δ</mi><mi>t</mi></mrow></mfrac></math>",
                    translation: "速度 = 位移 ÷ 时间"
                  },
                  conditions: ["匀速直线运动：精确值；变速运动：平均速度"],
                  counterexample: "想知道某一时刻多快？平均速度不够——要“瞬时速度”（极限思想，代数 11.1 回填）",
                  dimension: "m/s = m ÷ s ✓",
                  units: { si: "m/s", common: "km/h", note: "1 m/s = 3.6 km/h" }
                },
                { type: "text", html: "速度（矢量）：方向就是运动方向。平均速度 = 总位移除以总时间；瞬时速度 = 某一时刻的速度（汽车仪表盘那个）。" },
                { type: "trap", text: "⚠️ 别搞混：速度大加速度一定大——错。高速匀速的飞机加速度是 0；起跑的运动员速度是 0、加速度很大。速度是“多快”，加速度是“变多快”。" },
                { type: "slogan", text: "速度是多快，加速度是变多快。" }
              ],
              point: "速度（矢量）：方向即运动方向；平均 vs 瞬时——仪表盘看的是瞬时。"
            },
            {
              id: "p11.1.3-p3",
              kind: "explain",
              title: "a=Δv/Δt：等号不代表因果",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>a</mi><mo>=</mo><mfrac><mrow><mi>Δ</mi><mi>v</mi></mrow><mrow><mi>Δ</mi><mi>t</mi></mrow></mfrac></math>",
                    translation: "加速度 = 速度变化量 ÷ 时间"
                  },
                  conditions: ["描述速度变化快慢的量", "矢量：方向与 Δv 相同"],
                  counterexample: "a 不是被 Δv、Δt“决定”的——它是描述“变化快慢”的量（比值定义）",
                  dimension: "m/s² = (m/s) ÷ s ✓",
                  units: { si: "m/s²" }
                },
                { type: "trap", text: "⚠️ 别搞混：a 与 Δv 成正比、与 Δt 成反比——错！等号不代表因果——比值定义的老规矩同样适用：a=Δv/Δt 是“量”加速度的方法；说“a 与 Δv 成正比”必须加上“Δt 不变时”。" },
                { type: "trap", text: "⚠️ 别搞混：加速度为负就是减速——错。看 a 与 v 是否同向：同向加速、反向减速。负号只是说 a 和规定的正方向反着。" },
                { type: "mathlink", text: "数学呼应：代数 11.1 导数（预告/回填）——瞬时速度即导数，学完导数回来认旧友。" },
                { type: "slogan", text: "同向加速，反向减速。" }
              ],
              point: "加速度是矢量：方向看 Δv；减速不看正负，看 a 与 v 是否反向。"
            }
          ]
        }
      ]
    },
    {
      id: "p11.2",
      title: "匀变速直线运动",
      lessons: [
        {
          id: "p11.2.1",
          title: "匀变速直线运动的规律",
          prereq: "p11.1.3 速度与加速度",
          time: "40–60 分钟",
          formulas: {
            vv: {
              mathml: "<math><mi>v</mi><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mo>+</mo><mi>a</mi><mi>t</mi></math>",
              translation: "末速度 = 初速度 + 加速度 × 时间"
            },
            xx: {
              mathml: "<math><mi>x</mi><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mi>t</mi><mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi><msup><mi>t</mi><mn>2</mn></msup></math>",
              translation: "位移 = 初速度×时间 + ½ × 加速度 × 时间平方"
            },
            v2: {
              mathml: "<math><msup><mi>v</mi><mn>2</mn></msup><mo>−</mo><msubsup><mi>v</mi><mn>0</mn><mn>2</mn></msubsup><mo>=</mo><mn>2</mn><mi>a</mi><mi>x</mi></math>",
              translation: "末速度平方 − 初速度平方 = 2 × 加速度 × 位移"
            }
          },
          pages: [
            {
              id: "p11.2.1-p1",
              kind: "interact",
              title: "公式互推：消去 t",
              exploreTip: "点“读面积”：v–t 图下的面积被切成细条，一条条“码”成位移——这是 x=v₀t+½at² 的来历。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.PlotBoard */
                    engine: {
                      primitive: "PlotBoard", version: "2026.10.17.2",
                      params: { sourceKind: "function", expr: "v = 2*t + 1" }
                    },
                    
                    source: { kind: "function", expr: "v = 2*t + 1", xLabel: "t/s", yLabel: "v/(m/s)" },
                    steps: ["area"], areaSlices: 40, xRange: [0, 5],
                    badge: { invariant: "没变的是：这条直线（匀加速）（变的是时间→面积→位移读数）" }
                  }
                }
              ],
              point: "面积不是“算”出来的，是细条“码”出来的——分割求和，下一课细讲。"
            },
            {
              id: "p11.2.1-p2",
              kind: "explain",
              title: "三个公式，先定正方向",
              blocks: [
                { type: "lead", html: "匀变速直线运动：加速度不变的直线运动。三个公式，一个比一个“省时间”：<span class=\"phy-f\" data-f=\"vv\"></span>；<span class=\"phy-f\" data-f=\"xx\"></span>；<span class=\"phy-f\" data-f=\"v2\"></span>（消去 t，刹车专用）。" },
                { type: "text", html: "三个全是矢量式！用法：先定正方向（一般取初速度方向为正），与正方向相反的量取负——a 取负，x 取负，都要先有“正方向”这个约定。" },
                { type: "trap", text: "⚠️ 别搞混：代入公式不看正负——禁令。先定正方向，反向取负。不先定方向就代数，等于闭眼开车（审计清单第 2 条）。" },
                { type: "mathlink", text: "数学呼应：代数 ch01/ch04 方程（奠基）——公式即方程组，已知三求二，列方程解。" },
                { type: "slogan", text: "先定正方向，再代公式。" }
              ],
              point: "三个公式全是矢量式：先定正方向——与正方向反的取负。"
            },
            {
              id: "p11.2.1-p3",
              kind: "explain",
              title: "刹车距离估算",
              blocks: [
                { type: "lead", html: "汽车 20m/s（72km/h）刹车，加速度 −5m/s²，多远停下？用 <span class=\"phy-f\" data-f=\"v2\"></span>：0 − 20² = 2×(−5)×x，x = 40m。" },
                { type: "text", html: "估算锚点：40m ≈ 10 辆车的长度——这就是“限速”的物理依据：速度翻倍，刹车距离翻 4 倍（x ∝ v²）。" },
                { type: "text", html: "选公式技巧：题目没给 t、也不求 t，用 v²−v₀²=2ax；给了 t，用 v=v₀+at 或 x=v₀t+½at²——“缺谁消谁”。" },
                { type: "slogan", text: "缺谁消谁，刹车用 v²。" }
              ],
              point: "速度翻倍，刹车距离翻 4 倍——x ∝ v²，这就是限速的物理依据。"
            }
          ]
        },
        {
          id: "p11.2.2",
          title: "v–t 图像",
          prereq: "p11.2.1 匀变速直线运动的规律",
          time: "40–60 分钟",
          pages: [
            {
              id: "p11.2.2-p1",
              kind: "interact",
              title: "读斜率：斜线有多陡？",
              exploreTip: "点“读斜率”：斜率数值 = 加速度——线越陡，加速度越大。先直觉，后严格。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.PlotBoard */
                    engine: {
                      primitive: "PlotBoard", version: "2026.10.17.2",
                      params: { sourceKind: "function", expr: "v = 2*t + 1" }
                    },
                    
                    source: { kind: "function", expr: "v = 2*t + 1", xLabel: "t/s", yLabel: "v/(m/s)" },
                    steps: ["slope"], xRange: [0, 5],
                    badge: { invariant: "没变的是：横纵轴的物理意义（变的是线的陡缓→加速度读数）" }
                  }
                }
              ],
              point: "斜率是加速度——v–t 图像的第一把钥匙。"
            },
            {
              id: "p11.2.2-p2",
              kind: "interact",
              title: "读面积：细条码成位移",
              exploreTip: "点“读面积”：看面积被切成 40 个细条，一条条“码”成位移——这就是“分割求和”的慢动作。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.PlotBoard */
                    engine: {
                      primitive: "PlotBoard", version: "2026.10.17.2",
                      params: { sourceKind: "function", expr: "v = 2*t + 1" }
                    },
                    
                    source: { kind: "function", expr: "v = 2*t + 1", xLabel: "t/s", yLabel: "v/(m/s)" },
                    steps: ["area"], areaSlices: 40, xRange: [0, 5],
                    badge: { invariant: "没变的是：分割求和的过程（变的是细条个数→面积和的逼近）" }
                  }
                }
              ],
              point: "面积不是“算”出来的，是细条“码”出来的——分割求和。"
            },
            {
              id: "p11.2.2-p3",
              kind: "explain",
              title: "图像是日记，不是轨迹",
              blocks: [
                { type: "lead", text: "这条斜线不是小车的“飞行路线”，是小车速度的“日记”——横轴是时间，不是路。" },
                { type: "text", html: "三读法（三把钥匙）：读斜率 → 加速度；读面积 → 位移（分割求和）；读截距 → 初速度（t=0 的速度）。" },
                { type: "trap", text: "⚠️ 别搞混：v–t 图像是运动轨迹——错！全书级易错。小车在直线上跑（轨迹是直线），v–t 图是斜线（图像是斜线）。心电图也不是心脏的样子——图像从不是实物。" },
                { type: "text", html: "图像词典（全书通用版式）：看到任何物理图像，先问三句——横轴是什么？纵轴是什么？斜率/面积/截距各代表什么？" },
                { type: "slogan", text: "图像是日记，不是轨迹。" }
              ],
              point: "图像不是轨迹，是日记：横轴写时间，纵轴写速度——记的是“每一刻有多快”。"
            },
            {
              id: "p11.2.2-p4",
              kind: "explain",
              title: "图像 vs 轨迹配对区分",
              blocks: [
                { type: "lead", text: "一对最容易搞混的双胞胎，摆在一起看清楚。" },
                {
                  type: "widget",
                  widget: {
                    type: "side-compare",
                    params: {
                      left: { title: "v–t 图像", rows: ["横轴是时间", "斜线表示加速", "是速度的日记"] },
                      right: { title: "运动轨迹", rows: ["画的是位置", "直线表示直走", "是走过的路线"] },
                      verdict: "一个记“多快”，一个记“在哪”——两回事"
                    }
                  }
                },
                { type: "text", html: "读截距：t=0 时图线交纵轴的值 = 初速度 v₀。以后 s–t、a–t、F–l、I–U 图像，全用今天这套“三读法”读。" },
                { type: "mathlink", text: "数学呼应：代数 11.1 斜率（导数，预告）；代数 12.1 面积（积分思想，预告）——v–t 图像是物理为微积分打的样板。" },
                { type: "slogan", text: "斜率面积截距，三把钥匙。" }
              ],
              point: "以后看到任何图像先问三句：横轴？纵轴？斜率/面积/截距各代表什么？"
            }
          ]
        },
        {
          id: "p11.2.3",
          title: "自由落体运动",
          prereq: "p11.2.2 v–t 图像",
          time: "40–60 分钟",
          formulas: {
            h: {
              mathml: "<math><mi>h</mi><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>g</mi><msup><mi>t</mi><mn>2</mn></msup></math>",
              translation: "下落高度 = ½ × 重力加速度 × 时间平方"
            },
            g: {
              mathml: "<math><mi>g</mi><mo>=</mo><mn>9.8</mn><mspace width=\"0.2em\"/><mi mathvariant=\"normal\">m/s²</mi></math>",
              translation: "重力加速度约为 9.8 米每二次方秒"
            }
          },
          pages: [
            {
              id: "p11.2.3-p1",
              kind: "interact",
              title: "羽毛和硬币，谁先落地？",
              exploreTip: "先猜：真空管里，羽毛和硬币同时下落——谁先落地？再切换“有空气/抽成真空”，点播放看谁先落地。关键在“真空”两个字。",
              widgets: [
                {
                  type: "vacuum-tube",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.Phenom.VacuumTube */
                    engine: {
                      primitive: "Phenom.VacuumTube", version: "2026.10.17.2",
                      params: { coinDurSec: 1.2, featherAirDurSec: 3.6 }
                    },
                    
                    badge: { invariant: "没变的是：管子、羽毛、硬币（变的是抽不抽真空→谁先落地）" }
                  }
                }
              ],
              point: "真空管里羽毛和硬币肩并肩——“重的先落地”只在有空气时成立。"
            },
            {
              id: "p11.2.3-p2",
              kind: "explain",
              title: "自由落体：理想模型",
              blocks: [
                { type: "lead", text: "自由落体：初速度为 0、只受重力的运动。现实中有吗？严格说没有——空气阻力总在。但它是极好的理想模型。" },
                { type: "text", html: "模型三问：忽略了空气阻力；重物下落、阻力可忽略时用；羽毛、纸片飘落时不能用（阻力不可忽略）。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>h</mi><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>g</mi><msup><mi>t</mi><mn>2</mn></msup></math>",
                    translation: "下落高度 = ½ × 重力加速度 × 时间平方"
                  },
                  conditions: ["初速度为 0", "忽略空气阻力", "取竖直向下为正方向"],
                  counterexample: "纸片飘落：空气阻力不可忽略，用它算出来全错",
                  dimension: "m = (m/s²)·s² ✓",
                  units: { si: "m" }
                },
                { type: "trap", text: "⚠️ 别搞混：重的先落地——错。忽略空气阻力才同时落地，有条件！（审计清单第 3 条）" },
                { type: "slogan", text: "真空管里，羽毛硬币肩并肩。" }
              ],
              point: "自由落体 = 初速度 0 + 只受重力 + 忽略空气阻力——理想模型，有条件。"
            },
            {
              id: "p11.2.3-p3",
              kind: "explain",
              title: "g：既是场强又是加速度",
              blocks: [
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>g</mi><mo>=</mo><mn>9.8</mn><mspace width=\"0.2em\"/><mi mathvariant=\"normal\">m/s²</mi></math>",
                    translation: "重力加速度约为 9.8 米每二次方秒"
                  },
                  conditions: ["地球表面附近", "方向竖直向下（矢量！）"],
                  counterexample: "月球上 g 只有约 1.6m/s²——“g 处处 9.8”是错的，随纬度/高度变化",
                  dimension: "m/s² = N/kg ✓（g 既是场强又是加速度）",
                  units: { si: "m/s²", common: "N/kg", note: "N/kg = m/s²，两种读法，一个物理量" }
                },
                { type: "trap", text: "⚠️ 别搞混：g 是“重力”——错。g 是重力加速度（矢量，方向竖直向下）；G=mg 里的 g 和自由落体的 g，是同一个 g 的两种读法。" },
                { type: "mathlink", text: "数学呼应：代数 7.1 二次函数（奠基）——h–t 图像是抛物线，h ∝ t²。" },
                { type: "slogan", text: "g 是矢量，方向竖直向下。" }
              ],
              point: "g≈9.8m/s² 是矢量（方向竖直向下）；N/kg = m/s²——场强与加速度，一个东西。"
            }
          ]
        },
        {
          id: "p11.2.4",
          title: "追及相遇",
          prereq: "p11.2.3 自由落体运动",
          time: "40–60 分钟",
          pages: [
            {
              id: "p11.2.4-p1",
              kind: "interact",
              title: "v–t 图像的交点",
              exploreTip: "先猜：甲乙两车 v–t 图像交于一点——交点表示相遇，还是速度相等？",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "甲乙两车的 v–t 图像交于一点，这个交点表示——",
                    options: ["两车相遇", "两车速度相等", "两车位移相等"],
                    recordKey: "phy_guess_p11.2.4",
                    showAfter: "manual"
                  }
                }
              ],
              point: "v–t 交点 = 速度相等——相遇要看“位移”，别看交点就喊相遇。"
            },
            {
              id: "p11.2.4-p2",
              kind: "explain",
              title: "相遇条件与追及临界",
              blocks: [
                { type: "lead", text: "相遇条件：同一时刻，到达同一位置。翻译成物理：两车的位移（从同一起点算）相等。" },
                { type: "text", html: "追及临界：后面快的追前面慢的——两车速度相等时，距离最近（或最远）。这是“能不能追上”的判决点：速度相等时还没追上，后面就追不上了。" },
                { type: "trap", text: "⚠️ 别搞混：追上时路程相等——错。是位移相等（矢量！）。v–t 图像的交点表示速度相等，不是相遇。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 一次函数（奠基）——v–t 图像的交点，就是联立方程的解。" },
                { type: "slogan", text: "相遇看位移，临界看速度相等。" }
              ],
              point: "相遇：同一时刻同一位置（位移相等）；追及临界：速度相等时距离取极值。"
            }
          ]
        },
        {
          id: "p11.2.0",
          title: "章末小结与习题",
          prereq: "全章",
          time: "40–60 分钟",
          formulas: {
            vv: {
              mathml: "<math><mi>v</mi><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mo>+</mo><mi>a</mi><mi>t</mi></math>",
              translation: "末速度 = 初速度 + 加速度 × 时间"
            },
            xx: {
              mathml: "<math><mi>x</mi><mo>=</mo><msub><mi>v</mi><mn>0</mn></msub><mi>t</mi><mo>+</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>a</mi><msup><mi>t</mi><mn>2</mn></msup></math>",
              translation: "位移 = 初速度×时间 + ½ × 加速度 × 时间平方"
            },
            v2: {
              mathml: "<math><msup><mi>v</mi><mn>2</mn></msup><mo>−</mo><msubsup><mi>v</mi><mn>0</mn><mn>2</mn></msubsup><mo>=</mo><mn>2</mn><mi>a</mi><mi>x</mi></math>",
              translation: "末速度平方 − 初速度平方 = 2 × 加速度 × 位移"
            }
          },
          pages: [
            {
              id: "p11.2.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "<p>矢量三剑客：位移、速度、加速度——全是矢量。箭头先行：先看方向，再看数字；负号是方向，不是比零小。</p><p>匀变速三公式：<span class=\"phy-f\" data-f=\"vv\"></span>；<span class=\"phy-f\" data-f=\"xx\"></span>；<span class=\"phy-f\" data-f=\"v2\"></span>——全是矢量式，先定正方向，反向取负。</p><p>v–t 三读法：斜率 = 加速度；面积 = 位移（分割求和）；截距 = 初速度。图像是日记，不是轨迹。</p><p>自由落体：初速度 0、只受重力、忽略空气阻力；g≈9.8m/s²（矢量，竖直向下；N/kg = m/s²）。追及相遇：相遇看位移相等，临界看速度相等。</p>"
                }
              ],
              point: "本章一句话：矢量化——先定正方向，再代公式；图像是日记，不是轨迹。"
            },
            {
              id: "p11.2.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "下列物理量中，属于矢量的是——",
                  options: ["路程", "时间", "位移"],
                  answer: 2,
                  tip: "位移是矢量（有向线段）；路程、时间是标量——箭头先行。"
                },
                {
                  type: "choice",
                  stem: "v–t 图像中，图线与 t 轴围成的“面积”表示——",
                  options: ["加速度", "位移", "初速度"],
                  answer: 1,
                  tip: "三读法：斜率 = 加速度，面积 = 位移（分割求和），截距 = 初速度。"
                },
                {
                  type: "choice",
                  stem: "关于 v–t 图像，错误的是——",
                  options: ["斜率表示加速度", "面积表示位移", "图像就是物体的运动轨迹"],
                  answer: 2,
                  tip: "全书级易错：图像是速度的日记，不是运动轨迹——横轴是时间，不是路。"
                },
                {
                  type: "fill",
                  stemBefore: "自由落体加速度 g 约为 ",
                  stemAfter: " m/s²",
                  answer: "9.8",
                  accept: ["9.80"],
                  hint: "（一位小数）",
                  tip: "g≈9.8m/s²，矢量，方向竖直向下；N/kg = m/s²。"
                },
                {
                  type: "choice",
                  stem: "加速度 a=−3m/s²，速度 v=5m/s，物体在做——",
                  options: ["加速运动", "减速运动", "匀速运动"],
                  answer: 1,
                  tip: "a 与 v 反向 → 减速。负号只是方向，不直接等于减速。"
                },
                {
                  type: "choice",
                  stem: "【估算】百米运动员约 10s 跑完 100m，全程平均速度约——（数量级对即满分）",
                  options: ["约 1m/s", "约 10m/s", "约 36m/s", "约 100m/s"],
                  answer: 1,
                  tip: "依据链：v = 100÷10 = 10m/s——10¹ 量级。记住这个锚点：人全力跑约 10m/s。"
                }
              ],
              point: "下一章认旧友：p12 相互作用与牛顿运动定律——高中物理的“操作系统”。"
            }
          ]
        }
      ]
    }
  ]
};
