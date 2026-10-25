---
id: "ch02-u2-l2-p1g"
title: "完全平方：切成四块看"
concept: "图形：完全平方的面积意义"
prev: "ch02-u2-l2-p1b"
next: "ch02-u3-l1-p1"
---

## 讲解

右图边长 a+b：切成四块——a²、两个 ab、b²。

总说漏 2ab 的同学请数格子：25 格里有 12 格是那两条长方形。

H1 互链：同一张 (a+b)² 图，几何 g05-u1-l2 用它证勾股定理——姊妹篇互相认亲。

```interaction
{
  "params": {
    "labels": [
      "a²",
      "(a+b)²：多了两条 ab 和一个 b²"
    ],
    "left": {
      "kind": "shape-area",
      "params": {
        "initial": 3,
        "label": "a",
        "max": 6,
        "min": 1,
        "showGrid": true,
        "step": 1
      }
    },
    "right": {
      "kind": "shape-area",
      "params": {
        "initial": 5,
        "label": "a+b",
        "max": 8,
        "min": 2,
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
    "latex": "(a + b)^2 = a^2 + 2ab + b^2",
    "translation": "大正方形 = a² + 两条 ab 长方形 + b² 小正方形"
  },
  {
    "id": "f2",
    "latex": "5^2 = 3^2 + 2 \\times 3 \\times 2 + 2^2",
    "translation": "取 a=3、b=2：25=9+12+4，数格子验证"
  }
]
```

```data
{
  "hints": [
    "右图边长 a+b：切成四块——a²、两个 ab、b²。",
    "总说漏 2ab 的同学请数格子：25 格里有 12 格是那两条长方形。",
    "H1 互链：同一张 (a+b)² 图，几何 g05-u1-l2 用它证勾股定理——姊妹篇互相认亲。"
  ],
  "examples": [
    {
      "figure": "口算技巧",
      "text": "102²=(100+2)²=10000+400+4=10404：完全平方口算。"
    }
  ]
}
```
