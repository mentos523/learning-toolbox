window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g13-u1-l5"] = {
  "lessonId": "g13-u1-l5",
  "lessonTitle": "两直线的位置关系",
  "chapterId": "g13",
  "pages": [
    {
      "id": "g13-u1-l5-p1",
      "title": "平行 vs 垂直：看 k",
      "concept": "位置关系与斜率",
      "formulas": [
        {
          "id": "f1",
          "latex": "k_1 = k_2 \\text{平行}；k_1 k_2 = -1 \\text{垂直}",
          "translation": "斜率相等就平行；斜率乘积等于 −1 就垂直"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：l₁: y=x+1，l₂: y=x−2——k 都是 1，永不相交。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    38
                  ],
                  "b": [
                    75,
                    88
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    92
                  ],
                  "text": "l₁",
                  "size": 13,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    14
                  ],
                  "b": [
                    75,
                    64
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    68
                  ],
                  "text": "l₂",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "k₁ = k₂ = 1：平行",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：如果 b 也相等——两条线重合成一条。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    38
                  ],
                  "b": [
                    75,
                    88
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "k、b 都相等：同一条直线",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：l₁: y=2x，l₂: y=−x/2——k₁k₂=−1。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    50,
                    80
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    84
                  ],
                  "text": "l₁",
                  "size": 13,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    75,
                    5
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    12
                  ],
                  "text": "l₂",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "k₁=2, k₂=−1/2：k₁k₂=−1",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 4 步：交角是 90°——这就是垂直。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    50,
                    80
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    75,
                    5
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    25,
                    30
                  ],
                  "p": [
                    50,
                    80
                  ],
                  "q": [
                    75,
                    5
                  ],
                  "size": 7
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "垂直：交角 90°",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "第 1 步：两条线坡度一样，怎么走都不碰头——这就是平行。",
        "第 3 步：k₁k₂=−1，两条线“掐”出 90°——这就是垂直。",
        "⚠️ 前提：这两招只管“有斜率”的直线——竖直线 x=a 没有斜率，k₁=k₂ 和 k₁k₂=−1 都管不着它。"
      ],
      "examples": [
        {
          "text": "铁轨平行，墙角垂直",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l4-p4",
      "next": "g13-u1-l5-p2"
    },
    {
      "id": "g13-u1-l5-p2",
      "title": "平行：k₁=k₂",
      "concept": "平行线的斜率条件",
      "formulas": [
        {
          "id": "f1",
          "latex": "k_1 = k_2 \\Rightarrow l_1 \\parallel l_2",
          "translation": "斜率相等，两直线平行"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "平行：k 相同",
              "caption": "k₁=k₂=1：两条线永不相交——平行。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    40
                  ],
                  "b": [
                    75,
                    90
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    24
                  ],
                  "b": [
                    75,
                    74
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "k₁ = k₂：平行",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "相交：k 不同",
              "caption": "k₁=1、k₂=2：坡度不一样，迟早碰头——相交。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    40
                  ],
                  "b": [
                    75,
                    90
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    40
                  ],
                  "b": [
                    50,
                    90
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "k₁ ≠ k₂：相交",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "人话版：坡度一样的两条路，永远保持同样的“距离”，不会碰头。",
        "生活例：铁轨；图形例：y=x+1 和 y=x−2。",
        "反例：k 相等、b 也相等——那是同一条直线，不是“两条平行线”。",
        "反例 2：x=1 和 x=2 也平行，但它们没有斜率——“k 相等就平行”的前提是：两直线都有斜率。",
        "别搞混：平行是“k 相等”，重合是“k、b 都相等”。",
        "记住一句话：同坡永不交。"
      ],
      "examples": [
        {
          "text": "斑马线：k 全相等，条条平行",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l5-p1",
      "next": "g13-u1-l5-p3"
    },
    {
      "id": "g13-u1-l5-p3",
      "title": "慢放证明：k₁k₂=−1",
      "concept": "垂直的斜率条件证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "l_1 \\perp l_2 \\Rightarrow k_1 k_2 = -1",
          "translation": "两直线垂直，则斜率乘积等于 −1"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "l₁: y = k₁x，l₂: y = k₂x，l₁ ⊥ l₂",
          "goal": "k₁k₂ = −1",
          "steps": [
            {
              "card": "先把两条直线平移到过原点——平移不改变垂不垂直。",
              "reason": "平移不改变直线的方向（g02.2.4）；记 l₁: y=k₁x，l₂: y=k₂x",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    18
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    75,
                    80
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    84
                  ],
                  "text": "l₁",
                  "size": 13,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    90,
                    10
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    16
                  ],
                  "text": "l₂",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    30
                  ],
                  "label": "O",
                  "color": "line",
                  "r": 4
                }
              ]
            },
            {
              "card": "在 x=1 处立一根“标杆”，交 l₁ 于 A、交 l₂ 于 B。",
              "reason": "作图；A(1, k₁)、B(1, k₂)（点在直线上，坐标满足方程）",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    18
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    75,
                    80
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    90,
                    10
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    10
                  ],
                  "b": [
                    62,
                    90
                  ],
                  "color": "target",
                  "width": 3,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    62,
                    54
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    54
                  ],
                  "text": "A(1, k₁)",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "pt",
                  "p": [
                    62,
                    24
                  ],
                  "label": "B",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    24
                  ],
                  "text": "B(1, k₂)",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    30
                  ],
                  "label": "O",
                  "color": "line",
                  "r": 4
                }
              ]
            },
            {
              "card": "算三边平方：OA²=1+k₁²，OB²=1+k₂²，AB²=(k₁−k₂)²。",
              "reason": "距离公式（g05.1.6；本课 1.2 当工具用）",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    62,
                    54
                  ],
                  "color": "corrA",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    62,
                    24
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    54
                  ],
                  "b": [
                    62,
                    24
                  ],
                  "color": "corrC",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    46
                  ],
                  "text": "OA²=1+k₁²",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    22
                  ],
                  "text": "OB²=1+k₂²",
                  "size": 12,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    40
                  ],
                  "text": "AB²=(k₁−k₂)²",
                  "size": 12,
                  "color": "corrC"
                }
              ]
            },
            {
              "card": "l₁⊥l₂，所以 ∠AOB=90°，OA²+OB²=AB²。",
              "reason": "勾股定理（g05.1.2）",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    62,
                    54
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    62,
                    24
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    54
                  ],
                  "b": [
                    62,
                    24
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    30
                  ],
                  "p": [
                    62,
                    54
                  ],
                  "q": [
                    62,
                    24
                  ],
                  "size": 7
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "OA² + OB² = AB²",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "card": "展开化简：2=−2k₁k₂，即 k₁k₂=−1。",
              "reason": "等式化简：两边消去 k₁²、k₂²",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    62,
                    54
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    62,
                    24
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    54
                  ],
                  "b": [
                    62,
                    24
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    60
                  ],
                  "text": "2 = −2k₁k₂",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "k₁k₂ = −1",
                  "size": 16,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "平移两直线过原点：l₁: y=k₁x，l₂: y=k₂x",
              "reason": "平移不改变方向（g02.2.4）"
            },
            {
              "statement": "x=1 处立标杆，得 A(1,k₁)、B(1,k₂)",
              "reason": "作图；点在直线上"
            },
            {
              "statement": "OA²=1+k₁²，OB²=1+k₂²，AB²=(k₁−k₂)²",
              "reason": "距离公式（g05.1.6）"
            },
            {
              "statement": "垂直 → OA²+OB²=AB²",
              "reason": "勾股定理（g05.1.2）"
            },
            {
              "statement": "展开化简得 k₁k₂=−1",
              "reason": "等式化简"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "三问：已知？求证？第 1 步凭什么平移？（平移不改变方向，g02.2.4）",
        "关键动作：第 4 步把“垂直”翻译成“勾股定理能用”——老定理是新证明的砖。"
      ],
      "examples": [
        {
          "text": "反过来也成立：k₁k₂=−1 → 垂直（思路一样，留作思考）",
          "figure": "回链"
        }
      ],
      "prev": "g13-u1-l5-p2",
      "next": "g13-u1-l5-p4"
    },
    {
      "id": "g13-u1-l5-p4",
      "title": "垂直：k₁k₂=−1",
      "concept": "垂直线的斜率条件",
      "formulas": [
        {
          "id": "f1",
          "latex": "k_1 k_2 = -1 \\Rightarrow l_1 \\perp l_2",
          "translation": "斜率乘积等于 −1，两直线垂直"
        },
        {
          "id": "f2",
          "latex": "y = -\\frac{1}{2}x + 3",
          "translation": "例：与 y=2x+1 垂直且过 (0,3) 的直线是 y=−x/2+3"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：y=2x+1 与 y=−x/2+3——k=2 和 k=−1/2，乘积 −1。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    44
                  ],
                  "b": [
                    50,
                    94
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    94
                  ],
                  "text": "y=2x+1",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    44
                  ],
                  "b": [
                    75,
                    19
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    16
                  ],
                  "text": "y=−x/2+3",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "right",
                  "v": [
                    25,
                    44
                  ],
                  "p": [
                    50,
                    94
                  ],
                  "q": [
                    75,
                    19
                  ],
                  "size": 6
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    60
                  ],
                  "text": "2 × (−1/2) = −1",
                  "size": 13,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "人话版：两条直线“掐”出 90°，它们的斜率一定“互为负倒数”——2 和 −1/2。",
        "例题：求过 (0, 3) 且与 y=2x+1 垂直的直线：k=−1/2，b=3，得 y=−x/2+3。",
        "生活例：墙角——墙和地面垂直；图形例：y=2x 和 y=−x/2 在原点掐出直角。",
        "反例：k₁=2、k₂=1/2（正倒数）不垂直——符号别丢，负号是“拐弯”的关键。",
        "⚠️ 前提：“k₁k₂=−1”这招只管有斜率的直线——y=0 和 x=0 也垂直，但 x=0 没有斜率，这招管不着。",
        "记住一句话：垂直看乘积，等于负一。"
      ],
      "examples": [
        {
          "text": "桌面与桌腿：垂直的两条线",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l5-p3",
      "next": "g13-u1-l6-p1"
    }
  ]
};
