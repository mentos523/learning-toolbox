---
id: "ch01-u2-l4-p1b"
title: "追及问题：快的追慢的"
concept: "讲解：追及问题"
prev: "ch01-u2-l4-p1"
next: "ch01-u2-l4-p2"
---

## 讲解

追及等量关系：快车路程 = 慢车路程 + 先走的。

相遇是“和”=全程，追及是“差”=先走的——一字之差，关系完全不同。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 0,
    "max": 3,
    "step": 0.25,
    "label": "x",
    "expr": "60*x - 40*x",
    "target": 30,
    "targetLabel": "甲比乙多走 30 千米",
    "unit": "千米",
    "graph": {
      "kind": "numberline"
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "numberline"
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
    "latex": "60x = 40x + 30",
    "translation": "甲时速 60 追时速 40 的乙，乙先走了 30 千米；设 x 小时追上"
  },
  {
    "id": "f2",
    "latex": "20x = 30",
    "translation": "等量关系：追上时甲走的路程 = 乙走的路程"
  },
  {
    "id": "f3",
    "latex": "x = 1.5",
    "translation": "x=1.5：1.5 小时追上；甲走了 90，乙走了 60+30=90"
  }
]
```

```data
{
  "hints": [
    "追及等量关系：快车路程 = 慢车路程 + 先走的。",
    "相遇是“和”=全程，追及是“差”=先走的——一字之差，关系完全不同。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "小红 8 点出发时速 5 千米，小刚 8 点半时速 7 千米追：7x=5x+2.5，x=1.25 小时追上。"
    }
  ]
}
```
