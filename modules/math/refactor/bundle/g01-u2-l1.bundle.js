window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g01-u2-l1"] = {
  "lessonId": "g01-u2-l1",
  "lessonTitle": "角的概念、表示与度量",
  "chapterId": "g01",
  "pages": [
    {
      "id": "g01-u2-l1-p1",
      "title": "射线转一转，角就出来了",
      "concept": "角的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle AOB",
          "translation": "角 AOB：顶点是 O，两条边是 OA 和 OB"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：一条射线 OA，端点是 O。",
              "shapes": [
                {
                  "t": "ray",
                  "p": [
                    50,
                    50
                  ],
                  "ang": 90,
                  "len": 35,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "O"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "射线 OA",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：射线绕 O 转起来——转过的张开程度，就是角。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    50,
                    85
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    80,
                    50
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 0,
                  "a2": 90,
                  "r": 12,
                  "color": "corrAngle"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "O"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "转一转",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：这就是角 ∠AOB：顶点 O，两条边 OA 和 OB。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    50,
                    85
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    80,
                    50
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    50
                  ],
                  "a1": 0,
                  "a2": 90,
                  "r": 12,
                  "color": "corrAngle"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "O"
                },
                {
                  "t": "txt",
                  "p": [
                    63,
                    68
                  ],
                  "text": "∠AOB",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "顶点 O，两条边 OA、OB",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "一条射线 OA，绕端点 O 转起来——转过的“张开程度”就是角。",
        "角有两部分：顶点 O（转动的中心），两条边 OA、OB。",
        "生活例：剪刀开合——刀刃就是角的两条边。",
        "转得越大，角越大——角的大小看“张开”，不看边的长短。"
      ],
      "examples": [
        {
          "text": "钟表：时针和分针也在不停地“转角”",
          "figure": "实物"
        }
      ],
      "prev": "g01-u1-l3-p2",
      "next": "g01-u2-l1-p2"
    },
    {
      "id": "g01-u2-l1-p2",
      "title": "角的 4 种写法",
      "concept": "角的表示法",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle AOB = \\angle O = \\angle 1 = \\angle \\alpha",
          "translation": "同一个角的四种写法（∠O 只在顶点处只有一个角时可用）"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：同一个角的 4 种写法——∠AOB、∠O、∠1、∠α。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    45,
                    62
                  ],
                  "b": [
                    20,
                    80
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    62
                  ],
                  "b": [
                    70,
                    80
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    45,
                    62
                  ],
                  "a1": 35.8,
                  "a2": 144.2,
                  "r": 12,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    90
                  ],
                  "text": "∠AOB",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    18,
                    58
                  ],
                  "text": "∠O",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    58
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    86,
                    74
                  ],
                  "text": "∠α",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "4 种写法：∠AOB（顶点 O 写中间，最保险）、∠O（顶点处只有一个角时）、∠1、∠α。",
        "⚠️ 别写错：∠ABO 不行！顶点字母必须写在中间——∠AOB 的顶点是 O。",
        "图形例：图上标了∠1 的角，也可以叫∠AOB——写法不同，意思一样。",
        "反例：弯月形不是角——角的两条边必须是射线，弯的不行。"
      ],
      "examples": [],
      "prev": "g01-u2-l1-p1",
      "next": "g01-u2-l1-p3"
    },
    {
      "id": "g01-u2-l1-p3",
      "title": "拿起量角器，自己量一量",
      "concept": "用量角器度量角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle AOB = 60^{\\circ}",
          "translation": "角 AOB 等于 60 度"
        }
      ],
      "interaction": {
        "type": "angle-protractor",
        "params": {
          "angle": 60,
          "vertex": {
            "x": 50,
            "y": 56,
            "label": "O"
          },
          "dir1": 180,
          "rayLabels": [
            "A",
            "B"
          ],
          "tolerance": 2
        }
      },
      "auxInteraction": null,
      "hints": [
        "把量角器整个拖过去：中心对准顶点 O 就行——它只会平移，不用转。",
        "读数不用看刻度：角是多大，读数区就自动算出多大。",
        "拖射线上的蓝点可以改变角的大小——看读数跟着变；量角器动不动都不影响角。",
        "中心贴上顶点就“落定”了：闪一下加圆环扩散，读数区显示“已对准 ✓”，这个角就是 60°。"
      ],
      "examples": [
        {
          "text": "量完点右下角 ↺，可以再来一次",
          "figure": "操作"
        }
      ],
      "prev": "g01-u2-l1-p2",
      "next": "g01-u2-l1-p4"
    },
    {
      "id": "g01-u2-l1-p4",
      "title": "度、分、秒：角度的时分秒",
      "concept": "角度单位；周角、平角、直角",
      "formulas": [
        {
          "id": "f1",
          "latex": "1^{\\circ} = 60', 1' = 60''",
          "translation": "1 度等于 60 分，1 分等于 60 秒"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：转一圈 360°，转半圈 180°，转四分之一圈 90°。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    25,
                    55
                  ],
                  "r": 12,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    32
                  ],
                  "text": "周角 360°",
                  "size": 12
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    55
                  ],
                  "b": [
                    75,
                    55
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    40
                  ],
                  "text": "平角 180°",
                  "size": 12
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    70
                  ],
                  "b": [
                    84,
                    50
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    60
                  ],
                  "b": [
                    97,
                    60
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    84,
                    60
                  ],
                  "p": [
                    84,
                    50
                  ],
                  "q": [
                    97,
                    60
                  ],
                  "size": 6,
                  "color": "line"
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    38
                  ],
                  "text": "直角 90°",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "角度单位：度（°）、分（′）、秒（″）——1°=60′，1′=60″，和时间的时分秒一个脾气。",
        "转一圈：周角=360°；转半圈：平角=180°；转四分之一圈：直角=90°。",
        "生活例：披萨切 4 块，每块圆心角 90°；切 6 块，每块 60°。",
        "⚠️ 别搞混：1°=60′，不是 100′——角度是六十进制。",
        "换算例：37.5°=37°30′（0.5°×60=30′）。"
      ],
      "examples": [],
      "prev": "g01-u2-l1-p3",
      "next": "g01-u2-l2-p1"
    }
  ]
};
