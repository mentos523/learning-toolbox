window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05-u1-l3"] = {
  "lessonId": "ch05-u1-l3",
  "lessonTitle": "一元一次不等式组",
  "chapterId": "ch05",
  "pages": [
    {
      "id": "ch05-u1-l3-p1",
      "title": "公共解集：两段射线重叠处",
      "concept": "不等式组的公共解集",
      "formulas": [
        {
          "id": "f1",
          "latex": "x > 2",
          "translation": "x 大于 2：第一个不等式的解集"
        },
        {
          "id": "f2",
          "latex": "x < 5",
          "translation": "x 小于 5：第二个不等式的解集"
        },
        {
          "id": "f3",
          "latex": "2 < x < 5",
          "translation": "2 小于 x 小于 5：两个解集的公共部分"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "x",
            "min": 0,
            "max": 7,
            "step": 0.5,
            "initial": 3
          },
          "mode": "system",
          "sets": [
            {
              "expr": "x-2",
              "ineq": ">",
              "label": "x>2"
            },
            {
              "expr": "5-x",
              "ineq": ">",
              "label": "x<5"
            }
          ],
          "showProbe": true
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "system",
            "sets": [
              {
                "expr": "x-2",
                "ineq": ">",
                "label": "x>2"
              },
              {
                "expr": "5-x",
                "ineq": ">",
                "label": "x<5"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "先分开解：x>2 且 x<5；再取公共部分。",
        "两个读数同时大于 0 时 x 才合格——答案 2<x<5，是两段射线的重叠。"
      ],
      "examples": [
        {
          "text": "两个条件都要满足：像同时通过两道安检",
          "figure": "仪表盘"
        }
      ],
      "prev": "ch05-u1-l2-p1g",
      "next": "ch05-u1-l3-p1b"
    },
    {
      "id": "ch05-u1-l3-p1b",
      "title": "不等式组：分开解取公共",
      "concept": "讲解：一元一次不等式组",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 1 > 4",
          "translation": "第一个：x>3"
        },
        {
          "id": "f2",
          "latex": "2x < 10",
          "translation": "第二个：x<5"
        },
        {
          "id": "f3",
          "latex": "3 < x < 5",
          "translation": "公共部分：3<x<5"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "initial": 4,
            "label": "x",
            "max": 8,
            "min": 0,
            "step": 0.5
          },
          "mode": "system",
          "sets": [
            {
              "expr": "x-3",
              "ineq": ">",
              "label": "x>3（x+1>4 解得）"
            },
            {
              "expr": "5-x",
              "ineq": ">",
              "label": "x<5（2x<10 解得）"
            }
          ],
          "showProbe": true
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "system",
            "sets": [
              {
                "expr": "x-3",
                "ineq": ">",
                "label": "x>3（x+1>4 解得）"
              },
              {
                "expr": "5-x",
                "ineq": ">",
                "label": "x<5（2x<10 解得）"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "两步：先分开解出每个的解集，再取公共部分。",
        "无公共部分时写“无解”：比如 x>5 且 x<3。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x≥1 且 x<4：公共解集 1≤x<4（左实心右空心）。"
        }
      ],
      "prev": "ch05-u1-l3-p1",
      "next": "ch05-u2-l1-p1"
    }
  ]
};
