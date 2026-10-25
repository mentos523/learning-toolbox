window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-u1-l2"] = {
  "lessonId": "ch10-u1-l2",
  "lessonTitle": "ε-N 语言（直观版）",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-u1-l2-p1",
      "title": "ε-N（直观版）：带子套点",
      "concept": "ε-N 直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "|a_n - 0| < \\epsilon (n > N)",
          "translation": "带子说法：从第 N 项起，所有点都落进半宽 ε 的带子"
        },
        {
          "id": "f2",
          "latex": "N = \\frac{1}{\\epsilon}",
          "translation": "对 a_n=1/n：取 N=1/ε 就够了——带子越窄，N 越大"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "e",
            "min": 0.05,
            "max": 0.5,
            "step": 0.05,
            "initial": 0.2
          },
          "views": [
            {
              "kind": "readout",
              "expr": "1/e",
              "label": "N≈1/ε"
            },
            {
              "kind": "point",
              "xExpr": "1/e",
              "yExpr": "e",
              "axisLabelX": "N",
              "axisLabelY": "ε"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖滑块 e（就是 ε）：带子收窄，N=1/ε 变大。",
        "右图：ε 越小 N 越大——窄带子要更大的序号来套住。"
      ],
      "examples": [
        {
          "text": "a_n=1/n：点越往后离 0 越近，窄带子要等更靠后的项",
          "figure": "联动仪表盘"
        }
      ],
      "prev": "ch10-u1-l1-p1b",
      "next": "ch10-u1-l2-p1b"
    },
    {
      "id": "ch10-u1-l2-p1b",
      "title": "ε-N：带子套点的游戏",
      "concept": "讲解：ε-N 直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\epsilon = 0.1",
          "translation": "带子半宽 0.1：(−0.1, 0.1)"
        },
        {
          "id": "f2",
          "latex": "N = 10",
          "translation": "n>10 时，1/n<0.1：全落进带子"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 0.2,
            "label": "e",
            "max": 0.5,
            "min": 0.05,
            "step": 0.05
          },
          "views": [
            {
              "expr": "1/e",
              "kind": "readout",
              "label": "N≈1/ε"
            },
            {
              "axisLabelX": "N",
              "axisLabelY": "ε",
              "kind": "point",
              "xExpr": "1/e",
              "yExpr": "e"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "ε 是带子宽度（你定），N 是序号门槛（我找）：带子越窄，N 越大。",
        "极限的承诺：无论带子多窄，总找得到 N 套住后面的所有点。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "aₙ=1/n²：ε=0.01 时 N=10（1/100<0.01）。"
        }
      ],
      "prev": "ch10-u1-l2-p1",
      "next": "ch10-u1-l3-p1"
    }
  ]
};
