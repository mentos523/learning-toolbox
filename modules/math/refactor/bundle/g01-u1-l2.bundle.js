window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g01-u1-l2"] = {
  "lessonId": "g01-u1-l2",
  "lessonTitle": "直线、射线、线段",
  "chapterId": "g01",
  "pages": [
    {
      "id": "g01-u1-l2-p1",
      "title": "两点确定一条直线",
      "concept": "两点确定一条直线",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{过两点，有且只有一条直线}",
          "translation": "两个点唯一确定一条直线"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：只钉住点 A，木条随便转——无数条直线。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    20,
                    70
                  ],
                  "b": [
                    80,
                    30
                  ],
                  "color": "aux",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    25,
                    30
                  ],
                  "b": [
                    75,
                    70
                  ],
                  "color": "aux",
                  "width": 2
                },
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
                  "color": "aux",
                  "width": 2
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "A"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "过一点的直线：无数条",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：再钉住点 B，转一转木条——只有一条能同时穿过 A 和 B。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    35,
                    58
                  ],
                  "b": [
                    65,
                    42
                  ],
                  "color": "line",
                  "width": 3.5
                },
                {
                  "t": "seg",
                  "a": [
                    20,
                    68
                  ],
                  "b": [
                    50,
                    48
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    52
                  ],
                  "b": [
                    80,
                    32
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "pt",
                  "p": [
                    35,
                    58
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "A"
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    42
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "B"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "转一转：只有一条穿过 A、B",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：过 A、B 两点，有且只有一条直线。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    66
                  ],
                  "b": [
                    85,
                    34
                  ],
                  "color": "line",
                  "width": 3.5
                },
                {
                  "t": "pt",
                  "p": [
                    35,
                    58
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "A"
                },
                {
                  "t": "pt",
                  "p": [
                    65,
                    42
                  ],
                  "r": 4,
                  "color": "known",
                  "label": "B"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "两点确定一条直线",
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
        "只钉住点 A：木条随便转——过一点的直线有无数条。",
        "再钉住点 B：木条转不动了——只有一条直线穿过 A 和 B。",
        "这就是：两点确定一条直线。"
      ],
      "examples": [
        {
          "text": "木工弹墨线：两个点一拉一弹，线就直了",
          "figure": "实物"
        }
      ],
      "prev": "g01-u1-l1-p3",
      "next": "g01-u1-l2-p2"
    },
    {
      "id": "g01-u1-l2-p2",
      "title": "直线、射线、线段：三张身份证",
      "concept": "三种线的区别",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{线段：2 个端点；射线：1 个端点；直线：0 个端点}",
          "translation": "端点数是区分三种线的身份证"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：三种线的端点数——2 个、1 个、0 个。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    15,
                    74
                  ],
                  "r": 3,
                  "color": "line",
                  "label": "A"
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    74
                  ],
                  "b": [
                    45,
                    74
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "pt",
                  "p": [
                    45,
                    74
                  ],
                  "r": 3,
                  "color": "line",
                  "label": "B"
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    74
                  ],
                  "text": "线段 AB：两个端点",
                  "size": 12
                },
                {
                  "t": "pt",
                  "p": [
                    15,
                    52
                  ],
                  "r": 3,
                  "color": "line",
                  "label": "O"
                },
                {
                  "t": "ray",
                  "p": [
                    15,
                    52
                  ],
                  "ang": 0,
                  "len": 32,
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    52
                  ],
                  "text": "射线 OA：一个端点",
                  "size": 12
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    30
                  ],
                  "b": [
                    45,
                    30
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    70,
                    30
                  ],
                  "text": "直线：没有端点",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "看图：线段（两个端点）、射线（一个端点）、直线（没有端点）。",
        "线段：两个头，像排队、像金箍棒——能测量多长。",
        "射线：一个头，像手电筒的光——向一边无限长。",
        "直线：没有头，像双向延长的公路——两边都无限长。",
        "⚠️ 别搞混：金箍棒再长也有头，是线段，不是直线。",
        "反例：弯的钓鱼线——它是曲线，不在三种“直的线”里。"
      ],
      "examples": [],
      "prev": "g01-u1-l2-p1",
      "next": "g01-u1-l2-p3"
    },
    {
      "id": "g01-u1-l2-p3",
      "title": "表示法：名字怎么写",
      "concept": "三种线的表示法；H12 射线↔不等式解集",
      "formulas": [
        {
          "id": "f1",
          "latex": "x > 3",
          "translation": "x 大于 3：在数轴上是从 3 出发向右的射线"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：x>3 的解集——从 3 出发向右的一条射线。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    10,
                    50
                  ],
                  "b": [
                    90,
                    50
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "pt",
                  "p": [
                    35,
                    50
                  ],
                  "r": 3.5,
                  "color": "target",
                  "label": "3"
                },
                {
                  "t": "ray",
                  "p": [
                    35,
                    50
                  ],
                  "ang": 0,
                  "len": 50,
                  "color": "target",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    64
                  ],
                  "text": "x > 3",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    62,
                    36
                  ],
                  "text": "端点空心圈：不含 3",
                  "size": 12
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "表示法：直线 l（小写），或直线 AB；射线 OA（端点 O 写在前面！）；线段 AB（AB、BA 都行）。",
        "⚠️ 别写错：射线 OB 和射线 BO 是两条射线——端点一变，射线就变了。",
        "呼应代数：x>3 的解集，在数轴上就是“从 3 出发向右的一条射线”。",
        "端点的空心圈（不含 3）就是射线的端点——代数的“不含”，几何的“起点”，同一个意思。"
      ],
      "examples": [
        {
          "text": "回看代数不等式：数轴上的解集",
          "figure": "回链"
        }
      ],
      "prev": "g01-u1-l2-p2",
      "next": "g01-u1-l3-p1"
    }
  ]
};
