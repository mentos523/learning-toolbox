---
id: "ch05x-u1-l1-p2"
title: "两个方程，解就定了：方程组的解"
concept: "二元一次方程组"
prev: "ch05x-u1-l1-p1"
next: "ch05x-u1-l2-p1"
---

## 讲解

只满足一个式子不算：解要让两个方程同时成立。

这里的两个方程是各说各话、互相独立的；如果两句话说的是同一件事（重合）或互相打架（平行），解的个数会不一样——到图像那一课见分晓。

例方程组 {x+y=10, 2x−y=8}（解 (6,4)）是本单元的运行例，后面反复用它。

```interaction
{
  "type": "sys-lab",
  "params": {
    "sliders": [
      {
        "id": "x",
        "label": "x",
        "min": -10,
        "max": 10,
        "step": 1,
        "initial": 6
      },
      {
        "id": "y",
        "label": "y",
        "min": -10,
        "max": 10,
        "step": 1,
        "initial": 4
      }
    ],
    "readouts": [
      {
        "expr": "x + y - 10",
        "target": 0,
        "label": "第一式余数",
        "okText": "✓ 第一式成立",
        "noText": "第一式不成立"
      },
      {
        "expr": "2*x - y - 8",
        "target": 0,
        "label": "第二式余数",
        "okText": "✓ 第二式成立",
        "noText": "第二式不成立"
      }
    ],
    "combine": {
      "label": "判是不是解",
      "rule": "双 target=0 同时命中",
      "okText": "✓ 是方程组的解",
      "noText": "还不是解：两个式子要同时成立"
    },
    "note": "命中点 (6,4)：6+4−10=0，2×6−4−8=0"
  },
  "engine": {
    "primitive": "SysLab",
    "version": "2026.10.16.A",
    "params": {
      "sliders": [
        "x",
        "y"
      ],
      "combine": true
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
    "latex": "x + y = 10",
    "translation": "方程组①：x 加 y 等于 10"
  },
  {
    "id": "f2",
    "latex": "2x - y = 8",
    "translation": "方程组②：2x 减 y 等于 8——两个方程联立"
  },
  {
    "id": "f3",
    "latex": "(6, 4)",
    "translation": "解是 (6,4)：6+4=10，2×6−4=8，两个都成立"
  }
]
```

```data
{
  "hints": [
    "只满足一个式子不算：解要让两个方程同时成立。",
    "这里的两个方程是各说各话、互相独立的；如果两句话说的是同一件事（重合）或互相打架（平行），解的个数会不一样——到图像那一课见分晓。",
    "例方程组 {x+y=10, 2x−y=8}（解 (6,4)）是本单元的运行例，后面反复用它。"
  ],
  "examples": [
    {
      "text": "鸡兔同笼原故事：头 10、脚 28。方程组 {x+y=10, 2x+4y=28}，同解 (6,4)。",
      "figure": "对照"
    }
  ]
}
```
