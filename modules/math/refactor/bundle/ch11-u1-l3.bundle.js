window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch11-u1-l3"] = {
  "lessonId": "ch11-u1-l3",
  "lessonTitle": "导数的几何意义",
  "chapterId": "ch11",
  "pages": [
    {
      "id": "ch11-u1-l3-p1",
      "title": "切线斜率就是导数",
      "concept": "导数的几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "f'(x_0) = \\text{切线斜率}",
          "translation": "导数的几何意义：f'(x₀) 就是曲线在 x₀ 处切线的斜率"
        },
        {
          "id": "f2",
          "latex": "y - 1 = 2(x - 1)",
          "translation": "切线方程：y=x² 在点 (1,1) 处切线斜率为 2，方程是 y−1=2(x−1)"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": -3,
            "max": 3,
            "step": 0.1,
            "initial": 1
          },
          "views": [
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^2",
              "axisLabelX": "x",
              "axisLabelY": "y"
            },
            {
              "kind": "readout",
              "expr": "2*x",
              "label": "切线斜率 f'(x)"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖动切点：点走到哪，斜率读数就报出那一点切线的斜率。",
        "x<0 时斜率为负：切线'向下俯'——导数的正负就是'上扬还是下俯'。"
      ],
      "examples": [
        {
          "text": "放大镜：曲线局部放大像直线，那条直线的斜率就是导数",
          "figure": "联动仪表盘"
        }
      ],
      "prev": "ch11-u1-l2-p1b",
      "next": "ch11-u1-l3-p1b"
    },
    {
      "id": "ch11-u1-l3-p1b",
      "title": "切线：导数的几何脸",
      "concept": "讲解：导数的几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = x^3",
          "translation": "y=x³ 在 x=1 处"
        },
        {
          "id": "f2",
          "latex": "y - 1 = 3(x - 1)",
          "translation": "f'(1)=3：切线 y−1=3(x−1)"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 1,
            "label": "x",
            "max": 3,
            "min": -3,
            "step": 0.1
          },
          "views": [
            {
              "axisLabelX": "x",
              "axisLabelY": "y",
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^3"
            },
            {
              "expr": "3*x^2",
              "kind": "readout",
              "label": "切线斜率 f'(x)"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "切线方程三步：求切点、求斜率 f'(x₀)、点斜式写方程。",
        "导数>0 切线往上扬，<0 往下俯，=0 水平。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=√x 在 (4,2)：f'(4)=1/4，切线 y−2=(x−4)/4。"
        }
      ],
      "prev": "ch11-u1-l3-p1",
      "next": "ch11-u1-l3-p1g"
    },
    {
      "id": "ch11-u1-l3-p1g",
      "title": "放大镜：曲线放大变直线",
      "concept": "图形：割线逼近切线",
      "formulas": [
        {
          "id": "f1",
          "latex": "f'(1) = 2",
          "translation": "y=x² 在 x=1 处切线斜率是 2"
        },
        {
          "id": "f2",
          "latex": "\\text{割线} \\to \\text{切线}",
          "translation": "放大：割线越来越贴近切线"
        }
      ],
      "interaction": {
        "params": {
          "caption": "放大到足够大，曲线看起来像直线了",
          "center": 1,
          "fn": "x^2",
          "levels": 4,
          "window": 2
        },
        "type": "zoomer"
      },
      "auxInteraction": null,
      "hints": [
        "一级级放大 x=1 附近：曲线越来越直，最后像直线。",
        "那条“像直线”的极限位置就是切线，它的斜率=导数。"
      ],
      "examples": [
        {
          "figure": "数形结合",
          "text": "地球表面：站得近看是平面，放大看地球是圆的——同一个道理。"
        }
      ],
      "prev": "ch11-u1-l3-p1b",
      "next": "ch11-u2-l1-p1"
    }
  ]
};
