window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l3"] = {
  "lessonId": "g11-u1-l3",
  "lessonTitle": "三角形面积",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l3-p1",
      "title": "两个三角形拼一拼",
      "concept": "三角形面积是平行四边形的一半",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{两个全等三角形} \\Rightarrow \\text{平行四边形}",
          "translation": "两个完全一样的三角形能拼成一个平行四边形"
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
                  8,
                  12
                ],
                [
                  48,
                  12
                ],
                [
                  23,
                  52
                ]
              ]
            },
            {
              "id": "t2",
              "label": "②",
              "pts": [
                [
                  58,
                  52
                ],
                [
                  18,
                  52
                ],
                [
                  43,
                  12
                ]
              ]
            }
          ],
          "targets": [
            {
              "id": "t1",
              "pts": [
                [
                  20,
                  30
                ],
                [
                  60,
                  30
                ],
                [
                  35,
                  70
                ]
              ]
            },
            {
              "id": "t2",
              "pts": [
                [
                  75,
                  70
                ],
                [
                  35,
                  70
                ],
                [
                  60,
                  30
                ]
              ]
            }
          ],
          "autoAssemble": true,
          "doneText": "拼成平行四边形了！"
        }
      },
      "auxInteraction": null,
      "hints": [
        "把两个一模一样的三角形拖进虚线轮廓——它们拼成了一个平行四边形。",
        "三角形只占拼成图形的一半——所以面积公式里有个“除以 2”。",
        "没变的是：两个三角形的面积加起来 = 平行四边形的面积。"
      ],
      "examples": [
        {
          "text": "三明治对角切：两块三角形拼回一个长方形三明治",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l2-p3",
      "next": "g11-u1-l3-p2"
    },
    {
      "id": "g11-u1-l3-p2",
      "title": "三角形面积：底乘高除以 2",
      "concept": "三角形面积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = \\frac{a \\times h}{2}",
          "translation": "三角形面积等于底乘高除以 2"
        },
        {
          "id": "f2",
          "latex": "\\text{钝角三角形的高在形外}",
          "translation": "钝角三角形有一条高画在图形外面"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "正例：锐角三角形的高在形内——从顶点垂直画到底边。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      30
                    ],
                    [
                      75,
                      30
                    ],
                    [
                      50,
                      70
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    30
                  ],
                  "p": [
                    25,
                    30
                  ],
                  "q": [
                    50,
                    70
                  ],
                  "size": 5,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "高在形内 ✓",
                  "size": 13,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "反例：钝角三角形的高在形外——底边要“延长”出去接住它。❌ 别画到形里去。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      55
                    ],
                    [
                      60,
                      55
                    ],
                    [
                      80,
                      25
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    55
                  ],
                  "b": [
                    88,
                    55
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    25
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "target",
                  "width": 2.5,
                  "dash": "5,4"
                },
                {
                  "t": "right",
                  "v": [
                    80,
                    55
                  ],
                  "p": [
                    60,
                    55
                  ],
                  "q": [
                    80,
                    25
                  ],
                  "size": 5,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    63
                  ],
                  "text": "底边延长线",
                  "size": 11.89,
                  "color": "aux"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "高在形外：延长底边来接",
                  "size": 13,
                  "color": "target"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？两个三角形拼成平行四边形（面积 ah）——一个三角形就是它的一半：S=ah/2。",
        "三角形面积 = 底 × 高 ÷ 2：先乘再除以 2——别忘了除以 2！",
        "生活例：三明治对角切，一块就是半个长方形。图形例：底 6、高 4，面积=6×4÷2=12。",
        "反例：钝角三角形的高在形外——底边延长出去接住它，别画到形里。",
        "⚠️ 别搞混：“除以 2”是三角形的专属——平行四边形不用除，梯形也要除。",
        "记住一句话：三角形面积，底乘高再砍一半。"
      ],
      "examples": [
        {
          "text": "底 6cm、高 4cm：面积 12cm²",
          "figure": "算式"
        }
      ],
      "prev": "g11-u1-l3-p1",
      "next": "g11-u1-l3-p3"
    },
    {
      "id": "g11-u1-l3-p3",
      "title": "同底等高，面积相等",
      "concept": "等底等高的三角形面积相等",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_1 = S_2 = \\frac{a \\times h}{2}",
          "translation": "底和高都相等，面积一定相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 个：底是 a，高是 h——面积 = ah/2。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      40,
                      65
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    40,
                    30
                  ],
                  "b": [
                    40,
                    65
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "S = ah/2",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 2 个：顶点挪了位置，底还是 a、高还是 h——面积还是 ah/2。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      68,
                      65
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    30
                  ],
                  "b": [
                    72,
                    30
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    68,
                    30
                  ],
                  "b": [
                    68,
                    65
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "S = ah/2",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrB"
                }
              ]
            },
            {
              "caption": "第 3 个：顶点再挪，底高不变——面积永远是 ah/2。没变的是：面积。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      28,
                      65
                    ]
                  ],
                  "color": "corrC",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    30
                  ],
                  "b": [
                    28,
                    65
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "S = ah/2",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrC"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "三个三角形长得不一样，但底都是 a、高都是 h——面积全是 ah/2。",
        "变化的是：顶点的位置、三角形的形状；没变的是：面积。",
        "这就是几何的灵魂：变化中找不变。"
      ],
      "examples": [
        {
          "text": "同底等高的三角形：形状不同，面积相同",
          "figure": "图形"
        }
      ],
      "prev": "g11-u1-l3-p2",
      "next": "g11-u1-l3-p4"
    },
    {
      "id": "g11-u1-l3-p4",
      "title": "算一算三角形面积",
      "concept": "三角形面积计算",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = \\frac{6 \\times 4}{2} = 12",
          "translation": "底 6、高 4 的三角形面积是 12"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "例题：底 6cm、高 4cm——面积 = 6×4÷2 = 12cm²。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      35
                    ],
                    [
                      75,
                      35
                    ],
                    [
                      50,
                      70
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    35
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    27
                  ],
                  "text": "底 = 6",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    52
                  ],
                  "text": "高 = 4",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "S = 6×4÷2 = 12",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "例题：底 6cm、高 4cm 的三角形，面积 = 6×4÷2 = 12cm²。",
        "自查三问：底找对了吗？高垂直吗？除以 2 了吗？",
        "下一课：两个梯形拼一拼，猜猜公式长什么样。"
      ],
      "examples": [
        {
          "text": "三明治：长方形 6×4，对角切一块 12",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l3-p3",
      "next": "g11-u1-l4-p1"
    }
  ]
};
