window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-ux-l1"] = {
  "lessonId": "ch02-ux-l1",
  "lessonTitle": "第二章习题",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-ux-l1-p1",
      "title": "第二章习题：整式与分解",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "(a + b)^2 = a^2 + 2ab + b^2",
          "translation": "本章核心公式之一：完全平方公式（第 7 题就用它口算）"
        }
      ],
      "interaction": {
        "params": {
          "initial": 4,
          "label": "x",
          "max": 8,
          "min": 1,
          "showGrid": true,
          "step": 1
        },
        "type": "shape-area"
      },
      "auxInteraction": null,
      "hints": [
        "1．−2x³y² 的系数是____，次数是____。",
        "2．计算：x⁴·x⁵=____；(x³)⁴=____。",
        "3．(x+6)(x−6)=____。",
        "4．(x−5)²=____。",
        "5．分解因式：4x²+8x=____。",
        "6．分解因式：x²+9x+20=____。",
        "7．用简便方法算：103²。"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：1．−2，5；2．x⁹，x¹²；3．x²−36；4．x²−10x+25；5．4x(x+2)；6．(x+4)(x+5)；7．10609"
        },
        {
          "figure": "错因解析",
          "text": "1．系数是数字因数 −2；次数是所有字母指数和：3+2=5。2．同底数幂相乘指数相加：4+5=9；幂的乘方指数相乘：3×4=12。3．平方差：(a+b)(a−b)=a²−b²——中间项抵消。4．(a−b)²=a²−2ab+b²：x²−10x+25——别漏中间 −10x。5．先提公因式 4x：4x²+8x=4x(x+2)——提完检查括号内不能再提。6．x²+(4+5)x+4×5：找和 9、积 20 的两数——4 和 5。7．103²=(100+3)²=10000+600+9=10609——完全平方公式速算。"
        }
      ],
      "prev": "ch02-u3-l5-p1",
      "next": null
    }
  ]
};
