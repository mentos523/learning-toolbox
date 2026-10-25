window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch09-u2-l3"] = {
  "lessonId": "ch09-u2-l3",
  "lessonTitle": "等比数列",
  "chapterId": "ch09",
  "pages": [
    {
      "id": "ch09-u2-l3-p1",
      "title": "等比数列：每次乘同一个数",
      "concept": "等比数列",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_n = a_1 q^{n-1} (q \\neq 0)",
          "translation": "第 n 项 = 首项×公比的 n−1 次方：公比 q 是每次乘的数（q 不为 0）"
        },
        {
          "id": "f2",
          "latex": "q = \\frac{a_{n+1}}{a_n}",
          "translation": "公比 = 后一项除以前一项：任意相邻两项的比都相等"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "2^(x-1)",
          "xMin": 1,
          "xMax": 10,
          "step": 1,
          "autoPlay": true,
          "speed": 500
        }
      },
      "auxInteraction": null,
      "hints": [
        "看散点：点落在一条指数曲线上——等比数列是离散的指数函数。",
        "公比 2：每步翻一番，越往后涨得越快。"
      ],
      "examples": [
        {
          "text": "传谣言：每人告诉 2 人，知情人数 1, 2, 4, 8, …",
          "figure": "描点成像"
        }
      ],
      "prev": "ch09-u2-l2-p1b",
      "next": "ch09-u2-l3-p1b"
    },
    {
      "id": "ch09-u2-l3-p1b",
      "title": "等比数列：公比是倍数",
      "concept": "讲解：等比数列",
      "formulas": [
        {
          "id": "f1",
          "latex": "3, 6, 12, 24, \\cdot\\cdot\\cdot",
          "translation": "q=2：每次乘 2"
        },
        {
          "id": "f2",
          "latex": "a_n = 3 \\times 2^{n-1}",
          "translation": "通项：第 n 项=3×2ⁿ⁻¹"
        },
        {
          "id": "f3",
          "latex": "a_6 = 96",
          "translation": "第 6 项：3×2⁵=96"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "3*2^(x-1)",
          "speed": 500,
          "step": 1,
          "xMax": 10,
          "xMin": 1
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "等比数列=每次乘同一个数 q：q 是倍数。",
        "q=1 是常数列；0<q<1 时数列递减趋向 0，如 8,4,2,1,…。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "−2,6,−18,…：q=−3，aₙ=−2×(−3)ⁿ⁻¹。"
        }
      ],
      "prev": "ch09-u2-l3-p1",
      "next": "ch09-u2-l4-p1"
    }
  ]
};
