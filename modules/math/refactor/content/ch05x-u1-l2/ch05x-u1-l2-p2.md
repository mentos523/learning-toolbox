---
id: "ch05x-u1-l2-p2"
title: "代入法三步：变形→代入→回代检验"
concept: "代入消元（推导）"
prev: "ch05x-u1-l2-p1"
next: "ch05x-u2-l1-p1"
---

## 讲解

y 由①式导出：拖 x，y 自动跟着变——这就是代入。

检验清单：代入① ✓（4+6=10）、代入② ✓（8+6=14）。

代入法的合法性来自 ch01 等式性质：等价变形不改变解。

```interaction
{
  "type": "sys-lab",
  "params": {
    "sliders": [
      {
        "id": "x",
        "label": "x",
        "min": -10,
        "max": 10,
        "step": 1,
        "initial": 4
      }
    ],
    "derived": [
      {
        "id": "y",
        "expr": "10 - x",
        "label": "y 由①式导出：y = 10 − x"
      }
    ],
    "readouts": [
      {
        "expr": "2*x + y - 14",
        "target": 0,
        "label": "第二式余数",
        "okText": "✓ 命中：x=4 是解",
        "noText": "拖 x 到 4 试试"
      }
    ],
    "note": "例 {x+y=10, 2x+y=14}，解 (4,6)：拖 x 到 4 时 y=6，读数 2×4+6=14 命中"
  },
  "engine": {
    "primitive": "SysLab",
    "version": "2026.10.16.A",
    "params": {
      "sliders": [
        "x"
      ],
      "derived": [
        "y"
      ]
    }
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
    "latex": "x + y = 10",
    "translation": "例①：x+y=10"
  },
  {
    "id": "f2",
    "latex": "2x + y = 14",
    "translation": "例②：2x+y=14"
  },
  {
    "id": "f3",
    "latex": "x = 10 - y \\Rightarrow 2(10-y) + y = 14",
    "translation": "变形→代入：一元一次方程"
  },
  {
    "id": "f4",
    "latex": "y = 6, x = 4",
    "translation": "解得 y=6，回代得 x=4；检验：4+6=10，8+6=14 ✓"
  }
]
```

```data
{
  "hints": [
    "y 由①式导出：拖 x，y 自动跟着变——这就是代入。",
    "检验清单：代入① ✓（4+6=10）、代入② ✓（8+6=14）。",
    "代入法的合法性来自 ch01 等式性质：等价变形不改变解。"
  ],
  "examples": [
    {
      "text": "三步口诀：变形（把一个未知数表示出来）→代入（送进另一个方程）→回代检验。",
      "figure": "口诀"
    }
  ]
}
```
