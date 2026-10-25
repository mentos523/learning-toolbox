window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-u2-l2"] = {
  "lessonId": "ch04-u2-l2",
  "lessonTitle": "韦达定理",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-u2-l2-p1",
      "title": "两根的和与积，藏在系数里",
      "concept": "韦达定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "x_1 + x_2 = -\\frac{b}{a}",
          "translation": "两根之和等于负 a 分之 b"
        },
        {
          "id": "f2",
          "latex": "x_1 x_2 = \\frac{c}{a}",
          "translation": "两根之积等于 a 分之 c"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 6,
          "step": 1,
          "label": "x",
          "expr": "x^2 - 5*x + 6",
          "target": 0,
          "targetLabel": "等于 0 的点",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": -5,
            "c": 6
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": -5,
            "c": 6
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "对 ax²+bx+c=0（a≠0，Δ≥0）：两根 x₁、x₂ 的和是 −b/a，积是 c/a。",
        "验证老朋友 x²−5x+6=0：两根 2 和 3，和为 5，积为 6——不用解方程也知道。",
        "两根在数轴上关于 x=−b/2a 对称；已知一根可求另一根、判断根的符号。"
      ],
      "examples": [
        {
          "text": "两根在数轴上关于 −b/2a 对称",
          "figure": "滑块"
        }
      ],
      "prev": "ch04-u2-l1-p1b",
      "next": "ch04-u2-l2-p1b"
    },
    {
      "id": "ch04-u2-l2-p1b",
      "title": "韦达定理：不用解方程",
      "concept": "讲解：韦达定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 - 7x + 10 = 0",
          "translation": "a=1，b=−7，c=10，Δ=9>0"
        },
        {
          "id": "f2",
          "latex": "x_1 + x_2 = 7",
          "translation": "两根之和=−b/a=7"
        },
        {
          "id": "f3",
          "latex": "x_1 x_2 = 10",
          "translation": "两根之积=c/a=10：两根是 2 和 5（和 7 积 10）"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 7,
          "step": 1,
          "label": "x",
          "expr": "x^2 - 7*x + 10",
          "target": 0,
          "targetLabel": "等于 0 的点",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": -7,
            "c": 10
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": -7,
            "c": 10
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "韦达定理：和=−b/a，积=c/a——注意和有个负号。",
        "妙用：已知一根是 2，另一根=10÷2=5，不用再解方程。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x²−5x+6=0 的两根 2、3：和 5=−(−5)/1，积 6=6/1。"
        }
      ],
      "prev": "ch04-u2-l2-p1",
      "next": "ch04-u2-l3-p1"
    }
  ]
};
