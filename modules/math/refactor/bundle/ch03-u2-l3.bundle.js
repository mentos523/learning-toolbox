window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch03-u2-l3"] = {
  "lessonId": "ch03-u2-l3",
  "lessonTitle": "分式方程",
  "chapterId": "ch03",
  "pages": [
    {
      "id": "ch03-u2-l3-p1",
      "title": "去分母：两边同乘",
      "concept": "分式方程的解法",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{3}{x} = 1",
          "translation": "x 分之 3 等于 1：分母里有未知数的方程叫分式方程"
        },
        {
          "id": "f2",
          "latex": "3 = x",
          "translation": "两边同乘最简公分母 x：得到 3 等于 x"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "3/x",
          "target": 1,
          "targetLabel": "右边 = 1",
          "graph": {
            "kind": "rational",
            "forbidAt": [
              0
            ]
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "rational",
            "forbidAt": [
              0
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "分母里有未知数 ⟺ 分式方程；去分母：两边同乘最简公分母 x（x≠0——分母不能乘丢铁律），化成整式方程。",
        "拖动滑块找到 x=3：这就是去分母后解出来的答案，回代验算一下。"
      ],
      "examples": [
        {
          "text": "3/x=1：x=3 时左边恰好等于 1",
          "figure": "滑块"
        }
      ],
      "prev": "ch03-u2-l2-p2b",
      "next": "ch03-u2-l3-p1b"
    },
    {
      "id": "ch03-u2-l3-p1b",
      "title": "分式方程：去分母三步",
      "concept": "讲解：分式方程的解法",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{4}{x} = 2",
          "translation": "第一步：找最简公分母 x（x≠0，分母不能为零）"
        },
        {
          "id": "f2",
          "latex": "4 = 2x",
          "translation": "第二步：两边同乘 x，分母消失，变成整式方程"
        },
        {
          "id": "f3",
          "latex": "x = 4",
          "translation": "第三步：x=4；检验：4≠0，不在禁区，通过"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "4/x",
          "target": 2,
          "targetLabel": "右边 = 2",
          "graph": {
            "kind": "rational",
            "forbidAt": [
              0
            ]
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "rational",
            "forbidAt": [
              0
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "解分式方程三步：找最简公分母；两边同乘去分母；解整式方程。",
        "去分母的依据是等式性质 2：两边乘同一个不为 0 的整式。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "2/(x+1)=1：同乘 (x+1) 得 2=x+1，x=1；检验 x+1=2≠0。"
        }
      ],
      "prev": "ch03-u2-l3-p1",
      "next": "ch03-u2-l3-p2"
    },
    {
      "id": "ch03-u2-l3-p2",
      "title": "增根：闯入禁区的解",
      "concept": "增根与检验",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{x}{x-2} = \\frac{2}{x-2}",
          "translation": "x 除以 x 减 2，等于 2 除以 x 减 2"
        },
        {
          "id": "f2",
          "latex": "x = 2 \\rightarrow x - 2 = 0",
          "translation": "去分母解得 x=2，但此时分母为零：这是增根，要舍去"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 5,
          "step": 1,
          "label": "x",
          "expr": "x - 2",
          "target": 0,
          "targetLabel": "禁区：分母为零",
          "graph": {
            "kind": "rational",
            "forbidAt": [],
            "markX": [
              2
            ]
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "rational",
            "forbidAt": [],
            "markX": [
              2
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "去分母得 x=2；可 x=2 恰是第 2 页说的禁区——分母为零，原方程无意义。",
        "增根必须舍去，原方程无解；所以解分式方程最后一步永远是检验。"
      ],
      "examples": [
        {
          "text": "x=2 是“假解”：它闯入了分母为零的禁区",
          "figure": "滑块"
        }
      ],
      "prev": "ch03-u2-l3-p1b",
      "next": "ch03-u2-l3-p2b"
    },
    {
      "id": "ch03-u2-l3-p2b",
      "title": "增根：解完必须检验",
      "concept": "讲解：增根与检验",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{x}{x-3} = \\frac{3}{x-3}",
          "translation": "两边同乘 (x−3) 去分母"
        },
        {
          "id": "f2",
          "latex": "x = 3",
          "translation": "解得 x=3"
        },
        {
          "id": "f3",
          "latex": "x - 3 = 0 \\to \\text{舍去}",
          "translation": "检验：x=3 让分母为零，是增根，原方程无解"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 0,
          "max": 6,
          "step": 1,
          "label": "x",
          "expr": "x - 3",
          "target": 0,
          "targetLabel": "禁区：分母为零",
          "graph": {
            "kind": "rational",
            "forbidAt": [],
            "markX": [
              3
            ]
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "rational",
            "forbidAt": [],
            "markX": [
              3
            ]
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "增根=去分母时混进来的假解：它让分母为零，必须舍去。",
        "分式方程最后一步永远是检验：代入最简公分母，为零就舍去。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "1/(x−2)=3/(x−2)：去分母得 1=3，无解——连增根都没有。"
        }
      ],
      "prev": "ch03-u2-l3-p2",
      "next": "ch03-u2-l4-p1"
    }
  ]
};
