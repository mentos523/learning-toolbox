---
id: "ch05-u2-l2-p1b"
title: "含参讨论：按大小分类"
concept: "讲解：含参数的二次不等式"
prev: "ch05-u2-l2-p1"
next: "ch05-u2-l3-p1"
---

## 讲解

分类标准：两根谁大谁小——a>2、a=2、a<2 三种。

a=2 最容易漏：(x−2)²>0 的解是 x≠2，不是无解！

```interaction
{
  "type": "ineq-shade-lab",
  "params": {
    "source": {
      "initial": 3,
      "label": "a",
      "max": 4,
      "min": 0,
      "step": 0.5
    },
    "mode": "param-sweep",
    "sets": [
      {
        "expr": "(x-2)*(x-a)",
        "ineq": ">",
        "label": "(x−2)(x−a)>0"
      }
    ],
    "showProbe": true,
    "xAxis": {
      "min": -1,
      "max": 7
    },
    "note": "a>2：x<2 或 x>a；a=2：x≠2；a<2：x<a 或 x>2"
  },
  "engine": {
    "primitive": "IneqShadeLab",
    "version": "2026.10.16.A",
    "params": {
      "mode": "param-sweep",
      "sets": [
        {
          "expr": "(x-2)*(x-a)",
          "ineq": ">",
          "label": "(x−2)(x−a)>0"
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
    "latex": "(x - 2)(x - a) > 0",
    "translation": "两根 2 和 a；>0 取两边"
  },
  {
    "id": "f2",
    "latex": "a > 2: x < 2 \\text{ 或 } x > a",
    "translation": "a>2 时：小的在左，解 x<2 或 x>a"
  },
  {
    "id": "f3",
    "latex": "a < 2: x < a \\text{ 或 } x > 2",
    "translation": "a<2 时反过来；a=2 时 (x−2)²>0 得 x≠2"
  }
]
```

```data
{
  "hints": [
    "分类标准：两根谁大谁小——a>2、a=2、a<2 三种。",
    "a=2 最容易漏：(x−2)²>0 的解是 x≠2，不是无解！"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "(x−1)(x−a)<0（a>1）：取中间，1<x<a。"
    }
  ]
}
```
