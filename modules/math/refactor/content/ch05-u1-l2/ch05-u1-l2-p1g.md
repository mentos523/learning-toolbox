---
id: "ch05-u1-l2-p1g"
title: "解集在数轴上长什么样"
concept: "图形：解集的数轴表示"
prev: "ch05-u1-l2-p1b"
next: "ch05-u1-l3-p1"
---

## 讲解

拖 x：读数>0 时点落在射线上——解集就是这条射线上的所有点。

>、< 空心圈（不含端点）；≥、≤ 实心点（含端点）。

```interaction
{
  "params": {
    "source": {
      "initial": 4,
      "label": "x",
      "max": 10,
      "min": 0,
      "step": 0.5
    },
    "views": [
      {
        "expr": "2*x + 1 - 7",
        "kind": "readout",
        "label": "2x+1−7"
      },
      {
        "kind": "point",
        "xExpr": "x",
        "yExpr": "0"
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
    "latex": "x > 3",
    "translation": "解集：所有大于 3 的 x"
  },
  {
    "id": "f2",
    "latex": "(3, +\\infty)",
    "translation": "数轴：3 处空心圆圈（3 不在内），向右画射线"
  }
]
```

```data
{
  "hints": [
    "拖 x：读数>0 时点落在射线上——解集就是这条射线上的所有点。",
    ">、< 空心圈（不含端点）；≥、≤ 实心点（含端点）。"
  ],
  "examples": [
    {
      "figure": "数形结合",
      "text": "x≥2：2 处实心点，向右射线；x<1：1 处空心圈，向左射线。"
    }
  ]
}
```
