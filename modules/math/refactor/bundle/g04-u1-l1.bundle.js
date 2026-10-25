window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g04-u1-l1"] = {
  "lessonId": "g04-u1-l1",
  "lessonTitle": "全等的概念",
  "chapterId": "g04",
  "pages": [
    {
      "id": "g04-u1-l1-p1",
      "title": "拼图：严丝合缝才算全等",
      "concept": "全等",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{全等} = \\text{完全重合}",
          "translation": "全等，就是两个图形能完全重合"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "严丝合缝",
              "caption": "两个三角形叠上去，边压边、角压角，严丝合缝——这就是全等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      64
                    ],
                    [
                      54,
                      64
                    ],
                    [
                      36,
                      30
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      64
                    ],
                    [
                      54,
                      64
                    ],
                    [
                      36,
                      30
                    ]
                  ],
                  "color": "target",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    64
                  ],
                  "b": [
                    54,
                    64
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    54,
                    64
                  ],
                  "b": [
                    36,
                    30
                  ],
                  "ticks": 2,
                  "color": "known"
                },
                {
                  "t": "arc",
                  "v": [
                    18,
                    64
                  ],
                  "a1": 297.9,
                  "a2": 0,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    76
                  ],
                  "text": "完全重合",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "label": "套不进去",
              "caption": "小三角形轮廓和大的一样，但小一圈——贴合却盖不满，这是相似，不是全等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      64
                    ],
                    [
                      58,
                      64
                    ],
                    [
                      38,
                      30
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      58
                    ],
                    [
                      50,
                      58
                    ],
                    [
                      40,
                      42
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    76
                  ],
                  "text": "轮廓贴合，盖不满",
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
        "点“严丝合缝”：两张“复印纸”叠在一起，边和角全压住。",
        "点“套不进去”：小三角形轮廓贴合大三角形，但怎么都盖不满。",
        "记住：全等 = 形状大小都一样，能完全重合。"
      ],
      "examples": [
        {
          "text": "拼图：两块能严丝合缝拼上的拼图",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g04-u1-l1-p2"
    },
    {
      "id": "g04-u1-l1-p2",
      "title": "全等：能完全重合",
      "concept": "全等形、对应边、对应角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\triangle ABC \\cong \\triangle DEF",
          "translation": "三角形 ABC 全等于三角形 DEF：对应边相等、对应角相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两个全等三角形——对应边同色刻度，对应角同色弧线。",
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
                  "t": "arc",
                  "v": [
                    12,
                    62
                  ],
                  "a1": 298.2,
                  "a2": 0,
                  "r": 8,
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
                  "t": "arc",
                  "v": [
                    58,
                    62
                  ],
                  "a1": 298.2,
                  "a2": 0,
                  "r": 8,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "对应边同色，对应角同弧",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？上一页你把两个三角形叠到一起，严丝合缝——这就是全等。",
        "人话：全等，就是“能完全重合”——像复印机印出来的两张纸（全等形）。",
        "生活例：两扇一模一样的门；图形例：三边标记同色的两个三角形。",
        "反例：照片放大版，形状一样但大小不同——那叫相似，不是全等。",
        "对应边/角：叠上去压在一起的边和角，全书用同色标记。",
        "⚠️ 别搞混：全等是“重合”，相似是“同形”；全等要求大小也一样。",
        "把一个三角形“搬”过去盖住另一个——这个“搬”的动作，第 10 章会正名。",
        "记住一句话：全等要重合，相似只同形。"
      ],
      "examples": [
        {
          "text": "两扇一样的门；镜子内外翻折过去能重合，镜像也算全等",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l1-p1",
      "next": "g04-u1-l2-p1"
    }
  ]
};
