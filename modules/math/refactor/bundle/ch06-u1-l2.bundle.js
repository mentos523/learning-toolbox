window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u1-l2"] = {
  "lessonId": "ch06-u1-l2",
  "lessonTitle": "函数的定义",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u1-l2-p1",
      "title": "每个 x 都有唯一的 y",
      "concept": "函数的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = x^2",
          "translation": "y 等于 x 的平方：x 每取一个确定值，y 都有唯一的值与它对应"
        },
        {
          "id": "f2",
          "latex": "(-2)^2 = 2^2 = 4",
          "translation": "负 2 和 2 的平方都是 4：两个 x 对应同一个 y，仍然是函数"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": -3,
            "max": 3,
            "step": 1,
            "initial": 0
          },
          "views": [
            {
              "kind": "readout",
              "expr": "x^2",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^2"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "x=2 与 x=−2 都对应 y=4：多对一仍是函数；一个 x 对应两个 y 则不是。",
        "x 每取一个确定值（在允许范围内），y 都有唯一确定的值与之对应。"
      ],
      "examples": [
        {
          "text": "身份证号→人：一一对应；班级→班主任：多对一",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch06-u1-l1-p1b",
      "next": "ch06-u1-l2-p1b"
    },
    {
      "id": "ch06-u1-l2-p1b",
      "title": "函数：一个 x 一个 y",
      "concept": "讲解：函数的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "y^2 = x",
          "translation": "x=4 时 y=2 或 y=−2：一个 x 对应两个 y，不是函数"
        },
        {
          "id": "f2",
          "latex": "y = x^2",
          "translation": "x=±2 都对应 y=4：多对一，是函数"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 1,
            "label": "x",
            "max": 4,
            "min": 0,
            "step": 1
          },
          "views": [
            {
              "expr": "x^2",
              "kind": "readout",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x^2"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "函数铁律：一个 x 只许对应一个 y；反过来多个 x 对应一个 y 没问题。",
        "y²=x 不是函数：x=4 时 y 有两个值，“唯一”被打破了。"
      ],
      "examples": [
        {
          "figure": "辨析",
          "text": "圆 x²+y²=1 不是函数图像：一竖线交出两个点，唯一性被打破。"
        }
      ],
      "prev": "ch06-u1-l2-p1",
      "next": "ch06-u1-l3-p1"
    }
  ]
};
