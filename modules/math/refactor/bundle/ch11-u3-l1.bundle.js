window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch11-u3-l1"] = {
  "lessonId": "ch11-u3-l1",
  "lessonTitle": "单调性",
  "chapterId": "ch11",
  "pages": [
    {
      "id": "ch11-u3-l1-p1",
      "title": "f'>0 上坡，f'<0 下坡",
      "concept": "单调性",
      "formulas": [
        {
          "id": "f1",
          "latex": "f'(x) > 0 \\text{则} f(x) \\text{递增}",
          "translation": "导数为正：切线向上扬，函数递增——y=x³−3x 在 x>1 的段"
        },
        {
          "id": "f2",
          "latex": "f'(x) < 0 \\text{则} f(x) \\text{递减}",
          "translation": "导数为负：切线向下俯，函数递减——y=x³−3x 在 −1<x<1 的段"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": -3,
            "max": 3,
            "step": 0.1,
            "initial": 0
          },
          "views": [
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^3-3*x",
              "axisLabelX": "x",
              "axisLabelY": "y"
            },
            {
              "kind": "readout",
              "expr": "3*x^2-3",
              "label": "f'(x)"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 x 扫过曲线：读数为正的段往上走，为负的段往下走。",
        "x=±1 处读数为 0：曲线在那儿'换方向'——下一页讲极值。"
      ],
      "examples": [
        {
          "text": "坡度计：f'(x) 就是曲线在每一点的'坡度'",
          "figure": "联动仪表盘"
        }
      ],
      "prev": "ch11-u2-l3-p1c",
      "next": "ch11-u3-l1-p1b"
    },
    {
      "id": "ch11-u3-l1-p1b",
      "title": "单调性：导数是坡度计",
      "concept": "讲解：单调性",
      "formulas": [
        {
          "id": "f1",
          "latex": "f(x) = x^3",
          "translation": "f'(x)=3x²≥0：恒递增"
        },
        {
          "id": "f2",
          "latex": "f'(x) > 0 \\to \\text{递增}",
          "translation": "导数>0：上坡"
        },
        {
          "id": "f3",
          "latex": "f'(x) < 0 \\to \\text{递减}",
          "translation": "导数<0：下坡"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 0,
            "label": "x",
            "max": 3,
            "min": -3,
            "step": 0.1
          },
          "views": [
            {
              "axisLabelX": "x",
              "axisLabelY": "y",
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^3-3*x"
            },
            {
              "expr": "3*x^2-3",
              "kind": "readout",
              "label": "f'(x)"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "判断单调性：求 f'(x)，解 f'(x)>0 得递增区间。",
        "f'(x)=0 的点是“换挡点”：单调性可能在这里改变。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=x²：f'=2x，x>0 递增，x<0 递减。"
        }
      ],
      "prev": "ch11-u3-l1-p1",
      "next": "ch11-u3-l2-p1"
    }
  ]
};
