# 数学 · 代数 10 种交互类型示例参数表（黄队）

> 每种交互 1 个示例，取材自导论或第一章（一元一次方程）。
> 供后续课程作者照抄格式。参数 schema 见 `docs/math-interaction-params.md`。

---

## 1. slider-lab（滑块实验）——导论 P1

```js
{
  type: "slider-lab",
  params: {
    min: 0, max: 20, step: 1,
    label: "x",
    expr: "x + 5",
    target: 12,
    targetLabel: "目标 12"
  }
}
```

## 2. balance-drag（拖拽天平）——导论 P2

```js
{
  type: "balance-drag",
  params: {
    left: [
      { kind: "unknown", id: "x", label: "x" },
      { kind: "weight", value: 3 }
    ],
    right: [{ kind: "weight", value: 8 }],
    goal: "把 x 单独留在左边",
    rule: "两边同时拿走同样多，天平依然平衡"
  }
}
```

## 3. linked-dashboard（联动仪表盘）——第一章：方程的解是"对上号"

```js
{
  type: "linked-dashboard",
  params: {
    source: { label: "x", min: 0, max: 10, step: 0.5, initial: 0 },
    views: [
      { kind: "readout", expr: "2*x + 1", label: "左" },
      { kind: "readout", expr: "11", label: "右" }
    ]
  }
}
// 玩法：拖 x，看"左"何时追上"右"——解方程就是找"对上号"的那个 x
```

## 4. plot-points（描点成像）——第一章：解的"位置感"

```js
{
  type: "plot-points",
  params: {
    fn: "2*x - 6",
    xMin: 0, xMax: 6, step: 0.5,
    autoPlay: true, speed: 600
  }
}
// 看直线穿过横轴的那个点：y=0 处，x=3——这就是 2x-6=0 的解
```

## 5. zoomer（放大镜）——第一章：解的"精确感"

```js
{
  type: "zoomer",
  params: {
    fn: "3*x - 7",
    center: 2.33,
    levels: 4,
    window: 2,
    caption: "越放大，交点位置看得越准"
  }
}
// 7/3 除不尽？放大看交点，解也可以是"位置"而不只是算式
```

## 6. numeric-lab（数值实验台）——第一章：试解的"笨办法"

```js
{
  type: "numeric-lab",
  params: {
    mode: "input",
    maxSteps: 20,
    buttonLabel: "试这个数",
    showTrend: true
  }
}
// 输入猜的 x，看 2x+1 离 11 是近了还是远了——"试"是解方程的起点
```

## 7. subdivision（细分动画）——第一章：天平的"刻度"

```js
{
  type: "subdivision",
  params: {
    fn: "1",
    a: 0, b: 8,
    steps: [2, 4, 8],
    showError: false
  }
}
// 把 8 等分成 8 份，每份是 1——"8 个 1g 砝码"就是这么来的
```

## 8. placeholder-morph（占位符 morph）——导论衔接：□→△→x

```js
{
  type: "placeholder-morph",
  params: {
    stages: ["□", "△", "x"],
    expr: "□ + 5 = 12",
    autoPlay: true,
    interval: 1200
  }
}
// "换件衣服"：□ 是小时候的写法，x 是长大后的名字，意思没变
```

## 9. side-compare（对比并排）——第一章：算术 vs 代数

```js
{
  type: "side-compare",
  params: {
    left: {
      kind: "slider-lab",
      params: { min: 0, max: 20, step: 1, label: "n", expr: "12 - 5", target: 7, targetLabel: "倒着算" }
    },
    right: {
      kind: "balance-drag",
      params: {
        left: [{ kind: "unknown", id: "x", label: "x" }, { kind: "weight", value: 5 }],
        right: [{ kind: "weight", value: 12 }],
        goal: "把 x 单独留在左边"
      }
    },
    labels: ["算术：倒着算", "代数：正着列"]
  }
}
// 同一道题，两种思路：算术倒着想，代数正着列
```

## 10. slow-replay（慢动作回放）——第一章：追及问题

```js
{
  type: "slow-replay",
  params: {
    frames: 60,
    duration: 3000,
    draw: {
      kind: "pursuit",
      params: {}   // 追及参数（前后车速/距离）待渲染器定义
    },
    scrubber: true
  }
}
// 慢放看"追上"的那一刻：两车相遇处，就是方程的解
```
