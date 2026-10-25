window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g05-u1-l7"] = {
  "lessonId": "g05-u1-l7",
  "lessonTitle": "勾股数",
  "chapterId": "g05",
  "pages": [
    {
      "id": "g05-u1-l7-p1",
      "title": "整数边直角三角形家族",
      "concept": "勾股数",
      "formulas": [
        {
          "id": "f1",
          "latex": "3^2 + 4^2 = 5^2",
          "translation": "3 的平方加 4 的平方等于 5 的平方：最小的勾股数"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "base": [
            {
              "t": "txt",
              "p": [
                50,
                90
              ],
              "text": "点成员，看它属于哪个家族",
              "size": 14.48
            }
          ],
          "groups": [
            {
              "name": "3-4-5 家族",
              "color": "corrA"
            },
            {
              "name": "5-12-13 家族",
              "color": "corrB"
            },
            {
              "name": "更多本原勾股数",
              "color": "corrC"
            }
          ],
          "items": [
            {
              "id": "t1",
              "label": "3-4-5",
              "group": 0,
              "anchor": [
                20,
                72
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    8,
                    80
                  ],
                  [
                    32,
                    80
                  ],
                  [
                    8,
                    60
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "t2",
              "label": "6-8-10",
              "group": 0,
              "anchor": [
                60,
                72
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    48,
                    80
                  ],
                  [
                    72,
                    80
                  ],
                  [
                    48,
                    60
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "t3",
              "label": "5-12-13",
              "group": 1,
              "anchor": [
                20,
                45
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    8,
                    53
                  ],
                  [
                    32,
                    53
                  ],
                  [
                    8,
                    33
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            },
            {
              "id": "t4",
              "label": "10-24-26",
              "group": 1,
              "anchor": [
                60,
                45
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    48,
                    53
                  ],
                  [
                    72,
                    53
                  ],
                  [
                    48,
                    33
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            },
            {
              "id": "t5",
              "label": "8-15-17",
              "group": 2,
              "anchor": [
                20,
                18
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    8,
                    26
                  ],
                  [
                    32,
                    26
                  ],
                  [
                    8,
                    6
                  ]
                ],
                "color": "corrC",
                "width": 2.5
              }
            },
            {
              "id": "t6",
              "label": "20-21-29",
              "group": 2,
              "anchor": [
                60,
                18
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    48,
                    26
                  ],
                  [
                    72,
                    26
                  ],
                  [
                    48,
                    6
                  ]
                ],
                "color": "corrC",
                "width": 2.5
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点三角形：3-4-5 和 6-8-10 是一家（2 倍关系）；5-12-13 和 10-24-26 是一家；8-15-17 和 20-21-29 都是本原勾股数，彼此没有倍数关系。",
        "本原勾股数 = 不能从别的勾股数放大缩小得到，比如 8-15-17、20-21-29。",
        "勾股数 = 三边都是整数的直角三角形——最出名的是 3-4-5。",
        "记住 3-4-5、5-12-13、8-15-17——考试和生活里最常见。"
      ],
      "examples": [
        {
          "text": "3-4-5 墨斗、5-12-13 房梁",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l6-p2",
      "next": "g05-u1-l7-p2"
    },
    {
      "id": "g05-u1-l7-p2",
      "title": "√2：画出来的数",
      "concept": "√2 的几何意义（H13）",
      "formulas": [
        {
          "id": "f1",
          "latex": "c = \\sqrt{1^2 + 1^2} = \\sqrt{2}",
          "translation": "c 等于根号下 1 的平方加 1 的平方，等于根号 2"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：边长 1 的正方形，连一条对角线——得到等腰直角三角形。",
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
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    70,
                    70
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    25
                  ],
                  "text": "1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    24,
                    50
                  ],
                  "text": "1",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：用勾股定理算：c²=1²+1²=2，所以 c=√2——'画出来'之后跟一步'算出来'。",
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
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    70,
                    70
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    56
                  ],
                  "text": "c",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "c²=1²+1²=2，c=√2",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：√2 不是算出来的，是画出来的——它就住在正方形的对角线上。",
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
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    30
                  ],
                  "b": [
                    70,
                    70
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "√2 就住在正方形的对角线上",
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
        "画出来：边长 1 的正方形，对角线一连，等腰直角三角形出现了。",
        "算出来：c²=1²+1²=2，所以 c=√2——计算只要一行，但必须有。",
        "H13：代数 0.1.3 的无理数 √2，在几何里找到了家——'无限不循环'的数，也是一条看得见的线段。"
      ],
      "examples": [
        {
          "text": "回看代数 0.1.3：无理数 √2",
          "figure": "回链"
        }
      ],
      "prev": "g05-u1-l7-p1",
      "next": "g05-u1-l7-p3"
    },
    {
      "id": "g05-u1-l7-p3",
      "title": "勾股数：边边皆整数",
      "concept": "勾股数",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{勾股数} = \\text{三边都是整数的直角三角形}",
          "translation": "勾股数就是三条边都是整数的直角三角形"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "是勾股数：3-4-5",
              "caption": "3-4-5：三边都是整数，又是直角三角形——勾股数。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      66,
                      30
                    ],
                    [
                      30,
                      66
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    30
                  ],
                  "p": [
                    66,
                    30
                  ],
                  "q": [
                    30,
                    66
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    48,
                    24
                  ],
                  "text": "4",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    24,
                    48
                  ],
                  "text": "3",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    52
                  ],
                  "text": "5",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "3²+4²=5²，三边整数 ✓",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "label": "不是勾股数：1-1-√2",
              "caption": "1-1-√2：也满足 a²+b²=c²，但 √2 不是整数——不是勾股数。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      66,
                      30
                    ],
                    [
                      30,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    30
                  ],
                  "p": [
                    66,
                    30
                  ],
                  "q": [
                    30,
                    66
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    48,
                    24
                  ],
                  "text": "1",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    24,
                    48
                  ],
                  "text": "1",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    52
                  ],
                  "text": "√2",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "√2 不是整数 ✗",
                  "size": 13,
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
        "还记得吗？你点的 3-4-5、5-12-13、8-15-17——三条边都是整数，这就是勾股数。",
        "勾股数：三条边都是整数的直角三角形——“整数”和“直角”两个条件，缺一不可。",
        "生活例：木工的 3-4-5 墨斗——3 米、4 米、5 米一拉，直角就出来了。",
        "图形例：6-8-10 是 3-4-5 的 2 倍——同一家族，放大缩小还是勾股数。",
        "反例：边长 1、1、√2 的等腰直角三角形——也满足 a²+b²=c²，但 √2 不是整数，所以它不是勾股数。",
        "⚠️ 别搞混：a²+b²=c² 成立 ≠ 勾股数——勾股数还要求三条边都是整数。",
        "⚠️ 别搞混 2：2-3-4 看着像，2²+3²=13≠16——得验算，不能看长得像。",
        "记住一句话：勾股数，边边皆整数。"
      ],
      "examples": [
        {
          "text": "记住三组：3-4-5、5-12-13、8-15-17",
          "figure": "方法"
        }
      ],
      "prev": "g05-u1-l7-p2",
      "next": "g05-u1-l8-p1"
    }
  ]
};
