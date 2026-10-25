window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u2-l4"] = {
  "lessonId": "ch08-u2-l4",
  "lessonTitle": "对数的运算",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u2-l4-p1",
      "title": "对数运算法则：真数相乘，对数相加",
      "concept": "对数的运算法则",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\log_a (MN) = \\log_a M + \\log_a N (a > 0, a \\neq 1, M > 0, N > 0)",
          "translation": "以 a 为底 MN 的对数，等于以 a 为底 M 的对数加 N 的对数（条件齐全）：真数相乘，对数相加"
        },
        {
          "id": "f2",
          "latex": "\\log_a (M^k) = k \\cdot \\log_a M (a > 0, a \\neq 1, M > 0)",
          "translation": "以 a 为底 M 的 k 次幂的对数，等于 k 乘以以 a 为底 M 的对数：幂的指数提到前面变成系数"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "m",
            "min": 1,
            "max": 5,
            "step": 1,
            "initial": 2
          },
          "views": [
            {
              "kind": "readout",
              "expr": "2^m",
              "label": "M=2ᵐ"
            },
            {
              "kind": "readout",
              "expr": "2^m*4",
              "label": "MN（N=4 固定）"
            },
            {
              "kind": "readout",
              "expr": "m+2",
              "label": "log₂(MN)=log₂M+log₂4"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 m：第三个读数恒为 log₂M+log₂4——真数相乘对数相加。",
        "第二法则：logₐ(Mᵏ)=k·logₐM——Mᵏ 对数取 k 倍。"
      ],
      "examples": [
        {
          "text": "log₂(8×4)=log₂8+log₂4=3+2=5：乘法变加法，计算变简单",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch08-u2-l3-p1g",
      "next": "ch08-u2-l4-p1b"
    },
    {
      "id": "ch08-u2-l4-p1b",
      "title": "对数法则：乘变加",
      "concept": "讲解：对数的运算法则",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\log_2 48",
          "translation": "48=16×3：真数是乘积"
        },
        {
          "id": "f2",
          "latex": "\\log_2 48 = \\log_2 16 + \\log_2 3",
          "translation": "=4+log₂3：真数相乘，对数相加"
        },
        {
          "id": "f3",
          "latex": "\\log_2 \\frac{1}{8} = -3",
          "translation": "真数相除，对数相减：log₂1−log₂8=0−3=−3"
        }
      ],
      "interaction": {
        "params": {
          "source": {
            "initial": 2,
            "label": "m",
            "max": 5,
            "min": 1,
            "step": 1
          },
          "views": [
            {
              "expr": "2^m",
              "kind": "readout",
              "label": "M=2ᵐ"
            },
            {
              "expr": "2^m*4",
              "kind": "readout",
              "label": "MN（N=4 固定）"
            },
            {
              "expr": "m+2",
              "kind": "readout",
              "label": "log₂(MN)=log₂M+log₂4"
            }
          ]
        },
        "type": "linked-dashboard"
      },
      "auxInteraction": null,
      "hints": [
        "三大法则：乘→加，除→减，幂→乘（指数变系数）。",
        "法则的反向也常用：log₂8+log₂4=log₂32——加变乘。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "lg200=lg(2×100)=lg2+2≈2.301。"
        }
      ],
      "prev": "ch08-u2-l4-p1",
      "next": "ch08-u2-l5-p1"
    }
  ]
};
