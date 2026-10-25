window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g06-u1-l4"] = {
  "lessonId": "g06-u1-l4",
  "lessonTitle": "菱形",
  "chapterId": "g06",
  "pages": [
    {
      "id": "g06-u1-l4-p1",
      "title": "压扁：四条边一样长",
      "concept": "菱形的形成",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{菱形} = \\text{平行四边形} + \\text{邻边相等}",
          "translation": "菱形就是有一组邻边相等的平行四边形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": true,
          "steps": [
            {
              "caption": "第 1 帧：一个普通的平行四边形——四条边长短不一。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      30
                    ],
                    [
                      70,
                      30
                    ],
                    [
                      82,
                      66
                    ],
                    [
                      26,
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
                  "text": "边长短不一",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 帧：捏住两端往中间“压”——边长没变，只是形状在变。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      32
                    ],
                    [
                      64,
                      32
                    ],
                    [
                      76,
                      68
                    ],
                    [
                      32,
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
                  "text": "压扁中……",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 帧：四条边变得一样长——它有了新名字：菱形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      48
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      82,
                      48
                    ],
                    [
                      50,
                      66
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    50,
                    30
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    82,
                    48
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    82,
                    48
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    66
                  ],
                  "b": [
                    18,
                    48
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "四条边一样长：菱形",
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
        "点▶看变形：平行四边形被“压扁”，四条边越压越一样长。",
        "没变的是：对边平行、对角线互相平分——平行四边形的老本都在。",
        "变了的是：四条边一样长了——这就是菱形的新身份证。",
        "还记得矩形那一课吗？同样的四步：变形 → 定义 → 对角线性质 → 证明。"
      ],
      "examples": [
        {
          "text": "衣架撑开、风筝、菱形地砖",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l3-p4",
      "next": "g06-u1-l4-p2"
    },
    {
      "id": "g06-u1-l4-p2",
      "title": "菱形：邻边相等定身份",
      "concept": "菱形的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{有一组邻边相等的平行四边形叫做菱形}",
          "translation": "有一组邻边相等的平行四边形，就叫做菱形"
        },
        {
          "id": "f2",
          "latex": "AB = BC = CD = DA",
          "translation": "菱形的四条边都相等"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：四条边同色等长刻度——一组邻边相等，带来四边相等。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      48
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      82,
                      48
                    ],
                    [
                      50,
                      66
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    50,
                    30
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    82,
                    48
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    82,
                    48
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    66
                  ],
                  "b": [
                    18,
                    48
                  ],
                  "ticks": 1,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "一组邻边相等 → 四边相等",
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
        "还记得吗？压到最后，四条边一样长——这就是菱形。",
        "人话：平行四边形里，相邻两条边相等——四条边就全相等了，它就是菱形。",
        "生活例：衣架撑开、风筝骨架；图形例：四条边同色等长刻度。",
        "反例：一般的平行四边形——邻边一边长一边短，不是菱形。",
        "⚠️ 别搞混：只要“一组邻边”相等就够了，不用四条边逐一量——平行四边形对边本来就相等。",
        "记住一句话：邻边相等定身份（菱形定义）。"
      ],
      "examples": [
        {
          "text": "扑克牌里的方块 ♦：标准的菱形",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l4-p1",
      "next": "g06-u1-l4-p3"
    },
    {
      "id": "g06-u1-l4-p3",
      "title": "菱形：对角线垂直平分",
      "concept": "菱形的对角线互相垂直平分",
      "formulas": [
        {
          "id": "f1",
          "latex": "AC \\perp BD",
          "translation": "菱形的两条对角线互相垂直"
        },
        {
          "id": "f2",
          "latex": "\\text{菱形的对角线互相垂直平分}",
          "translation": "菱形的对角线互相垂直，还互相平分"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：交点处的直角方块 + 平分刻度——垂直又平分。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      48
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      82,
                      48
                    ],
                    [
                      50,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    82,
                    48
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    48
                  ],
                  "p": [
                    82,
                    48
                  ],
                  "q": [
                    50,
                    66
                  ],
                  "color": "target"
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    50,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    82,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    48
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "垂直 + 平分",
                  "size": 14.48,
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
        "人话：菱形的两条对角线，不仅互相平分，还互相垂直——交成四个直角。",
        "生活例：风筝的十字骨架：两根竹条垂直交叉，中点对中点。",
        "图形例：交点处的直角方块 + 平分刻度。",
        "反例：矩形的对角线——平分但不垂直（除非它是正方形）。",
        "⚠️ 别搞混：“平分”是平行四边形自带的（P3），“垂直”是菱形新加的——两条都得有。",
        "记住一句话：菱形的对角线互相垂直平分——下一页证明“垂直”。"
      ],
      "examples": [
        {
          "text": "菱形窗花：对角线交成直角",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l4-p2",
      "next": "g06-u1-l4-p4"
    },
    {
      "id": "g06-u1-l4-p4",
      "title": "证明：菱形对角线垂直",
      "concept": "菱形对角线垂直的证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "AC \\perp BD",
          "translation": "菱形的两条对角线互相垂直"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "ABCD 为菱形，AC 与 BD 交于 O",
          "goal": "AC ⊥ BD",
          "steps": [
            {
              "card": "先拿现成的：AB=AD（菱形四边相等）；BO=DO（对角线互相平分，性质3）。",
              "why": "菱形性质：四边相等（第 g06.1.4 页已证）；平行四边形性质3（第 g06.1.1 页）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      48
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      82,
                      48
                    ],
                    [
                      50,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    82,
                    48
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    50,
                    30
                  ],
                  "ticks": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "ticks": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    48
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "ticks": 2,
                  "color": "corrB"
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
              "card": "△ABO 和 △ADO：三边对应相等——SSS，两个小三角形全等。",
              "why": "SSS 判定：三边对应相等（第 g04.1.2 页）；AO 是公共边。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      48
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      82,
                      48
                    ],
                    [
                      50,
                      66
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
                      18,
                      48
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      50,
                      48
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      48
                    ],
                    [
                      50,
                      66
                    ],
                    [
                      50,
                      48
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
                  "text": "第 2 步：△ABO ≌ △ADO（SSS）",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "全等了：∠AOB=∠AOD；它俩拼成一条直线，所以都是 90°。",
              "why": "全等三角形对应角相等；∠AOB + ∠AOD = 180°（平角）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      48
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      82,
                      48
                    ],
                    [
                      50,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    82,
                    48
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    48
                  ],
                  "a1": 180,
                  "a2": 270,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    50,
                    48
                  ],
                  "a1": 90,
                  "a2": 180,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 3 步：∠AOB = ∠AOD = 90°",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "AC ⊥ BD——垂直得证；平分是平行四边形自带的。所以：互相垂直平分。",
              "why": "垂直的定义；回链：等腰 △ABD 中，AO 既是中线又是高——三线合一（第 g04.1.5 页）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      48
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      82,
                      48
                    ],
                    [
                      50,
                      66
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    82,
                    48
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    66
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    48
                  ],
                  "p": [
                    82,
                    48
                  ],
                  "q": [
                    50,
                    66
                  ],
                  "color": "target"
                },
                {
                  "t": "seg",
                  "a": [
                    18,
                    48
                  ],
                  "b": [
                    50,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    82,
                    48
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
                  "text": "第 4 步：AC ⊥ BD",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "AB=AD（菱形），BO=DO（性质3）",
              "reason": "菱形定义；对角线互相平分"
            },
            {
              "statement": "△ABO ≌ △ADO（SSS）",
              "reason": "SSS 判定；AO 公共"
            },
            {
              "statement": "∠AOB=∠AOD=90°",
              "reason": "对应角相等；拼成平角"
            },
            {
              "statement": "AC ⊥ BD",
              "reason": "垂直的定义"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "证明三问：已知是菱形；求证 AC ⊥ BD；第一步敢用 AB=AD 和 BO=DO，因为菱形和性质3给了这两样。",
        "换种看法：△ABD 是等腰三角形，AO 是底边中线——三线合一直接得 AO ⊥ BD（第 g04.1.5 页）。"
      ],
      "examples": [
        {
          "text": "SSS 是本证明的钥匙：三边对应相等",
          "figure": "方法"
        }
      ],
      "prev": "g06-u1-l4-p3",
      "next": "g06-u1-l5-p1"
    }
  ]
};
