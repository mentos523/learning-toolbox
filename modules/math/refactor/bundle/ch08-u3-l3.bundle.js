window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u3-l3"] = {
  "lessonId": "ch08-u3-l3",
  "lessonTitle": "本章小结",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u3-l3-p1",
      "title": "一图流：指数、对数与正弦",
      "concept": "本章知识串联",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = a^x, y = \\log_a x (a > 0, a \\neq 1)",
          "translation": "指数与对数互逆：一个把真数相乘变成对数相加，一个倒着走回来"
        },
        {
          "id": "f2",
          "latex": "y = \\sin x",
          "translation": "正弦（选学）：单位圆纵坐标的变化，周期性波动"
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
              "step": 0.5,
              "label": "x",
              "expr": "2^x"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": 0,
              "max": 6.3,
              "step": 0.3,
              "label": "t",
              "expr": "sin(t)"
            }
          },
          "labels": [
            "指数爆炸 y=2ˣ：越涨越快",
            "周期波动 y=sin t：涨落循环（选学）"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "三条主线：指数推广（负、分数）→ 指数对数互逆 → 三角初探（选学）。",
        "记住：对数是指数的逆问题——2⁵=32 反问 32 是 2 的几次方。"
      ],
      "examples": [
        {
          "text": "折纸 30 次 ≈ 107374 米：指数爆炸的威力",
          "figure": "并排对比"
        }
      ],
      "prev": "ch08-u3-l2-p1b",
      "next": "ch08-ux-l1-p1"
    }
  ]
};
