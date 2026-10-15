/* ============================================================
 * 学习工具箱 · 物理 · 第五章数据（物理专家队+黄队 2026-10-15，批量生产批 2）
 *
 * schema v1.0（冻结，见 modules/physics/data/p04.js 文件头）逐字遵守；
 * 组件 API 以 modules/physics/data/WIDGETS.md v1.0 为准。
 * 本章：p05 力与运动（八下）——2 单元 / 8 课 / 21 页（实测）。
 * 全书级重点课：p05.2.1 牛顿第一定律。
 * 内容铁律：P-M1——删"力是运动的方向盘"类比，收尾用
 * "力不是维持运动的原因，是改变运动状态的原因"。
 * ============================================================ */
window.PHY_CH = window.PHY_CH || {};
window.PHY_CH["p05"] = {
  id: "p05",
  units: [
    {
      id: "p05.1",
      title: "力",
      lessons: [
        {
          id: "p05.1.1",
          title: "力的概念",
          prereq: "p00 导论",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p05.1.1-p1",
              kind: "interact",
              title: "不接触，也有力",
              exploreTip: "想象右边有一块磁铁：拖“F磁”箭头，改大小、改方向——不接触，铁钉照样受力。注意看：重力 G 的大小和方向始终不变。",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 45, size: 15, label: "铁钉" },
                    forces: [
                      { id: "g",  kind: "gravity", label: "G",   angleDeg: 270, mag: 10, fixed: true },
                      { id: "fm", kind: "custom",  label: "F磁", angleDeg: 0,   mag: 6, min: 0, max: 15 }
                    ],
                    showResultant: true, surface: "horizontal", unit: "N",
                    badge: { invariant: "没变的是：铁钉的质量（→重力不变）" }
                  }
                }
              ],
              point: "力是物体对物体的作用：磁铁没碰铁钉，力已经到了。箭头三要素——起点、方向、长度，一个都不能少。"
            },
            {
              id: "p05.1.1-p2",
              kind: "explain",
              title: "力是物体对物体的作用",
              blocks: [
                { type: "lead", text: "磁铁隔空吸住了铁钉——“力”没长手，是怎么“够”到铁钉的？" },
                { type: "text", html: "力是物体对物体的作用：施力物体（磁铁）、受力物体（铁钉）。力不能脱离物体单独存在——“铁钉有力”是病句，得说“磁铁对铁钉有力的作用”。" },
                { type: "text", html: "力的三要素：大小、方向、作用点。力的示意图就是一根箭头：起点是作用点、指向是方向、长度表示大小。" },
                { type: "trap", text: "⚠️ 别搞混：“力必须接触才能产生”——错，磁铁隔空吸铁钉；“力是物体拥有的属性”——错，力是两个物体之间的相互作用。" },
                { type: "mathlink", text: "数学呼应：几何 g01 有向线段（奠基）——力的图示就是一根有向线段，数学为物理打样。" },
                { type: "slogan", text: "无物体，不生力。" }
              ],
              point: "谈力说清“谁对谁”——施力物体和受力物体，一个不能少。"
            },
            {
              id: "p05.1.1-p3",
              kind: "explain",
              title: "力的作用效果",
              blocks: [
                { type: "lead", text: "力作用在物体上，物体会发生什么变化？" },
                { type: "text", html: "两个效果：① 使物体发生形变（弹簧拉长、铁钉被吸偏）；② 改变物体的运动状态（静止变运动、运动变静止、变速、转弯）。第 2 个效果，是 p05.2 的主角。" },
                { type: "text", html: "力的单位是牛顿（N）：1N 约等于托起两个鸡蛋的力。以后列式，力的大小永远带上 N。" },
                { type: "oldfriend", text: "预告：p05.2.1 牛顿第一定律——“改变运动状态”这五个字，是全书最重要的观念转折。" },
                { type: "slogan", text: "力有方向，别当“劲儿”。" }
              ],
              point: "力是矢量：只说“用了 10N 的力”却不说方向，等于没说全。"
            }
          ]
        },
        {
          id: "p05.1.2",
          title: "弹力与弹簧测力计",
          prereq: "p05.1.1 力的概念",
          time: "40–60 分钟",
          formulas: {
            hook: {
              mathml: '<math><mi>F</mi><mo>=</mo><mi>k</mi><mi>x</mi></math>',
              translation: "弹力 = 劲度系数 × 伸长量"
            }
          },
          pages: [
            {
              id: "p05.1.2-p1",
              kind: "interact",
              title: "拉过头，还成正比吗",
              exploreTip: "先猜：一直往下拉，F–x 的点永远走直线吗？再看图像：直线段的斜率是多少？",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "把弹簧一直往下拉，F–x 图像上的点会——",
                    options: ["永远走直线", "拉过头就弯掉"],
                    recordKey: "phy_guess_p05.1.2",
                    showAfter: "manual"
                  }
                },
                {
                  type: "graph-reader",
                  params: {
                    source: {
                      kind: "points",
                      points: [[0,0],[1,10],[2,20],[3,30],[4,40],[4.5,44],[5,47],[5.5,49],[6,50]],
                      xLabel: "x/cm", yLabel: "F/N", steps: ["slope"]
                    },
                    badge: { invariant: "没变的是：同一根弹簧（弹性限度内，k 不变）" }
                  }
                }
              ],
              point: "直线段的斜率就是 k；弯了的地方就是“过头”了——胡克定律只管直线段。"
            },
            {
              id: "p05.1.2-p2",
              kind: "explain",
              title: "胡克定律：有条件的正比",
              blocks: [
                { type: "lead", text: "第 1 页你亲眼看见：拉过头，线弯了。现在给“直线段”立法。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>F</mi><mo>=</mo><mi>k</mi><mi>x</mi></math>',
                    translation: "弹力 = 劲度系数 × 伸长量"
                  },
                  conditions: ["弹性限度内"],
                  counterexample: "拉过头：F–x 图像弯了，F=kx 失效——“成正比”是有保质期的",
                  dimension: "N = (N/m)·m ✓",
                  units: { si: "N", note: "k 的单位是 N/m；x 用 m，读数时注意 cm→m 换算" }
                },
                { type: "text", html: "弹性形变：撤去外力能完全恢复的形变。超过弹性限度，弹簧就“记仇”了——回不去，<span class=\"phy-f\" data-f=\"hook\"></span> 作废。" },
                { type: "trap", text: "⚠️ 别搞混：“弹性限度外仍成正比”——错！成正比是有条件的（审计清单第 3 条）：弹性限度内。" },
                { type: "mathlink", text: "数学呼应：代数 6.2 一次函数（奠基）——F–x 图像是过原点的直线，斜率就是 k。" },
                { type: "slogan", text: "过头不认账。" }
              ],
              point: "背 F=kx 之前先背条件：弹性限度内——这是“公式身份证”的规矩。"
            },
            {
              id: "p05.1.2-p3",
              kind: "explain",
              title: "弹簧测力计的使用",
              blocks: [
                { type: "lead", text: "F=kx 不只是公式——把它装进管子里，就是测力的尺子。" },
                { type: "text", html: "使用四步：① 校零（指针指零刻度）；② 认量程和分度值（绝不超量程）；③ 轻拉几下防卡壳；④ 读数时视线正对刻度。" },
                { type: "text", html: "原理就是胡克定律：弹簧伸长多少，力就是多少——“长度”替“力”当了翻译。" },
                { type: "trap", text: "⚠️ 别搞混：“超量程一点没关系”——错！超量程就是拉过头，弹簧“记仇”，测力计就废了。" },
                { type: "slogan", text: "先校零，后读数。" }
              ],
              point: "测力计测的是“拉力”——想测重力，得让物体静止吊着（这时 G=拉力）。"
            }
          ]
        },
        {
          id: "p05.1.3",
          title: "重力",
          prereq: "p05.1.2 弹力与弹簧测力计",
          time: "40–60 分钟",
          formulas: {
            grav: {
              mathml: '<math><mi>G</mi><mo>=</mo><mi>m</mi><mi>g</mi></math>',
              translation: "重力 = 质量 × g"
            }
          },
          pages: [
            {
              id: "p05.1.3-p1",
              kind: "interact",
              title: "斜面再陡，重力转吗",
              exploreTip: "看 G 箭头：斜面是斜的，G 还是笔直朝下。记住：重力大小方向不变。",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 45, size: 15, label: "木块" },
                    forces: [
                      { id: "g", kind: "gravity", label: "G", angleDeg: 270, mag: 10, fixed: true },
                      { id: "n", kind: "normal",  label: "N", angleDeg: 120, mag: 9,  fixed: true }
                    ],
                    showResultant: false, surface: "incline", inclineDeg: 30, unit: "N",
                    badge: { invariant: "没变的是：木块质量（→重力不变）" }
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "斜面倾角变大，重力的方向会——",
                    options: ["跟着斜面一起转", "始终竖直向下", "垂直于斜面"],
                    recordKey: "phy_guess_p05.1.3",
                    showAfter: "manual"
                  }
                }
              ],
              point: "重力永远竖直向下：斜面斜的是面，不是重力的方向。"
            },
            {
              id: "p05.1.3-p2",
              kind: "explain",
              title: "G=mg：质量的“重量版”",
              blocks: [
                { type: "lead", text: "质量是物体本身的“分量”，重力是地球给它的“拉力”——月球上 g 只有地球的约 1/6，同样的你轻得多。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>G</mi><mo>=</mo><mi>m</mi><mi>g</mi></math>',
                    translation: "重力 = 质量 × g"
                  },
                  conditions: ["同一地点 g 取定值"],
                  counterexample: "g 不是处处 9.8：纬度、高度变化，g 都有微小变化——“g 处处相等”是错的",
                  dimension: "N = kg·(N/kg) ✓",
                  units: { si: "N", note: "g=9.8N/kg：1kg 的物体受重力 9.8N" }
                },
                { type: "text", html: "方向：竖直向下（不是“垂直向下”，也不是“指向地心”——初中认准“竖直向下”）。应用：重垂线砌墙、检查桌面平不平。" },
                { type: "text", html: "重心：重力的等效作用点。形状规则、质量均匀的物体，重心在几何中心；均匀圆环的重心在圆心——不在环上！" },
                { type: "trap", text: "⚠️ 别搞混：“g=9.8N/kg 处处相等”——错，随纬度/高度变化；“重心一定在物体上”——错，圆环的重心在圆心。" }
              ],
              point: "质量是“分量”（kg），重力是“力”（N）——G=mg 是它们之间的翻译。"
            }
          ]
        }
      ]
    },
    {
      id: "p05.2",
      title: "运动和力",
      lessons: [
        {
          id: "p05.2.1",
          title: "牛顿第一定律",
          prereq: "p05.1.3 重力",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p05.2.1-p1",
              kind: "interact",
              title: "路面越光滑，滑得越远",
              exploreTip: "把摩擦力 f 从大往小拖：阻力越小，小车“自己滑”得越久（重力 G 大小方向不变）。再猜：路面完全光滑（想象），会怎样？",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 45, size: 15, label: "小车" },
                    forces: [
                      { id: "t", kind: "pull",     label: "T", angleDeg: 0,   mag: 8, min: 0, max: 20 },
                      { id: "f", kind: "friction", label: "f", angleDeg: 180, mag: 8 },
                      { id: "g", kind: "gravity",  label: "G", angleDeg: 270, mag: 10, fixed: true },
                      { id: "n", kind: "normal",   label: "N", angleDeg: 90,  mag: 10, fixed: true }
                    ],
                    showResultant: true, surface: "horizontal", unit: "N",
                    badge: { invariant: "没变的是：小车质量" }
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "如果路面完全光滑（只是想象），小车会怎样？",
                    options: ["一直滑下去，停不下来", "滑一会儿还是会停", "慢慢倒着滑回去"],
                    recordKey: "phy_guess_p05.2.1",
                    showAfter: "manual"
                  }
                }
              ],
              point: "阻力越小，运动保持得越久——“完全光滑”这一步，是想出来的。"
            },
            {
              id: "p05.2.1-p2",
              kind: "explain",
              title: "伽利略的理想实验",
              blocks: [
                { type: "lead", text: "毛巾→棉布→木板：路面越光滑，小车滑得越远。伽利略问：如果完全光滑呢？" },
                { type: "text", html: "这一步是“想”出来的，不是“做”出来的——但“想”有依据：每一步都比上一步滑得远。外推的结论：完全光滑时，小车永远滑下去，速度不变。（理想化说明：现实中做不出完全光滑，这是逻辑推理，不是瞎猜。）" },
                {
                  type: "widget",
                  widget: {
                    type: "side-compare",
                    params: {
                      left: { title: "亚里士多德（两千年的直觉）", rows: ["不推就不动", "力是维持运动的原因", "推桌子桌子停=力没了"] },
                      right: { title: "伽利略 / 牛顿", rows: ["阻力越小，保持运动越久", "力是改变运动状态的原因", "推桌子桌子停=摩擦力还在"] },
                      verdict: "桌子停下来，恰恰是因为有力（摩擦力）在改变它"
                    }
                  }
                },
                { type: "text", html: "牛顿第一定律：一切物体在没有受到外力作用时，总保持静止状态或匀速直线运动状态。" }
              ],
              point: "“想”出来的结论，证据是每一步都滑得更远——理想实验是逻辑推理。"
            },
            {
              id: "p05.2.1-p3",
              kind: "explain",
              title: "第一定律怎么读",
              blocks: [
                { type: "lead", text: "“总”“或”“没有受到外力”——每个词都是考点。" },
                { type: "text", html: "“总”：一直保持，不会自己变；“或”：原来静止的保持静止，原来运动的保持匀速直线运动——“保持”的是原来的状态。" },
                { type: "text", html: "“没有受到外力”是理想情况：现实中摩擦力躲不掉，所以第一定律是“想”出来的，但它是整个力学的大厦地基。" },
                { type: "mathlink", text: "数学呼应：代数 ch10 极限思想（奠基）——摩擦→0 的理想外推，是极限思想的物理原型。" },
                { type: "text", html: "收尾记住这句一辈子的话：力不是维持运动的原因，是改变运动状态的原因。" },
                { type: "slogan", text: "无外力，状态不变。" }
              ],
              point: "力不是维持运动的原因，是改变运动状态的原因——这句话，记一辈子。"
            }
          ]
        },
        {
          id: "p05.2.2",
          title: "惯性",
          prereq: "p05.2.1 牛顿第一定律",
          time: "40–60 分钟",
          formulas: {},
          pages: [
            {
              id: "p05.2.2-p1",
              kind: "interact",
              title: "急刹车，人往哪倒",
              exploreTip: "两个生活实验，先猜：是“人想往前”，还是“人保持原来的运动”？",
              widgets: [
                {
                  type: "guess-verify",
                  params: {
                    question: "汽车急刹车时，车里的人会——",
                    options: ["往前冲", "往后倒", "原地不动"],
                    recordKey: "phy_guess_p05.2.2a",
                    showAfter: "manual"
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "快速抽走杯子下的纸条，杯子会——",
                    options: ["跟着纸条飞走", "基本留在原地", "倒扣过来"],
                    recordKey: "phy_guess_p05.2.2b",
                    showAfter: "manual"
                  }
                }
              ],
              point: "人往前冲、杯子留下——都是“保持原来的运动状态”在作怪。"
            },
            {
              id: "p05.2.2-p2",
              kind: "explain",
              title: "惯性：物体的“倔脾气”",
              blocks: [
                { type: "lead", text: "刹车时人往前冲，不是“有力推你”——是你自己“不想停”。" },
                { type: "text", html: "惯性：一切物体都有保持原来运动状态不变的性质。静止的想一直静止，运动的想一直运动——这是物体的固有属性，“倔”是天生的。" },
                { type: "text", html: "解释惯性现象三步：① 原来什么状态；② 条件怎么变了；③ 物体保持原来状态，所以____。套进去：拍灰尘——灰尘原来静止，衣服动了，灰尘保持静止，就掉了。" },
                { type: "trap", text: "⚠️ 别搞混：“运动的物体才有惯性”——错，一切物体都有；“惯性是一种力”——错，惯性不是力，是性质。" },
                { type: "slogan", text: "惯性不是力，是脾气。" }
              ],
              point: "解释惯性题，永远三步：原来状态→条件变了→保持原来。"
            }
          ]
        },
        {
          id: "p05.2.3",
          title: "二力平衡",
          prereq: "p05.2.2 惯性",
          time: "40–60 分钟",
          formulas: {
            balance: {
              mathml: '<math><msub><mi>F</mi><mi>合</mi></msub><mo>=</mo><mn>0</mn></math>',
              translation: "合力为零"
            }
          },
          pages: [
            {
              id: "p05.2.3-p1",
              kind: "interact",
              title: "缺一个条件，就不平衡",
              exploreTip: "小车两边各挂钩码（拖 T1、T2）：等大、反向、共线——缺一个，看合力徽章说什么。（重力 G 大小方向不变）",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 45, size: 16, label: "小车" },
                    forces: [
                      { id: "t1", kind: "pull",    label: "T1", angleDeg: 0,   mag: 6, min: 0, max: 20 },
                      { id: "t2", kind: "pull",    label: "T2", angleDeg: 180, mag: 6, min: 0, max: 20 },
                      { id: "g",  kind: "gravity", label: "G",  angleDeg: 270, mag: 10, fixed: true },
                      { id: "n",  kind: "normal",  label: "N",  angleDeg: 90,  mag: 10, fixed: true }
                    ],
                    showResultant: true, surface: "horizontal", unit: "N",
                    badge: { invariant: "没变的是：小车质量" }
                  }
                }
              ],
              point: "T1=T2 且反向共线时，合力为零——小车“心如止水”。"
            },
            {
              id: "p05.2.3-p2",
              kind: "explain",
              title: "平衡状态与四条件",
              blocks: [
                { type: "lead", text: "吊灯静止、电梯匀速上升——“不动”和“匀速动”，都是平衡状态。" },
                { type: "text", html: "平衡状态：静止或匀速直线运动。二力平衡的四个条件：同体、等大、反向、共线——四个同时满足，缺一不可。" },
                { type: "text", html: "第 1 页你试过了：T1=T2 但不在一条线上，小车会转；大小不等，小车会跑——合力不为零，就不平衡。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><msub><mi>F</mi><mi>合</mi></msub><mo>=</mo><mn>0</mn></math>',
                    translation: "合力为零"
                  },
                  conditions: ["二力满足同体 / 等大 / 反向 / 共线"],
                  counterexample: "T1=T2 但不在同一直线：小车打转——“等大反向”不够，还得共线",
                  dimension: "N = N ✓",
                  units: { si: "N" }
                }
              ],
              point: "四条件是“且”的关系：同体、等大、反向、共线，一个不能少。"
            },
            {
              id: "p05.2.3-p3",
              kind: "explain",
              title: "初辨析：平衡力 vs 作用反作用",
              blocks: [
                { type: "lead", text: "吊灯的拉力 vs 灯拉绳的力——长得像，是亲兄弟吗？" },
                {
                  type: "widget",
                  widget: {
                    type: "side-compare",
                    params: {
                      left: { title: "平衡力", rows: ["作用在同一物体上", "等大、反向、共线", "可以抵消（合力为零）"] },
                      right: { title: "作用力与反作用力", rows: ["作用在两个物体上", "等大、反向、共线", "不能抵消（不在同一物体上）"] },
                      verdict: "看“几个物体”：同体是平衡力，异体是作用反作用"
                    }
                  }
                },
                { type: "text", html: "马拉车：马拉车的力 vs 车拉马的力，是作用反作用（两个物体）；车动不动，看车自己的受力——这是 p12.2.3 的“马拉车问题”，今天先记住“看几个物体”。" },
                { type: "oldfriend", text: "预告：p12.2.3 牛顿第三定律——今天这对“双胞胎”，高中回来再细辨（回填，批 3 兑现）。" },
                { type: "trap", text: "⚠️ 别搞混：“平衡力就是作用力与反作用力”——错！一个看“同体”，一个看“异体”。此处初辨析，p12.2.3 再辨析回填。" }
              ],
              point: "分不清就数物体：一个物体身上的叫平衡力，两个物体之间的叫作用反作用。"
            }
          ]
        },
        {
          id: "p05.2.4",
          title: "摩擦力",
          prereq: "p05.2.3 二力平衡",
          time: "40–60 分钟",
          formulas: {
            fric: {
              mathml: '<math><mi>f</mi><mo>=</mo><mi>&#956;</mi><mi>N</mi></math>',
              translation: "滑动摩擦力 = 动摩擦因数 × 压力"
            },
            staticf: {
              mathml: '<math><mi>f</mi><mo>≤</mo><mi>&#956;</mi><mi>N</mi></math>',
              translation: "静摩擦力 ≤ μN"
            }
          },
          pages: [
            {
              id: "p05.2.4-p1",
              kind: "interact",
              title: "拉力变大，摩擦力跟吗",
              exploreTip: "慢慢拖大拉力 T：f 跟着变吗？什么时候“跟不上了”？（重力 G 大小方向不变）",
              widgets: [
                {
                  type: "force-drag",
                  params: {
                    body: { x: 50, y: 45, size: 15, label: "木块" },
                    forces: [
                      { id: "t", kind: "pull",     label: "T", angleDeg: 0,   mag: 4, min: 0, max: 20 },
                      { id: "f", kind: "friction", label: "f", angleDeg: 180, mag: 4 },
                      { id: "g", kind: "gravity",  label: "G", angleDeg: 270, mag: 10, fixed: true },
                      { id: "n", kind: "normal",   label: "N", angleDeg: 90,  mag: 10, fixed: true }
                    ],
                    showResultant: true, surface: "horizontal", unit: "N",
                    badge: { invariant: "没变的是：木块质量" }
                  }
                },
                {
                  type: "guess-verify",
                  params: {
                    question: "传送带运货：货物随传送带一起向前，货物受的摩擦力方向——",
                    options: ["向前（是动力）", "向后（是阻力）", "不受摩擦力"],
                    recordKey: "phy_guess_p05.2.4",
                    showAfter: "manual"
                  }
                }
              ],
              point: "静摩擦跟着拉力变；拉过头，就变成滑动摩擦。"
            },
            {
              id: "p05.2.4-p2",
              kind: "explain",
              title: "滑动摩擦：f=μN",
              blocks: [
                { type: "lead", text: "第 1 页“跟不上”的那个点，叫最大静摩擦——过了它，就是滑动摩擦的地盘。" },
                {
                  type: "formula-id",
                  formula: {
                    mathml: '<math><mi>f</mi><mo>=</mo><mi>&#956;</mi><mi>N</mi></math>',
                    translation: "滑动摩擦力 = 动摩擦因数 × 压力"
                  },
                  conditions: ["限滑动摩擦"],
                  counterexample: "静摩擦用 f=μN 算就错了：静摩擦 ≤μN，是“被动”的，拉多大跟多大（不到上限）",
                  dimension: "N = 1×N ✓（μ 无单位）",
                  units: { si: "N", note: "μ 是动摩擦因数，无单位；N 是压力，不是重力" }
                },
                { type: "text", html: "影响因素（定性）：压力越大、接触面越粗糙，滑动摩擦越大。方向：与相对运动（或相对运动趋势）方向相反——注意，是“相对”。" },
                { type: "trap", text: "⚠️ 别搞混：“摩擦力方向与运动方向相反”——错！看相对运动趋势：走路时脚相对地面向后蹬，摩擦力向前——是动力。" }
              ],
              point: "f=μN 只管滑动摩擦：静摩擦是“被动”的，≤μN。"
            },
            {
              id: "p05.2.4-p3",
              kind: "explain",
              title: "摩擦力：亦敌亦友",
              blocks: [
                { type: "lead", text: "没有摩擦力，鞋带系不住、路也走不了——别只骂它。" },
                { type: "text", html: "阻力面：机器磨损、额外功（p07.3.2 的“额外功”就是它）；动力面：走路、传送带运货、汽车启动——靠的都是摩擦力。" },
                { type: "text", html: "增大 / 减小摩擦的方法：花纹鞋底（增大）、加润滑油、气垫（减小）——看它是敌是友。" },
                { type: "mathlink", text: "数学呼应：代数 6.1 图像（奠基）——f–F 图像：静摩擦段 f 跟着 F 长（斜率 1），到顶“躺平”成滑动摩擦。" }
              ],
              point: "判断摩擦力方向，永远先问：“相对”谁在动、往哪动？"
            }
          ]
        },
        {
          id: "p05.2.0",
          title: "本章小结与习题",
          prereq: "p05 全章",
          time: "40–60 分钟",
          formulas: {
            hook: {
              mathml: '<math><mi>F</mi><mo>=</mo><mi>k</mi><mi>x</mi></math>',
              translation: "弹力 = 劲度系数 × 伸长量"
            },
            grav: {
              mathml: '<math><mi>G</mi><mo>=</mo><mi>m</mi><mi>g</mi></math>',
              translation: "重力 = 质量 × g"
            },
            balance: {
              mathml: '<math><msub><mi>F</mi><mi>合</mi></msub><mo>=</mo><mn>0</mn></math>',
              translation: "合力为零"
            },
            fric: {
              mathml: '<math><mi>f</mi><mo>=</mo><mi>&#956;</mi><mi>N</mi></math>',
              translation: "滑动摩擦力 = 动摩擦因数 × 压力"
            }
          },
          pages: [
            {
              id: "p05.2.0-p1",
              kind: "quiz",
              title: "本章小结",
              questions: [
                {
                  type: "review",
                  html: "① <b>力的三要素</b>：大小、方向、作用点（箭头：起点 / 指向 / 长度）。② <b>胡克定律</b> <span class=\"phy-f\" data-f=\"hook\"></span>（弹性限度内）。③ <b>重力</b> <span class=\"phy-f\" data-f=\"grav\"></span>，方向竖直向下。④ <b>牛顿第一定律</b>：不受外力→静止或匀速直线运动；力是改变运动状态的原因。⑤ <b>惯性</b>：固有属性，不是力。⑥ <b>二力平衡</b>：同体 / 等大 / 反向 / 共线，<span class=\"phy-f\" data-f=\"balance\"></span>。⑦ <b>摩擦力</b>：<span class=\"phy-f\" data-f=\"fric\"></span> 限滑动摩擦；方向与相对运动趋势相反。"
                }
              ],
              point: "七句话收束本章：p06 压强与浮力——力要开始“压”东西了。"
            },
            {
              id: "p05.2.0-p2",
              kind: "quiz",
              title: "综合习题",
              questions: [
                {
                  type: "choice",
                  stem: "踢出去的足球在草地上越滚越慢，是因为——",
                  options: ["惯性消失了", "受到了摩擦力，它在改变足球的运动状态", "脚的力没了，所以停了"],
                  answer: 1,
                  tip: "力不是维持运动的原因，是改变运动状态的原因——让球停下的是摩擦力。"
                },
                {
                  type: "choice",
                  stem: "吊灯受到的重力和灯绳对灯的拉力是——",
                  options: ["一对平衡力", "一对作用力与反作用力"],
                  answer: 0,
                  tip: "数物体：两个力都在“灯”这一个物体身上——同体，是平衡力。"
                },
                {
                  type: "fill",
                  stemBefore: "胡克定律 F=kx 成立的前提是",
                  stemAfter: "",
                  answer: "弹性限度内",
                  accept: ["弹性限度以内", "在弹性限度内"],
                  hint: "（四个字：××××内）",
                  tip: "拉过头，F–x 图像就弯了——“成正比”是有保质期的。"
                },
                {
                  type: "choice",
                  stem: "公式 f=μN 可以用来算——",
                  options: ["静摩擦力", "滑动摩擦力", "两种摩擦力都行"],
                  answer: 1,
                  tip: "f=μN 限滑动摩擦；静摩擦是“被动”的，≤μN。"
                },
                {
                  type: "choice",
                  stem: "一切物体在不受外力作用时——",
                  options: ["一定静止", "保持静止或匀速直线运动", "慢慢停下来"],
                  answer: 1,
                  tip: "注意“或”字：原来静止的保持静止，原来运动的保持匀速直线运动。"
                },
                {
                  type: "choice",
                  stem: "快速抽走杯子下的纸条，杯子基本留在原地，说明——",
                  options: ["杯子有惯性", "纸条有惯性", "摩擦力很大"],
                  answer: 0,
                  tip: "杯子原来静止，惯性让它“不想动”——保持原来的运动状态。"
                },
                {
                  type: "choice",
                  stem: "【估算】一辆 1.5t 的小汽车从静止加速到 20m/s（约 72km/h）用了 10s，牵引力约——（数量级对即满分）",
                  options: ["约 300N", "约 3000N", "约 3×10⁴N", "约 3×10⁵N"],
                  answer: 1,
                  tip: "依据链：a = 20÷10 = 2m/s²，F = ma = 1500×2 = 3000N——10³ 量级。"
                }
              ],
              point: "错两道以上的，回 p05.2.1 重看“想出来的那一步”。"
            }
          ]
        }
      ]
    }
  ]
};
