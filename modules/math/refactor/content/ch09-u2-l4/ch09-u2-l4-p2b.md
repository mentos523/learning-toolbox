---
id: "ch09-u2-l4-p2b"
title: "指数爆炸：翻一番的威力"
concept: "讲解：指数增长"
prev: "ch09-u2-l4-p2"
next: "ch09-u2-l5-p1"
---

## 讲解

指数增长=越涨越快：第 30 格一格就顶前面 29 格的总和。

2¹⁰≈10³：记住 1024≈1000，估算指数有抓手。

```interaction
{
  "params": {
    "buttonLabel": "加一格",
    "maxSteps": 15,
    "mode": "accumulate",
    "showTrend": true,
    "term": "2^(n-1)"
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
    "latex": "2^{10} = 1024",
    "translation": "第 10 格：1024 粒"
  },
  {
    "id": "f2",
    "latex": "2^{20} = 1048576",
    "translation": "第 20 格：约 100 万粒"
  },
  {
    "id": "f3",
    "latex": "2^{30} \\approx 10^9",
    "translation": "第 30 格：约 10 亿粒——棋盘才走了一半！"
  }
]
```

```data
{
  "hints": [
    "指数增长=越涨越快：第 30 格一格就顶前面 29 格的总和。",
    "2¹⁰≈10³：记住 1024≈1000，估算指数有抓手。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "一张纸对折 30 次：2³⁰ 层，厚度约 10 万米！"
    }
  ]
}
```
