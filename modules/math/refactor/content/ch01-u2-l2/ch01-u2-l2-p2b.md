---
id: "ch01-u2-l2-p2b"
title: "去分母：两边同乘最小公倍数"
concept: "讲解：去分母"
prev: "ch01-u2-l2-p2"
next: "ch01-u2-l3-p1"
---

## 讲解

去分母三步：找分母的最小公倍数；两边同乘；每一项都乘。

第一杀手是漏乘：常数项也要乘 6，漏了等式就变了。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 0,
    "max": 12,
    "step": 0.5,
    "label": "x",
    "expr": "x/2 + x/3",
    "target": 5,
    "targetLabel": "x/2+x/3 = 5",
    "graph": {
      "kind": "numberline"
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "numberline"
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
    "latex": "\\frac{x}{2} + \\frac{x}{3} = 5",
    "translation": "x 除以 2 加 x 除以 3 等于 5：分母是 2 和 3"
  },
  {
    "id": "f2",
    "latex": "3x + 2x = 30",
    "translation": "两边同乘 6（2 和 3 的最小公倍数）：每一项都乘，分母全消失"
  },
  {
    "id": "f3",
    "latex": "x = 6",
    "translation": "5x=30 得 x=6；验算 6÷2+6÷3=3+2=5"
  }
]
```

```data
{
  "hints": [
    "去分母三步：找分母的最小公倍数；两边同乘；每一项都乘。",
    "第一杀手是漏乘：常数项也要乘 6，漏了等式就变了。"
  ],
  "examples": [
    {
      "figure": "易错提醒",
      "text": "x/4−1=x/6：同乘 12 得 3x−12=2x，x=12。注意 −1 也要乘 12。"
    }
  ]
}
```
