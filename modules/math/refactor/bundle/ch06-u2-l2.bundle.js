window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u2-l2"] = {
  "lessonId": "ch06-u2-l2",
  "lessonTitle": "一次函数的图像",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u2-l2-p1",
      "title": "b 让直线上下平移",
      "concept": "一次函数的图像与平移",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = kx + b (k \\neq 0)",
          "translation": "y 等于 kx 加 b（k 不为 0）：一次函数的定义"
        },
        {
          "id": "f2",
          "latex": "(0, b)",
          "translation": "x 取 0 时 y 等于 b：直线与 y 轴交于 (0, b)，b 叫截距"
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
              "label": "k",
              "expr": "k*2 + 1"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": -3,
              "max": 3,
              "step": 0.5,
              "label": "b",
              "expr": "4 + b"
            }
          },
          "labels": [
            "k 转：b 固定为 1",
            "b 移：k 固定为 2"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "左拖 k 转直线，右拖 b 上下平移；b 是直线与 y 轴交点的纵坐标（截距）。",
        "左图 k=0 时是常数函数 y=1，不是一次函数（k≠0）。"
      ],
      "examples": [
        {
          "text": "打车费 S=8+2.5x：b=8 是起步价，直线不经过原点",
          "figure": "并排对比"
        }
      ],
      "prev": "ch06-u2-l1-p1b",
      "next": "ch06-u2-l2-p1b"
    },
    {
      "id": "ch06-u2-l2-p1b",
      "title": "截距 b：交 y 轴于 (0,b)",
      "concept": "讲解：一次函数的图像与截距",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2x - 3",
          "translation": "b=−3：交 y 轴于 (0,−3)"
        },
        {
          "id": "f2",
          "latex": "y = 2x + 1",
          "translation": "b=1：交 y 轴于 (0,1)；k 相同，两直线平行"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "y=2x−3",
            "y=2x+1"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "2*x - 3",
              "label": "x",
              "max": 4,
              "min": -2,
              "step": 0.5
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "2*x + 1",
              "label": "x",
              "max": 4,
              "min": -2,
              "step": 0.5
            }
          },
          "sync": [
            "x"
          ]
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "求 b 最快：令 x=0，y=b——直线与 y 轴的交点。",
        "k 相同则平行：y=2x−3 与 y=2x+1 永远不相交。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=−x+4：b=4，直线交 y 轴于 (0,4)。"
        }
      ],
      "prev": "ch06-u2-l2-p1",
      "next": "ch06-u2-l2-p1g"
    },
    {
      "id": "ch06-u2-l2-p1g",
      "title": "b 平移：直线上下搬家",
      "concept": "图形：b 的平移作用",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2x + 1",
          "translation": "b=1：与 y 轴交于 (0,1)"
        },
        {
          "id": "f2",
          "latex": "y = 2x + 3",
          "translation": "b=3（与 y=2x+1 比）：整条直线向上平移 2，k 不变所以平行"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "y=2x+1",
            "y=2x+3：向上平移 2"
          ],
          "left": {
            "kind": "plot-points",
            "params": {
              "autoPlay": true,
              "fn": "2*x + 1",
              "speed": 500,
              "step": 1,
              "xMax": 3,
              "xMin": -3
            }
          },
          "right": {
            "kind": "plot-points",
            "params": {
              "autoPlay": true,
              "fn": "2*x + 3",
              "speed": 500,
              "step": 1,
              "xMax": 3,
              "xMin": -3
            }
          }
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "两条直线同步描点：形状一模一样，只是上下错开 2。",
        "b 变化只平移不转动：k 相同，直线永远平行。"
      ],
      "examples": [
        {
          "figure": "数形结合",
          "text": "y=2x+1、y=2x−2、y=2x+5：一组平行线，只是 b 不同。"
        }
      ],
      "prev": "ch06-u2-l2-p1b",
      "next": "ch06-u2-l3-p1"
    }
  ]
};
