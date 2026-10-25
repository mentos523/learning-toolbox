---
id: "ch01-ux-l1-p1"
title: "第一章习题：一元一次方程"
concept: "本章习题"
prev: "ch01-u2-l5-p1"
next: null
---

## 讲解

1．是方程的是（ ）A．2x+1 B．3+4=7 C．x−5=9

2．x+9=17，x=____。

3．4x=28，x=____。

4．解方程：5x−3=2x+9。

5．解方程：2(x−4)=10。

6．一个数的一半比它本身小 3，这个数是几？

```interaction
{
  "params": {
    "goal": "检验第 2 题：把 x 单独留在左边",
    "left": [
      {
        "id": "x",
        "kind": "unknown",
        "label": "x"
      },
      {
        "kind": "weight",
        "value": 9
      }
    ],
    "right": [
      {
        "kind": "weight",
        "value": 17
      }
    ],
    "rule": "两边同时拿走同样多，天平依然平衡"
  },
  "type": "balance-drag"
}
```

```auxInteraction
{
  "type": "eq-graph",
  "params": {
    "min": 0,
    "max": 8,
    "step": 1,
    "label": "x",
    "expr": "3*x - 12",
    "target": 0,
    "targetLabel": "3x − 12 = 0 的解（5x−3=2x+9 移项得）",
    "caption": "第 4 题 5x−3=2x+9：移项得 3x=12，解 x=4"
  },
  "engine": {
    "primitive": "EqGraph",
    "version": "2026.10.16.A",
    "params": {
      "kind": "numberline",
      "expr": "3*x - 12",
      "target": 0
    }
  }
}
```

```formulas
[
  {
    "id": "f1",
    "latex": "5x - 3 = 2x + 9",
    "translation": "第 4 题：先把含 x 的项聚到左边，数字聚到右边"
  }
]
```

```data
{
  "hints": [
    "1．是方程的是（ ）A．2x+1 B．3+4=7 C．x−5=9",
    "2．x+9=17，x=____。",
    "3．4x=28，x=____。",
    "4．解方程：5x−3=2x+9。",
    "5．解方程：2(x−4)=10。",
    "6．一个数的一半比它本身小 3，这个数是几？"
  ],
  "examples": [
    {
      "figure": "核对答案",
      "text": "答案：1．C；2．8；3．7；4．x=4；5．x=9；6．6（设 x：x/2=x−3）"
    },
    {
      "figure": "错因解析",
      "text": "1．方程=含未知数的等式：A 不是等式，B 不含未知数，只有 C。2．两边减 9：x=17−9=8。3．两边除以 4：x=28÷4=7。4．移项：5x−2x=9+3，3x=12，x=4——移项要变号。5．先去括号：2x−8=10，2x=18，x=9——括号前乘 2，每一项都要乘。6．设 x：x/2=x−3，两边×2 得 x=2x−6，x=6——“小 3”即 x−3=x/2。"
    }
  ]
}
```
