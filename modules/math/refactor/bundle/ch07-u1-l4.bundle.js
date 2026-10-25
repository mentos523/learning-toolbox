window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch07-u1-l4"] = {
  "lessonId": "ch07-u1-l4",
  "lessonTitle": "二次函数的最值应用",
  "chapterId": "ch07",
  "pages": [
    {
      "id": "ch07-u1-l4-p1",
      "title": "20 米篱笆，围出最大面积",
      "concept": "最值应用（建模三步）",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = x(20-2x) = -2x^2 + 20x",
          "translation": "面积 S 等于宽 x 乘长 (20−2x)，即 −2x²+20x（0<x<10）"
        },
        {
          "id": "f2",
          "latex": "x = -\\frac{b}{2a} = 5",
          "translation": "顶点横坐标 x=−b/(2a)=5：宽 5 米、长 10 米时，面积最大 50 平方米"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "-2*x^2+20*x",
          "target": 50,
          "targetLabel": "最大面积 50",
          "unit": "平方米",
          "graph": {
            "kind": "vertex",
            "a": -2,
            "b": 20,
            "c": 0
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "vertex",
            "a": -2,
            "b": 20,
            "c": 0
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 x：x=5 时“咔哒”锁定，S=50 最大——顶点就是最优解。",
        "三步：设宽为 x 列出 S(x)，配方找顶点，顶点即答案。"
      ],
      "examples": [
        {
          "text": "靠墙围矩形鸡圈：宽 5 米、长 10 米时面积最大",
          "figure": "滑块"
        },
        {
          "text": "定价问题：单价与利润是开口向下的抛物线",
          "figure": "滑块"
        }
      ],
      "prev": "ch07-u1-l3-p1b",
      "next": "ch07-u1-l4-p1b"
    },
    {
      "id": "ch07-u1-l4-p1b",
      "title": "最值应用：建模三步",
      "concept": "讲解：二次函数的最值应用",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = x(60 - 2x)",
          "translation": "设宽 x 米，长 (60−2x) 米（靠墙围，墙作一边）"
        },
        {
          "id": "f2",
          "latex": "S = -2x^2 + 60x",
          "translation": "展开：a=−2<0，开口向下，有最大值"
        },
        {
          "id": "f3",
          "latex": "x = 15",
          "translation": "x=−b/2a=15：宽 15 米，长 30 米，最大 450 平方米"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 30,
          "step": 1,
          "label": "x",
          "expr": "x*(60-2*x)",
          "target": 450,
          "targetLabel": "最大面积 450",
          "unit": "平方米",
          "graph": {
            "kind": "vertex",
            "a": -2,
            "b": 60,
            "c": 0
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "vertex",
            "a": -2,
            "b": 60,
            "c": 0
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "建模三步：设自变量列函数式；化成顶点式（或套公式）；顶点即答案。",
        "别忘了定义域：x>0 且 60−2x>0，即 0<x<30。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "定价：单价 x 元，利润 y=−2x²+100x：x=25 时利润最大。"
        }
      ],
      "prev": "ch07-u1-l4-p1",
      "next": "ch07-u1-l4-p2"
    },
    {
      "id": "ch07-u1-l4-p2",
      "title": "扔铅球：能飞多远？",
      "concept": "抛物线应用",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 9.9t - 4.9t^2",
          "translation": "铅球高度 y 等于 9.9t 减 4.9 倍 t 平方（初速 14 米/秒、45° 斜抛，竖直方向分量约 9.9）"
        },
        {
          "id": "f2",
          "latex": "9.9t - 4.9t^2 = 0",
          "translation": "落地时高度为 0，解得 t 约 2.02 秒"
        }
      ],
      "interaction": {
        "type": "slow-replay",
        "params": {
          "frames": 60,
          "duration": 3000,
          "draw": {
            "kind": "projectile",
            "params": {
              "v0": 14,
              "angle": 45,
              "g": 9.8
            }
          },
          "scrubber": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "铅球出手后划出一道弧线，落地时高度 y = 0。",
        "落地点就是方程的解：抛物线与 x 轴的交点。"
      ],
      "examples": [
        {
          "text": "看动画：铅球飞出去，落在哪里？",
          "figure": "抛物线"
        }
      ],
      "prev": "ch07-u1-l4-p1b",
      "next": "ch07-u1-l4-p3"
    },
    {
      "id": "ch07-u1-l4-p3",
      "title": "最高点：顶点就是最值",
      "concept": "顶点与最值",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = -4.9t^2 + 9.9t",
          "translation": "高度关于时间的二次函数，开口向下（45° 斜抛）"
        },
        {
          "id": "f2",
          "latex": "t = 1.01",
          "translation": "顶点横坐标约 1.01 秒时达到最高"
        }
      ],
      "interaction": {
        "type": "slow-replay",
        "params": {
          "frames": 60,
          "duration": 3000,
          "draw": {
            "kind": "projectile",
            "params": {
              "v0": 14,
              "angle": 45,
              "g": 9.8
            }
          },
          "scrubber": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "速度：单位时间走过的路程；向上为正，向下为负。",
        "最高点就是顶点：抛物线先升后落，顶点处竖直速度为 0，只剩水平速度，速度方向水平。"
      ],
      "examples": [
        {
          "text": "定格在最高点：此时速度方向水平",
          "figure": "顶点"
        }
      ],
      "prev": "ch07-u1-l4-p2",
      "next": "ch07-u1-l4-p4a"
    },
    {
      "id": "ch07-u1-l4-p4a",
      "title": "试试 30°：低平远射",
      "concept": "角度探究",
      "formulas": [
        {
          "id": "f1",
          "latex": "30",
          "translation": "发射角度：30 度——低平远射，看看能飞多远"
        }
      ],
      "interaction": {
        "type": "slow-replay",
        "params": {
          "frames": 60,
          "duration": 3000,
          "draw": {
            "kind": "projectile",
            "params": {
              "v0": 14,
              "angle": 30,
              "g": 9.8
            }
          },
          "scrubber": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "同样初速 14 米/秒，30° 打出去，落在哪里？",
        "记住落点位置，下面换角度对比。"
      ],
      "examples": [
        {
          "text": "30°：贴着地面飞出去",
          "figure": "低角度"
        }
      ],
      "prev": "ch07-u1-l4-p3",
      "next": "ch07-u1-l4-p4b"
    },
    {
      "id": "ch07-u1-l4-p4b",
      "title": "试试 45°：不低不高",
      "concept": "角度探究",
      "formulas": [
        {
          "id": "f1",
          "latex": "45",
          "translation": "发射角度：45 度——不低不高，看看能飞多远"
        }
      ],
      "interaction": {
        "type": "slow-replay",
        "params": {
          "frames": 60,
          "duration": 3000,
          "draw": {
            "kind": "projectile",
            "params": {
              "v0": 14,
              "angle": 45,
              "g": 9.8
            }
          },
          "scrubber": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "同样初速，45° 打出去，落点和 30° 比怎么样？",
        "是更远了，还是更近了？"
      ],
      "examples": [
        {
          "text": "45°：弧线最饱满",
          "figure": "中角度"
        }
      ],
      "prev": "ch07-u1-l4-p4a",
      "next": "ch07-u1-l4-p4c"
    },
    {
      "id": "ch07-u1-l4-p4c",
      "title": "试试 60°：高吊",
      "concept": "角度探究",
      "formulas": [
        {
          "id": "f1",
          "latex": "60",
          "translation": "发射角度：60 度——高高吊起，看看能飞多远"
        }
      ],
      "interaction": {
        "type": "slow-replay",
        "params": {
          "frames": 60,
          "duration": 3000,
          "draw": {
            "kind": "projectile",
            "params": {
              "v0": 14,
              "angle": 60,
              "g": 9.8
            }
          },
          "scrubber": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "同样初速，60° 打出去，飞得高，但落得远吗？",
        "三个角度都试完了，哪个最远？"
      ],
      "examples": [
        {
          "text": "60°：飞得最高，落得却不远",
          "figure": "高角度"
        }
      ],
      "prev": "ch07-u1-l4-p4b",
      "next": "ch07-u1-l4-p4d"
    },
    {
      "id": "ch07-u1-l4-p4d",
      "title": "结论：45° 最远",
      "concept": "角度探究小结",
      "formulas": [
        {
          "id": "f1",
          "latex": "45",
          "translation": "结论：45 度射得最远——三个角度都试过了"
        }
      ],
      "interaction": {
        "type": "slow-replay",
        "params": {
          "frames": 60,
          "duration": 3000,
          "draw": {
            "kind": "projectile",
            "params": {
              "v0": 14,
              "angle": 45,
              "g": 9.8
            }
          },
          "scrubber": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "30°、45°、60° 都试了：45° 最远。",
        "数学家用三角函数（ch08-u3 选学）证明过：45° 最远；跳过不影响用结论。"
      ],
      "examples": [
        {
          "text": "喷泉设计、水枪打靶，都用 45°",
          "figure": "生活应用"
        }
      ],
      "prev": "ch07-u1-l4-p4c",
      "next": "ch07-u2-l1-p1"
    }
  ]
};
