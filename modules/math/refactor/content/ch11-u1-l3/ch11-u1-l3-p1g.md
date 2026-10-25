---
id: "ch11-u1-l3-p1g"
title: "放大镜：曲线放大变直线"
concept: "图形：割线逼近切线"
prev: "ch11-u1-l3-p1b"
next: "ch11-u2-l1-p1"
---

## 讲解

一级级放大 x=1 附近：曲线越来越直，最后像直线。

那条“像直线”的极限位置就是切线，它的斜率=导数。

```interaction
{
  "params": {
    "caption": "放大到足够大，曲线看起来像直线了",
    "center": 1,
    "fn": "x^2",
    "levels": 4,
    "window": 2
  },
  "type": "zoomer"
}
```

```auxInteraction
null
```

```formulas
[
  {
    "id": "f1",
    "latex": "f'(1) = 2",
    "translation": "y=x² 在 x=1 处切线斜率是 2"
  },
  {
    "id": "f2",
    "latex": "\\text{割线} \\to \\text{切线}",
    "translation": "放大：割线越来越贴近切线"
  }
]
```

```data
{
  "hints": [
    "一级级放大 x=1 附近：曲线越来越直，最后像直线。",
    "那条“像直线”的极限位置就是切线，它的斜率=导数。"
  ],
  "examples": [
    {
      "figure": "数形结合",
      "text": "地球表面：站得近看是平面，放大看地球是圆的——同一个道理。"
    }
  ]
}
```
