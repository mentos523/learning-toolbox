window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g00-u1-l2"] = {
  "lessonId": "g00-u1-l2",
  "lessonTitle": "点、线、面、体：维度的直觉",
  "chapterId": "g00",
  "pages": [
    {
      "id": "g00-u1-l2-p1",
      "title": "点动成线，线动成面，面动成体",
      "concept": "维度直觉",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{点} \\to \\text{线} \\to \\text{面} \\to \\text{体}",
          "translation": "点运动成线，线运动成面，面运动成体"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "interval": 1600,
          "autoplay": false,
          "steps": [
            {
              "caption": "第 1 步：一个点——它没有大小，只有位置。",
              "shapes": [
                {
                  "t": "pt",
                  "p": [
                    50,
                    50
                  ],
                  "r": 4,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    64
                  ],
                  "text": "点：只有位置，没有大小",
                  "size": 13
                }
              ]
            },
            {
              "caption": "第 2 步：点动起来，拉出一条线——像流星划过夜空。",
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
                    15,
                    50
                  ],
                  "r": 4,
                  "color": "known"
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    64
                  ],
                  "text": "点动成线",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 3 步：线动起来，扫出一张面——像雨刷扫过车窗。",
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
                      30
                    ],
                    [
                      15,
                      30
                    ]
                  ],
                  "color": "corrA",
                  "width": 2,
                  "fill": "corrA",
                  "opacity": 0.35
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
                  "color": "line",
                  "width": 3
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    64
                  ],
                  "text": "线动成面",
                  "size": 14.48,
                  "bold": true
                }
              ]
            },
            {
              "caption": "第 4 步：面动起来，堆出一个体——像一摞纸摞成一本书。",
              "shapes": [
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      44
                    ],
                    [
                      75,
                      44
                    ],
                    [
                      75,
                      51
                    ],
                    [
                      25,
                      51
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      51
                    ],
                    [
                      75,
                      51
                    ],
                    [
                      75,
                      58
                    ],
                    [
                      25,
                      58
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "poly",
                  "pts": [
                    [
                      25,
                      58
                    ],
                    [
                      75,
                      58
                    ],
                    [
                      75,
                      65
                    ],
                    [
                      25,
                      65
                    ]
                  ],
                  "color": "line",
                  "width": 2
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "面动成体",
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
        "点动成线：夜空的星星连成星座，就是点连成了线。",
        "线动成面：雨刷扫过，车窗上出现一片干净的“面”。",
        "面动成体：一张张纸摞起来，变成一本有厚度的书。",
        "每一步都多一个“能动的方向”——方向数，就是维度。"
      ],
      "examples": [
        {
          "text": "星座连线、雨刷、摞纸：维度就在生活里",
          "figure": "实物"
        }
      ],
      "prev": "g00-u1-l1-p2",
      "next": "g00-u1-l2-p2"
    },
    {
      "id": "g00-u1-l2-p2",
      "title": "拖一拖：变的是大小，不变的是“面”",
      "concept": "二维图形",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{三角形是二维的面}",
          "translation": "三角形是二维图形：永远是一张平平的“面”"
        }
      ],
      "interaction": {
        "type": "vertex-drag",
        "params": {
          "vertices": [
            {
              "x": 20,
              "y": 75,
              "label": "A"
            },
            {
              "x": 80,
              "y": 75,
              "label": "B"
            },
            {
              "x": 55,
              "y": 25,
              "label": "C"
            }
          ],
          "showLengths": true,
          "showAngles": true
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖动蓝色顶点 A、B、C：边长和角度一直在变。",
        "只要三个点不共线，它永远是一张平平的“面”——这就是二维。",
        "故意把三个点拖到同一条线上试试：三角形会被“压扁”成一条线段，面积变成 0——这叫退化情形。",
        "记住：变化的是形状大小；不退化时，不变的是“它是二维的面”。"
      ],
      "examples": [
        {
          "text": "吹气球：气球变大，表面永远是“面”",
          "figure": "实物"
        }
      ],
      "prev": "g00-u1-l2-p1",
      "next": "g00-u1-l3-p1"
    }
  ]
};
