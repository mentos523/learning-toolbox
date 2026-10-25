window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g03-u1-l4"] = {
  "lessonId": "g03-u1-l4",
  "lessonTitle": "三角形的外角",
  "chapterId": "g03",
  "pages": [
    {
      "id": "g03-u1-l4-p1",
      "title": "把一条边延长：外角“长”出来了",
      "concept": "三角形的外角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{外角} = \\text{一边} + \\text{另一边的延长线}",
          "translation": "外角是三角形一边与另一边延长线组成的角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：完整的三角形 △ABC。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      32
                    ],
                    [
                      80,
                      32
                    ],
                    [
                      55,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    15,
                    24
                  ],
                  "text": "A",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    85,
                    24
                  ],
                  "text": "B",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    76
                  ],
                  "text": "C",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：把 BC 延长到 D（虚线是延长部分）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      32
                    ],
                    [
                      80,
                      32
                    ],
                    [
                      55,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    32
                  ],
                  "b": [
                    91,
                    16
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    93,
                    12
                  ],
                  "text": "D",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    76
                  ],
                  "text": "C",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：∠ABD“张开”了——这就是外角。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      32
                    ],
                    [
                      80,
                      32
                    ],
                    [
                      55,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    32
                  ],
                  "b": [
                    91,
                    16
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    80,
                    32
                  ],
                  "a1": 180,
                  "a2": 304.8,
                  "r": 13,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    71,
                    14
                  ],
                  "text": "∠ABD",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "外角：∠ABD",
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
        "点 ▶：BC 延长到 D，一个新角“长”出来了——∠ABD。",
        "外角：三角形一边与另一边的延长线组成的角。",
        "每个顶点都有两个外角（左右各一），它们是对顶角——相等。",
        "外角和它相邻的内角是邻居：拼成一条直线——互补。"
      ],
      "examples": [
        {
          "text": "三角形的屋顶：屋檐外侧那个角就是外角",
          "figure": "实物"
        }
      ],
      "prev": "g03-u1-l3-p5",
      "next": "g03-u1-l4-p2"
    },
    {
      "id": "g03-u1-l4-p2",
      "title": "外角 = 不相邻两内角之和",
      "concept": "三角形外角定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle ABD = \\angle A + \\angle C",
          "translation": "三角形的一个外角等于和它不相邻的两个内角的和"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "△ABC，D 在 CB 延长线上",
          "goal": "∠ABD = ∠A + ∠C",
          "steps": [
            {
              "caption": "第 1 步：延长 CB 到 D——外角 ∠ABD 登场。",
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
                      55,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    30
                  ],
                  "b": [
                    93,
                    11
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    80,
                    30
                  ],
                  "a1": 180,
                  "a2": 304.8,
                  "r": 13,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    71,
                    12
                  ],
                  "text": "∠ABD",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    15,
                    22
                  ],
                  "text": "A",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    85,
                    22
                  ],
                  "text": "B",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    74
                  ],
                  "text": "C",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    95,
                    7
                  ],
                  "text": "D",
                  "size": 13
                }
              ],
              "card": "延长 CB 到 D——外角 ∠ABD 登场。",
              "why": "依据：外角的定义——三角形一边与另一边延长线组成的角。"
            },
            {
              "caption": "第 2 步：∠ABC + ∠ABD = 180°（邻居拼成直线）。",
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
                      55,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    30
                  ],
                  "b": [
                    93,
                    11
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    80,
                    30
                  ],
                  "a1": 124.8,
                  "a2": 180,
                  "r": 12,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    80,
                    30
                  ],
                  "a1": 180,
                  "a2": 304.8,
                  "r": 13,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    22
                  ],
                  "text": "∠ABC",
                  "size": 12,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    71,
                    12
                  ],
                  "text": "∠ABD",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "∠ABC + ∠ABD = 180°",
                  "size": 13,
                  "math": true
                }
              ],
              "card": "∠ABC 和 ∠ABD 是邻居，拼成一条直线——180°。",
              "why": "依据：邻补角——互为邻补角的两角之和为 180°。"
            },
            {
              "caption": "第 3 步：∠A + ∠ABC + ∠C = 180°（内角和）。",
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
                      55,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    20,
                    30
                  ],
                  "a1": 0,
                  "a2": 45.8,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    80,
                    30
                  ],
                  "a1": 124.8,
                  "a2": 180,
                  "r": 10,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    55,
                    66
                  ],
                  "a1": 225.8,
                  "a2": 304.8,
                  "r": 10,
                  "group": 3,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "∠A + ∠ABC + ∠C = 180°",
                  "size": 13,
                  "math": true
                }
              ],
              "card": "三角形内角和也是 180°——上一课刚证的，现拿现用。",
              "why": "依据：三角形内角和定理（g03.1.3）。"
            },
            {
              "caption": "第 4 步：两式一减，∠ABC 消掉了——证毕。",
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
                      55,
                      66
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    30
                  ],
                  "b": [
                    93,
                    11
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "∠ABD = ∠A + ∠C",
                  "size": 15,
                  "bold": true,
                  "math": true
                }
              ],
              "card": "两个 180° 一减，∠ABC 消掉了——外角等于不相邻两内角之和。",
              "why": "依据：等量代换。"
            }
          ],
          "summary": [
            {
              "statement": "延长 CB 到 D，得外角 ∠ABD",
              "reason": "外角的定义"
            },
            {
              "statement": "∠ABC + ∠ABD = 180°",
              "reason": "邻补角之和为 180°"
            },
            {
              "statement": "∠A + ∠ABC + ∠C = 180°",
              "reason": "三角形内角和定理"
            },
            {
              "statement": "∴ ∠ABD = ∠A + ∠C",
              "reason": "等量代换"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "外角定理：三角形的一个外角，等于和它不相邻的两个内角的和。",
        "人话：外角 = 另外两个内角加起来。",
        "生活例：三角形屋顶——屋檐外侧的角，等于屋内两个角的和。",
        "⚠️ 别搞混：“不相邻”——和它相邻的那个内角不算在内。",
        "外角和我们不急着算——留到多边形那课一起想。"
      ],
      "examples": [
        {
          "text": "求外角不用量：两个不相邻内角一加就行",
          "figure": "技巧"
        }
      ],
      "prev": "g03-u1-l4-p1",
      "next": "g03-u1-l4-p3"
    },
    {
      "id": "g03-u1-l4-p3",
      "title": "外角定理：一次讲透",
      "concept": "三角形外角定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{外角} = \\text{不相邻两内角之和}",
          "translation": "三角形的一个外角等于和它不相邻的两个内角的和"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：BC 延长到 D，外角 ∠ABD 登场——它等于 ∠A + ∠C。",
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
                      55,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    30
                  ],
                  "b": [
                    93,
                    11
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    80,
                    30
                  ],
                  "a1": 180,
                  "a2": 305,
                  "r": 13,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    20,
                    30
                  ],
                  "a1": 0,
                  "a2": 45.8,
                  "r": 10,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    55,
                    66
                  ],
                  "a1": 225.8,
                  "a2": 304.8,
                  "r": 10,
                  "group": 3,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    15,
                    22
                  ],
                  "text": "A",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    85,
                    22
                  ],
                  "text": "B",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    74
                  ],
                  "text": "C",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    95,
                    7
                  ],
                  "text": "D",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    11
                  ],
                  "text": "∠ABD",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "∠ABD = ∠A + ∠C",
                  "size": 14.48,
                  "bold": true,
                  "math": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？你把 BC 延长到 D，∠ABD“长”了出来——外角就是这么来的。",
        "外角定理：三角形的一个外角，等于和它不相邻的两个内角的和——“不相邻”是关键词。",
        "生活例：三角形屋顶——屋檐外侧的角，等于屋内两个角的和。",
        "图形例：∠A=50°、∠C=60°，外角 ∠ABD=110°——不用量角器，一加就行。",
        "反例：∠ABC 是和外角相邻的那个内角——它不算在内，把它加进去就错了。",
        "⚠️ 别搞混：外角等于“不相邻”两内角之和——相邻的那个是邻居（互补），不是加数。",
        "记住一句话：外角等于另两角之和。"
      ],
      "examples": [
        {
          "text": "反着用：已知外角 110°、∠A=50°，求∠C=60°",
          "figure": "方法"
        }
      ],
      "prev": "g03-u1-l4-p2",
      "next": "g03-u1-l5-p1"
    }
  ]
};
