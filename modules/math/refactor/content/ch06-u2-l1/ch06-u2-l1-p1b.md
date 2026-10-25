---
id: "ch06-u2-l1-p1b"
title: "正比例：比值恒定"
concept: "讲解：正比例函数"
prev: "ch06-u2-l1-p1"
next: "ch06-u2-l2-p1"
---

## 讲解

正比例=y/x 是定值：x 扩大几倍，y 也扩大几倍。

图像必过原点：x=0 时 y=0，这是正比例最醒目的胎记。

```interaction
{
  "params": {
    "source": {
      "initial": 2,
      "label": "x",
      "max": 5,
      "min": 0,
      "step": 0.5
    },
    "views": [
      {
        "expr": "3*x",
        "kind": "readout",
        "label": "y"
      },
      {
        "kind": "point",
        "xExpr": "x",
        "yExpr": "3*x"
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
    "latex": "y = 3x",
    "translation": "k=3：x 翻倍，y 也翻倍"
  },
  {
    "id": "f2",
    "latex": "\\frac{y}{x} = 3",
    "translation": "比值恒为 3：这就是“正比例”"
  }
]
```

```data
{
  "hints": [
    "正比例=y/x 是定值：x 扩大几倍，y 也扩大几倍。",
    "图像必过原点：x=0 时 y=0，这是正比例最醒目的胎记。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "买苹果 5 元一斤：y=5x；x 斤 y 元。"
    }
  ]
}
```
