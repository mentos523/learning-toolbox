window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g03-u1-l5"] = {
  "lessonId": "g03-u1-l5",
  "lessonTitle": "多边形的内角和",
  "chapterId": "g03",
  "pages": [
    {
      "id": "g03-u1-l5-p1",
      "title": "切一切：五边形变成 3 个三角形",
      "concept": "对角线剖分",
      "formulas": [
        {
          "id": "f1",
          "latex": "3 \\times 180\\text{度} = 540\\text{度}",
          "translation": "五边形切成 3 个三角形，内角和是 540 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：一个五边形。",
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
                      82,
                      58
                    ],
                    [
                      50,
                      80
                    ],
                    [
                      18,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    30
                  ],
                  "r": 3.5,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "五边形",
                  "size": 14.48
                }
              ]
            },
            {
              "caption": "第 2 步：从一个顶点引出所有对角线。",
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
                      82,
                      58
                    ],
                    [
                      50,
                      80
                    ],
                    [
                      18,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    82,
                    58
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    50,
                    80
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                }
              ]
            },
            {
              "caption": "第 3 步：切成 3 个三角形——3×180°=540°。",
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
                      82,
                      58
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "fill": "corrA",
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
                      82,
                      58
                    ],
                    [
                      50,
                      80
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5,
                  "fill": "corrB",
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
                      50,
                      80
                    ],
                    [
                      18,
                      58
                    ]
                  ],
                  "color": "corrC",
                  "width": 2.5,
                  "fill": "corrC",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "3 个三角形 × 180° = 540°",
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
        "点 ▶：从一个顶点引出所有对角线。",
        "五边形被切成 3 个三角形——五边形的内角，全变成了这 3 个三角形的内角。",
        "3 个三角形 × 180° = 540°：五边形的内角和是 540°。",
        "切一刀，多一个三角形；加一条边，会发生什么？下页你来“加边”。"
      ],
      "examples": [
        {
          "text": "从一个顶点引：五边形引 2 条对角线，切出 3 个三角形",
          "figure": "数形"
        }
      ],
      "prev": "g03-u1-l4-p3",
      "next": "g03-u1-l5-p2"
    },
    {
      "id": "g03-u1-l5-p2",
      "title": "加边游戏：你来发明公式",
      "concept": "用字母表示规律（H19）",
      "formulas": [
        {
          "id": "f1",
          "latex": "(n - 2) \\times 180\\text{度}",
          "translation": "n 边形的内角和等于 (n−2) 乘以 180 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "n=3：1 个三角形——1×180°=180°。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      35
                    ],
                    [
                      80,
                      35
                    ],
                    [
                      50,
                      72
                    ]
                  ],
                  "color": "corrA",
                  "width": 3,
                  "fill": "corrA",
                  "opacity": 0.25
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "n=3：1×180°=180°",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "n=4：切出 2 个三角形——2×180°=360°。",
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
                      80,
                      65
                    ],
                    [
                      20,
                      65
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    35
                  ],
                  "b": [
                    80,
                    65
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "n=4：2×180°=360°",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "n=5：切出 3 个三角形——3×180°=540°。",
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
                      82,
                      58
                    ],
                    [
                      50,
                      80
                    ],
                    [
                      18,
                      58
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
                    82,
                    58
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    50,
                    80
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "n=5：3×180°=540°",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "n=6：切出 4 个三角形——4×180°=720°。规律自己“长”出来了！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      35,
                      30
                    ],
                    [
                      65,
                      30
                    ],
                    [
                      82,
                      55
                    ],
                    [
                      65,
                      80
                    ],
                    [
                      35,
                      80
                    ],
                    [
                      18,
                      55
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    35,
                    30
                  ],
                  "b": [
                    82,
                    55
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    35,
                    30
                  ],
                  "b": [
                    65,
                    80
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    35,
                    30
                  ],
                  "b": [
                    35,
                    80
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "n=6：4×180°=720°",
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
        "从三角形开始，一条一条加边：n=3、4、5、6……",
        "数切出了几个三角形：n 边形切出 (n−2) 个三角形。",
        "内角和：180°、360°、540°、720°——规律自己“长”出来了。",
        "(n−2)×180°——你亲手“发明”了用字母表示规律！"
      ],
      "examples": [
        {
          "text": "回链：代数第 0.2.1 页起过这个名字——用字母表示数",
          "figure": "回链"
        }
      ],
      "prev": "g03-u1-l5-p1",
      "next": "g03-u1-l5-p3"
    },
    {
      "id": "g03-u1-l5-p3",
      "title": "多边形内角和定理：(n−2)×180°",
      "concept": "多边形内角和公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "(n - 2) \\times 180\\text{度}",
          "translation": "n 边形的内角和等于 (n−2) 乘以 180 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：从一个顶点引 (n−3) 条对角线，分成 (n−2) 个三角形。",
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
                      82,
                      58
                    ],
                    [
                      50,
                      80
                    ],
                    [
                      18,
                      58
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
                    82,
                    58
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    50,
                    80
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "(n−2) 个三角形",
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
        "还记得吗？你加边数出来的：n 边形的内角和 = (n−2)×180°。",
        "多边形内角和定理：n 边形的内角和等于 (n−2)×180°。",
        "生活例：蜂巢是六边形——内角和是 (6−2)×180°=720°。",
        "图形例：从一个顶点引 (n−3) 条对角线，分成 (n−2) 个三角形。",
        "⚠️ 前提：这里讨论的多边形都是凸的（没有“凹进去”的角）——凹多边形从某些顶点引的对角线会落到形外，这种切法不适用。",
        "⚠️ 易错：(n−2) 别记成 (n−1)——三角形 n=3 时切出 1 个，不是 2 个。",
        "记住一句话：n 条边，(n−2) 个三角形。",
        "回链：“用字母表示规律”你在代数第 0.2.1 页见过——这是它的几何版。"
      ],
      "examples": [
        {
          "text": "七边形：(7−2)×180°=900°，自己算一遍",
          "figure": "自测"
        }
      ],
      "prev": "g03-u1-l5-p2",
      "next": "g03-u1-l6-p1"
    }
  ]
};
