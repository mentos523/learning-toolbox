window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05-u2-l1"] = {
  "lessonId": "ch05-u2-l1",
  "lessonTitle": "二次不等式的图像解法",
  "chapterId": "ch05",
  "pages": [
    {
      "id": "ch05-u2-l1-p1",
      "title": "抛物线在横轴上方",
      "concept": "二次不等式的图像解法",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 - 4 > 0",
          "translation": "x 平方减 4 大于 0：待解的二次不等式"
        },
        {
          "id": "f2",
          "latex": "x < -2, x > 2",
          "translation": "x 小于负 2 或 x 大于 2：抛物线在横轴上方的部分"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": -4,
            "max": 4,
            "step": 0.5,
            "initial": 0
          },
          "views": [
            {
              "kind": "readout",
              "expr": "x^2 - 4",
              "label": "x²−4"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^2 - 4"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "三步：解方程找交点 x=±2，画草图，取'上方'的 x 范围。",
        "拖动 x：读数为正时点在横轴上方——这些 x 就是 x²−4>0 的解。"
      ],
      "examples": [
        {
          "text": "方程的解是交点，不等式的解是整段区间",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch05-u1-l3-p1b",
      "next": "ch05-u2-l1-p1b"
    },
    {
      "id": "ch05-u2-l1-p1b",
      "title": "二次不等式：三步看图像",
      "concept": "讲解：二次不等式的图像解法",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 - 5x + 6 < 0",
          "translation": "第一步：解方程 x²−5x+6=0 得 x=2 或 3（交点）"
        },
        {
          "id": "f2",
          "latex": "\\text{开口向上}",
          "translation": "第二步：a=1>0，开口向上"
        },
        {
          "id": "f3",
          "latex": "2 < x < 3",
          "translation": "第三步：<0 取下方（两根之间）：2<x<3"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 2.5,
            "label": "x",
            "max": 5,
            "min": 0,
            "step": 0.5
          },
          "views": [
            {
              "expr": "x^2 - 5*x + 6",
              "kind": "readout",
              "label": "x²−5x+6"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^2 - 5*x + 6"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "三步：解方程找交点；看开口定形状；按不等号取上方/下方。",
        ">0 取上方（两边），<0 取下方（中间）——开口向上时。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x²−4<0：交点 ±2，开口向上，取中间：−2<x<2。"
        }
      ],
      "prev": "ch05-u2-l1-p1",
      "next": "ch05-u2-l1-p2"
    },
    {
      "id": "ch05-u2-l1-p2",
      "title": "相切与恒成立",
      "concept": "Δ=0 与 Δ<0 的二次不等式",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 + 2x + 1 > 0",
          "translation": "x 平方加 2x 加 1 大于 0：判别式等于 0，抛物线与横轴相切"
        },
        {
          "id": "f2",
          "latex": "x \\neq -1",
          "translation": "x 不等于负 1：除切点外，抛物线全在横轴上方"
        },
        {
          "id": "f3",
          "latex": "x^2 + x + 1 > 0",
          "translation": "x 平方加 x 加 1 大于 0：判别式小于 0 且开口向上，对一切实数 x 恒成立"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "x",
            "min": -3,
            "max": 3,
            "step": 0.5
          },
          "mode": "compare",
          "sets": [
            {
              "expr": "x^2+2*x+1",
              "ineq": ">",
              "label": "相切：x²+2x+1>0"
            },
            {
              "expr": "x^2+x+1",
              "ineq": ">",
              "label": "悬空：x²+x+1>0"
            }
          ],
          "showProbe": true,
          "note": "方向同、解集异：相切时 x≠−1；悬空时恒成立（全体实数）",
          "compareLabels": [
            "相切：x²+2x+1",
            "悬空：x²+x+1"
          ]
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "compare",
            "sets": [
              {
                "expr": "x^2+2*x+1",
                "ineq": ">",
                "label": "相切：x²+2x+1>0"
              },
              {
                "expr": "x^2+x+1",
                "ineq": ">",
                "label": "悬空：x²+x+1>0"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "Δ=0：抛物线与横轴相切，>0 的解是切点之外的所有 x。",
        "Δ<0：抛物线不碰横轴；开口向上则恒成立，开口向下则无解。"
      ],
      "examples": [
        {
          "text": "左边只在 x=−1 处碰到 0，右边永远碰不到 0",
          "figure": "并排对比"
        }
      ],
      "prev": "ch05-u2-l1-p1b",
      "next": "ch05-u2-l1-p2b"
    },
    {
      "id": "ch05-u2-l1-p2b",
      "title": "Δ=0 与 Δ<0：先看判别式",
      "concept": "讲解：Δ=0 与 Δ<0 的二次不等式",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 - 4x + 4 < 0",
          "translation": "Δ=0：(x−2)²<0，平方不可能为负"
        },
        {
          "id": "f2",
          "latex": "\\text{无解}",
          "translation": "除 x=2 时等于 0，其余都大于 0：<0 无解"
        },
        {
          "id": "f3",
          "latex": "x^2 + 1 > 0",
          "translation": "Δ=−4<0，开口向上：恒成立，解集为全体实数"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "x",
            "min": -3,
            "max": 5,
            "step": 0.5
          },
          "mode": "compare",
          "sets": [
            {
              "expr": "x^2-4*x+4",
              "ineq": "<",
              "label": "相切：x²−4x+4<0（无解）"
            },
            {
              "expr": "x^2+1",
              "ineq": ">",
              "label": "悬空：x²+1>0（恒成立）"
            }
          ],
          "showProbe": true,
          "note": "左：(x−2)²<0 无解；右：x²+1>0 恒成立",
          "compareLabels": [
            "相切：x²−4x+4",
            "悬空：x²+1"
          ]
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "compare",
            "sets": [
              {
                "expr": "x^2-4*x+4",
                "ineq": "<",
                "label": "相切：x²−4x+4<0（无解）"
              },
              {
                "expr": "x^2+1",
                "ineq": ">",
                "label": "悬空：x²+1>0（恒成立）"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "Δ=0 先想相切：>0 去掉切点，≥0 全体实数，<0 无解，≤0 只有切点。",
        "Δ<0 先看开口：向上+>0 恒成立，向下+<0 恒成立，反过来都无解。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x²+2x+1≥0：Δ=0，解集为全体实数（切点 x=−1 也成立）。"
        }
      ],
      "prev": "ch05-u2-l1-p2",
      "next": "ch05-u2-l2-p1"
    }
  ]
};
