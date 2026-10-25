window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g13-u1-l3"] = {
  "lessonId": "g13-u1-l3",
  "lessonTitle": "直线的倾斜角与斜率",
  "chapterId": "g13",
  "pages": [
    {
      "id": "g13-u1-l3-p1",
      "title": "爬坡：直线越转越陡",
      "concept": "斜率的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "k = \\frac{\\Delta y}{\\Delta x}",
          "translation": "斜率 = 纵向变化 ÷ 横向变化"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：k=0.5——缓坡，骑车轻松。",
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
                  "color": "aux",
                  "width": 1.5,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    85,
                    60
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    72
                  ],
                  "text": "k = 0.5 缓坡",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步：k=2——陡坡，得推着走。",
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
                  "color": "aux",
                  "width": 1.5,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    55,
                    90
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    72
                  ],
                  "text": "k = 2 陡坡",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：k=0——平路，不费力。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    30
                  ],
                  "b": [
                    90,
                    30
                  ],
                  "color": "corrA",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    44
                  ],
                  "text": "k = 0 平路",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 4 步：k=−1.5——下坡，溜得飞快。",
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
                  "color": "aux",
                  "width": 1.5,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    90
                  ],
                  "b": [
                    65,
                    30
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    72
                  ],
                  "text": "k = −1.5 下坡",
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
        "拖的是“坡度”：k 就是这条“路”有多陡。",
        "看第 3 步：k=0，直线是平的——没坡。",
        "第 4 步：k 是负的，路往下走——下坡。"
      ],
      "examples": [
        {
          "text": "盘山公路的坡度牌",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l2-p4",
      "next": "g13-u1-l3-p2"
    },
    {
      "id": "g13-u1-l3-p2",
      "title": "斜率 k：纵向变化除以横向变化",
      "concept": "斜率定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "k = \\frac{\\Delta y}{\\Delta x}",
          "translation": "斜率 = 纵向变化 ÷ 横向变化"
        },
        {
          "id": "f2",
          "latex": "k = \\frac{8-2}{4-1} = 2",
          "translation": "例：A(1,2)、B(4,8)，斜率 k = 2"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：横走 3，竖走 6——k=6÷3=2。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    33,
                    46
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    33,
                    58
                  ],
                  "text": "A(1, 2)",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    57,
                    82
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    92
                  ],
                  "text": "B(4, 8)",
                  "size": 12
                },
                {
                  "t": "seg",
                  "a": [
                    33,
                    46
                  ],
                  "b": [
                    57,
                    82
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    33,
                    46
                  ],
                  "b": [
                    57,
                    46
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    57,
                    46
                  ],
                  "b": [
                    57,
                    82
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    40
                  ],
                  "text": "横走 3",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    66,
                    64
                  ],
                  "text": "竖走 6",
                  "size": 12,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    90
                  ],
                  "text": "k = 6÷3 = 2",
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
        "人话版：横着走 1 步，竖着走几步？走的这“几步”就是斜率 k。",
        "例题：A(1, 2) 到 B(4, 8)：横向走 3，纵向走 6，k=6÷3=2——横走 1、竖走 2。",
        "生活例：盘山公路的“坡度牌”；图形例：k=2 的直线比 k=0.5 的陡。",
        "记住一句话：k 是纵向变化除以横向变化。"
      ],
      "examples": [
        {
          "text": "楼梯：横走 1 级、竖上 2 级，斜率 2",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l3-p1",
      "next": "g13-u1-l3-p3"
    },
    {
      "id": "g13-u1-l3-p3",
      "title": "k 的符号：上坡、下坡、平路",
      "concept": "斜率的符号",
      "formulas": [
        {
          "id": "f1",
          "latex": "k > 0 \\text{上坡}；k < 0 \\text{下坡}；k = 0 \\text{平路}",
          "translation": "k 大于 0 是上坡，小于 0 是下坡，等于 0 是平路"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "上坡 k>0",
              "caption": "从左往右看，线往上走——k>0，上坡。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    75,
                    80
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "k = 2 上坡",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "下坡 k<0",
              "caption": "从左往右看，线往下走——k<0，下坡。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    80
                  ],
                  "b": [
                    75,
                    30
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "k = −2 下坡",
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
        "从左往右看：k>0，线往上走——上坡；k<0，线往下走——下坡；k=0，线是平的。",
        "生活例：上坡累、下坡爽、平路不费力——k 的符号就是“费力方向”。",
        "反例：竖直线 Δx=0，除法没法做——竖直线没有斜率（k 不存在，不是 k=0）。",
        "别搞混：“没有斜率”和“斜率为 0”是两码事——一个是悬崖（竖直），一个是平地。",
        "记住一句话：正上负下，零平竖无。"
      ],
      "examples": [
        {
          "text": "滑梯：从左往右看是下坡，k<0",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l3-p2",
      "next": "g13-u1-l3-p4"
    },
    {
      "id": "g13-u1-l3-p4",
      "title": "|k| 越大，越陡",
      "concept": "斜率的绝对值与陡度",
      "formulas": [
        {
          "id": "f1",
          "latex": "|k| \\text{越大，直线越陡}",
          "translation": "k 的绝对值越大，直线越陡峭"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "三条线同场：k=0.5、1、3——越陡 k 越大。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    85,
                    60
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    68
                  ],
                  "text": "k=0.5",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    75,
                    80
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    88
                  ],
                  "text": "k=1",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    45,
                    90
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    92
                  ],
                  "text": "k=3",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    18
                  ],
                  "text": "|k| 越大越陡",
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
        "k=0.5 是缓坡，k=3 是陡坡——符号管方向，大小管陡峭。",
        "生活例：k=3 的坡，骑车上去要推着走。",
        "折叠条预告：倾斜角和斜率还有个更精确的关系（正切），三角模块（v2.0）揭晓——现在用“爬坡”直观就够了。",
        "记住一句话：|k| 是陡峭程度。"
      ],
      "examples": [
        {
          "text": "屋顶坡度：南方缓、北方陡（雪滑得下来）",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l3-p3",
      "next": "g13-u1-l4-p1"
    }
  ]
};
