---
id: "ch04-u0-l1-p2b"
title: "描点三步：列表描点连线"
concept: "讲解：描点法画图像"
prev: "ch04-u0-l1-p2"
next: "ch04-u1-l1-p1"
---

## 讲解

描点三步：列表算出 (t,h)；在坐标系里描点；用平滑曲线连起来。

点越多线越准：对称的点帮你找到顶点在 t=2。

```interaction
{
  "params": {
    "autoPlay": true,
    "fn": "-5*x^2 + 20*x + 2",
    "speed": 600,
    "step": 0.5,
    "xMax": 4,
    "xMin": 0
  },
  "type": "plot-points"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "(0, 2), (1, 17), (2, 22)",
    "translation": "t=0、1、2 时的点：（时间，高度）"
  },
  {
    "id": "f2",
    "latex": "(3, 17), (4, 2)",
    "translation": "t=3、4 时的点：对称地落下来，(1,17) 与 (3,17) 对称"
  }
]
```

```data
{
  "hints": [
    "描点三步：列表算出 (t,h)；在坐标系里描点；用平滑曲线连起来。",
    "点越多线越准：对称的点帮你找到顶点在 t=2。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "画 y=x²：取 x=−2,−1,0,1,2，得点 (−2,4),(−1,1),(0,0),(1,1),(2,4)。"
    }
  ]
}
```
