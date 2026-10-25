window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g07-u1-l5"] = {
  "lessonId": "g07-u1-l5",
  "lessonTitle": "直径所对的圆周角",
  "chapterId": "g07",
  "pages": [
    {
      "id": "g07-u1-l5-p1",
      "title": "拖一拖：半圆上的角不变",
      "concept": "直径所对圆周角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle APB = 90\\text{度}",
          "translation": "∠APB 的读数：90 度"
        }
      ],
      "interaction": {
        "type": "vertex-drag",
        "params": {
          "vertices": [
            {
              "x": 20,
              "y": 52,
              "label": "A"
            },
            {
              "x": 80,
              "y": 52,
              "label": "B"
            },
            {
              "x": 65,
              "y": 78,
              "label": "P"
            }
          ],
          "showLengths": false,
          "showAngles": true,
          "base": [
            {
              "t": "arcpath",
              "c": [
                50,
                52
              ],
              "r": 30,
              "a1": 0,
              "a2": 180,
              "color": "line",
              "width": 2.5
            },
            {
              "t": "seg",
              "a": [
                20,
                52
              ],
              "b": [
                80,
                52
              ],
              "color": "line",
              "width": 3
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "只拖顶点 P：让它在圆上走——∠P 读数一直停在 90°（直角方块自动弹出）。",
        "A、B 是直径的两端（别拖它们）——动了就不是“直径所对”了。",
        "记住一句话：直径所对的圆周角，永远是直角。"
      ],
      "examples": [
        {
          "text": "半圆仪：卡在直径两端，顶点走到哪都是直角",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l4-p5",
      "next": "g07-u1-l5-p2"
    },
    {
      "id": "g07-u1-l5-p2",
      "title": "推论与逆命题：一对互逆",
      "concept": "直径推论与逆命题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{直径所对的圆周角} = \\text{直角}",
          "translation": "直径所对的圆周角是直角"
        },
        {
          "id": "f2",
          "latex": "\\text{圆周角} = 90\\text{度} \\Rightarrow \\text{所对弦是直径}",
          "translation": "90 度的圆周角所对的弦是直径"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "AB 是直径 → ∠APB 是直角：圆心角 ∠AOB 是平角 180°，一半就是 90°。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    52
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    20,
                    52
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    80,
                    52
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    82
                  ],
                  "p": [
                    20,
                    52
                  ],
                  "q": [
                    80,
                    52
                  ],
                  "size": 6
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    82
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "直径所对的圆周角是直角",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "反过来：∠APB = 90° → AB 一定是直径——“因为/所以”换位，意思就反了。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 30,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24.7,
                    35.9
                  ],
                  "b": [
                    75.3,
                    68.1
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    24.7,
                    35.9
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    82
                  ],
                  "b": [
                    75.3,
                    68.1
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    82
                  ],
                  "p": [
                    24.7,
                    35.9
                  ],
                  "q": [
                    75.3,
                    68.1
                  ],
                  "size": 6
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    82
                  ],
                  "label": "P",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "90° 的圆周角 → 对的弦是直径",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "推论：AB 是直径 → ∠APB 是直角（圆心角是平角 180°，一半就是 90°）。",
        "逆命题：∠APB = 90° → AB 是直径——“因为/所以”换位，意思就反了。",
        "生活例：直角三角板卡圆——斜边就是直径，斜边中点就是圆心。",
        "⚠️ 易错：逆命题只对 90° 成立——60° 的圆周角对的弦可不是直径。",
        "记住一句话：直径对直角，直角对直径——一对互逆。"
      ],
      "examples": [
        {
          "text": "找圆心：三角板卡住圆，斜边中点就是圆心",
          "figure": "实物"
        }
      ],
      "prev": "g07-u1-l5-p1",
      "next": "g07-u1-l6-p1"
    }
  ]
};
