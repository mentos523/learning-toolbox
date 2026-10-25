window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-u2-l4"] = {
  "lessonId": "ch12-u2-l4",
  "lessonTitle": "定积分的应用",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-u2-l4-p1",
      "title": "水池注水：面积=总水量",
      "concept": "定积分的应用",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{0}^{20} 2t dt = 400",
          "translation": "20 分钟总水量：流速 v=2t 曲线下的面积=400（升）"
        },
        {
          "id": "f2",
          "latex": "\\sum_{n=1}^{20} 2n = 420",
          "translation": "按分钟累加：2+4+…+40=420——份数越多，越接近 400"
        }
      ],
      "interaction": {
        "type": "numeric-lab",
        "params": {
          "mode": "accumulate",
          "term": "2*n",
          "maxSteps": 20,
          "buttonLabel": "再流 1 分钟",
          "showTrend": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "每点一次'再流 1 分钟'：累计 2→6→12→…→420，逼近 400。",
        "流速图像下的面积=总水量：积分是'累积量'的计算器。"
      ],
      "examples": [
        {
          "text": "曲边田地：数格子→细分，同一招",
          "figure": "数值实验台"
        },
        {
          "text": "面包薄片：旋转体体积=无穷多圆片相加",
          "figure": "数值实验台"
        }
      ],
      "prev": "ch12-u2-l3-p2b",
      "next": "ch12-u2-l4-p1b"
    },
    {
      "id": "ch12-u2-l4-p1b",
      "title": "积分=累积量",
      "concept": "讲解：定积分的应用",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{0}^{10} 3 dt = 30",
          "translation": "流速恒 3，10 分钟：3×10=30 升"
        },
        {
          "id": "f2",
          "latex": "\\int_{0}^{10} 2t dt = 100",
          "translation": "流速 2t：t²|₀¹⁰=100 升"
        }
      ],
      "interaction": {
        "params": {
          "buttonLabel": "再流 1 分钟",
          "maxSteps": 20,
          "mode": "accumulate",
          "showTrend": true,
          "term": "2*n"
        },
        "type": "numeric-lab"
      },
      "auxInteraction": null,
      "hints": [
        "积分是累积量的计算器：速度积出路程，流速积出水量。",
        "离散累加（Σ）vs 连续累积（∫）：份数→∞，Σ 变成 ∫。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "v=t²，10 秒路程=∫₀¹⁰t²dt=1000/3≈333 米。"
        }
      ],
      "prev": "ch12-u2-l4-p1",
      "next": "ch12-u2-l5-p1"
    }
  ]
};
