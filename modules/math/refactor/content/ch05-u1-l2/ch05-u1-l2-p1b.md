---
id: "ch05-u1-l2-p1b"
title: "解集画数轴：空心实心"
concept: "讲解：一元一次不等式的解法"
prev: "ch05-u1-l2-p1"
next: "ch05-u1-l2-p1g"
---

## 讲解

解法和方程一样：移项、合并、系数化 1——只有乘除负数时多一步反向。

解完画数轴：< 空心圈向左，> 空心圈向右；含等号用实心点。

```interaction
{
  "type": "ineq-shade-lab",
  "params": {
    "source": {
      "label": "x",
      "min": 0,
      "max": 10,
      "step": 1
    },
    "mode": "single",
    "sets": [
      {
        "expr": "3*x-5-10",
        "ineq": "<",
        "label": "3x−5<10"
      },
      {
        "expr": "-4*x-12",
        "ineq": ">=",
        "label": "−4x≥12（实心端点演示）"
      }
    ],
    "showProbe": true
  },
  "engine": {
    "primitive": "IneqShadeLab",
    "version": "2026.10.16.A",
    "params": {
      "mode": "single",
      "sets": [
        {
          "expr": "3*x-5-10",
          "ineq": "<",
          "label": "3x−5<10"
        },
        {
          "expr": "-4*x-12",
          "ineq": ">=",
          "label": "−4x≥12（实心端点演示）"
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
    "latex": "3x - 5 < 10",
    "translation": "第一步：移项，3x<15（性质一，方向不变）"
  },
  {
    "id": "f2",
    "latex": "x < 5",
    "translation": "第二步：两边同除以 3（正数，方向不变）"
  },
  {
    "id": "f3",
    "latex": "(-\\infty, 5)",
    "translation": "解集：数轴上 5 处空心圈，向左画射线"
  }
]
```

```data
{
  "hints": [
    "解法和方程一样：移项、合并、系数化 1——只有乘除负数时多一步反向。",
    "解完画数轴：< 空心圈向左，> 空心圈向右；含等号用实心点。"
  ],
  "examples": [
    {
      "figure": "易错提醒",
      "text": "−4x≥12：两边同除以 −4 得 x≤−3（反向！）。"
    }
  ]
}
```
