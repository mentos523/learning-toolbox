window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g03-u1-l6"] = {
  "lessonId": "g03-u1-l6",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g03",
  "pages": [
    {
      "id": "g03-u1-l6-p1",
      "title": "这一章：三角形从拼到算",
      "concept": "本章知识串讲",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{拼} \\to \\text{分} \\to \\text{线} \\to \\text{角}",
          "translation": "三角形：先拼起来，再分类，再看三线，最后算角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：拼——三边关系（两边之和大于第三边）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      62
                    ],
                    [
                      82,
                      62
                    ],
                    [
                      50,
                      28
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    74
                  ],
                  "text": "a + b > c",
                  "size": 14.48,
                  "bold": true,
                  "math": true
                }
              ]
            },
            {
              "caption": "第 2 步：分——按边/按角分类；三线：高、中线、角平分线。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      62
                    ],
                    [
                      42,
                      62
                    ],
                    [
                      28,
                      32
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      54,
                      62
                    ],
                    [
                      86,
                      62
                    ],
                    [
                      70,
                      32
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    32
                  ],
                  "b": [
                    70,
                    62
                  ],
                  "color": "corrC",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "分类 + 三线",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：角——内角和 180°；外角=不相邻两内角之和；n 边形=(n−2)×180°。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      62
                    ],
                    [
                      80,
                      62
                    ],
                    [
                      50,
                      28
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    20,
                    62
                  ],
                  "a1": 311.4,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    80,
                    62
                  ],
                  "a1": 180,
                  "a2": 228.6,
                  "r": 9,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    28
                  ],
                  "a1": 48.6,
                  "a2": 131.4,
                  "r": 9,
                  "group": 3,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "180° / 外角定理 / (n−2)×180°",
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
        "这一章我们认识了三角形：怎么拼、怎么分、有哪些线、角有多少度。",
        "拼：三边关系——两边之和大于第三边（两点之间线段最短的孩子）。",
        "分与线：按边/按角分类；高（垂直）、中线（中点）、角平分线（平分角）。",
        "角：内角和 180°（撕拼实验 + 平行线证明）；外角=不相邻两内角之和；n 边形=(n−2)×180°。"
      ],
      "examples": [
        {
          "text": "一张思维导图：拼→分→线→角",
          "figure": "串讲"
        }
      ],
      "prev": "g03-u1-l5-p3",
      "next": "g03-u1-l6-p2"
    },
    {
      "id": "g03-u1-l6-p2",
      "title": "本章习题：5 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三角形} = \\text{拼} + \\text{分} + \\text{线} + \\text{角}",
          "translation": "三角形：三边关系、分类、三线、角度"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "能围成",
              "color": "corrA"
            },
            {
              "name": "围不成",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "e1",
              "label": "5，6，7",
              "group": 0,
              "anchor": [
                28,
                68
              ],
              "shape": {
                "t": "txt",
                "p": [
                  28,
                  68
                ],
                "text": "5，6，7",
                "size": 15,
                "bold": true
              }
            },
            {
              "id": "e2",
              "label": "3，4，5",
              "group": 0,
              "anchor": [
                72,
                68
              ],
              "shape": {
                "t": "txt",
                "p": [
                  72,
                  68
                ],
                "text": "3，4，5",
                "size": 15,
                "bold": true
              }
            },
            {
              "id": "e3",
              "label": "3，4，8",
              "group": 1,
              "anchor": [
                28,
                38
              ],
              "shape": {
                "t": "txt",
                "p": [
                  28,
                  38
                ],
                "text": "3，4，8",
                "size": 15,
                "bold": true
              }
            },
            {
              "id": "e4",
              "label": "2，2，5",
              "group": 1,
              "anchor": [
                72,
                38
              ],
              "shape": {
                "t": "txt",
                "p": [
                  72,
                  38
                ],
                "text": "2，2，5",
                "size": 15,
                "bold": true
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一点：哪组边能围成三角形，哪组围不成？",
        "1．（直用）三角形两边是 5 和 9，第三边可能是？A．3  B．5  C．14",
        "2．（小综合）△ABC 中 ∠A=50°，∠B=60°，求 ∠C。",
        "3．（变式）直角三角形一个锐角是 35°，另一个锐角是多少？",
        "4．（生活建模）木工做三角架，两根木条 40cm 和 60cm，第三根多长能围成？"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "点选答案：能围成—5，6，7 / 3，4，5；围不成—3，4，8 / 2，2，5。1．B（5+5>9，5+9>5）2．70°（180−50−60）3．55°（180−90−35）4．大于 20cm 且小于 100cm（两边之和>第三边，且第三边+40>60）"
        },
        {
          "figure": "错因解析",
          "text": "认图：两边之和>第三边才能围成——3+4=7<8 围不成，2+2=4<5 围不成。1．第三边 x：9−5<x<9+5，即 4<x<14——只有 B 的 5 符合。2．内角和 180°：∠C=180°−50°−60°=70°。3．直角三角形：180°−90°−35°=55°——两锐角互余。4．第三边 x：60−40<x<60+40，即 20<x<100——两边之和大于第三边、两边之差小于第三边。"
        }
      ],
      "prev": "g03-u1-l6-p1",
      "next": null
    }
  ]
};
