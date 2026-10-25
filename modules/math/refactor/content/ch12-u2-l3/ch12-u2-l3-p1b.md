---
id: "ch12-u2-l3-p1b"
title: "牛顿-莱布尼茨：两步算面积"
concept: "讲解：牛顿-莱布尼茨公式"
prev: "ch12-u2-l3-p1"
next: "ch12-u2-l3-p2"
---

## 讲解

两步：找原函数 F；算 F(b)−F(a)。

条件：f 在 [a,b] 上连续——初等函数在它有定义的区间上默认满足。

```interaction
{
  "params": {
    "expr": "b^2/2",
    "label": "b",
    "max": 4,
    "min": 0,
    "step": 0.25,
    "target": 8,
    "targetLabel": "找：b=4 时面积=8"
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
    "latex": "\\int_{1}^{2} x^2 dx",
    "translation": "第一步：找原函数 x³/3"
  },
  {
    "id": "f2",
    "latex": "= \\frac{8}{3} - \\frac{1}{3} = \\frac{7}{3}",
    "translation": "第二步：F(2)−F(1)=7/3"
  }
]
```

```data
{
  "hints": [
    "两步：找原函数 F；算 F(b)−F(a)。",
    "条件：f 在 [a,b] 上连续——初等函数在它有定义的区间上默认满足。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "∫₀^π sinxdx=[−cosx]₀^π=1+1=2。"
    }
  ]
}
```
