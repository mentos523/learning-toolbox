---
id: "ch11-u3-l1-p1b"
title: "单调性：导数是坡度计"
concept: "讲解：单调性"
prev: "ch11-u3-l1-p1"
next: "ch11-u3-l2-p1"
---

## 讲解

判断单调性：求 f'(x)，解 f'(x)>0 得递增区间。

f'(x)=0 的点是“换挡点”：单调性可能在这里改变。

```interaction
{
  "params": {
    "source": {
      "initial": 0,
      "label": "x",
      "max": 3,
      "min": -3,
      "step": 0.1
    },
    "views": [
      {
        "axisLabelX": "x",
        "axisLabelY": "y",
        "kind": "point",
        "xExpr": "x",
        "yExpr": "x^3-3*x"
      },
      {
        "expr": "3*x^2-3",
        "kind": "readout",
        "label": "f'(x)"
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
    "latex": "f(x) = x^3",
    "translation": "f'(x)=3x²≥0：恒递增"
  },
  {
    "id": "f2",
    "latex": "f'(x) > 0 \\to \\text{递增}",
    "translation": "导数>0：上坡"
  },
  {
    "id": "f3",
    "latex": "f'(x) < 0 \\to \\text{递减}",
    "translation": "导数<0：下坡"
  }
]
```

```data
{
  "hints": [
    "判断单调性：求 f'(x)，解 f'(x)>0 得递增区间。",
    "f'(x)=0 的点是“换挡点”：单调性可能在这里改变。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "y=x²：f'=2x，x>0 递增，x<0 递减。"
    }
  ]
}
```
