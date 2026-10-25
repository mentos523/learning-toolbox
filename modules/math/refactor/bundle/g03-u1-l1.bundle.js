window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g03-u1-l1"] = {
  "lessonId": "g03-u1-l1",
  "lessonTitle": "三角形的定义与三边关系",
  "chapterId": "g03",
  "pages": [
    {
      "id": "g03-u1-l1-p1",
      "title": "三根小棒：拼得成，拼不成",
      "concept": "围成三角形的条件",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三条线段首尾相连}",
          "translation": "三条线段首尾相连，才能围成三角形"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "两根太短",
              "caption": "两根小棒太短，顶端怎么也碰不到一起——围不成三角形。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    15,
                    35
                  ],
                  "b": [
                    85,
                    35
                  ],
                  "color": "line",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    15,
                    35
                  ],
                  "b": [
                    34,
                    62
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    85,
                    35
                  ],
                  "b": [
                    68,
                    62
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    52
                  ],
                  "text": "够不着！",
                  "size": 15,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    76
                  ],
                  "text": "太短的两根碰不到一起",
                  "size": 13
                }
              ]
            },
            {
              "label": "换一根长的",
              "caption": "换一根长点的：三根小棒首尾相连，严丝合缝拼成了三角形。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      15,
                      35
                    ],
                    [
                      85,
                      35
                    ],
                    [
                      50,
                      72
                    ]
                  ],
                  "color": "known",
                  "width": 4
                },
                {
                  "t": "pt",
                  "p": [
                    15,
                    35
                  ],
                  "r": 3,
                  "color": "line"
                },
                {
                  "t": "pt",
                  "p": [
                    85,
                    35
                  ],
                  "r": 3,
                  "color": "line"
                },
                {
                  "t": "pt",
                  "p": [
                    50,
                    72
                  ],
                  "r": 3,
                  "color": "line"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    80
                  ],
                  "text": "首尾相连，围成了！",
                  "size": 13,
                  "color": "known"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点“两根太短”：顶端够不着，有豁口——围不成。",
        "点“换一根长的”：三根小棒首尾相连，拼成了三角形。",
        "变的是小棒的长度；不变的是——拼好的那个图形。",
        "这就是今天的主角：三角形。先别急着记术语，动手感觉得到了。"
      ],
      "examples": [
        {
          "text": "钉三角架：两根短木条拼不拢，换长的才行",
          "figure": "实测"
        }
      ],
      "prev": null,
      "next": "g03-u1-l1-p2"
    },
    {
      "id": "g03-u1-l1-p2",
      "title": "什么是三角形：三条线段首尾相连",
      "concept": "三角形的定义与表示",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\triangle ABC",
          "translation": "三角形 ABC：三条线段首尾相连围成的图形"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：三角形 △ABC——顶点 A、B、C，边 a、b、c。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      20,
                      32
                    ],
                    [
                      80,
                      32
                    ],
                    [
                      50,
                      70
                    ]
                  ],
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    15,
                    24
                  ],
                  "text": "A",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    85,
                    24
                  ],
                  "text": "B",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "C",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    24
                  ],
                  "text": "边 c",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    74,
                    58
                  ],
                  "text": "边 a",
                  "size": 12,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    26,
                    58
                  ],
                  "text": "边 b",
                  "size": 12,
                  "color": "known"
                }
              ]
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "还记得吗？上一页你亲手拼好的那个图形，就叫三角形。",
        "三角形：三条线段首尾相连围成的图形——关键是“围”成的。",
        "表示法：记作 △ABC，读作“三角形 ABC”；三个顶点是大写字母。",
        "生活例：自行车架、衣架——拉一拉，不变形（下章揭晓为什么）。",
        "图形例：顶点 A 的对边记作 a，B 的对边记作 b，C 的对边记作 c。",
        "反例：三根线段没连上、有豁口——没围住，不是三角形。",
        "⚠️ 别搞混：顶点是点，边是线段——边不叫“直线”。",
        "记住一句话：三条线段，首尾相连。"
      ],
      "examples": [
        {
          "text": "衣架、屋顶人字梁：都是三角形",
          "figure": "实物"
        }
      ],
      "prev": "g03-u1-l1-p1",
      "next": "g03-u1-l1-p3"
    },
    {
      "id": "g03-u1-l1-p3",
      "title": "三边关系：两边之和大于第三边",
      "concept": "三角形三边关系",
      "formulas": [
        {
          "id": "f1",
          "latex": "a + b > c",
          "translation": "三角形任意两边之和大于第三边"
        }
      ],
      "interaction": {
        "type": "compare-toggle",
        "params": {
          "views": [
            {
              "label": "能围成",
              "caption": "5cm、6cm、7cm：5+6>7，5+7>6，6+7>5——围得成。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      18,
                      40
                    ],
                    [
                      78,
                      40
                    ],
                    [
                      50,
                      72
                    ]
                  ],
                  "color": "known",
                  "width": 3.5
                },
                {
                  "t": "txt",
                  "p": [
                    48,
                    33
                  ],
                  "text": "7",
                  "size": 13,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    72,
                    60
                  ],
                  "text": "5",
                  "size": 13,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    28,
                    60
                  ],
                  "text": "6",
                  "size": 13,
                  "color": "known"
                }
              ]
            },
            {
              "label": "围不成",
              "caption": "3cm、4cm、8cm：3+4=7<8——两根加起来还没第三根长，围不成。",
              "shapes": [
                {
                  "t": "seg",
                  "a": [
                    12,
                    40
                  ],
                  "b": [
                    88,
                    40
                  ],
                  "color": "line",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    12,
                    40
                  ],
                  "b": [
                    30,
                    62
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "seg",
                  "a": [
                    88,
                    40
                  ],
                  "b": [
                    62,
                    62
                  ],
                  "color": "target",
                  "width": 4
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    55
                  ],
                  "text": "够不着！",
                  "size": 14.48,
                  "bold": true,
                  "color": "target"
                },
                {
                  "t": "txt",
                  "p": [
                    30,
                    72
                  ],
                  "text": "3+4=7 < 8",
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
        "还记得小狗抄近道吗？走直线比走折线近——这就是“两点之间线段最短”。",
        "从 B 到 C：直接走边 a，和绕道 A 走（b+c），哪个短？a < b+c。",
        "三边关系：任意两边之和大于第三边——三组都要成立。",
        "反例：3cm、4cm、8cm——3+4=7<8，试一试就知道围不成。",
        "⚠️ 易错：“大于”不能改成“大于等于”——相等时三点共线，压成一条线段了。",
        "记住一句话：两边之和，必须大于第三边。"
      ],
      "examples": [
        {
          "text": "木工做三角架：两根短木条必须“够得着”第三根",
          "figure": "实物"
        }
      ],
      "prev": "g03-u1-l1-p2",
      "next": "g03-u1-l2-p1"
    }
  ]
};
