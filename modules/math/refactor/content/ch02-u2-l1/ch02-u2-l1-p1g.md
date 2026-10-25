---
id: "ch02-u2-l1-p1g"
title: "平方差：大正方形挖一角"
concept: "图形：平方差的面积意义"
prev: "ch02-u2-l1-p1b"
next: "ch02-u2-l2-p1"
---

## 讲解

拖 a、b：大正方形面积 a²，挖掉 b²，剩下的就是平方差。

把剩下一块剪开重拼，变成 (a+b)×(a−b) 的长方形——公式看得见。

```interaction
{
  "params": {
    "labels": [
      "大正方形：面积 a²",
      "挖掉的小正方形：面积 b²"
    ],
    "left": {
      "kind": "shape-area",
      "params": {
        "initial": 5,
        "label": "a",
        "max": 8,
        "min": 1,
        "showGrid": true,
        "step": 1
      }
    },
    "right": {
      "kind": "shape-area",
      "params": {
        "initial": 2,
        "label": "b",
        "max": 5,
        "min": 1,
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
    "latex": "a^2 - b^2",
    "translation": "大正方形挖去小正方形，剩下部分的面积"
  },
  {
    "id": "f2",
    "latex": "(a + b)(a - b) = a^2 - b^2",
    "translation": "剩下的图形剪开重拼，正好是长 (a+b)、宽 (a−b) 的长方形"
  }
]
```

```data
{
  "hints": [
    "拖 a、b：大正方形面积 a²，挖掉 b²，剩下的就是平方差。",
    "把剩下一块剪开重拼，变成 (a+b)×(a−b) 的长方形——公式看得见。"
  ],
  "examples": [
    {
      "figure": "数形结合",
      "text": "边长 10 的正方形挖掉边长 4 的：100−16=84=(10+4)(10−4)。"
    }
  ]
}
```
