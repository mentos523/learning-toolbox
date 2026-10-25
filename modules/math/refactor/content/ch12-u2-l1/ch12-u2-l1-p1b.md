---
id: "ch12-u2-l1-p1b"
title: "面积函数：上限是变量"
concept: "讲解：变上限积分"
prev: "ch12-u2-l1-p1"
next: "ch12-u2-l2-p1"
---

## 讲解

变上限积分：上限 x 会动，面积 A(x) 是 x 的函数。

A'(x)=f(x)：面积函数的导数正是被积函数——基本定理的种子。

```interaction
{
  "params": {
    "source": {
      "initial": 2,
      "label": "x",
      "max": 4,
      "min": 0,
      "step": 0.1
    },
    "views": [
      {
        "axisLabelX": "x",
        "axisLabelY": "A(x)",
        "kind": "point",
        "xExpr": "x",
        "yExpr": "x^2"
      },
      {
        "expr": "x^2",
        "kind": "readout",
        "label": "A(x)：阴影面积"
      },
      {
        "expr": "2*x",
        "kind": "readout",
        "label": "A'(x)=2x=f(x)"
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
    "latex": "A(2) = \\int_{0}^{2} 2t dt = 4",
    "translation": "x=2：面积 4"
  },
  {
    "id": "f2",
    "latex": "A(3) = 9",
    "translation": "x=3：面积 9"
  },
  {
    "id": "f3",
    "latex": "A(x) = x^2",
    "translation": "一般：A(x)=x²"
  }
]
```

```data
{
  "hints": [
    "变上限积分：上限 x 会动，面积 A(x) 是 x 的函数。",
    "A'(x)=f(x)：面积函数的导数正是被积函数——基本定理的种子。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "A(x)=∫₀ˣt²dt=x³/3：A'(x)=x²。"
    }
  ]
}
```
