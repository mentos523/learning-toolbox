window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-u2-l3"] = {
  "lessonId": "ch10-u2-l3",
  "lessonTitle": "函数的连续性",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-u2-l3-p1",
      "title": "连续：一笔画不断裂",
      "concept": "函数的连续性",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\lim_{x \\to x_0} f(x) = f(x_0)",
          "translation": "连续的定义：在 x₀ 连续 ⟺ 极限值等于函数值——'对得上'"
        },
        {
          "id": "f2",
          "latex": "\\lim_{x \\to 1} x^2 = 1 = f(1)",
          "translation": "y=x² 在 x=1：极限 1 = 函数值 1——对上了，所以连续"
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
              "expr": "x^2",
              "label": "f(x)"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^2",
              "axisLabelX": "x",
              "axisLabelY": "y"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "从左一路拖到右：点始终连着走，没有'跳'——一笔画。",
        "上一页的函数在 x=1 没定义：极限 2 对不上函数值，不连续。"
      ],
      "examples": [
        {
          "text": "认旧友：上一页 (x²−1)/(x−1) 的'断点'就是不连续",
          "figure": "联动仪表盘"
        }
      ],
      "prev": "ch10-u2-l2-p1b",
      "next": "ch10-u2-l3-p1b"
    },
    {
      "id": "ch10-u2-l3-p1b",
      "title": "连续：极限对上函数值",
      "concept": "讲解：函数的连续性",
      "formulas": [
        {
          "id": "f1",
          "latex": "f(x) = \\frac{x^2 - 1}{x - 1} (x \\neq 1)",
          "translation": "x=1 处没定义：断点"
        },
        {
          "id": "f2",
          "latex": "\\lim_{x \\to 1} f(x) = 2",
          "translation": "极限是 2，但 f(1) 不存在：对不上，不连续"
        },
        {
          "id": "f3",
          "latex": "g(1) = 2",
          "translation": "定义 g(1)=2：把断点补上，就连续了"
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
              "expr": "x^2",
              "kind": "readout",
              "label": "f(x)"
            },
            {
              "axisLabelX": "x",
              "axisLabelY": "y",
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^2"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "连续=三对上：f(x₀) 有定义、极限存在、两者相等。",
        "可去断点：补上那一点就连续——如 (x²−1)/(x−1) 补 f(1)=2。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=1/x 在 x=0：没定义，不连续；且是断成两截的那种。"
        }
      ],
      "prev": "ch10-u2-l3-p1",
      "next": "ch10-u2-l4-p1"
    }
  ]
};
