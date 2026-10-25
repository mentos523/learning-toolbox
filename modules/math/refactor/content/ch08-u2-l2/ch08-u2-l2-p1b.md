---
id: "ch08-u2-l2-p1b"
title: "对数：把指数请下来"
concept: "讲解：对数的概念"
prev: "ch08-u2-l2-p1"
next: "ch08-u2-l3-p1"
---

## 讲解

对数三要素：底数、真数、结果。log₂32=5，底 2、真数 32、结果 5。

logₐ1=0（a⁰=1），logₐa=1：两条永远对的结论。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 1,
    "max": 6,
    "step": 1,
    "label": "x",
    "expr": "2^x",
    "target": 32,
    "targetLabel": "2⁵=32：x=5 即 log₂32=5",
    "graph": {
      "kind": "exp"
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "exp"
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
    "latex": "\\log_3 81",
    "translation": "问：81 是 3 的几次方？"
  },
  {
    "id": "f2",
    "latex": "\\log_3 81 = 4",
    "translation": "3⁴=81，所以是 4"
  },
  {
    "id": "f3",
    "latex": "\\log_5 1 = 0",
    "translation": "5⁰=1：1 的对数永远是 0"
  }
]
```

```data
{
  "hints": [
    "对数三要素：底数、真数、结果。log₂32=5，底 2、真数 32、结果 5。",
    "logₐ1=0（a⁰=1），logₐa=1：两条永远对的结论。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "log₁₀1000=3（10³=1000）；lg 是以 10 为底的简写。"
    }
  ]
}
```
