window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g10-u1-l6"] = {
  "lessonId": "g10-u1-l6",
  "lessonTitle": "旋转与全等：运动的眼光",
  "chapterId": "g10",
  "pages": [
    {
      "id": "g10-u1-l6-p1",
      "title": "三种运动，一个结果：重合",
      "concept": "三种运动都不改变形状大小",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{平移} / \\text{轴对称} / \\text{旋转} \\Rightarrow \\text{形状大小不变}",
          "translation": "三种运动都不改变图形的形状和大小"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：三角形 ABC，和它的“目标位置”（虚线）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      60
                    ],
                    [
                      44,
                      60
                    ],
                    [
                      33,
                      40
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
                      84,
                      60
                    ],
                    [
                      73,
                      40
                    ]
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    33,
                    74
                  ],
                  "text": "△ABC",
                  "size": 13,
                  "math": true
                },
                {
                  "t": "txt",
                  "p": [
                    73,
                    74
                  ],
                  "text": "目标位置",
                  "size": 13,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 2 步：平移——沿箭头滑过去，重合！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      60
                    ],
                    [
                      84,
                      60
                    ],
                    [
                      73,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    33,
                    50
                  ],
                  "b": [
                    68,
                    50
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "平移：滑过去",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：轴对称——沿折线翻过去，重合！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      60
                    ],
                    [
                      84,
                      60
                    ],
                    [
                      73,
                      40
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
                    75
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
                  "text": "轴对称：翻过去",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 4 步：旋转——绕 O 转过去，重合！三种动作，一个结果。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      62,
                      60
                    ],
                    [
                      84,
                      60
                    ],
                    [
                      73,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 160,
                  "a2": 20,
                  "r": 18,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "旋转：转过去",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "没变的是：形状和大小",
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
        "看第 2/3/4 步：滑过去、翻过去、转过去——三个动作，一个结果：完全重合。",
        "没变的是：形状和大小。不变的那个，就是全等要讲的东西。",
        "g02 学过平移，1.1 学过翻折，1.5 学过旋转——今天它们第一次“同台”。"
      ],
      "examples": [
        {
          "text": "搬桌子：平移搬、翻面搬、转着搬，桌子还是那张桌子",
          "figure": "实物"
        }
      ],
      "prev": "g10-u1-l5-p6",
      "next": "g10-u1-l6-p2"
    },
    {
      "id": "g10-u1-l6-p2",
      "title": "全等即运动重合",
      "concept": "全等的运动本质",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{全等} \\Rightarrow \\text{经运动可重合}",
          "translation": "全等就是经过运动能完全重合"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：g04.1.1 的“搬”——两个三角形叠到一起，严丝合缝。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      60
                    ],
                    [
                      55,
                      60
                    ],
                    [
                      42,
                      38
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      60
                    ],
                    [
                      55,
                      60
                    ],
                    [
                      42,
                      38
                    ]
                  ],
                  "color": "target",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    55,
                    60
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    55,
                    60
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    80
                  ],
                  "text": "“搬”过去，严丝合缝",
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
        "还记得 g04.1.1 的那句话吗？把三角形“搬”过去盖住另一个——现在“搬”有了正式名字：平移、翻折、旋转。",
        "全等的本质：两个图形全等，当且仅当经过一次（或几次）运动能完全重合。",
        "SSS、SAS、ASA、AAS：给定这些条件，三角形形状就被“锁死”，搬过去一定重合——判定定理就是“锁死说明书”。",
        "例子：g04 用 SAS 搭三角形，“两边夹角固定、形状锁死”——现在看：锁死了，运动过去必重合。",
        "反例：只给两条边（没夹角），形状锁不死，搬过去可能合不上——所以“SSA”不能判定全等。",
        "⚠️ 别搞混：全等要求“形状大小都一样”；相似只要求“形状一样”（g09）——运动重合是全等的专属检验法。",
        "记住一句话：全等，就是经运动能重合。"
      ],
      "examples": [
        {
          "text": "复印机两张纸：平移一下就重合，所以全等",
          "figure": "实物"
        }
      ],
      "prev": "g10-u1-l6-p1",
      "next": "g10-u1-l6-p3"
    },
    {
      "id": "g10-u1-l6-p3",
      "title": "运动找对应：转过去压住",
      "concept": "用运动找对应边角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\triangle ABC \\cong \\triangle A'B'C'",
          "translation": "三角形 ABC 全等于三角形 A'B'C'"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：两个三角形，位置不同，但看着“一样大”。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      22,
                      62
                    ],
                    [
                      44,
                      62
                    ],
                    [
                      33,
                      42
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      78,
                      42
                    ],
                    [
                      56,
                      42
                    ],
                    [
                      67,
                      62
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "全等吗？转过去看看",
                  "size": 13,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 2 步：绕 O 旋转，A 落到 A' 身上（同色标记）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      78,
                      42
                    ],
                    [
                      56,
                      42
                    ],
                    [
                      67,
                      62
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    33,
                    42
                  ],
                  "label": "A",
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    67,
                    62
                  ],
                  "label": "A'",
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "A → A'：压住了",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 3 步：B→B'，C→C' 依次落定——对应边同色。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      78,
                      42
                    ],
                    [
                      56,
                      42
                    ],
                    [
                      67,
                      62
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    56,
                    42
                  ],
                  "b": [
                    78,
                    42
                  ],
                  "color": "corrB",
                  "width": 3.5,
                  "ticks": 2
                },
                {
                  "t": "seg",
                  "a": [
                    78,
                    42
                  ],
                  "b": [
                    67,
                    62
                  ],
                  "color": "corrC",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "对应边：同色等长",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrB"
                }
              ]
            },
            {
              "caption": "第 4 步：转过去压在一起的，就是对应顶点——对应边、对应角一次找齐。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      78,
                      42
                    ],
                    [
                      56,
                      42
                    ],
                    [
                      67,
                      62
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    67,
                    80
                  ],
                  "text": "△ABC ≌ △A'B'C'",
                  "size": 14.48,
                  "bold": true,
                  "color": "known",
                  "math": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "找对应不用再“看字母顺序”：转过去，压在一起的就是对应顶点。",
        "对应边画同色、标同刻度——全书统一的颜色约定（g04 就这么认的）。",
        "这招以后一直有用：g11 面积割补、g13 解析几何，找对应都靠“运动过去压住”。"
      ],
      "examples": [
        {
          "text": "拼图：拿起一块转一转，严丝合缝处就是对应边",
          "figure": "实物"
        }
      ],
      "prev": "g10-u1-l6-p2",
      "next": "g10-u1-l7-p1"
    }
  ]
};
