window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u2-l3"] = {
  "lessonId": "ch06-u2-l3",
  "lessonTitle": "一次函数的性质",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u2-l3-p1",
      "title": "k 定上坡还是下坡",
      "concept": "一次函数的增减性",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2x + 1",
          "translation": "k=2 大于 0：x 增大时 y 也增大——上坡"
        },
        {
          "id": "f2",
          "latex": "y = -2x + 1",
          "translation": "k=−2 小于 0：x 增大时 y 减小——下坡"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": -2,
              "max": 5,
              "step": 0.5,
              "label": "x",
              "expr": "2*x + 1"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": -2,
              "max": 5,
              "step": 0.5,
              "label": "x",
              "expr": "-2*x + 1"
            }
          },
          "sync": [
            "x"
          ],
          "labels": [
            "上坡：y=2x+1",
            "下坡：y=−2x+1"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "两边同步拖 x：左边 y 跟着涨，右边 y 反而跌。",
        "k>0 递增（上坡），k<0 递减（下坡）；与 b 无关。"
      ],
      "examples": [
        {
          "text": "水池注水 vs 水池漏水：一个水位涨，一个水位跌",
          "figure": "并排对比"
        }
      ],
      "prev": "ch06-u2-l2-p1g",
      "next": "ch06-u2-l3-p1b"
    },
    {
      "id": "ch06-u2-l3-p1b",
      "title": "增减性：k 说了算",
      "concept": "讲解：一次函数的增减性",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = \\frac{1}{2}x",
          "translation": "k=1/2>0：x 每增 2，y 增 1——上坡"
        },
        {
          "id": "f2",
          "latex": "y = -3x",
          "translation": "k=−3<0：x 每增 1，y 减 3——下坡，又陡又急"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "上坡：y=x/2",
            "下坡：y=−3x"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "0.5*x",
              "label": "x",
              "max": 6,
              "min": 0,
              "step": 0.5
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "-3*x",
              "label": "x",
              "max": 6,
              "min": 0,
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
        "k>0 上坡，k<0 下坡；|k| 越大坡越陡。",
        "增减性与 b 无关：b 只管上下，不管坡向。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "y=−x+100 还是下坡：b=100 再大也救不了 k<0。"
        }
      ],
      "prev": "ch06-u2-l3-p1",
      "next": "ch06-u2-l4-p1"
    }
  ]
};
