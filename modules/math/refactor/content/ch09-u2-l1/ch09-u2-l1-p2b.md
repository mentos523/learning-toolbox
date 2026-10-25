---
id: "ch09-u2-l1-p2b"
title: "公差 d：走了几步"
concept: "讲解：等差数列的通项"
prev: "ch09-u2-l1-p2"
next: "ch09-u2-l2-p1"
---

## 讲解

aₙ=a₁+(n−1)d：(n−1) 是“走了几步”，别写成 n。

d 为负数列递减：公差是变化量，不是增量。

```interaction
{
  "params": {
    "expr": "5+9*d",
    "label": "d",
    "max": 3,
    "min": -3,
    "step": 0.5,
    "target": -13,
    "targetLabel": "d=−2 时 a₁₀=−13"
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
    "latex": "a_1 = 5, d = -2",
    "translation": "首项 5，公差 −2：数列往下走"
  },
  {
    "id": "f2",
    "latex": "5, 3, 1, -1, \\cdot\\cdot\\cdot",
    "translation": "5→3→1→−1：每步减 2"
  },
  {
    "id": "f3",
    "latex": "a_{10} = 5 + 9 \\times (-2) = -13",
    "translation": "第 10 项：走了 9 步，5−18=−13"
  }
]
```

```data
{
  "hints": [
    "aₙ=a₁+(n−1)d：(n−1) 是“走了几步”，别写成 n。",
    "d 为负数列递减：公差是变化量，不是增量。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "a₁=10,d=−3：a₅=10+4×(−3)=−2。"
    }
  ]
}
```
