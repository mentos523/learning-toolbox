window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g00-u1-l3"] = {
  "lessonId": "g00-u1-l3",
  "lessonTitle": "图形会说话：直观证明",
  "chapterId": "g00",
  "pages": [
    {
      "id": "g00-u1-l3-p1",
      "title": "三个角拼一拼，会发生什么？",
      "concept": "拼图即证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三个角拼起来} = 180\\text{度}",
          "translation": "三个角拼成一条直线，一条直线是 180 度"
        }
      ],
      "interaction": {
        "type": "morph-toggle",
        "params": {
          "views": [
            {
              "label": "三个角分开",
              "caption": "三角形的三个角：∠1、∠2、∠3，各待各的位置。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      70
                    ],
                    [
                      80,
                      70
                    ],
                    [
                      50,
                      27.14
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    20,
                    70
                  ],
                  "a1": -55,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    80,
                    70
                  ],
                  "a1": 180,
                  "a2": 235,
                  "r": 10,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    27.14
                  ],
                  "a1": 55,
                  "a2": 125,
                  "r": 10,
                  "group": 3,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    31,
                    61
                  ],
                  "text": "∠1",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    69,
                    61
                  ],
                  "text": "∠2",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    40
                  ],
                  "text": "∠3",
                  "size": 13
                }
              ]
            },
            {
              "label": "拼成一条直线",
              "caption": "把三个角撕下来，顶点拼到一起——正好拼成一条直线！",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    45
                  ],
                  "b": [
                    80,
                    45
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 0,
                  "a2": 55,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 55,
                  "a2": 125,
                  "r": 12,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 125,
                  "a2": 180,
                  "r": 14,
                  "group": 3,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "180°",
                  "size": 14.48,
                  "bold": true
                }
              ]
            }
          ],
          "morph": {
            "kind": "assemble",
            "durationMs": 1400,
            "pairs": [
              [
                1,
                1
              ],
              [
                2,
                2
              ],
              [
                3,
                3
              ]
            ],
            "stagger": 0.15,
            "readout": {
              "template": "∠1+∠2+∠3 = {v}°",
              "from": 0,
              "to": 180,
              "decimals": 0
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
            "kind": "assemble"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "看左图：三个角各待各的位置。",
        "点“拼成一条直线”：把三个角撕下来拼到一起——严丝合缝！",
        "一条直线是 180°，所以三个角加起来就是 180°。",
        "拼的动作不依赖三角形的样子，拼一次就够了——这就是证明的雏形。"
      ],
      "examples": [
        {
          "text": "剪纸片：剪下纸三角形的三个角拼一拼",
          "figure": "实测"
        }
      ],
      "prev": "g00-u1-l2-p2",
      "next": "g00-u1-l3-p2"
    },
    {
      "id": "g00-u1-l3-p2",
      "title": "亲手拼一次：撕角拼平角",
      "concept": "撕角拼角",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{拼成的直线} = 180\\text{度}",
          "translation": "三个角拼成平角，就是 180 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：完整的三角形，三个角都在。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      70
                    ],
                    [
                      80,
                      70
                    ],
                    [
                      50,
                      27.14
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    20,
                    70
                  ],
                  "a1": -55,
                  "a2": 0,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    80,
                    70
                  ],
                  "a1": 180,
                  "a2": 235,
                  "r": 10,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    27.14
                  ],
                  "a1": 55,
                  "a2": 125,
                  "r": 10,
                  "group": 3,
                  "color": "corrAngle"
                }
              ]
            },
            {
              "caption": "第 2 步：把三个角撕下来，顶点拼到一起。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      70
                    ],
                    [
                      80,
                      70
                    ],
                    [
                      50,
                      27.14
                    ]
                  ],
                  "color": "line",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 0,
                  "a2": 55,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 55,
                  "a2": 125,
                  "r": 12,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 125,
                  "a2": 180,
                  "r": 14,
                  "group": 3,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    28,
                    45
                  ],
                  "b": [
                    72,
                    45
                  ],
                  "color": "aux",
                  "dash": "5,4"
                }
              ]
            },
            {
              "caption": "第 3 步：三个角拼成一条直线——内角和是 180°。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    45
                  ],
                  "b": [
                    80,
                    45
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 0,
                  "a2": 55,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 55,
                  "a2": 125,
                  "r": 12,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 125,
                  "a2": 180,
                  "r": 14,
                  "group": 3,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "三个角拼成平角",
                  "size": 15,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点 ▶ 播放：看三个角被“撕”下来。",
        "点 ◀ 倒回去，再看一遍“飞过去”的过程。",
        "拖进度条，停在刚拼好的那一帧：三个角拼成了一条直线。",
        "动手试：拿纸剪个三角形，撕下三个角拼一拼——你也能拼出 180°。"
      ],
      "examples": [
        {
          "text": "纸飞机：折出来的角也能这样拼",
          "figure": "实测"
        }
      ],
      "prev": "g00-u1-l3-p1",
      "next": "g00-u1-l3-p3"
    },
    {
      "id": "g00-u1-l3-p3",
      "title": "拼图为什么算证明？",
      "concept": "拼图证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三角形内角和} = 180\\text{度}",
          "translation": "三角形三个内角加起来是 180 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：三个角拼成一条直线——180°。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    45
                  ],
                  "b": [
                    80,
                    45
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 0,
                  "a2": 55,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 55,
                  "a2": 125,
                  "r": 12,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    45
                  ],
                  "a1": 125,
                  "a2": 180,
                  "r": 14,
                  "group": 3,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    28
                  ],
                  "text": "三个角拼成平角",
                  "size": 15,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？上一页你亲手拼过：三个角拼到一起，正好是一条直线——三个角加起来是 180°。",
        "拼图证明，就是“把要证的结论拼出来”：三个角拼成一条直线（180°），所以三角形三个内角的和是 180°。",
        "生活例：七巧板拼正方形——拼出来了，就说明面积相等。",
        "图形例：两个小三角形拼成一个大正方形。",
        "反例：三个角胡乱叠起来，拼不成直线——那是你拼错了，不是定理错了。",
        "⚠️ 别搞混：量 100 个三角形都是 180°，那叫“验证”，不是“证明”。",
        "拼图只拼一次就够了，因为拼的动作不看三角形的长相——这才叫证明。",
        "记住一句话：拼出来，就说清楚了。",
        "更严格的证明，我们在第 3 章用平行线再来一次。"
      ],
      "examples": [],
      "prev": "g00-u1-l3-p2",
      "next": "g00-u1-l4-p1"
    }
  ]
};
