---
id: "ch10-u2-l3-p1b"
title: "连续：极限对上函数值"
concept: "讲解：函数的连续性"
prev: "ch10-u2-l3-p1"
next: "ch10-u2-l4-p1"
---

## 讲解

连续=三对上：f(x₀) 有定义、极限存在、两者相等。

可去断点：补上那一点就连续——如 (x²−1)/(x−1) 补 f(1)=2。

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
        "expr": "x^2",
        "kind": "readout",
        "label": "f(x)"
      },
      {
        "axisLabelX": "x",
        "axisLabelY": "y",
        "kind": "point",
        "xExpr": "x",
        "yExpr": "x^2"
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
    "latex": "f(x) = \\frac{x^2 - 1}{x - 1} (x \\neq 1)",
    "translation": "x=1 处没定义：断点"
  },
  {
    "id": "f2",
    "latex": "\\lim_{x \\to 1} f(x) = 2",
    "translation": "极限是 2，但 f(1) 不存在：对不上，不连续"
  },
  {
    "id": "f3",
    "latex": "g(1) = 2",
    "translation": "定义 g(1)=2：把断点补上，就连续了"
  }
]
```

```data
{
  "hints": [
    "连续=三对上：f(x₀) 有定义、极限存在、两者相等。",
    "可去断点：补上那一点就连续——如 (x²−1)/(x−1) 补 f(1)=2。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "y=1/x 在 x=0：没定义，不连续；且是断成两截的那种。"
    }
  ]
}
```
