---
id: "ch01-u2-l1-p1b"
title: "移项：搬家过等号要变号"
concept: "讲解：移项"
prev: "ch01-u2-l1-p1"
next: "ch01-u2-l1-p2"
---

## 讲解

移项口诀：搬家过等号，+变−、−变+。

习惯动作：含 x 的放一边，纯数字放另一边，再合并同类项。

```interaction
{
  "params": {
    "goal": "把 x 都赶到一边，数字都赶到另一边",
    "left": [
      {
        "id": "x",
        "kind": "unknown",
        "label": "x"
      },
      {
        "kind": "weight",
        "value": 8
      }
    ],
    "right": [
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
        "id": "x3",
        "kind": "unknown",
        "label": "x"
      }
    ],
    "rule": "从一边搬到另一边，+变−、−变+"
  },
  "type": "balance-drag"
}
```

```auxInteraction
{
  "type": "eq-graph",
  "params": {
    "min": 0,
    "max": 8,
    "step": 1,
    "label": "x",
    "expr": "2*x - 8",
    "target": 0,
    "targetLabel": "2x − 8 = 0 的解（x+8=3x 移项得）",
    "caption": "移项：+8 搬到右边变 −8，解 x=4 落在数轴这里"
  },
  "engine": {
    "primitive": "EqGraph",
    "version": "2026.10.16.A",
    "params": {
      "kind": "numberline",
      "expr": "2*x - 8",
      "target": 0
    }
  }
}
```

```formulas
[
  {
    "id": "f1",
    "latex": "x + 8 = 3x",
    "translation": "x 加 8 等于 3x：x 在等号两边都有"
  },
  {
    "id": "f2",
    "latex": "8 = 3x - x",
    "translation": "把左边的 x 请到右边：+x 过等号变成 −x"
  },
  {
    "id": "f3",
    "latex": "x = 4",
    "translation": "8=2x 得 x=4；验算：4+8=12，3×4=12"
  }
]
```

```data
{
  "hints": [
    "移项口诀：搬家过等号，+变−、−变+。",
    "习惯动作：含 x 的放一边，纯数字放另一边，再合并同类项。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "5x−6=3x+4：移项得 5x−3x=4+6，2x=10，x=5。"
    }
  ]
}
```
