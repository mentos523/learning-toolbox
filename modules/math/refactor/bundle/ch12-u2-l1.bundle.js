window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-u2-l1"] = {
  "lessonId": "ch12-u2-l1",
  "lessonTitle": "面积函数：变上限积分",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-u2-l1-p1",
      "title": "面积函数：右端点会动",
      "concept": "变上限积分",
      "formulas": [
        {
          "id": "f1",
          "latex": "A(x) = \\int_{0}^{x} 2t dt",
          "translation": "面积函数：右端点拖到 x，y=2t 曲线下方的面积记作 A(x)"
        },
        {
          "id": "f2",
          "latex": "A(x) = x^2",
          "translation": "算出来 A(x)=x²——右端点右移，面积跟着长大"
        },
        {
          "id": "f3",
          "latex": "A'(x) = 2x = f(x)",
          "translation": "对面积函数求导：A'(x)=2x，正好回到 f——这是下一课的钥匙"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": 0,
            "max": 4,
            "step": 0.1,
            "initial": 2
          },
          "views": [
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^2",
              "axisLabelX": "x",
              "axisLabelY": "A(x)"
            },
            {
              "kind": "readout",
              "expr": "x^2",
              "label": "A(x)：阴影面积"
            },
            {
              "kind": "readout",
              "expr": "2*x",
              "label": "A'(x)=2x=f(x)"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖右端点 x：阴影面积跟着长大，读数 A(x)=x²。",
        "看第三个读数：A'(x)=2x=f(x)——面积函数的'坡度'正是 f 自己。"
      ],
      "examples": [
        {
          "text": "水位计：右端点右移，水量读数跟着涨",
          "figure": "联动仪表盘"
        }
      ],
      "prev": "ch12-u1-l4-p1b",
      "next": "ch12-u2-l1-p1b"
    },
    {
      "id": "ch12-u2-l1-p1b",
      "title": "面积函数：上限是变量",
      "concept": "讲解：变上限积分",
      "formulas": [
        {
          "id": "f1",
          "latex": "A(2) = \\int_{0}^{2} 2t dt = 4",
          "translation": "x=2：面积 4"
        },
        {
          "id": "f2",
          "latex": "A(3) = 9",
          "translation": "x=3：面积 9"
        },
        {
          "id": "f3",
          "latex": "A(x) = x^2",
          "translation": "一般：A(x)=x²"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 2,
            "label": "x",
            "max": 4,
            "min": 0,
            "step": 0.1
          },
          "views": [
            {
              "axisLabelX": "x",
              "axisLabelY": "A(x)",
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^2"
            },
            {
              "expr": "x^2",
              "kind": "readout",
              "label": "A(x)：阴影面积"
            },
            {
              "expr": "2*x",
              "kind": "readout",
              "label": "A'(x)=2x=f(x)"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "变上限积分：上限 x 会动，面积 A(x) 是 x 的函数。",
        "A'(x)=f(x)：面积函数的导数正是被积函数——基本定理的种子。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "A(x)=∫₀ˣt²dt=x³/3：A'(x)=x²。"
        }
      ],
      "prev": "ch12-u2-l1-p1",
      "next": "ch12-u2-l2-p1"
    }
  ]
};
