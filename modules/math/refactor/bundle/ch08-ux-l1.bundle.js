window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-ux-l1"] = {
  "lessonId": "ch08-ux-l1",
  "lessonTitle": "第八章习题",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-ux-l1-p1",
      "title": "第八章习题：指数对数",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "2^x = 8",
          "translation": "第 7 题：x=3；或取对数 x=log₂8=3"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 1,
          "max": 6,
          "step": 1,
          "label": "x",
          "expr": "2^x",
          "target": 8,
          "targetLabel": "2³=8（第 7 题）",
          "graph": {
            "kind": "exp"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "exp"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "1．2⁻⁴=____。",
        "2．27 的 1/3 次方=____。",
        "3．log₂64=____。",
        "4．lg1000=____。",
        "5．log₃27+log₃3=____。",
        "6．y=(1/2)ˣ 是____（增长/衰减）函数。",
        "7．方程 2ˣ=8 的解是____。"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：1．1/16；2．3；3．6；4．3；5．4（=log₃81）；6．衰减；7．x=3"
        },
        {
          "figure": "错因解析",
          "text": "1．2⁻⁴=1/2⁴=1/16——负指数即倒数。2．27 的 1/3 次方=³√27=3。3．2⁶=64：log₂64=6——“64 是 2 的几次方”。4．lg1000=log₁₀1000：10³=1000，得 3。5．同底对数相加=真数相乘：log₃(27×3)=log₃81=4。6．底数 1/2<1：指数函数衰减。7．8=2³：2ˣ=2³，x=3——化成同底再比指数。"
        }
      ],
      "prev": "ch08-u3-l3-p1",
      "next": null
    }
  ]
};
