---
id: "ch07-u1-l2-p2b"
title: "配方：一般式变顶点式"
concept: "讲解：一般式与顶点式的互化"
prev: "ch07-u1-l2-p2"
next: "ch07-u1-l3-p1"
---

## 讲解

配方四步：提 a；括号里配方；括号外整理；读顶点。

x²−4x+1：(−4/2)²=4，(x−2)²−4+1=(x−2)²−3。

```interaction
{
  "params": {
    "labels": [
      "一般式",
      "顶点式"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "x^2-4*x+1",
        "label": "x",
        "max": 6,
        "min": -2,
        "step": 0.5
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "(x-2)^2-3",
        "label": "x",
        "max": 6,
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
    "latex": "y = x^2 - 4x + 1",
    "translation": "第一步：x²−4x 配成 (x−2)²−4"
  },
  {
    "id": "f2",
    "latex": "y = (x - 2)^2 - 3",
    "translation": "第二步：−4+1=−3，顶点式完成"
  },
  {
    "id": "f3",
    "latex": "(2, -3)",
    "translation": "顶点 (2,−3)：开口向上，最小值 −3"
  }
]
```

```data
{
  "hints": [
    "配方四步：提 a；括号里配方；括号外整理；读顶点。",
    "x²−4x+1：(−4/2)²=4，(x−2)²−4+1=(x−2)²−3。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "y=2x²+8x+5=2(x+2)²−3：顶点 (−2,−3)。"
    }
  ]
}
```
