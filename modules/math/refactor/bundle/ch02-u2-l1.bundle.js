window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-u2-l1"] = {
  "lessonId": "ch02-u2-l1",
  "lessonTitle": "平方差公式",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-u2-l1-p1",
      "title": "(a+b)(a−b)：中间项去哪了？",
      "concept": "平方差公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "(a + b)(a - b) = a^2 - b^2",
          "translation": "a 加 b 的和乘 a 减 b 的差，等于 a 平方减 b 平方"
        },
        {
          "id": "f2",
          "latex": "(x + 3)(x - 3) = x^2 - 9",
          "translation": "x 加 3 乘 x 减 3 等于 x 平方减 9"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "(x+3)*(x-3)"
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 x：左边乘开永远等于 x²−9。",
        "+3x 和 −3x 抵消了：只剩平方的差，这就是\"平方差\"名字的由来。",
        "展开验证：(a+b)(a−b) = a²−ab+ab−b² = a²−b²，中间两项抵消了。"
      ],
      "examples": [
        {
          "text": "大正方形挖去小正方形，剩余面积就是 a²−b²",
          "figure": "滑块"
        }
      ],
      "prev": "ch02-u1-l3-p2g",
      "next": "ch02-u2-l1-p1b"
    },
    {
      "id": "ch02-u2-l1-p1b",
      "title": "平方差：三特征全中才套",
      "concept": "讲解：平方差公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x + 5)(x - 5)",
          "translation": "长成 (a+b)(a−b) 的样子：直接套公式"
        },
        {
          "id": "f2",
          "latex": "x^2 - 25",
          "translation": "中间 +5x−5x 抵消，只剩 x²−25"
        },
        {
          "id": "f3",
          "latex": "99 \\times 101 = 9999",
          "translation": "活用：99×101=(100−1)(100+1)=100²−1²=9999，口算秒出"
        }
      ],
      "interaction": {
        "params": {
          "expr": "(x+5)*(x-5)",
          "label": "x",
          "max": 10,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "平方差三特征：两项、都是平方、中间减号——三条全中才能套。",
        "99×101 这类“上下差一点”的乘法，用平方差口算最快。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(2a+3)(2a−3)=4a²−9：a 换成 2a，平方别忘了 4。"
        }
      ],
      "prev": "ch02-u2-l1-p1",
      "next": "ch02-u2-l1-p1g"
    },
    {
      "id": "ch02-u2-l1-p1g",
      "title": "平方差：大正方形挖一角",
      "concept": "图形：平方差的面积意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "a^2 - b^2",
          "translation": "大正方形挖去小正方形，剩下部分的面积"
        },
        {
          "id": "f2",
          "latex": "(a + b)(a - b) = a^2 - b^2",
          "translation": "剩下的图形剪开重拼，正好是长 (a+b)、宽 (a−b) 的长方形"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "大正方形：面积 a²",
            "挖掉的小正方形：面积 b²"
          ],
          "left": {
            "kind": "shape-area",
            "params": {
              "initial": 5,
              "label": "a",
              "max": 8,
              "min": 1,
              "showGrid": true,
              "step": 1
            }
          },
          "right": {
            "kind": "shape-area",
            "params": {
              "initial": 2,
              "label": "b",
              "max": 5,
              "min": 1,
              "showGrid": true,
              "step": 1
            }
          }
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "拖 a、b：大正方形面积 a²，挖掉 b²，剩下的就是平方差。",
        "把剩下一块剪开重拼，变成 (a+b)×(a−b) 的长方形——公式看得见。"
      ],
      "examples": [
        {
          "figure": "数形结合",
          "text": "边长 10 的正方形挖掉边长 4 的：100−16=84=(10+4)(10−4)。"
        }
      ],
      "prev": "ch02-u2-l1-p1b",
      "next": "ch02-u2-l2-p1"
    }
  ]
};
