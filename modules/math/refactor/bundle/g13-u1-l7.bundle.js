window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g13-u1-l7"] = {
  "lessonId": "g13-u1-l7",
  "lessonTitle": "圆的方程",
  "chapterId": "g13",
  "pages": [
    {
      "id": "g13-u1-l7-p1",
      "title": "圆心拖到哪里，方程跟到哪里",
      "concept": "圆的标准方程",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x-a)^2 + (y-b)^2 = r^2",
          "translation": "圆心 (a,b)、半径 r 的圆：(x−a)² + (y−b)² = r²"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：圆心在原点——x²+y²=4（g08.1.5 的老朋友）。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 24,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "x² + y² = 4",
                  "size": 15,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：圆心拖到 (3, 1)——方程变成 (x−3)²+(y−1)²=4。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    62,
                    58
                  ],
                  "r": 24,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    62,
                    58
                  ],
                  "label": "C",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    58
                  ],
                  "text": "C(3, 1)",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "(x−3)² + (y−1)² = 4",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：圆心再拖到 (−2, 3)——(x+2)²+(y−3)²=1。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    42,
                    66
                  ],
                  "r": 16,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    42,
                    66
                  ],
                  "label": "C",
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    66
                  ],
                  "text": "C(−2, 3)",
                  "size": 12,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "(x+2)² + (y−3)² = 1",
                  "size": 14.48,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "圆心动，方程里的 a、b 跟着动——方程是圆的“身份证号”。",
        "第 1 步：圆心在原点，方程退化成 x²+y²=r²（g08.1.5 的老朋友）。"
      ],
      "examples": [
        {
          "text": "给圆搬家：圆心坐标就是方程里的 a、b",
          "figure": "方法"
        }
      ],
      "prev": "g13-u1-l6-p5",
      "next": "g13-u1-l7-p2"
    },
    {
      "id": "g13-u1-l7-p2",
      "title": "圆的方程：平移推广",
      "concept": "圆的标准方程",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x-a)^2 + (y-b)^2 = r^2",
          "translation": "圆心 (a,b)、半径 r 的圆的方程"
        },
        {
          "id": "f2",
          "latex": "(x-3)^2 + (y-1)^2 = 4",
          "translation": "例：圆心 (3,1)、半径 2 的圆：(x−3)²+(y−1)²=4"
        }
      ],
      "interaction": {
        "type": "morph-toggle",
        "params": {
          "views": [
            {
              "label": "圆心在原点",
              "caption": "圆心 O(0,0)：x²+y²=r²（g08.1.5）。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 24,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "x² + y² = r²",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "圆心在 (a,b)",
              "caption": "把圆“搬”到 (a,b)：x 换成 x−a，y 换成 y−b。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    62,
                    58
                  ],
                  "r": 24,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    62,
                    58
                  ],
                  "label": "C",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "(x−a)² + (y−b)² = r²",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            }
          ],
          "morph": {
            "kind": "translate",
            "durationMs": 1200,
            "pairs": [
              [
                0,
                0
              ],
              [
                1,
                1
              ]
            ],
            "readout": {
              "template": "(x−{a})²+(y−{b})²=r²",
              "a": {
                "from": 0,
                "to": 1
              },
              "b": {
                "from": 0,
                "to": 1
              },
              "decimals": 1
            }
          },
          "controls": {
            "play": true,
            "scrub": true,
            "step": true,
            "replay": true
          }
        },
        "engine": {
          "primitive": "MorphToggle",
          "version": "2026.10.16.A",
          "params": {
            "kind": "translate"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "人话版：圆上每一点到圆心 (a,b) 的距离都是 r——距离公式直接写出来，就是 (x−a)²+(y−b)²=r²。",
        "这是 g08.1.5 的平移推广：把圆心从原点“搬”到 (a,b)，方程里的 x、y 就变成 x−a、y−b。",
        "生活例：“把圆搬家，方程跟着搬”——平移的思想（g02.2.4）又回来了。",
        "记住一句话：圆心定位置，半径定大小，方程全写下。"
      ],
      "examples": [
        {
          "text": "x−a：向右搬 a；y−b：向上搬 b",
          "figure": "方法"
        }
      ],
      "prev": "g13-u1-l7-p1",
      "next": "g13-u1-l7-p3"
    },
    {
      "id": "g13-u1-l7-p3",
      "title": "例题：写方程，判点位",
      "concept": "圆的方程例题",
      "formulas": [
        {
          "id": "f1",
          "latex": "(x-2)^2 + (y+1)^2 = 9",
          "translation": "圆心 (2,−1)、半径 3 的圆：(x−2)²+(y+1)²=9"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：圆心 (2, −1)、半径 3。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    56,
                    44
                  ],
                  "r": 27,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    56,
                    44
                  ],
                  "label": "C",
                  "color": "known",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    66,
                    44
                  ],
                  "text": "C(2, −1)",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "r = 3",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：写方程 (x−2)²+(y+1)²=9——注意 y−(−1)=y+1。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    56,
                    44
                  ],
                  "r": 27,
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "(x−2)² + (y+1)² = 9",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "y−(−1) = y+1，符号别抄错",
                  "size": 12
                }
              ]
            },
            {
              "caption": "第 3 步：P(2, 2) 代入：0+9=9——在圆上。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    56,
                    44
                  ],
                  "r": 27,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    56,
                    62
                  ],
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    66,
                    62
                  ],
                  "text": "P(2, 2)",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "(2−2)²+(2+1)² = 9：在圆上",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "第 4 步：Q(0, 0) 代入：4+1=5<9——在圆内。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    56,
                    44
                  ],
                  "r": 27,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    44,
                    32
                  ],
                  "color": "corrB",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    34,
                    32
                  ],
                  "text": "Q(0, 0)",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "(0−2)²+(0+1)² = 5 < 9：在圆内",
                  "size": 13,
                  "bold": true,
                  "color": "corrB"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "先写方程：(x−2)²+(y+1)²=9——注意 y−(−1)=y+1，符号别抄错。",
        "判点位：代入算一算，=9 在圆上，<9 在圆内，>9 在圆外。"
      ],
      "examples": [
        {
          "text": "方程是圆的“安检门”：代入就知道点在哪",
          "figure": "方法"
        }
      ],
      "prev": "g13-u1-l7-p2",
      "next": "g13-u1-l8-p1"
    }
  ]
};
