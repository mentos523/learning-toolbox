window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g01-u1-l1"] = {
  "lessonId": "g01-u1-l1",
  "lessonTitle": "点、线、面的概念",
  "chapterId": "g01",
  "pages": [
    {
      "id": "g01-u1-l1-p1",
      "title": "生活中的点、线、面",
      "concept": "点、线、面的直观",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{点}、\\text{线}、\\text{面}",
          "translation": "点：只有位置；线：笔直的长度；面：平平铺开"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：夜空的星星——离得太远，只剩下一个位置。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    25,
                    68
                  ],
                  "r": 3,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    40,
                    74
                  ],
                  "r": 2.5,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    66
                  ],
                  "r": 3,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    70,
                    74
                  ],
                  "r": 2.5,
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    82,
                    66
                  ],
                  "r": 3,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "星星：只看得到位置",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：绷紧的琴弦——拉得笔直，这就是线。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    60
                  ],
                  "b": [
                    85,
                    60
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    15,
                    60
                  ],
                  "r": 3,
                  "color": "line"
                },
                {
                  "t": "pt",
                  "p": [
                    85,
                    60
                  ],
                  "r": 3,
                  "color": "line"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    76
                  ],
                  "text": "绷紧的琴弦：笔直，有长度",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：平静的湖面——平平地铺开，这就是面。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      50
                    ],
                    [
                      85,
                      50
                    ],
                    [
                      85,
                      68
                    ],
                    [
                      15,
                      68
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "fill": "corrA",
                  "opacity": 0.35
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "平静的湖面：平平铺开",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "夜空的星星：离得太远，只剩一个位置——这就是点。",
        "绷紧的琴弦：拉得笔直，有长度——这就是线。",
        "平静的湖面：平平铺开——这就是面。"
      ],
      "examples": [
        {
          "text": "点线面都在生活里：星星、琴弦、湖面",
          "figure": "实物"
        }
      ],
      "prev": null,
      "next": "g01-u1-l1-p2"
    },
    {
      "id": "g01-u1-l1-p2",
      "title": "给点、线、面起名字",
      "concept": "点、直线、平面的表示法",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{点} A、\\text{直线} l、\\text{直线} AB、\\text{平面} \\alpha",
          "translation": "点用大写字母，直线用小写字母或两个点，平面用希腊字母"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：点 A、直线 l（直线 AB）、平面 α 的记法。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    22,
                    60
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "A"
                },
                {
                  "t": "txt",
                  "p": [
                    22,
                    74
                  ],
                  "text": "点 A",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    44,
                    60
                  ],
                  "r": 3,
                  "color": "line",
                  "label": "A"
                },
                {
                  "t": "seg",
                  "a": [
                    44,
                    60
                  ],
                  "b": [
                    76,
                    60
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    76,
                    60
                  ],
                  "r": 3,
                  "color": "line",
                  "label": "B"
                },
                {
                  "t": "txt",
                  "p": [
                    60,
                    74
                  ],
                  "text": "直线 l（直线 AB）",
                  "size": 13
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      22
                    ],
                    [
                      70,
                      22
                    ],
                    [
                      78,
                      32
                    ],
                    [
                      38,
                      32
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "fill": "corrA",
                  "opacity": 0.3
                },
                {
                  "t": "txt",
                  "p": [
                    54,
                    40
                  ],
                  "text": "平面 α",
                  "size": 13
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得上一页吗？星星是点、琴弦是线、湖面是面——现在给它们起名字。",
        "点：大写字母——点 A。点只有位置，没有大小。",
        "直线：小写字母——直线 l；也可以用两个点——直线 AB。",
        "平面：希腊字母——平面 α。湖面就是一块平面。",
        "⚠️ 别搞混：画出来的点线面都有粗细，那是“画像”；真正的点没有大小、线没有粗细、面没有厚薄。",
        "反例：弯的钓鱼线不是直线——直线必须是笔直的。"
      ],
      "examples": [],
      "prev": "g01-u1-l1-p1",
      "next": "g01-u1-l1-p3"
    },
    {
      "id": "g01-u1-l1-p3",
      "title": "几何的“洁癖”：只留形状大小位置",
      "concept": "几何抽象",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{点：没有大小；线：没有粗细；面：没有厚薄}",
          "translation": "几何图形只保留形状、大小和位置"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "画像（画出来的）",
              "caption": "黑板上的点：放大看，它有大小、有粗细——这是不得已的“画像”。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    55
                  ],
                  "r": 9,
                  "color": "known",
                  "width": 2.5,
                  "fill": "known",
                  "opacity": 0.45
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "放大看：有大小、有粗细",
                  "size": 13
                }
              ]
            },
            {
              "label": "真身（几何的）",
              "caption": "真正的点：没有大小，只剩下一个位置 A。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    50,
                    55
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "A"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    30
                  ],
                  "text": "只有位置，没有大小",
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
        "点“画像”：黑板上的点，放大看有大小、有粗细。",
        "点“真身”：没有大小，只剩一个位置。",
        "线没有粗细，面没有厚薄——抽掉的都是几何不关心的。",
        "这就是几何的“洁癖”：只关心形状、大小、位置。",
        "下一课：线里面分三种——直线、射线、线段。"
      ],
      "examples": [],
      "prev": "g01-u1-l1-p2",
      "next": "g01-u1-l2-p1"
    }
  ]
};
