---
id: "ch04-u2-l1-p1b"
title: "判别式：先算 Δ 再动手"
concept: "讲解：根的判别式"
prev: "ch04-u2-l1-p1"
next: "ch04-u2-l2-p1"
---

## 讲解

解二次方程先算 Δ：Δ<0 直接判无实根，省下后面所有计算。

Δ=0 不是没根：是两个相等的实根（图像上只看到一个交点）。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": -2,
    "max": 2,
    "step": 0.5,
    "label": "x",
    "expr": "3*x^2 + 2*x + 1",
    "target": 0,
    "targetLabel": "y = 0（横轴）",
    "graph": {
      "kind": "parabola",
      "a": 3,
      "b": 2,
      "c": 1
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "parabola",
      "a": 3,
      "b": 2,
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
    "latex": "3x^2 + 2x + 1 = 0",
    "translation": "a=3，b=2，c=1"
  },
  {
    "id": "f2",
    "latex": "\\Delta = 4 - 12 = -8",
    "translation": "Δ=2²−4×3×1=−8<0"
  },
  {
    "id": "f3",
    "latex": "\\text{无实数根}",
    "translation": "Δ<0：抛物线碰不到横轴，没有实数根，不用再算"
  }
]
```

```data
{
  "hints": [
    "解二次方程先算 Δ：Δ<0 直接判无实根，省下后面所有计算。",
    "Δ=0 不是没根：是两个相等的实根（图像上只看到一个交点）。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x²+x+1=0：Δ=−3<0，无实根；x²−6x+9=0：Δ=0，x=3（重根）。"
    }
  ]
}
```
