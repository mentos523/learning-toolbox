---
id: "ch10-u2-l2-p1b"
title: "极限法则：拆开算"
concept: "讲解：极限的运算法则"
prev: "ch10-u2-l2-p1"
next: "ch10-u2-l3-p1"
---

## 讲解

法则=拆开算：和差积商的极限=极限的和差积商。

商法则红线：分母的极限不能是 0。

声明：这四条法则对函数极限同样成立——ch11 求导时拆 lim_{h→0}，依据就是这一页。

```interaction
{
  "params": {
    "labels": [
      "1/n → 0",
      "(2n+1)/n → 2"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "1/n",
        "label": "n",
        "max": 30,
        "min": 1,
        "step": 1
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "(2*n+1)/n",
        "label": "n",
        "max": 30,
        "min": 1,
        "step": 1
      }
    },
    "sync": [
      "n"
    ]
  },
  "type": "side-compare"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "\\lim_{n \\to \\infty} \\frac{2n + 1}{n}",
    "translation": "分子分母同除以 n"
  },
  {
    "id": "f2",
    "latex": "= \\lim_{n \\to \\infty} (2 + \\frac{1}{n}) = 2",
    "translation": "=2+0=2：拆开算"
  }
]
```

```data
{
  "hints": [
    "法则=拆开算：和差积商的极限=极限的和差积商。",
    "商法则红线：分母的极限不能是 0。",
    "声明：这四条法则对函数极限同样成立——ch11 求导时拆 lim_{h→0}，依据就是这一页。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "lim(3n²+1)/(2n²)=3/2：分子分母同除 n²。"
    }
  ]
}
```
