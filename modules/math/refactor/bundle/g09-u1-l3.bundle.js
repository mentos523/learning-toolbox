window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g09-u1-l3"] = {
  "lessonId": "g09-u1-l3",
  "lessonTitle": "AA 判定",
  "chapterId": "g09",
  "pages": [
    {
      "id": "g09-u1-l3-p1",
      "title": "两个角相等，形状就锁死",
      "concept": "AA 判定的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle A = \\angle A' = 50\\text{度}, \\angle B = \\angle B' = 60\\text{度}",
          "translation": "两对角分别相等，都是 50 度和 60 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：两个三角形，两对角分别相等（50 度、60 度）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      62
                    ],
                    [
                      45,
                      62
                    ],
                    [
                      32.8,
                      40.8
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    15,
                    62
                  ],
                  "a1": 310,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45,
                    62
                  ],
                  "a1": 180,
                  "a2": 240,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    15,
                    74
                  ],
                  "text": "50°",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    74
                  ],
                  "text": "60°",
                  "size": 12
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      64
                    ],
                    [
                      92,
                      64
                    ],
                    [
                      78.1,
                      40
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    64
                  ],
                  "a1": 310,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    92,
                    64
                  ],
                  "a1": 180,
                  "a2": 240,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    76
                  ],
                  "text": "50°",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    92,
                    76
                  ],
                  "text": "60°",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 2 步：量一量边——2:4 = 3:6，边自动成比例！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      62
                    ],
                    [
                      45,
                      62
                    ],
                    [
                      32.8,
                      40.8
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    70
                  ],
                  "text": "2",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    24,
                    51
                  ],
                  "text": "3",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      64
                    ],
                    [
                      92,
                      64
                    ],
                    [
                      78.1,
                      40
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    75,
                    72
                  ],
                  "text": "4",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    52
                  ],
                  "text": "6",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "2:4 = 3:6",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：把小的放大 2 倍盖到大的上面——严丝合缝，相似！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      64
                    ],
                    [
                      92,
                      64
                    ],
                    [
                      78.1,
                      40
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      64
                    ],
                    [
                      92,
                      64
                    ],
                    [
                      78.1,
                      40
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "两角相等，形状锁死",
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
        "两对角相等，边就“自动”成比例——第三个角不用量，内角和 180 度（g03 玩过）说了算。",
        "没变的是：形状。只要两对角相等，两个三角形永远相似。",
        "这就是 AA 判定：两角对应相等 → 相似。"
      ],
      "examples": [
        {
          "text": "两对角相等，边自动成比例",
          "figure": "交互"
        }
      ],
      "prev": "g09-u1-l2-p4",
      "next": "g09-u1-l3-p2"
    },
    {
      "id": "g09-u1-l3-p2",
      "title": "AA 判定：两角相等就相似",
      "concept": "AA 判定定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle A = \\angle A', \\angle B = \\angle B' \\Rightarrow \\text{两三角形相似}",
          "translation": "两对角分别相等，则两个三角形相似"
        },
        {
          "id": "f2",
          "latex": "k = 1 \\Rightarrow \\text{相似退化为全等}",
          "translation": "相似比为 1 时，相似就退化成全等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：AA 判定——两对角相等，相似；k=1 时就是全等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      55
                    ],
                    [
                      45,
                      55
                    ],
                    [
                      30,
                      28
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    15,
                    55
                  ],
                  "a1": 299.1,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45,
                    55
                  ],
                  "a1": 180,
                  "a2": 240.9,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      60,
                      57
                    ],
                    [
                      90,
                      57
                    ],
                    [
                      75,
                      30
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    60,
                    57
                  ],
                  "a1": 299.1,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    90,
                    57
                  ],
                  "a1": 180,
                  "a2": 240.9,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "AA：两角对应相等 → 相似",
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
        "还记得吗？上一页两个三角形只有两对角相等，边就自动成比例了——这就是 AA 判定。",
        "AA 判定：两个三角形的两对角分别相等，这两个三角形就相似。",
        "生活例：太阳光测影子——人和旗杆都垂直地面，太阳光线平行，两个直角三角形有两对角相等，所以相似。",
        "图形例：50 度、60 度的两个三角形一定相似。反例：只有一对角相等（都是 50 度），另一对角不同——不相似。",
        "⚠️ 别搞混：AA 是相似判定，它的全等亲戚叫 ASA（两角夹一边）；全等就是相似比 k=1 的特例。",
        "记住一句话：两角定相似，全等是 k=1 的特例。"
      ],
      "examples": [
        {
          "text": "太阳光测影子：两个直角三角形相似",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l3-p1",
      "next": "g09-u1-l3-p3"
    },
    {
      "id": "g09-u1-l3-p3",
      "title": "练一练：用 AA 判相似",
      "concept": "AA 判定的例题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle C = 180\\text{度} - 40\\text{度} - 75\\text{度} = 65\\text{度}",
          "translation": "角 C 等于 180 度减 40 度减 75 度，得 65 度"
        },
        {
          "id": "f2",
          "latex": "\\angle N = 180\\text{度} - 40\\text{度} - 65\\text{度} = 75\\text{度}",
          "translation": "角 N 等于 180 度减 40 度减 65 度，得 75 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：先算第三个角，再看有没有两对角相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      62
                    ],
                    [
                      45,
                      62
                    ],
                    [
                      33,
                      32
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    72
                  ],
                  "text": "40°+75°",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    22
                  ],
                  "text": "∠C=65°",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      64
                    ],
                    [
                      92,
                      64
                    ],
                    [
                      77,
                      28
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    75,
                    74
                  ],
                  "text": "40°+65°",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    75,
                    18
                  ],
                  "text": "∠N=75°",
                  "size": 12,
                  "bold": true,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "两对角相等 → 相似",
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
        "题目：△ABC 中 ∠A=40 度、∠B=75 度；△MNP 中 ∠M=40 度、∠P=65 度。相似吗？",
        "先算第三个角：三角形内角和 180 度（g03 玩过）——∠C=65 度，∠N=75 度。",
        "∠A 对 ∠M（40 度），∠B 对 ∠N（75 度）——两对角分别相等 → 相似。",
        "⚠️ 注意对应：角要“对上号”，∠B=75 度对的是 ∠N=75 度，别写成对 ∠P。"
      ],
      "examples": [
        {
          "text": "先算第三角，再判 AA",
          "figure": "图表"
        }
      ],
      "prev": "g09-u1-l3-p2",
      "next": "g09-u1-l4-p1"
    }
  ]
};
