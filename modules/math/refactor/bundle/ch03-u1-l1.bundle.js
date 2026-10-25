window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch03-u1-l1"] = {
  "lessonId": "ch03-u1-l1",
  "lessonTitle": "分式的定义",
  "chapterId": "ch03",
  "pages": [
    {
      "id": "ch03-u1-l1-p1",
      "title": "分母里住进了字母",
      "concept": "分式的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{3}{4}",
          "translation": "四分之三：普通的分数，分母是数字"
        },
        {
          "id": "f2",
          "latex": "\\frac{3}{x}",
          "translation": "x 分之三：分母是字母 x，它就是分式"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "12/x"
        }
      },
      "auxInteraction": null,
      "hints": [
        "一般地，A、B 是两个整式，B 含有字母时，A÷B 写成 A/B 的形式，就叫做分式；A 叫分子，B 叫分母。",
        "拖动滑块：分母 x 在变，值跟着变——字母住进分母，分数就升级成了分式。"
      ],
      "examples": [
        {
          "text": "12 块披萨分给 x 个人，每人 12/x 块",
          "figure": "滑块"
        }
      ],
      "prev": null,
      "next": "ch03-u1-l1-p1b"
    },
    {
      "id": "ch03-u1-l1-p1b",
      "title": "分式：只看分母有没有字母",
      "concept": "讲解：分式的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{1}{2}",
          "translation": "二分之一：分母是数字，只是分数"
        },
        {
          "id": "f2",
          "latex": "\\frac{1}{a}",
          "translation": "a 分之一：分母是字母 a，它就是分式"
        },
        {
          "id": "f3",
          "latex": "\\frac{x + 1}{2}",
          "translation": "分母是 2（数字）：不是分式，是整式——认分式只看分母"
        }
      ],
      "interaction": {
        "params": {
          "expr": "12/x",
          "label": "x",
          "max": 10,
          "min": 1,
          "step": 1
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "认分式只看分母：分母里有字母才是分式，分子有没有字母无所谓。",
        "π 是数字不是字母：2/π 是分数不是分式，别被希腊字母骗了。",
        "这里的『分子』『分母』，指分式中分数线上方、下方的代数式（在分数中则是上方、下方的数）；它与化学、物理里构成物质的微粒『分子』只是同名，含义无关，不要按粒子义理解分式。"
      ],
      "examples": [
        {
          "figure": "辨析",
          "text": "x/5 不是分式（分母是 5）；5/x 是分式；(x+1)/(x−1) 是分式。"
        }
      ],
      "prev": "ch03-u1-l1-p1",
      "next": "ch03-u1-l1-p2"
    },
    {
      "id": "ch03-u1-l1-p2",
      "title": "分母不能为零",
      "concept": "分式有意义的条件",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{5}{x-2}",
          "translation": "5 除以 x 减 2：分母是 x 减 2"
        },
        {
          "id": "f2",
          "latex": "x - 2 \\neq 0",
          "translation": "x 减 2 不等于 0：分式有意义的条件"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -2,
          "max": 6,
          "step": 1,
          "label": "x",
          "expr": "x - 2",
          "target": 0,
          "targetLabel": "分母为零的点",
          "graph": {
            "kind": "rational",
            "forbidAt": []
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "rational",
            "forbidAt": []
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖到 x=2：分母变成 0，这个点是数轴上的“禁区”，要挖去。",
        "分式有意义 ⟺ 分母 ≠ 0；先找到禁区，再谈计算。"
      ],
      "examples": [
        {
          "text": "x=2 是禁区：5 除以 0 没有意义",
          "figure": "滑块"
        }
      ],
      "prev": "ch03-u1-l1-p1b",
      "next": "ch03-u1-l1-p2b"
    },
    {
      "id": "ch03-u1-l1-p2b",
      "title": "禁区：让分母等于零的 x",
      "concept": "讲解：分式有意义的条件",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{6}{x + 3}",
          "translation": "6 除以 x 加 3：分母是 x+3"
        },
        {
          "id": "f2",
          "latex": "x + 3 \\neq 0",
          "translation": "有意义的条件：分母 x+3 不等于 0"
        },
        {
          "id": "f3",
          "latex": "x \\neq -3",
          "translation": "禁区：x=−3，数轴上这个点要挖去"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -6,
          "max": 2,
          "step": 1,
          "label": "x",
          "expr": "x + 3",
          "target": 0,
          "targetLabel": "禁区：分母为零",
          "graph": {
            "kind": "rational",
            "forbidAt": []
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "rational",
            "forbidAt": []
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "求禁区一步：令分母=0，解出来的 x 就是禁区。",
        "分式题第一问永远是“有意义”：先找禁区，再谈计算。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "1/(2x−4)：令 2x−4=0 得 x=2，禁区是 2。"
        }
      ],
      "prev": "ch03-u1-l1-p2",
      "next": "ch03-u1-l2-p1"
    }
  ]
};
