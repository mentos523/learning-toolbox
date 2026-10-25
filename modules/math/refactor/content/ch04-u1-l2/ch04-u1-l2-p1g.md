---
id: "ch04-u1-l2-p1g"
title: "配方：(x+3)² 比 x² 大多少"
concept: "图形：配方前后面积对比"
prev: "ch04-u1-l2-p1b"
next: "ch04-u1-l2-p2"
---

## 讲解

左图 x²，右图 (x+3)²：多的两条长条就是 6x，角上那块是 9。

配方=把 6x 折成两条 3x 贴在 x² 两边，再补上 3×3 的角。

```interaction
{
  "params": {
    "labels": [
      "x²",
      "(x+3)²：多了两条 3x 和一个 9"
    ],
    "left": {
      "kind": "shape-area",
      "params": {
        "initial": 4,
        "label": "x",
        "max": 8,
        "min": 1,
        "showGrid": true,
        "step": 1
      }
    },
    "right": {
      "kind": "shape-area",
      "params": {
        "initial": 7,
        "label": "x+3",
        "max": 10,
        "min": 4,
        "showGrid": true,
        "step": 1
      }
    }
  },
  "type": "side-compare"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "(x + 3)^2 = x^2 + 6x + 9",
    "translation": "大正方形 = x² + 两条 3x 长条 + 角上 9"
  },
  {
    "id": "f2",
    "latex": "x^2 + 6x = (x + 3)^2 - 9",
    "translation": "反过来：x²+6x 就是大正方形挖掉角上的 9"
  }
]
```

```data
{
  "hints": [
    "左图 x²，右图 (x+3)²：多的两条长条就是 6x，角上那块是 9。",
    "配方=把 6x 折成两条 3x 贴在 x² 两边，再补上 3×3 的角。"
  ],
  "examples": [
    {
      "figure": "数形结合",
      "text": "x²+10x：折成两条 5x，补 25，得 (x+5)²−25。"
    }
  ]
}
```
