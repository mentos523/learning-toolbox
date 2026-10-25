---
id: "ch05-u2-l1-p2b"
title: "Δ=0 与 Δ<0：先看判别式"
concept: "讲解：Δ=0 与 Δ<0 的二次不等式"
prev: "ch05-u2-l1-p2"
next: "ch05-u2-l2-p1"
---

## 讲解

Δ=0 先想相切：>0 去掉切点，≥0 全体实数，<0 无解，≤0 只有切点。

Δ<0 先看开口：向上+>0 恒成立，向下+<0 恒成立，反过来都无解。

```interaction
{
  "type": "ineq-shade-lab",
  "params": {
    "source": {
      "label": "x",
      "min": -3,
      "max": 5,
      "step": 0.5
    },
    "mode": "compare",
    "sets": [
      {
        "expr": "x^2-4*x+4",
        "ineq": "<",
        "label": "相切：x²−4x+4<0（无解）"
      },
      {
        "expr": "x^2+1",
        "ineq": ">",
        "label": "悬空：x²+1>0（恒成立）"
      }
    ],
    "showProbe": true,
    "note": "左：(x−2)²<0 无解；右：x²+1>0 恒成立",
    "compareLabels": [
      "相切：x²−4x+4",
      "悬空：x²+1"
    ]
  },
  "engine": {
    "primitive": "IneqShadeLab",
    "version": "2026.10.16.A",
    "params": {
      "mode": "compare",
      "sets": [
        {
          "expr": "x^2-4*x+4",
          "ineq": "<",
          "label": "相切：x²−4x+4<0（无解）"
        },
        {
          "expr": "x^2+1",
          "ineq": ">",
          "label": "悬空：x²+1>0（恒成立）"
        }
      ]
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
    "latex": "x^2 - 4x + 4 < 0",
    "translation": "Δ=0：(x−2)²<0，平方不可能为负"
  },
  {
    "id": "f2",
    "latex": "\\text{无解}",
    "translation": "除 x=2 时等于 0，其余都大于 0：<0 无解"
  },
  {
    "id": "f3",
    "latex": "x^2 + 1 > 0",
    "translation": "Δ=−4<0，开口向上：恒成立，解集为全体实数"
  }
]
```

```data
{
  "hints": [
    "Δ=0 先想相切：>0 去掉切点，≥0 全体实数，<0 无解，≤0 只有切点。",
    "Δ<0 先看开口：向上+>0 恒成立，向下+<0 恒成立，反过来都无解。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x²+2x+1≥0：Δ=0，解集为全体实数（切点 x=−1 也成立）。"
    }
  ]
}
```
