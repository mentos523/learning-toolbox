window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g00-u1-l4"] = {
  "lessonId": "g00-u1-l4",
  "lessonTitle": "几何与代数的握手",
  "chapterId": "g00",
  "pages": [
    {
      "id": "g00-u1-l4-p1",
      "title": "同一个 x²，两种样子",
      "concept": "数形结合",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2",
          "translation": "x 的平方：x 乘以自己，也是正方形的面积"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "代数的样子",
              "caption": "代数说：x² 就是 x 乘以自己——这是“数”的语言。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    56
                  ],
                  "text": "x²",
                  "size": 22.86,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    34
                  ],
                  "text": "x 乘以自己",
                  "size": 14.48
                }
              ]
            },
            {
              "label": "几何的样子",
              "caption": "几何说：x² 是边长为 x 的正方形的面积——这是“形”的语言。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      35,
                      35
                    ],
                    [
                      65,
                      35
                    ],
                    [
                      65,
                      65
                    ],
                    [
                      35,
                      65
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    27
                  ],
                  "text": "x",
                  "size": 14.48,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    27,
                    50
                  ],
                  "text": "x",
                  "size": 14.48,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "面积 = x²",
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
        "x² 你在代数里见过：x 乘以自己。",
        "点“几何的样子”：画一个正方形，边长是 x，它的面积就是 x²。",
        "同一个 x²，代数读成“乘法”，几何看成“正方形”——这就是数形结合。",
        "预告：以后你会看到，每个公式背后都站着一个图形。"
      ],
      "examples": [
        {
          "text": "x=3 时：代数算 3×3=9，几何看边长 3 的正方形",
          "figure": "数形"
        }
      ],
      "prev": "g00-u1-l3-p3",
      "next": "g00-u1-l4-p2"
    },
    {
      "id": "g00-u1-l4-p2",
      "title": "把未知数画成一条线段",
      "concept": "线段表示未知数",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 5 = 12",
          "translation": "一段 x 加一段 5，等于全长 12"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：全长是 12（已知）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    50
                  ],
                  "b": [
                    85,
                    50
                  ],
                  "color": "line",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    64
                  ],
                  "text": "12",
                  "size": 15,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：一段是 5，另一段不知道——叫它 x。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    50
                  ],
                  "b": [
                    50,
                    50
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    85,
                    50
                  ],
                  "color": "known",
                  "width": 4
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "r": 3,
                  "color": "line"
                },
                {
                  "t": "txt",
                  "p": [
                    32,
                    64
                  ],
                  "text": "x",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    32,
                    38
                  ],
                  "text": "?",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    64
                  ],
                  "text": "5",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：12−5=7，这段 x 长 7。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    50
                  ],
                  "b": [
                    50,
                    50
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    85,
                    50
                  ],
                  "color": "known",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    32,
                    64
                  ],
                  "text": "x = 7",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    64
                  ],
                  "text": "5",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 4 步：未知数 x，就是这条线段的长度——数，变成了形。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    56
                  ],
                  "text": "x = 7",
                  "size": 26,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    36
                  ],
                  "text": "未知数是一条线段的长度",
                  "size": 14.48
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得代数导论第 1 页的猜数字吗？x+5=12，x 是几？",
        "把它画出来：全长 12 的线段，一段是 5，另一段是 x。",
        "x 这段有多长？12−5=7——线段自己“说”出了答案。",
        "这就是数与形的第一次握手：未知数不再只是字母，它是一条线段。"
      ],
      "examples": [
        {
          "text": "回看代数导论第 1 页：猜数字 x+5=12",
          "figure": "回链"
        }
      ],
      "prev": "g00-u1-l4-p1",
      "next": "g00-u1-l4-p3"
    },
    {
      "id": "g00-u1-l4-p3",
      "title": "导论小测：5 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{几何} = \\text{形状、大小、位置}",
          "translation": "几何研究形状、大小、位置"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "面",
              "color": "corrA"
            },
            {
              "name": "体",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "e1",
              "label": "湖面",
              "group": 0,
              "anchor": [
                27,
                53
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    12,
                    62
                  ],
                  [
                    42,
                    62
                  ],
                  [
                    42,
                    44
                  ],
                  [
                    12,
                    44
                  ]
                ],
                "color": "corrA",
                "width": 2,
                "fill": "corrA",
                "opacity": 0.3
              }
            },
            {
              "id": "e2",
              "label": "桌面",
              "group": 0,
              "anchor": [
                71,
                53
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    55,
                    62
                  ],
                  [
                    88,
                    62
                  ],
                  [
                    88,
                    44
                  ],
                  [
                    55,
                    44
                  ]
                ],
                "color": "corrA",
                "width": 2,
                "fill": "corrA",
                "opacity": 0.3
              }
            },
            {
              "id": "e3",
              "label": "纸箱",
              "group": 1,
              "anchor": [
                26,
                24
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    12,
                    30
                  ],
                  [
                    32,
                    30
                  ],
                  [
                    32,
                    12
                  ],
                  [
                    12,
                    12
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            },
            {
              "id": "e4",
              "label": "足球",
              "group": 1,
              "anchor": [
                70,
                24
              ],
              "shape": {
                "t": "circle",
                "c": [
                  70,
                  24
                ],
                "r": 10,
                "color": "corrB",
                "width": 2.5
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一点：把 4 样东西送进“面”或“体”的篮子。",
        "1．几何研究什么？（形状、大小、位置）",
        "2．点动成什么？线动成什么？面动成什么？",
        "3．三角形三个角拼到一起是多少度？",
        "4．x² 在几何里长什么样？"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：面—湖面/桌面，体—纸箱/足球；1．形状、大小、位置；2．线、面、体；3．180°；4．边长 x 的正方形"
        },
        {
          "figure": "错因解析",
          "text": "认图：“面”是平的、“体”占空间——湖面/桌面是面，纸箱/足球是体。1．几何三问：研究形状、大小、位置。2．点动成线、线动成面、面动成体——维度逐级长大。3．三角形三内角拼成平角：180°。4．x²=边长 x 的正方形面积——代数式在几何里有“长相”。"
        }
      ],
      "prev": "g00-u1-l4-p2",
      "next": null
    }
  ]
};
