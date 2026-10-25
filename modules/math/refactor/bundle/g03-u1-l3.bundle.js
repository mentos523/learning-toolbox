window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g03-u1-l3"] = {
  "lessonId": "g03-u1-l3",
  "lessonTitle": "三角形内角和",
  "chapterId": "g03",
  "pages": [
    {
      "id": "g03-u1-l3-p1",
      "title": "拖一拖：内角和永远是 180°",
      "concept": "三角形内角和实验",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle A + \\angle B + \\angle C = 180\\text{度}",
          "translation": "拖顶点时三个角度数在变，但它们的和永远是 180 度"
        }
      ],
      "interaction": {
        "type": "vertex-drag",
        "params": {
          "vertices": [
            {
              "x": 20,
              "y": 28,
              "label": "A"
            },
            {
              "x": 82,
              "y": 28,
              "label": "B"
            },
            {
              "x": 52,
              "y": 72,
              "label": "C"
            }
          ],
          "showLengths": true,
          "showAngles": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖动蓝色顶点：三角形变大变小、变胖变瘦。",
        "看顶部读数：三个角的度数在变，它们的和——永远 180°。",
        "没变的是：内角和 = 180°（这就是不变量徽章）。",
        "先动手看到，再问为什么——下页我们做 100 个实验。"
      ],
      "examples": [
        {
          "text": "量角器验证：拿纸三角形量一量，和也是 180°",
          "figure": "实测"
        }
      ],
      "prev": "g03-u1-l2-p4",
      "next": "g03-u1-l3-p2"
    },
    {
      "id": "g03-u1-l3-p2",
      "title": "只量 3 个就敢说永远？",
      "concept": "实验不是证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{量 100 个也是“量”，不是“证”}",
          "translation": "再多的测量也代替不了证明"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：量了 3 个三角形，内角和都是 180°——巧合吗？",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      60
                    ],
                    [
                      40,
                      60
                    ],
                    [
                      27,
                      34
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    27,
                    72
                  ],
                  "text": "180°",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      46,
                      60
                    ],
                    [
                      72,
                      60
                    ],
                    [
                      46,
                      34
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    59,
                    72
                  ],
                  "text": "180°",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      76,
                      60
                    ],
                    [
                      94,
                      60
                    ],
                    [
                      82,
                      30
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    85,
                    72
                  ],
                  "text": "180°",
                  "size": 12,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步：随机生成 100 个三角形，一字排开——全是 180°。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    56
                  ],
                  "text": "100 个三角形",
                  "size": 20,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    40
                  ],
                  "text": "180° × 100",
                  "size": 15,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    26
                  ],
                  "text": "全部 180°，一个不少",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：量 100 个也是“量”，不是“证”——第 101 个呢？",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    58
                  ],
                  "text": "量，永远量不完",
                  "size": 18,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    40
                  ],
                  "text": "我们要一次说清所有三角形",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "下页：撕角拼图",
                  "size": 13,
                  "color": "known"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "3 个三角形都是 180°——巧合吗？点 ▶ 看 100 个。",
        "100 个都对，但第 101 个呢？量，永远量不完。",
        "量出来的是“规律”，说清楚“为什么”的叫证明。",
        "下页：撕角拼图——拼一次，说清所有三角形。"
      ],
      "examples": [],
      "prev": "g03-u1-l3-p1",
      "next": "g03-u1-l3-p3"
    },
    {
      "id": "g03-u1-l3-p3",
      "title": "撕角拼角：拼成一条直线",
      "concept": "拼图证明内角和",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三个角拼成平角} = 180\\text{度}",
          "translation": "三个内角拼成一条直线，就是 180 度"
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
                      27
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
                  "a1": 304.9,
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
                  "a2": 235.1,
                  "r": 10,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    27
                  ],
                  "a1": 55.1,
                  "a2": 124.9,
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
                      27
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
                  "a2": 48,
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
                  "a1": 48,
                  "a2": 132,
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
                  "a1": 132,
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
                  "a2": 48,
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
                  "a1": 48,
                  "a2": 132,
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
                  "a1": 132,
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
        "点 ▶ 播放：三个角被“撕”下来，顶点拼到一起。",
        "看第 3 步：严丝合缝拼成一条直线——平角是 180°。",
        "拼的动作不依赖三角形的长相——哪个三角形来都一样拼。",
        "这就是证明的雏形：拼一次，就说清了所有三角形。"
      ],
      "examples": [
        {
          "text": "剪纸片：剪下纸三角形的三个角，自己拼一拼",
          "figure": "实测"
        }
      ],
      "prev": "g03-u1-l3-p2",
      "next": "g03-u1-l3-p4"
    },
    {
      "id": "g03-u1-l3-p4",
      "title": "证明：过顶点作平行线",
      "concept": "三角形内角和的证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle A + \\angle B + \\angle C = 180\\text{度}",
          "translation": "三角形三个内角的和等于 180 度"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "△ABC",
          "goal": "∠A + ∠B + ∠C = 180°",
          "steps": [
            {
              "caption": "第 1 步：过点 C 作直线 DE，使 DE ∥ AB。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      28
                    ],
                    [
                      82,
                      28
                    ],
                    [
                      58,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    72
                  ],
                  "b": [
                    88,
                    72
                  ],
                  "color": "aux",
                  "width": 2.5,
                  "dash": "6,4",
                  "arrows": 2
                },
                {
                  "t": "pt",
                  "p": [
                    58,
                    72
                  ],
                  "r": 3,
                  "color": "line"
                },
                {
                  "t": "txt",
                  "p": [
                    13,
                    68
                  ],
                  "text": "D",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    95,
                    68
                  ],
                  "text": "E",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    13,
                    24
                  ],
                  "text": "A",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    87,
                    24
                  ],
                  "text": "B",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    80
                  ],
                  "text": "C",
                  "size": 13,
                  "bold": true
                }
              ],
              "card": "画一条辅助线：过 C 作 AB 的平行线——给三个角搭个“舞台”。",
              "why": "依据：平行公理——过直线外一点，有且只有一条直线与已知直线平行。"
            },
            {
              "caption": "第 2 步：∠A = ∠ACD（内错角）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      28
                    ],
                    [
                      82,
                      28
                    ],
                    [
                      58,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    72
                  ],
                  "b": [
                    88,
                    72
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    18,
                    28
                  ],
                  "a1": 0,
                  "a2": 48,
                  "r": 11,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    72
                  ],
                  "a1": 180,
                  "a2": 228,
                  "r": 11,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    20
                  ],
                  "text": "∠A",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    46,
                    64
                  ],
                  "text": "∠ACD",
                  "size": 13,
                  "color": "corrA"
                }
              ],
              "card": "∠A 和 ∠ACD 是内错角——平行线一画，它们就相等了。",
              "why": "依据：平行线的性质——两直线平行，内错角相等。"
            },
            {
              "caption": "第 3 步：∠B = ∠BCE（内错角）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      28
                    ],
                    [
                      82,
                      28
                    ],
                    [
                      58,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    72
                  ],
                  "b": [
                    88,
                    72
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    82,
                    28
                  ],
                  "a1": 119,
                  "a2": 180,
                  "r": 11,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    72
                  ],
                  "a1": 299,
                  "a2": 360,
                  "r": 11,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    20
                  ],
                  "text": "∠B",
                  "size": 13,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    64
                  ],
                  "text": "∠BCE",
                  "size": 13,
                  "color": "corrB"
                }
              ],
              "card": "∠B 和 ∠BCE 也是内错角——同样相等。",
              "why": "依据：平行线的性质——内错角相等。"
            },
            {
              "caption": "第 4 步：∠ACD、∠C、∠BCE 拼成一条直线——180°。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    72
                  ],
                  "b": [
                    88,
                    72
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    28
                  ],
                  "b": [
                    58,
                    72
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    82,
                    28
                  ],
                  "b": [
                    58,
                    72
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    72
                  ],
                  "a1": 180,
                  "a2": 228,
                  "r": 11,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    72
                  ],
                  "a1": 228,
                  "a2": 299,
                  "r": 14,
                  "group": 3,
                  "color": "corrC"
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    72
                  ],
                  "a1": 299,
                  "a2": 360,
                  "r": 11,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    84
                  ],
                  "text": "DCE 是一条直线",
                  "size": 13,
                  "bold": true
                }
              ],
              "card": "看 DCE：三个角排排坐，拼成一条直线——180°。",
              "why": "依据：平角的定义——一条直线是 180°。"
            },
            {
              "caption": "第 5 步：把 ∠ACD、∠BCE 换成 ∠A、∠B——证毕。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      28
                    ],
                    [
                      82,
                      28
                    ],
                    [
                      58,
                      72
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "∠A + ∠B + ∠C = 180°",
                  "size": 15,
                  "bold": true,
                  "math": true
                }
              ],
              "card": "∠ACD=∠A、∠BCE=∠B，换一下：∠A+∠B+∠C=180°。",
              "why": "依据：等量代换。"
            }
          ],
          "summary": [
            {
              "statement": "过点 C 作直线 DE ∥ AB",
              "reason": "平行公理"
            },
            {
              "statement": "∠A = ∠ACD",
              "reason": "平行线性质：内错角相等"
            },
            {
              "statement": "∠B = ∠BCE",
              "reason": "平行线性质：内错角相等"
            },
            {
              "statement": "∠ACD + ∠C + ∠BCE = 180°",
              "reason": "平角的定义"
            },
            {
              "statement": "∴ ∠A + ∠B + ∠C = 180°",
              "reason": "等量代换"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "证明 = 把动画里的每个动作，用“因为……所以……”说清楚。",
        "已知（蓝）：△ABC；求证（红）：∠A+∠B+∠C=180°——每页证明先看三问。",
        "第一步为什么敢作平行线？点“为什么可以”——依据是平行公理。",
        "播完看“证明书”：左栏做了什么，右栏凭什么。"
      ],
      "examples": [
        {
          "text": "一句话证明：过 C 作 AB 的平行线，三个角就排排坐到一条直线上了",
          "figure": "点题"
        }
      ],
      "prev": "g03-u1-l3-p3",
      "next": "g03-u1-l3-p5"
    },
    {
      "id": "g03-u1-l3-p5",
      "title": "内角和定理：永远 180°",
      "concept": "三角形内角和定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle A + \\angle B + \\angle C = 180\\text{度}",
          "translation": "三角形三个内角的和等于 180 度"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：DE ∥ AB，∠A、∠B 被“搬”到了直线 DCE 上。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      28
                    ],
                    [
                      82,
                      28
                    ],
                    [
                      58,
                      72
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    72
                  ],
                  "b": [
                    88,
                    72
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    72
                  ],
                  "a1": 180,
                  "a2": 228,
                  "r": 11,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    72
                  ],
                  "a1": 228,
                  "a2": 299,
                  "r": 14,
                  "group": 3,
                  "color": "corrC"
                },
                {
                  "t": "arc",
                  "v": [
                    58,
                    72
                  ],
                  "a1": 299,
                  "a2": 360,
                  "r": 11,
                  "group": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "180°",
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
        "还记得吗？你拖顶点时三个角的和永远 180°——现在你知道为什么了。",
        "内角和定理：三角形三个内角的和是 180°。",
        "生活例：纸飞机——摊平纸飞机，折出来的三个角拼起来正好是平角。",
        "图形例：直角三角形里，两个锐角加起来是 90°（180°−90°）——它们互余。",
        "反例：别说“四边形的内角和也是 180°”——四边形留到下下课算，别急。",
        "⚠️ 别搞混：“量出来 180°”是实验，“证出来 180°”才是定理。",
        "记住一句话：三角形内角和，永远 180°。"
      ],
      "examples": [
        {
          "text": "纸飞机：折出来的角也能拼成 180°",
          "figure": "实物"
        }
      ],
      "prev": "g03-u1-l3-p4",
      "next": "g03-u1-l4-p1"
    }
  ]
};
