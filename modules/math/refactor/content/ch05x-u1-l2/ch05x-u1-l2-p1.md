---
id: "ch05x-u1-l2-p1"
title: "代入：把 x 的“化身”送进第二个方程"
concept: "代入消元（直觉）"
prev: "ch05x-u1-l1-p2"
next: "ch05x-u1-l2-p2"
---

## 讲解

代入的本质：用一个方程把 x 表示出来，送进另一个方程消掉 x。

变形前后①式还是同一条直线——等价变形不改变交点。

拖 y 到 4：x=6，读数 2×6−4=8 命中——检验语义：拖看第一式、读数看第二式。

```interaction
{
  "type": "sys-steps",
  "params": {
    "steps": [
      {
        "text": "① x = 10 − y：x 的化身",
        "expr": "x",
        "value": "10 - y"
      },
      {
        "text": "② 2(10−y) − y = 8：化身送进第二个方程",
        "expr": "2*(10-y) - y",
        "target": 8
      },
      {
        "text": "③ 20 − 3y = 8 → y = 4：一元一次方程，会解了",
        "expr": "20 - 3*y",
        "target": 8
      },
      {
        "text": "④ x = 6：回代检验，代回①②都成立",
        "expr": "x + y",
        "target": 10
      }
    ],
    "sliders": [
      {
        "id": "y",
        "label": "y",
        "min": -10,
        "max": 10,
        "step": 1,
        "initial": 4
      }
    ],
    "derived": [
      {
        "id": "x",
        "expr": "10 - y",
        "label": "x = 10 − y"
      }
    ],
    "caption": "拖 y，看 x 的化身如何变化——变形前后①还是同一条直线，交点不变"
  },
  "engine": {
    "primitive": "SysSteps",
    "version": "2026.10.16.A",
    "params": {
      "steps": 4
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
    "latex": "x = 10 - y",
    "translation": "由①得：x 等于 10 减 y——x 的化身"
  },
  {
    "id": "f2",
    "latex": "2(10 - y) - y = 8",
    "translation": "送进②：2 乘 (10 减 y) 减 y 等于 8"
  },
  {
    "id": "f3",
    "latex": "20 - 3y = 8 \\Rightarrow y = 4, x = 6",
    "translation": "解得 y=4，回代得 x=6"
  }
]
```

```data
{
  "hints": [
    "代入的本质：用一个方程把 x 表示出来，送进另一个方程消掉 x。",
    "变形前后①式还是同一条直线——等价变形不改变交点。",
    "拖 y 到 4：x=6，读数 2×6−4=8 命中——检验语义：拖看第一式、读数看第二式。"
  ],
  "examples": [
    {
      "text": "检验清单：代入① ✓、代入② ✓——两个都要验。",
      "figure": "清单"
    }
  ]
}
```
