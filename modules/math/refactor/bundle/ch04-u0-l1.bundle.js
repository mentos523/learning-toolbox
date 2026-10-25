window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-u0-l1"] = {
  "lessonId": "ch04-u0-l1",
  "lessonTitle": "为什么需要二次方程",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-u0-l1-p1",
      "title": "扔出去的球，走出一条弯路",
      "concept": "二次关系的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "h = -5t^2 + 20t + 2",
          "translation": "h 等于负 5 t 平方加 20 t 加 2：t 秒时铅球的高度"
        },
        {
          "id": "f2",
          "latex": "t = 0 \\to h = 2",
          "translation": "t 等于 0 时 h 等于 2：出手高度是 2 米"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "t",
            "min": 0,
            "max": 4,
            "step": 0.1,
            "initial": 0
          },
          "views": [
            {
              "kind": "readout",
              "expr": "-5*t^2 + 20*t + 2",
              "label": "h"
            },
            {
              "kind": "point",
              "xExpr": "t",
              "yExpr": "-5*t^2 + 20*t + 2"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖动时间 t：高度 h 先升后降，点的轨迹是一条弯弯的弧线。",
        "一次方程的图像是直线——这条弯路，一次方程画不出来。"
      ],
      "examples": [
        {
          "text": "铅球、喷泉、投篮，走的都是这种弯路",
          "figure": "仪表盘"
        }
      ],
      "prev": null,
      "next": "ch04-u0-l1-p1b"
    },
    {
      "id": "ch04-u0-l1-p1b",
      "title": "铅球：h 先升后降",
      "concept": "讲解：二次关系的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "h = -5t^2 + 20t + 2",
          "translation": "t=0 时 h=2（出手高度）；t=2 时 h=22（最高点附近）"
        },
        {
          "id": "f2",
          "latex": "t = 4 \\to h = 2",
          "translation": "t=4 时 h 又回到 2：升到顶后，对称地落下来"
        }
      ],
      "interaction": {
        "params": {
          "expr": "-5*t^2 + 20*t + 2",
          "label": "t",
          "max": 4,
          "min": 0,
          "step": 0.1,
          "unit": "米"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "t=0 出手 2 米，t=2 升到 22 米，t=4 回到 2 米：先升后降。",
        "−5t² 是“往下拉”的力，20t 是“往上冲”的力：冲力先赢，后劲不足。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "喷泉的水、投出去的篮球，走的都是这种先升后降的弯路。"
        }
      ],
      "prev": "ch04-u0-l1-p1",
      "next": "ch04-u0-l1-p2"
    },
    {
      "id": "ch04-u0-l1-p2",
      "title": "点点成线：画出它的画像",
      "concept": "抛物线的描点生成",
      "formulas": [
        {
          "id": "f1",
          "latex": "(t, h)",
          "translation": "t 和 h 组成一个点：每一时刻铅球的位置"
        },
        {
          "id": "f2",
          "latex": "h = -5t^2 + 20t + 2",
          "translation": "把每个点连起来，得到这条曲线的画像"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "-5*x^2 + 20*x + 2",
          "xMin": 0,
          "xMax": 4,
          "step": 0.5,
          "autoPlay": true,
          "speed": 600
        }
      },
      "auxInteraction": null,
      "hints": [
        "自动逐点绘制：每个点都是某一时刻铅球的位置（横轴就是时间 t）。",
        "这条弯弯的曲线，就是 h = -5t² + 20t + 2 的画像——它叫抛物线。"
      ],
      "examples": [
        {
          "text": "描点法：列表、描点、连线三步画图像",
          "figure": "描点"
        }
      ],
      "prev": "ch04-u0-l1-p1b",
      "next": "ch04-u0-l1-p2b"
    },
    {
      "id": "ch04-u0-l1-p2b",
      "title": "描点三步：列表描点连线",
      "concept": "讲解：描点法画图像",
      "formulas": [
        {
          "id": "f1",
          "latex": "(0, 2), (1, 17), (2, 22)",
          "translation": "t=0、1、2 时的点：（时间，高度）"
        },
        {
          "id": "f2",
          "latex": "(3, 17), (4, 2)",
          "translation": "t=3、4 时的点：对称地落下来，(1,17) 与 (3,17) 对称"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "-5*x^2 + 20*x + 2",
          "speed": 600,
          "step": 0.5,
          "xMax": 4,
          "xMin": 0
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "描点三步：列表算出 (t,h)；在坐标系里描点；用平滑曲线连起来。",
        "点越多线越准：对称的点帮你找到顶点在 t=2。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "画 y=x²：取 x=−2,−1,0,1,2，得点 (−2,4),(−1,1),(0,0),(1,1),(2,4)。"
        }
      ],
      "prev": "ch04-u0-l1-p2",
      "next": "ch04-u1-l1-p1"
    }
  ]
};
