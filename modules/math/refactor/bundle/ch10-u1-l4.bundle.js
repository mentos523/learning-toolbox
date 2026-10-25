window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-u1-l4"] = {
  "lessonId": "ch10-u1-l4",
  "lessonTitle": "常见数列的极限",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-u1-l4-p1",
      "title": "1/n 与 qⁿ：都趋向 0",
      "concept": "常见数列极限",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\lim_{n \\to \\infty} \\frac{1}{n} = 0",
          "translation": "1/n 的极限是 0：分母越大，分数越小"
        },
        {
          "id": "f2",
          "latex": "\\lim_{n \\to \\infty} q^n = 0 (|q| < 1)",
          "translation": "qⁿ 的极限是 0（|q|<1）：每次乘 q，越乘越小"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": 1,
              "max": 20,
              "step": 1,
              "label": "n",
              "expr": "1/n"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": 1,
              "max": 20,
              "step": 1,
              "label": "n",
              "expr": "(1/2)^n"
            }
          },
          "sync": [
            "n"
          ],
          "labels": [
            "1/n → 0：慢速趋近",
            "(1/2)ⁿ → 0：快速趋近"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖一边另一边同步：两列都→0，但 (1/2)ⁿ 快得多。",
        "|q|<1 是条件：q=1 时恒为 1，q=−1 时来回跳，都不→0。"
      ],
      "examples": [
        {
          "text": "两种'变小'：1/n 是爬楼梯式，(1/2)ⁿ 是跳水式",
          "figure": "并排对比"
        }
      ],
      "prev": "ch10-u1-l3-p1b",
      "next": "ch10-u1-l4-p1b"
    },
    {
      "id": "ch10-u1-l4-p1b",
      "title": "常见极限：记住三个",
      "concept": "讲解：常见数列极限",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\lim_{n \\to \\infty} \\frac{1}{n^k} = 0 (k > 0)",
          "translation": "1/nᵏ→0：k>0"
        },
        {
          "id": "f2",
          "latex": "\\lim_{n \\to \\infty} (\\frac{2}{3})^n = 0",
          "translation": "(2/3)ⁿ→0：底数绝对值 <1"
        },
        {
          "id": "f3",
          "latex": "\\lim_{n \\to \\infty} (\\frac{3}{2})^n = \\infty",
          "translation": "(3/2)ⁿ→∞：底数 >1，爆炸"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "1/n → 0",
            "(1/2)ⁿ → 0"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "1/n",
              "label": "n",
              "max": 20,
              "min": 1,
              "step": 1
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "(1/2)^n",
              "label": "n",
              "max": 20,
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
        "三个必记：1/nᵏ→0（k>0），qⁿ→0（|q|<1），qⁿ→∞（q>1）。",
        "|q|=1 是分界：q=1 恒为 1，q=−1 来回跳，都不收敛。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(0.99)¹⁰⁰≈0.366：0.99ⁿ→0，只是慢。"
        }
      ],
      "prev": "ch10-u1-l4-p1",
      "next": "ch10-u2-l1-p1"
    }
  ]
};
