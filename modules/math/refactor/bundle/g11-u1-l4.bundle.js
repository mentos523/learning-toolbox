window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l4"] = {
  "lessonId": "g11-u1-l4",
  "lessonTitle": "梯形面积",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l4-p1",
      "title": "两个梯形拼一拼",
      "concept": "梯形面积是平行四边形的一半",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{两个全等梯形} \\Rightarrow \\text{平行四边形}",
          "translation": "两个完全一样的梯形能拼成一个平行四边形"
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
                  10
                ],
                [
                  48,
                  10
                ],
                [
                  38,
                  50
                ],
                [
                  18,
                  50
                ]
              ]
            },
            {
              "id": "t2",
              "label": "②",
              "pts": [
                [
                  48,
                  50
                ],
                [
                  8,
                  50
                ],
                [
                  18,
                  10
                ],
                [
                  38,
                  10
                ]
              ]
            }
          ],
          "targets": [
            {
              "id": "t1",
              "pts": [
                [
                  25,
                  30
                ],
                [
                  65,
                  30
                ],
                [
                  55,
                  70
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
                  95,
                  70
                ],
                [
                  55,
                  70
                ],
                [
                  65,
                  30
                ],
                [
                  85,
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
        "把两个一模一样的梯形拖进虚线轮廓——拼成了一个平行四边形。",
        "拼成的平行四边形：底 = 上底 + 下底，高 = 梯形的高。",
        "梯形只占一半——公式里又有“除以 2”。"
      ],
      "examples": [
        {
          "text": "水渠横截面：两个拼成一个平行四边形",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l3-p4",
      "next": "g11-u1-l4-p2"
    },
    {
      "id": "g11-u1-l4-p2",
      "title": "梯形面积公式",
      "concept": "梯形面积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = \\frac{(a+b) \\times h}{2}",
          "translation": "梯形面积等于上底加下底的和乘高除以 2"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "梯形：上底 a、下底 b、高 h——两个拼成平行四边形，底是 a+b。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      35
                    ],
                    [
                      70,
                      35
                    ],
                    [
                      60,
                      65
                    ],
                    [
                      40,
                      65
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
                    28
                  ],
                  "text": "上底 a",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "下底 b",
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
                    84
                  ],
                  "text": "S = (a+b)h/2",
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
        "还记得吗？两个梯形拼成平行四边形——它的底是“上底+下底”，高是 h。",
        "梯形面积 =（上底 + 下底）× 高 ÷ 2：先把上下底加起来，再乘高，最后除以 2。",
        "生活例：水渠横截面是梯形，上底 3m、下底 5m、深 2m，面积=(3+5)×2÷2=8㎡。",
        "图形例：上底 2、下底 4、高 3，面积=9。",
        "反例：只加下底、忘了上底——公式里的 (a+b) 是“两底之和”，少一个不行。",
        "⚠️ 别搞混：梯形的“高”是两底之间的垂直距离，不是腰的长度——腰是斜的。",
        "记住一句话：梯形面积，两底之和乘高除以 2。"
      ],
      "examples": [
        {
          "text": "公式三种记法：(a+b)h/2，认一种就行",
          "figure": "算式"
        }
      ],
      "prev": "g11-u1-l4-p1",
      "next": "g11-u1-l4-p3"
    },
    {
      "id": "g11-u1-l4-p3",
      "title": "算一算梯形面积",
      "concept": "梯形面积计算",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = \\frac{(3+5) \\times 2}{2} = 8",
          "translation": "上底 3、下底 5、高 2 的梯形面积是 8"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "例题：水坝横截面——上底 3m、下底 5m、高 2m，面积 8㎡。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      40
                    ],
                    [
                      70,
                      40
                    ],
                    [
                      60,
                      65
                    ],
                    [
                      40,
                      65
                    ]
                  ],
                  "color": "known",
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
                    33
                  ],
                  "text": "上底 3",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "下底 5",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    52
                  ],
                  "text": "高 2",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "S = (3+5)×2÷2 = 8",
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
        "例题：水坝横截面，上底 3m、下底 5m、高 2m——面积=(3+5)×2÷2=8㎡。",
        "自查：两底都加了吗？高垂直吗？除以 2 了吗？",
        "下一课：圆的面积——剪成小扇形，拼成“长方形”。"
      ],
      "examples": [
        {
          "text": "梯子横截面、水坝：生活中找梯形",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l4-p2",
      "next": "g11-u1-l5-p1"
    }
  ]
};
