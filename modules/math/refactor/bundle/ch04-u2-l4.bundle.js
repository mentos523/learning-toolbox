window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-u2-l4"] = {
  "lessonId": "ch04-u2-l4",
  "lessonTitle": "本章小结",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-u2-l4-p1",
      "title": "一图流：从配方到公式",
      "concept": "本章知识串联",
      "formulas": [
        {
          "id": "f1",
          "latex": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          "translation": "求根公式：配方法的终极形态"
        },
        {
          "id": "f2",
          "latex": "x_1 + x_2 = -\\frac{b}{a}, x_1 x_2 = \\frac{c}{a}",
          "translation": "韦达定理：两根的和与积藏在系数里"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -3,
          "max": 3,
          "step": 1,
          "label": "x",
          "expr": "x^2 - 4",
          "target": 0,
          "targetLabel": "等于 0",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": 0,
            "c": -4
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": 0,
            "c": -4
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "路线：几何补正方形（配方）→ 公式法（能分解先用因式分解法）→ Δ 看个数 → 韦达看关系。",
        "三种解法按顺序试：能分解用因式分解法，否则配方，万能钥匙是公式法。",
        "方程的实数解 = 抛物线与横轴交点的横坐标——代数与几何在这里会合。"
      ],
      "examples": [
        {
          "text": "x²−4=0：三种解法都能解，拖滑块看 x=±2",
          "figure": "滑块"
        }
      ],
      "prev": "ch04-u2-l3-p1b",
      "next": "ch04-ux-l1-p1"
    }
  ]
};
