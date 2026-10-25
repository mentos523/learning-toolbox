---
id: "ch01-u1-l1-p3b"
title: "变量到处跑，未知数等人找"
concept: "讲解：未知数 vs 变量"
prev: "ch01-u1-l1-p3"
next: "ch01-u1-l2-p1"
---

## 讲解

同一个字母 x：在等式里等人来找它叫未知数，在变化里到处跑叫变量。

解方程，就是让乱跑的 x 停在唯一正确的位置上。

```interaction
{
  "params": {
    "source": {
      "initial": 0,
      "label": "x",
      "max": 5,
      "min": 0,
      "step": 0.5
    },
    "views": [
      {
        "expr": "2*x + 1",
        "kind": "readout",
        "label": "y"
      },
      {
        "kind": "point",
        "xExpr": "x",
        "yExpr": "2*x + 1"
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
    "latex": "y = 2x + 1",
    "translation": "没有等号定住谁：x 跑、y 跟着跑，两个都是变量"
  },
  {
    "id": "f2",
    "latex": "2x + 1 = 11",
    "translation": "等号把它定在 11 上：此刻 x 是未知数，等着被求出来"
  }
]
```

```data
{
  "hints": [
    "同一个字母 x：在等式里等人来找它叫未知数，在变化里到处跑叫变量。",
    "解方程，就是让乱跑的 x 停在唯一正确的位置上。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "气温 T 随时间 t 变化：t 和 T 都是变量；中午 12 点 T=28℃，那是定值。"
    }
  ]
}
```
