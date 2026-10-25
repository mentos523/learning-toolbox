---
id: "ch05-u2-l1-p1b"
title: "二次不等式：三步看图像"
concept: "讲解：二次不等式的图像解法"
prev: "ch05-u2-l1-p1"
next: "ch05-u2-l1-p2"
---

## 讲解

三步：解方程找交点；看开口定形状；按不等号取上方/下方。

>0 取上方（两边），<0 取下方（中间）——开口向上时。

```interaction
{
  "params": {
    "source": {
      "initial": 2.5,
      "label": "x",
      "max": 5,
      "min": 0,
      "step": 0.5
    },
    "views": [
      {
        "expr": "x^2 - 5*x + 6",
        "kind": "readout",
        "label": "x²−5x+6"
      },
      {
        "kind": "point",
        "xExpr": "x",
        "yExpr": "x^2 - 5*x + 6"
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
    "latex": "x^2 - 5x + 6 < 0",
    "translation": "第一步：解方程 x²−5x+6=0 得 x=2 或 3（交点）"
  },
  {
    "id": "f2",
    "latex": "\\text{开口向上}",
    "translation": "第二步：a=1>0，开口向上"
  },
  {
    "id": "f3",
    "latex": "2 < x < 3",
    "translation": "第三步：<0 取下方（两根之间）：2<x<3"
  }
]
```

```data
{
  "hints": [
    "三步：解方程找交点；看开口定形状；按不等号取上方/下方。",
    ">0 取上方（两边），<0 取下方（中间）——开口向上时。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x²−4<0：交点 ±2，开口向上，取中间：−2<x<2。"
    }
  ]
}
```
