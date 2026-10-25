---
id: "ch11-u2-l3-p1b"
title: "链式法则：先分层"
concept: "讲解：链式法则"
prev: "ch11-u2-l3-p1"
next: "ch11-u2-l3-p1c"
---

## 讲解

链式三步：分层（外/内）；外导×内导；把 u 代回去。

层数=求导次数：三层复合就乘三次，别漏。

```interaction
{
  "params": {
    "source": {
      "initial": 1,
      "label": "x",
      "max": 2,
      "min": -2,
      "step": 0.1
    },
    "views": [
      {
        "expr": "3*x+1",
        "kind": "readout",
        "label": "u=3x+1（内层）"
      },
      {
        "expr": "(3*x+1)^5",
        "kind": "readout",
        "label": "y=u⁵（外层）"
      },
      {
        "expr": "5*(3*x+1)^4*3",
        "kind": "readout",
        "label": "y'=5u⁴·3"
      }
    ]
  },
  "type": "linked-dashboard"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "y = (3x + 1)^5",
    "translation": "分层：外层 u⁵，内层 u=3x+1"
  },
  {
    "id": "f2",
    "latex": "y' = 5(3x + 1)^4 \\cdot 3",
    "translation": "外导 5u⁴，内导 3：相乘"
  }
]
```

```data
{
  "hints": [
    "链式三步：分层（外/内）；外导×内导；把 u 代回去。",
    "层数=求导次数：三层复合就乘三次，别漏。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "y=e^(2x)：外导 e^u，内导 2，y'=2e^(2x)。"
    }
  ]
}
```
