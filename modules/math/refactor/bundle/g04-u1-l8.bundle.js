window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g04-u1-l8"] = {
  "lessonId": "g04-u1-l8",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g04",
  "pages": [
    {
      "id": "g04-u1-l8-p1",
      "title": "全等章：一张图总结",
      "concept": "本章小结",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{SSS / SAS / ASA / AAS}",
          "translation": "四种全等判定：边边边、边角边、角边角、角角边"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：SSS——三边对应相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      62
                    ],
                    [
                      70,
                      62
                    ],
                    [
                      50,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    62
                  ],
                  "b": [
                    70,
                    62
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    62
                  ],
                  "b": [
                    50,
                    32
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    32
                  ],
                  "b": [
                    30,
                    62
                  ],
                  "ticks": 3,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "SSS：边边边",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：SAS——两边及夹角对应相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      62
                    ],
                    [
                      70,
                      62
                    ],
                    [
                      50,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    62
                  ],
                  "b": [
                    70,
                    62
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    62
                  ],
                  "b": [
                    50,
                    32
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    70,
                    62
                  ],
                  "a1": 180,
                  "a2": 236.3,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "SAS：边角边",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：ASA——两角及夹边对应相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      62
                    ],
                    [
                      70,
                      62
                    ],
                    [
                      50,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    62
                  ],
                  "a1": 303.7,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    70,
                    62
                  ],
                  "a1": 180,
                  "a2": 236.3,
                  "r": 10,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    62
                  ],
                  "b": [
                    70,
                    62
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "ASA：角边角",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 4 步：AAS——两角及一对边对应相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      62
                    ],
                    [
                      70,
                      62
                    ],
                    [
                      50,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "arc",
                  "v": [
                    30,
                    62
                  ],
                  "a1": 303.7,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    70,
                    62
                  ],
                  "a1": 180,
                  "a2": 236.3,
                  "r": 10,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    62
                  ],
                  "b": [
                    50,
                    32
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "AAS：角角边",
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
        "四种判定：SSS（三边）、SAS（两边夹角）、ASA（两角夹边）、AAS（两角一对边）——位置不能乱。",
        "等腰：性质（等边对等角、三线合一）与判定（等角对等边）互逆；等边是特殊的等腰。",
        "作图四种：作线段、作角、作角平分线、作垂线——背后都是全等判定。",
        "回链：对应边/角相等（g04.1.1）是全等的性质；判定是反过来的“充分条件”。",
        "预告：直角三角形还有第五种判定 HL，学完勾股定理（g05.1.5）揭晓。"
      ],
      "examples": [],
      "prev": "g04-u1-l7-p5",
      "next": "g04-u1-l8-p2"
    },
    {
      "id": "g04-u1-l8-p2",
      "title": "本章习题：6 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{SSS / SAS / ASA / AAS}",
          "translation": "用四种判定和等腰性质解题"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "全等",
              "color": "corrA"
            },
            {
              "name": "不是全等",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "t1",
              "label": "①",
              "group": 0,
              "anchor": [
                25,
                72
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    12,
                    82
                  ],
                  [
                    38,
                    82
                  ],
                  [
                    25,
                    60
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "t2",
              "label": "②",
              "group": 0,
              "anchor": [
                75,
                72
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    62,
                    82
                  ],
                  [
                    88,
                    82
                  ],
                  [
                    75,
                    60
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "t3",
              "label": "③",
              "group": 1,
              "anchor": [
                25,
                32
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    16,
                    42
                  ],
                  [
                    34,
                    42
                  ],
                  [
                    25,
                    26
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            },
            {
              "id": "t4",
              "label": "④",
              "group": 1,
              "anchor": [
                75,
                32
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    62,
                    44
                  ],
                  [
                    88,
                    44
                  ],
                  [
                    72,
                    22
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "认图：4 个三角形分进两篮：全等/非全等。",
        "1．△ABC≌△DEF，AB=3，求 DE。",
        "2．等腰三角形底角 40°，求顶角。",
        "3．三边 3、4、5 与 5、3、4 的三角形全等吗？",
        "4．作等角：写出前两步。",
        "5．两边一角对应相等，一定全等吗？",
        "6．门一大一小，用全等说服师傅返工。"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "认图：①②全等；1．3；2．100°；3．全等（SSS，三边对应相等）；4．画射线、以顶点为圆心画弧；5．不一定（角须为夹角）；6．全等要求完全重合，大小不同即不全等"
        },
        {
          "figure": "错因解析",
          "text": "认图：全等=能完全重合——看形状大小是否都一样。1．全等三角形对应边相等：DE=AB=3。2．顶角=180°−2×40°=100°。3．三边对应相等（SSS）：3↔3、4↔4、5↔5，全等。4．作等角前两步：画一条射线；以原角顶点为圆心画弧——尺规作图即全等。5．不一定：两边一角须是“夹角”（SAS）才全等，“边边角”可能有两种三角形。6．全等要求完全重合：大小不同，再像也不是全等——返工有理。"
        }
      ],
      "prev": "g04-u1-l8-p1",
      "next": null
    }
  ]
};
