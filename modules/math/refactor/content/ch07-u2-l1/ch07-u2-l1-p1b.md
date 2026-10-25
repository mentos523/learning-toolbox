---
id: "ch07-u2-l1-p1b"
title: "反比例：xy=k 恒定"
concept: "讲解：反比例函数的定义"
prev: "ch07-u2-l1-p1"
next: "ch07-u2-l1-p2"
---

## 讲解

反比例=乘积定值：xy=k，x 扩大几倍，y 就缩小几倍。

k≠0 且 x≠0：k=0 退化成 y=0，x=0 分母无意义。

```interaction
{
  "params": {
    "source": {
      "initial": 3,
      "label": "x",
      "max": 12,
      "min": 1,
      "step": 1
    },
    "views": [
      {
        "expr": "12/x",
        "kind": "readout",
        "label": "y"
      },
      {
        "kind": "point",
        "xExpr": "x",
        "yExpr": "12/x"
      }
    ]
  },
  "type": "linked-dashboard"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "y = \\frac{12}{x}",
    "translation": "xy=12：x 与 y 的乘积恒为 12"
  },
  {
    "id": "f2",
    "latex": "(2, 6), (3, 4), (4, 3)",
    "translation": "三组对应值：乘积都是 12"
  }
]
```

```data
{
  "hints": [
    "反比例=乘积定值：xy=k，x 扩大几倍，y 就缩小几倍。",
    "k≠0 且 x≠0：k=0 退化成 y=0，x=0 分母无意义。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "120 千米路程：速度 v 与时间 t 反比，vt=120。"
    }
  ]
}
```
