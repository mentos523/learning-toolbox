window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch07-u2-l3"] = {
  "lessonId": "ch07-u2-l3",
  "lessonTitle": "本章小结",
  "chapterId": "ch07",
  "pages": [
    {
      "id": "ch07-u2-l3-p1",
      "title": "一图流：抛物线与双曲线",
      "concept": "本章知识串联",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = ax^2 + bx + c (a \\neq 0)",
          "translation": "二次函数：图像是抛物线，顶点是最高点或最低点（最值）"
        },
        {
          "id": "f2",
          "latex": "y = \\frac{k}{x} (k \\neq 0)",
          "translation": "反比例函数：图像是双曲线，x=0 是禁区，k 的符号定象限"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": -4,
              "max": 4,
              "step": 0.5,
              "label": "x",
              "expr": "x^2"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": -4,
              "max": 4,
              "step": 1,
              "label": "x",
              "expr": "6/x"
            }
          },
          "sync": [
            "x"
          ],
          "labels": [
            "二次函数 y=x²：抛物线",
            "反比例函数 y=6/x：双曲线"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "本章两条曲线：抛物线有顶点（管最值），双曲线有禁区（x≠0）。",
        "共同点：一个 x 对应唯一的 y；不同点：一个连成一片，一个断成两支。"
      ],
      "examples": [
        {
          "text": "同步拖 x：左边 y=x² 永远非负，右边 y=6/x 在 x=0 处显示“—”",
          "figure": "并排对比"
        }
      ],
      "prev": "ch07-u2-l2-p1b",
      "next": "ch07-ux-l1-p1"
    }
  ]
};
