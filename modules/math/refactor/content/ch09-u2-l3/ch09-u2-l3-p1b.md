---
id: "ch09-u2-l3-p1b"
title: "等比数列：公比是倍数"
concept: "讲解：等比数列"
prev: "ch09-u2-l3-p1"
next: "ch09-u2-l4-p1"
---

## 讲解

等比数列=每次乘同一个数 q：q 是倍数。

q=1 是常数列；0<q<1 时数列递减趋向 0，如 8,4,2,1,…。

```interaction
{
  "params": {
    "autoPlay": true,
    "fn": "3*2^(x-1)",
    "speed": 500,
    "step": 1,
    "xMax": 10,
    "xMin": 1
  },
  "type": "plot-points"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "3, 6, 12, 24, \\cdot\\cdot\\cdot",
    "translation": "q=2：每次乘 2"
  },
  {
    "id": "f2",
    "latex": "a_n = 3 \\times 2^{n-1}",
    "translation": "通项：第 n 项=3×2ⁿ⁻¹"
  },
  {
    "id": "f3",
    "latex": "a_6 = 96",
    "translation": "第 6 项：3×2⁵=96"
  }
]
```

```data
{
  "hints": [
    "等比数列=每次乘同一个数 q：q 是倍数。",
    "q=1 是常数列；0<q<1 时数列递减趋向 0，如 8,4,2,1,…。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "−2,6,−18,…：q=−3，aₙ=−2×(−3)ⁿ⁻¹。"
    }
  ]
}
```
