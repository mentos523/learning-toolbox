window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-u2-l3"] = {
  "lessonId": "ch12-u2-l3",
  "lessonTitle": "牛顿-莱布尼茨公式",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-u2-l3-p1",
      "title": "牛顿-莱布尼茨：面积=原函数之差",
      "concept": "牛顿-莱布尼茨公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{a}^{b} f(x) dx = F(b) - F(a)",
          "translation": "牛顿-莱布尼茨公式：定积分=原函数在两端点的值相减——不用再切碎求和"
        },
        {
          "id": "f2",
          "latex": "\\int_{0}^{4} x dx = \\frac{4^2}{2} - \\frac{0^2}{2} = 8",
          "translation": "例：∫₀⁴x dx=16/2−0=8——拖滑块到 b=4，读数'咔哒'停在 8"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 4,
          "step": 0.25,
          "label": "b",
          "expr": "b^2/2",
          "target": 8,
          "targetLabel": "找：b=4 时面积=8"
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 b 到 4'咔哒'：面积 8=F(4)−F(0)——不用再切碎求和。",
        "牛顿和莱布尼茨各自独立发现：积分从此有了'捷径'。"
      ],
      "examples": [
        {
          "text": "自由落体：已知速度 v=gt，求路程 s=gt²/2",
          "figure": "滑块实验"
        }
      ],
      "prev": "ch12-u2-l2-p1b",
      "next": "ch12-u2-l3-p1b"
    },
    {
      "id": "ch12-u2-l3-p1b",
      "title": "牛顿-莱布尼茨：两步算面积",
      "concept": "讲解：牛顿-莱布尼茨公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{1}^{2} x^2 dx",
          "translation": "第一步：找原函数 x³/3"
        },
        {
          "id": "f2",
          "latex": "= \\frac{8}{3} - \\frac{1}{3} = \\frac{7}{3}",
          "translation": "第二步：F(2)−F(1)=7/3"
        }
      ],
      "interaction": {
        "params": {
          "expr": "b^2/2",
          "label": "b",
          "max": 4,
          "min": 0,
          "step": 0.25,
          "target": 8,
          "targetLabel": "找：b=4 时面积=8"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "两步：找原函数 F；算 F(b)−F(a)。",
        "条件：f 在 [a,b] 上连续——初等函数在它有定义的区间上默认满足。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "∫₀^π sinxdx=[−cosx]₀^π=1+1=2。"
        }
      ],
      "prev": "ch12-u2-l3-p1",
      "next": "ch12-u2-l3-p2"
    },
    {
      "id": "ch12-u2-l3-p2",
      "title": "常数 C 在相减中消失",
      "concept": "原函数差与常数无关",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{a}^{b} f(x) dx = \\left(F(b)+C\\right) - \\left(F(a)+C\\right)",
          "translation": "两个原函数只差常数 C：相减时 C−C=0，C 被抵消"
        },
        {
          "id": "f2",
          "latex": "\\int_{0}^{3} 2x dx = (3^2 + 1) - (0^2 + 1) = 9",
          "translation": "用 F(x)=x²+1 也行：(9+1)−(0+1)=9——C 不影响结果"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": 0,
              "max": 4,
              "step": 0.1,
              "label": "x",
              "expr": "x^2"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": 0,
              "max": 4,
              "step": 0.1,
              "label": "x",
              "expr": "x^2+1"
            }
          },
          "sync": [
            "x"
          ],
          "labels": [
            "面积函数 A(x)=x²",
            "另一个原函数 F(x)=x²+1：整体上移"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "联动拖 x：两条曲线永远差 1——原函数不唯一，差一个常数 C。",
        "A(3)−A(0) 与 F(3)−F(0) 都是 9：相减时 C−C=0。"
      ],
      "examples": [
        {
          "text": "量身高：从 1 楼量和从 2 楼量，两人身高差不变",
          "figure": "并排对比"
        }
      ],
      "prev": "ch12-u2-l3-p1b",
      "next": "ch12-u2-l3-p2b"
    },
    {
      "id": "ch12-u2-l3-p2b",
      "title": "C 抵消：随便选个原函数",
      "concept": "讲解：原函数差与常数无关",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{0}^{2} 3x^2 dx",
          "translation": "原函数 x³+C"
        },
        {
          "id": "f2",
          "latex": "= (8 + C) - (0 + C) = 8",
          "translation": "C−C=0：用哪个 C 结果都是 8"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "A(x)=x²",
            "F(x)=x²+1"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "x^2",
              "label": "x",
              "max": 4,
              "min": 0,
              "step": 0.1
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "x^2+1",
              "label": "x",
              "max": 4,
              "min": 0,
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
        "定积分只用原函数的差：C 会被减掉，所以+C 写不写都行。",
        "但不定积分必须写 +C：它表示一整族原函数。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "∫₁²2xdx=(4+C)−(1+C)=3。"
        }
      ],
      "prev": "ch12-u2-l3-p2",
      "next": "ch12-u2-l4-p1"
    }
  ]
};
