window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g02-u1-l4"] = {
  "lessonId": "g02-u1-l4",
  "lessonTitle": "同位角、内错角、同旁内角",
  "chapterId": "g02",
  "pages": [
    {
      "id": "g02-u1-l4-p1",
      "title": "第三条直线来了：八个角排排坐",
      "concept": "三线八角总览",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三条直线相交} \\to \\text{八个角}",
          "translation": "一条截线切两条直线，形成八个角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：两条直线 a、b。",
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
                  "width": 3
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
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    72
                  ],
                  "text": "a",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    40
                  ],
                  "text": "b",
                  "size": 14.48
                }
              ]
            },
            {
              "caption": "第 2 步：第三条直线 c“切”过来——叫截线，一共形成 8 个角。",
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
                  "width": 3
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
                  "width": 3
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
                  "t": "txt",
                  "p": [
                    88,
                    72
                  ],
                  "text": "a",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    40
                  ],
                  "text": "b",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    87
                  ],
                  "text": "c（截线）",
                  "size": 13,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 3 步：上面的交点，4 个角编上号：∠1、∠2、∠3、∠4。",
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
                  "width": 3
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
                  "width": 3
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
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    83
                  ],
                  "text": "∠2",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    61
                  ],
                  "text": "∠4",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 4 步：下面的交点：∠5、∠6、∠7、∠8。三线八角，到齐。",
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
                  "width": 3
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
                  "width": 3
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
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    83
                  ],
                  "text": "∠2",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    61
                  ],
                  "text": "∠4",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    51
                  ],
                  "text": "∠6",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    33
                  ],
                  "text": "∠7",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    29
                  ],
                  "text": "∠8",
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
        "点 ▶：截线 c 切过 a、b，8 个角一个个亮起来。",
        "先认编号：上面 ∠1 到 ∠4，下面 ∠5 到 ∠8。",
        "三条线、八个角——“三线八角”。接下来三页，我们给它们分组、起名字。",
        "⚠️ 提醒：编号是临时的，位置关系才是永久的——下页见。"
      ],
      "examples": [
        {
          "text": "斑马线被斜路切过：数一数有几个角",
          "figure": "实物"
        }
      ],
      "prev": "g02-u1-l3-p2",
      "next": "g02-u1-l4-p2"
    },
    {
      "id": "g02-u1-l4-p2",
      "title": "同位角：位置一模一样的角",
      "concept": "同位角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{同位角} = \\text{位置相同的两个角}",
          "translation": "同位角：在两个交点的相同位置上的一对角"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "base": [
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
              "width": 3
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
              "width": 3
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
              "width": 2
            },
            {
              "t": "poly",
              "pts": [
                [
                  68,
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
              "width": 3,
              "dash": "6,4",
              "close": false
            },
            {
              "t": "txt",
              "p": [
                88,
                72
              ],
              "text": "a",
              "size": 13
            },
            {
              "t": "txt",
              "p": [
                88,
                40
              ],
              "text": "b",
              "size": 13
            },
            {
              "t": "txt",
              "p": [
                64,
                87
              ],
              "text": "c",
              "size": 13
            },
            {
              "t": "txt",
              "p": [
                68,
                80
              ],
              "text": "∠1",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                50,
                83
              ],
              "text": "∠2",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                47,
                65
              ],
              "text": "∠3",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                65,
                61
              ],
              "text": "∠4",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                56,
                48
              ],
              "text": "∠5",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                38,
                51
              ],
              "text": "∠6",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                35,
                33
              ],
              "text": "∠7",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                53,
                29
              ],
              "text": "∠8",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                74,
                56
              ],
              "text": "F",
              "size": 15,
              "bold": true,
              "color": "aux"
            }
          ],
          "groups": [
            {
              "name": "同位角",
              "color": "corrA"
            }
          ],
          "items": [
            {
              "id": "a1",
              "label": "∠1",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  57.2,
                  72
                ],
                "a1": 0,
                "a2": 70,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "a2",
              "label": "∠2",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  57.2,
                  72
                ],
                "a1": 70,
                "a2": 180,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "a3",
              "label": "∠3",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  57.2,
                  72
                ],
                "a1": 180,
                "a2": 250,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "a4",
              "label": "∠4",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  57.2,
                  72
                ],
                "a1": 250,
                "a2": 360,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "a5",
              "label": "∠5",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  45.4,
                  40
                ],
                "a1": 0,
                "a2": 70,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "a6",
              "label": "∠6",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  45.4,
                  40
                ],
                "a1": 70,
                "a2": 180,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "a7",
              "label": "∠7",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  45.4,
                  40
                ],
                "a1": 180,
                "a2": 250,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "a8",
              "label": "∠8",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  45.4,
                  40
                ],
                "a1": 250,
                "a2": 360,
                "r": 9,
                "color": "corrAngle"
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一点：8 个角里，藏着 4 对“同位角”——位置一模一样的一对。",
        "看虚线的“F”：∠1 和 ∠5，一个在上交点右上，一个在下交点右上——位置相同。",
        "找全 4 对：∠1–∠5、∠2–∠6、∠3–∠7、∠4–∠8。",
        "点拨：“同位”就是“同一个位置”——都在右上，或都在左下。"
      ],
      "examples": [
        {
          "text": "F 形：顺着 F 的三笔找同位角",
          "figure": "方法"
        }
      ],
      "prev": "g02-u1-l4-p1",
      "next": "g02-u1-l4-p3"
    },
    {
      "id": "g02-u1-l4-p3",
      "title": "内错角：Z 字两头的角",
      "concept": "内错角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{内错角} = \\text{内部错开的两个角}",
          "translation": "内错角：在两直线之间、截线两侧的一对角"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "base": [
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
              "width": 3
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
              "width": 3
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
              "width": 2
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
              "width": 3,
              "dash": "6,4",
              "close": false
            },
            {
              "t": "txt",
              "p": [
                88,
                72
              ],
              "text": "a",
              "size": 13
            },
            {
              "t": "txt",
              "p": [
                88,
                40
              ],
              "text": "b",
              "size": 13
            },
            {
              "t": "txt",
              "p": [
                64,
                87
              ],
              "text": "c",
              "size": 13
            },
            {
              "t": "txt",
              "p": [
                68,
                80
              ],
              "text": "∠1",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                50,
                83
              ],
              "text": "∠2",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                47,
                65
              ],
              "text": "∠3",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                65,
                61
              ],
              "text": "∠4",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                56,
                48
              ],
              "text": "∠5",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                38,
                51
              ],
              "text": "∠6",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                35,
                33
              ],
              "text": "∠7",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                53,
                29
              ],
              "text": "∠8",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                30,
                56
              ],
              "text": "Z",
              "size": 15,
              "bold": true,
              "color": "aux"
            }
          ],
          "groups": [
            {
              "name": "第 1 对",
              "color": "corrA"
            },
            {
              "name": "第 2 对",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "b3",
              "label": "∠3",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  57.2,
                  72
                ],
                "a1": 180,
                "a2": 250,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "b5",
              "label": "∠5",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  45.4,
                  40
                ],
                "a1": 0,
                "a2": 70,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "b4",
              "label": "∠6",
              "group": 1,
              "shape": {
                "t": "arc",
                "v": [
                  45.4,
                  40
                ],
                "a1": 70,
                "a2": 180,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "b6",
              "label": "∠4",
              "group": 1,
              "shape": {
                "t": "arc",
                "v": [
                  57.2,
                  72
                ],
                "a1": 250,
                "a2": 360,
                "r": 9,
                "color": "corrAngle"
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一点：找出 2 对内错角——“里面”+“错开”的一对。",
        "看虚线的“Z”：∠3 在上交点的左下，∠5 在下交点的右上——一个左一个右，错开了。",
        "“内”是两条直线 a、b 之间；“错”是分居截线两侧。",
        "找全 2 对：∠3–∠5、∠4–∠6。"
      ],
      "examples": [
        {
          "text": "Z 形：Z 的两头就是一对内错角",
          "figure": "方法"
        }
      ],
      "prev": "g02-u1-l4-p2",
      "next": "g02-u1-l4-p4"
    },
    {
      "id": "g02-u1-l4-p4",
      "title": "同旁内角：U 字怀里的角",
      "concept": "同旁内角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{同旁内角} = \\text{内部同侧的两个角}",
          "translation": "同旁内角：在两直线之间、截线同侧的一对角"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "base": [
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
              "width": 3
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
              "width": 3
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
              "width": 2
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
              "width": 3,
              "dash": "6,4",
              "close": false
            },
            {
              "t": "txt",
              "p": [
                88,
                72
              ],
              "text": "a",
              "size": 13
            },
            {
              "t": "txt",
              "p": [
                88,
                40
              ],
              "text": "b",
              "size": 13
            },
            {
              "t": "txt",
              "p": [
                64,
                87
              ],
              "text": "c",
              "size": 13
            },
            {
              "t": "txt",
              "p": [
                68,
                80
              ],
              "text": "∠1",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                50,
                83
              ],
              "text": "∠2",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                47,
                65
              ],
              "text": "∠3",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                65,
                61
              ],
              "text": "∠4",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                56,
                48
              ],
              "text": "∠5",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                38,
                51
              ],
              "text": "∠6",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                35,
                33
              ],
              "text": "∠7",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                53,
                29
              ],
              "text": "∠8",
              "size": 12
            },
            {
              "t": "txt",
              "p": [
                74,
                56
              ],
              "text": "U",
              "size": 15,
              "bold": true,
              "color": "aux"
            }
          ],
          "groups": [
            {
              "name": "第 1 对",
              "color": "corrA"
            },
            {
              "name": "第 2 对",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "c4",
              "label": "∠4",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  57.2,
                  72
                ],
                "a1": 250,
                "a2": 360,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "c5",
              "label": "∠5",
              "group": 0,
              "shape": {
                "t": "arc",
                "v": [
                  45.4,
                  40
                ],
                "a1": 0,
                "a2": 70,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "c3",
              "label": "∠3",
              "group": 1,
              "shape": {
                "t": "arc",
                "v": [
                  57.2,
                  72
                ],
                "a1": 180,
                "a2": 250,
                "r": 9,
                "color": "corrAngle"
              }
            },
            {
              "id": "c6",
              "label": "∠6",
              "group": 1,
              "shape": {
                "t": "arc",
                "v": [
                  45.4,
                  40
                ],
                "a1": 70,
                "a2": 180,
                "r": 9,
                "color": "corrAngle"
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一点：找出 2 对同旁内角——“同侧”+“里面”的一对。",
        "看虚线：∠4 和 ∠5 都在截线 c 的右边、都在 a 和 b 之间——像被 U 字抱在怀里。",
        "找全 2 对：∠4–∠5、∠3–∠6。",
        "三组名字集齐：F 同位、Z 内错、U 同旁——三线八角的分组，下节课派大用场。"
      ],
      "examples": [
        {
          "text": "U 形：U 抱住的两个角就是一对同旁内角",
          "figure": "方法"
        }
      ],
      "prev": "g02-u1-l4-p3",
      "next": "g02-u1-l4-p5"
    },
    {
      "id": "g02-u1-l4-p5",
      "title": "三线八角：一次讲透",
      "concept": "三线八角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{一条截线} + \\text{两条直线} = \\text{八个角}",
          "translation": "一条截线切过两条直线，一共形成八个角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：截线 c 切过 a、b——上面交点 4 个角，下面交点 4 个角，到齐。",
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
                  "width": 3
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
                  "width": 3
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
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    83
                  ],
                  "text": "∠2",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    61
                  ],
                  "text": "∠4",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    51
                  ],
                  "text": "∠6",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    33
                  ],
                  "text": "∠7",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    29
                  ],
                  "text": "∠8",
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
        "还记得吗？你点了 ▶，截线 c 切过 a、b，8 个角一个个亮起来——上面 ∠1 到 ∠4，下面 ∠5 到 ∠8。",
        "三线八角：一条截线切过两条直线，形成的八个角——“三线”是 a、b、c，“八角”是 ∠1 到 ∠8。",
        "生活例：楼梯的斜扶手切过每级台阶——每一级都被“切”出 4 个角。",
        "图形例：看定格图——认准两个交点，一个交点管 4 个角。",
        "反例：三条直线交于同一点——只有 6 个角。三线八角要求两个不同的交点，“共点”的不算。",
        "⚠️ 别搞混：编号 ∠1–∠8 是临时的，换个图可能重编——位置关系（上下、左右）才是永久的。",
        "记住一句话：一线切两线，八角排排坐。"
      ],
      "examples": [
        {
          "text": "斜扶手切台阶：每级 4 个角",
          "figure": "实物"
        }
      ],
      "prev": "g02-u1-l4-p4",
      "next": "g02-u1-l4-p6"
    },
    {
      "id": "g02-u1-l4-p6",
      "title": "同位角：F 形找同位",
      "concept": "同位角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{同位角} = \\text{两交点上位置相同的角}",
          "translation": "同位角是在两个交点的相同位置上的一对角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：F 的三笔框住 ∠1 和 ∠5——上交点右上、下交点右上，位置一模一样。",
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
                  "width": 3
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
                  "width": 3
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
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      68,
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
                  "width": 3,
                  "dash": "6,4",
                  "close": false
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    72
                  ],
                  "text": "a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    40
                  ],
                  "text": "b",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    87
                  ],
                  "text": "c",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    56
                  ],
                  "text": "F",
                  "size": 15,
                  "bold": true,
                  "color": "aux"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 11,
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
                  "r": 11,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    83
                  ],
                  "text": "∠2",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    61
                  ],
                  "text": "∠4",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    51
                  ],
                  "text": "∠6",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    33
                  ],
                  "text": "∠7",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    29
                  ],
                  "text": "∠8",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？你点的 F 形里，∠1 在上交点右上，∠5 在下交点右上——位置相同，这就是同位角。",
        "同位角：两个交点上，位置完全相同的一对角——都在右上，或都在左下。",
        "生活例：电影院前后两排、同一列的两个座位——位置一模一样。",
        "图形例：顺着 F 的三笔找——F 框住的两个角就是一对：∠1–∠5、∠2–∠6、∠3–∠7、∠4–∠8。",
        "反例：∠1 和 ∠3 都在上交点——同位角必须是两个交点各出一个，同一个交点的再像也不是。",
        "⚠️ 别搞混：同位角说的是“位置相同”，不是“大小相等”——大小相等要等两直线平行才成立，下节课见。",
        "记住一句话：同位看 F，位置要相同。"
      ],
      "examples": [
        {
          "text": "F 形三笔：框住的就是一对",
          "figure": "方法"
        }
      ],
      "prev": "g02-u1-l4-p5",
      "next": "g02-u1-l4-p7"
    },
    {
      "id": "g02-u1-l4-p7",
      "title": "内错角：Z 字两头找",
      "concept": "内错角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{内错角} = \\text{两直线之间、截线两侧的角}",
          "translation": "内错角是在两条直线之间、分居截线两侧的一对角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：Z 的两头——∠3（上交点左下）和 ∠5（下交点右上），里面、错开。",
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
                  "width": 3
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
                  "width": 3
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
                  "width": 2
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
                  "width": 3,
                  "dash": "6,4",
                  "close": false
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    72
                  ],
                  "text": "a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    40
                  ],
                  "text": "b",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    87
                  ],
                  "text": "c",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    56
                  ],
                  "text": "Z",
                  "size": 15,
                  "bold": true,
                  "color": "aux"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 11,
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
                  "r": 11,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    83
                  ],
                  "text": "∠2",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    61
                  ],
                  "text": "∠4",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    51
                  ],
                  "text": "∠6",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    33
                  ],
                  "text": "∠7",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    29
                  ],
                  "text": "∠8",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？你点的 Z 形里，∠3 在上交点左下，∠5 在下交点右上——一个左一个右，错开了。",
        "内错角：夹在两条直线 a、b 之间，又分居截线 c 两侧的一对角——“内”是里面，“错”是错开。",
        "生活例：两条平行的马路，中间绿化带两侧各站一人，一个在东头一个在西头——里面、错开。",
        "图形例：Z 的两头就是一对内错角：∠3–∠5、∠4–∠6。",
        "反例：∠3 和 ∠6——看着也“错开”，但都在截线左侧（同侧）——那是同旁内角，不是内错角。",
        "⚠️ 别搞混：内错角也要“两条直线之间”——跑到 a 上面或 b 下面的角，再错开也不是内错角。",
        "记住一句话：内错看 Z，里面错开。"
      ],
      "examples": [
        {
          "text": "Z 字两头：一头一个",
          "figure": "方法"
        }
      ],
      "prev": "g02-u1-l4-p6",
      "next": "g02-u1-l4-p8"
    },
    {
      "id": "g02-u1-l4-p8",
      "title": "同旁内角：U 形抱一抱",
      "concept": "同旁内角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{同旁内角} = \\text{两直线之间、截线同侧的角}",
          "translation": "同旁内角是在两条直线之间、截线同一侧的一对角"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "同位角·F",
              "caption": "F 形：∠1 和 ∠5——两个交点、位置相同（都在右上）——同位角。",
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
                  "width": 3
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
                  "width": 3
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
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      68,
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
                  "width": 3,
                  "dash": "6,4",
                  "close": false
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    72
                  ],
                  "text": "a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    40
                  ],
                  "text": "b",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    87
                  ],
                  "text": "c",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    56
                  ],
                  "text": "F",
                  "size": 15,
                  "bold": true,
                  "color": "aux"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 11,
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
                  "r": 11,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    83
                  ],
                  "text": "∠2",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    61
                  ],
                  "text": "∠4",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    51
                  ],
                  "text": "∠6",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    33
                  ],
                  "text": "∠7",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    29
                  ],
                  "text": "∠8",
                  "size": 12
                }
              ]
            },
            {
              "label": "内错角·Z",
              "caption": "Z 形：∠3 和 ∠5——两直线之间、截线两侧（一左一右）——内错角。",
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
                  "width": 3
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
                  "width": 3
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
                  "width": 2
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
                  "width": 3,
                  "dash": "6,4",
                  "close": false
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    72
                  ],
                  "text": "a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    40
                  ],
                  "text": "b",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    87
                  ],
                  "text": "c",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    56
                  ],
                  "text": "Z",
                  "size": 15,
                  "bold": true,
                  "color": "aux"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 11,
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
                  "r": 11,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    83
                  ],
                  "text": "∠2",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    61
                  ],
                  "text": "∠4",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    51
                  ],
                  "text": "∠6",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    33
                  ],
                  "text": "∠7",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    29
                  ],
                  "text": "∠8",
                  "size": 12
                }
              ]
            },
            {
              "label": "同旁内角·U",
              "caption": "U 形：∠4 和 ∠5——两直线之间、截线同侧（都在右边）——同旁内角。",
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
                  "width": 3
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
                  "width": 3
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
                  "width": 2
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
                  "width": 3,
                  "dash": "6,4",
                  "close": false
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    72
                  ],
                  "text": "a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    40
                  ],
                  "text": "b",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    87
                  ],
                  "text": "c",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    56
                  ],
                  "text": "U",
                  "size": 15,
                  "bold": true,
                  "color": "aux"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 11,
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
                  "r": 11,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 0,
                  "a2": 70,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    57.2,
                    72
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 70,
                  "a2": 180,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 180,
                  "a2": 250,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    45.4,
                    40
                  ],
                  "a1": 250,
                  "a2": 360,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    61
                  ],
                  "text": "∠4",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    80
                  ],
                  "text": "∠1",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    83
                  ],
                  "text": "∠2",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    65
                  ],
                  "text": "∠3",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    38,
                    51
                  ],
                  "text": "∠6",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    33
                  ],
                  "text": "∠7",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    29
                  ],
                  "text": "∠8",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？你点的 U 形里，∠4 和 ∠5 都在截线右边、都被 a、b 夹在中间——像被 U 抱在怀里。",
        "同旁内角：夹在两条直线之间，又在截线同一侧的一对角——“同旁”是同侧，“内”是里面。",
        "生活例：两条平行的跑道，同一侧看台上前后排的两个观众——里面、同侧。",
        "图形例：U 抱住的两个角：∠4–∠5、∠3–∠6。",
        "反例：∠4 和 ∠8——也都在截线右侧，但 ∠8 在直线 b 的外边——不在“两条直线之间”，那是同位角。",
        "⚠️ 别搞混：同旁内角互补（和 180°）也要等两直线平行——现在只认位置，不认大小。",
        "F/Z/U 对比：F 同位（位置相同）、Z 内错（里面两侧）、U 同旁（里面同侧）——看字母，认位置。",
        "记住一句话：F 同位，Z 内错，U 同旁。"
      ],
      "examples": [
        {
          "text": "U 形怀抱：抱住的两个角",
          "figure": "方法"
        }
      ],
      "prev": "g02-u1-l4-p7",
      "next": "g02-u2-l1-p1"
    }
  ]
};
