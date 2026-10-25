---
id: "ch11-u3-l2-p1b"
title: "极值：驻点再看换向"
concept: "讲解：极值"
prev: "ch11-u3-l2-p1"
next: "ch11-u3-l3-p1"
---

## 讲解

极值两步：令 f'(x)=0 找驻点；看左右导数变号。

f'=0 只是“候选”：如 y=x³ 在 x=0，f'=0 但不是极值点。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": -1,
    "max": 3,
    "step": 0.25,
    "label": "x",
    "expr": "3*x^2-6*x",
    "target": 0,
    "targetLabel": "找 f'(x)=0 的点",
    "graph": {
      "kind": "zero"
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "zero"
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
    "latex": "f(x) = x^3 - 3x^2",
    "translation": "f'(x)=3x²−6x=3x(x−2)"
  },
  {
    "id": "f2",
    "latex": "x = 0, x = 2",
    "translation": "驻点：x=0 和 x=2"
  },
  {
    "id": "f3",
    "latex": "x = 0 \\text{极大}, x = 2 \\text{极小}",
    "translation": "左+右−是极大（x=0），左−右+是极小（x=2)"
  }
]
```

```data
{
  "hints": [
    "极值两步：令 f'(x)=0 找驻点；看左右导数变号。",
    "f'=0 只是“候选”：如 y=x³ 在 x=0，f'=0 但不是极值点。"
  ],
  "examples": [
    {
      "figure": "易错提醒",
      "text": "y=x³：f'=3x²，x=0 处 f'=0，但左右都递增，无极值。"
    }
  ]
}
```
