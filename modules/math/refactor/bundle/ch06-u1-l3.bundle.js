window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u1-l3"] = {
  "lessonId": "ch06-u1-l3",
  "lessonTitle": "函数的表示法",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u1-l3-p1",
      "title": "一种关系，三种写法",
      "concept": "函数的三种表示法",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2x + 3",
          "translation": "解析式：用式子写出规则"
        },
        {
          "id": "f2",
          "latex": "(0, 3), (1, 5), (2, 7)",
          "translation": "列表法：x 取 0、1、2 时，y 是 3、5、7"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "2*x + 3",
          "xMin": -2,
          "xMax": 3,
          "step": 1,
          "autoPlay": true,
          "speed": 800
        }
      },
      "auxInteraction": null,
      "hints": [
        "解析式→列表：代入 x 算 y；列表→图像：把 (x, y) 逐点画出来。",
        "三种写法说的是同一件事，考试常考互相翻译。"
      ],
      "examples": [
        {
          "text": "心电图：时间→心跳的图像表示",
          "figure": "描点成像"
        }
      ],
      "prev": "ch06-u1-l2-p1b",
      "next": "ch06-u1-l3-p1b"
    },
    {
      "id": "ch06-u1-l3-p1b",
      "title": "三种表示法：互相翻译",
      "concept": "讲解：函数的三种表示法",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 3x - 1",
          "translation": "解析式：用式子写出规则"
        },
        {
          "id": "f2",
          "latex": "(0, -1), (1, 2)",
          "translation": "列表：x 取 0、1 时，y 是 −1、2"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "3*x - 1",
          "speed": 800,
          "step": 1,
          "xMax": 2,
          "xMin": -2
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "解析式→列表：代 x 算 y；列表→图像：描点连线。",
        "考试常考“看图写式”：先找两个点，再求 k 和 b。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "心电图是图像表示；价目表是列表表示；y=3x−1 是解析式。"
        }
      ],
      "prev": "ch06-u1-l3-p1",
      "next": "ch06-u2-l1-p1"
    }
  ]
};
