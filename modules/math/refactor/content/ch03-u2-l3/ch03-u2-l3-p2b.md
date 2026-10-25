---
id: "ch03-u2-l3-p2b"
title: "增根：解完必须检验"
concept: "讲解：增根与检验"
prev: "ch03-u2-l3-p2"
next: "ch03-u2-l4-p1"
---

## 讲解

增根=去分母时混进来的假解：它让分母为零，必须舍去。

分式方程最后一步永远是检验：代入最简公分母，为零就舍去。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 0,
    "max": 6,
    "step": 1,
    "label": "x",
    "expr": "x - 3",
    "target": 0,
    "targetLabel": "禁区：分母为零",
    "graph": {
      "kind": "rational",
      "forbidAt": [],
      "markX": [
        3
      ]
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "rational",
      "forbidAt": [],
      "markX": [
        3
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
    "latex": "\\frac{x}{x-3} = \\frac{3}{x-3}",
    "translation": "两边同乘 (x−3) 去分母"
  },
  {
    "id": "f2",
    "latex": "x = 3",
    "translation": "解得 x=3"
  },
  {
    "id": "f3",
    "latex": "x - 3 = 0 \\to \\text{舍去}",
    "translation": "检验：x=3 让分母为零，是增根，原方程无解"
  }
]
```

```data
{
  "hints": [
    "增根=去分母时混进来的假解：它让分母为零，必须舍去。",
    "分式方程最后一步永远是检验：代入最简公分母，为零就舍去。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "1/(x−2)=3/(x−2)：去分母得 1=3，无解——连增根都没有。"
    }
  ]
}
```
