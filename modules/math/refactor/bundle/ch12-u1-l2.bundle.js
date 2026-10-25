window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-u1-l2"] = {
  "lessonId": "ch12-u1-l2",
  "lessonTitle": "曲边梯形的面积（二）：求和与取极限",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-u1-l2-p1",
      "title": "n 越大，和越接近 1/3",
      "concept": "黎曼和的极限",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_n = \\sum_{i=1}^{n} (\\frac{i}{n})^2 \\cdot \\frac{1}{n}",
          "translation": "n 份右端点矩形：S_n=Σ(i/n)²·(1/n)——y=x² 在 [0,1] 上的面积和"
        },
        {
          "id": "f2",
          "latex": "S_n = \\frac{(n+1)(2n+1)}{6n^2} \\to \\frac{1}{3}",
          "translation": "求和化简：n 越大 S_n 越接近 1/3——这就是定积分的值"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 100,
          "step": 1,
          "label": "n",
          "expr": "(n+1)*(2*n+1)/(6*n^2)"
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 n 从 1 到 100：读数 1→0.469→…→0.338，越挤越靠近 1/3。",
        "'无限细分'不是玄学：是你亲手拖滑块看到的趋势。"
      ],
      "examples": [
        {
          "text": "1/2+1/4+1/8+…：第九章点'加一项'的老朋友",
          "figure": "滑块实验"
        }
      ],
      "prev": "ch12-u1-l1-p1b",
      "next": "ch12-u1-l2-p1b"
    },
    {
      "id": "ch12-u1-l2-p1b",
      "title": "黎曼和：n→∞ 取极限",
      "concept": "讲解：黎曼和的极限",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_n = \\sum_{i=1}^{n} f(x_i) \\Delta x",
          "translation": "黎曼和：n 个矩形面积之和"
        },
        {
          "id": "f2",
          "latex": "\\lim_{n \\to \\infty} S_n",
          "translation": "n→∞：矩形无限变细，和趋向精确值"
        }
      ],
      "interaction": {
        "params": {
          "expr": "(n+1)*(2*n+1)/(6*n^2)",
          "label": "n",
          "max": 100,
          "min": 1,
          "step": 1
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "Sₙ 是近似值：n 越大越准；极限是精确值。",
        "Δx=(b−a)/n：n 越大，每份越窄。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "π 的计算：圆内接正 n 边形，n 越大越接近圆。"
        }
      ],
      "prev": "ch12-u1-l2-p1",
      "next": "ch12-u1-l3-p1"
    }
  ]
};
