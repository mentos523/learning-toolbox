window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g05-u1-l3"] = {
  "lessonId": "g05-u1-l3",
  "lessonTitle": "应用：已知两边求第三边",
  "chapterId": "g05",
  "pages": [
    {
      "id": "g05-u1-l3-p1",
      "title": "梯子靠墙：滑块实验",
      "concept": "勾股定理的直接应用",
      "formulas": [
        {
          "id": "f1",
          "latex": "x^2 + h^2 = 10^2",
          "translation": "梯子底端离墙 x 米、高 h 米，x 的平方加 h 的平方等于 100"
        }
      ],
      "interaction": {
        "type": "ladder-slide",
        "params": {
          "length": 10,
          "xMin": 2,
          "xMax": 8,
          "xStep": 0.5,
          "xInit": 6,
          "expr": "sqrt(100-x^2)",
          "unit": "米",
          "showTriangle": true,
          "showCheck": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖滑块，或直接拖梯子底端：梯子长 10 米不变——看高度 h 跟着变。",
        "每次都验算：x²+h² 是不是等于 100？——勾股定理在实时工作。",
        "试试 x=6：h=8——6-8-10，又是勾股数家族的成员。"
      ],
      "examples": [
        {
          "text": "梯子靠墙、篮球架",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l2-p5",
      "next": "g05-u1-l3-p2"
    },
    {
      "id": "g05-u1-l3-p2",
      "title": "例题：旗杆拉绳",
      "concept": "已知斜边和一直角边求另一直角边",
      "formulas": [
        {
          "id": "f1",
          "latex": "h^2 = 10^2 - 6^2 = 64",
          "translation": "旗杆高度的平方等于 100 减 36，等于 64"
        },
        {
          "id": "f2",
          "latex": "h = 8",
          "translation": "旗杆高 8 米"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "第 1 步画图：旗杆垂直地面——直角三角形，绳子是斜边（最长的那条）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    20
                  ],
                  "b": [
                    85,
                    20
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    20
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "right",
                  "v": [
                    50,
                    20
                  ],
                  "p": [
                    85,
                    20
                  ],
                  "q": [
                    50,
                    70
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    70
                  ],
                  "b": [
                    74,
                    20
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    68,
                    45
                  ],
                  "text": "10 米",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    15
                  ],
                  "text": "6 米",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    44,
                    45
                  ],
                  "text": "h 米？",
                  "size": 12,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步列式：h²+6²=10²——先认出斜边，再把数对号入座。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    20
                  ],
                  "b": [
                    85,
                    20
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    20
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    70
                  ],
                  "b": [
                    74,
                    20
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "h² + 6² = 10²",
                  "size": 15,
                  "bold": true,
                  "math": true
                }
              ]
            },
            {
              "caption": "第 3 步求解：h²=100−36=64，h=8 米（长度取正）。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    20
                  ],
                  "b": [
                    85,
                    20
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    20
                  ],
                  "b": [
                    50,
                    70
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    70
                  ],
                  "b": [
                    74,
                    20
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "h²=64，h=8 米",
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
        "第 1 步画图：旗杆垂直地面——直角三角形，绳子是斜边（最长的那条）。",
        "第 2 步列式：h²+6²=10²——先认出斜边，再把数对号入座。",
        "第 3 步求解：h²=100−36=64，h=8（长度取正）。",
        "⚠️ 别搞混：斜边是绳子（10 米），不是旗杆——先找最长边，再列式。"
      ],
      "examples": [
        {
          "text": "旗杆拉绳、风筝线",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l3-p1",
      "next": "g05-u1-l3-p3"
    },
    {
      "id": "g05-u1-l3-p3",
      "title": "反过来：已知斜边求直角边",
      "concept": "勾股定理的逆运算",
      "formulas": [
        {
          "id": "f1",
          "latex": "b = \\sqrt{15^2 - 9^2} = 12",
          "translation": "b 等于根号下 225 减 81，等于 12"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "例题：斜边 15 米、一条直角边 9 米，求另一条 b。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      66,
                      30
                    ],
                    [
                      30,
                      78
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    30,
                    30
                  ],
                  "p": [
                    66,
                    30
                  ],
                  "q": [
                    30,
                    78
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    48,
                    26
                  ],
                  "text": "9",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    56
                  ],
                  "text": "15",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    26,
                    54
                  ],
                  "text": "b=?",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "b²=15²−9²=225−81=144，所以 b=12。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      30
                    ],
                    [
                      66,
                      30
                    ],
                    [
                      30,
                      78
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "b²=225−81=144，b=12",
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
        "例题：斜边 15 米、一条直角边 9 米，求另一条：b²=15²−9²=144，b=12。",
        "⚠️ 易错 1：开方别漏——h²=64 得 h=8，不是 64。",
        "⚠️ 易错 2：c²−a² 不是 (c−a)²——先平方再减，别先减再平方。",
        "⚠️ 易错 3：不写单位——长度题答案带单位（米）。",
        "记住一句话：已知两边求第三边——先找斜边，再列式，最后开方别漏。"
      ],
      "examples": [
        {
          "text": "小区滑梯：滑道长 5 米、底端离立柱 4 米，立柱高 3 米",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l3-p2",
      "next": "g05-u1-l4-p1"
    }
  ]
};
