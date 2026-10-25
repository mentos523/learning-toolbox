window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g06-u1-l6"] = {
  "lessonId": "g06-u1-l6",
  "lessonTitle": "梯形与三角形中位线",
  "chapterId": "g06",
  "pages": [
    {
      "id": "g06-u1-l6-p1",
      "title": "切一角：拼出平行四边形",
      "concept": "三角形中位线定理的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "DE \\parallel BC, DE = \\frac{1}{2} BC",
          "translation": "中位线 DE 平行于第三边 BC，长度是 BC 的一半"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": true,
          "steps": [
            {
              "caption": "第 1 帧：△ABC，D、E 是两边的中点，连 DE——这条线叫中位线。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      56,
                      74
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    30
                  ],
                  "label": "D",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    38,
                    52
                  ],
                  "label": "E",
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    38,
                    52
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "DE：中位线",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 2 帧：沿 DE 把小三角形 ADE 剪下来。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      56,
                      74
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
                      30
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      38,
                      52
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    38,
                    52
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "剪下 △ADE",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 帧：把小三角形转 180° 拼到下面——DE 和它的“复制品”连成一条直线。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      56,
                      74
                    ],
                    [
                      26,
                      74
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      26,
                      74
                    ],
                    [
                      38,
                      52
                    ],
                    [
                      50,
                      30
                    ]
                  ],
                  "color": "target",
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
                    26,
                    74
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    38,
                    52
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    52
                  ],
                  "b": [
                    26,
                    74
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
                  "text": "拼成平行四边形 DBCF",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "DF = 2×DE，DF ∥ BC",
                  "size": 13,
                  "color": "target"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点▶：中位线把三角形“切”出一角，转下来一拼——拼成了平行四边形。",
        "没变的是：DE 的长度——转下来后，DF 正好是两个 DE。",
        "看到的是：DE ∥ BC，DE = BC 的一半——这就是三角形中位线定理。"
      ],
      "examples": [
        {
          "text": "剪纸：沿中位线剪下小三角形，旋转拼回去",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l5-p2",
      "next": "g06-u1-l6-p2"
    },
    {
      "id": "g06-u1-l6-p2",
      "title": "证明：三角形中位线定理",
      "concept": "中位线定理的证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "DE \\parallel BC, DE = \\frac{1}{2} BC",
          "translation": "中位线 DE 平行于第三边 BC，长度是 BC 的一半"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "D、E 为 AB、AC 中点",
          "goal": "DE ∥ BC，DE = ½BC",
          "steps": [
            {
              "card": "把 DE 延长一倍，端点记作 F，连 CF——造一个全等三角形。",
              "why": "作图：延长线段到 2 倍、连接两点。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      56,
                      74
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    30
                  ],
                  "label": "D",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    38,
                    52
                  ],
                  "label": "E",
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    38,
                    52
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    52
                  ],
                  "b": [
                    26,
                    74
                  ],
                  "color": "target",
                  "width": 3,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    56,
                    74
                  ],
                  "b": [
                    26,
                    74
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    26,
                    74
                  ],
                  "label": "F",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 1 步：延长 DE 到 F",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "AE=CE，DE=FE，对顶角相等——SAS，△ADE ≌ △CFE。",
              "why": "SAS 判定（第 g04.1.3 页）；中点定义；对顶角相等（第 g02.1.1 页）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      56,
                      74
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
                      30
                    ],
                    [
                      50,
                      30
                    ],
                    [
                      38,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      56,
                      74
                    ],
                    [
                      26,
                      74
                    ],
                    [
                      38,
                      52
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    38,
                    52
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    52
                  ],
                  "b": [
                    26,
                    74
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
                  "text": "第 2 步：△ADE ≌ △CFE（SAS）",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "全等了：AD=CF，∠A=∠ECF——内错角相等，所以 AD ∥ CF。",
              "why": "全等三角形对应边/角相等；内错角相等 → 两直线平行（判定）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      56,
                      74
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
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
                    56,
                    74
                  ],
                  "b": [
                    26,
                    74
                  ],
                  "ticks": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    20,
                    30
                  ],
                  "a1": 0,
                  "a2": 51,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    56,
                    74
                  ],
                  "a1": 180,
                  "a2": 231,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 3 步：AD=CF，AD ∥ CF",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "DB=AD=CF，且 DB ∥ CF——一组对边平行且相等，拼出平行四边形 DBCF。",
              "why": "D 是 AB 中点；判定3：一组对边平行且相等 → 平行四边形（第 g06.1.2 页）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      56,
                      74
                    ],
                    [
                      26,
                      74
                    ]
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    56,
                    74
                  ],
                  "b": [
                    26,
                    74
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
                  "text": "第 4 步：DBCF 是平行四边形",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "DF ∥ BC 且 DF=BC（平行四边形性质）；DE 是 DF 的一半——证完。",
              "why": "平行四边形对边平行且相等（性质1，第 g06.1.1 页）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      50,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      56,
                      74
                    ],
                    [
                      26,
                      74
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    26,
                    74
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    80,
                    30
                  ],
                  "b": [
                    56,
                    74
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    38,
                    52
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    38,
                    52
                  ],
                  "b": [
                    26,
                    74
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
                  "text": "第 5 步：DE ∥ BC，DE = 一半 BC",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "延长 DE 到 F 使 DE=EF，连 CF",
              "reason": "作图"
            },
            {
              "statement": "△ADE ≌ △CFE（SAS）",
              "reason": "AE=CE、DE=FE、对顶角相等"
            },
            {
              "statement": "AD=CF，AD ∥ CF",
              "reason": "对应边/角相等；内错角相等→平行"
            },
            {
              "statement": "四边形 DBCF 是平行四边形",
              "reason": "DB=CF 且 DB ∥ CF（判定3）"
            },
            {
              "statement": "DE ∥ BC，DE=一半 BC",
              "reason": "平行四边形性质1；DE=一半 DF"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "证明三问：已知 D、E 是中点；求证 DE ∥ BC 且 DE = 一半 BC；第一步敢延长 DE，因为要“造”一个平行四边形。",
        "5 步踩线：延长→全等→平行→拼出平行四边形→搬性质——一步都不能少。"
      ],
      "examples": [
        {
          "text": "思路模板：中点+延长一倍，是几何最常用的“造全等”手法",
          "figure": "方法"
        }
      ],
      "prev": "g06-u1-l6-p1",
      "next": "g06-u1-l6-p3"
    },
    {
      "id": "g06-u1-l6-p3",
      "title": "梯形：“只有”是关键词",
      "concept": "梯形的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{只有一组对边平行的四边形叫做梯形}",
          "translation": "只有一组对边平行的四边形，就叫做梯形"
        },
        {
          "id": "f2",
          "latex": "\\text{两腰相等的梯形叫做等腰梯形}",
          "translation": "两腰相等的梯形，叫做等腰梯形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：梯形 vs 平行四边形——注意“只有”两个字。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      30
                    ],
                    [
                      80,
                      30
                    ],
                    [
                      66,
                      66
                    ],
                    [
                      34,
                      66
                    ]
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    30
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "arrows": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    66,
                    66
                  ],
                  "b": [
                    34,
                    66
                  ],
                  "arrows": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    16
                  ],
                  "text": "梯形：只有一组对边平行",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      30
                    ],
                    [
                      84,
                      30
                    ],
                    [
                      72,
                      66
                    ],
                    [
                      12,
                      66
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "❌ 平行四边形不是梯形",
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
        "人话：四边形里，只有一组对边平行——另一组不平行，它就是梯形。",
        "生活例：水坝的横截面；等腰梯形：两腰相等的梯形，像“对称”的梯子。",
        "图形例：AB ∥ CD（平行箭头），AD 与 BC 不平行。",
        "反例：平行四边形——两组对边都平行，不符合“只有一组”，所以不是梯形！（“只有”是关键词）",
        "⚠️ 别搞混：“一组对边平行”≠梯形——平行四边形也有一组对边平行；必须“只有一组”。",
        "记住一句话：只有一组对边平行，才是梯形。"
      ],
      "examples": [
        {
          "text": "水坝横截面、梯子：上窄下宽的等腰梯形",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l6-p2",
      "next": "g06-u1-l7-p1"
    }
  ]
};
