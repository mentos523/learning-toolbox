window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g01-u2-l2"] = {
  "lessonId": "g01-u2-l2",
  "lessonTitle": "角的比较与角平分线",
  "chapterId": "g01",
  "pages": [
    {
      "id": "g01-u2-l2-p1",
      "title": "叠角：比一比谁大",
      "concept": "角的大小比较（叠合法）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle 1 > \\angle 2",
          "translation": "角 1 比角 2 大"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：两个角 ∠1、∠2，谁大？",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    12,
                    55
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    14,
                    68
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    44
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    55
                  ],
                  "b": [
                    88,
                    55
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    55
                  ],
                  "b": [
                    86,
                    62
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    44
                  ],
                  "text": "∠2",
                  "size": 13,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 2 步：顶点对顶点，一条边对齐——看另一条边。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    88,
                    50
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    21,
                    74
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 0,
                  "a2": 140,
                  "r": 12,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    68,
                    82
                  ],
                  "color": "target",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 0,
                  "a2": 60.6,
                  "r": 9,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "一条边对齐",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：∠1 的另一条边在外面——∠1 更大。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    88,
                    50
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    21,
                    74
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 0,
                  "a2": 140,
                  "r": 12,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    68,
                    82
                  ],
                  "color": "target",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "∠1 > ∠2",
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
        "比角大小：像比线段一样“叠”——顶点对顶点，一条边对齐。",
        "看另一条边：谁在外面，谁就大；重合了，就一样大。",
        "角的大小只看张开程度，不看边的长短——边画长了，角不变。"
      ],
      "examples": [
        {
          "text": "对折纸角：折痕就是角平分线（下一页）",
          "figure": "预告"
        }
      ],
      "prev": "g01-u2-l1-p4",
      "next": "g01-u2-l2-p2"
    },
    {
      "id": "g01-u2-l2-p2",
      "title": "角的加减法",
      "concept": "角的和差",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle AOC = \\angle 1 + \\angle 2",
          "translation": "大角 AOC 等于角 1 加角 2"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：∠AOC 被分成∠1 和∠2——大角等于两小角之和。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    15,
                    68
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
                    78
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    85,
                    68
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    30
                  ],
                  "a1": 90,
                  "a2": 132.6,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 1
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    30
                  ],
                  "a1": 47.4,
                  "a2": 90,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 2
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    58
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    58
                  ],
                  "text": "∠2",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "∠AOC = ∠1 + ∠2",
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
        "角也能加减：∠AOC 被分成∠1 和∠2——∠AOC=∠1+∠2。",
        "反过来：∠1=∠AOC−∠2（大角减小角）。",
        "图形例：两块三角板拼起来——30°+45°=75°。",
        "⚠️ 别搞混：加的是“度数”，不是“边长”——角的大小和边长没关系。"
      ],
      "examples": [],
      "prev": "g01-u2-l2-p1",
      "next": "g01-u2-l2-p3"
    },
    {
      "id": "g01-u2-l2-p3",
      "title": "角平分线：从中间下刀",
      "concept": "角平分线",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle 1 = \\angle 2",
          "translation": "角平分线把角分成两个相等的角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：射线 OB 把∠AOC 分成两个相等的角——OB 是角平分线。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    32
                  ],
                  "b": [
                    18,
                    72
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    32
                  ],
                  "b": [
                    82,
                    72
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "ray",
                  "p": [
                    50,
                    32
                  ],
                  "ang": 90,
                  "len": 40,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    32
                  ],
                  "a1": 90,
                  "a2": 128.7,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 1
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    32
                  ],
                  "a1": 51.3,
                  "a2": 90,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 2
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    60
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    60
                  ],
                  "text": "∠2",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "∠1 = ∠2",
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
        "角平分线：从顶点 O 出发的一条射线，把∠AOC 分成∠1 和∠2——∠1=∠2。",
        "它是一条射线：有起点（顶点），向一边无限长。",
        "生活例：切蛋糕从正中间下刀——刀口就是角平分线。",
        "⚠️ 别搞混：把角分成两半的“线段”不是角平分线——必须是射线。",
        "反例：从顶点出发但两边不等的射线——分的是角，不是平分。",
        "记住一句话：平分线，平分角，一分为二都相等。"
      ],
      "examples": [],
      "prev": "g01-u2-l2-p2",
      "next": "g01-u2-l3-p1"
    }
  ]
};
