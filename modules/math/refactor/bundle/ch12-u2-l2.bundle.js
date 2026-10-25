window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-u2-l2"] = {
  "lessonId": "ch12-u2-l2",
  "lessonTitle": "原函数与不定积分",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-u2-l2-p1",
      "title": "原函数：坡度的逆运算",
      "concept": "原函数与不定积分",
      "formulas": [
        {
          "id": "f1",
          "latex": "(\\frac{x^3}{3})' = x^2",
          "translation": "F(x)=x³/3 求导得 x²——F 就是 f 的'原函数'"
        },
        {
          "id": "f2",
          "latex": "\\int x^2 dx = \\frac{x^3}{3} + C",
          "translation": "不定积分：全体原函数记作 ∫x²dx=x³/3+C，C 是任意常数"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": -2,
              "max": 2,
              "step": 0.1,
              "label": "x",
              "expr": "x^3/3"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": -2,
              "max": 2,
              "step": 0.1,
              "label": "x",
              "expr": "x^2"
            }
          },
          "sync": [
            "x"
          ],
          "labels": [
            "F(x)=x³/3：原函数",
            "F'(x)=x²：求导回到 f"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "联动拖 x：右图读数永远是左图曲线在该点的坡度。",
        "F'=f：原函数就是'坡度为 f 的那条路'，+C 是上下平移。"
      ],
      "examples": [
        {
          "text": "已知坡度找路：坡度处处为 2x 的路是 x²+C",
          "figure": "并排对比"
        }
      ],
      "prev": "ch12-u2-l1-p1b",
      "next": "ch12-u2-l2-p1b"
    },
    {
      "id": "ch12-u2-l2-p1b",
      "title": "原函数：倒着求导",
      "concept": "讲解：原函数与不定积分",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x^2)' = 2x",
          "translation": "顺着：x² 求导得 2x"
        },
        {
          "id": "f2",
          "latex": "\\int 2x dx = x^2 + C",
          "translation": "倒着：2x 的原函数是 x²+C"
        },
        {
          "id": "f3",
          "latex": "(x^2 + 5)' = 2x",
          "translation": "C=5 也行：常数求导是 0"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "F(x)=x³/3：原函数",
            "F'(x)=x²：求导回到 f"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "x^3/3",
              "label": "x",
              "max": 2,
              "min": -2,
              "step": 0.1
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "x^2",
              "label": "x",
              "max": 2,
              "min": -2,
              "step": 0.1
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
        "原函数=求导的逆运算：(F)'=f，则 F 是 f 的原函数。",
        "+C 不能丢：x²、x²+1、x²−100 的导数都是 2x。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "∫3x²dx=x³+C：因为 (x³)'=3x²。"
        }
      ],
      "prev": "ch12-u2-l2-p1",
      "next": "ch12-u2-l3-p1"
    }
  ]
};
