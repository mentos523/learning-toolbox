---
id: "ch05-u1-l1-p2b"
title: "性质一：加减方向不变"
concept: "讲解：不等式的性质一"
prev: "ch05-u1-l1-p2"
next: "ch05-u1-l1-p3"
---

## 讲解

性质一：两边加减同一个数，不等号方向不变——小的还是小的。

移项照样用：+4 过不等号变 −4，方向不用动。

```interaction
{
  "type": "ineq-shade-lab",
  "params": {
    "source": {
      "label": "a",
      "min": -5,
      "max": 5,
      "step": 1
    },
    "mode": "compare",
    "sets": [
      {
        "expr": "3-7",
        "ineq": "<",
        "label": "变形前：3<7"
      },
      {
        "expr": "(3-5)-(7-5)",
        "ineq": "<",
        "label": "变形后：3−5<7−5"
      }
    ],
    "showProbe": true,
    "note": "方向不变 ✅：性质一，两边加减同一个数",
    "compareLabels": [
      "左边：3+a",
      "右边：7+a"
    ]
  },
  "engine": {
    "primitive": "IneqShadeLab",
    "version": "2026.10.16.A",
    "params": {
      "mode": "compare",
      "sets": [
        {
          "expr": "3-7",
          "ineq": "<",
          "label": "变形前：3<7"
        },
        {
          "expr": "(3-5)-(7-5)",
          "ineq": "<",
          "label": "变形后：3−5<7−5"
        }
      ]
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
    "latex": "3 < 7",
    "translation": "3 小于 7：起点"
  },
  {
    "id": "f2",
    "latex": "3 - 5 < 7 - 5",
    "translation": "两边同减 5：−2<2，方向不变"
  },
  {
    "id": "f3",
    "latex": "x + 4 > 9 \\to x > 5",
    "translation": "活用：x+4>9 两边同减 4 得 x>5"
  }
]
```

```data
{
  "hints": [
    "性质一：两边加减同一个数，不等号方向不变——小的还是小的。",
    "移项照样用：+4 过不等号变 −4，方向不用动。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x−3<5：两边同加 3 得 x<8（性质一，方向不变）。"
    }
  ]
}
```
