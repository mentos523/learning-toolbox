window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g08-u1-l3"] = {
  "lessonId": "g08-u1-l3",
  "lessonTitle": "切线长定理",
  "chapterId": "g08",
  "pages": [
    {
      "id": "g08-u1-l3-p1",
      "title": "对折：两条切线一样长",
      "concept": "切线长；对称直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "PA = PB",
          "translation": "从圆外一点引的两条切线，切线长相等（先猜，后证）"
        }
      ],
      "interaction": {
        "type": "morph-toggle",
        "params": {
          "views": [
            {
              "label": "展开看",
              "caption": "从圆外一点 P 画两条切线 PA、PB——猜一猜：哪条长？",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    45,
                    55
                  ],
                  "r": 22,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    55
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    88,
                    30
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    63.4,
                    67.2
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    43.5,
                    33
                  ],
                  "label": "B",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    63.4,
                    67.2
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    43.5,
                    33
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    55
                  ],
                  "b": [
                    63.4,
                    67.2
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    55
                  ],
                  "b": [
                    43.5,
                    33
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    52
                  ],
                  "text": "PA 和 PB，谁长？",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "label": "对折看",
              "caption": "沿 OP 对折：PA 正好落在 PB 上——一样长！",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    45,
                    55
                  ],
                  "r": 22,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    55
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    88,
                    30
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    55
                  ],
                  "b": [
                    88,
                    30
                  ],
                  "color": "aux",
                  "width": 3,
                  "dash": "8,4"
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    63.4,
                    67.2
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    43.5,
                    33
                  ],
                  "color": "target",
                  "width": 3,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    66,
                    20
                  ],
                  "text": "折痕 OP",
                  "size": 12,
                  "color": "aux"
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    52
                  ],
                  "text": "PA 落在 PB 上，完全重合",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ],
          "morph": {
            "kind": "fold",
            "durationMs": 1400,
            "axis": [
              [
                45,
                55
              ],
              [
                88,
                30
              ]
            ],
            "moving": [
              5,
              3
            ],
            "hide1": [
              4
            ]
          },
          "controls": {
            "play": true,
            "scrub": true,
            "step": true,
            "replay": true
          }
        },
        "engine": {
          "primitive": "MorphToggle",
          "version": "2026.10.16.A",
          "params": {
            "kind": "fold"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "先认名字：切线长 = 从圆外一点到切点的线段的长度（PA 的长）——直线没有长度，说的是线段。",
        "猜一猜：PA 和 PB 哪条长？点“对折看”验证。",
        "沿 OP 对折，PA 正好落在 PB 上——没变的是：两条切线长相等（下一页证明）。"
      ],
      "examples": [
        {
          "text": "对折纸：折痕两边的图形重合",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l2-p4",
      "next": "g08-u1-l3-p2"
    },
    {
      "id": "g08-u1-l3-p2",
      "title": "切线长定理的证明",
      "concept": "切线长定理证明（HL）",
      "formulas": [
        {
          "id": "f1",
          "latex": "PA、PB\\text{切圆}O\\text{于}A、B \\Rightarrow PA = PB",
          "translation": "切线长定理：圆外一点引的两条切线，切线长相等"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "P 在圆 O 外，PA、PB 切圆 O 于 A、B",
          "goal": "PA = PB",
          "steps": [
            {
              "caption": "第 1 步：连接 OP、OA、OB。",
              "card": "把圆心和切点都连起来——造两个三角形。",
              "why": "作图：连接两点成线段。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    55
                  ],
                  "r": 24,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    55
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    86,
                    32
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    72,
                    64.5
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    50.7,
                    31
                  ],
                  "label": "B",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    55
                  ],
                  "b": [
                    86,
                    32
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    55
                  ],
                  "b": [
                    72,
                    64.5
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    55
                  ],
                  "b": [
                    50.7,
                    31
                  ],
                  "color": "known",
                  "width": 2.5
                }
              ]
            },
            {
              "caption": "第 2 步：∠OAP = ∠OBP = 90°。",
              "card": "切线垂直于过切点的半径——两个直角出现了。",
              "why": "切线性质定理（g08.1.2）：切线垂直于过切点的半径。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    55
                  ],
                  "r": 24,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    86,
                    32
                  ],
                  "b": [
                    72,
                    64.5
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    86,
                    32
                  ],
                  "b": [
                    50.7,
                    31
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    72,
                    64.5
                  ],
                  "p": [
                    74.8,
                    58.1
                  ],
                  "q": [
                    65.6,
                    61.7
                  ],
                  "size": 7,
                  "color": "corrAngle"
                },
                {
                  "t": "right",
                  "v": [
                    50.7,
                    31
                  ],
                  "p": [
                    57.7,
                    31.2
                  ],
                  "q": [
                    50.5,
                    38
                  ],
                  "size": 7,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "∠OAP = ∠OBP = 90°",
                  "size": 13,
                  "bold": true,
                  "color": "corrAngle"
                }
              ]
            },
            {
              "caption": "第 3 步：Rt△OAP ≌ Rt△OBP（HL）。",
              "card": "斜边 OP 公共、直角边 OA=OB（都是半径）——HL 判定全等。",
              "why": "HL 定理（g05.1.5）：斜边和一条直角边对应相等；OA=OB 是同圆半径。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    55
                  ],
                  "r": 24,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      55
                    ],
                    [
                      72,
                      64.5
                    ],
                    [
                      86,
                      32
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      55
                    ],
                    [
                      50.7,
                      31
                    ],
                    [
                      86,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    55
                  ],
                  "b": [
                    72,
                    64.5
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    55
                  ],
                  "b": [
                    50.7,
                    31
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    55
                  ],
                  "b": [
                    86,
                    32
                  ],
                  "color": "corrB",
                  "width": 3,
                  "ticks": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "HL：斜边公共，直角边 OA=OB",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 4 步：PA = PB。",
              "card": "全等三角形的对应边相等——切线长相等，得证。",
              "why": "全等性质：对应边相等（g04.1.1）。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    55
                  ],
                  "r": 24,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    86,
                    32
                  ],
                  "b": [
                    72,
                    64.5
                  ],
                  "color": "target",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    86,
                    32
                  ],
                  "b": [
                    50.7,
                    31
                  ],
                  "color": "target",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    52
                  ],
                  "text": "PA = PB",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "连接 OP、OA、OB",
              "reason": "作图：连接两点成线段"
            },
            {
              "statement": "∠OAP = ∠OBP = 90°",
              "reason": "切线性质：切线⊥过切点的半径"
            },
            {
              "statement": "Rt△OAP ≌ Rt△OBP",
              "reason": "HL：OP 公共，OA=OB（同圆半径）"
            },
            {
              "statement": "PA = PB",
              "reason": "全等三角形对应边相等"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "慢放 4 步：连辅助线→找直角→证全等→得结论。",
        "关键一步：第 3 步用 HL——斜边 OP 公共，直角边 OA=OB（同圆半径）。",
        "每个“为什么”都可以点开看依据——证明的每一步都要有出处。"
      ],
      "examples": [],
      "prev": "g08-u1-l3-p1",
      "next": "g08-u1-l3-p3"
    },
    {
      "id": "g08-u1-l3-p3",
      "title": "切线长定理",
      "concept": "切线长定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "PA、PB\\text{切圆}O\\text{于}A、B \\Rightarrow PA = PB",
          "translation": "切线长定理：从圆外一点引两条切线，切线长相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "切线长定理：PA = PB——两条切线长相等。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    45,
                    55
                  ],
                  "r": 22,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    55
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    88,
                    30
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    63.4,
                    67.2
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    43.5,
                    33
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    55
                  ],
                  "b": [
                    88,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    56
                  ],
                  "text": "PA = PB",
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
        "还记得吗？沿 OP 对折，PA 和 PB 严丝合缝——没变的是：两条切线长相等。",
        "从圆外一点画两条切线，这两条“从点到切点”的线段一样长——像从同一点出发的两条对称的滑道。",
        "生活例：花坛外一点修两条切路——一样长；图形例：PA、PB 切圆 O 于 A、B，则 PA=PB。",
        "反例：点在圆上时只能画一条切线——“两条”要求点在圆外。",
        "⚠️ 别搞混：切线长是“线段的长度”（PA），不是“切线”（直线没有长度）——定理说的是两条线段相等。",
        "记住一句话：圆外一点，两切线长相等。外加彩蛋：OP 还平分∠APB——对折一下就看出来了。"
      ],
      "examples": [
        {
          "text": "花坛外一点修两条相切的直路",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l3-p2",
      "next": "g08-u1-l3-p4"
    },
    {
      "id": "g08-u1-l3-p4",
      "title": "例题：切线长求值",
      "concept": "切线长定理应用",
      "formulas": [
        {
          "id": "f1",
          "latex": "PA = PB = 6",
          "translation": "切线长定理：PB 等于 PA，等于 6"
        },
        {
          "id": "f2",
          "latex": "\\angle APO = \\frac{1}{2}\\angle APB = 30^\\circ",
          "translation": "OP 平分两切线的夹角：∠APO 是 ∠APB 的一半，等于 30°"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：标已知——PA=6（蓝色）。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    45,
                    55
                  ],
                  "r": 24.87,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    88,
                    30
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    66.6,
                    67.4
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    44.9,
                    30.1
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    52
                  ],
                  "text": "PA=6",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步：切线长定理——PB=PA=6。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    45,
                    55
                  ],
                  "r": 24.87,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    88,
                    30
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    66.6,
                    67.4
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    44.9,
                    30.1
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    56
                  ],
                  "text": "PB=PA=6",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：∠APB=60°，OP 平分它——∠APO=30°。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    45,
                    55
                  ],
                  "r": 24.87,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    66.6,
                    67.4
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    30
                  ],
                  "b": [
                    44.9,
                    30.1
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    55
                  ],
                  "b": [
                    88,
                    30
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    88,
                    30
                  ],
                  "a1": 119.8,
                  "a2": 149.8,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    88,
                    30
                  ],
                  "a1": 149.8,
                  "a2": 179.8,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    18
                  ],
                  "text": "∠APO=30°",
                  "size": 13,
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
        "已知 PA=6——切线长定理：PB=PA=6，一步出答案。",
        "∠APB=60°，OP 平分它——∠APO=30°（对折彩蛋的用处）。",
        "记住一句话：见“两条切线”，先写 PA=PB，再看 OP 平分角。"
      ],
      "examples": [],
      "prev": "g08-u1-l3-p3",
      "next": "g08-u1-l4-p1"
    }
  ]
};
