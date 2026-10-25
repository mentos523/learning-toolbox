window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g01-u2-l3"] = {
  "lessonId": "g01-u2-l3",
  "lessonTitle": "余角与补角",
  "chapterId": "g01",
  "pages": [
    {
      "id": "g01-u2-l3-p1",
      "title": "拼一拼：两个角凑成 90°",
      "concept": "互余",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle 1 + \\angle 2 = 90^{\\circ}",
          "translation": "角 1 加角 2 等于 90 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：三角板的两个锐角：∠1 和∠2。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      62
                    ],
                    [
                      70,
                      62
                    ],
                    [
                      30,
                      34
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    70,
                    62
                  ],
                  "a1": 180,
                  "a2": 215,
                  "r": 10,
                  "color": "corrAngle",
                  "group": 1
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    34
                  ],
                  "a1": 35,
                  "a2": 90,
                  "r": 10,
                  "color": "corrAngle",
                  "group": 2
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    54
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    44
                  ],
                  "text": "∠2",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：把∠1 和∠2 拼起来——正好拼成一个直角。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    40,
                    62
                  ],
                  "b": [
                    40,
                    86
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    40,
                    62
                  ],
                  "b": [
                    68,
                    62
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "ray",
                  "p": [
                    40,
                    62
                  ],
                  "ang": 55,
                  "len": 24,
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    40,
                    62
                  ],
                  "a1": 0,
                  "a2": 55,
                  "r": 10,
                  "color": "corrAngle",
                  "group": 1
                },
                {
                  "t": "arc",
                  "v": [
                    40,
                    62
                  ],
                  "a1": 55,
                  "a2": 90,
                  "r": 13,
                  "color": "corrAngle",
                  "group": 2
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    70
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    76
                  ],
                  "text": "∠2",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    54,
                    32
                  ],
                  "text": "拼成直角",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：∠1+∠2=90°——∠1 和∠2 互为余角。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    55
                  ],
                  "text": "∠1 + ∠2 = 90°",
                  "size": 18,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    36
                  ],
                  "text": "∠1 和∠2 互为余角",
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
        "三角板的两个锐角：一个∠1，一个∠2。",
        "把它们拼起来——正好拼成一个直角（90°）。",
        "∠1+∠2=90°：∠1 是∠2 的余角，∠2 也是∠1 的余角。",
        "不能单独说一个角“是余角”——余角描述的是两个角之间的关系。"
      ],
      "examples": [],
      "prev": "g01-u2-l2-p3",
      "next": "g01-u2-l3-p2"
    },
    {
      "id": "g01-u2-l3-p2",
      "title": "余角：同角的余角相等",
      "concept": "互余；同角（等角）的余角相等",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle 2 = \\angle 3",
          "translation": "同角（等角）的余角相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：∠1+∠2=90°。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    30,
                    62
                  ],
                  "b": [
                    30,
                    82
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    62
                  ],
                  "b": [
                    62,
                    62
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "ray",
                  "p": [
                    30,
                    62
                  ],
                  "ang": 40,
                  "len": 26,
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    62
                  ],
                  "a1": 0,
                  "a2": 40,
                  "r": 10,
                  "color": "corrAngle",
                  "group": 1
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    62
                  ],
                  "a1": 40,
                  "a2": 90,
                  "r": 13,
                  "color": "corrAngle",
                  "group": 2
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    68
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    36,
                    74
                  ],
                  "text": "∠2",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    32
                  ],
                  "text": "∠1+∠2=90°",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：∠1+∠3=90°——∠2 和∠3 都是“90° 减去∠1”，所以相等。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    30,
                    62
                  ],
                  "b": [
                    30,
                    82
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    62
                  ],
                  "b": [
                    62,
                    62
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "ray",
                  "p": [
                    30,
                    62
                  ],
                  "ang": 65,
                  "len": 26,
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    62
                  ],
                  "a1": 0,
                  "a2": 65,
                  "r": 10,
                  "color": "corrAngle",
                  "group": 1
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    62
                  ],
                  "a1": 65,
                  "a2": 90,
                  "r": 13,
                  "color": "corrAngle",
                  "group": 3
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    68
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    36,
                    72
                  ],
                  "text": "∠3",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    32
                  ],
                  "text": "∠1+∠3=90°",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    42
                  ],
                  "text": "∠2 = ∠3",
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
        "还记得拼图吗？∠1+∠2=90°，∠1+∠3=90°——两个式子都有∠1。",
        "∠2 和∠3 都是“90° 减去∠1”剩下的——所以∠2=∠3。",
        "这就是定理：同角（等角）的余角相等。",
        "“同角”是同一个角，“等角”是一样大的角——道理一样。",
        "⚠️ 别搞混：互余只看度数和是不是 90°，两个角挨不挨着没关系。",
        "反例：“小明的余角”这种说法是错的——余角是两个角的关系。"
      ],
      "examples": [],
      "prev": "g01-u2-l3-p1",
      "next": "g01-u2-l3-p3"
    },
    {
      "id": "g01-u2-l3-p3",
      "title": "拼一拼：两个角凑成 180°",
      "concept": "互补",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle 1 + \\angle 2 = 180^{\\circ}",
          "translation": "角 1 加角 2 等于 180 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：一个平角（180°）被分成两块：∠1 和∠2。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    55
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    55
                  ],
                  "b": [
                    64,
                    79
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    55
                  ],
                  "a1": 0,
                  "a2": 59.7,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 1
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    55
                  ],
                  "a1": 59.7,
                  "a2": 180,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 2
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    64
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    64
                  ],
                  "text": "∠2",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：∠1+∠2=180°——∠1 和∠2 互为补角。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    58
                  ],
                  "text": "∠1 + ∠2 = 180°",
                  "size": 18,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    38
                  ],
                  "text": "∠1 和∠2 互为补角",
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
        "一个平角（180°）被分成两块：∠1 和∠2。",
        "∠1+∠2=180°：∠1 是∠2 的补角，∠2 也是∠1 的补角。",
        "生活例：6 点整，时针分针在一条直线上，形成一个平角 180°。",
        "“互为”还是互相：补角也是两个角的关系。"
      ],
      "examples": [],
      "prev": "g01-u2-l3-p2",
      "next": "g01-u2-l3-p4"
    },
    {
      "id": "g01-u2-l3-p4",
      "title": "补角：同角的补角相等",
      "concept": "互补；同角（等角）的补角相等",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle 2 = \\angle 3",
          "translation": "同角（等角）的补角相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：∠1+∠2=180°。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    55
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    55
                  ],
                  "b": [
                    64,
                    79
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    55
                  ],
                  "a1": 0,
                  "a2": 59.7,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 1
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    55
                  ],
                  "a1": 59.7,
                  "a2": 180,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 2
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    64
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    64
                  ],
                  "text": "∠2",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    32
                  ],
                  "text": "∠1+∠2=180°",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：∠1+∠3=180°——∠2 和∠3 都是“180° 减去∠1”，所以相等。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    55
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    55
                  ],
                  "b": [
                    64,
                    79
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    55
                  ],
                  "a1": 0,
                  "a2": 59.7,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 1
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    55
                  ],
                  "a1": 59.7,
                  "a2": 180,
                  "r": 12,
                  "color": "corrAngle",
                  "group": 3
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    64
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    64
                  ],
                  "text": "∠3",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    32
                  ],
                  "text": "∠1+∠3=180°",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    40
                  ],
                  "text": "∠2 = ∠3",
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
        "∠1+∠2=180°，∠1+∠3=180°——∠2 和∠3 都是“180° 减去∠1”。",
        "所以∠2=∠3——同角（等角）的补角相等。",
        "和余角的定理长得一模一样：只是 90° 换成了 180°。",
        "⚠️ 别搞混：余角看 90°，补角看 180°——“余”是剩下凑 90，“补”是补成 180。",
        "反例：∠1=100°、∠2=90°，和是 190°——不互补。"
      ],
      "examples": [],
      "prev": "g01-u2-l3-p3",
      "next": "g01-u2-l4-p1"
    }
  ]
};
