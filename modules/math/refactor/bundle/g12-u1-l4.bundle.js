window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g12-u1-l4"] = {
  "lessonId": "g12-u1-l4",
  "lessonTitle": "截面",
  "chapterId": "g12",
  "pages": [
    {
      "id": "g12-u1-l4-p1",
      "title": "切一切，截面现形",
      "concept": "截面：平面截立体",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{截面，就是切出来的面}",
          "translation": "用平面去截立体，截出的那个面叫截面"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 刀：斜着切掉一个角——切过 3 个面，截面是三角形。",
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
                  "width": 2
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
                  "width": 1.5,
                  "dash": "5,4"
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
                  "width": 1.5
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
                  "width": 1.5
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
                  "width": 1.5,
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
                  "width": 1.5
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
                  "width": 1.5
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
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      60,
                      38
                    ],
                    [
                      52,
                      30
                    ],
                    [
                      60,
                      30
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "切 3 个面 → 三角形",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 2 刀：竖着切——切过 4 个面，截面是四边形（长方形）。",
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
                  "width": 2
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
                  "width": 1.5,
                  "dash": "5,4"
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
                  "width": 1.5
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
                  "width": 1.5
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
                  "width": 1.5,
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
                  "width": 1.5
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
                  "width": 1.5
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
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      44,
                      30
                    ],
                    [
                      56,
                      30
                    ],
                    [
                      68,
                      42
                    ],
                    [
                      56,
                      42
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "切 4 个面 → 四边形",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 刀：斜着切过 5 个面——截面是五边形。",
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
                  "width": 2
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
                  "width": 1.5,
                  "dash": "5,4"
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
                  "width": 1.5
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
                  "width": 1.5
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
                  "width": 1.5,
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
                  "width": 1.5
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
                  "width": 1.5
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
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      52,
                      30
                    ],
                    [
                      68,
                      36
                    ],
                    [
                      72,
                      54
                    ],
                    [
                      60,
                      68
                    ],
                    [
                      44,
                      62
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "切 5 个面 → 五边形",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 刀：角度再刁一点，6 个面全切到——截面是六边形。",
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
                  "width": 2
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
                  "width": 1.5,
                  "dash": "5,4"
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
                  "width": 1.5
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
                  "width": 1.5
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
                  "width": 1.5,
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
                  "width": 1.5
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
                  "width": 1.5
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
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      48,
                      30
                    ],
                    [
                      66,
                      34
                    ],
                    [
                      74,
                      50
                    ],
                    [
                      66,
                      66
                    ],
                    [
                      48,
                      70
                    ],
                    [
                      40,
                      54
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "切 6 个面 → 六边形",
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
        "把正方体当西瓜，点▶看四刀：三角形、四边形、五边形、六边形截面。",
        "截面就是“切出来的那个面”——刀是平面，切口就是截面。",
        "注意每刀切过了几个面：3 个面→三角形，4 个面→四边形……"
      ],
      "examples": [
        {
          "text": "拿橡皮当正方体，用塑料刀切一切",
          "figure": "动手"
        }
      ],
      "prev": "g12-u1-l3-p6",
      "next": "g12-u1-l4-p2"
    },
    {
      "id": "g12-u1-l4-p2",
      "title": "三角、四边形怎么切",
      "concept": "三角形截面与四边形截面",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{切 3 个面} \\to \\text{三角形}",
          "translation": "平面切过 3 个面，截面是三角形"
        },
        {
          "id": "f2",
          "latex": "\\text{切 4 个面} \\to \\text{四边形}",
          "translation": "平面切过 4 个面，截面是四边形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "三角形截面：斜切掉一个角，刀切过 3 个面。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      34
                    ],
                    [
                      52,
                      34
                    ],
                    [
                      41,
                      54
                    ]
                  ],
                  "color": "target",
                  "width": 3,
                  "fill": "target",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "切 3 个面 → 三角形",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "四边形截面：竖着切，刀切过 4 个面（长方形）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      34,
                      34
                    ],
                    [
                      54,
                      34
                    ],
                    [
                      54,
                      62
                    ],
                    [
                      34,
                      62
                    ]
                  ],
                  "color": "target",
                  "width": 3,
                  "fill": "target",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "切 4 个面 → 四边形",
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
        "还记得吗？第 1 刀斜切掉一个角，切过 3 个面——截面是三角形；第 2 刀竖切，切过 4 个面——截面是四边形。",
        "规律：截面有几条边，刀就切过了几个面。切 3 个面得三角形，切 4 个面得四边形。",
        "生活例：切西瓜先切掉一角，切口是三角形；图形例：竖切正方体，切口是长方形。",
        "反例：想一刀切出五边形？只切 3、4 个面可不够——边数不够。",
        "⚠️ 别搞混：截面是“切口那个面”，不是被切掉的那一块。",
        "记住一句话：几条边就是切过几个面。"
      ],
      "examples": [
        {
          "text": "竖切橡皮，看看切口是不是长方形",
          "figure": "动手"
        }
      ],
      "prev": "g12-u1-l4-p1",
      "next": "g12-u1-l4-p3"
    },
    {
      "id": "g12-u1-l4-p3",
      "title": "五边形、六边形登场",
      "concept": "五边形截面与六边形截面",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{切 5 个面} \\to \\text{五边形}",
          "translation": "平面切过 5 个面，截面是五边形"
        },
        {
          "id": "f2",
          "latex": "\\text{切 6 个面} \\to \\text{六边形}",
          "translation": "平面切过 6 个面，截面是六边形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "五边形截面：刀斜一点，切过 5 个面。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      32
                    ],
                    [
                      66,
                      38
                    ],
                    [
                      70,
                      54
                    ],
                    [
                      58,
                      68
                    ],
                    [
                      42,
                      62
                    ]
                  ],
                  "color": "target",
                  "width": 3,
                  "fill": "target",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "切 5 个面 → 五边形",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "六边形截面：6 个面全切到——这是正方体截面的“天花板”。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      46,
                      32
                    ],
                    [
                      64,
                      36
                    ],
                    [
                      72,
                      52
                    ],
                    [
                      64,
                      68
                    ],
                    [
                      46,
                      72
                    ],
                    [
                      38,
                      56
                    ]
                  ],
                  "color": "target",
                  "width": 3,
                  "fill": "target",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "切 6 个面 → 六边形",
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
        "还记得吗？第 3 刀斜着切过 5 个面——五边形；第 4 刀角度更刁，切过 6 个面——六边形。",
        "想切出更多边，刀就要“照顾”到更多面：五边形要切 5 个面，六边形 6 个面全切到。",
        "生活例：钻石的切面；图形例：六个面全切到时切口最正（正六边形）。",
        "反例：想切出七边形？正方体只有 6 个面——没面可切了！",
        "⚠️ 别搞混：六边形截面不一定是正六边形——刀歪一点，六边形就歪一点。",
        "记住一句话：面数封顶，边数也封顶。"
      ],
      "examples": [
        {
          "text": "斜切橡皮试试：能切出五边形吗",
          "figure": "动手"
        }
      ],
      "prev": "g12-u1-l4-p2",
      "next": "g12-u1-l4-p4"
    },
    {
      "id": "g12-u1-l4-p4",
      "title": "截面规律一句话",
      "concept": "截面边数规律",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{截面边数} = \\text{切到的面数}",
          "translation": "截面的边数等于平面切到的面的个数"
        },
        {
          "id": "f2",
          "latex": "\\text{正方体截面} \\leq 6 \\text{条边}",
          "translation": "正方体的截面最多 6 条边"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "四种截面排排站：边数 3、4、5、6——正好等于切到的面数。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      40
                    ],
                    [
                      26,
                      40
                    ],
                    [
                      20,
                      52
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    62
                  ],
                  "text": "3 边",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      34,
                      40
                    ],
                    [
                      46,
                      40
                    ],
                    [
                      46,
                      52
                    ],
                    [
                      34,
                      52
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    62
                  ],
                  "text": "4 边",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      40
                    ],
                    [
                      68,
                      44
                    ],
                    [
                      66,
                      54
                    ],
                    [
                      56,
                      54
                    ],
                    [
                      52,
                      46
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    62
                  ],
                  "text": "5 边",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      76,
                      40
                    ],
                    [
                      86,
                      44
                    ],
                    [
                      86,
                      54
                    ],
                    [
                      76,
                      58
                    ],
                    [
                      70,
                      52
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    78,
                    62
                  ],
                  "text": "6 边",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "边数 = 切到的面数",
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
        "还记得吗？四刀切出三角、四边、五边、六边形——边数 3、4、5、6，对应切到的面数 3、4、5、6。",
        "规律一句话：截面有几条边，平面就切到了几个面。正方体只有 6 个面，所以截面最多 6 条边——七边形想都别想。",
        "生活例：切蛋糕先数有几个面可切；图形例：三棱柱最多切出五边形（它只有 5 个面）。",
        "反例：“一刀切出圆形截面”——切正方体切不出圆，圆是切球才有的。",
        "⚠️ 别搞混：边数=面数说的是“切到的面”，不是立体总面数——一刀没切到的面不算。",
        "记住一句话：切几个面，得几边形。"
      ],
      "examples": [
        {
          "text": "三棱柱最多能切出几边形？先数它的面数",
          "figure": "思考"
        }
      ],
      "prev": "g12-u1-l4-p3",
      "next": "g12-u1-l5-p1"
    }
  ]
};
