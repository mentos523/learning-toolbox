---
id: "ch12-u2-l4-p1b"
title: "积分=累积量"
concept: "讲解：定积分的应用"
prev: "ch12-u2-l4-p1"
next: "ch12-u2-l5-p1"
---

## 讲解

积分是累积量的计算器：速度积出路程，流速积出水量。

离散累加（Σ）vs 连续累积（∫）：份数→∞，Σ 变成 ∫。

```interaction
{
  "params": {
    "buttonLabel": "再流 1 分钟",
    "maxSteps": 20,
    "mode": "accumulate",
    "showTrend": true,
    "term": "2*n"
  },
  "type": "numeric-lab"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "\\int_{0}^{10} 3 dt = 30",
    "translation": "流速恒 3，10 分钟：3×10=30 升"
  },
  {
    "id": "f2",
    "latex": "\\int_{0}^{10} 2t dt = 100",
    "translation": "流速 2t：t²|₀¹⁰=100 升"
  }
]
```

```data
{
  "hints": [
    "积分是累积量的计算器：速度积出路程，流速积出水量。",
    "离散累加（Σ）vs 连续累积（∫）：份数→∞，Σ 变成 ∫。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "v=t²，10 秒路程=∫₀¹⁰t²dt=1000/3≈333 米。"
    }
  ]
}
```
