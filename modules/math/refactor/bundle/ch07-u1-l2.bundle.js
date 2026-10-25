window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch07-u1-l2"] = {
  "lessonId": "ch07-u1-l2",
  "lessonTitle": "顶点式",
  "chapterId": "ch07",
  "pages": [
    {
      "id": "ch07-u1-l2-p1",
      "title": "顶点式：顶点直接写在脸上",
      "concept": "顶点式的形式与几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = a(x-h)^2 + k (a \\neq 0)",
          "translation": "y 等于 a 乘 (x−h) 的平方加 k（a 不为 0）：顶点式，顶点就是 (h, k)，对称轴是 x=h"
        },
        {
          "id": "f2",
          "latex": "y = (x-2)^2 + 1",
          "translation": "y 等于 (x−2) 的平方加 1：a=1，h=2，k=1——顶点 (2,1)，开口向上"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": -4,
              "max": 4,
              "step": 0.5,
              "label": "x",
              "expr": "x^2"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": -4,
              "max": 4,
              "step": 0.5,
              "label": "x",
              "expr": "(x-2)^2+1"
            }
          },
          "sync": [
            "x"
          ],
          "labels": [
            "y=x²：顶点 (0,0)",
            "y=(x−2)²+1：顶点 (2,1)"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "同步拖 x：x=0 取 0，x=2 取 1——顶点从 (0,0) 搬到 (2,1)。",
        "顶点式是 y=x² 平移来的：h 管左右，k 管上下。"
      ],
      "examples": [
        {
          "text": "搬家：顶点 (0,0) 右移 2、上移 1，整条抛物线跟着走",
          "figure": "并排对比"
        }
      ],
      "prev": "ch07-u1-l1-p2b",
      "next": "ch07-u1-l2-p1b"
    },
    {
      "id": "ch07-u1-l2-p1b",
      "title": "顶点式：顶点写在脸上",
      "concept": "讲解：顶点式",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2(x + 1)^2 - 3",
          "translation": "a=2，h=−1，k=−3：顶点 (−1,−3)"
        },
        {
          "id": "f2",
          "latex": "y = -(x - 4)^2",
          "translation": "a=−1，h=4，k=0：顶点 (4,0)，开口向下"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -4,
          "max": 2,
          "step": 0.5,
          "label": "x",
          "expr": "2*(x+1)^2-3",
          "target": -3,
          "targetLabel": "最小值 −3",
          "graph": {
            "kind": "vertex",
            "a": 2,
            "b": 4,
            "c": -1
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "vertex",
            "a": 2,
            "b": 4,
            "c": -1
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "y=a(x−h)²+k：顶点 (h,k)，(x+1)² 里 h=−1（注意符号）。",
        "a 的符号定开口：a>0 顶点是最低点，a<0 最高点。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=3(x−2)²+5：顶点 (2,5)，最小值 5。"
        }
      ],
      "prev": "ch07-u1-l2-p1",
      "next": "ch07-u1-l2-p1g"
    },
    {
      "id": "ch07-u1-l2-p1g",
      "title": "平移：顶点搬家整条走",
      "concept": "图形：抛物线的平移",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = (x-2)^2 + 1",
          "translation": "顶点 (2,1)：h=2 右移，k=1 上移"
        },
        {
          "id": "f2",
          "latex": "\\text{形状不变}",
          "translation": "a=1 没变：开口大小形状完全一样，只是位置搬了家"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "y=x²：顶点 (0,0)",
            "y=(x−2)²+1：顶点 (2,1)"
          ],
          "left": {
            "kind": "plot-points",
            "params": {
              "autoPlay": true,
              "fn": "x^2",
              "speed": 500,
              "step": 1,
              "xMax": 4,
              "xMin": -4
            }
          },
          "right": {
            "kind": "plot-points",
            "params": {
              "autoPlay": true,
              "fn": "(x-2)^2+1",
              "speed": 500,
              "step": 1,
              "xMax": 6,
              "xMin": -2
            }
          }
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "两条抛物线同步描点：形状一模一样，整条平移。",
        "h 管左右（左加右减），k 管上下（上加下减）。"
      ],
      "examples": [
        {
          "figure": "数形结合",
          "text": "y=(x+3)²−2：顶点 (−3,−2)，由 y=x² 左移 3、下移 2 得到。"
        }
      ],
      "prev": "ch07-u1-l2-p1b",
      "next": "ch07-u1-l2-p2"
    },
    {
      "id": "ch07-u1-l2-p2",
      "title": "一般式变顶点式：配方是钥匙",
      "concept": "一般式与顶点式的互化（配方）",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = ax^2 + bx + c (a \\neq 0)",
          "translation": "一般式：y 等于 ax² 加 bx 加 c（a 不为 0），二次函数的常用写法"
        },
        {
          "id": "f2",
          "latex": "x^2 + 6x + 5 = (x+3)^2 - 4",
          "translation": "配方：x²+6x+5 等于 (x+3)²−4——一般式变顶点式，顶点 (−3,−4) 一眼可见"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": -5,
              "max": 3,
              "step": 0.5,
              "label": "x",
              "expr": "x^2+6*x+5"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": -5,
              "max": 3,
              "step": 0.5,
              "label": "x",
              "expr": "(x+3)^2-4"
            }
          },
          "sync": [
            "x"
          ],
          "labels": [
            "一般式：y=x²+6x+5",
            "顶点式：y=(x+3)²−4"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "两边同步拖 x：值永远相等——同一个函数，两件衣服。",
        "配方（第四章配方法）就是钥匙：先配方，再读顶点。"
      ],
      "examples": [
        {
          "text": "已知一般式求最值：先配方成顶点式，顶点就是答案",
          "figure": "并排对比"
        }
      ],
      "prev": "ch07-u1-l2-p1g",
      "next": "ch07-u1-l2-p2b"
    },
    {
      "id": "ch07-u1-l2-p2b",
      "title": "配方：一般式变顶点式",
      "concept": "讲解：一般式与顶点式的互化",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = x^2 - 4x + 1",
          "translation": "第一步：x²−4x 配成 (x−2)²−4"
        },
        {
          "id": "f2",
          "latex": "y = (x - 2)^2 - 3",
          "translation": "第二步：−4+1=−3，顶点式完成"
        },
        {
          "id": "f3",
          "latex": "(2, -3)",
          "translation": "顶点 (2,−3)：开口向上，最小值 −3"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "一般式",
            "顶点式"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "x^2-4*x+1",
              "label": "x",
              "max": 6,
              "min": -2,
              "step": 0.5
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "(x-2)^2-3",
              "label": "x",
              "max": 6,
              "min": -2,
              "step": 0.5
            }
          },
          "sync": [
            "x"
          ]
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "配方四步：提 a；括号里配方；括号外整理；读顶点。",
        "x²−4x+1：(−4/2)²=4，(x−2)²−4+1=(x−2)²−3。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "y=2x²+8x+5=2(x+2)²−3：顶点 (−2,−3)。"
        }
      ],
      "prev": "ch07-u1-l2-p2",
      "next": "ch07-u1-l3-p1"
    }
  ]
};
