window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g02-u2-l5"] = {
  "lessonId": "g02-u2-l5",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g02",
  "pages": [
    {
      "id": "g02-u2-l5-p1",
      "title": "判定 vs 性质：因为和所以换了位置",
      "concept": "判定与性质的对比",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{判定：角} \\to \\text{线}；\\text{性质：线} \\to \\text{角}",
          "translation": "判定从角推出线平行，性质从线平行推出角的关系"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "判定",
              "caption": "判定：因为 ∠1 = ∠5（角相等），所以 a ∥ b——从角推出线。",
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
                  "width": 3
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
                  "width": 3
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
                  "text": "所以 a ∥ b",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "label": "性质",
              "caption": "性质：因为 a ∥ b（线平行），所以 ∠1 = ∠5 = 60°——从线推出角。",
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
                  "color": "line",
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
                  "color": "line",
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
                  "text": "因为 a ∥ b",
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
        "点“判定”：因为角相等，所以线平行——用角去判断线。",
        "点“性质”：因为线平行，所以角相等——用线去得到角。",
        "把“因为”“所以”换个位置，意思就反了——这是全章最容易混的地方。",
        "口诀：判定找相等，性质得相等。"
      ],
      "examples": [
        {
          "text": "做题第一步：看已知给的是“角”还是“线”——给角用判定，给线用性质",
          "figure": "方法"
        }
      ],
      "prev": "g02-u2-l4-p3",
      "next": "g02-u2-l5-p2"
    },
    {
      "id": "g02-u2-l5-p2",
      "title": "本章小测：6 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{判定找相等，性质得相等}",
          "translation": "判定用角相等推出平行，性质由平行得到角相等"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "用判定",
              "color": "corrA"
            },
            {
              "name": "用性质",
              "color": "corrB"
            }
          ],
          "items": [
            {
              "id": "q1",
              "label": "① ∠1=∠5=60°，能推出 a∥b 吗？",
              "group": 0,
              "anchor": [
                25,
                72
              ],
              "shape": {
                "t": "txt",
                "p": [
                  25,
                  72
                ],
                "text": "①",
                "size": 22.86,
                "bold": true
              }
            },
            {
              "id": "q2",
              "label": "② 已知 a∥b，∠1=60°，求∠5",
              "group": 1,
              "anchor": [
                75,
                72
              ],
              "shape": {
                "t": "txt",
                "p": [
                  75,
                  72
                ],
                "text": "②",
                "size": 22.86,
                "bold": true
              }
            },
            {
              "id": "q3",
              "label": "③ ∠3+∠6=180°，能推出 a∥b 吗？",
              "group": 0,
              "anchor": [
                25,
                32
              ],
              "shape": {
                "t": "txt",
                "p": [
                  25,
                  32
                ],
                "text": "③",
                "size": 22.86,
                "bold": true
              }
            },
            {
              "id": "q4",
              "label": "④ 已知 a∥b，∠4=100°，求∠6",
              "group": 1,
              "anchor": [
                75,
                32
              ],
              "shape": {
                "t": "txt",
                "p": [
                  75,
                  32
                ],
                "text": "④",
                "size": 22.86,
                "bold": true
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一点：把 ①–④ 送进“用判定”或“用性质”的篮子；⑤⑥ 直接算一算。",
        "1．∠1 = ∠5 = 60°，能推出 a ∥ b 吗？",
        "2．已知 a ∥ b，∠1 = 60°，求 ∠5 是多少？",
        "3．∠3 + ∠6 = 180°，能推出 a ∥ b 吗？",
        "4．已知 a ∥ b，∠4 = 100°，求 ∠6 是多少？",
        "5．已知 a ∥ b，∠1 = 110°，求 ∠6 是多少？（两步：先找同位角，再用邻补角）",
        "6．小区楼梯的两条扶手是平行的，一根横杆斜穿两条扶手，量得横杆和上面扶手的夹角是 75°，横杆和下面扶手在同一侧的夹角是多少？"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "答案：①用判定（同位角相等→平行）；②用性质（∠5=60°，同位角相等）；③用判定（同旁内角互补→平行）；④用性质（∠6=100°，内错角相等）；⑤∠6=70°（∠5=∠1=110°，∠5+∠6=180°）；⑥105°（同旁内角互补）"
        },
        {
          "figure": "错因解析",
          "text": "认图：“能推出平行”用判定（角→平行）；“已知平行求角”用性质（平行→角）。1．∠1 与 ∠5 是同位角：同位角相等→a∥b，用判定。2．a∥b：同位角相等，∠5=∠1=60°，用性质。3．∠3+∠6=180° 是同旁内角互补→a∥b，用判定。4．a∥b：内错角相等，∠6=∠4=100°，用性质。5．∠5=∠1=110°（同位角），∠5+∠6=180°（邻补角）：∠6=70°。6．两扶手平行，横杆是截线：同侧两角是同旁内角，互补——180°−75°=105°。"
        }
      ],
      "prev": "g02-u2-l5-p1",
      "next": null
    }
  ]
};
