---
id: "ch08-u2-l4-p1b"
title: "对数法则：乘变加"
concept: "讲解：对数的运算法则"
prev: "ch08-u2-l4-p1"
next: "ch08-u2-l5-p1"
---

## 讲解

三大法则：乘→加，除→减，幂→乘（指数变系数）。

法则的反向也常用：log₂8+log₂4=log₂32——加变乘。

```interaction
{
  "params": {
    "source": {
      "initial": 2,
      "label": "m",
      "max": 5,
      "min": 1,
      "step": 1
    },
    "views": [
      {
        "expr": "2^m",
        "kind": "readout",
        "label": "M=2ᵐ"
      },
      {
        "expr": "2^m*4",
        "kind": "readout",
        "label": "MN（N=4 固定）"
      },
      {
        "expr": "m+2",
        "kind": "readout",
        "label": "log₂(MN)=log₂M+log₂4"
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
    "latex": "\\log_2 48",
    "translation": "48=16×3：真数是乘积"
  },
  {
    "id": "f2",
    "latex": "\\log_2 48 = \\log_2 16 + \\log_2 3",
    "translation": "=4+log₂3：真数相乘，对数相加"
  },
  {
    "id": "f3",
    "latex": "\\log_2 \\frac{1}{8} = -3",
    "translation": "真数相除，对数相减：log₂1−log₂8=0−3=−3"
  }
]
```

```data
{
  "hints": [
    "三大法则：乘→加，除→减，幂→乘（指数变系数）。",
    "法则的反向也常用：log₂8+log₂4=log₂32——加变乘。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "lg200=lg(2×100)=lg2+2≈2.301。"
    }
  ]
}
```
