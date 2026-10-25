---
id: "ch03-u1-l1-p2b"
title: "禁区：让分母等于零的 x"
concept: "讲解：分式有意义的条件"
prev: "ch03-u1-l1-p2"
next: "ch03-u1-l2-p1"
---

## 讲解

求禁区一步：令分母=0，解出来的 x 就是禁区。

分式题第一问永远是“有意义”：先找禁区，再谈计算。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": -6,
    "max": 2,
    "step": 1,
    "label": "x",
    "expr": "x + 3",
    "target": 0,
    "targetLabel": "禁区：分母为零",
    "graph": {
      "kind": "rational",
      "forbidAt": []
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "rational",
      "forbidAt": []
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
    "latex": "\\frac{6}{x + 3}",
    "translation": "6 除以 x 加 3：分母是 x+3"
  },
  {
    "id": "f2",
    "latex": "x + 3 \\neq 0",
    "translation": "有意义的条件：分母 x+3 不等于 0"
  },
  {
    "id": "f3",
    "latex": "x \\neq -3",
    "translation": "禁区：x=−3，数轴上这个点要挖去"
  }
]
```

```data
{
  "hints": [
    "求禁区一步：令分母=0，解出来的 x 就是禁区。",
    "分式题第一问永远是“有意义”：先找禁区，再谈计算。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "1/(2x−4)：令 2x−4=0 得 x=2，禁区是 2。"
    }
  ]
}
```
