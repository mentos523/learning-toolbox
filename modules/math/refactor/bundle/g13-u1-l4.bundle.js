window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g13-u1-l4"] = {
  "lessonId": "g13-u1-l4",
  "lessonTitle": "直线方程",
  "chapterId": "g13",
  "pages": [
    {
      "id": "g13-u1-l4-p1",
      "title": "k、b 两个旋钮",
      "concept": "斜截式中 k、b 的作用",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = kx + b",
          "translation": "y 等于 k 乘 x 加 b"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：基准 y=x——k=1，b=0。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    75,
                    80
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "y = x（k=1, b=0）",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：转 k 旋钮——y=2x，更陡了。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    75,
                    80
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    50,
                    80
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "y = 2x（k 变大，更陡）",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：转 b 旋钮——y=x+2，整体上移。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    75,
                    80
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    46
                  ],
                  "b": [
                    65,
                    86
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    94
                  ],
                  "text": "y = x + 2（b 变大，上移）",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 4 步：b=0——直线过原点，起点高度是 0。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    75,
                    80
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    30
                  ],
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "b = 0：过原点",
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
        "两个旋钮：k 管“陡不陡”，b 管“高不高”。",
        "看第 4 步：b=0，直线过原点——起点高度是 0。"
      ],
      "examples": [
        {
          "text": "调台灯：旋钮调角度（k）、调高低（b）",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l3-p4",
      "next": "g13-u1-l4-p2"
    },
    {
      "id": "g13-u1-l4-p2",
      "title": "斜截式：y=kx+b",
      "concept": "斜截式",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = kx + b",
          "translation": "斜截式：k 是斜率，b 是截距"
        },
        {
          "id": "f2",
          "latex": "y = 2x + 1, k = 2, b = 1",
          "translation": "例：y = 2x + 1，斜率 2，截距 1"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：y=2x+1——k=2（陡），b=1（从 (0,1) 出发）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    38
                  ],
                  "b": [
                    60,
                    88
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    38
                  ],
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    36,
                    38
                  ],
                  "text": "(0, 1)",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "k=2 是坡度，b=1 是起点",
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
        "人话版：k 是“坡度”（上一课的老朋友），b 是“起点高度”——x=0 时 y=b，直线从 (0,b) 出发。",
        "生活例：打车计价 y=2x+8——起步价 8 元就是 b，每公里 2 元就是 k（回链代数 6.2.2）。",
        "反例：y=x²+b 不是直线——k 必须乘在 x 的“一次”上，x² 是抛物线的地盘。",
        "分工：k、b 的计算（数的部分）回代数 6.2.2 复习；这里只看“形”：k 管陡，b 管高。",
        "记住一句话：k 是坡度，b 是起点。"
      ],
      "examples": [
        {
          "text": "手机套餐：月租 b 元，每分钟 k 元",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l4-p1",
      "next": "g13-u1-l4-p3"
    },
    {
      "id": "g13-u1-l4-p3",
      "title": "点斜式：过一点、有斜率，直线被锁死",
      "concept": "点斜式",
      "formulas": [
        {
          "id": "f1",
          "latex": "y - y_0 = k(x - x_0)",
          "translation": "点斜式：过点 (x₀, y₀)、斜率为 k 的直线"
        },
        {
          "id": "f2",
          "latex": "y - 3 = 2(x - 1)",
          "translation": "例：过 (1, 3)、k=2：y − 3 = 2(x − 1)"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：点 P(1, 3) 钉死，k 一转，直线绕 P 转——但永远过 P。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    45,
                    55
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 6
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    67
                  ],
                  "text": "P(1, 3) 钉死",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    35
                  ],
                  "b": [
                    65,
                    75
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    55
                  ],
                  "b": [
                    65,
                    55
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    35,
                    75
                  ],
                  "b": [
                    55,
                    35
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
                  "text": "k 定了，直线就转不动了",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "人话版：告诉你“经过哪一点”和“有多陡”，直线就被“锁死”了——动不了。",
        "例题：过 (1, 3)、k=2：y−3=2(x−1)，展开就是 y=2x+1——点斜式和斜截式是同一条直线的两种说法。",
        "别小看：点斜式不是“斜截式的变形”——它是“已知一点一斜率”这个条件的直接翻译。",
        "记住一句话：一点一斜率，锁死一条线。"
      ],
      "examples": [
        {
          "text": "钉钉子：钉住一点再定方向，木条就固定了",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l4-p2",
      "next": "g13-u1-l4-p4"
    },
    {
      "id": "g13-u1-l4-p4",
      "title": "例题：两点定直线",
      "concept": "直线方程例题",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2x + 1",
          "translation": "过 A(1,3)、B(4,9) 的直线是 y = 2x + 1"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：标出 A(1, 3)、B(4, 9)。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    35,
                    50
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    62
                  ],
                  "text": "A(1, 3)",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    86
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    94
                  ],
                  "text": "B(4, 9)",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 2 步：先算斜率 k=(9−3)/(4−1)=2。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    35,
                    50
                  ],
                  "label": "A",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    86
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    35,
                    50
                  ],
                  "b": [
                    65,
                    86
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    32
                  ],
                  "text": "k = (9−3)/(4−1) = 2",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：写点斜式 y−3=2(x−1)。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    40
                  ],
                  "b": [
                    75,
                    90
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    35,
                    50
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "y − 3 = 2(x − 1)",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：化简 y=2x+1；把 B 代入验算：9=2×4+1 ✓。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    25,
                    40
                  ],
                  "b": [
                    75,
                    90
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    86
                  ],
                  "label": "B",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "y = 2x + 1",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "9 = 2×4 + 1 ✓",
                  "size": 13,
                  "color": "corrA"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "三步走：先算斜率 k，再写点斜式，最后化简成斜截式。",
        "第 4 步验算：把 B(4, 9) 代进去，9=2×4+1 ✓——点在直线上，方程就没错。"
      ],
      "examples": [
        {
          "text": "两点定直线：先求坡度，再定起点",
          "figure": "方法"
        }
      ],
      "prev": "g13-u1-l4-p3",
      "next": "g13-u1-l5-p1"
    }
  ]
};
