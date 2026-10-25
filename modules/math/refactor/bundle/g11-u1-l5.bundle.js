window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g11-u1-l5"] = {
  "lessonId": "g11-u1-l5",
  "lessonTitle": "圆的面积：化圆为方",
  "chapterId": "g11",
  "pages": [
    {
      "id": "g11-u1-l5-p1",
      "title": "把圆切成小扇形",
      "concept": "化圆为方（极限思想）",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{瓣越多} \\Rightarrow \\text{越像长方形}",
          "translation": "切成的扇形瓣数越多，拼出来的图形越接近长方形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "autoplay": true,
          "steps": [
            {
              "caption": "第 1 步：把圆平均切成 8 瓣——每瓣像一块小披萨。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    55
                  ],
                  "r": 25,
                  "color": "line",
                  "width": 2.5
                },
                {
                  "t": "ray",
                  "p": [
                    50,
                    55
                  ],
                  "ang": 0,
                  "len": 25,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "ray",
                  "p": [
                    50,
                    55
                  ],
                  "ang": 45,
                  "len": 25,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "ray",
                  "p": [
                    50,
                    55
                  ],
                  "ang": 90,
                  "len": 25,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "ray",
                  "p": [
                    50,
                    55
                  ],
                  "ang": 135,
                  "len": 25,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "ray",
                  "p": [
                    50,
                    55
                  ],
                  "ang": 180,
                  "len": 25,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "ray",
                  "p": [
                    50,
                    55
                  ],
                  "ang": 225,
                  "len": 25,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "ray",
                  "p": [
                    50,
                    55
                  ],
                  "ang": 270,
                  "len": 25,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "ray",
                  "p": [
                    50,
                    55
                  ],
                  "ang": 315,
                  "len": 25,
                  "color": "aux",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "8 瓣",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：8 瓣上下交错拼起来——像一条波浪形的带子。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      30
                    ],
                    [
                      31.3,
                      30
                    ],
                    [
                      22.6,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      31.3,
                      30
                    ],
                    [
                      48.6,
                      30
                    ],
                    [
                      39.9,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      48.6,
                      30
                    ],
                    [
                      65.8,
                      30
                    ],
                    [
                      57.2,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      65.8,
                      30
                    ],
                    [
                      83.1,
                      30
                    ],
                    [
                      74.5,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      22.6,
                      30
                    ],
                    [
                      39.9,
                      30
                    ],
                    [
                      31.3,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      39.9,
                      30
                    ],
                    [
                      57.2,
                      30
                    ],
                    [
                      48.6,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      57.2,
                      30
                    ],
                    [
                      74.5,
                      30
                    ],
                    [
                      65.8,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      74.5,
                      30
                    ],
                    [
                      91.8,
                      30
                    ],
                    [
                      83.1,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    66
                  ],
                  "text": "8 瓣拼成的带子",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 3 步：切成 16 瓣再拼——瓣变细了，带子变“平”了。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      30
                    ],
                    [
                      22.6,
                      30
                    ],
                    [
                      18.3,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      22.6,
                      30
                    ],
                    [
                      31.3,
                      30
                    ],
                    [
                      27,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      31.3,
                      30
                    ],
                    [
                      39.9,
                      30
                    ],
                    [
                      35.6,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      39.9,
                      30
                    ],
                    [
                      48.6,
                      30
                    ],
                    [
                      44.2,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      48.6,
                      30
                    ],
                    [
                      57.2,
                      30
                    ],
                    [
                      52.9,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      57.2,
                      30
                    ],
                    [
                      65.8,
                      30
                    ],
                    [
                      61.5,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      65.8,
                      30
                    ],
                    [
                      74.5,
                      30
                    ],
                    [
                      70.2,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      74.5,
                      30
                    ],
                    [
                      83.1,
                      30
                    ],
                    [
                      78.8,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      18.3,
                      30
                    ],
                    [
                      27,
                      30
                    ],
                    [
                      22.6,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      27,
                      30
                    ],
                    [
                      35.6,
                      30
                    ],
                    [
                      31.3,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      35.6,
                      30
                    ],
                    [
                      44.2,
                      30
                    ],
                    [
                      39.9,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      44.2,
                      30
                    ],
                    [
                      52.9,
                      30
                    ],
                    [
                      48.6,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      52.9,
                      30
                    ],
                    [
                      61.5,
                      30
                    ],
                    [
                      57.2,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      61.5,
                      30
                    ],
                    [
                      70.2,
                      30
                    ],
                    [
                      65.8,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      70.2,
                      30
                    ],
                    [
                      78.8,
                      30
                    ],
                    [
                      74.5,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      78.8,
                      30
                    ],
                    [
                      87.4,
                      30
                    ],
                    [
                      83.1,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    66
                  ],
                  "text": "16 瓣：更平了",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 4 步：64 瓣拼起来——瓣细得像牙签，直接看“带子”：已经很像长方形了。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      30
                    ],
                    [
                      87,
                      30
                    ],
                    [
                      87,
                      52
                    ],
                    [
                      14,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 2
                },
                {
                  "t": "seg",
                  "a": [
                    23,
                    30
                  ],
                  "b": [
                    23,
                    52
                  ],
                  "color": "aux",
                  "width": 1,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    32,
                    30
                  ],
                  "b": [
                    32,
                    52
                  ],
                  "color": "aux",
                  "width": 1,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    41,
                    30
                  ],
                  "b": [
                    41,
                    52
                  ],
                  "color": "aux",
                  "width": 1,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    30
                  ],
                  "b": [
                    50,
                    52
                  ],
                  "color": "aux",
                  "width": 1,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    59,
                    30
                  ],
                  "b": [
                    59,
                    52
                  ],
                  "color": "aux",
                  "width": 1,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    68,
                    30
                  ],
                  "b": [
                    68,
                    52
                  ],
                  "color": "aux",
                  "width": 1,
                  "dash": "4,3"
                },
                {
                  "t": "seg",
                  "a": [
                    77,
                    30
                  ],
                  "b": [
                    77,
                    52
                  ],
                  "color": "aux",
                  "width": 1,
                  "dash": "4,3"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    66
                  ],
                  "text": "64 瓣：很像长方形了",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 5 步：128 瓣——拼出来几乎就是长方形！长≈πr（半个圆周），宽=r。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      30
                    ],
                    [
                      87,
                      30
                    ],
                    [
                      87,
                      52
                    ],
                    [
                      14,
                      52
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    64
                  ],
                  "text": "长 ≈ πr（圆周长的一半）",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    93,
                    41
                  ],
                  "text": "宽=r",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "128 瓣：几乎长方形",
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
        "点播放：看圆被切成越来越细的瓣，拼成的带子越来越“方”。",
        "瓣数 8→16→64→128：变的是瓣的粗细和带子的“方”度；没变的是：面积。",
        "这就是“化圆为方”——下一页算出它到底等于多少。"
      ],
      "examples": [
        {
          "text": "披萨切瓣：瓣越多，拼得越方",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l4-p3",
      "next": "g11-u1-l5-p2"
    },
    {
      "id": "g11-u1-l5-p2",
      "title": "圆面积公式的由来",
      "concept": "圆面积公式",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = \\pi r^2",
          "translation": "圆面积等于圆周率乘以半径的平方"
        },
        {
          "id": "f2",
          "latex": "\\text{长} = \\pi r, \\text{宽} = r",
          "translation": "拼成的近似长方形，长是 πr，宽是 r"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "近似长方形：长 = 圆周长的一半 = πr，宽 = 半径 r——面积 = πr×r = πr²。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      32
                    ],
                    [
                      86,
                      32
                    ],
                    [
                      86,
                      58
                    ],
                    [
                      14,
                      58
                    ]
                  ],
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    70
                  ],
                  "text": "长 = πr（圆周长的一半）",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    92,
                    45
                  ],
                  "text": "宽=r",
                  "size": 13
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "S = πr × r = πr²",
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
        "还记得吗？128 瓣拼成了近似长方形——它的长是圆周长的一半：2πr÷2=πr，宽是半径 r。",
        "圆面积 = πr × r = πr²：圆周率乘以半径的平方。",
        "生活例：披萨 9 寸（半径约 11cm），面积≈3.14×121≈380cm²。图形例：r=3，面积=9π。",
        "反例：公式里是 r²（半径的平方）——别把直径当半径代进去，直径要先除以 2。",
        "⚠️ 别搞混：圆周长是 2πr（一圈的“线”），圆面积是 πr²（一整块“面”）——长得像，意思完全不同。",
        "记住一句话：圆面积，π 乘以半径的平方。"
      ],
      "examples": [
        {
          "text": "r=2：面积=4π≈12.56",
          "figure": "算式"
        }
      ],
      "prev": "g11-u1-l5-p1",
      "next": "g11-u1-l5-p3"
    },
    {
      "id": "g11-u1-l5-p3",
      "title": "极限：先看到，再算到",
      "concept": "极限思想的几何预演",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = \\pi r^2",
          "translation": "这个公式，是“分割→近似→极限”三步走出来的"
        }
      ],
      "interaction": {
        "type": "morph-toggle",
        "params": {
          "views": [
            {
              "label": "8 瓣拼",
              "caption": "8 瓣拼成的带子：波浪边很明显，还不太“方”。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      30
                    ],
                    [
                      31.3,
                      30
                    ],
                    [
                      22.6,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      31.3,
                      30
                    ],
                    [
                      48.6,
                      30
                    ],
                    [
                      39.9,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      48.6,
                      30
                    ],
                    [
                      65.8,
                      30
                    ],
                    [
                      57.2,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      65.8,
                      30
                    ],
                    [
                      83.1,
                      30
                    ],
                    [
                      74.5,
                      52
                    ]
                  ],
                  "color": "known",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      22.6,
                      30
                    ],
                    [
                      39.9,
                      30
                    ],
                    [
                      31.3,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      39.9,
                      30
                    ],
                    [
                      57.2,
                      30
                    ],
                    [
                      48.6,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      57.2,
                      30
                    ],
                    [
                      74.5,
                      30
                    ],
                    [
                      65.8,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      74.5,
                      30
                    ],
                    [
                      91.8,
                      30
                    ],
                    [
                      83.1,
                      52
                    ]
                  ],
                  "color": "corrA",
                  "width": 1.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    66
                  ],
                  "text": "8 瓣：波浪边明显",
                  "size": 13
                }
              ]
            },
            {
              "label": "128 瓣拼",
              "caption": "128 瓣拼成的带子：几乎就是长方形——瓣越多，越接近。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      14,
                      30
                    ],
                    [
                      87,
                      30
                    ],
                    [
                      87,
                      52
                    ],
                    [
                      14,
                      52
                    ]
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    41
                  ],
                  "text": "≈ 长方形",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    66
                  ],
                  "text": "128 瓣：几乎长方形",
                  "size": 13,
                  "color": "target"
                }
              ]
            }
          ],
          "morph": {
            "kind": "discrete-steps",
            "durationMs": 750,
            "steps": [
              8,
              16,
              32,
              64,
              128
            ],
            "generator": "petal-strip",
            "genParams": {
              "cx": 50,
              "cy": 41,
              "R": 38
            }
          },
          "controls": {
            "play": true,
            "scrub": true,
            "step": true,
            "replay": true
          }
        },
        "engine": {
          "primitive": "MorphToggle",
          "version": "2026.10.16.A",
          "params": {
            "kind": "discrete-steps"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "三步：分割（切成瓣）→近似（拼成长方形）→极限（瓣越多越像）——这就是“极限”思想。",
        "“极限”是说：瓣数一直加下去，拼出来的图形和长方形之间的差别可以小到忽略不计。",
        "预告 H6：代数第十二章算“曲边梯形面积”时，会把这三步变成真正的计算——几何先让你“看到”，代数再让你“算到”。",
        "记住一句话：先在图形上看到极限，再在代数里算出极限。"
      ],
      "examples": [
        {
          "text": "H6 互链：代数 ch12 曲边梯形面积",
          "figure": "互链"
        }
      ],
      "prev": "g11-u1-l5-p2",
      "next": "g11-u1-l5-p4"
    },
    {
      "id": "g11-u1-l5-p4",
      "title": "算一算圆的面积",
      "concept": "圆面积计算",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = \\pi \\times 3^2 = 9\\pi",
          "translation": "半径 3 的圆，面积是 9π"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "例题：半径 3cm 的圆——面积 = π×3² = 9π ≈ 28.26cm²。",
              "shapes": [
                {
                  "t": "circle",
                  "c": [
                    50,
                    50
                  ],
                  "r": 25,
                  "color": "known",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    50,
                    50
                  ],
                  "b": [
                    75,
                    50
                  ],
                  "color": "target",
                  "width": 2.5
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "label": "O",
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    63,
                    42
                  ],
                  "text": "r=3",
                  "size": 13,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    85
                  ],
                  "text": "S = π×9 = 9π",
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
        "例题：半径 3cm 的圆，面积 = π×3² = 9π ≈ 28.26cm²。",
        "π 取 3.14 是近似——题目没说时，保留 π 更精确。",
        "下一课：只取圆的“一块”——弧长和扇形面积。"
      ],
      "examples": [
        {
          "text": "井盖：半径 30cm，面积≈2826cm²",
          "figure": "实物"
        }
      ],
      "prev": "g11-u1-l5-p3",
      "next": "g11-u1-l6-p1"
    }
  ]
};
