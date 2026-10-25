window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-u3-l4"] = {
  "lessonId": "ch02-u3-l4",
  "lessonTitle": "十字相乘法",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-u3-l4-p1",
      "title": "x²+5x+6：6 拆成 2×3",
      "concept": "十字相乘法",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 + 5x + 6 = (x + 2)(x + 3)",
          "translation": "x 平方加 5x 加 6 等于 x 加 2 乘 x 加 3"
        },
        {
          "id": "f2",
          "latex": "x^2 + (a + b)x + ab = (x + a)(x + b)",
          "translation": "一般形式：常数项拆成 a 乘 b，一次项系数凑成 a 加 b"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "x^2 + 5*x + 6"
        }
      },
      "auxInteraction": null,
      "hints": [
        "常数项 6 = 2×3，一次项系数 5 = 2+3。",
        "拆常数项、凑一次项：这就是十字相乘。",
        "注意：这里只拆首项系数为 1 的二次三项式（首项就是 x²）。"
      ],
      "examples": [
        {
          "text": "矩形面积的行列分解：长 (x+3)、宽 (x+2)",
          "figure": "滑块"
        }
      ],
      "prev": "ch02-u3-l3-p1b",
      "next": "ch02-u3-l4-p1b"
    },
    {
      "id": "ch02-u3-l4-p1b",
      "title": "十字相乘：拆常数凑系数",
      "concept": "讲解：十字相乘法",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 + 8x + 15",
          "translation": "首项 x²，常数 15，一次项系数 8"
        },
        {
          "id": "f2",
          "latex": "15 = 3 \\times 5",
          "translation": "拆常数项：15=3×5；凑一次项：3+5=8，对上了"
        },
        {
          "id": "f3",
          "latex": "(x + 3)(x + 5)",
          "translation": "写成积；展开检验：x²+8x+15，还原成功"
        }
      ],
      "interaction": {
        "params": {
          "expr": "x^2 + 8*x + 15",
          "label": "x",
          "max": 10,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "十字相乘两步：拆常数项（乘积=c），凑一次项（和=b）。",
        "符号口诀：c 为正，两因数同号（与 b 同）；c 为负，两因数异号。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x²−x−6=(x−3)(x+2)：−6=(−3)×2，−3+2=−1，对上一次项。"
        }
      ],
      "prev": "ch02-u3-l4-p1",
      "next": "ch02-u3-l5-p1"
    }
  ]
};
