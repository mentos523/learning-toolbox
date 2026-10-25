window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g12-u1-l1"] = {
  "lessonId": "g12-u1-l1",
  "lessonTitle": "走进立体图形：认识与空间位置",
  "chapterId": "g12",
  "pages": [
    {
      "id": "g12-u1-l1-p1",
      "title": "五种立体，转着看",
      "concept": "棱柱、棱锥、圆柱、圆锥、球",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{柱体，上下一样粗}",
          "translation": "柱体上下两头形状大小一样，像一根切出来的柱子"
        },
        {
          "id": "f2",
          "latex": "\\text{锥体，一头是尖顶}",
          "translation": "锥体一头是尖顶，像削好的铅笔尖"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 种：棱柱——上下两个底面一模一样，像一刀切出来的柱子。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      38
                    ],
                    [
                      54,
                      38
                    ],
                    [
                      41,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      48
                    ],
                    [
                      64,
                      48
                    ],
                    [
                      51,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    38
                  ],
                  "b": [
                    38,
                    48
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    54,
                    38
                  ],
                  "b": [
                    64,
                    48
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    41,
                    58
                  ],
                  "b": [
                    51,
                    68
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "棱柱：上下底面一模一样",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 种：棱锥——底面是个多边形，侧面全是三角形，顶上聚成一个尖。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      60
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      60,
                      72
                    ],
                    [
                      30,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    34
                  ],
                  "b": [
                    30,
                    60
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    34
                  ],
                  "b": [
                    60,
                    60
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    34
                  ],
                  "b": [
                    60,
                    72
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    34
                  ],
                  "b": [
                    30,
                    72
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    34
                  ],
                  "label": "顶",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "棱锥：底面多边形，顶上一个尖",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 种：圆柱——上下两个圆一样大，侧面是曲面，像一节水管。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    45,
                    62
                  ],
                  "r": 15,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    62
                  ],
                  "b": [
                    30,
                    32
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    62
                  ],
                  "b": [
                    60,
                    32
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    32
                  ],
                  "b": [
                    60,
                    32
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "圆柱：两个圆一样大，侧面是曲面",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 4 种：圆锥——底面是圆，顶上一个尖，像圣诞帽。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    45,
                    60
                  ],
                  "r": 15,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    32
                  ],
                  "b": [
                    30,
                    60
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    32
                  ],
                  "b": [
                    60,
                    60
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    32
                  ],
                  "label": "顶",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "圆锥：底面是圆，顶上一个尖",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 5 种：球——浑身是曲面，没有棱也没有顶点，像篮球。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    45,
                    52
                  ],
                  "r": 18,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "球：浑身曲面，没有棱也没有顶点",
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
        "点▶，五种立体排着队转到你面前：棱柱、棱锥、圆柱、圆锥、球。",
        "先认长相：柱体上下一样粗，锥体一头尖，球浑身圆溜溜。",
        "名字带“棱”的是多面体；圆柱、圆锥、球有曲面。"
      ],
      "examples": [
        {
          "text": "纸箱→长方体（特殊的棱柱）；蛋筒→圆锥",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g12-u1-l1-p2"
    },
    {
      "id": "g12-u1-l1-p2",
      "title": "给立体“点名”",
      "concept": "棱、面、顶点",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{面：平平的一块}",
          "translation": "（多面体的）面是围成立体的一块平面"
        },
        {
          "id": "f2",
          "latex": "\\text{棱：面与面的交线}",
          "translation": "棱是两个面相交的线"
        },
        {
          "id": "f3",
          "latex": "\\text{顶点：棱与棱的交点}",
          "translation": "顶点是棱与棱相交的点"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "点名“面”：长方体有 6 个面，每个面都是长方形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      40
                    ],
                    [
                      62,
                      40
                    ],
                    [
                      62,
                      62
                    ],
                    [
                      28,
                      62
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      52
                    ],
                    [
                      74,
                      52
                    ],
                    [
                      74,
                      74
                    ],
                    [
                      40,
                      74
                    ]
                  ],
                  "color": "line",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    40
                  ],
                  "b": [
                    40,
                    52
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    40
                  ],
                  "b": [
                    74,
                    52
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    62
                  ],
                  "b": [
                    74,
                    74
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    62
                  ],
                  "b": [
                    40,
                    74
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      40
                    ],
                    [
                      62,
                      40
                    ],
                    [
                      62,
                      62
                    ],
                    [
                      28,
                      62
                    ]
                  ],
                  "color": "target",
                  "width": 2,
                  "fill": "target",
                  "opacity": 0.25
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    51
                  ],
                  "text": "1 个面",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "点名“棱”：两个面交出一条棱，长方体有 12 条棱。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      40
                    ],
                    [
                      62,
                      40
                    ],
                    [
                      62,
                      62
                    ],
                    [
                      28,
                      62
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      52
                    ],
                    [
                      74,
                      52
                    ],
                    [
                      74,
                      74
                    ],
                    [
                      40,
                      74
                    ]
                  ],
                  "color": "line",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    40
                  ],
                  "b": [
                    62,
                    40
                  ],
                  "color": "target",
                  "width": 5
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    30
                  ],
                  "text": "1 条棱",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "点名“顶点”：几条棱交出一个顶点，长方体有 8 个顶点。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      40
                    ],
                    [
                      62,
                      40
                    ],
                    [
                      62,
                      62
                    ],
                    [
                      28,
                      62
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      52
                    ],
                    [
                      74,
                      52
                    ],
                    [
                      74,
                      74
                    ],
                    [
                      40,
                      74
                    ]
                  ],
                  "color": "line",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    28,
                    40
                  ],
                  "label": "顶点",
                  "color": "target",
                  "r": 6
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    30
                  ],
                  "text": "1 个顶点",
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
        "还记得吗？上一页五种立体排队时，棱柱棱角分明、球圆溜溜——差别就在“棱”和“面”上。",
        "（多面体的）面，就是围成立体的一块平面；棱，是两个面相交的线；顶点，是棱与棱相交的点。",
        "拿长方体数一遍：6 个面、12 条棱、8 个顶点。",
        "生活例：魔方有 6 个面；图形例：三棱柱有 5 个面、9 条棱、6 个顶点（自己数一遍）。",
        "反例：球没有棱也没有顶点——别给球数棱！",
        "⚠️ 别搞混：“棱”是线不是面——“这条棱”指的是一条边，不是那一块面。",
        "记住一句话：面是块，棱是线，顶点是点。"
      ],
      "examples": [
        {
          "text": "拿起魔方，数出它的 6 个面、12 条棱、8 个顶点",
          "figure": "动手"
        }
      ],
      "prev": "g12-u1-l1-p1",
      "next": "g12-u1-l1-p3"
    },
    {
      "id": "g12-u1-l1-p3",
      "title": "数一数，有惊喜",
      "concept": "欧拉公式 V−E+F=2 的发现",
      "formulas": [
        {
          "id": "f1",
          "latex": "V - E + F = 2",
          "translation": "顶点数减棱数加面数，凸多面体永远等于 2"
        },
        {
          "id": "f2",
          "latex": "8 - 12 + 6 = 2",
          "translation": "正方体：8 个顶点、12 条棱、6 个面，8 减 12 加 6 等于 2"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：数顶点——正方体 8 个顶点，一个个亮起来。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      30,
                      60
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    60,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    30
                  ],
                  "b": [
                    60,
                    60
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    60
                  ],
                  "b": [
                    30,
                    60
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    30,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    30
                  ],
                  "color": "corrA",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    30
                  ],
                  "color": "corrA",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    60
                  ],
                  "color": "corrA",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    60
                  ],
                  "color": "corrA",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    42,
                    42
                  ],
                  "color": "corrA",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    72,
                    42
                  ],
                  "color": "corrA",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    72,
                    72
                  ],
                  "color": "corrA",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    42,
                    72
                  ],
                  "color": "corrA",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "顶点 V = 8",
                  "size": 15,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 2 步：数棱——12 条棱，别漏了底面那一圈。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      30,
                      60
                    ]
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    42
                  ],
                  "b": [
                    72,
                    42
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    42
                  ],
                  "b": [
                    72,
                    72
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    72
                  ],
                  "b": [
                    42,
                    72
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    72
                  ],
                  "b": [
                    42,
                    42
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    42,
                    42
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    30
                  ],
                  "b": [
                    72,
                    42
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    60
                  ],
                  "b": [
                    72,
                    72
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    42,
                    72
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "棱 E = 12",
                  "size": 15,
                  "bold": true,
                  "color": "corrB"
                }
              ]
            },
            {
              "caption": "第 3 步：数面——6 个面：前、后、左、右、上、下。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      30,
                      60
                    ]
                  ],
                  "color": "corrC",
                  "width": 2,
                  "fill": "corrC",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      42,
                      42
                    ],
                    [
                      72,
                      42
                    ],
                    [
                      72,
                      72
                    ],
                    [
                      42,
                      72
                    ]
                  ],
                  "color": "corrC",
                  "width": 2,
                  "fill": "corrC",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      60
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      72,
                      72
                    ],
                    [
                      42,
                      72
                    ]
                  ],
                  "color": "corrC",
                  "width": 2,
                  "fill": "corrC",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      72,
                      42
                    ],
                    [
                      42,
                      42
                    ]
                  ],
                  "color": "corrC",
                  "width": 2,
                  "fill": "corrC",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      30,
                      60
                    ],
                    [
                      42,
                      72
                    ],
                    [
                      42,
                      42
                    ]
                  ],
                  "color": "corrC",
                  "width": 2,
                  "fill": "corrC",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      60,
                      30
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      72,
                      72
                    ],
                    [
                      72,
                      42
                    ]
                  ],
                  "color": "corrC",
                  "width": 2,
                  "fill": "corrC",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "面 F = 6",
                  "size": 15,
                  "bold": true,
                  "color": "corrC"
                }
              ]
            },
            {
              "caption": "第 4 步：算一算——正方体 8−12+6=2；换三棱柱（6 顶点、9 棱、5 面），6−9+5 还是 2！",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "8 − 12 + 6 = 2",
                  "size": 18,
                  "bold": true
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      38
                    ],
                    [
                      54,
                      38
                    ],
                    [
                      41,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      48
                    ],
                    [
                      64,
                      48
                    ],
                    [
                      51,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    38
                  ],
                  "b": [
                    38,
                    48
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    54,
                    38
                  ],
                  "b": [
                    64,
                    48
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    41,
                    58
                  ],
                  "b": [
                    51,
                    68
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    22
                  ],
                  "text": "三棱柱：6 − 9 + 5 = 2",
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
        "跟着动画数一遍：正方体 8 个顶点、12 条棱、6 个面。",
        "算一下：8−12+6=2。换三棱柱数：6 个顶点、9 条棱、5 个面，6−9+5 还是 2！",
        "记住这个 2：换一个凸多面体，V−E+F 还是 2——没变的是这个 2。"
      ],
      "examples": [
        {
          "text": "骰子就是正方体，拿一颗骰子自己数一遍",
          "figure": "实物"
        }
      ],
      "prev": "g12-u1-l1-p2",
      "next": "g12-u1-l1-p4"
    },
    {
      "id": "g12-u1-l1-p4",
      "title": "欧拉公式：永远的 2",
      "concept": "欧拉公式 V−E+F=2",
      "formulas": [
        {
          "id": "f1",
          "latex": "V - E + F = 2",
          "translation": "顶点数减棱数加面数等于 2（凸多面体欧拉公式）"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "正方体：8 个顶点、12 条棱、6 个面，8−12+6=2。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      30,
                      60
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    42
                  ],
                  "b": [
                    72,
                    42
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    42
                  ],
                  "b": [
                    42,
                    72
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    42,
                    42
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    30
                  ],
                  "b": [
                    72,
                    42
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    42
                  ],
                  "b": [
                    72,
                    72
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    72
                  ],
                  "b": [
                    72,
                    72
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    60
                  ],
                  "b": [
                    72,
                    72
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    42,
                    72
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "V − E + F = 8 − 12 + 6 = 2",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "三棱柱：6 个顶点、9 条棱、5 个面，6−9+5=2——换了个图形，答案还是 2。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      38
                    ],
                    [
                      54,
                      38
                    ],
                    [
                      41,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      48
                    ],
                    [
                      64,
                      48
                    ],
                    [
                      51,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    38
                  ],
                  "b": [
                    38,
                    48
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    54,
                    38
                  ],
                  "b": [
                    64,
                    48
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    41,
                    58
                  ],
                  "b": [
                    51,
                    68
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "V − E + F = 6 − 9 + 5 = 2",
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
        "还记得吗？上一页你数了正方体（8−12+6=2），又数了三棱柱（6−9+5=2）——换了个图形，答案还是 2。",
        "这就是欧拉公式：V−E+F=2。V 是顶点数，E 是棱数，F 是面数。",
        "两百多年前，数学家欧拉发现：鼓鼓的（凸）多面体算出来都是 2。",
        "生活例：足球 60 个顶点、90 条棱、32 个面，60−90+32=2；图形例：四棱锥 5−8+5=2。",
        "反例：数棱时漏了底面一圈，算出来就不等于 2——错的是数法，不是公式。",
        "⚠️ 别搞混：公式里 E 前面是减号——V−E+F，不是 V+E+F。",
        "记住一句话：凸多面体顶点减棱加面，永远等于 2。"
      ],
      "examples": [
        {
          "text": "足球：60 个顶点、90 条棱、32 个面，60−90+32=2",
          "figure": "实物"
        }
      ],
      "prev": "g12-u1-l1-p3",
      "next": "g12-u1-l1-p5"
    },
    {
      "id": "g12-u1-l1-p5",
      "title": "长方体里找平行找垂直",
      "concept": "空间中的平行与垂直（直观）",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB \\parallel CD",
          "translation": "棱 AB 与棱 CD 平行"
        },
        {
          "id": "f2",
          "latex": "AB \\perp BC",
          "translation": "棱 AB 与棱 BC 垂直"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "base": [
            {
              "t": "seg",
              "a": [
                25,
                30
              ],
              "b": [
                65,
                30
              ],
              "color": "line",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                65,
                30
              ],
              "b": [
                65,
                55
              ],
              "color": "line",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                65,
                55
              ],
              "b": [
                25,
                55
              ],
              "color": "line",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                25,
                55
              ],
              "b": [
                25,
                30
              ],
              "color": "line",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                39,
                44
              ],
              "b": [
                79,
                44
              ],
              "color": "line",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                79,
                44
              ],
              "b": [
                79,
                69
              ],
              "color": "line",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                79,
                69
              ],
              "b": [
                39,
                69
              ],
              "color": "line",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                39,
                69
              ],
              "b": [
                39,
                44
              ],
              "color": "line",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                65,
                55
              ],
              "b": [
                79,
                69
              ],
              "color": "aux",
              "width": 2,
              "dash": "5,4"
            },
            {
              "t": "seg",
              "a": [
                25,
                55
              ],
              "b": [
                39,
                69
              ],
              "color": "aux",
              "width": 2,
              "dash": "5,4"
            },
            {
              "t": "seg",
              "a": [
                79,
                44
              ],
              "b": [
                79,
                69
              ],
              "color": "aux",
              "width": 2,
              "dash": "5,4"
            },
            {
              "t": "seg",
              "a": [
                39,
                44
              ],
              "b": [
                39,
                69
              ],
              "color": "aux",
              "width": 2,
              "dash": "5,4"
            },
            {
              "t": "seg",
              "a": [
                25,
                30
              ],
              "b": [
                65,
                30
              ],
              "color": "target",
              "width": 4.5
            },
            {
              "t": "txt",
              "p": [
                21,
                28
              ],
              "text": "A",
              "size": 13,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                69,
                28
              ],
              "text": "B",
              "size": 13,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                50,
                88
              ],
              "text": "红色是棱 AB：点棱，分进两篮",
              "size": 13
            }
          ],
          "groups": [
            {
              "name": "与 AB 平行的棱",
              "color": "corrA"
            },
            {
              "name": "与 AB 垂直的棱（交于一点的）",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "p1",
              "label": "CD",
              "group": 0,
              "anchor": [
                59,
                44
              ],
              "shape": {
                "t": "seg",
                "a": [
                  39,
                  44
                ],
                "b": [
                  79,
                  44
                ],
                "color": "corrA",
                "width": 3
              }
            },
            {
              "id": "p2",
              "label": "A1B1",
              "group": 0,
              "anchor": [
                45,
                55
              ],
              "shape": {
                "t": "seg",
                "a": [
                  25,
                  55
                ],
                "b": [
                  65,
                  55
                ],
                "color": "corrA",
                "width": 3
              }
            },
            {
              "id": "p3",
              "label": "C1D1",
              "group": 0,
              "anchor": [
                59,
                69
              ],
              "shape": {
                "t": "seg",
                "a": [
                  39,
                  69
                ],
                "b": [
                  79,
                  69
                ],
                "color": "corrA",
                "width": 3
              }
            },
            {
              "id": "v1",
              "label": "AD",
              "group": 1,
              "anchor": [
                32,
                37
              ],
              "shape": {
                "t": "seg",
                "a": [
                  25,
                  30
                ],
                "b": [
                  39,
                  44
                ],
                "color": "corrB",
                "width": 3
              }
            },
            {
              "id": "v2",
              "label": "AA1",
              "group": 1,
              "anchor": [
                25,
                42
              ],
              "shape": {
                "t": "seg",
                "a": [
                  25,
                  30
                ],
                "b": [
                  25,
                  55
                ],
                "color": "corrB",
                "width": 3
              }
            },
            {
              "id": "v3",
              "label": "BC",
              "group": 1,
              "anchor": [
                72,
                37
              ],
              "shape": {
                "t": "seg",
                "a": [
                  65,
                  30
                ],
                "b": [
                  79,
                  44
                ],
                "color": "corrB",
                "width": 3
              }
            },
            {
              "id": "v4",
              "label": "BB1",
              "group": 1,
              "anchor": [
                65,
                42
              ],
              "shape": {
                "t": "seg",
                "a": [
                  65,
                  30
                ],
                "b": [
                  65,
                  55
                ],
                "color": "corrB",
                "width": 3
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "红色的棱是 AB。点一点：找出所有与 AB 平行的棱，点进“平行”篮。",
        "再找：与 AB 垂直、并且和 AB 交于一点的棱，点进“垂直”篮。",
        "灰色虚线的 4 条棱隔着空间，既不平行也不相交——本书不展开，记住“隔着空间”这个现象。"
      ],
      "examples": [
        {
          "text": "教室的墙角：三条棱两两垂直",
          "figure": "实物"
        }
      ],
      "prev": "g12-u1-l1-p4",
      "next": "g12-u1-l1-p6"
    },
    {
      "id": "g12-u1-l1-p6",
      "title": "平行垂直，看得见",
      "concept": "空间平行与垂直的直观判断",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB \\parallel CD",
          "translation": "AB 与 CD 平行：在同一个面里，永不相交"
        },
        {
          "id": "f2",
          "latex": "AB \\perp BC",
          "translation": "AB 与 BC 垂直：在同一个面里，夹角是 90 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "平行：与 AB 平行的 3 条棱，加上 AB 自己——4 条互相平行。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    65,
                    30
                  ],
                  "color": "corrA",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    39,
                    44
                  ],
                  "b": [
                    79,
                    44
                  ],
                  "color": "corrA",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    55
                  ],
                  "b": [
                    65,
                    55
                  ],
                  "color": "corrA",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    39,
                    69
                  ],
                  "b": [
                    79,
                    69
                  ],
                  "color": "corrA",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    25,
                    55
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    30
                  ],
                  "b": [
                    65,
                    55
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    39,
                    44
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    30
                  ],
                  "b": [
                    79,
                    44
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "4 条棱互相平行",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "垂直：与 AB 交于一点的 4 条棱，都和 AB 垂直。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    65,
                    30
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    25,
                    55
                  ],
                  "color": "corrB",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    39,
                    44
                  ],
                  "color": "corrB",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    30
                  ],
                  "b": [
                    65,
                    55
                  ],
                  "color": "corrB",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    30
                  ],
                  "b": [
                    79,
                    44
                  ],
                  "color": "corrB",
                  "width": 4
                },
                {
                  "t": "right",
                  "v": [
                    25,
                    30
                  ],
                  "p": [
                    65,
                    30
                  ],
                  "q": [
                    25,
                    55
                  ],
                  "size": 5,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "交于一点，夹角 90°",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrB"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？上一页你在长方体里找：与 AB 平行的 3 条、垂直（交于一点）的 4 条。",
        "直观判断法：先看“是不是在同一个面里”——在同一个面里，永不相交就是平行，夹角 90° 就是垂直。和平面里学的一样。",
        "生活例：教室墙角三条棱两两垂直；图形例：长方体每条棱有 3 条平行棱、4 条相交垂直棱。",
        "反例：立体里“不相交”不一定平行——隔着空间的两条棱也可能不相交，本书不展开，记住“隔着空间”这个现象。",
        "⚠️ 别搞混：垂直不一定非要相交——隔着空间的垂直本书不展开，记住“隔着空间”这个现象；现在只认“交于一点”的垂直。",
        "记住一句话：先找同面，再看平行垂直。"
      ],
      "examples": [
        {
          "text": "书本的 12 条棱：每条都有 3 条平行棱",
          "figure": "实物"
        }
      ],
      "prev": "g12-u1-l1-p5",
      "next": "g12-u1-l2-p1"
    }
  ]
};
