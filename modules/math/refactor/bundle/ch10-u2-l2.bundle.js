window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-u2-l2"] = {
  "lessonId": "ch10-u2-l2",
  "lessonTitle": "极限的运算法则",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-u2-l2-p1",
      "title": "极限法则：和可拆开算",
      "concept": "极限的四则运算",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\lim_{n \\to \\infty} (a_n + b_n) = \\lim_{n \\to \\infty} a_n + \\lim_{n \\to \\infty} b_n",
          "translation": "和的极限 = 极限的和：差、积、商也一样（商要求分母极限≠0）"
        },
        {
          "id": "f2",
          "latex": "\\lim_{n \\to \\infty} (1 + \\frac{1}{n}) = 1 + 0 = 1",
          "translation": "右栏 = 左栏 +1：极限 1+0=1——拆开算，结果一样"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": 1,
              "max": 30,
              "step": 1,
              "label": "n",
              "expr": "1/n"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": 1,
              "max": 30,
              "step": 1,
              "label": "n",
              "expr": "1+1/n"
            }
          },
          "sync": [
            "n"
          ],
          "labels": [
            "a_n = 1/n → 0",
            "a_n + 1 → 0 + 1 = 1"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "两栏同步拖：左→0，右→1——右栏永远比左栏大 1。",
        "法则就是'拆开算'：先各求极限，再加减乘除。"
      ],
      "examples": [
        {
          "text": "分装：lim(2/n+3)=2·lim(1/n)+3=3",
          "figure": "并排对比"
        }
      ],
      "prev": "ch10-u2-l1-p1b",
      "next": "ch10-u2-l2-p1b"
    },
    {
      "id": "ch10-u2-l2-p1b",
      "title": "极限法则：拆开算",
      "concept": "讲解：极限的运算法则",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\lim_{n \\to \\infty} \\frac{2n + 1}{n}",
          "translation": "分子分母同除以 n"
        },
        {
          "id": "f2",
          "latex": "= \\lim_{n \\to \\infty} (2 + \\frac{1}{n}) = 2",
          "translation": "=2+0=2：拆开算"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "1/n → 0",
            "(2n+1)/n → 2"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "1/n",
              "label": "n",
              "max": 30,
              "min": 1,
              "step": 1
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "(2*n+1)/n",
              "label": "n",
              "max": 30,
              "min": 1,
              "step": 1
            }
          },
          "sync": [
            "n"
          ]
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "法则=拆开算：和差积商的极限=极限的和差积商。",
        "商法则红线：分母的极限不能是 0。",
        "声明：这四条法则对函数极限同样成立——ch11 求导时拆 lim_{h→0}，依据就是这一页。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "lim(3n²+1)/(2n²)=3/2：分子分母同除 n²。"
        }
      ],
      "prev": "ch10-u2-l2-p1",
      "next": "ch10-u2-l3-p1"
    }
  ]
};
