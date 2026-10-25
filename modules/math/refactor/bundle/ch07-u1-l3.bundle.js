window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch07-u1-l3"] = {
  "lessonId": "ch07-u1-l3",
  "lessonTitle": "二次函数的性质",
  "chapterId": "ch07",
  "pages": [
    {
      "id": "ch07-u1-l3-p1",
      "title": "顶点：对称轴穿过的地方",
      "concept": "顶点（对称轴与最值点）",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = (x-1)^2 - 3",
          "translation": "y 等于 (x−1) 的平方减 3：顶点 (1,−3)，对称轴是直线 x=1"
        },
        {
          "id": "f2",
          "latex": "x = 1",
          "translation": "对称轴 x=1：x=1+t 与 x=1−t 的函数值永远相等，抛物线左右镜像"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -2,
          "max": 4,
          "step": 0.5,
          "label": "x",
          "expr": "(x-1)^2-3",
          "target": -3,
          "targetLabel": "最小值 −3",
          "graph": {
            "kind": "vertex",
            "a": 1,
            "b": -2,
            "c": -2
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "vertex",
            "a": 1,
            "b": -2,
            "c": -2
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 x：x=1 时最小 −3；x=0 与 x=2 的值相等——关于 x=1 镜像。",
        "顶点是三合一：对称轴与抛物线的交点，也是最高/最低点。"
      ],
      "examples": [
        {
          "text": "对折纸：沿 x=1 对折，抛物线两边完全重合",
          "figure": "滑块"
        }
      ],
      "prev": "ch07-u1-l2-p2b",
      "next": "ch07-u1-l3-p1b"
    },
    {
      "id": "ch07-u1-l3-p1b",
      "title": "对称轴：对折重合的线",
      "concept": "讲解：对称轴与顶点",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = x^2 + 2x",
          "translation": "配方：(x+1)²−1，顶点 (−1,−1)"
        },
        {
          "id": "f2",
          "latex": "x = -1",
          "translation": "对称轴 x=−1：x=−1+t 与 x=−1−t 函数值相等"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -4,
          "max": 2,
          "step": 0.5,
          "label": "x",
          "expr": "(x+1)^2-1",
          "target": -1,
          "targetLabel": "最小值 −1",
          "graph": {
            "kind": "vertex",
            "a": 1,
            "b": 2,
            "c": 0
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "vertex",
            "a": 1,
            "b": 2,
            "c": 0
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "对称轴 x=h（顶点横坐标）：沿它对折，抛物线两边重合。",
        "对称轴公式：x=−b/(2a)——配方一次就记住它。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=x²−6x+5：对称轴 x=3，顶点 (3,−4)。"
        }
      ],
      "prev": "ch07-u1-l3-p1",
      "next": "ch07-u1-l4-p1"
    }
  ]
};
