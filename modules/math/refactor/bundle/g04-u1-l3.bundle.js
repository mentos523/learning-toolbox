window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g04-u1-l3"] = {
  "lessonId": "g04-u1-l3",
  "lessonTitle": "SAS 判定",
  "chapterId": "g04",
  "pages": [
    {
      "id": "g04-u1-l3-p1",
      "title": "夹角一固定，三角形被“锁死”",
      "concept": "两边夹角定形状",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{两边及夹角对应相等} \\Rightarrow \\text{全等}",
          "translation": "两边和它们的夹角对应相等，两个三角形就全等（SAS）"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：两条边 AB、AC，中间夹着角 ∠A。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    40,
                    60
                  ],
                  "b": [
                    24,
                    36
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    40,
                    60
                  ],
                  "b": [
                    66,
                    42
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    40,
                    60
                  ],
                  "label": "A",
                  "color": "known"
                },
                {
                  "t": "arc",
                  "v": [
                    40,
                    60
                  ],
                  "a1": 236.3,
                  "a2": 325.3,
                  "r": 11,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    76
                  ],
                  "text": "两边 + 夹角",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：夹角张大一点，B、C 的位置全变了。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    40,
                    60
                  ],
                  "b": [
                    24,
                    36
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    40,
                    60
                  ],
                  "b": [
                    70,
                    30
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    36
                  ],
                  "b": [
                    70,
                    30
                  ],
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "arc",
                  "v": [
                    40,
                    60
                  ],
                  "a1": 236.3,
                  "a2": 315,
                  "r": 11,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    76
                  ],
                  "text": "角一变，形就变",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：夹角固定回原样，B、C 只能这样连——锁死了。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      60
                    ],
                    [
                      24,
                      36
                    ],
                    [
                      66,
                      42
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "arc",
                  "v": [
                    40,
                    60
                  ],
                  "a1": 236.3,
                  "a2": 325.3,
                  "r": 11,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    76
                  ],
                  "text": "角一定，形一定",
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
        "看第 2 步：夹角一张大，整个三角形全变了样。",
        "看第 3 步：夹角固定，第三条边只能有一种接法——被“锁死”。",
        "这就是边角边：两边夹角定了，形状就定了。"
      ],
      "examples": [
        {
          "text": "剪刀：两臂长度固定，开合角定了，刀尖距离就定了",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l2-p3",
      "next": "g04-u1-l3-p2"
    },
    {
      "id": "g04-u1-l3-p2",
      "title": "SAS：两边夹角，锁死形状",
      "concept": "边角边判定",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB=DE,\\ \\angle A=\\angle D,\\ AC=DF \\Rightarrow \\triangle ABC \\cong \\triangle DEF",
          "translation": "两边和夹角对应相等，两个三角形全等，记作 SAS"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两组对应边同色，中间的夹角同弧——SAS。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      62
                    ],
                    [
                      44,
                      62
                    ],
                    [
                      30,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    62
                  ],
                  "b": [
                    44,
                    62
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    44,
                    62
                  ],
                  "b": [
                    30,
                    34
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    44,
                    62
                  ],
                  "a1": 180,
                  "a2": 243.4,
                  "r": 9,
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
                      74,
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
                    74,
                    34
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    88,
                    62
                  ],
                  "a1": 180,
                  "a2": 243.4,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "SAS：边角边",
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
        "还记得吗？两条边夹着角固定，第三条边只能有一种接法——锁死了。",
        "人话：两边加它们中间的角，三角形就定了——边角边，简称 SAS。",
        "生活例：做衣架——两边长度和夹角定了，衣架的形状就定了。",
        "反例：两边加一个“不在中间”的角——B、C 还能有别的接法，锁不死。",
        "⚠️ 别搞混：这个角必须是两条边的“夹角”，位置不能乱。",
        "记住一句话：两边夹角，锁死形状。"
      ],
      "examples": [
        {
          "text": "衣架：两边夹角固定，形状就定了",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l3-p1",
      "next": "g04-u1-l4-p1"
    }
  ]
};
