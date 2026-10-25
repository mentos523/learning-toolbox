window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g05-u1-l5"] = {
  "lessonId": "g05-u1-l5",
  "lessonTitle": "HL：直角三角形全等",
  "chapterId": "g05",
  "pages": [
    {
      "id": "g05-u1-l5-p1",
      "title": "g04 缺的最后一块拼图",
      "concept": "HL 判定的引入",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{斜边}=\\text{斜边},\\ \\text{直角边}=\\text{直角边}\\Rightarrow\\text{全等}",
          "translation": "斜边和一条直角边对应相等，两个直角三角形全等"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "g04 的四种判定",
              "caption": "SSS、SAS、ASA、AAS——g04 讲了四种全等判定，够用吗？",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "SSS / SAS / ASA / AAS",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    36
                  ],
                  "text": "g04 的四种判定",
                  "size": 13
                }
              ]
            },
            {
              "label": "直角三角形：HL",
              "caption": "直角三角形有第五种：斜边和一条直角边对应相等——HL。g04 没讲，因为它要等勾股定理。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      12,
                      62
                    ],
                    [
                      36,
                      62
                    ],
                    [
                      12,
                      38
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    12,
                    62
                  ],
                  "p": [
                    36,
                    62
                  ],
                  "q": [
                    12,
                    38
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    36,
                    62
                  ],
                  "b": [
                    12,
                    38
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    38
                  ],
                  "b": [
                    12,
                    62
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      62
                    ],
                    [
                      82,
                      62
                    ],
                    [
                      58,
                      38
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    58,
                    62
                  ],
                  "p": [
                    82,
                    62
                  ],
                  "q": [
                    58,
                    38
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    82,
                    62
                  ],
                  "b": [
                    58,
                    38
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    58,
                    38
                  ],
                  "b": [
                    58,
                    62
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    72
                  ],
                  "text": "斜边、一条直角边对应相等",
                  "size": 12,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "g04 预告过：'直角三角形还有第五种判定，学完勾股定理揭晓'——今天兑现。",
        "HL 只用于直角三角形——普通三角形用它，不灵。",
        "H 是 hypotenuse（斜边），L 是 leg（直角边）——名字就是条件。"
      ],
      "examples": [
        {
          "text": "集齐五种判定：SSS/SAS/ASA/AAS/HL",
          "figure": "图表"
        }
      ],
      "prev": "g05-u1-l4-p3",
      "next": "g05-u1-l5-p2"
    },
    {
      "id": "g05-u1-l5-p2",
      "title": "HL 证明：勾股+SSS",
      "concept": "HL 判定的证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\sqrt{c^2-a^2}",
          "translation": "根号下 c 的平方减 a 的平方：另一条直角边"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "card": "在 Rt△ABC 里用勾股定理：另一直角边 BC = √(c²−a²)。",
              "reason": "已知：两个直角三角形，斜边 c、直角边 a 对应相等（蓝色）；求证：全等（红色）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      35
                    ],
                    [
                      56,
                      35
                    ],
                    [
                      20,
                      67
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    20,
                    35
                  ],
                  "p": [
                    56,
                    35
                  ],
                  "q": [
                    20,
                    67
                  ],
                  "size": 7,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    52
                  ],
                  "text": "c",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    16,
                    51
                  ],
                  "text": "a",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    35
                  ],
                  "b": [
                    56,
                    35
                  ],
                  "ticks": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    30
                  ],
                  "text": "BC = ?",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "card": "在 Rt△DEF 里同样：EF = √(c²−a²)。",
              "reason": "同一个勾股定理，同样的已知条件——算出来必然一样。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      35
                    ],
                    [
                      56,
                      35
                    ],
                    [
                      20,
                      67
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    30
                  ],
                  "text": "EF = √(c²−a²)",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "card": "BC 和 EF 都是 √(c²−a²)，所以 BC = EF。",
              "reason": "等量代换：同一个式子算出的结果相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      8,
                      48
                    ],
                    [
                      32,
                      48
                    ],
                    [
                      8,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    8,
                    48
                  ],
                  "b": [
                    32,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      48
                    ],
                    [
                      74,
                      48
                    ],
                    [
                      50,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    74,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    41,
                    80
                  ],
                  "text": "BC = EF",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "card": "三边对应相等 → SSS → 两个三角形全等。",
              "reason": "SSS 判定（g04.1.2）：三边对应相等则全等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      8,
                      48
                    ],
                    [
                      32,
                      48
                    ],
                    [
                      8,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    8,
                    48
                  ],
                  "b": [
                    32,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    32,
                    48
                  ],
                  "b": [
                    8,
                    72
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    8,
                    72
                  ],
                  "b": [
                    8,
                    48
                  ],
                  "ticks": 3,
                  "color": "corrC"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      48
                    ],
                    [
                      74,
                      48
                    ],
                    [
                      50,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    74,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    74,
                    48
                  ],
                  "b": [
                    50,
                    72
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    72
                  ],
                  "b": [
                    50,
                    48
                  ],
                  "ticks": 3,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    41,
                    82
                  ],
                  "text": "SSS → 全等",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "Rt△ABC 中：BC = √(c²−a²)",
              "reason": "勾股定理"
            },
            {
              "statement": "Rt△DEF 中：EF = √(c²−a²)",
              "reason": "勾股定理"
            },
            {
              "statement": "BC = EF",
              "reason": "等量代换"
            },
            {
              "statement": "三边对应相等 → SSS → 全等",
              "reason": "SSS 判定（g04.1.2）"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "证明只有一招：用勾股定理把'未知'的第三边算出来，化成 SSS。",
        "为什么 HL 只适用于直角三角形？因为证明里用了勾股定理——非直角三角形没这条路。"
      ],
      "examples": [
        {
          "text": "化归思想：未知→已知（SSS）",
          "figure": "图表"
        }
      ],
      "prev": "g05-u1-l5-p1",
      "next": "g05-u1-l5-p3"
    },
    {
      "id": "g05-u1-l5-p3",
      "title": "HL：直角三角形专用",
      "concept": "HL 判定",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{HL：斜边、直角边对应相等}",
          "translation": "斜边和一条直角边对应相等，两个直角三角形全等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "例：斜边 10、直角边 6 对应相等 → HL → 全等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      42
                    ],
                    [
                      45,
                      42
                    ],
                    [
                      15,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    15,
                    42
                  ],
                  "p": [
                    45,
                    42
                  ],
                  "q": [
                    15,
                    72
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    42
                  ],
                  "b": [
                    15,
                    72
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    72
                  ],
                  "b": [
                    15,
                    42
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      42
                    ],
                    [
                      85,
                      42
                    ],
                    [
                      55,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    55,
                    42
                  ],
                  "p": [
                    85,
                    42
                  ],
                  "q": [
                    55,
                    72
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    85,
                    42
                  ],
                  "b": [
                    55,
                    72
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    72
                  ],
                  "b": [
                    55,
                    42
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "HL → 全等 ✓",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "反例：两条直角边对应相等——那是 SAS，别叫成 HL。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      42
                    ],
                    [
                      45,
                      42
                    ],
                    [
                      15,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    15,
                    42
                  ],
                  "p": [
                    45,
                    42
                  ],
                  "q": [
                    15,
                    72
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    42
                  ],
                  "b": [
                    45,
                    42
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    72
                  ],
                  "b": [
                    15,
                    42
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      42
                    ],
                    [
                      85,
                      42
                    ],
                    [
                      55,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    55,
                    42
                  ],
                  "p": [
                    85,
                    42
                  ],
                  "q": [
                    55,
                    72
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    42
                  ],
                  "b": [
                    85,
                    42
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    72
                  ],
                  "b": [
                    55,
                    42
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "这是 SAS，不是 HL",
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
        "HL 陈述：斜边和一条直角边对应相等的两个直角三角形全等。",
        "生活例：两个直角三角板，斜边一样长、一条直角边一样长——叠上去严丝合缝。",
        "反例：两条直角边对应相等，那是 SAS——HL 的'H'必须是斜边。",
        "⚠️ 别搞混：看到'直角三角形+两条边相等'，先问——其中一条是斜边吗？是，才是 HL。",
        "记住一句话：直角三角形判全等，斜边直角边来相认。"
      ],
      "examples": [
        {
          "text": "一副三角板：45° 的那块",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l5-p2",
      "next": "g05-u1-l6-p1"
    }
  ]
};
