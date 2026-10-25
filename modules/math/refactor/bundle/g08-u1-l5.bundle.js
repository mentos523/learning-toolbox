window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g08-u1-l5"] = {
  "lessonId": "g08-u1-l5",
  "lessonTitle": "圆的方程：x²+y²=r²",
  "chapterId": "g08",
  "pages": [
    {
      "id": "g08-u1-l5-p1",
      "title": "圆也能写成一个式子？",
      "concept": "圆的方程 x²+y²=r²",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 + y^2 = r^2",
          "translation": "圆的方程：圆上每一点的坐标 (x,y) 都满足它"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "autoplay": true,
          "steps": [
            {
              "caption": "第 1 步：建系——圆心在原点 O，半径 r=5。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    44
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    54,
                    88
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "圆心 O(0,0)，r=5",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 2 步：点 P 在 (5,0)——5²+0²=25=r² ✓。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
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
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    50
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "(5,0)：5²+0²=25 ✓",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：点 P 转到 (3,4)——3²+4²=9+16=25=r² ✓。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    68,
                    74
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    68,
                    74
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "(3,4)：9+16=25 ✓",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：点 P 转到 (0,5)——0²+5²=25 ✓。不管转到哪，x²+y² 永远 = 25。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    50,
                    80
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    80
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "x²+y² 永远 = 25",
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
        "看动画：点 P 在圆上转圈，坐标一直在变——但 x²+y² 永远等于 25。",
        "不变量徽章：没变的是——动点到原点的距离 = r。",
        "一个圆，一个式子——这就是圆的方程（下一页看它怎么来的）。"
      ],
      "examples": [
        {
          "text": "广播站覆盖范围：到基站等距的边界",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l4-p5",
      "next": "g08-u1-l5-p2"
    },
    {
      "id": "g08-u1-l5-p2",
      "title": "圆的方程怎么来的",
      "concept": "用距离公式推导圆的方程",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\sqrt{(x-0)^2 + (y-0)^2} = r",
          "translation": "圆上点 P(x,y) 到原点 O 的距离等于半径 r（距离公式）"
        },
        {
          "id": "f2",
          "latex": "x^2 + y^2 = r^2",
          "translation": "两边平方：圆上每一点的坐标都满足这个方程"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：设——圆心在原点 O，半径 r，P(x,y) 是圆上任意一点。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    68,
                    74
                  ],
                  "label": "P(x,y)",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    68,
                    74
                  ],
                  "color": "target",
                  "width": 2.5
                }
              ]
            },
            {
              "caption": "第 2 步：列式——PO = r，用距离公式写出来。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    68,
                    74
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "√[(x−0)²+(y−0)²] = r",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：平方化简——(x−0)²+(y−0)²=r²，即 x²+y²=r²。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "x²+y² = r²",
                  "size": 16,
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
        "还记得吗？g05.1.6 我们亲手“造”出了两点间距离公式——今天用它来“造”圆的方程。",
        "设圆心在原点 O，半径 r，P(x,y) 是圆上任意一点，PO=r。",
        "用距离公式：√[(x−0)²+(y−0)²]=r，两边平方得 x²+y²=r²。",
        "生活例：广播站信号边界就是 x²+y²=r²；图形例：点 (3,4)：9+16=25 ✓ 在圆上。",
        "反例：点 (2,2)：4+4=8≠25，不在圆上——方程是圆的“身份证”。",
        "⚠️ 别搞混：x²+y²=r² 的圆心在原点——圆心不在原点时方程长得不一样（g13.1.7 再讲）。",
        "记住一句话：到原点距离为 r 的点，坐标满足 x²+y²=r²。"
      ],
      "examples": [
        {
          "text": "广播站：信号最远传 r 米的边界",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l5-p1",
      "next": "g08-u1-l5-p3"
    },
    {
      "id": "g08-u1-l5-p3",
      "title": "例题：代入检验",
      "concept": "代入方程检验点与圆的位置",
      "formulas": [
        {
          "id": "f1",
          "latex": "3^2 + 4^2 = 25 \\Rightarrow A\\text{在圆上}",
          "translation": "A(3,4) 代入满足方程：点 A 在圆上"
        },
        {
          "id": "f2",
          "latex": "2^2 + 2^2 = 8 < 25 \\Rightarrow B\\text{在圆内}",
          "translation": "B(2,2) 代入得 8 小于 25：点 B 在圆内"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：A(3,4)——9+16=25，满足方程，在圆上。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    68,
                    74
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "3²+4²=25：在圆上 ✓",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 2 步：B(2,2)——4+4=8<25，不满足，点 B 在圆内。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    62,
                    62
                  ],
                  "label": "B",
                  "color": "corrB",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "2²+2²=8<25：在圆内",
                  "size": 13,
                  "bold": true,
                  "color": "corrB"
                }
              ]
            },
            {
              "caption": "第 3 步：C(5,0)——25+0=25，满足方程，在圆上。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    80,
                    50
                  ],
                  "label": "C",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "5²+0²=25：在圆上 ✓",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步：小结——代入检验 = d 与 r 比大小的代数版。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "= r² 上；< r² 内；> r² 外",
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
        "A(3,4)：9+16=25——满足方程，点 A 在圆上。",
        "B(2,2)：4+4=8<25——不满足，8<25，点 B 在圆内。",
        "C(5,0)：25+0=25——满足方程，点 C 在圆上。",
        "记住一句话：代入检验 = d 与 r 比大小的代数版。"
      ],
      "examples": [],
      "prev": "g08-u1-l5-p2",
      "next": "g08-u1-l5-p4"
    },
    {
      "id": "g08-u1-l5-p4",
      "title": "方程和图形的第二次握手",
      "concept": "H3：方程↔图形的第二个里程碑",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{一次方程}y = kx + b:\\text{图像是直线}",
          "translation": "一次函数：方程的图像是一条直线（代数 ch06，第一次握手）"
        },
        {
          "id": "f2",
          "latex": "\\text{二次方程}x^2 + y^2 = r^2:\\text{图像是圆}",
          "translation": "圆的方程：方程的图像是一个圆（今天，第二次握手）"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第一次握手（代数 ch06）：y=2x+1——一次方程，长相是直线。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    20
                  ],
                  "b": [
                    80,
                    90
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "y=2x+1：一次 → 直线",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "代数 ch06：第一次握手",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第二次握手（今天）：x²+y²=25——二次方程，长相是圆。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 28,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "x²+y²=25：二次 → 圆",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "几何 g08：第二次握手",
                  "size": 12
                }
              ]
            },
            {
              "caption": "一次→直线；二次→圆：方程升级，图形升级。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    14,
                    60
                  ],
                  "b": [
                    38,
                    88
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    68,
                    72
                  ],
                  "r": 14,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    26,
                    48
                  ],
                  "text": "一次",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    48
                  ],
                  "text": "二次",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "方程升级，图形升级",
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
        "代数 ch06：y=kx+b 的“长相”是一条直线——那是方程和图形的第一次握手。",
        "今天：x²+y²=r² 的“长相”是一个圆——第二次握手。方程最高是二次，图形就从直线升级成了圆。",
        "H3 双向链：代数 ch06 的“圆 x²+y²=1 不是函数图像”辨析条，回头看的正是今天这一页。",
        "预告：g13.1.7——圆心不在原点时，方程变成 (x−a)²+(y−b)²=r²，圆“搬家”了。"
      ],
      "examples": [
        {
          "text": "回看代数 ch06：一次函数图像",
          "figure": "回链"
        }
      ],
      "prev": "g08-u1-l5-p3",
      "next": "g08-u1-l6-p1"
    }
  ]
};
