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
                    materials: [
                      { id: "al",    name: "铝块", rho: 2.7, colorRole: "force-a" },
                      { id: "iron",  name: "铁块", rho: 7.9, colorRole: "target" },
                      { id: "water", name: "水",   rho: 1.0, colorRole: "force-c" }
                    ],
                    mMax: 1000, mInit: 400, step: 10,
                    unitM: "g", unitV: "cm³", unitRho: "g/cm³",
                    badge: {
                      quantityMathml: "<math><mi>&#961;</mi></math>",
                      invariant: "没变的是：密度（物质的脾气）"
                    },
                    /* Y4 口径：点列数据源；三读法本页只开"读斜率" */
                    source: { kind: "points", xLabel: "V/cm³", yLabel: "m/g", steps: ["slope"] }
                  }
                }
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
                { type: "lead", text: "第 1 页你亲手验证了：m 翻倍，V 也翻倍，ρ 纹丝不动。现在给它办“身份证”。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: "<math><mi>&#961;</mi><mo>=</mo><mfrac><mi>m</mi><mi>V</mi></mfrac></math>",
                    translation: "密度 = 质量 ÷ 体积"
                  },
                  conditions: ["同种物质", "状态、温度一定"],
                  counterexample: "蜡烛熔成蜡油：状态变了，ρ 跟着变——“同种物质 ρ 一定”这条就失效了",
                  dimension: "kg/m³ = kg ÷ m³ ✓",
                  units: { si: "kg/m³", common: "g/cm³", note: "1 g/cm³ = 1000 kg/m³" }
                },
                { type: "text", html: "比值定义 = 用两个量给第三个量「起名字」，不是说它俩决定它。密度是物质的脾气——脾气是它自己的，跟「量」它的人无关。（全书红线「比值定义法四辨析」第一落点：电阻、电场强度、电容还要再考三次。）" },
                { type: "trap", text: "⚠️ 别搞混：ρ 与 m 成正比、与 V 成反比——错。m 翻倍时 V 跟着翻倍，比值 m/V 不动；ρ 是物质的脾气。" },
                { type: "text", html: "正反比判定三步法：① 看公式里谁变了、谁跟着变；② 看「脾气」变没变；③ <span class=\"phy-f\" data-f=\"rui\"></span> 里，U 变 I 跟着变，R 动都不动——所以 R 与 U、I 无关。" },
                { type: "oldfriend", text: "认旧友：p08.2.2 电阻——<span class=\"phy-f\" data-f=\"rui\"></span> 式陷阱再现。带上今天这句“等号不代表因果”去。" },
                { type: "slogan", text: "等号不代表因果。" }
              ],
              point: "物理公式都是“有条件的真话”：背公式先背条件——这是公式身份证的规矩。"
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
                  tip: "列式永远带单位——审计清单第 1 条。"
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
              point: "下一站认旧友：p08.2.2 电阻——R=U/I 式陷阱再现，带上“等号不代表因果”去。"
            }
          ]
        }
      ]
    }
  ]
};
