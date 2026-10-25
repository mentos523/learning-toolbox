window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g05-u1-l2"] = {
  "lessonId": "g05-u1-l2",
  "lessonTitle": "证明：弦图拼图",
  "chapterId": "g05",
  "pages": [
    {
      "id": "g05-u1-l2-p0",
      "title": "前置检查：完全平方公式",
      "concept": "完全平方公式（前置检查）",
      "formulas": [
        {
          "id": "f1",
          "latex": "(a+b)^2 = a^2 + 2ab + b^2",
          "translation": "完全平方公式：两数和的平方 = 第一项平方 + 两倍乘积 + 第二项平方"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：边长 (a+b) 的大正方形——面积就是 (a+b)²。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      20
                    ],
                    [
                      80,
                      20
                    ],
                    [
                      80,
                      80
                    ],
                    [
                      20,
                      80
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    13
                  ],
                  "text": "a+b",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    12,
                    50
                  ],
                  "text": "a+b",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：按 a 和 b 各切一刀——横竖两刀，分成四块。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      20
                    ],
                    [
                      80,
                      20
                    ],
                    [
                      80,
                      80
                    ],
                    [
                      20,
                      80
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    20
                  ],
                  "b": [
                    55,
                    80
                  ],
                  "color": "line",
                  "width": 2
                },
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
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    37,
                    13
                  ],
                  "text": "a",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    13
                  ],
                  "text": "b",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    12,
                    37
                  ],
                  "text": "a",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    12,
                    67
                  ],
                  "text": "b",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 3 步：四块面积相加——a² + ab + ab + b²，就是 (a+b)²。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      20
                    ],
                    [
                      80,
                      20
                    ],
                    [
                      80,
                      80
                    ],
                    [
                      20,
                      80
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    20
                  ],
                  "b": [
                    55,
                    80
                  ],
                  "color": "line",
                  "width": 2
                },
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
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    37,
                    37
                  ],
                  "text": "a²",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    37
                  ],
                  "text": "ab",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    37,
                    67
                  ],
                  "text": "ab",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    67
                  ],
                  "text": "b²",
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
        "30 秒前置检查：本课证明要用这个公式——先看懂这张图，不用背。",
        "人话版：边长 (a+b) 的大正方形切成 a²、b² 和两个 ab，四块面积相加就是公式。",
        "只学几何的同学：记住这张切分图——下一页弦图证明里还会用到它。",
        "代数 2.2.2（ch02-u2-l2）讲过它：那里是“切分证公式”，这里是“用公式证勾股”。"
      ],
      "examples": [
        {
          "text": "数字验算：(3+2)²=25=9+12+4",
          "figure": "数字例子"
        }
      ],
      "prev": "g05-u1-l1-p3",
      "next": "g05-u1-l2-p1"
    },
    {
      "id": "g05-u1-l2-p1",
      "title": "四个三角形拼正方形",
      "concept": "赵爽弦图",
      "formulas": [
        {
          "id": "f1",
          "latex": "(a + b)^2",
          "translation": "大正方形的边长是 a 加 b，面积是 a 加 b 的平方"
        }
      ],
      "interaction": {
        "type": "cut-reassemble",
        "params": {
          "pieces": [
            {
              "id": "t1",
              "label": "①",
              "pts": [
                [
                  16.4,
                  48.8
                ],
                [
                  2,
                  68
                ],
                [
                  42,
                  68
                ]
              ]
            },
            {
              "id": "t2",
              "label": "②",
              "pts": [
                [
                  37.2,
                  20.4
                ],
                [
                  18,
                  6
                ],
                [
                  18,
                  46
                ]
              ]
            },
            {
              "id": "t3",
              "label": "③",
              "pts": [
                [
                  71.6,
                  45.2
                ],
                [
                  86,
                  26
                ],
                [
                  46,
                  26
                ]
              ]
            },
            {
              "id": "t4",
              "label": "④",
              "pts": [
                [
                  48.8,
                  79.6
                ],
                [
                  68,
                  94
                ],
                [
                  68,
                  54
                ]
              ]
            },
            {
              "id": "sq",
              "label": "c",
              "pts": [
                [
                  10,
                  18
                ],
                [
                  50,
                  18
                ],
                [
                  50,
                  58
                ],
                [
                  10,
                  58
                ]
              ]
            }
          ],
          "targets": [
            {
              "id": "t1",
              "pts": [
                [
                  44.4,
                  10.8
                ],
                [
                  30,
                  30
                ],
                [
                  70,
                  30
                ]
              ]
            },
            {
              "id": "t2",
              "pts": [
                [
                  89.2,
                  44.4
                ],
                [
                  70,
                  30
                ],
                [
                  70,
                  70
                ]
              ]
            },
            {
              "id": "t3",
              "pts": [
                [
                  55.6,
                  89.2
                ],
                [
                  70,
                  70
                ],
                [
                  30,
                  70
                ]
              ]
            },
            {
              "id": "t4",
              "pts": [
                [
                  10.8,
                  55.6
                ],
                [
                  30,
                  70
                ],
                [
                  30,
                  30
                ]
              ]
            },
            {
              "id": "sq",
              "pts": [
                [
                  30,
                  30
                ],
                [
                  70,
                  30
                ],
                [
                  70,
                  70
                ],
                [
                  30,
                  70
                ]
              ]
            }
          ],
          "autoAssemble": true,
          "doneText": "弦图拼好了！大正方形边长 = a + b 🎉"
        }
      },
      "auxInteraction": null,
      "hints": [
        "四个三角形必须全等——直角边都是 a、b，斜边都是 c。",
        "拼的时候让斜边朝里：四条斜边正好围成中间的小正方形。",
        "大正方形每条边 = a+b；小正方形每条边 = c。下一步：用面积算出定理。"
      ],
      "examples": [
        {
          "text": "拼图：四块全等三角板拼弦图",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l2-p0",
      "next": "g05-u1-l2-p2"
    },
    {
      "id": "g05-u1-l2-p2",
      "title": "主证法：面积两种算法",
      "concept": "勾股定理的弦图证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "(a+b)^2 = 2ab + c^2",
          "translation": "a 加 b 的平方等于 2ab 加 c 的平方"
        },
        {
          "id": "f2",
          "latex": "a^2 + b^2 = c^2",
          "translation": "a 的平方加 b 的平方等于 c 的平方"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "card": "大正方形的边长是 a+b——每条边都是一段 a 接一段 b。",
              "reason": "已知：四个全等直角三角形（蓝色）；求证：a²+b²=c²（红色）。拼图见上一页。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      44.4,
                      10.8
                    ],
                    [
                      89.2,
                      44.4
                    ],
                    [
                      55.6,
                      89.2
                    ],
                    [
                      10.8,
                      55.6
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    20
                  ],
                  "text": "b",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    37
                  ],
                  "text": "a",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "card": "算法一：大正方形面积 = 边长的平方 = (a+b)²。",
              "reason": "正方形面积 = 边长 × 边长。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      44.4,
                      10.8
                    ],
                    [
                      89.2,
                      44.4
                    ],
                    [
                      55.6,
                      89.2
                    ],
                    [
                      10.8,
                      55.6
                    ]
                  ],
                  "color": "known",
                  "width": 2,
                  "fill": "known",
                  "opacity": 0.25
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "(a+b)²",
                  "size": 16,
                  "bold": true,
                  "math": true
                }
              ]
            },
            {
              "card": "中间四边形的角也是直角：顶点处是平角 180°，减去两个锐角（互余，和 90°），剩下 90°。",
              "reason": "直角三角形两锐角互余；180° − 90° = 90°——四边是 c、四角是直角，它才是真正的正方形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      70,
                      30
                    ],
                    [
                      70,
                      70
                    ],
                    [
                      30,
                      70
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    30
                  ],
                  "p": [
                    70,
                    30
                  ],
                  "q": [
                    30,
                    70
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "right",
                  "v": [
                    70,
                    30
                  ],
                  "p": [
                    30,
                    30
                  ],
                  "q": [
                    70,
                    70
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "right",
                  "v": [
                    70,
                    70
                  ],
                  "p": [
                    70,
                    30
                  ],
                  "q": [
                    30,
                    70
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    70
                  ],
                  "p": [
                    30,
                    30
                  ],
                  "q": [
                    70,
                    70
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "c",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "180°−90°=90°：四角皆直角",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "card": "算法二：4 个小三角形（每个 ab/2）加中间的正方形——上一步刚证了它是正方形，面积 c²。",
              "reason": "三角形面积 = ab ÷ 2；正方形边长是 c，面积 c²。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      44.4,
                      10.8
                    ],
                    [
                      30,
                      30
                    ],
                    [
                      70,
                      30
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "fill": "corrA",
                  "opacity": 0.4
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      89.2,
                      44.4
                    ],
                    [
                      70,
                      30
                    ],
                    [
                      70,
                      70
                    ]
                  ],
                  "color": "corrB",
                  "width": 2,
                  "fill": "corrB",
                  "opacity": 0.4
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55.6,
                      89.2
                    ],
                    [
                      70,
                      70
                    ],
                    [
                      30,
                      70
                    ]
                  ],
                  "color": "corrC",
                  "width": 2,
                  "fill": "corrC",
                  "opacity": 0.4
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      10.8,
                      55.6
                    ],
                    [
                      30,
                      70
                    ],
                    [
                      30,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 2,
                  "fill": "known",
                  "opacity": 0.4
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      70,
                      30
                    ],
                    [
                      70,
                      70
                    ],
                    [
                      30,
                      70
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "4×ab/2 + c²",
                  "size": 14.48,
                  "bold": true,
                  "math": true
                }
              ]
            },
            {
              "card": "同一块面积两种算法：(a+b)²=2ab+c²，展开得 a²+b²=c²。",
              "reason": "等量代换；(a+b)²=a²+2ab+b²（代数 2.2.2 完全平方公式）。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    58
                  ],
                  "text": "(a+b)² = 2ab + c²",
                  "size": 15,
                  "bold": true,
                  "math": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    42
                  ],
                  "text": "→ a² + b² = c²",
                  "size": 15,
                  "bold": true,
                  "math": true,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "大正方形边长为 a+b",
              "reason": "拼图：每条边都是一段 a 接一段 b"
            },
            {
              "statement": "面积算法一：(a+b)²",
              "reason": "正方形面积 = 边长²"
            },
            {
              "statement": "中间四边形：四边都是 c，四角都是 90°——是正方形",
              "reason": "顶点处：180° − 两锐角之和（90°）= 90°"
            },
            {
              "statement": "面积算法二：4×ab/2 + c² = 2ab + c²",
              "reason": "三角形面积 + 正方形面积"
            },
            {
              "statement": "(a+b)² = 2ab + c²，展开得 a²+b²=c²",
              "reason": "等量代换；代数 2.2.2"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "证明三问：已知是四个全等直角三角形；求证是 a²+b²=c²；第一步敢拼，因为拼的是面积。",
        "关键动作：同一块大正方形，用两种方法算面积——算出来相等，定理就出来了。",
        "这一步用了代数 2.2.2 的完全平方公式——数和形在这里握手了。"
      ],
      "examples": [
        {
          "text": "回看代数 2.2.2：完全平方公式",
          "figure": "回链"
        }
      ],
      "prev": "g05-u1-l2-p1",
      "next": "g05-u1-l2-p3"
    },
    {
      "id": "g05-u1-l2-p3",
      "title": "总统证法：拼梯形",
      "concept": "勾股定理的总统证法（拼法）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{(a+b)^2}{2}",
          "translation": "a 加 b 的平方除以 2：梯形的面积"
        },
        {
          "id": "f2",
          "latex": "ab + \\frac{c^2}{2}",
          "translation": "ab 加 c 的平方除以 2：三个三角形的面积和"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "card": "两个全等的直角三角形，直角边 a、b，斜边 c。",
              "reason": "已知：两个全等直角三角形（蓝色）；求证：a²+b²=c²（红色）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      20
                    ],
                    [
                      38,
                      20
                    ],
                    [
                      20,
                      44
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    29,
                    16
                  ],
                  "text": "a",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    16,
                    32
                  ],
                  "text": "b",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      20
                    ],
                    [
                      86,
                      20
                    ],
                    [
                      86,
                      38
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    16
                  ],
                  "text": "b",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    89,
                    29
                  ],
                  "text": "a",
                  "size": 12,
                  "color": "known"
                }
              ]
            },
            {
              "card": "首尾相接摆好：a 的尾巴接 b 的头，外框是一个直角梯形。",
              "reason": "拼图：两条竖边都垂直于底边，所以它们平行；两底是 a 和 b，高是 a+b。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      20
                    ],
                    [
                      62,
                      20
                    ],
                    [
                      62,
                      38
                    ],
                    [
                      20,
                      44
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      20
                    ],
                    [
                      38,
                      20
                    ],
                    [
                      20,
                      44
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "fill": "corrA",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      20
                    ],
                    [
                      62,
                      20
                    ],
                    [
                      62,
                      38
                    ]
                  ],
                  "color": "corrB",
                  "width": 2,
                  "fill": "corrB",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    41,
                    15
                  ],
                  "text": "a+b",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    16,
                    32
                  ],
                  "text": "b",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    29
                  ],
                  "text": "a",
                  "size": 12
                }
              ]
            },
            {
              "card": "中间三角形两条边都是 c，夹角是 90°——等腰直角三角形。",
              "reason": "交汇点处：180° − 两个锐角 = 90°（三角形内角和）；两条斜边都是 c。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      20
                    ],
                    [
                      62,
                      20
                    ],
                    [
                      62,
                      38
                    ],
                    [
                      20,
                      44
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      20
                    ],
                    [
                      20,
                      44
                    ],
                    [
                      62,
                      38
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.25
                },
                {
                  "t": "right",
                  "v": [
                    38,
                    20
                  ],
                  "p": [
                    20,
                    44
                  ],
                  "q": [
                    62,
                    38
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    29,
                    32
                  ],
                  "text": "c",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    29
                  ],
                  "text": "c",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "card": "梯形面积两种算法：(a+b)²/2 = ab/2 + ab/2 + c²/2。",
              "reason": "梯形面积 = (上底+下底)×高÷2；三个三角形面积相加。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      20
                    ],
                    [
                      62,
                      20
                    ],
                    [
                      62,
                      38
                    ],
                    [
                      20,
                      44
                    ]
                  ],
                  "color": "known",
                  "width": 2,
                  "fill": "known",
                  "opacity": 0.2
                },
                {
                  "t": "txt",
                  "p": [
                    41,
                    58
                  ],
                  "text": "(a+b)²/2",
                  "size": 14.48,
                  "bold": true,
                  "math": true
                },
                {
                  "t": "txt",
                  "p": [
                    41,
                    44
                  ],
                  "text": "= ab/2+ab/2+c²/2",
                  "size": 13,
                  "bold": true,
                  "math": true
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "两个全等直角三角形首尾相接",
              "reason": "拼图：a 的尾巴接 b 的头"
            },
            {
              "statement": "外框是直角梯形：两底 a、b，高 a+b",
              "reason": "两条竖边都垂直于底边"
            },
            {
              "statement": "中间是等腰直角三角形：两条 c，夹角 90°",
              "reason": "180° − 两锐角 = 90°"
            },
            {
              "statement": "梯形面积 = (a+b)²/2 = ab/2+ab/2+c²/2",
              "reason": "两种算法"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "总统证法是美国第 20 任总统加菲尔德发现的——当总统前，他是个数学爱好者。",
        "'换种看法'：弦图用正方形装三角形，总统用梯形装三角形——拼法不同，面积守恒相同。",
        "下一步：把列出的等式化简，结论自己走出来。"
      ],
      "examples": [
        {
          "text": "加菲尔德：1876 年发表这个证法",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l2-p2",
      "next": "g05-u1-l2-p4"
    },
    {
      "id": "g05-u1-l2-p4",
      "title": "总统证法：化简得结论",
      "concept": "勾股定理的总统证法（化简）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{(a+b)^2}{2} = ab + \\frac{c^2}{2}",
          "translation": "梯形面积的两种算法相等"
        },
        {
          "id": "f2",
          "latex": "a^2 + b^2 = c^2",
          "translation": "a 的平方加 b 的平方等于 c 的平方"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "card": "两种算法算的是同一个梯形：(a+b)²/2 = ab + c²/2。",
              "reason": "等量代换：同一块面积，两种算法结果相等。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    58
                  ],
                  "text": "(a+b)²/2 = ab + c²/2",
                  "size": 15,
                  "bold": true,
                  "math": true
                }
              ]
            },
            {
              "card": "两边 ×2：(a+b)² = 2ab + c²；展开：a²+b²=c²。",
              "reason": "等式两边同乘 2；(a+b)²=a²+2ab+b²（代数 2.2.2）。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    62
                  ],
                  "text": "(a+b)² = 2ab + c²",
                  "size": 14.48,
                  "bold": true,
                  "math": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    44
                  ],
                  "text": "→ a² + b² = c²",
                  "size": 15,
                  "bold": true,
                  "math": true,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "(a+b)²/2 = ab + c²/2",
              "reason": "等量代换"
            },
            {
              "statement": "两边×2 再展开：a²+b²=c²",
              "reason": "代数 2.2.2 完全平方公式"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "和弦图证法对比：弦图用正方形，总统用梯形——两种拼法，同一个结论。",
        "一题两证：你更喜欢哪一种？为什么？——对证明产生审美，而不是恐惧。",
        "两种证法都只用了一招：同一块面积，两种算法。"
      ],
      "examples": [
        {
          "text": "一题多证：弦图 vs 总统证法",
          "figure": "图表"
        }
      ],
      "prev": "g05-u1-l2-p3",
      "next": "g05-u1-l2-p5"
    },
    {
      "id": "g05-u1-l2-p5",
      "title": "这就是勾股定理",
      "concept": "勾股定理 + H1 呼应",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^2 + b^2 = c^2",
          "translation": "直角三角形两直角边的平方和等于斜边的平方"
        },
        {
          "id": "f2",
          "latex": "(a+b)^2 = a^2 + 2ab + b^2",
          "translation": "a 加 b 的平方等于 a 的平方加 2ab 加 b 的平方：完全平方公式"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "读出勾股定理",
              "caption": "把弦图读成'面积相等'：(a+b)²=2ab+c²，化简得 a²+b²=c²——这就是勾股定理。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      44.4,
                      10.8
                    ],
                    [
                      89.2,
                      44.4
                    ],
                    [
                      55.6,
                      89.2
                    ],
                    [
                      10.8,
                      55.6
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      44.4,
                      10.8
                    ],
                    [
                      30,
                      30
                    ],
                    [
                      70,
                      30
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "fill": "corrA",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      89.2,
                      44.4
                    ],
                    [
                      70,
                      30
                    ],
                    [
                      70,
                      70
                    ]
                  ],
                  "color": "corrB",
                  "width": 2,
                  "fill": "corrB",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55.6,
                      89.2
                    ],
                    [
                      70,
                      70
                    ],
                    [
                      30,
                      70
                    ]
                  ],
                  "color": "corrC",
                  "width": 2,
                  "fill": "corrC",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      10.8,
                      55.6
                    ],
                    [
                      30,
                      70
                    ],
                    [
                      30,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 2,
                  "fill": "known",
                  "opacity": 0.3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      70,
                      30
                    ],
                    [
                      70,
                      70
                    ],
                    [
                      30,
                      70
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    94
                  ],
                  "text": "读面积：a² + b² = c²",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "label": "读出完全平方公式",
              "caption": "同一个 (a+b)² 外框，两种分块：弦图分块读出勾股定理；换成 a²、b²、两个 ab 长方形的分块，就读出完全平方公式 (a+b)²=a²+2ab+b²。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      44.4,
                      10.8
                    ],
                    [
                      89.2,
                      44.4
                    ],
                    [
                      55.6,
                      89.2
                    ],
                    [
                      10.8,
                      55.6
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    20
                  ],
                  "text": "b",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    37
                  ],
                  "text": "a",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    94
                  ],
                  "text": "另一种分块：(a+b)²=a²+2ab+b²",
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
        "一句话点题：直角三角形两直角边的平方和等于斜边的平方——这就是勾股定理。",
        "H1 来龙去脉：这个 (a+b)² 的大正方形你在代数 2.2.2 见过——当时我们把外框切成 a²、b²、两个 ab，证完全平方公式；今天换成弦图分块，用它证勾股定理。",
        "同一个 (a+b)² 外框，两种分块：弦图分块读出勾股定理，a²/b²/ab 分块读出完全平方公式——数和形是同一枚硬币的两面。",
        "⚠️ 别搞混：勾股定理说的是边长关系（a²+b²=c²），完全平方公式说的是展开关系——一张图，两个定理。",
        "双向互链：回看代数 2.2.2 完全平方公式的几何证明；代数页也链回这一页——姊妹篇互相认亲。",
        "记住一句话：同一个 (a+b)² 外框，两种分块，勾股、平方公式全都有。"
      ],
      "examples": [
        {
          "text": "回看代数 2.2.2：完全平方公式（姊妹篇）",
          "figure": "回链"
        }
      ],
      "prev": "g05-u1-l2-p4",
      "next": "g05-u1-l3-p1"
    }
  ]
};
