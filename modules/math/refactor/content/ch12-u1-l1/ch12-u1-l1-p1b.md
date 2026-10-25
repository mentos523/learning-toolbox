---
id: "ch12-u1-l1-p1b"
title: "曲边面积：切碎再拼"
concept: "讲解：曲边梯形的面积"
prev: "ch12-u1-l1-p1"
next: "ch12-u1-l2-p1"
---

## 讲解

曲边形面积三步：分割（切碎）、近似（矩形代替）、求和。

份数越多误差越小：这是积分思想的全部。

```interaction
{
  "params": {
    "a": 0,
    "b": 2,
    "fn": "x^2",
    "showError": true,
    "steps": [
      4,
      16,
      64,
      256
    ]
  },
  "type": "subdivision"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "\\int_{0}^{2} x^2 dx",
    "translation": "y=x² 从 0 到 2 下方的曲边面积"
  },
  {
    "id": "f2",
    "latex": "S_4 = 3.75",
    "translation": "切 4 份：右端点矩形和 3.75"
  },
  {
    "id": "f3",
    "latex": "S_{100} \\approx 2.69",
    "translation": "切 100 份：≈2.69，越来越接近 8/3≈2.67"
  }
]
```

```data
{
  "hints": [
    "曲边形面积三步：分割（切碎）、近似（矩形代替）、求和。",
    "份数越多误差越小：这是积分思想的全部。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "湖泊面积：方格纸数格子，格子越小越准。"
    }
  ]
}
```
