---
id: "ch04-u1-l3-p1b"
title: "求根公式：代入三步"
concept: "讲解：求根公式"
prev: "ch04-u1-l3-p1"
next: "ch04-u1-l4-p1"
---

## 讲解

套公式三步：认 a/b/c；算 Δ；代入。

符号是重灾区：b=5 时 −b=−5，先写负号再代入，别把 b 的符号弄丢。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": -3,
    "max": 1,
    "step": 0.5,
    "label": "x",
    "expr": "2*x^2 + 5*x + 2",
    "target": 0,
    "targetLabel": "等于 0 的点",
    "graph": {
      "kind": "parabola",
      "a": 2,
      "b": 5,
      "c": 2
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "parabola",
      "a": 2,
      "b": 5,
      "c": 2
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
    "latex": "2x^2 + 5x + 2 = 0",
    "translation": "第一步：认出 a=2，b=5，c=2"
  },
  {
    "id": "f2",
    "latex": "\\Delta = 25 - 16 = 9",
    "translation": "第二步：Δ=5²−4×2×2=9>0，有两个不等实根"
  },
  {
    "id": "f3",
    "latex": "x = \\frac{-5 \\pm 3}{4}",
    "translation": "第三步：代入公式，x=−0.5 或 x=−2；拖滑块验证"
  }
]
```

```data
{
  "hints": [
    "套公式三步：认 a/b/c；算 Δ；代入。",
    "符号是重灾区：b=5 时 −b=−5，先写负号再代入，别把 b 的符号弄丢。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x²−4x+4=0：Δ=16−16=0，x=2（两个相等的实根）。"
    }
  ]
}
```
