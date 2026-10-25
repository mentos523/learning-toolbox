---
id: "ch07-u1-l1-p2b"
title: "a：符号定开口大小定宽窄"
concept: "讲解：二次项系数 a"
prev: "ch07-u1-l1-p2"
next: "ch07-u1-l2-p1"
---

## 讲解

a>0 微笑（向上），a<0 哭脸（向下）。

|a| 越大越瘦：a=3 的抛物线比 a=1 的“收”得更紧。

```interaction
{
  "params": {
    "source": {
      "initial": 2,
      "label": "a",
      "max": 3,
      "min": -3,
      "step": 0.5
    },
    "views": [
      {
        "expr": "a*4",
        "kind": "readout",
        "label": "x=2 时 y"
      },
      {
        "kind": "point",
        "xExpr": "2",
        "yExpr": "a*4"
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
    "latex": "y = 2x^2",
    "translation": "a=2>0：开口向上；|a|=2，比 y=x² 瘦"
  },
  {
    "id": "f2",
    "latex": "y = -\\frac{1}{2}x^2",
    "translation": "a=−1/2<0：开口向下；|a|=1/2，比 y=x² 胖"
  }
]
```

```data
{
  "hints": [
    "a>0 微笑（向上），a<0 哭脸（向下）。",
    "|a| 越大越瘦：a=3 的抛物线比 a=1 的“收”得更紧。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "y=−2x²：开口向下，比 y=−x² 瘦。"
    }
  ]
}
```
