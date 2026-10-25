window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g08-u1-l6"] = {
  "lessonId": "g08-u1-l6",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g08",
  "pages": [
    {
      "id": "g08-u1-l6-p1",
      "title": "圆（二）：一张图总结",
      "concept": "本章小结",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{位置}d\\text{比}r / \\text{切线判定性质} / \\text{切线长} / x^2+y^2=r^2",
          "translation": "本章四块：位置关系、切线、切线长与心、圆的方程"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "位置关系：点、线与圆的位置，都看 d 和 r 比大小。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 26,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    78
                  ],
                  "b": [
                    86,
                    78
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "d>r 离、d=r 切、d<r 交",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "切线：判定（过外端+垂直半径⇒是切线）与性质（是切线⇒垂直于过切点半径）。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 26,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    16,
                    78
                  ],
                  "b": [
                    84,
                    78
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    50,
                    78
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    78
                  ],
                  "p": [
                    50,
                    52
                  ],
                  "q": [
                    84,
                    78
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "判定⇄性质：“因为”“所以”别背反",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "切线长：圆外一点两切线长相等（HL 证）；外心管顶点，内心管边。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    42,
                    55
                  ],
                  "r": 20,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    32
                  ],
                  "b": [
                    58,
                    70
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    84,
                    32
                  ],
                  "b": [
                    42,
                    35
                  ],
                  "color": "target",
                  "width": 3,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "PA=PB；外心↔顶点，内心↔边",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "圆的方程：x²+y²=r²——到原点距离为 r 的点的“身份证”。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    8,
                    50
                  ],
                  "b": [
                    92,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    8
                  ],
                  "b": [
                    50,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 30,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    14
                  ],
                  "text": "x²+y²=r²：方程↔图形第二次握手",
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
        "位置关系：点、线与圆的位置，都看 d 和 r 比大小——d>r 离、d=r 切、d<r 交（g08.1.1）。",
        "切线判定：过外端 + 垂直半径 ⇒ 是切线；性质：是切线 ⇒ 垂直于过切点半径（g08.1.2）。",
        "“因为”“所以”别背反。",
        "切线长：圆外一点两切线长相等（HL 证，g08.1.3）。",
        "外心（垂直平分线交点）管顶点，内心（角平分线交点）管边（g08.1.4）。",
        "圆的方程：x²+y²=r²——到原点距离为 r 的点的“身份证”，方程↔图形第二次握手（g08.1.5）。",
        "预告：下一章 g09——全等的“放大版”：相似。"
      ],
      "examples": [],
      "prev": "g08-u1-l5-p4",
      "next": "g08-u1-l6-p2"
    },
    {
      "id": "g08-u1-l6-p2",
      "title": "本章习题：6 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{切线} / \\text{切线长} / x^2+y^2=r^2",
          "translation": "用本章定理：切线判定性质、切线长定理、圆的方程"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "是切线",
              "color": "corrA"
            },
            {
              "name": "不是切线",
              "color": "corrB"
            }
          ],
          "base": [
            {
              "t": "circle",
              "c": [
                30,
                62
              ],
              "r": 18,
              "color": "line",
              "width": 2.5
            },
            {
              "t": "seg",
              "a": [
                30,
                62
              ],
              "b": [
                30,
                80
              ],
              "color": "known",
              "width": 2
            },
            {
              "t": "txt",
              "p": [
                56,
                80
              ],
              "text": "①",
              "size": 15,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                52,
                74
              ],
              "text": "②",
              "size": 15,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                56,
                90
              ],
              "text": "③",
              "size": 15,
              "bold": true
            },
            {
              "t": "txt",
              "p": [
                54,
                68
              ],
              "text": "④",
              "size": 15,
              "bold": true
            }
          ],
          "items": [
            {
              "id": "t1",
              "label": "①",
              "group": 0,
              "anchor": [
                30,
                80
              ],
              "shape": {
                "t": "seg",
                "a": [
                  10,
                  80
                ],
                "b": [
                  50,
                  80
                ],
                "color": "line",
                "width": 3
              }
            },
            {
              "id": "t2",
              "label": "②",
              "group": 1,
              "anchor": [
                30,
                62
              ],
              "shape": {
                "t": "seg",
                "a": [
                  14,
                  50
                ],
                "b": [
                  46,
                  74
                ],
                "color": "line",
                "width": 3
              }
            },
            {
              "id": "t3",
              "label": "③",
              "group": 1,
              "anchor": [
                30,
                90
              ],
              "shape": {
                "t": "seg",
                "a": [
                  10,
                  90
                ],
                "b": [
                  50,
                  90
                ],
                "color": "line",
                "width": 3
              }
            },
            {
              "id": "t4",
              "label": "④",
              "group": 1,
              "anchor": [
                30,
                68
              ],
              "shape": {
                "t": "seg",
                "a": [
                  12,
                  68
                ],
                "b": [
                  48,
                  68
                ],
                "color": "line",
                "width": 3
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "1．认图：4 条直线分进两篮——是切线 / 不是切线。",
        "2．圆 O 半径 4，O 到直线 l 距离 4：l 与圆什么关系？依据？",
        "3．PA、PB 切圆 O 于 A、B，OP=10，OA=6，求 PA。",
        "4．△ABC 的外接圆圆心 O，∠A=60°，求 ∠BOC（用圆周角定理）。",
        "5．圆 x²+y²=16：P(0,−4) 在圆上/内/外？Q(3,3) 呢？",
        "6．车轮与地面接触于一点：为什么地面一定垂直于车轴到接触点的连线？"
      ],
      "examples": [
        {
          "text": "1．① 是；②③④ 不是（②相交，③相离，④垂足不在圆上）。2．相切（d=r）。3．PA=8（Rt△OAP 勾股：√(100−36)）。4．120°（圆心角=2×圆周角）。5．P 在圆上（0+16=16），Q 在圆外（9+9=18>16）。6．地面是切线——切线垂直于过切点的半径。",
          "figure": "核对答案"
        },
        {
          "figure": "错因解析",
          "text": "认图：切线=只交圆于一点——②交于两点（相交），③不交（相离），④垂足不在圆上。1．d=4=r：d=r 时直线与圆相切。2．切线⊥半径：Rt△OAP 中 PA=√(OP²−OA²)=√(100−36)=8。3．圆心角=2×圆周角：∠BOC=2×60°=120°。4．代入 x²+y²=16：P 得 16 在圆上；Q 得 18>16 在圆外。5．地面是圆（车轮）的切线：切线垂直于过切点的半径——车轴到接触点的连线就是半径。"
        }
      ],
      "prev": "g08-u1-l6-p1",
      "next": null
    }
  ]
};
