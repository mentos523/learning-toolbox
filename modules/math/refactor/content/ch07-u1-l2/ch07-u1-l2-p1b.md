---
id: "ch07-u1-l2-p1b"
title: "顶点式：顶点写在脸上"
concept: "讲解：顶点式"
prev: "ch07-u1-l2-p1"
next: "ch07-u1-l2-p1g"
---

## 讲解

y=a(x−h)²+k：顶点 (h,k)，(x+1)² 里 h=−1（注意符号）。

a 的符号定开口：a>0 顶点是最低点，a<0 最高点。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": -4,
    "max": 2,
    "step": 0.5,
    "label": "x",
    "expr": "2*(x+1)^2-3",
    "target": -3,
    "targetLabel": "最小值 −3",
    "graph": {
      "kind": "vertex",
      "a": 2,
      "b": 4,
      "c": -1
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "vertex",
      "a": 2,
      "b": 4,
      "c": -1
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
    "latex": "y = 2(x + 1)^2 - 3",
    "translation": "a=2，h=−1，k=−3：顶点 (−1,−3)"
  },
  {
    "id": "f2",
    "latex": "y = -(x - 4)^2",
    "translation": "a=−1，h=4，k=0：顶点 (4,0)，开口向下"
  }
]
```

```data
{
  "hints": [
    "y=a(x−h)²+k：顶点 (h,k)，(x+1)² 里 h=−1（注意符号）。",
    "a 的符号定开口：a>0 顶点是最低点，a<0 最高点。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "y=3(x−2)²+5：顶点 (2,5)，最小值 5。"
    }
  ]
}
```
