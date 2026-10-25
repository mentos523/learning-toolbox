---
id: "ch04-u1-l2-p1b"
title: "配方几何：缺角补角"
concept: "讲解：配方的几何意义"
prev: "ch04-u1-l2-p1"
next: "ch04-u1-l2-p1g"
---

## 讲解

配方口诀：一次项系数的一半——8 的一半是 4，补 4²=16。

为什么是一半？8x 要折成两条相等的长条，每条 4x。

```interaction
{
  "params": {
    "initial": 4,
    "label": "x",
    "max": 8,
    "min": 1,
    "showGrid": true,
    "step": 1
  },
  "type": "shape-area"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "x^2 + 8x",
    "translation": "x² 是正方形，8x 折成两条 4x 长条：缺一个 4×4 的角"
  },
  {
    "id": "f2",
    "latex": "x^2 + 8x + 16 = (x + 4)^2",
    "translation": "补上 16：拼成边长 (x+4) 的完整正方形"
  },
  {
    "id": "f3",
    "latex": "x^2 + 8x = (x + 4)^2 - 16",
    "translation": "等式两边相等：补的 16 要减回去"
  }
]
```

```data
{
  "hints": [
    "配方口诀：一次项系数的一半——8 的一半是 4，补 4²=16。",
    "为什么是一半？8x 要折成两条相等的长条，每条 4x。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x²−6x：补 (−3)²=9，得 (x−3)²−9。"
    }
  ]
}
```
