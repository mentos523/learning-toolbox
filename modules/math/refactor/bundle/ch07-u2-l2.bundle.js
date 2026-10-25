window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch07-u2-l2"] = {
  "lessonId": "ch07-u2-l2",
  "lessonTitle": "反比例函数的性质",
  "chapterId": "ch07",
  "pages": [
    {
      "id": "ch07-u2-l2-p1",
      "title": "增减性：只能在每支内部比",
      "concept": "反比例函数的增减性",
      "formulas": [
        {
          "id": "f1",
          "latex": "k > 0",
          "translation": "k 大于 0 时：在 x>0 的一支和 x<0 的一支里，y 都随 x 增大而减小"
        },
        {
          "id": "f2",
          "latex": "k < 0",
          "translation": "k 小于 0 时：在每支内部，y 都随 x 增大而增大"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": -6,
              "max": 6,
              "step": 1,
              "label": "x",
              "expr": "6/x"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": -6,
              "max": 6,
              "step": 1,
              "label": "x",
              "expr": "-6/x"
            }
          },
          "sync": [
            "x"
          ],
          "labels": [
            "k=6>0",
            "k=−6<0"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 x：1→6 时 y 6→1，−6→−1 时 y 也下降——每支内部各自单调。",
        "别跨 x=0 比大小：禁区两边两个世界，单调在每支内部成立。"
      ],
      "examples": [
        {
          "text": "比较大小题的坑：先看两点在不在同一支上",
          "figure": "并排对比"
        }
      ],
      "prev": "ch07-u2-l1-p2b",
      "next": "ch07-u2-l2-p1b"
    },
    {
      "id": "ch07-u2-l2-p1b",
      "title": "增减性：别跨禁区比",
      "concept": "讲解：反比例函数的增减性",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = \\frac{4}{x}",
          "translation": "k=4>0：每支内部 y 随 x 增大而减小"
        },
        {
          "id": "f2",
          "latex": "x_1 = -2 < 1 = x_2",
          "translation": "但 y₁=−2 < 4=y₂：跨过禁区，“减小”失效"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "k=4>0",
            "k=−4<0"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "4/x",
              "label": "x",
              "max": 6,
              "min": -6,
              "step": 1
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "-4/x",
              "label": "x",
              "max": 6,
              "min": -6,
              "step": 1
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
        "增减性只在每支内部成立：比较前先看两点在不在同一支。",
        "经典坑：x₁<0<x₂ 时，y₁<y₂ 与 k 的符号无关——别套单调性。"
      ],
      "examples": [
        {
          "figure": "易错提醒",
          "text": "y=6/x 上 A(−1,−6)、B(2,3)：跨支，−6<3；同支内才用增减。"
        }
      ],
      "prev": "ch07-u2-l2-p1",
      "next": "ch07-u2-l3-p1"
    }
  ]
};
