window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g04-u1-l7"] = {
  "lessonId": "g04-u1-l7",
  "lessonTitle": "尺规作图（一）",
  "chapterId": "g04",
  "pages": [
    {
      "id": "g04-u1-l7-p1",
      "title": "作图 1：作一条线段等于已知线段",
      "concept": "作等长线段",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{圆规量取} \\Rightarrow \\text{等长线段}",
          "translation": "用圆规把已知线段的长度“搬”到另一条射线上"
        }
      ],
      "interaction": {
        "type": "construction-step",
        "params": {
          "steps": [
            {
              "text": "用圆规量出已知线段的长度",
              "why": "圆规两脚的距离就是长度——量好别动",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    62
                  ],
                  "b": [
                    45,
                    62
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    74
                  ],
                  "text": "已知线段",
                  "size": 13
                },
                {
                  "t": "circle",
                  "c": [
                    15,
                    62
                  ],
                  "r": 30,
                  "color": "aux",
                  "dash": "5,4"
                }
              ]
            },
            {
              "text": "画一条射线，定起点 A",
              "why": "新线段得有个起点",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    62
                  ],
                  "b": [
                    45,
                    62
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "ray",
                  "p": [
                    55,
                    62
                  ],
                  "ang": 0,
                  "len": 35,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    62
                  ],
                  "label": "A",
                  "color": "known"
                }
              ]
            },
            {
              "text": "以A为圆心画弧交射线于B",
              "why": "圆规距离没变，AB 和已知线段等长",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    62
                  ],
                  "b": [
                    45,
                    62
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "ray",
                  "p": [
                    55,
                    62
                  ],
                  "ang": 0,
                  "len": 35,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    55,
                    62
                  ],
                  "r": 30,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    85,
                    62
                  ],
                  "label": "B",
                  "color": "target"
                }
              ]
            },
            {
              "text": "线段 AB 就是要作的线段",
              "why": "AB 的长度 = 圆规量出的长度",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    62
                  ],
                  "b": [
                    85,
                    62
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    62
                  ],
                  "b": [
                    45,
                    62
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    74
                  ],
                  "text": "AB = 已知线段",
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
        "跟做：点“下一步”，圆规的距离就是“长度不变”的保证。",
        "这是所有作图的基本功——后面的作图都要用它“搬”长度。",
        "点“为什么这样画？”：每一步的依据都写在里面。"
      ],
      "examples": [
        {
          "text": "木工：用圆规在木料上截取等长木条",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l6-p3",
      "next": "g04-u1-l7-p2"
    },
    {
      "id": "g04-u1-l7-p2",
      "title": "作图 2：作一个角等于已知角",
      "concept": "作等角（SSS 应用）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{SSS} \\Rightarrow \\text{对应角相等}",
          "translation": "复制三边造全等，对应角就相等了"
        }
      ],
      "interaction": {
        "type": "construction-step",
        "params": {
          "steps": [
            {
              "text": "画一条射线 O′A′",
              "why": "新角得有个顶点和一条边",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    18,
                    60
                  ],
                  "b": [
                    40,
                    72
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    60
                  ],
                  "b": [
                    42,
                    52
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    18,
                    60
                  ],
                  "label": "O",
                  "color": "known"
                },
                {
                  "t": "ray",
                  "p": [
                    58,
                    60
                  ],
                  "ang": 0,
                  "len": 30,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    58,
                    60
                  ],
                  "label": "O′",
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    84
                  ],
                  "text": "已知角",
                  "size": 13
                }
              ]
            },
            {
              "text": "以O为圆心画弧交两边于MN",
              "why": "在已知角两边截等长：OM=ON",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    18,
                    60
                  ],
                  "b": [
                    40,
                    72
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    60
                  ],
                  "b": [
                    42,
                    52
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    18,
                    60
                  ],
                  "r": 16,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    32.05,
                    67.66
                  ],
                  "label": "M",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    33.18,
                    54.94
                  ],
                  "label": "N",
                  "color": "known"
                },
                {
                  "t": "ray",
                  "p": [
                    58,
                    60
                  ],
                  "ang": 0,
                  "len": 30,
                  "color": "line",
                  "width": 2.5
                }
              ]
            },
            {
              "text": "以O′为圆心画弧交射线于M′",
              "why": "保证 O′M′=OM——第一条对应边对上了",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    18,
                    60
                  ],
                  "b": [
                    40,
                    72
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    60
                  ],
                  "b": [
                    42,
                    52
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "ray",
                  "p": [
                    58,
                    60
                  ],
                  "ang": 0,
                  "len": 30,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    58,
                    60
                  ],
                  "r": 16,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    74,
                    60
                  ],
                  "label": "M′",
                  "color": "known"
                }
              ]
            },
            {
              "text": "以 M′ 为圆心、MN 为半径画弧截得 N′",
              "why": "半径取 MN，保证 M′N′=MN——三条对应边全对上了",
              "shapes": [
                {
                  "t": "ray",
                  "p": [
                    58,
                    60
                  ],
                  "ang": 0,
                  "len": 30,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    58,
                    60
                  ],
                  "r": 16,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "circle",
                  "c": [
                    74,
                    60
                  ],
                  "r": 12,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    68,
                    71
                  ],
                  "label": "N′",
                  "color": "target"
                }
              ]
            },
            {
              "text": "连 O′N′，新角画好了",
              "why": "SSS：三边对应相等→两三角形全等→对应角相等",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    58,
                    60
                  ],
                  "b": [
                    88,
                    60
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    58,
                    60
                  ],
                  "b": [
                    68,
                    71
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    60
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
                    70,
                    82
                  ],
                  "text": "∠M′O′N′ = ∠MON",
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
        "跟做：点“下一步”——你其实在“复制”一个三角形。",
        "三段长度 OM、ON、MN 全搬过去了——SSS 全等，对应角必相等。",
        "这就是“作图即全等”：作图成功，靠的是全等判定。"
      ],
      "examples": [
        {
          "text": "装修：复制墙角的角度到另一块板材上",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l7-p1",
      "next": "g04-u1-l7-p3"
    },
    {
      "id": "g04-u1-l7-p3",
      "title": "作图 3：作角的平分线",
      "concept": "作角平分线",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{SSS} \\Rightarrow \\angle AOP=\\angle BOP",
          "translation": "造两个全等三角形，对应角相等，平分线就出来了"
        }
      ],
      "interaction": {
        "type": "construction-step",
        "params": {
          "steps": [
            {
              "text": "以O为圆心画弧交两边于AB",
              "why": "在两边截等长：OA=OB",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    58,
                    74
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    60,
                    48
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    30,
                    60
                  ],
                  "r": 22,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    48,
                    70
                  ],
                  "label": "A",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    53
                  ],
                  "label": "B",
                  "color": "known"
                }
              ]
            },
            {
              "text": "以A为圆心大于AB一半画弧",
              "why": "半径太小，两弧碰不到面",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    58,
                    74
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    60,
                    48
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    48,
                    70
                  ],
                  "r": 20,
                  "color": "aux",
                  "dash": "5,4"
                }
              ]
            },
            {
              "text": "以B为圆心同半径画弧交于P",
              "why": "保证 PA=PB——对称的两条边",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    58,
                    74
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    60,
                    48
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    48,
                    70
                  ],
                  "r": 20,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    53
                  ],
                  "r": 20,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    66.95,
                    63.61
                  ],
                  "label": "P",
                  "color": "target"
                }
              ]
            },
            {
              "text": "连 OP，OP 就是角平分线",
              "why": "SSS：△OAP≌△OBP→∠AOP=∠BOP",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    58,
                    74
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    60,
                    48
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    66.95,
                    63.61
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    60
                  ],
                  "a1": 5.6,
                  "a2": 26.6,
                  "r": 12,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    60
                  ],
                  "a1": 338.2,
                  "a2": 5.6,
                  "r": 12,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "∠AOP = ∠BOP",
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
        "跟做：点“下一步”——P 点是两条弧“商量”出来的交点。",
        "为什么是平分线？OA=OB、PA=PB、OP=OP——SSS 全等，对应角相等。",
        "想一想：第二步为什么强调“大于 AB 一半”？"
      ],
      "examples": [
        {
          "text": "折纸：对折纸角，折痕就是角平分线——和尺规作图一个道理",
          "figure": "实测"
        }
      ],
      "prev": "g04-u1-l7-p2",
      "next": "g04-u1-l7-p4"
    },
    {
      "id": "g04-u1-l7-p4",
      "title": "作图 4：过一点作已知直线的垂线",
      "concept": "作垂线",
      "formulas": [
        {
          "id": "f1",
          "latex": "PA=PB,\\ QA=QB \\Rightarrow PQ \\perp \\text{直线}",
          "translation": "P、Q 都在 AB 的“正中间”，连线就是垂线"
        }
      ],
      "interaction": {
        "type": "construction-step",
        "params": {
          "steps": [
            {
              "text": "以P为圆心画弧交直线于AB",
              "why": "PA=PB：P 在 AB 的“正中间”",
              "shapes": [
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
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    66
                  ],
                  "label": "P",
                  "color": "known"
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    66
                  ],
                  "r": 32,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    31.4,
                    40
                  ],
                  "label": "A",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    68.6,
                    40
                  ],
                  "label": "B",
                  "color": "known"
                }
              ]
            },
            {
              "text": "以A为圆心大于AB一半画弧",
              "why": "给两弧一个相遇的机会",
              "shapes": [
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
                  "width": 2
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    66
                  ],
                  "label": "P",
                  "color": "line"
                },
                {
                  "t": "circle",
                  "c": [
                    31.4,
                    40
                  ],
                  "r": 30,
                  "color": "aux",
                  "dash": "5,4"
                }
              ]
            },
            {
              "text": "以B为圆心同半径画弧交于Q",
              "why": "QA=QB：Q 也在 AB 的“正中间”",
              "shapes": [
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
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    31.4,
                    40
                  ],
                  "r": 30,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "circle",
                  "c": [
                    68.6,
                    40
                  ],
                  "r": 30,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    16.5
                  ],
                  "label": "Q",
                  "color": "target"
                }
              ]
            },
            {
              "text": "连 PQ，PQ 就是垂线",
              "why": "SSS 全等→对应角→PQ⊥直线（等腰三线合一也行）",
              "shapes": [
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
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    66
                  ],
                  "b": [
                    50,
                    16.5
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    40
                  ],
                  "p": [
                    15,
                    40
                  ],
                  "q": [
                    50,
                    66
                  ],
                  "size": 7,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "PQ ⊥ 直线",
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
        "跟做：点“下一步”——P 和 Q 两个“正中间”的点，定出一条垂线。",
        "g02 课上我们用三角板推过垂线；这是尺规版——只用圆规直尺，一样画出来。",
        "4 步画完——没超 6 步，一页装得下。"
      ],
      "examples": [
        {
          "text": "泥瓦匠：用绳子和钉子在地上画直角",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l7-p3",
      "next": "g04-u1-l7-p5"
    },
    {
      "id": "g04-u1-l7-p5",
      "title": "作图即全等",
      "concept": "作图原理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{尺规作图} = \\text{全等判定的施工图}",
          "translation": "每一种尺规作图，背后都是一次全等判定"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：四种作图，一种原理——复制长度，造全等。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "作线段 → 搬长度",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    66
                  ],
                  "text": "作角 → SSS 造全等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    52
                  ],
                  "text": "作角平分线 → SSS 造全等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    38
                  ],
                  "text": "作垂线 → SSS 造全等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    22
                  ],
                  "text": "作图 = 全等判定的施工图",
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
        "还记得吗？作角时我们搬了三段长度 OM、ON、MN——作的是全等。",
        "人话：尺规作图的每一步都在“复制”长度；作图能成功，靠的是全等判定（SSS）。",
        "作角 = 复制一个三角形（SSS）→ 对应角相等；作角平分线 = 造两个全等三角形。",
        "生活例：木工复制零件——量三段、画三段，形状分毫不差。",
        "跃升点拨：定义告诉你图形“是什么”，画法告诉你“怎么得到它”——画法是定义的施工图。",
        "记住一句话：作图即全等。"
      ],
      "examples": [
        {
          "text": "跃升 2：看一遍 → 跟一遍 → 自己来一遍，三遍都在这四页里",
          "figure": "方法"
        }
      ],
      "prev": "g04-u1-l7-p4",
      "next": "g04-u1-l8-p1"
    }
  ]
};
