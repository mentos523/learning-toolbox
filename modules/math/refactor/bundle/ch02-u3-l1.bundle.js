window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-u3-l1"] = {
  "lessonId": "ch02-u3-l1",
  "lessonTitle": "因式分解的概念",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-u3-l1-p1",
      "title": "乘法倒着走：和变回积",
      "concept": "因式分解",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x + 2)(x + 3) = x^2 + 5x + 6",
          "translation": "整式乘法：把积展开成和"
        },
        {
          "id": "f2",
          "latex": "x^2 + 5x + 6 = (x + 2)(x + 3)",
          "translation": "因式分解：把和写回成积"
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
        "整式乘法是\"乘开\"：(x+2)(x+3) 展开成 x²+5x+6。",
        "因式分解是倒着走：把和 x²+5x+6 写成积 (x+2)(x+3)。",
        "因式分解要一次分到底：每个因式都要分到不能再分为止。"
      ],
      "examples": [
        {
          "text": "已知矩形面积求边长：面积拼图的逆过程",
          "figure": "滑块"
        }
      ],
      "prev": "ch02-u2-l2-p1g",
      "next": "ch02-u3-l1-p1b"
    },
    {
      "id": "ch02-u3-l1-p1b",
      "title": "因式分解：和变回积",
      "concept": "讲解：因式分解的概念",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 + 7x + 12",
          "translation": "这是和的形式：三项相加"
        },
        {
          "id": "f2",
          "latex": "(x + 3)(x + 4)",
          "translation": "写成积的形式：这就是因式分解"
        },
        {
          "id": "f3",
          "latex": "(x + 3)(x + 4) = x^2 + 7x + 12",
          "translation": "倒回去展开能还原：说明分解对了"
        }
      ],
      "interaction": {
        "params": {
          "expr": "x^2 + 7*x + 12",
          "label": "x",
          "max": 10,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "因式分解 = 和变积，是整式乘法的逆运算。",
        "检验标准：把分解结果乘开，能还原就对了；还要一次分到底。"
      ],
      "examples": [
        {
          "figure": "类比",
          "text": "12=2×2×3 是数字的因式分解；x²+7x+12=(x+3)(x+4) 是整式的。"
        }
      ],
      "prev": "ch02-u3-l1-p1",
      "next": "ch02-u3-l2-p1"
    }
  ]
};
