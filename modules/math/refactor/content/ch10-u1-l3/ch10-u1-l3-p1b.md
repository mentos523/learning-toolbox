---
id: "ch10-u1-l3-p1b"
title: "严格定义：∀ε∃N"
concept: "讲解：ε-N 严格定义"
prev: "ch10-u1-l3-p1"
next: "ch10-u1-l4-p1"
---

## 讲解

严格版=把“带子套点”写成数学：∀ε>0，∃N，n>N 时 |aₙ−A|<ε。

做题套路：从 |aₙ−A|<ε 反解出 n>…，那个“…”就是 N。

```interaction
{
  "params": {
    "expr": "1/n^2",
    "label": "n",
    "max": 100,
    "min": 1,
    "step": 1,
    "target": 0.01,
    "targetLabel": "ε=0.01：N=10"
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
    "latex": "\\lim_{n \\to \\infty} \\frac{1}{n^2} = 0",
    "translation": "例：1/n²→0"
  },
  {
    "id": "f2",
    "latex": "\\frac{1}{n^2} < \\epsilon \\to n > \\frac{1}{\\sqrt{\\epsilon}}",
    "translation": "解出 N：n>1/√ε 时成立"
  }
]
```

```data
{
  "hints": [
    "严格版=把“带子套点”写成数学：∀ε>0，∃N，n>N 时 |aₙ−A|<ε。",
    "做题套路：从 |aₙ−A|<ε 反解出 n>…，那个“…”就是 N。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "证 1/(2n)→0：1/(2n)<ε 得 n>1/(2ε)，取 N 为大于 1/(2ε) 的整数。"
    }
  ]
}
```
