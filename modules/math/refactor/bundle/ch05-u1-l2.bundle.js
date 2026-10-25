window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05-u1-l2"] = {
  "lessonId": "ch05-u1-l2",
  "lessonTitle": "一元一次不等式的解法",
  "chapterId": "ch05",
  "pages": [
    {
      "id": "ch05-u1-l2-p1",
      "title": "解集：满足条件的 x 全体",
      "concept": "一元一次不等式的解集",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x + 1 > 7",
          "translation": "2x 加 1 大于 7：待解的不等式"
        },
        {
          "id": "f2",
          "latex": "x > 3",
          "translation": "x 大于 3：解集——所有满足条件的 x"
        },
        {
          "id": "f3",
          "latex": "(3, +\\infty)",
          "translation": "3 到正无穷：数轴上是空心圆圈 3 加向右的射线"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "x",
            "min": 0,
            "max": 10,
            "step": 1
          },
          "mode": "single",
          "sets": [
            {
              "expr": "2*x+1-7",
              "ineq": ">",
              "label": "2x+1>7"
            }
          ],
          "showProbe": true
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "single",
            "sets": [
              {
                "expr": "2*x+1-7",
                "ineq": ">",
                "label": "2x+1>7"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "像解方程一样移项、合并：2x+1>7 化成 2x>6，得 x>3。",
        "只有乘除负数时才反向；解集画数轴：> 空心圆圈，≥ 实心圆点，向右画射线。"
      ],
      "examples": [
        {
          "text": "解集不是一个数，而是一整段数轴",
          "figure": "滑块"
        }
      ],
      "prev": "ch05-u1-l1-p3b",
      "next": "ch05-u1-l2-p1b"
    },
    {
      "id": "ch05-u1-l2-p1b",
      "title": "解集画数轴：空心实心",
      "concept": "讲解：一元一次不等式的解法",
      "formulas": [
        {
          "id": "f1",
          "latex": "3x - 5 < 10",
          "translation": "第一步：移项，3x<15（性质一，方向不变）"
        },
        {
          "id": "f2",
          "latex": "x < 5",
          "translation": "第二步：两边同除以 3（正数，方向不变）"
        },
        {
          "id": "f3",
          "latex": "(-\\infty, 5)",
          "translation": "解集：数轴上 5 处空心圈，向左画射线"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "x",
            "min": 0,
            "max": 10,
            "step": 1
          },
          "mode": "single",
          "sets": [
            {
              "expr": "3*x-5-10",
              "ineq": "<",
              "label": "3x−5<10"
            },
            {
              "expr": "-4*x-12",
              "ineq": ">=",
              "label": "−4x≥12（实心端点演示）"
            }
          ],
          "showProbe": true
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "single",
            "sets": [
              {
                "expr": "3*x-5-10",
                "ineq": "<",
                "label": "3x−5<10"
              },
              {
                "expr": "-4*x-12",
                "ineq": ">=",
                "label": "−4x≥12（实心端点演示）"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "解法和方程一样：移项、合并、系数化 1——只有乘除负数时多一步反向。",
        "解完画数轴：< 空心圈向左，> 空心圈向右；含等号用实心点。"
      ],
      "examples": [
        {
          "figure": "易错提醒",
          "text": "−4x≥12：两边同除以 −4 得 x≤−3（反向！）。"
        }
      ],
      "prev": "ch05-u1-l2-p1",
      "next": "ch05-u1-l2-p1g"
    },
    {
      "id": "ch05-u1-l2-p1g",
      "title": "解集在数轴上长什么样",
      "concept": "图形：解集的数轴表示",
      "formulas": [
        {
          "id": "f1",
          "latex": "x > 3",
          "translation": "解集：所有大于 3 的 x"
        },
        {
          "id": "f2",
          "latex": "(3, +\\infty)",
          "translation": "数轴：3 处空心圆圈（3 不在内），向右画射线"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 4,
            "label": "x",
            "max": 10,
            "min": 0,
            "step": 0.5
          },
          "views": [
            {
              "expr": "2*x + 1 - 7",
              "kind": "readout",
              "label": "2x+1−7"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "0"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "拖 x：读数>0 时点落在射线上——解集就是这条射线上的所有点。",
        ">、< 空心圈（不含端点）；≥、≤ 实心点（含端点）。"
      ],
      "examples": [
        {
          "figure": "数形结合",
          "text": "x≥2：2 处实心点，向右射线；x<1：1 处空心圈，向左射线。"
        }
      ],
      "prev": "ch05-u1-l2-p1b",
      "next": "ch05-u1-l3-p1"
    }
  ]
};
