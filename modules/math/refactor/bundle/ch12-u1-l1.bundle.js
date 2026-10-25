window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-u1-l1"] = {
  "lessonId": "ch12-u1-l1",
  "lessonTitle": "曲边梯形的面积（一）：分割与近似",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-u1-l1-p1",
      "title": "已知速度求路程：先切碎",
      "concept": "曲边梯形的面积",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{路程} = \\text{速度图像下的面积}",
          "translation": "v=2t 的图像下方、0 到 4 秒围出的面积，就是走过的路程"
        },
        {
          "id": "f2",
          "latex": "S_{256} = 16.0625 \\approx 16",
          "translation": "4 份时面积和 20，256 份时 16.0625——份数越多，越接近真实值 16"
        }
      ],
      "interaction": {
        "type": "subdivision",
        "params": {
          "fn": "2*x",
          "a": 0,
          "b": 4,
          "steps": [
            4,
            16,
            64,
            256
          ],
          "showError": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "先看懂这张图：横轴是时间 t（秒），纵轴是速度 v（米/秒）；点 (2, 4) 读作“第 2 秒时速度 4 米/秒”。",
        "点档位按钮：4→16→64→256 份，矩形越分越细，面积和越贴近 16。",
        "这就是积分第一步'分割'：曲边形切成直边小矩形再相加。"
      ],
      "examples": [
        {
          "text": "曲边田地：先数整格再估半格——阿基米德的做法",
          "figure": "细分动画"
        }
      ],
      "prev": "ch11-u3-l4-p1",
      "next": "ch12-u1-l1-p1b"
    },
    {
      "id": "ch12-u1-l1-p1b",
      "title": "曲边面积：切碎再拼",
      "concept": "讲解：曲边梯形的面积",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{0}^{2} x^2 dx",
          "translation": "y=x² 从 0 到 2 下方的曲边面积"
        },
        {
          "id": "f2",
          "latex": "S_4 = 3.75",
          "translation": "切 4 份：右端点矩形和 3.75"
        },
        {
          "id": "f3",
          "latex": "S_{100} \\approx 2.69",
          "translation": "切 100 份：≈2.69，越来越接近 8/3≈2.67"
        }
      ],
      "interaction": {
        "params": {
          "a": 0,
          "b": 2,
          "fn": "x^2",
          "showError": true,
          "steps": [
            4,
            16,
            64,
            256
          ]
        },
        "type": "subdivision"
      },
      "auxInteraction": null,
      "hints": [
        "曲边形面积三步：分割（切碎）、近似（矩形代替）、求和。",
        "份数越多误差越小：这是积分思想的全部。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "湖泊面积：方格纸数格子，格子越小越准。"
        }
      ],
      "prev": "ch12-u1-l1-p1",
      "next": "ch12-u1-l2-p1"
    }
  ]
};
