window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-u3-l3"] = {
  "lessonId": "ch02-u3-l3",
  "lessonTitle": "公式法",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-u3-l3-p1",
      "title": "x²−9：平方差倒着用",
      "concept": "公式法",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 - 9 = (x + 3)(x - 3)",
          "translation": "x 平方减 9 等于 x 加 3 乘 x 减 3"
        },
        {
          "id": "f2",
          "latex": "4x^2 - 25 = (2x + 5)(2x - 5)",
          "translation": "4x 平方减 25 等于 2x 加 5 乘 2x 减 5"
        },
        {
          "id": "f3",
          "latex": "x^2 + 4x + 4 = (x + 2)^2",
          "translation": "x 平方加 4x 加 4 等于 x 加 2 的平方"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "x^2 - 9"
        }
      },
      "auxInteraction": null,
      "hints": [
        "看到\"平方减平方\"，就把平方差公式倒着用。",
        "先确认三件事：两项、都是平方、中间是减号。",
        "完全平方也能倒着用：三项、首尾是平方、中间是两倍积，如 x²+4x+4=(x+2)²。"
      ],
      "examples": [
        {
          "text": "几何拼图的逆过程：面积 x²−9，求矩形边长",
          "figure": "滑块"
        }
      ],
      "prev": "ch02-u3-l2-p1b",
      "next": "ch02-u3-l3-p1b"
    },
    {
      "id": "ch02-u3-l3-p1b",
      "title": "公式法：认出形状倒着用",
      "concept": "讲解：公式法分解因式",
      "formulas": [
        {
          "id": "f1",
          "latex": "9x^2 - 16",
          "translation": "两项、都是平方、中间减号：平方差倒着用"
        },
        {
          "id": "f2",
          "latex": "(3x + 4)(3x - 4)",
          "translation": "9x²=(3x)²，16=4²"
        },
        {
          "id": "f3",
          "latex": "x^2 - 10x + 25 = (x - 5)^2",
          "translation": "三项、首尾平方、中间 −2ab：完全平方倒着用"
        }
      ],
      "interaction": {
        "params": {
          "expr": "9*x^2 - 16",
          "label": "x",
          "max": 10,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "公式法=乘法公式倒着走：先认出是哪种公式的形状。",
        "顺序：先看能不能提公因式，再看公式——本题没有公因式可提。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "a⁴−1=(a²+1)(a²−1)=(a²+1)(a+1)(a−1)：一次分到底。"
        }
      ],
      "prev": "ch02-u3-l3-p1",
      "next": "ch02-u3-l4-p1"
    }
  ]
};
