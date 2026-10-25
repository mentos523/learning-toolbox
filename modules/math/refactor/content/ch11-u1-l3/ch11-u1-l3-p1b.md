---
id: "ch11-u1-l3-p1b"
title: "切线：导数的几何脸"
concept: "讲解：导数的几何意义"
prev: "ch11-u1-l3-p1"
next: "ch11-u1-l3-p1g"
---

## 讲解

切线方程三步：求切点、求斜率 f'(x₀)、点斜式写方程。

导数>0 切线往上扬，<0 往下俯，=0 水平。

```interaction
{
  "params": {
    "source": {
      "initial": 1,
      "label": "x",
      "max": 3,
      "min": -3,
      "step": 0.1
    },
    "views": [
      {
        "axisLabelX": "x",
        "axisLabelY": "y",
        "kind": "point",
        "xExpr": "x",
        "yExpr": "x^3"
      },
      {
        "expr": "3*x^2",
        "kind": "readout",
        "label": "切线斜率 f'(x)"
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
    "latex": "y = x^3",
    "translation": "y=x³ 在 x=1 处"
  },
  {
    "id": "f2",
    "latex": "y - 1 = 3(x - 1)",
    "translation": "f'(1)=3：切线 y−1=3(x−1)"
  }
]
```

```data
{
  "hints": [
    "切线方程三步：求切点、求斜率 f'(x₀)、点斜式写方程。",
    "导数>0 切线往上扬，<0 往下俯，=0 水平。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "y=√x 在 (4,2)：f'(4)=1/4，切线 y−2=(x−4)/4。"
    }
  ]
}
```
