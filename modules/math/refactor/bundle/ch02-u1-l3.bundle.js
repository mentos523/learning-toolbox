window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-u1-l3"] = {
  "lessonId": "ch02-u1-l3",
  "lessonTitle": "幂的运算",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-u1-l3-p1",
      "title": "同底数幂相乘：指数相加",
      "concept": "同底数幂的乘法",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^m \\cdot x^n = x^{m+n}",
          "translation": "x 的 m 次方乘 x 的 n 次方，等于 x 的 m 加 n 次方"
        },
        {
          "id": "f2",
          "latex": "2^3 \\cdot 2^4 = 2^7",
          "translation": "2 的 3 次方乘 2 的 4 次方等于 2 的 7 次方"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 5,
          "step": 0.5,
          "label": "x",
          "expr": "x^2 * x^3"
        }
      },
      "auxInteraction": null,
      "hints": [
        "x² 是 2 个 x 相乘，x³ 是 3 个 x 相乘，合在一起是 5 个 x 相乘。",
        "所以 x²·x³ = x⁵：底数不变，指数相加。"
      ],
      "examples": [
        {
          "text": "2 个 x 盒子乘 3 个 x 盒子，是 5 个 x 盒子",
          "figure": "滑块"
        }
      ],
      "prev": "ch02-u1-l2-p1b",
      "next": "ch02-u1-l3-p1b"
    },
    {
      "id": "ch02-u1-l3-p1b",
      "title": "同底数幂：指数相加",
      "concept": "讲解：同底数幂的乘法",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^3 \\cdot a^5",
          "translation": "3 个 a 相乘，再乘 5 个 a：一共 8 个 a 相乘"
        },
        {
          "id": "f2",
          "latex": "a^3 \\cdot a^5 = a^8",
          "translation": "底数不变，指数相加：3+5=8"
        },
        {
          "id": "f3",
          "latex": "x^2 \\cdot y^3",
          "translation": "底数不同（x 和 y）：公式用不上，原样放着"
        }
      ],
      "interaction": {
        "params": {
          "expr": "x^2 * x^3",
          "label": "x",
          "max": 5,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "同底数幂相乘：底数不变，指数相加——前提是底数相同。",
        "易错：x²·x³=x⁵ 不是 x⁶；2³·3² 底数不同不能合并。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(−2)⁴·(−2)³=(−2)⁷：底数 −2 相同，指数 4+3=7。"
        }
      ],
      "prev": "ch02-u1-l3-p1",
      "next": "ch02-u1-l3-p2"
    },
    {
      "id": "ch02-u1-l3-p2",
      "title": "乘方再乘方：指数相乘",
      "concept": "幂的乘方与积的乘方",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x^2)^3 = x^6",
          "translation": "x 平方的 3 次方等于 x 的 6 次方"
        },
        {
          "id": "f2",
          "latex": "(2x)^3 = 8x^3",
          "translation": "2x 的 3 次方等于 8 乘 x 的 3 次方"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 5,
          "step": 0.5,
          "label": "x",
          "expr": "(x^2)^3"
        }
      },
      "auxInteraction": null,
      "hints": [
        "(x²)³ 就是 3 个 x² 相乘：指数 2+2+2 = 6，所以是 x⁶。",
        "(2x)³ = 2³·x³ = 8x³：括号里每个因数都要乘方。"
      ],
      "examples": [
        {
          "text": "(x²)³ 展开就是 x²·x²·x²",
          "figure": "滑块"
        }
      ],
      "prev": "ch02-u1-l3-p1b",
      "next": "ch02-u1-l3-p2b"
    },
    {
      "id": "ch02-u1-l3-p2b",
      "title": "乘方套乘方：指数相乘",
      "concept": "讲解：幂的乘方与积的乘方",
      "formulas": [
        {
          "id": "f1",
          "latex": "(y^4)^2",
          "translation": "2 个 y⁴ 相乘：指数 4+4"
        },
        {
          "id": "f2",
          "latex": "(y^4)^2 = y^8",
          "translation": "乘方再乘方：指数相乘，4×2=8"
        },
        {
          "id": "f3",
          "latex": "(3x^2)^3 = 27x^6",
          "translation": "积的乘方：每个因数都乘方，3³=27，(x²)³=x⁶"
        }
      ],
      "interaction": {
        "params": {
          "expr": "(x^2)^3",
          "label": "x",
          "max": 5,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "口诀：乘方套乘方，指数要相乘；积的乘方，括号里每个因数都不能跑。",
        "对比：(x²)³=x⁶ 是相乘，x²·x³=x⁵ 是相加——别串台。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "[(−2)³]²=(−2)⁶=64：指数 3×2=6。"
        }
      ],
      "prev": "ch02-u1-l3-p2",
      "next": "ch02-u1-l3-p2g"
    },
    {
      "id": "ch02-u1-l3-p2g",
      "title": "x²：边长为 x 的正方形",
      "concept": "图形：x² 的几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2",
          "translation": "x 的平方：x 乘 x"
        },
        {
          "id": "f2",
          "latex": "3^2 = 9",
          "translation": "边长 3 的正方形：数格子，横 3 竖 3，一共 9 格"
        }
      ],
      "interaction": {
        "params": {
          "initial": 3,
          "label": "x",
          "max": 8,
          "min": 1,
          "showGrid": true,
          "step": 1
        },
        "type": "shape-area"
      },
      "auxInteraction": null,
      "hints": [
        "拖动手柄：边长变，面积实时变——x² 就是边长为 x 的正方形的面积。",
        "整数边长时数格子：边长 3 有 9 格，3²=9，眼见为实。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "地砖是边长 2 的正方形，一块面积 2²=4；4 块拼成大正方形，面积 4²=16。"
        }
      ],
      "prev": "ch02-u1-l3-p2b",
      "next": "ch02-u2-l1-p1"
    }
  ]
};
