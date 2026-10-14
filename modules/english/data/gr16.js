/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr16：虚拟语气
 *
 * 数据口径（M5）：window.ENG_CH["gr16"] = { id, title, sentences, units }，
 * 与数学 window.MATH_CH 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 单元 gr16.1 if 条件句虚拟（gr16.1.1–gr16.1.3）· 单元 gr16.2
 * 其他虚拟（gr16.2.1–gr16.2.4）。每课：观察页（例句先行 +
 * Y1 先猜后验）→ 交互页（tagging / sentence-builder）→ 讲解页
 * （examples → idcard → bridge → spell → contrast）→ 练习页
 * （Y3 判分：choice / fill）。
 * 例句全部来自 D3 三审台账（modules/english/data/_review/
 * ledger-gr16.json），id 一一对应，未终审例句不得入库。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=红队终审通过（见台账 first/final 记录）。
 * 撰写：语法生产C队（2026-10-14），状态 drafted，待三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr16"] = {
  id: "gr16",
  title: "虚拟语气",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr16.json 逐字一致。虚拟条件句整体先标为
   * “ 虚拟条件句 ”成分块，内部结构在交互页 / 讲解页中拆解。 */
  sentences: {
    /* ---------- gr16.1.1 与现在/过去事实相反 ---------- */
    "gr16.1.1-e1": { en: "If I were a bird, I would fly to you.", zh: "如果我是只鸟，我就飞到你身边。（与现在相反）", reg: "通用",
      tagged: [ { w: "If I were a bird", role: "adverb", label: "虚拟条件句（与现在相反）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "fly", role: "verb", label: "动词原形" }, { w: "to you", role: "adverb", label: "状语" } ] },
    "gr16.1.1-e2": { en: "If I had studied harder, I would have passed.", zh: "如果我当时更努力，我就通过了。（与过去相反）", reg: "通用",
      tagged: [ { w: "If I had studied harder", role: "adverb", label: "虚拟条件句（与过去相反）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "have passed", role: "verb", label: "动词完成式" } ] },
    "gr16.1.1-e3": { en: "If I were you, I would take the chance.", zh: "如果我是你，我会抓住机会。", reg: "通用",
      tagged: [ { w: "If I were you", role: "adverb", label: "虚拟条件句（与现在相反）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "take", role: "verb", label: "动词原形" }, { w: "the chance", role: "object", label: "宾语" } ] },
    "gr16.1.1-e4": { en: "If he knew the answer, he would tell us.", zh: "如果他知道答案，他会告诉我们。", reg: "通用",
      tagged: [ { w: "If he knew the answer", role: "adverb", label: "虚拟条件句（与现在相反）" }, { w: "he", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "tell", role: "verb", label: "动词原形" }, { w: "us", role: "object", label: "宾语" } ] },
    "gr16.1.1-e5": { en: "If I was a bird, I would fly to you.", zh: "（✗ 错句，书面）本想说“ 如果我是只鸟 ”。", reg: "书面",
      tagged: [ { w: "If I was a bird", role: "adverb", label: "虚拟条件句（was 误用）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "fly", role: "verb", label: "动词原形" }, { w: "to you", role: "adverb", label: "状语" } ] },
    "gr16.1.1-e6": { en: "If they had left earlier, they would have caught the bus.", zh: "如果他们早点出发，就赶上公交车了。", reg: "通用",
      tagged: [ { w: "If they had left earlier", role: "adverb", label: "虚拟条件句（与过去相反）" }, { w: "they", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "have caught", role: "verb", label: "动词完成式" }, { w: "the bus", role: "object", label: "宾语" } ] },
    "gr16.1.1-e7": { en: "I would buy a car if I had money.", zh: "如果我有钱，我就买辆车。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "buy", role: "verb", label: "动词原形" }, { w: "a car", role: "object", label: "宾语" }, { w: "if I had money", role: "adverb", label: "虚拟条件句（与现在相反）" } ] },
    "gr16.1.1-e8": { en: "If it rains, we will stay at home.", zh: "如果下雨，我们就待在家里。（真事：主将从现）", reg: "通用",
      tagged: [ { w: "If it rains", role: "adverb", label: "条件状语从句（真实）" }, { w: "we", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "助动词" }, { w: "stay", role: "verb", label: "动词原形" }, { w: "at home", role: "adverb", label: "状语" } ] },
    /* ---------- gr16.1.2 与将来相反与混合虚拟 ---------- */
    "gr16.1.2-e1": { en: "If it should rain tomorrow, we would stay home.", zh: "如果明天下雨（小可能），我们就待家里。", reg: "通用",
      tagged: [ { w: "If it should rain tomorrow", role: "adverb", label: "虚拟条件句（与将来相反）" }, { w: "we", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "stay", role: "verb", label: "动词原形" }, { w: "home", role: "adverb", label: "状语" } ] },
    "gr16.1.2-e2": { en: "If it were to rain tomorrow, the game would stop.", zh: "如果明天下雨（几乎不可能），比赛就停了。", reg: "通用",
      tagged: [ { w: "If it were to rain tomorrow", role: "adverb", label: "虚拟条件句（与将来相反）" }, { w: "the game", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "stop", role: "verb", label: "动词原形" } ] },
    "gr16.1.2-e3": { en: "If I had worked harder, I would be a teacher now.", zh: "如果当年更努力，我现在就是老师了。（混合虚拟）", reg: "通用",
      tagged: [ { w: "If I had worked harder", role: "adverb", label: "虚拟条件句（过去）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "a teacher now", role: "complem", label: "表语" } ] },
    "gr16.1.2-e4": { en: "If he should come, tell me.", zh: "如果他来（小可能），告诉我。", reg: "通用",
      tagged: [ { w: "If he should come", role: "adverb", label: "虚拟条件句（与将来相反）" }, { w: "tell", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] },
    "gr16.1.2-e5": { en: "If you were to try again, you might win.", zh: "如果你再试一次（几乎不可能），可能会赢。", reg: "通用",
      tagged: [ { w: "If you were to try again", role: "adverb", label: "虚拟条件句（与将来相反）" }, { w: "you", role: "subject", label: "主语" }, { w: "might", role: "verb", label: "助动词" }, { w: "win", role: "verb", label: "动词原形" } ] },
    "gr16.1.2-e6": { en: "If I had worked harder, I would have been a teacher now.", zh: "（✗ 错句）本想说“ 如果当年更努力，我现在就是老师了 ”。", reg: "通用",
      tagged: [ { w: "If I had worked harder", role: "adverb", label: "虚拟条件句（过去）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "have been", role: "verb", label: "动词完成式（错）" }, { w: "a teacher now", role: "complem", label: "表语" } ] },
    "gr16.1.2-e7": { en: "If she had listened, she would know the truth now.", zh: "如果她当时听了，现在就知道真相了。（混合虚拟）", reg: "通用",
      tagged: [ { w: "If she had listened", role: "adverb", label: "虚拟条件句（过去）" }, { w: "she", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "know", role: "verb", label: "动词原形" }, { w: "the truth now", role: "object", label: "宾语" } ] },
    /* ---------- gr16.1.3 含蓄条件 ---------- */
    "gr16.1.3-e1": { en: "Without your help, I would have failed.", zh: "若没有你的帮助，我就失败了。", reg: "通用",
      tagged: [ { w: "Without your help", role: "adverb", label: "含蓄条件" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "have failed", role: "verb", label: "动词完成式" } ] },
    "gr16.1.3-e2": { en: "But for the rain, we would have had a good trip.", zh: "若没有这场雨，我们的旅行就很愉快了。", reg: "通用",
      tagged: [ { w: "But for the rain", role: "adverb", label: "含蓄条件" }, { w: "we", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "have had", role: "verb", label: "动词完成式" }, { w: "a good trip", role: "object", label: "宾语" } ] },
    "gr16.1.3-e3": { en: "Had I known the truth, I would not have come.", zh: "我要是早知道真相，就不来了。（= If I had known）", reg: "书面",
      tagged: [ { w: "Had I known the truth", role: "adverb", label: "虚拟倒装（含蓄条件）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "not have come", role: "verb", label: "动词完成式" } ] },
    "gr16.1.3-e4": { en: "Were I you, I would go.", zh: "如果我是你，我就去。（= If I were you）", reg: "书面",
      tagged: [ { w: "Were I you", role: "adverb", label: "虚拟倒装（含蓄条件）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "go", role: "verb", label: "动词原形" } ] },
    "gr16.1.3-e5": { en: "Otherwise, we would be late.", zh: "否则我们就迟到了。", reg: "通用",
      tagged: [ { w: "Otherwise", role: "adverb", label: "含蓄条件" }, { w: "we", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "late", role: "complem", label: "表语" } ] },
    "gr16.1.3-e6": { en: "Without water, we will die.", zh: "（✗ 错句）本想说“ 没有水，我们会死 ”。", reg: "通用",
      tagged: [ { w: "Without water", role: "adverb", label: "含蓄条件" }, { w: "we", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "助动词（错）" }, { w: "die", role: "verb", label: "动词原形" } ] },
    "gr16.1.3-e7": { en: "Should he come, please call me.", zh: "他要是来，请给我打电话。（= If he should come）", reg: "书面",
      tagged: [ { w: "Should he come", role: "adverb", label: "虚拟倒装（含蓄条件）" }, { w: "call", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] },
    /* ---------- gr16.2.1 名词性从句中的虚拟 ---------- */
    "gr16.2.1-e1": { en: "He suggested that we leave early.", zh: "他建议我们早点离开。（美式：should 省）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "suggested", role: "verb", label: "谓语" }, { w: "that we (should) leave early", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.1-e2": { en: "He suggested that we should leave early.", zh: "他建议我们早点离开。（英式：should 留）", reg: "书面",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "suggested", role: "verb", label: "谓语" }, { w: "that we should leave early", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.1-e3": { en: "The doctor ordered that he stay in bed.", zh: "医生命令他卧床休息。", reg: "通用",
      tagged: [ { w: "The doctor", role: "subject", label: "主语" }, { w: "ordered", role: "verb", label: "谓语" }, { w: "that he stay in bed", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.1-e4": { en: "It is important that we be on time.", zh: "我们准时很重要。（美式：be 原形）", reg: "书面",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "important", role: "complem", label: "表语" }, { w: "that we be on time", role: "subject", label: "主语从句（虚拟）" } ] },
    "gr16.2.1-e5": { en: "She insisted that he go with her.", zh: "她坚持要他跟她一起去。（坚持要求→虚拟）", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "insisted", role: "verb", label: "谓语" }, { w: "that he go with her", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.1-e6": { en: "She insisted that he was right.", zh: "她坚持认为他是对的。（坚持认为→陈述）", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "insisted", role: "verb", label: "谓语" }, { w: "that he was right", role: "object", label: "宾语从句（陈述）" } ] },
    "gr16.2.1-e7": { en: "He suggested that we will leave early.", zh: "（✗ 错句）本想说“ 他建议我们早点离开 ”。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "suggested", role: "verb", label: "谓语" }, { w: "that we will leave early", role: "object", label: "宾语从句（误用 will）" } ] },
    /* ---------- gr16.2.2 It is time / would rather 虚拟 ---------- */
    "gr16.2.2-e1": { en: "It's time we left.", zh: "我们该走了。（虚拟：早该走了）", reg: "通用",
      tagged: [ { w: "It's time", role: "subject", label: "主语" }, { w: "we left", role: "complem", label: "虚拟从句（过去式）" } ] },
    "gr16.2.2-e2": { en: "It's high time you went to bed.", zh: "你早该睡觉了。（high time 语气更强）", reg: "通用",
      tagged: [ { w: "It's high time", role: "subject", label: "主语" }, { w: "you went to bed", role: "complem", label: "虚拟从句（过去式）" } ] },
    "gr16.2.2-e3": { en: "I would rather you came tomorrow.", zh: "我宁愿你明天来。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "would rather", role: "verb", label: "谓语" }, { w: "you came tomorrow", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.2-e4": { en: "I would rather stay at home.", zh: "我宁愿待在家里。（主语一致 + 原形）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "would rather", role: "verb", label: "谓语" }, { w: "stay at home", role: "object", label: "宾语（不定式省略 to）" } ] },
    "gr16.2.2-e5": { en: "It's time for us to leave.", zh: "我们该走了。（不定式：就事论事）", reg: "通用",
      tagged: [ { w: "It's time", role: "subject", label: "主语" }, { w: "for us to leave", role: "complem", label: "不定式（陈述）" } ] },
    "gr16.2.2-e6": { en: "It's time we leave.", zh: "（✗ 错句）本想说“ 我们该走了（早该走了） ”。", reg: "通用",
      tagged: [ { w: "It's time", role: "subject", label: "主语" }, { w: "we leave", role: "complem", label: "从句（误用原形）" } ] },
    "gr16.2.2-e7": { en: "I would rather he had come yesterday.", zh: "我宁愿他昨天来了。（过去完成）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "would rather", role: "verb", label: "谓语" }, { w: "he had come yesterday", role: "object", label: "宾语从句（虚拟）" } ] },
    /* ---------- gr16.2.3 wish 与 as if 虚拟 ---------- */
    "gr16.2.3-e1": { en: "I wish I were taller.", zh: "我要是再高一点就好了。（与现在相反）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wish", role: "verb", label: "谓语" }, { w: "I were taller", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.3-e2": { en: "I wish I had studied harder.", zh: "我要是当时更努力就好了。（过去遗憾）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wish", role: "verb", label: "谓语" }, { w: "I had studied harder", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.3-e3": { en: "He talks as if he knew everything.", zh: "他说话好像无所不知。（gr15.2.2 兑现）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "talks", role: "verb", label: "谓语" }, { w: "as if he knew everything", role: "adverb", label: "方式状语从句（虚拟）" } ] },
    "gr16.2.3-e4": { en: "She wishes she could fly.", zh: "她要是会飞就好了。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "wishes", role: "verb", label: "谓语" }, { w: "she could fly", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.3-e5": { en: "I wish it will rain tomorrow.", zh: "（✗ 错句）本想说“ 我希望明天下雨 ”。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wish", role: "verb", label: "谓语" }, { w: "it will rain tomorrow", role: "object", label: "宾语从句（误用 will）" } ] },
    "gr16.2.3-e6": { en: "I wish you were here now.", zh: "我真希望你现在在这儿。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wish", role: "verb", label: "谓语" }, { w: "you were here now", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.3-e7": { en: "It looks as if it is going to rain.", zh: "看起来要下雨了。（可能为真，陈述）", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "looks", role: "verb", label: "谓语" }, { w: "as if it is going to rain", role: "adverb", label: "方式状语从句（陈述）" } ] },
    /* ---------- gr16.2.4 本章小结与习题（高考） ---------- */
    "gr16.2.4-e1": { en: "If I were you, I would take the chance.", zh: "如果我是你，我会抓住机会。（与现在相反，复习）", reg: "通用",
      tagged: [ { w: "If I were you", role: "adverb", label: "虚拟条件句（与现在相反）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "take", role: "verb", label: "动词原形" }, { w: "the chance", role: "object", label: "宾语" } ] },
    "gr16.2.4-e2": { en: "If I had worked harder, I would be a teacher now.", zh: "如果当年更努力，我现在就是老师了。（混合，复习）", reg: "通用",
      tagged: [ { w: "If I had worked harder", role: "adverb", label: "虚拟条件句（过去）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "a teacher now", role: "complem", label: "表语" } ] },
    "gr16.2.4-e3": { en: "He suggested that we leave early.", zh: "他建议我们早点离开。（从句虚拟，复习）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "suggested", role: "verb", label: "谓语" }, { w: "that we leave early", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.4-e4": { en: "It's time we left.", zh: "我们该走了。（It's time 虚拟，复习）", reg: "通用",
      tagged: [ { w: "It's time", role: "subject", label: "主语" }, { w: "we left", role: "complem", label: "虚拟从句（过去式）" } ] },
    "gr16.2.4-e5": { en: "I wish I were taller.", zh: "我要是再高一点就好了。（wish 虚拟，复习）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wish", role: "verb", label: "谓语" }, { w: "I were taller", role: "object", label: "宾语从句（虚拟）" } ] },
    "gr16.2.4-e6": { en: "If I was a bird, I would fly to you.", zh: "（✗ 错句，书面）本想说“ 如果我是只鸟 ”。", reg: "书面",
      tagged: [ { w: "If I was a bird", role: "adverb", label: "虚拟条件句（was 误用）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "fly", role: "verb", label: "动词原形" }, { w: "to you", role: "adverb", label: "状语" } ] }
  },
  units: [
    {
      id: "gr16-u1",
      title: "if 条件句虚拟",
      lessons: [
        /* ================= gr16.1.1 与现在/过去事实相反 ================= */
        {
          id: "gr16.1.1",
          title: "与现在/过去事实相反",
          pages: [
            {
              id: "gr16.1.1-p1",
              kind: "observe",
              title: "先看三句话：哪句是真事？",
              sentences: [
                { id: "gr16.1.1-e1", en: "If I were a bird, I would fly to you.", zh: "如果我是只鸟，我就飞到你身边。（假想）", reg: "通用",
                  tagged: [ { w: "If I were a bird", role: "adverb", label: "虚拟条件句（与现在相反）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "fly", role: "verb", label: "动词原形" }, { w: "to you", role: "adverb", label: "状语" } ] },
                { id: "gr16.1.1-e2", en: "If I had studied harder, I would have passed.", zh: "如果我当时更努力，我就通过了。（假想）", reg: "通用",
                  tagged: [ { w: "If I had studied harder", role: "adverb", label: "虚拟条件句（与过去相反）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "have passed", role: "verb", label: "动词完成式" } ] },
                { id: "gr16.1.1-e8", en: "If it rains, we will stay at home.", zh: "如果下雨，我们就待在家里。（真事）", reg: "通用",
                  tagged: [ { w: "If it rains", role: "adverb", label: "条件状语从句（真实）" }, { w: "we", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "助动词" }, { w: "stay", role: "verb", label: "动词原形" }, { w: "at home", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "第一句（If I were a bird…）说的是真事还是假想？",
                options: ["真事——我就是只鸟", "假想——我不是鸟（与现在事实相反）", "假想——过去没发生（与过去相反）"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "虚拟语气 = 用特殊时态标记“ 假想 ”：第三句是真事（主将从现），第一、二句是假想（时态降级）。"
            },
            {
              id: "gr16.1.1-p2",
              kind: "interact",
              title: "标出虚拟条件句，再拼一句",
              exploreTip: "先标虚拟条件句块——它和真实条件句长得不一样（were / had studied / would have）。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "If I were a bird", role: "adverb", label: "虚拟条件句（与现在相反）" },
                      { w: "I", role: "subject", label: "主语" },
                      { w: "would", role: "verb", label: "助动词" },
                      { w: "fly", role: "verb", label: "动词原形" },
                      { w: "to you", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语 / 助动词" },
                      { role: "adverb", label: "状语（从句块）" }
                    ],
                    hint: "were 是信号：真实条件句里 be 动词不会变成 were——先把从句整体拖进状语槽。"
                  }
                },
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SV",
                    blocks: [
                      { w: "If I had studied harder", role: "adverb" },
                      { w: "I", role: "subject" },
                      { w: "would", role: "verb" },
                      { w: "have passed", role: "verb" }
                    ],
                    hint: "与过去相反：从句 had + 过去分词，主句 would have + 过去分词。",
                    doneNote: "If I had studied harder, I would have passed.——过去假想，时态降两级。"
                  }
                }
              ],
              point: "现在假想：从句过去式（were），主句 would + 原形；过去假想：从句 had done，主句 would have done。"
            },
            {
              id: "gr16.1.1-p3",
              kind: "explain",
              title: "时态降级：假想的标记",
              lead: "还记得吗？第一句 were、第二句 had studied、主句里的 would / would have——全是“ 假想 ”的信号灯。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr16.1.1-e1", "gr16.1.1-e2", "gr16.1.1-e3"],
                  note: "三句话：第一句与现在相反，第二句与过去相反，第三句是口头禅 If I were you。"
                },
                {
                  type: "idcard",
                  rule: "与现在事实相反：if 从句用一般过去时（be 一律用 were，书面），主句用 would / could / might + 动词原形。与过去事实相反：if 从句用过去完成时（had + 过去分词），主句用 would / could / might + have + 过去分词。",
                  condition: "先分清“ 真假 ”：可能发生的用主将从现（gr15.1.2）；已确定没发生的才用虚拟。书面语 were 通用，口语 was 可接受——写作用 were。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 如果我是只鸟 ”——“ 是 ”字不变，真假都一样，靠语境猜。",
                  en: "英语用时态“ 降级 ”给假想盖章：现在的事 → 退到过去式（am → were）；过去的事 → 再退一级（studied → had studied）。主句 would 就是“ 本来会 ”的意思。",
                  unbridge: "别把汉语的“ 不变 ”搬过来——英语里时态降级就是假想的身份证，不是写错了。"
                },
                {
                  type: "spell",
                  rule: "现在虚拟公式：if + 过去式（were），主句 would + 原形；过去虚拟公式：if + had + 过去分词，主句 would + have + 过去分词。口诀：“ 现在退一级，过去退两级 ”。"
                },
                {
                  type: "contrast",
                  wrong: "If I was a bird, I would fly to you.",
                  wrongZh: "（✗ 错句，书面）",
                  right: "If I were a bird, I would fly to you.",
                  why: "书面虚拟条件句中 be 一律用 were——was 留给口语，考试写 were。"
                }
              ],
              point: "虚拟 = 时态降级：现在 → 过去式（were），过去 → had done；主句 would（have）跟上。",
              pointScroll: true
            },
            {
              id: "gr16.1.1-p4",
              kind: "quiz",
              title: "练一练：降级降对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 如果我是只鸟 ”（书面）选：",
                  options: ["If I am a bird", "If I was a bird", "If I were a bird"],
                  answer: 2,
                  tip: "与现在相反，书面 be 一律用 were。"
                },
                {
                  type: "fill",
                  stemBefore: "If I had studied harder, I would",
                  stemAfter: "passed.（have）",
                  answer: "have",
                  accept: ["have"],
                  tip: "与过去相反，主句 would + have + 过去分词。"
                },
                {
                  type: "choice",
                  stem: "与过去事实相反，主句的结构是：",
                  options: ["would + 原形", "would have + 过去分词", "will + 原形"],
                  answer: 1,
                  tip: "过去假想：would have done。"
                },
                {
                  type: "fill",
                  stemBefore: "If I",
                  stemAfter: "you, I would take the chance.（be，书面）",
                  answer: "were",
                  accept: ["were"],
                  tip: "If I were you——固定搭配，书面 were。"
                }
              ],
              point: "自查：分清真假 → 现在退一级（were）/ 过去退两级（had done）→ 主句 would（have）。"
            }
          ]
        },
        /* ================= gr16.1.2 与将来相反与混合虚拟 ================= */
        {
          id: "gr16.1.2",
          title: "与将来相反与混合虚拟",
          pages: [
            {
              id: "gr16.1.2-p1",
              kind: "observe",
              title: "先看三句话：should 是“ 应该 ”吗？",
              sentences: [
                { id: "gr16.1.2-e1", en: "If it should rain tomorrow, we would stay home.", zh: "如果明天下雨（小可能），我们就待家里。", reg: "通用",
                  tagged: [ { w: "If it should rain tomorrow", role: "adverb", label: "虚拟条件句（与将来相反）" }, { w: "we", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "stay", role: "verb", label: "动词原形" }, { w: "home", role: "adverb", label: "状语" } ] },
                { id: "gr16.1.2-e2", en: "If it were to rain tomorrow, the game would stop.", zh: "如果明天下雨（几乎不可能），比赛就停了。", reg: "通用",
                  tagged: [ { w: "If it were to rain tomorrow", role: "adverb", label: "虚拟条件句（与将来相反）" }, { w: "the game", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "stop", role: "verb", label: "动词原形" } ] },
                { id: "gr16.1.2-e3", en: "If I had worked harder, I would be a teacher now.", zh: "如果当年更努力，我现在就是老师了。（混合）", reg: "通用",
                  tagged: [ { w: "If I had worked harder", role: "adverb", label: "虚拟条件句（过去）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "a teacher now", role: "complem", label: "表语" } ] }
              ],
              guess: {
                q: "第一句 If it should rain 里，should 是“ 应该 ”的意思吗？",
                options: ["是，应该下雨", "不是——是“ 万一 ”的虚拟信号（小可能）", "不知道"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "与将来相反：should（小可能）/ were to（几乎不可能）；混合虚拟：过去的条件 → 现在的后果。"
            },
            {
              id: "gr16.1.2-p2",
              kind: "interact",
              title: "标出混合句：从句管过去，主句管现在",
              exploreTip: "混合句两边时间不一样——从句看过去（had worked），主句看现在（would be…now）。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "If I had worked harder", role: "adverb", label: "虚拟条件句（过去）" },
                      { w: "I", role: "subject", label: "主语" },
                      { w: "would", role: "verb", label: "助动词" },
                      { w: "be", role: "verb", label: "动词原形" },
                      { w: "a teacher now", role: "complem", label: "表语（现在）" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语 / 助动词" },
                      { role: "complem", label: "表语" },
                      { role: "adverb", label: "状语（从句块）" }
                    ],
                    hint: "从句 had worked（过去）→ 主句 would be（现在）：两边各管各的时间。"
                  }
                },
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SV",
                    blocks: [
                      { w: "If it were to rain tomorrow", role: "adverb" },
                      { w: "the game", role: "subject" },
                      { w: "would", role: "verb" },
                      { w: "stop", role: "verb" }
                    ],
                    hint: "were to = 几乎不可能发生——比 should 更“ 假 ”。",
                    doneNote: "If it were to rain tomorrow, the game would stop.——将来假想最不可能的一档。"
                  }
                }
              ],
              point: "混合虚拟 = 从句过去（had done）+ 主句现在（would do）；将来虚拟分两档：should（小可能）/ were to（几乎不可能）。"
            },
            {
              id: "gr16.1.2-p3",
              kind: "explain",
              title: "将来两档 + 混合时间",
              lead: "还记得吗？should rain 是小可能，were to rain 几乎不可能；混合句从句管过去、主句管现在。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr16.1.2-e1", "gr16.1.2-e2", "gr16.1.2-e3"],
                  note: "三句话：第一句将来小可能，第二句将来几乎不可能，第三句过去条件 → 现在后果。"
                },
                {
                  type: "idcard",
                  rule: "与将来事实相反：if + should + 动词原形（小可能发生）/ if + were to + 动词原形（几乎不可能发生），主句 would / could / might + 原形。混合虚拟：if 从句用过去完成（过去的条件），主句用 would + 原形（现在的后果）——时间各管各。",
                  condition: "这里的 should 不是“ 应该 ”，是“ 万一 ”的信号；were to 可能性最低。混合句看时间状语（now / then）定主句时态。"
                },
                {
                  type: "bridge",
                  zh: "汉语都说“ 要是……就…… ”，可能性大小靠语气猜。",
                  en: "英语把“ 多假 ”也编码了：should = 小可能（还有点盼头），were to = 几乎不可能（纯属假设）。混合句更直接：过去没做到 → 现在吃苦果，两边时间各说各的。",
                  unbridge: "别把虚拟句里的 should 当“ 应该 ”翻——“ 如果他应该来 ”是错的，应是“ 万一他来 ”。"
                },
                {
                  type: "spell",
                  rule: "将来虚拟公式：if + should do（小可能）/ if + were to do（几乎不可能）；混合公式：if + had done（过去），主句 would do（现在）。主句别跟着从句一起降级——后果在现在，就用现在形。"
                },
                {
                  type: "contrast",
                  wrong: "If I had worked harder, I would have been a teacher now.",
                  wrongZh: "（✗ 错句）",
                  right: "If I had worked harder, I would be a teacher now.",
                  why: "后果在“ 现在 ”（now）——主句用 would be，别跟着从句降到 have been。"
                }
              ],
              point: "将来虚拟两档（should / were to）；混合 = 过去条件 + 现在后果，各管各的时间。",
              pointScroll: true
            },
            {
              id: "gr16.1.2-p4",
              kind: "quiz",
              title: "练一练：哪一档？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 万一明天下雨 ”（小可能）选：",
                  options: ["If it rains tomorrow", "If it should rain tomorrow", "If it were to rain tomorrow"],
                  answer: 1,
                  tip: "小可能 → should；rains 是真实条件（主将从现）。"
                },
                {
                  type: "choice",
                  stem: "If she had listened, she would know the truth now. 这是：",
                  options: ["与过去相反", "与现在相反", "混合虚拟（过去条件 → 现在后果）"],
                  answer: 2,
                  tip: "从句 had listened（过去），主句 would know…now（现在）。"
                },
                {
                  type: "fill",
                  stemBefore: "If it",
                  stemAfter: "to rain tomorrow, the game would stop.（be，几乎不可能）",
                  answer: "were",
                  accept: ["were"],
                  tip: "几乎不可能 → were to + 原形。"
                },
                {
                  type: "fill",
                  stemBefore: "If he",
                  stemAfter: ", tell me.（come，小可能）",
                  answer: "should come",
                  accept: ["should come"],
                  tip: "小可能 → should + 原形。"
                }
              ],
              point: "自查：should（小可能）/ were to（几乎不可能）/ 混合（过去条件 + 现在后果）。"
            }
          ]
        },
        /* ================= gr16.1.3 含蓄条件 ================= */
        {
          id: "gr16.1.3",
          title: "含蓄条件",
          pages: [
            {
              id: "gr16.1.3-p1",
              kind: "observe",
              title: "先看三句话：if 藏哪儿了？",
              sentences: [
                { id: "gr16.1.3-e1", en: "Without your help, I would have failed.", zh: "若没有你的帮助，我就失败了。", reg: "通用",
                  tagged: [ { w: "Without your help", role: "adverb", label: "含蓄条件" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "have failed", role: "verb", label: "动词完成式" } ] },
                { id: "gr16.1.3-e2", en: "But for the rain, we would have had a good trip.", zh: "若没有这场雨，我们的旅行就很愉快了。", reg: "通用",
                  tagged: [ { w: "But for the rain", role: "adverb", label: "含蓄条件" }, { w: "we", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "have had", role: "verb", label: "动词完成式" }, { w: "a good trip", role: "object", label: "宾语" } ] },
                { id: "gr16.1.3-e3", en: "Had I known the truth, I would not have come.", zh: "我要是早知道真相，就不来了。（= If I had known）", reg: "书面",
                  tagged: [ { w: "Had I known the truth", role: "adverb", label: "虚拟倒装（含蓄条件）" }, { w: "I", role: "subject", label: "主语" }, { w: "would", role: "verb", label: "助动词" }, { w: "not have come", role: "verb", label: "动词完成式" } ] }
              ],
              guess: {
                q: "第一句 Without your help 里，有 if 这个词吗？",
                options: ["有 if，但藏起来了（含蓄条件）", "没有 if，就是普通状语", "不知道"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "含蓄条件 = 没有 if，但有“ 要不是… ”的意思；倒装（Had I known）= 把 if 省掉、助动词提前。"
            },
            {
              id: "gr16.1.3-p2",
              kind: "interact",
              title: "标出倒装句，再拼一句含蓄条件",
              exploreTip: "倒装句 Had I known = If I had known——助动词跑到了主语前面。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Had I known the truth", role: "adverb", label: "虚拟倒装（含蓄条件）" },
                      { w: "I", role: "subject", label: "主语" },
                      { w: "would", role: "verb", label: "助动词" },
                      { w: "not have come", role: "verb", label: "动词完成式" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语 / 助动词" },
                      { role: "adverb", label: "状语（倒装块）" }
                    ],
                    hint: "Had 跑到了 I 前面——这是省略 if 的倒装，只用于书面语。"
                  }
                },
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SV",
                    blocks: [
                      { w: "But for the rain", role: "adverb" },
                      { w: "we", role: "subject" },
                      { w: "would", role: "verb" },
                      { w: "have had", role: "verb" },
                      { w: "a good trip", role: "object" }
                    ],
                    hint: "but for = 若没有（书面）——后面跟名词，主句照样虚拟。",
                    doneNote: "But for the rain, we would have had a good trip.——没有 if，条件意还在。"
                  }
                }
              ],
              point: "倒装 = 省 if + 助动词提前（Had I / Were I / Should he）；without / but for / otherwise 自带条件意。"
            },
            {
              id: "gr16.1.3-p3",
              kind: "explain",
              title: "没有 if 的条件",
              lead: "还记得吗？without / but for 藏着“ 要不是… ”；Had I known = If I had known，只是把 if 拿掉了。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr16.1.3-e1", "gr16.1.3-e3", "gr16.1.3-e4"],
                  note: "三句话：第一句 without 含蓄条件，第三、四句是倒装（Had / Were 开头）。"
                },
                {
                  type: "idcard",
                  rule: "含蓄条件：without / but for（若没有）/ otherwise（否则）本身含条件意，主句用虚拟（would / would have）。虚拟倒装：省略 if，把 had / were / should 提前到主语前（Had I known = If I had known；Were I you = If I were you；Should he come = If he should come）。",
                  condition: "倒装只用于书面语；otherwise 后面跟虚拟主句（would），别跟 will。but for 后面跟名词，不跟从句。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 要不是你，我就完了 ”——“ 要不是 ”就是含蓄条件，不用“ 如果 ”。",
                  en: "英语也一样：without / but for = “ 要不是 ”，otherwise = “ 否则 ”。倒装更省：干脆把 if 删掉，助动词往前一站（Had I…），意思不变——这是书面语的优雅，不是新语法。",
                  unbridge: "别把倒装当疑问句翻——Had I known 不是“ 我知道了吗？ ”，而是“ 我要是早知道 ”。"
                },
                {
                  type: "spell",
                  rule: "倒装三公式：Had + 主 + done（= If + had done）；Were + 主（= If + were）；Should + 主 + do（= If + should do）。记住：只有 had / were / should 能当前锋。"
                },
                {
                  type: "contrast",
                  wrong: "Without water, we will die.",
                  wrongZh: "（✗ 错句）",
                  right: "Without water, we would die.",
                  why: "含蓄条件的主句也要虚拟——will 换成 would（“ 要是没有水，我们会死 ”是假想）。但“ 没有水人会死 ”是真理时可用 will：Without water, plants will die.（看语境）"
                }
              ],
              point: "含蓄条件（without / but for / otherwise）+ 虚拟倒装（Had / Were / Should 提前）——都是书面语的省 if 玩法。",
              pointScroll: true
            },
            {
              id: "gr16.1.3-p4",
              kind: "quiz",
              title: "练一练：把 if 藏起来",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我要是早知道真相 ”的倒装是：",
                  options: ["If I had known the truth", "Had I known the truth", "Have I known the truth"],
                  answer: 1,
                  tip: "省 if，had 提前：Had I known…"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "your help, I would have failed.（若没有）",
                  answer: "Without",
                  accept: ["Without"],
                  tip: "若没有你的帮助 → Without your help（含蓄条件）。"
                },
                {
                  type: "choice",
                  stem: "Were I you, I would go. 等于：",
                  options: ["If I am you, I will go", "If I were you, I would go", "Was I you, I would go"],
                  answer: 1,
                  tip: "Were 提前 = If I were you 的倒装。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: ", we would be late.（否则）",
                  answer: "Otherwise",
                  accept: ["Otherwise"],
                  tip: "否则 → Otherwise，主句 would（虚拟）。"
                }
              ],
              point: "自查：without / but for / otherwise 自带条件意；倒装 = Had / Were / Should 提前。"
            }
          ]
        }
      ]
    },
    {
      id: "gr16-u2",
      title: "其他虚拟句型",
      lessons: [
        /* ================= gr16.2.1 名词性从句中的虚拟 ================= */
        {
          id: "gr16.2.1",
          title: "名词性从句中的虚拟",
          pages: [
            {
              id: "gr16.2.1-p1",
              kind: "observe",
              title: "先看三句话：从句动词为什么是原形？",
              sentences: [
                { id: "gr16.2.1-e1", en: "He suggested that we leave early.", zh: "他建议我们早点离开。（美式：should 省）", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "suggested", role: "verb", label: "谓语" }, { w: "that we (should) leave early", role: "object", label: "宾语从句（虚拟）" } ] },
                { id: "gr16.2.1-e2", en: "He suggested that we should leave early.", zh: "他建议我们早点离开。（英式：should 留）", reg: "书面",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "suggested", role: "verb", label: "谓语" }, { w: "that we should leave early", role: "object", label: "宾语从句（虚拟）" } ] },
                { id: "gr16.2.1-e6", en: "She insisted that he was right.", zh: "她坚持认为他是对的。（坚持认为→陈述）", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "insisted", role: "verb", label: "谓语" }, { w: "that he was right", role: "object", label: "宾语从句（陈述）" } ] }
              ],
              guess: {
                q: "第三句 She insisted that he was right 里，insist 是“ 坚持要求 ”吗？",
                options: ["是——坚持要求他对", "不是——是“ 坚持认为 ”（陈述一个看法）", "不知道"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "insist 双义：坚持要求（虚拟：he go）vs 坚持认为（陈述：he was）；suggest 这类词后从句动词用原形。"
            },
            {
              id: "gr16.2.1-p2",
              kind: "interact",
              title: "标出从句虚拟块，再拼一句命令",
              exploreTip: "先标宾语从句整体块——动词原形 leave / stay 就是虚拟的记号。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "suggested", role: "verb", label: "谓语" },
                      { w: "that we (should) leave early", role: "object", label: "宾语从句（虚拟）" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语（从句块）" }
                    ],
                    hint: "leave 是原形，不是 leaves——这就是虚拟的记号（should 被省了）。"
                  }
                },
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVO",
                    blocks: [
                      { w: "The doctor", role: "subject" },
                      { w: "ordered", role: "verb" },
                      { w: "that he stay in bed", role: "object" }
                    ],
                    hint: "order 后从句动词用原形 stay——不能是 stays / will stay。",
                    doneNote: "The doctor ordered that he stay in bed.——命令类动词，从句动词钉死在原形。"
                  }
                }
              ],
              point: "建议 / 命令 / 要求类动词 + that 从句 → (should) + 动词原形；insist 看意思分虚拟 / 陈述。"
            },
            {
              id: "gr16.2.1-p3",
              kind: "explain",
              title: "“ 钉死 ”在原形",
              lead: "还记得吗？suggest 后面 leave 是原形（should 省了）；insist 要看意思是“ 要求 ”还是“ 认为 ”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr16.2.1-e1", "gr16.2.1-e5", "gr16.2.1-e6"],
                  note: "三句话：第一句 suggest 虚拟，第二句 insist 坚持要求（虚拟），第三句 insist 坚持认为（陈述）。"
                },
                {
                  type: "idcard",
                  rule: "suggest / order / insist（坚持要求）/ demand / ask / request 等 + that 宾语从句 → (should) + 动词原形。It is important / necessary / strange / natural… that… 主语从句同理。美式英语省 should，英式英语保留 should（语域差异）。",
                  condition: "insist（坚持认为）/ suggest（暗示）表陈述时从句正常时态。主句是过去时（suggested）从句照样用原形——不受主从时态一致牵制。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 建议我们早点离开 ”——“ 离开 ”不变形。",
                  en: "英语把“ 还没发生、只是希望 ”的意思钉在动词原形上：should 本来在那儿（should leave），美式嫌啰嗦省了，英式留着。原形 = “ 还没实现 ”的记号。",
                  unbridge: "别按汉语“ 时态一致 ”去改——suggested 是过去时，从句 leave 照样原形，不是“ 时态错误 ”。"
                },
                {
                  type: "spell",
                  rule: "触发词口诀：建议（suggest / advise / propose）、命令（order / demand / command）、要求（insist 坚持要求 / ask / request / require）、重要必要（important / necessary / essential）。口诀：“ 一坚持（insist）、二命令、三建议、四要求 ”。"
                },
                {
                  type: "contrast",
                  wrong: "He suggested that we will leave early.",
                  wrongZh: "（✗ 错句）",
                  right: "He suggested that we (should) leave early.",
                  why: "suggest 后从句不用 will——动词钉死在原形（should 可省）。这是高考高频改错点。"
                }
              ],
              point: "建议 / 命令 / 要求 + that 从句 → (should) + 原形；insist 双义看意思；美式省 should、英式留。",
              pointScroll: true
            },
            {
              id: "gr16.2.1-p4",
              kind: "quiz",
              title: "练一练：原形钉死了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "He suggested that we ___ early.",
                  options: ["will leave", "leave", "leaves"],
                  answer: 1,
                  tip: "suggest 后从句动词用原形 leave。"
                },
                {
                  type: "fill",
                  stemBefore: "The doctor ordered that he",
                  stemAfter: "in bed.（stay）",
                  answer: "stay",
                  accept: ["stay", "should stay"],
                  tip: "order 后从句 stay 原形（should 可留）。"
                },
                {
                  type: "choice",
                  stem: "She insisted that he ___ with her.（坚持要求他去）",
                  options: ["goes", "go", "will go"],
                  answer: 1,
                  tip: "坚持要求 → 虚拟：go 原形。"
                },
                {
                  type: "fill",
                  stemBefore: "It is important that we",
                  stemAfter: "on time.（be）",
                  answer: "be",
                  accept: ["be", "should be"],
                  tip: "It is important that… 从句 be 原形。"
                }
              ],
              point: "自查：触发词（建议 / 命令 / 要求 / 重要）→ 从句 (should) + 原形；insist 看意思。"
            }
          ]
        },
        /* ================= gr16.2.2 It is time / would rather 虚拟 ================= */
        {
          id: "gr16.2.2",
          title: "It is time / would rather 虚拟",
          pages: [
            {
              id: "gr16.2.2-p1",
              kind: "observe",
              title: "先看三句话：“ 该走了 ”有几种说法？",
              sentences: [
                { id: "gr16.2.2-e1", en: "It's time we left.", zh: "我们该走了。（虚拟：早该走了）", reg: "通用",
                  tagged: [ { w: "It's time", role: "subject", label: "主语" }, { w: "we left", role: "complem", label: "虚拟从句（过去式）" } ] },
                { id: "gr16.2.2-e5", en: "It's time for us to leave.", zh: "我们该走了。（不定式：就事论事）", reg: "通用",
                  tagged: [ { w: "It's time", role: "subject", label: "主语" }, { w: "for us to leave", role: "complem", label: "不定式（陈述）" } ] },
                { id: "gr16.2.2-e4", en: "I would rather stay at home.", zh: "我宁愿待在家里。（主语一致 + 原形）", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "would rather", role: "verb", label: "谓语" }, { w: "stay at home", role: "object", label: "宾语（不定式省略 to）" } ] }
              ],
              guess: {
                q: "It's time we left 和 It's time for us to leave，意思完全一样吗？",
                options: ["完全一样", "不一样——前者有“ 早该走了 ”的埋怨 / 虚拟味", "不知道"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "It's time + 过去式 = “ 早该…了 ”（虚拟）；It's time to do = 就事论事；would rather 看主语同不同。"
            },
            {
              id: "gr16.2.2-p2",
              kind: "interact",
              title: "标出虚拟从句，再拼 would rather",
              exploreTip: "先标 we left / you went to bed——过去式出现在这里，就是虚拟的记号。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "It's high time", role: "subject", label: "主语" },
                      { w: "you went to bed", role: "complem", label: "虚拟从句（过去式）" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "complem", label: "表语（从句块）" }
                    ],
                    hint: "went 是过去式，但说的却是“ 现在该睡 ”——时态降级 = 虚拟。"
                  }
                },
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVO",
                    blocks: [
                      { w: "I", role: "subject" },
                      { w: "would rather", role: "verb" },
                      { w: "you came tomorrow", role: "object" }
                    ],
                    hint: "主语不一致（I … you）→ 从句用过去式 came。",
                    doneNote: "I would rather you came tomorrow.——宁愿“ 你 ”明天来，从句过去式。"
                  }
                }
              ],
              point: "It's (high) time + 过去式；would rather：主语一致 + 原形，主语不一致 + 过去式。"
            },
            {
              id: "gr16.2.2-p3",
              kind: "explain",
              title: "“ 早该 ”和“ 宁愿 ”",
              lead: "还记得吗？It's time we left 有埋怨味，for us to leave 就事论事；would rather 后面主语同不同，动词不一样。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr16.2.2-e1", "gr16.2.2-e3", "gr16.2.2-e4"],
                  note: "三句话：第一句 It's time 虚拟，第二句 would rather + 过去式（主语不一致），第三句 would rather + 原形（主语一致）。"
                },
                {
                  type: "idcard",
                  rule: "It's (high) time (that) + 主语 + 过去式 = “ （早）该…了 ”（high 语气更强）；would rather + 从句：主语一致时 + 动词原形（I would rather stay），主语不一致时 + 过去式 / 过去完成（I would rather you came / had come）。",
                  condition: "It's time to do / It's time for sb to do 是陈述（就事论事），不带埋怨味。would rather 后省略 to（stay 不是 to stay）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“ 该走了 ”一句通用，语气靠“ 早 ”字和表情。",
                  en: "英语分两套：to do = 客观说时间到了；过去式 = “ 早该…了 ”的埋怨（虚拟）。would rather 更细：自己宁愿（原形）vs 宁愿别人（过去式）——主语一变，时态就降级。",
                  unbridge: "别把 It's time we left 当“ 过去时说过去的事 ”——left 说的是现在该走，过去式只是虚拟的记号。"
                },
                {
                  type: "spell",
                  rule: "公式：It's (high) time + 过去式；would rather + 原形（同主语）/ 过去式（异主语现在）/ had done（异主语过去）。口诀：“ 同主原形，异主降级 ”。"
                },
                {
                  type: "contrast",
                  wrong: "It's time we leave.",
                  wrongZh: "（✗ 错句）",
                  right: "It's time we left.",
                  why: "It's time 后从句用过去式（虚拟）——leave 原形是错的。就事论事才用 It's time to leave。"
                }
              ],
              point: "It's (high) time + 过去式（早该）；would rather 同主原形、异主降级；to do 版是陈述。",
              pointScroll: true
            },
            {
              id: "gr16.2.2-p4",
              kind: "quiz",
              title: "练一练：早该还是就事论事？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 你早该睡觉了 ”（带埋怨）选：",
                  options: ["It's time for you to go to bed", "It's high time you went to bed", "It's time you go to bed"],
                  answer: 1,
                  tip: "埋怨 → high time + 过去式 went。"
                },
                {
                  type: "fill",
                  stemBefore: "I would rather you",
                  stemAfter: "tomorrow.（come）",
                  answer: "came",
                  accept: ["came"],
                  tip: "主语不一致（I…you）→ 过去式 came。"
                },
                {
                  type: "choice",
                  stem: "I would rather ___ at home.（我自己）",
                  options: ["stayed", "stay", "to stay"],
                  answer: 1,
                  tip: "主语一致 → 原形 stay（省略 to）。"
                },
                {
                  type: "fill",
                  stemBefore: "It's time we",
                  stemAfter: ".（leave，早该走了）",
                  answer: "left",
                  accept: ["left"],
                  tip: "It's time + 过去式：left。"
                }
              ],
              point: "自查：埋怨 → 过去式；would rather 同主原形、异主降级；陈述用 to do。"
            }
          ]
        },
        /* ================= gr16.2.3 wish 与 as if 虚拟 ================= */
        {
          id: "gr16.2.3",
          title: "wish 与 as if 虚拟",
          pages: [
            {
              id: "gr16.2.3-p1",
              kind: "observe",
              title: "先看三句话：愿望越假，时态越退",
              sentences: [
                { id: "gr16.2.3-e1", en: "I wish I were taller.", zh: "我要是再高一点就好了。（与现在相反）", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wish", role: "verb", label: "谓语" }, { w: "I were taller", role: "object", label: "宾语从句（虚拟）" } ] },
                { id: "gr16.2.3-e2", en: "I wish I had studied harder.", zh: "我要是当时更努力就好了。（过去遗憾）", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wish", role: "verb", label: "谓语" }, { w: "I had studied harder", role: "object", label: "宾语从句（虚拟）" } ] },
                { id: "gr16.2.3-e7", en: "It looks as if it is going to rain.", zh: "看起来要下雨了。（可能为真，陈述）", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "looks", role: "verb", label: "谓语" }, { w: "as if it is going to rain", role: "adverb", label: "方式状语从句（陈述）" } ] }
              ],
              guess: {
                q: "I wish I were taller 里，were 说明我现在高还是不高？",
                options: ["现在不高（与现在相反的愿望）", "过去不高", "不知道"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "wish + 过去式（现在愿望）/ had done（过去遗憾）；as if 假装用虚拟，可能为真用陈述。"
            },
            {
              id: "gr16.2.3-p2",
              kind: "interact",
              title: "标出 as if 虚拟块，再拼 wish 句",
              exploreTip: "as if 后面跟过去式 knew = 假装；跟 is going to = 可能为真——先标块再判断。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "talks", role: "verb", label: "谓语" },
                      { w: "as if he knew everything", role: "adverb", label: "方式状语从句（虚拟）" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语（从句块）" }
                    ],
                    hint: "knew 是过去式——他其实并不知道一切，这是假装（gr15.2.2 兑现）。"
                  }
                },
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVO",
                    blocks: [
                      { w: "I", role: "subject" },
                      { w: "wish", role: "verb" },
                      { w: "I were taller", role: "object" }
                    ],
                    hint: "现在的愿望 → 从句过去式（were）。",
                    doneNote: "I wish I were taller.——现在不够高，所以用 were。"
                  }
                }
              ],
              point: "wish 现在愿望 + 过去式，过去遗憾 + had done；as if 假装 + 过去式，可能为真 + 陈述。"
            },
            {
              id: "gr16.2.3-p3",
              kind: "explain",
              title: "愿望和假装",
              lead: "还记得吗？wish 后面时态越退，愿望越“ 假 ”；as if 的 knew 是假装，is going to 可能是真的。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr16.2.3-e1", "gr16.2.3-e2", "gr16.2.3-e3"],
                  note: "三句话：第一句现在愿望（were），第二句过去遗憾（had studied），第三句 as if 假装（knew）。"
                },
                {
                  type: "idcard",
                  rule: "wish + 宾语从句：现在的愿望用过去式（I wish I were taller），过去的遗憾用过去完成（I wish I had studied harder），将来的愿望用 would / could（I wish you would come）。as if / as though：表示“ 假装、与事实相反 ”用过去式 / had done；表示“ 可能为真 ”用陈述语气。",
                  condition: "wish 不接将来时（✗ I wish it will rain）——想说将来用 hope（I hope it will rain）。as if 先看语境：真假难辨时看说话人态度。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 我要是再高一点就好了 ”——“ 要是…就好了 ”包办一切。",
                  en: "英语把愿望的“ 假度 ”也标出来：现在不够高 → were（退一级）；过去没努力 → had studied（退两级）；将来想让人来 → would（还没发生）。越实现不了，时态退得越远。",
                  unbridge: "别把 wish 当 hope 用——wish 专管“ 实现不了的愿望 ”，能实现的愿望用 hope + 将来时。"
                },
                {
                  type: "spell",
                  rule: "wish 公式：wish + 过去式（现在）/ had done（过去）/ would do（将来）。as if 公式：假装 → 过去式（与现在）/ had done（与过去）；可能真 → 陈述。"
                },
                {
                  type: "contrast",
                  wrong: "I wish it will rain tomorrow.",
                  wrongZh: "（✗ 错句）",
                  right: "I hope it will rain tomorrow.",
                  why: "wish 不搭将来时——能实现的愿望用 hope + will；wish 留给实现不了的（I wish it would rain）。"
                }
              ],
              point: "wish = 实现不了的愿望（时态后退）；hope = 能实现的（正常时态）；as if 看真假选虚拟 / 陈述。",
              pointScroll: true
            },
            {
              id: "gr16.2.3-p4",
              kind: "quiz",
              title: "练一练：愿望有多假？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我要是再高一点就好了 ”（现在不高）选：",
                  options: ["I wish I am taller", "I wish I were taller", "I wish I had been taller"],
                  answer: 1,
                  tip: "现在愿望 → 过去式 were。"
                },
                {
                  type: "fill",
                  stemBefore: "I wish I",
                  stemAfter: "harder.（study，过去遗憾）",
                  answer: "had studied",
                  accept: ["had studied"],
                  tip: "过去遗憾 → had + 过去分词。"
                },
                {
                  type: "choice",
                  stem: "He talks as if he ___ everything.（假装）",
                  options: ["knows", "knew", "will know"],
                  answer: 1,
                  tip: "假装 → 过去式 knew。"
                },
                {
                  type: "choice",
                  stem: "“ 我希望明天下雨 ”（能实现）选：",
                  options: ["I wish it will rain tomorrow", "I hope it will rain tomorrow", "I wish it would rain tomorrow"],
                  answer: 1,
                  tip: "能实现的愿望 → hope + will。"
                }
              ],
              point: "自查：wish 愿望后退（过去式 / had done / would）；as if 假装虚拟、可能真陈述。"
            }
          ]
        },
        /* ================= gr16.2.4 本章小结与习题（高考） ================= */
        {
          id: "gr16.2.4",
          title: "本章小结与习题（高考）",
          pages: [
            {
              id: "gr16.2.4-p1",
              kind: "explain",
              title: "虚拟语气总表",
              lead: "全章七员大将集结：if 条件句三时 + 含蓄条件 + 从句虚拟 + It's time / would rather + wish / as if。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr16.1.1-e3", "gr16.2.1-e1", "gr16.2.2-e1"],
                  note: "三句话：If I were you（条件虚拟）、suggest 从句（原形虚拟）、It's time we left（过去式虚拟）。"
                },
                {
                  type: "idcard",
                  rule: "虚拟总表：① if 条件句——与现在相反（过去式 were / would do）、与过去相反（had done / would have done）、与将来相反（should do / were to do）、混合（had done + would do）；② 含蓄条件（without / but for / otherwise；倒装 Had / Were / Should）；③ 名词性从句（suggest 等 + (should) + 原形）；④ It's (high) time + 过去式；would rather 同主原形、异主降级；⑤ wish + 过去式 / had done / would；as if 假装虚拟。",
                  condition: "做题三问：① 真事还是假想（真事走主将从现）？② 哪种虚拟（看触发词：if / suggest / It's time / wish）？③ 时态降对级了吗（现在退一、过去退二）？"
                },
                {
                  type: "bridge",
                  zh: "汉语虚拟全靠“ 要是、假如、要是…就好了 ”，动词不变。",
                  en: "英语虚拟全靠“ 时态降级 ”和“ 动词原形 ”两套记号：if 条件句降时态（were / had done），suggest 这类词钉原形（leave）。记住记号，做题就是找记号。",
                  unbridge: "别把汉语“ 不变 ”搬过来——英语虚拟一定有形态记号，没记号的就是陈述（真事）。"
                },
                {
                  type: "contrast",
                  wrong: "If I was you, I would take the chance.",
                  wrongZh: "（✗ 错句，书面）",
                  right: "If I were you, I would take the chance.",
                  why: "本章最大坑：书面 were 通用——was 留给口语，考试一律 were。"
                }
              ],
              point: "虚拟 = 假想记号：if 句降时态，suggest 句钉原形；先分真假，再找触发词，再对时态。",
              pointScroll: true
            },
            {
              id: "gr16.2.4-p2",
              kind: "quiz",
              title: "高考综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "If I ___ you, I would take the chance.",
                  options: ["am", "was", "were"],
                  answer: 2,
                  tip: "书面虚拟：were 通用。"
                },
                {
                  type: "fill",
                  stemBefore: "He suggested that we",
                  stemAfter: "early.（leave）",
                  answer: "leave",
                  accept: ["leave", "should leave"],
                  tip: "suggest 后从句动词原形。"
                },
                {
                  type: "choice",
                  stem: "If I had worked harder, I ___ a teacher now.",
                  options: ["would have been", "would be", "will be"],
                  answer: 1,
                  tip: "混合：过去条件 + 现在后果 → would be。"
                },
                {
                  type: "fill",
                  stemBefore: "It's time we",
                  stemAfter: ".（leave）",
                  answer: "left",
                  accept: ["left"],
                  tip: "It's time + 过去式。"
                },
                {
                  type: "choice",
                  stem: "Had I known the truth, I ___ not have come.",
                  options: ["will", "would", "shall"],
                  answer: 1,
                  tip: "倒装虚拟，主句 would。"
                }
              ],
              point: "本章通关：三时虚拟 + 混合 + 含蓄条件 / 倒装 + 从句虚拟 + It's time / would rather + wish / as if。"
            }
          ]
        }
      ]
    }
  ]
};