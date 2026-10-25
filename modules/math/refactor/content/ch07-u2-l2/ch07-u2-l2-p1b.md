---
id: "ch07-u2-l2-p1b"
title: "增减性：别跨禁区比"
concept: "讲解：反比例函数的增减性"
prev: "ch07-u2-l2-p1"
next: "ch07-u2-l3-p1"
---

## 讲解

增减性只在每支内部成立：比较前先看两点在不在同一支。

经典坑：x₁<0<x₂ 时，y₁<y₂ 与 k 的符号无关——别套单调性。

```interaction
{
  "params": {
    "labels": [
      "k=4>0",
      "k=−4<0"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "4/x",
        "label": "x",
        "max": 6,
        "min": -6,
        "step": 1
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "-4/x",
        "label": "x",
        "max": 6,
        "min": -6,
        "step": 1
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
    "latex": "y = \\frac{4}{x}",
    "translation": "k=4>0：每支内部 y 随 x 增大而减小"
  },
  {
    "id": "f2",
    "latex": "x_1 = -2 < 1 = x_2",
    "translation": "但 y₁=−2 < 4=y₂：跨过禁区，“减小”失效"
  }
]
```

```data
{
  "hints": [
    "增减性只在每支内部成立：比较前先看两点在不在同一支。",
    "经典坑：x₁<0<x₂ 时，y₁<y₂ 与 k 的符号无关——别套单调性。"
  ],
  "examples": [
    {
      "figure": "易错提醒",
      "text": "y=6/x 上 A(−1,−6)、B(2,3)：跨支，−6<3；同支内才用增减。"
    }
  ]
}
```
