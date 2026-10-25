---
id: "ch03-u2-l2-p1b"
title: "通分：化成相同分母"
concept: "讲解：通分"
prev: "ch03-u2-l2-p1"
next: "ch03-u2-l2-p2"
---

## 讲解

通分=找最简公分母：系数取最小公倍数，字母取最高次幂。

通分不改变值：分子乘几，分母必须乘几。

```interaction
{
  "params": {
    "expr": "2/x + 3/(2*x)",
    "label": "x",
    "max": 10,
    "min": 1,
    "step": 1
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
    "latex": "\\frac{2}{x} + \\frac{3}{2x}",
    "translation": "分母 x 和 2x：最简公分母是 2x"
  },
  {
    "id": "f2",
    "latex": "\\frac{4}{2x} + \\frac{3}{2x}",
    "translation": "2/x 分子分母同乘 2：变成 4/(2x)"
  },
  {
    "id": "f3",
    "latex": "\\frac{7}{2x}",
    "translation": "同分母了：分子 4+3=7，分母不动"
  }
]
```

```data
{
  "hints": [
    "通分=找最简公分母：系数取最小公倍数，字母取最高次幂。",
    "通分不改变值：分子乘几，分母必须乘几。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "1/a+1/b：最简公分母 ab，通分成 b/ab+a/ab=(a+b)/ab。"
    }
  ]
}
```
