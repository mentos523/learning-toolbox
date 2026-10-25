---
id: "ch02-u3-l1-p1b"
title: "因式分解：和变回积"
concept: "讲解：因式分解的概念"
prev: "ch02-u3-l1-p1"
next: "ch02-u3-l2-p1"
---

## 讲解

因式分解 = 和变积，是整式乘法的逆运算。

检验标准：把分解结果乘开，能还原就对了；还要一次分到底。

```interaction
{
  "params": {
    "expr": "x^2 + 7*x + 12",
    "label": "x",
    "max": 10,
    "min": 0,
    "step": 0.5
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
    "latex": "x^2 + 7x + 12",
    "translation": "这是和的形式：三项相加"
  },
  {
    "id": "f2",
    "latex": "(x + 3)(x + 4)",
    "translation": "写成积的形式：这就是因式分解"
  },
  {
    "id": "f3",
    "latex": "(x + 3)(x + 4) = x^2 + 7x + 12",
    "translation": "倒回去展开能还原：说明分解对了"
  }
]
```

```data
{
  "hints": [
    "因式分解 = 和变积，是整式乘法的逆运算。",
    "检验标准：把分解结果乘开，能还原就对了；还要一次分到底。"
  ],
  "examples": [
    {
      "figure": "类比",
      "text": "12=2×2×3 是数字的因式分解；x²+7x+12=(x+3)(x+4) 是整式的。"
    }
  ]
}
```
