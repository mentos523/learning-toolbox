window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u2-l6"] = {
  "lessonId": "ch08-u2-l6",
  "lessonTitle": "互逆小结",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u2-l6-p1",
      "title": "互逆小结：指数与对数",
      "concept": "指数与对数互为反函数",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = a^x (a > 0, a \\neq 1)",
          "translation": "指数函数：y 等于 a 的 x 次方（a 大于 0 且 a 不为 1）"
        },
        {
          "id": "f2",
          "latex": "y = \\log_a x (a > 0, a \\neq 1, x > 0)",
          "translation": "对数函数：y 等于以 a 为底 x 的对数（a 大于 0 且 a 不为 1，x 大于 0）——指数函数的反函数"
        },
        {
          "id": "f3",
          "latex": "\\log_a (a^x) = x",
          "translation": "以 a 为底 a 的 x 次方的对数等于 x：先指数后对数，回到 x——互逆的铁证"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": -3,
              "max": 3,
              "step": 0.25,
              "label": "x",
              "expr": "2^x",
              "target": 8,
              "targetLabel": "目标 8（2³=8）"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": 0.2,
              "max": 8,
              "step": 0.2,
              "label": "x",
              "expr": "log2(x)",
              "target": 3,
              "targetLabel": "目标 3（log₂8=3）"
            }
          },
          "labels": [
            "指数之旅：x → 2ˣ（去程）",
            "对数之旅：x → log₂x（回程）"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "去程 x=3：2³=8；回程 x=8：log₂8=3。",
        "定义域值域互换：y=2ˣ 输出恒大于 0，即 y=log₂x 的输入（x>0）。"
      ],
      "examples": [
        {
          "text": "10²=100 与 lg100=2：常用对数是以 10 为底的特例",
          "figure": "并排对比"
        }
      ],
      "prev": "ch08-u2-l5-p1b",
      "next": "ch08-u2-l6-p1b"
    },
    {
      "id": "ch08-u2-l6-p1b",
      "title": "互逆小结：域值互换",
      "concept": "讲解：指数与对数互为反函数",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2^x: x \\in R, y > 0",
          "translation": "指数函数：x 任意实数，y 恒大于 0"
        },
        {
          "id": "f2",
          "latex": "y = \\log_2 x: x > 0, y \\in R",
          "translation": "对数函数：x 大于 0，y 任意实数——定义域值域互换"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "指数之旅：x→2ˣ（去程）",
            "对数之旅：x→log₂x（回程）"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "2^x",
              "label": "x",
              "max": 3,
              "min": -3,
              "step": 0.25,
              "target": 8,
              "targetLabel": "目标 8（2³=8）"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "log2(x)",
              "label": "x",
              "max": 8,
              "min": 0.2,
              "step": 0.2,
              "target": 3,
              "targetLabel": "目标 3（log₂8=3）"
            }
          }
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "互逆的两大表现：运算互逆（a^(logₐN)=N），定义域值域互换。",
        "记住一句话：指数管“乘方”，对数管“问几次方”。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=10ˣ 与 y=lgx：一个定义域 R，一个 x>0。"
        }
      ],
      "prev": "ch08-u2-l6-p1",
      "next": "ch08-u3-l1-p1"
    }
  ]
};
