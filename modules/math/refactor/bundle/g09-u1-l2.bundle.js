window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g09-u1-l2"] = {
  "lessonId": "g09-u1-l2",
  "lessonTitle": "相似图形",
  "chapterId": "g09",
  "pages": [
    {
      "id": "g09-u1-l2-p1",
      "title": "全等能套上，相似套不上",
      "concept": "全等与相似的套合区别",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{全等} \\Rightarrow \\text{完全重合}",
          "translation": "全等就是能完全重合"
        },
        {
          "id": "f2",
          "latex": "\\text{相似} = \\text{形状相同，大小可不同}",
          "translation": "相似是形状相同、大小可以不同"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "全等的拼图",
              "caption": "两个三角形完全一样：小图往大图上一放，严丝合缝——这叫全等，你在 g04 玩过。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      35
                    ],
                    [
                      60,
                      35
                    ],
                    [
                      40,
                      65
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      35
                    ],
                    [
                      60,
                      35
                    ],
                    [
                      40,
                      65
                    ]
                  ],
                  "color": "known",
                  "width": 2.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "严丝合缝",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "相似的拼图",
              "caption": "形状一样、但大一圈：小图放上去，轮廓贴合却盖不住——大小不一样，这叫相似。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      30
                    ],
                    [
                      75,
                      30
                    ],
                    [
                      45,
                      75
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      35,
                      42
                    ],
                    [
                      55,
                      42
                    ],
                    [
                      45,
                      57
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "轮廓贴合，盖不住",
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
        "全等的能严丝合缝套上；相似的轮廓贴合、但大小不一样，套不进。",
        "切换两个视图：看“能重合”和“只能贴合”的区别——没变的是形状，变的是大小。",
        "全等是 g04 的老朋友；相似是今天的新朋友——“像”而不“同”。"
      ],
      "examples": [
        {
          "text": "两块拼图：一块严丝合缝，一块大一圈",
          "figure": "交互"
        }
      ],
      "prev": "g09-u1-l1-p3",
      "next": "g09-u1-l2-p2"
    },
    {
      "id": "g09-u1-l2-p2",
      "title": "照片放大：人脸不变形",
      "concept": "相似图形的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{新边长} = 2 \\times \\text{原边长}",
          "translation": "放大 2 倍时，新图的每条边都是原图的 2 倍"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：原照片——长和宽记为 1 份。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      35,
                      40
                    ],
                    [
                      65,
                      40
                    ],
                    [
                      65,
                      70
                    ],
                    [
                      35,
                      70
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    58
                  ],
                  "r": 6,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "1×",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：长和宽都乘以 2——人脸没变形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      80,
                      80
                    ],
                    [
                      20,
                      80
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    58
                  ],
                  "r": 12,
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "2×：没变的是形状",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：再乘以 3——还是没变形。没变的是形状，变的是大小。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      8,
                      22
                    ],
                    [
                      92,
                      22
                    ],
                    [
                      92,
                      82
                    ],
                    [
                      8,
                      82
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    55
                  ],
                  "r": 16,
                  "color": "target",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "3×：形状一直没变",
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
        "没变的是：形状；变的是：大小——照片从 1× 放到 3×，人脸一直没变形。",
        "关键：每个方向都按同一个比变，所以不变形。",
        "如果只拉宽不拉高呢？下一页试试。"
      ],
      "examples": [
        {
          "text": "照片放大：1×→3× 人脸不变形",
          "figure": "交互"
        }
      ],
      "prev": "g09-u1-l2-p1",
      "next": "g09-u1-l2-p3"
    },
    {
      "id": "g09-u1-l2-p3",
      "title": "只拉宽：还像吗？",
      "concept": "相似的反例",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{相似要求：所有方向按同一比例变}",
          "translation": "相似要求所有方向都按同一个比例变化"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "等比放大",
              "caption": "长和宽都乘以 2：人脸没变形——相似。",
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
                      75
                    ],
                    [
                      20,
                      75
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    58
                  ],
                  "r": 12,
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "像！",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "只拉宽",
              "caption": "只把宽拉长：人脸变胖了——不像了，不相似。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      8,
                      45
                    ],
                    [
                      92,
                      45
                    ],
                    [
                      92,
                      75
                    ],
                    [
                      8,
                      75
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    62
                  ],
                  "r": 12,
                  "color": "target",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "不像了！",
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
        "等比放大：每个方向同一个比——像，这就是相似。",
        "只拉宽：宽变了、高没变——人脸变胖，不像了，不相似。",
        "所以相似要求：所有方向按同一比例变，缺一个方向都不行。"
      ],
      "examples": [
        {
          "text": "手机照片只拉宽：人脸变胖",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l2-p2",
      "next": "g09-u1-l2-p4"
    },
    {
      "id": "g09-u1-l2-p4",
      "title": "相似：形状相同，大小成比例",
      "concept": "相似多边形的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle A = \\angle A', \\angle B = \\angle B', \\angle C = \\angle C'",
          "translation": "两个三角形的对应角分别相等"
        },
        {
          "id": "f2",
          "latex": "\\frac{a}{a'} = \\frac{b}{b'} = \\frac{c}{c'}",
          "translation": "对应边的比都相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：对应角画同色弧线，对应边画同色描边——这就是相似多边形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      12,
                      35
                    ],
                    [
                      42,
                      35
                    ],
                    [
                      27,
                      62
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    12,
                    35
                  ],
                  "a1": 0,
                  "a2": 60.9,
                  "r": 8,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    42,
                    35
                  ],
                  "a1": 119.1,
                  "a2": 180,
                  "r": 8,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      60,
                      35
                    ],
                    [
                      84,
                      35
                    ],
                    [
                      72,
                      56.6
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    60,
                    35
                  ],
                  "a1": 0,
                  "a2": 60.9,
                  "r": 8,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    84,
                    35
                  ],
                  "a1": 119.1,
                  "a2": 180,
                  "r": 8,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "对应角相等，对应边成比例",
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
        "还记得吗？照片放大到 3 倍人脸都没变形——形状一直没变，这就是相似。",
        "相似多边形，就是“形状相同、大小成比例”的图形：对应角相等，对应边成比例。",
        "生活例：同一张底片洗出的 1 寸和 6 寸照片。图形例：两个三角形，三对角分别相等，三组对应边的比都相等。",
        "反例：正方形和长方形——四个角都是 90 度，但边不成比例，不相似。",
        "⚠️ 别搞混：对应角相等还不够，边也要成比例——正方形 vs 长方形就是教训。",
        "记住一句话：全等要重合，相似只同形。"
      ],
      "examples": [
        {
          "text": "1 寸和 6 寸的同一张照片",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l2-p3",
      "next": "g09-u1-l3-p1"
    }
  ]
};
