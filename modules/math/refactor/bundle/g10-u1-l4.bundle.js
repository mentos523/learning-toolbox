window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g10-u1-l4"] = {
  "lessonId": "g10-u1-l4",
  "lessonTitle": "等腰三角形的对称性再探",
  "chapterId": "g10",
  "pages": [
    {
      "id": "g10-u1-l4-p1",
      "title": "等腰三角形：沿对称轴翻折",
      "concept": "等腰三角形的轴对称性",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三线合一} \\Rightarrow \\text{对称轴}",
          "translation": "三线合一的那条线，就是等腰三角形的对称轴"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：等腰三角形 ABC（AB=AC，两道刻度），AD 是顶角平分线。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      65
                    ],
                    [
                      70,
                      65
                    ],
                    [
                      50,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    65
                  ],
                  "b": [
                    50,
                    30
                  ],
                  "color": "known",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    65
                  ],
                  "b": [
                    50,
                    30
                  ],
                  "color": "known",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    65
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    30
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    65
                  ],
                  "label": "D",
                  "color": "aux",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    24,
                    72
                  ],
                  "text": "B",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    72
                  ],
                  "text": "C",
                  "size": 14.48
                }
              ]
            },
            {
              "caption": "第 2 步：沿 AD 对折——左半边“飞”向右半边。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      65
                    ],
                    [
                      70,
                      65
                    ],
                    [
                      50,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      60
                    ],
                    [
                      50,
                      55
                    ],
                    [
                      50,
                      38
                    ]
                  ],
                  "color": "known",
                  "width": 2,
                  "opacity": 0.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    65
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "正在对折……",
                  "size": 14.48,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：完全重合——B 落到 C 身上，严丝合缝！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      65
                    ],
                    [
                      70,
                      65
                    ],
                    [
                      50,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    65
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    52
                  ],
                  "text": "B、C 重合！",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：AD 既是顶角平分线，又是底边中线、底边高——三线合一就是这条对称轴。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      65
                    ],
                    [
                      70,
                      65
                    ],
                    [
                      50,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    65
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    65
                  ],
                  "p": [
                    50,
                    30
                  ],
                  "q": [
                    70,
                    65
                  ],
                  "size": 6,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    18
                  ],
                  "text": "三线合一 = 对称轴",
                  "size": 15,
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
        "看第 3 步：B 和 C 压到了同一个位置——等腰三角形的两腰“长”到了一起。",
        "g04.1.5 我们对折过它，当时叫“三线合一”；现在它有了正式名字：轴对称，对称轴就是 AD。",
        "新名词认旧友：对称轴（就是 AD 这条线——顶角平分线、底边中线、底边高，三线合一）。"
      ],
      "examples": [
        {
          "text": "纸剪等腰三角形，沿 AD 对折验证重合",
          "figure": "实物"
        }
      ],
      "prev": "g10-u1-l3-p3",
      "next": "g10-u1-l4-p2"
    },
    {
      "id": "g10-u1-l4-p2",
      "title": "三线合一就是对称轴",
      "concept": "对称视角下的三线合一",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{对称轴上的点到} B、C \\text{距离相等}",
          "translation": "对称轴上的点，到两底角顶点的距离相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：对称轴 AD 上的点 P，到 B、C 距离相等（两段同色等长刻度）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      65
                    ],
                    [
                      70,
                      65
                    ],
                    [
                      50,
                      30
                    ]
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
                    50,
                    65
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    48
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    30,
                    65
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    70,
                    65
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "PB = PC",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA",
                  "math": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得 g04.1.5 吗？我们把等腰三角形对折，两边重合——现在它叫轴对称。",
        "对称视角看三线合一：顶角平分线、底边中线、底边高是同一条直线——它就是对称轴。对称轴上每一点，到 B、C 距离都相等。",
        "生活例：金字塔的侧面、农村屋顶的人字梁。图形例：等边三角形有 3 条对称轴。",
        "反例：等腰三角形只有 1 条对称轴——别把底边上的“高线段”当对称轴，对称轴是无限长的直线。",
        "⚠️ 别搞混：中线是线段（有端点），对称轴是直线（无端点）。",
        "记住一句话：三线合一即对称轴。"
      ],
      "examples": [
        {
          "text": "人字梁：左右对称，梁柱就是对称轴",
          "figure": "实物"
        },
        {
          "text": "❌ 高线段 ≠ 对称轴：线段有端点，直线无限长",
          "figure": "反例图"
        }
      ],
      "prev": "g10-u1-l4-p1",
      "next": "g10-u1-l4-p3"
    },
    {
      "id": "g10-u1-l4-p3",
      "title": "例题：用对称求角度",
      "concept": "对称性质的应用",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle BAD = 40^{\\circ}",
          "translation": "角 BAD 等于 40 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：已知等腰 △ABC，AB=AC，AD 是对称轴交 BC 于 D，∠B=50°。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      65
                    ],
                    [
                      70,
                      65
                    ],
                    [
                      50,
                      41.2
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    65
                  ],
                  "b": [
                    50,
                    41.2
                  ],
                  "color": "known",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    65
                  ],
                  "b": [
                    50,
                    41.2
                  ],
                  "color": "known",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    41.2
                  ],
                  "b": [
                    50,
                    65
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    65
                  ],
                  "a1": 310,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    22,
                    56
                  ],
                  "text": "50°",
                  "size": 13,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 2 步：对称 → ∠C = ∠B = 50°（对应角相等）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      65
                    ],
                    [
                      70,
                      65
                    ],
                    [
                      50,
                      41.2
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    65
                  ],
                  "a1": 310,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    70,
                    65
                  ],
                  "a1": 180,
                  "a2": 230,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    22,
                    56
                  ],
                  "text": "50°",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    78,
                    56
                  ],
                  "text": "50°",
                  "size": 13,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 3 步：AD⊥BC（三线合一），∠BAD = 180°−90°−50° = 40°。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      65
                    ],
                    [
                      70,
                      65
                    ],
                    [
                      50,
                      41.2
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    41.2
                  ],
                  "b": [
                    50,
                    65
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    65
                  ],
                  "p": [
                    50,
                    41.2
                  ],
                  "q": [
                    70,
                    65
                  ],
                  "size": 6,
                  "color": "target"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    41.2
                  ],
                  "a1": 90,
                  "a2": 130,
                  "r": 10,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    42
                  ],
                  "text": "40°",
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
        "第 2 步用“对称”：B、C 是对应点，对应角当然相等——不用再证一遍全等。",
        "第 3 步用“三线合一”：AD 既是角平分线又是高，∠ADB=90°。",
        "你看：对称的眼光让两步都变成“一句话”，这就是学变换的回报。"
      ],
      "examples": [
        {
          "text": "变式：∠A=100°，求∠B（对称→∠B=∠C=40°）",
          "figure": "纸上算"
        }
      ],
      "prev": "g10-u1-l4-p2",
      "next": "g10-u1-l5-p1"
    }
  ]
};
