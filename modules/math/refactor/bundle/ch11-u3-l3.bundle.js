window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch11-u3-l3"] = {
  "lessonId": "ch11-u3-l3",
  "lessonTitle": "最值",
  "chapterId": "ch11",
  "pages": [
    {
      "id": "ch11-u3-l3-p1",
      "title": "闭区间最值：端点也参选",
      "concept": "最值",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\max_{-1 \\leq x \\leq 2} x^2 = 4",
          "translation": "最大值是 4：在端点 x=2 处取到——端点也要参选"
        },
        {
          "id": "f2",
          "latex": "\\min_{-1 \\leq x \\leq 2} x^2 = 0",
          "translation": "最小值是 0：在驻点 x=0 处取到"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -1,
          "max": 2,
          "step": 0.25,
          "label": "x",
          "expr": "x^2",
          "target": 4,
          "targetLabel": "最大值在哪",
          "graph": {
            "kind": "zero"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "zero"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 x 扫 [-1,2]：最高点在端点 x=2，最低点在驻点 x=0。",
        "闭区间找最值三步：求驻点、算端点值、比大小。"
      ],
      "examples": [
        {
          "text": "关门打狗：不能只看极值，区间端点的值也要比",
          "figure": "滑块实验"
        }
      ],
      "prev": "ch11-u3-l2-p1b",
      "next": "ch11-u3-l3-p1b"
    },
    {
      "id": "ch11-u3-l3-p1b",
      "title": "最值：闭区间三步",
      "concept": "讲解：最值",
      "formulas": [
        {
          "id": "f1",
          "latex": "f(x) = x^3 - 3x",
          "translation": "区间 [−2,2]：驻点 x=±1"
        },
        {
          "id": "f2",
          "latex": "f(-2) = -2, f(-1) = 2",
          "translation": "端点 −2 处 −2，驻点 −1 处 2"
        },
        {
          "id": "f3",
          "latex": "f(1) = -2, f(2) = 2",
          "translation": "驻点 1 处 −2，端点 2 处 2：最大 2，最小 −2"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -2,
          "max": 2,
          "step": 0.25,
          "label": "x",
          "expr": "x^3-3*x",
          "target": 2,
          "targetLabel": "最大值 2 在哪",
          "graph": {
            "kind": "zero"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "zero"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "闭区间最值三步：求驻点；算驻点+端点的函数值；比大小。",
        "开区间没最值：(0,1) 上的 y=x 取不到 0 和 1。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=−x²+4x 在 [0,3]：驻点 x=2 处 4，端点 0、3：最大 4，最小 0。"
        }
      ],
      "prev": "ch11-u3-l3-p1",
      "next": "ch11-u3-l4-p1"
    }
  ]
};
