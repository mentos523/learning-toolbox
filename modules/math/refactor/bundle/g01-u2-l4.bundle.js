window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["g01-u2-l4"] = {
  "lessonId": "g01-u2-l4",
  "lessonTitle": "本章小结与习题",
  "chapterId": "g01",
  "pages": [
    {
      "id": "g01-u2-l4-p1",
      "title": "本章小结：三步走",
      "concept": "本章知识小结",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{点线面} \\to \\text{三种线} \\to \\text{角}",
          "translation": "先学语言，再学三种线，最后学角"
        }
      ],
      "interaction": {
        "type": "step-play",
        "params": {
          "steps": [
            {
              "caption": "定格：本章的三步——语言、三种线、角。",
              "shapes": [
                {
                  "t": "txt",
                  "p": [
                    50,
                    78
                  ],
                  "text": "点、线、面（几何的语言）",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    66
                  ],
                  "text": "↓",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    56
                  ],
                  "text": "直线、射线、线段（三种线）",
                  "size": 14.48,
                  "bold": true
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    44
                  ],
                  "text": "↓",
                  "size": 14.48
                },
                {
                  "t": "txt",
                  "p": [
                    50,
                    34
                  ],
                  "text": "角：定义 → 度量 → 余角补角",
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
        "本章走了三步：点线面（语言）→三种线（直线/射线/线段）→角（定义/度量/余补）。",
        "三个“最”：两点确定一条直线（最直）；角的大小看张开（最像）；同角的余（补）角相等（最巧）。",
        "表示法口诀：点大写、直线小写或两点、射线端点先、角顶点中。",
        "下一章：两条直线相交——对顶角、垂线，角开始“打架”了。"
      ],
      "examples": [],
      "prev": "g01-u2-l3-p4",
      "next": "g01-u2-l4-p2"
    },
    {
      "id": "g01-u2-l4-p2",
      "title": "本章小测：分类大挑战",
      "concept": "本章习题",
      "formulas": [
        {
          "id": "f1",
          "latex": "\\text{线段：2 个端点；射线：1 个端点；直线：0 个端点}",
          "translation": "按端点数分类，是本章最要紧的本事"
        }
      ],
      "interaction": {
        "type": "tap-highlight",
        "params": {
          "groups": [
            {
              "name": "线段",
              "color": "corrA"
            },
            {
              "name": "射线",
              "color": "corrB"
            },
            {
              "name": "直线",
              "color": "corrC"
            }
          ],
          "items": [
            {
              "id": "e1",
              "label": "排队",
              "group": 0,
              "anchor": [
                25,
                74
              ],
              "shape": {
                "t": "seg",
                "a": [
                  15,
                  70
                ],
                "b": [
                  35,
                  70
                ],
                "color": "line",
                "width": 4
              }
            },
            {
              "id": "e2",
              "label": "金箍棒",
              "group": 0,
              "anchor": [
                72,
                74
              ],
              "shape": {
                "t": "seg",
                "a": [
                  60,
                  70
                ],
                "b": [
                  84,
                  70
                ],
                "color": "line",
                "width": 4
              }
            },
            {
              "id": "e3",
              "label": "手电筒光",
              "group": 1,
              "anchor": [
                25,
                46
              ],
              "shape": {
                "t": "ray",
                "p": [
                  13,
                  44
                ],
                "ang": 0,
                "len": 24,
                "color": "line",
                "width": 3.5
              }
            },
            {
              "id": "e4",
              "label": "x>3",
              "group": 1,
              "anchor": [
                72,
                46
              ],
              "shape": {
                "t": "ray",
                "p": [
                  60,
                  44
                ],
                "ang": 0,
                "len": 24,
                "color": "line",
                "width": 3.5
              }
            },
            {
              "id": "e5",
              "label": "公路",
              "group": 2,
              "anchor": [
                25,
                20
              ],
              "shape": {
                "t": "seg",
                "a": [
                  12,
                  18
                ],
                "b": [
                  38,
                  18
                ],
                "color": "line",
                "width": 3.5
              }
            },
            {
              "id": "e6",
              "label": "琴弦",
              "group": 0,
              "anchor": [
                72,
                20
              ],
              "shape": {
                "t": "seg",
                "a": [
                  58,
                  18
                ],
                "b": [
                  86,
                  18
                ],
                "color": "line",
                "width": 3.5
              }
            }
          ]
        }
      },
      "auxInteraction": null,
      "hints": [
        "点一点：把 6 样东西送进线段/射线/直线的篮子。",
        "1．三种线各有几个端点？",
        "2．射线 OA 和射线 AO 是同一条吗？",
        "3．∠1+∠2=90°，∠1=35°，求∠2。",
        "4．37.5°=？°？′；AB=10，M 为中点，AM=？"
      ],
      "examples": [
        {
          "figure": "核对答案",
          "text": "篮子：线段—排队/金箍棒/琴弦；射线—手电筒光/x>3；直线—公路。1．直线 0 个、射线 1 个、线段 2 个；2．不是；3．55°，互余；4．37°30′；AM=5。"
        },
        {
          "figure": "错因解析",
          "text": "认图：排队/金箍棒/琴弦两头封口是线段；手电筒光/x>3 一头射出去是射线；公路两头无限是直线。1．直线 0 个端点、射线 1 个、线段 2 个。2．射线看端点和方向：OA 端点是 O，AO 端点是 A——不是同一条。3．互余：∠2=90°−35°=55°。4．0.5°=30′：37.5°=37°30′；中点平分：AM=10/2=5。"
        }
      ],
      "prev": "g01-u2-l4-p1",
      "next": null
    }
  ]
};
