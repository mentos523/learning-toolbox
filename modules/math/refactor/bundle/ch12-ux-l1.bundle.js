window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch12-ux-l1"] = {
  "lessonId": "ch12-ux-l1",
  "lessonTitle": "第十二章习题",
  "chapterId": "ch12",
  "pages": [
    {
      "id": "ch12-ux-l1-p1",
      "title": "第十二章习题：定积分",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\int_{0}^{1} x dx = \\frac{1}{2}",
          "translation": "第 1 题：三角形面积 1×1/2"
        }
      ],
      "interaction": {
        "params": {
          "expr": "a^2/2",
          "label": "a",
          "max": 4,
          "min": 0,
          "step": 0.25,
          "target": 0.5,
          "targetLabel": "第 1 题：a=1 时面积=1/2"
        },
        "type": "slider-lab"
      },
      "auxInteraction": null,
      "hints": [
        "1．∫₀¹x dx=____。",
        "2．∫₀²3dx=____。",
        "3．∫₁³x²dx=____。",
        "4．d/dx ∫₀ˣ2t dt=____。",
        "5．∫x³dx=____。",
        "6．∫₀^π sin x dx=____。",
        "7．汽车速度 v=4t（m/s），0 到 5 秒行驶____米。"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：1．1/2；2．6；3．26/3；4．2x；5．x⁴/4+C；6．2；7．50 米"
        },
        {
          "figure": "错因解析",
          "text": "1．∫₀¹x dx=[x²/2]₀¹=1/2。2．∫₀²3dx=3×(2−0)=6——常数积分=常数×区间长。3．∫₁³x²dx=[x³/3]₁³=(27−1)/3=26/3。4．变上限积分求导：d/dx∫₀ˣ2t dt=2x——上限代入被积函数。5．幂法则逆用：∫x³dx=x⁴/4+C——别漏 +C。6．∫₀^π sin x dx=[−cos x]₀^π=(−cosπ)−(−cos0)=1+1=2。7．路程=∫₀⁵4t dt=[2t²]₀⁵=50 米——v−t 图像下的面积。"
        }
      ],
      "prev": "ch12-u2-l5-p1",
      "next": null
    }
  ]
};
