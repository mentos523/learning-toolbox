window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g12-u1-l2"] = {
  "lessonId": "g12-u1-l2",
  "lessonTitle": "三视图",
  "chapterId": "g12",
  "pages": [
    {
      "id": "g12-u1-l2-p1",
      "title": "三束光，三个影子",
      "concept": "三视图：主视图、左视图、俯视图",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{主视图，从前看}",
          "translation": "从前面看物体得到的图形叫主视图"
        },
        {
          "id": "f2",
          "latex": "\\text{左视图，从左看}",
          "translation": "从左面看物体得到的图形叫左视图"
        },
        {
          "id": "f3",
          "latex": "\\text{俯视图，从上看}",
          "translation": "从上面看物体得到的图形叫俯视图"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 束光：从前面直直照过去，墙上留下主视图。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      40
                    ],
                    [
                      38,
                      40
                    ],
                    [
                      38,
                      60
                    ],
                    [
                      18,
                      60
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    44
                  ],
                  "b": [
                    58,
                    44
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    50
                  ],
                  "b": [
                    58,
                    50
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    56
                  ],
                  "b": [
                    58,
                    56
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      38
                    ],
                    [
                      86,
                      38
                    ],
                    [
                      86,
                      62
                    ],
                    [
                      62,
                      62
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.2
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    72
                  ],
                  "text": "主视图",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "光从前面来，直直照过去",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 束光：从左面直直照过去，墙上留下左视图。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      40
                    ],
                    [
                      82,
                      40
                    ],
                    [
                      82,
                      60
                    ],
                    [
                      62,
                      60
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    44
                  ],
                  "b": [
                    42,
                    44
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    50
                  ],
                  "b": [
                    42,
                    50
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    56
                  ],
                  "b": [
                    42,
                    56
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      38
                    ],
                    [
                      38,
                      38
                    ],
                    [
                      38,
                      62
                    ],
                    [
                      18,
                      62
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.2
                },
                {
                  "t": "txt",
                  "p": [
                    28,
                    72
                  ],
                  "text": "左视图",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "光从左面来，直直照过去",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 束光：从上面直直照过去，地上留下俯视图。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      48
                    ],
                    [
                      62,
                      48
                    ],
                    [
                      62,
                      68
                    ],
                    [
                      38,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    48
                  ],
                  "b": [
                    42,
                    28
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    50,
                    28
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    58,
                    48
                  ],
                  "b": [
                    58,
                    28
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      36,
                      12
                    ],
                    [
                      64,
                      12
                    ],
                    [
                      64,
                      24
                    ],
                    [
                      36,
                      24
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    36
                  ],
                  "text": "俯视图",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "光从上面来，直直照过去",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点▶：三束光从前、左、上三个方向直直照过去，留下三个影子。",
        "这三个影子就是三视图：主视图（从前看）、左视图（从左看）、俯视图（从上看）。",
        "记住：光是直直照过去的，不斜照——看到几层就是几层。"
      ],
      "examples": [
        {
          "text": "工程图纸就是按三视图画的",
          "figure": "实物"
        }
      ],
      "prev": "g12-u1-l1-p6",
      "next": "g12-u1-l2-p2"
    },
    {
      "id": "g12-u1-l2-p2",
      "title": "三个视图各看什么",
      "concept": "主视图、左视图、俯视图的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{主视图} + \\text{左视图} + \\text{俯视图}",
          "translation": "三个视图合起来，才能确定物体的形状"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "主视图：从前看——左边 2 层，右边 1 层。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      40
                    ],
                    [
                      54,
                      40
                    ],
                    [
                      54,
                      52
                    ],
                    [
                      42,
                      52
                    ],
                    [
                      42,
                      64
                    ],
                    [
                      30,
                      64
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    52
                  ],
                  "b": [
                    54,
                    52
                  ],
                  "color": "target",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "主视图：左 2 层、右 1 层",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "左视图：从左看——一列 2 层。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      40
                    ],
                    [
                      50,
                      40
                    ],
                    [
                      50,
                      64
                    ],
                    [
                      38,
                      64
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    52
                  ],
                  "b": [
                    50,
                    52
                  ],
                  "color": "target",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "左视图：一列 2 层",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "俯视图：从上看——横着 2 格。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      44
                    ],
                    [
                      54,
                      44
                    ],
                    [
                      54,
                      56
                    ],
                    [
                      30,
                      56
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    44
                  ],
                  "b": [
                    42,
                    56
                  ],
                  "color": "target",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "俯视图：横着 2 格",
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
        "还记得吗？三束光留下三个影子：从前看是主视图，从左看是左视图，从上看是俯视图。",
        "一个视图不够：只看俯视图，一个圆柱和一个球看起来都是圆。三个视图合起来，形状才定得下来。",
        "生活例：体检拍片要拍正位和侧位；图形例：组合体三个视图各数“几层几列”。",
        "反例：左视图是从左“看”到的影子，不是物体左边的东西！",
        "⚠️ 别搞混：左视图是“从左往右看”，别站到右边去看。",
        "记住一句话：前主、左左、上俯，三个影子定形状。"
      ],
      "examples": [
        {
          "text": "用 3 个骰子搭组合体，自己画它的三视图",
          "figure": "动手"
        }
      ],
      "prev": "g12-u1-l2-p1",
      "next": "g12-u1-l2-p3"
    },
    {
      "id": "g12-u1-l2-p3",
      "title": "口诀：长对正高平齐",
      "concept": "三视图口诀：长对正、高平齐、宽相等",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{长对正，主俯}",
          "translation": "主视图和俯视图，左右的长要对正"
        },
        {
          "id": "f2",
          "latex": "\\text{高平齐，主左}",
          "translation": "主视图和左视图，上下的高要平齐"
        },
        {
          "id": "f3",
          "latex": "\\text{宽相等，左俯}",
          "translation": "左视图和俯视图，前后的宽要相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "长对正：主视图和俯视图，左右的长对正——画两条对齐线检查。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      52
                    ],
                    [
                      56,
                      52
                    ],
                    [
                      56,
                      72
                    ],
                    [
                      28,
                      72
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      20
                    ],
                    [
                      56,
                      20
                    ],
                    [
                      56,
                      34
                    ],
                    [
                      28,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    18
                  ],
                  "b": [
                    28,
                    74
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    56,
                    18
                  ],
                  "b": [
                    56,
                    74
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    44
                  ],
                  "text": "主",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    28
                  ],
                  "text": "俯",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "长对正：主俯",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "高平齐：主视图和左视图，上下的高平齐。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      40
                    ],
                    [
                      44,
                      40
                    ],
                    [
                      44,
                      64
                    ],
                    [
                      20,
                      64
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      56,
                      40
                    ],
                    [
                      76,
                      40
                    ],
                    [
                      76,
                      64
                    ],
                    [
                      56,
                      64
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    40
                  ],
                  "b": [
                    78,
                    40
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    64
                  ],
                  "b": [
                    78,
                    64
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    32,
                    53
                  ],
                  "text": "主",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    66,
                    53
                  ],
                  "text": "左",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "高平齐：主左",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "宽相等：左视图和俯视图，前后的宽相等。",
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
                      64
                    ],
                    [
                      28,
                      64
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      44
                    ],
                    [
                      78,
                      44
                    ],
                    [
                      78,
                      64
                    ],
                    [
                      58,
                      64
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    55
                  ],
                  "text": "左",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    55
                  ],
                  "text": "俯",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "宽相等：左俯",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "（前后方向的宽一样）",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？三个视图各就各位后，它们之间还有“对暗号”的规矩——这就是画三视图的口诀。",
        "长对正：主视图和俯视图，左右的长要对正；高平齐：主视图和左视图，上下的高要平齐；宽相等：左视图和俯视图，前后的宽要相等。",
        "生活例：拼积木按图纸，左右对不齐就拼歪了；图形例：画对齐线检查谁和谁对。",
        "反例：主视图画得比俯视图长——“长”没对正，图就错了。",
        "⚠️ 别搞混：是“主俯长、主左高、左俯宽”配对，别张冠李戴。",
        "记住一句话：长对正，高平齐，宽相等。"
      ],
      "examples": [
        {
          "text": "画长方体的三视图，用尺子检查三组对齐",
          "figure": "动手"
        }
      ],
      "prev": "g12-u1-l2-p2",
      "next": "g12-u1-l2-p4"
    },
    {
      "id": "g12-u1-l2-p4",
      "title": "你能认出三个视图吗",
      "concept": "三视图辨认",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{主视图} \\neq \\text{左视图}",
          "translation": "同一个物体，主视图和左视图常常不一样"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "base": [
            {
              "t": "poly",
              "pts": [
                [
                  20,
                  14
                ],
                [
                  32,
                  14
                ],
                [
                  32,
                  26
                ],
                [
                  20,
                  26
                ]
              ],
              "color": "known",
              "width": 2
            },
            {
              "t": "poly",
              "pts": [
                [
                  32,
                  14
                ],
                [
                  44,
                  14
                ],
                [
                  44,
                  26
                ],
                [
                  32,
                  26
                ]
              ],
              "color": "known",
              "width": 2
            },
            {
              "t": "poly",
              "pts": [
                [
                  20,
                  26
                ],
                [
                  32,
                  26
                ],
                [
                  32,
                  38
                ],
                [
                  20,
                  38
                ]
              ],
              "color": "known",
              "width": 2
            },
            {
              "t": "txt",
              "p": [
                50,
                88
              ],
              "text": "组合体：下面 2 个、上面 1 个（在左上）",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                50,
                80
              ],
              "text": "点小图，分进四个篮子",
              "size": 13
            }
          ],
          "groups": [
            {
              "name": "主视图",
              "color": "corrA"
            },
            {
              "name": "左视图",
              "color": "corrB"
            },
            {
              "name": "俯视图",
              "color": "corrC"
            },
            {
              "name": "干扰项",
              "color": "aux"
            }
          ],
          "items": [
            {
              "id": "m1",
              "label": "图1",
              "group": 0,
              "anchor": [
                32,
                60
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    20,
                    52
                  ],
                  [
                    44,
                    52
                  ],
                  [
                    44,
                    64
                  ],
                  [
                    32,
                    64
                  ],
                  [
                    32,
                    76
                  ],
                  [
                    20,
                    76
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "m2",
              "label": "图2",
              "group": 3,
              "anchor": [
                68,
                60
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    56,
                    52
                  ],
                  [
                    80,
                    52
                  ],
                  [
                    80,
                    76
                  ],
                  [
                    68,
                    76
                  ],
                  [
                    68,
                    64
                  ],
                  [
                    56,
                    64
                  ]
                ],
                "color": "line",
                "width": 2.5
              }
            },
            {
              "id": "l1",
              "label": "图3",
              "group": 1,
              "anchor": [
                32,
                36
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    26,
                    28
                  ],
                  [
                    38,
                    28
                  ],
                  [
                    38,
                    52
                  ],
                  [
                    26,
                    52
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            },
            {
              "id": "l2",
              "label": "图4",
              "group": 3,
              "anchor": [
                68,
                36
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    62,
                    40
                  ],
                  [
                    74,
                    40
                  ],
                  [
                    74,
                    52
                  ],
                  [
                    62,
                    52
                  ]
                ],
                "color": "line",
                "width": 2.5
              }
            },
            {
              "id": "t1",
              "label": "图5",
              "group": 2,
              "anchor": [
                32,
                18
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    20,
                    12
                  ],
                  [
                    44,
                    12
                  ],
                  [
                    44,
                    24
                  ],
                  [
                    20,
                    24
                  ]
                ],
                "color": "corrC",
                "width": 2.5
              }
            },
            {
              "id": "t2",
              "label": "图6",
              "group": 3,
              "anchor": [
                68,
                18
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    62,
                    6
                  ],
                  [
                    74,
                    6
                  ],
                  [
                    74,
                    30
                  ],
                  [
                    62,
                    30
                  ]
                ],
                "color": "line",
                "width": 2.5
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "上面 6 张小图，把它们点进四个篮子：主视图、左视图、俯视图各一张是对的，另三张是干扰项。",
        "点之前先在心里从三个方向看一遍组合体：主视图左高右低，左视图一列两层，俯视图横向两格。",
        "点完对照答案：图1 主视图、图3 左视图、图5 俯视图；图2、图4、图6 是干扰项。"
      ],
      "examples": [
        {
          "text": "答案：图1 是主视图，图3 是左视图，图5 是俯视图；图2、图4、图6 进干扰项篮",
          "figure": "核对答案"
        }
      ],
      "prev": "g12-u1-l2-p3",
      "next": "g12-u1-l3-p1"
    }
  ]
};
