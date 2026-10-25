---
id: "ch12-u1-l4-p1b"
title: "线性性质：分开算"
concept: "讲解：定积分的线性性质"
prev: "ch12-u1-l4-p1"
next: "ch12-u2-l1-p1"
---

## 讲解

线性=可加可乘常数：∫(f+g)=∫f+∫g，∫(kf)=k∫f。

区间也可加：∫₀¹+∫₁²=∫₀²。

```interaction
{
  "params": {
    "labels": [
      "分开算再加",
      "先加再积分"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "a^2/2+a^3/3",
        "label": "a",
        "max": 3,
        "min": 0,
        "step": 0.25
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "(3*a^2+2*a^3)/6",
        "label": "a",
        "max": 3,
        "min": 0,
        "step": 0.25
      }
    },
    "sync": [
      "a"
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
    "latex": "\\int_{0}^{1} (2x + 3) dx",
    "translation": "拆：∫2xdx+∫3dx"
  },
  {
    "id": "f2",
    "latex": "= 1 + 3 = 4",
    "translation": "2×(1/2)+3×1=1+3=4"
  }
]
```

```data
{
  "hints": [
    "线性=可加可乘常数：∫(f+g)=∫f+∫g，∫(kf)=k∫f。",
    "区间也可加：∫₀¹+∫₁²=∫₀²。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "∫₀²(3x)dx=3∫₀²xdx=3×2=6。"
    }
  ]
}
```
