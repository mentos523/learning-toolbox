window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05-u2-l3"] = {
  "lessonId": "ch05-u2-l3",
  "lessonTitle": "不等式的应用",
  "chapterId": "ch05",
  "pages": [
    {
      "id": "ch05-u2-l3-p1",
      "title": "周长固定，面积最大",
      "concept": "不等式求最值",
      "formulas": [
        {
          "id": "f1",
          "latex": "x(10-x) \\leq 25",
          "translation": "x 乘 10 减 x 小于等于 25：长加宽为 10 时，面积不超过 25"
        },
        {
          "id": "f2",
          "latex": "x = 5",
          "translation": "x 等于 5 时取到 25：长=宽=5，正方形面积最大"
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
          "targetLabel": "最大值 25",
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
        "设长为 x、宽为 10−x：拖滑块，找面积 x(10−x) 的最大值。",
        "结论：x=5 时面积最大 25——周长固定，正方形面积最大。"
      ],
      "examples": [
        {
          "text": "用 20 米篱笆围矩形菜地，怎么围面积最大？",
          "figure": "滑块"
        }
      ],
      "prev": "ch05-u2-l2-p1b",
      "next": "ch05-u2-l3-p1b"
    },
    {
      "id": "ch05-u2-l3-p1b",
      "title": "最值应用：和定积最大",
      "concept": "讲解：不等式求最值",
      "formulas": [
        {
          "id": "f1",
          "latex": "x(12 - x)",
          "translation": "设一边 x，另一边 12−x（周长 24）"
        },
        {
          "id": "f2",
          "latex": "x(12 - x) = 36 - (x - 6)^2",
          "translation": "配方：36−(x−6)²"
        },
        {
          "id": "f3",
          "latex": "x = 6",
          "translation": "平方项 ≥0：x=6 时面积最大 36，是正方形"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 12,
          "step": 1,
          "label": "x",
          "expr": "x*(12-x)",
          "target": 36,
          "targetLabel": "最大值 36",
          "graph": {
            "kind": "vertex",
            "a": -1,
            "b": 12,
            "c": 0
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "vertex",
            "a": -1,
            "b": 12,
            "c": 0
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "和固定的两数，越接近乘积越大：配方一眼看出最大值。",
        "x(12−x)=36−(x−6)²≤36：平方项非负，减它越小值越大。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "周长 20 的矩形：x(10−x)≤25，正方形时面积最大。"
        }
      ],
      "prev": "ch05-u2-l3-p1",
      "next": "ch05-u2-l4-p1"
    }
  ]
};
