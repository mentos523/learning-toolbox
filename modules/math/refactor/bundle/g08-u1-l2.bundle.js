window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g08-u1-l2"] = {
  "lessonId": "g08-u1-l2",
  "lessonTitle": "切线的判定与性质",
  "chapterId": "g08",
  "pages": [
    {
      "id": "g08-u1-l2-p1",
      "title": "交点二合一：切线诞生",
      "concept": "切线的直观：相交→相切",
      "formulas": [
        {
          "id": "f1",
          "latex": "l \\perp OA，A\\text{在圆}O\\text{上} \\Rightarrow l\\text{是切线}",
          "translation": "过半径外端 A 且垂直于半径 OA 的直线 l，是圆的切线"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": true,
          "steps": [
            {
              "caption": "第 1 帧：直线 l 斜穿圆，交于 M、N 两点——这是相交。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 25,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    62.6
                  ],
                  "b": [
                    88,
                    47.4
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    27,
                    59.6
                  ],
                  "label": "M",
                  "color": "line",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    75,
                    50
                  ],
                  "label": "N",
                  "color": "line",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    27,
                    59.6
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                }
              ]
            },
            {
              "caption": "第 2 帧：直线 l 转动，M、N 越靠越近。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 25,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    81
                  ],
                  "b": [
                    85,
                    67
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    46.3,
                    74.7
                  ],
                  "label": "M",
                  "color": "line",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    63,
                    71.4
                  ],
                  "label": "N",
                  "color": "line",
                  "r": 4
                }
              ]
            },
            {
              "caption": "第 3 帧：M、N 合成一点 A——只剩一个交点，且 OA⊥l（直角方块出现了）。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 25,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    75
                  ],
                  "b": [
                    85,
                    75
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    50,
                    75
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    75
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    75
                  ],
                  "p": [
                    50,
                    50
                  ],
                  "q": [
                    85,
                    75
                  ],
                  "size": 6,
                  "color": "corrAngle"
                }
              ]
            },
            {
              "caption": "第 4 帧：定格——过半径外端 A、且垂直于半径 OA 的直线 l，就是圆的切线。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 25,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    75
                  ],
                  "b": [
                    85,
                    75
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    50,
                    75
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    75
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    75
                  ],
                  "p": [
                    50,
                    50
                  ],
                  "q": [
                    85,
                    75
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "过外端、垂直半径 ⇒ 是切线",
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
        "看第 3 帧：两个交点“合”成一个的瞬间，直线刚好和半径垂直——这就是相切的“诞生时刻”。"
      ],
      "examples": [
        {
          "text": "刀切西瓜：刀刃只碰瓜皮一点",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l1-p4",
      "next": "g08-u1-l2-p2"
    },
    {
      "id": "g08-u1-l2-p2",
      "title": "切线的判定：查两证",
      "concept": "切线的判定定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "l \\perp OA，A\\text{在圆}O\\text{上} \\Rightarrow l\\text{是切线}",
          "translation": "判定定理：直线过半径的外端且垂直于半径，则它是切线"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "判定两证：① 过半径的外端 A；② 垂直于半径 OA。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 26,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    16,
                    78
                  ],
                  "b": [
                    84,
                    78
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    78
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    78
                  ],
                  "p": [
                    50,
                    52
                  ],
                  "q": [
                    84,
                    78
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "①过外端 ②垂直半径",
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
        "还记得吗？上一页第 3 帧——两个交点合成一个的瞬间，直线刚好垂直于半径。",
        "想判断一条直线是不是切线？查两个“身份证”：① 经过半径的外端（点在圆上）；② 垂直于这条半径。都对上，它就是切线。",
        "生活例：刀切西瓜——刀刃只碰瓜皮一点；图形例：l 过 A 且 l⊥OA→l 是切线。",
        "反例：直线垂直于半径但垂足在圆内——它穿过圆是相交，“过外端”不能丢！",
        "⚠️ 别搞混：垂足必须落在圆上（外端）——落在圆内/圆外都不算，“垂直”一个条件不够。",
        "记住一句话：判定查两证——过外端、垂直半径。"
      ],
      "examples": [
        {
          "text": "刀切西瓜：刀刃只碰瓜皮一点",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l2-p1",
      "next": "g08-u1-l2-p3"
    },
    {
      "id": "g08-u1-l2-p3",
      "title": "切线的性质：必垂直",
      "concept": "切线的性质定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "l\\text{是圆}O\\text{的切线}，A\\text{为切点} \\Rightarrow l \\perp OA",
          "translation": "性质定理：切线垂直于过切点的半径"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "已知 l 是切线、A 是切点——则 OA⊥l，一定垂直。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 26,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    16,
                    78
                  ],
                  "b": [
                    84,
                    78
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    78
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    78
                  ],
                  "p": [
                    50,
                    52
                  ],
                  "q": [
                    84,
                    78
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "是切线 ⇒ 必垂直",
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
        "上一页是“因为垂直，所以是切线”——这一页反过来：“因为是切线，所以垂直”。",
        "已经知道一条直线是切线，它一定垂直于过切点的那条半径——切点是唯一的交点，半径是圆心到切点的连线，它们互相垂直。",
        "生活例：车轮与地面——接触点处地面垂直于车轴到接触点的连线；图形例：l 切圆 O 于 A，连 OA 则 OA⊥l。",
        "反例：过切点画不垂直于 OA 的直线——它扎进圆里变相交，不再是切线。",
        "⚠️ 别搞混：判定和性质是“因为”“所以”换了位置——判定：因为垂直，所以是切线；性质：因为是切线，所以垂直。别背反了。",
        "记住一句话：切线必垂直于过切点的半径。"
      ],
      "examples": [
        {
          "text": "车轮与地面：接触点处地面垂直于半径",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l2-p2",
      "next": "g08-u1-l2-p4"
    },
    {
      "id": "g08-u1-l2-p4",
      "title": "例题：证明它是切线",
      "concept": "用判定定理证明切线",
      "formulas": [
        {
          "id": "f1",
          "latex": "d = 5 = r \\Rightarrow \\text{直线}l\\text{与圆}O\\text{相切}",
          "translation": "圆心到直线的距离等于半径：直线 l 与圆 O 相切"
        },
        {
          "id": "f2",
          "latex": "OA \\perp l，A\\text{在圆上} \\Rightarrow l\\text{是切线}",
          "translation": "满足判定两条件：过外端且垂直于半径，是切线"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：读题标已知——r=5，O 到 l 的距离 d=5。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 28,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    24
                  ],
                  "b": [
                    86,
                    24
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    24
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "已知：r=5，d=5",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步：比大小——d=r，直线 l 与圆只有一个公共点 A。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 28,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    24
                  ],
                  "b": [
                    86,
                    24
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    24
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "d=r：只有一个交点 A",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：连半径 OA——O 到 l 的垂线段，垂足 A 在圆上。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 28,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    24
                  ],
                  "b": [
                    86,
                    24
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    24
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    24
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    24
                  ],
                  "p": [
                    50,
                    52
                  ],
                  "q": [
                    86,
                    24
                  ],
                  "size": 6,
                  "color": "corrAngle"
                }
              ]
            },
            {
              "caption": "第 4 步：对照判定两证——过外端 ✓、垂直半径 ✓，l 是切线。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 28,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    24
                  ],
                  "b": [
                    86,
                    24
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    24
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    24
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    24
                  ],
                  "p": [
                    50,
                    52
                  ],
                  "q": [
                    86,
                    24
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "过外端 ✓ 垂直半径 ✓ ⇒ 是切线",
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
        "读题标已知：r=5，O 到 l 的距离 d=5——标成蓝色。",
        "比大小：d=r——直线 l 与圆只有一个公共点 A（相切）。",
        "连半径 OA（O 到 l 的垂线段，垂足 A 在圆上）——OA⊥l 且 A 是外端。",
        "对照判定两证：过外端 ✓、垂直半径 ✓——l 是切线。"
      ],
      "examples": [],
      "prev": "g08-u1-l2-p3",
      "next": "g08-u1-l3-p1"
    }
  ]
};
