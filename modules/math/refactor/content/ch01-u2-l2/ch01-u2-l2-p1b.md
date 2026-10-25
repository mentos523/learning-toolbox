---
id: "ch01-u2-l2-p1b"
title: "去括号：括号外乘进来"
concept: "讲解：去括号"
prev: "ch01-u2-l2-p1"
next: "ch01-u2-l2-p2"
---

## 讲解

括号外的数是快递员：括号里每一项都要送到，不许漏掉谁。

符号陷阱：−2(x+3)=−2x−6，负号也要乘进去，别只乘数字。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 0,
    "max": 12,
    "step": 0.5,
    "label": "x",
    "expr": "3*(x - 2)",
    "target": 15,
    "targetLabel": "3(x−2) = 15",
    "graph": {
      "kind": "numberline"
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "numberline"
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
    "latex": "3(x - 2) = 15",
    "translation": "3 乘以 x 减 2 的差等于 15"
  },
  {
    "id": "f2",
    "latex": "3x - 6 = 15",
    "translation": "3 乘给括号里每一项：3×x=3x，3×(−2)=−6"
  },
  {
    "id": "f3",
    "latex": "x = 7",
    "translation": "3x=21 得 x=7；验算 3×(7−2)=15"
  }
]
```

```data
{
  "hints": [
    "括号外的数是快递员：括号里每一项都要送到，不许漏掉谁。",
    "符号陷阱：−2(x+3)=−2x−6，负号也要乘进去，别只乘数字。"
  ],
  "examples": [
    {
      "figure": "易错提醒",
      "text": "−(x−5)=2：去括号得 −x+5=2，x=3。负号开头最容易错。"
    }
  ]
}
```
