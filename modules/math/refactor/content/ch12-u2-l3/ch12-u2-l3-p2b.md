---
id: "ch12-u2-l3-p2b"
title: "C 抵消：随便选个原函数"
concept: "讲解：原函数差与常数无关"
prev: "ch12-u2-l3-p2"
next: "ch12-u2-l4-p1"
---

## 讲解

定积分只用原函数的差：C 会被减掉，所以+C 写不写都行。

但不定积分必须写 +C：它表示一整族原函数。

```interaction
{
  "params": {
    "labels": [
      "A(x)=x²",
      "F(x)=x²+1"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "x^2",
        "label": "x",
        "max": 4,
        "min": 0,
        "step": 0.1
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "x^2+1",
        "label": "x",
        "max": 4,
        "min": 0,
        "step": 0.1
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
    "latex": "\\int_{0}^{2} 3x^2 dx",
    "translation": "原函数 x³+C"
  },
  {
    "id": "f2",
    "latex": "= (8 + C) - (0 + C) = 8",
    "translation": "C−C=0：用哪个 C 结果都是 8"
  }
]
```

```data
{
  "hints": [
    "定积分只用原函数的差：C 会被减掉，所以+C 写不写都行。",
    "但不定积分必须写 +C：它表示一整族原函数。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "∫₁²2xdx=(4+C)−(1+C)=3。"
    }
  ]
}
```
