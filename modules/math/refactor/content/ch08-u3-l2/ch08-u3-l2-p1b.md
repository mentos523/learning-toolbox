---
id: "ch08-u3-l2-p1b"
title: "正弦余弦：横纵坐标（选学）"
concept: "讲解：正弦与余弦（选学）"
prev: "ch08-u3-l2-p1"
next: "ch08-u3-l3-p1"
---

## 讲解

cos 是横坐标，sin 是纵坐标：转到哪，坐标读到哪。

sin²t+cos²t=1：单位圆半径是 1，勾股定理。

```interaction
{
  "params": {
    "source": {
      "initial": 1.57,
      "label": "t",
      "max": 6.3,
      "min": 0,
      "step": 0.1
    },
    "views": [
      {
        "expr": "sin(t)",
        "kind": "readout",
        "label": "sin t"
      },
      {
        "expr": "cos(t)",
        "kind": "readout",
        "label": "cos t"
      },
      {
        "axisLabelX": "x",
        "axisLabelY": "y",
        "kind": "point",
        "xExpr": "cos(t)",
        "yExpr": "sin(t)"
      }
    ]
  },
  "type": "linked-dashboard"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "(\\cos \\frac{\\pi}{2}, \\sin \\frac{\\pi}{2}) = (0, 1)",
    "translation": "转到 90°：点在 (0,1)，sin90°=1"
  },
  {
    "id": "f2",
    "latex": "(\\cos \\pi, \\sin \\pi) = (-1, 0)",
    "translation": "转到 180°：点在 (−1,0)，cos180°=−1"
  }
]
```

```data
{
  "hints": [
    "cos 是横坐标，sin 是纵坐标：转到哪，坐标读到哪。",
    "sin²t+cos²t=1：单位圆半径是 1，勾股定理。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "t=π/4：(√2/2, √2/2)，sin45°=cos45°。"
    }
  ]
}
```
