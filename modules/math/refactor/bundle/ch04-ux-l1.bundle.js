window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-ux-l1"] = {
  "lessonId": "ch04-ux-l1",
  "lessonTitle": "第四章习题",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-ux-l1-p1",
      "title": "第四章习题：一元二次方程",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 - 5x + 6 = 0",
          "translation": "第 1 题：(x−2)(x−3)=0，乘积为零逐个击破"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 5,
          "step": 0.5,
          "label": "x",
          "expr": "x^2 - 5*x + 6",
          "target": 0,
          "targetLabel": "等于 0 的点（第 1 题）",
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
        "1．方程 x²−5x+6=0 的两根是____、____。",
        "2．方程 2x²+3x+2=0 的 Δ=____，有____个实数根。",
        "3．配方：x²+6x+____=(x+____)²。",
        "4．用公式法解：x²−4x+3=0。",
        "5．x²−5x+6=0 的两根 x₁、x₂：x₁+x₂=____，x₁x₂=____。",
        "6．长方形长比宽多 4 米，面积 45 平方米，宽是几米？"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：1．2，3；2．−7，0 个；3．9，3；4．x=1 或 x=3；5．5，6；6．5 米（列 x²+4x−45=0，舍去 −9）"
        },
        {
          "figure": "错因解析",
          "text": "1．x²−5x+6=(x−2)(x−3)：和 5、积 6 的两数是 2、3。2．Δ=3²−4×2×2=9−16=−7<0：没有实数根。3．x²+6x+9=(x+3)²：配的数=(6/2)²=9。4．Δ=16−12=4，x=(4±2)/2：x=1 或 x=3。5．韦达定理：x₁+x₂=−b/a=5，x₁x₂=c/a=6。6．设宽 x：x(x+4)=45，(x+9)(x−5)=0，x=5（−9 舍去，宽度不能为负）。"
        }
      ],
      "prev": "ch04-u2-l4-p1",
      "next": null
    }
  ]
};
