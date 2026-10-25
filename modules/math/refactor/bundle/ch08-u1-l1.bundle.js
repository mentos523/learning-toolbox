window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u1-l1"] = {
  "lessonId": "ch08-u1-l1",
  "lessonTitle": "整数指数幂",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u1-l1-p1",
      "title": "幂的倒退：2⁻³=1/8",
      "concept": "负整数指数幂是倒数",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^{-n} = \\frac{1}{a^n} (a \\neq 0)",
          "translation": "a 的 −n 次方等于 1 除以 a 的 n 次方（a 不为 0）：负指数就是取倒数"
        },
        {
          "id": "f2",
          "latex": "2^{-3} = \\frac{1}{2^3} = \\frac{1}{8}",
          "translation": "2 的 −3 次方等于 1 除以 2 的 3 次方，等于 1/8：指数倒退三格，值连除三个 2"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -3,
          "max": 3,
          "step": 1,
          "label": "n",
          "expr": "2^n",
          "target": 0.125,
          "targetLabel": "2⁻³=1/8",
          "graph": {
            "kind": "exp"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "exp"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "指数每减 1，值就除以 2：8→4→2→1→1/2→1/4→1/8。",
        "2⁰=1 是转折点：零指数规定为 1，除法规律才能一路畅通。"
      ],
      "examples": [
        {
          "text": "数轴上的倒退：2³→2²→2¹→2⁰→2⁻¹→2⁻²→2⁻³",
          "figure": "滑块"
        }
      ],
      "prev": "ch07-u2-l3-p1",
      "next": "ch08-u1-l1-p1b"
    },
    {
      "id": "ch08-u1-l1-p1b",
      "title": "负指数：倒着数",
      "concept": "讲解：负整数指数幂",
      "formulas": [
        {
          "id": "f1",
          "latex": "3^{-2}",
          "translation": "3 的 −2 次方：指数倒退 2 格"
        },
        {
          "id": "f2",
          "latex": "3^{-2} = \\frac{1}{3^2} = \\frac{1}{9}",
          "translation": "等于 1 除以 3²，即 1/9"
        },
        {
          "id": "f3",
          "latex": "2^{-1} = \\frac{1}{2}",
          "translation": "2 的 −1 次方 = 1/2"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -3,
          "max": 3,
          "step": 1,
          "label": "n",
          "expr": "2^n",
          "target": 0.125,
          "targetLabel": "2⁻³=1/8",
          "graph": {
            "kind": "exp"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "exp"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "负指数=取倒数：a⁻ⁿ=1/aⁿ（a≠0）。",
        "2⁰=1 是分界：指数向右+1 是乘 2，向左−1 是除以 2。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(1/2)⁻²=4：负指数先取倒数，(1/2)⁻²=2²=4。"
        }
      ],
      "prev": "ch08-u1-l1-p1",
      "next": "ch08-u1-l2-p1"
    }
  ]
};
