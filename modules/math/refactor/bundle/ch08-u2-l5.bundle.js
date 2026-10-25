window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u2-l5"] = {
  "lessonId": "ch08-u2-l5",
  "lessonTitle": "指数对数方程",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u2-l5-p1",
      "title": "方程的解是交点的横坐标",
      "concept": "方程的解是图像交点的横坐标",
      "formulas": [
        {
          "id": "f1",
          "latex": "2^x = x + 1",
          "translation": "2 的 x 次方等于 x 加 1：左边是指数函数，右边是直线，解就是两条曲线交点的横坐标"
        },
        {
          "id": "f2",
          "latex": "x = 0, x = 1",
          "translation": "恰有两个解：x=0（1=1）和 x=1（2=2），代入检验都成立"
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
      "auxInteraction": {
        "type": "plot-points",
        "params": {
          "fn": "x+1",
          "xMin": -2,
          "xMax": 3,
          "step": 0.5,
          "autoPlay": true,
          "speed": 600
        }
      },
      "hints": [
        "两条曲线都画出来：交于 x=0 和 x=1——方程的解就是交点的横坐标。",
        "代入检验：x=0 得 1=1，x=1 得 2=2——解恰有两个。"
      ],
      "examples": [
        {
          "text": "跃升 3 的回声：二次方程的解也是抛物线与横轴交点的横坐标",
          "figure": "描点成像"
        }
      ],
      "prev": "ch08-u2-l4-p1b",
      "next": "ch08-u2-l5-p1b"
    },
    {
      "id": "ch08-u2-l5-p1b",
      "title": "图像解方程：找交点",
      "concept": "讲解：用图像解方程",
      "formulas": [
        {
          "id": "f1",
          "latex": "3^x = 9",
          "translation": "左边指数曲线，右边水平直线 y=9"
        },
        {
          "id": "f2",
          "latex": "x = 2",
          "translation": "交点横坐标 x=2：3²=9"
        }
      ],
      "interaction": {
        "params": {
          "autoPlay": true,
          "fn": "3^x",
          "speed": 600,
          "step": 0.5,
          "xMax": 3,
          "xMin": -1
        },
        "type": "plot-points"
      },
      "auxInteraction": null,
      "hints": [
        "图像解方程三步：左右两边各画一条曲线；找交点；读横坐标。",
        "交点个数=解的个数：没交点就无解。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "(1/2)ˣ=x+1：画出来交于 x=0（1=1）。"
        }
      ],
      "prev": "ch08-u2-l5-p1",
      "next": "ch08-u2-l6-p1"
    }
  ]
};
