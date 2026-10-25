---
id: "ch10-ub-l1-p1b"
title: "回填：有理数逼近无理数"
concept: "讲解：实数指数幂的严格定义"
prev: "ch10-ub-l1-p1"
next: "ch10-ux-l1-p1"
---

## 讲解

8.1.3 留的尾巴：当时只说“直观上有值”，现在用极限严格定义。

换条路也一样：任何有理数列 rₙ→√2，2^{rₙ} 都挤向同一个极限——定义与选哪条路无关。

⚠️ 别搞混：这里没用“2ˣ 的连续性”担保——连续性要等实数指数定义完才能谈，用它担保是循环论证。

记住一句话：定义即构造——极限这个动作，就是 2^√2 的定义。

```interaction
{
  "params": {
    "source": {
      "initial": 1.4,
      "label": "x",
      "max": 1.42,
      "min": 1.4,
      "step": 0.001
    },
    "views": [
      {
        "expr": "2^x",
        "kind": "readout",
        "label": "2^x"
      },
      {
        "axisLabelX": "x",
        "axisLabelY": "y",
        "kind": "point",
        "xExpr": "x",
        "yExpr": "2^x"
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
    "latex": "r_n = 1.4, 1.41, 1.414, \\cdot\\cdot\\cdot",
    "translation": "rₙ→√2：有理数列逼近 √2"
  },
  {
    "id": "f2",
    "latex": "2^{r_n} \\to 2^{\\sqrt{2}}",
    "translation": "定义即构造：把 2^√2 定义为这个极限"
  }
]
```

```data
{
  "hints": [
    "8.1.3 留的尾巴：当时只说“直观上有值”，现在用极限严格定义。",
    "换条路也一样：任何有理数列 rₙ→√2，2^{rₙ} 都挤向同一个极限——定义与选哪条路无关。",
    "⚠️ 别搞混：这里没用“2ˣ 的连续性”担保——连续性要等实数指数定义完才能谈，用它担保是循环论证。",
    "记住一句话：定义即构造——极限这个动作，就是 2^√2 的定义。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "3^π=lim 3^{rₙ}（rₙ→π）：同样的还债方式。"
    }
  ]
}
```
