window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u2-l5"] = {
  "lessonId": "ch06-u2-l5",
  "lessonTitle": "本章小结",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u2-l5-p1",
      "title": "一图流：从机器到直线",
      "concept": "本章知识串联",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = kx + b (k \\neq 0)",
          "translation": "一次函数：k 定倾斜与增减，b 定上下位置"
        },
        {
          "id": "f2",
          "latex": "y = kx",
          "translation": "b=0 时退化为正比例函数，图像必过原点"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -2,
          "max": 5,
          "step": 0.5,
          "label": "x",
          "expr": "2*x + 1",
          "target": 0,
          "targetLabel": "y=0：交点",
          "graph": {
            "kind": "line"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "line"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "路线：机器（函数）→ 三种表示法 → 正比例 → 一次函数 → 大会师。",
        "记住 k 和 b 的分工：k 管倾斜增减，b 管上下位置。"
      ],
      "examples": [
        {
          "text": "y=2x+1 上拖 x：经过 y=0 时 x=−0.5，就是方程的解",
          "figure": "滑块"
        }
      ],
      "prev": "ch06-u2-l4-p1b",
      "next": "ch06-ux-l1-p1"
    }
  ]
};
