---
id: "ch09-u2-l2-p1b"
title: "高斯配对：首尾相加"
concept: "讲解：等差数列求和"
prev: "ch09-u2-l2-p1"
next: "ch09-u2-l3-p1"
---

## 讲解

配对=首项+末项：1+100，2+99，…，每对和相等。

n 为奇数时中间项落单：1 到 9，中间 5 单留，4 对×10+5=45。

```interaction
{
  "params": {
    "expr": "n*(n+1)/2",
    "label": "n",
    "max": 20,
    "min": 1,
    "step": 1,
    "target": 55,
    "targetLabel": "S₁₀=55"
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
    "latex": "S_{10} = 1 + 2 + \\cdot\\cdot\\cdot + 10",
    "translation": "1 到 10 求和"
  },
  {
    "id": "f2",
    "latex": "(1 + 10) \\times 5 = 55",
    "translation": "配 5 对，每对 11：55"
  },
  {
    "id": "f3",
    "latex": "S_n = \\frac{n(n+1)}{2}",
    "translation": "一般：1 到 n 的和 = n(n+1)/2"
  }
]
```

```data
{
  "hints": [
    "配对=首项+末项：1+100，2+99，…，每对和相等。",
    "n 为奇数时中间项落单：1 到 9，中间 5 单留，4 对×10+5=45。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "电影院第一排 20 座，每排多 2 座，10 排共 10×(20+38)/2=290 座。"
    }
  ]
}
```
