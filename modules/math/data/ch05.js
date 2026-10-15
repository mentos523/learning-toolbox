/* ============================================================
 * 学习工具箱 · 数学 · 代数 第五章：不等式（21 页）
 *
 * 绿队课程体系（docs/math-algebra-curriculum.md 第五章 v2.0）。
 * 黄队教学流（docs/math-algebra-pedagogy.md 五条铁律）。
 *
 * 页面：u1-l1-p1 天平不平：不等号的来历（不等式的概念）
 *       u1-l1-p2 性质一：两边加减，方向不变
 *       u1-l1-p3 性质二三：乘除，负数要反向
 *       u1-l2-p1 一元一次不等式的解法：解集与数轴表示
 *       u1-l3-p1 一元一次不等式组：公共解集
 *       u2-l1-p1 二次不等式：抛物线在横轴上方（Δ>0）
 *       u2-l1-p2 Δ=0 与 Δ<0：相切与恒成立
 *       u2-l2-p1 含参数的二次不等式：分类讨论（★★★）
 *       u2-l3-p1 不等式的应用：周长固定，面积最大
 *       u2-l4-p1 本章小结：一图流
 * 交互复用已实现渲染器：slider-lab（label 均为纯变量名）/
 * side-compare（slider-lab 并排，sync 联动）/ linked-dashboard
 * （滑块 + 读数 + 坐标点）。无需新交互渲染器。
 * 前四批教训落实：
 *   - slider-lab label 全部用纯变量名（"x"/"a"/"k"），无中文括号
 *   - 未使用 balance-drag，无初始胜利条件问题
 *   - 定义完整：性质一/二/三分别给出完整表述与适用范围；
 *     5.1.2 注明"只有乘除负数时才反向"；二次不等式注明 Δ 条件
 *   - hints 每页 ≤ 2 条、总字数 ≤ 70 字（防 390px 裁剪）
 *   - 不等号方向：开口永远朝向大的一边；数轴表示：
 *     > / < 用空心圆圈，≥ / ≤ 用实心圆点，解集画成射线
 *
 * 黄队补充（2026-10-10）：每概念页配套讲解页（worked 例题一步步解）、数形结合图形页、章末习题页（5-8 道，只给题目+答案）。
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch05"] = {
  id: "ch05",
  title: "不等式",
  units: [
    {
      id: "ch05-u1",
      title: "一元一次不等式",
      lessons: [
        {
          id: "ch05-u1-l1",
          title: "不等式的性质",
          pages: [
            {
              id: "ch05-u1-l1-p1",
              title: "天平不平：不等号的来历",
              concept: "不等式的概念",
              formulas: [
                { id: "f1", latex: "7 > 5", translation: "7 大于 5：左边 7 克更重，天平向左倾" },
                { id: "f2", latex: "3 < 5", translation: "3 小于 5：右边 5 克更重，天平向右倾" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "x",
                  target: 5,
                  targetLabel: "另一边是 5"
                }
              },
              auxInteraction: null,
              hints: [
                "x=7比5大2，左边沉记作x>5；x=3还差2，右边沉记作x<5。",
                "不等号的开口永远朝向大的一边：> 和 < 是天平倾斜的画像。"
              ],
              examples: [ { text: "跷跷板：重的一边下沉，轻的一边翘起", figure: "滑块" } ],
              prev: null,
              next: "ch05-u1-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：不等式的概念",
              examples: [
                { figure: "生活实例", text: "身高 h>170：h 是 171、180……都行——解集是一整段。" }
              ],
              formulas: [
                { id: "f1", latex: "9 > 4", translation: "9 大于 4：开口朝 9，9 是大的一边" },
                { id: "f2", latex: "x + 2 < 9", translation: "x 加 2 小于 9：含未知数的不等式" },
                { id: "f3", latex: "2x + 1", translation: "没有不等号：只是代数式，不是 不等式" }
              ],
              hints: [
                "不等号开口永远朝大的一边：> 左边大，< 右边大。",
                "含未知数的不等式：解它就是找所有让它成立的 x。"
              ],
              id: "ch05-u1-l1-p1b",
              interaction: {
                params: {
                  expr: "x",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 1,
                  target: 5,
                  targetLabel: "另一边是 5"
                },
                type: "slider-lab"
              },
              title: "不等号：开口朝大的一边",
              prev: "ch05-u1-l1-p1",
              next: "ch05-u1-l1-p2"
            },
            {
              id: "ch05-u1-l1-p2",
              title: "两边加减，方向不变",
              concept: "不等式的性质一",
              formulas: [
                { id: "f1", latex: "5 < 8", translation: "5 小于 8：起点，左边比右边小 3" },
                { id: "f2", latex: "5 + a < 8 + a", translation: "5 加 a 小于 8 加 a：两边加同一个数 a，小的还是小的" }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: -5,
                      max: 5,
                      step: 1,
                      label: "a",
                      expr: "5 + a"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: -5,
                      max: 5,
                      step: 1,
                      label: "a",
                      expr: "8 + a"
                    }
                  },
                  sync: [ "a" ],
                  labels: [ "左边：5 + a", "右边：8 + a" ]
                }
              },
              auxInteraction: null,
              hints: [
                "性质一：不等式两边加（或减）同一个数，不等号的方向不变。",
                "5<8 两边都加 a：拖动滑块，左边永远比右边小 3。"
              ],
              examples: [
                { text: "天平两边同时加 2 个砝码，倾斜方向不变", figure: "并排对比" }
              ],
              prev: "ch05-u1-l1-p1b",
              next: "ch05-u1-l1-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：不等式的性质一",
              examples: [
                { figure: "变式练习", text: "x−3<5：两边同加 3 得 x<8（性质一，方向不变）。" }
              ],
              formulas: [
                { id: "f1", latex: "3 < 7", translation: "3 小于 7：起点" },
                { id: "f2", latex: "3 - 5 < 7 - 5", translation: "两边同减 5：−2<2，方向不变" },
                { id: "f3", latex: "x + 4 > 9 \\to x > 5", translation: "活用：x+4>9 两边同减 4 得 x>5" }
              ],
              hints: [
                "性质一：两边加减同一个数，不等号方向不变——小的还是小的。",
                "移项照样用：+4 过不等号变 −4，方向不用动。"
              ],
              id: "ch05-u1-l1-p2b",
              interaction: {
                params: {
                  labels: [ "左边：3+a", "右边：7+a" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "3 + a",
                      label: "a",
                      max: 5,
                      min: -5,
                      step: 1
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "7 + a",
                      label: "a",
                      max: 5,
                      min: -5,
                      step: 1
                    }
                  },
                  sync: [ "a" ]
                },
                type: "side-compare"
              },
              title: "性质一：加减方向不变",
              prev: "ch05-u1-l1-p2",
              next: "ch05-u1-l1-p3"
            },
            {
              id: "ch05-u1-l1-p3",
              title: "乘除负数，不等号反向",
              concept: "不等式的性质二、三",
              formulas: [
                { id: "f1", latex: "4 < 6", translation: "4 小于 6：起点" },
                { id: "f2", latex: "4k > 6k (k < 0)", translation: "k 小于 0 时 4k 大于 6k：两边乘同一个负数，不等号反向" }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: -2,
                      max: 2,
                      step: 1,
                      label: "k",
                      expr: "4 * k"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: -2,
                      max: 2,
                      step: 1,
                      label: "k",
                      expr: "6 * k"
                    }
                  },
                  sync: [ "k" ],
                  labels: [ "左边：4k", "右边：6k" ]
                }
              },
              auxInteraction: null,
              hints: [
                "性质二：乘除同一个正数，方向不变；性质三：乘除同一个负数，方向反转。",
                "4<6，k 取 −1：−4>−6——乘了负数，不等号翻了个面。"
              ],
              examples: [
                { text: "数轴翻转：乘 −1 相当于把数轴照镜子", figure: "并排对比" }
              ],
              prev: "ch05-u1-l1-p2b",
              next: "ch05-u1-l1-p3b"
            },
            {
              auxInteraction: null,
              concept: "讲解：不等式的性质二、三",
              examples: [
                { figure: "变式练习", text: "x/(−2)>3：两边同乘 −2 得 x<−6（反向！）。" }
              ],
              formulas: [
                { id: "f1", latex: "2 < 5", translation: "2 小于 5：起点" },
                { id: "f2", latex: "2 \\times (-3) > 5 \\times (-3)", translation: "两边同乘 −3：−6>−15，方向翻了" },
                { id: "f3", latex: "-2x > 6 \\to x < -3", translation: "活用：两边同除以 −2，不等号反向得 x<−3" }
              ],
              hints: [
                "只有乘除负数才反向：加减、乘除正数，方向都不变。",
                "−2x>6 得 x<−3：系数是负数，除过去必须翻面——第一易错点。"
              ],
              id: "ch05-u1-l1-p3b",
              interaction: {
                params: {
                  labels: [ "左边：2k", "右边：5k" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "2*k",
                      label: "k",
                      max: 2,
                      min: -2,
                      step: 1
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "5*k",
                      label: "k",
                      max: 2,
                      min: -2,
                      step: 1
                    }
                  },
                  sync: [ "k" ]
                },
                type: "side-compare"
              },
              title: "乘负数：不等号要翻面",
              prev: "ch05-u1-l1-p3",
              next: "ch05-u1-l2-p1"
            }
          ]
        },
        {
          id: "ch05-u1-l2",
          title: "一元一次不等式的解法",
          pages: [
            {
              id: "ch05-u1-l2-p1",
              title: "解集：满足条件的 x 全体",
              concept: "一元一次不等式的解集",
              formulas: [
                { id: "f1", latex: "2x + 1 > 7", translation: "2x 加 1 大于 7：待解的不等式" },
                { id: "f2", latex: "x > 3", translation: "x 大于 3：解集——所有满足条件的 x" },
                { id: "f3", latex: "(3, +\\infty)", translation: "3 到正无穷：数轴上是空心圆圈 3 加向右的射线" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "2*x + 1",
                  target: 7,
                  targetLabel: "边界：2x+1 = 7"
                }
              },
              auxInteraction: null,
              hints: [
                "像解方程一样移项、合并：2x+1>7 化成 2x>6，得 x>3。",
                "只有乘除负数时才反向；解集画数轴：> 空心圆圈，≥ 实心圆点，向右画射线。"
              ],
              examples: [ { text: "解集不是一个数，而是一整段数轴", figure: "滑块" } ],
              prev: "ch05-u1-l1-p3b",
              next: "ch05-u1-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：一元一次不等式的解法",
              examples: [
                { figure: "易错提醒", text: "−4x≥12：两边同除以 −4 得 x≤−3（反向！）。" }
              ],
              formulas: [
                { id: "f1", latex: "3x - 5 < 10", translation: "第一步：移项，3x<15（性质一，方向不变）" },
                { id: "f2", latex: "x < 5", translation: "第二步：两边同除以 3（正数，方向不变）" },
                { id: "f3", latex: "(-\\infty, 5)", translation: "解集：数轴上 5 处空心圈，向左画射线" }
              ],
              hints: [
                "解法和方程一样：移项、合并、系数化 1——只有乘除负数时多一步反向。",
                "解完画数轴：< 空心圈向左，> 空心圈向右；含等号用实心点。"
              ],
              id: "ch05-u1-l2-p1b",
              interaction: {
                params: {
                  expr: "3*x - 5",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 1,
                  target: 10,
                  targetLabel: "边界：3x−5=10"
                },
                type: "slider-lab"
              },
              title: "解集画数轴：空心实心",
              prev: "ch05-u1-l2-p1",
              next: "ch05-u1-l2-p1g"
            },
            {
              auxInteraction: null,
              concept: "图形：解集的数轴表示",
              examples: [
                { figure: "数形结合", text: "x≥2：2 处实心点，向右射线；x<1：1 处空心圈，向左射线。" }
              ],
              formulas: [
                { id: "f1", latex: "x > 3", translation: "解集：所有大于 3 的 x" },
                { id: "f2", latex: "(3, +\\infty)", translation: "数轴：3 处空心圆圈（3 不在内），向右画射线" }
              ],
              hints: [
                "拖 x：读数>0 时点落在射线上——解集就是这条射线上的所有点。",
                ">、< 空心圈（不含端点）；≥、≤ 实心点（含端点）。"
              ],
              id: "ch05-u1-l2-p1g",
              interaction: {
                params: {
                  source: {
                    initial: 4,
                    label: "x",
                    max: 10,
                    min: 0,
                    step: 0.5
                  },
                  views: [
                    { expr: "2*x + 1 - 7", kind: "readout", label: "2x+1−7" },
                    { kind: "point", xExpr: "x", yExpr: "0" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "解集在数轴上长什么样",
              prev: "ch05-u1-l2-p1b",
              next: "ch05-u1-l3-p1"
            }
          ]
        },
        {
          id: "ch05-u1-l3",
          title: "一元一次不等式组",
          pages: [
            {
              id: "ch05-u1-l3-p1",
              title: "公共解集：两段射线重叠处",
              concept: "不等式组的公共解集",
              formulas: [
                { id: "f1", latex: "x > 2", translation: "x 大于 2：第一个不等式的解集" },
                { id: "f2", latex: "x < 5", translation: "x 小于 5：第二个不等式的解集" },
                { id: "f3", latex: "2 < x < 5", translation: "2 小于 x 小于 5：两个解集的公共部分" }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "x",
                    min: 0,
                    max: 7,
                    step: 0.5,
                    initial: 3
                  },
                  views: [
                    { kind: "readout", expr: "x - 2", label: "x−2" },
                    { kind: "readout", expr: "5 - x", label: "5−x" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "先分开解：x>2 且 x<5；再取公共部分。",
                "两个读数同时大于 0 时 x 才合格——答案 2<x<5，是两段射线的重叠。"
              ],
              examples: [ { text: "两个条件都要满足：像同时通过两道安检", figure: "仪表盘" } ],
              prev: "ch05-u1-l2-p1g",
              next: "ch05-u1-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：一元一次不等式组",
              examples: [
                { figure: "变式练习", text: "x≥1 且 x<4：公共解集 1≤x<4（左实心右空心）。" }
              ],
              formulas: [
                { id: "f1", latex: "x + 1 > 4", translation: "第一个：x>3" },
                { id: "f2", latex: "2x < 10", translation: "第二个：x<5" },
                { id: "f3", latex: "3 < x < 5", translation: "公共部分：3<x<5" }
              ],
              hints: [
                "两步：先分开解出每个的解集，再取公共部分。",
                "无公共部分时写“无解”：比如 x>5 且 x<3。"
              ],
              id: "ch05-u1-l3-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 4,
                    label: "x",
                    max: 8,
                    min: 0,
                    step: 0.5
                  },
                  views: [
                    { expr: "x - 3", kind: "readout", label: "x−3" },
                    { expr: "5 - x", kind: "readout", label: "5−x" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "不等式组：分开解取公共",
              prev: "ch05-u1-l3-p1",
              next: "ch05-u2-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch05-u2",
      title: "一元二次不等式",
      lessons: [
        {
          id: "ch05-u2-l1",
          title: "二次不等式的图像解法",
          pages: [
            {
              id: "ch05-u2-l1-p1",
              title: "抛物线在横轴上方",
              concept: "二次不等式的图像解法",
              formulas: [
                { id: "f1", latex: "x^2 - 4 > 0", translation: "x 平方减 4 大于 0：待解的二次不等式" },
                { id: "f2", latex: "x < -2, x > 2", translation: "x 小于负 2 或 x 大于 2：抛物线在横轴上方的部分" }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "x",
                    min: -4,
                    max: 4,
                    step: 0.5,
                    initial: 0
                  },
                  views: [
                    { kind: "readout", expr: "x^2 - 4", label: "x²−4" },
                    { kind: "point", xExpr: "x", yExpr: "x^2 - 4" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "三步：解方程找交点 x=±2，画草图，取'上方'的 x 范围。",
                "拖动 x：读数为正时点在横轴上方——这些 x 就是 x²−4>0 的解。"
              ],
              examples: [ { text: "方程的解是交点，不等式的解是整段区间", figure: "仪表盘" } ],
              prev: "ch05-u1-l3-p1b",
              next: "ch05-u2-l1-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：二次不等式的图像解法",
              examples: [
                { figure: "变式练习", text: "x²−4<0：交点 ±2，开口向上，取中间：−2<x<2。" }
              ],
              formulas: [
                { id: "f1", latex: "x^2 - 5x + 6 < 0", translation: "第一步：解方程 x²−5x+6=0 得 x=2 或 3（交点）" },
                { id: "f2", latex: "\\text{开口向上}", translation: "第二步：a=1>0，开口向上" },
                { id: "f3", latex: "2 < x < 3", translation: "第三步：<0 取下方（两根之间）：2<x<3" }
              ],
              hints: [
                "三步：解方程找交点；看开口定形状；按不等号取上方/下方。",
                ">0 取上方（两边），<0 取下方（中间）——开口向上时。"
              ],
              id: "ch05-u2-l1-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 2.5,
                    label: "x",
                    max: 5,
                    min: 0,
                    step: 0.5
                  },
                  views: [
                    { expr: "x^2 - 5*x + 6", kind: "readout", label: "x²−5x+6" },
                    { kind: "point", xExpr: "x", yExpr: "x^2 - 5*x + 6" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "二次不等式：三步看图像",
              prev: "ch05-u2-l1-p1",
              next: "ch05-u2-l1-p2"
            },
            {
              id: "ch05-u2-l1-p2",
              title: "相切与恒成立",
              concept: "Δ=0 与 Δ<0 的二次不等式",
              formulas: [
                { id: "f1", latex: "x^2 + 2x + 1 > 0", translation: "x 平方加 2x 加 1 大于 0：判别式等于 0，抛物线与横轴相切" },
                { id: "f2", latex: "x \\neq -1", translation: "x 不等于负 1：除切点外，抛物线全在横轴上方" },
                {
                  id: "f3",
                  latex: "x^2 + x + 1 > 0",
                  translation: "x 平方加 x 加 1 大于 0：判别式小于 0 且开口向上，对一切实数 x 恒成立"
                }
              ],
              interaction: {
                type: "side-compare",
                params: {
                  left: {
                    kind: "slider-lab",
                    params: {
                      min: -3,
                      max: 1,
                      step: 0.5,
                      label: "x",
                      expr: "x^2 + 2*x + 1"
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      min: -3,
                      max: 3,
                      step: 0.5,
                      label: "x",
                      expr: "x^2 + x + 1"
                    }
                  },
                  sync: [ "x" ],
                  labels: [ "相切：x²+2x+1", "悬空：x²+x+1" ]
                }
              },
              auxInteraction: null,
              hints: [
                "Δ=0：抛物线与横轴相切，>0 的解是切点之外的所有 x。",
                "Δ<0：抛物线不碰横轴；开口向上则恒成立，开口向下则无解。"
              ],
              examples: [
                { text: "左边只在 x=−1 处碰到 0，右边永远碰不到 0", figure: "并排对比" }
              ],
              prev: "ch05-u2-l1-p1b",
              next: "ch05-u2-l1-p2b"
            },
            {
              auxInteraction: null,
              concept: "讲解：Δ=0 与 Δ<0 的二次不等式",
              examples: [
                { figure: "变式练习", text: "x²+2x+1≥0：Δ=0，解集为全体实数（切点 x=−1 也成立）。" }
              ],
              formulas: [
                { id: "f1", latex: "x^2 - 4x + 4 < 0", translation: "Δ=0：(x−2)²<0，平方不可能为负" },
                { id: "f2", latex: "\\text{无解}", translation: "除 x=2 时等于 0，其余都大于 0：<0 无解" },
                { id: "f3", latex: "x^2 + 1 > 0", translation: "Δ=−4<0，开口向上：恒成立，解集为全体实数" }
              ],
              hints: [
                "Δ=0 先想相切：>0 去掉切点，≥0 全体实数，<0 无解，≤0 只有切点。",
                "Δ<0 先看开口：向上+>0 恒成立，向下+<0 恒成立，反过来都无解。"
              ],
              id: "ch05-u2-l1-p2b",
              interaction: {
                params: {
                  labels: [ "相切：x²−4x+4", "悬空：x²+1" ],
                  left: {
                    kind: "slider-lab",
                    params: {
                      expr: "x^2 - 4*x + 4",
                      label: "x",
                      max: 5,
                      min: -1,
                      step: 0.5
                    }
                  },
                  right: {
                    kind: "slider-lab",
                    params: {
                      expr: "x^2 + 1",
                      label: "x",
                      max: 3,
                      min: -3,
                      step: 0.5
                    }
                  },
                  sync: [ "x" ]
                },
                type: "side-compare"
              },
              title: "Δ=0 与 Δ<0：先看判别式",
              prev: "ch05-u2-l1-p2",
              next: "ch05-u2-l2-p1"
            }
          ]
        },
        {
          id: "ch05-u2-l2",
          title: "含参数的二次不等式",
          pages: [
            {
              id: "ch05-u2-l2-p1",
              title: "参数 a：分类讨论",
              concept: "含参数二次不等式的分类讨论",
              formulas: [
                { id: "f1", latex: "(x-1)(x-a) < 0", translation: "x 减 1 乘 x 减 a 小于 0：两根是 1 和 a，大小关系不定" },
                { id: "f2", latex: "1 < x < a (a > 1)", translation: "a 大于 1 时：1 小于 x 小于 a，取两根之间" },
                {
                  id: "f3",
                  latex: "a < x < 1 (a < 1)",
                  translation: "a 小于 1 时：a 小于 x 小于 1；a=1 时 (x−1)²<0 无解"
                }
              ],
              interaction: {
                type: "linked-dashboard",
                params: {
                  source: {
                    label: "a",
                    min: -1,
                    max: 3,
                    step: 0.5,
                    initial: 2
                  },
                  views: [
                    { kind: "readout", expr: "a", label: "a" },
                    { kind: "readout", expr: "a - 1", label: "a−1" },
                    { kind: "point", xExpr: "a", yExpr: "0" }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "含参二次不等式：先看开口，再看两根大小，a>1、=1、<1 分三种。",
                "拖动 a 穿过 1：两根左右关系变了，解集跟着变；a=1 时无解。"
              ],
              examples: [
                { text: "a−1 的符号告诉你：a 在 1 的左边还是右边", figure: "仪表盘" }
              ],
              prev: "ch05-u2-l1-p2b",
              next: "ch05-u2-l2-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：含参数的二次不等式",
              examples: [
                { figure: "变式练习", text: "(x−1)(x−a)<0（a>1）：取中间，1<x<a。" }
              ],
              formulas: [
                { id: "f1", latex: "(x - 2)(x - a) > 0", translation: "两根 2 和 a；>0 取两边" },
                {
                  id: "f2",
                  latex: "a > 2: x < 2 \\text{ 或 } x > a",
                  translation: "a>2 时：小的在左，解 x<2 或 x>a"
                },
                {
                  id: "f3",
                  latex: "a < 2: x < a \\text{ 或 } x > 2",
                  translation: "a<2 时反过来；a=2 时 (x−2)²>0 得 x≠2"
                }
              ],
              hints: [
                "分类标准：两根谁大谁小——a>2、a=2、a<2 三种。",
                "a=2 最容易漏：(x−2)²>0 的解是 x≠2，不是无解！"
              ],
              id: "ch05-u2-l2-p1b",
              interaction: {
                params: {
                  source: {
                    initial: 3,
                    label: "a",
                    max: 4,
                    min: 0,
                    step: 0.5
                  },
                  views: [
                    { expr: "a", kind: "readout", label: "a" },
                    { expr: "a - 2", kind: "readout", label: "a−2" }
                  ]
                },
                type: "linked-dashboard"
              },
              title: "含参讨论：按大小分类",
              prev: "ch05-u2-l2-p1",
              next: "ch05-u2-l3-p1"
            }
          ]
        },
        {
          id: "ch05-u2-l3",
          title: "不等式的应用",
          pages: [
            {
              id: "ch05-u2-l3-p1",
              title: "周长固定，面积最大",
              concept: "不等式求最值",
              formulas: [
                {
                  id: "f1",
                  latex: "x(10-x) \\leq 25",
                  translation: "x 乘 10 减 x 小于等于 25：长加宽为 10 时，面积不超过 25"
                },
                { id: "f2", latex: "x = 5", translation: "x 等于 5 时取到 25：长=宽=5，正方形面积最大" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: 0,
                  max: 10,
                  step: 1,
                  label: "x",
                  expr: "x*(10-x)",
                  target: 25,
                  targetLabel: "最大值 25"
                }
              },
              auxInteraction: null,
              hints: [
                "设长为 x、宽为 10−x：拖滑块，找面积 x(10−x) 的最大值。",
                "结论：x=5 时面积最大 25——周长固定，正方形面积最大。"
              ],
              examples: [
                { text: "用 20 米篱笆围矩形菜地，怎么围面积最大？", figure: "滑块" }
              ],
              prev: "ch05-u2-l2-p1b",
              next: "ch05-u2-l3-p1b"
            },
            {
              auxInteraction: null,
              concept: "讲解：不等式求最值",
              examples: [
                { figure: "生活实例", text: "周长 20 的矩形：x(10−x)≤25，正方形时面积最大。" }
              ],
              formulas: [
                { id: "f1", latex: "x(12 - x)", translation: "设一边 x，另一边 12−x（周长 24）" },
                { id: "f2", latex: "x(12 - x) = 36 - (x - 6)^2", translation: "配方：36−(x−6)²" },
                { id: "f3", latex: "x = 6", translation: "平方项 ≥0：x=6 时面积最大 36，是正方形" }
              ],
              hints: [
                "和固定的两数，越接近乘积越大：配方一眼看出最大值。",
                "x(12−x)=36−(x−6)²≤36：平方项非负，减它越小值越大。"
              ],
              id: "ch05-u2-l3-p1b",
              interaction: {
                params: {
                  expr: "x*(12-x)",
                  label: "x",
                  max: 12,
                  min: 0,
                  step: 1,
                  target: 36,
                  targetLabel: "最大值 36"
                },
                type: "slider-lab"
              },
              title: "最值应用：和定积最大",
              prev: "ch05-u2-l3-p1",
              next: "ch05-u2-l4-p1"
            }
          ]
        },
        {
          id: "ch05-u2-l4",
          title: "本章小结",
          pages: [
            {
              id: "ch05-u2-l4-p1",
              title: "一图流：先找分界点",
              concept: "本章知识串联",
              formulas: [
                { id: "f1", latex: "ax + b > 0", translation: "一次不等式：解集是数轴上的一条射线" },
                { id: "f2", latex: "ax^2 + bx + c > 0", translation: "二次不等式：抛物线在横轴上方（>0）的 x 范围" }
              ],
              interaction: {
                type: "slider-lab",
                params: {
                  min: -2,
                  max: 5,
                  step: 1,
                  label: "x",
                  expr: "x^2 - 3*x + 2",
                  target: 0,
                  targetLabel: "分界点（=0）"
                }
              },
              auxInteraction: null,
              hints: [
                "路线：不等号意义 → 三条性质（乘负反向是易错点）→ 解集画数轴 → 二次看抛物线。",
                "万能第一步：先解'等于'找分界点，再看不等号取哪一边。"
              ],
              examples: [
                { text: "x²−3x+2>0：分界点 x=1 和 2，取两边", figure: "滑块" }
              ],
              prev: "ch05-u2-l3-p1b",
              next: "ch05-ux-l1-p1"
            }
          ]
        }
      ]
    },
    {
      id: "ch05-ux",
      title: "本章习题",
      lessons: [
        {
          id: "ch05-ux-l1",
          title: "第五章习题",
          pages: [
            {
              auxInteraction: null,
              concept: "本章习题",
              examples: [
                {
                  figure: "核对答案",
                  text: "答案：1．>；2．x>12；3．x>−3；4．1<x≤4；5．x<−3 或 x>3；6．25 平方米"
                }
              ,
                { figure: "错因解析", text: "1．−3 在数轴上比 −5 更靠右：−3>−5。2．两边加 7：x>12。3．两边除以 −3：不等号反向，x>−3——除以负数必须反向。4．两个条件同时成立：1<x≤4。5．x²>9：|x|>3——x<−3 或 x>3。6．面积=x(10−x)=−x²+10x，顶点 x=5 时最大 25——正方形面积最大。" }],
              formulas: [
                { id: "f1", latex: "x(10 - x) \\leq 25", translation: "第 6 题：x=5 时取最大值 25（正方形）" }
              ],
              hints: [
                "1．用不等号填空：−3____−5。",
                "2．x−7>5 的解集是____。",
                "3．−3x<9 的解集是____。",
                "4．不等式组 x>1 且 x≤4 的解集是____。",
                "5．x²−9>0 的解集是____。",
                "6．周长 20 米的矩形，长 x 米宽 (10−x) 米，面积最大是____平方米。"
              ],
              id: "ch05-ux-l1-p1",
              interaction: {
                params: {
                  expr: "x*(10-x)",
                  label: "x",
                  max: 10,
                  min: 0,
                  step: 1,
                  target: 25,
                  targetLabel: "最大值 25（第 6 题）"
                },
                type: "slider-lab"
              },
              title: "第五章习题：不等式",
              prev: "ch05-u2-l4-p1",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
