# 数学 · 代数 数据 Schema（蓝队冻结版 v1.0）

> 来源：`docs/math-design-review.md` 第二轮蓝队决议（B1/B3/B6/B7）。
> 数据以**页**为原子单位；源数据与派生数据分离；`.js` 而非 `.json`（兼容 `file://`）。

---

## 1. 文件划分（按章拆分）

```
modules/math/data/
  _schema.md        # 本文件：schema 说明（不加载）
  chapters.js       # 章注册表：window.MATH_CHAPTERS（13 章元信息）
  ch00.js           # 第零章：window.MATH_CH.ch00
  ch01.js           # 第一章 ……
  ……
  ch12.js           # 第十二章
  ch00.formulas.js  # 第零章派生：window.MATH_MML（MathML 映射，由构建生成）
  ……
```

- 章文件只存**源数据**（LaTeX 源 + 中文翻译 + 教学文案），不存 MathML。
- 派生文件 `chNN.formulas.js` 由 `tools/render-mathml.mjs` 构建生成，**不手工编辑**。
- 运行时加载顺序：`chapters.js` → 所需 `chNN.js` → 对应 `chNN.formulas.js` → `math.js`。

## 2. 章结构

```js
window.MATH_CH = window.MATH_CH || {};
window.MATH_CH["ch00"] = {
  id: "ch00",                       // 章主键：ch00..ch12
  title: "导论——从算术到代数",      // 章标题
  units: [                           // 单元数组（顺序即展示顺序）
    {
      id: "ch00-u1",
      title: "数的扩展",
      lessons: [                     // 课数组
        {
          id: "ch00-u1-l1",
          title: "自然数与整数",
          pages: [ /* 页对象，见 §3 */ ]
        }
      ]
    }
  ]
};
```

## 3. 页对象（原子单位）

```js
{
  id: "ch00-u1-l1-p1",          // 页主键：全局唯一
  title: "我想了一个数，加上 5 等于 12，它是几？",  // ≤ 20 字，一句话概念
  concept: "未知数",            // 核心概念（本页唯一）
  formulas: [                   // 本页公式（≤ 3 个，必填 translation）
    {
      id: "f1",                 // 页内唯一；全局键 = pageId + "#" + id
      latex: "x + 5 = 12",      // LaTeX 源（构建输入）
      translation: "x 加 5 等于 12"  // 人话翻译（必填，构建校验缺失即阻断）
    }
  ],
  interaction: {                // 主交互（每页 1 个）
    type: "slider-lab",         // 10 种类型之一（见 docs/math-interaction-params.md）
    params: {                   // 类型专属参数（schema 见同上文档）
      min: 0, max: 20, step: 1,
      expr: "x + 5",
      target: 12
    }
  },
  auxInteraction: null,          // 可选辅交互（≤ 1 个），结构同 interaction
  hints: [                      // 点拨区文案（≤ 60 字/条，建议 1–2 条）
    "如果这个数是 10369 呢？一个一个试太慢了。",
    "这就是代数：先把问题写下来，再想办法解它。"
  ],
  examples: [                   // 生动例子（≤ 2 个）
    { text: "猜数字游戏", figure: "滑块" }
  ],
  prev: null,                   // 上一页 id（构建时自动填充，可空）
  next: "ch00-u1-l1-p2"         // 下一页 id（构建时自动填充，可空）
}
```

### 字段约束

| 字段 | 约束 |
|---|---|
| `id` | 全局唯一，`chNN-uM-lK-pJ` 格式 |
| `title` | ≤ 20 字 |
| `formulas` | ≤ 3 个/页；`translation` 必填 |
| `interaction` | 必填，`type` ∈ 10 种，`params` 符合对应 schema |
| `hints` | 每条 ≤ 60 字 |
| `examples` | ≤ 2 个/页 |
| 全页文字 | ≤ 150 字（不含按钮标签） |

## 4. 派生文件格式（构建生成）

```js
// ch00.formulas.js —— 由 tools/render-mathml.mjs 生成，勿手工编辑
window.MATH_MML = window.MATH_MML || {};
window.MATH_MML["ch00-u1-l1-p1#f1"] =
  '<math xmlns="http://www.w3.org/1998/Math/MathML" display="block">…</math>';
```

- 键 = `pageId + "#" + formulaId`。
- 运行时 `math.js` 查表渲染；查不到时降级显示 `translation` 纯文本（不崩）。
- MathML 不支持的浏览器（`MathMLCheck.supported === false`）：同样降级为 `translation`。

## 5. 章注册表（chapters.js）

```js
window.MATH_CHAPTERS = [
  { id: "ch00", title: "导论——从算术到代数", file: "data/ch00.js", status: "planned" },
  // ……
];
```

- `status`: `ready`（可学）/ `planned`（筹备中）。侧边栏据此显示/置灰。
- `file` 为相对路径（`data/chNN.js`），`math.js` 按需动态加载
  （`<script>` 动态插入，`file://` 可用）。

## 6. 校验清单（提交前必跑）

1. `node --check` 全部数据文件语法通过。
2. 页 `id` 全局唯一；`prev/next` 引用存在。
3. `formulas[].translation` 非空（构建脚本阻断缺失）。
4. `interaction.type` ∈ 10 种；`params` 通过对应 schema 校验。
5. LaTeX 源仅使用构建器支持的子集（未知命令构建阻断并报错行号）。
6. 每页文字 ≤ 150 字、公式 ≤ 3、例子 ≤ 2（脚本统计告警）。
