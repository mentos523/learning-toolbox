window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch03-u2-l4"] = {
  "lessonId": "ch03-u2-l4",
  "lessonTitle": "本章小结",
  "chapterId": "ch03",
  "pages": [
    {
      "id": "ch03-u2-l4-p1",
      "title": "一图流：分式全家桶",
      "concept": "本章小结",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{x^2-1}{x-1} = x + 1",
          "translation": "x 平方减 1 除以 x 减 1 等于 x 加 1：分子分母约掉 x 减 1"
        },
        {
          "id": "f2",
          "latex": "x \\neq 1",
          "translation": "但 x 不能等于 1：约分不改变“分母不为零”的铁律"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 2,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "(x^2 - 1)/(x - 1)"
        }
      },
      "auxInteraction": null,
      "hints": [
        "本章一条线：分母含字母 → 分母≠0 → 约分通分 → 乘除/加减 → 去分母解方程 → 检验增根。",
        "所有运算最后都要问两句：还能约分吗？分母为零了吗？"
      ],
      "examples": [
        {
          "text": "约分前后，禁区 x=1 一直都在",
          "figure": "滑块"
        }
      ],
      "prev": "ch03-u2-l3-p2b",
      "next": "ch03-ux-l1-p1"
    }
  ]
};
