window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g01-u1-l3"] = {
  "lessonId": "g01-u1-l3",
  "lessonTitle": "线段的比较与中点",
  "chapterId": "g01",
  "pages": [
    {
      "id": "g01-u1-l3-p1",
      "title": "叠一叠，比长短",
      "concept": "线段长短的比较（叠合法）",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB > CD",
          "translation": "线段 AB 比线段 CD 长"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：两条线段 AB、CD，谁长？",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    62
                  ],
                  "b": [
                    60,
                    62
                  ],
                  "color": "line",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    74
                  ],
                  "text": "AB",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    38
                  ],
                  "b": [
                    50,
                    38
                  ],
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    50
                  ],
                  "text": "CD",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 2 步：把 CD 叠到 AB 上：一端对齐，看另一端。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    60
                  ],
                  "b": [
                    60,
                    60
                  ],
                  "color": "line",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    60
                  ],
                  "b": [
                    50,
                    60
                  ],
                  "color": "target",
                  "width": 4.5
                },
                {
                  "t": "pt",
                  "p": [
                    20,
                    60
                  ],
                  "r": 3.5,
                  "color": "known",
                  "label": "A(C)"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    76
                  ],
                  "text": "C 和 A 对齐，D 落在 B 里面",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：D 落在 B 里面——AB 比 CD 长。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    60
                  ],
                  "b": [
                    60,
                    60
                  ],
                  "color": "line",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    60
                  ],
                  "b": [
                    50,
                    60
                  ],
                  "color": "target",
                  "width": 4.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    40
                  ],
                  "text": "AB > CD",
                  "size": 18,
                  "bold": true
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "比长短不用尺：把一条线段叠到另一条上，一端对齐。",
        "看另一端：D 落在 B 里面——AB 比 CD 长。",
        "D 正好落到 B 上——两条线段一样长。"
      ],
      "examples": [
        {
          "text": "也可以用尺量：AB=5cm，CD=3cm",
          "figure": "度量"
        }
      ],
      "prev": "g01-u1-l2-p3",
      "next": "g01-u1-l3-p2"
    },
    {
      "id": "g01-u1-l3-p2",
      "title": "中点：线段的“一半处”",
      "concept": "中点；线段的和差",
      "formulas": [
        {
          "id": "f1",
          "latex": "AM = MB = \\frac{1}{2}AB",
          "translation": "M 是中点：AM 等于 MB，都等于 AB 的一半"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：M 是 AB 的中点——AM=MB=½AB。",
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
                  "color": "line",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    50
                  ],
                  "b": [
                    50,
                    50
                  ],
                  "color": "line",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    85,
                    50
                  ],
                  "color": "line",
                  "width": 3.5,
                  "ticks": 1
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "r": 3.5,
                  "color": "known",
                  "label": "M"
                },
                {
                  "t": "txt",
                  "p": [
                    15,
                    62
                  ],
                  "text": "A",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    85,
                    62
                  ],
                  "text": "B",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    68
                  ],
                  "text": "AM = MB",
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
        "中点：把线段平均分成两半的点——M 是 AB 的中点，AM=MB。",
        "AM 是 AB 的一半：AM=MB=½AB。",
        "线段能加减（点 B 在线段 AC 上时）：AC=AB+BC（两段接起来）；BC=AC−AB（全长减一段）。",
        "⚠️ 别搞混：中点必须在线段上，延长线上的点不算。"
      ],
      "examples": [
        {
          "text": "对折纸条：折痕就是中点",
          "figure": "实物"
        }
      ],
      "prev": "g01-u1-l3-p1",
      "next": "g01-u2-l1-p1"
    }
  ]
};
