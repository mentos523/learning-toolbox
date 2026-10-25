---
id: "ch05-u1-l1-p1b"
title: "不等号：开口朝大的一边"
concept: "讲解：不等式的概念"
prev: "ch05-u1-l1-p1"
next: "ch05-u1-l1-p2"
---

## 讲解

不等号开口永远朝大的一边：> 左边大，< 右边大。

含未知数的不等式：解它就是找所有让它成立的 x。

```interaction
{
  "type": "ineq-shade-lab",
  "params": {
    "source": {
      "label": "x",
      "min": 0,
      "max": 10,
      "step": 1
    },
    "mode": "compare",
    "sets": [
      {
        "expr": "x-5",
        "ineq": ">",
        "label": "x>5：开口朝左，左边大"
      },
      {
        "expr": "x-5",
        "ineq": "<",
        "label": "x<5：开口朝右，右边大"
      }
    ],
    "showProbe": true,
    "note": "同一数轴同时呈现 x>5 与 x<5 两个区域：> 左边大，< 右边大"
  },
  "engine": {
    "primitive": "IneqShadeLab",
    "version": "2026.10.16.A",
    "params": {
      "mode": "compare",
      "sets": [
        {
          "expr": "x-5",
          "ineq": ">",
          "label": "x>5：开口朝左，左边大"
        },
        {
          "expr": "x-5",
          "ineq": "<",
          "label": "x<5：开口朝右，右边大"
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
    "latex": "9 > 4",
    "translation": "9 大于 4：开口朝 9，9 是大的一边"
  },
  {
    "id": "f2",
    "latex": "x + 2 < 9",
    "translation": "x 加 2 小于 9：含未知数的不等式"
  },
  {
    "id": "f3",
    "latex": "2x + 1",
    "translation": "没有不等号：只是代数式，不是 不等式"
  }
]
```

```data
{
  "hints": [
    "不等号开口永远朝大的一边：> 左边大，< 右边大。",
    "含未知数的不等式：解它就是找所有让它成立的 x。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "身高 h>170：h 是 171、180……都行——解集是一整段。"
    }
  ]
}
```
