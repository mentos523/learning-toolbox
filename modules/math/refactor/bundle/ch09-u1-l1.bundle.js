window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch09-u1-l1"] = {
  "lessonId": "ch09-u1-l1",
  "lessonTitle": "数列的定义",
  "chapterId": "ch09",
  "pages": [
    {
      "id": "ch09-u1-l1-p1",
      "title": "数列：一组排好顺序的数",
      "concept": "项",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_n = 1 + \\frac{1}{n} (n = 1, 2, 3, \\cdot\\cdot\\cdot)",
          "translation": "第 n 项 a_n 等于 1 加 1/n：n 从 1 开始取正整数，得到一串排好顺序的数"
        },
        {
          "id": "f2",
          "latex": "a_1 = 2, a_2 = \\frac{3}{2}, a_3 = \\frac{4}{3}, \\cdot\\cdot\\cdot",
          "translation": "前三项：2、3/2、4/3——每一项都有自己的序号，顺序不能乱"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "1+1/x",
          "xMin": 1,
          "xMax": 15,
          "step": 1,
          "autoPlay": true,
          "speed": 500
        }
      },
      "auxInteraction": null,
      "hints": [
        "每一项都有序号：a₁ 是第 1 项，a₂ 是第 2 项——顺序不能乱。",
        "数列是定义在正整数上的函数：散点图就是它的画像。"
      ],
      "examples": [
        {
          "text": "楼梯台阶数：1, 2, 3, …——天然排好顺序",
          "figure": "描点成像"
        }
      ],
      "prev": "ch08-u3-l3-p1",
      "next": "ch09-u1-l1-p1b"
    },
    {
      "id": "ch09-u1-l1-p1b",
      "title": "数列：有序号的一串数",
      "concept": "讲解：数列的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "2, 4, 6, 8, \\cdot\\cdot\\cdot",
          "translation": "偶数列：a₁=2，a₂=4，a₃=6"
        },
        {
          "id": "f2",
          "latex": "a_5 = 10",
          "translation": "第 5 项是 10：序号 5 对应值 10"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "2*x",
          "speed": 500,
          "step": 1,
          "xMax": 15,
          "xMin": 1
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "数列=按序号排好的数：aₙ 里的 n 是序号，aₙ 是第 n 个数。",
        "顺序是灵魂：2,4,6 和 6,4,2 是不同的数列。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "电影票排号：1 排 1 座、1 排 2 座……序号即位置。"
        }
      ],
      "prev": "ch09-u1-l1-p1",
      "next": "ch09-u1-l2-p1"
    }
  ]
};
