window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l1"] = {
  "lessonId": "g11-u1-l1",
  "lessonTitle": "矩形与正方形面积",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l1-p1",
      "title": "数格子：面积的单位",
      "concept": "面积单位",
      "formulas": [
        {
          "id": "f1",
          "latex": "1\\text{厘米} \\times 1\\text{厘米} = 1\\text{平方厘米}",
          "translation": "1 厘米乘 1 厘米等于 1 平方厘米"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：边长 1 厘米的小正方形——它的面积就是 1 平方厘米，面积的“尺子”。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      35,
                      35
                    ],
                    [
                      65,
                      35
                    ],
                    [
                      65,
                      65
                    ],
                    [
                      35,
                      65
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "1cm²",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "边长 1cm",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：用小格子铺满这个矩形——一行 4 格，一共 3 行。",
              "shapes": [
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
                      60
                    ],
                    [
                      30,
                      60
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    40,
                    30
                  ],
                  "b": [
                    40,
                    60
                  ],
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    60
                  ],
                  "color": "aux",
                  "width": 1.5
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
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    40
                  ],
                  "b": [
                    70,
                    40
                  ],
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    50
                  ],
                  "b": [
                    70,
                    50
                  ],
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "一行 4 格 × 3 行",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：数一数：4+4+4=12 格——这个矩形的面积是 12 平方厘米。",
              "shapes": [
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
                      60
                    ],
                    [
                      30,
                      60
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    40,
                    30
                  ],
                  "b": [
                    40,
                    60
                  ],
                  "color": "aux",
                  "width": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    60
                  ],
                  "color": "aux",
                  "width": 1
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
                  "color": "aux",
                  "width": 1
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    40
                  ],
                  "b": [
                    70,
                    40
                  ],
                  "color": "aux",
                  "width": 1
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    50
                  ],
                  "b": [
                    70,
                    50
                  ],
                  "color": "aux",
                  "width": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "面积 = 12cm²",
                  "size": 15,
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
        "面积就是“数小格子”：看一个图形里能装下几个 1 平方厘米。",
        "数格子太慢了——下一页找个“快算法”。"
      ],
      "examples": [
        {
          "text": "数地砖：数砖块就知道房间面积",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g11-u1-l1-p2"
    },
    {
      "id": "g11-u1-l1-p2",
      "title": "矩形面积：长乘宽",
      "concept": "矩形面积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = a \\times b",
          "translation": "矩形面积等于长乘宽"
        },
        {
          "id": "f2",
          "latex": "S = a^2",
          "translation": "正方形是特殊的矩形，面积等于边长的平方"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "矩形：长是 a（一行 a 格），宽是 b（铺 b 行）——面积 = a×b。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      35
                    ],
                    [
                      75,
                      35
                    ],
                    [
                      75,
                      65
                    ],
                    [
                      25,
                      65
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    50
                  ],
                  "b": [
                    75,
                    50
                  ],
                  "color": "aux",
                  "width": 1,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    27
                  ],
                  "text": "长 a：每行 a 格",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    50
                  ],
                  "text": "宽 b：铺 b 行",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "S = a × b",
                  "size": 15,
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
        "还记得吗？你铺格子时，一行 4 格、铺了 3 行——4×3=12。",
        "矩形面积 = 长 × 宽：乘法就是数格子的“快算法”。",
        "生活例：教室地砖每行 8 块、铺 6 行，面积=8×6=48 块砖。",
        "图形例：长 5cm、宽 3cm 的矩形，面积 15cm²。",
        "反例：“长”必须沿着边量——斜着量出来的数，乘出来不是面积。",
        "⚠️ 别搞混：周长是“绕一圈”（加法），面积是“铺满”（乘法）——求面积别把四条边加起来。",
        "记住一句话：面积是乘法，周长是加法。"
      ],
      "examples": [
        {
          "text": "地砖：8×6=48",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l1-p1",
      "next": "g11-u1-l1-p3"
    },
    {
      "id": "g11-u1-l1-p3",
      "title": "x² 是一个正方形",
      "concept": "x² 的几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = x^2",
          "translation": "边长为 x 的正方形，面积是 x 的平方"
        },
        {
          "id": "f2",
          "latex": "3^2 = 9",
          "translation": "边长 3，面积 9：数一数格子，正好 9 格"
        }
      ],
      "interaction": {
        "type": "shape-area",
        "params": {
          "min": 1,
          "max": 6,
          "step": 1,
          "label": "x",
          "initial": 3,
          "unit": "cm",
          "showGrid": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖右下角的手柄：边长 x 变大，正方形跟着长大，面积读数实时跳。",
        "边长是整数时格子会自动出现——数一数，格子数正好等于 x²。",
        "x² 你在代数里见过（x 乘以自己）；现在它有了“长相”：一个正方形。",
        "呼应 H5：代数 2.2.2 的完全平方、配方法“补正方形”，地基都在这一页。"
      ],
      "examples": [
        {
          "text": "x=3：代数算 3×3=9，几何看边长 3 的正方形",
          "figure": "数形"
        }
      ],
      "prev": "g11-u1-l1-p2",
      "next": "g11-u1-l1-p4"
    },
    {
      "id": "g11-u1-l1-p4",
      "title": "分配律的面积读法",
      "concept": "a(b+c)=ab+ac 的几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "a(b+c) = ab + ac",
          "translation": "a 乘以 b 加 c 的和，等于 ab 加 ac"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "整体读",
              "caption": "把大矩形看成一个整体：宽是 a，长是 b+c——面积 = a(b+c)。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      80,
                      70
                    ],
                    [
                      20,
                      70
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    12,
                    50
                  ],
                  "text": "a",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    22
                  ],
                  "text": "b",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    22
                  ],
                  "text": "c",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "面积 = a(b+c)",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "label": "两块读",
              "caption": "把大矩形看成左右两块：面积 = ab + ac——同一张图，两种读法。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      50,
                      70
                    ],
                    [
                      20,
                      70
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "fill": "corrA",
                  "opacity": 0.25
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      80,
                      70
                    ],
                    [
                      50,
                      70
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5,
                  "fill": "corrB",
                  "opacity": 0.25
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    50
                  ],
                  "text": "ab",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    50
                  ],
                  "text": "ac",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "面积 = ab + ac",
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
        "同一张图，两种读法：整体读是 a(b+c)，两块读是 ab+ac——它们相等，这就是分配律。",
        "代数 ch00 0.1.4 用这张图“证明”分配律；我们反过来，用分配律“算”面积。",
        "数的部分回代数页复习——几何只管“形”的这一半。"
      ],
      "examples": [
        {
          "text": "a=2,b=3,c=4：2×7=14，2×3+2×4=14",
          "figure": "算式"
        }
      ],
      "prev": "g11-u1-l1-p3",
      "next": "g11-u1-l2-p1"
    }
  ]
};
