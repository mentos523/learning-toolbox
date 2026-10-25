window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-u1-l3"] = {
  "lessonId": "ch04-u1-l3",
  "lessonTitle": "公式法",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-u1-l3-p1",
      "title": "万能钥匙：求根公式",
      "concept": "求根公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}",
          "translation": "x 等于负 b 加减根号 b 平方减 4ac，再除以 2a：对 ax²+bx+c=0 配方一次得到"
        },
        {
          "id": "f2",
          "latex": "\\Delta = b^2 - 4ac",
          "translation": "德尔塔等于 b 平方减 4ac：判别式，就是根号里的东西"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 5,
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
        "把 a=1、b=−5、c=6 代入公式：x=(5±1)/2，得 x=2 或 x=3。",
        "拖动验证：x=2 和 x=3 时方程都等于 0——公式算出的就是它们。",
        "适用范围：a≠0；Δ≥0 时才有实数解，Δ<0 时方程无实数解。"
      ],
      "examples": [
        {
          "text": "任何二次方程都能解：先算 Δ，再套公式",
          "figure": "滑块"
        }
      ],
      "prev": "ch04-u1-l2-p2b",
      "next": "ch04-u1-l3-p1b"
    },
    {
      "id": "ch04-u1-l3-p1b",
      "title": "求根公式：代入三步",
      "concept": "讲解：求根公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x^2 + 5x + 2 = 0",
          "translation": "第一步：认出 a=2，b=5，c=2"
        },
        {
          "id": "f2",
          "latex": "\\Delta = 25 - 16 = 9",
          "translation": "第二步：Δ=5²−4×2×2=9>0，有两个不等实根"
        },
        {
          "id": "f3",
          "latex": "x = \\frac{-5 \\pm 3}{4}",
          "translation": "第三步：代入公式，x=−0.5 或 x=−2；拖滑块验证"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -3,
          "max": 1,
          "step": 0.5,
          "label": "x",
          "expr": "2*x^2 + 5*x + 2",
          "target": 0,
          "targetLabel": "等于 0 的点",
          "graph": {
            "kind": "parabola",
            "a": 2,
            "b": 5,
            "c": 2
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 2,
            "b": 5,
            "c": 2
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "套公式三步：认 a/b/c；算 Δ；代入。",
        "符号是重灾区：b=5 时 −b=−5，先写负号再代入，别把 b 的符号弄丢。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x²−4x+4=0：Δ=16−16=0，x=2（两个相等的实根）。"
        }
      ],
      "prev": "ch04-u1-l3-p1",
      "next": "ch04-u1-l4-p1"
    }
  ]
};
