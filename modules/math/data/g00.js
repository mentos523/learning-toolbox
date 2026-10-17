/* ============================================================
 * 学习工具箱 · 数学 · 几何 g00：导论——几何是什么
 *
 * 黄队（教育教学专家）首批生产：4 课 / 10 页。
 * 课程体系：docs/math-geometry-curriculum.md（g00 章）
 * 教学设计：docs/math-geometry-pedagogy.md v1.1
 * 参数手册：docs/math-geometry-params.md v1.1
 * 视觉规范：docs/math-geometry-style.md（Okabe-Ito + 双编码）
 *
 * 页构成：g00.1.1 概念+交互 / g00.1.2 概念+交互 /
 *         g00.1.3 概念+交互+讲解 / g00.1.4 概念+交互+习题
 * 交互类型：step-play / compare-toggle / vertex-drag / tap-highlight
 * （params 只用语义色名，不出现具体色值；逻辑坐标 0–100，y 向上）
 * ============================================================ */
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["g00"] = {
  id: "g00",
  title: "导论——几何是什么",
  units: [
    {
      id: "g00-u1",
      title: "几何的直觉",
      lessons: [
        {
          id: "g00-u1-l1",
          title: "几何是什么：从丈量土地说起",
          pages: [
            {
              id: "g00-u1-l1-p1",
              title: "几何：从丈量土地开始",
              concept: "几何研究的对象",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{几何} = \\text{研究形状、大小、位置}",
                  translation: "几何：研究形状、大小和位置的学问"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：生活中的桌子——有颜色、有木纹、有阴影。",
                      shapes: [
                        { t: "poly", pts: [[28,58],[72,58],[72,50],[28,50]], color: "line", width: 3 },
                        { t: "seg", a: [34,50], b: [34,30], color: "line", width: 2.5 },
                        { t: "seg", a: [66,50], b: [66,30], color: "line", width: 2.5 },
                        { t: "txt", p: [50,68], text: "桌子：有颜色、有木纹", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：抽掉颜色、木纹、阴影，只剩骨架。",
                      shapes: [
                        { t: "poly", pts: [[28,58],[72,58],[72,50],[28,50]], color: "line", width: 3 },
                        { t: "seg", a: [34,50], b: [34,30], color: "line", width: 2.5 },
                        { t: "seg", a: [66,50], b: [66,30], color: "line", width: 2.5 },
                        { t: "txt", p: [50,68], text: "抽掉颜色、木纹、阴影", size: 13 }
                      ]
                    },
                    {
                      caption: "第 3 步：几何眼中的桌子——只剩下形状和大小。",
                      shapes: [
                        { t: "poly", pts: [[35,55],[65,55],[65,35],[35,35]], color: "line", width: 3 },
                        { t: "poly", pts: [[45,63],[75,63],[75,43],[45,43]], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [35,55], b: [45,63], color: "aux", width: 2 },
                        { t: "seg", a: [65,55], b: [75,63], color: "aux", width: 2 },
                        { t: "seg", a: [65,35], b: [75,43], color: "aux", width: 2 },
                        { t: "seg", a: [35,35], b: [45,43], color: "aux", width: 2 },
                        { t: "txt", p: [50,74], text: "长方体：只有形状和大小", size: 13 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "两千多年前，尼罗河泛滥冲掉田界，古埃及人重新丈量土地——“几何”就是“丈量土地”。",
                "几何只关心三件事：长什么样（形状）、有多大（大小）、在哪里（位置）。",
                "颜色、木纹、轻重，几何全不关心——抽掉生活外衣，留下形状大小。"
              ],
              examples: [
                { text: "田界丈量：尼罗河泛滥后重划田界", figure: "历史" }
              ],
              prev: null,
              next: "g00-u1-l1-p2"
            },
            {
              id: "g00-u1-l1-p2",
              title: "同一件几何衣，多件生活外衣",
              concept: "几何抽象",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{长方体}",
                  translation: "几何骨架：长方体"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "生活外衣",
                      caption: "桌子：木头做的、棕色的、有抽屉——这些，几何都不关心。",
                      shapes: [
                        { t: "poly", pts: [[28,58],[72,58],[72,50],[28,50]], color: "line", width: 3 },
                        { t: "seg", a: [34,50], b: [34,30], color: "line", width: 2.5 },
                        { t: "seg", a: [66,50], b: [66,30], color: "line", width: 2.5 },
                        { t: "txt", p: [50,68], text: "木头做的、棕色的", size: 13 }
                      ]
                    },
                    {
                      label: "几何骨架",
                      caption: "长方体：长 120、宽 60、高 75（厘米）——几何只关心形状和大小。",
                      shapes: [
                        { t: "poly", pts: [[35,55],[65,55],[65,35],[35,35]], color: "known", width: 3 },
                        { t: "poly", pts: [[45,63],[75,63],[75,43],[45,43]], color: "aux", width: 2, dash: "5,4" },
                        { t: "seg", a: [35,55], b: [45,63], color: "aux", width: 2 },
                        { t: "seg", a: [65,55], b: [75,63], color: "aux", width: 2 },
                        { t: "seg", a: [65,35], b: [75,43], color: "aux", width: 2 },
                        { t: "seg", a: [35,35], b: [45,43], color: "aux", width: 2 },
                        { t: "txt", p: [50,28], text: "120", size: 13, color: "known" },
                        { t: "txt", p: [82,53], text: "60", size: 13, color: "known" },
                        { t: "txt", p: [27,45], text: "75", size: 13, color: "known" }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点“生活外衣”：有颜色、有材质，像一张照片。",
                "点“几何骨架”：颜色材质全抽掉，只剩长方体和三个数。",
                "同一个长方体，可以是桌子、纸箱、大楼——“几何衣服”能穿很多件“生活外衣”。"
              ],
              examples: [
                { text: "纸箱和大楼：外衣不同，骨架都是长方体", figure: "实物" }
              ],
              prev: "g00-u1-l1-p1",
              next: "g00-u1-l2-p1"
            }
          ]
        },
        {
          id: "g00-u1-l2",
          title: "点、线、面、体：维度的直觉",
          pages: [
            {
              id: "g00-u1-l2-p1",
              title: "点动成线，线动成面，面动成体",
              concept: "维度直觉",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{点} \\to \\text{线} \\to \\text{面} \\to \\text{体}",
                  translation: "点运动成线，线运动成面，面运动成体"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：一个点——它没有大小，只有位置。",
                      shapes: [
                        { t: "pt", p: [50,50], r: 4, color: "known" },
                        { t: "txt", p: [50,64], text: "点：只有位置，没有大小", size: 13 }
                      ]
                    },
                    {
                      caption: "第 2 步：点动起来，拉出一条线——像流星划过夜空。",
                      shapes: [
                        { t: "seg", a: [15,50], b: [85,50], color: "line", width: 3 },
                        { t: "pt", p: [15,50], r: 4, color: "known" },
                        { t: "txt", p: [50,64], text: "点动成线", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "第 3 步：线动起来，扫出一张面——像雨刷扫过车窗。",
                      shapes: [
                        { t: "poly", pts: [[15,50],[85,50],[85,30],[15,30]], color: "corrA", width: 2, fill: "corrA", opacity: 0.35 },
                        { t: "seg", a: [15,50], b: [85,50], color: "line", width: 3 },
                        { t: "txt", p: [50,64], text: "线动成面", size: 14.48, bold: true }
                      ]
                    },
                    {
                      caption: "第 4 步：面动起来，堆出一个体——像一摞纸摞成一本书。",
                      shapes: [
                        { t: "poly", pts: [[25,44],[75,44],[75,51],[25,51]], color: "line", width: 2 },
                        { t: "poly", pts: [[25,51],[75,51],[75,58],[25,58]], color: "line", width: 2 },
                        { t: "poly", pts: [[25,58],[75,58],[75,65],[25,65]], color: "line", width: 2 },
                        { t: "txt", p: [50,78], text: "面动成体", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点动成线：夜空的星星连成星座，就是点连成了线。",
                "线动成面：雨刷扫过，车窗上出现一片干净的“面”。",
                "面动成体：一张张纸摞起来，变成一本有厚度的书。",
                "每一步都多一个“能动的方向”——方向数，就是维度。"
              ],
              examples: [
                { text: "星座连线、雨刷、摞纸：维度就在生活里", figure: "实物" }
              ],
              prev: "g00-u1-l1-p2",
              next: "g00-u1-l2-p2"
            },
            {
              id: "g00-u1-l2-p2",
              title: "拖一拖：变的是大小，不变的是“面”",
              concept: "二维图形",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三角形是二维的面}",
                  translation: "三角形是二维图形：永远是一张平平的“面”"
                }
              ],
              interaction: {
                type: "vertex-drag",
                params: {
                  vertices: [
                    { x: 20, y: 75, label: "A" },
                    { x: 80, y: 75, label: "B" },
                    { x: 55, y: 25, label: "C" }
                  ],
                  showLengths: true,
                  showAngles: true
                }
              },
              auxInteraction: null,
              hints: [
                "拖动蓝色顶点 A、B、C：边长和角度一直在变。",
                "只要三个点不共线，它永远是一张平平的“面”——这就是二维。",
                "故意把三个点拖到同一条线上试试：三角形会被“压扁”成一条线段，面积变成 0——这叫退化情形。",
                "记住：变化的是形状大小；不退化时，不变的是“它是二维的面”。"
              ],
              examples: [
                { text: "吹气球：气球变大，表面永远是“面”", figure: "实物" }
              ],
              prev: "g00-u1-l2-p1",
              next: "g00-u1-l3-p1"
            }
          ]
        },
        {
          id: "g00-u1-l3",
          title: "图形会说话：直观证明",
          pages: [
            {
              id: "g00-u1-l3-p1",
              title: "三个角拼一拼，会发生什么？",
              concept: "拼图即证明",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三个角拼起来} = 180\\text{度}",
                  translation: "三个角拼成一条直线，一条直线是 180 度"
                }
              ],
              interaction: {
                type: "morph-toggle",
                params: {
                  views: [
                    {
                      label: "三个角分开",
                      caption: "三角形的三个角：∠1、∠2、∠3，各待各的位置。",
                      shapes: [
                        {
                          t: "poly",
                          pts: [ [ 20, 70 ], [ 80, 70 ], [ 50, 27.14 ] ],
                          color: "line",
                          width: 3
                        },
                        {
                          t: "arc",
                          v: [ 20, 70 ],
                          a1: -55,
                          a2: 0,
                          r: 10,
                          group: 1,
                          color: "corrAngle"
                        },
                        {
                          t: "arc",
                          v: [ 80, 70 ],
                          a1: 180,
                          a2: 235,
                          r: 10,
                          group: 2,
                          color: "corrAngle"
                        },
                        {
                          t: "arc",
                          v: [ 50, 27.14 ],
                          a1: 55,
                          a2: 125,
                          r: 10,
                          group: 3,
                          color: "corrAngle"
                        },
                        {
                          t: "txt",
                          p: [ 31, 61 ],
                          text: "∠1",
                          size: 13
                        },
                        {
                          t: "txt",
                          p: [ 69, 61 ],
                          text: "∠2",
                          size: 13
                        },
                        {
                          t: "txt",
                          p: [ 50, 40 ],
                          text: "∠3",
                          size: 13
                        }
                      ]
                    },
                    {
                      label: "拼成一条直线",
                      caption: "把三个角撕下来，顶点拼到一起——正好拼成一条直线！",
                      shapes: [
                        {
                          t: "seg",
                          a: [ 20, 45 ],
                          b: [ 80, 45 ],
                          color: "line",
                          width: 3
                        },
                        {
                          t: "arc",
                          v: [ 50, 45 ],
                          a1: 0,
                          a2: 55,
                          r: 10,
                          group: 1,
                          color: "corrAngle"
                        },
                        {
                          t: "arc",
                          v: [ 50, 45 ],
                          a1: 55,
                          a2: 125,
                          r: 12,
                          group: 2,
                          color: "corrAngle"
                        },
                        {
                          t: "arc",
                          v: [ 50, 45 ],
                          a1: 125,
                          a2: 180,
                          r: 14,
                          group: 3,
                          color: "corrAngle"
                        },
                        {
                          t: "txt",
                          p: [ 50, 28 ],
                          text: "180°",
                          size: 14.48,
                          bold: true
                        }
                      ]
                    }
                  ],
                  morph: {
                    kind: "assemble",
                    durationMs: 1400,
                    pairs: [ [ 1, 1 ], [ 2, 2 ], [ 3, 3 ] ],
                    stagger: 0.15,
                    readout: {
                      template: "∠1+∠2+∠3 = {v}°",
                      from: 0,
                      to: 180,
                      decimals: 0
                    }
                  },
                  controls: {
                    play: true,
                    scrub: true,
                    step: true,
                    replay: true
                  }
                },
                engine: {
                  primitive: "MorphToggle",
                  version: "2026.10.16.A",
                  params: {
                    kind: "assemble"
                  }
                }
              },
              auxInteraction: null,
              hints: [
                "看左图：三个角各待各的位置。",
                "点“拼成一条直线”：把三个角撕下来拼到一起——严丝合缝！",
                "一条直线是 180°，所以三个角加起来就是 180°。",
                "拼的动作不依赖三角形的样子，拼一次就够了——这就是证明的雏形。"
              ],
              examples: [
                { text: "剪纸片：剪下纸三角形的三个角拼一拼", figure: "实测" }
              ],
              prev: "g00-u1-l2-p2",
              next: "g00-u1-l3-p2"
            },
            {
              id: "g00-u1-l3-p2",
              title: "亲手拼一次：撕角拼平角",
              concept: "撕角拼角",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{拼成的直线} = 180\\text{度}",
                  translation: "三个角拼成平角，就是 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：完整的三角形，三个角都在。",
                      shapes: [
                        { t: "poly", pts: [[20,70],[80,70],[50,27.14]], color: "line", width: 3 },
                        { t: "arc", v: [20,70], a1: -55, a2: 0, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [80,70], a1: 180, a2: 235, r: 10, group: 2, color: "corrAngle" },
                        { t: "arc", v: [50,27.14], a1: 55, a2: 125, r: 10, group: 3, color: "corrAngle" }
                      ]
                    },
                    {
                      caption: "第 2 步：把三个角撕下来，顶点拼到一起。",
                      shapes: [
                        { t: "poly", pts: [[20,70],[80,70],[50,27.14]], color: "line", width: 1.5, dash: "5,4" },
                        { t: "arc", v: [50,45], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 55, a2: 125, r: 12, group: 2, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 125, a2: 180, r: 14, group: 3, color: "corrAngle" },
                        { t: "seg", a: [28,45], b: [72,45], color: "aux", dash: "5,4" }
                      ]
                    },
                    {
                      caption: "第 3 步：三个角拼成一条直线——内角和是 180°。",
                      shapes: [
                        { t: "seg", a: [20,45], b: [80,45], color: "line", width: 3 },
                        { t: "arc", v: [50,45], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 55, a2: 125, r: 12, group: 2, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 125, a2: 180, r: 14, group: 3, color: "corrAngle" },
                        { t: "txt", p: [50,28], text: "三个角拼成平角", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点 ▶ 播放：看三个角被“撕”下来。",
                "点 ◀ 倒回去，再看一遍“飞过去”的过程。",
                "拖进度条，停在刚拼好的那一帧：三个角拼成了一条直线。",
                "动手试：拿纸剪个三角形，撕下三个角拼一拼——你也能拼出 180°。"
              ],
              examples: [
                { text: "纸飞机：折出来的角也能这样拼", figure: "实测" }
              ],
              prev: "g00-u1-l3-p1",
              next: "g00-u1-l3-p3"
            },
            {
              id: "g00-u1-l3-p3",
              title: "拼图为什么算证明？",
              pageKind: "explain",
              concept: "拼图证明",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{三角形内角和} = 180\\text{度}",
                  translation: "三角形三个内角加起来是 180 度"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  steps: [
                    {
                      caption: "定格：三个角拼成一条直线——180°。",
                      shapes: [
                        { t: "seg", a: [20,45], b: [80,45], color: "line", width: 3 },
                        { t: "arc", v: [50,45], a1: 0, a2: 55, r: 10, group: 1, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 55, a2: 125, r: 12, group: 2, color: "corrAngle" },
                        { t: "arc", v: [50,45], a1: 125, a2: 180, r: 14, group: 3, color: "corrAngle" },
                        { t: "txt", p: [50,28], text: "三个角拼成平角", size: 15, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得吗？上一页你亲手拼过：三个角拼到一起，正好是一条直线——三个角加起来是 180°。",
                "拼图证明，就是“把要证的结论拼出来”：三个角拼成一条直线（180°），所以三角形三个内角的和是 180°。",
                "生活例：七巧板拼正方形——拼出来了，就说明面积相等。",
                "图形例：两个小三角形拼成一个大正方形。",
                "反例：三个角胡乱叠起来，拼不成直线——那是你拼错了，不是定理错了。",
                "⚠️ 别搞混：量 100 个三角形都是 180°，那叫“验证”，不是“证明”。",
                "拼图只拼一次就够了，因为拼的动作不看三角形的长相——这才叫证明。",
                "记住一句话：拼出来，就说清楚了。",
                "更严格的证明，我们在第 3 章用平行线再来一次。"
              ],
              examples: [],
              prev: "g00-u1-l3-p2",
              next: "g00-u1-l4-p1"
            }
          ]
        },
        {
          id: "g00-u1-l4",
          title: "几何与代数的握手",
          pages: [
            {
              id: "g00-u1-l4-p1",
              title: "同一个 x²，两种样子",
              concept: "数形结合",
              formulas: [
                {
                  id: "f1",
                  latex: "x^2",
                  translation: "x 的平方：x 乘以自己，也是正方形的面积"
                }
              ],
              interaction: {
                type: "compare-toggle",
                params: {
                  views: [
                    {
                      label: "代数的样子",
                      caption: "代数说：x² 就是 x 乘以自己——这是“数”的语言。",
                      shapes: [
                        { t: "txt", p: [50,56], text: "x²", size: 22.86, bold: true },
                        { t: "txt", p: [50,34], text: "x 乘以自己", size: 14.48 }
                      ]
                    },
                    {
                      label: "几何的样子",
                      caption: "几何说：x² 是边长为 x 的正方形的面积——这是“形”的语言。",
                      shapes: [
                        { t: "poly", pts: [[35,35],[65,35],[65,65],[35,65]], color: "known", width: 3 },
                        { t: "txt", p: [50,27], text: "x", size: 14.48, color: "known" },
                        { t: "txt", p: [27,50], text: "x", size: 14.48, color: "known" },
                        { t: "txt", p: [50,78], text: "面积 = x²", size: 14.48, bold: true }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "x² 你在代数里见过：x 乘以自己。",
                "点“几何的样子”：画一个正方形，边长是 x，它的面积就是 x²。",
                "同一个 x²，代数读成“乘法”，几何看成“正方形”——这就是数形结合。",
                "预告：以后你会看到，每个公式背后都站着一个图形。"
              ],
              examples: [
                { text: "x=3 时：代数算 3×3=9，几何看边长 3 的正方形", figure: "数形" }
              ],
              prev: "g00-u1-l3-p3",
              next: "g00-u1-l4-p2"
            },
            {
              id: "g00-u1-l4-p2",
              title: "把未知数画成一条线段",
              concept: "线段表示未知数",
              formulas: [
                {
                  id: "f1",
                  latex: "x + 5 = 12",
                  translation: "一段 x 加一段 5，等于全长 12"
                }
              ],
              interaction: {
                type: "step-play",
                params: {
                  interval: 1600,
                  autoplay: false,
                  steps: [
                    {
                      caption: "第 1 步：全长是 12（已知）。",
                      shapes: [
                        { t: "seg", a: [15,50], b: [85,50], color: "line", width: 4 },
                        { t: "txt", p: [50,64], text: "12", size: 15, bold: true }
                      ]
                    },
                    {
                      caption: "第 2 步：一段是 5，另一段不知道——叫它 x。",
                      shapes: [
                        { t: "seg", a: [15,50], b: [50,50], color: "target", width: 4 },
                        { t: "seg", a: [50,50], b: [85,50], color: "known", width: 4 },
                        { t: "pt", p: [50,50], r: 3, color: "line" },
                        { t: "txt", p: [32,64], text: "x", size: 15, bold: true, color: "target" },
                        { t: "txt", p: [32,38], text: "?", size: 15, bold: true, color: "target" },
                        { t: "txt", p: [68,64], text: "5", size: 15, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 3 步：12−5=7，这段 x 长 7。",
                      shapes: [
                        { t: "seg", a: [15,50], b: [50,50], color: "target", width: 4 },
                        { t: "seg", a: [50,50], b: [85,50], color: "known", width: 4 },
                        { t: "txt", p: [32,64], text: "x = 7", size: 15, bold: true, color: "target" },
                        { t: "txt", p: [68,64], text: "5", size: 15, bold: true, color: "known" }
                      ]
                    },
                    {
                      caption: "第 4 步：未知数 x，就是这条线段的长度——数，变成了形。",
                      shapes: [
                        { t: "txt", p: [50,56], text: "x = 7", size: 26, bold: true },
                        { t: "txt", p: [50,36], text: "未知数是一条线段的长度", size: 14.48 }
                      ]
                    }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "还记得代数导论第 1 页的猜数字吗？x+5=12，x 是几？",
                "把它画出来：全长 12 的线段，一段是 5，另一段是 x。",
                "x 这段有多长？12−5=7——线段自己“说”出了答案。",
                "这就是数与形的第一次握手：未知数不再只是字母，它是一条线段。"
              ],
              examples: [
                { text: "回看代数导论第 1 页：猜数字 x+5=12", figure: "回链" }
              ],
              prev: "g00-u1-l4-p1",
              next: "g00-u1-l4-p3"
            },
            {
              id: "g00-u1-l4-p3",
              title: "导论小测：5 道题",
              concept: "本章习题",
              formulas: [
                {
                  id: "f1",
                  latex: "\\text{几何} = \\text{形状、大小、位置}",
                  translation: "几何研究形状、大小、位置"
                }
              ],
              interaction: {
                type: "tap-highlight",
                params: {
                  groups: [
                    { name: "面", color: "corrA" },
                    { name: "体", color: "corrB" }
                  ],
                  items: [
                    { id: "e1", label: "湖面", group: 0, anchor: [27,53],
                      shape: { t: "poly", pts: [[12,62],[42,62],[42,44],[12,44]], color: "corrA", width: 2, fill: "corrA", opacity: 0.3 } },
                    { id: "e2", label: "桌面", group: 0, anchor: [71,53],
                      shape: { t: "poly", pts: [[55,62],[88,62],[88,44],[55,44]], color: "corrA", width: 2, fill: "corrA", opacity: 0.3 } },
                    { id: "e3", label: "纸箱", group: 1, anchor: [26,24],
                      shape: { t: "poly", pts: [[12,30],[32,30],[32,12],[12,12]], color: "corrB", width: 2.5 } },
                    { id: "e4", label: "足球", group: 1, anchor: [70,24],
                      shape: { t: "circle", c: [70,24], r: 10, color: "corrB", width: 2.5 } }
                  ]
                }
              },
              auxInteraction: null,
              hints: [
                "点一点：把 4 样东西送进“面”或“体”的篮子。",
                "1．几何研究什么？（形状、大小、位置）",
                "2．点动成什么？线动成什么？面动成什么？",
                "3．三角形三个角拼到一起是多少度？",
                "4．x² 在几何里长什么样？"
              ],
              examples: [
                { figure: "核对答案", text: "答案：面—湖面/桌面，体—纸箱/足球；1．形状、大小、位置；2．线、面、体；3．180°；4．边长 x 的正方形" }
              ,
                { figure: "错因解析", text: "认图：“面”是平的、“体”占空间——湖面/桌面是面，纸箱/足球是体。1．几何三问：研究形状、大小、位置。2．点动成线、线动成面、面动成体——维度逐级长大。3．三角形三内角拼成平角：180°。4．x²=边长 x 的正方形面积——代数式在几何里有“长相”。" }],
              prev: "g00-u1-l4-p2",
              next: null
            }
          ]
        }
      ]
    }
  ]
};
