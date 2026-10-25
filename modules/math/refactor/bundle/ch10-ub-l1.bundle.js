window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch10-ub-l1"] = {
  "lessonId": "ch10-ub-l1",
  "lessonTitle": "实数指数幂的严格定义",
  "chapterId": "ch10",
  "pages": [
    {
      "id": "ch10-ub-l1-p1",
      "title": "回填：2^√2 的严格定义",
      "concept": "实数指数幂的严格定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "2^{\\sqrt{2}} = \\lim_{n \\to \\infty} 2^{r_n} (r_n \\to \\sqrt{2})",
          "translation": "构造式定义：取有理数列 rₙ→√2（如 1.4, 1.41, 1.414, …），把 2^√2 定义为 2^{rₙ} 的极限"
        },
        {
          "id": "f2",
          "latex": "2^{1.414} \\approx 2.665",
          "translation": "数值：2^{1.4}≈2.639，2^{1.41}≈2.657，2^{1.414}≈2.665——越算越挤向一个值"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "x",
            "min": 1.4,
            "max": 1.42,
            "step": 0.001,
            "initial": 1.4
          },
          "views": [
            {
              "kind": "readout",
              "expr": "2^x",
              "label": "2^x"
            },
            {
              "kind": "point",
              "xExpr": "x",
              "yExpr": "2^x",
              "axisLabelX": "x",
              "axisLabelY": "y"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "8.1.3 留的尾巴：无理数指数当时只给直观（ch08-u1-l3-p1b），现在用极限补上严格定义。",
        "定义即构造：2^√2 不是“先有值再逼近”——“逼近过程的极限”本身就是定义。",
        "极限为什么存在：rₙ 递增（1.4→1.41→…）时 2^{rₙ} 也递增（底数 2>1），且不超过 2^{1.5}。",
        "递增有上界的数列必有极限——这是实数的完备性，本书当作基本事实使用。"
      ],
      "examples": [
        {
          "text": "r_n=1.4, 1.41, 1.414, 1.4142, …：√2 的不足近似值数列",
          "figure": "联动仪表盘"
        }
      ],
      "prev": "ch10-u2-l4-p1",
      "next": "ch10-ub-l1-p1b"
    },
    {
      "id": "ch10-ub-l1-p1b",
      "title": "回填：有理数逼近无理数",
      "concept": "讲解：实数指数幂的严格定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "r_n = 1.4, 1.41, 1.414, \\cdot\\cdot\\cdot",
          "translation": "rₙ→√2：有理数列逼近 √2"
        },
        {
          "id": "f2",
          "latex": "2^{r_n} \\to 2^{\\sqrt{2}}",
          "translation": "定义即构造：把 2^√2 定义为这个极限"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 1.4,
            "label": "x",
            "max": 1.42,
            "min": 1.4,
            "step": 0.001
          },
          "views": [
            {
              "expr": "2^x",
              "kind": "readout",
              "label": "2^x"
            },
            {
              "axisLabelX": "x",
              "axisLabelY": "y",
              "kind": "point",
              "xExpr": "x",
              "yExpr": "2^x"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "8.1.3 留的尾巴：当时只说“直观上有值”，现在用极限严格定义。",
        "换条路也一样：任何有理数列 rₙ→√2，2^{rₙ} 都挤向同一个极限——定义与选哪条路无关。",
        "⚠️ 别搞混：这里没用“2ˣ 的连续性”担保——连续性要等实数指数定义完才能谈，用它担保是循环论证。",
        "记住一句话：定义即构造——极限这个动作，就是 2^√2 的定义。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "3^π=lim 3^{rₙ}（rₙ→π）：同样的还债方式。"
        }
      ],
      "prev": "ch10-ub-l1-p1",
      "next": "ch10-ux-l1-p1"
    }
  ]
};
