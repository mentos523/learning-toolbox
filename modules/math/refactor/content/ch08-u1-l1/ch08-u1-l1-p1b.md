---
id: "ch08-u1-l1-p1b"
title: "负指数：倒着数"
concept: "讲解：负整数指数幂"
prev: "ch08-u1-l1-p1"
next: "ch08-u1-l2-p1"
---

## 讲解

负指数=取倒数：a⁻ⁿ=1/aⁿ（a≠0）。

2⁰=1 是分界：指数向右+1 是乘 2，向左−1 是除以 2。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": -3,
    "max": 3,
    "step": 1,
    "label": "n",
    "expr": "2^n",
    "target": 0.125,
    "targetLabel": "2⁻³=1/8",
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
    "latex": "3^{-2}",
    "translation": "3 的 −2 次方：指数倒退 2 格"
  },
  {
    "id": "f2",
    "latex": "3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}",
    "translation": "等于 1 除以 3²，即 1/9"
  },
  {
    "id": "f3",
    "latex": "2^{-1} = \\frac{1}{2}",
    "translation": "2 的 −1 次方 = 1/2"
  }
]
```

```data
{
  "hints": [
    "负指数=取倒数：a⁻ⁿ=1/aⁿ（a≠0）。",
    "2⁰=1 是分界：指数向右+1 是乘 2，向左−1 是除以 2。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "(1/2)⁻²=4：负指数先取倒数，(1/2)⁻²=2²=4。"
    }
  ]
}
```
