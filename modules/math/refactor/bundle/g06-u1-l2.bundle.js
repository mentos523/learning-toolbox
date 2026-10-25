window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g06-u1-l2"] = {
  "lessonId": "g06-u1-l2",
  "lessonTitle": "平行四边形的判定",
  "chapterId": "g06",
  "pages": [
    {
      "id": "g06-u1-l2-p1",
      "title": "四个条件，都能拼出来",
      "concept": "四种判定方法总览",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{满足任一条，就能断定是平行四边形}",
          "translation": "四条判定条件满足任意一条，就能断定它是平行四边形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "条件 Q1：两组对边分别平行——画两组平行线，围出来的就是平行四边形。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    30
                  ],
                  "b": [
                    85,
                    30
                  ],
                  "color": "corrA",
                  "width": 3,
                  "arrows": 1
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    70
                  ],
                  "b": [
                    75,
                    70
                  ],
                  "color": "corrA",
                  "width": 3,
                  "arrows": 1
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    20
                  ],
                  "b": [
                    30,
                    80
                  ],
                  "color": "corrB",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    20
                  ],
                  "b": [
                    80,
                    80
                  ],
                  "color": "corrB",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "Q1：两组对边分别平行",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "条件 Q2：两组对边分别相等——AB=CD、AD=BC 的四根木条，只能钉成平行四边形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    84,
                    28
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    68
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    68
                  ],
                  "b": [
                    24,
                    28
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "Q2：两组对边分别相等",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "条件 Q3：一组对边平行且相等——AB ∥ CD 且 AB=CD，另一组自动跟上。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    84,
                    28
                  ],
                  "arrows": 1,
                  "ticks": 1,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    68
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "arrows": 1,
                  "ticks": 1,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "Q3：一组对边平行且相等",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "条件 Q4：对角线互相平分——OA=OC、OB=OD，四个端点连起来就是平行四边形。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    48,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    48
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    48,
                    48
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    48
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "target",
                  "width": 3,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "Q4：对角线互相平分",
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
        "一步一步点：四个条件，每条都能“拼”出一个平行四边形。",
        "这是判定——给条件、断“身份”。和上一课反过来：上一课是已知平行四边形得结论。",
        "记住编号：Q1 两组对边平行；Q2 两组对边相等；Q3 一组平行且相等；Q4 对角线互相平分。"
      ],
      "examples": [
        {
          "text": "做木工：两组等长的木条钉四边形，只能钉成平行四边形",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l1-p5",
      "next": "g06-u1-l2-p2"
    },
    {
      "id": "g06-u1-l2-p2",
      "title": "判定1：两组对边分别平行",
      "concept": "判定1：两组对边分别平行（Q1）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{两组对边分别平行} \\Rightarrow \\text{平行四边形}",
          "translation": "两组对边分别平行，就能断定它是平行四边形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两组平行箭头——这是定义反过来用。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    84,
                    28
                  ],
                  "arrows": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    68
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "arrows": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "arrows": 2,
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    68
                  ],
                  "b": [
                    24,
                    28
                  ],
                  "arrows": 2,
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "定义反过来用",
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
        "这是最短的一条：定义反过来用。",
        "人话：两组对边都平行——那它就是平行四边形本人，定义说的。",
        "生活例：伸缩门每一节；图形例：两组平行箭头标记。",
        "反例：梯形只有一组对边平行——Q1 不通过。",
        "记住一句话：Q1 = 定义法，两组对边分别平行。"
      ],
      "examples": [
        {
          "text": "定义既是“身份证”，也是第一条判定",
          "figure": "方法"
        }
      ],
      "prev": "g06-u1-l2-p1",
      "next": "g06-u1-l2-p3"
    },
    {
      "id": "g06-u1-l2-p3",
      "title": "判定2：两组对边分别相等",
      "concept": "判定2：两组对边分别相等（Q2）",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB = CD, AD = BC \\Rightarrow \\text{平行四边形}",
          "translation": "两组对边分别相等，就能断定是平行四边形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两组等长刻度——虚线对角线是证明的“桥”。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    84,
                    28
                  ],
                  "ticks": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    68
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "ticks": 2,
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    68
                  ],
                  "b": [
                    24,
                    28
                  ],
                  "ticks": 2,
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "只看边相等，不看角",
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
        "人话：四条边，两两相对相等——不用量角，也能断定是平行四边形。",
        "生活例：四根木条两组等长，钉起来只能是平行四边形（想想第 g04 章三角形的稳定性）。",
        "图形例：同色刻度标记的两组对边；虚线对角线是证明要走的“桥”。",
        "反例：一组对边相等、另一组不相等——拼不成平行四边形。",
        "为什么可以？连对角线 AC：△ABC ≌ △CDA（SSS）。",
        "∠BAC=∠DCA（内错角相等）→ AB ∥ CD；同理 AD ∥ BC。",
        "两组对边平行 → Q1 → 是平行四边形。",
        "⚠️ 别搞混：Q2 只看“边相等”，不看角——别去量角。",
        "记住一句话：两组对边分别相等（Q2）。"
      ],
      "examples": [
        {
          "text": "四根木条钉相框：对边等长，框不会“塌”成别的形状",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l2-p2",
      "next": "g06-u1-l2-p4"
    },
    {
      "id": "g06-u1-l2-p4",
      "title": "判定3：一组对边平行且相等",
      "concept": "判定3：一组对边平行且相等（Q3）",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB \\parallel CD, AB = CD \\Rightarrow \\text{平行四边形}",
          "translation": "一组对边平行且相等，就能断定是平行四边形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：AB 与 CD 又有平行箭头、又有等长刻度——“平行”和“相等”必须在同一组对边上。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    84,
                    28
                  ],
                  "arrows": 1,
                  "ticks": 1,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    68
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "arrows": 1,
                  "ticks": 1,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "同一组对边：又平行又相等",
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
        "人话：一组对边又平行又相等——另一组对边会自动“跟上”。",
        "生活例：推拉门的一节：上下两根滑轨平行等长。",
        "图形例：AB 与 CD 又有平行箭头、又有等长刻度。",
        "反例：等腰梯形——一组对边平行、另一组对边（两腰）相等，但“平行”和“相等”不在同一组对边上，所以不是平行四边形！",
        "为什么可以？连 AC：∠BAC=∠DCA（内错角相等）。",
        "△ABC ≌ △CDA（SAS）→ BC=AD。",
        "两组对边分别相等 → Q2 → 是平行四边形。",
        "⚠️ 别搞混：必须是同一组对边“又平行又相等”——拆开到两组上就不行（见反例）。",
        "记住一句话：一组对边平行且相等（Q3）。"
      ],
      "examples": [
        {
          "text": "传送带：两条平行等长的边带着货物走直线",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l2-p3",
      "next": "g06-u1-l2-p5"
    },
    {
      "id": "g06-u1-l2-p5",
      "title": "判定4：对角线互相平分",
      "concept": "判定4：对角线互相平分（Q4）",
      "formulas": [
        {
          "id": "f1",
          "latex": "OA = OC, OB = OD \\Rightarrow \\text{平行四边形}",
          "translation": "对角线互相平分，就能断定是平行四边形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：OA=OC、OB=OD——四个端点连起来，必是平行四边形。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    48,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    48
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    48,
                    48
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    48
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    48,
                    48
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "端点连线，必是平行四边形",
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
        "人话：两条对角线互相平分——四个端点连起来，必是平行四边形。",
        "生活例：两根木条中点钉在一起，转一转，四个端点永远围成平行四边形。",
        "图形例：OA=OC、OB=OD 刻度标记。",
        "反例：对角线不互相平分的四边形——Q4 不通过。",
        "为什么可以？∠AOB=∠COD（对顶角相等）。",
        "△AOB ≌ △COD（SAS）→ AB=CD；同理 AD=CB。",
        "两组对边分别相等 → Q2 → 是平行四边形。",
        "记住一句话：对角线互相平分（Q4）。"
      ],
      "examples": [
        {
          "text": "做风筝：两根竹条中点对中点绑紧，骨架不歪",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l2-p4",
      "next": "g06-u1-l3-p1"
    }
  ]
};
