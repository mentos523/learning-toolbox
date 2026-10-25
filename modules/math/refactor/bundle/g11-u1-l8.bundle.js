window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l8"] = {
  "lessonId": "g11-u1-l8",
  "lessonTitle": "锥体体积",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l8-p1",
      "title": "沙漏实验：三杯沙",
      "concept": "锥体体积是等底等高柱体的三分之一",
      "formulas": [
        {
          "id": "f1",
          "latex": "V_{\\text{锥}} = \\frac{1}{3} V_{\\text{柱}}",
          "translation": "等底等高的锥体体积是柱体体积的三分之一"
        },
        {
          "id": "f2",
          "latex": "\\frac{2}{3}",
          "translation": "两杯沙占柱体体积的三分之二"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：一个空圆柱，和一个等底等高的圆锥装满沙。",
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
                  "t": "txt",
                  "p": [
                    50,
                    22
                  ],
                  "text": "空圆柱",
                  "size": 13
                },
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
                      50,
                      70
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "fill": "corrA",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "一满杯锥体沙（等底等高）",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：第一杯沙倒进圆柱——只占三分之一。",
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
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      56.7
                    ],
                    [
                      70,
                      56.7
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
                  "width": 1.5,
                  "fill": "corrA",
                  "opacity": 0.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "1/3",
                  "size": 14.48,
                  "math": true
                }
              ]
            },
            {
              "caption": "第 3 步：第二杯沙——占到三分之二。",
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
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      43.3
                    ],
                    [
                      70,
                      43.3
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
                  "width": 1.5,
                  "fill": "corrA",
                  "opacity": 0.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "2/3",
                  "size": 14.48,
                  "math": true
                }
              ]
            },
            {
              "caption": "第 4 步：第三杯沙——圆柱恰好装满！V锥 = V柱÷3。",
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
                  "color": "target",
                  "width": 2.5,
                  "fill": "target",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "第 3 杯：满了！V锥=V柱÷3",
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
        "点播放：三杯锥体沙，恰好装满一个等底等高的柱体。",
        "变的是：沙的杯数；没变的是：每杯一样多——三杯=一柱。",
        "前提：等底等高——底和高都一样，才能这么比。"
      ],
      "examples": [
        {
          "text": "沙漏：上面的沙漏完，正好是下面的体积",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l7-p5",
      "next": "g11-u1-l8-p2"
    },
    {
      "id": "g11-u1-l8-p2",
      "title": "锥体体积公式",
      "concept": "锥体体积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "V = \\frac{S \\times h}{3}",
          "translation": "锥体体积等于底面积乘高除以 3"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "圆锥、棱锥都一样：V = Sh÷3——柱体体积砍成三份。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      55
                    ],
                    [
                      45,
                      55
                    ],
                    [
                      32.5,
                      30
                    ]
                  ],
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      55
                    ],
                    [
                      80,
                      55
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      55,
                      30
                    ]
                  ],
                  "color": "corrB",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    32,
                    66
                  ],
                  "text": "圆锥",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    66
                  ],
                  "text": "棱锥",
                  "size": 12,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "V = Sh ÷ 3",
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
        "还记得吗？三杯沙装满一柱——锥体体积 = 柱体体积 ÷ 3。",
        "锥体体积 = Sh÷3：底面积乘高，再除以 3——圆锥、棱锥都一样。",
        "生活例：冰淇淋蛋筒（圆锥）装冰淇淋。图形例：底面积 12、高 5 的棱锥，V=12×5÷3=20。",
        "反例：底和高不一样的锥和柱——不能直接除以 3，“等底等高”是前提。",
        "⚠️ 别搞混：除以 3 是锥体的专属——柱体不用除，球体有自己的公式。",
        "记住一句话：锥体体积，底面积乘高除以 3。"
      ],
      "examples": [
        {
          "text": "金字塔：方锥体，V=Sh/3",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l8-p1",
      "next": "g11-u1-l8-p3"
    },
    {
      "id": "g11-u1-l8-p3",
      "title": "算一算锥体体积",
      "concept": "锥体体积计算",
      "formulas": [
        {
          "id": "f1",
          "latex": "V = \\frac{\\pi \\times 3^2 \\times 4}{3} = 12\\pi",
          "translation": "底面半径 3、高 4 的圆锥体积是 12π"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "例题：圆锥 r=3cm、h=4cm——底面积=9π，体积=9π×4÷3=12π cm³。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      65
                    ],
                    [
                      70,
                      65
                    ],
                    [
                      50,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    65
                  ],
                  "b": [
                    70,
                    65
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
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
                    72
                  ],
                  "text": "r=3",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    47
                  ],
                  "text": "h=4",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "V = 12π",
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
        "例题：圆锥 r=3cm、h=4cm——底面积=9π，体积=9π×4÷3=12π cm³。",
        "自查：底面积算对了吗（πr²）？除以 3 了吗？",
        "下一课：最“圆”的立体——球的表面积和体积。"
      ],
      "examples": [
        {
          "text": "蛋筒：r=3cm,h=10cm 能装多少冰淇淋",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l8-p2",
      "next": "g11-u1-l9-p1"
    }
  ]
};
