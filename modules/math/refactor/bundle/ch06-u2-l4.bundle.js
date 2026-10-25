window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u2-l4"] = {
  "lessonId": "ch06-u2-l4",
  "lessonTitle": "一次函数与方程、不等式",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u2-l4-p1",
      "title": "方程不等式的大会师",
      "concept": "一次函数与方程、不等式",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x - 4 = 0",
          "translation": "2x 减 4 等于 0：解是 x=2——直线与 x 轴交点的横坐标"
        },
        {
          "id": "f2",
          "latex": "2x - 4 > 0",
          "translation": "2x 减 4 大于 0：解是 x>2——直线在 x 轴上方的那一段"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": 0,
            "max": 4,
            "step": 0.5,
            "initial": 1
          },
          "views": [
            {
              "kind": "readout",
              "expr": "2*x - 4",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "2*x - 4"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖到 y=0 处：x=2 就是方程 2x−4=0 的解。",
        "y>0 的点都在 x 轴上方——不等式 2x−4>0 的解是 x>2。",
        "大会师回看：「方程组的解 = 两条直线的交点」——交点即解的思想从这里来。"
      ],
      "examples": [
        {
          "text": "第五章的“分界点”：先解等号，再看一边",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch06-u2-l3-p1b",
      "next": "ch06-u2-l4-p1b"
    },
    {
      "id": "ch06-u2-l4-p1b",
      "title": "大会师：交点即方程的解",
      "concept": "讲解：一次函数与方程、不等式",
      "formulas": [
        {
          "id": "f1",
          "latex": "3x + 1 = 7",
          "translation": "方程：解 x=2"
        },
        {
          "id": "f2",
          "latex": "y = 3x + 1",
          "translation": "看直线 y=3x+1 上 y=7 的点：横坐标就是 2"
        },
        {
          "id": "f3",
          "latex": "3x + 1 > 7 \\to x > 2",
          "translation": "不等式：直线在 y=7 上方的部分，x>2"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 2,
            "label": "x",
            "max": 4,
            "min": 0,
            "step": 0.5
          },
          "views": [
            {
              "expr": "3*x + 1",
              "kind": "readout",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "3*x + 1"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "方程的解=交点横坐标；不等式的解=图像在上/下方的 x 范围。",
        "第五章“先找分界点”就是这句话：分界点就是交点。",
        "交点即解的完整形态：二元一次方程组的解就是两条直线交点的坐标。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "−x+2>0：直线 y=−x+2 在 x 轴上方的部分，x<2。"
        }
      ],
      "prev": "ch06-u2-l4-p1",
      "next": "ch06-u2-l5-p1"
    }
  ]
};
