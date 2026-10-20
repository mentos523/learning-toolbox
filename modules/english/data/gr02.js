/* ============================================================
 * 学习工具箱 · 英语 · 语法 gr02：代词
 *
 * 数据口径（M5）：window.ENG_CH["gr02"] = { id, title, units[] }，
 * 与数学 window.MATH_CH 同构；语法章节注册独立命名空间，
 * 与数学引擎、讲词根代码零交叉。
 *
 * 内容分工：规则表述=英语专家队；讲解话术=黄队；
 * 例句=语法生产A队撰写（D3 台账状态 drafted，
 * 待英语专家队初审 -> 红队终审 -> final_passed 后入库）。
 * 讲解页 blocks.type="examples" 按台账 id 引用正例；
 * 反例只进台账（rule 注 counter），页面 contrast 块内联引用。
 * 交互部件：tagging / signal-light（试点）+ sentence-builder（G3）/
 * clause-slots（G5）/ morph-dressup（G6）/ constituent-quiz（Y4）
 *（蓝队 commit 4e22ba2 补齐；G2/G4 保持降级不做）。
 * ============================================================ */
window.ENG_CH = window.ENG_CH || {};
window.ENG_CH["gr02"] = {
  id: "gr02",
  title: "代词",
  /* 例句索引：键 = D3 台账例句 id（正例）；文本与台账逐字一致。 */
  sentences: {
    "gr02.1.1-e1": { en: "Give it to me.", zh: "把它给我。", reg: "口语",
      tagged: [ { w: "it", role: "object", label: "宾语·宾格" }, { w: "me", role: "object", label: "宾语·宾格" } ] },
    "gr02.1.1-e2": { en: "She and I are friends.", zh: "她和我是朋友。", reg: "通用",
      tagged: [ { w: "She", role: "subject", label: "主语·主格" }, { w: "I", role: "subject", label: "主语·主格" } ] },
    "gr02.1.1-e3": { en: "He likes her.", zh: "他喜欢她。", reg: "通用",
      tagged: [ { w: "He", role: "subject", label: "主语·主格" }, { w: "her", role: "object", label: "宾语·宾格" } ] },
    "gr02.1.1-e4": { en: "They help us.", zh: "他们帮助我们。", reg: "通用",
      tagged: [ { w: "They", role: "subject", label: "主语·主格" }, { w: "us", role: "object", label: "宾语·宾格" } ] },
    "gr02.1.1-e5": { en: "I saw him yesterday.", zh: "我昨天看到他了。", reg: "通用",
      tagged: [ { w: "him", role: "object", label: "宾语·宾格" } ] },
    "gr02.1.1-e6": { en: "We like them.", zh: "我们喜欢他们。", reg: "通用",
      tagged: [ { w: "them", role: "object", label: "宾语·宾格" } ] },
    "gr02.1.2-e1": { en: "This is mine.", zh: "这是我的。", reg: "通用",
      tagged: [ { w: "mine", role: "complem", label: "表语·名词性物主代词" } ] },
    "gr02.1.2-e2": { en: "This is my book.", zh: "这是我的书。", reg: "通用",
      tagged: [ { w: "my", role: "attrib", label: "定语·形容词性物主代词" }, { w: "book", role: "complem", label: "表语·名词" } ] },
    "gr02.1.2-e3": { en: "A friend of mine is a doctor.", zh: "我的一个朋友是医生。", reg: "通用",
      tagged: [ { w: "of mine", role: "attrib", label: "定语·of+名词性" } ] },
    "gr02.1.2-e4": { en: "Your bag is red, but mine is blue.", zh: "你的包是红的，但我的是蓝的。", reg: "通用",
      tagged: [ { w: "Your", role: "attrib", label: "定语·形容词性" }, { w: "mine", role: "subject", label: "主语·名词性" } ] },
    "gr02.1.2-e5": { en: "Is this yours?", zh: "这是你的吗？", reg: "口语",
      tagged: [ { w: "yours", role: "complem", label: "表语·名词性物主代词" } ] },
    "gr02.1.2-e6": { en: "Their house is big.", zh: "他们的房子很大。", reg: "通用",
      tagged: [ { w: "Their", role: "attrib", label: "定语·形容词性" } ] },
    "gr02.1.3-e1": { en: "He taught himself English.", zh: "他自学了英语。", reg: "通用",
      tagged: [ { w: "himself", role: "object", label: "宾语·反身代词" } ] },
    "gr02.1.3-e2": { en: "I hurt myself.", zh: "我伤到了自己。", reg: "通用",
      tagged: [ { w: "myself", role: "object", label: "宾语·反身代词" } ] },
    "gr02.1.3-e3": { en: "This is my book, and that is yours.", zh: "这是我的书，那是你的。", reg: "通用",
      tagged: [ { w: "This", role: "subject", label: "主语·指示代词（近）" }, { w: "that", role: "subject", label: "主语·指示代词（远）" } ] },
    "gr02.1.3-e4": { en: "These apples are red.", zh: "这些苹果是红的。", reg: "通用",
      tagged: [ { w: "These", role: "attrib", label: "定语·指示代词（复数）" }, { w: "apples", role: "subject", label: "主语" } ] },
    "gr02.1.3-e5": { en: "She did it herself.", zh: "她亲自做的。", reg: "通用",
      tagged: [ { w: "herself", role: "adverb", label: "状语·强调" } ] },
    "gr02.1.3-e6": { en: "Help yourself to some fish.", zh: "请随便吃点鱼。", reg: "口语",
      tagged: [ { w: "yourself", role: "object", label: "宾语·反身代词" } ] },
    "gr02.2.1-e1": { en: "Who broke the window?", zh: "谁打破了窗户？", reg: "通用",
      tagged: [ { w: "Who", role: "subject", label: "主语·疑问代词" }, { w: "broke", role: "verb", label: "谓语" } ] },
    "gr02.2.1-e2": { en: "Whose bag is this?", zh: "这是谁的包？", reg: "通用",
      tagged: [ { w: "Whose", role: "attrib", label: "定语·疑问代词" } ] },
    "gr02.2.1-e3": { en: "Which color do you like?", zh: "你喜欢哪种颜色？", reg: "通用",
      tagged: [ { w: "Which", role: "attrib", label: "定语·疑问代词" } ] },
    "gr02.2.1-e4": { en: "What is your name?", zh: "你叫什么名字？", reg: "通用",
      tagged: [ { w: "What", role: "subject", label: "主语·疑问代词" } ] },
    "gr02.2.1-e5": { en: "Who did you meet?", zh: "你见到谁了？", reg: "通用",
      tagged: [ { w: "Who", role: "object", label: "宾语·疑问代词" }, { w: "did", role: "verb", label: "助动词" } ] },
    "gr02.2.1-e6": { en: "What did he say?", zh: "他说了什么？", reg: "通用",
      tagged: [ { w: "What", role: "object", label: "宾语·疑问代词" } ] },
    "gr02.2.2-e1": { en: "Is there anything wrong?", zh: "有什么不对吗？", reg: "通用",
      tagged: [ { w: "anything", role: "subject", label: "主语·any-系列" }, { w: "wrong", role: "complem", label: "表语" } ] },
    "gr02.2.2-e2": { en: "I want something to eat.", zh: "我想吃点东西。", reg: "通用",
      tagged: [ { w: "something", role: "object", label: "宾语·some-系列" } ] },
    "gr02.2.2-e3": { en: "There is nothing in the box.", zh: "盒子里什么都没有。", reg: "通用",
      tagged: [ { w: "nothing", role: "subject", label: "主语·no-系列" } ] },
    "gr02.2.2-e4": { en: "Everyone is here.", zh: "大家都到了。", reg: "通用",
      tagged: [ { w: "Everyone", role: "subject", label: "主语·every-系列" }, { w: "is", role: "verb", label: "谓语·单数" } ] },
    "gr02.2.2-e5": { en: "All of us are students.", zh: "我们都是学生。", reg: "通用",
      tagged: [ { w: "All", role: "subject", label: "主语" } ] },
    "gr02.2.2-e6": { en: "Each student has a book.", zh: "每个学生都有一本书。", reg: "通用",
      tagged: [ { w: "Each", role: "attrib", label: "定语" } ] },
    "gr02.2.2-e7": { en: "Both of them are teachers.", zh: "他们俩都是老师。", reg: "通用",
      tagged: [ { w: "Both", role: "subject", label: "主语" } ] },
    "gr02.2.3-e1": { en: "Everyone should do his best.", zh: "每个人都应该尽力。", reg: "书面",
      tagged: [ { w: "Everyone", role: "subject", label: "主语" }, { w: "his", role: "attrib", label: "定语·代词" } ] },
    "gr02.2.3-e2": { en: "Tom lost his key.", zh: "汤姆丢了钥匙。", reg: "通用",
      tagged: [ { w: "Tom", role: "subject", label: "主语" }, { w: "his", role: "attrib", label: "定语·代词" } ] },
    "gr02.2.3-e3": { en: "The students are reading their books.", zh: "学生们在看他们的书。", reg: "通用",
      tagged: [ { w: "students", role: "subject", label: "主语·复数" }, { w: "their", role: "attrib", label: "定语·代词（复数）" } ] },
    "gr02.2.3-e4": { en: "She and I did our homework.", zh: "她和我做了我们的作业。", reg: "通用",
      tagged: [ { w: "She and I", role: "subject", label: "主语" }, { w: "our", role: "attrib", label: "定语·代词" } ] },
    "gr02.2.3-e5": { en: "A friend of mine lost his wallet.", zh: "我的一个朋友丢了钱包。", reg: "通用",
      tagged: [ { w: "friend", role: "subject", label: "主语" }, { w: "his", role: "attrib", label: "定语·代词" } ] },
  },
  units: [
    {
      id: "gr02-u1",
      title: "人称、物主、反身、指示代词",
      lessons: [
      {
        id: "gr02.1.1",
        title: "人称代词",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr02.1.1-p1",
              kind: "observe",
              title: "'我'有两种写法：I 和 me",
              point: "人称代词有'岗位制'：站主语岗穿主格（I），站宾语岗穿宾格（me）——汉语'我'不分，英语分。",
              sentences: [
                {
                  id: "gr02.1.1-e1",
                  en: "Give it to me.",
                  zh: "把它给我。",
                  reg: "口语",
                  tagged: [ { w: "it", role: "object", label: "宾语·宾格" }, { w: "me", role: "object", label: "宾语·宾格" } ]
                },
                {
                  id: "gr02.1.1-e2",
                  en: "She and I are friends.",
                  zh: "她和我是朋友。",
                  reg: "通用",
                  tagged: [ { w: "She", role: "subject", label: "主语·主格" }, { w: "I", role: "subject", label: "主语·主格" } ]
                },
                {
                  id: "gr02.1.1-e3",
                  en: "He likes her.",
                  zh: "他喜欢她。",
                  reg: "通用",
                  tagged: [ { w: "He", role: "subject", label: "主语·主格" }, { w: "her", role: "object", label: "宾语·宾格" } ]
                }
              ],
              guess: {
                q: "I/me、he/him、she/her——同一个'我'，为什么有两种写法？",
                options: [ "站主语用 I，站宾语用 me——换岗换衣服", "随便用", "me 是复数" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 成分标注（岗位制） ---------- */
            {
              id: "gr02.1.1-p2",
              kind: "interact",
              title: "岗位制：站错岗报警",
              exploreTip: "给词块贴标签。She 站主语岗穿主格，it/me 站宾语岗穿宾格——站错岗就错了。",
              point: "岗位制口诀：主语岗→主格，宾语岗→宾格，并列主语也用主格（She and I）。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "She",
                        role: "nom",
                        label: "主格"
                      },
                      {
                        w: "gave",
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        w: "it",
                        role: "acc",
                        label: "宾格"
                      },
                      {
                        w: "to",
                        role: "prep",
                        label: "介词"
                      },
                      {
                        w: "me",
                        role: "acc",
                        label: "宾格"
                      }
                    ],
                    slots: [
                      {
                        role: "nom",
                        label: "主格（I/she）"
                      },
                      {
                        role: "acc",
                        label: "宾格（me/her）"
                      },
                      {
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        role: "prep",
                        label: "介词"
                      }
                    ],
                    hint: "She gave it to me.——主语岗穿主格，宾语岗穿宾格，换岗换衣服。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：主格/宾格 + 条件卡 + 反例 ---------- */
            {
              id: "gr02.1.1-p3",
              kind: "explain",
              title: "人称代词：主格站主语，宾格站宾语",
              lead: "还记得吗？上一页 She 穿主格站主语，me 穿宾格站宾语——换岗就换衣服。",
              point: "这就是人称代词：主格站主语，宾格站宾语，并列主语用主格。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr02.1.1-e1", "gr02.1.1-e2", "gr02.1.1-e3" ],
                  note: "先看现象：主语岗 vs 宾语岗。"
                },
                {
                  type: "idcard",
                  rule: "人称代词分主格（I/you/he/she/it/we/they）与宾格（me/you/him/her/it/us/them）：作主语用主格，作宾语/介词宾语用宾格。",
                  condition: "并列主语用主格：She and I（不是 Me and my friend，口语常见但书面须改）。you/it 主宾同形，不用换。"
                },
                {
                  type: "bridge",
                  zh: "汉语'我'站哪都叫'我'，主语宾语一个样。",
                  en: "英语'我'换岗换衣服：I（主语）→ me（宾语）。Give it to me 的 me 是宾语，穿宾格衣服。",
                  unbridge: "这是英语的岗位规矩：先看代词站哪个岗，再选衣服。"
                },
                {
                  type: "contrast",
                  wrong: "Me and my friend went to the park.",
                  wrongZh: "（✗ 书面语错句：主语并列用宾格）",
                  right: "My friend and I went to the park.",
                  why: "主语并列用主格：I——Me 是宾格，站不了主语岗。（口语里有人这么说，书面语不行。）"
                },
                {
                  type: "contrast",
                  wrong: "Her likes apples.",
                  wrongZh: "（✗ 错句：主语用宾格）",
                  right: "She likes apples.",
                  why: "主语用主格 She——Her 是宾格，只能站宾语岗。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr02.1.1-p4",
              kind: "quiz",
              title: "练一练：换岗换衣服",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Me and Tom are friends.", "Tom and I are friends.", "Tom and me are friends."],
                  answer: 1,
                  tip: "主语并列用主格 I——Me 站不了主语岗。"
                },
                {
                  type: "fill",
                  stemBefore: "Give it to",
                  stemAfter: ".（I / me）",
                  answer: "me",
                  accept: ["me"],
                  tip: "to 是介词，介词后面跟宾格 me。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Her likes apples.", "She likes apples.", "Her like apples."],
                  answer: 1,
                  tip: "主语岗穿主格 She——Her 是宾格，只能站宾语岗。"
                },
                {
                  type: "fill",
                  stemBefore: "Let",
                  stemAfter: "go first.（he / him）",
                  answer: "him",
                  accept: ["him"],
                  tip: "Let 后面是宾语岗，用宾格 him。"
                }
              ],
              point: "自查：先看代词在句中当主语还是宾语，再选格。"
            }
        ]
      },
      {
        id: "gr02.1.2",
        title: "物主代词",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr02.1.2-p1",
              kind: "observe",
              title: "my 和 mine：都是'我的'，分工不同",
              point: "my 是'形容词性'（my+名词），mine 是'名词性'（独立）——my 后面不能空着。",
              sentences: [
                {
                  id: "gr02.1.2-e1",
                  en: "This is mine.",
                  zh: "这是我的。",
                  reg: "通用",
                  tagged: [ { w: "mine", role: "complem", label: "表语·名词性物主代词" } ]
                },
                {
                  id: "gr02.1.2-e2",
                  en: "This is my book.",
                  zh: "这是我的书。",
                  reg: "通用",
                  tagged: [ { w: "my", role: "attrib", label: "定语·形容词性物主代词" }, { w: "book", role: "complem", label: "表语·名词" } ]
                },
                {
                  id: "gr02.1.2-e3",
                  en: "A friend of mine is a doctor.",
                  zh: "我的一个朋友是医生。",
                  reg: "通用",
                  tagged: [ { w: "of mine", role: "attrib", label: "定语·of+名词性" } ]
                }
              ],
              guess: {
                q: "my 和 mine 都是'我的'，分工有什么不一样？",
                options: [ "my 后面必须跟名词，mine 自己独立", "可以互换", "mine 是复数" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作形容词性/名词性辨析标注 ---------- */
            {
              id: "gr02.1.2-p2",
              kind: "interact",
              title: "my 后面不能空着",
              exploreTip: "给词块贴标签。my 后面必须跟 book（名词），mine 自己独立——of 后面跟 mine，不跟 my。",
              point: "my 是'半成品'（+名词），mine 是'成品'（独立）——of 后面跟成品。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "A friend",
                        role: "noun",
                        label: "名词"
                      },
                      {
                        w: "of",
                        role: "prep",
                        label: "介词"
                      },
                      {
                        w: "mine",
                        role: "poss-n",
                        label: "名词性物主代词"
                      },
                      {
                        w: "has",
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        w: "my",
                        role: "poss-a",
                        label: "形容词性物主代词"
                      },
                      {
                        w: "book",
                        role: "noun",
                        label: "名词"
                      }
                    ],
                    slots: [
                      {
                        role: "poss-a",
                        label: "形容词性（my+名词）"
                      },
                      {
                        role: "poss-n",
                        label: "名词性（独立）"
                      },
                      {
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        role: "prep",
                        label: "介词"
                      },
                      {
                        role: "noun",
                        label: "名词"
                      }
                    ],
                    hint: "A friend of mine has my book.——of 后面跟成品 mine，my 后面必须跟名词 book。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：两类物主代词 + 条件卡 + 反例 ---------- */
            {
              id: "gr02.1.2-p3",
              kind: "explain",
              title: "物主代词：my+名词，mine 独立",
              lead: "先看一眼上一页的结论：my 是半成品，mine 是成品。这一页把它用在两类物主代词分工上。",
              point: "这就是物主代词：my+名词，mine 独立，of+mine。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr02.1.2-e1", "gr02.1.2-e2", "gr02.1.2-e3" ],
                  note: "先看现象：my+名词 vs mine 独立。"
                },
                {
                  type: "idcard",
                  rule: "物主代词分两类：形容词性（my/your/his/her/its/our/their）后面必须跟名词；名词性（mine/yours/his/hers/its/ours/theirs）独立使用，= 形容词性+名词。",
                  condition: "of + 名词性：a friend of mine（我的一个朋友）。his/its 两类同形：This is his = '这是他的（东西）'。"
                },
                {
                  type: "bridge",
                  zh: "汉语'我的''我的书'，'的'字通用，不用分两类。",
                  en: "英语不一样：my 是'半成品'，后面必须跟名词（my book）；mine 是'成品'，自己独立（This is mine）。of 后面跟成品：a friend of mine。",
                  unbridge: "这是英语的成品规矩：my 后面不能空着，空着就用 mine。"
                },
                {
                  type: "contrast",
                  wrong: "This is my.",
                  wrongZh: "（✗ 错句：my 后面空了）",
                  right: "This is mine.",
                  why: "my 后面必须跟名词——后面没名词，用独立的 mine。"
                },
                {
                  type: "contrast",
                  wrong: "A friend of my is a doctor.",
                  wrongZh: "（✗ 错句：of 后用 my）",
                  right: "A friend of mine is a doctor.",
                  why: "of 后面跟名词性 mine，不跟 my。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr02.1.2-p4",
              kind: "quiz",
              title: "练一练：my 还是 mine？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["This is my.", "This is mine.", "This is me."],
                  answer: 1,
                  tip: "my 后面不能空着——后面没名词，用独立的 mine。"
                },
                {
                  type: "fill",
                  stemBefore: "This is",
                  stemAfter: "book.（my / mine）",
                  answer: "my",
                  accept: ["my"],
                  tip: "book 是名词，my 后面必须跟名词。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["A friend of my is a doctor.", "A friend of mine is a doctor.", "A friend of me is a doctor."],
                  answer: 1,
                  tip: "of 后面跟名词性 mine——my 是半成品，不能自己站。"
                },
                {
                  type: "fill",
                  stemBefore: "Your bag is red, but",
                  stemAfter: "is blue.（my / mine）",
                  answer: "mine",
                  accept: ["mine"],
                  tip: "but 后面是主语岗、后面又没名词——用独立的 mine。"
                }
              ],
              point: "自查：后面有名词用 my/your，没名词用 mine/yours。"
            }
        ]
      },
      {
        id: "gr02.1.3",
        title: "反身与指示代词",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr02.1.3-p1",
              kind: "observe",
              title: "himself、this/that：它们'指'什么？",
              point: "反身代词指'自己'（-self）；指示代词指'哪个'（this 近/that 远，these/those 复数）。",
              sentences: [
                {
                  id: "gr02.1.3-e1",
                  en: "He taught himself English.",
                  zh: "他自学了英语。",
                  reg: "通用",
                  tagged: [ { w: "himself", role: "object", label: "宾语·反身代词" } ]
                },
                {
                  id: "gr02.1.3-e3",
                  en: "This is my book, and that is yours.",
                  zh: "这是我的书，那是你的。",
                  reg: "通用",
                  tagged: [ { w: "This", role: "subject", label: "主语·指示代词（近）" }, { w: "that", role: "subject", label: "主语·指示代词（远）" } ]
                },
                {
                  id: "gr02.1.3-e4",
                  en: "These apples are red.",
                  zh: "这些苹果是红的。",
                  reg: "通用",
                  tagged: [ { w: "These", role: "attrib", label: "定语·指示代词（复数）" }, { w: "apples", role: "subject", label: "主语" } ]
                }
              ],
              guess: {
                q: "himself、this/that、these/those——它们分别'指'什么？",
                options: [ "himself 指自己；this/these 指近处，that/those 指远处", "都可以互换", "himself 指别人" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作反身代词标注 ---------- */
            {
              id: "gr02.1.3-p2",
              kind: "interact",
              title: "-self：动作回到自己身上",
              exploreTip: "给词块贴标签。himself 指'他自己'——动作回到动作发出者身上，就用 -self。",
              point: "-self 跟主语走：He→himself，I→myself，They→themselves。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "He",
                        role: "nom",
                        label: "主格"
                      },
                      {
                        w: "taught",
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        w: "himself",
                        role: "reflex",
                        label: "反身代词"
                      },
                      {
                        w: "English",
                        role: "noun",
                        label: "名词"
                      }
                    ],
                    slots: [
                      {
                        role: "nom",
                        label: "主格"
                      },
                      {
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        role: "reflex",
                        label: "反身代词（-self）"
                      },
                      {
                        role: "noun",
                        label: "名词"
                      }
                    ],
                    hint: "He taught himself English.——'教'的动作回到 He 自己身上，所以用 himself，不用 him。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：反身/指示代词 + 条件卡 + 反例 ---------- */
            {
              id: "gr02.1.3-p3",
              kind: "explain",
              title: "反身与指示代词：-self 指自己，this/that 指远近",
              lead: "还记得吗？上一页 himself 把动作还给了 He——'自己'。",
              point: "这就是反身与指示代词：-self 指自己且跟主语一致；this/that/these/those 看远近、配单复数。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr02.1.3-e1", "gr02.1.3-e5", "gr02.1.3-e3" ],
                  note: "先看现象：-self 指自己，this/that 指远近。"
                },
                {
                  type: "idcard",
                  rule: "反身代词（myself/yourself/himself/herself/itself/ourselves/yourselves/themselves）：指'自己'，或强调'亲自'。指示代词：this（近·单）/that（远·单）/these（近·复）/those（远·复）。",
                  condition: "反身代词的人称和数必须和主语一致（He→himself, They→themselves）。指示代词单复数必须和名词配对（this apple / these apples）。"
                },
                {
                  type: "bridge",
                  zh: "汉语'自己''这/那'不用变，'他自己''他们自己'一个样。",
                  en: "英语 -self 要跟着主语变：I→myself，he→himself，they→themselves——'自己'也要换衣服。",
                  unbridge: "这是英语的一致规矩：-self 和主语人称数一致。"
                },
                {
                  type: "contrast",
                  wrong: "He taught him English.（想说'他自学'）",
                  wrongZh: "（✗ 错句：him 指别人）",
                  right: "He taught himself English.",
                  why: "想说'自己'，必须用 himself——him 指的是别人。"
                },
                {
                  type: "contrast",
                  wrong: "This apples are red.",
                  wrongZh: "（✗ 错句：单复数不配对）",
                  right: "These apples are red.",
                  why: "apples 复数，指示代词用复数 these——this/these 单复数要配对。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr02.1.3-p4",
              kind: "quiz",
              title: "练一练：-self 跟谁走？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["She did it herself.", "She did it himself.", "She did it myself."],
                  answer: 0,
                  tip: "-self 跟主语走：主语是 She，用 herself。"
                },
                {
                  type: "fill",
                  stemBefore: "He taught",
                  stemAfter: "English.（him / himself）",
                  answer: "himself",
                  accept: ["himself"],
                  tip: "想说'他自己'，必须用 himself——him 指的是别人。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["This apples are red.", "These apples are red.", "That apples are red."],
                  answer: 1,
                  tip: "apples 是复数，指示代词用复数 these。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "is my book, and that is yours.（This / These）",
                  answer: "This",
                  accept: ["This"],
                  tip: "book 是单数，近处用 this。"
                }
              ],
              point: "自查：-self 看主语；this/that 看远近、看单复数。"
            }
        ]
      }
      ]
    },
    {
      id: "gr02-u2",
      title: "疑问、不定代词与指代一致",
      lessons: [
      {
        id: "gr02.2.1",
        title: "疑问代词",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr02.2.1-p1",
              kind: "observe",
              title: "Who broke… vs Who did you meet…",
              point: "who 自己是主语时，后面直接跟谓语，不加 did——主语已经在了，不用再请 did。",
              sentences: [
                {
                  id: "gr02.2.1-e1",
                  en: "Who broke the window?",
                  zh: "谁打破了窗户？",
                  reg: "通用",
                  tagged: [ { w: "Who", role: "subject", label: "主语·疑问代词" }, { w: "broke", role: "verb", label: "谓语" } ]
                },
                {
                  id: "gr02.2.1-e5",
                  en: "Who did you meet?",
                  zh: "你见到谁了？",
                  reg: "通用",
                  tagged: [ { w: "Who", role: "object", label: "宾语·疑问代词" }, { w: "did", role: "verb", label: "助动词" } ]
                },
                {
                  id: "gr02.2.1-e2",
                  en: "Whose bag is this?",
                  zh: "这是谁的包？",
                  reg: "通用",
                  tagged: [ { w: "Whose", role: "attrib", label: "定语·疑问代词" } ]
                }
              ],
              guess: {
                q: "两个 who，为什么一个加 did 一个不加？",
                options: [ "who 作主语不倒装，作宾语才倒装", "第一句漏了 did", "随便" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作疑问代词成分标注 ---------- */
            {
              id: "gr02.2.1-p2",
              kind: "interact",
              title: "who 作主语：did 不用出场",
              exploreTip: "给词块贴标签。who 自己就是主语——后面直接跟 broke，不加 did。想想：主语已经在了，还请 did 来干嘛？",
              point: "占位规矩：主语位被 who 占了，did 就不用出场。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [
                      {
                        w: "Who",
                        role: "q-subj",
                        label: "疑问代词（作主语）"
                      },
                      {
                        w: "broke",
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        w: "the window",
                        role: "object",
                        label: "宾语"
                      }
                    ],
                    slots: [
                      {
                        role: "q-subj",
                        label: "疑问代词作主语"
                      },
                      {
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        role: "object",
                        label: "宾语"
                      }
                    ],
                    hint: "Who broke the window?——who 占了主语位，did 不用出场。对比：Who did you meet?（who 作宾语，才倒装）。"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：疑问代词 + 条件卡 + 反例 ---------- */
            {
              id: "gr02.2.1-p3",
              kind: "explain",
              title: "疑问代词：who 作主语不倒装",
              lead: "Who broke…? 无 did；Who did you meet? 有 did——为何一有一无？",
              point: "这就是疑问代词：who 作主语不倒装；which 有范围，what 无范围；whom 口语少用。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr02.2.1-e1", "gr02.2.1-e5", "gr02.2.1-e2" ],
                  note: "先看现象：who 作主语 vs 作宾语，did 出不出场。"
                },
                {
                  type: "idcard",
                  rule: "疑问代词：who（谁·主/宾）、whom（谁·宾，书面/正式，口语少用）、whose（谁的）、which（哪个·有范围）、what（什么·无范围）。",
                  condition: "who 作主语不倒装（Who broke…？）；作宾语才倒装（Who did you meet？）。which 用于有范围选择（which color），what 用于无范围（What's your name）。"
                },
                {
                  type: "bridge",
                  zh: "汉语'谁打破了窗户'和'你见到谁了'，'谁'的位置一前一后，但都不用助动词。",
                  en: "英语特殊疑问句一般要倒装（What did he say?），但 who 作主语是例外：Who broke the window?——who 自己占了主语位，后面直接陈述。",
                  unbridge: "这是英语的占位规矩：主语位被 who 占了，did 就不用出场。"
                },
                {
                  type: "contrast",
                  wrong: "Who did break the window?",
                  wrongZh: "（✗ 错句：who 作主语加 did）",
                  right: "Who broke the window?",
                  why: "who 作主语，后面不加 did——主语已经在了。"
                },
                {
                  type: "contrast",
                  wrong: "Which is your name?",
                  wrongZh: "（✗ 错句：无范围用 which）",
                  right: "What is your name?",
                  why: "问名字（无范围）用 what；which 用于有范围的选择（which color）。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr02.2.1-p4",
              kind: "quiz",
              title: "练一练：who 后面加不加 did？",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Who did break the window?", "Who broke the window?", "Who break the window?"],
                  answer: 1,
                  tip: "who 作主语，后面不加 did——主语已经在了。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "did you meet?（Who / Whose）",
                  answer: "Who",
                  accept: ["Who"],
                  tip: "who 作宾语才倒装：Who did you meet?"
                },
                {
                  type: "choice",
                  stem: "“你叫什么名字？”的正确问法是：",
                  options: ["Which is your name?", "What is your name?", "Whose is your name?"],
                  answer: 1,
                  tip: "问名字（无范围）用 what；which 用于有范围的选择。"
                },
                {
                  type: "fill",
                  stemBefore: "",
                  stemAfter: "color do you like?（Which / What）",
                  answer: "Which",
                  accept: ["Which"],
                  tip: "在几种颜色里选（有范围），用 which。"
                }
              ],
              point: "自查：先看疑问词在句中当什么成分——当主语，不倒装。"
            }
        ]
      },
      {
        id: "gr02.2.2",
        title: "不定代词",
        pages: [
            /* ---------- p1 观察页：例句先行 + Y1 先猜后验 ---------- */
            {
              id: "gr02.2.2-p1",
              kind: "observe",
              title: "四个系列，四种口气",
              point: "some- 肯定，any- 否定/疑问，every- 每个都，no- 全否定——四个系列，四种口气。",
              sentences: [
                {
                  id: "gr02.2.2-e1",
                  en: "Is there anything wrong?",
                  zh: "有什么不对吗？",
                  reg: "通用",
                  tagged: [ { w: "anything", role: "subject", label: "主语·any-系列" }, { w: "wrong", role: "complem", label: "表语" } ]
                },
                {
                  id: "gr02.2.2-e2",
                  en: "I want something to eat.",
                  zh: "我想吃点东西。",
                  reg: "通用",
                  tagged: [ { w: "something", role: "object", label: "宾语·some-系列" } ]
                },
                {
                  id: "gr02.2.2-e3",
                  en: "There is nothing in the box.",
                  zh: "盒子里什么都没有。",
                  reg: "通用",
                  tagged: [ { w: "nothing", role: "subject", label: "主语·no-系列" } ]
                }
              ],
              guess: {
                q: "something/anything/nothing——什么时候用哪个？",
                options: [ "肯定句 something，否定/疑问句 anything，no- 表否定", "随便用", "something 是否定" ],
                answer: 0,
                note: "先猜，再看上面的色块验证——猜错也没关系，只记录不判分。"
              }
            },
            /* ---------- p2 交互页：G1 改作不定代词系列标注 ---------- */
            {
              id: "gr02.2.2-p2",
              kind: "interact",
              title: "any- 系列住在否定/疑问句里",
              exploreTip: "给词块贴标签。疑问句用 anything——any- 系列住在否定/疑问句里。",
              point: "系列口诀：some- 肯定，any- 否定疑问，every- 单数，no- 全否定。",
              widgets: [
                {
                  type: "tagging",
                  params: {
                    sentence: [ { w: "Is", role: "verb", label: "谓语" }, { w: "anything", role: "any", label: "any-系列" }, { w: "wrong", role: "complem", label: "表语" } ],
                    slots: [
                      {
                        role: "verb",
                        label: "谓语"
                      },
                      {
                        role: "any",
                        label: "any-系列（否定/疑问）"
                      },
                      {
                        role: "complem",
                        label: "表语"
                      }
                    ],
                    hint: "Is there anything wrong?——疑问句住 anything。对比：I want something.（肯定句住 something）"
                  }
                }
              ]
            },
            /* ---------- p3 讲解页：不定代词四系列 + 条件卡 + 反例 ---------- */
            {
              id: "gr02.2.2-p3",
              kind: "explain",
              title: "不定代词：some- 肯定，any- 否定疑问",
              lead: "还记得吗？上一页疑问句里住的是 anything——any- 系列住在否定/疑问句里。",
              point: "这就是不定代词：some- 肯定，any- 否定疑问，every- 单数，no- 全否定。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr02.2.2-e1", "gr02.2.2-e2", "gr02.2.2-e3" ],
                  note: "先看现象：四个系列，四种口气。"
                },
                {
                  type: "idcard",
                  rule: "不定代词四系列：some-（肯定）、any-（否定/疑问/条件）、every-（每个都，单数）、no-（全否定）。all（都/三者以上）、both（两者都）、each（每个）。",
                  condition: "some-/any- 看句式：肯定 something，否定/疑问 anything。every-/each 后谓语用单数（Everyone is…）。everyone…their：口语可接受 their，书面传统用 his（注明语域演变）。"
                },
                {
                  type: "bridge",
                  zh: "汉语'有点东西''没什么'，'什么'通用，不用换系列。",
                  en: "英语不一样：肯定句 something，否定句必须换 anything（I don't want anything）——和 some/any 一样的换词规矩。",
                  unbridge: "这是英语的系列规矩：句式一变，系列跟着换。"
                },
                {
                  type: "contrast",
                  wrong: "I don't want something.",
                  wrongZh: "（✗ 错句：否定句用 some-）",
                  right: "I don't want anything.",
                  why: "否定句里 something 待不住，换成 anything。"
                },
                {
                  type: "contrast",
                  wrong: "Everyone are here.",
                  wrongZh: "（✗ 错句：every- 用复数谓语）",
                  right: "Everyone is here.",
                  why: "every- 系列是单数，谓语用 is——'每个都'一个一个数，都是单数。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p4 练习页：Y3 判分 ---------- */
            {
              id: "gr02.2.2-p4",
              kind: "quiz",
              title: "练一练：选系列",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["I don't want something.", "I don't want anything.", "I want anything."],
                  answer: 1,
                  tip: "否定句用 anything；肯定句才用 something。"
                },
                {
                  type: "fill",
                  stemBefore: "Is there",
                  stemAfter: "wrong?（something / anything）",
                  answer: "anything",
                  accept: ["anything"],
                  tip: "疑问句住 anything——any- 系列住在否定/疑问句里。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["Everyone are here.", "Everyone is here.", "Everyone am here."],
                  answer: 1,
                  tip: "every- 系列是单数，谓语用 is。"
                },
                {
                  type: "fill",
                  stemBefore: "There is",
                  stemAfter: "in the box.（something / nothing）",
                  answer: "nothing",
                  accept: ["nothing"],
                  tip: "no- 系列表全否定：盒子里什么都没有。"
                }
              ],
              point: "自查：先看句式（肯定/否定/疑问），再选系列；every- 永远单数。"
            }
        ]
      },
      {
        id: "gr02.2.3",
        title: "代词指代一致与本章小结",
        pages: [
            /* ---------- p1 讲解页：本章小结（指代一致 + 六课总表） ---------- */
            {
              id: "gr02.2.3-p1",
              kind: "explain",
              title: "本章小结：代词是名词的'替身'",
              lead: "六课学完了——代词是名词的'替身'，替身必须和本尊人称、数、格全一致。",
              point: "这就是指代一致：人称、数、格三一致，代词找得到先行词。",
              blocks: [
                {
                  type: "examples",
                  ids: [ "gr02.2.3-e2", "gr02.2.3-e3", "gr02.2.3-e4" ],
                  note: "先看现象：代词和它指的人，人称数格全一致。"
                },
                {
                  type: "idcard",
                  rule: "代词指代三一致：人称（he 指 Tom）、数（单数→单数）、格（主语→主格，宾语→宾格）。",
                  condition: "Everyone…传统书面用 his，口语 their 可接受。代词必须找得到先行词，否则指代不明。"
                },
                {
                  type: "idcard",
                  rule: "本章一张表：人称（主格/宾格）→物主（my+名词/mine 独立）→反身/指示（-self 跟主语）→疑问（who 作主语不倒装）→不定（some-/any- 看句式）。",
                  condition: "自查三问：格站对岗了吗？my/mine 分清了吗？代词和先行词人称数一致吗？"
                },
                {
                  type: "bridge",
                  zh: "汉语'他/她'口语不分，'他们'单复数靠语境，代词指代比较随意。",
                  en: "英语代词'实名制'：Tom→his，students→their——替身和本尊全对上。",
                  unbridge: "这是英语的实名规矩：代词不能指代不明。"
                },
                {
                  type: "contrast",
                  wrong: "Tom lost their key.",
                  wrongZh: "（✗ 错句：人称数不一致）",
                  right: "Tom lost his key.",
                  why: "Tom 单数配 their 复数——替身和本尊对不上。"
                }
              ],
              pointScroll: true
            },
            /* ---------- p2 练习页：本章综合（含改中式英语题） ---------- */
            {
              id: "gr02.2.3-p2",
              kind: "quiz",
              title: "本章综合练：代词大盘点",
              questions: [
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["My friend and I went to the park.", "Me and my friend went to the park.", "My friend and me went to the park."],
                  answer: 0,
                  tip: "主语并列用主格 I——Me 站不了主语岗。"
                },
                {
                  type: "fill",
                  stemBefore: "Tom lost",
                  stemAfter: "key.（his / their）",
                  answer: "his",
                  accept: ["his"],
                  tip: "Tom 是单数，代词的人称数要和它一致——用 his。"
                },
                {
                  type: "choice",
                  stem: "选出正确的句子：",
                  options: ["This is my.", "This is mine.", "This is me book."],
                  answer: 1,
                  tip: "my 后面不能空着——后面没名词，用独立的 mine。"
                },
                {
                  type: "fill",
                  stemBefore: "The students are reading",
                  stemAfter: "books.（his / their）",
                  answer: "their",
                  accept: ["their"],
                  tip: "students 是复数，代词用复数 their。"
                }
              ],
              point: "本章自查三问：格站对岗了吗？my/mine 分清了吗？代词和先行词一致吗？"
            }
        ]
      }
      ]
    }
  ]
};
