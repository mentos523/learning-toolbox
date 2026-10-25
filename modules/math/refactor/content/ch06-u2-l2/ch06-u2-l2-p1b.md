---
id: "ch06-u2-l2-p1b"
title: "截距 b：交 y 轴于 (0,b)"
concept: "讲解：一次函数的图像与截距"
prev: "ch06-u2-l2-p1"
next: "ch06-u2-l2-p1g"
---

## 讲解

求 b 最快：令 x=0，y=b——直线与 y 轴的交点。

k 相同则平行：y=2x−3 与 y=2x+1 永远不相交。

```interaction
{
  "params": {
    "labels": [
      "y=2x−3",
      "y=2x+1"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "2*x - 3",
        "label": "x",
        "max": 4,
        "min": -2,
        "step": 0.5
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "2*x + 1",
        "label": "x",
        "max": 4,
        "min": -2,
        "step": 0.5
      }
    },
    "sync": [
      "x"
    ]
  },
  "type": "side-compare"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "y = 2x - 3",
    "translation": "b=−3：交 y 轴于 (0,−3)"
  },
  {
    "id": "f2",
    "latex": "y = 2x + 1",
    "translation": "b=1：交 y 轴于 (0,1)；k 相同，两直线平行"
  }
]
```

```data
{
  "hints": [
    "求 b 最快：令 x=0，y=b——直线与 y 轴的交点。",
    "k 相同则平行：y=2x−3 与 y=2x+1 永远不相交。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "y=−x+4：b=4，直线交 y 轴于 (0,4)。"
    }
  ]
}
```
