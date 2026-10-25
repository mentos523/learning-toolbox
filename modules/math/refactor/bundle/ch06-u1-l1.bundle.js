window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u1-l1"] = {
  "lessonId": "ch06-u1-l1",
  "lessonTitle": "变量与常量",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u1-l1-p1",
      "title": "会动的数与不会动的数",
      "concept": "变量与常量",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = 8 + 2.5x",
          "translation": "打车费 = 8 元起步价 + 每公里 2.5 元：x、S 是变量，8 和 2.5 是常量"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "8 + 2.5*x",
          "unit": "元"
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖动 x（公里数）：S 跟着变，x 和 S 是变量；8 和 2.5 不动，是常量。",
        "变量常量是相对的：只在“这趟打车”这个变化过程里成立。"
      ],
      "examples": [
        {
          "text": "水池注水：时间是变量，每分钟出水量是常量",
          "figure": "滑块"
        }
      ],
      "prev": "ch06-u0-l2-p3b",
      "next": "ch06-u1-l1-p1b"
    },
    {
      "id": "ch06-u1-l1-p1b",
      "title": "变量常量：看语境",
      "concept": "讲解：变量与常量",
      "formulas": [
        {
          "id": "f1",
          "latex": "C = 2\\pi r",
          "translation": "圆周长公式：r 变 C 跟着变，2 和 π 是常量"
        },
        {
          "id": "f2",
          "latex": "S = 8 + 2.5x",
          "translation": "打车：x、S 是变量；8、2.5 是常量"
        }
      ],
      "interaction": {
        "params": {
          "expr": "2*3.14*r",
          "label": "r",
          "max": 10,
          "min": 0,
          "step": 1,
          "unit": "厘米"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "变量常量看语境：这趟打车里 2.5 是常量，换个城市就变了。",
        "找变量三步：谁在变？谁跟着变？谁一直不变？"
      ],
      "examples": [
        {
          "figure": "辨析",
          "text": "长方形 S=ab：a、b、S 都是变量；正方形 S=a²：a、S 是变量。"
        }
      ],
      "prev": "ch06-u1-l1-p1",
      "next": "ch06-u1-l2-p1"
    }
  ]
};
