window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch01-u2-l3"] = {
  "lessonId": "ch01-u2-l3",
  "lessonTitle": "方程的应用（一）：列方程",
  "chapterId": "ch01",
  "pages": [
    {
      "id": "ch01-u2-l3-p1",
      "title": "长方形：长比宽多 3",
      "concept": "列方程",
      "formulas": [
        {
          "id": "f1",
          "latex": "2(2x + 3) = 26",
          "translation": "2 乘以 2x 加 3 的和等于 26"
        },
        {
          "id": "f2",
          "latex": "x = 5",
          "translation": "x 等于 5"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "2*(2*x + 3)",
          "target": 26,
          "targetLabel": "周长 = 26 厘米",
          "unit": "厘米",
          "graph": {
            "kind": "numberline"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "numberline"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "第一步：设宽为 x，则长为 x+3。",
        "第二步：找等量关系——周长 = 2×(长+宽)，列出 2(2x+3) = 26。"
      ],
      "examples": [
        {
          "text": "设未知数、找等量关系",
          "figure": "滑块"
        }
      ],
      "prev": "ch01-u2-l2-p2b",
      "next": "ch01-u2-l3-p1b"
    },
    {
      "id": "ch01-u2-l3-p1b",
      "title": "列方程：设、找、列三步走",
      "concept": "讲解：列方程解应用题",
      "formulas": [
        {
          "id": "f1",
          "latex": "2(x + x + 5) = 34",
          "translation": "设宽为 x，则长为 x+5；等量关系：周长=2×(长+宽)"
        },
        {
          "id": "f2",
          "latex": "x + x + 5 = 17",
          "translation": "两边同除以 2：先把最外层拆开"
        },
        {
          "id": "f3",
          "latex": "x = 6",
          "translation": "2x=12 得 x=6；长是 11；验算 2×(6+11)=34"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 12,
          "step": 0.5,
          "label": "x",
          "expr": "2*(x + x + 5)",
          "target": 34,
          "targetLabel": "周长 = 34 厘米",
          "unit": "厘米",
          "graph": {
            "kind": "numberline"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "numberline"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "列方程三步：设未知数；找等量关系（题中“共”“是”后面的话）；列式求解。",
        "设谁有讲究：一般设题目最后问的那个，解出来直接就能答。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "小明看书：看了 20 页还剩 35 页。设全书 x 页：x−20=35，x=55。"
        }
      ],
      "prev": "ch01-u2-l3-p1",
      "next": "ch01-u2-l4-p1"
    }
  ]
};
