window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g13-u1-l6"] = {
  "lessonId": "g13-u1-l6",
  "lessonTitle": "抛物线的几何定义",
  "chapterId": "g13",
  "pages": [
    {
      "id": "g13-u1-l6-p1",
      "title": "焦点离准线越远，抛物线越“胖”",
      "concept": "抛物线形状与焦点准线",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{到焦点距离} = \\text{到准线距离}",
          "translation": "抛物线上每一点，到焦点的距离等于到准线的距离"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：标准抛物线——焦点 F，准线 l。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    34
                  ],
                  "b": [
                    80,
                    34
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    34
                  ],
                  "text": "l",
                  "size": 13
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      68
                    ],
                    [
                      50,
                      60
                    ],
                    [
                      60,
                      68
                    ],
                    [
                      70,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    66
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "焦点 F，准线 l",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：F 靠近准线——抛物线变“瘦高”。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    44
                  ],
                  "b": [
                    80,
                    44
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    44
                  ],
                  "text": "l",
                  "size": 13
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      38,
                      88
                    ],
                    [
                      46,
                      66
                    ],
                    [
                      50,
                      62
                    ],
                    [
                      54,
                      66
                    ],
                    [
                      62,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    58
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "F 靠近 l：瘦高",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：F 远离准线——抛物线变“矮胖”。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    24
                  ],
                  "b": [
                    80,
                    24
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    24
                  ],
                  "text": "l",
                  "size": 13
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      88
                    ],
                    [
                      38,
                      70
                    ],
                    [
                      50,
                      66
                    ],
                    [
                      62,
                      70
                    ],
                    [
                      76,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    74
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "F 远离 l：矮胖",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 4 步：P 在抛物线上——PF 与 P 到准线的垂线段等长。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    34
                  ],
                  "b": [
                    80,
                    34
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    34
                  ],
                  "text": "l",
                  "size": 13
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      68
                    ],
                    [
                      50,
                      60
                    ],
                    [
                      60,
                      68
                    ],
                    [
                      70,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    66
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    68
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    68
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    68
                  ],
                  "b": [
                    60,
                    34
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "两段一样长：等距",
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
        "第 4 步：P 到 F 的线段和 P 到准线的垂线段，刻度一样——等距。",
        "焦点动一动，抛物线跟着变“胖瘦”——形状被焦点和准线“锁死”。"
      ],
      "examples": [
        {
          "text": "探照灯反射面、手电筒反光碗：抛物线",
          "figure": "实物"
        }
      ],
      "prev": "g13-u1-l5-p4",
      "next": "g13-u1-l6-p2"
    },
    {
      "id": "g13-u1-l6-p2",
      "title": "抛物线的出生证明",
      "concept": "抛物线的几何定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{到}F\\text{的距离} = \\text{到}l\\text{的距离}",
          "translation": "抛物线：到焦点 F 的距离等于到准线 l 的距离的点的轨迹"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：焦点 F、准线 l、动点 P——两段等长。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    34
                  ],
                  "b": [
                    80,
                    34
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    34
                  ],
                  "text": "准线 l",
                  "size": 13
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      68
                    ],
                    [
                      50,
                      60
                    ],
                    [
                      60,
                      68
                    ],
                    [
                      70,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    66
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    42,
                    66
                  ],
                  "text": "焦点",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    60,
                    68
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    68
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    68
                  ],
                  "b": [
                    60,
                    34
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    92
                  ],
                  "text": "PF = P 到准线的距离",
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
        "人话版：抛物线不是“长这样的”，而是“这么来的”——到一个定点和一条定直线等距的点，走出来的轨迹。",
        "新名词：定点叫焦点（F），定直线叫准线（l）——记住这两个名字，后面推导全靠它们。",
        "点题：代数 7.1 给的是“长相公式” y=ax²，几何给的是“出生证明”——同一条抛物线，两种说法。",
        "分工：二次函数图像的性质（数的部分）回代数 7.1 复习；这里只看“形”：等距的轨迹。",
        "记住一句话：抛物线，到焦准等距的轨迹。"
      ],
      "examples": [
        {
          "text": "出生证明 vs 长相公式：同一条抛物线，两种定义",
          "figure": "方法"
        }
      ],
      "prev": "g13-u1-l6-p1",
      "next": "g13-u1-l6-p3"
    },
    {
      "id": "g13-u1-l6-p3",
      "title": "慢放推导：从等距到 y=ax²",
      "concept": "抛物线方程推导",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 = 4py \\Rightarrow y = ax^2",
          "translation": "化简得 x² = 4py，记 a = 1/(4p)，就得到 y = ax²"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "焦点 F(0, p)，准线 l：y = −p",
          "goal": "y = ax²，a = 1/(4p)",
          "steps": [
            {
              "card": "设轨迹上任意一点 P(x, y)——“任意”就是“每一”。",
              "reason": "设点法：轨迹方程就是“轨迹上每一点的坐标都满足的式子”",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    30
                  ],
                  "text": "l: y=−p",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    70
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    70
                  ],
                  "text": "F(0, p)",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    66,
                    58
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    58
                  ],
                  "text": "P(x, y)",
                  "size": 12,
                  "color": "target"
                }
              ]
            },
            {
              "card": "PF 用距离公式算，到准线的距离是垂线段。",
              "reason": "距离公式（本课 1.2）；点到直线的距离是垂线段（g02.1.3）",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    70
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    66,
                    58
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    66,
                    58
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    70
                  ],
                  "text": "PF=√[x²+(y−p)²]",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "seg",
                  "a": [
                    66,
                    58
                  ],
                  "b": [
                    66,
                    30
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    44
                  ],
                  "text": "|y+p|",
                  "size": 13,
                  "color": "corrA"
                }
              ]
            },
            {
              "card": "等距列等式：√[x²+(y−p)²] = |y+p|。",
              "reason": "抛物线定义：到焦点距离 = 到准线距离（本课 P2）",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    50,
                    70
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    66,
                    58
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "seg",
                  "a": [
                    66,
                    58
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    66,
                    58
                  ],
                  "b": [
                    66,
                    30
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "√[x²+(y−p)²] = |y+p|",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "card": "两边平方、展开：x²+y²−2py+p² = y²+2py+p²。",
              "reason": "等式两边平方去根号；完全平方展开",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    62
                  ],
                  "text": "x² + (y−p)² = (y+p)²",
                  "size": 15,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    44
                  ],
                  "text": "x²+y²−2py+p² = y²+2py+p²",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "平方去根号，展开",
                  "size": 12
                }
              ]
            },
            {
              "card": "约掉 y² 和 p²：x²=4py，记 a=1/(4p)，得 y=ax²。",
              "reason": "合并同类项；等式变形",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      68
                    ],
                    [
                      50,
                      60
                    ],
                    [
                      60,
                      68
                    ],
                    [
                      70,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    40
                  ],
                  "text": "x² = 4py",
                  "size": 15,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "y = ax²（a = 1/(4p)）",
                  "size": 16,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "设轨迹上任意点 P(x, y)",
              "reason": "设点法"
            },
            {
              "statement": "PF=√[x²+(y−p)²]，到准线距离 |y+p|",
              "reason": "距离公式（本课 1.2）"
            },
            {
              "statement": "列等式：√[x²+(y−p)²]=|y+p|",
              "reason": "抛物线定义（本课 P2）"
            },
            {
              "statement": "平方展开：x²+y²−2py+p²=y²+2py+p²",
              "reason": "去根号；完全平方"
            },
            {
              "statement": "化简得 y=ax²（a=1/(4p)）",
              "reason": "合并同类项"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "三问：已知？求证？第 2 步 PF 凭什么这么算？（距离公式，本课 1.2）",
        "关键动作：第 4 步“两边平方”去根号——这是把“形”翻译成“数”的常规操作。"
      ],
      "examples": [
        {
          "text": "出生证明变长相公式：等距的轨迹就是 y=ax²",
          "figure": "方法"
        }
      ],
      "prev": "g13-u1-l6-p2",
      "next": "g13-u1-l6-p4"
    },
    {
      "id": "g13-u1-l6-p4",
      "title": "y=ax² 的“出生”复盘",
      "concept": "抛物线方程中 a 的几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = ax^2, a = \\frac{1}{4p}",
          "translation": "y = ax²，其中 a = 1/(4p)：p 决定开口宽窄"
        },
        {
          "id": "f2",
          "latex": "p \\text{越大，开口越宽}",
          "translation": "焦点离准线越远（p 越大），抛物线开口越宽"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：p=0.5、1、2——a=0.5、0.25、0.125，开口越来越宽。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      88
                    ],
                    [
                      47,
                      68
                    ],
                    [
                      50,
                      64
                    ],
                    [
                      53,
                      68
                    ],
                    [
                      60,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    88
                  ],
                  "text": "p=0.5",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      68
                    ],
                    [
                      50,
                      60
                    ],
                    [
                      60,
                      68
                    ],
                    [
                      70,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    68
                  ],
                  "text": "p=1",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      88
                    ],
                    [
                      36,
                      70
                    ],
                    [
                      50,
                      64
                    ],
                    [
                      64,
                      70
                    ],
                    [
                      80,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    84,
                    88
                  ],
                  "text": "p=2",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "p 越大，a 越小，开口越宽",
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
        "复盘：焦点 F(0,p)、准线 y=−p，推出 y=ax²，a=1/(4p)——a 藏着 p 的信息。",
        "人话版：p 是“焦点到准线距离的一半”；p 越大，a 越小，开口越宽——和 P1 交互看到的一样。",
        "呼应：代数 7.1 的 y=ax² 现在有了“出生证明”——它是对称轴为 y 轴、顶点在原点的抛物线。",
        "记住一句话：a=1/(4p)，p 定宽窄。"
      ],
      "examples": [
        {
          "text": "a 不是神秘数字：它是焦点位置的“密码”",
          "figure": "方法"
        }
      ],
      "prev": "g13-u1-l6-p3",
      "next": "g13-u1-l6-p5"
    },
    {
      "id": "g13-u1-l6-p5",
      "title": "例题：已知焦点写方程",
      "concept": "抛物线方程例题",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = \\frac{1}{8}x^2",
          "translation": "焦点 (0,2)、准线 y=−2 的抛物线方程是 y = x²/8"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：焦点 F(0, 2)、准线 y=−2——读出 p=2。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "txt",
                  "p": [
                    86,
                    30
                  ],
                  "text": "y=−2",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    70
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    70
                  ],
                  "text": "F(0, 2)",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "p = 2",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：a=1/(4×2)=1/8。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    60
                  ],
                  "text": "a = 1/(4p) = 1/8",
                  "size": 16,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    44
                  ],
                  "text": "p=2 代入",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：方程 y=x²/8。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      88
                    ],
                    [
                      40,
                      68
                    ],
                    [
                      50,
                      60
                    ],
                    [
                      60,
                      68
                    ],
                    [
                      70,
                      88
                    ]
                  ],
                  "close": false,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    40
                  ],
                  "text": "y = x²/8",
                  "size": 16,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：验算——点 (4, 2)：到 F 距离 4，到准线距离 4 ✓。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    70
                  ],
                  "label": "F",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    66,
                    70
                  ],
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    70
                  ],
                  "text": "(4, 2)",
                  "size": 12
                },
                {
                  "t": "seg",
                  "a": [
                    66,
                    70
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    66,
                    70
                  ],
                  "b": [
                    66,
                    30
                  ],
                  "color": "corrA",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "4 = 4 ✓ 在抛物线上",
                  "size": 13,
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
        "三步走：读出 p，算出 a=1/(4p)，写出 y=ax²。",
        "第 4 步验算：(4, 2) 到焦点的距离和到准线的距离都是 4——在抛物线上，方程没错。"
      ],
      "examples": [
        {
          "text": "已知焦点/准线 → p → a → 方程",
          "figure": "方法"
        }
      ],
      "prev": "g13-u1-l6-p4",
      "next": "g13-u1-l7-p1"
    }
  ]
};
