window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g07-u1-l1"] = {
  "lessonId": "g07-u1-l1",
  "lessonTitle": "圆的基本概念",
  "chapterId": "g07",
  "pages": [
    {
      "id": "g07-u1-l1-p1",
      "title": "圆规画圆：轨迹就是圆",
      "concept": "圆的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{圆上每一点到圆心}O\\text{的距离} = r",
          "translation": "圆：到定点 O 距离等于定长 r 的点的轨迹"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：定一个点 O——圆心。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    40
                  ],
                  "text": "圆心 O",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：圆规张开 r——针脚到笔尖的距离固定。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "target",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    52
                  ],
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    61
                  ],
                  "text": "半径 r",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：圆规转一圈——笔尖留下的轨迹就是圆。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
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
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    52
                  ],
                  "color": "target",
                  "r": 4
                }
              ]
            },
            {
              "caption": "第 4 步：轨迹上每一点到 O 的距离都是 r——三条半径刻度相同。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
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
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    35,
                    78
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    22
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "都等于 r",
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
        "看第 3 步：圆规转一圈，笔尖走过的轨迹——闭合、首尾相接，这就是圆。",
        "注意第 4 步：三条半径都画了 1 道刻度——它们长度都相等。",
        "记住：圆不是“圆盘”，是那条“线”（下一页讲圆 vs 圆面）。"
      ],
      "examples": [
        {
          "text": "圆规画圆：针脚是圆心，两脚张开的距离是半径",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g07-u1-l1-p2"
    },
    {
      "id": "g07-u1-l1-p2",
      "title": "圆的“全家福”：六个名字",
      "concept": "圆心、半径、弦、直径、弧、半圆",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{直径} = 2\\text{半径}",
          "translation": "直径是半径的两倍：d = 2r"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格 1：圆心、半径、弦、直径。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
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
                    65,
                    78
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    22.5,
                    64
                  ],
                  "b": [
                    77.5,
                    64
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    50,
                    22
                  ],
                  "color": "corrC",
                  "width": 3,
                  "ticks": 2
                },
                {
                  "t": "txt",
                  "p": [
                    13,
                    64
                  ],
                  "text": "A",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    82,
                    64
                  ],
                  "text": "B",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    14
                  ],
                  "text": "C",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    90
                  ],
                  "text": "D",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    72
                  ],
                  "text": "半径",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    72
                  ],
                  "text": "弦",
                  "size": 13,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    40
                  ],
                  "text": "直径",
                  "size": 13,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    36
                  ],
                  "text": "圆心 O",
                  "size": 13
                }
              ]
            },
            {
              "caption": "定格 2：弧、半圆——圆上两点之间的一段。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 23.6,
                  "a2": 90,
                  "r": 35,
                  "color": "target",
                  "width": 4.5
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    52
                  ],
                  "a1": 90,
                  "a2": 270,
                  "r": 35,
                  "color": "corrA",
                  "width": 3,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    77.5,
                    64
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    82
                  ],
                  "label": "C",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    82
                  ],
                  "text": "劣弧",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    11,
                    52
                  ],
                  "text": "半圆",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    13
                  ],
                  "text": "弧：圆上两点之间的一段",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得上一页的圆规吗？针脚扎的点叫圆心 O，针脚到笔尖的距离叫半径 r。",
        "人话定义组：圆心（O）→半径（r）→弦（圆上两点的连线）→直径（过圆心的弦）→弧（圆上两点间的一段）→半圆（一半的弧）。",
        "生活例：自行车轮——轴是圆心，辐条是半径，轮胎是圆。",
        "图形例：看定格图——弦 AB 不过圆心；直径 CD 过圆心，是最长的弦。",
        "反例（下页细讲）：圆 ≠ 圆面——圆是“圈”，圆面是“饼”。",
        "⚠️ 别搞混：半径相等 ⇔ 同圆或等圆；直径是最大的弦（为什么？第 6 课考你）。",
        "记住一句话：圆上所有点到圆心距离相等——这是圆的“身份证”。"
      ],
      "examples": [
        {
          "text": "车轮：轴心 O、辐条 r、外胎就是圆",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l1-p1",
      "next": "g07-u1-l1-p3"
    },
    {
      "id": "g07-u1-l1-p3",
      "title": "圆 vs 圆面：圈和饼",
      "concept": "圆与圆面",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{圆} \\neq \\text{圆面}",
          "translation": "圆是那条圈，圆面是圈加里面的饼"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "圆",
              "caption": "圆：只有一条“圈”——数学里说的圆，指的就是这条线。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "只有圈",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "圆面",
              "caption": "圆面：圈 + 里面涂满——像一张饼，算面积时才用它。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 4,
                  "fill": "known",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "圈 + 里面的饼",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点“圆”：只有一条圈——数学里“圆”指的就是这条线。",
        "点“圆面”：圈 + 里面涂满——这是“饼”，叫圆面（以后算面积才用）。",
        "生活例：呼啦圈是圆，烧饼是圆面；铁环滚的是圆，车轮压的是圆面。",
        "结论 1：同一个圆（或相等的圆）里，所有半径都相等——圆规张开的角度没变。",
        "结论 2：直径是圆里最长的弦——任何弦都不超过 2r（g05 勾股定理能证）。",
        "记住一句话：说“圆”时想“圈”，说“圆面”时想“饼”。"
      ],
      "examples": [
        {
          "text": "呼啦圈 vs 烧饼：一个是圈，一个是饼",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l1-p2",
      "next": "g07-u1-l2-p1"
    }
  ]
};
