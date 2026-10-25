---
id: "ch04-u0-l1-p1b"
title: "铅球：h 先升后降"
concept: "讲解：二次关系的直观"
prev: "ch04-u0-l1-p1"
next: "ch04-u0-l1-p2"
---

## 讲解

t=0 出手 2 米，t=2 升到 22 米，t=4 回到 2 米：先升后降。

−5t² 是“往下拉”的力，20t 是“往上冲”的力：冲力先赢，后劲不足。

```interaction
{
  "params": {
    "expr": "-5*t^2 + 20*t + 2",
    "label": "t",
    "max": 4,
    "min": 0,
    "step": 0.1,
    "unit": "米"
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
    "latex": "h = -5t^2 + 20t + 2",
    "translation": "t=0 时 h=2（出手高度）；t=2 时 h=22（最高点附近）"
  },
  {
    "id": "f2",
    "latex": "t = 4 \\to h = 2",
    "translation": "t=4 时 h 又回到 2：升到顶后，对称地落下来"
  }
]
```

```data
{
  "hints": [
    "t=0 出手 2 米，t=2 升到 22 米，t=4 回到 2 米：先升后降。",
    "−5t² 是“往下拉”的力，20t 是“往上冲”的力：冲力先赢，后劲不足。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "喷泉的水、投出去的篮球，走的都是这种先升后降的弯路。"
    }
  ]
}
```
