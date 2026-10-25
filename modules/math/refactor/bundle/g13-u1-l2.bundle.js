window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g13-u1-l2"] = {
  "lessonId": "g13-u1-l2",
  "lessonTitle": "距离与中点公式",
  "chapterId": "g13",
  "pages": [
    {
      "id": "g13-u1-l2-p1",
      "title": "两点之间：画个直角三角形",
      "concept": "距离公式的几何构造",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\Delta x = 6, \\Delta y = 3",
          "translation": "横向差 6，纵向差 3"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：标出 A(1, 2)、B(7, 5)。",
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
                  "size": 13,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    81,
                    70
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    81,
                    82
                  ],
                  "text": "B(7, 5)",
                  "size": 13,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步：连 AB——这就是要求的距离。",
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
                  "t": "pt",
                  "p": [
                    81,
                    70
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    33,
                    46
                  ],
                  "b": [
                    81,
                    70
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    66
                  ],
                  "text": "AB = ?",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：从 A 向右画横线、从 B 向下画竖线，交于 C(7, 2)。",
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
                  "t": "seg",
                  "a": [
                    33,
                    46
                  ],
                  "b": [
                    81,
                    70
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    33,
                    46
                  ],
                  "b": [
                    81,
                    46
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    81,
                    46
                  ],
                  "b": [
                    81,
                    70
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    81,
                    46
                  ],
                  "p": [
                    33,
                    46
                  ],
                  "q": [
                    81,
                    70
                  ],
                  "size": 6
                },
                {
                  "t": "pt",
                  "p": [
                    81,
                    46
                  ],
                  "label": "C",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    40
                  ],
                  "text": "C(7, 2)",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 4 步：横边 Δx=6、竖边 Δy=3——直角三角形造好了！",
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
                  "t": "seg",
                  "a": [
                    33,
                    46
                  ],
                  "b": [
                    81,
                    70
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
                    81,
                    46
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    81,
                    46
                  ],
                  "b": [
                    81,
                    70
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    81,
                    46
                  ],
                  "p": [
                    33,
                    46
                  ],
                  "q": [
                    81,
                    70
                  ],
                  "size": 6
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    40
                  ],
                  "text": "Δx = 6",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    58
                  ],
                  "text": "Δy = 3",
                  "size": 13,
                  "bold": true,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    66
                  ],
                  "text": "勾² + 股² = 弦²",
                  "size": 13,
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
        "看第 4 步：AB 是斜边，横平竖直的两条边是“勾”和“股”——直角三角形造好了。",
        "这个直角三角形是 g05.1.6 的老朋友：距离公式就是勾股定理穿了坐标衣。",
        "证明不重复——g05.1.6 已经证过，这里当工具直接用。"
      ],
      "examples": [
        {
          "text": "地图上两点直线距离估算",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l1-p3",
      "next": "g13-u1-l2-p2"
    },
    {
      "id": "g13-u1-l2-p2",
      "title": "距离公式：勾股定理的坐标版",
      "concept": "两点间距离公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
          "translation": "两点距离 = 根号下（横向差的平方 + 纵向差的平方）"
        },
        {
          "id": "f2",
          "latex": "d = \\sqrt{6^2 + 3^2} = 3\\sqrt{5}",
          "translation": "例：A(1,2)、B(7,5)，距离 = 3 倍根号 5"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：横边 Δx、竖边 Δy、斜边 d——勾股定理登场。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    33,
                    46
                  ],
                  "b": [
                    81,
                    70
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
                    81,
                    46
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    81,
                    46
                  ],
                  "b": [
                    81,
                    70
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    81,
                    46
                  ],
                  "p": [
                    33,
                    46
                  ],
                  "q": [
                    81,
                    70
                  ],
                  "size": 6
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    36
                  ],
                  "text": "Δx",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    58
                  ],
                  "text": "Δy",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    64
                  ],
                  "text": "d",
                  "size": 16,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "d² = Δx² + Δy²",
                  "size": 15,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得上一页吗？你亲手“造”出了直角三角形：横边 Δx、竖边 Δy、斜边 AB。",
        "人话版：先量“横着差多少、竖着差多少”，再用勾股定理——斜边就是两点距离。",
        "例题：A(1, 2)、B(7, 5)：Δx=6、Δy=3，d=√(36+9)=√45=3√5。",
        "分工：开方、化简这些“数”的运算回代数复习；几何只管“形”：距离就是斜边的长。",
        "记住一句话：横竖一画，勾股一算，距离到手。"
      ],
      "examples": [
        {
          "text": "操场对角线：横 30 米、竖 40 米，对角线 50 米",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l2-p1",
      "next": "g13-u1-l2-p3"
    },
    {
      "id": "g13-u1-l2-p3",
      "title": "中点：正好走一半",
      "concept": "中点坐标",
      "formulas": [
        {
          "id": "f1",
          "latex": "M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})",
          "translation": "中点 M 的坐标：横坐标是两端横坐标的平均，纵坐标是两端纵坐标的平均"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：线段 AB，A(2, 2)、B(8, 6)。",
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
                    41,
                    46
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    41,
                    58
                  ],
                  "text": "A(2, 2)",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    89,
                    78
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    88
                  ],
                  "text": "B(8, 6)",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    41,
                    46
                  ],
                  "b": [
                    89,
                    78
                  ],
                  "color": "line",
                  "width": 2.5
                }
              ]
            },
            {
              "caption": "第 2 步：标出中点 M——线段的正中间。",
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
                  "t": "seg",
                  "a": [
                    41,
                    46
                  ],
                  "b": [
                    89,
                    78
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    41,
                    46
                  ],
                  "b": [
                    65,
                    62
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    62
                  ],
                  "b": [
                    89,
                    78
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    62
                  ],
                  "label": "M",
                  "color": "target",
                  "r": 5
                }
              ]
            },
            {
              "caption": "第 3 步：M(5, 4)——横纵坐标都是“平均”。",
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
                  "t": "seg",
                  "a": [
                    41,
                    46
                  ],
                  "b": [
                    89,
                    78
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    62
                  ],
                  "label": "M",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    74
                  ],
                  "text": "M(5, 4)",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "(2+8)÷2=5，(2+6)÷2=4",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 4 步：端点换成 (3, 3)、(7, 5)，中点还是“平均”：(5, 4)。",
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
                  "t": "seg",
                  "a": [
                    49,
                    54
                  ],
                  "b": [
                    81,
                    70
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    49,
                    54
                  ],
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    48
                  ],
                  "text": "(3, 3)",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    81,
                    70
                  ],
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    76
                  ],
                  "text": "(7, 5)",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    62
                  ],
                  "label": "M",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    74
                  ],
                  "text": "M(5, 4)",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "端点动，中点永远在正中间",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "看第 3 步：M(5, 4)——横坐标是 (2+8)÷2，纵坐标是 (2+6)÷2，都是“平均”。",
        "第 4 步：端点动，中点永远跟在“正中间”——中点坐标就是端点坐标取平均。"
      ],
      "examples": [
        {
          "text": "两人相向而行，相遇点就是中点",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l2-p2",
      "next": "g13-u1-l2-p4"
    },
    {
      "id": "g13-u1-l2-p4",
      "title": "中点公式：取个平均",
      "concept": "中点公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "M = (\\frac{x_1+x_2}{2}, \\frac{y_1+y_2}{2})",
          "translation": "中点坐标 = 端点坐标分别取平均"
        },
        {
          "id": "f2",
          "latex": "M = (\\frac{2+8}{2}, \\frac{2+6}{2}) = (5, 4)",
          "translation": "例：A(2,2)、B(8,6)，中点 M 是 (5, 4)"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：横着走一半，竖着走一半——落点就是中点。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    41,
                    46
                  ],
                  "b": [
                    89,
                    78
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    41,
                    46
                  ],
                  "b": [
                    65,
                    46
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    46
                  ],
                  "b": [
                    65,
                    62
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    62
                  ],
                  "label": "M",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    40
                  ],
                  "text": "横走一半",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    54
                  ],
                  "text": "竖走一半",
                  "size": 12,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    74
                  ],
                  "text": "M(5, 4)",
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
        "人话版：中点就是“走一半”的那个点——横着走一半，竖着走一半。",
        "生活例：你和同学相向而行，中点是你们相遇的地方；图形例：A(2,2)、B(8,6)，中点 (5,4)。",
        "反例：(2+8, 2+6)=(10,8) 是把两段路“接起来”，不是中点——平均别忘了除以 2。",
        "记住一句话：中点坐标，端点平均。"
      ],
      "examples": [
        {
          "text": "拔河绳正中间系红布条：两端点取平均",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l2-p3",
      "next": "g13-u1-l3-p1"
    }
  ]
};
