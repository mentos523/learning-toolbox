window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g09-u1-l4"] = {
  "lessonId": "g09-u1-l4",
  "lessonTitle": "SAS/SSS 判定",
  "chapterId": "g09",
  "pages": [
    {
      "id": "g09-u1-l4-p1",
      "title": "SAS：两边成比例，夹角相等",
      "concept": "SAS 相似判定的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{AB}{A'B'} = \\frac{AC}{A'C'} = \\frac{1}{2}, \\angle A = \\angle A' = 60\\text{度}",
          "translation": "两组对应边的比都是 1 比 2，夹角都是 60 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：两个三角形——小边 2、3，大边 4、6，夹角都是 60 度。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      12,
                      60
                    ],
                    [
                      42,
                      60
                    ],
                    [
                      28.8,
                      31
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    12,
                    60
                  ],
                  "a1": 300,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    27,
                    68
                  ],
                  "text": "2",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    45
                  ],
                  "text": "3",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    12,
                    74
                  ],
                  "text": "60°",
                  "size": 12
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      62
                    ],
                    [
                      90,
                      62
                    ],
                    [
                      74.6,
                      28.1
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    55,
                    62
                  ],
                  "a1": 300,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    70
                  ],
                  "text": "4",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    46
                  ],
                  "text": "6",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    76
                  ],
                  "text": "60°",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 2 步：2:4 = 3:6，两组边成比例；60 度是这两条边的夹角，位置不能错。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      12,
                      60
                    ],
                    [
                      42,
                      60
                    ],
                    [
                      28.8,
                      31
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    12,
                    60
                  ],
                  "a1": 300,
                  "a2": 0,
                  "r": 12,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      62
                    ],
                    [
                      90,
                      62
                    ],
                    [
                      74.6,
                      28.1
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    55,
                    62
                  ],
                  "a1": 300,
                  "a2": 0,
                  "r": 12,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "2:4 = 3:6，夹角 60°",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：把小的放大 2 倍盖到大的上面——严丝合缝，相似！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      62
                    ],
                    [
                      90,
                      62
                    ],
                    [
                      74.6,
                      28.1
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      62
                    ],
                    [
                      90,
                      62
                    ],
                    [
                      74.6,
                      28.1
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "SAS：两边成比例，夹角相等 → 相似",
                  "size": 13,
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
        "两组边 2:4 和 3:6——比都是 1:2，成比例。",
        "夹在中间的角都是 60 度——必须是“夹角”，两边中间的那个角，位置不能错。",
        "小三角形放大 2 倍盖住大的：形状一样——这就是 SAS 判定。"
      ],
      "examples": [
        {
          "text": "衣架两边按比例加长，夹角不变",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l3-p3",
      "next": "g09-u1-l4-p2"
    },
    {
      "id": "g09-u1-l4-p2",
      "title": "SAS 判定：成比例的两边夹着相等的角",
      "concept": "SAS 判定定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{AB}{A'B'} = \\frac{AC}{A'C'}, \\angle A = \\angle A' \\Rightarrow \\text{两三角形相似}",
          "translation": "两边成比例且夹角相等，则两个三角形相似"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：SAS——两边成比例，夹住的角相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      60
                    ],
                    [
                      50,
                      60
                    ],
                    [
                      32,
                      30
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    15,
                    60
                  ],
                  "a1": 299.5,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      62
                    ],
                    [
                      93,
                      62
                    ],
                    [
                      75,
                      32
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    62
                  ],
                  "a1": 299.5,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "SAS：边成比例 + 夹角相等",
                  "size": 13,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？上一页两组边 2:4=3:6，夹角都是 60 度——放大 2 倍就重合了。",
        "SAS 判定：两边成比例，并且这两边的夹角相等，这两个三角形就相似。",
        "生活例：做衣架——两边按比例加长，夹角不变，衣架形状不变。",
        "图形例：边 2、3 夹 60 度角的三角形，与边 4、6 夹 60 度角的三角形相似。",
        "反例：两组边成比例，但相等的角不是“夹”在中间的——不一定相似。",
        "⚠️ 别搞混：必须是“夹角”——两边中间的那个角；而且相等的角要对应（∠A 对 ∠A′）。",
        "记住一句话：成比例的两边，夹着相等的角。"
      ],
      "examples": [
        {
          "text": "全等的 SAS 亲戚：相等换成成比例",
          "figure": "图表"
        }
      ],
      "prev": "g09-u1-l4-p1",
      "next": "g09-u1-l4-p3"
    },
    {
      "id": "g09-u1-l4-p3",
      "title": "SSS：三边成比例",
      "concept": "SSS 相似判定的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{2}{4} = \\frac{3}{6} = \\frac{4}{8} = \\frac{1}{2}",
          "translation": "三组对应边的比都是 1 比 2"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：一个三角形，三边是 2、3、4。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      62
                    ],
                    [
                      47,
                      62
                    ],
                    [
                      31,
                      34
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    31,
                    70
                  ],
                  "text": "2",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    21,
                    48
                  ],
                  "text": "3",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    48
                  ],
                  "text": "4",
                  "size": 12,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：另一个三角形，三边是 4、6、8——2:4=3:6=4:8。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      62
                    ],
                    [
                      47,
                      62
                    ],
                    [
                      31,
                      34
                    ]
                  ],
                  "color": "corrA",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      64
                    ],
                    [
                      90,
                      64
                    ],
                    [
                      74,
                      36
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    72
                  ],
                  "text": "4",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    50
                  ],
                  "text": "6",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    83,
                    50
                  ],
                  "text": "8",
                  "size": 12,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "2:4 = 3:6 = 4:8",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：小的放大 2 倍盖到大的上面——严丝合缝，相似！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      64
                    ],
                    [
                      90,
                      64
                    ],
                    [
                      74,
                      36
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      64
                    ],
                    [
                      90,
                      64
                    ],
                    [
                      74,
                      36
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "SSS：三边成比例 → 相似",
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
        "三组边的比都是 1:2——三边成比例。",
        "角不用量：三边定了，形状就定了（g04 的 SSS 全等是亲戚，那里是“三边相等”）。",
        "这就是 SSS 判定：三边成比例 → 相似。"
      ],
      "examples": [
        {
          "text": "按图纸比例放大零件",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l4-p2",
      "next": "g09-u1-l4-p4"
    },
    {
      "id": "g09-u1-l4-p4",
      "title": "SSS 判定：三边同比例",
      "concept": "SSS 判定定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{a}{a'} = \\frac{b}{b'} = \\frac{c}{c'} \\Rightarrow \\text{两三角形相似}",
          "translation": "三组对应边的比都相等，则两个三角形相似"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：SSS——三边成比例，角都不用看。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      12,
                      60
                    ],
                    [
                      44,
                      60
                    ],
                    [
                      28,
                      32
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      56,
                      62
                    ],
                    [
                      90,
                      62
                    ],
                    [
                      73,
                      34
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "SSS：三边成比例 → 相似",
                  "size": 13,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？三边 2、3、4 和 4、6、8——比都是 1:2，放大 2 倍就重合了。",
        "SSS 判定：三边成比例，这两个三角形就相似。",
        "生活例：按图纸 1:2 放大做零件，三条边都乘以 2，形状不变。",
        "图形例：三边 3、4、5 的三角形与三边 6、8、10 的三角形相似。",
        "反例：三边 2、3、4 与 4、6、9——4/9 不是 1/2，比不全等，不相似。",
        "⚠️ 别搞混：是“三组比都相等”，一组掉队就不行（4/9 那个就是掉队的）。",
        "记住一句话：三边同比例，形状必相同。"
      ],
      "examples": [
        {
          "text": "3-4-5 与 6-8-10：经典相似对",
          "figure": "图表"
        }
      ],
      "prev": "g09-u1-l4-p3",
      "next": "g09-u1-l4-p5"
    },
    {
      "id": "g09-u1-l4-p5",
      "title": "全等判定 vs 相似判定",
      "concept": "判定对照表",
      "formulas": [
        {
          "id": "f1",
          "latex": "k = 1 \\Rightarrow \\text{相似退化为全等}",
          "translation": "相似比为 1 时，相似就退化成全等"
        },
        {
          "id": "f2",
          "latex": "\\text{全等} \\subset \\text{相似}",
          "translation": "全等是相似的特例"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "全等四判定（g04）",
              "caption": "全等：SSS / SAS / ASA / AAS（+ 直角三角形 HL）——对应边相等、对应角相等。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "SSS：三边相等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    64
                  ],
                  "text": "SAS：两边夹角相等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "ASA / AAS：两角一边相等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    36
                  ],
                  "text": "HL：直角三角形专用",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "关键词：相等",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "相似三判定（g09）",
              "caption": "相似：SSS / SAS / AA——对应边成比例、对应角相等。全等是相似比 k=1 的特例。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "SSS：三边成比例",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    64
                  ],
                  "text": "SAS：两边成比例，夹角相等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "AA：两角对应相等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    36
                  ],
                  "text": "（HL 没有相似版，直角用 AA）",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "关键词：成比例",
                  "size": 13,
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
        "对照看：SSS 对 SSS，SAS 对 SAS，ASA/AAS 对 AA——“相等”换成“成比例”。",
        "HL 没有相似版：直角三角形判相似直接用 AA（两个直角本来就相等）。",
        "记住：全等是相似大家族里 k=1 的那个成员。"
      ],
      "examples": [
        {
          "text": "一张表看清全等与相似的关系",
          "figure": "图表"
        }
      ],
      "prev": "g09-u1-l4-p4",
      "next": "g09-u1-l5-p1"
    }
  ]
};
