window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u0-l1"] = {
  "lessonId": "ch06-u0-l1",
  "lessonTitle": "静与动：为什么需要函数",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u0-l1-p1",
      "title": "方程求解，函数看关系",
      "concept": "函数与方程的区别",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 2 = 5",
          "translation": "x 加 2 等于 5：方程——求一个确定的 x"
        },
        {
          "id": "f2",
          "latex": "y = x + 2",
          "translation": "y 等于 x 加 2：函数——x 动起来，y 跟着变"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": 0,
            "max": 5,
            "step": 0.5,
            "initial": 2
          },
          "views": [
            {
              "kind": "readout",
              "expr": "x + 2",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "x + 2"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖动 x：同一台机器“加 2”，x 滑过去 y 就跟着变。",
        "方程问“输出 5 时投入几”，函数问“投入变时输出怎么变”。",
        "预告回音：前一章说过，下一章这些直线会有新名字——一次函数。"
      ],
      "examples": [
        {
          "text": "自动售货机：投币 x 元，出货 y 件",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch05x-u3-l2-p1",
      "next": "ch06-u0-l1-p1b"
    },
    {
      "id": "ch06-u0-l1-p1b",
      "title": "方程求数，函数看关系",
      "concept": "讲解：函数与方程的区别",
      "formulas": [
        {
          "id": "f1",
          "latex": "3x = 12",
          "translation": "方程：求一个确定的 x=4"
        },
        {
          "id": "f2",
          "latex": "y = 3x",
          "translation": "函数：x 取 1 得 3，取 2 得 6——一串对应关系"
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
        "方程是“求数”：答案是一个数；函数是“看关系”：答案是一串对应。",
        "y=3x 里令 y=12，就变回方程 3x=12——函数是方程的“动态版”。",
        "预告回音：前一章说过，下一章这些直线会有新名字——一次函数。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "路程=速度×时间：速度 60 时 s=60t 是函数；s=120 时 t=2 是方程。"
        }
      ],
      "prev": "ch06-u0-l1-p1",
      "next": "ch06-u0-l1-p2"
    },
    {
      "id": "ch06-u0-l1-p2",
      "title": "机器的工作记录连成线",
      "concept": "函数图像的生成",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2x + 1",
          "translation": "y 等于 2x 加 1：这台机器的工作规则"
        },
        {
          "id": "f2",
          "latex": "(0, 1), (1, 3), (2, 5)",
          "translation": "三次工作记录：x 取 0、1、2 时，y 是 1、3、5"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "2*x + 1",
          "xMin": -2,
          "xMax": 2,
          "step": 0.5,
          "autoPlay": true,
          "speed": 800
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一个画一个：所有 (x, y) 工作记录连起来就是这条直线。",
        "函数图像 = 一台机器全部工作记录的画像。"
      ],
      "examples": [
        {
          "text": "快递轨迹：每个时刻的位置点连成路线图",
          "figure": "描点成像"
        }
      ],
      "prev": "ch06-u0-l1-p1b",
      "next": "ch06-u0-l1-p2b"
    },
    {
      "id": "ch06-u0-l1-p2b",
      "title": "图像：工作记录连成线",
      "concept": "讲解：函数图像的生成",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = x + 1",
          "translation": "机器规则：输出比输入大 1"
        },
        {
          "id": "f2",
          "latex": "(-1, 0), (0, 1), (1, 2)",
          "translation": "三条工作记录：描出来，连成线"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "x + 1",
          "speed": 800,
          "step": 0.5,
          "xMax": 2,
          "xMin": -2
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "图像=所有 (x,y) 点的集合：点越多，画像越清晰。",
        "直线只要两点就能定：但多描几个点，心里更踏实。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=−x+2：取 (0,2)、(2,0)，两点连线。"
        }
      ],
      "prev": "ch06-u0-l1-p2",
      "next": "ch06-u0-l2-p1"
    }
  ]
};
