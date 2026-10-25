window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch09-u2-l1"] = {
  "lessonId": "ch09-u2-l1",
  "lessonTitle": "等差数列",
  "chapterId": "ch09",
  "pages": [
    {
      "id": "ch09-u2-l1-p1",
      "title": "等差数列：每次加同一个数",
      "concept": "等差数列",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_n = a_1 + (n-1)d",
          "translation": "第 n 项 = 首项 + (n−1)×公差：公差 d 是每次加的同一个数"
        },
        {
          "id": "f2",
          "latex": "d = a_{n+1} - a_n",
          "translation": "公差 = 后一项减前一项：任意相邻两项的差都相等"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "2*x+3",
          "xMin": 1,
          "xMax": 12,
          "step": 1,
          "autoPlay": true,
          "speed": 500
        }
      },
      "auxInteraction": null,
      "hints": [
        "看散点：所有点都落在一条直线上——等差数列是离散的一次函数。",
        "公差 d 就是直线的斜率：d=2，点列每步爬高 2。"
      ],
      "examples": [
        {
          "text": "楼梯：每级高 18 厘米，台阶高度成等差数列",
          "figure": "描点成像"
        }
      ],
      "prev": "ch09-u1-l2-p2b",
      "next": "ch09-u2-l1-p1b"
    },
    {
      "id": "ch09-u2-l1-p1b",
      "title": "等差数列：公差是步伐",
      "concept": "讲解：等差数列",
      "formulas": [
        {
          "id": "f1",
          "latex": "5, 8, 11, 14, \\cdot\\cdot\\cdot",
          "translation": "d=3：每步加 3"
        },
        {
          "id": "f2",
          "latex": "a_n = 3n + 2",
          "translation": "通项：aₙ=5+3(n−1)=3n+2"
        },
        {
          "id": "f3",
          "latex": "a_{20} = 62",
          "translation": "第 20 项：3×20+2=62"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "3*x+2",
          "speed": 500,
          "step": 1,
          "xMax": 12,
          "xMin": 1
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "等差数列=每次加同一个数 d：d 是步伐，可正可负可为零。",
        "d=0 时是常数列：5,5,5,…——步伐为零，原地踏步。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "−2,1,4,7,…：d=3，aₙ=3n−5。"
        }
      ],
      "prev": "ch09-u2-l1-p1",
      "next": "ch09-u2-l1-p2"
    },
    {
      "id": "ch09-u2-l1-p2",
      "title": "公差的威力：拖 d 看第 10 项",
      "concept": "公差决定变化快慢",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_{10} = a_1 + 9d",
          "translation": "第 10 项 = 首项 + 9×公差：从 a₁ 走到 a₁₀，一共加了 9 次公差"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": -3,
          "max": 3,
          "step": 0.5,
          "label": "d",
          "expr": "2+9*d",
          "target": 20,
          "targetLabel": "目标 20（d=2）"
        }
      },
      "auxInteraction": null,
      "hints": [
        "公差每加 0.5，a₁₀ 就加 4.5：9 次累积，威力放大 9 倍。",
        "d 为负也行：数列往下走，公差是每步的变化量。"
      ],
      "examples": [
        {
          "text": "打车计价：起步价 + 每公里单价×公里数",
          "figure": "滑块"
        }
      ],
      "prev": "ch09-u2-l1-p1b",
      "next": "ch09-u2-l1-p2b"
    },
    {
      "id": "ch09-u2-l1-p2b",
      "title": "公差 d：走了几步",
      "concept": "讲解：等差数列的通项",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_1 = 5, d = -2",
          "translation": "首项 5，公差 −2：数列往下走"
        },
        {
          "id": "f2",
          "latex": "5, 3, 1, -1, \\cdot\\cdot\\cdot",
          "translation": "5→3→1→−1：每步减 2"
        },
        {
          "id": "f3",
          "latex": "a_{10} = 5 + 9 \\times (-2) = -13",
          "translation": "第 10 项：走了 9 步，5−18=−13"
        }
      ],
      "interaction": {
        "params": {
          "expr": "5+9*d",
          "label": "d",
          "max": 3,
          "min": -3,
          "step": 0.5,
          "target": -13,
          "targetLabel": "d=−2 时 a₁₀=−13"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "aₙ=a₁+(n−1)d：(n−1) 是“走了几步”，别写成 n。",
        "d 为负数列递减：公差是变化量，不是增量。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "a₁=10,d=−3：a₅=10+4×(−3)=−2。"
        }
      ],
      "prev": "ch09-u2-l1-p2",
      "next": "ch09-u2-l2-p1"
    }
  ]
};
