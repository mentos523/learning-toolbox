window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g13-u1-l1"] = {
  "lessonId": "g13-u1-l1",
  "lessonTitle": "坐标系：几何视角",
  "chapterId": "g13",
  "pages": [
    {
      "id": "g13-u1-l1-p1",
      "title": "动点 P：坐标跟着走",
      "concept": "坐标表示点的位置",
      "formulas": [
        {
          "id": "f1",
          "latex": "P(x, y)",
          "translation": "点 P 的坐标是 (x, y)"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：点 P 在 (3, 2)——向右 3，向上 2。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    21,
                    26
                  ],
                  "text": "O",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    64
                  ],
                  "text": "(3, 2)",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 2 步：P 走到 (5, 5)——坐标跟着变。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    70,
                    72
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    84
                  ],
                  "text": "(5, 5)",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：P 落在 x 轴上——纵坐标是 0。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    70,
                    30
                  ],
                  "label": "P",
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    42
                  ],
                  "text": "(4, 0)",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 4 步：P 落在 y 轴上——横坐标是 0。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    70
                  ],
                  "label": "P",
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    70
                  ],
                  "text": "(0, 3)",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 5 步：P 回到原点——坐标是 (0, 0)。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    30
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    24
                  ],
                  "text": "(0, 0) 原点",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "看第 2 步：点 P 走到哪里，坐标就跟到哪里——坐标是点的“身份证号”。",
        "注意第 3、4 步：点落在坐标轴上时，总有一个坐标是 0。",
        "这就是代数 ch06-u0-l2（平面直角坐标系）建好的坐标系——我们换个几何视角：坐标是“位置的语言”。"
      ],
      "examples": [
        {
          "text": "电影院“5 排 8 号”：排是 y，号是 x",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l0-p1",
      "next": "g13-u1-l1-p2"
    },
    {
      "id": "g13-u1-l1-p2",
      "title": "点和坐标：一一对应",
      "concept": "点与坐标一一对应",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{点} P \\text{的位置} = (x, y)",
          "translation": "点 P 的位置就是坐标 (x, y)"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：P(4, 3)——向右 4、向上 3，落点唯一。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    62,
                    30
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    62,
                    30
                  ],
                  "b": [
                    62,
                    62
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "4,3"
                },
                {
                  "t": "pt",
                  "p": [
                    62,
                    62
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    74
                  ],
                  "text": "P(4, 3)",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    24
                  ],
                  "text": "向右 4",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    48
                  ],
                  "text": "向上 3",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？上一页你让点 P 满场跑，坐标一直跟着——点到哪里，坐标就报到哪里。",
        "人话版：坐标系是给平面装的“门牌号系统”。每个点一张身份证 (x, y)，每张身份证只对应一个点——这叫“一一对应”。",
        "生活例：电影院“5 排 8 号”；图形例：P(4, 3) 就是“向右 4、向上 3”的那个点。",
        "反例：只说“第 5 排”找不到座位——少一个数，位置就定不下来。",
        "分工：有序数对、象限回代数 ch06-u0-l2（平面直角坐标系）复习；几何只看“形”。",
        "记住一句话：点是形，坐标是它的名字。"
      ],
      "examples": [
        {
          "text": "下棋记谱：坐标定位棋子",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l1-p1",
      "next": "g13-u1-l1-p3"
    },
    {
      "id": "g13-u1-l1-p3",
      "title": "例题：读坐标，描点",
      "concept": "坐标例题",
      "formulas": [
        {
          "id": "f1",
          "latex": "A(2, 5)",
          "translation": "点 A 的坐标是 (2, 5)：向右 2，向上 5"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：读出 A(2, 5)——先向右 2，再向上 5。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    45,
                    30
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    30
                  ],
                  "b": [
                    45,
                    75
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    75
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    87
                  ],
                  "text": "A(2, 5)",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 2 步：反过来——在图上标出 B(6, 3)。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    73,
                    30
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    73,
                    30
                  ],
                  "b": [
                    73,
                    54
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "4,3"
                },
                {
                  "t": "pt",
                  "p": [
                    73,
                    54
                  ],
                  "label": "B",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    73,
                    66
                  ],
                  "text": "B(6, 3)",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：想一想——x 轴上的点，y 坐标永远是几？",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    30
                  ],
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    30
                  ],
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    48
                  ],
                  "text": "y = ?",
                  "size": 16,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "第 1 步：A(2, 5)——先向右走 2，再向上走 5，落点就是 A。",
        "第 2 步反过来：知道坐标找点——“按图索骥”。",
        "第 3 题想一想：x 轴上的点，y 坐标永远是 0（P1 第 3 步见过）。"
      ],
      "examples": [
        {
          "text": "寻宝游戏：按坐标找宝藏",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l1-p2",
      "next": "g13-u1-l2-p1"
    }
  ]
};
