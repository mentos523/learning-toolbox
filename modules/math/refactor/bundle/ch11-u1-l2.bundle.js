window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch11-u1-l2"] = {
  "lessonId": "ch11-u1-l2",
  "lessonTitle": "瞬时变化率与导数",
  "chapterId": "ch11",
  "pages": [
    {
      "id": "ch11-u1-l2-p1",
      "title": "h→0：平均变化率趋向 2",
      "concept": "导数的极限定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "f'(1) = \\lim_{h \\to 0} \\frac{(1+h)^2 - 1}{h}",
          "translation": "导数定义：h→0 时平均变化率的极限——y=x² 在 x=1 处的导数"
        },
        {
          "id": "f2",
          "latex": "\\lim_{h \\to 0} \\frac{(1+h)^2 - 1}{h} = 2",
          "translation": "算出来是 2：h=1, 0.1, 0.01 时得 3, 2.1, 2.01，越来越靠近 2"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0.01,
          "max": 1,
          "step": 0.01,
          "label": "h",
          "expr": "((1+h)^2-1)/h"
        }
      },
      "auxInteraction": null,
      "hints": [
        "把 h 往左拖到最小：读数 3→2.1→2.01→…，它在逼近 2。",
        "'h→0'不是让 h 等于 0（分母不能为 0），而是'无限靠近 0'。"
      ],
      "examples": [
        {
          "text": "时速表：某一瞬间的速度就是位移函数的导数",
          "figure": "滑块实验"
        }
      ],
      "prev": "ch11-u1-l1-p1b",
      "next": "ch11-u1-l2-p1b"
    },
    {
      "id": "ch11-u1-l2-p1b",
      "title": "h→0：区间缩成一点",
      "concept": "讲解：导数的极限定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "h = 1: \\frac{2^2 - 1}{1} = 3",
          "translation": "h=1：平均变化率 3"
        },
        {
          "id": "f2",
          "latex": "h = 0.01: 2.01",
          "translation": "h=0.01：2.01"
        },
        {
          "id": "f3",
          "latex": "h \\to 0: 2",
          "translation": "h→0：趋向 2——这就是 f'(1)"
        }
      ],
      "interaction": {
        "params": {
          "expr": "((1+h)^2-1)/h",
          "label": "h",
          "max": 1,
          "min": 0.01,
          "step": 0.01
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "h 是区间长度：h 越小，平均变化率越接近瞬时变化率。",
        "h→0 不是 h=0：分母不能为 0，是“无限靠近”。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "时速表：h 是 1 小时→1 分钟→1 秒，越来越“瞬时”。"
        }
      ],
      "prev": "ch11-u1-l2-p1",
      "next": "ch11-u1-l3-p1"
    }
  ]
};
