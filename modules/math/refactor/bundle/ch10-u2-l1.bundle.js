window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-u2-l1"] = {
  "lessonId": "ch10-u2-l1",
  "lessonTitle": "函数的极限",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-u2-l1-p1",
      "title": "函数极限：x→1 时 f(x)→2",
      "concept": "函数的极限",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\lim_{x \\to 1} \\frac{x^2 - 1}{x - 1} = 2",
          "translation": "x 趋向 1（但 x≠1）时函数值趋向 2——从左从右拖过去看"
        },
        {
          "id": "f2",
          "latex": "\\lim_{x \\to \\infty} \\frac{1}{x} = 0",
          "translation": "x 趋向无穷大时 1/x 趋向 0：数列 1/n→0 的连续版"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": -2,
            "max": 2,
            "step": 0.1,
            "initial": -2
          },
          "views": [
            {
              "kind": "readout",
              "expr": "(x^2-1)/(x-1)",
              "label": "f(x)"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "(x^2-1)/(x-1)",
              "axisLabelX": "x",
              "axisLabelY": "y"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "从左（x<1）和从右（x>1）拖向 1：f(x) 都→2。",
        "x=1 处分母为 0、无定义——但极限照样是 2，不看'那一点'。"
      ],
      "examples": [
        {
          "text": "约分：(x²−1)/(x−1)=x+1（x≠1）——极限看的是趋势",
          "figure": "联动仪表盘"
        }
      ],
      "prev": "ch10-u1-l4-p1b",
      "next": "ch10-u2-l1-p1b"
    },
    {
      "id": "ch10-u2-l1-p1b",
      "title": "函数极限：左右夹击",
      "concept": "讲解：函数的极限",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\lim_{x \\to 2} (3x - 1) = 5",
          "translation": "x→2 时 3x−1→5：代入就行（连续函数）"
        },
        {
          "id": "f2",
          "latex": "\\lim_{x \\to 0} \\frac{1}{x}",
          "translation": "x→0 时 1/x：左→−∞，右→+∞，极限不存在"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": -2,
            "label": "x",
            "max": 2,
            "min": -2,
            "step": 0.1
          },
          "views": [
            {
              "expr": "(x^2-1)/(x-1)",
              "kind": "readout",
              "label": "f(x)"
            },
            {
              "axisLabelX": "x",
              "axisLabelY": "y",
              "kind": "point",
              "xExpr": "x",
              "yExpr": "(x^2-1)/(x-1)"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "函数极限看趋势：x 逼近 x₀ 时 f(x) 逼近谁。",
        "左右极限都要看：左≠右则极限不存在（如 1/x 在 0 处）。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "lim(x→3)(x²)=9：连续函数直接代入。"
        }
      ],
      "prev": "ch10-u2-l1-p1",
      "next": "ch10-u2-l2-p1"
    }
  ]
};
