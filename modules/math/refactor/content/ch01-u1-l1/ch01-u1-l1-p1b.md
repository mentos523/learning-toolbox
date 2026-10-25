---
id: "ch01-u1-l1-p1b"
title: "2x+1=11：先减 1 再除以 2"
concept: "讲解：解 2x+1=11"
prev: "ch01-u1-l1-p1"
next: "ch01-u1-l1-p2"
---

## 讲解

解这类方程两步走：先移常数项（+1 过等号变 −1），再把 x 的系数化为 1。

顺序别反：先除以 2 的话 1÷2 会添麻烦。做完一定验算。

```interaction
{
  "params": {
    "goal": "先消掉常数 1，再把两个 x 盒并成一个",
    "left": [
      {
        "id": "x1",
        "kind": "unknown",
        "label": "x"
      },
      {
        "id": "x2",
        "kind": "unknown",
        "label": "x"
      },
      {
        "kind": "weight",
        "value": 1
      }
    ],
    "right": [
      {
        "kind": "weight",
        "value": 11
      }
    ],
    "rule": "两边同时拿走同样多，天平依然平衡"
  },
  "type": "balance-drag"
}
```

```auxInteraction
{
  "type": "eq-graph",
  "params": {
    "min": 0,
    "max": 12,
    "step": 1,
    "label": "x",
    "expr": "2*x + 1",
    "target": 11,
    "targetLabel": "2x + 1 = 11 的解",
    "caption": "天平上 2x+1=11 的解 x=5，在数轴上就是这个点"
  },
  "engine": {
    "primitive": "EqGraph",
    "version": "2026.10.16.A",
    "params": {
      "kind": "numberline",
      "expr": "2*x + 1",
      "target": 11
    }
  }
}
```

```formulas
[
  {
    "id": "f1",
    "latex": "2x + 1 = 11",
    "translation": "第一步：两边同时减 1，消掉常数项（等式性质 1）"
  },
  {
    "id": "f2",
    "latex": "2x = 10",
    "translation": "得到 2x=10；x 前面还挡着个 2"
  },
  {
    "id": "f3",
    "latex": "x = 5",
    "translation": "第二步：两边同时除以 2（等式性质 2），x=5；验算 2×5+1=11"
  }
]
```

```data
{
  "hints": [
    "解这类方程两步走：先移常数项（+1 过等号变 −1），再把 x 的系数化为 1。",
    "顺序别反：先除以 2 的话 1÷2 会添麻烦。做完一定验算。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "变式：3x+2=14。先减 2 得 3x=12，再除以 3 得 x=4。"
    }
  ]
}
```
