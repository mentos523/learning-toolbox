---
id: "ch11-u2-l3-p1c"
title: "为什么能拆：变化率接力"
concept: "链式法则的直观原理"
prev: "ch11-u2-l3-p1b"
next: "ch11-u3-l1-p1"
---

## 讲解

直观核心：x 变一点 → u 跟着变 → y 跟着变——变化率像接力，一棒接一棒。

为什么能乘：Δy/Δx 写成 (Δy/Δu)×(Δu/Δx)，中间的 Δu 约掉了（Δu≠0 时）。

⚠️ 别搞混：这是直观论证不是严格证明——严格版要处理 Δu=0 的情形，本书不展开。

记住一句话：链式法则是变化率的接力。

```interaction
{
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
}
```

```auxInteraction
null
```

```formulas
[
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
]
```

```data
{
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
  ]
}
```
