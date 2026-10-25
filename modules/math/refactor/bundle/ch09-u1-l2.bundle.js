window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch09-u1-l2"] = {
  "lessonId": "ch09-u1-l2",
  "lessonTitle": "数列的表示",
  "chapterId": "ch09",
  "pages": [
    {
      "id": "ch09-u1-l2-p1",
      "title": "通项公式：用 n 写出第 n 项",
      "concept": "通项公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_n = 2n + 1 (n = 1, 2, 3, \\cdot\\cdot\\cdot)",
          "translation": "第 n 项等于 2n+1：代入 n=1 得 a₁=3，n=2 得 a₂=5，想算哪项代 n 就行"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "n",
            "min": 1,
            "max": 20,
            "step": 1,
            "initial": 1
          },
          "views": [
            {
              "kind": "readout",
              "expr": "2*n+1",
              "label": "a_n"
            },
            {
              "kind": "point",
              "xExpr": "n",
              "yExpr": "2*n+1",
              "axisLabelX": "n",
              "axisLabelY": "a_n"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 n 看 a_n 同步变：通项公式是项的计算器。",
        "注意 n 只能取正整数：散点之间是断开的。"
      ],
      "examples": [
        {
          "text": "存款每月递增：a_n = 100 + 10n（第 n 个月的存款）",
          "figure": "联动仪表盘"
        }
      ],
      "prev": "ch09-u1-l1-p1b",
      "next": "ch09-u1-l2-p1b"
    },
    {
      "id": "ch09-u1-l2-p1b",
      "title": "通项公式：项的计算器",
      "concept": "讲解：通项公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_n = 3n - 1",
          "translation": "n=1 得 2，n=2 得 5，n=3 得 8"
        },
        {
          "id": "f2",
          "latex": "a_{100} = 299",
          "translation": "想算第 100 项：代 n=100，一步到位"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 1,
            "label": "n",
            "max": 20,
            "min": 1,
            "step": 1
          },
          "views": [
            {
              "expr": "3*n-1",
              "kind": "readout",
              "label": "a_n"
            },
            {
              "axisLabelX": "n",
              "axisLabelY": "a_n",
              "kind": "point",
              "xExpr": "n",
              "yExpr": "3*n-1"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "通项公式=第 n 项的计算器：想算哪项，代 n 就行。",
        "反过来：aₙ=3n−1，aₙ=29 是第几项？解 3n−1=29 得 n=10。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "aₙ=2ⁿ：a₅=32；aₙ=n²：a₇=49。"
        }
      ],
      "prev": "ch09-u1-l2-p1",
      "next": "ch09-u1-l2-p2"
    },
    {
      "id": "ch09-u1-l2-p2",
      "title": "递推公式：前一项推出后一项",
      "concept": "递推公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_1 = 1, a_n = a_{n-1} + 3 (n \\geq 2)",
          "translation": "首项是 1，每一项比前一项多 3：1, 4, 7, 10, …——前推后"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "n",
          "expr": "3*n-2",
          "target": 28,
          "targetLabel": "a₁₀=28"
        }
      },
      "auxInteraction": null,
      "hints": [
        "递推要两件东西：首项 a₁，和'后项=前项+3'的规则。",
        "拖到 n=10 咔哒：a₁₀=28——递推算出的和公式算的一样。"
      ],
      "examples": [
        {
          "text": "斐波那契：后一项是前两项之和（兔子数列）",
          "figure": "滑块"
        }
      ],
      "prev": "ch09-u1-l2-p1b",
      "next": "ch09-u1-l2-p2b"
    },
    {
      "id": "ch09-u1-l2-p2b",
      "title": "递推：首项加规则",
      "concept": "讲解：递推公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "a_1 = 2, a_n = 2a_{n-1}",
          "translation": "首项 2，每项是前一项的 2 倍"
        },
        {
          "id": "f2",
          "latex": "2, 4, 8, 16, \\cdot\\cdot\\cdot",
          "translation": "一项项推出：2→4→8→16"
        },
        {
          "id": "f3",
          "latex": "a_n = 2^n",
          "translation": "通项：aₙ=2ⁿ——递推和通项说的是一回事"
        }
      ],
      "interaction": {
        "params": {
          "expr": "2^n",
          "label": "n",
          "max": 10,
          "min": 1,
          "step": 1,
          "target": 1024,
          "targetLabel": "a₁₀=1024"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "递推两件套：首项 a₁，递推规则（后项与前项的关系）。",
        "递推算得慢（要一项项推），通项算得快——各有各的用。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "斐波那契：a₁=1,a₂=1,aₙ=aₙ₋₁+aₙ₋₂：1,1,2,3,5,8,…"
        }
      ],
      "prev": "ch09-u1-l2-p2",
      "next": "ch09-u2-l1-p1"
    }
  ]
};
