---
id: "ch09-u2-l4-p1b"
title: "错位相减：中间全消"
concept: "讲解：等比数列求和"
prev: "ch09-u2-l4-p1"
next: "ch09-u2-l4-p2"
---

## 讲解

错位相减：Sₙ 乘 q（错一位），第 k 项对上第 k+1 项；相减全消，只剩首尾。

条件：q≠1；q=1 时 Sₙ=na₁。

```interaction
{
  "params": {
    "expr": "2^n-1",
    "label": "n",
    "max": 12,
    "min": 1,
    "step": 1,
    "target": 127,
    "targetLabel": "S₇=127"
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
    "latex": "S = 1 + 2 + 4 + 8",
    "translation": "S=15（4 项）"
  },
  {
    "id": "f2",
    "latex": "2S = 2 + 4 + 8 + 16",
    "translation": "两边乘公比 2：错开一位"
  },
  {
    "id": "f3",
    "latex": "2S - S = 16 - 1 = 15",
    "translation": "相减：中间 2、4、8 全消掉"
  }
]
```

```data
{
  "hints": [
    "错位相减：Sₙ 乘 q（错一位），第 k 项对上第 k+1 项；相减全消，只剩首尾。",
    "条件：q≠1；q=1 时 Sₙ=na₁。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "1+3+9+27：q=3，S₄=(3⁴−1)/2=40。"
    }
  ]
}
```
