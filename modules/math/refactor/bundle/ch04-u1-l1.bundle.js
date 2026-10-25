window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-u1-l1"] = {
  "lessonId": "ch04-u1-l1",
  "lessonTitle": "一元二次方程的概念",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-u1-l1-p1",
      "title": "只含一个未知数，最高两次方",
      "concept": "一元二次方程的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "ax^2 + bx + c = 0",
          "translation": "a x 平方加 b x 加 c 等于 0：标准形式"
        },
        {
          "id": "f2",
          "latex": "a \\neq 0",
          "translation": "a 不等于 0：如果 a 是 0，二次项就没了"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -2,
          "max": 4,
          "step": 1,
          "label": "x",
          "expr": "x^2 - 3*x + 2",
          "target": 0,
          "targetLabel": "等于 0 的点",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": -3,
            "c": 2
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": -3,
            "c": 2
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "一般地，只含一个未知数、未知数最高次数是 2 的整式方程，叫做一元二次方程。",
        "拖动 x：方程等于 0 时 x=1 和 x=2——它们就是方程的解；图上是抛物线与横轴的两个交点。"
      ],
      "examples": [
        {
          "text": "x²=4、x²-3x+2=0 都是；x²+y=1 不是（一元才行）",
          "figure": "滑块"
        }
      ],
      "prev": "ch04-u0-l1-p2b",
      "next": "ch04-u1-l1-p1b"
    },
    {
      "id": "ch04-u1-l1-p1b",
      "title": "一元二次方程：三要素",
      "concept": "讲解：一元二次方程的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x^2 - 3x + 1 = 0",
          "translation": "一元（一个未知数）、二次（最高 2 次）、方程（等式）：三条全中"
        },
        {
          "id": "f2",
          "latex": "x^2 = 4",
          "translation": "也是一元二次方程：a=1，b=0，c=−4"
        },
        {
          "id": "f3",
          "latex": "x + y = 1",
          "translation": "反例：两个未知数，不是一元；x³=8 是三次，也不是"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -1,
          "max": 3,
          "step": 0.5,
          "label": "x",
          "expr": "2*x^2 - 3*x + 1",
          "target": 0,
          "targetLabel": "等于 0 的点",
          "graph": {
            "kind": "parabola",
            "a": 2,
            "b": -3,
            "c": 1
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 2,
            "b": -3,
            "c": 1
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "判断三要素：一元（一个未知数）、二次（最高次数 2）、方程（是等式）。",
        "a≠0 是底线：a=0 时二次项消失，就退化成一次方程了。"
      ],
      "examples": [
        {
          "figure": "辨析",
          "text": "(m−1)x²+2x+3=0 是一元二次方程，则 m≠1（否则二次项消失）。"
        }
      ],
      "prev": "ch04-u1-l1-p1",
      "next": "ch04-u1-l2-p1"
    }
  ]
};
