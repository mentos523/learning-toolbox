window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g08-u1-l1"] = {
  "lessonId": "g08-u1-l1",
  "lessonTitle": "点、线与圆的位置关系",
  "chapterId": "g08",
  "pages": [
    {
      "id": "g08-u1-l1-p1",
      "title": "日出：直线靠近圆",
      "concept": "直线与圆的三种位置关系",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{相离:}d > r",
          "translation": "圆心到直线的距离大于半径：直线与圆相离，没有交点"
        },
        {
          "id": "f2",
          "latex": "\\text{相切:}d = r",
          "translation": "圆心到直线的距离等于半径：直线与圆相切，只有一个交点"
        },
        {
          "id": "f3",
          "latex": "\\text{相交:}d < r",
          "translation": "圆心到直线的距离小于半径：直线与圆相交，有两个交点"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "autoplay": true,
          "steps": [
            {
              "caption": "第 1 帧：直线在圆外，d=32 > r=20——相离，一个交点都没有。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 20,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    82
                  ],
                  "b": [
                    88,
                    82
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    82
                  ],
                  "p": [
                    50,
                    50
                  ],
                  "q": [
                    88,
                    82
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    93
                  ],
                  "text": "d=32 > r=20：相离",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 帧：直线下降，刚好碰到圆，d=20 = r——相切，只有一个交点。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 20,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    70
                  ],
                  "b": [
                    88,
                    70
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    70
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    93
                  ],
                  "text": "d=20 = r=20：相切",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 帧：直线穿过圆，d=0 < r=20——相交，有两个交点。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 20,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    50
                  ],
                  "b": [
                    88,
                    50
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    30,
                    50
                  ],
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    70,
                    50
                  ],
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    93
                  ],
                  "text": "d=0 < r=20：相交",
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
        "看动画：直线靠近圆——相离（0 交点）→相切（1 个）→相交（2 个）。",
        "每帧都画了圆心到直线的垂线段：它的长度就是 d——比较 d 和 r 谁大谁小。",
        "这就是：直线和圆的位置关系——由 d 与 r 的大小关系说了算。"
      ],
      "examples": [
        {
          "text": "日出：太阳（圆）与海平面（直线）",
          "figure": "实物"
        },
        {
          "text": "自行车轮与地面：相切于一点",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g08-u1-l1-p2"
    },
    {
      "id": "g08-u1-l1-p2",
      "title": "点和圆：三种位置",
      "concept": "点与圆的位置关系",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{点在圆上:}d = r",
          "translation": "点到圆心的距离等于半径：点在圆上"
        },
        {
          "id": "f2",
          "latex": "\\text{点在圆内:}d < r",
          "translation": "点到圆心的距离小于半径：点在圆内"
        },
        {
          "id": "f3",
          "latex": "\\text{点在圆外:}d > r",
          "translation": "点到圆心的距离大于半径：点在圆外"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "点 P 远离圆：d > r——在圆外。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    42,
                    52
                  ],
                  "r": 25,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    42,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    86,
                    60
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    52
                  ],
                  "b": [
                    86,
                    60
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    64,
                    78
                  ],
                  "text": "d > r：在圆外",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "点 P 落到圆上：d = r——在圆上。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    42,
                    52
                  ],
                  "r": 25,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    42,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    67,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    52
                  ],
                  "b": [
                    67,
                    52
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    54,
                    78
                  ],
                  "text": "d = r：在圆上",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            },
            {
              "caption": "点 P 走进圆里：d < r——在圆内。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    42,
                    52
                  ],
                  "r": 25,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    42,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    54,
                    58
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    52
                  ],
                  "b": [
                    54,
                    58
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    48,
                    78
                  ],
                  "text": "d < r：在圆内",
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
        "还记得吗？点向圆靠近时，它到圆心的距离 d 一直在变——变的是 d，没变的是判断方法。",
        "点和圆的位置，看 d 和 r 比大小。",
        "d=r 在圆上（刚好够着），d<r 在圆内（还没够到边），d>r 在圆外（够过头了）。",
        "生活例：射箭——压线（圆上）/靶环内（圆内）/脱靶（圆外）。",
        "图形例：A 在圆上、B 在圆内、C 在圆外；反例：圆心 O：d=0<r，在圆内——不是“在圆上”。",
        "⚠️ 别搞混：“点在圆上”和“直线相切”的 d=r 字一样、对象不一样。",
        "一个是点到圆心，一个是直线到圆心。",
        "记住一句话：点圆位置比大小——d 和 r 谁大谁小，一比就知道。"
      ],
      "examples": [
        {
          "text": "射箭：压线、靶环内、脱靶",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l1-p1",
      "next": "g08-u1-l1-p3"
    },
    {
      "id": "g08-u1-l1-p3",
      "title": "直线和圆：三种位置",
      "concept": "直线与圆的位置关系；d 与 r",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{相离:}d > r",
          "translation": "圆心到直线的距离大于半径：直线与圆相离"
        },
        {
          "id": "f2",
          "latex": "\\text{相切:}d = r",
          "translation": "圆心到直线的距离等于半径：直线与圆相切"
        },
        {
          "id": "f3",
          "latex": "\\text{相交:}d < r",
          "translation": "圆心到直线的距离小于半径：直线与圆相交"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "l₁：d > r——相离，够不着。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    48
                  ],
                  "r": 22,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    48
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    82
                  ],
                  "b": [
                    86,
                    82
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    50,
                    82
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    93
                  ],
                  "text": "l₁：d > r，相离",
                  "size": 13,
                  "bold": true
                }
              ]
            },
            {
              "caption": "l₂：d = r——相切，刚好碰到。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    48
                  ],
                  "r": 22,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    48
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    70
                  ],
                  "b": [
                    86,
                    70
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    48
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    70
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    93
                  ],
                  "text": "l₂：d = r，相切",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "l₃：d < r——相交，穿过去了。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    48
                  ],
                  "r": 22,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    48
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    48
                  ],
                  "b": [
                    86,
                    48
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    28,
                    48
                  ],
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    72,
                    48
                  ],
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    93
                  ],
                  "text": "l₃：d < r，相交",
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
        "还记得第 1 页的日出吗？交点个数 0→1→2——变的是交点个数，没变的是 d 和 r 的比大小。",
        "直线和圆的位置，看圆心到直线的距离 d 和 r 比大小。",
        "d>r 相离（够不着），d=r 相切（刚好碰到），d<r 相交（穿过去了）。",
        "生活例：日出——太阳与海平面；图形例：l₁ 相离、l₂ 相切、l₃ 相交。",
        "反例：直线穿过圆心（d=0<r）是相交——“穿过”不等于“相切”，相切是“只碰一下”。",
        "⚠️ 别搞混：d 是“圆心到直线的距离”——垂直的那段，不是斜着量。先作垂线段，再量长度。",
        "记住一句话：线圆位置也比大小——d>r 离、d=r 切、d<r 交。"
      ],
      "examples": [
        {
          "text": "日出：太阳与海平面的三种相遇",
          "figure": "实物"
        }
      ],
      "prev": "g08-u1-l1-p2",
      "next": "g08-u1-l1-p4"
    },
    {
      "id": "g08-u1-l1-p4",
      "title": "例题：d 和 r 比大小",
      "concept": "用 d 与 r 判断位置关系",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{直线}l\\text{:}d = 3 < 5 = r \\Rightarrow \\text{相交}",
          "translation": "圆心到直线的距离 3 小于半径 5：直线 l 与圆相交"
        },
        {
          "id": "f2",
          "latex": "d_P = 5 = r \\Rightarrow P\\text{在圆上}",
          "translation": "点 P 到圆心距离等于半径：点 P 在圆上"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步：读题标已知——r=5（圆的大小），d=3（圆心到直线的距离）。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 28,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    70
                  ],
                  "b": [
                    86,
                    70
                  ],
                  "color": "line",
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
                    70
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "已知：r=5，d=3",
                  "size": 13,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步：比大小——3 < 5，即 d < r。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 28,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    70
                  ],
                  "b": [
                    86,
                    70
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "3 < 5：d < r",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：下结论——直线 l 与圆相交，有两个交点。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 28,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    14,
                    70
                  ],
                  "b": [
                    86,
                    70
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    27.6,
                    70
                  ],
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    72.4,
                    70
                  ],
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "d < r：相交",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 4 步（变式）：点 P 到 O 的距离是 5——d=r，点 P 在圆上。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    52
                  ],
                  "r": 28,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    52
                  ],
                  "label": "O",
                  "color": "known",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    78,
                    52
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 4
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    78,
                    52
                  ],
                  "color": "corrA",
                  "width": 2.5,
                  "ticks": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "d=r：P 在圆上",
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
        "读题先标已知：r=5（圆的大小）、d=3（圆心到直线的距离）——标成蓝色。",
        "比大小：3<5，即 d<r——直线与圆相交，有两个交点。",
        "变式：点 P 到 O 的距离是 5，d=r——点 P 在圆上。",
        "记住一句话：所有位置关系题，第一步都是“比大小”。"
      ],
      "examples": [],
      "prev": "g08-u1-l1-p3",
      "next": "g08-u1-l2-p1"
    }
  ]
};
