window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g12-u1-l5"] = {
  "lessonId": "g12-u1-l5",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g12",
  "pages": [
    {
      "id": "g12-u1-l5-p1",
      "title": "本章小结：看穿立体",
      "concept": "立体几何初步全章串讲",
      "formulas": [
        {
          "id": "f1",
          "latex": "V - E + F = 2",
          "translation": "欧拉公式：凸多面体顶点数减棱数加面数等于 2"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "认识：5 种立体——棱是线、面是块、顶点是点；欧拉公式 V−E+F=2。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    30,
                    50
                  ],
                  "r": 10,
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      48,
                      40
                    ],
                    [
                      62,
                      40
                    ],
                    [
                      55,
                      54
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "5 种立体 + 欧拉公式",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "三视图：三个影子（主/左/俯）+ 口诀长对正、高平齐、宽相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      44
                    ],
                    [
                      48,
                      44
                    ],
                    [
                      48,
                      60
                    ],
                    [
                      28,
                      60
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    52
                  ],
                  "text": "主",
                  "size": 13
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      56,
                      44
                    ],
                    [
                      72,
                      44
                    ],
                    [
                      72,
                      60
                    ],
                    [
                      56,
                      60
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    52
                  ],
                  "text": "左",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "三视图：三个影子",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "展开图：11 种（141 六种、231 三种、222 和 33 各一种），“田”字折不成。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      46
                    ],
                    [
                      38,
                      46
                    ],
                    [
                      38,
                      54
                    ],
                    [
                      30,
                      54
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      46
                    ],
                    [
                      46,
                      46
                    ],
                    [
                      46,
                      54
                    ],
                    [
                      38,
                      54
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      46,
                      46
                    ],
                    [
                      54,
                      46
                    ],
                    [
                      54,
                      54
                    ],
                    [
                      46,
                      54
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      54,
                      46
                    ],
                    [
                      62,
                      46
                    ],
                    [
                      62,
                      54
                    ],
                    [
                      54,
                      54
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      54
                    ],
                    [
                      46,
                      54
                    ],
                    [
                      46,
                      62
                    ],
                    [
                      38,
                      62
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      38
                    ],
                    [
                      46,
                      38
                    ],
                    [
                      46,
                      46
                    ],
                    [
                      38,
                      46
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "展开图：11 种",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "截面：切几个面，得几边形——正方体最多 6 条边。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      46,
                      36
                    ],
                    [
                      64,
                      40
                    ],
                    [
                      72,
                      56
                    ],
                    [
                      64,
                      72
                    ],
                    [
                      46,
                      76
                    ],
                    [
                      38,
                      60
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "截面：切几面得几边形",
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
        "一句话串全章：认识 5 种立体→数出欧拉公式→长方体找平行垂直→三视图三个影子→11 种展开图→切出截面。",
        "两样本事：看不懂立体时，记住“转一转”（换角度看三视图）、“拆一拆”（剥开展开图）。",
        "三个口诀：V−E+F=2；长对正、高平齐、宽相等；141、231、222、33。",
        "记住一句话：立体几何就是“看穿”——看穿它的面、它的影子、它的切口。"
      ],
      "examples": [
        {
          "text": "全章知识图谱",
          "figure": "图表"
        }
      ],
      "prev": "g12-u1-l4-p4",
      "next": "g12-u1-l5-p2"
    },
    {
      "id": "g12-u1-l5-p2",
      "title": "本章习题：6 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "V - E + F = 2",
          "translation": "用欧拉公式、三视图、展开图知识解题"
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
              "text": "点名字，分进两篮",
              "size": 14.48
            }
          ],
          "groups": [
            {
              "name": "能折成正方体",
              "color": "corrA"
            },
            {
              "name": "不能折成正方体",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "n1",
              "label": "一四一",
              "group": 0,
              "anchor": [
                25,
                68
              ],
              "shape": {
                "t": "txt",
                "p": [
                  25,
                  68
                ],
                "text": "“一四一”",
                "size": 16,
                "bold": true,
                "color": "corrA"
              }
            },
            {
              "id": "n2",
              "label": "二三一",
              "group": 0,
              "anchor": [
                75,
                68
              ],
              "shape": {
                "t": "txt",
                "p": [
                  75,
                  68
                ],
                "text": "“二三一”",
                "size": 16,
                "bold": true,
                "color": "corrA"
              }
            },
            {
              "id": "n3",
              "label": "田字形",
              "group": 1,
              "anchor": [
                25,
                44
              ],
              "shape": {
                "t": "txt",
                "p": [
                  25,
                  44
                ],
                "text": "“田”字形",
                "size": 16,
                "bold": true,
                "color": "corrB"
              }
            },
            {
              "id": "n4",
              "label": "凹字形",
              "group": 1,
              "anchor": [
                75,
                44
              ],
              "shape": {
                "t": "txt",
                "p": [
                  75,
                  44
                ],
                "text": "“凹”字形",
                "size": 16,
                "bold": true,
                "color": "corrB"
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "认图：4 个名字分两篮：能折成/不能折成正方体。",
        "1．数正方体顶点、棱、面，算 V−E+F。",
        "2．数三棱柱顶点、棱、面，算 V−E+F。",
        "3．长方体中，与一棱平行的几条？相交垂直的几条？",
        "4．主视图长方形、俯视图是圆，是什么？",
        "5．“二二二”型几种？“田”字形为何折不成？",
        "6．纸箱压扁是哪种展开图？做它用多少纸板？"
      ],
      "examples": [
        {
          "text": "认图：一四一、二三一能，田字形、凹字形不能；1．8、12、6，等于 2；2．6、9、5，等于 2；3．3 条平行、4 条相交垂直；4．圆柱；5．1 种，会重叠；6．展开图的一种，纸板面积=表面积",
          "figure": "核对答案"
        },
        {
          "figure": "错因解析",
          "text": "认图：一四一、二三一是标准型能折；“田”字多一块会重叠，“凹”字缺口对不上。1．正方体：8 顶点、12 棱、6 面——8−12+6=2。2．三棱柱：6 顶点、9 棱、5 面——6−9+5=2（欧拉公式都成立）。3．长方体每条棱：平行 3 条、相交垂直 4 条——数一数本章 p5 的图。4．主视图长方形+俯视图圆：侧面看是矩形、顶看是圆——圆柱。5．“二二二”只有 1 种；“田”字折叠时两块重叠——多出一块没地方去。6．压扁的纸箱就是正方体展开图的一种；用纸板=表面积。"
        }
      ],
      "prev": "g12-u1-l5-p1",
      "next": null
    }
  ]
};
