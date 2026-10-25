---
id: "ch04-u2-l3-p1b"
title: "应用题：设列解验四步"
concept: "讲解：列二次方程解应用题"
prev: "ch04-u2-l3-p1"
next: "ch04-u2-l4-p1"
---

## 讲解

列二次方程四步：设、列、解、验——验两件事：方程对不对、解合不合理。

负根常常要舍去：边长、时间、人数不能是负的。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 1,
    "max": 10,
    "step": 1,
    "label": "x",
    "expr": "x*(x + 3)",
    "target": 40,
    "targetLabel": "面积 = 40",
    "unit": "平方米",
    "graph": {
      "kind": "parabola",
      "a": 1,
      "b": 3,
      "c": 0
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "parabola",
      "a": 1,
      "b": 3,
      "c": 0
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
    "latex": "x(x + 3) = 40",
    "translation": "设宽 x 米，长 (x+3) 米：面积 40 平方米"
  },
  {
    "id": "f2",
    "latex": "x^2 + 3x - 40 = 0",
    "translation": "展开移项：(x+8)(x−5)=0"
  },
  {
    "id": "f3",
    "latex": "x = 5",
    "translation": "x=5 或 x=−8；边长为正，舍去 −8：宽 5 米，长 8 米"
  }
]
```

```data
{
  "hints": [
    "列二次方程四步：设、列、解、验——验两件事：方程对不对、解合不合理。",
    "负根常常要舍去：边长、时间、人数不能是负的。"
  ],
  "examples": [
    {
      "figure": "生活实例",
      "text": "两数和 10、积 21：设一数为 x，x(10−x)=21，x=3 或 7。"
    }
  ]
}
```
