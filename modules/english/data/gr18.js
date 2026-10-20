/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr18：主谓一致与特殊句式
 *
 * 数据口径（M5）：window.ENG_CH["gr18"] = { id, title, sentences, units[] }，
 * 与试点 gr05.js 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 本文件含 gr18 全部 5 课 × 4 页 = 20 页：
 *   p1 观察页（例句先行 + 分块标注 + Y1 先猜后验）
 *   p2 交互页（signal-light / G1 tagging / Y4 constituent-quiz）
 *   p3 讲解页（examples → idcard → bridge → contrast；spell 有则写）
 *   p4 练习页（Y3 判分：选择 + 填空）
 * 例句登记于 D3 三审台账 modules/english/data/_review/
 * ledger-gr18.json（本阶段状态 drafted，待英语专家队初审与红队终审）。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=生产队撰写（语法生产D队，2026-10-14）。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr18"] = {
  id: "gr18",
  title: "主谓一致与特殊句式",
  /* 例句索引：键 = D3 台账例句 id；讲解页 blocks.type="examples" 按 id 引用。
   * 文本与台账 ledger-gr18.json 逐字一致（本阶段 drafted）。 */
  sentences: {
    "gr18.1.1-e1": { en: "Either you or he is right.", zh: "你或他是对的。", reg: "通用",
      tagged: [ { w: "Either you or he", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "right", role: "complem", label: "表语" } ] },
    "gr18.1.1-e2": { en: "The family are having dinner.", zh: "家人们正在吃晚饭。", reg: "通用",
      tagged: [ { w: "The family", role: "subject", label: "主语（看作多人）" }, { w: "are having", role: "verb", label: "谓语" }, { w: "dinner", role: "object", label: "宾语" } ] },
    "gr18.1.1-e3": { en: "A number of students are reading.", zh: "许多学生正在读书。", reg: "通用",
      tagged: [ { w: "A number of students", role: "subject", label: "主语" }, { w: "are reading", role: "verb", label: "谓语" } ] },
    "gr18.1.1-e4": { en: "Either you or he are right.", zh: "（✗ 错句）你或他是对的。", reg: "通用",
      tagged: [ { w: "Either you or he", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "谓语（✗ 未就近）" }, { w: "right", role: "complem", label: "表语" } ] },
    "gr18.1.1-e6": { en: "The number of students are fifty.", zh: "（✗ 错句）学生数量是五十。", reg: "通用",
      tagged: [ { w: "The number of students", role: "subject", label: "主语" }, { w: "are", role: "verb", label: "谓语（✗ 单复数）" }, { w: "fifty", role: "complem", label: "表语" } ] },
    "gr18.1.1-e7": { en: "The number of students is fifty.", zh: "学生数量是五十。", reg: "通用",
      tagged: [ { w: "The number of students", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "fifty", role: "complem", label: "表语" } ] },
    "gr18.1.2-e1": { en: "There goes the bell.", zh: "铃响了。", reg: "通用",
      tagged: [ { w: "There", role: "adverb", label: "there" }, { w: "goes", role: "verb", label: "谓语" }, { w: "the bell", role: "subject", label: "主语" } ] },
    "gr18.1.2-e2": { en: "Here comes the teacher.", zh: "老师来了。", reg: "通用",
      tagged: [ { w: "Here", role: "adverb", label: "地点状语" }, { w: "comes", role: "verb", label: "谓语" }, { w: "the teacher", role: "subject", label: "主语" } ] },
    "gr18.1.2-e3": { en: "There are two books on the desk.", zh: "桌上有两本书。", reg: "通用",
      tagged: [ { w: "There are", role: "verb", label: "there be" }, { w: "two books", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr18.1.2-e4": { en: "There have a book on the desk.", zh: "（✗ 错句）桌上有一本书。", reg: "通用",
      tagged: [ { w: "There have", role: "verb", label: "there be（✗ 不用 have）" }, { w: "a book", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr18.1.2-e5": { en: "There is a book on the desk.", zh: "桌上有一本书。", reg: "通用",
      tagged: [ { w: "There is", role: "verb", label: "there be" }, { w: "a book", role: "subject", label: "主语" }, { w: "on the desk", role: "adverb", label: "状语" } ] },
    "gr18.1.2-e6": { en: "There go the bell.", zh: "（✗ 错句）铃响了。", reg: "通用",
      tagged: [ { w: "There", role: "adverb", label: "there" }, { w: "go", role: "verb", label: "谓语（✗ 单复数）" }, { w: "the bell", role: "subject", label: "主语" } ] },
    "gr18.1.3-e1": { en: "Swimming is fun.", zh: "游泳很有趣。", reg: "通用",
      tagged: [ { w: "Swimming", role: "subject", label: "主语（动名词）" }, { w: "is", role: "verb", label: "谓语" }, { w: "fun", role: "complem", label: "表语" } ] },
    "gr18.1.3-e2": { en: "To learn English is hard.", zh: "学英语很难。", reg: "通用",
      tagged: [ { w: "To learn English", role: "subject", label: "主语（不定式）" }, { w: "is", role: "verb", label: "谓语" }, { w: "hard", role: "complem", label: "表语" } ] },
    "gr18.1.3-e3": { en: "Three years is a long time.", zh: "三年是很长的时间。", reg: "通用",
      tagged: [ { w: "Three years", role: "subject", label: "主语（时间量）" }, { w: "is", role: "verb", label: "谓语" }, { w: "a long time", role: "complem", label: "表语" } ] },
    "gr18.1.3-e4": { en: "Swimming are fun.", zh: "（✗ 错句）游泳很有趣。", reg: "通用",
      tagged: [ { w: "Swimming", role: "subject", label: "主语（动名词）" }, { w: "are", role: "verb", label: "谓语（✗ 单复数）" }, { w: "fun", role: "complem", label: "表语" } ] },
    "gr18.1.3-e6": { en: "Three years are a long time.", zh: "（✗ 错句）三年是很长的时间。", reg: "通用",
      tagged: [ { w: "Three years", role: "subject", label: "主语（时间量）" }, { w: "are", role: "verb", label: "谓语（✗ 单复数）" }, { w: "a long time", role: "complem", label: "表语" } ] },
    "gr18.1.3-e7": { en: "What he said is true.", zh: "他说的是真的。", reg: "通用",
      tagged: [ { w: "What he said", role: "subject", label: "主语（从句）" }, { w: "is", role: "verb", label: "谓语" }, { w: "true", role: "complem", label: "表语" } ] },
    "gr18.1.4-e1": { en: "I don't think he is right.", zh: "我认为他不对。", reg: "口语",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't think", role: "verb", label: "谓语（否定爬上来了）" }, { w: "he is right", role: "object", label: "宾语从句" } ] },
    "gr18.1.4-e2": { en: "It is not uncommon.", zh: "这并不罕见。", reg: "书面",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "not uncommon", role: "complem", label: "表语（双重否定）" } ] },
    "gr18.1.4-e3": { en: "She is not unhappy.", zh: "她并非不开心。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "not unhappy", role: "complem", label: "表语" } ] },
    "gr18.1.4-e4": { en: "I think he isn't right.", zh: "（△ 中式直译）我认为他不对。", reg: "口语",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "think", role: "verb", label: "谓语" }, { w: "he isn't right", role: "object", label: "宾语从句（△ 否定未转移）" } ] },
    "gr18.1.4-e6": { en: "It is not common.", zh: "（△ 意思差之千里）这不常见。", reg: "通用",
      tagged: [ { w: "It", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "not common", role: "complem", label: "表语（△ 非双重否定）" } ] },
    "gr18.1.4-e7": { en: "I don't believe she will come.", zh: "我觉得她不会来。", reg: "口语",
      tagged: [ { w: "I", role: "subject", label: "主语" }, { w: "don't believe", role: "verb", label: "谓语（否定爬上来了）" }, { w: "she will come", role: "object", label: "宾语从句" } ] },
    "gr18.1.5-e1": { en: "Neither answer is right.", zh: "两个答案都不对。", reg: "通用",
      tagged: [ { w: "Neither answer", role: "subject", label: "主语" }, { w: "is", role: "verb", label: "谓语" }, { w: "right", role: "complem", label: "表语" } ] },
    "gr18.1.5-e2": { en: "There is a pen and two books.", zh: "有一支钢笔和两本书。", reg: "通用",
      tagged: [ { w: "There is", role: "verb", label: "there be" }, { w: "a pen and two books", role: "subject", label: "主语" } ] },
    "gr18.1.5-e3": { en: "To finish it is not easy.", zh: "完成它不容易。", reg: "通用",
      tagged: [ { w: "To finish it", role: "subject", label: "主语（不定式）" }, { w: "is", role: "verb", label: "谓语" }, { w: "not easy", role: "complem", label: "表语" } ] },
    "gr18.1.5-e4": { en: "A number of students is reading.", zh: "（✗ 错句）许多学生正在读书。", reg: "通用",
      tagged: [ { w: "A number of students", role: "subject", label: "主语" }, { w: "is reading", role: "verb", label: "谓语（✗ 单复数）" } ] },
    "gr18.1.5-e5": { en: "A number of students are reading.", zh: "许多学生正在读书。", reg: "通用",
      tagged: [ { w: "A number of students", role: "subject", label: "主语" }, { w: "are reading", role: "verb", label: "谓语" } ] },
    "gr18.1.5-e6": { en: "There have two books.", zh: "（✗ 错句）有两本书。", reg: "通用",
      tagged: [ { w: "There have", role: "verb", label: "there be（✗ 不用 have）" }, { w: "two books", role: "subject", label: "主语" } ] },
    "gr18.1.5-e7": { en: "There are two books.", zh: "有两本书。", reg: "通用",
      tagged: [ { w: "There are", role: "verb", label: "there be" }, { w: "two books", role: "subject", label: "主语" } ] }
  },
  units: [
    {
      id: "gr18-u1",
      title: "主谓一致与特殊句式",
      lessons: [
        {
          id: "gr18.1.1",
          title: "主谓一致三原则",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr18.1.1-p1",
              kind: "observe",
              title: "先看三句话：谓语跟谁走？",
              sentences: [
                {
                  id: "gr18.1.1-e1",
                  en: "Either you or he is right.",
                  zh: "你或他是对的。",
                  reg: "通用",
                  tagged: [
                    { w: "Either you or he", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "right", role: "complem", label: "表语" }
                  ]
                },
                {
                  id: "gr18.1.1-e2",
                  en: "The family are having dinner.",
                  zh: "家人们正在吃晚饭。",
                  reg: "通用",
                  tagged: [
                    { w: "The family", role: "subject", label: "主语（看作多人）" },
                    { w: "are having", role: "verb", label: "谓语" },
                    { w: "dinner", role: "object", label: "宾语" }
                  ]
                },
                {
                  id: "gr18.1.1-e3",
                  en: "A number of students are reading.",
                  zh: "许多学生正在读书。",
                  reg: "通用",
                  tagged: [
                    { w: "A number of students", role: "subject", label: "主语" },
                    { w: "are reading", role: "verb", label: "谓语" }
                  ]
                }
              ],
              guess: {
                q: "三句话的谓语各跟谁走？",
                options: ["都跟离动词最近的主语/实际意思走", "都是单数", "都是复数"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "主谓一致三原则：语法一致、意义一致、就近一致。"
            },
            /* ---------- p2 交互页：signal-light（单复数灯） ---------- */
            {
              id: "gr18.1.1-p2",
              kind: "interact",
              title: "拨动主语，看单复数灯",
              exploreTip: "拨动主语，看单复数灯：谓语跟谁走？",
              widgets: [
                {
                  type: "signal-light",
                  params: {
                    subjects: [
                      { s: "Either you or he", verb: "is", third: true },
                      { s: "The number of students", verb: "is", third: true },
                      { s: "Neither of the answers", verb: "is", third: true },
                      { s: "A number of students", verb: "are", third: false },
                      { s: "The family（看作多人）", verb: "are", third: false }
                    ],
                    lampOn: "单数灯亮：谓语用单数（跟就近主语/单数意义走）",
                    lampOff: "单数灯灭：谓语用复数（跟多人意义走）"
                  }
                }
              ],
              point: "就近看邻居（either…or…），意义看人数（family），a/the number of 要分清。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr18.1.1-p3",
              kind: "explain",
              title: "主谓一致三原则",
              lead: "还记得吗？你上一页拨到 Either you or he，单数灯亮了——谓语跟邻居 he 走。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr18.1.1-e1", "gr18.1.1-e2", "gr18.1.1-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "主谓一致：谓语的单复数必须和主语一致。三原则：语法一致、意义一致、就近一致。",
                  condition: "语法一致：单数主语→单数谓语。意义一致：family 看作多人→复数谓语。就近一致：either…or…/neither…nor…/not only…but also…/there be，谓语跟最近的主语走。a number of（许多）+ 复数；the number of（数量）+ 单数。"
                },
                {
                  type: "bridge",
                  zh: "汉语“是”不分单复数；英语 is/are、was/were 处处要配对。",
                  en: "英语的谓语像“应声虫”：主语单数它用单数，主语是“许多人”它用复数，两个主语抢它跟离得近的那个。",
                  unbridge: "规矩就这一条：谓语看主语脸色，主语是谁，谓语就穿什么衣服。"
                },
                {
                  type: "contrast",
                  wrong: "Either you or he are right.",
                  wrongZh: "（✗ 错句）",
                  right: "Either you or he is right.",
                  why: "either…or… 就近一致：离谓语近的是 he，用 is。"
                },
                {
                  type: "contrast",
                  wrong: "The number of students are fifty.",
                  wrongZh: "（✗ 错句）",
                  right: "The number of students is fifty.",
                  why: "主语是 the number（数量，单数），不是 students：数量是单数，用 is。"
                }
              ],
              point: "这就是三原则：语法看形式，意义看人数，就近看邻居。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr18.1.1-p4",
              kind: "quiz",
              title: "练一练：谓语配对",
              questions: [
                {
                  type: "choice",
                  stem: "Neither of them ___ right.",
                  options: ["is", "are", "be"],
                  answer: 0,
                  tip: "neither 单数意义，用 is。"
                },
                {
                  type: "choice",
                  stem: "A number of students ___ reading.",
                  options: ["are", "is", "be"],
                  answer: 0,
                  tip: "a number of（许多）+ 复数。"
                },
                {
                  type: "fill",
                  stemBefore: "The family",
                  stemAfter: "having dinner.（看作多人）",
                  answer: "are",
                  accept: ["are"],
                  tip: "意义一致：family 看作多人，用复数。"
                },
                {
                  type: "choice",
                  stem: "There ___ a book and two pens.",
                  options: ["is", "are", "be"],
                  answer: 0,
                  tip: "there be 就近：离 be 近的是 a book，用 is。"
                }
              ],
              point: "自查：三原则；a number of 复数 / the number of 单数；就近看邻居。"
            }
          ]
        },
        {
          id: "gr18.1.2",
          title: "there be 与倒装句一致",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr18.1.2-p1",
              kind: "observe",
              title: "先看三句话：倒装了，配对变吗？",
              sentences: [
                {
                  id: "gr18.1.2-e1",
                  en: "There goes the bell.",
                  zh: "铃响了。",
                  reg: "通用",
                  tagged: [
                    { w: "There", role: "adverb", label: "there" },
                    { w: "goes", role: "verb", label: "谓语" },
                    { w: "the bell", role: "subject", label: "主语" }
                  ]
                },
                {
                  id: "gr18.1.2-e2",
                  en: "Here comes the teacher.",
                  zh: "老师来了。",
                  reg: "通用",
                  tagged: [
                    { w: "Here", role: "adverb", label: "地点状语" },
                    { w: "comes", role: "verb", label: "谓语" },
                    { w: "the teacher", role: "subject", label: "主语" }
                  ]
                },
                {
                  id: "gr18.1.2-e3",
                  en: "There are two books on the desk.",
                  zh: "桌上有两本书。",
                  reg: "通用",
                  tagged: [
                    { w: "There are", role: "verb", label: "there be" },
                    { w: "two books", role: "subject", label: "主语" },
                    { w: "on the desk", role: "adverb", label: "状语" }
                  ]
                }
              ],
              guess: {
                q: "There goes the bell. 里，goes 跟谁配对？",
                options: ["跟 the bell（单数）", "跟 There", "随便"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "倒装不改配对：谓语还是跟真正的主语走。"
            },
            /* ---------- p2 交互页：G1 tagging（找真正主语） ---------- */
            {
              id: "gr18.1.2-p2",
              kind: "interact",
              title: "找一找：真正的主语",
              exploreTip: "点一个标签，再点一个词块：倒装后主语藏起来了，把它找出来。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "There", role: "adverb", label: "there" },
                      { w: "goes", role: "verb", label: "谓语" },
                      { w: "the bell", role: "subject", label: "真正主语" }
                    ],
                    slots: [
                      { role: "adverb", label: "there" },
                      { role: "verb", label: "谓语" },
                      { role: "subject", label: "真正主语" },
                      { role: "object", label: "宾语（干扰）" }
                    ],
                    hint: "There goes the bell：goes 到底跟谁配对？"
                  }
                }
              ],
              point: "There 只是“报幕员”，真正的主语在后面——谓语跟它走。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr18.1.2-p3",
              kind: "explain",
              title: "there be 与倒装句一致",
              lead: "There goes the bell. 主语在后，goes 仍加 -s——谓语跟谁配对？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr18.1.2-e1", "gr18.1.2-e2", "gr18.1.2-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "there be 与倒装句的谓语，都跟真正的主语保持一致（就近一致的一种）。",
                  condition: "There is/are：跟离 be 最近的名词走（There is a book and two pens.）；倒装句：There goes the bell.（goes 配 bell）；Here comes the teacher.（comes 配 teacher）；there be 表存在，永远不用 have（✗ There have）。"
                },
                {
                  type: "bridge",
                  zh: "汉语“铃响了”主语在前；英语 There goes the bell 主语躲到后面去了。",
                  en: "语序倒了，配对不能倒：goes 还是跟 the bell 配（单数），不能跟 There 配——There 只是个“报幕员”，真正的主角在后面。",
                  unbridge: "这是英语的规矩：找主语别看位置，看意思；谓语永远跟真正的主语走。"
                },
                {
                  type: "contrast",
                  wrong: "There have a book on the desk.",
                  wrongZh: "（✗ 错句）",
                  right: "There is a book on the desk.",
                  why: "表存在用 there be，不用 there have（gr12 回填再纠）。"
                },
                {
                  type: "contrast",
                  wrong: "There go the bell.",
                  wrongZh: "（✗ 错句）",
                  right: "There goes the bell.",
                  why: "真正的主语是 the bell（单数），goes 要加 s。"
                }
              ],
              point: "这就是就近一致：there be 看邻居；倒装找真正主语；there have 永错。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr18.1.2-p4",
              kind: "quiz",
              title: "练一练：找真正主语",
              questions: [
                {
                  type: "choice",
                  stem: "There goes the bell. 中谓语跟谁一致？",
                  options: ["the bell", "There", "goes 自己"],
                  answer: 0,
                  tip: "真正主语是 the bell（单数），goes 配它。"
                },
                {
                  type: "fill",
                  stemBefore: "There",
                  stemAfter: "two books on the desk.",
                  answer: "are",
                  accept: ["are"],
                  tip: "主语 two books 复数，用 are。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["There have a pen.", "There is a pen.", "There are a pen."],
                  answer: 1,
                  tip: "表存在用 there be；a pen 单数用 is。"
                },
                {
                  type: "choice",
                  stem: "Here comes the teacher. 是哪种句式？",
                  options: ["倒装", "强调", "there be"],
                  answer: 0,
                  tip: "地点状语开头，主语后置：倒装。"
                }
              ],
              point: "自查：there be 就近；倒装找真正主语；there have 永错。"
            }
          ]
        },
        {
          id: "gr18.1.3",
          title: "易错主语表",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr18.1.3-p1",
              kind: "observe",
              title: "先看三句话：特殊主语，谓语用什么数？",
              sentences: [
                {
                  id: "gr18.1.3-e1",
                  en: "Swimming is fun.",
                  zh: "游泳很有趣。",
                  reg: "通用",
                  tagged: [
                    { w: "Swimming", role: "subject", label: "主语（动名词）" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "fun", role: "complem", label: "表语" }
                  ]
                },
                {
                  id: "gr18.1.3-e2",
                  en: "To learn English is hard.",
                  zh: "学英语很难。",
                  reg: "通用",
                  tagged: [
                    { w: "To learn English", role: "subject", label: "主语（不定式）" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "hard", role: "complem", label: "表语" }
                  ]
                },
                {
                  id: "gr18.1.3-e3",
                  en: "Three years is a long time.",
                  zh: "三年是很长的时间。",
                  reg: "通用",
                  tagged: [
                    { w: "Three years", role: "subject", label: "主语（时间量）" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "a long time", role: "complem", label: "表语" }
                  ]
                }
              ],
              guess: {
                q: "Swimming、To learn English、Three years 作主语，谓语都用了什么数？",
                options: ["都用了单数", "都用了复数", "有单有复"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "这些“特殊主语”都配单数谓语。"
            },
            /* ---------- p2 交互页：G1 tagging（特殊主语标注） ---------- */
            {
              id: "gr18.1.3-p2",
              kind: "interact",
              title: "标一标：特殊主语",
              exploreTip: "点一个标签，再点一个词块：动名词作主语，谓语用什么数？",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Swimming", role: "subject", label: "主语" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "fun", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "Swimming is fun：Swimming 是动名词作主语，谓语是单数还是复数？"
                  }
                },
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "Three years", role: "subject", label: "主语" },
                      { w: "is", role: "verb", label: "谓语" },
                      { w: "a long time", role: "complem", label: "表语" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "complem", label: "表语" }
                    ],
                    hint: "Three years is a long time：时间量作主语，谓语用什么数？"
                  }
                }
              ],
              point: "特殊主语（动名词/不定式/量/从句）都算“一个整体”，配单数。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr18.1.3-p3",
              kind: "explain",
              title: "易错主语表",
              lead: "先看一眼上一页的结论：主语算'一个整体'，谓语用单数。这一页把它用在易错主语表。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr18.1.3-e1", "gr18.1.3-e2", "gr18.1.3-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "易错主语表（都配单数谓语）：动名词/不定式作主语；what 从句作主语；时间/金钱/距离作主语表“量”；单复数同形名词看语境。",
                  condition: "动名词/不定式主语→单数（✗ Swimming are）；“量”主语→单数；what 从句主语→单数；means 单复数同形，看 this/these。"
                },
                {
                  type: "bridge",
                  zh: "汉语“游泳很有趣”“三年很长”，“是”都不变；英语 is 也“不变”——但原因是主语算单数。",
                  en: "英语把这些主语都当“一个整体”：Swimming 是一件事，Three years 是一个时间段，what 从句是一个整体——整体就是单数，谓语用单数。",
                  unbridge: "英语就认这个理：主语是“一件事/一个量/一个整体”，谓语就用单数。"
                },
                {
                  type: "contrast",
                  wrong: "Swimming are fun.",
                  wrongZh: "（✗ 错句）",
                  right: "Swimming is fun.",
                  why: "动名词作主语是“一件事”，谓语用单数 is。"
                },
                {
                  type: "contrast",
                  wrong: "Three years are a long time.",
                  wrongZh: "（✗ 错句）",
                  right: "Three years is a long time.",
                  why: "Three years 表时间量，是一个整体，用单数 is。"
                }
              ],
              point: "这就是易错主语表：动名词/不定式/what 从句/量→单数；means 看 this/these。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr18.1.3-p4",
              kind: "quiz",
              title: "练一练：特殊主语配对",
              questions: [
                {
                  type: "choice",
                  stem: "Swimming is fun. 中主语是？",
                  options: ["动名词", "动词", "名词复数"],
                  answer: 0,
                  tip: "Swimming 是动名词作主语。"
                },
                {
                  type: "fill",
                  stemBefore: "To learn English",
                  stemAfter: "hard.",
                  answer: "is",
                  accept: ["is"],
                  tip: "不定式作主语，谓语单数。"
                },
                {
                  type: "choice",
                  stem: "What he said ___ true.",
                  options: ["is", "are", "be"],
                  answer: 0,
                  tip: "what 从句作主语是一个整体，用单数。"
                },
                {
                  type: "choice",
                  stem: "This new means ___ helpful.",
                  options: ["is", "are", "be"],
                  answer: 0,
                  tip: "means 单复数同形；this 提示单数，用 is。"
                }
              ],
              point: "自查：动名词/不定式/what 从句/量作主语→单数；means 看 this/these。"
            }
          ]
        },
        {
          id: "gr18.1.4",
          title: "特殊句式收尾",
          pages: [
            /* ---------- p1 观察页 ---------- */
            {
              id: "gr18.1.4-p1",
              kind: "observe",
              title: "先看三句话：not 到底否定谁？",
              sentences: [
                {
                  id: "gr18.1.4-e1",
                  en: "I don't think he is right.",
                  zh: "我认为他不对。",
                  reg: "口语",
                  tagged: [
                    { w: "I", role: "subject", label: "主语" },
                    { w: "don't think", role: "verb", label: "谓语（否定爬上来了）" },
                    { w: "he is right", role: "object", label: "宾语从句" }
                  ]
                },
                {
                  id: "gr18.1.4-e2",
                  en: "It is not uncommon.",
                  zh: "这并不罕见。",
                  reg: "书面",
                  tagged: [
                    { w: "It", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "not uncommon", role: "complem", label: "表语（双重否定）" }
                  ]
                },
                {
                  id: "gr18.1.4-e3",
                  en: "She is not unhappy.",
                  zh: "她并非不开心。",
                  reg: "通用",
                  tagged: [
                    { w: "She", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "not unhappy", role: "complem", label: "表语" }
                  ]
                }
              ],
              guess: {
                q: "I don't think he is right. 里，否定词 not 到底否定谁？",
                options: ["否定的是从句（他不对），not 爬到了主句", "否定的是 think", "没有否定"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "否定转移：not 从从句“爬”到主句；双重否定表肯定。"
            },
            /* ---------- p2 交互页：G1 tagging（否定转移标注） ---------- */
            {
              id: "gr18.1.4-p2",
              kind: "interact",
              title: "标一标：not 爬到哪了？",
              exploreTip: "点一个标签，再点一个词块：标出 not 爬到哪里去了。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      { w: "I", role: "subject", label: "主语" },
                      { w: "don't think", role: "verb", label: "谓语" },
                      { w: "he is right", role: "object", label: "宾语从句" }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语从句" }
                    ],
                    hint: "I don't think he is right：not 本该在从句里，它爬到哪了？"
                  }
                }
              ],
              point: "观点动词 + 否定：not 爬到主句；意思不变，只是换了座位。"
            },
            /* ---------- p3 讲解页 ---------- */
            {
              id: "gr18.1.4-p3",
              kind: "explain",
              title: "特殊句式收尾",
              lead: "not 爬到 think 前，not uncommon 又表肯定——否定词为何换座位？",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr18.1.4-e1", "gr18.1.4-e2", "gr18.1.4-e3"],
                  note: "先看现象，再看规则的“身份证”。"
                },
                {
                  type: "idcard",
                  rule: "否定转移：think/believe/suppose/imagine + 宾语从句表否定观点时，否定词从从句爬到主句。双重否定：not + 否定词缀（un-/in-）表强烈肯定。",
                  condition: "否定转移只用于 think/believe/suppose/imagine 等“观点动词”（口语高频）。双重否定 ≠ 语病，是修辞（书面常见）：It is not uncommon. = 很常见。"
                },
                {
                  type: "bridge",
                  zh: "汉语“我认为他不对”，否定在“不对”上；英语把 not 提前到 think 前。",
                  en: "英语口语把 not 从从句“爬”到主句动词前，听着更顺——意思没变，只是换了座位。双重否定 not uncommon 是“否定之否定”，表强烈肯定。",
                  unbridge: "不是汉语的讲法，是英语的规矩：观点动词 + 否定，not 爬到主句；not + 否定词 = 很肯定。"
                },
                {
                  type: "contrast",
                  wrong: "I think he isn't right.",
                  wrongZh: "（△ 中式直译，口语少用）",
                  right: "I don't think he is right.",
                  why: "口语习惯用否定转移：not 爬到 think 前；直译式口语少用。"
                },
                {
                  type: "contrast",
                  wrong: "It is not common.",
                  wrongZh: "（△ 意思差之千里）",
                  right: "It is not uncommon.",
                  why: "not uncommon = 很常见；not common = 不常见——双重否定表肯定，别拆错。"
                }
              ],
              point: "这就是收尾：观点动词 not 爬主句；not + 否定词 = 很肯定。",
              pointScroll: true
            },
            /* ---------- p4 练习页 ---------- */
            {
              id: "gr18.1.4-p4",
              kind: "quiz",
              title: "练一练：否定去哪了？",
              questions: [
                {
                  type: "choice",
                  stem: "I don't think he is right. 的意思是？",
                  options: ["我认为他不对", "我不思考他对不对", "他认为我不对"],
                  answer: 0,
                  tip: "否定转移：not 爬到主句，否定的是从句。"
                },
                {
                  type: "choice",
                  stem: "It is not uncommon. 的意思是？",
                  options: ["很常见", "不常见", "一般"],
                  answer: 0,
                  tip: "双重否定表强烈肯定。"
                },
                {
                  type: "choice",
                  stem: "能发生否定转移的动词是？",
                  options: ["think", "know", "see"],
                  answer: 0,
                  tip: "think/believe 等观点动词才玩否定转移。"
                },
                {
                  type: "fill",
                  stemBefore: "She is",
                  stemAfter: "unhappy.（并非不开心，双重否定）",
                  answer: "not",
                  accept: ["not"],
                  tip: "not + unhappy = 并非不开心。"
                }
              ],
              point: "自查：观点动词 not 爬主句；not + 否定词 = 很肯定。"
            }
          ]
        },
        {
          id: "gr18.1.5",
          title: "本章小结与习题",
          pages: [
            /* ---------- p1 观察页：回顾 ---------- */
            {
              id: "gr18.1.5-p1",
              kind: "observe",
              title: "三句话复习：本章三个考点",
              sentences: [
                {
                  id: "gr18.1.5-e1",
                  en: "Neither answer is right.",
                  zh: "两个答案都不对。",
                  reg: "通用",
                  tagged: [
                    { w: "Neither answer", role: "subject", label: "主语" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "right", role: "complem", label: "表语" }
                  ]
                },
                {
                  id: "gr18.1.5-e2",
                  en: "There is a pen and two books.",
                  zh: "有一支钢笔和两本书。",
                  reg: "通用",
                  tagged: [
                    { w: "There is", role: "verb", label: "there be" },
                    { w: "a pen and two books", role: "subject", label: "主语" }
                  ]
                },
                {
                  id: "gr18.1.5-e3",
                  en: "To finish it is not easy.",
                  zh: "完成它不容易。",
                  reg: "通用",
                  tagged: [
                    { w: "To finish it", role: "subject", label: "主语（不定式）" },
                    { w: "is", role: "verb", label: "谓语" },
                    { w: "not easy", role: "complem", label: "表语" }
                  ]
                }
              ],
              guess: {
                q: "三句话分别考了本章哪个知识点？",
                options: ["就近一致 / there be 就近 / 不定式主语", "都是就近一致", "都是 there be"],
                answer: 0,
                note: "先猜，再看色块验证——猜错也没关系，只记录不判分。"
              },
              point: "三原则 + 易错主语 + 特殊句式，一网打尽。"
            },
            /* ---------- p2 交互页：Y4 成分标注练习（综合） ---------- */
            {
              id: "gr18.1.5-p2",
              kind: "interact",
              title: "综合练习：标出成分",
              exploreTip: "限时标注三句话的成分：顺手检查主谓一致。",
              widgets: [
                {
                  type: "constituent-quiz",
                  params: {
                    items: [
                      { id: "q1", sentence: [ { w: "Either you or he", role: "subject" }, { w: "is", role: "verb" }, { w: "right", role: "complem" } ] },
                      { id: "q2", sentence: [ { w: "Swimming", role: "subject" }, { w: "is", role: "verb" }, { w: "fun", role: "complem" } ] },
                      { id: "q3", sentence: [ { w: "There", role: "adverb" }, { w: "goes", role: "verb" }, { w: "the bell", role: "subject" } ] }
                    ],
                    slots: [
                      { role: "subject", label: "主语" },
                      { role: "verb", label: "谓语" },
                      { role: "object", label: "宾语" },
                      { role: "adverb", label: "状语" },
                      { role: "complem", label: "补语" }
                    ],
                    rounds: 3,
                    hint: "综合练习：标出成分，顺手检查主谓一致。"
                  }
                }
              ],
              point: "找主语看意思不看位置；就近看邻居；特殊主语记单数。"
            },
            /* ---------- p3 讲解页：本章总表 ---------- */
            {
              id: "gr18.1.5-p3",
              kind: "explain",
              title: "本章小结：总表",
              lead: "本章总表：三原则、there be、易错主语、否定转移。一张总表收网。",
              blocks: [
                {
                  type: "examples",
                  ids: ["gr18.1.5-e1", "gr18.1.5-e2", "gr18.1.5-e3"],
                  note: "先看现象，再看总表。"
                },
                {
                  type: "idcard",
                  rule: "本章总表：主谓一致三原则（语法/意义/就近）+ there be 与倒装（就近）+ 易错主语表（单数）+ 特殊句式（否定转移/双重否定）。",
                  condition: "高考改错高频：either…or… 就近；a number of vs the number of；there be 就近；动名词主语单数；there have 永错。"
                },
                {
                  type: "bridge",
                  zh: "汉语主谓不用配对；英语处处配对——本章就是配对总复习。",
                  en: "高考改错最爱考主谓一致：看到 either…or… 先看邻居，看到 there be 先看邻居，看到动名词主语直接单数——三秒判单复数。",
                  unbridge: "记住：找主语看意思不看位置；就近看邻居；特殊主语记单数。"
                },
                {
                  type: "contrast",
                  wrong: "A number of students is reading.",
                  wrongZh: "（✗ 错句）",
                  right: "A number of students are reading.",
                  why: "a number of（许多）+ 复数谓语。"
                },
                {
                  type: "contrast",
                  wrong: "There have two books.",
                  wrongZh: "（✗ 错句）",
                  right: "There are two books.",
                  why: "表存在用 there be；two books 复数用 are。"
                }
              ],
              point: "这就是本章：三原则；就近看邻居；特殊主语单数；否定转移。",
              pointScroll: true
            },
            /* ---------- p4 练习页：综合 ---------- */
            {
              id: "gr18.1.5-p4",
              kind: "quiz",
              title: "综合练习",
              questions: [
                {
                  type: "choice",
                  stem: "The number of students ___ fifty.",
                  options: ["is", "are", "be"],
                  answer: 0,
                  tip: "the number of（数量）单数。"
                },
                {
                  type: "choice",
                  stem: "What she said ___ true.",
                  options: ["is", "are", "be"],
                  answer: 0,
                  tip: "what 从句主语是整体，单数。"
                },
                {
                  type: "fill",
                  stemBefore: "Neither of the boys",
                  stemAfter: "here.",
                  answer: "is",
                  accept: ["is"],
                  tip: "neither 单数意义，用 is。"
                },
                {
                  type: "choice",
                  stem: "I don't suppose he will come. 的意思是？",
                  options: ["我觉得他不会来", "我不猜他来不来", "他不觉得我会来"],
                  answer: 0,
                  tip: "否定转移：not 爬到 suppose 前。"
                }
              ],
              point: "自查：三原则；就近看邻居；特殊主语单数；否定转移。"
            }
          ]
        }
      ]
    }
  ]
};