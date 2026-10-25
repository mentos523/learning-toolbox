window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch01-u1-l1"] = {
  "lessonId": "ch01-u1-l1",
  "lessonTitle": "等式与方程",
  "chapterId": "ch01",
  "pages": [
    {
      "id": "ch01-u1-l1-p1",
      "title": "2x + 1 = 11，x 是几？",
      "concept": "方程的解",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x + 1 = 11",
          "translation": "2 乘 x 加 1 等于 11"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "2*x + 1",
          "target": 11,
          "targetLabel": "让左边等于 11",
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
        "拖 x，看 2x+1 什么时候追上 11。",
        "解方程，就是找到那个\"对上号\"的 x。"
      ],
      "examples": [
        {
          "text": "滑块试解：找让等式成立的 x",
          "figure": "滑块"
        }
      ],
      "prev": null,
      "next": "ch01-u1-l1-p1b"
    },
    {
      "id": "ch01-u1-l1-p1b",
      "title": "2x+1=11：先减 1 再除以 2",
      "concept": "讲解：解 2x+1=11",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x + 1 = 11",
          "translation": "第一步：两边同时减 1，消掉常数项（等式性质 1）"
        },
        {
          "id": "f2",
          "latex": "2x = 10",
          "translation": "得到 2x=10；x 前面还挡着个 2"
        },
        {
          "id": "f3",
          "latex": "x = 5",
          "translation": "第二步：两边同时除以 2（等式性质 2），x=5；验算 2×5+1=11"
        }
      ],
      "interaction": {
        "params": {
          "goal": "先消掉常数 1，再把两个 x 盒并成一个",
          "left": [
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
              "kind": "weight",
              "value": 1
            }
          ],
          "right": [
            {
              "kind": "weight",
              "value": 11
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
          "max": 12,
          "step": 1,
          "label": "x",
          "expr": "2*x + 1",
          "target": 11,
          "targetLabel": "2x + 1 = 11 的解",
          "caption": "天平上 2x+1=11 的解 x=5，在数轴上就是这个点"
        },
        "engine": {
          "primitive": "EqGraph",
          "version": "2026.10.16.A",
          "params": {
            "kind": "numberline",
            "expr": "2*x + 1",
            "target": 11
          }
        }
      },
      "hints": [
        "解这类方程两步走：先移常数项（+1 过等号变 −1），再把 x 的系数化为 1。",
        "顺序别反：先除以 2 的话 1÷2 会添麻烦。做完一定验算。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "变式：3x+2=14。先减 2 得 3x=12，再除以 3 得 x=4。"
        }
      ],
      "prev": "ch01-u1-l1-p1",
      "next": "ch01-u1-l1-p2"
    },
    {
      "id": "ch01-u1-l1-p2",
      "title": "含有未知数的等式叫方程",
      "concept": "方程的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 5 = 12",
          "translation": "x 加 5 等于 12"
        },
        {
          "id": "f2",
          "latex": "3 + 5 = 8",
          "translation": "3 加 5 等于 8"
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
          "goal": "观察天平：它既是一个等式，也是一个方程",
          "rule": "天平平衡叫等式；含有未知数 x 的等式叫方程"
        }
      },
      "auxInteraction": {
        "type": "eq-graph",
        "params": {
          "min": 0,
          "max": 20,
          "step": 1,
          "label": "x",
          "expr": "x + 5",
          "target": 12,
          "targetLabel": "x + 5 = 12 的解",
          "caption": "天平上 x+5=12 的解 x=7，在数轴上就是这个点"
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
        "天平平衡：两边一样重，这就是等式。",
        "左边多了个 x 盒子——含有未知数的等式，叫方程。"
      ],
      "examples": [
        {
          "text": "天平：等式是平衡，方程是藏了 x 的平衡",
          "figure": "天平"
        }
      ],
      "prev": "ch01-u1-l1-p1b",
      "next": "ch01-u1-l1-p2b"
    },
    {
      "id": "ch01-u1-l1-p2b",
      "title": "方程和等式：一句话分清",
      "concept": "讲解：方程的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 5 = 12",
          "translation": "有等号、有未知数 x：是方程"
        },
        {
          "id": "f2",
          "latex": "3 + 5 = 8",
          "translation": "有等号、全是数字：只是等式，不是方程"
        },
        {
          "id": "f3",
          "latex": "2x + 5",
          "translation": "连等号都没有：叫代数式，更不是方程"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "expr": "□ + 5 = 12",
          "interval": 1200,
          "stages": [
            "□",
            "△",
            "x"
          ]
        },
        "type": "placeholder-morph"
      },
      "auxInteraction": null,
      "hints": [
        "判断是不是方程两步看：有等号吗？有未知数吗？两个都是“有”才是方程。",
        "易错：x=5 也是方程——未知数还在，只是答案已经找到了。"
      ],
      "examples": [
        {
          "figure": "辨析",
          "text": "x+2=7 是方程；7=7 是等式；2x+1 是代数式。你能一眼分清吗？"
        }
      ],
      "prev": "ch01-u1-l1-p2",
      "next": "ch01-u1-l1-p3"
    },
    {
      "id": "ch01-u1-l1-p3",
      "title": "未知数和变量是一回事吗？",
      "concept": "未知数 vs 变量",
      "formulas": [
        {
          "id": "f1",
          "latex": "2x + 5",
          "translation": "2 乘 x 加 5"
        },
        {
          "id": "f2",
          "latex": "2x + 5 = 13",
          "translation": "2 乘 x 加 5 等于 13"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "2*x + 5",
          "target": 13,
          "targetLabel": "方程 2x+5 = 13 要找的那个 x",
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
        "随便拖 x：它到处跑，叫变量。",
        "让它停在等式成立的位置：此刻它有一个确定的值，叫未知数。"
      ],
      "examples": [
        {
          "text": "动点 vs 定点：变量是跑的数，未知数是等着被找到的数",
          "figure": "滑块"
        }
      ],
      "prev": "ch01-u1-l1-p2b",
      "next": "ch01-u1-l1-p3b"
    },
    {
      "id": "ch01-u1-l1-p3b",
      "title": "变量到处跑，未知数等人找",
      "concept": "讲解：未知数 vs 变量",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2x + 1",
          "translation": "没有等号定住谁：x 跑、y 跟着跑，两个都是变量"
        },
        {
          "id": "f2",
          "latex": "2x + 1 = 11",
          "translation": "等号把它定在 11 上：此刻 x 是未知数，等着被求出来"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 0,
            "label": "x",
            "max": 5,
            "min": 0,
            "step": 0.5
          },
          "views": [
            {
              "expr": "2*x + 1",
              "kind": "readout",
              "label": "y"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "2*x + 1"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "同一个字母 x：在等式里等人来找它叫未知数，在变化里到处跑叫变量。",
        "解方程，就是让乱跑的 x 停在唯一正确的位置上。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "气温 T 随时间 t 变化：t 和 T 都是变量；中午 12 点 T=28℃，那是定值。"
        }
      ],
      "prev": "ch01-u1-l1-p3",
      "next": "ch01-u1-l2-p1"
    }
  ]
};
