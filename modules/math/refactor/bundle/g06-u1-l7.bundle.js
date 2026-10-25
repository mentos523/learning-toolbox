window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g06-u1-l7"] = {
  "lessonId": "g06-u1-l7",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g06",
  "pages": [
    {
      "id": "g06-u1-l7-p1",
      "title": "小结：判定 vs 性质",
      "concept": "判定与性质的对比",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{判定：条件} \\to \\text{是平行四边形}；\\text{性质：是平行四边形} \\to \\text{结论}",
          "translation": "判定从条件推出是平行四边形，性质从是平行四边形推出边角结论"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "判定",
              "caption": "判定：给“边/角/对角线”的条件 → 断定“是平行四边形”。",
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
                  "ticks": 2,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "Q2：两组对边分别相等 → 是平行四边形",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "性质",
              "caption": "性质：已知“是平行四边形” → 得到边、角、对角线的结论。",
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
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "P1：AB=CD；P2：∠A=∠C；P3：OA=OC",
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
        "编号总表——性质：P1 对边平行且相等；P2 对角相等；P3 对角线互相平分。",
        "判定：Q1 两组对边分别平行；Q2 两组对边分别相等；Q3 一组对边平行且相等；Q4 对角线互相平分。",
        "特殊家族：矩形 = 平行四边形 + 一个直角（对角线相等）；菱形 = 平行四边形 + 邻边相等（对角线垂直平分）；正方形 = 两者兼得。",
        "梯形：只有一组对边平行；中位线：平行于第三边，等于它的一半。",
        "做题第一步：已知给的是“条件”还是“是平行四边形”？给条件用判定，已知平行四边形用性质。"
      ],
      "examples": [
        {
          "text": "口诀：判定找条件，性质得结论",
          "figure": "方法"
        }
      ],
      "prev": "g06-u1-l6-p3",
      "next": "g06-u1-l7-p2"
    },
    {
      "id": "g06-u1-l7-p2",
      "title": "本章小测：6 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{先看已知：给条件用判定，已知平行四边形用性质}",
          "translation": "做题先看已知给的是条件还是平行四边形，再决定用判定还是性质"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "用性质",
              "color": "corrA"
            },
            {
              "name": "用判定",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "q1",
              "label": "① ▱ABCD 中 AB=6cm，求 CD",
              "group": 0,
              "anchor": [
                25,
                74
              ],
              "shape": {
                "t": "txt",
                "p": [
                  25,
                  74
                ],
                "text": "①",
                "size": 22.86,
                "bold": true
              }
            },
            {
              "id": "q2",
              "label": "② AB=CD=5、AD=BC=4，是平行四边形吗",
              "group": 1,
              "anchor": [
                75,
                74
              ],
              "shape": {
                "t": "txt",
                "p": [
                  75,
                  74
                ],
                "text": "②",
                "size": 22.86,
                "bold": true
              }
            },
            {
              "id": "q3",
              "label": "③ 矩形 ABCD 对角线交于 O，AC=8cm，求 OA",
              "group": 0,
              "anchor": [
                25,
                52
              ],
              "shape": {
                "t": "txt",
                "p": [
                  25,
                  52
                ],
                "text": "③",
                "size": 22.86,
                "bold": true
              }
            },
            {
              "id": "q4",
              "label": "④ 对角线互相平分的四边形，是平行四边形吗",
              "group": 1,
              "anchor": [
                75,
                52
              ],
              "shape": {
                "t": "txt",
                "p": [
                  75,
                  52
                ],
                "text": "④",
                "size": 22.86,
                "bold": true
              }
            },
            {
              "id": "q5",
              "label": "⑤ “对角线相等的四边形一定是矩形”对吗？举反例",
              "group": 1,
              "anchor": [
                25,
                30
              ],
              "shape": {
                "t": "txt",
                "p": [
                  25,
                  30
                ],
                "text": "⑤",
                "size": 22.86,
                "bold": true
              }
            },
            {
              "id": "q6",
              "label": "⑥ ▱ABCD 中 ∠A=70°，求 ∠B、∠C",
              "group": 0,
              "anchor": [
                75,
                30
              ],
              "shape": {
                "t": "txt",
                "p": [
                  75,
                  30
                ],
                "text": "⑥",
                "size": 22.86,
                "bold": true
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一点：把 6 道题送进“用性质”或“用判定”的篮子。",
        "1．▱ABCD 中 AB=6cm，求 CD。",
        "2．四边形 ABCD 中 AB=CD=5cm、AD=BC=4cm，是平行四边形吗？",
        "3．矩形 ABCD 对角线交于 O，AC=8cm，求 OA。",
        "4．对角线互相平分的四边形，是平行四边形吗？",
        "5．“对角线相等的四边形一定是矩形”——对吗？举反例。",
        "6．▱ABCD 中 ∠A=70°，求 ∠B、∠C。"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：①CD=6cm（P1 对边相等）；②是（Q2）；③OA=4cm（对角线相等且平分）；④是（Q4）；⑤不对，等腰梯形对角线也相等；⑥∠C=70°（P2），∠B=110°（邻角互补）"
        },
        {
          "figure": "错因解析",
          "text": "认图：“已知图形求边角”用性质；“判断是不是平行四边形”用判定。1．平行四边形对边相等：CD=AB=6cm（性质 P1）。2．两组对边分别相等→是平行四边形（判定 Q2）。3．矩形对角线相等且互相平分：OA=AC/2=4cm。4．对角线互相平分→是平行四边形（判定 Q4）。5．不对：等腰梯形对角线也相等——“对角线相等”推不出矩形，还要“互相平分”。6．∠C=∠A=70°（对角相等 P2）；∠B=180°−70°=110°（邻角互补）。"
        }
      ],
      "prev": "g06-u1-l7-p1",
      "next": null
    }
  ]
};
