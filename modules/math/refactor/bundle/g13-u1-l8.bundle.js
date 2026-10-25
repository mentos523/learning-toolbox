window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g13-u1-l8"] = {
  "lessonId": "g13-u1-l8",
  "lessonTitle": "切线斜率与导数",
  "chapterId": "g13",
  "pages": [
    {
      "id": "g13-u1-l8-p1",
      "title": "割线逼近切线",
      "concept": "切线是割线的极限",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{切线} = \\text{割线的极限位置}",
          "translation": "切线是割线不断逼近的极限位置"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": true,
          "steps": [
            {
              "caption": "第 1 步：曲线上取 P(1, 1) 和较远的 Q(2, 4)，连割线 PQ。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      66
                    ],
                    [
                      50,
                      52
                    ],
                    [
                      60,
                      44
                    ],
                    [
                      70,
                      40
                    ]
                  ],
                  "close": false,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    40
                  ],
                  "text": "y = x²（示意）",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    52
                  ],
                  "text": "P(1, 1)",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    44
                  ],
                  "label": "Q",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    44
                  ],
                  "text": "Q(2, 4)",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    60,
                    44
                  ],
                  "color": "known",
                  "width": 3
                }
              ]
            },
            {
              "caption": "第 2 步：Q 向 P 靠近——割线跟着转动。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      66
                    ],
                    [
                      50,
                      52
                    ],
                    [
                      60,
                      44
                    ],
                    [
                      70,
                      40
                    ]
                  ],
                  "close": false,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    48
                  ],
                  "label": "Q",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    63,
                    48
                  ],
                  "text": "Q(1.5, 2.25)",
                  "size": 11.89,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    55,
                    48
                  ],
                  "color": "known",
                  "width": 3
                }
              ]
            },
            {
              "caption": "第 3 步：Q 无限靠近 P——割线变成了切线。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      66
                    ],
                    [
                      50,
                      52
                    ],
                    [
                      60,
                      44
                    ],
                    [
                      70,
                      40
                    ]
                  ],
                  "close": false,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 6
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    72
                  ],
                  "b": [
                    70,
                    32
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "切线：割线的极限位置",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：放大镜——切线在 P 点附近“贴”着曲线。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 22,
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      66
                    ],
                    [
                      46,
                      56
                    ],
                    [
                      50,
                      52
                    ],
                    [
                      54,
                      48
                    ],
                    [
                      62,
                      40
                    ]
                  ],
                  "close": false,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    32,
                    70
                  ],
                  "b": [
                    68,
                    34
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "放大看：切线“贴”着曲线",
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
        "没学过代数第 11 章（导数）？这一课可以先跳过，回头再来，不影响 1.9。",
        "看第 2、3 步：Q 越靠近 P，割线越“贴”向切线——“逼近”就是这么个动作。",
        "第 4 步的放大镜，和代数 11.1.2 的放大镜是同一套画法——一眼认出来。"
      ],
      "examples": [
        {
          "text": "汽车后视镜：越近越大——逼近的直观",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l7-p3",
      "next": "g13-u1-l8-p2"
    },
    {
      "id": "g13-u1-l8-p2",
      "title": "切线斜率：该点处的“变化率”",
      "concept": "切线斜率即导数",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{切线斜率} = \\text{导数}",
          "translation": "曲线在 x₀ 处的切线斜率，就是该点的导数"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：切线有多陡，曲线在这一点就变化多快。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      66
                    ],
                    [
                      50,
                      52
                    ],
                    [
                      60,
                      44
                    ],
                    [
                      70,
                      40
                    ]
                  ],
                  "close": false,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    72
                  ],
                  "b": [
                    70,
                    32
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 6
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "切线斜率 = 该点的变化率",
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
        "人话版：切线有多陡，就是曲线在这一点“变化有多快”——陡=变化快。",
        "圆的例子：切线垂直于过切点的半径（g08.1.2）——两斜率乘积是 −1（都存在且不为 0 时；本课 1.5）。",
        "分工：导数的计算（数的部分）回代数 11.1.3 复习；这里只看“形”：切线是割线的极限。",
        "记住一句话：切线斜率，就是变化率。"
      ],
      "examples": [
        {
          "text": "过山车最高点：切线是水平的，变化率为 0",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l8-p1",
      "next": "g13-u1-l8-p3"
    },
    {
      "id": "g13-u1-l8-p3",
      "title": "回声：y=x² 在 (1,1) 处",
      "concept": "切线斜率的直观计算",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{切线斜率} = 2",
          "translation": "y = x² 在点 (1,1) 处的切线斜率是 2"
        },
        {
          "id": "f2",
          "latex": "y - 1 = 2(x - 1)",
          "translation": "切线方程：y − 1 = 2(x − 1)"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：Q 取 (2, 4)，割线斜率 (4−1)/(2−1)=3。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    52
                  ],
                  "text": "P(1, 1)",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    44
                  ],
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    44
                  ],
                  "text": "Q(2, 4)",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "k = 3",
                  "size": 15,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：Q 取 (1.5, 2.25)，割线斜率 2.5。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    48
                  ],
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    63,
                    48
                  ],
                  "text": "Q(1.5, 2.25)",
                  "size": 11.89
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "k = 2.5",
                  "size": 15,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：Q 取 (1.1, 1.21)，割线斜率 2.1——逼近 2。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 6
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "k → 2",
                  "size": 16,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：切线方程——过 (1,1)、k=2，点斜式直接写。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    30,
                    72
                  ],
                  "b": [
                    70,
                    32
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "y − 1 = 2(x − 1)",
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
        "直观算法：Q 取 (2,4)，割线斜率 (4−1)/(2−1)=3；Q 越靠近 (1,1)，斜率越靠近 2。",
        "代数 11.1.3 算出来也是 2——“数”和“形”在这里握手。",
        "切线方程：过 (1,1)、k=2——点斜式（本课 1.4）直接写：y−1=2(x−1)。",
        "记住一句话：逼近出来的 2，就是导数。"
      ],
      "examples": [
        {
          "text": "3 → 2.5 → 2.1 → 2：逼近的数列",
          "figure": "方法"
        }
      ],
      "prev": "g13-u1-l8-p2",
      "next": "g13-u1-l9-p1"
    }
  ]
};
