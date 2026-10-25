---
id: "ch12-u1-l2-p1b"
title: "黎曼和：n→∞ 取极限"
concept: "讲解：黎曼和的极限"
prev: "ch12-u1-l2-p1"
next: "ch12-u1-l3-p1"
---

## 讲解

Sₙ 是近似值：n 越大越准；极限是精确值。

Δx=(b−a)/n：n 越大，每份越窄。

```interaction
{
  "params": {
    "expr": "(n+1)*(2*n+1)/(6*n^2)",
    "label": "n",
    "max": 100,
    "min": 1,
    "step": 1
  },
  "type": "slider-lab"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "S_n = \\sum_{i=1}^{n} f(x_i) \\Delta x",
    "translation": "黎曼和：n 个矩形面积之和"
  },
  {
    "id": "f2",
    "latex": "\\lim_{n \\to \\infty} S_n",
    "translation": "n→∞：矩形无限变细，和趋向精确值"
  }
]
```

```data
{
  "hints": [
    "Sₙ 是近似值：n 越大越准；极限是精确值。",
    "Δx=(b−a)/n：n 越大，每份越窄。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "π 的计算：圆内接正 n 边形，n 越大越接近圆。"
    }
  ]
}
```
