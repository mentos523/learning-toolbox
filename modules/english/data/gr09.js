/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr09：非谓语动词（一）
 *
 * 数据口径（M5）：window.ENG_CH["gr09"] = { id, title, units[] }，
 * 与 gr05.js 同构；例句 id 规则见 docs/english-grammar-review-ledger.md。
 *
 * 单元 gr09-u1：动词不定式（gr09.1.1–gr09.1.4）
 * 单元 gr09-u2：动名词（gr09.2.1–gr09.2.3）
 *
 * 撰写：语法生产B队（2026-10-14）；例句状态 drafted，待 D3 三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr09"] = {
  id: "gr09",
  title: "非谓语动词（一）：不定式与动名词",
  sentences: {
    /* ---------- gr09.1.1 不定式作宾语 ---------- */
    "gr09.1.1-e1": { en: "I want to be a teacher.", zh: "我想当老师。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "want", role: "verb", label: "谓语" }, { w: "to be", role: "verb", label: "不定式" }, { w: "a teacher", role: "complem", label: "表语" } ] },
    "gr09.1.1-e2": { en: "She decided to stay at home.", zh: "她决定待在家里。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "decided", role: "verb", label: "谓语" }, { w: "to stay", role: "verb", label: "不定式" }, { w: "at home", role: "adverb", label: "状语" } ] },
    "gr09.1.1-e3": { en: "I don't know what to do.", zh: "我不知道做什么。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't", role: "verb", label: "助动词" }, { w: "know", role: "verb", label: "谓语" }, { w: "what to do", role: "object", label: "宾语" } ] },
    "gr09.1.1-e4": { en: "He hopes to win.", zh: "他希望获胜。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "hopes", role: "verb", label: "谓语" }, { w: "to win", role: "verb", label: "不定式" } ] },
    "gr09.1.1-e5": { en: "We learned to swim.", zh: "我们学会了游泳。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "learned", role: "verb", label: "谓语" }, { w: "to swim", role: "verb", label: "不定式" } ] },
    "gr09.1.1-e6": { en: "I want go there.", zh: "（错句）我想去那儿。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "want", role: "verb", label: "谓语" }, { w: "go", role: "verb", label: "动词原形" }, { w: "there", role: "adverb", label: "状语" } ] },
    "gr09.1.1-e7": { en: "She decided stay at home.", zh: "（错句）她决定待在家里。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "decided", role: "verb", label: "谓语" }, { w: "stay", role: "verb", label: "动词原形" }, { w: "at home", role: "adverb", label: "状语" } ] },
    /* ---------- gr09.1.2 不定式作目的与结果状语 ---------- */
    "gr09.1.2-e1": { en: "He got up early to catch the bus.", zh: "他早起是为了赶公交车。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "got up", role: "verb", label: "谓语" }, { w: "early", role: "adverb", label: "状语" }, { w: "to catch", role: "verb", label: "不定式" }, { w: "the bus", role: "object", label: "宾语" } ] },
    "gr09.1.2-e2": { en: "She is old enough to go to school.", zh: "她够大，可以上学了。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "old enough", role: "complem", label: "表语" }, { w: "to go", role: "verb", label: "不定式" }, { w: "to school", role: "adverb", label: "状语" } ] },
    "gr09.1.2-e3": { en: "He is too young to join the army.", zh: "他太小，不能参军。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "too young", role: "complem", label: "表语" }, { w: "to join", role: "verb", label: "不定式" }, { w: "the army", role: "object", label: "宾语" } ] },
    "gr09.1.2-e4": { en: "I came here to see you.", zh: "我来这儿是为了见你。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "came", role: "verb", label: "谓语" }, { w: "here", role: "adverb", label: "状语" }, { w: "to see", role: "verb", label: "不定式" }, { w: "you", role: "object", label: "宾语" } ] },
    "gr09.1.2-e5": { en: "It is never too late to learn.", zh: "学习永远不晚。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "never too late", role: "complem", label: "表语" }, { w: "to learn", role: "verb", label: "不定式" } ] },
    "gr09.1.2-e6": { en: "He got up early for catch the bus.", zh: "（错句）他早起是为了赶公交车。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "got up", role: "verb", label: "谓语" }, { w: "early", role: "adverb", label: "状语" }, { w: "for catch", role: "adverb", label: "状语" }, { w: "the bus", role: "object", label: "宾语" } ] },
    "gr09.1.2-e7": { en: "He got up early to catching the bus.", zh: "（错句）他早起是为了赶公交车。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "got up", role: "verb", label: "谓语" }, { w: "early", role: "adverb", label: "状语" }, { w: "to catching", role: "verb", label: "不定式" }, { w: "the bus", role: "object", label: "宾语" } ] },
    /* ---------- gr09.1.3 不定式的逻辑主语与 it 句型 ---------- */
    "gr09.1.3-e1": { en: "It is important for us to learn English.", zh: "学好英语对我们很重要。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "important", role: "complem", label: "表语" }, { w: "for us", role: "adverb", label: "状语" }, { w: "to learn", role: "verb", label: "不定式" }, { w: "English", role: "object", label: "宾语" } ] },
    "gr09.1.3-e2": { en: "It is kind of you to help me.", zh: "你真好，谢谢你帮我。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "kind", role: "complem", label: "表语" }, { w: "of you", role: "adverb", label: "状语" }, { w: "to help", role: "verb", label: "不定式" }, { w: "me", role: "object", label: "宾语" } ] },
    "gr09.1.3-e3": { en: "It is time to go home.", zh: "该回家了。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "time", role: "complem", label: "表语" }, { w: "to go", role: "verb", label: "不定式" }, { w: "home", role: "adverb", label: "状语" } ] },
    "gr09.1.3-e4": { en: "It is easy for him to swim.", zh: "游泳对他来说很容易。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "easy", role: "complem", label: "表语" }, { w: "for him", role: "adverb", label: "状语" }, { w: "to swim", role: "verb", label: "不定式" } ] },
    "gr09.1.3-e5": { en: "It is nice of her to wait.", zh: "她真好，愿意等。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "nice", role: "complem", label: "表语" }, { w: "of her", role: "adverb", label: "状语" }, { w: "to wait", role: "verb", label: "不定式" } ] },
    "gr09.1.3-e6": { en: "It is kind for you to help me.", zh: "（错句）你真好，谢谢你帮我。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "kind", role: "complem", label: "表语" }, { w: "for you", role: "adverb", label: "状语" }, { w: "to help", role: "verb", label: "不定式" }, { w: "me", role: "object", label: "宾语" } ] },
    "gr09.1.3-e7": { en: "Is important to learn English.", zh: "（错句）学好英语很重要。", reg: "通用",
      tagged: [ { w: "Is", role: "verb", label: "系动词" }, { w: "important", role: "complem", label: "表语" }, { w: "to learn", role: "verb", label: "不定式" }, { w: "English", role: "object", label: "宾语" } ] },
    /* ---------- gr09.1.4 不定式作定语与表语 ---------- */
    "gr09.1.4-e1": { en: "This is the best way to learn English.", zh: "这是学英语最好的方法。", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "the best way", role: "complem", label: "表语" }, { w: "to learn", role: "verb", label: "不定式" }, { w: "English", role: "object", label: "宾语" } ] },
    "gr09.1.4-e2": { en: "He is to meet us at ten.", zh: "他定于十点和我们见面。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "to meet", role: "verb", label: "不定式" }, { w: "us", role: "object", label: "宾语" }, { w: "at ten", role: "adverb", label: "状语" } ] },
    "gr09.1.4-e3": { en: "It is time to have lunch.", zh: "该吃午饭了。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "time", role: "complem", label: "表语" }, { w: "to have", role: "verb", label: "不定式" }, { w: "lunch", role: "object", label: "宾语" } ] },
    "gr09.1.4-e4": { en: "I have a lot of work to do.", zh: "我有很多工作要做。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "have", role: "verb", label: "谓语" }, { w: "a lot of work", role: "object", label: "宾语" }, { w: "to do", role: "verb", label: "不定式" } ] },
    "gr09.1.4-e5": { en: "The train is to arrive at six.", zh: "火车定于六点到达。", reg: "通用",
      tagged: [ { w: "The train", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "to arrive", role: "verb", label: "不定式" }, { w: "at six", role: "adverb", label: "状语" } ] },
    "gr09.1.4-e6": { en: "This is the best to learn way.", zh: "（错句）这是学英语最好的方法。", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "the best", role: "complem", label: "表语" }, { w: "to learn", role: "verb", label: "不定式" }, { w: "way", role: "subject", label: "主语" } ] },
    /* ---------- gr09.2.1 动名词作主语与宾语 ---------- */
    "gr09.2.1-e1": { en: "Swimming is fun.", zh: "游泳很有趣。", reg: "通用",
      tagged: [ { w: "Swimming", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "fun", role: "complem", label: "表语" } ] },
    "gr09.2.1-e2": { en: "I enjoy reading stories.", zh: "我喜欢读故事。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "enjoy", role: "verb", label: "谓语" }, { w: "reading", role: "verb", label: "动名词" }, { w: "stories", role: "object", label: "宾语" } ] },
    "gr09.2.1-e3": { en: "He finished doing his homework.", zh: "他做完了作业。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "finished", role: "verb", label: "谓语" }, { w: "doing", role: "verb", label: "动名词" }, { w: "his homework", role: "object", label: "宾语" } ] },
    "gr09.2.1-e4": { en: "Reading is useful.", zh: "阅读很有用。", reg: "通用",
      tagged: [ { w: "Reading", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "useful", role: "complem", label: "表语" } ] },
    "gr09.2.1-e5": { en: "Would you mind opening the door?", zh: "介意开一下门吗？", reg: "口语",
      tagged: [ { w: "Would", role: "verb", label: "情态动词" }, { w: "you", role: "subject", label: "主语" }, { w: "mind", role: "verb", label: "谓语" }, { w: "opening", role: "verb", label: "动名词" }, { w: "the door", role: "object", label: "宾语" } ] },
    "gr09.2.1-e6": { en: "I enjoy to read stories.", zh: "（错句）我喜欢读故事。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "enjoy", role: "verb", label: "谓语" }, { w: "to read", role: "verb", label: "不定式" }, { w: "stories", role: "object", label: "宾语" } ] },
    "gr09.2.1-e7": { en: "Swimming are fun.", zh: "（错句）游泳很有趣。", reg: "通用",
      tagged: [ { w: "Swimming", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "系动词" }, { w: "fun", role: "complem", label: "表语" } ] },
    /* ---------- gr09.2.2 动名词 vs 不定式辨析 ---------- */
    "gr09.2.2-e1": { en: "I forgot to lock the door.", zh: "我忘了锁门。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "forgot", role: "verb", label: "谓语" }, { w: "to lock", role: "verb", label: "不定式" }, { w: "the door", role: "object", label: "宾语" } ] },
    "gr09.2.2-e2": { en: "I forgot locking the door.", zh: "我忘了锁过门。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "forgot", role: "verb", label: "谓语" }, { w: "locking", role: "verb", label: "动名词" }, { w: "the door", role: "object", label: "宾语" } ] },
    "gr09.2.2-e3": { en: "He stopped smoking last year.", zh: "他去年戒烟了。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "stopped", role: "verb", label: "谓语" }, { w: "smoking", role: "verb", label: "动名词" }, { w: "last year", role: "adverb", label: "状语" } ] },
    "gr09.2.2-e4": { en: "Remember to close the window.", zh: "记得去关窗。（还没关）", reg: "通用",
      tagged: [ { w: "Remember", role: "verb", label: "谓语" }, { w: "to close", role: "verb", label: "不定式" }, { w: "the window", role: "object", label: "宾语" } ] },
    "gr09.2.2-e5": { en: "I remember seeing him.", zh: "我记得见过他。（见过了）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "remember", role: "verb", label: "谓语" }, { w: "seeing", role: "verb", label: "动名词" }, { w: "him", role: "object", label: "宾语" } ] },
    "gr09.2.2-e6": { en: "He stopped to smoke.", zh: "（错句，想表“戒烟”）他停下来去抽烟。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "stopped", role: "verb", label: "谓语" }, { w: "to smoke", role: "verb", label: "不定式" } ] },
    "gr09.2.2-e7": { en: "I remember to lock the door.", zh: "（错句，想表“记得锁过”）我记得去锁门。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "remember", role: "verb", label: "谓语" }, { w: "to lock", role: "verb", label: "不定式" }, { w: "the door", role: "object", label: "宾语" } ] },
    /* ---------- gr09.2.3 used to/be used to/get used to 与本章小结 ---------- */
    "gr09.2.3-e1": { en: "He used to smoke.", zh: "他过去常抽烟。（过去常常）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "used to", role: "verb", label: "助动词" }, { w: "smoke", role: "verb", label: "动词原形" } ] },
    "gr09.2.3-e2": { en: "She is used to getting up early.", zh: "她习惯早起。（习惯于）", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is used to", role: "verb", label: "谓语" }, { w: "getting up", role: "verb", label: "动名词" }, { w: "early", role: "adverb", label: "状语" } ] },
    "gr09.2.3-e3": { en: "A knife is used to cut things.", zh: "刀被用来切东西。（被动）", reg: "通用",
      tagged: [ { w: "A knife", role: "subject", label: "主语" }, { w: "is used", role: "verb", label: "谓语" }, { w: "to cut", role: "verb", label: "不定式" }, { w: "things", role: "object", label: "宾语" } ] },
    "gr09.2.3-e4": { en: "They used to live here.", zh: "他们过去常住这儿。（过去常常）", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "used to", role: "verb", label: "助动词" }, { w: "live", role: "verb", label: "动词原形" }, { w: "here", role: "adverb", label: "状语" } ] },
    "gr09.2.3-e5": { en: "I am used to the noise.", zh: "我习惯了噪音。（习惯于）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "am used to", role: "verb", label: "谓语" }, { w: "the noise", role: "object", label: "宾语" } ] },
    "gr09.2.3-e6": { en: "I am used to get up early.", zh: "（错句，想表“习惯”）我习惯早起。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "am used to", role: "verb", label: "谓语" }, { w: "get up", role: "verb", label: "动词原形" }, { w: "early", role: "adverb", label: "状语" } ] }
  },
  units: [
    {
      id: "gr09-u1",
      title: "动词不定式",
      lessons: [
        /* ================= gr09.1.1 不定式作宾语 ================= */
        {
          id: "gr09.1.1",
          title: "不定式作宾语",
          pages: [
            {
              id: "gr09.1.1-p1",
              kind: "observe",
              title: "先看三句话：want 后面能直接跟 go 吗？",
              sentences: [
                { id: "gr09.1.1-e1", en: "I want to be a teacher.", zh: "我想当老师。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "want", role: "verb", label: "谓语" }, { w: "to be", role: "verb", label: "不定式" }, { w: "a teacher", role: "complem", label: "表语" } ] },
                { id: "gr09.1.1-e2", en: "She decided to stay at home.", zh: "她决定待在家里。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "decided", role: "verb", label: "谓语" }, { w: "to stay", role: "verb", label: "不定式" }, { w: "at home", role: "adverb", label: "状语" } ] },
                { id: "gr09.1.1-e3", en: "I don't know what to do.", zh: "我不知道做什么。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't", role: "verb", label: "助动词" }, { w: "know", role: "verb", label: "谓语" }, { w: "what to do", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "want 后面直接跟动词原形行吗（I want go）？",
                options: ["行", "不行：第二个动词要“变形”成 to do", "都行"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "一个句子只能有一个谓语——want 后面的动词要“变形”：穿上 to，变成不定式。"
            },
            {
              id: "gr09.1.1-p2",
              kind: "interact",
              title: "拼一句“我想当老师”",
              exploreTip: "拼一句“我想当老师”：go 直接放进宾语槽会怎样？",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVO",
                    blocks: [
                      { w: "I", role: "subject" },
                      { w: "want", role: "verb" },
                      { w: "to be a teacher", role: "object" },
                      { w: "go", role: "verb" }
                    ],
                    hint: "把积木放进对的槽：go 这块积木有槽可放吗？（想想：一个句子能有几个谓语？）",
                    doneNote: "拼出来了！go 没有槽——一个句子只能有一个谓语，第二个动词必须“变形”成 to do。"
                  }
                }
              ],
              point: "want 后面不能再跟谓语——第二个动词必须“变形”成 to do。"
            },
            {
              id: "gr09.1.1-p3",
              kind: "explain",
              title: "不定式作宾语：want to do",
              lead: "还记得吗？go 想挤进宾语槽，被“双谓语警报”拦下了。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr09.1.1-e1", "gr09.1.1-e2", "gr09.1.1-e3"],
                  note: "看三句话：want / decide / know 后面跟的都是什么？"
                },
                {
                  type: "idcard",
                  rule: "want / hope / decide / plan / learn + to do；疑问词 + to do（what to do）。",
                  condition: "只在“第二个动词”位置成立；to 后跟动词原形；hope 还可跟 that 从句，want 不行。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“我想去”，“想”“去”两个动词连用，没问题。",
                  en: "英语一个句子只能有一个“老大”（谓语）：want 当了谓语，go 就不能再当——它要“变形”，穿上 to 变成不定式，才能待在宾语的位置上。",
                  unbridge: "别把汉语“动词连用”搬过来——英语里第二个动词不变形，句子就不成立。"
                },
                {
                  type: "spell",
                  title: "愿望动词表 + 疑问词 to do：",
                  items: [
                    "愿望三兄弟：want / hope / decide + to do（想 / 希望 / 决定）",
                    "plan / learn / agree + to do（计划 / 学会 / 同意）",
                    "疑问词 + to do：what to do / how to do / where to go"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I want go there.",
                  wrongZh: "（✗ 错句）",
                  right: "I want to go there.",
                  why: "go 是第二个动词，必须变形——want 后面跟 to go，to 是“变形通知书”。"
                },
                {
                  type: "contrast",
                  wrong: "She decided stay at home.",
                  wrongZh: "（✗ 错句）",
                  right: "She decided to stay at home.",
                  why: "decide 后面漏了 to——decide 是 to do 俱乐部的。"
                }
              ],
              point: "这就是不定式作宾语：want to do；一个谓语，第二个变形。",
              pointScroll: true
            },
            {
              id: "gr09.1.1-p4",
              kind: "quiz",
              title: "练一练：to 在吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I want go there.", "I want to go there.", "I want going there."],
                  answer: 1,
                  tip: "want + to do。"
                },
                {
                  type: "choice",
                  stem: "“她决定待在家里”：",
                  options: ["She decided stay at home.", "She decided to stay at home.", "She decided staying at home."],
                  answer: 1,
                  tip: "decide + to do。"
                },
                {
                  type: "fill",
                  stemBefore: "They plan",
                  stemAfter: "abroad next year.（去）",
                  answer: "to go",
                  accept: ["to go"],
                  tip: "plan + to do。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“I want go.”应改为：",
                  options: ["I want to go.", "I want going.", "I wanting to go."],
                  answer: 0,
                  tip: "第二个动词要变形：to go。"
                }
              ],
              point: "自查：want / decide 后面，to 在吗？一个句子几个谓语？"
            }
          ]
        },
        /* ================= gr09.1.2 不定式作目的与结果状语 ================= */
        {
          id: "gr09.1.2",
          title: "不定式作目的与结果状语",
          pages: [
            {
              id: "gr09.1.2-p1",
              kind: "observe",
              title: "先看三句话：to do 回答什么问题？",
              sentences: [
                { id: "gr09.1.2-e1", en: "He got up early to catch the bus.", zh: "他早起是为了赶公交车。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "got up", role: "verb", label: "谓语" }, { w: "early", role: "adverb", label: "状语" }, { w: "to catch", role: "verb", label: "不定式" }, { w: "the bus", role: "object", label: "宾语" } ] },
                { id: "gr09.1.2-e2", en: "She is old enough to go to school.", zh: "她够大，可以上学了。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "old enough", role: "complem", label: "表语" }, { w: "to go", role: "verb", label: "不定式" }, { w: "to school", role: "adverb", label: "状语" } ] },
                { id: "gr09.1.2-e3", en: "He is too young to join the army.", zh: "他太小，不能参军。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "too young", role: "complem", label: "表语" }, { w: "to join", role: "verb", label: "不定式" }, { w: "the army", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "to catch the bus 在句中回答什么问题？",
                options: ["谁", "为什么（目的）", "什么时候"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "to do 作状语，回答“为什么”——表目的；too…to 表“太…而不能”。"
            },
            {
              id: "gr09.1.2-p2",
              kind: "interact",
              title: "标出 to do：目的还是结果？",
              exploreTip: "标出 to do 短语：它是“目的”还是“结果”？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "got up", role: "verb", label: "谓语" },
                      { w: "early", role: "adverb", label: "状语" },
                      { w: "to catch", role: "verb", label: "不定式" },
                      { w: "the bus", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" },
                      { role: "verb", label: "不定式" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "to catch the bus 回答“为什么起早”？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "is", role: "verb", label: "系动词" },
                      { w: "too young", role: "complem", label: "表语" },
                      { w: "to join", role: "verb", label: "不定式" },
                      { w: "the army", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "系动词" },
                      { role: "complem", label: "表语" },
                      { role: "verb", label: "不定式" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "too…to 是“太…而能”还是“太…而不能”？"
                  }
                }
              ],
              point: "to do 表目的（为什么）；too…to = 太…而不能；enough to = 够…而能。"
            },
            {
              id: "gr09.1.2-p3",
              kind: "explain",
              title: "不定式作状语：to do 表目的",
              lead: "还记得吗？上一页 to catch the bus 回答“为什么”，too young to join 是“太小而不能”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr09.1.2-e1", "gr09.1.2-e2", "gr09.1.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，to do 各表目的还是结果？"
                },
                {
                  type: "idcard",
                  rule: "to do 作目的状语（为什么）；too…to…（太…而不能）；enough to…（够…而能）；in order to（为了，更正式）。",
                  condition: "too…to 固定表否定结果（too old to go = 太老而不能去）；enough 表肯定（old enough to go）；in order to 后只跟原形。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“为了赶车”“太小不能去”，“为了 / 太…不能”一摆就行。",
                  en: "英语用 to do 表“为了”：to 是“目的标记”；too…to 是固定搭配，“太…而不能”——too 和 to 携手表否定。",
                  unbridge: "别把 too…to 理解成“太…而能”——它永远是“太…而不能”。"
                },
                {
                  type: "spell",
                  title: "in order to + too / enough 站位：",
                  items: [
                    "in order to + 原形（= to，为了，更正式）",
                    "too + 形容词 + to do（太…而不能）",
                    "形容词 + enough + to do（够…而能；enough 站形容词后面！）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "He got up early for catch the bus.",
                  wrongZh: "（✗ 错句）",
                  right: "He got up early to catch the bus.",
                  why: "“为了”用 to do，不用 for + 原形——to 是目的标记。"
                },
                {
                  type: "contrast",
                  wrong: "He got up early to catching the bus.",
                  wrongZh: "（✗ 错句）",
                  right: "He got up early to catch the bus.",
                  why: "to 后面是动词原形 catch，不是 catching。"
                }
              ],
              point: "这就是不定式作状语：to do 表目的；too…to 太…而不能。",
              pointScroll: true
            },
            {
              id: "gr09.1.2-p4",
              kind: "quiz",
              title: "练一练：目的还是结果？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["He got up early for catch the bus.", "He got up early to catch the bus.", "He got up early to catching the bus."],
                  answer: 1,
                  tip: "表目的用 to do。"
                },
                {
                  type: "choice",
                  stem: "“他太小，不能参军”：",
                  options: ["He is too young to join the army.", "He is too young and he can join the army.", "He is so young to join the army."],
                  answer: 0,
                  tip: "too…to = 太…而不能。"
                },
                {
                  type: "fill",
                  stemBefore: "She is old",
                  stemAfter: "to go to school.（足够）",
                  answer: "enough",
                  accept: ["enough"],
                  tip: "old enough to：enough 站形容词后面。"
                },
                {
                  type: "choice",
                  stem: "in order to 后面跟：",
                  options: ["动词原形", "动词 -ing", "过去分词"],
                  answer: 0,
                  tip: "in order to + 原形。"
                }
              ],
              point: "自查：表目的 → to do；too…to 否定；enough 站形容词后。"
            }
          ]
        },
        /* ================= gr09.1.3 不定式的逻辑主语与 it 句型 ================= */
        {
          id: "gr09.1.3",
          title: "不定式的逻辑主语与 it 句型",
          pages: [
            {
              id: "gr09.1.3-p1",
              kind: "observe",
              title: "先看三句话：it 是真主语吗？",
              sentences: [
                { id: "gr09.1.3-e1", en: "It is important for us to learn English.", zh: "学好英语对我们很重要。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "important", role: "complem", label: "表语" }, { w: "for us", role: "adverb", label: "状语" }, { w: "to learn", role: "verb", label: "不定式" }, { w: "English", role: "object", label: "宾语" } ] },
                { id: "gr09.1.3-e2", en: "It is kind of you to help me.", zh: "你真好，谢谢你帮我。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "kind", role: "complem", label: "表语" }, { w: "of you", role: "adverb", label: "状语" }, { w: "to help", role: "verb", label: "不定式" }, { w: "me", role: "object", label: "宾语" } ] },
                { id: "gr09.1.3-e3", en: "It is time to go home.", zh: "该回家了。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "time", role: "complem", label: "表语" }, { w: "to go", role: "verb", label: "不定式" }, { w: "home", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "It is important to learn English 里，真正的主语是谁？",
                options: ["It", "to learn English（it 只是替身）", "important"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "it 是“替身主语”：真正的主语 to learn English 太长，it 先顶班。"
            },
            {
              id: "gr09.1.3-p2",
              kind: "interact",
              title: "标出 it 和 for / of 短语",
              exploreTip: "标出 it 和 for / of 短语：it 是替身，for / of 后面站的是谁？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "It", role: "subject", label: "形式主语" },
                      { w: "is", role: "verb", label: "系动词" },
                      { w: "important", role: "complem", label: "表语" },
                      { w: "for us", role: "adverb", label: "状语" },
                      { w: "to learn", role: "verb", label: "不定式" },
                      { w: "English", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "形式主语" },
                      { role: "verb", label: "系动词" },
                      { role: "complem", label: "表语" },
                      { role: "adverb", label: "状语" },
                      { role: "verb", label: "不定式" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "it 是真主语还是替身？for us 是谁的？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "It", role: "subject", label: "形式主语" },
                      { w: "is", role: "verb", label: "系动词" },
                      { w: "kind", role: "complem", label: "表语" },
                      { w: "of you", role: "adverb", label: "状语" },
                      { w: "to help", role: "verb", label: "不定式" },
                      { w: "me", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "形式主语" },
                      { role: "verb", label: "系动词" },
                      { role: "complem", label: "表语" },
                      { role: "adverb", label: "状语" },
                      { role: "verb", label: "不定式" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "of you 和 for us 有什么不同？"
                  }
                }
              ],
              point: "it 形式主语顶班；for sb 表“对…来说”，of sb 表“…真（kind）”。"
            },
            {
              id: "gr09.1.3-p3",
              kind: "explain",
              title: "it 句型：it 顶班，to do 是真主语",
              lead: "还记得吗？上一页 it 只是替身，for us 和 of you 站的是动作的“主人”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr09.1.3-e1", "gr09.1.3-e2", "gr09.1.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，it 后面都站着什么？"
                },
                {
                  type: "idcard",
                  rule: "It is + 形容词 + (for sb) to do；for sb 表“对…来说”（important / difficult）；of sb 表“某人…（kind / nice / clever）”。",
                  condition: "it 是形式主语，真正主语是 to do；for / of 后的人是 to do 的逻辑主语；of 只与表人的品德形容词连用（kind / nice）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“学好英语很重要”，主语就是“学好英语”，不用替身。",
                  en: "英语嫌真正主语太长，派 it 先顶班：It is important…to learn English——it 是“占位符”，to do 才是真主语。",
                  unbridge: "别漏 for sb——“It's important to learn English”没说对谁重要，逻辑主语不明。"
                },
                {
                  type: "spell",
                  title: "for sb 家族 vs of sb 家族：",
                  items: [
                    "for sb 家族：important / difficult / easy / necessary + for sb",
                    "of sb 家族：kind / nice / clever / polite + of sb（表品德）",
                    "It's time to do（该…了）/ It's time for + 名词"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "It is kind for you to help me.",
                  wrongZh: "（✗ 错句）",
                  right: "It is kind of you to help me.",
                  why: "kind / nice 表品德，用 of sb——“你真好”，不是“对你好”。"
                },
                {
                  type: "contrast",
                  wrong: "Is important to learn English.",
                  wrongZh: "（✗ 错句）",
                  right: "It is important to learn English.",
                  why: "it 不能省——英语句子不能没有主语，it 是顶班的。"
                }
              ],
              point: "这就是 it 句型：it 顶班，to do 是真主语；for 表“对…来说”，of 表品德。",
              pointScroll: true
            },
            {
              id: "gr09.1.3-p4",
              kind: "quiz",
              title: "练一练：it 顶班了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Is important to learn English.", "It is important to learn English.", "Important to learn English."],
                  answer: 1,
                  tip: "it 形式主语不能省。"
                },
                {
                  type: "choice",
                  stem: "“你真好，谢谢你帮我”：",
                  options: ["It's kind for you to help me.", "It's kind of you to help me.", "It's kind of you helping me."],
                  answer: 1,
                  tip: "表品德用 of sb；help 用 to help。"
                },
                {
                  type: "fill",
                  stemBefore: "It's difficult",
                  stemAfter: "me to finish.（对我来说）",
                  answer: "for",
                  accept: ["for"],
                  tip: "“对…来说”用 for sb。"
                },
                {
                  type: "choice",
                  stem: "It's time ___ home.（该回家了）",
                  options: ["to go", "to going", "go"],
                  answer: 0,
                  tip: "It's time to do。"
                }
              ],
              point: "自查：it 顶班了吗？for / of 用对了吗？to do 是真主语。"
            }
          ]
        },
        /* ================= gr09.1.4 不定式作定语与表语 ================= */
        {
          id: "gr09.1.4",
          title: "不定式作定语与表语",
          pages: [
            {
              id: "gr09.1.4-p1",
              kind: "observe",
              title: "先看三句话：to do 站在谁后面？",
              sentences: [
                { id: "gr09.1.4-e1", en: "This is the best way to learn English.", zh: "这是学英语最好的方法。", reg: "通用",
                  tagged: [ { w: "This", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "the best way", role: "complem", label: "表语" }, { w: "to learn", role: "verb", label: "不定式" }, { w: "English", role: "object", label: "宾语" } ] },
                { id: "gr09.1.4-e2", en: "He is to meet us at ten.", zh: "他定于十点和我们见面。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "to meet", role: "verb", label: "不定式" }, { w: "us", role: "object", label: "宾语" }, { w: "at ten", role: "adverb", label: "状语" } ] },
                { id: "gr09.1.4-e3", en: "It is time to have lunch.", zh: "该吃午饭了。", reg: "通用",
                  tagged: [ { w: "It", role: "subject", label: "形式主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "time", role: "complem", label: "表语" }, { w: "to have", role: "verb", label: "不定式" }, { w: "lunch", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "the best way to learn 里，to learn 修饰谁？",
                options: ["way（方法）", "best", "learn 自己"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "to do 作定语，站在名词后面：the way to do（…的方法）。"
            },
            {
              id: "gr09.1.4-p2",
              kind: "interact",
              title: "标出：to do 站在谁后面？",
              exploreTip: "标一标：to learn 修饰谁？站在名词前还是后？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "This", role: "subject", label: "主语" },
                      { w: "is", role: "link", label: "系动词" },
                      { w: "the best way", role: "complem", label: "表语" },
                      { w: "to learn", role: "inf", label: "不定式定语" },
                      { w: "English", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "link", label: "系动词" },
                      { role: "complem", label: "表语" },
                      { role: "inf", label: "不定式定语" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "to learn 站在名词 way 后面——不定式定语后置，这是英语的规矩。"
                  }
                }
              ],
              point: "这就是不定式定语：后置（the way to do）；be to do 表计划。"
            },
            {
              id: "gr09.1.4-p3",
              kind: "explain",
              title: "不定式作定语与表语：后置 + be to do",
              lead: "还记得吗？上一页 to learn 站在 way 后面当定语——位置站对了。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr09.1.4-e1", "gr09.1.4-e2", "gr09.1.4-e3"],
                  note: "身份证已经亮出来了——看这三句话，to do 各站在哪个名词 / 系动词后面？"
                },
                {
                  type: "idcard",
                  rule: "to do 作定语（the way to do）；be to do 表计划 / 安排；It's time to do（该…了）。",
                  condition: "不定式定语后置（the way to do，不说 to do way）；be to do 表“按计划”，不是“将要”的唯一说法。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“学英语的方法”，“学英语”站在“方法”前面。",
                  en: "英语定语后置：the way to learn English——to do 站在名词后面，这是英语的规矩。",
                  unbridge: "别把汉语“前置”搬过来——“to learn way”在英语里不存在。"
                },
                {
                  type: "contrast",
                  wrong: "This is the best to learn way.",
                  wrongZh: "（✗ 错句）",
                  right: "This is the best way to learn English.",
                  why: "不定式定语后置——to learn 站在 way 后面，不是前面。"
                }
              ],
              point: "这就是不定式作定语 / 表语：后置；be to do 表计划。自查：to do 站对位置了吗（名词后）？",
              pointScroll: true
            },
            {
              id: "gr09.1.4-p4",
              kind: "quiz",
              title: "练一练：to do 站对位置了吗？",
              questions: [
                { type: "choice", stem: "下面哪句对？", options: ["This is the best to learn way.", "This is the best way to learn English.", "This is the best way learning English."], answer: 1, tip: "不定式定语后置：to learn 站 way 后面，不是前面。" },
                { type: "choice", stem: "“He is to meet us at ten.”表什么？", options: ["过去", "按计划（定于十点见面）", "不可能"], answer: 1, tip: "be to do 表计划/安排：He is to meet us = 他定于和我们见面。" },
                { type: "fill", stemBefore: "It is time", stemAfter: "have lunch.（“该…了”）", answer: "to", accept: ["to"], tip: "It's time to do：该…了——to do 站 time 后面。" },
                { type: "choice", stem: "“the way to do”里 to do 修饰谁？", options: ["way（方法）", "the", "do 自己"], answer: 0, tip: "to do 作定语，修饰前面的名词 way：…的方法。" }
              ],
              point: "自查：to do 站对位置了吗（名词后）？"
            }
          ]
        }
      ]
    },
    /* ================= 单元 gr09-u2：动名词 ================= */
    {
      id: "gr09-u2",
      title: "动名词",
      lessons: [
        /* ================= gr09.2.1 动名词作主语与宾语 ================= */
        {
          id: "gr09.2.1",
          title: "动名词作主语与宾语",
          pages: [
            {
              id: "gr09.2.1-p1",
              kind: "observe",
              title: "先看三句话：Swimming 在句中当什么？",
              sentences: [
                { id: "gr09.2.1-e1", en: "Swimming is fun.", zh: "游泳很有趣。", reg: "通用",
                  tagged: [ { w: "Swimming", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "fun", role: "complem", label: "表语" } ] },
                { id: "gr09.2.1-e2", en: "I enjoy reading stories.", zh: "我喜欢读故事。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "enjoy", role: "verb", label: "谓语" }, { w: "reading", role: "verb", label: "动名词" }, { w: "stories", role: "object", label: "宾语" } ] },
                { id: "gr09.2.1-e3", en: "He finished doing his homework.", zh: "他做完了作业。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "finished", role: "verb", label: "谓语" }, { w: "doing", role: "verb", label: "动名词" }, { w: "his homework", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "Swimming 在句中当什么？",
                options: ["谓语", "主语（动名词当名词用）", "状语"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "doing 也能当主语：Swimming is fun——动词穿上 -ing，就能当名词使。"
            },
            {
              id: "gr09.2.1-p2",
              kind: "interact",
              title: "拼一句“游泳很有趣”",
              exploreTip: "拼一句“游泳很有趣”：swim 直接进主语槽会怎样？",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVP",
                    blocks: [
                      { w: "Swimming", role: "subject" },
                      { w: "is", role: "verb" },
                      { w: "fun", role: "complem" },
                      { w: "swim", role: "verb" }
                    ],
                    hint: "把积木放进对的槽：swim 这块积木能放进主语槽吗？（想想：动词原形能当主语吗？）",
                    doneNote: "拼出来了！swim 没有槽——动词原形不能当主语，要变成 Swimming 才能进主语槽。"
                  }
                }
              ],
              point: "doing 当主语：Swimming is fun；动词原形进不了主语槽。"
            },
            {
              id: "gr09.2.1-p3",
              kind: "explain",
              title: "动名词：doing 作主语 / 宾语",
              lead: "还记得吗？上一页 swim 进不了主语槽，变成 Swimming 才行。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr09.2.1-e1", "gr09.2.1-e2", "gr09.2.1-e3"],
                  note: "身份证已经亮出来了——看这三句话，doing 各当什么成分？"
                },
                {
                  type: "idcard",
                  rule: "动名词（doing）可作主语、宾语；enjoy / finish / mind / keep / practice + doing（只跟 doing，不跟 to do）。",
                  condition: "动名词作主语，谓语用单数（Swimming is…）；enjoy 后无 to do（enjoy 是 doing 俱乐部会员）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“游泳很有趣”“喜欢读书”，“游泳 / 读书”既是动作又是主角。",
                  en: "英语动词想当主角，要先“变形”：穿上 -ing 变成动名词——Swimming 既是“游”这个动作，又能当主语。",
                  unbridge: "别让动词原形直接当主语——“Swim is fun”在英语里不成立。"
                },
                {
                  type: "spell",
                  title: "doing 俱乐部 + 谓语单数：",
                  items: [
                    "doing 俱乐部：enjoy / finish / mind / keep / practice + doing",
                    "动名词作主语，谓语单数：Swimming is fun.（不是 are）",
                    "-ing 构成：swim → swimming（双写）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I enjoy to read stories.",
                  wrongZh: "（✗ 错句）",
                  right: "I enjoy reading stories.",
                  why: "enjoy 后面只跟 doing，没有 to do——enjoy 是 doing 俱乐部的。"
                },
                {
                  type: "contrast",
                  wrong: "Swimming are fun.",
                  wrongZh: "（✗ 错句）",
                  right: "Swimming is fun.",
                  why: "动名词作主语，谓语用单数 is。"
                }
              ],
              point: "这就是动名词：doing 作主语 / 宾语；enjoy 只跟 doing。",
              pointScroll: true
            },
            {
              id: "gr09.2.1-p4",
              kind: "quiz",
              title: "练一练：doing 当主角",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Swim is fun.", "Swimming is fun.", "To swim are fun."],
                  answer: 1,
                  tip: "动词当主语要变成 doing；谓语用单数。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I enjoy to read stories.", "I enjoy reading stories.", "I enjoy read stories."],
                  answer: 1,
                  tip: "enjoy + doing。"
                },
                {
                  type: "fill",
                  stemBefore: "He finished",
                  stemAfter: "his homework.（做）",
                  answer: "doing",
                  accept: ["doing"],
                  tip: "finish + doing。"
                },
                {
                  type: "choice",
                  stem: "“介意开窗吗”（mind）：",
                  options: ["Do you mind open the window?", "Do you mind opening the window?", "Do you mind to open the window?"],
                  answer: 1,
                  tip: "mind + doing。"
                }
              ],
              point: "自查：doing 当主语谓语单数；enjoy / finish / mind 后只跟 doing。"
            }
          ]
        },
        /* ================= gr09.2.2 动名词 vs 不定式辨析 ================= */
        {
          id: "gr09.2.2",
          title: "动名词 vs 不定式辨析",
          pages: [
            {
              id: "gr09.2.2-p1",
              kind: "observe",
              title: "先看三句话：“没锁”和“锁了却忘了”",
              sentences: [
                { id: "gr09.2.2-e1", en: "I forgot to lock the door.", zh: "我忘了锁门。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "forgot", role: "verb", label: "谓语" }, { w: "to lock", role: "verb", label: "不定式" }, { w: "the door", role: "object", label: "宾语" } ] },
                { id: "gr09.2.2-e2", en: "I forgot locking the door.", zh: "我忘了锁过门。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "forgot", role: "verb", label: "谓语" }, { w: "locking", role: "verb", label: "动名词" }, { w: "the door", role: "object", label: "宾语" } ] },
                { id: "gr09.2.2-e3", en: "He stopped smoking last year.", zh: "他去年戒烟了。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "stopped", role: "verb", label: "谓语" }, { w: "smoking", role: "verb", label: "动名词" }, { w: "last year", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "两句 forgot，一个“没锁”一个“锁了”——区别在哪？",
                options: ["没区别", "to do = 没做，doing = 做了但忘了", "时态不同"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "forget to do（没做）vs forget doing（做了但忘了）——to do 朝前看，doing 朝后看。"
            },
            {
              id: "gr09.2.2-p2",
              kind: "interact",
              title: "对拍：to do 朝前看，doing 朝后看",
              exploreTip: "标出 to lock 和 locking：一个“没锁”，一个“锁了却忘了”。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "forgot", role: "verb", label: "谓语" },
                      { w: "to lock", role: "verb", label: "不定式" },
                      { w: "the door", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "verb", label: "不定式" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "门锁了吗？（to do 朝前看：还没做）"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "forgot", role: "verb", label: "谓语" },
                      { w: "locking", role: "verb", label: "动名词" },
                      { w: "the door", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "verb", label: "动名词" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "门锁了吗？（doing 朝后看：做了，但忘了）"
                  }
                }
              ],
              point: "stop to do（停下来去做）vs stop doing（不做了）；remember / forget 同理。"
            },
            {
              id: "gr09.2.2-p3",
              kind: "explain",
              title: "to do vs doing：朝前看 vs 朝后看",
              lead: "还记得吗？上一页 to lock 是“没锁”，locking 是“锁了却忘了”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr09.2.2-e1", "gr09.2.2-e2", "gr09.2.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，to do 和 doing 的时间朝向有什么不同？"
                },
                {
                  type: "idcard",
                  rule: "forget / remember + to do（没做，朝前看）；+ doing（做了，朝后看）；stop to do（停下来去做别的事）；stop doing（停止做）。",
                  condition: "like to do / like doing 差别细微（to do 偏“选择”，doing 偏“习惯”），中考不深究；stop / remember / forget 的辨析是中考高频，意义大不同。"
                },
                {
                  type: "bridge",
                  zh: "汉语“忘了锁门”有歧义：没锁，还是锁了忘了？靠语境猜。",
                  en: "英语用形态消歧：to do 朝前看（还没做），doing 朝后看（做了）——形态把歧义掰开了。",
                  unbridge: "别混用无差别——to do 和 doing 在这儿是反义词，混了意思全反。"
                },
                {
                  type: "spell",
                  title: "朝向口诀：",
                  items: [
                    "朝前看（没做）：forget to do / remember to do（记得去做）",
                    "朝后看（做了）：forget doing / remember doing（记得做过）",
                    "stop to do（停下，去做）vs stop doing（停止，不做了）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "He stopped to smoke.",
                  wrongZh: "（✗ 错句，想表“戒烟”）",
                  right: "He stopped smoking.",
                  why: "“戒烟”是 stop doing（不做了）；stop to do 是“停下来去抽烟”——意思全反。"
                },
                {
                  type: "contrast",
                  wrong: "I remember to lock the door.",
                  wrongZh: "（✗ 错句，想表“记得锁过”）",
                  right: "I remember locking the door.",
                  why: "“记得锁过”（做过）用 doing；to do 是“记得去锁”（还没锁）。"
                }
              ],
              point: "这就是 to do vs doing：朝前看（没做）vs 朝后看（做了）。",
              pointScroll: true
            },
            {
              id: "gr09.2.2-p4",
              kind: "quiz",
              title: "练一练：朝前看还是朝后看？",
              questions: [
                {
                  type: "choice",
                  stem: "“我忘了锁门”（没锁）：",
                  options: ["I forgot to lock the door.", "I forgot locking the door.", "I forget locked the door."],
                  answer: 0,
                  tip: "没做 → to do。"
                },
                {
                  type: "choice",
                  stem: "“他去年戒烟了”：",
                  options: ["He stopped to smoke last year.", "He stopped smoking last year.", "He stopped smoked last year."],
                  answer: 1,
                  tip: "不做了 → stop doing。"
                },
                {
                  type: "choice",
                  stem: "remember doing 的意思是：",
                  options: ["记得去做（还没做）", "记得做过（已经做了）", "忘记做"],
                  answer: 1,
                  tip: "doing 朝后看：做过了。"
                },
                {
                  type: "fill",
                  stemBefore: "Stop",
                  stemAfter: "!（别吵了）",
                  answer: "talking",
                  accept: ["talking"],
                  tip: "停止做 → stop doing。"
                }
              ],
              point: "自查：朝前看 to do（没做），朝后看 doing（做了）。"
            }
          ]
        },
        /* ================= gr09.2.3 used to/be used to/get used to 与本章小结 ================= */
        {
          id: "gr09.2.3",
          title: "used to/be used to/get used to 与本章小结",
          pages: [
            {
              id: "gr09.2.3-p1",
              kind: "explain",
              title: "used to 三兄弟身份证",
              lead: "三兄弟重逢：used to do（过去常常），be used to doing（习惯于），be used to do（被用来做）。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr09.2.3-e1", "gr09.2.3-e2", "gr09.2.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，三个 used to 长得一样吗？"
                },
                {
                  type: "idcard",
                  rule: "used to do（过去常常）；be used to doing（习惯于）；be used to do（被用来做…，被动）。",
                  condition: "used to 只讲过去；be used to doing 的 be 随人称时态变；be used to do 是被动（is used to do = 被用来做）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“过去常”“习惯”“被用来”是三个词，不会混。",
                  en: "英语三兄弟长得像：认准 to 后面跟什么——原形（过去常常）/ doing（习惯于）/ do 被动（被用来）——to 后面是身份证。",
                  unbridge: "别看 used to 就填“过去常常”——先看 to 后面跟的是什么。"
                },
                {
                  type: "spell",
                  title: "三兄弟站位：",
                  items: [
                    "used to do：to + 原形（过去常常）",
                    "be used to doing：to 是介词 + doing（习惯于）",
                    "be used to do：被动（被用来做）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I am used to get up early.",
                  wrongZh: "（✗ 错句，想表“习惯”）",
                  right: "I am used to getting up early.",
                  why: "“习惯于”是 be used to doing——to 后面是 doing，不是原形。"
                }
              ],
              point: "三兄弟身份证：to 后原形（过去）/ doing（习惯）/ 被动（被用来）。",
              pointScroll: true
            },
            {
              id: "gr09.2.3-p2",
              kind: "quiz",
              title: "本章综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "“他过去常抽烟”：",
                  options: ["He used to smoke.", "He is used to smoking.", "He used to smoking."],
                  answer: 0,
                  tip: "过去常常 → used to do。"
                },
                {
                  type: "choice",
                  stem: "“她习惯早起”：",
                  options: ["She used to get up early.", "She is used to getting up early.", "She is used to get up early."],
                  answer: 1,
                  tip: "习惯于 → be used to doing。"
                },
                {
                  type: "choice",
                  stem: "“刀被用来切东西”：",
                  options: ["A knife is used to cut things.", "A knife is used to cutting things.", "A knife used to cut things."],
                  answer: 0,
                  tip: "被用来做 → be used to do（被动）。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“I am used to get up early.”（想表习惯）应改为：",
                  options: ["I am used to getting up early.", "I used to get up early.", "I am used to got up early."],
                  answer: 0,
                  tip: "习惯 → doing。"
                }
              ],
              point: "三兄弟自查：to 后面是什么？原形 / doing / 被动？"
            }
          ]
        }
      ]
    }
  ]
};
