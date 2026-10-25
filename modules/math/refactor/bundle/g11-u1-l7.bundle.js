window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l7"] = {
  "lessonId": "g11-u1-l7",
  "lessonTitle": "柱体的表面积与体积",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l7-p1",
      "title": "纸盒展开：表面积",
      "concept": "表面积等于展开图面积",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{表面积} = \\text{展开图的面积}",
          "translation": "立体图形的表面积就是把它展开铺平后的面积"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：一个长方体纸盒——6 个面围起来。",
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
                      70,
                      65
                    ],
                    [
                      30,
                      65
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
                      65
                    ],
                    [
                      40,
                      75
                    ],
                    [
                      80,
                      75
                    ],
                    [
                      70,
                      65
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      70,
                      35
                    ],
                    [
                      80,
                      45
                    ],
                    [
                      80,
                      75
                    ],
                    [
                      70,
                      65
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "6 个面围成",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：沿棱剪开——剪开的边用虚线标出来。",
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
                      70,
                      65
                    ],
                    [
                      30,
                      65
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    35
                  ],
                  "b": [
                    30,
                    65
                  ],
                  "color": "target",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    35
                  ],
                  "b": [
                    70,
                    65
                  ],
                  "color": "target",
                  "width": 2,
                  "dash": "5,4"
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
                  "color": "target",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "沿虚线剪开",
                  "size": 13,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：摊平——6 个面躺在桌面上。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      15
                    ],
                    [
                      60,
                      15
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      40,
                      30
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      60,
                      45
                    ],
                    [
                      40,
                      45
                    ]
                  ],
                  "color": "corrB",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      45
                    ],
                    [
                      60,
                      45
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      40,
                      60
                    ]
                  ],
                  "color": "corrC",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      60
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      60,
                      75
                    ],
                    [
                      40,
                      75
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      45
                    ],
                    [
                      40,
                      45
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      25,
                      60
                    ]
                  ],
                  "color": "corrB",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      60,
                      45
                    ],
                    [
                      75,
                      45
                    ],
                    [
                      75,
                      60
                    ],
                    [
                      60,
                      60
                    ]
                  ],
                  "color": "corrC",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "6 个面摊平",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 4 步：表面积 = 6 个面的面积加起来——展开前后，面积没变。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      15
                    ],
                    [
                      60,
                      15
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      40,
                      30
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      60,
                      45
                    ],
                    [
                      40,
                      45
                    ]
                  ],
                  "color": "corrB",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      45
                    ],
                    [
                      60,
                      45
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      40,
                      60
                    ]
                  ],
                  "color": "corrC",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      60
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      60,
                      75
                    ],
                    [
                      40,
                      75
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      45
                    ],
                    [
                      40,
                      45
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      25,
                      60
                    ]
                  ],
                  "color": "corrB",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      60,
                      45
                    ],
                    [
                      75,
                      45
                    ],
                    [
                      75,
                      60
                    ],
                    [
                      60,
                      60
                    ]
                  ],
                  "color": "corrC",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "表面积 = 展开图面积",
                  "size": 14.48,
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
        "点播放：看纸盒被“剥开”摊平——立体变平面。",
        "没变的是：面积——表面积就是展开图的面积。",
        "下一页：算出长方体的表面积公式。"
      ],
      "examples": [
        {
          "text": "快递纸箱：展开就是一张大纸板",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l6-p4",
      "next": "g11-u1-l7-p2"
    },
    {
      "id": "g11-u1-l7-p2",
      "title": "棱柱的表面积",
      "concept": "棱柱表面积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = 2(ab + bc + ca)",
          "translation": "长方体表面积等于 2 乘以长宽、宽高、长高的和"
        },
        {
          "id": "f2",
          "latex": "S_{\\text{柱}} = 2S_{\\text{底}} + S_{\\text{侧}}",
          "translation": "柱体表面积等于 2 个底面积加侧面积"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "长方体：长 a、宽 b、高 c——三组对面，每组 2 个。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      30
                    ],
                    [
                      60,
                      30
                    ],
                    [
                      60,
                      45
                    ],
                    [
                      40,
                      45
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      45
                    ],
                    [
                      60,
                      45
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      40,
                      60
                    ]
                  ],
                  "color": "corrB",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      45
                    ],
                    [
                      40,
                      45
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      25,
                      60
                    ]
                  ],
                  "color": "corrC",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    22
                  ],
                  "text": "ab × 2",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "bc × 2",
                  "size": 12,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    16,
                    52
                  ],
                  "text": "ca × 2",
                  "size": 12,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "S = 2(ab+bc+ca)",
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
        "还记得吗？纸盒摊平是 6 个面——长方体：长 a、宽 b、高 c，6 个面两两相同。",
        "长方体表面积 = 2(ab+bc+ca)：三组对面，每组 2 个。",
        "一般棱柱：表面积 = 2×底面积 + 侧面积——两个底 + 一圈侧面。",
        "生活例：粉刷长方体水池（无盖）——5 个面，别把 6 个全算上。",
        "图形例：a=3,b=4,c=5，表面积=2(12+20+15)=94。",
        "反例：无盖/无底的盒子——先数有几个面，再套公式。",
        "⚠️ 别搞混：表面积是“所有面的面积之和”——漏一个面，结果就错了。"
      ],
      "examples": [
        {
          "text": "魔方：6 个面，每个 9 格",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l7-p1",
      "next": "g11-u1-l7-p3"
    },
    {
      "id": "g11-u1-l7-p3",
      "title": "圆柱侧面展开",
      "concept": "圆柱侧面展开是矩形",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{侧面展开} \\Rightarrow \\text{矩形}",
          "translation": "圆柱的侧面沿一条母线剪开展平，得到一个矩形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：一个圆柱——两个底圆 + 一圈侧面。",
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
                  "color": "line",
                  "width": 2.5
                },
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
                      62,
                      40
                    ],
                    [
                      38,
                      40
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      35,
                      65
                    ],
                    [
                      65,
                      65
                    ],
                    [
                      62,
                      60
                    ],
                    [
                      38,
                      60
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "两个底圆 + 侧面",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：沿一条母线（竖直的边）剪开。",
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
                  "color": "line",
                  "width": 2
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
                  "color": "target",
                  "width": 2.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "沿这条线剪开",
                  "size": 13,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：侧面“剥”下来摊平——是个矩形！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      35
                    ],
                    [
                      80,
                      35
                    ],
                    [
                      80,
                      65
                    ],
                    [
                      20,
                      65
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "侧面摊平：矩形！",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 4 步：矩形的长 = 底面周长 2πr，宽 = 圆柱的高 h——侧面积 = 2πrh。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      35
                    ],
                    [
                      80,
                      35
                    ],
                    [
                      80,
                      65
                    ],
                    [
                      20,
                      65
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    75
                  ],
                  "text": "长 = 2πr（绕底圆一圈）",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    50
                  ],
                  "text": "宽=h",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "侧面积 = 2πrh",
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
        "点播放：看圆柱的侧面被“剥”下来——卷着的面摊平了。",
        "关键：矩形的长正好绕底圆一圈——长=2πr，宽=h。",
        "这是本课最重要的动画：侧面积 = 2πrh 就藏在这里。"
      ],
      "examples": [
        {
          "text": "卷纸筒剪开：侧面是一张长方形纸",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l7-p2",
      "next": "g11-u1-l7-p4"
    },
    {
      "id": "g11-u1-l7-p4",
      "title": "圆柱的表面积",
      "concept": "圆柱表面积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = 2\\pi r^2 + 2\\pi rh",
          "translation": "圆柱表面积等于 2 个底圆面积加侧面积"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "圆柱 = 两个底圆 + 一个侧面矩形——三部分加起来。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    28,
                    50
                  ],
                  "r": 12,
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    52,
                    50
                  ],
                  "r": 12,
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      70,
                      38
                    ],
                    [
                      92,
                      38
                    ],
                    [
                      92,
                      62
                    ],
                    [
                      70,
                      62
                    ]
                  ],
                  "color": "corrB",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    28,
                    68
                  ],
                  "text": "πr²",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    68
                  ],
                  "text": "πr²",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    81,
                    68
                  ],
                  "text": "2πrh",
                  "size": 12,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    84
                  ],
                  "text": "S = 2πr² + 2πrh",
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
        "还记得吗？圆柱 = 两个底圆 + 一个侧面矩形——三部分加起来。",
        "圆柱表面积 = 2πr² + 2πrh：两个底圆（πr²×2）+ 侧面（2πr×h）。",
        "生活例：易拉罐贴标签——只算侧面 2πrh，不用算顶底。",
        "图形例：r=2、h=5，表面积=2π×4+2π×10=28π。",
        "反例：无盖水桶——1 个底圆 + 侧面，别算 2 个底。",
        "⚠️ 别搞混：2πr² 是两个“面”，2πrh 是一个“面”——r² 和 rh 别抄混。",
        "记住一句话：圆柱表面积，两底加侧面。"
      ],
      "examples": [
        {
          "text": "茶叶罐：r=5cm,h=12cm",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l7-p3",
      "next": "g11-u1-l7-p5"
    },
    {
      "id": "g11-u1-l7-p5",
      "title": "柱体体积：底面积乘高",
      "concept": "柱体体积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "V = S \\times h",
          "translation": "柱体体积等于底面积乘以高"
        },
        {
          "id": "f2",
          "latex": "V_{\\text{圆柱}} = \\pi r^2 h",
          "translation": "圆柱体积等于 π 乘 r 的平方乘 h"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：底面积是 S 的薄片，摞 h 这么高——体积 = S×h。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      60
                    ],
                    [
                      70,
                      60
                    ],
                    [
                      70,
                      66
                    ],
                    [
                      30,
                      66
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      52
                    ],
                    [
                      70,
                      52
                    ],
                    [
                      70,
                      58
                    ],
                    [
                      30,
                      58
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      44
                    ],
                    [
                      70,
                      44
                    ],
                    [
                      70,
                      50
                    ],
                    [
                      30,
                      50
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    78,
                    55
                  ],
                  "text": "摞 h 层",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "V = S×h",
                  "size": 15,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：圆柱也一样——底面积 πr²，高 h，体积 = πr²h。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      44
                    ],
                    [
                      70,
                      44
                    ],
                    [
                      70,
                      66
                    ],
                    [
                      30,
                      66
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      44
                    ],
                    [
                      70,
                      44
                    ],
                    [
                      66,
                      50
                    ],
                    [
                      34,
                      50
                    ]
                  ],
                  "color": "known",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    36
                  ],
                  "text": "底面积 = πr²",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    78,
                    55
                  ],
                  "text": "高 h",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "V = πr²h",
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
        "体积是“摞”出来的：底面积 S 的薄片摞 h 层——V=Sh，棱柱圆柱通用。",
        "圆柱：底面积是 πr²——V=πr²h。",
        "生活例：水箱注水——底面积 2㎡、高 1.5m，能装 3m³ 水。",
        "图形例：r=3、h=4 的圆柱，V=π×9×4=36π。",
        "反例：别把表面积公式拿来算体积——一个是“面”（平方），一个是“体”（立方）。",
        "⚠️ 别搞混：体积单位是“立方”（cm³）——1cm³ 是一块小方糖。",
        "记住一句话：柱体体积，底面积乘高。"
      ],
      "examples": [
        {
          "text": "水箱：2×1.5=3 立方米",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l7-p4",
      "next": "g11-u1-l8-p1"
    }
  ]
};
