window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g02-u2-l1"] = {
  "lessonId": "g02-u2-l1",
  "lessonTitle": "平行的定义与平行公理",
  "chapterId": "g02",
  "pages": [
    {
      "id": "g02-u2-l1-p1",
      "title": "铁轨：永远不相交",
      "concept": "平行的定义",
      "formulas": [
        {
          "id": "f1",
          "latex": "a \\parallel b",
          "translation": "a 平行于 b：在同一平面内永不相交"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：这两条直线，延长后会撞到一起——不平行。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    62
                  ],
                  "b": [
                    70,
                    52
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    10,
                    38
                  ],
                  "b": [
                    70,
                    48
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    52
                  ],
                  "b": [
                    95,
                    48
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    70,
                    48
                  ],
                  "b": [
                    95,
                    52
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "延长后会相交",
                  "size": 14.48,
                  "color": "aux"
                }
              ]
            },
            {
              "caption": "第 2 步：这两条呢？怎么延长都不相交——这就是平行。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    60
                  ],
                  "b": [
                    90,
                    60
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    10,
                    40
                  ],
                  "b": [
                    90,
                    40
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "延长也不相交",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：平行记作 a ∥ b。铁轨、斑马线、推拉门滑轨，都是平行。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    60
                  ],
                  "b": [
                    90,
                    60
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    10,
                    40
                  ],
                  "b": [
                    90,
                    40
                  ],
                  "color": "known",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "a ∥ b",
                  "size": 18,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "铁轨：两条永不相交",
                  "size": 14.48
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点 ▶：延长两条直线，看它们会不会相交。",
        "平行：在同一平面内，永不相交的两条直线。",
        "记作 a ∥ b，读作“a 平行于 b”——两道竖线像铁轨。",
        "下一页：过直线外一点，能画几条平行线？"
      ],
      "examples": [
        {
          "text": "铁轨、斑马线、推拉门滑轨",
          "figure": "实物"
        }
      ],
      "prev": "g02-u1-l4-p8",
      "next": "g02-u2-l1-p2"
    },
    {
      "id": "g02-u2-l1-p2",
      "title": "平行公理：只能画一条",
      "concept": "平行公理",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{过直线外一点有且只有一条直线与已知直线平行}",
          "translation": "过直线外一点，只能画出一条和已知直线平行的直线"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：过 A 作 l 的平行线——只有这一条是平行的，歪一点就会撞上 l。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    35
                  ],
                  "b": [
                    90,
                    35
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    92,
                    35
                  ],
                  "text": "l",
                  "size": 14.48
                },
                {
                  "t": "seg",
                  "a": [
                    10,
                    70
                  ],
                  "b": [
                    90,
                    70
                  ],
                  "color": "target",
                  "width": 3,
                  "arrows": 2
                },
                {
                  "t": "seg",
                  "a": [
                    30,
                    82
                  ],
                  "b": [
                    70,
                    58
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
                  "r": 3.5,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    56,
                    74
                  ],
                  "text": "A",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    52
                  ],
                  "text": "这条延长后会撞上 l",
                  "size": 12,
                  "color": "aux"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "上一页你看到：平行就是“延长也不相交”。现在问：过直线外一点 A，能画几条 l 的平行线？",
        "答案：有且只有一条——这就是平行公理。画两条试试，第二条总会撞上 l。",
        "生活例：铁轨只有一对；推拉门的滑轨——多一条就卡住了。",
        "反例伏笔：在立体空间里，“不相交”不一定平行——比如天花板和地板的两条棱，永不相交但也不平行（第 12 章再见）。",
        "⚠️ 别搞混：平行公理说的是“直线外一点”；点在直线上时，平行线就是直线本身。",
        "记住一句话：线外一点，只能引一条平行线。"
      ],
      "examples": [],
      "prev": "g02-u2-l1-p1",
      "next": "g02-u2-l2-p1"
    }
  ]
};
