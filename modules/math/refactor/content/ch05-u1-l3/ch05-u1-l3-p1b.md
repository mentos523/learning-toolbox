---
id: "ch05-u1-l3-p1b"
title: "不等式组：分开解取公共"
concept: "讲解：一元一次不等式组"
prev: "ch05-u1-l3-p1"
next: "ch05-u2-l1-p1"
---

## 讲解

两步：先分开解出每个的解集，再取公共部分。

无公共部分时写“无解”：比如 x>5 且 x<3。

```interaction
{
  "type": "ineq-shade-lab",
  "params": {
    "source": {
      "initial": 4,
      "label": "x",
      "max": 8,
      "min": 0,
      "step": 0.5
    },
    "mode": "system",
    "sets": [
      {
        "expr": "x-3",
        "ineq": ">",
        "label": "x>3（x+1>4 解得）"
      },
      {
        "expr": "5-x",
        "ineq": ">",
        "label": "x<5（2x<10 解得）"
      }
    ],
    "showProbe": true
  },
  "engine": {
    "primitive": "IneqShadeLab",
    "version": "2026.10.16.A",
    "params": {
      "mode": "system",
      "sets": [
        {
          "expr": "x-3",
          "ineq": ">",
          "label": "x>3（x+1>4 解得）"
        },
        {
          "expr": "5-x",
          "ineq": ">",
          "label": "x<5（2x<10 解得）"
        }
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
    "latex": "x + 1 > 4",
    "translation": "第一个：x>3"
  },
  {
    "id": "f2",
    "latex": "2x < 10",
    "translation": "第二个：x<5"
  },
  {
    "id": "f3",
    "latex": "3 < x < 5",
    "translation": "公共部分：3<x<5"
  }
]
```

```data
{
  "hints": [
    "两步：先分开解出每个的解集，再取公共部分。",
    "无公共部分时写“无解”：比如 x>5 且 x<3。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x≥1 且 x<4：公共解集 1≤x<4（左实心右空心）。"
    }
  ]
}
```
