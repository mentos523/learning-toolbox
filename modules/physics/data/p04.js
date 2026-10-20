/* ============================================================
 * 学习工具箱 · 物理 · 第四章数据（蓝队 2026-10-15，试点 p04.1.2）
 *
 * ============ 物理数据 Schema（冻结版 v1.0，127 课批量生产复用） ============
 *
 * 1. 注册：window.PHY_CH["pNN"] = { id, units[] }。
 *    章标题/目标不在此文件，见 data/chapters.js（window.PHY_META，
 *    18 章元信息冻结自 curriculum v1.1，生产队不得改章名）。
 *
 * 2. 层级：章 → units[]（单元）→ lessons[]（课）→ pages[]（页）。
 *    id 命名铁律：
 *      章 "p04"；单元 "p04.1"（章号.单元序号）；
 *      课 "p04.1.2"（章号.单元序号.课序号）；
 *      页 "p04.1.2-p1"（课号-p页序号），全局唯一。
 *    深链：index.html#phy=<课号>，如 #phy=p04.1.2。
 *
 * 3. 页对象：
 *    { id, kind, title, point, pointScroll?, widgets?|blocks?|questions?,
 *      formulas? }
 *    kind 枚举："interact"（交互页，≤150 字）/ "explain"（讲解页，
 *      ≤300 字）/ "quiz"（练习页）。
 *    title：一句话概念，≤20 字。point：底部点拨区 ≤60 字（黄队文案）。
 *    formulas：本课公式注册表 {key:{mathml, translation}}；正文块中用
 *      <span class="phy-f" data-f="key"></span> 占位，渲染器负责
 *      MathML/降级文本二选一（translation 必填，降级用）。
 *
 * 4. explain 页 blocks[]（顺序即渲染顺序），type 枚举：
 *    "lead"      {text}                      先现象后规则的引子
 *    "text"      {html}                      正文（可含 phy-f 公式占位）
 *    "formula-id"{formula,conditions,        Y3 公式身份证（固定版式，
 *               counterexample,dimension,    全书统一）。formula={mathml,
 *               units}                       translation}；units={si,common,
 *                                            note} 为物理扩展（每个公式
 *                                            必须注明 SI 单位，审计清单第 1 条）
 *    "trap"      {text}                      误区警示："⚠️ 别搞混：××不是××，因为××"
 *    "oldfriend" {text}                      认旧友："（就是你第 X 页……）"回看/预告
 *    "mathlink"  {text}                      数学呼应（带 预告/回填/奠基 标签）
 *    "slogan"    {text}                      口诀 ≤20 字
 *    "widget"    {widget:{type,params}}       讲解页内嵌交互组件
 *
 * 5. interact 页 widgets[]，type 枚举（本文件试点实现 2 种，Y1–Y5/Y2
 *    仪表等随阶段三按 interactions.md spec 增补）：
 *    "mv-lab"       m–V 图像虚拟实验（跃升 4 脚手架 step 1；Y4 口径：
 *                   source={kind:"points"} 点列数据源，直线段斜率给精确值）
 *      params: { materials:[{id,name,rho,colorRole}], mMax, mInit,
 *                unitM, unitV, unitRho,
 *                badge:{ quantityMathml, invariant },   // 读数徽章：
 *                   invariant 格式 "没变的是：××"（黄队文案，可空）
 *                source:{kind:"points", xLabel, yLabel, steps:["slope"]} }
 *    "slope-compare" 斜率直观版（D1 方案 B：不讲正比例函数定义，
 *                   只比"线的倾斜程度——越陡越大"）
 *      params: { materials:[{id,name,rho,colorRole}], order:[ids by steepness],
 *                unitRho }
 *
 * 6. quiz 页 questions[]，type 枚举（判分口径复用语法 Y3）：
 *    "choice" {stem, options[], answer(0-based), tip}
 *    "fill"   {stemBefore, stemAfter, answer, accept[], hint, tip}
 *    归一化：大小写不敏感、连续空白折叠；上标 ³ 接受纯文本 3 变体。
 *
 * 7. 全局铁律（docs/physics-interactions.md §0.3）：
 *    - params 里不出现具体色值，只用 --phy-* 语义名；本数据用
 *      colorRole（如 "force-a"），渲染器映射为 var(--phy-force-a)。
 *      深色模式自动跟随，无需重绘画布。
 *    - 触控目标 ≥44px；双编码（颜色+文字/形状）；读数行走 MathML，
 *      单位与数值同行；无音频文件。
 *    - 物理量符号一律 MathML 斜体（<mi>），单位正体
 *     （<mi mathvariant="normal">）。
 *
 * 内容分工：概念表述=物理专家队；教学流/话术=黄队；
 * 跃升 4 脚手架（p04.1.2）= 全书红线「比值定义法四辨析」第一落点。
 *
 * 组件 API 目录：全部 15 种组件（P1–P10/Y1–Y5）的 params 规范见
 * modules/physics/data/WIDGETS.md（阶段三批量生产的数据依据）；
 * 章末习题页约定（pXX.n.0）亦见该文件末尾。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p04"] = {
  id: "p04",
  units: [
    {
      id: "p04.1",
      title: "质量与密度",
      lessons: [
        {
          id: "p04.1.1",
          title: "质量",
          prereq: "p00 导论",
          time: "40–60 分钟",
          formulas: {
            massconv: {
              mathml: "<math><mrow><mn>1</mn><mspace width=\"0.2em\"/><mi mathvariant=\"normal\">t</mi><mo>=</mo><mn>1000</mn><mspace width=\"0.2em\"/><mi mathvariant=\"normal\">kg</mi><mo>=</mo><msup><mn>10</mn><mn>6</mn></msup><mspace width=\"0.2em\"/><mi mathvariant=\"normal\">g</mi></mrow></math>",
              translation: "1 吨 = 1000 千克 = 10 的 6 次方克"
            }
          },
          pages: [
            /* ---------- p1：讲解页（天平调平步骤 + 质量概念） ---------- */
            {
              id: "p04.1.1-p1",
              kind: "explain",
              title: "质量是“多少料”",
              blocks: [
                { type: "lead", text: "一瓶水上月球，还是那些水——变重量，不变质量。" },
                { type: "text", html: "<strong>质量 m</strong>（标量，单位<strong>千克 kg</strong>，SI）：物体所含物质的多少。常用单位 <span class=\"phy-f\" data-f=\"massconv\"></span>，1g = 1000mg。质量是“惯性量度”——质量越大，越难改变运动状态。" },
                { type: "text", html: "天平调平三步：① 放平（放水平桌面）；② 归零（游码拨到标尺左端零刻度）；③ 调平（平衡螺母：<strong>指针偏左向右调</strong>，反之亦然；“左偏右调”）。称量：左物右码，砝码用镊子夹。" },
                { type: "trap", text: "⚠️ 别搞混：质量 = 重量——错！质量是惯性量度，与位置无关；重量是引力，会变。初中先分清。重量：日常说法，指重力的大小，单位是牛顿；物理正式场合一律用『重力』，不用『重量』表示质量。" },
                { type: "slogan", text: "左偏右调，左物右码。" }
              ],
              point: "记住“左偏右调”：指针偏左，左沉，螺母往右调——第 2 页亲手调一次。"
            },
            /* ---------- p2：Y2 独立页（冻结口径：估读到下一位，容差=分度值×1） ---------- */
            {
              id: "p04.1.1-p2",
              kind: "interact",
              title: "天平称量练习",
              exploreTip: "先调平（左偏右调），再称量：砝码质量 + 游码读数（估读到分度值下一位）。",
              widgets: [
                {
                  type: "read-gauge",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.Meter */
                    engine: {
                      primitive: "Meter", version: "2026.10.17.2",
                      params: { gauge: "balance", division: 0.2 }
                    },
                    
                    gauge: "balance",
                    range: { min: 0, max: 200, unit: "g" },
                    divisions: 0.2,
                    estimate: true,
                    eyeLine: false,
                    tolerance: "1division"
                  }
                }
              ],
              point: "读数 = 砝码总质量 + 游码示数：游码读左边刻度线，估读一位。"
            }
          ]
        },
        {
          id: "p04.1.2",
          title: "密度",
          prereq: "p04.1.1 质量",
          time: "40–60 分钟",
          /* 本课公式注册表：translation 必填（MathML 降级用人话文本） */
          formulas: {
            rho: {
              mathml: "<math><mi>&#961;</mi><mo>=</mo><mfrac><mi>m</mi><mi>V</mi></mfrac></math>",
              translation: "密度 = 质量 ÷ 体积"
            },
            conv: {
              mathml: "<math><mrow><mn>1</mn><mspace width=\"0.2em\"/>" +
                "<mi mathvariant=\"normal\">g</mi><mo>/</mo>" +
                "<msup><mi mathvariant=\"normal\">cm</mi><mn>3</mn></msup>" +
                "<mo>=</mo><mn>1000</mn><mspace width=\"0.2em\"/>" +
                "<mi mathvariant=\"normal\">kg</mi><mo>/</mo>" +
                "<msup><mi mathvariant=\"normal\">m</mi><mn>3</mn></msup></mrow></math>",
              translation: "1 克每立方厘米 = 1000 千克每立方米"
            },
            rui: {
              mathml: "<math><mi>R</mi><mo>=</mo><mfrac><mi>U</mi><mi>I</mi></mfrac></math>",
              translation: "电阻 = 电压 ÷ 电流"
            }
          },
          pages: [
            /* ---------- p1：交互页（跃升 4 脚手架 step 1） ---------- */
            {
              id: "p04.1.2-p1",
              kind: "interact",
              title: "加砝码，密度会变吗？",
              exploreTip: "先选一种材料，再拖滑块加砝码：看图像上的点怎么走，看徽章里的 ρ 动不动。",
              widgets: [
                {
                  type: "mv-lab",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.PlotBoard */
                    engine: {
                      primitive: "PlotBoard", version: "2026.10.17.2",
                      params: { sourceKind: "points", materials: "al,iron,water", rhos: "2.7,7.9,1.0" }
                    },
                    
                    materials: [
                      { id: "al",    name: "铝块", rho: 2.7, colorRole: "force-a" },
                      { id: "iron",  name: "铁块", rho: 7.9, colorRole: "target" },
                      { id: "water", name: "水",   rho: 1.0, colorRole: "force-c" }
                    ],
                    mMax: 1000, mInit: 400, step: 10,
                    unitM: "g", unitV: "cm³", unitRho: "g/cm³",
                    badge: {
                      quantityMathml: "<math><mi>&#961;</mi></math>",
                      invariant: "没变的是：密度（物质的脾气）（变的是质量、体积→图像上的点走直线）"
                    },
                    /* Y4 口径：点列数据源；三读法本页只开"读斜率" */
                    source: { kind: "points", xLabel: "V/cm³", yLabel: "m/g", steps: ["slope"] }
                  }
                },
                {
                  type: "formula-id",
                  params: {
                    formula: { mathml: "<math><mi>&#961;</mi><mo>=</mo><mfrac><mi>m</mi><mi>V</mi></mfrac></math>", translation: "密度 = 质量 ÷ 体积" },
                    conditions: ["同种物质", "状态、温度一定"],
                    counterexample: "蜡烛熔成蜡油：状态变了，“同种物质 ρ 一定”就失效",
                    dimension: "kg/m³ = kg ÷ m³ ✓",
                    units: { si: "kg/m³", common: "g/cm³", note: "1 g/cm³ = 1000 kg/m³" }
                  }
                },
              ],
              point: "ρ 是 m–V 图像的“斜率”——m 变、V 跟着变，但斜率不变；m/V 是“量”密度的方法，不是“决定”密度的原因。"
            },
            /* ---------- p2：讲解页（斜率直观版，先直觉） ---------- */
            {
              id: "p04.1.2-p2",
              kind: "explain",
              title: "斜率直观版：越陡越大",
              blocks: [
                { type: "lead", text: "第 1 页的三条线你都玩过了。现在不看数字，只看线的样子。" },
                {
                  type: "widget",
                  widget: {
                    type: "slope-compare",
                    params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.SlopeCompareDOM */
                    engine: {
                      primitive: "SlopeCompareDOM", version: "2026.10.17.2",
                      params: { order: ["iron", "al", "water"] }
                    },
                    
                      materials: [
                        { id: "al",    name: "铝", rho: 2.7, colorRole: "force-a" },
                        { id: "iron",  name: "铁", rho: 7.9, colorRole: "target" },
                        { id: "water", name: "水", rho: 1.0, colorRole: "force-c" }
                      ],
                      order: ["iron", "al", "water"],
                      unitRho: "g/cm³"
                    }
                  }
                },
                { type: "text", html: "线的倾斜程度，物理上叫「斜率」。只看陡峭：铁线最陡，铝线次之，水线最平缓——所以铁的密度最大。严格的定义（正比例函数）是代数 6.2 的课，物理先借直觉用着。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 正比例函数（奠基）——m–V 图像的斜率 = 密度，是物理为数学打的第一个样板。" },
                { type: "slogan", text: "线越陡，密度越大。" }
              ],
              point: "这是“先直觉后严格”的直觉版：先记住线的样子，严格定义下一页就到。"
            },
            /* ---------- p3：讲解页（严格版：公式身份证 + 比值定义说明书） ---------- */
            {
              id: "p04.1.2-p3",
              kind: "explain",
              title: "比值定义 ≠ 正反比",
              blocks: [
                { type: "lead", text: "m 翻倍、V 翻倍，ρ 不动——办“身份证”（公式身份证 = 公式 + 适用条件）。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>&#961;</mi><mo>=</mo><mfrac><mi>m</mi><mi>V</mi></mfrac></math>",
                    translation: "密度 = 质量 ÷ 体积"
                  },
                  conditions: ["同种物质", "状态、温度一定"],
                  counterexample: "蜡烛熔成蜡油：状态变了，“同种物质 ρ 一定”就失效",
                  dimension: "kg/m³ = kg ÷ m³ ✓",
                  units: { si: "kg/m³", common: "g/cm³", note: "1 g/cm³ = 1000 kg/m³" }
                },
                { type: "text", html: "比值定义 = 用两个量给第三个量「起名字」——起名字 ≠ 定因果。（红线「比值定义法四辨析」第一落点：电阻、电场强度、电容还要再考三次。）" },
                { type: "trap", text: "⚠️ 别搞混：ρ 与 m 成正比、与 V 成反比——错！m 翻倍 V 跟着翻倍，比值不动；ρ 是物质的脾气。" },
                { type: "text", html: "正反比判定三步：① 谁变、谁跟着变；② 「脾气」变没变；③ <span class=\"phy-f\" data-f=\"rui\"></span> 里 U 变 I 跟着变，R 不动——R 与 U、I 无关。" },
                { type: "oldfriend", text: "预告：p08.2.2 电阻<span class=\"phy-f\" data-f=\"rui\"></span>陷阱再现——带上“等号不代表因果”去。" },
                { type: "slogan", text: "等号不代表因果。" }
              ],
              point: "公式都是“有条件的真话”：先背条件，再背公式。"
            },
            /* ---------- p4：练习页（Y3 判分） ---------- */
            {
              id: "p04.1.2-p4",
              kind: "quiz",
              title: "比值定义陷阱·闯关",
              questions: [
                {
                  type: "choice",
                  stem: "一块铁块平均分成两半，每一半的密度是原来的——",
                  options: ["一半", "两倍", "不变"],
                  answer: 2,
                  tip: "ρ 是物质的脾气：切开的只是体积，脾气切不掉。"
                },
                {
                  type: "choice",
                  stem: "由公式 ρ=m/V 可以得出——",
                  options: ["密度与质量成正比", "密度与体积成反比", "密度是物质特性，与 m、V 无关"],
                  answer: 2,
                  tip: "等号不代表因果：m/V 是“量”密度的方法，不是“决定”它的原因。"
                },
                {
                  type: "fill",
                  stemBefore: "密度的国际单位（SI）是",
                  stemAfter: "",
                  answer: "kg/m³",
                  accept: ["kg/m3", "kg/m^3"],
                  hint: "（千克每立方米）",
                  tip: "列式永远带单位——全书第一条规矩。"
                },
                {
                  type: "fill",
                  stemBefore: "实验室常用单位是",
                  stemAfter: "",
                  answer: "g/cm³",
                  accept: ["g/cm3", "g/cm^3"],
                  hint: "（克每立方厘米）",
                  tip: "1 g/cm³ = 1000 kg/m³，换算别丢 1000。"
                },
                {
                  type: "choice",
                  stem: "m–V 图像上，铁线最陡、铝线次之、水线最平缓，说明——",
                  options: ["铁的密度最大", "水的密度最大", "三者密度相等"],
                  answer: 0,
                  tip: "线越陡，密度越大——第 2 页的直觉版。"
                }
              ],
              point: "下一站预告：p08.2.2 电阻——R=U/I 式陷阱再现，带上“等号不代表因果”去。"
            }
          ]
        },
        {
          id: "p04.1.3",
          title: "测量物质的密度",
          prereq: "p04.1.2 密度",
          time: "40–60 分钟",
          pages: [
            /* ---------- p1：交互页（mv-lab 复用：测石块密度全流程） ---------- */
            {
              id: "p04.1.3-p1",
              kind: "interact",
              title: "给石块“量脾气”",
              exploreTip: "选“石块（待测）”，拖滑块加砝码：看 m–V 图像的斜率——斜率就是它的密度。",
              widgets: [
                {
                  type: "mv-lab",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.PlotBoard */
                    engine: {
                      primitive: "PlotBoard", version: "2026.10.17.2",
                      params: { sourceKind: "points", materials: "stone", rhos: "2.6" }
                    },
                    
                    materials: [
                      { id: "stone", name: "石块（待测）", rho: 2.6, colorRole: "force-a" }
                    ],
                    mMax: 500, mInit: 200, step: 10,
                    unitM: "g", unitV: "cm³", unitRho: "g/cm³",
                    badge: {
                      quantityMathml: "<math><mi>&#961;</mi></math>",
                      invariant: "没变的是：石块的密度（变的是砝码质量→m–V 图像的点）"
                    },
                    source: { kind: "points", xLabel: "V/cm³", yLabel: "m/g", steps: ["slope"] }
                  }
                }
              ],
              point: "测密度的本质：量出一组 m、V，斜率 m/V 就是 ρ——第 2 页看真实实验怎么做。"
            },
            /* ---------- p2：讲解页（量筒使用；量筒读数量口上报为缺口） ---------- */
            {
              id: "p04.1.3-p2",
              kind: "explain",
              title: "量筒与实验顺序",
              blocks: [
                { type: "lead", text: "天平称质量（m），量筒量体积（V）——ρ = m/V 就有了。" },
                { type: "text", html: "量筒读数：<strong>视线跟凹液面最低处相平</strong>。俯视读数偏大、仰视偏小——跟温度计一个毛病（p03.1.1 第 2 页练过）。" },
                { type: "text", html: "测石块密度全流程：① 天平称石块质量 m；② 量筒倒适量水记 V₁；③ 石块浸没记 V₂，V = V₂ − V₁；④ ρ = m/V。<strong>顺序不能反</strong>：先测体积后测质量，石块沾水会让 m 偏大。" },
                { type: "trap", text: "⚠️ 别搞混：量筒俯视/仰视无所谓——错（俯视偏大、仰视偏小）；先测体积后测质量——错（水沾石块，质量偏大，误差分析）。" },
                { type: "slogan", text: "先质量后体积，视线要相平。" }
              ],
              point: "误差分析是实验的“第 ⑥ 步”（评估）：每一步都问“这会让结果偏大还是偏小”。"
            },
            /* ---------- p3：讲解页 ---------- */
            {
              id: "p04.1.3-p3",
              kind: "explain",
              title: "测液体密度",
              blocks: [
                { type: "lead", text: "测盐水密度：能直接把盐水倒进量筒量体积吗？能，但顺序有讲究。" },
                { type: "text", html: "测液体：① 烧杯 + 液体总质量 m₁；② 倒部分液体到量筒，体积 V；③ 剩下的称 m₂；④ ρ = (m₁ − m₂)/V。反例：“先量筒量 V，再倒回烧杯称”——错，液体沾量筒壁，体积偏小。" },
                { type: "text", html: "生活例：鉴别真假金饰——测密度是最快的一招（金的密度 19.3g/cm³，假货差得远）；次例：酒精度计、盐水选种（都是密度的应用，下一课展开）。" },
                { type: "slogan", text: "液体防沾壁，差值算质量。" }
              ],
              point: "记住“差值法”：m₁ − m₂ 就是倒出去的那部分——沾壁误差被差掉了。"
            }
          ]
        },
        {
          id: "p04.1.4",
          title: "密度的应用",
          prereq: "p04.1.3 测量物质的密度",
          time: "40–60 分钟",
          formulas: {
            rho: {
              mathml: "<math><mi>&#961;</mi><mo>=</mo><mfrac><mi>m</mi><mi>V</mi></mfrac></math>",
              translation: "密度 = 质量 ÷ 体积"
            }
          },
          pages: [
            /* ---------- p1：交互页（mv-lab 复用：鉴别未知金属块） ---------- */
            {
              id: "p04.1.4-p1",
              kind: "interact",
              title: "这块金属是谁？",
              exploreTip: "测“未知金属块”的 m–V 斜率，跟铁、铝的线比一比：它更靠近谁？",
              widgets: [
                {
                  type: "mv-lab",
                  params: {
/* 引擎批1（2026-10-17）：实现层切 Eng.PlotBoard */
                    engine: {
                      primitive: "PlotBoard", version: "2026.10.17.2",
                      params: { sourceKind: "points", materials: "unknown,iron,al", rhos: "8.9,7.9,2.7" }
                    },
                    
                    materials: [
                      { id: "unknown", name: "未知金属块", rho: 8.9, colorRole: "target" },
                      { id: "iron",    name: "铁（参考）", rho: 7.9, colorRole: "force-a" },
                      { id: "al",      name: "铝（参考）", rho: 2.7, colorRole: "force-c" }
                    ],
                    mMax: 1000, mInit: 400, step: 10,
                    unitM: "g", unitV: "cm³", unitRho: "g/cm³",
                    badge: {
                      quantityMathml: "<math><mi>&#961;</mi></math>",
                      invariant: "没变的是：每种材料的密度（变的是测哪块金属→它的 m–V 斜率）"
                    },
                    source: { kind: "points", xLabel: "V/cm³", yLabel: "m/g", steps: ["slope"] }
                  }
                },
                {
                  type: "formula-id",
                  params: {
                    formula: { mathml: "<math><mi>&#961;</mi><mo>=</mo><mfrac><mi>m</mi><mi>V</mi></mfrac></math>", translation: "密度 = 质量 ÷ 体积" },
                    conditions: ["同种物质", "状态、温度一定"],
                    counterexample: "蜡烛熔成蜡油：状态变了，“同种物质 ρ 一定”就失效",
                    dimension: "kg/m³ = kg ÷ m³ ✓",
                    units: { si: "kg/m³", common: "g/cm³", note: "1 g/cm³ = 1000 kg/m³" }
                  }
                },
              ],
              point: "未知金属块的线最陡，斜率约 8.9——查密度表，它是铜。密度是鉴别物质的“指纹”。"
            },
            /* ---------- p2：讲解页 ---------- */
            {
              id: "p04.1.4-p2",
              kind: "explain",
              title: "鉴别与空心问题",
              blocks: [
                { type: "lead", text: "第 1 页你当了一回“鉴宝师”：密度对上表，身份就定了。空心问题是“进阶考法”。" },
                { type: "text", html: "<strong>鉴别物质</strong>：测出 <span class=\"phy-f\" data-f=\"rho\"></span>，查密度表。生活例：王冠鉴别（阿基米德：排开水的体积鉴别王冠是否掺假）。" },
                { type: "text", html: "<strong>空心球判断</strong>（三招）：铁球 m=79g、V=15cm³。① 比密度：m/V=5.3<7.9，空心；② 比质量：实心应 118.5g，不够，空心；③ 比体积：79g 铁只占 10cm³，多 5cm³——空心体积 5cm³。"},
                { type: "trap", html: "⚠️ 别搞混：密度大的物体一定下沉——错！下沉看的是跟<strong>液体</strong>密度的比较（铁船能浮，因为平均密度小），不是绝对值。" },
                { type: "mathlink", text: "数学呼应：代数 ch01 一元一次方程（奠基）——空心体积设未知数 x，列方程求解。" },
                { type: "slogan", text: "比密度、比质量、比体积，三招判空心。" }
              ],
              point: "空心问题记住“三个比”：任选其一，算出矛盾，就是空心。"
            }
          ]
        },
        /* ---------- 章末：p04.1.0 章末小结与习题（回看比值定义第一落点，不新建） ---------- */
        {
          id: "p04.1.0",
          title: "章末小结与习题",
          prereq: "本章全部",
          time: "40–60 分钟",
          pages: [
            {
              id: "p04.1.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "① <strong>质量 m</strong>（标量，kg）：物体所含物质的多少，惯性量度，跟位置无关；天平：放平→归零→调平（<strong>左偏右调</strong>），左物右码，砝码 + 游码读数（<strong>估读到分度值下一位</strong>）。② <strong>密度 ρ=m/V</strong>（标量，SI <strong>kg/m³</strong>，常用 g/cm³，1g/cm³=1000kg/m³；条件：同种物质、状态温度一定）。③ <strong>回看·比值定义法第一落点</strong>（p04.1.2）：ρ 是 m–V 图像的“斜率”；m/V 是“量”密度的方法，不是“决定”它的原因——<strong>等号不代表因果</strong>；ρ 是物质的脾气，跟 m、V 无关。④ 测密度：天平称 m、量筒量 V（视线跟凹液面最低处相平，俯视偏大仰视偏小）；<strong>先测质量后测体积</strong>（防沾水）；液体用差值法。⑤ 应用：鉴别物质（查表）、空心球三招（比密度/比质量/比体积）；下沉看跟液体密度的比较。"
                }
              ],
              point: "回看红线：等号不代表因果——带着这句话去 p08.2.2 看 R=U/I 式陷阱再现。"
            },
            {
              id: "p04.1.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "天平调平时指针偏左，平衡螺母应该——",
                  options: ["向左调", "向右调", "不动"],
                  answer: 1,
                  tip: "左偏右调：指针偏左说明左边沉，螺母往右调。"
                },
                {
                  type: "choice",
                  stem: "一块铜块切去一半，剩下一半的密度——",
                  options: ["变为原来的一半", "变为原来的两倍", "不变"],
                  answer: 2,
                  tip: "ρ 是物质的脾气：切开的只是体积，脾气切不掉（p04.1.2 预防针）。"
                },
                {
                  type: "choice",
                  stem: "由 ρ=m/V 可知——",
                  options: ["ρ 与 m 成正比", "ρ 与 V 成反比", "ρ 是物质特性，与 m、V 无关"],
                  answer: 2,
                  tip: "等号不代表因果：m/V 是“量”密度的方法，不是“决定”它的原因。"
                },
                {
                  type: "fill",
                  stemBefore: "回 p04.1.2 公式卡：1 g/cm³ =",
                  stemAfter: "kg/m³",
                  answer: "1000",
                  accept: ["1000"],
                  hint: "（一千）",
                  tip: "p04.1.2 公式卡：1 g/cm³ = 1000 kg/m³——单位换算别丢 1000。"
                },
                {
                  type: "choice",
                  stem: "测石块密度时，正确的顺序是——",
                  options: ["先测体积后测质量", "先测质量后测体积", "顺序无所谓"],
                  answer: 1,
                  tip: "先测质量后测体积：石块沾水会让 m 偏大（误差分析）。"
                },
                {
                  type: "choice",
                  stem: "【估算】一间教室（长 10m、宽 6m、高 3m）里空气的质量约——（空气密度约 1.29kg/m³，数量级对即满分）",
                  options: ["约 2kg", "约 20kg", "约 200kg", "约 2000kg"],
                  answer: 2,
                  tip: "依据链：V = 10×6×3 = 180m³，m = 1.29×180 ≈ 232kg——10² 量级。空气看不见，但有分量！"
                }
              ],
              point: "本章完。下章 p05 力与运动：“力是改变运动状态的原因”——全书第一观念转折。"
            }
          ]
        }
      ]
    }
  ]
};
