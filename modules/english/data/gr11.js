/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr11：构词法桥章（呼应讲词根）
 *
 * 数据口径（M5）：window.ENG_CH["gr11"] = { id, title, sentences, units[] }，
 * 与试点 gr05.js 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 本文件含 gr11 全部 6 课 × 4 页 = 24 页：
 *   p1 观察页（例句先行 + 分块标注 + Y1 先猜后验）
 *   p2 交互页（G6 词性换装 morph-dressup / G1 tagging 二选一）
 *   p3 讲解页（examples → idcard → bridge → spell → contrast）
 *   p4 练习页（Y3 判分：选择 + 填空）
 * 例句登记于 D3 三审台账 modules/english/data/_review/
 * ledger-gr11.json（本阶段状态 drafted，待英语专家队初审与红队终审）。
 * 与讲词根板块的呼应只链接 R3 审计通过的既有词条
 * （un/re/dis/pre/in/ex/de/co、ced、fac、port），以后缀体系为
 * 语法侧新建、术语与讲词根侧一致。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=生产队撰写（语法生产D队，2026-10-14）。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr11"] = {
  id: "gr11",
  title: "构词法桥章（呼应讲词根）",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr11.json 逐字一致（本阶段 drafted）。 */
  sentences: {
    "gr11.1.1-e1": { en: "She is unhappy today.", zh: "她今天不开心。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "unhappy", role: "complem", label: "表语" }, { w: "today", role: "adverb", label: "状语" } ] },
    "gr11.1.1-e2": { en: "I disagree with you.", zh: "我不同意你的看法。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "disagree", role: "verb", label: "谓语" }, { w: "with you", role: "adverb", label: "状语" } ] },
    "gr11.1.1-e3": { en: "We will preview the new words before class.", zh: "我们将在课前预习生词。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "will preview", role: "verb", label: "谓语" }, { w: "the new words", role: "object", label: "宾语" }, { w: "before class", role: "adverb", label: "状语" } ] },
    "gr11.1.1-e4": { en: "He is untable to come.", zh: "（✗ 错句）他不能来。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "untable", role: "complem", label: "表语（✗ 前缀用错）" } ] },
    "gr11.1.1-e5": { en: "He is unable to come.", zh: "他不能来。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "unable", role: "complem", label: "表语" } ] },
    "gr11.1.1-e6": { en: "It is inpossible to learn everything in one day.", zh: "（✗ 错句）一天学完所有东西是不可能的。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "inpossible", role: "complem", label: "表语（✗ 拼写）" }, { w: "to learn everything in one day", role: "subject", label: "真正主语" } ] },
    "gr11.1.1-e7": { en: "It is impossible to learn everything in one day.", zh: "一天学完所有东西是不可能的。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "impossible", role: "complem", label: "表语" }, { w: "to learn everything in one day", role: "subject", label: "真正主语" } ] },
    "gr11.1.2-e1": { en: "Happiness is important.", zh: "幸福很重要。", reg: "通用",
      tagged: [ { w: "Happiness", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "important", role: "complem", label: "表语" } ] },
    "gr11.1.2-e2": { en: "She sings happily.", zh: "她唱歌唱得很开心。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "sings", role: "verb", label: "谓语" }, { w: "happily", role: "adverb", label: "状语" } ] },
    "gr11.1.2-e3": { en: "They are friendly people.", zh: "他们是友好的人。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "谓语" }, { w: "friendly", role: "attrib", label: "定语" }, { w: "people", role: "complem", label: "表语" } ] },
    "gr11.1.2-e4": { en: "Happyness is important.", zh: "（✗ 错句）幸福很重要。", reg: "通用",
      tagged: [ { w: "Happyness", role: "subject", label: "主语（✗ 拼写）" }, { w: "is", role: "verb", label: "谓语" }, { w: "important", role: "complem", label: "表语" } ] },
    "gr11.1.2-e5": { en: "She sings happy.", zh: "（✗ 错句）她唱歌唱得很开心。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "sings", role: "verb", label: "谓语" }, { w: "happy", role: "adverb", label: "状语（✗ 词性）" } ] },
    "gr11.1.2-e6": { en: "He is a careful driver.", zh: "他是个细心的司机。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "a careful driver", role: "complem", label: "表语" } ] },
    "gr11.1.3-e1": { en: "Our classroom is big.", zh: "我们的教室很大。", reg: "通用",
      tagged: [ { w: "Our classroom", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "big", role: "complem", label: "表语" } ] },
    "gr11.1.3-e2": { en: "Look at the blackboard.", zh: "看黑板。", reg: "通用",
      tagged: [ { w: "Look", role: "verb", label: "谓语" }, { w: "at the blackboard", role: "adverb", label: "状语" } ] },
    "gr11.1.3-e3": { en: "He showed me his passport.", zh: "他给我看了他的护照。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "showed", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "间接宾语" }, { w: "his passport", role: "object", label: "直接宾语" } ] },
    "gr11.1.3-e4": { en: "There are two passer-bys.", zh: "（✗ 错句）有两个路人。", reg: "通用",
      tagged: [ { w: "There are", role: "verb", label: "there be" }, { w: "two passer-bys", role: "subject", label: "主语（✗ 复数）" } ] },
    "gr11.1.3-e5": { en: "There are two passers-by.", zh: "有两个路人。", reg: "通用",
      tagged: [ { w: "There are", role: "verb", label: "there be" }, { w: "two passers-by", role: "subject", label: "主语" } ] },
    "gr11.1.3-e6": { en: "A breakdown stopped the train.", zh: "一次故障让火车停运了。", reg: "通用",
      tagged: [ { w: "A breakdown", role: "subject", label: "主语" }, { w: "stopped", role: "verb", label: "谓语" }, { w: "the train", role: "object", label: "宾语" } ] },
    "gr11.1.3-e7": { en: "A break down stopped the train.", zh: "（✗ 错句）一次故障让火车停运了。", reg: "通用",
      tagged: [ { w: "A break down", role: "subject", label: "主语（✗ 分写）" }, { w: "stopped", role: "verb", label: "谓语" }, { w: "the train", role: "object", label: "宾语" } ] },
    "gr11.2.1-e1": { en: "Hard work is the key to success.", zh: "努力是成功的关键。", reg: "通用",
      tagged: [ { w: "Hard work", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the key to success", role: "complem", label: "表语" } ] },
    "gr11.2.1-e2": { en: "If you try, you will succeed.", zh: "如果你努力，你会成功。", reg: "通用",
      tagged: [ { w: "If you try", role: "adverb", label: "条件状语" }, { w: "you", role: "subject", label: "主语" }, { w: "will succeed", role: "verb", label: "谓语" } ] },
    "gr11.2.1-e3": { en: "She is a successful teacher.", zh: "她是一位成功的老师。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "a successful teacher", role: "complem", label: "表语" } ] },
    "gr11.2.1-e4": { en: "He successed in the exam.", zh: "（✗ 错句）他在考试中成功了。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "successed", role: "verb", label: "谓语（✗ 词性）" }, { w: "in the exam", role: "adverb", label: "状语" } ] },
    "gr11.2.1-e5": { en: "He succeeded in the exam.", zh: "他在考试中成功了。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "succeeded", role: "verb", label: "谓语" }, { w: "in the exam", role: "adverb", label: "状语" } ] },
    "gr11.2.1-e6": { en: "She speaks English successful.", zh: "（✗ 错句）她英语说得很成功。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "speaks", role: "verb", label: "谓语" }, { w: "English", role: "object", label: "宾语" }, { w: "successful", role: "adverb", label: "状语（✗ 词性）" } ] },
    "gr11.2.1-e7": { en: "She speaks English successfully.", zh: "她英语说得很成功。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "speaks", role: "verb", label: "谓语" }, { w: "English", role: "object", label: "宾语" }, { w: "successfully", role: "adverb", label: "状语" } ] },
    "gr11.2.2-e1": { en: "The invention is useful.", zh: "这项发明很有用。", reg: "通用",
      tagged: [ { w: "The invention", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "useful", role: "complem", label: "表语" } ] },
    "gr11.2.2-e2": { en: "We will modernize the school.", zh: "我们要让学校现代化。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "will modernize", role: "verb", label: "谓语" }, { w: "the school", role: "object", label: "宾语" } ] },
    "gr11.2.2-e3": { en: "His arrival was late.", zh: "他的到达晚了。", reg: "通用",
      tagged: [ { w: "His arrival", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "late", role: "complem", label: "表语" } ] },
    "gr11.2.2-e4": { en: "His arrive was late.", zh: "（✗ 错句）他的到达晚了。", reg: "通用",
      tagged: [ { w: "His arrive", role: "subject", label: "主语（✗ 词性）" }, { w: "was", role: "verb", label: "谓语" }, { w: "late", role: "complem", label: "表语" } ] },
    "gr11.2.2-e5": { en: "They will modern the school.", zh: "（✗ 错句）他们要让学校现代化。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "will modern", role: "verb", label: "谓语（✗ 词性）" }, { w: "the school", role: "object", label: "宾语" } ] },
    "gr11.2.2-e6": { en: "They will modernize the old school.", zh: "他们要让这所老学校现代化。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "will modernize", role: "verb", label: "谓语" }, { w: "the old school", role: "object", label: "宾语" } ] },
    "gr11.2.3-e1": { en: "He is unhappy with the result.", zh: "他对结果不满意。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "unhappy", role: "complem", label: "表语" }, { w: "with the result", role: "adverb", label: "状语" } ] },
    "gr11.2.3-e2": { en: "Happiness takes time.", zh: "幸福需要时间。", reg: "通用",
      tagged: [ { w: "Happiness", role: "subject", label: "主语" }, { w: "takes", role: "verb", label: "谓语" }, { w: "time", role: "object", label: "宾语" } ] },
    "gr11.2.3-e3": { en: "They will succeed together.", zh: "他们会一起成功。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "will succeed", role: "verb", label: "谓语" }, { w: "together", role: "adverb", label: "状语" } ] },
    "gr11.2.3-e4": { en: "She sings happy.", zh: "（✗ 错句）她唱歌唱得很开心。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "sings", role: "verb", label: "谓语" }, { w: "happy", role: "adverb", label: "状语（✗ 词性）" } ] },
    "gr11.2.3-e5": { en: "She sings happily.", zh: "她唱歌唱得很开心。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "sings", role: "verb", label: "谓语" }, { w: "happily", role: "adverb", label: "状语" } ] },
    "gr11.2.3-e6": { en: "Preview the words before class.", zh: "课前预习生词。", reg: "通用",
      tagged: [ { w: "Preview", role: "verb", label: "谓语" }, { w: "the words", role: "object", label: "宾语" }, { w: "before class", role: "adverb", label: "状语" } ] }
  },
  units: [
    {
      id: "gr11-u1",
      title: "前缀、后缀与复合词",
      lessons: [
        {
          id: "gr11.1.1",
          title: "前缀：改义不改性",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr11.1.1-p1",
              kind: "observe",
              title: "先看三句话：前缀干了什么？",
              sentences: [
                {
                  id: "gr11.1.1-e1",
                  en: "She is unhappy today.",
                  zh: "她今天不开心。",
                  reg: "通用",
                  tagged: [
                    { w: "She", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "unhappy", role: "complem", label: "表语" },
                    { w: "today", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr11.1.1-e2",
                  en: "I disagree with you.",
                  zh: "我不同意你的看法。",
                  reg: "通用",
                  tagged: [
                    { w: "I", role: "subject", label: "主语" },
                    { w: "disagree", role: "verb", label: "谓语" },
                    { w: "with you", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr11.1.1-e3",
                  en: "We will preview the new words before class.",
                  zh: "我们将在课前预习生词。",
                  reg: "通用",
                  tagged: [
                    { w: "We", role: "subject", label: "主语" },
                    { w: "will preview", role: "verb", label: "谓语" },
                    { w: "the new words", role: "object", label: "宾语" },
                    { w: "before class", role: "adverb", label: "状语" }
                  ]
                }
              ],
              guess: {
                q: "un- / dis- / pre- 这三个小部件，干了什么活？",
                options: ["改变了词的意思，但词性没变", "改变了词的词性", "只是让词变长了"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "un-、dis-、pre- 只改意思、不改词性——这就是前缀。"
            },
            /* ---------- p2 交互页：G1 tagging（词块拆分） ---------- */
            {
              id: "gr11.1.1-p2",
              kind: "interact",
              title: "拆一拆：前缀和词根",
              exploreTip: "点一个标签，再点一个词块：un- 是前缀，happy 是词根；“后缀”标签是干扰项，别上当。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "un", role: "prefix", label: "前缀" },
                      { w: "happy", role: "root", label: "词根" }
                    ],
                    slots: [
                      { role: "prefix", label: "前缀" },
                      { role: "root", label: "词根" },
                      { role: "suffix", label: "后缀（干扰）" }
                    ],
                    hint: "un + happy = 不开心：哪个是前缀，哪个是词根？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "dis", role: "prefix", label: "前缀" },
                      { w: "agree", role: "root", label: "词根" }
                    ],
                    slots: [
                      { role: "prefix", label: "前缀" },
                      { role: "root", label: "词根" },
                      { role: "suffix", label: "后缀（干扰）" }
                    ],
                    hint: "dis + agree = 不同意：再拆一个。"
                  }
                }
              ],
              point: "前缀站在词根前面，改意思、不改词性。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr11.1.1-p3",
              kind: "explain",
              title: "前缀：改义不改性",
              lead: "还记得吗？上一页 un-/dis- 被标成“前缀”——只改意思，不改词性。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr11.1.1-e1", "gr11.1.1-e2", "gr11.1.1-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "前缀加在词的前面，只改变词的意思，不改变词性。",
                  condition: "否定：un-/in-/dis-；错误：mis-；程度：over-/super-；方位：pre-/post-；再：re-。un- 主要接形容词/分词（如 unable）；in- 见 b/m/p/l/r 变脸（im-/il-/ir-）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“不开心”，在“开心”前加个“不”；英语也一样，在 happy 前加个 un-。",
                  en: "不一样的是：unhappy 是一个词，前缀“粘”在词上；in- 碰到 b/m/p/l/r 会变脸，汉语的“不”不会变。这些前缀在“讲词根”都有词条。",
                  unbridge: "英语就认这个理：前缀改义不改性，拼写还要看邻居脸色。"
                },
                {
                  type: "spell",
                  title: "in- 的变脸规律：",
                  items: [
                    "in- + b/m/p → im-：possible → impossible；polite → impolite",
                    "in- + l → il-：legal → illegal",
                    "in- + r → ir-：regular → irregular",
                    "其他多半不变：correct → incorrect；un- 从不变脸"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "He is untable to come.",
                  wrongZh: "（✗ 错句）",
                  right: "He is unable to come.",
                  why: "untable 的真错因是把形容词 able（能）听成了名词 table（桌子）——un- 主要接形容词/分词（如 unable）；un- 接名词也有 unrest（不安）等，别记反。"
                },
                {
                  type: "contrast",
                  wrong: "It is inpossible to learn everything in one day.",
                  wrongZh: "（✗ 错句）",
                  right: "It is impossible to learn everything in one day.",
                  why: "in- 碰到 p 要变脸成 im-：in- + p → im-。"
                }
              ],
              point: "前缀：改义不改性；in- 见 b/m/p/l/r 变脸；un- 主要接形容词/分词。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr11.1.1-p4",
              kind: "quiz",
              title: "练一练：前缀用对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "unhappy 中，un- 的作用是？",
                  options: ["改变词义：不快乐（词性不变）", "把形容词变成名词", "没有实际作用"],
                  answer: 0,
                  tip: "前缀改义不改性：un- 表否定，happy 还是形容词。"
                },
                {
                  type: "fill",
                  stemBefore: "possible →",
                  stemAfter: "（不可能的，注意拼写）",
                  answer: "impossible",
                  accept: ["impossible"],
                  tip: "in- 遇到 p 变脸成 im-。"
                },
                {
                  type: "choice",
                  stem: "下面哪个是错的？",
                  options: ["disagree（不同意）", "preview（预习）", "untable"],
                  answer: 2,
                  tip: "un- 主要接形容词/分词：unable = un- + able（形容词“能”），不是 table（桌子）。"
                },
                {
                  type: "fill",
                  stemBefore: "regular →",
                  stemAfter: "（不规则的）",
                  answer: "irregular",
                  accept: ["irregular"],
                  tip: "in- 遇到 r 变脸成 ir-。"
                }
              ],
              point: "自查：前缀只改意思不改词性；in- 见 b/m/p/l/r 要变脸。"
            }
          ]
        },
        {
          id: "gr11.1.2",
          title: "后缀：改性",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr11.1.2-p1",
              kind: "observe",
              title: "先看三句话：后缀上场后发生了什么？",
              sentences: [
                {
                  id: "gr11.1.2-e1",
                  en: "Happiness is important.",
                  zh: "幸福很重要。",
                  reg: "通用",
                  tagged: [
                    { w: "Happiness", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "important", role: "complem", label: "表语" }
                  ]
                },
                {
                  id: "gr11.1.2-e2",
                  en: "She sings happily.",
                  zh: "她唱歌唱得很开心。",
                  reg: "通用",
                  tagged: [
                    { w: "She", role: "subject", label: "主语" },
                    { w: "sings", role: "verb", label: "谓语" },
                    { w: "happily", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr11.1.2-e3",
                  en: "They are friendly people.",
                  zh: "他们是友好的人。",
                  reg: "通用",
                  tagged: [
                    { w: "They", role: "subject", label: "主语" },
                    { w: "are", role: "verb", label: "谓语" },
                    { w: "friendly", role: "attrib", label: "定语" },
                    { w: "people", role: "complem", label: "表语" }
                  ]
                }
              ],
              guess: {
                q: "happiness、happily、friendly——后缀上场后，词性发生了什么？",
                options: ["词性都变成了副词", "词性变了，但 -ly 不一定是副词", "词性根本没变"],
                answer: 1,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "后缀是“词性换装”：-ness 穿上变名词，-ly 穿上多半变副词——但 friendly 是卧底，还是形容词。"
            },
            /* ---------- p2 交互页：G6 词性换装 ---------- */
            {
              id: "gr11.1.2-p2",
              kind: "interact",
              title: "词性换装：给 happy 穿外套",
              exploreTip: "点一件后缀外套穿上，看词性怎么变；再点一下脱下。小心“卧底外套”！",
              widgets: [
                {
                  type: "morph-dressup",
                  params: {
                    root: "happy",
                    rootPos: "形容词",
                    suffixes: [
                      { suf: "-ness", pos: "名词", word: "happiness" },
                      { suf: "-ly", pos: "副词", word: "happily" }
                    ],
                    traps: [
                      { root: "friend", suf: "-ly", pos: "形容词", word: "friendly", note: "friendly 穿 -ly 却还是形容词——后缀里的“卧底”！" }
                    ],
                    hint: "给 happy 穿上 -ness / -ly 外套，看词性怎么变；小心 friendly 这个卧底。"
                  }
                }
              ],
              point: "后缀管词性：-ness 变名词，-ly 多半变副词；friendly 是卧底。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr11.1.2-p3",
              kind: "explain",
              title: "后缀：改性",
              lead: "happiness 是名词，friendly 却是形容词——-ly 为何不算数？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr11.1.2-e1", "gr11.1.2-e2", "gr11.1.2-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "后缀加在词尾，改变词性（名词↔形容词↔副词↔动词）。",
                  condition: "名词后缀：-ness、-tion、-ment、-ity；形容词后缀：-ful、-less、-ous、-able；副词后缀：-ly；动词后缀：-ize、-en。注意：-ly 不总是副词（friendly/lovely/lonely 是形容词）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“快乐”变“快乐地”，加个“地”字；英语 happy 变 happily，加个 -ly。",
                  en: "不一样的是：英语后缀能变出好几种词性（-ness 变名词、-ful 变形容词），像换装；-ly 有卧底（friendly 是形容词），不能见 -ly 就喊副词。后缀的讲法是本章新讲的。",
                  unbridge: "不是汉语的讲法，是英语的规矩：后缀管词性，认后缀先看它到底变出了什么词性。"
                },
                {
                  type: "spell",
                  title: "y 变 i 再穿衣：",
                  items: [
                    "辅音字母 + y 结尾：去 y 变 i：happy → happiness；beauty → beautiful",
                    "-ly 卧底三兄弟：friendly、lovely、lonely——都是形容词"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "Happyness is important.",
                  wrongZh: "（✗ 错句）",
                  right: "Happiness is important.",
                  why: "辅音字母 + y 结尾，y 要先变成 i 再加 -ness。"
                },
                {
                  type: "contrast",
                  wrong: "She sings happy.",
                  wrongZh: "（✗ 错句）",
                  right: "She sings happily.",
                  why: "修饰动词 sings 要用副词：happy 是形容词，穿上 -ly 才变成副词。"
                }
              ],
              point: "这就是后缀：管词性；y 变 i；-ly 卧底三兄弟是形容词。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr11.1.2-p4",
              kind: "quiz",
              title: "练一练：后缀穿对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "-ness 的作用是？",
                  options: ["把形容词变成名词", "把名词变成形容词", "只表否定"],
                  answer: 0,
                  tip: "happiness 是名词：-ness 是名词后缀。"
                },
                {
                  type: "fill",
                  stemBefore: "beauty →",
                  stemAfter: "（美丽的，形容词）",
                  answer: "beautiful",
                  accept: ["beautiful"],
                  tip: "y 变 i 再加 -ful。"
                },
                {
                  type: "choice",
                  stem: "friendly 的词性是？",
                  options: ["副词", "形容词", "名词"],
                  answer: 1,
                  tip: "-ly 卧底：friendly 是形容词。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["She sings happy.", "She sings happily.", "She sing happily."],
                  answer: 1,
                  tip: "修饰动词用副词 happily；主语 she 是三单，动词加 s。"
                }
              ],
              point: "自查：后缀管词性；y 变 i；-ly 卧底三兄弟是形容词。"
            }
          ]
        },
        {
          id: "gr11.1.3",
          title: "复合词",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr11.1.3-p1",
              kind: "observe",
              title: "先看三句话：两个小词拼成一个大词",
              sentences: [
                {
                  id: "gr11.1.3-e1",
                  en: "Our classroom is big.",
                  zh: "我们的教室很大。",
                  reg: "通用",
                  tagged: [
                    { w: "Our classroom", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "big", role: "complem", label: "表语" }
                  ]
                },
                {
                  id: "gr11.1.3-e2",
                  en: "Look at the blackboard.",
                  zh: "看黑板。",
                  reg: "通用",
                  tagged: [
                    { w: "Look", role: "verb", label: "谓语" },
                    { w: "at the blackboard", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr11.1.3-e3",
                  en: "He showed me his passport.",
                  zh: "他给我看了他的护照。",
                  reg: "通用",
                  tagged: [
                    { w: "He", role: "subject", label: "主语" },
                    { w: "showed", role: "verb", label: "谓语" },
                    { w: "me", role: "object", label: "间接宾语" },
                    { w: "his passport", role: "object", label: "直接宾语" }
                  ]
                }
              ],
              guess: {
                q: "classroom、blackboard、passport——这三个词有什么共同点？",
                options: ["都是两个小词拼成一个大词", "都是外来词", "都不能拆开理解"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "两个词拼成一个新词，就是复合词。"
            },
            /* ---------- p2 交互页：G1 tagging（复合词拆分） ---------- */
            {
              id: "gr11.1.3-p2",
              kind: "interact",
              title: "拼一拼：复合词的两部分",
              exploreTip: "点一个标签，再点一个词块：把复合词拆成两部分。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "black", role: "part1", label: "第一部分" },
                      { w: "board", role: "part2", label: "第二部分" }
                    ],
                    slots: [
                      { role: "part1", label: "第一部分" },
                      { role: "part2", label: "第二部分" },
                      { role: "prefix", label: "前缀（干扰）" }
                    ],
                    hint: "black + board = 黑板：拆开看看。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "class", role: "part1", label: "第一部分" },
                      { w: "room", role: "part2", label: "第二部分" }
                    ],
                    slots: [
                      { role: "part1", label: "第一部分" },
                      { role: "part2", label: "第二部分" },
                      { role: "prefix", label: "前缀（干扰）" }
                    ],
                    hint: "class + room = 教室：再拆一个。"
                  }
                }
              ],
              point: "复合词 = 小词拼大词：先看它是几部分拼的。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr11.1.3-p3",
              kind: "explain",
              title: "复合词",
              lead: "先看一眼上一页的结论：复合词是小词拼大词。这一页把它用在拼写和复数上：s 加在关键部分。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr11.1.3-e1", "gr11.1.3-e2", "gr11.1.3-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "两个或两个以上的词拼成一个新词，叫复合词。",
                  condition: "名词+名词（classroom）；形容词+名词（blackboard）；动词+副词（breakdown）；passport = pass + port。拼写：合写（classroom）、连写（passer-by→passers-by）、分写以词典为准。"
                },
                {
                  type: "bridge",
                  zh: "汉语也有复合词：“教室”= 教 + 室，“黑板”= 黑 + 板。",
                  en: "英语一样：classroom = class + room。不一样的是：passer-by 的复数是 passers-by，s 加在“人”那个部分。passport = pass + port，这里的 port 是“港口”（portus），不是“运送”（portare）——它是“过港口/关口的通行证”。port 有两个家族，别搞混。",
                  unbridge: "规矩就这一条：复合词先看它是几部分拼的，复数找“关键部分”加 s。"
                },
                {
                  type: "spell",
                  title: "复合词拼写三兄弟：",
                  items: [
                    "合写：classroom（教室）、blackboard（黑板）——最常见",
                    "连写（连字符）：passer-by（路人）→ 复数 passers-by",
                    "分写：以词典为准，拿不准就查词典"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "There are two passer-bys.",
                  wrongZh: "（✗ 错句）",
                  right: "There are two passers-by.",
                  why: "passer-by 的复数，s 加在 passer 上：passers-by。"
                },
                {
                  type: "contrast",
                  wrong: "A break down stopped the train.",
                  wrongZh: "（✗ 错句）",
                  right: "A breakdown stopped the train.",
                  why: "名词“故障”是合写的 breakdown；break down 分写是动词短语（抛锚）。"
                }
              ],
              point: "这就是复合词：小词拼大词；复数找关键部分；拼写拿不准查词典。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr11.1.3-p4",
              kind: "quiz",
              title: "练一练：复合词拼对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "classroom 是哪两部分拼成的？",
                  options: ["class + room", "class + rooms", "classes + room"],
                  answer: 0,
                  tip: "classroom = class（班级）+ room（房间）。"
                },
                {
                  type: "fill",
                  stemBefore: "passer-by → 复数",
                  stemAfter: "（路人们）",
                  answer: "passers-by",
                  accept: ["passers-by"],
                  tip: "s 加在 passer 上：passers-by。"
                },
                {
                  type: "choice",
                  stem: "breakdown（故障）的词性是？",
                  options: ["名词", "动词", "形容词"],
                  answer: 0,
                  tip: "break down 分写才是动词短语。"
                },
                {
                  type: "choice",
                  stem: "“笔记本”拼写正确的是？",
                  options: ["note book", "notebook", "note-book"],
                  answer: 1,
                  tip: "笔记本合写 notebook；拿不准查词典。"
                }
              ],
              point: "自查：复合词 = 小词拼大词；复数找关键部分；拼写拿不准查词典。"
            }
          ]
        }
      ]
    },
    {
      id: "gr11-u2",
      title: "词性转换双向路",
      lessons: [
        {
          id: "gr11.2.1",
          title: "词性转换一条链",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr11.2.1-p1",
              kind: "observe",
              title: "先看三句话：同一个“家族”变了什么？",
              sentences: [
                {
                  id: "gr11.2.1-e1",
                  en: "Hard work is the key to success.",
                  zh: "努力是成功的关键。",
                  reg: "通用",
                  tagged: [
                    { w: "Hard work", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "the key to success", role: "complem", label: "表语" }
                  ]
                },
                {
                  id: "gr11.2.1-e2",
                  en: "If you try, you will succeed.",
                  zh: "如果你努力，你会成功。",
                  reg: "通用",
                  tagged: [
                    { w: "If you try", role: "adverb", label: "条件状语" },
                    { w: "you", role: "subject", label: "主语" },
                    { w: "will succeed", role: "verb", label: "谓语" }
                  ]
                },
                {
                  id: "gr11.2.1-e3",
                  en: "She is a successful teacher.",
                  zh: "她是一位成功的老师。",
                  reg: "通用",
                  tagged: [
                    { w: "She", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "a successful teacher", role: "complem", label: "表语" }
                  ]
                }
              ],
              guess: {
                q: "success（名词）、succeed（动词）、successful（形容词）——变了什么？",
                options: ["意思全变了", "词性变了，核心意思没变", "只是拼写游戏"],
                answer: 1,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "一词多形：词性一条链走完，意思还是“成功”。"
            },
            /* ---------- p2 交互页：G6 词性换装 ---------- */
            {
              id: "gr11.2.1-p2",
              kind: "interact",
              title: "词性换装：success 一条链",
              exploreTip: "点后缀外套穿上，看 success 怎么变；小心“假外套” successly！",
              widgets: [
                {
                  type: "morph-dressup",
                  params: {
                    root: "success",
                    rootPos: "名词",
                    suffixes: [
                      { suf: "-ful", pos: "形容词", word: "successful" }
                    ],
                    traps: [
                      { root: "success", suf: "-ly", pos: "（不存在）", word: "successly", note: "successly 不存在！副词是 successfully，要先穿 -ful 再穿 -ly。" }
                    ],
                    hint: "给 success 穿 -ful 外套变形容词；小心 successly 这个“假外套”。"
                  }
                }
              ],
              point: "一条链：success（名）→ succeed（动）→ successful（形）→ successfully（副）。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr11.2.1-p3",
              kind: "explain",
              title: "词性转换一条链",
              lead: "succeed 是动词，successful 是形容词——同根词为何词形不同？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr11.2.1-e1", "gr11.2.1-e2", "gr11.2.1-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "同一个词根可以长出名词、动词、形容词、副词四种词性，叫词性转换；一词四形是中考语篇填空高频题型。",
                  condition: "success（名）→ succeed（动，拼写 ceed）→ successful（形）→ successfully（副）。零转换：book n./v. 词形不变；重音移位：名词 RE-cord / 动词 re-CORD。"
                },
                {
                  type: "bridge",
                  zh: "汉语“成功”又能当名词又能当动词（“祝你成功”“他成功了”），一个词形全包。",
                  en: "英语不一样：四个词性长得都不一样——但都住在 ced- 家族。",
                  unbridge: "这是英语的规矩：一词四形，词性不同拼写不同，填空先看空上要什么词性。"
                },
                {
                  type: "spell",
                  title: "链条拼写提醒：",
                  items: [
                    "success → succeed：ss 变 ceed（ced- 变体 ceed-）",
                    "successful → successfully：-ful + -ly，直接加",
                    "record 重音移位：名词 RE-cord / 动词 re-CORD"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "He successed in the exam.",
                  wrongZh: "（✗ 错句）",
                  right: "He succeeded in the exam.",
                  why: "success 是名词，不能当动词用；动词是 succeed。"
                },
                {
                  type: "contrast",
                  wrong: "She speaks English successful.",
                  wrongZh: "（✗ 错句）",
                  right: "She speaks English successfully.",
                  why: "修饰动词 speaks 要用副词 successfully。"
                }
              ],
              point: "这就是一条链：success / succeed / successful / successfully；填空先看词性。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr11.2.1-p4",
              kind: "quiz",
              title: "练一练：一条链走完",
              questions: [
                {
                  type: "fill",
                  stemBefore: "success →",
                  stemAfter: "（动词，成功）",
                  answer: "succeed",
                  accept: ["succeed"],
                  tip: "ced- 家族：succeed（一直走）→ success（走到头）。"
                },
                {
                  type: "choice",
                  stem: "book 作动词的意思是？",
                  options: ["书", "预订", "读书"],
                  answer: 1,
                  tip: "零转换：book n. 书 / v. 预订。"
                },
                {
                  type: "fill",
                  stemBefore: "successful →",
                  stemAfter: "（副词）",
                  answer: "successfully",
                  accept: ["successfully"],
                  tip: "-ful + -ly。"
                },
                {
                  type: "choice",
                  stem: "record 作名词时重音在？",
                  options: ["前面（RE-cord）", "后面（re-CORD）", "没有重音"],
                  answer: 0,
                  tip: "零转换有时玩重音移位：名词在前，动词在后。"
                }
              ],
              point: "自查：一词四形先看空上要什么词性；success 一条链。"
            }
          ]
        },
        {
          id: "gr11.2.2",
          title: "从词根猜词性",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr11.2.2-p1",
              kind: "observe",
              title: "先看三句话：看到后缀，能猜出词性吗？",
              sentences: [
                {
                  id: "gr11.2.2-e1",
                  en: "The invention is useful.",
                  zh: "这项发明很有用。",
                  reg: "通用",
                  tagged: [
                    { w: "The invention", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "useful", role: "complem", label: "表语" }
                  ]
                },
                {
                  id: "gr11.2.2-e2",
                  en: "We will modernize the school.",
                  zh: "我们要让学校现代化。",
                  reg: "通用",
                  tagged: [
                    { w: "We", role: "subject", label: "主语" },
                    { w: "will modernize", role: "verb", label: "谓语" },
                    { w: "the school", role: "object", label: "宾语" }
                  ]
                },
                {
                  id: "gr11.2.2-e3",
                  en: "His arrival was late.",
                  zh: "他的到达晚了。",
                  reg: "通用",
                  tagged: [
                    { w: "His arrival", role: "subject", label: "主语" },
                    { w: "was", role: "verb", label: "谓语" },
                    { w: "late", role: "complem", label: "表语" }
                  ]
                }
              ],
              guess: {
                q: "看到 -tion / -ize / -al，你能猜出词性吗？",
                options: ["-tion 名词，-ize 动词，-al 一定是形容词", "-tion 名词，-ize 动词，-al 要小心", "猜不出，只能查词典"],
                answer: 1,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "后缀是词性的“身份证”：-tion 名词，-ize 动词；-al 多半是形容词，但 arrival 是名词。"
            },
            /* ---------- p2 交互页：G6 词性换装 ---------- */
            {
              id: "gr11.2.2-p2",
              kind: "interact",
              title: "词性换装：后缀身份证",
              exploreTip: "点后缀外套穿上，看词性怎么变；小心 arrival 这个卧底！",
              widgets: [
                {
                  type: "morph-dressup",
                  params: {
                    root: "invent",
                    rootPos: "动词",
                    suffixes: [
                      { suf: "-ion", pos: "名词", word: "invention" }
                    ],
                    traps: [
                      { root: "arriv", suf: "-al", pos: "名词", word: "arrival", note: "-al 不总是形容词！arrival 是名词——后缀认错会猜错词性。" }
                    ],
                    hint: "给 invent 穿 -ion 外套变名词；小心 arrival：-al 在这里是名词后缀。"
                  }
                }
              ],
              point: "阅读遇到生词：先看后缀判词性，再猜词义。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr11.2.2-p3",
              kind: "explain",
              title: "从词根猜词性",
              lead: "还记得吗？上一页 -al 穿在 arrival 身上，变出的是名词。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr11.2.2-e1", "gr11.2.2-e2", "gr11.2.2-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "阅读遇到生词：先看后缀判词性，再猜词义。",
                  condition: "-tion/-sion/-ment/-ness → 名词；-ize/-en → 动词；-ful/-less/-ous/-able/-al → 形容词（-al 例外：arrival、approval 是名词）；-ly → 副词（friendly 等卧底除外）。只猜义不判性，阅读容易栽。"
                },
                {
                  type: "bridge",
                  zh: "汉语猜生词靠上下文；英语多一个帮手：后缀。",
                  en: "英语的后缀像“制服”：看到 -tion 就知道是名词，看到 -ize 就知道是动词——先认制服（词性），再猜长相（词义），阅读速度翻倍。这是讲词根“猜词义”技能的升级版。",
                  unbridge: "英语就认这个理：词性是猜词义的脚手架，先判性再猜义。"
                },
                {
                  type: "spell",
                  title: "后缀拼写小动作：",
                  items: [
                    "去 e 加后缀：arrive → arrival；invent → invention（去 t 加 -ion）",
                    "直接加：modern → modernize；care → careful",
                    "拼写不改词性：arrival 再长也是名词，别被 -al 带跑"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "His arrive was late.",
                  wrongZh: "（✗ 错句）",
                  right: "His arrival was late.",
                  why: "arrive 是动词，作主语要用名词 arrival。"
                },
                {
                  type: "contrast",
                  wrong: "They will modern the school.",
                  wrongZh: "（✗ 错句）",
                  right: "They will modernize the old school.",
                  why: "modern 是形容词，作谓语要用动词 modernize。"
                }
              ],
              point: "猜词性：-tion 名词，-ize 动词；-al 小心 arrival；先判词性再猜义。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr11.2.2-p4",
              kind: "quiz",
              title: "练一练：后缀身份证",
              questions: [
                {
                  type: "choice",
                  stem: "invention 的词性是？",
                  options: ["名词", "动词", "形容词"],
                  answer: 0,
                  tip: "-tion 是名词后缀。"
                },
                {
                  type: "fill",
                  stemBefore: "modern →",
                  stemAfter: "（动词，使现代化）",
                  answer: "modernize",
                  accept: ["modernize"],
                  tip: "-ize 是动词后缀。"
                },
                {
                  type: "choice",
                  stem: "arrival 的词性是？",
                  options: ["形容词", "名词", "副词"],
                  answer: 1,
                  tip: "-al 卧底：arrival 是名词。"
                },
                {
                  type: "choice",
                  stem: "阅读遇到生词，正确姿势是？",
                  options: ["只猜中文意思", "先看后缀判词性，再猜词义", "跳过不看"],
                  answer: 1,
                  tip: "先判性再猜义。"
                }
              ],
              point: "自查：-tion 名词，-ize 动词；-al 小心 arrival；阅读先判词性再猜义。"
            }
          ]
        },
        {
          id: "gr11.2.3",
          title: "本章小结与习题",
          pages: [
            /* ---------- p1 观察页：回顾 ---------- */
            {
              id: "gr11.2.3-p1",
              kind: "observe",
              title: "三句话复习：前缀 / 后缀 / 一条链",
              sentences: [
                {
                  id: "gr11.2.3-e1",
                  en: "He is unhappy with the result.",
                  zh: "他对结果不满意。",
                  reg: "通用",
                  tagged: [
                    { w: "He", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "unhappy", role: "complem", label: "表语" },
                    { w: "with the result", role: "adverb", label: "状语" }
                  ]
                },
                {
                  id: "gr11.2.3-e2",
                  en: "Happiness takes time.",
                  zh: "幸福需要时间。",
                  reg: "通用",
                  tagged: [
                    { w: "Happiness", role: "subject", label: "主语" },
                    { w: "takes", role: "verb", label: "谓语" },
                    { w: "time", role: "object", label: "宾语" }
                  ]
                },
                {
                  id: "gr11.2.3-e3",
                  en: "They will succeed together.",
                  zh: "他们会一起成功。",
                  reg: "通用",
                  tagged: [
                    { w: "They", role: "subject", label: "主语" },
                    { w: "will succeed", role: "verb", label: "谓语" },
                    { w: "together", role: "adverb", label: "状语" }
                  ]
                }
              ],
              guess: {
                q: "三句话分别考了本章哪个知识点？",
                options: ["前缀 / 后缀 / 词性转换", "都是前缀", "都是后缀"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "一句话复习：unhappy（前缀）→ happiness（后缀）→ succeed（词性转换）。"
            },
            /* ---------- p2 交互页：G1 tagging（综合拆分） ---------- */
            {
              id: "gr11.2.3-p2",
              kind: "interact",
              title: "期末考：前缀还是后缀？",
              exploreTip: "点一个标签，再点一个词块：拆出前缀 / 词根 / 后缀。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "un", role: "prefix", label: "前缀" },
                      { w: "happy", role: "root", label: "词根" }
                    ],
                    slots: [
                      { role: "prefix", label: "前缀" },
                      { role: "root", label: "词根" },
                      { role: "suffix", label: "后缀" }
                    ],
                    hint: "unhappy：un- 是什么？happy 是什么？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "happy", role: "root", label: "词根" },
                      { w: "ness", role: "suffix", label: "后缀" }
                    ],
                    slots: [
                      { role: "prefix", label: "前缀" },
                      { role: "root", label: "词根" },
                      { role: "suffix", label: "后缀" }
                    ],
                    hint: "happiness：happy 是什么？-ness 是什么？"
                  }
                }
              ],
              point: "前缀改义不改性，后缀改性——拆词先看位置。"
            },
            /* ---------- p3 讲解页：三表合一 ---------- */
            {
              id: "gr11.2.3-p3",
              kind: "explain",
              title: "本章小结：三表合一",
              lead: "本章小结——前缀改义、后缀改性、一词四形，三张表收网。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr11.2.3-e1", "gr11.2.3-e2", "gr11.2.3-e3"],
                  note: "先看现象，再看三表。"
                },
                {
                  type: "idcard",
                  rule: "本章三表：一、前缀表（改义不改性）；二、后缀词性总表（改性）；三、一词四形表。",
                  condition: "前缀：un-/in-/dis- 否定；mis- 错误；pre- 在前；re- 再；in- 见 b/m/p/l/r 变脸；un- 主要接形容词/分词。后缀：-ness/-tion/-ment/-ity 名词；-ful/-less/-ous/-able 形容词；-ly 副词（friendly 卧底）；-ize/-en 动词。一词四形：success/succeed/successful/successfully；book 零转换。"
                },
                {
                  type: "bridge",
                  zh: "本章是立交桥：讲词根解决“猜词义”，本章解决“猜词性”。",
                  en: "两边互相串门：前缀词条回讲词根查；后缀的讲法是本章新讲的。",
                  unbridge: "记住：前缀改义不改性，后缀改性，一词四形先看空要什么词性。"
                },
                {
                  type: "spell",
                  title: "三表速查（考前看一眼）：",
                  items: [
                    "前缀：un- 否定；in- 变脸 im-/il-/ir-；dis- 相反",
                    "后缀：-ness 名词；-ful 形容词；-ly 副词（friendly 卧底）；-ize 动词",
                    "一词四形：success/succeed/successful/successfully"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "She sings happy.",
                  wrongZh: "（✗ 错句）",
                  right: "She sings happily.",
                  why: "修饰动词用副词：happy 穿上 -ly 才变成副词。"
                }
              ],
              point: "这就是本章：前缀改义、后缀改性、一词四形。",
              pointScroll: true
            },
            /* ---------- p4 练习页：综合 ---------- */
            {
              id: "gr11.2.3-p4",
              kind: "quiz",
              title: "综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "impossible 里，im- 是什么？",
                  options: ["前缀（in- 的变脸）", "后缀", "词根"],
                  answer: 0,
                  tip: "im- = in- 遇到 p 的变脸，是前缀。"
                },
                {
                  type: "fill",
                  stemBefore: "happy →",
                  stemAfter: "（名词，幸福）",
                  answer: "happiness",
                  accept: ["happiness"],
                  tip: "y 变 i 再加 -ness。"
                },
                {
                  type: "choice",
                  stem: "succeed 的词性是？",
                  options: ["名词", "动词", "形容词"],
                  answer: 1,
                  tip: "succeed 是动词（ced- 家族）。"
                },
                {
                  type: "fill",
                  stemBefore: "nation →",
                  stemAfter: "（形容词，国家的）",
                  answer: "national",
                  accept: ["national"],
                  tip: "-al 多半是形容词。"
                }
              ],
              point: "自查三表：前缀改义、后缀改性、一词四形。"
            }
          ]
        }
      ]
    }
  ]
};
