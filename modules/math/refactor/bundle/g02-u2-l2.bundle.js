window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g02-u2-l2"] = {
  "lessonId": "g02-u2-l2",
  "lessonTitle": "平行线的判定",
  "chapterId": "g02",
  "pages": [
    {
      "id": "g02-u2-l2-p1",
      "title": "量角器验证：角对上了，线就平行了",
      "concept": "用角判定平行（量角器验证）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{同位角相等} \\to \\text{两直线平行}",
          "translation": "同位角相等，两条直线就平行"
        }
      ],
      "interaction": {
        "type": "angle-protractor",
        "params": {
          "angle": 60,
          "vertex": {
            "x": 50,
            "y": 56,
            "label": "O"
          },
          "dir1": 180,
          "rayLabels": [
            "A",
            "B"
          ],
          "tolerance": 2
        }
      },
      "auxInteraction": null,
      "hints": [
        "把量角器中心拖到角的顶点上对准——不用转也不用读刻度，读数自动算出：这个角是 60°。",
        "再想想：如果另一个交点上的同位角也是 60°，两个角“对上”了，两条直线就平行——铁轨铺直了。",
        "判定 1：同位角相等，两直线平行。下一页开始，一个判定一页，讲透。"
      ],
      "examples": [
        {
          "text": "木工：用角尺检验门框两边平行",
          "figure": "实物"
        }
      ],
      "prev": "g02-u2-l1-p2",
      "next": "g02-u2-l2-p2"
    },
    {
      "id": "g02-u2-l2-p2",
      "title": "判定 1：同位角相等 → 平行",
      "concept": "平行线判定 1",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{同位角相等} \\Rightarrow a \\parallel b",
          "translation": "同位角相等可以推出两直线平行"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：∠1 = ∠5 = 60°（同位角对上了）——所以 a ∥ b。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    70
                  ],
                  "b": [
                    85,
                    70
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    40
                  ],
                  "b": [
                    85,
                    40
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    42,
                    28
                  ],
                  "b": [
                    58,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "arc",
                  "v": [
                    54.2,
                    70
                  ],
                  "a1": 0,
                  "a2": 72,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "arc",
                  "v": [
                    45.8,
                    40
                  ],
                  "a1": 0,
                  "a2": 72,
                  "r": 10,
                  "group": 1,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    66,
                    78
                  ],
                  "text": "∠1=60°",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    48
                  ],
                  "text": "∠5=60°",
                  "size": 13,
                  "bold": true,
                  "color": "corrA"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "a ∥ b",
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
        "还记得三线八角吗？∠1 和 ∠5 是同位角——位置一模一样的一对。",
        "判定 1：如果 ∠1 = ∠5，两条直线 a、b 就平行。角“对上”了，线就“摆直”了。",
        "生活例：木工弹墨线——量出同位角相等，就知道两条线平行；铁轨铺设也要验这个角。",
        "反例：∠1 = 60°、∠5 = 65°——差 5°，就不平行，延长后总会相交。",
        "⚠️ 别搞混：这是“判定”——用角去判断线平行；下节课反过来，用平行去得角相等。",
        "记住一句话：判定找相等——角相等，线平行。"
      ],
      "examples": [],
      "prev": "g02-u2-l2-p1",
      "next": "g02-u2-l2-p3"
    },
    {
      "id": "g02-u2-l2-p3",
      "title": "判定 2：内错角相等 → 平行",
      "concept": "平行线判定 2",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{内错角相等} \\Rightarrow a \\parallel b",
          "translation": "内错角相等可以推出两直线平行"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：∠3 = ∠5 = 60°（Z 字两头对上了）——所以 a ∥ b。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    70
                  ],
                  "b": [
                    85,
                    70
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    40
                  ],
                  "b": [
                    85,
                    40
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    34.4,
                    28
                  ],
                  "b": [
                    65.6,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      48,
                      70
                    ],
                    [
                      58.7,
                      70
                    ],
                    [
                      41.3,
                      40
                    ],
                    [
                      52,
                      40
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4",
                  "close": false
                },
                {
                  "t": "arc",
                  "v": [
                    58.7,
                    70
                  ],
                  "a1": 180,
                  "a2": 240,
                  "r": 10,
                  "group": 1,
                  "color": "corrB"
                },
                {
                  "t": "arc",
                  "v": [
                    41.3,
                    40
                  ],
                  "a1": 0,
                  "a2": 60,
                  "r": 10,
                  "group": 1,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    63
                  ],
                  "text": "∠3=60°",
                  "size": 13,
                  "bold": true,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    47
                  ],
                  "text": "∠5=60°",
                  "size": 13,
                  "bold": true,
                  "color": "corrB"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "a ∥ b",
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
        "判定 2：如果 ∠3 = ∠5（内错角），两条直线 a、b 就平行——Z 字两头的角对上了。",
        "为什么也行？因为 ∠3 的对顶角就是 ∠1，∠3 = ∠5 时 ∠1 = ∠5，回到判定 1。",
        "生活例：折纸——折痕和纸边平行时，内错角自然相等；反过来，量出内错角相等就知道折直了。",
        "反例：∠3 = 60°、∠5 = 70°——Z 字两头没对上，不平行。",
        "⚠️ 别搞混：内错角是“里面错开”的一对，别拿成同旁内角。",
        "记住一句话：Z 字对上，线就平行。"
      ],
      "examples": [],
      "prev": "g02-u2-l2-p2",
      "next": "g02-u2-l2-p4"
    },
    {
      "id": "g02-u2-l2-p4",
      "title": "判定 3：同旁内角互补 → 平行",
      "concept": "平行线判定 3",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{同旁内角互补} \\Rightarrow a \\parallel b",
          "translation": "同旁内角加起来是 180 度，可以推出两直线平行"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：∠4 + ∠5 = 60° + 120° = 180°（U 字怀里互补）——所以 a ∥ b。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    70
                  ],
                  "b": [
                    85,
                    70
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    40
                  ],
                  "b": [
                    85,
                    40
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    34.4,
                    28
                  ],
                  "b": [
                    65.6,
                    82
                  ],
                  "color": "aux",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      68,
                      70
                    ],
                    [
                      58.7,
                      70
                    ],
                    [
                      41.3,
                      40
                    ],
                    [
                      52,
                      40
                    ]
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4",
                  "close": false
                },
                {
                  "t": "arc",
                  "v": [
                    58.7,
                    70
                  ],
                  "a1": 240,
                  "a2": 360,
                  "r": 10,
                  "group": 1,
                  "color": "corrC"
                },
                {
                  "t": "arc",
                  "v": [
                    41.3,
                    40
                  ],
                  "a1": 0,
                  "a2": 60,
                  "r": 10,
                  "group": 1,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    66,
                    58
                  ],
                  "text": "∠4=120°",
                  "size": 13,
                  "bold": true,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    53,
                    47
                  ],
                  "text": "∠5=60°",
                  "size": 13,
                  "bold": true,
                  "color": "corrC"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "a ∥ b",
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
        "判定 3：如果 ∠4 + ∠5 = 180°（同旁内角互补），两条直线 a、b 就平行。",
        "为什么也行？∠4 和 ∠1 是邻补角（和 180°），∠4 + ∠5 = 180° 时 ∠1 = ∠5，回到判定 1。",
        "注意这个判定不说“相等”，说“互补”——加起来是 180°。",
        "反例：∠4 + ∠5 = 170°——差 10° 才到 180°，不平行。",
        "⚠️ 别搞混：前两个判定找“相等”，这一个找“互补”；“互补”就是和为 180°。",
        "记住一句话：U 里互补，线就平行。"
      ],
      "examples": [],
      "prev": "g02-u2-l2-p3",
      "next": "g02-u2-l3-p1"
    }
  ]
};
