---
id: "ch09-u1-l2-p1b"
title: "通项公式：项的计算器"
concept: "讲解：通项公式"
prev: "ch09-u1-l2-p1"
next: "ch09-u1-l2-p2"
---

## 讲解

通项公式=第 n 项的计算器：想算哪项，代 n 就行。

反过来：aₙ=3n−1，aₙ=29 是第几项？解 3n−1=29 得 n=10。

```interaction
{
  "params": {
    "source": {
      "initial": 1,
      "label": "n",
      "max": 20,
      "min": 1,
      "step": 1
    },
    "views": [
      {
        "expr": "3*n-1",
        "kind": "readout",
        "label": "a_n"
      },
      {
        "axisLabelX": "n",
        "axisLabelY": "a_n",
        "kind": "point",
        "xExpr": "n",
        "yExpr": "3*n-1"
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
    "latex": "a_n = 3n - 1",
    "translation": "n=1 得 2，n=2 得 5，n=3 得 8"
  },
  {
    "id": "f2",
    "latex": "a_{100} = 299",
    "translation": "想算第 100 项：代 n=100，一步到位"
  }
]
```

```data
{
  "hints": [
    "通项公式=第 n 项的计算器：想算哪项，代 n 就行。",
    "反过来：aₙ=3n−1，aₙ=29 是第几项？解 3n−1=29 得 n=10。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "aₙ=2ⁿ：a₅=32；aₙ=n²：a₇=49。"
    }
  ]
}
```
