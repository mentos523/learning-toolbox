window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-u2-l5"] = {
  "lessonId": "ch12-u2-l5",
  "lessonTitle": "全书总结：微积分的统一",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-u2-l5-p1",
      "title": "全书总结：微分与积分互逆",
      "concept": "微积分基本定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{d}{dx} \\int_{a}^{x} f(t) dt = f(x)",
          "translation": "基本定理（一）：对面积函数求导，回到 f——微分是积分的逆运算"
        },
        {
          "id": "f2",
          "latex": "\\int_{a}^{b} f'(x) dx = f(b) - f(a)",
          "translation": "基本定理（二）：对导函数积分，回到 f——积分是微分的逆运算"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": -3,
              "max": 3,
              "step": 0.1,
              "label": "x",
              "expr": "x^3-3*x"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": -3,
              "max": 3,
              "step": 0.1,
              "label": "x",
              "expr": "3*x^2-3"
            }
          },
          "sync": [
            "x"
          ],
          "labels": [
            "路 s=x³−3x：由坡度积分得到",
            "坡度计 s'=3x²−3：由路求导得到"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "本章路线：分割→求和→取极限→面积函数→原函数→牛顿-莱布尼茨。",
        "全书终点：求导与积分互逆——'坡度计'和'路程表'是同一枚硬币两面。"
      ],
      "examples": [
        {
          "text": "一图流：左图是路，右图是坡度计——求导过去，积分回来",
          "figure": "并排对比"
        }
      ],
      "prev": "ch12-u2-l4-p1b",
      "next": "ch12-ux-l1-p1"
    }
  ]
};
