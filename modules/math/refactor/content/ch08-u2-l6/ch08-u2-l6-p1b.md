---
id: "ch08-u2-l6-p1b"
title: "互逆小结：域值互换"
concept: "讲解：指数与对数互为反函数"
prev: "ch08-u2-l6-p1"
next: "ch08-u3-l1-p1"
---

## 讲解

互逆的两大表现：运算互逆（a^(logₐN)=N），定义域值域互换。

记住一句话：指数管“乘方”，对数管“问几次方”。

```interaction
{
  "params": {
    "labels": [
      "指数之旅：x→2ˣ（去程）",
      "对数之旅：x→log₂x（回程）"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "2^x",
        "label": "x",
        "max": 3,
        "min": -3,
        "step": 0.25,
        "target": 8,
        "targetLabel": "目标 8（2³=8）"
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "log2(x)",
        "label": "x",
        "max": 8,
        "min": 0.2,
        "step": 0.2,
        "target": 3,
        "targetLabel": "目标 3（log₂8=3）"
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
    "latex": "y = 2^x: x \\in R, y > 0",
    "translation": "指数函数：x 任意实数，y 恒大于 0"
  },
  {
    "id": "f2",
    "latex": "y = \\log_2 x: x > 0, y \\in R",
    "translation": "对数函数：x 大于 0，y 任意实数——定义域值域互换"
  }
]
```

```data
{
  "hints": [
    "互逆的两大表现：运算互逆（a^(logₐN)=N），定义域值域互换。",
    "记住一句话：指数管“乘方”，对数管“问几次方”。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "y=10ˣ 与 y=lgx：一个定义域 R，一个 x>0。"
    }
  ]
}
```
