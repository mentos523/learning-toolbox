window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05x-u3-l1"] = {
  "lessonId": "ch05x-u3-l1",
  "lessonTitle": "方程组的解 = 两条直线的交点",
  "chapterId": "ch05x",
  "pages": [
    {
      "id": "ch05x-u3-l1-p1",
      "title": "每条方程都是一条直线",
      "concept": "二元一次方程的图像",
      "formulas": [
        {
          "id": "f1",
          "latex": "ax + by = c \\Rightarrow y = \\frac{c - a x}{b}",
          "translation": "ax+by=c（b≠0）→ y=(c−ax)/b：每条方程都是一条直线"
        },
        {
          "id": "f2",
          "latex": "k = -\\frac{a}{b}, \\quad b_0 = \\frac{c}{b}",
          "translation": "写成 y=kx+b：k=−a/b，常数项=c/b"
        }
      ],
      "interaction": {
        "type": "sys-lab",
        "params": {
          "sliders": [
            {
              "id": "a",
              "label": "a",
              "min": -5,
              "max": 5,
              "step": 1,
              "initial": 1
            },
            {
              "id": "b",
              "label": "b",
              "min": -5,
              "max": 5,
              "step": 1,
              "initial": 1
            },
            {
              "id": "c",
              "label": "c",
              "min": -12,
              "max": 12,
              "step": 1,
              "initial": 10
            },
            {
              "id": "x",
              "label": "x",
              "min": -8,
              "max": 8,
              "step": 1,
              "initial": 0
            }
          ],
          "derived": [
            {
              "id": "y",
              "expr": "(c - a*x)/b",
              "label": "y = (c − a·x)/b"
            },
            {
              "id": "k",
              "expr": "-a/b",
              "label": "k = −a/b"
            }
          ],
          "point": {
            "xExpr": "x",
            "yExpr": "(c - a*x)/b",
            "xRange": [
              -8,
              8
            ],
            "yRange": [
              -12,
              12
            ],
            "caption": "点 (x, y) 在直线上走"
          },
          "guard": {
            "when": "b == 0",
            "message": "b=0 时禁用：先保证 b≠0——此时方程是竖直线 x=c/a，写不成 y=kx+b 的样子"
          },
          "note": "x 滑块 −8~8（与取景对齐）；b=0 时方程变成 x=c/a，是竖直线，同样有无数组解"
        },
        "engine": {
          "primitive": "SysLab",
          "version": "2026.10.16.A",
          "params": {
            "sliders": [
              "a",
              "b",
              "c",
              "x"
            ],
            "guard": "b!=0"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "b=0 时方程变成 x=c/a，是竖直线，同样有无数组解（x 固定、y 任意），只是写不成 y=kx+b 的样子。",
        "k、b 都是由你拖动的 a、b、c 算出来的：k=−a/b、常数项=c/b。",
        "下一章你会给这些直线起新名字——一次函数。"
      ],
      "examples": [
        {
          "text": "亲手算：拖 a、b、c，看 k=−a/b 如何变化。",
          "figure": "探索"
        }
      ],
      "prev": "ch05x-u2-l1-p2",
      "next": "ch05x-u3-l1-p2"
    },
    {
      "id": "ch05x-u3-l1-p2",
      "title": "方程组的解 = 两条直线交点的坐标",
      "concept": "图像法解方程组",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + y = 10",
          "translation": "运行例①：x+y=10"
        },
        {
          "id": "f2",
          "latex": "2x - y = 8",
          "translation": "运行例②：x+y=10，2x−y=8"
        },
        {
          "id": "f3",
          "latex": "x_0 = \\frac{c_1 b_2 - b_1 c_2}{D}, \\quad y_0 = \\frac{a_1 c_2 - c_1 a_2}{D}",
          "translation": "克拉默法则：D=a₁b₂−a₂b₁≠0 时交点坐标公式"
        },
        {
          "id": "f4",
          "latex": "(6, 4)",
          "translation": "解 = 交点坐标 (6,4)：代数⟷几何双向读"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "graph": {
            "kind": "system2x2",
            "coeffs": {
              "a1": 1,
              "b1": 1,
              "c1": 10,
              "a2": 2,
              "b2": -1,
              "c2": 8
            },
            "ranges": {
              "ab": {
                "min": -5,
                "max": 5,
                "step": 1
              },
              "c": {
                "min": -12,
                "max": 12,
                "step": 1
              }
            },
            "presets": [
              {
                "label": "相交",
                "coeffs": {
                  "a1": 1,
                  "b1": 1,
                  "c1": 10,
                  "a2": 2,
                  "b2": -1,
                  "c2": 8
                }
              },
              {
                "label": "平行",
                "coeffs": {
                  "a1": 1,
                  "b1": 1,
                  "c1": 4,
                  "a2": 1,
                  "b2": 1,
                  "c2": 7
                }
              },
              {
                "label": "重合",
                "coeffs": {
                  "a1": 1,
                  "b1": 1,
                  "c1": 4,
                  "a2": 2,
                  "b2": 2,
                  "c2": 8
                }
              }
            ],
            "showD": true
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "system2x2",
            "mode": "coeffs"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "方程组的解 = 两条直线交点的坐标。",
        "改系数→交点动；拖交点→读出解，还反写 c——双向绑定。",
        "上面的方程组也变了：拖交点后 c 可以是小数——直线平移不要求 c 是整数。",
        "图上读出来的是近似值（比如 5.99）；要精确解，用 u1、u2 的代入/加减法算。",
        "试一试：把交点拖到 (2,1) 附近，两个方程里的常数项 c 会跟着变——拖交点，也是在改方程组。"
      ],
      "examples": [
        {
          "text": "ch04 其实也是在解方程组——{y=抛物线, y=0}，只是一条边恰好是横轴；这里两条边都是一般的直线。",
          "figure": "衔接"
        }
      ],
      "prev": "ch05x-u3-l1-p1",
      "next": "ch05x-u3-l1-p3"
    },
    {
      "id": "ch05x-u3-l1-p3",
      "title": "三种位置，三种解：相交 / 平行 / 重合",
      "concept": "解的个数与直线位置",
      "formulas": [
        {
          "id": "f1",
          "latex": "D \\neq 0 \\Rightarrow \\text{交于一点} \\Rightarrow \\text{唯一解}",
          "translation": "D≠0 → 相交 → 唯一解"
        },
        {
          "id": "f2",
          "latex": "D = 0 \\ \\text{且不成比例} \\Rightarrow \\text{平行} \\Rightarrow \\text{无解}",
          "translation": "D=0 且不成比例 → 平行 → 无解（如 {x+y=4, x+y=7} 得 4=7 矛盾）"
        },
        {
          "id": "f3",
          "latex": "D = 0 \\ \\text{且成比例} \\Rightarrow \\text{重合} \\Rightarrow \\text{无数组解}",
          "translation": "D=0 且成比例 → 重合 → 无数组解（如 {x+y=4, 2x+2y=8} 得 8=8 恒成立）"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "graph": {
            "kind": "system2x2",
            "coeffs": {
              "a1": 1,
              "b1": 1,
              "c1": 4,
              "a2": 1,
              "b2": 1,
              "c2": 7
            },
            "ranges": {
              "ab": {
                "min": -5,
                "max": 5,
                "step": 1
              },
              "c": {
                "min": -12,
                "max": 12,
                "step": 1
              }
            },
            "presets": [
              {
                "label": "相交",
                "coeffs": {
                  "a1": 1,
                  "b1": 1,
                  "c1": 10,
                  "a2": 2,
                  "b2": -1,
                  "c2": 8
                },
                "note": "唯一解 (6,4)"
              },
              {
                "label": "平行",
                "coeffs": {
                  "a1": 1,
                  "b1": 1,
                  "c1": 4,
                  "a2": 1,
                  "b2": 1,
                  "c2": 7
                },
                "note": "无解：两条直线永不相见"
              },
              {
                "label": "重合",
                "coeffs": {
                  "a1": 1,
                  "b1": 1,
                  "c1": 4,
                  "a2": 2,
                  "b2": 2,
                  "c2": 8
                },
                "note": "无数组解：其实是同一条直线"
              }
            ],
            "showD": true
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "system2x2",
            "mode": "coeffs"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "D≠0 → 相交 → 唯一解；D=0 时再看 c 是否成比例。",
        "判别式 D=a₁b₂−a₂b₁——它是两个方程的系数算出来的一个数，D≠0 时方程组有唯一解（与 ch04 用 Δ 看交点个数呼应）。",
        "三预设按钮：相交 / 平行 / 重合，一键切换看三种命运。",
        "p2 说方程组的解 = 两条直线交点的坐标，那是两直线相交的情形；现在看另外两种位置。"
      ],
      "examples": [
        {
          "text": "代数视角：用代入/加减法解平行的方程组（如 {x+y=4, x+y=7}），消元后得到 4=7 矛盾式（即 0=3）→ 无解；解重合的（如 {x+y=4, 2x+2y=8}），得到 8=8（即 0=0）恒成立 → 无数组解。",
          "figure": "代数"
        }
      ],
      "prev": "ch05x-u3-l1-p2",
      "next": "ch05x-u3-l2-p1"
    }
  ]
};
