window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g05-u1-l8"] = {
  "lessonId": "g05-u1-l8",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g05",
  "pages": [
    {
      "id": "g05-u1-l8-p1",
      "title": "本章小结：承重墙",
      "concept": "勾股定理全章串讲",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^2 + b^2 = c^2",
          "translation": "直角三角形两直角边的平方和等于斜边的平方"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "发现：方格纸上数格子——9+16=25，猜想 a²+b²=c²。",
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
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "9 + 16 = 25",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "证明：赵爽弦图 + 总统证法——面积两种算法，猜想变定理。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      44.4,
                      10.8
                    ],
                    [
                      89.2,
                      44.4
                    ],
                    [
                      55.6,
                      89.2
                    ],
                    [
                      10.8,
                      55.6
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      70,
                      30
                    ],
                    [
                      70,
                      70
                    ],
                    [
                      30,
                      70
                    ]
                  ],
                  "color": "target",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "c²",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "逆定理：a²+b²=c² → 直角三角形——判定直角的新工具；HL 补上 g04 的拼图。",
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
                  "color": "line",
                  "width": 2.5
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
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "a²+b²=c² → 直角",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "+ HL 判定",
                  "size": 12
                }
              ]
            },
            {
              "caption": "应用：距离公式——勾股定理长成了代数工具。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    15
                  ],
                  "b": [
                    90,
                    15
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    10
                  ],
                  "b": [
                    15,
                    90
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    35
                  ],
                  "b": [
                    55,
                    75
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "d=√[(x₂−x₁)²+(y₂−y₁)²]",
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
        "一句话串全章：数格子发现 → 弦图证明 → 逆定理判定 → 距离公式应用。",
        "枢纽地位：向上承接全等（SSS 证逆定理、HL 补判定），向下支撑圆、相似、解析几何。",
        "三个呼应：H1 弦图↔代数 2.2.2，H2 距离公式↔代数 ch06-u0-l2，H13 √2↔代数 0.1.3。",
        "记住一句话：勾股定理是几何的'承重墙'——后面的圆、相似、解析几何都压在它上面。"
      ],
      "examples": [
        {
          "text": "全章知识图谱",
          "figure": "图表"
        }
      ],
      "prev": "g05-u1-l7-p3",
      "next": "g05-u1-l8-p2"
    },
    {
      "id": "g05-u1-l8-p2",
      "title": "本章习题：6 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^2 + b^2 = c^2",
          "translation": "用勾股定理及其逆定理解题"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "base": [
            {
              "t": "txt",
              "p": [
                50,
                88
              ],
              "text": "点三元组，分进两篮",
              "size": 14.48
            }
          ],
          "groups": [
            {
              "name": "是直角三角形",
              "color": "corrA"
            },
            {
              "name": "不是直角三角形",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "q1",
              "label": "3-4-5",
              "group": 0,
              "anchor": [
                20,
                70
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    8,
                    78
                  ],
                  [
                    32,
                    78
                  ],
                  [
                    8,
                    58
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "q2",
              "label": "5-12-13",
              "group": 0,
              "anchor": [
                60,
                70
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    48,
                    78
                  ],
                  [
                    72,
                    78
                  ],
                  [
                    48,
                    58
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "q3",
              "label": "2-3-4",
              "group": 1,
              "anchor": [
                20,
                42
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    8,
                    50
                  ],
                  [
                    32,
                    50
                  ],
                  [
                    8,
                    30
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            },
            {
              "id": "q4",
              "label": "6-8-10",
              "group": 0,
              "anchor": [
                60,
                42
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    48,
                    50
                  ],
                  [
                    72,
                    50
                  ],
                  [
                    48,
                    30
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "认图：4 个三元组分进两篮：是直角三角形 / 不是。",
        "1．直角边 9、12，求斜边。",
        "2．斜边 25、一条直角边 7，求另一条直角边。",
        "3．三边 8、15、17，是直角三角形吗？",
        "4．A(0,0)、B(3,4)，求 AB 的距离。",
        "5．梯子长 13 米，底端离墙 5 米，顶端高多少？",
        "6．边长 2 的正方形，对角线长？"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "认图：3-4-5、5-12-13、6-8-10 是，2-3-4 不是；1．15；2．24；3．是（64+225=289）；4．5；5．12 米；6．2√2"
        },
        {
          "figure": "错因解析",
          "text": "认图：验 a²+b²=c²——3²+4²=5² 是，2²+3²=13≠16 不是。1．c=√(9²+12²)=√225=15——3-4-5 的 3 倍。2．b=√(25²−7²)=√576=24——7-24-25 勾股数。3．8²+15²=64+225=289=17²：是直角三角形（逆定理）。4．AB=√((3−0)²+(4−0)²)=5——距离公式，3-4-5 再现。5．高=√(13²−5²)=√144=12 米——5-12-13 勾股数。6．对角线=√(2²+2²)=2√2——正方形对角线=边长×√2。"
        }
      ],
      "prev": "g05-u1-l8-p1",
      "next": null
    }
  ]
};
