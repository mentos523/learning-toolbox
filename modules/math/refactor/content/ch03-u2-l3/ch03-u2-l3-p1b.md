---
id: "ch03-u2-l3-p1b"
title: "分式方程：去分母三步"
concept: "讲解：分式方程的解法"
prev: "ch03-u2-l3-p1"
next: "ch03-u2-l3-p2"
---

## 讲解

解分式方程三步：找最简公分母；两边同乘去分母；解整式方程。

去分母的依据是等式性质 2：两边乘同一个不为 0 的整式。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 1,
    "max": 10,
    "step": 1,
    "label": "x",
    "expr": "4/x",
    "target": 2,
    "targetLabel": "右边 = 2",
    "graph": {
      "kind": "rational",
      "forbidAt": [
        0
      ]
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "rational",
      "forbidAt": [
        0
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
    "latex": "\\frac{4}{x} = 2",
    "translation": "第一步：找最简公分母 x（x≠0，分母不能为零）"
  },
  {
    "id": "f2",
    "latex": "4 = 2x",
    "translation": "第二步：两边同乘 x，分母消失，变成整式方程"
  },
  {
    "id": "f3",
    "latex": "x = 4",
    "translation": "第三步：x=4；检验：4≠0，不在禁区，通过"
  }
]
```

```data
{
  "hints": [
    "解分式方程三步：找最简公分母；两边同乘去分母；解整式方程。",
    "去分母的依据是等式性质 2：两边乘同一个不为 0 的整式。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "2/(x+1)=1：同乘 (x+1) 得 2=x+1，x=1；检验 x+1=2≠0。"
    }
  ]
}
```
