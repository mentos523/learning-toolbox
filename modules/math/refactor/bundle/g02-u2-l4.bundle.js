window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g02-u2-l4"] = {
  "lessonId": "g02-u2-l4",
  "lessonTitle": "平移：图形的第一次运动",
  "chapterId": "g02",
  "pages": [
    {
      "id": "g02-u2-l4-p1",
      "title": "三角形滑走了：对应点连线",
      "concept": "平移的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{平移} = \\text{沿直线滑动}",
          "translation": "平移：图形沿直线方向滑动，形状大小不变"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：三角形 ABC，沿箭头方向滑动。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      60
                    ],
                    [
                      38,
                      60
                    ],
                    [
                      29,
                      74
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    20,
                    60
                  ],
                  "r": 3,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    38,
                    60
                  ],
                  "r": 3,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    29,
                    74
                  ],
                  "r": 3,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    16,
                    54
                  ],
                  "text": "A",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    54
                  ],
                  "text": "B",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    29,
                    80
                  ],
                  "text": "C",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    44,
                    67
                  ],
                  "b": [
                    56,
                    67
                  ],
                  "color": "aux",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      56,
                      67
                    ],
                    [
                      50,
                      63
                    ],
                    [
                      50,
                      71
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "fill": "aux"
                }
              ]
            },
            {
              "caption": "第 2 步：滑到新位置 A'B'C'——对应点连起来：AA'、BB'、CC'。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      60
                    ],
                    [
                      38,
                      60
                    ],
                    [
                      29,
                      74
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      52,
                      60
                    ],
                    [
                      70,
                      60
                    ],
                    [
                      61,
                      74
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    54
                  ],
                  "text": "A'",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    54
                  ],
                  "text": "B'",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    61,
                    80
                  ],
                  "text": "C'",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    60
                  ],
                  "b": [
                    52,
                    60
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    60
                  ],
                  "b": [
                    70,
                    60
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    29,
                    74
                  ],
                  "b": [
                    61,
                    74
                  ],
                  "color": "corrA",
                  "width": 2.5
                }
              ]
            },
            {
              "caption": "第 3 步：量一量：三条连线互相平行，而且一样长。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      60
                    ],
                    [
                      38,
                      60
                    ],
                    [
                      29,
                      74
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      52,
                      60
                    ],
                    [
                      70,
                      60
                    ],
                    [
                      61,
                      74
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    60
                  ],
                  "b": [
                    52,
                    60
                  ],
                  "color": "corrA",
                  "width": 3,
                  "arrows": 1
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    60
                  ],
                  "b": [
                    70,
                    60
                  ],
                  "color": "corrA",
                  "width": 3,
                  "arrows": 1
                },
                {
                  "t": "seg",
                  "a": [
                    29,
                    74
                  ],
                  "b": [
                    61,
                    74
                  ],
                  "color": "corrA",
                  "width": 3,
                  "arrows": 1
                },
                {
                  "t": "txt",
                  "p": [
                    36,
                    66
                  ],
                  "text": "平行且相等",
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
        "点 ▶：三角形沿箭头“滑”过去——形状大小一点没变。",
        "对应点：A 滑到 A'，B 滑到 B'，C 滑到 C'——连起来三条线。",
        "不变的是：AA'、BB'、CC' 互相平行且一样长——这就是平移的性质。",
        "下一页：平移的定义一次讲透。"
      ],
      "examples": [
        {
          "text": "电梯上楼：人没变，楼层变了",
          "figure": "实物"
        }
      ],
      "prev": "g02-u2-l3-p4",
      "next": "g02-u2-l4-p2"
    },
    {
      "id": "g02-u2-l4-p2",
      "title": "平移的性质：对应点连线平行且相等",
      "concept": "平移的定义与性质",
      "formulas": [
        {
          "id": "f1",
          "latex": "AA' \\parallel BB' \\parallel CC',\\ AA' = BB' = CC'",
          "translation": "对应点连线互相平行且长度相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：平移只改变位置——对应点连线平行且相等，形状大小纹丝不动。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      60
                    ],
                    [
                      38,
                      60
                    ],
                    [
                      29,
                      74
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      52,
                      60
                    ],
                    [
                      70,
                      60
                    ],
                    [
                      61,
                      74
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    60
                  ],
                  "b": [
                    52,
                    60
                  ],
                  "color": "corrA",
                  "width": 3,
                  "arrows": 1
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    60
                  ],
                  "b": [
                    70,
                    60
                  ],
                  "color": "corrA",
                  "width": 3,
                  "arrows": 1
                },
                {
                  "t": "seg",
                  "a": [
                    29,
                    74
                  ],
                  "b": [
                    61,
                    74
                  ],
                  "color": "corrA",
                  "width": 3,
                  "arrows": 1
                },
                {
                  "t": "txt",
                  "p": [
                    36,
                    50
                  ],
                  "text": "形状大小不变",
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
        "还记得滑动吗？三角形从 ABC 滑到 A'B'C'——这个“滑”的动作，就叫平移。",
        "平移的性质：对应点连的线（AA'、BB'、CC'）互相平行，而且长度相等。",
        "平移不改变图形的形状和大小——只改变位置。像电梯上楼：人没变，楼层变了。",
        "生活例：电梯、推箱子、滑滑梯——都是平移。",
        "反例：转动的门——位置变了，但它是“转”不是“滑”，那叫旋转（第 10 章）。",
        "⚠️ 别搞混：平移是“滑”，旋转是“转”；平移里每条对应点连线都平行。",
        "记住一句话：平移滑一滑，连线平行又相等。"
      ],
      "examples": [],
      "prev": "g02-u2-l4-p1",
      "next": "g02-u2-l4-p3"
    },
    {
      "id": "g02-u2-l4-p3",
      "title": "预告：直线也能“滑”——y=x 往上滑",
      "concept": "平移与函数图像（H16 预告）",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = x \\to y = x + 2",
          "translation": "直线 y = x 往上平移 2 格，变成 y = x + 2"
        }
      ],
      "interaction": {
        "type": "morph-toggle",
        "params": {
          "views": [
            {
              "label": "y = x",
              "caption": "直线 y = x：经过原点，斜着往上走。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    25
                  ],
                  "b": [
                    75,
                    85
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    60
                  ],
                  "text": "y = x",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    55
                  ],
                  "r": 3,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    48
                  ],
                  "text": "原点",
                  "size": 12
                }
              ]
            },
            {
              "label": "往上滑 2 格",
              "caption": "整体往上平移 2 格，变成 y = x + 2——b 就是往上滑的格数。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    25
                  ],
                  "b": [
                    68,
                    78
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    45
                  ],
                  "b": [
                    68,
                    98
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    40,
                    50
                  ],
                  "b": [
                    40,
                    70
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    80
                  ],
                  "text": "y = x + 2",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    60
                  ],
                  "text": "上移 2 格",
                  "size": 12,
                  "color": "corrA"
                }
              ]
            }
          ],
          "morph": {
            "kind": "translate",
            "durationMs": 1200,
            "pairs": [
              [
                0,
                1
              ]
            ],
            "readout": {
              "template": "y = x + {v}",
              "from": 0,
              "to": 2,
              "decimals": 1
            }
          },
          "controls": {
            "play": true,
            "scrub": true,
            "step": true,
            "replay": true
          }
        },
        "engine": {
          "primitive": "MorphToggle",
          "version": "2026.10.16.A",
          "params": {
            "kind": "translate"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "点“往上滑 2 格”：整条直线 y = x 平移上去，变成 y = x + 2。",
        "代数 ch06-u2-l2：y=kx+b 里 b 让直线上下平移——那是函数图像在“滑”，和本课图形平移同一回事。",
        "这里只埋一个“原来如此”：b 是上下平移的量。函数留到代数课细讲。"
      ],
      "examples": [
        {
          "text": "回看代数第 6 章：一次函数图像的平移",
          "figure": "回链"
        }
      ],
      "prev": "g02-u2-l4-p2",
      "next": "g02-u2-l5-p1"
    }
  ]
};
