window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-u1-l3"] = {
  "lessonId": "ch10-u1-l3",
  "lessonTitle": "ε-N 语言（严格版）",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-u1-l3-p1",
      "title": "ε-N（严格版）：任意 ε",
      "concept": "ε-N 定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\lim_{n \\to \\infty} a_n = A",
          "translation": "极限的记法：n 趋向无穷大时，a_n 趋向 A"
        },
        {
          "id": "f2",
          "latex": "|\\frac{1}{n} - 0| < 0.05 (n > 20)",
          "translation": "ε=0.05 的例证：n>20 时所有项与 0 的距离都小于 0.05"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 100,
          "step": 1,
          "label": "n",
          "expr": "1/n",
          "target": 0.05,
          "targetLabel": "ε=0.05：N=20（n>20 全进带子）"
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖到 n=20 咔哒：往后所有项全落进 ε=0.05 的带子。",
        "ε 越窄、N 越大——回上一页拖滑块 e，体验'任意 ε'。"
      ],
      "examples": [
        {
          "text": "极限的承诺：带子任意窄，我都找得到 N 来套住",
          "figure": "滑块"
        }
      ],
      "prev": "ch10-u1-l2-p1b",
      "next": "ch10-u1-l3-p1b"
    },
    {
      "id": "ch10-u1-l3-p1b",
      "title": "严格定义：∀ε∃N",
      "concept": "讲解：ε-N 严格定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\lim_{n \\to \\infty} \\frac{1}{n^2} = 0",
          "translation": "例：1/n²→0"
        },
        {
          "id": "f2",
          "latex": "\\frac{1}{n^2} < \\epsilon \\to n > \\frac{1}{\\sqrt{\\epsilon}}",
          "translation": "解出 N：n>1/√ε 时成立"
        }
      ],
      "interaction": {
        "params": {
          "expr": "1/n^2",
          "label": "n",
          "max": 100,
          "min": 1,
          "step": 1,
          "target": 0.01,
          "targetLabel": "ε=0.01：N=10"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "严格版=把“带子套点”写成数学：∀ε>0，∃N，n>N 时 |aₙ−A|<ε。",
        "做题套路：从 |aₙ−A|<ε 反解出 n>…，那个“…”就是 N。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "证 1/(2n)→0：1/(2n)<ε 得 n>1/(2ε)，取 N 为大于 1/(2ε) 的整数。"
        }
      ],
      "prev": "ch10-u1-l3-p1",
      "next": "ch10-u1-l4-p1"
    }
  ]
};
