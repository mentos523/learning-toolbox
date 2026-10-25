---
id: "ch10-u1-l2-p1b"
title: "ε-N：带子套点的游戏"
concept: "讲解：ε-N 直观"
prev: "ch10-u1-l2-p1"
next: "ch10-u1-l3-p1"
---

## 讲解

ε 是带子宽度（你定），N 是序号门槛（我找）：带子越窄，N 越大。

极限的承诺：无论带子多窄，总找得到 N 套住后面的所有点。

```interaction
{
  "params": {
    "source": {
      "initial": 0.2,
      "label": "e",
      "max": 0.5,
      "min": 0.05,
      "step": 0.05
    },
    "views": [
      {
        "expr": "1/e",
        "kind": "readout",
        "label": "N≈1/ε"
      },
      {
        "axisLabelX": "N",
        "axisLabelY": "ε",
        "kind": "point",
        "xExpr": "1/e",
        "yExpr": "e"
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
    "latex": "\\epsilon = 0.1",
    "translation": "带子半宽 0.1：(−0.1, 0.1)"
  },
  {
    "id": "f2",
    "latex": "N = 10",
    "translation": "n>10 时，1/n<0.1：全落进带子"
  }
]
```

```data
{
  "hints": [
    "ε 是带子宽度（你定），N 是序号门槛（我找）：带子越窄，N 越大。",
    "极限的承诺：无论带子多窄，总找得到 N 套住后面的所有点。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "aₙ=1/n²：ε=0.01 时 N=10（1/100<0.01）。"
    }
  ]
}
```
