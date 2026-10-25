---
id: "ch05x-u3-l1-p1"
title: "每条方程都是一条直线"
concept: "二元一次方程的图像"
prev: "ch05x-u2-l1-p2"
next: "ch05x-u3-l1-p2"
---

## 讲解

b=0 时方程变成 x=c/a，是竖直线，同样有无数组解（x 固定、y 任意），只是写不成 y=kx+b 的样子。

k、b 都是由你拖动的 a、b、c 算出来的：k=−a/b、常数项=c/b。

下一章你会给这些直线起新名字——一次函数。

```interaction
{
  "type": "sys-lab",
  "params": {
    "sliders": [
      {
        "id": "a",
        "label": "a",
        "min": -5,
        "max": 5,
        "step": 1,
        "initial": 1
      },
      {
        "id": "b",
        "label": "b",
        "min": -5,
        "max": 5,
        "step": 1,
        "initial": 1
      },
      {
        "id": "c",
        "label": "c",
        "min": -12,
        "max": 12,
        "step": 1,
        "initial": 10
      },
      {
        "id": "x",
        "label": "x",
        "min": -8,
        "max": 8,
        "step": 1,
        "initial": 0
      }
    ],
    "derived": [
      {
        "id": "y",
        "expr": "(c - a*x)/b",
        "label": "y = (c − a·x)/b"
      },
      {
        "id": "k",
        "expr": "-a/b",
        "label": "k = −a/b"
      }
    ],
    "point": {
      "xExpr": "x",
      "yExpr": "(c - a*x)/b",
      "xRange": [
        -8,
        8
      ],
      "yRange": [
        -12,
        12
      ],
      "caption": "点 (x, y) 在直线上走"
    },
    "guard": {
      "when": "b == 0",
      "message": "b=0 时禁用：先保证 b≠0——此时方程是竖直线 x=c/a，写不成 y=kx+b 的样子"
    },
    "note": "x 滑块 −8~8（与取景对齐）；b=0 时方程变成 x=c/a，是竖直线，同样有无数组解"
  },
  "engine": {
    "primitive": "SysLab",
    "version": "2026.10.16.A",
    "params": {
      "sliders": [
        "a",
        "b",
        "c",
        "x"
      ],
      "guard": "b!=0"
    }
  }
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "ax + by = c \\Rightarrow y = \\frac{c - a x}{b}",
    "translation": "ax+by=c（b≠0）→ y=(c−ax)/b：每条方程都是一条直线"
  },
  {
    "id": "f2",
    "latex": "k = -\\frac{a}{b}, \\quad b_0 = \\frac{c}{b}",
    "translation": "写成 y=kx+b：k=−a/b，常数项=c/b"
  }
]
```

```data
{
  "hints": [
    "b=0 时方程变成 x=c/a，是竖直线，同样有无数组解（x 固定、y 任意），只是写不成 y=kx+b 的样子。",
    "k、b 都是由你拖动的 a、b、c 算出来的：k=−a/b、常数项=c/b。",
    "下一章你会给这些直线起新名字——一次函数。"
  ],
  "examples": [
    {
      "text": "亲手算：拖 a、b、c，看 k=−a/b 如何变化。",
      "figure": "探索"
    }
  ]
}
```
