window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g07-u1-l4"] = {
  "lessonId": "g07-u1-l4",
  "lessonTitle": "圆周角定理",
  "chapterId": "g07",
  "pages": [
    {
      "id": "g07-u1-l4-p1",
      "title": "先认清：什么才是圆周角",
      "concept": "圆周角定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{圆周角} = \\text{顶点在圆上} + \\text{两边交圆}",
          "translation": "圆周角：顶点在圆上，两边都与圆相交"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "是圆周角",
              "caption": "顶点 P 在圆上，两边 PA、PB 都交圆于另一点——两个条件缺一不可。对照圆心角：顶点在圆心 O，顶点位置不同，名字就不同。",
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
                    22
                  ],
                  "b": [
                    24,
                    67
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    76,
                    67
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    22
                  ],
                  "a1": 60,
                  "a2": 120,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    22
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 5
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
                    90
                  ],
                  "text": "顶点在圆上，两边交圆 ✓",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "不是圆周角",
              "caption": "顶点掉进圆里、在圆外面、一边是切线没交到圆——都不是圆周角。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    20,
                    60
                  ],
                  "r": 14,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    60
                  ],
                  "b": [
                    13,
                    72.1
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    60
                  ],
                  "b": [
                    27,
                    72.1
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    82
                  ],
                  "text": "❌",
                  "size": 14.48,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    40
                  ],
                  "text": "顶点在圆内",
                  "size": 11.89
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    60
                  ],
                  "r": 14,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    84
                  ],
                  "b": [
                    43,
                    72.1
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    84
                  ],
                  "b": [
                    57,
                    72.1
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "❌",
                  "size": 14.48,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    40
                  ],
                  "text": "顶点在圆外",
                  "size": 11.89
                },
                {
                  "t": "circle",
                  "c": [
                    80,
                    60
                  ],
                  "r": 14,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    46
                  ],
                  "b": [
                    73,
                    72.1
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    46
                  ],
                  "b": [
                    94,
                    46
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    82
                  ],
                  "text": "❌",
                  "size": 14.48,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    40
                  ],
                  "text": "一边没交圆",
                  "size": 11.89
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点“是圆周角”：顶点 P 长在圆上，两边 PA、PB 都交圆——两个条件缺一不可。",
        "点“不是圆周角”：顶点在圆内、在圆外、一边没交圆——统统出局。",
        "对照圆心角：顶点在圆心 O 的叫圆心角；顶点搬到圆上，才叫圆周角。",
        "⚠️ 易错：顶点在圆上、一边是切线——切线只交于 P，不算“交圆”，不是圆周角。"
      ],
      "examples": [
        {
          "text": "看球赛：球门是弦，最佳观赛点在圆上（视角定理生活版）",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l3-p2",
      "next": "g07-u1-l4-p2"
    },
    {
      "id": "g07-u1-l4-p2",
      "title": "慢放证明：情形一",
      "concept": "圆周角定理情形一",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle APB = \\frac{1}{2} \\angle AOB",
          "translation": "圆周角等于它所对圆心角的一半"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "∠APB 是圆周角，圆心 O 在边 PA 上",
          "goal": "∠APB = ½∠AOB",
          "steps": [
            {
              "card": "连 OB——造出 △OPB。",
              "reason": "作图：连半径 OB",
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
                    20,
                    52
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
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
                    50,
                    82
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "arc",
                  "v": [
                    20,
                    52
                  ],
                  "a1": 0,
                  "a2": 45,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    13,
                    52
                  ],
                  "text": "P",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    87,
                    52
                  ],
                  "text": "A",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    89
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
              "card": "OP = OB——△OPB 是等腰三角形，得 ∠OPB = ∠OBP。",
              "reason": "同圆半径相等；等边对等角（g04.1.5）",
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
                      20,
                      52
                    ],
                    [
                      50,
                      82
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
                    20,
                    52
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
                    50,
                    82
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "arc",
                  "v": [
                    20,
                    52
                  ],
                  "a1": 0,
                  "a2": 45,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    82
                  ],
                  "a1": 225,
                  "a2": 270,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    62
                  ],
                  "text": "OP = OB",
                  "size": 13,
                  "color": "target"
                }
              ]
            },
            {
              "card": "∠AOB 是 △OPB 在 O 处的外角——∠AOB = ∠OPB + ∠OBP。",
              "reason": "三角形外角定理（g03.1.3）：外角等于不相邻两内角和",
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
                      20,
                      52
                    ],
                    [
                      50,
                      82
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
                    80,
                    52
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
                  "a1": 0,
                  "a2": 90,
                  "r": 14,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    68
                  ],
                  "text": "外角",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    13,
                    52
                  ],
                  "text": "P",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    87,
                    52
                  ],
                  "text": "A",
                  "size": 13
                }
              ]
            },
            {
              "card": "∠OPB 就是 ∠APB——O 在 PA 上，所以 ∠APB = ½∠AOB。",
              "reason": "等量代换：∠AOB = 2∠OPB = 2∠APB",
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
                    20,
                    52
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
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
                    50,
                    82
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    20,
                    52
                  ],
                  "a1": 0,
                  "a2": 45,
                  "r": 10,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 0,
                  "a2": 90,
                  "r": 12,
                  "group": 2,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    93
                  ],
                  "text": "∠APB = ½∠AOB",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "连半径 OB",
              "reason": "作图"
            },
            {
              "statement": "OP = OB → ∠OPB = ∠OBP",
              "reason": "同圆半径相等；等边对等角"
            },
            {
              "statement": "∠AOB = ∠OPB + ∠OBP",
              "reason": "三角形外角定理（△OPB 在 O 处的外角）"
            },
            {
              "statement": "∠APB = ∠OPB = ½∠AOB",
              "reason": "等量代换（O 在 PA 上，∠OPB 就是 ∠APB）"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "三问：已知？求证？第一步连 OB 凭什么？（连半径是作图，不用理由）",
        "关键动作：第 3 步把圆心角“翻译”成三角形的外角——外角定理是桥梁。"
      ],
      "examples": [
        {
          "text": "外角定理回来了：g03 的老朋友来搭桥",
          "figure": "回链"
        }
      ],
      "prev": "g07-u1-l4-p1",
      "next": "g07-u1-l4-p3"
    },
    {
      "id": "g07-u1-l4-p3",
      "title": "慢放证明：情形二",
      "concept": "圆周角定理情形二",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle APB = \\frac{1}{2} \\angle AOB",
          "translation": "圆周角等于它所对圆心角的一半"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "∠APB 是圆周角，圆心 O 在 ∠APB 内",
          "goal": "∠APB = ½∠AOB",
          "steps": [
            {
              "card": "过 P 作直径 PQ——把大角切成两个小角。",
              "reason": "直径定义：过圆心的弦；Q 是 PQ 与圆的另一交点",
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
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    65,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    43,
                    22
                  ],
                  "text": "P",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    82
                  ],
                  "text": "Q",
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
              "card": "看 ∠APQ：圆心 O 在它的一边 PQ 上——情形一！",
              "reason": "化归依据：情形一已证（本课 P2）；O 在 PQ 上",
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
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    65,
                    78
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    22
                  ],
                  "a1": 90,
                  "a2": 105,
                  "r": 10,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 90,
                  "a2": 120,
                  "r": 12,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    26,
                    52
                  ],
                  "text": "O 在 PQ 上",
                  "size": 13,
                  "color": "target"
                }
              ]
            },
            {
              "card": "同理 ∠BPQ = ½∠BOQ——另一半也是情形一。",
              "reason": "化归依据：同上（本课 P2）",
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
                    22
                  ],
                  "b": [
                    65,
                    78
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    22
                  ],
                  "a1": 75,
                  "a2": 90,
                  "r": 10,
                  "color": "target",
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
                  "color": "target",
                  "width": 3
                }
              ]
            },
            {
              "card": "∠APB = ∠APQ + ∠BPQ = ½∠AOB。",
              "reason": "等量代换（加法）",
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
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    65,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    22
                  ],
                  "a1": 75,
                  "a2": 105,
                  "r": 10,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    94
                  ],
                  "text": "∠APB = ∠APQ + ∠BPQ",
                  "size": 12,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "过 P 作直径 PQ",
              "reason": "直径定义"
            },
            {
              "statement": "∠APQ = ½∠AOQ",
              "reason": "化归：O 在 PQ 上（情形一）"
            },
            {
              "statement": "∠BPQ = ½∠BOQ",
              "reason": "化归：同上（情形一）"
            },
            {
              "statement": "∠APB = ½(∠AOQ + ∠BOQ) = ½∠AOB",
              "reason": "等量代换（加法）"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "化归思想：没见过的情形二，作一条直径，切成两个“见过的”情形一。",
        "为什么敢用情形一？折叠里写了——O 在 PQ 上，对号入座。"
      ],
      "examples": [
        {
          "text": "化归：把没见过的，切成见过的",
          "figure": "方法"
        }
      ],
      "prev": "g07-u1-l4-p2",
      "next": "g07-u1-l4-p4"
    },
    {
      "id": "g07-u1-l4-p4",
      "title": "慢放证明：情形三",
      "concept": "圆周角定理情形三",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle APB = \\frac{1}{2} \\angle AOB",
          "translation": "圆周角等于它所对圆心角的一半"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "∠APB 是圆周角，圆心 O 在 ∠APB 外",
          "goal": "∠APB = ½∠AOB",
          "steps": [
            {
              "card": "过 P 作直径 PQ——这次用“减法”。",
              "reason": "直径定义：过圆心的弦；Q 是 PQ 与圆的另一交点",
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
                    22
                  ],
                  "b": [
                    20,
                    52
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    43,
                    22
                  ],
                  "text": "P",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    57,
                    82
                  ],
                  "text": "Q",
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
              "card": "∠APQ = ½∠AOQ——大角是情形一。",
              "reason": "化归依据：O 在 PQ 上（本课 P2）",
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
                    22
                  ],
                  "b": [
                    20,
                    52
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    22
                  ],
                  "a1": 90,
                  "a2": 135,
                  "r": 10,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 90,
                  "a2": 180,
                  "r": 12,
                  "color": "target",
                  "width": 3
                }
              ]
            },
            {
              "card": "∠BPQ = ½∠BOQ——小角也是情形一。",
              "reason": "化归依据：同上（本课 P2）",
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
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    20,
                    52
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    22
                  ],
                  "a1": 90,
                  "a2": 105,
                  "r": 10,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 90,
                  "a2": 120,
                  "r": 12,
                  "color": "target",
                  "width": 3
                }
              ]
            },
            {
              "card": "∠APB = ∠APQ − ∠BPQ = ½∠AOB。",
              "reason": "等量代换（减法）",
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
                    22
                  ],
                  "b": [
                    20,
                    52
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    22
                  ],
                  "a1": 105,
                  "a2": 135,
                  "r": 10,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    94
                  ],
                  "text": "∠APB = ∠APQ − ∠BPQ",
                  "size": 12,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "过 P 作直径 PQ",
              "reason": "直径定义"
            },
            {
              "statement": "∠APQ = ½∠AOQ",
              "reason": "化归：O 在 PQ 上（情形一）"
            },
            {
              "statement": "∠BPQ = ½∠BOQ",
              "reason": "化归：同上（情形一）"
            },
            {
              "statement": "∠APB = ½(∠AOQ − ∠BOQ) = ½∠AOB",
              "reason": "等量代换（减法）"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "情形三和情形二动作一样（作直径），区别只有一个：加法变减法。",
        "三情形一句话：圆心在边上直接证，在角内用加法，在角外用减法。"
      ],
      "examples": [
        {
          "text": "加法变减法：同一个动作，换个算法",
          "figure": "方法"
        }
      ],
      "prev": "g07-u1-l4-p3",
      "next": "g07-u1-l4-p5"
    },
    {
      "id": "g07-u1-l4-p5",
      "title": "圆周角定理：总述",
      "concept": "圆周角定理总述",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{同弧所对的圆周角} = \\frac{1}{2}\\text{圆心角}",
          "translation": "同弧所对的圆周角，都等于圆心角的一半"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "情形一：圆心在角的一边上——直接用等腰 + 外角定理。",
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
                    20,
                    52
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
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
                    50,
                    82
                  ],
                  "color": "target",
                  "width": 3
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
                    12
                  ],
                  "text": "情形一：圆心在边上",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "情形二：圆心在角内——作直径，加法化归情形一。",
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
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    65,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
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
                    12
                  ],
                  "text": "情形二：圆心在角内——加法",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "情形三：圆心在角外——作直径，减法化归情形一。",
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
                    22
                  ],
                  "b": [
                    20,
                    52
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
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
                    12
                  ],
                  "text": "情形三：圆心在角外——减法",
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
        "定理总述：同弧所对的圆周角，都等于圆心角的一半——圆心在哪，不影响结论。",
        "生活例·看球赛：球门是弦，最佳观赛点都在同一段弧上——视角一样大。",
        "点拨：这是“分类讨论”第一次正式亮相——三种位置，一个一个拿下，一个结论全覆盖。",
        "⚠️ 易错：必须是“同弧”所对——不同弧的角不能比。",
        "记住一句话：一边、角内、角外——三种位置，一个“一半”。"
      ],
      "examples": [
        {
          "text": "看球赛：同一段弧上，视角都一样大",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l4-p4",
      "next": "g07-u1-l5-p1"
    }
  ]
};
