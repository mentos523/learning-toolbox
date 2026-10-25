window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g10-u1-l2"] = {
  "lessonId": "g10-u1-l2",
  "lessonTitle": "轴对称的性质",
  "chapterId": "g10",
  "pages": [
    {
      "id": "g10-u1-l2-p1",
      "title": "对应点“飞”过去：连线被垂直平分",
      "concept": "对称轴是对应点连线的垂直平分线",
      "formulas": [
        {
          "id": "f1",
          "latex": "l \\perp AA'",
          "translation": "对称轴 l 垂直于对应点连线 AA'"
        },
        {
          "id": "f2",
          "latex": "AO = OA'",
          "translation": "对称轴平分对应点连线：AO 等于 OA'"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：点 A 在折线 l 左边，O 是垂足。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    55
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    55,
                    55
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    55
                  ],
                  "label": "O",
                  "color": "aux",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    80
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 2 步：A 沿垂直方向“飞”向另一边。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    55
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5,
                  "opacity": 0.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "正在飞……",
                  "size": 14.48,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：落定在 A'——连线 AA' 与 l 相交。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    55
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    55
                  ],
                  "label": "A'",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    55
                  ],
                  "label": "O",
                  "color": "aux",
                  "r": 4
                }
              ]
            },
            {
              "caption": "第 4 步：没变的是——l 垂直平分 AA'：直角标记 + 两段等长刻度。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    55
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    55
                  ],
                  "label": "A'",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    55
                  ],
                  "b": [
                    55,
                    55
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    55
                  ],
                  "b": [
                    80,
                    55
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "right",
                  "v": [
                    55,
                    55
                  ],
                  "p": [
                    55,
                    85
                  ],
                  "q": [
                    80,
                    55
                  ],
                  "size": 6,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    12
                  ],
                  "text": "l 垂直平分 AA'",
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
        "看第 4 步：连线 AA' 被 l 切成两段，一样长（两道刻度），夹角是直角。",
        "这就是轴对称的性质：对称轴是对应点连线的垂直平分线。",
        "新名词认旧友：对应点（就是翻过去之后压在一起的那两个点）。"
      ],
      "examples": [
        {
          "text": "A 飞到 A'：连线与折痕垂直且被平分",
          "figure": "慢动作"
        }
      ],
      "prev": "g10-u1-l1-p4",
      "next": "g10-u1-l2-p2"
    },
    {
      "id": "g10-u1-l2-p2",
      "title": "性质：对称轴垂直平分连线",
      "concept": "轴对称的性质",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{对称轴} \\perp \\text{对应点连线}，\\text{且平分它}",
          "translation": "对称轴垂直于对应点连线，并且平分它"
        },
        {
          "id": "f2",
          "latex": "AB = A'B', \\angle A = \\angle A'",
          "translation": "对应线段相等，对应角相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：A 与 A' 关于 l 对称——连线被 l 垂直平分，对应边同色。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    55,
                    15
                  ],
                  "b": [
                    55,
                    85
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      60
                    ],
                    [
                      45,
                      60
                    ],
                    [
                      35,
                      40
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      65,
                      60
                    ],
                    [
                      85,
                      60
                    ],
                    [
                      75,
                      40
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "对应边同色：翻过去完全一样",
                  "size": 13,
                  "color": "corrA"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？A 飞到 A' 落定那一刻，连线 AA' 被折痕垂直平分。",
        "性质人话版：对称轴是对应点连线的垂直平分线；翻过去当然一样大，所以对应线段相等、对应角相等。",
        "生活例：照镜子——你和镜中的你，到镜面的距离永远相等。",
        "图形例：△ABC 关于 l 对称，则 AB=A'B'，∠A=∠A'。",
        "反例：如果 A' 不在过 A 的垂线上，或 AO≠OA'，折过去就对不上——那就不是对称。",
        "⚠️ 别搞混：是“对称轴垂直平分连线”，不是“连线平分对称轴”——主语别反。",
        "记住一句话：对应点连线，对称轴垂直平分。"
      ],
      "examples": [
        {
          "text": "照镜子：人与镜像到镜面距离相等",
          "figure": "实物"
        },
        {
          "text": "❌ AO≠OA' 时折过去对不上",
          "figure": "反例图"
        }
      ],
      "prev": "g10-u1-l2-p1",
      "next": "g10-u1-l2-p3"
    },
    {
      "id": "g10-u1-l2-p3",
      "title": "压轴例子：抛物线的折痕",
      "concept": "抛物线对称轴的几何意义（H17）",
      "formulas": [
        {
          "id": "f1",
          "latex": "x = -\\frac{b}{2a}",
          "translation": "抛物线的对称轴：x 等于负 b 除以 2a"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：纸上画一条抛物线 y=ax²+bx+c（开口向上）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    15
                  ],
                  "b": [
                    50,
                    85
                  ],
                  "color": "line",
                  "width": 2
                },
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
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      72
                    ],
                    [
                      38,
                      58
                    ],
                    [
                      46,
                      50
                    ],
                    [
                      50,
                      48
                    ],
                    [
                      54,
                      50
                    ],
                    [
                      62,
                      58
                    ],
                    [
                      72,
                      72
                    ]
                  ],
                  "close": false,
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    30
                  ],
                  "text": "y=ax²+bx+c",
                  "size": 13,
                  "math": true
                }
              ]
            },
            {
              "caption": "第 2 步：沿虚线对折——猜猜折痕在哪？",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      72
                    ],
                    [
                      38,
                      58
                    ],
                    [
                      46,
                      50
                    ],
                    [
                      50,
                      48
                    ],
                    [
                      54,
                      50
                    ],
                    [
                      62,
                      58
                    ],
                    [
                      72,
                      72
                    ]
                  ],
                  "close": false,
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    20
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "沿这条线对折",
                  "size": 14.48,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 3 步：左右两半严丝合缝——折痕就是 x=−b/2a！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      72
                    ],
                    [
                      38,
                      58
                    ],
                    [
                      46,
                      50
                    ],
                    [
                      50,
                      48
                    ],
                    [
                      54,
                      50
                    ],
                    [
                      62,
                      58
                    ],
                    [
                      72,
                      72
                    ]
                  ],
                  "close": false,
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    20
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    12
                  ],
                  "text": "折痕：x = −b/2a",
                  "size": 15,
                  "bold": true,
                  "color": "target",
                  "math": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "这条抛物线你在代数 ch07 见过，当时只给了公式；现在看它的“长相”——对折，折痕就是 x=−b/2a。",
        "“对称轴”三个字，脑子里先出现折痕，再出现公式——这就是几何给代数的礼物。",
        "再看 y=x²：它关于 y 轴对称——这正是代数里的偶函数。抛物线对称轴 + 偶函数，H17 的两块都齐了。",
        "呼应：代数 ch07 二次函数（数的部分回代数第 7 章复习，这里只看“形”）。"
      ],
      "examples": [
        {
          "text": "y=x²−4x+3：对称轴 x=2，纸上对折验证",
          "figure": "纸上画"
        }
      ],
      "prev": "g10-u1-l2-p2",
      "next": "g10-u1-l2-p4"
    },
    {
      "id": "g10-u1-l2-p4",
      "title": "找一找：矩形的对称轴",
      "concept": "矩形的对称轴",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{矩形的对称轴} = 2\\text{条}",
          "translation": "矩形有 2 条对称轴"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "是矩形的对称轴",
              "color": "corrA"
            },
            {
              "name": "不是对称轴",
              "color": "corrB"
            }
          ],
          "base": [
            {
              "t": "poly",
              "pts": [
                [
                  25,
                  35
                ],
                [
                  75,
                  35
                ],
                [
                  75,
                  65
                ],
                [
                  25,
                  65
                ]
              ],
              "color": "line",
              "width": 3
            },
            {
              "t": "txt",
              "p": [
                50,
                82
              ],
              "text": "点每条虚线，分进两篮",
              "size": 14.48,
              "color": "aux"
            }
          ],
          "items": [
            {
              "id": "m1",
              "label": "①",
              "group": 0,
              "anchor": [
                30,
                50
              ],
              "shape": {
                "t": "seg",
                "a": [
                  22,
                  50
                ],
                "b": [
                  78,
                  50
                ],
                "color": "line",
                "width": 2,
                "dash": "5,4"
              }
            },
            {
              "id": "m2",
              "label": "②",
              "group": 0,
              "anchor": [
                50,
                62
              ],
              "shape": {
                "t": "seg",
                "a": [
                  50,
                  32
                ],
                "b": [
                  50,
                  68
                ],
                "color": "line",
                "width": 2,
                "dash": "5,4"
              }
            },
            {
              "id": "d1",
              "label": "③",
              "group": 1,
              "anchor": [
                38,
                42
              ],
              "shape": {
                "t": "seg",
                "a": [
                  25,
                  35
                ],
                "b": [
                  75,
                  65
                ],
                "color": "line",
                "width": 2,
                "dash": "5,4"
              }
            },
            {
              "id": "d2",
              "label": "④",
              "group": 1,
              "anchor": [
                62,
                42
              ],
              "shape": {
                "t": "seg",
                "a": [
                  75,
                  35
                ],
                "b": [
                  25,
                  65
                ],
                "color": "line",
                "width": 2,
                "dash": "5,4"
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点每条虚线：沿它对折，矩形两部分能重合吗？能→左篮，不能→右篮。",
        "对角线为什么不行？折过去角对不上边——除非它是正方形。",
        "结论：矩形有 2 条对称轴（长、宽的中线）；正方形有 4 条。"
      ],
      "examples": [
        {
          "text": "纸上剪个矩形，沿 4 条线各折一次验证",
          "figure": "实物"
        }
      ],
      "prev": "g10-u1-l2-p3",
      "next": "g10-u1-l3-p1"
    }
  ]
};
