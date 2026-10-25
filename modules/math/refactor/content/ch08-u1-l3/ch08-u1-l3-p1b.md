---
id: "ch08-u1-l3-p1b"
title: "无理数指数：逼近"
concept: "讲解：无理数指数幂"
prev: "ch08-u1-l3-p1"
next: "ch08-u2-l1-p1"
---

## 讲解

无理数指数用有理数逼近：1.4→1.41→1.414→…，值越算越准。

因为能无限逼近，y=2ˣ 的图像才不断裂——附录 B 回填严格定义。

```interaction
{
  "params": {
    "autoPlay": true,
    "fn": "2^x",
    "speed": 600,
    "step": 0.1,
    "xMax": 2,
    "xMin": 1
  },
  "type": "plot-points"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "2^{1.4}, 2^{1.41}, 2^{1.414}",
    "translation": "√2≈1.4142…：用 1.4、1.41、1.414 一步步逼近"
  },
  {
    "id": "f2",
    "latex": "2^{\\sqrt{2}} \\approx 2.665",
    "translation": "越逼越准：2^√2≈2.665（计算器算的）"
  }
]
```

```data
{
  "hints": [
    "无理数指数用有理数逼近：1.4→1.41→1.414→…，值越算越准。",
    "因为能无限逼近，y=2ˣ 的图像才不断裂——附录 B 回填严格定义。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "3^π：π≈3.14159…，3^3.14≈31.5，越逼越准。"
    }
  ]
}
```
