---
id: "ch00-u1-l1-p2b"
title: "天平解方程：两边同减 3"
concept: "讲解：等式性质解方程"
prev: "ch00-u1-l1-p2"
next: "ch00-ux-l1-p1"
---

## 讲解

记住一句话：方程两边做相同的事，等式不变——这是解方程唯一的规矩。

易错：只给一边减 3 天平就歪了，两边必须同步动手。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 0,
    "max": 10,
    "step": 1,
    "label": "x",
    "expr": "x + 3",
    "target": 8,
    "targetLabel": "等于 8",
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
    "latex": "x + 3 = 8",
    "translation": "x 加 3 等于 8：天平两边一样重"
  },
  {
    "id": "f2",
    "latex": "x + 3 - 3 = 8 - 3",
    "translation": "两边同时拿走 3 个砝码，天平依然平衡"
  },
  {
    "id": "f3",
    "latex": "x = 5",
    "translation": "左边只剩 x 盒子，右边剩 5：x 等于 5"
  }
]
```

```data
{
  "hints": [
    "记住一句话：方程两边做相同的事，等式不变——这是解方程唯一的规矩。",
    "易错：只给一边减 3 天平就歪了，两边必须同步动手。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "变式：x+6=13，两边同减 6 得 x=7；再想想 x−4=9 怎么办？"
    }
  ]
}
```
