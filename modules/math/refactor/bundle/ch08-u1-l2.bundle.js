window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u1-l2"] = {
  "lessonId": "ch08-u1-l2",
  "lessonTitle": "分数指数幂",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u1-l2-p1",
      "title": "分数指数：8 的 1/3 次方是 2",
      "concept": "分数指数幂就是开方",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^{\\frac{m}{n}} = \\sqrt[n]{a^m} (a > 0)",
          "translation": "a 的 m/n 次方等于 a 的 m 次方再开 n 次方（a 大于 0）：分数指数是开方的另一种写法"
        },
        {
          "id": "f2",
          "latex": "8^{\\frac{1}{3}} = \\sqrt[3]{8} = 2",
          "translation": "8 的 1/3 次方等于 8 开立方，等于 2：因为 2 的 3 次方是 8"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 1,
          "max": 4,
          "step": 1,
          "label": "n",
          "expr": "8^(1/n)",
          "target": 2,
          "targetLabel": "8 的 1/3 次方 = 2",
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
        "拖 n：n=3 时值恰为 2——2³=8，8 的 1/3 次方就是 2。",
        "分数指数就是开方的另一种写法：底数 a>0。"
      ],
      "examples": [
        {
          "text": "√9=9^(1/2)=3：根号是分数指数的“旧衣服”",
          "figure": "滑块"
        }
      ],
      "prev": "ch08-u1-l1-p1b",
      "next": "ch08-u1-l2-p1b"
    },
    {
      "id": "ch08-u1-l2-p1b",
      "title": "分数指数：分母管开方",
      "concept": "讲解：分数指数幂",
      "formulas": [
        {
          "id": "f1",
          "latex": "27^{\\frac{2}{3}}",
          "translation": "分子 2 是乘方，分母 3 是开立方"
        },
        {
          "id": "f2",
          "latex": "27^{\\frac{2}{3}} = 9",
          "translation": "先开方 (∛27)²=3²=9：先开方数字小，好算"
        },
        {
          "id": "f3",
          "latex": "16^{\\frac{3}{4}} = 8",
          "translation": "16 开 4 次方得 2，2³=8"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 1,
          "max": 4,
          "step": 1,
          "label": "n",
          "expr": "8^(1/n)",
          "target": 2,
          "targetLabel": "8 的 1/3 次方 = 2",
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
        "分数指数口诀：分母开方、分子乘方——a^(m/n)=ⁿ√(aᵐ)。",
        "先开方再乘方数字小：27^(2/3)=(∛27)²=9。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "4 的 3/2 次方=(√4)³=2³=8。"
        }
      ],
      "prev": "ch08-u1-l2-p1",
      "next": "ch08-u1-l3-p1"
    }
  ]
};
