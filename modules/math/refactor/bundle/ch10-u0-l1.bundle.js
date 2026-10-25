window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-u0-l1"] = {
  "lessonId": "ch10-u0-l1",
  "lessonTitle": "从散点到曲线",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-u0-l1-p1",
      "title": "散点加密：从离散到连续",
      "concept": "离散加密成连续",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_n = \\frac{1}{n} (n = 1, 2, 3, \\cdot\\cdot\\cdot)",
          "translation": "散点：n 只能取正整数，点与点之间是断开的"
        },
        {
          "id": "f2",
          "latex": "y = \\frac{1}{x} (x > 0)",
          "translation": "x 可取任意实数：点无限加密，就连成了一条曲线"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "1/x",
          "xMin": 1,
          "xMax": 20,
          "step": 0.5,
          "autoPlay": true,
          "speed": 150
        }
      },
      "auxInteraction": null,
      "hints": [
        "看点逐个出现：越往右越密，几乎连成一条曲线。",
        "离散→连续：点够密时，'一串点'就变成了'一条线'。"
      ],
      "examples": [
        {
          "text": "第九章的散点图：数列是定义在正整数上的函数",
          "figure": "描点成像"
        }
      ],
      "prev": "ch09-u2-l5-p1",
      "next": "ch10-u0-l1-p1b"
    },
    {
      "id": "ch10-u0-l1-p1b",
      "title": "离散 vs 连续：点密成线",
      "concept": "讲解：离散与连续",
      "formulas": [
        {
          "id": "f1",
          "latex": "n = 1, 2, 3",
          "translation": "数列：n 只能取正整数，点与点断开"
        },
        {
          "id": "f2",
          "latex": "x = 1, 1.5, 1.55",
          "translation": "函数：x 可取任意实数，点无限加密成线"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "1/x",
          "speed": 150,
          "step": 0.5,
          "xMax": 20,
          "xMin": 1
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "离散=一个个孤立的点；连续=点密到连成线。",
        "数列是函数的“抽样”：只在整数点取值。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "票房按天统计是离散的；水温连续变化是连续的。"
        }
      ],
      "prev": "ch10-u0-l1-p1",
      "next": "ch10-u1-l1-p1"
    }
  ]
};
