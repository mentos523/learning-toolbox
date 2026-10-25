window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g05-u1-l4"] = {
  "lessonId": "g05-u1-l4",
  "lessonTitle": "逆定理：判定直角三角形",
  "chapterId": "g05",
  "pages": [
    {
      "id": "g05-u1-l4-p1",
      "title": "绳圈拉直角",
      "concept": "勾股逆定理的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "3^2 + 4^2 = 5^2",
          "translation": "3 的平方加 4 的平方等于 5 的平方"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：一根绳子打 13 个结，分成 12 段——取 3 段、4 段、5 段。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    55
                  ],
                  "b": [
                    85,
                    55
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    15,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    20.8,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    26.7,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    32.5,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    38.3,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    44.2,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    55.8,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    61.7,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    67.5,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    73.3,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    79.2,
                    55
                  ]
                },
                {
                  "t": "pt",
                  "p": [
                    85,
                    55
                  ]
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    70
                  ],
                  "text": "13 个结，12 段",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：3 段、4 段、5 段首尾相接，围成三角形——绳子要拉紧！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      30,
                      51
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    26
                  ],
                  "text": "4 段",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    26,
                    40
                  ],
                  "text": "3 段",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    48,
                    44
                  ],
                  "text": "5 段",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 3 步：量一量——3-4-5 对着的角是直角！古埃及人就用这招画直角。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      30,
                      51
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    30
                  ],
                  "p": [
                    58,
                    30
                  ],
                  "q": [
                    30,
                    51
                  ],
                  "size": 7,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "3²+4²=5²",
                  "size": 14.48,
                  "bold": true,
                  "math": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "是直角！",
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
        "绳子 12 段：3+4+5=12——打结时数好，别多数少一段。",
        "拉紧！绳子松了围出的就不是三角形了——'拉直'是关键动作。",
        "3²+4²=5² 的三角形，角是直角——反过来也成立，这就是逆定理。"
      ],
      "examples": [
        {
          "text": "古埃及绳法：金字塔的地基直角",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l3-p3",
      "next": "g05-u1-l4-p2"
    },
    {
      "id": "g05-u1-l4-p2",
      "title": "逆定理证明：SSS 构造",
      "concept": "勾股逆定理的证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^2 + b^2 = c^2 \\Rightarrow \\text{直角三角形}",
          "translation": "如果 a 的平方加 b 的平方等于 c 的平方，那么这个三角形是直角三角形"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "card": "造一个'肯定直角'的三角形：画直角，两条直角边照抄 a、b。",
              "reason": "已知：三边 a、b、c 且 a²+b²=c²（蓝色）；求证：是直角三角形（红色）。作图见 g04.1.7。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      30
                    ],
                    [
                      61,
                      30
                    ],
                    [
                      25,
                      62
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    25,
                    30
                  ],
                  "p": [
                    61,
                    30
                  ],
                  "q": [
                    25,
                    62
                  ],
                  "size": 7,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    43,
                    26
                  ],
                  "text": "a",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    21,
                    46
                  ],
                  "text": "b",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    74
                  ],
                  "text": "'替身'三角形",
                  "size": 12
                }
              ]
            },
            {
              "card": "对'替身'用勾股定理：它的斜边 = √(a²+b²)。",
              "reason": "勾股定理（上一课刚证的）：替身是直角三角形，对它用理直气壮。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      30
                    ],
                    [
                      61,
                      30
                    ],
                    [
                      25,
                      62
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    48,
                    50
                  ],
                  "text": "斜边=√(a²+b²)",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "card": "已知 a²+b²=c²，所以'替身'的斜边 = c。",
              "reason": "已知条件代入：√(a²+b²) = √c² = c。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      8,
                      45
                    ],
                    [
                      26,
                      45
                    ],
                    [
                      8,
                      63
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    17,
                    70
                  ],
                  "text": "原三角形",
                  "size": 11.89
                },
                {
                  "t": "txt",
                  "p": [
                    17,
                    36
                  ],
                  "text": "a,b,c",
                  "size": 11.89
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      45,
                      45
                    ],
                    [
                      63,
                      45
                    ],
                    [
                      45,
                      63
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    54,
                    70
                  ],
                  "text": "'替身'",
                  "size": 11.89
                },
                {
                  "t": "txt",
                  "p": [
                    54,
                    36
                  ],
                  "text": "a,b,c",
                  "size": 11.89,
                  "color": "known"
                }
              ]
            },
            {
              "card": "两个三角形三边都相等 → SSS 全等 → ∠C = 90°。",
              "reason": "SSS 判定（g04.1.2）；全等三角形对应角相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      8,
                      45
                    ],
                    [
                      26,
                      45
                    ],
                    [
                      8,
                      63
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    8,
                    45
                  ],
                  "b": [
                    26,
                    45
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    26,
                    45
                  ],
                  "b": [
                    8,
                    63
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    8,
                    63
                  ],
                  "b": [
                    8,
                    45
                  ],
                  "ticks": 3,
                  "color": "corrC"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      45,
                      45
                    ],
                    [
                      63,
                      45
                    ],
                    [
                      45,
                      63
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    45
                  ],
                  "b": [
                    63,
                    45
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    63,
                    45
                  ],
                  "b": [
                    45,
                    63
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    63
                  ],
                  "b": [
                    45,
                    45
                  ],
                  "ticks": 3,
                  "color": "corrC"
                },
                {
                  "t": "right",
                  "v": [
                    45,
                    45
                  ],
                  "p": [
                    63,
                    45
                  ],
                  "q": [
                    45,
                    63
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "right",
                  "v": [
                    8,
                    45
                  ],
                  "p": [
                    26,
                    45
                  ],
                  "q": [
                    8,
                    63
                  ],
                  "size": 6,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "作直角三角形，直角边为 a、b",
              "reason": "作图（g04.1.7）"
            },
            {
              "statement": "它的斜边 = √(a²+b²) = c",
              "reason": "勾股定理 + 已知条件"
            },
            {
              "statement": "两三角形三边对应相等",
              "reason": "已知 + 上一步"
            },
            {
              "statement": "SSS 全等 → 对应角 ∠C = 90°",
              "reason": "SSS 判定（g04.1.2）"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "证明思路：'造'一个已知是直角三角形的'替身'，再证明它和原三角形全等。",
        "为什么敢用勾股定理？因为替身是我们亲手画的直角三角形——对它用，理直气壮。",
        "SSS 是桥梁：三边相等 → 全等 → 角相等——全等判定在这里立功了。"
      ],
      "examples": [
        {
          "text": "替身战术：先造一个已知的，再证全等",
          "figure": "图表"
        }
      ],
      "prev": "g05-u1-l4-p1",
      "next": "g05-u1-l4-p3"
    },
    {
      "id": "g05-u1-l4-p3",
      "title": "互逆：条件结论换位置",
      "concept": "定理与逆定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{定理：直角} \\Rightarrow a^2+b^2=c^2",
          "translation": "定理：如果是直角三角形，那么两直角边的平方和等于斜边的平方"
        },
        {
          "id": "f2",
          "latex": "a^2+b^2=c^2 \\Rightarrow \\text{直角}",
          "translation": "逆定理：如果三边满足平方和关系，那么这个三角形是直角三角形"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "定理：由形到数",
              "caption": "已知是直角三角形 → 可以算 a²+b²=c²：从'形'推出'数'。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      30,
                      51
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    30
                  ],
                  "p": [
                    58,
                    30
                  ],
                  "q": [
                    30,
                    51
                  ],
                  "size": 7,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "直角 → a²+b²=c²",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "label": "逆定理：由数到形",
              "caption": "已知 6²+8²=10² → 可以判定是直角三角形：从'数'推出'形'。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      62,
                      30
                    ],
                    [
                      30,
                      62
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    30
                  ],
                  "p": [
                    62,
                    30
                  ],
                  "q": [
                    30,
                    62
                  ],
                  "size": 7,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "6²+8²=10² → 直角",
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
        "互逆就是'条件结论换位置'：定理说'直角→平方和'，逆定理说'平方和→直角'。",
        "生活例：木工验直角——量三边是不是 3-4-5，是就是直角，不用带量角器。",
        "图形例：6-8-10（3-4-5 的 2 倍）：36+64=100——也是直角三角形。",
        "反例：2-3-4：4+9=13≠16——差一点也不是直角，'差不多'不行。",
        "⚠️ 别搞混：先找最长边当 c——把短边当成 c 去验，永远验不对。",
        "记住一句话：平方和对上号，直角就跑不掉。"
      ],
      "examples": [
        {
          "text": "装修验墙角：3-4-5 墨斗",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l4-p2",
      "next": "g05-u1-l5-p1"
    }
  ]
};
