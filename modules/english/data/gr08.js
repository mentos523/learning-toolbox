/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr08：情态动词
 *
 * 数据口径（M5）：window.ENG_CH["gr08"] = { id, title, units[] }，
 * 与 gr05.js 同构；例句 id 规则见 docs/english-grammar-review-ledger.md。
 *
 * 单元 gr08-u1：情态动词（gr08.1.1–gr08.1.5）
 *
 * 撰写：语法生产B队（2026-10-14）；例句状态 drafted，待 D3 三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr08"] = {
  id: "gr08",
  title: "情态动词",
  sentences: {
    /* ---------- gr08.1.1 can/may/must 基本义 ---------- */
    "gr08.1.1-e1": { en: "She can swim well.", zh: "她游泳游得很好。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "swim", role: "verb", label: "动词原形" }, { w: "well", role: "adverb", label: "状语" } ] },
    "gr08.1.1-e2": { en: "May I come in?", zh: "我可以进来吗？", reg: "口语",
      tagged: [ { w: "May", role: "verb", label: "情态动词" }, { w: "I", role: "subject", label: "主语" }, { w: "come", role: "verb", label: "动词原形" }, { w: "in", role: "adverb", label: "状语" } ] },
    "gr08.1.1-e3": { en: "You must be tired.", zh: "你一定累了。（肯定推测）", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "must", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "tired", role: "complem", label: "表语" } ] },
    "gr08.1.1-e4": { en: "He can ride a bike.", zh: "他会骑自行车。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "ride", role: "verb", label: "动词原形" }, { w: "a bike", role: "object", label: "宾语" } ] },
    "gr08.1.1-e5": { en: "It may rain tomorrow.", zh: "明天可能会下雨。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "may", role: "verb", label: "情态动词" }, { w: "rain", role: "verb", label: "动词原形" }, { w: "tomorrow", role: "adverb", label: "状语" } ] },
    "gr08.1.1-e6": { en: "She can to swim.", zh: "（错句）她会游泳。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "to swim", role: "verb", label: "动词不定式" } ] },
    "gr08.1.1-e7": { en: "He cans swim.", zh: "（错句）他会游泳。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "cans", role: "verb", label: "情态动词" }, { w: "swim", role: "verb", label: "动词原形" } ] },
    /* ---------- gr08.1.2 mustn't vs don't have to ---------- */
    "gr08.1.2-e1": { en: "You mustn't smoke here.", zh: "你在这里不许吸烟。（禁止）", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "mustn't", role: "verb", label: "情态动词" }, { w: "smoke", role: "verb", label: "动词原形" }, { w: "here", role: "adverb", label: "状语" } ] },
    "gr08.1.2-e2": { en: "You don't have to come if you are busy.", zh: "你忙的话不必来。（不必）", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "don't have to", role: "verb", label: "助动词" }, { w: "come", role: "verb", label: "动词原形" }, { w: "if you are busy", role: "adverb", label: "状语" } ] },
    "gr08.1.2-e3": { en: "We needn't hurry.", zh: "我们不必匆忙。", reg: "通用",
      tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "needn't", role: "verb", label: "半情态动词" }, { w: "hurry", role: "verb", label: "动词原形" } ] },
    "gr08.1.2-e4": { en: "You mustn't run in the hall.", zh: "你不许在走廊里跑。（禁止）", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "mustn't", role: "verb", label: "情态动词" }, { w: "run", role: "verb", label: "动词原形" }, { w: "in the hall", role: "adverb", label: "状语" } ] },
    "gr08.1.2-e5": { en: "She doesn't have to work today.", zh: "她今天不必工作。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "doesn't have to", role: "verb", label: "助动词" }, { w: "work", role: "verb", label: "动词原形" }, { w: "today", role: "adverb", label: "状语" } ] },
    "gr08.1.2-e6": { en: "You mustn't come if you are busy.", zh: "（错句，想表“不必”）你忙的话不许来。", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "mustn't", role: "verb", label: "情态动词" }, { w: "come", role: "verb", label: "动词原形" }, { w: "if you are busy", role: "adverb", label: "状语" } ] },
    "gr08.1.2-e7": { en: "You don't have to smoke here.", zh: "（错句，想表“禁止”）你在这里不必吸烟。", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "don't have to", role: "verb", label: "助动词" }, { w: "smoke", role: "verb", label: "动词原形" }, { w: "here", role: "adverb", label: "状语" } ] },
    /* ---------- gr08.1.3 情态 + 完成时（高中） ---------- */
    "gr08.1.3-e1": { en: "He must have missed the bus.", zh: "他肯定误了公交车。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "must", role: "verb", label: "情态动词" }, { w: "have", role: "verb", label: "助动词" }, { w: "missed", role: "verb", label: "过去分词" }, { w: "the bus", role: "object", label: "宾语" } ] },
    "gr08.1.3-e2": { en: "She can't have finished so fast.", zh: "她不可能这么快就做完了。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "can't", role: "verb", label: "情态动词" }, { w: "have", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "so fast", role: "adverb", label: "状语" } ] },
    "gr08.1.3-e3": { en: "You should have called me.", zh: "你本该给我打电话的。（而没打）", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "should", role: "verb", label: "情态动词" }, { w: "have", role: "verb", label: "助动词" }, { w: "called", role: "verb", label: "过去分词" }, { w: "me", role: "object", label: "宾语" } ] },
    "gr08.1.3-e4": { en: "They must have arrived.", zh: "他们肯定已经到了。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "must", role: "verb", label: "情态动词" }, { w: "have", role: "verb", label: "助动词" }, { w: "arrived", role: "verb", label: "过去分词" } ] },
    "gr08.1.3-e5": { en: "He shouldn't have left early.", zh: "他本不该早走的。（而早走了）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "shouldn't", role: "verb", label: "情态动词" }, { w: "have", role: "verb", label: "助动词" }, { w: "left", role: "verb", label: "过去分词" }, { w: "early", role: "adverb", label: "状语" } ] },
    "gr08.1.3-e6": { en: "He must has missed the bus.", zh: "（错句）他肯定误了公交车。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "must", role: "verb", label: "情态动词" }, { w: "has", role: "verb", label: "助动词" }, { w: "missed", role: "verb", label: "过去分词" }, { w: "the bus", role: "object", label: "宾语" } ] },
    "gr08.1.3-e7": { en: "You should call me yesterday.", zh: "（错句，想表“本该”）你昨天应该给我打电话。", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "should", role: "verb", label: "情态动词" }, { w: "call", role: "verb", label: "动词原形" }, { w: "me", role: "object", label: "宾语" }, { w: "yesterday", role: "adverb", label: "状语" } ] },
    /* ---------- gr08.1.4 should/had better/need ---------- */
    "gr08.1.4-e1": { en: "You should see a doctor.", zh: "你应该去看医生。", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "should", role: "verb", label: "情态动词" }, { w: "see", role: "verb", label: "动词原形" }, { w: "a doctor", role: "object", label: "宾语" } ] },
    "gr08.1.4-e2": { en: "You had better hurry up.", zh: "你最好快点。", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "had better", role: "verb", label: "半情态动词" }, { w: "hurry up", role: "verb", label: "动词原形" } ] },
    "gr08.1.4-e3": { en: "I need some help.", zh: "我需要帮助。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "need", role: "verb", label: "谓语" }, { w: "some help", role: "object", label: "宾语" } ] },
    "gr08.1.4-e4": { en: "She needs a pen.", zh: "她需要一支钢笔。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "needs", role: "verb", label: "谓语" }, { w: "a pen", role: "object", label: "宾语" } ] },
    "gr08.1.4-e5": { en: "You needn't worry.", zh: "你不必担心。", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "needn't", role: "verb", label: "半情态动词" }, { w: "worry", role: "verb", label: "动词原形" } ] },
    "gr08.1.4-e6": { en: "You had better to see a doctor.", zh: "（错句）你最好去看医生。", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "had better", role: "verb", label: "半情态动词" }, { w: "to see", role: "verb", label: "动词不定式" }, { w: "a doctor", role: "object", label: "宾语" } ] },
    /* ---------- gr08.1.5 本章小结与习题 ---------- */
    "gr08.1.5-e1": { en: "She can swim.", zh: "她会游泳。（总复习）", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "swim", role: "verb", label: "动词原形" } ] },
    "gr08.1.5-e2": { en: "You mustn't smoke.", zh: "你不许吸烟。（总复习）", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "mustn't", role: "verb", label: "情态动词" }, { w: "smoke", role: "verb", label: "动词原形" } ] },
    "gr08.1.5-e3": { en: "You had better hurry up.", zh: "你最好快点。（总复习）", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "had better", role: "verb", label: "半情态动词" }, { w: "hurry up", role: "verb", label: "动词原形" } ] },
    "gr08.1.5-e4": { en: "He must have left.", zh: "他肯定已经走了。（总复习）", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "must", role: "verb", label: "情态动词" }, { w: "have", role: "verb", label: "助动词" }, { w: "left", role: "verb", label: "过去分词" } ] },
    "gr08.1.5-e5": { en: "She can to swim.", zh: "（错句）她会游泳。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "to swim", role: "verb", label: "动词不定式" } ] },
    "gr08.1.5-e6": { en: "You mustn't come.", zh: "（错句，想表“不必”）你不许来。", reg: "通用",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "mustn't", role: "verb", label: "情态动词" }, { w: "come", role: "verb", label: "动词原形" } ] }
  },
  units: [
    {
      id: "gr08-u1",
      title: "情态动词",
      lessons: [
        /* ================= gr08.1.1 can/may/must 基本义 ================= */
        {
          id: "gr08.1.1",
          title: "can / may / must 基本义",
          pages: [
            {
              id: "gr08.1.1-p1",
              kind: "observe",
              title: "先看三句话：must 只有“必须”吗？",
              sentences: [
                { id: "gr08.1.1-e1", en: "She can swim well.", zh: "她游泳游得很好。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "swim", role: "verb", label: "动词原形" }, { w: "well", role: "adverb", label: "状语" } ] },
                { id: "gr08.1.1-e2", en: "May I come in?", zh: "我可以进来吗？", reg: "口语",
                  tagged: [ { w: "May", role: "verb", label: "情态动词" }, { w: "I", role: "subject", label: "主语" }, { w: "come", role: "verb", label: "动词原形" }, { w: "in", role: "adverb", label: "状语" } ] },
                { id: "gr08.1.1-e3", en: "You must be tired.", zh: "你一定累了。（肯定推测）", reg: "通用",
                  tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "must", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "tired", role: "complem", label: "表语" } ] }
              ],
              guess: {
                q: "第三句的 must 是“必须”还是“肯定”？",
                options: ["必须", "肯定（你一定累了）", "可能"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "must 不只有“必须”——“You must be tired”是“你一定累了”（肯定推测）。"
            },
            {
              id: "gr08.1.1-p2",
              kind: "interact",
              title: "标出情态动词",
              exploreTip: "标出情态动词：它们后面都跟什么样的动词？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "She", role: "subject", label: "主语" },
                      { w: "can", role: "verb", label: "情态动词" },
                      { w: "swim", role: "verb", label: "动词原形" },
                      { w: "well", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "情态动词" },
                      { role: "verb", label: "动词原形" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "can 后面跟的动词长什么样？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "You", role: "subject", label: "主语" },
                      { w: "must", role: "verb", label: "情态动词" },
                      { w: "be", role: "verb", label: "动词原形" },
                      { w: "tired", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "情态动词" },
                      { role: "verb", label: "动词原形" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "must 在这里是“必须”还是“肯定”？"
                  }
                }
              ],
              point: "情态动词是“裸奔族”：后面直接跟动词原形，不加 to、不加 -s。"
            },
            {
              id: "gr08.1.1-p3",
              kind: "explain",
              title: "can / may / must：能力、许可、必须、推测",
              lead: "还记得吗？上一页 can / must 后面，动词都是光溜溜的原形。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr08.1.1-e1", "gr08.1.1-e2", "gr08.1.1-e3"],
                  note: "身份证已经亮出来了——看这三句话，can / may / must 各表什么意思？"
                },
                {
                  type: "idcard",
                  rule: "can 表能力 / 许可；may 表许可（更客气）/ 可能；must 表必须 / 肯定推测；情态后只跟动词原形。",
                  condition: "情态后不加 to、不加 -s；must 表推测只用于肯定句（否定推测用 can't）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“能 / 可以 / 必须”后面跟动词，都不用变。",
                  en: "英语也一样：情态动词后面永远是动词原形——can to go 是多穿了一件衣服。",
                  unbridge: "别给情态动词加 -s——“He cans”在英语里不存在。"
                },
                {
                  type: "spell",
                  title: "情态“裸奔”+ may 的客气：",
                  items: [
                    "情态“裸奔”：can / may / must + 动词原形",
                    "may 更客气：May I…?（许可）vs Can I…?（口语常用）",
                    "must 推测：You must be + 形容词（一定…）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "She can to swim.",
                  wrongZh: "（✗ 错句）",
                  right: "She can swim.",
                  why: "can 后面多穿了一件 to——情态动词是“裸奔族”。"
                },
                {
                  type: "contrast",
                  wrong: "He cans swim.",
                  wrongZh: "（✗ 错句）",
                  right: "He can swim.",
                  why: "情态动词不加 -s——主语是 he，can 也不变。"
                }
              ],
              point: "这就是 can / may / must：能力 / 许可 / 必须 / 推测；后面只跟原形。",
              pointScroll: true
            },
            {
              id: "gr08.1.1-p4",
              kind: "quiz",
              title: "练一练：情态后跟什么？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["She can to swim.", "She can swim.", "She can swims."],
                  answer: 1,
                  tip: "情态后只跟动词原形。"
                },
                {
                  type: "choice",
                  stem: "“你可以走了”（许可）：",
                  options: ["You can go now.", "You must go now.", "You go now must."],
                  answer: 0,
                  tip: "表许可用 can；must 是“必须”，语气太重。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "I come in?（可以…吗，客气）",
                  answer: "May",
                  accept: ["May", "may"],
                  tip: "客气的许可：May I…?"
                },
                {
                  type: "choice",
                  stem: "“他一定在家”（肯定推测）：",
                  options: ["He must be at home.", "He must at home.", "He can be at home must."],
                  answer: 0,
                  tip: "肯定推测：must + be。"
                }
              ],
              point: "自查：情态后是原形吗？to / -s 多穿了吗？"
            }
          ]
        },
        /* ================= gr08.1.2 mustn't vs don't have to ================= */
        {
          id: "gr08.1.2",
          title: "mustn't vs don't have to",
          pages: [
            {
              id: "gr08.1.2-p1",
              kind: "observe",
              title: "先看三句话：哪个是“不许”，哪个是“不必”？",
              sentences: [
                { id: "gr08.1.2-e1", en: "You mustn't smoke here.", zh: "你在这里不许吸烟。（禁止）", reg: "通用",
                  tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "mustn't", role: "verb", label: "情态动词" }, { w: "smoke", role: "verb", label: "动词原形" }, { w: "here", role: "adverb", label: "状语" } ] },
                { id: "gr08.1.2-e2", en: "You don't have to come if you are busy.", zh: "你忙的话不必来。（不必）", reg: "通用",
                  tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "don't have to", role: "verb", label: "助动词" }, { w: "come", role: "verb", label: "动词原形" }, { w: "if you are busy", role: "adverb", label: "状语" } ] },
                { id: "gr08.1.2-e3", en: "We needn't hurry.", zh: "我们不必匆忙。", reg: "通用",
                  tagged: [ { w: "We", role: "subject", label: "主语" }, { w: "needn't", role: "verb", label: "半情态动词" }, { w: "hurry", role: "verb", label: "动词原形" } ] }
              ],
              guess: {
                q: "mustn't 和 don't have to，哪个是“不许”，哪个是“不必”？",
                options: ["mustn't = 不许，don't have to = 不必", "反过来", "意思一样"],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "mustn't 是红灯（不许），don't have to 是绿灯（不必）——说反了意思全反。"
            },
            {
              id: "gr08.1.2-p2",
              kind: "interact",
              title: "对拍：红灯 vs 绿灯",
              exploreTip: "标出 mustn't 和 don't have to：红灯（禁止）还是绿灯（不必）？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "You", role: "subject", label: "主语" },
                      { w: "mustn't", role: "verb", label: "情态动词" },
                      { w: "smoke", role: "verb", label: "动词原形" },
                      { w: "here", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "情态动词" },
                      { role: "verb", label: "动词原形" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "这是红灯还是绿灯？（禁止 → mustn't）"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "You", role: "subject", label: "主语" },
                      { w: "don't have to", role: "verb", label: "助动词" },
                      { w: "come", role: "verb", label: "动词原形" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "动词原形" }
                    ],
                    hint: "这是红灯还是绿灯？（不必 → don't have to）"
                  }
                }
              ],
              point: "mustn't = 不许（红灯）；don't have to = 不必（绿灯）。"
            },
            {
              id: "gr08.1.2-p3",
              kind: "explain",
              title: "mustn't（不许）vs don't have to（不必）",
              lead: "还记得吗？上一页 mustn't 是红灯，don't have to 是绿灯。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr08.1.2-e1", "gr08.1.2-e2", "gr08.1.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，哪个是“不许”，哪个是“不必”？"
                },
                {
                  type: "idcard",
                  rule: "mustn't = 禁止（不许）；don't have to / needn't = 不必。",
                  condition: "只在否定意义时成立；must 的否定有两种：mustn't（不许）vs don't have to（不必）——“不必”绝不用 mustn't。"
                },
                {
                  type: "bridge",
                  zh: "汉语“不必”和“不许”是两个词，不会混。",
                  en: "英语的坑在 must 身上：mustn't 看着像 must 的否定，其实意思是“不许”；“不必”要另找 don't have to——否定的是 have to，不是 must。",
                  unbridge: "别把“必须不”直译成 mustn't 表“不必”——mustn't 永远是“不许”。"
                },
                {
                  type: "spell",
                  title: "否定三兄弟：",
                  items: [
                    "mustn't = must not（禁止）",
                    "don't have to = 不必（have to 的否定）",
                    "needn't = need not（不必，半情态）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "You mustn't come if you are busy.",
                  wrongZh: "（✗ 错句，想表“不必”）",
                  right: "You don't have to come if you are busy.",
                  why: "“不必”用 mustn't 就变成了“不许”——全书级易混王，意思全反。"
                },
                {
                  type: "contrast",
                  wrong: "You don't have to smoke here.",
                  wrongZh: "（✗ 错句，想表“禁止”）",
                  right: "You mustn't smoke here.",
                  why: "想表“禁止”却用了“不必”——红灯绿灯别拿反。"
                }
              ],
              point: "这就是 mustn't vs don't have to：禁止 vs 不必；“不必”永不用 mustn't。",
              pointScroll: true
            },
            {
              id: "gr08.1.2-p4",
              kind: "quiz",
              title: "练一练：红灯还是绿灯？",
              questions: [
                {
                  type: "choice",
                  stem: "“这里不许吸烟”：",
                  options: ["You don't have to smoke here.", "You mustn't smoke here.", "You must smoke here."],
                  answer: 1,
                  tip: "禁止 → mustn't（红灯）。"
                },
                {
                  type: "choice",
                  stem: "“你忙的话不必来”：",
                  options: ["You mustn't come if you are busy.", "You don't have to come if you are busy.", "You must come if you are busy."],
                  answer: 1,
                  tip: "不必 → don't have to（绿灯）。"
                },
                {
                  type: "fill",
                  stemBefore: "We",
                  stemAfter: "hurry.（不必）",
                  answer: "needn't",
                  accept: ["needn't", "don't have to"],
                  tip: "不必 → needn't。"
                },
                {
                  type: "choice",
                  stem: "把“不必”说成 mustn't，会变成什么意思？",
                  options: ["还是“不必”", "变成“不许”（禁止）", "变成“必须”"],
                  answer: 1,
                  tip: "mustn't = 不许，说反了意思全反。"
                }
              ],
              point: "自查：红灯不许 mustn't，绿灯不必 don't have to。"
            }
          ]
        },
        /* ================= gr08.1.3 情态 + 完成时（高中） ================= */
        {
          id: "gr08.1.3",
          title: "情态 + 完成时（高中）",
          pages: [
            {
              id: "gr08.1.3-p1",
              kind: "observe",
              title: "先看三句话：推测的是现在还是过去？",
              sentences: [
                { id: "gr08.1.3-e1", en: "He must have missed the bus.", zh: "他肯定误了公交车。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "must", role: "verb", label: "情态动词" }, { w: "have", role: "verb", label: "助动词" }, { w: "missed", role: "verb", label: "过去分词" }, { w: "the bus", role: "object", label: "宾语" } ] },
                { id: "gr08.1.3-e2", en: "She can't have finished so fast.", zh: "她不可能这么快就做完了。", reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "can't", role: "verb", label: "情态动词" }, { w: "have", role: "verb", label: "助动词" }, { w: "finished", role: "verb", label: "过去分词" }, { w: "so fast", role: "adverb", label: "状语" } ] },
                { id: "gr08.1.3-e3", en: "You should have called me.", zh: "你本该给我打电话的。（而没打）", reg: "通用",
                  tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "should", role: "verb", label: "情态动词" }, { w: "have", role: "verb", label: "助动词" }, { w: "called", role: "verb", label: "过去分词" }, { w: "me", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "must have missed 讲的是现在还是过去？",
                options: ["现在", "过去（已经误了）", "将来"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "情态 + have done = 对过去的推测：must have done（肯定已…），can't have done（不可能已…）。"
            },
            {
              id: "gr08.1.3-p2",
              kind: "interact",
              title: "标出情态 + have + done",
              exploreTip: "标出情态 + have + done：推测的“时间”被搬到了哪？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "He", role: "subject", label: "主语" },
                      { w: "must", role: "verb", label: "情态动词" },
                      { w: "have", role: "verb", label: "助动词" },
                      { w: "missed", role: "verb", label: "过去分词" },
                      { w: "the bus", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "情态动词" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "must have missed 里，哪个词把推测搬到了过去？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "You", role: "subject", label: "主语" },
                      { w: "should", role: "verb", label: "情态动词" },
                      { w: "have", role: "verb", label: "助动词" },
                      { w: "called", role: "verb", label: "过去分词" },
                      { w: "me", role: "object", label: "宾语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "情态动词" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "过去分词" },
                      { role: "object", label: "宾语" }
                    ],
                    hint: "should have done 是“应该做”还是“本该做而没做”？"
                  }
                }
              ],
              point: "must have done 肯定已…；should have done 本该…（而没做）。"
            },
            {
              id: "gr08.1.3-p3",
              kind: "explain",
              title: "情态 + 完成时：对过去的推测",
              lead: "还记得吗？上一页 have 把情态的推测搬到了过去。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr08.1.3-e1", "gr08.1.3-e2", "gr08.1.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，推测的都是过去的什么事？"
                },
                {
                  type: "idcard",
                  rule: "情态 + have + 过去分词，表对过去的推测：must have done（肯定已…）；can't have done（不可能已…）；should have done（本该…而没做）。",
                  condition: "高中内容；should have done 暗含“没做”（本该而未）；can't 表否定推测（不用 mustn't）。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“他肯定误了车了”，“肯定…了”一加就行。",
                  en: "英语把推测“搬到过去”：must 管“肯定”，have done 管“过去”——两个零件一拼，就是“对过去的肯定”。",
                  unbridge: "别把 should have done 当“应该做”——它专讲“本该做而没做”，带后悔味。"
                },
                {
                  type: "spell",
                  title: "三条推测链：",
                  items: [
                    "must have done = 肯定已经…",
                    "can't have done = 不可能已经…（否定推测不用 mustn't）",
                    "should have done = 本该…（而没做）；shouldn't have done = 本不该…（而做了）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "He must has missed the bus.",
                  wrongZh: "（✗ 错句）",
                  right: "He must have missed the bus.",
                  why: "情态后面永远是原形 have，不是 has。"
                },
                {
                  type: "contrast",
                  wrong: "You should call me yesterday.",
                  wrongZh: "（✗ 错句，想表“本该”）",
                  right: "You should have called me yesterday.",
                  why: "讲过去的“本该”，要加 have done——should do 只讲现在 / 将来。"
                }
              ],
              point: "这就是情态 + 完成时：must have done 肯定已；should have done 本该而未。",
              pointScroll: true
            },
            {
              id: "gr08.1.3-p4",
              kind: "quiz",
              title: "练一练：推测过去",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["He must has missed the bus.", "He must have missed the bus.", "He must have miss the bus."],
                  answer: 1,
                  tip: "情态 + have + 过去分词。"
                },
                {
                  type: "choice",
                  stem: "“她不可能这么快就做完了”：",
                  options: ["She mustn't have finished so fast.", "She can't have finished so fast.", "She can't finish so fast yesterday."],
                  answer: 1,
                  tip: "否定推测用 can't have done。"
                },
                {
                  type: "fill",
                  stemBefore: "You",
                  stemAfter: "have called me.（本该）",
                  answer: "should",
                  accept: ["should"],
                  tip: "本该而没做：should have done。"
                },
                {
                  type: "choice",
                  stem: "should have done 的意思是：",
                  options: ["应该做（还没做）", "本该做而没做", "将来应该做"],
                  answer: 1,
                  tip: "should have done 专讲“本该而未”，带后悔味。"
                }
              ],
              point: "自查：推测过去 → 情态 + have done；should have done 带后悔。"
            }
          ]
        },
        /* ================= gr08.1.4 should/had better/need ================= */
        {
          id: "gr08.1.4",
          title: "should / had better / need",
          pages: [
            {
              id: "gr08.1.4-p1",
              kind: "observe",
              title: "先看三句话：had better 后面跟 to 吗？",
              sentences: [
                { id: "gr08.1.4-e1", en: "You should see a doctor.", zh: "你应该去看医生。", reg: "通用",
                  tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "should", role: "verb", label: "情态动词" }, { w: "see", role: "verb", label: "动词原形" }, { w: "a doctor", role: "object", label: "宾语" } ] },
                { id: "gr08.1.4-e2", en: "You had better hurry up.", zh: "你最好快点。", reg: "通用",
                  tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "had better", role: "verb", label: "半情态动词" }, { w: "hurry up", role: "verb", label: "动词原形" } ] },
                { id: "gr08.1.4-e3", en: "I need some help.", zh: "我需要帮助。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "need", role: "verb", label: "谓语" }, { w: "some help", role: "object", label: "宾语" } ] }
              ],
              guess: {
                q: "had better 后面跟 to 吗？",
                options: ["跟（had better to）", "不跟（had better do）", "都行"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "had better 是“最好”：后面直接跟动词原形，不加 to。"
            },
            {
              id: "gr08.1.4-p2",
              kind: "explain",
              title: "should / had better / need：应该、最好、需要",
              lead: "还记得吗？上一页 had better 后面直接跟原形，to 不许进。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr08.1.4-e1", "gr08.1.4-e2", "gr08.1.4-e3"],
                  note: "身份证已经亮出来了——看这三句话，should / had better / need 语气有什么不同？"
                },
                {
                  type: "idcard",
                  rule: "should 表应该（建议）；had better 表最好（更强）；need 作实义动词（need to do）或半情态（needn't do）。",
                  condition: "had better 后不加 to；needn't do 中 need 是半情态（后跟原形）；need to do 中 need 是实义动词（三单加 -s）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“应该”“最好”“需要”，后面都跟动词。",
                  en: "英语里 should / had better 后面都是原形；need 有两副面孔：实义动词（need to do）和半情态（needn't do）——看后面跟不跟 to 就知道是哪副。",
                  unbridge: "别给 had better 加 to——“最好”后面直接跟原形，这是它的身份证。"
                },
                {
                  type: "contrast",
                  wrong: "You had better to see a doctor.",
                  wrongZh: "（✗ 错句）",
                  right: "You had better see a doctor.",
                  why: "had better 后面不加 to——“最好”是裸奔的。"
                }
              ],
              point: "这就是 should / had better / need：应该 / 最好 / 需要；had better 后无 to。自查：to 多穿了吗？need 是哪副面孔？",
              pointScroll: true
            }
          ]
        },
        /* ================= gr08.1.5 本章小结与习题 ================= */
        {
          id: "gr08.1.5",
          title: "本章小结与习题",
          pages: [
            {
              id: "gr08.1.5-p1",
              kind: "explain",
              title: "情态全家福",
              lead: "情态全家福：can / may / must / should / had better，一个比一个有脾气。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr08.1.1-e1", "gr08.1.2-e1", "gr08.1.3-e3"],
                  note: "三句话，三种情态——看看它们后面都跟什么。"
                },
                {
                  type: "idcard",
                  rule: "情态总表：能力许可（can / may）/ 必须推测（must）/ 禁止不必（mustn't / don't have to）/ 应该最好（should / had better）/ 推测过去（情态 + have done）。",
                  condition: "做题两问：表什么意思？（选词）后面跟什么？（永远原形）"
                },
                {
                  type: "bridge",
                  zh: "汉语情态词意思多，英语也一样——关键看“后面跟原形”这条铁律。",
                  en: "情态全家福：意思各不同，规矩就一条——后面只跟动词原形。",
                  unbridge: "别被意思带跑——意思再多，“后跟原形”不变。"
                },
                {
                  type: "contrast",
                  wrong: "She can to swim.",
                  wrongZh: "（✗ 错句）",
                  right: "She can swim.",
                  why: "情态后多穿 to——本章第一坑。"
                }
              ],
              point: "情态 = 意思 + 原形；两问自查：什么意思？跟原形了吗？",
              pointScroll: true
            },
            {
              id: "gr08.1.5-p2",
              kind: "quiz",
              title: "本章综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["She can to swim.", "She can swim.", "She cans swim."],
                  answer: 1,
                  tip: "情态后只跟原形。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“You mustn't come.”想表“不必”应改为：",
                  options: ["You don't have to come.", "You must come.", "You needn't to come."],
                  answer: 0,
                  tip: "“不必”用 don't have to。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "I come in?（客气）",
                  answer: "May",
                  accept: ["May", "may"],
                  tip: "客气的许可：May I…?"
                },
                {
                  type: "choice",
                  stem: "“你最好快点”：",
                  options: ["You had better to hurry up.", "You had better hurry up.", "You had to better hurry up."],
                  answer: 1,
                  tip: "had better 后不加 to。"
                }
              ],
              point: "本章自查两问：什么意思？（选对词）跟原形了吗？"
            }
          ]
        }
      ]
    }
  ]
};
