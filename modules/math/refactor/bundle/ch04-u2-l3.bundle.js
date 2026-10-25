window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch04-u2-l3"] = {
  "lessonId": "ch04-u2-l3",
  "lessonTitle": "二次方程的应用",
  "chapterId": "ch04",
  "pages": [
    {
      "id": "ch04-u2-l3-p1",
      "title": "面积问题：方程从哪儿来",
      "concept": "列二次方程解应用题",
      "formulas": [
        {
          "id": "f1",
          "latex": "x(x+2) = 24",
          "translation": "x 乘 x 加 2 等于 24：宽为 x，长为 x+2，面积 24"
        },
        {
          "id": "f2",
          "latex": "x = 4",
          "translation": "x 等于 4：宽 4 米（负根舍去，边长为正）"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "x*(x+2)",
          "target": 24,
          "targetLabel": "面积 = 24",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": 2,
            "c": 0
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": 2,
            "c": 0
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "长方形长比宽多 2 米，面积 24 平方米：设宽 x 米，列方程 x(x+2)=24。",
        "解得 x=4 或 x=−6；边长不能为负，舍去 −6——实际问题要检验解的合理性。"
      ],
      "examples": [
        {
          "text": "面积问题：长比宽多 2 米，面积 24 平方米",
          "figure": "滑块"
        }
      ],
      "prev": "ch04-u2-l2-p1b",
      "next": "ch04-u2-l3-p1b"
    },
    {
      "id": "ch04-u2-l3-p1b",
      "title": "应用题：设列解验四步",
      "concept": "讲解：列二次方程解应用题",
      "formulas": [
        {
          "id": "f1",
          "latex": "x(x + 3) = 40",
          "translation": "设宽 x 米，长 (x+3) 米：面积 40 平方米"
        },
        {
          "id": "f2",
          "latex": "x^2 + 3x - 40 = 0",
          "translation": "展开移项：(x+8)(x−5)=0"
        },
        {
          "id": "f3",
          "latex": "x = 5",
          "translation": "x=5 或 x=−8；边长为正，舍去 −8：宽 5 米，长 8 米"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": 1,
          "max": 10,
          "step": 1,
          "label": "x",
          "expr": "x*(x + 3)",
          "target": 40,
          "targetLabel": "面积 = 40",
          "unit": "平方米",
          "graph": {
            "kind": "parabola",
            "a": 1,
            "b": 3,
            "c": 0
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "parabola",
            "a": 1,
            "b": 3,
            "c": 0
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "列二次方程四步：设、列、解、验——验两件事：方程对不对、解合不合理。",
        "负根常常要舍去：边长、时间、人数不能是负的。"
      ],
      "examples": [
        {
          "figure": "生活实例",
          "text": "两数和 10、积 21：设一数为 x，x(10−x)=21，x=3 或 7。"
        }
      ],
      "prev": "ch04-u2-l3-p1",
      "next": "ch04-u2-l4-p1"
    }
  ]
};
