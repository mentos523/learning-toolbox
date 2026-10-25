window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-u1-l1"] = {
  "lessonId": "ch02-u1-l1",
  "lessonTitle": "单项式与多项式",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-u1-l1-p1",
      "title": "单项式攒成多项式",
      "concept": "单项式与多项式",
      "formulas": [
        {
          "id": "f1",
          "latex": "3x^2",
          "translation": "3 乘 x 的平方：单项式，系数是 3，次数是 2"
        },
        {
          "id": "f2",
          "latex": "3x^2 - 2x + 5",
          "translation": "3x 平方减 2x 加 5：多项式，有 3 个项，次数是 2"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "3*x^2 - 2*x + 5"
        }
      },
      "auxInteraction": null,
      "hints": [
        "单项式 = 数与字母的积；单独的一个数或一个字母也是单项式（比如 5，次数是 0）；次数是所有字母指数的和。",
        "几个单项式相加就是多项式，多项式的次数看次数最高的那一项。"
      ],
      "examples": [
        {
          "text": "3x²−2x+5 的项：3x²、−2x、5；次数是 2",
          "figure": "滑块"
        }
      ],
      "prev": null,
      "next": "ch02-u1-l1-p1b"
    },
    {
      "id": "ch02-u1-l1-p1b",
      "title": "系数次数：先认再算",
      "concept": "讲解：单项式与多项式",
      "formulas": [
        {
          "id": "f1",
          "latex": "5x^3",
          "translation": "系数是 5，次数是 3：数字因数叫系数，x 的指数叫次数"
        },
        {
          "id": "f2",
          "latex": "2x^2 + 3x - 7",
          "translation": "三项：2x²、3x、−7；最高次数是 2，叫二次三项式"
        },
        {
          "id": "f3",
          "latex": "\\frac{2}{x}",
          "translation": "分母里有字母：不是单项式，更不是整式"
        }
      ],
      "interaction": {
        "params": {
          "expr": "2*x^2 + 3*x - 7",
          "label": "x",
          "max": 5,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "系数：单项式里的数字因数；次数：所有字母指数的和。",
        "辨同名：化学式或化学方程式前面的数也叫『系数』（化学计量数），表示分子等微粒的个数或其比例，与单项式中作为乘数因数的『系数』同名不同义，两科定义不可互换。",
        "易错：πx² 的系数是 π（π 是数不是字母）；2³x 的次数是 1。"
      ],
      "examples": [
        {
          "figure": "辨析",
          "text": "−3ab²：系数 −3，次数 3（a¹b²，1+2=3）。πx² 的系数是 π。"
        }
      ],
      "prev": "ch02-u1-l1-p1",
      "next": "ch02-u1-l2-p1"
    }
  ]
};
