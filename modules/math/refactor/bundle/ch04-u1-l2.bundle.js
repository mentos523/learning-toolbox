window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-u1-l2"] = {
  "lessonId": "ch04-u1-l2",
  "lessonTitle": "配方法",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-u1-l2-p1",
      "title": "缺角的正方形，补一块就完整",
      "concept": "配方的几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 + 6x = (x+3)^2 - 9",
          "translation": "x 平方加 6x 等于 x 加 3 的平方减 9：配方前后是同一个数"
        }
      ],
      "interaction": {
        "type": "complete-square-lab",
        "params": {
          "min": 0,
          "max": 6,
          "step": 1,
          "label": "x",
          "initial": 2,
          "half": 3,
          "exprLeft": "x^2 + 6*x",
          "exprRight": "(x+3)^2 - 9",
          "labels": [
            "配方前：缺角的正方形",
            "配方后：完整正方形减去小块"
          ]
        },
        "engine": {
          "primitive": "CompleteSquareLab",
          "version": "2026.10.16.A",
          "params": {
            "half": 3
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "x² 是正方形，6x 是两条长条，拼起来缺一个 3×3 的角；补上 9 得 (x+3)²。",
        "所以 x²+6x = (x+3)² − 9：两边滑块同步，值永远相等。"
      ],
      "examples": [
        {
          "text": "拼图：x²+6x 缺的角，正好是 3×3",
          "figure": "并排对比"
        }
      ],
      "prev": "ch04-u1-l1-p1b",
      "next": "ch04-u1-l2-p1b"
    },
    {
      "id": "ch04-u1-l2-p1b",
      "title": "配方几何：缺角补角",
      "concept": "讲解：配方的几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 + 8x",
          "translation": "x² 是正方形，8x 折成两条 4x 长条：缺一个 4×4 的角"
        },
        {
          "id": "f2",
          "latex": "x^2 + 8x + 16 = (x + 4)^2",
          "translation": "补上 16：拼成边长 (x+4) 的完整正方形"
        },
        {
          "id": "f3",
          "latex": "x^2 + 8x = (x + 4)^2 - 16",
          "translation": "等式两边相等：补的 16 要减回去"
        }
      ],
      "interaction": {
        "params": {
          "initial": 4,
          "label": "x",
          "max": 8,
          "min": 1,
          "showGrid": true,
          "step": 1
        },
        "type": "shape-area"
      },
      "auxInteraction": null,
      "hints": [
        "配方口诀：一次项系数的一半——8 的一半是 4，补 4²=16。",
        "为什么是一半？8x 要折成两条相等的长条，每条 4x。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x²−6x：补 (−3)²=9，得 (x−3)²−9。"
        }
      ],
      "prev": "ch04-u1-l2-p1",
      "next": "ch04-u1-l2-p1g"
    },
    {
      "id": "ch04-u1-l2-p1g",
      "title": "配方：(x+3)² 比 x² 大多少",
      "concept": "图形：配方前后面积对比",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x + 3)^2 = x^2 + 6x + 9",
          "translation": "大正方形 = x² + 两条 3x 长条 + 角上 9"
        },
        {
          "id": "f2",
          "latex": "x^2 + 6x = (x + 3)^2 - 9",
          "translation": "反过来：x²+6x 就是大正方形挖掉角上的 9"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "x²",
            "(x+3)²：多了两条 3x 和一个 9"
          ],
          "left": {
            "kind": "shape-area",
            "params": {
              "initial": 4,
              "label": "x",
              "max": 8,
              "min": 1,
              "showGrid": true,
              "step": 1
            }
          },
          "right": {
            "kind": "shape-area",
            "params": {
              "initial": 7,
              "label": "x+3",
              "max": 10,
              "min": 4,
              "showGrid": true,
              "step": 1
            }
          }
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "左图 x²，右图 (x+3)²：多的两条长条就是 6x，角上那块是 9。",
        "配方=把 6x 折成两条 3x 贴在 x² 两边，再补上 3×3 的角。"
      ],
      "examples": [
        {
          "figure": "数形结合",
          "text": "x²+10x：折成两条 5x，补 25，得 (x+5)²−25。"
        }
      ],
      "prev": "ch04-u1-l2-p1b",
      "next": "ch04-u1-l2-p2"
    },
    {
      "id": "ch04-u1-l2-p2",
      "title": "配方：把二次降成一次",
      "concept": "配方法的代数步骤",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 + 6x + 5 = 0",
          "translation": "x 平方加 6x 加 5 等于 0：待解的方程"
        },
        {
          "id": "f2",
          "latex": "(x+3)^2 = 4",
          "translation": "x 加 3 的平方等于 4：配方后只剩一个平方"
        },
        {
          "id": "f3",
          "latex": "x + 3 = \\pm 2",
          "translation": "x 加 3 等于正负 2：开平方，一次方程出现了"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -8,
          "max": 2,
          "step": 1,
          "label": "x",
          "expr": "(x+3)^2",
          "target": 4,
          "targetLabel": "右边 = 4",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": 6,
            "c": 9
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": 6,
            "c": 9
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "配方口诀：一次项系数一半的平方——x²+6x+5=0 化成 (x+3)²=4。",
        "开平方得 x+3=±2——二次方程变成了两个一次方程，解得 x=−1 或 −5。",
        "拖动验证：x=−1 和 x=−5 时，(x+3)² 都等于 4。"
      ],
      "examples": [
        {
          "text": "配方三步：移常数、两边加一半的平方、开平方",
          "figure": "滑块"
        }
      ],
      "prev": "ch04-u1-l2-p1g",
      "next": "ch04-u1-l2-p2b"
    },
    {
      "id": "ch04-u1-l2-p2b",
      "title": "配方解方程：完整三步",
      "concept": "讲解：配方法的代数步骤",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 - 4x - 5 = 0",
          "translation": "第一步：移常数项，得 x²−4x=5"
        },
        {
          "id": "f2",
          "latex": "(x - 2)^2 = 9",
          "translation": "第二步：两边加 (−2)²=4，得 (x−2)²=9"
        },
        {
          "id": "f3",
          "latex": "x - 2 = \\pm 3",
          "translation": "第三步：开平方 x−2=±3，得 x=5 或 x=−1；代回验算"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -3,
          "max": 7,
          "step": 1,
          "label": "x",
          "expr": "(x-2)^2",
          "target": 9,
          "targetLabel": "右边 = 9",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": -4,
            "c": 4
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": -4,
            "c": 4
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "配方三步：移常数；两边加一半的平方；开平方。",
        "开平方别丢负根：(x−2)²=9 有两个解，x=5 和 x=−1。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x²+2x−3=0：移常数得 x²+2x=3，加 1 得 (x+1)²=4，x=1 或 x=−3。"
        }
      ],
      "prev": "ch04-u1-l2-p2",
      "next": "ch04-u1-l3-p1"
    }
  ]
};
