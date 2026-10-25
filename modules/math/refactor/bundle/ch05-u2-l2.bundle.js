window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05-u2-l2"] = {
  "lessonId": "ch05-u2-l2",
  "lessonTitle": "含参数的二次不等式",
  "chapterId": "ch05",
  "pages": [
    {
      "id": "ch05-u2-l2-p1",
      "title": "参数 a：分类讨论",
      "concept": "含参数二次不等式的分类讨论",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x-1)(x-a) < 0",
          "translation": "x 减 1 乘 x 减 a 小于 0：两根是 1 和 a，大小关系不定"
        },
        {
          "id": "f2",
          "latex": "1 < x < a (a > 1)",
          "translation": "a 大于 1 时：1 小于 x 小于 a，取两根之间"
        },
        {
          "id": "f3",
          "latex": "a < x < 1 (a < 1)",
          "translation": "a 小于 1 时：a 小于 x 小于 1；a=1 时 (x−1)²<0 无解"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "a",
            "min": -1,
            "max": 3,
            "step": 0.5,
            "initial": 2
          },
          "views": [
            {
              "kind": "readout",
              "expr": "a",
              "label": "a"
            },
            {
              "kind": "readout",
              "expr": "a - 1",
              "label": "a−1"
            },
            {
              "kind": "point",
              "xExpr": "a",
              "yExpr": "0"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "含参二次不等式：先看开口，再看两根大小，a>1、=1、<1 分三种。",
        "拖动 a 穿过 1：两根左右关系变了，解集跟着变；a=1 时无解。"
      ],
      "examples": [
        {
          "text": "a−1 的符号告诉你：a 在 1 的左边还是右边",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch05-u2-l1-p2b",
      "next": "ch05-u2-l2-p1b"
    },
    {
      "id": "ch05-u2-l2-p1b",
      "title": "含参讨论：按大小分类",
      "concept": "讲解：含参数的二次不等式",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x - 2)(x - a) > 0",
          "translation": "两根 2 和 a；>0 取两边"
        },
        {
          "id": "f2",
          "latex": "a > 2: x < 2 \\text{ 或 } x > a",
          "translation": "a>2 时：小的在左，解 x<2 或 x>a"
        },
        {
          "id": "f3",
          "latex": "a < 2: x < a \\text{ 或 } x > 2",
          "translation": "a<2 时反过来；a=2 时 (x−2)²>0 得 x≠2"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "initial": 3,
            "label": "a",
            "max": 4,
            "min": 0,
            "step": 0.5
          },
          "mode": "param-sweep",
          "sets": [
            {
              "expr": "(x-2)*(x-a)",
              "ineq": ">",
              "label": "(x−2)(x−a)>0"
            }
          ],
          "showProbe": true,
          "xAxis": {
            "min": -1,
            "max": 7
          },
          "note": "a>2：x<2 或 x>a；a=2：x≠2；a<2：x<a 或 x>2"
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "param-sweep",
            "sets": [
              {
                "expr": "(x-2)*(x-a)",
                "ineq": ">",
                "label": "(x−2)(x−a)>0"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "分类标准：两根谁大谁小——a>2、a=2、a<2 三种。",
        "a=2 最容易漏：(x−2)²>0 的解是 x≠2，不是无解！"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(x−1)(x−a)<0（a>1）：取中间，1<x<a。"
        }
      ],
      "prev": "ch05-u2-l2-p1",
      "next": "ch05-u2-l3-p1"
    }
  ]
};
