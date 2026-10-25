window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l10"] = {
  "lessonId": "g11-u1-l10",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l10-p1",
      "title": "本章小结：面积公式链",
      "concept": "全章串讲",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = ab \\Rightarrow ah \\Rightarrow \\frac{ah}{2} \\Rightarrow \\frac{(a+b)h}{2} \\Rightarrow \\pi r^2",
          "translation": "面积公式一条链：矩形→平行四边形→三角形→梯形→圆"
        },
        {
          "id": "f2",
          "latex": "V = Sh, V = \\frac{Sh}{3}",
          "translation": "柱体体积是底面积乘高，锥体是它的三分之一"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "面积链：矩形（ab）→ 割补 → 平行四边形（ah）→ 对半 → 三角形（ah/2）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      12,
                      40
                    ],
                    [
                      28,
                      40
                    ],
                    [
                      28,
                      56
                    ],
                    [
                      12,
                      56
                    ]
                  ],
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    66
                  ],
                  "text": "ab",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    34,
                    48
                  ],
                  "text": "→",
                  "size": 14.48
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      40
                    ],
                    [
                      54,
                      40
                    ],
                    [
                      58,
                      56
                    ],
                    [
                      42,
                      56
                    ]
                  ],
                  "color": "corrB",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    48,
                    66
                  ],
                  "text": "ah",
                  "size": 12,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    48
                  ],
                  "text": "→",
                  "size": 14.48
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      66,
                      40
                    ],
                    [
                      86,
                      40
                    ],
                    [
                      76,
                      56
                    ]
                  ],
                  "color": "corrC",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    66
                  ],
                  "text": "ah/2",
                  "size": 12,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "割补 + 对半",
                  "size": 13
                }
              ]
            },
            {
              "caption": "梯形（(a+b)h/2）：两个拼成平行四边形再对半——还是割补。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      40
                    ],
                    [
                      70,
                      40
                    ],
                    [
                      60,
                      58
                    ],
                    [
                      40,
                      58
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "(a+b)h/2",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "两个拼一拼，再对半",
                  "size": 13
                }
              ]
            },
            {
              "caption": "圆（πr²）：切成瓣拼成长方形——“化圆为方”，极限思想。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    30,
                    49
                  ],
                  "r": 14,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    49
                  ],
                  "text": "→",
                  "size": 16
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      37
                    ],
                    [
                      88,
                      37
                    ],
                    [
                      88,
                      61
                    ],
                    [
                      58,
                      61
                    ]
                  ],
                  "color": "target",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    73,
                    72
                  ],
                  "text": "πr²",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "分割→近似→极限",
                  "size": 13
                }
              ]
            },
            {
              "caption": "体积链：柱体 V=Sh → 锥体 V=Sh/3（三杯沙）→ 球（S=4πr²，V=4πr³/3）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      42
                    ],
                    [
                      30,
                      42
                    ],
                    [
                      30,
                      60
                    ],
                    [
                      14,
                      60
                    ]
                  ],
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    22,
                    70
                  ],
                  "text": "Sh",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      60
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      50,
                      42
                    ]
                  ],
                  "color": "corrB",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    70
                  ],
                  "text": "Sh/3",
                  "size": 12,
                  "color": "corrB",
                  "math": true
                },
                {
                  "t": "circle",
                  "c": [
                    76,
                    51
                  ],
                  "r": 11,
                  "color": "corrC",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    70
                  ],
                  "text": "球",
                  "size": 12,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "体积靠“摞”",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "一句话串全章：面积靠“割补”（平行四边形→三角形→梯形），圆靠“极限”（化圆为方）。",
        "体积靠“摞”：柱体 V=Sh，锥体是它的三分之一，球单记两个公式。",
        "三种思想：割补（面积守恒）、极限（越来越像）、摞（体积=底面积×高）。",
        "记住一句话：割补算面积，极限化圆方，摞出体积来。"
      ],
      "examples": [
        {
          "text": "全章知识图谱",
          "figure": "图表"
        }
      ],
      "prev": "g11-u1-l9-p3",
      "next": "g11-u1-l10-p2"
    },
    {
      "id": "g11-u1-l10-p2",
      "title": "本章习题：8 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = ah, V = Sh",
          "translation": "用面积公式和体积公式解题"
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
                90
              ],
              "text": "点一点，分进三篮",
              "size": 14.48
            }
          ],
          "groups": [
            {
              "name": "柱体",
              "color": "corrA"
            },
            {
              "name": "锥体",
              "color": "corrB"
            },
            {
              "name": "球",
              "color": "corrC"
            }
          ],
          "items": [
            {
              "id": "q1",
              "label": "长方体",
              "group": 0,
              "anchor": [
                18,
                70
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    8,
                    62
                  ],
                  [
                    28,
                    62
                  ],
                  [
                    28,
                    78
                  ],
                  [
                    8,
                    78
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "q2",
              "label": "圆柱",
              "group": 0,
              "anchor": [
                50,
                70
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    40,
                    62
                  ],
                  [
                    60,
                    62
                  ],
                  [
                    60,
                    78
                  ],
                  [
                    40,
                    78
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "q3",
              "label": "正方体",
              "group": 0,
              "anchor": [
                82,
                70
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    74,
                    62
                  ],
                  [
                    90,
                    62
                  ],
                  [
                    90,
                    78
                  ],
                  [
                    74,
                    78
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "q4",
              "label": "圆锥",
              "group": 1,
              "anchor": [
                18,
                40
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    8,
                    48
                  ],
                  [
                    28,
                    48
                  ],
                  [
                    18,
                    32
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            },
            {
              "id": "q5",
              "label": "四棱锥",
              "group": 1,
              "anchor": [
                50,
                40
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    40,
                    48
                  ],
                  [
                    60,
                    48
                  ],
                  [
                    50,
                    32
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            },
            {
              "id": "q6",
              "label": "球",
              "group": 2,
              "anchor": [
                82,
                40
              ],
              "shape": {
                "t": "circle",
                "c": [
                  82,
                  40
                ],
                "r": 9,
                "color": "corrC",
                "width": 2.5
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "认图：6 个立体图形分进三篮：柱体 / 锥体 / 球。",
        "1．平行四边形底 8cm、高 5cm，面积？",
        "2．三角形底 10cm、高 6cm，面积？",
        "3．梯形上底 4cm、下底 8cm、高 5cm，面积？",
        "4．圆半径 5cm，面积？（保留 π）",
        "5．圆柱 r=2cm、h=6cm，体积？",
        "6．等底等高的圆锥，体积是圆柱的几分之几？",
        "7．已知圆柱体积是 24πcm³、高 6cm，底面半径 r 是多少？（逆向：从体积反求半径）",
        "8．一个圆柱和一个圆锥等底等高，体积加起来是 48cm³，圆锥的体积是多少？（想想 1 份和 3 份）"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "认图：长方体/圆柱/正方体是柱体，圆锥/四棱锥是锥体，球是球；1．40cm²；2．30cm²；3．30cm²；4．25π cm²；5．24π cm³；6．三分之一；7．r=2cm（πr²×6=24π）；8．12cm³（圆锥 1 份、圆柱 3 份，共 4 份）"
        },
        {
          "figure": "错因解析",
          "text": "认图：柱体上下一样粗（长方体/圆柱/正方体），锥体一头尖（圆锥/棱锥），球滚圆。1．平行四边形面积=底×高=8×5=40cm²。2．三角形面积=底×高÷2=10×6÷2=30cm²——别漏除以 2。3．梯形面积=(上底+下底)×高÷2=(4+8)×5÷2=30cm²。4．圆面积=πr²=25π cm²。5．圆柱体积=底面积×高=4π×6=24π cm³。6．等底等高：V锥=V柱/3——“三分之一”是铁律。7．πr²×6=24π：r²=4，r=2cm——从体积反求半径。8．圆锥 1 份、圆柱 3 份：48÷4=12cm³ 是圆锥。"
        }
      ],
      "prev": "g11-u1-l10-p1",
      "next": null
    }
  ]
};
