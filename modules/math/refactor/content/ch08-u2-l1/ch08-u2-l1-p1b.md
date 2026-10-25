---
id: "ch08-u2-l1-p1b"
title: "指数函数：底数定性格"
concept: "讲解：指数函数的定义"
prev: "ch08-u2-l1-p1"
next: "ch08-u2-l2-p1"
---

## 讲解

a>1 增长，0<a<1 衰减：底数 a 决定曲线的性格。

a=1 时 y≡1（常数函数）；a≤0 会出麻烦，所以 a>0 且 a≠1。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 0.5,
    "max": 3,
    "step": 0.5,
    "label": "a",
    "expr": "a^2",
    "target": 4,
    "targetLabel": "a=2 时 y=4",
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
    "latex": "y = 3^x",
    "translation": "a=3>1：爆炸增长，x=5 时 y=243"
  },
  {
    "id": "f2",
    "latex": "y = (\\frac{1}{3})^x",
    "translation": "a=1/3<1：指数衰减，x=5 时 y=1/243"
  }
]
```

```data
{
  "hints": [
    "a>1 增长，0<a<1 衰减：底数 a 决定曲线的性格。",
    "a=1 时 y≡1（常数函数）；a≤0 会出麻烦，所以 a>0 且 a≠1。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "细菌翻倍 y=2ˣ；药物代谢 y=(1/2)ˣ。"
    }
  ]
}
```
