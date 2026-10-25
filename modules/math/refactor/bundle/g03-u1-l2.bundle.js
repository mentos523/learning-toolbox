window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g03-u1-l2"] = {
  "lessonId": "g03-u1-l2",
  "lessonTitle": "三角形的分类与三线",
  "chapterId": "g03",
  "pages": [
    {
      "id": "g03-u1-l2-p1",
      "title": "分一分：按边分，还是按角分？",
      "concept": "三角形的分类",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{按边分} \\quad / \\quad \\text{按角分}",
          "translation": "三角形有两种分法：看边，或看角"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "按边分",
              "caption": "看边：三边都相等→等边三角形；两边相等→等腰三角形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      62
                    ],
                    [
                      48,
                      62
                    ],
                    [
                      35,
                      30
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    22,
                    62
                  ],
                  "b": [
                    48,
                    62
                  ],
                  "ticks": 3,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    62
                  ],
                  "b": [
                    35,
                    30
                  ],
                  "ticks": 3,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    35,
                    30
                  ],
                  "b": [
                    22,
                    62
                  ],
                  "ticks": 3,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    72
                  ],
                  "text": "等边",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      62
                    ],
                    [
                      84,
                      62
                    ],
                    [
                      71,
                      36
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    58,
                    62
                  ],
                  "b": [
                    71,
                    36
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    71,
                    36
                  ],
                  "b": [
                    84,
                    62
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    71,
                    72
                  ],
                  "text": "等腰",
                  "size": 13,
                  "color": "corrB"
                }
              ]
            },
            {
              "label": "按角分",
              "caption": "看角：三个锐角→锐角三角形；一个直角→直角三角形；一个钝角→钝角三角形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      62
                    ],
                    [
                      40,
                      62
                    ],
                    [
                      27,
                      32
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    27,
                    72
                  ],
                  "text": "锐角",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      48,
                      62
                    ],
                    [
                      74,
                      62
                    ],
                    [
                      48,
                      32
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    48,
                    62
                  ],
                  "p": [
                    48,
                    32
                  ],
                  "q": [
                    74,
                    62
                  ],
                  "size": 6,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    61,
                    72
                  ],
                  "text": "直角",
                  "size": 13,
                  "color": "corrB"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      78,
                      62
                    ],
                    [
                      96,
                      62
                    ],
                    [
                      66,
                      30
                    ]
                  ],
                  "color": "corrC",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    82,
                    72
                  ],
                  "text": "钝角",
                  "size": 13,
                  "color": "corrC"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点“按边分”：看边长——等边（3 条等长刻度）、等腰（2 条等长刻度）。",
        "点“按角分”：看角——锐角、直角（有直角方块）、钝角。",
        "变的是边长和角度；不变的是——它们都是三角形。",
        "分三角形先问一句：我是按边分，还是按角分？"
      ],
      "examples": [
        {
          "text": "红领巾：等腰三角形；三角板：直角三角形",
          "figure": "实物"
        }
      ],
      "prev": "g03-u1-l1-p3",
      "next": "g03-u1-l2-p2"
    },
    {
      "id": "g03-u1-l2-p2",
      "title": "点一点：高、中线、角平分线",
      "concept": "三角形的高、中线、角平分线",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{高} \\quad / \\quad \\text{中线} \\quad / \\quad \\text{角平分线}",
          "translation": "从一个顶点出发，能画出三种不一样的线"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "base": [
            {
              "t": "poly",
              "pts": [
                [
                  14,
                  30
                ],
                [
                  84,
                  30
                ],
                [
                  30,
                  72
                ]
              ],
              "color": "line",
              "width": 3
            },
            {
              "t": "txt",
              "p": [
                9,
                24
              ],
              "text": "B",
              "size": 14.48,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                89,
                24
              ],
              "text": "C",
              "size": 14.48,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                30,
                80
              ],
              "text": "A",
              "size": 14.48,
              "bold": true
            },
            {
              "t": "pt",
              "p": [
                30,
                30
              ],
              "r": 3,
              "color": "line"
            },
            {
              "t": "txt",
              "p": [
                23,
                20
              ],
              "text": "D",
              "size": 12
            },
            {
              "t": "pt",
              "p": [
                49,
                30
              ],
              "r": 3,
              "color": "line"
            },
            {
              "t": "txt",
              "p": [
                55,
                20
              ],
              "text": "M",
              "size": 12
            },
            {
              "t": "pt",
              "p": [
                41.8,
                30
              ],
              "r": 2.5,
              "color": "line"
            },
            {
              "t": "txt",
              "p": [
                37,
                20
              ],
              "text": "E",
              "size": 12
            }
          ],
          "groups": [
            {
              "name": "高",
              "color": "corrA"
            },
            {
              "name": "中线",
              "color": "corrB"
            },
            {
              "name": "角平分线",
              "color": "corrC"
            }
          ],
          "items": [
            {
              "id": "alt",
              "label": "高 AD",
              "group": 0,
              "anchor": [
                22,
                52
              ],
              "shape": {
                "t": "seg",
                "a": [
                  30,
                  72
                ],
                "b": [
                  30,
                  30
                ],
                "color": "corrA",
                "width": 3
              }
            },
            {
              "id": "med",
              "label": "中线 AM",
              "group": 1,
              "anchor": [
                58,
                52
              ],
              "shape": {
                "t": "seg",
                "a": [
                  30,
                  72
                ],
                "b": [
                  49,
                  30
                ],
                "color": "corrB",
                "width": 3,
                "dash": "6,3"
              }
            },
            {
              "id": "bis",
              "label": "角平分线 AE",
              "group": 2,
              "anchor": [
                46,
                52
              ],
              "shape": {
                "t": "seg",
                "a": [
                  30,
                  72
                ],
                "b": [
                  41.8,
                  30
                ],
                "color": "corrC",
                "width": 3
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "从顶点 A 出发，能画三条不一样的线——点一点，把它们送进各自的组。",
        "高 AD：从 A 向对边 BC 画垂线，垂足是 D——“高”是垂直的。",
        "中线：连到对边中点 M——“中”是中点的中。",
        "角平分线：把 ∠A 平分成两半的线——“分”的是角。",
        "全部点亮后记住：从一个顶点出发，三条线各走各的路。"
      ],
      "examples": [
        {
          "text": "认旧友：这三条线你刚点亮过，下页给它们正式起名字",
          "figure": "回链"
        }
      ],
      "prev": "g03-u1-l2-p1",
      "next": "g03-u1-l2-p3"
    },
    {
      "id": "g03-u1-l2-p3",
      "title": "分类讲透：等边也是等腰",
      "concept": "三角形分类",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{等边} \\subset \\text{等腰}",
          "translation": "等边三角形是等腰三角形的一种"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：按边分——等边（它也是等腰）、等腰、不等边；按角分——锐角、直角、钝角。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      62
                    ],
                    [
                      42,
                      62
                    ],
                    [
                      30,
                      32
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    72
                  ],
                  "text": "等边",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      52,
                      62
                    ],
                    [
                      76,
                      62
                    ],
                    [
                      64,
                      36
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    72
                  ],
                  "text": "等腰",
                  "size": 13,
                  "color": "corrB"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      46,
                      28
                    ],
                    [
                      24,
                      12
                    ]
                  ],
                  "color": "corrC",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    24,
                    28
                  ],
                  "p": [
                    24,
                    12
                  ],
                  "q": [
                    46,
                    28
                  ],
                  "size": 5,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    36
                  ],
                  "text": "直角",
                  "size": 13,
                  "color": "corrC"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？上一课你亲手点过两种分法：按边看、按角看。",
        "按边：三条边都相等——等边三角形；有两条边相等——等腰三角形。",
        "等边三角形也是等腰三角形（它也有两条边相等）——等边是等腰的一种。",
        "按角：三个角都是锐角——锐角三角形；有一个直角——直角三角形；有一个钝角——钝角三角形。",
        "一个三角形里最多有一个直角或钝角——两个直角的话，角和就超过 180° 了（内角和下节课揭晓）。",
        "⚠️ 别搞混：“等腰”和“等边”不是并列的，等边是等腰的一种。",
        "记住一句话：分三角形，先问“按什么分”。"
      ],
      "examples": [
        {
          "text": "金字塔侧面：等腰三角形",
          "figure": "实物"
        }
      ],
      "prev": "g03-u1-l2-p2",
      "next": "g03-u1-l2-p4"
    },
    {
      "id": "g03-u1-l2-p4",
      "title": "三线讲透：钝角三角形的高在形外",
      "concept": "高、中线、角平分线的性质",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{钝角三角形的高可以在形外}",
          "translation": "钝角三角形的高不一定画在图形里面"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "锐角三角形",
              "caption": "锐角三角形：三条高都在形内，垂足都落在边上。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      30
                    ],
                    [
                      82,
                      30
                    ],
                    [
                      52,
                      70
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    52,
                    70
                  ],
                  "b": [
                    52,
                    30
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    52,
                    30
                  ],
                  "p": [
                    52,
                    70
                  ],
                  "q": [
                    82,
                    30
                  ],
                  "size": 5,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    80
                  ],
                  "text": "高在形内",
                  "size": 13,
                  "color": "corrA"
                }
              ]
            },
            {
              "label": "钝角三角形",
              "caption": "钝角三角形：从锐角顶点画高，垂足落在对边的延长线上——高跑到形外了。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      62
                    ],
                    [
                      68,
                      30
                    ],
                    [
                      96,
                      30
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    96,
                    30
                  ],
                  "b": [
                    30,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    40,
                    62
                  ],
                  "b": [
                    40,
                    30
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    40,
                    30
                  ],
                  "p": [
                    40,
                    62
                  ],
                  "q": [
                    96,
                    30
                  ],
                  "size": 5,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "高在形外！",
                  "size": 14.48,
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
        "还记得吗？上一页你亲手点亮过三条线：高、中线、角平分线。",
        "锐角三角形里：三条高都在形内——垂足落在边上。",
        "钝角三角形里：从锐角顶点画高，垂足落在对边的延长线上——高跑到形外去了。",
        "⚠️ 易错：“高一定在三角形里面”——错！钝角三角形的高可以在形外。",
        "中线和角平分线永远在形内——它们连的是边上的点，不用延长。",
        "记住一句话：高看垂直，中线看中点，角平分线看角。"
      ],
      "examples": [
        {
          "text": "认旧友：这三条线就是上一页你点亮过的那三条",
          "figure": "回链"
        }
      ],
      "prev": "g03-u1-l2-p3",
      "next": "g03-u1-l3-p1"
    }
  ]
};
