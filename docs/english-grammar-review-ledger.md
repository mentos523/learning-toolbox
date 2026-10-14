# 英语语法例句三审台账机制（D3）

> **英语专家队** · 2026-10-14
> 依据：`docs/english-design-review.md`（D3 默认值：生产队撰写 → 英语专家队初审 → 红队终审 → 入库）
> 本机制是语法板块生产的开工条件之一：**内容生产阶段撰写的每条例句必须先入库台账、走完三审，方可进入课程页面**。

## 一、三审流程

```
生产队撰写 ──▶ 英语专家队初审 ──▶ 红队终审 ──▶ 通过入库
   (drafted)      (in_first)         (in_final)      (final_passed)
       │               │                  │
       │          不通过│             不通过│
       ▼               ▼                  ▼
                  打回重写（rejected）──▶ 修订后重新走完整流程
```

1. **撰写**：生产队按 `docs/english-grammar-curriculum.md` 各课"典型例句方向"撰写成品例句，登记入台账，状态 `drafted`。例句规范见 `docs/english-grammar-pedagogy.md` §2.1（词汇限初中考纲词、超纲词加注中文、英文常规字/中文小字灰字、标注语域）。
2. **英语专家队初审**（状态 `in_first` → `first_passed` / `rejected`）：只查英语正确性。
3. **红队终审**（状态 `in_final` → `final_passed` / `rejected`）：只查自然度与语域。铁律：改英语部分红队必须回来。
4. **通过入库**：状态 `final_passed` 的例句方可写入课程数据文件（`modules/english/data/grNN.js`）。

## 二、每审通过标准

### 英语专家队初审（规则正确性）

| # | 检查项 | 依据（语法审计清单） |
|---|---|---|
| 1 | 规则表述准确，适用条件完整（配"身份证"） | 清单第 6、11 条 |
| 2 | 术语与《英语语法术语清单（冻结版）》一致，别名不反向 | 清单第 10 条 |
| 3 | 中文释义准确、适合初中生；人话版不偷换概念 | 清单第 2 条 |
| 4 | 无中式英语放行；例句中每个词的词性可判定 | 清单第 3、9 条 |
| 5 | 考点表述（如涉考点）与《考点清单（冻结版）》口径一致 | 清单第 13 条 |
| 6 | 凡涉词源/注音处符合清单第 1、5 条 | 清单第 1、5 条 |

### 红队终审（自然度与语域）

| # | 检查项 | 依据（语法审计清单） |
|---|---|---|
| 1 | 通过"母语者替换测试"：能想象英语母语者在真实场景说这句话 | 清单第 7 条 |
| 2 | 语域标注正确（口语/书面/美式/英式）；不为凑语法点编造怪句 | 清单第 7 条 |
| 3 | 拼写口径：美式，首现附英式异体；直接引文保留原拼写并注明 | 清单第 8 条 |
| 4 | 中式英语误区栏（如有）未放行，地道句自然、一句话为什么准确 | 清单第 9 条 |

### 打回规则

- **两审中任一审不通过 → 直接打回重写**（状态 `rejected`），初审/终审人须在台账中写明打回原因（引用审计清单条目编号）。
- 打回重写后**保留原例句 id**，`revision` 字段 +1，状态回到 `drafted`，重新走完整流程（不许跳过初审直送终审）。
- 同一例句累计打回 3 次，升级为"僵局"：由英语专家队与红队共同裁定例句方向是否需要修订（走 curriculum 变更记录）。

## 三、例句 id 规则

格式：`gr{NN}.{U}.{L}-e{n}`

- `gr{NN}`：章号，两位（gr00–gr19），与 `docs/english-grammar-curriculum.md` 一致；
- `{U}`：章内单元序号（从 1 起）；
- `{L}`：单元内课序号（从 1 起）；
- `-e{n}`：该课例句序号（从 1 起）。

示例：`gr05.1.1-e1` = 第五章第 1 单元第 1 课（一般现在时：三单现）的第 1 条例句。

- **全书唯一**：id 一旦分配终身有效，禁止复用、禁止跨课挪用；
- 反例例句同样编号（`rule` 字段注明"反例"，页面渲染时配 ✗ 标记）；
- 与课程数据文件的例句引用一律用此 id 对应，便于审计追溯。

## 四、状态定义

| 状态 | 中文 | 含义 |
|---|---|---|
| `drafted` | 已撰写 | 生产队已登记，待提交初审 |
| `in_first` | 初审中 | 英语专家队正在初审 |
| `first_passed` | 初审通过 | 待送红队终审 |
| `in_final` | 终审中 | 红队正在终审 |
| `final_passed` | 终审通过·已入库 | 可写入课程数据文件 |
| `rejected` | 打回 | 待重写（须写明打回原因） |

状态机：`drafted` → `in_first` →（`first_passed` → `in_final` → `final_passed`）或（任一审 → `rejected` → `drafted`，revision+1）。

## 五、台账字段

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `id` | string | ✅ | 例句 id（`gr{NN}.{U}.{L}-e{n}`，全书唯一） |
| `lesson` | string | ✅ | 课号（如 `gr05.1.1`），须与所在台账文件章号一致 |
| `en` | string | ✅ | 英文例句（美式拼写） |
| `zh` | string | ✅ | 中文释义（适合初中生） |
| `register` | string | ✅ | 语域标签：`spoken`（口语）/ `written`（书面）/ `neutral`（通用）；美式/英式差异在 `note` 注明 |
| `rule` | string | ✅ | 所属规则（如"三单现 -s"、"主将从现"）+ 例句性质（`example` 正例 / `counter` 反例） |
| `vocab` | string | ✅ | 词汇难度：`in-scope`（初中考纲内）/ `glossed:词=中文`（超纲词已加注，格式如 `glossed:permit=允许`） |
| `written_at` | string | ✅ | 撰写时间（`YYYY-MM-DD`） |
| `written_by` | string | ✅ | 撰写人（生产队署名） |
| `first` | object/null | — | 初审：`{by, at, verdict: "pass"/"reject", note}` |
| `final` | object/null | — | 终审：`{by, at, verdict: "pass"/"reject", note}` |
| `status` | string | ✅ | 六种状态之一（见第四节） |
| `revision` | number | ✅ | 修订版本号（从 1 起；打回重写 +1） |

台账文件示例（`modules/english/data/_review/ledger-gr05.json`，示意）：

```json
{
  "schema": "grammar-review-ledger/1.0",
  "chapter": "gr05",
  "entries": [
    {
      "id": "gr05.1.1-e1",
      "lesson": "gr05.1.1",
      "en": "She likes apples.",
      "zh": "她喜欢苹果。",
      "register": "neutral",
      "rule": "三单现 -s（正例 example）",
      "vocab": "in-scope",
      "written_at": "2026-10-15",
      "written_by": "生产队",
      "first": {"by": "英语专家队", "at": "2026-10-15", "verdict": "pass", "note": "规则/条件/术语无误"},
      "final": {"by": "红队", "at": "2026-10-16", "verdict": "pass", "note": "自然，语域通用"},
      "status": "final_passed",
      "revision": 1
    }
  ]
}
```

## 六、门禁脚本

`tools/check-grammar-review.mjs`：扫描 `modules/english/data/_review/ledger-grNN.json` 全部台账文件，校验：

1. 文件可解析、schema 版本一致、章号与文件名一致；
2. 例句 id 格式合法、全书唯一；`lesson` 章号前缀与文件一致；
3. `status` 为六种合法值之一；必填字段齐全；
4. 输出三审状态统计：总数 / 已终审（final_passed）/ 待初审（drafted+in_first）/ 待终审（first_passed+in_final）/ 打回（rejected）；
5. **未终审例句数非零 → 列出清单并以非零退出码失败**（上线门禁：课程页面不得引用未终审例句）；空台账（0 条目）视为通过。

用法：`node tools/check-grammar-review.mjs`（仓库根目录执行）。

## 七、数据目录

`modules/english/data/_review/`：一章一文件，共 20 个（`ledger-gr00.json` … `ledger-gr19.json`）。开工时条目为空（`entries: []`），随生产逐条登记。文件头含 `schema` 与 `chapter` 元信息，供门禁脚本校验。
