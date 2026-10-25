---
id: "ch00-u1-l1-p1b"
title: "x+5=12：一步步算出 x"
concept: "讲解：解 x+5=12"
prev: "ch00-u1-l1-p1"
next: "ch00-u1-l1-p2"
---

## 讲解

生活里到处是未知数：钱包花掉 5 元还剩 12 元，原来有几元？列式就是 x+5=12。

验算是好习惯：把 7 代回原式，7+5=12 成立，答案就对了。

```interaction
{
  "params": {
    "goal": "把 x 单独留在左边",
    "left": [
      {
        "id": "x",
        "kind": "unknown",
        "label": "x"
      },
      {
        "kind": "weight",
        "value": 5
      }
    ],
    "right": [
      {
        "kind": "weight",
        "value": 12
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
    "max": 14,
    "step": 1,
    "label": "x",
    "expr": "x + 5",
    "target": 12,
    "targetLabel": "x + 5 = 12 的解",
    "caption": "天平上把 x 单独留下——解点在数轴上的位置"
  },
  "engine": {
    "primitive": "EqGraph",
    "version": "2026.10.16.A",
    "params": {
      "kind": "numberline",
      "expr": "x + 5",
      "target": 12
    }
  }
}
```

```formulas
[
  {
    "id": "f1",
    "latex": "x + 5 = 12",
    "translation": "x 加 5 等于 12：第一步，先把问题原样写下来"
  },
  {
    "id": "f2",
    "latex": "x = 12 - 5",
    "translation": "第二步，把 5 请到右边去：过等号要变号，加 5 变成减 5"
  },
  {
    "id": "f3",
    "latex": "x = 7",
    "translation": "第三步，算出来 x 等于 7；代回去验算：7+5=12，对了"
  }
]
```

```data
{
  "hints": [
    "生活里到处是未知数：钱包花掉 5 元还剩 12 元，原来有几元？列式就是 x+5=12。",
    "验算是好习惯：把 7 代回原式，7+5=12 成立，答案就对了。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "变式：y+9=20，y 是几？（两边同减 9，得 y=11）"
    }
  ]
}
```
