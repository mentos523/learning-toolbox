window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch01-u2-l1"] = {
  "lessonId": "ch01-u2-l1",
  "lessonTitle": "移项与合并",
  "chapterId": "ch01",
  "pages": [
    {
      "id": "ch01-u2-l1-p1",
      "title": "x + 5 = 12：把 x 单独留下",
      "concept": "移项",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 5 = 12",
          "translation": "x 加 5 等于 12"
        },
        {
          "id": "f2",
          "latex": "x = 7",
          "translation": "x 等于 7"
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
              "value": 5
            }
          ],
          "right": [
            {
              "kind": "weight",
              "value": 12
            }
          ],
          "goal": "把 x 单独留在左边",
          "rule": "把 5 拖到右边的 12 上，两边同时减去 5"
        }
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
          "caption": "把 x 单独留下：解 x=7 在数轴上的位置"
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
        "试试把左边的 5 拖到右边的 12 上面松开。",
        "这就是\"移项\"的动作：+5 从左边搬到右边，变成了 −5。"
      ],
      "examples": [
        {
          "text": "天平：拖 5 去减 12",
          "figure": "拖拽"
        }
      ],
      "prev": "ch01-u1-l2-p2b",
      "next": "ch01-u2-l1-p1b"
    },
    {
      "id": "ch01-u2-l1-p1b",
      "title": "移项：搬家过等号要变号",
      "concept": "讲解：移项",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 8 = 3x",
          "translation": "x 加 8 等于 3x：x 在等号两边都有"
        },
        {
          "id": "f2",
          "latex": "8 = 3x - x",
          "translation": "把左边的 x 请到右边：+x 过等号变成 −x"
        },
        {
          "id": "f3",
          "latex": "x = 4",
          "translation": "8=2x 得 x=4；验算：4+8=12，3×4=12"
        }
      ],
      "interaction": {
        "params": {
          "goal": "把 x 都赶到一边，数字都赶到另一边",
          "left": [
            {
              "id": "x",
              "kind": "unknown",
              "label": "x"
            },
            {
              "kind": "weight",
              "value": 8
            }
          ],
          "right": [
            {
              "id": "x1",
              "kind": "unknown",
              "label": "x"
            },
            {
              "id": "x2",
              "kind": "unknown",
              "label": "x"
            },
            {
              "id": "x3",
              "kind": "unknown",
              "label": "x"
            }
          ],
          "rule": "从一边搬到另一边，+变−、−变+"
        },
        "type": "balance-drag"
      },
      "auxInteraction": {
        "type": "eq-graph",
        "params": {
          "min": 0,
          "max": 8,
          "step": 1,
          "label": "x",
          "expr": "2*x - 8",
          "target": 0,
          "targetLabel": "2x − 8 = 0 的解（x+8=3x 移项得）",
          "caption": "移项：+8 搬到右边变 −8，解 x=4 落在数轴这里"
        },
        "engine": {
          "primitive": "EqGraph",
          "version": "2026.10.16.A",
          "params": {
            "kind": "numberline",
            "expr": "2*x - 8",
            "target": 0
          }
        }
      },
      "hints": [
        "移项口诀：搬家过等号，+变−、−变+。",
        "习惯动作：含 x 的放一边，纯数字放另一边，再合并同类项。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "5x−6=3x+4：移项得 5x−3x=4+6，2x=10，x=5。"
        }
      ],
      "prev": "ch01-u2-l1-p1",
      "next": "ch01-u2-l1-p2"
    },
    {
      "id": "ch01-u2-l1-p2",
      "title": "2x + 3x：数盒子就行",
      "concept": "合并同类项",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x + 3x = 5x",
          "translation": "2 乘 x 加 3 乘 x 等于 5 乘 x"
        },
        {
          "id": "f2",
          "latex": "5x = 25",
          "translation": "5 乘 x 等于 25"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "2*x + 3*x",
          "target": 25,
          "targetLabel": "5x = 25",
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
        "2 盒 x 加 3 盒 x，一共 5 盒 x。",
        "同类项合并就是数盒子：2x+3x = 5x，字母和指数都不变。"
      ],
      "examples": [
        {
          "text": "盒子合并：2 盒 x 加 3 盒 x 是 5 盒 x",
          "figure": "滑块"
        }
      ],
      "prev": "ch01-u2-l1-p1b",
      "next": "ch01-u2-l1-p2b"
    },
    {
      "id": "ch01-u2-l1-p2b",
      "title": "同类项：长得一样才能并",
      "concept": "讲解：合并同类项",
      "formulas": [
        {
          "id": "f1",
          "latex": "3x + 4 + 5x = 20",
          "translation": "3x 加 4 加 5x 等于 20：先找同类项"
        },
        {
          "id": "f2",
          "latex": "8x + 4 = 20",
          "translation": "3x 与 5x 长得一样（字母同、指数同），合并得 8x；4 是单身数字不动"
        },
        {
          "id": "f3",
          "latex": "x = 2",
          "translation": "8x=16 得 x=2；验算 3×2+4+5×2=20"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 5,
          "step": 0.5,
          "label": "x",
          "expr": "3*x + 4 + 5*x",
          "target": 20,
          "targetLabel": "3x+4+5x = 20",
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
        "同类项两同：字母相同、指数相同；合并只加减系数，字母和指数都不变。",
        "2x 和 3y 不是同类项——苹果和梨不能直接装一袋。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "7a−3a+2a=12：合并得 6a=12，a=2。"
        }
      ],
      "prev": "ch01-u2-l1-p2",
      "next": "ch01-u2-l2-p1"
    }
  ]
};
