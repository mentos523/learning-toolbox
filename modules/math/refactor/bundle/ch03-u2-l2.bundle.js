window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch03-u2-l2"] = {
  "lessonId": "ch03-u2-l2",
  "lessonTitle": "分式的加减",
  "chapterId": "ch03",
  "pages": [
    {
      "id": "ch03-u2-l2-p1",
      "title": "异分母相加：先通分",
      "concept": "分式的加减（通分）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{1}{2} + \\frac{1}{3} = \\frac{5}{6}",
          "translation": "二分之一加三分之一等于六分之五：先通分再相加"
        },
        {
          "id": "f2",
          "latex": "\\frac{1}{x} + \\frac{1}{2x} = \\frac{3}{2x}",
          "translation": "x 分之一加 2x 分之一等于 2x 分之三"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "1/x + 1/(2*x)"
        }
      },
      "auxInteraction": null,
      "hints": [
        "1/x = 2/(2x)：把分母都变成 2x（最简公分母），再把分子相加。",
        "和分数加法一模一样：先找公分母，再加减分子，分母不动。"
      ],
      "examples": [
        {
          "text": "1/2+1/3 通分成 3/6+2/6 的翻版",
          "figure": "滑块"
        }
      ],
      "prev": "ch03-u2-l1-p1b",
      "next": "ch03-u2-l2-p1b"
    },
    {
      "id": "ch03-u2-l2-p1b",
      "title": "通分：化成相同分母",
      "concept": "讲解：通分",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{2}{x} + \\frac{3}{2x}",
          "translation": "分母 x 和 2x：最简公分母是 2x"
        },
        {
          "id": "f2",
          "latex": "\\frac{4}{2x} + \\frac{3}{2x}",
          "translation": "2/x 分子分母同乘 2：变成 4/(2x)"
        },
        {
          "id": "f3",
          "latex": "\\frac{7}{2x}",
          "translation": "同分母了：分子 4+3=7，分母不动"
        }
      ],
      "interaction": {
        "params": {
          "expr": "2/x + 3/(2*x)",
          "label": "x",
          "max": 10,
          "min": 1,
          "step": 1
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "通分=找最简公分母：系数取最小公倍数，字母取最高次幂。",
        "通分不改变值：分子乘几，分母必须乘几。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "1/a+1/b：最简公分母 ab，通分成 b/ab+a/ab=(a+b)/ab。"
        }
      ],
      "prev": "ch03-u2-l2-p1",
      "next": "ch03-u2-l2-p2"
    },
    {
      "id": "ch03-u2-l2-p2",
      "title": "同分母：分子直接加减",
      "concept": "分式的加减（法则）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{5}{x} - \\frac{2}{x} = \\frac{3}{x}",
          "translation": "x 分之 5 减 x 分之 2 等于 x 分之 3"
        },
        {
          "id": "f2",
          "latex": "\\frac{a}{c} + \\frac{b}{c} = \\frac{a+b}{c}",
          "translation": "同分母相加：分子相加，分母不变"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "5/x - 2/x"
        }
      },
      "auxInteraction": null,
      "hints": [
        "分母相同，分子直接加减：5 个 1/x 减 2 个 1/x，还剩 3 个 1/x。",
        "结果还能约分一定要约到最简：这是分式运算的收尾动作。"
      ],
      "examples": [
        {
          "text": "5 个 1/x 减 2 个 1/x，还剩 3 个 1/x",
          "figure": "滑块"
        }
      ],
      "prev": "ch03-u2-l2-p1b",
      "next": "ch03-u2-l2-p2b"
    },
    {
      "id": "ch03-u2-l2-p2b",
      "title": "加减：分母不动算分子",
      "concept": "讲解：同分母分式加减",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{3x + 1}{x} - \\frac{x + 1}{x}",
          "translation": "同分母：分母 x 不动，分子相减"
        },
        {
          "id": "f2",
          "latex": "\\frac{3x + 1 - (x + 1)}{x}",
          "translation": "分子是多项式相减：(x+1) 整体减，必须添括号"
        },
        {
          "id": "f3",
          "latex": "\\frac{2x}{x} = 2",
          "translation": "=2x/x=2：还能约分，一定要约干净"
        }
      ],
      "interaction": {
        "params": {
          "expr": "(3*x + 1)/x - (x + 1)/x",
          "label": "x",
          "max": 10,
          "min": 1,
          "step": 1
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "分子是多项式相减时添括号：−(x+1)=−x−1，漏括号是重灾区。",
        "收尾动作：结果能约分必须约到最简。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(2a+1)/a−1/a=2a/a=2：分子 2a+1−1=2a，再约分。"
        }
      ],
      "prev": "ch03-u2-l2-p2",
      "next": "ch03-u2-l3-p1"
    }
  ]
};
