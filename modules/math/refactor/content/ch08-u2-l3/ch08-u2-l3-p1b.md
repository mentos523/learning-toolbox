---
id: "ch08-u2-l3-p1b"
title: "互逆：去程与回程"
concept: "讲解：指数与对数互逆"
prev: "ch08-u2-l3-p1"
next: "ch08-u2-l3-p1g"
---

## 讲解

互逆=输入输出互换：2³=8 与 log₂8=3 说的是一回事。

a^(logₐN)=N，logₐ(aˣ)=x：一去一回，原地踏步。

```interaction
{
  "params": {
    "labels": [
      "指数之旅：x→2ˣ",
      "对数之旅：x→log₂x"
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
        "targetLabel": "目标 8"
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
        "targetLabel": "目标 3"
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
    "latex": "3^4 = 81",
    "translation": "去程：指数运算"
  },
  {
    "id": "f2",
    "latex": "\\log_3 81 = 4",
    "translation": "回程：对数运算，回到指数 4"
  },
  {
    "id": "f3",
    "latex": "2^{\\log_2 5} = 5",
    "translation": "先对数后指数：回到 5——互逆的铁证"
  }
]
```

```data
{
  "hints": [
    "互逆=输入输出互换：2³=8 与 log₂8=3 说的是一回事。",
    "a^(logₐN)=N，logₐ(aˣ)=x：一去一回，原地踏步。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "10^(lg7)=7；ln(e³)=3。"
    }
  ]
}
```
