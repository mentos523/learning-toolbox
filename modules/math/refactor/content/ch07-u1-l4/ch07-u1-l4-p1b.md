---
id: "ch07-u1-l4-p1b"
title: "最值应用：建模三步"
concept: "讲解：二次函数的最值应用"
prev: "ch07-u1-l4-p1"
next: "ch07-u1-l4-p2"
---

## 讲解

建模三步：设自变量列函数式；化成顶点式（或套公式）；顶点即答案。

别忘了定义域：x>0 且 60−2x>0，即 0<x<30。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 0,
    "max": 30,
    "step": 1,
    "label": "x",
    "expr": "x*(60-2*x)",
    "target": 450,
    "targetLabel": "最大面积 450",
    "unit": "平方米",
    "graph": {
      "kind": "vertex",
      "a": -2,
      "b": 60,
      "c": 0
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "vertex",
      "a": -2,
      "b": 60,
      "c": 0
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
    "latex": "S = x(60 - 2x)",
    "translation": "设宽 x 米，长 (60−2x) 米（靠墙围，墙作一边）"
  },
  {
    "id": "f2",
    "latex": "S = -2x^2 + 60x",
    "translation": "展开：a=−2<0，开口向下，有最大值"
  },
  {
    "id": "f3",
    "latex": "x = 15",
    "translation": "x=−b/2a=15：宽 15 米，长 30 米，最大 450 平方米"
  }
]
```

```data
{
  "hints": [
    "建模三步：设自变量列函数式；化成顶点式（或套公式）；顶点即答案。",
    "别忘了定义域：x>0 且 60−2x>0，即 0<x<30。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "定价：单价 x 元，利润 y=−2x²+100x：x=25 时利润最大。"
    }
  ]
}
```
