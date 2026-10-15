/* ============================================================
 * 学习工具箱 · 物理 · 第十五章数据（物理批5，2026-10-15）
 *
 * 章：p15 静电场（单元 p15.1；课程体系 curriculum v1.1）
 * 课：p15.1.1–p15.1.6 + p15.1.0 章末小结与习题（共 7 课 / 19 页）
 * Schema：冻结版 v1.0（见 p04.js 文件头）；组件 API 见 WIDGETS.md。
 *
 * 内容要点：
 * - 全书红线「比值定义法四辨析」第三落点 p15.1.3（E=F/q）、
 *   第四落点 p15.1.5（C=Q/U），均认旧友 p04.1.2 / p08.2.2。
 * - 公式身份证：库仑定律（真空中的点电荷）、U=Ed（限匀强电场）。
 * - 电场强度首次标注矢量；电场线/磁感线模型说明书。
 * - 交互：P8 field-viz（电场模式）×2、Y4 graph-reader ×4。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p15"] = {
  id: "p15",
  units: [
    {
      id: "p15.1",
      title: "静电场",
      lessons: [
        /* ================= p15.1.1 电荷守恒与起电方式（2 页） ================= */
        {
          id: "p15.1.1",
          title: "电荷守恒与起电方式",
          prereq: "p08.1.1 电荷",
          time: "40–60 分钟",
          formulas: {
            e: {
              mathml: '<math><mi>e</mi><mo>=</mo><mn>1.6</mn><mo>×</mo><msup><mn>10</mn><mrow><mo>−</mo><mn>19</mn></mrow></msup><mspace width="0.2em"/><mi mathvariant="normal">C</mi></math>',
              translation: "元电荷 = 1.6×10⁻¹⁹ 库仑"
            }
          },
          pages: [
            {
              id: "p15.1.1-p1",
              kind: "interact",
              title: "电荷搬家，场线跟着走",
              exploreTip: "点空白处放一个负电荷：看场线从正电荷出发、弯向负电荷——电荷没变多，只是挪了窝。",
              widgets: [
                {
                  type: "field-viz",
                  params: {
                    mode: "efield",
                    charges: [ { x: 30, y: 50, q: 1 } ],
                    lineCount: 24,
                    probeDrag: true,
                    badge: { invariant: "没变的是：总电荷量（电荷守恒）（变的是负电荷放哪→场线的弯法）" }
                  }
                }
              ],
              point: "场线从正出发、到负结束；电荷总量不变——起电只是电荷在'搬家'。小提示：这页画的是\"点电荷\"的场——真实带电体有大小，离得太近时这张\"地图\"会失真；点电荷的条件，第 2 页细讲。"
            },
            {
              id: "p15.1.1-p2",
              kind: "explain",
              title: "三种起电，一种守恒",
              blocks: [
                { type: "lead", text: "负电荷放下，场线“弯腰”——电荷搬家，场跟着变。" },
                {
                  type: "widget",
                  widget: {
                    type: "side-compare",
                    params: {
                      left: { title: "导体", rows: ["电子自由跑", "近端异号、远端同号", "感应靠它"] },
                      right: { title: "绝缘体", rows: ["电子被“拴住”", "电荷不跑", "摩擦靠它"] },
                      verdict: "变的只是位置，不变的是总量。"
                    }
                  }
                },
                { type: "text", html: "三种起电：摩擦（电子被蹭走）、接触（电荷重分配）、感应（近端异号、远端同号）。电荷守恒：只转移不创生——总量不变。" },
                { type: "text", html: '最小的电荷叫元电荷<span class="phy-f" data-f="e"></span>——带电体的电荷量都是它的整数倍。' },
                { type: "trap", text: "⚠️ 别搞混：接触起电“创造”了电荷——错！电荷只转移。" },
                { type: "oldfriend", text: "认旧友：p08.1.1 电荷——初中只认“两种电荷”，今天补“三种起电”+“电荷守恒”。" },
                { type: "mathlink", text: "数学呼应：代数 ch00 数量级——1.6×10⁻¹⁹ C，小到离谱。" },
                { type: "slogan", text: "电荷搬家，总量不变。" }
              ],
              point: "摩擦、接触、感应——总量不变。"
            }
          ]
        },
        /* ================= p15.1.2 库仑定律（3 页） ================= */
        {
          id: "p15.1.2",
          title: "库仑定律",
          prereq: "p15.1.1 电荷守恒",
          time: "40–60 分钟",
          formulas: {
            coulomb: {
              mathml: '<math><mi>F</mi><mo>=</mo><mi>k</mi><mfrac><mrow><msub><mi>q</mi><mn>1</mn></msub><msub><mi>q</mi><mn>2</mn></msub></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></math>',
              translation: "库仑力 = k·q₁q₂ ÷ r²"
            },
            grav: {
              mathml: '<math><mi>F</mi><mo>=</mo><mi>G</mi><mfrac><mrow><msub><mi>m</mi><mn>1</mn></msub><msub><mi>m</mi><mn>2</mn></msub></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></math>',
              translation: "万有引力 = G·m₁m₂ ÷ r²"
            }
          },
          pages: [
            {
              id: "p15.1.2-p1",
              kind: "interact",
              title: "距离翻倍，力掉到几分之一？",
              exploreTip: "r=1 处 F=900，r=2 处 F=225——距离翻倍，力掉到四分之一。点'读斜率'：曲线越往右越平缓。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "function", expr: "F = 900/(t*t)", xLabel: "r", yLabel: "F" },
                    xRange: [1, 6],
                    steps: ["slope"],
                    badge: { invariant: "没变的是：k、q₁、q₂（变的是距离 r→库仑力 F）" }
                  }
                }
              ],
              point: "F 与 r² 成反比：r 翻倍，F 掉到 1/4——平方反比，实锤。"
            },
            {
              id: "p15.1.2-p2",
              kind: "explain",
              title: "平方反比：库仑定律",
              blocks: [
                { type: "lead", text: "距离拉远，力“断崖式”下跌——平方反比。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>F</mi><mo>=</mo><mi>k</mi><mfrac><mrow><msub><mi>q</mi><mn>1</mn></msub><msub><mi>q</mi><mn>2</mn></msub></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></math>',
                    translation: "库仑力 = k·q₁q₂ ÷ r²"
                  },
                  conditions: ["真空", "点电荷（带电体尺寸远小于距离）"],
                  counterexample: "紧贴的带电金属球：距离≈球尺寸，电荷重分布，不成立",
                  dimension: "N = (N·m²/C²)·C·C/m² ✓",
                  units: { si: "N", note: "k=9.0×10⁹ N·m²/C²，与 q 无关" }
                },
                { type: "text", html: "扭秤实验：把“小力”放大成偏转、再放大成光斑——测不清就放大。" },
                { type: "text", html: '点电荷是模型：尺寸≪距离，就像质点。万有引力是"双胞胎"：<span class="phy-f" data-f="grav"></span> 同样平方反比——引力只吸不斥，库仑力可吸可斥（类比的边界）。' },
                { type: "trap", text: "⚠️ 别搞混：“适用于一切带电体”——错（限真空点电荷）；“k 随 q 变”——错。" },
                { type: "mathlink", text: "数学呼应：代数 7.2 反比例函数——F–r 图像是双曲线。" },
                { type: "slogan", text: "平方反比，真空点电荷。" }
              ],
              point: "限真空点电荷——先背条件。"
            },
            {
              id: "p15.1.2-p3",
              kind: "explain",
              title: "条件是灵魂",
              blocks: [
                { type: "lead", text: "公式背下来了，现在看它'什么时候灵、什么时候不灵'——条件才是灵魂。" },
                { type: "text", html: "条件应用：两个带电乒乓球相距 10 倍直径——r≫尺寸，点电荷近似成立；两个紧贴的金属球——电荷重新分布，不成立。" },
                { type: "text", html: "数量级震撼：两个 1C 的点电荷相距 1m，F=9.0×10⁹N——相当于 90 万吨物体的重力！而 1C = 6.25×10¹⁸ 个元电荷——'1 库仑'大得离谱，日常静电只有微库仑。" },
                { type: "trap", text: "⚠️ 别搞混：r→0 时 F→∞——错！r 太小就不是点电荷了，公式先失效。" },
                { type: "oldfriend", text: "认旧友：p13.2.3 万有引力——质点/均匀球体才能用；点电荷和质点都是'忽略尺寸'的模型，同一思想。" },
                { type: "slogan", text: "条件不满足，公式就'罢工'。" }
              ],
              point: "r≫尺寸才能用点电荷近似——条件不满足，公式'罢工'。"
            }
          ]
        },
        /* ================= p15.1.3 电场强度（3 页）· 红线第三落点 ================= */
        {
          id: "p15.1.3",
          title: "电场强度",
          prereq: "p15.1.2 库仑定律",
          time: "40–60 分钟",
          formulas: {
            E: {
              mathml: '<math><mi>E</mi><mo>=</mo><mfrac><mi>F</mi><mi>q</mi></mfrac></math>',
              translation: "电场强度 = 电场力 ÷ 电荷量"
            }
          },
          pages: [
            {
              id: "p15.1.3-p1",
              kind: "interact",
              title: "放电荷，亲手画电场线",
              exploreTip: "点空白处放负电荷：场线从正弯向负。拖探测手柄：看场强方向箭头和'强/中/弱'。",
              widgets: [
                {
                  type: "field-viz",
                  params: {
                    mode: "efield",
                    charges: [ { x: 50, y: 50, q: 1 } ],
                    lineCount: 32,
                    probeDrag: true,
                    badge: { invariant: "没变的是：场源电荷（场是它的'地盘'）（变的是探测位置→场强箭头与'强/中/弱'）" }
                  }
                }
              ],
              point: "电场线从正出发、到负结束；疏密表强弱——线是地图，不是实物。"
            },
            {
              id: "p15.1.3-p2",
              kind: "explain",
              title: "场强：场的'脾气'",
              blocks: [
                { type: "lead", text: "地图画好，给每点“定级”：场多强、朝哪指？" },
                { type: "text", html: '电场强度（矢量）：试探电荷在某点受力 F 跟电荷量 q 的比值<span class="phy-f" data-f="E"></span>；方向：正电荷受力方向。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>E</mi><mo>=</mo><mfrac><mi>F</mi><mi>q</mi></mfrac></math>',
                    translation: "电场强度 = 电场力 ÷ 电荷量"
                  },
                  conditions: ["试探电荷足够小（不影响原电场）"],
                  counterexample: "换成 2q：F 翻倍，E 不动——E 是场的脾气",
                  dimension: "N/C = N ÷ C ✓",
                  units: { si: "N/C", common: "V/m", note: "1 N/C = 1 V/m" }
                },
                { type: "text", html: "红线「比值定义法四辨析」第三落点：E 与 F、q 无关——F 翻倍 q 跟着翻倍，E 不动；场是物质，试探电荷只是来“量”它的。" },
                { type: "trap", text: "⚠️ 别搞混：“E 与 F 成正比”——错！同一个坑第三次；“电场线真实存在”——错！" },
                { type: "oldfriend", text: "认旧友：p04.1.2 密度、p08.2.2 电阻——'等号不代表因果'第三次。" },
                { type: "mathlink", text: "物理呼应：p12.1.3 矢量叠加——场强合成用平行四边形。" },
                { type: "slogan", text: "场是物质，与试探电荷无关。" }
              ],
              point: "E 是场的脾气，与试探电荷无关。"
            },
            {
              id: "p15.1.3-p3",
              kind: "explain",
              title: "电场线：场的地图",
              blocks: [
                { type: "lead", text: "场强是“定级”，电场线是“地图”——模型三问：看到什么？忽略什么？何时不能用？" },
                { type: "text", html: "电场线画法：从正电荷（或无穷远）出发，回到负电荷（或无穷远）；不闭合、不相交；疏密表强弱。避雷针：尖端处电场线密集，电场强——尖端放电。" },
                { type: "text", html: "模型三问（全书通用版式）：① 看到什么——场的方向和强弱分布；② 忽略什么——场的真实微观机制；③ 什么时候不能用——别把它当成真实存在的线。" },
                { type: "trap", text: "⚠️ 别搞混：电场线相交——错！相交处方向'精神分裂'；电场线闭合——错！那是磁感线（p16.2.1 预告）。" },
                { type: "oldfriend", text: "认旧友：p10.1.1 磁感线——'地图不是地形'，电场线和磁感线是同一套模型思想。" },
                { type: "slogan", text: "地图不是地形，但没有地图寸步难行。" }
              ],
              point: "电场线是模型：帮我们看到场的分布，别当真。"
            }
          ]
        },
        /* ================= p15.1.4 电势与电势差（3 页） ================= */
        {
          id: "p15.1.4",
          title: "电势与电势差",
          prereq: "p15.1.3 电场强度",
          time: "40–60 分钟",
          formulas: {
            Uab: {
              mathml: '<math><msub><mi>U</mi><mrow><mi>A</mi><mi>B</mi></mrow></msub><mo>=</mo><msub><mi>&#966;</mi><mi>A</mi></msub><mo>−</mo><msub><mi>&#966;</mi><mi>B</mi></msub></math>',
              translation: "A、B 两点电势差 = φA − φB"
            },
            Ued: {
              mathml: '<math><mi>U</mi><mo>=</mo><mi>E</mi><mi>d</mi></math>',
              translation: "电势差 = 场强 × 距离（沿场强方向）"
            }
          },
          pages: [
            {
              id: "p15.1.4-p1",
              kind: "interact",
              title: "电势'下坡'有多陡？",
              exploreTip: "匀强电场里，电势沿场强方向均匀下降：点'读斜率'——斜率的绝对值就是场强 E。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "function", expr: "V = 100 - 20*t", xLabel: "x（沿场强方向）", yLabel: "φ/V" },
                    xRange: [0, 5],
                    steps: ["slope"],
                    badge: { invariant: "没变的是：匀强电场的 E（变的是位置→电势的均匀下降）" }
                  }
                }
              ],
              point: "电势像'高度'：沿电场方向'下坡'，U=Ed——d 沿场强方向量。"
            },
            {
              id: "p15.1.4-p2",
              kind: "explain",
              title: "电势：电场的'高度'",
              blocks: [
                { type: "lead", text: "第 1 页的直线告诉你：匀强电场里，电势'下坡'是均匀的——斜率就是场强。" },
                { type: "text", html: '电势 φ：电荷在电场中的"高度"（Ep=qφ）。电势差（电压）：<span class="phy-f" data-f="Uab"></span>——两点间的"高度差"，电场力做功 W=qU。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>U</mi><mo>=</mo><mi>E</mi><mi>d</mi></math>',
                    translation: "电势差 = 场强 × 距离（沿场强方向）"
                  },
                  conditions: ["匀强电场", "d 是沿场强方向的距离"],
                  counterexample: "点电荷的场（非匀强）：U≠Ed，得用 W=qU 另算",
                  dimension: "V = (V/m)·m ✓",
                  units: { si: "V", note: "d 必须沿场强方向，斜着量不行" }
                },
                { type: "text", html: "零电势是人为规定的'海平面'：电势为零处，场强不一定为零——海平面处也可以有陡坡。" },
                { type: "trap", text: "⚠️ 别搞混：电势为零处场强为零——错！零电势是人为规定；U=Ed 无条件用——错！限匀强电场。" },
                { type: "mathlink", text: "物理呼应：p14.1.3 势能类比（回填）——Ep=qφ ↔ Ep=mgh，电势就是电场的'高度'。" },
                { type: "slogan", text: "电势是高度，电势差是高度差。" }
              ],
              point: "U=Ed 限匀强电场。"
            },
            {
              id: "p15.1.4-p3",
              kind: "explain",
              title: "等势面：电场的'等高线'",
              blocks: [
                { type: "lead", text: "电势有'高度'，就有'等高线'——电势相等的点连成的面，叫等势面。" },
                { type: "text", html: "等势面性质：① 同一等势面上移动电荷，电场力不做功（W=qU=0）；② 电场线与等势面垂直；③ 等势面密处场强大。点电荷的等势面：以电荷为球心的一层层'球壳'。" },
                { type: "text", html: "生活例：高压线上的小鸟——双脚站在同一根线上，电势差≈0，不触电（别学！高压危险）。实验例：第 1 页的 φ–x 直线——等势面就是一条条'等高线'。反例：等势面≠电场线——一个是'高度'，一个是'坡度'。" },
                { type: "trap", text: "⚠️ 别搞混：沿电场线方向电势升高——错！降低（'下坡'）；等势面上场强相等——错！电势相等≠场强相等。" },
                { type: "slogan", text: "等势面是电场的等高线。" }
              ],
              point: "等势面：电势相等的地方——电场线永远垂直穿过它。"
            }
          ]
        },
        /* ================= p15.1.5 电容（3 页）· 红线第四落点 ================= */
        {
          id: "p15.1.5",
          title: "电容",
          prereq: "p15.1.4 电势",
          time: "40–60 分钟",
          formulas: {
            C: {
              mathml: '<math><mi>C</mi><mo>=</mo><mfrac><mi>Q</mi><mi>U</mi></mfrac></math>',
              translation: "电容 = 电荷量 ÷ 电压"
            }
          },
          pages: [
            {
              id: "p15.1.5-p1",
              kind: "interact",
              title: "充电：Q 翻倍，C 动不动？",
              exploreTip: "给电容器充电：U 翻倍，Q 跟着翻倍——点'读斜率'：斜率就是电容 C，它动都不动。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "points", points: [[0, 0], [1, 2], [2, 4], [3, 6]], xLabel: "U/V", yLabel: "Q/C" },
                    steps: ["slope"],
                    badge: { invariant: "没变的是：电容 C（器件的脾气）（变的是电压 U→电荷量 Q）" }
                  }
                }
              ],
              point: "Q–U 图像是过原点的直线，斜率=C——U 变 Q 跟着变，C 不动。"
            },
            {
              id: "p15.1.5-p2",
              kind: "explain",
              title: "电容：器件的'脾气'",
              blocks: [
                { type: "lead", text: "U 翻倍，Q 跟着翻倍，斜率 C 不动——办身份证。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>C</mi><mo>=</mo><mfrac><mi>Q</mi><mi>U</mi></mfrac></math>',
                    translation: "电容 = 电荷量 ÷ 电压"
                  },
                  conditions: ["电容器结构、介质一定"],
                  counterexample: "电压加倍：Q 跟着加倍，C 不动——C 是器件的脾气",
                  dimension: "F = C ÷ V ✓",
                  units: { si: "F（法拉）", common: "μF、pF", note: "1F=10⁶μF=10¹²pF" }
                },
                { type: "text", html: "红线「比值定义法四辨析」第四落点（收官）：C 与 Q、U 无关！电容是电容器“装电荷的本事”，由结构决定：S 越大、d 越小，C 越大（定性）。" },
                { type: "trap", text: "⚠️ 别搞混：“电容与 Q 成正比”——错！全书第四次，同一个坑；“储存电荷”——不准确！存的是电场能量。" },
                { type: "oldfriend", text: "认旧友：p04.1.2 密度、p08.2.2 电阻、p15.1.3 场强——“比值定义 ≠ 正反比”四连击收官。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 一次函数（奠基）——Q–U 图像斜率 = C。" },
                { type: "slogan", text: "电容是器件的脾气。" }
              ],
              point: "C=Q/U 是'量'电容的办法——C 由结构定，与 Q、U 无关。"
            },
            {
              id: "p15.1.5-p3",
              kind: "explain",
              title: "充放电：电容器的'呼吸'",
              blocks: [
                { type: "lead", text: "电容器不只是个'参数 C'——它会'呼吸'：充电吸入电荷，放电吐出电流。" },
                { type: "text", html: "充电：电源把电荷'搬'到极板上，U 上升，电场能量储存起来。放电：极板电荷'流'回去，形成短暂电流——照相机的闪光灯，就是电容放电的'一口气'。" },
                { type: "text", html: "生活例：电脑主板上的电容（滤波稳压）；实验例：第 1 页的 Q–U 直线——充电就是沿着这条线'爬坡'；反例：电容≠电池——电池靠化学能持续供电，电容只存'一口气'。" },
                { type: "trap", text: "⚠️ 别搞混：电容越大存的电荷越多——不完全！Q=CU，还得看电压；电容器通直流——错！充电完成后，电路断开（隔直）。" },
                { type: "slogan", text: "充电是吸气，放电是吐气。" }
              ],
              point: "电容器：充电存能量，放电吐电流——'一口气'的选手。"
            }
          ]
        },
        /* ================= p15.1.6 带电粒子在电场中的运动（3 页） ================= */
        {
          id: "p15.1.6",
          title: "带电粒子在电场中的运动",
          prereq: "p15.1.5 电容",
          time: "40–60 分钟",
          formulas: {
            acc: {
              mathml: '<math><mi>q</mi><mi>U</mi><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>m</mi><msup><mi>v</mi><mn>2</mn></msup></math>',
              translation: "电场力做功 = 动能增量"
            },
            defl: {
              mathml: '<math><mi>y</mi><mo>=</mo><mfrac><mrow><mi>q</mi><mi>U</mi><msup><mi>l</mi><mn>2</mn></msup></mrow><mrow><mn>2</mn><mi>m</mi><msubsup><mi>v</mi><mn>0</mn><mn>2</mn></msubsup><mi>d</mi></mrow></mfrac></math>',
              translation: "偏转距离 = qUl² ÷ (2mv₀²d)"
            }
          },
          pages: [
            {
              id: "p15.1.6-p1",
              kind: "interact",
              title: "偏转电压翻倍，亮斑走多远？",
              exploreTip: "偏转电压 U₂ 翻倍，亮斑偏转 y 跟着翻倍——点'读斜率'：斜率里藏着 q、l、v₀、d。",
              widgets: [
                {
                  type: "graph-reader",
                  params: {
                    source: { kind: "function", expr: "y = 2*t", xLabel: "U₂/V", yLabel: "y/mm" },
                    xRange: [0, 5],
                    steps: ["slope"],
                    badge: { invariant: "没变的是：q、m、v₀、l、d（斜率的'配方'）（变的是偏转电压 U₂→亮斑偏转 y）" }
                  }
                }
              ],
              point: "y 与 U₂ 成正比——但斜率由 q、l、v₀、d 定：偏转不只看电压。"
            },
            {
              id: "p15.1.6-p2",
              kind: "explain",
              title: "先加速，再偏转",
              blocks: [
                { type: "lead", text: "第 1 页直线：y 跟 U₂ 成正比——斜率里还藏着 q、l、v₀、d。" },
                { type: "text", html: '加速：电压 U 加速电子，qU 全变成动能<span class="phy-f" data-f="acc"></span>——算出射速度 v₀。' },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>q</mi><mi>U</mi><mo>=</mo><mfrac><mn>1</mn><mn>2</mn></mfrac><mi>m</mi><msup><mi>v</mi><mn>2</mn></msup></math>',
                    translation: "电场力做功 = 动能增量"
                  },
                  conditions: ["从静止开始加速", "不计重力"],
                  counterexample: "有初速时：qU=½mv²−½mv₀²",
                  dimension: "J = C·V ✓",
                  units: { si: "J", note: "qU 是电场力做的功" }
                },
                { type: "text", html: '偏转：电子水平射入偏转电场——水平匀速、竖直匀加速，轨迹抛物线<span class="phy-f" data-f="defl"></span>。"类平抛"要求电场力恒定（匀强电场）。' },
                { type: "trap", text: "⚠️ 别搞混：“偏转距离只与电压有关”——错！还与 v₀、l、d 有关；“类平抛即平抛”——错！" },
                { type: "oldfriend", text: "认旧友：p13.1.3 平抛运动——同一套动作，换了“导演”（电场力）。" },
                { type: "mathlink", text: "数学呼应：代数 7.1 抛物线——偏转轨迹是抛物线。" },
                { type: "slogan", text: "先加速，再偏转走抛物线。" }
              ],
              point: "加速算 v₀，偏转走抛物线。"
            },
            {
              id: "p15.1.6-p3",
              kind: "explain",
              title: "示波管：电场中的'画笔'",
              blocks: [
                { type: "lead", text: "加速+偏转=示波管：电子枪发射电子，加速后穿过两对偏转板——荧光屏上的亮斑就是电子的'脚印'。" },
                { type: "text", html: "竖直偏转板加电压：亮斑上下走；水平偏转板加电压：亮斑左右走。两个方向一配合，亮斑能在屏上'画画'——心电图机、老式电视机都是这个原理。" },
                { type: "text", html: "生活例：手机快充（加速：电压越高，电子'跑'得越快）；实验例：第 1 页的 y–U₂ 直线——调偏转电压，亮斑听话地走；反例：偏转板加的是直流偏转电压，不是交变——交变电压留给 p17.2.3。" },
                { type: "trap", text: "⚠️ 别搞混：电子在偏转电场中做匀速直线运动——错！竖直方向匀加速；电子打到屏上速度不变——错！加速电场让它变快了。" },
                { type: "slogan", text: "示波管：用电压指挥电子画画。" }
              ],
              point: "示波管=电子枪+两对偏转板——电压指挥电子，亮斑留下脚印。"
            }
          ]
        },
        /* ================= p15.1.0 章末小结与习题（2 页） ================= */
        {
          id: "p15.1.0",
          title: "本章小结与习题",
          prereq: "本章全部课程",
          time: "40–60 分钟",
          formulas: {
            coulomb: {
              mathml: '<math><mi>F</mi><mo>=</mo><mi>k</mi><mfrac><mrow><msub><mi>q</mi><mn>1</mn></msub><msub><mi>q</mi><mn>2</mn></msub></mrow><msup><mi>r</mi><mn>2</mn></msup></mfrac></math>',
              translation: "库仑力 = k·q₁q₂ ÷ r²"
            },
            E: {
              mathml: '<math><mi>E</mi><mo>=</mo><mfrac><mi>F</mi><mi>q</mi></mfrac></math>',
              translation: "电场强度 = 电场力 ÷ 电荷量"
            },
            Ued: {
              mathml: '<math><mi>U</mi><mo>=</mo><mi>E</mi><mi>d</mi></math>',
              translation: "电势差 = 场强 × 距离（沿场强方向）"
            },
            C: {
              mathml: '<math><mi>C</mi><mo>=</mo><mfrac><mi>Q</mi><mi>U</mi></mfrac></math>',
              translation: "电容 = 电荷量 ÷ 电压"
            }
          },
          pages: [
            {
              id: "p15.1.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: '本章四句话：① 电荷守恒——起电只是"搬家"（摩擦/接触/感应）；② <span class="phy-f" data-f="coulomb"></span>（限真空中的点电荷）；③ <span class="phy-f" data-f="E"></span>、<span class="phy-f" data-f="Ued"></span>（限匀强电场）——场是物质，与试探电荷无关；④ <span class="phy-f" data-f="C"></span>——电容是器件的脾气。红线收官：比值定义 ≠ 正反比（密度→电阻→场强→电容）。'
                }
              ],
              point: "带上'等号不代表因果'和'背公式先背条件'，进习题。"
            },
            {
              id: "p15.1.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "将试探电荷的电荷量加倍，它所在点的电场强度——",
                  options: ["加倍", "减半", "不变"],
                  answer: 2,
                  tip: "E 是场的脾气：F 跟着翻倍，比值不动——红线第三落点。"
                },
                {
                  type: "choice",
                  stem: "关于 U=Ed，正确的是——",
                  options: ["任何电场都能用", "只限匀强电场，d 沿场强方向", "d 是两点间的直线距离"],
                  answer: 1,
                  tip: "限匀强电场，d 必须沿场强方向——斜着量不行。"
                },
                {
                  type: "choice",
                  stem: "电容器两端电压加倍，它的电容——",
                  options: ["加倍", "减半", "不变"],
                  answer: 2,
                  tip: "C 是器件的脾气：Q 跟着翻倍，C 不动——红线第四落点。"
                },
                {
                  type: "fill",
                  stemBefore: "回 p15.1.2 第 1 页实验（r=1 处 F=900，r=2 处 F=225）：距离翻倍，库仑力变为原来的",
                  stemAfter: "",
                  answer: "1/4",
                  accept: ["四分之一", "0.25", "1/4"],
                  hint: "（几分之一）",
                  tip: "平方反比：r 翻倍，F 掉到 1/4——p15.1.2 实验数据实锤。"
                },
                {
                  type: "choice",
                  stem: "电势为零的地方，场强——",
                  options: ["一定为零", "不一定为零", "一定最大"],
                  answer: 1,
                  tip: "零电势是人为规定的'海平面'——海平面处也可以有陡坡。"
                },
                {
                  type: "fill",
                  stemBefore: "元电荷 e=",
                  stemAfter: "C",
                  answer: "1.6×10⁻¹⁹",
                  accept: ["1.6e-19", "1.6×10^-19"],
                  hint: "（库仑）",
                  tip: "所有带电体的电荷量都是它的整数倍。"
                },
                {
                  type: "choice",
                  stem: "【估算】雷雨云与地面间电压可达 10⁸V，云层高约 1km，云地间平均场强约——（数量级对即满分）",
                  options: ["约 10V/m", "约 100V/m", "约 10⁵V/m", "约 10⁸V/m"],
                  answer: 2,
                  tip: "依据链：E = U/d = 10⁸÷1000 = 10⁵V/m——10⁵ 量级。空气击穿场强约 3×10⁶V/m。"
                }
              ],
              point: "下一章：恒定电流——电子漂移 vs 电场传播，数量级震撼。"
            }
          ]
        }
      ]
    }
  ]
};

