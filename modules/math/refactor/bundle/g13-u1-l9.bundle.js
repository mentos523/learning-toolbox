window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g13-u1-l9"] = {
  "lessonId": "g13-u1-l9",
  "lessonTitle": "全书总结：数与形的统一",
  "chapterId": "g13",
  "pages": [
    {
      "id": "g13-u1-l9-p1",
      "title": "数与形：同一问题的两种说法",
      "concept": "数形结合方法论",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{形} \\Rightarrow \\text{数}",
          "translation": "形→数：用坐标和方程描述图形"
        },
        {
          "id": "f2",
          "latex": "\\text{数} \\Rightarrow \\text{形}",
          "translation": "数→形：用图像和轨迹理解式子"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 2000,
          "steps": [
            {
              "caption": "第 1 步：几何问题——两圆是什么关系？",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    42,
                    52
                  ],
                  "r": 20,
                  "color": "known",
                  "width": 3
                },
                {
                  "t": "circle",
                  "c": [
                    62,
                    52
                  ],
                  "r": 20,
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "几何：两圆相交？",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：翻译成代数——解方程组。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    66
                  ],
                  "text": "x² + y² = 4",
                  "size": 15,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    50
                  ],
                  "text": "(x−2)² + y² = 4",
                  "size": 15,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    32
                  ],
                  "text": "解方程组",
                  "size": 14.48,
                  "color": "target"
                }
              ]
            },
            {
              "caption": "第 3 步：数形握手——方程组的解就是交点坐标。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    42,
                    52
                  ],
                  "r": 20,
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "circle",
                  "c": [
                    62,
                    52
                  ],
                  "r": 20,
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    52,
                    69
                  ],
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "pt",
                  "p": [
                    52,
                    35
                  ],
                  "color": "target",
                  "r": 5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    88
                  ],
                  "text": "解 = 交点 (1, ±√3)",
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
        "全书一句话：几何是“看得见的代数”，代数是“算得出的几何”。",
        "方法论：几何问题→翻译成代数（列方程）→算→翻译回几何（看图形）。本章每一课都在练这套动作。",
        "回看：g00.1.4 我们第一次握手（x² 是正方形）；g13.1.9 我们最后一次握手——切线斜率是导数。",
        "数形结合不是口号，是工作方法：卡住的时候，换一种语言再想一遍。",
        "记住一句话：数缺形时少直观，形缺数时难入微。"
      ],
      "examples": [
        {
          "text": "与 g00.1.4 首尾呼应：第一次握手（x² 是正方形）→最后一次握手（切线斜率是导数）",
          "figure": "回链"
        }
      ],
      "prev": "g13-u1-l8-p3",
      "next": "g13-u1-l9-p2"
    },
    {
      "id": "g13-u1-l9-p2",
      "title": "全书综合：6 道题",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{数形互译}",
          "translation": "数形互译：几何与代数是同一规律的两种语言"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "做题锦囊：先想“形”（画图），再想“数”（列式），最后“翻译”回来。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    74
                  ],
                  "text": "形：画图",
                  "size": 15,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    66
                  ],
                  "b": [
                    50,
                    56
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    48
                  ],
                  "text": "数：列式计算",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    40
                  ],
                  "b": [
                    50,
                    30
                  ],
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    22
                  ],
                  "text": "翻译回几何作答",
                  "size": 15,
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
        "1．认图：圆心(2,3)、半径4的圆方程是？A．(x−2)²+(y−3)²=16 B．(x+2)²+(y+3)²=16",
        "2．直用：A(1,2)、B(7,10)，求 AB 的距离和中点坐标。",
        "3．小综合：直线 y=2x+1 与 y=2x−3 什么关系？求过 (0,0) 且与 y=2x+1 垂直的直线方程。",
        "4．变式：抛物线 y=2x² 的焦点坐标是？（提示：a=1/(4p)）",
        "5．生活建模：地图上两点 (3,4)、(9,12)（单位 km），直线距离多远？",
        "6．想一想：为什么“形→数→形”走一圈，问题反而变简单了？（开放题，说说你的理解）"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "1．A。2．距离 10，中点 (4,6)。3．平行；y=−x/2。4．(0,1/8)：a=2=1/(4p) 得 p=1/8。5．10 km：横差 6、竖差 8。6．开放：代数擅长算，几何擅长看，互译取长补短。"
        },
        {
          "figure": "错因解析",
          "text": "1．圆心 (2,3) 对应 (x−2)²、(y−3)²，半径 4 对应 =16——选 A；B 的圆心是 (−2,−3)。2．距离=√((7−1)²+(10−2)²)=10；中点=((1+7)/2,(2+10)/2)=(4,6)——6-8-10 再现。3．k 都是 2：平行；垂直则 k₁k₂=−1——过原点：y=−x/2。4．y=ax² 焦点 (0,1/(4a))：a=2，p=1/8——焦点 (0,1/8)。5．横差 6、竖差 8：距离=√(36+64)=10 km——又是 6-8-10。6．开放：代数把形翻译成数来算，几何把数翻译成形来看——互译取长补短。"
        }
      ],
      "prev": "g13-u1-l9-p1",
      "next": null
    }
  ]
};
