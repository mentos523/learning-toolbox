---
id: "ch05-u1-l1-p3b"
title: "乘负数：不等号要翻面"
concept: "讲解：不等式的性质二、三"
prev: "ch05-u1-l1-p3"
next: "ch05-u1-l2-p1"
---

## 讲解

只有乘除负数才反向：加减、乘除正数，方向都不变。

−2x>6 得 x<−3：系数是负数，除过去必须翻面——第一易错点。

```interaction
{
  "type": "ineq-shade-lab",
  "params": {
    "source": {
      "label": "k",
      "min": -2,
      "max": 2,
      "step": 1
    },
    "mode": "compare",
    "sets": [
      {
        "expr": "2-5",
        "ineq": "<",
        "label": "变形前：2<5"
      },
      {
        "expr": "2*k-5*k",
        "ineq": ">",
        "label": "变形后：2k>5k（k<0）"
      }
    ],
    "showProbe": true,
    "note": "方向反转 ⚠️：两边同乘 −3，−6>−15",
    "compareLabels": [
      "左边：2k",
      "右边：5k"
    ]
  },
  "engine": {
    "primitive": "IneqShadeLab",
    "version": "2026.10.16.A",
    "params": {
      "mode": "compare",
      "sets": [
        {
          "expr": "2-5",
          "ineq": "<",
          "label": "变形前：2<5"
        },
        {
          "expr": "2*k-5*k",
          "ineq": ">",
          "label": "变形后：2k>5k（k<0）"
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
    "latex": "2 < 5",
    "translation": "2 小于 5：起点"
  },
  {
    "id": "f2",
    "latex": "2 \\times (-3) > 5 \\times (-3)",
    "translation": "两边同乘 −3：−6>−15，方向翻了"
  },
  {
    "id": "f3",
    "latex": "-2x > 6 \\to x < -3",
    "translation": "活用：两边同除以 −2，不等号反向得 x<−3"
  }
]
```

```data
{
  "hints": [
    "只有乘除负数才反向：加减、乘除正数，方向都不变。",
    "−2x>6 得 x<−3：系数是负数，除过去必须翻面——第一易错点。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x/(−2)>3：两边同乘 −2 得 x<−6（反向！）。"
    }
  ]
}
```
