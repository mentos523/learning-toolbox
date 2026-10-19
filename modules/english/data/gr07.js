/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr07：被动语态
 *
 * 数据口径（M5）：window.ENG_CH["gr07"] = { id, title, units[] }，
 * 与 gr05.js 同构；例句 id 规则见 docs/english-grammar-review-ledger.md。
 *
 * 单元 gr07-u1：被动语态（gr07.1.1–gr07.1.5）
 *
 * 撰写：语法生产B队（2026-10-14）；例句状态 drafted，待 D3 三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr07"] = {
  id: "gr07",
  title: "被动语态",
  sentences: {
    /* ---------- gr07.1.1 被动语态构成 ---------- */
    "gr07.1.1-e1": { en: "The window was broken by Tom.", zh: "窗户被汤姆打破了。", reg: "通用",
      tagged: [ { w: "The window", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "broken", role: "verb", label: "过去分词" }, { w: "by Tom", role: "adverb", label: "状语" } ] },
    "gr07.1.1-e2": { en: "English is spoken in many countries.", zh: "许多国家都讲英语。", reg: "通用",
      tagged: [ { w: "English", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "spoken", role: "verb", label: "过去分词" }, { w: "in many countries", role: "adverb", label: "状语" } ] },
    "gr07.1.1-e3": { en: "The bridge will be finished soon.", zh: "这座桥很快就要建成了。", reg: "通用",
      tagged: [ { w: "The bridge", role: "subject", label: "主语" }, { w: "will be", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "soon", role: "adverb", label: "状语" } ] },
    "gr07.1.1-e4": { en: "The room is cleaned every day.", zh: "这个房间每天都打扫。", reg: "通用",
      tagged: [ { w: "The room", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "cleaned", role: "verb", label: "过去分词" }, { w: "every day", role: "adverb", label: "状语" } ] },
    "gr07.1.1-e5": { en: "He was born in 2010.", zh: "他出生于 2010 年。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "born", role: "verb", label: "过去分词" }, { w: "in 2010", role: "adverb", label: "状语" } ] },
    "gr07.1.1-e6": { en: "The window broken by Tom.", zh: "（错句）窗户被汤姆打破了。", reg: "通用",
      tagged: [ { w: "The window", role: "subject", label: "主语" }, { w: "broken", role: "verb", label: "过去分词" }, { w: "by Tom", role: "adverb", label: "状语" } ] },
    "gr07.1.1-e7": { en: "The window was break by Tom.", zh: "（错句）窗户被汤姆打破了。", reg: "通用",
      tagged: [ { w: "The window", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "break", role: "verb", label: "动词原形" }, { w: "by Tom", role: "adverb", label: "状语" } ] },
    /* ---------- gr07.1.2 主动改被动 ---------- */
    "gr07.1.2-e1": { en: "He was made to work ten hours a day.", zh: "他被迫每天工作十小时。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "made", role: "verb", label: "过去分词" }, { w: "to work", role: "verb", label: "不定式" }, { w: "ten hours a day", role: "adverb", label: "状语" } ] },
    "gr07.1.2-e2": { en: "I was given a gift by my friend.", zh: "朋友送了我一件礼物。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "given", role: "verb", label: "过去分词" }, { w: "a gift", role: "object", label: "宾语" }, { w: "by my friend", role: "adverb", label: "状语" } ] },
    "gr07.1.2-e3": { en: "The song is sung by the kids.", zh: "这首歌是孩子们唱的。", reg: "通用",
      tagged: [ { w: "The song", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "sung", role: "verb", label: "过去分词" }, { w: "by the kids", role: "adverb", label: "状语" } ] },
    "gr07.1.2-e4": { en: "She was told the news.", zh: "她被告知了这个消息。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "told", role: "verb", label: "过去分词" }, { w: "the news", role: "object", label: "宾语" } ] },
    "gr07.1.2-e5": { en: "We were asked to wait.", zh: "我们被要求等一等。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "were", role: "verb", label: "助动词" }, { w: "asked", role: "verb", label: "过去分词" }, { w: "to wait", role: "verb", label: "不定式" } ] },
    "gr07.1.2-e6": { en: "He was made work ten hours.", zh: "（错句）他被迫每天工作十小时。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "made", role: "verb", label: "过去分词" }, { w: "work", role: "verb", label: "动词原形" }, { w: "ten hours", role: "adverb", label: "状语" } ] },
    "gr07.1.2-e7": { en: "Tom was broken the window.", zh: "（错句）窗户被汤姆打破了。", reg: "通用",
      tagged: [ { w: "Tom", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "broken", role: "verb", label: "过去分词" }, { w: "the window", role: "object", label: "宾语" } ] },
    /* ---------- gr07.1.3 含情态与完成时的被动 ---------- */
    "gr07.1.3-e1": { en: "This book can be read online.", zh: "这本书可以在网上读。", reg: "通用",
      tagged: [ { w: "This book", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "read", role: "verb", label: "过去分词" }, { w: "online", role: "adverb", label: "状语" } ] },
    "gr07.1.3-e2": { en: "The work has been finished.", zh: "工作已经完成了。", reg: "通用",
      tagged: [ { w: "The work", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "been", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" } ] },
    "gr07.1.3-e3": { en: "The bridge is going to be built next year.", zh: "这座桥明年要开建。", reg: "通用",
      tagged: [ { w: "The bridge", role: "subject", label: "主语" }, { w: "is going to", role: "verb", label: "助动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "built", role: "verb", label: "过去分词" }, { w: "next year", role: "adverb", label: "状语" } ] },
    "gr07.1.3-e4": { en: "It can be fixed in an hour.", zh: "它一小时内就能修好。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "fixed", role: "verb", label: "过去分词" }, { w: "in an hour", role: "adverb", label: "状语" } ] },
    "gr07.1.3-e5": { en: "The room has been cleaned.", zh: "房间已经打扫过了。", reg: "通用",
      tagged: [ { w: "The room", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "been", role: "verb", label: "助动词" }, { w: "cleaned", role: "verb", label: "过去分词" } ] },
    "gr07.1.3-e6": { en: "It can done by machine.", zh: "（错句）它能被机器完成。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "done", role: "verb", label: "过去分词" }, { w: "by machine", role: "adverb", label: "状语" } ] },
    "gr07.1.3-e7": { en: "The work has finished.", zh: "（错句，表被动）工作已经完成了。", reg: "通用",
      tagged: [ { w: "The work", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" } ] },
    /* ---------- gr07.1.4 不用被动的场合 ---------- */
    "gr07.1.4-e1": { en: "The accident happened yesterday.", zh: "事故昨天发生了。", reg: "通用",
      tagged: [ { w: "The accident", role: "subject", label: "主语" }, { w: "happened", role: "verb", label: "谓语" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
    "gr07.1.4-e2": { en: "She is interested in music.", zh: "她对音乐感兴趣。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "interested", role: "complem", label: "表语" }, { w: "in music", role: "adverb", label: "状语" } ] },
    "gr07.1.4-e3": { en: "He died three years ago.", zh: "他三年前去世了。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "died", role: "verb", label: "谓语" }, { w: "three years ago", role: "adverb", label: "状语" } ] },
    "gr07.1.4-e4": { en: "The meeting took place last week.", zh: "会议上周举行了。", reg: "通用",
      tagged: [ { w: "The meeting", role: "subject", label: "主语" }, { w: "took place", role: "verb", label: "谓语" }, { w: "last week", role: "adverb", label: "状语" } ] },
    "gr07.1.4-e5": { en: "They are worried about the test.", zh: "他们为考试担心。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "系动词" }, { w: "worried", role: "complem", label: "表语" }, { w: "about the test", role: "adverb", label: "状语" } ] },
    "gr07.1.4-e6": { en: "The accident was happened yesterday.", zh: "（错句）事故昨天发生了。", reg: "通用",
      tagged: [ { w: "The accident", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "happened", role: "verb", label: "过去分词" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
    "gr07.1.4-e7": { en: "He was died three years ago.", zh: "（错句）他三年前去世了。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "died", role: "verb", label: "过去分词" }, { w: "three years ago", role: "adverb", label: "状语" } ] },
    /* ---------- gr07.1.5 本章小结与习题 ---------- */
    "gr07.1.5-e1": { en: "The window was broken.", zh: "窗户被打破了。（总复习）", reg: "通用",
      tagged: [ { w: "The window", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "broken", role: "verb", label: "过去分词" } ] },
    "gr07.1.5-e2": { en: "He was made to work.", zh: "他被迫工作。（总复习）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "made", role: "verb", label: "过去分词" }, { w: "to work", role: "verb", label: "不定式" } ] },
    "gr07.1.5-e3": { en: "It can be done.", zh: "它能被完成。（总复习）", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "done", role: "verb", label: "过去分词" } ] },
    "gr07.1.5-e4": { en: "The accident happened.", zh: "事故发生了。（总复习）", reg: "通用",
      tagged: [ { w: "The accident", role: "subject", label: "主语" }, { w: "happened", role: "verb", label: "谓语" } ] },
    "gr07.1.5-e5": { en: "The window broken.", zh: "（错句）窗户被打破了。", reg: "通用",
      tagged: [ { w: "The window", role: "subject", label: "主语" }, { w: "broken", role: "verb", label: "过去分词" } ] },
    "gr07.1.5-e6": { en: "He was made work.", zh: "（错句）他被迫工作。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "made", role: "verb", label: "过去分词" }, { w: "work", role: "verb", label: "动词原形" } ] }
  },
  units: [
    {
      id: "gr07-u1",
      title: "被动语态",
      lessons: [
        /* ================= gr07.1.1 被动语态构成 ================= */
        {
          id: "gr07.1.1",
          title: "被动语态构成",
          pages: [
            {
              id: "gr07.1.1-p1",
              kind: "observe",
              title: "先看三句话：be 在跟着谁变？",
              sentences: [
                { id: "gr07.1.1-e1", en: "The window was broken by Tom.", zh: "窗户被汤姆打破了。", reg: "通用",
                  tagged: [ { w: "The window", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "broken", role: "verb", label: "过去分词" }, { w: "by Tom", role: "adverb", label: "状语" } ] },
                { id: "gr07.1.1-e2", en: "English is spoken in many countries.", zh: "许多国家都讲英语。", reg: "通用",
                  tagged: [ { w: "English", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "spoken", role: "verb", label: "过去分词" }, { w: "in many countries", role: "adverb", label: "状语" } ] },
                { id: "gr07.1.1-e3", en: "The bridge will be finished soon.", zh: "这座桥很快就要建成了。", reg: "通用",
                  tagged: [ { w: "The bridge", role: "subject", label: "主语" }, { w: "will be", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "soon", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "三句话的 be 一样吗？它在跟着谁变？",
                options: ["都一样", "跟着时间变：was / is / will be", "随便用哪个"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "被动语态 = be + 过去分词：be 管“时间”，过去分词管“被…”。"
            },
            {
              id: "gr07.1.1-p2",
              kind: "interact",
              title: "标出 be 和过去分词",
              exploreTip: "标出 be 和过去分词：被动语态的两个零件各管什么？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The window", role: "subject", label: "主语" },
                      { w: "was", role: "verb", label: "助动词" },
                      { w: "broken", role: "verb", label: "过去分词" },
                      { w: "by Tom", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "be 和过去分词，哪个管时间？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The bridge", role: "subject", label: "主语" },
                      { w: "will be", role: "verb", label: "助动词" },
                      { w: "finished", role: "verb", label: "过去分词" },
                      { w: "soon", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "will be 里，will 和 be 各干什么？"
                  }
                }
              ],
              point: "be 随时间变（is / was / will be），过去分词不变——分工明确。"
            },
            {
              id: "gr07.1.1-p3",
              kind: "explain",
              title: "被动语态：be + 过去分词",
              lead: "还记得吗？上一页 was / is / will be 换来换去，broken / spoken / finished 岿然不动。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr07.1.1-e1", "gr07.1.1-e2", "gr07.1.1-e3"],
                  note: "身份证已经亮出来了——看这三句话，be 和过去分词谁在变、谁没变？"
                },
                {
                  type: "idcard",
                  rule: "被动语态 = be + 过去分词；be 随时刻变（is / was / will be / have been），过去分词不变。",
                  condition: "只在“主语是动作承受者”时成立；by + 动作执行者可省略（不知道 / 不重要时）；be 不能漏。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“窗户被打破了”，“被”字一加就行。",
                  en: "英语把“被”拆成两个零件：be 管时间（was 过去），过去分词管“被…”（broken 被打破）——“被”也要报时。",
                  unbridge: "别漏 be——“The window broken”在英语里不算完整的话。"
                },
                {
                  type: "spell",
                  title: "be 全家桶 + 过去分词单记：",
                  items: [
                    "be 全家桶：is / are（现在）/ was / were（过去）/ will be（将来）/ have been（完成）",
                    "过去分词不规则单记：break-broke-broken，speak-spoke-spoken"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "The window broken by Tom.",
                  wrongZh: "（✗ 错句）",
                  right: "The window was broken by Tom.",
                  why: "漏了 be——被动语态 = be + done，be 是制服上衣，不能不穿。"
                },
                {
                  type: "contrast",
                  wrong: "The window was break by Tom.",
                  wrongZh: "（✗ 错句）",
                  right: "The window was broken by Tom.",
                  why: "be 后面是过去分词 broken，不是原形 break。"
                }
              ],
              point: "这就是被动语态：be + 过去分词；be 报时，done 表被动。",
              pointScroll: true
            },
            {
              id: "gr07.1.1-p4",
              kind: "quiz",
              title: "练一练：be + done 配对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["The window broken by Tom.", "The window was broken by Tom.", "The window was break by Tom."],
                  answer: 1,
                  tip: "be + 过去分词，两个都要。"
                },
                {
                  type: "fill",
                  stemBefore: "English",
                  stemAfter: "spoken in many countries.",
                  answer: "is",
                  accept: ["is"],
                  tip: "讲现在的事实 → be 用 is。"
                },
                {
                  type: "choice",
                  stem: "“这座桥很快就要建成了”：",
                  options: ["The bridge will be finished soon.", "The bridge will finished soon.", "The bridge will be finish soon."],
                  answer: 0,
                  tip: "将来被动：will be + 过去分词 finished。"
                },
                {
                  type: "fill",
                  stemBefore: "The room",
                  stemAfter: "cleaned every day.",
                  answer: "is",
                  accept: ["is"],
                  tip: "every day + 被动 → is cleaned。"
                }
              ],
              point: "自查：be 在吗？过去分词对吗？be 的时间对吗？"
            }
          ]
        },
        /* ================= gr07.1.2 主动改被动 ================= */
        {
          id: "gr07.1.2",
          title: "主动改被动",
          pages: [
            {
              id: "gr07.1.2-p1",
              kind: "observe",
              title: "先看三句话：make 后面的 to 是哪来的？",
              sentences: [
                { id: "gr07.1.2-e1", en: "He was made to work ten hours a day.", zh: "他被迫每天工作十小时。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "made", role: "verb", label: "过去分词" }, { w: "to work", role: "verb", label: "不定式" }, { w: "ten hours a day", role: "adverb", label: "状语" } ] },
                { id: "gr07.1.2-e2", en: "I was given a gift by my friend.", zh: "朋友送了我一件礼物。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "助动词" }, { w: "given", role: "verb", label: "过去分词" }, { w: "a gift", role: "object", label: "宾语" }, { w: "by my friend", role: "adverb", label: "状语" } ] },
                { id: "gr07.1.2-e3", en: "The song is sung by the kids.", zh: "这首歌是孩子们唱的。", reg: "通用",
                  tagged: [ { w: "The song", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "助动词" }, { w: "sung", role: "verb", label: "过去分词" }, { w: "by the kids", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "第一句里，make 后面的 to 是哪来的？",
                options: ["本来就有", "变被动时“回来”的（主动 make sb do 没 to）", "写错了"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "make sb do 变被动，to 要“回来”：be made to do——这是 to 的出差归来。"
            },
            {
              id: "gr07.1.2-p2",
              kind: "interact",
              title: "拼一句被动句：by 短语有槽吗？",
              exploreTip: "拼一句被动句：四个槽，五个积木——多出来的那块往哪放？",
              widgets: [
                {
                  type: "sentence-builder",
                  params: {
                    pattern: "SVIO DO",
                    blocks: [
                      { w: "I", role: "subject" },
                      { w: "was given", role: "verb" },
                      { w: "a book", role: "object" },
                      { w: "by my friend", role: "adverb" }
                    ],
                    hint: "把积木放进对的槽：by my friend 有槽可放吗？（想想：被动句里它能不能省）",
                    doneNote: "拼出来了！by 短语没有槽——被动句里它可以省略。"
                  }
                }
              ],
              point: "双宾语变被动：直接宾语当前锋；by 短语没槽位——可以省略。"
            },
            {
              id: "gr07.1.2-p3",
              kind: "explain",
              title: "主动改被动：调座位 + to 回来",
              lead: "还记得吗？上一页 by my friend 没有槽可放——被动句里它常常省略。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr07.1.2-e1", "gr07.1.2-e2", "gr07.1.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，主动句的主语都去哪了？"
                },
                {
                  type: "idcard",
                  rule: "主动改被动三步：宾语当前锋作主语；be + 过去分词；主动主语变 by 短语（可省）。双宾语两个都能当前锋；make sb do → be made to do（to 回来）。",
                  condition: "只在动词及物时成立；make 主动无 to、被动 to 回归；双宾语被动常用“人”作主语（I was given…）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“他被迫每天工作十小时”，“被”字管全文。",
                  en: "英语被动要“调座位”：主动句的宾语坐到主语位上，动词穿 be + done 制服，原主语退到 by 后面——座位一调，意思不变。factory（工厂）、manufacture（制造）同属 fac-（做）家族。",
                  unbridge: "别只加 be 不调座位——“Tom was broken the window”主语还是 Tom，不算被动。"
                },
                {
                  type: "contrast",
                  wrong: "He was made work ten hours.",
                  wrongZh: "（✗ 错句）",
                  right: "He was made to work ten hours.",
                  why: "to 没回来——make sb do 变被动，to 必须回归（be made to do）。"
                },
                {
                  type: "contrast",
                  wrong: "Tom was broken the window.",
                  wrongZh: "（✗ 错句）",
                  right: "The window was broken by Tom.",
                  why: "主语没调座位——被动句的主语是“承受者”（window），不是 Tom。"
                }
              ],
              point: "这就是主动改被动：宾语当前锋，be + done 穿制服，to 记得回来。",
              pointScroll: true
            },
            {
              id: "gr07.1.2-p4",
              kind: "quiz",
              title: "练一练：座位调对了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "“Make him do it.”变被动：",
                  options: ["He is made do it.", "He is made to do it.", "He is made to does it."],
                  answer: 1,
                  tip: "be made to do——to 回来了，后面动词用原形。"
                },
                {
                  type: "choice",
                  stem: "“朋友送了我一件礼物”：",
                  options: ["I was given a gift by my friend.", "My friend was given a gift by me.", "I gave a gift by my friend."],
                  answer: 0,
                  tip: "双宾语被动：人（I）当前锋作主语。"
                },
                {
                  type: "fill",
                  stemBefore: "The song",
                  stemAfter: "by the kids.（唱）",
                  answer: "is sung",
                  accept: ["is sung"],
                  tip: "被动：is + 过去分词 sung。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“Tom was broken the window.”应改为：",
                  options: ["The window was broken by Tom.", "Tom broke the window by himself.", "The window broke Tom."],
                  answer: 0,
                  tip: "主语调座位：承受者 window 当前锋。"
                }
              ],
              point: "自查：座位调了吗？be + done 穿齐了吗？make 的 to 回来了吗？"
            }
          ]
        },
        /* ================= gr07.1.3 含情态与完成时的被动 ================= */
        {
          id: "gr07.1.3",
          title: "含情态与完成时的被动",
          pages: [
            {
              id: "gr07.1.3-p1",
              kind: "observe",
              title: "先看三句话：be 后面都站着谁？",
              sentences: [
                { id: "gr07.1.3-e1", en: "This book can be read online.", zh: "这本书可以在网上读。", reg: "通用",
                  tagged: [ { w: "This book", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "read", role: "verb", label: "过去分词" }, { w: "online", role: "adverb", label: "状语" } ] },
                { id: "gr07.1.3-e2", en: "The work has been finished.", zh: "工作已经完成了。", reg: "通用",
                  tagged: [ { w: "The work", role: "subject", label: "主语" }, { w: "has", role: "verb", label: "助动词" }, { w: "been", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" } ] },
                { id: "gr07.1.3-e3", en: "The bridge is going to be built next year.", zh: "这座桥明年要开建。", reg: "通用",
                  tagged: [ { w: "The bridge", role: "subject", label: "主语" }, { w: "is going to", role: "verb", label: "助动词" }, { w: "be", role: "verb", label: "助动词" }, { w: "built", role: "verb", label: "过去分词" }, { w: "next year", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "三句话里，be 后面都站着谁？",
                options: ["动词原形", "过去分词（done）", "动词 -ing"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "情态 / 完成 / 将来 + be + done：be 是“二传手”，done 永远在最后。"
            },
            {
              id: "gr07.1.3-p2",
              kind: "interact",
              title: "标出 can / has 和 be",
              exploreTip: "标出 can / has 和 be：被动语态加上“队友”后，顺序是什么？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "This book", role: "subject", label: "主语" },
                      { w: "can", role: "verb", label: "情态动词" },
                      { w: "be", role: "verb", label: "助动词" },
                      { w: "read", role: "verb", label: "过去分词" },
                      { w: "online", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "情态动词" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "can 和 be 中间能插东西吗？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The work", role: "subject", label: "主语" },
                      { w: "has", role: "verb", label: "助动词" },
                      { w: "been", role: "verb", label: "助动词" },
                      { w: "finished", role: "verb", label: "过去分词" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" }
                    ],
                    hint: "has been 里，哪个是完成时的？"
                  }
                }
              ],
              point: "can be done / have been done：情态和 have 站前面，be 当二传，done 收尾。"
            },
            {
              id: "gr07.1.3-p3",
              kind: "explain",
              title: "含情态与完成时的被动：be 当二传",
              lead: "还记得吗？上一页 can 和 has 站在 be 前面，done 永远站在最后。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr07.1.3-e1", "gr07.1.3-e2", "gr07.1.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，be 前面都站着谁？"
                },
                {
                  type: "idcard",
                  rule: "含情态 / 完成 / 将来的被动：情态 + be + done（can be done）；have + been + done；be going to + be + done。",
                  condition: "be 永远紧跟在情态 / have / be going to 后面，done 永远在最后；情态后 be 不能漏。"
                },
                {
                  type: "bridge",
                  zh: "汉语“可以被读”“已经被完成”，“可以 / 被”一加就行。",
                  en: "英语被动也要“排队”：情态（can）→ be（二传）→ done（收尾）——be 是连接器，漏了它队伍就散了。",
                  unbridge: "别漏 be——“can done”在英语里不存在。"
                },
                {
                  type: "spell",
                  title: "三条被动链：",
                  items: [
                    "情态被动链：can / must / should + be + done",
                    "完成被动链：have / has + been + done（been 不能漏）",
                    "将来被动链：be going to + be + done（两个 be 别写成一个）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "It can done by machine.",
                  wrongZh: "（✗ 错句）",
                  right: "It can be done by machine.",
                  why: "情态后面漏了 be——can be done，be 是二传手，不能缺席。"
                },
                {
                  type: "contrast",
                  wrong: "The work has finished.",
                  wrongZh: "（✗ 错句，表被动）",
                  right: "The work has been finished.",
                  why: "完成被动漏了 been——have been done，been 是“被”的标记。"
                }
              ],
              point: "这就是含情态 / 完成时的被动：can be done，have been done；be 不能漏。",
              pointScroll: true
            },
            {
              id: "gr07.1.3-p4",
              kind: "quiz",
              title: "练一练：be 在吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["It can done by machine.", "It can be done by machine.", "It can be do by machine."],
                  answer: 1,
                  tip: "情态被动：can + be + done。"
                },
                {
                  type: "fill",
                  stemBefore: "The work has",
                  stemAfter: "finished.",
                  answer: "been",
                  accept: ["been"],
                  tip: "完成被动：have + been + done。"
                },
                {
                  type: "choice",
                  stem: "“这座桥明年要开建”：",
                  options: ["The bridge is going to be built next year.", "The bridge is going to build next year.", "The bridge will be build next year."],
                  answer: 0,
                  tip: "be going to be + done：两个 be，done 用 built。"
                },
                {
                  type: "fill",
                  stemBefore: "Such books",
                  stemAfter: "read by kids.（可以）",
                  answer: "can be",
                  accept: ["can be"],
                  tip: "情态被动：can be + done。"
                }
              ],
              point: "自查：be 在吗？done 在最后吗？been 别漏。"
            }
          ]
        },
        /* ================= gr07.1.4 不用被动的场合 ================= */
        {
          id: "gr07.1.4",
          title: "不用被动的场合",
          pages: [
            {
              id: "gr07.1.4-p1",
              kind: "observe",
              title: "先看三句话：happen / die 能变被动吗？",
              sentences: [
                { id: "gr07.1.4-e1", en: "The accident happened yesterday.", zh: "事故昨天发生了。", reg: "通用",
                  tagged: [ { w: "The accident", role: "subject", label: "主语" }, { w: "happened", role: "verb", label: "谓语" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
                { id: "gr07.1.4-e2", en: "She is interested in music.", zh: "她对音乐感兴趣。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "interested", role: "complem", label: "表语" }, { w: "in music", role: "adverb", label: "状语" } ] },
                { id: "gr07.1.4-e3", en: "He died three years ago.", zh: "他三年前去世了。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "died", role: "verb", label: "谓语" }, { w: "three years ago", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "happen / die 能变被动吗（was happened）？",
                options: ["能", "不能：不及物动词没被动", "有时能"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "happen / die 是不及物动词——没有“被…”这件衣服，was happened 是错的。"
            },
            {
              id: "gr07.1.4-p2",
              kind: "interact",
              title: "标出：谁没穿被动的衣服？",
              exploreTip: "标一标：happen 是及物还是不及物？interested 是 done 还是形容词？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "The accident", role: "subject", label: "主语" },
                      { w: "happened", role: "pred", label: "谓语（不及物）" },
                      { w: "yesterday", role: "adverb", label: "时间状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "pred", label: "谓语（不及物）" },
                      { role: "adverb", label: "时间状语" }
                    ],
                    hint: "happen 不及物——没有“被…”这件衣服，was happened 是错的。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "is", role: "link", label: "系动词" },
                      { w: "interested", role: "complem", label: "表语（形容词）" },
                      { w: "in music", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "link", label: "系动词" },
                      { role: "complem", label: "表语（形容词）" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "interested 长得像 done，其实是形容词——be + 形容词不是被动。"
                  }
                }
              ],
              point: "这就是“不用被动”：不及物无被动；be + 形容词不是被动。"
            },
            {
              id: "gr07.1.4-p3",
              kind: "explain",
              title: "不及物无被动；be + 形容词不是被动",
              lead: "还记得吗？上一页 happened 没穿被动的衣服，interested 站在 be 后面当表语。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr07.1.4-e1", "gr07.1.4-e2", "gr07.1.4-e3"],
                  note: "身份证已经亮出来了——看这三句话，哪个动词“不及物”，哪个 be 后面是形容词？"
                },
                {
                  type: "idcard",
                  rule: "不及物动词（happen / die / appear / take place）无被动；系动词（be / look / sound）无被动；be + 形容词（be interested）不是被动。",
                  condition: "判断三问：动词及物吗？（happen 不及物 → 无被动）be 后面是 done 还是形容词？（interested 是形容词 → 不是被动）"
                },
                {
                  type: "bridge",
                  zh: "汉语“事故发生了”“他去世了”，主语都是自己动，不用“被”。",
                  en: "英语也一样：happen / die 自己就能发生，没“承受者”就没被动——被动是给“被…”准备的，没“被”就别穿这件衣服。",
                  unbridge: "别看到过去分词样就当被动——interested 长得像 done，其实是形容词。"
                },
                {
                  type: "contrast",
                  wrong: "The accident was happened yesterday.",
                  wrongZh: "（✗ 错句）",
                  right: "The accident happened yesterday.",
                  why: "happen 是不及物动词，没被动这件衣服——was happened 是中式英语重灾区。"
                },
                {
                  type: "contrast",
                  wrong: "He was died three years ago.",
                  wrongZh: "（✗ 错句）",
                  right: "He died three years ago.",
                  why: "die 不及物，无被动——“去世”是自己发生的。"
                }
              ],
              point: "这就是“不用被动”：不及物无被动；be + 形容词不是被动。自查：动词及物吗？be 后面是 done 还是形容词？",
              pointScroll: true
            },
            {
              id: "gr07.1.4-p4",
              kind: "quiz",
              title: "练一练：被动这件衣服该穿吗？",
              questions: [
                { type: "choice", stem: "下面哪句对？", options: ["The accident was happened yesterday.", "The accident happened yesterday.", "The accident is happened yesterday."], answer: 1, tip: "happen 是不及物动词，没被动这件衣服——was happened 是中式英语重灾区。" },
                { type: "choice", stem: "“She is interested in music.”里的 interested 是？", options: ["过去分词，是被动", "形容词，作表语", "动词原形"], answer: 1, tip: "be + 形容词不是被动——interested 是形容词（感兴趣的）。" },
                { type: "fill", stemBefore: "He", stemAfter: "three years ago.（“去世”；不及物，无被动）", answer: "died", accept: ["died"], tip: "die 不及物——“去世”是自己发生的，不用 was died。" },
                { type: "choice", stem: "判断“能不能用被动”，先看什么？", options: ["动词及物吗？", "主语长吗？", "句子长吗？"], answer: 0, tip: "不及物（happen/die）无被动；再看 be 后面是 done 还是形容词。" }
              ],
              point: "自查：动词及物吗？be 后面是 done 还是形容词？"
            }
          ]
        },
        /* ================= gr07.1.5 本章小结与习题 ================= */
        {
          id: "gr07.1.5",
          title: "本章小结与习题",
          pages: [
            {
              id: "gr07.1.5-p1",
              kind: "explain",
              title: "被动全家福",
              lead: "被动全家福：be + done，be 随时间变，done 恒定。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr07.1.1-e1", "gr07.1.1-e2", "gr07.1.3-e1"],
                  note: "三句话，三种 be——看看 done 变没变。"
                },
                {
                  type: "idcard",
                  rule: "被动总表：is / was / will be / have been / can be + done；主动改被动三步；不及物无被动。",
                  condition: "做题三问：主语是“承受者”吗？be 在吗？done 对吗？"
                },
                {
                  type: "bridge",
                  zh: "汉语“被”字一句。",
                  en: "英语被动三件套：be 报时 + done 表被 + by 可省。",
                  unbridge: "被动不是“高级”——该用才用，不该用别硬套。"
                },
                {
                  type: "contrast",
                  wrong: "The accident was happened.",
                  wrongZh: "（✗ 错句）",
                  right: "The accident happened.",
                  why: "不及物无被动——本章最高频的坑。"
                }
              ],
              point: "被动 = be + done；三问自查：承受者？be？done？",
              pointScroll: true
            },
            {
              id: "gr07.1.5-p2",
              kind: "quiz",
              title: "本章综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["The window broken.", "The window was broken.", "The window was break."],
                  answer: 1,
                  tip: "be + 过去分词。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“He was made work.”应改为：",
                  options: ["He was made to work.", "He was made working.", "He made to work."],
                  answer: 0,
                  tip: "be made to do——to 回来。"
                },
                {
                  type: "fill",
                  stemBefore: "Such books",
                  stemAfter: "be read by kids.（可以）",
                  answer: "can",
                  accept: ["can"],
                  tip: "情态被动：can be + done。"
                },
                {
                  type: "choice",
                  stem: "“事故昨天发生了”：",
                  options: ["The accident was happened yesterday.", "The accident happened yesterday.", "The accident is happened yesterday."],
                  answer: 1,
                  tip: "happen 不及物，无被动。"
                }
              ],
              point: "本章自查三问：主语是承受者吗？be 在吗？done 对吗？"
            }
          ]
        }
      ]
    }
  ]
};
