window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-u1-l1"] = {
  "lessonId": "ch10-u1-l1",
  "lessonTitle": "逼近思想",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-u1-l1-p1",
      "title": "加一项：和在逼近 1",
      "concept": "逼近思想",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_n = \\frac{1}{2} + \\frac{1}{4} + \\cdot\\cdot\\cdot + \\frac{1}{2^n} = 1 - \\frac{1}{2^n}",
          "translation": "前 n 项和 = 1 − 1/2ⁿ：加的项越多，和离 1 越近"
        },
        {
          "id": "f2",
          "latex": "\\lim_{n \\to \\infty} S_n = 1",
          "translation": "极限记法：n 趋向无穷时 S_n 无限趋近 1——'极限'就是给这个趋势起的名字"
        }
      ],
      "interaction": {
        "type": "numeric-lab",
        "params": {
          "mode": "accumulate",
          "term": "1/2^n",
          "maxSteps": 20,
          "buttonLabel": "加一项",
          "showTrend": true,
          "precision": 6
        }
      },
      "auxInteraction": null,
      "hints": [
        "每点一次'加一项'：0.5→0.75→0.875→…，永远差一点。",
        "点 20 次看 S₂₀≈0.999999：'无限接近 1'是亲手点的趋势。"
      ],
      "examples": [
        {
          "text": "芝诺悖论：阿基里斯追龟——永远差一点，但追上了",
          "figure": "数值实验"
        }
      ],
      "prev": "ch10-u0-l1-p1b",
      "next": "ch10-u1-l1-p1b"
    },
    {
      "id": "ch10-u1-l1-p1b",
      "title": "逼近：永远差一点",
      "concept": "讲解：逼近思想",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_3 = \\frac{7}{8}",
          "translation": "加 3 项：1/2+1/4+1/8=7/8"
        },
        {
          "id": "f2",
          "latex": "S_{10} = 1 - \\frac{1}{1024}",
          "translation": "加 10 项：差 1/1024"
        },
        {
          "id": "f3",
          "latex": "\\lim_{n \\to \\infty} S_n = 1",
          "translation": "项数越多离 1 越近：极限是 1"
        }
      ],
      "interaction": {
        "params": {
          "buttonLabel": "加一项",
          "maxSteps": 20,
          "mode": "accumulate",
          "precision": 6,
          "showTrend": true,
          "term": "1/2^n"
        },
        "type": "numeric-lab"
      },
      "auxInteraction": null,
      "hints": [
        "“无限接近”不是“等于”：Sₙ 永远 <1，但可以任意接近 1。",
        "极限描述的是趋势：n 越大，Sₙ 离 1 越近。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "0.999…=1：0.9,0.99,0.999,…无限逼近 1。"
        }
      ],
      "prev": "ch10-u1-l1-p1",
      "next": "ch10-u1-l2-p1"
    }
  ]
};
