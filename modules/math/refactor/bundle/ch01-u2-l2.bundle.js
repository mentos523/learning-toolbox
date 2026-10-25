window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch01-u2-l2"] = {
  "lessonId": "ch01-u2-l2",
  "lessonTitle": "去括号与去分母",
  "chapterId": "ch01",
  "pages": [
    {
      "id": "ch01-u2-l2-p1",
      "title": "2(x+3)：2 要乘给谁？",
      "concept": "去括号",
      "formulas": [
        {
          "id": "f1",
          "latex": "2(x + 3) = 14",
          "translation": "2 乘以 x 加 3 的和等于 14"
        },
        {
          "id": "f2",
          "latex": "2x + 6 = 14",
          "translation": "2 乘 x 加 6 等于 14"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "2*(x + 3)",
          "target": 14,
          "targetLabel": "2(x+3) = 14",
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
        "括号外的 2 要乘给括号里的每一项。",
        "2×x 得 2x，2×3 得 6：2(x+3) = 2x+6。这就是去括号。"
      ],
      "examples": [
        {
          "text": "拆包：2 袋 (x+3) 拆开是 2x+6",
          "figure": "滑块"
        }
      ],
      "prev": "ch01-u2-l1-p2b",
      "next": "ch01-u2-l2-p1b"
    },
    {
      "id": "ch01-u2-l2-p1b",
      "title": "去括号：括号外乘进来",
      "concept": "讲解：去括号",
      "formulas": [
        {
          "id": "f1",
          "latex": "3(x - 2) = 15",
          "translation": "3 乘以 x 减 2 的差等于 15"
        },
        {
          "id": "f2",
          "latex": "3x - 6 = 15",
          "translation": "3 乘给括号里每一项：3×x=3x，3×(−2)=−6"
        },
        {
          "id": "f3",
          "latex": "x = 7",
          "translation": "3x=21 得 x=7；验算 3×(7−2)=15"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 12,
          "step": 0.5,
          "label": "x",
          "expr": "3*(x - 2)",
          "target": 15,
          "targetLabel": "3(x−2) = 15",
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
        "括号外的数是快递员：括号里每一项都要送到，不许漏掉谁。",
        "符号陷阱：−2(x+3)=−2x−6，负号也要乘进去，别只乘数字。"
      ],
      "examples": [
        {
          "figure": "易错提醒",
          "text": "−(x−5)=2：去括号得 −x+5=2，x=3。负号开头最容易错。"
        }
      ],
      "prev": "ch01-u2-l2-p1",
      "next": "ch01-u2-l2-p2"
    },
    {
      "id": "ch01-u2-l2-p2",
      "title": "分母 2 太碍事，乘掉它",
      "concept": "去分母",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{x}{2} + 1 = 5",
          "translation": "x 除以 2 加 1 等于 5"
        },
        {
          "id": "f2",
          "latex": "x + 2 = 10",
          "translation": "x 加 2 等于 10"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 20,
          "step": 1,
          "label": "x",
          "expr": "x/2 + 1",
          "target": 5,
          "targetLabel": "x/2 + 1 = 5",
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
        "分母是 2，两边同乘 2。",
        "x/2×2 = x，1×2 = 2：分母消失了。这就是去分母，用的是等式的性质 2。"
      ],
      "examples": [
        {
          "text": "去分母：两边同乘 2",
          "figure": "滑块"
        }
      ],
      "prev": "ch01-u2-l2-p1b",
      "next": "ch01-u2-l2-p2b"
    },
    {
      "id": "ch01-u2-l2-p2b",
      "title": "去分母：两边同乘最小公倍数",
      "concept": "讲解：去分母",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{x}{2} + \\frac{x}{3} = 5",
          "translation": "x 除以 2 加 x 除以 3 等于 5：分母是 2 和 3"
        },
        {
          "id": "f2",
          "latex": "3x + 2x = 30",
          "translation": "两边同乘 6（2 和 3 的最小公倍数）：每一项都乘，分母全消失"
        },
        {
          "id": "f3",
          "latex": "x = 6",
          "translation": "5x=30 得 x=6；验算 6÷2+6÷3=3+2=5"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 12,
          "step": 0.5,
          "label": "x",
          "expr": "x/2 + x/3",
          "target": 5,
          "targetLabel": "x/2+x/3 = 5",
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
        "去分母三步：找分母的最小公倍数；两边同乘；每一项都乘。",
        "第一杀手是漏乘：常数项也要乘 6，漏了等式就变了。"
      ],
      "examples": [
        {
          "figure": "易错提醒",
          "text": "x/4−1=x/6：同乘 12 得 3x−12=2x，x=12。注意 −1 也要乘 12。"
        }
      ],
      "prev": "ch01-u2-l2-p2",
      "next": "ch01-u2-l3-p1"
    }
  ]
};
