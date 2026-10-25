window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch06-u0-l2"] = {
  "lessonId": "ch06-u0-l2",
  "lessonTitle": "平面直角坐标系",
  "chapterId": "ch06",
  "pages": [
    {
      "id": "ch06-u0-l2-p1",
      "title": "两条数轴搭成十字",
      "concept": "平面直角坐标系",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{x 轴：横向数轴}",
          "translation": "x 轴：横着的那条数轴，箭头指向右（正方向）"
        },
        {
          "id": "f2",
          "latex": "\\text{y 轴：纵向数轴}",
          "translation": "y 轴：竖着的那条数轴，箭头指向上（正方向）"
        },
        {
          "id": "f3",
          "latex": "O = (0, 0)",
          "translation": "原点 O：两条轴的交点，坐标记作 (0, 0)"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：先画一条横向数轴——这就是 x 轴，箭头指向右。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：再画一条纵向数轴穿过它——这就是 y 轴，箭头指向上。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：两条轴的交点叫原点 O——平面从此有了门牌号系统。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    30
                  ],
                  "label": "O",
                  "color": "target",
                  "r": 5
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "搭法：横一条（x 轴）、竖一条（y 轴），互相垂直，交点是原点 O。",
        "正方向：x 轴向右、y 轴向上——箭头那边是正数，反方向是负数。",
        "还记得吗？上一课你描 (x, y) 的点——那些点就住在这个坐标系里。"
      ],
      "examples": [
        {
          "text": "教室座位：第 3 列第 2 排——列是 x，排是 y",
          "figure": "生活实例"
        }
      ],
      "prev": "ch06-u0-l1-p2b",
      "next": "ch06-u0-l2-p2"
    },
    {
      "id": "ch06-u0-l2-p2",
      "title": "有序数对：先横后纵",
      "concept": "有序数对与点的一一对应",
      "formulas": [
        {
          "id": "f1",
          "latex": "(4, 3)",
          "translation": "有序数对 (4, 3)：第一个数 4 管横向（向右 4），第二个数 3 管纵向（向上 3）"
        },
        {
          "id": "f2",
          "latex": "(x, y)",
          "translation": "一一对应：每个点有唯一的坐标 (x, y)，每个 (x, y) 也只对应一个点"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：P(4, 3)——先从原点向右走 4。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    65,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "4,3"
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    30
                  ],
                  "color": "aux",
                  "r": 4
                }
              ]
            },
            {
              "caption": "第 2 步：再向上走 3——落点就是 P，坐标 (4, 3)。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    65,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    65,
                    30
                  ],
                  "b": [
                    65,
                    60
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "4,3"
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    60
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    70
                  ],
                  "text": "(4, 3)",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：反过来也行——点到哪里，坐标就报到哪里，这叫一一对应。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    20
                  ],
                  "label": "Q",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    11
                  ],
                  "text": "(2, −1)",
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
        "顺序不能反：(4, 3) 和 (3, 4) 是两个不同的点——“有序”就是这个意思。",
        "读法：P(4, 3) 读作“点 P 的坐标是 4、3”——先横后纵。",
        "反例：只给一个数（比如“向右 4”）定不了点——少一个数，位置就定不下来。"
      ],
      "examples": [
        {
          "text": "电影院“5 排 8 号”：两个数定一个座，和坐标一个思路",
          "figure": "生活实例"
        }
      ],
      "prev": "ch06-u0-l2-p1",
      "next": "ch06-u0-l2-p2b"
    },
    {
      "id": "ch06-u0-l2-p2b",
      "title": "读坐标，描点：按图索骥",
      "concept": "讲解：有序数对与描点",
      "formulas": [
        {
          "id": "f1",
          "latex": "A(2, 5)",
          "translation": "描点：A(2, 5)——先向右 2，再向上 5，落笔"
        },
        {
          "id": "f2",
          "latex": "B(-1, 2)",
          "translation": "读坐标：点 B 在向左 1、向上 2 的位置，坐标是 (−1, 2)"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：描 A(2, 5)——向右 2，再向上 5。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    45,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    45,
                    30
                  ],
                  "b": [
                    45,
                    80
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "4,3"
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    80
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 5
                }
              ]
            },
            {
              "caption": "第 2 步：读 B 的坐标——向左 1、向上 2，所以 B(−1, 2)。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    15,
                    50
                  ],
                  "label": "B",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    15,
                    60
                  ],
                  "text": "(−1, 2)",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：轴上的点——x 轴上的点，y 坐标永远是 0。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    94,
                    30
                  ],
                  "text": "x",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    25,
                    95
                  ],
                  "text": "y",
                  "size": 13
                },
                {
                  "t": "pt",
                  "p": [
                    55,
                    30
                  ],
                  "label": "C",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    55,
                    40
                  ],
                  "text": "C(3, 0)",
                  "size": 13,
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
        "描点两步走：先横（x）再纵（y）——“先横后纵”是铁律。",
        "读坐标反着来：从点出发，横向走了几格就是 x，纵向走了几格就是 y。",
        "生活例：下棋报“炮二平五”——先报横再报纵，和坐标一个思路。",
        "反例：把 (2, 5) 描成 (5, 2)——顺序一反，点就飞了。",
        "轴上点的特征：x 轴上的点 y=0（如 C(3, 0)）；y 轴上的点 x=0。",
        "记住一句话：先横后纵，按图索骥。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "描 D(−2, −3)：向左 2，再向下 3。"
        }
      ],
      "prev": "ch06-u0-l2-p2",
      "next": "ch06-u0-l2-p3"
    },
    {
      "id": "ch06-u0-l2-p3",
      "title": "四个象限：看正负",
      "concept": "象限",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{第一象限：}x > 0, y > 0",
          "translation": "第一象限：右上，x 和 y 都是正数"
        },
        {
          "id": "f2",
          "latex": "\\text{二/三/四象限：}(-,+), (-,-), (+,-)",
          "translation": "第二象限左上（−,+）、第三象限左下（−,−）、第四象限右下（+,−）"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：两条轴把平面切成四块——从右上开始，逆时针叫一、二、三、四象限。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    61
                  ],
                  "text": "一",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    61
                  ],
                  "text": "二",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    22
                  ],
                  "text": "三",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    22
                  ],
                  "text": "四",
                  "size": 16,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：第一象限 (＋, ＋)——比如 P(4, 3)，两个坐标都是正数。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    61
                  ],
                  "text": "一",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    61
                  ],
                  "text": "二",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    22
                  ],
                  "text": "三",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    22
                  ],
                  "text": "四",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    60
                  ],
                  "label": "P",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    65,
                    70
                  ],
                  "text": "(4, 3)",
                  "size": 13,
                  "bold": true,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：符号定象限——Q(2, −1) 在第四象限，R(−1, 2) 在第二象限。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    61
                  ],
                  "text": "一",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    61
                  ],
                  "text": "二",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    22
                  ],
                  "text": "三",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    22
                  ],
                  "text": "四",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    20
                  ],
                  "label": "Q",
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    45,
                    11
                  ],
                  "text": "(2, −1)",
                  "size": 12,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "pt",
                  "p": [
                    15,
                    50
                  ],
                  "label": "R",
                  "color": "corrA",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    15,
                    60
                  ],
                  "text": "(−1, 2)",
                  "size": 12,
                  "bold": true,
                  "color": "corrA"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "编号规则：从右上开始，逆时针依次是一、二、三、四象限。",
        "符号速判：(＋,＋) 是一，(−,＋) 是二，(−,−) 是三，(＋,−) 是四——看正负号就行。",
        "⚠️ 别搞混：坐标轴上的点不属于任何象限——比如 (3, 0) 在 x 轴上，不在象限里。",
        "记住一句话：符号定象限，轴上点除外。"
      ],
      "examples": [
        {
          "text": "点 (−2, −3) 在第几象限？——x 负 y 负，第三象限",
          "figure": "自测"
        }
      ],
      "prev": "ch06-u0-l2-p2b",
      "next": "ch06-u0-l2-p3b"
    },
    {
      "id": "ch06-u0-l2-p3b",
      "title": "象限判读：三步走",
      "concept": "讲解：象限判读",
      "formulas": [
        {
          "id": "f1",
          "latex": "(-2, 5) \\to \\text{第二象限}",
          "translation": "(−2, 5)：x 负 y 正 → 第二象限"
        },
        {
          "id": "f2",
          "latex": "(0, -1) \\to \\text{在 y 轴上}",
          "translation": "(0, −1)：x=0，落在 y 轴上，不属于任何象限"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "steps": [
            {
              "caption": "第 1 步：A(−2, 5)——x 负、y 正，第二象限。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    61
                  ],
                  "text": "一",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    61
                  ],
                  "text": "二",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    22
                  ],
                  "text": "三",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    22
                  ],
                  "text": "四",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "pt",
                  "p": [
                    5,
                    80
                  ],
                  "label": "A",
                  "color": "target",
                  "r": 5
                }
              ]
            },
            {
              "caption": "第 2 步：B(0, −1)——x=0，落在 y 轴上，不属于任何象限。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    61
                  ],
                  "text": "一",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    61
                  ],
                  "text": "二",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    22
                  ],
                  "text": "三",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    22
                  ],
                  "text": "四",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    20
                  ],
                  "label": "B",
                  "color": "target",
                  "r": 5
                }
              ]
            },
            {
              "caption": "第 3 步：三步走——一看 x 正负，二看 y 正负，三看是不是在轴上。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    30
                  ],
                  "b": [
                    92,
                    30
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    18
                  ],
                  "b": [
                    25,
                    92
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    61
                  ],
                  "text": "一",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    61
                  ],
                  "text": "二",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    14,
                    22
                  ],
                  "text": "三",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    58,
                    22
                  ],
                  "text": "四",
                  "size": 16,
                  "bold": true
                },
                {
                  "t": "pt",
                  "p": [
                    5,
                    80
                  ],
                  "label": "A",
                  "color": "corrA",
                  "r": 4
                },
                {
                  "t": "pt",
                  "p": [
                    25,
                    20
                  ],
                  "label": "B",
                  "color": "corrA",
                  "r": 4
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "判读三步：先看 x 的正负，再看 y 的正负，最后检查是不是落在轴上。",
        "生活例：地图“东经为正、西经为负”——经纬度就是地球的坐标系。",
        "反例：说“(3, 0) 在第一象限”——错！它在 x 轴上，哪个象限都不算。",
        "图形例：y=2x+1 的图像穿过一、二、三象限——下一单元你会亲手画它。",
        "记住一句话：符号定象限，轴上点除外。"
      ],
      "examples": [
        {
          "figure": "变式练习",
          "text": "点 (5, −2)、(−4, −1) 各在第几象限？——第四、第三。"
        }
      ],
      "prev": "ch06-u0-l2-p3",
      "next": "ch06-u1-l1-p1"
    }
  ]
};
