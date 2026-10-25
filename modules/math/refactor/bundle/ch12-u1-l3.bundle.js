window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-u1-l3"] = {
  "lessonId": "ch12-u1-l3",
  "lessonTitle": "定积分的定义",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-u1-l3-p1",
      "title": "定积分：面积的精确名字",
      "concept": "定积分的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{0}^{a} x dx = \\frac{a^2}{2}",
          "translation": "∫₀ᵃx dx：直线 y=x 从 0 到 a 下方的面积（三角形）=a²/2"
        },
        {
          "id": "f2",
          "latex": "\\int_{a}^{b} f(x) dx = \\lim_{n \\to \\infty} S_n",
          "translation": "定积分的定义：n→∞ 时矩形面积和 S_n 的极限——给'曲边面积'一个精确名字"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 4,
          "step": 0.25,
          "label": "a",
          "expr": "a^2/2",
          "target": 2,
          "targetLabel": "找：面积=2 时 a 是多少"
        }
      },
      "auxInteraction": null,
      "hints": [
        "∫ 读作'积分'：它是'把无穷多小份加起来'的专用记号。",
        "三角形面积你早就会：∫₀ᵃx dx=a²/2，老朋友的新名字。"
      ],
      "examples": [
        {
          "text": "路程=速度×时间：匀速是矩形，变速是曲边形",
          "figure": "滑块实验"
        }
      ],
      "prev": "ch12-u1-l2-p1b",
      "next": "ch12-u1-l3-p1b"
    },
    {
      "id": "ch12-u1-l3-p1b",
      "title": "∫：把无穷多份加起来",
      "concept": "讲解：定积分的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{1}^{3} 2 dx = 4",
          "translation": "y=2 从 1 到 3：矩形面积 2×2=4"
        },
        {
          "id": "f2",
          "latex": "\\int_{0}^{3} x dx = 4.5",
          "translation": "y=x 从 0 到 3：三角形 3×3/2=4.5"
        }
      ],
      "interaction": {
        "params": {
          "expr": "a^2/2",
          "label": "a",
          "max": 4,
          "min": 0,
          "step": 0.25,
          "target": 2,
          "targetLabel": "找：面积=2 时 a 是多少"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "∫ₐᵇf(x)dx 读作“f 从 a 到 b 的积分”：a 下限，b 上限。",
        "几何意义：曲线下方、x 轴上方、夹在 a 与 b 之间的面积。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "∫₀¹1dx=1：y=1 从 0 到 1 是 1×1 的正方形。"
        }
      ],
      "prev": "ch12-u1-l3-p1",
      "next": "ch12-u1-l4-p1"
    }
  ]
};
