window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g07-u1-l6"] = {
  "lessonId": "g07-u1-l6",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g07",
  "pages": [
    {
      "id": "g07-u1-l6-p1",
      "title": "圆（一）：一张图总结",
      "concept": "本章小结",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{垂径} / \\text{弧弦角} / \\text{圆周角}",
          "translation": "本章三定理：垂径定理、弧弦圆心角、圆周角定理"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定理 1·垂径定理：垂直于弦的直径，平分弦、平分弧。",
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
                    14
                  ],
                  "text": "垂径定理",
                  "size": 15,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "定理 2·弧弦圆心角：同圆里，等弧对等弦、等弦对等圆心角。",
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
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 100,
                  "a2": 140,
                  "r": 35,
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 220,
                  "a2": 260,
                  "r": 35,
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    44.8,
                    81.5
                  ],
                  "b": [
                    27,
                    71.3
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 2
                },
                {
                  "t": "seg",
                  "a": [
                    27,
                    32.7
                  ],
                  "b": [
                    44.8,
                    22.5
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 2
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
                    14
                  ],
                  "text": "弧弦圆心角",
                  "size": 15,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "定理 3·圆周角定理：同弧圆周角 = 圆心角的一半；直径对直角，直角对直径。",
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
                  "t": "arc",
                  "v": [
                    50,
                    22
                  ],
                  "a1": 75,
                  "a2": 105,
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
                  "r": 4
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
                    14
                  ],
                  "text": "圆周角定理",
                  "size": 15,
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
        "定理 1 垂径定理：垂直于弦的直径，平分弦、平分弧（g07.1.2）。",
        "定理 2 弧弦圆心角：同圆里等弧对等弦、等弦对等圆心角（g07.1.3）。",
        "定理 3 圆周角定理：同弧圆周角 = 一半圆心角；直径对直角、直角对直径（g07.1.4–1.5）。",
        "一条线：对称性（对折/旋转）是圆所有性质的源头——g10 学变换时回来看。",
        "预告：下一章 g08——直线和圆“打起来”：相交、相切、相离。"
      ],
      "examples": [],
      "prev": "g07-u1-l5-p2",
      "next": "g07-u1-l6-p2"
    },
    {
      "id": "g07-u1-l6-p2",
      "title": "本章习题：6 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{垂径} / \\text{弧弦角} / \\text{圆周角}",
          "translation": "用本章三定理：垂径定理、弧弦圆心角、圆周角定理"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "是圆周角",
              "color": "corrA"
            },
            {
              "name": "不是圆周角",
              "color": "corrB"
            }
          ],
          "base": [
            {
              "t": "circle",
              "c": [
                24,
                70
              ],
              "r": 15,
              "color": "line",
              "width": 2.5
            },
            {
              "t": "circle",
              "c": [
                76,
                70
              ],
              "r": 15,
              "color": "line",
              "width": 2.5
            },
            {
              "t": "circle",
              "c": [
                24,
                30
              ],
              "r": 15,
              "color": "line",
              "width": 2.5
            },
            {
              "t": "circle",
              "c": [
                76,
                30
              ],
              "r": 15,
              "color": "line",
              "width": 2.5
            },
            {
              "t": "pt",
              "p": [
                24,
                55
              ],
              "label": "P",
              "color": "known",
              "r": 4
            },
            {
              "t": "pt",
              "p": [
                76,
                70
              ],
              "label": "O",
              "color": "known",
              "r": 4
            },
            {
              "t": "pt",
              "p": [
                24,
                34
              ],
              "color": "known",
              "r": 4
            },
            {
              "t": "pt",
              "p": [
                76,
                15
              ],
              "color": "known",
              "r": 4
            },
            {
              "t": "txt",
              "p": [
                24,
                92
              ],
              "text": "①",
              "size": 16,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                76,
                92
              ],
              "text": "②",
              "size": 16,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                24,
                50
              ],
              "text": "③",
              "size": 16,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                76,
                50
              ],
              "text": "④",
              "size": 16,
              "bold": true
            }
          ],
          "items": [
            {
              "id": "q1",
              "label": "①",
              "group": 0,
              "anchor": [
                24,
                55
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    18.9,
                    84.1
                  ],
                  [
                    24,
                    55
                  ],
                  [
                    29.1,
                    84.1
                  ]
                ],
                "close": false,
                "color": "line",
                "width": 3
              }
            },
            {
              "id": "q2",
              "label": "②",
              "group": 1,
              "anchor": [
                76,
                70
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    61,
                    70
                  ],
                  [
                    76,
                    70
                  ],
                  [
                    76,
                    85
                  ]
                ],
                "close": false,
                "color": "line",
                "width": 3
              }
            },
            {
              "id": "q3",
              "label": "③",
              "group": 1,
              "anchor": [
                24,
                34
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    18.9,
                    44.1
                  ],
                  [
                    24,
                    34
                  ],
                  [
                    29.1,
                    44.1
                  ]
                ],
                "close": false,
                "color": "line",
                "width": 3
              }
            },
            {
              "id": "q4",
              "label": "④",
              "group": 1,
              "anchor": [
                76,
                15
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    68.5,
                    43
                  ],
                  [
                    76,
                    15
                  ],
                  [
                    91,
                    15
                  ]
                ],
                "close": false,
                "color": "line",
                "width": 3
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "1．认图：4 个角分进两篮——是圆周角 / 不是圆周角。",
        "2．⊙O 半径 5，弦 AB = 8，CD 是直径且 CD⊥AB 于 E，求 AE。",
        "3．同弧 AB 所对的圆心角 ∠AOB = 80°，求圆周角 ∠APB。",
        "4．AB 是直径，P 在圆上，∠PAB = 30°，求 ∠PBA，并说出依据。",
        "5．赵州桥跨度约 37m、拱高约 7.2m：设拱所在圆半径为 r，列出方程。",
        "6．为什么“直径是圆里最长的弦”？用本章定理一句话说明。"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "1．① 是；②③④ 不是（②是圆心角，③顶点在圆内，④一边是切线）。2．AE = 4（垂径定理）。3．40°（圆周角定理）。4．60°（直径所对的圆周角是直角）。5．r² = 18.5² + (r − 7.2)²（勾股定理）。6．弦不过圆心时 OA + OB > AB（三边关系）；弦过圆心时弦 = 2r = 直径。"
        },
        {
          "figure": "错因解析",
          "text": "认图：圆周角=顶点在圆上+两边交圆——②顶点是圆心（圆心角），③顶点在圆内，④一边是切线。1．垂径定理：直径垂直弦则平分弦——AE=AB/2=4。2．圆周角定理：同弧圆周角=圆心角的一半——80°/2=40°。3．直径所对的圆周角是直角：∠APB=90°，∠PBA=90°−30°=60°。4．半跨 18.5：r²=18.5²+(r−7.2)²——圆心到拱顶距离 r−7.2，勾股列方程。5．弦 AB 不过圆心时，△OAB 中 OA+OB>AB（三边关系）；弦过圆心时弦=2r=直径——直径最长。"
        }
      ],
      "prev": "g07-u1-l6-p1",
      "next": null
    }
  ]
};
