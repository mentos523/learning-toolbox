---
id: "ch05x-u1-l1-p1"
title: "一个方程，两个未知数：解有无数个"
concept: "二元一次方程"
prev: null
next: "ch05x-u1-l1-p2"
---

## 讲解

拖出 (1,9)、(2,8)、(5,5)、(10,0)……发现怎么都对。

一个方程定不住两个未知数：x 变，y 跟着变，解有无数个。

右边的点 (x, 10−x) 在坐标系里走出的是一条直线——为后面铺垫。

```interaction
{
  "type": "sys-lab",
  "params": {
    "sliders": [
      {
        "id": "x",
        "label": "x",
        "min": -10,
        "max": 10,
        "step": 1,
        "initial": 1
      },
      {
        "id": "y",
        "label": "y",
        "min": -10,
        "max": 10,
        "step": 1,
        "initial": 9
      }
    ],
    "derived": [
      {
        "id": "sum",
        "expr": "x + y",
        "label": "x + y"
      }
    ],
    "readouts": [
      {
        "expr": "x + y - 10",
        "target": 0,
        "label": "离 10 差多少",
        "okText": "✓ 是解",
        "noText": "还不是解"
      }
    ],
    "point": {
      "xExpr": "x",
      "yExpr": "10 - x",
      "xRange": [
        -10,
        10
      ],
      "yRange": [
        -10,
        10
      ],
      "caption": "点 (x, 10−x) 同步走——直线雏形"
    },
    "target": {
      "expr": "x + y",
      "value": 10,
      "label": "等于 10 的组合"
    }
  },
  "engine": {
    "primitive": "SysLab",
    "version": "2026.10.16.A",
    "params": {
      "sliders": [
        "x",
        "y"
      ]
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
    "latex": "x + y = 10",
    "translation": "x 加 y 等于 10：两个未知数，一个方程"
  },
  {
    "id": "f2",
    "latex": "(1, 9), (2, 8), (5, 5), (10, 0)",
    "translation": "都是解：1+9=10，2+8=10……怎么代都对"
  },
  {
    "id": "f3",
    "latex": "y = 10 - x",
    "translation": "y 等于 10 减 x：x 定了，y 就定了——解有无数个"
  }
]
```

```data
{
  "hints": [
    "拖出 (1,9)、(2,8)、(5,5)、(10,0)……发现怎么都对。",
    "一个方程定不住两个未知数：x 变，y 跟着变，解有无数个。",
    "右边的点 (x, 10−x) 在坐标系里走出的是一条直线——为后面铺垫。"
  ],
  "examples": [
    {
      "text": "猜数：我想了两个数，和是 10——你猜是哪两个？",
      "figure": "滑块"
    }
  ]
}
```
