window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g06-u1-l1"] = {
  "lessonId": "g06-u1-l1",
  "lessonTitle": "平行四边形的性质",
  "chapterId": "g06",
  "pages": [
    {
      "id": "g06-u1-l1-p1",
      "title": "转半圈：严丝合缝",
      "concept": "平行四边形的中心对称",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{旋转} 180 \\text{度，完全重合}",
          "translation": "绕对角线交点转半圈，图形和原来完全重合"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": true,
          "steps": [
            {
              "caption": "第 1 帧：平行四边形 ABCD，两条对角线交于点 O。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    48,
                    48
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    22
                  ],
                  "text": "A",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    22
                  ],
                  "text": "B",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    74
                  ],
                  "text": "C",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    8,
                    74
                  ],
                  "text": "D",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 帧：绕 O 转 90°——还没对上。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
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
                      68,
                      24
                    ],
                    [
                      68,
                      84
                    ],
                    [
                      28,
                      72
                    ],
                    [
                      28,
                      12
                    ]
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    48,
                    48
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "转 90°",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 帧：转 180°（半圈）——和原来严丝合缝！",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    48,
                    48
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    22
                  ],
                  "text": "A→C",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    22
                  ],
                  "text": "B→D",
                  "size": 12,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "转 180°：完全重合！",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "定格想一想：转半圈后，顶点 A 跑到了哪里？（答：C 的位置）",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    48,
                    48
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    12
                  ],
                  "text": "A 和 C 互换，B 和 D 互换",
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
        "点▶：平行四边形绕对角线交点转半圈，和原来严丝合缝。",
        "没变的是：转 180° 完全重合——这个本事叫中心对称（第 10 章正名）。"
      ],
      "examples": [
        {
          "text": "推拉门、伸缩衣架：拉一拉变形，但对边永远平行",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g06-u1-l1-p2"
    },
    {
      "id": "g06-u1-l1-p2",
      "title": "性质1：对边平行且相等",
      "concept": "对边平行且相等（P1）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{对边平行：} AB \\parallel CD, AD \\parallel BC",
          "translation": "AB 平行于 CD，AD 平行于 BC"
        },
        {
          "id": "f2",
          "latex": "\\text{对边相等：} AB = CD, AD = BC",
          "translation": "AB 等于 CD，AD 等于 BC"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两组对边——平行箭头标记'平行'，同色刻度标记'相等'。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    84,
                    28
                  ],
                  "arrows": 1,
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    68
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "arrows": 1,
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "arrows": 2,
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    68
                  ],
                  "b": [
                    24,
                    28
                  ],
                  "arrows": 2,
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    54,
                    16
                  ],
                  "text": "AB = CD",
                  "size": 13,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    88,
                    48
                  ],
                  "text": "AD = BC",
                  "size": 13,
                  "color": "corrB"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？你转半圈时，AB 落到了 CD 的位置上——两条边压在了一起。",
        "人话：平行四边形的对边，既平行又相等——这是它最出名的两条“身份证”。",
        "生活例：伸缩门每一节都是平行四边形，对边永远平行；图形例：同色刻度标记的两条边相等。",
        "反例：梯形（后面会学到：只有一组对边平行）——不满足“两组”，所以不是平行四边形。",
        "⚠️ 别搞混：“平行”是定义给的（已知），“相等”是性质推出来的（结论）——别写反。",
        "记住一句话：对边平行又相等（P1）。"
      ],
      "examples": [
        {
          "text": "小区伸缩门：拉开收拢，对边始终平行",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l1-p1",
      "next": "g06-u1-l1-p3"
    },
    {
      "id": "g06-u1-l1-p3",
      "title": "性质2：对角相等",
      "concept": "对角相等（P2）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\angle A = \\angle C, \\angle B = \\angle D",
          "translation": "角 A 等于角 C，角 B 等于角 D"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：相对的两个角画同色弧线——它们永远一样大。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    24,
                    28
                  ],
                  "a1": 0,
                  "a2": 107,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    72,
                    68
                  ],
                  "a1": 180,
                  "a2": 287,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    84,
                    28
                  ],
                  "a1": 107,
                  "a2": 180,
                  "r": 10,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    12,
                    68
                  ],
                  "a1": 287,
                  "a2": 360,
                  "r": 10,
                  "group": 2,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    20,
                    22
                  ],
                  "text": "A",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    76,
                    74
                  ],
                  "text": "C",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "∠A = ∠C，∠B = ∠D",
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
        "还记得吗？转半圈后，∠A 落到了 ∠C 的位置——对角压在了一起。",
        "人话：平行四边形相对的两个角，大小永远一样。",
        "生活例：伸缩门拉扁时，相对的两个角一起变大、一起变小；图形例：同色弧线的两个角相等。",
        "反例：一般的四边形，对角不一定相等——别想当然。",
        "⚠️ 别搞混：对角相等，邻角可不相等——∠A + ∠B = 180°（邻角互补，因为 AB ∥ CD，同旁内角互补）。",
        "记住一句话：对角相等（P2），邻角互补是推论。"
      ],
      "examples": [
        {
          "text": "伸缩衣架：拉开角度变，相对两角始终一样大",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l1-p2",
      "next": "g06-u1-l1-p4"
    },
    {
      "id": "g06-u1-l1-p4",
      "title": "性质3：对角线互相平分",
      "concept": "对角线互相平分（P3）",
      "formulas": [
        {
          "id": "f1",
          "latex": "OA = OC, OB = OD",
          "translation": "OA 等于 OC，OB 等于 OD：交点 O 是两条对角线的中点"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：两条对角线相交——OA 和 OC 同色刻度，OB 和 OD 同色刻度。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    48,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    48
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    48,
                    48
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    48
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "pt",
                  "p": [
                    48,
                    48
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "O 是两条对角线的中点",
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
        "还记得吗？转半圈后，半条对角线 OA 落到了 OC 的位置上。",
        "人话：两条对角线相交，交点正好是每条对角线的中点——互相平分。",
        "生活例：伸缩门对角交叉的铆钉，永远钉在正中间；图形例：O 到四个顶点的距离两两相等。",
        "反例：一般四边形的对角线，交点不在正中间——不互相平分。",
        "⚠️ 别搞混：互相平分说的是“交点是中点”，不是“两条对角线一样长”——AC 和 BD 一般不相等。",
        "记住一句话：对角线互相平分（P3）——下一页我们证明它。"
      ],
      "examples": [
        {
          "text": "两根木条中点钉在一起，四个端点围成平行四边形",
          "figure": "实物"
        }
      ],
      "prev": "g06-u1-l1-p3",
      "next": "g06-u1-l1-p5"
    },
    {
      "id": "g06-u1-l1-p5",
      "title": "证明：对角线互相平分",
      "concept": "对角线互相平分的证明",
      "formulas": [
        {
          "id": "f1",
          "latex": "OA = OC, OB = OD",
          "translation": "OA 等于 OC，OB 等于 OD：对角线互相平分"
        }
      ],
      "interaction": {
        "type": "proof-replay",
        "params": {
          "given": "平行四边形 ABCD，AC 与 BD 交于 O",
          "goal": "OA = OC, OB = OD",
          "steps": [
            {
              "card": "先把两条对角线画出来，交点记作 O——要证的 OA、OC 就在这两条线上。",
              "why": "已知：ABCD 是平行四边形；AB ∥ CD（定义）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    84,
                    28
                  ],
                  "arrows": 1,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    68
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "arrows": 1,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    48,
                    48
                  ],
                  "label": "O",
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 1 步：连对角线",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "AB 和 CD 平行，AC 是截线——∠OAB 和 ∠OCD 是内错角，相等。",
              "why": "定理：两直线平行，内错角相等（第 g02.2.3 页）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "arc",
                  "v": [
                    24,
                    28
                  ],
                  "a1": 0,
                  "a2": 40,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    72,
                    68
                  ],
                  "a1": 180,
                  "a2": 220,
                  "r": 9,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    16,
                    20
                  ],
                  "text": "∠1",
                  "size": 13,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    80,
                    76
                  ],
                  "text": "∠2",
                  "size": 13,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 2 步：∠1 = ∠2（内错角）",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "AB=CD（性质1），∠AOB=∠COD（对顶角相等）——两角夹一边，两三角形全等。",
              "why": "ASA 判定（第 g04.1.4 页）；对顶角相等（第 g02.1.1 页）；AB=CD（性质1：由旋转 180° 重合直观得到，严格证明见第 10 章中心对称）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
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
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      48,
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
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ],
                    [
                      48,
                      48
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    84,
                    28
                  ],
                  "ticks": 1,
                  "color": "corrA"
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    68
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    48,
                    48
                  ],
                  "a1": 220,
                  "a2": 331,
                  "r": 10,
                  "group": 1,
                  "color": "corrAngle"
                },
                {
                  "t": "arc",
                  "v": [
                    48,
                    48
                  ],
                  "a1": 40,
                  "a2": 151,
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
                  "text": "第 3 步：△AOB ≌ △COD（ASA）",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "card": "全等了：OA 和 OC、OB 和 OD 分别压在一起——对应边相等，证完。",
              "why": "全等三角形对应边相等（第 g04.1.1 页）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      24,
                      28
                    ],
                    [
                      84,
                      28
                    ],
                    [
                      72,
                      68
                    ],
                    [
                      12,
                      68
                    ]
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    24,
                    28
                  ],
                  "b": [
                    48,
                    48
                  ],
                  "ticks": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    48
                  ],
                  "b": [
                    72,
                    68
                  ],
                  "ticks": 1,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    28
                  ],
                  "b": [
                    48,
                    48
                  ],
                  "ticks": 2,
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    48,
                    48
                  ],
                  "b": [
                    12,
                    68
                  ],
                  "ticks": 2,
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "第 4 步：OA=OC，OB=OD",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            }
          ],
          "summary": [
            {
              "statement": "连对角线 AC、BD，交于 O",
              "reason": "已知；AB ∥ CD（定义）"
            },
            {
              "statement": "∠OAB = ∠OCD",
              "reason": "两直线平行，内错角相等"
            },
            {
              "statement": "△AOB ≌ △COD（ASA）",
              "reason": "AB=CD（性质1）、∠AOB=∠COD（对顶角相等）"
            },
            {
              "statement": "OA=OC，OB=OD",
              "reason": "全等三角形对应边相等"
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "证明三问：已知是平行四边形 ABCD；求证 OA=OC、OB=OD；第一步敢连对角线，因为结论就藏在对角线上。",
        "核心动作：造出两个三角形，用全等把“边相等”搬出来——全等是几何的“搬运工”。"
      ],
      "examples": [
        {
          "text": "思路模板：要证线段相等，先找它们所在的三角形证全等",
          "figure": "方法"
        }
      ],
      "prev": "g06-u1-l1-p4",
      "next": "g06-u1-l2-p1"
    }
  ]
};
