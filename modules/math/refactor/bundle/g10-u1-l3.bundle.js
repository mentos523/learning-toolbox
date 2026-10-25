window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g10-u1-l3"] = {
  "lessonId": "g10-u1-l3",
  "lessonTitle": "作轴对称图形",
  "chapterId": "g10",
  "pages": [
    {
      "id": "g10-u1-l3-p1",
      "title": "作图：点的对称点",
      "concept": "作点关于直线的对称点",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{作垂线} \\Rightarrow \\text{截等长} \\Rightarrow A'",
          "translation": "过 A 作 l 的垂线，截等长，得到对称点 A'"
        }
      ],
      "interaction": {
        "type": "construction-step",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "text": "过点 A 作直线 l 的垂线，交 l 于 O",
              "why": "垂线保证：A 与 A' 的连线垂直于 l（性质的要求）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    55
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    55,
                    55
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    55
                  ],
                  "label": "O",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "right",
                  "v": [
                    55,
                    55
                  ],
                  "p": [
                    55,
                    85
                  ],
                  "q": [
                    30,
                    55
                  ],
                  "size": 6,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    80
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            },
            {
              "text": "量出 AO 的长度",
              "why": "要让 l 平分 AA'，先知道一半是多长。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    55
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    55,
                    55
                  ],
                  "color": "target",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    55
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    66
                  ],
                  "text": "量一量",
                  "size": 13,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    80
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            },
            {
              "text": "在 l 另一侧截取 OA' = AO",
              "why": "截等长保证：O 是 AA' 的中点（性质反过来用）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    55
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    55
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "target",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    55
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    55
                  ],
                  "label": "A'",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    80
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            },
            {
              "text": "标出点 A'，连线 AA'（虚线）",
              "why": "连线是辅助线：帮你看清“垂直平分”，画完可擦可留。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    55
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    55
                  ],
                  "label": "A'",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    55
                  ],
                  "label": "O",
                  "color": "aux",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    80
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            },
            {
              "text": "检查：沿 l 对折，A 与 A' 重合",
              "why": "作图的验收标准永远是定义：对折重合。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    55
                  ],
                  "label": "A",
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    55
                  ],
                  "label": "A'",
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    30
                  ],
                  "text": "对折重合 ✓",
                  "size": 15,
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
        "两步核心：作垂线（保证垂直）→ 截等长（保证平分）——性质反过来用。",
        "切“跟做”模式：先在纸上比划这一步，再点“下一步”验证。",
        "验收：沿 l 对折，A 与 A' 重合——不对就重来，不扣分。"
      ],
      "examples": [
        {
          "text": "方格纸上：A 到 l 隔 3 格，A' 在另一侧 3 格处",
          "figure": "数格子"
        }
      ],
      "prev": "g10-u1-l2-p4",
      "next": "g10-u1-l3-p2"
    },
    {
      "id": "g10-u1-l3-p2",
      "title": "作图：三角形的对称形",
      "concept": "作三角形的轴对称图形",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\triangle ABC \\Rightarrow \\triangle A'B'C'",
          "translation": "作出三角形 ABC 关于直线 l 的对称图形"
        }
      ],
      "interaction": {
        "type": "construction-step",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "text": "作点 A 关于 l 的对称点 A'",
              "why": "用上一页的方法：作垂线、截等长。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    12
                  ],
                  "b": [
                    50,
                    88
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      60
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      31,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    22,
                    60
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    40,
                    60
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    31,
                    40
                  ],
                  "label": "C",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    78,
                    60
                  ],
                  "label": "A'",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    22,
                    60
                  ],
                  "b": [
                    78,
                    60
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    82
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            },
            {
              "text": "作点 B 的对称点 B'",
              "why": "同一个方法，再来一遍。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    12
                  ],
                  "b": [
                    50,
                    88
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      60
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      31,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    78,
                    60
                  ],
                  "label": "A'",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    60
                  ],
                  "label": "B'",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    40,
                    60
                  ],
                  "b": [
                    60,
                    60
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    82
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            },
            {
              "text": "作点 C 的对称点 C'",
              "why": "三个顶点各就各位。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    12
                  ],
                  "b": [
                    50,
                    88
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      60
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      31,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    78,
                    60
                  ],
                  "label": "A'",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    60
                  ],
                  "label": "B'",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    69,
                    40
                  ],
                  "label": "C'",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    31,
                    40
                  ],
                  "b": [
                    69,
                    40
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    82
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            },
            {
              "text": "连接 A'B'",
              "why": "对应点定对应边：A'B' 就是 AB 的对称边。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    12
                  ],
                  "b": [
                    50,
                    88
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      60
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      31,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    78,
                    60
                  ],
                  "label": "A'",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    60
                  ],
                  "label": "B'",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    69,
                    40
                  ],
                  "label": "C'",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    78,
                    60
                  ],
                  "b": [
                    60,
                    60
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    82
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            },
            {
              "text": "连接 B'C'",
              "why": "第二条对应边。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    12
                  ],
                  "b": [
                    50,
                    88
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      60
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      31,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    78,
                    60
                  ],
                  "label": "A'",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    60
                  ],
                  "label": "B'",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    69,
                    40
                  ],
                  "label": "C'",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    78,
                    60
                  ],
                  "b": [
                    60,
                    60
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    60
                  ],
                  "b": [
                    69,
                    40
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    82
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            },
            {
              "text": "连接 C'A'，得到对称三角形",
              "why": "三个对应点定三条对应边——三角形被“锁死”，这就是 SAS/SSS 的回声。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    12
                  ],
                  "b": [
                    50,
                    88
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      60
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      31,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      78,
                      60
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      69,
                      40
                    ]
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    69,
                    74
                  ],
                  "text": "△A'B'C'",
                  "size": 14.48,
                  "bold": true,
                  "color": "target",
                  "math": true
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    82
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "line"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "六步拆成两段：前三步“找对称点”，后三步“连对称边”。",
        "为什么先找点再连线？因为点定了，边就定了——三角形被“锁死”。",
        "方格纸上更快：每个顶点数格子找对称点，连起来就行。"
      ],
      "examples": [
        {
          "text": "照镜子画图：左物右像，先定点再连线",
          "figure": "方格纸"
        }
      ],
      "prev": "g10-u1-l3-p1",
      "next": "g10-u1-l3-p3"
    },
    {
      "id": "g10-u1-l3-p3",
      "title": "三步口诀：垂线·等长·连线",
      "concept": "作轴对称图形的方法总结",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{作垂线} \\Rightarrow \\text{截等长} \\Rightarrow \\text{连线}",
          "translation": "作轴对称图形三步：作垂线、截等长、连线"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：方格纸数格子——A 到 l 隔 3 格，A' 在另一侧 3 格处。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    20
                  ],
                  "b": [
                    50,
                    80
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    32,
                    55
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    68,
                    55
                  ],
                  "label": "A'",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    32,
                    55
                  ],
                  "b": [
                    68,
                    55
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    41,
                    66
                  ],
                  "text": "3 格",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    59,
                    66
                  ],
                  "text": "3 格",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "数格子，不用量角器",
                  "size": 13,
                  "color": "aux"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "三步口诀：作垂线 → 截等长 → 连起来。每个顶点都这么办。",
        "为什么这样画？性质反过来用：对称点连线被对称轴垂直平分——作垂线保证“垂直”，截等长保证“平分”。",
        "方格纸快捷法：数格子——A 到 l 隔几格，A' 就在另一侧几格处，不用量角器。",
        "反例：直接把三角形“描”到另一边，看着像但对应点连线不垂直——折一下就露馅。",
        "⚠️ 别搞混：作的是“对称点”再连线，不是一笔画描过去。",
        "记住一句话：先找对称点，再连对称形。"
      ],
      "examples": [
        {
          "text": "数格子法：3 格对 3 格，又快又准",
          "figure": "方格纸"
        }
      ],
      "prev": "g10-u1-l3-p2",
      "next": "g10-u1-l4-p1"
    }
  ]
};
