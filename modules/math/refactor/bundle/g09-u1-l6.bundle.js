window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g09-u1-l6"] = {
  "lessonId": "g09-u1-l6",
  "lessonTitle": "应用：测高与测距",
  "chapterId": "g09",
  "pages": [
    {
      "id": "g09-u1-l6-p1",
      "title": "影子测高",
      "concept": "相似三角形测高",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{1.6}{2} = \\frac{h}{10}",
          "translation": "1.6 比 2 等于旗杆高比 10"
        },
        {
          "id": "f2",
          "latex": "h = 8",
          "translation": "旗杆高 8 米"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：同一时刻，太阳光线平行——人影 2 米，旗杆影 10 米。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    25
                  ],
                  "b": [
                    92,
                    25
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    25
                  ],
                  "b": [
                    30,
                    45
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    26,
                    36
                  ],
                  "text": "1.6米",
                  "size": 11.89
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    25
                  ],
                  "b": [
                    41.5,
                    25
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    36,
                    20
                  ],
                  "text": "影2米",
                  "size": 11.89
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    25
                  ],
                  "b": [
                    65,
                    70
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    50
                  ],
                  "text": "h=?",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    25
                  ],
                  "b": [
                    91,
                    25
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    78,
                    20
                  ],
                  "text": "影10米",
                  "size": 11.89
                },
                {
                  "t": "seg",
                  "a": [
                    22,
                    58
                  ],
                  "b": [
                    34,
                    37.2
                  ],
                  "color": "aux",
                  "width": 2,
                  "arrows": 1
                },
                {
                  "t": "seg",
                  "a": [
                    53,
                    88
                  ],
                  "b": [
                    65,
                    67.2
                  ],
                  "color": "aux",
                  "width": 2,
                  "arrows": 1
                }
              ]
            },
            {
              "caption": "第 2 步：人、旗杆都垂直地面，光线平行——两个三角形两对角相等（AA 相似）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    25
                  ],
                  "b": [
                    92,
                    25
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    25
                  ],
                  "b": [
                    30,
                    45
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    25
                  ],
                  "b": [
                    41.5,
                    25
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    25
                  ],
                  "p": [
                    30,
                    45
                  ],
                  "q": [
                    41.5,
                    25
                  ],
                  "size": 5,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    25
                  ],
                  "b": [
                    65,
                    70
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    25
                  ],
                  "b": [
                    91,
                    25
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "right",
                  "v": [
                    65,
                    25
                  ],
                  "p": [
                    65,
                    70
                  ],
                  "q": [
                    91,
                    25
                  ],
                  "size": 5,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    41.5,
                    25
                  ],
                  "b": [
                    30,
                    45
                  ],
                  "color": "aux",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    91,
                    25
                  ],
                  "b": [
                    65,
                    70
                  ],
                  "color": "aux",
                  "width": 2
                },
                {
                  "t": "arc",
                  "v": [
                    41.5,
                    25
                  ],
                  "a1": 120,
                  "a2": 180,
                  "r": 6,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    91,
                    25
                  ],
                  "a1": 120,
                  "a2": 180,
                  "r": 6,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    12
                  ],
                  "text": "AA 相似",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：列比例式 1.6/2 = h/10——旗杆高 8 米，没爬上去就量出来了。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    25
                  ],
                  "b": [
                    92,
                    25
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    25
                  ],
                  "b": [
                    30,
                    45
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    25
                  ],
                  "b": [
                    65,
                    70
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    55
                  ],
                  "text": "1.6/2 = h/10",
                  "size": 15,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    70
                  ],
                  "text": "h = 8 米",
                  "size": 15,
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
        "太阳光线平行 → 两个三角形有两对角相等（直角 + 光线与地面的夹角）。",
        "AA 相似：人高/人影 = 旗杆高/旗杆影——1.6/2 = h/10。",
        "解得旗杆高 8 米——没爬上去就量出来了，这就是相似的威力。"
      ],
      "examples": [
        {
          "text": "泰勒斯测金字塔：等影子等于身高时量",
          "figure": "故事"
        }
      ],
      "prev": "g09-u1-l5-p5",
      "next": "g09-u1-l6-p2"
    },
    {
      "id": "g09-u1-l6-p2",
      "title": "建模四步：生活→图形→列式→求解",
      "concept": "相似应用的建模流程",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{生活} \\Rightarrow \\text{图形} \\Rightarrow \\text{列式} \\Rightarrow \\text{求解}",
          "translation": "先把生活翻译成图形，再列式求解"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：建模四步——先翻译成三角形，再让相似干活。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    75
                  ],
                  "text": "① 生活：影子、标杆",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    60
                  ],
                  "text": "② 图形：画出两个三角形",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    45
                  ],
                  "text": "③ 列式：对应边成比例",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "④ 求解：解比例式",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？影子测高就是四步：看到影子 → 画出两个三角形 → 列 1.6/2=h/10 → 解出 8 米。",
        "建模四步：生活 → 图形 → 列式 → 求解——先翻译成三角形，再让相似干活。",
        "生活例：泰勒斯等到自己的影子等于身高时去量，金字塔的影子多长，金字塔就有多高。",
        "图形例：标杆测距——眼睛、标杆顶、目标顶三点一线，摆出两个相似三角形。",
        "反例：阴天没有影子、光线不平行——摆不出相似三角形，就不能用这个方法。",
        "⚠️ 别搞混：对应边要“对上号”——人高对旗杆高，人影对旗杆影，交叉了就错了。",
        "记住一句话：先翻译成三角形，再让相似干活。"
      ],
      "examples": [
        {
          "text": "泰勒斯与金字塔的故事",
          "figure": "故事"
        }
      ],
      "prev": "g09-u1-l6-p1",
      "next": "g09-u1-l6-p3"
    },
    {
      "id": "g09-u1-l6-p3",
      "title": "例题：河对岸的树有多远",
      "concept": "标杆测距例题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{1}{2} = \\frac{h}{32}",
          "translation": "1 比 2 等于树高比 32"
        },
        {
          "id": "f2",
          "latex": "h = 16",
          "translation": "树高 16 米"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：小三角形（眼—杆顶）相似于大三角形（眼—树顶）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    20
                  ],
                  "b": [
                    90,
                    20
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "pt",
                  "p": [
                    20,
                    20
                  ],
                  "label": "眼",
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    35,
                    20
                  ],
                  "b": [
                    35,
                    32
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    28
                  ],
                  "text": "1米",
                  "size": 11.89
                },
                {
                  "t": "txt",
                  "p": [
                    28,
                    14
                  ],
                  "text": "2米",
                  "size": 11.89
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    20
                  ],
                  "b": [
                    80,
                    68
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    86,
                    46
                  ],
                  "text": "h",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    12
                  ],
                  "text": "32米",
                  "size": 11.89
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    20
                  ],
                  "b": [
                    35,
                    32
                  ],
                  "color": "aux",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    20
                  ],
                  "b": [
                    80,
                    68
                  ],
                  "color": "aux",
                  "width": 2
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "题目：眼睛离标杆 2 米，标杆高出视线 1 米；标杆离河对岸的树 30 米。树有多高？",
        "视线从眼睛出发，经过杆顶，落到树顶——小三角形与大三角形 AA 相似。",
        "列式：1/2 = h/32——树高 h=16 米。河没过去，树高量出来了。",
        "自查：每个“因为”都有理由吗？光线是直线（已知），两三角形共一个角、都有直角（AA 判定）。"
      ],
      "examples": [
        {
          "text": "标杆测距：不过河量树高",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l6-p2",
      "next": "g09-u1-l7-p1"
    }
  ]
};
