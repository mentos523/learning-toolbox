---
id: "ch01-u1-l2-p1b"
title: "性质 1：两边加减同一数"
concept: "讲解：等式的性质 1"
prev: "ch01-u1-l2-p1"
next: "ch01-u1-l2-p2"
---

## 讲解

性质 1 专治“+几/−几”：等式两边加减同一个数，等式不变。

移项就是性质 1 的快捷写法：+7 过等号变成 −7。

```interaction
{
  "params": {
    "goal": "两边同时拿走 7 个砝码，看天平还平不平",
    "left": [
      {
        "id": "x",
        "kind": "unknown",
        "label": "x"
      },
      {
        "kind": "weight",
        "value": 7
      }
    ],
    "right": [
      {
        "kind": "weight",
        "value": 15
      }
    ],
    "rule": "等式两边加减同一个数，等式依然成立"
  },
  "type": "balance-drag"
}
```

```auxInteraction
{
  "type": "eq-graph",
  "params": {
    "min": 0,
    "max": 16,
    "step": 1,
    "label": "x",
    "expr": "x + 7",
    "target": 15,
    "targetLabel": "x + 7 = 15 的解",
    "caption": "性质 1：两边加减同一数，解点在数轴上的位置不变"
  },
  "engine": {
    "primitive": "EqGraph",
    "version": "2026.10.16.A",
    "params": {
      "kind": "numberline",
      "expr": "x + 7",
      "target": 15
    }
  }
}
```

```formulas
[
  {
    "id": "f1",
    "latex": "x + 7 = 15",
    "translation": "x 加 7 等于 15：想消掉 +7"
  },
  {
    "id": "f2",
    "latex": "x + 7 - 7 = 15 - 7",
    "translation": "两边同时减 7（性质 1）：+7−7 抵消"
  },
  {
    "id": "f3",
    "latex": "x = 8",
    "translation": "x 等于 8；验算 8+7=15，成立"
  }
]
```

```data
{
  "hints": [
    "性质 1 专治“+几/−几”：等式两边加减同一个数，等式不变。",
    "移项就是性质 1 的快捷写法：+7 过等号变成 −7。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x−6=4：两边同加 6 得 x=10。加减看符号，缺什么补什么。"
    }
  ]
}
```
