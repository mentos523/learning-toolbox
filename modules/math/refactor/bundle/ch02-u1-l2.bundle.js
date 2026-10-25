window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-u1-l2"] = {
  "lessonId": "ch02-u1-l2",
  "lessonTitle": "整式的加减",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-u1-l2-p1",
      "title": "2x + 3x：数盒子就行",
      "concept": "合并同类项",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x + 3x = 5x",
          "translation": "2 个 x 加 3 个 x 等于 5 个 x"
        },
        {
          "id": "f2",
          "latex": "7y^2 - 4y^2 = 3y^2",
          "translation": "7 个 y 平方减 4 个 y 平方等于 3 个 y 平方"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "2*x + 3*x"
        }
      },
      "auxInteraction": null,
      "hints": [
        "2 盒 x 加 3 盒 x，一共 5 盒 x：2x+3x = 5x。",
        "同类项：字母相同、指数也相同才能合并；合并只加系数，字母和指数不动。"
      ],
      "examples": [
        {
          "text": "数盒子：x² 的盒子和 x 的盒子不能混装",
          "figure": "滑块"
        }
      ],
      "prev": "ch02-u1-l1-p1b",
      "next": "ch02-u1-l2-p1b"
    },
    {
      "id": "ch02-u1-l2-p1b",
      "title": "合并三步：找、并、抄",
      "concept": "讲解：合并同类项",
      "formulas": [
        {
          "id": "f1",
          "latex": "4x^2 + 3x - 2x^2 + 5",
          "translation": "第一步：找同类项——4x² 与 −2x² 是同类项"
        },
        {
          "id": "f2",
          "latex": "2x^2 + 3x + 5",
          "translation": "第二步：4x²−2x²=2x²；3x 和 5 落单，照抄"
        },
        {
          "id": "f3",
          "latex": "7y^2 - 4y^2 = 3y^2",
          "translation": "再练：7 个 y² 减 4 个 y²，剩 3 个 y²"
        }
      ],
      "interaction": {
        "params": {
          "expr": "4*x^2 + 3*x - 2*x^2 + 5",
          "label": "x",
          "max": 5,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "合并三步：找（同类项）、并（系数相加）、抄（落单的照抄）。",
        "x² 的盒子和 x 的盒子不能混装：指数不同就不是同类项。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "3ab−5ab+2a²=−2ab+2a²：ab 合并，a² 落单照抄。"
        }
      ],
      "prev": "ch02-u1-l2-p1",
      "next": "ch02-u1-l3-p1"
    }
  ]
};
