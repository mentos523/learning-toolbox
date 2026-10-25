window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g02-u1-l2"] = {
  "lessonId": "g02-u1-l2",
  "lessonTitle": "垂线",
  "chapterId": "g02",
  "pages": [
    {
      "id": "g02-u1-l2-p1",
      "title": "三角板推一推：画垂线",
      "concept": "垂线的三角板画法",
      "formulas": [
        {
          "id": "f1",
          "latex": "a \\perp b",
          "translation": "a 垂直于 b：相交成 90 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：直线 l，和直线外一点 A。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    42
                  ],
                  "b": [
                    88,
                    42
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    42
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    72
                  ],
                  "r": 3.5,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    74
                  ],
                  "text": "A",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：三角板的一条直角边靠紧直线 l。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    42
                  ],
                  "b": [
                    88,
                    42
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    42
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      28,
                      42
                    ],
                    [
                      60,
                      42
                    ],
                    [
                      60,
                      72
                    ]
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    60,
                    42
                  ],
                  "p": [
                    28,
                    42
                  ],
                  "q": [
                    60,
                    72
                  ],
                  "size": 6,
                  "color": "aux"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    72
                  ],
                  "r": 3.5,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    74
                  ],
                  "text": "A",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：沿着直线推三角板，直到另一条直角边经过点 A。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    42
                  ],
                  "b": [
                    88,
                    42
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    42
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      42
                    ],
                    [
                      50,
                      42
                    ],
                    [
                      50,
                      72
                    ]
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    42
                  ],
                  "p": [
                    18,
                    42
                  ],
                  "q": [
                    50,
                    72
                  ],
                  "size": 6,
                  "color": "aux"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    72
                  ],
                  "r": 3.5,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    74
                  ],
                  "text": "A",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "推到这里",
                  "size": 13,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 4 步：沿这条直角边画线——过 A 的垂线画好了，交点处是直角。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    42
                  ],
                  "b": [
                    88,
                    42
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    42
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    72
                  ],
                  "b": [
                    50,
                    42
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    42
                  ],
                  "p": [
                    12,
                    42
                  ],
                  "q": [
                    50,
                    72
                  ],
                  "size": 7,
                  "color": "target"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    72
                  ],
                  "r": 3.5,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    74
                  ],
                  "text": "A",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "垂足",
                  "size": 13,
                  "color": "target"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点 ▶：看三角板怎么“推”出一条垂线。",
        "关键动作：一条直角边贴紧直线，沿着直线推，让另一条直角边“逮住”点 A。",
        "画出的线和直线 l 交于直角——这就是垂直，记作 a ⊥ b。",
        "尺规版的画法我们留到第 4 章（g04.1.7），那里圆规上场。"
      ],
      "examples": [
        {
          "text": "装修：用三角板检验墙面和地面是否垂直",
          "figure": "实物"
        }
      ],
      "prev": "g02-u1-l1-p3",
      "next": "g02-u1-l2-p2"
    },
    {
      "id": "g02-u1-l2-p2",
      "title": "垂直：相交成了 90°",
      "concept": "垂直的定义与唯一性",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{过一点有且只有一条直线与已知直线垂直}",
          "translation": "过一点，只能画出一条和已知直线垂直的直线"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：过 A 的垂线只有这一条——转到别的位置，就不是 90° 了。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    42
                  ],
                  "b": [
                    88,
                    42
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    42
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    72
                  ],
                  "b": [
                    50,
                    42
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    34,
                    64
                  ],
                  "b": [
                    66,
                    56
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    42
                  ],
                  "p": [
                    12,
                    42
                  ],
                  "q": [
                    50,
                    72
                  ],
                  "size": 7,
                  "color": "target"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    72
                  ],
                  "r": 3.5,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    74
                  ],
                  "text": "A",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "转到这里就不是 90° 了",
                  "size": 12,
                  "color": "aux"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "上一页你推过三角板：当两条直线相交成 90°，就叫垂直（互相垂直），记作 a ⊥ b，读作“a 垂直于 b”。",
        "交点叫垂足——垂线“落”到直线上的那个点。",
        "过一点有且只有一条直线和已知直线垂直：转动画笔试试——穿过 A 的直线转一圈，只有转到 90° 那一下才“垂直”。",
        "生活例：墙角和地面；书桌的桌腿和桌面；红绿灯杆和地面。",
        "反例：两条直线斜着交叉（比如 60°）——相交了，但不垂直。垂直必须是 90°。",
        "⚠️ 别搞混：“相交”不等于“垂直”；垂直是相交里最特殊的一种——成直角。",
        "记住一句话：垂直就是 90° 的相交。"
      ],
      "examples": [],
      "prev": "g02-u1-l2-p1",
      "next": "g02-u1-l3-p1"
    }
  ]
};
