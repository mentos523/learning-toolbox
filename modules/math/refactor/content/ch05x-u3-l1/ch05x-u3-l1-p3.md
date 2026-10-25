---
id: "ch05x-u3-l1-p3"
title: "三种位置，三种解：相交 / 平行 / 重合"
concept: "解的个数与直线位置"
prev: "ch05x-u3-l1-p2"
next: "ch05x-u3-l2-p1"
---

## 讲解

D≠0 → 相交 → 唯一解；D=0 时再看 c 是否成比例。

判别式 D=a₁b₂−a₂b₁——它是两个方程的系数算出来的一个数，D≠0 时方程组有唯一解（与 ch04 用 Δ 看交点个数呼应）。

三预设按钮：相交 / 平行 / 重合，一键切换看三种命运。

p2 说方程组的解 = 两条直线交点的坐标，那是两直线相交的情形；现在看另外两种位置。

```interaction
{
  "type": "eq-graph-lab",
  "params": {
    "graph": {
      "kind": "system2x2",
      "coeffs": {
        "a1": 1,
        "b1": 1,
        "c1": 4,
        "a2": 1,
        "b2": 1,
        "c2": 7
      },
      "ranges": {
        "ab": {
          "min": -5,
          "max": 5,
          "step": 1
        },
        "c": {
          "min": -12,
          "max": 12,
          "step": 1
        }
      },
      "presets": [
        {
          "label": "相交",
          "coeffs": {
            "a1": 1,
            "b1": 1,
            "c1": 10,
            "a2": 2,
            "b2": -1,
            "c2": 8
          },
          "note": "唯一解 (6,4)"
        },
        {
          "label": "平行",
          "coeffs": {
            "a1": 1,
            "b1": 1,
            "c1": 4,
            "a2": 1,
            "b2": 1,
            "c2": 7
          },
          "note": "无解：两条直线永不相见"
        },
        {
          "label": "重合",
          "coeffs": {
            "a1": 1,
            "b1": 1,
            "c1": 4,
            "a2": 2,
            "b2": 2,
            "c2": 8
          },
          "note": "无数组解：其实是同一条直线"
        }
      ],
      "showD": true
    }
  },
  "engine": {
    "primitive": "EqGraphLab",
    "version": "2026.10.16.A",
    "params": {
      "kind": "system2x2",
      "mode": "coeffs"
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
    "latex": "D \\neq 0 \\Rightarrow \\text{交于一点} \\Rightarrow \\text{唯一解}",
    "translation": "D≠0 → 相交 → 唯一解"
  },
  {
    "id": "f2",
    "latex": "D = 0 \\ \\text{且不成比例} \\Rightarrow \\text{平行} \\Rightarrow \\text{无解}",
    "translation": "D=0 且不成比例 → 平行 → 无解（如 {x+y=4, x+y=7} 得 4=7 矛盾）"
  },
  {
    "id": "f3",
    "latex": "D = 0 \\ \\text{且成比例} \\Rightarrow \\text{重合} \\Rightarrow \\text{无数组解}",
    "translation": "D=0 且成比例 → 重合 → 无数组解（如 {x+y=4, 2x+2y=8} 得 8=8 恒成立）"
  }
]
```

```data
{
  "hints": [
    "D≠0 → 相交 → 唯一解；D=0 时再看 c 是否成比例。",
    "判别式 D=a₁b₂−a₂b₁——它是两个方程的系数算出来的一个数，D≠0 时方程组有唯一解（与 ch04 用 Δ 看交点个数呼应）。",
    "三预设按钮：相交 / 平行 / 重合，一键切换看三种命运。",
    "p2 说方程组的解 = 两条直线交点的坐标，那是两直线相交的情形；现在看另外两种位置。"
  ],
  "examples": [
    {
      "text": "代数视角：用代入/加减法解平行的方程组（如 {x+y=4, x+y=7}），消元后得到 4=7 矛盾式（即 0=3）→ 无解；解重合的（如 {x+y=4, 2x+2y=8}），得到 8=8（即 0=0）恒成立 → 无数组解。",
      "figure": "代数"
    }
  ]
}
```
