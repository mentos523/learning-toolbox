window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch11-u2-l3"] = {
  "lessonId": "ch11-u2-l3",
  "lessonTitle": "链式法则",
  "chapterId": "ch11",
  "pages": [
    {
      "id": "ch11-u2-l3-p1",
      "title": "链式法则：剥洋葱",
      "concept": "链式法则",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{dy}{dx} = \\frac{dy}{du} \\cdot \\frac{du}{dx}",
          "translation": "链式法则：y 对 x 求导 = y 对 u 求导 乘 u 对 x 求导——像接力"
        },
        {
          "id": "f2",
          "latex": "(\\sin(x^2))' = \\cos(x^2) \\cdot 2x",
          "translation": "例 y=sin(x²)：外层 sin→cos(x²)，内层 x²→2x，两段相乘"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": -2,
            "max": 2,
            "step": 0.1,
            "initial": 1
          },
          "views": [
            {
              "kind": "readout",
              "expr": "x^2",
              "label": "u = x²（内层）"
            },
            {
              "kind": "readout",
              "expr": "sin(x^2)",
              "label": "y = sin u（外层）"
            },
            {
              "kind": "readout",
              "expr": "cos(x^2)*2*x",
              "label": "y' = cos u · 2x"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 x：u=x² 先变，y=sin u 跟着变——外导乘内导。",
        "最易漏内层：(sin x²)' 不是 cos x²，2x 不能丢。"
      ],
      "examples": [
        {
          "text": "剥洋葱：y=sin(x²) 先剥外层 sin，再剥内层 x²",
          "figure": "联动仪表盘"
        }
      ],
      "prev": "ch11-u2-l2-p1b",
      "next": "ch11-u2-l3-p1b"
    },
    {
      "id": "ch11-u2-l3-p1b",
      "title": "链式法则：先分层",
      "concept": "讲解：链式法则",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = (3x + 1)^5",
          "translation": "分层：外层 u⁵，内层 u=3x+1"
        },
        {
          "id": "f2",
          "latex": "y' = 5(3x + 1)^4 \\cdot 3",
          "translation": "外导 5u⁴，内导 3：相乘"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 1,
            "label": "x",
            "max": 2,
            "min": -2,
            "step": 0.1
          },
          "views": [
            {
              "expr": "3*x+1",
              "kind": "readout",
              "label": "u=3x+1（内层）"
            },
            {
              "expr": "(3*x+1)^5",
              "kind": "readout",
              "label": "y=u⁵（外层）"
            },
            {
              "expr": "5*(3*x+1)^4*3",
              "kind": "readout",
              "label": "y'=5u⁴·3"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "链式三步：分层（外/内）；外导×内导；把 u 代回去。",
        "层数=求导次数：三层复合就乘三次，别漏。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=e^(2x)：外导 e^u，内导 2，y'=2e^(2x)。"
        }
      ],
      "prev": "ch11-u2-l3-p1",
      "next": "ch11-u2-l3-p1c"
    },
    {
      "id": "ch11-u2-l3-p1c",
      "title": "为什么能拆：变化率接力",
      "concept": "链式法则的直观原理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{\\Delta y}{\\Delta x} = \\frac{\\Delta y}{\\Delta u} \\times \\frac{\\Delta u}{\\Delta x}",
          "translation": "接力写法：Δy/Δx = (Δy/Δu)×(Δu/Δx)——中间的 Δu 约掉了"
        },
        {
          "id": "f2",
          "latex": "(\\sin(x^2))' = \\cos(x^2) \\cdot 2x",
          "translation": "例子：y=sin(x²)——外导 cos(x²) 乘内导 2x，接力的两棒"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：x 动一点点 Δx——内层 u=x² 跟着动 Δu。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      10,
                      42
                    ],
                    [
                      30,
                      42
                    ],
                    [
                      30,
                      58
                    ],
                    [
                      10,
                      58
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      42
                    ],
                    [
                      60,
                      42
                    ],
                    [
                      60,
                      58
                    ],
                    [
                      40,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      70,
                      42
                    ],
                    [
                      90,
                      42
                    ],
                    [
                      90,
                      58
                    ],
                    [
                      70,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    50
                  ],
                  "text": "x",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "u=x²",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    50
                  ],
                  "text": "y=sin u",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    50
                  ],
                  "b": [
                    40,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    50
                  ],
                  "b": [
                    70,
                    50
                  ],
                  "color": "line",
                  "width": 2
                }
              ]
            },
            {
              "caption": "第 2 步：u 动了 Δu——外层 y=sin u 跟着动 Δy。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      10,
                      42
                    ],
                    [
                      30,
                      42
                    ],
                    [
                      30,
                      58
                    ],
                    [
                      10,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      42
                    ],
                    [
                      60,
                      42
                    ],
                    [
                      60,
                      58
                    ],
                    [
                      40,
                      58
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      70,
                      42
                    ],
                    [
                      90,
                      42
                    ],
                    [
                      90,
                      58
                    ],
                    [
                      70,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    50
                  ],
                  "text": "x",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "u=x²",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    50
                  ],
                  "text": "y=sin u",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    50
                  ],
                  "b": [
                    40,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    50
                  ],
                  "b": [
                    70,
                    50
                  ],
                  "color": "line",
                  "width": 2
                }
              ]
            },
            {
              "caption": "第 3 步：Δy/Δx=(Δy/Δu)×(Δu/Δx)——Δu 约掉，接力完成。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      10,
                      42
                    ],
                    [
                      30,
                      42
                    ],
                    [
                      30,
                      58
                    ],
                    [
                      10,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      40,
                      42
                    ],
                    [
                      60,
                      42
                    ],
                    [
                      60,
                      58
                    ],
                    [
                      40,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      70,
                      42
                    ],
                    [
                      90,
                      42
                    ],
                    [
                      90,
                      58
                    ],
                    [
                      70,
                      58
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    50
                  ],
                  "text": "x",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "u=x²",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    50
                  ],
                  "text": "y=sin u",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    50
                  ],
                  "b": [
                    40,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    60,
                    50
                  ],
                  "b": [
                    70,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    70
                  ],
                  "text": "Δu 约掉",
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
        "直观核心：x 变一点 → u 跟着变 → y 跟着变——变化率像接力，一棒接一棒。",
        "为什么能乘：Δy/Δx 写成 (Δy/Δu)×(Δu/Δx)，中间的 Δu 约掉了（Δu≠0 时）。",
        "⚠️ 别搞混：这是直观论证不是严格证明——严格版要处理 Δu=0 的情形，本书不展开。",
        "记住一句话：链式法则是变化率的接力。"
      ],
      "examples": [
        {
          "text": "三层复合 y=sin((2x+1)²)：接力棒传三次——外导×中导×内导",
          "figure": "变式"
        }
      ],
      "prev": "ch11-u2-l3-p1b",
      "next": "ch11-u3-l1-p1"
    }
  ]
};
