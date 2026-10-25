window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g07-u1-l3"] = {
  "lessonId": "g07-u1-l3",
  "lessonTitle": "弧、弦、圆心角",
  "chapterId": "g07",
  "pages": [
    {
      "id": "g07-u1-l3-p1",
      "title": "转一转：弧弦跟着角走",
      "concept": "圆心角与弧弦联动",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{圆心角变} \\Rightarrow \\text{弧、弦跟着变}",
          "translation": "圆心角一变，它所对的弧和弦跟着变"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：圆心角 ∠AOB = 30°——弧 AB、弦 AB 跟着定下来。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    65,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 60,
                  "a2": 90,
                  "r": 35,
                  "color": "target",
                  "width": 4.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    65,
                    78
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 60,
                  "a2": 90,
                  "r": 12,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    75
                  ],
                  "text": "30°",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：圆心角转到 60°——弧变长、弦变长，半径没变。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    76,
                    67
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 30,
                  "a2": 90,
                  "r": 35,
                  "color": "target",
                  "width": 4.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    76,
                    67
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 30,
                  "a2": 90,
                  "r": 12,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    72
                  ],
                  "text": "60°",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：圆心角转到 90°——转多少度，弧和弦跟多少。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 0,
                  "a2": 90,
                  "r": 35,
                  "color": "target",
                  "width": 4.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    52
                  ],
                  "p": [
                    50,
                    82
                  ],
                  "q": [
                    80,
                    52
                  ],
                  "size": 6
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    70
                  ],
                  "text": "90°",
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
        "一帧一转：圆心角 30°→60°→90°，弧 AB 越来越长，弦 AB 越来越长。",
        "不变量徽章：半径 r 纹丝不动——转的是角，半径没变。",
        "记住一句话：圆心角是“遥控器”，弧和弦都听它的。"
      ],
      "examples": [
        {
          "text": "钟表：分针走 15 分钟，扫过 90° 圆心角",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l2-p3",
      "next": "g07-u1-l3-p2"
    },
    {
      "id": "g07-u1-l3-p2",
      "title": "等弧、等弦、等角：一荣俱荣",
      "concept": "弧弦圆心角关系",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{等弧} \\Rightarrow \\text{等弦}",
          "translation": "在同圆中，相等的弧所对的弦相等"
        },
        {
          "id": "f2",
          "latex": "\\text{等弦} \\Rightarrow \\text{等圆心角}",
          "translation": "在同圆中，相等的弦所对的圆心角相等"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "等弧 → 等弦",
              "caption": "弧 AB = 弧 CD（一样长）→ 弦 AB = 弦 CD：把扇形转过去，完全重合。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 100,
                  "a2": 140,
                  "r": 35,
                  "color": "target",
                  "width": 4.5
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 220,
                  "a2": 260,
                  "r": 35,
                  "color": "target",
                  "width": 4.5
                },
                {
                  "t": "seg",
                  "a": [
                    44.8,
                    81.5
                  ],
                  "b": [
                    27,
                    71.3
                  ],
                  "color": "corrA",
                  "width": 3.5,
                  "ticks": 2
                },
                {
                  "t": "seg",
                  "a": [
                    27,
                    32.7
                  ],
                  "b": [
                    44.8,
                    22.5
                  ],
                  "color": "corrA",
                  "width": 3.5,
                  "ticks": 2
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    13
                  ],
                  "text": "弧相等 → 弦相等",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "label": "等弦 → 等圆心角",
              "caption": "弦 AB = 弦 CD → ∠AOB = ∠COD：弦定了，圆心角就定了。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    44.8,
                    81.5
                  ],
                  "b": [
                    27,
                    71.3
                  ],
                  "color": "corrA",
                  "width": 3.5,
                  "ticks": 2
                },
                {
                  "t": "seg",
                  "a": [
                    27,
                    32.7
                  ],
                  "b": [
                    44.8,
                    22.5
                  ],
                  "color": "corrA",
                  "width": 3.5,
                  "ticks": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    44.8,
                    81.5
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    27,
                    71.3
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    27,
                    32.7
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    44.8,
                    22.5
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 100,
                  "a2": 140,
                  "r": 12,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 220,
                  "a2": 260,
                  "r": 12,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    13
                  ],
                  "text": "弦相等 → 圆心角相等",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrAngle"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "人话：弧相等 → 弦相等；弦相等 → 圆心角相等——三者互相锁定。",
        "为什么？把扇形 AOB 旋转到扇形 COD：弧重合 → 弦重合 → 角重合（旋转不变性）。",
        "生活例：披萨切两刀——夹角相等，两块扇形一模一样。",
        "⚠️ 前提：同一个圆（或等圆）里——不同大小的圆不能比。",
        "记住一句话：同圆里，弧、弦、圆心角“一荣俱荣”。"
      ],
      "examples": [
        {
          "text": "披萨：扇形是圆心角的地盘，弦是“一刀切”的切口",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l3-p1",
      "next": "g07-u1-l4-p1"
    }
  ]
};
