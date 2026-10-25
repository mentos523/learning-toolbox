---
id: "ch04-u1-l1-p1b"
title: "一元二次方程：三要素"
concept: "讲解：一元二次方程的定义"
prev: "ch04-u1-l1-p1"
next: "ch04-u1-l2-p1"
---

## 讲解

判断三要素：一元（一个未知数）、二次（最高次数 2）、方程（是等式）。

a≠0 是底线：a=0 时二次项消失，就退化成一次方程了。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": -1,
    "max": 3,
    "step": 0.5,
    "label": "x",
    "expr": "2*x^2 - 3*x + 1",
    "target": 0,
    "targetLabel": "等于 0 的点",
    "graph": {
      "kind": "parabola",
      "a": 2,
      "b": -3,
      "c": 1
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "parabola",
      "a": 2,
      "b": -3,
      "c": 1
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
    "latex": "2x^2 - 3x + 1 = 0",
    "translation": "一元（一个未知数）、二次（最高 2 次）、方程（等式）：三条全中"
  },
  {
    "id": "f2",
    "latex": "x^2 = 4",
    "translation": "也是一元二次方程：a=1，b=0，c=−4"
  },
  {
    "id": "f3",
    "latex": "x + y = 1",
    "translation": "反例：两个未知数，不是一元；x³=8 是三次，也不是"
  }
]
```

```data
{
  "hints": [
    "判断三要素：一元（一个未知数）、二次（最高次数 2）、方程（是等式）。",
    "a≠0 是底线：a=0 时二次项消失，就退化成一次方程了。"
  ],
  "examples": [
    {
      "figure": "辨析",
      "text": "(m−1)x²+2x+3=0 是一元二次方程，则 m≠1（否则二次项消失）。"
    }
  ]
}
```
