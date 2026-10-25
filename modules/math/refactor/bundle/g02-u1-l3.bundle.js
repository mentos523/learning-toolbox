window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g02-u1-l3"] = {
  "lessonId": "g02-u1-l3",
  "lessonTitle": "点到直线的距离",
  "chapterId": "g02",
  "pages": [
    {
      "id": "g02-u1-l3-p1",
      "title": "点向直线跳：哪条路最短？",
      "concept": "垂线段最短",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{垂线段最短}",
          "translation": "从点到直线的所有线段里，垂直的那条最短"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：点 A，直线 l。A 想“跳”到 l 上。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    88,
                    30
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    30
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    78
                  ],
                  "r": 4,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    80
                  ],
                  "text": "A",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：三条路都能到——中间那条是垂直的。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    88,
                    30
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    30
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    78
                  ],
                  "b": [
                    50,
                    30
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    78
                  ],
                  "b": [
                    30,
                    30
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    78
                  ],
                  "b": [
                    70,
                    30
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    30
                  ],
                  "p": [
                    12,
                    30
                  ],
                  "q": [
                    50,
                    78
                  ],
                  "size": 6,
                  "color": "target"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    78
                  ],
                  "r": 4,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    80
                  ],
                  "text": "A",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：量一量——垂直的那条最短，斜的路都更长。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    88,
                    30
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    30
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    78
                  ],
                  "b": [
                    30,
                    30
                  ],
                  "color": "known",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    78
                  ],
                  "b": [
                    70,
                    30
                  ],
                  "color": "known",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    78
                  ],
                  "b": [
                    50,
                    30
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    30
                  ],
                  "p": [
                    12,
                    30
                  ],
                  "q": [
                    50,
                    78
                  ],
                  "size": 6,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    54
                  ],
                  "text": "最短",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    78
                  ],
                  "r": 4,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    80
                  ],
                  "text": "A",
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
        "点 ▶：A 向直线 l 跳过去，三条路摆在面前。",
        "中间垂直的那条，叫垂线段——从点 A 出发、垂直于 l 的线段。",
        "量一量：垂线段最短，斜的都更长——这就是“垂线段最短”。",
        "下一页：点到直线的“距离”，指的就是这条垂线段的长度。"
      ],
      "examples": [
        {
          "text": "跳远：从起跳线垂直量到落点",
          "figure": "实物"
        }
      ],
      "prev": "g02-u1-l2-p2",
      "next": "g02-u1-l3-p2"
    },
    {
      "id": "g02-u1-l3-p2",
      "title": "点到直线的距离",
      "concept": "点到直线的距离",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{点到直线的距离} = \\text{垂线段的长度}",
          "translation": "点到直线的距离就是垂线段的长度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：A 到 l 的距离，就是垂线段的长度——只认垂直那条。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    88,
                    30
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    90,
                    30
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    78
                  ],
                  "b": [
                    50,
                    30
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    30
                  ],
                  "p": [
                    12,
                    30
                  ],
                  "q": [
                    50,
                    78
                  ],
                  "size": 6,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    54
                  ],
                  "text": "距离",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    78
                  ],
                  "r": 4,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    80
                  ],
                  "text": "A",
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
        "还记得跳远吗？A 到直线 l 的“距离”，就是垂线段的长度——垂直的那条有多长，距离就是多少。",
        "点到直线的距离：直线外一点到这条直线的垂线段的长度。",
        "生活例：跳远成绩——量的是起跳线到落点的垂直距离；过马路走斑马线最短。",
        "反例：斜着量过去的那段——再长也不是“距离”。距离只认垂线段。",
        "⚠️ 别搞混：“距离”是长度（一个数），“垂线段”是线段（一段线）——问距离要答数。",
        "记住一句话：距离看垂线段，量的是长度。"
      ],
      "examples": [],
      "prev": "g02-u1-l3-p1",
      "next": "g02-u1-l4-p1"
    }
  ]
};
