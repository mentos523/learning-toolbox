---
id: "ch10-u2-l1-p1b"
title: "函数极限：左右夹击"
concept: "讲解：函数的极限"
prev: "ch10-u2-l1-p1"
next: "ch10-u2-l2-p1"
---

## 讲解

函数极限看趋势：x 逼近 x₀ 时 f(x) 逼近谁。

左右极限都要看：左≠右则极限不存在（如 1/x 在 0 处）。

```interaction
{
  "params": {
    "source": {
      "initial": -2,
      "label": "x",
      "max": 2,
      "min": -2,
      "step": 0.1
    },
    "views": [
      {
        "expr": "(x^2-1)/(x-1)",
        "kind": "readout",
        "label": "f(x)"
      },
      {
        "axisLabelX": "x",
        "axisLabelY": "y",
        "kind": "point",
        "xExpr": "x",
        "yExpr": "(x^2-1)/(x-1)"
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
    "latex": "\\lim_{x \\to 2} (3x - 1) = 5",
    "translation": "x→2 时 3x−1→5：代入就行（连续函数）"
  },
  {
    "id": "f2",
    "latex": "\\lim_{x \\to 0} \\frac{1}{x}",
    "translation": "x→0 时 1/x：左→−∞，右→+∞，极限不存在"
  }
]
```

```data
{
  "hints": [
    "函数极限看趋势：x 逼近 x₀ 时 f(x) 逼近谁。",
    "左右极限都要看：左≠右则极限不存在（如 1/x 在 0 处）。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "lim(x→3)(x²)=9：连续函数直接代入。"
    }
  ]
}
```
