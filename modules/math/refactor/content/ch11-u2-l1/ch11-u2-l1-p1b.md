---
id: "ch11-u2-l1-p1b"
title: "求导公式：先背幂法则"
concept: "讲解：基本初等函数的导数"
prev: "ch11-u2-l1-p1"
next: "ch11-u2-l2-p1"
---

## 讲解

幂法则 (xⁿ)'=nxⁿ⁻¹：先把分数、根号化成 xⁿ 再求导。

常数求导是 0：(5)'=0——水平的线，斜率为 0。

```interaction
{
  "params": {
    "labels": [
      "y=sin x",
      "y'=cos x"
    ],
    "left": {
      "kind": "plot-points",
      "params": {
        "autoPlay": true,
        "fn": "sin(x)",
        "speed": 400,
        "step": 0.2,
        "xMax": 6.3,
        "xMin": 0
      }
    },
    "right": {
      "kind": "plot-points",
      "params": {
        "autoPlay": true,
        "fn": "cos(x)",
        "speed": 400,
        "step": 0.2,
        "xMax": 6.3,
        "xMin": 0
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
    "latex": "(x^5)' = 5x^4",
    "translation": "指数 5 落下来当系数，指数减 1"
  },
  {
    "id": "f2",
    "latex": "(\\frac{1}{x})' = -\\frac{1}{x^2}",
    "translation": "1/x=x⁻¹：(−1)x⁻²=−1/x²"
  },
  {
    "id": "f3",
    "latex": "(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}",
    "translation": "√x=x^(1/2)：(1/2)x^(−1/2)"
  }
]
```

```data
{
  "hints": [
    "幂法则 (xⁿ)'=nxⁿ⁻¹：先把分数、根号化成 xⁿ 再求导。",
    "常数求导是 0：(5)'=0——水平的线，斜率为 0。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "(x²+3x)'=2x+3：和差法则，先拆再导。"
    }
  ]
}
```
