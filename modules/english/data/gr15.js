/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr15：状语从句
 *
 * 数据口径（M5）：window.ENG_CH["gr15"] = { id, title, sentences, units }，
 * 与数学 window.MATH_CH 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 单元 gr15.1 时间、条件、原因、目的、结果（gr15.1.1–gr15.1.5）·
 * 单元 gr15.2 让步、比较、方式与总表（gr15.2.1–gr15.2.4）。每课：
 * 观察页（例句先行 + Y1 先猜后验）→ 交互页（clause-slots /
 * tagging / sentence-builder）→ 讲解页（examples → idcard →
 * bridge → spell → contrast）→ 练习页（Y3 判分：choice / fill）。
 * 例句全部来自 D3 三审台账（modules/english/data/_review/
 * ledger-gr15.json），id 一一对应，未终审例句不得入库。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=红队终审通过（见台账 first/final 记录）。
 * 撰写：语法生产C队（2026-10-14），状态 drafted，待三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr15"] = {
  id: "gr15",
  title: "状语从句",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr15.json 逐字一致。状语从句整体先标为
   * “ 状语从句 ”成分块，内部结构在交互页 / 讲解页中拆解。 */
  sentences: {
    /* ---------- gr15.1.1 时间状语从句 ---------- */
    "gr15.1.1-e1": { en: "I'll call you as soon as I arrive.", zh: "我一到就给你打电话。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "'ll", role: "verb", label: "情态动词" }, { w: "call", role: "verb", label: "动词原形" }, { w: "you", role: "object", label: "宾语" }, { w: "as soon as I arrive", role: "adverb", label: "时间状语从句" } ] },
    "gr15.1.1-e2": { en: "While I was cooking, he watched TV.", zh: "我做饭时，他在看电视。", reg: "通用",
      tagged: [ { w: "While I was cooking", role: "adverb", label: "时间状语从句" }, { w: "he", role: "subject", label: "主语" }, { w: "watched", role: "verb", label: "谓语" }, { w: "TV", role: "object", label: "宾语" } ] },
    "gr15.1.1-e3": { en: "When I got home, my mother was cooking.", zh: "我到家时，妈妈正在做饭。", reg: "通用",
      tagged: [ { w: "When I got home", role: "adverb", label: "时间状语从句" }, { w: "my mother", role: "subject", label: "主语" }, { w: "was cooking", role: "verb", label: "谓语" } ] },
    "gr15.1.1-e4": { en: "By the time we arrived, the film had started.", zh: "我们到时，电影已经开演了。", reg: "通用",
      tagged: [ { w: "By the time we arrived", role: "adverb", label: "时间状语从句" }, { w: "the film", role: "subject", label: "主语" }, { w: "had started", role: "verb", label: "谓语" } ] },
    "gr15.1.1-e5": { en: "I'll call you as soon as I will arrive.", zh: "（✗ 错句）本想说“ 我一到就给你打电话 ”。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "'ll", role: "verb", label: "情态动词" }, { w: "call", role: "verb", label: "动词原形" }, { w: "you", role: "object", label: "宾语" }, { w: "as soon as I will arrive", role: "adverb", label: "时间状语从句（时态错）" } ] },
    "gr15.1.1-e6": { en: "When he comes, tell me.", zh: "他来时告诉我。", reg: "通用",
      tagged: [ { w: "When he comes", role: "adverb", label: "时间状语从句" }, { w: "tell", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] },
    "gr15.1.1-e7": { en: "As soon as she heard the news, she left.", zh: "她一听到消息就离开了。", reg: "通用",
      tagged: [ { w: "As soon as she heard the news", role: "adverb", label: "时间状语从句" }, { w: "she", role: "subject", label: "主语" }, { w: "left", role: "verb", label: "谓语" } ] },
    /* ---------- gr15.1.2 条件状语从句 ---------- */
    "gr15.1.2-e1": { en: "If it rains, we will stay at home.", zh: "如果下雨，我们就待在家里。", reg: "通用",
      tagged: [ { w: "If it rains", role: "adverb", label: "条件状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "stay", role: "verb", label: "动词原形" }, { w: "at home", role: "adverb", label: "状语" } ] },
    "gr15.1.2-e2": { en: "Unless you hurry, you will be late.", zh: "除非你抓紧，否则会迟到。", reg: "通用",
      tagged: [ { w: "Unless you hurry", role: "adverb", label: "条件状语从句" }, { w: "you", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "late", role: "complem", label: "表语" } ] },
    "gr15.1.2-e3": { en: "If you study hard, you will pass.", zh: "如果你努力学习，就会通过。", reg: "通用",
      tagged: [ { w: "If you study hard", role: "adverb", label: "条件状语从句" }, { w: "you", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "pass", role: "verb", label: "动词原形" } ] },
    "gr15.1.2-e4": { en: "Unless you don't hurry, you will be late.", zh: "（✗ 错句）本想说“ 除非你抓紧，否则会迟到 ”。", reg: "通用",
      tagged: [ { w: "Unless you don't hurry", role: "adverb", label: "条件状语从句（双重否定）" }, { w: "you", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "late", role: "complem", label: "表语" } ] },
    "gr15.1.2-e5": { en: "If it will rain, we will stay at home.", zh: "（✗ 错句）本想说“ 如果下雨，我们就待在家里 ”。", reg: "通用",
      tagged: [ { w: "If it will rain", role: "adverb", label: "条件状语从句（时态错）" }, { w: "we", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "stay", role: "verb", label: "动词原形" }, { w: "at home", role: "adverb", label: "状语" } ] },
    "gr15.1.2-e6": { en: "You can't go out unless you finish homework.", zh: "除非做完作业，否则不能出去。", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "can't", role: "verb", label: "情态动词" }, { w: "go", role: "verb", label: "动词原形" }, { w: "out", role: "adverb", label: "状语" }, { w: "unless you finish homework", role: "adverb", label: "条件状语从句" } ] },
    "gr15.1.2-e7": { en: "If I have time, I will help you.", zh: "如果我有时间，我会帮你。", reg: "通用",
      tagged: [ { w: "If I have time", role: "adverb", label: "条件状语从句" }, { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "help", role: "verb", label: "动词原形" }, { w: "you", role: "object", label: "宾语" } ] },
    /* ---------- gr15.1.3 原因状语从句 ---------- */
    "gr15.1.3-e1": { en: "Because he was ill, he stayed at home.", zh: "因为他病了，他待在家里。", reg: "通用",
      tagged: [ { w: "Because he was ill", role: "adverb", label: "原因状语从句" }, { w: "he", role: "subject", label: "主语" }, { w: "stayed", role: "verb", label: "谓语" }, { w: "at home", role: "adverb", label: "状语" } ] },
    "gr15.1.3-e2": { en: "As he was ill, we visited him.", zh: "因为他病了，我们去看他。", reg: "通用",
      tagged: [ { w: "As he was ill", role: "adverb", label: "原因状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "visited", role: "verb", label: "谓语" }, { w: "him", role: "object", label: "宾语" } ] },
    "gr15.1.3-e3": { en: "Since you are tired, have a rest.", zh: "既然你累了，休息一下吧。", reg: "通用",
      tagged: [ { w: "Since you are tired", role: "adverb", label: "原因状语从句" }, { w: "have", role: "verb", label: "谓语" }, { w: "a rest", role: "object", label: "宾语" } ] },
    "gr15.1.3-e4": { en: "He was late, for it rained hard.", zh: "他迟到了，因为雨下得很大。", reg: "书面",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "late", role: "complem", label: "表语" }, { w: "for it rained hard", role: "adverb", label: "原因状语从句" } ] },
    "gr15.1.3-e5": { en: "Because he was ill, so he stayed at home.", zh: "（✗ 错句）本想说“ 因为他病了，他待在家里 ”。", reg: "通用",
      tagged: [ { w: "Because he was ill", role: "adverb", label: "原因状语从句" }, { w: "so he stayed at home", role: "adverb", label: "多余的 so" } ] },
    "gr15.1.3-e6": { en: "I stayed up because the film was exciting.", zh: "我熬夜了，因为电影很精彩。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "stayed up", role: "verb", label: "谓语" }, { w: "because the film was exciting", role: "adverb", label: "原因状语从句" } ] },
    "gr15.1.3-e7": { en: "As it was getting dark, we went home.", zh: "天渐渐黑了，我们回家了。", reg: "通用",
      tagged: [ { w: "As it was getting dark", role: "adverb", label: "原因状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "home", role: "adverb", label: "状语" } ] },
    /* ---------- gr15.1.4 目的状语从句 ---------- */
    "gr15.1.4-e1": { en: "He got up early so that he could catch the bus.", zh: "他早起以便赶上公交车。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "got up", role: "verb", label: "谓语" }, { w: "early", role: "adverb", label: "状语" }, { w: "so that he could catch the bus", role: "adverb", label: "目的状语从句" } ] },
    "gr15.1.4-e2": { en: "She studied hard in order that she could pass.", zh: "她努力学习以便通过。（in order that + 情态）", reg: "书面",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "studied", role: "verb", label: "谓语" }, { w: "hard", role: "adverb", label: "状语" }, { w: "in order that she could pass", role: "adverb", label: "目的状语从句" } ] },
    "gr15.1.4-e3": { en: "I came early in order to get a seat.", zh: "我早到以便占个座。（in order to + 不定式）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "came", role: "verb", label: "谓语" }, { w: "early", role: "adverb", label: "状语" }, { w: "in order to get a seat", role: "adverb", label: "状语（不定式表目的）" } ] },
    "gr15.1.4-e4": { en: "He spoke loudly so that all could hear.", zh: "他大声说以便大家都能听见。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "spoke", role: "verb", label: "谓语" }, { w: "loudly", role: "adverb", label: "状语" }, { w: "so that all could hear", role: "adverb", label: "目的状语从句" } ] },
    "gr15.1.4-e5": { en: "It was so dark that we couldn't see.", zh: "天太黑了，我们看不见。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "so dark", role: "complem", label: "表语" }, { w: "that we couldn't see", role: "adverb", label: "结果状语从句" } ] },
    "gr15.1.4-e6": { en: "He got up early so that he catches the bus.", zh: "（✗ 错句）本想说“ 他早起以便赶上公交车 ”。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "got up", role: "verb", label: "谓语" }, { w: "early", role: "adverb", label: "状语" }, { w: "so that he catches the bus", role: "adverb", label: "目的状语从句（漏情态）" } ] },
    "gr15.1.4-e7": { en: "Save money so that you can buy a bike.", zh: "存钱以便买自行车。", reg: "通用",
      tagged: [ { w: "Save", role: "verb", label: "谓语" }, { w: "money", role: "object", label: "宾语" }, { w: "so that you can buy a bike", role: "adverb", label: "目的状语从句" } ] },
    /* ---------- gr15.1.5 结果状语从句 ---------- */
    "gr15.1.5-e1": { en: "He was so tired that he fell asleep.", zh: "他太累了，睡着了。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "so tired", role: "complem", label: "表语" }, { w: "that he fell asleep", role: "adverb", label: "结果状语从句" } ] },
    "gr15.1.5-e2": { en: "It was such a big dog that we were scared.", zh: "那只狗太大了，把我们吓到了。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "such a big dog", role: "complem", label: "表语" }, { w: "that we were scared", role: "adverb", label: "结果状语从句" } ] },
    "gr15.1.5-e3": { en: "She is so kind a girl that everyone loves her.", zh: "她是个如此善良的女孩，大家都爱她。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "so kind a girl", role: "complem", label: "表语" }, { w: "that everyone loves her", role: "adverb", label: "结果状语从句" } ] },
    "gr15.1.5-e4": { en: "The box is so heavy that I can't lift it.", zh: "箱子太重了，我搬不动。", reg: "通用",
      tagged: [ { w: "The box", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "so heavy", role: "complem", label: "表语" }, { w: "that I can't lift it", role: "adverb", label: "结果状语从句" } ] },
    "gr15.1.5-e5": { en: "It was such bad weather that we stayed home.", zh: "天气太糟了，我们待在家里。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "such bad weather", role: "complem", label: "表语" }, { w: "that we stayed home", role: "adverb", label: "结果状语从句" } ] },
    "gr15.1.5-e6": { en: "He was such tired that he fell asleep.", zh: "（✗ 错句）本想说“ 他太累了，睡着了 ”。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "such tired", role: "complem", label: "表语（such 误用）" }, { w: "that he fell asleep", role: "adverb", label: "结果状语从句" } ] },
    "gr15.1.5-e7": { en: "The story is so interesting that I read it twice.", zh: "故事太有趣了，我读了两遍。", reg: "通用",
      tagged: [ { w: "The story", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "so interesting", role: "complem", label: "表语" }, { w: "that I read it twice", role: "adverb", label: "结果状语从句" } ] },
    /* ---------- gr15.2.1 让步状语从句 ---------- */
    "gr15.2.1-e1": { en: "Although it rained, we went hiking.", zh: "虽然下雨了，我们还是去远足了。", reg: "通用",
      tagged: [ { w: "Although it rained", role: "adverb", label: "让步状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "hiking", role: "adverb", label: "状语" } ] },
    "gr15.2.1-e2": { en: "Though he is young, he knows a lot.", zh: "虽然他年轻，但懂得很多。", reg: "通用",
      tagged: [ { w: "Though he is young", role: "adverb", label: "让步状语从句" }, { w: "he", role: "subject", label: "主语" }, { w: "knows", role: "verb", label: "谓语" }, { w: "a lot", role: "object", label: "宾语" } ] },
    "gr15.2.1-e3": { en: "Even though it was late, they kept working.", zh: "尽管很晚了，他们继续工作。", reg: "通用",
      tagged: [ { w: "Even though it was late", role: "adverb", label: "让步状语从句" }, { w: "they", role: "subject", label: "主语" }, { w: "kept", role: "verb", label: "谓语" }, { w: "working", role: "object", label: "宾语" } ] },
    "gr15.2.1-e4": { en: "Child as he is, he can swim well.", zh: "虽然他是个孩子，但游泳很好。", reg: "书面",
      tagged: [ { w: "Child as he is", role: "adverb", label: "让步状语从句（as 倒装）" }, { w: "he", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "swim", role: "verb", label: "动词原形" }, { w: "well", role: "adverb", label: "状语" } ] },
    "gr15.2.1-e5": { en: "Although it rained, but we went hiking.", zh: "（✗ 错句）本想说“ 虽然下雨了，我们还是去远足了 ”。", reg: "通用",
      tagged: [ { w: "Although it rained", role: "adverb", label: "让步状语从句" }, { w: "but we went hiking", role: "adverb", label: "多余的 but" } ] },
    "gr15.2.1-e6": { en: "Though tired, he kept on reading.", zh: "虽然累了，他继续读书。（though + 分词省略）", reg: "通用",
      tagged: [ { w: "Though tired", role: "adverb", label: "让步状语从句（省略）" }, { w: "he", role: "subject", label: "主语" }, { w: "kept on", role: "verb", label: "谓语" }, { w: "reading", role: "object", label: "宾语" } ] },
    "gr15.2.1-e7": { en: "The task was hard. We finished it, though.", zh: "任务很难。不过我们完成了。（句末 though，口语）", reg: "口语",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "finished", role: "verb", label: "谓语" }, { w: "it", role: "object", label: "宾语" }, { w: "though", role: "adverb", label: "让步（句末口语）" } ] },
    /* ---------- gr15.2.2 比较与方式 ---------- */
    "gr15.2.2-e1": { en: "He talks as if he knew everything.", zh: "他说话的样子好像无所不知。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "talks", role: "verb", label: "谓语" }, { w: "as if he knew everything", role: "adverb", label: "方式状语从句" } ] },
    "gr15.2.2-e2": { en: "She sings as well as her sister.", zh: "她唱歌和她姐姐一样好。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "sings", role: "verb", label: "谓语" }, { w: "as well as her sister", role: "adverb", label: "比较状语从句" } ] },
    "gr15.2.2-e3": { en: "Do as I do.", zh: "照我做的做。（方式 as）", reg: "通用",
      tagged: [ { w: "Do", role: "verb", label: "谓语" }, { w: "as I do", role: "adverb", label: "方式状语从句" } ] },
    "gr15.2.2-e4": { en: "He looks as though he is ill.", zh: "他看起来好像病了。（可能为真，陈述）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "looks", role: "verb", label: "谓语" }, { w: "as though he is ill", role: "adverb", label: "方式状语从句" } ] },
    "gr15.2.2-e5": { en: "Tom runs faster than Jim.", zh: "汤姆比吉姆跑得快。", reg: "通用",
      tagged: [ { w: "Tom", role: "subject", label: "主语" }, { w: "runs", role: "verb", label: "谓语" }, { w: "faster than Jim", role: "adverb", label: "比较状语从句" } ] },
    "gr15.2.2-e6": { en: "He talks as if he knows everything.", zh: "（✗ 错句）本想说“ 他说话好像无所不知 ”。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "talks", role: "verb", label: "谓语" }, { w: "as if he knows everything", role: "adverb", label: "方式状语从句（时态错）" } ] },
    "gr15.2.2-e7": { en: "Do it the way I told you.", zh: "按我告诉你的方法做。（the way 口语）", reg: "口语",
      tagged: [ { w: "Do", role: "verb", label: "谓语" }, { w: "it", role: "object", label: "宾语" }, { w: "the way I told you", role: "adverb", label: "方式状语从句" } ] },
    /* ---------- gr15.2.3 状语从句总表与简化 ---------- */
    "gr15.2.3-e1": { en: "When young, he lived here.", zh: "他小时候住这儿。", reg: "通用",
      tagged: [ { w: "When young", role: "adverb", label: "时间状语从句（省略）" }, { w: "he", role: "subject", label: "主语" }, { w: "lived", role: "verb", label: "谓语" }, { w: "here", role: "adverb", label: "状语" } ] },
    "gr15.2.3-e2": { en: "Although tired, he kept working.", zh: "虽然累了，他继续工作。", reg: "通用",
      tagged: [ { w: "Although tired", role: "adverb", label: "让步状语从句（省略）" }, { w: "he", role: "subject", label: "主语" }, { w: "kept", role: "verb", label: "谓语" }, { w: "working", role: "object", label: "宾语" } ] },
    "gr15.2.3-e3": { en: "If possible, call me.", zh: "如果可能，给我打电话。", reg: "通用",
      tagged: [ { w: "If possible", role: "adverb", label: "条件状语从句（省略）" }, { w: "call", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] },
    "gr15.2.3-e4": { en: "While walking in the park, I met him.", zh: "在公园散步时，我遇到了他。（= While I was walking）", reg: "通用",
      tagged: [ { w: "While walking in the park", role: "adverb", label: "时间状语从句（省略）" }, { w: "I", role: "subject", label: "主语" }, { w: "met", role: "verb", label: "谓语" }, { w: "him", role: "object", label: "宾语" } ] },
    "gr15.2.3-e5": { en: "He stayed home because of the rain.", zh: "因为下雨，他待在家里。（介词短语简化）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "stayed", role: "verb", label: "谓语" }, { w: "home", role: "adverb", label: "状语" }, { w: "because of the rain", role: "adverb", label: "状语（介词短语）" } ] },
    "gr15.2.3-e6": { en: "When young, they lived here.", zh: "（✗ 错句）本想说“ 他小时候住这儿 ”。", reg: "通用",
      tagged: [ { w: "When young", role: "adverb", label: "时间状语从句（主语偷换）" }, { w: "they", role: "subject", label: "主语" }, { w: "lived", role: "verb", label: "谓语" }, { w: "here", role: "adverb", label: "状语" } ] },
    "gr15.2.3-e7": { en: "If necessary, I will help.", zh: "如果需要，我会帮忙。（= If it is necessary）", reg: "通用",
      tagged: [ { w: "If necessary", role: "adverb", label: "条件状语从句（省略）" }, { w: "I", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "help", role: "verb", label: "动词原形" } ] },
    /* ---------- gr15.2.4 本章小结与习题（高考） ---------- */
    "gr15.2.4-e1": { en: "I'll call you as soon as I arrive.", zh: "我一到就给你打电话。（时间，复习）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "'ll", role: "verb", label: "情态动词" }, { w: "call", role: "verb", label: "动词原形" }, { w: "you", role: "object", label: "宾语" }, { w: "as soon as I arrive", role: "adverb", label: "时间状语从句" } ] },
    "gr15.2.4-e2": { en: "Because he was ill, he stayed at home.", zh: "因为他病了，他待在家里。（原因，复习）", reg: "通用",
      tagged: [ { w: "Because he was ill", role: "adverb", label: "原因状语从句" }, { w: "he", role: "subject", label: "主语" }, { w: "stayed", role: "verb", label: "谓语" }, { w: "at home", role: "adverb", label: "状语" } ] },
    "gr15.2.4-e3": { en: "Although it rained, we went hiking.", zh: "虽然下雨了，我们还是去远足了。（让步，复习）", reg: "通用",
      tagged: [ { w: "Although it rained", role: "adverb", label: "让步状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "hiking", role: "adverb", label: "状语" } ] },
    "gr15.2.4-e4": { en: "Unless you hurry, you will be late.", zh: "除非你抓紧，否则会迟到。（条件，复习）", reg: "通用",
      tagged: [ { w: "Unless you hurry", role: "adverb", label: "条件状语从句" }, { w: "you", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "late", role: "complem", label: "表语" } ] },
    "gr15.2.4-e5": { en: "He was so tired that he fell asleep.", zh: "他太累了，睡着了。（结果，复习）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "so tired", role: "complem", label: "表语" }, { w: "that he fell asleep", role: "adverb", label: "结果状语从句" } ] },
    "gr15.2.4-e6": { en: "Because he was ill, so he stayed at home.", zh: "（✗ 错句）本想说“ 因为他病了，他待在家里 ”。", reg: "通用",
      tagged: [ { w: "Because he was ill", role: "adverb", label: "原因状语从句" }, { w: "so he stayed at home", role: "adverb", label: "多余的 so" } ] }
  },
  units: [
    {
      id: "gr15-u1",
      title: "时间、条件、原因、目的、结果",
      lessons: [
        /* ================= gr15.1.1 时间状语从句 ================= */
        {
          id: "gr15.1.1",
          title: "时间状语从句",
          pages: [
            {
              id: "gr15.1.1-p1",
              kind: "observe",
              title: "先看三句话：从句里用 will 吗？",
              sentences: [
                { id: "gr15.1.1-e1", en: "I'll call you as soon as I arrive.", zh: "我一到就给你打电话。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "'ll", role: "verb", label: "情态动词" }, { w: "call", role: "verb", label: "动词原形" }, { w: "you", role: "object", label: "宾语" }, { w: "as soon as I arrive", role: "adverb", label: "时间状语从句" } ] },
                { id: "gr15.1.1-e2", en: "While I was cooking, he watched TV.", zh: "我做饭时，他在看电视。", reg: "通用",
                  tagged: [ { w: "While I was cooking", role: "adverb", label: "时间状语从句" }, { w: "he", role: "subject", label: "主语" }, { w: "watched", role: "verb", label: "谓语" }, { w: "TV", role: "object", label: "宾语" } ] },
                { id: "gr15.1.1-e3", en: "When I got home, my mother was cooking.", zh: "我到家时，妈妈正在做饭。", reg: "通用",
                  tagged: [ { w: "When I got home", role: "adverb", label: "时间状语从句" }, { w: "my mother", role: "subject", label: "主语" }, { w: "was cooking", role: "verb", label: "谓语" } ] }
              ],
              guess: {
                q: "第一句主句是将来时（'ll call），从句里用的是 will arrive 还是 arrive？",
                options: ["will arrive", "arrive（will 被“ 没收 ”了）", "两种都行"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "主将从现：主句将来时，时间从句用一般现在时代替将来——will 被“ 没收 ”了。"
            },
            {
              id: "gr15.1.1-p2",
              kind: "interact",
              title: "把时间从句块拖进状语槽",
              exploreTip: "把时间从句块拖进状语槽——注意从句里不许用 will！",
              widgets: [
                {
                  type: "clause-slots",
                  params: {
                    main: "I'll call you __ .",
                    mainSlots: [ { id: "adv", label: "状语槽", accept: ["adverbial"] } ],
                    clauseBlocks: [
                      { text: "as soon as I arrive", kind: "adverbial" },
                      { text: "when I get home", kind: "adverbial" }
                    ],
                    hint: "两个从句块都能进状语槽——但 will arrive 进不来（will 被没收了）。"
                  }
                }
              ],
              point: "时间状语从句进状语槽；主将从现是条件卡，不是口诀——只在时间 / 条件从句成立。"
            },
            {
              id: "gr15.1.1-p3",
              kind: "explain",
              title: "主将从现：will 被没收",
              lead: "还记得吗？上一页 as soon as I arrive 进了状语槽，will arrive 进不来。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr15.1.1-e1", "gr15.1.1-e2", "gr15.1.1-e6"],
                  note: "身份证已经亮出来了——看这三句话，主句和从句的时态搭配。"
                },
                {
                  type: "idcard",
                  rule: "主将从现：主句用一般将来时，时间 / 条件状语从句用一般现在时代替将来。",
                  condition: "只在时间 / 条件状语从句中成立；宾语从句中 will 正常（I wonder if it will rain）；while + 延续动词（was cooking），when 可接点动词也可接延续动词。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 我一到就给你打电话 ”——“ 到 ”和“ 打 ”都不管时态，靠“ 一…就… ”连起来。",
                  en: "英语主句已经用 will 报了“ 将来 ”，从句就不用再报一次——will 被“ 没收 ”，用现在时代替。这是分工，不是省略。",
                  unbridge: "别在时间 / 条件从句里再加 will（✗ If it will rain）——一个将来报一次就够了。"
                },
                {
                  type: "contrast",
                  wrong: "I'll call you as soon as I will arrive.",
                  wrongZh: "（✗ 错句）",
                  right: "I'll call you as soon as I arrive.",
                  why: "从句里 will 被没收了——用现在时代替将来。"
                }
              ],
              point: "这就是主将从现：主句将来，从句现在；只在时间 / 条件从句成立。",
              pointScroll: true
            },
            {
              id: "gr15.1.1-p4",
              kind: "quiz",
              title: "练一练：will 没收了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I'll call you as soon as I will arrive.", "I'll call you as soon as I arrive.", "I call you as soon as I will arrive."],
                  answer: 1,
                  tip: "主将从现：从句用 arrive，不用 will arrive。"
                },
                {
                  type: "fill",
                  stemBefore: "When he",
                  stemAfter: ", tell me.（come）",
                  answer: "comes",
                  accept: ["comes"],
                  tip: "时间从句用一般现在时：comes。"
                },
                {
                  type: "choice",
                  stem: "“ While I ___ , he watched TV.”横线填：",
                  options: ["cook", "was cooking", "will cook"],
                  answer: 1,
                  tip: "while + 延续动词 → was cooking（过去进行）。"
                },
                {
                  type: "fill",
                  stemBefore: "As soon as she",
                  stemAfter: "the news, she left.（hear）",
                  answer: "heard",
                  accept: ["heard"],
                  tip: "主句是过去时（left），从句也用过去时：heard。"
                }
              ],
              point: "自查：主句将来 → 从句现在；while + 延续；时态前后对上。"
            }
          ]
        },
        /* ================= gr15.1.2 条件状语从句 ================= */
        {
          id: "gr15.1.2",
          title: "条件状语从句",
          pages: [
            {
              id: "gr15.1.2-p1",
              kind: "observe",
              title: "先看三句话：unless = if 还是 if not？",
              sentences: [
                { id: "gr15.1.2-e1", en: "If it rains, we will stay at home.", zh: "如果下雨，我们就待在家里。", reg: "通用",
                  tagged: [ { w: "If it rains", role: "adverb", label: "条件状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "stay", role: "verb", label: "动词原形" }, { w: "at home", role: "adverb", label: "状语" } ] },
                { id: "gr15.1.2-e2", en: "Unless you hurry, you will be late.", zh: "除非你抓紧，否则会迟到。", reg: "通用",
                  tagged: [ { w: "Unless you hurry", role: "adverb", label: "条件状语从句" }, { w: "you", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "late", role: "complem", label: "表语" } ] },
                { id: "gr15.1.2-e3", en: "If you study hard, you will pass.", zh: "如果你努力学习，就会通过。", reg: "通用",
                  tagged: [ { w: "If you study hard", role: "adverb", label: "条件状语从句" }, { w: "you", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "pass", role: "verb", label: "动词原形" } ] }
              ],
              guess: {
                q: "Unless you hurry = If you hurry 还是 If you don't hurry？",
                options: ["If you hurry", "If you don't hurry（unless = if not）", "意思完全不同"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "unless = if not：除非…否则…；条件从句同样主将从现。"
            },
            {
              id: "gr15.1.2-p2",
              kind: "interact",
              title: "标出条件从句块",
              exploreTip: "标出两句话的条件从句块：if 和 unless 各自的“ 脸色 ”是什么？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "If it rains", role: "adverb", label: "条件状语从句" },
                      { w: "we", role: "subject", label: "主语" },
                      { w: "will", role: "verb", label: "情态动词" },
                      { w: "stay", role: "verb", label: "动词原形" },
                      { w: "at home", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" }
                    ],
                    hint: "If it rains（如果下雨）——从句用现在时 rains，主句用 will。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Unless you hurry", role: "adverb", label: "条件状语从句" },
                      { w: "you", role: "subject", label: "主语" },
                      { w: "will", role: "verb", label: "情态动词" },
                      { w: "be", role: "verb", label: "动词原形" },
                      { w: "late", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "Unless you hurry = If you don't hurry——unless 后面不加 not。"
                  }
                }
              ],
              point: "unless = if not；unless 后不加 not（已经否定了）。"
            },
            {
              id: "gr15.1.2-p3",
              kind: "explain",
              title: "unless = if not",
              lead: "Unless you hurry, you will be late. 里 unless 后不再加 not——它已否定，再加会怎样？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr15.1.2-e1", "gr15.1.2-e2", "gr15.1.2-e6"],
                  note: "身份证已经亮出来了——看这三句话，if / unless 和时态的搭配。"
                },
                {
                  type: "idcard",
                  rule: "unless = if not；条件从句同样主将从现（If it rains, we will…）；真实条件 vs 虚拟条件（gr16 预告）。",
                  condition: "unless 后不加 not（双重否定不许）；unless 引导的从句用肯定形式表否定意义；本课只讲真实条件（可能发生），虚拟条件见 gr16。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 除非你抓紧，否则会迟到 ”——“ 除非…否则… ”成对出现。",
                  en: "英语 unless 一词搞定（= if not），但别再加 not——unless 已经把否定穿在身上了，再加就是否定之否定。",
                  unbridge: "别拿汉语的“ 除非…不… ”套英语（✗ Unless you don't hurry）——unless 后不加 not。"
                },
                {
                  type: "contrast",
                  wrong: "Unless you don't hurry, you will be late.",
                  wrongZh: "（✗ 错句）",
                  right: "Unless you hurry, you will be late.",
                  why: "unless 已经否定了，再加 not 是否定之否定——unless 后不加 not。"
                },
                {
                  type: "contrast",
                  wrong: "If it will rain, we will stay at home.",
                  wrongZh: "（✗ 错句）",
                  right: "If it rains, we will stay at home.",
                  why: "条件从句同样主将从现——从句里 will 被没收了。"
                },
                {
                  type: "contrast",
                  wrong: "Whether it rains, we will go.",
                  wrongZh: "（✗ 错句）",
                  right: "If it rains, we will go.",
                  why: "“是否”→ if：条件状语从句不用 whether——whether 只管“是否”的宾语从句（如 I wonder whether…），条件句的“如果”只能是 if。"
                }
              ],
              point: "这就是条件状语从句：unless = if not（后不加 not）；主将从现同样成立。",
              pointScroll: true
            },
            {
              id: "gr15.1.2-p4",
              kind: "quiz",
              title: "练一练：unless 用对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ Unless you hurry, you will be late.”=：",
                  options: ["If you hurry, you will be late.", "If you don't hurry, you will be late.", "Because you hurry, you will be late."],
                  answer: 1,
                  tip: "unless = if not。"
                },
                {
                  type: "fill",
                  stemBefore: "If it",
                  stemAfter: ", we will stay at home.（rain）",
                  answer: "rains",
                  accept: ["rains"],
                  tip: "条件从句主将从现：rains。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Unless you don't hurry, you will be late.", "Unless you hurry, you will be late.", "Unless you hurry, you are late."],
                  answer: 1,
                  tip: "unless 后不加 not；主句 will be。"
                },
                {
                  type: "fill",
                  stemBefore: "You can't go out",
                  stemAfter: "you finish homework.",
                  answer: "unless",
                  accept: ["unless"],
                  tip: "除非…否则… → unless（= if you don't finish）。"
                }
              ],
              point: "自查：unless = if not；unless 后不加 not；主将从现。"
            }
          ]
        },
        /* ================= gr15.1.3 原因状语从句 ================= */
        {
          id: "gr15.1.3",
          title: "原因状语从句",
          pages: [
            {
              id: "gr15.1.3-p1",
              kind: "observe",
              title: "先看三句话：because / as / for",
              sentences: [
                { id: "gr15.1.3-e1", en: "Because he was ill, he stayed at home.", zh: "因为他病了，他待在家里。", reg: "通用",
                  tagged: [ { w: "Because he was ill", role: "adverb", label: "原因状语从句" }, { w: "he", role: "subject", label: "主语" }, { w: "stayed", role: "verb", label: "谓语" }, { w: "at home", role: "adverb", label: "状语" } ] },
                { id: "gr15.1.3-e2", en: "As he was ill, we visited him.", zh: "因为他病了，我们去看他。", reg: "通用",
                  tagged: [ { w: "As he was ill", role: "adverb", label: "原因状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "visited", role: "verb", label: "谓语" }, { w: "him", role: "object", label: "宾语" } ] },
                { id: "gr15.1.3-e4", en: "He was late, for it rained hard.", zh: "他迟到了，因为雨下得很大。", reg: "书面",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "late", role: "complem", label: "表语" }, { w: "for it rained hard", role: "adverb", label: "原因状语从句" } ] }
              ],
              guess: {
                q: "because / as / for 三个“ 因为 ”，语气一样吗？for 站在哪？",
                options: ["一样；for 站句首", "because 最强，as / since 表已知原因，for 补充说明（站句中）", "for 最强"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "because 语气最强；as / since 表已知原因；for 是补充说明，站句中。"
            },
            {
              id: "gr15.1.3-p2",
              kind: "interact",
              title: "标出三个“ 因为 ”",
              exploreTip: "标出两句话：because（最强）和 for（补充说明）各站在哪？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Because he was ill", role: "adverb", label: "原因状语从句" },
                      { w: "he", role: "subject", label: "主语" },
                      { w: "stayed", role: "verb", label: "谓语" },
                      { w: "at home", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" }
                    ],
                    hint: "because 语气最强，常放句首——标出从句块。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "was", role: "verb", label: "谓语" },
                      { w: "late", role: "complem", label: "表语" },
                      { w: "for it rained hard", role: "adverb", label: "原因状语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "for 是补充说明，只能站句中（前面逗号）——标出从句块。"
                  }
                }
              ],
              point: "because 站句首（最强），for 站句中（补充说明）——位置不同，语气不同。"
            },
            {
              id: "gr15.1.3-p3",
              kind: "explain",
              title: "三个“ 因为 ” + so 禁令",
              lead: "还记得吗？上一页 because 站句首语气最强，for 站句中作补充说明。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr15.1.3-e1", "gr15.1.3-e2", "gr15.1.3-e4"],
                  note: "身份证已经亮出来了——看这三句话，三个“ 因为 ”的分工。"
                },
                {
                  type: "idcard",
                  rule: "because 语气最强（未知原因）；as / since 表已知原因；for 补充说明（只能放句中，前面逗号）。",
                  condition: "because 和 so 是仇人，单句内只能留一个；for 作连词时是“ 因为 ”（别当介词）；since 也有“ 自从 ”义，看上下文。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 因为…所以… ”——“ 因为 ”“ 所以 ”成对出现，缺一不可。",
                  en: "英语一句话只能有一个“ 因为 / 所以 ”：because 和 so 是仇人，见面只能留一个——留 because（讲原因），或留 so（讲结果），不能都要。",
                  unbridge: "别拿汉语的“ 因为…所以… ”套英语（✗ Because…, so…）——这是全书级中式英语王。"
                },
                {
                  type: "contrast",
                  wrong: "Because he was ill, so he stayed at home.",
                  wrongZh: "（✗ 错句）",
                  right: "Because he was ill, he stayed at home.",
                  why: "because 和 so 是仇人，一句话只能留一个。"
                }
              ],
              point: "这就是原因状语从句：because 最强，as / since 已知，for 补充；because 和 so 只能留一个。",
              pointScroll: true
            },
            {
              id: "gr15.1.3-p4",
              kind: "quiz",
              title: "练一练：because 和 so 只能留一个",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Because he was ill, so he stayed at home.", "Because he was ill, he stayed at home.", "He was ill, because so he stayed at home."],
                  answer: 1,
                  tip: "because 和 so 是仇人，只能留一个。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "he was ill, we visited him.（as：已知原因）",
                  answer: "As",
                  accept: ["As"],
                  tip: "已知原因 → as / since。"
                },
                {
                  type: "choice",
                  stem: "“ 他迟到了，因为雨下得很大。（补充说明）”英文是：",
                  options: ["He was late, for it rained hard.", "For it rained hard, he was late.", "He was late for it rained hard."],
                  answer: 0,
                  tip: "for 补充说明，只能站句中，前面逗号。"
                },
                {
                  type: "fill",
                  stemBefore: "I stayed up",
                  stemAfter: "the film was exciting.",
                  answer: "because",
                  accept: ["because"],
                  tip: "语气最强的原因 → because。"
                }
              ],
              point: "自查：because…so 连用了吗？for 站句中了吗？"
            }
          ]
        },
        /* ================= gr15.1.4 目的状语从句 ================= */
        {
          id: "gr15.1.4",
          title: "目的状语从句",
          pages: [
            {
              id: "gr15.1.4-p1",
              kind: "observe",
              title: "先看三句话：目的 vs 结果",
              sentences: [
                { id: "gr15.1.4-e1", en: "He got up early so that he could catch the bus.", zh: "他早起以便赶上公交车。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "got up", role: "verb", label: "谓语" }, { w: "early", role: "adverb", label: "状语" }, { w: "so that he could catch the bus", role: "adverb", label: "目的状语从句" } ] },
                { id: "gr15.1.4-e3", en: "I came early in order to get a seat.", zh: "我早到以便占个座。（in order to + 不定式）", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "came", role: "verb", label: "谓语" }, { w: "early", role: "adverb", label: "状语" }, { w: "in order to get a seat", role: "adverb", label: "状语（不定式表目的）" } ] },
                { id: "gr15.1.4-e5", en: "It was so dark that we couldn't see.", zh: "天太黑了，我们看不见。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "so dark", role: "complem", label: "表语" }, { w: "that we couldn't see", role: "adverb", label: "结果状语从句" } ] }
              ],
              guess: {
                q: "so that he could…（目的）和 so dark that…（结果）的 so that 一样吗？",
                options: ["一样", "不一样：目的 so that 常配情态（could），结果 so…that 多为陈述语气", "都是结果"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "目的 so that 常配情态（could / would）；结果 so…that 多为陈述语气（也可带情态）。"
            },
            {
              id: "gr15.1.4-p2",
              kind: "interact",
              title: "标出目的和结果",
              exploreTip: "标出两句话：目的从句（常配情态）和结果从句（多为陈述语气）各长什么样？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "got up", role: "verb", label: "谓语" },
                      { w: "early", role: "adverb", label: "状语" },
                      { w: "so that he could catch the bus", role: "adverb", label: "目的状语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "so that he could…：有情态 could → 表目的（以便）。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "It", role: "subject", label: "主语" },
                      { w: "was", role: "verb", label: "谓语" },
                      { w: "so dark", role: "complem", label: "表语" },
                      { w: "that we couldn't see", role: "adverb", label: "结果状语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "so dark that…：结果从句（如此…以致）——结果从句也可带情态（如 could）。"
                  }
                }
              ],
              point: "看情态：常配情态 could/would = 目的（以便）；多为陈述语气 = 结果（以致）。"
            },
            {
              id: "gr15.1.4-p3",
              kind: "explain",
              title: "目的：so that + 情态",
              lead: "so that he could… 是目的，in order to… 也是目的——'以便'为何两说？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr15.1.4-e1", "gr15.1.4-e2", "gr15.1.4-e3"],
                  note: "身份证已经亮出来了——看这三句话，“ 以便 ”的三种说法。"
                },
                {
                  type: "idcard",
                  rule: "so that / in order that + 情态（could / would）表目的；in order to + 动词原形（主语一致时）。",
                  condition: "目的 so that 常配情态 could/would；结果 so…that 多为陈述语气（也可带情态）；in order to 后主语须一致（I came…to get）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 以便 ”一个词，不管主语一不一致：“ 他早起以便赶车 ”“ 我早到以便占座 ”。",
                  en: "英语看主语一不一致：主语一致用 in order to（I came…to get），不一致用 so that 从句（he…so that he could…）——分工明确。",
                  unbridge: "别在目的从句里丢情态（✗ so that he catches）——could 是“ 以便 ”的信号灯。"
                },
                {
                  type: "contrast",
                  wrong: "He got up early so that he catches the bus.",
                  wrongZh: "（✗ 错句）",
                  right: "He got up early so that he could catch the bus.",
                  why: "目的从句里情态不能丢——could 是“ 以便 ”的信号灯。"
                }
              ],
              point: "这就是目的状语从句：so that / in order that + 情态；主语一致用 in order to。",
              pointScroll: true
            },
            {
              id: "gr15.1.4-p4",
              kind: "quiz",
              title: "练一练：目的还是结果？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 他早起以便赶上公交车。 ”英文是：",
                  options: ["He got up early so that he catches the bus.", "He got up early so that he could catch the bus.", "He got up early so dark that he catches the bus."],
                  answer: 1,
                  tip: "目的从句 + 情态 could。"
                },
                {
                  type: "fill",
                  stemBefore: "I came early",
                  stemAfter: "to get a seat.",
                  answer: "in order",
                  accept: ["in order"],
                  tip: "in order to + 原形（主语一致：I…I）。"
                },
                {
                  type: "choice",
                  stem: "“ It was so dark that we couldn't see.”是：",
                  options: ["目的状语从句", "结果状语从句", "时间状语从句"],
                  answer: 1,
                  tip: "结果从句（如此…以致）——could 在此表结果，非目的。"
                },
                {
                  type: "fill",
                  stemBefore: "She studied hard",
                  stemAfter: "that she could pass.",
                  answer: "in order",
                  accept: ["in order", "so"],
                  tip: "in order that / so that + could（目的）。"
                }
              ],
              point: "自查：先看是目的还是结果（目的常配情态，结果多为陈述但也可带情态）；主语一致用 in order to。"
            }
          ]
        },
        /* ================= gr15.1.5 结果状语从句 ================= */
        {
          id: "gr15.1.5",
          title: "结果状语从句",
          pages: [
            {
              id: "gr15.1.5-p1",
              kind: "observe",
              title: "先看三句话：so 和 such 分工",
              sentences: [
                { id: "gr15.1.5-e1", en: "He was so tired that he fell asleep.", zh: "他太累了，睡着了。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "so tired", role: "complem", label: "表语" }, { w: "that he fell asleep", role: "adverb", label: "结果状语从句" } ] },
                { id: "gr15.1.5-e2", en: "It was such a big dog that we were scared.", zh: "那只狗太大了，把我们吓到了。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "谓语" }, { w: "such a big dog", role: "complem", label: "表语" }, { w: "that we were scared", role: "adverb", label: "结果状语从句" } ] },
                { id: "gr15.1.5-e3", en: "She is so kind a girl that everyone loves her.", zh: "她是个如此善良的女孩，大家都爱她。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "so kind a girl", role: "complem", label: "表语" }, { w: "that everyone loves her", role: "adverb", label: "结果状语从句" } ] }
              ],
              guess: {
                q: "so tired that / such a big dog that / so kind a girl that——so 和 such 后面跟的东西一样吗？",
                options: ["一样", "不一样：so 后跟形容词 / 副词，such 后跟名词（a big dog）", "such 后跟形容词"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "so + 形 / 副 + that；such + (a / an) + 形 + 名 + that；特例 so + 形 + a / an + 名。"
            },
            {
              id: "gr15.1.5-p2",
              kind: "interact",
              title: "拼出 so…that 结果句",
              exploreTip: "拼出结果句：so 后面跟形容词，that 后面跟结果。",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVP",
                    blocks: [
                      { w: "He", role: "subject" },
                      { w: "was", role: "verb" },
                      { w: "so tired", role: "complem" },
                      { w: "that he fell asleep", role: "adverb" }
                    ],
                    hint: "so 后面跟形容词 tired——换成 such 行吗？（such 后面必须有名词）",
                    doneNote: "so + 形 / 副 + that；such 后面必须有名词。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "It", role: "subject", label: "主语" },
                      { w: "was", role: "verb", label: "谓语" },
                      { w: "such a big dog", role: "complem", label: "表语" },
                      { w: "that we were scared", role: "adverb", label: "结果状语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "such a big dog：such 后面跟了名词 dog——标出从句块。"
                  }
                }
              ],
              point: "so 后跟形容词 / 副词，such 后必须跟名词——分工看后面跟什么。"
            },
            {
              id: "gr15.1.5-p3",
              kind: "explain",
              title: "so…that / such…that",
              lead: "先看一眼上一页的结论：so 跟形容词，such 跟名词。这一页把它用在结果句上。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr15.1.5-e1", "gr15.1.5-e2", "gr15.1.5-e3"],
                  note: "身份证已经亮出来了——看这三句话，so / such 后面各跟了什么？"
                },
                {
                  type: "idcard",
                  rule: "so + 形 / 副 + that；such + (a / an) + 形 + 名 + that；特例：so + 形 + a / an + 名（so kind a girl）。",
                  condition: "such 后面必须有名词（✗ such tired）；so 后面是形容词 / 副词；such + 形容词 + 不可数名词（such bad weather）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 太累了，以至于睡着了 ”“ 这么大的狗 ”——“ 太 / 这么 ”通用。",
                  en: "英语 so / such 分工看后面：后面是形容词 / 副词用 so（so tired），后面是名词用 such（such a big dog）——特例 so kind a girl 记住它。",
                  unbridge: "别在 such 后面直接跟形容词（✗ such tired）——such 后面必须有名词。"
                },
                {
                  type: "contrast",
                  wrong: "He was such tired that he fell asleep.",
                  wrongZh: "（✗ 错句）",
                  right: "He was so tired that he fell asleep.",
                  why: "tired 是形容词，前面用 so——such 后面必须有名词。"
                }
              ],
              point: "这就是结果状语从句：so + 形 / 副，such + 名；特例 so + 形 + a / an + 名。",
              pointScroll: true
            },
            {
              id: "gr15.1.5-p4",
              kind: "quiz",
              title: "练一练：so 还是 such？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 他太累了，睡着了。 ”英文是：",
                  options: ["He was such tired that he fell asleep.", "He was so tired that he fell asleep.", "He was so tired so that he fell asleep."],
                  answer: 1,
                  tip: "tired 是形容词 → so。"
                },
                {
                  type: "fill",
                  stemBefore: "It was",
                  stemAfter: "a big dog that we were scared.",
                  answer: "such",
                  accept: ["such"],
                  tip: "后面是名词 a big dog → such。"
                },
                {
                  type: "choice",
                  stem: "“ 她是个如此善良的女孩。 ”英文是：",
                  options: ["She is such kind a girl.", "She is so kind a girl.", "She is so a kind girl."],
                  answer: 1,
                  tip: "特例：so + 形 + a / an + 名（so kind a girl）。"
                },
                {
                  type: "fill",
                  stemBefore: "The box is",
                  stemAfter: "heavy that I can't lift it.",
                  answer: "so",
                  accept: ["so"],
                  tip: "heavy 是形容词 → so。"
                }
              ],
              point: "自查：后面是形容词 → so；是名词 → such；特例 so kind a girl。"
            }
          ]
        }
      ]
    },
    {
      id: "gr15-u2",
      title: "让步、比较、方式与总表",
      lessons: [
        /* ================= gr15.2.1 让步状语从句 ================= */
        {
          id: "gr15.2.1",
          title: "让步状语从句",
          pages: [
            {
              id: "gr15.2.1-p1",
              kind: "observe",
              title: "先看三句话：三个“ 虽然 ”",
              sentences: [
                { id: "gr15.2.1-e1", en: "Although it rained, we went hiking.", zh: "虽然下雨了，我们还是去远足了。", reg: "通用",
                  tagged: [ { w: "Although it rained", role: "adverb", label: "让步状语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "hiking", role: "adverb", label: "状语" } ] },
                { id: "gr15.2.1-e2", en: "Though he is young, he knows a lot.", zh: "虽然他年轻，但懂得很多。", reg: "通用",
                  tagged: [ { w: "Though he is young", role: "adverb", label: "让步状语从句" }, { w: "he", role: "subject", label: "主语" }, { w: "knows", role: "verb", label: "谓语" }, { w: "a lot", role: "object", label: "宾语" } ] },
                { id: "gr15.2.1-e4", en: "Child as he is, he can swim well.", zh: "虽然他是个孩子，但游泳很好。", reg: "书面",
                  tagged: [ { w: "Child as he is", role: "adverb", label: "让步状语从句（as 倒装）" }, { w: "he", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "swim", role: "verb", label: "动词原形" }, { w: "well", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "although / though / as 都是“ 虽然 ”，位置一样吗？as 倒装把什么提前了？",
                options: ["一样", "although / though 站句首；as 倒装把表语（Child）提前了", "as 站句尾"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "although / though 站句首；as 倒装把表语提前（Child as he is）。"
            },
            {
              id: "gr15.2.1-p2",
              kind: "interact",
              title: "标出让步从句块",
              exploreTip: "标出两句话：although（句首）和 as 倒装（表语提前）各长什么样？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Although it rained", role: "adverb", label: "让步状语从句" },
                      { w: "we", role: "subject", label: "主语" },
                      { w: "went", role: "verb", label: "谓语" },
                      { w: "hiking", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" }
                    ],
                    hint: "Although it rained 站句首——标出从句块。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Child as he is", role: "adverb", label: "让步状语从句（as 倒装）" },
                      { w: "he", role: "subject", label: "主语" },
                      { w: "can", role: "verb", label: "情态动词" },
                      { w: "swim", role: "verb", label: "动词原形" },
                      { w: "well", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" }
                    ],
                    hint: "Child 被提前到 as 前面——标出这个倒装块。"
                  }
                }
              ],
              point: "although / though 站句首；as 倒装：表语提前 + as + 主语 + be。"
            },
            {
              id: "gr15.2.1-p3",
              kind: "explain",
              title: "although 和 but 是仇人",
              lead: "Although… 无 but，Child as he is 表语提前——'虽然'为何不能配 but？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr15.2.1-e1", "gr15.2.1-e3", "gr15.2.1-e4"],
                  note: "身份证已经亮出来了——看这三句话，“ 虽然 ”的三种说法。"
                },
                {
                  type: "idcard",
                  rule: "although / though 引导让步从句，单句内不许与 but 连用；as 倒装：表语 / 状语提前 + as + 主语 + be。",
                  condition: "although 与 but 是仇人（单句内只能留一个）；though 可放句末（口语，It's hard, though）；as 倒装是高中考点；even though 语气更强。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 虽然…但是… ”——“ 虽然 ”“ 但是 ”成对出现，缺一不可。",
                  en: "英语一句话只能有一个“ 但是 ”：although 和 but 是仇人，见面只能留一个——留 although（讲让步），或留 but（讲转折），不能都要。",
                  unbridge: "别拿汉语的“ 虽然…但是… ”套英语（✗ Although…, but…）——这是全书级中式英语王。"
                },
                {
                  type: "contrast",
                  wrong: "Although it rained, but we went hiking.",
                  wrongZh: "（✗ 错句）",
                  right: "Although it rained, we went hiking.",
                  why: "although 和 but 是仇人，一句话只能留一个。"
                }
              ],
              point: "这就是让步状语从句：although / though 不与 but 连用；as 倒装把表语提前。",
              pointScroll: true
            },
            {
              id: "gr15.2.1-p4",
              kind: "quiz",
              title: "练一练：but 赶走了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Although it rained, but we went hiking.", "Although it rained, we went hiking.", "Although it rained, so we went hiking."],
                  answer: 1,
                  tip: "although 和 but 是仇人，只能留一个。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "he is young, he knows a lot.",
                  answer: "Though",
                  accept: ["Though", "Although"],
                  tip: "虽然 → though / although。"
                },
                {
                  type: "choice",
                  stem: "“ Child as he is, he can swim well.”中 as 倒装把什么提前了？",
                  options: ["主语 he", "表语 Child", "谓语 can"],
                  answer: 1,
                  tip: "as 倒装：表语 Child 提前到 as 前面。"
                },
                {
                  type: "fill",
                  stemBefore: "The task was hard. We finished it,",
                  stemAfter: ".（though：口语）",
                  answer: "though",
                  accept: ["though"],
                  tip: "though 可放句末（口语）。"
                }
              ],
              point: "自查：although…but 连用了吗？as 倒装认出来了吗？"
            }
          ]
        },
        /* ================= gr15.2.2 比较与方式 ================= */
        {
          id: "gr15.2.2",
          title: "比较与方式",
          pages: [
            {
              id: "gr15.2.2-p1",
              kind: "observe",
              title: "先看三句话：as if 的 knew 是过去吗？",
              sentences: [
                { id: "gr15.2.2-e1", en: "He talks as if he knew everything.", zh: "他说话的样子好像无所不知。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "talks", role: "verb", label: "谓语" }, { w: "as if he knew everything", role: "adverb", label: "方式状语从句" } ] },
                { id: "gr15.2.2-e4", en: "He looks as though he is ill.", zh: "他看起来好像病了。（可能为真，陈述）", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "looks", role: "verb", label: "谓语" }, { w: "as though he is ill", role: "adverb", label: "方式状语从句" } ] },
                { id: "gr15.2.2-e3", en: "Do as I do.", zh: "照我做的做。（方式 as）", reg: "通用",
                  tagged: [ { w: "Do", role: "verb", label: "谓语" }, { w: "as I do", role: "adverb", label: "方式状语从句" } ] }
              ],
              guess: {
                q: "as if he knew… 的 knew 是过去时，讲的是过去的事吗？",
                options: ["是过去的事", "不是——是“ 假装 ”，过去式表虚拟（gr16 预告）", "是将来"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "as if 表“ 假装 ”时，过去式不是过去，是虚拟（gr16）；可能为真时用陈述。"
            },
            {
              id: "gr15.2.2-p2",
              kind: "interact",
              title: "标出 as if 和 as",
              exploreTip: "标出两句话：as if（好像）和 as（照…方式）各长什么样？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "talks", role: "verb", label: "谓语" },
                      { w: "as if he knew everything", role: "adverb", label: "方式状语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "as if he knew…：knew 是虚拟（假装），不是过去——标出从句块。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Do", role: "verb", label: "谓语" },
                      { w: "as I do", role: "adverb", label: "方式状语从句" }
                    ],
                    slots: [
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "as I do：as = 照…方式——标出从句块。"
                  }
                }
              ],
              point: "as if 表“ 好像 ”（假装→虚拟）；as 表“ 照…方式 ”。"
            },
            {
              id: "gr15.2.2-p3",
              kind: "explain",
              title: "as if：假装还是可能真？",
              lead: "还记得吗？上一页 as if he knew 是“ 假装 ”（虚拟），as I do 是“ 照…方式 ”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr15.2.2-e1", "gr15.2.2-e4", "gr15.2.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，as if 什么时候虚拟、什么时候陈述？"
                },
                {
                  type: "idcard",
                  rule: "as if / as though 表“ 好像 ”：与事实相反→时态后退（虚拟，gr16）；可能为真→陈述语气。",
                  condition: "as if 后虚拟是高考考点；口语 like = as if（It looks like it will rain，注明语域）；the way 口语（= in the way）；as…as 比较（gr03 回填）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 好像 ”不管真假：“ 他好像无所不知 ”“ 他好像病了 ”——一个词。",
                  en: "英语 as if 要“ 选边 ”：假装的（他不可能无所不知）→ 时态退一格（knew）；可能真的（他脸色不好）→ 陈述（is ill）——真假决定时态。",
                  unbridge: "别在 as if 表假装时用陈述语气（✗ as if he knows）——“ 假装 ”要用虚拟，这是 gr16 的地盘。"
                },
                {
                  type: "contrast",
                  wrong: "He talks as if he knows everything.",
                  wrongZh: "（✗ 错句）",
                  right: "He talks as if he knew everything.",
                  why: "as if 表“ 假装 ”，过去式不是过去，是虚拟（gr16 兑现）。"
                }
              ],
              point: "这就是 as if：假装→虚拟（退一格），可能真→陈述；口语 like = as if。",
              pointScroll: true
            },
            {
              id: "gr15.2.2-p4",
              kind: "quiz",
              title: "练一练：假装还是可能真？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 他说话好像无所不知。（假装）”英文是：",
                  options: ["He talks as if he knows everything.", "He talks as if he knew everything.", "He talks as he knows everything."],
                  answer: 1,
                  tip: "假装 → 虚拟（knew，退一格）。"
                },
                {
                  type: "fill",
                  stemBefore: "He looks as though he",
                  stemAfter: "ill.（be：可能为真）",
                  answer: "is",
                  accept: ["is"],
                  tip: "可能为真 → 陈述语气 is。"
                },
                {
                  type: "choice",
                  stem: "“ 照我做的做。 ”英文是：",
                  options: ["Do as if I do.", "Do as I do.", "Do like I do so."],
                  answer: 1,
                  tip: "as = 照…方式。"
                },
                {
                  type: "fill",
                  stemBefore: "She sings",
                  stemAfter: "well as her sister.",
                  answer: "as",
                  accept: ["as"],
                  tip: "as…as 同级比较（gr03 回填）。"
                }
              ],
              point: "自查：as if 假装→虚拟，可能真→陈述；as 表方式。"
            }
          ]
        },
        /* ================= gr15.2.3 状语从句总表与简化 ================= */
        {
          id: "gr15.2.3",
          title: "状语从句总表与简化",
          pages: [
            {
              id: "gr15.2.3-p1",
              kind: "observe",
              title: "先看三句话：省了谁？",
              sentences: [
                { id: "gr15.2.3-e1", en: "When young, he lived here.", zh: "他小时候住这儿。", reg: "通用",
                  tagged: [ { w: "When young", role: "adverb", label: "时间状语从句（省略）" }, { w: "he", role: "subject", label: "主语" }, { w: "lived", role: "verb", label: "谓语" }, { w: "here", role: "adverb", label: "状语" } ] },
                { id: "gr15.2.3-e2", en: "Although tired, he kept working.", zh: "虽然累了，他继续工作。", reg: "通用",
                  tagged: [ { w: "Although tired", role: "adverb", label: "让步状语从句（省略）" }, { w: "he", role: "subject", label: "主语" }, { w: "kept", role: "verb", label: "谓语" }, { w: "working", role: "object", label: "宾语" } ] },
                { id: "gr15.2.3-e3", en: "If possible, call me.", zh: "如果可能，给我打电话。", reg: "通用",
                  tagged: [ { w: "If possible", role: "adverb", label: "条件状语从句（省略）" }, { w: "call", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "When young / Although tired / If possible——各省了哪两个词？",
                options: ["省了主语 + be（he was / he was / it is）", "省了连接词", "没省"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "主语一致时，状语从句可省主语 + be——剩下形容词 / 分词 / 介词短语。"
            },
            {
              id: "gr15.2.3-p2",
              kind: "interact",
              title: "标出简化后的状语块",
              exploreTip: "标出两句话简化后的状语块：主语一致才能省，省的是主语 + be。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "When young", role: "adverb", label: "时间状语从句（省略）" },
                      { w: "he", role: "subject", label: "主语" },
                      { w: "lived", role: "verb", label: "谓语" },
                      { w: "here", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" }
                    ],
                    hint: "When he was young → When young：young 的逻辑主语是 he，和主句主语一致。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "While walking in the park", role: "adverb", label: "时间状语从句（省略）" },
                      { w: "I", role: "subject", label: "主语" },
                      { w: "met", role: "verb", label: "谓语" },
                      { w: "him", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "adverb", label: "状语" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "While I was walking → While walking：主语一致，省主语 + be。"
                  }
                }
              ],
              point: "简化条件：主语一致；省的是主语 + be；although / while / if 最常简化。"
            },
            {
              id: "gr15.2.3-p3",
              kind: "explain",
              title: "状语从句简化：主语一致才能省",
              lead: "When young, he… 省掉主语 + be——这样的省略，前提是什么？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr15.2.3-e1", "gr15.2.3-e2", "gr15.2.3-e4"],
                  note: "身份证已经亮出来了——看这三句话，省的是谁、留的是谁？"
                },
                {
                  type: "idcard",
                  rule: "主语一致时，状语从句可省主语 + be → 剩分词 / 形容词 / 介词短语；although / while / if 最常简化。",
                  condition: "主语必须一致（✗ When young, they… 主语偷换）；because 可换成 because of + 名词；简化后逻辑主语不变（gr10 呼应）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“ 他小时候 ”本来就省，不用说“ 当他是小时候 ”。",
                  en: "英语把 when he was 也省掉（When young）——但有个条件：young 的主人必须是主句主语。主人对不上，就不能省（gr10 逻辑主语呼应）。",
                  unbridge: "别在主语不一致时简化（✗ When young, they lived here）——young 的主人是 he，不是 they。"
                },
                {
                  type: "contrast",
                  wrong: "When young, they lived here.",
                  wrongZh: "（✗ 错句）",
                  right: "When young, he lived here.",
                  why: "简化后 young 的逻辑主语还是 he——主语偷换成 they，young 就没主人了。"
                }
              ],
              point: "这就是状语从句的简化：主语一致，省主语 + be；主人对不上不许省。",
              pointScroll: true
            },
            {
              id: "gr15.2.3-p4",
              kind: "quiz",
              title: "练一练：能省吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ When he was young, he lived here.”可简化为：",
                  options: ["When young, he lived here.", "When young, they lived here.", "Young when, he lived here."],
                  answer: 0,
                  tip: "主语一致（he…he）→ 可省 he was。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "possible, call me.（if）",
                  answer: "If",
                  accept: ["If"],
                  tip: "If it is possible → If possible。"
                },
                {
                  type: "choice",
                  stem: "“ Because he was ill, he stayed home.”可换成：",
                  options: ["Because of his illness, he stayed home.", "He stayed home because of the rain.", "Because of be ill, he stayed home."],
                  answer: 1,
                  tip: "because of + 名词：because of the rain（因为下雨）。"
                },
                {
                  type: "fill",
                  stemBefore: "While",
                  stemAfter: "in the park, I met him.（walk）",
                  answer: "walking",
                  accept: ["walking"],
                  tip: "While I was walking → While walking（主语一致）。"
                }
              ],
              point: "自查：主语一致吗？一致→省主语 + be；不一致→不许省。"
            }
          ]
        },
        /* ================= gr15.2.4 本章小结与习题（高考） ================= */
        {
          id: "gr15.2.4",
          title: "本章小结与习题",
          pages: [
            {
              id: "gr15.2.4-p1",
              kind: "explain",
              title: "状语从句总表",
              lead: "本章八员大将集结：时间、条件、原因、目的、结果、让步、比较、方式。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr15.1.1-e1", "gr15.1.3-e1", "gr15.2.1-e1"],
                  note: "三句话，三种从句——看看连接词和主将从现。"
                },
                {
                  type: "idcard",
                  rule: "状语从句总表：时间（when / while / as soon as）— 条件（if / unless）— 原因（because / as / since）— 目的（so that）— 结果（so…that）— 让步（although）— 比较（than / as…as）— 方式（as / as if）。",
                  condition: "做题三问：① 哪种从句（看连接词）？② 主将从现吗（时间 / 条件）？③ 仇人检查（although…but / because…so）？"
                },
                {
                  type: "bridge",
                  zh: "汉语连词成对出现：因为…所以…，虽然…但是…，如果…就…。",
                  en: "英语连词“ 单飞 ”：because 不带 so，although 不带 but，if 不带 will——一句话一个连词，各管各的。",
                  unbridge: "别把汉语的成对连词搬进英语——这是本章所有中式错误的根。"
                },
                {
                  type: "contrast",
                  wrong: "Because he was ill, so he stayed at home.",
                  wrongZh: "（✗ 错句）",
                  right: "Because he was ill, he stayed at home.",
                  why: "本章最大坑：because…so（高考改错高频）——仇人只能留一个。"
                }
              ],
              point: "状语从句 = 八种 + 主将从现 + 仇人检查（although…but / because…so）。",
              pointScroll: true
            },
            {
              id: "gr15.2.4-p2",
              kind: "quiz",
              title: "高考综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我一到就给你打电话。 ”英文是：",
                  options: ["I'll call you as soon as I will arrive.", "I'll call you as soon as I arrive.", "I call you as soon as I arrive."],
                  answer: 1,
                  tip: "主将从现：从句 arrive。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "you hurry, you will be late.",
                  answer: "Unless",
                  accept: ["Unless"],
                  tip: "除非…否则… → Unless（= if you don't hurry）。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“ Although it rained, but we went hiking.”应改为：",
                  options: ["Although it rained, but we went hiking.", "Although it rained, we went hiking.", "Although it rained, so we went hiking."],
                  answer: 1,
                  tip: "although 和 but 是仇人，只能留一个。"
                },
                {
                  type: "fill",
                  stemBefore: "He was",
                  stemAfter: "tired that he fell asleep.",
                  answer: "so",
                  accept: ["so"],
                  tip: "tired 是形容词 → so…that。"
                }
              ],
              point: "本章通关：八种连词 + 主将从现 + 仇人检查 + so / such 分工。"
            }
          ]
        }
      ]
    }
  ]
};
