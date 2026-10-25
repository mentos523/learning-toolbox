window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch07-u1-l1"] = {
  "lessonId": "ch07-u1-l1",
  "lessonTitle": "二次函数的图像",
  "chapterId": "ch07",
  "pages": [
    {
      "id": "ch07-u1-l1-p1",
      "title": "描点：把 y=x² 一个点一个点画出来",
      "concept": "二次函数的图像是抛物线",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = ax^2 + bx + c (a \\neq 0)",
          "translation": "y 等于 ax² 加 bx 加 c（a 不为 0）：二次函数的定义，x 的最高次是 2"
        },
        {
          "id": "f2",
          "latex": "y = x^2",
          "translation": "y 等于 x 平方：最简单的二次函数，它的图像就是这条抛物线"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "x^2",
          "xMin": -3,
          "xMax": 3,
          "step": 0.5,
          "autoPlay": true,
          "speed": 800
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一个亮一个：所有 (x, x²) 的点连成一条光滑的抛物线。",
        "a≠0 是底线：a=0 时退化成一次函数（b=0 时退化成常数函数）。"
      ],
      "examples": [
        {
          "text": "扔铅球的轨迹、喷泉的水柱，都是抛物线",
          "figure": "描点成像"
        }
      ],
      "prev": null,
      "next": "ch07-u1-l1-p1b"
    },
    {
      "id": "ch07-u1-l1-p1b",
      "title": "二次函数：最高两次方",
      "concept": "讲解：二次函数的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 3x^2 - 2x + 1",
          "translation": "a=3，b=−2，c=1：a≠0，是二次函数"
        },
        {
          "id": "f2",
          "latex": "y = 2x + 1",
          "translation": "反例：最高 1 次，是一次函数不是二次"
        },
        {
          "id": "f3",
          "latex": "y = x^3",
          "translation": "反例：最高 3 次，是三次函数"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "3*x^2 - 2*x + 1",
          "speed": 800,
          "step": 0.5,
          "xMax": 3,
          "xMin": -2
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "认二次函数看最高次：x 的最高指数是 2，且 a≠0。",
        "y=x²+1 是二次函数（b=0 可以缺）；y=2x²+x³ 不是（被三次项带偏）。"
      ],
      "examples": [
        {
          "figure": "辨析",
          "text": "y=(m+1)x²+3x−2 是二次函数，则 m≠−1。"
        }
      ],
      "prev": "ch07-u1-l1-p1",
      "next": "ch07-u1-l1-p2"
    },
    {
      "id": "ch07-u1-l1-p2",
      "title": "a 的符号定开口，大小定宽窄",
      "concept": "二次项系数 a 决定开口方向与宽窄",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = ax^2 (a \\neq 0)",
          "translation": "y 等于 a 乘 x 平方（a 不为 0）：a 叫二次项系数，管着抛物线的开口"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "a",
            "min": -3,
            "max": 3,
            "step": 0.5,
            "initial": 1
          },
          "views": [
            {
              "kind": "readout",
              "expr": "a*4",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "2",
              "yExpr": "a*4"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "看 x=2：a 为正时点在横轴上方——开口向上，反之向下；a=0 已不是二次函数。",
        "|a| 越大点离横轴越远：抛物线越“瘦”。"
      ],
      "examples": [
        {
          "text": "微笑（a>0）与哭脸（a<0）：开口方向一眼看穿",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch07-u1-l1-p1b",
      "next": "ch07-u1-l1-p2b"
    },
    {
      "id": "ch07-u1-l1-p2b",
      "title": "a：符号定开口大小定宽窄",
      "concept": "讲解：二次项系数 a",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2x^2",
          "translation": "a=2>0：开口向上；|a|=2，比 y=x² 瘦"
        },
        {
          "id": "f2",
          "latex": "y = -\\frac{1}{2}x^2",
          "translation": "a=−1/2<0：开口向下；|a|=1/2，比 y=x² 胖"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 2,
            "label": "a",
            "max": 3,
            "min": -3,
            "step": 0.5
          },
          "views": [
            {
              "expr": "a*4",
              "kind": "readout",
              "label": "x=2 时 y"
            },
            {
              "kind": "point",
              "xExpr": "2",
              "yExpr": "a*4"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "a>0 微笑（向上），a<0 哭脸（向下）。",
        "|a| 越大越瘦：a=3 的抛物线比 a=1 的“收”得更紧。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=−2x²：开口向下，比 y=−x² 瘦。"
        }
      ],
      "prev": "ch07-u1-l1-p2",
      "next": "ch07-u1-l2-p1"
    }
  ]
};
