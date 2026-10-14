/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr17：倒装、强调、省略与 it
 *
 * 数据口径（M5）：window.ENG_CH["gr17"] = { id, title, sentences, units[] }，
 * 与试点 gr05.js 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 本文件含 gr17 全部 7 课 × 4 页 = 28 页：
 *   p1 观察页（例句先行 + 分块标注 + Y1 先猜后验）
 *   p2 交互页（G1 tagging / G3 sentence-builder / G5 clause-slots / Y4 constituent-quiz）
 *   p3 讲解页（examples → idcard → bridge → contrast；spell 有则写）
 *   p4 练习页（Y3 判分：选择 + 填空）
 * 例句登记于 D3 三审台账 modules/english/data/_review/
 * ledger-gr17.json（本阶段状态 drafted，待英语专家队初审与红队终审）。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=生产队撰写（语法生产D队，2026-10-14）。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr17"] = {
  id: "gr17",
  title: "倒装、强调、省略与 it",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr17.json 逐字一致（本阶段 drafted）。 */
  sentences: {
    "gr17.1.1-e1": { en: "Here comes the bus.", zh: "公交车来了。", reg: "通用",
      tagged: [ { w: "Here", role: "adverb", label: "地点状语" }, { w: "comes", role: "verb", label: "谓语" }, { w: "the bus", role: "subject", label: "主语" } ] },
    "gr17.1.1-e2": { en: "Only then did I realize it.", zh: "直到那时我才明白。", reg: "通用",
      tagged: [ { w: "Only then", role: "adverb", label: "状语" }, { w: "did", role: "verb", label: "助动词" }, { w: "I", role: "subject", label: "主语" }, { w: "realize it", role: "verb", label: "动词原形" } ] },
    "gr17.1.1-e3": { en: "So do I.", zh: "我也是。", reg: "口语",
      tagged: [ { w: "So", role: "adverb", label: "副词" }, { w: "do", role: "verb", label: "谓语" }, { w: "I", role: "subject", label: "主语" } ] },
    "gr17.1.1-e4": { en: "Only then I realized it.", zh: "（✗ 错句）直到那时我才明白。", reg: "通用",
      tagged: [ { w: "Only then", role: "adverb", label: "状语" }, { w: "I", role: "subject", label: "主语（✗ 未倒装）" }, { w: "realized it", role: "verb", label: "谓语" } ] },
    "gr17.1.1-e6": { en: "Here comes he.", zh: "（✗ 错句）他来了。", reg: "通用",
      tagged: [ { w: "Here", role: "adverb", label: "地点状语" }, { w: "comes", role: "verb", label: "谓语" }, { w: "he", role: "subject", label: "主语（✗ 代词不倒装）" } ] },
    "gr17.1.1-e7": { en: "Here he comes.", zh: "他来了。", reg: "通用",
      tagged: [ { w: "Here", role: "adverb", label: "地点状语" }, { w: "he", role: "subject", label: "主语" }, { w: "comes", role: "verb", label: "谓语" } ] },
    "gr17.1.2-e1": { en: "Never have I seen it.", zh: "我从没见过它。", reg: "书面",
      tagged: [ { w: "Never", role: "adverb", label: "否定状语" }, { w: "have", role: "verb", label: "助动词" }, { w: "I", role: "subject", label: "主语" }, { w: "seen it", role: "verb", label: "动词" } ] },
    "gr17.1.2-e2": { en: "Hardly had he arrived when it rained.", zh: "他刚到，天就下雨了。", reg: "书面",
      tagged: [ { w: "Hardly", role: "adverb", label: "否定状语" }, { w: "had", role: "verb", label: "助动词" }, { w: "he", role: "subject", label: "主语" }, { w: "arrived", role: "verb", label: "动词" } ] },
    "gr17.1.2-e3": { en: "Not only did he come, but he also brought gifts.", zh: "他不但来了，还带来了礼物。", reg: "书面",
      tagged: [ { w: "Not only", role: "adverb", label: "否定状语" }, { w: "did", role: "verb", label: "助动词" }, { w: "he", role: "subject", label: "主语" }, { w: "come", role: "verb", label: "动词" } ] },
    "gr17.1.2-e4": { en: "Hardly he had arrived when it rained.", zh: "（✗ 错句）他刚到，天就下雨了。", reg: "书面",
      tagged: [ { w: "Hardly", role: "adverb", label: "否定状语" }, { w: "he", role: "subject", label: "主语（✗ 未倒装）" }, { w: "had arrived", role: "verb", label: "谓语" } ] },
    "gr17.1.2-e6": { en: "No sooner had he arrived when it rained.", zh: "（✗ 错句）他刚到，天就下雨了。", reg: "书面",
      tagged: [ { w: "No sooner", role: "adverb", label: "否定状语" }, { w: "had", role: "verb", label: "助动词" }, { w: "he", role: "subject", label: "主语" }, { w: "arrived when", role: "verb", label: "动词（✗ 配对）" } ] },
    "gr17.1.2-e7": { en: "No sooner had he arrived than it rained.", zh: "他刚到，天就下雨了。", reg: "书面",
      tagged: [ { w: "No sooner", role: "adverb", label: "否定状语" }, { w: "had", role: "verb", label: "助动词" }, { w: "he", role: "subject", label: "主语" }, { w: "arrived", role: "verb", label: "动词" } ] },
    "gr17.1.3-e1": { en: "It was yesterday that we met.", zh: "我们是昨天见面的（强调昨天）。", reg: "通用",
      tagged: [ { w: "It was", role: "subject", label: "形式主语" }, { w: "yesterday", role: "adverb", label: "被强调的状语" }, { w: "that we met", role: "clause", label: "从句" } ] },
    "gr17.1.3-e2": { en: "It is my mother who cooks for us.", zh: "是我妈妈给我们做饭（强调妈妈）。", reg: "通用",
      tagged: [ { w: "It is", role: "subject", label: "形式主语" }, { w: "my mother", role: "subject", label: "被强调的主语" }, { w: "who cooks for us", role: "clause", label: "从句" } ] },
    "gr17.1.3-e3": { en: "It was not until 10 that he came.", zh: "他直到 10 点才来。", reg: "通用",
      tagged: [ { w: "It was", role: "subject", label: "形式主语" }, { w: "not until 10", role: "adverb", label: "被强调的状语" }, { w: "that he came", role: "clause", label: "从句" } ] },
    "gr17.1.3-e4": { en: "It was yesterday when we met.", zh: "（✗ 错句）我们是昨天见面的。", reg: "通用",
      tagged: [ { w: "It was", role: "subject", label: "形式主语" }, { w: "yesterday", role: "adverb", label: "被强调的状语" }, { w: "when we met", role: "clause", label: "从句（✗ 不用 when）" } ] },
    "gr17.1.3-e6": { en: "It was my mother cooks for us.", zh: "（✗ 错句）是我妈妈给我们做饭。", reg: "通用",
      tagged: [ { w: "It was", role: "subject", label: "形式主语（✗ 框缺一半）" }, { w: "my mother cooks for us", role: "subject", label: "主语" } ] },
    "gr17.1.3-e7": { en: "It was in 2020 that we moved here.", zh: "我们是 2020 年搬到这儿的（强调 2020 年）。", reg: "通用",
      tagged: [ { w: "It was", role: "subject", label: "形式主语" }, { w: "in 2020", role: "adverb", label: "被强调的状语" }, { w: "that we moved here", role: "clause", label: "从句" } ] },
    "gr17.2.1-e1": { en: "Have you finished? Yes, I have.", zh: "“你做完了吗？”“做完了。”", reg: "口语",
      tagged: [ { w: "Yes", role: "adverb", label: "回答" }, { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "助动词（省了 finished）" } ] },
    "gr17.2.1-e2": { en: "He likes tea and she coffee.", zh: "他喜欢茶，她喜欢咖啡。", reg: "书面",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "likes tea", role: "verb", label: "谓语 + 宾语" }, { w: "she", role: "subject", label: "主语" }, { w: "coffee", role: "object", label: "宾语（省了 likes）" } ] },
    "gr17.2.1-e3": { en: "Although tired, he kept working.", zh: "虽然累了，他继续工作。", reg: "书面",
      tagged: [ { w: "Although", role: "adverb", label: "连词" }, { w: "tired", role: "complem", label: "表语（省了 he was）" }, { w: "he", role: "subject", label: "主语" }, { w: "kept working", role: "verb", label: "谓语" } ] },
    "gr17.2.1-e4": { en: "Did you finish? Yes, I am.", zh: "（✗ 错句）“你做完了吗？”“嗯。”", reg: "口语",
      tagged: [ { w: "Yes", role: "adverb", label: "回答" }, { w: "I", role: "subject", label: "主语" }, { w: "am", role: "verb", label: "助动词（✗ 错配）" } ] },
    "gr17.2.1-e5": { en: "Did you finish? Yes, I did.", zh: "“你做完了吗？”“做完了。”", reg: "口语",
      tagged: [ { w: "Yes", role: "adverb", label: "回答" }, { w: "I", role: "subject", label: "主语" }, { w: "did", role: "verb", label: "助动词" } ] },
    "gr17.2.1-e6": { en: "Although tired, the work went on.", zh: "（✗ 错句）虽然累了，工作继续。", reg: "书面",
      tagged: [ { w: "Although", role: "adverb", label: "连词" }, { w: "tired", role: "complem", label: "表语（✗ 主语不一致）" }, { w: "the work", role: "subject", label: "主语" }, { w: "went on", role: "verb", label: "谓语" } ] },
    "gr17.2.2-e1": { en: "It is raining.", zh: "在下雨。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "空主语" }, { w: "is raining", role: "verb", label: "谓语" } ] },
    "gr17.2.2-e2": { en: "It is important to learn English.", zh: "学英语很重要。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "important", role: "complem", label: "表语" }, { w: "to learn English", role: "subject", label: "真正主语" } ] },
    "gr17.2.2-e3": { en: "I find it hard to learn English.", zh: "我发现学英语很难。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "find", role: "verb", label: "谓语" }, { w: "it", role: "object", label: "形式宾语" }, { w: "hard", role: "complem", label: "宾补" }, { w: "to learn English", role: "object", label: "真正宾语" } ] },
    "gr17.2.2-e4": { en: "I find hard to learn English.", zh: "（✗ 错句）我发现学英语很难。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "find", role: "verb", label: "谓语" }, { w: "hard", role: "complem", label: "宾补（✗ 缺 it）" }, { w: "to learn English", role: "object", label: "真正宾语" } ] },
    "gr17.2.2-e6": { en: "Is raining.", zh: "（✗ 错句）在下雨。", reg: "通用",
      tagged: [ { w: "Is raining", role: "verb", label: "谓语（✗ 缺主语）" } ] },
    "gr17.2.2-e7": { en: "I have a new bike. It is red.", zh: "我有一辆新自行车。它是红色的。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "谓语" }, { w: "a new bike", role: "object", label: "宾语" } ] },
    "gr17.2.3-e1": { en: "It was in 2020 that we moved here.", zh: "我们是 2020 年搬到这儿的（强调）。", reg: "通用",
      tagged: [ { w: "It was", role: "subject", label: "强调框前半" }, { w: "in 2020", role: "adverb", label: "被强调部分" }, { w: "that we moved here", role: "clause", label: "强调框后半" } ] },
    "gr17.2.3-e2": { en: "The year that we moved here was 2020.", zh: "我们搬到这儿的那一年是 2020 年（定语从句）。", reg: "通用",
      tagged: [ { w: "The year", role: "subject", label: "先行词" }, { w: "that we moved here", role: "attrib", label: "定语从句" }, { w: "was 2020", role: "verb", label: "谓语" } ] },
    "gr17.2.3-e3": { en: "There is a book on the desk.", zh: "桌上有一本书。", reg: "通用",
      tagged: [ { w: "There is", role: "verb", label: "there be" }, { w: "a book", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr17.2.3-e4": { en: "There has a book on the desk.", zh: "（✗ 错句）桌上有一本书。", reg: "通用",
      tagged: [ { w: "There has", role: "verb", label: "there be（✗ 不用 have）" }, { w: "a book", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr17.2.3-e6": { en: "The year that we moved here it was 2020.", zh: "（✗ 错句）我们搬到这儿的那一年是 2020 年。", reg: "通用",
      tagged: [ { w: "The year", role: "subject", label: "先行词" }, { w: "that we moved here", role: "attrib", label: "定语从句" }, { w: "it", role: "subject", label: "主语（✗ 多余）" }, { w: "was 2020", role: "verb", label: "谓语" } ] },
    "gr17.2.3-e7": { en: "Neither can he.", zh: "他也不能。", reg: "口语",
      tagged: [ { w: "Neither", role: "adverb", label: "副词" }, { w: "can", role: "verb", label: "谓语" }, { w: "he", role: "subject", label: "主语" } ] },
    "gr17.2.4-e1": { en: "Only then did I know the truth.", zh: "直到那时我才知道真相。", reg: "通用",
      tagged: [ { w: "Only then", role: "adverb", label: "状语" }, { w: "did", role: "verb", label: "助动词" }, { w: "I", role: "subject", label: "主语" }, { w: "know the truth", role: "verb", label: "动词" } ] },
    "gr17.2.4-e2": { en: "It is Tom who broke the window.", zh: "是汤姆打碎了窗户（强调汤姆）。", reg: "通用",
      tagged: [ { w: "It is", role: "subject", label: "强调框前半" }, { w: "Tom", role: "subject", label: "被强调的主语" }, { w: "who broke the window", role: "clause", label: "强调框后半" } ] },
    "gr17.2.4-e3": { en: "I find it easy to make friends.", zh: "我发现交朋友很容易。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "find", role: "verb", label: "谓语" }, { w: "it", role: "object", label: "形式宾语" }, { w: "easy", role: "complem", label: "宾补" }, { w: "to make friends", role: "object", label: "真正宾语" } ] },
    "gr17.2.4-e4": { en: "Only then I knew the truth.", zh: "（✗ 错句）直到那时我才知道真相。", reg: "通用",
      tagged: [ { w: "Only then", role: "adverb", label: "状语" }, { w: "I", role: "subject", label: "主语（✗ 未倒装）" }, { w: "knew the truth", role: "verb", label: "谓语" } ] },
    "gr17.2.4-e6": { en: "I find easy to make friends.", zh: "（✗ 错句）我发现交朋友很容易。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "find", role: "verb", label: "谓语" }, { w: "easy", role: "complem", label: "宾补（✗ 缺 it）" }, { w: "to make friends", role: "object", label: "真正宾语" } ] },
    "gr17.2.4-e7": { en: "Hardly had he left when it rained.", zh: "他刚离开，天就下雨了。", reg: "书面",
      tagged: [ { w: "Hardly", role: "adverb", label: "否定状语" }, { w: "had", role: "verb", label: "助动词" }, { w: "he", role: "subject", label: "主语" }, { w: "left", role: "verb", label: "动词" } ] }
  },
  units: [
    {
      id: "gr17-u1",
      title: "倒装与强调",
      lessons: [
        {
          id: "gr17.1.1",
          title: "完全倒装与部分倒装",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr17.1.1-p1",
              kind: "observe",
              title: "先看三句话：主语跑到哪去了？",
              sentences: [
                {
                  id: "gr17.1.1-e1",
                  en: "Here comes the bus.",
                  zh: "公交车来了。",
                  reg: "通用",
                  tagged: [
                    { w: "Here", role: "adverb", label: "地点状语" },
                    { w: "comes", role: "verb", label: "谓语" },
                    { w: "the bus", role: "subject", label: "主语" }
                  ]
                },
                {
                  id: "gr17.1.1-e2",
                  en: "Only then did I realize it.",
                  zh: "直到那时我才明白。",
                  reg: "通用",
                  tagged: [
                    { w: "Only then", role: "adverb", label: "状语" },
                    { w: "did", role: "verb", label: "助动词" },
                    { w: "I", role: "subject", label: "主语" },
                    { w: "realize it", role: "verb", label: "动词原形" }
                  ]
                },
                {
                  id: "gr17.1.1-e3",
                  en: "So do I.",
                  zh: "我也是。",
                  reg: "口语",
                  tagged: [
                    { w: "So", role: "adverb", label: "副词" },
                    { w: "do", role: "verb", label: "谓语" },
                    { w: "I", role: "subject", label: "主语" }
                  ]
                }
              ],
              guess: {
                q: "三句话里，主语都跑到哪去了？",
                options: ["主语跑到了谓语后面", "主语不见了", "语序和平时一样"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "主语让位、谓语提前——这就是倒装。"
            },
            /* ---------- p2 交互页：G1 tagging（倒装语序标注） ---------- */
            {
              id: "gr17.1.1-p2",
              kind: "interact",
              title: "标一标：倒装句的语序",
              exploreTip: "点一个标签，再点一个词块：倒装句里，主语藏在谓语后面。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Here", role: "adverb", label: "地点状语" },
                      { w: "comes", role: "verb", label: "谓语" },
                      { w: "the bus", role: "subject", label: "主语" }
                    ],
                    slots: [
                      { role: "adverb", label: "地点状语" },
                      { role: "verb", label: "谓语" },
                      { role: "subject", label: "主语" },
                      { role: "object", label: "宾语（干扰）" }
                    ],
                    hint: "Here comes the bus：主语 the bus 躲到谓语后面去了。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Only then", role: "adverb", label: "状语" },
                      { w: "did", role: "verb", label: "助动词" },
                      { w: "I", role: "subject", label: "主语" },
                      { w: "realize it", role: "verb", label: "动词原形" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "verb", label: "助动词/动词" },
                      { role: "subject", label: "主语" },
                      { role: "object", label: "宾语（干扰）" }
                    ],
                    hint: "Only then did I realize it：did 提前，主语 I 在后面。"
                  }
                }
              ],
              point: "倒装 = 谓语提前、主语让位；地点副词开头多半倒装。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr17.1.1-p3",
              kind: "explain",
              title: "完全倒装与部分倒装",
              lead: "还记得吗？你上一页标出 the bus 躲在 comes 后面——那就是完全倒装。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr17.1.1-e1", "gr17.1.1-e2", "gr17.1.1-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "倒装：把谓语（或助动词）放到主语前面。分两种：完全倒装（谓语全提前）、部分倒装（只提前助动词/情态动词）。",
                  condition: "完全倒装：地点/时间副词开头；here/there 开头主语是代词时不倒装（Here he comes.）。部分倒装：only + 状语开头；so/neither 表附和。注意：so 倒装表“也一样”，别和 so…that 混。"
                },
                {
                  type: "bridge",
                  zh: "汉语“车来了”语序不变；英语 Here comes the bus 把 comes 提前，像在喊“来了！”。",
                  en: "英语用倒装“划重点”：Here comes the bus 把地点放最前制造悬念；So do I 把 do 提前表示附和——语序本身会说话。",
                  unbridge: "这是英语的规矩：想强调开头的东西，就把谓语往前提。"
                },
                {
                  type: "contrast",
                  wrong: "Only then I realized it.",
                  wrongZh: "（✗ 错句）",
                  right: "Only then did I realize it.",
                  why: "only + 状语开头是倒装扳机，后面必须部分倒装：did 提前。"
                },
                {
                  type: "contrast",
                  wrong: "Here comes he.",
                  wrongZh: "（✗ 错句）",
                  right: "Here he comes.",
                  why: "here 开头、主语是代词（he）时不倒装——代词不让位。"
                }
              ],
              point: "这就是倒装：完全（谓语全提前）/ 部分（助动词提前）；代词主语不让位。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr17.1.1-p4",
              kind: "quiz",
              title: "练一练：倒装认出来了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "Here comes the bus. 是哪种倒装？",
                  options: ["完全倒装", "部分倒装", "不是倒装"],
                  answer: 0,
                  tip: "谓语 comes 整个提前到主语前面，是完全倒装。"
                },
                {
                  type: "fill",
                  stemBefore: "Only then",
                  stemAfter: "I realize it.（倒装）",
                  answer: "did",
                  accept: ["did"],
                  tip: "only 开头，后面助动词 did 提前。"
                },
                {
                  type: "choice",
                  stem: "So do I. 的意思是？",
                  options: ["我也是", "所以我做", "这样做"],
                  answer: 0,
                  tip: "so 倒装表附和：So do I. = 我也是。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Here comes he.", "Here he comes.", "Here come he."],
                  answer: 1,
                  tip: "主语是代词 he，here 开头不倒装。"
                }
              ],
              point: "自查：地点副词开头多半倒装；only 开头必倒装；代词主语不让位。"
            }
          ]
        },
        {
          id: "gr17.1.2",
          title: "否定词开头倒装",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr17.1.2-p1",
              kind: "observe",
              title: "先看三句话：否定词开头，后面怎么了？",
              sentences: [
                {
                  id: "gr17.1.2-e1",
                  en: "Never have I seen it.",
                  zh: "我从没见过它。",
                  reg: "书面",
                  tagged: [
                    { w: "Never", role: "adverb", label: "否定状语" },
                    { w: "have", role: "verb", label: "助动词" },
                    { w: "I", role: "subject", label: "主语" },
                    { w: "seen it", role: "verb", label: "动词" }
                  ]
                },
                {
                  id: "gr17.1.2-e2",
                  en: "Hardly had he arrived when it rained.",
                  zh: "他刚到，天就下雨了。",
                  reg: "书面",
                  tagged: [
                    { w: "Hardly", role: "adverb", label: "否定状语" },
                    { w: "had", role: "verb", label: "助动词" },
                    { w: "he", role: "subject", label: "主语" },
                    { w: "arrived", role: "verb", label: "动词" }
                  ]
                },
                {
                  id: "gr17.1.2-e3",
                  en: "Not only did he come, but he also brought gifts.",
                  zh: "他不但来了，还带来了礼物。",
                  reg: "书面",
                  tagged: [
                    { w: "Not only", role: "adverb", label: "否定状语" },
                    { w: "did", role: "verb", label: "助动词" },
                    { w: "he", role: "subject", label: "主语" },
                    { w: "come", role: "verb", label: "动词" }
                  ]
                }
              ],
              guess: {
                q: "三句话开头都是什么词？后面发生了什么？",
                options: ["否定词开头，后面倒装了", "疑问词开头，后面倒装了", "开头没什么特别"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "否定词开头 = 倒装扳机：一扳就倒装。"
            },
            /* ---------- p2 交互页：G1 tagging（触发词 + 倒装语序） ---------- */
            {
              id: "gr17.1.2-p2",
              kind: "interact",
              title: "标一标：否定触发词",
              exploreTip: "点一个标签，再点一个词块：先找触发词，再看倒装后的语序。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Hardly", role: "adverb", label: "否定触发词" },
                      { w: "had", role: "verb", label: "助动词" },
                      { w: "he", role: "subject", label: "主语" },
                      { w: "arrived", role: "verb", label: "动词" }
                    ],
                    slots: [
                      { role: "adverb", label: "否定触发词" },
                      { role: "verb", label: "助动词/动词" },
                      { role: "subject", label: "主语" }
                    ],
                    hint: "Hardly had he arrived：触发词是谁？助动词提前到哪了？"
                  }
                }
              ],
              point: "否定词开头，后面必须部分倒装；配对别串（no sooner…than）。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr17.1.2-p3",
              kind: "explain",
              title: "否定词开头倒装",
              lead: "还记得吗？你上一页标出 Hardly 是触发词，had 提前到了 he 前面。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr17.1.2-e1", "gr17.1.2-e2", "gr17.1.2-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "否定词/半否定词放句首，后面部分倒装。",
                  condition: "触发词表：never（从不）、hardly/scarcely（几乎不）、seldom（很少）、little（很少）、no sooner…than…（一…就…）、hardly…when…（一…就…）、not only…but also…（不但…而且…）。注意配对：no sooner 配 than，hardly 配 when，别串。"
                },
                {
                  type: "bridge",
                  zh: "汉语“他刚到，天就下雨了”语序正常；英语 Hardly had he arrived when… 把 had 提前，像按了快进键。",
                  en: "英语用倒装给否定词“加音量”：Never have I seen（我从没见过）比 I have never seen 更有力——否定词站 C 位，句子就要倒装让路。",
                  unbridge: "这是英语的规矩：否定词开头，后面必须倒装。"
                },
                {
                  type: "contrast",
                  wrong: "Hardly he had arrived when it rained.",
                  wrongZh: "（✗ 错句）",
                  right: "Hardly had he arrived when it rained.",
                  why: "hardly 开头是倒装扳机，助动词 had 必须提前。"
                },
                {
                  type: "contrast",
                  wrong: "No sooner had he arrived when it rained.",
                  wrongZh: "（✗ 错句）",
                  right: "No sooner had he arrived than it rained.",
                  why: "no sooner 固定配 than；hardly 才配 when。"
                }
              ],
              point: "这就是否定倒装：触发词开头必倒装；no sooner…than / hardly…when 别串。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr17.1.2-p4",
              kind: "quiz",
              title: "练一练：扳机认出来了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "哪个是否定倒装触发词？",
                  options: ["never", "often", "always"],
                  answer: 0,
                  tip: "never（从不）是否定词，开头触发倒装。"
                },
                {
                  type: "fill",
                  stemBefore: "Hardly",
                  stemAfter: "he arrived when it rained.",
                  answer: "had",
                  accept: ["had"],
                  tip: "hardly 开头，助动词 had 提前。"
                },
                {
                  type: "choice",
                  stem: "no sooner 的固定搭配是？",
                  options: ["no sooner…than…", "no sooner…when…", "no sooner…but…"],
                  answer: 0,
                  tip: "no sooner 配 than；hardly 配 when。"
                },
                {
                  type: "choice",
                  stem: "Not only did he come, but he also brought gifts. 中倒装的是？",
                  options: ["did 提前到 he 前面", "also 提前", "没有倒装"],
                  answer: 0,
                  tip: "not only 开头，did 提前：Not only did he come…"
                }
              ],
              point: "自查：否定词开头必倒装；no sooner…than / hardly…when 配对别串。"
            }
          ]
        },
        {
          id: "gr17.1.3",
          title: "强调句",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr17.1.3-p1",
              kind: "observe",
              title: "先看三句话：强调框框住了什么？",
              sentences: [
                {
                  id: "gr17.1.3-e1",
                  en: "It was yesterday that we met.",
                  zh: "我们是昨天见面的（强调昨天）。",
                  reg: "通用",
                  tagged: [
                    { w: "It was", role: "subject", label: "形式主语" },
                    { w: "yesterday", role: "adverb", label: "被强调的状语" },
                    { w: "that we met", role: "clause", label: "从句" }
                  ]
                },
                {
                  id: "gr17.1.3-e2",
                  en: "It is my mother who cooks for us.",
                  zh: "是我妈妈给我们做饭（强调妈妈）。",
                  reg: "通用",
                  tagged: [
                    { w: "It is", role: "subject", label: "形式主语" },
                    { w: "my mother", role: "subject", label: "被强调的主语" },
                    { w: "who cooks for us", role: "clause", label: "从句" }
                  ]
                },
                {
                  id: "gr17.1.3-e3",
                  en: "It was not until 10 that he came.",
                  zh: "他直到 10 点才来。",
                  reg: "通用",
                  tagged: [
                    { w: "It was", role: "subject", label: "形式主语" },
                    { w: "not until 10", role: "adverb", label: "被强调的状语" },
                    { w: "that he came", role: "clause", label: "从句" }
                  ]
                }
              ],
              guess: {
                q: "It is/was…that… 这个框，框住了什么？",
                options: ["框住了要强调的部分", "框住了一个定语从句", "框住了主语"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "It is/was…that… 是强调框：想强调谁，就把谁框进去。"
            },
            /* ---------- p2 交互页：G1 tagging（强调框拆解） ---------- */
            {
              id: "gr17.1.3-p2",
              kind: "interact",
              title: "拆一拆：强调框的两半",
              exploreTip: "点一个标签，再点一个词块：标出强调框的两半和被强调的部分。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "It was", role: "subject", label: "强调框前半" },
                      { w: "yesterday", role: "adverb", label: "被强调部分" },
                      { w: "that we met", role: "clause", label: "强调框后半" }
                    ],
                    slots: [
                      { role: "subject", label: "强调框前半" },
                      { role: "adverb", label: "被强调部分" },
                      { role: "clause", label: "强调框后半" }
                    ],
                    hint: "It was yesterday that we met：框住的是 yesterday。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "It is", role: "subject", label: "强调框前半" },
                      { w: "my mother", role: "adverb", label: "被强调部分" },
                      { w: "who cooks for us", role: "clause", label: "强调框后半" }
                    ],
                    slots: [
                      { role: "subject", label: "强调框前半" },
                      { role: "adverb", label: "被强调部分" },
                      { role: "clause", label: "强调框后半" }
                    ],
                    hint: "It is my mother who…：框住的是 my mother（强调人时 that 可换 who）。"
                  }
                }
              ],
              point: "强调框：It is/was…that…，想强调谁就框谁。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr17.1.3-p3",
              kind: "explain",
              title: "强调句",
              lead: "还记得吗？你上一页把 yesterday 框进了 It was…that…。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr17.1.3-e1", "gr17.1.3-e2", "gr17.1.3-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "强调句：It is/was + 被强调部分 + that + 句子其余部分。",
                  condition: "能强调主语、宾语、状语（不能强调谓语）；that 不可省略、不可换成 what；强调过去用 was，强调现在用 is；not…until… 强调（It was not until 10 that he came.）；与定语从句区别：强调句的 that 前没有先行词。"
                },
                {
                  type: "bridge",
                  zh: "汉语用重音强调：“是昨天见的面”；英语用句式强调：It was yesterday that…",
                  en: "英语把要强调的部分放进 It is…that… 的框里：It was yesterday that we met（强调昨天）vs It is my mother who…（强调妈妈，that 可换 who）——框里放谁，谁就是重点。",
                  unbridge: "这是英语的规矩：强调不用喊，用 It is…that… 框起来。"
                },
                {
                  type: "contrast",
                  wrong: "It was yesterday when we met.",
                  wrongZh: "（✗ 错句）",
                  right: "It was yesterday that we met.",
                  why: "强调句的框后半是 that，不能换成 when。"
                },
                {
                  type: "contrast",
                  wrong: "It was my mother cooks for us.",
                  wrongZh: "（✗ 错句）",
                  right: "It is my mother who cooks for us.",
                  why: "强调框是 It is…that/who…，框不能缺一半；强调人时 that 可换 who。"
                }
              ],
              point: "这就是强调句：It is/was…that… 框住被强调部分；that 不省不换；无先行词。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr17.1.3-p4",
              kind: "quiz",
              title: "练一练：强调框会用了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "It was yesterday that we met. 强调的是？",
                  options: ["昨天", "我们", "见面"],
                  answer: 0,
                  tip: "框里是 yesterday，强调时间状语。"
                },
                {
                  type: "fill",
                  stemBefore: "It",
                  stemAfter: "my mother who cooks for us.（现在）",
                  answer: "is",
                  accept: ["is"],
                  tip: "强调现在用 is，强调过去用 was。"
                },
                {
                  type: "choice",
                  stem: "强调句和定语从句的根本区别是？",
                  options: ["强调句的 that 前没有先行词", "定语从句没有 that", "没有区别"],
                  answer: 0,
                  tip: "It was…that… 里 that 前面没有被修饰的名词。"
                },
                {
                  type: "choice",
                  stem: "It was not until 10 that he came. 的意思是？",
                  options: ["他直到 10 点才来", "他 10 点之前来了", "他不是 10 点来的"],
                  answer: 0,
                  tip: "not…until… 强调：直到…才…"
                }
              ],
              point: "自查：It is/was…that… 框住被强调部分；that 不省不换；无先行词。"
            }
          ]
        }
      ]
    },
    {
      id: "gr17-u2",
      title: "省略与 it",
      lessons: [
        {
          id: "gr17.2.1",
          title: "省略",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr17.2.1-p1",
              kind: "observe",
              title: "先看三句话：哪些成分被“吃掉”了？",
              sentences: [
                {
                  id: "gr17.2.1-e1",
                  en: "Have you finished? Yes, I have.",
                  zh: "“你做完了吗？”“做完了。”",
                  reg: "口语",
                  tagged: [
                    { w: "Yes", role: "adverb", label: "回答" },
                    { w: "I", role: "subject", label: "主语" },
                    { w: "have", role: "verb", label: "助动词（省了 finished）" }
                  ]
                },
                {
                  id: "gr17.2.1-e2",
                  en: "He likes tea and she coffee.",
                  zh: "他喜欢茶，她喜欢咖啡。",
                  reg: "书面",
                  tagged: [
                    { w: "He", role: "subject", label: "主语" },
                    { w: "likes tea", role: "verb", label: "谓语 + 宾语" },
                    { w: "she", role: "subject", label: "主语" },
                    { w: "coffee", role: "object", label: "宾语（省了 likes）" }
                  ]
                },
                {
                  id: "gr17.2.1-e3",
                  en: "Although tired, he kept working.",
                  zh: "虽然累了，他继续工作。",
                  reg: "书面",
                  tagged: [
                    { w: "Although", role: "adverb", label: "连词" },
                    { w: "tired", role: "complem", label: "表语（省了 he was）" },
                    { w: "he", role: "subject", label: "主语" },
                    { w: "kept working", role: "verb", label: "谓语" }
                  ]
                }
              ],
              guess: {
                q: "三句话里，哪些成分被“吃掉”了？",
                options: ["重复的、能猜到的成分", "重要的成分", "主语都被吃掉了"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "省略是“熟人免介绍”：重复的、能猜到的，就不说了。"
            },
            /* ---------- p2 交互页：G1 tagging（省略还原） ---------- */
            {
              id: "gr17.2.1-p2",
              kind: "interact",
              title: "找一找：被省略的成分",
              exploreTip: "点一个标签，再点一个词块：找出被省略的成分藏在哪。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Although", role: "adverb", label: "连词" },
                      { w: "tired", role: "complem", label: "省略处" },
                      { w: "he", role: "subject", label: "主语" },
                      { w: "kept working", role: "verb", label: "谓语" }
                    ],
                    slots: [
                      { role: "adverb", label: "连词" },
                      { role: "complem", label: "省略处" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" }
                    ],
                    hint: "Although tired, he kept working：tired 前面少了什么？"
                  }
                }
              ],
              point: "省略省重复：省完必须能还原，成分不能残缺。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr17.2.1-p3",
              kind: "explain",
              title: "省略",
              lead: "还记得吗？上一页 tired 前面省了 he was。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr17.2.1-e1", "gr17.2.1-e2", "gr17.2.1-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "省略：把重复的、能还原的成分省掉，但省完后句子成分必须完整、意思不能变。",
                  condition: "三类可省：并列句中重复的成分；回答中重复的成分；although/while 后主语 + be 与主句主语一致时（Although (he was) tired, he kept working.）。铁律：省略后必须能还原；回答的助动词必须和问句一致。"
                },
                {
                  type: "bridge",
                  zh: "汉语“吃了吗？”“吃了。”也省略；英语 Yes, I have. 也一样。",
                  en: "不一样的是：英语省略后助动词不能乱配——问 Have you finished? 答用 have；问 Did you finish? 答用 did。汉语“吃了”一个顶俩，英语不行。",
                  unbridge: "这是英语的规矩：省略是省重复，不是省规则；助动词要和问句配对。"
                },
                {
                  type: "contrast",
                  wrong: "Did you finish? Yes, I am.",
                  wrongZh: "（✗ 错句）",
                  right: "Did you finish? Yes, I did.",
                  why: "问句是 Did…，回答的助动词必须配 did，不能配 am。"
                },
                {
                  type: "contrast",
                  wrong: "Although tired, the work went on.",
                  wrongZh: "（✗ 错句）",
                  right: "Although tired, he kept working.",
                  why: "although 省略：被省的主语须和主句一致——累的是 he，不是 work。"
                }
              ],
              point: "这就是省略：省重复；助动词配对；although 省主要求主语一致。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr17.2.1-p4",
              kind: "quiz",
              title: "练一练：省略还原",
              questions: [
                {
                  type: "choice",
                  stem: "—Have you finished? —正确的回答是？",
                  options: ["Yes, I have.", "Yes, I am.", "Yes, I do."],
                  answer: 0,
                  tip: "问 Have…，答用 have。"
                },
                {
                  type: "choice",
                  stem: "Although tired, he kept working. 省略了什么？",
                  options: ["he was", "he is", "they were"],
                  answer: 0,
                  tip: "although 后省了和主句主语一致的 he was。"
                },
                {
                  type: "choice",
                  stem: "下面省略正确的是？",
                  options: ["He likes tea and she coffee.", "He likes tea and she likes.", "He likes tea and coffee likes she."],
                  answer: 0,
                  tip: "并列后半省了重复的 likes。"
                },
                {
                  type: "fill",
                  stemBefore: "—Did she come? —Yes, she",
                  stemAfter: ".",
                  answer: "did",
                  accept: ["did"],
                  tip: "问 Did…，答 Yes, she did."
                }
              ],
              point: "自查：省略省重复；助动词配对；although 省主要求主语一致。"
            }
          ]
        },
        {
          id: "gr17.2.2",
          title: "it 的用法",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr17.2.2-p1",
              kind: "observe",
              title: "先看三句话：三个 it，都指东西吗？",
              sentences: [
                {
                  id: "gr17.2.2-e1",
                  en: "It is raining.",
                  zh: "在下雨。",
                  reg: "通用",
                  tagged: [
                    { w: "It", role: "subject", label: "空主语" },
                    { w: "is raining", role: "verb", label: "谓语" }
                  ]
                },
                {
                  id: "gr17.2.2-e2",
                  en: "It is important to learn English.",
                  zh: "学英语很重要。",
                  reg: "通用",
                  tagged: [
                    { w: "It", role: "subject", label: "形式主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "important", role: "complem", label: "表语" },
                    { w: "to learn English", role: "subject", label: "真正主语" }
                  ]
                },
                {
                  id: "gr17.2.2-e3",
                  en: "I find it hard to learn English.",
                  zh: "我发现学英语很难。",
                  reg: "通用",
                  tagged: [
                    { w: "I", role: "subject", label: "主语" },
                    { w: "find", role: "verb", label: "谓语" },
                    { w: "it", role: "object", label: "形式宾语" },
                    { w: "hard", role: "complem", label: "宾补" },
                    { w: "to learn English", role: "object", label: "真正宾语" }
                  ]
                }
              ],
              guess: {
                q: "三个 it，哪个 it 真正指东西？",
                options: ["都没指东西，都是占位", "第一个指雨", "第三个指英语"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "it 常当“占位符”：天气 it、形式主语 it、形式宾语 it——先占位，真正的主角在后面。"
            },
            /* ---------- p2 交互页：G1 tagging（it 身份标注） ---------- */
            {
              id: "gr17.2.2-p2",
              kind: "interact",
              title: "标一标：it 的三种身份",
              exploreTip: "点一个标签，再点一个词块：it 是空主语、形式主语，还是形式宾语？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "find", role: "verb", label: "谓语" },
                      { w: "it", role: "object", label: "形式宾语" },
                      { w: "hard", role: "complem", label: "宾补" },
                      { w: "to learn English", role: "object", label: "真正宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "形式宾语/真正宾语" },
                      { role: "complem", label: "宾补" }
                    ],
                    hint: "I find it hard to learn English：it 先占位，真正的宾语在后面。"
                  }
                }
              ],
              point: "it 是“万能替补”：先占位，真正的主角在后面。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr17.2.2-p3",
              kind: "explain",
              title: "it 的用法",
              lead: "还记得吗？你上一页标出 it 是形式宾语，先占着宾语的位置。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr17.2.2-e1", "gr17.2.2-e2", "gr17.2.2-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "it 四用法：指代 it（指前文的事物）；空主语（天气、时间：It is raining.）；形式主语（It is + adj. + to do/that…，真正主语在后）；形式宾语（find/think + it + adj. + to do，真正宾语在后）。",
                  condition: "形式主语：It is important to learn English.（= To learn English is important.，少用）；形式宾语：it 不能省；it 指代不明是病句（it 必须找得到前文对应）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“下雨了”没有主语；英语不行，句子不能没有主语，就拉 it 来凑数。",
                  en: "it 是英语的“万能替补”：天气没主语，it 顶上；真正的主语太长，it 先顶班；宾语太长，it 先占位。",
                  unbridge: "这是英语的规矩：it 自己没意思，专门给“迟到”的主角占位。"
                },
                {
                  type: "contrast",
                  wrong: "I find hard to learn English.",
                  wrongZh: "（✗ 错句）",
                  right: "I find it hard to learn English.",
                  why: "find 后直接跟形容词 hard 缺了宾语——it 先占着宾语的位置，不能省。"
                },
                {
                  type: "contrast",
                  wrong: "Is raining.",
                  wrongZh: "（✗ 错句）",
                  right: "It is raining.",
                  why: "英语句子不能没有主语，天气句用 it 当空主语凑数。"
                }
              ],
              point: "这就是 it：四用法；形式主语/宾语的 it 不能省；指代要清楚。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr17.2.2-p4",
              kind: "quiz",
              title: "练一练：it 的身份",
              questions: [
                {
                  type: "choice",
                  stem: "It is raining. 里 it 是？",
                  options: ["空主语", "指代雨", "形式宾语"],
                  answer: 0,
                  tip: "天气 it：句子不能没有主语，it 凑数。"
                },
                {
                  type: "choice",
                  stem: "It is important to learn English. 里真正的主语是？",
                  options: ["to learn English", "It", "important"],
                  answer: 0,
                  tip: "it 是形式主语，真正主语是 to learn English。"
                },
                {
                  type: "fill",
                  stemBefore: "I find",
                  stemAfter: "hard to learn English.",
                  answer: "it",
                  accept: ["it"],
                  tip: "形式宾语 it 不能省。"
                },
                {
                  type: "choice",
                  stem: "I find it hard to learn English. 中 it 的作用？",
                  options: ["形式宾语，占位", "指代 English", "没有作用可删"],
                  answer: 0,
                  tip: "it 先占宾语位，真正宾语 to learn English 在后。"
                }
              ],
              point: "自查：it 四用法；形式主语/宾语的 it 不能省；指代要清楚。"
            }
          ]
        },
        {
          id: "gr17.2.3",
          title: "特殊句式综合辨析",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr17.2.3-p1",
              kind: "observe",
              title: "先看三句话：都有 that，身份一样吗？",
              sentences: [
                {
                  id: "gr17.2.3-e1",
                  en: "It was in 2020 that we moved here.",
                  zh: "我们是 2020 年搬到这儿的（强调）。",
                  reg: "通用",
                  tagged: [
                    { w: "It was", role: "subject", label: "强调框前半" },
                    { w: "in 2020", role: "adverb", label: "被强调部分" },
                    { w: "that we moved here", role: "clause", label: "强调框后半" }
                  ]
                },
                {
                  id: "gr17.2.3-e2",
                  en: "The year that we moved here was 2020.",
                  zh: "我们搬到这儿的那一年是 2020 年（定语从句）。",
                  reg: "通用",
                  tagged: [
                    { w: "The year", role: "subject", label: "先行词" },
                    { w: "that we moved here", role: "attrib", label: "定语从句" },
                    { w: "was 2020", role: "verb", label: "谓语" }
                  ]
                },
                {
                  id: "gr17.2.3-e3",
                  en: "There is a book on the desk.",
                  zh: "桌上有一本书。",
                  reg: "通用",
                  tagged: [
                    { w: "There is", role: "verb", label: "there be" },
                    { w: "a book", role: "subject", label: "主语" },
                    { w: "on the desk", role: "adverb", label: "状语" }
                  ]
                }
              ],
              guess: {
                q: "e1 和 e2 都有 that we moved here，身份一样吗？",
                options: ["不一样：e1 是强调句，e2 是定语从句", "一样，都是定语从句", "一样，都是强调句"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "都有 that，不一定是同一种句：看 that 前面有没有先行词。"
            },
            /* ---------- p2 交互页：G5 从句槽（强调 vs 定语） ---------- */
            {
              id: "gr17.2.3-p2",
              kind: "interact",
              title: "从句槽：定语从句进哪个槽？",
              exploreTip: "把从句块放进对的槽：定语从句才能进定语槽，放错会弹回来。",
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
                    hint: "定语从句修饰名词：哪个从句能进定语槽？"
                  }
                }
              ],
              point: "that 一词多能：看成分定身份；定语从句修饰名词。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr17.2.3-p3",
              kind: "explain",
              title: "特殊句式综合辨析",
              lead: "还记得吗？It was in 2020 that… 和 The year that… 长得像，身份完全不同。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr17.2.3-e1", "gr17.2.3-e2", "gr17.2.3-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "综合辨析三问：一、It was…that… 有没有先行词？没有→强调句；有→定语从句。二、倒装还是强调？倒装变语序（Here comes…），强调加框（It is…that…）。三、there be 还是 have？表“存在”用 there be，不用 have。",
                  condition: "强调句：It was in 2020 that…（that 前无先行词）；定语从句：The year that…（有先行词）；there be vs have：There is a book…（✓）/ There has a book…（✗）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“是 2020 年搬的”和“搬的那一年是 2020”意思接近，英语却是两种句式。",
                  en: "英语看 that 的“身份证”：It was in 2020 that… 里 that 前没有名词，是强调框的一部分；The year that… 里 that 前有 the year，是定语从句的连接词——同一个 that，两种身份。",
                  unbridge: "这是英语的规矩：that 一词多能，看它在句中当什么成分。"
                },
                {
                  type: "contrast",
                  wrong: "There has a book on the desk.",
                  wrongZh: "（✗ 错句）",
                  right: "There is a book on the desk.",
                  why: "表“存在”用 there be，不用 there has。"
                },
                {
                  type: "contrast",
                  wrong: "The year that we moved here it was 2020.",
                  wrongZh: "（✗ 错句）",
                  right: "The year that we moved here was 2020.",
                  why: "that 在从句中作主语，it 多余——that 在，it 走。"
                }
              ],
              point: "综合辨析：that 看身份；there be 不用 have；that 在 it 走。",
              pointScroll: true
            },
            /* ---------- p4 练习页：综合改错热身 ---------- */
            {
              id: "gr17.2.3-p4",
              kind: "quiz",
              title: "综合改错热身",
              questions: [
                {
                  type: "choice",
                  stem: "It was in 2020 that we moved here. 是？",
                  options: ["强调句", "定语从句", "倒装句"],
                  answer: 0,
                  tip: "that 前无先行词，是强调句。"
                },
                {
                  type: "choice",
                  stem: "The year that we moved here was 2020. 里 that 是？",
                  options: ["定语从句关系代词", "强调句的 that", "连词"],
                  answer: 0,
                  tip: "that 前有先行词 the year，是定语从句。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["There has a book on the desk.", "There is a book on the desk.", "There are a book on the desk."],
                  answer: 1,
                  tip: "表存在用 there be；a book 单数用 is。"
                },
                {
                  type: "choice",
                  stem: "The year that we moved here it was 2020. 错在？",
                  options: ["多了一个 it", "that 用错了", "was 用错了"],
                  answer: 0,
                  tip: "that 在从句中作主语，it 没地方站。"
                }
              ],
              point: "自查：that 看身份（有无先行词）；there be 不用 have；that 在 it 走。"
            }
          ]
        },
        {
          id: "gr17.2.4",
          title: "本章小结与习题",
          pages: [
            /* ---------- p1 观察页：回顾 ---------- */
            {
              id: "gr17.2.4-p1",
              kind: "observe",
              title: "三句话复习：倒装 / 强调 / it",
              sentences: [
                {
                  id: "gr17.2.4-e1",
                  en: "Only then did I know the truth.",
                  zh: "直到那时我才知道真相。",
                  reg: "通用",
                  tagged: [
                    { w: "Only then", role: "adverb", label: "状语" },
                    { w: "did", role: "verb", label: "助动词" },
                    { w: "I", role: "subject", label: "主语" },
                    { w: "know the truth", role: "verb", label: "动词" }
                  ]
                },
                {
                  id: "gr17.2.4-e2",
                  en: "It is Tom who broke the window.",
                  zh: "是汤姆打碎了窗户（强调汤姆）。",
                  reg: "通用",
                  tagged: [
                    { w: "It is", role: "subject", label: "强调框前半" },
                    { w: "Tom", role: "subject", label: "被强调的主语" },
                    { w: "who broke the window", role: "clause", label: "强调框后半" }
                  ]
                },
                {
                  id: "gr17.2.4-e3",
                  en: "I find it easy to make friends.",
                  zh: "我发现交朋友很容易。",
                  reg: "通用",
                  tagged: [
                    { w: "I", role: "subject", label: "主语" },
                    { w: "find", role: "verb", label: "谓语" },
                    { w: "it", role: "object", label: "形式宾语" },
                    { w: "easy", role: "complem", label: "宾补" },
                    { w: "to make friends", role: "object", label: "真正宾语" }
                  ]
                }
              ],
              guess: {
                q: "三句话分别来自本章哪一课？",
                options: ["倒装 / 强调 / it", "强调 / 倒装 / it", "都是强调"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "倒装变语序，强调加框，it 占位——三剑客齐了。"
            },
            /* ---------- p2 交互页：Y4 成分标注练习（综合） ---------- */
            {
              id: "gr17.2.4-p2",
              kind: "interact",
              title: "综合练习：标出成分",
              exploreTip: "限时标注三句话的成分：看看你分不分得清倒装、强调和 it。",
              widgets: [
                {
                  type: "constituent-quiz",
                  params: {
                    items: [
                      { id: "q1", sentence: [ { w: "Here", role: "adverb" }, { w: "comes", role: "verb" }, { w: "the bus", role: "subject" } ] },
                      { id: "q2", sentence: [ { w: "It was", role: "subject" }, { w: "yesterday", role: "adverb" }, { w: "that we met", role: "clause" } ] },
                      { id: "q3", sentence: [ { w: "I", role: "subject" }, { w: "find", role: "verb" }, { w: "it", role: "object" }, { w: "hard", role: "complem" } ] }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" },
                      { role: "adverb", label: "状语" },
                      { role: "complem", label: "补语" },
                      { role: "clause", label: "从句块" }
                    ],
                    rounds: 3,
                    hint: "综合练习：标出每句话的成分，顺手复习倒装、强调和 it。"
                  }
                }
              ],
              point: "倒装找主语（在谓语后），强调找框，it 找占位。"
            },
            /* ---------- p3 讲解页：本章总表 ---------- */
            {
              id: "gr17.2.4-p3",
              kind: "explain",
              title: "本章小结：总表",
              lead: "还记得吗？倒装、强调、省略、it——四个话题，其实讲一件事：英语用“句式”表达意思。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr17.2.4-e1", "gr17.2.4-e2", "gr17.2.4-e3"],
                  note: "先看现象，再看总表。"
                },
                {
                  type: "idcard",
                  rule: "本章总表：倒装（完全/部分；否定词开头；so/neither）；强调句（It is/was…that…）；省略（三类）；it（指代/空主语/形式主语/形式宾语）。",
                  condition: "高考高频：倒装触发词（only/never/hardly/not only）；强调句 that 不省；省略助动词配对；形式宾语 it 不省。"
                },
                {
                  type: "bridge",
                  zh: "本章四个话题，其实讲一件事：英语用“句式”表达意思，不只靠单词。",
                  en: "倒装用语序说话，强调用框说话，省略用“不说”说话，it 用占位说话——高考考的就是这些“句式语言”。",
                  unbridge: "记住：见 only/never 先想倒装；见 It is…that… 先看有没有先行词；见 find…to do 先找 it。"
                },
                {
                  type: "contrast",
                  wrong: "Only then I knew the truth.",
                  wrongZh: "（✗ 错句）",
                  right: "Only then did I know the truth.",
                  why: "only 开头必倒装。"
                },
                {
                  type: "contrast",
                  wrong: "I find easy to make friends.",
                  wrongZh: "（✗ 错句）",
                  right: "I find it easy to make friends.",
                  why: "形式宾语 it 不能省。"
                }
              ],
              point: "这就是本章：倒装变语序，强调加框，省略省重复，it 占位。",
              pointScroll: true
            },
            /* ---------- p4 练习页：综合 ---------- */
            {
              id: "gr17.2.4-p4",
              kind: "quiz",
              title: "综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "Never have I seen it. 触发倒装的是？",
                  options: ["Never", "have", "I"],
                  answer: 0,
                  tip: "Never 是否定触发词，开头触发倒装。"
                },
                {
                  type: "choice",
                  stem: "It is Tom who broke the window. 强调的是？",
                  options: ["Tom", "window", "broke"],
                  answer: 0,
                  tip: "框里是 Tom，强调主语。"
                },
                {
                  type: "fill",
                  stemBefore: "Not only",
                  stemAfter: "he come, but he also brought gifts.",
                  answer: "did",
                  accept: ["did"],
                  tip: "not only 开头，did 提前。"
                },
                {
                  type: "choice",
                  stem: "—Did you finish? —Yes, I ___.",
                  options: ["did", "am", "do"],
                  answer: 0,
                  tip: "问 Did…，答 did。"
                }
              ],
              point: "自查：倒装触发词表；强调看先行词；省略配对；it 占位。"
            }
          ]
        }
      ]
    }
  ]
};