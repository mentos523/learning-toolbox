window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g04-u1-l6"] = {
  "lessonId": "g04-u1-l6",
  "lessonTitle": "等腰三角形的判定与等边三角形",
  "chapterId": "g04",
  "pages": [
    {
      "id": "g04-u1-l6-p1",
      "title": "慢放证明：等角对等边",
      "concept": "等角对等边证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle B=\\angle C \\Rightarrow AB=AC",
          "translation": "有两个角相等的三角形是等腰三角形"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "card": "已知 ∠B=∠C。作顶角平分线 AD（辅助线）。",
              "reason": "已知（蓝色）；辅助线：灰色虚线",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    24,
                    34
                  ],
                  "a1": 0,
                  "a2": 55,
                  "r": 10,
                  "group": 1,
                  "color": "known"
                },
                {
                  "t": "arc",
                  "v": [
                    76,
                    34
                  ],
                  "a1": 125,
                  "a2": 180,
                  "r": 10,
                  "group": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "aux",
                  "dash": "5,4",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    34
                  ],
                  "label": "D",
                  "color": "aux"
                }
              ]
            },
            {
              "card": "∠BAD=∠CAD，AD 是公共边。",
              "reason": "角平分线定义；公共边相等（自己等于自己）",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    74
                  ],
                  "a1": 237,
                  "a2": 270,
                  "r": 10,
                  "group": 2,
                  "color": "target"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    74
                  ],
                  "a1": 270,
                  "a2": 303,
                  "r": 10,
                  "group": 2,
                  "color": "target"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "target",
                  "width": 3.5
                }
              ]
            },
            {
              "card": "△ABD ≌ △ACD（AAS）：两角及一对边。",
              "reason": "AAS 判定（g04.1.4）：∠B=∠C、∠BAD=∠CAD、AD=AD",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      50,
                      34
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      76,
                      34
                    ],
                    [
                      50,
                      34
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                }
              ]
            },
            {
              "card": "AB=AC——对应边相等，原三角形是等腰的。",
              "reason": "全等对应边相等（g04.1.1）",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    24,
                    34
                  ],
                  "ticks": 1,
                  "color": "target"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    76,
                    34
                  ],
                  "ticks": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "AB = AC：等腰",
                  "size": 15,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "慢放：点 ▶，和上一课的证明对比——辅助线一样，用的判定不同。",
        "上一课：已知边等，用 SAS 证角等；这一课：已知角等，用 AAS 证边等。",
        "这就是“互逆”：条件和结论换了位置，证明照样走得通。"
      ],
      "examples": [
        {
          "text": "对照 g04.1.5 P3：同一张图，两个方向的证明",
          "figure": "对比"
        }
      ],
      "prev": "g04-u1-l5-p5",
      "next": "g04-u1-l6-p2"
    },
    {
      "id": "g04-u1-l6-p2",
      "title": "判定：等角对等边",
      "concept": "等腰三角形判定",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle B=\\angle C \\Rightarrow AB=AC",
          "translation": "等角对等边：有两个角相等的三角形是等腰三角形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两底角同弧 → 两腰同色——等角对等边。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "arc",
                  "v": [
                    24,
                    34
                  ],
                  "a1": 0,
                  "a2": 55,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    76,
                    34
                  ],
                  "a1": 125,
                  "a2": 180,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    24,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    76,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "性质 ⇆ 判定：互逆",
                  "size": 14.48,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "性质是“已知等腰 → 底角相等”；判定反过来：“已知底角相等 → 是等腰”——互逆。",
        "人话：一个三角形有两个角相等，它就是等腰三角形——等角对等边。",
        "生活例：屋顶两边坡度一样，梁就是等腰的——工人师傅量角就行，不用量边。",
        "反例：三个角都不相等——肯定不是等腰的。",
        "⚠️ 别搞混：判定用“角”推“边”，性质用“边”推“角”，别走反。",
        "记住一句话：角等，则腰等。"
      ],
      "examples": [
        {
          "text": "质检员：只量两个底角，就知道这根梁是不是等腰",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l6-p1",
      "next": "g04-u1-l6-p3"
    },
    {
      "id": "g04-u1-l6-p3",
      "title": "等边三角形：三边等，三角六十",
      "concept": "等边三角形",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三边相等} \\Rightarrow \\text{三角都是} 60\\text{度}",
          "translation": "等边三角形：三条边相等，三个角都是 60 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：三边同色三刻度，三角同弧 60°——等边三角形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      73
                    ],
                    [
                      28,
                      35
                    ],
                    [
                      72,
                      35
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    73
                  ],
                  "b": [
                    28,
                    35
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    35
                  ],
                  "b": [
                    72,
                    35
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    35
                  ],
                  "b": [
                    50,
                    73
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    28,
                    35
                  ],
                  "a1": 0,
                  "a2": 60,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    72,
                    35
                  ],
                  "a1": 120,
                  "a2": 180,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    73
                  ],
                  "a1": 240,
                  "a2": 300,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "60° × 3 = 180°",
                  "size": 14.48,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "等边三角形：三条边都相等——任取两边都是腰，它一定是等腰的。",
        "判定 1：三边相等 → 等边（定义）。",
        "判定 2：三个角都是 60° → 等边（等角对等边，三边全等）。",
        "为什么 60°？三角和 180°，三个相等的角只能各 60°。",
        "生活例：警示三角牌——三边等、三角 60°，立得稳。",
        "⚠️ 别搞混：等边一定等腰，等腰不一定等边。",
        "记住一句话：三边等，或三角六十。"
      ],
      "examples": [
        {
          "text": "三角警示牌、金字塔侧面：等边最稳",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l6-p2",
      "next": "g04-u1-l7-p1"
    }
  ]
};
