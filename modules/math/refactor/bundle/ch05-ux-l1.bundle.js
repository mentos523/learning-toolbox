window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05-ux-l1"] = {
  "lessonId": "ch05-ux-l1",
  "lessonTitle": "第五章习题",
  "chapterId": "ch05",
  "pages": [
    {
      "id": "ch05-ux-l1-p1",
      "title": "第五章习题：不等式",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "x(10 - x) \\leq 25",
          "translation": "第 6 题：x=5 时取最大值 25（正方形）"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "x*(10-x)",
          "target": 25,
          "targetLabel": "最大值 25（第 6 题）",
          "graph": {
            "kind": "vertex",
            "a": -1,
            "b": 10,
            "c": 0
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "vertex",
            "a": -1,
            "b": 10,
            "c": 0
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "1．用不等号填空：−3____−5。",
        "2．x−7>5 的解集是____。",
        "3．−3x<9 的解集是____。",
        "4．不等式组 x>1 且 x≤4 的解集是____。",
        "5．x²−9>0 的解集是____。",
        "6．周长 20 米的矩形，长 x 米宽 (10−x) 米，面积最大是____平方米。"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：1．>；2．x>12；3．x>−3；4．1<x≤4；5．x<−3 或 x>3；6．25 平方米"
        },
        {
          "figure": "错因解析",
          "text": "1．−3 在数轴上比 −5 更靠右：−3>−5。2．两边加 7：x>12。3．两边除以 −3：不等号反向，x>−3——除以负数必须反向。4．两个条件同时成立：1<x≤4。5．x²>9：|x|>3——x<−3 或 x>3。6．面积=x(10−x)=−x²+10x，顶点 x=5 时最大 25——正方形面积最大。"
        }
      ],
      "prev": "ch05-u2-l4-p1",
      "next": "ch05x-u1-l1-p1"
    }
  ]
};
