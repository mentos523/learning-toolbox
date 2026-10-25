window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch07-u2-l1"] = {
  "lessonId": "ch07-u2-l1",
  "lessonTitle": "反比例函数的图像",
  "chapterId": "ch07",
  "pages": [
    {
      "id": "ch07-u2-l1-p1",
      "title": "y=k/x：一个变大，另一个变小",
      "concept": "反比例函数的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = \\frac{k}{x} (k \\neq 0)",
          "translation": "y 等于 k 除以 x（k 不为 0）：反比例函数的定义，x 住在分母里"
        },
        {
          "id": "f2",
          "latex": "x \\neq 0",
          "translation": "x 不等于 0：分母不能为零，0 是定义域里的禁区"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": 1,
            "max": 12,
            "step": 1,
            "initial": 6
          },
          "views": [
            {
              "kind": "readout",
              "expr": "6/x",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "6/x"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 x：x 变大，y 变小——一个变大、另一个变小，这就是“反比”。",
        "k≠0 且 x≠0：k=0 时退化成常数函数，x=0 时分式无意义。"
      ],
      "examples": [
        {
          "text": "6 块披萨分给 x 个人：人越多，每人分得越少",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch07-u1-l4-p4d",
      "next": "ch07-u2-l1-p1b"
    },
    {
      "id": "ch07-u2-l1-p1b",
      "title": "反比例：xy=k 恒定",
      "concept": "讲解：反比例函数的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = \\frac{12}{x}",
          "translation": "xy=12：x 与 y 的乘积恒为 12"
        },
        {
          "id": "f2",
          "latex": "(2, 6), (3, 4), (4, 3)",
          "translation": "三组对应值：乘积都是 12"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 3,
            "label": "x",
            "max": 12,
            "min": 1,
            "step": 1
          },
          "views": [
            {
              "expr": "12/x",
              "kind": "readout",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "12/x"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "反比例=乘积定值：xy=k，x 扩大几倍，y 就缩小几倍。",
        "k≠0 且 x≠0：k=0 退化成 y=0，x=0 分母无意义。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "120 千米路程：速度 v 与时间 t 反比，vt=120。"
        }
      ],
      "prev": "ch07-u2-l1-p1",
      "next": "ch07-u2-l1-p2"
    },
    {
      "id": "ch07-u2-l1-p2",
      "title": "双曲线：关于原点对称的两支",
      "concept": "反比例函数的图像是双曲线",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = \\frac{6}{x}",
          "translation": "k=6 的图像：两支双曲线，一支在一象限，一支在三象限"
        },
        {
          "id": "f2",
          "latex": "f(-x) = -f(x)",
          "translation": "f(−x) 等于 −f(x)：把图像转 180°，与原来完全重合——关于原点对称"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "6/x",
          "xMin": -6,
          "xMax": 6,
          "step": 1,
          "autoPlay": true,
          "speed": 800
        }
      },
      "auxInteraction": null,
      "hints": [
        "点亮所有点：两支，x=0 是空的——中间的竖线是y轴，不是函数图像。",
        "k>0 时两支在一三象限；k<0 时在二四象限，k 的符号定象限。"
      ],
      "examples": [
        {
          "text": "k=−6 时：两支跑到二、四象限，形状一模一样",
          "figure": "描点成像"
        }
      ],
      "prev": "ch07-u2-l1-p1b",
      "next": "ch07-u2-l1-p2b"
    },
    {
      "id": "ch07-u2-l1-p2b",
      "title": "双曲线：k 定象限",
      "concept": "讲解：反比例函数的图像",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = \\frac{-4}{x}",
          "translation": "k=−4<0：两支在二、四象限"
        },
        {
          "id": "f2",
          "latex": "(2, -2), (-2, 2)",
          "translation": "点 (2,−2) 转 180° 到 (−2,2)：关于原点对称"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "-4/x",
          "speed": 800,
          "step": 1,
          "xMax": 6,
          "xMin": -6
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "k>0 一三象限，k<0 二四象限：k 的符号定象限。",
        "双曲线永远碰不到坐标轴：x=0、y=0 都是禁区。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=8/x：一三象限；y=−8/x：二四象限。"
        }
      ],
      "prev": "ch07-u2-l1-p2",
      "next": "ch07-u2-l2-p1"
    }
  ]
};
