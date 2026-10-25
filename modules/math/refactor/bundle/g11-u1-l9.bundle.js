window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l9"] = {
  "lessonId": "g11-u1-l9",
  "lessonTitle": "球的表面积与体积",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l9-p1",
      "title": "橘子瓣拼球面",
      "concept": "球表面积的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_{\\text{球}} = 4\\pi r^2",
          "translation": "球的表面积等于 4 倍的大圆面积"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：一个球——像个大橘子。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 28,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "一个球",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：像切橘子一样，把球切成 8 瓣。",
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
                  "t": "seg",
                  "a": [
                    50,
                    22
                  ],
                  "b": [
                    50,
                    78
                  ],
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    22,
                    50
                  ],
                  "b": [
                    78,
                    50
                  ],
                  "color": "aux",
                  "width": 1.5
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
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    70
                  ],
                  "b": [
                    70,
                    30
                  ],
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "切成 8 瓣",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：取一瓣看它的“皮”——瓣越多，皮越接近平面。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 28,
                  "color": "line",
                  "width": 1.5,
                  "dash": "5,4"
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
                      69.8,
                      69.8
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
                    88
                  ],
                  "text": "一瓣的“皮”",
                  "size": 13,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：所有瓣的皮拼起来，差不多能铺满 4 个大圆——S=4πr²。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    20,
                    50
                  ],
                  "r": 13,
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    47,
                    50
                  ],
                  "r": 13,
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    74,
                    50
                  ],
                  "r": 13,
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    76
                  ],
                  "r": 13,
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "≈ 4 个大圆",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    94
                  ],
                  "text": "S = 4πr²",
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
        "点播放：球切成瓣，瓣的皮拼成 4 个大圆——球表面积 = 4πr²。",
        "这是“结论+直观”：严格证明要用到积分，我们先在图形上“看到”它。",
        "回填点：学完代数第十二章（定积分），回来补证明。"
      ],
      "examples": [
        {
          "text": "橘子：剥下的皮拼一拼",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l8-p3",
      "next": "g11-u1-l9-p2"
    },
    {
      "id": "g11-u1-l9-p2",
      "title": "球的表面积和体积",
      "concept": "球的表面积与体积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = 4\\pi r^2",
          "translation": "球表面积等于 4π 乘以半径的平方"
        },
        {
          "id": "f2",
          "latex": "V = \\frac{4}{3}\\pi r^3",
          "translation": "球体积等于三分之四 π 乘以半径的立方"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "球：表面积 S=4πr²（4 倍大圆），体积 V=4πr³/3——先记住、用熟，证明以后补。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    48
                  ],
                  "r": 26,
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    76,
                    48
                  ],
                  "color": "target",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    40
                  ],
                  "text": "r",
                  "size": 13,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "S=4πr²，V=4πr³/3",
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
        "还记得吗？球的皮≈4 个大圆——S=4πr²：4 倍的大圆面积。",
        "球体积 V=4πr³/3：三分之四 π 乘以半径的立方——先记住、用熟，证明以后补。",
        "生活例：足球、篮球算用料（表面积）、算容积（体积）。",
        "图形例：r=3，S=4π×9=36π，V=4π×27÷3=36π——数一样，单位不同！",
        "反例：r³ 是“立方”——别写成 r²，体积和面积量纲不同。",
        "⚠️ 别搞混：4πr²（面）和 4πr³/3（体）——一个 r²、一个 r³，抄公式时看清。",
        "回填点：严格推导要定积分——学完代数 ch12 回来，这里等你。",
        "记住一句话：球面四倍大圆，球体三分之四 πr³。"
      ],
      "examples": [
        {
          "text": "r=1 的球：S=4π，V=4π/3",
          "figure": "算式"
        }
      ],
      "prev": "g11-u1-l9-p1",
      "next": "g11-u1-l9-p3"
    },
    {
      "id": "g11-u1-l9-p3",
      "title": "算一算球的体积",
      "concept": "球体积计算",
      "formulas": [
        {
          "id": "f1",
          "latex": "V = \\frac{4}{3}\\pi \\times 2^3 = \\frac{32}{3}\\pi",
          "translation": "半径 2 的球体积是 32π/3"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "例题：半径 2cm 的实心球——V=4π×8÷3=32π/3≈33.5cm³。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 26,
                  "color": "known",
                  "width": 2.5,
                  "fill": "known",
                  "opacity": 0.15
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    76,
                    50
                  ],
                  "color": "target",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    42
                  ],
                  "text": "r=2",
                  "size": 13,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "V = 32π/3",
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
        "例题：半径 2cm 的实心球——V=4π×8÷3=32π/3≈33.5cm³。",
        "自查：r³ 算对了吗（2³=8）？乘的是 4/3 不是 4 吗？",
        "下一课：本章小结——把面积公式链串起来。"
      ],
      "examples": [
        {
          "text": "玻璃弹珠：r=1cm，V≈4.19cm³",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l9-p2",
      "next": "g11-u1-l10-p1"
    }
  ]
};
