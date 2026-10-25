---
id: "ch09-u1-l2-p2b"
title: "递推：首项加规则"
concept: "讲解：递推公式"
prev: "ch09-u1-l2-p2"
next: "ch09-u2-l1-p1"
---

## 讲解

递推两件套：首项 a₁，递推规则（后项与前项的关系）。

递推算得慢（要一项项推），通项算得快——各有各的用。

```interaction
{
  "params": {
    "expr": "2^n",
    "label": "n",
    "max": 10,
    "min": 1,
    "step": 1,
    "target": 1024,
    "targetLabel": "a₁₀=1024"
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
    "latex": "a_1 = 2, a_n = 2a_{n-1}",
    "translation": "首项 2，每项是前一项的 2 倍"
  },
  {
    "id": "f2",
    "latex": "2, 4, 8, 16, \\cdot\\cdot\\cdot",
    "translation": "一项项推出：2→4→8→16"
  },
  {
    "id": "f3",
    "latex": "a_n = 2^n",
    "translation": "通项：aₙ=2ⁿ——递推和通项说的是一回事"
  }
]
```

```data
{
  "hints": [
    "递推两件套：首项 a₁，递推规则（后项与前项的关系）。",
    "递推算得慢（要一项项推），通项算得快——各有各的用。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "斐波那契：a₁=1,a₂=1,aₙ=aₙ₋₁+aₙ₋₂：1,1,2,3,5,8,…"
    }
  ]
}
```
