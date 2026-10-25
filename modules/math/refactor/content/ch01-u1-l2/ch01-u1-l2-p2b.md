---
id: "ch01-u1-l2-p2b"
title: "性质 2：两边乘除同一数"
concept: "讲解：等式的性质 2"
prev: "ch01-u1-l2-p2"
next: "ch01-u2-l1-p1"
---

## 讲解

性质 2 专治“×几/÷几”：两边乘除同一个不为 0 的数，等式不变。

红线：除数不能是 0。0 不能做除数，这是全书通用的铁律。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 0,
    "max": 24,
    "step": 1,
    "label": "x",
    "expr": "x/3",
    "target": 4,
    "targetLabel": "x÷3 = 4",
    "graph": {
      "kind": "numberline"
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "numberline"
    }
  }
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "\\frac{x}{3} = 4",
    "translation": "x 除以 3 等于 4：想消掉 ÷3"
  },
  {
    "id": "f2",
    "latex": "\\frac{x}{3} \\times 3 = 4 \\times 3",
    "translation": "两边同时乘 3（性质 2）：÷3×3 抵消"
  },
  {
    "id": "f3",
    "latex": "x = 12",
    "translation": "x 等于 12；验算 12÷3=4，成立"
  }
]
```

```data
{
  "hints": [
    "性质 2 专治“×几/÷几”：两边乘除同一个不为 0 的数，等式不变。",
    "红线：除数不能是 0。0 不能做除数，这是全书通用的铁律。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "5x=20：两边同除以 5 得 x=4。乘除看系数，系数是几就除以几。"
    }
  ]
}
```
