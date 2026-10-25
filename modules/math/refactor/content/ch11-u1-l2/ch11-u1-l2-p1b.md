---
id: "ch11-u1-l2-p1b"
title: "h→0：区间缩成一点"
concept: "讲解：导数的极限定义"
prev: "ch11-u1-l2-p1"
next: "ch11-u1-l3-p1"
---

## 讲解

h 是区间长度：h 越小，平均变化率越接近瞬时变化率。

h→0 不是 h=0：分母不能为 0，是“无限靠近”。

```interaction
{
  "params": {
    "expr": "((1+h)^2-1)/h",
    "label": "h",
    "max": 1,
    "min": 0.01,
    "step": 0.01
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
    "latex": "h = 1: \\frac{2^2 - 1}{1} = 3",
    "translation": "h=1：平均变化率 3"
  },
  {
    "id": "f2",
    "latex": "h = 0.01: 2.01",
    "translation": "h=0.01：2.01"
  },
  {
    "id": "f3",
    "latex": "h \\to 0: 2",
    "translation": "h→0：趋向 2——这就是 f'(1)"
  }
]
```

```data
{
  "hints": [
    "h 是区间长度：h 越小，平均变化率越接近瞬时变化率。",
    "h→0 不是 h=0：分母不能为 0，是“无限靠近”。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "时速表：h 是 1 小时→1 分钟→1 秒，越来越“瞬时”。"
    }
  ]
}
```
