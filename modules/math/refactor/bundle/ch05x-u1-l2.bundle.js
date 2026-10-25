window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05x-u1-l2"] = {
  "lessonId": "ch05x-u1-l2",
  "lessonTitle": "代入消元法",
  "chapterId": "ch05x",
  "pages": [
    {
      "id": "ch05x-u1-l2-p1",
      "title": "代入：把 x 的“化身”送进第二个方程",
      "concept": "代入消元（直觉）",
      "formulas": [
        {
          "id": "f1",
          "latex": "x = 10 - y",
          "translation": "由①得：x 等于 10 减 y——x 的化身"
        },
        {
          "id": "f2",
          "latex": "2(10 - y) - y = 8",
          "translation": "送进②：2 乘 (10 减 y) 减 y 等于 8"
        },
        {
          "id": "f3",
          "latex": "20 - 3y = 8 \\Rightarrow y = 4, x = 6",
          "translation": "解得 y=4，回代得 x=6"
        }
      ],
      "interaction": {
        "type": "sys-steps",
        "params": {
          "steps": [
            {
              "text": "① x = 10 − y：x 的化身",
              "expr": "x",
              "value": "10 - y"
            },
            {
              "text": "② 2(10−y) − y = 8：化身送进第二个方程",
              "expr": "2*(10-y) - y",
              "target": 8
            },
            {
              "text": "③ 20 − 3y = 8 → y = 4：一元一次方程，会解了",
              "expr": "20 - 3*y",
              "target": 8
            },
            {
              "text": "④ x = 6：回代检验，代回①②都成立",
              "expr": "x + y",
              "target": 10
            }
          ],
          "sliders": [
            {
              "id": "y",
              "label": "y",
              "min": -10,
              "max": 10,
              "step": 1,
              "initial": 4
            }
          ],
          "derived": [
            {
              "id": "x",
              "expr": "10 - y",
              "label": "x = 10 − y"
            }
          ],
          "caption": "拖 y，看 x 的化身如何变化——变形前后①还是同一条直线，交点不变"
        },
        "engine": {
          "primitive": "SysSteps",
          "version": "2026.10.16.A",
          "params": {
            "steps": 4
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "代入的本质：用一个方程把 x 表示出来，送进另一个方程消掉 x。",
        "变形前后①式还是同一条直线——等价变形不改变交点。",
        "拖 y 到 4：x=6，读数 2×6−4=8 命中——检验语义：拖看第一式、读数看第二式。"
      ],
      "examples": [
        {
          "text": "检验清单：代入① ✓、代入② ✓——两个都要验。",
          "figure": "清单"
        }
      ],
      "prev": "ch05x-u1-l1-p2",
      "next": "ch05x-u1-l2-p2"
    },
    {
      "id": "ch05x-u1-l2-p2",
      "title": "代入法三步：变形→代入→回代检验",
      "concept": "代入消元（推导）",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + y = 10",
          "translation": "例①：x+y=10"
        },
        {
          "id": "f2",
          "latex": "2x + y = 14",
          "translation": "例②：2x+y=14"
        },
        {
          "id": "f3",
          "latex": "x = 10 - y \\Rightarrow 2(10-y) + y = 14",
          "translation": "变形→代入：一元一次方程"
        },
        {
          "id": "f4",
          "latex": "y = 6, x = 4",
          "translation": "解得 y=6，回代得 x=4；检验：4+6=10，8+6=14 ✓"
        }
      ],
      "interaction": {
        "type": "sys-lab",
        "params": {
          "sliders": [
            {
              "id": "x",
              "label": "x",
              "min": -10,
              "max": 10,
              "step": 1,
              "initial": 4
            }
          ],
          "derived": [
            {
              "id": "y",
              "expr": "10 - x",
              "label": "y 由①式导出：y = 10 − x"
            }
          ],
          "readouts": [
            {
              "expr": "2*x + y - 14",
              "target": 0,
              "label": "第二式余数",
              "okText": "✓ 命中：x=4 是解",
              "noText": "拖 x 到 4 试试"
            }
          ],
          "note": "例 {x+y=10, 2x+y=14}，解 (4,6)：拖 x 到 4 时 y=6，读数 2×4+6=14 命中"
        },
        "engine": {
          "primitive": "SysLab",
          "version": "2026.10.16.A",
          "params": {
            "sliders": [
              "x"
            ],
            "derived": [
              "y"
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "y 由①式导出：拖 x，y 自动跟着变——这就是代入。",
        "检验清单：代入① ✓（4+6=10）、代入② ✓（8+6=14）。",
        "代入法的合法性来自 ch01 等式性质：等价变形不改变解。"
      ],
      "examples": [
        {
          "text": "三步口诀：变形（把一个未知数表示出来）→代入（送进另一个方程）→回代检验。",
          "figure": "口诀"
        }
      ],
      "prev": "ch05x-u1-l2-p1",
      "next": "ch05x-u2-l1-p1"
    }
  ]
};
