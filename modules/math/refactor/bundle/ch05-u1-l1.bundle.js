window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch05-u1-l1"] = {
  "lessonId": "ch05-u1-l1",
  "lessonTitle": "不等式的性质",
  "chapterId": "ch05",
  "pages": [
    {
      "id": "ch05-u1-l1-p1",
      "title": "天平不平：不等号的来历",
      "concept": "不等式的概念",
      "formulas": [
        {
          "id": "f1",
          "latex": "7 > 5",
          "translation": "7 大于 5：左边 7 克更重，天平向左倾"
        },
        {
          "id": "f2",
          "latex": "3 < 5",
          "translation": "3 小于 5：右边 5 克更重，天平向右倾"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "x",
            "min": 0,
            "max": 10,
            "step": 1
          },
          "mode": "compare",
          "sets": [
            {
              "expr": "x-5",
              "ineq": ">",
              "label": "x>5（左边沉）"
            },
            {
              "expr": "5-x",
              "ineq": ">",
              "label": "x<5（右边沉）"
            }
          ],
          "showProbe": true,
          "note": "同一数轴同时呈现 x>5 与 x<5 两个区域：开口朝大的一边"
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "compare",
            "sets": [
              {
                "expr": "x-5",
                "ineq": ">",
                "label": "x>5（左边沉）"
              },
              {
                "expr": "5-x",
                "ineq": ">",
                "label": "x<5（右边沉）"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "x=7比5大2，左边沉记作x>5；x=3还差2，右边沉记作x<5。",
        "不等号的开口永远朝向大的一边：> 和 < 是天平倾斜的画像。"
      ],
      "examples": [
        {
          "text": "跷跷板：重的一边下沉，轻的一边翘起",
          "figure": "滑块"
        }
      ],
      "prev": null,
      "next": "ch05-u1-l1-p1b"
    },
    {
      "id": "ch05-u1-l1-p1b",
      "title": "不等号：开口朝大的一边",
      "concept": "讲解：不等式的概念",
      "formulas": [
        {
          "id": "f1",
          "latex": "9 > 4",
          "translation": "9 大于 4：开口朝 9，9 是大的一边"
        },
        {
          "id": "f2",
          "latex": "x + 2 < 9",
          "translation": "x 加 2 小于 9：含未知数的不等式"
        },
        {
          "id": "f3",
          "latex": "2x + 1",
          "translation": "没有不等号：只是代数式，不是 不等式"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "x",
            "min": 0,
            "max": 10,
            "step": 1
          },
          "mode": "compare",
          "sets": [
            {
              "expr": "x-5",
              "ineq": ">",
              "label": "x>5：开口朝左，左边大"
            },
            {
              "expr": "x-5",
              "ineq": "<",
              "label": "x<5：开口朝右，右边大"
            }
          ],
          "showProbe": true,
          "note": "同一数轴同时呈现 x>5 与 x<5 两个区域：> 左边大，< 右边大"
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "compare",
            "sets": [
              {
                "expr": "x-5",
                "ineq": ">",
                "label": "x>5：开口朝左，左边大"
              },
              {
                "expr": "x-5",
                "ineq": "<",
                "label": "x<5：开口朝右，右边大"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "不等号开口永远朝大的一边：> 左边大，< 右边大。",
        "含未知数的不等式：解它就是找所有让它成立的 x。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "身高 h>170：h 是 171、180……都行——解集是一整段。"
        }
      ],
      "prev": "ch05-u1-l1-p1",
      "next": "ch05-u1-l1-p2"
    },
    {
      "id": "ch05-u1-l1-p2",
      "title": "两边加减，方向不变",
      "concept": "不等式的性质一",
      "formulas": [
        {
          "id": "f1",
          "latex": "5 < 8",
          "translation": "5 小于 8：起点，左边比右边小 3"
        },
        {
          "id": "f2",
          "latex": "5 + a < 8 + a",
          "translation": "5 加 a 小于 8 加 a：两边加同一个数 a，小的还是小的"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "a",
            "min": -5,
            "max": 5,
            "step": 1
          },
          "mode": "compare",
          "sets": [
            {
              "expr": "5-8",
              "ineq": "<",
              "label": "变形前：5<8"
            },
            {
              "expr": "(5+a)-(8+a)",
              "ineq": "<",
              "label": "变形后：5+a<8+a"
            }
          ],
          "showProbe": true,
          "note": "方向不变 ✅：两边加减同一个数，小的还是小的",
          "compareLabels": [
            "左边：5 + a",
            "右边：8 + a"
          ]
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "compare",
            "sets": [
              {
                "expr": "5-8",
                "ineq": "<",
                "label": "变形前：5<8"
              },
              {
                "expr": "(5+a)-(8+a)",
                "ineq": "<",
                "label": "变形后：5+a<8+a"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "性质一：不等式两边加（或减）同一个数，不等号的方向不变。",
        "5<8 两边都加 a：拖动滑块，左边永远比右边小 3。"
      ],
      "examples": [
        {
          "text": "天平两边同时加 2 个砝码，倾斜方向不变",
          "figure": "并排对比"
        }
      ],
      "prev": "ch05-u1-l1-p1b",
      "next": "ch05-u1-l1-p2b"
    },
    {
      "id": "ch05-u1-l1-p2b",
      "title": "性质一：加减方向不变",
      "concept": "讲解：不等式的性质一",
      "formulas": [
        {
          "id": "f1",
          "latex": "3 < 7",
          "translation": "3 小于 7：起点"
        },
        {
          "id": "f2",
          "latex": "3 - 5 < 7 - 5",
          "translation": "两边同减 5：−2<2，方向不变"
        },
        {
          "id": "f3",
          "latex": "x + 4 > 9 \\to x > 5",
          "translation": "活用：x+4>9 两边同减 4 得 x>5"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "a",
            "min": -5,
            "max": 5,
            "step": 1
          },
          "mode": "compare",
          "sets": [
            {
              "expr": "3-7",
              "ineq": "<",
              "label": "变形前：3<7"
            },
            {
              "expr": "(3-5)-(7-5)",
              "ineq": "<",
              "label": "变形后：3−5<7−5"
            }
          ],
          "showProbe": true,
          "note": "方向不变 ✅：性质一，两边加减同一个数",
          "compareLabels": [
            "左边：3+a",
            "右边：7+a"
          ]
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "compare",
            "sets": [
              {
                "expr": "3-7",
                "ineq": "<",
                "label": "变形前：3<7"
              },
              {
                "expr": "(3-5)-(7-5)",
                "ineq": "<",
                "label": "变形后：3−5<7−5"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "性质一：两边加减同一个数，不等号方向不变——小的还是小的。",
        "移项照样用：+4 过不等号变 −4，方向不用动。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x−3<5：两边同加 3 得 x<8（性质一，方向不变）。"
        }
      ],
      "prev": "ch05-u1-l1-p2",
      "next": "ch05-u1-l1-p3"
    },
    {
      "id": "ch05-u1-l1-p3",
      "title": "乘除负数，不等号反向",
      "concept": "不等式的性质二、三",
      "formulas": [
        {
          "id": "f1",
          "latex": "4 < 6",
          "translation": "4 小于 6：起点"
        },
        {
          "id": "f2",
          "latex": "4k > 6k (k < 0)",
          "translation": "k 小于 0 时 4k 大于 6k：两边乘同一个负数，不等号反向"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "k",
            "min": -2,
            "max": 2,
            "step": 1
          },
          "mode": "compare",
          "sets": [
            {
              "expr": "4-6",
              "ineq": "<",
              "label": "变形前：4<6"
            },
            {
              "expr": "4*k-6*k",
              "ineq": ">",
              "label": "变形后：4k>6k（k<0）"
            }
          ],
          "showProbe": true,
          "note": "方向反转 ⚠️：两边乘同一个负数，不等号翻面",
          "compareLabels": [
            "左边：4k",
            "右边：6k"
          ]
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "compare",
            "sets": [
              {
                "expr": "4-6",
                "ineq": "<",
                "label": "变形前：4<6"
              },
              {
                "expr": "4*k-6*k",
                "ineq": ">",
                "label": "变形后：4k>6k（k<0）"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "性质二：乘除同一个正数，方向不变；性质三：乘除同一个负数，方向反转。",
        "4<6，k 取 −1：−4>−6——乘了负数，不等号翻了个面。"
      ],
      "examples": [
        {
          "text": "数轴翻转：乘 −1 相当于把数轴照镜子",
          "figure": "并排对比"
        }
      ],
      "prev": "ch05-u1-l1-p2b",
      "next": "ch05-u1-l1-p3b"
    },
    {
      "id": "ch05-u1-l1-p3b",
      "title": "乘负数：不等号要翻面",
      "concept": "讲解：不等式的性质二、三",
      "formulas": [
        {
          "id": "f1",
          "latex": "2 < 5",
          "translation": "2 小于 5：起点"
        },
        {
          "id": "f2",
          "latex": "2 \\times (-3) > 5 \\times (-3)",
          "translation": "两边同乘 −3：−6>−15，方向翻了"
        },
        {
          "id": "f3",
          "latex": "-2x > 6 \\to x < -3",
          "translation": "活用：两边同除以 −2，不等号反向得 x<−3"
        }
      ],
      "interaction": {
        "type": "ineq-shade-lab",
        "params": {
          "source": {
            "label": "k",
            "min": -2,
            "max": 2,
            "step": 1
          },
          "mode": "compare",
          "sets": [
            {
              "expr": "2-5",
              "ineq": "<",
              "label": "变形前：2<5"
            },
            {
              "expr": "2*k-5*k",
              "ineq": ">",
              "label": "变形后：2k>5k（k<0）"
            }
          ],
          "showProbe": true,
          "note": "方向反转 ⚠️：两边同乘 −3，−6>−15",
          "compareLabels": [
            "左边：2k",
            "右边：5k"
          ]
        },
        "engine": {
          "primitive": "IneqShadeLab",
          "version": "2026.10.16.A",
          "params": {
            "mode": "compare",
            "sets": [
              {
                "expr": "2-5",
                "ineq": "<",
                "label": "变形前：2<5"
              },
              {
                "expr": "2*k-5*k",
                "ineq": ">",
                "label": "变形后：2k>5k（k<0）"
              }
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "只有乘除负数才反向：加减、乘除正数，方向都不变。",
        "−2x>6 得 x<−3：系数是负数，除过去必须翻面——第一易错点。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "x/(−2)>3：两边同乘 −2 得 x<−6（反向！）。"
        }
      ],
      "prev": "ch05-u1-l1-p3",
      "next": "ch05-u1-l2-p1"
    }
  ]
};
