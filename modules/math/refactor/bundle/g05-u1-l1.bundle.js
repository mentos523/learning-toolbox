window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g05-u1-l1"] = {
  "lessonId": "g05-u1-l1",
  "lessonTitle": "发现：方格纸上的秘密",
  "chapterId": "g05",
  "pages": [
    {
      "id": "g05-u1-l1-p1",
      "title": "方格纸上数格子",
      "concept": "勾股猜想的发现",
      "formulas": [
        {
          "id": "f1",
          "latex": "3^2 + 4^2 = 5^2",
          "translation": "3 的平方加 4 的平方等于 5 的平方"
        },
        {
          "id": "f2",
          "latex": "9 + 16 = 25",
          "translation": "9 加 16 等于 25"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：数两条直角边上的正方形——3×3=9 格，4×4=16 格。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      30,
                      51
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
                    58,
                    30
                  ],
                  "q": [
                    30,
                    51
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      58,
                      4
                    ],
                    [
                      30,
                      4
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    17
                  ],
                  "text": "16 格",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      30,
                      51
                    ],
                    [
                      9,
                      51
                    ],
                    [
                      9,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    19,
                    40
                  ],
                  "text": "9 格",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：数斜边上的正方形——斜着也能数：整格加半格拼一拼，一共 25 格。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      30,
                      51
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      58,
                      4
                    ],
                    [
                      30,
                      4
                    ]
                  ],
                  "color": "line",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    17
                  ],
                  "text": "16 格",
                  "size": 12
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      30,
                      51
                    ],
                    [
                      9,
                      51
                    ],
                    [
                      9,
                      30
                    ]
                  ],
                  "color": "line",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    19,
                    40
                  ],
                  "text": "9 格",
                  "size": 12
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      30
                    ],
                    [
                      30,
                      51
                    ],
                    [
                      51,
                      79
                    ],
                    [
                      79,
                      58
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    54
                  ],
                  "text": "25 格",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：9+16=25——两个小正方形的格子加起来，正好等于大正方形。这是巧合吗？",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      30,
                      51
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      58,
                      4
                    ],
                    [
                      30,
                      4
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    17
                  ],
                  "text": "16 格",
                  "size": 12
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      30,
                      51
                    ],
                    [
                      9,
                      51
                    ],
                    [
                      9,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    19,
                    40
                  ],
                  "text": "9 格",
                  "size": 12
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      30
                    ],
                    [
                      30,
                      51
                    ],
                    [
                      51,
                      79
                    ],
                    [
                      79,
                      58
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    54
                  ],
                  "text": "25 格",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "9 + 16 = 25",
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
        "先描出直角三角形：两条直角边 3 格、4 格，斜边 5 格。",
        "数格子：直角边上的正方形是 9 格和 16 格；斜边上的斜着数，整格加半格拼，一共 25 格。",
        "9+16=25——两小块正好填满大块。换个三角形还成立吗？下一页试试。"
      ],
      "examples": [
        {
          "text": "装修时数地砖：数砖块就能算面积",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g05-u1-l1-p2"
    },
    {
      "id": "g05-u1-l1-p2",
      "title": "正方形在生长",
      "concept": "a²+b²=c² 的猜想",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^2 + b^2 = c^2",
          "translation": "a 的平方加 b 的平方等于 c 的平方：两小正方形面积和等于大正方形面积"
        }
      ],
      "interaction": {
        "type": "pythag-grow",
        "params": {
          "aMin": 1,
          "aMax": 6,
          "bMin": 1,
          "bMax": 6,
          "aInit": 3,
          "bInit": 4,
          "lockRight": true,
          "showAreas": true,
          "badge": "直角三角形中，两小块面积和=大块面积"
        }
      },
      "auxInteraction": null,
      "hints": [
        "三组数都成立：3-4-5、5-12-13、任意 a-b-c——直角三角形里，两小块面积和永远等于大块。",
        "徽章条件式：直角三角形中，两小块面积和 = 大块面积——'直角'这个条件不能丢。",
        "这还只是猜想（看起来对），下一课我们来证明它真的永远对。"
      ],
      "examples": [
        {
          "text": "篮球场对角线：长 28 米宽 15 米，对角线约 31.8 米",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l1-p1",
      "next": "g05-u1-l1-p3"
    },
    {
      "id": "g05-u1-l1-p3",
      "title": "猜想：a²+b²=c²",
      "concept": "勾股定理（猜想阶段）",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^2 + b^2 = c^2",
          "translation": "直角三角形两直角边的平方和等于斜边的平方"
        },
        {
          "id": "f2",
          "latex": "\\text{勾}^2 + \\text{股}^2 = \\text{弦}^2",
          "translation": "勾的平方加股的平方等于弦的平方：短直角边、长直角边、斜边"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "直角三角形：成立",
              "caption": "直角三角形：9+16=25——有直角，规律成立。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      58,
                      30
                    ],
                    [
                      30,
                      51
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    30
                  ],
                  "p": [
                    58,
                    30
                  ],
                  "q": [
                    30,
                    51
                  ],
                  "size": 7,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "9 + 16 = 25  ✓",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "不是直角：不成立",
              "caption": "等边三角形：4+4=8，不等于 4——没有直角，规律立刻失效。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      28
                    ],
                    [
                      60,
                      28
                    ],
                    [
                      45,
                      54
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "4 + 4 = 8 ≠ 4  ✗",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    60
                  ],
                  "text": "边长都是 2",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？你数了格子、看了正方形生长——直角三角形里，两小块面积加起来永远等于大块。",
        "a² 不是'字母的平方'，是'边长为 a 的正方形的面积'——公式背后站着一个图形。",
        "生活例：房间长 3 米、宽 4 米，装修师傅量对角线是不是 5 米，就知道墙角直不直。",
        "反例：等边三角形边长都是 2，4+4=8≠4——'直角'这个条件丢了，规律立刻失效。",
        "⚠️ 别搞混：c 必须是斜边——最长的那条、对着直角的那条。把直角边当成 c，算出来全错。",
        "记住一句话：勾²加股²等于弦²——勾是短直角边，股是长直角边，弦是斜边。"
      ],
      "examples": [
        {
          "text": "木工验墙角：3-4-5 尺",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l1-p2",
      "next": "g05-u1-l2-p0"
    }
  ]
};
