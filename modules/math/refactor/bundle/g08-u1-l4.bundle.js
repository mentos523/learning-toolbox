window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g08-u1-l4"] = {
  "lessonId": "g08-u1-l4",
  "lessonTitle": "三角形的外接圆与内切圆",
  "chapterId": "g08",
  "pages": [
    {
      "id": "g08-u1-l4-p1",
      "title": "三角形“套”进圆",
      "concept": "外接圆；外心",
      "formulas": [
        {
          "id": "f1",
          "latex": "OA = OB = OC",
          "translation": "外心 O 到三角形三个顶点的距离相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：画 △ABC。",
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
                      55,
                      78
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    30
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    75,
                    30
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    78
                  ],
                  "label": "C",
                  "color": "known",
                  "r": 4
                }
              ]
            },
            {
              "caption": "第 2 步：作 AB、BC 的垂直平分线，交于 O。",
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
                      55,
                      78
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    20
                  ],
                  "b": [
                    50,
                    90
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    39.4
                  ],
                  "b": [
                    90,
                    64.4
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    47.75
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "垂直平分线的交点 O",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 3 步：以 O 为圆心、OA 为半径画圆——恰好经过 B 和 C。",
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
                      55,
                      78
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    47.75
                  ],
                  "r": 30.66,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    47.75
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    30
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    75,
                    30
                  ],
                  "label": "B",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    78
                  ],
                  "label": "C",
                  "color": "target",
                  "r": 4
                }
              ]
            },
            {
              "caption": "第 4 步：定格——OA=OB=OC，O 到三个顶点一样远。",
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
                      55,
                      78
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    47.75
                  ],
                  "r": 30.66,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    47.75
                  ],
                  "b": [
                    25,
                    30
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    47.75
                  ],
                  "b": [
                    75,
                    30
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    47.75
                  ],
                  "b": [
                    55,
                    78
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "ticks": 1
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    47.75
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "OA=OB=OC",
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
        "看第 2 帧：AB、BC 的垂直平分线交于 O——交点到 A、B、C 一样远。",
        "以 O 为圆心、OA 为半径画圆——恰好经过 B 和 C：三角形被“套”进了圆。",
        "这个圆叫外接圆，O 叫外心——它是三边垂直平分线的交点（下一页讲透）。"
      ],
      "examples": [
        {
          "text": "三个顶点恰好落在一个圆上",
          "figure": "图形"
        }
      ],
      "prev": "g08-u1-l3-p4",
      "next": "g08-u1-l4-p2"
    },
    {
      "id": "g08-u1-l4-p2",
      "title": "外心与外接圆",
      "concept": "外心；外接圆",
      "formulas": [
        {
          "id": "f1",
          "latex": "OA = OB = OC",
          "translation": "外心 O 到三角形三个顶点的距离相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "外心：三边垂直平分线的交点——到顶点等距。",
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
                      55,
                      78
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    47.75
                  ],
                  "r": 30.66,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    47.75
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "外心：三边垂直平分线交点",
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
        "还记得吗？两条垂直平分线的交点 O，到 A、B、C 的距离都一样——没变的是：OA=OB=OC。",
        "三角形三个顶点正好落在一个圆上，这个圆叫外接圆；圆心 O 叫外心——它是三条边垂直平分线的交点。",
        "生活例：三人站成三角形，找一点到三人等距——站外心上。",
        "图形例：锐角外心在形内；反例：钝角外心在形外，直角外心在斜边中点。",
        "⚠️ 别搞混：外心是“垂直平分线”的交点（找边的中点），不是“角平分线”的交点——一字之差，点就跑偏了。",
        "记住一句话：外心——三边垂直平分线交点，到顶点等距。"
      ],
      "examples": [
        {
          "text": "三人站三角形，找等距点站外心上",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l4-p1",
      "next": "g08-u1-l4-p3"
    },
    {
      "id": "g08-u1-l4-p3",
      "title": "圆“塞”进三角形",
      "concept": "内切圆；内心",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{内心}I\\text{到三边距离相等}",
          "translation": "内心 I 到三角形三条边的距离都相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：画 △ABC。",
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
                      55,
                      75
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    20,
                    30
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    30
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    75
                  ],
                  "label": "C",
                  "color": "known",
                  "r": 4
                }
              ]
            },
            {
              "caption": "第 2 步：作 ∠A、∠B 的角平分线，交于 I。",
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
                      55,
                      75
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    70,
                    54.45
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    30
                  ],
                  "b": [
                    30,
                    59.4
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    52.77,
                    46.02
                  ],
                  "label": "I",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    14
                  ],
                  "text": "角平分线的交点 I",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 3 步：过 I 作 BC 的垂线，垂足为 D。",
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
                      55,
                      75
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    52.77,
                    46.02
                  ],
                  "label": "I",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    52.77,
                    46.02
                  ],
                  "b": [
                    66.77,
                    53.8
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    66.77,
                    53.8
                  ],
                  "label": "D",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "right",
                  "v": [
                    66.77,
                    53.8
                  ],
                  "p": [
                    52.77,
                    46.02
                  ],
                  "q": [
                    80,
                    30
                  ],
                  "size": 6,
                  "color": "corrAngle"
                }
              ]
            },
            {
              "caption": "第 4 步：以 I 为圆心、ID 为半径画圆——与三边都相切。",
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
                      55,
                      75
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    52.77,
                    46.02
                  ],
                  "r": 16.02,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    52.77,
                    46.02
                  ],
                  "label": "I",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    90
                  ],
                  "text": "I 到三边距离相等",
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
        "看第 2 帧：∠A、∠B 的角平分线交于 I——交点到三边一样远。",
        "过 I 作 BC 的垂线，垂足为 D，以 ID 为半径画圆——圆与三边都相切：圆被“塞”进了三角形。",
        "这个圆叫内切圆，I 叫内心——它是三角平分线的交点（下一页讲透）。"
      ],
      "examples": [
        {
          "text": "三角盒里塞最大的圆形饼干",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l4-p2",
      "next": "g08-u1-l4-p4"
    },
    {
      "id": "g08-u1-l4-p4",
      "title": "内心与内切圆",
      "concept": "内心；内切圆",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{内心}I\\text{到三边距离相等}",
          "translation": "内心 I 到三角形三条边的距离都相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "内心：三角平分线的交点——到三边等距。",
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
                      55,
                      75
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    52.77,
                    46.02
                  ],
                  "r": 16.02,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    52.77,
                    46.02
                  ],
                  "label": "I",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    90
                  ],
                  "text": "内心：三角平分线交点",
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
        "还记得吗？两条角平分线的交点 I，到三边的距离都一样——没变的是：到三边距离相等。",
        "一个圆和三角形三条边都相切（每边只碰一下），这个圆叫内切圆；圆心 I 叫内心——它是三个角平分线的交点。",
        "生活例：三角盒塞最大圆饼干——边刚好碰三条边；图形例：ID⊥BC，ID 就是内切圆半径。",
        "反例：以边中点为圆心画圆，一般不与三边都相切——内心用角平分线找。",
        "⚠️ 别搞混：内心是“角平分线”交点（分角），外心是“垂直平分线”交点（找边的中点）——名字里都有“心”，找法完全不同。",
        "记住一句话：内心——三角平分线交点，到三边等距。"
      ],
      "examples": [
        {
          "text": "三角盒里塞最大的圆形饼干",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l4-p3",
      "next": "g08-u1-l4-p5"
    },
    {
      "id": "g08-u1-l4-p5",
      "title": "外心 vs 内心",
      "concept": "外心与内心的对比",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{外心:到顶点等距；内心:到三边等距}",
          "translation": "外心到三个顶点距离相等，内心到三条边距离相等"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "外心·外接圆",
              "caption": "外心：三边垂直平分线的交点；圆经过三个顶点；锐角在形内、直角在斜边中点、钝角在形外。",
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
                      55,
                      78
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    47.75
                  ],
                  "r": 30.66,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    47.75
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "圆“包”着三角形",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "label": "内心·内切圆",
              "caption": "内心：三角平分线的交点；圆与三边相切；内心永远在三角形内部。",
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
                      55,
                      75
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    52.77,
                    46.02
                  ],
                  "r": 16.02,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    52.77,
                    46.02
                  ],
                  "label": "I",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    90
                  ],
                  "text": "三角形“包”着圆",
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
        "点“外心”看：圆“包”着三角形——圆经过三个顶点。",
        "点“内心”看：三角形“包”着圆——圆与三边都相切。",
        "记住一句话：外心管顶点（到顶点等距），内心管边（到三边等距）。"
      ],
      "examples": [],
      "prev": "g08-u1-l4-p4",
      "next": "g08-u1-l5-p1"
    }
  ]
};
