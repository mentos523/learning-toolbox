window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g04-u1-l2"] = {
  "lessonId": "g04-u1-l2",
  "lessonTitle": "SSS 判定",
  "chapterId": "g04",
  "pages": [
    {
      "id": "g04-u1-l2-p1",
      "title": "拉一拉：四边形晃，三角形不晃",
      "concept": "三角形稳定性",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三边对应相等} \\Rightarrow \\text{全等}",
          "translation": "三条边对应相等，两个三角形就全等（SSS）"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "拉四边形",
              "caption": "四根木条钉成的四边形，一拉就变形——边长定了，形状没定。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      65
                    ],
                    [
                      65,
                      70
                    ],
                    [
                      60,
                      35
                    ],
                    [
                      20,
                      30
                    ]
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    65
                  ],
                  "b": [
                    65,
                    70
                  ],
                  "ticks": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    80
                  ],
                  "text": "会晃",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "label": "拉三角形",
              "caption": "三根木条钉成的三角形，怎么拉都不变形——三边定了，形状就定了。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      35
                    ],
                    [
                      65,
                      35
                    ],
                    [
                      45,
                      65
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    35
                  ],
                  "b": [
                    65,
                    35
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    35
                  ],
                  "b": [
                    45,
                    65
                  ],
                  "ticks": 2,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    65
                  ],
                  "b": [
                    25,
                    35
                  ],
                  "ticks": 3,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    80
                  ],
                  "text": "纹丝不动",
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
        "点“拉四边形”：四条边长度不变，形状却能晃来晃去。",
        "点“拉三角形”：三条边钉死，形状也被钉死了——这叫三角形的稳定性。",
        "想一想：为什么三条边就能“锁死”形状？"
      ],
      "examples": [
        {
          "text": "自行车架、三角架：越是承重的地方越爱用三角形",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l1-p2",
      "next": "g04-u1-l2-p2"
    },
    {
      "id": "g04-u1-l2-p2",
      "title": "SSS：三边定，形状定",
      "concept": "边边边判定",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB=DE,\\ BC=EF,\\ CA=FD \\Rightarrow \\triangle ABC \\cong \\triangle DEF",
          "translation": "三组对应边分别相等，两个三角形全等，记作 SSS"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：三组对应边同色——三边定了，两个三角形只能长一个样。",
              "shapes": [
                {
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
                      27,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    62
                  ],
                  "b": [
                    42,
                    62
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    62
                  ],
                  "b": [
                    27,
                    34
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    27,
                    34
                  ],
                  "b": [
                    12,
                    62
                  ],
                  "ticks": 3,
                  "color": "corrC"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      62
                    ],
                    [
                      88,
                      62
                    ],
                    [
                      73,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    58,
                    62
                  ],
                  "b": [
                    88,
                    62
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    62
                  ],
                  "b": [
                    73,
                    34
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    73,
                    34
                  ],
                  "b": [
                    58,
                    62
                  ],
                  "ticks": 3,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "SSS：边边边",
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
        "还记得吗？三根木条钉死的三角形，怎么拉都不变形——三边定了，形状就定了。",
        "人话：两个三角形的三条边对应相等，它们一定全等——边边边，简称 SSS。",
        "生活例：搭积木——给定三条边，你只能搭出一种三角形，同学搭的和你的一模一样。",
        "反例：四边形三条边定了，第四条还能晃——四边形没有“SSS”。",
        "⚠️ 别搞混：“对应”二字不能丢——AB 对 DE、BC 对 EF、CA 对 FD，位置不能乱。",
        "记住一句话：三边定，形状定。"
      ],
      "examples": [
        {
          "text": "衣架厂质检：量三条边，就知道两个衣架是不是一样",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l2-p1",
      "next": "g04-u1-l2-p3"
    },
    {
      "id": "g04-u1-l2-p3",
      "title": "跟做：已知三边，画三角形",
      "concept": "作三角形（SSS 应用）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{已知三边} \\Rightarrow \\text{画出唯一的三角形}",
          "translation": "已知三条边的长度，就能画出形状唯一的三角形"
        }
      ],
      "interaction": {
        "type": "construction-step",
        "params": {
          "steps": [
            {
              "text": "画线段 BC，等于最长的边 a",
              "why": "先定一条边当“地基”；作线段等于已知线段（g04.1.7 P1）",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    45
                  ],
                  "b": [
                    65,
                    45
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    45
                  ],
                  "label": "B",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    45
                  ],
                  "label": "C",
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    56
                  ],
                  "text": "a（最长边）",
                  "size": 13
                }
              ]
            },
            {
              "text": "以B为圆心、b为半径画弧",
              "why": "圆规保证：弧上每一点到 B 的距离都是 b",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    45
                  ],
                  "b": [
                    65,
                    45
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    25,
                    45
                  ],
                  "r": 28,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    80
                  ],
                  "text": "半径 = b",
                  "size": 13
                }
              ]
            },
            {
              "text": "以C为圆心、c为半径画弧",
              "why": "弧上每一点到 C 的距离都是 c",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    45
                  ],
                  "b": [
                    65,
                    45
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    25,
                    45
                  ],
                  "r": 28,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "circle",
                  "c": [
                    65,
                    45
                  ],
                  "r": 34,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    80
                  ],
                  "text": "半径 = c",
                  "size": 13
                }
              ]
            },
            {
              "text": "标出两弧的交点 A",
              "why": "交点到 B 是 b、到 C 是 c——三边全对上了",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    45
                  ],
                  "b": [
                    65,
                    45
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    25,
                    45
                  ],
                  "r": 28,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "circle",
                  "c": [
                    65,
                    45
                  ],
                  "r": 34,
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    40,
                    68
                  ],
                  "label": "A",
                  "color": "target"
                }
              ]
            },
            {
              "text": "连 AB、AC，三角形画好了",
              "why": "三边定的三角形形状唯一——这就是 SSS 的施工图",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      45
                    ],
                    [
                      65,
                      45
                    ],
                    [
                      40,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    45
                  ],
                  "label": "B",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    45
                  ],
                  "label": "C",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    40,
                    68
                  ],
                  "label": "A",
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    80
                  ],
                  "text": "三边 a、b、c 全对上",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "跟做：点“下一步”，看三边怎么“长”成三角形（倒带可重看）。",
        "半径一变，交点就跑了——圆规的距离就是“长度不变”的保证。",
        "三边定的三角形形状唯一——SSS 的施工图长这样。"
      ],
      "examples": [
        {
          "text": "木工放样：按三条边在木板上画出三角形",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l2-p2",
      "next": "g04-u1-l3-p1"
    }
  ]
};
