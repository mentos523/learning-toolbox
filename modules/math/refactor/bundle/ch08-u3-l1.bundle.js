window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u3-l1"] = {
  "lessonId": "ch08-u3-l1",
  "lessonTitle": "弧度制（选学）",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u3-l1-p1",
      "title": "弧度制：180 度 = π（弧度）",
      "concept": "弧度制（选学）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\pi = 180\\text{度}",
          "translation": "180 度等于 π（弧度）：π 弧度就是半圈"
        },
        {
          "id": "f2",
          "latex": "\\text{弧度} = \\text{角度} \\times \\frac{\\pi}{180}",
          "translation": "角度乘以 π 除以 180 就是弧度：比如 90 度等于 π/2（弧度）"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 360,
          "step": 30,
          "label": "d",
          "expr": "d*π/180"
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 d：d=180 读数为 π（约 3.142）。",
        "为什么拿弧长量角？半径固定后，弧长与角度一一对应。",
        "单位圆上：弧长是多少，角度就是多少弧度。"
      ],
      "examples": [
        {
          "text": "钟表：时针转半圈是 180 度，也是 π 弧度",
          "figure": "滑块"
        }
      ],
      "prev": "ch08-u2-l6-p1b",
      "next": "ch08-u3-l1-p1b"
    },
    {
      "id": "ch08-u3-l1-p1b",
      "title": "弧度：用弧长量角（选学）",
      "concept": "讲解：弧度制（选学）",
      "formulas": [
        {
          "id": "f1",
          "latex": "2\\pi = 360\\text{度}",
          "translation": "一圈：2π 弧度 = 360 度"
        },
        {
          "id": "f2",
          "latex": "\\frac{\\pi}{6} = 30\\text{度}",
          "translation": "π/6 弧度 = 30 度"
        }
      ],
      "interaction": {
        "params": {
          "expr": "d*π/180",
          "label": "d",
          "max": 360,
          "min": 0,
          "step": 30
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "弧度=弧长：单位圆上走多长，角度就是多少弧度。",
        "常用：π/6=30°，π/4=45°，π/3=60°，π/2=90°。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "60°=π/3 弧度；3π/2 弧度=270°。"
        }
      ],
      "prev": "ch08-u3-l1-p1",
      "next": "ch08-u3-l2-p1"
    }
  ]
};
