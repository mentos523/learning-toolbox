---
id: "ch11-u2-l2-p1b"
title: "积法则商法则：口诀"
concept: "讲解：积法则与商法则"
prev: "ch11-u2-l2-p1"
next: "ch11-u2-l3-p1"
---

## 讲解

积法则：前导后不导 + 前不导后导；商法则：上导下不导 − 上不导下导，除以 g²。

商法则的减号是命：写成加号就全错。

```interaction
{
  "params": {
    "labels": [
      "积法则",
      "错法 f'·g'"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "2*x*sin(x)+x^2*cos(x)",
        "label": "x",
        "max": 3,
        "min": 0.5,
        "step": 0.5
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "2*x*cos(x)",
        "label": "x",
        "max": 3,
        "min": 0.5,
        "step": 0.5
      }
    },
    "sync": [
      "x"
    ]
  },
  "type": "side-compare"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "(x^2 \\cdot x^3)' = 5x^4",
    "translation": "积法则：2x·x³+x²·3x=5x⁴"
  },
  {
    "id": "f2",
    "latex": "(\\frac{x^2}{x})' = 1",
    "translation": "商法则：(2x·x−x²·1)/x²=1——其实就是 (x)'"
  }
]
```

```data
{
  "hints": [
    "积法则：前导后不导 + 前不导后导；商法则：上导下不导 − 上不导下导，除以 g²。",
    "商法则的减号是命：写成加号就全错。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "(x·eˣ)'=eˣ+x·eˣ=(1+x)eˣ。"
    }
  ]
}
```
