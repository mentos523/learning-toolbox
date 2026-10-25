window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g09-u1-l8"] = {
  "lessonId": "g09-u1-l8",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g09",
  "pages": [
    {
      "id": "g09-u1-l8-p1",
      "title": "本章小结：从“像”到“算”",
      "concept": "相似全章串讲",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_1 : S_2 = k^2",
          "translation": "面积比等于相似比的平方"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "起点：比例线段 a:b=c:d——“分法相同”（H15 互链代数 ch03）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    50
                  ],
                  "b": [
                    85,
                    50
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    38,
                    50
                  ],
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    70
                  ],
                  "text": "a : b = c : d",
                  "size": 15,
                  "bold": true
                }
              ]
            },
            {
              "caption": "相似图形：拼图套合→照片放大→单向拉伸反例（跃升 5）。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      40
                    ],
                    [
                      50,
                      40
                    ],
                    [
                      35,
                      65
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      38
                    ],
                    [
                      88,
                      38
                    ],
                    [
                      71,
                      68
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "形状相同，大小成比例",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "三个判定：AA / SAS / SSS——对照全等表，“相等”换成“成比例”。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "AA：两角对应相等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    52
                  ],
                  "text": "SAS：两边成比例夹角相等",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    36
                  ],
                  "text": "SSS：三边成比例",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    20
                  ],
                  "text": "全等是 k=1 的特例",
                  "size": 12,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "性质与应用：周长比=k，面积比=k²（H4）；影子测高；位似 (x,y)→(kx,ky)（H18）。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "周长比 = k，面积比 = k²",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "应用：影子测高、标杆测距",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    32
                  ],
                  "text": "位似：有中心的相似",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "一句话串全章：比例线段 → 相似图形 → 三个判定 → 性质（周长 k、面积 k²）→ 应用与位似。",
        "三个呼应：H4 面积比↔代数 ch07 y=x²，H15 比例↔代数 ch03，H18 位似坐标↔代数 ch06-u0-l2。",
        "判定对照表记住：SSS 对 SSS，SAS 对 SAS，ASA/AAS 对 AA——“相等”换成“成比例”。",
        "记住一句话：相似是“形状相同”，判定看角和边，性质看 k 和 k²。"
      ],
      "examples": [
        {
          "text": "全章知识图谱",
          "figure": "图表"
        }
      ],
      "prev": "g09-u1-l7-p4",
      "next": "g09-u1-l8-p2"
    },
    {
      "id": "g09-u1-l8-p2",
      "title": "本章习题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\frac{C_1}{C_2} = k, \\frac{S_1}{S_2} = k^2",
          "translation": "周长比=k，面积比=k²"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "base": [
            {
              "t": "txt",
              "p": [
                50,
                90
              ],
              "text": "点三角形，分进两篮",
              "size": 14.48
            }
          ],
          "groups": [
            {
              "name": "相似",
              "color": "corrA"
            },
            {
              "name": "不相似",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "q1",
              "label": "3-4-5 / 6-8-10",
              "group": 0,
              "anchor": [
                25,
                70
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    12,
                    76
                  ],
                  [
                    38,
                    76
                  ],
                  [
                    12,
                    56
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "q2",
              "label": "50°60° / 50°60°",
              "group": 0,
              "anchor": [
                70,
                70
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    58,
                    76
                  ],
                  [
                    84,
                    76
                  ],
                  [
                    58,
                    56
                  ]
                ],
                "color": "corrA",
                "width": 2.5
              }
            },
            {
              "id": "q3",
              "label": "2-3-4 / 4-6-9",
              "group": 1,
              "anchor": [
                25,
                42
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    12,
                    48
                  ],
                  [
                    38,
                    48
                  ],
                  [
                    12,
                    28
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            },
            {
              "id": "q4",
              "label": "正方形 / 长方形",
              "group": 1,
              "anchor": [
                70,
                42
              ],
              "shape": {
                "t": "poly",
                "pts": [
                  [
                    58,
                    48
                  ],
                  [
                    84,
                    48
                  ],
                  [
                    84,
                    28
                  ],
                  [
                    58,
                    28
                  ]
                ],
                "color": "corrB",
                "width": 2.5
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "认图：4 组图形分两篮：相似 / 不相似。",
        "1．两三角形相似比（小:大）为 2:3，小三角形的最长边是 6，求大三角形的对应边。",
        "2．两三角形：50°60° 与 60°70°，相似？",
        "3．4-6-8 与 6-9-12，相似？比？",
        "4．相似比 1:3，小面积 5，大面积？",
        "5．人 1.7 米影 2 米，旗杆影 12 米，杆高？"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "认图：①②相似，③④不相似；1．9；2．相似；3．相似，比 2:3；4．45；5．10.2 米"
        },
        {
          "figure": "错因解析",
          "text": "认图：相似=形状相同——看对应角是否相等、对应边是否成比例。1．大边=6×(3/2)=9——相似比小:大=2:3，边长按此放大。2．三角形内角和：第一个第三角 70°，第二个第三角 50°——三对角对应相等，相似。3．4:6:8=6:9:12=1:1.5：三边成比例，相似，比 2:3。4．面积比=相似比²：5×9=45。5．人/影=杆/影：1.7/2=h/12，h=10.2 米——平行光线，相似三角形。"
        }
      ],
      "prev": "g09-u1-l8-p1",
      "next": null
    }
  ]
};
