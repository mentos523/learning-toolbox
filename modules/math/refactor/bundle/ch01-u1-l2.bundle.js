window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch01-u1-l2"] = {
  "lessonId": "ch01-u1-l2",
  "lessonTitle": "等式的性质",
  "chapterId": "ch01",
  "pages": [
    {
      "id": "ch01-u1-l2-p1",
      "title": "两边同时加减，天平还平吗？",
      "concept": "等式的性质1",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 3 = 8",
          "translation": "x 加 3 等于 8"
        },
        {
          "id": "f2",
          "latex": "x + 3 - 3 = 8 - 3",
          "translation": "x 加 3 减 3 等于 8 减 3"
        }
      ],
      "interaction": {
        "type": "balance-drag",
        "params": {
          "left": [
            {
              "kind": "unknown",
              "id": "x",
              "label": "x"
            },
            {
              "kind": "weight",
              "value": 3
            }
          ],
          "right": [
            {
              "kind": "weight",
              "value": 8
            }
          ],
          "goal": "两边同时拿走 3g 砝码，看天平还平不平",
          "rule": "等式两边加减同一个数，等式依然成立"
        }
      },
      "auxInteraction": {
        "type": "eq-graph",
        "params": {
          "min": 0,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "x + 3",
          "target": 8,
          "targetLabel": "x + 3 = 8 的解",
          "caption": "两边同减 3 后 x=5：解点在数轴上不动，变的只是写法"
        },
        "engine": {
          "primitive": "EqGraph",
          "version": "2026.10.16.A",
          "params": {
            "kind": "numberline",
            "expr": "x + 3",
            "target": 8
          }
        }
      },
      "hints": [
        "拖走左边 3g，右边也拖走 3g。",
        "天平没动：这就是等式的性质 1——两边加减同一个数，等式不变。"
      ],
      "examples": [
        {
          "text": "天平：两边同时减 3",
          "figure": "天平"
        }
      ],
      "prev": "ch01-u1-l1-p3b",
      "next": "ch01-u1-l2-p1b"
    },
    {
      "id": "ch01-u1-l2-p1b",
      "title": "性质 1：两边加减同一数",
      "concept": "讲解：等式的性质 1",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 7 = 15",
          "translation": "x 加 7 等于 15：想消掉 +7"
        },
        {
          "id": "f2",
          "latex": "x + 7 - 7 = 15 - 7",
          "translation": "两边同时减 7（性质 1）：+7−7 抵消"
        },
        {
          "id": "f3",
          "latex": "x = 8",
          "translation": "x 等于 8；验算 8+7=15，成立"
        }
      ],
      "interaction": {
        "params": {
          "goal": "两边同时拿走 7 个砝码，看天平还平不平",
          "left": [
            {
              "id": "x",
              "kind": "unknown",
              "label": "x"
            },
            {
              "kind": "weight",
              "value": 7
            }
          ],
          "right": [
            {
              "kind": "weight",
              "value": 15
            }
          ],
          "rule": "等式两边加减同一个数，等式依然成立"
        },
        "type": "balance-drag"
      },
      "auxInteraction": {
        "type": "eq-graph",
        "params": {
          "min": 0,
          "max": 16,
          "step": 1,
          "label": "x",
          "expr": "x + 7",
          "target": 15,
          "targetLabel": "x + 7 = 15 的解",
          "caption": "性质 1：两边加减同一数，解点在数轴上的位置不变"
        },
        "engine": {
          "primitive": "EqGraph",
          "version": "2026.10.16.A",
          "params": {
            "kind": "numberline",
            "expr": "x + 7",
            "target": 15
          }
        }
      },
      "hints": [
        "性质 1 专治“+几/−几”：等式两边加减同一个数，等式不变。",
        "移项就是性质 1 的快捷写法：+7 过等号变成 −7。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x−6=4：两边同加 6 得 x=10。加减看符号，缺什么补什么。"
        }
      ],
      "prev": "ch01-u1-l2-p1",
      "next": "ch01-u1-l2-p2"
    },
    {
      "id": "ch01-u1-l2-p2",
      "title": "两边同时乘除，天平还平吗？",
      "concept": "等式的性质2",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x = 10",
          "translation": "2 乘 x 等于 10"
        },
        {
          "id": "f2",
          "latex": "\\frac{2x}{2} = \\frac{10}{2}",
          "translation": "2 乘 x 除以 2 等于 10 除以 2"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "2*x",
          "target": 10,
          "targetLabel": "2x = 10",
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
        "拖动滑块，找一找 2x = 10 时 x 是几。",
        "x = 5 时 2×5 = 10。这就是等式的性质 2：两边乘同一个数，或除以同一个不为 0 的数，等式不变。"
      ],
      "examples": [
        {
          "text": "滑块：找 2x = 10 的解",
          "figure": "滑块"
        }
      ],
      "prev": "ch01-u1-l2-p1b",
      "next": "ch01-u1-l2-p2b"
    },
    {
      "id": "ch01-u1-l2-p2b",
      "title": "性质 2：两边乘除同一数",
      "concept": "讲解：等式的性质 2",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{x}{3} = 4",
          "translation": "x 除以 3 等于 4：想消掉 ÷3"
        },
        {
          "id": "f2",
          "latex": "\\frac{x}{3} \\times 3 = 4 \\times 3",
          "translation": "两边同时乘 3（性质 2）：÷3×3 抵消"
        },
        {
          "id": "f3",
          "latex": "x = 12",
          "translation": "x 等于 12；验算 12÷3=4，成立"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 24,
          "step": 1,
          "label": "x",
          "expr": "x/3",
          "target": 4,
          "targetLabel": "x÷3 = 4",
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
        "性质 2 专治“×几/÷几”：两边乘除同一个不为 0 的数，等式不变。",
        "红线：除数不能是 0。0 不能做除数，这是全书通用的铁律。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "5x=20：两边同除以 5 得 x=4。乘除看系数，系数是几就除以几。"
        }
      ],
      "prev": "ch01-u1-l2-p2",
      "next": "ch01-u2-l1-p1"
    }
  ]
};
