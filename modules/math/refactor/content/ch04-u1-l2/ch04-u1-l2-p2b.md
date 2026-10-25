---
id: "ch04-u1-l2-p2b"
title: "配方解方程：完整三步"
concept: "讲解：配方法的代数步骤"
prev: "ch04-u1-l2-p2"
next: "ch04-u1-l3-p1"
---

## 讲解

配方三步：移常数；两边加一半的平方；开平方。

开平方别丢负根：(x−2)²=9 有两个解，x=5 和 x=−1。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": -3,
    "max": 7,
    "step": 1,
    "label": "x",
    "expr": "(x-2)^2",
    "target": 9,
    "targetLabel": "右边 = 9",
    "graph": {
      "kind": "parabola",
      "a": 1,
      "b": -4,
      "c": 4
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "parabola",
      "a": 1,
      "b": -4,
      "c": 4
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
    "latex": "x^2 - 4x - 5 = 0",
    "translation": "第一步：移常数项，得 x²−4x=5"
  },
  {
    "id": "f2",
    "latex": "(x - 2)^2 = 9",
    "translation": "第二步：两边加 (−2)²=4，得 (x−2)²=9"
  },
  {
    "id": "f3",
    "latex": "x - 2 = \\pm 3",
    "translation": "第三步：开平方 x−2=±3，得 x=5 或 x=−1；代回验算"
  }
]
```

```data
{
  "hints": [
    "配方三步：移常数；两边加一半的平方；开平方。",
    "开平方别丢负根：(x−2)²=9 有两个解，x=5 和 x=−1。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x²+2x−3=0：移常数得 x²+2x=3，加 1 得 (x+1)²=4，x=1 或 x=−3。"
    }
  ]
}
```
