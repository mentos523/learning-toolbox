window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l6"] = {
  "lessonId": "g11-u1-l6",
  "lessonTitle": "弧长与扇形面积",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l6-p1",
      "title": "圆心角越大，扇形越大",
      "concept": "弧长与扇形面积跟圆心角成正比",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{n}{360}",
          "translation": "圆心角是 n 度，扇形就占整个圆的 n 比 360"
        },
        {
          "id": "f2",
          "latex": "\\frac{60}{360}=\\frac{1}{6}",
          "translation": "n=60°：扇形占圆的 60 比 360，约成六分之一"
        },
        {
          "id": "f3",
          "latex": "\\frac{120}{360}=\\frac{1}{3}",
          "translation": "n=120°：扇形占圆的 120 比 360，约成三分之一"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "n=60°：扇形占圆的六分之一。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 28,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      50
                    ],
                    [
                      50,
                      78
                    ],
                    [
                      74.2,
                      64
                    ]
                  ],
                  "color": "target",
                  "width": 2,
                  "fill": "target",
                  "opacity": 0.25
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "60/360=1/6",
                  "size": 13,
                  "math": true
                }
              ]
            },
            {
              "caption": "n=120°：扇形占圆的三分之一。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 28,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      50
                    ],
                    [
                      50,
                      78
                    ],
                    [
                      74.2,
                      36
                    ]
                  ],
                  "color": "target",
                  "width": 2,
                  "fill": "target",
                  "opacity": 0.25
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "120/360=1/3",
                  "size": 13,
                  "math": true
                }
              ]
            },
            {
              "caption": "n=180°：占一半——半圆。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 28,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      50
                    ],
                    [
                      50,
                      78
                    ],
                    [
                      50,
                      22
                    ],
                    [
                      78,
                      50
                    ]
                  ],
                  "color": "target",
                  "width": 2,
                  "fill": "target",
                  "opacity": 0.25
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "n=180°，占一半",
                  "size": 13
                }
              ]
            },
            {
              "caption": "n=360°：占全部——整个圆。弧长和扇形面积都跟 n 成正比。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 28,
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.25
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "n=360°，占全部",
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
        "一步步点：圆心角 n 从 60° 长到 360°，扇形“吃掉”圆的比例 = n/360。",
        "变的是：n 和扇形大小；没变的是：比例关系——弧长和面积都跟 n 成正比。",
        "n 是“几份”：把圆 360 等份，取其中 n 份。"
      ],
      "examples": [
        {
          "text": "披萨切 6 块：每块圆心角 60°",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l5-p4",
      "next": "g11-u1-l6-p2"
    },
    {
      "id": "g11-u1-l6-p2",
      "title": "弧长公式",
      "concept": "弧长公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "l = \\frac{n \\pi r}{180}",
          "translation": "弧长等于 n 乘 π 乘 r 除以 180"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "弧长 = 圆周长 × n/360 = 2πr×n/360 = nπr/180。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 28,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      50
                    ],
                    [
                      50,
                      78
                    ],
                    [
                      74.2,
                      64
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    74.2,
                    64
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    52
                  ],
                  "text": "r",
                  "size": 13,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "n",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "弧长 l = nπr/180",
                  "size": 15,
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
        "还记得吗？n 度的弧占整个圆的 n/360——圆周长是 2πr。",
        "弧长 = 2πr × n/360 = nπr/180：圆周长按比例切 n 份。",
        "生活例：半径 10m 的圆形花坛，走 90° 的弧，路程=90×π×10÷180=5π≈15.7m。",
        "图形例：n=180，弧长=πr（半圆周）。",
        "反例：n 用的是“度数”——v1.0 不讲弧度制，别混进来。",
        "⚠️ 别搞混：分母 180 不是 360——因为 2πr×n/360 化简后 2 和 360 约掉了。",
        "记住一句话：弧长，nπr 除以 180。"
      ],
      "examples": [
        {
          "text": "n=90,r=4：弧长=2π",
          "figure": "算式"
        }
      ],
      "prev": "g11-u1-l6-p1",
      "next": "g11-u1-l6-p3"
    },
    {
      "id": "g11-u1-l6-p3",
      "title": "扇形面积公式",
      "concept": "扇形面积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = \\frac{n \\pi r^2}{360}",
          "translation": "扇形面积等于 n 乘 π 乘 r 的平方除以 360"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "扇形面积 = 圆面积 × n/360 = πr²×n/360 = nπr²/360。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 28,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      50
                    ],
                    [
                      50,
                      78
                    ],
                    [
                      74.2,
                      64
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "fill": "corrA",
                  "opacity": 0.25
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    74.2,
                    64
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    52
                  ],
                  "text": "r",
                  "size": 13,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "n",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "S = nπr²/360",
                  "size": 15,
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
        "同样套路：n 度的扇形占整个圆的 n/360——圆面积是 πr²。",
        "扇形面积 = πr² × n/360 = nπr²/360：圆面积按比例切 n 份。",
        "生活例：披萨切 6 块，每块是 n=60° 的扇形。图形例：n=90、r=4，面积=90×π×16÷360=4π。",
        "反例：别把弧长公式的分母 180 搬过来——面积的分母是 360。",
        "⚠️ 别搞混：弧长是“线”（分母 180），扇形是“面”（分母 360）——量纲不同，公式不同。",
        "记住一句话：扇形面积，nπr² 除以 360。"
      ],
      "examples": [
        {
          "text": "n=60,r=6：面积=6π",
          "figure": "算式"
        }
      ],
      "prev": "g11-u1-l6-p2",
      "next": "g11-u1-l6-p4"
    },
    {
      "id": "g11-u1-l6-p4",
      "title": "算一算弧长和扇形",
      "concept": "弧长与扇形面积计算",
      "formulas": [
        {
          "id": "f1",
          "latex": "l = 2\\pi, S = 4\\pi",
          "translation": "n=90°、r=4：弧长 2π，扇形面积 4π"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "例题：n=90°、r=4cm——弧长=2π，扇形面积=4π。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 28,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      50
                    ],
                    [
                      50,
                      78
                    ],
                    [
                      78,
                      50
                    ]
                  ],
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    78,
                    50
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    42
                  ],
                  "text": "r=4",
                  "size": 13,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    62
                  ],
                  "text": "n=90°",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "l=2π，S=4π",
                  "size": 15,
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
        "例题：n=90°、r=4cm——弧长=90×π×4÷180=2π；扇形面积=90×π×16÷360=4π。",
        "自查：n 是度数吗？r 是半径吗？分母没拿错吗？",
        "下一课：从平面到立体——柱体的表面积和体积。"
      ],
      "examples": [
        {
          "text": "钟表分针：走 15 分钟扫过 90°",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l6-p3",
      "next": "g11-u1-l7-p1"
    }
  ]
};
