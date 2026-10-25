window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g07-u1-l2"] = {
  "lessonId": "g07-u1-l2",
  "lessonTitle": "垂径定理",
  "chapterId": "g07",
  "pages": [
    {
      "id": "g07-u1-l2-p1",
      "title": "对折：直径是折痕",
      "concept": "垂径定理直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "CD \\perp AB \\Rightarrow AE = EB",
          "translation": "直径 CD 垂直于弦 AB，就平分这条弦"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：弦 AB，直径 CD 垂直于 AB，交于 E。",
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
                    22.5,
                    64
                  ],
                  "b": [
                    77.5,
                    64
                  ],
                  "color": "line",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    50,
                    22
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    64
                  ],
                  "p": [
                    50,
                    82
                  ],
                  "q": [
                    77.5,
                    64
                  ],
                  "size": 6
                },
                {
                  "t": "txt",
                  "p": [
                    16,
                    64
                  ],
                  "text": "A",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    64
                  ],
                  "text": "B",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    89
                  ],
                  "text": "C",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    15
                  ],
                  "text": "D",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    64
                  ],
                  "text": "E",
                  "size": 13
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
                }
              ]
            },
            {
              "caption": "第 2 步：沿直径 CD 对折——右半边翻过去。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    50,
                    22
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    22.5,
                    64
                  ],
                  "b": [
                    50,
                    64
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    64
                  ],
                  "b": [
                    77.5,
                    64
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    40
                  ],
                  "text": "沿 CD 对折 →",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：对折后，AE 与 EB 完全重合——弦被平分了。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    50,
                    22
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    22.5,
                    64
                  ],
                  "b": [
                    50,
                    64
                  ],
                  "color": "corrA",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    64
                  ],
                  "b": [
                    77.5,
                    64
                  ],
                  "color": "corrA",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 90,
                  "a2": 156.4,
                  "r": 35,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 23.6,
                  "a2": 90,
                  "r": 35,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    74
                  ],
                  "text": "AE = EB",
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
        "看第 2 步：把圆沿着直径 CD 对折——这是 g04 对折的老朋友。",
        "第 3 步定格：AE 和 EB 严丝合缝——直径垂直于弦，就平分它。",
        "记住一句话：垂直直径一出手，弦和弧都对半分。"
      ],
      "examples": [
        {
          "text": "折纸：圆纸片对折，折痕就是直径",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l1-p3",
      "next": "g07-u1-l2-p2"
    },
    {
      "id": "g07-u1-l2-p2",
      "title": "慢放证明：垂径定理",
      "concept": "垂径定理证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{垂直于弦的直径} \\Rightarrow \\text{平分弦、平分弧}",
          "translation": "垂直于弦的直径，平分这条弦，也平分弦所对的弧"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "直径 CD ⊥ 弦 AB，交于 E",
          "goal": "AE = EB；弧 AC = 弧 BC，弧 AD = 弧 BD",
          "steps": [
            {
              "card": "连 OA、OB——两条半径登场。",
              "reason": "作图：连半径；OA = OB（同圆半径相等）",
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
                    22.5,
                    64
                  ],
                  "b": [
                    77.5,
                    64
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    50,
                    22
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
                    22.5,
                    64
                  ],
                  "color": "target",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    77.5,
                    64
                  ],
                  "color": "target",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    16,
                    64
                  ],
                  "text": "A",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    64
                  ],
                  "text": "B",
                  "size": 13
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
                }
              ]
            },
            {
              "card": "OA = OB，△OAB 是等腰三角形。",
              "reason": "等腰三角形定义：有两边相等的三角形",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      52
                    ],
                    [
                      22.5,
                      64
                    ],
                    [
                      77.5,
                      64
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    22.5,
                    64
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    77.5,
                    64
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    44
                  ],
                  "text": "等腰",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "card": "OE ⊥ AB——底边上的高，平分底边。",
              "reason": "等腰三角形三线合一（g04.1.5 P4）",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      52
                    ],
                    [
                      22.5,
                      64
                    ],
                    [
                      77.5,
                      64
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    64
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    64
                  ],
                  "p": [
                    50,
                    52
                  ],
                  "q": [
                    77.5,
                    64
                  ],
                  "size": 6
                },
                {
                  "t": "seg",
                  "a": [
                    22.5,
                    64
                  ],
                  "b": [
                    50,
                    64
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    64
                  ],
                  "b": [
                    77.5,
                    64
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    74
                  ],
                  "text": "AE = EB",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "card": "沿 CD 对折：弧 AC 与弧 BC 重合，弧 AD 与弧 BD 也重合。",
              "reason": "圆的轴对称性：直径 CD 是对称轴（本课 P1）",
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
                    82
                  ],
                  "b": [
                    50,
                    22
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 90,
                  "a2": 156.4,
                  "r": 35,
                  "color": "corrA",
                  "width": 4
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 23.6,
                  "a2": 90,
                  "r": 35,
                  "color": "corrA",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "弧 AC = 弧 BC",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "连半径 OA、OB",
              "reason": "作图；同圆半径相等"
            },
            {
              "statement": "△OAB 是等腰三角形",
              "reason": "等腰三角形定义"
            },
            {
              "statement": "OE ⊥ AB → AE = EB",
              "reason": "等腰三角形三线合一"
            },
            {
              "statement": "弧 AC = 弧 BC，弧 AD = 弧 BD",
              "reason": "圆的轴对称性（直径是折痕）"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "三问：已知？求证？第一步连 OA、OB 凭什么？（连半径是作图，不用理由）",
        "关键动作：第 3 步把“垂直”翻译成等腰三角形的“三线合一”——老定理是新证明的砖。"
      ],
      "examples": [
        {
          "text": "三线合一回来了：等腰三角形底边上的高平分底边",
          "figure": "回链"
        }
      ],
      "prev": "g07-u1-l2-p1",
      "next": "g07-u1-l2-p3"
    },
    {
      "id": "g07-u1-l2-p3",
      "title": "垂径定理：赵州桥",
      "concept": "垂径定理应用",
      "formulas": [
        {
          "id": "f1",
          "latex": "r^2 = (\\frac{L}{2})^2 + (r-h)^2",
          "translation": "设半径为 r：r² = (L/2)² + (r−h)²，解出 r"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "赵州桥：拱是圆弧，跨度是弦——知道跨度 L 和拱高 h，设半径为 r，用勾股定理列方程算 r。",
              "shapes": [
                {
                  "t": "arc",
                  "v": [
                    50,
                    10
                  ],
                  "a1": 35,
                  "a2": 145,
                  "r": 50,
                  "color": "known",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    9,
                    38.7
                  ],
                  "b": [
                    91,
                    38.7
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    38.7
                  ],
                  "b": [
                    50,
                    60
                  ],
                  "color": "target",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    31
                  ],
                  "text": "跨度 L",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    50
                  ],
                  "text": "拱高 h",
                  "size": 13,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "拱 = 圆上的一段弧",
                  "size": 13
                }
              ]
            },
            {
              "caption": "测圆木：卡尺卡住圆木，读出弦长和拱高——同一招算出直径。",
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
                    22.5,
                    64
                  ],
                  "b": [
                    77.5,
                    64
                  ],
                  "color": "corrB",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    64
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "target",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "弦长",
                  "size": 13,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    74
                  ],
                  "text": "拱高",
                  "size": 13,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "卡尺量出弦长和拱高 → 算出直径",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "定理（人话）：直径垂直于弦 → 弦被平分，弦所对的两条弧也被平分。",
        "生活例·赵州桥：石拱的跨度是弦，拱高从弦中点量到拱顶——知道跨度和拱高，设半径为 r，用勾股定理列方程就能算出 r。",
        "生活例·测圆木：卡尺卡住圆木，读出弦长和拱高——同一招算出直径。",
        "⚠️ 易错：“平分弦的直径垂直于弦”反过来说不对——两条直径互相平分，但不一定垂直。",
        "记住一句话：垂直→平分（弦和弧）；平分→不一定垂直。"
      ],
      "examples": [
        {
          "text": "赵州桥：跨度 37m、拱高 7.2m，算拱所在圆的半径",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l2-p2",
      "next": "g07-u1-l3-p1"
    }
  ]
};
