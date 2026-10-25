---
id: "ch10-u1-l1-p1b"
title: "逼近：永远差一点"
concept: "讲解：逼近思想"
prev: "ch10-u1-l1-p1"
next: "ch10-u1-l2-p1"
---

## 讲解

“无限接近”不是“等于”：Sₙ 永远 <1，但可以任意接近 1。

极限描述的是趋势：n 越大，Sₙ 离 1 越近。

```interaction
{
  "params": {
    "buttonLabel": "加一项",
    "maxSteps": 20,
    "mode": "accumulate",
    "precision": 6,
    "showTrend": true,
    "term": "1/2^n"
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
    "latex": "S_3 = \\frac{7}{8}",
    "translation": "加 3 项：1/2+1/4+1/8=7/8"
  },
  {
    "id": "f2",
    "latex": "S_{10} = 1 - \\frac{1}{1024}",
    "translation": "加 10 项：差 1/1024"
  },
  {
    "id": "f3",
    "latex": "\\lim_{n \\to \\infty} S_n = 1",
    "translation": "项数越多离 1 越近：极限是 1"
  }
]
```

```data
{
  "hints": [
    "“无限接近”不是“等于”：Sₙ 永远 <1，但可以任意接近 1。",
    "极限描述的是趋势：n 越大，Sₙ 离 1 越近。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "0.999…=1：0.9,0.99,0.999,…无限逼近 1。"
    }
  ]
}
```
