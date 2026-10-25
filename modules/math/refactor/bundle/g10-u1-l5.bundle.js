window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g10-u1-l5"] = {
  "lessonId": "g10-u1-l5",
  "lessonTitle": "旋转与中心对称",
  "chapterId": "g10",
  "pages": [
    {
      "id": "g10-u1-l5-p1",
      "title": "旋转步进器：几转回原样",
      "concept": "旋转是转的动作",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{旋转中心} + \\text{旋转方向} + \\text{旋转角度}",
          "translation": "讲清一次旋转：绕哪个点、往哪转、转多少度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：时针指着 12——准备转。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 26,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    74
                  ],
                  "color": "known",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "12 点",
                  "size": 14.48,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步：顺时针转 90°——时针指到 3。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 26,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    74
                  ],
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    72,
                    52
                  ],
                  "color": "known",
                  "width": 4
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 0,
                  "a2": 90,
                  "r": 14,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "转 90°",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 3 步：雪花登场——每次转 60°，转 1 次。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    74
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    31,
                    41
                  ],
                  "b": [
                    69,
                    63
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    31,
                    63
                  ],
                  "b": [
                    69,
                    41
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "转 1 次：60°",
                  "size": 14.48,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 4 步：转 6 次——回到原样！6×60°=360°。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    74
                  ],
                  "color": "corrA",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    31,
                    41
                  ],
                  "b": [
                    69,
                    63
                  ],
                  "color": "corrA",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    31,
                    63
                  ],
                  "b": [
                    69,
                    41
                  ],
                  "color": "corrA",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "转 6 次：回到原样！",
                  "size": 15,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "定格提问：雪花每次转 60°，转几次回到自己？（想好了点▶继续）",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    74
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    31,
                    41
                  ],
                  "b": [
                    69,
                    63
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    31,
                    63
                  ],
                  "b": [
                    69,
                    41
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
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "6 次？5 次？（不判对错，只记录）",
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
        "看第 4 步：雪花转 6 次回到原样——每次 60°，6×60°=360°，正好一圈。",
        "没变的是：转的过程中，雪花上每一点到中心的距离永远不变。",
        "旋转三要素缺一不可：绕哪个点（中心）、往哪转（方向）、转多少度（角度）。"
      ],
      "examples": [
        {
          "text": "钟表指针：绕表心顺时针转；旋转木马：绕中心转",
          "figure": "实物"
        }
      ],
      "prev": "g10-u1-l4-p3",
      "next": "g10-u1-l5-p2"
    },
    {
      "id": "g10-u1-l5-p2",
      "title": "旋转三要素：中心·方向·角度",
      "concept": "旋转三要素",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{旋转} \\Rightarrow \\text{形状大小不变}",
          "translation": "旋转不改变图形的形状和大小"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：同转 90°，绕 A 转和绕 B 转，落点完全不一样——中心不能缺。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      60
                    ],
                    [
                      45,
                      60
                    ],
                    [
                      35,
                      42
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    60
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    60
                  ],
                  "label": "B",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      60
                    ],
                    [
                      25,
                      40
                    ],
                    [
                      43,
                      50
                    ]
                  ],
                  "close": true,
                  "color": "corrA",
                  "width": 2.5,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      65,
                      60
                    ],
                    [
                      65,
                      40
                    ],
                    [
                      83,
                      50
                    ]
                  ],
                  "close": true,
                  "color": "corrB",
                  "width": 2.5,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "只说“转 90°”不够：绕谁转？",
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
        "还记得吗？雪花转 6 次回到原样——每次转 60°。",
        "旋转三要素：旋转中心（绕哪个点转，红点标出）、旋转方向（顺/逆时针）、旋转角度（转多少度）。",
        "缺一个，就说不清这次旋转。",
        "生活例：钟表指针（中心是表心，顺时针）、旋转木马、电风扇叶片。图形例：正方形绕中心转 90° 与自身重合。",
        "反例：只说“转了 90°”——绕 A 转还是绕 B 转？落点完全不一样（看配图）。",
        "⚠️ 别搞混：旋转不改变形状大小，但改变位置和朝向——和翻折（左右互换）不一样。",
        "记住一句话：中心方向角度，旋转三要素。"
      ],
      "examples": [
        {
          "text": "电风扇叶片：绕轴心转，中心·方向·角度都明确",
          "figure": "实物"
        },
        {
          "text": "❌ 只说“转 90°”：绕 A 和绕 B 落点完全不同",
          "figure": "反例图"
        }
      ],
      "prev": "g10-u1-l5-p1",
      "next": "g10-u1-l5-p3"
    },
    {
      "id": "g10-u1-l5-p3",
      "title": "转 180°：风车回到自己",
      "concept": "中心对称即旋转 180°",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{中心对称} = \\text{旋转} 180^{\\circ}",
          "translation": "中心对称就是绕一点旋转 180 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：四叶风车，中心 O（红点）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      52
                    ],
                    [
                      62,
                      64
                    ],
                    [
                      50,
                      76
                    ],
                    [
                      38,
                      64
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      52
                    ],
                    [
                      62,
                      40
                    ],
                    [
                      50,
                      28
                    ],
                    [
                      38,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3,
                  "opacity": 0.45
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
                }
              ]
            },
            {
              "caption": "第 2 步：转 90°——叶子位置变了，对不上原样。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      52
                    ],
                    [
                      62,
                      40
                    ],
                    [
                      50,
                      28
                    ],
                    [
                      38,
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
                      50,
                      52
                    ],
                    [
                      62,
                      64
                    ],
                    [
                      50,
                      76
                    ],
                    [
                      38,
                      64
                    ]
                  ],
                  "color": "known",
                  "width": 3,
                  "opacity": 0.45
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
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "转 90°：对不上",
                  "size": 14.48,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：转 180°（半圈）——和原来严丝合缝！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      52
                    ],
                    [
                      62,
                      64
                    ],
                    [
                      50,
                      76
                    ],
                    [
                      38,
                      64
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      52
                    ],
                    [
                      62,
                      40
                    ],
                    [
                      50,
                      28
                    ],
                    [
                      38,
                      40
                    ]
                  ],
                  "color": "known",
                  "width": 3.5,
                  "opacity": 0.45
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
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "转 180°：完全重合！",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：△ABC 绕 O 转 180° 得到 △A'B'C'，两者重合——这两个图形成中心对称。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      60
                    ],
                    [
                      48,
                      60
                    ],
                    [
                      39,
                      44
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      70,
                      44
                    ],
                    [
                      52,
                      44
                    ],
                    [
                      61,
                      60
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "aux",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    39,
                    52
                  ],
                  "b": [
                    61,
                    52
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
                  "text": "绕 O 转 180°，△ABC 与 △A'B'C' 重合",
                  "size": 13,
                  "color": "aux",
                  "math": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "看第 3 步：转半圈（180°），风车和原来“长”到了一起——这就是中心对称图形。",
        "第 4 步是两个图形的版本：一个绕 O 转 180° 与另一个重合——这两个图形成中心对称，O 叫对称中心。",
        "新名词认旧友：对称中心（就是风车转动的那个红点 O）。"
      ],
      "examples": [
        {
          "text": "方向盘转半圈：回到原样；扑克牌方块",
          "figure": "实物"
        }
      ],
      "prev": "g10-u1-l5-p2",
      "next": "g10-u1-l5-p4"
    },
    {
      "id": "g10-u1-l5-p4",
      "title": "中心对称：连线过中心被平分",
      "concept": "中心对称的性质",
      "formulas": [
        {
          "id": "f1",
          "latex": "OA = OA'",
          "translation": "对应点到对称中心的距离相等：OA 等于 OA'"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：对应点 A、A' 的连线经过 O，且 OA=OA'（两段同色等长刻度）。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    30,
                    60
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    70,
                    44
                  ],
                  "label": "A'",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "aux",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    60
                  ],
                  "b": [
                    50,
                    52
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    70,
                    44
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "连线过 O，且被 O 平分",
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
        "还记得吗？风车转半圈（180°），和原来严丝合缝。",
        "中心对称的性质：对应点连线都经过对称中心 O，且被 O 平分（OA=OA'）。",
        "找对称中心：连两组对应点，交点就是 O。",
        "生活例：扑克牌方块、方向盘转半圈。图形例：线段的中点、圆的圆心都是对称中心。",
        "反例：等腰三角形转 180° 合不上——它不是中心对称图形（但它是轴对称图形）。",
        "⚠️ 别搞混：“成中心对称”是两个图形的关系；“中心对称图形”是一个图形自己的事。",
        "记住一句话：转 180° 能重合，就是中心对称。"
      ],
      "examples": [
        {
          "text": "找对称中心：连两组对应点，交点就是 O",
          "figure": "作图"
        },
        {
          "text": "❌ 等腰三角形转 180° 合不上：不是中心对称图形",
          "figure": "反例图"
        }
      ],
      "prev": "g10-u1-l5-p3",
      "next": "g10-u1-l5-p5"
    },
    {
      "id": "g10-u1-l5-p5",
      "title": "彩蛋：平行四边形的正名",
      "concept": "平行四边形是中心对称图形",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{平行四边形} \\Rightarrow \\text{中心对称图形}",
          "translation": "平行四边形是中心对称图形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：g06.1.1 的老朋友——平行四边形 ABCD，O 是对角线交点。",
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
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    40
                  ],
                  "b": [
                    60,
                    68
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    40
                  ],
                  "b": [
                    20,
                    68
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    54
                  ],
                  "label": "O",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    88
                  ],
                  "text": "g06 说过：它转 180° 能重合",
                  "size": 13,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 2 步：绕 O 转 90°——位置变了。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      45,
                      32
                    ],
                    [
                      45,
                      72
                    ],
                    [
                      59,
                      62
                    ],
                    [
                      59,
                      42
                    ]
                  ],
                  "color": "known",
                  "width": 3,
                  "opacity": 0.7
                },
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
                  "color": "line",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    54
                  ],
                  "label": "O",
                  "color": "target",
                  "r": 5
                }
              ]
            },
            {
              "caption": "第 3 步：绕 O 转 180°——与原图严丝合缝！",
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
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    54
                  ],
                  "label": "O",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    16
                  ],
                  "text": "严丝合缝！",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：兑现 g06 的伏笔——平行四边形是中心对称图形，对称中心是对角线交点。",
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
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    40
                  ],
                  "b": [
                    60,
                    68
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    40
                  ],
                  "b": [
                    20,
                    68
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    54
                  ],
                  "label": "O",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    88
                  ],
                  "text": "对称中心：对角线交点",
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
        "g06.1.1 我们说过：平行四边形转 180° 能重合，当时只许看不许说——现在正名：它就是中心对称图形。",
        "对比雪花：每次 60° 转 6 次回原样；平行四边形每次 180°、转 2 次回原样——“几次回原样”看每次转的角度。",
        "对称中心是对角线交点 O：A 的对应点是 C，B 的对应点是 D，连线都过 O 且被 O 平分。",
        "这也是“对角线互相平分”的运动版说法——同一个事实，两种语言。"
      ],
      "examples": [
        {
          "text": "矩形、菱形、正方形：都是中心对称图形，对称中心都是对角线交点",
          "figure": "家族"
        }
      ],
      "prev": "g10-u1-l5-p4",
      "next": "g10-u1-l5-p6"
    },
    {
      "id": "g10-u1-l5-p6",
      "title": "找一找：中心对称图形",
      "concept": "辨认中心对称图形",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{转} 180^{\\circ} \\text{重合} \\Rightarrow \\text{中心对称图形}",
          "translation": "转 180 度能与自身重合的图形叫中心对称图形"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "是中心对称图形",
              "color": "corrA"
            },
            {
              "name": "不是中心对称图形",
              "color": "corrB"
            }
          ],
          "base": [
            {
              "t": "poly",
              "pts": [
                [
                  14,
                  62
                ],
                [
                  30,
                  62
                ],
                [
                  26,
                  78
                ],
                [
                  10,
                  78
                ]
              ],
              "color": "line",
              "width": 2.5
            },
            {
              "t": "circle",
              "c": [
                70,
                70
              ],
              "r": 12,
              "color": "line",
              "width": 2.5
            },
            {
              "t": "poly",
              "pts": [
                [
                  14,
                  26
                ],
                [
                  30,
                  26
                ],
                [
                  22,
                  40
                ]
              ],
              "color": "line",
              "width": 2.5
            },
            {
              "t": "seg",
              "a": [
                58,
                26
              ],
              "b": [
                82,
                40
              ],
              "color": "line",
              "width": 2.5
            },
            {
              "t": "txt",
              "p": [
                20,
                88
              ],
              "text": "①平行四边形",
              "size": 11.89,
              "color": "aux"
            },
            {
              "t": "txt",
              "p": [
                70,
                88
              ],
              "text": "②圆",
              "size": 11.89,
              "color": "aux"
            },
            {
              "t": "txt",
              "p": [
                22,
                48
              ],
              "text": "③等腰三角形",
              "size": 11.89,
              "color": "aux"
            },
            {
              "t": "txt",
              "p": [
                70,
                48
              ],
              "text": "④线段",
              "size": 11.89,
              "color": "aux"
            }
          ],
          "items": [
            {
              "id": "c1",
              "label": "①",
              "group": 0,
              "anchor": [
                20,
                70
              ],
              "shape": {
                "t": "circle",
                "c": [
                  20,
                  70
                ],
                "r": 13,
                "color": "line",
                "width": 1.5,
                "dash": "4,3"
              }
            },
            {
              "id": "c2",
              "label": "②",
              "group": 0,
              "anchor": [
                70,
                70
              ],
              "shape": {
                "t": "circle",
                "c": [
                  70,
                  70
                ],
                "r": 15,
                "color": "line",
                "width": 1.5,
                "dash": "4,3"
              }
            },
            {
              "id": "c3",
              "label": "③",
              "group": 1,
              "anchor": [
                22,
                32
              ],
              "shape": {
                "t": "circle",
                "c": [
                  22,
                  32
                ],
                "r": 11,
                "color": "line",
                "width": 1.5,
                "dash": "4,3"
              }
            },
            {
              "id": "c4",
              "label": "④",
              "group": 0,
              "anchor": [
                70,
                33
              ],
              "shape": {
                "t": "circle",
                "c": [
                  70,
                  33
                ],
                "r": 11,
                "color": "line",
                "width": 1.5,
                "dash": "4,3"
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "心里转 180°：哪个图形能和自己重合？点它，分进两篮。",
        "线段的对称中心是它的中点——别漏掉这个最不起眼的中心对称图形。",
        "等腰三角形为什么不是？转 180° 后尖角朝下，合不上原样。"
      ],
      "examples": [
        {
          "text": "答案：①②④ 是；③ 不是",
          "figure": "核对"
        }
      ],
      "prev": "g10-u1-l5-p5",
      "next": "g10-u1-l6-p1"
    }
  ]
};
