---
id: "ch06-u2-l4-p1b"
title: "大会师：交点即方程的解"
concept: "讲解：一次函数与方程、不等式"
prev: "ch06-u2-l4-p1"
next: "ch06-u2-l5-p1"
---

## 讲解

方程的解=交点横坐标；不等式的解=图像在上/下方的 x 范围。

第五章“先找分界点”就是这句话：分界点就是交点。

交点即解的完整形态：二元一次方程组的解就是两条直线交点的坐标。

```interaction
{
  "params": {
    "source": {
      "initial": 2,
      "label": "x",
      "max": 4,
      "min": 0,
      "step": 0.5
    },
    "views": [
      {
        "expr": "3*x + 1",
        "kind": "readout",
        "label": "y"
      },
      {
        "kind": "point",
        "xExpr": "x",
        "yExpr": "3*x + 1"
      }
    ]
  },
  "type": "linked-dashboard"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "3x + 1 = 7",
    "translation": "方程：解 x=2"
  },
  {
    "id": "f2",
    "latex": "y = 3x + 1",
    "translation": "看直线 y=3x+1 上 y=7 的点：横坐标就是 2"
  },
  {
    "id": "f3",
    "latex": "3x + 1 > 7 \\to x > 2",
    "translation": "不等式：直线在 y=7 上方的部分，x>2"
  }
]
```

```data
{
  "hints": [
    "方程的解=交点横坐标；不等式的解=图像在上/下方的 x 范围。",
    "第五章“先找分界点”就是这句话：分界点就是交点。",
    "交点即解的完整形态：二元一次方程组的解就是两条直线交点的坐标。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "−x+2>0：直线 y=−x+2 在 x 轴上方的部分，x<2。"
    }
  ]
}
```
