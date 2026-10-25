window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u3-l2"] = {
  "lessonId": "ch08-u3-l2",
  "lessonTitle": "正弦与余弦（选学）",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u3-l2-p1",
      "title": "正弦与余弦：单位圆上点的坐标",
      "concept": "正弦与余弦的单位圆定义（选学）",
      "formulas": [
        {
          "id": "f1",
          "latex": "(\\cos t, \\sin t)",
          "translation": "单位圆上角度 t 对应的点是 (cos t, sin t)：余弦是横坐标，正弦是纵坐标"
        },
        {
          "id": "f2",
          "latex": "y = \\sin x",
          "translation": "y 等于 sin x：把每个 t 的 sin t 画成点，连起来就是正弦曲线"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "sin(x)",
          "xMin": 0,
          "xMax": 6.3,
          "step": 0.2,
          "autoPlay": true,
          "speed": 400
        }
      },
      "auxInteraction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "t",
            "min": 0,
            "max": 6.3,
            "step": 0.1,
            "initial": 0
          },
          "views": [
            {
              "kind": "readout",
              "expr": "sin(t)",
              "label": "sin t"
            },
            {
              "kind": "readout",
              "expr": "cos(t)",
              "label": "cos t"
            },
            {
              "kind": "point",
              "xExpr": "cos(t)",
              "yExpr": "sin(t)",
              "axisLabelX": "x",
              "axisLabelY": "y"
            }
          ]
        }
      },
      "hints": [
        "拖 t：单位圆上 (cos t, sin t) 转圈，纵坐标画出正弦曲线。",
        "t 从 0 到约 6.3（≈2π）转满一圈：一个波形就是一个周期。"
      ],
      "examples": [
        {
          "text": "摩天轮座舱的高度随时间起伏：正弦曲线",
          "figure": "描点成像"
        }
      ],
      "prev": "ch08-u3-l1-p1b",
      "next": "ch08-u3-l2-p1b"
    },
    {
      "id": "ch08-u3-l2-p1b",
      "title": "正弦余弦：横纵坐标（选学）",
      "concept": "讲解：正弦与余弦（选学）",
      "formulas": [
        {
          "id": "f1",
          "latex": "(\\cos \\frac{\\pi}{2}, \\sin \\frac{\\pi}{2}) = (0, 1)",
          "translation": "转到 90°：点在 (0,1)，sin90°=1"
        },
        {
          "id": "f2",
          "latex": "(\\cos \\pi, \\sin \\pi) = (-1, 0)",
          "translation": "转到 180°：点在 (−1,0)，cos180°=−1"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 1.57,
            "label": "t",
            "max": 6.3,
            "min": 0,
            "step": 0.1
          },
          "views": [
            {
              "expr": "sin(t)",
              "kind": "readout",
              "label": "sin t"
            },
            {
              "expr": "cos(t)",
              "kind": "readout",
              "label": "cos t"
            },
            {
              "axisLabelX": "x",
              "axisLabelY": "y",
              "kind": "point",
              "xExpr": "cos(t)",
              "yExpr": "sin(t)"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "cos 是横坐标，sin 是纵坐标：转到哪，坐标读到哪。",
        "sin²t+cos²t=1：单位圆半径是 1，勾股定理。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "t=π/4：(√2/2, √2/2)，sin45°=cos45°。"
        }
      ],
      "prev": "ch08-u3-l2-p1",
      "next": "ch08-u3-l3-p1"
    }
  ]
};
