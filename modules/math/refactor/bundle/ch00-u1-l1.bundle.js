window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch00-u1-l1"] = {
  "lessonId": "ch00-u1-l1",
  "lessonTitle": "从猜数字到天平",
  "chapterId": "ch00",
  "pages": [
    {
      "id": "ch00-u1-l1-p1",
      "title": "我想了一个数，加 5 得 12，它是几？",
      "concept": "未知数",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 5 = 12",
          "translation": "x 加 5 等于 12"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 20,
          "step": 1,
          "label": "x",
          "expr": "x + 5",
          "target": 12,
          "targetLabel": "目标 12",
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
        "如果这个数是 10369 呢？一个一个试太慢了。",
        "给\"还没知道的数\"起名叫 x：x + 5 = 12。这就是代数——先把问题写下来，再想办法解它。"
      ],
      "examples": [
        {
          "text": "猜数字：拖滑块找答案",
          "figure": "滑块"
        }
      ],
      "prev": null,
      "next": "ch00-u1-l1-p1b"
    },
    {
      "id": "ch00-u1-l1-p1b",
      "title": "x+5=12：一步步算出 x",
      "concept": "讲解：解 x+5=12",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 5 = 12",
          "translation": "x 加 5 等于 12：第一步，先把问题原样写下来"
        },
        {
          "id": "f2",
          "latex": "x = 12 - 5",
          "translation": "第二步，把 5 请到右边去：过等号要变号，加 5 变成减 5"
        },
        {
          "id": "f3",
          "latex": "x = 7",
          "translation": "第三步，算出来 x 等于 7；代回去验算：7+5=12，对了"
        }
      ],
      "interaction": {
        "params": {
          "goal": "把 x 单独留在左边",
          "left": [
            {
              "id": "x",
              "kind": "unknown",
              "label": "x"
            },
            {
              "kind": "weight",
              "value": 5
            }
          ],
          "right": [
            {
              "kind": "weight",
              "value": 12
            }
          ],
          "rule": "两边同时拿走同样多，天平依然平衡"
        },
        "type": "balance-drag"
      },
      "auxInteraction": {
        "type": "eq-graph",
        "params": {
          "min": 0,
          "max": 14,
          "step": 1,
          "label": "x",
          "expr": "x + 5",
          "target": 12,
          "targetLabel": "x + 5 = 12 的解",
          "caption": "天平上把 x 单独留下——解点在数轴上的位置"
        },
        "engine": {
          "primitive": "EqGraph",
          "version": "2026.10.16.A",
          "params": {
            "kind": "numberline",
            "expr": "x + 5",
            "target": 12
          }
        }
      },
      "hints": [
        "生活里到处是未知数：钱包花掉 5 元还剩 12 元，原来有几元？列式就是 x+5=12。",
        "验算是好习惯：把 7 代回原式，7+5=12 成立，答案就对了。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "变式：y+9=20，y 是几？（两边同减 9，得 y=11）"
        }
      ],
      "prev": "ch00-u1-l1-p1",
      "next": "ch00-u1-l1-p2"
    },
    {
      "id": "ch00-u1-l1-p2",
      "title": "= 是\"两边一样重\"，不是\"得出答案\"",
      "concept": "等式",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 3 = 8",
          "translation": "x 加 3 等于 8"
        },
        {
          "id": "f2",
          "latex": "x = 5",
          "translation": "x 等于 5"
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
          "goal": "把 x 单独留在左边",
          "rule": "两边同时拿走同样多，天平依然平衡"
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
          "caption": "等式 x+3=8 的解 x=5，在数轴上就是这个点"
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
        "你刚才做的，就是解方程 x + 3 = 8 的全过程。",
        "移项这些名词以后慢慢认，动作你已经会了。"
      ],
      "examples": [
        {
          "text": "天平：拖砝码保持平衡",
          "figure": "拖拽"
        }
      ],
      "prev": "ch00-u1-l1-p1b",
      "next": "ch00-u1-l1-p2b"
    },
    {
      "id": "ch00-u1-l1-p2b",
      "title": "天平解方程：两边同减 3",
      "concept": "讲解：等式性质解方程",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 3 = 8",
          "translation": "x 加 3 等于 8：天平两边一样重"
        },
        {
          "id": "f2",
          "latex": "x + 3 - 3 = 8 - 3",
          "translation": "两边同时拿走 3 个砝码，天平依然平衡"
        },
        {
          "id": "f3",
          "latex": "x = 5",
          "translation": "左边只剩 x 盒子，右边剩 5：x 等于 5"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "x + 3",
          "target": 8,
          "targetLabel": "等于 8",
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
        "记住一句话：方程两边做相同的事，等式不变——这是解方程唯一的规矩。",
        "易错：只给一边减 3 天平就歪了，两边必须同步动手。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "变式：x+6=13，两边同减 6 得 x=7；再想想 x−4=9 怎么办？"
        }
      ],
      "prev": "ch00-u1-l1-p2",
      "next": "ch00-ux-l1-p1"
    }
  ]
};
