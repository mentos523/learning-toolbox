window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-u1-l4"] = {
  "lessonId": "ch12-u1-l4",
  "lessonTitle": "定积分的性质",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-u1-l4-p1",
      "title": "分开算再加，结果一样",
      "concept": "定积分的线性性质",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{0}^{a} (x + x^2) dx = \\int_{0}^{a} x dx + \\int_{0}^{a} x^2 dx",
          "translation": "线性性质：和的积分=积分的和——分开算再加，结果一样"
        },
        {
          "id": "f2",
          "latex": "\\int_{0}^{2} (x + x^2) dx = 2 + \\frac{8}{3} = \\frac{14}{3}",
          "translation": "a=2 时：2+8/3=14/3——拖滑块，左右两图读数永远相等"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": 0,
              "max": 3,
              "step": 0.25,
              "label": "a",
              "expr": "a^2/2+a^3/3"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": 0,
              "max": 3,
              "step": 0.25,
              "label": "a",
              "expr": "(3*a^2+2*a^3)/6"
            }
          },
          "sync": [
            "a"
          ],
          "labels": [
            "∫₀ᵃx dx + ∫₀ᵃx²dx：分开算再加",
            "∫₀ᵃ(x+x²)dx：先加再积分"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 a：左右读数永远相等——分开算再加，和先加再积分没区别。",
        "还有区间可加：∫₀¹+∫₁²=∫₀²，面积拼起来就是整体。"
      ],
      "examples": [
        {
          "text": "拼图：两块面积相加，整体等于部分之和",
          "figure": "并排对比"
        }
      ],
      "prev": "ch12-u1-l3-p1b",
      "next": "ch12-u1-l4-p1b"
    },
    {
      "id": "ch12-u1-l4-p1b",
      "title": "线性性质：分开算",
      "concept": "讲解：定积分的线性性质",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{0}^{1} (2x + 3) dx",
          "translation": "拆：∫2xdx+∫3dx"
        },
        {
          "id": "f2",
          "latex": "= 1 + 3 = 4",
          "translation": "2×(1/2)+3×1=1+3=4"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "分开算再加",
            "先加再积分"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "a^2/2+a^3/3",
              "label": "a",
              "max": 3,
              "min": 0,
              "step": 0.25
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "(3*a^2+2*a^3)/6",
              "label": "a",
              "max": 3,
              "min": 0,
              "step": 0.25
            }
          },
          "sync": [
            "a"
          ]
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "线性=可加可乘常数：∫(f+g)=∫f+∫g，∫(kf)=k∫f。",
        "区间也可加：∫₀¹+∫₁²=∫₀²。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "∫₀²(3x)dx=3∫₀²xdx=3×2=6。"
        }
      ],
      "prev": "ch12-u1-l4-p1",
      "next": "ch12-u2-l1-p1"
    }
  ]
};
