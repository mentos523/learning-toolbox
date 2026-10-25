window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch01-u2-l4"] = {
  "lessonId": "ch01-u2-l4",
  "lessonTitle": "方程的应用（二）：拓展",
  "chapterId": "ch01",
  "pages": [
    {
      "id": "ch01-u2-l4-p1",
      "title": "两车相向：几小时相遇？",
      "concept": "行程问题",
      "formulas": [
        {
          "id": "f1",
          "latex": "40x + 20x = 120",
          "translation": "40 乘 x 加 20 乘 x 等于 120"
        },
        {
          "id": "f2",
          "latex": "x = 2",
          "translation": "x 等于 2"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 5,
          "step": 0.25,
          "label": "x",
          "expr": "40*x + 20*x",
          "target": 120,
          "targetLabel": "甲乙路程之和 = 120 千米",
          "unit": "千米",
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
        "甲车时速 40 千米走 x 小时走 40x 千米，乙车时速 20 千米走 20x 千米。",
        "等量关系：甲走的 + 乙走的 = 全程 120。列出 40x+20x = 120，解得 x = 2。"
      ],
      "examples": [
        {
          "text": "相遇问题：路程和 = 全程",
          "figure": "滑块"
        }
      ],
      "prev": "ch01-u2-l3-p1b",
      "next": "ch01-u2-l4-p1b"
    },
    {
      "id": "ch01-u2-l4-p1b",
      "title": "追及问题：快的追慢的",
      "concept": "讲解：追及问题",
      "formulas": [
        {
          "id": "f1",
          "latex": "60x = 40x + 30",
          "translation": "甲时速 60 追时速 40 的乙，乙先走了 30 千米；设 x 小时追上"
        },
        {
          "id": "f2",
          "latex": "20x = 30",
          "translation": "等量关系：追上时甲走的路程 = 乙走的路程"
        },
        {
          "id": "f3",
          "latex": "x = 1.5",
          "translation": "x=1.5：1.5 小时追上；甲走了 90，乙走了 60+30=90"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 3,
          "step": 0.25,
          "label": "x",
          "expr": "60*x - 40*x",
          "target": 30,
          "targetLabel": "甲比乙多走 30 千米",
          "unit": "千米",
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
        "追及等量关系：快车路程 = 慢车路程 + 先走的。",
        "相遇是“和”=全程，追及是“差”=先走的——一字之差，关系完全不同。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "小红 8 点出发时速 5 千米，小刚 8 点半时速 7 千米追：7x=5x+2.5，x=1.25 小时追上。"
        }
      ],
      "prev": "ch01-u2-l4-p1",
      "next": "ch01-u2-l4-p2"
    },
    {
      "id": "ch01-u2-l4-p2",
      "title": "追及演示：哥哥追弟弟",
      "concept": "追及问题",
      "formulas": [
        {
          "id": "f1",
          "latex": "5t = 2t + 50",
          "translation": "哥哥 5 米每秒走 t 秒的路程 = 弟弟 2 米每秒走 t 秒的路程 + 先走的 50 米"
        },
        {
          "id": "f2",
          "latex": "t = \\frac{50}{3}",
          "translation": "t 等于 50 除以 3，约 16.7 秒追上"
        }
      ],
      "interaction": {
        "type": "slow-replay",
        "params": {
          "frames": 60,
          "duration": 3000,
          "draw": {
            "kind": "pursuit",
            "params": {
              "vFront": 2,
              "vBack": 5,
              "gap": 50
            }
          },
          "scrubber": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "弟弟每秒 2 米先走了 50 米，哥哥每秒 5 米在后面追。",
        "看动画：哥哥什么时候追上弟弟？相遇处就是方程的解。"
      ],
      "examples": [
        {
          "text": "生活：哥哥骑车追先出门的弟弟",
          "figure": "追及动画"
        }
      ],
      "prev": "ch01-u2-l4-p1b",
      "next": "ch01-u2-l4-p3"
    },
    {
      "id": "ch01-u2-l4-p3",
      "title": "为什么追及用速度差？",
      "concept": "相对速度",
      "formulas": [
        {
          "id": "f1",
          "latex": "15t - 10t = 60",
          "translation": "后车 15t 减前车 10t 等于初始距离 60"
        },
        {
          "id": "f2",
          "latex": "(15 - 10)t = 60",
          "translation": "速度差乘时间等于追及距离"
        },
        {
          "id": "f3",
          "latex": "t = 12",
          "translation": "t 等于 12 秒"
        }
      ],
      "interaction": {
        "type": "slow-replay",
        "params": {
          "frames": 60,
          "duration": 3000,
          "draw": {
            "kind": "pursuit",
            "params": {
              "vFront": 10,
              "vBack": 15,
              "gap": 60
            }
          },
          "scrubber": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "后车每秒比前车多走 5 米，60 米的差距每秒缩小 5 米。",
        "追及时间 = 距离差 ÷ 速度差，这是追及问题的核心。"
      ],
      "examples": [
        {
          "text": "想一想：如果两车一样快，还能追上吗？",
          "figure": "思考"
        }
      ],
      "prev": "ch01-u2-l4-p2",
      "next": "ch01-u2-l4-p4"
    },
    {
      "id": "ch01-u2-l4-p4",
      "title": "小练：你来列方程",
      "concept": "追及应用",
      "formulas": [
        {
          "id": "f1",
          "latex": "6t = 3t + 90",
          "translation": "小红 6t 等于小明 3t 加先走的 90 米"
        },
        {
          "id": "f2",
          "latex": "t = 30",
          "translation": "30 秒后追上"
        }
      ],
      "interaction": {
        "type": "slow-replay",
        "params": {
          "frames": 60,
          "duration": 3000,
          "draw": {
            "kind": "pursuit",
            "params": {
              "vFront": 3,
              "vBack": 6,
              "gap": 90
            }
          },
          "scrubber": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "小明每秒 3 米先走了 90 米，小红每秒 6 米追，设 t 秒追上。",
        "先自己列方程，再看动画验证：6t = 3t + 90。"
      ],
      "examples": [
        {
          "text": "自己动手：先列方程，再看动画",
          "figure": "练习"
        }
      ],
      "prev": "ch01-u2-l4-p3",
      "next": "ch01-u2-l5-p1"
    }
  ]
};
