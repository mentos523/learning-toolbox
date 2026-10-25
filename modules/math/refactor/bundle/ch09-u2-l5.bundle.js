window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch09-u2-l5"] = {
  "lessonId": "ch09-u2-l5",
  "lessonTitle": "本章小结",
  "chapterId": "ch09",
  "pages": [
    {
      "id": "ch09-u2-l5-p1",
      "title": "本章小结：离散的函数",
      "concept": "本章知识串联",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_n = a_1 + (n-1)d, S_n = \\frac{n(a_1 + a_n)}{2}",
          "translation": "等差全家桶：通项一次加，求和首尾配对"
        },
        {
          "id": "f2",
          "latex": "a_n = a_1 q^{n-1}, S_n = \\frac{a_1(1 - q^n)}{1 - q} (q \\neq 1)",
          "translation": "等比全家桶：通项指数乘，求和错位相减"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": 1,
              "max": 12,
              "step": 1,
              "label": "n",
              "expr": "2*n+1"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": 1,
              "max": 10,
              "step": 1,
              "label": "n",
              "expr": "2^(n-1)"
            }
          },
          "labels": [
            "等差：散点落在直线上",
            "等比：散点落在指数曲线上"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "数列是定义在正整数上的函数——散点图就是它的画像。",
        "下一章看：散点越来越密，离散开始逼近连续（极限）。"
      ],
      "examples": [
        {
          "text": "两种增长：等差匀速爬坡，等比越涨越快",
          "figure": "并排对比"
        }
      ],
      "prev": "ch09-u2-l4-p2b",
      "next": "ch09-ux-l1-p1"
    }
  ]
};
