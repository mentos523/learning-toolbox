window.MATH_BUNDLES = window.MATH_BUNDLES || {};
window.MATH_BUNDLES["ch11-u3-l2"] = {
  "lessonId": "ch11-u3-l2",
  "lessonTitle": "极值",
  "chapterId": "ch11",
  "pages": [
    {
      "id": "ch11-u3-l2-p1",
      "title": "山峰山谷：导数为 0 处",
      "concept": "极值",
      "formulas": [
        {
          "id": "f1",
          "latex": "f'(x_0) = 0",
          "translation": "驻点：导数为 0 的点——曲线在那儿'脚下是平的'（切线水平）"
        },
        {
          "id": "f2",
          "latex": "x = -1 \\text{极大}, x = 1 \\text{极小}",
          "translation": "y=x³−3x：x=−1 取极大值 2（山峰），x=1 取极小值 −2（山谷）"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -2,
          "max": 2,
          "step": 0.25,
          "label": "x",
          "expr": "3*x^2-3",
          "target": 0,
          "targetLabel": "找 f'(x)=0 的点（有两个）",
          "graph": {
            "kind": "zero"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "zero"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "拖到'咔哒'处：x=−1 和 x=1 两处导数都是 0。",
        "光 f'=0 不够：还要看左右'换没换方向'——换了才是极值点。"
      ],
      "examples": [
        {
          "text": "爬到山顶时脚下是平的：极值点处切线水平",
          "figure": "滑块实验"
        }
      ],
      "prev": "ch11-u3-l1-p1b",
      "next": "ch11-u3-l2-p1b"
    },
    {
      "id": "ch11-u3-l2-p1b",
      "title": "极值：驻点再看换向",
      "concept": "讲解：极值",
      "formulas": [
        {
          "id": "f1",
          "latex": "f(x) = x^3 - 3x^2",
          "translation": "f'(x)=3x²−6x=3x(x−2)"
        },
        {
          "id": "f2",
          "latex": "x = 0, x = 2",
          "translation": "驻点：x=0 和 x=2"
        },
        {
          "id": "f3",
          "latex": "x = 0 \\text{极大}, x = 2 \\text{极小}",
          "translation": "左+右−是极大（x=0），左−右+是极小（x=2)"
        }
      ],
      "interaction": {
        "type": "eq-graph-lab",
        "params": {
          "min": -1,
          "max": 3,
          "step": 0.25,
          "label": "x",
          "expr": "3*x^2-6*x",
          "target": 0,
          "targetLabel": "找 f'(x)=0 的点",
          "graph": {
            "kind": "zero"
          }
        },
        "engine": {
          "primitive": "EqGraphLab",
          "version": "2026.10.16.A",
          "params": {
            "kind": "zero"
          }
        }
      },
      "auxInteraction": null,
      "hints": [
        "极值两步：令 f'(x)=0 找驻点；看左右导数变号。",
        "f'=0 只是“候选”：如 y=x³ 在 x=0，f'=0 但不是极值点。"
      ],
      "examples": [
        {
          "figure": "易错提醒",
          "text": "y=x³：f'=3x²，x=0 处 f'=0，但左右都递增，无极值。"
        }
      ],
      "prev": "ch11-u3-l2-p1",
      "next": "ch11-u3-l3-p1"
    }
  ]
};
