window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch09-u2-l2"] = {
  "lessonId": "ch09-u2-l2",
  "lessonTitle": "等差数列求和",
  "chapterId": "ch09",
  "pages": [
    {
      "id": "ch09-u2-l2-p1",
      "title": "高斯配对：等差数列求和",
      "concept": "等差数列求和",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_n = \\frac{n(a_1 + a_n)}{2}",
          "translation": "前 n 项和 = n×(首项+末项)÷2：首尾配对，每对的和都相等"
        },
        {
          "id": "f2",
          "latex": "S_{100} = \\frac{100 \\times 101}{2} = 5050",
          "translation": "高斯算法：1 到 100 配成 50 对，每对 101，总和 5050"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 20,
          "step": 1,
          "label": "n",
          "expr": "n*(n+1)/2",
          "target": 55,
          "targetLabel": "S₁₀=55"
        }
      },
      "auxInteraction": null,
      "hints": [
        "首尾配对：1+100=101，2+99=101……共 50 对。",
        "配对法的简写：约 n/2 对，每对 (a₁+aₙ)；n 为奇数时中间项单留。"
      ],
      "examples": [
        {
          "text": "高斯 10 岁：老师刚写完 1+2+…+100，他报出 5050",
          "figure": "滑块"
        }
      ],
      "prev": "ch09-u2-l1-p2b",
      "next": "ch09-u2-l2-p1b"
    },
    {
      "id": "ch09-u2-l2-p1b",
      "title": "高斯配对：首尾相加",
      "concept": "讲解：等差数列求和",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_{10} = 1 + 2 + \\cdot\\cdot\\cdot + 10",
          "translation": "1 到 10 求和"
        },
        {
          "id": "f2",
          "latex": "(1 + 10) \\times 5 = 55",
          "translation": "配 5 对，每对 11：55"
        },
        {
          "id": "f3",
          "latex": "S_n = \\frac{n(n+1)}{2}",
          "translation": "一般：1 到 n 的和 = n(n+1)/2"
        }
      ],
      "interaction": {
        "params": {
          "expr": "n*(n+1)/2",
          "label": "n",
          "max": 20,
          "min": 1,
          "step": 1,
          "target": 55,
          "targetLabel": "S₁₀=55"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "配对=首项+末项：1+100，2+99，…，每对和相等。",
        "n 为奇数时中间项落单：1 到 9，中间 5 单留，4 对×10+5=45。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "电影院第一排 20 座，每排多 2 座，10 排共 10×(20+38)/2=290 座。"
        }
      ],
      "prev": "ch09-u2-l2-p1",
      "next": "ch09-u2-l3-p1"
    }
  ]
};
