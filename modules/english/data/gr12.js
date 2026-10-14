/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr12：简单句与并列句
 *
 * 数据口径（M5）：window.ENG_CH["gr12"] = { id, title, units[] }，
 * 与 gr05.js 同构；例句 id 规则见 docs/english-grammar-review-ledger.md。
 *
 * 单元 gr12-u1：简单句与并列句（gr12.1.1–gr12.1.5）
 *
 * 撰写：语法生产B队（2026-10-14）；例句状态 drafted，待 D3 三审。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr12"] = {
  id: "gr12",
  title: "简单句与并列句",
  sentences: {
    /* ---------- gr12.1.1 There be 句型 ---------- */
    "gr12.1.1-e1": { en: "There is a book on the desk.", zh: "书桌上有本书。", reg: "通用",
      tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "is", role: "verb", label: "谓语" }, { w: "a book", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr12.1.1-e2": { en: "There are two pens in the box.", zh: "盒子里有两支钢笔。", reg: "通用",
      tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "are", role: "verb", label: "谓语" }, { w: "two pens", role: "subject", label: "主语" }, { w: "in the box", role: "adverb", label: "状语" } ] },
    "gr12.1.1-e3": { en: "There is a book and two pens on the desk.", zh: "书桌上有一本书和两支钢笔。", reg: "通用",
      tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "is", role: "verb", label: "谓语" }, { w: "a book and two pens", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr12.1.1-e4": { en: "There is some milk in the glass.", zh: "杯子里有些牛奶。", reg: "通用",
      tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "is", role: "verb", label: "谓语" }, { w: "some milk", role: "subject", label: "主语" }, { w: "in the glass", role: "adverb", label: "状语" } ] },
    "gr12.1.1-e5": { en: "There are many students here.", zh: "这儿有很多学生。", reg: "通用",
      tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "are", role: "verb", label: "谓语" }, { w: "many students", role: "subject", label: "主语" }, { w: "here", role: "adverb", label: "状语" } ] },
    "gr12.1.1-e6": { en: "There have a book on the desk.", zh: "（错句）书桌上有本书。", reg: "通用",
      tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "have", role: "verb", label: "谓语" }, { w: "a book", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr12.1.1-e7": { en: "There is two pens in the box.", zh: "（错句）盒子里有两支钢笔。", reg: "通用",
      tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "is", role: "verb", label: "谓语" }, { w: "two pens", role: "subject", label: "主语" }, { w: "in the box", role: "adverb", label: "状语" } ] },
    /* ---------- gr12.1.2 祈使句与感叹句 ---------- */
    "gr12.1.2-e1": { en: "Don't be late!", zh: "别迟到！", reg: "口语",
      tagged: [ { w: "Don't", role: "verb", label: "助动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "late", role: "complem", label: "表语" } ] },
    "gr12.1.2-e2": { en: "Let's play soccer!", zh: "咱们踢足球吧！", reg: "口语",
      tagged: [ { w: "Let's", role: "subject", label: "主语" }, { w: "play", role: "verb", label: "谓语" }, { w: "soccer", role: "object", label: "宾语" } ] },
    "gr12.1.2-e3": { en: "What a nice day!", zh: "多好的天气啊！", reg: "口语",
      tagged: [ { w: "What", role: "adverb", label: "感叹词" }, { w: "a nice day", role: "subject", label: "主语" } ] },
    "gr12.1.2-e4": { en: "Please sit down.", zh: "请坐。", reg: "口语",
      tagged: [ { w: "Please", role: "adverb", label: "状语" }, { w: "sit", role: "verb", label: "谓语" }, { w: "down", role: "adverb", label: "状语" } ] },
    "gr12.1.2-e5": { en: "How beautiful the flowers are!", zh: "这些花多美啊！", reg: "口语",
      tagged: [ { w: "How", role: "adverb", label: "感叹词" }, { w: "beautiful", role: "complem", label: "表语" }, { w: "the flowers", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "谓语" } ] },
    "gr12.1.2-e6": { en: "What nice day!", zh: "（错句）多好的天气啊！", reg: "口语",
      tagged: [ { w: "What", role: "adverb", label: "感叹词" }, { w: "nice day", role: "subject", label: "主语" } ] },
    /* ---------- gr12.1.3 并列句 ---------- */
    "gr12.1.3-e1": { en: "I was tired, so I went to bed.", zh: "我累了，所以去睡觉了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "系动词" }, { w: "tired", role: "complem", label: "表语" }, { w: "so", role: "conj", label: "连词" }, { w: "I", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "to bed", role: "adverb", label: "状语" } ] },
    "gr12.1.3-e2": { en: "Hurry up, or you will be late.", zh: "快点，否则你要迟到了。", reg: "通用",
      tagged: [ { w: "Hurry up", role: "verb", label: "谓语" }, { w: "or", role: "conj", label: "连词" }, { w: "you", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "late", role: "complem", label: "表语" } ] },
    "gr12.1.3-e3": { en: "He is old, but he is strong.", zh: "他年纪大了，但身体很棒。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "old", role: "complem", label: "表语" }, { w: "but", role: "conj", label: "连词" }, { w: "he", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "strong", role: "complem", label: "表语" } ] },
    "gr12.1.3-e4": { en: "I like tea, but he likes coffee.", zh: "我喜欢茶，但他喜欢咖啡。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "like", role: "verb", label: "谓语" }, { w: "tea", role: "object", label: "宾语" }, { w: "but", role: "conj", label: "连词" }, { w: "he", role: "subject", label: "主语" }, { w: "likes", role: "verb", label: "谓语" }, { w: "coffee", role: "object", label: "宾语" } ] },
    "gr12.1.3-e5": { en: "Study hard, and you will pass.", zh: "努力学习，你就会通过。", reg: "通用",
      tagged: [ { w: "Study hard", role: "verb", label: "谓语" }, { w: "and", role: "conj", label: "连词" }, { w: "you", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "pass", role: "verb", label: "动词原形" } ] },
    "gr12.1.3-e6": { en: "I was tired, I went to bed.", zh: "（错句）我累了，所以去睡觉了。", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "系动词" }, { w: "tired", role: "complem", label: "表语" }, { w: "I", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "to bed", role: "adverb", label: "状语" } ] },
    "gr12.1.3-e7": { en: "Although it rained, but we went out.", zh: "（错句）虽然下雨了，但我们出去了。", reg: "通用",
      tagged: [ { w: "Although it rained", role: "adverb", label: "状语" }, { w: "but", role: "conj", label: "连词" }, { w: "we", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "out", role: "adverb", label: "状语" } ] },
    /* ---------- gr12.1.4 反意疑问句 ---------- */
    "gr12.1.4-e1": { en: "You are a student, aren't you?", zh: "你是学生，对吧？", reg: "口语",
      tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "系动词" }, { w: "a student", role: "complem", label: "表语" }, { w: "aren't you", role: "verb", label: "反意疑问" } ] },
    "gr12.1.4-e2": { en: "He doesn't like coffee, does he?", zh: "他不喜欢咖啡，对吗？", reg: "口语",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "doesn't", role: "verb", label: "助动词" }, { w: "like", role: "verb", label: "谓语" }, { w: "coffee", role: "object", label: "宾语" }, { w: "does he", role: "verb", label: "反意疑问" } ] },
    "gr12.1.4-e3": { en: "Let's go, shall we?", zh: "咱们走吧，好吗？", reg: "口语",
      tagged: [ { w: "Let's", role: "subject", label: "主语" }, { w: "go", role: "verb", label: "谓语" }, { w: "shall we", role: "verb", label: "反意疑问" } ] },
    "gr12.1.4-e4": { en: "She can swim, can't she?", zh: "她会游泳，对吧？", reg: "口语",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "can", role: "verb", label: "情态动词" }, { w: "swim", role: "verb", label: "动词原形" }, { w: "can't she", role: "verb", label: "反意疑问" } ] },
    "gr12.1.4-e5": { en: "They won't come, will they?", zh: "他们不会来，对吗？", reg: "口语",
      tagged: [ { w: "They", role: "subject", label: "主语" }, { w: "won't", role: "verb", label: "助动词" }, { w: "come", role: "verb", label: "动词原形" }, { w: "will they", role: "verb", label: "反意疑问" } ] },
    "gr12.1.4-e6": { en: "You're a student, are you?", zh: "（错句）你是学生，对吧？", reg: "口语",
      tagged: [ { w: "You're", role: "subject", label: "主语" }, { w: "a student", role: "complem", label: "表语" }, { w: "are you", role: "verb", label: "反意疑问" } ] },
    "gr12.1.4-e7": { en: "He doesn't like coffee, doesn't he?", zh: "（错句）他不喜欢咖啡，对吗？", reg: "口语",
      tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "doesn't", role: "verb", label: "助动词" }, { w: "like", role: "verb", label: "谓语" }, { w: "coffee", role: "object", label: "宾语" }, { w: "doesn't he", role: "verb", label: "反意疑问" } ] },
    /* ---------- gr12.1.5 本章小结与习题 ---------- */
    "gr12.1.5-e1": { en: "There is a cat.", zh: "有只猫。（总复习）", reg: "通用",
      tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "is", role: "verb", label: "谓语" }, { w: "a cat", role: "subject", label: "主语" } ] },
    "gr12.1.5-e2": { en: "Don't talk!", zh: "别说话！（总复习）", reg: "口语",
      tagged: [ { w: "Don't", role: "verb", label: "助动词" }, { w: "talk", role: "verb", label: "动词原形" } ] },
    "gr12.1.5-e3": { en: "What a big house!", zh: "多大的房子啊！（总复习）", reg: "口语",
      tagged: [ { w: "What", role: "adverb", label: "感叹词" }, { w: "a big house", role: "subject", label: "主语" } ] },
    "gr12.1.5-e4": { en: "I ran fast, so I won.", zh: "我跑得快，所以赢了。（总复习）", reg: "通用",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "ran", role: "verb", label: "谓语" }, { w: "fast", role: "adverb", label: "状语" }, { w: "so", role: "conj", label: "连词" }, { w: "I", role: "subject", label: "主语" }, { w: "won", role: "verb", label: "谓语" } ] },
    "gr12.1.5-e5": { en: "There have a book.", zh: "（错句）有本书。", reg: "通用",
      tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "have", role: "verb", label: "谓语" }, { w: "a book", role: "subject", label: "主语" } ] },
    "gr12.1.5-e6": { en: "What nice day!", zh: "（错句）多好的天气啊！", reg: "口语",
      tagged: [ { w: "What", role: "adverb", label: "感叹词" }, { w: "nice day", role: "subject", label: "主语" } ] }
  },
  units: [
    {
      id: "gr12-u1",
      title: "简单句与并列句",
      lessons: [
        /* ================= gr12.1.1 There be 句型 ================= */
        {
          id: "gr12.1.1",
          title: "There be 句型",
          pages: [
            {
              id: "gr12.1.1-p1",
              kind: "observe",
              title: "先看三句话：is 还是 are，谁说了算？",
              sentences: [
                { id: "gr12.1.1-e1", en: "There is a book on the desk.", zh: "书桌上有本书。", reg: "通用",
                  tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "is", role: "verb", label: "谓语" }, { w: "a book", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
                { id: "gr12.1.1-e2", en: "There are two pens in the box.", zh: "盒子里有两支钢笔。", reg: "通用",
                  tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "are", role: "verb", label: "谓语" }, { w: "two pens", role: "subject", label: "主语" }, { w: "in the box", role: "adverb", label: "状语" } ] },
                { id: "gr12.1.1-e3", en: "There is a book and two pens on the desk.", zh: "书桌上有一本书和两支钢笔。", reg: "通用",
                  tagged: [ { w: "There", role: "subject", label: "引导词" }, { w: "is", role: "verb", label: "谓语" }, { w: "a book and two pens", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] }
              ],
              guess: {
                q: "第三句用 is 还是 are？谁说了算？",
                options: ["are（pens 是复数）", "is（离 be 近的 a book 说了算）", "都行"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "There be 就近原则：离 be 近的名词说了算（a book → is）。"
            },
            {
              id: "gr12.1.1-p2",
              kind: "interact",
              title: "标出 There be：be 听谁的？",
              exploreTip: "标出 There be 句：be 到底听哪个名词的？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "There", role: "subject", label: "引导词" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "a book and two pens", role: "subject", label: "主语" }
                    ],
                    slots: [
                      { role: "subject", label: "引导词" },
                      { role: "verb", label: "谓语" },
                      { role: "subject", label: "主语" }
                    ],
                    hint: "is 听谁的？看离它最近的名词。"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "There", role: "subject", label: "引导词" },
                      { w: "are", role: "verb", label: "谓语" },
                      { w: "two pens and a book", role: "subject", label: "主语" }
                    ],
                    slots: [
                      { role: "subject", label: "引导词" },
                      { role: "verb", label: "谓语" },
                      { role: "subject", label: "主语" }
                    ],
                    hint: "这次离 be 最近的是谁？"
                  }
                }
              ],
              point: "There be 安检：there 后面不许跟 have；be 听最近的名词的。"
            },
            {
              id: "gr12.1.1-p3",
              kind: "explain",
              title: "There be 句型：there 引导，be 就近",
              lead: "还记得吗？上一页 be 两次“变脸”，都是离它最近的名词说了算。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr12.1.1-e1", "gr12.1.1-e2", "gr12.1.1-e3"],
                  note: "身份证已经亮出来了——看这三句话，be 每次听谁的？"
                },
                {
                  type: "idcard",
                  rule: "There be 表“存在”（有）；be 用 is / are 随其后名词单复数；就近原则（There is a book and two pens）。",
                  condition: "there 后不许跟 have（There have ✗）；there be 后只跟名词，不跟动词；be 的数由离它最近的名词决定。"
                },
                {
                  type: "bridge",
                  zh: "汉语说“有本书”，“有”字以不变应万变。",
                  en: "英语的“有”叫 there be：there 是引导词，be 要“看人下菜”——后面名词单数用 is，复数用 are，离得近的说了算。",
                  unbridge: "别把“有”直译成 have——There have a book 是中式英语重灾区。"
                },
                {
                  type: "spell",
                  title: "is / are 分工 + 就近口诀：",
                  items: [
                    "There is + 单数 / There are + 复数",
                    "就近口诀：离 be 近的说了算",
                    "There be 后跟名词：There is a book（不说 There is have）"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "There have a book on the desk.",
                  wrongZh: "（✗ 错句）",
                  right: "There is a book on the desk.",
                  why: "英语的“有”叫 there be，不是 there have——there 后面不许跟 have。"
                },
                {
                  type: "contrast",
                  wrong: "There is two pens in the box.",
                  wrongZh: "（✗ 错句）",
                  right: "There are two pens in the box.",
                  why: "pens 是复数，be 用 are——be 听后面名词的。"
                }
              ],
              point: "这就是 There be：there 引导，be 就近；there 后无 have。",
              pointScroll: true
            },
            {
              id: "gr12.1.1-p4",
              kind: "quiz",
              title: "练一练：There be 安检",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["There have a book.", "There is a book.", "There is have a book."],
                  answer: 1,
                  tip: "英语的“有”叫 there be。"
                },
                {
                  type: "choice",
                  stem: "“书桌上有一本书和两支钢笔”：",
                  options: ["There are a book and two pens.", "There is a book and two pens.", "There have a book and two pens."],
                  answer: 1,
                  tip: "就近原则：离 be 近的 a book → is。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "are two pens in the box.",
                  answer: "There",
                  accept: ["There", "there"],
                  tip: "There be 句型，there 开头。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“There has many people.”应改为：",
                  options: ["There are many people.", "There have many people.", "There is many people."],
                  answer: 0,
                  tip: "people 复数 → are；there 后不跟 have / has。"
                }
              ],
              point: "自查：there 开头？be 就近？have 出现了吗（不许）？"
            }
          ]
        },
        /* ================= gr12.1.2 祈使句与感叹句 ================= */
        {
          id: "gr12.1.2",
          title: "祈使句与感叹句",
          pages: [
            {
              id: "gr12.1.2-p1",
              kind: "observe",
              title: "先看三句话：What 后面的 a 能省吗？",
              sentences: [
                { id: "gr12.1.2-e1", en: "Don't be late!", zh: "别迟到！", reg: "口语",
                  tagged: [ { w: "Don't", role: "verb", label: "助动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "late", role: "complem", label: "表语" } ] },
                { id: "gr12.1.2-e2", en: "Let's play soccer!", zh: "咱们踢足球吧！", reg: "口语",
                  tagged: [ { w: "Let's", role: "subject", label: "主语" }, { w: "play", role: "verb", label: "谓语" }, { w: "soccer", role: "object", label: "宾语" } ] },
                { id: "gr12.1.2-e3", en: "What a nice day!", zh: "多好的天气啊！", reg: "口语",
                  tagged: [ { w: "What", role: "adverb", label: "感叹词" }, { w: "a nice day", role: "subject", label: "主语" } ] }
              ],
              guess: {
                q: "What a nice day 里，a 能省吗？",
                options: ["能", "不能：What + a / an + 形容词 + 名词", "无所谓"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "感叹句公式：What + (a / an) + 形容词 + 名词！/ How + 形容词！"
            },
            {
              id: "gr12.1.2-p2",
              kind: "explain",
              title: "祈使句与感叹句：Don't / Let's / What / How",
              lead: "还记得吗？上一页 Don't 开头表禁止，Let's 表建议，What a nice day 里 a 不能省。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr12.1.2-e1", "gr12.1.2-e2", "gr12.1.2-e3"],
                  note: "身份证已经亮出来了——看这三句话，哪个是命令，哪个是感叹？"
                },
                {
                  type: "idcard",
                  rule: "祈使句：Don't + 原形（禁止）；Let's + 原形（建议）；感叹句：What + (a/an) + adj + n! / How + adj!",
                  condition: "What 后名词单数可数加 a / an（What a nice day）；How 后直接跟形容词（How nice!），不加 a。"
                },
                {
                  type: "bridge",
                  zh: "汉语“别迟到”“多好的天气啊”，语气词一加就行。",
                  en: "英语祈使句动词打头（Don't be late）；感叹句 What / How 打头——What 管“名词”，How 管“形容词”，分工明确。",
                  unbridge: "别 What 后面乱加 a——How nice 里没有 a，What nice day 里必须有 a。"
                },
                {
                  type: "contrast",
                  wrong: "What nice day!",
                  wrongZh: "（✗ 错句）",
                  right: "What a nice day!",
                  why: "What + 可数名词单数，a 不能省——这是感叹句的身份证。"
                }
              ],
              point: "这就是祈使与感叹：Don't / Let's 打头；What 管名词（加 a），How 管形容词。自查：a 在吗？How 后面没加 a 吧？",
              pointScroll: true
            }
          ]
        },
        /* ================= gr12.1.3 并列句 ================= */
        {
          id: "gr12.1.3",
          title: "并列句",
          pages: [
            {
              id: "gr12.1.3-p1",
              kind: "observe",
              title: "先看三句话：连词左右完整吗？",
              sentences: [
                { id: "gr12.1.3-e1", en: "I was tired, so I went to bed.", zh: "我累了，所以去睡觉了。", reg: "通用",
                  tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "was", role: "verb", label: "系动词" }, { w: "tired", role: "complem", label: "表语" }, { w: "so", role: "conj", label: "连词" }, { w: "I", role: "subject", label: "主语" }, { w: "went", role: "verb", label: "谓语" }, { w: "to bed", role: "adverb", label: "状语" } ] },
                { id: "gr12.1.3-e2", en: "Hurry up, or you will be late.", zh: "快点，否则你要迟到了。", reg: "通用",
                  tagged: [ { w: "Hurry up", role: "verb", label: "谓语" }, { w: "or", role: "conj", label: "连词" }, { w: "you", role: "subject", label: "主语" }, { w: "will", role: "verb", label: "情态动词" }, { w: "be", role: "verb", label: "动词原形" }, { w: "late", role: "complem", label: "表语" } ] },
                { id: "gr12.1.3-e3", en: "He is old, but he is strong.", zh: "他年纪大了，但身体很棒。", reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "old", role: "complem", label: "表语" }, { w: "but", role: "conj", label: "连词" }, { w: "he", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "系动词" }, { w: "strong", role: "complem", label: "表语" } ] }
              ],
              guess: {
                q: "两个简单句中间，没有连词行吗？",
                options: ["行", "不行：run-on 句，要加连词", "都行"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "并列句 = 简单句 + 逗号 + 连词：and / but / or / so，缺一不可。"
            },
            {
              id: "gr12.1.3-p2",
              kind: "interact",
              title: "标出连词：左右各一句",
              exploreTip: "标出连词：它左右两边各站着一个完整的简单句。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "was", role: "verb", label: "系动词" },
                      { w: "tired", role: "complem", label: "表语" },
                      { w: "so", role: "conj", label: "连词" },
                      { w: "I", role: "subject", label: "主语" },
                      { w: "went", role: "verb", label: "谓语" },
                      { w: "to bed", role: "adverb", label: "状语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "系动词" },
                      { role: "complem", label: "表语" },
                      { role: "conj", label: "连词" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "adverb", label: "状语" }
                    ],
                    hint: "so 前面有几个简单句？它在干什么？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Hurry up", role: "verb", label: "谓语" },
                      { w: "or", role: "conj", label: "连词" },
                      { w: "you", role: "subject", label: "主语" },
                      { w: "will", role: "verb", label: "情态动词" },
                      { w: "be", role: "verb", label: "动词原形" },
                      { w: "late", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "verb", label: "谓语" },
                      { role: "conj", label: "连词" },
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "助动词" },
                      { role: "verb", label: "动词原形" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "or 连接的是哪两句？"
                  }
                }
              ],
              point: "连词是“桥梁”：左右各一句，逗号不能省；although…but 预告：让步句里 but 不许进（gr15）。"
            },
            {
              id: "gr12.1.3-p3",
              kind: "explain",
              title: "并列句：逗号 + 连词",
              lead: "还记得吗？上一页 so / or 左右各站着一个完整的简单句。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr12.1.3-e1", "gr12.1.3-e2", "gr12.1.3-e3"],
                  note: "身份证已经亮出来了——看这三句话，连词左右两边完整吗？"
                },
                {
                  type: "idcard",
                  rule: "并列句 = 简单句 + 逗号 + 并列连词 + 简单句；and（和）/ but（但）/ or（否则）/ so（所以）。",
                  condition: "连词左右须是完整简单句；逗号不能省（run-on 句）；although…but 禁令预告：让步从句里 although 和 but 只能留一个（gr15 回填）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“我累了，所以去睡觉了”，“所以”一加就行，逗号可有可无。",
                  en: "英语并列句“逗号 + 连词”双保险：I was tired, so I went to bed——逗号和 so 一个都不能少。",
                  unbridge: "别两个句子硬接——“I was tired, I went to bed”在英语里叫 run-on，是病句。"
                },
                {
                  type: "spell",
                  title: "四连词分工：",
                  items: [
                    "and 表并列：I like apples and bananas.",
                    "but 表转折：He is old, but he is strong.",
                    "or 表选择 / 否则：Hurry up, or you will be late.",
                    "so 表结果：I was tired, so I went to bed."
                  ]
                },
                {
                  type: "contrast",
                  wrong: "I was tired, I went to bed.",
                  wrongZh: "（✗ 错句）",
                  right: "I was tired, so I went to bed.",
                  why: "两个简单句无连词硬接（run-on）——中间必须有连词或分号。"
                },
                {
                  type: "contrast",
                  wrong: "Although it rained, but we went out.",
                  wrongZh: "（✗ 错句）",
                  right: "Although it rained, we went out.",
                  why: "although 和 but 是仇人，一句话只能留一个（gr15 回填）。"
                }
              ],
              point: "这就是并列句：逗号 + 连词；run-on 是病句；although…but 禁令。",
              pointScroll: true
            },
            {
              id: "gr12.1.3-p4",
              kind: "quiz",
              title: "练一练：连词桥梁搭好了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I was tired, I went to bed.", "I was tired, so I went to bed.", "I was tired so I went to bed."],
                  answer: 1,
                  tip: "并列句：逗号 + 连词，双保险。"
                },
                {
                  type: "choice",
                  stem: "“快点，否则你要迟到了”：",
                  options: ["Hurry up, or you will be late.", "Hurry up, you will be late.", "Hurry up or, you will be late."],
                  answer: 0,
                  tip: "or 前加逗号：…, or …。"
                },
                {
                  type: "fill",
                  stemBefore: "He is old,",
                  stemAfter: "he is strong.（但是）",
                  answer: "but",
                  accept: ["but"],
                  tip: "转折 → but。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“Although it rained, but we went out.”应改为：",
                  options: ["Although it rained, we went out.", "Although it rained, and we went out.", "It rained, but we went out although."],
                  answer: 0,
                  tip: "although 和 but 只能留一个。"
                }
              ],
              point: "自查：连词在吗？逗号在吗？左右完整吗？"
            }
          ]
        },
        /* ================= gr12.1.4 反意疑问句 ================= */
        {
          id: "gr12.1.4",
          title: "反意疑问句",
          pages: [
            {
              id: "gr12.1.4-p1",
              kind: "observe",
              title: "先看三句话：反意部分和陈述部分什么关系？",
              sentences: [
                { id: "gr12.1.4-e1", en: "You are a student, aren't you?", zh: "你是学生，对吧？", reg: "口语",
                  tagged: [ { w: "You", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "系动词" }, { w: "a student", role: "complem", label: "表语" }, { w: "aren't you", role: "verb", label: "反意疑问" } ] },
                { id: "gr12.1.4-e2", en: "He doesn't like coffee, does he?", zh: "他不喜欢咖啡，对吗？", reg: "口语",
                  tagged: [ { w: "He", role: "subject", label: "主语" }, { w: "doesn't", role: "verb", label: "助动词" }, { w: "like", role: "verb", label: "谓语" }, { w: "coffee", role: "object", label: "宾语" }, { w: "does he", role: "verb", label: "反意疑问" } ] },
                { id: "gr12.1.4-e3", en: "Let's go, shall we?", zh: "咱们走吧，好吗？", reg: "口语",
                  tagged: [ { w: "Let's", role: "subject", label: "主语" }, { w: "go", role: "verb", label: "谓语" }, { w: "shall we", role: "verb", label: "反意疑问" } ] }
              ],
              guess: {
                q: "前肯后否、前否后肯——反意部分和陈述部分是什么关系？",
                options: ["完全一样", "肯定否定相反（镜像）", "没关系"],
                answer: 1,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              },
              point: "反意疑问句 = 陈述 + 镜像：前肯后否，前否后肯；助动词 / 情态动词照搬。"
            },
            {
              id: "gr12.1.4-p2",
              kind: "interact",
              title: "标出反意部分：镜像吗？",
              exploreTip: "标出反意部分：它和陈述部分是“镜像”关系吗？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "You", role: "subject", label: "主语" },
                      { w: "are", role: "verb", label: "系动词" },
                      { w: "a student", role: "complem", label: "表语" },
                      { w: "aren't you", role: "verb", label: "反意疑问" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "系动词" },
                      { role: "complem", label: "表语" },
                      { role: "verb", label: "反意疑问" }
                    ],
                    hint: "aren't 里的 n't 对应前面的肯定还是否定？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Let's", role: "subject", label: "主语" },
                      { w: "go", role: "verb", label: "谓语" },
                      { w: "shall we", role: "verb", label: "反意疑问" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "verb", label: "反意疑问" }
                    ],
                    hint: "Let's 开头，反意部分固定用什么？"
                  }
                }
              ],
              point: "前肯后否，前否后肯；Let's…shall we? 是特例，单记。"
            },
            {
              id: "gr12.1.4-p3",
              kind: "explain",
              title: "反意疑问句：镜像取反",
              lead: "还记得吗？上一页 aren't you 和 does he 都是陈述部分的“镜像”。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr12.1.4-e1", "gr12.1.4-e2", "gr12.1.4-e3"],
                  note: "身份证已经亮出来了——看这三句话，反意部分的助动词从哪来？"
                },
                {
                  type: "idcard",
                  rule: "反意疑问句：陈述（肯定）+ 反意（否定）/ 陈述（否定）+ 反意（肯定）；反意部分 = 助动词 / 情态 / be + 主语代词。",
                  condition: "陈述有助动词照搬（doesn't…does he）；无助动词用 do（He likes…doesn't he）；Let's…shall we? / I'm…aren't I? 特例单记。"
                },
                {
                  type: "bridge",
                  zh: "汉语“你是学生，对吧”，“对吧”一加就行，不用管前面。",
                  en: "英语反意部分要“照搬”：陈述部分的助动词 / be 是什么，反意部分就用什么，再镜像取反——aren't 对 are，does 对 doesn't。",
                  unbridge: "别乱找助动词——反意部分的助动词必须从陈述部分“照搬”。"
                },
                {
                  type: "spell",
                  title: "照搬三条 + 特例：",
                  items: [
                    "有助动词照搬：doesn't…does he / can…can't he",
                    "无助动词用 do：He likes coffee, doesn't he?",
                    "特例单记：Let's…shall we? / I'm late, aren't I?"
                  ]
                },
                {
                  type: "contrast",
                  wrong: "You're a student, are you?",
                  wrongZh: "（✗ 错句）",
                  right: "You're a student, aren't you?",
                  why: "前肯后否——陈述肯定，反意必须否定。"
                },
                {
                  type: "contrast",
                  wrong: "He doesn't like coffee, doesn't he?",
                  wrongZh: "（✗ 错句）",
                  right: "He doesn't like coffee, does he?",
                  why: "前否后肯——doesn't 否定，反意用肯定 does he。"
                }
              ],
              point: "这就是反意疑问句：镜像取反；助动词照搬；特例单记。",
              pointScroll: true
            },
            {
              id: "gr12.1.4-p4",
              kind: "quiz",
              title: "练一练：镜像了吗？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["You're a student, are you?", "You're a student, aren't you?", "You're a student, isn't you?"],
                  answer: 1,
                  tip: "前肯后否。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["He doesn't like coffee, doesn't he?", "He doesn't like coffee, does he?", "He doesn't like coffee, do he?"],
                  answer: 1,
                  tip: "前否后肯；主语 he → does。"
                },
                {
                  type: "fill",
                  stemBefore: "Let's go,",
                  stemAfter: "?（好吗，特例）",
                  answer: "shall we",
                  accept: ["shall we"],
                  tip: "Let's…shall we? 特例单记。"
                },
                {
                  type: "choice",
                  stem: "“I'm late, ___?”：",
                  options: ["aren't I", "amn't I", "isn't I"],
                  answer: 0,
                  tip: "I'm…aren't I? 特例。"
                }
              ],
              point: "自查：镜像了吗？助动词照搬了吗？特例记住了吗？"
            }
          ]
        },
        /* ================= gr12.1.5 本章小结与习题 ================= */
        {
          id: "gr12.1.5",
          title: "本章小结与习题",
          pages: [
            {
              id: "gr12.1.5-p1",
              kind: "explain",
              title: "四种句型四种“姿势”",
              lead: "简单句与并列句收官：There be、祈使感叹、并列连词、反意疑问。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr12.1.1-e1", "gr12.1.3-e1", "gr12.1.4-e1"],
                  note: "三句话，三种姿势——看看它们各在干什么。"
                },
                {
                  type: "idcard",
                  rule: "本章总表：There be（就近）/ 祈使（Don't / Let's）/ 感叹（What / How）/ 并列（逗号 + 连词）/ 反意（镜像）。",
                  condition: "做题四问：有 → There be？命令感叹？两句并列？句尾反问？"
                },
                {
                  type: "bridge",
                  zh: "汉语靠语气词，英语靠句型。",
                  en: "四种句型四种“姿势”：There be 表存在，祈使表要求，感叹表惊叹，并列连两句——姿势对，意思才对。",
                  unbridge: "别所有句子都写成陈述句——句型是表情，换着用。"
                },
                {
                  type: "contrast",
                  wrong: "There have a book.",
                  wrongZh: "（✗ 错句）",
                  right: "There is a book.",
                  why: "there 后无 have——本章第一坑。"
                }
              ],
              point: "本章 = 四种姿势；四问定位，姿势不乱。",
              pointScroll: true
            },
            {
              id: "gr12.1.5-p2",
              kind: "quiz",
              title: "本章综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["There have a book.", "There is a book.", "There are a book."],
                  answer: 1,
                  tip: "there be；a book 单数 → is。"
                },
                {
                  type: "choice",
                  stem: "改中式英语：“What nice day!”应改为：",
                  options: ["What a nice day!", "How a nice day!", "What nice a day!"],
                  answer: 0,
                  tip: "What + a + 形容词 + 名词。"
                },
                {
                  type: "fill",
                  stemBefore: "I was tired,",
                  stemAfter: "I went to bed.（所以）",
                  answer: "so",
                  accept: ["so"],
                  tip: "并列句：逗号 + so。"
                },
                {
                  type: "choice",
                  stem: "“你是学生，对吧？”：",
                  options: ["You're a student, are you?", "You're a student, aren't you?", "You are a student, isn't it?"],
                  answer: 1,
                  tip: "前肯后否。"
                }
              ],
              point: "本章自查四问：There be？祈使感叹？并列？反意？"
            }
          ]
        }
      ]
    }
  ]
};
