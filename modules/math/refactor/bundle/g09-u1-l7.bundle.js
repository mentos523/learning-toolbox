window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g09-u1-l7"] = {
  "lessonId": "g09-u1-l7",
  "lessonTitle": "位似",
  "chapterId": "g09",
  "pages": [
    {
      "id": "g09-u1-l7-p1",
      "title": "以一点为中心放大",
      "concept": "位似的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "OA' = 2 \\cdot OA, OB' = 2 \\cdot OB, OC' = 2 \\cdot OC",
          "translation": "每个对应点到中心的距离都是原来的 2 倍"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：三角形 ABC，和一个点 O。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    48,
                    25
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      42,
                      55
                    ],
                    [
                      54,
                      55
                    ],
                    [
                      48,
                      66
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    36,
                    52
                  ],
                  "text": "A",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    52
                  ],
                  "text": "B",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    71
                  ],
                  "text": "C",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 2 步：从 O 引射线穿过每个顶点——在射线上取 2 倍远的点 A′、B′、C′。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    48,
                    25
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      42,
                      55
                    ],
                    [
                      54,
                      55
                    ],
                    [
                      48,
                      66
                    ]
                  ],
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "ray",
                  "p": [
                    48,
                    25
                  ],
                  "ang": 101,
                  "len": 62,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "ray",
                  "p": [
                    48,
                    25
                  ],
                  "ang": 79,
                  "len": 62,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "ray",
                  "p": [
                    48,
                    25
                  ],
                  "ang": 90,
                  "len": 70,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "pt",
                  "p": [
                    36,
                    85
                  ],
                  "label": "A′",
                  "color": "corrB"
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    85
                  ],
                  "label": "B′",
                  "color": "corrB"
                },
                {
                  "t": "pt",
                  "p": [
                    48,
                    95
                  ],
                  "label": "C′",
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    12
                  ],
                  "text": "OA′ = 2·OA",
                  "size": 12,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：连起 A′B′C′——新三角形是原图的 2 倍，对应点连线都交于 O。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    48,
                    25
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      42,
                      55
                    ],
                    [
                      54,
                      55
                    ],
                    [
                      48,
                      66
                    ]
                  ],
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      36,
                      85
                    ],
                    [
                      60,
                      85
                    ],
                    [
                      48,
                      95
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    25
                  ],
                  "b": [
                    36,
                    85
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    25
                  ],
                  "b": [
                    60,
                    85
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    25
                  ],
                  "b": [
                    48,
                    95
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    8
                  ],
                  "text": "O 叫位似中心，2 叫位似比",
                  "size": 13,
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
        "射线从 O 出发，穿过每个顶点——O 是“中心”。",
        "k=2：OA′ 是 OA 的 2 倍，每个顶点都一样——这就是“位似比”。",
        "对应点连线交于 O——位似是“有中心的相似”。"
      ],
      "examples": [
        {
          "text": "投影仪：灯泡是位似中心，胶片放大到幕布",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l6-p3",
      "next": "g09-u1-l7-p2"
    },
    {
      "id": "g09-u1-l7-p2",
      "title": "位似：有中心的相似",
      "concept": "位似的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{位似} \\subset \\text{相似}",
          "translation": "位似是相似的一种特殊情况"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：位似 = 相似 + 一个公共中心 O。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    30,
                    50
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      42,
                      60
                    ],
                    [
                      54,
                      60
                    ],
                    [
                      48,
                      72
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      54,
                      70
                    ],
                    [
                      78,
                      70
                    ],
                    [
                      66,
                      94
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    50
                  ],
                  "b": [
                    54,
                    70
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    50
                  ],
                  "b": [
                    78,
                    70
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "位似 = 相似 + 公共中心",
                  "size": 13,
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
        "还记得吗？从 O 引射线，每个顶点都按 2 倍放大——对应点连线全交于 O。",
        "位似：以一点 O 为中心，按位似比 k 放大（或缩小）得到的图形。O 叫位似中心，k 叫位似比；位似是特殊的相似。",
        "生活例：投影仪——灯泡是位似中心，胶片上的画面被放大到幕布上。",
        "图形例：以 O 为中心、k=2 的位似三角形。",
        "反例：把三角形平移得到的新三角形——也相似，但对应点连线互相平行、不交于一点，所以不是位似。",
        "⚠️ 别搞混：位似一定相似，相似不一定位似——“有中心”才是位似的身份证。",
        "记住一句话：位似 = 相似 + 一个公共中心。"
      ],
      "examples": [
        {
          "text": "手影游戏：手是位似中心吗？",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l7-p1",
      "next": "g09-u1-l7-p3"
    },
    {
      "id": "g09-u1-l7-p3",
      "title": "H18：位似的坐标写法",
      "concept": "位似的坐标表示",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x, y) \\to (kx, ky)",
          "translation": "点的横坐标纵坐标都乘以 k"
        },
        {
          "id": "f2",
          "latex": "A(1,2) \\Rightarrow A'(2,4) \\quad (k=2)",
          "translation": "k 等于 2 时，A(1,2) 变成 A'(2,4)"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：位似中心在原点时，放大就是坐标乘以 k。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
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
                    20,
                    12
                  ],
                  "b": [
                    20,
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
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    96
                  ],
                  "text": "y",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    20,
                    30
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "ray",
                  "p": [
                    20,
                    30
                  ],
                  "ang": 45,
                  "len": 75,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "pt",
                  "p": [
                    40,
                    50
                  ],
                  "label": "A(1,2)",
                  "color": "corrA"
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    70
                  ],
                  "label": "A′(2,4)",
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    88
                  ],
                  "text": "(x,y) → (kx,ky)",
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
        "把位似中心放在原点 O(0,0)，位似比 k——点 A(x,y) 变成 A′(kx,ky)。",
        "例子：A(1,2)，k=2 → A′(2,4)——横纵坐标都乘以 2。",
        "几何的“放大”动作，代数里就是“坐标乘 k”——只给直观，不推导。",
        "这是 g13 解析几何的微型预演；坐标系见代数 ch06-u0-l2（平面直角坐标系）。"
      ],
      "examples": [
        {
          "text": "代数 ch06-u0-l2 平面直角坐标系：点的坐标写法",
          "figure": "互链"
        }
      ],
      "prev": "g09-u1-l7-p2",
      "next": "g09-u1-l7-p4"
    },
    {
      "id": "g09-u1-l7-p4",
      "title": "例题：画 k=2 的位似图形",
      "concept": "位似作图例题",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x,y) \\to (2x, 2y)",
          "translation": "横坐标纵坐标都乘以 2"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：三步画位似形——定中心、量距离、连新点。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    20,
                    30
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      50
                    ],
                    [
                      60,
                      50
                    ],
                    [
                      50,
                      65
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "A(1,1) B(3,1) C(2,3)",
                  "size": 11.89
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      60,
                      70
                    ],
                    [
                      90,
                      70
                    ],
                    [
                      75,
                      95
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    60
                  ],
                  "text": "A′(2,2) B′(6,2) C′(4,6)",
                  "size": 11.89,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "①定中心 ②坐标×2 ③连新点",
                  "size": 13,
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
        "题目：△ABC 的顶点 A(1,1)、B(3,1)、C(2,3)，以原点为位似中心、k=2 作位似图形。",
        "坐标写法一步到位：A′(2,2)、B′(6,2)、C′(4,6)——横纵坐标都乘以 2。",
        "连起 A′B′C′，再连 OA、OB、OC 验证：三条连线都过原点——位似无误。",
        "自查：位似比是 2（不是 1/2），中心是原点（不是别的点）。"
      ],
      "examples": [
        {
          "text": "坐标法画位似形：乘 k 就行",
          "figure": "图表"
        }
      ],
      "prev": "g09-u1-l7-p3",
      "next": "g09-u1-l8-p1"
    }
  ]
};
