window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g10-u1-l1"] = {
  "lessonId": "g10-u1-l1",
  "lessonTitle": "轴对称的概念",
  "chapterId": "g10",
  "pages": [
    {
      "id": "g10-u1-l1-p1",
      "title": "折纸剪洞：对称是“折”出来的",
      "concept": "对称是折的结果",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{对折} \\Rightarrow \\text{折痕两边镜像重合}",
          "translation": "对折后，折痕两边的图形镜像重合"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：一张长方形纸，干干净净。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      30
                    ],
                    [
                      75,
                      30
                    ],
                    [
                      75,
                      70
                    ],
                    [
                      25,
                      70
                    ]
                  ],
                  "color": "line",
                  "width": 3
                }
              ]
            },
            {
              "caption": "第 2 步：沿中线对折——这条折痕一会儿有用。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      30
                    ],
                    [
                      75,
                      30
                    ],
                    [
                      75,
                      70
                    ],
                    [
                      50,
                      70
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    28
                  ],
                  "b": [
                    50,
                    72
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "折痕",
                  "size": 14.48,
                  "bold": true,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 3 步：在折好的一边剪一个小洞。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      30
                    ],
                    [
                      75,
                      30
                    ],
                    [
                      75,
                      70
                    ],
                    [
                      50,
                      70
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    28
                  ],
                  "b": [
                    50,
                    72
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "circle",
                  "c": [
                    62,
                    55
                  ],
                  "r": 5,
                  "color": "target",
                  "width": 3
                }
              ]
            },
            {
              "caption": "第 4 步：展开——两个洞关于折痕镜像对称！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      30
                    ],
                    [
                      75,
                      30
                    ],
                    [
                      75,
                      70
                    ],
                    [
                      25,
                      70
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    28
                  ],
                  "b": [
                    50,
                    72
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "circle",
                  "c": [
                    38,
                    55
                  ],
                  "r": 5,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    62,
                    55
                  ],
                  "r": 5,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    55
                  ],
                  "b": [
                    62,
                    55
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "镜像对称！",
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
        "看第 4 步：只剪了一个洞，展开却有两个——另一个是“折”出来的。",
        "没变的是：两个洞到折痕的距离相等，关于折痕镜像。",
        "记住：对称是“折”这个动作的结果，不是图形天生的长相。"
      ],
      "examples": [
        {
          "text": "剪纸：对折剪一下，展开就是对称图案",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g10-u1-l1-p2"
    },
    {
      "id": "g10-u1-l1-p2",
      "title": "翻折慢动作：重合的瞬间",
      "concept": "轴对称的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{沿直线} l \\text{翻折} \\Rightarrow \\text{两部分完全重合}",
          "translation": "图形沿直线 l 翻折后，两部分完全重合"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：一个三角形，一条折线 l。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      60
                    ],
                    [
                      48,
                      60
                    ],
                    [
                      35,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    20
                  ],
                  "b": [
                    55,
                    80
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    76
                  ],
                  "text": "l",
                  "size": 15,
                  "bold": true,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 2 步：三角形沿 l 翻过去——看它“飞”到另一边。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      60
                    ],
                    [
                      48,
                      60
                    ],
                    [
                      35,
                      32
                    ]
                  ],
                  "color": "line",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      58
                    ],
                    [
                      80,
                      52
                    ],
                    [
                      70,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3,
                  "opacity": 0.6
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    20
                  ],
                  "b": [
                    55,
                    80
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "正在翻……",
                  "size": 14.48,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：落定——和右边的轮廓严丝合缝！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      60
                    ],
                    [
                      88,
                      60
                    ],
                    [
                      75,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      60
                    ],
                    [
                      88,
                      60
                    ],
                    [
                      75,
                      32
                    ]
                  ],
                  "color": "target",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    20
                  ],
                  "b": [
                    55,
                    80
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    75,
                    20
                  ],
                  "text": "重合！",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "定格提问：翻过去的三角形，和轮廓严丝合缝吗？（想好了点▶继续）",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      60
                    ],
                    [
                      88,
                      60
                    ],
                    [
                      75,
                      32
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    20
                  ],
                  "b": [
                    55,
                    80
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
                  "text": "是 / 否（不判对错，只记录）",
                  "size": 13,
                  "color": "aux"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "看第 3 步：翻过去的那一刻，三角形和轮廓“长”到了一起——这就是重合。",
        "这就是轴对称：如果一个图形沿一条直线翻折，两部分完全重合，它就是轴对称图形，这条直线叫对称轴。",
        "新名词认旧友：对称轴（就是你上一页折纸时那条“折痕”）。"
      ],
      "examples": [
        {
          "text": "翻书：书页沿书脊翻过去，两页重合",
          "figure": "实物"
        }
      ],
      "prev": "g10-u1-l1-p1",
      "next": "g10-u1-l1-p3"
    },
    {
      "id": "g10-u1-l1-p3",
      "title": "轴对称：对折能重合的图形",
      "concept": "轴对称图形",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{轴对称图形}",
          "translation": "沿一条直线对折后两部分完全重合的图形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：等腰三角形沿虚线对折，两部分严丝合缝。",
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
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    25
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "对称轴",
                  "size": 14.48,
                  "bold": true,
                  "color": "aux"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？你把纸对折剪洞再展开——两个洞关于折痕镜像对称。",
        "轴对称，就是“能对折重合”：把图形沿一条直线折过去，两部分严丝合缝。这条直线叫对称轴。",
        "统一口径：P2 里“一个三角形翻过去压住轮廓”——那是两个图形关于 l 成轴对称；把它俩合在一起看，就是一个轴对称图形。",
        "生活例：蝴蝶的两只翅膀；京剧脸谱的左右脸。图形例：等腰三角形沿顶角平分线对折。",
        "反例：一般的平行四边形，对折后两部分合不上——它不是轴对称图形（但它转 180° 能重合，那是中心对称，1.5 节讲）。",
        "⚠️ 别搞混：对称轴是“直线”，不是“线段”——它可以向两端无限延长。",
        "记住一句话：对折能重合，就是轴对称。"
      ],
      "examples": [
        {
          "text": "蝴蝶、京剧脸谱：沿中线对折重合",
          "figure": "实物"
        },
        {
          "text": "❌ 一般的平行四边形：对折合不上，不是轴对称图形",
          "figure": "反例图"
        }
      ],
      "prev": "g10-u1-l1-p2",
      "next": "g10-u1-l1-p4"
    },
    {
      "id": "g10-u1-l1-p4",
      "title": "反例：平行四边形合不上",
      "concept": "轴对称的反例",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{对折重合} \\Rightarrow \\text{轴对称}",
          "translation": "能对折重合才是轴对称，对不上就不是"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "等腰三角形",
              "caption": "沿虚线对折，两部分严丝合缝——是轴对称图形。",
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
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    25
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "是轴对称图形 ✓",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "平行四边形",
              "caption": "沿中线对折，角对不上边——❌ 不是轴对称图形。",
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
                      68
                    ],
                    [
                      20,
                      68
                    ]
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    34
                  ],
                  "b": [
                    45,
                    74
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    84
                  ],
                  "text": "❌ 不是：合不上",
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
        "切到“平行四边形”：中线两边看着差不多，但折过去角压不到边上——差一点也不行。",
        "点拨：对称是“折”的结果，不是“长得差不多”。“差不多对称”不叫对称。",
        "预告：平行四边形有自己的本事——转 180° 能重合，1.5 节给它正名。"
      ],
      "examples": [
        {
          "text": "长得像对称 ≠ 对称：必须对折严丝合缝",
          "figure": "对比"
        }
      ],
      "prev": "g10-u1-l1-p3",
      "next": "g10-u1-l2-p1"
    }
  ]
};
