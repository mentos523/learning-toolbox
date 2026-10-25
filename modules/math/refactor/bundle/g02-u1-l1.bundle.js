window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g02-u1-l1"] = {
  "lessonId": "g02-u1-l1",
  "lessonTitle": "对顶角与邻补角",
  "chapterId": "g02",
  "pages": [
    {
      "id": "g02-u1-l1-p1",
      "title": "转剪刀：四个角此消彼长",
      "concept": "对顶角与邻补角的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{两条直线相交} \\to \\text{四个角}",
          "translation": "两条直线相交，形成四个角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：两条直线交叉——四个角：∠1、∠2、∠3、∠4。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    70
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    70
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
                  "a1": 34,
                  "a2": 146,
                  "r": 11,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": -34,
                  "a2": 34,
                  "r": 11,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 214,
                  "a2": 326,
                  "r": 11,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 146,
                  "a2": 214,
                  "r": 11,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    67
                  ],
                  "text": "∠1",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    50
                  ],
                  "text": "∠2",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    33
                  ],
                  "text": "∠3",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    33,
                    50
                  ],
                  "text": "∠4",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：剪刀张开——四个角的大小都变了。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    76
                  ],
                  "b": [
                    80,
                    24
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    24
                  ],
                  "b": [
                    80,
                    76
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    67
                  ],
                  "text": "∠1",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    50
                  ],
                  "text": "∠2",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    33
                  ],
                  "text": "∠3",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    33,
                    50
                  ],
                  "text": "∠4",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    85
                  ],
                  "text": "张开",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：剪刀快合上——上下两角越来越小，左右两角越来越大，但对着的永远相等。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    14,
                    58
                  ],
                  "b": [
                    86,
                    42
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    42
                  ],
                  "b": [
                    86,
                    58
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    67
                  ],
                  "text": "∠1",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    50
                  ],
                  "text": "∠2",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    33
                  ],
                  "text": "∠3",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    33,
                    50
                  ],
                  "text": "∠4",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    85
                  ],
                  "text": "此消彼长",
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
        "点 ▶：转一转剪刀，看四个角怎么变。",
        "上下两个角（∠1 和 ∠3）一个变大、另一个也变大——它们叫对顶角，永远相等。",
        "相邻的两个角（比如 ∠1 和 ∠2）拼成一条直线，叫邻补角，和永远是 180°。",
        "下一页：我们用 2 步说清楚“对顶角为什么相等”。"
      ],
      "examples": [
        {
          "text": "十字路口斜对着的两个角",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g02-u1-l1-p2"
    },
    {
      "id": "g02-u1-l1-p2",
      "title": "2 步看懂：对顶角为什么相等",
      "concept": "对顶角相等的证明（proof-replay 首秀）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle 1 = \\angle 3",
          "translation": "对顶角相等：∠1 等于 ∠3"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "caption": "∠1 和 ∠2 紧挨着，拼成一条直线——它们的和是 180°。",
              "why": "依据：邻补角的定义（上一页刚玩过）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    70
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    70
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 34,
                  "a2": 146,
                  "r": 13,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": -34,
                  "a2": 34,
                  "r": 13,
                  "group": 1,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "∠1 + ∠2 = 180°",
                  "size": 15,
                  "bold": true
                }
              ]
            },
            {
              "caption": "∠3 和 ∠2 也拼成一条直线，和也是 180°——∠1 和 ∠3 都是 ∠2 的补角，所以 ∠1 = ∠3。",
              "why": "依据：同角的补角相等（g01.2.3 学过）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    70
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    70
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 214,
                  "a2": 326,
                  "r": 13,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": -34,
                  "a2": 34,
                  "r": 13,
                  "group": 1,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "∠3 + ∠2 = 180°，所以 ∠1 = ∠3",
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
        "第 1 步：∠1 + ∠2 = 180°——邻补角拼成平角。",
        "第 2 步：∠3 + ∠2 = 180°——也是邻补角。",
        "∠1 和 ∠3 都是 ∠2 的补角——补角只有一个大小，所以 ∠1 = ∠3。",
        "证明就是这样：每一步的动作，都能点“为什么可以”看到依据。"
      ],
      "examples": [
        {
          "text": "这是证明慢放机的第一次亮相：只有 2 步，先习惯“看动作、问依据”",
          "figure": "方法"
        }
      ],
      "prev": "g02-u1-l1-p1",
      "next": "g02-u1-l1-p3"
    },
    {
      "id": "g02-u1-l1-p3",
      "title": "对顶角与邻补角：一次讲透",
      "concept": "对顶角与邻补角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{对顶角相等}，\\text{邻补角互补}",
          "translation": "对顶角相等，邻补角加起来是 180 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：∠1 和 ∠3 对着（同色），∠2 和 ∠4 对着——对顶角相等；挨着的两角互补。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    70
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    70
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
                  "a1": 34,
                  "a2": 146,
                  "r": 12,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 214,
                  "a2": 326,
                  "r": 12,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": -34,
                  "a2": 34,
                  "r": 12,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 146,
                  "a2": 214,
                  "r": 12,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    67
                  ],
                  "text": "∠1",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    33
                  ],
                  "text": "∠3",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    50
                  ],
                  "text": "∠2",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    33,
                    50
                  ],
                  "text": "∠4",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrB"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得剪刀吗？你转到哪一帧，对着的两个角都一样大——对着的，就叫对顶角。",
        "对顶角：两条直线相交，不相邻的两个角。像 ∠1 和 ∠3——它们“对着看”，顶点是同一个。",
        "邻补角：紧挨着的两个角，像 ∠1 和 ∠2——“邻”是相邻，“补”是加起来 180°（互补）。",
        "生活例：剪刀的四个角；十字路口斜对着的两个角。",
        "反例：∠1 和 ∠4 也紧挨着、也互补——它是邻补角，不是“对顶角”。挨着的都不是对顶角。",
        "⚠️ 别搞混：对顶角才相等；邻补角是互补（和 180°），不相等。",
        "记住一句话：对着的相等，挨着的互补。"
      ],
      "examples": [],
      "prev": "g02-u1-l1-p2",
      "next": "g02-u1-l2-p1"
    }
  ]
};
