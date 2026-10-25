window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u1-l3"] = {
  "lessonId": "ch08-u1-l3",
  "lessonTitle": "实数指数幂（直观版）",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u1-l3-p1",
      "title": "描点：y=2ˣ 是一条不断裂的曲线",
      "concept": "指数连续变化时幂也连续变化（直观）",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2^x",
          "translation": "y 等于 2 的 x 次方：x 取任意实数，所有点连成一条不断裂的曲线"
        },
        {
          "id": "f2",
          "latex": "2^{\\sqrt{2}}",
          "translation": "2 的 √2 次方：无理数指数直观上也有值；在 10.2.4 之后（附录 B）回填"
        }
      ],
      "interaction": {
        "type": "plot-points",
        "params": {
          "fn": "2^x",
          "xMin": -2,
          "xMax": 3,
          "step": 0.5,
          "autoPlay": true,
          "speed": 600
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一个亮一个：所有 (x, 2ˣ) 的点连起来，是一条光滑不断裂的曲线。",
        "无理数指数（如 2^√2）直观上也有值，附录 B 回填。"
      ],
      "examples": [
        {
          "text": "细菌每 20 分钟翻一倍：数量曲线就是 y=2ˣ 的形状",
          "figure": "描点成像"
        }
      ],
      "prev": "ch08-u1-l2-p1b",
      "next": "ch08-u1-l3-p1b"
    },
    {
      "id": "ch08-u1-l3-p1b",
      "title": "无理数指数：逼近",
      "concept": "讲解：无理数指数幂",
      "formulas": [
        {
          "id": "f1",
          "latex": "2^{1.4}, 2^{1.41}, 2^{1.414}",
          "translation": "√2≈1.4142…：用 1.4、1.41、1.414 一步步逼近"
        },
        {
          "id": "f2",
          "latex": "2^{\\sqrt{2}} \\approx 2.665",
          "translation": "越逼越准：2^√2≈2.665（计算器算的）"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "2^x",
          "speed": 600,
          "step": 0.1,
          "xMax": 2,
          "xMin": 1
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "无理数指数用有理数逼近：1.4→1.41→1.414→…，值越算越准。",
        "因为能无限逼近，y=2ˣ 的图像才不断裂——附录 B 回填严格定义。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "3^π：π≈3.14159…，3^3.14≈31.5，越逼越准。"
        }
      ],
      "prev": "ch08-u1-l3-p1",
      "next": "ch08-u2-l1-p1"
    }
  ]
};
