window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch09-u2-l4"] = {
  "lessonId": "ch09-u2-l4",
  "lessonTitle": "等比数列求和",
  "chapterId": "ch09",
  "pages": [
    {
      "id": "ch09-u2-l4-p1",
      "title": "错位相减：等比数列求和",
      "concept": "等比数列求和",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_n = \\frac{a_1(1 - q^n)}{1 - q} (q \\neq 1)",
          "translation": "前 n 项和 = a₁×(1−qⁿ)÷(1−q)：q≠1 时成立，分母不能为 0"
        },
        {
          "id": "f2",
          "latex": "S_7 = 2^7 - 1 = 127",
          "translation": "验算：1+2+4+…+64，拖到 n=7，S₇=127，恰好 2⁷−1"
        }
      ],
      "interaction": {
        "type": "slider-lab",
        "params": {
          "min": 1,
          "max": 12,
          "step": 1,
          "label": "n",
          "expr": "2^n-1",
          "target": 127,
          "targetLabel": "S₇=127"
        }
      },
      "auxInteraction": null,
      "hints": [
        "错位相减：Sₙ 乘以 q 再相减，中间项全消掉，只剩首尾。",
        "q=1 是特例：每项都是 a₁，Sₙ=n×a₁。"
      ],
      "examples": [
        {
          "text": "1+2+4+…+2ⁿ⁻¹：翻一番的累积有多快",
          "figure": "滑块"
        }
      ],
      "prev": "ch09-u2-l3-p1b",
      "next": "ch09-u2-l4-p1b"
    },
    {
      "id": "ch09-u2-l4-p1b",
      "title": "错位相减：中间全消",
      "concept": "讲解：等比数列求和",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = 1 + 2 + 4 + 8",
          "translation": "S=15（4 项）"
        },
        {
          "id": "f2",
          "latex": "2S = 2 + 4 + 8 + 16",
          "translation": "两边乘公比 2：错开一位"
        },
        {
          "id": "f3",
          "latex": "2S - S = 16 - 1 = 15",
          "translation": "相减：中间 2、4、8 全消掉"
        }
      ],
      "interaction": {
        "params": {
          "expr": "2^n-1",
          "label": "n",
          "max": 12,
          "min": 1,
          "step": 1,
          "target": 127,
          "targetLabel": "S₇=127"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "错位相减：Sₙ 乘 q（错一位），第 k 项对上第 k+1 项；相减全消，只剩首尾。",
        "条件：q≠1；q=1 时 Sₙ=na₁。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "1+3+9+27：q=3，S₄=(3⁴−1)/2=40。"
        }
      ],
      "prev": "ch09-u2-l4-p1",
      "next": "ch09-u2-l4-p2"
    },
    {
      "id": "ch09-u2-l4-p2",
      "title": "棋盘麦粒：指数爆炸的故事",
      "concept": "指数增长的威力",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_{64} = 2^{64} - 1",
          "translation": "64 格麦粒总和 = 2⁶⁴−1，约 1.8×10¹⁹ 粒——天文数字"
        }
      ],
      "interaction": {
        "type": "numeric-lab",
        "params": {
          "mode": "accumulate",
          "term": "2^(n-1)",
          "maxSteps": 15,
          "buttonLabel": "加一格",
          "showTrend": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "每点一次加一格：总数翻一番再加 1，1→3→7→15→…。",
        "第 64 格单独就要 2⁶³≈9.2×10¹⁸ 粒——指数增长快得离谱。"
      ],
      "examples": [
        {
          "text": "古印度传说：国王奖励发明象棋的大臣",
          "figure": "数值实验"
        }
      ],
      "prev": "ch09-u2-l4-p1b",
      "next": "ch09-u2-l4-p2b"
    },
    {
      "id": "ch09-u2-l4-p2b",
      "title": "指数爆炸：翻一番的威力",
      "concept": "讲解：指数增长",
      "formulas": [
        {
          "id": "f1",
          "latex": "2^{10} = 1024",
          "translation": "第 10 格：1024 粒"
        },
        {
          "id": "f2",
          "latex": "2^{20} = 1048576",
          "translation": "第 20 格：约 100 万粒"
        },
        {
          "id": "f3",
          "latex": "2^{30} \\approx 10^9",
          "translation": "第 30 格：约 10 亿粒——棋盘才走了一半！"
        }
      ],
      "interaction": {
        "params": {
          "buttonLabel": "加一格",
          "maxSteps": 15,
          "mode": "accumulate",
          "showTrend": true,
          "term": "2^(n-1)"
        },
        "type": "numeric-lab"
      },
      "auxInteraction": null,
      "hints": [
        "指数增长=越涨越快：第 30 格一格就顶前面 29 格的总和。",
        "2¹⁰≈10³：记住 1024≈1000，估算指数有抓手。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "一张纸对折 30 次：2³⁰ 层，厚度约 10 万米！"
        }
      ],
      "prev": "ch09-u2-l4-p2",
      "next": "ch09-u2-l5-p1"
    }
  ]
};
