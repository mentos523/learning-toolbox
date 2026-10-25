window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g04-u1-l4"] = {
  "lessonId": "g04-u1-l4",
  "lessonTitle": "ASA 与 AAS 判定",
  "chapterId": "g04",
  "pages": [
    {
      "id": "g04-u1-l4-p1",
      "title": "实验：两角一夹边，扫出唯一三角形",
      "concept": "ASA 实验",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{两角及夹边对应相等} \\Rightarrow \\text{全等}",
          "translation": "两个角和它们的夹边对应相等，两个三角形就全等（ASA）"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：先画好夹边 BC。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    40
                  ],
                  "b": [
                    65,
                    40
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    40
                  ],
                  "label": "B",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    40
                  ],
                  "label": "C",
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    52
                  ],
                  "text": "夹边 BC",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：在 B、C 两端立起两个已知的角。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    40
                  ],
                  "b": [
                    65,
                    40
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "ray",
                  "p": [
                    25,
                    40
                  ],
                  "ang": 50,
                  "len": 32,
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "ray",
                  "p": [
                    65,
                    40
                  ],
                  "ang": 120,
                  "len": 32,
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    25,
                    40
                  ],
                  "a1": 0,
                  "a2": 50,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    65,
                    40
                  ],
                  "a1": 120,
                  "a2": 180,
                  "r": 10,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    76
                  ],
                  "text": "两角立起来",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：两条射线交于 A——三角形唯一出现。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      40
                    ],
                    [
                      65,
                      40
                    ],
                    [
                      49,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "arc",
                  "v": [
                    25,
                    40
                  ],
                  "a1": 0,
                  "a2": 50,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    65,
                    40
                  ],
                  "a1": 120,
                  "a2": 180,
                  "r": 10,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "pt",
                  "p": [
                    49,
                    68
                  ],
                  "label": "A",
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    82
                  ],
                  "text": "只能长这一个样",
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
        "看第 2 步：两角像两盏探照灯，从 B、C 两端照出去。",
        "看第 3 步：两束光交于一点——三角形只能长这一个样。",
        "这就是角边角：两角一夹边，扫出唯一三角形。"
      ],
      "examples": [
        {
          "text": "测河宽：量一边两角，就能算出对岸的距离",
          "figure": "实测"
        }
      ],
      "prev": "g04-u1-l3-p2",
      "next": "g04-u1-l4-p2"
    },
    {
      "id": "g04-u1-l4-p2",
      "title": "ASA：两角夹一边",
      "concept": "角边角判定",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle B=\\angle E,\\ BC=EF,\\ \\angle C=\\angle F \\Rightarrow \\triangle ABC \\cong \\triangle DEF",
          "translation": "两角和夹边对应相等，两个三角形全等，记作 ASA"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两组对应角同弧，中间的夹边同色——ASA。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      60
                    ],
                    [
                      54,
                      60
                    ],
                    [
                      38,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    14,
                    60
                  ],
                  "a1": 310.6,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    54,
                    60
                  ],
                  "a1": 180,
                  "a2": 240.3,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    60
                  ],
                  "b": [
                    54,
                    60
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      60
                    ],
                    [
                      92,
                      60
                    ],
                    [
                      76,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "ASA：角边角",
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
        "还记得吗？两角加中间的夹边，射线一交，三角形只能长一个样。",
        "人话：两个角加它们中间的边——角边角，简称 ASA。",
        "生活例：老师只告诉你底边多长、两底角多大，你画出的三角形和同学的一模一样。",
        "反例：只有两个角相等、没有边——大小定不下来（那是相似，不是全等）。",
        "⚠️ 别搞混：这条边必须是两个角“中间”的那条，位置不能乱。",
        "记住一句话：两角夹一边，扫出唯一形。"
      ],
      "examples": [
        {
          "text": "木工复制三角板：量一夹边两角，复制分毫不差",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l4-p1",
      "next": "g04-u1-l4-p3"
    },
    {
      "id": "g04-u1-l4-p3",
      "title": "慢放证明：AAS 为什么成立",
      "concept": "AAS 证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{两角及一对边对应相等} \\Rightarrow \\text{全等}",
          "translation": "两个角和其中一角的对边对应相等，两个三角形就全等（AAS）"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "card": "已知：∠B=∠E、∠C=∠F，AB=DE。先算第三个角。",
              "reason": "已知条件（蓝色）；求证：两三角形全等（红色）",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      66
                    ],
                    [
                      46,
                      66
                    ],
                    [
                      30,
                      42
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      54,
                      66
                    ],
                    [
                      86,
                      66
                    ],
                    [
                      70,
                      42
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    14,
                    66
                  ],
                  "a1": 303.7,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "known"
                },
                {
                  "t": "arc",
                  "v": [
                    46,
                    66
                  ],
                  "a1": 180,
                  "a2": 236.3,
                  "r": 9,
                  "group": 2,
                  "color": "known"
                },
                {
                  "t": "arc",
                  "v": [
                    54,
                    66
                  ],
                  "a1": 303.7,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "known"
                },
                {
                  "t": "arc",
                  "v": [
                    86,
                    66
                  ],
                  "a1": 180,
                  "a2": 236.3,
                  "r": 9,
                  "group": 2,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    66
                  ],
                  "b": [
                    30,
                    42
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    54,
                    66
                  ],
                  "b": [
                    70,
                    42
                  ],
                  "ticks": 1,
                  "color": "known"
                }
              ]
            },
            {
              "card": "∠A=180°−∠B−∠C，∠D=180°−∠E−∠F，所以 ∠A=∠D。",
              "reason": "三角形内角和 180°（g03.1.3）＋等量代换",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      66
                    ],
                    [
                      46,
                      66
                    ],
                    [
                      30,
                      42
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      54,
                      66
                    ],
                    [
                      86,
                      66
                    ],
                    [
                      70,
                      42
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    42
                  ],
                  "a1": 56.3,
                  "a2": 123.7,
                  "r": 9,
                  "group": 3,
                  "color": "target"
                },
                {
                  "t": "arc",
                  "v": [
                    70,
                    42
                  ],
                  "a1": 56.3,
                  "a2": 123.7,
                  "r": 9,
                  "group": 3,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "第三个角也相等",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "card": "现在 AB 变成了 ∠B、∠A 的夹边——条件变成了 ASA。",
              "reason": "夹边就是两角中间那条边；AB 原是 ∠C 的对边，现在正好夹在 ∠B 和 ∠A 中间",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      66
                    ],
                    [
                      46,
                      66
                    ],
                    [
                      30,
                      42
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      54,
                      66
                    ],
                    [
                      86,
                      66
                    ],
                    [
                      70,
                      42
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    66
                  ],
                  "b": [
                    30,
                    42
                  ],
                  "ticks": 1,
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    54,
                    66
                  ],
                  "b": [
                    70,
                    42
                  ],
                  "ticks": 1,
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "AB：两角的夹边",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "card": "由 ASA，△ABC ≌ △DEF。AAS 得证。",
              "reason": "ASA 判定（本课 P1）：两角及夹边对应相等",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      66
                    ],
                    [
                      46,
                      66
                    ],
                    [
                      30,
                      42
                    ]
                  ],
                  "color": "corrA",
                  "width": 3.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      54,
                      66
                    ],
                    [
                      86,
                      66
                    ],
                    [
                      70,
                      42
                    ]
                  ],
                  "color": "corrA",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "AAS：角角边",
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
        "慢放：点 ▶，看每一步画布上哪个部位在动。",
        "关键一步：第 3 步——这条边“变身”成了两角的夹边。",
        "点“为什么可以？”：每个“因为”都有出处。",
        "想一想：AAS 的证明用到了哪条已学过的定理？"
      ],
      "examples": [
        {
          "text": "证明阅读三问：已知是什么？求证是什么？第一步为什么敢算第三角？",
          "figure": "方法"
        }
      ],
      "prev": "g04-u1-l4-p2",
      "next": "g04-u1-l4-p4"
    },
    {
      "id": "g04-u1-l4-p4",
      "title": "AAS：两角一对边",
      "concept": "角角边判定",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle B=\\angle E,\\ \\angle C=\\angle F,\\ AB=DE \\Rightarrow \\triangle ABC \\cong \\triangle DEF",
          "translation": "两角和其中一角的对边对应相等，两个三角形全等，记作 AAS"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两组对应角同弧，一条对边同色——AAS。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      62
                    ],
                    [
                      44,
                      62
                    ],
                    [
                      29,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    14,
                    62
                  ],
                  "a1": 298.2,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    44,
                    62
                  ],
                  "a1": 180,
                  "a2": 241.8,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    44,
                    62
                  ],
                  "b": [
                    29,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "AAS：角角边",
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
        "还记得吗？慢放证明里，两角定了，第三个角就定了（内角和 180°）。",
        "人话：两个角加一个角的对边——角角边，简称 AAS。",
        "为什么成立？第三个角一定，这条边就变成了“夹边”——AAS 其实是 ASA 的化身。",
        "生活例：只知道两角和一条对边，照样能复制出同样的三角形。",
        "⚠️ 别搞混：边角边、角边角、角角边——名字里的“边”在哪，位置不能乱。",
        "预告：直角三角形还有第五种判定，学完勾股定理揭晓（g05.1.5）。",
        "记住一句话：两角一边，对应关系对了就全等。"
      ],
      "examples": [
        {
          "text": "ASA 与 AAS 对照：都是“两角一边”，边的“位置”不同",
          "figure": "对比"
        }
      ],
      "prev": "g04-u1-l4-p3",
      "next": "g04-u1-l5-p1"
    }
  ]
};
