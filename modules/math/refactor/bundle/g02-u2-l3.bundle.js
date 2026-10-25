window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g02-u2-l3"] = {
  "lessonId": "g02-u2-l3",
  "lessonTitle": "平行线的性质",
  "chapterId": "g02",
  "pages": [
    {
      "id": "g02-u2-l3-p1",
      "title": "平行线被截：三个角联动",
      "concept": "平行时角的关系（度数联动）",
      "formulas": [
        {
          "id": "f1",
          "latex": "a \\parallel b \\to \\text{角有关系}",
          "translation": "两直线平行，被截出的角就有确定的关系"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：截线这个位置——∠1 = 70°，同位角 ∠5 也是 70°。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    72
                  ],
                  "b": [
                    85,
                    72
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    40
                  ],
                  "b": [
                    85,
                    40
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    20
                  ],
                  "b": [
                    62,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1=70°",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5=70°",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 2 步：转动截线——∠1 变成 80°，∠5 跟着变成 80°；内错角 ∠4 = ∠6 = 100°。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    72
                  ],
                  "b": [
                    85,
                    72
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    40
                  ],
                  "b": [
                    85,
                    40
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    44,
                    20
                  ],
                  "b": [
                    56,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    53.6,
                    72
                  ],
                  "a1": 0,
                  "a2": 80,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    47.7,
                    40
                  ],
                  "a1": 0,
                  "a2": 80,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    53.6,
                    72
                  ],
                  "a1": 260,
                  "a2": 360,
                  "r": 10,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    47.7,
                    40
                  ],
                  "a1": 80,
                  "a2": 180,
                  "r": 10,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    80
                  ],
                  "text": "∠1=80°",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    48
                  ],
                  "text": "∠5=80°",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    61
                  ],
                  "text": "∠4=100°",
                  "size": 12,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    39,
                    50
                  ],
                  "text": "∠6=100°",
                  "size": 12,
                  "color": "corrB"
                }
              ]
            },
            {
              "caption": "第 3 步：再看同旁内角——∠3 = 70°，∠6 = 110°，加起来永远 180°。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    72
                  ],
                  "b": [
                    85,
                    72
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    40
                  ],
                  "b": [
                    85,
                    40
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    20
                  ],
                  "b": [
                    62,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 10,
                  "group": 1,
                  "color": "corrC"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 10,
                  "group": 1,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3=70°",
                  "size": 13,
                  "bold": true,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    51
                  ],
                  "text": "∠6=110°",
                  "size": 13,
                  "bold": true,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    22
                  ],
                  "text": "70° + 110° = 180°",
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
        "点 ▶：转动截线 c，看三个角的读数一起变。",
        "变的是角度大小；不变的是关系：同位角永远相等，内错角永远相等，同旁内角永远互补。",
        "前提：a ∥ b——平行是因，角的关系是果。下一页起，一个性质一页。"
      ],
      "examples": [
        {
          "text": "斑马线：平行线被斜路截，角的关系不变",
          "figure": "实物"
        }
      ],
      "prev": "g02-u2-l2-p4",
      "next": "g02-u2-l3-p2"
    },
    {
      "id": "g02-u2-l3-p2",
      "title": "性质 1：平行 → 同位角相等",
      "concept": "平行线性质 1",
      "formulas": [
        {
          "id": "f1",
          "latex": "a \\parallel b \\Rightarrow \\text{同位角相等}",
          "translation": "两直线平行可以推出同位角相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：因为 a ∥ b，所以 ∠1 = ∠5 = 70°——同位角相等。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    72
                  ],
                  "b": [
                    85,
                    72
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    40
                  ],
                  "b": [
                    85,
                    40
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    20
                  ],
                  "b": [
                    62,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1=70°",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5=70°",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "因为 a ∥ b",
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
        "性质 1：因为 a ∥ b（线平行），所以 ∠1 = ∠5（同位角相等）。",
        "和判定 1 比一比：判定是“角相等 → 线平行”，性质是“线平行 → 角相等”——因为和所以换了位置。",
        "生活例：铁轨是平行的——量任意一组同位角，永远相等；不相等就说明轨铺歪了。",
        "反例：如果 a、b 不平行，∠1 和 ∠5 就不相等——“平行”这个前提不能丢。",
        "⚠️ 别搞混：做题时先看已知给的是“角”还是“线”——给角用判定，给线用性质。",
        "记住一句话：性质得相等——线平行，角相等。"
      ],
      "examples": [],
      "prev": "g02-u2-l3-p1",
      "next": "g02-u2-l3-p3"
    },
    {
      "id": "g02-u2-l3-p3",
      "title": "性质 2：平行 → 内错角相等",
      "concept": "平行线性质 2",
      "formulas": [
        {
          "id": "f1",
          "latex": "a \\parallel b \\Rightarrow \\text{内错角相等}",
          "translation": "两直线平行可以推出内错角相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：因为 a ∥ b，所以 ∠3 = ∠5 = 70°——Z 字两头的角相等。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    72
                  ],
                  "b": [
                    85,
                    72
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    40
                  ],
                  "b": [
                    85,
                    40
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    20
                  ],
                  "b": [
                    62,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      47,
                      72
                    ],
                    [
                      57.2,
                      72
                    ],
                    [
                      45.4,
                      40
                    ],
                    [
                      56,
                      40
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4",
                  "close": false
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 10,
                  "group": 1,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 10,
                  "group": 1,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3=70°",
                  "size": 13,
                  "bold": true,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5=70°",
                  "size": 13,
                  "bold": true,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "因为 a ∥ b",
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
        "性质 2：因为 a ∥ b（线平行），所以 ∠3 = ∠5（内错角相等）——Z 字两头。",
        "为什么成立？∠3 的对顶角是 ∠1，性质 1 已有 ∠1 = ∠5，所以 ∠3 = ∠5。",
        "生活例：折纸时折痕和纸边平行——折出来的 Z 字两角永远相等，可以拿来验折得直不直。",
        "反例：两条线不平行时，Z 字两头的角一个大一个小——别硬说相等。",
        "⚠️ 别搞混：内错角是“里面错开”的一对（∠3–∠5、∠4–∠6），别和同旁内角串了。",
        "记住一句话：线平行，Z 字两头相等。"
      ],
      "examples": [],
      "prev": "g02-u2-l3-p2",
      "next": "g02-u2-l3-p4"
    },
    {
      "id": "g02-u2-l3-p4",
      "title": "性质 3：平行 → 同旁内角互补",
      "concept": "平行线性质 3",
      "formulas": [
        {
          "id": "f1",
          "latex": "a \\parallel b \\Rightarrow \\text{同旁内角互补}",
          "translation": "两直线平行可以推出同旁内角加起来是 180 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：因为 a ∥ b，所以 ∠3 + ∠6 = 70° + 110° = 180°——U 字怀里互补。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    72
                  ],
                  "b": [
                    85,
                    72
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    40
                  ],
                  "b": [
                    85,
                    40
                  ],
                  "color": "line",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    20
                  ],
                  "b": [
                    62,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      66,
                      72
                    ],
                    [
                      57.2,
                      72
                    ],
                    [
                      45.4,
                      40
                    ],
                    [
                      56,
                      40
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4",
                  "close": false
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 10,
                  "group": 1,
                  "color": "corrC"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 10,
                  "group": 1,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3=70°",
                  "size": 13,
                  "bold": true,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    51
                  ],
                  "text": "∠6=110°",
                  "size": 13,
                  "bold": true,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    22
                  ],
                  "text": "70° + 110° = 180°",
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
        "性质 3：因为 a ∥ b（线平行），所以 ∠3 + ∠6 = 180°（同旁内角互补）。",
        "为什么成立？∠5+∠6=180°（邻补角）；性质1：∠1=∠5；对顶角：∠1=∠3。所以∠3+∠6=180°。",
        "注意：前两个性质说“相等”，这一个说“互补”——加起来是 180°。",
        "反例：两条线不平行时，同旁内角加起来不是 180°——“平行”前提不能丢。",
        "⚠️ 别搞混：判定 3 和性质 3 是一对互逆——判定是“互补 → 平行”，性质是“平行 → 互补”。",
        "记住一句话：线平行，U 里加起来 180°。"
      ],
      "examples": [],
      "prev": "g02-u2-l3-p3",
      "next": "g02-u2-l4-p1"
    }
  ]
};
