---
id: "ch06-u0-l2-p3b"
title: "象限判读：三步走"
concept: "讲解：象限判读"
prev: "ch06-u0-l2-p3"
next: "ch06-u1-l1-p1"
---

## 讲解

判读三步：先看 x 的正负，再看 y 的正负，最后检查是不是落在轴上。

生活例：地图“东经为正、西经为负”——经纬度就是地球的坐标系。

反例：说“(3, 0) 在第一象限”——错！它在 x 轴上，哪个象限都不算。

图形例：y=2x+1 的图像穿过一、二、三象限——下一单元你会亲手画它。

记住一句话：符号定象限，轴上点除外。

```interaction
{
  "type": "step-play",
  "params": {
    "interval": 1600,
    "steps": [
      {
        "caption": "第 1 步：A(−2, 5)——x 负、y 正，第二象限。",
        "shapes": [
          {
            "t": "seg",
            "a": [
              12,
              30
            ],
            "b": [
              92,
              30
            ],
            "color": "line",
            "width": 2
          },
          {
            "t": "seg",
            "a": [
              25,
              18
            ],
            "b": [
              25,
              92
            ],
            "color": "line",
            "width": 2
          },
          {
            "t": "txt",
            "p": [
              58,
              61
            ],
            "text": "一",
            "size": 16,
            "bold": true
          },
          {
            "t": "txt",
            "p": [
              14,
              61
            ],
            "text": "二",
            "size": 16,
            "bold": true
          },
          {
            "t": "txt",
            "p": [
              14,
              22
            ],
            "text": "三",
            "size": 16,
            "bold": true
          },
          {
            "t": "txt",
            "p": [
              58,
              22
            ],
            "text": "四",
            "size": 16,
            "bold": true
          },
          {
            "t": "pt",
            "p": [
              5,
              80
            ],
            "label": "A",
            "color": "target",
            "r": 5
          }
        ]
      },
      {
        "caption": "第 2 步：B(0, −1)——x=0，落在 y 轴上，不属于任何象限。",
        "shapes": [
          {
            "t": "seg",
            "a": [
              12,
              30
            ],
            "b": [
              92,
              30
            ],
            "color": "line",
            "width": 2
          },
          {
            "t": "seg",
            "a": [
              25,
              18
            ],
            "b": [
              25,
              92
            ],
            "color": "line",
            "width": 2
          },
          {
            "t": "txt",
            "p": [
              58,
              61
            ],
            "text": "一",
            "size": 16,
            "bold": true
          },
          {
            "t": "txt",
            "p": [
              14,
              61
            ],
            "text": "二",
            "size": 16,
            "bold": true
          },
          {
            "t": "txt",
            "p": [
              14,
              22
            ],
            "text": "三",
            "size": 16,
            "bold": true
          },
          {
            "t": "txt",
            "p": [
              58,
              22
            ],
            "text": "四",
            "size": 16,
            "bold": true
          },
          {
            "t": "pt",
            "p": [
              25,
              20
            ],
            "label": "B",
            "color": "target",
            "r": 5
          }
        ]
      },
      {
        "caption": "第 3 步：三步走——一看 x 正负，二看 y 正负，三看是不是在轴上。",
        "shapes": [
          {
            "t": "seg",
            "a": [
              12,
              30
            ],
            "b": [
              92,
              30
            ],
            "color": "line",
            "width": 2
          },
          {
            "t": "seg",
            "a": [
              25,
              18
            ],
            "b": [
              25,
              92
            ],
            "color": "line",
            "width": 2
          },
          {
            "t": "txt",
            "p": [
              58,
              61
            ],
            "text": "一",
            "size": 16,
            "bold": true
          },
          {
            "t": "txt",
            "p": [
              14,
              61
            ],
            "text": "二",
            "size": 16,
            "bold": true
          },
          {
            "t": "txt",
            "p": [
              14,
              22
            ],
            "text": "三",
            "size": 16,
            "bold": true
          },
          {
            "t": "txt",
            "p": [
              58,
              22
            ],
            "text": "四",
            "size": 16,
            "bold": true
          },
          {
            "t": "pt",
            "p": [
              5,
              80
            ],
            "label": "A",
            "color": "corrA",
            "r": 4
          },
          {
            "t": "pt",
            "p": [
              25,
              20
            ],
            "label": "B",
            "color": "corrA",
            "r": 4
          }
        ]
      }
    ]
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
    "latex": "(-2, 5) \\to \\text{第二象限}",
    "translation": "(−2, 5)：x 负 y 正 → 第二象限"
  },
  {
    "id": "f2",
    "latex": "(0, -1) \\to \\text{在 y 轴上}",
    "translation": "(0, −1)：x=0，落在 y 轴上，不属于任何象限"
  }
]
```

```data
{
  "hints": [
    "判读三步：先看 x 的正负，再看 y 的正负，最后检查是不是落在轴上。",
    "生活例：地图“东经为正、西经为负”——经纬度就是地球的坐标系。",
    "反例：说“(3, 0) 在第一象限”——错！它在 x 轴上，哪个象限都不算。",
    "图形例：y=2x+1 的图像穿过一、二、三象限——下一单元你会亲手画它。",
    "记住一句话：符号定象限，轴上点除外。"
  ],
  "examples": [
    {
      "figure": "变式练习",
      "text": "点 (5, −2)、(−4, −1) 各在第几象限？——第四、第三。"
    }
  ]
}
```
