window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g06-u1-l3"] = {
  "lessonId": "g06-u1-l3",
  "lessonTitle": "矩形",
  "chapterId": "g06",
  "pages": [
    {
      "id": "g06-u1-l3-p1",
      "title": "拉直：角变成了直角",
      "concept": "矩形的形成",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{矩形} = \\text{平行四边形} + \\text{一个直角}",
          "translation": "矩形就是有一个角是直角的平行四边形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": true,
          "steps": [
            {
              "caption": "第 1 帧：一个普通的平行四边形——角是斜的。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      12,
                      30
                    ],
                    [
                      76,
                      30
                    ],
                    [
                      88,
                      66
                    ],
                    [
                      24,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "角是斜的",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 帧：捏住它慢慢“拉直”——对边还平行，只是角在变大。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      16,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "拉直中……",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 帧：四个角都变成直角——它有了新名字：矩形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      28
                    ],
                    [
                      80,
                      28
                    ],
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "right",
                  "v": [
                    20,
                    28
                  ],
                  "p": [
                    80,
                    28
                  ],
                  "q": [
                    20,
                    68
                  ],
                  "color": "known"
                },
                {
                  "t": "right",
                  "v": [
                    80,
                    28
                  ],
                  "p": [
                    20,
                    28
                  ],
                  "q": [
                    80,
                    68
                  ],
                  "color": "known"
                },
                {
                  "t": "right",
                  "v": [
                    80,
                    68
                  ],
                  "p": [
                    80,
                    28
                  ],
                  "q": [
                    20,
                    68
                  ],
                  "color": "known"
                },
                {
                  "t": "right",
                  "v": [
                    20,
                    68
                  ],
                  "p": [
                    20,
                    28
                  ],
                  "q": [
                    80,
                    68
                  ],
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "四个角都是直角：矩形",
                  "size": 15,
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
        "点▶看变形：平行四边形被“拉直”，角一个个变成直角。",
        "没变的是：对边平行且相等、对角线互相平分——平行四边形的老本都在。",
        "变了的是：角变成了直角——这就是矩形的新身份证。"
      ],
      "examples": [
        {
          "text": "书本、黑板、手机屏幕：四个角都是直角",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l2-p5",
      "next": "g06-u1-l3-p2"
    },
    {
      "id": "g06-u1-l3-p2",
      "title": "矩形：一个直角定身份",
      "concept": "矩形的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{有一个角是直角的平行四边形叫做矩形}",
          "translation": "有一个角是直角的平行四边形，就叫做矩形"
        },
        {
          "id": "f2",
          "latex": "\\text{矩形的四个角都是直角}",
          "translation": "矩形的四个角都是直角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：四个直角方块——一个直角，带来四个直角。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      28
                    ],
                    [
                      80,
                      28
                    ],
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    20,
                    28
                  ],
                  "p": [
                    80,
                    28
                  ],
                  "q": [
                    20,
                    68
                  ],
                  "color": "known"
                },
                {
                  "t": "right",
                  "v": [
                    80,
                    28
                  ],
                  "p": [
                    20,
                    28
                  ],
                  "q": [
                    80,
                    68
                  ],
                  "color": "known"
                },
                {
                  "t": "right",
                  "v": [
                    80,
                    68
                  ],
                  "p": [
                    80,
                    28
                  ],
                  "q": [
                    20,
                    68
                  ],
                  "color": "known"
                },
                {
                  "t": "right",
                  "v": [
                    20,
                    68
                  ],
                  "p": [
                    20,
                    28
                  ],
                  "q": [
                    80,
                    68
                  ],
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "一个直角 → 四个直角",
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
        "还记得吗？拉直的那一刻，四个角同时变成了直角。",
        "人话：平行四边形里，只要有一个角是直角——四个角就全是直角，它就是矩形。",
        "一句话推导：∠A=90° → ∠C=90°（P2 对角相等）→ ∠B=180°−90°=90°（邻角互补）",
        "生活例：书本、黑板；图形例：四个直角方块标记。",
        "反例：一般的平行四边形——角是斜的，不是矩形。",
        "⚠️ 别搞混：矩形首先是平行四边形——P1、P2、P3 三条性质它全有，一个不少。",
        "记住一句话：一个直角定身份（矩形定义）。"
      ],
      "examples": [
        {
          "text": "长方形就是矩形：只是名字不同",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l3-p1",
      "next": "g06-u1-l3-p3"
    },
    {
      "id": "g06-u1-l3-p3",
      "title": "矩形：对角线相等",
      "concept": "矩形的对角线相等",
      "formulas": [
        {
          "id": "f1",
          "latex": "AC = BD",
          "translation": "矩形的两条对角线相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两条对角线同色等长刻度——一样长。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      28
                    ],
                    [
                      80,
                      28
                    ],
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    28
                  ],
                  "b": [
                    80,
                    68
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    28
                  ],
                  "b": [
                    20,
                    68
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    28
                  ],
                  "b": [
                    80,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    28
                  ],
                  "b": [
                    20,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "AC = BD",
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
        "人话：矩形的两条对角线，一样长——这是它独有的新性质。",
        "生活例：量黑板对角线：两条一样长，四个角就是直角（装修师傅的土办法，用的就是这条）。",
        "图形例：两条对角线同色等长刻度。",
        "反例：一般的平行四边形——对角线一边长一边短，不相等。",
        "⚠️ 别搞混：“互相平分”是平行四边形自带的（P3），“相等”是矩形新加的——两条都得有。",
        "记住一句话：矩形的对角线相等且互相平分——下一页证明它。"
      ],
      "examples": [
        {
          "text": "门框装正了没有？量两条对角线等不等",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l3-p2",
      "next": "g06-u1-l3-p4"
    },
    {
      "id": "g06-u1-l3-p4",
      "title": "证明：矩形对角线相等",
      "concept": "矩形对角线相等的证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "AC = BD",
          "translation": "矩形的两条对角线相等"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "ABCD 为矩形",
          "goal": "AC = BD",
          "steps": [
            {
              "card": "矩形首先是平行四边形：AB=DC（性质1）；∠B 和 ∠C 都是直角（矩形定义）。",
              "why": "平行四边形对边相等（P1）；矩形四个角都是直角。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      28
                    ],
                    [
                      80,
                      28
                    ],
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    28
                  ],
                  "b": [
                    80,
                    28
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    68
                  ],
                  "b": [
                    20,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "right",
                  "v": [
                    80,
                    28
                  ],
                  "p": [
                    20,
                    28
                  ],
                  "q": [
                    80,
                    68
                  ],
                  "color": "target"
                },
                {
                  "t": "right",
                  "v": [
                    80,
                    68
                  ],
                  "p": [
                    80,
                    28
                  ],
                  "q": [
                    20,
                    68
                  ],
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 1 步：摆好已知",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "看两个三角形：△ABC 和 △DCB——AB=DC，∠B=∠C=直角，BC 是公共边。",
              "why": "公共边：BC 是两个三角形的同一条边。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      28
                    ],
                    [
                      80,
                      28
                    ],
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ]
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      28
                    ],
                    [
                      80,
                      28
                    ],
                    [
                      80,
                      68
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ],
                    [
                      80,
                      28
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 2 步：找出两个三角形",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "两边夹一角——SAS，△ABC ≌ △DCB。",
              "why": "SAS 判定：两边及夹角对应相等（第 g04.1.3 页）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      28
                    ],
                    [
                      80,
                      28
                    ],
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ]
                  ],
                  "color": "aux",
                  "width": 1.5,
                  "dash": "5,4"
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      28
                    ],
                    [
                      80,
                      28
                    ],
                    [
                      80,
                      68
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ],
                    [
                      80,
                      28
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "≅",
                  "size": 22,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 3 步：SAS 全等",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "全等了：对应边 AC 和 BD 相等——矩形的对角线相等，证完。",
              "why": "全等三角形对应边相等（第 g04.1.1 页）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      28
                    ],
                    [
                      80,
                      28
                    ],
                    [
                      80,
                      68
                    ],
                    [
                      20,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    28
                  ],
                  "b": [
                    80,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    28
                  ],
                  "b": [
                    20,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 4 步：AC = BD",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "ABCD 为矩形：AB=DC，∠ABC=∠DCB=直角",
              "reason": "性质1；矩形定义"
            },
            {
              "statement": "△ABC 与 △DCB：AB=DC，∠B=∠C，BC 公共",
              "reason": "已知；公共边"
            },
            {
              "statement": "△ABC ≌ △DCB（SAS）",
              "reason": "SAS 判定"
            },
            {
              "statement": "AC=BD",
              "reason": "全等三角形对应边相等"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "证明三问：已知是矩形；求证 AC=BD；第一步敢用 AB=DC 和直角，因为矩形自带这两样。",
        "和上一课的证明比：同样的“造三角形→证全等→搬结论”三板斧。"
      ],
      "examples": [
        {
          "text": "SAS 是本证明的钥匙：两边夹一角",
          "figure": "方法"
        }
      ],
      "prev": "g06-u1-l3-p3",
      "next": "g06-u1-l4-p1"
    }
  ]
};
