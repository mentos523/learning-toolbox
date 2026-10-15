# 化学关键可计算内容 · 两审台账（附表 E）

> 依据：`docs/production-playbook.md` 附表 E（内容台账门禁）。
> 关键可计算内容（方程式库、计算题答案、K 配表、元素数据表）入库前走
> 「撰写 → 化学专家队初审 → 化学专家队终审」两审；未终审条目不得被课程页面引用。
> 门禁脚本：`tools/check-chemistry-review.mjs`（任一条目非 `final_passed` → 非零退出）。

## 两审流程

1. **撰写**（蓝队/内容生产者）：把条目写入 `ledger-cmNN.json`，
   状态 `drafted`。条目 id 形如 `cm05.1.2-e3`（课号 + 序号）。
2. **化学专家队初审**：逐条核验化学正确性（配平、化合价、有效数字、
   K 值来源、元素数据与人教版教科书常用值一致性等）；
   通过 → `first_passed`，打回 → `rejected`（注明原因，撰写者重写）。
3. **化学专家队终审**：复核初审意见落实 + 跨条目一致性；
   通过 → `final_passed`（方可入库/被课程页面引用）。

## 台账文件

- 文件名：`ledger-cmNN.json`（NN = 章号，如 `ledger-cm05.json`）。
- schema：`chemistry-review-ledger/1.0`。
- 条目字段（必填）：`id` / `lesson` / `kind` / `written_at` / `written_by` /
  `status` / `revision`；可选：`content`（条目内容或引用说明）、`note`（审稿意见）。
- `kind` 枚举：`equation`（方程式库）/ `calc`（计算题答案）/ `ktable`（K 配表）/
  `element`（元素数据表）/ `other`。
- `status` 枚举：`drafted` / `in_first` / `first_passed` / `in_final` /
  `final_passed` / `rejected`。

## 示例

```json
{
  "schema": "chemistry-review-ledger/1.0",
  "chapter": "cm05",
  "entries": [
    {
      "id": "cm05.1.2-e1",
      "lesson": "cm05.1.2",
      "kind": "equation",
      "content": "2H₂ + O₂ ＝点燃＝ 2H₂O（系数 [2,1,2]，最小整数比）",
      "written_at": "2026-10-15",
      "written_by": "蓝队",
      "status": "final_passed",
      "revision": 2,
      "note": "初审：配平正确；终审：与课程页 cm05.1.2-p2 一致"
    }
  ]
}
```

## 门禁

- 上线前执行：`node tools/check-chemistry-review.mjs`（仓库根目录）。
- 空目录 / 空台账视为通过（台账由阶段四两审填充）。
