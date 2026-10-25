---
id: "ch04-u1-l4-p1b"
title: "因式分解法：先化一边为零"
concept: "讲解：因式分解法"
prev: "ch04-u1-l4-p1"
next: "ch04-u2-l1-p1"
---

## 讲解

因式分解法两步：化成一边为 0；另一边分解成乘积。

x²=3x 不能两边除以 x——x 可能是 0；移项分解才对。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": -1,
    "max": 4,
    "step": 1,
    "label": "x",
    "expr": "x*(x - 3)",
    "target": 0,
    "targetLabel": "乘积为 0",
    "graph": {
      "kind": "parabola",
      "a": 1,
      "b": -3,
      "c": 0
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "parabola",
      "a": 1,
      "b": -3,
      "c": 0
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
    "latex": "x^2 - 3x = 0",
    "translation": "右边已经是 0：左边提公因式"
  },
  {
    "id": "f2",
    "latex": "x(x - 3) = 0",
    "translation": "x(x−3)=0：乘积为零"
  },
  {
    "id": "f3",
    "latex": "x = 0, x = 3",
    "translation": "x=0 或 x−3=0：得 x=0 或 x=3"
  }
]
```

```data
{
  "hints": [
    "因式分解法两步：化成一边为 0；另一边分解成乘积。",
    "x²=3x 不能两边除以 x——x 可能是 0；移项分解才对。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x²−9=0：(x+3)(x−3)=0，x=3 或 x=−3。"
    }
  ]
}
```
