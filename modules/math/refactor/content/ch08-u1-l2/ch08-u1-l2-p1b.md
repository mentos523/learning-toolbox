---
id: "ch08-u1-l2-p1b"
title: "分数指数：分母管开方"
concept: "讲解：分数指数幂"
prev: "ch08-u1-l2-p1"
next: "ch08-u1-l3-p1"
---

## 讲解

分数指数口诀：分母开方、分子乘方——a^(m/n)=ⁿ√(aᵐ)。

先开方再乘方数字小：27^(2/3)=(∛27)²=9。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 1,
    "max": 4,
    "step": 1,
    "label": "n",
    "expr": "8^(1/n)",
    "target": 2,
    "targetLabel": "8 的 1/3 次方 = 2",
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
    "latex": "27^{\\frac{2}{3}}",
    "translation": "分子 2 是乘方，分母 3 是开立方"
  },
  {
    "id": "f2",
    "latex": "27^{\\frac{2}{3}} = 9",
    "translation": "先开方 (∛27)²=3²=9：先开方数字小，好算"
  },
  {
    "id": "f3",
    "latex": "16^{\\frac{3}{4}} = 8",
    "translation": "16 开 4 次方得 2，2³=8"
  }
]
```

```data
{
  "hints": [
    "分数指数口诀：分母开方、分子乘方——a^(m/n)=ⁿ√(aᵐ)。",
    "先开方再乘方数字小：27^(2/3)=(∛27)²=9。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "4 的 3/2 次方=(√4)³=2³=8。"
    }
  ]
}
```
