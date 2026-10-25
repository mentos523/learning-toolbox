---
id: "ch06-u2-l2-p1g"
title: "b 平移：直线上下搬家"
concept: "图形：b 的平移作用"
prev: "ch06-u2-l2-p1b"
next: "ch06-u2-l3-p1"
---

## 讲解

两条直线同步描点：形状一模一样，只是上下错开 2。

b 变化只平移不转动：k 相同，直线永远平行。

```interaction
{
  "params": {
    "labels": [
      "y=2x+1",
      "y=2x+3：向上平移 2"
    ],
    "left": {
      "kind": "plot-points",
      "params": {
        "autoPlay": true,
        "fn": "2*x + 1",
        "speed": 500,
        "step": 1,
        "xMax": 3,
        "xMin": -3
      }
    },
    "right": {
      "kind": "plot-points",
      "params": {
        "autoPlay": true,
        "fn": "2*x + 3",
        "speed": 500,
        "step": 1,
        "xMax": 3,
        "xMin": -3
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
    "latex": "y = 2x + 1",
    "translation": "b=1：与 y 轴交于 (0,1)"
  },
  {
    "id": "f2",
    "latex": "y = 2x + 3",
    "translation": "b=3（与 y=2x+1 比）：整条直线向上平移 2，k 不变所以平行"
  }
]
```

```data
{
  "hints": [
    "两条直线同步描点：形状一模一样，只是上下错开 2。",
    "b 变化只平移不转动：k 相同，直线永远平行。"
  ],
  "examples": [
    {
      "figure": "数形结合",
      "text": "y=2x+1、y=2x−2、y=2x+5：一组平行线，只是 b 不同。"
    }
  ]
}
```
