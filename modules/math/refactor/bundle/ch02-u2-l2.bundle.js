window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch02-u2-l2"] = {
  "lessonId": "ch02-u2-l2",
  "lessonTitle": "完全平方公式",
  "chapterId": "ch02",
  "pages": [
    {
      "id": "ch02-u2-l2-p1",
      "title": "(a+b)²：别忘了中间的 2ab",
      "concept": "完全平方公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "(a + b)^2 = a^2 + 2ab + b^2",
          "translation": "a 加 b 和的平方，等于 a 平方加 2ab 加 b 平方"
        },
        {
          "id": "f2",
          "latex": "(a - b)^2 = a^2 - 2ab + b^2",
          "translation": "a 减 b 差的平方，等于 a 平方减 2ab 加 b 平方"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 0,
          "max": 10,
          "step": 0.5,
          "label": "x",
          "expr": "(x+2)^2"
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖 x：(x+2)² 永远等于 x²+4x+4。",
        "最容易漏掉 2ab：(x+2)² 是 x²+4x+4，不是 x²+4。"
      ],
      "examples": [
        {
          "text": "正方形切成四块：x²、2x、2x、4",
          "figure": "滑块"
        }
      ],
      "prev": "ch02-u2-l1-p1g",
      "next": "ch02-u2-l2-p1b"
    },
    {
      "id": "ch02-u2-l2-p1b",
      "title": "完全平方：别漏 2ab",
      "concept": "讲解：完全平方公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x + 4)^2",
          "translation": "套公式 (a+b)²=a²+2ab+b²：a=x，b=4"
        },
        {
          "id": "f2",
          "latex": "x^2 + 8x + 16",
          "translation": "a²=x²，2ab=2·x·4=8x，b²=16"
        },
        {
          "id": "f3",
          "latex": "(x - 3)^2 = x^2 - 6x + 9",
          "translation": "(a−b)²：中间是 −2ab，但最后一项永远是 +b²"
        }
      ],
      "interaction": {
        "params": {
          "expr": "(x+4)^2",
          "label": "x",
          "max": 10,
          "min": 0,
          "step": 0.5
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "完全平方=三项：首平方、尾平方、中间是首尾积的 2 倍。",
        "最高频错误：(x+4)² 写成 x²+16——漏了中间的 8x，默写三遍记住它。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(2x+1)²=4x²+4x+1：a=2x，2ab=2·2x·1=4x。"
        }
      ],
      "prev": "ch02-u2-l2-p1",
      "next": "ch02-u2-l2-p1g"
    },
    {
      "id": "ch02-u2-l2-p1g",
      "title": "完全平方：切成四块看",
      "concept": "图形：完全平方的面积意义",
      "formulas": [
        {
          "id": "f1",
          "latex": "(a + b)^2 = a^2 + 2ab + b^2",
          "translation": "大正方形 = a² + 两条 ab 长方形 + b² 小正方形"
        },
        {
          "id": "f2",
          "latex": "5^2 = 3^2 + 2 \\times 3 \\times 2 + 2^2",
          "translation": "取 a=3、b=2：25=9+12+4，数格子验证"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "a²",
            "(a+b)²：多了两条 ab 和一个 b²"
          ],
          "left": {
            "kind": "shape-area",
            "params": {
              "initial": 3,
              "label": "a",
              "max": 6,
              "min": 1,
              "showGrid": true,
              "step": 1
            }
          },
          "right": {
            "kind": "shape-area",
            "params": {
              "initial": 5,
              "label": "a+b",
              "max": 8,
              "min": 2,
              "showGrid": true,
              "step": 1
            }
          }
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "右图边长 a+b：切成四块——a²、两个 ab、b²。",
        "总说漏 2ab 的同学请数格子：25 格里有 12 格是那两条长方形。",
        "H1 互链：同一张 (a+b)² 图，几何 g05-u1-l2 用它证勾股定理——姊妹篇互相认亲。"
      ],
      "examples": [
        {
          "figure": "口算技巧",
          "text": "102²=(100+2)²=10000+400+4=10404：完全平方口算。"
        }
      ],
      "prev": "ch02-u2-l2-p1b",
      "next": "ch02-u3-l1-p1"
    }
  ]
};
