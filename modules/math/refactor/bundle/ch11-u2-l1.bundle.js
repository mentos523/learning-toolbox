window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch11-u2-l1"] = {
  "lessonId": "ch11-u2-l1",
  "lessonTitle": "基本初等函数的导数",
  "chapterId": "ch11",
  "pages": [
    {
      "id": "ch11-u2-l1-p1",
      "title": "求导公式表：幂法则先行",
      "concept": "基本初等函数的导数",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x^n)' = n x^{n-1}",
          "translation": "幂法则：指数落下来当系数，指数减 1——如 (x³)'=3x²"
        },
        {
          "id": "f2",
          "latex": "(e^x)' = e^x",
          "translation": "指数法则：eˣ 求导不变；一般 (aˣ)'=aˣ ln a"
        },
        {
          "id": "f3",
          "latex": "(\\ln x)' = \\frac{1}{x}",
          "translation": "对数法则：(ln x)'=1/x（x>0）"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "plot-points",
            "params": {
              "fn": "sin(x)",
              "xMin": 0,
              "xMax": 6.3,
              "step": 0.2,
              "autoPlay": true,
              "speed": 400
            }
          },
          "right": {
            "kind": "plot-points",
            "params": {
              "fn": "cos(x)",
              "xMin": 0,
              "xMax": 6.3,
              "step": 0.2,
              "autoPlay": true,
              "speed": 400
            }
          },
          "labels": [
            "y = sin x（原函数）",
            "y' = cos x（它的斜率函数）"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "右图：sin x 每点斜率连起来就是 cos x，即 (sin x)'=cos x。",
        "符号别错：(cos x)'=−sin x，多一个负号。"
      ],
      "examples": [
        {
          "text": "8.3 的前置：三角函数图像当时只讲定义，现在它的导数也有了",
          "figure": "并排对比"
        }
      ],
      "prev": "ch11-u1-l3-p1g",
      "next": "ch11-u2-l1-p1b"
    },
    {
      "id": "ch11-u2-l1-p1b",
      "title": "求导公式：先背幂法则",
      "concept": "讲解：基本初等函数的导数",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x^5)' = 5x^4",
          "translation": "指数 5 落下来当系数，指数减 1"
        },
        {
          "id": "f2",
          "latex": "(\\frac{1}{x})' = -\\frac{1}{x^2}",
          "translation": "1/x=x⁻¹：(−1)x⁻²=−1/x²"
        },
        {
          "id": "f3",
          "latex": "(\\sqrt{x})' = \\frac{1}{2\\sqrt{x}}",
          "translation": "√x=x^(1/2)：(1/2)x^(−1/2)"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "y=sin x",
            "y'=cos x"
          ],
          "left": {
            "kind": "plot-points",
            "params": {
              "autoPlay": true,
              "fn": "sin(x)",
              "speed": 400,
              "step": 0.2,
              "xMax": 6.3,
              "xMin": 0
            }
          },
          "right": {
            "kind": "plot-points",
            "params": {
              "autoPlay": true,
              "fn": "cos(x)",
              "speed": 400,
              "step": 0.2,
              "xMax": 6.3,
              "xMin": 0
            }
          }
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "幂法则 (xⁿ)'=nxⁿ⁻¹：先把分数、根号化成 xⁿ 再求导。",
        "常数求导是 0：(5)'=0——水平的线，斜率为 0。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(x²+3x)'=2x+3：和差法则，先拆再导。"
        }
      ],
      "prev": "ch11-u2-l1-p1",
      "next": "ch11-u2-l2-p1"
    }
  ]
};
