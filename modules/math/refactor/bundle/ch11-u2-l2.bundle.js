window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch11-u2-l2"] = {
  "lessonId": "ch11-u2-l2",
  "lessonTitle": "求导法则",
  "chapterId": "ch11",
  "pages": [
    {
      "id": "ch11-u2-l2-p1",
      "title": "积的导数≠导数的积",
      "concept": "积法则",
      "formulas": [
        {
          "id": "f1",
          "latex": "(f + g)' = f' + g'",
          "translation": "和差法则：分别求导再相加减——最省心的一条"
        },
        {
          "id": "f2",
          "latex": "(f \\cdot g)' = f' g + f g'",
          "translation": "积法则：'前导后不导'加'前不导后导'——不是 f'·g'"
        },
        {
          "id": "f3",
          "latex": "(\\frac{f}{g})' = \\frac{f' g - f g'}{g^2}",
          "translation": "商法则：分子'上导下不导减上不导下导'，分母 g²（g≠0）"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": 0.5,
              "max": 3,
              "step": 0.5,
              "label": "x",
              "expr": "2*x*sin(x)+x^2*cos(x)"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": 0.5,
              "max": 3,
              "step": 0.5,
              "label": "x",
              "expr": "2*x*cos(x)"
            }
          },
          "sync": [
            "x"
          ],
          "labels": [
            "积法则：(x²·sin x)'=2x·sin x+x²·cos x",
            "错法：f'·g'=2x·cos x"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖滑块：两边读数对不上——'分别求导再相乘'是错的。",
        "口诀：积法则'各导一次再相加'；商法则分母是 g²，减号别写成加号。"
      ],
      "examples": [
        {
          "text": "(x²·x³)'=5x⁴：积法则得 2x·x³+x²·3x=5x⁴，对得上",
          "figure": "并排对比"
        }
      ],
      "prev": "ch11-u2-l1-p1b",
      "next": "ch11-u2-l2-p1b"
    },
    {
      "id": "ch11-u2-l2-p1b",
      "title": "积法则商法则：口诀",
      "concept": "讲解：积法则与商法则",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x^2 \\cdot x^3)' = 5x^4",
          "translation": "积法则：2x·x³+x²·3x=5x⁴"
        },
        {
          "id": "f2",
          "latex": "(\\frac{x^2}{x})' = 1",
          "translation": "商法则：(2x·x−x²·1)/x²=1——其实就是 (x)'"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "积法则",
            "错法 f'·g'"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "2*x*sin(x)+x^2*cos(x)",
              "label": "x",
              "max": 3,
              "min": 0.5,
              "step": 0.5
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "2*x*cos(x)",
              "label": "x",
              "max": 3,
              "min": 0.5,
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
        "积法则：前导后不导 + 前不导后导；商法则：上导下不导 − 上不导下导，除以 g²。",
        "商法则的减号是命：写成加号就全错。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(x·eˣ)'=eˣ+x·eˣ=(1+x)eˣ。"
        }
      ],
      "prev": "ch11-u2-l2-p1",
      "next": "ch11-u2-l3-p1"
    }
  ]
};
