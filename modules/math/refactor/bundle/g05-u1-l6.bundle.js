window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g05-u1-l6"] = {
  "lessonId": "g05-u1-l6",
  "lessonTitle": "两点间距离公式",
  "chapterId": "g05",
  "pages": [
    {
      "id": "g05-u1-l6-p1",
      "title": "横平竖直造公式",
      "concept": "两点间距离公式的发现（H2）",
      "formulas": [
        {
          "id": "f1",
          "latex": "AB = \\sqrt{3^2 + 4^2} = 5",
          "translation": "AB 等于根号下 9 加 16，等于 5"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：A(1,2)、B(4,6)——求 AB 有多长。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    15
                  ],
                  "b": [
                    90,
                    15
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    10
                  ],
                  "b": [
                    15,
                    90
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    35
                  ],
                  "label": "A(1,2)",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    75
                  ],
                  "label": "B(4,6)",
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 2 步：过 A 作横线、过 B 作竖线——'横平竖直'造出直角三角形 ABC。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    15
                  ],
                  "b": [
                    90,
                    15
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    10
                  ],
                  "b": [
                    15,
                    90
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    35
                  ],
                  "label": "A(1,2)",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    75
                  ],
                  "label": "B(4,6)",
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    35
                  ],
                  "b": [
                    55,
                    35
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    35
                  ],
                  "b": [
                    55,
                    75
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "6,4"
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    35
                  ],
                  "label": "C(4,2)",
                  "color": "aux"
                },
                {
                  "t": "right",
                  "v": [
                    55,
                    35
                  ],
                  "p": [
                    25,
                    35
                  ],
                  "q": [
                    55,
                    75
                  ],
                  "size": 6,
                  "color": "corrAngle"
                }
              ]
            },
            {
              "caption": "第 3 步：两条直角边就是坐标差：3 和 4——AB=√(3²+4²)=5，公式自己'长'出来了。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    15
                  ],
                  "b": [
                    90,
                    15
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    10
                  ],
                  "b": [
                    15,
                    90
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    35
                  ],
                  "b": [
                    55,
                    35
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    55,
                    35
                  ],
                  "b": [
                    55,
                    75
                  ],
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    35
                  ],
                  "b": [
                    55,
                    75
                  ],
                  "color": "target",
                  "width": 3
                },
                {
                  "t": "right",
                  "v": [
                    55,
                    35
                  ],
                  "p": [
                    25,
                    35
                  ],
                  "q": [
                    55,
                    75
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    40,
                    30
                  ],
                  "text": "AC=|4−1|=3",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    55
                  ],
                  "text": "BC=|6−2|=4",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "AB=√(3²+4²)=5",
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
        "H2：亲手'造'公式——横线一画、竖线一画，直角三角形就出来了。",
        "直角边 = 坐标差：横着差 3，竖着差 4——'差'字就是减法。",
        "斜边 AB 就是两点距离：√(3²+4²)=5。"
      ],
      "examples": [
        {
          "text": "地图上量两点距离",
          "figure": "实物"
        }
      ],
      "prev": "g05-u1-l5-p3",
      "next": "g05-u1-l6-p2"
    },
    {
      "id": "g05-u1-l6-p2",
      "title": "两点间距离公式",
      "concept": "两点间距离公式 + H2 呼应",
      "formulas": [
        {
          "id": "f1",
          "latex": "d = \\sqrt{(x_2-x_1)^2 + (y_2-y_1)^2}",
          "translation": "两点距离等于 x 坐标差的平方加 y 坐标差的平方，再开方"
        },
        {
          "id": "f2",
          "latex": "d = |x_2 - x_1|",
          "translation": "数轴上两点距离等于坐标差的绝对值：一维版本"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "例题：P(−1,3)、Q(2,−1)：横差 3、纵差 4，d=√(9+16)=5。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    15
                  ],
                  "b": [
                    90,
                    15
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    10
                  ],
                  "b": [
                    15,
                    90
                  ],
                  "color": "line",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      30,
                      60
                    ],
                    [
                      60,
                      60
                    ],
                    [
                      60,
                      20
                    ]
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "right",
                  "v": [
                    60,
                    60
                  ],
                  "p": [
                    30,
                    60
                  ],
                  "q": [
                    60,
                    20
                  ],
                  "size": 6,
                  "color": "corrAngle"
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    65
                  ],
                  "text": "横差 3",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    66,
                    40
                  ],
                  "text": "纵差 4",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "d=√(3²+4²)=5",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "数轴回链：一维时距离=|7−2|=5——平面公式是它的'升级版'。",
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
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    29,
                    50
                  ],
                  "label": "2",
                  "color": "known"
                },
                {
                  "t": "pt",
                  "p": [
                    64,
                    50
                  ],
                  "label": "7",
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    29,
                    50
                  ],
                  "b": [
                    64,
                    50
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    46,
                    62
                  ],
                  "text": "距离 = |7−2| = 5",
                  "size": 13,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    76
                  ],
                  "text": "一维：|dx| → 二维：√(dx²+dy²)",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "公式：d=√[(x₂−x₁)²+(y₂−y₁)²]——横坐标差、纵坐标差，先平方、再相加、最后开方。",
        "数轴回链：一维时距离 = |x₂−x₁|；平面是它的升级版——多了一个 y，多了一次平方和。",
        "例题：P(−1,3)、Q(2,−1)：横差 3、纵差 −4，d=√(9+16)=5。",
        "⚠️ 别搞混：是 √(dx²+dy²)，不是 |dx|+|dy|——'先平方再开方'和'直接相加'是两回事。",
        "H2 互链：代数 ch06-u0-l2 坐标系里，两点距离从今天起有了公式——几何给代数递了一把尺子。",
        "记住一句话：横差竖差平方和，开方就是距离。"
      ],
      "examples": [
        {
          "text": "回看代数 ch06-u0-l2：平面直角坐标系",
          "figure": "回链"
        }
      ],
      "prev": "g05-u1-l6-p1",
      "next": "g05-u1-l7-p1"
    }
  ]
};
