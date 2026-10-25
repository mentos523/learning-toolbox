window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-u3-l2"] = {
  "lessonId": "ch02-u3-l2",
  "lessonTitle": "提公因式法",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-u3-l2-p1",
      "title": "3x²+6x：先把 3x 提出来",
      "concept": "提公因式法",
      "formulas": [
        {
          "id": "f1",
          "latex": "3x^2 + 6x = 3x(x + 2)",
          "translation": "3x 平方加 6x 等于 3x 乘 x 加 2"
        },
        {
          "id": "f2",
          "latex": "4x + 8 = 4(x + 2)",
          "translation": "4x 加 8 等于 4 乘 x 加 2"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "3*x^2 + 6*x"
        }
      },
      "auxInteraction": null,
      "hints": [
        "3x² 和 6x 都有因数 3x：这就是公因式。",
        "提出来：3x²+6x = 3x(x+2)，像从矩形里抽出一条公共边。"
      ],
      "examples": [
        {
          "text": "找公因式：取各项系数的最大公约数、各项都含有的字母的最低次幂",
          "figure": "滑块"
        }
      ],
      "prev": "ch02-u3-l1-p1b",
      "next": "ch02-u3-l2-p1b"
    },
    {
      "id": "ch02-u3-l2-p1b",
      "title": "提公因式：先找后提",
      "concept": "讲解：提公因式法",
      "formulas": [
        {
          "id": "f1",
          "latex": "6x^3 + 9x^2",
          "translation": "系数最大公约数是 3，字母最低次是 x²：公因式 3x²"
        },
        {
          "id": "f2",
          "latex": "3x^2(2x + 3)",
          "translation": "提出 3x²：6x³÷3x²=2x，9x²÷3x²=3"
        },
        {
          "id": "f3",
          "latex": "3x^2(2x + 3) = 6x^3 + 9x^2",
          "translation": "乘回去能还原：提对了，也提干净了"
        }
      ],
      "interaction": {
        "params": {
          "expr": "6*x^3 + 9*x^2",
          "label": "x",
          "max": 10,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "找公因式两步：系数取最大公约数，字母取最低次幂。",
        "提完必检验：公因式乘回括号，还原才算提干净。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "8a³b²+12a²b=4a²b(2ab+3)：系数最大公约数 4，字母最低次 a²b。"
        }
      ],
      "prev": "ch02-u3-l2-p1",
      "next": "ch02-u3-l3-p1"
    }
  ]
};
