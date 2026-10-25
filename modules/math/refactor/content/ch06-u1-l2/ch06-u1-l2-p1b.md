---
id: "ch06-u1-l2-p1b"
title: "函数：一个 x 一个 y"
concept: "讲解：函数的定义"
prev: "ch06-u1-l2-p1"
next: "ch06-u1-l3-p1"
---

## 讲解

函数铁律：一个 x 只许对应一个 y；反过来多个 x 对应一个 y 没问题。

y²=x 不是函数：x=4 时 y 有两个值，“唯一”被打破了。

```interaction
{
  "params": {
    "source": {
      "initial": 1,
      "label": "x",
      "max": 4,
      "min": 0,
      "step": 1
    },
    "views": [
      {
        "expr": "x^2",
        "kind": "readout",
        "label": "y"
      },
      {
        "kind": "point",
        "xExpr": "x",
        "yExpr": "x^2"
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
    "latex": "y^2 = x",
    "translation": "x=4 时 y=2 或 y=−2：一个 x 对应两个 y，不是函数"
  },
  {
    "id": "f2",
    "latex": "y = x^2",
    "translation": "x=±2 都对应 y=4：多对一，是函数"
  }
]
```

```data
{
  "hints": [
    "函数铁律：一个 x 只许对应一个 y；反过来多个 x 对应一个 y 没问题。",
    "y²=x 不是函数：x=4 时 y 有两个值，“唯一”被打破了。"
  ],
  "examples": [
    {
      "figure": "辨析",
      "text": "圆 x²+y²=1 不是函数图像：一竖线交出两个点，唯一性被打破。"
    }
  ]
}
```
