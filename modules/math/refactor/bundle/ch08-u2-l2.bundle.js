window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u2-l2"] = {
  "lessonId": "ch08-u2-l2",
  "lessonTitle": "对数的概念",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u2-l2-p1",
      "title": "对数：2⁵=32 倒过来问",
      "concept": "对数是指数的逆运算",
      "formulas": [
        {
          "id": "f1",
          "latex": "2^5 = 32",
          "translation": "2 的 5 次方等于 32：顺着问——2 的 5 次方是几"
        },
        {
          "id": "f2",
          "latex": "\\log_2 32 = 5",
          "translation": "以 2 为底 32 的对数等于 5：倒着问——32 是 2 的几次方，对数是指数的逆运算"
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
          "target": 32,
          "targetLabel": "2⁵=32：x=5 即 log₂32=5",
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
        "拖 x：x=5 时“咔哒”锁定，2⁵=32——log₂32=5。",
        "对数是倒着问：log₂32 问的是“32 是 2 的几次方”。"
      ],
      "examples": [
        {
          "text": "一张纸对折 5 次，厚度变成 32 倍：log₂32=5——每对折一次，厚度就乘以 2",
          "figure": "滑块"
        }
      ],
      "prev": "ch08-u2-l1-p1b",
      "next": "ch08-u2-l2-p1b"
    },
    {
      "id": "ch08-u2-l2-p1b",
      "title": "对数：把指数请下来",
      "concept": "讲解：对数的概念",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\log_3 81",
          "translation": "问：81 是 3 的几次方？"
        },
        {
          "id": "f2",
          "latex": "\\log_3 81 = 4",
          "translation": "3⁴=81，所以是 4"
        },
        {
          "id": "f3",
          "latex": "\\log_5 1 = 0",
          "translation": "5⁰=1：1 的对数永远是 0"
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
          "target": 32,
          "targetLabel": "2⁵=32：x=5 即 log₂32=5",
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
        "对数三要素：底数、真数、结果。log₂32=5，底 2、真数 32、结果 5。",
        "logₐ1=0（a⁰=1），logₐa=1：两条永远对的结论。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "log₁₀1000=3（10³=1000）；lg 是以 10 为底的简写。"
        }
      ],
      "prev": "ch08-u2-l2-p1",
      "next": "ch08-u2-l3-p1"
    }
  ]
};
