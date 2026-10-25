window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch08-u2-l3"] = {
  "lessonId": "ch08-u2-l3",
  "lessonTitle": "对数函数",
  "chapterId": "ch08",
  "pages": [
    {
      "id": "ch08-u2-l3-p1",
      "title": "镜像：y=log₂x 与 y=2ˣ",
      "concept": "对数函数与指数函数互为镜像",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = 2^x",
          "translation": "指数函数 y 等于 2 的 x 次方：输入 x，输出 2ˣ"
        },
        {
          "id": "f2",
          "latex": "y = \\log_2 x (x > 0)",
          "translation": "对数函数 y 等于以 2 为底 x 的对数（x 大于 0）：倒过来读就是 x=2ʸ，输入输出互换"
        }
      ],
      "interaction": {
        "type": "side-compare",
        "params": {
          "left": {
            "kind": "slider-lab",
            "params": {
              "min": -3,
              "max": 3,
              "step": 0.25,
              "label": "x",
              "expr": "2^x",
              "target": 8,
              "targetLabel": "目标 8（2³=8）"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "min": 0.2,
              "max": 8,
              "step": 0.2,
              "label": "x",
              "expr": "log2(x)",
              "target": 3,
              "targetLabel": "目标 3（log₂8=3）"
            }
          },
          "labels": [
            "指数函数 y=2ˣ：关于直线 y=x 对称",
            "对数函数 y=log₂x：关于直线 y=x 对称"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "左图 x=3 得 2³=8，右图 x=8 得 log₂8=3——互逆数值。",
        "点 (3,8) 关于 y=x 翻转成 (8,3)：互为镜像。"
      ],
      "examples": [
        {
          "text": "密码锁的逆向：知道 2ˣ=8 反推 x=3，就是一次对数运算",
          "figure": "并排对比"
        }
      ],
      "prev": "ch08-u2-l2-p1b",
      "next": "ch08-u2-l3-p1b"
    },
    {
      "id": "ch08-u2-l3-p1b",
      "title": "互逆：去程与回程",
      "concept": "讲解：指数与对数互逆",
      "formulas": [
        {
          "id": "f1",
          "latex": "3^4 = 81",
          "translation": "去程：指数运算"
        },
        {
          "id": "f2",
          "latex": "\\log_3 81 = 4",
          "translation": "回程：对数运算，回到指数 4"
        },
        {
          "id": "f3",
          "latex": "2^{\\log_2 5} = 5",
          "translation": "先对数后指数：回到 5——互逆的铁证"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "指数之旅：x→2ˣ",
            "对数之旅：x→log₂x"
          ],
          "left": {
            "kind": "slider-lab",
            "params": {
              "expr": "2^x",
              "label": "x",
              "max": 3,
              "min": -3,
              "step": 0.25,
              "target": 8,
              "targetLabel": "目标 8"
            }
          },
          "right": {
            "kind": "slider-lab",
            "params": {
              "expr": "log2(x)",
              "label": "x",
              "max": 8,
              "min": 0.2,
              "step": 0.2,
              "target": 3,
              "targetLabel": "目标 3"
            }
          }
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "互逆=输入输出互换：2³=8 与 log₂8=3 说的是一回事。",
        "a^(logₐN)=N，logₐ(aˣ)=x：一去一回，原地踏步。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "10^(lg7)=7；ln(e³)=3。"
        }
      ],
      "prev": "ch08-u2-l3-p1",
      "next": "ch08-u2-l3-p1g"
    },
    {
      "id": "ch08-u2-l3-p1g",
      "title": "镜像：关于 y=x 对称",
      "concept": "图形：指数与对数关于 y=x 对称",
      "formulas": [
        {
          "id": "f1",
          "latex": "(3, 8), (8, 3)",
          "translation": "点 (3,8) 在指数曲线上；翻转成 (8,3) 落在对数曲线上"
        },
        {
          "id": "f2",
          "latex": "y = x",
          "translation": "对称轴 y=x：两条曲线关于它镜像对称"
        }
      ],
      "interaction": {
        "params": {
          "labels": [
            "y=2ˣ",
            "y=log₂x：关于 y=x 镜像"
          ],
          "left": {
            "kind": "plot-points",
            "params": {
              "autoPlay": true,
              "fn": "2^x",
              "speed": 500,
              "step": 0.5,
              "xMax": 3,
              "xMin": -3
            }
          },
          "right": {
            "kind": "plot-points",
            "params": {
              "autoPlay": true,
              "fn": "log2(x)",
              "speed": 500,
              "step": 0.5,
              "xMax": 8,
              "xMin": 0.1
            }
          }
        },
        "type": "side-compare"
      },
      "auxInteraction": null,
      "hints": [
        "左图描出 (3,8)，右图描出 (8,3)：横纵坐标互换。",
        "互逆=输入输出互换：图像上就是关于 y=x 翻转。"
      ],
      "examples": [
        {
          "figure": "数形结合",
          "text": "10²=100 与 lg100=2：点 (2,100) 与 (100,2) 关于 y=x 对称。"
        }
      ],
      "prev": "ch08-u2-l3-p1b",
      "next": "ch08-u2-l4-p1"
    }
  ]
};
