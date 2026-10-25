window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch03-u1-l2"] = {
  "lessonId": "ch03-u1-l2",
  "lessonTitle": "分式的基本性质",
  "chapterId": "ch03",
  "pages": [
    {
      "id": "ch03-u1-l2-p1",
      "title": "分子分母同乘除，值不变",
      "concept": "分式的基本性质",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{4x}{2x} = 2",
          "translation": "4x 除以 2x 等于 2：分子分母同除以 2x，这叫约分"
        },
        {
          "id": "f2",
          "latex": "\\frac{1}{2} = \\frac{x}{2x}",
          "translation": "二分之一等于 x 除以 2x：分子分母同乘 x（分式基本性质的用法）"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "(4*x)/(2*x)"
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖动滑块：x 怎么变，值恒为 2——分子分母里的 x 被约掉了。",
        "约分是同除以公因式，通分是同乘一个整式；乘除的整式不能为零。"
      ],
      "examples": [
        {
          "text": "分数约分 6/8=3/4 的翻版",
          "figure": "滑块"
        }
      ],
      "prev": "ch03-u1-l1-p2b",
      "next": "ch03-u1-l2-p1b"
    },
    {
      "id": "ch03-u1-l2-p1b",
      "title": "约分：分子分母同除",
      "concept": "讲解：约分",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{6x^2}{3x}",
          "translation": "分子 6x²，分母 3x：找公因式"
        },
        {
          "id": "f2",
          "latex": "\\frac{6x^2}{3x} = 2x",
          "translation": "同除以公因式 3x：6÷3=2，x²÷x=x"
        },
        {
          "id": "f3",
          "latex": "\\frac{x + 2}{2}",
          "translation": "反例：x+2 和 2 没有公因式，约不动——加减号隔开不能约"
        }
      ],
      "interaction": {
        "params": {
          "expr": "(6*x^2)/(3*x)",
          "label": "x",
          "max": 10,
          "min": 1,
          "step": 1
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "约分=分子分母同除以公因式；约到不能再约叫最简分式。",
        "大忌：(x+2)/2 约成 x——加号隔开的不是因式，不能约！"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(a²−b²)/(a+b)=a−b：先把分子分解成 (a+b)(a−b)，再约。"
        }
      ],
      "prev": "ch03-u1-l2-p1",
      "next": "ch03-u2-l1-p1"
    }
  ]
};
