/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr13：名词性从句
 *
 * 数据口径（M5）：window.ENG_CH["gr13"] = { id, title, sentences, units }，
 * 与数学 window.MATH_CH 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 单元 gr13.1 宾语从句（gr13.1.1–gr13.1.4）· 单元 gr13.2 主语 /
 * 表语 / 同位语从句与间接引语（gr13.2.1–gr13.2.4）。每课：
 * 观察页（例句先行 + Y1 先猜后验）→ 交互页（clause-slots /
 * tagging / sentence-builder）→ 讲解页（examples → idcard →
 * bridge → spell → contrast）→ 练习页（Y3 判分：choice / fill）。
 * 例句全部来自 D3 三审台账（modules/english/data/_review/
 * ledger-gr13.json），id 一一对应，未终审例句不得入库。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=红队终审通过（见台账 first/final 记录）。
 * 撰写：语法生产C队（2026-10-14），状态 drafted，待三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr13"] = {
  id: "gr13",
  title: "名词性从句",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr13.json 逐字一致。从句整体先标为成分块，
   * 内部结构在交互页 / 讲解页中拆解。 */
  sentences: {
    /* ---------- gr13.1.1 宾语从句的连接词 ---------- */
    "gr13.1.1-e1": { en: "I know that he is ill.", zh: "我知道他病了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "know", role: "verb", label: "谓语" }, { w: "that he is ill", role: "object", label: "宾语从句" } ] },
    "gr13.1.1-e2": { en: "I wonder if it will rain.", zh: "我想知道是否会下雨。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wonder", role: "verb", label: "谓语" }, { w: "if it will rain", role: "object", label: "宾语从句" } ] },
    "gr13.1.1-e3": { en: "He asked me where I lived.", zh: "他问我住在哪儿。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "asked", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "where I lived", role: "object", label: "宾语从句" } ] },
    "gr13.1.1-e4": { en: "She told me that she was busy.", zh: "她告诉我她很忙。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "told", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "that she was busy", role: "object", label: "宾语从句" } ] },
    "gr13.1.1-e5": { en: "Do you know what he said?", zh: "你知道他说了什么吗？", reg: "通用",
      tagged: [ { w: "Do", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "know", role: "verb", label: "谓语" }, { w: "what he said", role: "object", label: "宾语从句" } ] },
    "gr13.1.1-e6": { en: "I don't know whether he will come.", zh: "我不知道他是否会来。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't", role: "verb", label: "助动词" }, { w: "know", role: "verb", label: "谓语" }, { w: "whether he will come", role: "object", label: "宾语从句" } ] },
    "gr13.1.1-e7": { en: "I wonder it will rain.", zh: "（✗ 错句）本想说“ 我想知道是否会下雨 ”。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wonder", role: "verb", label: "谓语" }, { w: "it will rain", role: "object", label: "宾语从句（缺连接词）" } ] },
    /* ---------- gr13.1.2 宾语从句的语序与时态 ---------- */
    "gr13.1.2-e1": { en: "They asked him when he arrived.", zh: "他们问他什么时候到的。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "asked", role: "verb", label: "谓语" }, { w: "him", role: "object", label: "宾语" }, { w: "when he arrived", role: "object", label: "宾语从句" } ] },
    "gr13.1.2-e2": { en: "She said that she was busy.", zh: "她说她很忙。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "that she was busy", role: "object", label: "宾语从句" } ] },
    "gr13.1.2-e3": { en: "I think he will come tomorrow.", zh: "我想他明天会来。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "think", role: "verb", label: "谓语" }, { w: "he will come tomorrow", role: "object", label: "宾语从句" } ] },
    "gr13.1.2-e4": { en: "He asked me where did I live.", zh: "（✗ 错句）本想说“ 他问我住在哪儿 ”。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "asked", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "where did I live", role: "object", label: "宾语从句（语序错）" } ] },
    "gr13.1.2-e5": { en: "They told us that they had finished the work.", zh: "他们告诉我们他们已经完成了工作。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "told", role: "verb", label: "谓语" }, { w: "us", role: "object", label: "宾语" }, { w: "that they had finished the work", role: "object", label: "宾语从句" } ] },
    "gr13.1.2-e6": { en: "Do you know when he will arrive?", zh: "你知道他什么时候到吗？", reg: "通用",
      tagged: [ { w: "Do", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "know", role: "verb", label: "谓语" }, { w: "when he will arrive", role: "object", label: "宾语从句" } ] },
    "gr13.1.2-e7": { en: "She said she is busy.", zh: "（✗ 错句）本想说“ 她说她很忙 ”。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "she is busy", role: "object", label: "宾语从句（时态错）" } ] },
    /* ---------- gr13.1.3 that vs if/whether ---------- */
    "gr13.1.3-e1": { en: "I don't know whether to go.", zh: "我不知道是否该去。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't", role: "verb", label: "助动词" }, { w: "know", role: "verb", label: "谓语" }, { w: "whether to go", role: "object", label: "宾语从句" } ] },
    "gr13.1.3-e2": { en: "Whether it rains or not, we will go.", zh: "不管下不下雨，我们都去。", reg: "通用",
      tagged: [ { w: "Whether it rains or not", role: "subject", label: "主语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "助动词" }, { w: "go", role: "verb", label: "动词原形" } ] },
    "gr13.1.3-e3": { en: "I wonder if he is at home.", zh: "我想知道他在不在家。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wonder", role: "verb", label: "谓语" }, { w: "if he is at home", role: "object", label: "宾语从句" } ] },
    "gr13.1.3-e4": { en: "We discussed whether we should wait.", zh: "我们讨论了是否该等。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "discussed", role: "verb", label: "谓语" }, { w: "whether we should wait", role: "object", label: "宾语从句" } ] },
    "gr13.1.3-e5": { en: "I don't know if to go.", zh: "（✗ 错句）本想说“ 我不知道是否该去 ”。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't", role: "verb", label: "助动词" }, { w: "know", role: "verb", label: "谓语" }, { w: "if to go", role: "object", label: "宾语从句（连接词错）" } ] },
    "gr13.1.3-e6": { en: "They discussed if they should leave.", zh: "（✗ 错句）本想说“ 他们讨论是否该离开 ”。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "discussed", role: "verb", label: "谓语" }, { w: "if they should leave", role: "object", label: "宾语从句（连接词错）" } ] },
    "gr13.1.3-e7": { en: "Whether he comes or not doesn't matter.", zh: "他来不来没关系。", reg: "通用",
      tagged: [ { w: "Whether he comes or not", role: "subject", label: "主语从句" }, { w: "doesn't", role: "verb", label: "助动词" }, { w: "matter", role: "verb", label: "谓语" } ] },
    /* ---------- gr13.1.4 宾语从句特殊动词 ---------- */
    "gr13.1.4-e1": { en: "I doubt whether he will come.", zh: "我怀疑他是否会来。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "doubt", role: "verb", label: "谓语" }, { w: "whether he will come", role: "object", label: "宾语从句" } ] },
    "gr13.1.4-e2": { en: "I don't doubt that he will come.", zh: "我不怀疑他会来。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't", role: "verb", label: "助动词" }, { w: "doubt", role: "verb", label: "谓语" }, { w: "that he will come", role: "object", label: "宾语从句" } ] },
    "gr13.1.4-e3": { en: "I wonder if it will rain tomorrow.", zh: "我想知道明天是否下雨。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wonder", role: "verb", label: "谓语" }, { w: "if it will rain tomorrow", role: "object", label: "宾语从句" } ] },
    "gr13.1.4-e4": { en: "He suggested that we leave early.", zh: "他建议我们早点离开。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "suggested", role: "verb", label: "谓语" }, { w: "that we leave early", role: "object", label: "宾语从句" } ] },
    "gr13.1.4-e5": { en: "I suggest if we leave early.", zh: "（✗ 错句）本想说“ 我建议我们早点离开 ”。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "suggest", role: "verb", label: "谓语" }, { w: "if we leave early", role: "object", label: "宾语从句（连接词错）" } ] },
    "gr13.1.4-e6": { en: "I doubt that he won't come.", zh: "（✗ 错句）本想说“ 我怀疑他是否会来 ”。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "doubt", role: "verb", label: "谓语" }, { w: "that he won't come", role: "object", label: "宾语从句（双重否定）" } ] },
    "gr13.1.4-e7": { en: "I wonder whether he knows the answer.", zh: "我想知道他是否知道答案。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wonder", role: "verb", label: "谓语" }, { w: "whether he knows the answer", role: "object", label: "宾语从句" } ] },
    /* ---------- gr13.2.1 主语从句与形式主语 it ---------- */
    "gr13.2.1-e1": { en: "It is important that we learn English well.", zh: "学好英语很重要。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "important", role: "complem", label: "表语" }, { w: "that we learn English well", role: "subject", label: "主语从句（真正主语）" } ] },
    "gr13.2.1-e2": { en: "It is true that he helped us.", zh: "他帮过我们，这是真的。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "true", role: "complem", label: "表语" }, { w: "that he helped us", role: "subject", label: "主语从句（真正主语）" } ] },
    "gr13.2.1-e3": { en: "That we finish on time is important.", zh: "我们按时完成很重要。", reg: "书面",
      tagged: [ { w: "That we finish on time", role: "subject", label: "主语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "important", role: "complem", label: "表语" } ] },
    "gr13.2.1-e4": { en: "It doesn't matter whether you come or not.", zh: "你来不来没关系。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "doesn't", role: "verb", label: "助动词" }, { w: "matter", role: "verb", label: "谓语" }, { w: "whether you come or not", role: "subject", label: "主语从句（真正主语）" } ] },
    "gr13.2.1-e5": { en: "That is important that we learn English.", zh: "（✗ 错句）本想说“ 学好英语很重要 ”。", reg: "通用",
      tagged: [ { w: "That", role: "subject", label: "主语（杂糅）" }, { w: "is", role: "verb", label: "谓语" }, { w: "important", role: "complem", label: "表语" }, { w: "that we learn English", role: "subject", label: "主语从句（杂糅）" } ] },
    "gr13.2.1-e6": { en: "It is clear that he was wrong.", zh: "很明显他错了。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "clear", role: "complem", label: "表语" }, { w: "that he was wrong", role: "subject", label: "主语从句（真正主语）" } ] },
    "gr13.2.1-e7": { en: "It is said that he will leave.", zh: "据说他要离开。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is said", role: "verb", label: "谓语" }, { w: "that he will leave", role: "subject", label: "主语从句（真正主语）" } ] },
    /* ---------- gr13.2.2 表语从句与同位语从句 ---------- */
    "gr13.2.2-e1": { en: "The problem is that we have no money.", zh: "问题是我们没钱。", reg: "通用",
      tagged: [ { w: "The problem", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "that we have no money", role: "complem", label: "表语从句" } ] },
    "gr13.2.2-e2": { en: "The news that he won surprised us.", zh: "他赢了的消息让我们吃惊。", reg: "通用",
      tagged: [ { w: "The news", role: "subject", label: "主语" }, { w: "that he won", role: "attribute", label: "同位语从句" }, { w: "surprised", role: "verb", label: "谓语" }, { w: "us", role: "object", label: "宾语" } ] },
    "gr13.2.2-e3": { en: "The fact that he was late made us angry.", zh: "他迟到的事实让我们生气。", reg: "通用",
      tagged: [ { w: "The fact", role: "subject", label: "主语" }, { w: "that he was late", role: "attribute", label: "同位语从句" }, { w: "made", role: "verb", label: "谓语" }, { w: "us", role: "object", label: "宾语" }, { w: "angry", role: "complem", label: "宾补" } ] },
    "gr13.2.2-e4": { en: "My idea is that we start early.", zh: "我的想法是我们早点出发。", reg: "通用",
      tagged: [ { w: "My idea", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "that we start early", role: "complem", label: "表语从句" } ] },
    "gr13.2.2-e5": { en: "I have no idea when he will come.", zh: "我不知道他什么时候来。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "谓语" }, { w: "no idea", role: "object", label: "宾语" }, { w: "when he will come", role: "attribute", label: "同位语从句" } ] },
    "gr13.2.2-e6": { en: "The idea that the earth is flat is wrong.", zh: "地球是平的这种看法是错的。", reg: "通用",
      tagged: [ { w: "The idea", role: "subject", label: "主语" }, { w: "that the earth is flat", role: "attribute", label: "同位语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "wrong", role: "complem", label: "表语" } ] },
    "gr13.2.2-e7": { en: "The news that he told us surprised me.", zh: "他告诉我们的那个消息让我吃惊。", reg: "通用",
      tagged: [ { w: "The news", role: "subject", label: "主语" }, { w: "that he told us", role: "attribute", label: "定语从句（that 作成分）" }, { w: "surprised", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] },
    /* ---------- gr13.2.3 间接引语 ---------- */
    "gr13.2.3-e1": { en: "He said that he was busy.", zh: "他说他很忙。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "that he was busy", role: "object", label: "宾语从句" } ] },
    "gr13.2.3-e2": { en: "She asked me if I was ready.", zh: "她问我是否准备好了。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "asked", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "if I was ready", role: "object", label: "宾语从句" } ] },
    "gr13.2.3-e3": { en: "The teacher told us to be quiet.", zh: "老师让我们安静。", reg: "通用",
      tagged: [ { w: "The teacher", role: "subject", label: "主语" }, { w: "told", role: "verb", label: "谓语" }, { w: "us", role: "object", label: "宾语" }, { w: "to be quiet", role: "object", label: "宾语（不定式）" } ] },
    "gr13.2.3-e4": { en: "He said he would come soon.", zh: "他说他很快就来。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "he would come soon", role: "object", label: "宾语从句" } ] },
    "gr13.2.3-e5": { en: "She asked where I lived.", zh: "她问我住在哪儿。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "asked", role: "verb", label: "谓语" }, { w: "where I lived", role: "object", label: "宾语从句" } ] },
    "gr13.2.3-e6": { en: "He said that he is busy.", zh: "（✗ 错句）本想说“ 他说他很忙 ”。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "that he is busy", role: "object", label: "宾语从句（时态错）" } ] },
    "gr13.2.3-e7": { en: "My mother told me to lock the door.", zh: "妈妈让我锁门。", reg: "通用",
      tagged: [ { w: "My mother", role: "subject", label: "主语" }, { w: "told", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "to lock the door", role: "object", label: "宾语（不定式）" } ] },
    /* ---------- gr13.2.4 本章小结与习题（高考） ---------- */
    "gr13.2.4-e1": { en: "I believe that he is right.", zh: "我相信他是对的。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "believe", role: "verb", label: "谓语" }, { w: "that he is right", role: "object", label: "宾语从句" } ] },
    "gr13.2.4-e2": { en: "What he said is true.", zh: "他说的是真的。", reg: "通用",
      tagged: [ { w: "What he said", role: "subject", label: "主语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "true", role: "complem", label: "表语" } ] },
    "gr13.2.4-e3": { en: "The question is when we leave.", zh: "问题是我们何时出发。", reg: "通用",
      tagged: [ { w: "The question", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "when we leave", role: "complem", label: "表语从句" } ] },
    "gr13.2.4-e4": { en: "She asked me whether I was tired.", zh: "她问我是否累了。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "asked", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "whether I was tired", role: "object", label: "宾语从句" } ] },
    "gr13.2.4-e5": { en: "It is clear that we need help.", zh: "很明显我们需要帮助。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "clear", role: "complem", label: "表语" }, { w: "that we need help", role: "subject", label: "主语从句（真正主语）" } ] },
    "gr13.2.4-e6": { en: "He told me that he had seen the film.", zh: "他告诉我他看过那部电影。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "told", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "that he had seen the film", role: "object", label: "宾语从句" } ] }
  },
  units: [
    {
      id: "gr13-u1",
      title: "宾语从句",
      lessons: [
        /* ================= gr13.1.1 宾语从句的连接词 ================= */
        {
          id: "gr13.1.1",
          title: "宾语从句的连接词",
          pages: [
            {
              id: "gr13.1.1-p1",
              kind: "observe",
              title: "先看三句话：从句的“ 开门词 ”",
              sentences: [
                { id: "gr13.1.1-e1", en: "I know that he is ill.", zh: "我知道他病了。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "know", role: "verb", label: "谓语" }, { w: "that he is ill", role: "object", label: "宾语从句" } ] },
                { id: "gr13.1.1-e2", en: "I wonder if it will rain.", zh: "我想知道是否会下雨。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wonder", role: "verb", label: "谓语" }, { w: "if it will rain", role: "object", label: "宾语从句" } ] },
                { id: "gr13.1.1-e5", en: "Do you know what he said?", zh: "你知道他说了什么吗？", reg: "通用",
                  tagged: [ { w: "Do", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "know", role: "verb", label: "谓语" }, { w: "what he said", role: "object", label: "宾语从句" } ] }
              ],
              guess: {
                q: "that / if / what 三个“ 开门词 ”，各是从哪里来的？",
                options: ["随便选的", "陈述→that；是否→if；缺什么成分补什么疑问词", "都是 that 的变体"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "宾语从句（也叫名词性从句的一种）：陈述用 that，是非用 if / whether，疑问词缺什么补什么。"
            },
            {
              id: "gr13.1.1-p2",
              kind: "interact",
              title: "把从句块拖进宾语槽",
              exploreTip: "把三个从句块（黄底）拖进宾语槽——看看“ 开门词 ”有什么不同。",
              widgets: [
                {
                  type: "clause-slots",
                  params: {
                    main: "I know __ .",
                    mainSlots: [ { id: "obj", label: "宾语槽", accept: ["object"] } ],
                    clauseBlocks: [
                      { text: "that he is ill", kind: "object" },
                      { text: "if it will rain", kind: "object" },
                      { text: "what he said", kind: "object" }
                    ],
                    hint: "三个从句块都能进宾语槽——但“ 开门词 ”各管各的：陈述 / 是否 / 疑问。"
                  }
                }
              ],
              point: "从句是“ 披着句子外衣的宾语 ”：that 管陈述，if / whether 管是否，wh- 管疑问。"
            },
            {
              id: "gr13.1.1-p3",
              kind: "explain",
              title: "连接词三问：缺什么成分？",
              lead: "还记得吗？上一页三个从句块都进了宾语槽，但“ 开门词 ”各不相同。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr13.1.1-e1", "gr13.1.1-e2", "gr13.1.1-e3"],
                  note: "身份证已经亮出来了——看这三句话，从句里缺什么成分？"
                },
                {
                  type: "idcard",
                  rule: "宾语从句连接词三问：陈述句→that；是否→if / whether；缺成分→wh-（缺主 / 宾用 what，缺地点用 where…）。",
                  condition: "that 在口语中常省（I know he is ill）；if / whether / wh- 永不省；that 不在从句中作成分，wh- 在从句中作成分（what = said 的宾语）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 我知道他病了 ”“ 我想知道是否下雨 ”——“ 是否 ”、“ 什么 ”直接嵌进去，不用“ 开门词 ”。",
                  en: "英语从句进主句要“ 办身份证 ”：陈述句的身份证是 that（口语可不带），“ 是否 ”必须带 if / whether，疑问词必须带 wh-——缺了就进不了宾语槽。",
                  unbridge: "别拿汉语的“ 直接嵌 ”套英语——疑问词一个不能少，这是英语的规矩。"
                },
                {
                  type: "contrast",
                  wrong: "I wonder it will rain.",
                  wrongZh: "（✗ 错句）",
                  right: "I wonder if it will rain.",
                  why: "“ 是否 ”的意思不能丢——if / whether 是“ 是否 ”的身份证，不可省。"
                }
              ],
              point: "这就是宾语从句的连接词：that 管陈述（可省），if / whether / wh- 管是否与疑问（不可省）。",
              pointScroll: true
            },
            {
              id: "gr13.1.1-p4",
              kind: "quiz",
              title: "练一练：开门词选对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我想知道是否会下雨。 ”英文是：",
                  options: ["I wonder it will rain.", "I wonder if it will rain.", "I wonder that it will rain."],
                  answer: 1,
                  tip: "是否 → if / whether；that 只管陈述。"
                },
                {
                  type: "fill",
                  stemBefore: "Do you know",
                  stemAfter: "he said?（what）",
                  answer: "what",
                  accept: ["what"],
                  tip: "缺宾语（said 缺宾语）→ what；疑问词不可省。"
                },
                {
                  type: "choice",
                  stem: "“ 他问我住在哪儿。 ”英文是：",
                  options: ["He asked me where did I live.", "He asked me where I lived.", "He asked me that I lived where."],
                  answer: 1,
                  tip: "缺地点 → where；从句用陈述语序（下节讲透）。"
                },
                {
                  type: "fill",
                  stemBefore: "She told me",
                  stemAfter: "she was busy.（that）",
                  answer: "that",
                  accept: ["that"],
                  tip: "陈述 → that（口语可省，书面带着更稳）。"
                }
              ],
              point: "自查三问：陈述？是否？缺什么成分？——开门词对号入座。"
            }
          ]
        },
        /* ================= gr13.1.2 宾语从句的语序与时态 ================= */
        {
          id: "gr13.1.2",
          title: "宾语从句的语序与时态",
          pages: [
            {
              id: "gr13.1.2-p1",
              kind: "observe",
              title: "先看三句话：从句里倒装吗？",
              sentences: [
                { id: "gr13.1.2-e1", en: "They asked him when he arrived.", zh: "他们问他什么时候到的。", reg: "通用",
                  tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "asked", role: "verb", label: "谓语" }, { w: "him", role: "object", label: "宾语" }, { w: "when he arrived", role: "object", label: "宾语从句" } ] },
                { id: "gr13.1.2-e2", en: "She said that she was busy.", zh: "她说她很忙。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "that she was busy", role: "object", label: "宾语从句" } ] },
                { id: "gr13.1.2-e3", en: "I think he will come tomorrow.", zh: "我想他明天会来。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "think", role: "verb", label: "谓语" }, { w: "he will come tomorrow", role: "object", label: "宾语从句" } ] }
              ],
              guess: {
                q: "从句里，when 后面跟的是疑问语序（did he）还是陈述语序（he arrived）？",
                options: ["疑问语序", "陈述语序", "两种都行"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "从句里用陈述语序（when he arrived）；主句 said（过去）→ 从句 was（过去）——主过从过。"
            },
            {
              id: "gr13.1.2-p2",
              kind: "interact",
              title: "标出从句的语序和时态",
              exploreTip: "标出两句话：从句里疑问词后面跟什么语序？从句时态跟主句对上了吗？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "They", role: "subject", label: "主语" },
                      { w: "asked", role: "verb", label: "谓语" },
                      { w: "him", role: "object", label: "宾语" },
                      { w: "when he arrived", role: "object", label: "宾语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "when 后面是 he arrived（陈述语序）——标出从句块。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "said", role: "verb", label: "谓语" },
                      { w: "that she was busy", role: "object", label: "宾语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "said 是过去式，从句 was 也是过去式——时态呼应，标出来。"
                  }
                }
              ],
              point: "从句语序复位（陈述语序）；时态呼应：主句过去，从句也退到过去。"
            },
            {
              id: "gr13.1.2-p3",
              kind: "explain",
              title: "从句语序复位 + 主过从过",
              lead: "还记得吗？上一页 when 后面跟的是 he arrived，不是 did he arrive。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr13.1.2-e1", "gr13.1.2-e2", "gr13.1.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，从句的语序和时态各有什么规律？"
                },
                {
                  type: "idcard",
                  rule: "宾语从句用陈述语序（不倒装）；主句动词是过去时，从句时态呼应后退（主过从过）。",
                  condition: "只在主句是过去时（said / asked / wondered）成立；主句是现在时（think / know），从句时态不变（I think he will come）；从句表客观真理时态不变（注明例外）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 他问我住哪儿 ”，语序不用变；“ 她说她很忙 ”，时态也不用退。",
                  en: "英语疑问词进了从句要“ 复位 ”成陈述语序；站在过去转述过去的事，从句时态也要退一格——这是“ 呼应 ”，不是重复。",
                  unbridge: "别把疑问句的倒装带进从句——从句是宾语，不是问句。"
                },
                {
                  type: "contrast",
                  wrong: "He asked me where did I live.",
                  wrongZh: "（✗ 错句）",
                  right: "He asked me where I lived.",
                  why: "从句是披着句子外衣的宾语，里面用陈述语序，不倒装。"
                },
                {
                  type: "contrast",
                  wrong: "She said she is busy.",
                  wrongZh: "（✗ 错句）",
                  right: "She said she was busy.",
                  why: "said 是过去式，从句 is 要退成 was（主过从过）。"
                }
              ],
              point: "这就是宾语从句的语序与时态：语序复位，时态呼应（主过从过）。",
              pointScroll: true
            },
            {
              id: "gr13.1.2-p4",
              kind: "quiz",
              title: "练一练：语序时态对上了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["He asked me where did I live.", "He asked me where I lived.", "He asked me where I live did."],
                  answer: 1,
                  tip: "从句用陈述语序：where I lived。"
                },
                {
                  type: "fill",
                  stemBefore: "She said that she",
                  stemAfter: "busy.（be）",
                  answer: "was",
                  accept: ["was"],
                  tip: "said 是过去式 → 从句 was（主过从过）。"
                },
                {
                  type: "choice",
                  stem: "“ Do you know when he will arrive?”中从句用 will，是因为：",
                  options: ["主句是过去时", "主句是现在时，从句时态不变", "从句必须用将来时"],
                  answer: 1,
                  tip: "主句 Do you know 是现在时 → 从句时态不变，will 保留。"
                },
                {
                  type: "fill",
                  stemBefore: "They told us that they",
                  stemAfter: "finished the work.（have）",
                  answer: "had",
                  accept: ["had"],
                  tip: "told 是过去式 → have 退成 had（主过从过）。"
                }
              ],
              point: "自查：从句倒装了吗？主句过去式，从句退了吗？"
            }
          ]
        },
        /* ================= gr13.1.3 that vs if/whether ================= */
        {
          id: "gr13.1.3",
          title: "that vs if/whether",
          pages: [
            {
              id: "gr13.1.3-p1",
              kind: "observe",
              title: "先看三句话：if 和 whether 谁更“ 能干 ”？",
              sentences: [
                { id: "gr13.1.3-e1", en: "I don't know whether to go.", zh: "我不知道是否该去。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't", role: "verb", label: "助动词" }, { w: "know", role: "verb", label: "谓语" }, { w: "whether to go", role: "object", label: "宾语从句" } ] },
                { id: "gr13.1.3-e2", en: "Whether it rains or not, we will go.", zh: "不管下不下雨，我们都去。", reg: "通用",
                  tagged: [ { w: "Whether it rains or not", role: "subject", label: "主语从句" }, { w: "we", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "助动词" }, { w: "go", role: "verb", label: "动词原形" } ] },
                { id: "gr13.1.3-e3", en: "I wonder if he is at home.", zh: "我想知道他在不在家。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "wonder", role: "verb", label: "谓语" }, { w: "if he is at home", role: "object", label: "宾语从句" } ] }
              ],
              guess: {
                q: "whether 后面能直接跟 to go，还能带 or not 当主语——if 行吗？",
                options: ["if 也行", "if 不行，这是 whether 的三张身份证", "that 也行"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "whether 有三张身份证（to do / or not / 作主语），if 一张也没有。"
            },
            {
              id: "gr13.1.3-p2",
              kind: "interact",
              title: "拼出 whether 的身份证",
              exploreTip: "拼两个句子：whether to do（宾语），Whether…or not（主语）——换成 if 试试？",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVO",
                    blocks: [
                      { w: "I", role: "subject" },
                      { w: "don't know", role: "verb" },
                      { w: "whether to go", role: "object" }
                    ],
                    hint: "whether 后面直接跟 to do——把 whether 换成 if，还成立吗？",
                    doneNote: "whether + to do：if 没有这张身份证。"
                  }
                },
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SV",
                    blocks: [
                      { w: "Whether it rains or not", role: "subject" },
                      { w: "doesn't matter", role: "verb" }
                    ],
                    hint: "whether 从句当主语——把 Whether 换成 If，还成立吗？",
                    doneNote: "whether 作主语：if 不行。"
                  }
                }
              ],
              point: "whether 三张身份证：to do / or not / 作主语——if 都不行。"
            },
            {
              id: "gr13.1.3-p3",
              kind: "explain",
              title: "whether 的三张身份证",
              lead: "还记得吗？上一页 whether to go 和 Whether…or not，换成 if 就不成立了。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr13.1.3-e1", "gr13.1.3-e2", "gr13.1.3-e7"],
                  note: "身份证已经亮出来了——看这三句话，whether 干了 if 干不了的活。"
                },
                {
                  type: "idcard",
                  rule: "whether 三张身份证：① 可接 to do；② 可与 or not 连用；③ 可作主语 / 表语——if 三条都不行。",
                  condition: "口语中表“ 是否 ”两者常可互换（I wonder if / whether…）；但三张身份证场景必须用 whether；discuss 后只接 whether（不接 about，也不接 if）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“ 是否 ”一个词，if / whether 不分。",
                  en: "英语分工：whether 是“ 正式身份证 ”，to do、or not、主语位都要查它；if 是“ 临时通行证 ”，只在普通宾语从句里和 whether 通用。",
                  unbridge: "别在三张身份证场景用 if——这是 whether 的专属领地。"
                },
                {
                  type: "contrast",
                  wrong: "I don't know if to go.",
                  wrongZh: "（✗ 错句）",
                  right: "I don't know whether to go.",
                  why: "to do 前面只能站 whether——if 没有这张身份证。"
                },
                {
                  type: "contrast",
                  wrong: "They discussed if they should leave.",
                  wrongZh: "（✗ 错句）",
                  right: "They discussed whether they should leave.",
                  why: "discuss 后面只跟 whether（也不加 about）——discuss about 是中式搭配。"
                }
              ],
              point: "这就是 whether 的三张身份证：to do / or not / 作主语——if 都不行。",
              pointScroll: true
            },
            {
              id: "gr13.1.3-p4",
              kind: "quiz",
              title: "练一练：whether 还是 if？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我不知道是否该去。 ”英文是：",
                  options: ["I don't know if to go.", "I don't know whether to go.", "I don't know that to go."],
                  answer: 1,
                  tip: "to do 前只能站 whether。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "he comes or not doesn't matter.",
                  answer: "Whether",
                  accept: ["Whether"],
                  tip: "作主语 + or not → 只能用 Whether。"
                },
                {
                  type: "choice",
                  stem: "“ 我们讨论了是否该等。 ”英文是：",
                  options: ["We discussed about whether we should wait.", "We discussed whether we should wait.", "We discussed if we should wait."],
                  answer: 1,
                  tip: "discuss 后直接跟 whether，不加 about，不用 if。"
                },
                {
                  type: "fill",
                  stemBefore: "I wonder",
                  stemAfter: "he is at home.",
                  answer: "if",
                  accept: ["if", "whether"],
                  tip: "普通宾语从句表“ 是否 ”，if / whether 都行。"
                }
              ],
              point: "自查：to do / or not / 主语位——看见就想到 whether。"
            }
          ]
        },
        /* ================= gr13.1.4 宾语从句特殊动词 ================= */
        {
          id: "gr13.1.4",
          title: "宾语从句特殊动词",
          pages: [
            {
              id: "gr13.1.4-p1",
              kind: "observe",
              title: "先看三句话：doubt 两种脸",
              sentences: [
                { id: "gr13.1.4-e1", en: "I doubt whether he will come.", zh: "我怀疑他是否会来。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "doubt", role: "verb", label: "谓语" }, { w: "whether he will come", role: "object", label: "宾语从句" } ] },
                { id: "gr13.1.4-e2", en: "I don't doubt that he will come.", zh: "我不怀疑他会来。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't", role: "verb", label: "助动词" }, { w: "doubt", role: "verb", label: "谓语" }, { w: "that he will come", role: "object", label: "宾语从句" } ] },
                { id: "gr13.1.4-e4", en: "He suggested that we leave early.", zh: "他建议我们早点离开。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "suggested", role: "verb", label: "谓语" }, { w: "that we leave early", role: "object", label: "宾语从句" } ] }
              ],
              guess: {
                q: "doubt 在肯定句和否定句后，跟的“ 开门词 ”一样吗？suggest 后面能跟 if 吗？",
                options: ["一样；suggest 能跟 if", "肯定 doubt→whether，否定 doubt→that；suggest 只跟 that", "随便跟"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "doubt 肯定→whether，否定→that；wonder 只跟 if / whether；suggest 只跟 that。"
            },
            {
              id: "gr13.1.4-p2",
              kind: "interact",
              title: "标出特殊动词的门禁",
              exploreTip: "标出两句话：doubt 和 suggest 后面各跟了什么“ 开门词 ”？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "doubt", role: "verb", label: "谓语" },
                      { w: "whether he will come", role: "object", label: "宾语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "肯定句的 doubt 后面跟了 whether——标出从句块。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "suggested", role: "verb", label: "谓语" },
                      { w: "that we leave early", role: "object", label: "宾语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "suggest 后面跟了 that——能换成 if 吗？标出从句块想想。"
                  }
                }
              ],
              point: "三个动词，三种门禁：doubt 看肯定否定，wonder 只认 if / whether，suggest 只认 that。"
            },
            {
              id: "gr13.1.4-p3",
              kind: "explain",
              title: "三个动词，三种门禁",
              lead: "还记得吗？上一页 doubt 后面跟 whether，suggest 后面跟 that——各有各的门禁。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr13.1.4-e1", "gr13.1.4-e2", "gr13.1.4-e4"],
                  note: "身份证已经亮出来了——看这三句话，动词和“ 开门词 ”的搭配。"
                },
                {
                  type: "idcard",
                  rule: "doubt 肯定句→whether，否定句→that；wonder 只接 if / whether；suggest（建议）只接 that，不接 if。",
                  condition: "doubt 表“ 怀疑 ”为肯定句（含否定意义）；suggest 作“ 建议 ”讲时从句用 (should) + 原形（gr16 虚拟回填）；wonder 永不接 that。"
                },
                {
                  type: "bridge",
                  zh: "汉语“ 怀疑 ”“ 想知道 ”“ 建议 ”后面都直接跟内容，不挑“ 开门词 ”。",
                  en: "英语三个动词各有门禁：doubt 看脸色（肯定 / 否定），wonder 只认“ 是否 ”，suggest 只认 that——进错门就报警。",
                  unbridge: "别拿汉语的“ 直接跟 ”套英语——动词和连接词的搭配是英语的规矩。"
                },
                {
                  type: "contrast",
                  wrong: "I doubt that he won't come.",
                  wrongZh: "（✗ 错句）",
                  right: "I doubt whether he will come.",
                  why: "doubt 已经是否定了，再加 won't 是双重否定——肯定 doubt 后面跟 whether。"
                },
                {
                  type: "contrast",
                  wrong: "I suggest if we leave early.",
                  wrongZh: "（✗ 错句）",
                  right: "I suggest that we leave early.",
                  why: "suggest 只认 that，不认 if——“ 建议 ”不是“ 是否 ”。"
                }
              ],
              point: "这就是特殊动词门禁：doubt 看肯定否定，wonder 只认是否，suggest 只认 that。",
              pointScroll: true
            },
            {
              id: "gr13.1.4-p4",
              kind: "quiz",
              title: "练一练：门禁对上了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我怀疑他是否会来。 ”英文是：",
                  options: ["I doubt that he will come.", "I doubt whether he will come.", "I doubt if that he will come."],
                  answer: 1,
                  tip: "肯定 doubt → whether。"
                },
                {
                  type: "fill",
                  stemBefore: "I don't doubt",
                  stemAfter: "he will come.",
                  answer: "that",
                  accept: ["that"],
                  tip: "否定 doubt → that。"
                },
                {
                  type: "choice",
                  stem: "“ 他建议我们早点离开。 ”英文是：",
                  options: ["He suggested if we leave early.", "He suggested that we leave early.", "He suggested whether we leave early."],
                  answer: 1,
                  tip: "suggest 只接 that。"
                },
                {
                  type: "fill",
                  stemBefore: "I wonder",
                  stemAfter: "it will rain tomorrow.",
                  answer: "if",
                  accept: ["if", "whether"],
                  tip: "wonder 只接 if / whether。"
                }
              ],
              point: "自查：doubt 看肯定否定；wonder 是否；suggest 只认 that。"
            }
          ]
        }
      ]
    },
    {
      id: "gr13-u2",
      title: "主语 / 表语 / 同位语从句与间接引语",
      lessons: [
        /* ================= gr13.2.1 主语从句与形式主语 it ================= */
        {
          id: "gr13.2.1",
          title: "主语从句与形式主语 it",
          pages: [
            {
              id: "gr13.2.1-p1",
              kind: "observe",
              title: "先看三句话：It 指的是什么？",
              sentences: [
                { id: "gr13.2.1-e1", en: "It is important that we learn English well.", zh: "学好英语很重要。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "important", role: "complem", label: "表语" }, { w: "that we learn English well", role: "subject", label: "主语从句（真正主语）" } ] },
                { id: "gr13.2.1-e2", en: "It is true that he helped us.", zh: "他帮过我们，这是真的。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "true", role: "complem", label: "表语" }, { w: "that he helped us", role: "subject", label: "主语从句（真正主语）" } ] },
                { id: "gr13.2.1-e4", en: "It doesn't matter whether you come or not.", zh: "你来不来没关系。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "doesn't", role: "verb", label: "助动词" }, { w: "matter", role: "verb", label: "谓语" }, { w: "whether you come or not", role: "subject", label: "主语从句（真正主语）" } ] }
              ],
              guess: {
                q: "三句话开头的 It，指的是前面提到的东西吗？真正的主语是谁？",
                options: ["It 指前文的东西", "It 是“ 替身 ”，真正的主语是句尾的 that / whether 从句", "It 没有意义"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "It 是形式主语（替身），真正的主语是句尾的从句——头轻脚重改头重脚轻。"
            },
            {
              id: "gr13.2.1-p2",
              kind: "interact",
              title: "把从句块拖进主语槽",
              exploreTip: "把从句块拖进主语槽——主语太长站不下时，it 会来顶班。",
              widgets: [
                {
                  type: "clause-slots",
                  params: {
                    main: "__ is important.",
                    mainSlots: [ { id: "subj", label: "主语槽", accept: ["subject"] } ],
                    clauseBlocks: [
                      { text: "That we learn English well", kind: "subject" },
                      { text: "Whether you come or not", kind: "subject" }
                    ],
                    hint: "从句块进了主语槽——句子头重脚轻时，it 来顶班，变成 It is important that…。"
                  }
                }
              ],
              point: "主语从句太长 → it 顶班（形式主语），真主语 that 从句放句尾。"
            },
            {
              id: "gr13.2.1-p3",
              kind: "explain",
              title: "it 顶班：形式主语",
              lead: "还记得吗？上一页从句块进了主语槽，句子头重脚轻——it 来顶班了。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr13.2.1-e1", "gr13.2.1-e2", "gr13.2.1-e4"],
                  note: "身份证已经亮出来了——看这三句话，it 和句尾从句的分工。"
                },
                {
                  type: "idcard",
                  rule: "主语从句太长 → it 作形式主语顶班，真主语（that / whether 从句）放句尾：It is + adj. + that…。",
                  condition: "that 引导主语从句不可省（It is true that…）；whether 可引导主语从句，if 不行；真主语放句首（That we…is important）少用，注明语域偏书面。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 学好英语很重要 ”，主语再长也放前面，不嫌头重脚轻。",
                  en: "英语嫌头重脚轻：主语太长，it 先顶班，真主语搬到句尾——头轻脚重，读着顺。",
                  unbridge: "别把 that 既当主语又当连接词（✗ That is important that…）——it 顶班，that 只管开门。"
                },
                {
                  type: "contrast",
                  wrong: "That is important that we learn English.",
                  wrongZh: "（✗ 错句）",
                  right: "It is important that we learn English.",
                  why: "that 不能既当主语又当连接词——it 顶班，that 只管给从句开门。"
                }
              ],
              point: "这就是形式主语 it：主语从句太长，it 顶班，真主语放句尾。",
              pointScroll: true
            },
            {
              id: "gr13.2.1-p4",
              kind: "quiz",
              title: "练一练：it 顶班了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["That is important that we learn English.", "It is important that we learn English.", "Is important that we learn English."],
                  answer: 1,
                  tip: "it 作形式主语顶班，真主语 that 从句放句尾。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "is true that he helped us.",
                  answer: "It",
                  accept: ["It"],
                  tip: "It is true that…：it 顶班，that 不可省。"
                },
                {
                  type: "choice",
                  stem: "“ 你来不来没关系。 ”英文是：",
                  options: ["It doesn't matter if you come or not.", "It doesn't matter whether you come or not.", "Doesn't matter you come or not."],
                  answer: 1,
                  tip: "whether 可引导主语从句，if 不行。"
                },
                {
                  type: "fill",
                  stemBefore: "It is clear",
                  stemAfter: "he was wrong.",
                  answer: "that",
                  accept: ["that"],
                  tip: "that 引导主语从句不可省。"
                }
              ],
              point: "自查：主语从句长吗？it 顶班了吗？that 省了吗（不许省）？"
            }
          ]
        },
        /* ================= gr13.2.2 表语从句与同位语从句 ================= */
        {
          id: "gr13.2.2",
          title: "表语从句与同位语从句",
          pages: [
            {
              id: "gr13.2.2-p1",
              kind: "observe",
              title: "先看三句话：that 在“ 打工 ”吗？",
              sentences: [
                { id: "gr13.2.2-e2", en: "The news that he won surprised us.", zh: "他赢了的消息让我们吃惊。", reg: "通用",
                  tagged: [ { w: "The news", role: "subject", label: "主语" }, { w: "that he won", role: "attribute", label: "同位语从句" }, { w: "surprised", role: "verb", label: "谓语" }, { w: "us", role: "object", label: "宾语" } ] },
                { id: "gr13.2.2-e7", en: "The news that he told us surprised me.", zh: "他告诉我们的那个消息让我吃惊。", reg: "通用",
                  tagged: [ { w: "The news", role: "subject", label: "主语" }, { w: "that he told us", role: "attribute", label: "定语从句（that 作成分）" }, { w: "surprised", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" } ] },
                { id: "gr13.2.2-e1", en: "The problem is that we have no money.", zh: "问题是我们没钱。", reg: "通用",
                  tagged: [ { w: "The problem", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "that we have no money", role: "complem", label: "表语从句" } ] }
              ],
              guess: {
                q: "前两句的 that 一样吗？哪个 that 在从句里“ 打工 ”（作成分）？",
                options: ["一样，都打工", "第一句的 that 不打工（同位语），第二句的 that 打工（定语，作 told 的宾语）", "都不打工"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "同位语的 that 不作成分（只是“ 说明书 ”的开门词）；定语的 that 在从句里打工。"
            },
            {
              id: "gr13.2.2-p2",
              kind: "interact",
              title: "标出 that 打工了吗？",
              exploreTip: "标出两句话的 that 从句：that 后面句子完整（不缺成分）→ 同位语；缺成分 → 定语。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The news", role: "subject", label: "主语" },
                      { w: "that he won", role: "attribute", label: "同位语从句" },
                      { w: "surprised", role: "verb", label: "谓语" },
                      { w: "us", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "同位语 / 定语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "that he won 句子完整（不缺成分）→ that 不打工，是同位语。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The news", role: "subject", label: "主语" },
                      { w: "that he told us", role: "attribute", label: "定语从句（that 作成分）" },
                      { w: "surprised", role: "verb", label: "谓语" },
                      { w: "me", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "同位语 / 定语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "that he told us 缺宾语（told 缺宾语）→ that 打工，是定语。"
                  }
                }
              ],
              point: "判定法：that 后面句子完整 → 同位语（说明书）；缺成分 → 定语（that 打工）。"
            },
            {
              id: "gr13.2.2-p3",
              kind: "explain",
              title: "同位语：名词的“ 说明书 ”",
              lead: "还记得吗？上一页 that he won 不缺成分（同位语），that he told us 缺宾语（定语）。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr13.2.2-e2", "gr13.2.2-e3", "gr13.2.2-e7"],
                  note: "身份证已经亮出来了——看这三句话，that 到底打不打工？"
                },
                {
                  type: "idcard",
                  rule: "同位语从句：fact / news / idea / belief + that…，说明名词的内容；that 不作成分。表语从句：be + that…，说明主语的内容。",
                  condition: "判定法：that 后句子完整（不缺成分）→ 同位语；缺成分 → 定语从句；同位语的 that 不可省（和定语从句的省略规则别混）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 他赢了的消息 ”“ 他告诉我们的消息 ”——都用“ 的 ”，不分说明书还是定语。",
                  en: "英语分：the news that he won（说明书：消息的内容就是“ 他赢了 ”，that 不打工）；the news that he told us（定语：哪个消息？他告诉我们的，that 打工）。",
                  unbridge: "别拿汉语的“ 的 ”一套到底——英语看 that 打不打工，分同位语还是定语。"
                },
                {
                  type: "contrast",
                  wrong: "The news he won surprised us.",
                  wrongZh: "（✗ 错句）",
                  right: "The news that he won surprised us.",
                  why: "同位语的 that 是说明书的开门词，不作成分但不可省——省略 that 是定语从句的规则，别混。"
                }
              ],
              point: "这就是同位语从句：fact / news / idea 后 + that（不打工）；打工的就是定语从句。",
              pointScroll: true
            },
            {
              id: "gr13.2.2-p4",
              kind: "quiz",
              title: "练一练：同位语还是定语？",
              questions: [
                {
                  type: "choice",
                  stem: "“ The fact ___ he was late made us angry.”横线填：",
                  options: ["that", "which", "what"],
                  answer: 0,
                  tip: "fact 后 + that（同位语，that 不打工）。"
                },
                {
                  type: "choice",
                  stem: "“ The news that he told us surprised me.”中 that 是：",
                  options: ["同位语，不作成分", "定语，作 told 的宾语", "表语"],
                  answer: 1,
                  tip: "that he told us 缺宾语 → that 打工 → 定语从句。"
                },
                {
                  type: "fill",
                  stemBefore: "The problem is",
                  stemAfter: "we have no money.",
                  answer: "that",
                  accept: ["that"],
                  tip: "be 后 + that… → 表语从句。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["The news he won surprised us.", "The news that he won surprised us.", "The news what he won surprised us."],
                  answer: 1,
                  tip: "同位语的 that 不可省。"
                }
              ],
              point: "自查：that 打工了吗？打工→定语；不打工→同位语（不可省）。"
            }
          ]
        },
        /* ================= gr13.2.3 间接引语 ================= */
        {
          id: "gr13.2.3",
          title: "间接引语",
          pages: [
            {
              id: "gr13.2.3-p1",
              kind: "observe",
              title: "先看三句话：转述三种句",
              sentences: [
                { id: "gr13.2.3-e1", en: "He said that he was busy.", zh: "他说他很忙。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "said", role: "verb", label: "谓语" }, { w: "that he was busy", role: "object", label: "宾语从句" } ] },
                { id: "gr13.2.3-e2", en: "She asked me if I was ready.", zh: "她问我是否准备好了。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "asked", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "if I was ready", role: "object", label: "宾语从句" } ] },
                { id: "gr13.2.3-e3", en: "The teacher told us to be quiet.", zh: "老师让我们安静。", reg: "通用",
                  tagged: [ { w: "The teacher", role: "subject", label: "主语" }, { w: "told", role: "verb", label: "谓语" }, { w: "us", role: "object", label: "宾语" }, { w: "to be quiet", role: "object", label: "宾语（不定式）" } ] }
              ],
              guess: {
                q: "三句话分别在转述哪种句子？（陈述 / 疑问 / 祈使）",
                options: ["陈述 / 疑问 / 祈使", "都是陈述", "疑问 / 陈述 / 祈使"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "转述三步：陈述 that + 时态后退；疑问 if / whether + 陈述语序；祈使 tell sb to do。"
            },
            {
              id: "gr13.2.3-p2",
              kind: "interact",
              title: "拼出间接引语",
              exploreTip: "拼出转述句：said 是过去式，从句时态跟上（主过从过）。",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVO",
                    blocks: [
                      { w: "He", role: "subject" },
                      { w: "said", role: "verb" },
                      { w: "that he was busy", role: "object" }
                    ],
                    hint: "said（过去）→ 从句 was（过去）：时态呼应。",
                    doneNote: "主过从过：said（过去）→ was（过去）。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "asked", role: "verb", label: "谓语" },
                      { w: "me", role: "object", label: "宾语" },
                      { w: "if I was ready", role: "object", label: "宾语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "转述疑问句：if + 陈述语序（I was ready），不倒装。"
                  }
                }
              ],
              point: "转述疑问句：if / whether + 陈述语序；转述祈使句：tell sb to do。"
            },
            {
              id: "gr13.2.3-p3",
              kind: "explain",
              title: "间接引语三步",
              lead: "还记得吗？上一页 said（过去）→ was（过去），疑问句转述用了陈述语序。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr13.2.3-e1", "gr13.2.3-e2", "gr13.2.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，转述时各动了哪里？"
                },
                {
                  type: "idcard",
                  rule: "间接引语三步：陈述句 that + 时态后退；疑问句 if / whether + 陈述语序；祈使句 tell sb to do。",
                  condition: "只在主句是过去时（said / asked / told）成立：从句时态后退（主过从过）；主句是现在时（says），从句时态不变；人称和时间状语跟着变（I→he，tomorrow→the next day）。"
                },
                {
                  type: "bridge",
                  zh: "汉语转述加个“ 说 ”就行：“ 他说他很忙 ”，时态语序都不用动。",
                  en: "英语转述是“ 穿越 ”：站在过去转述过去的话，从句时态退一格（is→was），疑问语序复位（Are you→if I was），祈使变不定式（Be quiet→to be quiet）。",
                  unbridge: "别把直接引语的标点和语序照搬过来——转述不是复制，是“ 翻译 ”到过去。"
                },
                {
                  type: "contrast",
                  wrong: "He said that he is busy.",
                  wrongZh: "（✗ 错句）",
                  right: "He said that he was busy.",
                  why: "said 是过去式，从句 is 要退成 was（主过从过）。"
                }
              ],
              point: "这就是间接引语：陈述退时态，疑问复语序，祈使变 to do。",
              pointScroll: true
            },
            {
              id: "gr13.2.3-p4",
              kind: "quiz",
              title: "练一练：转述对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 'I am busy,' he said.”转述为：",
                  options: ["He said that he is busy.", "He said that he was busy.", "He said that I was busy."],
                  answer: 1,
                  tip: "said 过去式 → was；人称 I→he。"
                },
                {
                  type: "fill",
                  stemBefore: "She asked me",
                  stemAfter: "I was ready.",
                  answer: "if",
                  accept: ["if", "whether"],
                  tip: "转述疑问句：if / whether + 陈述语序。"
                },
                {
                  type: "choice",
                  stem: "“ 'Be quiet,' the teacher said.”转述为：",
                  options: ["The teacher said that we are quiet.", "The teacher told us to be quiet.", "The teacher asked if we are quiet."],
                  answer: 1,
                  tip: "转述祈使句：tell sb to do。"
                },
                {
                  type: "fill",
                  stemBefore: "He said he",
                  stemAfter: "come soon.（will）",
                  answer: "would",
                  accept: ["would"],
                  tip: "said 过去式 → will 退成 would。"
                }
              ],
              point: "自查三步：人称变了吗？时态退了吗？疑问复位了吗？"
            }
          ]
        },
        /* ================= gr13.2.4 本章小结与习题（高考） ================= */
        {
          id: "gr13.2.4",
          title: "本章小结与习题（高考）",
          pages: [
            {
              id: "gr13.2.4-p1",
              kind: "explain",
              title: "名词性从句总表",
              lead: "本章四员大将集结：宾语从句、主语从句、表语从句、同位语从句——都是“ 句子当成分用 ”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr13.1.1-e1", "gr13.2.1-e1", "gr13.2.2-e2"],
                  note: "三句话，三个成分——看看从句各站在哪个槽里。"
                },
                {
                  type: "idcard",
                  rule: "名词性从句总表：宾语从句（that / if / whether / wh-）— 主语从句（it 顶班）— 表语从句（be + that）— 同位语从句（fact / news + that，不作成分）。",
                  condition: "做题三问：① 从句在主句中当什么成分？② 连接词缺什么？③ that 可省吗（宾语 that 可省，主语 / 同位语 that 不可省）？"
                },
                {
                  type: "bridge",
                  zh: "汉语没有从句连接词的概念，内容直接嵌进去。",
                  en: "英语从句进主句要“ 办身份证 ”（连接词）+“ 找槽位 ”（成分）：先看槽（主 / 宾 / 表），再选证（that / if / wh-）。",
                  unbridge: "别先背连接词再套句子——先看成分槽，再选连接词。"
                },
                {
                  type: "contrast",
                  wrong: "He asked me where did I live.",
                  wrongZh: "（✗ 错句）",
                  right: "He asked me where I lived.",
                  why: "本章最大坑：从句倒装（高考改错高频设错）——从句用陈述语序。"
                }
              ],
              point: "名词性从句 = 句子当成分用；先找槽，再选证；语序复位，时态呼应。",
              pointScroll: true
            },
            {
              id: "gr13.2.4-p2",
              kind: "quiz",
              title: "高考综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我相信他是对的。 ”英文是：",
                  options: ["I believe that he is right.", "I believe what he is right.", "I believe if he is right."],
                  answer: 0,
                  tip: "陈述 → that。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "he said is true.",
                  answer: "What",
                  accept: ["What"],
                  tip: "缺主语 → What 引导主语从句。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“ He asked me where did I live.”应改为：",
                  options: ["He asked me where did I live.", "He asked me where I lived.", "He asked me that where I lived."],
                  answer: 1,
                  tip: "从句用陈述语序，不倒装。"
                },
                {
                  type: "fill",
                  stemBefore: "It is clear",
                  stemAfter: "we need help.",
                  answer: "that",
                  accept: ["that"],
                  tip: "It is clear that…：that 引导主语从句不可省。"
                }
              ],
              point: "本章通关：连接词三问 + 语序复位 + 主过从过 + it 顶班。"
            }
          ]
        }
      ]
    }
  ]
};
