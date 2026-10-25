window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l2"] = {
  "lessonId": "g11-u1-l2",
  "lessonTitle": "平行四边形面积",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l2-p1",
      "title": "剪一刀，拼成矩形",
      "concept": "割补法求平行四边形面积",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{割补前后，面积不变}",
          "translation": "把平行四边形剪拼成矩形，面积没有变化"
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
                  14
                ],
                [
                  23,
                  14
                ],
                [
                  23,
                  54
                ]
              ]
            },
            {
              "id": "t2",
              "label": "②",
              "pts": [
                [
                  40,
                  8
                ],
                [
                  65,
                  8
                ],
                [
                  80,
                  48
                ],
                [
                  40,
                  48
                ]
              ]
            }
          ],
          "targets": [
            {
              "id": "t1",
              "pts": [
                [
                  55,
                  30
                ],
                [
                  70,
                  30
                ],
                [
                  70,
                  70
                ]
              ]
            },
            {
              "id": "t2",
              "pts": [
                [
                  30,
                  30
                ],
                [
                  55,
                  30
                ],
                [
                  70,
                  70
                ],
                [
                  30,
                  70
                ]
              ]
            }
          ],
          "autoAssemble": true,
          "doneText": "拼成矩形了！面积没变！"
        }
      },
      "auxInteraction": null,
      "hints": [
        "把左边的三角形剪下来，拖到右边的虚线轮廓里。",
        "拼好后：长方形！它的长就是平行四边形的底，高就是平行四边形的高。",
        "没变的是：面积——这就是“割补法”。"
      ],
      "examples": [
        {
          "text": "剪纸：剪一刀拼一拼，纸的面积不变",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l1-p4",
      "next": "g11-u1-l2-p2"
    },
    {
      "id": "g11-u1-l2-p2",
      "title": "平行四边形面积公式",
      "concept": "平行四边形面积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = a \\times h",
          "translation": "平行四边形面积等于底乘以高"
        },
        {
          "id": "f2",
          "latex": "\\text{等底等高} \\Rightarrow \\text{面积相等}",
          "translation": "底和高都相等的平行四边形，面积相等"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "站得直",
              "caption": "底是 a，高是 h——面积 = ah。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      70,
                      30
                    ],
                    [
                      70,
                      70
                    ],
                    [
                      30,
                      70
                    ]
                  ],
                  "color": "corrA",
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
                  "t": "txt",
                  "p": [
                    50,
                    22
                  ],
                  "text": "底 a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    50
                  ],
                  "text": "高 h",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "S = ah",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "label": "斜得厉害",
              "caption": "底还是 a，高还是 h——面积还是 ah。形状变了，面积没变。",
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
                      80,
                      70
                    ],
                    [
                      40,
                      70
                    ]
                  ],
                  "color": "corrB",
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
                    70
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    22
                  ],
                  "text": "底 a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    46,
                    50
                  ],
                  "text": "高 h",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "S = ah",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrB"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？你剪下三角形拼到右边，长方形出现了——长是底 a，宽是高 h。",
        "平行四边形面积 = 底 × 高：S=ah。注意这个 h 必须是“垂直”的那条高——斜边不算。",
        "生活例：伸缩门拉来拉去，底没变、高变了，面积跟着变。图形例：等底等高的两个平行四边形，一个正、一个斜，面积都是 ah。",
        "反例：底一样但高不一样，面积就不一样——“等底” alone 不够，还得“等高”。",
        "⚠️ 别搞混：高是“垂直距离”，不是斜边的长——斜边永远比高长，别拿斜边当高乘。",
        "呼应代数 2.2.1 平方差：大正方形挖小正方形，剩下 a²−b²=(a+b)(a−b)——同一张图，两种读法。",
        "记住一句话：底乘高，高的“高”是垂直的“高”。"
      ],
      "examples": [
        {
          "text": "底 6cm、高 4cm：面积 24cm²",
          "figure": "算式"
        }
      ],
      "prev": "g11-u1-l2-p1",
      "next": "g11-u1-l2-p3"
    },
    {
      "id": "g11-u1-l2-p3",
      "title": "伸缩门：高变了",
      "concept": "面积随高的变化",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = a \\times h",
          "translation": "底不变，高变小，面积跟着变小"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "伸缩门撑开：底是 a，高是 h——面积 = ah。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      25
                    ],
                    [
                      70,
                      25
                    ],
                    [
                      70,
                      75
                    ],
                    [
                      30,
                      75
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    25
                  ],
                  "b": [
                    50,
                    75
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    17
                  ],
                  "text": "底 a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    50
                  ],
                  "text": "高 h",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    87
                  ],
                  "text": "S = ah",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "伸缩门压扁：底还是 a，高变小了——面积也变小了。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      40
                    ],
                    [
                      60,
                      40
                    ],
                    [
                      80,
                      60
                    ],
                    [
                      40,
                      60
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    40
                  ],
                  "b": [
                    50,
                    60
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    34
                  ],
                  "text": "底 a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    50
                  ],
                  "text": "高变小",
                  "size": 13,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "面积变小",
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
        "底没变，高变了，面积就变了——面积公式 S=ah 里，a 和 h 缺一不可。",
        "做题自查：我乘的 h，真的是“垂直”的那条吗？"
      ],
      "examples": [
        {
          "text": "小区伸缩门：拉扁后占地面积变小",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l2-p2",
      "next": "g11-u1-l3-p1"
    }
  ]
};
