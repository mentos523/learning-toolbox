---
id: "ch02-u3-l4-p1b"
title: "十字相乘：拆常数凑系数"
concept: "讲解：十字相乘法"
prev: "ch02-u3-l4-p1"
next: "ch02-u3-l5-p1"
---

## 讲解

十字相乘两步：拆常数项（乘积=c），凑一次项（和=b）。

符号口诀：c 为正，两因数同号（与 b 同）；c 为负，两因数异号。

```interaction
{
  "params": {
    "expr": "x^2 + 8*x + 15",
    "label": "x",
    "max": 10,
    "min": 0,
    "step": 0.5
  },
  "type": "slider-lab"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "x^2 + 8x + 15",
    "translation": "首项 x²，常数 15，一次项系数 8"
  },
  {
    "id": "f2",
    "latex": "15 = 3 \\times 5",
    "translation": "拆常数项：15=3×5；凑一次项：3+5=8，对上了"
  },
  {
    "id": "f3",
    "latex": "(x + 3)(x + 5)",
    "translation": "写成积；展开检验：x²+8x+15，还原成功"
  }
]
```

```data
{
  "hints": [
    "十字相乘两步：拆常数项（乘积=c），凑一次项（和=b）。",
    "符号口诀：c 为正，两因数同号（与 b 同）；c 为负，两因数异号。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "x²−x−6=(x−3)(x+2)：−6=(−3)×2，−3+2=−1，对上一次项。"
    }
  ]
}
```
