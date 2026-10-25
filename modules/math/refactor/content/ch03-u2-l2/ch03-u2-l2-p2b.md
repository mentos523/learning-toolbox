---
id: "ch03-u2-l2-p2b"
title: "加减：分母不动算分子"
concept: "讲解：同分母分式加减"
prev: "ch03-u2-l2-p2"
next: "ch03-u2-l3-p1"
---

## 讲解

分子是多项式相减时添括号：−(x+1)=−x−1，漏括号是重灾区。

收尾动作：结果能约分必须约到最简。

```interaction
{
  "params": {
    "expr": "(3*x + 1)/x - (x + 1)/x",
    "label": "x",
    "max": 10,
    "min": 1,
    "step": 1
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
    "latex": "\\frac{3x + 1}{x} - \\frac{x + 1}{x}",
    "translation": "同分母：分母 x 不动，分子相减"
  },
  {
    "id": "f2",
    "latex": "\\frac{3x + 1 - (x + 1)}{x}",
    "translation": "分子是多项式相减：(x+1) 整体减，必须添括号"
  },
  {
    "id": "f3",
    "latex": "\\frac{2x}{x} = 2",
    "translation": "=2x/x=2：还能约分，一定要约干净"
  }
]
```

```data
{
  "hints": [
    "分子是多项式相减时添括号：−(x+1)=−x−1，漏括号是重灾区。",
    "收尾动作：结果能约分必须约到最简。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "(2a+1)/a−1/a=2a/a=2：分子 2a+1−1=2a，再约分。"
    }
  ]
}
```
