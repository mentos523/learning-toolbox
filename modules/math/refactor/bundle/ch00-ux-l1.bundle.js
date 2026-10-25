window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch00-ux-l1"] = {
  "lessonId": "ch00-ux-l1",
  "lessonTitle": "第零章习题",
  "chapterId": "ch00",
  "pages": [
    {
      "id": "ch00-ux-l1-p1",
      "title": "第零章习题：猜数字与天平",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "x + 5 = 12",
          "translation": "本章核心：含有未知数的等式叫方程"
        }
      ],
      "interaction": {
        "type": "placeholder-morph",
        "params": {
          "autoPlay": true,
          "expr": "□ + 5 = 12",
          "interval": 1200,
          "stages": [
            "□",
            "△",
            "x"
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "1．□+7=15，□ 是几？",
        "2．x+4=9，x 是几？",
        "3．买菜花 12 元还剩 23 元，钱包原来有几元？",
        "4．天平左：1 个 x 盒 +2 个砝码；右：9 个砝码。x 是几？",
        "5．x−3=10，x 是几？（天平两边同时加 3）",
        "6．2+x=2+5，x 是几？（先算出右边）"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：1．8；2．5；3．35 元；4．7；5．13；6．5"
        },
        {
          "figure": "错因解析",
          "text": "1．想加算减：15−7=8，验算 8+7=15。2．等式两边同时减 4：x=9−4=5。3．“花掉的+剩下的=原来的”：12+23=35 元。4．天平两边同时拿掉 2 个砝码：x=9−2=7。5．两边同时加 3：x=10+3=13。6．先算右边=7：2+x=7，x=5——等式两边各减 2。"
        }
      ],
      "prev": "ch00-u1-l1-p2b",
      "next": null
    }
  ]
};
