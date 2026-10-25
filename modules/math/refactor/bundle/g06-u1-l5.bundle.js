window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g06-u1-l5"] = {
  "lessonId": "g06-u1-l5",
  "lessonTitle": "正方形",
  "chapterId": "g06",
  "pages": [
    {
      "id": "g06-u1-l5-p1",
      "title": "家族谱系：多了什么条件",
      "concept": "四边形家族谱系",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{正方形} = \\text{矩形} + \\text{菱形}",
          "translation": "正方形既是矩形又是菱形：四个角是直角，四条边相等"
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
                86
              ],
              "text": "四边形",
              "size": 15,
              "bold": true
            },
            {
              "t": "seg",
              "a": [
                50,
                80
              ],
              "b": [
                50,
                70
              ],
              "color": "aux",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                50,
                58
              ],
              "b": [
                28,
                50
              ],
              "color": "aux",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                50,
                58
              ],
              "b": [
                72,
                50
              ],
              "color": "aux",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                24,
                38
              ],
              "b": [
                40,
                30
              ],
              "color": "aux",
              "width": 2
            },
            {
              "t": "seg",
              "a": [
                76,
                38
              ],
              "b": [
                60,
                30
              ],
              "color": "aux",
              "width": 2
            }
          ],
          "groups": [
            {
              "name": "先加平行条件",
              "color": "corrA"
            },
            {
              "name": "再加直角或等边",
              "color": "corrB"
            },
            {
              "name": "两者兼得",
              "color": "corrC"
            }
          ],
          "items": [
            {
              "id": "n1",
              "label": "平行四边形：多了“两组对边平行”",
              "group": 0,
              "anchor": [
                50,
                64
              ],
              "shape": {
                "t": "txt",
                "p": [
                  50,
                  64
                ],
                "text": "平行四边形",
                "size": 14.48,
                "bold": true
              }
            },
            {
              "id": "n2",
              "label": "矩形：多了“一个角是直角”",
              "group": 1,
              "anchor": [
                24,
                44
              ],
              "shape": {
                "t": "txt",
                "p": [
                  24,
                  44
                ],
                "text": "矩形",
                "size": 14.48,
                "bold": true
              }
            },
            {
              "id": "n3",
              "label": "菱形：多了“一组邻边相等”",
              "group": 1,
              "anchor": [
                76,
                44
              ],
              "shape": {
                "t": "txt",
                "p": [
                  76,
                  44
                ],
                "text": "菱形",
                "size": 14.48,
                "bold": true
              }
            },
            {
              "id": "n4",
              "label": "正方形：直角和等边兼得",
              "group": 2,
              "anchor": [
                50,
                24
              ],
              "shape": {
                "t": "txt",
                "p": [
                  50,
                  24
                ],
                "text": "正方形",
                "size": 14.48,
                "bold": true
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一点：家族里的每个成员，看看它比上一代“多了什么条件”。",
        "四边形 → 加两组对边平行 → 平行四边形 → 加一个直角 → 矩形 / 加邻边相等 → 菱形。",
        "矩形 + 邻边相等 = 正方形；菱形 + 一个直角 = 正方形——两条路都通。"
      ],
      "examples": [
        {
          "text": "从一般到特殊：条件越加越多，图形越来越“方”",
          "figure": "谱系"
        }
      ],
      "prev": "g06-u1-l4-p4",
      "next": "g06-u1-l5-p2"
    },
    {
      "id": "g06-u1-l5-p2",
      "title": "正方形：两家本事全有",
      "concept": "正方形的性质",
      "formulas": [
        {
          "id": "f1",
          "latex": "AC = BD, AC \\perp BD",
          "translation": "正方形的对角线：相等、互相垂直平分"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：对角线等长刻度 + 交点直角方块——矩形和菱形的本事集于一身。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      32
                    ],
                    [
                      70,
                      32
                    ],
                    [
                      70,
                      72
                    ],
                    [
                      30,
                      72
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    32
                  ],
                  "b": [
                    70,
                    72
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    32
                  ],
                  "b": [
                    30,
                    72
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    32
                  ],
                  "b": [
                    70,
                    72
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    32
                  ],
                  "b": [
                    30,
                    72
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    52
                  ],
                  "p": [
                    70,
                    72
                  ],
                  "q": [
                    70,
                    32
                  ],
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "相等 + 垂直平分",
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
        "人话：正方形是矩形和菱形的“孩子”——两家的本事它全有。",
        "从矩形那儿继承：四个角是直角，对角线相等；从菱形那儿继承：四条边相等，对角线垂直。",
        "生活例：地砖、魔方的一个面；图形例：对角线又等长又有直角标记。",
        "反例：长方形（长≠宽）——是矩形但邻边不相等，不是正方形；一般的菱形——角不是直角，不是正方形。",
        "⚠️ 别搞混：正方形一定是矩形、一定是菱形；反过来不行——“是”的方向别说反。",
        "记住一句话：正方形 = 矩形 + 菱形，对角线相等且垂直平分。"
      ],
      "examples": [
        {
          "text": "正方形判定速查：矩形+邻边相等，或菱形+一个直角",
          "figure": "方法"
        }
      ],
      "prev": "g06-u1-l5-p1",
      "next": "g06-u1-l6-p1"
    }
  ]
};
