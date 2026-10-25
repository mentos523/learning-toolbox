---
id: "ch06-u0-l1-p1b"
title: "方程求数，函数看关系"
concept: "讲解：函数与方程的区别"
prev: "ch06-u0-l1-p1"
next: "ch06-u0-l1-p2"
---

## 讲解

方程是“求数”：答案是一个数；函数是“看关系”：答案是一串对应。

y=3x 里令 y=12，就变回方程 3x=12——函数是方程的“动态版”。

预告回音：前一章说过，下一章这些直线会有新名字——一次函数。

```interaction
{
  "params": {
    "source": {
      "initial": 2,
      "label": "x",
      "max": 5,
      "min": 0,
      "step": 0.5
    },
    "views": [
      {
        "expr": "3*x",
        "kind": "readout",
        "label": "y"
      },
      {
        "kind": "point",
        "xExpr": "x",
        "yExpr": "3*x"
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
    "latex": "3x = 12",
    "translation": "方程：求一个确定的 x=4"
  },
  {
    "id": "f2",
    "latex": "y = 3x",
    "translation": "函数：x 取 1 得 3，取 2 得 6——一串对应关系"
  }
]
```

```data
{
  "hints": [
    "方程是“求数”：答案是一个数；函数是“看关系”：答案是一串对应。",
    "y=3x 里令 y=12，就变回方程 3x=12——函数是方程的“动态版”。",
    "预告回音：前一章说过，下一章这些直线会有新名字——一次函数。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "路程=速度×时间：速度 60 时 s=60t 是函数；s=120 时 t=2 是方程。"
    }
  ]
}
```
