window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g09-u1-l5"] = {
  "lessonId": "g09-u1-l5",
  "lessonTitle": "相似三角形的性质",
  "chapterId": "g09",
  "pages": [
    {
      "id": "g09-u1-l5-p1",
      "title": "周长跟着边一起变",
      "concept": "周长比=相似比",
      "formulas": [
        {
          "id": "f1",
          "latex": "C_1 : C_2 = 9 : 18 = 1 : 2",
          "translation": "两个三角形的周长比是 9 比 18，等于相似比 1 比 2"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1800,
          "steps": [
            {
              "caption": "第 1 步：三边 2、3、4，周长 9。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      62
                    ],
                    [
                      48,
                      62
                    ],
                    [
                      36,
                      36
                    ]
                  ],
                  "color": "corrA",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    34,
                    70
                  ],
                  "text": "2",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    26,
                    50
                  ],
                  "text": "3",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    43,
                    50
                  ],
                  "text": "4",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "周长 = 9",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 2 步：相似比 k=2——三边 4、6、8，周长 18 = 9×2。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      64
                    ],
                    [
                      55,
                      64
                    ],
                    [
                      38,
                      28
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    35,
                    72
                  ],
                  "text": "4",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    24,
                    48
                  ],
                  "text": "6",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    47,
                    48
                  ],
                  "text": "8",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    84
                  ],
                  "text": "周长 = 18 = 9 × 2",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                }
              ]
            },
            {
              "caption": "第 3 步：k=3——三边 6、9、12，周长 27 = 9×3。周长比永远等于相似比。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      12,
                      66
                    ],
                    [
                      62,
                      66
                    ],
                    [
                      40,
                      24
                    ]
                  ],
                  "color": "corrB",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    37,
                    74
                  ],
                  "text": "6",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    24,
                    46
                  ],
                  "text": "9",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    52,
                    46
                  ],
                  "text": "12",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    86
                  ],
                  "text": "周长 = 27 = 9 × 3",
                  "size": 14.48,
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
        "边都乘以 2，周长也乘以 2；边乘以 3，周长也乘以 3。",
        "为什么？周长是三条边的和：ka + kb + kc = k(a + b + c)——分配律，代数 0.1.4 玩过。",
        "没变的是：周长比永远等于相似比 k。"
      ],
      "examples": [
        {
          "text": "窗框放大 2 倍，框条总长也是 2 倍",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l4-p5",
      "next": "g09-u1-l5-p2"
    },
    {
      "id": "g09-u1-l5-p2",
      "title": "周长比 = 相似比",
      "concept": "周长比定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "C' = ka + kb + kc = kC",
          "translation": "放大后三角形的周长等于 k 倍的原周长"
        },
        {
          "id": "f2",
          "latex": "\\frac{C_1}{C_2} = k",
          "translation": "周长比等于相似比 k"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：周长是三条边的和——每条边都乘以 k，和也乘以 k。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      60
                    ],
                    [
                      48,
                      60
                    ],
                    [
                      33,
                      32
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      62
                    ],
                    [
                      90,
                      62
                    ],
                    [
                      73,
                      34
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "C₁ : C₂ = k",
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
        "还记得吗？边变成 2 倍，周长 9 变成 18——周长跟着边一起变。",
        "周长比等于相似比：a′=ka、b′=kb、c′=kc，所以 C′=ka+kb+kc=k(a+b+c)=kC。",
        "生活例：按 2 倍放大做窗框，框条总长度也是 2 倍。",
        "图形例：相似比 2:3 的两三角形，周长比也是 2:3。",
        "反例：面积比不是 k——那是下一页的主角，别提前剧透。",
        "⚠️ 别搞混：周长是“一维”的量，跟着边走，所以比就是 k；面积是“二维”的量，下一页见分晓。",
        "记住一句话：周长是一维的量，比就是 k。"
      ],
      "examples": [
        {
          "text": "相似比 2:3，周长比也是 2:3",
          "figure": "图表"
        }
      ],
      "prev": "g09-u1-l5-p1",
      "next": "g09-u1-l5-p3"
    },
    {
      "id": "g09-u1-l5-p3",
      "title": "拖 k，看面积按 k² 跳",
      "concept": "面积比=相似比²（H4 灵魂页）",
      "formulas": [
        {
          "id": "f1",
          "latex": "S_1 : S_2 = 1 : k^2",
          "translation": "面积比等于 1 比 k 的平方"
        },
        {
          "id": "f2",
          "latex": "k = 2 \\Rightarrow S_2 = 4S_1",
          "translation": "相似比为 2 时，大三角形面积是小的 4 倍"
        }
      ],
      "interaction": {
        "type": "ratio-slider",
        "params": {
          "kMin": 0.5,
          "kMax": 3,
          "kStep": 0.25,
          "kInit": 1,
          "lockRatio": true,
          "showAreas": true,
          "badge": "没变的是：形状；面积按 k² 跳",
          "note": "这就是 y=x² 在干的事"
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖动滑块 k：边变成 k 倍，面积变成 k² 倍——看面积读数怎么跳。",
        "k=2 时面积变 4 倍，k=3 时变 9 倍——不是 2 倍、3 倍！",
        "旁边小字：这就是 y=x² 在干的事（代数 ch07 7.1 见过）。"
      ],
      "examples": [
        {
          "text": "照片边长×2，面积×4",
          "figure": "交互"
        }
      ],
      "prev": "g09-u1-l5-p2",
      "next": "g09-u1-l5-p4"
    },
    {
      "id": "g09-u1-l5-p4",
      "title": "面积比 = 相似比的平方",
      "concept": "面积比定理",
      "formulas": [
        {
          "id": "f1",
          "latex": "S = \\frac{1}{2}ah",
          "translation": "三角形面积等于底乘高除以 2"
        },
        {
          "id": "f2",
          "latex": "S' = \\frac{1}{2}(ka)(kh) = k^2S",
          "translation": "放大后面积等于 k 的平方乘原面积"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：底变成 k 倍，高也变成 k 倍——面积变成 k² 倍。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      12,
                      55
                    ],
                    [
                      42,
                      55
                    ],
                    [
                      27,
                      30
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    27,
                    55
                  ],
                  "b": [
                    27,
                    30
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    27,
                    66
                  ],
                  "text": "a",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    34,
                    44
                  ],
                  "text": "h",
                  "size": 12
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      55,
                      58
                    ],
                    [
                      90,
                      58
                    ],
                    [
                      72,
                      28
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5
                },
                {
                  "t": "seg",
                  "a": [
                    72,
                    58
                  ],
                  "b": [
                    72,
                    28
                  ],
                  "color": "aux",
                  "width": 2,
                  "dash": "5,4"
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    68
                  ],
                  "text": "ka",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    79,
                    44
                  ],
                  "text": "kh",
                  "size": 12
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    82
                  ],
                  "text": "S₁ : S₂ = 1 : k²",
                  "size": 14.48,
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
        "还记得吗？你拖滑块时 k=2 面积变 4 倍、k=3 变 9 倍——现在看它为什么。",
        "底 a 变成 ka，对应高之比也等于相似比，高 h 变成 kh——面积 S′=½·ka·kh=k²·½ah=k²S。",
        "生活例：照片从 1 寸放大到 6 寸，边长变 4 倍，相纸面积变 16 倍。",
        "图形例：相似比 1:2 的两三角形，面积比 1:4。",
        "反例：把面积比说成 k——“周长比是 k，面积比是 k²，别串”。",
        "⚠️ 别搞混：周长比=k（一维），面积比=k²（二维）——维度决定指数。",
        "记住一句话：边变 k 倍，面积变 k² 倍。"
      ],
      "examples": [
        {
          "text": "1 寸→6 寸：边×4，面积×16",
          "figure": "实物"
        }
      ],
      "prev": "g09-u1-l5-p3",
      "next": "g09-u1-l5-p5"
    },
    {
      "id": "g09-u1-l5-p5",
      "title": "H4：这就是 y=x² 在干的事",
      "concept": "面积比与二次函数的呼应",
      "formulas": [
        {
          "id": "f1",
          "latex": "y = x^2",
          "translation": "y 等于 x 的平方"
        },
        {
          "id": "f2",
          "latex": "\\text{边} \\to k\\text{倍} \\Rightarrow \\text{面积} \\to k^2\\text{倍}",
          "translation": "边变成 k 倍，面积变成 k 的平方倍"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "关键帧：同一个“平方关系”——代数里叫 y=x²，几何里叫面积比=k²。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      60
                    ],
                    [
                      45,
                      60
                    ],
                    [
                      30,
                      32
                    ]
                  ],
                  "color": "corrA",
                  "width": 2.5
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      58,
                      62
                    ],
                    [
                      90,
                      62
                    ],
                    [
                      74,
                      34
                    ]
                  ],
                  "color": "corrB",
                  "width": 2.5
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "边 ×k → 面积 ×k²",
                  "size": 14.48,
                  "bold": true,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    90
                  ],
                  "text": "x ×k → y ×k²（y=x²）",
                  "size": 13,
                  "color": "target"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "代数第 7 章 7.1：y=x²——输入 x 变 2 倍，输出 y 变 4 倍。",
        "几何这里：边变 k 倍，面积变 k² 倍——同一个“平方关系”，两种语言。",
        "二次关系有了“长相”：边长一拉，面积按平方跳——这就是数形结合。",
        "数的部分回代数 7.1 复习；形的部分就是本课——两页互相印证。"
      ],
      "examples": [
        {
          "text": "代数 ch07 7.1 二次函数 y=x²",
          "figure": "互链"
        }
      ],
      "prev": "g09-u1-l5-p4",
      "next": "g09-u1-l6-p1"
    }
  ]
};
