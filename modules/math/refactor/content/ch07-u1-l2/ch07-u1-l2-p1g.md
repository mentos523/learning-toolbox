---
id: "ch07-u1-l2-p1g"
title: "平移：顶点搬家整条走"
concept: "图形：抛物线的平移"
prev: "ch07-u1-l2-p1b"
next: "ch07-u1-l2-p2"
---

## 讲解

两条抛物线同步描点：形状一模一样，整条平移。

h 管左右（左加右减），k 管上下（上加下减）。

```interaction
{
  "params": {
    "labels": [
      "y=x²：顶点 (0,0)",
      "y=(x−2)²+1：顶点 (2,1)"
    ],
    "left": {
      "kind": "plot-points",
      "params": {
        "autoPlay": true,
        "fn": "x^2",
        "speed": 500,
        "step": 1,
        "xMax": 4,
        "xMin": -4
      }
    },
    "right": {
      "kind": "plot-points",
      "params": {
        "autoPlay": true,
        "fn": "(x-2)^2+1",
        "speed": 500,
        "step": 1,
        "xMax": 6,
        "xMin": -2
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
    "latex": "y = (x-2)^2 + 1",
    "translation": "顶点 (2,1)：h=2 右移，k=1 上移"
  },
  {
    "id": "f2",
    "latex": "\\text{形状不变}",
    "translation": "a=1 没变：开口大小形状完全一样，只是位置搬了家"
  }
]
```

```data
{
  "hints": [
    "两条抛物线同步描点：形状一模一样，整条平移。",
    "h 管左右（左加右减），k 管上下（上加下减）。"
  ],
  "examples": [
    {
      "figure": "数形结合",
      "text": "y=(x+3)²−2：顶点 (−3,−2)，由 y=x² 左移 3、下移 2 得到。"
    }
  ]
}
```
