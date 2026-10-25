---
id: "ch03-u1-l2-p1b"
title: "约分：分子分母同除"
concept: "讲解：约分"
prev: "ch03-u1-l2-p1"
next: "ch03-u2-l1-p1"
---

## 讲解

约分=分子分母同除以公因式；约到不能再约叫最简分式。

大忌：(x+2)/2 约成 x——加号隔开的不是因式，不能约！

```interaction
{
  "params": {
    "expr": "(6*x^2)/(3*x)",
    "label": "x",
    "max": 10,
    "min": 1,
    "step": 1
  },
  "type": "slider-lab"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "\\frac{6x^2}{3x}",
    "translation": "分子 6x²，分母 3x：找公因式"
  },
  {
    "id": "f2",
    "latex": "\\frac{6x^2}{3x} = 2x",
    "translation": "同除以公因式 3x：6÷3=2，x²÷x=x"
  },
  {
    "id": "f3",
    "latex": "\\frac{x + 2}{2}",
    "translation": "反例：x+2 和 2 没有公因式，约不动——加减号隔开不能约"
  }
]
```

```data
{
  "hints": [
    "约分=分子分母同除以公因式；约到不能再约叫最简分式。",
    "大忌：(x+2)/2 约成 x——加号隔开的不是因式，不能约！"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "(a²−b²)/(a+b)=a−b：先把分子分解成 (a+b)(a−b)，再约。"
    }
  ]
}
```
