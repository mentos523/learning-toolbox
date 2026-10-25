---
id: "ch03-ux-l1-p1"
title: "第三章习题：分式"
concept: "本章习题"
prev: "ch03-u2-l4-p1"
next: null
---

## 讲解

1．是分式的是（ ）A．x/2 B．2/x C．(x+1)/3

2．分式 3/(x−5) 有意义，则 x≠____。

3．约分：(4x²)/(6x)=____。

4．计算：(2/a)·(a/4)=____。

5．计算：1/x+2/x=____。

6．解方程：4/x=1，并检验。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "min": 1,
    "max": 10,
    "step": 1,
    "label": "x",
    "expr": "4/x",
    "target": 1,
    "targetLabel": "右边 = 1（第 6 题）",
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
    "latex": "\\frac{4}{x} = 1",
    "translation": "第 6 题：两边同乘 x 去分母，得 4=x"
  }
]
```

```data
{
  "hints": [
    "1．是分式的是（ ）A．x/2 B．2/x C．(x+1)/3",
    "2．分式 3/(x−5) 有意义，则 x≠____。",
    "3．约分：(4x²)/(6x)=____。",
    "4．计算：(2/a)·(a/4)=____。",
    "5．计算：1/x+2/x=____。",
    "6．解方程：4/x=1，并检验。"
  ],
  "examples": [
    {
      "figure": "核对答案",
      "text": "答案：1．B；2．5；3．(2x)/3；4．1/2；5．3/x；6．x=4（检验：分母 4≠0，通过）"
    },
    {
      "figure": "错因解析",
      "text": "1．分式=分母含字母：A、C 分母是数字，只有 B 的分母是 x。2．分母不能为 0：x−5≠0，得 x≠5。3．分子分母同除以 2x：(4x²)/(6x)=2x/3。4．约分：(2/a)·(a/4)=2a/4a=1/2——a 可以约掉（a≠0）。5．同分母相加：分子相加，1+2=3，得 3/x。6．两边×x：4=x；检验：x=4 时分母≠0，是原方程的解。"
    }
  ]
}
```
