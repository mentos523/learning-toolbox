window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g09-u1-l1"] = {
  "lessonId": "g09-u1-l1",
  "lessonTitle": "比例线段",
  "chapterId": "g09",
  "pages": [
    {
      "id": "g09-u1-l1-p1",
      "title": "两条线段，同一个分法",
      "concept": "成比例线段",
      "formulas": [
        {
          "id": "f1",
          "latex": "a:b = c:d",
          "translation": "a 比 b 等于 c 比 d"
        },
        {
          "id": "f2",
          "latex": "\\frac{a}{b} = \\frac{c}{d}",
          "translation": "a 除以 b 等于 c 除以 d"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：线段 AB 被点 P 按 1:2 切开——短的是长的二分之一。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    35
                  ],
                  "b": [
                    90,
                    35
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    36.7,
                    35
                  ],
                  "label": "P",
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    8,
                    42
                  ],
                  "text": "A",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    92,
                    42
                  ],
                  "text": "B",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    23,
                    26
                  ],
                  "text": "1 份",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    63,
                    26
                  ],
                  "text": "2 份",
                  "size": 12,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步：另一条线段 CD，也按 1:2 切开。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    35
                  ],
                  "b": [
                    90,
                    35
                  ],
                  "color": "line",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    10,
                    62
                  ],
                  "b": [
                    90,
                    62
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    36.7,
                    62
                  ],
                  "label": "Q",
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    8,
                    69
                  ],
                  "text": "C",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    92,
                    69
                  ],
                  "text": "D",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    23,
                    53
                  ],
                  "text": "1 份",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    63,
                    53
                  ],
                  "text": "2 份",
                  "size": 12,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：两条线段的“分法“一样——a:b = c:d，这就叫成比例线段。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    35
                  ],
                  "b": [
                    90,
                    35
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    36.7,
                    35
                  ],
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    10,
                    62
                  ],
                  "b": [
                    90,
                    62
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    36.7,
                    62
                  ],
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "a : b = c : d = 1 : 2",
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
        "一条线段按 1:2 切开，另一条也按 1:2 切开——切法一样，就是成比例。",
        "a:b = c:d：四个数里，前两个的比等于后两个的比。",
        "照片放大就是这回事：长和宽都按同一个比变，人脸才不变形。"
      ],
      "examples": [
        {
          "text": "照片放大：长宽按同一比例变",
          "figure": "交互"
        },
        {
          "text": "地图比例尺：图上 1cm = 实际 1km",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g09-u1-l1-p2"
    },
    {
      "id": "g09-u1-l1-p2",
      "title": "a:b=c:d：比例线段",
      "concept": "成比例线段的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "a:b = c:d",
          "translation": "a 比 b 等于 c 比 d"
        },
        {
          "id": "f2",
          "latex": "\\frac{a}{b} = \\frac{c}{d}",
          "translation": "a 除以 b 等于 c 除以 d"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：两条线段都按 1:2 切——分法相同，就是成比例线段。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    35
                  ],
                  "b": [
                    90,
                    35
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    36.7,
                    35
                  ],
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    23,
                    26
                  ],
                  "text": "2",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    63,
                    26
                  ],
                  "text": "4",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    10,
                    62
                  ],
                  "b": [
                    90,
                    62
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    36.7,
                    62
                  ],
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    23,
                    53
                  ],
                  "text": "3",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    63,
                    53
                  ],
                  "text": "6",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "2:4 = 3:6",
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
        "还记得吗？你刚看到两条线段都按 1:2 切——切法一样，就是成比例线段。",
        "成比例线段，就是“分法相同”的线段：a:b = c:d，读作 a 比 b 等于 c 比 d。",
        "生活例：同一张底片洗出的 1 寸和 6 寸照片，长宽比相同。图形例：2:4 = 3:6，这四条线段成比例。",
        "反例：一条按 1:2 切、另一条按 1:3 切——分法不同，不成比例。",
        "⚠️ 别搞混：a:b = c:d 写成分数是 a/b = c/d，分子分母别写反（a 除以 b，不是 b 除以 a）。",
        "记住一句话：比例是“分法相同”；代数 ch03 的分式就是它——“缩放比一样才不变形”。"
      ],
      "examples": [
        {
          "text": "照片缩放：缩放比一样才不变形",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l1-p1",
      "next": "g09-u1-l1-p3"
    },
    {
      "id": "g09-u1-l1-p3",
      "title": "细心的你发现了吗：黄金分割",
      "concept": "黄金分割",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{\\text{长段}}{\\text{全长}} = \\frac{\\text{短段}}{\\text{长段}} \\approx 0.618",
          "translation": "长段比全长等于短段比长段，约等于 0.618"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：全长按 0.618 切——长段:全长 = 短段:长段，这就是黄金分割。（本页可折叠收起）",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    50
                  ],
                  "b": [
                    90,
                    50
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    59.4,
                    50
                  ],
                  "label": "G",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    41
                  ],
                  "text": "长段",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    75,
                    41
                  ],
                  "text": "短段",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "0.618",
                  "size": 15,
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
        "把线段分成两段：长段与全长的比，等于短段与长段的比——这个比约 0.618，叫黄金分割。",
        "生活例：人的肚脐大致把身高按黄金分割；五角星的边也藏着它。反例：随手一分（比如 1:1 对半）不是黄金分割。",
        "记住一句话：黄金分割是“最耐看的切法”——大自然和建筑都在偷偷用它。"
      ],
      "examples": [
        {
          "text": "五角星、肚脐与身高",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l1-p2",
      "next": "g09-u1-l2-p1"
    }
  ]
};
