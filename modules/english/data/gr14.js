/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr14：定语从句
 *
 * 数据口径（M5）：window.ENG_CH["gr14"] = { id, title, sentences, units }，
 * 与数学 window.MATH_CH 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 单元 gr14.1 关系代词与关系副词（gr14.1.1–gr14.1.4）· 单元 gr14.2
 * 难点与简化（gr14.2.1–gr14.2.4）。每课：观察页（例句先行 +
 * Y1 先猜后验）→ 交互页（tagging / sentence-builder / clause-slots）
 * → 讲解页（examples → idcard → bridge → spell → contrast）→
 * 练习页（Y3 判分：choice / fill）。
 * 例句全部来自 D3 三审台账（modules/english/data/_review/
 * ledger-gr14.json），id 一一对应，未终审例句不得入库。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=红队终审通过（见台账 first/final 记录）。
 * 撰写：语法生产C队（2026-10-14），状态 drafted，待三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr14"] = {
  id: "gr14",
  title: "定语从句",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr14.json 逐字一致。定语从句整体先标为
   * “ 定语从句 ”成分块，内部结构在交互页 / 讲解页中拆解。 */
  sentences: {
    /* ---------- gr14.1.1 关系代词 ---------- */
    "gr14.1.1-e1": { en: "The girl who is singing is my sister.", zh: "正在唱歌的女孩是我姐姐。", reg: "通用",
      tagged: [ { w: "The girl", role: "subject", label: "主语" }, { w: "who is singing", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "my sister", role: "complem", label: "表语" } ] },
    "gr14.1.1-e2": { en: "The book that I bought is interesting.", zh: "我买的那本书很有趣。", reg: "通用",
      tagged: [ { w: "The book", role: "subject", label: "主语" }, { w: "that I bought", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "interesting", role: "complem", label: "表语" } ] },
    "gr14.1.1-e3": { en: "The man whose car is red is my uncle.", zh: "那辆红色汽车的主人是我叔叔。", reg: "通用",
      tagged: [ { w: "The man", role: "subject", label: "主语" }, { w: "whose car is red", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "my uncle", role: "complem", label: "表语" } ] },
    "gr14.1.1-e4": { en: "This is the house which Jack built.", zh: "这是杰克建造的房子。", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the house", role: "complem", label: "表语" }, { w: "which Jack built", role: "attribute", label: "定语从句" } ] },
    "gr14.1.1-e5": { en: "The teacher whom we love is ill.", zh: "我们爱戴的老师病了。", reg: "书面",
      tagged: [ { w: "The teacher", role: "subject", label: "主语" }, { w: "whom we love", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "ill", role: "complem", label: "表语" } ] },
    "gr14.1.1-e6": { en: "The book that I bought it is interesting.", zh: "（✗ 错句）本想说“ 我买的那本书很有趣 ”。", reg: "通用",
      tagged: [ { w: "The book", role: "subject", label: "主语" }, { w: "that I bought it", role: "attribute", label: "定语从句（残留 it）" }, { w: "is", role: "verb", label: "谓语" }, { w: "interesting", role: "complem", label: "表语" } ] },
    "gr14.1.1-e7": { en: "The dog that is running is ours.", zh: "正在跑的那只狗是我们的。", reg: "通用",
      tagged: [ { w: "The dog", role: "subject", label: "主语" }, { w: "that is running", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "ours", role: "complem", label: "表语" } ] },
    /* ---------- gr14.1.2 关系副词 ---------- */
    "gr14.1.2-e1": { en: "I remember the day when we met.", zh: "我记得我们相遇的那一天。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "remember", role: "verb", label: "谓语" }, { w: "the day", role: "object", label: "宾语" }, { w: "when we met", role: "attribute", label: "定语从句" } ] },
    "gr14.1.2-e2": { en: "This is the house where I was born.", zh: "这是我出生的房子。", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the house", role: "complem", label: "表语" }, { w: "where I was born", role: "attribute", label: "定语从句" } ] },
    "gr14.1.2-e3": { en: "Tell me the reason why you are late.", zh: "告诉我你迟到的原因。", reg: "通用",
      tagged: [ { w: "Tell", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "the reason", role: "object", label: "宾语" }, { w: "why you are late", role: "attribute", label: "定语从句" } ] },
    "gr14.1.2-e4": { en: "The night when he left was rainy.", zh: "他离开的那个夜晚下着雨。", reg: "通用",
      tagged: [ { w: "The night", role: "subject", label: "主语" }, { w: "when he left", role: "attribute", label: "定语从句" }, { w: "was", role: "verb", label: "谓语" }, { w: "rainy", role: "complem", label: "表语" } ] },
    "gr14.1.2-e5": { en: "Do you know the place where we parked the car?", zh: "你知道我们停车的地方吗？", reg: "通用",
      tagged: [ { w: "Do", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "know", role: "verb", label: "谓语" }, { w: "the place", role: "object", label: "宾语" }, { w: "where we parked the car", role: "attribute", label: "定语从句" } ] },
    "gr14.1.2-e6": { en: "I remember the day where we met.", zh: "（✗ 错句）本想说“ 我记得我们相遇的那一天 ”。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "remember", role: "verb", label: "谓语" }, { w: "the day", role: "object", label: "宾语" }, { w: "where we met", role: "attribute", label: "定语从句（关系词错）" } ] },
    "gr14.1.2-e7": { en: "Sunday is the day when we rest.", zh: "星期天是我们休息的日子。", reg: "通用",
      tagged: [ { w: "Sunday", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the day", role: "complem", label: "表语" }, { w: "when we rest", role: "attribute", label: "定语从句" } ] },
    /* ---------- gr14.1.3 限制性 vs 非限制性 ---------- */
    "gr14.1.3-e1": { en: "My brother who lives in Beijing is a doctor.", zh: "我那个住在北京的哥哥是医生。", reg: "通用",
      tagged: [ { w: "My brother", role: "subject", label: "主语" }, { w: "who lives in Beijing", role: "attribute", label: "定语从句（限制性）" }, { w: "is", role: "verb", label: "谓语" }, { w: "a doctor", role: "complem", label: "表语" } ] },
    "gr14.1.3-e2": { en: "My brother, who lives in Beijing, is a doctor.", zh: "我哥哥住在北京，他是医生。", reg: "通用",
      tagged: [ { w: "My brother", role: "subject", label: "主语" }, { w: "who lives in Beijing", role: "attribute", label: "定语从句（非限制性）" }, { w: "is", role: "verb", label: "谓语" }, { w: "a doctor", role: "complem", label: "表语" } ] },
    "gr14.1.3-e3": { en: "He failed the test, which surprised us.", zh: "他考试没及格，这让我们吃惊。", reg: "通用",
      tagged: [ { w: "He failed the test", role: "subject", label: "主句" }, { w: "which surprised us", role: "attribute", label: "定语从句（which 指全句）" } ] },
    "gr14.1.3-e4": { en: "Beijing, which is the capital of China, is beautiful.", zh: "北京是中国的首都，很美。", reg: "通用",
      tagged: [ { w: "Beijing", role: "subject", label: "主语" }, { w: "which is the capital of China", role: "attribute", label: "定语从句（非限制性）" }, { w: "is", role: "verb", label: "谓语" }, { w: "beautiful", role: "complem", label: "表语" } ] },
    "gr14.1.3-e5": { en: "My mother, that is cooking, is kind.", zh: "（✗ 错句）本想说“ 正在做饭的妈妈很和善 ”。", reg: "通用",
      tagged: [ { w: "My mother", role: "subject", label: "主语" }, { w: "that is cooking", role: "attribute", label: "定语从句（非限制误用 that）" }, { w: "is", role: "verb", label: "谓语" }, { w: "kind", role: "complem", label: "表语" } ] },
    "gr14.1.3-e6": { en: "The students who work hard will succeed.", zh: "努力的学生会成功。", reg: "通用",
      tagged: [ { w: "The students", role: "subject", label: "主语" }, { w: "who work hard", role: "attribute", label: "定语从句（限制性）" }, { w: "will", role: "verb", label: "助动词" }, { w: "succeed", role: "verb", label: "动词原形" } ] },
    "gr14.1.3-e7": { en: "Tom, whose father is a teacher, likes math.", zh: "汤姆的爸爸是老师，他喜欢数学。", reg: "通用",
      tagged: [ { w: "Tom", role: "subject", label: "主语" }, { w: "whose father is a teacher", role: "attribute", label: "定语从句（非限制性）" }, { w: "likes", role: "verb", label: "谓语" }, { w: "math", role: "object", label: "宾语" } ] },
    /* ---------- gr14.1.4 关系代词省略规则 ---------- */
    "gr14.1.4-e1": { en: "The book I bought is good.", zh: "我买的那本书很好。", reg: "通用",
      tagged: [ { w: "The book", role: "subject", label: "主语" }, { w: "(that) I bought", role: "attribute", label: "定语从句（that 省略）" }, { w: "is", role: "verb", label: "谓语" }, { w: "good", role: "complem", label: "表语" } ] },
    "gr14.1.4-e2": { en: "The car that stopped at the door is mine.", zh: "停在门口的那辆车是我的。", reg: "通用",
      tagged: [ { w: "The car", role: "subject", label: "主语" }, { w: "that stopped at the door", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "mine", role: "complem", label: "表语" } ] },
    "gr14.1.4-e3": { en: "The person to whom I spoke is my teacher.", zh: "跟我说话的那个人是我的老师。（介词后不可省）", reg: "书面",
      tagged: [ { w: "The person", role: "subject", label: "主语" }, { w: "to whom I spoke", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "my teacher", role: "complem", label: "表语" } ] },
    "gr14.1.4-e4": { en: "The man whose bike was lost is sad.", zh: "丢了自行车的那个男人很难过。（whose 不可省）", reg: "通用",
      tagged: [ { w: "The man", role: "subject", label: "主语" }, { w: "whose bike was lost", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "sad", role: "complem", label: "表语" } ] },
    "gr14.1.4-e5": { en: "The girl is singing is my sister.", zh: "（✗ 错句）本想说“ 正在唱歌的女孩是我姐姐 ”。", reg: "通用",
      tagged: [ { w: "The girl", role: "subject", label: "主语" }, { w: "is singing", role: "attribute", label: "定语从句（who 误省）" }, { w: "is", role: "verb", label: "谓语" }, { w: "my sister", role: "complem", label: "表语" } ] },
    "gr14.1.4-e6": { en: "The song we sang yesterday is old.", zh: "我们昨天唱的那首歌很老。", reg: "通用",
      tagged: [ { w: "The song", role: "subject", label: "主语" }, { w: "(which) we sang yesterday", role: "attribute", label: "定语从句（which 省略）" }, { w: "is", role: "verb", label: "谓语" }, { w: "old", role: "complem", label: "表语" } ] },
    "gr14.1.4-e7": { en: "Is this the book you are looking for?", zh: "这就是你在找的那本书吗？（介词后置口语）", reg: "口语",
      tagged: [ { w: "Is", role: "verb", label: "谓语" }, { w: "this", role: "subject", label: "主语" }, { w: "the book", role: "object", label: "宾语" }, { w: "(that) you are looking for", role: "attribute", label: "定语从句（that 省略）" } ] },
    /* ---------- gr14.2.1 that vs which ---------- */
    "gr14.2.1-e1": { en: "This is the best film that I have seen.", zh: "这是我看过的最好的电影。", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the best film", role: "complem", label: "表语" }, { w: "that I have seen", role: "attribute", label: "定语从句" } ] },
    "gr14.2.1-e2": { en: "He is the first person that came.", zh: "他是第一个来的人。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the first person", role: "complem", label: "表语" }, { w: "that came", role: "attribute", label: "定语从句" } ] },
    "gr14.2.1-e3": { en: "This is the only book that I like.", zh: "这是我唯一喜欢的书。", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the only book", role: "complem", label: "表语" }, { w: "that I like", role: "attribute", label: "定语从句" } ] },
    "gr14.2.1-e4": { en: "My car, which I bought in 2020, is red.", zh: "我的车是 2020 年买的，是红色的。（非限制不用 that）", reg: "通用",
      tagged: [ { w: "My car", role: "subject", label: "主语" }, { w: "which I bought in 2020", role: "attribute", label: "定语从句（非限制性）" }, { w: "is", role: "verb", label: "谓语" }, { w: "red", role: "complem", label: "表语" } ] },
    "gr14.2.1-e5": { en: "This is the best film which I have seen.", zh: "（✗ 错句）本想说“ 这是我看过的最好的电影 ”。", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the best film", role: "complem", label: "表语" }, { w: "which I have seen", role: "attribute", label: "定语从句（误用 which）" } ] },
    "gr14.2.1-e6": { en: "My car, that I bought in 2020, is red.", zh: "（✗ 错句）本想说“ 我的车是 2020 年买的 ”。", reg: "通用",
      tagged: [ { w: "My car", role: "subject", label: "主语" }, { w: "that I bought in 2020", role: "attribute", label: "定语从句（非限制误用 that）" }, { w: "is", role: "verb", label: "谓语" }, { w: "red", role: "complem", label: "表语" } ] },
    "gr14.2.1-e7": { en: "All that he said is true.", zh: "他说的全是真的。（all 后 that）", reg: "通用",
      tagged: [ { w: "All", role: "subject", label: "主语" }, { w: "that he said", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "true", role: "complem", label: "表语" } ] },
    /* ---------- gr14.2.2 介词 + 关系代词 ---------- */
    "gr14.2.2-e1": { en: "This is the house in which he lived.", zh: "这就是他住过的房子。", reg: "书面",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the house", role: "complem", label: "表语" }, { w: "in which he lived", role: "attribute", label: "定语从句" } ] },
    "gr14.2.2-e2": { en: "This is the house he lived in.", zh: "这就是他住过的房子。", reg: "口语",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the house", role: "complem", label: "表语" }, { w: "(that) he lived in", role: "attribute", label: "定语从句" } ] },
    "gr14.2.2-e3": { en: "The person to whom I spoke was kind.", zh: "跟我说话的那个人很和善。", reg: "书面",
      tagged: [ { w: "The person", role: "subject", label: "主语" }, { w: "to whom I spoke", role: "attribute", label: "定语从句" }, { w: "was", role: "verb", label: "谓语" }, { w: "kind", role: "complem", label: "表语" } ] },
    "gr14.2.2-e4": { en: "The tree under which we sat is tall.", zh: "我们坐过的那棵树很高。", reg: "通用",
      tagged: [ { w: "The tree", role: "subject", label: "主语" }, { w: "under which we sat", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "tall", role: "complem", label: "表语" } ] },
    "gr14.2.2-e5": { en: "The house whose roof is red is mine.", zh: "屋顶是红色的那栋房子是我的。（whose = of which）", reg: "通用",
      tagged: [ { w: "The house", role: "subject", label: "主语" }, { w: "whose roof is red", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "mine", role: "complem", label: "表语" } ] },
    "gr14.2.2-e6": { en: "This is the house in that he lived.", zh: "（✗ 错句）本想说“ 这就是他住过的房子 ”。", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the house", role: "complem", label: "表语" }, { w: "in that he lived", role: "attribute", label: "定语从句（误用 that）" } ] },
    "gr14.2.2-e7": { en: "Is this the pen with which you wrote?", zh: "这就是你写字的那支笔吗？", reg: "书面",
      tagged: [ { w: "Is", role: "verb", label: "谓语" }, { w: "this", role: "subject", label: "主语" }, { w: "the pen", role: "complem", label: "表语" }, { w: "with which you wrote", role: "attribute", label: "定语从句" } ] },
    /* ---------- gr14.2.3 定语从句的简化 ---------- */
    "gr14.2.3-e1": { en: "The boy playing soccer is Tom.", zh: "正在踢足球的男孩是汤姆。", reg: "通用",
      tagged: [ { w: "The boy", role: "subject", label: "主语" }, { w: "playing soccer", role: "attribute", label: "定语（现在分词短语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "Tom", role: "complem", label: "表语" } ] },
    "gr14.2.3-e2": { en: "The girl standing there is my sister.", zh: "站在那儿的女孩是我姐姐。", reg: "通用",
      tagged: [ { w: "The girl", role: "subject", label: "主语" }, { w: "standing there", role: "attribute", label: "定语（现在分词短语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "my sister", role: "complem", label: "表语" } ] },
    "gr14.2.3-e3": { en: "The books written by him are popular.", zh: "他写的书很受欢迎。", reg: "通用",
      tagged: [ { w: "The books", role: "subject", label: "主语" }, { w: "written by him", role: "attribute", label: "定语（过去分词短语）" }, { w: "are", role: "verb", label: "谓语" }, { w: "popular", role: "complem", label: "表语" } ] },
    "gr14.2.3-e4": { en: "The man wearing glasses is our teacher.", zh: "戴眼镜的那位男士是我们的老师。", reg: "通用",
      tagged: [ { w: "The man", role: "subject", label: "主语" }, { w: "wearing glasses", role: "attribute", label: "定语（现在分词短语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "our teacher", role: "complem", label: "表语" } ] },
    "gr14.2.3-e5": { en: "Do you know the woman talking to Tom?", zh: "你认识正在跟汤姆说话的那位女士吗？", reg: "通用",
      tagged: [ { w: "Do", role: "verb", label: "助动词" }, { w: "you", role: "subject", label: "主语" }, { w: "know", role: "verb", label: "谓语" }, { w: "the woman", role: "object", label: "宾语" }, { w: "talking to Tom", role: "attribute", label: "定语（现在分词短语）" } ] },
    "gr14.2.3-e6": { en: "The boy is playing soccer is Tom.", zh: "（✗ 错句）本想说“ 正在踢足球的男孩是汤姆 ”。", reg: "通用",
      tagged: [ { w: "The boy", role: "subject", label: "主语" }, { w: "is playing soccer", role: "attribute", label: "定语（残留 is）" }, { w: "is", role: "verb", label: "谓语" }, { w: "Tom", role: "complem", label: "表语" } ] },
    "gr14.2.3-e7": { en: "The bridge built in 2000 is long.", zh: "建于 2000 年的那座桥很长。", reg: "通用",
      tagged: [ { w: "The bridge", role: "subject", label: "主语" }, { w: "built in 2000", role: "attribute", label: "定语（过去分词短语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "long", role: "complem", label: "表语" } ] },
    /* ---------- gr14.2.4 本章小结与习题（高考） ---------- */
    "gr14.2.4-e1": { en: "The girl who is singing is my sister.", zh: "正在唱歌的女孩是我姐姐。（关系代词复习）", reg: "通用",
      tagged: [ { w: "The girl", role: "subject", label: "主语" }, { w: "who is singing", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "my sister", role: "complem", label: "表语" } ] },
    "gr14.2.4-e2": { en: "This is the house where I was born.", zh: "这是我出生的房子。（关系副词复习）", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the house", role: "complem", label: "表语" }, { w: "where I was born", role: "attribute", label: "定语从句" } ] },
    "gr14.2.4-e3": { en: "He failed the test, which surprised us.", zh: "他考试没及格，这让我们吃惊。（which 指全句）", reg: "通用",
      tagged: [ { w: "He failed the test", role: "subject", label: "主句" }, { w: "which surprised us", role: "attribute", label: "定语从句（which 指全句）" } ] },
    "gr14.2.4-e4": { en: "This is the best film that I have seen.", zh: "这是我看过的最好的电影。（that 必用）", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the best film", role: "complem", label: "表语" }, { w: "that I have seen", role: "attribute", label: "定语从句" } ] },
    "gr14.2.4-e5": { en: "The house in which he lived is old.", zh: "他住过的房子很旧。（介词 + which）", reg: "书面",
      tagged: [ { w: "The house", role: "subject", label: "主语" }, { w: "in which he lived", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "old", role: "complem", label: "表语" } ] },
    "gr14.2.4-e6": { en: "The book that I bought it is interesting.", zh: "（✗ 错句）本想说“ 我买的那本书很有趣 ”。", reg: "通用",
      tagged: [ { w: "The book", role: "subject", label: "主语" }, { w: "that I bought it", role: "attribute", label: "定语从句（残留 it）" }, { w: "is", role: "verb", label: "谓语" }, { w: "interesting", role: "complem", label: "表语" } ] }
  },
  units: [
    {
      id: "gr14-u1",
      title: "关系代词与关系副词",
      lessons: [
        /* ================= gr14.1.1 关系代词 ================= */
        {
          id: "gr14.1.1",
          title: "关系代词",
          pages: [
            {
              id: "gr14.1.1-p1",
              kind: "observe",
              title: "先看三句话：who / that / whose",
              sentences: [
                { id: "gr14.1.1-e1", en: "The girl who is singing is my sister.", zh: "正在唱歌的女孩是我姐姐。", reg: "通用",
                  tagged: [ { w: "The girl", role: "subject", label: "主语" }, { w: "who is singing", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "my sister", role: "complem", label: "表语" } ] },
                { id: "gr14.1.1-e2", en: "The book that I bought is interesting.", zh: "我买的那本书很有趣。", reg: "通用",
                  tagged: [ { w: "The book", role: "subject", label: "主语" }, { w: "that I bought", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "interesting", role: "complem", label: "表语" } ] },
                { id: "gr14.1.1-e3", en: "The man whose car is red is my uncle.", zh: "那辆红色汽车的主人是我叔叔。", reg: "通用",
                  tagged: [ { w: "The man", role: "subject", label: "主语" }, { w: "whose car is red", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "my uncle", role: "complem", label: "表语" } ] }
              ],
              guess: {
                q: "who / that / whose 各在“ 指代 ”什么样的先行词？",
                options: ["who 指人，that 指人或物，whose 表所属", "都可以随便用", "who 指物，that 指人"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "关系代词是“ 回指的钩子 ”：who 指人，which / that 指物，whose 表所属。"
            },
            {
              id: "gr14.1.1-p2",
              kind: "interact",
              title: "标出先行词和关系代词",
              exploreTip: "标出两句话：先行词（被修饰的名词）和关系代词（钩子）各站在哪？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The girl", role: "subject", label: "主语（先行词）" },
                      { w: "who is singing", role: "attribute", label: "定语从句" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "my sister", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "who 指代 The girl（人）——标出先行词和从句块。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The book", role: "subject", label: "主语（先行词）" },
                      { w: "that I bought", role: "attribute", label: "定语从句" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "interesting", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "that 指代 The book（物），在从句中作 bought 的宾语——标出来。"
                  }
                }
              ],
              point: "先行词查户口（人 / 物 / 所属），关系代词对号入座，还要在从句里“ 打工 ”。"
            },
            {
              id: "gr14.1.1-p3",
              kind: "explain",
              title: "关系代词：回指的钩子",
              lead: "还记得吗？上一页 who 钩住了 The girl，that 钩住了 The book，还在从句里打工。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr14.1.1-e1", "gr14.1.1-e2", "gr14.1.1-e3"],
                  note: "身份证已经亮出来了——看这三句话，关系代词各指代谁、在从句里干什么活？"
                },
                {
                  type: "idcard",
                  rule: "关系代词三问：先行词是人→who / whom / that；是物→which / that；表所属→whose。",
                  condition: "关系代词在从句中必须作成分（主语 / 宾语 / 定语）；that 指人指物都行；whom 作宾语（口语多用 who / that 代替，注明语域）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 唱歌的女孩 ”“ 我买的书 ”——“ 的 ”字结构前置，不用钩子。",
                  en: "英语从句后置，关系代词是“ 回指的钩子 ”：who 钩住人，which / that 钩住物，whose 钩住“ 谁的 ”——钩子必须在从句里打工（作成分）。",
                  unbridge: "别钩住了又留个 it（✗ the book that I bought it）——钩子已经占了宾语位。"
                },
                {
                  type: "contrast",
                  wrong: "The book that I bought it is interesting.",
                  wrongZh: "（✗ 错句）",
                  right: "The book that I bought is interesting.",
                  why: "that 已经占了宾语的位置，it 没地方站——“ that 在，it 走 ”。"
                }
              ],
              point: "这就是关系代词：先行词查户口，关系代词对号入座，钩子必须在从句里打工。",
              pointScroll: true
            },
            {
              id: "gr14.1.1-p4",
              kind: "quiz",
              title: "练一练：钩子选对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 正在唱歌的女孩是我姐姐。 ”英文是：",
                  options: ["The girl which is singing is my sister.", "The girl who is singing is my sister.", "The girl whose is singing is my sister."],
                  answer: 1,
                  tip: "先行词是人 → who。"
                },
                {
                  type: "fill",
                  stemBefore: "The man",
                  stemAfter: "car is red is my uncle.",
                  answer: "whose",
                  accept: ["whose"],
                  tip: "表所属（谁的车）→ whose。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“ The book that I bought it is interesting.”应改为：",
                  options: ["The book that I bought it is interesting.", "The book that I bought is interesting.", "The book what I bought is interesting."],
                  answer: 1,
                  tip: "that 在，it 走——that 已经占了宾语位。"
                },
                {
                  type: "fill",
                  stemBefore: "This is the house",
                  stemAfter: "Jack built.",
                  answer: "which",
                  accept: ["which", "that"],
                  tip: "先行词是物 → which / that（在从句中作 built 的宾语）。"
                }
              ],
              point: "自查：先行词是人是物？钩子在从句里打工了吗？it 残留了吗？"
            }
          ]
        },
        /* ================= gr14.1.2 关系副词 ================= */
        {
          id: "gr14.1.2",
          title: "关系副词",
          pages: [
            {
              id: "gr14.1.2-p1",
              kind: "observe",
              title: "先看三句话：when / where / why",
              sentences: [
                { id: "gr14.1.2-e1", en: "I remember the day when we met.", zh: "我记得我们相遇的那一天。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "remember", role: "verb", label: "谓语" }, { w: "the day", role: "object", label: "宾语" }, { w: "when we met", role: "attribute", label: "定语从句" } ] },
                { id: "gr14.1.2-e2", en: "This is the house where I was born.", zh: "这是我出生的房子。", reg: "通用",
                  tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the house", role: "complem", label: "表语" }, { w: "where I was born", role: "attribute", label: "定语从句" } ] },
                { id: "gr14.1.2-e3", en: "Tell me the reason why you are late.", zh: "告诉我你迟到的原因。", reg: "通用",
                  tagged: [ { w: "Tell", role: "verb", label: "谓语" }, { w: "me", role: "object", label: "宾语" }, { w: "the reason", role: "object", label: "宾语" }, { w: "why you are late", role: "attribute", label: "定语从句" } ] }
              ],
              guess: {
                q: "when / where / why 各自“ 认领 ”什么样的先行词？",
                options: ["when 时间，where 地点，why 原因（reason 专用）", "可以随便认领", "when 地点，where 时间"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "关系副词是“ 时间 / 地点 / 原因钩子 ”：when 认领时间，where 认领地点，why 只认 reason。"
            },
            {
              id: "gr14.1.2-p2",
              kind: "interact",
              title: "标出关系副词认领的先行词",
              exploreTip: "标出两句话：先行词是时间还是地点？关系副词认领对了吗？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "remember", role: "verb", label: "谓语" },
                      { w: "the day", role: "object", label: "宾语（先行词：时间）" },
                      { w: "when we met", role: "attribute", label: "定语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" },
                      { role: "attribute", label: "定语" }
                    ],
                    hint: "the day 是时间 → when 认领（= on which）。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "This", role: "subject", label: "主语" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "the house", role: "complem", label: "表语（先行词：地点）" },
                      { w: "where I was born", role: "attribute", label: "定语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" },
                      { role: "attribute", label: "定语" }
                    ],
                    hint: "the house 是地点 → where 认领（= in which）。"
                  }
                }
              ],
              point: "先行词查户口（时间 / 地点 / 原因），关系副词对号认领。"
            },
            {
              id: "gr14.1.2-p3",
              kind: "explain",
              title: "关系副词：时间地点原因钩子",
              lead: "还记得吗？上一页 when 认领了 the day（时间），where 认领了 the house（地点）。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr14.1.2-e1", "gr14.2.2-e2", "gr14.1.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，关系副词 = 介词 + which。"
                },
                {
                  type: "idcard",
                  rule: "先行词是时间→when（= on / in / at which）；地点→where（= in / at which）；reason→why。",
                  condition: "关系副词在从句中作状语，不作成分；why 前只有 reason（the reason why…that 杂糅不许）；when / where 可还原成“ 介词 + which ”验证。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 我们相遇的那天 ”“ 我出生的房子 ”——“ 的 ”字一统天下。",
                  en: "英语看先行词发钩子：时间发 when（the day when = the day on which），地点发 where，原因只发给 reason（why）——钩子认领错，先行词就不认。",
                  unbridge: "别拿“ 的 ”一套到底——先行词是时间还是地点，决定发 when 还是 where。"
                },
                {
                  type: "contrast",
                  wrong: "I remember the day where we met.",
                  wrongZh: "（✗ 错句）",
                  right: "I remember the day when we met.",
                  why: "先行词是时间（day），要用 when 认领——where 是地点的钩子。"
                }
              ],
              point: "这就是关系副词：when 时间，where 地点，why 只认 reason。",
              pointScroll: true
            },
            {
              id: "gr14.1.2-p4",
              kind: "quiz",
              title: "练一练：钩子认领对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我记得我们相遇的那一天。 ”英文是：",
                  options: ["I remember the day where we met.", "I remember the day when we met.", "I remember the day why we met."],
                  answer: 1,
                  tip: "先行词是时间 → when。"
                },
                {
                  type: "fill",
                  stemBefore: "This is the house",
                  stemAfter: "I was born.",
                  answer: "where",
                  accept: ["where"],
                  tip: "先行词是地点 → where（= in which）。"
                },
                {
                  type: "choice",
                  stem: "“ 告诉我你迟到的原因。 ”英文是：",
                  options: ["Tell me the reason why you are late.", "Tell me the reason when you are late.", "Tell me the reason why that you are late."],
                  answer: 0,
                  tip: "reason → why；why 后不加 that。"
                },
                {
                  type: "fill",
                  stemBefore: "Sunday is the day",
                  stemAfter: "we rest.",
                  answer: "when",
                  accept: ["when"],
                  tip: "the day（时间）→ when。"
                }
              ],
              point: "自查：先行词是时间 / 地点 / 原因？钩子认领对了吗？"
            }
          ]
        },
        /* ================= gr14.1.3 限制性 vs 非限制性 ================= */
        {
          id: "gr14.1.3",
          title: "限制性 vs 非限制性",
          pages: [
            {
              id: "gr14.1.3-p1",
              kind: "observe",
              title: "先看三句话：逗号改变了什么？",
              sentences: [
                { id: "gr14.1.3-e1", en: "My brother who lives in Beijing is a doctor.", zh: "我那个住在北京的哥哥是医生。", reg: "通用",
                  tagged: [ { w: "My brother", role: "subject", label: "主语" }, { w: "who lives in Beijing", role: "attribute", label: "定语从句（限制性）" }, { w: "is", role: "verb", label: "谓语" }, { w: "a doctor", role: "complem", label: "表语" } ] },
                { id: "gr14.1.3-e2", en: "My brother, who lives in Beijing, is a doctor.", zh: "我哥哥住在北京，他是医生。", reg: "通用",
                  tagged: [ { w: "My brother", role: "subject", label: "主语" }, { w: "who lives in Beijing", role: "attribute", label: "定语从句（非限制性）" }, { w: "is", role: "verb", label: "谓语" }, { w: "a doctor", role: "complem", label: "表语" } ] },
                { id: "gr14.1.3-e3", en: "He failed the test, which surprised us.", zh: "他考试没及格，这让我们吃惊。", reg: "通用",
                  tagged: [ { w: "He failed the test", role: "subject", label: "主句" }, { w: "which surprised us", role: "attribute", label: "定语从句（which 指全句）" } ] }
              ],
              guess: {
                q: "第一句和第二句，哪个暗示“ 还有别的兄弟 ”？",
                options: ["第一句（无逗号：限定是哪个哥哥）", "第二句（有逗号）", "两句一样"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "无逗号 = 限制（起识别作用：哪个哥哥？）；有逗号 = 非限制（补充说明：顺便一提）。"
            },
            {
              id: "gr14.1.3-p2",
              kind: "interact",
              title: "标出逗号：限制还是非限制？",
              exploreTip: "标出两句话：有逗号 / 无逗号，从句的“ 活儿 ”有什么不同？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "My brother", role: "subject", label: "主语" },
                      { w: "who lives in Beijing", role: "attribute", label: "定语从句（限制性）" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "a doctor", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "无逗号：从句起“ 识别 ”作用——是哪个哥哥？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Beijing", role: "subject", label: "主语" },
                      { w: "which is the capital of China", role: "attribute", label: "定语从句（非限制性）" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "beautiful", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "有逗号：从句是补充说明——去掉也知道是北京。"
                  }
                }
              ],
              point: "逗号是“ 要不要 ”的信号：无逗号要（识别），有逗号不要也行（补充）。"
            },
            {
              id: "gr14.1.3-p3",
              kind: "explain",
              title: "逗号：要不要的信号",
              lead: "还记得吗？上一页无逗号的从句在“ 识别 ”，有逗号的从句在“ 补充说明 ”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr14.1.3-e1", "gr14.1.3-e2", "gr14.1.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，逗号、that、which 各有什么讲究？"
                },
                {
                  type: "idcard",
                  rule: "无逗号 = 限制性（起限定识别作用）；有逗号 = 非限制性（补充说明，去掉也认得）；非限制性不用 that。",
                  condition: "非限制性读出来有停顿（呼吸测试）；which 可指前面整个句子（He failed, which…）；专有名词 / 独一无二的事物后多用非限制性。"
                },
                {
                  type: "bridge",
                  zh: "汉语都用“ 的 ”，逗号不管事：“ 住在北京的哥哥 ”，有几个兄弟靠上下文猜。",
                  en: "英语逗号管事：My brother who…（几个兄弟？从句来识别）；My brother, who…（就一个哥哥，从句是顺便一提）——逗号是意思的一部分。",
                  unbridge: "别漏逗号致歧义——英语里逗号不是装饰，是“ 要不要 ”的信号。"
                },
                {
                  type: "contrast",
                  wrong: "My mother, that is cooking, is kind.",
                  wrongZh: "（✗ 错句）",
                  right: "My mother, who is cooking, is kind.",
                  why: "有逗号（非限制性），that 没有入场券——用 who。"
                }
              ],
              point: "这就是限制 vs 非限制：无逗号识别，有逗号补充；非限制不用 that。",
              pointScroll: true
            },
            {
              id: "gr14.1.3-p4",
              kind: "quiz",
              title: "练一练：逗号加对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我哥哥住在北京，他是医生。（只有一个哥哥）”英文是：",
                  options: ["My brother who lives in Beijing is a doctor.", "My brother, who lives in Beijing, is a doctor.", "My brother, that lives in Beijing, is a doctor."],
                  answer: 1,
                  tip: "只有一个哥哥 → 非限制性 → 有逗号，不用 that。"
                },
                {
                  type: "fill",
                  stemBefore: "He failed the test,",
                  stemAfter: "surprised us.",
                  answer: "which",
                  accept: ["which"],
                  tip: "which 指前面整个句子（他没及格这件事）。"
                },
                {
                  type: "choice",
                  stem: "“ 努力的学生会成功。 ”英文是：",
                  options: ["The students, who work hard, will succeed.", "The students who work hard will succeed.", "The students that work hard, will succeed."],
                  answer: 1,
                  tip: "起识别作用（哪些学生？）→ 限制性 → 无逗号。"
                },
                {
                  type: "fill",
                  stemBefore: "Beijing,",
                  stemAfter: "is the capital of China, is beautiful.",
                  answer: "which",
                  accept: ["which"],
                  tip: "非限制性 + 专有名词 → which，不用 that。"
                }
              ],
              point: "自查：起识别作用吗？是→无逗号；否→有逗号 + 不用 that。"
            }
          ]
        },
        /* ================= gr14.1.4 关系代词省略规则 ================= */
        {
          id: "gr14.1.4",
          title: "关系代词省略规则",
          pages: [
            {
              id: "gr14.1.4-p1",
              kind: "observe",
              title: "先看三句话：谁被省了？谁不能省？",
              sentences: [
                { id: "gr14.1.4-e1", en: "The book I bought is good.", zh: "我买的那本书很好。", reg: "通用",
                  tagged: [ { w: "The book", role: "subject", label: "主语" }, { w: "(that) I bought", role: "attribute", label: "定语从句（that 省略）" }, { w: "is", role: "verb", label: "谓语" }, { w: "good", role: "complem", label: "表语" } ] },
                { id: "gr14.1.4-e2", en: "The car that stopped at the door is mine.", zh: "停在门口的那辆车是我的。", reg: "通用",
                  tagged: [ { w: "The car", role: "subject", label: "主语" }, { w: "that stopped at the door", role: "attribute", label: "定语从句" }, { w: "is", role: "verb", label: "谓语" }, { w: "mine", role: "complem", label: "表语" } ] },
                { id: "gr14.1.4-e6", en: "The song we sang yesterday is old.", zh: "我们昨天唱的那首歌很老。", reg: "通用",
                  tagged: [ { w: "The song", role: "subject", label: "主语" }, { w: "(which) we sang yesterday", role: "attribute", label: "定语从句（which 省略）" }, { w: "is", role: "verb", label: "谓语" }, { w: "old", role: "complem", label: "表语" } ] }
              ],
              guess: {
                q: "第一、三句省了 that / which，第二句的 that 能省吗？",
                options: ["能省", "不能省——that 作主语，省了“ 停在门口 ”就没主语了", "看心情"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "关系代词作宾语可省；作主语、介词宾语、whose 不可省。"
            },
            {
              id: "gr14.1.4-p2",
              kind: "interact",
              title: "标出能省和不能省的",
              exploreTip: "标出两句话：who 作主语（不可省），whose（不可省）——省了会怎样？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The girl", role: "subject", label: "主语" },
                      { w: "who is singing", role: "attribute", label: "定语从句" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "my sister", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "who 作主语（is singing 的主语）——省了它，“ 唱歌 ”就没主语了。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The man", role: "subject", label: "主语" },
                      { w: "whose bike was lost", role: "attribute", label: "定语从句" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "sad", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "whose 表所属，永远不可省——标出从句块。"
                  }
                }
              ],
              point: "作宾语可省（不重要的词吞掉）；作主语 / 介词宾语 / whose 不可省。"
            },
            {
              id: "gr14.1.4-p3",
              kind: "explain",
              title: "省略规则：宾语可省，主语不可省",
              lead: "还记得吗？上一页 that 作主语省不得，whose 永远省不得。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr14.1.4-e1", "gr14.1.4-e2", "gr14.1.4-e6"],
                  note: "身份证已经亮出来了——看这三句话，关系代词在从句里当什么成分？"
                },
                {
                  type: "idcard",
                  rule: "关系代词作宾语可省（that / which / who）；作主语不可省；介词后不可省；whose 不可省。",
                  condition: "口语中 that 常省（The book I bought）；书面 whose 永不省；省的是关系代词，不是先行词。"
                },
                {
                  type: "bridge",
                  zh: "汉语没有省略问题：“ 我买的书 ”，“ 的 ”不能省。",
                  en: "英语“ 不重要的词可以吞掉 ”：作宾语的关系代词是“ 配角 ”，可省；作主语的是“ 主角 ”，省了从句就散了——主角不可省。",
                  unbridge: "别把主语关系代词也吞了（✗ The girl is singing is my sister）——主角一走，句子就散。"
                },
                {
                  type: "contrast",
                  wrong: "The car stopped at the door is mine.",
                  wrongZh: "（✗ 错句）",
                  right: "The car that stopped at the door is mine.",
                  why: "that 作主语，省了它“ 停在门口 ”就没主语了——主语关系代词不可省。"
                }
              ],
              point: "这就是省略规则：宾语可省，主语 / 介词后 / whose 不可省。",
              pointScroll: true
            },
            {
              id: "gr14.1.4-p4",
              kind: "quiz",
              title: "练一练：能省吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 我买的那本书很好。 ”可以省略 that 的是：",
                  options: ["The book that I bought is good. → The book I bought is good.", "The book that is interesting is good. → The book is interesting is good.", "都可以省"],
                  answer: 0,
                  tip: "that 作 bought 的宾语 → 可省；作 is interesting 的主语 → 不可省。"
                },
                {
                  type: "fill",
                  stemBefore: "The man",
                  stemAfter: "bike was lost is sad.",
                  answer: "whose",
                  accept: ["whose"],
                  tip: "whose 表所属，不可省。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["The girl is singing is my sister.", "The girl who is singing is my sister.", "The girl singing is my sister who."],
                  answer: 1,
                  tip: "who 作主语不可省。"
                },
                {
                  type: "fill",
                  stemBefore: "Is this the book you are looking",
                  stemAfter: "?（for）",
                  answer: "for",
                  accept: ["for"],
                  tip: "介词后置口语：the book (that) you are looking for——介词后置时 that 可省。"
                }
              ],
              point: "自查：关系代词当什么成分？宾语→可省；主语 / 介词后 / whose→不可省。"
            }
          ]
        }
      ]
    },
    {
      id: "gr14-u2",
      title: "难点与简化",
      lessons: [
        /* ================= gr14.2.1 that vs which ================= */
        {
          id: "gr14.2.1",
          title: "that vs which",
          pages: [
            {
              id: "gr14.2.1-p1",
              kind: "observe",
              title: "先看三句话：that 的“ 必用 ”场",
              sentences: [
                { id: "gr14.2.1-e1", en: "This is the best film that I have seen.", zh: "这是我看过的最好的电影。", reg: "通用",
                  tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the best film", role: "complem", label: "表语" }, { w: "that I have seen", role: "attribute", label: "定语从句" } ] },
                { id: "gr14.2.1-e2", en: "He is the first person that came.", zh: "他是第一个来的人。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the first person", role: "complem", label: "表语" }, { w: "that came", role: "attribute", label: "定语从句" } ] },
                { id: "gr14.2.1-e3", en: "This is the only book that I like.", zh: "这是我唯一喜欢的书。", reg: "通用",
                  tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the only book", role: "complem", label: "表语" }, { w: "that I like", role: "attribute", label: "定语从句" } ] }
              ],
              guess: {
                q: "最高级 / 序数词 / only 后面，跟的是 that 还是 which？",
                options: ["that（必用）", "which（必用）", "随便"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "that 必用：最高级 / 序数词 / only / all 后；that 不用：非限制 / 介词后。"
            },
            {
              id: "gr14.2.1-p2",
              kind: "interact",
              title: "标出 that 必用和不用的场",
              exploreTip: "标出两句话：最高级后 that 必用，有逗号（非限制）that 不用。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "This", role: "subject", label: "主语" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "the best film", role: "complem", label: "表语" },
                      { w: "that I have seen", role: "attribute", label: "定语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" },
                      { role: "attribute", label: "定语" }
                    ],
                    hint: "the best film（最高级）→ that 必用。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "My car", role: "subject", label: "主语" },
                      { w: "which I bought in 2020", role: "attribute", label: "定语从句（非限制性）" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "red", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "有逗号（非限制性）→ that 不用，用 which。"
                  }
                }
              ],
              point: "that 的身份证：最高级 / 序数词 / only / all 后必用；非限制 / 介词后不用。"
            },
            {
              id: "gr14.2.1-p3",
              kind: "explain",
              title: "that 必用 / 不用口诀",
              lead: "还记得吗？上一页 the best film 后 that 必用，有逗号的从句 that 不用。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr14.2.1-e1", "gr14.2.1-e3", "gr14.2.1-e4"],
                  note: "身份证已经亮出来了——看这三句话，that 什么时候必须来、什么时候不许来？"
                },
                {
                  type: "idcard",
                  rule: "that 必用：最高级 / 序数词 / only / all 后；that 不用：非限制性（有逗号）/ 介词后。",
                  condition: "口语中 which / that 常混用（注明语域，口语可接受）；考试按严格口径：最高级 / 序数词 / only 后用 that，非限制 / 介词后不用 that。"
                },
                {
                  type: "bridge",
                  zh: "汉语“ 最好的电影 ”“ 唯一的书 ”——“ 的 ”字通用，不分 that / which。",
                  en: "英语 that / which 分工看“ 身份证 ”：最高级 / 序数词 / only 是 that 的“ 必用场 ”，逗号（非限制）和介词后是 that 的“ 禁区 ”。",
                  unbridge: "别在禁区用 that（✗ My car, that…）——逗号和介词后，that 没有入场券。"
                },
                {
                  type: "contrast",
                  wrong: "My car, that I bought in 2020, is red.",
                  wrongZh: "（✗ 错句）",
                  right: "My car, which I bought in 2020, is red.",
                  why: "有逗号（非限制性），that 没有入场券——用 which。"
                }
              ],
              point: "这就是 that vs which：必用场（最高级 / 序数词 / only / all），禁区（非限制 / 介词后）。",
              pointScroll: true
            },
            {
              id: "gr14.2.1-p4",
              kind: "quiz",
              title: "练一练：that 还是 which？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 这是我看过的最好的电影。 ”英文是：",
                  options: ["This is the best film which I have seen.", "This is the best film that I have seen.", "This is the best film what I have seen."],
                  answer: 1,
                  tip: "最高级后 that 必用。"
                },
                {
                  type: "fill",
                  stemBefore: "He is the first person",
                  stemAfter: "came.",
                  answer: "that",
                  accept: ["that"],
                  tip: "序数词后 that 必用。"
                },
                {
                  type: "choice",
                  stem: "“ 我的车是 2020 年买的，是红色的。 ”英文是：",
                  options: ["My car, that I bought in 2020, is red.", "My car, which I bought in 2020, is red.", "My car that I bought in 2020, is red."],
                  answer: 1,
                  tip: "非限制性（有逗号）不用 that。"
                },
                {
                  type: "fill",
                  stemBefore: "All",
                  stemAfter: "he said is true.",
                  answer: "that",
                  accept: ["that"],
                  tip: "all 后 that 必用。"
                }
              ],
              point: "自查：最高级 / 序数词 / only / all→that；有逗号 / 介词后→不用 that。"
            }
          ]
        },
        /* ================= gr14.2.2 介词 + 关系代词 ================= */
        {
          id: "gr14.2.2",
          title: "介词 + 关系代词",
          pages: [
            {
              id: "gr14.2.2-p1",
              kind: "observe",
              title: "先看三句话：介词站哪？",
              sentences: [
                { id: "gr14.2.2-e1", en: "This is the house in which he lived.", zh: "这就是他住过的房子。", reg: "书面",
                  tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the house", role: "complem", label: "表语" }, { w: "in which he lived", role: "attribute", label: "定语从句" } ] },
                { id: "gr14.2.2-e2", en: "This is the house he lived in.", zh: "这就是他住过的房子。", reg: "口语",
                  tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "the house", role: "complem", label: "表语" }, { w: "(that) he lived in", role: "attribute", label: "定语从句" } ] },
                { id: "gr14.2.2-e3", en: "The person to whom I spoke was kind.", zh: "跟我说话的那个人很和善。", reg: "书面",
                  tagged: [ { w: "The person", role: "subject", label: "主语" }, { w: "to whom I spoke", role: "attribute", label: "定语从句" }, { w: "was", role: "verb", label: "谓语" }, { w: "kind", role: "complem", label: "表语" } ] }
              ],
              guess: {
                q: "in which 和 …in 意思一样吗？哪个正式、哪个口语？",
                options: ["意思一样；in which 正式，…in 口语", "意思不一样", "都是口语"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "介词 + which / whom：前置 = 正式书面，后置 = 口语；介词后不许跟 that。"
            },
            {
              id: "gr14.2.2-p2",
              kind: "interact",
              title: "拼出介词前置句",
              exploreTip: "拼出正式版（in which 前置）和口语版（…in 后置）——介词必须“ 现身 ”。",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVP",
                    blocks: [
                      { w: "This", role: "subject" },
                      { w: "is", role: "verb" },
                      { w: "the house", role: "complem" },
                      { w: "in which he lived", role: "attribute" }
                    ],
                    hint: "介词 in 站到 which 前面（正式）——口语版是 the house he lived in。",
                    doneNote: "in which = 正式前置；he lived in = 口语后置。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The house", role: "subject", label: "主语" },
                      { w: "whose roof is red", role: "attribute", label: "定语从句" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "mine", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "whose = of which（…的…）——标出从句块。"
                  }
                }
              ],
              point: "介词现身：前置正式，后置口语；whose = of which。"
            },
            {
              id: "gr14.2.2-p3",
              kind: "explain",
              title: "介词现身：前置正式，后置口语",
              lead: "还记得吗？上一页 in which（正式）和 he lived in（口语）意思一样，站位不同。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr14.2.2-e1", "gr14.2.2-e2", "gr14.2.2-e5"],
                  note: "身份证已经亮出来了——看这三句话，介词站哪、跟谁？"
                },
                {
                  type: "idcard",
                  rule: "介词 + which / whom（不许 that）；介词前置 = 正式书面，介词后置 = 口语；whose = of which。",
                  condition: "介词选择看动词搭配（live in / speak to / write with）；口语 whom 常换成 who / that（注明语域）；介词后 that 永不许。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“ 他住过的房子 ”——介词“ 在 ”藏起来了，不用现身。",
                  en: "英语介词必须“ 现身 ”：正式场合站到 which 前面（in which he lived），口语场合留在句尾（he lived in）——站哪看场合，但不能消失。",
                  unbridge: "别把介词弄丢（✗ the house which he lived）——live 后面的 in 必须现身。"
                },
                {
                  type: "contrast",
                  wrong: "This is the house in that he lived.",
                  wrongZh: "（✗ 错句）",
                  right: "This is the house in which he lived.",
                  why: "介词后面不许跟 that——用 which。"
                }
              ],
              point: "这就是介词 + 关系代词：介词现身，前置正式后置口语；介词后不用 that。",
              pointScroll: true
            },
            {
              id: "gr14.2.2-p4",
              kind: "quiz",
              title: "练一练：介词现身了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ 这就是他住过的房子。（正式）”英文是：",
                  options: ["This is the house in that he lived.", "This is the house in which he lived.", "This is the house which he lived."],
                  answer: 1,
                  tip: "介词前置 + which；介词后不许 that；介词不能丢。"
                },
                {
                  type: "fill",
                  stemBefore: "The person",
                  stemAfter: "whom I spoke was kind.",
                  answer: "to",
                  accept: ["to"],
                  tip: "speak to（跟…说话）→ to whom。"
                },
                {
                  type: "choice",
                  stem: "“ 屋顶是红色的那栋房子是我的。 ”英文是：",
                  options: ["The house whose roof is red is mine.", "The house which roof is red is mine.", "The house of that roof is red is mine."],
                  answer: 0,
                  tip: "whose = of which，表所属。"
                },
                {
                  type: "fill",
                  stemBefore: "Is this the pen",
                  stemAfter: "which you wrote?（with）",
                  answer: "with",
                  accept: ["with"],
                  tip: "write with（用…写）→ with which。"
                }
              ],
              point: "自查：介词现身了吗？前置 / 后置看场合；介词后不用 that。"
            }
          ]
        },
        /* ================= gr14.2.3 定语从句的简化 ================= */
        {
          id: "gr14.2.3",
          title: "定语从句的简化",
          pages: [
            {
              id: "gr14.2.3-p1",
              kind: "observe",
              title: "先看三句话：从哪个长句压缩来？",
              sentences: [
                { id: "gr14.2.3-e1", en: "The boy playing soccer is Tom.", zh: "正在踢足球的男孩是汤姆。", reg: "通用",
                  tagged: [ { w: "The boy", role: "subject", label: "主语" }, { w: "playing soccer", role: "attribute", label: "定语（现在分词短语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "Tom", role: "complem", label: "表语" } ] },
                { id: "gr14.2.3-e3", en: "The books written by him are popular.", zh: "他写的书很受欢迎。", reg: "通用",
                  tagged: [ { w: "The books", role: "subject", label: "主语" }, { w: "written by him", role: "attribute", label: "定语（过去分词短语）" }, { w: "are", role: "verb", label: "谓语" }, { w: "popular", role: "complem", label: "表语" } ] },
                { id: "gr14.2.3-e4", en: "The man wearing glasses is our teacher.", zh: "戴眼镜的那位男士是我们的老师。", reg: "通用",
                  tagged: [ { w: "The man", role: "subject", label: "主语" }, { w: "wearing glasses", role: "attribute", label: "定语（现在分词短语）" }, { w: "is", role: "verb", label: "谓语" }, { w: "our teacher", role: "complem", label: "表语" } ] }
              ],
              guess: {
                q: "playing / written / wearing 都是从哪个“ 长句子 ”压缩来的？",
                options: ["who is playing / which were written / who is wearing", "不知道", "都是原形"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "关系代词 + be 可以一起省，剩下分词作定语——gr10 分词在这里兑现。"
            },
            {
              id: "gr14.2.3-p2",
              kind: "interact",
              title: "标出压缩后的分词定语",
              exploreTip: "标出两句话的分词定语块：主动 / 进行→doing，被动 / 完成→done。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The boy", role: "subject", label: "主语" },
                      { w: "playing soccer", role: "attribute", label: "定语（现在分词短语）" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "Tom", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "who is playing → playing：主动 → doing。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The books", role: "subject", label: "主语" },
                      { w: "written by him", role: "attribute", label: "定语（过去分词短语）" },
                      { w: "are", role: "verb", label: "谓语" },
                      { w: "popular", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "attribute", label: "定语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "which were written → written：被动 → done。"
                  }
                }
              ],
              point: "简化 = gr10 回填：主动 / 进行→doing，被动 / 完成→done。"
            },
            {
              id: "gr14.2.3-p3",
              kind: "explain",
              title: "定语从句压缩成分词",
              lead: "还记得吗？上一页 who is playing 压成 playing，which were written 压成 written。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr14.2.3-e1", "gr14.2.3-e3", "gr14.2.3-e4"],
                  note: "身份证已经亮出来了——看这三句话，who is / which were 是怎么被压掉的？"
                },
                {
                  type: "idcard",
                  rule: "关系代词 + be 可一起省 → 剩下分词作定语：主动 / 进行→doing，被动 / 完成→done。",
                  condition: "只在“ 关系代词 + be ”结构中可省；being 一般省掉（注明）；简化后逻辑主语不变（还是先行词）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“ 正在踢足球的男孩 ”本来就短，不用压缩。",
                  en: "英语 the boy who is playing 太长，who is 一起省掉压成 the boy playing——gr10 学的分词定语，在这里兑现。",
                  unbridge: "别只省一半（✗ The boy is playing soccer is Tom）——who is 要一起走，is 不能单独留下。"
                },
                {
                  type: "contrast",
                  wrong: "The boy is playing soccer is Tom.",
                  wrongZh: "（✗ 错句）",
                  right: "The boy playing soccer is Tom.",
                  why: "who is 一起省，is 不能单独留下——一个句子只能有一个谓语。"
                }
              ],
              point: "这就是定语从句的简化：关系代词 + be 一起省，剩下分词；gr10 兑现。",
              pointScroll: true
            },
            {
              id: "gr14.2.3-p4",
              kind: "quiz",
              title: "练一练：压缩对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“ the boy who is playing soccer”可简化为：",
                  options: ["the boy playing soccer", "the boy is playing soccer", "the boy played soccer"],
                  answer: 0,
                  tip: "who is 一起省 → playing（主动）。"
                },
                {
                  type: "fill",
                  stemBefore: "The books",
                  stemAfter: "by him are popular.（write）",
                  answer: "written",
                  accept: ["written"],
                  tip: "which were written → written（被动 → done）。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["The boy is playing soccer is Tom.", "The boy playing soccer is Tom.", "The boy who playing soccer is Tom."],
                  answer: 1,
                  tip: "who is 一起省，is 不能单独留下。"
                },
                {
                  type: "fill",
                  stemBefore: "The bridge",
                  stemAfter: "in 2000 is long.（build）",
                  answer: "built",
                  accept: ["built"],
                  tip: "which was built → built（被动 → done）。"
                }
              ],
              point: "自查：who is / which were 一起省了吗？doing / done 选对了吗？"
            }
          ]
        },
        /* ================= gr14.2.4 本章小结与习题（高考） ================= */
        {
          id: "gr14.2.4",
          title: "本章小结与习题",
          pages: [
            {
              id: "gr14.2.4-p1",
              kind: "explain",
              title: "定语从句总表",
              lead: "本章大将集结：关系代词、关系副词、限制 / 非限制、省略、that / which、介词 + 关系代词、简化。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr14.1.1-e2", "gr14.1.2-e2", "gr14.1.3-e3"],
                  note: "三句话，三种关系词——看看先行词和关系词的搭配。"
                },
                {
                  type: "idcard",
                  rule: "定语从句总表：人→who / whom / whose / that；物→which / that；时间→when；地点→where；原因→why（reason）。"
                ,
                  condition: "做题四问：① 先行词是人是物？② 关系词在从句中当什么成分？③ 有逗号吗（非限制）？④ 介词后 / 最高级后有讲究吗？"
                },
                {
                  type: "bridge",
                  zh: "汉语“ 的 ”字一统天下，英语关系词分工精细。",
                  en: "英语定语从句四步：查先行词户口 → 选关系词 → 看成分（打工吗）→ 看逗号和介词——四步走完，关系词不会错。",
                  unbridge: "别凭语感选 that / which——四问走完再落笔。"
                },
                {
                  type: "contrast",
                  wrong: "The book that I bought it is interesting.",
                  wrongZh: "（✗ 错句）",
                  right: "The book that I bought is interesting.",
                  why: "本章最大坑：关系代词残留 it（高考改错高频）——that 在，it 走。"
                }
              ],
              point: "定语从句 = 先行词 + 关系词 + 从句；四问走完，关系词不会错。",
              pointScroll: true
            },
            {
              id: "gr14.2.4-p2",
              kind: "quiz",
              title: "高考综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "“ 这是我看过的最好的电影。 ”英文是：",
                  options: ["This is the best film which I have seen.", "This is the best film that I have seen.", "This is the best film what I have seen."],
                  answer: 1,
                  tip: "最高级后 that 必用。"
                },
                {
                  type: "fill",
                  stemBefore: "This is the house",
                  stemAfter: "he lived.",
                  answer: "in which",
                  accept: ["in which"],
                  tip: "正式：in which；口语：he lived in（that 可省）。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“ The book that I bought it is interesting.”应改为：",
                  options: ["The book that I bought it is interesting.", "The book that I bought is interesting.", "The book which I bought it is interesting."],
                  answer: 1,
                  tip: "that 在，it 走。"
                },
                {
                  type: "fill",
                  stemBefore: "He failed the test,",
                  stemAfter: "surprised us.",
                  answer: "which",
                  accept: ["which"],
                  tip: "which 指前面整个句子；非限制性不用 that。"
                }
              ],
              point: "本章通关：四问选关系词；that 在 it 走；逗号是信号。"
            }
          ]
        }
      ]
    }
  ]
};
