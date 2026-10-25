---
id: "ch12-u2-l2-p1b"
title: "原函数：倒着求导"
concept: "讲解：原函数与不定积分"
prev: "ch12-u2-l2-p1"
next: "ch12-u2-l3-p1"
---

## 讲解

原函数=求导的逆运算：(F)'=f，则 F 是 f 的原函数。

+C 不能丢：x²、x²+1、x²−100 的导数都是 2x。

```interaction
{
  "params": {
    "labels": [
      "F(x)=x³/3：原函数",
      "F'(x)=x²：求导回到 f"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "x^3/3",
        "label": "x",
        "max": 2,
        "min": -2,
        "step": 0.1
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "x^2",
        "label": "x",
        "max": 2,
        "min": -2,
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
    "latex": "(x^2)' = 2x",
    "translation": "顺着：x² 求导得 2x"
  },
  {
    "id": "f2",
    "latex": "\\int 2x dx = x^2 + C",
    "translation": "倒着：2x 的原函数是 x²+C"
  },
  {
    "id": "f3",
    "latex": "(x^2 + 5)' = 2x",
    "translation": "C=5 也行：常数求导是 0"
  }
]
```

```data
{
  "hints": [
    "原函数=求导的逆运算：(F)'=f，则 F 是 f 的原函数。",
    "+C 不能丢：x²、x²+1、x²−100 的导数都是 2x。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "∫3x²dx=x³+C：因为 (x³)'=3x²。"
    }
  ]
}
```
