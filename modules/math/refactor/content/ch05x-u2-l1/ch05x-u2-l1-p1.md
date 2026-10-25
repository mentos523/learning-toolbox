---
id: "ch05x-u2-l1-p1"
title: "加减：让一个未知数直接消失"
concept: "加减消元（直觉）"
prev: "ch05x-u1-l2-p2"
next: "ch05x-u2-l1-p2"
---

## 讲解

①+②：(x+y)+(x−y)=2x，10+2=12——y 直接消失。

{①, ①+②} 与 {①, ②} 同解：②=(①+②)−①，能互相推出。

两侧 x 滑块范围统一 −10~10（须覆盖解的横坐标 x=6）。

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
      }
    ],
    "panels": [
      {
        "label": "左：① x + y = 10",
        "derived": [
          {
            "id": "y1",
            "expr": "10 - x",
            "label": "y = 10 − x"
          }
        ],
        "readouts": [
          {
            "expr": "x + (10 - x) - 10",
            "target": 0,
            "label": "①余数"
          }
        ]
      },
      {
        "label": "右：①+② → 2x = 12",
        "derived": [
          {
            "id": "y2",
            "expr": "x - 2",
            "label": "由②：y = x − 2"
          }
        ],
        "readouts": [
          {
            "expr": "2*x - 12",
            "target": 0,
            "label": "新方程余数",
            "okText": "✓ x=6",
            "noText": ""
          }
        ]
      }
    ],
    "note": "左栏 y 显示 10−x，右栏 y 显示 x−2；新方程 2x=12 的直线过原交点 (6,4)"
  },
  "engine": {
    "primitive": "SysLab",
    "version": "2026.10.16.A",
    "params": {
      "panels": 2
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
    "translation": "例①：x+y=10"
  },
  {
    "id": "f2",
    "latex": "x - y = 2",
    "translation": "例②：x−y=2"
  },
  {
    "id": "f3",
    "latex": "(x+y) + (x-y) = 2x = 12",
    "translation": "①+②：y 消失了——2x=12"
  },
  {
    "id": "f4",
    "latex": "x = 6, y = 4",
    "translation": "解得 x=6，回代得 y=4"
  }
]
```

```data
{
  "hints": [
    "①+②：(x+y)+(x−y)=2x，10+2=12——y 直接消失。",
    "{①, ①+②} 与 {①, ②} 同解：②=(①+②)−①，能互相推出。",
    "两侧 x 滑块范围统一 −10~10（须覆盖解的横坐标 x=6）。"
  ],
  "examples": [
    {
      "text": "几何锚点：新方程 2x=12 是过 (6,4) 的竖直线——过交点画新线。",
      "figure": "几何"
    }
  ]
}
```
