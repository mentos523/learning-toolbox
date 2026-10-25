---
id: "ch05x-u2-l1-p2"
title: "先凑系数，再加减"
concept: "加减消元（推导）"
prev: "ch05x-u2-l1-p1"
next: "ch05x-u3-l1-p1"
---

## 讲解

选用口径：有系数为 ±1 选代入，否则加减。

凑系数的目标：让一个未知数的系数变成相反数，相加就消掉了。

含负系数 −2y：符号运算要小心，这是中考常考形态。

```interaction
{
  "type": "sys-steps",
  "params": {
    "steps": [
      {
        "text": "①×2：4x + 6y = 24",
        "expr": "4*x + 6*y",
        "target": 24
      },
      {
        "text": "②×3：9x − 6y = 15（6y 与 −6y 凑成相反数）",
        "expr": "9*x - 6*y",
        "target": 15
      },
      {
        "text": "相加消 y：13x = 39 → x = 3",
        "expr": "13*x",
        "target": 39
      },
      {
        "text": "回代入①：y = 2；代回②检验 9−4=5 ✓",
        "expr": "3*x - 2*y",
        "target": 5
      }
    ],
    "sliders": [
      {
        "id": "x",
        "label": "x",
        "min": -10,
        "max": 10,
        "step": 1,
        "initial": 3
      },
      {
        "id": "y",
        "label": "y",
        "min": -10,
        "max": 10,
        "step": 1,
        "initial": 2
      }
    ],
    "caption": "先乘倍数凑成相反数，再加减消元"
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
    "latex": "2x + 3y = 12",
    "translation": "例①：2x+3y=12"
  },
  {
    "id": "f2",
    "latex": "3x - 2y = 5",
    "translation": "例②：3x−2y=5（解 (3,2)）"
  },
  {
    "id": "f3",
    "latex": "4x + 6y = 24, \\quad 9x - 6y = 15",
    "translation": "①×2 得 4x+6y=24，②×3 得 9x−6y=15——6y 与 −6y 凑成相反数"
  },
  {
    "id": "f4",
    "latex": "13x = 39 \\Rightarrow x = 3, y = 2",
    "translation": "相加消 y 得 13x=39 → x=3，回代得 y=2；检验 9−4=5 ✓"
  }
]
```

```data
{
  "hints": [
    "选用口径：有系数为 ±1 选代入，否则加减。",
    "凑系数的目标：让一个未知数的系数变成相反数，相加就消掉了。",
    "含负系数 −2y：符号运算要小心，这是中考常考形态。"
  ],
  "examples": [
    {
      "text": "行程问题：甲乙两车……（略，用加减法列方程组求解）",
      "figure": "应用"
    },
    {
      "text": "一题两路：本题亦可①×3、②×2 相减消 x——选用口径见小结。",
      "figure": "小结"
    }
  ]
}
```
