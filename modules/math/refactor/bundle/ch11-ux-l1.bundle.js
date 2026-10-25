window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch11-ux-l1"] = {
  "lessonId": "ch11-ux-l1",
  "lessonTitle": "第十一章习题",
  "chapterId": "ch11",
  "pages": [
    {
      "id": "ch11-ux-l1-p1",
      "title": "第十一章习题：导数",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "f(x) = x^2",
          "translation": "第 7 题：驻点 x=0 处 0，端点 −1 处 1、3 处 9"
        }
      ],
      "interaction": {
        "params": {
          "expr": "x^2",
          "label": "x",
          "max": 3,
          "min": -1,
          "step": 0.25,
          "target": 9,
          "targetLabel": "最大值 9（第 7 题）"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "1．f(x)=x²，x 从 1 到 3 的平均变化率=____。",
        "2．(x⁴)'=____。",
        "3．(sin x)'=____，(cos x)'=____。",
        "4．(x²·eˣ)'=____。",
        "5．y=ln(2x) 的导数是____。",
        "6．f(x)=x³−3x 的递增区间是____。",
        "7．f(x)=x² 在 [−1,3] 上的最大值是____，最小值是____。"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：1．4；2．4x³；3．cos x，−sin x；4．(x²+2x)eˣ；5．1/x；6．(−∞,−1) 和 (1,+∞)；7．9，0"
        },
        {
          "figure": "错因解析",
          "text": "1．平均变化率=[f(3)−f(1)]/(3−1)=(9−1)/2=4。2．幂法则：(xⁿ)'=nxⁿ⁻¹——指数 4 提到前面，指数减 1。3．公式表：(sin x)'=cos x，(cos x)'=−sin x——后者别漏负号。4．积法则：(x²)'eˣ+x²(eˣ)'=2xeˣ+x²eˣ=(x²+2x)eˣ。5．链式法则：(ln u)'=1/u，u=2x，u'=2——(1/2x)×2=1/x。6．f'=3x²−3=3(x²−1)>0：x²>1——x<−1 或 x>1。7．f'=2x：驻点 x=0；比端点值 f(−1)=1、f(0)=0、f(3)=9——最大 9，最小 0。"
        }
      ],
      "prev": "ch11-u3-l4-p1",
      "next": null
    }
  ]
};
