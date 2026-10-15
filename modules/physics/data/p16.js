/* ============================================================
 * 学习工具箱 · 物理 · 第十六章数据（物理批5，2026-10-15）
 *
 * 章：p16 恒定电流、磁场与电磁感应（单元 p16.1/p16.2/p16.3）
 * 课：p16.1.1–p16.3.3 + p16.3.0 章末小结与习题（共 9 课 / 24 页）
 * Schema：冻结版 v1.0（见 p04.js 文件头）；组件 API 见 WIDGETS.md。
 *
 * 内容要点：
 * - 回填点兑现：p16.1.1（p08.2.3 欧姆定律条件再确认+电流微观本质）、
 *   p16.3.1（p10.1.4 初中"切割"→高中楞次定律）、
 *   p16.3.3（p10.1.5 发电机定量 E=nΔΦ/Δt；传感器并入应用）。
 * - P-M5：磁场操作性定义"能让小磁针转动的那片空间"，禁用"有劲的空间"。
 * - m3："左右撇子"梗回填（p16.2.1 学完左手定则后）。
 * - 公式身份证：F=BIl（限 B⊥I）、E=Blv（限 B、l、v 两两垂直）。
 * - 磁感应强度首次标注矢量；洛伦兹力永不做功；T=2πm/qB 与 v 无关。
 * - 安全：高频感应加热警示（p16.3.3）。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p16"] = {
  id: "p16",
  units: [
    {
      id: "p16.1",
      title: "恒定电流",
      lessons: [
        /* ================= p16.1.1 电流（高中深化，3 页）· 回填 p08.2.3 ================= */
        {
          id: "p16.1.1",
          title: "电流（高中深化）",
          prereq: "p08 电路；p03 分子动理论",
          time: "40–60 分钟",
          formulas: {
            I: {
              mathml: '<math><mi>I</mi><mo>=</mo><mfrac><mi>q</mi><mi>t</mi></mfrac></math>',
              translation: "电流 = 电荷量 ÷ 时间"
            },
            R: {
              mathml: '<math><mi>R</mi><mo>=</mo><mfrac><mrow><mi>&#961;</mi><mi>l</mi></mrow><mi>S</mi></mfrac></math>',
              translation: "电阻 = 电阻率×长度 ÷ 横截面积"
            }
          },
          pages: [
            {
              id: "p16.1.1-p1",
              kind: "interact",
              title: "灯亮，靠'口令'还是'士兵'？",
              exploreTip: "先猜：开关闭合，灯泡多久亮？看右表对答案。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "开关闭合，灯泡多久亮？",
                    options: ["电子跑到灯泡的时间", "几乎瞬间"],
                    recordKey: "phy_guess_p16.1.1",
                    showAfter: "manual"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: { title: "电子漂移（士兵）", rows: ["速度：mm/s", "电子的真实速度", "跑 1m 要十几天"] },
                    right: { title: "电场传播（口令）", rows: ["速度：近光速", "'口令'传到全电路", "全电路同时起步"] },
                    verdict: "灯瞬间亮：口令快，不是士兵快。"
                  }
                }
              ],
              point: "电子漂移 mm/s，电场近光速——灯亮靠“口令”。"
            },
            {
              id: "p16.1.1-p2",
              kind: "explain",
              title: "电流的微观本质",
              blocks: [
                { type: "lead", text: "第 1 页你猜了：灯亮是'口令'到了——现在给电流办'身份证'。" },
                { type: "text", html: "微观本质：金属里跑的是自由电子，漂移仅 mm/s；电场近光速建立，全电路电子同时起步。" },
                { type: "text", html: '电流 <span class="phy-f" data-f="I"></span>；电阻定律 <span class="phy-f" data-f="R"></span>：R 由材料 ρ、长度 l、横截面积 S 决定。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>R</mi><mo>=</mo><mfrac><mrow><mi>&#961;</mi><mi>l</mi></mrow><mi>S</mi></mfrac></math>',
                    translation: "电阻 = 电阻率×长度 ÷ 横截面积"
                  },
                  conditions: ["温度一定", "均匀导体"],
                  counterexample: "灯丝发热：ρ 随温度变，R 跟着变——小灯泡的 I–U 图像会弯",
                  dimension: "Ω = (Ω·m)·m/m² ✓",
                  units: { si: "Ω", note: "ρ 的单位是 Ω·m" }
                },
                { type: "trap", text: "⚠️ 别搞混：灯瞬间亮是电子跑得快——错！是电场近光速建立。" },
                { type: "mathlink", text: "数学呼应：代数 ch00 数量级——10⁻³ vs 10⁸，差 11 个数量级。" },
                { type: "oldfriend", text: "认旧友：p08.2.3 欧姆定律——补上'适用条件'和'微观本质'。" },
                { type: "slogan", text: "电流是队伍在走，不是士兵在跑。" }
              ],
              point: "欧姆定律限金属导体、纯电阻——见下页。"
            },
            {
              id: "p16.1.1-p3",
              kind: "explain",
              title: "欧姆定律：条件再确认",
              blocks: [
                { type: "lead", text: "R=ρl/S 告诉你 R 由谁定——现在回头给欧姆定律'验明正身'：它什么时候灵？" },
                { type: "text", html: "回填 p08.2.3：欧姆定律适用条件——金属导体、纯电阻。反例：小灯泡（灯丝热了 ρ 变，I–U 图像弯了）、二极管（单向导电）。" },
                { type: "text", html: "水流类比边界卡：管用——有电压才有电流、电阻大电流小；不管用——'用掉'的是能量不是电荷，电荷守恒（跃升 5 回填）。" },
                { type: "trap", text: "⚠️ 别搞混：R=ρl/S 说明 R 与 l 成正比——对，但 R 与 U、I 无关（ρ、l、S 定了，R 就定了）。" },
                { type: "oldfriend", text: "认旧友：p08.1.2 电流——水流类比是拐杖：每次用都问一句'它在哪儿不管用了'。" },
                { type: "slogan", text: "公式有条件，类比有边界。" }
              ],
              point: "欧姆定律限金属导体、纯电阻——条件再确认，回填 p08.2.3。"
            }
          ]
        },
        /* ================= p16.1.2 闭合电路欧姆定律（3 页） ================= */
        {
          id: "p16.1.2",
          title: "闭合电路欧姆定律",
          prereq: "p16.1.1 电流（高中版）",
          time: "40–60 分钟",
          formulas: {
            IE: {
              mathml: '<math><mi>I</mi><mo>=</mo><mfrac><mi>E</mi><mrow><mi>R</mi><mo>+</mo><mi>r</mi></mrow></mfrac></math>',
              translation: "电流 = 电动势 ÷（外电阻+内阻）"
            },
            UE: {
              mathml: '<math><mi>U</mi><mo>=</mo><mi>E</mi><mo>−</mo><mi>I</mi><mi>r</mi></math>',
              translation: "路端电压 = 电动势 − 电流×内阻"
            }
          },
          pages: [
            {
              id: "p16.1.2-p1",
              kind: "interact",
              title: "从 U–I 图像读出 E 和 r",
              exploreTip: "点'读斜率'：斜率 = −r；点'读截距'：纵截距 = E——电源的'脾气'写在图上。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "points", points: [[0, 3.0], [0.1, 2.9], [0.2, 2.8], [0.3, 2.7], [0.4, 2.6], [0.5, 2.5]], xLabel: "I/A", yLabel: "U/V" },
                    steps: ["slope", "intercept"],
                    badge: { invariant: "没变的是：E、r（电源的脾气）" }
                  }
                }
              ],
              point: "U–I 图像是直线：纵截距=E，斜率=−r——测 E、r 就靠它。"
            },
            {
              id: "p16.1.2-p2",
              kind: "explain",
              title: "闭合电路欧姆定律",
              blocks: [
                { type: "lead", text: "第 1 页你从图上'读'出了 E 和 r——现在看公式怎么说同一件事。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>I</mi><mo>=</mo><mfrac><mi>E</mi><mrow><mi>R</mi><mo>+</mo><mi>r</mi></mrow></mfrac></math>',
                    translation: "电流 = 电动势 ÷（外电阻+内阻）"
                  },
                  conditions: ["纯电阻电路"],
                  counterexample: "含电动机：电能→机械能，这套算法失效",
                  dimension: "A = V/Ω ✓",
                  units: { si: "A", note: "E 单位 V，r 单位 Ω" }
                },
                { type: "text", html: '路端电压 <span class="phy-f" data-f="UE"></span>：外电路断开（I=0）时，U=E——电压表直接接电源，测的就是电动势！' },
                { type: "trap", text: "⚠️ 别搞混：外电路断开时路端电压为零——错！=E；E、r 会随使用'变小'——理想化认为不变（模型边界）。" },
                { type: "oldfriend", text: "认旧友：p08.2.3 欧姆定律——部分电路 I=U/R，今天升级成全电路 I=E/(R+r)。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 一次函数（奠基）——U–I 图像斜率=−r、截距=E（呼应点 15）。" },
                { type: "slogan", text: "断路电压等于 E。" }
              ],
              point: "I=E/(R+r)：电源也有内阻 r——'理想电源'是模型。"
            },
            {
              id: "p16.1.2-p3",
              kind: "explain",
              title: "电源用久了为什么'虚'",
              blocks: [
                { type: "lead", text: "手机电池越用越'虚'：满格电，一玩游戏就掉电——内阻 r 在作怪。" },
                { type: "text", html: "U=E−Ir：电流 I 一大，内阻分走的电压 Ir 就大，路端电压 U 就低。旧电池 r 变大——'虚电'的真相：不是 E 没了，是 r 大了。" },
                { type: "text", html: "生活例：汽车打不着火（起动机电流大，旧电瓶内阻大，电压被拉垮）；实验例：第 1 页的 U–I 图——r 越大，直线越陡；反例：'E、r 会变小'——理想化认为不变，但真实电池会老化（模型边界）。" },
                { type: "trap", text: "⚠️ 别搞混：电源没电=电动势没了——不完全！多半是内阻变大了；内阻越小越好——对，但零内阻是理想模型。" },
                { type: "slogan", text: "电池变'虚'，多半是 r 变大。" }
              ],
              point: "U=E−Ir：电流越大，内阻吃掉的电压越多。"
            }
          ]
        }
      ]
    },
    {
      id: "p16.2",
      title: "磁场",
      lessons: [
        /* ================= p16.2.1 磁场与安培力（3 页）· P-M5 + m3 梗 ================= */
        {
          id: "p16.2.1",
          title: "磁场与安培力",
          prereq: "p10 电与磁",
          time: "40–60 分钟",
          formulas: {
            B: {
              mathml: '<math><mi>B</mi><mo>=</mo><mfrac><mi>F</mi><mrow><mi>I</mi><mi>l</mi></mrow></mfrac></math>',
              translation: "磁感应强度 = 安培力 ÷（电流×导线长）"
            }
          },
          pages: [
            {
              id: "p16.2.1-p1",
              kind: "interact",
              title: "小磁针：磁场的'试吃员'",
              exploreTip: "拖磁铁转一圈：看 8 个小磁针的 N 极怎么跟。再点'撒铁屑'，看排出的'地图'。",
              widgets: [
                {
                  type: "field-viz",
                  params: {
                    mode: "bfield",
                    magnet: { x: 50, y: 50, angle: 0 },
                    needleCount: 8,
                    showFieldLines: true,
                    ironFilings: true,
                    badge: { invariant: "没变的是：磁铁的磁性" }
                  }
                }
              ],
              point: "N 极指的方向=该点磁场方向；磁感线外部 N→S、内部 S→N。"
            },
            {
              id: "p16.2.1-p2",
              kind: "explain",
              title: "磁场：能让小磁针转动的空间",
              blocks: [
                { type: "lead", text: "第 1 页的'试吃员'尝出了方向——现在给磁场'定级'：多强？" },
                { type: "text", html: "磁场是磁铁（或电流）周围'能让小磁针转动'的空间——一种特殊物质，看不见，小磁针能'尝'出来。" },
                { type: "text", html: '磁感应强度（矢量）：<span class="phy-f" data-f="B"></span>——描述磁场强弱和方向。方向：小磁针静止时 N 极的指向。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>B</mi><mo>=</mo><mfrac><mi>F</mi><mrow><mi>I</mi><mi>l</mi></mrow></mfrac></math>',
                    translation: "磁感应强度 = 安培力 ÷（电流×导线长）"
                  },
                  conditions: ["B⊥I（导线与磁场垂直）", "匀强磁场（或导线足够短）"],
                  counterexample: "导线与 B 斜交：F=BIl sinθ，用 BIl 会算大",
                  dimension: "T = N/(A·m) ✓",
                  units: { si: "T（特斯拉）", note: "1T=1N/(A·m)" }
                },
                { type: "trap", text: "⚠️ 别搞混：F=BIl 无条件用——错！限 B⊥I；磁感线'从 N 到 S'——错！外部 N→S、内部 S→N，是闭合曲线。" },
                { type: "oldfriend", text: "认旧友：p10.1.1 磁场——初中只认'小磁针会转'，补上 B 的定义。" },
                { type: "slogan", text: "磁场是物质。" }
              ],
              point: "B=F/(Il) 限 B⊥I——用小磁针'尝'，不用'劲'想。"
            },
            {
              id: "p16.2.1-p3",
              kind: "explain",
              title: "左手定则：左撇子管受力",
              blocks: [
                { type: "lead", text: "B 会量了，现在问：通电导线在磁场里，往哪儿受力？请出左手。" },
                { type: "text", html: "左手定则：伸开左手——磁感线穿手心（B），四指指电流（I），大拇指指受力（F）。必须动手比划，不能只看图！" },
                { type: "text", html: "“左右撇子”梗：受力用左手——左撇子管受力；电流的磁场用右手（安培定则）——右撇子管磁场。两只手别打架！" },
                { type: "text", html: "生活例：电动机线圈（安培力让它转）；反例：平行于磁场的电流不受力（θ=0，F=0）。" },
                { type: "trap", text: "⚠️ 别搞混：左手定则判断磁场方向——错！左手管受力；电流反向受力不变——错！F 反向。" },
                { type: "oldfriend", text: "认旧友：p10.1.3 电动机——'通电就转'，靠的就是安培力；左手定则是它的'使用说明书'。" },
                { type: "slogan", text: "左手管受力，右手管磁场。" }
              ],
              point: "左手定则：B 穿手心、I 指四指、F 看拇指——动手比划！"
            }
          ]
        },
        /* ================= p16.2.2 洛伦兹力（2 页） ================= */
        {
          id: "p16.2.2",
          title: "洛伦兹力",
          prereq: "p16.2.1 磁场与安培力",
          time: "40–60 分钟",
          formulas: {
            f: {
              mathml: '<math><mi>f</mi><mo>=</mo><mi>q</mi><mi>v</mi><mi>B</mi></math>',
              translation: "洛伦兹力 = 电荷量×速度×磁感应强度"
            }
          },
          pages: [
            {
              id: "p16.2.2-p1",
              kind: "interact",
              title: "电子转圈：洛伦兹力秀",
              exploreTip: "电子束在磁场里转圈：把'向心力箭头'读成洛伦兹力——它永远指向圆心，跟速度垂直。",
              widgets: [
                {
                  type: "motion-sim",
                  params: {
                    mode: "circle",
                    omega: { min: 1, max: 10, step: 1, init: 4 },
                    showReadouts: true,
                    badge: { invariant: "没变的是：电子的 q、m" }
                  }
                }
              ],
              point: "洛伦兹力永不做功：f⊥v，只改方向不改速率——越转越快？不！"
            },
            {
              id: "p16.2.2-p2",
              kind: "explain",
              title: "洛伦兹力永不做功",
              blocks: [
                { type: "lead", text: "第 1 页电子转圈：箭头永远指向圆心、跟速度垂直。" },
                { type: "text", html: '洛伦兹力：磁场对运动电荷的作用力<span class="phy-f" data-f="f"></span>。方向：左手定则（四指：正电荷顺 v，负电荷逆 v）。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>f</mi><mo>=</mo><mi>q</mi><mi>v</mi><mi>B</mi></math>',
                    translation: "洛伦兹力 = 电荷量×速度×磁感应强度"
                  },
                  conditions: ["v⊥B（速度与磁场垂直）", "电荷在运动（v≠0）"],
                  counterexample: "电荷静止：v=0，f=0——磁场对静止电荷'视而不见'",
                  dimension: "N = C·(m/s)·T ✓",
                  units: { si: "N", note: "v⊥B 时成立" }
                },
                { type: "text", html: "永不做功：f⊥v，力与位移永远垂直——只改变速度方向，不改变速率。" },
                { type: "trap", text: "⚠️ 别搞混：洛伦兹力做功——错！永不做功；正负电荷受力方向相同——错！电荷正负反向。" },
                { type: "oldfriend", text: "认旧友：p16.2.1 安培力——是洛伦兹力的宏观表现（一群电荷的力加起来）。" },
                { type: "slogan", text: "洛伦兹力永不做功。" }
              ],
              point: "f=qvB（限 v⊥B）：磁场只'管'运动的电荷，静止的不管。"
            }
          ]
        },
        /* ================= p16.2.3 带电粒子在匀强磁场中的运动（3 页） ================= */
        {
          id: "p16.2.3",
          title: "带电粒子在匀强磁场中的运动",
          prereq: "p16.2.2 洛伦兹力；p13.2.2 向心力",
          time: "40–60 分钟",
          formulas: {
            r: {
              mathml: '<math><mi>r</mi><mo>=</mo><mfrac><mrow><mi>m</mi><mi>v</mi></mrow><mrow><mi>q</mi><mi>B</mi></mrow></mfrac></math>',
              translation: "圆周半径 = mv ÷ qB"
            },
            T: {
              mathml: '<math><mi>T</mi><mo>=</mo><mfrac><mrow><mn>2</mn><mi>&#960;</mi><mi>m</mi></mrow><mrow><mi>q</mi><mi>B</mi></mrow></mfrac></math>',
              translation: "周期 = 2πm ÷ qB（与 v 无关）"
            }
          },
          pages: [
            {
              id: "p16.2.3-p1",
              kind: "interact",
              title: "速度翻倍，圆圈变多大？",
              exploreTip: "v 翻倍，r 跟着翻倍（r=mv/qB）——点'读斜率'：斜率 = m/qB。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "function", expr: "r = 2*t", xLabel: "v", yLabel: "r" },
                    xRange: [0, 5],
                    steps: ["slope"],
                    badge: { invariant: "没变的是：m、q、B（斜率的'配方'）" }
                  }
                }
              ],
              point: "r=mv/qB：v 越大圈越大；T=2πm/qB：周期与 v 无关！提醒：r=mv/qB、T=2πm/qB 有三个前提——垂直射入、匀强磁场、忽略重力；斜着射进去，轨迹就不是圆了（第 2 页细讲）。"
            },
            {
              id: "p16.2.3-p2",
              kind: "explain",
              title: "半径看速度，周期不看",
              blocks: [
                { type: "lead", text: "第 1 页的直线：速度翻倍，半径跟着翻倍——但周期有个反直觉的结论。" },
                { type: "trap", text: "这里只算洛伦兹力、忽略了重力——电子太轻，重力比起洛伦兹力可忽略；算重离子、宏观带电粒子时，重力得请回来。" },
                { type: "text", html: "电子垂直射入匀强磁场：洛伦兹力提供向心力，做匀速圆周运动。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>r</mi><mo>=</mo><mfrac><mrow><mi>m</mi><mi>v</mi></mrow><mrow><mi>q</mi><mi>B</mi></mrow></mfrac></math>',
                    translation: "圆周半径 = mv ÷ qB"
                  },
                  conditions: ["v⊥B（垂直射入）", "匀强磁场", "不计重力"],
                  counterexample: "斜射入：轨迹是螺旋线，不是圆",
                  dimension: "m = (kg·m/s)/(C·T) ✓",
                  units: { si: "m", note: "v⊥B 时成立" }
                },
                { type: "text", html: '周期<span class="phy-f" data-f="T"></span>——与 v 无关！v 大 r 跟着大，路长了，时间一样。这是质谱仪、回旋加速器的原理。' },
                { type: "trap", text: "⚠️ 别搞混：周期与速度有关——错！T=2πm/qB，无关；粒子'沿磁感线运动'——错！垂直射入才做圆周。" },
                { type: "oldfriend", text: "认旧友：p13.2.2 向心力——今天'导演'换成洛伦兹力。" },
                { type: "mathlink", text: "数学呼应：几何 g07 圆；代数 7.2——r–v 正比、r–B 反比。" },
                { type: "slogan", text: "半径看速度，周期与速度无关。" }
              ],
              point: "r=mv/qB，T=2πm/qB——v 大了圈大，但转一圈时间一样。"
            },
            {
              id: "p16.2.3-p3",
              kind: "explain",
              title: "质谱仪：给粒子'称体重'",
              blocks: [
                { type: "lead", text: "r=mv/qB 会背了，现在看它'上班'：质谱仪用磁场给粒子称'体重'（质量）。" },
                { type: "trap", text: "这页的\"称体重\"\"共振加速\"，前提跟第 2 页一样：只算洛伦兹力、忽略重力——粒子轻、速度快，重力忽略不计。" },
                { type: "text", html: "质谱仪：粒子加速后垂直射入磁场，r=mv/qB——q 相同、v 相同，m 越大 r 越大。打在底片上的位置不同，质量就'现形'了。" },
                { type: "text", html: "回旋加速器：T 与 v 无关——粒子越转越快，但转一圈的时间不变，交变电压总能'踩准点'加速。这就是'共振加速'。" },
                { type: "text", html: "生活例：极光——太阳风粒子被地磁场'拐弯'，在两极撞大气发光；反例：速度选择器——只有特定 v 的粒子能直穿（电场力=洛伦兹力），不是'什么都过'。" },
                { type: "trap", text: "⚠️ 别搞混：质谱仪测的是电荷——错！测的是比荷 q/m（r 还跟 v 有关，得先加速到同 v）。" },
                { type: "slogan", text: "磁场是粒子的'体重秤'。" }
              ],
              point: "质谱仪（r 定质量）、回旋加速器（T 与 v 无关）——公式在上班。"
            }
          ]
        }
      ]
    },
    {
      id: "p16.3",
      title: "电磁感应",
      lessons: [
        /* ================= p16.3.1 楞次定律（3 页）· 回填 p10.1.4 ================= */
        {
          id: "p16.3.1",
          title: "楞次定律",
          prereq: "p10.1.4 电磁感应",
          time: "40–60 分钟",
          pages: [
            {
              id: "p16.3.1-p1",
              kind: "interact",
              title: "磁铁进出：磁通量增还是减？",
              exploreTip: "先看磁力线，再拖磁铁进出线圈：Φ 是'增'还是'减'，电流方向就'反'还是'同'。先猜再看。",
              widgets: [
                {
                  type: "field-viz",
                  params: {
                    mode: "bfield",
                    magnet: { x: 50, y: 70, angle: 0 },
                    needleCount: 8,
                    showFieldLines: true,
                    badge: { invariant: "没变的是：磁铁的磁性" }
                  }
                },
                {
                  type: "em-induction",
                  params: {
                    pole: "N",
                    badge: { invariant: "没变的是：线圈" }
                  }
                }
              ],
              point: "楞次定律第一步：先看 Φ 是'增'还是'减'——'反'/'同'的依据。"
            },
            {
              id: "p16.3.1-p2",
              kind: "explain",
              title: "'增反减同'三步走",
              blocks: [
                { type: "lead", text: "第 1 页你判断了 Φ 增减——现在走完'增反减同'三步，口诀不用背。" },
                { type: "text", html: "楞次定律：感应电流的磁场，总要阻碍原磁通量的变化——'增反减同'：Φ 增→感应磁场反向；Φ 减→同向。" },
                { type: "text", html: "三步走：① Φ 增还是减？② 感应磁场'反'还是'同'？③ 安培定则定电流方向（右手：拇指指感应磁场，四指弯曲指电流）。" },
                { type: "text", html: "回填 p10.1.4：初中只认'切割'——高中严格化：感应电流的条件是磁通量变化！磁铁插在线圈里不动，再强也没电流。" },
                { type: "trap", text: "⚠️ 别搞混：磁通量大就有感应电流——错！要变化；'阻碍'即'阻止'——错！阻碍≠阻止。" },
                { type: "oldfriend", text: "认旧友：p10.1.4——初中'切割'定性，今天升级'增反减同'。" },
                { type: "slogan", text: "增反减同，阻碍变化。" }
              ],
              point: "楞次定律别背咒语，走三步：增减？反同？电流往哪流？"
            },
            {
              id: "p16.3.1-p3",
              kind: "explain",
              title: "右手定则：切割专用版",
              blocks: [
                { type: "lead", text: "'增反减同'是通用版——导体棒切割磁感线，有更顺手的'右手定则'。" },
                { type: "text", html: "右手定则：伸开右手——磁感线穿手心（B），拇指指运动方向（v），四指指感应电流（I）。注意：这是右手！（左撇子管受力，右撇子管'生电'。）" },
                { type: "text", html: "四种情况走三步：N 极插入→Φ 增→感应磁场反（向上）→电流俯视逆时针；N 极拔出→Φ 减→感应磁场同（向下）→电流俯视顺时针。S 极的两种情况，自己走一遍。" },
                { type: "trap", text: "⚠️ 别搞混：右手定则判断安培力——错！右手管'生电'（感应电流），左手管受力；感应电流的磁场'帮助'变化——错！是'阻碍'。" },
                { type: "oldfriend", text: "认旧友：p16.2.1 左手定则——左手管受力，右手管生电，两只手分工明确。" },
                { type: "slogan", text: "切割用右手，增减定反同。" }
              ],
              point: "右手定则是楞次定律的'快捷键'——只限切割场景。"
            }
          ]
        },
        /* ================= p16.3.2 法拉第电磁感应定律（3 页） ================= */
        {
          id: "p16.3.2",
          title: "法拉第电磁感应定律",
          prereq: "p16.3.1 楞次定律",
          time: "40–60 分钟",
          formulas: {
            E: {
              mathml: '<math><mi>E</mi><mo>=</mo><mi>n</mi><mfrac><mrow><mi>&#916;</mi><mi>&#934;</mi></mrow><mrow><mi>&#916;</mi><mi>t</mi></mrow></mfrac></math>',
              translation: "感应电动势 = 匝数×磁通量变化率"
            },
            Blv: {
              mathml: '<math><mi>E</mi><mo>=</mo><mi>B</mi><mi>l</mi><mi>v</mi></math>',
              translation: "切割电动势 = 磁感应强度×导线长×速度"
            }
          },
          pages: [
            {
              id: "p16.3.2-p1",
              kind: "interact",
              title: "变得越快，电动势越大？",
              exploreTip: "ΔΦ/Δt 翻倍，E 跟着翻倍——点'读斜率'：斜率 = 线圈匝数 n。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "function", expr: "E = 2*t", xLabel: "ΔΦ/Δt", yLabel: "E" },
                    xRange: [0, 5],
                    steps: ["slope"],
                    badge: { invariant: "没变的是：线圈匝数 n" }
                  }
                }
              ],
              point: "E 看变化率不看变化量：变得快，电动势才大——导数思想的回声。"
            },
            {
              id: "p16.3.2-p2",
              kind: "explain",
              title: "感应电动势看变化率",
              blocks: [
                { type: "lead", text: "第 1 页的直线：感应电动势跟'变得有多快'成正比——现在办身份证。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>E</mi><mo>=</mo><mi>n</mi><mfrac><mrow><mi>&#916;</mi><mi>&#934;</mi></mrow><mrow><mi>&#916;</mi><mi>t</mi></mrow></mfrac></math>',
                    translation: "感应电动势 = 匝数×磁通量变化率"
                  },
                  conditions: ["Δt 内的平均电动势（瞬时值需取极限）"],
                  counterexample: "ΔΦ 很大但变得慢：E 很小——看变化率，不是变化量",
                  dimension: "V = Wb/s ✓",
                  units: { si: "V", note: "Φ 的单位是 Wb（韦伯）" }
                },
                { type: "text", html: '切割公式 <span class="phy-f" data-f="Blv"></span>：限 B、l、v 两两垂直——导体棒切割磁感线专用版。' },
                { type: "trap", text: "⚠️ 别搞混：ΔΦ 大则 E 大——错！看变化率；E=Blv 无条件——错！限 B、l、v 两两垂直。" },
                { type: "oldfriend", text: "认旧友：p16.3.1 楞次定律——楞次定方向，法拉第定大小。" },
                { type: "mathlink", text: "数学呼应：代数 11.1 变化率（奠基）——E ∝ ΔΦ/Δt，导数思想（呼应点 25）。" },
                { type: "slogan", text: "感应电动势看变化率。" }
              ],
              point: "E=nΔΦ/Δt：楞次定方向，法拉第定大小——分工明确。"
            },
            {
              id: "p16.3.2-p3",
              kind: "explain",
              title: "手摇电筒：摇快更亮",
              blocks: [
                { type: "lead", text: "手摇发电手电筒：摇得越快越亮——E=nΔΦ/Δt 的日常版。" },
                { type: "text", html: "摇得快→线圈里磁通量变得快（ΔΦ/Δt 大）→E 大→灯亮。摇得慢→E 小→灯暗。'越快越亮'不是玄学，是变化率。" },
                { type: "text", html: "生活例：自行车'摩擦发电'车灯（轮子转得快灯亮）；实验例：第 1 页的 E–ΔΦ/Δt 直线——斜率 n 是线圈的'本事'；反例：匀速摇但线圈不动——ΔΦ=0，E=0，再用力也白摇。" },
                { type: "trap", text: "⚠️ 别搞混：E 的大小看 ΔΦ——错！看 ΔΦ/Δt；匝数 n 越多 E 越小——错！E=nΔΦ/Δt，n 越多 E 越大。" },
                { type: "slogan", text: "摇得快，变得快，电动势大。" }
              ],
              point: "手摇电筒：摇得越快，ΔΦ/Δt 越大，灯越亮。"
            }
          ]
        },
        /* ================= p16.3.3 电磁感应综合应用（2 页）· 回填 p10.1.5 ================= */
        {
          id: "p16.3.3",
          title: "电磁感应综合应用",
          prereq: "p16.3.2 法拉第定律",
          time: "40–60 分钟",
          formulas: {
            E: {
              mathml: '<math><mi>E</mi><mo>=</mo><mi>n</mi><mfrac><mrow><mi>&#916;</mi><mi>&#934;</mi></mrow><mrow><mi>&#916;</mi><mi>t</mi></mrow></mfrac></math>',
              translation: "感应电动势 = 匝数×磁通量变化率"
            }
          },
          pages: [
            {
              id: "p16.3.3-p1",
              kind: "interact",
              title: "磁铁穿铜管：下落变慢？",
              exploreTip: "先猜：磁铁穿过铜管，下落变慢还是变快？再看涡流的'两面'。",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "磁铁穿过铜管，下落会？",
                    options: ["变慢（涡流阻尼）", "变快", "不变"],
                    recordKey: "phy_guess_p16.3.3",
                    showAfter: "manual"
                  }
                },
                {
                  type: "side-compare",
                  params: {
                    left: { title: "涡流有用", rows: ["感应炉加热", "电磁阻尼（磁铁穿铜管缓降）"] },
                    right: { title: "涡流有害", rows: ["变压器铁芯发热", "对策：硅钢片"] },
                    verdict: "涡流没有好坏，看用在哪——但高频感应加热⚠别碰！"
                  }
                }
              ],
              point: "涡流：有利（感应炉）有害（铁芯发热）。"
            },
            {
              id: "p16.3.3-p2",
              kind: "explain",
              title: "发电机：从定性到定量",
              blocks: [
                { type: "lead", text: "第 1 页你猜了涡流——现在把发电机的账算清楚：从'转了就来电'到 E=nΔΦ/Δt。" },
                { type: "text", html: '回填 p10.1.5：初中只认"机械能→电能"——高中定量：<span class="phy-f" data-f="E"></span>。转得越快（ΔΦ/Δt 大），灯越亮。' },
                { type: "text", html: "发电机没'创造'电能：能量守恒。再辨析双胞胎：电动机（电→机械，左手）；发电机（机械→电，楞次）——原理是反的。" },
                { type: "text", html: "传感器（并入应用）：话筒、磁卡都是'磁通量变化→电信号'。安全：⚠ 高频感应加热现实中由专业人员操作，保持距离——虚拟里随便玩，现实中绝不试！" },
                { type: "trap", text: "⚠️ 别搞混：发电机'创造'了电能——错！机械能转化；涡流总是有害——错！感应炉靠它加热。" },
                { type: "slogan", text: "转了就来电，摇快更亮。" }
              ],
              point: "发电机：E=nΔΦ/Δt 定量——能量守恒，没'创造'电。"
            }
          ]
        },
        /* ================= p16.3.0 章末小结与习题（2 页） ================= */
        {
          id: "p16.3.0",
          title: "本章小结与习题",
          prereq: "本章全部课程",
          time: "40–60 分钟",
          formulas: {
            I: {
              mathml: '<math><mi>I</mi><mo>=</mo><mfrac><mi>E</mi><mrow><mi>R</mi><mo>+</mo><mi>r</mi></mrow></mfrac></math>',
              translation: "电流 = 电动势 ÷（外电阻+内阻）"
            },
            B: {
              mathml: '<math><mi>B</mi><mo>=</mo><mfrac><mi>F</mi><mrow><mi>I</mi><mi>l</mi></mrow></mfrac></math>',
              translation: "磁感应强度 = 安培力 ÷（电流×导线长）"
            },
            E: {
              mathml: '<math><mi>E</mi><mo>=</mo><mi>n</mi><mfrac><mrow><mi>&#916;</mi><mi>&#934;</mi></mrow><mrow><mi>&#916;</mi><mi>t</mi></mrow></mfrac></math>',
              translation: "感应电动势 = 匝数×磁通量变化率"
            }
          },
          pages: [
            {
              id: "p16.3.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: '本章四句话：① 电流：电子漂移 mm/s，电场近光速建立——<span class="phy-f" data-f="I"></span>（回填 p08.2.3：限金属导体、纯电阻）；② 磁场："能让小磁针转动"的空间，<span class="phy-f" data-f="B"></span>（限 B⊥I）——左手管受力，右手管磁场；洛伦兹力永不做功；③ 电磁感应：楞次"增反减同"定方向，<span class="phy-f" data-f="E"></span>定大小；④ 发电机：机械能→电能，能量守恒。'
                }
              ],
              point: "带上'左手右手分工'和'增反减同三步'，进习题。"
            },
            {
              id: "p16.3.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "开关闭合后灯泡几乎瞬间亮，是因为——",
                  options: ["电子漂移速度极快", "电场以近光速建立，全电路电子同时起步", "电流不需要时间"],
                  answer: 1,
                  tip: "电子漂移仅 mm/s——是'口令'快，不是'士兵'快。"
                },
                {
                  type: "choice",
                  stem: "用左手定则判断的是——",
                  options: ["电流的磁场方向", "通电导线受力方向", "感应电流方向"],
                  answer: 1,
                  tip: "左手管受力，右手管磁场——'左右撇子'别打架。"
                },
                {
                  type: "choice",
                  stem: "N 极插入线圈，感应电流的磁场方向——",
                  options: ["与原磁场同向", "与原磁场反向", "没有磁场"],
                  answer: 1,
                  tip: "Φ 增→'反'：增反减同第一步。"
                },
                {
                  type: "fill",
                  stemBefore: "铜导线电流 1A、横截面积 1mm²，电子漂移速度约",
                  stemAfter: "m/s（数量级）",
                  answer: "10⁻⁵",
                  accept: ["1e-5", "10^-5", "7e-5", "7×10^-5"],
                  hint: "（约 7×10⁻⁵ m/s，数量级 10⁻⁵）",
                  tip: "约 7×10⁻⁵ m/s——电子跑 1m 要 4 个小时！灯亮靠的是电场。"
                },
                {
                  type: "choice",
                  stem: "洛伦兹力——",
                  options: ["对运动电荷做功", "永不做功，只改变速度方向", "只对静止电荷作用"],
                  answer: 1,
                  tip: "f⊥v：永不做功——电子转圈速率不变。"
                },
                {
                  type: "choice",
                  stem: "关于 E=nΔΦ/Δt，正确的是——",
                  options: ["ΔΦ 越大 E 越大", "ΔΦ/Δt 越大 E 越大", "n 越大 E 越小"],
                  answer: 1,
                  tip: "看变化率，不是变化量——导数思想的电磁学回声。"
                },
                {
                  type: "choice",
                  stem: "【估算】一根 1m 长的导线通 1A 电流，垂直放在 1T 磁场中，受安培力约——（数量级对即满分）",
                  options: ["约 0.01N", "约 0.1N", "约 1N", "约 10N"],
                  answer: 2,
                  tip: "依据链：F = BIL = 1×1×1 = 1N——10⁰ 量级。记住这个锚点：1A·1m·1T 对应 1N。"
                }
              ],
              point: "下一章：振动与波——'振动在传播，质点不迁移'。"
            }
          ]
        }
      ]
    }
  ]
};

