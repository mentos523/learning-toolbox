/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr19：语篇语法与总复习（中考/高考）
 *
 * 数据口径（M5）：window.ENG_CH["gr19"] = { id, title, sentences, units[] }，
 * 与试点 gr05.js 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 本文件含 gr19 全部 6 课 × 4 页 = 24 页：
 *   p1 观察页（例句先行 + 分块标注 + Y1 先猜后验）
 *   p2 交互页（G1 tagging / G3 sentence-builder / G5 clause-slots）
 *   p3 讲解页（examples → idcard → bridge → contrast；spell 有则写）
 *   p4 练习页（Y3 判分：选择 + 填空）
 * 例句登记于 D3 三审台账 modules/english/data/_review/
 * ledger-gr19.json（本阶段状态 drafted，待英语专家队初审与红队终审）。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=生产队撰写（语法生产D队，2026-10-14）。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr19"] = {
  id: "gr19",
  title: "语篇语法与总复习（中考/高考）",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr19.json 逐字一致（本阶段 drafted）。 */
  sentences: {
    "gr19.1.1-e1": { en: "Last Sunday, Tom lost his key.", zh: "上周日，汤姆丢了钥匙。", reg: "通用",
      tagged: [ { w: "Last Sunday", role: "adverb", label: "时间状语" }, { w: "Tom", role: "subject", label: "主语" }, { w: "lost", role: "verb", label: "谓语" }, { w: "his key", role: "object", label: "宾语" } ] },
    "gr19.1.1-e2": { en: "He has not found it yet.", zh: "他到现在还没找到它。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "has not found", role: "verb", label: "谓语" }, { w: "it", role: "object", label: "宾语" }, { w: "yet", role: "adverb", label: "状语" } ] },
    "gr19.1.1-e3": { en: "However, he is not sad.", zh: "不过，他并不难过。", reg: "通用",
      tagged: [ { w: "However", role: "adverb", label: "连接词" }, { w: "he", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "not sad", role: "complem", label: "表语" } ] },
    "gr19.1.1-e4": { en: "He was tired, however he kept working.", zh: "（✗ 错句）他累了，不过他继续工作。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was tired", role: "verb", label: "谓语" }, { w: "however", role: "adverb", label: "连接词（✗ 不能连分句）" }, { w: "he kept working", role: "verb", label: "谓语" } ] },
    "gr19.1.1-e5": { en: "He was tired. However, he kept working.", zh: "他累了。不过，他继续工作。", reg: "通用",
      tagged: [ { w: "He was tired", role: "verb", label: "分句一" }, { w: "However", role: "adverb", label: "连接词" }, { w: "he kept working", role: "verb", label: "分句二" } ] },
    "gr19.1.1-e6": { en: "Last Sunday, Tom loses his key.", zh: "（✗ 错句）上周日，汤姆丢了钥匙。", reg: "通用",
      tagged: [ { w: "Last Sunday", role: "adverb", label: "时间状语" }, { w: "Tom", role: "subject", label: "主语" }, { w: "loses", role: "verb", label: "谓语（✗ 时态）" }, { w: "his key", role: "object", label: "宾语" } ] },
    "gr19.1.2-e1": { en: "She goes to school by bike.", zh: "她骑自行车上学。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "goes", role: "verb", label: "谓语" }, { w: "to school", role: "adverb", label: "状语" }, { w: "by bike", role: "adverb", label: "状语" } ] },
    "gr19.1.2-e2": { en: "There is a book on the desk.", zh: "桌上有一本书。", reg: "通用",
      tagged: [ { w: "There is", role: "verb", label: "there be" }, { w: "a book", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr19.1.2-e3": { en: "Although it rained, we went out.", zh: "虽然下雨了，我们还是出去了。", reg: "通用",
      tagged: [ { w: "Although it rained", role: "adverb", label: "让步状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "went out", role: "verb", label: "谓语" } ] },
    "gr19.1.2-e4": { en: "He go to school every day.", zh: "（✗ 错句）他每天上学。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "go", role: "verb", label: "谓语（✗ 十看：主谓）" }, { w: "to school", role: "adverb", label: "状语" }, { w: "every day", role: "adverb", label: "状语" } ] },
    "gr19.1.2-e5": { en: "He goes to school every day.", zh: "他每天上学。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "goes", role: "verb", label: "谓语" }, { w: "to school", role: "adverb", label: "状语" }, { w: "every day", role: "adverb", label: "状语" } ] },
    "gr19.1.2-e6": { en: "Although it rained, but we went out.", zh: "（✗ 错句）虽然下雨了，但是我们出去了。", reg: "通用",
      tagged: [ { w: "Although it rained", role: "adverb", label: "让步状语从句" }, { w: "but", role: "adverb", label: "连词（✗ 十看：连词）" }, { w: "we", role: "subject", label: "主语" }, { w: "went out", role: "verb", label: "谓语" } ] },
    "gr19.1.2-e8": { en: "There have a book on the desk.", zh: "（✗ 错句）桌上有一本书。", reg: "通用",
      tagged: [ { w: "There have", role: "verb", label: "there be（✗ 十看：句式）" }, { w: "a book", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr19.1.2-e10": { en: "I very much like it.", zh: "（✗ 错句）我非常喜欢它。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "very much", role: "adverb", label: "状语（✗ 十看：语序）" }, { w: "like", role: "verb", label: "谓语" }, { w: "it", role: "object", label: "宾语" } ] },
    "gr19.1.2-e11": { en: "I like it very much.", zh: "我非常喜欢它。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "like", role: "verb", label: "谓语" }, { w: "it", role: "object", label: "宾语" }, { w: "very much", role: "adverb", label: "状语" } ] },
    "gr19.1.3-e1": { en: "I like English.", zh: "我喜欢英语。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "like", role: "verb", label: "谓语" }, { w: "English", role: "object", label: "宾语" } ] },
    "gr19.1.3-e2": { en: "I find English interesting.", zh: "我发现英语很有趣。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "find", role: "verb", label: "谓语" }, { w: "English", role: "object", label: "宾语" }, { w: "interesting", role: "complem", label: "宾补" } ] },
    "gr19.1.3-e3": { en: "English, which I find interesting, is useful.", zh: "英语很有用，我觉得它很有趣。", reg: "书面",
      tagged: [ { w: "English", role: "subject", label: "主语" }, { w: "which I find interesting", role: "attrib", label: "定语从句" }, { w: "is useful", role: "verb", label: "谓语" } ] },
    "gr19.1.3-e4": { en: "I like English, it is very interesting.", zh: "（✗ 错句）我喜欢英语，它很有趣。", reg: "通用",
      tagged: [ { w: "I like English", role: "verb", label: "分句一" }, { w: "it is very interesting", role: "verb", label: "分句二（✗ 逗号粘连）" } ] },
    "gr19.1.3-e5": { en: "I like English, which is very interesting.", zh: "我喜欢英语，它很有趣。", reg: "书面",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "like", role: "verb", label: "谓语" }, { w: "English", role: "object", label: "宾语" }, { w: "which is very interesting", role: "attrib", label: "定语从句" } ] },
    "gr19.1.3-e6": { en: "It is English that I like it.", zh: "（✗ 错句）我喜欢的是英语。", reg: "通用",
      tagged: [ { w: "It is", role: "subject", label: "强调框前半" }, { w: "English", role: "adverb", label: "被强调部分" }, { w: "that I like it", role: "clause", label: "强调框后半（✗ 多 it）" } ] },
    "gr19.1.3-e7": { en: "It is English that I like.", zh: "我喜欢的是英语。", reg: "通用",
      tagged: [ { w: "It is", role: "subject", label: "强调框前半" }, { w: "English", role: "adverb", label: "被强调部分" }, { w: "that I like", role: "clause", label: "强调框后半" } ] },
    "gr19.2.1-e1": { en: "She writes a letter every week.", zh: "她每周写一封信。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "writes", role: "verb", label: "谓语（一般现在时）" }, { w: "a letter", role: "object", label: "宾语" }, { w: "every week", role: "adverb", label: "状语" } ] },
    "gr19.2.1-e2": { en: "She is writing a letter now.", zh: "她正在写信。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is writing", role: "verb", label: "谓语（现在进行时）" }, { w: "a letter", role: "object", label: "宾语" }, { w: "now", role: "adverb", label: "状语" } ] },
    "gr19.2.1-e3": { en: "The letter was written by her.", zh: "这封信是她写的。", reg: "通用",
      tagged: [ { w: "The letter", role: "subject", label: "主语" }, { w: "was written", role: "verb", label: "谓语（被动语态）" }, { w: "by her", role: "adverb", label: "状语" } ] },
    "gr19.2.1-e4": { en: "She is write a letter now.", zh: "（✗ 错句）她正在写信。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is write", role: "verb", label: "谓语（✗ 进行时）" }, { w: "a letter", role: "object", label: "宾语" }, { w: "now", role: "adverb", label: "状语" } ] },
    "gr19.2.1-e6": { en: "The letter was wrote by her.", zh: "（✗ 错句）这封信是她写的。", reg: "通用",
      tagged: [ { w: "The letter", role: "subject", label: "主语" }, { w: "was wrote", role: "verb", label: "谓语（✗ 被动）" }, { w: "by her", role: "adverb", label: "状语" } ] },
    "gr19.2.1-e7": { en: "He has finished his work.", zh: "他已经完成了工作。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "has finished", role: "verb", label: "谓语（现在完成时）" }, { w: "his work", role: "object", label: "宾语" } ] },
    "gr19.2.2-e1": { en: "I know that he is ill.", zh: "我知道他病了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "know", role: "verb", label: "谓语" }, { w: "that he is ill", role: "object", label: "宾语从句" } ] },
    "gr19.2.2-e2": { en: "The book that I bought is interesting.", zh: "我买的那本书很有趣。", reg: "通用",
      tagged: [ { w: "The book", role: "subject", label: "先行词" }, { w: "that I bought", role: "attrib", label: "定语从句" }, { w: "is interesting", role: "verb", label: "谓语" } ] },
    "gr19.2.2-e3": { en: "If it rains, we will stay.", zh: "如果下雨，我们就待着。", reg: "通用",
      tagged: [ { w: "If it rains", role: "adverb", label: "条件状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "will stay", role: "verb", label: "谓语" } ] },
    "gr19.2.2-e4": { en: "The book that I bought it is interesting.", zh: "（✗ 错句）我买的那本书很有趣。", reg: "通用",
      tagged: [ { w: "The book", role: "subject", label: "先行词" }, { w: "that I bought", role: "attrib", label: "定语从句" }, { w: "it", role: "subject", label: "主语（✗ 多余）" }, { w: "is interesting", role: "verb", label: "谓语" } ] },
    "gr19.2.2-e6": { en: "If it will rain, we will stay.", zh: "（✗ 错句）如果下雨，我们就待着。", reg: "通用",
      tagged: [ { w: "If it will rain", role: "adverb", label: "条件状语从句（✗ 主将从现）" }, { w: "we", role: "subject", label: "主语" }, { w: "will stay", role: "verb", label: "谓语" } ] },
    "gr19.2.2-e7": { en: "What he said surprised me.", zh: "他说的话让我吃惊。", reg: "通用",
      tagged: [ { w: "What he said", role: "subject", label: "主语从句" }, { w: "surprised", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] },
    "gr19.2.3-e1": { en: "He go to school every day.", zh: "（✗ 错句·诊断）他每天上学。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "go", role: "verb", label: "谓语（✗）" }, { w: "to school", role: "adverb", label: "状语" }, { w: "every day", role: "adverb", label: "状语" } ] },
    "gr19.2.3-e2": { en: "Although it rained, but we stayed.", zh: "（✗ 错句·诊断）虽然下雨了，但是我们待着了。", reg: "通用",
      tagged: [ { w: "Although it rained", role: "adverb", label: "让步状语从句" }, { w: "but", role: "adverb", label: "连词（✗ 多余）" }, { w: "we", role: "subject", label: "主语" }, { w: "stayed", role: "verb", label: "谓语" } ] },
    "gr19.2.3-e3": { en: "I have a book. It is interesting.", zh: "我有一本书。它很有趣。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "谓语" }, { w: "a book", role: "object", label: "宾语" } ] },
    "gr19.2.3-e4": { en: "He goes to school every day.", zh: "他每天上学。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "goes", role: "verb", label: "谓语" }, { w: "to school", role: "adverb", label: "状语" }, { w: "every day", role: "adverb", label: "状语" } ] },
    "gr19.2.3-e5": { en: "There have a book.", zh: "（✗ 错句·诊断）有一本书。", reg: "通用",
      tagged: [ { w: "There have", role: "verb", label: "there be（✗）" }, { w: "a book", role: "subject", label: "主语" } ] },
    "gr19.2.3-e6": { en: "There is a book.", zh: "有一本书。", reg: "通用",
      tagged: [ { w: "There is", role: "verb", label: "there be" }, { w: "a book", role: "subject", label: "主语" } ] },
    "gr19.2.3-e7": { en: "I like it very much.", zh: "我非常喜欢它。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "like", role: "verb", label: "谓语" }, { w: "it", role: "object", label: "宾语" }, { w: "very much", role: "adverb", label: "状语" } ] }
  },
  units: [
    {
      id: "gr19-u1",
      title: "语篇中的语法",
      lessons: [
        {
          id: "gr19.1.1",
          title: "完形与阅读中的语法线索",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr19.1.1-p1",
              kind: "observe",
              title: "先看三句话：语篇的钉子在哪？",
              sentences: [
                {
                  id: "gr19.1.1-e1",
                  en: "Last Sunday, Tom lost his key.",
                  zh: "上周日，汤姆丢了钥匙。",
                  reg: "通用",
                  tagged: [
                    { w: "Last Sunday", role: "adverb", label: "时间状语" },
                    { w: "Tom", role: "subject", label: "主语" },
                    { w: "lost", role: "verb", label: "谓语" },
                    { w: "his key", role: "object", label: "宾语" }
                  ]
                },
                {
                  id: "gr19.1.1-e2",
                  en: "He has not found it yet.",
                  zh: "他到现在还没找到它。",
                  reg: "通用",
                  tagged: [
                    { w: "He", role: "subject", label: "主语" },
                    { w: "has not found", role: "verb", label: "谓语" },
                    { w: "it", role: "object", label: "宾语" },
                    { w: "yet", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr19.1.1-e3",
                  en: "However, he is not sad.",
                  zh: "不过，他并不难过。",
                  reg: "通用",
                  tagged: [
                    { w: "However", role: "adverb", label: "连接词" },
                    { w: "he", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "not sad", role: "complem", label: "表语" }
                  ]
                }
              ],
              guess: {
                q: "e2 的 it 指谁？e3 的 However 在干什么？",
                options: ["it 指 key；However 表转折", "it 指 Tom；However 表因果", "看不出来"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "语篇三线索：时态一致、代词指代、连接词逻辑。"
            },
            /* ---------- p2 交互页：G1 tagging（线索标注） ---------- */
            {
              id: "gr19.1.1-p2",
              kind: "interact",
              title: "标一标：完形线索",
              exploreTip: "点一个标签，再点一个词块：标出线索——时态、指代、时间状语，完形就靠它们。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "has not found", role: "verb", label: "谓语（时态）" },
                      { w: "it", role: "object", label: "指代" },
                      { w: "yet", role: "adverb", label: "时间状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语（时态）" },
                      { role: "object", label: "指代" },
                      { role: "adverb", label: "时间状语" }
                    ],
                    hint: "He has not found it yet：it 指谁？yet 告诉你什么时态？"
                  }
                }
              ],
              point: "完形三线索：时态看篇章，代词找前文，连接词看逻辑。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr19.1.1-p3",
              kind: "explain",
              title: "完形与阅读中的语法线索",
              lead: "还记得吗？上一页 it 指 key，yet 指向完成时——这就是语篇线索。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr19.1.1-e1", "gr19.1.1-e2", "gr19.1.1-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "完形/阅读语法三线索：上下文时态一致；代词指代链；连接词逻辑。",
                  condition: "时态：e1 过去时 → e2 完成时，时间推进合理。指代：it = his key，代词必须找得到前文。连接词：However 表转折放句首 + 逗号；but 放句中。只看空前后不够，要看篇章；生词先判词性再猜义。"
                },
                {
                  type: "bridge",
                  zh: "汉语做完形也看上下文；英语多看三样：时态、代词、连接词。",
                  en: "英语是“形合”语言：时态、代词、连接词像钉子，把句子钉在一起——完形挖掉词，钉子还在，顺着钉子找答案。",
                  unbridge: "这是英语的规矩：做题先看篇章线索，再看空前后。"
                },
                {
                  type: "contrast",
                  wrong: "He was tired, however he kept working.",
                  wrongZh: "（✗ 错句）",
                  right: "He was tired. However, he kept working.",
                  why: "however 是副词，不能像 but 那样连分句；放句首 + 逗号。"
                },
                {
                  type: "contrast",
                  wrong: "Last Sunday, Tom loses his key.",
                  wrongZh: "（✗ 错句）",
                  right: "Last Sunday, Tom lost his key.",
                  why: "Last Sunday 是过去时间，动词用过去式 lost。"
                }
              ],
              point: "语篇线索：时态看篇章；代词找前文；however/but 位置不同。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr19.1.1-p4",
              kind: "quiz",
              title: "练一练：找线索",
              questions: [
                {
                  type: "choice",
                  stem: "He has not found it yet. 里 it 指？",
                  options: ["his key", "Tom", "Sunday"],
                  answer: 0,
                  tip: "代词指代链：it = 上文的 his key。"
                },
                {
                  type: "choice",
                  stem: "However 在句中的作用是？",
                  options: ["表转折", "表因果", "表并列"],
                  answer: 0,
                  tip: "However = 然而，表转折。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["He was tired, however he kept working.", "He was tired. However, he kept working.", "He was tired, but however he kept working."],
                  answer: 1,
                  tip: "however 不能直接连两个分句；but 和 however 不连用。"
                },
                {
                  type: "fill",
                  stemBefore: "Last Sunday, Tom",
                  stemAfter: "his key.（lose）",
                  answer: "lost",
                  accept: ["lost"],
                  tip: "Last Sunday 过去时间，用过去式。"
                }
              ],
              point: "自查：时态看篇章；代词找前文；however/but 位置不同。"
            }
          ]
        },
        {
          id: "gr19.1.2",
          title: "短文改错十看",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr19.1.2-p1",
              kind: "observe",
              title: "先看三句话：都是对的，错长什么样？",
              sentences: [
                {
                  id: "gr19.1.2-e1",
                  en: "She goes to school by bike.",
                  zh: "她骑自行车上学。",
                  reg: "通用",
                  tagged: [
                    { w: "She", role: "subject", label: "主语" },
                    { w: "goes", role: "verb", label: "谓语" },
                    { w: "to school", role: "adverb", label: "状语" },
                    { w: "by bike", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr19.1.2-e2",
                  en: "There is a book on the desk.",
                  zh: "桌上有一本书。",
                  reg: "通用",
                  tagged: [
                    { w: "There is", role: "verb", label: "there be" },
                    { w: "a book", role: "subject", label: "主语" },
                    { w: "on the desk", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr19.1.2-e3",
                  en: "Although it rained, we went out.",
                  zh: "虽然下雨了，我们还是出去了。",
                  reg: "通用",
                  tagged: [
                    { w: "Although it rained", role: "adverb", label: "让步状语从句" },
                    { w: "we", role: "subject", label: "主语" },
                    { w: "went out", role: "verb", label: "谓语" }
                  ]
                }
              ],
              guess: {
                q: "改错十看：时态、主谓、冠词、介词、连词、代词、词性、非谓语、语序、逻辑——看到病句先看哪？",
                options: ["先看谓语动词（时态/主谓）", "先看标点", "凭语感"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "改错不凭语感：十看法一个一个过，先看谓语。"
            },
            /* ---------- p2 交互页：G1 tagging（十看分类） ---------- */
            {
              id: "gr19.1.2-p2",
              kind: "interact",
              title: "标一标：十看第一看",
              exploreTip: "标出每块的成分，想想“十看”里哪一看能抓到它。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "go", role: "verb", label: "谓语（十看：主谓）" },
                      { w: "to school", role: "adverb", label: "状语" },
                      { w: "every day", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语（十看：主谓）" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "He go to school every day：主语 He 是三单，谓语 go 对吗？"
                  }
                }
              ],
              point: "改错第一看：主语 He 是三单，谓语 go 少了 s——十看之主谓。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr19.1.2-p3",
              kind: "explain",
              title: "短文改错十看",
              lead: "还记得吗？你上一页用“十看之主谓”抓到了 go 少 s。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr19.1.2-e1", "gr19.1.2-e2", "gr19.1.2-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "短文改错十看法：时态、主谓一致、冠词、介词、连词、代词、词性、非谓语、语序、行文逻辑。",
                  condition: "高考改错规则：一处只改一词（多改扣分）；10 处左右设错，每看一般 1 处；先看谓语动词，再看名词（单复数/冠词），再看连词。"
                },
                {
                  type: "bridge",
                  zh: "汉语改错看意思；英语改错看“形”：时态对不对、单复数对不对。",
                  en: "英语是形合语言，错误都长在“形态”上：go 少个 s，a/an/the 乱放，although 后面跟了 but——十看法就是十个“形态检查站”。",
                  unbridge: "这是英语的规矩：改错不靠语感，靠检查站一个一个过。"
                },
                {
                  type: "contrast",
                  wrong: "He go to school every day.",
                  wrongZh: "（✗ 错句）",
                  right: "He goes to school every day.",
                  why: "十看之主谓：He 三单，go 加 s。"
                },
                {
                  type: "contrast",
                  wrong: "Although it rained, but we went out.",
                  wrongZh: "（✗ 错句）",
                  right: "Although it rained, we went out.",
                  why: "十看之连词：although 和 but 是仇人，留一个。"
                }
              ],
              point: "这就是十看：先看谓语；一处只改一词；检查站一个一个过。",
              pointScroll: true
            },
            /* ---------- p4 练习页：改错 ---------- */
            {
              id: "gr19.1.2-p4",
              kind: "quiz",
              title: "改错练习",
              questions: [
                {
                  type: "choice",
                  stem: "He go to school every day. 错在？",
                  options: ["go → goes", "school → schools", "day → days"],
                  answer: 0,
                  tip: "十看之主谓：三单加 s。"
                },
                {
                  type: "choice",
                  stem: "Although it rained, but we went out. 错在？",
                  options: ["去掉 but", "rained → rains", "went → go"],
                  answer: 0,
                  tip: "十看之连词：although…but 留一个。"
                },
                {
                  type: "choice",
                  stem: "There have a book on the desk. 错在？",
                  options: ["have → is", "book → books", "desk → desks"],
                  answer: 0,
                  tip: "十看之句式：there be 不用 have。"
                },
                {
                  type: "choice",
                  stem: "I very much like it. 错在？",
                  options: ["very much 放句尾", "like → likes", "it → its"],
                  answer: 0,
                  tip: "十看之语序：very much 放句尾。"
                }
              ],
              point: "自查：十看法；一处只改一词；先看谓语。"
            }
          ]
        },
        {
          id: "gr19.1.3",
          title: "书面表达高分句式",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr19.1.3-p1",
              kind: "observe",
              title: "先看三句话：同一意思，三种说法",
              sentences: [
                {
                  id: "gr19.1.3-e1",
                  en: "I like English.",
                  zh: "我喜欢英语。",
                  reg: "通用",
                  tagged: [
                    { w: "I", role: "subject", label: "主语" },
                    { w: "like", role: "verb", label: "谓语" },
                    { w: "English", role: "object", label: "宾语" }
                  ]
                },
                {
                  id: "gr19.1.3-e2",
                  en: "I find English interesting.",
                  zh: "我发现英语很有趣。",
                  reg: "通用",
                  tagged: [
                    { w: "I", role: "subject", label: "主语" },
                    { w: "find", role: "verb", label: "谓语" },
                    { w: "English", role: "object", label: "宾语" },
                    { w: "interesting", role: "complem", label: "宾补" }
                  ]
                },
                {
                  id: "gr19.1.3-e3",
                  en: "English, which I find interesting, is useful.",
                  zh: "英语很有用，我觉得它很有趣。",
                  reg: "书面",
                  tagged: [
                    { w: "English", role: "subject", label: "主语" },
                    { w: "which I find interesting", role: "attrib", label: "定语从句" },
                    { w: "is useful", role: "verb", label: "谓语" }
                  ]
                }
              ],
              guess: {
                q: "三句话意思接近，哪个更“高级”？",
                options: ["e3（定语从句）> e2（宾补）> e1（简单句）", "都一样", "e1 最高级"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "同一意思，三种说法：句式升级，分数升级。"
            },
            /* ---------- p2 交互页：G3 句型积木（升级拼装） ---------- */
            {
              id: "gr19.1.3-p2",
              kind: "interact",
              title: "拼一拼：升级句",
              exploreTip: "把积木放进对的槽，拼出升级句：小心，is 是干扰块（双谓语警报会响）！",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVOC",
                    blocks: [
                      { w: "I", role: "subject" },
                      { w: "find", role: "verb" },
                      { w: "English", role: "object" },
                      { w: "interesting", role: "complem" },
                      { w: "is", role: "verb" }
                    ],
                    hint: "拼出升级句：I find English interesting.——is 放进去会触发双谓语警报！",
                    doneNote: "I find English interesting.——简单句 I like English. 的升级版。"
                  }
                }
              ],
              point: "升级三招：加宾补、加定语从句、加非谓语/强调——先保证对，再谈高级。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr19.1.3-p3",
              kind: "explain",
              title: "书面表达高分句式",
              lead: "还记得吗？你上一页拼出 I find English interesting.——这就是简单句的升级版。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr19.1.3-e1", "gr19.1.3-e2", "gr19.1.3-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "书面表达句式升级：简单句 → 宾补句 → 定语从句/非谓语/强调句/倒装。",
                  condition: "升级三招：加宾补（→ I find English interesting.）；加定语从句（→ English, which…）；加非谓语/强调。反例：为高级而高级，堆砌致错（✗ 逗号粘连）。"
                },
                {
                  type: "bridge",
                  zh: "汉语写作用词升级；英语写作用“句式”升级。",
                  en: "英语阅卷看两样：意思对不对，句式多不多——同一个意思，用定语从句、非谓语、强调句说出来就是高分句式。但升级不能硬堆，错一句不如对一句简单句。",
                  unbridge: "这是英语的规矩：先保证对，再谈高级；高级句式是调料，不是主菜。"
                },
                {
                  type: "contrast",
                  wrong: "I like English, it is very interesting.",
                  wrongZh: "（✗ 错句）",
                  right: "I like English, which is very interesting.",
                  why: "逗号不能直接连两个句子（run-on）；要么句号断开，要么用 which 连起来。"
                },
                {
                  type: "contrast",
                  wrong: "It is English that I like it.",
                  wrongZh: "（✗ 错句）",
                  right: "It is English that I like.",
                  why: "强调句 that 后面不能再加 it（that 在，it 走）。"
                }
              ],
              point: "这就是高分句式：先对后高级；三招升级；不堆砌。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr19.1.3-p4",
              kind: "quiz",
              title: "练一练：句式升级",
              questions: [
                {
                  type: "choice",
                  stem: "I like English. 升级成宾补句是？",
                  options: ["I find English interesting.", "I like English interesting.", "I find English is interesting."],
                  answer: 0,
                  tip: "find + 宾 + 宾补：I find English interesting."
                },
                {
                  type: "choice",
                  stem: "下面哪个是高级句式？",
                  options: ["English, which I find interesting, is useful.", "English is useful. I find it interesting.", "English useful."],
                  answer: 0,
                  tip: "定语从句把两句合成一句，是升级。"
                },
                {
                  type: "choice",
                  stem: "I like English, it is very interesting. 错在？",
                  options: ["逗号粘连（run-on）", "like 用错", "English 拼错"],
                  answer: 0,
                  tip: "逗号不能连两个句子：用句号或 which。"
                },
                {
                  type: "fill",
                  stemBefore: "It is English",
                  stemAfter: "I like.（强调句）",
                  answer: "that",
                  accept: ["that"],
                  tip: "强调句 It is…that…，that 不省。"
                }
              ],
              point: "自查：先对后高级；三招升级；不堆砌。"
            }
          ]
        }
      ]
    },
    {
      id: "gr19-u2",
      title: "总复习与诊断",
      lessons: [
        {
          id: "gr19.2.1",
          title: "时态语态总复习",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr19.2.1-p1",
              kind: "observe",
              title: "先看三句话：动词有什么不一样？",
              sentences: [
                {
                  id: "gr19.2.1-e1",
                  en: "She writes a letter every week.",
                  zh: "她每周写一封信。",
                  reg: "通用",
                  tagged: [
                    { w: "She", role: "subject", label: "主语" },
                    { w: "writes", role: "verb", label: "谓语（一般现在时）" },
                    { w: "a letter", role: "object", label: "宾语" },
                    { w: "every week", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr19.2.1-e2",
                  en: "She is writing a letter now.",
                  zh: "她正在写信。",
                  reg: "通用",
                  tagged: [
                    { w: "She", role: "subject", label: "主语" },
                    { w: "is writing", role: "verb", label: "谓语（现在进行时）" },
                    { w: "a letter", role: "object", label: "宾语" },
                    { w: "now", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr19.2.1-e3",
                  en: "The letter was written by her.",
                  zh: "这封信是她写的。",
                  reg: "通用",
                  tagged: [
                    { w: "The letter", role: "subject", label: "主语" },
                    { w: "was written", role: "verb", label: "谓语（被动语态）" },
                    { w: "by her", role: "adverb", label: "状语" }
                  ]
                }
              ],
              guess: {
                q: "三句话的 letter 一样，动词有什么不一样？",
                options: ["时态语态不一样：一般现在 / 现在进行 / 被动", "意思完全一样", "只有主语不一样"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "8 时态 × 被动：一张时间轴，全串起来。"
            },
            /* ---------- p2 交互页：G1 tagging（时态分类） ---------- */
            {
              id: "gr19.2.1-p2",
              kind: "interact",
              title: "贴一贴：时态标签",
              exploreTip: "点一个标签，再点一句话：给每句话贴上时态标签，看动词形态。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She writes a letter every week.", role: "t1", label: "？" },
                      { w: "She is writing a letter now.", role: "t2", label: "？" },
                      { w: "The letter was written by her.", role: "t3", label: "？" }
                    ],
                    slots: [
                      { role: "t1", label: "一般现在时" },
                      { role: "t2", label: "现在进行时" },
                      { role: "t3", label: "一般过去时被动语态" },
                      { role: "t4", label: "现在完成时（干扰）" }
                    ],
                    hint: "看动词形态贴标签：writes / is writing / was written。"
                  }
                }
              ],
              point: "时态看时间，语态看方向；时间状语是钉子。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr19.2.1-p3",
              kind: "explain",
              title: "时态语态总复习",
              lead: "还记得吗？你上一页给 was written 贴上了“一般过去时被动语态”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr19.2.1-e1", "gr19.2.1-e2", "gr19.2.1-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "时态语态总表：8 大时态（一般现在/过去/将来、现在/过去进行、现在/过去完成、过去将来）× 被动语态（be + done，be 随时刻变）。",
                  condition: "看时间轴定时刻，看主被动定语态；被动 = be + 过去分词；不及物动词无被动（happen）；时间状语是时态的钉子（every week / now / yesterday）。"
                },
                {
                  type: "bridge",
                  zh: "汉语靠“昨天/正在/将”定时间；英语靠动词变形。",
                  en: "一张时间轴走天下：时间点在“现在”→ writes；时间点在“正在”→ is writing；主语是动作承受者→ was written——时态是时间，语态是方向。",
                  unbridge: "记住：先看时间（时态），再看方向（语态）；时间状语是钉子。"
                },
                {
                  type: "contrast",
                  wrong: "She is write a letter now.",
                  wrongZh: "（✗ 错句）",
                  right: "She is writing a letter now.",
                  why: "进行时 = be + doing，be 不能省，doing 不能写成原形。"
                },
                {
                  type: "contrast",
                  wrong: "The letter was wrote by her.",
                  wrongZh: "（✗ 错句）",
                  right: "The letter was written by her.",
                  why: "被动 = be + 过去分词，write 的过去分词是 written。"
                }
              ],
              point: "这就是总表：8 时态时间轴；被动 be + done；不及物无被动。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr19.2.1-p4",
              kind: "quiz",
              title: "练一练：时态语态",
              questions: [
                {
                  type: "choice",
                  stem: "She writes a letter every week. 的时态是？",
                  options: ["一般现在时", "现在进行时", "一般过去时"],
                  answer: 0,
                  tip: "every week + 动词 s：一般现在时。"
                },
                {
                  type: "choice",
                  stem: "被动语态的构成是？",
                  options: ["be + 过去分词", "be + 动词原形", "have + 过去分词"],
                  answer: 0,
                  tip: "被动 = be + done。"
                },
                {
                  type: "fill",
                  stemBefore: "The letter",
                  stemAfter: "written by her.（过去）",
                  answer: "was",
                  accept: ["was"],
                  tip: "过去的被动，be 用 was。"
                },
                {
                  type: "choice",
                  stem: "下面没有被动的是？",
                  options: ["The accident happened.", "The window was broken.", "The work was done."],
                  answer: 0,
                  tip: "happen 不及物，无被动。"
                }
              ],
              point: "自查：8 时态时间轴；被动 be + done；不及物无被动。"
            }
          ]
        },
        {
          id: "gr19.2.2",
          title: "从句总复习",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr19.2.2-p1",
              kind: "observe",
              title: "先看三句话：从句各当什么成分？",
              sentences: [
                {
                  id: "gr19.2.2-e1",
                  en: "I know that he is ill.",
                  zh: "我知道他病了。",
                  reg: "通用",
                  tagged: [
                    { w: "I", role: "subject", label: "主语" },
                    { w: "know", role: "verb", label: "谓语" },
                    { w: "that he is ill", role: "object", label: "宾语从句" }
                  ]
                },
                {
                  id: "gr19.2.2-e2",
                  en: "The book that I bought is interesting.",
                  zh: "我买的那本书很有趣。",
                  reg: "通用",
                  tagged: [
                    { w: "The book", role: "subject", label: "先行词" },
                    { w: "that I bought", role: "attrib", label: "定语从句" },
                    { w: "is interesting", role: "verb", label: "谓语" }
                  ]
                },
                {
                  id: "gr19.2.2-e3",
                  en: "If it rains, we will stay.",
                  zh: "如果下雨，我们就待着。",
                  reg: "通用",
                  tagged: [
                    { w: "If it rains", role: "adverb", label: "条件状语从句" },
                    { w: "we", role: "subject", label: "主语" },
                    { w: "will stay", role: "verb", label: "谓语" }
                  ]
                }
              ],
              guess: {
                q: "三个从句分别在主句中当什么成分？",
                options: ["宾语 / 定语 / 状语", "都是宾语", "都是状语"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "从句是披着句子外衣的成分：三大从句，一张总表。"
            },
            /* ---------- p2 交互页：G5 从句槽（三大从句） ---------- */
            {
              id: "gr19.2.2-p2",
              kind: "interact",
              title: "从句槽：各回各槽",
              exploreTip: "把从句块放进对的槽：定语从句修饰名词，哪个能进定语槽？",
              widgets: [
                {
                  type: "clause-slots",
                  params: {
                    main: "The book ___ is interesting.",
                    mainSlots: [
                      { id: "s1", label: "定语槽", accept: ["attrib"] }
                    ],
                    clauseBlocks: [
                      { text: "that I bought", kind: "attrib" },
                      { text: "that he is ill", kind: "object" },
                      { text: "if it rains", kind: "adverbial" }
                    ],
                    hint: "定语从句修饰名词：哪个从句能进定语槽？放错会弹回来。"
                  }
                }
              ],
              point: "三大从句看成分：缺宾语补宾语从句，缺修饰补定语从句。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr19.2.2-p3",
              kind: "explain",
              title: "从句总复习",
              lead: "还记得吗？上一页 that I bought 进定语槽，拼出 The book that I bought is interesting.",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr19.2.2-e1", "gr19.2.2-e2", "gr19.2.2-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "三大从句总表：名词性从句（主/宾/表/同位语，从句当名词用）；定语从句（修饰名词，that/which/who）；状语从句（8 种，修饰全句）。",
                  condition: "长难句拆解三步：找主句谓语（骨架）→ 找连接词 → 定从句身份（当什么成分）；that 一词多能：宾语从句连词 / 定语从句关系代词 / 强调句框——看成分判定。"
                },
                {
                  type: "bridge",
                  zh: "汉语“的”字搞定定语；英语 that/who/which 各有各的槽。",
                  en: "从句是“句子当成分用”：I know 后面缺宾语，塞个句子进去；book 后面缺修饰语，塞个句子进去——先看主句缺什么，再看从句补什么。",
                  unbridge: "记住：剥洋葱先找主句谓语；that 看成分定身份。"
                },
                {
                  type: "contrast",
                  wrong: "The book that I bought it is interesting.",
                  wrongZh: "（✗ 错句）",
                  right: "The book that I bought is interesting.",
                  why: "that 在从句中作宾语，it 没地方站——that 在，it 走。"
                },
                {
                  type: "contrast",
                  wrong: "If it will rain, we will stay.",
                  wrongZh: "（✗ 错句）",
                  right: "If it rains, we will stay.",
                  why: "主将从现：条件从句里 will 被没收。"
                }
              ],
              point: "从句总表：三大从句看成分；that 看身份；主将从现。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr19.2.2-p4",
              kind: "quiz",
              title: "练一练：从句身份",
              questions: [
                {
                  type: "choice",
                  stem: "I know that he is ill. 里从句当什么成分？",
                  options: ["宾语", "定语", "状语"],
                  answer: 0,
                  tip: "know 后面缺宾语，从句补上。"
                },
                {
                  type: "choice",
                  stem: "The book that I bought… 里 that 是？",
                  options: ["关系代词（作宾语）", "强调句的 that", "连词"],
                  answer: 0,
                  tip: "that 前有先行词 the book，作 bought 的宾语。"
                },
                {
                  type: "choice",
                  stem: "长难句第一步是？",
                  options: ["找主句的谓语动词", "找生词", "从头翻译"],
                  answer: 0,
                  tip: "剥洋葱：谓语是骨架。"
                },
                {
                  type: "fill",
                  stemBefore: "If it",
                  stemAfter: ", we will stay.（rain）",
                  answer: "rains",
                  accept: ["rains"],
                  tip: "主将从现：从句用一般现在时。"
                }
              ],
              point: "自查：三大从句看成分；that 看身份；主将从现。"
            }
          ]
        },
        {
          id: "gr19.2.3",
          title: "全书诊断与学习路径",
          pages: [
            /* ---------- p1 观察页：诊断句 ---------- */
            {
              id: "gr19.2.3-p1",
              kind: "observe",
              title: "先看三句话：病出在哪一章？",
              sentences: [
                {
                  id: "gr19.2.3-e1",
                  en: "He go to school every day.",
                  zh: "（✗ 错句·诊断）他每天上学。",
                  reg: "通用",
                  tagged: [
                    { w: "He", role: "subject", label: "主语" },
                    { w: "go", role: "verb", label: "谓语（✗）" },
                    { w: "to school", role: "adverb", label: "状语" },
                    { w: "every day", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr19.2.3-e2",
                  en: "Although it rained, but we stayed.",
                  zh: "（✗ 错句·诊断）虽然下雨了，但是我们待着了。",
                  reg: "通用",
                  tagged: [
                    { w: "Although it rained", role: "adverb", label: "让步状语从句" },
                    { w: "but", role: "adverb", label: "连词（✗ 多余）" },
                    { w: "we", role: "subject", label: "主语" },
                    { w: "stayed", role: "verb", label: "谓语" }
                  ]
                },
                {
                  id: "gr19.2.3-e3",
                  en: "I have a book. It is interesting.",
                  zh: "我有一本书。它很有趣。",
                  reg: "通用",
                  tagged: [
                    { w: "I", role: "subject", label: "主语" },
                    { w: "have", role: "verb", label: "谓语" },
                    { w: "a book", role: "object", label: "宾语" }
                  ]
                }
              ],
              guess: {
                q: "e1、e2 的病分别出在哪一章？",
                options: ["gr05 三单 / gr15 让步", "都是 gr05", "看不出来"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "诊断：错哪，回哪章——这就是学习路径。"
            },
            /* ---------- p2 交互页：G1 tagging（诊断分类） ---------- */
            {
              id: "gr19.2.3-p2",
              kind: "interact",
              title: "诊一诊：病出在哪一章？",
              exploreTip: "点一个标签，再点一句话：每句话的病出在哪一章？贴上标签，回那章复习。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He go to school every day.", role: "d1", label: "？" },
                      { w: "Although it rained, but we stayed.", role: "d2", label: "？" },
                      { w: "There have a book.", role: "d3", label: "？" }
                    ],
                    slots: [
                      { role: "d1", label: "gr05：三单 -s" },
                      { role: "d2", label: "gr15：although…but" },
                      { role: "d3", label: "gr12：there be" },
                      { role: "d4", label: "gr11：构词（干扰）" }
                    ],
                    hint: "诊断：每句话的病出在哪一章？"
                  }
                }
              ],
              point: "错题是最好的诊断书：错哪，回哪章。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr19.2.3-p3",
              kind: "explain",
              title: "全书诊断与学习路径",
              lead: "还记得吗？你上一页给 He go 贴上了“gr05：三单 -s”——诊断完成，回填开始。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr19.2.3-e1", "gr19.2.3-e2", "gr19.2.3-e3"],
                  note: "先看现象，再看诊断路径。"
                },
                {
                  type: "idcard",
                  rule: "全书诊断：自测清单（每章一句话自查）+ 薄弱回填路径（错哪回哪章）+ 词汇↔语法联合路径。",
                  condition: "自查三问：规则能复述吗？反例能识别吗？中式英语能纠吗？一问卡住就回对应章；词汇弱→讲词根子卡，语法弱→语法子卡对应章。"
                },
                {
                  type: "bridge",
                  zh: "看病先诊断，再开药；学语法先找薄弱点，再回填。",
                  en: "语法和词汇是两条腿：词汇弱去讲词根子卡，语法弱回语法对应章——两条腿一起走，才走得快。",
                  unbridge: "记住：错题是最好的诊断书；回填不丢人，硬撑才耽误事。"
                },
                {
                  type: "contrast",
                  wrong: "He go to school every day.",
                  wrongZh: "（✗ 错句）",
                  right: "He goes to school every day.",
                  why: "诊断：gr05 三单 -s——回 gr05.1.1。"
                },
                {
                  type: "contrast",
                  wrong: "There have a book.",
                  wrongZh: "（✗ 错句）",
                  right: "There is a book.",
                  why: "诊断：gr12 there be——回 gr12.1.1。"
                }
              ],
              point: "这就是诊断：自查三问；错哪回哪章；词汇↔语法两条腿。",
              pointScroll: true
            },
            /* ---------- p4 练习页：自测 ---------- */
            {
              id: "gr19.2.3-p4",
              kind: "quiz",
              title: "自测",
              questions: [
                {
                  type: "choice",
                  stem: "He go to school. 病因在哪章？",
                  options: ["gr05（三单 -s）", "gr11（构词）", "gr19（语篇）"],
                  answer: 0,
                  tip: "三单漏 s：回 gr05.1.1。"
                },
                {
                  type: "choice",
                  stem: "Although…but… 病因在哪章？",
                  options: ["gr15（让步状语从句）", "gr05", "gr01"],
                  answer: 0,
                  tip: "although…but 禁令：回 gr15.2.1。"
                },
                {
                  type: "choice",
                  stem: "词汇弱（猜词慢），去哪？",
                  options: ["讲词根子卡", "语法 gr16", "不学了"],
                  answer: 0,
                  tip: "词汇↔语法联合路径：词汇弱回讲词根。"
                },
                {
                  type: "choice",
                  stem: "I very much like it. 正确改法是？",
                  options: ["I like it very much.", "I very like it much.", "I like very much it."],
                  answer: 0,
                  tip: "very much 放句尾：gr03 回填。"
                }
              ],
              point: "自查：诊断三问；错哪回哪章；词汇↔语法两条腿。"
            }
          ]
        }
      ]
    }
  ]
};