window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-u1-l4"] = {
  "lessonId": "ch04-u1-l4",
  "lessonTitle": "因式分解法",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-u1-l4-p1",
      "title": "乘积为零，逐个击破",
      "concept": "因式分解法",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x+2)(x+3) = 0",
          "translation": "x 加 2 乘 x 加 3 等于 0：左边是两个因式的乘积"
        },
        {
          "id": "f2",
          "latex": "x + 2 = 0",
          "translation": "x 加 2 等于 0：第一个因式为零，得 x=−2"
        },
        {
          "id": "f3",
          "latex": "x + 3 = 0",
          "translation": "x 加 3 等于 0：第二个因式为零，得 x=−3"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -5,
          "max": 1,
          "step": 1,
          "label": "x",
          "expr": "(x+2)*(x+3)",
          "target": 0,
          "targetLabel": "乘积为 0",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": 5,
            "c": 6
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": 5,
            "c": 6
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "原理：若 A·B=0（A、B 为整式），则 A=0 或 B=0——乘积为零，必有一个因式为零。",
        "所以 x+2=0 或 x+3=0，得 x=−2 或 x=−3；拖动滑块验算。",
        "适用范围：先把方程化成一边为 0、另一边能分解的形式。"
      ],
      "examples": [
        {
          "text": "x²+5x+6=0 先拆成 (x+2)(x+3)=0",
          "figure": "滑块"
        }
      ],
      "prev": "ch04-u1-l3-p1b",
      "next": "ch04-u1-l4-p1b"
    },
    {
      "id": "ch04-u1-l4-p1b",
      "title": "因式分解法：先化一边为零",
      "concept": "讲解：因式分解法",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 - 3x = 0",
          "translation": "右边已经是 0：左边提公因式"
        },
        {
          "id": "f2",
          "latex": "x(x - 3) = 0",
          "translation": "x(x−3)=0：乘积为零"
        },
        {
          "id": "f3",
          "latex": "x = 0, x = 3",
          "translation": "x=0 或 x−3=0：得 x=0 或 x=3"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -1,
          "max": 4,
          "step": 1,
          "label": "x",
          "expr": "x*(x - 3)",
          "target": 0,
          "targetLabel": "乘积为 0",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": -3,
            "c": 0
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": -3,
            "c": 0
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "因式分解法两步：化成一边为 0；另一边分解成乘积。",
        "x²=3x 不能两边除以 x——x 可能是 0；移项分解才对。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x²−9=0：(x+3)(x−3)=0，x=3 或 x=−3。"
        }
      ],
      "prev": "ch04-u1-l4-p1",
      "next": "ch04-u2-l1-p1"
    }
  ]
};
