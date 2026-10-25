window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch03-u2-l1"] = {
  "lessonId": "ch03-u2-l1",
  "lessonTitle": "分式的乘除",
  "chapterId": "ch03",
  "pages": [
    {
      "id": "ch03-u2-l1-p1",
      "title": "先约分，再相乘",
      "concept": "分式的乘除法",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{2}{x} \\cdot \\frac{x}{4} = \\frac{1}{2}",
          "translation": "x 分之 2 乘 4 分之 x 等于二分之一：x 先约掉"
        },
        {
          "id": "f2",
          "latex": "\\frac{a}{b} \\div \\frac{c}{d} = \\frac{a}{b} \\cdot \\frac{d}{c}",
          "translation": "除以一个分式，等于乘它的倒数（其中 b、c、d 都不为零）"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "(2/x)*(x/4)"
        }
      },
      "auxInteraction": null,
      "hints": [
        "乘法：分子乘分子、分母乘分母；能约分的先约分，数字会小很多。",
        "除法没有新规则：除以 c/d 就是乘 d/c，然后按乘法做。"
      ],
      "examples": [
        {
          "text": "2/x × x/4：x 约掉，直接得 1/2",
          "figure": "滑块"
        }
      ],
      "prev": "ch03-u1-l2-p1b",
      "next": "ch03-u2-l1-p1b"
    },
    {
      "id": "ch03-u2-l1-p1b",
      "title": "乘除：先约分再相乘",
      "concept": "讲解：分式的乘除法",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{3x}{4} \\cdot \\frac{8}{9x}",
          "translation": "先别急着乘：找能约的——3x 与 9x，4 与 8"
        },
        {
          "id": "f2",
          "latex": "\\frac{3x}{4} \\cdot \\frac{8}{9x} = \\frac{2}{3}",
          "translation": "约分：3x 与 9x 约成 1 和 3，4 与 8 约成 1 和 2，得 2/3"
        },
        {
          "id": "f3",
          "latex": "\\frac{x}{2} \\div \\frac{3}{x} = \\frac{x^2}{6}",
          "translation": "除变乘：x/2 乘 x/3，等于 x²/6"
        }
      ],
      "interaction": {
        "params": {
          "expr": "(3*x/4)*(8/(9*x))",
          "label": "x",
          "max": 10,
          "min": 1,
          "step": 1
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "乘法口诀：先约分再相乘——数字越小越不容易错。",
        "除法只有一步：除以一个分式=乘它的倒数，然后按乘法做。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(2a/b)÷(4/a)：倒数是 a/4，(2a/b)·(a/4)=a²/(2b)。"
        }
      ],
      "prev": "ch03-u2-l1-p1",
      "next": "ch03-u2-l2-p1"
    }
  ]
};
