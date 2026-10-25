window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g04-u1-l5"] = {
  "lessonId": "g04-u1-l5",
  "lessonTitle": "等腰三角形的性质",
  "chapterId": "g04",
  "pages": [
    {
      "id": "g04-u1-l5-p1",
      "title": "对折：两边严丝合缝",
      "concept": "等腰三角形对称直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB=AC \\Rightarrow \\text{对折重合}",
          "translation": "两腰相等的三角形，沿中间对折能完全重合"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：等腰三角形 ABC，AB=AC，AD 是中间的折痕。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    24,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    76,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    74
                  ],
                  "label": "A",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    24,
                    34
                  ],
                  "label": "B",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    76,
                    34
                  ],
                  "label": "C",
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "AB = AC（两腰）",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：沿 AD 对折，左半翻到右半去。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      50,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    76,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "aux",
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "翻过去……",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：完全重合——两底角压在一起，两腰压在一起。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      50,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "arc",
                  "v": [
                    76,
                    34
                  ],
                  "a1": 125,
                  "a2": 180,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    34
                  ],
                  "a1": 0,
                  "a2": 90,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    76,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "∠B 与 ∠C 重合",
                  "size": 14.48,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "看第 3 步：对折后，∠B 和 ∠C 严丝合缝压在一起。",
        "变了什么：左半翻到了右边；没变的是：两底角相等、两腰重合。",
        "对折看到的规律，下一页我们用文字说出来。"
      ],
      "examples": [
        {
          "text": "剪纸：剪个等腰三角形对折，两边严丝合缝",
          "figure": "实测"
        }
      ],
      "prev": "g04-u1-l4-p4",
      "next": "g04-u1-l5-p2"
    },
    {
      "id": "g04-u1-l5-p2",
      "title": "性质 1：等边对等角",
      "concept": "等边对等角",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB=AC \\Rightarrow \\angle B=\\angle C",
          "translation": "等腰三角形中，相等的两边所对的两个角也相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两腰同色，底角同弧——等边对等角。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    24,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    76,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    24,
                    34
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
                    76,
                    34
                  ],
                  "a1": 125,
                  "a2": 180,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "等边对等角",
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
        "还记得吗？对折后，两底角严丝合缝压在一起——它们相等。",
        "人话：等腰三角形，两条相等的边（腰）对着的两个角（底角）也相等——等边对等角。",
        "生活例：衣架——挂钩在中点，两边一样长才不歪；屋顶人字梁两边坡度一样。",
        "反例：不等边三角形，对折后两边压不到一起——角也不等。",
        "⚠️ 别搞混：“等边”指的是两腰相等，“对等角”指的是它们对面的底角。",
        "记住一句话：腰等，则底角等。"
      ],
      "examples": [
        {
          "text": "衣架：两边一样长，挂起来才不歪",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l5-p1",
      "next": "g04-u1-l5-p3"
    },
    {
      "id": "g04-u1-l5-p3",
      "title": "慢放证明：等边对等角",
      "concept": "等边对等角证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB=AC \\Rightarrow \\angle B=\\angle C",
          "translation": "用 SAS 全等证明：等边对等角"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "card": "已知 AB=AC。作顶角平分线 AD（辅助线）。",
              "reason": "已知（蓝色）；辅助线：灰色虚线，自己添的",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    24,
                    34
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    76,
                    34
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "aux",
                  "dash": "5,4",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    34
                  ],
                  "label": "D",
                  "color": "aux"
                }
              ]
            },
            {
              "card": "∠BAD=∠CAD——AD 是顶角的平分线。",
              "reason": "角平分线定义（g01.2.2）：平分线把角分成两个相等的角",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "aux",
                  "dash": "5,4",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    74
                  ],
                  "a1": 237,
                  "a2": 270,
                  "r": 10,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    74
                  ],
                  "a1": 270,
                  "a2": 303,
                  "r": 10,
                  "group": 1,
                  "color": "target"
                }
              ]
            },
            {
              "card": "△ABD ≌ △ACD：AB=AC、∠BAD=∠CAD、AD=AD。",
              "reason": "SAS 判定（g04.1.3）：两边及夹角对应相等",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      50,
                      34
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      76,
                      34
                    ],
                    [
                      50,
                      34
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "aux",
                  "dash": "5,4",
                  "width": 2.5
                }
              ]
            },
            {
              "card": "∠B=∠C——全等三角形对应角相等。得证。",
              "reason": "全等性质（g04.1.1）：对应角相等",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    24,
                    34
                  ],
                  "a1": 0,
                  "a2": 55,
                  "r": 10,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "arc",
                  "v": [
                    76,
                    34
                  ],
                  "a1": 125,
                  "a2": 180,
                  "r": 10,
                  "group": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "∠B = ∠C",
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
        "慢放：点 ▶，看辅助线 AD 如何“造”出两个三角形。",
        "关键一步：第 3 步——两个小三角形用 SAS 全等了。",
        "对折是“看到”，证明是“说清为什么”——两套语言，一个结论。",
        "下一页：用这个结论再证第二条性质。"
      ],
      "examples": [
        {
          "text": "证明阅读三问：已知是什么？求证是什么？为什么敢作 AD？",
          "figure": "方法"
        }
      ],
      "prev": "g04-u1-l5-p2",
      "next": "g04-u1-l5-p4"
    },
    {
      "id": "g04-u1-l5-p4",
      "title": "慢放证明：三线合一",
      "concept": "三线合一证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{顶角平分线} = \\text{底边中线} = \\text{底边高}",
          "translation": "等腰三角形中，顶角平分线、底边中线、底边上的高是同一条线"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "steps": [
            {
              "card": "承接上页：已证 △ABD ≌ △ACD。",
              "reason": "P3 的阶段性结论，本页接着用",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      50,
                      34
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      76,
                      34
                    ],
                    [
                      50,
                      34
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "aux",
                  "dash": "5,4",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "从“已证全等”出发",
                  "size": 13
                }
              ]
            },
            {
              "card": "BD=CD——AD 是底边 BC 的中线。",
              "reason": "全等对应边相等；中线定义（g03.1.2）：连顶点与对边中点",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    34
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "ticks": 1,
                  "color": "target"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    34
                  ],
                  "b": [
                    76,
                    34
                  ],
                  "ticks": 1,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "BD = CD：中线",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "card": "∠ADB=∠ADC=90°——AD 是底边的高。",
              "reason": "对应角相等＋两角互补（平角 180°）→ 都是 90°",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    34
                  ],
                  "p": [
                    24,
                    34
                  ],
                  "q": [
                    50,
                    74
                  ],
                  "size": 7,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "∠ADB = 90°：高",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "card": "AD 又是角平分线、又是中线、又是高——三线合一。",
              "reason": "同一条 AD，身兼三职",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "三线合一",
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
        "慢放：点 ▶，看同一条 AD 如何“身兼三职”。",
        "关键一步：第 3 步——两个 90° 是怎么算出来的？（互补又相等）",
        "想一想：为什么普通三角形没有三线合一？"
      ],
      "examples": [
        {
          "text": "折痕 AD：既是角平分线，又是中线，又是高",
          "figure": "实测"
        }
      ],
      "prev": "g04-u1-l5-p3",
      "next": "g04-u1-l5-p5"
    },
    {
      "id": "g04-u1-l5-p5",
      "title": "性质 2：三线合一",
      "concept": "三线合一",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{顶角平分线} = \\text{底边中线} = \\text{底边高}",
          "translation": "等腰三角形顶角平分线、底边中线、底边高三线合一"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：对折的折痕——它既是角平分线，又是中线，又是高。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      74
                    ],
                    [
                      24,
                      34
                    ],
                    [
                      76,
                      34
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    74
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    34
                  ],
                  "b": [
                    50,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    34
                  ],
                  "b": [
                    76,
                    34
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    34
                  ],
                  "p": [
                    24,
                    34
                  ],
                  "q": [
                    50,
                    74
                  ],
                  "size": 7,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "一条线，三种身份",
                  "size": 13,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？对折的折痕 AD——它既是角平分线，又是中线，又是高，三条线合成一条。",
        "人话：等腰三角形里，顶角平分线、底边中线、底边上的高是同一条线——三线合一。",
        "生活例：衣架的挂钩线——挂正了（中线）、两边对称（角平分线）、垂直（高），全是这一条。",
        "反例：普通三角形画这三条线，是三条不同的线——只有等腰才合一。",
        "⚠️ 别搞混：说的是“顶角”的平分线和“底边”的中线/高，位置不能乱。",
        "预告：这条折痕就是等腰三角形的对称轴——第 10 章我们再看它。",
        "记住一句话：等腰一张纸，折痕即三线。"
      ],
      "examples": [
        {
          "text": "金字塔侧面：中轴线即三线合一",
          "figure": "实物"
        }
      ],
      "prev": "g04-u1-l5-p4",
      "next": "g04-u1-l6-p1"
    }
  ]
};
