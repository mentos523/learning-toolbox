---
id: "ch10-u1-l4-p1b"
title: "常见极限：记住三个"
concept: "讲解：常见数列极限"
prev: "ch10-u1-l4-p1"
next: "ch10-u2-l1-p1"
---

## 讲解

三个必记：1/nᵏ→0（k>0），qⁿ→0（|q|<1），qⁿ→∞（q>1）。

|q|=1 是分界：q=1 恒为 1，q=−1 来回跳，都不收敛。

```interaction
{
  "params": {
    "labels": [
      "1/n → 0",
      "(1/2)ⁿ → 0"
    ],
    "left": {
      "kind": "slider-lab",
      "params": {
        "expr": "1/n",
        "label": "n",
        "max": 20,
        "min": 1,
        "step": 1
      }
    },
    "right": {
      "kind": "slider-lab",
      "params": {
        "expr": "(1/2)^n",
        "label": "n",
        "max": 20,
        "min": 1,
        "step": 1
      }
    },
    "sync": [
      "n"
    ]
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
    "latex": "\\lim_{n \\to \\infty} \\frac{1}{n^k} = 0 (k > 0)",
    "translation": "1/nᵏ→0：k>0"
  },
  {
    "id": "f2",
    "latex": "\\lim_{n \\to \\infty} (\\frac{2}{3})^n = 0",
    "translation": "(2/3)ⁿ→0：底数绝对值 <1"
  },
  {
    "id": "f3",
    "latex": "\\lim_{n \\to \\infty} (\\frac{3}{2})^n = \\infty",
    "translation": "(3/2)ⁿ→∞：底数 >1，爆炸"
  }
]
```

```data
{
  "hints": [
    "三个必记：1/nᵏ→0（k>0），qⁿ→0（|q|<1），qⁿ→∞（q>1）。",
    "|q|=1 是分界：q=1 恒为 1，q=−1 来回跳，都不收敛。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "(0.99)¹⁰⁰≈0.366：0.99ⁿ→0，只是慢。"
    }
  ]
}
```
