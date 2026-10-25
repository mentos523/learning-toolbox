window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-u2-l1"] = {
  "lessonId": "ch04-u2-l1",
  "lessonTitle": "根的判别式",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-u2-l1-p1",
      "title": "Δ 的三种几何长相",
      "concept": "判别式的几何意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\Delta > 0",
          "translation": "德尔塔大于 0：抛物线穿过横轴两次，两个不等实根"
        },
        {
          "id": "f2",
          "latex": "\\Delta = 0",
          "translation": "德尔塔等于 0：抛物线与横轴相切，两个相等的实根（图像上只看到一个交点）"
        },
        {
          "id": "f3",
          "latex": "\\Delta < 0",
          "translation": "德尔塔小于 0：抛物线碰不到横轴，没有实数根"
        }
      ],
      "interaction": {
        "type": "linked-dashboard",
        "params": {
          "source": {
            "label": "k",
            "min": -3,
            "max": 3,
            "step": 0.5,
            "initial": 1
          },
          "views": [
            {
              "kind": "readout",
              "expr": "-4*k",
              "label": "Δ"
            },
            {
              "kind": "point",
              "xExpr": "0",
              "yExpr": "k"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "方程 x²+k=0 的 Δ=−4k；拖动 k，抛物线顶点 (0,k) 上下移动。",
        "k>0 时顶点在横轴上方：Δ<0，无实根；k=0 相切：两个相等的实根；k<0 顶点在下方：Δ>0，两个实根。",
        "Δ 的符号 = 抛物线与横轴的位置关系——代数结论有了几何长相。"
      ],
      "examples": [
        {
          "text": "开口向上的抛物线，顶点位置决定交点个数",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch04-u1-l4-p1b",
      "next": "ch04-u2-l1-p1b"
    },
    {
      "id": "ch04-u2-l1-p1b",
      "title": "判别式：先算 Δ 再动手",
      "concept": "讲解：根的判别式",
      "formulas": [
        {
          "id": "f1",
          "latex": "3x^2 + 2x + 1 = 0",
          "translation": "a=3，b=2，c=1"
        },
        {
          "id": "f2",
          "latex": "\\Delta = 4 - 12 = -8",
          "translation": "Δ=2²−4×3×1=−8<0"
        },
        {
          "id": "f3",
          "latex": "\\text{无实数根}",
          "translation": "Δ<0：抛物线碰不到横轴，没有实数根，不用再算"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -2,
          "max": 2,
          "step": 0.5,
          "label": "x",
          "expr": "3*x^2 + 2*x + 1",
          "target": 0,
          "targetLabel": "y = 0（横轴）",
          "graph": {
            "kind": "parabola",
            "a": 3,
            "b": 2,
            "c": 1
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 3,
            "b": 2,
            "c": 1
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "解二次方程先算 Δ：Δ<0 直接判无实根，省下后面所有计算。",
        "Δ=0 不是没根：是两个相等的实根（图像上只看到一个交点）。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x²+x+1=0：Δ=−3<0，无实根；x²−6x+9=0：Δ=0，x=3（重根）。"
        }
      ],
      "prev": "ch04-u2-l1-p1",
      "next": "ch04-u2-l2-p1"
    }
  ]
};
