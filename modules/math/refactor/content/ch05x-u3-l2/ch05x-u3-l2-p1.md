---
id: "ch05x-u3-l2-p1"
title: "一图流：三条路，一座桥"
concept: "本章小结"
prev: "ch05x-u3-l1-p3"
next: null
---

## 讲解

三条路，一座桥：代数给精确，几何给直觉，交点即解连两边。

预告必有回音：ch06 6.2.2 会回指本页——y=kx+b 中的 k、b 就是这里算出来的。

```interaction
{
  "type": "static-compare",
  "params": {
    "left": {
      "title": "代数两条路",
      "items": [
        "代入：变形→代入→回代检验（有 ±1 系数首选）",
        "加减：凑成相反数→相加减消元（否则用它）",
        "都给出精确解"
      ]
    },
    "right": {
      "title": "几何一条路",
      "items": [
        "每条方程是一条直线",
        "解 = 交点坐标（图上读是近似值）",
        "D 判个数：相交/平行/重合"
      ]
    },
    "bridge": "下一章你会给这些直线起新名字——一次函数。你在 p1 亲手算过的 y=(c−a·x)/b，写成 y=kx+b 就是 k=−a/b、常数项=c/b——k、b 都是由你拖动的 a、b、c 算出来的。",
    "deepLink": "#p=ch06-u0-l1-p1"
  },
  "engine": {
    "primitive": "StaticCompare",
    "version": "2026.10.16.A",
    "params": {}
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
    "latex": "\\text{代入消元} \\quad | \\quad \\text{加减消元} \\quad | \\quad \\text{图像法}",
    "translation": "三条路：代入、加减、图像——都会到同一个解"
  },
  {
    "id": "f2",
    "latex": "\\text{解} = \\text{交点坐标}",
    "translation": "一座桥：方程组的解 = 两条直线交点的坐标"
  }
]
```

```data
{
  "hints": [
    "三条路，一座桥：代数给精确，几何给直觉，交点即解连两边。",
    "预告必有回音：ch06 6.2.2 会回指本页——y=kx+b 中的 k、b 就是这里算出来的。"
  ],
  "examples": [
    {
      "text": "运行例回顾：{x+y=10, 2x−y=8}，三种方法都得 (6,4)。",
      "figure": "回顾"
    }
  ]
}
```
