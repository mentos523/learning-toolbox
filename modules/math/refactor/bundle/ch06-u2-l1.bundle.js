window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u2-l1"] = {
  "lessonId": "ch06-u2-l1",
  "lessonTitle": "正比例函数",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u2-l1-p1",
      "title": "正比例函数的图像：过原点的直线",
      "concept": "正比例函数的定义与图像",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = kx (k \\neq 0)",
          "translation": "y 等于 kx（k 不为 0）：正比例函数的定义；x 取 0 时 y 一定是 0，所以图像必过原点"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "k",
            "min": -3,
            "max": 3,
            "step": 0.5,
            "initial": 1
          },
          "views": [
            {
              "kind": "readout",
              "expr": "2*k",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "2",
              "yExpr": "2*k"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 k：直线绕原点转；k>0 上坡，k<0 下坡，|k| 越大越陡。",
        "k=0 时 y=0（x 轴），不是正比例函数（k≠0）。"
      ],
      "examples": [
        {
          "text": "匀速跑步：路程 = 速度 × 时间，过原点的直线",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch06-u1-l3-p1b",
      "next": "ch06-u2-l1-p1b"
    },
    {
      "id": "ch06-u2-l1-p1b",
      "title": "正比例：比值恒定",
      "concept": "讲解：正比例函数",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 3x",
          "translation": "k=3：x 翻倍，y 也翻倍"
        },
        {
          "id": "f2",
          "latex": "\\frac{y}{x} = 3",
          "translation": "比值恒为 3：这就是“正比例”"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 2,
            "label": "x",
            "max": 5,
            "min": 0,
            "step": 0.5
          },
          "views": [
            {
              "expr": "3*x",
              "kind": "readout",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "3*x"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "正比例=y/x 是定值：x 扩大几倍，y 也扩大几倍。",
        "图像必过原点：x=0 时 y=0，这是正比例最醒目的胎记。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "买苹果 5 元一斤：y=5x；x 斤 y 元。"
        }
      ],
      "prev": "ch06-u2-l1-p1",
      "next": "ch06-u2-l2-p1"
    }
  ]
};
