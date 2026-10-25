window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05x-u1-l1"] = {
  "lessonId": "ch05x-u1-l1",
  "lessonTitle": "方程组：两个方程定住两个未知数",
  "chapterId": "ch05x",
  "pages": [
    {
      "id": "ch05x-u1-l1-p1",
      "title": "一个方程，两个未知数：解有无数个",
      "concept": "二元一次方程",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + y = 10",
          "translation": "x 加 y 等于 10：两个未知数，一个方程"
        },
        {
          "id": "f2",
          "latex": "(1, 9), (2, 8), (5, 5), (10, 0)",
          "translation": "都是解：1+9=10，2+8=10……怎么代都对"
        },
        {
          "id": "f3",
          "latex": "y = 10 - x",
          "translation": "y 等于 10 减 x：x 定了，y 就定了——解有无数个"
        }
      ],
      "interaction": {
        "type": "sys-lab",
        "params": {
          "sliders": [
            {
              "id": "x",
              "label": "x",
              "min": -10,
              "max": 10,
              "step": 1,
              "initial": 1
            },
            {
              "id": "y",
              "label": "y",
              "min": -10,
              "max": 10,
              "step": 1,
              "initial": 9
            }
          ],
          "derived": [
            {
              "id": "sum",
              "expr": "x + y",
              "label": "x + y"
            }
          ],
          "readouts": [
            {
              "expr": "x + y - 10",
              "target": 0,
              "label": "离 10 差多少",
              "okText": "✓ 是解",
              "noText": "还不是解"
            }
          ],
          "point": {
            "xExpr": "x",
            "yExpr": "10 - x",
            "xRange": [
              -10,
              10
            ],
            "yRange": [
              -10,
              10
            ],
            "caption": "点 (x, 10−x) 同步走——直线雏形"
          },
          "target": {
            "expr": "x + y",
            "value": 10,
            "label": "等于 10 的组合"
          }
        },
        "engine": {
          "primitive": "SysLab",
          "version": "2026.10.16.A",
          "params": {
            "sliders": [
              "x",
              "y"
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖出 (1,9)、(2,8)、(5,5)、(10,0)……发现怎么都对。",
        "一个方程定不住两个未知数：x 变，y 跟着变，解有无数个。",
        "右边的点 (x, 10−x) 在坐标系里走出的是一条直线——为后面铺垫。"
      ],
      "examples": [
        {
          "text": "猜数：我想了两个数，和是 10——你猜是哪两个？",
          "figure": "滑块"
        }
      ],
      "prev": null,
      "next": "ch05x-u1-l1-p2"
    },
    {
      "id": "ch05x-u1-l1-p2",
      "title": "两个方程，解就定了：方程组的解",
      "concept": "二元一次方程组",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + y = 10",
          "translation": "方程组①：x 加 y 等于 10"
        },
        {
          "id": "f2",
          "latex": "2x - y = 8",
          "translation": "方程组②：2x 减 y 等于 8——两个方程联立"
        },
        {
          "id": "f3",
          "latex": "(6, 4)",
          "translation": "解是 (6,4)：6+4=10，2×6−4=8，两个都成立"
        }
      ],
      "interaction": {
        "type": "sys-lab",
        "params": {
          "sliders": [
            {
              "id": "x",
              "label": "x",
              "min": -10,
              "max": 10,
              "step": 1,
              "initial": 6
            },
            {
              "id": "y",
              "label": "y",
              "min": -10,
              "max": 10,
              "step": 1,
              "initial": 4
            }
          ],
          "readouts": [
            {
              "expr": "x + y - 10",
              "target": 0,
              "label": "第一式余数",
              "okText": "✓ 第一式成立",
              "noText": "第一式不成立"
            },
            {
              "expr": "2*x - y - 8",
              "target": 0,
              "label": "第二式余数",
              "okText": "✓ 第二式成立",
              "noText": "第二式不成立"
            }
          ],
          "combine": {
            "label": "判是不是解",
            "rule": "双 target=0 同时命中",
            "okText": "✓ 是方程组的解",
            "noText": "还不是解：两个式子要同时成立"
          },
          "note": "命中点 (6,4)：6+4−10=0，2×6−4−8=0"
        },
        "engine": {
          "primitive": "SysLab",
          "version": "2026.10.16.A",
          "params": {
            "sliders": [
              "x",
              "y"
            ],
            "combine": true
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "只满足一个式子不算：解要让两个方程同时成立。",
        "这里的两个方程是各说各话、互相独立的；如果两句话说的是同一件事（重合）或互相打架（平行），解的个数会不一样——到图像那一课见分晓。",
        "例方程组 {x+y=10, 2x−y=8}（解 (6,4)）是本单元的运行例，后面反复用它。"
      ],
      "examples": [
        {
          "text": "鸡兔同笼原故事：头 10、脚 28。方程组 {x+y=10, 2x+4y=28}，同解 (6,4)。",
          "figure": "对照"
        }
      ],
      "prev": "ch05x-u1-l1-p1",
      "next": "ch05x-u1-l2-p1"
    }
  ]
};
