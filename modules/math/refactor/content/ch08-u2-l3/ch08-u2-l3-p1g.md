---
id: "ch08-u2-l3-p1g"
title: "镜像：关于 y=x 对称"
concept: "图形：指数与对数关于 y=x 对称"
prev: "ch08-u2-l3-p1b"
next: "ch08-u2-l4-p1"
---

## 讲解

左图描出 (3,8)，右图描出 (8,3)：横纵坐标互换。

互逆=输入输出互换：图像上就是关于 y=x 翻转。

```interaction
{
  "params": {
    "labels": [
      "y=2ˣ",
      "y=log₂x：关于 y=x 镜像"
    ],
    "left": {
      "kind": "plot-points",
      "params": {
        "autoPlay": true,
        "fn": "2^x",
        "speed": 500,
        "step": 0.5,
        "xMax": 3,
        "xMin": -3
      }
    },
    "right": {
      "kind": "plot-points",
      "params": {
        "autoPlay": true,
        "fn": "log2(x)",
        "speed": 500,
        "step": 0.5,
        "xMax": 8,
        "xMin": 0.1
      }
    }
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
    "latex": "(3, 8), (8, 3)",
    "translation": "点 (3,8) 在指数曲线上；翻转成 (8,3) 落在对数曲线上"
  },
  {
    "id": "f2",
    "latex": "y = x",
    "translation": "对称轴 y=x：两条曲线关于它镜像对称"
  }
]
```

```data
{
  "hints": [
    "左图描出 (3,8)，右图描出 (8,3)：横纵坐标互换。",
    "互逆=输入输出互换：图像上就是关于 y=x 翻转。"
  ],
  "examples": [
    {
      "figure": "数形结合",
      "text": "10²=100 与 lg100=2：点 (2,100) 与 (100,2) 关于 y=x 对称。"
    }
  ]
}
```
