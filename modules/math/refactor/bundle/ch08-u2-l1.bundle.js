window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u2-l1"] = {
  "lessonId": "ch08-u2-l1",
  "lessonTitle": "指数函数",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u2-l1-p1",
      "title": "指数函数：y=aˣ（a>0 且 a≠1）",
      "concept": "指数函数的定义（底数条件）",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = a^x (a > 0, a \\neq 1)",
          "translation": "y 等于 a 的 x 次方（a 大于 0 且 a 不为 1）：指数函数的定义"
        },
        {
          "id": "f2",
          "latex": "y = 2^x, y = (\\frac{1}{2})^x",
          "translation": "a=2 是爆炸增长，a=1/2 是指数衰减：底数 a 决定曲线的性格"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0.5,
          "max": 3,
          "step": 0.5,
          "label": "a",
          "expr": "a^2",
          "target": 4,
          "targetLabel": "a=2 时 y=4",
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
        "拖 a：x=2 时，a=2 得 y=4，a=0.5 得 y=0.25。",
        "a=1 退化为常数函数；a≤0 会出麻烦，故 a>0 且 a≠1。"
      ],
      "examples": [
        {
          "text": "a=2 爆炸增长，a=1/2 指数衰减：底数决定性格",
          "figure": "滑块"
        }
      ],
      "prev": "ch08-u1-l3-p1b",
      "next": "ch08-u2-l1-p1b"
    },
    {
      "id": "ch08-u2-l1-p1b",
      "title": "指数函数：底数定性格",
      "concept": "讲解：指数函数的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 3^x",
          "translation": "a=3>1：爆炸增长，x=5 时 y=243"
        },
        {
          "id": "f2",
          "latex": "y = (\\frac{1}{3})^x",
          "translation": "a=1/3<1：指数衰减，x=5 时 y=1/243"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0.5,
          "max": 3,
          "step": 0.5,
          "label": "a",
          "expr": "a^2",
          "target": 4,
          "targetLabel": "a=2 时 y=4",
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
        "a>1 增长，0<a<1 衰减：底数 a 决定曲线的性格。",
        "a=1 时 y≡1（常数函数）；a≤0 会出麻烦，所以 a>0 且 a≠1。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "细菌翻倍 y=2ˣ；药物代谢 y=(1/2)ˣ。"
        }
      ],
      "prev": "ch08-u2-l1-p1",
      "next": "ch08-u2-l2-p1"
    }
  ]
};
