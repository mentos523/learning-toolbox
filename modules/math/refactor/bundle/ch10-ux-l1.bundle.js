window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-ux-l1"] = {
  "lessonId": "ch10-ux-l1",
  "lessonTitle": "第十章习题",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-ux-l1-p1",
      "title": "第十章习题：极限连续",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_n = 1 - \\frac{1}{2^n}",
          "translation": "第 3 题：Sₙ=1−1/2ⁿ→1"
        }
      ],
      "interaction": {
        "params": {
          "buttonLabel": "加一项",
          "maxSteps": 20,
          "mode": "accumulate",
          "showTrend": true,
          "term": "1/2^n"
        },
        "type": "numeric-lab"
      },
      "auxInteraction": null,
      "hints": [
        "1．lim(n→∞) 3/n=____。",
        "2．lim(n→∞) (1/3)ⁿ=____。",
        "3．Sₙ=1/2+1/4+…+1/2ⁿ，则 lim Sₙ=____。",
        "4．lim(x→2)(x²+1)=____。",
        "5．f(x)=(x²−4)/(x−2)，f 在 x=2 处____（连续/不连续）。",
        "6．用 ε-N 语言叙述 lim(n→∞)aₙ=A 的定义。"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：1．0；2．0；3．1；4．5；5．不连续（x=2 没定义）；6．∀ε>0，∃N，n>N 时 |aₙ−A|<ε"
        },
        {
          "figure": "错因解析",
          "text": "1．分子固定、分母→∞：3/n→0。2．|q|<1 时 qⁿ→0：(1/3)ⁿ→0。3．Sₙ=1−(1/2)ⁿ→1——等比求和公式再取极限。4．多项式函数连续：直接代入，4+1=5。5．x=2 时分母为 0，f(2) 没定义——连续要求“有定义”，故不连续。6．默写定义：∀ε>0，∃N，n>N 时 |aₙ−A|<ε——“无论多小，总追得上”。"
        }
      ],
      "prev": "ch10-ub-l1-p1b",
      "next": null
    }
  ]
};
