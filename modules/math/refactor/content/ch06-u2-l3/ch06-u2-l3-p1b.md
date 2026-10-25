---
id: "ch06-u2-l3-p1b"
title: "增减性：k 说了算"
concept: "讲解：一次函数的增减性"
prev: "ch06-u2-l3-p1"
next: "ch06-u2-l4-p1"
---

## 讲解

k>0 上坡，k<0 下坡；|k| 越大坡越陡。

增减性与 b 无关：b 只管上下，不管坡向。

```interaction
{
  "params": {
    "labels": [
      "上坡：y=x/2",
      "下坡：y=−3x"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "0.5*x",
        "label": "x",
        "max": 6,
        "min": 0,
        "step": 0.5
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "-3*x",
        "label": "x",
        "max": 6,
        "min": 0,
        "step": 0.5
      }
    },
    "sync": [
      "x"
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
    "latex": "y = \\frac{1}{2}x",
    "translation": "k=1/2>0：x 每增 2，y 增 1——上坡"
  },
  {
    "id": "f2",
    "latex": "y = -3x",
    "translation": "k=−3<0：x 每增 1，y 减 3——下坡，又陡又急"
  }
]
```

```data
{
  "hints": [
    "k>0 上坡，k<0 下坡；|k| 越大坡越陡。",
    "增减性与 b 无关：b 只管上下，不管坡向。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "y=−x+100 还是下坡：b=100 再大也救不了 k<0。"
    }
  ]
}
```
