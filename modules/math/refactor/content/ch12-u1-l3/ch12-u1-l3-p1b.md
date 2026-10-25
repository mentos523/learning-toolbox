---
id: "ch12-u1-l3-p1b"
title: "∫：把无穷多份加起来"
concept: "讲解：定积分的定义"
prev: "ch12-u1-l3-p1"
next: "ch12-u1-l4-p1"
---

## 讲解

∫ₐᵇf(x)dx 读作“f 从 a 到 b 的积分”：a 下限，b 上限。

几何意义：曲线下方、x 轴上方、夹在 a 与 b 之间的面积。

```interaction
{
  "params": {
    "expr": "a^2/2",
    "label": "a",
    "max": 4,
    "min": 0,
    "step": 0.25,
    "target": 2,
    "targetLabel": "找：面积=2 时 a 是多少"
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
    "latex": "\\int_{1}^{3} 2 dx = 4",
    "translation": "y=2 从 1 到 3：矩形面积 2×2=4"
  },
  {
    "id": "f2",
    "latex": "\\int_{0}^{3} x dx = 4.5",
    "translation": "y=x 从 0 到 3：三角形 3×3/2=4.5"
  }
]
```

```data
{
  "hints": [
    "∫ₐᵇf(x)dx 读作“f 从 a 到 b 的积分”：a 下限，b 上限。",
    "几何意义：曲线下方、x 轴上方、夹在 a 与 b 之间的面积。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "∫₀¹1dx=1：y=1 从 0 到 1 是 1×1 的正方形。"
    }
  ]
}
```
